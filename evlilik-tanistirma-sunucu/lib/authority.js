'use strict';
/**
 * Merkezî otorite ↔ bağımsız birim güven modeli (Ed25519 imzaları).
 *
 *  - Otorite, parametre paketlerini kendi özel anahtarıyla imzalar; birim yalnız açık anahtarı bilir
 *    ve imzası doğrulanmayan paketi kabul etmez.
 *  - Birim, kişisel veri içermeyen denetim paketini kendi özel anahtarıyla imzalar; otorite, birimin
 *    açık anahtarını (units.json) bildiği için paketin sahici ve değiştirilmemiş olduğunu doğrular.
 *  - Kişisel veri hiçbir yönde taşınmaz.
 */
const crypto = require('node:crypto');
const { sha256, canon, auditHash } = require('./crypto');
const E = require('./engine');

const BUNDLE_FORMAT = 'ets-params-bundle/1';
const PACKAGE_FORMAT = 'ets-audit-package/1';

function genKeyPair(passphrase) {
  const opt = { type: 'pkcs8', format: 'pem' };
  if (passphrase) { opt.cipher = 'aes-256-cbc'; opt.passphrase = passphrase; }
  return crypto.generateKeyPairSync('ed25519', { publicKeyEncoding: { type: 'spki', format: 'pem' }, privateKeyEncoding: opt });
}
const loadPrivate = (pem, passphrase) => crypto.createPrivateKey({ key: pem, ...(passphrase ? { passphrase } : {}) });
const publicPemOf = (privateKey) => crypto.createPublicKey(privateKey).export({ type: 'spki', format: 'pem' });
const keyIdOf = (publicPem) => sha256(String(publicPem).replace(/\s+/g, '')).slice(0, 16);

const signObject = (obj, privateKey) => crypto.sign(null, Buffer.from(canon(obj)), privateKey).toString('base64');
function verifyObject(obj, sigB64, publicPem) {
  try { return crypto.verify(null, Buffer.from(canon(obj)), crypto.createPublicKey(publicPem), Buffer.from(String(sigB64), 'base64')); } catch { return false; }
}

/* ---------- Parametre paketi (otorite → birim) ---------- */
function makeBundle({ params, version, note, privateKey }) {
  const { institution, ...rest } = params; // kurum adı birime özgüdür; pakette yer almaz
  const errs = E.validateParams({ ...rest, institution: 'x' });
  if (errs.length) throw new Error('Parametreler geçersiz: ' + errs.join(' | '));
  if (!Number.isInteger(version) || version < 1) throw new Error('Sürüm pozitif tam sayı olmalı.');
  const body = { format: BUNDLE_FORMAT, version, issuedAt: Date.now(), note: String(note || '').slice(0, 300), params: rest, seal: E.sealParams(rest) };
  return { ...body, keyId: keyIdOf(publicPemOf(privateKey)), signature: signObject(body, privateKey) };
}
function verifyBundle(bundle, authorityPublicPem) {
  const errors = [];
  if (!bundle || typeof bundle !== 'object' || bundle.format !== BUNDLE_FORMAT) return { ok: false, errors: ['Paket biçimi tanınmıyor.'] };
  const { signature, keyId, ...body } = bundle;
  if (!Number.isInteger(body.version) || body.version < 1) errors.push('Paket sürümü geçersiz.');
  if (!verifyObject(body, signature, authorityPublicPem)) errors.push('İmza doğrulanamadı: paket otoriteden gelmemiş veya değiştirilmiş.');
  else {
    if (keyId && keyId !== keyIdOf(authorityPublicPem)) errors.push('Paket başka bir anahtarla imzalanmış.');
    if (E.sealParams(body.params) !== body.seal) errors.push('Paket mührü içerikle uyuşmuyor.');
    errors.push(...E.validateParams({ ...body.params, institution: 'x' }));
  }
  return { ok: errors.length === 0, errors, body };
}

/* ---------- Denetim paketi (birim → otorite) ---------- */
function signPackage(pkg, privateKey) {
  const { imza, ...body } = pkg;
  return { ...body, imza: { alg: 'ed25519', keyId: keyIdOf(publicPemOf(privateKey)), signature: signObject(body, privateKey) } };
}
function verifyPackage(pkg, unitPublicPem) {
  if (!pkg || pkg.format !== PACKAGE_FORMAT) return { signed: false, valid: false, reason: 'Paket biçimi tanınmıyor.' };
  if (!pkg.imza) return { signed: false, valid: false, reason: 'İmzasız paket.' };
  const { imza, ...body } = pkg;
  if (imza.keyId !== keyIdOf(unitPublicPem)) return { signed: true, valid: false, reason: 'İmzalayan anahtar, kayıtlı birim anahtarı değil.' };
  return verifyObject(body, imza.signature, unitPublicPem) ? { signed: true, valid: true } : { signed: true, valid: false, reason: 'İmza geçersiz: paket değiştirilmiş.' };
}
/** Paketteki denetim günlüğü zincirini paketin "zincir" alanına GÜVENMEDEN yeniden hesaplar. */
function recomputeChain(log) {
  let prev = 'GENESIS', n = 0;
  for (const e of log || []) {
    if (e.i !== n + 1 || e.prev !== prev || e.hash !== auditHash(prev, e.i, e.ts, e.username, e.role, e.action, e.detail)) return { ok: false, at: e.i };
    prev = e.hash; n++;
  }
  return { ok: true, n, head: prev };
}

/* ---------- Toplu denetim (otorite tarafı) ---------- */
/**
 * units: [{code, name, publicKey}]   packages: [paket nesneleri]
 * authority: { seal, version }       opts: { maxAgeDays, now }
 */
function aggregate(units, packages, authority, opts = {}) {
  const now = opts.now || Date.now(), maxAge = (opts.maxAgeDays || 7) * 864e5;
  const rows = [], known = new Set(units.map((u) => u.code));
  for (const u of units) {
    const mine = packages.filter((p) => p && p.birim && p.birim.kod === u.code).sort((a, b) => b.olusturma - a.olusturma);
    const row = { code: u.code, name: u.name || '', issues: [], last: null };
    if (!mine.length) { row.issues.push({ level: 'engel', text: 'Hiç denetim paketi alınmadı.' }); rows.push(row); continue; }
    const p = mine[0]; row.last = p.olusturma; row.unitName = p.birim.ad;
    const v = verifyPackage(p, u.publicKey);
    if (!v.valid) row.issues.push({ level: 'engel', text: v.reason });
    const chain = recomputeChain(p.denetimGunlugu);
    if (!chain.ok) row.issues.push({ level: 'engel', text: `Denetim günlüğü zinciri ${chain.at}. kayıtta bozuk.` }); else row.chainHead = chain.head, row.auditCount = chain.n;
    if (p.zincir && p.zincir.ok === false) row.issues.push({ level: 'uyari', text: 'Birim, paketi zinciri bozukken üretti.' });
    if (authority && authority.seal && p.parametreMuhru !== authority.seal) row.issues.push({ level: 'engel', text: 'Parametre mührü otoritenin yayımladığıyla uyuşmuyor.' });
    if (authority && authority.version && (p.merkeziPaketSurumu || 0) < authority.version) row.issues.push({ level: 'uyari', text: `Merkezî paket sürümü geride (${p.merkeziPaketSurumu || 0} < ${authority.version}).` });
    if (now - p.olusturma > maxAge) row.issues.push({ level: 'uyari', text: `Paket eski (${Math.floor((now - p.olusturma) / 864e5)} gün).` });
    if (mine.length > 1) { const prevChain = recomputeChain(mine[1].denetimGunlugu); if (prevChain.ok && chain.ok && prevChain.n <= chain.n) { const same = (p.denetimGunlugu || [])[prevChain.n - 1]; if (!same || same.hash !== prevChain.head) row.issues.push({ level: 'engel', text: 'Önceki paketle tutarsız: günlüğün geçmişi değiştirilmiş (zincir yeniden yazılmış olabilir).' }); } }
    row.applicants = p.adayDurumlari || {}; row.intros = p.tanistirmaDurumlari || {};
    row.paramSeal = p.parametreMuhru; row.authorityVersion = p.merkeziPaketSurumu || 0;
    rows.push(row);
  }
  const unknown = [...new Set(packages.filter((p) => p && p.birim && !known.has(p.birim.kod)).map((p) => p.birim.kod))];
  return { rows, unknown, generatedAt: now };
}

module.exports = { BUNDLE_FORMAT, PACKAGE_FORMAT, genKeyPair, loadPrivate, publicPemOf, keyIdOf, signObject, verifyObject, makeBundle, verifyBundle, signPackage, verifyPackage, recomputeChain, aggregate };
