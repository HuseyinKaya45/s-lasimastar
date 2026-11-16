'use strict';
/**
 * Merkezî eşleştirme için ortak mantık (birim ve otorite tarafı):
 *  - toProfile: bir adaydan TAKMA ADLI profil üretir (ad, soyad, T.C. no, telefon, e-posta, ilçe, iç notlar ASLA dahil değildir)
 *  - sanitizeProfile: gelen profili otorite parametrelerine göre doğrular/temizler
 *  - validateResponses / validateIntroPackage: gelen paket içeriğini sıkı biçimde doğrular
 */
const E = require('./engine');

const REF_RE = /^[A-Za-z0-9._-]{1,40}$/;
const INTRO_RE = /^C-\d{4}-\d{4,}$/;

/** a: düz aday nesnesi (şifresi çözülmüş). available: bu an yeni öneri alabilir mi? */
function toProfile(a, available) {
  return {
    ref: a.id, available: !!available,
    cins: a.cins, dogum: a.dogum ? a.dogum.slice(0, 7) + '-15' : '', // doğum günü gizlenir (ay düzeyinde)
    il: a.il, edu: a.edu, medeni: a.medeni, cocuk: a.cocuk, is: a.is, meslek: a.meslek, tanitim: a.tanitim,
    prefs: a.prefs, qa: a.qa, sens: !!(a.consent && a.consent.sensitive)
  };
}

/** Başarılıysa { profile } , değilse { error }. P: otoritenin parametreleri. */
function sanitizeProfile(raw, P, today) {
  if (!raw || typeof raw !== 'object') return { error: 'Profil nesnesi geçersiz.' };
  if (typeof raw.ref !== 'string' || !REF_RE.test(raw.ref)) return { error: 'Referans geçersiz.' };
  const base = E.newApplicantData(P);
  const { data, errors } = E.sanitizeApplicant({ cins: raw.cins, dogum: raw.dogum, il: raw.il, edu: raw.edu, medeni: raw.medeni, cocuk: raw.cocuk, is: raw.is, meslek: raw.meslek, tanitim: raw.tanitim, prefs: raw.prefs, qa: raw.qa, consent: { data: true, sensitive: !!raw.sens } }, P, base);
  if (errors.length) return { error: errors.join(' ') };
  if (!data.cins || !data.dogum || !data.il) return { error: 'Zorunlu alan eksik (cinsiyet, doğum, il).' };
  const age = E.ageOn(data.dogum, today);
  if (age < E.HARD.minAgeFloor) return { error: `${age} yaşında; ${E.HARD.minAgeFloor} yaşından küçükler merkezî havuza alınamaz.` };
  if (age < P.minAge || age > P.maxAge) return { error: `Yaş (${age}) başvuru aralığı dışında.` };
  if (+raw.edu !== +data.edu) return { error: 'Eğitim düzeyi otorite tanımlarında yok.' };
  return {
    profile: {
      ref: raw.ref, available: raw.available === true,
      cins: data.cins, dogum: data.dogum, il: data.il, edu: data.edu, medeni: data.medeni, cocuk: data.cocuk, is: data.is, meslek: data.meslek, tanitim: data.tanitim,
      prefs: data.prefs, qa: data.qa, sens: !!data.consent.sensitive
    }
  };
}

/** Motorun beklediği düz nesne. key = "BİRİM|ref" */
function toFlat(profile, unit, available) {
  return {
    ...profile, id: unit + '|' + profile.ref, unit, ref: profile.ref,
    status: available ? 'aktif' : 'beklemede', ad: '', soyad: '', kimNo: '', telefon: '',
    consent: { data: true, sensitive: !!profile.sens, contactShare: false, centralShare: true },
    safetyBlock: false, cooldownUntil: ''
  };
}

function validateResponses(list) {
  const out = [], bad = [];
  for (const r of Array.isArray(list) ? list.slice(0, 5000) : []) {
    const ok = r && typeof r === 'object' && INTRO_RE.test(r.intro) && typeof r.ref === 'string' && REF_RE.test(r.ref) && Number.isFinite(r.ts)
      && ((r.kind === 'decision' && ['kabul', 'ret'].includes(r.dec)) || (r.kind === 'outcome' && ['devam', 'bitti', 'karar', 'sikayet'].includes(r.out)));
    if (ok) out.push({ intro: r.intro, ref: r.ref, kind: r.kind, dec: r.dec, out: r.out, ts: r.ts, method: String(r.method || '').slice(0, 60) });
    else bad.push(r && r.intro ? String(r.intro).slice(0, 30) : '?');
  }
  return { responses: out, rejected: bad };
}

const CARD_KEYS = ['age', 'il', 'edu', 'meslek', 'medeni', 'cocuk', 'tanitim', 'unitName'];
/** Otoriteden birime giden öneri paketi satırlarını doğrular (birim tarafı, güvenmeden). */
function validateIntroPackage(payload) {
  const out = [], bad = [];
  for (const i of Array.isArray(payload && payload.intros) ? payload.intros.slice(0, 5000) : []) {
    const ok = i && INTRO_RE.test(i.id) && typeof i.ref === 'string' && REF_RE.test(i.ref) && ['a', 'b'].includes(i.side) && Number.isFinite(i.score)
      && typeof i.status === 'string' && i.status.length < 30 && i.other && typeof i.other === 'object';
    if (!ok) { bad.push(i && i.id ? String(i.id).slice(0, 30) : '?'); continue; }
    const other = {}; for (const k of CARD_KEYS) other[k] = typeof i.other[k] === 'number' ? i.other[k] : String(i.other[k] ?? '').slice(0, k === 'tanitim' ? 300 : 80);
    const coord = i.coord && typeof i.coord === 'object' ? { unitName: String(i.coord.unitName || '').slice(0, 80), contact: String(i.coord.contact || '').slice(0, 120) } : null;
    const meeting = i.meeting && typeof i.meeting === 'object' ? { date: String(i.meeting.date || '').slice(0, 10), time: String(i.meeting.time || '').slice(0, 5), place: String(i.meeting.place || '').slice(0, 200) } : null;
    out.push({ id: i.id, ref: i.ref, side: i.side, score: Math.round(i.score), status: i.status, other, coord, meeting });
  }
  return { intros: out, rejected: bad };
}

module.exports = { REF_RE, INTRO_RE, toProfile, sanitizeProfile, toFlat, validateResponses, validateIntroPackage };
