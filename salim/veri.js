// ================= VERİ: Sâlim Fiil ve Çekimi (الفِعْلُ السَّالِمُ وَتَصْرِيفُهُ) =================
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
// sâlim fiiller (bu ders için)
[["fhm", "فَهِم", "فْهَم", "anlamak"], ["nzr", "نَظَر", "نْظُر", "bakmak"], ["clm", "عَلِم", "عْلَم", "bilmek"], ["trk", "تَرَك", "تْرُك", "bırakmak"], ["tlb", "طَلَب", "طْلُب", "istemek"], ["shkr", "شَكَر", "شْكُر", "teşekkür etmek"], ["lcb", "لَعِب", "لْعَب", "oynamak"], ["smc", "سَمِع", "سْمَع", "işitmek"], ["shrh", "شَرَح", "شْرَح", "açıklamak"], ["hbt", "هَبَط", "هْبِط", "inmek"], ["hfz", "حَفِظ", "حْفَظ", "ezberlemek"], ["sjd", "سَجَد", "سْجُد", "secde etmek"], ["nsr", "نَصَر", "نْصُر", "yardım etmek"], ["ghsl", "غَسَل", "غْسِل", "yıkamak"], ["shcr", "شَعَر", "شْعُر", "hissetmek"]].forEach(function (x) { V[x[0]] = { m: x[1], u: x[2], p: "َ", tr: x[3] }; });
var MAK_V = ["nsr", "ktb", "jls", "nzr", "fth", "shrb", "clm", "dkhl"];
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

function PK(q, o, tr, why, k) { var r = o.slice(), a = (k || 0) % o.length; var c = r.splice(0, 1)[0]; r.splice(a, 0, c); return { q: q, o: r, a: a, tr: tr, why: why }; }
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
// tablo doldurma: her satır bir şahıs, her sütun bir fiil; verilen hücre sabit
function TBL(mode, verbs, given) {
  return CELLS.map(function (c, ci) {
    return CJ('<b>' + c[3] + '</b> <span class="muted">(' + c[2] + ')</span>', [].concat.apply([], verbs.map(function (vk, j) { return ['<small class="tlab">' + cjText(vk, mode, 0) + '</small>', given[j] === ci ? '<b>' + cjText(vk, mode, ci) + '</b>' : F(vk, mode, ci)]; })),
      c[3] + ": " + verbs.map(function (vk) { return cjText(vk, mode, ci); }).join(" · "),
      cjZ(mode, ci) ? "Ref zamiri: " + RZ_BY[cjZ(mode, ci)][2] + "." : "Görünür zamir yok; fâil gizli (" + c[3] + ").");
  });
}
var SL_OPTS = [["s", "Sâlim", "سَالِمٌ", "x"], ["i", "İlletli (و ا ي)", "مُعْتَلٌّ", "x"], ["h", "Hemzeli", "مَهْمُوزٌ", "x"], ["m", "Muzâaf (iki aynı harf)", "مُضَعَّفٌ", "x"]];
var SL_TR = { s: "Sâlim", i: "İlletli", h: "Hemzeli", m: "Muzâaf" };

var UNITS = [
// ---------------------------------------------------------------- 1 · SÂLİM FİİL
{
  id: "u1", no: 1, ar: "الفِعْلُ السَّالِمُ", tr: "Sâlim Fiil Nedir?", short: "Sâlim fiil", col: "ref", legend: ["ref", "sf", "mz"],
  goals: ["Sâlim fiili tanımak: kök harflerinde illet harfi, hemze ya da iki aynı harf yok", "Sâlim fiile ref zamiri gelince fiilin değişmediğini görmek", "Fiildeki ref zamirini bulmak ve özneye uyan şekli seçmek"],
  examples: [
    { s: "فَهِمْتُمُ:ref.ـتُمْ / الدَّرْسَ:-", tr: "Dersi anladınız." },
    { s: "خَرَجْتُ:ref.ـتُ / مِنَ البَيْتِ:-", tr: "Evden çıktım." },
    { s: "حَضَرَ:sf / عَلِيٌّ:muz / صَبَاحًا:-", tr: "Ali sabah geldi." },
    { s: "سَمِعُوا:ref.ـو / الأَذَانَ:-", tr: "Ezanı duydular." },
    { s: "ذَهَبَا:ref.ـا / إِلَى المَسْجِدِ:-", tr: "O ikisi mescide gitti." },
    { s: "هَبَطَتِ:sf.ـتْ te'nîs / الطَّائِرَةُ:muz / قَبْلَ قَلِيلٍ:-", tr: "Uçak az önce indi." }
  ],
  rules: [
    { tr: "<b class=\"r-ref\">Sâlim fiil</b>: kök harfleri arasında <b>illet harfi</b> (<span class=\"ar\">و، ا، ي</span>), <b>hemze</b> ya da <b>iki aynı harf</b> bulunmayan fiil.", ex: ["نَصَرَ", "كَتَبَ", "فَتَحَ"] },
    { tr: "Sâlim olmayanlar: illetli (<span class=\"ar\">قَالَ، وَعَدَ، رَمَى</span>), hemzeli (<span class=\"ar\">أَخَذَ، سَأَلَ، قَرَأَ</span>), muzâaf (<span class=\"ar\">مَدَّ، شَدَّ</span>)." },
    { tr: "Sâlim fiile ref zamiri gelince kök harflerinde <b>hiçbir değişiklik olmaz</b>; yalnız sona ek gelir.", ex: ["سَجَدْتُ", "سَجَدَا", "سَجَدُوا", "سَجَدْنَ", "سَجَدْنَا", "يَسْجُدَانِ", "يَسْجُدُونَ", "يَسْجُدْنَ", "تَسْجُدِينَ"] },
    { tr: "Ref zamirleri: <span class=\"ar\">تُ، ا، و، ي، نَ، نَا</span>. Sakin <span class=\"ar\">ـتْ</span> (<span class=\"ar\">هَبَطَتْ</span>) zamir değil, müenneslik harfidir." }
  ],
  kaide: [
    "١ ـ الفِعْلُ السَّالِمُ: هُوَ مَا لَا يُوجَدُ بَيْنَ حُرُوفِهِ الأَصْلِيَّةِ حَرْفٌ مِنْ حُرُوفِ العِلَّةِ وَلَا هَمْزَةٌ، وَلَا حَرْفَانِ مِنْ جِنْسٍ وَاحِدٍ، مِثْلُ: نَصَرَ، كَتَبَ، فَتَحَ.",
    "٢ ـ إِذَا أُسْنِدَ الفِعْلُ السَّالِمُ إِلَى ضَمَائِرِ الرَّفْعِ لَمْ يُحْدِثْ هَذَا الإِسْنَادُ فِيهِ تَغْيِيرًا، مِثْلُ: سَجَدْتُ، سَجَدَا، سَجَدُوا، سَجَدْنَ، سَجَدْنَا، يَسْجُدَانِ، يَسْجُدُونَ، يَسْجُدْنَ، تَسْجُدِينَ."
  ],
  ex: [
    { type: "classify", extra: true, opts: SL_OPTS, ar: "سَالِمٌ أَمْ لَا؟", tr: "Fiil sâlim mi? Değilse neden: illet harfi mi, hemze mi, iki aynı harf mi?", items: [
      { s: "نَصَرَ", a: "s", why: "ن ص ر: üçü de sağlam." }, { s: "قَالَ", a: "i", why: "Ortadaki elif aslında و'dır (ق و ل)." }, { s: "أَخَذَ", a: "h", why: "İlk harf hemze." },
      { s: "مَدَّ", a: "m", why: "م د د: iki aynı harf." }, { s: "كَتَبَ", a: "s", why: "Sağlam." }, { s: "وَعَدَ", a: "i", why: "İlk harf و." },
      { s: "رَمَى", a: "i", why: "Son harf ي (ى)." }, { s: "سَأَلَ", a: "h", why: "Ortadaki harf hemze." }, { s: "فَتَحَ", a: "s", why: "Sağlam." },
      { s: "شَدَّ", a: "m", why: "ش د د." }, { s: "قَرَأَ", a: "h", why: "Son harf hemze." }, { s: "جَلَسَ", a: "s", why: "Sağlam." }
    ]},
    { type: "classify", num: "١", opts: RZ_OPTS.concat([["yok", "Zamir yok (ـتْ müenneslik)", "تَاءُ التَّأْنِيثِ", "x"]]), ar: "عَيِّنْ ضَمَائِرَ الرَّفْعِ المُتَّصِلَةَ بِالأَفْعَالِ السَّالِمَةِ", tr: "Koyu yazılan sâlim fiildeki ref zamiri hangisi?", exHtml: "<span class=\"ar\">شَرِبْتُ القَهْوَةَ بِالحَلِيبِ ← التَّاءُ المُتَحَرِّكَةُ</span>", items: [
      { s: "الصَّحَابَةُ <b class=\"hl\">كَتَبُوا</b> أَحَادِيثَ الرَّسُولِ ﷺ.", a: "vav", why: "كَتَبُوا: çoğul vavı.", tr: "Sahâbe Resûlullah'ın hadislerini yazdı." },
      { s: "الطَّالِبَانِ <b class=\"hl\">كَتَبَا</b> الأَجْوِبَةَ.", a: "elif", why: "İkil elifi.", tr: "İki öğrenci cevapları yazdı." },
      { s: "السُّيَّاحُ <b class=\"hl\">يَدْخُلُونَ</b> المَتْحَفَ الآنَ.", a: "vav", why: "يَدْخُلُونَ: vav zamir, nûn ref alameti.", tr: "Turistler şimdi müzeye giriyor." },
      { s: "الطَّبِيبَتَانِ <b class=\"hl\">خَرَجَتَا</b> مِنَ المُسْتَشْفَى.", a: "elif", why: "خَرَجَتَا: ت müenneslik, ا zamir.", tr: "İki kadın doktor hastaneden çıktı." },
      { s: "الأَصْدِقَاءُ <b class=\"hl\">رَجَعُوا</b> مِنَ المَدِينَةِ المُنَوَّرَةِ.", a: "vav", why: "Çoğul vavı.", tr: "Arkadaşlar Medine'den döndü." },
      { s: "النِّسَاءُ <b class=\"hl\">يَذْهَبْنَ</b> إِلَى السُّوقِ.", a: "nun", why: "Kadınlar nûnu.", tr: "Kadınlar çarşıya gidiyor." },
      { s: "المَرْأَةُ <b class=\"hl\">شَعَرَتْ</b> بِأَلَمٍ فِي بَطْنِهَا.", a: "yok", why: "Sakin ـتْ müenneslik harfidir; fâil المَرْأَةُ'ya dönen gizli zamir.", tr: "Kadın karnında bir ağrı hissetti." },
      { s: "هَلْ <b class=\"hl\">تَذْهَبِينَ</b> إِلَى المَكْتَبَةِ؟", a: "ya", why: "Muhataba yâsı.", tr: "Kütüphaneye gidiyor musun (kadın)?" }
    ]},
    { type: "pick", fill: true, num: "٢", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الفِعْلِ المُنَاسِبِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Özneye uyan fiili seç.", exHtml: "<span class=\"ar\">المُدَرِّسُونَ يَشْرَحُونَ المَوْضُوعَ. (يَشْرَحُ – يَشْرَحُونَ – تَشْرَحُ)</span>", items: [
      { q: "المُوَظَّفَانِ ___ عَمَلَهُمَا فِي الشَّرِكَةِ.", o: ["تَرَكَا", "تَرَكُوا", "تَرَكْنَ"], a: 0, tr: "İki memur şirketteki işlerini bıraktı.", why: "İkil: elif." },
      { q: "الطَّالِبَاتُ ___ الدَّرْسَ.", o: ["فَهِمُوا", "فَهِمْتُنَّ", "فَهِمْنَ"], a: 2, tr: "Kız öğrenciler dersi anladı.", why: "Gâibe çoğul: فَهِمْنَ. فَهِمْتُنَّ \"siz anladınız\" demek." },
      { q: "المَرْضَى ___ طَعَامَهُمْ.", o: ["يَأْكُلُ", "يَأْكُلُونَ", "يَأْكُلَانِ"], a: 1, tr: "Hastalar yemeklerini yiyor.", why: "المَرْضَى (insan, çoğul) → يَأْكُلُونَ. (أَكَلَ hemzeli olsa da çekimi aynı.)" },
      { q: "العُمَّالُ ___ زِيَادَةَ الرَّاتِبِ.", o: ["يَطْلُبَانِ", "يَطْلُبُونَ", "يَطْلُبْنَ"], a: 1, tr: "İşçiler maaş artışı istiyor.", why: "Erkek çoğul." },
      { q: "الضُّيُوفُ ___ الحَافِلَةَ.", o: ["رَكِبُوا", "رَكِبْنَ", "رَكِبَ"], a: 0, tr: "Misafirler otobüse bindi.", why: "Erkek çoğul." },
      { q: "الطَّالِبَانِ ___ الأُسْتَاذَ عَلَى الكُتُبِ.", o: ["شَكَرُوا", "شَكَرْنَ", "شَكَرَا"], a: 2, tr: "İki öğrenci hocaya kitaplar için teşekkür etti.", why: "İkil." },
      { q: "الصِّبْيَانُ ___ فِي سَاحَةِ المَلْعَبِ.", o: ["يَلْعَبَانِ", "يَلْعَبُونَ", "يَلْعَبْنَ"], a: 1, tr: "Çocuklar oyun alanında oynuyor.", why: "الصِّبْيَانُ kırık çoğul (ikil değil)." },
      { q: "المُدَرِّسَاتُ ___ الخَبَرَ.", o: ["سَمِعْنَ", "سَمِعُوا", "سَمِعْتُمْ"], a: 0, tr: "Kadın öğretmenler haberi duydu.", why: "Gâibe çoğul: nûn." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · MÂZİ
{
  id: "u2", no: 2, ar: "تَصْرِيفُ الفِعْلِ السَّالِمِ المَاضِي", tr: "Sâlim Mâzinin Çekimi", short: "Mâzi", col: "cerr", legend: ["mz", "ref", "sf"],
  goals: ["نَصَرَ fiilini on dört şahısta çekmek", "Çoğul vavından sonra yazılan elifin (elif-i fâriqa) kuralını bilmek", "Tabloda eksik çekimleri doldurmak"],
  examples: [
    { s: "هُوَ:mz / نَصَرَ:sf", tr: "O yardım etti.", pair: "هِيَ:mz / نَصَرَتْ:sf.ـتْ te'nîs", pairTr: "O (kadın) yardım etti." },
    { s: "هُمْ:mz / نَصَرُوا:ref.ـو", tr: "Onlar yardım etti.", pair: "هُنَّ:mz / نَصَرْنَ:ref.ـنَ", pairTr: "Onlar (kadınlar) yardım etti." },
    { s: "أَنْتُمْ:mz / نَصَرْتُمْ:ref.ـتُ", tr: "Siz yardım ettiniz.", pair: "نَحْنُ:mz / نَصَرْنَا:ref.نَا", pairTr: "Biz yardım ettik." }
  ],
  rules: [
    { tr: "Tablo: <span class=\"ar\">نَصَرَ، نَصَرَا، نَصَرُوا · نَصَرَتْ، نَصَرَتَا، نَصَرْنَ · نَصَرْتَ، نَصَرْتُمَا، نَصَرْتُمْ · نَصَرْتِ، نَصَرْتُمَا، نَصَرْتُنَّ · نَصَرْتُ، نَصَرْنَا</span>." },
    { tr: "Gövde (<span class=\"ar\">نَصَر</span>) hiç değişmez; tâ, nûn ve nâ gelince son harf sakin olur." },
    { tr: "<b>Elif-i fâriqa</b> (vikâye elifi): çoğul vavından sonra yazılan, okunmayan elif. Mâzide ve nasb/cezm hâlindeki muzâride yazılır.", ex: ["الطُّلَّابُ ذَهَبُوا", "الطُّلَّابُ لَنْ يَحْضُرُوا"] },
    { tr: "Vav fiilin kendi harfiyse elif yazılmaz: <span class=\"ar\">مُحَمَّدٌ يَدْعُو</span>." }
  ],
  kaide: [
    "تَصْرِيفُ الفِعْلِ السَّالِمِ المَاضِي: الغَائِبُ: نَصَرَ، نَصَرَا، نَصَرُوا. الغَائِبَةُ: نَصَرَتْ، نَصَرَتَا، نَصَرْنَ. المُخَاطَبُ: نَصَرْتَ، نَصَرْتُمَا، نَصَرْتُمْ. المُخَاطَبَةُ: نَصَرْتِ، نَصَرْتُمَا، نَصَرْتُنَّ. المُتَكَلِّمُ: نَصَرْتُ، نَصَرْنَا.",
    "مُلَاحَظَةٌ: الأَلِفُ الَّتِي تَأْتِي بَعْدَ وَاوِ الجَمَاعَةِ فِي الفِعْلِ المَاضِي أَوْ فِي المُضَارِعِ عِنْدَمَا يَكُونُ مَنْصُوبًا أَوْ مَجْزُومًا تُسَمَّى «أَلِفَ الوِقَايَةِ» أَوِ «الأَلِفَ الفَارِقَةَ»، مِثْلُ: الطُّلَّابُ لَنْ يَحْضُرُوا، الطُّلَّابُ ذَهَبُوا. وَلَكِنْ إِذَا كَانَتِ الوَاوُ مِنْ أَصْلِ الفِعْلِ لَا تُكْتَبُ بَعْدَهَا أَلِفٌ، مِثْلُ «يَدْعُو» فِي جُمْلَةِ «مُحَمَّدٌ يَدْعُو»."
  ],
  ex: [
    { type: "combo", num: "جَدْوَلٌ ١", ar: "امْلَأِ الفَرَاغَ فِي الجَدْوَلِ الآتِي", tr: "Mâzi tablosu: her satırda o şahıs için beş fiilin şeklini seç. Kitabın verdiği hücre sabit.", items: TBL("m", ["jls", "nzr", "fth", "shrb", "clm"], [0, 1, 2, 3, 4]) },
    { type: "pick", extra: true, ar: "الأَلِفُ الفَارِقَةُ", tr: "Elif-i fâriqa: hangisi doğru yazılmış?", items: [
      PK("onlar gitti", ["ذَهَبُوا", "ذَهَبُو", "ذَهَبُوءَ"], "Öğrenciler gitti.", "Çoğul vavından sonra elif yazılır.", 0),
      PK("onlar asla gelmeyecek", ["لَنْ يَحْضُرُوا", "لَنْ يَحْضُرُو", "لَنْ يَحْضُرُونَ"], "Asla gelmeyecekler.", "Nasb hâlinde nûn düşer, elif yazılır.", 1),
      PK("Muhammed dua ediyor", ["مُحَمَّدٌ يَدْعُو", "مُحَمَّدٌ يَدْعُوا", "مُحَمَّدٌ يَدْعُونَ"], "Muhammed dua ediyor.", "Vav fiilin kendi harfi (دعو): elif yazılmaz.", 2),
      PK("onlar yazıyor", ["يَكْتُبُونَ", "يَكْتُبُوا", "يَكْتُبُونَا"], "Yazıyorlar.", "Merfû muzâride nûn kalır; elif yok.", 0),
      PK("siz anladınız", ["فَهِمْتُمْ", "فَهِمْتُمُوا", "فَهِمْتُمُو"], "Anladınız.", "تُمْ'de vav yok; elif de yok.", 1),
      PK("onlar yazmadı", ["لَمْ يَكْتُبُوا", "لَمْ يَكْتُبُونَ", "لَمْ يَكْتُبُو"], "Yazmadılar.", "Cezm: nûn düşer, elif yazılır.", 2)
    ]},
    { type: "combo", num: "٤ (١)", ar: "صَرِّفِ الأَفْعَالَ السَّالِمَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "İki fiili yeni özneye göre çek.", exHtml: "<span class=\"ar\">المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ.</span>", items: [
      TS("الأُسْتَاذَةُ", 3, [["f", "dkhl", "m"], "الصَّفَّ ثُمَّ", ["f", "ktb", "m"], "جُمْلَةً عَلَى السَّبُّورَةِ."], "Hoca hanım sınıfa girdi, sonra tahtaya bir cümle yazdı.", "المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ."),
      TS("الأُسْتَاذَانِ", 1, [["f", "dkhl", "m"], "الصَّفَّ ثُمَّ", ["f", "ktb", "m"], "جُمْلَةً عَلَى السَّبُّورَةِ."], "İki hoca sınıfa girdi, sonra tahtaya bir cümle yazdı.", "المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ."),
      TS("الأُسْتَاذَتَانِ", 4, [["f", "dkhl", "m"], "الصَّفَّ ثُمَّ", ["f", "ktb", "m"], "جُمْلَةً عَلَى السَّبُّورَةِ."], "İki hoca hanım sınıfa girdi, sonra tahtaya bir cümle yazdı.", "المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ."),
      TS("أَنْتَ", 6, [["f", "dkhl", "m"], "الصَّفَّ ثُمَّ", ["f", "ktb", "m"], "جُمْلَةً عَلَى السَّبُّورَةِ."], "Sen sınıfa girdin, sonra tahtaya bir cümle yazdın.", "المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ."),
      TS("نَحْنُ", 13, [["f", "dkhl", "m"], "الصَّفَّ ثُمَّ", ["f", "ktb", "m"], "جُمْلَةً عَلَى السَّبُّورَةِ."], "Biz sınıfa girdik, sonra tahtaya bir cümle yazdık.", "المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ."),
      TS("هُمْ", 2, [["f", "dkhl", "m"], "الصَّفَّ ثُمَّ", ["f", "ktb", "m"], "جُمْلَةً عَلَى السَّبُّورَةِ."], "Onlar sınıfa girdi, sonra tahtaya bir cümle yazdı.", "المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ."),
      TS("أَنْتُمْ", 8, [["f", "dkhl", "m"], "الصَّفَّ ثُمَّ", ["f", "ktb", "m"], "جُمْلَةً عَلَى السَّبُّورَةِ."], "Siz sınıfa girdiniz, sonra tahtaya bir cümle yazdınız.", "المُدَرِّسُ دَخَلَ الصَّفَّ ثُمَّ كَتَبَ جُمْلَةً عَلَى السَّبُّورَةِ.")
    ]},
    { type: "combo", num: "٤ (٢)", ar: "صَرِّفِ الأَفْعَالَ السَّالِمَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "Fiili yeni özneye göre çek.", exHtml: "<span class=\"ar\">الطَّالِبَانِ فَهِمَا الدَّرْسَ.</span>", items: [
      TS("الطَّالِبَةُ", 3, [["f", "fhm", "m"], "الدَّرْسَ."], "Kız öğrenci dersi anladı.", "الطَّالِبَانِ فَهِمَا الدَّرْسَ."),
      TS("الطَّالِبُ", 0, [["f", "fhm", "m"], "الدَّرْسَ."], "Öğrenci dersi anladı.", "الطَّالِبَانِ فَهِمَا الدَّرْسَ."),
      TS("الطَّالِبَاتُ", 5, [["f", "fhm", "m"], "الدَّرْسَ."], "Kız öğrenciler dersi anladı.", "الطَّالِبَانِ فَهِمَا الدَّرْسَ."),
      TS("الطُّلَّابُ", 2, [["f", "fhm", "m"], "الدَّرْسَ."], "Öğrenciler dersi anladı.", "الطَّالِبَانِ فَهِمَا الدَّرْسَ."),
      TS("نَحْنُ", 13, [["f", "fhm", "m"], "الدَّرْسَ."], "Biz dersi anladık.", "الطَّالِبَانِ فَهِمَا الدَّرْسَ."),
      TS("هُمْ", 2, [["f", "fhm", "m"], "الدَّرْسَ."], "Onlar dersi anladı.", "الطَّالِبَانِ فَهِمَا الدَّرْسَ."),
      TS("أَنْتُمْ", 8, [["f", "fhm", "m"], "الدَّرْسَ."], "Siz dersi anladınız.", "الطَّالِبَانِ فَهِمَا الدَّرْسَ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · MUZÂRİ
{
  id: "u3", no: 3, ar: "تَصْرِيفُ الفِعْلِ السَّالِمِ المُضَارِعِ", tr: "Sâlim Muzârinin Çekimi", short: "Muzâri", col: "mz", legend: ["mz", "ref", "sf"],
  goals: ["يَنْصُرُ fiilini on dört şahısta çekmek", "Parantezdeki özneyi kaldırıp fiile ref zamiri eklemek", "Tabloda eksik çekimleri doldurmak"],
  examples: [
    { s: "هُوَ:mz / يَنْصُرُ:sf", tr: "O yardım ediyor.", pair: "هِيَ:mz / تَنْصُرُ:sf", pairTr: "O (kadın) yardım ediyor." },
    { s: "هُمْ:mz / يَنْصُرُونَ:ref.ـو", tr: "Onlar yardım ediyor.", pair: "هُنَّ:mz / يَنْصُرْنَ:ref.ـنَ", pairTr: "Onlar (kadınlar) yardım ediyor." },
    { s: "أَنْتِ:mz / تَنْصُرِينَ:ref.ـي", tr: "Sen (kadın) yardım ediyorsun.", pair: "نَحْنُ:mz / نَنْصُرُ:sf", pairTr: "Biz yardım ediyoruz." }
  ],
  rules: [
    { tr: "Tablo: <span class=\"ar\">يَنْصُرُ، يَنْصُرَانِ، يَنْصُرُونَ · تَنْصُرُ، تَنْصُرَانِ، يَنْصُرْنَ · تَنْصُرُ، تَنْصُرَانِ، تَنْصُرُونَ · تَنْصُرِينَ، تَنْصُرَانِ، تَنْصُرْنَ · أَنْصُرُ، نَنْصُرُ</span>." },
    { tr: "Gövde (<span class=\"ar\">نْصُر</span>) değişmez; baştaki harf (<span class=\"ar\">ي، ت، أ، ن</span>) ve sondaki ek değişir." },
    { tr: "<span class=\"ar\">أَنَا، نَحْنُ، أَنْتَ، هُوَ، هِيَ</span> için görünür zamir yok: <span class=\"ar\">يَذْكُرُ (نَحْنُ) ← نَذْكُرُ</span>." }
  ],
  kaide: ["تَصْرِيفُ الفِعْلِ السَّالِمِ المُضَارِعِ: الغَائِبُ: يَنْصُرُ، يَنْصُرَانِ، يَنْصُرُونَ. الغَائِبَةُ: تَنْصُرُ، تَنْصُرَانِ، يَنْصُرْنَ. المُخَاطَبُ: تَنْصُرُ، تَنْصُرَانِ، تَنْصُرُونَ. المُخَاطَبَةُ: تَنْصُرِينَ، تَنْصُرَانِ، تَنْصُرْنَ. المُتَكَلِّمُ: أَنْصُرُ، نَنْصُرُ."],
  ex: [
    { type: "combo", num: "جَدْوَلٌ ٢", ar: "امْلَأِ الفَرَاغَ فِي الجَدْوَلِ الآتِي", tr: "Muzâri tablosu: her satırda o şahıs için beş fiilin şeklini seç. Kitabın verdiği hücre sabit.", items: TBL("u", ["jls", "nzr", "fth", "shrb", "clm"], [0, 1, 2, 3, 4]) },
    { type: "combo", num: "٣", ar: "اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِضَمَائِرِ الرَّفْعِ المُتَّصِلَةِ", tr: "Parantezdeki kelimeyi kaldır; fiile uygun ref zamirini ekle.", exHtml: "<span class=\"ar\">غَسَلَ (هُمْ) وُجُوهَهُمْ ← غَسَلُوا وُجُوهَهُمْ · يَذْهَبُ (الطُّلَّابُ) ظُهْرًا ← يَذْهَبُونَ ظُهْرًا</span>", items: [
      CJ("خَرَجَ (الطَّالِبَانِ) مِنَ الصَّفِّ.", [F("khrj", "m", 1), "مِنَ الصَّفِّ."], "İki öğrenci sınıftan çıktı.", "İkil: خَرَجَا."),
      CJ("كَتَبَ (نَحْنُ) الوَاجِبَاتِ.", [F("ktb", "m", 13), "الوَاجِبَاتِ."], "Ödevleri yazdık.", "نَحْنُ → كَتَبْنَا."),
      CJ("فَتَحَ (أَنَا) بَابَ الصَّفِّ.", [F("fth", "m", 12), "بَابَ الصَّفِّ."], "Sınıfın kapısını açtım.", "أَنَا → فَتَحْتُ."),
      CJ("تَهْبِطُ (الطَّائِرَتَانِ) فِي أَرْضِ المَطَارِ.", [F("hbt", "u", 4), "فِي أَرْضِ المَطَارِ."], "İki uçak havaalanına iniyor.", "Müennes ikil: تَهْبِطَانِ."),
      CJ("يَعْمَلُ (الرِّجَالُ) فِي المَصْنَعِ.", [F("cml", "u", 2), "فِي المَصْنَعِ."], "Adamlar fabrikada çalışıyor.", "يَعْمَلُونَ."),
      CJ("يَرْكَبُ (المُسَافِرُونَ) الحَافِلَةَ.", [F("rkb", "u", 2), "الحَافِلَةَ."], "Yolcular otobüse biniyor.", "يَرْكَبُونَ."),
      CJ("يَحْفَظُ (الطَّالِبَانِ) سُورَةَ الفَتْحِ.", [F("hfz", "u", 1), "سُورَةَ الفَتْحِ."], "İki öğrenci Fetih sûresini ezberliyor.", "يَحْفَظَانِ."),
      CJ("يَذْكُرُ (نَحْنُ) اللهَ كَثِيرًا.", [F("dhkr", "u", 13), "اللهَ كَثِيرًا."], "Allah'ı çok anıyoruz.", "نَحْنُ: baştaki harf ن → نَذْكُرُ (görünür zamir yok).")
    ]},
    { type: "combo", num: "٤ (٣)", ar: "صَرِّفِ الأَفْعَالَ السَّالِمَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "Fiili yeni özneye göre çek.", exHtml: "<span class=\"ar\">الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ.</span>", items: [
      TS("الرَّاكِبَةُ", 3, [["f", "nzl", "u"], "مِنَ السَّيَّارَةِ."], "Kadın yolcu arabadan iniyor.", "الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ."),
      TS("المُدِيرَانِ", 1, [["f", "nzl", "u"], "مِنَ السَّيَّارَةِ."], "İki müdür arabadan iniyor.", "الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ."),
      TS("المُهَنْدِسَاتُ", 5, [["f", "nzl", "u"], "مِنَ السَّيَّارَةِ."], "Kadın mühendisler arabadan iniyor.", "الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ."),
      TS("المُوَظَّفُونَ", 2, [["f", "nzl", "u"], "مِنَ السَّيَّارَةِ."], "Memurlar arabadan iniyor.", "الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ."),
      TS("نَحْنُ", 13, [["f", "nzl", "u"], "مِنَ السَّيَّارَةِ."], "Biz arabadan iniyoruz.", "الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ."),
      TS("هُمْ", 2, [["f", "nzl", "u"], "مِنَ السَّيَّارَةِ."], "Onlar arabadan iniyor.", "الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ."),
      TS("أَنْتُمْ", 8, [["f", "nzl", "u"], "مِنَ السَّيَّارَةِ."], "Siz arabadan iniyorsunuz.", "الرَّاكِبُ يَنْزِلُ مِنَ السَّيَّارَةِ.")
    ]},
    { type: "combo", num: "٤ (٤)", ar: "صَرِّفِ الأَفْعَالَ السَّالِمَةَ مَعَ الضَّمَائِرِ وَالأَسْمَاءِ التَّالِيَةِ", tr: "Fiili yeni özneye göre çek.", exHtml: "<span class=\"ar\">الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ.</span>", items: [
      TS("الطَّالِبَةُ", 3, [["f", "jls", "u"], "أَمَامَ المَدْرَسَةِ."], "Kız öğrenci okulun önünde oturuyor.", "الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ."),
      TS("الطَّالِبَانِ", 1, [["f", "jls", "u"], "أَمَامَ المَدْرَسَةِ."], "İki öğrenci okulun önünde oturuyor.", "الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ."),
      TS("الطَّالِبَاتُ", 5, [["f", "jls", "u"], "أَمَامَ المَدْرَسَةِ."], "Kız öğrenciler okulun önünde oturuyor.", "الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ."),
      TS("الطُّلَّابُ", 2, [["f", "jls", "u"], "أَمَامَ المَدْرَسَةِ."], "Öğrenciler okulun önünde oturuyor.", "الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ."),
      TS("نَحْنُ", 13, [["f", "jls", "u"], "أَمَامَ المَدْرَسَةِ."], "Biz okulun önünde oturuyoruz.", "الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ."),
      TS("هُمْ", 2, [["f", "jls", "u"], "أَمَامَ المَدْرَسَةِ."], "Onlar okulun önünde oturuyor.", "الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ."),
      TS("أَنْتُمْ", 8, [["f", "jls", "u"], "أَمَامَ المَدْرَسَةِ."], "Siz okulun önünde oturuyorsunuz.", "الطَّالِبُ يَجْلِسُ أَمَامَ المَدْرَسَةِ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ: أَفْضَلُ النَّاسِ", tr: "Okuma: İnsanların En Faziletlisi", short: "Okuma", col: "mi", legend: ["sf", "ref"],
  goals: ["Bir metindeki sâlim sülâsî fiilleri bulmak", "Bulduğu fiilin mâzi mi, muzâri mi, emir mi olduğunu söylemek", "Sâlim olmayan (أَرَدْتَ، فَاسْأَلْ، وَضَعْتَ) ve sülâsî olmayan (حَصَّلْتَ، يُغَيِّرُ) fiilleri ayırmak"],
  examples: [
    { s: "إِنْسَانٌ:- / يَصْنَعُ:sf.muzâri / نَفْسَهُ:-", tr: "Kendini yetiştiren insan." },
    { s: "مَاذَا:- / صَنَعْتُ:ref.mâzi / لِأُصْبِحَ:- / مِنْ أَفْضَلِ النَّاسِ:-", tr: "İnsanların en faziletlilerinden olmak için ne yaptım?" },
    { s: "اِجْعَلْ:sf.emir / شِعَارَكَ:- / الدَّائِمَ:-", tr: "Kalıcı şiarını yap." }
  ],
  rules: [
    { tr: "Sâlim ve sülâsî: <span class=\"ar\">يَصْنَعُ، تَعْرِفَ، صَنَعْتُ، اِجْعَلْ، عَمِلْتَ، كَسَبْتَ، جَعَلْتَ، فَعَلْتَ، سَلَكْتَ، تَسْلُكَ، يَجْعَلُ</span>." },
    { tr: "Sâlim değil: <span class=\"ar\">أَرَدْتَ، قُمْتَ، كُنْتَ</span> (illetli), <span class=\"ar\">فَاسْأَلْ، تَسْأَلَ</span> (hemzeli), <span class=\"ar\">وَضَعْتَ</span> (ilk harf و)." },
    { tr: "Sülâsî değil: <span class=\"ar\">أُصْبِحَ، أَفَدْتَ، حَصَّلْتَ، فَحَاوِلْ، يُخَصَّصُ، يُغَيِّرُ</span>." }
  ],
  kaide: ["اسْتَخْرِجْ مِنَ النَّصِّ الفِعْلَ الثُّلَاثِيَّ السَّالِمَ وَاذْكُرْ زَمَنَهُ: مَاضِيًا أَوْ مُضَارِعًا أَوْ أَمْرًا."],
  ex: [
    { type: "reading", num: "٥", ar: "اقْرَأِ النَّصَّ التَّالِيَ", tr: "Metni oku; sorulara bak. Sonra fiilleri sınıflandır.", title: "أَفْضَلُ النَّاسِ",
      text: "النَّاسُ مُخْتَلِفُونَ؛ إِنْسَانٌ يَصْنَعُ نَفْسَهُ، وَإِنْسَانٌ يَصْنَعُ أَوْلَادَهُ، وَإِنْسَانٌ يَصْنَعُ المُجْتَمَعَ، وَهُنَاكَ إِنْسَانٌ يَصْنَعُ التَّارِيخَ، وَهُوَ أَعْظَمُ العُظَمَاءِ جَمِيعًا. وَإِذَا أَرَدْتَ أَنْ تَعْرِفَ قَدْرَكَ بَيْنَ هَؤُلَاءِ فَاسْأَلْ نَفْسَكَ دَوْمًا: مَاذَا صَنَعْتُ لِأُصْبِحَ مِنْ أَفْضَلِ النَّاسِ؟ اِجْعَلْ شِعَارَكَ الدَّائِمَ أَنْ تَسْأَلَ نَفْسَكَ: مَاذَا عَمِلْتَ فِي وَقْتِ فَرَاغِكَ؟ هَلْ كَسَبْتَ صِحَّةً، أَوْ أَفَدْتَ مَالًا، أَوْ حَصَّلْتَ عِلْمًا، أَوْ قُمْتَ بِعَمَلِ خَيْرٍ تُجَاهَ مُجْتَمَعِكَ؟ وَهَلْ وَضَعْتَ لِوَقْتِ فَرَاغِكَ خُطَّةً مُعَيَّنَةً؟ هَلْ جَعَلْتَ لِهَذِهِ الخُطَّةِ هَدَفًا وَاضِحًا؟ إِنْ كُنْتَ فَعَلْتَ ذَلِكَ فَقَدْ سَلَكْتَ مَسْلَكًا قَوِيمًا، وَإِلَّا فَحَاوِلْ أَنْ تَسْلُكَهُ. إِنَّ قَلِيلًا مِنَ الزَّمَنِ الَّذِي يُخَصَّصُ كُلَّ يَوْمٍ لِشَيْءٍ مُعَيَّنٍ قَدْ يُغَيِّرُ مَجْرَى الحَيَاةِ، وَيَجْعَلُهَا أَكْثَرَ خِصْبًا وَأَغْزَرَ إِنْتَاجًا.",
      textTr: "İnsanların En Faziletlisi. İnsanlar farklıdır: kimi kendini yetiştirir, kimi çocuklarını yetiştirir, kimi toplumu inşa eder; bir de tarihi yapan insan vardır ki o, büyüklerin en büyüğüdür. Bunlar arasında değerini bilmek istersen kendine sürekli sor: İnsanların en faziletlilerinden olmak için ne yaptım? Kendine şunu sormayı kalıcı şiarın yap: Boş vaktimde ne yaptım? Sağlık mı kazandım, mal mı edindim, ilim mi elde ettim, yoksa toplumuma karşı bir hayır işi mi yaptım? Boş vaktim için belirli bir plan yaptım mı? Bu plana açık bir hedef koydum mu? Bunu yaptıysan doğru bir yol tuttun; yapmadıysan o yolu tutmaya çalış. Her gün belirli bir şeye ayrılan az bir zaman hayatın akışını değiştirebilir, onu daha verimli ve daha üretken kılar.",
      qa: [
        { q: "مَنْ أَعْظَمُ العُظَمَاءِ؟", a: "الإِنْسَانُ الَّذِي يَصْنَعُ التَّارِيخَ.", tr: "Büyüklerin en büyüğü kimdir? Tarihi yapan insan." },
        { q: "مَاذَا تَسْأَلُ نَفْسَكَ دَوْمًا؟", a: "مَاذَا صَنَعْتُ لِأُصْبِحَ مِنْ أَفْضَلِ النَّاسِ؟", tr: "Kendine sürekli ne sormalısın? İnsanların en faziletlilerinden olmak için ne yaptım?" },
        { q: "مَاذَا يُغَيِّرُ مَجْرَى الحَيَاةِ؟", a: "قَلِيلٌ مِنَ الزَّمَنِ يُخَصَّصُ كُلَّ يَوْمٍ لِشَيْءٍ مُعَيَّنٍ.", tr: "Hayatın akışını ne değiştirir? Her gün belirli bir şeye ayrılan az bir zaman." }
      ],
      cls: { opts: [["m", "Mâzi (sâlim)", "مَاضٍ", "cerr"], ["u", "Muzâri (sâlim)", "مُضَارِعٌ", "mz"], ["a", "Emir (sâlim)", "أَمْرٌ", "ref"], ["n", "Sâlim sülâsî değil", "لَيْسَ سَالِمًا ثُلَاثِيًّا", "x"]], ar: "اسْتَخْرِجِ الفِعْلَ الثُّلَاثِيَّ السَّالِمَ وَاذْكُرْ زَمَنَهُ", tr: "Fiil sâlim sülâsî mi? Öyleyse zamanı ne?", items: [
        { s: "يَصْنَعُ", a: "u", why: "صنع: sâlim; muzâri." },
        { s: "تَعْرِفَ", a: "u", why: "عرف: sâlim; muzâri (mansûb)." },
        { s: "صَنَعْتُ", a: "m", why: "Mâzi + ـتُ." },
        { s: "اِجْعَلْ", a: "a", why: "جعل: sâlim; emir." },
        { s: "عَمِلْتَ", a: "m", why: "Mâzi." },
        { s: "كَسَبْتَ", a: "m", why: "Mâzi." },
        { s: "جَعَلْتَ", a: "m", why: "Mâzi." },
        { s: "فَعَلْتَ", a: "m", why: "Mâzi." },
        { s: "سَلَكْتَ", a: "m", why: "Mâzi." },
        { s: "تَسْلُكَهُ", a: "u", why: "سلك: sâlim; muzâri." },
        { s: "يَجْعَلُهَا", a: "u", why: "Muzâri." },
        { s: "أَرَدْتَ", a: "n", why: "أَرَادَ: illetli ve üç harften fazla." },
        { s: "فَاسْأَلْ", a: "n", why: "سَأَلَ hemzeli: sâlim değil." },
        { s: "وَضَعْتَ", a: "n", why: "وَضَعَ: ilk harf و (illetli)." },
        { s: "قُمْتَ", a: "n", why: "قَامَ: ortası illetli." },
        { s: "حَصَّلْتَ", a: "n", why: "حَصَّلَ: dört harfli (tef'îl)." },
        { s: "يُغَيِّرُ", a: "n", why: "غَيَّرَ: dört harfli ve illetli." }
      ]}
    }
  ]
}
];

// Doğru Çekim oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var RZ_POOL = [
  ["{فَهِمْتُمُ} الدَّرْسَ.", ["فَهِمْتُمُ", "فَهِمُوا", "فَهِمْنَا"], "siz → ـتُمْ", "Dersi anladınız.", "u1"],
  ["{خَرَجْتُ} مِنَ البَيْتِ.", ["خَرَجْتُ", "خَرَجَتْ", "خَرَجْنَ"], "ben → ـتُ", "Evden çıktım.", "u1"],
  ["{سَمِعُوا} الأَذَانَ.", ["سَمِعُوا", "سَمِعَا", "سَمِعْنَ"], "onlar → vav", "Ezanı duydular.", "u1"],
  ["{ذَهَبَا} إِلَى المَسْجِدِ.", ["ذَهَبَا", "ذَهَبُوا", "ذَهَبَتْ"], "o ikisi → elif", "O ikisi mescide gitti.", "u1"],
  ["{هَبَطَتِ} الطَّائِرَةُ قَبْلَ قَلِيلٍ.", ["هَبَطَتِ", "هَبَطَ", "هَبَطْتِ"], "müennes özne → sakin ـتْ", "Uçak az önce indi.", "u1"],
  ["النِّسَاءُ {يَذْهَبْنَ} إِلَى السُّوقِ.", ["يَذْهَبْنَ", "يَذْهَبُونَ", "تَذْهَبُ"], "kadınlar → nûn", "Kadınlar çarşıya gidiyor.", "u1"],
  ["الطَّالِبَاتُ {فَهِمْنَ} الدَّرْسَ.", ["فَهِمْنَ", "فَهِمْتُنَّ", "فَهِمُوا"], "gâibe çoğul → فَهِمْنَ", "Kız öğrenciler dersi anladı.", "u2"],
  ["الضُّيُوفُ {رَكِبُوا} الحَافِلَةَ.", ["رَكِبُوا", "رَكِبْنَ", "رَكِبَ"], "erkek çoğul", "Misafirler otobüse bindi.", "u2"],
  ["أَنَا {نَصَرْتُ} أَخِي.", ["نَصَرْتُ", "نَصَرْتَ", "نَصَرَتْ"], "ben → ötreli tâ", "Kardeşime yardım ettim.", "u2"],
  ["أَنْتِ {كَتَبْتِ} الرِّسَالَةَ.", ["كَتَبْتِ", "كَتَبْتَ", "كَتَبَتْ"], "sen (kadın) → esreli tâ", "Sen (kadın) mektubu yazdın.", "u2"],
  ["الطَّبِيبَتَانِ {خَرَجَتَا} مِنَ المُسْتَشْفَى.", ["خَرَجَتَا", "خَرَجَا", "خَرَجْنَ"], "müennes ikil", "İki kadın doktor hastaneden çıktı.", "u2"],
  ["الطُّلَّابُ لَنْ {يَحْضُرُوا}.", ["يَحْضُرُوا", "يَحْضُرُو", "يَحْضُرُونَ"], "nasb: nûn düşer, elif-i fâriqa", "Öğrenciler gelmeyecek.", "u2"],
  ["أَنْتُنَّ {جَلَسْتُنَّ} هُنَا.", ["جَلَسْتُنَّ", "جَلَسْتُمْ", "جَلَسْنَ"], "أَنْتُنَّ → ـتُنَّ", "Siz (kadınlar) burada oturdunuz.", "u2"],
  ["الطَّائِرَتَانِ {تَهْبِطَانِ} فِي المَطَارِ.", ["تَهْبِطَانِ", "يَهْبِطَانِ", "تَهْبِطْنَ"], "müennes ikil: ت", "İki uçak havaalanına iniyor.", "u3"],
  ["نَحْنُ {نَذْكُرُ} اللهَ كَثِيرًا.", ["نَذْكُرُ", "يَذْكُرُونَ", "ذَكَرْنَا"], "نَحْنُ → ن", "Allah'ı çok anıyoruz.", "u3"],
  ["الطَّالِبَانِ {يَحْفَظَانِ} سُورَةَ الفَتْحِ.", ["يَحْفَظَانِ", "يَحْفَظُونَ", "تَحْفَظَانِ"], "ikil gâib → ي + elif", "İki öğrenci Fetih sûresini ezberliyor.", "u3"],
  ["الرِّجَالُ {يَعْمَلُونَ} فِي المَصْنَعِ.", ["يَعْمَلُونَ", "يَعْمَلُ", "يَعْمَلْنَ"], "erkek çoğul", "Adamlar fabrikada çalışıyor.", "u3"],
  ["أَنْتِ {تَجْلِسِينَ} أَمَامَ المَدْرَسَةِ.", ["تَجْلِسِينَ", "تَجْلِسُ", "تَجْلِسْنَ"], "muhataba → yâ", "Sen (kadın) okulun önünde oturuyorsun.", "u3"],
  ["المُهَنْدِسَاتُ {يَنْزِلْنَ} مِنَ السَّيَّارَةِ.", ["يَنْزِلْنَ", "تَنْزِلْنَ", "يَنْزِلُونَ"], "gâibe çoğul: ي + nûn", "Kadın mühendisler arabadan iniyor.", "u3"],
  ["إِنْسَانٌ {يَصْنَعُ} التَّارِيخَ.", ["يَصْنَعُ", "صَنَعُوا", "اِصْنَعْ"], "muzâri, tekil", "Tarihi yapan insan.", "u4"],
  ["مَاذَا {صَنَعْتُ} لِأُصْبِحَ مِنْ أَفْضَلِ النَّاسِ؟", ["صَنَعْتُ", "صَنَعَتْ", "يَصْنَعُ"], "ben, mâzi", "En faziletlilerden olmak için ne yaptım?", "u4"],
  ["{اِجْعَلْ} شِعَارَكَ الدَّائِمَ أَنْ تَسْأَلَ نَفْسَكَ.", ["اِجْعَلْ", "جَعَلْتَ", "يَجْعَلُ"], "emir", "Kendine sormayı kalıcı şiarın yap.", "u4"],
  ["مَاذَا {عَمِلْتَ} فِي وَقْتِ فَرَاغِكَ؟", ["عَمِلْتَ", "عَمِلْتُ", "عَمِلَتْ"], "sen, mâzi", "Boş vaktinde ne yaptın?", "u4"],
  ["فَقَدْ {سَلَكْتَ} مَسْلَكًا قَوِيمًا.", ["سَلَكْتَ", "سَلَكَتْ", "سَلَكْنَا"], "sen, mâzi", "Doğru bir yol tuttun.", "u4"]
];
var HAFIZA = {
  mazi: { name: "Zamir ↔ mâzi", pairs: [["هُوَ", "نَصَرَ"], ["هُمَا", "نَصَرَا"], ["هُمْ", "نَصَرُوا"], ["هِيَ", "نَصَرَتْ"], ["هُنَّ", "نَصَرْنَ"], ["أَنْتَ", "نَصَرْتَ"], ["أَنْتُمَا", "نَصَرْتُمَا"], ["أَنْتُمْ", "نَصَرْتُمْ"], ["أَنْتِ", "نَصَرْتِ"], ["أَنْتُنَّ", "نَصَرْتُنَّ"], ["أَنَا", "نَصَرْتُ"], ["نَحْنُ", "نَصَرْنَا"]] },
  muzari: { name: "Zamir ↔ muzâri", pairs: [["هُوَ", "يَنْصُرُ"], ["هُمَا", "يَنْصُرَانِ"], ["هُمْ", "يَنْصُرُونَ"], ["هُنَّ", "يَنْصُرْنَ"], ["أَنْتَ", "تَنْصُرُ"], ["أَنْتُمَا", "تَنْصُرَانِ"], ["أَنْتُمْ", "تَنْصُرُونَ"], ["أَنْتِ", "تَنْصُرِينَ"], ["أَنْتُنَّ", "تَنْصُرْنَ"], ["أَنَا", "أَنْصُرُ"], ["نَحْنُ", "نَنْصُرُ"]] },
  sl: { name: "Fiil ↔ türü", pairs: [["نَصَرَ", "sâlim"], ["قَالَ", "illetli (orta)"], ["وَعَدَ", "illetli (baş)"], ["رَمَى", "illetli (son)"], ["أَخَذَ", "hemzeli (baş)"], ["سَأَلَ", "hemzeli (orta)"], ["قَرَأَ", "hemzeli (son)"], ["مَدَّ", "muzâaf"]] }
};
var KARTLAR = [
  ["Sâlim fiil nedir?", "Kök harflerinde illet harfi (و ا ي), hemze ve iki aynı harf olmayan fiil: نَصَرَ، كَتَبَ، فَتَحَ"],
  ["Sâlim olmayan üç tür?", "İlletli (قَالَ، وَعَدَ، رَمَى), hemzeli (أَخَذَ، سَأَلَ، قَرَأَ), muzâaf (مَدَّ، شَدَّ)."],
  ["Ref zamiri gelince sâlim fiil değişir mi?", "Hayır; yalnız sona ek gelir: سَجَدْتُ، سَجَدُوا، يَسْجُدْنَ"],
  ["Mâzi tablosu?", "نَصَرَ نَصَرَا نَصَرُوا · نَصَرَتْ نَصَرَتَا نَصَرْنَ · نَصَرْتَ نَصَرْتُمَا نَصَرْتُمْ · نَصَرْتِ نَصَرْتُمَا نَصَرْتُنَّ · نَصَرْتُ نَصَرْنَا"],
  ["Muzâri tablosu?", "يَنْصُرُ يَنْصُرَانِ يَنْصُرُونَ · تَنْصُرُ تَنْصُرَانِ يَنْصُرْنَ · تَنْصُرُ تَنْصُرَانِ تَنْصُرُونَ · تَنْصُرِينَ تَنْصُرَانِ تَنْصُرْنَ · أَنْصُرُ نَنْصُرُ"],
  ["Elif-i fâriqa nedir?", "Çoğul vavından sonra yazılan, okunmayan elif: ذَهَبُوا، لَنْ يَحْضُرُوا"],
  ["يَدْعُو'ya neden elif yazılmaz?", "Vav fiilin kendi harfi; zamir değil."],
  ["شَعَرَتْ'te zamir var mı?", "Hayır; sakin ـتْ müenneslik harfi."],
  ["يَذْكُرُ (نَحْنُ) → ?", "نَذْكُرُ: baştaki harf ن; görünür zamir yok."],
  ["وَضَعَ sâlim mi?", "Hayır; ilk harf و (illetli, misâl)."],
  ["سَأَلَ sâlim mi?", "Hayır; ortası hemze (mehmûz)."],
  ["حَصَّلَ sülâsî mi?", "Hayır; dört harfli (tef'îl): حَصَّلَ يُحَصِّلُ"]
];
