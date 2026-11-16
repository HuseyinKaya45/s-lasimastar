'use strict';
/**
 * Saf (yan etkisiz) iş mantığı: parametre doğrulama, aday uygunluk kontrolü, eşleştirme.
 * Veritabanına veya HTTP'ye bağımlı değildir; testlenebilir ve denetlenebilir.
 */

/* ---- Pazarlık edilemez güvenceler (parametreyle değiştirilemez) ---- */
const HARD = Object.freeze({ minAgeFloor: 18 });

const IMP = [['0', 'Önemsiz'], ['1', 'Az önemli'], ['2', 'Önemli'], ['3', 'Zorunlu (eleyici)']];
const MEDENI = [['hic', 'Hiç evlenmemiş'], ['bosanmis', 'Boşanmış'], ['dul', 'Dul']];
const ISDURUM = [['calisiyor', 'Çalışıyor'], ['ogrenci', 'Öğrenci'], ['calismiyor', 'Çalışmıyor'], ['emekli', 'Emekli']];
const CRIT_LABEL = { age: 'Yaş', loc: 'Yaşanılan il', edu: 'Eğitim', marital: 'Medeni durum', kids: 'Çocuk durumu' };
const ST_A = ['taslak', 'dogrulama', 'aktif', 'beklemede', 'inceleme', 'cekildi', 'engelli', 'tamamlandi', 'silindi'];
const ACTIVE_INTRO = ['yanit_bekliyor', 'kabul', 'bulusma_planli', 'devam_ediyor'];

const DEFAULT_PARAMS = () => ({
  institution: 'Evlilik Tanıştırma Birimi',
  minAge: 18, maxAge: 60,
  matchGender: 'karsi',
  minScore: 60, topN: 5, aggregator: 'geom',
  maxActiveIntros: 2, cooldownDays: 30, responseDays: 7,
  ageDecayYears: 5,
  impW: { 1: 1, 2: 3, 3: 6 },
  critW: { age: 3, loc: 2, edu: 2, marital: 2, kids: 2 },
  eduLevels: ['İlkokul', 'Ortaokul', 'Lise', 'Ön lisans', 'Lisans', 'Yüksek lisans', 'Doktora'],
  meetingMode: 'Görevli eşliğinde, kamuya açık bir yerde',
  consentVersion: '1',
  consentText: 'Evlenme amacıyla tanışmak için bu başvuruyu kendi isteğimle ve şahsen yaptım. Bilgilerimin yalnızca tanıştırma amacıyla ve kurumun belirlediği kapsamda işlenmesine, uygun görülen adaylara sınırlı bir tanıtım özeti olarak sunulmasına rıza veriyorum. İletişim bilgilerim, ben ve karşı taraf birbirimizle tanışmayı ayrı ayrı kabul etmeden paylaşılmaz. Başvurumdan istediğim zaman, gerekçe göstermeden çekilebilirim; kimseyle eşleşmeyi kabul etmek zorunda değilim.',
  retentionDays: 365,
  fairGapPct: 15,
  sessionIdleMinutes: 15,
  passwordMinLength: 12,
  questions: [
    { id: 'q_cocuk', label: 'Çocuk sahibi olmak istiyor musunuz?', opts: ['Evet', 'Hayır', 'Kararsızım'], weight: 3, sensitive: false, enabled: true },
    { id: 'q_yer', label: 'Yaşamak istediğiniz yer', opts: ['Büyükşehir', 'Şehir', 'Kasaba / köy', 'Fark etmez'], weight: 2, sensitive: false, enabled: true },
    { id: 'q_aile', label: 'Evlendikten sonra ailenizden biriyle birlikte yaşama', opts: ['İsterim', 'İstemem', 'Fark etmez'], weight: 2, sensitive: false, enabled: true },
    { id: 'q_calisma', label: 'Eşinizin çalışması konusundaki beklentiniz', opts: ['Çalışsın', 'Çalışmasın', 'Fark etmez'], weight: 2, sensitive: false, enabled: true },
    { id: 'q_sigara', label: 'Sigara kullanımı', opts: ['Kullanıyorum', 'Kullanmıyorum'], weight: 2, sensitive: false, enabled: true },
    { id: 'q_inanc', label: 'Dinî hassasiyet düzeyi', opts: ['Yüksek', 'Orta', 'Düşük'], weight: 2, sensitive: true, enabled: false }
  ]
});

const PARAM_SCHEMA = [
  { sec: 'Genel' },
  { k: 'institution', label: 'Kurum adı', type: 'text', max: 120 },
  { k: 'minAge', label: 'Asgari başvuru yaşı', type: 'int', min: HARD.minAgeFloor, max: 40, help: `En az ${HARD.minAgeFloor}; altına indirilemez.` },
  { k: 'maxAge', label: 'Azami başvuru yaşı', type: 'int', min: 25, max: 99 },
  { k: 'matchGender', label: 'Eşleştirme cinsiyet kuralı', type: 'sel', opts: [['karsi', 'Karşı cinsiyetle'], ['serbest', 'Kısıtlama yok']], help: 'Yürürlükteki mevzuat ve kurum politikasına göre yetkili makam belirler.' },
  { sec: 'Eşleştirme' },
  { k: 'minScore', label: 'Asgari uyum puanı (0–100)', type: 'int', min: 0, max: 100 },
  { k: 'topN', label: 'Aday başına önerilecek en fazla kişi', type: 'int', min: 1, max: 20 },
  { k: 'aggregator', label: 'İki yönlü puan birleştirme', type: 'sel', opts: [['geom', 'Geometrik ortalama'], ['min', 'Düşük olan'], ['avg', 'Aritmetik ortalama']] },
  { k: 'ageDecayYears', label: 'Yaş tercihine ne kadar uzaklıkta puan sıfırlanır (yıl)', type: 'int', min: 1, max: 15 },
  { sec: 'Süreç ve güvenlik' },
  { k: 'maxActiveIntros', label: 'Bir adayın aynı anda en fazla aktif tanıştırması', type: 'int', min: 1, max: 5 },
  { k: 'cooldownDays', label: 'Sona eren tanıştırmadan sonra yeni öneri için bekleme (gün)', type: 'int', min: 0, max: 365 },
  { k: 'responseDays', label: 'Yanıt bekleme süresi (gün)', type: 'int', min: 1, max: 60 },
  { k: 'meetingMode', label: 'İlk görüşme biçimi (metin)', type: 'text', max: 200 },
  { k: 'retentionDays', label: 'Kapanan kayıtların saklama süresi (gün)', type: 'int', min: 30, max: 3650 },
  { k: 'fairGapPct', label: 'Adalet uyarı eşiği (yüzde puan farkı)', type: 'int', min: 1, max: 60 },
  { k: 'sessionIdleMinutes', label: 'Oturum boşta kalma süresi (dakika)', type: 'int', min: 5, max: 120 },
  { k: 'passwordMinLength', label: 'Asgari parola uzunluğu', type: 'int', min: 10, max: 64 }
];

/* ---------- Tarih / kimlik yardımcıları ---------- */
const pad2 = (n) => String(n).padStart(2, '0');
const dStr = (d) => d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
const todayStr = () => dStr(new Date());
const isDate = (s) => /^\d{4}-\d\d-\d\d$/.test(s) && !isNaN(new Date(s + 'T00:00:00'));
const addDays = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return dStr(d); };
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 864e5);
function ageOn(birth, ref) {
  const b = new Date(birth + 'T00:00:00'), r = new Date(ref + 'T00:00:00');
  let a = r.getFullYear() - b.getFullYear();
  if (r.getMonth() < b.getMonth() || (r.getMonth() === b.getMonth() && r.getDate() < b.getDate())) a--;
  return a;
}
function validTC(n) {
  if (!/^[1-9]\d{10}$/.test(n)) return false;
  const d = n.split('').map(Number);
  const d10 = (((d[0] + d[2] + d[4] + d[6] + d[8]) * 7) - (d[1] + d[3] + d[5] + d[7])) % 10;
  return ((d10 + 10) % 10 === d[9]) && (d.slice(0, 10).reduce((a, b) => a + b, 0) % 10 === d[10]);
}

/* ---------- Parametre doğrulama ---------- */
function validateParams(p) {
  const E = [];
  if (!p || typeof p !== 'object') return ['Parametre nesnesi geçersiz.'];
  for (const s of PARAM_SCHEMA) {
    if (!s.k) continue;
    const v = p[s.k];
    if (s.type === 'int' && (!Number.isInteger(v) || v < s.min || v > s.max)) E.push(`${s.label}: ${s.min}–${s.max} arası tam sayı olmalı.`);
    if (s.type === 'text' && (typeof v !== 'string' || !v.trim() || v.length > s.max)) E.push(`${s.label} boş olamaz (en çok ${s.max} karakter).`);
    if (s.type === 'sel' && !s.opts.some((o) => o[0] === v)) E.push(`${s.label}: geçersiz seçenek.`);
  }
  if (p.minAge < HARD.minAgeFloor) E.push(`Asgari yaş ${HARD.minAgeFloor}'in altına indirilemez.`);
  if (p.maxAge <= p.minAge) E.push('Azami yaş, asgari yaştan büyük olmalı.');
  if (!p.impW || ![1, 2, 3].every((i) => Number.isInteger(p.impW[i]) && p.impW[i] >= 0 && p.impW[i] <= 20)) E.push('Önem ağırlıkları 0–20 arası tam sayı olmalı.');
  else if (!(p.impW[1] <= p.impW[2] && p.impW[2] <= p.impW[3])) E.push('Önem ağırlıkları artan sırada olmalı (az ≤ önemli ≤ zorunlu).');
  if (!p.critW || !Object.keys(CRIT_LABEL).every((k) => Number.isInteger(p.critW[k]) && p.critW[k] >= 0 && p.critW[k] <= 10)) E.push('Ölçüt ağırlıkları 0–10 arası tam sayı olmalı.');
  if (!Array.isArray(p.eduLevels) || p.eduLevels.length < 2 || p.eduLevels.length > 12 || p.eduLevels.some((x) => typeof x !== 'string' || !x.trim() || x.length > 40)) E.push('Eğitim düzeyleri: 2–12 adet, boş olmayan metin.');
  if (!Array.isArray(p.questions) || p.questions.length > 30) E.push('Soru listesi geçersiz (en çok 30).');
  else {
    const ids = new Set();
    for (const q of p.questions) {
      if (!q || typeof q.id !== 'string' || !/^q_[a-z0-9_]{1,30}$/.test(q.id) || ids.has(q.id)) { E.push('Soru kimlikleri "q_xxx" biçiminde ve benzersiz olmalı.'); continue; }
      ids.add(q.id);
      if (typeof q.label !== 'string' || !q.label.trim() || q.label.length > 200) E.push('Soru metni boş olamaz.');
      if (!Array.isArray(q.opts) || q.opts.length < 2 || q.opts.length > 10 || q.opts.some((o) => typeof o !== 'string' || !o.trim() || o.length > 60)) E.push(`“${String(q.label).slice(0, 40)}” sorusu 2–10 seçenek içermeli.`);
      if (!Number.isInteger(q.weight) || q.weight < 0 || q.weight > 10) E.push('Soru ağırlığı 0–10 arası olmalı.');
      if (typeof q.sensitive !== 'boolean' || typeof q.enabled !== 'boolean') E.push('Soru bayrakları geçersiz.');
    }
  }
  if (typeof p.consentText !== 'string' || p.consentText.trim().length < 40 || p.consentText.length > 3000) E.push('Açık rıza metni 40–3000 karakter olmalı.');
  if (typeof p.consentVersion !== 'string' || !p.consentVersion.trim() || p.consentVersion.length > 20) E.push('Rıza metni sürümü geçersiz.');
  return E;
}

/* ---------- Aday verisi (istemciden gelen) doğrulama / temizleme ---------- */
const enumOf = (opts, v, dflt) => (opts.includes(v) ? v : dflt);
function sanitizeApplicant(inp, P, base) {
  const E = [];
  const s = (v, max) => String(v ?? '').trim().slice(0, max);
  const o = JSON.parse(JSON.stringify(base));
  inp = inp && typeof inp === 'object' ? inp : {};
  o.ad = s(inp.ad, 60); o.soyad = s(inp.soyad, 60);
  o.kimNo = String(inp.kimNo ?? '').replace(/\D/g, '').slice(0, 11);
  o.dogum = s(inp.dogum, 10); if (o.dogum && !isDate(o.dogum)) { E.push('Doğum tarihi geçersiz.'); o.dogum = ''; }
  o.cins = enumOf(['K', 'E'], inp.cins, '');
  o.telefon = s(inp.telefon, 20).replace(/[^\d+\s()-]/g, '');
  o.eposta = s(inp.eposta, 120);
  o.il = s(inp.il, 40); o.ilce = s(inp.ilce, 40);
  o.medeni = enumOf(MEDENI.map((x) => x[0]), inp.medeni, 'hic');
  o.cocuk = Math.min(12, Math.max(0, parseInt(inp.cocuk, 10) || 0));
  o.edu = String(Math.min(P.eduLevels.length - 1, Math.max(0, parseInt(inp.edu, 10) || 0)));
  o.is = enumOf(ISDURUM.map((x) => x[0]), inp.is, 'calisiyor');
  o.meslek = s(inp.meslek, 60); o.tanitim = s(inp.tanitim, 300); o.notes = s(inp.notes, 500);
  const pr = inp.prefs && typeof inp.prefs === 'object' ? inp.prefs : {};
  const imp = (v, d) => { const n = parseInt(v, 10); return n >= 0 && n <= 3 ? n : d; };
  o.prefs = {
    ageMin: Math.min(99, Math.max(18, parseInt(pr.ageMin, 10) || 18)), ageMax: Math.min(99, Math.max(18, parseInt(pr.ageMax, 10) || 99)),
    ageImp: imp(pr.ageImp, 1), locMode: enumOf(['fark_etmez', 'ayni_il'], pr.locMode, 'fark_etmez'), locImp: imp(pr.locImp, 1),
    eduMin: String(Math.min(P.eduLevels.length - 1, Math.max(0, parseInt(pr.eduMin, 10) || 0))), eduImp: imp(pr.eduImp, 1),
    maritalOk: (Array.isArray(pr.maritalOk) ? pr.maritalOk : []).filter((x) => MEDENI.some((m) => m[0] === x)), maritalImp: imp(pr.maritalImp, 1),
    kidsOk: !!pr.kidsOk, kidsImp: imp(pr.kidsImp, 1)
  };
  if (o.prefs.ageMin > o.prefs.ageMax) E.push('Tercih edilen yaş aralığı geçersiz (en az > en çok).');
  o.qa = {};
  const qa = inp.qa && typeof inp.qa === 'object' ? inp.qa : {};
  for (const q of P.questions.filter((x) => x.enabled)) {
    const c = qa[q.id]; if (!c || typeof c !== 'object') continue;
    o.qa[q.id] = { ans: q.opts.includes(c.ans) ? c.ans : '', accept: (Array.isArray(c.accept) ? c.accept : []).filter((x) => q.opts.includes(x)), imp: String(imp(c.imp, 1)) };
  }
  const c = inp.consent && typeof inp.consent === 'object' ? inp.consent : {};
  const had = base.consent && base.consent.data;
  o.consent = { data: !!c.data, sensitive: !!c.sensitive, contactShare: !!c.contactShare, ts: base.consent.ts, version: base.consent.version };
  if (o.consent.data && !had) { o.consent.ts = Date.now(); o.consent.version = P.consentVersion; }
  if (!o.consent.data) { o.consent.sensitive = false; o.consent.contactShare = false; }
  const k = inp.checks && typeof inp.checks === 'object' ? inp.checks : {};
  o.checks = {};
  for (const f of ['inPerson', 'idVerified', 'protective', 'protectiveFound', 'voluntary', 'notMarried']) o.checks[f] = !!k[f];
  return { data: o, errors: E };
}

const newApplicantData = (P) => ({
  ad: '', soyad: '', kimNo: '', dogum: '', cins: '', telefon: '', eposta: '', il: '', ilce: '', medeni: 'hic', cocuk: 0, edu: '4', is: 'calisiyor', meslek: '', tanitim: '',
  prefs: { ageMin: 21, ageMax: 35, ageImp: 2, locMode: 'fark_etmez', locImp: 1, eduMin: '2', eduImp: 1, maritalOk: ['hic'], maritalImp: 1, kidsOk: true, kidsImp: 1 },
  qa: {}, consent: { data: false, sensitive: false, contactShare: false, ts: null, version: P.consentVersion },
  checks: { inPerson: false, idVerified: false, protective: false, protectiveFound: false, voluntary: false, notMarried: false },
  safetyBlock: false, safetyReason: '', cooldownUntil: '', notes: '', history: [], demo: false
});

/* ---------- Aday uygunluğu: havuza alınabilir mi? ---------- */
function checkApplicant(a, P, today) {
  const F = []; const add = (l, id, t) => F.push({ lvl: l, id, txt: t });
  if (!a.ad.trim() || !a.soyad.trim()) add('eksik', 'K-AD', 'Ad ve soyad eksik.');
  if (!a.kimNo) add('eksik', 'K-KIMLIK', 'T.C. kimlik numarası eksik.'); else if (!validTC(a.kimNo)) add('engel', 'K-TC', 'T.C. kimlik numarası geçersiz.');
  if (!a.dogum) add('eksik', 'K-DOGUM', 'Doğum tarihi eksik.');
  else {
    const y = ageOn(a.dogum, today);
    if (y < HARD.minAgeFloor) add('engel', 'K-YAS-SABIT', `${y} yaşında; ${HARD.minAgeFloor} yaşından küçükler sisteme alınamaz.`);
    else if (y < P.minAge) add('engel', 'K-YAS', `${y} yaşında; asgari başvuru yaşı ${P.minAge}.`);
    else if (y > P.maxAge) add('engel', 'K-YAS-US', `${y} yaşında; azami başvuru yaşı ${P.maxAge}.`);
  }
  if (!a.cins) add('eksik', 'K-CINS', 'Cinsiyet bilgisi eksik.');
  if (!a.il.trim()) add('eksik', 'K-IL', 'Yaşanılan il eksik.');
  if (!a.telefon.trim()) add('eksik', 'K-TEL', 'İletişim telefonu eksik (yalnız görevli görür).');
  if (!a.tanitim.trim()) add('eksik', 'K-TANITIM', 'Kısa tanıtım metni eksik (karşı tarafa sunulacak özet).');
  if (!a.checks.notMarried) add('eksik', 'K-MEDENI', 'Mevcut bir evliliği olmadığı beyanı alınmadı.');
  if (!a.consent.data) add('eksik', 'K-RIZA', 'Açık rıza metni onaylanmadı.');
  if (!a.checks.voluntary) add('eksik', 'K-GONULLU', 'Başvurunun kendi isteğiyle, baskı olmadan yapıldığı teyit edilmedi.');
  if (!a.checks.inPerson) add('eksik', 'K-SAHSEN', 'Başvuru sahibinin şahsen başvurduğu teyit edilmedi (başkası adına başvuru kabul edilmez).');
  if (!a.checks.idVerified) add('eksik', 'K-ID', 'Kimlik belgesi görevli tarafından doğrulanmadı.');
  if (!a.checks.protective) add('eksik', 'K-KORUMA', 'Koruma/uzaklaştırma kararı ve güvenlik sorgusu yapıldığı işaretlenmedi.');
  if (a.checks.protectiveFound) add('engel', 'K-KORUMA-VAR', 'Koruma/uzaklaştırma kararı veya güvenlik engeli bulundu; havuza alınamaz.');
  if (a.safetyBlock) add('engel', 'K-GUVENLIK', 'Güvenlik engeli kaydı var.');
  if (P.questions.some((q) => q.enabled && q.sensitive) && !a.consent.sensitive) add('bilgi', 'K-HASSAS', 'Hassas (özel nitelikli) sorulara açık rıza verilmediği için bu sorular eşleştirmede kullanılmayacak.');
  const lv = F.map((f) => f.lvl);
  return { findings: F, status: lv.includes('engel') ? 'ENGEL' : lv.includes('eksik') ? 'EKSIK' : 'UYGUN' };
}

/* =====================================================================
   EŞLEŞTİRME MOTORU
   `a` = düz aday nesnesi: { id, status, ...veri alanları }
   ictx = { active: Map(id→aktif tanıştırma sayısı), blocked: Set("x|y"), pairs: Set("x|y") }  (x<y sıralı anahtar)
   ===================================================================== */
const pkey = (x, y) => (x < y ? x + '|' + y : y + '|' + x);
function critList(P, a, b) {
  const L = Object.keys(CRIT_LABEL).map((k) => ({ k, label: CRIT_LABEL[k], w: P.critW[k] }));
  const sens = a.consent.sensitive && b.consent.sensitive;
  P.questions.filter((q) => q.enabled && (!q.sensitive || sens)).forEach((q) => L.push({ k: 'q:' + q.id, label: q.label, w: q.weight, q }));
  return L;
}
function satisfy(a, b, c, P, today) {
  const pr = a.prefs;
  if (c.k === 'age') {
    const ba = ageOn(b.dogum, today); let s;
    if (ba >= pr.ageMin && ba <= pr.ageMax) s = 1;
    else { const d = ba < pr.ageMin ? pr.ageMin - ba : ba - pr.ageMax; s = Math.max(0, 1 - d / P.ageDecayYears); }
    return { s, imp: +pr.ageImp, note: `${ba} yaş (istenen ${pr.ageMin}–${pr.ageMax})` };
  }
  if (c.k === 'loc') {
    const s = pr.locMode === 'fark_etmez' ? 1 : (b.il.trim().toLowerCase() === a.il.trim().toLowerCase() ? 1 : 0);
    return { s, imp: +pr.locImp, note: pr.locMode === 'fark_etmez' ? 'fark etmez' : `${b.il} (aynı il ister)` };
  }
  if (c.k === 'edu') {
    const d = (+b.edu) - (+pr.eduMin); const s = d >= 0 ? 1 : Math.max(0, 1 + d / 3);
    return { s, imp: +pr.eduImp, note: `${P.eduLevels[+b.edu] || '?'} (en az ${P.eduLevels[+pr.eduMin] || '?'})` };
  }
  if (c.k === 'marital') { const s = pr.maritalOk.includes(b.medeni) ? 1 : 0; return { s, imp: +pr.maritalImp, note: (MEDENI.find((x) => x[0] === b.medeni) || [0, b.medeni])[1] }; }
  if (c.k === 'kids') { const s = (b.cocuk > 0 && !pr.kidsOk) ? 0 : 1; return { s, imp: +pr.kidsImp, note: b.cocuk > 0 ? `${b.cocuk} çocuğu var` : 'çocuğu yok' }; }
  const q = c.q, mine = a.qa[q.id], theirs = b.qa[q.id];
  if (!mine || !mine.accept || mine.accept.length === 0) return { s: 1, imp: 0, note: 'tercih belirtilmemiş' };
  if (!theirs || !theirs.ans) return { s: 0.5, imp: +mine.imp, note: 'yanıt yok' };
  return { s: mine.accept.includes(theirs.ans) ? 1 : 0, imp: +mine.imp, note: theirs.ans };
}
function scoreDir(a, b, P, today) {
  let num = 0, den = 0; const why = [];
  for (const c of critList(P, a, b)) {
    const r = satisfy(a, b, c, P, today);
    if (r.imp === 3 && r.s < 1) return { hard: true, why: [{ label: c.label, s: r.s, imp: r.imp, note: r.note }] };
    const w = c.w * (r.imp === 0 ? 0 : P.impW[r.imp]); num += w * r.s; den += w;
    why.push({ label: c.label, s: r.s, imp: r.imp, note: r.note });
  }
  return { hard: false, score: den ? num / den * 100 : 100, why };
}
function poolable(x, P, today, ictx) {
  return x.status === 'aktif' && !x.safetyBlock && x.consent.data && (!x.cooldownUntil || today >= x.cooldownUntil) && (ictx.active.get(x.id) || 0) < P.maxActiveIntros;
}
function pairOk(a, b, P, today, ictx) {
  if (a.id === b.id) return 'aynı kişi';
  if (!poolable(a, P, today, ictx) || !poolable(b, P, today, ictx)) return 'havuzda değil';
  if (P.matchGender === 'karsi' && a.cins === b.cins) return 'cinsiyet kuralı';
  const k = pkey(a.id, b.id);
  if (ictx.blocked.has(k)) return 'daha önce reddedilmiş/engellenmiş';
  if (ictx.pairs.has(k)) return 'daha önce önerilmiş';
  return null;
}
function scorePair(a, b, P, today) {
  const ab = scoreDir(a, b, P, today), ba = scoreDir(b, a, P, today);
  if (ab.hard || ba.hard) return { hard: true };
  const s1 = ab.score, s2 = ba.score;
  const s = P.aggregator === 'min' ? Math.min(s1, s2) : P.aggregator === 'avg' ? (s1 + s2) / 2 : Math.sqrt(s1 * s2);
  return { hard: false, score: s, sa: s1, sb: s2, whyA: ab.why, whyB: ba.why };
}
function runMatching(all, P, today, ictx) {
  const pool = all.filter((x) => poolable(x, P, today, ictx));
  const cand = []; let considered = 0;
  for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) {
    const a = pool[i], b = pool[j]; if (pairOk(a, b, P, today, ictx)) continue; considered++;
    const r = scorePair(a, b, P, today); if (r.hard || r.score < P.minScore) continue;
    cand.push({ a: a.id, b: b.id, score: Math.round(r.score * 10) / 10, sa: Math.round(r.sa), sb: Math.round(r.sb) });
  }
  const per = {}; cand.forEach((p) => { (per[p.a] = per[p.a] || []).push(p); (per[p.b] = per[p.b] || []).push(p); });
  const keep = new Set(); Object.values(per).forEach((L) => L.sort((x, y) => y.score - x.score).slice(0, P.topN).forEach((p) => keep.add(p.a + '|' + p.b)));
  const suggestions = cand.filter((p) => keep.has(p.a + '|' + p.b)).sort((x, y) => y.score - x.score);
  const withAny = new Set(); suggestions.forEach((p) => { withAny.add(p.a); withAny.add(p.b); });
  return { pool: pool.length, considered, suggestions, noMatch: pool.filter((x) => !withAny.has(x.id)).map((x) => x.id) };
}

module.exports = {
  HARD, IMP, MEDENI, ISDURUM, CRIT_LABEL, ST_A, ACTIVE_INTRO, PARAM_SCHEMA, DEFAULT_PARAMS,
  todayStr, dStr, addDays, daysBetween, ageOn, isDate, validTC,
  validateParams, sanitizeApplicant, newApplicantData, checkApplicant,
  critList, satisfy, scoreDir, scorePair, poolable, pairOk, runMatching, pkey
};
