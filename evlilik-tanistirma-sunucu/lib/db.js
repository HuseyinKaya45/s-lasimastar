'use strict';
/**
 * SQLite katmanı (Node.js yerleşik `node:sqlite`).
 *  - WAL, foreign_keys, busy_timeout
 *  - Her yazma işlemi tek bir işlem (transaction) içinde: iş verisi + denetim kaydı birlikte kaydedilir
 *  - Denetim günlüğü SHA-256 zinciridir; ayrıca SQLite tetikleyicileriyle UPDATE/DELETE engellenir
 */
const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');
const { sha256 } = require('./crypto');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','gorevli','denetci')),
  pw_hash TEXT NOT NULL,
  must_change INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  fails INTEGER NOT NULL DEFAULT 0,
  lock_until INTEGER NOT NULL DEFAULT 0,
  totp_secret TEXT,
  totp_enabled INTEGER NOT NULL DEFAULT 0,
  totp_last INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  created_by TEXT
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  csrf TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  ip TEXT, ua TEXT
);
CREATE INDEX IF NOT EXISTS ix_sessions_user ON sessions(user_id);
CREATE TABLE IF NOT EXISTS params_versions (
  ver INTEGER PRIMARY KEY,
  ts INTEGER NOT NULL, username TEXT NOT NULL, reason TEXT NOT NULL,
  seal TEXT NOT NULL, json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS param_proposals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL, proposer TEXT NOT NULL, reason TEXT NOT NULL,
  json TEXT NOT NULL, seal TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'bekliyor' CHECK (status IN ('bekliyor','onaylandi','reddedildi')),
  decided_by TEXT, decided_ts INTEGER, decision_note TEXT
);
CREATE TABLE IF NOT EXISTS applicants (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  id_hash TEXT,
  data BLOB NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, closed_at INTEGER
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_applicants_idhash ON applicants(id_hash) WHERE id_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS ix_applicants_status ON applicants(status);
CREATE TABLE IF NOT EXISTS intros (
  id TEXT PRIMARY KEY,
  a TEXT NOT NULL REFERENCES applicants(id), b TEXT NOT NULL REFERENCES applicants(id),
  status TEXT NOT NULL, score INTEGER NOT NULL,
  data TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL, created_by TEXT NOT NULL, param_seal TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_intros_a ON intros(a);
CREATE INDEX IF NOT EXISTS ix_intros_b ON intros(b);
CREATE TABLE IF NOT EXISTS blocked (a TEXT NOT NULL, b TEXT NOT NULL, ts INTEGER NOT NULL, PRIMARY KEY (a, b));
CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL, username TEXT NOT NULL, param_seal TEXT NOT NULL,
  pool INTEGER NOT NULL, considered INTEGER NOT NULL, json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS counters (name TEXT PRIMARY KEY, val INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS audit (
  i INTEGER PRIMARY KEY,
  ts INTEGER NOT NULL, username TEXT NOT NULL, role TEXT NOT NULL,
  action TEXT NOT NULL, detail TEXT NOT NULL,
  prev TEXT NOT NULL, hash TEXT NOT NULL
);
CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit BEGIN SELECT RAISE(ABORT, 'denetim günlüğü yalnızca eklenebilir'); END;
CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit BEGIN SELECT RAISE(ABORT, 'denetim günlüğü yalnızca eklenebilir'); END;
`;

function open(dataDir) {
  fs.mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  const file = path.join(dataDir, 'ets.sqlite');
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000; PRAGMA synchronous=FULL; PRAGMA secure_delete=ON;');
  db.exec(SCHEMA);
  try { fs.chmodSync(file, 0o600); } catch { /* bazı dosya sistemlerinde desteklenmez */ }
  return db;
}

/** Tek işlem: fn içinde istisna olursa her şey geri alınır. İç içe çağrı desteklenir. */
function makeTx(db) {
  let depth = 0;
  return function tx(fn) {
    if (depth > 0) return fn();
    db.exec('BEGIN IMMEDIATE');
    depth++;
    try { const r = fn(); db.exec('COMMIT'); return r; }
    catch (e) { try { db.exec('ROLLBACK'); } catch { /* yoksay */ } throw e; }
    finally { depth--; }
  };
}

const auditHash = (prev, i, ts, user, role, action, detail) => sha256([prev, i, ts, user, role, action, detail].join('|'));

/** Denetim kaydı ekler. Çağıran işlem içinde olmalı (tx). detail yalnızca kimlik/numara içermeli, kişisel veri içermemeli. */
function audit(db, actor, action, detail = '') {
  const last = db.prepare('SELECT i, hash FROM audit ORDER BY i DESC LIMIT 1').get();
  const i = last ? last.i + 1 : 1, prev = last ? last.hash : 'GENESIS', ts = Date.now();
  const user = actor ? actor.username : 'sistem', role = actor ? actor.role : '-';
  const hash = auditHash(prev, i, ts, user, role, action, String(detail));
  db.prepare('INSERT INTO audit (i, ts, username, role, action, detail, prev, hash) VALUES (?,?,?,?,?,?,?,?)').run(i, ts, user, role, action, String(detail), prev, hash);
  return { i, hash };
}

function verifyAuditChain(db, limit = Infinity) {
  let prev = 'GENESIS', n = 0;
  const it = db.prepare('SELECT * FROM audit ORDER BY i ASC');
  for (const e of it.iterate()) {
    if (e.prev !== prev || e.hash !== auditHash(prev, e.i, e.ts, e.username, e.role, e.action, e.detail) || e.i !== n + 1) return { ok: false, at: e.i, checked: n };
    prev = e.hash; n++; if (n >= limit) break;
  }
  return { ok: true, n, head: prev };
}

function counterNext(db, name) {
  db.prepare('INSERT INTO counters (name, val) VALUES (?, 1) ON CONFLICT(name) DO UPDATE SET val = val + 1').run(name);
  return db.prepare('SELECT val FROM counters WHERE name = ?').get(name).val;
}
const metaGet = (db, k, d = null) => { const r = db.prepare('SELECT value FROM meta WHERE key = ?').get(k); return r ? r.value : d; };
const metaSet = (db, k, v) => db.prepare('INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(k, String(v));

module.exports = { open, makeTx, audit, verifyAuditChain, counterNext, metaGet, metaSet, auditHash };
