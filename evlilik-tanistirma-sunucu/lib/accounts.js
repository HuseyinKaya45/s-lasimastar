'use strict';
/**
 * Hesap, oturum, parola ve iki aşamalı doğrulama mantığı — birim sunucusu ve otorite sunucusu ortak kullanır.
 * policy: { passwordMinLength(), sessionIdleMinutes(), institution() }   roles: izin verilen rol listesi
 */
const C = require('./crypto');
const D = require('./db');
const { HttpError, bad, forbid, notFound, conflict } = require('./errors');

function createAccounts({ db, tx, config, policy, roles }) {
  const adminRole = 'admin';
  const activeAdmins = () => db.prepare("SELECT COUNT(*) c FROM users WHERE role='admin' AND active=1").get().c;
  /* ------------------------------------------------------------------ kullanıcı / oturum */
  const pubUser = (r) => ({ id: r.id, username: r.username, name: r.name, role: r.role, active: !!r.active, mustChange: !!r.must_change, totpEnabled: !!r.totp_enabled, locked: r.lock_until > Date.now(), createdAt: r.created_at });
  function checkPasswordPolicy(pw, username) {
    const min = policy.passwordMinLength();
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
    if (!roles.includes(role)) throw bad('Geçersiz rol.');
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
        if (!roles.includes(patch.role)) throw bad('Geçersiz rol.');
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
    const now = Date.now(), idle = policy.sessionIdleMinutes() * 60000;
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
    const inst = encodeURIComponent(policy.institution());
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

  return { activeAdmins, pubUser, createUser, listUsers, updateUser, login, authenticate, logout, changePassword, totpSetup, totpEnable, checkPasswordPolicy };
}
module.exports = { createAccounts };
