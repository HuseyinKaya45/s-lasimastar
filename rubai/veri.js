// ================= VERİ: Rubâî Mücerred Fiil ve Mezîdi (الفِعْلُ الرُّبَاعِيُّ المُجَرَّدُ وَمَزِيدُهُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "الرُّبَاعِيُّ المُجَرَّدُ", tr: "Rubâî mücerred" }, nasb: { ar: "الرُّبَاعِيُّ المَزِيدُ", tr: "Rubâî mezîd" }, mi: { ar: "الزَّائِدُ", tr: "Ziyade harf" },
  mz: { ar: "", tr: "Başka fiil" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// ---------- Çekim motoru ----------
// 14 hücre: هو هما هم | هي هما هن | أنتَ أنتما أنتم | أنتِ أنتما أنتنّ | أنا نحن
var PER = ["هُوَ", "هُمَا", "هُمْ", "هِيَ", "هُمَا", "هُنَّ", "أَنْتَ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتِ", "أَنْتُمَا", "أَنْتُنَّ", "أَنَا", "نَحْنُ"];
var PER_TR = ["o (erkek)", "o ikisi (erkek)", "onlar (erkek)", "o (kadın)", "o ikisi (kadın)", "onlar (kadın)", "sen (erkek)", "siz ikiniz (erkek)", "siz (erkek)", "sen (kadın)", "siz ikiniz (kadın)", "siz (kadın)", "ben", "biz"];
var EPER = ["أَنْتَ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتِ", "أَنْتُمَا", "أَنْتُنَّ"];
var MSUF = ["َ", "َا", "ُوا", "َتْ", "َتَا", "ْنَ", "ْتَ", "ْتُمَا", "ْتُمْ", "ْتِ", "ْتُمَا", "ْتُنَّ", "ْتُ", "ْنَا"];
var UPRE = ["ي", "ي", "ي", "ت", "ت", "ي", "ت", "ت", "ت", "ت", "ت", "ت", "أ", "ن"];
var USUF = ["ُ", "َانِ", "ُونَ", "ُ", "َانِ", "ْنَ", "ُ", "َانِ", "ُونَ", "ِينَ", "َانِ", "ْنَ", "ُ", "ُ"];
var ESUF = ["ْ", "َا", "ُوا", "ِي", "َا", "ْنَ"];
// Fiil: mâzi, mâzi gövdesi (şeddeli: ünlüden önce), çözülmüş gövde (sâkin zamirden önce), muzâri ön ek harekesi, muzâri gövdesi, çözülmüş muzâri gövdesi, emir gövdesi, çözülmüş emir gövdesi, masdar, Türkçe, vezin (1 فَعْلَلَ, 2 تَفَعْلَلَ, 3 اِفْعَنْلَلَ, 4 اِفْعَلَلَّ)
function NV(m, ms, msp, uv, ub, ubs, eb, ebs, mas, tr, bab) { return { m: m, ms: ms, msp: msp || ms, uv: uv, ub: ub, ubs: ubs || ub, eb: eb, ebs: ebs || eb, mas: mas, tr: tr, bab: bab, ig: bab === 4 }; }
function R1(m, s, u, mas, tr) { return NV(m, s, 0, "ُ", u, 0, u, 0, mas, tr, 1); }
function R2(m, s, mas, tr) { return NV(m, s, 0, "َ", s, 0, s, 0, mas, tr, 2); }
var VERBS = [
  R1("دَحْرَجَ", "دَحْرَج", "دَحْرِج", "دَحْرَجَةٌ", "yuvarlamak"), R1("زَلْزَلَ", "زَلْزَل", "زَلْزِل", "زَلْزَلَةٌ / زِلْزَالٌ", "sarsmak"),
  R1("وَسْوَسَ", "وَسْوَس", "وَسْوِس", "وَسْوَسَةٌ / وِسْوَاسٌ", "vesvese vermek"), R1("طَمْأَنَ", "طَمْأَن", "طَمْئِن", "طَمْأَنَةٌ", "yatıştırmak, gönlünü rahatlatmak"),
  R1("حَرْجَمَ", "حَرْجَم", "حَرْجِم", "حَرْجَمَةٌ", "(sürüyü) toplamak"), R1("تَرْجَمَ", "تَرْجَم", "تَرْجِم", "تَرْجَمَةٌ", "tercüme etmek"),
  R1("بَسْمَلَ", "بَسْمَل", "بَسْمِل", "بَسْمَلَةٌ", "besmele çekmek"), R1("سَيْطَرَ", "سَيْطَر", "سَيْطِر", "سَيْطَرَةٌ", "hâkim olmak"),
  R1("غَرْغَرَ", "غَرْغَر", "غَرْغِر", "غَرْغَرَةٌ", "gargara yapmak"), R1("زَخْرَفَ", "زَخْرَف", "زَخْرِف", "زَخْرَفَةٌ", "süslemek"),
  R1("هَرْوَلَ", "هَرْوَل", "هَرْوِل", "هَرْوَلَةٌ", "koşar adım yürümek"), R1("بَعْثَرَ", "بَعْثَر", "بَعْثِر", "بَعْثَرَةٌ", "dağıtmak, altüst etmek"),
  R2("تَدَحْرَجَ", "تَدَحْرَج", "تَدَحْرُجٌ", "yuvarlanmak"), R2("تَزَلْزَلَ", "تَزَلْزَل", "تَزَلْزُلٌ", "sarsılmak"),
  R2("تَلَعْثَمَ", "تَلَعْثَم", "تَلَعْثُمٌ", "kekelemek"), R2("تَفَلْسَفَ", "تَفَلْسَف", "تَفَلْسُفٌ", "felsefe yapmak"),
  R2("تَمَذْهَبَ", "تَمَذْهَب", "تَمَذْهُبٌ", "bir mezhebe girmek"), R2("تَبَعْثَرَ", "تَبَعْثَر", "تَبَعْثُرٌ", "dağılmak"),
  NV("اِحْرَنْجَمَ", "اِحْرَنْجَم", 0, "َ", "حْرَنْجِم", 0, "اِحْرَنْجِم", 0, "اِحْرِنْجَامٌ", "toplanmak, kümelenmek", 3),
  NV("اِفْرَنْقَعَ", "اِفْرَنْقَع", 0, "َ", "فْرَنْقِع", 0, "اِفْرَنْقِع", 0, "اِفْرِنْقَاعٌ", "dağılmak", 3),
  NV("اِطْمَأَنَّ", "اِطْمَأَنّ", "اِطْمَأْنَن", "َ", "طْمَئِنّ", "طْمَأْنِن", "اِطْمَئِنّ", "اِطْمَأْنِن", "اِطْمِئْنَانٌ", "huzura ermek, gönlü rahatlamak", 4),
  NV("اِقْشَعَرَّ", "اِقْشَعَرّ", "اِقْشَعْرَر", "َ", "قْشَعِرّ", "قْشَعْرِر", "اِقْشَعِرّ", "اِقْشَعْرِر", "اِقْشِعْرَارٌ", "ürpermek", 4),
  NV("اِشْمَأَزَّ", "اِشْمَأَزّ", "اِشْمَأْزَز", "َ", "شْمَئِزّ", "شْمَأْزِز", "اِشْمَئِزّ", "اِشْمَأْزِز", "اِشْمِئْزَازٌ", "tiksinmek", 4),
  NV("اِضْمَحَلَّ", "اِضْمَحَلّ", "اِضْمَحْلَل", "َ", "ضْمَحِلّ", "ضْمَحْلِل", "اِضْمَحِلّ", "اِضْمَحْلِل", "اِضْمِحْلَالٌ", "yok olup gitmek", 4)
];
function V(m) { return VERBS.filter(function (v) { return v.m === m; })[0]; }
function SUL_V(v) { return v.bab === 1; }
function TUR(v) { return "masdar: " + v.mas; }
function NN(s) { return s.replace(/نْن/g, "نّ"); }
function sak(s) { return s.charAt(0) === "ْ"; }
function MAZ(v) { return MSUF.map(function (s) { return NN((sak(s) ? v.msp : v.ms) + s); }); }
function MUZ(v) { return USUF.map(function (s, i) { return NN(UPRE[i] + v.uv + (sak(s) ? v.ubs : v.ub) + s); }); }
function EMR(v) { return ESUF.map(function (s, i) { return i === 0 && v.ig ? v.eb + "َ" : NN((sak(s) ? v.ebs : v.eb) + s); }); }
function CONJ(v, t) { return t === "m" ? MAZ(v) : t === "u" ? MUZ(v) : EMR(v); }
// Sonu renkli yazım: gövdenin son harfi + ek renklenir
function lastLetterAt(s) { var i = s.length - 1; while (i > 0 && /[ً-ْٰ]/.test(s[i])) i--; return i; }
function colorWord(w, stemLen) { var i = lastLetterAt(w.slice(0, stemLen)); return w.slice(0, i) + '<b class="cend">' + w.slice(i) + '</b>'; }
function CONJ_HTML(v, t) {
  var c = CONJ(v, t);
  return c.map(function (w, i) {
    var stem = t === "m" ? (sak(MSUF[i]) ? v.msp : v.ms) : t === "u" ? UPRE[i] + v.uv + (sak(USUF[i]) ? v.ubs : v.ub) : (sak(ESUF[i]) && !(i === 0 && v.ig) ? v.ebs : v.eb);
    return colorWord(w, Math.min(stem.length, w.length));
  });
}
// son harekeyi (esre ↔ üstün) değiştir: tipik yanlış
function swapV(s) { var a = s.lastIndexOf("ِ"), b = s.lastIndexOf("َ"), i = Math.max(a, b); if (i < 0) return s; return s.slice(0, i) + (i === a ? "َ" : "ِ") + s.slice(i + 1); }
// Tablo şaşırtıcıları (sık yapılan yanlışlar)
function DIST(v, t) {
  var d, wp = v.uv === "ُ" ? "َ" : "ُ";
  if (t === "m") d = [v.ms + "ُو", v.msp + "ْتُوا", v.ms + "َتُ", v.ms + "َتْنَ"];
  else if (t === "u") d = ["ي" + wp + v.ub + "ُ", "ي" + v.uv + swapV(v.ub) + "ُ", "ي" + v.uv + v.ub + "ُوا"];
  else d = [swapV(v.eb) + (v.ig ? "َ" : "ْ"), v.eb + "ُونَ", v.bab === 2 ? "تَ" + v.eb + "ْ" : v.bab === 1 ? "اُ" + v.eb + "ْ" : v.eb.replace(/^اِ/, "") + (v.ig ? "َ" : "ْ")];
  var ok = CONJ(v, t);
  return d.map(NN).filter(function (x, i, a) { return ok.indexOf(x) < 0 && a.indexOf(x) === i; });
}
var BAB = { 1: ["فَعْلَلَ – يُفَعْلِلُ", "Rubâî mücerred · فَعْلَلَ"], 2: ["تَفَعْلَلَ – يَتَفَعْلَلُ", "Mezîd, bir harfle · تَفَعْلَلَ (huması)"], 3: ["اِفْعَنْلَلَ – يَفْعَنْلِلُ", "Mezîd, iki harfle · اِفْعَنْلَلَ (südâsî)"], 4: ["اِفْعَلَلَّ – يَفْعَلِلُّ", "Mezîd, iki harfle · اِفْعَلَلَّ (südâsî)"] };
// Kural notu: fiile göre canlı örneklerle
function NOTE(v, t) {
  var c = CONJ(v, t);
  if (t === "m") return v.ig ? "Son harf şeddelidir. Ünlüyle başlayan zamirde şedde kalır (" + c[2] + "، " + c[3] + "); sâkin zamirde çözülür (" + c[12] + "، " + c[5] + ")." : (v.bab === 1 ? "Sahih fiil gibi çekilir: " : v.bab === 2 ? "Başındaki تَ dışında فَعْلَلَ gibi çekilir: " : "Vasıl elifi ve ن ile, sahih fiil gibi çekilir: ") + c[2] + "، " + c[5] + "، " + c[12] + ".";
  if (t === "u") return v.bab === 1 ? "Harf-i muzâraat ötreli (يُـ), sondan önceki harf esreli: " + c[0] + "، " + c[2] + "، " + c[9] + "." : v.bab === 2 ? "Harf-i muzâraat üstünlü (يَـ), sondan önceki harf üstün kalır: " + c[0] + "، " + c[2] + "، " + c[9] + "." : v.bab === 3 ? "Vasıl elifi düşer; يَـ üstünlü, sondan önceki harf esreli: " + c[0] + "، " + c[2] + "." : "Şedde kalır: " + c[0] + "، " + c[2] + "، " + c[9] + "; هُنَّ ve أَنْتُنَّ'de çözülür: " + c[5] + ".";
  return v.bab === 1 ? "Harf-i muzâraat atılır, son harf cezmlenir: " + c[0] + "، " + c[2] + "، " + c[3] + "." : v.bab === 2 ? "Emir " + c[0] + " (başa ikinci bir تَ gelmez): " + c[2] + "، " + c[3] + "." : v.bab === 3 ? "Vasıl elifiyle başlar: " + c[0] + "، " + c[2] + "، " + c[3] + "." : "Şeddeli son harf üstün okunur: " + c[0] + "; أَنْتُنَّ: " + c[5] + ".";
}

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
// Combo: her yuvada [doğru, y1, y2] → karıştırılmış seçenek
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CB2(q, slots, mid, tail, i, tr, why) {
  var parts = [], ok = [];
  slots.forEach(function (s, si) { var r = ROT(s, i + si); parts.push(r); ok.push(r.a); if (si < slots.length - 1 && mid) parts.push(mid); });
  if (tail) parts.push(tail);
  return { q: q, p: parts, ok: [ok], tr: tr, why: why };
}
// Serbest combo: metin ve [doğru, y1, y2] yuvaları sırayla
function CBP(parts, i, tr, why) {
  var p = [], ok = [], si = 0;
  parts.forEach(function (x) { if (typeof x === "string") p.push(x); else { var r = ROT(x, i + si++); p.push(r); ok.push(r.a); } });
  return { q: "", p: p, ok: [ok], tr: tr, why: why };
}
// Zamire göre doğru biçim
function autoPick(v, t, pi, tail, n) {
  var c = CONJ(v, t), f = c[pi], d = DIST(v, t).concat(c).filter(function (x) { return x !== f; });
  var w1 = d[n % Math.min(2, d.length)], w2 = d.filter(function (x) { return x !== w1; })[(n + 1) % 3];
  var per = t === "e" ? EPER[pi] : PER[pi];
  return P("(" + per + ") ___ " + (tail || ""), f, w1, w2, n, "", per + ": " + f + ".");
}
function TBL(m, t) { return { v: m, t: t }; }
// Kitaptaki tablo: تَصْرِيفُ الرُّبَاعِيِّ وَمَزِيدِهِ
var MZH = ["Vezin", "Mâzi", "Muzâri", "Emir", "Masdar"];
var MZT = [
  ["فَعْلَلَ", "زَلْزَلَ", "يُزَلْزِلُ", "زَلْزِلْ", "زَلْزَلَةٌ / زِلْزَالٌ"], ["تَفَعْلَلَ", "تَدَحْرَجَ", "يَتَدَحْرَجُ", "تَدَحْرَجْ", "تَدَحْرُجٌ"],
  ["اِفْعَنْلَلَ", "اِحْرَنْجَمَ", "يَحْرَنْجِمُ", "اِحْرَنْجِمْ", "اِحْرِنْجَامٌ"], ["اِفْعَلَلَّ", "اِطْمَأَنَّ", "يَطْمَئِنُّ", "اِطْمَئِنَّ", "اِطْمِئْنَانٌ"]
];
// 4. alıştırma: boş tablo (verilen sütun, sonra [doğru, y1, y2] × 3)
var DOL = [
  ["بَسْمَلَ", 0, [["يُبَسْمِلُ", "يَبَسْمِلُ", "يُبَسْمَلُ"], ["بَسْمِلْ", "بَسْمَلْ", "اُبَسْمِلْ"], ["بَسْمَلَةٌ", "تَبَسْمُلٌ", "بِسْمَالَةٌ"]]],
  ["يُتَرْجِمُ", 1, [["تَرْجَمَ", "تُرْجِمَ", "تَتَرْجَمَ"], ["تَرْجِمْ", "تَرْجَمْ", "اُتَرْجِمْ"], ["تَرْجَمَةٌ", "تَرَاجُمٌ", "تَتَرْجُمٌ"]]],
  ["اِطْمَئِنَّ", 2, [["اِطْمَأَنَّ", "اِطْمَئَنَّ", "طَمْأَنَ"], ["يَطْمَئِنُّ", "يُطْمَئِنُّ", "يَطْمَأَنُّ"], ["اِطْمِئْنَانٌ", "اِطْمَأْنَانٌ", "طَمْأَنَةٌ"]]],
  ["اِشْمِئْزَازٌ", 3, [["اِشْمَأَزَّ", "اِشْمَئَزَّ", "شَمْأَزَ"], ["يَشْمَئِزُّ", "يُشْمَئِزُّ", "يَشْمَأَزُّ"], ["اِشْمَئِزَّ", "اِشْمَأَزَّ", "شَمْئِزْ"]]],
  ["زَلْزِلْ", 2, [["زَلْزَلَ", "تَزَلْزَلَ", "زُلْزِلَ"], ["يُزَلْزِلُ", "يَزَلْزِلُ", "يُزَلْزَلُ"], ["زَلْزَلَةٌ", "تَزَلْزُلٌ", "زُلْزُولٌ"]]],
  ["يَتَسَيْطَرُ", 1, [["تَسَيْطَرَ", "سَيْطَرَ", "تُسَيْطِرَ"], ["تَسَيْطَرْ", "تَتَسَيْطَرْ", "تَسَيْطِرْ"], ["تَسَيْطُرٌ", "سَيْطَرَةٌ", "تَسَيْطَرَةٌ"]]],
  ["اِفْرَنْقَعَ", 0, [["يَفْرَنْقِعُ", "يُفْرَنْقِعُ", "يَفْرَنْقَعُ"], ["اِفْرَنْقِعْ", "اِفْرَنْقَعْ", "فَرْنَقِعْ"], ["اِفْرِنْقَاعٌ", "اِفْرَنْقَاعٌ", "تَفَرْنُقٌ"]]],
  ["اِضْمِحْلَالٌ", 3, [["اِضْمَحَلَّ", "اِضْمَحْلَلَ", "ضَمْحَلَ"], ["يَضْمَحِلُّ", "يَضْمَحَلُّ", "يُضْمَحِلُّ"], ["اِضْمَحِلَّ", "اِضْمَحَلَّ", "ضَمْحِلْ"]]]
];
var DCOL = ["Mâzi", "Muzâri", "Emir", "Masdar"];
function dolCombo(r, i) {
  var cols = [0, 1, 2, 3].filter(function (c) { return c !== r[1]; });
  return CB2(DCOL[r[1]] + ": " + r[0], r[2], "·", "", i, cols.map(function (c) { return DCOL[c]; }).join(" · "), r[2].map(function (s) { return s[0]; }).join(" · "));
}
var R4 = [["rm", "Rubâî mücerred fiil", "رُبَاعِيٌّ مُجَرَّدٌ", "cerr"], ["rz", "Rubâî mezîd fiil", "رُبَاعِيٌّ مَزِيدٌ", "nasb"], ["rmas", "Rubâî masdar", "مَصْدَرٌ رُبَاعِيٌّ", "mi"], ["s", "Sülâsî fiil", "ثُلَاثِيٌّ", "x"]];
var VZO = [["1", "فَعْلَلَ", "mücerred", "cerr"], ["2", "تَفَعْلَلَ", "+ تَ", "nasb"], ["3", "اِفْعَنْلَلَ", "+ اِ، نْ", "mi"], ["4", "اِفْعَلَلَّ", "+ اِ، şedde", "ref"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · RUBÂÎ MÜCERRED
{
  id: "u1", no: 1, ar: "الفِعْلُ الرُّبَاعِيُّ المُجَرَّدُ", tr: "Rubâî Mücerred Fiil", short: "Mücerred", col: "cerr", legend: ["cerr"],
  goals: ["Rubâî fiilin kökünde dört asıl harf olduğunu bilmek: دَحْرَجَ (د ح ر ج)", "Tek veznini tanımak: فَعْلَلَ – يُفَعْلِلُ – فَعْلِلْ – فَعْلَلَةٌ / فِعْلَالٌ", "Rubâî mücerredi dört harfli sülâsî mezîdden (أَكْرَمَ، عَلَّمَ، قَاتَلَ) ayırmak"],
  examples: [
    { s: "دَحْرَجَ:cerr / الرَّجُلُ الحَجَرَ.:-", tr: "Adam taşı yuvarladı." },
    { s: "طَمْأَنَ:cerr / ذِكْرُ اللهِ القَلْبَ.:-", tr: "Allah’ı anmak kalbi rahatlattı." },
    { s: "حَرْجَمَ:cerr / المُدِيرُ التَّلَامِيذَ فِي فِنَاءِ المَدْرَسَةِ.:-", tr: "Müdür öğrencileri okul bahçesinde topladı." }
  ],
  rules: [
    { tr: "<b class=\"r-cerr\">Rubâî mücerred</b> (<span class=\"ar\">الرُّبَاعِيُّ المُجَرَّدُ</span>): mâzisi dört harflidir ve dört harfin <b>hepsi asıldır</b>: <span class=\"ar\">دَحْرَجَ (د ح ر ج)، تَرْجَمَ (ت ر ج م)</span>. Tek vezni vardır: <span class=\"ar\">فَعْلَلَ</span>." },
    { tr: "Muzârisi <span class=\"ar\">يُفَعْلِلُ</span>: harf-i muzâraat <b>ötreli</b>, sondan önceki harf <b>esreli</b>. Emri <span class=\"ar\">فَعْلِلْ</span>.", ex: ["دَحْرَجَ – يُدَحْرِجُ – دَحْرِجْ", "تَرْجَمَ – يُتَرْجِمُ – تَرْجِمْ"] },
    { tr: "Masdarı <span class=\"ar\">فَعْلَلَةٌ</span>, bazen <span class=\"ar\">فِعْلَالٌ</span>:", ex: ["دَحْرَجَةٌ، تَرْجَمَةٌ، بَسْمَلَةٌ", "زَلْزَلَةٌ / زِلْزَالٌ، وَسْوَسَةٌ / وِسْوَاسٌ"] },
    { tr: "Bazılarında iki harf tekrar eder (mükerrer / muzâaf rubâî): <span class=\"ar\">زَلْزَلَ، وَسْوَسَ، غَرْغَرَ، عَسْعَسَ، حَصْحَصَ، خَصْخَصَ</span>." },
    { tr: "Dikkat: <span class=\"ar\">أَكْرَمَ، عَلَّمَ، قَاتَلَ</span> da dört harflidir ama kökleri üç harflidir (<span class=\"ar\">ك ر م</span>): bunlar <b>sülâsî mezîd</b>dir. <span class=\"ar\">سَيْطَرَ (فَيْعَلَ)، هَرْوَلَ (فَعْوَلَ)</span> rubâîye mülhaktır, rubâî gibi çekilir." }
  ],
  kaide: ["الفِعْلُ الرُّبَاعِيُّ المُجَرَّدُ: مَا كَانَتْ حُرُوفُ مَاضِيهِ أَرْبَعَةً أُصُولًا، وَلَهُ وَزْنٌ وَاحِدٌ: فَعْلَلَ – يُفَعْلِلُ – فَعْلَلَةً وَفِعْلَالًا، مِثْلُ: زَلْزَلَ – يُزَلْزِلُ – زَلْزَلَةً وَزِلْزَالًا."],
  ex: [
    { type: "classify", num: "١", opts: [R4[0], R4[2], R4[3]], ar: "عَيِّنِ الرُّبَاعِيَّ المُجَرَّدَ فِي الجُمَلِ التَّالِيَةِ", tr: "Koyu kelime ne? Rubâî mücerred fiil mi, rubâî masdar mı, yoksa sülâsî mi?", items: [
      { s: HL("وَسْوَسَ لَهُمَا الشَّيْطَانُ.", "وَسْوَسَ"), a: "rm", why: "و س و س: dört asıl harf, فَعْلَلَ." },
      { s: HL("غَادَرَ القِطَارُ المَحَطَّةَ صَبَاحًا.", "غَادَرَ"), a: "s", why: "Kökü غ د ر: sülâsî mezîd (mufâale)." },
      { s: HL("لَا يَأْتِي أَبِي إِلَى البَيْتِ إِلَّا إِذَا عَسْعَسَ اللَّيْلُ.", "عَسْعَسَ"), a: "rm", why: "عَسْعَسَ: rubâî mücerred (gece karardı)." },
      { s: HL("يُمْكِنُكَ الدَّرْدَشَةُ عَنْ طَرِيقِ الشَّبَكَةِ الدَّوْلِيَّةِ مَعَ أَصْدِقَائِكَ وَأَنْتَ فِي بَيْتِكَ.", "الدَّرْدَشَةُ"), a: "rmas", why: "دَرْدَشَ'in masdarı (فَعْلَلَةٌ)." },
      { s: HL("الحُكُومَةُ التُّرْكِيَّةُ الحَالِيَّةُ خَصْخَصَتْ كَثِيرًا مِنَ المُؤَسَّسَاتِ الحُكُومِيَّةِ.", "خَصْخَصَتْ"), a: "rm", why: "خَصْخَصَ: rubâî mücerred (özelleştirdi)." },
      { s: HL("هَرْوَلَ الوَلَدُ إِلَى الحَافِلَةِ بِسُرْعَةٍ لِيَلْحَقَهَا.", "هَرْوَلَ"), a: "rm", why: "هَرْوَلَ: rubâî gibi (فَعْوَلَ, mülhak)." },
      { s: HL("أَمْعَنَ الأُسْتَاذُ النَّظَرَ فِي المَوْضُوعِ.", "أَمْعَنَ"), a: "s", why: "Kökü م ع ن: if’âl (sülâsî mezîd)." },
      { s: HL("اِغْبَرَّ الجَوُّ بِرِيحِ الصَّحْرَاءِ.", "اِغْبَرَّ"), a: "s", why: "Kökü غ ب ر: اِفْعَلَّ (sülâsî mezîd). اِفْعَلَلَّ ile karıştırma!" }
    ]},
    { type: "classify", extra: true, opts: [["rm", "Rubâî mücerred", "٤ أُصُولٍ", "cerr"], ["s", "Sülâsî mezîd", "٣ + زَائِدٌ", "nasb"]], ar: "رُبَاعِيٌّ مُجَرَّدٌ أَمْ ثُلَاثِيٌّ مَزِيدٌ؟", tr: "Dördü de dört harfli. Kökü dört asıl harf mi, yoksa üç harf + ziyade mi?", items: [
      ["أَكْرَمَ", "s", "ك ر م + أَ"], ["دَحْرَجَ", "rm", "د ح ر ج"], ["عَلَّمَ", "s", "ع ل م + şedde"], ["تَرْجَمَ", "rm", "ت ر ج م"], ["قَاتَلَ", "s", "ق ت ل + ا"], ["زَخْرَفَ", "rm", "ز خ ر ف"],
      ["أَرْسَلَ", "s", "ر س ل + أَ"], ["بَعْثَرَ", "rm", "ب ع ث ر"], ["كَسَّرَ", "s", "ك س ر + şedde"], ["غَرْغَرَ", "rm", "غ ر غ ر"], ["سَافَرَ", "s", "س ف ر + ا"], ["بَسْمَلَ", "rm", "ب س م ل"]
    ].map(function (x) { return { s: x[0], a: x[1], why: "Kök: " + x[2] + "." }; }) }
  ]
},
// ---------------------------------------------------------------- 2 · MÜCERREDİN ÇEKİMİ
{
  id: "u2", no: 2, ar: "تَصْرِيفُ الرُّبَاعِيِّ المُجَرَّدِ", tr: "Rubâî Mücerredin Çekimi", short: "Mücerred çekimi", col: "nasb", legend: ["cerr"],
  goals: ["Mâziyi sahih fiil gibi çekmek: وَسْوَسَ، وَسْوَسُوا، وَسْوَسْتُ", "Muzâriyi يُـ ile çekmek: يُوَسْوِسُ، يُوَسْوِسُونَ، تُوَسْوِسِينَ", "Emri yapmak: وَسْوِسْ، وَسْوِسُوا، وَسْوِسِي"],
  examples: [
    { s: "فَوَسْوَسَ:cerr / لَهُمَا الشَّيْطَانُ.:-", tr: "Şeytan ikisine vesvese verdi. (A’râf 20)", pair: "الَّذِي:- / يُوَسْوِسُ:cerr / فِي صُدُورِ النَّاسِ.:-", pairTr: "İnsanların göğüslerine vesvese veren. (Nâs 5)" }
  ],
  rules: [
    { tr: "<b>Mâzi</b>: sahih fiil gibi; zamir eki doğrudan eklenir:", ex: ["وَسْوَسَ، وَسْوَسَا، وَسْوَسُوا", "وَسْوَسْتُ، وَسْوَسْنَا، وَسْوَسْنَ"] },
    { tr: "<b>Muzâri</b>: harf-i muzâraat daima ötreli (<span class=\"ar\">يُ، تُ، أُ، نُ</span>), sondan önceki harf esreli:", ex: ["يُوَسْوِسُ، يُوَسْوِسَانِ، يُوَسْوِسُونَ", "تُوَسْوِسِينَ، يُوَسْوِسْنَ، أُوَسْوِسُ"] },
    { tr: "<b>Emir</b>: harf-i muzâraat atılır, başa elif gelmez (ilk harf harekelidir): <span class=\"ar\">وَسْوِسْ، وَسْوِسَا، وَسْوِسُوا، وَسْوِسِي، وَسْوِسْنَ</span>." },
    { tr: "Dikkat: <span class=\"ar\">يُدَحْرِجُ</span> (malûm, yuvarlar) ile <span class=\"ar\">يُدَحْرَجُ</span> (meçhul, yuvarlanır) farklıdır." }
  ],
  kaide: ["تَصْرِيفُ مَاضِي بَابِ فَعْلَلَةٍ: وَسْوَسَ – وَسْوَسَا – وَسْوَسُوا، وَسْوَسَتْ – وَسْوَسَتَا – وَسْوَسْنَ، وَسْوَسْتَ – وَسْوَسْتُمَا – وَسْوَسْتُمْ، وَسْوَسْتِ – وَسْوَسْتُمَا – وَسْوَسْتُنَّ، وَسْوَسْتُ – وَسْوَسْنَا.", "المُضَارِعُ: يُوَسْوِسُ – يُوَسْوِسَانِ – يُوَسْوِسُونَ… أُوَسْوِسُ – نُوَسْوِسُ. الأَمْرُ: وَسْوِسْ – وَسْوِسَا – وَسْوِسُوا، وَسْوِسِي – وَسْوِسَا – وَسْوِسْنَ."],
  ex: [
    { type: "pick", fill: true, ar: "اخْتَرِ الصِّيغَةَ الصَّحِيحَةَ", tr: "وَسْوَسَ / يُوَسْوِسُ: zamire uyan biçimi seç.", items: [[2, "m"], [3, "m"], [12, "m"], [5, "m"], [2, "u"], [9, "u"], [12, "u"], [5, "u"]].map(function (x, n) { return autoPick(V("وَسْوَسَ"), x[1], x[0], x[1] === "m" ? "(mâzi)" : "(muzâri)", n); }) },
    { type: "tablo", num: "٧ – ٩", ar: "صَرِّفِ الفِعْلَ: زَلْزَلَ – يُزَلْزِلُ – زَلْزِلْ", tr: "Önce aşağıdan bir biçim seç, sonra tablodaki yerine dokun. Tuzaklara dikkat: زَلْزَلُو، يَزَلْزِلُ، اُزَلْزِلْ…", items: [TBL("زَلْزَلَ", "m"), TBL("زَلْزَلَ", "u"), TBL("زَلْزَلَ", "e")] },
    { type: "tablo", num: "١٠ – ١٢", ar: "صَرِّفِ الفِعْلَ: دَحْرَجَ – يُدَحْرِجُ – دَحْرِجْ", tr: "Mâzi, muzâri ve emir tablolarını doldur.", items: [TBL("دَحْرَجَ", "m"), TBL("دَحْرَجَ", "u"), TBL("دَحْرَجَ", "e")] },
    { type: "tablo", num: "١٣", ar: "صَرِّفِ الأَفْعَالَ التَّالِيَةَ: بَسْمَلَ، يُسَيْطِرُ، غَرْغِرْ", tr: "بَسْمَلَ (mâzi), يُسَيْطِرُ (muzâri), غَرْغِرْ (emir).", items: [TBL("بَسْمَلَ", "m"), TBL("سَيْطَرَ", "u"), TBL("غَرْغَرَ", "e")] }
  ]
},
// ---------------------------------------------------------------- 3 · RUBÂÎ MEZÎD
{
  id: "u3", no: 3, ar: "مَزِيدُ الرُّبَاعِيِّ المُجَرَّدِ", tr: "Rubâî Mezîd ve Vezinleri", short: "Mezîd", col: "mi", legend: ["cerr", "nasb"],
  goals: ["Rubâî mezîdin üç veznini tanımak: تَفَعْلَلَ، اِفْعَنْلَلَ، اِفْعَلَلَّ", "Mezîdin mutâvaat (dönüşlülük) anlamı verdiğini görmek: دَحْرَجَ ← تَدَحْرَجَ", "Mâzi, muzâri, emir ve masdarı tablodan bulmak"],
  examples: [
    { s: "دَحْرَجَ:cerr / الرَّجُلُ الحَجَرَ.:-", tr: "Adam taşı yuvarladı.", pair: "تَدَحْرَجَ:nasb / الحَجَرُ.:-", pairTr: "Taş yuvarlandı." },
    { s: "طَمْأَنَ:cerr / ذِكْرُ اللهِ القَلْبَ.:-", tr: "Allah’ı anmak kalbi rahatlattı.", pair: "اِطْمَأَنَّ:nasb / القَلْبُ بِذِكْرِ اللهِ.:-", pairTr: "Kalp Allah’ı anmakla huzura erdi." },
    { s: "حَرْجَمَ:cerr / المُدِيرُ التَّلَامِيذَ.:-", tr: "Müdür öğrencileri topladı.", pair: "اِحْرَنْجَمَ:nasb / التَّلَامِيذُ فِي فِنَاءِ المَدْرَسَةِ.:-", pairTr: "Öğrenciler okul bahçesinde toplandı." }
  ],
  rules: [
    { tr: "Rubâî mücerrede bir ya da iki harf eklenir; çoğu zaman <b>mutâvaat</b> bildirir: işi kabul etme, etkilenme (yuvarladı → yuvarlandı)." },
    { tr: "<b>Bir harfle</b> (humâsî, 5 harf): başa <span class=\"ar\">تَ</span>: <span class=\"ar\">تَفَعْلَلَ</span>.", ex: ["دَحْرَجَ ← تَدَحْرَجَ", "زَلْزَلَ ← تَزَلْزَلَ"] },
    { tr: "<b>İki harfle</b> (südâsî, 6 harf): başa vasıl elifi, ikinci harften sonra <span class=\"ar\">نْ</span>: <span class=\"ar\">اِفْعَنْلَلَ</span>.", ex: ["حَرْجَمَ ← اِحْرَنْجَمَ", "اِفْرَنْقَعَ"] },
    { tr: "<b>İki harfle</b>: başa vasıl elifi, son harf şeddeli (tekrarlanmış): <span class=\"ar\">اِفْعَلَلَّ</span>.", ex: ["طَمْأَنَ ← اِطْمَأَنَّ", "اِقْشَعَرَّ، اِشْمَأَزَّ، اِضْمَحَلَّ"] },
    { tr: "Tuzak: <span class=\"ar\">اِنْهَزَمَ، اِنْزَعَجَ</span> (infiâl), <span class=\"ar\">اِسْتَوْلَى</span> (istif’âl), <span class=\"ar\">اِغْبَرَّ</span> (if’ilâl) sülâsî mezîddir; kökleri üç harflidir." }
  ],
  kaide: [
    "١ ـ يُزَادُ الفِعْلُ الرُّبَاعِيُّ المُجَرَّدُ بِحَرْفٍ أَوْ حَرْفَيْنِ، وَيُفِيدُ المُطَاوَعَةَ.",
    "٢ ـ مَزِيدُ الرُّبَاعِيِّ المُجَرَّدِ بِحَرْفٍ يَكُونُ بِزِيَادَةِ التَّاءِ فِي الأَوَّلِ (تَفَعْلَلَ)، مِثْلُ: دَحْرَجَ ← تَدَحْرَجَ.",
    "٣ ـ مَزِيدُ الرُّبَاعِيِّ المُجَرَّدِ بِحَرْفَيْنِ يَكُونُ: أ ـ بِزِيَادَةِ الهَمْزَةِ فِي الأَوَّلِ وَالنُّونِ فِي الوَسَطِ (اِفْعَنْلَلَ)، مِثْلُ: حَرْجَمَ ← اِحْرَنْجَمَ. ب ـ أَوْ بِزِيَادَةِ الهَمْزَةِ فِي الأَوَّلِ وَتَشْدِيدِ الحَرْفِ الأَخِيرِ (اِفْعَلَلَّ)، مِثْلُ: طَمْأَنَ ← اِطْمَأَنَّ."
  ],
  ex: [
    { type: "classify", num: "٢", opts: [R4[1], R4[0], R4[3]], ar: "عَيِّنْ مَزِيدَ الرُّبَاعِيِّ المُجَرَّدِ فِي الجُمَلِ التَّالِيَةِ", tr: "Koyu fiil rubâî mezîd mi? Tuzaklara dikkat: üç harfli köklerden gelen mezîdler.", items: [
      { s: HL("تَلَعْثَمَ الطِّفْلُ فِي كَلَامِهِ.", "تَلَعْثَمَ"), a: "rz", why: "لَعْثَمَ + تَ: تَفَعْلَلَ." },
      { s: HL("اِنْهَزَمَ فَرِيقُنَا فِي النِّصْفِ الأَوَّلِ.", "اِنْهَزَمَ"), a: "s", why: "Kökü ه ز م: infiâl (sülâsî mezîd)." },
      { s: HL("تَزَلْزَلَتِ الأَرْضُ وَانْهَارَتْ أَبْنِيَةٌ كَثِيرَةٌ.", "تَزَلْزَلَتِ"), a: "rz", why: "زَلْزَلَ + تَ: تَفَعْلَلَ. اِنْهَارَتْ ise sülâsî mezîd." },
      { s: HL("اِقْشَعَرَّ الوَلَدُ مِنَ البَرْدِ.", "اِقْشَعَرَّ"), a: "rz", why: "Kökü ق ش ع ر: اِفْعَلَلَّ." },
      { s: HL("بَعْدَ ثَلَاثِ سَاعَاتٍ افْرَنْقَعَ المُزْدَحِمُونَ.", "افْرَنْقَعَ"), a: "rz", why: "Kökü ف ر ق ع: اِفْعَنْلَلَ." },
      { s: HL("اِسْتَوْلَى الاسْتِعْمَارُ عَلَى البِلَادِ الإِسْلَامِيَّةِ فِي بِدَايَةِ القَرْنِ العِشْرِينَ.", "اِسْتَوْلَى"), a: "s", why: "Kökü و ل ي: istif’âl (sülâsî mezîd)." },
      { s: HL("تَطْمَئِنُّ القُلُوبُ بِذِكْرِ اللهِ.", "تَطْمَئِنُّ"), a: "rz", why: "اِطْمَأَنَّ'nin muzârisi: اِفْعَلَلَّ." },
      { s: HL("اِنْزَعَجَ المَرِيضُ مِنْ أَصْوَاتِ الطَّائِرَاتِ.", "اِنْزَعَجَ"), a: "s", why: "Kökü ز ع ج: infiâl (sülâsî mezîd)." }
    ]},
    { type: "classify", extra: true, opts: VZO, ar: "عَلَى أَيِّ وَزْنٍ؟", tr: "Fiil hangi vezinde?", items: ["تَدَحْرَجَ", "اِحْرَنْجَمَ", "اِطْمَأَنَّ", "وَسْوَسَ", "تَلَعْثَمَ", "اِقْشَعَرَّ", "اِفْرَنْقَعَ", "تَرْجَمَ", "اِشْمَأَزَّ", "تَفَلْسَفَ", "اِضْمَحَلَّ", "بَعْثَرَ"].map(function (m) { var v = V(m); return { s: v.m + " – " + MUZ(v)[0], a: String(v.bab), why: BAB[v.bab][1] + "." }; }) },
    { type: "pick", fill: true, extra: true, ar: "حَوِّلْ إِلَى المُطَاوِعِ", tr: "Mücerred fiilin mutâvaatını (etkilenme anlamı) seç.", exHtml: "<span class=\"ar\">دَحْرَجَ الرَّجُلُ الحَجَرَ ← تَدَحْرَجَ الحَجَرُ.</span>", items: [
      P("زَلْزَلَ اللهُ الأَرْضَ. ← ___ الأَرْضُ.", "تَزَلْزَلَتِ", "اِزْلَنْزَلَتِ", "زُلْزِلَتْ", 0, "Allah yeri sarstı → Yer sarsıldı.", "زَلْزَلَ ← تَزَلْزَلَ (تَفَعْلَلَ)."),
      P("طَمْأَنَ الطَّبِيبُ المَرِيضَ. ← ___ المَرِيضُ.", "اِطْمَأَنَّ", "تَطَمْأَنَ", "اِطْمَأْنَنَ", 1, "Doktor hastayı rahatlattı → Hasta rahatladı.", "طَمْأَنَ ← اِطْمَأَنَّ (اِفْعَلَلَّ)."),
      P("حَرْجَمَ الرَّاعِي الغَنَمَ. ← ___ الغَنَمُ.", "اِحْرَنْجَمَتِ", "تَحَرْجَمَتِ", "اِحْرَنْجَمَ", 2, "Çoban koyunları topladı → Koyunlar toplandı.", "حَرْجَمَ ← اِحْرَنْجَمَ (اِفْعَنْلَلَ); الغَنَمُ müennes."),
      P("بَعْثَرَتِ الرِّيحُ الأَوْرَاقَ. ← ___ الأَوْرَاقُ.", "تَبَعْثَرَتِ", "بُعْثِرَتِ", "اِبْعَنْثَرَتِ", 3, "Rüzgâr kâğıtları dağıttı → Kâğıtlar dağıldı.", "بَعْثَرَ ← تَبَعْثَرَ."),
      P("دَحْرَجَ الطِّفْلُ الكُرَةَ. ← ___ الكُرَةُ.", "تَدَحْرَجَتِ", "تَدَحْرَجَ", "اِدْحَنْرَجَتِ", 4, "Çocuk topu yuvarladı → Top yuvarlandı.", "الكُرَةُ müennes: تَدَحْرَجَتْ."),
      P("زَخْرَفَ العُمَّالُ البَيْتَ. ← ___ البَيْتُ.", "تَزَخْرَفَ", "تَزَخْرَفَتِ", "اِزْخَرَفَّ", 5, "İşçiler evi süsledi → Ev süslendi.", "زَخْرَفَ ← تَزَخْرَفَ.")
    ]},
    { type: "combo", num: "٤", ar: "امْلَأِ الفَرَاغَاتِ فِي الجَدْوَلِ", tr: "Verilen biçimden tablonun diğer sütunlarını (sırayla) seç.", items: DOL.map(dolCombo) }
  ]
},
// ---------------------------------------------------------------- 4 · MEZÎDİN ÇEKİMİ
{
  id: "u4", no: 4, ar: "تَصْرِيفُ مَزِيدِ الرُّبَاعِيِّ", tr: "Rubâî Mezîdin Çekimi", short: "Mezîd çekimi", col: "ref", legend: ["nasb"],
  goals: ["تَفَعْلَلَ bâbını çekmek: تَزَلْزَلَ – يَتَزَلْزَلُ – تَزَلْزَلْ", "اِفْعَلَلَّ bâbında şeddenin ne zaman kalıp ne zaman çözüldüğünü bilmek: اِطْمَأَنُّوا / اِطْمَأْنَنْتُ", "Mâziyi muzâriye çevirmek"],
  examples: [
    { s: "تَزَلْزَلَتِ:nasb / الأَرْضُ.:-", tr: "Yer sarsıldı.", pair: "تَطْمَئِنُّ:nasb / القُلُوبُ بِذِكْرِ اللهِ.:-", pairTr: "Kalpler Allah’ı anmakla huzur bulur." }
  ],
  rules: [
    { tr: "<b>تَفَعْلَلَ</b>: muzâride harf-i muzâraat <b>üstünlü</b>, sondan önceki harf <b>üstün</b> kalır: <span class=\"ar\">يَتَزَلْزَلُ، تَتَزَلْزَلِينَ</span>. Emir: <span class=\"ar\">تَزَلْزَلْ</span> (başa ikinci تَ gelmez)." },
    { tr: "<b>اِفْعَنْلَلَ</b>: vasıl elifi muzâride düşer: <span class=\"ar\">اِحْرَنْجَمَ – يَحْرَنْجِمُ – اِحْرَنْجِمْ</span>." },
    { tr: "<b>اِفْعَلَلَّ</b>: ünlüyle başlayan zamirde şedde kalır, sâkin zamirde çözülür:", ex: ["اِطْمَأَنَّ، اِطْمَأَنُّوا، اِطْمَأَنَّتْ", "اِطْمَأْنَنْتُ، اِطْمَأْنَنَّا، اِطْمَأْنَنَّ (هُنَّ)"] },
    { tr: "Muzâri ve emirde hemze yazımı değişir (esreden sonra ئ): <span class=\"ar\">يَطْمَئِنُّ، اِطْمَئِنَّ، اِطْمِئْنَانٌ</span>; هُنَّ: <span class=\"ar\">يَطْمَأْنِنَّ</span>." }
  ],
  kaide: ["تَصْرِيفُ مَاضِي بَابِ تَفَعْلُلٍ: تَزَلْزَلَ – تَزَلْزَلَا – تَزَلْزَلُوا… المُضَارِعُ: يَتَزَلْزَلُ – يَتَزَلْزَلَانِ – يَتَزَلْزَلُونَ… الأَمْرُ: تَزَلْزَلْ – تَزَلْزَلَا – تَزَلْزَلُوا، تَزَلْزَلِي – تَزَلْزَلَا – تَزَلْزَلْنَ."],
  ex: [
    { type: "tablo", num: "١٤ – ١٦", ar: "صَرِّفِ الفِعْلَ: تَدَحْرَجَ – يَتَدَحْرَجُ – تَدَحْرَجْ", tr: "Önce aşağıdan bir biçim seç, sonra tablodaki yerine dokun. Tuzaklar: يُتَدَحْرَجُ، تَتَدَحْرَجْ…", items: [TBL("تَدَحْرَجَ", "m"), TBL("تَدَحْرَجَ", "u"), TBL("تَدَحْرَجَ", "e")] },
    { type: "tablo", extra: true, ar: "صَرِّفِ الفِعْلَ: اِطْمَأَنَّ – يَطْمَئِنُّ – اِطْمَئِنَّ", tr: "Şedde nerede kalır, nerede çözülür? Tabloyu doldur.", items: [TBL("اِطْمَأَنَّ", "m"), TBL("اِطْمَأَنَّ", "u"), TBL("اِطْمَأَنَّ", "e")] },
    { type: "combo", num: "٣", ar: "حَوِّلِ الأَفْعَالَ فِيمَا يَأْتِي إِلَى المُضَارِعِ", tr: "Fiilleri muzâriye çevir: kutulara dokunarak doğru biçimi seç.", exHtml: "<span class=\"ar\">سَيْطَرَتِ الدُّوَلُ الغَنِيَّةُ عَلَى الدُّوَلِ الفَقِيرَةِ ← تُسَيْطِرُ الدُّوَلُ الغَنِيَّةُ عَلَى الدُّوَلِ الفَقِيرَةِ.</span>", items: [
      CBP([["يَتَمَذْهَبُونَ", "يُتَمَذْهِبُونَ", "يَتَمَذْهِبُونَ"], "مَذْهَبَ الصُّوفِيَّةِ فَـ", ["يَلْبَسُونَ", "لَبِسُوا", "يُلْبِسُونَ"], "مَلَابِسَ مِنَ الصُّوفِ."], 0, "Sûfî mezhebine giriyorlar ve yünden elbiseler giyiyorlar.", "تَمَذْهَبُوا ← يَتَمَذْهَبُونَ (تَفَعْلَلَ: يَـ ve üstün)."),
      CBP([["أَشْعُرُ", "شَعَرْتُ", "أَشْعِرُ"], "بِأَلَمٍ فِي العُنُقِ فَـ", ["أُغَرْغِرُ", "أَغَرْغِرُ", "أُغَرْغَرُ"], "."], 1, "Boğazımda ağrı hissediyorum ve gargara yapıyorum.", "غَرْغَرْتُ ← أُغَرْغِرُ (فَعْلَلَ: أُـ ve esre)."),
      CBP(["هَذَا المُتَرْجِمُ", ["يُتَمْتِمُ", "يَتَمْتَمُ", "يُتَمْتَمُ"], "كَثِيرًا فِي كَلَامِهِ وَلَكِنْ تَرْجَمَتُهُ", ["تَكُونُ", "كَانَتْ", "يَكُونُ"], "جَمِيلَةً."], 2, "Bu tercüman konuşurken çok kekeliyor ama tercümesi güzel oluyor.", "تَمْتَمَ ← يُتَمْتِمُ."),
      CBP(["قَدْ", ["تَضْمَحِلُّ", "تَضْمَحْلِلُ", "تُضْمَحِلُّ"], "جَمِيعُ الأَفْكَارِ الَّتِي", ["تَحْمِلُهَا", "حَمَلَتْهَا", "تُحْمِلُهَا"], "الشُّيُوعِيَّةُ."], 3, "Komünizmin taşıdığı bütün fikirler bazen yok olup gider.", "اِضْمَحَلَّتْ ← تَضْمَحِلُّ (şedde kalır)."),
      CBP([["يُقَهْقِرُ", "يَقَهْقِرُ", "يُقَهْقَرُ"], "جَيْشُ العَدُوِّ فَـ", ["يَطْمَئِنُّ", "يَطْمَأَنُّ", "يُطْمَئِنُّ"], "قَائِدُنَا."], 4, "Düşman ordusu geri çekiliyor, komutanımız rahatlıyor.", "قَهْقَرَ ← يُقَهْقِرُ; اِطْمَأَنَّ ← يَطْمَئِنُّ."),
      CBP(["يُشِيرُ الحَاكِمُ إِلَيْنَا فَـ", ["نَقْشَعِرُّ", "نَقْشَعْرِرُ", "نُقْشَعِرُّ"], "وَ", ["نَتَزَلْزَلُ", "نُزَلْزِلُ", "نَتَزَلْزِلُ"], "."], 5, "Hâkim bize işaret ediyor; ürperiyor ve sarsılıyoruz.", "اِقْشَعْرَرْنَا ← نَقْشَعِرُّ; تَزَلْزَلْنَا ← نَتَزَلْزَلُ."),
      CBP(["نَحْنُ المُؤْمِنِينَ", ["نُزَخْرِفُ", "نَزَخْرِفُ", "نُزَخْرَفُ"], "بُيُوتَنَا وَ", ["نُهْمِلُ", "نَهْمِلُ", "أَهْمَلْنَا"], "قُلُوبَنَا."], 6, "Biz müminler evlerimizi süslüyor, kalplerimizi ihmal ediyoruz.", "زَخْرَفْنَا ← نُزَخْرِفُ; أَهْمَلْنَا ← نُهْمِلُ."),
      CBP([["يَتَفَلْسَفُ", "يُتَفَلْسِفُ", "يَتَفَلْسِفُ"], "الرَّجُلُ فِي كَلَامِهِ."], 7, "Adam konuşmasında felsefe yapıyor.", "تَفَلْسَفَ ← يَتَفَلْسَفُ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLERDE
{
  id: "u5", no: 5, ar: "الرُّبَاعِيُّ فِي الآيَاتِ الكَرِيمَةِ", tr: "Âyetlerde Rubâî Fiil", short: "Âyetler", col: "muz", legend: ["cerr", "nasb"],
  goals: ["Âyetlerdeki fiilin mâzi mi muzâri mi olduğunu bulmak", "Rubâî mücerredi mezîdden ayırmak: حَصْحَصَ / اشْمَأَزَّتْ", "Meçhul rubâîyi tanımak: زُحْزِحَ، بُعْثِرَتْ، كُبْكِبُوا"],
  examples: [
    { s: "﴿فَكُبْكِبُوا:cerr / فِيهَا هُمْ وَالغَاوُونَ﴾:-", tr: "Onlar ve azgınlar oraya yüzüstü atıldılar. (Şuarâ 94) · كُبْكِبُوا: mâzi, rubâî mücerred (meçhul)." }
  ],
  rules: [
    { tr: "Meçhul mâzi <span class=\"ar\">فُعْلِلَ</span>: <span class=\"ar\">زُحْزِحَ، بُعْثِرَتْ، كُبْكِبُوا</span>. Meçhul muzâri <span class=\"ar\">يُفَعْلَلُ</span>: <span class=\"ar\">يُدَحْرَجُ</span>." },
    { tr: "Mezîd: <span class=\"ar\">اشْمَأَزَّتْ، يَطْمَئِنَّ، تَقْشَعِرُّ</span> (<span class=\"ar\">اِفْعَلَلَّ</span>)." },
    { tr: "<span class=\"ar\">لِـ</span>'den sonra muzâri mansûb olur: <span class=\"ar\">لِيَطْمَئِنَّ</span> (şeddeli harf üstün)." }
  ],
  kaide: ["اقْرَأِ الآيَاتِ الكَرِيمَةَ الآتِيَةَ وَعَيِّنِ الأَفْعَالَ كَمَا فِي المِثَالِ: ﴿فَكُبْكِبُوا فِيهَا هُمْ وَالْغَاوُونَ﴾ (الشُّعَرَاءُ ٩٤) كُبْكِبُوا: مَاضٍ رُبَاعِيٌّ مُجَرَّدٌ."],
  ex: [
    { type: "classify", num: "٥", opts: [["mm", "Mâzi · mücerred", "مَاضٍ مُجَرَّدٌ", "cerr"], ["um", "Muzâri · mücerred", "مُضَارِعٌ مُجَرَّدٌ", "nasb"], ["mz", "Mâzi · mezîd", "مَاضٍ مَزِيدٌ", "mi"], ["uz", "Muzâri · mezîd", "مُضَارِعٌ مَزِيدٌ", "ref"]], ar: "اقْرَأِ الآيَاتِ الكَرِيمَةَ الآتِيَةَ وَعَيِّنِ الأَفْعَالَ", tr: "Koyu fiil: mâzi mi muzâri mi, rubâî mücerred mi mezîd mi?", items: [
      { s: HL("﴿وَإِذَا ذُكِرَ اللهُ وَحْدَهُ اشْمَأَزَّتْ قُلُوبُ الَّذِينَ لَا يُؤْمِنُونَ بِالآخِرَةِ﴾ (الزُّمَرُ ٤٥)", "اشْمَأَزَّتْ"), a: "mz", why: "اِشْمَأَزَّ: اِفْعَلَلَّ, mâzi." },
      { s: HL("﴿قَالَتِ امْرَأَةُ العَزِيزِ الآنَ حَصْحَصَ الحَقُّ﴾ (يُوسُفُ ٥١)", "حَصْحَصَ"), a: "mm", why: "حَصْحَصَ: فَعْلَلَ, mâzi (ortaya çıktı)." },
      { s: HL("﴿قَالَ أَوَلَمْ تُؤْمِنْ قَالَ بَلَى وَلَكِنْ لِيَطْمَئِنَّ قَلْبِي﴾ (البَقَرَةُ ٢٦٠)", "لِيَطْمَئِنَّ"), a: "uz", why: "يَطْمَئِنُّ: اِطْمَأَنَّ'nin muzârisi, لِـ ile mansûb." },
      { s: HL("﴿فَمَنْ زُحْزِحَ عَنِ النَّارِ وَأُدْخِلَ الجَنَّةَ فَقَدْ فَازَ﴾ (آلُ عِمْرَانَ ١٨٥)", "زُحْزِحَ"), a: "mm", why: "زَحْزَحَ'nin meçhul mâzisi." },
      { s: HL("﴿وَإِذَا القُبُورُ بُعْثِرَتْ، عَلِمَتْ نَفْسٌ مَا قَدَّمَتْ وَأَخَّرَتْ﴾ (الانْفِطَارُ ٤–٥)", "بُعْثِرَتْ"), a: "mm", why: "بَعْثَرَ'nin meçhul mâzisi." },
      { s: HL("﴿تَقْشَعِرُّ مِنْهُ جُلُودُ الَّذِينَ يَخْشَوْنَ رَبَّهُمْ﴾ (الزُّمَرُ ٢٣)", "تَقْشَعِرُّ"), a: "uz", why: "اِقْشَعَرَّ'nin muzârisi." },
      { s: HL("﴿وَنَعْلَمُ مَا تُوَسْوِسُ بِهِ نَفْسُهُ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الوَرِيدِ﴾ (ق ١٦)", "تُوَسْوِسُ"), a: "um", why: "وَسْوَسَ – يُوَسْوِسُ: muzâri." },
      { s: HL("﴿الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الجِنَّةِ وَالنَّاسِ﴾ (النَّاسُ ٥–٦)", "يُوَسْوِسُ"), a: "um", why: "يُوَسْوِسُ: muzâri, rubâî mücerred." }
    ]},
    { type: "classify", extra: true, opts: VZO, ar: "عَلَى أَيِّ وَزْنٍ؟", tr: "Âyetteki fiilin mâzisi hangi vezinde?", items: [["اشْمَأَزَّتْ", "4", "اِشْمَأَزَّ"], ["حَصْحَصَ", "1", "حَصْحَصَ"], ["لِيَطْمَئِنَّ", "4", "اِطْمَأَنَّ"], ["زُحْزِحَ", "1", "زَحْزَحَ"], ["بُعْثِرَتْ", "1", "بَعْثَرَ"], ["تَقْشَعِرُّ", "4", "اِقْشَعَرَّ"], ["تُوَسْوِسُ", "1", "وَسْوَسَ"], ["فَكُبْكِبُوا", "1", "كَبْكَبَ"]].map(function (x) { return { s: x[0], a: x[1], why: "Mâzisi " + x[2] + "." }; }) }
  ]
}
];

// ---------- Oyun verileri ----------
var SUL = VERBS;
// Doğru Çekim: [zamir {biçim}, seçenekler, açıklama, Türkçe, konu]
var NK_POOL = [];
VERBS.forEach(function (v, i) {
  var mz = MAZ(v), mu = MUZ(v), em = EMR(v), dm = DIST(v, "m"), du = DIST(v, "u"), de = DIST(v, "e"), tp = v.bab === 1 ? ["u2", "u2", "u2"] : ["u4", "u4", "u4"];
  if (dm.length >= 2) NK_POOL.push([PER[2] + " {" + mz[2] + "}", [mz[2], dm[0], dm[1]], v.m + " · هُمْ (mâzi)", "onlar · " + v.tr, tp[0]]);
  if (v.ig || i % 2 === 0) NK_POOL.push([PER[12] + " {" + mz[12] + "}", [mz[12], v.ms + "َتُ", v.ms + "ْتُ"].filter(function (x, k, a) { return a.indexOf(x) === k; }).concat(dm).slice(0, 3), v.m + " · أَنَا (mâzi)", "ben · " + v.tr, tp[0]]);
  if (du.length >= 2) NK_POOL.push([v.m + " ← {" + mu[0] + "}", [mu[0], du[0], du[1]], v.m + " · muzâri", v.tr, tp[1]]);
  if (du.length >= 3) NK_POOL.push([PER[9] + " {" + mu[9] + "}", [mu[9], du[2], mu[0]], v.m + " · أَنْتِ (muzâri)", "sen (kadın) · " + v.tr, tp[1]]);
  if (de.length >= 2) NK_POOL.push([PER[6] + " {" + em[0] + "}", [em[0], de[0], de[1]], v.m + " · emir", "sen (erkek) · " + v.tr, tp[2]]);
});
var BB_LIST = VERBS.map(function (v) { return [v.m + " – " + MUZ(v)[0], String(v.bab), BAB[v.bab][1]]; });
var AS_LIST = [
  ["دَحْرَجَ", "rm", "د ح ر ج"], ["تَرْجَمَ", "rm", "ت ر ج م"], ["زَلْزَلَ", "rm", "ز ل ز ل"], ["وَسْوَسَ", "rm", "و س و س"], ["بَسْمَلَ", "rm", "ب س م ل"], ["زَخْرَفَ", "rm", "ز خ ر ف"], ["بَعْثَرَ", "rm", "ب ع ث ر"], ["غَرْغَرَ", "rm", "غ ر غ ر"],
  ["تَدَحْرَجَ", "rz", "دَحْرَجَ + تَ"], ["تَزَلْزَلَ", "rz", "زَلْزَلَ + تَ"], ["اِحْرَنْجَمَ", "rz", "حَرْجَمَ + اِ، نْ"], ["اِطْمَأَنَّ", "rz", "طَمْأَنَ + اِ، şedde"], ["اِقْشَعَرَّ", "rz", "ق ش ع ر + اِ، şedde"], ["تَلَعْثَمَ", "rz", "لَعْثَمَ + تَ"], ["اِفْرَنْقَعَ", "rz", "ف ر ق ع + اِ، نْ"], ["اِشْمَأَزَّ", "rz", "ش م أ ز + اِ، şedde"],
  ["أَكْرَمَ", "s", "ك ر م: if’âl"], ["عَلَّمَ", "s", "ع ل م: tef’îl"], ["قَاتَلَ", "s", "ق ت ل: mufâale"], ["اِنْهَزَمَ", "s", "ه ز م: infiâl"], ["اِغْبَرَّ", "s", "غ ب ر: if’ilâl"], ["تَعَلَّمَ", "s", "ع ل م: tefa’ul"], ["اِسْتَوْلَى", "s", "و ل ي: istif’âl"], ["اِحْمَرَّ", "s", "ح م ر: if’ilâl"]
];
var BBO = VZO;
var ASO = [["rm", "Rubâî mücerred", "رُبَاعِيٌّ مُجَرَّدٌ", "cerr"], ["rz", "Rubâî mezîd", "رُبَاعِيٌّ مَزِيدٌ", "nasb"], ["s", "Sülâsî mezîd", "ثُلَاثِيٌّ مَزِيدٌ", "mi"]];
var HAFIZA = {
  mu: { name: "Mâzi ↔ muzâri", pairs: [["دَحْرَجَ", "يُدَحْرِجُ"], ["تَدَحْرَجَ", "يَتَدَحْرَجُ"], ["اِحْرَنْجَمَ", "يَحْرَنْجِمُ"], ["اِطْمَأَنَّ", "يَطْمَئِنُّ"], ["تَرْجَمَ", "يُتَرْجِمُ"], ["اِقْشَعَرَّ", "يَقْشَعِرُّ"], ["تَفَلْسَفَ", "يَتَفَلْسَفُ"]] },
  ue: { name: "Mücerred ↔ mezîd", pairs: [["دَحْرَجَ", "تَدَحْرَجَ"], ["زَلْزَلَ", "تَزَلْزَلَ"], ["حَرْجَمَ", "اِحْرَنْجَمَ"], ["طَمْأَنَ", "اِطْمَأَنَّ"], ["بَعْثَرَ", "تَبَعْثَرَ"], ["زَخْرَفَ", "تَزَخْرَفَ"], ["قَهْقَرَ", "تَقَهْقَرَ"]] },
  tr: { name: "Fiil ↔ masdar", pairs: [["زَلْزَلَ", "زِلْزَالٌ"], ["تَرْجَمَ", "تَرْجَمَةٌ"], ["تَدَحْرَجَ", "تَدَحْرُجٌ"], ["اِحْرَنْجَمَ", "اِحْرِنْجَامٌ"], ["اِطْمَأَنَّ", "اِطْمِئْنَانٌ"], ["وَسْوَسَ", "وِسْوَاسٌ"], ["اِقْشَعَرَّ", "اِقْشِعْرَارٌ"]] }
};
var KARTLAR = [
  ["Rubâî mücerred nedir?", "Mâzisi dört asıl harften oluşan fiil: دَحْرَجَ، تَرْجَمَ"],
  ["Rubâî mücerredin vezni?", "فَعْلَلَ – يُفَعْلِلُ – فَعْلِلْ – فَعْلَلَةٌ / فِعْلَالٌ"],
  ["أَكْرَمَ rubâî mi?", "Hayır: kökü ك ر م, sülâsî mezîd (if’âl)."],
  ["Bir harfle mezîd?", "تَفَعْلَلَ: دَحْرَجَ ← تَدَحْرَجَ"],
  ["İki harfle mezîd (1)?", "اِفْعَنْلَلَ: حَرْجَمَ ← اِحْرَنْجَمَ"],
  ["İki harfle mezîd (2)?", "اِفْعَلَلَّ: طَمْأَنَ ← اِطْمَأَنَّ"],
  ["Mezîd ne anlam katar?", "Çoğu zaman mutâvaat: yuvarladı → yuvarlandı"],
  ["Muzâri: يُـ mi يَـ mi?", "فَعْلَلَ: يُدَحْرِجُ · mezîdler: يَتَدَحْرَجُ، يَحْرَنْجِمُ، يَطْمَئِنُّ"],
  ["تَدَحْرَجَ'nin emri?", "تَدَحْرَجْ (تَتَدَحْرَجْ değil)"],
  ["اِطْمَأَنَّ + تُ?", "اِطْمَأْنَنْتُ (şedde çözülür)"],
  ["اِطْمَأَنَّ'nin masdarı?", "اِطْمِئْنَانٌ"],
  ["اِغْبَرَّ rubâî mi?", "Hayır: kökü غ ب ر, اِفْعَلَّ (sülâsî mezîd)."]
];
