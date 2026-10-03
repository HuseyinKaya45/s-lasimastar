// ================= VERİ: Emir ve Nehiy (الأَمْرُ وَالنَّهْيُ) =================
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
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
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


ROLES.ref = { ar: "أَمْرٌ", tr: "Emir" }; ROLES.cerr = { ar: "نَهْيٌ", tr: "Nehiy" };
// ---------------- emir ve nehiy motoru ----------------
function harfler(w) { return w.match(/[^\u064B-\u0652\u0670][\u064B-\u0652\u0670]*/g) || []; }
// meczûm muzâri ekleri: ref nûnu düşer, tekiller sükûn alır
var MJ_SUF = MU_SUF.map(function (s, i) {
  if (i === 5 || i === 11) return s;
  if (s.length === 1) return [["ْ", ""]];
  var r = s.filter(function (p) { return !(p[1] === "" && /^ن/.test(p[0])); });
  if (r.some(function (p) { return p[0] === "و" && p[1] === "z"; })) r = r.concat([["ا", ""]]);
  return r;
});
// emrin hemzesi: muzâride ayn damme ise اُ, değilse اِ
function hemze(vk) { var h = harfler(V[vk].u); return h[1] && h[1].indexOf("ُ") >= 0 ? "اُ" : "اِ"; }
var MOD = { a: "Emr-i hâzır", l: "Emr-i gâib", nh: "Nehy-i hâzır", ng: "Nehy-i gâib" };
var MOD_AR = { a: "أَمْرُ الحَاضِرِ", l: "أَمْرُ الغَائِبِ", nh: "نَهْيُ الحَاضِرِ", ng: "نَهْيُ الغَائِبِ" };
var MOD_CELLS = { a: [6, 7, 8, 9, 10, 11], nh: [6, 7, 8, 9, 10, 11], l: [0, 1, 2, 3, 4, 5], ng: [0, 1, 2, 3, 4, 5] };
var cjBase = cj;
cj = function (vk, mode, i) {
  if (mode === "m" || mode === "u") return cjBase(vk, mode, i);
  var v = V[vk], pre = MU_PRE[i] + v.p, suf = MJ_SUF[i];
  if (mode === "a") return [[hemze(vk), "m"], [v.u, ""]].concat(suf);
  if (mode === "l") return [["لِ", "m"], [pre, ""], [v.u, ""]].concat(suf);
  return [["لَا ", "m"], [pre, ""], [v.u, ""]].concat(suf);
};
// emir/nehiy seçenekleri: aynı türden diğer hücreler
function FE(vk, mode, cell) {
  var cs = MOD_CELLS[mode], o = [cell].concat(shuffleD(cs.filter(function (c) { return c !== cell; }), cell)), seen = {}, list = [];
  o.forEach(function (c) { var t = cjText(vk, mode, c); if (!seen[t] && list.length < 3) { seen[t] = 1; list.push([c, t]); } });
  list.sort(function (a, b) { return a[0] - b[0]; });
  var opts = list.map(function (x) { return x[1]; });
  return { o: opts, a: opts.indexOf(cjText(vk, mode, cell)) };
}
function shuffleD(a, seed) { return a.map(function (x, i) { return [x, (i * 5 + seed * 3) % 7]; }).sort(function (p, q) { return p[1] - q[1]; }).map(function (p) { return p[0]; }); }
var EN_OPTS = [["eh", "Emr-i hâzır", "أَمْرُ الحَاضِرِ", "ref"], ["eg", "Emr-i gâib", "أَمْرُ الغَائِبِ", "nasb"], ["nh", "Nehy-i hâzır", "نَهْيُ الحَاضِرِ", "cerr"], ["ng", "Nehy-i gâib", "نَهْيُ الغَائِبِ", "mi"], ["x", "Emir ya da nehiy değil", "لَيْسَ أَمْرًا وَلَا نَهْيًا", "x"]];
var EN_TR = { eh: "Emr-i hâzır", eg: "Emr-i gâib", nh: "Nehy-i hâzır", ng: "Nehy-i gâib", x: "Emir ya da nehiy değil" };

var UNITS = [
// ---------------------------------------------------------------- 1 · EMİR VE NEHİY
{
  id: "u1", no: 1, ar: "الأَمْرُ وَالنَّهْيُ", tr: "Emir ve Nehiy", short: "Tanıma", col: "ref", legend: ["ref", "cerr"],
  goals: ["Emir ve nehyin muzâri lafzından yapıldığını bilmek", "Dört türü ayırmak: emr-i hâzır, emr-i gâib, nehy-i hâzır, nehy-i gâib", "Âyet ve hadislerde emir ve nehyi bulmak"],
  examples: [
    { s: "اِقْرَإِ:ref.emr-i hâzır / القُرْآنَ:- / يَا أَحْمَدُ:-", tr: "Kur'an'ı oku ey Ahmed.", pair: "لَا تَأْكُلِ:cerr.nehy-i hâzır / الحَرَامَ:- / يَا جَمِيلُ:-", pairTr: "Haram yeme ey Cemîl." },
    { s: "اِفْتَحِي:ref.emr-i hâzır / الكِتَابَ:- / يَا فَاطِمَةُ:-", tr: "Kitabı aç ey Fâtıma.", pair: "لَا تَجْلِسِي:cerr.nehy-i hâzır / فِي الحَدِيقَةِ:- / يَا زَيْنَبُ:-", pairTr: "Bahçede oturma ey Zeynep." },
    { s: "لِيَذْهَبْ:ref.emr-i gâib / عَلِيٌّ:- / إِلَى المَكْتَبَةِ:-", tr: "Ali kütüphaneye gitsin.", pair: "لَا يَذْهَبْ:cerr.nehy-i gâib / أَحْمَدُ:- / إِلَى السُّوقِ:-", pairTr: "Ahmed çarşıya gitmesin." }
  ],
  rules: [
    { tr: "Emir (yap!) ve nehiy (yapma!) <b>muzâri lafzından</b> yapılır." },
    { tr: "<b class=\"r-ref\">Emr-i hâzır</b>: karşıdakine emir: <span class=\"ar\">اُكْتُبِ الدَّرْسَ</span> (dersi yaz). <b class=\"r-ref\">Emr-i gâib</b>: orada olmayana emir, <span class=\"ar\">لِـ</span> ile: <span class=\"ar\">لِيَكْتُبِ الدَّرْسَ</span> (dersi yazsın)." },
    { tr: "<b class=\"r-cerr\">Nehy-i hâzır</b>: <span class=\"ar\">لَا تَظْلِمِ النَّاسَ</span> (insanlara zulmetme). <b class=\"r-cerr\">Nehy-i gâib</b>: <span class=\"ar\">لَا يَظْلِمِ النَّاسَ</span> (insanlara zulmetmesin)." },
    { tr: "Lâm-ı emr ve lâ-yı nâhiye muzâriyi <b>meczûm</b> yapar: son harf sakin olur, ref nûnu düşer: <span class=\"ar\">لِيَكْتُبُوا، لَا تَكْتُبِي</span>." },
    { tr: "<span class=\"ar\">وَ</span> ya da <span class=\"ar\">فَ</span>'den sonra lâm-ı emr sakin okunur: <span class=\"ar\">فَلْيَعْبُدُوا، فَلْيَقُلْ</span>." },
    { tr: "Sakin harften sonra <span class=\"ar\">ال</span> gelince kesre ile okunur: <span class=\"ar\">اُكْتُبِ الدَّرْسَ، لَا تَأْكُلِ الحَرَامَ</span>." }
  ],
  kaide: [
    "الأَمْرُ وَالنَّهْيُ يَكُونَانِ عَلَى لَفْظِ المُضَارِعِ.",
    "١ ـ يَنْقَسِمُ الأَمْرُ إِلَى قِسْمَيْنِ: أَمْرُ الحَاضِرِ، مِثْلُ: اُكْتُبِ الدَّرْسَ؛ وَأَمْرُ الغَائِبِ، مِثْلُ: لِيَكْتُبِ الدَّرْسَ.",
    "٢ ـ وَيَنْقَسِمُ النَّهْيُ أَيْضًا إِلَى قِسْمَيْنِ: نَهْيُ الحَاضِرِ، مِثْلُ: لَا تَظْلِمِ النَّاسَ؛ وَنَهْيُ الغَائِبِ، مِثْلُ: لَا يَظْلِمِ النَّاسَ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "ضَعْ خَطًّا تَحْتَ فِعْلِ الأَمْرِ وَفِعْلِ النَّهْيِ فِي الآيَاتِ التَّالِيَةِ", tr: "Emir ve nehiy fiillerine dokun. Bir âyette birden fazla olabilir.", items: [
      W("﴿[اقْرَأْ] بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾", "Yaratan Rabbinin adıyla oku. (Alak 96/1)", "اقْرَأْ: emr-i hâzır."),
      W("﴿[فَلْيَعْبُدُوا] رَبَّ هَذَا البَيْتِ﴾", "Bu evin Rabbine ibadet etsinler. (Kureyş 106/3)", "فَلْيَعْبُدُوا: emr-i gâib (فَ + لْ)."),
      W("﴿يَا بَنِي آدَمَ [خُذُوا] زِينَتَكُمْ عِنْدَ كُلِّ مَسْجِدٍ [وَكُلُوا] [وَاشْرَبُوا] [وَلَا_تُسْرِفُوا] إِنَّهُ لَا يُحِبُّ المُسْرِفِينَ﴾", "Ey Âdemoğulları! Her mescide giderken süslenin; yiyin, için, israf etmeyin; O israf edenleri sevmez. (A'râf 7/31)", "خُذُوا، كُلُوا، اشْرَبُوا: emr-i hâzır; لَا تُسْرِفُوا: nehy-i hâzır. لَا يُحِبُّ nehiy değil (nefiy: merfû)."),
      W("﴿[وَسَارِعُوا] إِلَى مَغْفِرَةٍ مِنْ رَبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ﴾", "Rabbinizin bağışlamasına ve genişliği gökler ve yer kadar olan cennete koşun. (Âl-i İmrân 3/133)", "سَارِعُوا: emr-i hâzır."),
      W("﴿رَبَّنَا [لَا_تُؤَاخِذْنَا] إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا [وَلَا_تَحْمِلْ] عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا [وَلَا_تُحَمِّلْنَا] مَا لَا طَاقَةَ لَنَا بِهِ [وَاعْفُ] عَنَّا [وَاغْفِرْ] لَنَا [وَارْحَمْنَا] أَنْتَ مَوْلَانَا [فَانْصُرْنَا] عَلَى القَوْمِ الكَافِرِينَ﴾", "Rabbimiz! Unutur ya da yanılırsak bizi sorumlu tutma... bizi affet, bağışla, bize merhamet et; sen bizim mevlâmızsın, kâfirler topluluğuna karşı bize yardım et. (Bakara 2/286)", "Üç nehy-i hâzır (lâ + meczûm) ve dört emr-i hâzır. Allah'a yönelince anlamı duadır."),
      W("﴿[وَلَا_يَحْزُنْكَ] قَوْلُهُمْ إِنَّ العِزَّةَ لِلهِ جَمِيعًا وَهُوَ السَّمِيعُ العَلِيمُ﴾", "Onların sözü seni üzmesin; bütün izzet Allah'ındır. (Yûnus 10/65)", "لَا يَحْزُنْكَ: nehy-i gâib (fâil قَوْلُهُمْ)."),
      W("﴿[وَقُلْ] رَبِّ [أَنْزِلْنِي] مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ المُنْزِلِينَ﴾", "De ki: Rabbim, beni bereketli bir yere indir. (Mü'minûn 23/29)", "قُلْ ve أَنْزِلْنِي: emr-i hâzır."),
      W("﴿وَالَّذِينَ جَاءُوا مِنْ بَعْدِهِمْ يَقُولُونَ رَبَّنَا [اغْفِرْ] لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالإِيمَانِ [وَلَا_تَجْعَلْ] فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَحِيمٌ﴾", "Onlardan sonra gelenler: Rabbimiz, bizi ve bizden önce iman eden kardeşlerimizi bağışla; kalplerimizde iman edenlere karşı kin bırakma, derler. (Haşr 59/10)", "اغْفِرْ: emr-i hâzır; لَا تَجْعَلْ: nehy-i hâzır. يَقُولُونَ muzâri.")
    ]},
    { type: "classify", num: "٢", opts: EN_OPTS, ar: "عَيِّنْ فِعْلَ الأَمْرِ وَفِعْلَ النَّهْيِ فِي الأَحَادِيثِ التَّالِيَةِ وَبَيِّنْ نَوْعَهُ", tr: "Koyu yazılan fiil hangi tür? Dikkat: emrin cevabı olan meczûm muzâri (تَدْخُلُوا، يَحْفَظْكَ) emir değildir.", items: [
      { s: "أَيُّهَا النَّاسُ، <b class=\"hl\">أَطْعِمُوا</b> الطَّعَامَ", a: "eh", why: "Yemek yedirin: emr-i hâzır.", tr: "Ey insanlar, yemek yedirin." },
      { s: "<b class=\"hl\">وَأَفْشُوا</b> السَّلَامَ", a: "eh", why: "Selâmı yayın.", tr: "Selâmı yayın." },
      { s: "<b class=\"hl\">وَصِلُوا</b> الأَرْحَامَ", a: "eh", why: "Akrabayı gözetin.", tr: "Akrabalık bağlarını gözetin." },
      { s: "<b class=\"hl\">وَصَلُّوا</b> وَالنَّاسُ نِيَامٌ", a: "eh", why: "Namaz kılın.", tr: "İnsanlar uyurken namaz kılın." },
      { s: "<b class=\"hl\">تَدْخُلُوا</b> الجَنَّةَ بِسَلَامٍ", a: "x", why: "Emrin cevabı: meczûm muzâri (girersiniz).", tr: "Cennete selâmetle girersiniz." },
      { s: "<b class=\"hl\">لَا تَحَاسَدُوا</b>", a: "nh", why: "Birbirinizi kıskanmayın.", tr: "Birbirinizi kıskanmayın." },
      { s: "<b class=\"hl\">وَلَا تَبَاغَضُوا</b>، وَلَا تَدَابَرُوا", a: "nh", why: "Nehy-i hâzır.", tr: "Birbirinize buğzetmeyin, sırt çevirmeyin." },
      { s: "<b class=\"hl\">وَلَا يَبِعْ</b> بَعْضُكُمْ عَلَى بَيْعِ بَعْضٍ", a: "ng", why: "Fâil بَعْضُكُمْ (gâib): nehy-i gâib.", tr: "Biriniz diğerinin satışı üzerine satış yapmasın." },
      { s: "<b class=\"hl\">وَكُونُوا</b> عِبَادَ اللهِ إِخْوَانًا", a: "eh", why: "Kardeş olun.", tr: "Ey Allah'ın kulları, kardeş olun." },
      { s: "<b class=\"hl\">فَلْيَقُلْ</b> خَيْرًا", a: "eg", why: "Lâm-ı emr: hayır söylesin.", tr: "Hayır söylesin." },
      { s: "أَوْ <b class=\"hl\">لِيَصْمُتْ</b>", a: "eg", why: "Sussun.", tr: "Ya da sussun." },
      { s: "<b class=\"hl\">فَلْيُكْرِمْ</b> جَارَهُ", a: "eg", why: "Komşusuna ikram etsin.", tr: "Komşusuna ikram etsin." },
      { s: "<b class=\"hl\">أَمِطِ</b> الأَذَى عَنِ الطَّرِيقِ", a: "eh", why: "Kaldır: emr-i hâzır (أَمَاطَ).", tr: "Yoldan eziyet vereni kaldır." },
      { s: "يَا أَيُّهَا النَّاسُ، <b class=\"hl\">تُوبُوا</b> إِلَى اللهِ", a: "eh", why: "Tövbe edin.", tr: "Ey insanlar, Allah'a tövbe edin." },
      { s: "فَإِنِّي <b class=\"hl\">أَتُوبُ</b> فِي اليَوْمِ مِائَةَ مَرَّةٍ", a: "x", why: "Muzâri (tövbe ederim).", tr: "Ben günde yüz kere tövbe ederim." },
      { s: "<b class=\"hl\">دَعْ</b> مَا يُرِيبُكَ إِلَى مَا لَا يُرِيبُكَ", a: "eh", why: "Bırak: emr-i hâzır (وَدَعَ).", tr: "Şüpheli olanı bırak, şüphe vermeyene geç." },
      { s: "<b class=\"hl\">اِحْفَظِ</b> اللهَ يَحْفَظْكَ", a: "eh", why: "Allah'ı gözet: emr-i hâzır.", tr: "Allah'ı gözet ki seni korusun." },
      { s: "اِحْفَظِ اللهَ <b class=\"hl\">يَحْفَظْكَ</b>", a: "x", why: "Emrin cevabı: meczûm muzâri.", tr: "Seni korusun." },
      { s: "إِذَا سَأَلْتَ <b class=\"hl\">فَاسْأَلِ</b> اللهَ", a: "eh", why: "Allah'tan iste.", tr: "İstediğinde Allah'tan iste." },
      { s: "وَإِذَا اسْتَعَنْتَ <b class=\"hl\">فَاسْتَعِنْ</b> بِاللهِ", a: "eh", why: "Allah'tan yardım dile.", tr: "Yardım dilediğinde Allah'tan dile." },
      { s: "<b class=\"hl\">لَا تَحْقِرَنَّ</b> مِنَ المَعْرُوفِ شَيْئًا", a: "nh", why: "Küçümseme (te'kîd nûnu ile).", tr: "İyilikten hiçbir şeyi küçümseme." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · EMR-İ HÂZIR
{
  id: "u2", no: 2, ar: "أَمْرُ الحَاضِرِ", tr: "Emr-i Hâzır", short: "Emr-i hâzır", col: "nasb", legend: ["ref"],
  goals: ["Muzâriden emr-i hâzır yapmak: تَفْتَحُ ← اِفْتَحْ", "Emri karşıdakine göre çekmek: اِفْتَحْ، اِفْتَحَا، اِفْتَحُوا، اِفْتَحِي، اِفْتَحْنَ", "Hemzenin harekesini seçmek: اُكْتُبْ ama اِفْتَحْ"],
  examples: [
    { s: "يَا أَحْمَدُ:- / اِفْتَحِ:ref / الكِتَابَ:-", tr: "Ahmed, kitabı aç.", pair: "يَا خَدِيجَةُ:- / اِفْتَحِي:ref.ـي / الكِتَابَ:-", pairTr: "Hadîce, kitabı aç." },
    { s: "يَا طَالِبَانِ:- / اِفْتَحَا:ref.ـا / الكِتَابَ:-", tr: "İki öğrenci, kitabı açın.", pair: "يَا طَالِبَتَانِ:- / اِفْتَحَا:ref.ـا / الكِتَابَ:-", pairTr: "İki kız öğrenci, kitabı açın." },
    { s: "يَا طُلَّابُ:- / اِفْتَحُوا:ref.ـو / الكِتَابَ:-", tr: "Öğrenciler, kitabı açın.", pair: "يَا طَالِبَاتُ:- / اِفْتَحْنَ:ref.ـنَ / الكِتَابَ:-", pairTr: "Kız öğrenciler, kitabı açın." }
  ],
  rules: [
    { tr: "Muzâriden yapılır: baştaki <span class=\"ar\">تَـ</span> atılır, son harf sakin olur (ref nûnu düşer), ilk harf sakin kaldığı için başa <b>hemze</b> gelir.", ex: ["تَفْتَحُ ← فْتَحْ ← اِفْتَحْ", "تَفْتَحُونَ ← اِفْتَحُوا"] },
    { tr: "Muzâride ayn <b>damme</b> ise hemze <b>damme</b>, değilse <b>kesre</b>.", ex: ["يَكْتُبُ ← اُكْتُبْ", "يَفْتَحُ ← اِفْتَحْ", "يَجْلِسُ ← اِجْلِسْ"] },
    { tr: "Tasrif: <span class=\"ar\">اِجْلِسْ، اِجْلِسَا، اِجْلِسُوا · اِجْلِسِي، اِجْلِسَا، اِجْلِسْنَ</span>." },
    { tr: "<span class=\"ar\">أَفْعَلَ</span> babında hemze üstünlü ve okunur: <span class=\"ar\">أَكْرِمْ، أَطْعِمُوا</span>. <span class=\"ar\">افْتَعَلَ</span>'de: <span class=\"ar\">اِبْتَعِدُوا</span>." }
  ],
  kaide: ["تَصْرِيفُ أَمْرِ الحَاضِرِ (جَلَسَ): المُخَاطَبُ: اِجْلِسْ، اِجْلِسَا، اِجْلِسُوا. المُخَاطَبَةُ: اِجْلِسِي، اِجْلِسَا، اِجْلِسْنَ. يَا أَحْمَدُ اِفْتَحِ الكِتَابَ، يَا طَالِبَانِ اِفْتَحَا الكِتَابَ، يَا طُلَّابُ اِفْتَحُوا الكِتَابَ، يَا خَدِيجَةُ اِفْتَحِي الكِتَابَ، يَا طَالِبَتَانِ اِفْتَحَا الكِتَابَ، يَا طَالِبَاتُ اِفْتَحْنَ الكِتَابَ."],
  ex: [
    { type: "combo", num: "٣", ar: "حَوِّلِ الفِعْلَ المُضَارِعَ إِلَى فِعْلِ أَمْرٍ وَغَيِّرْ مَا يَلْزَمُ", tr: "Muzâriyi emre çevir: kime hitap ediliyor? Tekil, ikil, çoğul; erkek, kadın.", exHtml: "<span class=\"ar\">يَعْبُدُ كَرِيمٌ رَبَّهُ ← يَا كَرِيمُ، اُعْبُدْ رَبَّكَ · تَطْبُخُ زَيْنَبُ وَفَاطِمَةُ الطَّعَامَ ← يَا زَيْنَبُ وَفَاطِمَةُ، اُطْبُخَا الطَّعَامَ</span>", items: [
      CB("يَسْمَعُ صَالِحٌ صَوْتَ الأُسْتَاذِ.", ["يَا صَالِحُ،", ["اِسْمَعْ", "اُسْمُعْ", "اِسْمَعِي"], "صَوْتَ الأُسْتَاذِ."], [0], "Salih, hocanın sesini dinle.", "يَسْمَعُ (ayn fetha) → اِسْمَعْ."),
      CB("يَذْكُرُ عُمَرُ رَبَّهُ.", ["يَا عُمَرُ،", ["اِذْكَرْ", "اُذْكُرْ", "اُذْكُرِي"], "رَبَّكَ."], [1], "Ömer, Rabbini an.", "يَذْكُرُ (ayn damme) → اُذْكُرْ."),
      CB("تَجْلِسُ مَرْوَةُ فِي المَسْجِدِ.", ["يَا مَرْوَةُ،", ["اِجْلِسْ", "اِجْلِسْنَ", "اِجْلِسِي"], "فِي المَسْجِدِ."], [2], "Merve, mescitte otur.", "Kadına: اِجْلِسِي."),
      CB("تَفْعَلُ عَائِشَةُ خَيْرًا.", ["يَا عَائِشَةُ،", ["اِفْعَلِي", "اِفْعَلْ", "اُفْعُلِي"], "خَيْرًا."], [0], "Âişe, hayır yap.", "اِفْعَلِي."),
      CB("يَفْتَحُ المُوَظَّفَانِ أَبْوَابَ الكُلِّيَّةِ.", ["يَا مُوَظَّفَانِ،", ["اِفْتَحُوا", "اِفْتَحَا", "اِفْتَحْ"], "أَبْوَابَ الكُلِّيَّةِ."], [1], "İki memur, fakültenin kapılarını açın.", "İkil: اِفْتَحَا."),
      CB("يَذْكُرُ مُصْطَفَى وَفَاتِحٌ اللهَ.", ["يَا مُصْطَفَى وَفَاتِحُ،", ["اِذْكَرَا", "اُذْكُرُوا", "اُذْكُرَا"], "اللهَ."], [2], "Mustafa ve Fâtih, Allah'ı anın.", "İkil: اُذْكُرَا."),
      CB("تَقْرَأُ حَفْصَةُ وَسَوْدَةُ سُورَةَ الإِخْلَاصِ.", ["يَا حَفْصَةُ وَسَوْدَةُ،", ["اِقْرَآ", "اِقْرَئِي", "اِقْرَأْنَ"], "سُورَةَ الإِخْلَاصِ."], [0], "Hafsa ve Sevde, İhlâs sûresini okuyun.", "İkil: اِقْرَأَا ← اِقْرَآ (hemze + elif)."),
      CB("يَذْهَبُ العَامِلَانِ إِلَى المَصْنَعِ.", ["يَا عَامِلَانِ،", ["اِذْهَبُوا", "اِذْهَبَا", "اِذْهَبِي"], "إِلَى المَصْنَعِ."], [1], "İki işçi, fabrikaya gidin.", "اِذْهَبَا."),
      CB("يَحْفَظُ الطُّلَّابُ القُرْآنَ الكَرِيمَ.", ["يَا طُلَّابُ،", ["اِحْفَظَا", "اِحْفَظْنَ", "اِحْفَظُوا"], "القُرْآنَ الكَرِيمَ."], [2], "Öğrenciler, Kur'ân-ı Kerîm'i ezberleyin.", "Erkek çoğul: اِحْفَظُوا."),
      CB("يَرْكَبُ المُسَافِرُونَ الحَافِلَةَ.", ["يَا مُسَافِرُونَ،", ["اِرْكَبُوا", "اُرْكُبُوا", "اِرْكَبْنَ"], "الحَافِلَةَ."], [0], "Yolcular, otobüse binin.", "اِرْكَبُوا."),
      CB("يَسْبَحُ الأَطْفَالُ فِي البَحْرِ الأَسْوَدِ.", ["يَا أَطْفَالُ،", ["اِسْبَحَا", "اِسْبَحُوا", "اِسْبَحْ"], "فِي البَحْرِ الأَسْوَدِ."], [1], "Çocuklar, Karadeniz'de yüzün.", "اِسْبَحُوا."),
      CB("يَنْصَحُ الأَسَاتِذَةُ الطُّلَّابَ.", ["يَا أَسَاتِذَةُ،", ["اِنْصَحْنَ", "اُنْصُحُوا", "اِنْصَحُوا"], "الطُّلَّابَ."], [2], "Hocalar, öğrencilere nasihat edin.", "يَنْصَحُ (ayn fetha) → اِنْصَحُوا."),
      CB("تَذْهَبُ النِّسَاءُ إِلَى المُسْتَشْفَى.", ["يَا نِسَاءُ،", ["اِذْهَبْنَ", "اِذْهَبُوا", "اِذْهَبِي"], "إِلَى المُسْتَشْفَى."], [0], "Hanımlar, hastaneye gidin.", "Kadın çoğul: اِذْهَبْنَ."),
      CB("تَشْرَبُ المَرِيضَاتُ العَسَلَ.", ["يَا مَرِيضَاتُ،", ["اِشْرَبِي", "اِشْرَبْنَ", "اِشْرَبُوا"], "العَسَلَ."], [1], "Hasta kadınlar, bal için.", "اِشْرَبْنَ."),
      CB("تَتْرُكُ المُوَظَّفَاتُ السُّكَّرِيَّاتِ وَالنَّشَوِيَّاتِ.", ["يَا مُوَظَّفَاتُ،", ["اِتْرَكْنَ", "اُتْرُكُوا", "اُتْرُكْنَ"], "السُّكَّرِيَّاتِ وَالنَّشَوِيَّاتِ."], [2], "Kadın memurlar, şekerlileri ve nişastalıları bırakın.", "يَتْرُكُ (ayn damme) → اُتْرُكْنَ."),
      CB("تَغْسِلُ الطَّالِبَاتُ المَلَابِسَ.", ["يَا طَالِبَاتُ،", ["اِغْسِلْنَ", "اِغْسِلِي", "اُغْسُلْنَ"], "المَلَابِسَ."], [0], "Kız öğrenciler, elbiseleri yıkayın.", "اِغْسِلْنَ.")
    ]},
    { type: "pick", fill: true, num: "٤", ar: "حَوِّلِ الفِعْلَ الَّذِي بَيْنَ القَوْسَيْنِ إِلَى أَمْرِ الحَاضِرِ", tr: "Parantezdeki fiilden emr-i hâzır yap: kime hitap ediliyor? (ال'den önce sakin harf kesre alır.)", exHtml: "<span class=\"ar\">... كِتَابَكَ يَا نَدِيمُ. (فَتَحَ) ← اِفْتَحْ كِتَابَكَ يَا نَدِيمُ.</span>", items: [
      PK("___ المَسْجِدَ يَا مَحْمُودُ. <span class=\"muted\">(كَنَسَ)</span>", ["اُكْنُسِ", "اِكْنِسِ", "اُكْنُسُوا"], "Mahmud, mescidi süpür.", "يَكْنُسُ → اُكْنُسْ; ال'den önce kesre: اُكْنُسِ المَسْجِدَ.", 0),
      PK("___ الأَطْبَاقَ يَا عَائِشَةُ. <span class=\"muted\">(غَسَلَ)</span>", ["اِغْسِلِي", "اِغْسِلْ", "اُغْسُلِي"], "Âişe, tabakları yıka.", "Kadına: اِغْسِلِي.", 1),
      PK("___ الشَّايَ يَا شَبَابُ. <span class=\"muted\">(شَرِبَ)</span>", ["اِشْرَبُوا", "اِشْرَبْنَ", "اِشْرَبْ"], "Gençler, çay için.", "Erkek çoğul: اِشْرَبُوا.", 2),
      PK("___ القَهْوَةَ يَا شَابَّاتُ. <span class=\"muted\">(شَرِبَ)</span>", ["اِشْرَبْنَ", "اِشْرَبُوا", "اِشْرَبِي"], "Genç kızlar, kahve için.", "Kadın çoğul: اِشْرَبْنَ.", 0),
      PK("___ اللهَ أَيُّهَا المُسْلِمُونَ. <span class=\"muted\">(شَكَرَ)</span>", ["اُشْكُرُوا", "اِشْكَرُوا", "اُشْكُرْنَ"], "Ey Müslümanlar, Allah'a şükredin.", "يَشْكُرُ → اُشْكُرُوا.", 1),
      PK("___ العِلْمَ أَيَّتُهَا المُسْلِمَاتُ. <span class=\"muted\">(طَلَبَ)</span>", ["اُطْلُبْنَ", "اُطْلُبُوا", "اِطْلَبْنَ"], "Ey Müslüman kadınlar, ilim isteyin.", "يَطْلُبُ → اُطْلُبْنَ.", 2),
      PK("___ القُرْآنَ وَالحَدِيثَ يَا حَسَنُ. <span class=\"muted\">(قَرَأَ)</span>", ["اِقْرَإِ", "اُقْرُأْ", "اِقْرَئِي"], "Hasan, Kur'an ve hadis oku.", "اِقْرَأْ; ال'den önce kesre: اِقْرَإِ القُرْآنَ.", 0),
      PK("___ عَنِ السُّكَّرِ أَيُّهَا النَّاسُ. <span class=\"muted\">(اِبْتَعَدَ)</span>", ["اِبْتَعِدُوا", "اِبْتَعَدُوا", "اِبْتَعِدْ"], "Ey insanlar, şekerden uzak durun.", "يَبْتَعِدُ → اِبْتَعِدُوا.", 1)
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · EMR-İ GÂİB VE NEHİY
{
  id: "u3", no: 3, ar: "أَمْرُ الغَائِبِ وَالنَّهْيُ", tr: "Emr-i Gâib ve Nehiy", short: "Gâib · nehiy", col: "cerr", legend: ["ref", "cerr"],
  goals: ["Lâm-ı emr ile emr-i gâib yapmak: لِيَفْتَحْ", "Lâ-yı nâhiye ile nehy-i hâzır ve nehy-i gâib yapmak: لَا تَفْتَحْ، لَا يَفْتَحْ", "Fiil önde ise tekil kaldığını uygulamak: لِيَرْجِعِ الأَوْلَادُ"],
  examples: [
    { s: "لِيَفْتَحْ:ref / عَلِيٌّ:- / الحَاسُوبَ:-", tr: "Ali bilgisayarı açsın.", pair: "لَا يُهْمِلْ:cerr / عَلِيٌّ:- / الدَّرْسَ:-", pairTr: "Ali dersi ihmal etmesin." },
    { s: "لَا تَفْتَحْ:cerr / كِتَابَكَ:- / يَا نَدِيمُ:-", tr: "Kitabını açma ey Nedîm.", pair: "لَا تَجْلِسِي:cerr.ـي / فِي الحَدِيقَةِ:-", pairTr: "Bahçede oturma (kadın)." }
  ],
  rules: [
    { tr: "<b>Emr-i gâib</b> = <span class=\"ar\">لِـ</span> + meczûm muzâri.", ex: ["لِيَجْلِسْ", "لِيَجْلِسَا", "لِيَجْلِسُوا", "لِتَجْلِسْ", "لِتَجْلِسَا", "لِيَجْلِسْنَ"] },
    { tr: "<b>Nehy-i hâzır</b> = <span class=\"ar\">لَا</span> + meczûm muzâri (muhatab).", ex: ["لَا تَجْلِسْ", "لَا تَجْلِسَا", "لَا تَجْلِسُوا", "لَا تَجْلِسِي", "لَا تَجْلِسْنَ"] },
    { tr: "<b>Nehy-i gâib</b> = <span class=\"ar\">لَا</span> + meczûm muzâri (gâib).", ex: ["لَا يَجْلِسْ", "لَا يَجْلِسَا", "لَا يَجْلِسُوا", "لَا تَجْلِسْ", "لَا يَجْلِسْنَ"] },
    { tr: "Fiil önde ve fâil açık isimse fiil <b>tekil</b> kalır, yalnız cinsiyete uyar: <span class=\"ar\">لِيَرْجِعِ الأَوْلَادُ، لِتَكْنُسِ المَرْأَةُ</span>." },
    { tr: "Dört harfli fiillerde muzâri harfi dammelidir: <span class=\"ar\">لِيُنَظِّفْ، لِيُنْفِقْ، لِتُكْرِمْ، لَا يُهْمِلْ، لَا تُسْرِفُوا</span>." }
  ],
  kaide: [
    "تَصْرِيفُ أَمْرِ الغَائِبِ (جَلَسَ): الغَائِبُ: لِيَجْلِسْ، لِيَجْلِسَا، لِيَجْلِسُوا. الغَائِبَةُ: لِتَجْلِسْ، لِتَجْلِسَا، لِيَجْلِسْنَ.",
    "تَصْرِيفُ نَهْيِ الحَاضِرِ: المُخَاطَبُ: لَا تَجْلِسْ، لَا تَجْلِسَا، لَا تَجْلِسُوا. المُخَاطَبَةُ: لَا تَجْلِسِي، لَا تَجْلِسَا، لَا تَجْلِسْنَ.",
    "تَصْرِيفُ نَهْيِ الغَائِبِ: الغَائِبُ: لَا يَجْلِسْ، لَا يَجْلِسَا، لَا يَجْلِسُوا. الغَائِبَةُ: لَا تَجْلِسْ، لَا تَجْلِسَا، لَا يَجْلِسْنَ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "حَوِّلِ الفِعْلَ الَّذِي بَيْنَ القَوْسَيْنِ إِلَى نَهْيِ الحَاضِرِ", tr: "Nehy-i hâzır yap: لَا + meczûm muzâri; kime hitap ediliyor?", exHtml: "<span class=\"ar\">... كِتَابَكَ يَا نَدِيمُ. (فَتَحَ) ← لَا تَفْتَحْ كِتَابَكَ يَا نَدِيمُ.</span>", items: [
      PK("___ البَيْتَ يَا خَلِيلُ. <span class=\"muted\">(كَنَسَ)</span>", ["لَا تَكْنُسِ", "لَا تَكْنُسُ", "لَا تَكْنُسِي"], "Halil, evi süpürme.", "Meczûm; ال'den önce kesre.", 0),
      PK("___ المَلَابِسَ يَا زَيْنَبُ. <span class=\"muted\">(غَسَلَ)</span>", ["لَا تَغْسِلِي", "لَا تَغْسِلْ", "لَا تَغْسِلِينَ"], "Zeynep, elbiseleri yıkama.", "Kadına; nûn düşer: لَا تَغْسِلِي.", 1),
      PK("___ يَا شَبَابُ. <span class=\"muted\">(أَسْرَفَ)</span>", ["لَا تُسْرِفُوا", "لَا تَسْرِفُوا", "لَا تُسْرِفُونَ"], "Gençler, israf etmeyin.", "أَسْرَفَ – يُسْرِفُ (muzâri harfi damme).", 2),
      PK("___ القَهْوَةَ كَثِيرًا يَا شَابَّاتُ. <span class=\"muted\">(شَرِبَ)</span>", ["لَا تَشْرَبْنَ", "لَا تَشْرَبُوا", "لَا تَشْرَبِي"], "Genç kızlar, çok kahve içmeyin.", "Kadın çoğul: لَا تَشْرَبْنَ.", 0),
      PK("___ الصَّلَاةَ أَيُّهَا المُسْلِمُونَ. <span class=\"muted\">(تَرَكَ)</span>", ["لَا تَتْرُكُوا", "لَا تَتْرُكُونَ", "لَا تَتْرُكْ"], "Ey Müslümanlar, namazı terk etmeyin.", "Erkek çoğul; nûn düşer.", 1),
      PK("___ وَظِيفَتَكُنَّ أَيَّتُهَا المُسْلِمَاتُ. <span class=\"muted\">(أَهْمَلَ)</span>", ["لَا تُهْمِلْنَ", "لَا تَهْمَلْنَ", "لَا تُهْمِلُوا"], "Ey Müslüman kadınlar, görevinizi ihmal etmeyin.", "أَهْمَلَ – يُهْمِلُ → لَا تُهْمِلْنَ.", 2),
      PK("___ شَيْئًا تَحْتَ الضَّوْءِ الضَّعِيفِ يَا حَسَنُ. <span class=\"muted\">(قَرَأَ)</span>", ["لَا تَقْرَأْ", "لَا تَقْرَأُ", "لَا تَقْرَئِي"], "Hasan, zayıf ışıkta bir şey okuma.", "Meczûm: لَا تَقْرَأْ.", 0),
      PK("___ مِنَ القِطَارِ الآنَ أَيُّهَا الرُّكَّابُ. <span class=\"muted\">(نَزَلَ)</span>", ["لَا تَنْزِلُوا", "لَا تَنْزِلُونَ", "لَا يَنْزِلُوا"], "Ey yolcular, şimdi trenden inmeyin.", "Hitap: لَا تَنْزِلُوا.", 1)
    ]},
    { type: "pick", fill: true, num: "٦", ar: "حَوِّلِ الفِعْلَ الَّذِي بَيْنَ القَوْسَيْنِ إِلَى أَمْرِ الغَائِبِ", tr: "Emr-i gâib yap: لِـ + meczûm muzâri. Fiil önde → tekil.", exHtml: "<span class=\"ar\">... عَلِيٌّ الحَاسُوبَ. (فَتَحَ) ← لِيَفْتَحْ عَلِيٌّ الحَاسُوبَ.</span>", items: [
      PK("___ المُسَافِرُ فِي الفُنْدُقِ الكَبِيرِ. <span class=\"muted\">(نَزَلَ)</span>", ["لِيَنْزِلِ", "لِيَنْزِلُ", "لِتَنْزِلْ"], "Yolcu büyük otelde kalsın.", "لِيَنْزِلْ; ال'den önce kesre.", 0),
      PK("___ الأَوْلَادُ إِلَى البَيْتِ. <span class=\"muted\">(رَجَعَ)</span>", ["لِيَرْجِعِ", "لِيَرْجِعُوا", "لِتَرْجِعْ"], "Çocuklar eve dönsün.", "Fiil önde: tekil لِيَرْجِعْ.", 1),
      PK("___ المُدَرِّسُونَ قَاعَةَ المُؤْتَمَرِ. <span class=\"muted\">(دَخَلَ)</span>", ["لِيَدْخُلِ", "لِيَدْخُلُوا", "لِيَدْخُلُونَ"], "Öğretmenler konferans salonuna girsin.", "Fiil önde: tekil.", 2),
      PK("___ المَرْأَةُ الغُرْفَةَ. <span class=\"muted\">(كَنَسَ)</span>", ["لِتَكْنُسِ", "لِيَكْنُسِ", "لِتَكْنُسِي"], "Kadın odayı süpürsün.", "Müennes: لِتَكْنُسْ.", 0),
      PK("___ العَامِلُ الشَّارِعَ. <span class=\"muted\">(نَظَّفَ)</span>", ["لِيُنَظِّفِ", "لِيَنْظُفِ", "لِيُنَظِّفُ"], "İşçi caddeyi temizlesin.", "نَظَّفَ – يُنَظِّفُ → لِيُنَظِّفْ.", 1),
      PK("___ الغَنِيُّ مِنْ أَمْوَالِهِ. <span class=\"muted\">(أَنْفَقَ)</span>", ["لِيُنْفِقِ", "لِيَنْفِقِ", "أَنْفِقْ"], "Zengin mallarından infak etsin.", "أَنْفَقَ – يُنْفِقُ → لِيُنْفِقْ.", 2),
      PK("___ رَبَّةُ البَيْتِ جَارَتَهَا. <span class=\"muted\">(أَكْرَمَ)</span>", ["لِتُكْرِمْ", "لِيُكْرِمْ", "لِتَكْرُمْ"], "Ev hanımı komşusuna ikram etsin.", "Müennes; أَكْرَمَ – يُكْرِمُ.", 0),
      PK("___ الآبَاءُ أَوْلَادَهُمُ القُرْآنَ. <span class=\"muted\">(عَلَّمَ)</span>", ["لِيُعَلِّمِ", "لِيُعَلِّمُوا", "لِيَعْلَمِ"], "Babalar çocuklarına Kur'an öğretsin.", "Fiil önde: tekil; عَلَّمَ – يُعَلِّمُ.", 1)
    ]},
    { type: "pick", fill: true, num: "٧", ar: "حَوِّلِ الفِعْلَ الَّذِي بَيْنَ القَوْسَيْنِ إِلَى نَهْيِ الغَائِبِ", tr: "Nehy-i gâib yap: لَا + meczûm muzâri (gâib). Fiil önde → tekil.", exHtml: "<span class=\"ar\">... عَلِيٌّ الدَّرْسَ. (أَهْمَلَ) ← لَا يُهْمِلْ عَلِيٌّ الدَّرْسَ.</span>", items: [
      PK("___ مَحْمُودٌ المَسْجِدَ. <span class=\"muted\">(كَنَسَ)</span>", ["لَا يَكْنُسْ", "لَا تَكْنُسْ", "لَا يَكْنُسُ"], "Mahmud mescidi süpürmesin.", "Gâib, müzekker: لَا يَكْنُسْ.", 0),
      PK("___ عَائِشَةُ الأَطْبَاقَ. <span class=\"muted\">(غَسَلَ)</span>", ["لَا تَغْسِلْ", "لَا يَغْسِلْ", "لَا تَغْسِلِي"], "Âişe tabakları yıkamasın.", "Gâibe: لَا تَغْسِلْ. (لَا تَغْسِلِي \"yıkama\" olur.)", 1),
      PK("___ الشَّبَابُ الشَّايَ. <span class=\"muted\">(شَرِبَ)</span>", ["لَا يَشْرَبِ", "لَا يَشْرَبُوا", "لَا تَشْرَبُ"], "Gençler çay içmesin.", "Fiil önde: tekil; ال'den önce kesre.", 2),
      PK("___ الشَّابَّاتُ القَهْوَةَ. <span class=\"muted\">(شَرِبَ)</span>", ["لَا تَشْرَبِ", "لَا يَشْرَبْنَ", "لَا تَشْرَبْنَ"], "Genç kızlar kahve içmesin.", "Fiil önde, fâil müennes: لَا تَشْرَبْ.", 0),
      PK("___ النَّاسُ فِي الحَدِيقَةِ. <span class=\"muted\">(جَلَسَ)</span>", ["لَا يَجْلِسِ", "لَا يَجْلِسُوا", "لَا تَجْلِسُوا"], "İnsanlar bahçede oturmasın.", "Fiil önde: tekil.", 1),
      PK("___ الطُّلَّابُ العِلْمَ. <span class=\"muted\">(أَهْمَلَ)</span>", ["لَا يُهْمِلِ", "لَا يُهْمِلُوا", "لَا يَهْمَلِ"], "Öğrenciler ilmi ihmal etmesin.", "أَهْمَلَ – يُهْمِلُ; fiil önde tekil.", 2),
      PK("___ حَسَنٌ هَذِهِ القِصَّةَ. <span class=\"muted\">(قَرَأَ)</span>", ["لَا يَقْرَأْ", "لَا تَقْرَأْ", "لَا يَقْرَأُ"], "Hasan bu hikâyeyi okumasın.", "لَا يَقْرَأْ.", 0),
      PK("___ الأَوْلَادُ الحَافِلَةَ. <span class=\"muted\">(رَكِبَ)</span>", ["لَا يَرْكَبِ", "لَا يَرْكَبُوا", "لِيَرْكَبِ"], "Çocuklar otobüse binmesin.", "Fiil önde: tekil.", 1)
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ: رُؤْيَا السُّلْطَانِ عُثْمَانَ غَازِي", tr: "Okuma: Osman Gazi'nin Rüyası", short: "Okuma", col: "mi", legend: ["ref", "cerr"],
  goals: ["Bir metindeki mâzi ve muzâri fiilleri emre ve nehye çevirmek", "Çoğul fiilleri çoğul emir ve nehye çevirmek: يَشْرَبُونَ ← اِشْرَبُوا، لَا تَشْرَبُوا", "Metni anlamak"],
  examples: [
    { s: "نَزَلَ:- / ←:- / اِنْزِلْ:ref / ·:- / لَا تَنْزِلْ:cerr", tr: "indi → in! · inme!" },
    { s: "يَشْرَبُونَ:- / ←:- / اِشْرَبُوا:ref / ·:- / لَا تَشْرَبُوا:cerr", tr: "içiyorlar → için! · içmeyin!" }
  ],
  rules: [
    { tr: "Mâzi ya da muzâriyi emre çevirirken önce muzâriyi bul: <span class=\"ar\">نَزَلَ ← يَنْزِلُ ← اِنْزِلْ</span>." },
    { tr: "Çoğul fiil çoğul emir olur: <span class=\"ar\">جَعَلُوا ← اِجْعَلُوا، لَا تَجْعَلُوا</span>." },
    { tr: "Mezîd fiillerde de aynı yol: <span class=\"ar\">يَنْتَفِعُونَ ← اِنْتَفِعُوا، لَا تَنْتَفِعُوا</span>." }
  ],
  kaide: ["اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ حَوِّلِ الأَفْعَالَ المَاضِيَةَ وَالمُضَارِعَةَ إِلَى الأَمْرِ وَالنَّهْيِ."],
  ex: [
    { type: "reading", num: "٨", ar: "اقْرَأِ النَّصَّ التَّالِيَ", tr: "Metni oku; Türkçesine ve sorulara bak.", title: "رُؤْيَا السُّلْطَانِ عُثْمَانَ غَازِي",
      text: "كَانَ السُّلْطَانُ عُثْمَانُ غَازِي رَجُلًا صَالِحًا، شُجَاعًا، عَادِلًا، مُتَوَاضِعًا، صَادِقًا، حَلِيمًا، كَرِيمًا، ذَا حَيَاءٍ وَأَدَبٍ، مَاهِرًا فِي شُؤُونِ الدَّوْلَةِ، مُعَظِّمًا لِلدِّينِ وَأَهْلِهِ وَشَعَائِرِهِ. كَانَ يَذْهَبُ لِزِيَارَةِ أُسْتَاذِهِ الشَّيْخِ أَدَه بَالِي كَثِيرًا فِي زَاوِيَتِهِ. وَذَاتَ لَيْلَةٍ نَزَلَ ضَيْفًا عِنْدَ أُسْتَاذِهِ، فَلَمَّا أَرَادَ النَّوْمَ أَرْشَدُوهُ إِلَى غُرْفَةٍ لِلنَّوْمِ، فَدَخَلَهَا وَكَانَ عَلَى الجِدَارِ مُصْحَفٌ مُعَلَّقٌ، فَنَامَ جَالِسًا فَلَمْ يَمُدَّ رِجْلَيْهِ تَعْظِيمًا لِلْمُصْحَفِ. فَرَأَى فِي مَنَامِهِ قَمَرًا طَلَعَ مِنْ حِضْنِ الشَّيْخِ أَدَه بَالِي وَدَخَلَ فِي حِضْنِهِ، وَعِنْدَ ذَلِكَ نَبَتَتْ شَجَرَةٌ عَظِيمَةٌ مِنْ حِضْنِهِ سَدَّتْ ظِلَالُهَا الآفَاقَ، وَتَحْتَ ظِلَالِ هَذِهِ الشَّجَرَةِ جِبَالٌ عَالِيَةٌ، وَمِنْ تَحْتِ كُلِّ جَبَلٍ تَتَفَجَّرُ الأَنْهَارُ، وَالنَّاسُ يَنْتَفِعُونَ بِهَذِهِ الأَنْهَارِ؛ بَعْضُهُمْ يَشْرَبُونَ مِنْهَا، وَبَعْضُهُمْ يَسْقُونَ البَسَاتِينَ، وَبَعْضُهُمْ قَدْ جَعَلُوا مِنْهَا سُبُلًا لِلشُّرْبِ. فَلَمَّا اسْتَيْقَظَ عُثْمَانُ غَازِي قَصَّ هَذِهِ الرُّؤْيَا العَجِيبَةَ عَلَى أُسْتَاذِهِ، فَقَالَ لَهُ الشَّيْخُ: يَا بُنَيَّ! لَكَ البُشْرَى بِمَنْصِبِ السَّلْطَنَةِ وَلِذُرِّيَّتِكَ، وَسَيَعْلُو أَمْرُكَ وَيَنْتَفِعُ النَّاسُ بِكَ وَبِذُرِّيَّتِكَ، وَإِنِّي زَوَّجْتُكَ بِنْتِي مَالْخُونَ خَاتُونَ. وَهَكَذَا بَشَّرَ الشَّيْخُ أَدَه بَالِي عُثْمَانَ غَازِي بِأَنَّهُ وَذُرِّيَّتَهُ سَيَرِثُونَ الأَرْضَ وَيَحْكُمُونَ العَالَمَ. (بِتَصَرُّفٍ مِنْ: عَاشِقْ پَاشَا زَادَه تَارِيخِي)",
      textTr: "Sultan Osman Gazi'nin Rüyası. Sultan Osman Gazi salih, cesur, adil, mütevazı, doğru sözlü, yumuşak huylu, cömert, haya ve edep sahibi, devlet işlerinde maharetli, dine, ehline ve şiarlarına saygılı bir adamdı. Hocası Şeyh Edebali'yi zaviyesinde sık sık ziyarete giderdi. Bir gece hocasının yanında misafir kaldı. Uyumak isteyince onu yatacağı bir odaya götürdüler. Odaya girdi; duvarda asılı bir mushaf vardı. Mushafa saygıdan ayaklarını uzatmadı, oturarak uyudu. Rüyasında Şeyh Edebali'nin göğsünden bir ay doğup kendi göğsüne girdiğini gördü. Bunun üzerine göğsünden gölgesi ufukları kaplayan büyük bir ağaç bitti. Bu ağacın gölgesi altında yüksek dağlar vardı; her dağın altından nehirler fışkırıyordu. İnsanlar bu nehirlerden faydalanıyor; kimi su içiyor, kimi bahçeleri suluyor, kimi de çeşmeler yapıyordu. Osman Gazi uyanınca bu acayip rüyayı hocasına anlattı. Şeyh ona dedi ki: Oğulcuğum! Sana ve soyuna saltanat müjdesi var. İşin yükselecek, insanlar senden ve soyundan faydalanacak. Kızım Malhun Hatun'u sana nikâhladım. Böylece Şeyh Edebali, Osman Gazi'yi kendisinin ve soyunun yeryüzüne vâris olacağı ve dünyayı yöneteceği ile müjdeledi. (Âşıkpaşazâde Tarihi'nden uyarlanmıştır.)",
      qa: [
        { q: "لِمَاذَا نَامَ عُثْمَانُ غَازِي جَالِسًا؟", a: "نَامَ جَالِسًا تَعْظِيمًا لِلْمُصْحَفِ المُعَلَّقِ عَلَى الجِدَارِ.", tr: "Osman Gazi neden oturarak uyudu? Duvarda asılı mushafa saygıdan." },
        { q: "مَاذَا رَأَى فِي مَنَامِهِ؟", a: "رَأَى قَمَرًا طَلَعَ مِنْ حِضْنِ الشَّيْخِ وَدَخَلَ فِي حِضْنِهِ، ثُمَّ نَبَتَتْ شَجَرَةٌ عَظِيمَةٌ.", tr: "Rüyasında ne gördü? Şeyhin göğsünden doğup kendi göğsüne giren bir ay; sonra büyük bir ağaç bitti." },
        { q: "بِمَاذَا بَشَّرَهُ الشَّيْخُ؟", a: "بَشَّرَهُ بِمَنْصِبِ السَّلْطَنَةِ لَهُ وَلِذُرِّيَّتِهِ.", tr: "Şeyh onu neyle müjdeledi? Kendisi ve soyu için saltanatla." }
      ]
    },
    { type: "combo", num: "٨", ar: "حَوِّلِ الأَفْعَالَ المَاضِيَةَ وَالمُضَارِعَةَ إِلَى الأَمْرِ وَالنَّهْيِ", tr: "Metindeki fiili önce emre (sağdaki kutu), sonra nehye (soldaki kutu) çevir. Tekil fiil → \"sen\", çoğul fiil → \"siz\".", items: [
      CB("يَذْهَبُ <span class=\"muted\">(كَانَ يَذْهَبُ لِزِيَارَةِ أُسْتَاذِهِ)</span>", ["emir:", ["اِذْهَبْ", "اُذْهُبْ", "اِذْهَبُوا"], "nehiy:", ["لَا تَذْهَبُ", "لَا تَذْهَبْ", "لَا يَذْهَبْ"]], [0, 1], "git! · gitme!", "يَذْهَبُ (ayn fetha) → اِذْهَبْ; لَا تَذْهَبْ."),
      CB("نَزَلَ <span class=\"muted\">(نَزَلَ ضَيْفًا)</span>", ["emir:", ["اُنْزُلْ", "اِنْزِلْ", "اِنْزَلْ"], "nehiy:", ["لَا تَنْزِلْ", "لَا تَنْزِلُ", "لَا يَنْزِلْ"]], [1, 0], "in! · inme!", "يَنْزِلُ → اِنْزِلْ."),
      CB("دَخَلَ <span class=\"muted\">(فَدَخَلَهَا)</span>", ["emir:", ["اِدْخَلْ", "اُدْخُلْ", "اُدْخُلُوا"], "nehiy:", ["لَا تَدْخُلْ", "لَا تَدْخُلِي", "لَا تَدْخُلُ"]], [1, 0], "gir! · girme!", "يَدْخُلُ (ayn damme) → اُدْخُلْ."),
      CB("طَلَعَ <span class=\"muted\">(قَمَرًا طَلَعَ)</span>", ["emir:", ["اُطْلُعْ", "اِطْلَعْ", "اُطْلُعُوا"], "nehiy:", ["لَا يَطْلُعْ", "لَا تَطْلُعْ", "لَا تَطْلُعُ"]], [0, 1], "doğ! çık! · çıkma!", "يَطْلُعُ → اُطْلُعْ."),
      CB("يَشْرَبُونَ <span class=\"muted\">(بَعْضُهُمْ يَشْرَبُونَ)</span>", ["emir:", ["اِشْرَبُوا", "اِشْرَبُونَ", "اِشْرَبْ"], "nehiy:", ["لَا تَشْرَبُونَ", "لَا يَشْرَبُوا", "لَا تَشْرَبُوا"]], [0, 2], "için! · içmeyin!", "Çoğul: اِشْرَبُوا; لَا تَشْرَبُوا."),
      CB("جَعَلُوا <span class=\"muted\">(قَدْ جَعَلُوا مِنْهَا سُبُلًا)</span>", ["emir:", ["اُجْعُلُوا", "اِجْعَلُوا", "اِجْعَلْنَ"], "nehiy:", ["لَا تَجْعَلُوا", "لَا تَجْعَلْ", "لَا يَجْعَلُوا"]], [1, 0], "yapın! · yapmayın!", "يَجْعَلُ → اِجْعَلُوا."),
      CB("يَنْتَفِعُونَ <span class=\"muted\">(النَّاسُ يَنْتَفِعُونَ)</span>", ["emir:", ["اِنْتَفِعُوا", "اِنْتَفَعُوا", "اِنْتَفِعْ"], "nehiy:", ["لَا تَنْتَفِعُونَ", "لَا تَنْتَفِعُوا", "لَا يَنْتَفِعُوا"]], [0, 1], "faydalanın! · faydalanmayın!", "Mezîd: يَنْتَفِعُ → اِنْتَفِعُوا."),
      CB("يَحْكُمُونَ <span class=\"muted\">(وَيَحْكُمُونَ العَالَمَ)</span>", ["emir:", ["اِحْكَمُوا", "اُحْكُمْ", "اُحْكُمُوا"], "nehiy:", ["لَا تَحْكُمُوا", "لَا تَحْكُمُونَ", "لَا تَحْكُمْ"]], [2, 0], "hükmedin! · hükmetmeyin!", "يَحْكُمُ (ayn damme) → اُحْكُمُوا.")
    ]}
  ]
}
];

// Doğru Emir oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var RZ_POOL = [
  ["{اِقْرَإِ} القُرْآنَ يَا أَحْمَدُ.", ["اِقْرَإِ", "يَقْرَأُ", "لِيَقْرَأْ"], "hitap → emr-i hâzır", "Kur'an'ı oku ey Ahmed.", "u1"],
  ["{اِفْتَحِي} الكِتَابَ يَا فَاطِمَةُ.", ["اِفْتَحِي", "اِفْتَحْ", "تَفْتَحِينَ"], "kadına → ـي", "Kitabı aç ey Fâtıma.", "u1"],
  ["{لِيَذْهَبْ} عَلِيٌّ إِلَى المَكْتَبَةِ.", ["لِيَذْهَبْ", "اِذْهَبْ", "يَذْهَبُ"], "gâibe emir → لِـ", "Ali kütüphaneye gitsin.", "u1"],
  ["{لَا تَأْكُلِ} الحَرَامَ يَا جَمِيلُ.", ["لَا تَأْكُلِ", "لَا يَأْكُلِ", "لَا تَأْكُلُ"], "hitaba nehiy → لَا + meczûm", "Haram yeme ey Cemîl.", "u1"],
  ["{لَا يَذْهَبْ} أَحْمَدُ إِلَى السُّوقِ.", ["لَا يَذْهَبْ", "لَا تَذْهَبْ", "لَا يَذْهَبُ"], "gâibe nehiy", "Ahmed çarşıya gitmesin.", "u1"],
  ["﴿{فَلْيَعْبُدُوا} رَبَّ هَذَا البَيْتِ﴾", ["فَلْيَعْبُدُوا", "فَيَعْبُدُونَ", "فَاعْبُدُوا"], "emr-i gâib (فَ + لْ)", "Bu evin Rabbine ibadet etsinler.", "u1"],
  ["يَا طُلَّابُ، {اِفْتَحُوا} الكِتَابَ.", ["اِفْتَحُوا", "اِفْتَحُو", "اِفْتَحْنَ"], "erkek çoğul + elif-i fâriqa", "Öğrenciler, kitabı açın.", "u2"],
  ["يَا طَالِبَاتُ، {اِفْتَحْنَ} الكِتَابَ.", ["اِفْتَحْنَ", "اِفْتَحُوا", "اِفْتَحِي"], "kadın çoğul → ـنَ", "Kız öğrenciler, kitabı açın.", "u2"],
  ["يَا طَالِبَانِ، {اِفْتَحَا} الكِتَابَ.", ["اِفْتَحَا", "اِفْتَحَانِ", "اِفْتَحُوا"], "ikil → ـا (nûn düşer)", "İki öğrenci, kitabı açın.", "u2"],
  ["يَا كَرِيمُ، {اُعْبُدْ} رَبَّكَ.", ["اُعْبُدْ", "اِعْبُدْ", "اُعْبُدِي"], "يَعْبُدُ → اُ", "Kerîm, Rabbine ibadet et.", "u2"],
  ["يَا مَرْوَةُ، {اِجْلِسِي} فِي المَسْجِدِ.", ["اِجْلِسِي", "اِجْلِسْ", "اُجْلُسِي"], "kadına; يَجْلِسُ → اِ", "Merve, mescitte otur.", "u2"],
  ["يَا زَيْنَبُ وَفَاطِمَةُ، {اُطْبُخَا} الطَّعَامَ.", ["اُطْبُخَا", "اُطْبُخُوا", "اِطْبَخَا"], "ikil; يَطْبُخُ → اُ", "Zeynep ve Fâtıma, yemeği pişirin.", "u2"],
  ["يَا فَلَّاحُونَ، {اِجْمَعُوا} الثِّمَارَ.", ["اِجْمَعُوا", "اُجْمُعُوا", "اِجْمَعْنَ"], "erkek çoğul", "Çiftçiler, meyveleri toplayın.", "u2"],
  ["{لِيَفْتَحْ} عَلِيٌّ الحَاسُوبَ.", ["لِيَفْتَحْ", "لِيَفْتَحُ", "اِفْتَحْ"], "emr-i gâib, meczûm", "Ali bilgisayarı açsın.", "u3"],
  ["{لَا يُهْمِلْ} عَلِيٌّ الدَّرْسَ.", ["لَا يُهْمِلْ", "لَا تُهْمِلْ", "لَا يُهْمِلُ"], "nehy-i gâib", "Ali dersi ihmal etmesin.", "u3"],
  ["{لَا تَفْتَحْ} كِتَابَكَ يَا نَدِيمُ.", ["لَا تَفْتَحْ", "لَا يَفْتَحْ", "لَا تَفْتَحُ"], "nehy-i hâzır", "Kitabını açma ey Nedîm.", "u3"],
  ["{لَا تُسْرِفُوا} يَا شَبَابُ.", ["لَا تُسْرِفُوا", "لَا تُسْرِفُونَ", "لَا يُسْرِفُوا"], "nehy-i hâzır, çoğul", "Gençler, israf etmeyin.", "u3"],
  ["{لِيَرْجِعِ} الأَوْلَادُ إِلَى البَيْتِ.", ["لِيَرْجِعِ", "لِيَرْجِعُوا", "لِتَرْجِعْ"], "fiil önde → tekil", "Çocuklar eve dönsün.", "u3"],
  ["{لِتَكْنُسِ} المَرْأَةُ الغُرْفَةَ.", ["لِتَكْنُسِ", "لِيَكْنُسِ", "اُكْنُسِي"], "müennes gâib → لِتَـ", "Kadın odayı süpürsün.", "u3"],
  ["{لَا تَغْسِلْ} عَائِشَةُ الأَطْبَاقَ.", ["لَا تَغْسِلْ", "لَا تَغْسِلِي", "لَا يَغْسِلْ"], "nehy-i gâib, müennes", "Âişe tabakları yıkamasın.", "u3"],
  ["يَا عُثْمَانُ، {اِنْزِلْ} ضَيْفًا عِنْدَ أُسْتَاذِكَ.", ["اِنْزِلْ", "اُنْزُلْ", "نَزَلَ"], "يَنْزِلُ → اِنْزِلْ", "Osman, hocanın yanında misafir kal.", "u4"],
  ["يَا نَاسُ، {اِنْتَفِعُوا} بِهَذِهِ الأَنْهَارِ.", ["اِنْتَفِعُوا", "يَنْتَفِعُونَ", "اِنْتَفَعُوا"], "mezîd emir, çoğul", "Ey insanlar, bu nehirlerden faydalanın.", "u4"],
  ["يَا بُنَيَّ، {لَا تَمُدَّ} رِجْلَيْكَ إِلَى المُصْحَفِ.", ["لَا تَمُدَّ", "لَا تَمُدُّ", "لَا يَمُدَّ"], "nehiy (muzâaf fiilde fetha)", "Oğulcuğum, ayaklarını mushafa uzatma.", "u4"],
  ["{اُدْخُلْ} هَذِهِ الغُرْفَةَ لِلنَّوْمِ.", ["اُدْخُلْ", "اِدْخَلْ", "دَخَلَ"], "يَدْخُلُ → اُ", "Uyumak için bu odaya gir.", "u4"]
];
var HAFIZA = {
  me: { name: "Muzâri ↔ emir", pairs: [["تَكْتُبُ", "اُكْتُبْ"], ["تَجْلِسُ", "اِجْلِسْ"], ["تَفْتَحُ", "اِفْتَحْ"], ["تَجْلِسِينَ", "اِجْلِسِي"], ["تَكْتُبُونَ", "اُكْتُبُوا"], ["تَفْتَحْنَ", "اِفْتَحْنَ"], ["تَذْكُرَانِ", "اُذْكُرَا"], ["تَشْرَبِينَ", "اِشْرَبِي"], ["تَدْخُلُونَ", "اُدْخُلُوا"], ["تَسْمَعُ", "اِسْمَعْ"], ["تَحْفَظْنَ", "اِحْفَظْنَ"], ["تَنْصُرُ", "اُنْصُرْ"]] },
  en: { name: "Emir ↔ nehiy", pairs: [["اِجْلِسْ", "لَا تَجْلِسْ"], ["اُكْتُبُوا", "لَا تَكْتُبُوا"], ["اِفْتَحِي", "لَا تَفْتَحِي"], ["اِذْهَبَا", "لَا تَذْهَبَا"], ["اِشْرَبْنَ", "لَا تَشْرَبْنَ"], ["لِيَدْخُلْ", "لَا يَدْخُلْ"], ["لِتَكْنُسْ", "لَا تَكْنُسْ"], ["لِيَرْكَبُوا", "لَا يَرْكَبُوا"], ["اُنْصُرْ", "لَا تَنْصُرْ"], ["اِسْمَعِي", "لَا تَسْمَعِي"], ["لِيَحْفَظْنَ", "لَا يَحْفَظْنَ"], ["اُدْخُلُوا", "لَا تَدْخُلُوا"]] },
  ze: { name: "Zamir ↔ emir", pairs: [["أَنْتَ", "اِفْتَحْ"], ["أَنْتُمْ", "اِفْتَحُوا"], ["أَنْتِ", "اِفْتَحِي"], ["أَنْتُنَّ", "اِفْتَحْنَ"], ["هُوَ", "لِيَفْتَحْ"], ["هِيَ", "لِتَفْتَحْ"], ["هُمْ", "لِيَفْتَحُوا"], ["هُنَّ", "لِيَفْتَحْنَ"]] }
};
var KARTLAR = [
  ["Emir ve nehiy neyden yapılır?", "Muzâri lafzından: تَكْتُبُ ← اُكْتُبْ، لَا تَكْتُبْ"],
  ["Emrin iki türü?", "Emr-i hâzır: اُكْتُبْ (yaz). Emr-i gâib: لِيَكْتُبْ (yazsın)."],
  ["Nehyin iki türü?", "Nehy-i hâzır: لَا تَظْلِمْ (zulmetme). Nehy-i gâib: لَا يَظْلِمْ (zulmetmesin)."],
  ["Emr-i hâzır nasıl yapılır?", "تَـ atılır, son sakin, başa hemze: تَفْتَحُ ← اِفْتَحْ"],
  ["Hemze ne zaman اُ?", "Muzâride ayn damme ise: يَكْتُبُ ← اُكْتُبْ; değilse اِ: اِفْتَحْ، اِجْلِسْ"],
  ["Emr-i hâzır tasrifi?", "اِجْلِسْ اِجْلِسَا اِجْلِسُوا · اِجْلِسِي اِجْلِسَا اِجْلِسْنَ"],
  ["Emr-i gâib tasrifi?", "لِيَجْلِسْ لِيَجْلِسَا لِيَجْلِسُوا · لِتَجْلِسْ لِتَجْلِسَا لِيَجْلِسْنَ"],
  ["Nehy-i hâzır tasrifi?", "لَا تَجْلِسْ لَا تَجْلِسَا لَا تَجْلِسُوا · لَا تَجْلِسِي لَا تَجْلِسَا لَا تَجْلِسْنَ"],
  ["Lâm-ı emr ve lâ-yı nâhiye ne yapar?", "Muzâriyi meczûm yapar: son sakin, ref nûnu düşer (nûn-ı nisve kalır)."],
  ["فَلْيَعْبُدُوا'daki lâm neden sakin?", "وَ ya da فَ'den sonra lâm-ı emr sakin okunur."],
  ["لِيَرْجِعِ الأَوْلَادُ neden tekil?", "Fiil önde ve fâil açık isim: fiil tekil kalır."],
  ["اِحْفَظِ اللهَ يَحْفَظْكَ'de يَحْفَظْكَ emir mi?", "Hayır; emrin cevabı olan meczûm muzâri (seni korur)."]
];
