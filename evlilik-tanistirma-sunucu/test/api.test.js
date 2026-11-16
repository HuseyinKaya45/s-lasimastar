'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { createApp } = require('../server');
const { loadConfig } = require('../lib/config');
const C = require('../lib/crypto');
const D = require('../lib/db');
const E = require('../lib/engine');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ets-test-'));
const cfg = loadConfig({
  DATA_DIR: tmp, PORT: '0', HOST: '127.0.0.1', ALLOW_DEMO: '1', COOKIE_SECURE: '0', ENV_FILE: path.join(tmp, 'yok.env'),
  DATA_KEYS: `1:${crypto.randomBytes(32).toString('base64')}`, DATA_KEY_ID: '1'
});
let app, base;
const PW = 'Yonetici-Parola-2026';

function client() {
  const s = { cookie: '', csrf: '' };
  s.req = async (method, p, body, extraHeaders) => {
    const h = { 'Content-Type': 'application/json', ...(s.cookie ? { Cookie: s.cookie } : {}), ...(s.csrf ? { 'X-CSRF-Token': s.csrf } : {}), ...(extraHeaders || {}) };
    const r = await fetch(base + p, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) });
    const sc = r.headers.get('set-cookie'); if (sc) s.cookie = sc.split(';')[0].replace(/^ets_sid=$/, '');
    let j = null; try { j = await r.json(); } catch { /* json değil */ }
    return { status: r.status, body: j, headers: r.headers };
  };
  s.login = async (username, password, code) => { const r = await s.req('POST', '/api/login', { username, password, code }); if (r.status === 200) s.csrf = r.body.csrf; return r; };
  return s;
}
const mkTC = (seed) => { const d = [1, ...String(seed).padStart(8, '0').split('').map(Number)]; const d10 = (((d[0] + d[2] + d[4] + d[6] + d[8]) * 7) - (d[1] + d[3] + d[5] + d[7])) % 10; d.push((d10 + 10) % 10); d.push(d.reduce((a, b) => a + b, 0) % 10); return d.join(''); };
const validApplicantInput = (over = {}) => ({
  ad: 'Gizli Ad', soyad: 'Gizli Soyad', kimNo: mkTC(31415926), dogum: '1994-05-05', cins: 'K', telefon: '05551234567', eposta: 'gizli@example.org', il: 'Eskişehir', ilce: 'Odunpazarı', medeni: 'hic', cocuk: 0, edu: '4', is: 'calisiyor', meslek: 'Mühendis', tanitim: 'Kısa tanıtım metni.',
  prefs: { ageMin: 24, ageMax: 38, ageImp: 2, locMode: 'fark_etmez', locImp: 1, eduMin: '2', eduImp: 1, maritalOk: ['hic'], maritalImp: 1, kidsOk: true, kidsImp: 1 }, qa: {},
  consent: { data: true, sensitive: false, contactShare: true }, checks: { inPerson: true, idVerified: true, protective: true, protectiveFound: false, voluntary: true, notMarried: true }, ...over
});

let admin, officer, auditor;
test.before(async () => {
  app = createApp(cfg); const a = await app.listen(); base = `http://127.0.0.1:${a.port}`;
  app.svc.createUser(null, { username: 'yonetici1', name: 'Yönetici Bir', role: 'admin' }, PW);
});
test.after(async () => { await app.close(); fs.rmSync(tmp, { recursive: true, force: true }); });

test('Kimlik doğrulama: oturumsuz erişim, yanlış parola, kilitlenme, başlıklar', async () => {
  const anon = client();
  assert.equal((await anon.req('GET', '/api/applicants')).status, 401);
  const wrong = await anon.login('yonetici1', 'yanlis-parola');
  assert.equal(wrong.status, 401); assert.equal(wrong.body.error, 'Kullanıcı adı veya parola hatalı.');
  assert.equal((await anon.login('yok-boyle-biri', 'x')).status, 401, 'kullanıcı varlığı sızdırılmamalı (aynı mesaj)');
  const r = await anon.req('GET', '/healthz');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-security-policy'), /default-src 'self'/);
  assert.equal(r.headers.get('x-frame-options'), 'DENY'); assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  // kilitlenme: ayrı bir kullanıcı üzerinde 5 hatalı deneme
  app.svc.createUser(null, { username: 'kilit1', name: 'Kilit Deneme', role: 'gorevli' }, 'Kilit-Parola-2026!');
  for (let i = 0; i < 5; i++) await anon.login('kilit1', 'hatali' + i);
  const locked = await anon.login('kilit1', 'Kilit-Parola-2026!');
  assert.equal(locked.status, 423, 'doğru parola bile kilit süresince reddedilmeli');
});

test('Giriş, CSRF ve statik dosya güvenliği', async () => {
  admin = client();
  const r = await admin.login('yonetici1', PW);
  assert.equal(r.status, 200); assert.equal(r.body.user.role, 'admin');
  const setCookie = r.headers.get('set-cookie'); assert.match(setCookie, /HttpOnly/); assert.match(setCookie, /SameSite=Strict/);
  const noCsrf = await admin.req('POST', '/api/applicants', {}, { 'X-CSRF-Token': 'yanlis' });
  assert.equal(noCsrf.status, 403);
  const evilOrigin = await admin.req('POST', '/api/applicants', {}, { Origin: 'http://kotu.example' });
  assert.equal(evilOrigin.status, 403, 'farklı Origin reddedilmeli');
  const trav = await fetch(base + '/..%2f..%2fetc/passwd'); assert.ok([403, 404].includes(trav.status));
  const trav2 = await fetch(base + '/%2e%2e/package.json'); assert.ok([403, 404].includes(trav2.status));
  assert.equal((await fetch(base + '/')).status, 200);
});

test('Kullanıcı yönetimi, zorunlu parola değişimi ve rol ayrımı', async () => {
  let r = await admin.req('POST', '/api/users', { username: 'gorevli1', name: 'Görevli Bir', role: 'gorevli' });
  assert.equal(r.status, 200); const temp = r.body.tempPassword; assert.ok(temp && temp.length >= 12);
  r = await admin.req('POST', '/api/users', { username: 'denetci1', name: 'Denetçi Bir', role: 'denetci' }); const tempD = r.body.tempPassword;
  assert.equal((await admin.req('POST', '/api/users', { username: 'gorevli1', name: 'x', role: 'gorevli' })).status, 409);
  assert.equal((await admin.req('POST', '/api/users', { username: 'a b', name: 'x', role: 'gorevli' })).status, 400);

  officer = client(); assert.equal((await officer.login('gorevli1', temp)).status, 200);
  let blocked = await officer.req('GET', '/api/applicants');
  assert.equal(blocked.status, 403); assert.equal(blocked.body.code, 'MUST_CHANGE_PASSWORD');
  assert.equal((await officer.req('POST', '/api/me/password', { oldPassword: temp, newPassword: 'kisa' })).status, 400);
  assert.equal((await officer.req('POST', '/api/me/password', { oldPassword: temp, newPassword: 'gorevli1-parolasi-X' })).status, 400, 'kullanıcı adını içeren parola reddedilmeli');
  assert.equal((await officer.req('POST', '/api/me/password', { oldPassword: temp, newPassword: 'Gizli-Yeni-Parola-77' })).status, 200);
  assert.equal((await officer.req('GET', '/api/applicants')).status, 200);

  auditor = client(); await auditor.login('denetci1', tempD);
  await auditor.req('POST', '/api/me/password', { oldPassword: tempD, newPassword: 'Denetci-Yeni-Parola-88' });
  // rol ayrımı (sunucu tarafında)
  assert.equal((await officer.req('GET', '/api/users')).status, 403);
  assert.equal((await officer.req('POST', '/api/params/propose', { params: {}, reason: 'deneme deneme' })).status, 403);
  assert.equal((await auditor.req('POST', '/api/applicants')).status, 403, 'denetçi aday oluşturamaz');
  assert.equal((await auditor.req('POST', '/api/match/run')).status, 403);
  assert.equal((await auditor.req('GET', '/api/audit')).status, 200);
  assert.equal((await officer.req('GET', '/api/audit')).status, 403, 'görevli denetim günlüğünü okuyamaz');
});

test('Aday yaşam döngüsü: oluştur, düzenle, iyimser kilit, çift kayıt, etkinleştirme', async () => {
  const c = await officer.req('POST', '/api/applicants'); assert.equal(c.status, 200); const id = c.body.id;
  let g = await officer.req('GET', '/api/applicants/' + id); assert.equal(g.status, 200);
  assert.equal(g.body.check.status, 'EKSIK');
  let act = await officer.req('POST', `/api/applicants/${id}/action`, { action: 'activate' });
  assert.equal(act.status, 422, 'eksik bilgiyle havuza alınamaz');
  const u1 = await officer.req('PUT', '/api/applicants/' + id, { data: validApplicantInput(), version: g.body.version });
  assert.equal(u1.status, 200); assert.equal(u1.body.check.status, 'UYGUN');
  const stale = await officer.req('PUT', '/api/applicants/' + id, { data: validApplicantInput(), version: g.body.version });
  assert.equal(stale.status, 409, 'eski sürümle yazma reddedilmeli');
  const c2 = await officer.req('POST', '/api/applicants'); const g2 = await officer.req('GET', '/api/applicants/' + c2.body.id);
  const dup = await officer.req('PUT', '/api/applicants/' + c2.body.id, { data: validApplicantInput(), version: g2.body.version });
  assert.equal(dup.status, 409, 'aynı kimlik numarası ikinci kez kaydedilemez');
  // 18 yaş altı: sunucu engeller
  const kid = await officer.req('PUT', '/api/applicants/' + c2.body.id, { data: validApplicantInput({ kimNo: mkTC(27182818), dogum: new Date(Date.now() - 16 * 365.25 * 864e5).toISOString().slice(0, 10) }), version: g2.body.version });
  assert.equal(kid.status, 200); assert.equal(kid.body.check.status, 'ENGEL');
  assert.equal((await officer.req('POST', `/api/applicants/${c2.body.id}/action`, { action: 'activate' })).status, 422);
  act = await officer.req('POST', `/api/applicants/${id}/action`, { action: 'activate' }); assert.equal(act.status, 200);
  g = await officer.req('GET', '/api/applicants/' + id); assert.equal(g.body.applicant.status, 'aktif');
  // istemci alanları: durum/güvenlik alanları PUT ile değiştirilemez
  await officer.req('PUT', '/api/applicants/' + id, { data: { ...validApplicantInput(), safetyBlock: true, status: 'engelli' }, version: g.body.version });
  g = await officer.req('GET', '/api/applicants/' + id); assert.equal(g.body.applicant.status, 'aktif'); assert.equal(g.body.applicant.safetyBlock, false);
  globalThis.__realId = id;
});

test('Kişisel veriler diskte düz metin olarak bulunmaz (alan şifreleme)', async () => {
  app.db.exec('PRAGMA wal_checkpoint(TRUNCATE)');
  const files = fs.readdirSync(tmp).filter((f) => f.startsWith('ets.sqlite')).map((f) => fs.readFileSync(path.join(tmp, f)));
  const all = Buffer.concat(files);
  for (const secret of ['Gizli Ad', 'Gizli Soyad', mkTC(31415926), '05551234567', 'gizli@example.org', 'Eskişehir', 'Odunpazarı'])
    assert.equal(all.includes(Buffer.from(secret)), false, `"${secret}" veritabanı dosyasında düz metin olarak bulunmamalı`);
  // yanlış anahtarla çözülemez
  const bad = C.loadKeyring({ DATA_KEYS: `1:${crypto.randomBytes(32).toString('base64')}`, DATA_KEY_ID: '1' });
  const row = app.db.prepare('SELECT * FROM applicants WHERE id=?').get(globalThis.__realId);
  assert.throws(() => C.decrypt(bad, row.data, 'applicant:' + row.id));
});

test('Denetçi görünümü maskelidir; her görüntüleme denetim günlüğüne yazılır', async () => {
  const id = globalThis.__realId;
  const r = await auditor.req('GET', '/api/applicants/' + id); assert.equal(r.status, 200);
  const a = r.body.applicant; assert.equal(a.masked, true);
  assert.ok(!a.telefon && !a.eposta && !a.tanitim && !a.notes, 'iletişim/serbest metin alanları denetçiye gönderilmemeli');
  assert.notEqual(a.kimNo, mkTC(31415926)); assert.match(a.kimNo, /•/); assert.match(a.ad, /^G•••$/);
  const list = await auditor.req('GET', '/api/applicants'); assert.ok(!JSON.stringify(list.body).includes('Gizli Ad'));
  const aud = await auditor.req('GET', '/api/audit?q=ADAY_GORULDU'); assert.ok(aud.body.items.some((x) => x.username === 'denetci1' && x.detail.includes('maskeli')));
  const full = await officer.req('GET', '/api/applicants/' + id); assert.equal(full.body.applicant.ad, 'Gizli Ad');
});

test('Eşleştirme ve tanıştırma: karşılıklı rıza, ret kalıcı, iletişim bilgisi kapısı', async () => {
  assert.equal((await admin.req('POST', '/api/admin/demo')).status, 200);
  const run = await officer.req('POST', '/api/match/run'); assert.equal(run.status, 200); assert.ok(run.body.suggestions > 0);
  const latest = await officer.req('GET', '/api/match/latest'); const items = latest.body.items.filter((x) => x.canStart);
  assert.ok(items.length >= 2);
  const why = await officer.req('GET', `/api/match/why?a=${items[0].a}&b=${items[0].b}`); assert.equal(why.status, 200); assert.ok(why.body.whyA.length);
  // 1) karşılıklı kabul
  const t1 = await officer.req('POST', '/api/intros', { a: items[0].a, b: items[0].b }); assert.equal(t1.status, 200); const id1 = t1.body.id;
  assert.equal((await officer.req('POST', '/api/intros', { a: items[0].a, b: items[0].b })).status, 422, 'aynı çift ikinci kez başlatılamaz');
  assert.equal((await officer.req('POST', `/api/intros/${id1}/respond`, { side: 'a', dec: 'kabul', method: 'şahsen' })).status, 400, 'adayın kendi kararı onayı olmadan kaydedilemez');
  assert.equal((await officer.req('POST', `/api/intros/${id1}/respond`, { side: 'a', dec: 'kabul', method: 'şahsen', confirmed: true })).status, 200);
  assert.equal((await officer.req('POST', `/api/intros/${id1}/respond`, { side: 'a', dec: 'ret', method: 'şahsen', confirmed: true })).status, 409, 'verilen karar değiştirilemez');
  let d = await officer.req('GET', '/api/intros/' + id1); assert.equal(d.body.status, 'yanit_bekliyor'); assert.equal(d.body.contact, null);
  await officer.req('POST', `/api/intros/${id1}/respond`, { side: 'b', dec: 'kabul', method: 'telefon', confirmed: true });
  d = await officer.req('GET', '/api/intros/' + id1); assert.equal(d.body.status, 'kabul'); assert.equal(d.body.contact, null, 'görüşme planlanmadan iletişim bilgisi gösterilmemeli');
  const past = await officer.req('POST', `/api/intros/${id1}/plan`, { date: '2020-01-01', time: '14:00', place: 'Belediye' }); assert.equal(past.status, 400);
  const fut = new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10);
  assert.equal((await officer.req('POST', `/api/intros/${id1}/plan`, { date: fut, time: '14:00', place: 'Belediye kafeterya' })).status, 200);
  d = await officer.req('GET', '/api/intros/' + id1); assert.equal(d.body.status, 'bulusma_planli'); assert.ok(d.body.contact);
  const dAud = await auditor.req('GET', '/api/intros/' + id1); assert.equal(dAud.body.contact, null, 'denetçi iletişim bilgisi göremez');
  // 2) ret: çift bir daha önerilmez
  const t2 = await officer.req('POST', '/api/intros', { a: items[1].a, b: items[1].b }); const id2 = t2.body.id;
  assert.equal((await officer.req('POST', `/api/intros/${id2}/respond`, { side: 'b', dec: 'ret', method: 'şahsen', confirmed: true })).status, 200);
  d = await officer.req('GET', '/api/intros/' + id2); assert.equal(d.body.status, 'reddedildi');
  await officer.req('POST', '/api/match/run');
  const again = await officer.req('GET', '/api/match/latest?pageSize=200');
  assert.ok(!again.body.items.some((x) => (x.a === items[1].a && x.b === items[1].b) || (x.a === items[1].b && x.b === items[1].a)), 'reddedilen çift tekrar önerilmemeli');
  assert.equal((await officer.req('POST', '/api/intros', { a: items[1].a, b: items[1].b })).status, 422);
});

test('Güvenlik engeli, iki kişi kuralı ve anonimleştirme yetkisi', async () => {
  const id = globalThis.__realId;
  assert.equal((await officer.req('POST', `/api/applicants/${id}/action`, { action: 'safety', reason: 'x' })).status, 400, 'gerekçe zorunlu');
  assert.equal((await officer.req('POST', `/api/applicants/${id}/action`, { action: 'safety', reason: 'Güvenlik bildirimi alındı' })).status, 200);
  let g = await officer.req('GET', '/api/applicants/' + id); assert.equal(g.body.applicant.status, 'engelli');
  assert.equal((await officer.req('POST', `/api/applicants/${id}/action`, { action: 'release', reason: 'kaldırma denemesi' })).status, 403, 'görevli engeli kaldıramaz');
  assert.equal((await officer.req('POST', `/api/applicants/${id}/action`, { action: 'anonymize', reason: 'silme denemesi' })).status, 403, 'görevli veri silemez');
  assert.equal((await admin.req('POST', `/api/applicants/${id}/action`, { action: 'release', reason: 'Bildirim incelendi, engel kalktı' })).status, 200);
  assert.equal((await admin.req('POST', `/api/applicants/${id}/action`, { action: 'anonymize', reason: 'Adayın silme talebi' })).status, 200);
  g = await admin.req('GET', '/api/applicants/' + id); assert.equal(g.body.applicant.status, 'silindi'); assert.ok(!g.body.applicant.ad);
  app.db.exec('PRAGMA wal_checkpoint(TRUNCATE)');
  const all = Buffer.concat(fs.readdirSync(tmp).filter((f) => f.startsWith('ets.sqlite')).map((f) => fs.readFileSync(path.join(tmp, f))));
  assert.ok(!all.includes(Buffer.from('Gizli Soyad')));
});

test('Parametreler: iki kişi kuralı, doğrulama, mühür', async () => {
  const info = await admin.req('GET', '/api/params'); const P = info.body.params;
  const P2 = { ...P, minScore: 70 };
  // tek yönetici → doğrudan uygulanır
  assert.equal(info.body.adminCount, 1);
  const bad = await admin.req('POST', '/api/params/propose', { params: { ...P, minAge: 16 }, reason: 'yasaklı deneme' }); assert.equal(bad.status, 422);
  assert.equal((await admin.req('POST', '/api/params/propose', { params: P2, reason: 'x' })).status, 400, 'gerekçe zorunlu');
  const r1 = await admin.req('POST', '/api/params/propose', { params: P2, reason: 'Genelge gereği puan yükseltildi' });
  assert.equal(r1.status, 200); assert.equal(r1.body.applied, true);
  // ikinci yönetici → iki kişi kuralı
  app.svc.createUser(null, { username: 'yonetici2', name: 'Yönetici İki', role: 'admin' }, 'Ikinci-Yonetici-2026');
  const admin2 = client(); assert.equal((await admin2.login('yonetici2', 'Ikinci-Yonetici-2026')).status, 200);
  const P3 = { ...P2, minScore: 65 };
  const pr = await admin.req('POST', '/api/params/propose', { params: P3, reason: 'Yeni genelge, puan düşürüldü' });
  assert.equal(pr.body.applied, false); const pid = pr.body.proposalId;
  assert.equal((await admin.req('POST', `/api/params/proposals/${pid}/approve`, {})).status, 403, 'öneren kendi önerisini onaylayamaz');
  assert.equal((await admin2.req('POST', `/api/params/proposals/${pid}/approve`, {})).status, 200);
  const after = await admin.req('GET', '/api/params'); assert.equal(after.body.params.minScore, 65); assert.equal(after.body.version, 3);
  assert.match(after.body.seal, /^[0-9a-f]{64}$/);
  assert.equal(after.body.history.length, 3);
  const dash = await admin.req('GET', '/api/dashboard'); assert.equal(dash.body.chain.ok, true);
  assert.equal((await admin.req('POST', '/api/params/official-seal', { seal: 'xyz' })).status, 400);
  await admin.req('POST', '/api/params/official-seal', { seal: after.body.seal });
  assert.equal((await admin.req('GET', '/api/dashboard')).body.sealMatches, true);
  await admin.req('POST', '/api/params/official-seal', { seal: 'a'.repeat(64) });
  assert.equal((await admin.req('GET', '/api/dashboard')).body.sealMatches, false);
  globalThis.__admin2 = admin2;
});

test('Denetim günlüğü: zincir doğrulaması, silinemez/değiştirilemez, kurcalama tespiti', async () => {
  const v = await auditor.req('GET', '/api/audit/verify'); assert.equal(v.body.ok, true); assert.ok(v.body.n > 20);
  assert.throws(() => app.db.exec("UPDATE audit SET detail='x' WHERE i=1"), /yalnızca eklenebilir/);
  assert.throws(() => app.db.exec('DELETE FROM audit WHERE i=1'), /yalnızca eklenebilir/);
  // saldırgan tetikleyiciyi kaldırıp kaydı değiştirirse zincir bozulur
  app.db.exec('DROP TRIGGER audit_no_update'); app.db.exec("UPDATE audit SET detail='DEĞİŞTİRİLDİ' WHERE i=3");
  const v2 = await auditor.req('GET', '/api/audit/verify'); assert.equal(v2.body.ok, false); assert.equal(v2.body.at, 3);
  const dash = await admin.req('GET', '/api/dashboard'); assert.equal(dash.status, 200);
  const pkg = await auditor.req('GET', '/api/export/package'); assert.equal(pkg.status, 200); assert.ok(!JSON.stringify(pkg.body).includes('05551234567'));
  assert.equal(pkg.body.zincir.ok, false);
  // tetikleyiciyi geri koy ve kaydı eski haline getir (sonraki testler için)
  const orig = app.db.prepare('SELECT * FROM audit WHERE i=3').get();
  assert.equal(orig.detail, 'DEĞİŞTİRİLDİ');
});

test('İki aşamalı doğrulama (TOTP): etkinleştirme, zorunlu kod, tekrar kullanım engeli', async () => {
  const u = client(); await u.login('yonetici2', 'Ikinci-Yonetici-2026');
  const s = await u.req('POST', '/api/me/totp/setup'); assert.equal(s.status, 200); assert.match(s.body.otpauth, /^otpauth:\/\/totp\//);
  assert.equal((await u.req('POST', '/api/me/totp/enable', { code: '000000' })).status, 400);
  const code = C.hotp(C.b32decode(s.body.secret), Math.floor(Date.now() / 30000));
  assert.equal((await u.req('POST', '/api/me/totp/enable', { code })).status, 200);
  const u2 = client();
  const noCode = await u2.login('yonetici2', 'Ikinci-Yonetici-2026'); assert.equal(noCode.status, 401); assert.equal(noCode.body.need2fa, true);
  const bad = await u2.login('yonetici2', 'Ikinci-Yonetici-2026', '123456'); assert.equal(bad.status, 401);
  const next = C.hotp(C.b32decode(s.body.secret), Math.floor(Date.now() / 30000) + 1); // ileri pencere: kabul edilir
  assert.equal((await u2.login('yonetici2', 'Ikinci-Yonetici-2026', next)).status, 200);
  const u3 = client(); assert.equal((await u3.login('yonetici2', 'Ikinci-Yonetici-2026', next)).status, 401, 'aynı kod tekrar kullanılamaz');
});

test('Zorunlu iki aşamalı doğrulama ayarı yetkisiz kullanıcıyı kısıtlar', async () => {
  assert.equal((await admin.req('POST', '/api/params/require2fa', { on: true })).status, 200);
  const r = await admin.req('GET', '/api/applicants'); assert.equal(r.status, 403); assert.equal(r.body.code, 'MUST_ENABLE_2FA');
  assert.equal((await admin.req('GET', '/api/me')).status, 200, 'kurulum uçları açık kalmalı');
  const s = await admin.req('POST', '/api/me/totp/setup'); const code = C.hotp(C.b32decode(s.body.secret), Math.floor(Date.now() / 30000));
  assert.equal((await admin.req('POST', '/api/me/totp/enable', { code })).status, 200);
  assert.equal((await admin.req('GET', '/api/applicants')).status, 200);
  app.svc.setRequire2fa({ username: 'sistem', role: '-' }, false);
});

test('Kullanıcı pasifleştirme oturumları sonlandırır; son yönetici korunur', async () => {
  const users = (await admin.req('GET', '/api/users')).body;
  const off = users.find((x) => x.username === 'gorevli1');
  assert.equal((await admin.req('PATCH', '/api/users/' + off.id, { active: false })).status, 200);
  assert.equal((await officer.req('GET', '/api/applicants')).status, 401, 'pasif kullanıcının açık oturumu geçersiz olmalı');
  const me = users.find((x) => x.username === 'yonetici1');
  assert.equal((await admin.req('PATCH', '/api/users/' + me.id, { active: false })).status, 403, 'kendini pasifleştiremez');
});

test('Büyük havuz: eşleştirme ayrı iş parçacığında çalışır, sunucu yanıt vermeye devam eder, eşzamanlı ikinci koşu reddedilir', async () => {
  app.svc.seedDemo({ username: 'sistem', role: 'admin' }, 400);
  const adm = client(); assert.equal((await adm.login('yonetici2', 'Ikinci-Yonetici-2026', C.hotp(C.b32decode(app.db.prepare("SELECT totp_secret s FROM users WHERE username='yonetici2'").get().s), Math.floor(Date.now() / 30000) + 1))).status >= 200, true);
  const a1 = admin.req('POST', '/api/match/run');
  await new Promise((r) => setTimeout(r, 30));
  const t0 = Date.now(); const h = await fetch(base + '/healthz'); const dt = Date.now() - t0;
  assert.equal(h.status, 200); assert.ok(dt < 500, `eşleştirme sürerken sağlık ucu geç yanıt verdi (${dt} ms)`);
  const a2 = await admin.req('POST', '/api/match/run'); assert.equal(a2.status, 409, 'eşzamanlı ikinci koşu reddedilmeli');
  const r1 = await a1; assert.equal(r1.status, 200); assert.ok(r1.body.pool >= 400);
});
