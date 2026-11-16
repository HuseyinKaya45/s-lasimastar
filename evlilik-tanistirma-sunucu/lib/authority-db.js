'use strict';
/** Otorite sunucusunun veritabanı şeması (SQLite). Denetim günlüğü, işlem sarmalayıcısı ve yardımcılar lib/db.js'ten gelir. */
const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','operator','denetci')),
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
  created_at INTEGER NOT NULL, last_seen INTEGER NOT NULL, expires_at INTEGER NOT NULL,
  ip TEXT, ua TEXT
);
CREATE INDEX IF NOT EXISTS ix_sessions_user ON sessions(user_id);
CREATE TABLE IF NOT EXISTS params_versions (
  ver INTEGER PRIMARY KEY, ts INTEGER NOT NULL, username TEXT NOT NULL, reason TEXT NOT NULL, seal TEXT NOT NULL, json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS param_proposals (
  id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER NOT NULL, proposer TEXT NOT NULL, reason TEXT NOT NULL, json TEXT NOT NULL, seal TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'bekliyor' CHECK (status IN ('bekliyor','onaylandi','reddedildi')),
  decided_by TEXT, decided_ts INTEGER, decision_note TEXT
);
CREATE TABLE IF NOT EXISTS bundles (
  ver INTEGER PRIMARY KEY, ts INTEGER NOT NULL, username TEXT NOT NULL, note TEXT NOT NULL, seal TEXT NOT NULL, json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS units (
  code TEXT PRIMARY KEY, name TEXT NOT NULL, contact TEXT NOT NULL DEFAULT '',
  sign_pub TEXT NOT NULL, enc_pub TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  last_seq_in INTEGER NOT NULL DEFAULT 0, seq_out INTEGER NOT NULL DEFAULT 0,
  last_pool_ts INTEGER, last_audit_ts INTEGER,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS pkg_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER NOT NULL, unit TEXT NOT NULL, kind TEXT NOT NULL, seq INTEGER, username TEXT NOT NULL, detail TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS profiles (
  key TEXT PRIMARY KEY, unit TEXT NOT NULL, ref TEXT NOT NULL,
  available INTEGER NOT NULL, data BLOB NOT NULL, updated_at INTEGER NOT NULL, seq INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_profiles_unit ON profiles(unit);
CREATE TABLE IF NOT EXISTS intros (
  id TEXT PRIMARY KEY, a TEXT NOT NULL, b TEXT NOT NULL, status TEXT NOT NULL, score INTEGER NOT NULL,
  data TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, created_by TEXT NOT NULL, param_seal TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_intros_a ON intros(a);
CREATE INDEX IF NOT EXISTS ix_intros_b ON intros(b);
CREATE TABLE IF NOT EXISTS blocked (a TEXT NOT NULL, b TEXT NOT NULL, ts INTEGER NOT NULL, PRIMARY KEY (a, b));
CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER NOT NULL, username TEXT NOT NULL, param_seal TEXT NOT NULL, pool INTEGER NOT NULL, considered INTEGER NOT NULL, json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS audit_pkgs (
  id INTEGER PRIMARY KEY AUTOINCREMENT, unit TEXT NOT NULL, ts INTEGER NOT NULL, json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_audit_pkgs_unit ON audit_pkgs(unit, ts);
CREATE TABLE IF NOT EXISTS counters (name TEXT PRIMARY KEY, val INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS audit (
  i INTEGER PRIMARY KEY, ts INTEGER NOT NULL, username TEXT NOT NULL, role TEXT NOT NULL,
  action TEXT NOT NULL, detail TEXT NOT NULL, prev TEXT NOT NULL, hash TEXT NOT NULL
);
CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit BEGIN SELECT RAISE(ABORT, 'denetim günlüğü yalnızca eklenebilir'); END;
CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit BEGIN SELECT RAISE(ABORT, 'denetim günlüğü yalnızca eklenebilir'); END;
`;

function openAuthorityDb(dataDir) {
  fs.mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  const file = path.join(dataDir, 'otorite.sqlite');
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000; PRAGMA synchronous=FULL; PRAGMA secure_delete=ON;');
  db.exec(SCHEMA);
  try { fs.chmodSync(file, 0o600); } catch { /* bazı dosya sistemlerinde desteklenmez */ }
  return db;
}
module.exports = { openAuthorityDb };
