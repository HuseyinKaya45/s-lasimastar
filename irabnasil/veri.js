// ================= VERİ: İ’râb Nasıl Yapılır? (كَيْفَ نُعْرِبُ؟) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "المَوْقِعُ", tr: "1. Görevi" }, nasb: { ar: "الحُكْمُ", tr: "2. Hükmü" }, mi: { ar: "العَلَامَةُ", tr: "3. Alâmeti" },
  mz: { ar: "السَّبَبُ", tr: "4. Yeri / sebebi" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// Merdivenin dört adımı: [numara, ad, renk, soru]
var STEP = { g: ["1", "Görevi", "cerr", "Cümlede ne?"], h: ["2", "Hükmü", "nasb", "Merfû mu, mansûb mu, mecrûr mu, mebnî mi?"], a: ["3", "Alâmeti", "mi", "Hangi işaretle?"], y: ["4", "Yeri / sebebi", "mz", "Görünüyor mu? Neden?"] };
var STEPS4 = [["g", "1. Görevi", "المَوْقِعُ", "cerr"], ["h", "2. Hükmü", "الحُكْمُ", "nasb"], ["a", "3. Alâmeti", "العَلَامَةُ", "mi"], ["y", "4. Yeri / sebebi", "السَّبَبُ", "mz"]];
var HK = { r: ["مَرْفُوعٌ", "وَعَلَامَةُ رَفْعِهِ"], n: ["مَنْصُوبٌ", "وَعَلَامَةُ نَصْبِهِ"], c: ["مَجْرُورٌ", "وَعَلَامَةُ جَرِّهِ"], j: ["مَجْزُومٌ", "وَعَلَامَةُ جَزْمِهِ"] };
var AL = { d: "الضَّمَّةُ", f: "الفَتْحَةُ", k: "الكَسْرَةُ", s: "السُّكُونُ", e: "الأَلِفُ", w: "الوَاوُ", y: "اليَاءُ", nn: "ثُبُوتُ النُّونِ", hn: "حَذْفُ النُّونِ" };
var YER = { z: "الظَّاهِرَةُ عَلَى آخِرِهِ", zm: "الظَّاهِرُ عَلَى آخِرِهِ", m: "لِأَنَّهُ مُثَنًّى", cm: "لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ", cf: "لِأَنَّهُ جَمْعُ مُؤَنَّثٍ سَالِمٌ", h5: "لِأَنَّهُ مِنَ الأَفْعَالِ الخَمْسَةِ" };
var LAM = "لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ";
// Terimlerin Türkçesi
var TT = {
  "مُبْتَدَأٌ": "mübtedâ", "خَبَرٌ": "haber", "فَاعِلٌ": "fâil", "مَفْعُولٌ بِهِ": "mef’ûlün bih (nesne)", "مُضَافٌ إِلَيْهِ": "muzâfun ileyh", "نَعْتٌ": "na’t (sıfat)",
  "اسْمٌ مَجْرُورٌ": "mecrûr isim", "فِعْلٌ مَاضٍ": "mâzi fiil", "فِعْلٌ مُضَارِعٌ": "muzâri fiil", "حَرْفُ جَرٍّ": "harf-i cer", "حَرْفُ جَزْمٍ": "cezm harfi",
  "مَرْفُوعٌ": "merfû", "مَنْصُوبٌ": "mansûb", "مَجْرُورٌ": "mecrûr", "مَجْزُومٌ": "meczûm", "مَبْنِيٌّ": "mebnî",
  "وَعَلَامَةُ رَفْعِهِ": "ref’ alâmeti", "وَعَلَامَةُ نَصْبِهِ": "nasb alâmeti", "وَعَلَامَةُ جَرِّهِ": "cer alâmeti", "وَعَلَامَةُ جَزْمِهِ": "cezm alâmeti",
  "الضَّمَّةُ": "ötre (damme)", "الفَتْحَةُ": "üstün (fetha)", "الكَسْرَةُ": "esre (kesra)", "السُّكُونُ": "cezm (sükûn)", "الأَلِفُ": "elif", "الوَاوُ": "vâv", "اليَاءُ": "yâ",
  "ثُبُوتُ النُّونِ": "nûnun kalması", "حَذْفُ النُّونِ": "nûnun düşmesi",
  "عَلَى الفَتْحِ": "üstün üzere", "عَلَى الضَّمِّ": "ötre üzere", "عَلَى الكَسْرِ": "esre üzere", "عَلَى السُّكُونِ": "sükûn üzere",
  "الظَّاهِرَةُ عَلَى آخِرِهِ": "sonunda görünen", "الظَّاهِرُ عَلَى آخِرِهِ": "sonunda görünen", "لِأَنَّهُ مُثَنًّى": "çünkü müsennâdır", "لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ": "çünkü cem-i müzekker sâlimdir",
  "لِأَنَّهُ جَمْعُ مُؤَنَّثٍ سَالِمٌ": "çünkü cem-i müennes sâlimdir", "لِأَنَّهُ مِنَ الأَفْعَالِ الخَمْسَةِ": "çünkü ef’âl-i hamsedendir", "لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ": "i’rabda yeri yoktur", "وَهُوَ مُضَافٌ": "ve o muzâftır",
  "بِـ«فِي»": "«fî» ile", "بِـ«إِلَى»": "«ilâ» ile", "بِـ«عَلَى»": "«alâ» ile", "بِـ«مِنْ»": "«min» ile"
};
// Parça üreticiler: [metin, adım]
function MU(gorev, h, a, y, ek) { var p = [[gorev, "g"], [HK[h][0], "h"], [HK[h][1], "a"], [AL[a], "a"], [YER[y], "y"]]; if (ek) p.push([ek, "y"]); return p; }
function MJ(harf, a, y) { return [["اسْمٌ مَجْرُورٌ", "g"], ["بِـ«" + harf + "»", "h"], ["وَعَلَامَةُ جَرِّهِ", "a"], [AL[a], "a"], [YER[y], "y"]]; }
function MB(gorev, bina, lam) { var p = [[gorev, "g"], ["مَبْنِيٌّ", "h"], ["عَلَى " + bina, "a"]]; if (lam) p.push([LAM, "y"]); return p; }
var MAZI = function () { return MB("فِعْلٌ مَاضٍ", "الفَتْحِ"); };
var HARF = function () { return MB("حَرْفُ جَرٍّ", "السُّكُونِ", 1); };
// Şaşırtıcı parça grupları
var GRP = [
  ["مَرْفُوعٌ", "مَنْصُوبٌ", "مَجْرُورٌ", "مَجْزُومٌ"], ["وَعَلَامَةُ رَفْعِهِ", "وَعَلَامَةُ نَصْبِهِ", "وَعَلَامَةُ جَرِّهِ", "وَعَلَامَةُ جَزْمِهِ"],
  ["الضَّمَّةُ", "الفَتْحَةُ", "الكَسْرَةُ", "السُّكُونُ"], ["الأَلِفُ", "اليَاءُ", "الوَاوُ"], ["ثُبُوتُ النُّونِ", "حَذْفُ النُّونِ"],
  ["عَلَى الفَتْحِ", "عَلَى الضَّمِّ", "عَلَى الكَسْرِ", "عَلَى السُّكُونِ"], ["مُبْتَدَأٌ", "خَبَرٌ", "فَاعِلٌ", "مَفْعُولٌ بِهِ"], ["لِأَنَّهُ مُثَنًّى", "لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ", "لِأَنَّهُ جَمْعُ مُؤَنَّثٍ سَالِمٌ"]
];
function alts(t) { for (var i = 0; i < GRP.length; i++) { var g = GRP[i], k = g.indexOf(t); if (k >= 0) return [g[(k + 1) % g.length], g[(k + 2) % g.length]].filter(function (x) { return x !== t; }); } return []; }
function EXTRA(p) {
  var have = p.map(function (x) { return x[0]; }), out = [];
  ["h", "a", "g"].forEach(function (st) { p.forEach(function (x) { if (x[1] !== st) return; var a = alts(x[0])[0]; if (a && have.indexOf(a) < 0 && out.indexOf(a) < 0 && out.length < 3) out.push(a); }); });
  if (have.indexOf("مَبْنِيٌّ") >= 0 && out.length < 3) out.push("مَرْفُوعٌ");
  return out;
}
function full(p) { return p.map(function (x) { return x[0]; }).join(" "); }
function fullTr(p) { return p.map(function (x) { return TT[x[0]] || x[0]; }).join(", "); }
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
// Cümleler: { s, tr, w: [[kelime, parçalar, not]] }
var MF = "مَفْعُولٌ بِهِ";
var SENT = [
  { u: "u1", s: "الطَّالِبُ مُجْتَهِدٌ.", tr: "Öğrenci çalışkandır.", w: [["الطَّالِبُ", MU("مُبْتَدَأٌ", "r", "d", "z")], ["مُجْتَهِدٌ", MU("خَبَرٌ", "r", "d", "z")]] },
  { u: "u1", s: "البَيْتُ كَبِيرٌ.", tr: "Ev büyüktür.", w: [["البَيْتُ", MU("مُبْتَدَأٌ", "r", "d", "z")], ["كَبِيرٌ", MU("خَبَرٌ", "r", "d", "z")]] },
  { u: "u1", s: "العِلْمُ نُورٌ.", tr: "İlim nurdur.", w: [["العِلْمُ", MU("مُبْتَدَأٌ", "r", "d", "z")], ["نُورٌ", MU("خَبَرٌ", "r", "d", "z")]] },
  { u: "u1", s: "الصِّدْقُ جَمِيلٌ.", tr: "Doğruluk güzeldir.", w: [["الصِّدْقُ", MU("مُبْتَدَأٌ", "r", "d", "z")], ["جَمِيلٌ", MU("خَبَرٌ", "r", "d", "z")]] },
  { u: "u2", s: "كَتَبَ الطَّالِبُ الدَّرْسَ.", tr: "Öğrenci dersi yazdı.", w: [["كَتَبَ", MAZI()], ["الطَّالِبُ", MU("فَاعِلٌ", "r", "d", "z")], ["الدَّرْسَ", MU(MF, "n", "f", "z")]] },
  { u: "u2", s: "يَقْرَأُ المُعَلِّمُ الكِتَابَ.", tr: "Öğretmen kitabı okuyor.", w: [["يَقْرَأُ", MU("فِعْلٌ مُضَارِعٌ", "r", "d", "z")], ["المُعَلِّمُ", MU("فَاعِلٌ", "r", "d", "z")], ["الكِتَابَ", MU(MF, "n", "f", "z")]] },
  { u: "u2", s: "فَتَحَ أَحْمَدُ البَابَ.", tr: "Ahmed kapıyı açtı.", w: [["فَتَحَ", MAZI()], ["أَحْمَدُ", MU("فَاعِلٌ", "r", "d", "z")], ["البَابَ", MU(MF, "n", "f", "z")]] },
  { u: "u3", s: "ذَهَبَ أَحْمَدُ إِلَى المَدْرَسَةِ.", tr: "Ahmed okula gitti.", w: [["ذَهَبَ", MAZI()], ["أَحْمَدُ", MU("فَاعِلٌ", "r", "d", "z")], ["إِلَى", HARF()], ["المَدْرَسَةِ", MJ("إِلَى", "k", "z")]] },
  { u: "u3", s: "كِتَابُ الطَّالِبِ جَدِيدٌ.", tr: "Öğrencinin kitabı yenidir.", w: [["كِتَابُ", MU("مُبْتَدَأٌ", "r", "d", "z", "وَهُوَ مُضَافٌ")], ["الطَّالِبِ", MU("مُضَافٌ إِلَيْهِ", "c", "k", "z")], ["جَدِيدٌ", MU("خَبَرٌ", "r", "d", "z")]] },
  { u: "u3", s: "جَاءَ طَالِبٌ مُجْتَهِدٌ.", tr: "Çalışkan bir öğrenci geldi.", w: [["جَاءَ", MAZI()], ["طَالِبٌ", MU("فَاعِلٌ", "r", "d", "z")], ["مُجْتَهِدٌ", MU("نَعْتٌ", "r", "d", "z")]] },
  { u: "u3", s: "جَلَسَ الوَلَدُ فِي البَيْتِ.", tr: "Çocuk evde oturdu.", w: [["جَلَسَ", MAZI()], ["الوَلَدُ", MU("فَاعِلٌ", "r", "d", "z")], ["فِي", HARF()], ["البَيْتِ", MJ("فِي", "k", "z")]] },
  { u: "u4", s: "الطَّالِبَانِ مُجْتَهِدَانِ.", tr: "İki öğrenci çalışkandır.", w: [["الطَّالِبَانِ", MU("مُبْتَدَأٌ", "r", "e", "m")], ["مُجْتَهِدَانِ", MU("خَبَرٌ", "r", "e", "m")]] },
  { u: "u4", s: "المُسْلِمُونَ صَادِقُونَ.", tr: "Müslümanlar doğru sözlüdür.", w: [["المُسْلِمُونَ", MU("مُبْتَدَأٌ", "r", "w", "cm")], ["صَادِقُونَ", MU("خَبَرٌ", "r", "w", "cm")]] },
  { u: "u4", s: "شَكَرَ المُدِيرُ المُعَلِّمِينَ.", tr: "Müdür öğretmenlere teşekkür etti.", w: [["شَكَرَ", MAZI()], ["المُدِيرُ", MU("فَاعِلٌ", "r", "d", "z")], ["المُعَلِّمِينَ", MU(MF, "n", "y", "cm")]] },
  { u: "u4", s: "شَكَرَ المُعَلِّمُ الطَّالِبَاتِ.", tr: "Öğretmen kız öğrencilere teşekkür etti.", w: [["شَكَرَ", MAZI()], ["المُعَلِّمُ", MU("فَاعِلٌ", "r", "d", "z")], ["الطَّالِبَاتِ", MU(MF, "n", "k", "cf")]] },
  { u: "u4", s: "الطُّلَّابُ يَكْتُبُونَ.", tr: "Öğrenciler yazıyor.", w: [["الطُّلَّابُ", MU("مُبْتَدَأٌ", "r", "d", "z")], ["يَكْتُبُونَ", MU("فِعْلٌ مُضَارِعٌ", "r", "nn", "h5")]] },
  { u: "u4", s: "لَمْ يَذْهَبْ خَالِدٌ.", tr: "Hâlid gitmedi.", w: [["لَمْ", MB("حَرْفُ جَزْمٍ", "السُّكُونِ", 1)], ["يَذْهَبْ", MU("فِعْلٌ مُضَارِعٌ", "j", "s", "zm")], ["خَالِدٌ", MU("فَاعِلٌ", "r", "d", "z")]] },
  { u: "u5", s: "دَخَلَ المُعَلِّمُ الفَصْلَ.", tr: "Öğretmen sınıfa girdi.", w: [["دَخَلَ", MAZI()], ["المُعَلِّمُ", MU("فَاعِلٌ", "r", "d", "z")], ["الفَصْلَ", MU(MF, "n", "f", "z")]] },
  { u: "u5", s: "الطُّلَّابُ مُجْتَهِدُونَ.", tr: "Öğrenciler çalışkandır.", w: [["الطُّلَّابُ", MU("مُبْتَدَأٌ", "r", "d", "z")], ["مُجْتَهِدُونَ", MU("خَبَرٌ", "r", "w", "cm")]] },
  { u: "u5", s: "كَتَبَ المُعَلِّمُ الدَّرْسَ عَلَى السَّبُّورَةِ.", tr: "Öğretmen dersi tahtaya yazdı.", w: [["كَتَبَ", MAZI()], ["المُعَلِّمُ", MU("فَاعِلٌ", "r", "d", "z")], ["الدَّرْسَ", MU(MF, "n", "f", "z")], ["عَلَى", HARF()], ["السَّبُّورَةِ", MJ("عَلَى", "k", "z")]] },
  { u: "u5", s: "قَرَأَ الطُّلَّابُ الدَّرْسَ.", tr: "Öğrenciler dersi okudu.", w: [["قَرَأَ", MAZI()], ["الطُّلَّابُ", MU("فَاعِلٌ", "r", "d", "z")], ["الدَّرْسَ", MU(MF, "n", "f", "z")]] }
];
var NOTE = {
  "يَكْتُبُونَ": "Ef’âl-i hamse: ref’ alâmeti nûnun kalmasıdır. (Fiil, fâiliyle birlikte haber konumundadır.)",
  "يَذْهَبْ": "لَمْ cezm eder: sükûn erkek kelime olduğu için الظَّاهِرُ (müzekker) denir.",
  "الطَّالِبَاتِ": "Cem-i müennes sâlim nasb hâlinde esre alır.",
  "كِتَابُ": "Muzâf kendi görevine göre i’rab edilir; sonuna وَهُوَ مُضَافٌ eklenir.",
  "إِلَى": "Harfler mebnîdir ve i’rabda yeri yoktur.", "فِي": "Harfler mebnîdir ve i’rabda yeri yoktur.", "عَلَى": "Harfler mebnîdir ve i’rabda yeri yoktur.",
  "لَمْ": "Cezm harfi mebnîdir, i’rabda yeri yoktur."
};
function orderItems(u) {
  var out = [];
  SENT.forEach(function (S) { if (S.u !== u) return; S.w.forEach(function (w) { out.push({ s: HL(S.s, w[0]), w: w[0], p: w[1], x: EXTRA(w[1]), tr: S.tr + " · " + w[0] + ": " + fullTr(w[1]) + ".", why: NOTE[w[0]] || "" }); }); });
  return out;
}
// Harf harf yazılacak terimler: [terim, Türkçe, okunuş, ipucu]
var SPELL = {
  u1: [["مُبْتَدَأٌ", "Mübtedâ", "mubtedeün", "Cümlenin başındaki isim. Sondaki elif hemzelidir: أ"], ["خَبَرٌ", "Haber", "haberun", "Mübtedâyı tamamlayan; ح değil خ"], ["مَرْفُوعٌ", "Merfû", "merfûun", "Sonunda ع var"], ["الضَّمَّةُ", "Ötre (damme)", "eddammetu", "ض ile; sonu tâ-yı merbûta: ة"], ["عَلَامَةُ", "Alâmet", "alâmetu", "Sonu ة"], ["رَفْعِهِ", "Onun ref’i", "ref’ihî", "Sondaki ه zamirdir, ة değil"], ["الظَّاهِرَةُ", "Görünen", "ezzâhiratu", "ظ ile; ض değil"], ["آخِرِهِ", "Sonunda", "âhirihî", "Medli elif: آ"], ["إِعْرَابٌ", "İ’râb", "i’râbun", "Hemze elifin altında: إ"]],
  u2: [["فِعْلٌ", "Fiil", "fi’lun", ""], ["مَاضٍ", "Mâzi", "mâdın", "ض ile; ظ değil"], ["مَبْنِيٌّ", "Mebnî", "mebniyyun", "Sonu noktalı yâ: ي"], ["فَاعِلٌ", "Fâil", "fâilun", ""], ["مَفْعُولٌ بِهِ", "Mef’ûlün bih", "mef’ûlun bihî", "İki kelime: araya boşluk koy"], ["مَنْصُوبٌ", "Mansûb", "mansûbun", "ص ile; س değil"], ["الفَتْحَةُ", "Üstün (fetha)", "elfethatu", "ت ve ح; sonu ة"], ["مُضَارِعٌ", "Muzâri", "muzâriun", "ض ile"], ["نَصْبِهِ", "Onun nasbı", "nasbihî", "ص ile; sonu ه"]],
  u3: [["حَرْفُ جَرٍّ", "Harf-i cer", "harfu cerrin", "İki kelime; ح ile başlar"], ["مَجْرُورٌ", "Mecrûr", "mecrûrun", ""], ["الكَسْرَةُ", "Esre (kesra)", "elkesratu", "ك ile; sonu ة"], ["جَرِّهِ", "Onun cerri", "cerrihî", "Sonu ه"], ["مُضَافٌ", "Muzâf", "muzâfun", "ض ile"], ["إِلَيْهِ", "İleyhi", "ileyhi", "Hemze elifin altında: إ"], ["نَعْتٌ", "Na’t (sıfat)", "na’tun", "ع ile; sonu ت"], ["السُّكُونِ", "Sükûn", "essukûni", "س ile; ص değil"], ["مَحَلَّ", "Mahal (yer)", "mahalle", "ح ile"]],
  u4: [["مُثَنًّى", "Müsennâ", "musennen", "ث ile; sonu noktasız elif-i maksûre: ى"], ["الأَلِفُ", "Elif", "elelifu", "Hemzeli elif: أ"], ["اليَاءُ", "Yâ", "elyâu", "Sonu hemze: ء"], ["الوَاوُ", "Vâv", "elvâvu", ""], ["سَالِمٌ", "Sâlim", "sâlimun", "س ile"], ["مُذَكَّرٍ", "Müzekker", "muzekkerin", "ذ ile; ز değil"], ["مُؤَنَّثٍ", "Müennes", "muennesin", "Hemze vâvın üstünde: ؤ; sonu ث"], ["مَجْزُومٌ", "Meczûm", "meczûmun", "ز ile; ذ değil"], ["ثُبُوتُ", "Sübût (kalma)", "subûtu", "ث ile; ت değil"], ["النُّونِ", "Nûn", "ennûni", ""]]
};
function spellItems(u) { return SPELL[u].map(function (v) { return { t: v[0], tr: v[1], ok: v[2], hint: v[3] }; }); }
// Arapça normalleştirme (harekesiz)
function NORM(s) { return s.replace(/[ً-ْٰـ]/g, ""); }
var CONF = { "ت": "ث", "ث": "ت", "ح": "خ", "خ": "ح", "د": "ذ", "ذ": "ز", "ز": "ذ", "س": "ص", "ص": "س", "ض": "ظ", "ظ": "ض", "ط": "ت", "ة": "ه", "ه": "ة", "أ": "ا", "ا": "أ", "إ": "ا", "آ": "ا", "ي": "ى", "ى": "ي", "ع": "غ", "غ": "ع", "ك": "ق", "ق": "ك", "ر": "ز", "ف": "ق", "و": "ؤ", "ؤ": "و", "ء": "أ", "ن": "ب", "ب": "ن", "م": "ن", "ل": "ك", "ج": "ح" };
function variants(s) { var n = NORM(s), out = []; for (var i = 0; i < n.length && out.length < 2; i++) { var c = CONF[n[i]]; if (c) { var v = n.slice(0, i) + c + n.slice(i + 1); if (v !== n && out.indexOf(v) < 0) out.push(v); } } return out; }

var UNITS = [
// ---------------------------------------------------------------- 1 · DÖRT ADIM
{
  id: "u1", no: 1, ar: "خُطُوَاتُ الإِعْرَابِ", tr: "İ’rabın Dört Adımı", short: "4 adım", col: "cerr", legend: ["cerr", "nasb", "mi", "mz"],
  goals: ["İ’rabın her kelimede aynı sırayla yapıldığını bilmek: 1. görevi, 2. hükmü, 3. alâmeti, 4. yeri / sebebi", "Hüküm ile alâmet kalıbını eşleştirmek: مَرْفُوعٌ ← وَعَلَامَةُ رَفْعِهِ", "İsim cümlesinde mübtedâ ve haberin i’rabını yapmak; terimleri harf harf doğru yazmak"],
  examples: [
    { s: "مُبْتَدَأٌ:cerr / مَرْفُوعٌ:nasb / وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ:mi / الظَّاهِرَةُ عَلَى آخِرِهِ.:mz", tr: "الطَّالِبُ (الطَّالِبُ مُجْتَهِدٌ): Mübtedâdır, merfûdur; ref’ alâmeti sonunda görünen ötredir." },
    { s: "خَبَرٌ:cerr / مَرْفُوعٌ:nasb / وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ:mi / الظَّاهِرَةُ عَلَى آخِرِهِ.:mz", tr: "مُجْتَهِدٌ: Haberdir, merfûdur; ref’ alâmeti sonunda görünen ötredir." }
  ],
  rules: [
    { tr: "<b>İ’rab</b> (<span class=\"ar\">الإِعْرَابُ</span>): bir kelimenin cümledeki görevini ve sonunun durumunu Arapça terimlerle söylemektir. Her kelime için aynı merdiven çıkılır." },
    { tr: "<b class=\"r-cerr\">1. Görevi</b>: cümlede ne? <span class=\"ar\">مُبْتَدَأٌ، خَبَرٌ، فَاعِلٌ، مَفْعُولٌ بِهِ…</span>" },
    { tr: "<b class=\"r-nasb\">2. Hükmü</b>: <span class=\"ar\">مَرْفُوعٌ، مَنْصُوبٌ، مَجْرُورٌ، مَجْزُومٌ</span> ya da değişmeyen kelimede <span class=\"ar\">مَبْنِيٌّ</span>." },
    { tr: "<b class=\"r-mi\">3. Alâmeti</b>: hükümle aynı kökten kalıp + işaret:", ex: ["مَرْفُوعٌ ← وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "مَنْصُوبٌ ← وَعَلَامَةُ نَصْبِهِ الفَتْحَةُ", "مَجْرُورٌ ← وَعَلَامَةُ جَرِّهِ الكَسْرَةُ", "مَجْزُومٌ ← وَعَلَامَةُ جَزْمِهِ السُّكُونُ"] },
    { tr: "<b class=\"r-mz\">4. Yeri / sebebi</b>: hareke görünüyorsa <span class=\"ar\">الظَّاهِرَةُ عَلَى آخِرِهِ</span>; alâmet harfse sebebi söylenir: <span class=\"ar\">لِأَنَّهُ مُثَنًّى</span>." },
    { tr: "Yazım: terimler tenvinli yazılır (<span class=\"ar\">مُبْتَدَأٌ مَرْفُوعٌ</span>). Karışan harflere dikkat: <span class=\"ar\">مُبْتَدَأٌ</span>'da hemzeli elif, <span class=\"ar\">الضَّمَّةُ</span>'de tâ-yı merbûta, <span class=\"ar\">رَفْعِهِ</span>'de zamir he’si." }
  ],
  kaide: [
    "الإِعْرَابُ: بَيَانُ مَوْقِعِ الكَلِمَةِ فِي الجُمْلَةِ وَحُكْمِهَا وَعَلَامَتِهَا.",
    "خُطُوَاتُ الإِعْرَابِ: ١ ـ مَوْقِعُ الكَلِمَةِ (مُبْتَدَأٌ، خَبَرٌ، فَاعِلٌ…) ٢ ـ حُكْمُهَا (مَرْفُوعٌ، مَنْصُوبٌ، مَجْرُورٌ، مَجْزُومٌ، مَبْنِيٌّ) ٣ ـ عَلَامَتُهَا (وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ…) ٤ ـ ظُهُورُ العَلَامَةِ أَوْ سَبَبُهَا (الظَّاهِرَةُ عَلَى آخِرِهِ، لِأَنَّهُ مُثَنًّى…).",
    "مِثَالٌ: الطَّالِبُ مُجْتَهِدٌ. الطَّالِبُ: مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ. مُجْتَهِدٌ: خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ."
  ],
  ex: [
    { type: "classify", opts: STEPS4, ar: "هَذِهِ القِطْعَةُ مِنْ أَيِّ خُطْوَةٍ؟", tr: "Bu parça merdivenin hangi basamağı?", items: [
      { s: "مُبْتَدَأٌ", a: "g", why: "Görev: mübtedâ." }, { s: "مَرْفُوعٌ", a: "h", why: "Hüküm: merfû." }, { s: "وَعَلَامَةُ رَفْعِهِ", a: "a", why: "Alâmet kalıbı." }, { s: "الضَّمَّةُ", a: "a", why: "Alâmetin kendisi: ötre." },
      { s: "الظَّاهِرَةُ عَلَى آخِرِهِ", a: "y", why: "Yeri: sonunda görünüyor." }, { s: "خَبَرٌ", a: "g", why: "Görev: haber." }, { s: "مَنْصُوبٌ", a: "h", why: "Hüküm: mansûb." }, { s: "الفَتْحَةُ", a: "a", why: "Alâmet: üstün." },
      { s: "لِأَنَّهُ مُثَنًّى", a: "y", why: "Sebep: müsennâ olduğu için." }, { s: "فَاعِلٌ", a: "g", why: "Görev: fâil." }, { s: "مَبْنِيٌّ", a: "h", why: "Hüküm: mebnî (değişmez)." }, { s: "وَعَلَامَةُ جَرِّهِ", a: "a", why: "Alâmet kalıbı (cer)." }
    ]},
    { type: "pick", fill: true, ar: "أَكْمِلْ: الحُكْمُ وَالعَلَامَةُ", tr: "Hüküm ile alâmet aynı kökten olmalı: مَرْفُوعٌ – رَفْعِهِ – الضَّمَّةُ. Eksik parçayı seç.", items: [
      { q: "مَرْفُوعٌ ___ الضَّمَّةُ", o: ["وَعَلَامَةُ رَفْعِهِ", "وَعَلَامَةُ نَصْبِهِ", "وَعَلَامَةُ جَرِّهِ"], a: 0, why: "مَرْفُوعٌ → رَفْعِهِ." },
      { q: "مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ ___", o: ["الضَّمَّةُ", "الفَتْحَةُ", "الكَسْرَةُ"], a: 1, why: "Nasbın asıl alâmeti üstün." },
      { q: "مَجْرُورٌ ___ الكَسْرَةُ", o: ["وَعَلَامَةُ نَصْبِهِ", "وَعَلَامَةُ رَفْعِهِ", "وَعَلَامَةُ جَرِّهِ"], a: 2, why: "مَجْرُورٌ → جَرِّهِ." },
      { q: "___ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", o: ["مَرْفُوعٌ", "مَنْصُوبٌ", "مَجْرُورٌ"], a: 0, why: "رَفْعِهِ → مَرْفُوعٌ." },
      { q: "مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ ___", o: ["الفَتْحَةُ", "السُّكُونُ", "الضَّمَّةُ"], a: 1, why: "Cezmin asıl alâmeti sükûn." },
      { q: "مَجْرُورٌ وَعَلَامَةُ جَرِّهِ ___", o: ["الضَّمَّةُ", "الفَتْحَةُ", "الكَسْرَةُ"], a: 2, why: "Cerrin asıl alâmeti esre." },
      { q: "___ وَعَلَامَةُ نَصْبِهِ الفَتْحَةُ", o: ["مَجْرُورٌ", "مَنْصُوبٌ", "مَرْفُوعٌ"], a: 1, why: "نَصْبِهِ → مَنْصُوبٌ." }
    ]},
    { type: "order", ar: "أَعْرِبْ الكَلِمَةَ المُلَوَّنَةَ", tr: "Renkli kelimenin i’rabını kur: parçalara merdiven sırasıyla dokun. Yanlış parça ya da yanlış sıra kabul edilmez; program hangi adımın gerektiğini söyler.", items: orderItems("u1") },
    { type: "spell", ar: "اكْتُبِ المُصْطَلَحَ حَرْفًا حَرْفًا", tr: "Terimi harf harf yaz: harflere sırayla dokun. Karışan harflerde program uyarır.", items: spellItems("u1") }
  ]
},
// ---------------------------------------------------------------- 2 · FİİL CÜMLESİ
{
  id: "u2", no: 2, ar: "إِعْرَابُ الجُمْلَةِ الفِعْلِيَّةِ", tr: "Fiil Cümlesinin İ’rabı", short: "Fiil cümlesi", col: "nasb", legend: ["cerr", "nasb", "mi", "mz"],
  goals: ["Mâzi fiilin mebnî olduğunu ve فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الفَتْحِ diye i’rab edildiğini bilmek", "Muzâri fiili, fâili ve mef’ûlün bihi i’rab etmek", "فَاعِلٌ، مَفْعُولٌ بِهِ، مَنْصُوبٌ، مُضَارِعٌ terimlerini doğru yazmak"],
  examples: [
    { s: "فِعْلٌ مَاضٍ:cerr / مَبْنِيٌّ:nasb / عَلَى الفَتْحِ.:mi", tr: "كَتَبَ: Mâzi fiildir, üstün üzere mebnîdir." },
    { s: "فَاعِلٌ:cerr / مَرْفُوعٌ:nasb / وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ:mi / الظَّاهِرَةُ عَلَى آخِرِهِ.:mz", tr: "الطَّالِبُ: Fâildir, merfûdur…" },
    { s: "مَفْعُولٌ بِهِ:cerr / مَنْصُوبٌ:nasb / وَعَلَامَةُ نَصْبِهِ الفَتْحَةُ:mi / الظَّاهِرَةُ عَلَى آخِرِهِ.:mz", tr: "الدَّرْسَ: Mef’ûlün bihtir, mansûbdur; nasb alâmeti sonunda görünen üstündür." }
  ],
  rules: [
    { tr: "<b>Mâzi fiil mebnîdir</b>; sonu değişmez. İ’rabı üç parçadır: <span class=\"ar\">فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الفَتْحِ</span>. Mebnî kelimede 3. adım <span class=\"ar\">عَلَى …</span> olur (hangi hareke üzere)." },
    { tr: "<b>Muzâri fiil</b> (önünde nasb ya da cezm edatı yoksa) merfûdur: <span class=\"ar\">فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ</span>." },
    { tr: "<b>Fâil</b> merfû, <b>mef’ûlün bih</b> mansûbdur:", ex: ["فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ…", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الفَتْحَةُ…"] },
    { tr: "Sıra cümlede de geçerli: önce fiil, sonra fâil, sonra mef’ûl; her kelimenin i’rabı ayrı satırda yazılır." }
  ],
  kaide: ["كَتَبَ الطَّالِبُ الدَّرْسَ. كَتَبَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الفَتْحِ. الطَّالِبُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ. الدَّرْسَ: مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ."],
  ex: [
    { type: "classify", opts: [["fl", "Fiil", "فِعْلٌ", "x"], ["fa", "Fâil", "فَاعِلٌ", "cerr"], ["mf", "Mef’ûlün bih", "مَفْعُولٌ بِهِ", "nasb"], ["mb", "Mübtedâ", "مُبْتَدَأٌ", "mi"], ["hb", "Haber", "خَبَرٌ", "mz"]], ar: "مَا مَوْقِعُ الكَلِمَةِ؟", tr: "1. adım: renkli kelimenin görevi ne?", items: [
      { s: HL("كَتَبَ الطَّالِبُ الدَّرْسَ", "الطَّالِبُ"), a: "fa", why: "Fiilden sonra işi yapan." }, { s: HL("كَتَبَ الطَّالِبُ الدَّرْسَ", "الدَّرْسَ"), a: "mf", why: "İşin üzerine düştüğü." },
      { s: HL("كَتَبَ الطَّالِبُ الدَّرْسَ", "كَتَبَ"), a: "fl", why: "Mâzi fiil." }, { s: HL("الطَّالِبُ مُجْتَهِدٌ", "الطَّالِبُ"), a: "mb", why: "Cümle isimle başlıyor." },
      { s: HL("الطَّالِبُ مُجْتَهِدٌ", "مُجْتَهِدٌ"), a: "hb", why: "Mübtedâ hakkında bilgi." }, { s: HL("يَشْرَبُ الوَلَدُ الحَلِيبَ", "الحَلِيبَ"), a: "mf", why: "İçilen şey." },
      { s: HL("يَشْرَبُ الوَلَدُ الحَلِيبَ", "الوَلَدُ"), a: "fa", why: "İçen." }, { s: HL("البَيْتُ كَبِيرٌ", "كَبِيرٌ"), a: "hb", why: "Haber." }
    ]},
    { type: "order", ar: "أَعْرِبْ الكَلِمَةَ المُلَوَّنَةَ", tr: "Renkli kelimenin i’rabını kur. Mâzi fiilde üç parça var: görev, مَبْنِيٌّ, عَلَى الفَتْحِ.", items: orderItems("u2") },
    { type: "spell", ar: "اكْتُبِ المُصْطَلَحَ حَرْفًا حَرْفًا", tr: "Terimi harf harf yaz.", items: spellItems("u2") }
  ]
},
// ---------------------------------------------------------------- 3 · HARF-İ CER, İZAFET, SIFAT
{
  id: "u3", no: 3, ar: "حَرْفُ الجَرِّ وَالإِضَافَةُ وَالنَّعْتُ", tr: "Harf-i Cer, İzafet ve Sıfat", short: "Cer · izafet", col: "mi", legend: ["cerr", "nasb", "mi", "mz"],
  goals: ["Harf-i ceri mebnî ve \"i’rabda yeri yok\" diye i’rab etmek: لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ", "Harf-i cerden sonraki ismi, muzâfun ileyhi ve sıfatı i’rab etmek", "Muzâfın i’rabına وَهُوَ مُضَافٌ eklemek"],
  examples: [
    { s: "حَرْفُ جَرٍّ:cerr / مَبْنِيٌّ:nasb / عَلَى السُّكُونِ:mi / لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ.:mz", tr: "إِلَى: Harf-i cerdir, sükûn üzere mebnîdir, i’rabda yeri yoktur." },
    { s: "اسْمٌ مَجْرُورٌ:cerr / بِـ«إِلَى»:nasb / وَعَلَامَةُ جَرِّهِ الكَسْرَةُ:mi / الظَّاهِرَةُ عَلَى آخِرِهِ.:mz", tr: "المَدْرَسَةِ: «İlâ» ile mecrûr isimdir; cer alâmeti sonunda görünen esredir." },
    { s: "مُضَافٌ إِلَيْهِ:cerr / مَجْرُورٌ:nasb / وَعَلَامَةُ جَرِّهِ الكَسْرَةُ:mi / الظَّاهِرَةُ عَلَى آخِرِهِ.:mz", tr: "الطَّالِبِ (كِتَابُ الطَّالِبِ): Muzâfun ileyhtir, mecrûrdur." }
  ],
  rules: [
    { tr: "<b>Harf-i cer</b> mebnîdir ve i’rabda yeri yoktur: <span class=\"ar\">حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ</span>. (فِي، إِلَى، عَلَى، مِنْ: sükûn üzere; بِـ، لِـ: esre üzere.)" },
    { tr: "Harf-i cerden sonraki isim: <span class=\"ar\">اسْمٌ مَجْرُورٌ بِـ«فِي» وَعَلَامَةُ جَرِّهِ الكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ</span>. 2. adımda hangi harfle mecrûr olduğu söylenir." },
    { tr: "<b>İzafet</b>: muzâf kendi görevine göre i’rab edilir ve sonuna <span class=\"ar\">وَهُوَ مُضَافٌ</span> eklenir; muzâfun ileyh daima mecrûrdur." },
    { tr: "<b>Na’t (sıfat)</b>, mevsufunun i’rabına uyar: <span class=\"ar\">جَاءَ طَالِبٌ مُجْتَهِدٌ ← مُجْتَهِدٌ: نَعْتٌ مَرْفُوعٌ…</span>" }
  ],
  kaide: ["ذَهَبَ أَحْمَدُ إِلَى المَدْرَسَةِ. إِلَى: حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ. المَدْرَسَةِ: اسْمٌ مَجْرُورٌ بِـ«إِلَى» وَعَلَامَةُ جَرِّهِ الكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.", "كِتَابُ الطَّالِبِ جَدِيدٌ. كِتَابُ: مُبْتَدَأٌ مَرْفُوعٌ… وَهُوَ مُضَافٌ. الطَّالِبِ: مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ."],
  ex: [
    { type: "classify", opts: [["mu", "Mu’rab (değişen)", "مُعْرَبٌ", "nasb"], ["mb", "Mebnî (değişmeyen)", "مَبْنِيٌّ", "cerr"]], ar: "مُعْرَبٌ أَمْ مَبْنِيٌّ؟", tr: "Önce şunu bil: kelime mu’rab mı (sonu göreve göre değişir), mebnî mi (hiç değişmez)?", items: [
      { s: HL("ذَهَبَ أَحْمَدُ", "ذَهَبَ"), a: "mb", why: "Mâzi fiil mebnîdir." }, { s: HL("ذَهَبَ أَحْمَدُ", "أَحْمَدُ"), a: "mu", why: "İsim: fâil, merfû." },
      { s: HL("إِلَى المَدْرَسَةِ", "إِلَى"), a: "mb", why: "Harfler mebnîdir." }, { s: HL("إِلَى المَدْرَسَةِ", "المَدْرَسَةِ"), a: "mu", why: "Mecrûr isim." },
      { s: HL("يَقْرَأُ المُعَلِّمُ", "يَقْرَأُ"), a: "mu", why: "Muzâri fiil mu’rabdır (merfû)." }, { s: HL("فِي البَيْتِ", "فِي"), a: "mb", why: "Harf." },
      { s: HL("كِتَابُ الطَّالِبِ", "الطَّالِبِ"), a: "mu", why: "Muzâfun ileyh, mecrûr." }, { s: HL("لَمْ يَذْهَبْ", "لَمْ"), a: "mb", why: "Harf." }
    ]},
    { type: "order", ar: "أَعْرِبْ الكَلِمَةَ المُلَوَّنَةَ", tr: "Renkli kelimenin i’rabını kur. Harf-i cerde 4. adım: لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ.", items: orderItems("u3") },
    { type: "spell", ar: "اكْتُبِ المُصْطَلَحَ حَرْفًا حَرْفًا", tr: "Terimi harf harf yaz.", items: spellItems("u3") }
  ]
},
// ---------------------------------------------------------------- 4 · FER’Î ALÂMETLER
{
  id: "u4", no: 4, ar: "العَلَامَاتُ الفَرْعِيَّةُ", tr: "Harekesiz Alâmetler", short: "Diğer alâmetler", col: "ref", legend: ["cerr", "nasb", "mi", "mz"],
  goals: ["Müsennâ (ا / ي), cem-i müzekker sâlim (و / ي) ve cem-i müennes sâlimin (nasbda esre) i’rabını yapmak", "Ef’âl-i hamsede nûnun kalması / düşmesini, meczûm muzâride sükûnu söylemek", "4. adımda sebebi yazmak: لِأَنَّهُ مُثَنًّى، لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ"],
  examples: [
    { s: "مُبْتَدَأٌ:cerr / مَرْفُوعٌ:nasb / وَعَلَامَةُ رَفْعِهِ الأَلِفُ:mi / لِأَنَّهُ مُثَنًّى.:mz", tr: "الطَّالِبَانِ: Mübtedâdır, merfûdur; ref’ alâmeti eliftir, çünkü müsennâdır." },
    { s: "مَفْعُولٌ بِهِ:cerr / مَنْصُوبٌ:nasb / وَعَلَامَةُ نَصْبِهِ اليَاءُ:mi / لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ.:mz", tr: "المُعَلِّمِينَ: Mef’ûlün bihtir, mansûbdur; nasb alâmeti yâdır, çünkü cem-i müzekker sâlimdir." }
  ],
  rules: [
    { tr: "Alâmet hareke değil <b>harf</b> ise 4. adımda <b>sebep</b> söylenir (<span class=\"ar\">لِأَنَّهُ…</span>)." },
    { tr: "<b>Müsennâ</b>: ref’de <span class=\"ar\">الأَلِفُ</span>, nasb ve cerde <span class=\"ar\">اليَاءُ</span> + <span class=\"ar\">لِأَنَّهُ مُثَنًّى</span>." },
    { tr: "<b>Cem-i müzekker sâlim</b>: ref’de <span class=\"ar\">الوَاوُ</span>, nasb ve cerde <span class=\"ar\">اليَاءُ</span> + <span class=\"ar\">لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ</span>." },
    { tr: "<b>Cem-i müennes sâlim</b>: nasbda üstün yerine <span class=\"ar\">الكَسْرَةُ</span> + <span class=\"ar\">لِأَنَّهُ جَمْعُ مُؤَنَّثٍ سَالِمٌ</span>." },
    { tr: "<b>Ef’âl-i hamse</b>: ref’de <span class=\"ar\">ثُبُوتُ النُّونِ</span>, nasb ve cezmde <span class=\"ar\">حَذْفُ النُّونِ</span> + <span class=\"ar\">لِأَنَّهُ مِنَ الأَفْعَالِ الخَمْسَةِ</span>." },
    { tr: "<b>Meczûm muzâri</b>: <span class=\"ar\">مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ السُّكُونُ الظَّاهِرُ عَلَى آخِرِهِ</span> (sükûn müzekker: الظَّاهِرُ). <span class=\"ar\">لَمْ</span>: <span class=\"ar\">حَرْفُ جَزْمٍ مَبْنِيٌّ عَلَى السُّكُونِ لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ</span>." }
  ],
  kaide: ["الطَّالِبَانِ: مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الأَلِفُ لِأَنَّهُ مُثَنًّى.", "المُسْلِمُونَ: مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الوَاوُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ.", "يَكْتُبُونَ: فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ ثُبُوتُ النُّونِ لِأَنَّهُ مِنَ الأَفْعَالِ الخَمْسَةِ."],
  ex: [
    { type: "pick", fill: true, ar: "مَا العَلَامَةُ؟", tr: "3. adım: alâmeti seç. Önce kelimenin türüne bak: müsennâ mı, cemi mi?", items: [
      { q: "الطَّالِبَانِ: مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ ___ لِأَنَّهُ مُثَنًّى.", o: ["الأَلِفُ", "الوَاوُ", "الضَّمَّةُ"], a: 0, why: "Müsennâ ref’de elif." },
      { q: "رَأَيْتُ الطَّالِبَيْنِ ← الطَّالِبَيْنِ: مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ ___ لِأَنَّهُ مُثَنًّى.", o: ["الأَلِفُ", "اليَاءُ", "الفَتْحَةُ"], a: 1, why: "Müsennâ nasbda yâ." },
      { q: "المُسْلِمُونَ: مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ ___ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ.", o: ["اليَاءُ", "الضَّمَّةُ", "الوَاوُ"], a: 2, why: "Cem-i müzekker sâlim ref’de vâv." },
      { q: "شَكَرْتُ المُعَلِّمِينَ ← المُعَلِّمِينَ: … وَعَلَامَةُ نَصْبِهِ ___", o: ["اليَاءُ", "الوَاوُ", "الفَتْحَةُ"], a: 0, why: "Cem-i müzekker sâlim nasbda yâ." },
      { q: "رَأَيْتُ الطَّالِبَاتِ ← الطَّالِبَاتِ: … وَعَلَامَةُ نَصْبِهِ ___ لِأَنَّهُ جَمْعُ مُؤَنَّثٍ سَالِمٌ.", o: ["الفَتْحَةُ", "الكَسْرَةُ", "اليَاءُ"], a: 1, why: "Cem-i müennes sâlim nasbda esre." },
      { q: "يَكْتُبُونَ: فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ ___", o: ["الضَّمَّةُ", "حَذْفُ النُّونِ", "ثُبُوتُ النُّونِ"], a: 2, why: "Ef’âl-i hamse ref’de nûnun kalması." },
      { q: "لَنْ يَكْتُبُوا ← يَكْتُبُوا: … مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ ___", o: ["حَذْفُ النُّونِ", "الفَتْحَةُ", "ثُبُوتُ النُّونِ"], a: 0, why: "Nasbda nûn düşer." },
      { q: "لَمْ يَذْهَبْ ← يَذْهَبْ: … مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ ___", o: ["الفَتْحَةُ", "السُّكُونُ", "حَذْفُ النُّونِ"], a: 1, why: "Sahih muzâri cezmde sükûn alır." }
    ]},
    { type: "order", ar: "أَعْرِبْ الكَلِمَةَ المُلَوَّنَةَ", tr: "Renkli kelimenin i’rabını kur. Alâmet harfse 4. adımda sebebi koy.", items: orderItems("u4") },
    { type: "spell", ar: "اكْتُبِ المُصْطَلَحَ حَرْفًا حَرْفًا", tr: "Terimi harf harf yaz.", items: spellItems("u4") }
  ]
},
// ---------------------------------------------------------------- 5 · METİN
{
  id: "u5", no: 5, ar: "إِعْرَابُ نَصٍّ", tr: "Bir Metnin İ’rabı", short: "Metin", col: "muz", legend: ["cerr", "nasb", "mi", "mz"],
  goals: ["Kısa bir metni baştan sona, kelime kelime i’rab etmek", "Aynı kelimenin (المُعَلِّمُ، الطُّلَّابُ) farklı cümlelerde farklı görev alabileceğini görmek", "İ’rabı doğru sırayla ve doğru yazımla tamamlamak"],
  examples: [
    { s: "دَخَلَ:- / المُعَلِّمُ:cerr / الفَصْلَ.:nasb", tr: "Öğretmen sınıfa girdi." },
    { s: "الطُّلَّابُ:cerr / مُجْتَهِدُونَ.:mi", tr: "Öğrenciler çalışkandır." }
  ],
  rules: [
    { tr: "Metin i’rabında her cümle ayrı ele alınır; önce cümlenin türüne bakılır: fiille başlıyorsa fiil cümlesi, isimle başlıyorsa isim cümlesi." },
    { tr: "Sonra kelimeler sırayla, her biri ayrı satırda i’rab edilir: <span class=\"ar\">الكَلِمَةُ: إِعْرَابُهَا.</span>" },
    { tr: "Dikkat: <span class=\"ar\">الطُّلَّابُ</span> ikinci cümlede mübtedâ, dördüncü cümlede fâildir. Görevi cümle belirler." }
  ],
  kaide: ["أَعْرِبِ النَّصَّ التَّالِيَ كَلِمَةً كَلِمَةً: دَخَلَ المُعَلِّمُ الفَصْلَ. الطُّلَّابُ مُجْتَهِدُونَ. كَتَبَ المُعَلِّمُ الدَّرْسَ عَلَى السَّبُّورَةِ. قَرَأَ الطُّلَّابُ الدَّرْسَ."],
  ex: [
    { type: "order", reading: true, title: "فِي الفَصْلِ", text: "دَخَلَ المُعَلِّمُ الفَصْلَ. الطُّلَّابُ مُجْتَهِدُونَ. كَتَبَ المُعَلِّمُ الدَّرْسَ عَلَى السَّبُّورَةِ. قَرَأَ الطُّلَّابُ الدَّرْسَ.", textTr: "Sınıfta. Öğretmen sınıfa girdi. Öğrenciler çalışkandır. Öğretmen dersi tahtaya yazdı. Öğrenciler dersi okudu.", ar: "أَعْرِبِ النَّصَّ كَلِمَةً كَلِمَةً", tr: "Metni oku; sonra her kelimenin i’rabını sırayla kur. 13 kelime, 4 cümle.", items: orderItems("u5") }
  ]
}
];

// ---------- Oyun verileri (cümlelerden üretilir) ----------
var ALLW = [];
SENT.forEach(function (S) { S.w.forEach(function (w) { ALLW.push({ u: S.u, s: S.s, tr: S.tr, w: w[0], p: w[1] }); }); });
// Eksik Parça: [i’rab metni {parça}, seçenekler, açıklama, Türkçe, konu]
var IR_POOL = ALLW.map(function (x, i) {
  var idx = -1;
  var want = i % 2 ? "a" : "h";
  x.p.forEach(function (c, k) { if (idx < 0 && c[1] === want && alts(c[0]).length >= 2) idx = k; });
  x.p.forEach(function (c, k) { if (idx < 0 && (c[1] === "h" || c[1] === "a") && alts(c[0]).length >= 2) idx = k; });
  if (idx < 0) return null;
  var c = x.p[idx][0], o = [c].concat(alts(c)).slice(0, 3);
  if (o.length < 3) return null;
  var txt = x.w + " ← " + x.p.map(function (q, k) { return k === idx ? "{" + q[0] + "}" : q[0]; }).join(" ");
  return [txt, o, (TT[c] || c) + " · " + STEP[x.p[idx][1]][0] + ". adım", x.tr, x.u];
}).filter(Boolean);
var GV = [["mb", "Mübtedâ", "مُبْتَدَأٌ", "cerr"], ["hb", "Haber", "خَبَرٌ", "nasb"], ["fa", "Fâil", "فَاعِلٌ", "mi"], ["mf", "Mef’ûlün bih", "مَفْعُولٌ بِهِ", "ref"], ["mc", "Mecrûr isim", "اسْمٌ مَجْرُورٌ", "mz"], ["mi", "Muzâfun ileyh", "مُضَافٌ إِلَيْهِ", "mun"]];
var GV_AR = {}; GV.forEach(function (g) { GV_AR[g[2]] = g[0]; });
var GV_LIST = ALLW.filter(function (x) { return GV_AR[x.p[0][0]]; }).map(function (x) { return [HL(x.s, x.w), GV_AR[x.p[0][0]], x.w + ": " + full(x.p)]; });
var AV = [["d", "Ötre", "الضَّمَّةُ", "cerr"], ["f", "Üstün", "الفَتْحَةُ", "nasb"], ["k", "Esre", "الكَسْرَةُ", "mi"], ["e", "Elif", "الأَلِفُ", "ref"], ["w", "Vâv", "الوَاوُ", "mz"], ["y", "Yâ", "اليَاءُ", "mun"]];
var AV_AR = {}; AV.forEach(function (g) { AV_AR[g[2]] = g[0]; });
var AV_LIST = ALLW.map(function (x) { var a = x.p.filter(function (c) { return AV_AR[c[0]]; })[0]; return a ? [HL(x.s, x.w), AV_AR[a[0]], x.w + ": " + full(x.p)] : null; }).filter(Boolean);
var SP_ALL = []; ["u1", "u2", "u3", "u4"].forEach(function (u) { SPELL[u].forEach(function (v) { var va = variants(v[0]); if (va.length === 2) SP_ALL.push({ u: u, t: v[0], n: NORM(v[0]), tr: v[1], w: va, hint: v[3] }); }); });
var HAFIZA = {
  tr: { name: "Terim ↔ Türkçe", pairs: [["مُبْتَدَأٌ", "mübtedâ"], ["فَاعِلٌ", "fâil"], ["مَفْعُولٌ بِهِ", "nesne (mef’ûl)"], ["مَجْرُورٌ", "mecrûr"], ["مَبْنِيٌّ", "mebnî"], ["الضَّمَّةُ", "ötre"], ["الفَتْحَةُ", "üstün"], ["الكَسْرَةُ", "esre"]] },
  hk: { name: "Hüküm ↔ alâmet kalıbı", pairs: [["مَرْفُوعٌ", "وَعَلَامَةُ رَفْعِهِ"], ["مَنْصُوبٌ", "وَعَلَامَةُ نَصْبِهِ"], ["مَجْرُورٌ", "وَعَلَامَةُ جَرِّهِ"], ["مَجْزُومٌ", "وَعَلَامَةُ جَزْمِهِ"], ["مَبْنِيٌّ", "عَلَى الفَتْحِ"], ["حَرْفُ جَرٍّ", "لَا مَحَلَّ لَهُ"], ["مُثَنًّى", "الأَلِفُ"]] },
  al: { name: "Hal ↔ asıl alâmet", pairs: [["الرَّفْعُ", "الضَّمَّةُ"], ["النَّصْبُ", "الفَتْحَةُ"], ["الجَرُّ", "الكَسْرَةُ"], ["الجَزْمُ", "السُّكُونُ"], ["رَفْعُ جَمْعِ المُذَكَّرِ", "الوَاوُ"], ["نَصْبُ المُثَنَّى", "اليَاءُ"], ["رَفْعُ الأَفْعَالِ الخَمْسَةِ", "ثُبُوتُ النُّونِ"]] }
};
var KARTLAR = [
  ["İ’rabın dört adımı?", "1. görevi · 2. hükmü · 3. alâmeti · 4. yeri / sebebi"],
  ["Mübtedânın i’rabı?", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ"],
  ["Mâzi fiilin i’rabı?", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الفَتْحِ"],
  ["Fâilin i’rabı?", "فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ…"],
  ["Mef’ûlün bihin i’rabı?", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الفَتْحَةُ…"],
  ["Harf-i cerin i’rabı?", "حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ لَا مَحَلَّ لَهُ مِنَ الإِعْرَابِ"],
  ["Harf-i cerden sonraki isim?", "اسْمٌ مَجْرُورٌ بِـ«فِي» وَعَلَامَةُ جَرِّهِ الكَسْرَةُ…"],
  ["Muzâfun sonuna ne eklenir?", "وَهُوَ مُضَافٌ"],
  ["Müsennâ merfû?", "وَعَلَامَةُ رَفْعِهِ الأَلِفُ لِأَنَّهُ مُثَنًّى"],
  ["Cem-i müzekker sâlim mansûb?", "وَعَلَامَةُ نَصْبِهِ اليَاءُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ"],
  ["مُبْتَدَأٌ nasıl yazılır?", "م ب ت د أ: sonda hemzeli elif"],
  ["الضَّمَّةُ ile رَفْعِهِ'nin sonu?", "الضَّمَّةُ: tâ-yı merbûta (ة) · رَفْعِهِ: zamir he’si (ه)"]
];
