// ================= VERİ: Mehmûz Fiil ve Çekimi (الفِعْلُ المَهْمُوزُ وَتَصْرِيفُهُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "الفِعْلُ المَهْمُوزُ", tr: "Mehmûz fiil" }, nasb: { ar: "الهَمْزَةُ", tr: "Hemze" }, mi: { ar: "الضَّمِيرُ", tr: "Zamir eki" },
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
// Hemzenin yazılışı: "ء" yer tutucusu, kendi harekesine ve önceki harfin harekesine göre أ / ؤ / ئ / إ / ء olur
function isHar(c) { return /[ً-ْ]/.test(c); }
function HZ(w) {
  var a = w.split(""), R = { "ِ": 3, "ُ": 2, "َ": 1, "ْ": 0 };
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== "ء") continue;
    var own = isHar(a[i + 1] || "") ? a[i + 1] : "ْ", k = i - 1, pv = null, seat;
    while (k >= 0 && isHar(a[k])) { if (a[k] !== "ّ" && pv === null) pv = a[k]; k--; }
    if (k < 0) seat = own === "ِ" ? "إ" : "أ";
    else {
      if (pv === null) pv = "ْ";
      var fin = i + 1 === a.length || (isHar(a[i + 1]) && i + 2 === a.length);
      var b = fin ? pv : (R[own] >= R[pv] ? own : pv);
      seat = b === "ِ" ? "ئ" : b === "ُ" ? "ؤ" : b === "َ" ? "أ" : (fin ? "ء" : "أ");
    }
    a[i] = seat;
  }
  return a.join("").replace(/أَا/g, "آ").replace(/أَأْ/g, "آ").replace(/اِئْ/g, "اِي");
}
// Fiil: mâzi, Türkçe, bâb (sayı ya da mezîd adı), hemzenin yeri (f/a/l), mâzi gövdesi, muzâri ön ek harekesi, muzâri gövdesi, emir gövdesi, emirde ikinci biçim
function MV(m, tr, bab, pos, ml, uv, ul, el, alt) { return { m: m, tr: tr, bab: bab, pos: pos, ml: ml, uv: uv, ul: ul, el: el, alt: alt || "" }; }
var VERBS = [
  MV("أَخَذَ", "almak", 1, "f", "ءَخَذ", "َ", "ءْخُذ", "خُذ"),
  MV("أَكَلَ", "yemek", 1, "f", "ءَكَل", "َ", "ءْكُل", "كُل"),
  MV("أَمَرَ", "emretmek", 1, "f", "ءَمَر", "َ", "ءْمُر", "مُر", "وَأْمُرْ"),
  MV("أَسِفَ", "üzülmek", 4, "f", "ءَسِف", "َ", "ءْسَف", "اِءْسَف"),
  MV("سَأَلَ", "sormak", 3, "a", "سَءَل", "َ", "سْءَل", "سَل", "اِسْأَلْ"),
  MV("سَئِمَ", "usanmak, bıkmak", 4, "a", "سَءِم", "َ", "سْءَم", "اِسْءَم"),
  MV("قَرَأَ", "okumak", 3, "l", "قَرَء", "َ", "قْرَء", "اِقْرَء"),
  MV("بَدَأَ", "başlamak", 3, "l", "بَدَء", "َ", "بْدَء", "اِبْدَء"),
  MV("مَلَأَ", "doldurmak", 3, "l", "مَلَء", "َ", "مْلَء", "اِمْلَء"),
  MV("لَجَأَ", "sığınmak", 3, "l", "لَجَء", "َ", "لْجَء", "اِلْجَء"),
  MV("نَشَأَ", "yetişmek, ortaya çıkmak", 3, "l", "نَشَء", "َ", "نْشَء", "اِنْشَء"),
  MV("بَطُؤَ", "yavaş olmak", 5, "l", "بَطُء", "َ", "بْطُء", "اُبْطُء"),
  MV("جَرُؤَ", "cesaret etmek", 5, "l", "جَرُء", "َ", "جْرُء", "اُجْرُء"),
  MV("أَنْشَأَ", "kurmak, inşa etmek", "إِفْعَالٌ", "l", "ءَنْشَء", "ُ", "نْشِء", "ءَنْشِء"),
  MV("أَذَّنَ", "ezan okumak", "تَفْعِيلٌ", "f", "ءَذَّن", "ُ", "ءَذِّن", "ءَذِّن"),
  MV("أَخَّرَ", "geciktirmek", "تَفْعِيلٌ", "f", "ءَخَّر", "ُ", "ءَخِّر", "ءَخِّر"),
  MV("آخَذَ", "hesaba çekmek, kınamak", "مُفَاعَلَةٌ", "f", "ءَاخَذ", "ُ", "ءَاخِذ", "ءَاخِذ"),
  MV("كَافَأَ", "ödüllendirmek", "مُفَاعَلَةٌ", "l", "كَافَء", "ُ", "كَافِء", "كَافِء"),
  MV("اِتَّخَذَ", "edinmek, benimsemek", "اِفْتِعَالٌ", "f", "اِتَّخَذ", "َ", "تَّخِذ", "اِتَّخِذ"),
  MV("اِمْتَلَأَ", "dolmak", "اِفْتِعَالٌ", "l", "اِمْتَلَء", "َ", "مْتَلِء", "اِمْتَلِء"),
  MV("تَأَثَّرَ", "etkilenmek", "تَفَعُّلٌ", "f", "تَءَثَّر", "َ", "تَءَثَّر", "تَءَثَّر"),
  MV("تَهَيَّأَ", "hazırlanmak", "تَفَعُّلٌ", "l", "تَهَيَّء", "َ", "تَهَيَّء", "تَهَيَّء"),
  MV("اِسْتَأْذَنَ", "izin istemek", "اِسْتِفْعَالٌ", "f", "اِسْتَءْذَن", "َ", "سْتَءْذِن", "اِسْتَءْذِن")
];
function V(m) { return VERBS.filter(function (v) { return v.m === m; })[0]; }
function SUL_V(v) { return typeof v.bab === "number"; }
var POSN = { f: ["Mehmûzü’l-fâ", "مَهْمُوزُ الفَاءِ", "hemze başta"], a: ["Mehmûzü’l-ayn", "مَهْمُوزُ العَيْنِ", "hemze ortada"], l: ["Mehmûzü’l-lâm", "مَهْمُوزُ اللَّامِ", "hemze sonda"] };
function TUR(v) { return POSN[v.pos][0] + " (" + POSN[v.pos][2] + ")"; }
function MAZ(v) { return MSUF.map(function (s) { return HZ(v.ml + s); }); }
function MUZ(v) { return USUF.map(function (s, i) { return HZ(UPRE[i] + v.uv + v.ul + s); }); }
function EMR(v) { return ESUF.map(function (s) { return HZ(v.el + s); }); }
function EMR_ALT(v) { return v.alt; }
function CONJ(v, t) { return t === "m" ? MAZ(v) : t === "u" ? MUZ(v) : EMR(v); }
// Renkli yazım: kökteki (son) hemze renklenir
function colorH(w) { var i = -1; for (var k = w.length - 1; k >= 0; k--) if (/[أإآؤئء]/.test(w[k])) { i = k; break; } if (i < 0) return w; var j = i + 1; while (j < w.length && isHar(w[j])) j++; return w.slice(0, i) + '<b class="cend">' + w.slice(i, j) + '</b>' + w.slice(j); }
function CONJ_HTML(v, t) { return CONJ(v, t).map(colorH); }
// Sık yapılan yanlışlar: hemzeyi yanlış harfe yazmak, eki yanlış eklemek
function SWAP(f) {
  var r = [];
  [[/ئ/, "أ"], [/آ/, "أَا"], [/ئ/, "ؤ"], [/ؤ/, "ئ"], [/أْ/, "ئْ"], [/أُ$/, "ؤُ"], [/أَ$/, "ئَ"], [/أْ$/, "ؤْ"]].forEach(function (p) { if (p[0].test(f)) r.push(f.replace(p[0], p[1])); });
  return r;
}
function DIST(v, t) {
  var ok = CONJ(v, t), d = [];
  ok.forEach(function (f) { SWAP(f).forEach(function (x) { d.push(x); }); });
  if (t === "m") d = d.concat([HZ(v.ml + "َتُ"), HZ(v.ml + "َنَ"), HZ(v.ml + "ُونَ")]);
  else if (t === "u") d = d.concat([HZ("ي" + v.uv + v.ul + "ُوا"), HZ("ي" + v.uv + v.ul + "َنَ"), HZ("ي" + v.uv + v.ul + "ِينَ"), HZ("ت" + v.uv + v.ul + "َنَ")]);
  else d = d.concat([HZ(v.el + "ُ"), HZ(v.el + "َنَ"), HZ(v.el + "ُونَ")]);
  return d.filter(function (x, i, a) { return ok.indexOf(x) < 0 && a.indexOf(x) === i; }).slice(0, 7);
}
var BAB = { 1: ["كَتَبَ – يَكْتُبُ", "1. bâb (ayn ötreli)"], 3: ["فَتَحَ – يَفْتَحُ", "3. bâb (ayn üstünlü)"], 4: ["عَلِمَ – يَعْلَمُ", "4. bâb (mâzide esre, muzâride üstün)"], 5: ["حَسُنَ – يَحْسُنُ", "5. bâb (ayn ötreli)"] };
function NOTE(v, t) {
  var c = CONJ(v, t);
  if (v.m === "اِتَّخَذَ") return "Kök أ خ ذ; ifti’âlde hemze ت’ye dönüşüp ت ile idğam olmuştur, hemze görünmez: " + c[0] + "، " + c[2] + "، " + c[12] + ".";
  if (t === "m") {
    if (v.pos === "l") return "Hemze sonda: müsennâda آ (" + c[1] + "), cemide ؤ (" + c[2] + ") yazılır; ötekilerde elif üzerindedir (" + c[0] + "، " + c[12] + ").";
    if (v.pos === "a") return "Hemze ortada: kendi harekesine göre yazılır (" + c[0] + "، " + c[2] + "، " + c[12] + "). Mâzi sahih fiil gibi çekilir.";
    return "Hemze başta: mâzi sahih fiil gibi çekilir (" + c[0] + "، " + c[2] + "، " + c[12] + ").";
  }
  if (t === "u") {
    if (v.pos === "l") return "Muzâride hemze: " + c[0] + "، " + c[1] + " (müsennâ: آ ya da ئَا)، " + c[2] + "، " + c[9] + ".";
    if (/^[أآ]/.test(c[12]) && c[12].charAt(0) === "آ") return "أَنَا’da iki hemze yan yana gelince birleşip آ olur: " + c[12] + ". Öteki şahıslarda hemze sâkindir: " + c[0] + "، " + c[2] + ".";
    if (/ؤ/.test(c[0])) return "Ötreden sonra gelen hemze و üzerine yazılır: " + c[0] + "، " + c[12] + ".";
    return "Muzâri: " + c[0] + "، " + c[2] + "، " + c[9] + "، " + c[12] + ".";
  }
  if (["أَخَذَ", "أَكَلَ", "أَمَرَ"].indexOf(v.m) >= 0) return "Emirde hemze düşer: " + c[0] + "، " + c[2] + "، " + c[3] + "." + (v.alt ? " Başına وَ / فَ gelince hemze geri gelebilir: " + v.alt + "." : "");
  if (v.m === "سَأَلَ") return "Emirde hemze çoğunlukla düşer: " + c[0] + "، " + c[2] + "، " + c[3] + "; hemzeli biçim de doğrudur: " + v.alt + ".";
  if (v.m === "أَسِفَ") return "Vasıl elifinden sonra sâkin hemze ي’ye döner: " + c[0] + "، " + c[2] + ".";
  return "Emir: " + c[0] + "، " + c[1] + "، " + c[2] + "، " + c[3] + "، " + c[5] + ".";
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
function TBL(m, t) { return { v: m, t: t }; }
// Boş tablo: [verilen, sütun (0 mâzi, 1 muzâri, 2 emir), [[doğru, y1, y2] × 2]]
var DCOL = ["Mâzi", "Muzâri", "Emir"];
function FT(rows) { return rows.map(function (r, i) { var cols = [0, 1, 2].filter(function (c) { return c !== r[1]; }); return CB2(DCOL[r[1]] + ": " + r[0], r[2], "·", "", i, cols.map(function (c) { return DCOL[c]; }).join(" · "), r[2].map(function (s) { return s[0]; }).join(" · ")); }); }
var FT1 = [
  ["خُذْ", 2, [["أَخَذَ", "أَخُذَ", "خَذَ"], ["يَأْخُذُ", "يَأْخِذُ", "يُؤْخَذُ"]]],
  ["يَسْأَمُ", 1, [["سَئِمَ", "سَأَمَ", "سَؤُمَ"], ["اِسْأَمْ", "سَمْ", "اِسْئَمْ"]]],
  ["نَشَأَ", 0, [["يَنْشَأُ", "يَنْشُؤُ", "يُنْشِئُ"], ["اِنْشَأْ", "أَنْشِئْ", "نَشْ"]]],
  ["مُرْ", 2, [["أَمَرَ", "مَرَّ", "أَمِرَ"], ["يَأْمُرُ", "يَمُرُّ", "يُؤْمِرُ"]]],
  ["بَطُؤَ", 0, [["يَبْطُؤُ", "يَبْطَأُ", "يَبْطِئُ"], ["اُبْطُؤْ", "اِبْطَأْ", "بُطْ"]]],
  ["يَجْرُؤُ", 1, [["جَرُؤَ", "جَرَأَ", "جَرَى"], ["اُجْرُؤْ", "اِجْرَأْ", "جُرْ"]]]
];
var FT2 = [
  ["أَخِّرْ", 2, [["أَخَّرَ", "آخَرَ", "تَأَخَّرَ"], ["يُؤَخِّرُ", "يُأَخِّرُ", "يَتَأَخَّرُ"]]],
  ["يُؤَدِّبُ", 1, [["أَدَّبَ", "آدَبَ", "تَأَدَّبَ"], ["أَدِّبْ", "أُؤَدِّبْ", "تَأَدَّبْ"]]],
  ["كَافَأَ", 0, [["يُكَافِئُ", "يُكَافَأُ", "يُكَافِؤُ"], ["كَافِئْ", "كَافَأْ", "كَافِ"]]],
  ["تَهَيَّأْ", 2, [["تَهَيَّأَ", "هَيَّأَ", "تَهَيَّئَ"], ["يَتَهَيَّأُ", "يُهَيِّئُ", "يَتَهَيَّئُ"]]],
  ["يَخْتَبِئُ", 1, [["اِخْتَبَأَ", "خَبَأَ", "اِخْتَبِئَ"], ["اِخْتَبِئْ", "اِخْتَبَأْ", "اُخْتُبِئْ"]]],
  ["اِمْتَلَأَ", 0, [["يَمْتَلِئُ", "يَمْتَلَأُ", "يَمْلَأُ"], ["اِمْتَلِئْ", "اِمْتَلَأْ", "اِمْلَأْ"]]],
  ["اِلْتَجِئْ", 2, [["اِلْتَجَأَ", "لَجَأَ", "اِلْتَجِئَ"], ["يَلْتَجِئُ", "يَلْتَجَأُ", "يَلْجَأُ"]]]
];
// Mezîd mehmûz tablosu: [bâb, mâzi, muzâri, emir, ism-i fâil, ism-i mef’ûl, masdar]
var MZH = ["Bâb", "Mâzi", "Muzâri", "Emir", "İsm-i fâil", "İsm-i mef’ûl", "Masdar"];
var MZT = [
  ["إِفْعَالٌ", "أَنْشَأَ", "يُنْشِئُ", "أَنْشِئْ", "مُنْشِئٌ", "مُنْشَأٌ", "إِنْشَاءٌ"], ["تَفْعِيلٌ", "أَذَّنَ", "يُؤَذِّنُ", "أَذِّنْ", "مُؤَذِّنٌ", "مُؤَذَّنٌ", "تَأْذِينٌ"],
  ["مُفَاعَلَةٌ", "آخَذَ", "يُؤَاخِذُ", "آخِذْ", "مُؤَاخِذٌ", "مُؤَاخَذٌ", "مُؤَاخَذَةٌ"], ["اِفْتِعَالٌ", "اِتَّخَذَ", "يَتَّخِذُ", "اِتَّخِذْ", "مُتَّخِذٌ", "مُتَّخَذٌ", "اِتِّخَاذٌ"],
  ["تَفَعُّلٌ", "تَأَثَّرَ", "يَتَأَثَّرُ", "تَأَثَّرْ", "مُتَأَثِّرٌ", "مُتَأَثَّرٌ بِهِ", "تَأَثُّرٌ"], ["تَفَاعُلٌ", "تَفَاءَلَ", "يَتَفَاءَلُ", "تَفَاءَلْ", "مُتَفَائِلٌ", "—", "تَفَاؤُلٌ"],
  ["اِسْتِفْعَالٌ", "اِسْتَأْذَنَ", "يَسْتَأْذِنُ", "اِسْتَأْذِنْ", "مُسْتَأْذِنٌ", "مُسْتَأْذَنٌ", "اِسْتِئْذَانٌ"]
];

var METIN = "سَئِمَ عَلِيٌّ مِنْ كَثْرَةِ الأَعْمَالِ، وَنَوَى أَنْ يَذْهَبَ إِلَى الغَابَةِ القَرِيبَةِ مِنْ مَدِينَتِهِ لِيُشَاهِدَ مَنْظَرَهَا الجَمِيلَ، وَيَتَنَفَّسَ هَوَاءَهَا النَّقِيَّ. عِنْدَمَا وَصَلَ عَلِيٌّ إِلَى الغَابَةِ رَأَى مَنْظَرًا رَائِعًا؛ المَاءُ يَجْرِي بَيْنَ الأَشْجَارِ، وَالطُّيُورُ تُغَرِّدُ عَلَى الأَغْصَانِ. جَلَسَ تَحْتَ الظِّلَالِ، وَقَرَأَ مِنَ الكِتَابِ الَّذِي كَانَ يَحْمِلُهُ فِي جَيْبِهِ. وَعِنْدَمَا جَاءَ وَقْتُ الظُّهْرِ أَكَلَ مِنَ الفَوَاكِهِ البَرِّيَّةِ." +
  "<br>بَعْدَ الظُّهْرِ أَخْرَجَ بُنْدُقِيَّتَهُ الَّتِي كَانَ يَحْمِلُهَا فِي حَقِيبَتِهِ، وَبَدَأَ يُفَتِّشُ عَنِ الطُّيُورِ وَالأَرَانِبِ. لَمْ يَمْضِ وَقْتٌ طَوِيلٌ حَتَّى أَطْلَقَ النَّارَ عَلَى بَعْضِ الطُّيُورِ وَالأَرَانِبِ، لَكِنَّهُ لَمْ يُصِبْ شَيْئًا، وَأَفْزَعَ كُلَّ الحَيَوَانَاتِ فِي الغَابَةِ. عِنْدَئِذٍ فَكَّرَ فِي نَفْسِهِ قَائِلًا: لَيْسَ لِي أَنْ أُفْزِعَ حَيَوَانَاتِ الغَابَةِ الَّتِي تَعِيشُ بِأَمَانٍ وَسَلَامٍ. ثُمَّ رَأَى القِرَدَةَ وَالبَلَابِلَ وَالطُّيُورَ المُخْتَلِفَةَ، وَأَخَذَهُ العَجَبُ مِمَّا رَأَى، وَقَالَ فِي نَفْسِهِ: «يَا رَبِّ، مَا أَجْمَلَ هَذَا المَنْظَرَ! عَلَيْنَا أَنْ نُحَافِظَ عَلَيْهِ، وَلَا نُفْسِدَ الطَّبِيعَةَ الَّتِي وَهَبَهَا اللهُ لَنَا»." +
  "<br>قَضَى عَلِيٌّ يَوْمًا مُمْتِعًا، وَعِنْدَمَا عَادَ إِلَى البَيْتِ أَلْقَى نَفْسَهُ عَلَى الفِرَاشِ مُتْعَبًا، وَنَامَ فِي تِلْكَ اللَّيْلَةِ نَوْمًا هَادِئًا.";

var BBO = [["f", "Fâ (başta)", "مَهْمُوزُ الفَاءِ", "cerr"], ["a", "Ayn (ortada)", "مَهْمُوزُ العَيْنِ", "nasb"], ["l", "Lâm (sonda)", "مَهْمُوزُ اللَّامِ", "mi"]];
var ASO = [["e", "Mehmûz", "مَهْمُوزٌ", "cerr"], ["x", "Mehmûz değil", "لَيْسَ مَهْمُوزًا", "nasb"]];
var POS_ITEMS = [["أَكَلَ", "f", "أ ك ل"], ["أَخَذَ", "f", "أ خ ذ"], ["أَمَرَ", "f", "أ م ر"], ["أَذِنَ", "f", "أ ذ ن"], ["أَسَرَ", "f", "أ س ر"], ["أَمِنَ", "f", "أ م ن"], ["أَسِفَ", "f", "أ س ف"], ["أَذَّنَ", "f", "أ ذ ن"], ["آخَذَ", "f", "أ خ ذ"], ["اِسْتَأْذَنَ", "f", "أ ذ ن"], ["تَأَثَّرَ", "f", "أ ث ر"],
  ["سَأَلَ", "a", "س أ ل"], ["سَئِمَ", "a", "س أ م"], ["يَئِسَ", "a", "ي أ س"], ["رَأَسَ", "a", "ر أ س"], ["بَئِسَ", "a", "ب أ س"], ["رَأَى", "a", "ر أ ي"],
  ["قَرَأَ", "l", "ق ر أ"], ["بَدَأَ", "l", "ب د أ"], ["مَلَأَ", "l", "م ل أ"], ["لَجَأَ", "l", "ل ج أ"], ["نَشَأَ", "l", "ن ش أ"], ["بَطُؤَ", "l", "ب ط أ"], ["جَرُؤَ", "l", "ج ر أ"], ["أَنْشَأَ", "l", "ن ش أ"], ["كَافَأَ", "l", "ك ف أ"], ["خَبَأَ", "l", "خ ب أ"]];
var MEH_ITEMS = [["أَخَذَ", "e", "أ خ ذ"], ["سَأَلَ", "e", "س أ ل"], ["قَرَأَ", "e", "ق ر أ"], ["جَاءَ", "e", "ج ي أ: hem ecvef hem mehmûz"], ["رَأَى", "e", "ر أ ي: hem mehmûz hem nâkıs"], ["اِتَّخَذَ", "e", "أ خ ذ: hemze ت olmuş"], ["تَأَخَّرَ", "e", "أ خ ر"], ["شَاءَ", "e", "ش ي أ"], ["أَتَى", "e", "أ ت ي"],
  ["أَكْرَمَ", "x", "ك ر م: hemze if’âl harfi"], ["أَرْسَلَ", "x", "ر س ل: if’âl"], ["أَنْزَلَ", "x", "ن ز ل: if’âl"], ["أَتْرَفَ", "x", "ت ر ف: if’âl"], ["أَخْرَجَ", "x", "خ ر ج: if’âl"], ["قَالَ", "x", "ق و ل: ecvef"], ["رَمَى", "x", "ر م ي: nâkıs"], ["كَتَبَ", "x", "ك ت ب: sâlim"], ["أَحْسَنَ", "x", "ح س ن: if’âl"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · NEDİR
{
  id: "u1", no: 1, ar: "الفِعْلُ المَهْمُوزُ", tr: "Mehmûz Fiil Nedir?", short: "Nedir?", col: "cerr", legend: ["cerr"],
  goals: ["Mehmûz fiilin asıl harflerinden birinin hemze olduğunu bilmek: أَخَذَ، سَأَلَ، قَرَأَ", "Hemzenin yerine göre üç türü ayırmak: fâ (başta), ayn (ortada), lâm (sonda)", "İf’âl bâbının ek hemzesini kök hemzesinden ayırmak: أَكْرَمَ mehmûz değildir"],
  examples: [
    { s: "أَخَذَ:cerr / مُحَمَّدٌ كِتَابًا مِنَ المَكْتَبَةِ.:-", tr: "Muhammed kütüphaneden bir kitap aldı.", pair: "يَأْخُذُ:cerr / مُصْطَفَى أَخَاهُ إِلَى المُسْتَشْفَى.:-", pairTr: "Mustafa kardeşini hastaneye götürüyor." },
    { s: "قَرَأَ:cerr / الكِتَابَ عِنْدَ أَبِيهِ.:-", tr: "Kitabı babasının yanında okudu.", pair: "يَقْرَأُ:cerr / المُدَرِّسُ أَسْمَاءَ الغَائِبِينَ.:-", pairTr: "Öğretmen gelmeyenlerin isimlerini okuyor." },
    { s: "سَأَلَ:cerr / أَبُوهُ عَنِ اسْمِ الكِتَابِ.:-", tr: "Babası kitabın adını sordu.", pair: "يَسْأَلُ:cerr / عَنْ أَخِي مُصْطَفَى.:-", pairTr: "Kardeşim Mustafa’yı soruyor." }
  ],
  rules: [
    { tr: "<b class=\"r-cerr\">Mehmûz fiil</b> (<span class=\"ar\">الفِعْلُ المَهْمُوزُ</span>): asıl harflerinden biri <b>hemze</b> olan fiildir: <span class=\"ar\">أَخَذَ، قَرَأَ، سَأَلَ</span>." },
    { tr: "Hemzenin yerine göre üç türü vardır:", ex: ["مَهْمُوزُ الفَاءِ (başta): أَخَذَ، أَكَلَ، أَمَرَ، أَسِفَ", "مَهْمُوزُ العَيْنِ (ortada): سَأَلَ، سَئِمَ، يَئِسَ", "مَهْمُوزُ اللَّامِ (sonda): قَرَأَ، بَدَأَ، مَلَأَ، بَطُؤَ"] },
    { tr: "Hemze kendi harekesine ve önceki harfin harekesine göre farklı yazılır: esre en güçlüdür (<span class=\"ar\">ئ</span>), sonra ötre (<span class=\"ar\">ؤ</span>), sonra üstün (<span class=\"ar\">أ</span>): <span class=\"ar\">سَأَلَ · سَئِمَ · بَطُؤَ · تَقْرَئِينَ · قَرَؤُوا</span>." },
    { tr: "Dikkat: <span class=\"ar\">أَكْرَمَ، أَرْسَلَ، أَنْزَلَ</span>’deki hemze if’âl bâbının ek harfidir; kökte yoktur (ك ر م), bunlar mehmûz değildir. Tersine <span class=\"ar\">اِتَّخَذَ</span>’de hemze görünmez ama kökü أ خ ذ’dir." }
  ],
  kaide: ["١ ـ الفِعْلُ المَهْمُوزُ: هُوَ مَا كَانَ أَحَدُ حُرُوفِهِ الأَصْلِيَّةِ هَمْزَةً (أ)، مِثْلُ: أَخَذَ، قَرَأَ، سَأَلَ."],
  ex: [
    { type: "find", target: "y", num: "١", ar: "ضَعْ خَطًّا تَحْتَ الفِعْلِ المَهْمُوزِ فِي الآيَاتِ الكَرِيمَةِ التَّالِيَةِ", tr: "Mehmûz fiillere dokun. Tuzak: المَلَأُ، دُعَاءِ isimdir; أَتْرَفْنَا، أَنْزَلَ’deki hemze if’âl hemzesidir.", items: [
      W("وَقَالَ المَلَأُ مِنْ قَوْمِهِ الَّذِينَ كَفَرُوا وَكَذَّبُوا بِلِقَاءِ الآخِرَةِ وَأَتْرَفْنَاهُمْ فِي الحَيَاةِ الدُّنْيَا مَا هَذَا إِلَّا بَشَرٌ مِثْلُكُمْ [يَأْكُلُ] مِمَّا [تَأْكُلُونَ] مِنْهُ وَيَشْرَبُ مِمَّا تَشْرَبُونَ", "Kavminin ileri gelenleri dedi ki: Bu, sizin gibi bir insandan başkası değil; sizin yediğinizden yiyor, içtiğinizden içiyor. (Mü’minûn 33)", "يَأْكُلُ، تَأْكُلُونَ: أَكَلَ (أ ك ل). أَتْرَفْنَا’nın hemzesi if’âl."),
      W("وَأَنْزَلَ الَّذِينَ ظَاهَرُوهُمْ مِنْ أَهْلِ الكِتَابِ مِنْ صَيَاصِيهِمْ وَقَذَفَ فِي قُلُوبِهِمُ الرُّعْبَ فَرِيقًا تَقْتُلُونَ وَ[تَأْسِرُونَ] فَرِيقًا", "Onlara destek veren Ehl-i kitabı kalelerinden indirdi, kalplerine korku saldı; bir kısmını öldürüyor, bir kısmını esir alıyordunuz. (Ahzâb 26)", "تَأْسِرُونَ: أَسَرَ (أ س ر). أَنْزَلَ: if’âl."),
      W("[أَأَمِنْتُمْ] مَنْ فِي السَّمَاءِ أَنْ يَخْسِفَ بِكُمُ الأَرْضَ فَإِذَا هِيَ تَمُورُ", "Gökte olanın sizi yere geçirmeyeceğinden emin mi oldunuz? (Mülk 16)", "أَمِنَ (أ م ن); baştaki hemze soru edatı."),
      W("قُلْ مَا [يَعْبَأُ] بِكُمْ رَبِّي لَوْلَا دُعَاؤُكُمْ فَقَدْ كَذَّبْتُمْ فَسَوْفَ يَكُونُ لِزَامًا", "De ki: Duanız olmasa Rabbim size ne diye değer versin? (Furkân 77)", "عَبَأَ – يَعْبَأُ (ع ب أ). دُعَاؤُكُمْ isim."),
      W("قُلْ هَلْ مِنْ شُرَكَائِكُمْ مَنْ [يَبْدَأُ] الخَلْقَ ثُمَّ يُعِيدُهُ قُلِ اللهُ [يَبْدَأُ] الخَلْقَ ثُمَّ يُعِيدُهُ فَأَنَّى [تُؤْفَكُونَ]", "De ki: Ortaklarınızdan yaratmayı başlatıp sonra onu tekrarlayan var mı? De ki: Allah yaratmayı başlatır… O hâlde nasıl döndürülüyorsunuz? (Yûnus 34)", "يَبْدَأُ (ب د أ); تُؤْفَكُونَ: أَفَكَ (أ ف ك), meçhul."),
      W("لَا [يَسْأَمُ] الإِنْسَانُ مِنْ دُعَاءِ الخَيْرِ وَإِنْ مَسَّهُ الشَّرُّ فَيَئُوسٌ قَنُوطٌ", "İnsan hayır istemekten usanmaz; ona bir kötülük dokununca da ümitsizliğe düşer. (Fussılet 49)", "يَسْأَمُ: سَئِمَ (س أ م). يَئُوسٌ isimdir (sıfat)."),
      W("عَفَا اللهُ عَنْكَ لِمَ [أَذِنْتَ] لَهُمْ حَتَّى يَتَبَيَّنَ لَكَ الَّذِينَ صَدَقُوا وَتَعْلَمَ الكَاذِبِينَ", "Allah seni affetsin; doğru söyleyenler belli olmadan niçin onlara izin verdin? (Tevbe 43)", "أَذِنَ (أ ذ ن)."),
      W("وَمَا بِكُمْ مِنْ نِعْمَةٍ فَمِنَ اللهِ ثُمَّ إِذَا مَسَّكُمُ الضُّرُّ فَإِلَيْهِ [تَجْأَرُونَ]", "Sizdeki her nimet Allah’tandır; size bir sıkıntı dokununca da yalnız O’na yalvarırsınız. (Nahl 53)", "جَأَرَ – يَجْأَرُ (ج أ ر).")
    ]},
    { type: "classify", extra: true, opts: BBO, ar: "أَيْنَ الهَمْزَةُ؟", tr: "Hemze kökün neresinde: başta mı, ortada mı, sonda mı?", items: POS_ITEMS.slice(0, 7).concat(POS_ITEMS.slice(11, 15), POS_ITEMS.slice(17, 22)).map(function (x) { return { s: x[0], a: x[1], why: "Kök: " + x[2] + "." }; }) },
    { type: "classify", extra: true, opts: ASO, ar: "مَهْمُوزٌ أَمْ لَا؟", tr: "Kökte hemze var mı? Baştaki if’âl hemzesine aldanma!", items: MEH_ITEMS.map(function (x) { return { s: x[0], a: x[1], why: "Kök: " + x[2] + "." }; }) }
  ]
},
// ---------------------------------------------------------------- 2 · MÂZİ VE MUZÂRİ
{
  id: "u2", no: 2, ar: "تَصْرِيفُ المَاضِي وَالمُضَارِعِ", tr: "Mâzi ve Muzârinin Çekimi", short: "Mâzi · muzâri", col: "nasb", legend: ["cerr"],
  goals: ["Mehmûz fiili mâzide ve muzâride çekmek", "Hemzenin yazılışını şahsa göre değiştirmek: قَرَآ، قَرَؤُوا، تَقْرَئِينَ", "أَنَا’da iki hemzenin آ olduğunu bilmek: آخُذُ، آكُلُ"],
  examples: [
    { s: "الطَّالِبَانِ:- / قَرَآ:cerr / الدَّرْسَ.:-", tr: "İki öğrenci dersi okudu. (أَ + ا ← آ)", pair: "الطُّلَّابُ:- / قَرَؤُوا:cerr / الدَّرْسَ.:-", pairTr: "Öğrenciler dersi okudu. (ؤ)" },
    { s: "أَنْتِ:- / تَقْرَئِينَ:cerr / القُرْآنَ.:-", tr: "Sen (kadın) Kur’an okuyorsun. (ئ)", pair: "أَنَا:- / آخُذُ:cerr / الكِتَابَ.:-", pairTr: "Ben kitabı alıyorum. (أَأْ ← آ)" }
  ],
  rules: [
    { tr: "Mehmûz fiil <b>sahih fiil gibi</b> çekilir; değişen yalnız hemzenin yazıldığı harftir." },
    { tr: "Hemze sonda olunca (<span class=\"ar\">قَرَأَ</span>):", ex: ["قَرَأَ · قَرَآ · قَرَؤُوا · قَرَأَتْ · قَرَأْنَ · قَرَأْتُ", "يَقْرَأُ · يَقْرَآنِ · يَقْرَؤُونَ · تَقْرَئِينَ · يَقْرَأْنَ"] },
    { tr: "Hemze başta olunca muzâride sâkin kalır ve elif üzerine yazılır: <span class=\"ar\">يَأْخُذُ، يَأْكُلُ</span>. <span class=\"ar\">أَنَا</span>’da muzâri hemzesiyle birleşip <b>آ</b> olur: <span class=\"ar\">آخُذُ، آكُلُ، آمُرُ، آسَفُ</span>." },
    { tr: "Hemze ortada: <span class=\"ar\">سَأَلَ – يَسْأَلُ</span>, <span class=\"ar\">سَئِمَ – يَسْأَمُ</span> (mâzide esreli olduğu için ئ, muzâride üstünlü olduğu için أ)." }
  ],
  kaide: ["تَصْرِيفُ الفِعْلِ المَهْمُوزِ المَاضِي مَعَ ضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ: قَرَأَ، قَرَآ، قَرَؤُوا، قَرَأَتْ، قَرَأَتَا، قَرَأْنَ، قَرَأْتَ، قَرَأْتُمَا، قَرَأْتُمْ، قَرَأْتِ، قَرَأْتُمَا، قَرَأْتُنَّ، قَرَأْتُ، قَرَأْنَا.", "تَصْرِيفُ الفِعْلِ المَهْمُوزِ المُضَارِعِ: يَقْرَأُ، يَقْرَآنِ، يَقْرَؤُونَ، تَقْرَأُ، تَقْرَآنِ، يَقْرَأْنَ، تَقْرَأُ، تَقْرَآنِ، تَقْرَؤُونَ، تَقْرَئِينَ، تَقْرَآنِ، تَقْرَأْنَ، أَقْرَأُ، نَقْرَأُ."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "حَوِّلِ الفِعْلَ المَهْمُوزَ المَاضِيَ إِلَى المُضَارِعِ", tr: "Mâziyi muzâriye çevir.", exHtml: "<span class=\"ar\">أَكَلَ الوَلَدُ الفَوَاكِهَ أَمَامَهُ ← يَأْكُلُ الوَلَدُ الفَوَاكِهَ أَمَامَهُ</span>", items: PL([
      ["أَمَرَ المُدِيرُ بِالخُرُوجِ مِنْ غُرْفَتِهِ. ← ___ المُدِيرُ بِالخُرُوجِ مِنْ غُرْفَتِهِ.", "يَأْمُرُ", "يَأْمِرُ", "يُؤْمِرُ", "Müdür odasından çıkmayı emrediyor.", "1. bâb: يَأْمُرُ."],
      ["سَئِمْتُ مِنَ الانْتِظَارِ. ← ___ مِنَ الانْتِظَارِ.", "أَسْأَمُ", "أَسْئِمُ", "يَسْأَمُ", "Beklemekten usanıyorum.", "4. bâb: muzâride ayn üstünlü, hemze أ."],
      ["أَخَّرَتِ المَدْرَسَةُ وَقْتَ الامْتِحَانِ. ← ___ المَدْرَسَةُ وَقْتَ الامْتِحَانِ.", "تُؤَخِّرُ", "تُأَخِّرُ", "تَأْخُرُ", "Okul sınav vaktini erteliyor.", "Ötreden sonra hemze و üzerine: تُؤَخِّرُ."],
      ["بَدَأَ المُدَرِّسُ شَرْحَ القَوَاعِدِ. ← ___ المُدَرِّسُ شَرْحَ القَوَاعِدِ.", "يَبْدَأُ", "يَبْدُؤُ", "يَبْدِئُ", "Öğretmen kuralları anlatmaya başlıyor.", "3. bâb: يَبْدَأُ."],
      ["قَرَأْنَا هَذَا الكِتَابَ فِي يَوْمَيْنِ. ← ___ هَذَا الكِتَابَ فِي يَوْمَيْنِ.", "نَقْرَأُ", "نَقْرُؤُ", "يَقْرَؤُونَ", "Bu kitabı iki günde okuyoruz.", "نَحْنُ: نَقْرَأُ."],
      ["مَلَأَ المُسَافِرُ حَقِيبَتَهُ بِالمَلَابِسِ. ← ___ المُسَافِرُ حَقِيبَتَهُ بِالمَلَابِسِ.", "يَمْلَأُ", "يَمْلُؤُ", "يَمْلِئُ", "Yolcu çantasını giysilerle dolduruyor.", "3. bâb: يَمْلَأُ."],
      ["لَجَأَ النَّاسُ إِلَى بَلَدٍ آخَرَ. ← ___ النَّاسُ إِلَى بَلَدٍ آخَرَ.", "يَلْجَأُ", "يَلْجُؤُ", "يَلْجِئُ", "İnsanlar başka bir ülkeye sığınıyor.", "3. bâb: يَلْجَأُ."],
      ["أَسِفْتُ عَلَى هَذِهِ الأَحْدَاثِ. ← ___ عَلَى هَذِهِ الأَحْدَاثِ.", "آسَفُ", "أَأْسَفُ", "أَسِفُ", "Bu olaylara üzülüyorum.", "أَنَا: iki hemze birleşir, آسَفُ."]
    ])},
    { type: "tablo", num: "٤ · ٧", ar: "صَرِّفِ الفِعْلَ المَهْمُوزَ المَاضِيَ", tr: "Mâziyi çek: önce aşağıdan bir biçim seç, sonra tablodaki yerine dokun. Tuzaklar hemzenin yanlış yazıldığı biçimlerdir.", items: [TBL("أَخَذَ", "m"), TBL("سَأَلَ", "m")] },
    { type: "tablo", num: "٥ · ٨", ar: "صَرِّفِ الفِعْلَ المَهْمُوزَ المُضَارِعَ", tr: "Muzâriyi çek: أَنَا’ya dikkat (آخُذُ).", items: [TBL("أَخَذَ", "u"), TBL("سَأَلَ", "u")] },
    { type: "tablo", extra: true, ar: "صَرِّفْ", tr: "Ek çalışma: hemzesi sonda ve ortada olan fiiller.", items: [TBL("بَدَأَ", "m"), TBL("سَئِمَ", "m"), TBL("مَلَأَ", "u"), TBL("بَطُؤَ", "u")] }
  ]
},
// ---------------------------------------------------------------- 3 · EMİR
{
  id: "u3", no: 3, ar: "فِعْلُ الأَمْرِ المَهْمُوزُ", tr: "Emir ve Hemzenin Düşmesi", short: "Emir", col: "mi", legend: ["cerr"],
  goals: ["أَكَلَ، أَخَذَ، أَمَرَ’in emrinde hemzenin düştüğünü bilmek: كُلْ، خُذْ، مُرْ", "سَأَلَ’in emrinin çoğunlukla سَلْ olduğunu bilmek (اِسْأَلْ de doğru)", "Öteki mehmûz fiillerin emrini yapmak: اِقْرَأْ، اِقْرَئِي، اِيسَفْ"],
  examples: [
    { s: "خُذْ:cerr / الكِتَابَ بِقُوَّةٍ.:-", tr: "Kitabı kuvvetle tut.", pair: "كُلُوا:cerr / وَاشْرَبُوا وَلَا تُسْرِفُوا.:-", pairTr: "Yiyin, için, israf etmeyin. (A’râf 31)" },
    { s: "سَلْ:cerr / بَنِي إِسْرَائِيلَ.:-", tr: "İsrâiloğullarına sor. (Bakara 211)", pair: "اِقْرَأْ:cerr / بِاسْمِ رَبِّكَ.:-", pairTr: "Rabbinin adıyla oku. (Alak 1)" }
  ],
  rules: [
    { tr: "<span class=\"ar\">أَكَلَ، أَخَذَ، أَمَرَ</span>’in emrinde hemze <b>düşer</b>:", ex: ["أَكَلَ – يَأْكُلُ – كُلْ · كُلَا · كُلُوا · كُلِي · كُلْنَ", "أَخَذَ – يَأْخُذُ – خُذْ · خُذُوا · خُذِي", "أَمَرَ – يَأْمُرُ – مُرْ (وَ / فَ’den sonra: وَأْمُرْ)"] },
    { tr: "<span class=\"ar\">سَأَلَ</span>’in emrinde hemze <b>çoğunlukla</b> düşer: <span class=\"ar\">سَلْ، سَلُوا، سَلِي</span>; hemzeli biçim de doğrudur: <span class=\"ar\">اِسْأَلْ</span>." },
    { tr: "Öteki fiillerde emir düzenlidir: <span class=\"ar\">اِقْرَأْ، اِقْرَآ، اِقْرَؤُوا، اِقْرَئِي، اِقْرَأْنَ</span>. Vasıl elifinden sonra sâkin hemze ي olur: <span class=\"ar\">أَسِفَ ← اِيسَفْ</span>." }
  ],
  kaide: ["٢ ـ تُحْذَفُ الهَمْزَةُ فِي أَمْرِ «أَكَلَ، أَخَذَ، أَمَرَ»: أَكَلَ – يَأْكُلُ – كُلْ، أَخَذَ – يَأْخُذُ – خُذْ، أَمَرَ – يَأْمُرُ – مُرْ.", "٣ ـ أَمَّا أَمْرُ «سَأَلَ» فَغَالِبًا تُحْذَفُ هَمْزَتُهُ: سَأَلَ – يَسْأَلُ – سَلْ / اِسْأَلْ.", "تَصْرِيفُ فِعْلِ الأَمْرِ المَهْمُوزِ: اِقْرَأْ، اِقْرَآ، اِقْرَؤُوا، اِقْرَئِي، اِقْرَآ، اِقْرَأْنَ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "حَوِّلِ الفِعْلَ المَهْمُوزَ المَاضِيَ فِي التَّدْرِيبِ السَّابِقِ إِلَى أَمْرِ الحَاضِرِ", tr: "Emre çevir.", exHtml: "<span class=\"ar\">أَكَلَ الوَلَدُ الفَوَاكِهَ أَمَامَهُ ← كُلِ الفَوَاكِهَ أَمَامَكَ</span>", items: PL([
      ["أَمَرَ المُدِيرُ بِالخُرُوجِ ← ___ بِالخُرُوجِ مِنْ غُرْفَتِكَ.", "مُرْ", "اُؤْمُرْ", "أُمُرْ", "Odandan çıkılmasını emret.", "Hemze düşer: مُرْ."],
      ["سَئِمْتُ مِنَ الانْتِظَارِ ← ___ مِنَ الانْتِظَارِ.", "اِسْأَمْ", "سَمْ", "اِسْئَمْ", "Beklemekten usan! (Anlamca nehy daha uygun: لَا تَسْأَمْ.)", "Hemze düşmez: اِسْأَمْ."],
      ["أَخَّرَتِ المَدْرَسَةُ وَقْتَ الامْتِحَانِ ← ___ وَقْتَ الامْتِحَانِ.", "أَخِّرْ", "آخِرْ", "أُؤَخِّرْ", "Sınav vaktini ertele.", "Tef’îl emri: أَخِّرْ."],
      ["بَدَأَ المُدَرِّسُ شَرْحَ القَوَاعِدِ ← ___ شَرْحَ القَوَاعِدِ.", "اِبْدَأْ", "اُبْدُؤْ", "بَدْ", "Kuralları anlatmaya başla.", "اِبْدَأْ."],
      ["قَرَأْنَا هَذَا الكِتَابَ ← ___ هَذَا الكِتَابَ فِي يَوْمَيْنِ.", "اِقْرَؤُوا", "اِقْرَئُوا", "قَرُوا", "Bu kitabı iki günde okuyun.", "أَنْتُمْ: اِقْرَؤُوا (hemze و üzerinde)."],
      ["مَلَأَ المُسَافِرُ حَقِيبَتَهُ ← ___ حَقِيبَتَكَ بِالمَلَابِسِ.", "اِمْلَأْ", "اُمْلُؤْ", "مَلْ", "Çantanı giysilerle doldur.", "اِمْلَأْ."],
      ["لَجَأَ النَّاسُ إِلَى بَلَدٍ آخَرَ ← ___ إِلَى بَلَدٍ آخَرَ.", "اِلْجَؤُوا", "اِلْجَئُوا", "اُلْجُؤُوا", "Başka bir ülkeye sığının.", "أَنْتُمْ: اِلْجَؤُوا."],
      ["أَسِفْتُ عَلَى هَذِهِ الأَحْدَاثِ ← ___ عَلَى هَذِهِ الأَحْدَاثِ.", "اِيسَفْ", "اِأْسَفْ", "سَفْ", "Bu olaylara üzül.", "Vasıl elifinden sonra sâkin hemze ي olur: اِيسَفْ."]
    ])},
    { type: "tablo", num: "٦ · ٩", ar: "صَرِّفْ فِعْلَ الأَمْرِ المَهْمُوزِ", tr: "Emri çek: خُذْ ve سَلْ (hemzesi düşen emirler).", items: [TBL("أَخَذَ", "e"), TBL("سَأَلَ", "e")] },
    { type: "tablo", extra: true, ar: "صَرِّفْ فِعْلَ الأَمْرِ", tr: "Ek çalışma: كُلْ ile اِقْرَأْ ve اِيسَفْ.", items: [TBL("أَكَلَ", "e"), TBL("قَرَأَ", "e"), TBL("أَسِفَ", "e")] },
    { type: "combo", num: "١٠", ar: "امْلَإِ الفَرَاغَ بِالصُّورَةِ الصَّحِيحَةِ لِلْفِعْلِ المَهْمُوزِ", tr: "Verilen biçimden diğer iki sütunu seç (sırayla).", items: FT(FT1) }
  ]
},
// ---------------------------------------------------------------- 4 · MEZÎD
{
  id: "u4", no: 4, ar: "المَهْمُوزُ المَزِيدُ", tr: "Mezîd Mehmûz", short: "Mezîd", col: "ref", legend: ["cerr"],
  goals: ["Mezîd mehmûz fiilleri üç zamanda çekmek: أَنْشَأَ، أَذَّنَ، آخَذَ، اِسْتَأْذَنَ، اِتَّخَذَ، تَأَثَّرَ", "Muzâri ön ekinin ötresinden sonra hemzenin و’ya yazıldığını görmek: يُؤَذِّنُ، يُؤَاخِذُ", "Esreden sonra ي’ye yazıldığını görmek: يُنْشِئُ، يَخْتَبِئُ"],
  examples: [
    { s: "يُؤَذِّنُ:cerr / المُؤَذِّنُ لِصَلَاةِ الفَجْرِ.:-", tr: "Müezzin sabah namazı için ezan okuyor.", pair: "﴿لَا:- / يُؤَاخِذُكُمُ:cerr / اللهُ بِاللَّغْوِ فِي أَيْمَانِكُمْ﴾:-", pairTr: "Allah sizi yeminlerinizdeki boş sözlerden dolayı sorumlu tutmaz. (Bakara 225)" },
    { s: "أَنْشَأَتِ:cerr / الدَّوْلَةُ مَدَارِسَ جَدِيدَةً.:-", tr: "Devlet yeni okullar kurdu.", pair: "يَسْتَأْذِنُ:cerr / الطَّالِبُ قَبْلَ الدُّخُولِ.:-", pairTr: "Öğrenci girmeden önce izin istiyor." }
  ],
  rules: [
    { tr: "Mezîd mehmûz da sahih gibi çekilir; hemze yine harekelere göre yazılır:", ex: ["أَنْشَأَ – يُنْشِئُ – أَنْشِئْ (esreden sonra ئ)", "أَذَّنَ – يُؤَذِّنُ – أَذِّنْ (ötreden sonra ؤ)", "آخَذَ – يُؤَاخِذُ – آخِذْ (أَ + ا ← آ)", "اِسْتَأْذَنَ – يَسْتَأْذِنُ – اِسْتَأْذِنْ · تَأَثَّرَ – يَتَأَثَّرُ – تَأَثَّرْ"] },
    { tr: "<span class=\"ar\">أَنْشَأَ</span>’nın baştaki hemzesi if’âl hemzesidir; kök hemzesi sondadır (ن ش أ). <span class=\"ar\">أَذَّنَ، آخَذَ</span>’de ise baştaki hemze köktendir (أ ذ ن، أ خ ذ)." },
    { tr: "<span class=\"ar\">اِتَّخَذَ</span> (أ خ ذ): ifti’âlde kök hemzesi ت olur ve ت ile kaynaşır: <span class=\"ar\">اِتَّخَذَ – يَتَّخِذُ – اِتَّخِذْ</span>; çekimde hemze görünmez." },
    { tr: "Muzâride <span class=\"ar\">أَنَا</span>: <span class=\"ar\">أُنْشِئُ، أُؤَذِّنُ، أُؤَاخِذُ، أَسْتَأْذِنُ، أَتَّخِذُ، أَتَأَثَّرُ</span>." }
  ],
  kaide: ["صَرِّفِ الفِعْلَ المَهْمُوزَ المَزِيدَ: أَنْشَأَ – يُنْشِئُ – أَنْشِئْ، أَذَّنَ – يُؤَذِّنُ – أَذِّنْ، آخَذَ – يُؤَاخِذُ – آخِذْ، اِسْتَأْذَنَ – يَسْتَأْذِنُ – اِسْتَأْذِنْ، اِتَّخَذَ – يَتَّخِذُ – اِتَّخِذْ، تَأَثَّرَ – يَتَأَثَّرُ – تَأَثَّرْ."],
  ex: [
    { type: "tablo", num: "١١ ـ ٢٧", ar: "صَرِّفِ الفِعْلَ المَهْمُوزَ المَزِيدَ المَاضِيَ", tr: "Mezîd mehmûzun mâzisi: أَنْشَآ، أَنْشَؤُوا; آخَذْتُ…", items: [TBL("أَنْشَأَ", "m"), TBL("أَذَّنَ", "m"), TBL("آخَذَ", "m"), TBL("اِسْتَأْذَنَ", "m"), TBL("اِتَّخَذَ", "m"), TBL("تَأَثَّرَ", "m")] },
    { type: "tablo", num: "١٢ ـ ٢٨", ar: "صَرِّفِ الفِعْلَ المَهْمُوزَ المَزِيدَ المُضَارِعَ", tr: "Mezîd mehmûzun muzârisi: يُنْشِئُ، يُؤَذِّنُ، يُؤَاخِذُ…", items: [TBL("أَنْشَأَ", "u"), TBL("أَذَّنَ", "u"), TBL("آخَذَ", "u"), TBL("اِسْتَأْذَنَ", "u"), TBL("اِتَّخَذَ", "u"), TBL("تَأَثَّرَ", "u")] },
    { type: "tablo", num: "١٣ ـ ٢٩", ar: "صَرِّفْ فِعْلَ الأَمْرِ المَهْمُوزِ المَزِيدِ", tr: "Mezîd mehmûzun emri: أَنْشِئْ، أَذِّنْ، آخِذْ، اِسْتَأْذِنْ، اِتَّخِذْ، تَأَثَّرْ.", items: [TBL("أَنْشَأَ", "e"), TBL("أَذَّنَ", "e"), TBL("آخَذَ", "e"), TBL("اِسْتَأْذَنَ", "e"), TBL("اِتَّخَذَ", "e"), TBL("تَأَثَّرَ", "e")] },
    { type: "combo", num: "٢٠", ar: "امْلَإِ الفَرَاغَ بِالصُّورَةِ الصَّحِيحَةِ لِلْفِعْلِ المَهْمُوزِ", tr: "Mezîd: verilen biçimden diğer iki sütunu seç (sırayla).", items: FT(FT2) }
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "القِرَاءَةُ: هُدُوءُ الغَابَةِ", tr: "Okuma: Ormanın Sessizliği", short: "Okuma", col: "muz", legend: ["cerr"],
  goals: ["Metinde mehmûz fiilleri bulmak: سَئِمَ، رَأَى، قَرَأَ، أَكَلَ، بَدَأَ، أَخَذَ", "Bir harfle mezîd fiilleri bulmak: أَخْرَجَ، أَطْلَقَ، أَفْزَعَ، فَكَّرَ، نُحَافِظَ", "Hemzenin kökteki yerini söylemek"],
  examples: [
    { s: "سَئِمَ:cerr / عَلِيٌّ مِنْ كَثْرَةِ الأَعْمَالِ.:-", tr: "Ali işlerin çokluğundan bıktı.", pair: "وَ:- / أَخَذَهُ:cerr / العَجَبُ مِمَّا رَأَى.:-", pairTr: "Gördüklerine hayran kaldı." }
  ],
  rules: [
    { tr: "Metindeki mehmûz fiiller: <span class=\"ar\">سَئِمَ (س أ م)، رَأَى (ر أ ي)، قَرَأَ، أَكَلَ، بَدَأَ، أَخَذَهُ</span>. <span class=\"ar\">رَأَى</span> hem mehmûz hem nâkıstır." },
    { tr: "Bir harfle mezîd: if’âl (<span class=\"ar\">أَخْرَجَ، أَطْلَقَ، أَفْزَعَ، أَلْقَى، يُصِبْ</span>), tef’îl (<span class=\"ar\">يُفَتِّشُ، تُغَرِّدُ، فَكَّرَ</span>), mufâ’ale (<span class=\"ar\">يُشَاهِدَ، نُحَافِظَ</span>). <span class=\"ar\">يَتَنَفَّسَ</span> iki harfle mezîddir." }
  ],
  kaide: ["اقْرَإِ النَّصَّ التَّالِيَ، وَاسْتَخْرِجْ مِنْهُ: الأَفْعَالَ المَهْمُوزَةَ، وَمَزِيدَ الثُّلَاثِيِّ بِحَرْفٍ وَاحِدٍ."],
  ex: [
    { type: "reading", num: "٣٠", ar: "اقْرَإِ النَّصَّ التَّالِيَ وَاسْتَخْرِجْ مِنْهُ الأَفْعَالَ المَهْمُوزَةَ وَمَزِيدَ الثُّلَاثِيِّ بِحَرْفٍ وَاحِدٍ", tr: "Metni oku, soruları cevapla; sonra koyu fiilin türünü ve hemzenin yerini seç.", title: "هُدُوءُ الغَابَةِ",
      text: METIN,
      textTr: "Ali işlerin çokluğundan bıktı ve şehrine yakın ormana gidip güzel manzarasını seyretmeye, temiz havasını solumaya niyet etti. Ormana varınca harika bir manzara gördü: su ağaçların arasından akıyor, kuşlar dallarda ötüyordu. Gölgelerin altına oturdu ve cebinde taşıdığı kitaptan okudu. Öğle vakti gelince yabani meyvelerden yedi.<br>Öğleden sonra çantasında taşıdığı tüfeği çıkardı ve kuşları, tavşanları aramaya başladı. Çok geçmeden bazı kuşlara ve tavşanlara ateş etti, ama hiçbir şeyi vuramadı ve ormandaki bütün hayvanları korkuttu. O zaman kendi kendine düşündü: “Güven ve barış içinde yaşayan orman hayvanlarını korkutmak bana yakışmaz.” Sonra maymunları, bülbülleri ve çeşit çeşit kuşu gördü; gördüklerine hayran kaldı ve içinden dedi ki: “Ya Rabbi, bu manzara ne güzel! Onu korumalı, Allah’ın bize bağışladığı tabiatı bozmamalıyız.”<br>Ali keyifli bir gün geçirdi; eve dönünce yorgun bir şekilde kendini yatağa attı ve o gece huzurla uyudu.",
      qa: [
        { q: "لِمَاذَا ذَهَبَ عَلِيٌّ إِلَى الغَابَةِ؟", a: "لِأَنَّهُ سَئِمَ مِنْ كَثْرَةِ الأَعْمَالِ، فَأَرَادَ أَنْ يُشَاهِدَ مَنْظَرَهَا وَيَتَنَفَّسَ هَوَاءَهَا النَّقِيَّ.", tr: "Ali ormana niçin gitti? İşlerin çokluğundan bıktığı için; manzarayı seyretmek, temiz hava solumak istedi." },
        { q: "مَاذَا رَأَى عِنْدَمَا وَصَلَ إِلَى الغَابَةِ؟", a: "رَأَى المَاءَ يَجْرِي بَيْنَ الأَشْجَارِ وَالطُّيُورَ تُغَرِّدُ عَلَى الأَغْصَانِ.", tr: "Ormana varınca ne gördü? Ağaçlar arasında akan suyu ve dallarda öten kuşları." },
        { q: "هَلْ أَصَابَ عَلِيٌّ شَيْئًا مِنَ الطُّيُورِ وَالأَرَانِبِ؟", a: "لَا، لَمْ يُصِبْ شَيْئًا، وَلَكِنَّهُ أَفْزَعَ الحَيَوَانَاتِ.", tr: "Ali kuş ya da tavşan vurabildi mi? Hayır; ama hayvanları korkuttu." },
        { q: "مَاذَا قَالَ عَلِيٌّ فِي نَفْسِهِ؟", a: "قَالَ: عَلَيْنَا أَنْ نُحَافِظَ عَلَى الطَّبِيعَةِ وَلَا نُفْسِدَهَا.", tr: "Ali içinden ne dedi? Tabiatı korumalı, bozmamalıyız." }
      ],
      cls: { opts: [["e", "Mehmûz (sülâsî)", "مَهْمُوزٌ", "cerr"], ["z", "Bir harfle mezîd", "مَزِيدٌ بِحَرْفٍ", "nasb"], ["o", "Başka", "غَيْرُ ذَلِكَ", "x"]], ar: "مَا نَوْعُ الفِعْلِ؟", tr: "Koyu fiil mehmûz mu, bir harfle mezîd mi, başka mı?", items: [
        { s: HL("سَئِمَ عَلِيٌّ مِنْ كَثْرَةِ الأَعْمَالِ", "سَئِمَ"), a: "e", why: "س أ م: mehmûzü’l-ayn." },
        { s: HL("لِيُشَاهِدَ مَنْظَرَهَا الجَمِيلَ", "لِيُشَاهِدَ"), a: "z", why: "شَاهَدَ: mufâ’ale (bir harf: ا)." },
        { s: HL("وَيَتَنَفَّسَ هَوَاءَهَا النَّقِيَّ", "وَيَتَنَفَّسَ"), a: "o", why: "تَنَفَّسَ: iki harfle mezîd (tefe’ul)." },
        { s: HL("رَأَى مَنْظَرًا رَائِعًا", "رَأَى"), a: "e", why: "ر أ ي: mehmûzü’l-ayn (aynı zamanda nâkıs)." },
        { s: HL("وَالطُّيُورُ تُغَرِّدُ عَلَى الأَغْصَانِ", "تُغَرِّدُ"), a: "z", why: "غَرَّدَ: tef’îl." },
        { s: HL("جَلَسَ تَحْتَ الظِّلَالِ", "جَلَسَ"), a: "o", why: "Sülâsî sâlim." },
        { s: HL("وَقَرَأَ مِنَ الكِتَابِ", "وَقَرَأَ"), a: "e", why: "ق ر أ: mehmûzü’l-lâm." },
        { s: HL("أَكَلَ مِنَ الفَوَاكِهِ البَرِّيَّةِ", "أَكَلَ"), a: "e", why: "أ ك ل: mehmûzü’l-fâ." },
        { s: HL("أَخْرَجَ بُنْدُقِيَّتَهُ", "أَخْرَجَ"), a: "z", why: "if’âl: hemze ek harftir, mehmûz değil." },
        { s: HL("وَبَدَأَ يُفَتِّشُ عَنِ الطُّيُورِ", "وَبَدَأَ"), a: "e", why: "ب د أ: mehmûzü’l-lâm." },
        { s: HL("وَبَدَأَ يُفَتِّشُ عَنِ الطُّيُورِ", "يُفَتِّشُ"), a: "z", why: "فَتَّشَ: tef’îl." },
        { s: HL("حَتَّى أَطْلَقَ النَّارَ", "أَطْلَقَ"), a: "z", why: "if’âl." },
        { s: HL("وَأَفْزَعَ كُلَّ الحَيَوَانَاتِ", "وَأَفْزَعَ"), a: "z", why: "if’âl." },
        { s: HL("عِنْدَئِذٍ فَكَّرَ فِي نَفْسِهِ", "فَكَّرَ"), a: "z", why: "tef’îl." },
        { s: HL("وَأَخَذَهُ العَجَبُ مِمَّا رَأَى", "وَأَخَذَهُ"), a: "e", why: "أ خ ذ: mehmûzü’l-fâ." },
        { s: HL("عَلَيْنَا أَنْ نُحَافِظَ عَلَيْهِ", "نُحَافِظَ"), a: "z", why: "حَافَظَ: mufâ’ale." },
        { s: HL("أَلْقَى نَفْسَهُ عَلَى الفِرَاشِ", "أَلْقَى"), a: "z", why: "if’âl (ل ق ي)." },
        { s: HL("قَضَى عَلِيٌّ يَوْمًا مُمْتِعًا", "قَضَى"), a: "o", why: "Sülâsî nâkıs." }
      ]},
      cls2: { opts: BBO, ar: "أَيْنَ الهَمْزَةُ؟", tr: "Metindeki mehmûz fiilde hemze kökün neresinde?", items: [
        { s: "سَئِمَ", a: "a", why: "س أ م." }, { s: "رَأَى", a: "a", why: "ر أ ي." }, { s: "قَرَأَ", a: "l", why: "ق ر أ." },
        { s: "أَكَلَ", a: "f", why: "أ ك ل." }, { s: "بَدَأَ", a: "l", why: "ب د أ." }, { s: "أَخَذَهُ", a: "f", why: "أ خ ذ." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var SUL = VERBS.filter(SUL_V);
function twoWrong(f, extra) {
  var d = SWAP(f).concat(extra || []).filter(function (x, i, a) { return x && x !== f && a.indexOf(x) === i; });
  return d.length >= 2 ? [f, d[0], d[1]] : null;
}
var NK_POOL = [];
VERBS.forEach(function (v) {
  var mz = MAZ(v), mu = MUZ(v), em = EMR(v), r;
  if ((r = twoWrong(mz[2], [HZ(v.ml + "ُونَ")]))) NK_POOL.push(["(" + v.m + ") " + PER[2] + " {" + mz[2] + "}", r, v.m + " · هُمْ (mâzi)", "onlar · " + v.tr, "u2"]);
  if ((r = twoWrong(mz[1], [mz[2]]))) NK_POOL.push(["(" + v.m + ") " + PER[1] + " {" + mz[1] + "}", r, v.m + " · هُمَا (mâzi)", "o ikisi · " + v.tr, "u2"]);
  if ((r = twoWrong(mu[9], [mu[6]]))) NK_POOL.push(["(" + v.m + ") " + PER[9] + " {" + mu[9] + "}", r, v.m + " · أَنْتِ (muzâri)", "sen (kadın) · " + v.tr, SUL_V(v) ? "u2" : "u4"]);
  if ((r = twoWrong(mu[12], [HZ("أَ" + v.ul + "ُ"), mu[0]]))) NK_POOL.push(["(" + v.m + ") " + PER[12] + " {" + mu[12] + "}", r, v.m + " · أَنَا (muzâri)", "ben · " + v.tr, SUL_V(v) ? "u2" : "u4"]);
  if ((r = twoWrong(em[0], [HZ("اُ" + v.ul.replace(/^[^ْ]*ْ/, "") + "ْ"), HZ(v.el + "ُ")]))) NK_POOL.push(["(" + v.m + ") " + EPER[0] + " {" + em[0] + "}", r, v.m + " · emir أَنْتَ", "sen · " + v.tr, SUL_V(v) ? "u3" : "u4"]);
});
NK_POOL = NK_POOL.filter(function (p) { return p[1].every(function (x, i, a) { return x && a.indexOf(x) === i; }); });
var BB_LIST = POS_ITEMS.map(function (x) { return [x[0], x[1], POSN[x[1]][0] + ": " + x[2]]; });
var AS_LIST = MEH_ITEMS.map(function (x) { return [x[0], x[1], "Kök: " + x[2] + "."]; });
var HAFIZA = {
  mu: { name: "Mâzi ↔ muzâri", pairs: [["أَخَذَ", "يَأْخُذُ"], ["سَأَلَ", "يَسْأَلُ"], ["قَرَأَ", "يَقْرَأُ"], ["سَئِمَ", "يَسْأَمُ"], ["أَنْشَأَ", "يُنْشِئُ"], ["أَذَّنَ", "يُؤَذِّنُ"], ["آخَذَ", "يُؤَاخِذُ"], ["بَطُؤَ", "يَبْطُؤُ"]] },
  ue: { name: "Muzâri ↔ emir", pairs: [["يَأْخُذُ", "خُذْ"], ["يَأْكُلُ", "كُلْ"], ["يَأْمُرُ", "مُرْ"], ["يَسْأَلُ", "سَلْ"], ["يَقْرَأُ", "اِقْرَأْ"], ["يَأْسَفُ", "اِيسَفْ"], ["يُنْشِئُ", "أَنْشِئْ"], ["يَتَّخِذُ", "اِتَّخِذْ"]] },
  tr: { name: "Fiil ↔ Türkçe", pairs: [["قَرَؤُوا", "okudular"], ["تَقْرَئِينَ", "okuyorsun (kadın)"], ["آخُذُ", "alıyorum"], ["خُذُوا", "alın"], ["سَلْ", "sor"], ["يُؤَذِّنُ", "ezan okuyor"], ["اِسْتَأْذَنْتُ", "izin istedim"], ["قَرَآ", "o ikisi okudu"]] }
};
var KARTLAR = [
  ["Mehmûz fiil nedir?", "Asıl harflerinden biri hemze olan fiil: أَخَذَ، سَأَلَ، قَرَأَ"],
  ["Üç türü?", "Fâ (أَخَذَ) · ayn (سَأَلَ) · lâm (قَرَأَ)"],
  ["أَكْرَمَ mehmûz mu?", "Hayır: hemze if’âl harfi; kök ك ر م."],
  ["Hemze neye göre yazılır?", "Kendi ve önceki harfin harekesine göre: esre ئ > ötre ؤ > üstün أ"],
  ["قَرَأَ’nın müsennâsı?", "قَرَآ (أَ + ا ← آ) · cemi: قَرَؤُوا"],
  ["أَنْتِ تَقْرَأُ?", "Hayır: تَقْرَئِينَ (ئ)"],
  ["أَنَا + يَأْخُذُ?", "آخُذُ: iki hemze birleşip آ olur."],
  ["Hemzesi düşen emirler?", "كُلْ، خُذْ، مُرْ; سَأَلَ: سَلْ (ya da اِسْأَلْ)"],
  ["أَسِفَ’nin emri?", "اِيسَفْ: vasıl elifinden sonra sâkin hemze ي olur."],
  ["أَذَّنَ’nin muzârisi?", "يُؤَذِّنُ: ötreden sonra ؤ"],
  ["آخَذَ’nin muzârisi?", "يُؤَاخِذُ (kitaptaki يُآخِذُ yanlıştır)"],
  ["اِتَّخَذَ neden mehmûz?", "Kökü أ خ ذ; hemze ت olup idğam edilmiştir."]
];
