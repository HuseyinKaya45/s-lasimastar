'use strict';
/**
 * Kriptografi yardımcıları — yalnızca Node.js yerleşik `crypto` modülü (bağımlılık yok).
 *  - Parola özeti: scrypt (N=2^15)
 *  - Alan şifreleme: AES-256-GCM, anahtar halkası (key ring) ile anahtar döndürme desteği
 *  - Dizinleme özeti: HMAC-SHA256 (kimlik no düz metin saklanmadan çift kayıt kontrolü için)
 *  - TOTP (RFC 6238) — isteğe bağlı iki aşamalı doğrulama
 */
const crypto = require('node:crypto');

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const randToken = (bytes = 32) => crypto.randomBytes(bytes).toString('base64url');
const safeEq = (a, b) => {
  const A = Buffer.from(String(a)), B = Buffer.from(String(b));
  return A.length === B.length && crypto.timingSafeEqual(A, B);
};

/* ---------- Parola ---------- */
const SCRYPT = { N: 32768, r: 8, p: 1, maxmem: 128 * 1024 * 1024 };
function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(pw, salt, 32, SCRYPT);
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt.toString('base64')}$${key.toString('base64')}`;
}
function verifyPassword(pw, stored) {
  try {
    const [alg, N, r, p, s, k] = stored.split('$');
    if (alg !== 'scrypt') return false;
    const key = crypto.scryptSync(pw, Buffer.from(s, 'base64'), 32, { N: +N, r: +r, p: +p, maxmem: SCRYPT.maxmem });
    return crypto.timingSafeEqual(key, Buffer.from(k, 'base64'));
  } catch { return false; }
}
// Bilinmeyen kullanıcı girişinde yanıt süresini eşitlemek için sahte özet
const DUMMY_HASH = hashPassword('zamanlama-esitleme-' + randToken(8));

/* ---------- Anahtar halkası ve alan şifreleme ---------- */
function loadKeyring(env) {
  const ring = new Map();
  for (const part of String(env.DATA_KEYS || '').split(',').map((x) => x.trim()).filter(Boolean)) {
    const [id, b64] = part.split(':');
    const k = Buffer.from(b64 || '', 'base64');
    if (!/^\d+$/.test(id) || +id > 255 || k.length !== 32) throw new Error('DATA_KEYS biçimi hatalı: "id:base64(32 bayt)" olmalı.');
    ring.set(+id, k);
  }
  const cur = +env.DATA_KEY_ID;
  if (!ring.size) throw new Error('DATA_KEYS tanımlı değil. `node cli.js keygen` ile anahtar üretin.');
  if (!ring.has(cur)) throw new Error('DATA_KEY_ID, DATA_KEYS içinde bulunmuyor.');
  const derive = (master, label) => Buffer.from(crypto.hkdfSync('sha256', master, Buffer.alloc(0), label, 32));
  const enc = new Map(), mac = new Map();
  for (const [id, m] of ring) { enc.set(id, derive(m, 'ets-enc-v1')); mac.set(id, derive(m, 'ets-mac-v1')); }
  return { cur, enc, mac, ids: [...ring.keys()] };
}
// blob = [anahtar id (1)] [iv (12)] [etiket (16)] [şifreli metin]
function encrypt(kr, plaintext, aad) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', kr.enc.get(kr.cur), iv);
  c.setAAD(Buffer.from(aad));
  const ct = Buffer.concat([c.update(plaintext, 'utf8'), c.final()]);
  return Buffer.concat([Buffer.from([kr.cur]), iv, c.getAuthTag(), ct]);
}
function decrypt(kr, blob, aad) {
  const b = Buffer.from(blob);
  const key = kr.enc.get(b[0]);
  if (!key) throw new Error('Şifre çözme anahtarı bulunamadı (anahtar id ' + b[0] + ').');
  const d = crypto.createDecipheriv('aes-256-gcm', key, b.subarray(1, 13));
  d.setAAD(Buffer.from(aad));
  d.setAuthTag(b.subarray(13, 29));
  return Buffer.concat([d.update(b.subarray(29)), d.final()]).toString('utf8');
}
const keyIdOf = (blob) => Buffer.from(blob)[0];
const hmacIndex = (kr, value) => crypto.createHmac('sha256', kr.mac.get(kr.cur)).update(String(value)).digest('hex');

/* ---------- TOTP ---------- */
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function b32encode(buf) {
  let bits = 0, val = 0, out = '';
  for (const byte of buf) { val = (val << 8) | byte; bits += 8; while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } }
  if (bits > 0) out += B32[(val << (5 - bits)) & 31];
  return out;
}
function b32decode(s) {
  let bits = 0, val = 0; const out = [];
  for (const ch of s.replace(/=+$/, '').toUpperCase()) {
    const i = B32.indexOf(ch); if (i < 0) continue;
    val = (val << 5) | i; bits += 5;
    if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; }
  }
  return Buffer.from(out);
}
function hotp(secret, counter) {
  const b = Buffer.alloc(8); b.writeBigUInt64BE(BigInt(counter));
  const h = crypto.createHmac('sha1', secret).update(b).digest();
  const o = h[19] & 15;
  return String((((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3]) % 1000000).padStart(6, '0');
}
const totpNewSecret = () => b32encode(crypto.randomBytes(20));
// Başarılıysa kullanılan zaman adımı döner (tekrar kullanımı engellemek için), değilse null
function totpVerify(secretB32, code, now = Date.now()) {
  const sec = b32decode(secretB32), c = Math.floor(now / 30000);
  for (const d of [-1, 0, 1]) if (safeEq(hotp(sec, c + d), String(code).trim())) return c + d;
  return null;
}

/* ---------- Kanonik JSON ve denetim özeti (birim, otorite ve testler ortak kullanır) ---------- */
const canon = (o) => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.keys(v).sort().reduce((r, x) => ((r[x] = v[x]), r), {}) : v));
const auditHash = (prev, i, ts, user, role, action, detail) => sha256([prev, i, ts, user, role, action, detail].join('|'));

module.exports = {
  canon, auditHash,
  sha256, randToken, safeEq, hashPassword, verifyPassword, DUMMY_HASH,
  loadKeyring, encrypt, decrypt, keyIdOf, hmacIndex, totpNewSecret, totpVerify, hotp, b32decode
};
