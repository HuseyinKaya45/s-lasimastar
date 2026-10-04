// ================= VERİ: Lefîf Fiil ve Çekimi (الفِعْلُ اللَّفِيفُ وَتَصْرِيفُهُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "الفِعْلُ اللَّفِيفُ", tr: "Lefîf fiil" }, nasb: { ar: "حَرْفُ العِلَّةِ", tr: "İllet harfi" }, mi: { ar: "الضَّمِيرُ", tr: "Zamir eki" },
  mz: { ar: "", tr: "Başka fiil" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// ---------- Çekim motoru ----------
// 14 hücre: هو هما هم | هي هما هن | أنتَ أنتما أنتم | أنتِ أنتما أنتنّ | أنا نحن
var PER = ["هُوَ", "هُمَا", "هُمْ", "هِيَ", "هُمَا", "هُنَّ", "أَنْتَ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتِ", "أَنْتُمَا", "أَنْتُنَّ", "أَنَا", "نَحْنُ"];
var PER_TR = ["o (erkek)", "o ikisi (erkek)", "onlar (erkek)", "o (kadın)", "o ikisi (kadın)", "onlar (kadın)", "sen (erkek)", "siz ikiniz (erkek)", "siz (erkek)", "sen (kadın)", "siz ikiniz (kadın)", "siz (kadın)", "ben", "biz"];
var EPER = ["أَنْتَ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتِ", "أَنْتُمَا", "أَنْتُنَّ"];
var MSUF = {
  Y: ["ى", "يَا", "وْا", "تْ", "تَا", "يْنَ", "يْتَ", "يْتُمَا", "يْتُمْ", "يْتِ", "يْتُمَا", "يْتُنَّ", "يْتُ", "يْنَا"],
  A: ["ِيَ", "ِيَا", "ُوا", "ِيَتْ", "ِيَتَا", "ِينَ", "ِيتَ", "ِيتُمَا", "ِيتُمْ", "ِيتِ", "ِيتُمَا", "ِيتُنَّ", "ِيتُ", "ِينَا"]
};
var UPRE = ["ي", "ي", "ي", "ت", "ت", "ي", "ت", "ت", "ت", "ت", "ت", "ت", "أ", "ن"];
var USUF = {
  Y: ["ِي", "ِيَانِ", "ُونَ", "ِي", "ِيَانِ", "ِينَ", "ِي", "ِيَانِ", "ُونَ", "ِينَ", "ِيَانِ", "ِينَ", "ِي", "ِي"],
  A: ["َى", "َيَانِ", "َوْنَ", "َى", "َيَانِ", "َيْنَ", "َى", "َيَانِ", "َوْنَ", "َيْنَ", "َيَانِ", "َيْنَ", "َى", "َى"]
};
var ESUF = { Y: ["ِ", "ِيَا", "ُوا", "ِي", "ِيَا", "ِينَ"], A: ["َ", "َيَا", "َوْا", "َيْ", "َيَا", "َيْنَ"] };
// Fiil: [mâzi, mâzi tipi, mâzi gövdesi, muzâri ön ek harekesi, muzâri gövdesi, muzâri tipi, emir başı, Türkçe, bâb, tür (mk: mekrûn, mf: mefrûk)]
function NV(m, mt, ms, uv, ub, ut, eh, tr, bab, k) { return { m: m, mt: mt, ms: ms, uv: uv, ub: ub, ut: ut, eh: eh, tr: tr, bab: bab, k: k }; }
var VERBS = [
  NV("نَوَى", "Y", "نَوَ", "َ", "نْو", "Y", "اِ", "niyet etmek", 2, "mk"), NV("طَوَى", "Y", "طَوَ", "َ", "طْو", "Y", "اِ", "dürmek, katlamak", 2, "mk"),
  NV("شَوَى", "Y", "شَوَ", "َ", "شْو", "Y", "اِ", "kızartmak, ızgara yapmak", 2, "mk"), NV("كَوَى", "Y", "كَوَ", "َ", "كْو", "Y", "اِ", "ütülemek", 2, "mk"),
  NV("رَوَى", "Y", "رَوَ", "َ", "رْو", "Y", "اِ", "rivayet etmek", 2, "mk"), NV("لَوَى", "Y", "لَوَ", "َ", "لْو", "Y", "اِ", "bükmek", 2, "mk"),
  NV("حَوَى", "Y", "حَوَ", "َ", "حْو", "Y", "اِ", "içine almak", 2, "mk"), NV("عَوَى", "Y", "عَوَ", "َ", "عْو", "Y", "اِ", "ulumak", 2, "mk"),
  NV("غَوَى", "Y", "غَوَ", "َ", "غْو", "Y", "اِ", "yoldan çıkmak, azmak", 2, "mk"),
  NV("هَوِيَ", "A", "هَو", "َ", "هْو", "A", "اِ", "sevmek, arzulamak", 4, "mk"), NV("قَوِيَ", "A", "قَو", "َ", "قْو", "A", "اِ", "güçlenmek", 4, "mk"),
  NV("وَقَى", "Y", "وَقَ", "َ", "ق", "Y", "", "korumak", 2, "mf"), NV("وَعَى", "Y", "وَعَ", "َ", "ع", "Y", "", "kavramak, belleğe almak", 2, "mf"),
  NV("وَفَى", "Y", "وَفَ", "َ", "ف", "Y", "", "(sözünü) yerine getirmek", 2, "mf"), NV("وَشَى", "Y", "وَشَ", "َ", "ش", "Y", "", "gammazlamak, süslemek", 2, "mf"),
  NV("وَنَى", "Y", "وَنَ", "َ", "ن", "Y", "", "gevşemek, usanmak", 2, "mf"),
  NV("وَلِيَ", "A", "وَل", "َ", "ل", "Y", "", "başına geçmek, yönetmek", 6, "mf"),
  NV("أَغْوَى", "Y", "أَغْوَ", "ُ", "غْو", "Y", "أَ", "azdırmak", "إِفْعَالٌ", "mk"), NV("سَوَّى", "Y", "سَوَّ", "ُ", "سَوّ", "Y", "", "düzeltmek, eşitlemek", "تَفْعِيلٌ", "mk"),
  NV("وَالَى", "Y", "وَالَ", "ُ", "وَال", "Y", "", "dost edinmek, ardı ardına yapmak", "مُفَاعَلَةٌ", "mf"), NV("اِنْطَوَى", "Y", "اِنْطَوَ", "َ", "نْطَو", "Y", "اِ", "dürülmek, içine kapanmak", "اِنْفِعَالٌ", "mk"),
  NV("اِلْتَوَى", "Y", "اِلْتَوَ", "َ", "لْتَو", "Y", "اِ", "bükülmek", "اِفْتِعَالٌ", "mk"), NV("تَوَفَّى", "Y", "تَوَفَّ", "َ", "تَوَفّ", "A", "", "canını almak, tam almak", "تَفَعُّلٌ", "mf"),
  NV("تَوَانَى", "Y", "تَوَانَ", "َ", "تَوَان", "A", "", "gevşek davranmak", "تَفَاعُلٌ", "mf"), NV("اِسْتَوْلَى", "Y", "اِسْتَوْلَ", "َ", "سْتَوْل", "Y", "اِ", "ele geçirmek", "اِسْتِفْعَالٌ", "mf")
];
function V(m) { return VERBS.filter(function (v) { return v.m === m; })[0]; }
function MAZ(v) { return MSUF[v.mt].map(function (s) { return v.ms + s; }); }
function MUZ(v) { return USUF[v.ut].map(function (s, i) { return UPRE[i] + v.uv + v.ub + s; }); }
function EMR(v) { return ESUF[v.ut].map(function (s) { return v.eh + v.ub + s; }); }
function CONJ(v, t) { return t === "m" ? MAZ(v) : t === "u" ? MUZ(v) : EMR(v); }
function SUL_V(v) { return typeof v.bab === "number"; }
function TUR(v) { return v.k === "mf" ? "lefîf-i mefrûk" : "lefîf-i mekrûn"; }
// Sonu renkli yazım: gövdenin son harfi + ek renklenir (harekeden önce etiket olmasın diye)
function lastLetterAt(s) { var i = s.length - 1; while (i > 0 && /[ً-ْٰ]/.test(s[i])) i--; return i; }
function colorEnd(stem, suf) { var i = lastLetterAt(stem); return stem.slice(0, i) + '<b class="cend">' + stem.slice(i) + suf + '</b>'; }
function CONJ_HTML(v, t) {
  if (t === "m") return MSUF[v.mt].map(function (s) { return colorEnd(v.ms, s); });
  if (t === "u") return USUF[v.ut].map(function (s, i) { return colorEnd(UPRE[i] + v.uv + v.ub, s); });
  return ESUF[v.ut].map(function (s) { return colorEnd(v.eh + v.ub, s); });
}
// Tablo şaşırtıcıları (sık yapılan yanlışlar)
function DIST(v, t) {
  var d, P = "يَ".replace("َ", v.uv), T = "تَ".replace("َ", v.uv), mf = v.k === "mf" && SUL_V(v);
  if (t === "m") d = v.mt === "Y" ? [v.ms + "يَتْ", v.ms + "يُوا", v.ms + "وْتُ"] : [v.ms + "ِيُوا", v.ms + "َيْتُ", v.ms + "َوْا"];
  else if (t === "u") d = (mf ? [P + "وْ" + v.ub + "ِي", P + "وْ" + v.ub + "ُونَ"] : []).concat(v.ut === "Y" ? [P + v.ub + "ِيُونَ", T + v.ub + "ِيِينَ", P + v.ub + "ُو"] : [P + v.ub + "َيُونَ", P + v.ub + "ُونَ", T + v.ub + "َيِينَ"]);
  else d = (mf ? ["اِوْ" + v.ub + "ِ"] : []).concat(v.ut === "Y" ? [v.eh + v.ub + "ِيُوا", v.eh + v.ub + "ُ", v.eh + v.ub + "ِيِي"] : [v.eh + v.ub + "َى", v.eh + v.ub + "َيُوا", v.eh + v.ub + "ِ"]);
  var ok = CONJ(v, t);
  return d.filter(function (x) { return ok.indexOf(x) < 0; });
}
var BAB = { 2: ["ضَرَبَ – يَضْرِبُ", "2. bâb (ayn esreli)"], 4: ["عَلِمَ – يَعْلَمُ", "4. bâb (mâzide esre, muzâride üstün)"], 6: ["حَسِبَ – يَحْسِبُ", "6. bâb (mâzide de muzâride de esre)"] };
// Kural notu: fiile göre canlı örneklerle
function NOTE(v, t) {
  var c = CONJ(v, t), sul = SUL_V(v), s;
  if (t === "m") {
    s = v.mt === "Y" ? "Sondaki ى aslında yâdır; harekeli zamirle geri gelir (" + c[12] + "), هُمْ ve هِيَ'de düşer (" + c[2] + "، " + c[3] + ")." : "Son harf yâdır ve kalır (" + c[12] + "); yalnız هُمْ'de düşer, aynü’l-fiil ötreli olur: " + c[2] + ".";
    s += v.k === "mf" ? " Baştaki vâv mâzide hiç düşmez." : " Ortadaki vâv sahih harf gibidir, hiç değişmez.";
  } else if (t === "u") {
    s = v.ut === "Y" ? "Nâkıs يَرْمِي gibi: هُمْ'de yâ düşer, ayn ötreli olur (" + c[2] + "); أَنْتِ: " + c[9] + "." : "Nâkıs يَرْضَى gibi: elif-i maksûre, ayn üstünlü kalır: " + c[2] + "، " + c[9] + ".";
    if (v.k === "mf" && sul) s += " Misâl gibi baştaki vâv da düşer: يَوْ" + v.ub + "ِي → " + c[0] + ".";
    else if (v.k === "mk") s += " Ortadaki vâv yerinde kalır.";
  } else {
    s = "Emirde son harf düşer: " + c[0] + ". Zamirle: " + c[2] + "، " + c[3] + ".";
    if (v.k === "mf" && sul) s += " Baştaki vâv da düşer, geriye tek harf kalır (durakta hâ ile okunur: " + v.ub + "ِهْ).";
  }
  return s;
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
// Combo: her yuvada [doğru, y1, y2] → karıştırılmış seçenek
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CB2(q, slots, mid, tail, i, tr, why) {
  var parts = [], ok = [];
  slots.forEach(function (s, si) { var r = ROT(s, i + si); parts.push(r); ok.push(r.a); if (si < slots.length - 1 && mid) parts.push(mid); });
  if (tail) parts.push(tail);
  return { q: q, p: parts, ok: [ok], tr: tr, why: why };
}
function pickOther(arr, i, avoid) { for (var k = 1; k < arr.length; k++) { var x = arr[(i + k * 3) % arr.length]; if (avoid.indexOf(x) < 0) return x; } return arr[(i + 1) % arr.length]; }
// 7. alıştırma: bir zamir için mâzi seçimi
function persPick(v, pi, tail, n) {
  var mz = MAZ(v), c = mz[pi], w1 = pickOther(DIST(v, "m").concat(mz), pi, [c]), w2 = pickOther(mz, pi + 1, [c, w1]);
  return P("(" + PER[pi] + ") ___ " + tail, c, w1, w2, n, PER_TR[pi] + " · bize balık kızarttı.", PER[pi] + ": " + c + ".");
}
function TBL(m, t) { return { v: m, t: t }; }
// Mezîd tablosu satırı: [bâb, mâzi, muzâri, emir, ism-i fâil, ism-i mef’ûl, masdar, {sütun: özel şaşırtıcı}]
var MZT = [
  ["إِفْعَالٌ", "أَغْوَى", "يُغْوِي", "أَغْوِ", "مُغْوٍ", "مُغْوًى", "إِغْوَاءٌ"], ["تَفْعِيلٌ", "سَوَّى", "يُسَوِّي", "سَوِّ", "مُسَوٍّ", "مُسَوًّى", "تَسْوِيَةٌ"],
  ["مُفَاعَلَةٌ", "وَالَى", "يُوَالِي", "وَالِ", "مُوَالٍ", "مُوَالًى", "مُوَالَاةٌ"], ["اِنْفِعَالٌ", "اِنْطَوَى", "يَنْطَوِي", "اِنْطَوِ", "مُنْطَوٍ", "مُنْطَوًى", "اِنْطِوَاءٌ"],
  ["اِفْتِعَالٌ", "اِلْتَوَى", "يَلْتَوِي", "اِلْتَوِ", "مُلْتَوٍ", "مُلْتَوًى", "اِلْتِوَاءٌ"], ["تَفَعُّلٌ", "تَوَفَّى", "يَتَوَفَّى", "تَوَفَّ", "مُتَوَفٍّ", "مُتَوَفًّى", "تَوَفٍّ"],
  ["تَفَاعُلٌ", "تَوَانَى", "يَتَوَانَى", "تَوَانَ", "مُتَوَانٍ", "مُتَوَانًى", "تَوَانٍ"], ["اِسْتِفْعَالٌ", "اِسْتَحْيَا", "يَسْتَحْيِي", "اِسْتَحْيِ", "مُسْتَحْيٍ", "مُسْتَحْيًا", "اِسْتِحْيَاءٌ"]
];
// Kitaptaki boş tablo (mâzisi verilmiş)
var MZA = [
  ["إِفْعَالٌ", "أَحْيَا", "يُحْيِي", "أَحْيِ", "مُحْيٍ", "مُحْيًا", "إِحْيَاءٌ", { 1: "أَحْيَى", 5: "مُحْيًى" }], ["تَفْعِيلٌ", "وَفَّى", "يُوَفِّي", "وَفِّ", "مُوَفٍّ", "مُوَفًّى", "تَوْفِيَةٌ"],
  ["مُفَاعَلَةٌ", "سَاوَى", "يُسَاوِي", "سَاوِ", "مُسَاوٍ", "مُسَاوًى", "مُسَاوَاةٌ"], ["اِنْفِعَالٌ", "اِنْشَوَى", "يَنْشَوِي", "اِنْشَوِ", "مُنْشَوٍ", "مُنْشَوًى", "اِنْشِوَاءٌ"],
  ["اِفْتِعَالٌ", "اِكْتَوَى", "يَكْتَوِي", "اِكْتَوِ", "مُكْتَوٍ", "مُكْتَوًى", "اِكْتِوَاءٌ"], ["تَفَعُّلٌ", "تَوَلَّى", "يَتَوَلَّى", "تَوَلَّ", "مُتَوَلٍّ", "مُتَوَلًّى", "تَوَلٍّ"],
  ["تَفَاعُلٌ", "تَهَاوَى", "يَتَهَاوَى", "تَهَاوَ", "مُتَهَاوٍ", "مُتَهَاوًى", "تَهَاوٍ"], ["اِسْتِفْعَالٌ", "اِسْتَوْلَى", "يَسْتَوْلِي", "اِسْتَوْلِ", "مُسْتَوْلٍ", "مُسْتَوْلًى", "اِسْتِيلَاءٌ", { 6: "اِسْتِوْلَاءٌ" }]
];
// Ek tablo (masdarı verilmiş)
var MZB = [
  ["إِفْعَالٌ", "أَرْوَى", "يُرْوِي", "أَرْوِ", "مُرْوٍ", "مُرْوًى", "إِرْوَاءٌ"], ["تَفْعِيلٌ", "قَوَّى", "يُقَوِّي", "قَوِّ", "مُقَوٍّ", "مُقَوًّى", "تَقْوِيَةٌ"],
  ["مُفَاعَلَةٌ", "دَاوَى", "يُدَاوِي", "دَاوِ", "مُدَاوٍ", "مُدَاوًى", "مُدَاوَاةٌ"], ["اِنْفِعَالٌ", "اِنْزَوَى", "يَنْزَوِي", "اِنْزَوِ", "مُنْزَوٍ", "مُنْزَوًى", "اِنْزِوَاءٌ"],
  ["اِفْتِعَالٌ", "اِحْتَوَى", "يَحْتَوِي", "اِحْتَوِ", "مُحْتَوٍ", "مُحْتَوًى", "اِحْتِوَاءٌ"], ["تَفَعُّلٌ", "تَوَقَّى", "يَتَوَقَّى", "تَوَقَّ", "مُتَوَقٍّ", "مُتَوَقًّى", "تَوَقٍّ"],
  ["تَفَاعُلٌ", "تَدَاوَى", "يَتَدَاوَى", "تَدَاوَ", "مُتَدَاوٍ", "مُتَدَاوًى", "تَدَاوٍ"], ["اِسْتِفْعَالٌ", "اِسْتَوْفَى", "يَسْتَوْفِي", "اِسْتَوْفِ", "مُسْتَوْفٍ", "مُسْتَوْفًى", "اِسْتِيفَاءٌ", { 2: "يَسْتَوْفَى", 6: "اِسْتِوْفَاءٌ" }]
];
var MZH = ["Bâb", "Mâzi", "Muzâri", "Emir", "İsm-i fâil", "İsm-i mef’ûl", "Masdar"];
// Mezîd şaşırtıcıları
function swapEnd(s) {
  if (/[ِّ]+ي$/.test(s)) return s.replace(/([ِّ]+)ي$/, function (m) { return m.indexOf("ّ") >= 0 ? "َّى" : "َى"; });
  if (/[َّ]+ى$/.test(s)) return s.replace(/([َّ]+)ى$/, function (m) { return m.indexOf("ّ") >= 0 ? "ِّي" : "ِي"; });
  return s + "ي";
}
function mzAlts(r, col) {
  var c = r[col], sp = r[7] && r[7][col] ? [r[7][col]] : [];
  if (col === 1) return sp.concat([c.replace(/ى$/, "ا"), r[3]]);
  if (col === 2) return sp.concat([/^يُ/.test(c) ? c.replace(/^يُ/, "يَ") : c.replace(/^يَ/, "يُ"), swapEnd(c)]);
  if (col === 3) return sp.concat(/َ$/.test(c) ? [c.replace(/َ$/, "ِ"), r[1]] : [c + "ي", r[1]]);
  if (col === 4) return sp.concat([r[5], c.replace(/[ٍّ]+$/, function (x) { return x.indexOf("ّ") >= 0 ? "ِّي" : "ِي"; })]);
  if (col === 5) return sp.concat([r[4], c.replace(/[ًّ]+[ىا]$/, function (x) { return x.indexOf("ّ") >= 0 ? "َّيٌ" : "َيٌ"; })]);
  return sp.concat([c.replace(/اءٌ$/, "ايٌ").replace(/يَةٌ$/, "يٌ").replace(/اةٌ$/, "اءٌ").replace(/[ٍّ]+$/, function (x) { return x.indexOf("ّ") >= 0 ? "ِّي" : "ِي"; }), r[4]]);
}
function mzCombo(r, given, i) {
  var cols = [1, 2, 3, 4, 5, 6].filter(function (c) { return c !== given; });
  var slots = cols.map(function (c) {
    var o = [r[c]]; mzAlts(r, c).concat([1, 2, 3, 4, 5, 6].map(function (k) { return r[k]; })).forEach(function (x) { if (o.length < 3 && o.indexOf(x) < 0) o.push(x); });
    return o;
  });
  return CB2(r[0] + " · " + r[given], slots, "·", "", i, cols.map(function (c) { return MZH[c]; }).join(" · "), cols.map(function (c) { return r[c]; }).join(" · "));
}

var UNITS = [
// ---------------------------------------------------------------- 1 · NEDİR, TÜRLERİ
{
  id: "u1", no: 1, ar: "الفِعْلُ اللَّفِيفُ وَنَوْعَاهُ", tr: "Lefîf Fiil ve Türleri", short: "Nedir?", col: "cerr", legend: ["cerr"],
  goals: ["Lefîf fiilin kökünde iki illet harfi olduğunu bilmek: نَوَى، وَقَى", "Mekrûn (illet harfleri bitişik: نَوَى) ile mefrûku (araya sahih harf girmiş: وَقَى) ayırmak", "Bâblarını tanımak: نَوَى يَنْوِي (2), هَوِيَ يَهْوَى (4), وَلِيَ يَلِي (6)"],
  examples: [
    { s: "رَوَى:cerr / الصَّحَابَةُ أَحَادِيثَ كَثِيرَةً.:-", tr: "Sahâbe pek çok hadis rivayet etti.", pair: "وَفَى:cerr / التَّاجِرُ وَعْدَهُ.:-", pairTr: "Tüccar sözünü yerine getirdi." },
    { s: "كَوَى:cerr / يَحْيَى قَمِيصَهُ.:-", tr: "Yahyâ gömleğini ütüledi.", pair: "وَعَى:cerr / الطُّلَّابُ نَصِيحَةَ المُعَلِّمِ.:-", pairTr: "Öğrenciler öğretmenin nasihatini kavradı." },
    { s: "نَوَى:cerr / المُؤْمِنُ صِيَامَ شَهْرِ رَمَضَانَ.:-", tr: "Mümin Ramazan ayının orucuna niyet etti.", pair: "وَلِيَ:cerr / أَبُو بَكْرٍ الخِلَافَةَ بَعْدَ رَسُولِ اللهِ ﷺ.:-", pairTr: "Ebû Bekir Resûlullah’tan sonra hilâfetin başına geçti." }
  ],
  rules: [
    { tr: "<b class=\"r-cerr\">Lefîf fiil</b> (<span class=\"ar\">الفِعْلُ اللَّفِيفُ</span>): kökünde <b>iki illet harfi</b> bulunan fiildir: <span class=\"ar\">رَوَى، وَعَى</span>. Lefîf “sarılmış, bir araya gelmiş” demektir." },
    { tr: "<b>Lefîf-i mekrûn</b> (<span class=\"ar\">لَفِيفٌ مَقْرُونٌ</span>, bitişik): iki illet harfi yan yanadır, araya sahih harf girmez. Ortadaki vâv sahih harf gibidir; fiil <b>nâkıs</b> gibi çekilir:", ex: ["نَوَى، أَوَى، شَوَى، رَوَى", "عَوَى، لَوَى، حَوَى، كَوَى"] },
    { tr: "<b>Lefîf-i mefrûk</b> (<span class=\"ar\">لَفِيفٌ مَفْرُوقٌ</span>, ayrık): iki illet harfi arasına sahih bir harf girmiştir. Baştan <b>misâl</b>, sondan <b>nâkıs</b> gibidir:", ex: ["وَقَى، وَعَى، وَفَى", "وَشَى، وَلِيَ، وَنَى"] },
    { tr: "Mefrûkun muzârisinde baştaki vâv düşer (misâl gibi): <span class=\"ar\">وَعَى ← يَعِي، وَفَى ← يَفِي، وَلِيَ ← يَلِي</span>. Emirde hem baştaki hem sondaki illet düşer, <b>tek harf</b> kalır: <span class=\"ar\">عِ، فِ، قِ</span>." },
    { tr: "Mekrûn iki bâbdan gelir: 2. bâb (<span class=\"ar\">ضَرَبَ يَضْرِبُ</span>): <span class=\"ar\">نَوَى يَنْوِي، طَوَى يَطْوِي، شَوَى يَشْوِي</span>; 4. bâb (<span class=\"ar\">عَلِمَ يَعْلَمُ</span>): <span class=\"ar\">هَوِيَ يَهْوَى، قَوِيَ يَقْوَى، حَيِيَ يَحْيَا</span>. Mefrûkta <span class=\"ar\">وَلِيَ يَلِي</span> 6. bâbdandır (<span class=\"ar\">حَسِبَ يَحْسِبُ</span>)." }
  ],
  kaide: [
    "١ ـ الفِعْلُ اللَّفِيفُ: هُوَ مَا كَانَ فِي أَصْلِهِ حَرْفَانِ مِنْ حُرُوفِ العِلَّةِ، مِثْلُ: رَوَى الصَّحَابَةُ عَنِ الرَّسُولِ ﷺ أَحَادِيثَ كَثِيرَةً، وَعَى الطُّلَّابُ نَصِيحَةَ المُعَلِّمِ. وَيَنْقَسِمُ الفِعْلُ اللَّفِيفُ إِلَى نَوْعَيْنِ: أ ـ لَفِيفٌ مَقْرُونٌ: وَهُوَ مَا اجْتَمَعَ فِيهِ حَرْفَا عِلَّةٍ مُتَجَاوِرَيْنِ دُونَ أَنْ يُفَرِّقَ بَيْنَهُمَا حَرْفٌ آخَرُ صَحِيحٌ، مِثْلُ: نَوَى، أَوَى، شَوَى، رَوَى، عَوَى، لَوَى، حَوَى، كَوَى. ب ـ لَفِيفٌ مَفْرُوقٌ: وَهُوَ مَا كَانَ فِيهِ حَرْفَا عِلَّةٍ غَيْرَ مُتَجَاوِرَيْنِ فَرَّقَ بَيْنَهُمَا حَرْفٌ صَحِيحٌ، مِثْلُ: وَقَى، وَعَى، وَفَى، وَشَى، وَلِيَ، وَنَى.",
    "٤ ـ اللَّفِيفُ المَقْرُونُ يُعَامَلُ مُعَامَلَةَ الفِعْلِ النَّاقِصِ، وَيَأْتِي مِنْ بَابَيْنِ، هُمَا: البَابُ الثَّانِي (ضَرَبَ يَضْرِبُ)، مِثْلُ: نَوَى يَنْوِي، طَوَى يَطْوِي، شَوَى يَشْوِي. البَابُ الرَّابِعُ (عَلِمَ يَعْلَمُ)، مِثْلُ: هَوِيَ يَهْوَى، عَيِيَ يَعْيَا، حَيِيَ يَحْيَا."
  ],
  ex: [
    { type: "find", target: "y", num: "٨", ar: "ضَعْ خَطًّا تَحْتَ الفِعْلِ اللَّفِيفِ فِي الآيَاتِ الكَرِيمَةِ وَالأَحَادِيثِ الشَّرِيفَةِ", tr: "Lefîf fiillere dokun. Tuzak: يَعْصُونَ، فَاهْدِهِ، يَأْتِينِي nâkıstır (tek illet); وَقُودُهَا، الوَحْيُ isimdir.", items: [
      W("يَا أَيُّهَا الَّذِينَ آمَنُوا [قُوا] أَنْفُسَكُمْ وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالحِجَارَةُ عَلَيْهَا مَلَائِكَةٌ غِلَاظٌ شِدَادٌ لَا يَعْصُونَ اللهَ مَا أَمَرَهُمْ", "Ey iman edenler! Kendinizi ve ailenizi yakıtı insanlar ve taşlar olan ateşten koruyun… (Tahrîm 6)", "قُوا: وَقَى'nin emri (أَنْتُمْ), mefrûk. يَعْصُونَ nâkıs; وَقُودُهَا isim."),
      W("يَوْمَ [نَطْوِي] السَّمَاءَ كَطَيِّ السِّجِلِّ لِلْكُتُبِ كَمَا بَدَأْنَا أَوَّلَ خَلْقٍ نُعِيدُهُ", "O gün göğü, kitap sayfalarını dürer gibi düreriz. (Enbiyâ 104)", "نَطْوِي: طَوَى – يَطْوِي, mekrûn. طَيِّ masdardır (isim)."),
      W("وَإِنْ يَسْتَغِيثُوا يُغَاثُوا بِمَاءٍ كَالمُهْلِ [يَشْوِي] الوُجُوهَ بِئْسَ الشَّرَابُ وَسَاءَتْ مُرْتَفَقًا", "Yardım isterlerse, erimiş maden gibi yüzleri kavuran bir su ile karşılık görürler. (Kehf 29)", "يَشْوِي: شَوَى – يَشْوِي, mekrûn. يَسْتَغِيثُوا ecvef."),
      W("فَاجْعَلْ أَفْئِدَةً مِنَ النَّاسِ [تَهْوِي] إِلَيْهِمْ وَارْزُقْهُمْ مِنَ الثَّمَرَاتِ", "İnsanlardan bir kısmının gönüllerini onlara meylettir ve onları ürünlerle rızıklandır. (İbrâhîm 37)", "تَهْوِي: هَوَى – يَهْوِي (meyletmek), mekrûn."),
      W("وَإِذَا قِيلَ لَهُمْ تَعَالَوْا يَسْتَغْفِرْ لَكُمْ رَسُولُ اللهِ [لَوَّوْا] رُءُوسَهُمْ", "Onlara “Gelin, Allah’ın Resûlü sizin için af dilesin” denildiğinde başlarını çevirirler. (Münâfikûn 5)", "لَوَّوْا: لَوَى'nın tef’îl bâbı (mezîd lefîf). تَعَالَوْا nâkıstır."),
      W("يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ الَّتِي أَنْعَمْتُ عَلَيْكُمْ وَ[أَوْفُوا] بِعَهْدِي [أُوفِ] بِعَهْدِكُمْ", "Ey İsrâiloğulları! Size verdiğim nimetimi hatırlayın; ahdimi yerine getirin ki ben de ahdinizi yerine getireyim. (Bakara 40)", "أَوْفُوا، أُوفِ: أَوْفَى – يُوفِي (if’âl), mefrûk."),
      W("فَإِذَا خَرَجَ الإِمَامُ [طُوِيَتِ] الصُّحُفُ وَرُفِعَتِ الأَقْلَامُ … اللَّهُمَّ إِنْ كَانَ ضَالًّا فَاهْدِهِ وَإِنْ كَانَ مَرِيضًا فَاشْفِهِ", "İmam çıkınca sayfalar dürülür, kalemler kaldırılır… Allah’ım, sapmışsa ona hidayet ver; hastaysa şifa ver. (Hadis)", "طُوِيَتْ: طَوَى'nın meçhulü. فَاهْدِهِ، فَاشْفِهِ nâkıs."),
      W("كَيْفَ يَأْتِيكَ الوَحْيُ؟ فَقَالَ: أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الجَرَسِ … فَيُفْصَمُ عَنِّي وَقَدْ [وَعَيْتُ] عَنْهُ مَا قَالَ", "Vahiy sana nasıl gelir? Bazen çıngırak sesi gibi gelir… Benden ayrıldığında söylediğini bellemiş olurum. (Buhârî)", "وَعَيْتُ: وَعَى, mefrûk. يَأْتِي nâkıs; الوَحْيُ isim.")
    ]},
    { type: "classify", extra: true, opts: [["mk", "Mekrûn", "مَقْرُونٌ", "cerr"], ["mf", "Mefrûk", "مَفْرُوقٌ", "nasb"]], ar: "لَفِيفٌ مَقْرُونٌ أَمْ مَفْرُوقٌ؟", tr: "İki illet harfi yan yana mı (mekrûn), arada sahih harf mi var (mefrûk)?", items: ["نَوَى", "وَقَى", "طَوَى", "وَعَى", "شَوَى", "وَفَى", "كَوَى", "وَلِيَ", "هَوِيَ", "وَشَى", "عَوَى", "وَنَى", "حَوَى", "قَوِيَ"].map(function (m) { var v = V(m), f = v.k === "mf"; return { s: v.m + " – " + MUZ(v)[0], a: v.k, why: f ? "و + " + v.ub + " + ي: araya sahih harf girmiş; muzâride vâv düşer." : "Ortada و ve sonda ي yan yana: nâkıs gibi çekilir." }; }) },
    { type: "classify", extra: true, opts: [["2", "2. bâb", "ضَرَبَ", "cerr"], ["4", "4. bâb", "عَلِمَ", "nasb"], ["6", "6. bâb", "حَسِبَ", "mi"]], ar: "مِنْ أَيِّ بَابٍ؟", tr: "Mâzi ve muzâriye bak: fiil hangi bâbdan?", items: ["نَوَى", "هَوِيَ", "وَلِيَ", "وَقَى", "قَوِيَ", "شَوَى", "وَفَى", "كَوَى", "وَعَى", "رَوَى"].map(function (m) { var v = V(m); return { s: v.m + " – " + MUZ(v)[0], a: String(v.bab), why: BAB[v.bab][1] + ": " + BAB[v.bab][0] }; }) }
  ]
},
// ---------------------------------------------------------------- 2 · MÂZİ
{
  id: "u2", no: 2, ar: "تَصْرِيفُ المَاضِي اللَّفِيفِ", tr: "Mâzinin Çekimi", short: "Mâzi", col: "nasb", legend: ["cerr", "mi"],
  goals: ["Lefîfin mâzisinin nâkıs gibi çekildiğini görmek: نَوَى → نَوَيْتُ، نَوَوْا، نَوَتْ", "Mefrûkta baştaki vâvın mâzide düşmediğini bilmek: وَقَيْتُ، وَقَوْا", "4. ve 6. bâbda هُمْ çekimini yapmak: هَوُوا، وَلُوا"],
  examples: [
    { s: "الطُّلَّابُ:- / نَوَوُا:cerr / الصِّيَامَ.:-", tr: "Öğrenciler oruca niyet etti. (نَوَيُوا → نَوَوْا)", pair: "نَوَتْ:cerr / الطَّالِبَةُ الصِّيَامَ.:-", pairTr: "Kız öğrenci oruca niyet etti. (نَوَاتْ → نَوَتْ)" },
    { s: "وَقَيْتُ:cerr / أَخِي مِنَ الخَطَرِ.:-", tr: "Kardeşimi tehlikeden korudum.", pair: "وَلُوا:cerr / أُمُورَ النَّاسِ.:-", pairTr: "İnsanların işlerini üstlendiler." }
  ],
  rules: [
    { tr: "Mâzide lefîf, <b>nâkıs</b> gibi çekilir; baştaki ya da ortadaki vâv hiç değişmez.", ex: ["نَوَى: نَوَيْتُ، نَوَوْا، نَوَتْ", "وَقَى: وَقَيْتُ، وَقَوْا، وَقَتْ"] },
    { tr: "<b>Harekeli zamir</b> (ـتُ، ـتَ، ـنَا، ـنَ…) gelince sondaki elifin aslı yâ geri gelir: <span class=\"ar\">طَوَيْتُ، طَوَيْنَا، طَوَيْنَ</span>." },
    { tr: "<b>İki sâkin</b> buluşunca illet harfi düşer: <span class=\"ar\">نَوَاتْ ← نَوَتْ</span>, <span class=\"ar\">نَوَاوْا ← نَوَوْا</span>." },
    { tr: "4. bâb (<span class=\"ar\">هَوِيَ</span>) ve 6. bâb (<span class=\"ar\">وَلِيَ</span>): yâ korunur; yalnız هُمْ'de düşer, ayn ötreli olur:", ex: ["هَوِيتُ، هَوِيَتْ، هَوُوا", "وَلِيتُ، وَلِيَتْ، وَلُوا"] },
    { tr: "Cümlede: <span class=\"ar\">نَوَوْا + الـ</span> → <span class=\"ar\">نَوَوُا الصِّيَامَ</span>; <span class=\"ar\">كَوَتْ + الـ</span> → <span class=\"ar\">كَوَتِ البِنْتُ</span>." }
  ],
  kaide: ["تَصْرِيفُ الفِعْلِ اللَّفِيفِ المَاضِي: نَوَى – نَوَيَا – نَوَوْا، نَوَتْ – نَوَتَا – نَوَيْنَ، نَوَيْتَ – نَوَيْتُمَا – نَوَيْتُمْ، نَوَيْتِ – نَوَيْتُمَا – نَوَيْتُنَّ، نَوَيْتُ – نَوَيْنَا. وَقَى – وَقَيَا – وَقَوْا، وَقَتْ – وَقَتَا – وَقَيْنَ، وَقَيْتَ – وَقَيْتُمَا – وَقَيْتُمْ، وَقَيْتِ – وَقَيْتُمَا – وَقَيْتُنَّ، وَقَيْتُ – وَقَيْنَا."],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "أَعِدْ كِتَابَةَ الجُمَلِ التَّالِيَةِ مُسْنِدًا الفِعْلَ اللَّفِيفَ المَاضِيَ إِلَى الضَّمِيرِ بَيْنَ القَوْسَيْنِ", tr: "Fiili parantezdeki zamire göre çek: harekeli zamirde yâ geri gelir.", exHtml: "<span class=\"ar\">سَعِيدٌ وَفَى بِوَعْدِهِ. (أَنْتَ) ← وَفَيْتَ بِوَعْدِكَ.</span>", items: [
      P("أَبُو هُرَيْرَةَ رَوَى أَحَادِيثَ كَثِيرَةً. (هُمْ) ← ___ أَحَادِيثَ كَثِيرَةً.", "رَوَوْا", "رَوُوا", "رَوَيُوا", 0, "Pek çok hadis rivayet ettiler.", "رَوَيُوا → رَوَوْا."),
      P("شَوَّالُ كَوَتْ حِجَابَهَا. (هُنَّ) ← ___ حِجَابَهُنَّ.", "كَوَيْنَ", "كَوَتْنَ", "كَوَوْا", 1, "Başörtülerini ütülediler (kadınlar).", "هُنَّ: كَوَيْنَ."),
      P("عَوَى الكَلْبُ عَلَى الذِّئْبِ. (هِيَ) ← ___ عَلَى الذِّئْبِ.", "عَوَتْ", "عَوَيَتْ", "عَوَاتْ", 2, "(Dişi köpek) kurda uludu.", "عَوَاتْ → عَوَتْ: iki sâkin."),
      P("لَوَى الإِنْسَانُ الحَدِيدَ بِقُوَّةِ العِلْمِ. (أَنَا) ← ___ الحَدِيدَ بِقُوَّةِ العِلْمِ.", "لَوَيْتُ", "لَوَوْتُ", "لَوَاتُ", 3, "Demiri ilmin gücüyle büktüm.", "Aslı yâ: لَوَيْتُ."),
      P("طَوَى البَائِعُ القُمَاشَ ثُمَّ حَمَلَهُ. (نَحْنُ) ← ___ القُمَاشَ ثُمَّ حَمَلْنَاهُ.", "طَوَيْنَا", "طَوَوْنَا", "طَوَانَا", 4, "Kumaşı katladık, sonra taşıdık.", "طَوَيْنَا."),
      P("لَقَدْ غَوَى إِبْلِيسُ وَكَفَرَ بِأَمْرِ رَبِّهِ. (أَنْتُمْ) ← لَقَدْ ___ وَكَفَرْتُمْ بِأَمْرِ رَبِّكُمْ.", "غَوَيْتُمْ", "غَوَوْتُمْ", "غَوَيْتُنَّ", 5, "Andolsun yoldan çıktınız ve Rabbinizin emrini inkâr ettiniz.", "أَنْتُمْ: غَوَيْتُمْ."),
      P("حَوَى الكِتَابُ عِشْرِينَ قِصَّةً. (أَنْتُمَا) ← ___ عِشْرِينَ قِصَّةً.", "حَوَيْتُمَا", "حَوَيَا", "حَوَتَا", 0, "(Siz ikiniz) yirmi hikâyeyi içine aldınız.", "أَنْتُمَا: حَوَيْتُمَا. حَوَيَا هُمَا içindir."),
      P("نَوَيْتُ الصَّلَاةَ فِي مَسْجِدِ الحَيِّ. (أَنْتِ) ← ___ الصَّلَاةَ فِي مَسْجِدِ الحَيِّ.", "نَوَيْتِ", "نَوَيْتَ", "نَوَيْنَ", 1, "Mahalle mescidinde namaza niyet ettin (kadın).", "أَنْتِ: نَوَيْتِ.")
    ]},
    { type: "pick", fill: true, num: "٧", ar: "امْلَأِ الفَرَاغَ كَمَا فِي المِثَالِ", tr: "شَوَى fiilini zamire göre mâzi olarak çek.", exHtml: "<span class=\"ar\">(هُوَ) شَوَى لَنَا السَّمَكَ.</span>",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(function (pi, n) { return persPick(V("شَوَى"), pi, "لَنَا السَّمَكَ.", n); }) },
    { type: "tablo", ar: "صَرِّفِ الفِعْلَ اللَّفِيفَ المَاضِيَ مَعَ ضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ", tr: "Mâziyi çek: önce aşağıdan bir biçim seç, sonra tablodaki yerine dokun. Tuzaklara dikkat: طَوَيَتْ، طَوَيُوا…", items: [TBL("طَوَى", "m"), TBL("وَعَى", "m"), TBL("هَوِيَ", "m")] }
  ]
},
// ---------------------------------------------------------------- 3 · MUZÂRİ
{
  id: "u3", no: 3, ar: "تَصْرِيفُ المُضَارِعِ اللَّفِيفِ", tr: "Muzârinin Çekimi", short: "Muzâri", col: "mi", legend: ["cerr", "mi"],
  goals: ["Mefrûkun muzârisinde baştaki vâvın düştüğünü bilmek: وَعَى ← يَعِي، وَفَى ← يَفِي", "Mekrûnun muzârisinin nâkıs gibi çekildiğini görmek: يَنْوِي، يَنْوُونَ، تَنْوِينَ", "Muzâriyi mâziye, mâziyi muzâriye çevirmek"],
  examples: [
    { s: "يَقِي:cerr / اللهُ عِبَادَهُ المُتَّقِينَ مِنَ النَّارِ.:-", tr: "Allah takvâ sahibi kullarını ateşten korur. (يَوْقِي → يَقِي)", pair: "يَنْوِي:cerr / المُؤْمِنُ الصِّيَامَ.:-", pairTr: "Mümin oruca niyet eder." },
    { s: "هُمْ:- / يَقُونَ:cerr", tr: "Onlar koruyor. (يَقِيُونَ → يَقُونَ)", pair: "أَنْتِ:- / تَنْوِينَ:cerr", pairTr: "Sen (kadın) niyet ediyorsun." }
  ],
  rules: [
    { tr: "<b>Mefrûk</b>: muzâride baştaki vâv düşer, sonu nâkıs <span class=\"ar\">يَرْمِي</span> gibidir:", ex: ["وَقَى ← يَقِي، يَقِيَانِ، يَقُونَ، تَقِينَ", "وَلِيَ ← يَلِي، يَلُونَ"] },
    { tr: "<b>Mekrûn</b> (2. bâb): ortadaki vâv kalır, nâkıs gibi çekilir: <span class=\"ar\">يَنْوِي، يَنْوِيَانِ، يَنْوُونَ، تَنْوِينَ</span>. يَنْوِيُونَ → يَنْوُونَ." },
    { tr: "<b>Mekrûn</b> (4. bâb): <span class=\"ar\">يَهْوَى، يَهْوَيَانِ، يَهْوَوْنَ، تَهْوَيْنَ</span>. Elif-i maksûre düşer, ayn üstünlü kalır." },
    { tr: "Özne önde ise fiil ona uyar: <span class=\"ar\">الطُّلَّابُ يَعُونَ النَّصِيحَةَ</span>; fiil önde ise tekil kalır: <span class=\"ar\">يَعِي الطُّلَّابُ النَّصِيحَةَ</span>." }
  ],
  kaide: ["٢ ـ اللَّفِيفُ المَفْرُوقُ يُعَامَلُ مُعَامَلَةَ الفِعْلِ المِثَالِ فَتُحْذَفُ فَاؤُهُ فِي المُضَارِعِ، مِثْلُ: وَعَى: يَعِي، وَنَى: يَنِي، وَفَى: يَفِي، وَلِيَ: يَلِي.", "تَصْرِيفُ المُضَارِعِ: يَنْوِي – يَنْوِيَانِ – يَنْوُونَ، تَنْوِي – تَنْوِيَانِ – يَنْوِينَ… يَقِي – يَقِيَانِ – يَقُونَ، تَقِي – تَقِيَانِ – يَقِينَ، تَقِي – تَقِيَانِ – تَقُونَ، تَقِينَ – تَقِيَانِ – تَقِينَ، أَقِي – نَقِي."],
  ex: [
    { type: "pick", fill: true, num: "١", ar: "حَوِّلِ الفِعْلَ اللَّفِيفَ المَاضِيَ إِلَى المُضَارِعِ", tr: "Mâziyi muzâriye çevir: mefrûkta vâv düşer.", exHtml: "<span class=\"ar\">وَقَى العُمَّالُ المَصْنَعَ مِنَ الحَرِيقِ ← يَقِي العُمَّالُ المَصْنَعَ مِنَ الحَرِيقِ.</span>", items: [
      P("وَعَى الطُّلَّابُ نَصِيحَةَ أَسَاتِذَتِهِمْ. ← ___ الطُّلَّابُ نَصِيحَةَ أَسَاتِذَتِهِمْ.", "يَعِي", "يَوْعِي", "يَعُو", 0, "Öğrenciler hocalarının nasihatini kavrar.", "Mefrûk: يَوْعِي → يَعِي."),
      P("وَفَى المُسْلِمُ بِوَعْدِهِ. ← ___ المُسْلِمُ بِوَعْدِهِ.", "يَفِي", "يَوْفِي", "يَفَى", 1, "Müslüman sözünü yerine getirir.", "يَفِي."),
      P("وَشَى الرَّجُلُ بِصَدِيقِهِ. ← ___ الرَّجُلُ بِصَدِيقِهِ.", "يَشِي", "يَوْشِي", "يَشُو", 2, "Adam arkadaşını gammazlıyor.", "يَشِي."),
      P("وَلِيَ المُشْرِفُ كُلَّ المَسْؤُولِيَّةِ. ← ___ المُشْرِفُ كُلَّ المَسْؤُولِيَّةِ.", "يَلِي", "يَوْلَى", "يَلَى", 3, "Gözetmen bütün sorumluluğu üstleniyor.", "6. bâb: وَلِيَ – يَلِي."),
      P("نَوَى يَحْيَى السَّفَرَ إِلَى العُمْرَةِ. ← ___ يَحْيَى السَّفَرَ إِلَى العُمْرَةِ.", "يَنْوِي", "يَنِي", "يَنْوَى", 4, "Yahyâ umreye gitmeye niyet ediyor.", "Mekrûn: vâv kalır, يَنْوِي."),
      P("أَوَى المُهَاجِرُونَ إِلَى الحُدُودِ التُّرْكِيَّةِ. ← ___ المُهَاجِرُونَ إِلَى الحُدُودِ التُّرْكِيَّةِ.", "يَأْوِي", "يَأْوُونَ", "يَأْوَى", 5, "Göçmenler Türkiye sınırına sığınıyor.", "Fiil önde: tekil, يَأْوِي."),
      P("عَوَى الكَلْبُ عَلَى المَارِّينَ فِي الطَّرِيقِ. ← ___ الكَلْبُ عَلَى المَارِّينَ فِي الطَّرِيقِ.", "يَعْوِي", "يَعِي", "يَعْوُو", 0, "Köpek yoldan geçenlere uluyor.", "Mekrûn: يَعْوِي (يَعِي, وَعَى'nin muzârisidir)."),
      P("كُلُّ طَالِبٍ كَوَى مَلَابِسَهُ. ← كُلُّ طَالِبٍ ___ مَلَابِسَهُ.", "يَكْوِي", "يَكِي", "يَكْوَى", 1, "Her öğrenci elbisesini ütülüyor.", "يَكْوِي.")
    ]},
    { type: "pick", fill: true, num: "٢", ar: "حَوِّلِ الفِعْلَ اللَّفِيفَ المُضَارِعَ إِلَى المَاضِي", tr: "Muzâriyi mâziye çevir: mefrûkta düşen vâv geri gelir.", exHtml: "<span class=\"ar\">يَقِي اللهُ عِبَادَهُ المُتَّقِينَ مِنَ النَّارِ ← وَقَى اللهُ عِبَادَهُ المُتَّقِينَ مِنَ النَّارِ.</span>", items: [
      P("يَرْوِي المُسْلِمُ أَحَادِيثَ الرَّسُولِ لِمَنْ لَا يَعْرِفُهَا. ← ___ المُسْلِمُ أَحَادِيثَ الرَّسُولِ لِمَنْ لَا يَعْرِفُهَا.", "رَوَى", "رَوِيَ", "رَوَا", 0, "Müslüman Resûlullah’ın hadislerini bilmeyene rivayet etti.", "رَوَى: aslı yâ, ى ile yazılır."),
      P("نَحْنُ نَنْوِي العَمَلَ لِوَجْهِ اللهِ فَقَطْ. ← نَحْنُ ___ العَمَلَ لِوَجْهِ اللهِ فَقَطْ.", "نَوَيْنَا", "نَوَوْنَا", "نَوَى", 1, "Biz amele yalnız Allah rızası için niyet ettik.", "نَحْنُ: نَوَيْنَا."),
      P("نَعِي نَصِيحَةَ أَجْدَادِنَا. ← ___ نَصِيحَةَ أَجْدَادِنَا.", "وَعَيْنَا", "وَعَوْنَا", "عَيْنَا", 2, "Dedelerimizin nasihatini belledik.", "Vâv geri gelir: وَعَيْنَا."),
      P("كَانَتِ القِطَّةُ تَأْوِي إِلَى جِذْعِ الشَّجَرَةِ. ← ___ القِطَّةُ إِلَى جِذْعِ الشَّجَرَةِ.", "أَوَتِ", "أَوَيَتِ", "أَوَى", 3, "Kedi ağacın gövdesine sığındı.", "أَوَتْ; ال'dan önce esre: أَوَتِ القِطَّةُ."),
      P("سَمِعْتُ ذِئْبًا يَعْوِي فِي الغَابَةِ. ← سَمِعْتُ ذِئْبًا ___ فِي الغَابَةِ.", "عَوَى", "عَوِيَ", "عَوَا", 4, "Ormanda uluyan bir kurt işittim.", "عَوَى."),
      P("هَلْ تَكْوِينَ حِجَابَكِ كُلَّ أُسْبُوعٍ؟ ← هَلْ ___ حِجَابَكِ؟", "كَوَيْتِ", "كَوَيْتَ", "كَوَيْنَ", 5, "Başörtünü ütüledin mi?", "أَنْتِ: كَوَيْتِ."),
      P("كَانَ صَدِيقِي يَلِي كُلَّ أُمُورِنَا المَنْزِلِيَّةِ. ← ___ صَدِيقِي كُلَّ أُمُورِنَا المَنْزِلِيَّةِ.", "وَلِيَ", "وَلَى", "لِيَ", 0, "Arkadaşım bütün ev işlerimizi üstlendi.", "Vâv geri gelir: وَلِيَ (6. bâb)."),
      P("هَلْ كَانَتْ نَجْلَاءُ تَفِي بِوَعْدِهَا؟ ← هَلْ ___ نَجْلَاءُ بِوَعْدِهَا؟", "وَفَتْ", "وَفَيَتْ", "فَتْ", 1, "Neclâ sözünü tuttu mu?", "وَفَاتْ → وَفَتْ.")
    ]},
    { type: "pick", fill: true, num: "٦", ar: "أَعِدْ كِتَابَةَ الجُمَلِ التَّالِيَةِ مُسْنِدًا الفِعْلَ اللَّفِيفَ المُضَارِعَ إِلَى الضَّمِيرِ بَيْنَ القَوْسَيْنِ", tr: "Muzâriyi parantezdeki zamire göre çek.", exHtml: "<span class=\"ar\">يَفِي سَعِيدٌ بِوَعْدِهِ. (أَنْتَ) ← تَفِي بِوَعْدِكَ.</span>", items: [
      P("أَبُو هُرَيْرَةَ يَرْوِي أَحَادِيثَ كَثِيرَةً. (هُمْ) ← ___ أَحَادِيثَ كَثِيرَةً.", "يَرْوُونَ", "يَرْوِيُونَ", "يَرْوِينَ", 0, "Pek çok hadis rivayet ediyorlar.", "يَرْوِيُونَ → يَرْوُونَ."),
      P("شَوَّالُ تَكْوِي حِجَابَهَا. (هُنَّ) ← ___ حِجَابَهُنَّ.", "يَكْوِينَ", "تَكْوِينَ", "يَكْوُونَ", 1, "Başörtülerini ütülüyorlar (kadınlar).", "هُنَّ: يَكْوِينَ (تَكْوِينَ أَنْتِ içindir)."),
      P("يَعْوِي الكَلْبُ عَلَى الذِّئْبِ. (هِيَ) ← ___ عَلَى الذِّئْبِ.", "تَعْوِي", "يَعْوِي", "تَعْوِينَ", 2, "(Dişi köpek) kurda uluyor.", "هِيَ: تَعْوِي."),
      P("يَلْوِي الإِنْسَانُ الحَدِيدَ بِقُوَّةِ العِلْمِ. (أَنَا) ← ___ الحَدِيدَ بِقُوَّةِ العِلْمِ.", "أَلْوِي", "نَلْوِي", "أَلْوُو", 3, "Demiri ilmin gücüyle bükerim.", "أَنَا: أَلْوِي."),
      P("يَطْوِي البَائِعُ القُمَاشَ ثُمَّ يَحْمِلُهُ. (نَحْنُ) ← ___ القُمَاشَ ثُمَّ نَحْمِلُهُ.", "نَطْوِي", "أَطْوِي", "نَطْوُو", 4, "Kumaşı katlar, sonra taşırız.", "نَحْنُ: نَطْوِي."),
      P("يَغْوِي الإِنْسَانُ إِذَا أَطَاعَ إِبْلِيسَ. (أَنْتُمْ) ← ___ إِذَا أَطَعْتُمْ إِبْلِيسَ.", "تَغْوُونَ", "تَغْوِيُونَ", "تَغْوِينَ", 5, "İblis’e uyarsanız yoldan çıkarsınız.", "تَغْوِيُونَ → تَغْوُونَ."),
      P("يَحْوِي الكِتَابُ عِشْرِينَ قِصَّةً. (أَنْتُمَا) ← ___ عِشْرِينَ قِصَّةً.", "تَحْوِيَانِ", "يَحْوِيَانِ", "تَحْوُونَ", 0, "(Siz ikiniz) yirmi hikâyeyi içine alıyorsunuz.", "أَنْتُمَا: تَحْوِيَانِ."),
      P("يَنْوِي يَحْيَى الصَّلَاةَ فِي مَسْجِدِ الحَيِّ. (أَنْتَ) ← ___ الصَّلَاةَ فِي مَسْجِدِ الحَيِّ.", "تَنْوِي", "تَنْوِينَ", "يَنْوِي", 1, "Mahalle mescidinde namaza niyet edersin.", "أَنْتَ: تَنْوِي (تَنْوِينَ أَنْتِ içindir).")
    ]},
    { type: "bank", num: "٤", ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ لَفِيفٍ مُنَاسِبٍ مِنَ الأَفْعَالِ التَّالِيَةِ", tr: "Önce aşağıdan bir fiil seç, sonra uygun boşluğa dokun. Her fiil bir kez kullanılır.",
      bank: ["تَأْوِي", "تَكْوِي", "تَقِيَ", "وَعَوْهَا", "نَوَيْنَا", "رَوَتْ", "وَلِيَ", "يَفِي"], items: [
      { pre: "", h: "شَيْمَاءُ كَلَامَ الخَطِيبِ بِأَمَانَةٍ.", a: [5], tr: "Şeymâ hatibin sözünü emanetle rivayet etti.", why: "رَوَتْ: رَوَى + تْ." },
      { pre: "كُلُّ الطُّلَّابِ اسْتَمَعُوا إِلَى مَوْعِظَةِ الأُسْتَاذِ وَ", h: ".", a: [3], tr: "Bütün öğrenciler hocanın öğüdünü dinlediler ve belleğe aldılar.", why: "وَعَوْهَا: وَعَى + وْا + هَا." },
      { pre: "", h: "صِيَامَ اليَوْمِ الرَّابِعَ عَشَرَ مِنْ شَهْرِ رَجَبٍ.", a: [4], tr: "Recep ayının on dördüncü gününün orucuna niyet ettik.", why: "نَوَيْنَا." },
      { pre: "اغْسِلْ يَدَيْكَ قَبْلَ الطَّعَامِ وَبَعْدَهُ لِـ", h: "نَفْسَكَ مِنَ الجَرَاثِيمِ.", a: [2], tr: "Kendini mikroplardan korumak için yemekten önce ve sonra ellerini yıka.", why: "لِـ'den sonra mansûb: لِتَقِيَ." },
      { pre: "يَا صَدِيقِي، لِمَاذَا لَا", h: "إِلَى ظِلِّ الشَّجَرَةِ فِي الجَوِّ الحَارِّ؟", a: [0], tr: "Arkadaşım, sıcak havada neden ağacın gölgesine sığınmıyorsun?", why: "أَنْتَ: تَأْوِي." },
      { pre: "هَلْ", h: "وَالِدَتُكَ قُمْصَانَكَ كُلَّ أُسْبُوعٍ؟", a: [1], tr: "Annen gömleklerini her hafta ütüler mi?", why: "هِيَ: تَكْوِي." },
      { pre: "", h: "السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ الحُكْمَ وَهُوَ شَابٌّ.", a: [6], tr: "Sultan Fâtih Mehmed genç yaşta hükümdarlığa geçti.", why: "وَلِيَ – يَلِي: 6. bâb." },
      { pre: "المُسْلِمُ", h: "بِكُلِّ مَا يَعِدُ.", a: [7], tr: "Müslüman her verdiği sözü yerine getirir.", why: "يَفِي: يَوْفِي → يَفِي." }
    ]},
    { type: "tablo", ar: "صَرِّفِ الفِعْلَ اللَّفِيفَ المُضَارِعَ مَعَ ضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ", tr: "Muzâriyi çek: önce bir biçim seç, sonra tablodaki yerine dokun. Tuzaklar: يَوْعِي، يَطْوِيُونَ…", items: [TBL("طَوَى", "u"), TBL("وَعَى", "u"), TBL("وَلِيَ", "u"), TBL("هَوِيَ", "u")] }
  ]
},
// ---------------------------------------------------------------- 4 · EMİR VE MEZÎD
{
  id: "u4", no: 4, ar: "الأَمْرُ وَالمَزِيدُ", tr: "Emir ve Mezîd Lefîf", short: "Emir · mezîd", col: "ref", legend: ["cerr", "mi"],
  goals: ["Mefrûkun emrinde iki illetin de düştüğünü, tek harf kaldığını bilmek: قِ، عِ، فِ، لِ", "Mekrûnun emrini nâkıs gibi yapmak: اِنْوِ، اِطْوِ، اِشْوِ", "Mezîd lefîf fiillerin muzâri, emir, ism-i fâil, ism-i mef’ûl ve masdarını yapmak"],
  examples: [
    { s: "تَقِي:- / يَا يَحْيَى صَدِيقَكَ مِنَ الخَطَرِ.:- / ←:- / قِ:cerr / يَا يَحْيَى صَدِيقَكَ مِنَ الخَطَرِ.:-", tr: "Yahyâ, arkadaşını tehlikeden koru." },
    { s: "قُوا:cerr / أَنْفُسَكُمْ وَأَهْلِيكُمْ نَارًا.:-", tr: "Kendinizi ve ailenizi ateşten koruyun. (Tahrîm 6)", pair: "اِنْوِ:cerr / الخَيْرَ.:-", pairTr: "Hayra niyet et." }
  ],
  rules: [
    { tr: "<b>Mefrûk</b>: emirde hem baştaki vâv hem sondaki yâ düşer; geriye <b>tek harf</b> kalır:", ex: ["وَقَى ← قِ، قِيَا، قُوا، قِي، قِينَ", "وَعَى ← عِ · وَفَى ← فِ · وَلِيَ ← لِ"] },
    { tr: "Tek harfli emirde durunca sonuna sekt hâsı eklenir: <span class=\"ar\">قِهْ، عِهْ</span>. Yazıda çoğunlukla <span class=\"ar\">قِ، عِ</span> diye görülür." },
    { tr: "<b>Mekrûn</b>: nâkıs gibi yalnız son harf düşer: <span class=\"ar\">اِنْوِ، اِنْوِيَا، اِنْوُوا، اِنْوِي، اِنْوِينَ</span> · 4. bâb: <span class=\"ar\">اِهْوَ، اِهْوَوْا، اِهْوَيْ</span>." },
    { tr: "Mezîd lefîf fiiller nâkıs mezîd gibidir: ism-i fâil tenvinli kesre (<span class=\"ar\">مُغْوٍ</span>), ism-i mef’ûl tenvinli elif (<span class=\"ar\">مُغْوًى</span>) alır.", ex: ["أَغْوَى – يُغْوِي – أَغْوِ – مُغْوٍ – مُغْوًى – إِغْوَاءٌ", "اِسْتَوْلَى – يَسْتَوْلِي – اِسْتِيلَاءٌ (وْ → ي)"] },
    { tr: "Yazım: illet harfinden önce yâ varsa son elif dik yazılır: <span class=\"ar\">أَحْيَا، اِسْتَحْيَا، يَحْيَا، مُحْيًا</span> (özel isim <span class=\"ar\">يَحْيَى</span> hariç)." }
  ],
  kaide: ["٣ ـ وَتُحْذَفُ فَاءُ الفِعْلِ اللَّفِيفِ المَفْرُوقِ وَلَامُهُ مَعًا فِي صِيغَةِ الأَمْرِ، مِثْلُ: وَعَى: عِ، وَفَى: فِ، وَقَى: قِ.", "تَصْرِيفُ فِعْلِ الأَمْرِ اللَّفِيفِ: اِنْوِ – اِنْوِيَا – اِنْوُوا، اِنْوِي – اِنْوِيَا – اِنْوِينَ. قِ – قِيَا – قُوا، قِي – قِيَا – قِينَ.", "جَدْوَلُ الأَفْعَالِ المَزِيدَةِ مِنَ الفِعْلِ اللَّفِيفِ: إِفْعَالٌ: أَغْوَى يُغْوِي أَغْوِ مُغْوٍ مُغْوًى إِغْوَاءٌ…"],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "حَوِّلِ الفِعْلَ اللَّفِيفَ المُضَارِعَ إِلَى أَمْرٍ", tr: "Muzâriyi emre çevir: mefrûkta tek harf kalır, mekrûnda yalnız son harf düşer.", exHtml: "<span class=\"ar\">تَقِي يَا يَحْيَى صَدِيقَكَ مِنَ الخَطَرِ ← قِ يَا يَحْيَى صَدِيقَكَ مِنَ الخَطَرِ.</span>", items: [
      P("تَرْوِي أَحَادِيثَ الرَّسُولِ لِمَنْ لَا يَعْرِفُهَا. ← ___ أَحَادِيثَ الرَّسُولِ لِمَنْ لَا يَعْرِفُهَا.", "اِرْوِ", "اُرْوُ", "اِرْوَى", 0, "Resûlullah’ın hadislerini bilmeyene rivayet et.", "يَرْوِي → اِرْوِ."),
      P("تَنْوِي العَمَلَ لِوَجْهِ اللهِ فَقَطْ. ← ___ العَمَلَ لِوَجْهِ اللهِ فَقَطْ.", "اِنْوِ", "اُنْوُ", "اِنْوَ", 1, "Amele yalnız Allah rızası için niyet et.", "اِنْوِ."),
      P("تَعِي نَصِيحَةَ أَخِيكَ. ← ___ نَصِيحَةَ أَخِيكَ.", "عِ", "اِوْعِ", "عَ", 2, "Kardeşinin nasihatini belle.", "Mefrûk: vâv ve yâ düşer, عِ kalır."),
      P("يَا أَخِي، لِمَ لَا تَأْوِي إِلَى مُخَيَّمِ اللَّاجِئِينَ؟ ← يَا أَخِي، ___ إِلَى مُخَيَّمِ اللَّاجِئِينَ.", "اِئْوِ", "أَوِ", "اِأْوَى", 3, "Kardeşim, mülteci kampına sığın.", "يَأْوِي → اِئْوِ (vasıl elifinden sonra sâkin hemze yâ üstüne yazılır; “îvi” okunur)."),
      P("شَوَيْنَا مَعَ الأَصْدِقَاءِ سَمَكًا طَرِيًّا. (أَنْتُمْ) ← ___ مَعَ الأَصْدِقَاءِ سَمَكًا طَرِيًّا.", "اِشْوُوا", "اِشْوِيُوا", "اِشْوِ", 4, "Arkadaşlarla taze balık kızartın.", "أَنْتُمْ: اِشْوُوا."),
      P("يَا نَجْلَاءُ، أَنْتِ تَكْوِينَ حِجَابَكِ كُلَّ أُسْبُوعٍ. ← يَا نَجْلَاءُ، ___ حِجَابَكِ كُلَّ أُسْبُوعٍ.", "اِكْوِي", "اِكْوِ", "اِكْوِينَ", 5, "Neclâ, başörtünü her hafta ütüle.", "أَنْتِ: اِكْوِي."),
      P("يَا حُسَيْنُ، لِمَ لَا تَلِي أُمُورَنَا المَنْزِلِيَّةَ؟ ← يَا حُسَيْنُ، ___ أُمُورَنَا المَنْزِلِيَّةَ.", "لِ", "لِي", "اِوْلِ", 0, "Hüseyin, ev işlerimizi üstlen.", "Mefrûk: لِ (لِي أَنْتِ içindir)."),
      P("يَا فَاطِمَةُ، أَنْتِ تَفِينَ بِوَعْدِكِ. ← يَا فَاطِمَةُ، ___ بِوَعْدِكِ.", "فِي", "فِ", "فِينَ", 1, "Fâtıma, sözünü tut.", "أَنْتِ: فِي.")
    ]},
    { type: "tablo", ar: "صَرِّفْ فِعْلَ الأَمْرِ اللَّفِيفِ مَعَ ضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ", tr: "Emri çek: muhâtab ve muhâtaba, tekil, ikil, çoğul.", items: [TBL("طَوَى", "e"), TBL("وَعَى", "e"), TBL("وَفَى", "e"), TBL("هَوِيَ", "e")] },
    { type: "combo", ar: "امْلَأِ الفَرَاغَ فِي جَدْوَلِ الأَفْعَالِ المَزِيدَةِ مِنَ الفِعْلِ اللَّفِيفِ", tr: "Mâzisi verilen mezîd fiilin muzâri, emir, ism-i fâil, ism-i mef’ûl ve masdarını seç (sırayla).", items: MZA.map(function (r, i) { return mzCombo(r, 1, i); }) },
    { type: "combo", extra: true, ar: "جَدْوَلُ الأَفْعَالِ المَزِيدَةِ: املَأِ الفَرَاغَ (٢)", tr: "Masdarı verilen mezîd fiilin mâzi, muzâri, emir, ism-i fâil ve ism-i mef’ûlünü seç (sırayla).", items: MZB.map(function (r, i) { return mzCombo(r, 6, i); }) }
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", tr: "Okuma: Ameller Niyetlere Göredir", short: "Okuma", col: "muz", legend: ["cerr"],
  goals: ["Metinde lefîf fiilleri bulmak: يَقِي، وَقَاهُمْ، نَوَى، يَعِيَ، يَرْوِيَهُ", "Lefîf kökünden gelen isimleri tanımak: النِّيَّةُ، الوِقَايَةُ، المُتَّقِينَ، أَوْعَى", "Lefîfi nâkıs (أَبَتْ) ve ecvef (صَارَ، يُصِيبُ) fiillerden ayırmak"],
  examples: [
    { s: "إِنَّمَا:- / الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا:- / نَوَى:cerr", tr: "Ameller ancak niyetlere göredir; herkese ancak niyet ettiği vardır." },
    { s: "وَ:- / وَقَاهُمْ:cerr / عَذَابَ الجَحِيمِ:-", tr: "Ve onları cehennem azabından korudu. (Duhân 56)" }
  ],
  rules: [
    { tr: "Lefîf fiil: <span class=\"ar\">يَقِي، وَقَاهُمْ، نَوَى، يَعِيَ، يَرْوِيَهُ</span>. <span class=\"ar\">أَنْ</span>'den sonra mansûb: <span class=\"ar\">أَنْ يَعِيَ، أَنْ يَرْوِيَهُ</span> (yâ üstün alır)." },
    { tr: "Lefîf kökünden isim: <span class=\"ar\">النِّيَّاتُ (نَوَى), الوِقَايَةُ، المُتَّقِينَ (وَقَى), أَوْعَى (وَعَى)</span>." },
    { tr: "Nâkıs: <span class=\"ar\">أَبَتْ (أَبَى)</span>. Ecvef: <span class=\"ar\">صَارَ، قَالَ، يَقُولُ، يُصِيبُ</span>." }
  ],
  kaide: ["اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ عَيِّنِ الفِعْلَ اللَّفِيفَ."],
  ex: [
    { type: "reading", num: "٩", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ عَيِّنِ الفِعْلَ اللَّفِيفَ", tr: "Metni oku; sonra koyu kelimenin ne olduğunu seç.", title: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
      text: "إِنَّ تَوْحِيدَ اللهِ تَعَالَى أَسَاسُ عَقِيدَةِ المُسْلِمِ، وَإِنَّ العَمَلَ الصَّالِحَ أَمْرٌ لَازِمٌ وَضَرُورِيٌّ لِلْوِقَايَةِ مِنَ النَّارِ وَالفَوْزِ بِالجَنَّةِ؛ وَلِهَذَا يَقِي اللهُ عِبَادَهُ المُتَّقِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ عَذَابَ النَّارِ وَيُدْخِلُهُمُ الجَنَّةَ، قَالَ تَعَالَى: ﴿وَوَقَاهُمْ عَذَابَ الجَحِيمِ﴾ (الدُّخَانُ: ٥٦)، وَقَالَ أَيْضًا: ﴿إِنَّ المُتَّقِينَ فِي جَنَّاتٍ وَعُيُونٍ﴾ (الحِجْرُ: ٤٥). وَلَا بُدَّ لِلْعَمَلِ الصَّالِحِ مِنَ الاقْتِرَانِ بِالنِّيَّةِ الصَّحِيحَةِ حَتَّى يَكُونَ العَمَلُ خَالِصًا لِلهِ؛ وَلِهَذَا قَرَّرَ النَّبِيُّ ﷺ أَنَّ النِّيَّةَ لَازِمَةٌ لِلْعَمَلِ الصَّالِحِ. عَنْ عُمَرَ بْنِ الخَطَّابِ رَضِيَ اللهُ عَنْهُ عَلَى المِنْبَرِ قَالَ: سَمِعْتُ رَسُولَ اللهِ ﷺ يَقُولُ: «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ». فَعَلَى المُسْلِمِ أَنْ يَعِيَ هَذَا الحَدِيثَ وَأَنْ يَرْوِيَهُ لِمَنْ لَا يَعْرِفُهُ، «فَرُبَّ مُبَلَّغٍ أَوْعَى مِنْ سَامِعٍ». قَالَ شُرَّاحُ الحَدِيثِ: خَطَبَ النَّبِيُّ ﷺ بِهَذَا الحَدِيثِ خُطْبَةً مُخْتَصَرَةً حِينَمَا قَدِمَ المَدِينَةَ، وَالسَّبَبُ أَنَّ رَجُلًا أَحَبَّ امْرَأَةً فِي مَكَّةَ وَطَلَبَ الزَّوَاجَ مِنْهَا، فَأَبَتْ أَنْ تَتَزَوَّجَهُ حَتَّى يُهَاجِرَ إِلَى رَسُولِ اللهِ، فَهَاجَرَ مِنْ أَجْلِ أَنْ يَتَزَوَّجَهَا وَتَزَوَّجَهَا، فَصَارَ اسْمُ هَذَا الرَّجُلِ: مُهَاجِرَ أُمِّ قَيْسٍ؛ مَا تَرَكَ مَكَّةَ إِلَى المَدِينَةِ إِلَّا لِلزَّوَاجِ مِنْ هَذِهِ المَرْأَةِ. يَقُولُ بَعْضُ العُلَمَاءِ: لَيْسَ فِي أَخْبَارِ النَّبِيِّ ﷺ شَيْءٌ أَجْمَعُ وَلَا أَغْنَى وَلَا أَكْثَرُ فَائِدَةً مِنْ هَذَا الحَدِيثِ؛ فَهُوَ أَصْلٌ مِنْ أُصُولِ الدِّينِ، أَخْرَجَهُ الأَئِمَّةُ المَشْهُورُونَ.",
      textTr: "Allah’ı birlemek Müslümanın inancının temelidir; salih amel ise ateşten korunmak ve cenneti kazanmak için gerekli ve zorunludur. Bu yüzden Allah, salih ameller işleyen takvâ sahibi kullarını ateşin azabından korur ve onları cennete koyar. Yüce Allah şöyle buyurur: “Ve onları cehennem azabından korudu.” (Duhân 56) Şöyle de buyurur: “Takvâ sahipleri cennetlerde ve pınar başlarındadır.” (Hicr 45) Amelin yalnız Allah için olması için salih amelin doğru niyetle birlikte olması şarttır. Bu yüzden Peygamber ﷺ niyetin salih amel için gerekli olduğunu belirtmiştir. Ömer b. Hattâb minberde şöyle dedi: Resûlullah’ı ﷺ şöyle derken işittim: “Ameller ancak niyetlere göredir; herkese ancak niyet ettiği vardır. Kimin hicreti elde edeceği bir dünyalığa ya da evleneceği bir kadına ise, onun hicreti de hicret ettiği şeyedir.” Müslümanın bu hadisi kavraması ve bilmeyene rivayet etmesi gerekir; “Nice kendisine tebliğ edilen, duyandan daha iyi kavrar.” Hadis şârihleri şöyle der: Peygamber ﷺ Medine’ye geldiğinde bu hadisle kısa bir hutbe okudu. Sebebi şudur: Bir adam Mekke’de bir kadını sevip onunla evlenmek istedi. Kadın, Resûlullah’a hicret etmedikçe onunla evlenmeyi kabul etmedi. Adam onunla evlenmek için hicret etti ve evlendi. Bu yüzden adamın adı “Ümmü Kays’ın muhaciri” oldu; Mekke’yi Medine’ye ancak bu kadınla evlenmek için bıraktı. Bazı âlimler der ki: Peygamberin ﷺ haberleri arasında bu hadisten daha kapsamlı, daha zengin ve daha faydalı bir şey yoktur; o, dinin temellerinden biridir; meşhur imamlar onu rivayet etmiştir.",
      qa: [
        { q: "لِمَاذَا يَقِي اللهُ عِبَادَهُ المُتَّقِينَ عَذَابَ النَّارِ؟", a: "لِأَنَّهُمْ يَعْمَلُونَ الصَّالِحَاتِ.", tr: "Allah takvâ sahibi kullarını ateşin azabından neden korur? Salih ameller işledikleri için." },
        { q: "مَا الَّذِي لَا بُدَّ مِنْهُ لِلْعَمَلِ الصَّالِحِ؟", a: "لَا بُدَّ لَهُ مِنَ النِّيَّةِ الصَّحِيحَةِ حَتَّى يَكُونَ خَالِصًا لِلهِ.", tr: "Salih amel için ne şarttır? Yalnız Allah için olması için doğru niyet." },
        { q: "لِمَاذَا سُمِّيَ الرَّجُلُ «مُهَاجِرَ أُمِّ قَيْسٍ»؟", a: "لِأَنَّهُ هَاجَرَ لِيَتَزَوَّجَ امْرَأَةً، لَا لِلهِ وَرَسُولِهِ.", tr: "Adama neden “Ümmü Kays’ın muhaciri” denildi? Allah ve Resûlü için değil, bir kadınla evlenmek için hicret ettiği için." }
      ],
      cls: { opts: [["l", "Lefîf fiil", "فِعْلٌ لَفِيفٌ", "cerr"], ["i", "Lefîf kökünden isim", "اسْمٌ", "nasb"], ["n", "Nâkıs fiil", "فِعْلٌ نَاقِصٌ", "mi"], ["e", "Ecvef fiil", "فِعْلٌ أَجْوَفُ", "mz"], ["x", "Hiçbiri", "لَيْسَ مِنْهَا", "x"]], ar: "عَيِّنِ الفِعْلَ اللَّفِيفَ", tr: "Koyu kelime ne?", items: [
        { s: HL("وَلِهَذَا يَقِي اللهُ عِبَادَهُ", "يَقِي"), a: "l", why: "وَقَى – يَقِي: mefrûk, muzâride vâv düştü." },
        { s: HL("﴿وَوَقَاهُمْ عَذَابَ الجَحِيمِ﴾", "وَقَاهُمْ"), a: "l", why: "وَقَى + هُمْ: mâzi." },
        { s: HL("لِلْوِقَايَةِ مِنَ النَّارِ", "لِلْوِقَايَةِ"), a: "i", why: "وَقَى'nin masdarı." },
        { s: HL("﴿إِنَّ المُتَّقِينَ فِي جَنَّاتٍ﴾", "المُتَّقِينَ"), a: "i", why: "اِتَّقَى'nın ism-i fâili (kökü وَقَى)." },
        { s: HL("إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", "بِالنِّيَّاتِ"), a: "i", why: "نِيَّةٌ: نَوَى'nın masdarı." },
        { s: HL("لِكُلِّ امْرِئٍ مَا نَوَى", "نَوَى"), a: "l", why: "نَوَى – يَنْوِي: mekrûn." },
        { s: HL("إِلَى دُنْيَا يُصِيبُهَا", "يُصِيبُهَا"), a: "e", why: "أَصَابَ – يُصِيبُ: orta harf illetli (ecvef)." },
        { s: HL("أَنْ يَعِيَ هَذَا الحَدِيثَ", "يَعِيَ"), a: "l", why: "وَعَى – يَعِي: أَنْ ile mansûb." },
        { s: HL("وَأَنْ يَرْوِيَهُ لِمَنْ لَا يَعْرِفُهُ", "يَرْوِيَهُ"), a: "l", why: "رَوَى – يَرْوِي: mekrûn, mansûb." },
        { s: HL("فَرُبَّ مُبَلَّغٍ أَوْعَى مِنْ سَامِعٍ", "أَوْعَى"), a: "i", why: "وَعَى'den ism-i tafdîl." },
        { s: HL("فَأَبَتْ أَنْ تَتَزَوَّجَهُ", "فَأَبَتْ"), a: "n", why: "أَبَى – يَأْبَى: tek illet (son harf): nâkıs." },
        { s: HL("فَصَارَ اسْمُ هَذَا الرَّجُلِ", "فَصَارَ"), a: "e", why: "صَارَ – يَصِيرُ: ecvef." },
        { s: HL("حِينَمَا قَدِمَ المَدِينَةَ", "قَدِمَ"), a: "x", why: "Sahih (sâlim) fiil." },
        { s: HL("مَا تَرَكَ مَكَّةَ", "تَرَكَ"), a: "x", why: "Sahih (sâlim) fiil." },
        { s: HL("يَقُولُ بَعْضُ العُلَمَاءِ", "يَقُولُ"), a: "e", why: "قَالَ – يَقُولُ: ecvef." }
      ]},
      cls2: { opts: [["mk", "Mekrûn", "مَقْرُونٌ", "cerr"], ["mf", "Mefrûk", "مَفْرُوقٌ", "nasb"]], ar: "مَقْرُونٌ أَمْ مَفْرُوقٌ؟", tr: "Metindeki lefîf kelimelerin kökü mekrûn mu, mefrûk mu?", items: [
        { s: "يَقِي (وَقَى)", a: "mf", why: "و ق ي: araya ق girmiş." }, { s: "نَوَى", a: "mk", why: "ن و ي: و ile ي yan yana." }, { s: "يَعِيَ (وَعَى)", a: "mf", why: "و ع ي." },
        { s: "يَرْوِيَهُ (رَوَى)", a: "mk", why: "ر و ي." }, { s: "النِّيَّاتُ (نَوَى)", a: "mk", why: "Kökü ن و ي." }, { s: "أَوْعَى (وَعَى)", a: "mf", why: "Kökü و ع ي." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var SUL = VERBS.filter(SUL_V);
// Doğru Çekim: [zamir {biçim}, seçenekler, açıklama, Türkçe, konu]
var NK_POOL = [];
SUL.forEach(function (v, i) {
  var mz = MAZ(v), mu = MUZ(v), em = EMR(v), dm = DIST(v, "m"), du = DIST(v, "u"), de = DIST(v, "e");
  if (dm.length >= 2) NK_POOL.push([PER[2] + " {" + mz[2] + "}", [mz[2], dm[0], dm[1]], v.m + " · هُمْ (mâzi)", "onlar · " + v.tr, "u2"]);
  NK_POOL.push([PER[12] + " {" + mz[12] + "}", [mz[12], v.ms + (v.mt === "Y" ? "وْتُ" : "َيْتُ"), v.ms + (v.mt === "Y" ? "اتُ" : "ُوتُ")], v.m + " · أَنَا (mâzi)", "ben · " + v.tr, "u2"]);
  if (du.length >= 2) NK_POOL.push([PER[2] + " {" + mu[2] + "}", [mu[2], du[0], du[1]], v.m + " · هُمْ (muzâri)", "onlar · " + v.tr, "u3"]);
  if (du.length >= 2) NK_POOL.push([v.m + " ← {" + mu[0] + "}", [mu[0], du[0], du[du.length - 1]], v.m + " · muzâri (" + TUR(v) + ")", v.tr, "u3"]);
  if (de.length >= 2) NK_POOL.push([PER[6] + " {" + em[0] + "}", [em[0], de[0], de[1]], v.m + " · emir (" + TUR(v) + ")", "sen (erkek) · " + v.tr, "u4"]);
  if (i % 2 === 0 && de.length >= 2) NK_POOL.push([PER[8] + " {" + em[2] + "}", [em[2], de[de.length - 1], em[0]], v.m + " · emir أَنْتُمْ", "siz · " + v.tr, "u4"]);
});
var BB_LIST = SUL.map(function (v) { return [v.m + " – " + MUZ(v)[0], v.k, (v.k === "mf" ? "Mefrûk: illet harfleri arasında sahih harf var." : "Mekrûn: illet harfleri yan yana.")]; });
var AS_LIST = [
  ["نَوَى – يَنْوِي", "l", "ن و ي: iki illet"], ["وَقَى – يَقِي", "l", "و ق ي: iki illet"], ["وَعَى – يَعِي", "l", "و ع ي"], ["طَوَى – يَطْوِي", "l", "ط و ي"], ["شَوَى – يَشْوِي", "l", "ش و ي"],
  ["وَلِيَ – يَلِي", "l", "و ل ي"], ["كَوَى – يَكْوِي", "l", "ك و ي"], ["وَفَى – يَفِي", "l", "و ف ي"], ["هَوِيَ – يَهْوَى", "l", "ه و ي"], ["رَوَى – يَرْوِي", "l", "ر و ي"],
  ["دَعَا – يَدْعُو", "n", "Yalnız son harf illetli"], ["رَمَى – يَرْمِي", "n", "Yalnız son harf illetli"], ["سَعَى – يَسْعَى", "n", "Yalnız son harf illetli"], ["رَضِيَ – يَرْضَى", "n", "Yalnız son harf illetli"], ["بَكَى – يَبْكِي", "n", "Yalnız son harf illetli"], ["نَسِيَ – يَنْسَى", "n", "Yalnız son harf illetli"],
  ["وَعَدَ – يَعِدُ", "m", "Yalnız ilk harf illetli"], ["وَصَلَ – يَصِلُ", "m", "Yalnız ilk harf illetli"], ["وَجَدَ – يَجِدُ", "m", "Yalnız ilk harf illetli"], ["وَقَفَ – يَقِفُ", "m", "Yalnız ilk harf illetli"], ["وَضَعَ – يَضَعُ", "m", "Yalnız ilk harf illetli"],
  ["قَالَ – يَقُولُ", "e", "Yalnız orta harf illetli"], ["بَاعَ – يَبِيعُ", "e", "Yalnız orta harf illetli"], ["نَامَ – يَنَامُ", "e", "Yalnız orta harf illetli"], ["صَامَ – يَصُومُ", "e", "Yalnız orta harf illetli"], ["زَارَ – يَزُورُ", "e", "Yalnız orta harf illetli"]
];
var BBO = [["mk", "Mekrûn", "مَقْرُونٌ", "cerr"], ["mf", "Mefrûk", "مَفْرُوقٌ", "nasb"]];
var ASO = [["l", "Lefîf", "لَفِيفٌ", "cerr"], ["n", "Nâkıs", "نَاقِصٌ", "nasb"], ["m", "Misâl", "مِثَالٌ", "mi"], ["e", "Ecvef", "أَجْوَفُ", "ref"]];
var HAFIZA = {
  mu: { name: "Mâzi ↔ muzâri", pairs: [["نَوَى", "يَنْوِي"], ["وَقَى", "يَقِي"], ["وَعَى", "يَعِي"], ["هَوِيَ", "يَهْوَى"], ["وَلِيَ", "يَلِي"], ["طَوَى", "يَطْوِي"], ["سَوَّى", "يُسَوِّي"]] },
  ue: { name: "Muzâri ↔ emir", pairs: [["يَقِي", "قِ"], ["يَعِي", "عِ"], ["يَفِي", "فِ"], ["يَلِي", "لِ"], ["يَنْوِي", "اِنْوِ"], ["يَطْوِي", "اِطْوِ"], ["يَهْوَى", "اِهْوَ"]] },
  tr: { name: "Fiil ↔ Türkçe", pairs: [["نَوَوْا", "niyet ettiler"], ["وَعَتْ", "(kadın) kavradı"], ["يَقُونَ", "koruyorlar"], ["قُوا", "koruyun"], ["عِي", "(kadın) belle"], ["وَلُوا", "başına geçtiler"], ["اِشْوِ", "kızart"]] }
};
var KARTLAR = [
  ["Lefîf fiil nedir?", "Kökünde iki illet harfi bulunan fiil: نَوَى، وَقَى"],
  ["Lefîf-i mekrûn?", "İki illet harfi yan yana: نَوَى (ن و ي)"],
  ["Lefîf-i mefrûk?", "İki illet harfi arasında sahih harf: وَقَى (و ق ي)"],
  ["Mekrûn neye benzer?", "Nâkısa: نَوَى يَنْوِي اِنْوِ (ortadaki vâv kalır)"],
  ["Mefrûk neye benzer?", "Baştan misâle, sondan nâkısa: وَقَى يَقِي قِ"],
  ["وَعَى'nin muzârisi?", "يَعِي (vâv düşer)"],
  ["وَعَى'nin emri?", "عِ (vâv da yâ da düşer, tek harf kalır)"],
  ["Emir قِ'nin çekimi?", "قِ · قِيَا · قُوا · قِي · قِينَ"],
  ["هُمْ: نَوَى / وَقَى / وَلِيَ?", "نَوَوْا · وَقَوْا · وَلُوا"],
  ["Muzâri هُمْ: يَنْوِي / يَقِي / يَهْوَى?", "يَنْوُونَ · يَقُونَ · يَهْوَوْنَ"],
  ["Mekrûnun bâbları?", "2. bâb: نَوَى يَنْوِي · 4. bâb: هَوِيَ يَهْوَى"],
  ["اِسْتَوْلَى'nin masdarı?", "اِسْتِيلَاءٌ (vâv, kesreden sonra yâ olur)"]
];
