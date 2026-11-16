'use strict';
/**
 * İş mantığı katmanı. HTTP'den bağımsızdır; her yazma işlemi tek bir işlemde (iş verisi + denetim kaydı) yapılır.
 * Yetki denetimi burada (sunucu tarafında) uygulanır — istemciye güvenilmez.
 */
const path = require('node:path');
const { Worker } = require('node:worker_threads');
const E = require('./engine');
const C = require('./crypto');
const D = require('./db');
const AU = require('./authority');

class HttpError extends Error {
  constructor(status, message, extra) { super(message); this.status = status; this.extra = extra; }
}
const bad = (m, x) => new HttpError(400, m, x);
const forbid = (m = 'Bu işlem için yetkiniz yok.') => new HttpError(403, m);
const notFound = (m = 'Kayıt bulunamadı.') => new HttpError(404, m);
const conflict = (m) => new HttpError(409, m);
const unprocessable = (m, x) => new HttpError(422, m, x);

const canon = C.canon;
const sealOf = (p) => E.sealParams(p); // kurum adı hariç: otoritenin yönettiği parametrelerin mührü
const pad4 = (n) => String(n).padStart(4, '0');
const OPEN_ST = ['taslak', 'dogrulama', 'aktif', 'beklemede', 'inceleme', 'engelli'];
const EDITABLE = ['taslak', 'dogrulama', 'aktif', 'beklemede', 'inceleme', 'engelli'];
const reasonOk = (r, min = 5) => { const s = String(r || '').trim(); if (s.length < min) throw bad(`Gerekçe en az ${min} karakter olmalı.`); return s.slice(0, 500); };

function createService({ db, kr, config }) {
  const tx = D.makeTx(db);
  const aad = (id) => 'applicant:' + id;
  let paramsCache = null;

  /* ------------------------------------------------------------------ parametreler */
  function loadParams() {
    const r = db.prepare('SELECT * FROM params_versions ORDER BY ver DESC LIMIT 1').get();
    if (!r) return null;
    paramsCache = { ver: r.ver, seal: r.seal, params: JSON.parse(r.json) };
    return paramsCache;
  }
  function getParams() { return paramsCache || loadParams(); }
  function applyParams(actor, params, reason, how, bundleVer) {
    const errs = E.validateParams(params);
    if (errs.length) throw unprocessable('Parametreler geçersiz.', { errors: errs });
    const cur = getParams();
    if (canon(params) === canon(cur.params)) throw bad('Parametrelerde değişiklik yok.');
    const ver = cur.ver + 1, seal = sealOf(params);
    db.prepare('INSERT INTO params_versions (ver, ts, username, reason, seal, json) VALUES (?,?,?,?,?,?)').run(ver, Date.now(), actor.username, reason, seal, JSON.stringify(params));
    D.audit(db, actor, 'PARAMETRE_DEGISTI', `sürüm ${ver}; mühür ${seal}; ${how}; gerekçe: ${reason}`);
    if (bundleVer) { D.metaSet(db, 'authority_version', bundleVer); D.metaSet(db, 'official_seal', seal); D.audit(db, actor, 'MERKEZI_PAKET_UYGULANDI', `paket sürümü ${bundleVer}; mühür ${seal}`); }
    loadParams();
    return { ver, seal };
  }
  function ensureInit() {
    if (db.prepare('SELECT COUNT(*) c FROM params_versions').get().c) return;
    tx(() => {
      const p = E.DEFAULT_PARAMS(), seal = sealOf(p);
      db.prepare('INSERT INTO params_versions (ver, ts, username, reason, seal, json) VALUES (1,?,?,?,?,?)').run(Date.now(), 'sistem', 'İlk kurulum (varsayılan parametreler)', seal, JSON.stringify(p));
      D.audit(db, null, 'KURULUM', `varsayılan parametreler; mühür ${seal}`);
    });
    loadParams();
  }
  const activeAdmins = () => db.prepare("SELECT COUNT(*) c FROM users WHERE role='admin' AND active=1").get().c;
  function paramsInfo() {
    const cur = getParams();
    return {
      version: cur.ver, seal: cur.seal, params: cur.params, officialSeal: D.metaGet(db, 'official_seal', ''),
      require2fa: D.metaGet(db, 'require2fa', '0') === '1',
      authorityVersion: authorityVersion(), lockParams: !!config.lockParams, authorityConfigured: !!config.authorityPub, unitCode: config.unitCode,
      history: db.prepare('SELECT ver, ts, username, reason, seal FROM params_versions ORDER BY ver DESC LIMIT 50').all(),
      proposals: db.prepare("SELECT id, ts, proposer, reason, seal, status, decided_by, decided_ts, decision_note, bundle_ver FROM param_proposals ORDER BY id DESC LIMIT 20").all(),
      adminCount: activeAdmins()
    };
  }
  const stripInst = (p) => { const { institution, ...r } = p || {}; return r; };
  function proposeParams(u, params, reason, opts = {}) {
    reason = reasonOk(reason);
    if (config.lockParams && !opts.bundleVer && canon(stripInst(params)) !== canon(stripInst(getParams().params))) throw forbid('Bu kurulumda parametreler yalnızca merkezî otoritenin imzalı paketiyle değiştirilir (yalnız kurum adı yerelde değişebilir).');
    const errs = E.validateParams(params);
    if (errs.length) throw unprocessable('Parametreler geçersiz.', { errors: errs });
    if (canon(params) === canon(getParams().params)) throw bad('Parametrelerde değişiklik yok.');
    return tx(() => {
      if (activeAdmins() < 2) { // tek yönetici: doğrudan uygulanır, ancak ayrı bir işlem türüyle denetlenir
        const r = applyParams(u, params, reason, 'tek yönetici — doğrudan', opts.bundleVer);
        return { applied: true, ...r };
      }
      const seal = sealOf(params);
      const id = db.prepare('INSERT INTO param_proposals (ts, proposer, reason, json, seal, bundle_ver) VALUES (?,?,?,?,?,?)').run(Date.now(), u.username, reason, JSON.stringify(params), seal, opts.bundleVer || null).lastInsertRowid;
      D.audit(db, u, 'PARAMETRE_ONERISI', `öneri ${id}; mühür ${seal}; gerekçe: ${reason}`);
      return { applied: false, proposalId: Number(id), seal };
    });
  }
  function decideProposal(u, id, approve, note) {
    return tx(() => {
      const p = db.prepare("SELECT * FROM param_proposals WHERE id=? AND status='bekliyor'").get(id);
      if (!p) throw notFound('Bekleyen öneri bulunamadı.');
      if (p.proposer === u.username) throw forbid('Öneriyi yapan kişi onaylayamaz (iki kişi kuralı).');
      if (approve) {
        const r = applyParams(u, JSON.parse(p.json), p.reason, `öneri ${id} — ${p.proposer} önerdi, ${u.username} onayladı`, p.bundle_ver);
        db.prepare("UPDATE param_proposals SET status='onaylandi', decided_by=?, decided_ts=?, decision_note=? WHERE id=?").run(u.username, Date.now(), String(note || ''), id);
        db.prepare("UPDATE param_proposals SET status='reddedildi', decided_by='sistem', decided_ts=?, decision_note='Yeni parametre sürümü yayımlandı' WHERE status='bekliyor'").run(Date.now());
        return { applied: true, ...r };
      }
      note = reasonOk(note);
      db.prepare("UPDATE param_proposals SET status='reddedildi', decided_by=?, decided_ts=?, decision_note=? WHERE id=?").run(u.username, Date.now(), note, id);
      D.audit(db, u, 'PARAMETRE_ONERISI_REDDEDILDI', `öneri ${id}; ${note}`);
      return { applied: false };
    });
  }
  function setOfficialSeal(u, seal) {
    seal = String(seal || '').trim().toLowerCase();
    if (seal && !/^[0-9a-f]{64}$/.test(seal)) throw bad('Mühür 64 haneli onaltılık (hex) olmalı.');
    tx(() => { D.metaSet(db, 'official_seal', seal); D.audit(db, u, 'RESMI_MUHUR_TANIMLANDI', seal || '(temizlendi)'); });
    return { officialSeal: seal };
  }
  const authorityVersion = () => +D.metaGet(db, 'authority_version', '0');
  function assertAuthorityReady() {
    if (config.lockParams && authorityVersion() === 0) throw unprocessable('Merkezî parametre paketi henüz yüklenmedi; yüklenene kadar eşleştirme ve tanıştırma yapılamaz.');
  }
  function importBundle(u, bundle) {
    if (!config.authorityPub) throw bad('Bu kurulumda merkezî otorite açık anahtarı tanımlı değil (AUTHORITY_PUBKEY_FILE).');
    const v = AU.verifyBundle(bundle, config.authorityPub);
    if (!v.ok) throw unprocessable('Paket doğrulanamadı.', { errors: v.errors });
    const last = authorityVersion();
    if (v.body.version <= last) throw conflict(`Paket sürümü (${v.body.version}) mevcut sürümden (${last}) yeni değil; eski paket yeniden uygulanamaz.`);
    const merged = { ...v.body.params, institution: getParams().params.institution };
    const errs = E.validateParams(merged); if (errs.length) throw unprocessable('Parametreler geçersiz.', { errors: errs });
    const reason = `Merkezî parametre paketi v${v.body.version}${v.body.note ? ': ' + v.body.note : ''}`;
    return tx(() => {
      if (canon(merged) === canon(getParams().params)) { // içerik aynı: yalnız sürümü kaydet
        D.metaSet(db, 'authority_version', v.body.version); D.metaSet(db, 'official_seal', v.body.seal);
        D.audit(db, u, 'MERKEZI_PAKET_ALINDI', `paket sürümü ${v.body.version}; içerik zaten güncel; mühür ${v.body.seal}`);
        return { applied: true, unchanged: true, version: v.body.version };
      }
      return { ...proposeParams(u, merged, reason, { bundleVer: v.body.version }), version: v.body.version };
    });
  }
  function setRequire2fa(u, on) { tx(() => { D.metaSet(db, 'require2fa', on ? '1' : '0'); D.audit(db, u, 'IKI_ASAMALI_ZORUNLULUK', on ? 'açık' : 'kapalı'); }); return { require2fa: !!on }; }

  /* ------------------------------------------------------------------ kullanıcı / oturum */
  const pubUser = (r) => ({ id: r.id, username: r.username, name: r.name, role: r.role, active: !!r.active, mustChange: !!r.must_change, totpEnabled: !!r.totp_enabled, locked: r.lock_until > Date.now(), createdAt: r.created_at });
  function checkPasswordPolicy(pw, username) {
    const min = getParams().params.passwordMinLength;
    pw = String(pw || '');
    if (pw.length < min) throw bad(`Parola en az ${min} karakter olmalı.`);
    if (pw.length > 200) throw bad('Parola çok uzun.');
    if (pw.toLowerCase().includes(String(username).toLowerCase())) throw bad('Parola kullanıcı adını içeremez.');
    if (/^(.)\1+$/.test(pw)) throw bad('Parola tek karakterden oluşamaz.');
    if (!(/[a-zçğıöşü]/.test(pw) && /[A-ZÇĞİÖŞÜ0-9]/.test(pw))) throw bad('Parola küçük harf ile büyük harf veya rakam içermeli.');
  }
  function tempPassword() { return C.randToken(9) + 'aA1'; }
  function createUser(actor, { username, name, role }, plain) {
    username = String(username || '').trim(); name = String(name || '').trim();
    if (!/^[a-z0-9._-]{3,32}$/i.test(username)) throw bad('Kullanıcı adı 3–32 karakter (harf, rakam, . _ -) olmalı.');
    if (!name || name.length > 80) throw bad('Ad soyad gerekli (en çok 80 karakter).');
    if (!['admin', 'gorevli', 'denetci'].includes(role)) throw bad('Geçersiz rol.');
    const pw = plain || tempPassword();
    if (plain) checkPasswordPolicy(plain, username);
    return tx(() => {
      if (db.prepare('SELECT 1 FROM users WHERE username=?').get(username)) throw conflict('Bu kullanıcı adı kullanılıyor.');
      const id = db.prepare('INSERT INTO users (username, name, role, pw_hash, must_change, created_at, created_by) VALUES (?,?,?,?,?,?,?)').run(username, name, role, C.hashPassword(pw), plain ? 0 : 1, Date.now(), actor ? actor.username : 'cli').lastInsertRowid;
      D.audit(db, actor, 'KULLANICI_EKLENDI', `${username} (${role})`);
      return { id: Number(id), username, tempPassword: plain ? undefined : pw };
    });
  }
  function listUsers() { return db.prepare('SELECT * FROM users ORDER BY id').all().map(pubUser); }
  function updateUser(actor, id, patch) {
    return tx(() => {
      const t = db.prepare('SELECT * FROM users WHERE id=?').get(id);
      if (!t) throw notFound('Kullanıcı bulunamadı.');
      const out = {};
      if (t.id === actor.id && (patch.active === false || (patch.role && patch.role !== t.role))) throw forbid('Kendi hesabınızın rolünü/durumunu değiştiremezsiniz.');
      if (typeof patch.active === 'boolean' && patch.active !== !!t.active) {
        if (!patch.active && t.role === 'admin' && activeAdmins() < 2) throw conflict('Son etkin yönetici pasifleştirilemez.');
        db.prepare('UPDATE users SET active=? WHERE id=?').run(patch.active ? 1 : 0, id);
        if (!patch.active) db.prepare('DELETE FROM sessions WHERE user_id=?').run(id);
        D.audit(db, actor, 'KULLANICI_DURUMU', `${t.username}: ${patch.active ? 'etkin' : 'pasif'}`);
      }
      if (patch.role && patch.role !== t.role) {
        if (!['admin', 'gorevli', 'denetci'].includes(patch.role)) throw bad('Geçersiz rol.');
        if (t.role === 'admin' && activeAdmins() < 2) throw conflict('Son etkin yöneticinin rolü değiştirilemez.');
        db.prepare('UPDATE users SET role=? WHERE id=?').run(patch.role, id);
        db.prepare('DELETE FROM sessions WHERE user_id=?').run(id);
        D.audit(db, actor, 'KULLANICI_ROLU', `${t.username}: ${t.role} → ${patch.role}`);
      }
      if (patch.resetPassword) {
        const pw = tempPassword();
        db.prepare('UPDATE users SET pw_hash=?, must_change=1, fails=0, lock_until=0 WHERE id=?').run(C.hashPassword(pw), id);
        db.prepare('DELETE FROM sessions WHERE user_id=?').run(id);
        D.audit(db, actor, 'PAROLA_SIFIRLANDI', t.username);
        out.tempPassword = pw;
      }
      if (patch.resetTotp) {
        db.prepare('UPDATE users SET totp_secret=NULL, totp_enabled=0, totp_last=0 WHERE id=?').run(id);
        D.audit(db, actor, 'IKI_ASAMALI_SIFIRLANDI', t.username);
      }
      if (patch.unlock) { db.prepare('UPDATE users SET fails=0, lock_until=0 WHERE id=?').run(id); D.audit(db, actor, 'HESAP_ACILDI', t.username); }
      return out;
    });
  }
  const loginFails = new Map(); // ip → [zaman damgaları]
  function ipLimited(ip) {
    const now = Date.now(), L = (loginFails.get(ip) || []).filter((t) => now - t < 10 * 60000);
    loginFails.set(ip, L); return L.length >= 20;
  }
  function login({ username, password, code }, ip, ua) {
    username = String(username || '').trim(); password = String(password || '');
    if (ipLimited(ip)) throw new HttpError(429, 'Çok fazla başarısız deneme. Daha sonra tekrar deneyin.');
    const u = db.prepare('SELECT * FROM users WHERE username=?').get(username);
    const fail = (why, actor) => {
      (loginFails.get(ip) || loginFails.set(ip, []).get(ip)).push(Date.now());
      tx(() => D.audit(db, actor || null, 'GIRIS_HATASI', `${actor ? actor.username : 'bilinmeyen kullanıcı'} — ${why}; ip ${ip}`));
      return new HttpError(401, 'Kullanıcı adı veya parola hatalı.');
    };
    if (!u) { C.verifyPassword(password, C.DUMMY_HASH); throw fail('kullanıcı yok'); }
    const actor = { username: u.username, role: u.role };
    if (u.lock_until > Date.now()) throw new HttpError(423, `Hesap geçici olarak kilitli (${Math.ceil((u.lock_until - Date.now()) / 60000)} dk).`);
    const pwOk = C.verifyPassword(password, u.pw_hash);
    if (!pwOk || !u.active) {
      const fails = u.fails + 1;
      db.prepare('UPDATE users SET fails=?, lock_until=? WHERE id=?').run(fails >= 5 ? 0 : fails, fails >= 5 ? Date.now() + 15 * 60000 : 0, u.id);
      throw fail(!u.active ? 'pasif hesap' : fails >= 5 ? 'hatalı parola; hesap 15 dk kilitlendi' : 'hatalı parola', actor);
    }
    if (u.totp_enabled) {
      const step = code ? C.totpVerify(u.totp_secret, code) : null;
      if (step === null || step <= u.totp_last) {
        if (!code) throw new HttpError(401, 'İki aşamalı doğrulama kodu gerekli.', { need2fa: true });
        throw fail('hatalı doğrulama kodu', actor);
      }
      db.prepare('UPDATE users SET totp_last=? WHERE id=?').run(step, u.id);
    }
    const token = C.randToken(32), csrf = C.randToken(24), now = Date.now();
    tx(() => {
      db.prepare('UPDATE users SET fails=0, lock_until=0 WHERE id=?').run(u.id);
      db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now);
      db.prepare('INSERT INTO sessions (token_hash, user_id, csrf, created_at, last_seen, expires_at, ip, ua) VALUES (?,?,?,?,?,?,?,?)')
        .run(C.sha256(token), u.id, csrf, now, now, now + config.sessionMaxHours * 3600000, ip, String(ua || '').slice(0, 200));
      D.audit(db, actor, 'GIRIS', `oturum açıldı; ip ${ip}`);
    });
    return { token, csrf, user: pubUser(u) };
  }
  function authenticate(token) {
    if (!token) return null;
    const s = db.prepare('SELECT * FROM sessions WHERE token_hash=?').get(C.sha256(token));
    if (!s) return null;
    const now = Date.now(), idle = getParams().params.sessionIdleMinutes * 60000;
    if (s.expires_at < now || s.last_seen + idle < now) { db.prepare('DELETE FROM sessions WHERE token_hash=?').run(s.token_hash); return null; }
    const u = db.prepare('SELECT * FROM users WHERE id=?').get(s.user_id);
    if (!u || !u.active) return null;
    if (now - s.last_seen > 30000) db.prepare('UPDATE sessions SET last_seen=? WHERE token_hash=?').run(now, s.token_hash);
    return { user: { id: u.id, username: u.username, name: u.name, role: u.role, mustChange: !!u.must_change, totpEnabled: !!u.totp_enabled }, csrf: s.csrf, tokenHash: s.token_hash };
  }
  function logout(actor, tokenHash) { tx(() => { db.prepare('DELETE FROM sessions WHERE token_hash=?').run(tokenHash); D.audit(db, actor, 'OTURUM_KAPATILDI', ''); }); }
  function changePassword(actor, tokenHash, { oldPassword, newPassword }) {
    const u = db.prepare('SELECT * FROM users WHERE id=?').get(actor.id);
    if (!C.verifyPassword(String(oldPassword || ''), u.pw_hash)) throw new HttpError(401, 'Mevcut parola hatalı.');
    checkPasswordPolicy(newPassword, u.username);
    if (C.verifyPassword(String(newPassword), u.pw_hash)) throw bad('Yeni parola eskisiyle aynı olamaz.');
    tx(() => {
      db.prepare('UPDATE users SET pw_hash=?, must_change=0 WHERE id=?').run(C.hashPassword(newPassword), u.id);
      db.prepare('DELETE FROM sessions WHERE user_id=? AND token_hash<>?').run(u.id, tokenHash);
      D.audit(db, actor, 'PAROLA_DEGISTI', '');
    });
    return { ok: true };
  }
  function totpSetup(actor) {
    const u = db.prepare('SELECT * FROM users WHERE id=?').get(actor.id);
    if (u.totp_enabled) throw conflict('İki aşamalı doğrulama zaten etkin.');
    const secret = C.totpNewSecret();
    db.prepare('UPDATE users SET totp_secret=? WHERE id=?').run(secret, u.id);
    const inst = encodeURIComponent(getParams().params.institution);
    return { secret, otpauth: `otpauth://totp/${inst}:${encodeURIComponent(u.username)}?secret=${secret}&issuer=${inst}&digits=6&period=30` };
  }
  function totpEnable(actor, code) {
    const u = db.prepare('SELECT * FROM users WHERE id=?').get(actor.id);
    if (!u.totp_secret || u.totp_enabled) throw conflict('Önce kurulumu başlatın.');
    const step = C.totpVerify(u.totp_secret, code);
    if (step === null) throw bad('Kod hatalı.');
    tx(() => { db.prepare('UPDATE users SET totp_enabled=1, totp_last=? WHERE id=?').run(step, u.id); D.audit(db, actor, 'IKI_ASAMALI_ACILDI', ''); });
    return { ok: true };
  }

  /* ------------------------------------------------------------------ adaylar */
  const readData = (row) => JSON.parse(C.decrypt(kr, row.data, aad(row.id)));
  const flat = (row) => ({ ...readData(row), id: row.id, status: row.status });
  const initial = (s) => (s ? s[0] + '•••' : '');
  const maskTC = (n) => (!n ? '' : n.length > 5 ? n.slice(0, 3) + '•••••' + n.slice(-3) : '•••');
  function writeRow(id, status, data, { version, create } = {}) {
    const open = OPEN_ST.includes(status) && data.kimNo;
    const idh = open ? C.hmacIndex(kr, data.kimNo) : null;
    const blob = C.encrypt(kr, JSON.stringify(data), aad(id)), now = Date.now();
    try {
      if (create) db.prepare('INSERT INTO applicants (id, status, id_hash, data, version, created_at, updated_at) VALUES (?,?,?,?,1,?,?)').run(id, status, idh, blob, now, now);
      else {
        const r = db.prepare('UPDATE applicants SET status=?, id_hash=?, data=?, version=version+1, updated_at=?, closed_at=CASE WHEN ? IN (\'cekildi\',\'tamamlandi\',\'silindi\') THEN COALESCE(closed_at, ?) ELSE NULL END WHERE id=? AND version=?').run(status, idh, blob, now, status, now, id, version);
        if (r.changes !== 1) throw conflict('Kayıt başka bir kullanıcı tarafından değiştirildi; sayfayı yenileyin.');
      }
    } catch (e) {
      if (e instanceof HttpError) throw e;
      if (/UNIQUE/.test(String(e.message)) && /id_hash/.test(String(e.message))) throw conflict('Bu kimlik numarasıyla kayıtlı, açık durumda başka bir aday var.');
      throw e;
    }
  }
  const histPush = (data, actor, text) => { data.history.push({ ts: Date.now(), user: actor.username, text }); if (data.history.length > 200) data.history.splice(0, data.history.length - 200); };
  const activeIntroCount = (id) => db.prepare(`SELECT COUNT(*) c FROM intros WHERE (a=? OR b=?) AND status IN (${E.ACTIVE_INTRO.map(() => '?').join(',')})`).get(id, id, ...E.ACTIVE_INTRO).c;

  function viewApplicant(a, role, today) {
    const age = a.dogum ? E.ageOn(a.dogum, today) : null;
    if (role === 'denetci') {
      return { id: a.id, status: a.status, ad: initial(a.ad), soyad: initial(a.soyad), kimNo: maskTC(a.kimNo), cins: a.cins, age, il: a.il, edu: a.edu, medeni: a.medeni, cocuk: a.cocuk, demo: !!a.demo, masked: true };
    }
    return { ...a, age, masked: false };
  }
  function listApplicants(u, { status, q, page = 1, pageSize = 50 }) {
    const today = E.todayStr();
    pageSize = Math.min(100, Math.max(10, +pageSize || 50)); page = Math.max(1, +page || 1);
    let rows = status ? db.prepare('SELECT * FROM applicants WHERE status=? ORDER BY created_at DESC').all(status) : db.prepare('SELECT * FROM applicants ORDER BY created_at DESC').all();
    let items = rows.map((r) => ({ r, a: flat(r) }));
    if (q) { const s = String(q).toLowerCase(); items = items.filter(({ a }) => (a.id + ' ' + a.ad + ' ' + a.soyad + ' ' + a.il).toLowerCase().includes(s)); }
    const total = items.length;
    items = items.slice((page - 1) * pageSize, page * pageSize);
    return {
      total, page, pageSize,
      items: items.map(({ r, a }) => ({
        id: a.id, status: a.status, ad: u.role === 'denetci' ? initial(a.ad) : a.ad, soyad: u.role === 'denetci' ? initial(a.soyad) : a.soyad,
        kimNo: maskTC(a.kimNo), cins: a.cins, age: a.dogum ? E.ageOn(a.dogum, today) : null, il: a.il, demo: !!a.demo, activeIntros: activeIntroCount(a.id), version: r.version
      }))
    };
  }
  function getApplicant(u, id, { audit = true } = {}) {
    const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(id);
    if (!row) throw notFound('Aday bulunamadı.');
    const a = flat(row), P = getParams().params, today = E.todayStr();
    if (audit) tx(() => D.audit(db, u, 'ADAY_GORULDU', `${id}${u.role === 'denetci' ? ' (maskeli)' : ''}`));
    const intros = db.prepare('SELECT id, a, b, status FROM intros WHERE a=? OR b=? ORDER BY created_at DESC').all(id, id);
    return {
      applicant: viewApplicant(a, u.role, today), version: row.version,
      check: u.role === 'denetci' || row.status === 'silindi' ? null : E.checkApplicant(a, P, today),
      intros: intros.map((i) => ({ id: i.id, status: i.status, other: i.a === id ? i.b : i.a })),
      cooldownActive: !!(a.cooldownUntil && today < a.cooldownUntil)
    };
  }
  function createApplicant(u) {
    return tx(() => {
      const n = D.counterNext(db, 'applicant'), id = `A-${new Date().getFullYear()}-${pad4(n)}`;
      const data = E.newApplicantData(getParams().params); histPush(data, u, 'Aday kaydı oluşturuldu');
      writeRow(id, 'taslak', data, { create: true });
      D.audit(db, u, 'ADAY_OLUSTURULDU', id);
      return { id };
    });
  }
  function updateApplicant(u, id, input, version) {
    return tx(() => {
      const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(id);
      if (!row) throw notFound('Aday bulunamadı.');
      if (!EDITABLE.includes(row.status)) throw conflict('Bu durumdaki kayıt düzenlenemez.');
      if (+version !== row.version) throw conflict('Kayıt başka bir kullanıcı tarafından değiştirildi; sayfayı yenileyin.');
      const base = readData(row), P = getParams().params;
      const { data, errors } = E.sanitizeApplicant(input, P, base);
      if (errors.length) throw unprocessable('Girdiler geçersiz.', { errors });
      // sunucu tarafı alanlar istemciden alınmaz
      data.safetyBlock = base.safetyBlock; data.safetyReason = base.safetyReason; data.safetyBy = base.safetyBy; data.cooldownUntil = base.cooldownUntil; data.history = base.history; data.demo = base.demo;
      histPush(data, u, 'Güncellendi');
      writeRow(id, row.status, data, { version: row.version });
      D.audit(db, u, 'ADAY_GUNCELLENDI', id);
      const nv = db.prepare('SELECT version FROM applicants WHERE id=?').get(id).version;
      return { version: nv, check: E.checkApplicant({ ...data, id, status: row.status }, P, E.todayStr()) };
    });
  }
  function closeActiveIntros(actor, id, newStatus, why) {
    const L = db.prepare(`SELECT * FROM intros WHERE (a=? OR b=?) AND status IN (${E.ACTIVE_INTRO.map(() => '?').join(',')})`).all(id, id, ...E.ACTIVE_INTRO);
    for (const i of L) {
      const d = JSON.parse(i.data); d.history.push({ ts: Date.now(), user: actor.username, text: why });
      db.prepare('UPDATE intros SET status=?, data=?, version=version+1 WHERE id=?').run(newStatus, JSON.stringify(d), i.id);
      D.audit(db, actor, 'TANISTIRMA_KAPATILDI', `${i.id} → ${newStatus} (${why})`);
    }
  }
  function applicantAction(u, id, action, body) {
    return tx(() => {
      const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(id);
      if (!row) throw notFound('Aday bulunamadı.');
      const a = readData(row), P = getParams().params, today = E.todayStr();
      const setSt = (st, text, mut) => { if (mut) mut(a); histPush(a, u, text); writeRow(id, st, a, { version: row.version }); };
      switch (action) {
        case 'activate': {
          if (!['taslak', 'dogrulama', 'beklemede'].includes(row.status)) throw conflict('Bu durumdan havuza alınamaz.');
          const c = E.checkApplicant({ ...a, id, status: row.status }, P, today);
          if (c.status !== 'UYGUN') throw unprocessable('Havuza alma koşulları tamam değil.', { check: c });
          setSt('aktif', 'Havuza alındı'); D.audit(db, u, 'ADAY_AKTIF', id); break;
        }
        case 'pause':
          if (row.status !== 'aktif') throw conflict('Yalnız aktif aday beklemeye alınabilir.');
          setSt('beklemede', 'Beklemeye alındı'); D.audit(db, u, 'ADAY_BEKLEMEDE', id); break;
        case 'withdraw': {
          const r = reasonOk(body.reason);
          if (!OPEN_ST.includes(row.status)) throw conflict('Bu kayıt zaten kapalı.');
          closeActiveIntros(u, id, 'cekildi', 'aday çekildi');
          setSt('cekildi', 'Aday çekildi: ' + r); D.audit(db, u, 'ADAY_CEKILDI', id); break;
        }
        case 'safety': {
          const r = reasonOk(body.reason);
          if (!OPEN_ST.includes(row.status)) throw conflict('Kapalı kayda güvenlik engeli konamaz.');
          closeActiveIntros(u, id, 'sikayet', 'güvenlik engeli nedeniyle incelemeye alındı');
          setSt('engelli', 'Güvenlik engeli: ' + r, (x) => { x.safetyBlock = true; x.safetyReason = r; x.safetyBy = u.username; });
          D.audit(db, u, 'GUVENLIK_ENGELI', `${id} — ${r}`); break;
        }
        case 'release': {
          if (u.role !== 'admin') throw forbid('Yalnız yönetici engeli kaldırabilir.');
          const r = reasonOk(body.reason);
          if (!['engelli', 'inceleme'].includes(row.status)) throw conflict('Kayıtta kaldırılacak engel/inceleme yok.');
          if (a.safetyBy === u.username && activeAdmins() > 1) throw forbid('Engeli koyan kişi kaldıramaz (iki kişi kuralı).');
          setSt('beklemede', 'Engel kaldırıldı: ' + r, (x) => { x.safetyBlock = false; x.safetyReason = ''; x.safetyBy = ''; });
          D.audit(db, u, 'ENGEL_KALDIRILDI', `${id} — ${r}`); break;
        }
        case 'anonymize': {
          if (u.role !== 'admin') throw forbid('Yalnız yönetici kişisel verileri silebilir.');
          const r = reasonOk(body.reason);
          if (row.status === 'silindi') throw conflict('Kayıt zaten anonimleştirilmiş.');
          closeActiveIntros(u, id, 'cekildi', 'aday verileri silindi');
          const anon = { anon: true, history: [{ ts: Date.now(), user: u.username, text: 'Kişisel veriler silindi (anonimleştirildi): ' + r }] };
          writeRow(id, 'silindi', anon, { version: row.version });
          D.audit(db, u, 'ADAY_ANONIMLESTIRILDI', `${id} — ${r}`); break;
        }
        default: throw bad('Bilinmeyen işlem.');
      }
      return { ok: true };
    });
  }
  function applicantCard(u, id) {
    const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(id);
    if (!row) throw notFound('Aday bulunamadı.');
    const a = flat(row), P = getParams().params;
    tx(() => D.audit(db, u, 'TANITIM_KARTI', id));
    return { id, ad: String(a.ad || '').split(' ')[0], age: a.dogum ? E.ageOn(a.dogum, E.todayStr()) : null, il: a.il, edu: P.eduLevels[+a.edu] || '', meslek: a.meslek, medeni: (E.MEDENI.find((m) => m[0] === a.medeni) || [0, ''])[1], cocuk: a.cocuk, tanitim: a.tanitim, institution: P.institution };
  }

  /* ------------------------------------------------------------------ eşleştirme */
  function buildIctx() {
    const active = new Map(), pairs = new Set(), blocked = new Set();
    for (const i of db.prepare('SELECT a, b, status FROM intros').all()) {
      pairs.add(E.pkey(i.a, i.b));
      if (E.ACTIVE_INTRO.includes(i.status)) { active.set(i.a, (active.get(i.a) || 0) + 1); active.set(i.b, (active.get(i.b) || 0) + 1); }
    }
    for (const b of db.prepare('SELECT a, b FROM blocked').all()) blocked.add(E.pkey(b.a, b.b));
    return { active, pairs, blocked };
  }
  const nameOf = (a, role) => (!a || a.anon ? '(silinmiş kayıt)' : role === 'denetci' ? `${initial(a.ad)} ${initial(a.soyad)}` : `${a.ad} ${a.soyad}`);
  let matchBusy = false;
  const WORKER_THRESHOLD = 300; // bu kadar adaydan büyük havuzlarda hesap ayrı iş parçacığında yapılır
  async function runMatch(u) {
    assertAuthorityReady();
    if (matchBusy) throw conflict('Bir eşleştirme koşusu zaten sürüyor.');
    matchBusy = true;
    try {
      const P = getParams(), today = E.todayStr();
      const all = db.prepare("SELECT * FROM applicants WHERE status='aktif'").all().map(flat);
      const ictx = buildIctx();
      const res = all.length > WORKER_THRESHOLD
        ? await new Promise((resolve, reject) => {
          const w = new Worker(path.join(__dirname, 'match-worker.js'), { workerData: { all, P: P.params, today, ictx } });
          w.once('message', resolve); w.once('error', reject);
          w.once('exit', (c) => { if (c !== 0) reject(new Error('Eşleştirme iş parçacığı beklenmedik şekilde sonlandı.')); });
        })
        : E.runMatching(all, P.params, today, ictx);
      return tx(() => {
        if (getParams().seal !== P.seal) throw conflict('Eşleştirme sırasında parametreler değişti; yeniden çalıştırın.');
        const id = db.prepare('INSERT INTO runs (ts, username, param_seal, pool, considered, json) VALUES (?,?,?,?,?,?)').run(Date.now(), u.username, P.seal, res.pool, res.considered, JSON.stringify({ suggestions: res.suggestions, noMatch: res.noMatch })).lastInsertRowid;
        db.prepare('DELETE FROM runs WHERE id <= ?').run(Number(id) - 5);
        D.audit(db, u, 'ESLESTIRME_CALISTIRILDI', `koşu ${id}; havuz ${res.pool}; öneri ${res.suggestions.length}; mühür ${P.seal.slice(0, 12)}`);
        return { id: Number(id), pool: res.pool, suggestions: res.suggestions.length, noMatch: res.noMatch.length };
      });
    } finally { matchBusy = false; }
  }
  function latestRun(u, { q, page = 1, pageSize = 100 }) {
    const r = db.prepare('SELECT * FROM runs ORDER BY id DESC LIMIT 1').get();
    if (!r) return { run: null };
    const j = JSON.parse(r.json), P = getParams(), ictx = buildIctx(), today = E.todayStr();
    const cache = new Map(); const get = (id) => { if (!cache.has(id)) { const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(id); cache.set(id, row ? flat(row) : null); } return cache.get(id); };
    let L = j.suggestions;
    const mk = (p) => { const a = get(p.a), b = get(p.b); return { ...p, nameA: nameOf(a, u.role), nameB: nameOf(b, u.role), ageA: a && a.dogum ? E.ageOn(a.dogum, today) : null, ageB: b && b.dogum ? E.ageOn(b.dogum, today) : null, ilA: a ? a.il : '', ilB: b ? b.il : '', canStart: !!(a && b && !a.anon && !b.anon && !E.pairOk(a, b, P.params, today, ictx)) }; };
    let items = L.map(mk);
    if (q) { const s = String(q).toLowerCase(); items = items.filter((x) => (x.nameA + x.nameB + x.a + x.b).toLowerCase().includes(s)); }
    const total = items.length; pageSize = Math.min(200, +pageSize || 100); page = Math.max(1, +page || 1);
    return {
      run: { id: r.id, ts: r.ts, username: r.username, pool: r.pool, considered: r.considered, total, stale: r.param_seal !== P.seal },
      items: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize,
      noMatch: j.noMatch.map((id) => ({ id, name: nameOf(get(id), u.role) }))
    };
  }
  function why(u, aId, bId) {
    const ra = db.prepare('SELECT * FROM applicants WHERE id=?').get(aId), rb = db.prepare('SELECT * FROM applicants WHERE id=?').get(bId);
    if (!ra || !rb) throw notFound();
    const a = flat(ra), b = flat(rb), r = E.scorePair(a, b, getParams().params, E.todayStr());
    return { nameA: nameOf(a, u.role), nameB: nameOf(b, u.role), ...r };
  }

  /* ------------------------------------------------------------------ tanıştırmalar */
  const parseIntro = (r) => ({ ...r, data: JSON.parse(r.data) });
  const introHist = (d, actor, text) => d.history.push({ ts: Date.now(), user: actor.username, text });
  function saveIntro(i, status, d) { db.prepare('UPDATE intros SET status=?, data=?, version=version+1 WHERE id=?').run(status, JSON.stringify(d), i.id); }
  function startIntro(u, aId, bId) {
    assertAuthorityReady();
    return tx(() => {
      const ra = db.prepare("SELECT * FROM applicants WHERE id=?").get(aId), rb = db.prepare("SELECT * FROM applicants WHERE id=?").get(bId);
      if (!ra || !rb) throw notFound('Aday bulunamadı.');
      const P = getParams(), a = flat(ra), b = flat(rb), today = E.todayStr();
      const why = E.pairOk(a, b, P.params, today, buildIctx());
      if (why) throw unprocessable('Bu çift şu an başlatılamaz: ' + why);
      const sc = E.scorePair(a, b, P.params, today);
      if (sc.hard) throw unprocessable('Zorunlu tercihlerden biri karşılanmıyor.');
      const n = D.counterNext(db, 'intro'), id = `T-${new Date().getFullYear()}-${pad4(n)}`;
      const d = { resp: { a: { dec: null, ts: null, method: '' }, b: { dec: null, ts: null, method: '' } }, meeting: null, outcome: null, history: [] };
      introHist(d, u, 'Tanıştırma başlatıldı; iki adayın tanıtım kartı kendilerine sunulacak');
      db.prepare('INSERT INTO intros (id, a, b, status, score, data, created_at, created_by, param_seal) VALUES (?,?,?,?,?,?,?,?,?)').run(id, aId, bId, 'yanit_bekliyor', Math.round(sc.score), JSON.stringify(d), Date.now(), u.username, P.seal);
      D.audit(db, u, 'TANISTIRMA_BASLATILDI', `${id} ${aId}↔${bId} puan ${Math.round(sc.score)}`);
      return { id };
    });
  }
  function listIntros(u, { status }) {
    const rows = status ? db.prepare('SELECT * FROM intros WHERE status=? ORDER BY created_at DESC LIMIT 500').all(status) : db.prepare('SELECT * FROM intros ORDER BY created_at DESC LIMIT 500').all();
    const get = (id) => { const r = db.prepare('SELECT * FROM applicants WHERE id=?').get(id); return r ? flat(r) : null; };
    return rows.map((i) => ({ id: i.id, a: i.a, b: i.b, nameA: nameOf(get(i.a), u.role), nameB: nameOf(get(i.b), u.role), status: i.status, score: i.score, createdAt: i.created_at }));
  }
  function getIntro(u, id) {
    const r = db.prepare('SELECT * FROM intros WHERE id=?').get(id);
    if (!r) throw notFound('Tanıştırma bulunamadı.');
    const i = parseIntro(r);
    const A = flat(db.prepare('SELECT * FROM applicants WHERE id=?').get(i.a)), B = flat(db.prepare('SELECT * FROM applicants WHERE id=?').get(i.b));
    const out = { id: i.id, a: i.a, b: i.b, nameA: nameOf(A, u.role), nameB: nameOf(B, u.role), status: i.status, score: i.score, version: i.version, createdAt: i.created_at, createdBy: i.created_by, paramSeal: i.param_seal, resp: i.data.resp, meeting: i.data.meeting, outcome: i.data.outcome, history: i.data.history, contact: null };
    if (u.role !== 'denetci' && ['bulusma_planli', 'devam_ediyor', 'kararverdi'].includes(i.status)) {
      out.contact = { a: A.consent && A.consent.contactShare ? { shared: true, telefon: A.telefon } : { shared: false }, b: B.consent && B.consent.contactShare ? { shared: true, telefon: B.telefon } : { shared: false } };
      tx(() => D.audit(db, u, 'ILETISIM_GORULDU', id));
    }
    return out;
  }
  const loadIntro = (id) => { const r = db.prepare('SELECT * FROM intros WHERE id=?').get(id); if (!r) throw notFound('Tanıştırma bulunamadı.'); return parseIntro(r); };
  function setCooldown(actor, id) {
    const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(id); if (!row || row.status === 'silindi') return;
    const a = readData(row); a.cooldownUntil = E.addDays(E.todayStr(), getParams().params.cooldownDays);
    writeRow(id, row.status, a, { version: row.version });
  }
  function introAction(u, id, action, body) {
    return tx(() => {
      const i = loadIntro(id), d = i.data, P = getParams().params, today = E.todayStr();
      const need = (...st) => { if (!st.includes(i.status)) throw conflict(`Bu işlem “${i.status}” durumunda yapılamaz.`); };
      switch (action) {
        case 'respond': {
          need('yanit_bekliyor');
          const side = body.side === 'b' ? 'b' : body.side === 'a' ? 'a' : null; if (!side) throw bad('Taraf geçersiz.');
          if (!['kabul', 'ret'].includes(body.dec)) throw bad('Karar “kabul” veya “ret” olmalı.');
          if (d.resp[side].dec) throw conflict('Bu tarafın kararı zaten kaydedildi (değiştirilemez).');
          if (body.confirmed !== true) throw bad('Kararın adayın kendisi tarafından bildirildiği onaylanmalı.');
          const method = String(body.method || '').trim().slice(0, 60); if (!method) throw bad('Kararın alındığı biçim (şahsen/telefon vb.) yazılmalı.');
          d.resp[side] = { dec: body.dec, ts: Date.now(), method };
          introHist(d, u, `${side === 'a' ? i.a : i.b}: ${body.dec}`);
          D.audit(db, u, 'TANISTIRMA_YANIT', `${id} ${side === 'a' ? i.a : i.b} ${body.dec}`);
          if (body.dec === 'ret') {
            saveIntro(i, 'reddedildi', d);
            const [x, y] = [i.a, i.b].sort();
            db.prepare('INSERT OR IGNORE INTO blocked (a, b, ts) VALUES (?,?,?)').run(x, y, Date.now());
            D.audit(db, u, 'TANISTIRMA_REDDEDILDI', `${id}; çift bir daha önerilmeyecek`);
          } else if (d.resp.a.dec === 'kabul' && d.resp.b.dec === 'kabul') { saveIntro(i, 'kabul', d); D.audit(db, u, 'TANISTIRMA_KARSILIKLI_KABUL', id); }
          else saveIntro(i, 'yanit_bekliyor', d);
          break;
        }
        case 'plan': {
          need('kabul');
          const date = String(body.date || ''), time = String(body.time || ''), place = String(body.place || '').trim().slice(0, 200);
          if (!E.isDate(date) || date < today) throw bad('Tarih geçersiz veya geçmişte.');
          if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw bad('Saat geçersiz (SS:DD).');
          if (!place) throw bad('Görüşme yeri yazılmalı.');
          d.meeting = { date, time, place, mode: P.meetingMode };
          introHist(d, u, `Görüşme planlandı: ${date} ${time}`); saveIntro(i, 'bulusma_planli', d); D.audit(db, u, 'GORUSME_PLANLANDI', `${id} ${date} ${time}`); break;
        }
        case 'outcome': {
          need('bulusma_planli');
          const o = { a: body.a, b: body.b };
          if (!['devam', 'bitti'].includes(o.a) || !['devam', 'bitti'].includes(o.b)) throw bad('Sonuç “devam” veya “bitti” olmalı.');
          d.outcome = o; introHist(d, u, `Sonuç: ${o.a} / ${o.b}`);
          if (o.a === 'devam' && o.b === 'devam') saveIntro(i, 'devam_ediyor', d);
          else { saveIntro(i, 'bitti', d); setCooldown(u, i.a); setCooldown(u, i.b); }
          D.audit(db, u, 'GORUSME_SONUCU', `${id} ${o.a}/${o.b}`); break;
        }
        case 'end': {
          need('devam_ediyor'); const r = reasonOk(body.reason);
          introHist(d, u, 'Sona erdi: ' + r); saveIntro(i, 'bitti', d); setCooldown(u, i.a); setCooldown(u, i.b); D.audit(db, u, 'TANISTIRMA_BITTI', id); break;
        }
        case 'decision': {
          need('devam_ediyor');
          if (body.confirmA !== true || body.confirmB !== true) throw bad('İki adayın da kararı kendisinin bildirdiği onaylanmalı.');
          for (const aid of [i.a, i.b]) {
            const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(aid), a = readData(row);
            histPush(a, u, `Evlenme kararı verildi (${id})`); writeRow(aid, 'tamamlandi', a, { version: row.version });
          }
          introHist(d, u, 'Evlenme kararı bildirildi; evlendirme sürecine yönlendirilir'); saveIntro(i, 'kararverdi', d); D.audit(db, u, 'EVLENME_KARARI', id); break;
        }
        case 'timeout': {
          need('yanit_bekliyor');
          if (E.daysBetween(E.dStr(new Date(i.created_at)), today) <= P.responseDays) throw unprocessable(`Yanıt süresi (${P.responseDays} gün) henüz dolmadı.`);
          introHist(d, u, 'Yanıt süresi doldu; kapatıldı (çift engellenmedi)'); saveIntro(i, 'zamanasimi', d); D.audit(db, u, 'TANISTIRMA_ZAMANASIMI', id); break;
        }
        case 'complaint': {
          need(...E.ACTIVE_INTRO); const r = reasonOk(body.reason);
          d.complaintBy = u.username; introHist(d, u, 'Şikâyet/güvenlik bildirimi: ' + r); saveIntro(i, 'sikayet', d);
          for (const aid of [i.a, i.b]) {
            const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(aid), a = readData(row);
            if (row.status === 'aktif') { histPush(a, u, `Şikâyet nedeniyle incelemede (${id})`); writeRow(aid, 'inceleme', a, { version: row.version }); }
          }
          D.audit(db, u, 'SIKAYET', `${id} — ${r}`); break;
        }
        case 'close-complaint': {
          if (u.role !== 'admin') throw forbid('Yalnız yönetici şikâyeti kapatabilir.');
          need('sikayet'); const r = reasonOk(body.reason);
          if (d.complaintBy === u.username && activeAdmins() > 1) throw forbid('Şikâyeti bildiren kişi kapatamaz (iki kişi kuralı).');
          introHist(d, u, 'Şikâyet kapatıldı: ' + r); saveIntro(i, 'bitti', d);
          for (const aid of [i.a, i.b]) {
            const row = db.prepare('SELECT * FROM applicants WHERE id=?').get(aid), a = readData(row);
            if (row.status === 'inceleme') { histPush(a, u, `İnceleme sonuçlandı (${id}): ${r}`); a.cooldownUntil = E.addDays(today, P.cooldownDays); writeRow(aid, 'aktif', a, { version: row.version }); }
          }
          D.audit(db, u, 'SIKAYET_KAPATILDI', `${id} — ${r}`); break;
        }
        default: throw bad('Bilinmeyen işlem.');
      }
      return { ok: true };
    });
  }

  /* ------------------------------------------------------------------ panel / adalet / denetim */
  let chainCache = { t: 0, v: null };
  function chainStatus(force) {
    if (!force && Date.now() - chainCache.t < 60000 && chainCache.v) return chainCache.v;
    chainCache = { t: Date.now(), v: D.verifyAuditChain(db) }; return chainCache.v;
  }
  function dashboard() {
    const P = getParams(), today = E.todayStr();
    const by = (t) => Object.fromEntries(db.prepare(`SELECT status, COUNT(*) c FROM ${t} GROUP BY status`).all().map((r) => [r.status, r.c]));
    const late = db.prepare("SELECT created_at FROM intros WHERE status='yanit_bekliyor'").all().filter((r) => E.daysBetween(E.dStr(new Date(r.created_at)), today) > P.params.responseDays).length;
    const old = db.prepare("SELECT closed_at FROM applicants WHERE status IN ('cekildi','tamamlandi') AND closed_at IS NOT NULL").all().filter((r) => E.daysBetween(E.dStr(new Date(r.closed_at)), today) > P.params.retentionDays).length;
    const official = D.metaGet(db, 'official_seal', '');
    const run = db.prepare('SELECT id, ts, pool, json FROM runs ORDER BY id DESC LIMIT 1').get();
    return {
      applicants: by('applicants'), intros: by('intros'), chain: chainStatus(), paramSeal: P.seal, officialSeal: official, sealMatches: official ? official === P.seal : null,
      alerts: { lateResponses: late, complaints: db.prepare("SELECT COUNT(*) c FROM intros WHERE status='sikayet'").get().c, retentionOverdue: old, pendingProposals: db.prepare("SELECT COUNT(*) c FROM param_proposals WHERE status='bekliyor'").get().c },
      lastRun: run ? { id: run.id, ts: run.ts, pool: run.pool, suggestions: JSON.parse(run.json).suggestions.length, noMatch: JSON.parse(run.json).noMatch.length } : null,
      responseDays: P.params.responseDays, retentionDays: P.params.retentionDays,
      authority: { unitCode: config.unitCode, configured: !!config.authorityPub, locked: !!config.lockParams, version: authorityVersion(), ready: !config.lockParams || authorityVersion() > 0, signing: !!config.signingKey }
    };
  }
  function fairness() {
    const P = getParams(), today = E.todayStr();
    const run = db.prepare('SELECT id, json FROM runs ORDER BY id DESC LIMIT 1').get();
    const noMatch = new Set(run ? JSON.parse(run.json).noMatch : []);
    const apps = db.prepare("SELECT * FROM applicants WHERE status IN ('aktif','beklemede')").all().map(flat);
    const intros = db.prepare('SELECT a, b, data FROM intros').all().map((r) => ({ a: r.a, b: r.b, d: JSON.parse(r.data) }));
    const groupBy = (fn, label) => {
      const G = {};
      for (const a of apps) {
        const k = fn(a); if (!k) continue; const g = (G[k] = G[k] || { n: 0, none: 0, intros: 0, decided: 0, acc: 0 });
        g.n++; if (noMatch.has(a.id)) g.none++;
        for (const i of intros) { if (i.a !== a.id && i.b !== a.id) continue; g.intros++; const s = i.a === a.id ? 'a' : 'b'; if (i.d.resp[s].dec) { g.decided++; if (i.d.resp[s].dec === 'kabul') g.acc++; } }
      }
      const tot = Object.values(G).reduce((x, g) => ({ n: x.n + g.n, none: x.none + g.none }), { n: 0, none: 0 }), base = tot.n ? tot.none / tot.n * 100 : 0;
      return { label, rows: Object.entries(G).sort().map(([k, g]) => { const pct = g.n ? g.none / g.n * 100 : 0; return { group: k, n: g.n, none: g.none, nonePct: Math.round(pct), intros: g.intros, acceptPct: g.decided ? Math.round(g.acc / g.decided * 100) : null, warn: g.n >= 5 && pct - base > P.params.fairGapPct, gap: Math.round(pct - base) }; }) };
    };
    const ageGrp = (a) => { const y = a.dogum ? E.ageOn(a.dogum, today) : 0; return y ? (y < 25 ? '18–24' : y < 30 ? '25–29' : y < 35 ? '30–34' : y < 40 ? '35–39' : '40+') : ''; };
    return { run: run ? run.id : null, gapPct: P.params.fairGapPct, groups: [
      groupBy((a) => (a.cins === 'K' ? 'Kadın' : a.cins === 'E' ? 'Erkek' : ''), 'Cinsiyete göre'),
      groupBy((a) => (a.il || '').trim(), 'İle göre'),
      groupBy((a) => P.params.eduLevels[+a.edu] || '', 'Eğitim düzeyine göre'),
      groupBy(ageGrp, 'Yaş grubuna göre')] };
  }
  function listAudit({ q, offset = 0, limit = 100 }) {
    limit = Math.min(500, Math.max(10, +limit || 100)); offset = Math.max(0, +offset || 0);
    const s = q ? `%${String(q).slice(0, 80).replace(/[\\%_]/g, (m) => '\\' + m)}%` : null;
    const rows = s
      ? db.prepare("SELECT * FROM audit WHERE action LIKE ? ESCAPE '\\' OR username LIKE ? ESCAPE '\\' OR detail LIKE ? ESCAPE '\\' ORDER BY i DESC LIMIT ? OFFSET ?").all(s, s, s, limit, offset)
      : db.prepare('SELECT * FROM audit ORDER BY i DESC LIMIT ? OFFSET ?').all(limit, offset);
    return { total: db.prepare('SELECT COUNT(*) c FROM audit').get().c, items: rows };
  }
  function auditPackage(actor) {
    const by = (t) => Object.fromEntries(db.prepare(`SELECT status, COUNT(*) c FROM ${t} GROUP BY status`).all().map((r) => [r.status, r.c]));
    tx(() => D.audit(db, actor, 'DENETIM_PAKETI', 'dışa aktarıldı'));
    const P = getParams();
    const pkg = {
      format: AU.PACKAGE_FORMAT, birim: { kod: config.unitCode, ad: P.params.institution }, olusturma: Date.now(), merkeziPaketSurumu: authorityVersion(),
      tarih: E.todayStr(), kurum: P.params.institution, parametreSurumu: P.ver, parametreMuhru: P.seal, parametreler: P.params,
      parametreGecmisi: db.prepare('SELECT ver, ts, username, reason, seal FROM params_versions ORDER BY ver').all(),
      adayDurumlari: by('applicants'), tanistirmaDurumlari: by('intros'),
      eslestirmeKosulari: db.prepare('SELECT id, ts, username, param_seal, pool, considered FROM runs ORDER BY id').all(),
      zincir: D.verifyAuditChain(db), denetimGunlugu: db.prepare('SELECT * FROM audit ORDER BY i').all()
    };
    return config.signingKey ? AU.signPackage(pkg, config.signingKey) : pkg;
  }

  /* ------------------------------------------------------------------ deneme verisi (yalnız ALLOW_DEMO=1) */
  function seedDemo(u, n = 40) {
    if (!config.allowDemo) throw forbid('Deneme verisi bu kurulumda kapalı (ALLOW_DEMO=1 gerekir).');
    const P = getParams().params;
    const ils = ['Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Konya'], erk = ['Ahmet', 'Mehmet', 'Mustafa', 'Ali', 'Emre', 'Burak', 'Can', 'Kerem'], kad = ['Ayşe', 'Fatma', 'Zeynep', 'Elif', 'Merve', 'Esra', 'Büşra', 'Selin'], sy = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Aydın', 'Arslan', 'Doğan'];
    const pick = (a) => a[Math.floor(Math.random() * a.length)];
    const tc = () => { const d = [1 + Math.floor(Math.random() * 9)]; for (let i = 1; i < 9; i++) d.push(Math.floor(Math.random() * 10)); const d10 = (((d[0] + d[2] + d[4] + d[6] + d[8]) * 7) - (d[1] + d[3] + d[5] + d[7])) % 10; d.push((d10 + 10) % 10); d.push(d.reduce((x, y) => x + y, 0) % 10); return d.join(''); };
    return tx(() => {
      for (let k = 0; k < n; k++) {
        const id = `A-${new Date().getFullYear()}-${pad4(D.counterNext(db, 'applicant'))}`, a = E.newApplicantData(P), female = k % 2 === 0;
        const age = 22 + Math.floor(Math.random() * 14), dt = new Date(); dt.setFullYear(dt.getFullYear() - age); dt.setDate(dt.getDate() - Math.floor(Math.random() * 300));
        Object.assign(a, { demo: true, cins: female ? 'K' : 'E', ad: pick(female ? kad : erk), soyad: pick(sy), kimNo: tc(), dogum: E.dStr(dt), telefon: '05' + Math.floor(100000000 + Math.random() * 899999999), il: pick(ils), edu: String(2 + Math.floor(Math.random() * 5)), meslek: pick(['Öğretmen', 'Mühendis', 'Hemşire', 'Esnaf', 'Memur']), tanitim: 'Deneme kaydı: kısa tanıtım metni.', medeni: Math.random() < 0.9 ? 'hic' : 'bosanmis' });
        a.cocuk = a.medeni === 'hic' ? 0 : 1;
        Object.assign(a.prefs, { ageMin: Math.max(P.minAge, age - 6), ageMax: age + 7, ageImp: pick([1, 2, 2, 3]), locMode: pick(['fark_etmez', 'ayni_il']), locImp: pick([0, 1, 2, 3]), eduMin: String(Math.max(0, +a.edu - 1)), eduImp: pick([0, 1, 2]), maritalOk: Math.random() < 0.7 ? ['hic'] : ['hic', 'bosanmis', 'dul'], maritalImp: pick([1, 2, 3]), kidsOk: Math.random() < 0.6, kidsImp: pick([1, 2]) });
        for (const q of P.questions.filter((x) => x.enabled)) { const ans = pick(q.opts); a.qa[q.id] = { ans, accept: q.opts.filter((o) => o === ans || o === 'Fark etmez' || Math.random() < 0.35), imp: String(pick([0, 1, 1, 2, 2, 3])) }; }
        a.consent = { data: true, sensitive: false, contactShare: Math.random() < 0.7, ts: Date.now(), version: P.consentVersion };
        a.checks = { inPerson: true, idVerified: true, protective: true, protectiveFound: false, voluntary: true, notMarried: true };
        histPush(a, u, 'Deneme verisi oluşturuldu'); writeRow(id, 'aktif', a, { create: true });
      }
      D.audit(db, u, 'DENEME_VERISI', `${n} deneme adayı eklendi`);
      return { added: n };
    });
  }
  function unseedDemo(u) {
    if (!config.allowDemo) throw forbid('Deneme verisi bu kurulumda kapalı.');
    return tx(() => {
      const ids = db.prepare('SELECT * FROM applicants').all().filter((r) => { try { return readData(r).demo; } catch { return false; } }).map((r) => r.id);
      for (const id of ids) {
        db.prepare('DELETE FROM intros WHERE a=? OR b=?').run(id, id); db.prepare('DELETE FROM blocked WHERE a=? OR b=?').run(id, id); db.prepare('DELETE FROM applicants WHERE id=?').run(id);
      }
      db.prepare('DELETE FROM runs').run();
      D.audit(db, u, 'DENEME_VERISI_SILINDI', `${ids.length} aday`);
      return { removed: ids.length };
    });
  }

  return {
    HttpError, ensureInit, getParams, paramsInfo, proposeParams, decideProposal, setOfficialSeal, setRequire2fa, importBundle, authorityVersion,
    createUser, listUsers, updateUser, login, authenticate, logout, changePassword, totpSetup, totpEnable,
    listApplicants, getApplicant, createApplicant, updateApplicant, applicantAction, applicantCard,
    runMatch, latestRun, why, startIntro, listIntros, getIntro, introAction,
    dashboard, fairness, listAudit, auditPackage, chainStatus, seedDemo, unseedDemo,
    requires2fa: () => D.metaGet(db, 'require2fa', '0') === '1', tx
  };
}

module.exports = { createService, HttpError };
