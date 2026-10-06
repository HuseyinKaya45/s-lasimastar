// ================= VERİ: Misâl Fiil ve Çekimi (الفِعْلُ المِثَالُ وَتَصْرِيفُهُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "الفِعْلُ المِثَالُ", tr: "Misâl fiil" }, nasb: { ar: "حَذْفُ الوَاوِ", tr: "Vâvın düşmesi" }, mi: { ar: "الضَّمِيرُ", tr: "Zamir eki" },
  mz: { ar: "", tr: "Başka fiil" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// ---------- Çekim motoru ----------
var PER = ["هُوَ", "هُمَا", "هُمْ", "هِيَ", "هُمَا", "هُنَّ", "أَنْتَ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتِ", "أَنْتُمَا", "أَنْتُنَّ", "أَنَا", "نَحْنُ"];
var PER_TR = ["o (erkek)", "o ikisi (erkek)", "onlar (erkek)", "o (kadın)", "o ikisi (kadın)", "onlar (kadın)", "sen (erkek)", "siz ikiniz (erkek)", "siz (erkek)", "sen (kadın)", "siz ikiniz (kadın)", "siz (kadın)", "ben", "biz"];
var EPER = ["أَنْتَ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتِ", "أَنْتُمَا", "أَنْتُنَّ"];
var MSUF = ["َ", "َا", "ُوا", "َتْ", "َتَا", "ْنَ", "ْتَ", "ْتُمَا", "ْتُمْ", "ْتِ", "ْتُمَا", "ْتُنَّ", "ْتُ", "ْنَا"];
var UPRE = ["ي", "ي", "ي", "ت", "ت", "ي", "ت", "ت", "ت", "ت", "ت", "ت", "أ", "ن"];
var USUF = ["ُ", "َانِ", "ُونَ", "ُ", "َانِ", "ْنَ", "ُ", "َانِ", "ُونَ", "ِينَ", "َانِ", "ْنَ", "ُ", "ُ"];
var ESUF = ["ْ", "َا", "ُوا", "ِي", "َا", "ْنَ"];
// Fiil: mâzi, mâzi gövdesi, muzâri ön ek harekesi, muzâri gövdesi, emir gövdesi, Türkçe, bâb, tür (d: vâv düşer, k: vâv kalır, y: yâî, m: mezîd), not
function NV(m, ms, uv, us, es, tr, bab, k, nt) { return { m: m, ms: ms, uv: uv, us: us, es: es, tr: tr, bab: bab, k: k, nt: nt || "" }; }
// Vâvı düşen sülâsî: a = 2. harf, l = 3. harf, mv = mâzide ayn harekesi, uw = muzâride ayn harekesi
function SD(a, l, mv, uw, bab, tr) { var ms = "وَ" + a + mv + l; return NV(ms + "َ", ms, "َ", a + uw + l, a + uw + l, tr, bab, "d"); }
var VERBS = [
  SD("ق", "ف", "َ", "ِ", 2, "durmak"), SD("ع", "د", "َ", "ِ", 2, "söz vermek"), SD("ص", "ل", "َ", "ِ", 2, "ulaşmak, varmak"), SD("ج", "د", "َ", "ِ", 2, "bulmak"),
  SD("ز", "ن", "َ", "ِ", 2, "tartmak"), SD("ص", "ف", "َ", "ِ", 2, "nitelemek, anlatmak"), SD("ر", "د", "َ", "ِ", 2, "gelmek, varmak"), SD("ع", "ظ", "َ", "ِ", 2, "öğüt vermek"),
  SD("ض", "ع", "َ", "َ", 3, "koymak"), SD("ه", "ب", "َ", "َ", 3, "bağışlamak"), SD("ق", "ع", "َ", "َ", 3, "düşmek, olmak"), SD("د", "ع", "َ", "َ", 3, "bırakmak"),
  SD("ر", "ث", "ِ", "ِ", 6, "mirasa konmak"), SD("ث", "ق", "ِ", "ِ", 6, "güvenmek"),
  NV("وَجِلَ", "وَجِل", "َ", "وْجَل", "اِيجَل", "korkmak", 4, "k"),
  NV("يَئِسَ", "يَئِس", "َ", "يْأَس", "اِيْأَس", "ümidini kesmek", 4, "y"), NV("يَبِسَ", "يَبِس", "َ", "يْبَس", "اِيْبَس", "kurumak", 4, "y"), NV("يَقِظَ", "يَقِظ", "َ", "يْقَظ", "اِيْقَظ", "uyanık olmak", 4, "y"),
  NV("أَوْقَفَ", "أَوْقَف", "ُ", "وقِف", "أَوْقِف", "durdurmak", "إِفْعَالٌ", "m", "Ötreden sonra sâkin vâv uzatma harfi olur: يُوقِفُ (يُوْقِفُ)."),
  NV("أَوْصَلَ", "أَوْصَل", "ُ", "وصِل", "أَوْصِل", "ulaştırmak", "إِفْعَالٌ", "m", "Ötreden sonra sâkin vâv uzatma harfi olur: يُوصِلُ."),
  NV("أَيْقَنَ", "أَيْقَن", "ُ", "وقِن", "أَيْقِن", "kesin bilmek", "إِفْعَالٌ", "m", "Ötreden sonra sâkin yâ vâva döner: يُوقِنُ (يُيْقِنُ değil)."),
  NV("وَجَّهَ", "وَجَّه", "ُ", "وَجِّه", "وَجِّه", "yöneltmek", "تَفْعِيلٌ", "m", "Mezîdde vâv düşmez: يُوَجِّهُ، وَجِّهْ."),
  NV("وَزَّعَ", "وَزَّع", "ُ", "وَزِّع", "وَزِّع", "dağıtmak", "تَفْعِيلٌ", "m", "Mezîdde vâv düşmez: يُوَزِّعُ، وَزِّعْ."),
  NV("وَافَقَ", "وَافَق", "ُ", "وَافِق", "وَافِق", "uygun düşmek, kabul etmek", "مُفَاعَلَةٌ", "m", "Mezîdde vâv düşmez: يُوَافِقُ، وَافِقْ."),
  NV("اِتَّصَلَ", "اِتَّصَل", "َ", "تَّصِل", "اِتَّصِل", "bağlantı kurmak", "اِفْتِعَالٌ", "m", "İfti’âlde vâv تَ olur ve idğam edilir: اِوْتَصَلَ ← اِتَّصَلَ."),
  NV("اِتَّسَعَ", "اِتَّسَع", "َ", "تَّسِع", "اِتَّسِع", "genişlemek", "اِفْتِعَالٌ", "m", "İfti’âlde vâv تَ olur ve idğam edilir: اِوْتَسَعَ ← اِتَّسَعَ."),
  NV("تَوَجَّهَ", "تَوَجَّه", "َ", "تَوَجَّه", "تَوَجَّه", "yönelmek", "تَفَعُّلٌ", "m", "Mezîdde vâv düşmez: يَتَوَجَّهُ، تَوَجَّهْ."),
  NV("تَوَاضَعَ", "تَوَاضَع", "َ", "تَوَاضَع", "تَوَاضَع", "alçakgönüllü olmak", "تَفَاعُلٌ", "m", "Mezîdde vâv düşmez: يَتَوَاضَعُ، تَوَاضَعْ."),
  NV("اِسْتَيْقَظَ", "اِسْتَيْقَظ", "َ", "سْتَيْقِظ", "اِسْتَيْقِظ", "uyanmak", "اِسْتِفْعَالٌ", "m", "Yâ yerinde kalır: يَسْتَيْقِظُ، اِسْتَيْقِظْ."),
  NV("اِسْتَوْقَفَ", "اِسْتَوْقَف", "َ", "سْتَوْقِف", "اِسْتَوْقِف", "durdurmak (durmasını istemek)", "اِسْتِفْعَالٌ", "m", "Vâv yerinde kalır: يَسْتَوْقِفُ؛ masdarda esreden sonra yâ olur: اِسْتِيقَافٌ.")
];
function V(m) { return VERBS.filter(function (v) { return v.m === m; })[0]; }
function SUL_V(v) { return typeof v.bab === "number"; }
function VAVI(v) { return v.k !== "y" && ["أَيْقَنَ", "اِسْتَيْقَظَ"].indexOf(v.m) < 0; }
function TUR(v) { return v.k === "d" ? "vâvî · vâv düşer" : v.k === "k" ? "vâvî · vâv düşmez" : v.k === "y" ? "yâî · yâ düşmez" : (VAVI(v) ? "vâvî" : "yâî") + " · mezîd"; }
function MAZ(v) { return MSUF.map(function (s) { return v.ms + s; }); }
function MUZ(v) { return USUF.map(function (s, i) { return UPRE[i] + v.uv + v.us + s; }); }
function EMR(v) { return ESUF.map(function (s) { return v.es + s; }); }
function CONJ(v, t) { return t === "m" ? MAZ(v) : t === "u" ? MUZ(v) : EMR(v); }
// Renkli yazım: vâv / yâ (ya da düştüğü yer) renklenir
function clusters(w) { var out = []; for (var i = 0; i < w.length; i++) { if (/[ً-ْٰ]/.test(w[i]) && out.length) out[out.length - 1] += w[i]; else out.push(w[i]); } return out; }
function colorStem(stem, rest) {
  var c = clusters(stem), hit = -1, i;
  for (i = 0; i < c.length && hit < 0; i++) if (/[وي]/.test(c[i])) hit = i;
  for (i = 0; i < c.length && hit < 0; i++) if (/تّ/.test(c[i])) hit = i;
  if (hit < 0) hit = 0;
  return c.slice(0, hit).join("") + '<b class="cend">' + c[hit] + '</b>' + c.slice(hit + 1).join("") + rest;
}
function CONJ_HTML(v, t) {
  if (t === "m") return MSUF.map(function (s) { return colorStem(v.ms, s); });
  if (t === "u") return USUF.map(function (s, i) { return UPRE[i] + v.uv + colorStem(v.us, s); });
  return ESUF.map(function (s) { return colorStem(v.es, s); });
}
// Tablo şaşırtıcıları (sık yapılan yanlışlar)
function DIST(v, t) {
  var d, ms = v.ms, us = v.us, es = v.es, p = "ي" + v.uv;
  if (t === "m") d = (v.k === "d" ? [us + "ْتُ"] : []).concat([ms + "َتُ", ms + "ُونَ", ms + "َنَ", ms + "ْتِي"]);
  else if (t === "u") d = (v.k === "d" ? ["يَوْ" + us + "ُ", "تَوْ" + us + "ِينَ"] : v.k === "k" || v.k === "y" ? ["يَ" + us.slice(2) + "ُ"] : []).concat([p + us + "ِينَ", "ت" + v.uv + us + "ُوا", p + us + "َنَ"]);
  else d = (v.k === "d" ? ["اِوْ" + us + "ْ", "اِوْ" + us + "ِي"] : []).concat([es + "ُ", es + "ُونَ", es + "ِينَ", es + "َنَ"]);
  var ok = CONJ(v, t);
  return d.filter(function (x, i, a) { return ok.indexOf(x) < 0 && a.indexOf(x) === i; });
}
var BAB = { 2: ["ضَرَبَ – يَضْرِبُ", "2. bâb (ayn esreli)"], 3: ["فَتَحَ – يَفْتَحُ", "3. bâb (ayn üstünlü)"], 4: ["عَلِمَ – يَعْلَمُ", "4. bâb (mâzide esre, muzâride üstün)"], 6: ["حَسِبَ – يَحْسِبُ", "6. bâb (iki tarafta esre)"] };
function NOTE(v, t) {
  var c = CONJ(v, t);
  if (t === "m") return "Mâzide misâl fiil sâlim gibi çekilir; " + (v.k === "y" ? "yâ" : "vâv") + " yerinde kalır: " + c[0] + "، " + c[2] + "، " + c[12] + "." + (v.k === "m" ? " " + v.nt : "");
  if (v.k === "m") return v.nt + " " + c[0] + "، " + c[2] + "، " + c[5] + ".";
  if (t === "u") {
    if (v.k === "d") return "Muzâride vâv düşer: " + c[0] + " (يَوْ… değil)، " + c[2] + "، " + c[9] + "، " + c[12] + ".";
    if (v.k === "k") return "4. bâbda vâv düşmez: " + c[0] + "، " + c[2] + "، " + c[12] + ".";
    return "Yâî misâlde yâ düşmez: " + c[0] + "، " + c[2] + "، " + c[12] + ".";
  }
  if (v.k === "d") return "Emirde de vâv düşer; vasl elifine gerek kalmaz: " + c[0] + "، " + c[2] + "، " + c[3] + "، " + c[5] + ".";
  if (v.k === "k") return "Vâv düşmez; vasl elifinin esresinden sonra yâya döner: " + c[0] + "، " + c[2] + ".";
  return "Yâ düşmez; başa vasl elifi gelir: " + c[0] + "، " + c[2] + "، " + c[3] + ".";
}

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CB2(q, slots, mid, tail, i, tr, why) {
  var parts = [], ok = [];
  slots.forEach(function (s, si) { var r = ROT(s, i + si); parts.push(r); ok.push(r.a); if (si < slots.length - 1 && mid) parts.push(mid); });
  if (tail) parts.push(tail);
  return { q: q, p: parts, ok: [ok], tr: tr, why: why };
}
function CBP(parts, i, tr, why) {
  var p = [], ok = [], si = 0;
  parts.forEach(function (x) { if (typeof x === "string") p.push(x); else { var r = ROT(x, i + si++); p.push(r); ok.push(r.a); } });
  return { q: "", p: p, ok: [ok], tr: tr, why: why };
}
function pickOther(arr, i, avoid) { for (var k = 1; k < arr.length; k++) { var x = arr[(i + k * 3) % arr.length]; if (avoid.indexOf(x) < 0) return x; } return arr[(i + 1) % arr.length]; }

function TBL(m, t) { return { v: m, t: t }; }
// Boş tablo: [verilen, sütun (0 mâzi, 1 muzâri, 2 emir), [[doğru, y1, y2] × 2]]
var DCOL = ["Mâzi", "Muzâri", "Emir"];
function FT(rows) { return rows.map(function (r, i) { var cols = [0, 1, 2].filter(function (c) { return c !== r[1]; }); return CB2(DCOL[r[1]] + ": " + r[0], r[2], "·", "", i, cols.map(function (c) { return DCOL[c]; }).join(" · "), r[2].map(function (s) { return s[0]; }).join(" · ")); }); }
var FT1 = [
  ["وَدَعَ", 0, [["يَدَعُ", "يَوْدَعُ", "يَدِعُ"], ["دَعْ", "اِوْدَعْ", "دِعْ"]]], ["يَعِدُ", 1, [["وَعَدَ", "عَدَ", "وَعِدَ"], ["عِدْ", "عَدْ", "اِوْعِدْ"]]],
  ["زِنْ", 2, [["وَزَنَ", "زَنَ", "وَزِنَ"], ["يَزِنُ", "يَوْزِنُ", "يَزَنُ"]]], ["وَصَفَ", 0, [["يَصِفُ", "يَوْصِفُ", "يَصَفُ"], ["صِفْ", "صَفْ", "اِوْصِفْ"]]],
  ["يَهَبُ", 1, [["وَهَبَ", "هَبَ", "وَهِبَ"], ["هَبْ", "هِبْ", "اِوْهَبْ"]]], ["رِدْ", 2, [["وَرَدَ", "رَدَ", "وَرِدَ"], ["يَرِدُ", "يَرُدُّ", "يَوْرِدُ"]]],
  ["وَقَعَ", 0, [["يَقَعُ", "يَقِعُ", "يَوْقَعُ"], ["قَعْ", "قِعْ", "اِوْقَعْ"]]]
];
var FT2 = [
  ["وَظِّفْ", 2, [["وَظَّفَ", "أَوْظَفَ", "تَوَظَّفَ"], ["يُوَظِّفُ", "يَظِّفُ", "يَتَوَظَّفُ"]]], ["وَاجِهْ", 2, [["وَاجَهَ", "وَجَّهَ", "تَوَاجَهَ"], ["يُوَاجِهُ", "يُوَاجَهُ", "يَجِهُ"]]],
  ["وَكَّلَ", 0, [["يُوَكِّلُ", "يَكِلُ", "يُوَكَّلُ"], ["وَكِّلْ", "كِلْ", "وَكَّلْ"]]], ["يُورِدُ", 1, [["أَوْرَدَ", "وَرَدَ", "وَرَّدَ"], ["أَوْرِدْ", "رِدْ", "أُورِدْ"]]],
  ["وَاظَبَ", 0, [["يُوَاظِبُ", "يَظِبُ", "يُوَاظَبُ"], ["وَاظِبْ", "وَاظَبْ", "ظِبْ"]]]
];
var FT3 = [
  ["يَتَوَجَّهُ", 1, [["تَوَجَّهَ", "وَجَّهَ", "تَوَجِّهَ"], ["تَوَجَّهْ", "تَوَجِّهْ", "وَجِّهْ"]]], ["تَوَارَثْ", 2, [["تَوَارَثَ", "وَرِثَ", "وَارَثَ"], ["يَتَوَارَثُ", "يُوَارِثُ", "يَتَوَارِثُ"]]],
  ["اِتَّجَهَ", 0, [["يَتَّجِهُ", "يَوْتَجِهُ", "يَجِهُ"], ["اِتَّجِهْ", "اِتَّجَهْ", "جِهْ"]]], ["تَوَقَّفْ", 2, [["تَوَقَّفَ", "وَقَفَ", "أَوْقَفَ"], ["يَتَوَقَّفُ", "يَقِفُ", "يُوقِفُ"]]],
  ["اِسْتَيْقَظَ", 0, [["يَسْتَيْقِظُ", "يَسْتَيْقَظُ", "يَسْتَقِظُ"], ["اِسْتَيْقِظْ", "اِسْتَيْقَظْ", "اِسْتَقِظْ"]]]
];
// Mezîd misâl tablosu: [bâb, mâzi, muzâri, emir, ism-i fâil, ism-i mef’ûl, masdar]
var MZH = ["Bâb", "Mâzi", "Muzâri", "Emir", "İsm-i fâil", "İsm-i mef’ûl", "Masdar"];
var MZT = [
  ["إِفْعَالٌ", "أَوْقَفَ", "يُوقِفُ", "أَوْقِفْ", "مُوقِفٌ", "مُوقَفٌ", "إِيقَافٌ"], ["تَفْعِيلٌ", "وَجَّهَ", "يُوَجِّهُ", "وَجِّهْ", "مُوَجِّهٌ", "مُوَجَّهٌ", "تَوْجِيهٌ"],
  ["مُفَاعَلَةٌ", "وَاصَلَ", "يُوَاصِلُ", "وَاصِلْ", "مُوَاصِلٌ", "مُوَاصَلٌ", "مُوَاصَلَةٌ"], ["اِفْتِعَالٌ", "اِتَّصَلَ", "يَتَّصِلُ", "اِتَّصِلْ", "مُتَّصِلٌ", "مُتَّصَلٌ (بِهِ)", "اِتِّصَالٌ"],
  ["تَفَعُّلٌ", "تَوَجَّهَ", "يَتَوَجَّهُ", "تَوَجَّهْ", "مُتَوَجِّهٌ", "مُتَوَجَّهٌ (إِلَيْهِ)", "تَوَجُّهٌ"], ["تَفَاعُلٌ", "تَوَاضَعَ", "يَتَوَاضَعُ", "تَوَاضَعْ", "مُتَوَاضِعٌ", "مُتَوَاضَعٌ (لَهُ)", "تَوَاضُعٌ"],
  ["اِسْتِفْعَالٌ", "اِسْتَيْقَظَ", "يَسْتَيْقِظُ", "اِسْتَيْقِظْ", "مُسْتَيْقِظٌ", "مُسْتَيْقَظٌ", "اِسْتِيقَاظٌ"]
];
var MZB = [
  ["إِفْعَالٌ", "أَوْصَلَ", "يُوصِلُ", "أَوْصِلْ", "مُوصِلٌ", "مُوصَلٌ", "إِيصَالٌ", [["يَصِلُ", "يُوْصَلُ"], ["صِلْ", "أُوصِلْ"], ["مُوصَلٌ", "وَاصِلٌ"], ["مُوصِلٌ", "مَوْصُولٌ"], ["إِوْصَالٌ", "وُصُولٌ"]]],
  ["تَفْعِيلٌ", "وَزَّعَ", "يُوَزِّعُ", "وَزِّعْ", "مُوَزِّعٌ", "مُوَزَّعٌ", "تَوْزِيعٌ", [["يُزِّعُ", "يَوَزَّعُ"], ["زِّعْ", "وَزَّعْ"], ["مُوَزَّعٌ", "وَازِعٌ"], ["مُوَزِّعٌ", "مَوْزُوعٌ"], ["وَزْعٌ", "تَوَزُّعٌ"]]],
  ["مُفَاعَلَةٌ", "وَافَقَ", "يُوَافِقُ", "وَافِقْ", "مُوَافِقٌ", "مُوَافَقٌ", "مُوَافَقَةٌ", [["يَفِقُ", "يُوَافَقُ"], ["فِقْ", "وَافَقْ"], ["مُوَافَقٌ", "وَافِقٌ"], ["مُوَافِقٌ", "مَوْفُوقٌ"], ["تَوَافُقٌ", "إِيفَاقٌ"]]],
  ["اِفْتِعَالٌ", "اِتَّسَعَ", "يَتَّسِعُ", "اِتَّسِعْ", "مُتَّسِعٌ", "مُتَّسَعٌ", "اِتِّسَاعٌ", [["يَوْتَسِعُ", "يَسَعُ"], ["اِوْتَسِعْ", "سَعْ"], ["مُوتَسِعٌ", "وَاسِعٌ"], ["مُتَّسِعٌ", "مَوْسُوعٌ"], ["اِوْتِسَاعٌ", "سَعَةٌ"]]],
  ["تَفَعُّلٌ", "تَوَكَّلَ", "يَتَوَكَّلُ", "تَوَكَّلْ", "مُتَوَكِّلٌ", "مُتَوَكَّلٌ", "تَوَكُّلٌ", [["يَتَوَكِّلُ", "يُوَكِّلُ"], ["تَوَكِّلْ", "وَكِّلْ"], ["مُتَوَكَّلٌ", "مُوَكِّلٌ"], ["مُتَوَكِّلٌ", "مَوْكُولٌ"], ["تَوْكِيلٌ", "وَكَالَةٌ"]]],
  ["تَفَاعُلٌ", "تَوَاصَلَ", "يَتَوَاصَلُ", "تَوَاصَلْ", "مُتَوَاصِلٌ", "مُتَوَاصَلٌ", "تَوَاصُلٌ", [["يَتَوَاصِلُ", "يُوَاصِلُ"], ["تَوَاصِلْ", "وَاصِلْ"], ["مُتَوَاصَلٌ", "مُوَاصِلٌ"], ["مُتَوَاصِلٌ", "مُوَاصَلٌ"], ["مُوَاصَلَةٌ", "اِتِّصَالٌ"]]],
  ["اِسْتِفْعَالٌ", "اِسْتَوْقَفَ", "يَسْتَوْقِفُ", "اِسْتَوْقِفْ", "مُسْتَوْقِفٌ", "مُسْتَوْقَفٌ", "اِسْتِيقَافٌ", [["يَسْتَوْقَفُ", "يَسْتَقِفُ"], ["اِسْتَقِفْ", "اِسْتَوْقَفْ"], ["مُسْتَوْقَفٌ", "مُوقِفٌ"], ["مُسْتَوْقِفٌ", "مَوْقُوفٌ"], ["اِسْتِوْقَافٌ", "إِيقَافٌ"]]]
];
function mzCombo(r, i) {
  var cols = [2, 3, 4, 5, 6];
  return CB2(r[0] + " · " + r[1], cols.map(function (c, k) { var o = [r[c]]; r[7][k].forEach(function (x) { if (o.indexOf(x) < 0) o.push(x); }); return o.slice(0, 3); }), "·", "", i, cols.map(function (c) { return MZH[c]; }).join(" · "), cols.map(function (c) { return r[c]; }).join(" · "));
}
// 6. alıştırma: وَصَلَ'i zamire göre mâzi ve muzâride çek
function wcb(pi, place, n) {
  var v = V("وَصَلَ"), mz = MAZ(v), mu = MUZ(v), fm = mz[pi], fu = mu[pi];
  var dm = DIST(v, "m").concat(mz).filter(function (x, i, a) { return x !== fm && a.indexOf(x) === i; });
  var du = DIST(v, "u").concat(mu).filter(function (x, i, a) { return x !== fu && a.indexOf(x) === i; });
  var m1 = dm[n % 3], m2 = pickOther(dm, n + 4, [m1]), u1 = du[(n + 1) % 3], u2 = pickOther(du, n + 5, [u1]);
  var tail = " إِلَى " + place + " صَبَاحًا.";
  return CBP(["(" + PER[pi] + ")", [fm, m1, m2], tail + " ←", [fu, u1, u2], tail], n, PER_TR[pi] + ": ulaştı · ulaşıyor", fm + " ← " + fu + ".");
}

var UNITS = [
// ---------------------------------------------------------------- 1 · NEDİR
{
  id: "u1", no: 1, ar: "الفِعْلُ المِثَالُ", tr: "Misâl Fiil Nedir?", short: "Nedir?", col: "cerr", legend: ["cerr"],
  goals: ["Misâl fiilin ilk asıl harfinin و ya da ي olduğunu bilmek: وَقَفَ (و ق ف)، يَئِسَ (ي ء س)", "Vâvî ve yâî misâli ayırmak: وَضَعَ / يَئِسَ", "Mezîd biçimde de kökü bulmak: أَوْقَفَ، وَجَّهَ، اِتَّصَلَ (و ص ل)، اِسْتَيْقَظَ (ي ق ظ)"],
  examples: [
    { s: "وَقَفَ:cerr / الإِمَامُ أَمَامَ المُصَلِّينَ.:-", tr: "İmam cemaatin önünde durdu.", pair: "يَقِفُ:cerr / الإِمَامُ أَمَامَ المُصَلِّينَ.:-", pairTr: "İmam cemaatin önünde duruyor." },
    { s: "وَضَعَ:cerr / الأُسْتَاذُ الحَقِيبَةَ عَلَى المِنْضَدَةِ.:-", tr: "Hoca çantayı masanın üstüne koydu.", pair: "يَضَعُ:cerr / الأُسْتَاذُ الحَقِيبَةَ عَلَى المِنْضَدَةِ.:-", pairTr: "Hoca çantayı masanın üstüne koyuyor." },
    { s: "يَئِسَ:cerr / عَلِيٌّ مِنْ وُصُولِ الطَّائِرَةِ.:-", tr: "Ali uçağın gelmesinden ümidini kesti.", pair: "يَيْأَسُ:cerr / عَلِيٌّ مِنْ وُصُولِ الطَّائِرَةِ.:-", pairTr: "Ali uçağın gelmesinden ümidini kesiyor." }
  ],
  rules: [
    { tr: "<b class=\"r-cerr\">Misâl fiil</b> (<span class=\"ar\">الفِعْلُ المِثَالُ</span>): ilk asıl harfi <b>و</b> ya da <b>ي</b> olan fiildir. Sâlim fiile “benzediği” (misl) için bu adı alır: çoğu çekimde sâlim gibidir." },
    { tr: "İki çeşidi vardır:", ex: ["Vâvî (وَاوِيٌّ): وَقَفَ، وَضَعَ، وَعَدَ، وَجَدَ", "Yâî (يَائِيٌّ): يَئِسَ، يَبِسَ، يَقِظَ"] },
    { tr: "Mezîdde kökü bul: <span class=\"ar\">أَوْقَفَ (و ق ف)، وَجَّهَ (و ج ه)، اِتَّصَلَ (و ص ل)، اِسْتَيْقَظَ (ي ق ظ)، يُوقِنُ (ي ق ن)</span>." },
    { tr: "Dikkat: ilk harfi hemze olan (<span class=\"ar\">أَكَلَ</span>) mehmûzdur; ortası illetli (<span class=\"ar\">قَالَ</span>) ecvef, sonu illetli (<span class=\"ar\">رَمَى</span>) nâkıstır." }
  ],
  kaide: [
    "١ ـ الفِعْلُ المِثَالُ: هُوَ مَا كَانَ أَوَّلُ حُرُوفِهِ الأَصْلِيَّةِ (الوَاوَ) أَوِ (اليَاءَ)، مِثْلُ: وَضَعَ المُوَظَّفُ النُّقُودَ فِي الصُّنْدُوقِ. يَئِسَ عَلِيٌّ مِنْ وُصُولِ الطَّائِرَةِ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "ضَعْ خَطًّا تَحْتَ الفِعْلِ المِثَالِ فِي الآيَاتِ الكَرِيمَةِ التَّالِيَةِ", tr: "Misâl fiillere dokun.", items: [
      W("أَفَلَا يَتَدَبَّرُونَ القُرْآنَ وَلَوْ كَانَ مِنْ عِنْدِ غَيْرِ اللهِ لَ[وَجَدُوا] فِيهِ اخْتِلَافًا كَثِيرًا", "Kur’an’ı düşünmüyorlar mı? Eğer Allah’tan başkası katından olsaydı, onda birçok çelişki bulurlardı. (Nisâ 82)", "وَجَدُوا: وَجَدَ – يَجِدُ (و ج د)."),
      W("فَلَمَّا دَخَلَ عَلَيْهَا زَكَرِيَّا المِحْرَابَ [وَجَدَ] عِنْدَهَا رِزْقًا قَالَ يَا مَرْيَمُ أَنَّى لَكِ هَذَا قَالَتْ هُوَ مِنْ عِنْدِ اللهِ إِنَّ اللهَ يَرْزُقُ مَنْ يَشَاءُ بِغَيْرِ حِسَابٍ", "Zekeriyyâ mihraba her girişinde yanında bir rızık bulurdu… (Âl-i İmrân 37)", "وَجَدَ. قَالَ، يَشَاءُ ecvef; يَرْزُقُ sâlim."),
      W("وَإِذْ قَالَتْ أُمَّةٌ مِنْهُمْ لِمَ [تَعِظُونَ] قَوْمًا اللهُ مُهْلِكُهُمْ أَوْ مُعَذِّبُهُمْ عَذَابًا شَدِيدًا قَالُوا مَعْذِرَةً إِلَى رَبِّكُمْ وَلَعَلَّهُمْ يَتَّقُونَ", "Hani içlerinden bir topluluk: “Allah’ın helâk edeceği… bir kavme niçin öğüt veriyorsunuz?” demişti… (A’râf 164)", "تَعِظُونَ: وَعَظَ – يَعِظُ. يَتَّقُونَ (و ق ي) hem misâl hem nâkıs: lefîf-i mefrûk."),
      W("لَوْ [يَجِدُونَ] مَلْجَأً أَوْ مَغَارَاتٍ أَوْ مُدَّخَلًا لَوَلَّوْا إِلَيْهِ وَهُمْ يَجْمَحُونَ", "Bir sığınak, mağaralar ya da girecek bir delik bulsalar, hemen koşarak oraya yönelirlerdi. (Tevbe 57)", "يَجِدُونَ: وَجَدَ – يَجِدُ. وَلَّوْا (و ل ي): lefîf-i mefrûk."),
      W("لِلَّهِ مُلْكُ السَّمَاوَاتِ وَالأَرْضِ يَخْلُقُ مَا يَشَاءُ [يَهَبُ] لِمَنْ يَشَاءُ إِنَاثًا وَ[يَهَبُ] لِمَنْ يَشَاءُ الذُّكُورَ", "Göklerin ve yerin mülkü Allah’ındır; dilediğini yaratır, dilediğine kız, dilediğine erkek çocuk bağışlar. (Şûrâ 49)", "يَهَبُ: وَهَبَ – يَهَبُ (3. bâb, vâv düşer)."),
      W("فَلَا وَرَبِّكَ لَا يُؤْمِنُونَ حَتَّى يُحَكِّمُوكَ فِيمَا شَجَرَ بَيْنَهُمْ ثُمَّ لَا [يَجِدُوا] فِي أَنْفُسِهِمْ حَرَجًا مِمَّا قَضَيْتَ وَيُسَلِّمُوا تَسْلِيمًا", "Hayır, Rabbine andolsun ki aralarında çıkan anlaşmazlıkta seni hakem yapıp… içlerinde bir sıkıntı duymadıkça iman etmiş olmazlar. (Nisâ 65)", "يَجِدُوا: وَجَدَ (lâ nâhiye değil, ثُمَّ ile حَتَّى'ye bağlı: mansûb)."),
      W("إِنَّ الأَرْضَ لِلَّهِ [يُورِثُهَا] مَنْ يَشَاءُ مِنْ عِبَادِهِ وَالعَاقِبَةُ لِلْمُتَّقِينَ", "Yeryüzü Allah’ındır; onu kullarından dilediğine mirasçı kılar. Sonuç takvâ sahiplerinindir. (A’râf 128)", "يُورِثُ: أَوْرَثَ (if’âl, و ر ث) mezîd misâl."),
      W("تِلْكَ الجَنَّةُ الَّتِي [نُورِثُ] مِنْ عِبَادِنَا مَنْ كَانَ تَقِيًّا", "İşte bu, kullarımızdan takvâ sahibi olanlara miras olarak vereceğimiz cennettir. (Meryem 63)", "نُورِثُ: أَوْرَثَ – يُورِثُ.")
    ]},
    { type: "classify", extra: true, opts: [["m", "Misâl", "مِثَالٌ", "cerr"], ["x", "Misâl değil", "لَيْسَ مِثَالًا", "x"]], ar: "مِثَالٌ أَمْ لَا؟", tr: "İlk asıl harf و ya da ي mi? Mezîdde kökü bul.", items: [
      ["وَقَفَ", "m", "و ق ف"], ["قَالَ", "x", "ق و ل: ecvef"], ["وَعَدَ", "m", "و ع د"], ["رَمَى", "x", "ر م ي: nâkıs"], ["يَئِسَ", "m", "ي ء س: yâî"], ["مَدَّ", "x", "م د د: muzâaf"],
      ["أَكَلَ", "x", "ء ك ل: mehmûz"], ["وَجَّهَ", "m", "و ج ه: tef’îl"], ["أَوْقَفَ", "m", "و ق ف: if’âl"], ["كَتَبَ", "x", "ك ت ب: sâlim"], ["اِتَّصَلَ", "m", "و ص ل: ifti’âl, و → ت"], ["اِسْتَيْقَظَ", "m", "ي ق ظ: istif’âl"]
    ].map(function (x) { return { s: x[0], a: x[1], why: "Kök: " + x[2] + "." }; }) },
    { type: "classify", extra: true, opts: [["w", "Vâvî", "وَاوِيٌّ", "cerr"], ["y", "Yâî", "يَائِيٌّ", "nasb"]], ar: "وَاوِيٌّ أَمْ يَائِيٌّ؟", tr: "İlk asıl harf و mu ي mi? Muzâri ve mezîd biçimlerde dikkat: يُوقِنُ'nün kökü ي ق ن.", items: [
      ["وَقَفَ", "w", "و ق ف"], ["يَئِسَ", "y", "ي ء س"], ["يَقِفُ", "w", "و ق ف (vâv düşmüş)"], ["يَبِسَ", "y", "ي ب س"], ["يَضَعُ", "w", "و ض ع (vâv düşmüş)"], ["يَيْأَسُ", "y", "ي ء س (yâ kalmış)"],
      ["يُوقِنُ", "y", "ي ق ن: ötreden sonra yâ vâva döner"], ["اِتَّصَلَ", "w", "و ص ل"], ["اِسْتَيْقَظَ", "y", "ي ق ظ"], ["تَوَاضَعَ", "w", "و ض ع"], ["يُوصِلُ", "w", "و ص ل"], ["اِتَّسَرَ", "y", "ي س ر: ifti’âlde yâ da ت olur"]
    ].map(function (x) { return { s: x[0], a: x[1], why: "Kök: " + x[2] + "." }; }) }
  ]
},
// ---------------------------------------------------------------- 2 · MÂZİ
{
  id: "u2", no: 2, ar: "تَصْرِيفُ المَاضِي المِثَالِ", tr: "Mâzinin Çekimi", short: "Mâzi", col: "nasb", legend: ["cerr"],
  goals: ["Mâzide misâl fiilde hiçbir değişiklik olmadığını bilmek: وَقَفْتُ، وَقَفُوا، وَقَفْنَ", "Fiili zamire göre çekmek: وَزَنْتَ، وَجَدَتْ، وَضَعُوا", "Cümleye uygun misâl fiili seçip doğru biçime koymak"],
  examples: [
    { s: "وَجَدْتُ:cerr / قَلَمِي فِي الحَقِيبَةِ.:-", tr: "Kalemimi çantada buldum." },
    { s: "المُشْرِكُونَ:- / وَضَعُوا:cerr / عَلَى صَدْرِ بِلَالٍ حَجَرًا كَبِيرًا.:-", tr: "Müşrikler Bilâl’in göğsüne büyük bir taş koydu." }
  ],
  rules: [
    { tr: "Misâl fiil zamirlere bağlanınca harflerinde <b>değişiklik olmaz</b>; mâzide sâlim fiil gibi çekilir:", ex: ["وَقَفَ، وَقَفَا، وَقَفُوا، وَقَفَتْ، وَقَفْنَ", "وَقَفْتَ، وَقَفْتُمْ، وَقَفْتِ، وَقَفْتُنَّ، وَقَفْتُ، وَقَفْنَا"] },
    { tr: "Yâî de aynıdır: <span class=\"ar\">يَئِسْتُ، يَئِسُوا، يَئِسْنَ</span>. Mezîd de: <span class=\"ar\">أَوْقَفْتُ، وَزَّعْنَا، اِتَّصَلُوا</span>." },
    { tr: "Tuzak: mâzide vâv <b>düşmez</b>. <span class=\"ar\">قِفْتُ</span> yanlış, <span class=\"ar\">وَقَفْتُ</span> doğru." }
  ],
  kaide: ["٤ ـ لَا يَحْدُثُ تَغْيِيرٌ فِي حُرُوفِ الفِعْلِ المِثَالِ عِنْدَ إِسْنَادِهِ إِلَى ضَمَائِرِ الرَّفْعِ فِي صِيغَةِ المَاضِي أَوِ المُضَارِعِ أَوِ الأَمْرِ، مِثْلُ: وَجَدْتُ قَلَمِي فِي الحَقِيبَةِ."],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "أَعِدْ كِتَابَةَ الجُمَلِ التَّالِيَةِ مُسْنِدًا الفِعْلَ المِثَالَ إِلَى الضَّمِيرِ الَّذِي بَيْنَ القَوْسَيْنِ", tr: "Fiili parantezdeki zamire göre çek.", exHtml: "<span class=\"ar\">وَزَنَ التُّفَّاحَ بِالمِيزَانِ. (أَنْتَ) ← وَزَنْتَ التُّفَّاحَ بِالمِيزَانِ.</span>", items: PL([
      ["وَصَلَ إِلَى الشَّرِكَةِ. (هُمَا) ← ___ إِلَى الشَّرِكَةِ.", "وَصَلَا", "وَصَلَتَا", "صِلَا", "İkisi şirkete ulaştı.", "هُمَا: وَصَلَا."],
      ["وَجَدَ سَاعَتَهُ فِي غُرْفَةِ الجُلُوسِ. (هِيَ) ← ___ سَاعَتَهَا فِي غُرْفَةِ الجُلُوسِ.", "وَجَدَتْ", "وَجَدْتِ", "جَدَتْ", "(Kadın) saatini oturma odasında buldu.", "هِيَ: وَجَدَتْ; mâzide vâv düşmez."],
      ["وَضَعَ الأَدْوِيَةَ أَمَامَ المَرِيضِ. (هُمْ) ← ___ الأَدْوِيَةَ أَمَامَ المَرِيضِ.", "وَضَعُوا", "وَضَعْنَ", "ضَعُوا", "İlaçları hastanın önüne koydular.", "هُمْ: وَضَعُوا (ضَعُوا emirdir)."],
      ["وَجَدَ اسْمَهُ فِي قَائِمَةِ النَّاجِحِينَ فَطَارَ فَرَحًا. (أَنَا) ← ___ اسْمِي فِي قَائِمَةِ النَّاجِحِينَ فَطِرْتُ فَرَحًا.", "وَجَدْتُ", "وَجَدَتْ", "جِدْتُ", "Adımı başarılılar listesinde buldum, sevinçten uçtum.", "أَنَا: وَجَدْتُ. طَارَ ecvef: طِرْتُ."],
      ["سَيَصِلُ إِلَى الحَقْلِ بَعْدَ سَاعَةٍ. (أَنْتُمْ) ← ___ إِلَى الحَقْلِ بَعْدَ سَاعَةٍ.", "سَتَصِلُونَ", "سَتَوْصِلُونَ", "سَيَصِلُونَ", "Bir saat sonra tarlaya varacaksınız.", "أَنْتُمْ: تَصِلُونَ; vâv düşer."],
      ["يَيْأَسُ مِنْ وُصُولِ القِطَارِ. (أَنَا) ← ___ مِنْ وُصُولِ القِطَارِ.", "أَيْأَسُ", "أَأَسُ", "يَيْأَسُ", "Trenin gelmesinden ümidimi kesiyorum.", "أَنَا: أَيْأَسُ; yâ düşmez."],
      ["يَضَعُ المُنَبِّهَ بِجَانِبِهِ. (أَنْتِ) ← ___ المُنَبِّهَ بِجَانِبِكِ.", "تَضَعِينَ", "تَوْضَعِينَ", "تَضَعِي", "Çalar saati yanına koyuyorsun (kadın).", "أَنْتِ: تَضَعِينَ."],
      ["يَدَعُ الحَقَائِبَ فِي المَدْرَسَةِ. (هُنَّ) ← ___ الحَقَائِبَ فِي المَدْرَسَةِ.", "يَدَعْنَ", "يَدَعُونَ", "تَدَعِينَ", "Çantaları okulda bırakıyorlar (kadınlar).", "هُنَّ: يَدَعْنَ."]
    ])},
    { type: "bank", num: "٤", ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ مِثَالٍ مُنَاسِبٍ: (وَصَلَ – وَضَعَ – يَبِسَ – وَجَدَ – وَهَبَ – وَضَعَ – يَئِسَ – وَجَبَ)", tr: "Önce aşağıdan bir biçim seç, sonra uygun boşluğa dokun. Her biçim bir kez kullanılır.",
      bank: ["وَضَعُوا", "يَصِلُونَ", "وَجَدْتُهَا", "يَبِسَا", "يَضَعُ", "وَجَبَ", "يَيْأَسُونَ", "وَهَبَتِ"], items: [
      { pre: "التُّفَّاحُ وَالكُمَّثْرَى", h: "تَحْتَ الشَّمْسِ.", a: [3], tr: "Elma ve armut güneşin altında kurudu.", why: "هُمَا: يَبِسَا." },
      { pre: "", h: "عَلَى الوَالِدَيْنِ تَرْبِيَةُ الأَوْلَادِ.", a: [5], tr: "Çocukları terbiye etmek anne babaya vâcip oldu.", why: "Fiil başta, fâil müzekker: وَجَبَ." },
      { pre: "العُمَّالُ", h: "إِلَى بُيُوتِهِمُ السَّاعَةَ السَّابِعَةَ كُلَّ يَوْمٍ.", a: [1], tr: "İşçiler her gün saat yedide evlerine varıyor.", why: "هُمْ (muzâri): يَصِلُونَ." },
      { pre: "", h: "البَنَاتُ مَا فِي جُيُوبِهِنَّ مِنَ النُّقُودِ لِلْمُحْتَاجِينَ.", a: [7], tr: "Kızlar ceplerindeki paraları ihtiyaç sahiplerine bağışladı.", why: "Fiil başta, fâil müennes: وَهَبَتْ (ال'den önce وَهَبَتِ)." },
      { pre: "فَقَدْتُ مِحْفَظَتِي فِي حَدِيقَةِ الكُلِّيَّةِ أَمْسِ، فَـ", h: "اليَوْمَ.", a: [2], tr: "Dün cüzdanımı fakültenin bahçesinde kaybettim, bugün buldum.", why: "أَنَا: وَجَدْتُ + هَا." },
      { pre: "المُؤْمِنُونَ لَا", h: "مِنْ رَحْمَةِ اللهِ.", a: [6], tr: "Mü’minler Allah’ın rahmetinden ümit kesmez.", why: "هُمْ: يَيْأَسُونَ; yâ düşmez." },
      { pre: "المُشْرِكُونَ", h: "عَلَى صَدْرِ بِلَالٍ رَضِيَ اللهُ عَنْهُ حَجَرًا كَبِيرًا.", a: [0], tr: "Müşrikler Bilâl’in göğsüne büyük bir taş koydu.", why: "هُمْ: وَضَعُوا." },
      { pre: "المُؤَذِّنُ", h: "المُنَبِّهَ بِجَانِبِهِ كُلَّ لَيْلَةٍ.", a: [4], tr: "Müezzin her gece çalar saati yanına koyar.", why: "هُوَ (muzâri): يَضَعُ." }
    ]},
    { type: "tablo", ar: "صَرِّفِ الفِعْلَ المِثَالَ المَاضِيَ", tr: "Mâziyi çek: önce aşağıdan bir biçim seç, sonra tablodaki yerine dokun. Tuzaklar: صِلْتُ، وَصَلَتُ…", items: [TBL("وَصَلَ", "m"), TBL("وَضَعَ", "m")] },
    { type: "tablo", ar: "صَرِّفِ الفِعْلَ المِثَالَ المَزِيدَ المَاضِيَ", tr: "Mezîd misâlin mâzisi: sâlim gibi çekilir.", items: [TBL("أَوْصَلَ", "m"), TBL("وَزَّعَ", "m"), TBL("وَافَقَ", "m"), TBL("اِسْتَيْقَظَ", "m"), TBL("تَوَجَّهَ", "m"), TBL("تَوَاضَعَ", "m")] }
  ]
},
// ---------------------------------------------------------------- 3 · MUZÂRİ
{
  id: "u3", no: 3, ar: "تَصْرِيفُ المُضَارِعِ المِثَالِ", tr: "Muzârinin Çekimi", short: "Muzâri", col: "mi", legend: ["cerr"],
  goals: ["Vâvî misâlde muzâride vâvın (çoğunlukla) düştüğünü bilmek: وَقَفَ ← يَقِفُ، وَضَعَ ← يَضَعُ", "Yâî misâlde yâın düşmediğini bilmek: يَئِسَ ← يَيْأَسُ", "Vâvın düşmediği durumları tanımak: وَجِلَ ← يَوْجَلُ، وَزَّعَ ← يُوَزِّعُ"],
  examples: [
    { s: "وَعَدْتَ:cerr / الطُّلَّابَ بِالجَائِزَةِ.:-", tr: "Öğrencilere ödül sözü verdin.", pair: "تَعِدُ:cerr / الطُّلَّابَ بِالجَائِزَةِ.:-", pairTr: "Öğrencilere ödül sözü veriyorsun. (vâv düştü)" },
    { s: "يَئِسَ:cerr / الرَّجُلُ مِنْ وُصُولِ الحَافِلَةِ.:-", tr: "Adam otobüsün gelmesinden ümidini kesti.", pair: "يَيْأَسُ:cerr / الرَّجُلُ مِنْ وُصُولِ الحَافِلَةِ.:-", pairTr: "Adam otobüsün gelmesinden ümidini kesiyor. (yâ kaldı)" }
  ],
  rules: [
    { tr: "<b>Vâvî</b> misâlde muzâride vâv <b>çoğunlukla düşer</b>. Düşme, muzârinin ayn harfi esreli olan bâblarda (2 ve 6) ve bazı 3. bâb fiillerinde olur:", ex: ["وَقَفَ ← يَقِفُ، وَعَدَ ← يَعِدُ، وَصَلَ ← يَصِلُ (2. bâb)", "وَرِثَ ← يَرِثُ، وَثِقَ ← يَثِقُ (6. bâb)", "وَضَعَ ← يَضَعُ، وَهَبَ ← يَهَبُ، وَقَعَ ← يَقَعُ، وَدَعَ ← يَدَعُ (3. bâb)"] },
    { tr: "4. bâbda vâv kalır: <span class=\"ar\">وَجِلَ ← يَوْجَلُ</span>. <b>Yâî</b> misâlde yâ <b>hiç düşmez</b>: <span class=\"ar\">يَئِسَ ← يَيْأَسُ، يَبِسَ ← يَيْبَسُ</span>." },
    { tr: "Mezîdde vâv düşmez: <span class=\"ar\">وَزَّعَ ← يُوَزِّعُ، تَوَجَّهَ ← يَتَوَجَّهُ</span>. If’âlde ötreden sonra sâkin vâv uzatma harfi olur: <span class=\"ar\">أَوْقَفَ ← يُوقِفُ</span>; sâkin yâ vâva döner: <span class=\"ar\">أَيْقَنَ ← يُوقِنُ</span>." },
    { tr: "Vâv düştükten sonra çekim sâlim gibidir: <span class=\"ar\">يَقِفُ، يَقِفَانِ، يَقِفُونَ، تَقِفِينَ، يَقِفْنَ، أَقِفُ، نَقِفُ</span>." }
  ],
  kaide: [
    "٢ ـ تُحْذَفُ الوَاوُ غَالِبًا مِنَ المِثَالِ الوَاوِيِّ المَاضِي عِنْدَ تَحْوِيلِهِ إِلَى المُضَارِعِ أَوِ الأَمْرِ، مِثْلُ: وَعَدْتَ الطُّلَّابَ بِالجَائِزَةِ ← تَعِدُ الطُّلَّابَ بِالجَائِزَةِ ← عِدِ الطُّلَّابَ بِالجَائِزَةِ.",
    "٣ ـ لَا تُحْذَفُ اليَاءُ مِنَ المِثَالِ اليَائِيِّ عِنْدَ تَحْوِيلِهِ إِلَى المُضَارِعِ أَوِ الأَمْرِ، مِثْلُ: يَئِسَ الرَّجُلُ مِنْ وُصُولِ الحَافِلَةِ ← يَيْأَسُ الرَّجُلُ ← اِيْأَسْ مِنْ وُصُولِ الحَافِلَةِ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "حَوِّلِ الفِعْلَ المِثَالَ المَاضِيَ إِلَى المُضَارِعِ", tr: "Mâziyi muzâriye çevir: vâv düşer mi?", exHtml: "<span class=\"ar\">وَقَفَ النَّاسُ احْتِرَامًا لِلْعَالِمِ. ← يَقِفُ النَّاسُ احْتِرَامًا لِلْعَالِمِ.</span>", items: PL([
      ["وَصَلَ الحُجَّاجُ إِلَى المَطَارِ صَبَاحًا. ← ___ الحُجَّاجُ إِلَى المَطَارِ صَبَاحًا.", "يَصِلُ", "يَوْصِلُ", "يَصَلُ", "Hacılar sabah havaalanına varıyor.", "وَصَلَ ← يَصِلُ (2. bâb, vâv düşer)."],
      ["وَهَبْتُ لِلرَّجُلِ الفَقِيرِ مِعْطَفًا. ← ___ لِلرَّجُلِ الفَقِيرِ مِعْطَفًا.", "أَهَبُ", "أَوْهَبُ", "أَهِبُ", "Fakir adama bir palto bağışlıyorum.", "وَهَبَ ← يَهَبُ (3. bâb, vâv düşer)."],
      ["وَزَّعَ الأَغْنِيَاءُ النُّقُودَ عَلَى الفُقَرَاءِ. ← ___ الأَغْنِيَاءُ النُّقُودَ عَلَى الفُقَرَاءِ.", "يُوَزِّعُ", "يُزِّعُ", "يَزِعُ", "Zenginler paraları fakirlere dağıtıyor.", "وَزَّعَ tef’îl: mezîdde vâv düşmez."],
      ["وَجَدَ المُوَظَّفُ قَلَمَهُ فِي الحَقِيبَةِ. ← ___ المُوَظَّفُ قَلَمَهُ فِي الحَقِيبَةِ.", "يَجِدُ", "يَوْجِدُ", "يَجَدُ", "Memur kalemini çantada buluyor.", "وَجَدَ ← يَجِدُ."],
      ["وَضَعْتُ النُّقُودَ فِي مِحْفَظَتِي. ← ___ النُّقُودَ فِي مِحْفَظَتِي.", "أَضَعُ", "أَوْضَعُ", "أَضِعُ", "Paraları cüzdanıma koyuyorum.", "وَضَعَ ← يَضَعُ (3. bâb)."],
      ["وَجَبَ عَلَيْنَا أَنْ نَشْكُرَ اللهَ دَائِمًا. ← ___ عَلَيْنَا أَنْ نَشْكُرَ اللهَ دَائِمًا.", "يَجِبُ", "يَوْجِبُ", "يَجَبُ", "Allah’a daima şükretmemiz gerekir.", "وَجَبَ ← يَجِبُ."],
      ["وَقَفَتْ سَيَّارَةُ الإِسْعَافِ أَمَامَ المَدْرَسَةِ. ← ___ سَيَّارَةُ الإِسْعَافِ أَمَامَ المَدْرَسَةِ.", "تَقِفُ", "تَوْقِفُ", "يَقِفُ", "Ambulans okulun önünde duruyor.", "هِيَ: تَقِفُ."],
      ["وَعَدَ الأَبُ أَوْلَادَهُ بِحَاسُوبٍ جَدِيدٍ. ← ___ الأَبُ أَوْلَادَهُ بِحَاسُوبٍ جَدِيدٍ.", "يَعِدُ", "يَوْعِدُ", "يَعَدُ", "Baba çocuklarına yeni bir bilgisayar sözü veriyor.", "وَعَدَ ← يَعِدُ."]
    ])},
    { type: "combo", num: "٦", ar: "امْلَأِ الفَرَاغَ: هُوَ وَصَلَ إِلَى الكُلِّيَّةِ صَبَاحًا ← هُوَ يَصِلُ إِلَى الكُلِّيَّةِ صَبَاحًا", tr: "وَصَلَ'i parantezdeki zamire göre önce mâzide, sonra muzâride seç.", items: [
      [1, "المُسْتَشْفَى"], [2, "المَصْنَعِ"], [3, "المَكْتَبَةِ"], [4, "المَتْحَفِ"], [5, "المَدْرَسَةِ"], [6, "الشَّرِكَةِ"], [7, "الكُلِّيَّةِ"],
      [8, "الجَامِعَةِ"], [9, "المَيْدَانِ"], [10, "الحَقْلِ"], [11, "البُسْتَانِ"], [12, "المَزْرَعَةِ"], [13, "الحَفْلِ"]
    ].map(function (x, n) { return wcb(x[0], x[1], n); }) },
    { type: "tablo", ar: "صَرِّفِ الفِعْلَ المِثَالَ المُضَارِعَ", tr: "Muzâriyi çek: vâv bütün şahıslarda düşer. Tuzaklar: يَوْصِلُ، تَوْضَعِينَ…", items: [TBL("وَصَلَ", "u"), TBL("وَضَعَ", "u")] },
    { type: "tablo", ar: "صَرِّفِ الفِعْلَ المِثَالَ المَزِيدَ المُضَارِعَ", tr: "Mezîd misâlin muzârisi: vâv düşmez.", items: [TBL("أَوْصَلَ", "u"), TBL("وَزَّعَ", "u"), TBL("وَافَقَ", "u"), TBL("اِسْتَيْقَظَ", "u"), TBL("تَوَجَّهَ", "u"), TBL("تَوَاضَعَ", "u")] }
  ]
},
// ---------------------------------------------------------------- 4 · EMİR VE MEZÎD
{
  id: "u4", no: 4, ar: "الأَمْرُ وَالمَزِيدُ", tr: "Emir ve Mezîd Misâl", short: "Emir · mezîd", col: "ref", legend: ["cerr"],
  goals: ["Emirde vâvın düştüğünü bilmek: قِفْ، ضَعْ، عِدْ، هَبْ", "Yâî misâlin emrini yapmak: اِيْأَسْ", "Mezîd misâlin bütün biçimlerini yapmak; ifti’âlde و → ت kuralını bilmek: اِوْتَصَلَ ← اِتَّصَلَ"],
  examples: [
    { s: "قِفِ:cerr / احْتِرَامًا لِلْعَالِمِ.:-", tr: "Âlime saygıdan ayağa kalk." },
    { s: "اِيْأَسْ:cerr / مِنْ وُصُولِ الحَافِلَةِ.:-", tr: "Otobüsün gelmesinden ümidini kes." },
    { s: "وَجِّهْ:cerr / سُؤَالًا إِلَى الأُسْتَاذِ.:-", tr: "Hocaya bir soru yönelt. (mezîd: vâv düşmez)" }
  ],
  rules: [
    { tr: "Emir muzâriden yapılır. Vâvı düşen fiilde ilk harf harekeli kalır, <b>vasl elifi gelmez</b>:", ex: ["يَقِفُ ← قِفْ، قِفَا، قِفُوا، قِفِي، قِفْنَ", "يَضَعُ ← ضَعْ · يَعِدُ ← عِدْ · يَهَبُ ← هَبْ · يَزِنُ ← زِنْ"] },
    { tr: "Yâî misâlde yâ kalır, başa vasl elifi gelir: <span class=\"ar\">يَيْأَسُ ← اِيْأَسْ</span>. Vâvı düşmeyen 4. bâbda vâv esreden sonra yâ olur: <span class=\"ar\">يَوْجَلُ ← اِيجَلْ</span>." },
    { tr: "Emirden sonra ال gelirse sâkin son harf esre alır: <span class=\"ar\">قِفِ احْتِرَامًا، ضَعِ النُّقُودَ، عِدِ الطُّلَّابَ، جِدِ الكِتَابَ</span>." },
    { tr: "Mezîd misâlde vâv düşmez; tabloyu ezberle:", ex: ["أَوْقَفَ – يُوقِفُ – أَوْقِفْ – مُوقِفٌ – مُوقَفٌ – إِيقَافٌ", "İfti’âl: و (ve ي) تَ olur, idğam edilir: اِوْتَصَلَ ← اِتَّصَلَ، اِيْتَسَرَ ← اِتَّسَرَ", "Masdarda esreden sonra sâkin vâv yâ olur: إِوْقَافٌ ← إِيقَافٌ، اِسْتِوْقَافٌ ← اِسْتِيقَافٌ"] }
  ],
  kaide: ["تَصْرِيفُ فِعْلِ الأَمْرِ المِثَالِ: قِفْ – قِفَا – قِفُوا، قِفِي – قِفَا – قِفْنَ.", "مُلَاحَظَةٌ: يُبْدَلُ حَرْفُ العِلَّةِ تَاءً فِي بَابِ الافْتِعَالِ، ثُمَّ تُدْغَمُ التَّاءُ الأُولَى فِي تَاءِ «افْتَعَلَ»: اِوْتَصَلَ ← اِتَّصَلَ، اِوْتَجَهَ ← اِتَّجَهَ، اِوْتَحَدَ ← اِتَّحَدَ، اِوْتَفَقَ ← اِتَّفَقَ، اِيْتَسَرَ ← اِتَّسَرَ، اِوْتَصَفَ ← اِتَّصَفَ، اِوْتَقَى ← اِتَّقَى."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "حَوِّلِ الفِعْلَ المِثَالَ المَاضِيَ إِلَى الأَمْرِ", tr: "Mâziyi emre çevir (muhâtab: أَنْتَ).", exHtml: "<span class=\"ar\">وَقَفَ النَّاسُ احْتِرَامًا لِلْعَالِمِ. ← قِفِ احْتِرَامًا لِلْعَالِمِ.</span>", items: PL([
      ["وَضَعَ النُّقُودَ فِي جَيْبِهِ. ← ___ النُّقُودَ فِي جَيْبِكَ.", "ضَعِ", "اِوْضَعِ", "ضِعِ", "Paraları cebine koy.", "يَضَعُ ← ضَعْ; ال'den önce ضَعِ."],
      ["وَهَبَ لِوَلَدِهِ كِتَابًا. ← ___ لِوَلَدِكَ كِتَابًا.", "هَبْ", "اِوْهَبْ", "هِبْ", "Oğluna bir kitap bağışla.", "يَهَبُ ← هَبْ."],
      ["وَزَنَ لَهُ كِيلُوغِرَامًا مِنَ التُّفَّاحِ. ← ___ لَهُ كِيلُوغِرَامًا مِنَ التُّفَّاحِ.", "زِنْ", "اِوْزِنْ", "زَنْ", "Ona bir kilo elma tart.", "يَزِنُ ← زِنْ."],
      ["وَزَّعَ الهَدَايَا بَيْنَ العُمَّالِ. ← ___ الهَدَايَا بَيْنَ العُمَّالِ.", "وَزِّعِ", "زِّعِ", "وَزَّعِ", "Hediyeleri işçiler arasında dağıt.", "Tef’îl: يُوَزِّعُ ← وَزِّعْ; vâv düşmez."],
      ["وَجَّهَ سُؤَالًا إِلَى الأُسْتَاذِ. ← ___ سُؤَالًا إِلَى الأُسْتَاذِ.", "وَجِّهْ", "وَجَّهْ", "جِهْ", "Hocaya bir soru yönelt.", "Tef’îl: يُوَجِّهُ ← وَجِّهْ."],
      ["وَجَدَ الكِتَابَ فِي الصَّفِّ. ← ___ الكِتَابَ فِي الصَّفِّ.", "جِدِ", "اِوْجِدِ", "جَدِ", "Kitabı sınıfta bul.", "يَجِدُ ← جِدْ; ال'den önce جِدِ."],
      ["وَضَّحَ الدَّرْسَ بِاسْتِعْمَالِ الحَاسُوبِ. ← ___ الدَّرْسَ بِاسْتِعْمَالِ الحَاسُوبِ.", "وَضِّحِ", "ضِّحِ", "وَضَّحِ", "Dersi bilgisayar kullanarak açıkla.", "Tef’îl: يُوَضِّحُ ← وَضِّحْ."],
      ["وَعَدَ أَصْدِقَاءَهُ بِالنَّجَاحِ. ← ___ أَصْدِقَاءَكَ بِالنَّجَاحِ.", "عِدْ", "اِوْعِدْ", "عَدْ", "Arkadaşlarına başarı sözü ver.", "يَعِدُ ← عِدْ."]
    ])},
    { type: "tablo", ar: "صَرِّفْ فِعْلَ الأَمْرِ المِثَالِ", tr: "Emri çek: صِلْ، ضَعْ.", items: [TBL("وَصَلَ", "e"), TBL("وَضَعَ", "e")] },
    { type: "combo", ar: "امْلَأِ الفَرَاغَ بِالصُّورَةِ الصَّحِيحَةِ لِلْفِعْلِ المِثَالِ (١)", tr: "Verilen biçimden diğer iki sütunu seç (sırayla).", items: FT(FT1) },
    { type: "tablo", ar: "صَرِّفْ فِعْلَ الأَمْرِ المِثَالِ المَزِيدِ", tr: "Mezîd misâlin emri: أَوْصِلْ، وَزِّعْ، وَافِقْ، اِسْتَيْقِظْ، تَوَجَّهْ، تَوَاضَعْ.", items: [TBL("أَوْصَلَ", "e"), TBL("وَزَّعَ", "e"), TBL("وَافَقَ", "e"), TBL("اِسْتَيْقَظَ", "e"), TBL("تَوَجَّهَ", "e"), TBL("تَوَاضَعَ", "e")] },
    { type: "pick", ar: "يُبْدَلُ حَرْفُ العِلَّةِ تَاءً فِي بَابِ الافْتِعَالِ", tr: "İfti’âlde و / ي önce ت olur, sonra iki ت idğam edilir. Doğru biçimi seç.", items: PL([
      ["اِوْتَصَلَ ← ___", "اِتَّصَلَ", "اِيتَصَلَ", "اِتْصَلَ", "bağlantı kurdu", "و → ت: اِتْتَصَلَ ← اِتَّصَلَ."],
      ["اِوْتَجَهَ ← ___", "اِتَّجَهَ", "اِيتَجَهَ", "اِوْجَهَ", "yöneldi", "و → ت: اِتَّجَهَ."],
      ["اِوْتَحَدَ ← ___", "اِتَّحَدَ", "اِيتَحَدَ", "اِتْحَدَ", "birleşti", "و → ت: اِتَّحَدَ."],
      ["اِوْتَفَقَ ← ___", "اِتَّفَقَ", "اِيتَفَقَ", "اِتَفَقَ", "anlaştı", "و → ت: اِتَّفَقَ."],
      ["اِيْتَسَرَ ← ___", "اِتَّسَرَ", "اِيتَسَرَ", "اِسْتَرَ", "meysir oynadı (ي س ر)", "ي de ت olur: اِتَّسَرَ."],
      ["اِوْتَصَفَ ← ___", "اِتَّصَفَ", "اِيتَصَفَ", "اِتْصَفَ", "nitelendi", "و → ت: اِتَّصَفَ."],
      ["اِوْتَقَى ← ___", "اِتَّقَى", "اِيتَقَى", "اِتْقَى", "sakındı (و ق ي)", "و → ت: اِتَّقَى (lefîf-i mefrûk)."],
      ["اِوْتَسَعَ ← ___", "اِتَّسَعَ", "اِيتَسَعَ", "اِتَسَعَ", "genişledi", "و → ت: اِتَّسَعَ."]
    ])},
    { type: "combo", ar: "امْلَأِ الفَرَاغَ فِي الجَدْوَلِ الآتِي", tr: "Mâzisi verilen mezîd fiilin muzâri, emir, ism-i fâil, ism-i mef’ûl ve masdarını seç (sırayla).", items: MZB.map(mzCombo) },
    { type: "combo", ar: "امْلَأِ الفَرَاغَ بِالصُّورَةِ الصَّحِيحَةِ لِلْفِعْلِ المِثَالِ (٢)", tr: "Mezîd: verilen biçimden diğer iki sütunu seç (أَوْقَفَ satırı kitapta örnek olarak dolu).", items: FT(FT2) },
    { type: "combo", ar: "امْلَأِ الفَرَاغَ بِالصُّورَةِ الصَّحِيحَةِ لِلْفِعْلِ المِثَالِ (٣)", tr: "Mezîd: verilen biçimden diğer iki sütunu seç.", items: FT(FT3) }
  ]
},
// ---------------------------------------------------------------- 5 · OKUMALAR
{
  id: "u5", no: 5, ar: "قِرَاءَاتٌ", tr: "Okumalar", short: "Okumalar", col: "muz", legend: ["cerr"],
  goals: ["Metinde misâl fiilleri bulmak: وَجَدَ، أَدَعُ، تَضَعُونَ، يَثِقُ، وَفَدَ", "Emir, ism-i fâil ve ism-i tafdîli ayırmak: أَعْطُوا، رَاجِعُونَ، أَعْظَمُ", "Misâli muzâaftan ayırmak; ikisi birden olan وَدِدْتُ'yi tanımak"],
  examples: [
    { s: "وَاللهِ لَا:- / أَدَعُكَ:cerr", tr: "Vallahi seni bırakmam. (وَدَعَ – يَدَعُ)" },
    { s: "وَدِدْتُ:cerr / لَوْ كُنْتُ أَنَا وَالقِدْرُ فَقَطْ!:-", tr: "Keşke yalnız ben ve tencere olsaydık!" }
  ],
  rules: [
    { tr: "Metinde vâvı düşmüş misâli kökünden tanı: <span class=\"ar\">أَدَعُ (و د ع)، يَثِقُ (و ث ق)، لَمْ يَجِدْ (و ج د)</span>." },
    { tr: "<span class=\"ar\">وَدَّ (و د د)</span> hem misâl (ilk harf و) hem muzâaftır (2. ve 3. harf aynı): <span class=\"ar\">وَدِدْتُ</span>." }
  ],
  kaide: ["اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ المَطْلُوبَ."],
  ex: [
    { type: "reading", num: "٧", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ: الفِعْلَ المِثَالَ، فِعْلَ الأَمْرِ، اسْمَ الفَاعِلِ، اسْمَ المَفْعُولِ، اسْمَ التَّفْضِيلِ", tr: "Metni oku; sonra koyu kelimenin türünü seç.", title: "سَعِيدُ بْنُ عَامِرٍ",
      text: "صَاحَ عُمَرُ: قَدْ وَجَدْتُهُ! إِلَيَّ بِسَعِيدِ بْنِ عَامِرٍ! وَيَأْتِي سَعِيدُ بْنُ عَامِرٍ إِلَى أَمِيرِ المُؤْمِنِينَ عُمَرَ، وَيَعْرِضُ عَلَيْهِ الخَلِيفَةُ وِلَايَةَ حِمْصَ، وَلَكِنَّ سَعِيدًا يَعْتَذِرُ وَيَقُولُ لَهُ: «لَا تَفْتِنِّي يَا أَمِيرَ المُؤْمِنِينَ». فَيَصِيحُ عُمَرُ بِهِ: «وَاللهِ لَا أَدَعُكَ. أَتَضَعُونَ أَمَانَتَكُمْ وَخِلَافَتَكُمْ فِي عُنُقِي وَتَتْرُكُونَنِي؟» وَاقْتَنَعَ سَعِيدُ بْنُ عَامِرٍ بِالأَمْرِ حِينَمَا وَجَدَ إِصْرَارَ عُمَرَ. وَلَمْ يَمُرَّ وَقْتٌ طَوِيلٌ حَتَّى وَفَدَ عَلَى أَمِيرِ المُؤْمِنِينَ بَعْضُ مَنْ يَثِقُ بِهِمْ مِنْ أَهْلِ حِمْصَ، فَقَالَ لَهُمْ: «اُكْتُبُوا لِي أَسْمَاءَ فُقَرَائِكُمْ حَتَّى أَسُدَّ حَاجَتَهُمْ». فَكَتَبُوا إِلَيْهِ أَسْمَاءَ فُقَرَائِهِمْ، فَكَانَ مِنْهُمْ سَعِيدُ بْنُ عَامِرٍ. فَسَأَلَهُمْ عُمَرُ: «وَمَنْ سَعِيدُ بْنُ عَامِرٍ؟» فَقَالُوا: «أَمِيرُنَا». قَالَ: «أَمِيرُكُمْ فَقِيرٌ؟» فَقَالُوا: «نَعَمْ، وَوَاللهِ إِنَّهُ لَتَمُرُّ الأَيَّامُ الطِّوَالُ وَلَا تُوقَدُ فِي بَيْتِهِ نَارٌ!» فَبَكَى عُمَرُ، ثُمَّ وَضَعَ أَلْفَ دِينَارٍ فِي صُرَّةٍ وَقَالَ لَهُمْ: «أَعْطُوهُ هَذَا المَالَ لِيَعِيشَ مِنْهُ». وَجَاءَ الوَفْدُ إِلَى سَعِيدِ بْنِ عَامِرٍ بِالصُّرَّةِ، فَنَظَرَ إِلَيْهَا وَقَالَ: «إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ»، كَأَنَّمَا أَصَابَتْهُ مُصِيبَةٌ. وَسَأَلَتْهُ زَوْجَتُهُ: «مَا الأَمْرُ يَا سَعِيدُ؟ أَمَاتَ أَمِيرُ المُؤْمِنِينَ؟» قَالَ: «بَلْ أَعْظَمُ مِنْ ذَلِكَ؛ دَخَلَتْ عَلَيَّ الدُّنْيَا لِتُفْسِدَ آخِرَتِي». قَالَتْ: «تَخَلَّصْ مِنْهَا»، وَهِيَ لَا تَدْرِي مِنْ أَمْرِ هَذِهِ الدَّنَانِيرِ شَيْئًا. قَالَ: «أَوَتُسَاعِدِينَنِي عَلَى ذَلِكَ؟» قَالَتْ: «نَعَمْ». فَوَزَّعَ الدَّنَانِيرَ عَلَى فُقَرَاءِ حِمْصَ.",
      textTr: "Ömer “Buldum onu! Saîd b. Âmir’i bana getirin!” diye seslendi. Saîd b. Âmir Mü’minlerin Emîri Ömer’e gelir; Halife ona Humus valiliğini teklif eder. Saîd özür diler: “Beni fitneye düşürme, ey Mü’minlerin Emîri!” Ömer ona çıkışır: “Vallahi seni bırakmam! Emanetinizi ve hilâfetinizi boynuma yükleyip beni yalnız mı bırakacaksınız?” Saîd, Ömer’in ısrarını görünce razı oldu. Çok geçmeden Humus halkından güvendiği bazı kimseler Ömer’e geldi. Onlara: “Fakirlerinizin adlarını bana yazın da ihtiyaçlarını gidereyim” dedi. Yazdılar; aralarında Saîd b. Âmir de vardı. Ömer: “Saîd b. Âmir kim?” diye sordu. “Valimiz” dediler. “Valiniz fakir mi?” “Evet; vallahi uzun günler geçer de evinde ateş yakılmaz!” Ömer ağladı, bir keseye bin dinar koyup: “Bu malı ona verin, onunla geçinsin” dedi. Heyet keseyi Saîd’e getirdi. Ona baktı ve “Biz Allah’a aidiz ve O’na döneceğiz” dedi, sanki başına bir musibet gelmişti. Karısı: “Ne oldu Saîd? Mü’minlerin Emîri mi öldü?” diye sordu. “Daha büyüğü: âhiretimi bozmak için dünya üzerime girdi.” Karısı, dinarlardan habersiz: “Ondan kurtul” dedi. “Bana bunda yardım eder misin?” “Evet.” Bunun üzerine dinarları Humus fakirlerine dağıttı.",
      qa: [
        { q: "مَاذَا عَرَضَ عُمَرُ عَلَى سَعِيدِ بْنِ عَامِرٍ؟", a: "عَرَضَ عَلَيْهِ وِلَايَةَ حِمْصَ.", tr: "Ömer Saîd’e neyi teklif etti? Humus valiliğini." },
        { q: "لِمَاذَا بَكَى عُمَرُ؟", a: "لِأَنَّ أَمِيرَ حِمْصَ فَقِيرٌ لَا تُوقَدُ فِي بَيْتِهِ نَارٌ.", tr: "Ömer neden ağladı? Humus valisi fakirdi, evinde ateş yakılmıyordu." },
        { q: "مَاذَا فَعَلَ سَعِيدٌ بِالدَّنَانِيرِ؟", a: "وَزَّعَهَا عَلَى فُقَرَاءِ حِمْصَ.", tr: "Saîd dinarları ne yaptı? Humus fakirlerine dağıttı." }
      ],
      cls: { opts: [["m", "Misâl fiil", "فِعْلٌ مِثَالٌ", "cerr"], ["e", "Emir", "فِعْلُ الأَمْرِ", "nasb"], ["f", "İsm-i fâil", "اسْمُ الفَاعِلِ", "mi"], ["t", "İsm-i tafdîl", "اسْمُ التَّفْضِيلِ", "ref"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]], ar: "اسْتَخْرِجْ مِنَ النَّصِّ", tr: "Koyu kelime hangisi?", items: [
        { s: HL("قَدْ وَجَدْتُهُ", "وَجَدْتُهُ"), a: "m", why: "وَجَدَ – يَجِدُ (و ج د)." },
        { s: HL("وَيَعْرِضُ عَلَيْهِ الخَلِيفَةُ", "وَيَعْرِضُ"), a: "x", why: "Sâlim fiil (ع ر ض)." },
        { s: HL("وَاللهِ لَا أَدَعُكَ", "أَدَعُكَ"), a: "m", why: "وَدَعَ – يَدَعُ: vâv düşmüş." },
        { s: HL("أَتَضَعُونَ أَمَانَتَكُمْ", "أَتَضَعُونَ"), a: "m", why: "وَضَعَ – يَضَعُ (أَ soru hemzesi)." },
        { s: HL("حِينَمَا وَجَدَ إِصْرَارَ عُمَرَ", "وَجَدَ"), a: "m", why: "وَجَدَ." },
        { s: HL("حَتَّى وَفَدَ عَلَى أَمِيرِ المُؤْمِنِينَ", "وَفَدَ"), a: "m", why: "وَفَدَ – يَفِدُ (heyet olarak gelmek)." },
        { s: HL("بَعْضُ مَنْ يَثِقُ بِهِمْ", "يَثِقُ"), a: "m", why: "وَثِقَ – يَثِقُ (6. bâb)." },
        { s: HL("اُكْتُبُوا لِي أَسْمَاءَ فُقَرَائِكُمْ", "اُكْتُبُوا"), a: "e", why: "كَتَبَ'in emri (أَنْتُمْ)." },
        { s: HL("وَلَا تُوقَدُ فِي بَيْتِهِ نَارٌ", "تُوقَدُ"), a: "m", why: "أَوْقَدَ – يُوقِدُ (if’âl), meçhul: تُوقَدُ. Mezîd misâl." },
        { s: HL("ثُمَّ وَضَعَ أَلْفَ دِينَارٍ", "وَضَعَ"), a: "m", why: "وَضَعَ." },
        { s: HL("أَعْطُوهُ هَذَا المَالَ", "أَعْطُوهُ"), a: "e", why: "أَعْطَى'nin emri (أَنْتُمْ) + هُ." },
        { s: HL("إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", "رَاجِعُونَ"), a: "f", why: "رَجَعَ → رَاجِعٌ (فَاعِلٌ)." },
        { s: HL("كَأَنَّمَا أَصَابَتْهُ مُصِيبَةٌ", "مُصِيبَةٌ"), a: "f", why: "أَصَابَ → مُصِيبٌ / مُصِيبَةٌ (if’âl ism-i fâili)." },
        { s: HL("إِلَى أَمِيرِ المُؤْمِنِينَ", "المُؤْمِنِينَ"), a: "f", why: "آمَنَ → مُؤْمِنٌ (if’âl ism-i fâili)." },
        { s: HL("بَلْ أَعْظَمُ مِنْ ذَلِكَ", "أَعْظَمُ"), a: "t", why: "أَفْعَلُ + مِنْ: ism-i tafdîl." },
        { s: HL("قَالَتْ: تَخَلَّصْ مِنْهَا", "تَخَلَّصْ"), a: "e", why: "تَخَلَّصَ'in emri (tefe’’ul)." },
        { s: HL("فَوَزَّعَ الدَّنَانِيرَ", "فَوَزَّعَ"), a: "m", why: "وَزَّعَ (tef’îl): mezîd misâl." }
      ]},
      cls2: { opts: [["S", "Sülâsî", "ثُلَاثِيٌّ", "cerr"], ["M", "Mezîd", "مَزِيدٌ", "nasb"]], ar: "ثُلَاثِيٌّ أَمْ مَزِيدٌ؟", tr: "Metindeki misâl fiil sülâsî mi, mezîd mi?", items: [
        { s: "وَجَدْتُهُ", a: "S", why: "وَجَدَ." }, { s: "أَدَعُكَ", a: "S", why: "وَدَعَ." }, { s: "تَضَعُونَ", a: "S", why: "وَضَعَ." }, { s: "وَفَدَ", a: "S", why: "وَفَدَ." },
        { s: "يَثِقُ", a: "S", why: "وَثِقَ." }, { s: "تُوقَدُ", a: "M", why: "أَوْقَدَ (if’âl)." }, { s: "وَزَّعَ", a: "M", why: "tef’îl." }
      ]}
    },
    { type: "reading", num: "٨", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ: الفِعْلَ المِثَالَ، الفِعْلَ المُضَعَّفَ", tr: "Hikâyeyi oku, soruları cevapla ve koyu fiilin türünü seç.", title: "أَشْعَبُ الطَّمَّاعُ",
      text: "كَانَ أَشْعَبُ بْنُ جُبَيْرٍ مَشْهُورًا بِالطَّمَعِ، وَكَانَ النَّاسُ يَلُومُونَهُ وَيُنَادُونَهُ بِـ«أَشْعَبَ الطَّمَّاعِ». وَمِنَ الحِكَايَاتِ الَّتِي تَدُلُّ عَلَى شِدَّةِ طَمَعِهِ: ١ ـ إِنَّ بَعْضَ الصِّبْيَانِ جَاءُوا إِلَيْهِ وَوَقَفُوا يَضْحَكُونَ مِنْهُ حَتَّى غَضِبَ، وَأَرَادَ أَنْ يَتَخَلَّصَ مِنْهُمْ، فَقَالَ لَهُمْ: إِنَّ فِي بَيْتِ فُلَانٍ حَفْلَ زَوَاجٍ، فَاذْهَبُوا إِلَيْهِ. فَجَرَوْا إِلَى هُنَاكَ. وَلَمَّا ذَهَبَ الصِّبْيَانُ وَتَرَكُوهُ قَالَ فِي نَفْسِهِ: لَعَلَّ الَّذِي قُلْتُهُ لَهُمْ حَقِيقَةٌ! فَأَسْرَعَ خَلْفَهُمْ نَحْوَ البَيْتِ، وَلَمَّا وَصَلَ إِلَى هُنَاكَ لَمْ يَجِدْ شَيْئًا، وَقَابَلَهُ الصِّبْيَانُ هُنَاكَ فَشَدُّوهُ مِنْ مَلَابِسِهِ وَضَرَبُوهُ. ٢ ـ وَرَوَى بَعْضُ النَّاسِ أَنَّ أَشْعَبَ وَامْرَأَتَهُ جَلَسَا مَرَّةً يَأْكُلَانِ مِنْ قِدْرٍ، فَقَالَ أَشْعَبُ: مَا أَلَذَّ الطَّعَامَ لَوْلَا كَثْرَةُ الجُمْهُورِ! فَقَالَتِ امْرَأَتُهُ: أَيْنَ الجُمْهُورُ، وَلَيْسَ عَلَى الطَّعَامِ إِلَّا أَنَا وَأَنْتَ؟ قَالَ أَشْعَبُ: وَدِدْتُ وَاللهِ لَوْ كُنْتُ أَنَا وَالقِدْرُ فَقَطْ!",
      textTr: "Eş’ab b. Cübeyr açgözlülüğüyle meşhurdu; insanlar onu kınar, “Açgözlü Eş’ab” diye çağırırdı. Açgözlülüğünü gösteren hikâyelerden: 1) Bazı çocuklar ona gelip durmuş, kızana kadar ona gülmüşler. Onlardan kurtulmak isteyip “Falancanın evinde düğün var, oraya gidin” demiş; koşup gitmişler. Çocuklar onu bırakıp gidince kendi kendine “Belki söylediğim doğrudur!” demiş, arkalarından eve koşmuş. Oraya varınca bir şey bulamamış; çocuklar orada onu karşılayıp elbisesinden çekip dövmüşler. 2) Rivayete göre Eş’ab ile karısı bir gün bir tencereden yemek yerken Eş’ab: “Kalabalık çok olmasa yemek ne lezzetli olurdu!” demiş. Karısı: “Ne kalabalığı? Sofrada ben ve senden başka kimse yok!” Eş’ab: “Vallahi keşke yalnız ben ve tencere olsaydık!” demiş.",
      qa: [
        { q: "بِمَاذَا كَانَ أَشْعَبُ مَشْهُورًا؟", a: "كَانَ مَشْهُورًا بِالطَّمَعِ.", tr: "Eş’ab ne ile meşhurdu? Açgözlülükle." },
        { q: "لِمَاذَا أَسْرَعَ أَشْعَبُ خَلْفَ الصِّبْيَانِ؟", a: "لِأَنَّهُ قَالَ فِي نَفْسِهِ: لَعَلَّ الَّذِي قُلْتُهُ لَهُمْ حَقِيقَةٌ.", tr: "Eş’ab neden çocukların arkasından koştu? Söylediği şeyin doğru olabileceğini düşündü." },
        { q: "مَاذَا وَدَّ أَشْعَبُ؟", a: "وَدَّ لَوْ كَانَ هُوَ وَالقِدْرُ فَقَطْ.", tr: "Eş’ab neyi istedi? Yalnız kendisi ve tencerenin olmasını." }
      ],
      cls: { opts: [["m", "Misâl", "مِثَالٌ", "cerr"], ["d", "Muzâaf", "مُضَعَّفٌ", "nasb"], ["b", "Hem misâl hem muzâaf", "مِثَالٌ وَمُضَعَّفٌ", "mi"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]], ar: "اسْتَخْرِجِ الفِعْلَ المِثَالَ وَالفِعْلَ المُضَعَّفَ", tr: "Koyu fiil hangi türden?", items: [
        { s: HL("وَكَانَ النَّاسُ يَلُومُونَهُ", "يَلُومُونَهُ"), a: "x", why: "لَامَ – يَلُومُ: ecvef." },
        { s: HL("الحِكَايَاتِ الَّتِي تَدُلُّ عَلَى شِدَّةِ طَمَعِهِ", "تَدُلُّ"), a: "d", why: "دَلَّ – يَدُلُّ (د ل ل)." },
        { s: HL("وَوَقَفُوا يَضْحَكُونَ مِنْهُ", "وَوَقَفُوا"), a: "m", why: "وَقَفَ – يَقِفُ." },
        { s: HL("وَوَقَفُوا يَضْحَكُونَ مِنْهُ", "يَضْحَكُونَ"), a: "x", why: "Sâlim (ض ح ك)." },
        { s: HL("وَلَمَّا وَصَلَ إِلَى هُنَاكَ", "وَصَلَ"), a: "m", why: "وَصَلَ – يَصِلُ." },
        { s: HL("لَمْ يَجِدْ شَيْئًا", "يَجِدْ"), a: "m", why: "وَجَدَ – يَجِدُ; لَمْ ile meczûm." },
        { s: HL("فَشَدُّوهُ مِنْ مَلَابِسِهِ", "فَشَدُّوهُ"), a: "d", why: "شَدَّ – يَشُدُّ." },
        { s: HL("وَرَوَى بَعْضُ النَّاسِ", "وَرَوَى"), a: "x", why: "رَوَى (ر و ي): lefîf-i makrûn." },
        { s: HL("مَا أَلَذَّ الطَّعَامَ", "أَلَذَّ"), a: "d", why: "Taaccüb fiili أَلَذَّ (ل ذ ذ): mezîd muzâaf." },
        { s: HL("وَدِدْتُ وَاللهِ", "وَدِدْتُ"), a: "b", why: "وَدَّ (و د د): ilk harf و (misâl), 2. ve 3. harf aynı (muzâaf)." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var SUL = VERBS.filter(SUL_V);
var NK_POOL = [];
VERBS.forEach(function (v, i) {
  var mz = MAZ(v), mu = MUZ(v), em = EMR(v), dm = DIST(v, "m"), du = DIST(v, "u"), de = DIST(v, "e"), h = "(" + v.m + ") ";
  if (dm.length >= 2) NK_POOL.push([h + PER[12] + " {" + mz[12] + "}", [mz[12], dm[0], dm[1]], v.m + " · أَنَا (mâzi): değişiklik yok", "ben · " + v.tr, "u2"]);
  if (dm.length >= 3 && i % 2 === 0) NK_POOL.push([h + PER[2] + " {" + mz[2] + "}", [mz[2], dm[2], mz[12]], v.m + " · هُمْ (mâzi)", "onlar · " + v.tr, "u2"]);
  if (du.length >= 2) NK_POOL.push([h + PER[0] + " {" + mu[0] + "}", [mu[0], du[0], du[1]], v.m + " · هُوَ (muzâri): " + TUR(v), "o · " + v.tr, "u3"]);
  if (du.length >= 2 && i % 2 === 1) NK_POOL.push([h + PER[9] + " {" + mu[9] + "}", [mu[9], du[du.length - 1], du[1]], v.m + " · أَنْتِ (muzâri)", "sen (kadın) · " + v.tr, "u3"]);
  if (de.length >= 2) NK_POOL.push([h + EPER[0] + " {" + em[0] + "}", [em[0], de[0], de[1]], v.m + " · emir أَنْتَ", "sen · " + v.tr, "u4"]);
  if (de.length >= 2 && i % 2 === 0) NK_POOL.push([h + EPER[3] + " {" + em[3] + "}", [em[3], de[de.length - 1], de[0]], v.m + " · emir أَنْتِ", "sen (kadın) · " + v.tr, "u4"]);
});
NK_POOL = NK_POOL.filter(function (p) { return p[1].every(function (x, i, a) { return x && a.indexOf(x) === i; }); });
// Vâvî mi yâî mi?
var BB_LIST = [];
VERBS.forEach(function (v, i) {
  var w = VAVI(v) ? "w" : "y", why = w === "w" ? "İlk asıl harf و." : "İlk asıl harf ي.";
  BB_LIST.push([v.m, w, why]);
  if (i % 2 === 0 || v.k === "y" || v.m === "أَيْقَنَ") BB_LIST.push([MUZ(v)[0], w, why + " Muzâri: " + MUZ(v)[0] + " ← " + v.m]);
});
// Vâv düşer mi?
var AS_LIST = VERBS.map(function (v) {
  return [v.m, v.k === "d" ? "d" : "k", v.k === "d" ? "Vâv düşer: " + MUZ(v)[0] + "، " + EMR(v)[0] + "." : v.k === "k" ? "4. bâb: vâv kalır: " + MUZ(v)[0] + "." : v.k === "y" ? "Yâî: yâ kalır: " + MUZ(v)[0] + "." : "Mezîd: düşmez: " + MUZ(v)[0] + "."];
});
var BBO = [["w", "Vâvî", "وَاوِيٌّ", "cerr"], ["y", "Yâî", "يَائِيٌّ", "nasb"]];
var ASO = [["d", "Düşer", "تُحْذَفُ", "cerr"], ["k", "Düşmez", "لَا تُحْذَفُ", "nasb"]];
var HAFIZA = {
  mu: { name: "Mâzi ↔ muzâri", pairs: [["وَقَفَ", "يَقِفُ"], ["وَضَعَ", "يَضَعُ"], ["يَئِسَ", "يَيْأَسُ"], ["وَرِثَ", "يَرِثُ"], ["أَوْقَفَ", "يُوقِفُ"], ["وَزَّعَ", "يُوَزِّعُ"], ["اِتَّصَلَ", "يَتَّصِلُ"]] },
  ue: { name: "Muzâri ↔ emir", pairs: [["يَقِفُ", "قِفْ"], ["يَعِدُ", "عِدْ"], ["يَهَبُ", "هَبْ"], ["يَيْأَسُ", "اِيْأَسْ"], ["يُوصِلُ", "أَوْصِلْ"], ["يُوَجِّهُ", "وَجِّهْ"], ["يَسْتَيْقِظُ", "اِسْتَيْقِظْ"]] },
  tr: { name: "Fiil ↔ Türkçe", pairs: [["يَقِفُ", "duruyor"], ["ضَعْ", "koy"], ["وَجَدْتُ", "buldum"], ["يَيْأَسُ", "ümit kesiyor"], ["عِدْ", "söz ver"], ["يَثِقُ", "güveniyor"], ["اِسْتَيْقِظْ", "uyan"]] }
};
var KARTLAR = [
  ["Misâl fiil nedir?", "İlk asıl harfi و ya da ي olan fiil: وَقَفَ، يَئِسَ"],
  ["Vâvî / yâî?", "وَضَعَ (و ض ع) vâvî · يَئِسَ (ي ء س) yâî"],
  ["Mâzide değişiklik olur mu?", "Hayır: وَقَفْتُ، وَقَفُوا، وَقَفْنَ"],
  ["وَقَفَ'in muzârisi?", "يَقِفُ (vâv düşer; يَوْقِفُ değil)"],
  ["Vâv hangi bâblarda düşer?", "Muzârisi esreli bâblarda: يَقِفُ، يَرِثُ; bazı 3. bâb fiillerinde: يَضَعُ، يَهَبُ، يَقَعُ، يَدَعُ"],
  ["وَجِلَ'nin muzârisi?", "يَوْجَلُ (4. bâb: vâv düşmez)"],
  ["يَئِسَ'in muzâri ve emri?", "يَيْأَسُ · اِيْأَسْ (yâ düşmez)"],
  ["وَعَدَ'in emri?", "عِدْ · عِدَا · عِدُوا · عِدِي · عِدْنَ"],
  ["Mezîdde vâv düşer mi?", "Hayır: وَزَّعَ – يُوَزِّعُ – وَزِّعْ"],
  ["أَوْقَفَ tablosu?", "يُوقِفُ · أَوْقِفْ · مُوقِفٌ · مُوقَفٌ · إِيقَافٌ"],
  ["اِوْتَصَلَ ne olur?", "اِتَّصَلَ: ifti’âlde و → ت, sonra idğam"],
  ["أَيْقَنَ'nin muzârisi?", "يُوقِنُ: ötreden sonra sâkin yâ vâva döner"]
];
