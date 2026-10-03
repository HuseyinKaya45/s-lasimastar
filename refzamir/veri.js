// ================= VERİ: Fiile Bitişen Merfû Zamirler (ضَمَائِرُ الرَّفْعِ المُتَّصِلَةُ بِالأَفْعَالِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "ref.ـو" gibi yazılırsa etikete not eklenir.
var ROLES = {
  ref: { ar: "فِعْلٌ + ضَمِيرُ رَفْعٍ", tr: "Fiil + ref zamiri" }, mz: { ar: "ضَمِيرٌ مُنْفَصِلٌ", tr: "Munfasıl zamir" },
  sf: { ar: "فِعْلٌ", tr: "Fiil · zamir görünmez" }, mus: { ar: "مُبْتَدَأٌ", tr: "Mübtedâ" }, muz: { ar: "فَاعِلٌ", tr: "Fâil (isim)" },
  nasb: { ar: "ضَمِيرُ نَصْبٍ", tr: "Mef'ûl zamiri" }, x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
// altı ref zamiri: [anahtar, Türkçe, Arapça ad, renk, örnek]
var RZ = [
  ["tu", "Hareke alan tâ (ben, sen, siz)", "التَّاءُ المُتَحَرِّكَةُ", "ref", "كَتَبْتُ"],
  ["elif", "İkil elifi (o ikisi, siz ikiniz)", "أَلِفُ الاثْنَيْنِ", "cerr", "كَتَبَا"],
  ["vav", "Çoğul vavı (onlar, siz)", "وَاوُ الجَمَاعَةِ", "mz", "كَتَبُوا"],
  ["ya", "Muhataba yâsı (sen, kadın)", "يَاءُ المُخَاطَبَةِ", "mun", "تَكْتُبِينَ"],
  ["nun", "Kadınlar nûnu (onlar, siz kadınlar)", "نُونُ النِّسْوَةِ", "nasb", "كَتَبْنَ"],
  ["na", "Biz nâsı (biz)", "نَا الفَاعِلِينَ", "mi", "كَتَبْنَا"]
];
var RZ_OPTS = RZ.map(function (r) { return [r[0], r[1].replace(/ \(.*\)$/, ""), r[2], "x"]; });
var RZ_BY = {}; RZ.forEach(function (r) { RZ_BY[r[0]] = r; });
var Z4_OPTS = [["ref", "Fiile bitişik ref (fâil)", "ضَمِيرُ رَفْعٍ", "x"], ["nasb", "Fiile bitişik nasb (mef'ûl)", "ضَمِيرُ نَصْبٍ", "x"], ["isim", "İsme bitişik", "مُتَّصِلٌ بِالاسْمِ", "x"], ["harf", "Harfe bitişik", "مُتَّصِلٌ بِالحَرْفِ", "x"]];

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^\[(.*)\](.*)$/.exec(w), p = /^\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}

// ---------------- çekim motoru ----------------
// 14 hücre: [satır, sütun, etiket, munfasıl, şahıs, isme bitişik ek]
var CELLS = [
  [0, 0, "Gâib · tekil", "هُوَ", "g", "هُ"], [0, 1, "Gâib · ikil", "هُمَا", "g", "هُمَا"], [0, 2, "Gâib · çoğul", "هُمْ", "g", "هُمْ"],
  [1, 0, "Gâibe · tekil", "هِيَ", "g", "هَا"], [1, 1, "Gâibe · ikil", "هُمَا", "g", "هُمَا"], [1, 2, "Gâibe · çoğul", "هُنَّ", "g", "هُنَّ"],
  [2, 0, "Muhatab · tekil", "أَنْتَ", "m", "كَ"], [2, 1, "Muhatab · ikil", "أَنْتُمَا", "m", "كُمَا"], [2, 2, "Muhatab · çoğul", "أَنْتُمْ", "m", "كُمْ"],
  [3, 0, "Muhataba · tekil", "أَنْتِ", "m", "كِ"], [3, 1, "Muhataba · ikil", "أَنْتُمَا", "m", "كُمَا"], [3, 2, "Muhataba · çoğul", "أَنْتُنَّ", "m", "كُنَّ"],
  [4, 0, "Mütekellim · tekil", "أَنَا", "t", "ي"], [4, 1, "Mütekellim · ikil ve çoğul", "نَحْنُ", "t", "نَا"]
];
var CROWS = [["Gâib", "الغَائِبُ", "muz"], ["Gâibe", "الغَائِبَةُ", "mun"], ["Muhatab", "المُخَاطَبُ", "muz"], ["Muhataba", "المُخَاطَبَةُ", "mun"], ["Mütekellim", "المُتَكَلِّمُ", "accent"]];
// parça: [metin, tür] · tür: "" düz, "z" ref zamiri, "t" te'nîs tâsı (zamir değil), "m" muzâri harfi
var MZ_SUF = [
  [["َ", ""]], [["َ", ""], ["ا", "z"]], [["ُ", ""], ["و", "z"], ["ا", ""]],
  [["َ", ""], ["تْ", "t"]], [["َ", ""], ["تَ", "t"], ["ا", "z"]], [["ْ", ""], ["نَ", "z"]],
  [["ْ", ""], ["تَ", "z"]], [["ْ", ""], ["تُ", "z"], ["مَا", ""]], [["ْ", ""], ["تُ", "z"], ["مْ", ""]],
  [["ْ", ""], ["تِ", "z"]], [["ْ", ""], ["تُ", "z"], ["مَا", ""]], [["ْ", ""], ["تُ", "z"], ["نَّ", ""]],
  [["ْ", ""], ["تُ", "z"]], [["ْ", ""], ["نَا", "z"]]
];
var MZ_Z = [null, "elif", "vav", null, "elif", "nun", "tu", "tu", "tu", "tu", "tu", "tu", "tu", "na"];
var MU_PRE = ["ي", "ي", "ي", "ت", "ت", "ي", "ت", "ت", "ت", "ت", "ت", "ت", "أ", "ن"];
var MU_SUF = [
  [["ُ", ""]], [["َ", ""], ["ا", "z"], ["نِ", ""]], [["ُ", ""], ["و", "z"], ["نَ", ""]],
  [["ُ", ""]], [["َ", ""], ["ا", "z"], ["نِ", ""]], [["ْ", ""], ["نَ", "z"]],
  [["ُ", ""]], [["َ", ""], ["ا", "z"], ["نِ", ""]], [["ُ", ""], ["و", "z"], ["نَ", ""]],
  [["ِ", ""], ["ي", "z"], ["نَ", ""]], [["َ", ""], ["ا", "z"], ["نِ", ""]], [["ْ", ""], ["نَ", "z"]],
  [["ُ", ""]], [["ُ", ""]]
];
var MU_Z = [null, "elif", "vav", null, "elif", "nun", null, "elif", "vav", "ya", "elif", "nun", null, null];
// fiiller: m = mâzi gövdesi, u = muzâri gövdesi, p = muzâri harfinin harekesi, ov = özel yazım
var V = {
  ktb: { m: "كَتَب", u: "كْتُب", p: "َ", tr: "yazmak" }, dhb: { m: "ذَهَب", u: "ذْهَب", p: "َ", tr: "gitmek" },
  jls: { m: "جَلَس", u: "جْلِس", p: "َ", tr: "oturmak" }, fth: { m: "فَتَح", u: "فْتَح", p: "َ", tr: "açmak" },
  rjc: { m: "رَجَع", u: "رْجِع", p: "َ", tr: "dönmek" }, shrb: { m: "شَرِب", u: "شْرَب", p: "َ", tr: "içmek" },
  khrj: { m: "خَرَج", u: "خْرُج", p: "َ", tr: "çıkmak" }, hdr: { m: "حَضَر", u: "حْضُر", p: "َ", tr: "hazır bulunmak" },
  rkb: { m: "رَكِب", u: "رْكَب", p: "َ", tr: "binmek" }, nzl: { m: "نَزَل", u: "نْزِل", p: "َ", tr: "inmek" },
  dfc: { m: "دَفَع", u: "دْفَع", p: "َ", tr: "ödemek" }, jmc: { m: "جَمَع", u: "جْمَع", p: "َ", tr: "toplamak" },
  cml: { m: "عَمِل", u: "عْمَل", p: "َ", tr: "çalışmak" }, dhkr: { m: "ذَكَر", u: "ذْكُر", p: "َ", tr: "anmak" },
  dkhl: { m: "دَخَل", u: "دْخُل", p: "َ", tr: "girmek" }, hsl: { m: "حَصَل", u: "حْصُل", p: "َ", tr: "elde etmek" },
  sfr: { m: "سَافَر", u: "سَافِر", p: "ُ", tr: "yolculuk etmek" }, hsn: { m: "أَحْسَن", u: "حْسِن", p: "ُ", tr: "iyilik etmek" },
  qra: { m: "قَرَأ", u: "قْرَأ", p: "َ", tr: "okumak", ov: { m1: [["قَرَ", ""], ["آ", "z"]], m2: [["قَرَ", ""], ["ؤُ", ""], ["و", "z"], ["ا", ""]], u2: [["يَ", "m"], ["قْرَ", ""], ["ؤُ", ""], ["و", "z"], ["نَ", ""]], u8: [["تَ", "m"], ["قْرَ", ""], ["ؤُ", ""], ["و", "z"], ["نَ", ""]], u9: [["تَ", "m"], ["قْرَ", ""], ["ئِ", ""], ["ي", "z"], ["نَ", ""]] } }
};
var MAK_V = ["ktb", "dhb", "jls", "fth", "rjc", "shrb", "khrj", "rkb"];
function cj(vk, mode, i) {
  var v = V[vk];
  if (v.ov && v.ov[mode + i]) return v.ov[mode + i];
  if (mode === "m") return [[v.m, ""]].concat(MZ_SUF[i]);
  return [[MU_PRE[i] + v.p, "m"], [v.u, ""]].concat(MU_SUF[i]);
}
function cjText(vk, mode, i) { return cj(vk, mode, i).map(function (p) { return p[0]; }).join(""); }
function cjZ(mode, i) { return (mode === "m" ? MZ_Z : MU_Z)[i]; }
// karışan hücreler: seçenek üretirken
var DIS = { 0: [3, 2], 1: [2, 4], 2: [1, 5], 3: [0, 6], 4: [1, 5], 5: [2, 13], 6: [12, 9], 7: [1, 8], 8: [2, 11], 9: [6, 3], 10: [4, 11], 11: [5, 8], 12: [6, 3], 13: [5, 2] };
var DIS_FB = [2, 5, 8, 13, 1, 9, 0, 11];
function optsFrom(cell, f) {
  var cells = [cell].concat(DIS[cell]), seen = {}, list = [];
  DIS_FB.forEach(function (c) { cells.push(c); });
  cells.forEach(function (c) { var t = f(c); if (!seen[t] && (list.length < 3 || c === cell)) { seen[t] = 1; list.push([c, t]); } });
  list = list.slice(0, 3); list.sort(function (a, b) { return a[0] - b[0]; });
  var o = list.map(function (x) { return x[1]; });
  return { o: o, a: o.indexOf(f(cell)) };
}
function F(vk, mode, cell) { return optsFrom(cell, function (c) { return cjText(vk, mode, c); }); }
// isme bitişik zamir: taban + hareke + ek (kesreden sonra ـهِ)
function psText(base, vw, c) {
  if (c === 12) return base + "ِي";
  var e = CELLS[c][5]; if (vw === "ِ" && /^هُ/.test(e)) e = "هِ" + e.slice(2);
  return base + vw + e;
}
function PS(base, vw, cell) { return optsFrom(cell, function (c) { return psText(base, vw, c); }); }
function CJ(q, segs, tr, why) {
  var parts = [], ok = [];
  segs.forEach(function (s) { if (typeof s === "string") parts.push(s); else { parts.push(s.o); ok.push(s.a); } });
  return CB(q, parts, ok, tr, why);
}
// tasrif cümlesi: özne + parçalar (f: fiil, p: isme bitişik)
function TS(subj, cell, segs, tr, base) {
  var lab = CELLS[cell][2], why = CELLS[cell][3] + " (" + lab.toLowerCase() + "): ";
  var fv = segs.filter(function (s) { return s[0] === "f"; }).map(function (s) { return cjText(s[1], s[2], cell); });
  return CJ(base + " <span class=\"muted\">(" + subj + ")</span>", [subj].concat(segs.map(function (s) {
    if (typeof s === "string") return s;
    if (s[0] === "f") return F(s[1], s[2], cell);
    return PS(s[1], s[2], cell);
  })), tr, why + fv.join(" · ") + (segs.some(function (s) { return s[0] === "p"; }) ? "; isme bitişik zamir de özneye uyar." : "."));
}

var UNITS = [
// ---------------------------------------------------------------- 1 · ALTI REF ZAMİRİ
{
  id: "u1", no: 1, ar: "ضَمَائِرُ الرَّفْعِ المُتَّصِلَةُ بِالأَفْعَالِ", tr: "Altı Ref Zamiri", short: "Altı zamir", col: "ref", legend: ["ref", "mz", "mus"],
  goals: ["Fiile bitişen altı ref zamirini tanımak: تُ، ا، و، ي، نَ، نَا", "Bu zamirlerin fâil olduğunu, yani işi yapanı gösterdiğini bilmek", "Öznenin sayısına ve cinsiyetine göre doğru fiil şeklini seçmek"],
  examples: [
    { s: "هُمَا:mz / خَرَجَا:ref.ـا / قَبْلَ قَلِيلٍ:-", tr: "O ikisi az önce çıktı.", why: "ـا: ikil elifi." },
    { s: "ذَهَبْنَا:ref.نَا / إِلَى السُّوقِ:-", tr: "Çarşıya gittik.", why: "نَا: biz." },
    { s: "حَضَرْتُ:ref.ـتُ / صَبَاحًا:-", tr: "Sabah geldim.", why: "ـتُ: ben." },
    { s: "يَقْرَؤُونَ:ref.ـو / القُرْآنَ الكَرِيمَ:-", tr: "Kur'ân-ı Kerîm okuyorlar.", why: "ـو: çoğul vavı." },
    { s: "أَنْتُمْ:mz / تَكْتُبُونَ:ref.ـو / الدَّرْسَ:-", tr: "Siz dersi yazıyorsunuz.", why: "ـو: çoğul vavı." },
    { s: "الضُّيُوفُ:mus / يَجْلِسُونَ:ref.ـو", tr: "Misafirler oturuyor.", why: "İsim önde, fiil ona uyar: ـو." }
  ],
  rules: [
    { tr: "Fiilin sonuna bitişen ve işi yapanı gösteren altı zamir vardır. Bunlara <b class=\"r-ref\">ref zamirleri</b> denir." },
    { tr: "<b>Hareke alan tâ</b> (<span class=\"ar\">التَّاءُ المُتَحَرِّكَةُ</span>): ben, sen, siz. Yalnız mâzide gelir.", ex: ["كَتَبْتُ", "كَتَبْتَ", "كَتَبْتِ", "كَتَبْتُمْ"] },
    { tr: "<b>İkil elifi</b> (<span class=\"ar\">أَلِفُ الاثْنَيْنِ</span>): o ikisi, siz ikiniz.", ex: ["كَتَبَا", "يَكْتُبَانِ"] },
    { tr: "<b>Çoğul vavı</b> (<span class=\"ar\">وَاوُ الجَمَاعَةِ</span>): onlar, siz (erkek). Mâzide sonuna okunmayan bir elif yazılır.", ex: ["كَتَبُوا", "يَكْتُبُونَ"] },
    { tr: "<b>Muhataba yâsı</b> (<span class=\"ar\">يَاءُ المُخَاطَبَةِ</span>): sen (kadın). Yalnız muzâride gelir.", ex: ["تَكْتُبِينَ"] },
    { tr: "<b>Kadınlar nûnu</b> (<span class=\"ar\">نُونُ النِّسْوَةِ</span>): onlar, siz (kadınlar).", ex: ["كَتَبْنَ", "يَكْتُبْنَ"] },
    { tr: "<b>Biz nâsı</b> (<span class=\"ar\">نَا الفَاعِلِينَ</span>): biz. Önceki harf sakindir.", ex: ["كَتَبْنَا"] },
    { tr: "Bu zamirler cümlede <b>fâildir</b>; mahallen merfûdurlar (<span class=\"ar\">فِي مَحَلِّ رَفْعٍ فَاعِلٌ</span>)." }
  ],
  kaide: [
    "١ ـ ضَمَائِرُ الرَّفْعِ المُتَّصِلَةُ بِالأَفْعَالِ: التَّاءُ المُتَحَرِّكَةُ: كَتَبْتُ. أَلِفُ الاثْنَيْنِ: كَتَبَا، يَكْتُبَانِ. وَاوُ الجَمَاعَةِ: كَتَبُوا، يَكْتُبُونَ. يَاءُ المُخَاطَبَةِ: تَكْتُبِينَ. نُونُ النِّسْوَةِ: يَكْتُبْنَ، كَتَبْنَ. (نَا) الفَاعِلِينَ: كَتَبْنَا.",
    "٢ ـ إِذَا اتَّصَلَتِ الأَفْعَالُ بِضَمَائِرِ الرَّفْعِ تَكُونُ الضَّمَائِرُ فِي مَحَلِّ رَفْعٍ فَاعِلًا."
  ],
  ex: [
    { type: "classify", num: "١", opts: RZ_OPTS, ar: "عَيِّنْ ضَمَائِرَ الرَّفْعِ المُتَّصِلَةَ بِالأَفْعَالِ الصَّحِيحَةِ", tr: "Koyu yazılan fiilde hangi ref zamiri var?", exHtml: "<span class=\"ar\">الرُّكَّابُ نَزَلُوا مِنَ الطَّائِرَةِ ← وَاوُ الجَمَاعَةِ</span>", items: [
      { s: "الأُسْتَاذَانِ <b class=\"hl\">سَأَلَا</b> الطَّالِبَ عَنْ بَلَدِهِ.", a: "elif", why: "Özne ikil: سَأَلَا.", tr: "İki hoca öğrenciye memleketini sordu." },
      { s: "الزَّائِرَاتُ <b class=\"hl\">يَلْبَسْنَ</b> مَلَابِسَ نَظِيفَةً.", a: "nun", why: "Özne kadın çoğul: يَلْبَسْنَ.", tr: "Ziyaretçi kadınlar temiz elbiseler giyiyor." },
      { s: "الأَوْلَادُ <b class=\"hl\">يَسْجُدُونَ</b> لِلهِ.", a: "vav", why: "Özne erkek çoğul: يَسْجُدُونَ.", tr: "Çocuklar Allah'a secde ediyor." },
      { s: "الطَّبِيبَانِ <b class=\"hl\">قَرَآ</b> الصَّحِيفَةَ.", a: "elif", why: "قَرَأَ + ا = قَرَآ: hemze ile elif birleşip medli elif olur.", tr: "İki doktor gazeteyi okudu." },
      { s: "الحُجَّاجُ <b class=\"hl\">رَجَعُوا</b> إِلَى بِلَادِهِمْ.", a: "vav", why: "رَجَعُوا: vavdan sonraki elif okunmaz.", tr: "Hacılar memleketlerine döndü." },
      { s: "المُوَظَّفُونَ <b class=\"hl\">يَذْهَبُونَ</b> إِلَى أَعْمَالِهِمْ.", a: "vav", why: "يَذْهَبُونَ: vav zamir, nûn ref alametidir.", tr: "Memurlar işlerine gidiyor." },
      { s: "<b class=\"hl\">قَرَأْتُ</b> كِتَابًا جَدِيدًا اليَوْمَ.", a: "tu", why: "قَرَأْتُ: ötreli tâ = ben.", tr: "Bugün yeni bir kitap okudum." },
      { s: "إِنَّكِ <b class=\"hl\">تَذْهَبِينَ</b> إِلَى البَيْتِ.", a: "ya", why: "إِنَّكِ: kadına hitap → تَذْهَبِينَ.", tr: "Sen (kadın) eve gidiyorsun." }
    ]},
    { type: "pick", fill: true, num: "٢", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الفِعْلِ المُنَاسِبِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Özne ikil mi, erkek çoğul mu, kadın çoğul mu? Ona uyan fiili seç.", exHtml: "<span class=\"ar\">الوُزَرَاءُ سَافَرُوا إِلَى مِصْرَ. (سَافَرَ – سَافَرْتُ – سَافَرُوا)</span>", items: [
      { q: "العَامِلَانِ ___ عَمَلَهُمَا فِي المَصْنَعِ.", o: ["تَرَكَا", "تَرَكُوا", "تَرَكْنَ"], a: 0, tr: "İki işçi fabrikadaki işlerini bıraktı.", why: "İkil özne: elif." },
      { q: "المَنْدُوبُونَ ___ النَّدْوَةَ.", o: ["حَضَرَ", "حَضَرَا", "حَضَرُوا"], a: 2, tr: "Temsilciler seminere katıldı.", why: "Erkek çoğul özne önde: vav." },
      { q: "الوَالِدَانِ ___ طَعَامَهُمَا.", o: ["يَأْكُلُ", "يَأْكُلُونَ", "يَأْكُلَانِ"], a: 2, tr: "Anne baba yemeklerini yiyor.", why: "الوَالِدَانِ ikil: يَأْكُلَانِ." },
      { q: "المُوَظَّفُونَ ___ زِيَادَةَ الرَّاتِبِ.", o: ["طَلَبَا", "طَلَبْنَ", "طَلَبُوا"], a: 2, tr: "Memurlar maaş artışı istedi.", why: "Erkek çoğul: طَلَبُوا." },
      { q: "المُهَنْدِسُونَ ___ السَّيَّارَةَ.", o: ["رَكِبُوا", "رَكِبْنَ", "رَكِبَ"], a: 0, tr: "Mühendisler arabaya bindi.", why: "Erkek çoğul: رَكِبُوا." },
      { q: "البَنَاتُ ___ الوَالِدَ عَلَى الهَدَايَا الجَمِيلَةِ.", o: ["شَكَرَ", "شَكَرْنَ", "شَكَرُوا"], a: 1, tr: "Kızlar babaya güzel hediyeler için teşekkür etti.", why: "Kadın çoğul: nûn-ı nisve." },
      { q: "الصِّبْيَانُ ___ فِي سَاحَةِ المَلْعَبِ.", o: ["رَكَضَا", "رَكَضْنَ", "رَكَضُوا"], a: 2, tr: "Çocuklar oyun alanında koştu.", why: "الصِّبْيَانُ kırık çoğuldur (ikil değil!): رَكَضُوا." },
      { q: "الصَّحَفِيَّانِ ___ الوَزِيرَ.", o: ["اسْتَقْبَلَ", "اسْتَقْبَلُوا", "اسْتَقْبَلَا"], a: 2, tr: "İki gazeteci bakanı karşıladı.", why: "İkil: اسْتَقْبَلَا." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · MÂZİ ÇEKİMİ
{
  id: "u2", no: 2, ar: "تَصْرِيفُ الفِعْلِ المَاضِي", tr: "Mâzi Fiilin Çekimi", short: "Mâzi", col: "cerr", legend: ["mz", "ref", "sf"],
  goals: ["كَتَبَ fiilini on dört şahısta çekmek", "Hangi şekilde hangi zamirin bulunduğunu söylemek", "كَتَبَتْ'deki tâ'nın zamir olmadığını, كَتَبْتَ'deki tâ'nın zamir olduğunu ayırmak"],
  examples: [
    { s: "هُوَ:mz / كَتَبَ:sf", tr: "O yazdı.", pair: "هِيَ:mz / كَتَبَتْ:sf.ـتْ te'nîs", pairTr: "O (kadın) yazdı." },
    { s: "هُمَا:mz / كَتَبَا:ref.ـا", tr: "O ikisi yazdı.", pair: "هُمَا:mz / كَتَبَتَا:ref.ـا", pairTr: "O iki kadın yazdı." },
    { s: "هُمْ:mz / كَتَبُوا:ref.ـو", tr: "Onlar yazdı.", pair: "هُنَّ:mz / كَتَبْنَ:ref.ـنَ", pairTr: "Onlar (kadınlar) yazdı." },
    { s: "أَنْتَ:mz / كَتَبْتَ:ref.ـتَ", tr: "Sen yazdın.", pair: "أَنْتِ:mz / كَتَبْتِ:ref.ـتِ", pairTr: "Sen (kadın) yazdın." },
    { s: "أَنْتُمْ:mz / كَتَبْتُمْ:ref.ـتُ", tr: "Siz yazdınız.", pair: "أَنْتُنَّ:mz / كَتَبْتُنَّ:ref.ـتُ", pairTr: "Siz (kadınlar) yazdınız." },
    { s: "أَنَا:mz / كَتَبْتُ:ref.ـتُ", tr: "Ben yazdım.", pair: "نَحْنُ:mz / كَتَبْنَا:ref.نَا", pairTr: "Biz yazdık." }
  ],
  rules: [
    { tr: "Mâzi gövdesi hep aynıdır (<span class=\"ar\">كَتَبَ</span>); şahsı sondaki ek söyler." },
    { tr: "<b>Tâ, nûn ve nâ</b> gelince gövdenin son harfi <b>sakin</b> olur.", ex: ["كَتَبْتُ", "كَتَبْنَ", "كَتَبْنَا"] },
    { tr: "Tâ'nın harekesi şahsı gösterir: <b>ötre</b> ben, <b>üstün</b> sen (erkek), <b>esre</b> sen (kadın). <span class=\"ar\">تُمَا، تُمْ، تُنَّ</span>'de zamir yine tâdır; sonrası ikil ve çoğul işaretidir.", ex: ["كَتَبْتُ", "كَتَبْتَ", "كَتَبْتِ", "كَتَبْتُمَا", "كَتَبْتُمْ", "كَتَبْتُنَّ"] },
    { tr: "Dikkat: <span class=\"ar\">كَتَبَتْ</span> (o kadın yazdı) sondaki <b>sakin tâ</b> zamir değil, müenneslik harfidir. Zamir olan tâ hareke alır.", ex: ["كَتَبَتْ ≠ كَتَبْتَ"] },
    { tr: "<span class=\"ar\">هُوَ</span> ve <span class=\"ar\">هِيَ</span> ile fiilde görünür zamir yoktur (fâil gizlidir): <span class=\"ar\">كَتَبَ، كَتَبَتْ</span>." },
    { tr: "<b>Nûn</b> (kadınlar yazdı) ile <b>nâ</b> (biz yazdık) karıştırılmamalı.", ex: ["كَتَبْنَ", "كَتَبْنَا"] }
  ],
  kaide: ["تَصْرِيفُ الفِعْلِ المَاضِي مَعَ ضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ: الغَائِبُ: كَتَبَ، كَتَبَا، كَتَبُوا. الغَائِبَةُ: كَتَبَتْ، كَتَبَتَا، كَتَبْنَ. المُخَاطَبُ: كَتَبْتَ، كَتَبْتُمَا، كَتَبْتُمْ. المُخَاطَبَةُ: كَتَبْتِ، كَتَبْتُمَا، كَتَبْتُنَّ. المُتَكَلِّمُ: كَتَبْتُ، كَتَبْنَا."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ صَحِيحٍ", tr: "Boşluğa özneye uyan fiil şeklini seç. (Kitapta fiil serbest; burada uygun bir fiilin üç şeklinden birini seçiyorsun.)", exHtml: "<span class=\"ar\">هُنَّ يَذْهَبْنَ إِلَى المَكْتَبَةِ.</span>", items: [
      { q: "المُدَرِّسَانِ ___ الحَفْلَ الخِتَامِيَّ لِلْجَامِعَةِ.", o: ["حَضَرَا", "حَضَرُوا", "حَضَرَتْ"], a: 0, tr: "İki öğretmen üniversitenin kapanış törenine katıldı.", why: "İkil: elif." },
      { q: "النَّاشِرُونَ ___ مَجَلَّةً جَدِيدَةً.", o: ["نَشَرَا", "نَشَرُوا", "نَشَرْنَ"], a: 1, tr: "Yayıncılar yeni bir dergi yayımladı.", why: "Erkek çoğul: vav." },
      { q: "الشُّرْطِيُّونَ ___ عَلَى مَعْلُومَاتٍ جَدِيدَةٍ.", o: ["حَصَلَ", "حَصَلْنَ", "حَصَلُوا"], a: 2, tr: "Polisler yeni bilgiler elde etti.", why: "Erkek çoğul: vav." },
      { q: "الفَلَّاحُونَ ___ إِلَى بُيُوتِهِمْ.", o: ["رَجَعُوا", "رَجَعَا", "رَجَعْتُمْ"], a: 0, tr: "Çiftçiler evlerine döndü.", why: "Onlar (gâib): رَجَعُوا. رَجَعْتُمْ \"siz döndünüz\" demektir." },
      { q: "أَنْتُنَّ ___ سُورَةَ يس.", o: ["حَفِظْتُنَّ", "حَفِظْتُمْ", "حَفِظْنَ"], a: 0, tr: "Siz (kadınlar) Yâsîn sûresini ezberlediniz.", why: "أَنْتُنَّ → ـتُنَّ. حَفِظْنَ \"onlar (kadınlar)\" içindir." },
      { q: "أَنْتِ ___ مَعَ زَمِيلَاتِكِ.", o: ["دَرَسْتَ", "دَرَسْتِ", "دَرَسَتْ"], a: 1, tr: "Sen (kadın) arkadaşlarınla ders çalıştın.", why: "أَنْتِ → esreli tâ." },
      { q: "النُّوَّابُ ___ الاجْتِمَاعَ.", o: ["حَضَرْنَ", "حَضَرَا", "حَضَرُوا"], a: 2, tr: "Milletvekilleri toplantıya katıldı.", why: "النُّوَّابُ erkek kırık çoğul: vav." },
      { q: "هُمْ ___ عَلَى اليَتِيمِ.", o: ["عَطَفُوا", "عَطَفْنَا", "عَطَفْتُمْ"], a: 0, tr: "Onlar yetime şefkat gösterdi.", why: "هُمْ → ـوا." }
    ]},
    { type: "combo", num: "٦ (١)", ar: "صَرِّفِ الأَفْعَالَ الصَّحِيحَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ: iki fiili yeni özneye göre çek.", exHtml: "<span class=\"ar\">الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ.</span>", items: [
      TS("الأُسْتَاذَةُ", 3, [["f", "fth", "m"], "الكِتَابَ ثُمَّ", ["f", "qra", "m"], "الفَصْلَ الأَوَّلَ."], "Hoca hanım kitabı açtı, sonra ilk bölümü okudu.", "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ."),
      TS("الأُسْتَاذَانِ", 1, [["f", "fth", "m"], "الكِتَابَ ثُمَّ", ["f", "qra", "m"], "الفَصْلَ الأَوَّلَ."], "İki hoca kitabı açtı, sonra ilk bölümü okudu.", "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ."),
      TS("الأُسْتَاذَتَانِ", 4, [["f", "fth", "m"], "الكِتَابَ ثُمَّ", ["f", "qra", "m"], "الفَصْلَ الأَوَّلَ."], "İki hoca hanım kitabı açtı, sonra ilk bölümü okudu.", "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ."),
      TS("أَنْتَ", 6, [["f", "fth", "m"], "الكِتَابَ ثُمَّ", ["f", "qra", "m"], "الفَصْلَ الأَوَّلَ."], "Sen kitabı açtın, sonra ilk bölümü okudun.", "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ."),
      TS("نَحْنُ", 13, [["f", "fth", "m"], "الكِتَابَ ثُمَّ", ["f", "qra", "m"], "الفَصْلَ الأَوَّلَ."], "Biz kitabı açtık, sonra ilk bölümü okuduk.", "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ."),
      TS("هُمْ", 2, [["f", "fth", "m"], "الكِتَابَ ثُمَّ", ["f", "qra", "m"], "الفَصْلَ الأَوَّلَ."], "Onlar kitabı açtı, sonra ilk bölümü okudu.", "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ."),
      TS("أَنْتُمْ", 8, [["f", "fth", "m"], "الكِتَابَ ثُمَّ", ["f", "qra", "m"], "الفَصْلَ الأَوَّلَ."], "Siz kitabı açtınız, sonra ilk bölümü okudunuz.", "الأُسْتَاذُ فَتَحَ الكِتَابَ ثُمَّ قَرَأَ الفَصْلَ الأَوَّلَ.")
    ]},
    { type: "combo", num: "٦ (٢)", ar: "صَرِّفِ الأَفْعَالَ الصَّحِيحَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا: fiili ve isme bitişik zamiri yeni özneye uydur.", exHtml: "<span class=\"ar\">الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا.</span>", items: [
      TS("الطَّالِبَةُ", 3, [["f", "ktb", "m"], ["p", "وَاجِبَات", "ِ"], "."], "Kız öğrenci ödevlerini yazdı.", "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا."),
      TS("الطَّالِبُ", 0, [["f", "ktb", "m"], ["p", "وَاجِبَات", "ِ"], "."], "Öğrenci ödevlerini yazdı.", "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا."),
      TS("الطَّالِبَاتُ", 5, [["f", "ktb", "m"], ["p", "وَاجِبَات", "ِ"], "."], "Kız öğrenciler ödevlerini yazdı.", "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا."),
      TS("الطُّلَّابُ", 2, [["f", "ktb", "m"], ["p", "وَاجِبَات", "ِ"], "."], "Öğrenciler ödevlerini yazdı.", "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا."),
      TS("نَحْنُ", 13, [["f", "ktb", "m"], ["p", "وَاجِبَات", "ِ"], "."], "Biz ödevlerimizi yazdık.", "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا."),
      TS("هُمْ", 2, [["f", "ktb", "m"], ["p", "وَاجِبَات", "ِ"], "."], "Onlar ödevlerini yazdı.", "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا."),
      TS("أَنْتُمْ", 8, [["f", "ktb", "m"], ["p", "وَاجِبَات", "ِ"], "."], "Siz ödevlerinizi yazdınız.", "الطَّالِبَانِ كَتَبَا وَاجِبَاتِهِمَا.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · MUZÂRİ ÇEKİMİ
{
  id: "u3", no: 3, ar: "تَصْرِيفُ الفِعْلِ المُضَارِعِ", tr: "Muzâri Fiilin Çekimi", short: "Muzâri", col: "mz", legend: ["mz", "ref", "sf", "mus", "muz"],
  goals: ["يَكْتُبُ fiilini on dört şahısta çekmek", "Baştaki muzâri harfini (ي، ت، أ، ن) ve sondaki zamiri birlikte seçmek", "Fiil öndeyse tekil kaldığını, isim öndeyse fiilin zamirle uyduğunu bilmek"],
  examples: [
    { s: "هُوَ:mz / يَكْتُبُ:sf", tr: "O yazıyor.", pair: "هِيَ:mz / تَكْتُبُ:sf", pairTr: "O (kadın) yazıyor." },
    { s: "هُمَا:mz / يَكْتُبَانِ:ref.ـا", tr: "O ikisi yazıyor.", pair: "هُمَا:mz / تَكْتُبَانِ:ref.ـا", pairTr: "O iki kadın yazıyor." },
    { s: "هُمْ:mz / يَكْتُبُونَ:ref.ـو", tr: "Onlar yazıyor.", pair: "هُنَّ:mz / يَكْتُبْنَ:ref.ـنَ", pairTr: "Onlar (kadınlar) yazıyor." },
    { s: "أَنْتُمْ:mz / تَكْتُبُونَ:ref.ـو", tr: "Siz yazıyorsunuz.", pair: "أَنْتُنَّ:mz / تَكْتُبْنَ:ref.ـنَ", pairTr: "Siz (kadınlar) yazıyorsunuz." },
    { s: "أَنْتَ:mz / تَكْتُبُ:sf", tr: "Sen yazıyorsun.", pair: "أَنْتِ:mz / تَكْتُبِينَ:ref.ـي", pairTr: "Sen (kadın) yazıyorsun." },
    { s: "يَذْهَبُ:sf / الشَّبَابُ:muz / إِلَى المَسْجِدِ:-", tr: "Gençler mescide gidiyor.", pair: "الشَّبَابُ:mus / يَذْهَبُونَ:ref.ـو / إِلَى المَسْجِدِ:-", pairTr: "Gençler mescide gidiyor." }
  ],
  rules: [
    { tr: "Muzâride şahsı hem <b>baştaki harf</b> hem <b>sondaki zamir</b> söyler. Baştaki harfler: <span class=\"ar\">ي</span> (gâib), <span class=\"ar\">ت</span> (muhatab ve gâibe), <span class=\"ar\">أ</span> (ben), <span class=\"ar\">ن</span> (biz).", ex: ["يَكْتُبُ", "تَكْتُبُ", "أَكْتُبُ", "نَكْتُبُ"] },
    { tr: "Elif, vav ve yâ'dan sonra bir <b>nûn</b> gelir; bu nûn zamir değil, ref alametidir.", ex: ["يَكْتُبَانِ", "يَكْتُبُونَ", "تَكْتُبِينَ"] },
    { tr: "<b>Kadınlar nûnu</b> gelince son harf sakin olur: <span class=\"ar\">يَكْتُبْنَ</span> (onlar), <span class=\"ar\">تَكْتُبْنَ</span> (siz)." },
    { tr: "<span class=\"ar\">أَنَا، نَحْنُ، أَنْتَ، هُوَ، هِيَ</span> ile görünür zamir yoktur; şahsı baştaki harf gösterir. <span class=\"ar\">تَكْتُبُ</span> hem \"sen yazıyorsun\" hem \"o (kadın) yazıyor\" olabilir." },
    { tr: "<b>Fiil önde</b>, fâil açık isimse fiil <b>tekil</b> kalır. <b>İsim önde</b> (mübtedâ) ise fiil ona uyar ve zamir alır.", ex: ["يَذْهَبُ الشَّبَابُ", "الشَّبَابُ يَذْهَبُونَ", "تَكْتُبُ الطَّالِبَاتُ", "الطَّالِبَاتُ يَكْتُبْنَ"] }
  ],
  kaide: ["تَصْرِيفُ الفِعْلِ المُضَارِعِ مَعَ ضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ: الغَائِبُ: يَكْتُبُ، يَكْتُبَانِ، يَكْتُبُونَ. الغَائِبَةُ: تَكْتُبُ، تَكْتُبَانِ، يَكْتُبْنَ. المُخَاطَبُ: تَكْتُبُ، تَكْتُبَانِ، تَكْتُبُونَ. المُخَاطَبَةُ: تَكْتُبِينَ، تَكْتُبَانِ، تَكْتُبْنَ. المُتَكَلِّمُ: أَكْتُبُ، نَكْتُبُ."],
  ex: [
    { type: "combo", num: "٤", ar: "اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ", tr: "Parantezdeki kelimeyi kaldır; onun yerine fiile ref zamiri ekle.", exHtml: "<span class=\"ar\">وَصَلَ (هُمْ) قَبْلَ الظُّهْرِ ← وَصَلُوا قَبْلَ الظُّهْرِ. يَحْضُرُ (المُسَافِرُونَ) غَدًا ← يَحْضُرُونَ غَدًا.</span>", items: [
      CJ("نَزَلَ (الرَّاكِبَانِ) مِنَ الطَّائِرَةِ.", [F("nzl", "m", 1), "مِنَ الطَّائِرَةِ."], "İki yolcu uçaktan indi.", "İkil: نَزَلَا."),
      CJ("ذَهَبَ (نَحْنُ) إِلَى شَاطِئِ البَحْرِ.", [F("dhb", "m", 13), "إِلَى شَاطِئِ البَحْرِ."], "Deniz kıyısına gittik.", "نَحْنُ → ذَهَبْنَا. ذَهَبْنَ \"onlar (kadınlar) gitti\" demektir."),
      CJ("سَافَرَ (أَنَا) إِلَى المَدِينَةِ المُنَوَّرَةِ.", [F("sfr", "m", 12), "إِلَى المَدِينَةِ المُنَوَّرَةِ."], "Medine-i Münevvere'ye yolculuk ettim.", "أَنَا → ötreli tâ: سَافَرْتُ."),
      CJ("تَنْزِلُ (الطَّائِرَتَانِ) فِي أَرْضِ المَطَارِ.", [F("nzl", "u", 4), "فِي أَرْضِ المَطَارِ."], "İki uçak havaalanına iniyor.", "Müennes ikil: baştaki ت kalır, sona elif + nûn: تَنْزِلَانِ."),
      CJ("يَدْفَعُ (المُسْلِمُونَ) الزَّكَاةَ.", [F("dfc", "u", 2), "الزَّكَاةَ."], "Müslümanlar zekât veriyor.", "Erkek çoğul: يَدْفَعُونَ."),
      CJ("يَجْمَعُ (أَنْتُمْ) الأَزْهَارَ.", [F("jmc", "u", 8), "الأَزْهَارَ."], "Siz çiçekleri topluyorsunuz.", "Dikkat: أَنْتُمْ muhataptır, baştaki harf ت olur: تَجْمَعُونَ."),
      CJ("يَعْمَلُ (الخَادِمُونَ) طُولَ النَّهَارِ.", [F("cml", "u", 2), "طُولَ النَّهَارِ."], "Hizmetçiler gün boyu çalışıyor.", "Erkek çoğul: يَعْمَلُونَ."),
      CJ("ذَكَرَ (نَحْنُ) اللهَ كَثِيرًا.", [F("dhkr", "m", 13), "اللهَ كَثِيرًا."], "Allah'ı çok andık.", "نَحْنُ → ذَكَرْنَا.")
    ]},
    { type: "combo", num: "٥", ar: "حَوِّلِ الجُمَلَ الفِعْلِيَّةَ إِلَى جُمَلٍ اسْمِيَّةٍ", tr: "İsmi başa al; fiil artık ona uyup zamir alsın.", exHtml: "<span class=\"ar\">يَذْهَبُ الشَّبَابُ إِلَى المَسْجِدِ ← الشَّبَابُ يَذْهَبُونَ إِلَى المَسْجِدِ.</span>", items: [
      CJ("تَكْتُبُ الطَّالِبَاتُ الوَاجِبَاتِ المَنْزِلِيَّةَ.", ["الطَّالِبَاتُ", F("ktb", "u", 5), "الوَاجِبَاتِ المَنْزِلِيَّةَ."], "Kız öğrenciler ev ödevlerini yazıyor.", "Kadın çoğul: يَكْتُبْنَ (baştaki ت de ي olur)."),
      CJ("يُحْسِنُ المُسْلِمَانِ إِلَى الفُقَرَاءِ.", ["المُسْلِمَانِ", F("hsn", "u", 1), "إِلَى الفُقَرَاءِ."], "İki Müslüman fakirlere iyilik ediyor.", "İkil: يُحْسِنَانِ."),
      CJ("يَرْجِعُ السُّفَرَاءُ إِلَى بِلَادِهِمْ.", ["السُّفَرَاءُ", F("rjc", "u", 2), "إِلَى بِلَادِهِمْ."], "Büyükelçiler memleketlerine dönüyor.", "Erkek çoğul: يَرْجِعُونَ."),
      CJ("خَرَجَ الطُّلَّابُ مِنَ المُخْتَبَرِ.", ["الطُّلَّابُ", F("khrj", "m", 2), "مِنَ المُخْتَبَرِ."], "Öğrenciler laboratuvardan çıktı.", "Mâzi, erkek çoğul: خَرَجُوا."),
      CJ("يَدْخُلُ العُمَّالُ المَصْنَعَ.", ["العُمَّالُ", F("dkhl", "u", 2), "المَصْنَعَ."], "İşçiler fabrikaya giriyor.", "يَدْخُلُونَ."),
      CJ("حَصَلَ الفَائِزُونَ عَلَى الجَائِزَةِ.", ["الفَائِزُونَ", F("hsl", "m", 2), "عَلَى الجَائِزَةِ."], "Kazananlar ödülü aldı.", "حَصَلُوا."),
      CJ("ذَهَبَ الأَطْفَالُ إِلَى الحَدِيقَةِ الجَدِيدَةِ.", ["الأَطْفَالُ", F("dhb", "m", 2), "إِلَى الحَدِيقَةِ الجَدِيدَةِ."], "Çocuklar yeni parka gitti.", "ذَهَبُوا."),
      CJ("يَنْزِلُ السَّائِحَانِ مِنَ القِطَارِ.", ["السَّائِحَانِ", F("nzl", "u", 1), "مِنَ القِطَارِ."], "İki turist trenden iniyor.", "يَنْزِلَانِ.")
    ]},
    { type: "combo", num: "٦ (٣)", ar: "صَرِّفِ الأَفْعَالَ الصَّحِيحَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ: fiili ve isme bitişik zamiri yeni özneye uydur.", exHtml: "<span class=\"ar\">السَّائِقُ يَرْكَبُ سَيَّارَتَهُ.</span>", items: [
      TS("السَّائِقَةُ", 3, [["f", "rkb", "u"], ["p", "سَيَّارَت", "َ"], "."], "Kadın şoför arabasına biniyor.", "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ."),
      TS("المُدِيرَانِ", 1, [["f", "rkb", "u"], ["p", "سَيَّارَت", "َ"], "."], "İki müdür arabalarına biniyor.", "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ."),
      TS("المُدَرِّسَاتُ", 5, [["f", "rkb", "u"], ["p", "سَيَّارَت", "َ"], "."], "Kadın öğretmenler arabalarına biniyor.", "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ."),
      TS("المُوَظَّفُونَ", 2, [["f", "rkb", "u"], ["p", "سَيَّارَت", "َ"], "."], "Memurlar arabalarına biniyor.", "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ."),
      TS("نَحْنُ", 13, [["f", "rkb", "u"], ["p", "سَيَّارَت", "َ"], "."], "Biz arabamıza biniyoruz.", "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ."),
      TS("هُمْ", 2, [["f", "rkb", "u"], ["p", "سَيَّارَت", "َ"], "."], "Onlar arabalarına biniyor.", "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ."),
      TS("أَنْتُمْ", 8, [["f", "rkb", "u"], ["p", "سَيَّارَت", "َ"], "."], "Siz arabanıza biniyorsunuz.", "السَّائِقُ يَرْكَبُ سَيَّارَتَهُ.")
    ]},
    { type: "combo", num: "٦ (٤)", ar: "صَرِّفِ الأَفْعَالَ الصَّحِيحَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا: kesreden sonra ـهِ kuralını unutma.", exHtml: "<span class=\"ar\">المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا.</span>", items: [
      TS("الطَّالِبَةُ", 3, [["f", "rjc", "u"], "إِلَى", ["p", "بِلَاد", "ِ"], "."], "Kız öğrenci memleketine dönüyor.", "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا."),
      TS("الطَّالِبُ", 0, [["f", "rjc", "u"], "إِلَى", ["p", "بِلَاد", "ِ"], "."], "Öğrenci memleketine dönüyor.", "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا."),
      TS("الطَّالِبَاتُ", 5, [["f", "rjc", "u"], "إِلَى", ["p", "بِلَاد", "ِ"], "."], "Kız öğrenciler memleketlerine dönüyor.", "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا."),
      TS("الطُّلَّابُ", 2, [["f", "rjc", "u"], "إِلَى", ["p", "بِلَاد", "ِ"], "."], "Öğrenciler memleketlerine dönüyor.", "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا."),
      TS("نَحْنُ", 13, [["f", "rjc", "u"], "إِلَى", ["p", "بِلَاد", "ِ"], "."], "Biz memleketimize dönüyoruz.", "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا."),
      TS("هُمْ", 2, [["f", "rjc", "u"], "إِلَى", ["p", "بِلَاد", "ِ"], "."], "Onlar memleketlerine dönüyor.", "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا."),
      TS("أَنْتُمْ", 8, [["f", "rjc", "u"], "إِلَى", ["p", "بِلَاد", "ِ"], "."], "Siz memleketinize dönüyorsunuz.", "المُسَافِرَانِ يَرْجِعَانِ إِلَى بِلَادِهِمَا.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA: HADİS
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ: حَدِيثٌ قُدْسِيٌّ", tr: "Okuma: Kudsî Hadis", short: "Hadis", col: "mi", legend: ["ref", "nasb", "sf"],
  goals: ["Hadiste fiile bitişik ref zamirlerini bulmak", "Bir fiilde hem ref (fâil) hem nasb (mef'ûl) zamiri olabileceğini görmek: لَوَجَدْتَنِي", "Ref zamirini isme ve harfe bitişik zamirlerden ayırmak"],
  examples: [
    { s: "يَا ابْنَ آدَمَ:- / مَرِضْتُ:ref.ـتُ / فَلَمْ تَعُدْنِي:sf", tr: "Ey Âdemoğlu! Hastalandım da beni ziyaret etmedin.", why: "مَرِضْتُ: ben (tâ). تَعُدْنِي: fâil gizli (sen), ـنِي mef'ûl." },
    { s: "لَوْ:- / عُدْتَهُ:ref.ـتَ / لَوَجَدْتَنِي:ref.ـتَ / عِنْدَهُ:-", tr: "Onu ziyaret etseydin beni onun yanında bulurdun.", why: "Her iki fiilde ـتَ fâil (sen); ـهُ ve ـنِي mef'ûl." },
    { s: "اسْتَسْقَيْتُكَ:ref.ـتُ / فَلَمْ تَسْقِنِي:sf", tr: "Senden su istedim de bana su vermedin.", why: "اسْتَسْقَيْتُ + كَ: ـتُ fâil, ـكَ mef'ûl." }
  ],
  rules: [
    { tr: "Bir fiilde iki zamir olabilir: önce <b class=\"r-ref\">ref zamiri</b> (fâil), sonra <b class=\"r-nasb\">nasb zamiri</b> (mef'ûl).", ex: ["لَوَجَدْتَنِي = وَجَدْتَ + نِي", "اسْتَطْعَمْتُكَ = اسْتَطْعَمْتُ + كَ"] },
    { tr: "Muzâride <span class=\"ar\">أَنَا، أَنْتَ، نَحْنُ</span> için görünür zamir yoktur; fâil gizlidir.", ex: ["أَعُودُ", "تُطْعِمْنِي", "أَسْقِيكَ"] },
    { tr: "Fâil açık bir isimse fiilde ref zamiri yoktur: <span class=\"ar\">يَقُولُ اللهُ</span>. <span class=\"ar\">هُوَ</span> için de görünür zamir yoktur: <span class=\"ar\">عَبْدِي فُلَانًا مَرِضَ</span>." },
    { tr: "İsme bitişik (<span class=\"ar\">عَبْدِي، عِنْدَهُ</span>) ve harfe bitişik (<span class=\"ar\">أَنَّكَ</span>) zamirler ref zamiri değildir." }
  ],
  kaide: ["إِذَا اتَّصَلَتِ الأَفْعَالُ بِضَمَائِرِ الرَّفْعِ تَكُونُ الضَّمَائِرُ فِي مَحَلِّ رَفْعٍ فَاعِلًا، وَقَدْ يَتَّصِلُ بِالفِعْلِ بَعْدَهَا ضَمِيرُ نَصْبٍ فِي مَحَلِّ نَصْبٍ مَفْعُولًا بِهِ."],
  ex: [
    { type: "reading", num: "٧", ar: "اقْرَأِ الحَدِيثَ التَّالِيَ", tr: "Hadisi oku; Türkçesine ve sorulara bak.", title: "حَدِيثٌ قُدْسِيٌّ",
      text: "عَنْ أَبِي هُرَيْرَةَ أَنَّ رَسُولَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالَ: «يَقُولُ اللهُ عَزَّ وَجَلَّ يَوْمَ القِيَامَةِ: يَا ابْنَ آدَمَ، مَرِضْتُ فَلَمْ تَعُدْنِي (تَزُرْنِي). قَالَ: يَا رَبِّ، كَيْفَ أَعُودُكَ وَأَنْتَ رَبُّ العِزَّةِ؟ فَيَقُولُ (اللهُ عَزَّ وَجَلَّ): أَمَا عَلِمْتَ أَنَّ عَبْدِي فُلَانًا مَرِضَ فَلَمْ تَعُدْهُ، وَلَوْ عُدْتَهُ لَوَجَدْتَنِي عِنْدَهُ. وَيَقُولُ: يَا ابْنَ آدَمَ، اسْتَطْعَمْتُكَ فَلَمْ تُطْعِمْنِي. فَيَقُولُ: كَيْفَ أُطْعِمُكَ وَأَنْتَ رَبُّ العِزَّةِ؟ فَيَقُولُ: أَمَا عَلِمْتَ أَنَّ عَبْدِي فُلَانًا اسْتَطْعَمَكَ فَلَمْ تُطْعِمْهُ، أَمَا عَلِمْتَ أَنَّكَ لَوْ أَطْعَمْتَهُ لَوَجَدْتَ ذَلِكَ عِنْدِي؟ وَيَقُولُ: يَا ابْنَ آدَمَ، اسْتَسْقَيْتُكَ فَلَمْ تَسْقِنِي. فَيَقُولُ: أَيْ رَبِّ، وَكَيْفَ أَسْقِيكَ وَأَنْتَ رَبُّ العِزَّةِ؟ فَيَقُولُ: أَمَا عَلِمْتَ أَنَّ عَبْدِي فُلَانًا اسْتَسْقَاكَ فَلَمْ تَسْقِهِ، وَلَوْ سَقَيْتَهُ لَوَجَدْتَ ذَلِكَ عِنْدِي».",
      textTr: "Ebû Hüreyre'den: Resûlullah (s.a.v.) şöyle buyurdu: \"Allah Teâlâ kıyamet günü şöyle der: Ey Âdemoğlu! Hastalandım da beni ziyaret etmedin. (İnsan) der ki: Rabbim, sen izzet sahibi Rab iken seni nasıl ziyaret edebilirim? (Allah) der ki: Falan kulumun hastalandığını bilmedin mi? Onu ziyaret etmedin; onu ziyaret etseydin beni onun yanında bulurdun. Yine der ki: Ey Âdemoğlu! Senden yemek istedim de beni doyurmadın. (İnsan) der ki: Sen izzet sahibi Rab iken seni nasıl doyurabilirim? Der ki: Falan kulumun senden yemek istediğini, onu doyurmadığını bilmedin mi? Onu doyursaydın bunun karşılığını katımda bulacağını bilmez miydin? Yine der ki: Ey Âdemoğlu! Senden su istedim de bana su vermedin. (İnsan) der ki: Rabbim, sen izzet sahibi Rab iken sana nasıl su verebilirim? Der ki: Falan kulumun senden su istediğini, ona su vermediğini bilmedin mi? Ona su verseydin bunun karşılığını katımda bulurdun.\"",
      qa: [
        { q: "مَنْ مَرِضَ فِي الحَدِيثِ؟", a: "مَرِضَ عَبْدٌ مِنْ عِبَادِ اللهِ.", tr: "Hadiste kim hastalandı? Allah'ın kullarından biri." },
        { q: "أَيْنَ يَجِدُ الإِنْسَانُ اللهَ إِذَا عَادَ المَرِيضَ؟", a: "يَجِدُهُ عِنْدَ المَرِيضِ.", tr: "İnsan hastayı ziyaret edince Allah'ı nerede bulur? Hastanın yanında." },
        { q: "مَا الأَعْمَالُ الثَّلَاثَةُ فِي الحَدِيثِ؟", a: "عِيَادَةُ المَرِيضِ، وَإِطْعَامُ الجَائِعِ، وَسَقْيُ العَطْشَانِ.", tr: "Hadisteki üç amel nedir? Hastayı ziyaret, açı doyurmak, susuza su vermek." }
      ]
    },
    { type: "find", target: "y", num: "٧", ar: "عَيِّنْ فِي الحَدِيثِ ضَمَائِرَ الرَّفْعِ المُتَّصِلَةَ بِالفِعْلِ", tr: "Görünür bir ref zamiri (fâil) taşıyan fiillere dokun. Fâili gizli olan fiiller (تَعُدْنِي، أَعُودُ) ve fâili açık isim olan fiiller (مَرِضَ عَبْدِي) hedef değil.", items: [
      W("يَقُولُ اللهُ عَزَّ وَجَلَّ يَوْمَ القِيَامَةِ: يَا ابْنَ آدَمَ، [مَرِضْتُ] فَلَمْ تَعُدْنِي.", "Allah kıyamet günü der ki: Ey Âdemoğlu! Hastalandım da beni ziyaret etmedin.", "مَرِضْتُ: ـتُ (ben). يَقُولُ'un fâili açık isim (اللهُ); تَعُدْنِي'de fâil gizli (sen), ـنِي mef'ûl."),
      W("قَالَ: يَا رَبِّ، كَيْفَ أَعُودُكَ وَأَنْتَ رَبُّ العِزَّةِ؟", "Rabbim, sen izzet sahibi Rab iken seni nasıl ziyaret edebilirim?", "Görünür ref zamiri yok: قَالَ ve أَعُودُ'da fâil gizli; ـكَ mef'ûl; أَنْتَ munfasıl."),
      W("فَيَقُولُ: أَمَا [عَلِمْتَ] أَنَّ عَبْدِي فُلَانًا مَرِضَ فَلَمْ تَعُدْهُ،", "Falan kulumun hastalandığını bilmedin mi? Onu ziyaret etmedin.", "عَلِمْتَ: ـتَ (sen). مَرِضَ ve تَعُدْهُ'da fâil gizli; عَبْدِي'deki ـي isme bitişik."),
      W("وَلَوْ [عُدْتَهُ] [لَوَجَدْتَنِي] عِنْدَهُ.", "Onu ziyaret etseydin beni onun yanında bulurdun.", "İki fiilde de ـتَ (sen) fâil; ـهُ ve ـنِي mef'ûl. عِنْدَهُ isme bitişik."),
      W("وَيَقُولُ: يَا ابْنَ آدَمَ، [اسْتَطْعَمْتُكَ] فَلَمْ تُطْعِمْنِي.", "Ey Âdemoğlu! Senden yemek istedim de beni doyurmadın.", "اسْتَطْعَمْتُ + كَ: ـتُ fâil, ـكَ mef'ûl."),
      W("فَيَقُولُ: كَيْفَ أُطْعِمُكَ وَأَنْتَ رَبُّ العِزَّةِ؟", "Sen izzet sahibi Rab iken seni nasıl doyurabilirim?", "Görünür ref zamiri yok: أُطْعِمُ'da fâil gizli (ben)."),
      W("فَيَقُولُ: أَمَا [عَلِمْتَ] أَنَّ عَبْدِي فُلَانًا اسْتَطْعَمَكَ فَلَمْ تُطْعِمْهُ،", "Falan kulumun senden yemek istediğini, onu doyurmadığını bilmedin mi?", "عَلِمْتَ: ـتَ. اسْتَطْعَمَكَ'da fâil gizli (o), ـكَ mef'ûl."),
      W("أَمَا [عَلِمْتَ] أَنَّكَ لَوْ [أَطْعَمْتَهُ] [لَوَجَدْتَ] ذَلِكَ عِنْدِي؟", "Onu doyursaydın bunu katımda bulacağını bilmez miydin?", "ـتَ (sen) üç fiilde. أَنَّكَ harfe, عِنْدِي isme bitişik."),
      W("وَيَقُولُ: يَا ابْنَ آدَمَ، [اسْتَسْقَيْتُكَ] فَلَمْ تَسْقِنِي.", "Ey Âdemoğlu! Senden su istedim de bana su vermedin.", "اسْتَسْقَيْتُ + كَ: ـتُ fâil."),
      W("فَيَقُولُ: أَيْ رَبِّ، وَكَيْفَ أَسْقِيكَ وَأَنْتَ رَبُّ العِزَّةِ؟", "Rabbim, sen izzet sahibi Rab iken sana nasıl su verebilirim?", "Görünür ref zamiri yok."),
      W("فَيَقُولُ: أَمَا [عَلِمْتَ] أَنَّ عَبْدِي فُلَانًا اسْتَسْقَاكَ فَلَمْ تَسْقِهِ، وَلَوْ [سَقَيْتَهُ] [لَوَجَدْتَ] ذَلِكَ عِنْدِي.", "Falan kulumun senden su istediğini, ona su vermediğini bilmedin mi? Ona su verseydin bunu katımda bulurdun.", "عَلِمْتَ، سَقَيْتَهُ، لَوَجَدْتَ: ـتَ. اسْتَسْقَاكَ'da fâil gizli.")
    ]},
    { type: "classify", num: "٧ (ب)", extra: true, opts: Z4_OPTS, ar: "مَا نَوْعُ الضَّمِيرِ؟", tr: "Kitap \"fiile ve isme bitişik\" diyor: parantezdeki zamir fâil mi, mef'ûl mü, isme mi, harfe mi bitişik?", items: [
      { s: "<b class=\"hl\">مَرِضْتُ</b> <span class=\"muted\">(ـتُ)</span>", a: "ref", why: "Hastalanan ben: fâil." },
      { s: "فَلَمْ <b class=\"hl\">تَعُدْنِي</b> <span class=\"muted\">(ـنِي)</span>", a: "nasb", why: "beni: mef'ûl." },
      { s: "كَيْفَ <b class=\"hl\">أَعُودُكَ</b> <span class=\"muted\">(ـكَ)</span>", a: "nasb", why: "seni: mef'ûl." },
      { s: "أَنَّ <b class=\"hl\">عَبْدِي</b> فُلَانًا <span class=\"muted\">(ـي)</span>", a: "isim", why: "kulum: isme bitişik." },
      { s: "<b class=\"hl\">عُدْتَهُ</b> <span class=\"muted\">(ـتَ)</span>", a: "ref", why: "ziyaret eden sen: fâil." },
      { s: "<b class=\"hl\">عُدْتَهُ</b> <span class=\"muted\">(ـهُ)</span>", a: "nasb", why: "onu: mef'ûl." },
      { s: "<b class=\"hl\">لَوَجَدْتَنِي</b> <span class=\"muted\">(ـنِي)</span>", a: "nasb", why: "beni: mef'ûl. ـتَ ise fâil." },
      { s: "لَوَجَدْتَنِي <b class=\"hl\">عِنْدَهُ</b> <span class=\"muted\">(ـهُ)</span>", a: "isim", why: "عِنْدَ bir isimdir (zarf)." },
      { s: "أَمَا عَلِمْتَ <b class=\"hl\">أَنَّكَ</b> <span class=\"muted\">(ـكَ)</span>", a: "harf", why: "أَنَّ harfine bitişik." },
      { s: "<b class=\"hl\">اسْتَطْعَمْتُكَ</b> <span class=\"muted\">(ـتُ)</span>", a: "ref", why: "isteyen ben: fâil." },
      { s: "<b class=\"hl\">أَطْعَمْتَهُ</b> <span class=\"muted\">(ـتَ)</span>", a: "ref", why: "doyuran sen: fâil." },
      { s: "ذَلِكَ <b class=\"hl\">عِنْدِي</b> <span class=\"muted\">(ـي)</span>", a: "isim", why: "katımda: isme bitişik." },
      { s: "عَبْدِي فُلَانًا <b class=\"hl\">اسْتَسْقَاكَ</b> <span class=\"muted\">(ـكَ)</span>", a: "nasb", why: "senden (su istedi): mef'ûl." },
      { s: "فَلَمْ <b class=\"hl\">تَسْقِهِ</b> <span class=\"muted\">(ـهِ)</span>", a: "nasb", why: "ona: mef'ûl." }
    ]}
  ]
}
];

// Doğru Çekim oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var RZ_POOL = [
  ["الأُسْتَاذَانِ {سَأَلَا} الطَّالِبَ.", ["سَأَلَا", "سَأَلُوا", "سَأَلْنَ"], "ikil özne → elif", "İki hoca öğrenciye sordu.", "u1"],
  ["الزَّائِرَاتُ {يَلْبَسْنَ} مَلَابِسَ نَظِيفَةً.", ["يَلْبَسْنَ", "يَلْبَسُونَ", "تَلْبَسُ"], "kadın çoğul → nûn-ı nisve", "Ziyaretçi kadınlar temiz elbise giyiyor.", "u1"],
  ["الأَوْلَادُ {يَسْجُدُونَ} لِلهِ.", ["يَسْجُدُونَ", "يَسْجُدَانِ", "يَسْجُدْنَ"], "erkek çoğul → vav", "Çocuklar Allah'a secde ediyor.", "u1"],
  ["إِنَّكِ {تَذْهَبِينَ} إِلَى البَيْتِ.", ["تَذْهَبِينَ", "تَذْهَبُ", "تَذْهَبْنَ"], "kadına hitap → yâ", "Sen (kadın) eve gidiyorsun.", "u1"],
  ["{قَرَأْتُ} كِتَابًا جَدِيدًا اليَوْمَ.", ["قَرَأْتُ", "قَرَأَتْ", "قَرَأْنَ"], "ben → ötreli tâ", "Bugün yeni bir kitap okudum.", "u1"],
  ["{ذَهَبْنَا} إِلَى السُّوقِ.", ["ذَهَبْنَا", "ذَهَبْنَ", "ذَهَبُوا"], "biz → nâ", "Çarşıya gittik.", "u1"],
  ["العَامِلَانِ {تَرَكَا} عَمَلَهُمَا.", ["تَرَكَا", "تَرَكُوا", "تَرَكْنَ"], "ikil → elif", "İki işçi işlerini bıraktı.", "u2"],
  ["البَنَاتُ {شَكَرْنَ} الوَالِدَ.", ["شَكَرْنَ", "شَكَرُوا", "شَكَرَتْ"], "kadın çoğul → nûn", "Kızlar babaya teşekkür etti.", "u2"],
  ["الصِّبْيَانُ {رَكَضُوا} فِي المَلْعَبِ.", ["رَكَضُوا", "رَكَضَا", "رَكَضْنَ"], "kırık çoğul, erkek → vav", "Çocuklar oyun alanında koştu.", "u2"],
  ["يَا أَحْمَدُ، هَلْ {كَتَبْتَ} الدَّرْسَ؟", ["كَتَبْتَ", "كَتَبْتِ", "كَتَبْتُ"], "Ahmed'e hitap → üstünlü tâ", "Ahmed, dersi yazdın mı?", "u2"],
  ["يَا فَاطِمَةُ، هَلْ {فَهِمْتِ} الدَّرْسَ؟", ["فَهِمْتِ", "فَهِمْتَ", "فَهِمَتْ"], "Fâtıma'ya hitap → esreli tâ", "Fâtıma, dersi anladın mı?", "u2"],
  ["أَنْتُنَّ {حَضَرْتُنَّ} مُبَكِّرَاتٍ.", ["حَضَرْتُنَّ", "حَضَرْتُمْ", "حَضَرْنَ"], "أَنْتُنَّ → ـتُنَّ", "Siz (kadınlar) erken geldiniz.", "u2"],
  ["الطَّالِبَتَانِ {نَجَحَتَا} فِي الامْتِحَانِ.", ["نَجَحَتَا", "نَجَحَا", "نَجَحْنَ"], "müennes ikil: te'nîs tâsı + elif", "İki kız öğrenci sınavı geçti.", "u2"],
  ["هِيَ {خَرَجَتْ} مِنَ البَيْتِ.", ["خَرَجَتْ", "خَرَجْتَ", "خَرَجْنَ"], "هِيَ: sakin tâ (zamir değil)", "O (kadın) evden çıktı.", "u2"],
  ["أَنْتُمْ {تَجْمَعُونَ} الأَزْهَارَ.", ["تَجْمَعُونَ", "يَجْمَعُونَ", "تَجْمَعْنَ"], "أَنْتُمْ: ت + vav", "Siz çiçekleri topluyorsunuz.", "u3"],
  ["الطَّائِرَتَانِ {تَنْزِلَانِ} فِي المَطَارِ.", ["تَنْزِلَانِ", "يَنْزِلَانِ", "تَنْزِلْنَ"], "müennes ikil: ت + elif", "İki uçak havaalanına iniyor.", "u3"],
  ["{يَدْخُلُ} العُمَّالُ المَصْنَعَ.", ["يَدْخُلُ", "يَدْخُلُونَ", "يَدْخُلَانِ"], "fiil önde → tekil kalır", "İşçiler fabrikaya giriyor.", "u3"],
  ["العُمَّالُ {يَدْخُلُونَ} المَصْنَعَ.", ["يَدْخُلُونَ", "يَدْخُلُ", "تَدْخُلُونَ"], "isim önde → fiil zamirle uyar", "İşçiler fabrikaya giriyor.", "u3"],
  ["أَنْتِ {تَدْرُسِينَ} مَعَ زَمِيلَاتِكِ.", ["تَدْرُسِينَ", "تَدْرُسُ", "تَدْرُسْنَ"], "أَنْتِ → yâ", "Sen (kadın) arkadaşlarınla ders çalışıyorsun.", "u3"],
  ["البَنَاتُ {يَرْجِعْنَ} إِلَى البَيْتِ.", ["يَرْجِعْنَ", "تَرْجِعْنَ", "يَرْجِعُونَ"], "gâibe çoğul: ي + nûn", "Kızlar eve dönüyor.", "u3"],
  ["نَحْنُ {نَرْكَبُ} سَيَّارَتَنَا.", ["نَرْكَبُ", "أَرْكَبُ", "يَرْكَبُونَ"], "نَحْنُ: baştaki ن", "Biz arabamıza biniyoruz.", "u3"],
  ["يَا ابْنَ آدَمَ، {مَرِضْتُ} فَلَمْ تَعُدْنِي.", ["مَرِضْتُ", "مَرِضْتَ", "مَرِضَتْ"], "Allah \"ben\" diyor → ـتُ", "Ey Âdemoğlu, hastalandım da beni ziyaret etmedin.", "u4"],
  ["أَمَا {عَلِمْتَ} أَنَّ عَبْدِي فُلَانًا مَرِضَ؟", ["عَلِمْتَ", "عَلِمْتُ", "عَلِمْتِ"], "insana hitap → ـتَ", "Falan kulumun hastalandığını bilmedin mi?", "u4"],
  ["لَوْ {عُدْتَهُ} لَوَجَدْتَنِي عِنْدَهُ.", ["عُدْتَهُ", "عُدْتُهُ", "عَادَهُ"], "sen ziyaret etseydin → ـتَ + ـهُ", "Onu ziyaret etseydin beni yanında bulurdun.", "u4"],
  ["يَا ابْنَ آدَمَ، {اسْتَطْعَمْتُكَ} فَلَمْ تُطْعِمْنِي.", ["اسْتَطْعَمْتُكَ", "اسْتَطْعَمْتَكَ", "اسْتَطْعَمَكَ"], "isteyen ben → ـتُ + ـكَ", "Ey Âdemoğlu, senden yemek istedim de beni doyurmadın.", "u4"],
  ["لَوْ {سَقَيْتَهُ} لَوَجَدْتَ ذَلِكَ عِنْدِي.", ["سَقَيْتَهُ", "سَقَيْتُهُ", "سَقَاهُ"], "sen su verseydin → ـتَ + ـهُ", "Ona su verseydin bunu katımda bulurdun.", "u4"]
];
var HAFIZA = {
  mazi: { name: "Zamir ↔ mâzi", pairs: [["هُوَ", "كَتَبَ"], ["هُمَا", "كَتَبَا"], ["هُمْ", "كَتَبُوا"], ["هِيَ", "كَتَبَتْ"], ["هُنَّ", "كَتَبْنَ"], ["أَنْتَ", "كَتَبْتَ"], ["أَنْتُمَا", "كَتَبْتُمَا"], ["أَنْتُمْ", "كَتَبْتُمْ"], ["أَنْتِ", "كَتَبْتِ"], ["أَنْتُنَّ", "كَتَبْتُنَّ"], ["أَنَا", "كَتَبْتُ"], ["نَحْنُ", "كَتَبْنَا"]] },
  muzari: { name: "Zamir ↔ muzâri", pairs: [["هُوَ", "يَكْتُبُ"], ["هُمَا", "يَكْتُبَانِ"], ["هُمْ", "يَكْتُبُونَ"], ["هُنَّ", "يَكْتُبْنَ"], ["أَنْتَ", "تَكْتُبُ"], ["أَنْتُمَا", "تَكْتُبَانِ"], ["أَنْتُمْ", "تَكْتُبُونَ"], ["أَنْتِ", "تَكْتُبِينَ"], ["أَنْتُنَّ", "تَكْتُبْنَ"], ["أَنَا", "أَكْتُبُ"], ["نَحْنُ", "نَكْتُبُ"]] },
  ad: { name: "Zamir ↔ adı", pairs: [["كَتَبْتُ", "التَّاءُ المُتَحَرِّكَةُ"], ["كَتَبَا", "أَلِفُ الاثْنَيْنِ"], ["كَتَبُوا", "وَاوُ الجَمَاعَةِ"], ["تَكْتُبِينَ", "يَاءُ المُخَاطَبَةِ"], ["كَتَبْنَ", "نُونُ النِّسْوَةِ"], ["كَتَبْنَا", "نَا الفَاعِلِينَ"]] }
};
var KARTLAR = [
  ["Fiile bitişen ref zamirleri kaç tane?", "Altı: تُ (tâ), ا (elif), و (vav), ي (yâ), نَ (nûn), نَا"],
  ["Ref zamirinin cümledeki görevi?", "Fâil; mahallen merfû: كَتَبُوا (onlar yazdı)."],
  ["Tâ'nın harekeleri ne söyler?", "كَتَبْتُ ben · كَتَبْتَ sen (erkek) · كَتَبْتِ sen (kadın)"],
  ["كَتَبَتْ ile كَتَبْتَ farkı?", "كَتَبَتْ: o (kadın) yazdı; sakin tâ zamir değil. كَتَبْتَ: sen yazdın; tâ fâil zamiri."],
  ["كَتَبْنَ ile كَتَبْنَا farkı?", "كَتَبْنَ: onlar (kadınlar) yazdı. كَتَبْنَا: biz yazdık."],
  ["Muhataba yâsı hangi zamanda gelir?", "Yalnız muzâride: تَكْتُبِينَ (sen yazıyorsun, kadın)."],
  ["يَكْتُبُونَ'daki nûn zamir mi?", "Hayır. Zamir vavdır; nûn ref alametidir."],
  ["Muzârinin baştaki harfleri?", "ي (gâib) · ت (muhatab, gâibe) · أ (ben) · ن (biz)"],
  ["تَكْتُبُ kimdir?", "İki ihtimal: أَنْتَ تَكْتُبُ (sen) ya da هِيَ تَكْتُبُ (o, kadın)."],
  ["Fiil öndeyse?", "Tekil kalır: يَذْهَبُ الشَّبَابُ. İsim öndeyse fiil uyar: الشَّبَابُ يَذْهَبُونَ."],
  ["كَتَبُوا'daki elif?", "Okunmaz; çoğul vavından sonra yazılır (elif-i fâriqa)."],
  ["لَوَجَدْتَنِي'de kaç zamir var?", "İki: ـتَ (sen buldun: fâil) + ـنِي (beni: mef'ûl)."]
];
