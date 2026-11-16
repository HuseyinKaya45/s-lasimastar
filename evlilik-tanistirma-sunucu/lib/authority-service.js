'use strict';
/**
 * OTORİTE iş mantığı: birimlerden gelen takma adlı profilleri birleştirir, birimler arası eşleştirme yapar,
 * öneri paketlerini üretir, parametre paketlerini imzalayıp yayımlar ve birimlerin denetim paketlerini doğrular.
 * Kimlik/iletişim bilgisi bu sistemde BULUNMAZ; yalnızca takma adlı (referans numaralı) profiller tutulur.
 */
const path = require('node:path');
const crypto = require('node:crypto');
const { Worker } = require('node:worker_threads');
const E = require('./engine');
const C = require('./crypto');
const D = require('./db');
const AU = require('./authority');
const H = require('./hybrid');
const CE = require('./central');
const { createAccounts } = require('./accounts');
const { HttpError, bad, forbid, notFound, conflict, unprocessable } = require('./errors');

const canon = C.canon;
const sealOf = (p) => E.sealParams(p);
const pad4 = (n) => String(n).padStart(4, '0');
const reasonOk = (r, min = 5) => { const s = String(r || '').trim(); if (s.length < min) throw bad(`Gerekçe en az ${min} karakter olmalı.`); return s.slice(0, 500); };
const CODE_RE = /^[A-Za-z0-9_.-]{2,40}$/;
const ACTIVE = E.ACTIVE_INTRO;
const STALE_DAYS = 7;

function createAuthorityService({ db, kr, config }) {
  const tx = D.makeTx(db);
  const aad = (key) => 'profile:' + key;
  let paramsCache = null;

  /* ------------------------------------------------------------------ parametreler (otoritenin resmî kuralları) */
  function loadParams() { const r = db.prepare('SELECT * FROM params_versions ORDER BY ver DESC LIMIT 1').get(); if (!r) return null; paramsCache = { ver: r.ver, seal: r.seal, params: JSON.parse(r.json) }; return paramsCache; }
  const getParams = () => paramsCache || loadParams();
  function ensureInit() {
    if (db.prepare('SELECT COUNT(*) c FROM params_versions').get().c) return;
    tx(() => {
      const p = E.DEFAULT_PARAMS(); p.institution = 'Merkezî Evlilik Tanıştırma Otoritesi'; const seal = sealOf(p);
      db.prepare('INSERT INTO params_versions (ver, ts, username, reason, seal, json) VALUES (1,?,?,?,?,?)').run(Date.now(), 'sistem', 'İlk kurulum (varsayılan parametreler)', seal, JSON.stringify(p));
      D.audit(db, null, 'KURULUM', `otorite sunucusu kuruldu; mühür ${seal}`);
    });
    loadParams();
  }
  const accounts = createAccounts({ db, tx, config, roles: ['admin', 'operator', 'denetci'], policy: { passwordMinLength: () => getParams().params.passwordMinLength, sessionIdleMinutes: () => getParams().params.sessionIdleMinutes, institution: () => getParams().params.institution } });
  const { activeAdmins, createUser, listUsers, updateUser, login, authenticate, logout, changePassword, totpSetup, totpEnable } = accounts;
  const requires2fa = () => D.metaGet(db, 'require2fa', '0') === '1';

  function applyParams(actor, params, reason, how) {
    const errs = E.validateParams(params); if (errs.length) throw unprocessable('Parametreler geçersiz.', { errors: errs });
    const cur = getParams(); if (canon(params) === canon(cur.params)) throw bad('Parametrelerde değişiklik yok.');
    const ver = cur.ver + 1, seal = sealOf(params);
    db.prepare('INSERT INTO params_versions (ver, ts, username, reason, seal, json) VALUES (?,?,?,?,?,?)').run(ver, Date.now(), actor.username, reason, seal, JSON.stringify(params));
    D.audit(db, actor, 'PARAMETRE_DEGISTI', `sürüm ${ver}; mühür ${seal}; ${how}; gerekçe: ${reason}`);
    loadParams(); return { ver, seal };
  }
  function paramsInfo() {
    const cur = getParams(), last = db.prepare('SELECT ver, ts, seal, note, username FROM bundles ORDER BY ver DESC LIMIT 1').get();
    return {
      version: cur.ver, seal: cur.seal, params: cur.params, require2fa: requires2fa(), adminCount: activeAdmins(),
      history: db.prepare('SELECT ver, ts, username, reason, seal FROM params_versions ORDER BY ver DESC LIMIT 50').all(),
      proposals: db.prepare('SELECT id, ts, proposer, reason, seal, status, decided_by, decided_ts, decision_note FROM param_proposals ORDER BY id DESC LIMIT 20').all(),
      bundles: db.prepare('SELECT ver, ts, username, note, seal FROM bundles ORDER BY ver DESC LIMIT 30').all(), lastBundle: last || null,
      unpublished: !last || last.seal !== cur.seal
    };
  }
  function proposeParams(u, params, reason) {
    reason = reasonOk(reason);
    const errs = E.validateParams(params); if (errs.length) throw unprocessable('Parametreler geçersiz.', { errors: errs });
    if (canon(params) === canon(getParams().params)) throw bad('Parametrelerde değişiklik yok.');
    return tx(() => {
      if (activeAdmins() < 2) return { applied: true, ...applyParams(u, params, reason, 'tek yönetici — doğrudan') };
      const seal = sealOf(params);
      const id = db.prepare('INSERT INTO param_proposals (ts, proposer, reason, json, seal) VALUES (?,?,?,?,?)').run(Date.now(), u.username, reason, JSON.stringify(params), seal).lastInsertRowid;
      D.audit(db, u, 'PARAMETRE_ONERISI', `öneri ${id}; mühür ${seal}; gerekçe: ${reason}`);
      return { applied: false, proposalId: Number(id), seal };
    });
  }
  function decideProposal(u, id, approve, note) {
    return tx(() => {
      const p = db.prepare("SELECT * FROM param_proposals WHERE id=? AND status='bekliyor'").get(id); if (!p) throw notFound('Bekleyen öneri bulunamadı.');
      if (p.proposer === u.username) throw forbid('Öneriyi yapan kişi onaylayamaz (iki kişi kuralı).');
      if (approve) {
        const r = applyParams(u, JSON.parse(p.json), p.reason, `öneri ${id} — ${p.proposer} önerdi, ${u.username} onayladı`);
        db.prepare("UPDATE param_proposals SET status='onaylandi', decided_by=?, decided_ts=?, decision_note=? WHERE id=?").run(u.username, Date.now(), String(note || ''), id);
        db.prepare("UPDATE param_proposals SET status='reddedildi', decided_by='sistem', decided_ts=?, decision_note='Yeni parametre sürümü yayımlandı' WHERE status='bekliyor'").run(Date.now());
        return { applied: true, ...r };
      }
      note = reasonOk(note);
      db.prepare("UPDATE param_proposals SET status='reddedildi', decided_by=?, decided_ts=?, decision_note=? WHERE id=?").run(u.username, Date.now(), note, id);
      D.audit(db, u, 'PARAMETRE_ONERISI_REDDEDILDI', `öneri ${id}; ${note}`); return { applied: false };
    });
  }
  function setRequire2fa(u, on) { tx(() => { D.metaSet(db, 'require2fa', on ? '1' : '0'); D.audit(db, u, 'IKI_ASAMALI_ZORUNLULUK', on ? 'açık' : 'kapalı'); }); return { require2fa: !!on }; }
  /** Geçerli parametreleri otoritenin Ed25519 anahtarıyla imzalar; birimlere dağıtılacak "parametre paketi". */
  function publishBundle(u, note) {
    if (!config.signingKey) throw bad('Otorite imza anahtarı yapılandırılmamış (AUTHORITY_SIGNING_KEY_FILE).');
    return tx(() => {
      const cur = getParams(), ver = (db.prepare('SELECT MAX(ver) m FROM bundles').get().m || 0) + 1;
      const bundle = AU.makeBundle({ params: cur.params, version: ver, note: String(note || '').slice(0, 300), privateKey: config.signingKey });
      db.prepare('INSERT INTO bundles (ver, ts, username, note, seal, json) VALUES (?,?,?,?,?,?)').run(ver, Date.now(), u.username, bundle.note, bundle.seal, JSON.stringify(bundle));
      D.audit(db, u, 'PARAMETRE_PAKETI_YAYIMLANDI', `paket sürümü ${ver}; mühür ${bundle.seal}`);
      return bundle;
    });
  }
  function getBundle(ver) { const r = db.prepare('SELECT json FROM bundles WHERE ver=?').get(ver); if (!r) throw notFound('Paket bulunamadı.'); return JSON.parse(r.json); }

  /* ------------------------------------------------------------------ birimler */
  const pubUnit = (r) => ({ code: r.code, name: r.name, contact: r.contact, active: !!r.active, lastSeqIn: r.last_seq_in, seqOut: r.seq_out, lastPoolTs: r.last_pool_ts, lastAuditTs: r.last_audit_ts, createdAt: r.created_at, signKeyId: AU.keyIdOf(r.sign_pub), encKeyId: AU.keyIdOf(r.enc_pub) });
  function parseIdentity(identity) {
    if (!identity || typeof identity !== 'object' || identity.format !== 'ets-unit-identity/1') throw bad('Birim kimlik dosyası tanınmıyor (ets-unit-identity/1).');
    let sign, enc;
    try { sign = crypto.createPublicKey(identity.signingKey); enc = crypto.createPublicKey(identity.encryptionKey); } catch { throw bad('Birim anahtarları okunamadı.'); }
    if (sign.asymmetricKeyType !== 'ed25519') throw bad('İmza anahtarı Ed25519 olmalı.');
    if (enc.asymmetricKeyType !== 'x25519') throw bad('Şifreleme anahtarı X25519 olmalı.');
    return { signPub: String(identity.signingKey), encPub: String(identity.encryptionKey) };
  }
  function addUnit(u, { code, name, contact, identity }) {
    code = String(code || '').trim(); name = String(name || '').trim();
    if (!CODE_RE.test(code)) throw bad('Birim kodu 2–40 karakter (harf, rakam, . _ -) olmalı.');
    if (!name || name.length > 80) throw bad('Birim adı gerekli (en çok 80 karakter).');
    const k = parseIdentity(identity);
    return tx(() => {
      if (db.prepare('SELECT 1 FROM units WHERE code=?').get(code)) throw conflict('Bu birim kodu kayıtlı.');
      db.prepare('INSERT INTO units (code, name, contact, sign_pub, enc_pub, created_at) VALUES (?,?,?,?,?,?)').run(code, name, String(contact || '').slice(0, 120), k.signPub, k.encPub, Date.now());
      D.audit(db, u, 'BIRIM_EKLENDI', `${code}; imza anahtarı ${AU.keyIdOf(k.signPub)}; şifreleme anahtarı ${AU.keyIdOf(k.encPub)}`);
      return { code };
    });
  }
  function updateUnit(u, code, patch) {
    return tx(() => {
      const r = db.prepare('SELECT * FROM units WHERE code=?').get(code); if (!r) throw notFound('Birim bulunamadı.');
      if (typeof patch.active === 'boolean' && patch.active !== !!r.active) {
        db.prepare('UPDATE units SET active=? WHERE code=?').run(patch.active ? 1 : 0, code);
        if (!patch.active) { // pasif birimin profilleri havuzdan çıkarılır, tanıştırmalar iptal edilir
          for (const p of db.prepare('SELECT key FROM profiles WHERE unit=?').all(code)) removeProfile(u, p.key, 'birim pasifleştirildi');
        }
        D.audit(db, u, 'BIRIM_DURUMU', `${code}: ${patch.active ? 'etkin' : 'pasif'}`);
      }
      if (typeof patch.name === 'string' && patch.name.trim()) db.prepare('UPDATE units SET name=? WHERE code=?').run(patch.name.trim().slice(0, 80), code);
      if (typeof patch.contact === 'string') db.prepare('UPDATE units SET contact=? WHERE code=?').run(patch.contact.slice(0, 120), code);
      if (patch.identity) { const k = parseIdentity(patch.identity); db.prepare('UPDATE units SET sign_pub=?, enc_pub=? WHERE code=?').run(k.signPub, k.encPub, code); D.audit(db, u, 'BIRIM_ANAHTARI_DEGISTI', `${code}; yeni imza anahtarı ${AU.keyIdOf(k.signPub)}`); }
      return { ok: true };
    });
  }
  const listUnits = () => db.prepare('SELECT * FROM units ORDER BY code').all().map((r) => ({ ...pubUnit(r), profiles: db.prepare('SELECT COUNT(*) c FROM profiles WHERE unit=?').get(r.code).c, available: db.prepare('SELECT COUNT(*) c FROM profiles WHERE unit=? AND available=1').get(r.code).c, stale: !r.last_pool_ts || Date.now() - r.last_pool_ts > STALE_DAYS * 864e5 }));

  /* ------------------------------------------------------------------ profiller ve tanıştırma durumu */
  const readProfile = (row) => JSON.parse(C.decrypt(kr, row.data, aad(row.key)));
  const flatOf = (row) => CE.toFlat(readProfile(row), row.unit, !!row.available);
  const unitName = (code) => { const r = db.prepare('SELECT name FROM units WHERE code=?').get(code); return r ? r.name : code; };
  const introHist = (d, actor, text) => d.history.push({ ts: Date.now(), user: actor ? actor.username : 'sistem', text });
  function saveIntro(i, status, d) { db.prepare('UPDATE intros SET status=?, data=?, updated_at=? WHERE id=?').run(status, JSON.stringify(d), Date.now(), i.id); }
  function removeProfile(actor, key, why) {
    for (const i of db.prepare(`SELECT * FROM intros WHERE (a=? OR b=?) AND status IN (${ACTIVE.map(() => '?').join(',')})`).all(key, key, ...ACTIVE)) {
      const d = JSON.parse(i.data); introHist(d, actor, `Tanıştırma iptal: ${why}`); saveIntro(i, 'iptal', d);
      D.audit(db, actor, 'TANISTIRMA_IPTAL', `${i.id}; ${why}`);
    }
    db.prepare('DELETE FROM profiles WHERE key=?').run(key);
  }
  function buildIctx() {
    const active = new Map(), pairs = new Set(), blocked = new Set();
    for (const i of db.prepare('SELECT a, b, status FROM intros').all()) {
      pairs.add(E.pkey(i.a, i.b));
      if (ACTIVE.includes(i.status)) { active.set(i.a, (active.get(i.a) || 0) + 1); active.set(i.b, (active.get(i.b) || 0) + 1); }
    }
    for (const b of db.prepare('SELECT a, b FROM blocked').all()) blocked.add(E.pkey(b.a, b.b));
    return { active, pairs, blocked };
  }

  /* ------------------------------------------------------------------ birimden gelen veri paketi */
  function applyResponse(actor, unit, r) {
    const row = db.prepare('SELECT * FROM intros WHERE id=?').get(r.intro); if (!row) return 'bilinmeyen tanıştırma';
    const d = JSON.parse(row.data), mine = unit + '|' + r.ref, side = row.a === mine ? 'a' : row.b === mine ? 'b' : null;
    if (!side) return 'taraf uyuşmuyor';
    if (r.kind === 'decision') {
      if (row.status !== 'yanit_bekliyor' || d.resp[side].dec) return 'yok sayıldı';
      d.resp[side] = { dec: r.dec, ts: r.ts, method: r.method }; introHist(d, actor, `${mine}: ${r.dec}`);
      D.audit(db, actor, 'MERKEZI_TANISTIRMA_YANIT', `${row.id} ${mine} ${r.dec}`);
      if (r.dec === 'ret') {
        saveIntro(row, 'reddedildi', d); const [x, y] = [row.a, row.b].sort();
        db.prepare('INSERT OR IGNORE INTO blocked (a, b, ts) VALUES (?,?,?)').run(x, y, Date.now()); D.audit(db, actor, 'TANISTIRMA_REDDEDILDI', `${row.id}; çift bir daha önerilmeyecek`);
      } else if (d.resp.a.dec === 'kabul' && d.resp.b.dec === 'kabul') { saveIntro(row, 'kabul', d); D.audit(db, actor, 'TANISTIRMA_KARSILIKLI_KABUL', row.id); }
      else saveIntro(row, 'yanit_bekliyor', d);
      return 'uygulandı';
    }
    if (!['kabul', 'bulusma_planli', 'devam_ediyor'].includes(row.status)) return 'yok sayıldı';
    if (d.outcome[side] === r.out) return 'aynı';
    d.outcome[side] = r.out; introHist(d, actor, `${mine}: sonuç ${r.out}`);
    const o = d.outcome; let st = row.status;
    if (o.a === 'sikayet' || o.b === 'sikayet') st = 'sikayet';
    else if (o.a === 'bitti' || o.b === 'bitti') st = 'bitti';
    else if (o.a === 'karar' && o.b === 'karar') st = 'kararverdi';
    else if (o.a && o.b) st = 'devam_ediyor';
    saveIntro(row, st, d); D.audit(db, actor, 'MERKEZI_TANISTIRMA_SONUC', `${row.id} ${mine} ${r.out} → ${st}`);
    return 'uygulandı';
  }
  function importUnitPackage(u, env) {
    if (!config.encKey) throw bad('Otorite şifreleme anahtarı yapılandırılmamış (AUTHORITY_ENC_KEY_FILE).');
    const from = env && env.from; const unit = typeof from === 'string' && db.prepare('SELECT * FROM units WHERE code=?').get(from);
    if (!unit) throw unprocessable('Gönderen birim kayıtlı değil.');
    if (!unit.active) throw forbid('Birim pasif; paket kabul edilmez.');
    let opened;
    try { opened = H.open(env, { recipientEncPriv: config.encKey, senderSignPub: unit.sign_pub, expectKind: 'pool', expectTo: 'OTORITE' }); }
    catch (e) { tx(() => D.audit(db, u, 'BIRIM_PAKETI_REDDEDILDI', `${from}; ${e.message}`)); throw unprocessable('Paket doğrulanamadı: ' + e.message); }
    if (!(opened.header.seq > unit.last_seq_in)) throw conflict(`Paket sırası (${opened.header.seq}) son alınandan (${unit.last_seq_in}) yeni değil; eski/yinelenen paket uygulanamaz.`);
    const pl = opened.payload;
    if (pl.unitCode !== from) throw unprocessable('Paket içindeki birim kodu zarfla uyuşmuyor.');
    const P = getParams().params, today = E.todayStr();
    const good = [], rejected = [];
    for (const raw of Array.isArray(pl.profiles) ? pl.profiles.slice(0, 20000) : []) {
      const r = CE.sanitizeProfile(raw, P, today);
      if (r.profile) good.push(r.profile); else rejected.push({ ref: raw && raw.ref ? String(raw.ref).slice(0, 40) : '?', reason: r.error });
    }
    const { responses, rejected: badResp } = CE.validateResponses(pl.responses);
    return tx(() => {
      const now = Date.now(), seen = new Set(); let added = 0, updated = 0;
      for (const p of good) {
        const key = from + '|' + p.ref; if (seen.has(key)) continue; seen.add(key);
        const blob = C.encrypt(kr, JSON.stringify(p), aad(key)), ex = db.prepare('SELECT 1 FROM profiles WHERE key=?').get(key);
        if (ex) { db.prepare('UPDATE profiles SET available=?, data=?, updated_at=?, seq=? WHERE key=?').run(p.available ? 1 : 0, blob, now, opened.header.seq, key); updated++; }
        else { db.prepare('INSERT INTO profiles (key, unit, ref, available, data, updated_at, seq) VALUES (?,?,?,?,?,?,?)').run(key, from, p.ref, p.available ? 1 : 0, blob, now, opened.header.seq); added++; }
      }
      let removed = 0;
      for (const r of db.prepare('SELECT key FROM profiles WHERE unit=?').all(from)) if (!seen.has(r.key)) { removeProfile(u, r.key, 'aday merkezî havuzdan çıkarıldı (rıza geri çekildi/pasif)'); removed++; }
      let applied = 0, ignored = 0;
      for (const r of responses) { const res = applyResponse(u, from, r); if (res === 'uygulandı') applied++; else ignored++; }
      db.prepare('UPDATE units SET last_seq_in=?, last_pool_ts=? WHERE code=?').run(opened.header.seq, now, from);
      const mism = pl.paramSeal && pl.paramSeal !== getParams().seal;
      const detail = `seq ${opened.header.seq}; profil +${added}/~${updated}/-${removed}; reddedilen profil ${rejected.length}; yanıt ${applied} uygulandı/${ignored} yok sayıldı/${badResp.length} geçersiz${mism ? '; parametre mührü uyuşmuyor' : ''}`;
      db.prepare('INSERT INTO pkg_log (ts, unit, kind, seq, username, detail) VALUES (?,?,?,?,?,?)').run(now, from, 'havuz-paketi', opened.header.seq, u.username, detail);
      D.audit(db, u, 'BIRIM_PAKETI_ALINDI', `${from}; ${detail}`);
      return { unit: from, seq: opened.header.seq, added, updated, removed, rejected: rejected.slice(0, 50), rejectedCount: rejected.length, responsesApplied: applied, responsesIgnored: ignored, responsesInvalid: badResp.length, paramMismatch: !!mism };
    });
  }

  /* ------------------------------------------------------------------ otoriteden birime öneri paketi */
  const ageOf = (dogum) => (dogum ? E.ageOn(dogum, E.todayStr()) : null);
  function cardOf(key, P) {
    const row = db.prepare('SELECT * FROM profiles WHERE key=?').get(key); if (!row) return null;
    const p = readProfile(row);
    return { age: ageOf(p.dogum), il: p.il, edu: P.eduLevels[+p.edu] || '', meslek: p.meslek, medeni: (E.MEDENI.find((m) => m[0] === p.medeni) || [0, ''])[1], cocuk: p.cocuk, tanitim: p.tanitim, unitName: unitName(row.unit) };
  }
  function exportForUnit(u, code) {
    if (!config.signingKey) throw bad('Otorite imza anahtarı yapılandırılmamış.');
    const unit = db.prepare('SELECT * FROM units WHERE code=?').get(code); if (!unit) throw notFound('Birim bulunamadı.');
    if (!unit.active) throw forbid('Birim pasif.');
    return tx(() => {
      const P = getParams().params, cutoff = Date.now() - 365 * 864e5, intros = [];
      const rows = db.prepare('SELECT * FROM intros WHERE updated_at > ? ORDER BY created_at').all(cutoff);
      for (const i of rows) {
        for (const side of ['a', 'b']) {
          const mine = i[side], [mu, ref] = [mine.split('|')[0], mine.slice(mine.indexOf('|') + 1)];
          if (mu !== code) continue;
          const otherKey = side === 'a' ? i.b : i.a, d = JSON.parse(i.data);
          const oc = cardOf(otherKey, P); if (!oc) { if (!ACTIVE.includes(i.status)) continue; }
          const ou = otherKey.split('|')[0], ouRow = db.prepare('SELECT name, contact FROM units WHERE code=?').get(ou);
          const reveal = ['kabul', 'bulusma_planli', 'devam_ediyor', 'kararverdi'].includes(i.status);
          intros.push({ id: i.id, ref, side, score: i.score, status: i.status, other: oc || { age: null, il: '', edu: '', meslek: '', medeni: '', cocuk: 0, tanitim: '', unitName: unitName(ou) },
            coord: reveal && ouRow ? { unitName: ouRow.name, contact: ouRow.contact } : null, meeting: reveal ? d.meeting : null });
        }
      }
      const seq = unit.seq_out + 1;
      const env = H.seal({ kind: 'proposals', from: 'OTORITE', to: code, seq, payload: { unitCode: code, generatedAt: Date.now(), paramVersion: getParams().ver, intros }, signKey: config.signingKey, recipientEncPub: unit.enc_pub });
      db.prepare('UPDATE units SET seq_out=? WHERE code=?').run(seq, code);
      db.prepare('INSERT INTO pkg_log (ts, unit, kind, seq, username, detail) VALUES (?,?,?,?,?,?)').run(Date.now(), code, 'oneri-paketi', seq, u.username, `${intros.length} öneri satırı`);
      D.audit(db, u, 'ONERI_PAKETI_URETILDI', `${code}; seq ${seq}; satır ${intros.length}`);
      return env;
    });
  }

  /* ------------------------------------------------------------------ havuz görüntüleme */
  function listProfiles(u, { unit, q, page = 1, pageSize = 50 }) {
    const P = getParams().params, today = E.todayStr(); page = Math.max(1, +page || 1); pageSize = Math.min(100, Math.max(10, +pageSize || 50));
    let rows = unit ? db.prepare('SELECT * FROM profiles WHERE unit=? ORDER BY key').all(unit) : db.prepare('SELECT * FROM profiles ORDER BY key').all();
    let items = rows.map((r) => ({ r, p: readProfile(r) }));
    if (q) { const s = String(q).toLowerCase(); items = items.filter(({ r, p }) => (r.key + ' ' + p.il + ' ' + p.meslek).toLowerCase().includes(s)); }
    const total = items.length;
    return { total, page, pageSize, items: items.slice((page - 1) * pageSize, page * pageSize).map(({ r, p }) => ({ key: r.key, unit: r.unit, unitName: unitName(r.unit), ref: r.ref, available: !!r.available, cins: p.cins, age: ageOf(p.dogum), il: p.il, edu: P.eduLevels[+p.edu] || '', activeIntros: db.prepare(`SELECT COUNT(*) c FROM intros WHERE (a=? OR b=?) AND status IN (${ACTIVE.map(() => '?').join(',')})`).get(r.key, r.key, ...ACTIVE).c })) };
  }
  function getProfile(u, key) {
    const row = db.prepare('SELECT * FROM profiles WHERE key=?').get(key); if (!row) throw notFound('Profil bulunamadı.');
    const p = readProfile(row), P = getParams().params;
    tx(() => D.audit(db, u, 'PROFIL_GORULDU', key));
    return { key, unit: row.unit, unitName: unitName(row.unit), available: !!row.available, updatedAt: row.updated_at, profile: { ...p, age: ageOf(p.dogum), eduLabel: P.eduLevels[+p.edu] || '' }, intros: db.prepare('SELECT id, a, b, status FROM intros WHERE a=? OR b=? ORDER BY created_at DESC').all(key, key) };
  }

  /* ------------------------------------------------------------------ eşleştirme */
  let matchBusy = false;
  async function runMatch(u) {
    if (matchBusy) throw conflict('Bir eşleştirme koşusu zaten sürüyor.');
    matchBusy = true;
    try {
      const P = getParams(), today = E.todayStr();
      const all = db.prepare('SELECT * FROM profiles').all().map(flatOf), ictx = buildIctx();
      const res = all.length > 300
        ? await new Promise((resolve, reject) => { const w = new Worker(path.join(__dirname, 'match-worker.js'), { workerData: { all, P: P.params, today, ictx } }); w.once('message', resolve); w.once('error', reject); w.once('exit', (c) => { if (c !== 0) reject(new Error('Eşleştirme iş parçacığı beklenmedik şekilde sonlandı.')); }); })
        : E.runMatching(all, P.params, today, ictx);
      return tx(() => {
        if (getParams().seal !== P.seal) throw conflict('Eşleştirme sırasında parametreler değişti; yeniden çalıştırın.');
        const id = db.prepare('INSERT INTO runs (ts, username, param_seal, pool, considered, json) VALUES (?,?,?,?,?,?)').run(Date.now(), u.username, P.seal, res.pool, res.considered, JSON.stringify({ suggestions: res.suggestions, noMatch: res.noMatch })).lastInsertRowid;
        db.prepare('DELETE FROM runs WHERE id <= ?').run(Number(id) - 5);
        D.audit(db, u, 'MERKEZI_ESLESTIRME_CALISTIRILDI', `koşu ${id}; havuz ${res.pool}; öneri ${res.suggestions.length}; mühür ${P.seal.slice(0, 12)}`);
        return { id: Number(id), pool: res.pool, suggestions: res.suggestions.length, noMatch: res.noMatch.length };
      });
    } finally { matchBusy = false; }
  }
  function latestRun(u, { q, page = 1, pageSize = 100 }) {
    const r = db.prepare('SELECT * FROM runs ORDER BY id DESC LIMIT 1').get(); if (!r) return { run: null };
    const j = JSON.parse(r.json), P = getParams(), ictx = buildIctx(), today = E.todayStr(), cache = new Map();
    const get = (k) => { if (!cache.has(k)) { const row = db.prepare('SELECT * FROM profiles WHERE key=?').get(k); cache.set(k, row ? flatOf(row) : null); } return cache.get(k); };
    let items = j.suggestions.map((p) => { const a = get(p.a), b = get(p.b); return { ...p, ageA: a ? ageOf(a.dogum) : null, ageB: b ? ageOf(b.dogum) : null, ilA: a ? a.il : '', ilB: b ? b.il : '', unitA: unitName(p.a.split('|')[0]), unitB: unitName(p.b.split('|')[0]), canStart: !!(a && b && !E.pairOk(a, b, P.params, today, ictx)) }; });
    if (q) { const s = String(q).toLowerCase(); items = items.filter((x) => (x.a + x.b + x.unitA + x.unitB + x.ilA + x.ilB).toLowerCase().includes(s)); }
    const total = items.length; pageSize = Math.min(200, +pageSize || 100); page = Math.max(1, +page || 1);
    return { run: { id: r.id, ts: r.ts, username: r.username, pool: r.pool, considered: r.considered, total, stale: r.param_seal !== P.seal }, items: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, noMatch: j.noMatch.slice(0, 500) };
  }
  function why(u, aKey, bKey) {
    const ra = db.prepare('SELECT * FROM profiles WHERE key=?').get(aKey), rb = db.prepare('SELECT * FROM profiles WHERE key=?').get(bKey); if (!ra || !rb) throw notFound();
    const r = E.scorePair(flatOf(ra), flatOf(rb), getParams().params, E.todayStr());
    return { nameA: aKey, nameB: bKey, ...r };
  }

  /* ------------------------------------------------------------------ merkezî tanıştırmalar */
  function startIntro(u, aKey, bKey) {
    return tx(() => {
      const ra = db.prepare('SELECT * FROM profiles WHERE key=?').get(aKey), rb = db.prepare('SELECT * FROM profiles WHERE key=?').get(bKey); if (!ra || !rb) throw notFound('Profil bulunamadı.');
      const P = getParams(), a = flatOf(ra), b = flatOf(rb), today = E.todayStr();
      const w = E.pairOk(a, b, P.params, today, buildIctx()); if (w) throw unprocessable('Bu çift şu an başlatılamaz: ' + w);
      const sc = E.scorePair(a, b, P.params, today); if (sc.hard) throw unprocessable('Zorunlu tercihlerden biri karşılanmıyor.');
      const id = `C-${new Date().getFullYear()}-${pad4(D.counterNext(db, 'intro'))}`;
      const d = { resp: { a: { dec: null, ts: null, method: '' }, b: { dec: null, ts: null, method: '' } }, outcome: { a: null, b: null }, meeting: null, history: [] };
      introHist(d, u, 'Merkezî tanıştırma başlatıldı; öneri paketleri iki birime iletilecek');
      db.prepare('INSERT INTO intros (id, a, b, status, score, data, created_at, updated_at, created_by, param_seal) VALUES (?,?,?,?,?,?,?,?,?,?)').run(id, aKey, bKey, 'yanit_bekliyor', Math.round(sc.score), JSON.stringify(d), Date.now(), Date.now(), u.username, P.seal);
      D.audit(db, u, 'MERKEZI_TANISTIRMA_BASLATILDI', `${id} ${aKey}↔${bKey} puan ${Math.round(sc.score)}`);
      return { id };
    });
  }
  const introRow = (i) => ({ id: i.id, a: i.a, b: i.b, unitA: unitName(i.a.split('|')[0]), unitB: unitName(i.b.split('|')[0]), status: i.status, score: i.score, createdAt: i.created_at, updatedAt: i.updated_at });
  const listIntros = (u, { status }) => (status ? db.prepare('SELECT * FROM intros WHERE status=? ORDER BY created_at DESC LIMIT 500').all(status) : db.prepare('SELECT * FROM intros ORDER BY created_at DESC LIMIT 500').all()).map(introRow);
  function getIntro(u, id) {
    const i = db.prepare('SELECT * FROM intros WHERE id=?').get(id); if (!i) throw notFound('Tanıştırma bulunamadı.');
    const d = JSON.parse(i.data); return { ...introRow(i), createdBy: i.created_by, paramSeal: i.param_seal, resp: d.resp, outcome: d.outcome, meeting: d.meeting, history: d.history };
  }
  function introAction(u, id, action, body) {
    return tx(() => {
      const i = db.prepare('SELECT * FROM intros WHERE id=?').get(id); if (!i) throw notFound('Tanıştırma bulunamadı.');
      const d = JSON.parse(i.data), P = getParams().params, today = E.todayStr();
      const need = (...st) => { if (!st.includes(i.status)) throw conflict(`Bu işlem “${i.status}” durumunda yapılamaz.`); };
      switch (action) {
        case 'plan': {
          need('kabul'); const date = String(body.date || ''), time = String(body.time || ''), place = String(body.place || '').trim().slice(0, 200);
          if (!E.isDate(date) || date < today) throw bad('Tarih geçersiz veya geçmişte.'); if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw bad('Saat geçersiz (SS:DD).'); if (!place) throw bad('Görüşme yeri yazılmalı.');
          d.meeting = { date, time, place }; introHist(d, u, `Görüşme planlandı: ${date} ${time}`); saveIntro(i, 'bulusma_planli', d); D.audit(db, u, 'GORUSME_PLANLANDI', `${id} ${date} ${time}`); break;
        }
        case 'timeout': {
          need('yanit_bekliyor');
          if (E.daysBetween(E.dStr(new Date(i.created_at)), today) <= P.responseDays) throw unprocessable(`Yanıt süresi (${P.responseDays} gün) henüz dolmadı.`);
          introHist(d, u, 'Yanıt süresi doldu; kapatıldı (çift engellenmedi)'); saveIntro(i, 'zamanasimi', d); D.audit(db, u, 'TANISTIRMA_ZAMANASIMI', id); break;
        }
        case 'cancel': { need(...ACTIVE); const r = reasonOk(body.reason); introHist(d, u, 'İptal: ' + r); saveIntro(i, 'iptal', d); D.audit(db, u, 'TANISTIRMA_IPTAL', `${id}; ${r}`); break; }
        case 'complaint': { need(...ACTIVE); const r = reasonOk(body.reason); d.complaintBy = u.username; introHist(d, u, 'Şikâyet/güvenlik bildirimi: ' + r); saveIntro(i, 'sikayet', d); D.audit(db, u, 'SIKAYET', `${id} — ${r}`); break; }
        case 'close-complaint': {
          if (u.role !== 'admin') throw forbid('Yalnız yönetici şikâyeti kapatabilir.'); need('sikayet'); const r = reasonOk(body.reason);
          if (d.complaintBy === u.username && activeAdmins() > 1) throw forbid('Şikâyeti bildiren kişi kapatamaz (iki kişi kuralı).');
          introHist(d, u, 'Şikâyet kapatıldı: ' + r); saveIntro(i, 'bitti', d); D.audit(db, u, 'SIKAYET_KAPATILDI', `${id} — ${r}`); break;
        }
        default: throw bad('Bilinmeyen işlem.');
      }
      return { ok: true };
    });
  }

  /* ------------------------------------------------------------------ toplu denetim (birimlerin denetim paketleri) */
  function importAuditPackage(u, pkg) {
    const code = pkg && pkg.birim && pkg.birim.kod; const unit = typeof code === 'string' && db.prepare('SELECT * FROM units WHERE code=?').get(code);
    if (!unit) throw unprocessable('Paketteki birim kayıtlı değil.');
    const v = AU.verifyPackage(pkg, unit.sign_pub);
    if (!v.valid) { tx(() => D.audit(db, u, 'DENETIM_PAKETI_REDDEDILDI', `${code}; ${v.reason}`)); throw unprocessable('Paket doğrulanamadı: ' + v.reason); }
    return tx(() => {
      db.prepare('INSERT INTO audit_pkgs (unit, ts, json) VALUES (?,?,?)').run(code, pkg.olusturma || Date.now(), JSON.stringify(pkg));
      db.prepare('DELETE FROM audit_pkgs WHERE unit=? AND id NOT IN (SELECT id FROM audit_pkgs WHERE unit=? ORDER BY ts DESC LIMIT 5)').run(code, code);
      db.prepare('UPDATE units SET last_audit_ts=? WHERE code=?').run(Date.now(), code);
      D.audit(db, u, 'DENETIM_PAKETI_ALINDI', `${code}; ${pkg.denetimGunlugu ? pkg.denetimGunlugu.length : 0} kayıt`);
      return { unit: code, signature: 'geçerli', chain: AU.recomputeChain(pkg.denetimGunlugu) };
    });
  }
  function auditReport() {
    const units = db.prepare('SELECT * FROM units ORDER BY code').all().map((r) => ({ code: r.code, name: r.name, publicKey: r.sign_pub }));
    const pkgs = db.prepare('SELECT json FROM audit_pkgs ORDER BY ts DESC').all().map((r) => JSON.parse(r.json));
    const lastB = db.prepare('SELECT ver, seal FROM bundles ORDER BY ver DESC LIMIT 1').get();
    const rep = AU.aggregate(units, pkgs, lastB ? { seal: lastB.seal, version: lastB.ver } : null, { maxAgeDays: STALE_DAYS });
    return { ...rep, authority: lastB || null };
  }

  /* ------------------------------------------------------------------ panel, adalet, denetim */
  let chainCache = { t: 0, v: null };
  const chainStatus = (force) => { if (!force && Date.now() - chainCache.t < 60000 && chainCache.v) return chainCache.v; chainCache = { t: Date.now(), v: D.verifyAuditChain(db) }; return chainCache.v; };
  function dashboard() {
    const P = getParams(), today = E.todayStr();
    const by = (t) => Object.fromEntries(db.prepare(`SELECT status, COUNT(*) c FROM ${t} GROUP BY status`).all().map((r) => [r.status, r.c]));
    const late = db.prepare("SELECT created_at FROM intros WHERE status='yanit_bekliyor'").all().filter((r) => E.daysBetween(E.dStr(new Date(r.created_at)), today) > P.params.responseDays).length;
    const units = listUnits(), run = db.prepare('SELECT id, ts, pool, json FROM runs ORDER BY id DESC LIMIT 1').get(), lastB = db.prepare('SELECT ver, seal, ts FROM bundles ORDER BY ver DESC LIMIT 1').get();
    return {
      chain: chainStatus(), paramSeal: P.seal, paramVersion: P.ver, lastBundle: lastB || null, bundleCurrent: !!lastB && lastB.seal === P.seal,
      units, profiles: { total: db.prepare('SELECT COUNT(*) c FROM profiles').get().c, available: db.prepare('SELECT COUNT(*) c FROM profiles WHERE available=1').get().c }, intros: by('intros'),
      alerts: { lateResponses: late, complaints: db.prepare("SELECT COUNT(*) c FROM intros WHERE status='sikayet'").get().c, staleUnits: units.filter((x) => x.active && x.stale).length, pendingProposals: db.prepare("SELECT COUNT(*) c FROM param_proposals WHERE status='bekliyor'").get().c },
      lastRun: run ? { id: run.id, ts: run.ts, pool: run.pool, suggestions: JSON.parse(run.json).suggestions.length, noMatch: JSON.parse(run.json).noMatch.length } : null
    };
  }
  function fairness() {
    const P = getParams(), today = E.todayStr(), run = db.prepare('SELECT id, json FROM runs ORDER BY id DESC LIMIT 1').get();
    const noMatch = new Set(run ? JSON.parse(run.json).noMatch : []);
    const apps = db.prepare('SELECT * FROM profiles').all().map((r) => ({ key: r.key, unit: r.unit, p: readProfile(r) }));
    const intros = db.prepare('SELECT a, b, data FROM intros').all().map((r) => ({ a: r.a, b: r.b, d: JSON.parse(r.data) }));
    const groupBy = (fn, label) => {
      const G = {};
      for (const x of apps) {
        const k = fn(x); if (!k) continue; const g = (G[k] = G[k] || { n: 0, none: 0, intros: 0, decided: 0, acc: 0 }); g.n++; if (noMatch.has(x.key)) g.none++;
        for (const i of intros) { if (i.a !== x.key && i.b !== x.key) continue; g.intros++; const s = i.a === x.key ? 'a' : 'b'; if (i.d.resp[s].dec) { g.decided++; if (i.d.resp[s].dec === 'kabul') g.acc++; } }
      }
      const tot = Object.values(G).reduce((a, g) => ({ n: a.n + g.n, none: a.none + g.none }), { n: 0, none: 0 }), base = tot.n ? tot.none / tot.n * 100 : 0;
      return { label, rows: Object.entries(G).sort().map(([k, g]) => { const pct = g.n ? g.none / g.n * 100 : 0; return { group: k, n: g.n, none: g.none, nonePct: Math.round(pct), intros: g.intros, acceptPct: g.decided ? Math.round(g.acc / g.decided * 100) : null, warn: g.n >= 5 && pct - base > P.params.fairGapPct, gap: Math.round(pct - base) }; }) };
    };
    const ageGrp = (x) => { const y = ageOf(x.p.dogum) || 0; return y ? (y < 25 ? '18–24' : y < 30 ? '25–29' : y < 35 ? '30–34' : y < 40 ? '35–39' : '40+') : ''; };
    return { run: run ? run.id : null, gapPct: P.params.fairGapPct, groups: [
      groupBy((x) => unitName(x.unit), 'Birime göre'), groupBy((x) => (x.p.cins === 'K' ? 'Kadın' : x.p.cins === 'E' ? 'Erkek' : ''), 'Cinsiyete göre'),
      groupBy((x) => (x.p.il || '').trim(), 'İle göre'), groupBy((x) => P.params.eduLevels[+x.p.edu] || '', 'Eğitim düzeyine göre'), groupBy(ageGrp, 'Yaş grubuna göre')] };
  }
  function listAudit({ q, offset = 0, limit = 100 }) {
    limit = Math.min(500, Math.max(10, +limit || 100)); offset = Math.max(0, +offset || 0);
    const s = q ? `%${String(q).slice(0, 80).replace(/[\\%_]/g, (m) => '\\' + m)}%` : null;
    const rows = s ? db.prepare("SELECT * FROM audit WHERE action LIKE ? ESCAPE '\\' OR username LIKE ? ESCAPE '\\' OR detail LIKE ? ESCAPE '\\' ORDER BY i DESC LIMIT ? OFFSET ?").all(s, s, s, limit, offset) : db.prepare('SELECT * FROM audit ORDER BY i DESC LIMIT ? OFFSET ?').all(limit, offset);
    return { total: db.prepare('SELECT COUNT(*) c FROM audit').get().c, items: rows };
  }
  const pkgLog = () => db.prepare('SELECT * FROM pkg_log ORDER BY id DESC LIMIT 200').all();

  return {
    HttpError, ensureInit, getParams, paramsInfo, proposeParams, decideProposal, setRequire2fa, publishBundle, getBundle,
    createUser, listUsers, updateUser, login, authenticate, logout, changePassword, totpSetup, totpEnable, requires2fa,
    addUnit, updateUnit, listUnits, importUnitPackage, exportForUnit, listProfiles, getProfile,
    runMatch, latestRun, why, startIntro, listIntros, getIntro, introAction,
    importAuditPackage, auditReport, dashboard, fairness, listAudit, chainStatus, pkgLog, tx
  };
}

module.exports = { createAuthorityService };
