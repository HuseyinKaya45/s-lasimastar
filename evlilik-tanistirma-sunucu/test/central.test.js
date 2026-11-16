'use strict';
/** Merkezî eşleştirme: birim → otorite → birim uçtan uca, KVKK sızıntı taraması, sahtecilik/yineleme, roller. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { createApp } = require('../server');
const { createAuthorityApp } = require('../authority-server');
const { loadConfig, loadAuthorityConfig } = require('../lib/config');
const AU = require('../lib/authority');
const H = require('../lib/hybrid');
const E = require('../lib/engine');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ets-central-'));
const key = () => `1:${crypto.randomBytes(32).toString('base64')}`;
const W = (name, txt) => { const f = path.join(tmp, name); fs.writeFileSync(f, txt, { mode: 0o600 }); return f; };
const mkTC = (seed) => { const d = [1, ...String(seed).padStart(8, '0').split('').map(Number)]; const d10 = (((d[0] + d[2] + d[4] + d[6] + d[8]) * 7) - (d[1] + d[3] + d[5] + d[7])) % 10; d.push((d10 + 10) % 10); d.push(d.reduce((a, b) => a + b, 0) % 10); return d.join(''); };
const PII = { ad: 'Gizlibahar', soyad: 'Gizlisoyad', tel: '05559876543', eposta: 'sir@ornek.org', ilce: 'Tepebaşıxyz', not: 'ozelnotsirri' };

const authKeys = { sign: AU.genKeyPair(), enc: H.genEncKeyPair() };
const mkUnitKeys = () => ({ sign: AU.genKeyPair(), enc: H.genEncKeyPair() });
const keys = { A: mkUnitKeys(), B: mkUnitKeys() };
const adm = { username: 'adm1', role: 'admin' }, op = { username: 'op1', role: 'operator' };

const CODE = (k) => 'BIRIM-' + k;
function mkUnit(k0) {
  const code = CODE(k0), k = keys[k0], dir = path.join(tmp, 'u' + k0);
  const cfg = loadConfig({
    DATA_DIR: dir, PORT: '0', COOKIE_SECURE: '0', ENV_FILE: path.join(tmp, 'yok.env'), UNIT_CODE: code, DATA_KEYS: key(), DATA_KEY_ID: '1', ALLOW_DEMO: '0',
    SIGNING_KEY_FILE: W(`s${k0}.pem`, k.sign.privateKey), UNIT_ENC_KEY_FILE: W(`e${k0}.pem`, k.enc.privateKey),
    AUTHORITY_PUBKEY_FILE: W('ap.pem', authKeys.sign.publicKey), AUTHORITY_ENC_PUBKEY_FILE: W('aep.pem', authKeys.enc.publicKey)
  });
  const app = createApp(cfg);
  app.svc.createUser(null, { username: 'adm1', name: 'Birim Yönetici', role: 'admin' }, 'Birim-Parola-2026!');
  return app;
}
const identity = (k) => ({ format: 'ets-unit-identity/1', code: CODE(k), signingKey: keys[k].sign.publicKey, encryptionKey: keys[k].enc.publicKey });

function addApplicant(app, seed, cins, over = {}) {
  const { id } = app.svc.createApplicant(adm);
  const r = app.svc.getApplicant(adm, id);
  const input = {
    ad: PII.ad, soyad: PII.soyad, kimNo: mkTC(seed), dogum: cins === 'K' ? '1994-05-05' : '1992-03-03', cins, telefon: PII.tel, eposta: PII.eposta, il: 'Eskişehir', ilce: PII.ilce, medeni: 'hic', cocuk: 0, edu: '4', is: 'calisiyor', meslek: 'Mühendis', tanitim: 'Kısa tanıtım metni.',
    prefs: { ageMin: 24, ageMax: 40, ageImp: 2, locMode: 'fark_etmez', locImp: 1, eduMin: '2', eduImp: 1, maritalOk: ['hic'], maritalImp: 1, kidsOk: true, kidsImp: 1 }, qa: {}, notes: PII.not,
    consent: { data: true, sensitive: false, contactShare: true, centralShare: true }, checks: { inPerson: true, idVerified: true, protective: true, protectiveFound: false, voluntary: true, notMarried: true }, ...over
  };
  app.svc.updateApplicant(adm, id, input, r.version);
  app.svc.applicantAction(adm, id, 'activate', {});
  return id;
}

let A, B, auth, base, ids = {};
test.before(async () => {
  A = mkUnit('A'); B = mkUnit('B');
  const cfg = loadAuthorityConfig({
    AUTHORITY_DATA_DIR: path.join(tmp, 'auth'), PORT: '0', COOKIE_SECURE: '0', ENV_FILE: path.join(tmp, 'yok.env'), DATA_KEYS: key(), DATA_KEY_ID: '1',
    AUTHORITY_SIGNING_KEY_FILE: W('as.pem', authKeys.sign.privateKey), AUTHORITY_ENC_KEY_FILE: W('ae.pem', authKeys.enc.privateKey)
  });
  auth = createAuthorityApp(cfg); const a = await auth.listen(); base = `http://127.0.0.1:${a.port}`;
  for (const [u, r] of [['adm1', 'admin'], ['op1', 'operator'], ['den1', 'denetci']]) auth.svc.createUser(null, { username: u, name: u, role: r }, 'Otorite-Parola-2026!');
  ids.A_K = addApplicant(A, 11111111, 'K'); ids.A_E = addApplicant(A, 22222222, 'E');
  ids.B_E = addApplicant(B, 33333333, 'E'); ids.B_K = addApplicant(B, 44444444, 'K');
  ids.B_noconsent = addApplicant(B, 55555555, 'E', { consent: { data: true, sensitive: false, contactShare: true, centralShare: false } });
});
test.after(async () => { await A.close(); await B.close(); await auth.close(); fs.rmSync(tmp, { recursive: true, force: true }); });

test('Zarf: şifreleme + imza, değiştirilince/yanlış alıcıda/yanlış türde reddedilir', () => {
  const env = H.seal({ kind: 'pool', from: 'A', to: 'OTORITE', seq: 1, payload: { x: 'gizli-metin-123' }, signKey: AU.loadPrivate(keys.A.sign.privateKey), recipientEncPub: authKeys.enc.publicKey });
  assert.ok(!JSON.stringify(env).includes('gizli-metin-123'), 'açık metin zarfta görünmemeli');
  const ok = H.open(env, { recipientEncPriv: crypto.createPrivateKey(authKeys.enc.privateKey), senderSignPub: keys.A.sign.publicKey, expectKind: 'pool', expectTo: 'OTORITE' });
  assert.equal(ok.payload.x, 'gizli-metin-123');
  const tampered = { ...env, ct: Buffer.from(env.ct, 'base64').map((b, i) => (i === 3 ? b ^ 1 : b)).toString('base64') };
  const o = { recipientEncPriv: crypto.createPrivateKey(authKeys.enc.privateKey), senderSignPub: keys.A.sign.publicKey, expectKind: 'pool', expectTo: 'OTORITE' };
  assert.throws(() => H.open(tampered, o), /İmza/);
  assert.throws(() => H.open(env, { ...o, senderSignPub: keys.B.sign.publicKey }), /İmza|anahtar/);
  assert.throws(() => H.open(env, { ...o, expectKind: 'proposals' }), /türü/);
  assert.throws(() => H.open(env, { ...o, expectTo: 'BASKA' }), /hazırlanmış/);
});

test('Birim: yalnız merkezî rızası olan adaylar pakete girer; paket kişisel veri içermez', () => {
  auth.svc.addUnit(adm, { code: 'BIRIM-A', name: 'Birim A', contact: 'a@kurum', identity: identity('A') });
  auth.svc.addUnit(adm, { code: 'BIRIM-B', name: 'Birim B', contact: 'b@kurum', identity: identity('B') });
  assert.throws(() => auth.svc.addUnit(adm, { code: 'BIRIM-A', name: 'x', identity: identity('A') }), /kayıtlı/);
  const st = B.svc.centralStatus(); assert.equal(st.configured, true); assert.equal(st.eligible, 2);
  const env = B.svc.centralExport(adm);
  const open = H.open(env, { recipientEncPriv: crypto.createPrivateKey(authKeys.enc.privateKey), senderSignPub: keys.B.sign.publicKey, expectKind: 'pool', expectTo: 'OTORITE' });
  assert.equal(open.payload.profiles.length, 2);
  const txt = JSON.stringify(open.payload);
  for (const v of Object.values(PII)) assert.ok(!txt.includes(v), 'pakette kişisel veri: ' + v);
  assert.ok(!txt.includes(mkTC(33333333)));
  for (const p of open.payload.profiles) assert.match(p.dogum, /-15$/, 'doğum günü ay ortasına yuvarlanmalı');
});

test('Otorite: paketi alır; yineleme, sahte imza, bilinmeyen birim, pasif birim reddedilir', () => {
  const e1 = A.svc.centralExport(adm), eB = B.svc.centralExport(adm);
  const r1 = auth.svc.importUnitPackage(op, e1); assert.equal(r1.added, 2);
  const rB = auth.svc.importUnitPackage(op, eB); assert.equal(rB.added, 2);
  assert.throws(() => auth.svc.importUnitPackage(op, e1), /yeni değil|yinelenen/, 'aynı paket ikinci kez uygulanamaz');
  const forged = H.seal({ kind: 'pool', from: 'BIRIM-A', to: 'OTORITE', seq: 99, payload: { unitCode: 'BIRIM-A', profiles: [] }, signKey: AU.loadPrivate(keys.B.sign.privateKey), recipientEncPub: authKeys.enc.publicKey });
  assert.throws(() => auth.svc.importUnitPackage(op, forged), /doğrulanamadı/, 'başka birimin anahtarıyla imzalı paket');
  assert.throws(() => auth.svc.importUnitPackage(op, { ...e1, from: 'YOK-BIRIM' }), /kayıtlı değil/);
  assert.equal(auth.svc.listUnits().find((u) => u.code === 'BIRIM-A').profiles, 2);
});

test('KVKK: otorite veritabanı dosyasında kimlik/iletişim verisi ve açık metin profil yok', () => {
  auth.db.exec('PRAGMA wal_checkpoint(TRUNCATE)');
  const bytes = Buffer.concat(fs.readdirSync(path.join(tmp, 'auth')).filter((f) => f.startsWith('otorite.sqlite')).map((f) => fs.readFileSync(path.join(tmp, 'auth', f))));
  for (const v of [...Object.values(PII), mkTC(11111111), mkTC(33333333), 'Mühendis', 'Eskişehir']) assert.ok(!bytes.includes(Buffer.from(v)), 'DB dosyasında açık metin: ' + v);
  const p = auth.svc.getProfile(op, 'BIRIM-A|' + ids.A_K);
  assert.ok(!('ad' in p.profile) && !('kimNo' in p.profile) && !('telefon' in p.profile) && !('ilce' in p.profile) && !('notes' in p.profile));
  assert.ok(!JSON.stringify(auth.svc.listAudit({})).includes(PII.ad));
});

test('Merkezî eşleştirme yalnız birimler arası çift önerir; ardından iki birimde yanıt → karşılıklı kabul', async () => {
  const run = await auth.svc.runMatch(op); assert.equal(run.pool, 4);
  const latest = auth.svc.latestRun(op, {});
  assert.ok(latest.items.length >= 2);
  for (const s of latest.items) assert.notEqual(s.a.split('|')[0], s.b.split('|')[0], 'aynı birimden çift önerilmemeli');
  const pick = latest.items.find((s) => s.canStart); assert.ok(pick);
  const intro = auth.svc.startIntro(op, pick.a, pick.b);
  assert.match(intro.id, /^C-\d{4}-\d{4}$/);
  assert.throws(() => auth.svc.startIntro(op, pick.a, pick.b), /başlatılamaz/, 'aynı çift ikinci kez başlatılamaz');

  const pA = auth.svc.exportForUnit(op, 'BIRIM-A'), pB = auth.svc.exportForUnit(op, 'BIRIM-B');
  assert.equal(A.svc.centralImport(adm, pA).added, 1); assert.equal(B.svc.centralImport(adm, pB).added, 1);
  assert.throws(() => A.svc.centralImport(adm, pA), /yeni değil/);
  assert.throws(() => A.svc.centralImport(adm, pB), /hazırlanmış/, 'B için hazırlanan paket A tarafından açılamaz');
  const ia = A.svc.centralIntros(adm)[0], ib = B.svc.centralIntros(adm)[0];
  assert.equal(ia.status, 'yanit_bekliyor'); assert.equal(ia.coord, null, 'kabulden önce iletişim bilgisi verilmemeli');
  assert.ok(ia.other.age > 17 && ia.other.unitName);
  assert.ok(!JSON.stringify(ia.other).includes(PII.ad));

  assert.throws(() => A.svc.centralRespond(adm, ia.id, { dec: 'kabul', method: 'şahsen' }), /onaylanmalı/);
  A.svc.centralRespond(adm, ia.id, { dec: 'kabul', method: 'şahsen', confirmed: true });
  B.svc.centralRespond(adm, ib.id, { dec: 'kabul', method: 'telefon', confirmed: true });
  assert.throws(() => A.svc.centralRespond(adm, ia.id, { dec: 'ret', method: 'x', confirmed: true }), /zaten/);

  auth.svc.importUnitPackage(op, A.svc.centralExport(adm)); auth.svc.importUnitPackage(op, B.svc.centralExport(adm));
  assert.equal(auth.svc.getIntro(op, intro.id).status, 'kabul');
  A.svc.centralImport(adm, auth.svc.exportForUnit(op, 'BIRIM-A'));
  const after = A.svc.centralIntros(adm)[0];
  assert.equal(after.status, 'kabul'); assert.ok(after.coord && after.coord.unitName, 'karşılıklı kabulden sonra koordinasyon bilgisi gelir');
  assert.equal(after.coord.contact, 'b@kurum');
  assert.ok(!JSON.stringify(after).includes(PII.tel), 'kişisel telefon asla merkezden gelmez');
});

test('Ret kalıcıdır: reddedilen çift tekrar önerilmez; rıza geri çekilince profil havuzdan çıkar', async () => {
  const before = auth.svc.listIntros(op, {}).length;
  // B_E ve A_K arasındaki ikinci tanıştırma adayını reddettir
  const latest = (await auth.svc.runMatch(op), auth.svc.latestRun(op, {}));
  const next = latest.items.find((s) => s.canStart);
  if (next) {
    auth.svc.startIntro(op, next.a, next.b);
    const [ua, ub] = [next.a.split('|')[0], next.b.split('|')[0]];
    const apps = { 'BIRIM-A': A, 'BIRIM-B': B };
    apps[ua].svc.centralImport(adm, auth.svc.exportForUnit(op, ua)); apps[ub].svc.centralImport(adm, auth.svc.exportForUnit(op, ub));
    const mine = apps[ua].svc.centralIntros(adm).find((x) => x.status === 'yanit_bekliyor');
    apps[ua].svc.centralRespond(adm, mine.id, { dec: 'ret', method: 'şahsen', confirmed: true });
    auth.svc.importUnitPackage(op, apps[ua].svc.centralExport(adm));
    assert.equal(auth.svc.getIntro(op, mine.id).status, 'reddedildi');
    await auth.svc.runMatch(op);
    assert.ok(!auth.svc.latestRun(op, {}).items.some((s) => (s.a === next.a && s.b === next.b) || (s.a === next.b && s.b === next.a)), 'reddedilen çift yeniden önerilmemeli');
  }
  assert.ok(auth.svc.listIntros(op, {}).length >= before);
  // rıza geri çekme: B'de aday havuzdan düşer → paket gönderilince otoritede silinir
  B.svc.applicantAction(adm, ids.B_E, 'pause', {});
  const rm = auth.svc.importUnitPackage(op, B.svc.centralExport(adm));
  assert.ok(rm.removed >= 1 || rm.updated >= 1);
});

test('HTTP: roller, oturum ve yetki — denetçi eşleştiremez, operatör birim ekleyemez, CSRF zorunlu', async () => {
  const cl = () => { const s = { cookie: '', csrf: '' }; s.req = async (m, p, b) => { const r = await fetch(base + p, { method: m, headers: { 'Content-Type': 'application/json', ...(s.cookie ? { Cookie: s.cookie } : {}), ...(s.csrf ? { 'X-CSRF-Token': s.csrf } : {}) }, body: b === undefined ? undefined : JSON.stringify(b) }); const sc = r.headers.get('set-cookie'); if (sc) s.cookie = sc.split(';')[0]; let j = null; try { j = await r.json(); } catch { /* */ } return { status: r.status, body: j }; }; s.login = async (u) => { const r = await s.req('POST', '/api/login', { username: u, password: 'Otorite-Parola-2026!' }); s.csrf = r.body.csrf; return r; }; return s; };
  const anon = cl(); assert.equal((await anon.req('GET', '/api/units')).status, 401);
  const d = cl(); await d.login('den1'); const o = cl(); await o.login('op1'); const a = cl(); await a.login('adm1');
  assert.equal((await d.req('POST', '/api/match/run', {})).status, 403);
  assert.equal((await d.req('GET', '/api/units')).status, 200);
  assert.equal((await o.req('POST', '/api/units', { code: 'Z', name: 'Z', identity: identity('A') })).status, 403);
  assert.equal((await o.req('POST', '/api/match/run', {})).status, 200);
  const noCsrf = await fetch(base + '/api/match/run', { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: o.cookie }, body: '{}' });
  assert.equal(noCsrf.status, 403);
  const dash = await a.req('GET', '/api/dashboard'); assert.equal(dash.status, 200); assert.equal(dash.body.chain.ok, true);
  const rep = await d.req('GET', '/api/audit/units'); assert.equal(rep.status, 200);
  const pub = await a.req('POST', '/api/params/publish', { note: 'test' }); assert.equal(pub.status, 200);
  assert.equal(AU.verifyBundle(pub.body, authKeys.sign.publicKey).ok, true);
});

test('Birim bundle: otoritenin yayımladığı imzalı parametre paketi birimde yüklenir', () => {
  const b = auth.svc.getBundle(1);
  const r = A.svc.importBundle(adm, b); assert.ok(r);
  assert.equal(A.svc.getParams().seal, b.seal);
});
