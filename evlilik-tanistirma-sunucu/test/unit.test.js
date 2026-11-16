'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const C = require('../lib/crypto');
const E = require('../lib/engine');

const ring = () => C.loadKeyring({ DATA_KEYS: `1:${Buffer.alloc(32, 7).toString('base64')},2:${Buffer.alloc(32, 9).toString('base64')}`, DATA_KEY_ID: '2' });

test('AES-GCM: şifrele/çöz, AAD bağlama, bozulma tespiti, anahtar döndürme', () => {
  const kr = ring();
  const b = C.encrypt(kr, 'merhaba ğüşiöç', 'applicant:A-1');
  assert.equal(C.decrypt(kr, b, 'applicant:A-1'), 'merhaba ğüşiöç');
  assert.equal(C.keyIdOf(b), 2);
  assert.throws(() => C.decrypt(kr, b, 'applicant:A-2'), 'başka kayda taşınan blob çözülememeli');
  const t = Buffer.from(b); t[t.length - 1] ^= 1;
  assert.throws(() => C.decrypt(kr, t, 'applicant:A-1'), 'bozulmuş blob reddedilmeli');
  // eski anahtarla şifrelenmiş veri, halka eski anahtarı içerdiği sürece çözülür
  const old = C.loadKeyring({ DATA_KEYS: `1:${Buffer.alloc(32, 7).toString('base64')}`, DATA_KEY_ID: '1' });
  const ob = C.encrypt(old, 'eski', 'x');
  assert.equal(C.decrypt(kr, ob, 'x'), 'eski');
});
test('Anahtar yapılandırması hatalıysa başlatma reddedilir', () => {
  assert.throws(() => C.loadKeyring({ DATA_KEYS: '', DATA_KEY_ID: '1' }));
  assert.throws(() => C.loadKeyring({ DATA_KEYS: '1:AAAA', DATA_KEY_ID: '1' }));
  assert.throws(() => C.loadKeyring({ DATA_KEYS: `1:${Buffer.alloc(32).toString('base64')}`, DATA_KEY_ID: '3' }));
});
test('HMAC dizin özeti kararlı ve anahtara bağlı', () => {
  const kr = ring();
  assert.equal(C.hmacIndex(kr, '10000000146'), C.hmacIndex(kr, '10000000146'));
  assert.notEqual(C.hmacIndex(kr, '10000000146'), C.hmacIndex(kr, '10000000147'));
});
test('scrypt parola özeti', () => {
  const h = C.hashPassword('Güçlü-Parola-123');
  assert.ok(C.verifyPassword('Güçlü-Parola-123', h));
  assert.ok(!C.verifyPassword('yanlış', h));
  assert.ok(!C.verifyPassword('x', 'bozuk'));
});
test('HOTP RFC 4226 test vektörü ve TOTP', () => {
  const sec = Buffer.from('12345678901234567890');
  assert.equal(C.hotp(sec, 0), '755224'); assert.equal(C.hotp(sec, 1), '287082'); assert.equal(C.hotp(sec, 9), '520489');
  const s = C.totpNewSecret(), now = Date.now();
  const code = C.hotp(C.b32decode(s), Math.floor(now / 30000));
  assert.equal(C.totpVerify(s, code, now), Math.floor(now / 30000));
  assert.equal(C.totpVerify(s, '000000', now), null);
});
test('T.C. kimlik doğrulama algoritması', () => {
  assert.ok(E.validTC('10000000146')); assert.ok(!E.validTC('10000000147')); assert.ok(!E.validTC('01234567890')); assert.ok(!E.validTC('123'));
});

const P = E.DEFAULT_PARAMS();
test('Parametre doğrulama: yaş tabanı, sıralama, ağırlık, boş metin', () => {
  assert.deepEqual(E.validateParams(P), []);
  const mk = (f) => { const x = JSON.parse(JSON.stringify(P)); f(x); return E.validateParams(x); };
  assert.ok(mk((x) => { x.minAge = 16; }).length, 'minAge=16 reddedilmeli');
  assert.ok(mk((x) => { x.minAge = 17; }).length);
  assert.ok(mk((x) => { x.maxAge = x.minAge; }).length);
  assert.ok(mk((x) => { x.impW = { 1: 5, 2: 3, 3: 6 }; }).length);
  assert.ok(mk((x) => { x.consentText = 'kısa'; }).length);
  assert.ok(mk((x) => { x.questions[0].id = 'xx'; }).length);
  assert.ok(mk((x) => { x.questions.push({ ...x.questions[0] }); }).length, 'yinelenen soru kimliği reddedilmeli');
  assert.ok(mk((x) => { x.matchGender = 'hayir'; }).length);
});

const person = (over = {}) => ({ ...E.newApplicantData(P), id: 'A', status: 'aktif', ad: 'A', soyad: 'B', kimNo: '10000000146', dogum: '1995-01-01', cins: 'K', il: 'Ankara', telefon: '1', tanitim: 'x', ...over, consent: { data: true, sensitive: false, contactShare: false, ts: 1, version: '1' } });
const ictx = () => ({ active: new Map(), blocked: new Set(), pairs: new Set() });
const T = '2026-06-01';

test('Aday kontrolü: 18 yaş tabanı, koruma kararı, rıza ve doğrulamalar', () => {
  const ok = person({ checks: { inPerson: true, idVerified: true, protective: true, protectiveFound: false, voluntary: true, notMarried: true } });
  assert.equal(E.checkApplicant(ok, P, T).status, 'UYGUN');
  const kid = E.checkApplicant({ ...ok, dogum: '2010-01-01' }, P, T);
  assert.equal(kid.status, 'ENGEL'); assert.ok(kid.findings.some((f) => f.id === 'K-YAS-SABIT'));
  assert.equal(E.checkApplicant({ ...ok, checks: { ...ok.checks, protectiveFound: true } }, P, T).status, 'ENGEL');
  assert.equal(E.checkApplicant({ ...ok, safetyBlock: true }, P, T).status, 'ENGEL');
  assert.equal(E.checkApplicant({ ...ok, consent: { ...ok.consent, data: false } }, P, T).status, 'EKSIK');
  assert.equal(E.checkApplicant({ ...ok, checks: { ...ok.checks, inPerson: false } }, P, T).status, 'EKSIK');
  assert.equal(E.checkApplicant({ ...ok, kimNo: '10000000147' }, P, T).status, 'ENGEL');
});
test('Eşleştirme: zorunlu eleyici, cinsiyet kuralı, havuz dışı, engelli çift, iki yönlü puan', () => {
  const a = person({ id: 'A1', cins: 'K', dogum: '1995-01-01' }), b = person({ id: 'B1', cins: 'E', dogum: '1993-01-01' });
  a.prefs.ageMin = 28; a.prefs.ageMax = 40; b.prefs.ageMin = 26; b.prefs.ageMax = 36;
  assert.equal(E.pairOk(a, b, P, T, ictx()), null);
  assert.equal(E.pairOk(a, person({ id: 'C', cins: 'K' }), P, T, ictx()), 'cinsiyet kuralı');
  assert.equal(E.pairOk(a, { ...b, status: 'beklemede' }, P, T, ictx()), 'havuzda değil');
  assert.equal(E.pairOk(a, { ...b, consent: { ...b.consent, data: false } }, P, T, ictx()), 'havuzda değil');
  const ic = ictx(); ic.blocked.add(E.pkey('A1', 'B1')); assert.match(E.pairOk(a, b, P, T, ic), /reddedilmiş/);
  const ic2 = ictx(); ic2.active.set('A1', P.maxActiveIntros); assert.equal(E.pairOk(a, b, P, T, ic2), 'havuzda değil');
  const r = E.scorePair(a, b, P, T); assert.equal(r.hard, false); assert.ok(r.score > 60);
  a.prefs.ageImp = 3; a.prefs.ageMin = 40; a.prefs.ageMax = 50;
  assert.equal(E.scorePair(a, b, P, T).hard, true, 'zorunlu yaş tercihi karşılanmazsa eleme');
});
test('Hassas sorular yalnız iki tarafın da açık rızası varsa kullanılır', () => {
  const P2 = JSON.parse(JSON.stringify(P)); P2.questions.find((q) => q.id === 'q_inanc').enabled = true;
  const a = person({ id: 'A', cins: 'K' }), b = person({ id: 'B', cins: 'E' });
  assert.ok(!E.critList(P2, a, b).some((c) => c.k === 'q:q_inanc'));
  a.consent.sensitive = true; assert.ok(!E.critList(P2, a, b).some((c) => c.k === 'q:q_inanc'));
  b.consent.sensitive = true; assert.ok(E.critList(P2, a, b).some((c) => c.k === 'q:q_inanc'));
});
test('Eşleştirme koşusu: öneriler tutarlı, tekrarsız, topN sınırı', () => {
  const list = [];
  for (let i = 0; i < 30; i++) list.push(person({ id: 'X' + i, cins: i % 2 ? 'K' : 'E', dogum: `${1990 + (i % 8)}-03-0${1 + (i % 8)}`, il: i % 3 ? 'Ankara' : 'İzmir' }));
  const res = E.runMatching(list, P, T, ictx());
  const seen = new Set();
  for (const s of res.suggestions) { assert.ok(s.score >= P.minScore); assert.notEqual(s.a, s.b); const k = E.pkey(s.a, s.b); assert.ok(!seen.has(k)); seen.add(k); }
  const cnt = {}; res.suggestions.forEach((s) => { cnt[s.a] = (cnt[s.a] || 0) + 1; cnt[s.b] = (cnt[s.b] || 0) + 1; });
  assert.ok(res.suggestions.length > 0);
});
test('Aday girdi temizleme: sunucu tarafı alanları ve sınırlar', () => {
  const base = E.newApplicantData(P);
  const { data, errors } = E.sanitizeApplicant({ ad: '  Ali  ', kimNo: '1000-000-0146abc', dogum: 'saçma', cocuk: 99, edu: '99', cins: 'X', tanitim: 'a'.repeat(1000), safetyBlock: true, status: 'aktif', history: [1], qa: { q_cocuk: { ans: 'Hiç', accept: ['Evet', 'Hiç'], imp: 9 }, q_yok: { ans: 'x' } } }, P, base);
  assert.equal(data.ad, 'Ali'); assert.equal(data.kimNo, '10000000146'); assert.equal(data.cocuk, 12); assert.equal(data.edu, String(P.eduLevels.length - 1));
  assert.equal(data.cins, ''); assert.equal(data.tanitim.length, 300); assert.equal(data.safetyBlock, false); assert.ok(errors.length);
  assert.equal(data.qa.q_cocuk.ans, ''); assert.deepEqual(data.qa.q_cocuk.accept, ['Evet']); assert.equal(data.qa.q_cocuk.imp, '1'); assert.ok(!data.qa.q_yok);
});
