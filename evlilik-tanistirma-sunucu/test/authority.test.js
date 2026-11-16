'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { createApp } = require('../server');
const { loadConfig } = require('../lib/config');
const AU = require('../lib/authority');
const E = require('../lib/engine');
const { auditHash } = require('../lib/crypto');

const kp = () => { const { publicKey, privateKey } = AU.genKeyPair(); return { pub: publicKey, priv: AU.loadPrivate(privateKey) }; };
const P = () => E.DEFAULT_PARAMS();

/* ---------------------------------------------------------------- saf birim testleri */
test('Parametre paketi: imza doğrulanır; sahtecilik, değiştirme ve yanlış anahtar reddedilir', () => {
  const auth = kp(), other = kp();
  const params = { ...P(), minScore: 70 };
  const b = AU.makeBundle({ params, version: 3, note: 'Genelge 12', privateKey: auth.priv });
  assert.equal(b.params.institution, undefined, 'kurum adı pakette yer almamalı (birime özgü)');
  assert.deepEqual(AU.verifyBundle(b, auth.pub).errors, []);
  assert.equal(AU.verifyBundle(b, auth.pub).ok, true);
  // içerik değiştirilirse
  const t = JSON.parse(JSON.stringify(b)); t.params.minScore = 10;
  assert.equal(AU.verifyBundle(t, auth.pub).ok, false);
  // yanlış (saldırgan) anahtarla imza
  const forged = AU.makeBundle({ params, version: 9, privateKey: other.priv });
  const v = AU.verifyBundle(forged, auth.pub); assert.equal(v.ok, false); assert.match(v.errors.join(' '), /İmza doğrulanamadı/);
  // sürüm numarasını değiştirmek (tekrar oynatma hazırlığı) imzayı bozar
  const t2 = JSON.parse(JSON.stringify(b)); t2.version = 99; assert.equal(AU.verifyBundle(t2, auth.pub).ok, false);
  // geçersiz parametreyle paket üretilemez (ör. 16 yaş)
  assert.throws(() => AU.makeBundle({ params: { ...P(), minAge: 16 }, version: 1, privateKey: auth.priv }), /geçersiz/);
  assert.equal(AU.verifyBundle({ format: 'x' }, auth.pub).ok, false);
});
test('Parametre mührü kurum adından bağımsızdır (tüm birimlerde aynı)', () => {
  assert.equal(E.sealParams({ ...P(), institution: 'A Birimi' }), E.sealParams({ ...P(), institution: 'B Birimi' }));
  assert.notEqual(E.sealParams(P()), E.sealParams({ ...P(), minScore: 61 }));
});

function fakeLog(n, tamper) {
  const log = []; let prev = 'GENESIS';
  for (let i = 1; i <= n; i++) { const e = { i, ts: 1700000000000 + i, username: 'u', role: 'admin', action: 'A' + i, detail: 'd', prev }; e.hash = auditHash(prev, i, e.ts, e.username, e.role, e.action, e.detail); log.push(e); prev = e.hash; }
  if (tamper) log[tamper - 1].detail = 'DEĞİŞTİ';
  return log;
}
const mkPkg = (code, o = {}) => ({ format: AU.PACKAGE_FORMAT, birim: { kod: code, ad: code + ' Birimi' }, olusturma: o.ts || Date.now(), merkeziPaketSurumu: o.ver ?? 5, parametreMuhru: o.seal || 'S'.repeat(8), adayDurumlari: { aktif: 10, taslak: 2 }, tanistirmaDurumlari: {}, zincir: { ok: true }, denetimGunlugu: o.log || fakeLog(6) });

test('Denetim paketi: imza, kurcalama ve zincir yeniden hesaplama', () => {
  const u = kp(), pkg = AU.signPackage(mkPkg('ANK-01'), u.priv);
  assert.equal(AU.verifyPackage(pkg, u.pub).valid, true);
  const t = JSON.parse(JSON.stringify(pkg)); t.adayDurumlari.aktif = 0; assert.equal(AU.verifyPackage(t, u.pub).valid, false, 'sayılar değiştirilirse imza bozulmalı');
  assert.equal(AU.verifyPackage(pkg, kp().pub).valid, false, 'başka birimin anahtarıyla doğrulanmamalı');
  assert.equal(AU.verifyPackage(mkPkg('X'), u.pub).signed, false);
  assert.equal(AU.recomputeChain(fakeLog(10)).ok, true);
  const bad = AU.recomputeChain(fakeLog(10, 4)); assert.equal(bad.ok, false); assert.equal(bad.at, 4);
});

test('Toplu denetim: sağlam birim, kurcalanmış günlük, imzasız, yanlış mühür, eski paket, bilinmeyen birim, yeniden yazılmış geçmiş', () => {
  const keys = { A: kp(), B: kp(), C: kp(), D: kp(), E: kp(), F: kp() };
  const SEAL = 'a'.repeat(64), now = Date.now();
  const units = Object.entries(keys).map(([k, v]) => ({ code: k, name: 'Birim ' + k, publicKey: v.pub })).concat([{ code: 'YOK', name: 'Paket göndermeyen', publicKey: kp().pub }]);
  const sign = (code, o) => AU.signPackage(mkPkg(code, { seal: SEAL, ...o }), keys[code].priv);
  const pkgs = [
    sign('A', {}),                                                          // sağlam
    sign('B', { log: fakeLog(6, 3) }),                                      // zincir bozuk
    mkPkg('C', { seal: SEAL }),                                             // imzasız
    sign('D', { seal: 'b'.repeat(64) }),                                    // parametre uyumsuz
    sign('E', { ts: now - 30 * 864e5 }),                                    // eski
    mkPkg('ZZZ'),                                                           // bilinmeyen birim
    AU.signPackage(mkPkg('F', { seal: SEAL, ts: now - 2000, log: fakeLog(8) }), keys.F.priv), // F'nin yeni paketi...
    AU.signPackage(mkPkg('F', { seal: SEAL, ts: now - 99000, log: (() => { const l = fakeLog(5); l[1].action = 'FARKLI'; /* geçmiş farklı */ let prev = l[0].hash; for (let i = 1; i < l.length; i++) { l[i].prev = prev; l[i].hash = auditHash(prev, l[i].i, l[i].ts, l[i].username, l[i].role, l[i].action, l[i].detail); prev = l[i].hash; } return l; })() }), keys.F.priv) // ...eski paketle çelişen geçmiş
  ];
  const r = AU.aggregate(units, pkgs, { seal: SEAL, version: 5 }, { maxAgeDays: 7, now });
  const by = Object.fromEntries(r.rows.map((x) => [x.code, x]));
  assert.deepEqual(by.A.issues, [], 'sağlam birimde sorun olmamalı');
  assert.ok(by.B.issues.some((i) => i.level === 'engel' && /zinciri 3/.test(i.text)));
  assert.ok(by.C.issues.some((i) => /İmzasız/.test(i.text)));
  assert.ok(by.D.issues.some((i) => /Parametre mührü/.test(i.text)));
  assert.ok(by.E.issues.some((i) => /eski/.test(i.text)));
  assert.ok(by.YOK.issues.some((i) => /Hiç denetim paketi/.test(i.text)));
  assert.ok(by.F.issues.some((i) => /geçmişi değiştirilmiş/.test(i.text)), 'geçmişi yeniden yazılmış günlük yakalanmalı');
  assert.deepEqual(r.unknown, ['ZZZ']);
});

/* ---------------------------------------------------------------- sunucu entegrasyonu */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ets-auth-'));
const auth = kp(), unitKey = AU.genKeyPair();
fs.writeFileSync(path.join(tmp, 'auth-pub.pem'), auth.pub);
fs.writeFileSync(path.join(tmp, 'unit.pem'), unitKey.privateKey, { mode: 0o600 });
const cfg = loadConfig({
  DATA_DIR: path.join(tmp, 'data'), PORT: '0', HOST: '127.0.0.1', COOKIE_SECURE: '0', ENV_FILE: path.join(tmp, 'yok.env'), UNIT_CODE: 'ESK-01', LOCK_PARAMS: '1',
  AUTHORITY_PUBKEY_FILE: path.join(tmp, 'auth-pub.pem'), SIGNING_KEY_FILE: path.join(tmp, 'unit.pem'),
  DATA_KEYS: `1:${crypto.randomBytes(32).toString('base64')}`, DATA_KEY_ID: '1'
});
let app, base, cookie = '', csrf = '';
const req = async (method, p, body) => {
  const r = await fetch(base + p, { method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}), ...(csrf ? { 'X-CSRF-Token': csrf } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const sc = r.headers.get('set-cookie'); if (sc) cookie = sc.split(';')[0];
  let j = null; try { j = await r.json(); } catch { /* */ } return { status: r.status, body: j };
};
test.before(async () => {
  app = createApp(cfg); const a = await app.listen(); base = `http://127.0.0.1:${a.port}`;
  app.svc.createUser(null, { username: 'adm1', name: 'Y', role: 'admin' }, 'Yonetici-Parola-2026');
  const r = await req('POST', '/api/login', { username: 'adm1', password: 'Yonetici-Parola-2026' }); csrf = r.body.csrf;
});
test.after(async () => { await app.close(); fs.rmSync(tmp, { recursive: true, force: true }); });

test('Parametre kilidi: yerel değişiklik reddedilir, paket yüklenene kadar eşleştirme kapalıdır', async () => {
  let d = await req('GET', '/api/dashboard'); assert.equal(d.body.authority.locked, true); assert.equal(d.body.authority.ready, false); assert.equal(d.body.authority.unitCode, 'ESK-01');
  assert.equal((await req('POST', '/api/match/run')).status, 422, 'paket yokken eşleştirme yapılamaz');
  const info = (await req('GET', '/api/params')).body;
  assert.equal((await req('POST', '/api/params/propose', { params: { ...info.params, minScore: 99 }, reason: 'yerel değişiklik denemesi' })).status, 403);
  // yalnız kurum adı yerelde değişebilir
  assert.equal((await req('POST', '/api/params/propose', { params: { ...info.params, institution: 'Eskişehir Birimi' }, reason: 'Kurum adı güncellendi' })).status, 200);
  assert.equal((await req('GET', '/api/params')).body.params.institution, 'Eskişehir Birimi');
  assert.equal((await req('GET', '/api/params')).body.seal, info.seal, 'kurum adı mühürü değiştirmemeli');
});
test('Parametre paketi içe aktarma: geçerli, tekrar oynatma, sahte imza, değiştirilmiş, yetkisiz', async () => {
  const params = { ...P(), minScore: 72, topN: 4 };
  const b1 = AU.makeBundle({ params, version: 1, note: 'İlk paket', privateKey: auth.priv });
  const ok = await req('POST', '/api/params/import-bundle', { bundle: b1 }); assert.equal(ok.status, 200); assert.equal(ok.body.applied, true);
  const info = (await req('GET', '/api/params')).body;
  assert.equal(info.params.minScore, 72); assert.equal(info.params.institution, 'Eskişehir Birimi', 'yerel kurum adı korunmalı');
  assert.equal(info.authorityVersion, 1); assert.equal(info.officialSeal, b1.seal); assert.equal(info.seal, b1.seal);
  const d = await req('GET', '/api/dashboard'); assert.equal(d.body.authority.ready, true); assert.equal(d.body.sealMatches, true);
  assert.equal((await req('POST', '/api/params/import-bundle', { bundle: b1 })).status, 409, 'aynı/eski sürüm tekrar uygulanamaz');
  const attacker = kp(); const forged = AU.makeBundle({ params: { ...params, minScore: 0 }, version: 50, privateKey: attacker.priv });
  const f = await req('POST', '/api/params/import-bundle', { bundle: forged }); assert.equal(f.status, 422); assert.match(JSON.stringify(f.body), /İmza/);
  const tampered = JSON.parse(JSON.stringify(AU.makeBundle({ params: { ...params, minScore: 80 }, version: 2, privateKey: auth.priv }))); tampered.params.minScore = 5;
  assert.equal((await req('POST', '/api/params/import-bundle', { bundle: tampered })).status, 422);
  assert.equal((await req('POST', '/api/params/import-bundle', { bundle: { format: 'x' } })).status, 422);
  const b2 = AU.makeBundle({ params: { ...params, minScore: 80 }, version: 2, privateKey: auth.priv });
  assert.equal((await req('POST', '/api/params/import-bundle', { bundle: b2 })).status, 200);
  assert.equal((await req('GET', '/api/params')).body.params.minScore, 80);
  assert.equal((await req('GET', '/api/audit?q=MERKEZI_PAKET')).body.items.length >= 2, true, 'paket işlemleri denetim günlüğüne yazılmalı');
  // aynı içerikli yeni sürüm yalnız sürümü kaydeder
  const b3 = AU.makeBundle({ params: { ...params, minScore: 80 }, version: 3, privateKey: auth.priv });
  const same = await req('POST', '/api/params/import-bundle', { bundle: b3 }); assert.equal(same.body.unchanged, true);
});
test('İmzalı denetim paketi: otorite doğrular, kurcalama yakalanır, kişisel veri içermez', async () => {
  const c = await req('POST', '/api/applicants'); assert.equal(c.status, 200);
  const r = await fetch(base + '/api/export/package', { headers: { Cookie: cookie } }); assert.equal(r.status, 200);
  const pkg = await r.json();
  assert.equal(pkg.birim.kod, 'ESK-01'); assert.equal(pkg.merkeziPaketSurumu, 3); assert.ok(pkg.imza && pkg.imza.alg === 'ed25519');
  const unitPub = AU.publicPemOf(AU.loadPrivate(unitKey.privateKey));
  assert.equal(AU.verifyPackage(pkg, unitPub).valid, true);
  const units = [{ code: 'ESK-01', name: 'Eskişehir', publicKey: unitPub }];
  const seal = (await req('GET', '/api/params')).body.seal;
  const rep = AU.aggregate(units, [pkg], { seal, version: 3 }); assert.deepEqual(rep.rows[0].issues, []);
  const staleVer = AU.aggregate(units, [pkg], { seal, version: 9 }); assert.ok(staleVer.rows[0].issues.some((i) => /geride/.test(i.text)));
  const bad = JSON.parse(JSON.stringify(pkg)); bad.adayDurumlari = { aktif: 999 };
  assert.ok(AU.aggregate(units, [bad], { seal, version: 3 }).rows[0].issues.some((i) => /İmza geçersiz/.test(i.text)));
  assert.ok(!JSON.stringify(pkg).includes('@'), 'pakette e-posta vb. kişisel veri olmamalı');
});
test('Otorite anahtarı tanımsız kurulumda paket yükleme reddedilir', async () => {
  const t2 = fs.mkdtempSync(path.join(os.tmpdir(), 'ets-noauth-'));
  const c2 = loadConfig({ DATA_DIR: t2, PORT: '0', HOST: '127.0.0.1', COOKIE_SECURE: '0', ENV_FILE: path.join(t2, 'yok'), DATA_KEYS: `1:${crypto.randomBytes(32).toString('base64')}`, DATA_KEY_ID: '1' });
  const a2 = createApp(c2); const ad = await a2.listen(); a2.svc.createUser(null, { username: 'qq1', name: 'Y', role: 'admin' }, 'Yonetici-Parola-2026');
  const b = `http://127.0.0.1:${ad.port}`; let ck = '', cs = '';
  let r = await fetch(b + '/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'qq1', password: 'Yonetici-Parola-2026' }) });
  ck = r.headers.get('set-cookie').split(';')[0]; cs = (await r.json()).csrf;
  r = await fetch(b + '/api/params/import-bundle', { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: ck, 'X-CSRF-Token': cs }, body: JSON.stringify({ bundle: {} }) });
  assert.equal(r.status, 400);
  assert.throws(() => createApp(loadConfig({ DATA_DIR: t2 + '-x', LOCK_PARAMS: '1', ENV_FILE: path.join(t2, 'yok'), DATA_KEYS: c2.env.DATA_KEYS, DATA_KEY_ID: '1' })), /AUTHORITY_PUBKEY_FILE/, 'kilit, otorite anahtarı olmadan başlatılamaz');
  await a2.close(); fs.rmSync(t2, { recursive: true, force: true });
});
