// ================= VERİ: Müstesnâ (المُسْتَثْنَى) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "المُسْتَثْنَى مِنْهُ", tr: "Müstesnâ minh" }, mz: { ar: "أَدَاةُ الاسْتِثْنَاءِ", tr: "Edat" }, nasb: { ar: "المُسْتَثْنَى", tr: "Müstesnâ" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TUR = [["t", "Tâmm müsbet", "تَامٌّ مُثْبَتٌ", "nasb"], ["n", "Tâmm menfî", "تَامٌّ مَنْفِيٌّ", "mi"], ["k", "Nâkıs", "نَاقِصٌ", "cerr"]];
var RL4 = [["m", "Müstesnâ minh", "المُسْتَثْنَى مِنْهُ", "cerr"], ["e", "Edat", "أَدَاةُ الاسْتِثْنَاءِ", "mz"], ["n", "Müstesnâ", "المُسْتَثْنَى", "nasb"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];
var RL5 = [["m", "Müstesnâ minh", "المُسْتَثْنَى مِنْهُ", "cerr"], ["n", "Müstesnâ", "المُسْتَثْنَى", "nasb"], ["f", "Mef’ûlün bih", "المَفْعُولُ بِهِ", "mi"], ["s", "İsm-i mensûb", "الاسْمُ المَنْسُوبُ", "mz"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];
var HKM = [["v", "Vâcib nasb", "وُجُوبُ النَّصْبِ", "nasb"], ["c", "Nasb ya da cer", "جَوَازُ النَّصْبِ وَالجَرِّ", "mi"], ["j", "Hep mecrûr (izafet)", "مَجْرُورٌ بِالإِضَافَةِ", "cerr"]];
var TUR_TR = { t: "Tâmm müsbet", n: "Tâmm menfî", k: "Nâkıs" };
// İstisnâ makinesi: cümleler [fiil, olumsuz fiil, müstesnâ minh, rolü (f/m/c), [mansûb, merfû, mecrûr], Türkçe ×3]
var MS = [
  ["حَضَرَ", "مَا حَضَرَ", "الطُّلَّابُ", "f", ["عَلِيًّا", "عَلِيٌّ", "عَلِيٍّ"], ["Öğrenciler geldi, Ali hariç.", "Öğrencilerden Ali dışında kimse gelmedi.", "Ali’den başkası gelmedi."]],
  ["نَجَحَ", "مَا نَجَحَ", "الطُّلَّابُ", "f", ["مَحْمُودًا", "مَحْمُودٌ", "مَحْمُودٍ"], ["Öğrenciler kazandı, Mahmud hariç.", "Öğrencilerden Mahmud dışında kimse kazanmadı.", "Mahmud’dan başkası kazanmadı."]],
  ["رَأَيْتُ", "مَا رَأَيْتُ", "الطُّلَّابَ", "m", ["عَلِيًّا", "عَلِيًّا", "عَلِيٍّ"], ["Öğrencileri gördüm, Ali hariç.", "Öğrencilerden Ali dışında kimseyi görmedim.", "Ali’den başkasını görmedim."]],
  ["مَرَرْتُ", "مَا مَرَرْتُ", "بِالطُّلَّابِ", "c", ["طَالِبًا", "طَالِبٌ", "طَالِبٍ"], ["Öğrencilerin yanından geçtim, biri hariç.", "Öğrencilerden biri dışında kimsenin yanından geçmedim.", "Bir öğrenciden başkasının yanından geçmedim."]]
];
var ME = ["إِلَّا", "غَيْر", "سِوَى", "عَدَا", "مَا عَدَا"];
var UB = ["Tâmm müsbet", "Tâmm menfî", "Nâkıs"];
// [cümle, açıklama] döndürür
function istisna(S, e, u) {
  var N = S[4][0], R = S[4][1], C = S[4][2], role = S[3], v = u === 0 ? S[0] : S[1], mm = S[2];
  var cas = { f: R, m: N, c: C }[role], gc = { f: "غَيْرُ", m: "غَيْرَ", c: "غَيْرِ" }[role];
  var b = function (x) { return '<b style="color:var(--nasb)">' + x + '</b>'; }, d = function (x) { return '<b style="color:var(--mz)">' + x + '</b>'; }, m = '<b style="color:var(--cerr)">' + mm + '</b>';
  if (u === 2) {
    if (e >= 3) return [v + " … " + d(ME[e]) + " …", "Nâkıs üslupta müstesnâ minh yoktur; " + ME[e] + " burada kullanılmaz (müstesnâ minh ister)."];
    if (e === 0) return [v + " " + d("إِلَّا") + " " + b(role === "c" ? "بِ" + C : cas), "Nâkıs: إِلَّا yokmuş gibi i’rab edilir → " + { f: "fâil, merfû", m: "mef’ûl, mansûb", c: "harf-i cerle mecrûr" }[role] + "."];
    var g = e === 1 ? (role === "c" ? "بِغَيْرِ" : gc) : (role === "c" ? "بِسِوَى" : "سِوَى");
    return [v + " " + d(g) + " " + b(C), (e === 1 ? "غَيْر" : "سِوَى") + " cümledeki yerine göre i’rab edilir (" + { f: "fâil", m: "mef’ûl", c: "mecrûr" }[role] + ")" + (e === 2 ? ", hareke takdîrî" : "") + "; ardındaki isim hep mecrûr."];
  }
  if (e === 0) return u === 0 ? [v + " " + m + " " + d("إِلَّا") + " " + b(N), "Tâmm müsbet: müstesnâ vâciben mansûb."] :
    [v + " " + m + " " + d("إِلَّا") + " " + b(N + (cas !== N ? " / " + cas : "")), "Tâmm menfî: nasb ya da müstesnâ minh’e bedel" + (cas !== N ? " (" + cas + ")" : " (ikisi de mansûb)") + "."];
  if (e === 1 || e === 2) {
    var w = e === 1 ? (u === 0 ? "غَيْرَ" : "غَيْرَ" + (gc !== "غَيْرَ" ? " / " + gc : "")) : "سِوَى";
    return [v + " " + m + " " + d(w) + " " + b(C), (u === 0 ? "Tâmm müsbet: " + (e === 1 ? "غَيْرَ" : "سِوَى") + " mansûb" : "Tâmm menfî: nasb ya da bedel") + (e === 2 ? " (takdîren)" : "") + "; müstesnâ hep mecrûr (muzâfun ileyh)."];
  }
  if (e === 3) return [v + " " + m + " " + d("عَدَا") + " " + b(N + " / " + C), "عَدَا (مَا’sız): nasb (mef’ûl) ya da cer (harf-i cer) câiz."];
  return [v + " " + m + " " + d("مَا عَدَا") + " " + b(N), "مَا عَدَا: müstesnâ vâciben mansûb (mef’ûlün bih)."];
}

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var UNITS = [
// ---------------------------------------------------------------- 1 · İSTİSNÂ VE RÜKÜNLERİ
{
  id: "u1", no: 1, ar: "الاسْتِثْنَاءُ وَأَرْكَانُهُ", tr: "İstisnâ ve Üç Rüknü", short: "Rükünler", col: "nasb", legend: ["cerr", "mz", "nasb"],
  goals: ["Müstesnânın, istisnâ edatından sonra gelip öncekinden hükümde ayrılan isim olduğunu bilmek", "Üç rüknü bulmak: müstesnâ minh, edat, müstesnâ", "Âyetlerde istisnâyı tanımak"],
  examples: [
    { s: "حَضَرَ:- / الطُّلَّابُ:cerr / إِلَّا:mz / عَلِيًّا.:nasb", tr: "Öğrenciler geldi, Ali hariç." },
    { s: "ذَهَبَتِ:- / الطَّبِيبَاتُ:cerr / إِلَّا:mz / طَبِيبَةً.:nasb", tr: "Kadın doktorlar gitti, biri hariç.", pair: "دَخَلَ:- / المُدَرِّسُونَ:cerr / الكُلِّيَّةَ:- / إِلَّا:mz / مُدَرِّسًا.:nasb", pairTr: "Öğretmenler fakülteye girdi, biri hariç." },
    { s: "مَرَرْتُ:- / بِالطُّلَّابِ:cerr / إِلَّا:mz / طَالِبًا.:nasb", tr: "Öğrencilerin yanından geçtim, biri hariç." }
  ],
  rules: [
    { tr: "<b class=\"r-nasb\">Müstesnâ</b> (<span class=\"ar\">المُسْتَثْنَى</span>): istisnâ edatından sonra gelen ve hükümde kendinden öncekine <b>muhalif</b> olan isimdir. Öğrenciler geldi, Ali gelmedi: <span class=\"ar\">حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا</span>." },
    { tr: "İstisnânın üç rüknü:", ex: ["١ ـ المُسْتَثْنَى مِنْهُ (müstesnâ minh): içinden çıkarılan topluluk → الطُّلَّابُ", "٢ ـ الأَدَاةُ (edat): إِلَّا، غَيْرُ، سِوَى، خَلَا، عَدَا، حَاشَا", "٣ ـ المُسْتَثْنَى (müstesnâ): çıkarılan → عَلِيًّا"] },
    { tr: "Müstesnâ minh bitişik zamir de olabilir: <span class=\"ar\">فَسَجَدُوا إِلَّا إِبْلِيسَ</span> (ـوا), <span class=\"ar\">فَأَنْجَيْنَاهُ وَأَهْلَهُ إِلَّا امْرَأَتَهُ</span>. Hiç anılmayabilir de: <span class=\"ar\">وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا اللهُ</span> (nâkıs)." }
  ],
  kaide: [
    "المُسْتَثْنَى: اسْمٌ يَأْتِي بَعْدَ أَدَاةِ الاسْتِثْنَاءِ، يُخَالِفُ مَا قَبْلَهَا فِي الحُكْمِ.",
    "وَأَرْكَانُ الاسْتِثْنَاءِ ثَلَاثَةٌ: المُسْتَثْنَى مِنْهُ، وَالأَدَاةُ، وَالمُسْتَثْنَى."
  ],
  ex: [
    { type: "tag", roles: ["cerr", "mz", "nasb", "x"], num: "أ-١", ar: "عَيِّنِ المُسْتَثْنَى مِنْهُ وَأَدَاةَ الاسْتِثْنَاءِ وَالمُسْتَثْنَى", tr: "Parçalara dokunarak Müstesnâ minh, Edat, Müstesnâ ya da Başka diye etiketle.", exHtml: "<span class=\"ar\">حَضَرَ المُسَافِرُونَ إِلَّا مُسَافِرًا ← المُسَافِرُونَ · إِلَّا · مُسَافِرًا</span>", items: [
      T("نَزَلَ:x / اللَّاعِبُونَ:cerr / إِلَى السَّاحَةِ:x / إِلَّا:mz / خَالِدًا.:nasb", "Oyuncular sahaya indi, Hâlid hariç.", "Tâmm müsbet: müstesnâ mansûb."),
      T("خَرَجَ:x / المُدَرِّسُونَ:cerr / إِلَّا:mz / مُدَرِّسًا.:nasb", "Öğretmenler çıktı, biri hariç.", "Müstesnâ mansûb."),
      T("أُحِبُّ:x / النَّاسَ:cerr / إِلَّا:mz / الكَاذِبِينَ.:nasb", "Yalancılar dışında insanları severim.", "Müstesnâ cem-i müzekker: yâ ile mansûb."),
      T("هَاجَرَتِ:x / الطُّيُورُ:cerr / إِلَّا:mz / العَصَافِيرَ.:nasb", "Kuşlar göç etti, serçeler hariç.", "Gayr-i munsarif: fetha ile mansûb."),
      T("جَلَسَ:x / الطُّلَّابُ:cerr / عَلَى الكَرَاسِيِّ:x / إِلَّا:mz / وَاحِدًا.:nasb", "Öğrenciler sandalyelere oturdu, biri hariç.", "Müstesnâ mansûb."),
      T("هَجَمَ:x / الجُنُودُ:cerr / إِلَّا:mz / جُنْدِيًّا.:nasb", "Askerler saldırdı, biri hariç.", "Müstesnâ mansûb."),
      T("فَهِمَ:x / المُهَنْدِسُونَ:cerr / المَشْرُوعَ:x / إِلَّا:mz / مُهَنْدِسًا.:nasb", "Mühendisler projeyi anladı, biri hariç.", "المَشْرُوعَ mef’ûl; müstesnâ minh المُهَنْدِسُونَ."),
      T("فَازَ:x / المُتَسَابِقُونَ:cerr / إِلَّا:mz / كَمَالًا.:nasb", "Yarışmacılar kazandı, Kemal hariç.", "Müstesnâ mansûb.")
    ]},
    { type: "tag", roles: ["cerr", "mz", "nasb", "x"], num: "أ-٢", ar: "عَيِّنِ المُسْتَثْنَى مِنْهُ وَأَدَاةَ الاسْتِثْنَاءِ وَالمُسْتَثْنَى فِي الآيَاتِ", tr: "Âyetlerde rükünleri etiketle. Müstesnâ minh zamir olabilir; nâkıs âyette hiç yoktur.", items: [
      T("فَشَرِبُ:x / وا:cerr / مِنْهُ:x / إِلَّا:mz / قَلِيلًا مِنْهُمْ:nasb", "İçlerinden pek azı hariç ondan içtiler. (Bakara 249)", "Müstesnâ minh vâv zamiri; tâmm müsbet: قَلِيلًا mansûb."),
      T("مَا فَعَلُ:x / و:cerr / هُ:x / إِلَّا:mz / قَلِيلٌ مِنْهُمْ:nasb", "İçlerinden pek azı hariç bunu yapmazlardı. (Nisâ 66)", "Tâmm menfî: قَلِيلٌ vâv zamirine bedel, merfû."),
      T("فَسَجَدُ:x / وا:cerr / إِلَّا:mz / إِبْلِيسَ:nasb", "İblis hariç secde ettiler. (Bakara 34)", "Müstesnâ mansûb (gayr-i munsarif)."),
      T("تَوَلَّوْ:x / ا:cerr / إِلَّا:mz / قَلِيلًا مِنْهُمْ:nasb", "İçlerinden pek azı hariç yüz çevirdiler. (Bakara 246)", "Tâmm müsbet."),
      T("فَأَنْجَيْنَا:x / هُ وَأَهْلَهُ:cerr / إِلَّا:mz / امْرَأَتَهُ:nasb", "Onu ve ailesini kurtardık, karısı hariç. (A’râf 83)", "Müstesnâ minh ـهُ وَأَهْلَهُ."),
      T("وَمَا يَعْلَمُ تَأْوِيلَهُ:x / إِلَّا:mz / اللهُ:nasb", "Onun tevilini Allah’tan başkası bilmez. (Âl-i İmrân 7)", "Nâkıs: müstesnâ minh yok; اللهُ fâil."),
      T("لَا يَأْكُلُهُ:x / إِلَّا:mz / الخَاطِئُونَ:nasb", "Onu ancak günahkârlar yer. (Hâkka 37)", "Nâkıs: الخَاطِئُونَ fâil, merfû."),
      T("وَمَا يَذَّكَّرُ:x / إِلَّا:mz / أُولُو الأَلْبَابِ:nasb", "Ancak akıl sahipleri öğüt alır. (Bakara 269)", "Nâkıs: أُولُو fâil, vâv ile merfû.")
    ]},
    { type: "classify", extra: true, opts: RL4, ar: "مَا وَظِيفَةُ الكَلِمَةِ؟", tr: "Koyu kelime istisnâda hangi rükün?", items: CL([
      [HL("حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا", "الطُّلَّابُ"), "m", "İçinden çıkarılan topluluk."],
      [HL("حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا", "عَلِيًّا"), "n", "Çıkarılan."],
      [HL("حَضَرَ الطُّلَّابُ غَيْرَ عَلِيٍّ", "غَيْرَ"), "e", "Edat (isim)."],
      [HL("نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا", "نَجَحَ"), "x", "Fiil."],
      [HL("فَسَجَدُوا إِلَّا إِبْلِيسَ", "إِبْلِيسَ"), "n", "Müstesnâ."],
      [HL("حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبًا", "مَا عَدَا"), "e", "Edat."],
      [HL("قَرَأْتُ سُوَرَ القُرْآنِ إِلَّا سُورَةً", "سُوَرَ"), "m", "Müstesnâ minh (aynı zamanda mef’ûl)."],
      [HL("مَا نَجَحَ إِلَّا طَالِبٌ", "طَالِبٌ"), "n", "Nâkıs üslupta müstesnâ (i’rabda fâil)."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · إِلَّا VE ÜÇ ÜSLUP
{
  id: "u2", no: 2, ar: "المُسْتَثْنَى بِإِلَّا", tr: "إِلَّا ile Müstesnâ ve Üç Üslup", short: "إِلَّا", col: "mi", legend: ["cerr", "mz", "nasb"],
  goals: ["Üç üslubu ayırmak: tâmm müsbet, tâmm menfî, nâkıs", "Her üslupta müstesnânın i’rabını bilmek", "Uygun müstesnâyı ve müstesnâ minhi harekeleyerek yazmak"],
  examples: [
    { s: "نَجَحَ:- / الطُّلَّابُ:cerr / إِلَّا:mz / مَحْمُودًا.:nasb", tr: "Öğrenciler kazandı, Mahmud hariç. (tâmm müsbet: vâcib nasb)" },
    { s: "مَا حَضَرَ:- / الطُّلَّابُ:cerr / إِلَّا:mz / عَلِيًّا / عَلِيٌّ.:nasb", tr: "Öğrencilerden Ali dışında kimse gelmedi. (tâmm menfî: nasb ya da bedel)", pair: "مَا مَرَرْتُ:- / بِالطُّلَّابِ:cerr / إِلَّا:mz / طَالِبًا / طَالِبٍ.:nasb", pairTr: "Biri dışında öğrencilerin yanından geçmedim." },
    { s: "مَا حَضَرَ:- / إِلَّا:mz / عَلِيٌّ.:nasb", tr: "Ali’den başkası gelmedi. (nâkıs: fâil)", pair: "مَا رَأَيْتُ:- / إِلَّا:mz / عَلِيًّا.:nasb", pairTr: "Ali’den başkasını görmedim. (nâkıs: mef’ûl)" }
  ],
  rules: [
    { tr: "<b>Tâmm</b>: müstesnâ minh anılmıştır. <b>Nâkıs</b>: anılmamıştır. <b>Müsbet</b>: olumlu, <b>menfî</b>: olumsuz (<span class=\"ar\">مَا، لَمْ، لَا</span>)." },
    { tr: "<b>1. Tâmm müsbet</b>: müstesnâ <b>vâciben mansûb</b>: <span class=\"ar\">نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا</span>." },
    { tr: "<b>2. Tâmm menfî</b>: ya mansûb, ya müstesnâ minh’e <b>bedel</b> (onun i’rabını alır):", ex: ["مَا نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا / مَحْمُودٌ", "مَا مَرَرْتُ بِالطُّلَّابِ إِلَّا طَالِبًا / طَالِبٍ"] },
    { tr: "<b>3. Nâkıs</b>: إِلَّا yokmuş gibi, cümledeki yerine göre i’rab edilir: <span class=\"ar\">مَا نَجَحَ إِلَّا طَالِبٌ</span> (fâil) · <span class=\"ar\">مَا رَأَيْتُ إِلَّا عَلِيًّا</span> (mef’ûl) · <span class=\"ar\">مَا مَرَرْتُ إِلَّا بِطَالِبٍ</span> (mecrûr). Anlam: “yalnız”." }
  ],
  kaide: [
    "وَأَنْوَاعُهُ ثَلَاثَةٌ: ١ ـ تَامٌّ مُثْبَتٌ: يَكُونُ فِيهِ المُسْتَثْنَى مَنْصُوبًا وُجُوبًا: نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا.",
    "٢ ـ تَامٌّ مَنْفِيٌّ: يَجُوزُ نَصْبُ المُسْتَثْنَى وَإِتْبَاعُهُ لِلْمُسْتَثْنَى مِنْهُ بَدَلًا: مَا نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا / مَحْمُودٌ، مَا مَرَرْتُ بِالطُّلَّابِ إِلَّا طَالِبًا / طَالِبٍ.",
    "٣ ـ نَاقِصٌ: هُوَ مَا لَمْ يُذْكَرْ فِيهِ المُسْتَثْنَى مِنْهُ، وَيُعْرَبُ المُسْتَثْنَى حَسَبَ مَوْقِعِهِ مِنَ الجُمْلَةِ، وَكَأَنَّ «إِلَّا» غَيْرُ مَذْكُورَةٍ: مَا نَجَحَ إِلَّا طَالِبٌ."
  ],
  ex: [
    { type: "classify", num: "أ-٦", opts: TUR, ar: "بَيِّنْ نَوْعَ أُسْلُوبِ الاسْتِثْنَاءِ", tr: "İstisnâ üslubu hangisi? Önce olumsuzluğa, sonra müstesnâ minhe bak.", items: CL([
      ["مَا تَنَاوَلْتُ اليَوْمَ إِلَّا وَجْبَةً.", "k", "Kitabın örneği: müstesnâ minh yok."],
      ["حَضَرَ الأَطِبَّاءُ إِلَى الاجْتِمَاعِ إِلَّا طَبِيبًا.", "t", "Kitabın örneği: olumlu, müstesnâ minh var."],
      ["لَمْ يُسَافِرِ الحُجَّاجُ إِلَّا حَاجًّا.", "n", "لَمْ + müstesnâ minh var."],
      ["لَمْ أُقَابِلْ إِلَّا أَخَاكَ.", "k", "Müstesnâ minh yok; أَخَاكَ mef’ûl."],
      ["لَمْ يَفْحَصِ الطَّبِيبُ المَرْضَى إِلَّا مَرِيضًا.", "n", "Olumsuz, المَرْضَى anılmış."],
      ["شَاهَدْتُ المُبَارَيَاتِ إِلَّا مُبَارَاةً.", "t", "Olumlu, tâmm."],
      ["مَا وَصَلَ إِلَى الجَامِعَةِ إِلَّا عَمِيدٌ.", "k", "Nâkıs: عَمِيدٌ fâil."],
      ["أَضَاءَتْ مَصَابِيحُ الشَّارِعِ إِلَّا مِصْبَاحًا.", "t", "Tâmm müsbet."],
      ["فَهِمَ الطُّلَّابُ القَاعِدَةَ إِلَّا جَمَالًا.", "t", "Tâmm müsbet."],
      ["مَا رَكِبَ المُسَافِرُونَ الطَّائِرَةَ إِلَّا كَرِيمًا.", "n", "Tâmm menfî (كَرِيمٌ da olurdu)."]
    ]) },
    { type: "pick", fill: true, num: "أ-٣", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ مُسْتَثْنًى مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Üsluba göre doğru biçimi seç. Bazen iki biçim de doğrudur!", exHtml: "<span class=\"ar\">تَأَخَّرَ الصَّحَفِيُّونَ إِلَّا صَحَفِيًّا. (صَحَفِيًّا – صَحَفِيٌّ – صَحَفِيٍّ)</span>", items: PL([
      ["زُرْتُ المَسَاجِدَ التَّارِيخِيَّةَ إِلَّا ___.", "مَسْجِدًا", "مَسْجِدٌ", "مَسْجِدٍ", "Tarihî camileri gezdim, biri hariç.", "Tâmm müsbet: vâcib nasb."],
      ["وَصَلَ الوُزَرَاءُ إِلَى المَطَارِ إِلَّا ___.", "وَزِيرًا", "وَزِيرٌ", "وَزِيرٍ", "Bakanlar havalimanına vardı, biri hariç.", "Tâmm müsbet."],
      ["اعْتَقَلَ الشُّرْطِيُّ المُجْرِمِينَ إِلَّا ___.", "مُجْرِمًا", "مُجْرِمٌ", "مُجْرِمٍ", "Polis suçluları tutukladı, biri hariç.", "Tâmm müsbet."],
      ["مَا أَقَرَّ إِجْرَاءَ العَمَلِيَّةِ لِلْمَرِيضِ إِلَّا ___.", "طَبِيبٌ", "طَبِيبًا", "طَبِيبٍ", "Hastaya ameliyat yapılmasını yalnız bir doktor onayladı.", "Nâkıs: fâil, merfû."],
      ["سَافَرْتُ إِلَى البِلَادِ العَرَبِيَّةِ إِلَّا ___.", "الجَزَائِرَ", "الجَزَائِرُ", "الجَزَائِرِ", "Arap ülkelerine gittim, Cezayir hariç.", "Tâmm müsbet; gayr-i munsarif."],
      ["مَا غَرَّدَتِ الطُّيُورُ إِلَّا ___.", "عُصْفُورًا ya da عُصْفُورٌ", "yalnız عُصْفُورًا", "عُصْفُورٍ", "Kuşlardan serçe dışında öten olmadı.", "Tâmm menfî: nasb ya da الطُّيُورُ’a bedel (merfû)."],
      ["لَمْ يَصْعَدْ إِلَى الطَّائِرَةِ إِلَّا ___.", "رَاكِبٌ", "رَاكِبًا", "رَاكِبٍ", "Uçağa yalnız bir yolcu bindi.", "Nâkıs: fâil."],
      ["زُرْتُ مَدَارِسَ الحَيِّ إِلَّا ___.", "مَدْرَسَةً", "مَدْرَسَةٌ", "مَدْرَسَةٍ", "Mahallenin okullarını gezdim, biri hariç.", "Tâmm müsbet."]
    ])},
    { type: "pick", fill: true, num: "أ-٤", ar: "امْلَإِ الفَرَاغَ بِمُسْتَثْنًى مُنَاسِبٍ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "Uygun ve doğru harekeli müstesnâyı seç.", exHtml: "<span class=\"ar\">مَا عَادَتْ إِلَّا طَائِرَةٌ.</span>", items: PL([
      ["سَافَرَ الوُزَرَاءُ إِلَى بَيْرُوتَ إِلَّا ___.", "وَزِيرًا", "وَزِيرٌ", "وَزِيرٍ", "Bakanlar Beyrut’a gitti, biri hariç.", "Tâmm müsbet."],
      ["وَصَلَتِ السَّائِحَاتُ إِلَى مُتْحَفِ طُوبْقَابِي إِلَّا ___.", "سَائِحَةً", "سَائِحَةٌ", "سَائِحًا", "Turistler (kadın) Topkapı Müzesi’ne vardı, biri hariç.", "Tâmm müsbet; müennes."],
      ["دَخَلَ البَاحِثُونَ المَكْتَبَةَ إِلَّا ___.", "بَاحِثًا", "بَاحِثٌ", "بَاحِثَانِ", "Araştırmacılar kütüphaneye girdi, biri hariç.", "Tâmm müsbet."],
      ["مَا غَادَرَتِ المِينَاءَ إِلَّا ___.", "سَفِينَةٌ", "سَفِينَةً", "سَفِينَةٍ", "Limandan yalnız bir gemi ayrıldı.", "Nâkıs: fâil."],
      ["لَمْ تَشْتَرِكِ الأُسْتَاذَاتُ فِي الحَفْلِ إِلَّا ___.", "أُسْتَاذَةً ya da أُسْتَاذَةٌ", "yalnız أُسْتَاذَةٌ", "أُسْتَاذَةٍ", "Hocalardan (kadın) biri dışında kutlamaya katılan olmadı.", "Tâmm menfî: nasb ya da bedel."],
      ["مَرَّتِ القِطَارَاتُ بِالمَحَطَّةِ إِلَّا ___.", "قِطَارًا", "قِطَارٌ", "قِطَارٍ", "Trenler istasyondan geçti, biri hariç.", "Tâmm müsbet."],
      ["لَمْ يَسْتَقْبِلِ الوَزِيرَ إِلَّا ___.", "مُدِيرٌ", "مُدِيرًا", "مُدِيرٍ", "Bakanı yalnız bir müdür karşıladı.", "Nâkıs: fâil (الوَزِيرَ mef’ûl)."],
      ["لَمْ أُشَاهِدْ فِي النَّدْوَةِ إِلَّا ___.", "فِيلْمًا", "فِيلْمٌ", "فِيلْمٍ", "Seminerde yalnız bir film izledim.", "Nâkıs: mef’ûl."],
      ["مَا قَرَأْتُ كُتُبَ المُؤَلِّفِ إِلَّا ___.", "كِتَابًا", "كِتَابٌ", "كِتَابٍ", "Yazarın kitaplarından biri dışında okumadım.", "Tâmm menfî: nasb da bedel de mansûb (كُتُبَ mansûb)."]
    ])},
    { type: "pick", fill: true, num: "أ-٥", ar: "امْلَإِ الفَرَاغَ بِمُسْتَثْنًى مِنْهُ مُنَاسِبٍ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "Eksik müstesnâ minhi doğru harekesiyle seç.", exHtml: "<span class=\"ar\">قَرَأْتُ سُوَرَ القُرْآنِ الكَرِيمِ إِلَّا سُورَةً.</span>", items: PL([
      ["حَفِظْتُ ___ الشَّاعِرِ إِلَّا قَصِيدَةً.", "قَصَائِدَ", "قَصَائِدُ", "قَصِيدَةَ", "Şairin kasidelerini ezberledim, biri hariç.", "Mef’ûl (muzâf), çoğul."],
      ["بَاعَ مُصْطَفَى ___ الَّتِي يَمْلِكُهَا إِلَّا شَقَّةً.", "الشُّقَقَ", "الشُّقَقُ", "الشَّقَّةَ", "Mustafa sahip olduğu daireleri sattı, biri hariç.", "Mef’ûl, çoğul."],
      ["أَشْرَفَ الأُسْتَاذُ عَلَى ___ المَاجِسْتِيرِ إِلَّا رِسَالَةً.", "رَسَائِلِ", "رَسَائِلَ", "رِسَالَةِ", "Hoca yüksek lisans tezlerini yönetti, biri hariç.", "عَلَى ile mecrûr; muzâf olduğu için kesra."],
      ["كَتَبَ المُؤَلِّفُ ___ كِتَابِهِ الجَدِيدِ إِلَّا فَصْلًا.", "فُصُولَ", "فُصُولُ", "فَصْلَ", "Yazar yeni kitabının bölümlerini yazdı, biri hariç.", "Mef’ûl, çoğul."],
      ["انْفَجَرَتِ ___ إِلَّا قُنْبُلَةً.", "القَنَابِلُ", "القَنَابِلَ", "القُنْبُلَةُ", "Bombalar patladı, biri hariç.", "Fâil, çoğul."],
      ["مَا حَضَرَتِ ___ إِلَى المُسْتَشْفَى إِلَّا مُمَرِّضَةً.", "المُمَرِّضَاتُ", "المُمَرِّضَاتِ", "المُمَرِّضَةُ", "Hemşirelerden biri dışında hastaneye gelen olmadı.", "Fâil, çoğul."],
      ["مَا قَطَفْتُ ___ إِلَّا زَهْرَةً.", "الزُّهُورَ", "الزُّهُورُ", "الزَّهْرَةَ", "Çiçeklerden biri dışında koparmadım.", "Mef’ûl, çoğul."],
      ["لَمْ يَنَمِ ___ فِي الغُرْفَةِ إِلَّا طِفْلًا.", "الأَطْفَالُ", "الأَطْفَالَ", "الطِّفْلُ", "Çocuklardan biri dışında odada uyuyan olmadı.", "Fâil, çoğul."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · غَيْرُ VE سِوَى
{
  id: "u3", no: 3, ar: "المُسْتَثْنَى بِغَيْرِ وَسِوَى", tr: "غَيْرُ ve سِوَى ile Müstesnâ", short: "غَيْر · سِوَى", col: "cerr", legend: ["cerr", "mz", "nasb"],
  goals: ["غَيْر ve سِوَى’dan sonra müstesnânın hep mecrûr olduğunu bilmek", "غَيْر’in kendisini إِلَّا’dan sonraki isim gibi i’rab etmek", "سِوَى’nın harekesinin takdîrî olduğunu bilmek"],
  examples: [
    { s: "حَضَرَ:- / الطُّلَّابُ:cerr / غَيْرَ:mz / عَلِيٍّ.:nasb", tr: "Öğrenciler geldi, Ali hariç." },
    { s: "مَا حَضَرَ:- / الطُّلَّابُ:cerr / غَيْرَ / غَيْرُ:mz / عَلِيٍّ.:nasb", tr: "Öğrencilerden Ali dışında kimse gelmedi. (tâmm menfî)", pair: "مَا حَضَرَ:- / غَيْرُ:mz / عَلِيٍّ.:nasb", pairTr: "Ali’den başkası gelmedi. (nâkıs: غَيْرُ fâil)" },
    { s: "حَضَرَتِ:- / الطَّبِيبَاتُ:cerr / سِوَى:mz / طَبِيبَةٍ.:nasb", tr: "Kadın doktorlar geldi, biri hariç." }
  ],
  rules: [
    { tr: "<span class=\"ar\">غَيْرُ</span> ve <span class=\"ar\">سِوَى</span> isimdir; müstesnâ onlardan sonra gelir ve <b>izafetle mecrûr</b>dur: <span class=\"ar\">غَيْرَ / سِوَى حَسَنٍ</span>." },
    { tr: "Kendileri, إِلَّا’dan sonraki isim gibi i’rab edilir:", ex: ["Tâmm müsbet: vâcib nasb → نَجَحَ الطُّلَّابُ غَيْرَ مَحْمُودٍ", "Tâmm menfî: nasb ya da bedel → مَا نَجَحَ الطُّلَّابُ غَيْرَ / غَيْرُ مَحْمُودٍ", "Nâkıs: yerine göre → مَا نَجَحَ غَيْرُ مَحْمُودٍ (fâil) · مَا رَأَيْتُ غَيْرَ مَحْمُودٍ (mef’ûl)"] },
    { tr: "İ’rab alâmeti <span class=\"ar\">غَيْر</span>’de görünür; <span class=\"ar\">سِوَى</span>’da elif-i maksûre yüzünden <b>takdîrî</b>dir (hep سِوَى yazılır)." }
  ],
  kaide: [
    "مِنْ أَدَوَاتِ الاسْتِثْنَاءِ: غَيْرُ، سِوَى، خَلَا، عَدَا، حَاشَا.",
    "١ ـ غَيْرُ وَسِوَى: المُسْتَثْنَى بِهِمَا يَأْتِي بَعْدَهُمَا، وَيُعْرَبُ مَجْرُورًا بِالإِضَافَةِ إِلَيْهِمَا: حَضَرَ الطُّلَّابُ غَيْرَ / سِوَى حَسَنٍ. وَ«غَيْرُ وَسِوَى» تَأْخُذَانِ حُكْمَ المُسْتَثْنَى بِـ«إِلَّا»، وَتَظْهَرُ عَلَامَاتُ الإِعْرَابِ عَلَى «غَيْرِ» وَتُقَدَّرُ عَلَى «سِوَى»: أ ـ إِذَا كَانَ الكَلَامُ تَامًّا مُثْبَتًا وَجَبَ نَصْبُهُمَا: نَجَحَ الطُّلَّابُ غَيْرَ مَحْمُودٍ. ب ـ إِذَا كَانَ تَامًّا مَنْفِيًّا جَازَ نَصْبُهُمَا أَوْ إِتْبَاعُهُمَا لِلْمُسْتَثْنَى مِنْهُ بَدَلَ بَعْضٍ مِنْ كُلٍّ: مَا نَجَحَ الطُّلَّابُ غَيْرَ / غَيْرُ مَحْمُودٍ. جـ ـ إِذَا كَانَ نَاقِصًا تُعْرَبَانِ حَسَبَ مَوْقِعِهِمَا فِي الجُمْلَةِ: مَا نَجَحَ غَيْرُ مَحْمُودٍ."
  ],
  ex: [
    { type: "tag", roles: ["cerr", "mz", "nasb", "x"], num: "ب-١", ar: "عَيِّنِ المُسْتَثْنَى مِنْهُ وَأَدَاةَ الاسْتِثْنَاءِ وَالمُسْتَثْنَى", tr: "Rükünleri etiketle: her edatta müstesnânın harekesine dikkat et.", exHtml: "<span class=\"ar\">حَضَرَ المُسَافِرُونَ غَيْرَ مُسَافِرٍ ← المُسَافِرُونَ · غَيْرَ · مُسَافِرٍ</span>", items: [
      T("نَزَلَ:x / اللَّاعِبُونَ:cerr / إِلَى السَّاحَةِ:x / غَيْرَ:mz / خَالِدٍ.:nasb", "Oyuncular sahaya indi, Hâlid hariç.", "غَيْرَ + mecrûr."),
      T("خَرَجَ:x / المُدَرِّسُونَ:cerr / سِوَى:mz / مُدَرِّسٍ.:nasb", "Öğretmenler çıktı, biri hariç.", "سِوَى + mecrûr."),
      T("أُحِبُّ:x / النَّاسَ:cerr / خَلَا:mz / الكَاذِبِينَ.:nasb", "Yalancılar dışında insanları severim.", "خَلَا: nasb ya da cer (burada yâ ile her ikisi aynı)."),
      T("هَاجَرَتِ:x / الطُّيُورُ:cerr / عَدَا:mz / العُصْفُورَ.:nasb", "Kuşlar göç etti, serçe hariç.", "عَدَا: nasb ya da cer (العُصْفُورِ)."),
      T("جَلَسَ:x / الطُّلَّابُ:cerr / عَلَى الكَرَاسِيِّ:x / غَيْرَ:mz / وَاحِدٍ.:nasb", "Öğrenciler sandalyelere oturdu, biri hariç.", "غَيْرَ + mecrûr."),
      T("هَجَمَ:x / الجُنُودُ:cerr / مَا خَلَا:mz / جُنْدِيًّا.:nasb", "Askerler saldırdı, biri hariç.", "مَا خَلَا: vâcib nasb."),
      T("فَهِمَ:x / المُهَنْدِسُونَ:cerr / المَشْرُوعَ:x / حَاشَا:mz / مُهَنْدِسًا.:nasb", "Mühendisler projeyi anladı, biri hariç.", "حَاشَا: nasb ya da cer."),
      T("فَازَ:x / المُتَسَابِقُونَ:cerr / مَا عَدَا:mz / كَمَالًا.:nasb", "Yarışmacılar kazandı, Kemal hariç.", "مَا عَدَا: vâcib nasb.")
    ]},
    { type: "pick", fill: true, num: "ب-٢", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ مُسْتَثْنًى مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki üç biçimden doğrusunu seç.", exHtml: "<span class=\"ar\">ذَهَبَ المُوَظَّفُونَ إِلَى المَطْعَمِ سِوَى مُوَظَّفٍ. (مُوَظَّفٌ – مُوَظَّفًا – مُوَظَّفٍ)</span>", items: PL([
      ["لَبِسْتُ القُمْصَانَ الجَدِيدَةَ غَيْرَ ___.", "قَمِيصٍ", "قَمِيصٌ", "قَمِيصًا", "Yeni gömlekleri giydim, biri hariç.", "غَيْرَ’den sonra mecrûr."],
      ["وَصَلَ الوُزَرَاءُ إِلَى المَطَارِ سِوَى ___.", "وَزِيرٍ", "وَزِيرًا", "وَزِيرٌ", "Bakanlar havalimanına vardı, biri hariç.", "سِوَى’dan sonra mecrûr."],
      ["اعْتَقَلَ الشُّرْطِيُّ المُجْرِمِينَ خَلَا ___.", "مُجْرِمٍ", "مُجْرِمَانِ", "مُجْرِمٌ", "Polis suçluları tutukladı, biri hariç.", "خَلَا: cer (ya da nasb مُجْرِمًا); merfû olmaz."],
      ["أَقَرَّ الأَطِبَّاءُ إِجْرَاءَ العَمَلِيَّةِ لِلْمَرِيضِ عَدَا ___.", "طَبِيبٍ", "طَبِيبَانِ", "طَبِيبٌ", "Doktorlar ameliyatı onayladı, biri hariç.", "عَدَا: cer (ya da nasb)."],
      ["سَافَرْتُ إِلَى البِلَادِ العَرَبِيَّةِ غَيْرَ ___.", "الجَزَائِرِ", "الجَزَائِرَ", "الجَزَائِرُ", "Arap ülkelerine gittim, Cezayir hariç.", "Harf-i tarifli gayr-i munsarif kesra alır."],
      ["تَسَلَّمَ المُوَظَّفُونَ رَوَاتِبَهُمْ سِوَى ___.", "مُوَظَّفٍ", "مُوَظَّفٌ", "مُوَظَّفًا", "Memurlar maaşlarını aldı, biri hariç.", "سِوَى + mecrûr."],
      ["نَزَلَ الرُّكَّابُ مِنَ الحَافِلَةِ سِوَى ___.", "رَاكِبٍ", "رَاكِبًا", "رَاكِبٌ", "Yolcular otobüsten indi, biri hariç.", "سِوَى + mecrûr."],
      ["زَارَ صَدِيقِي مَكْتَبَاتِ إِسْطَنْبُولَ غَيْرَ ___.", "مَكْتَبَةٍ", "مَكْتَبَةٌ", "مَكْتَبَةً", "Arkadaşım İstanbul’un kütüphanelerini gezdi, biri hariç.", "غَيْرَ + mecrûr."]
    ])},
    { type: "pick", fill: true, num: "ب-٤", ar: "امْلَإِ الفَرَاغَ بِمُسْتَثْنًى مِنْهُ مُنَاسِبٍ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "Eksik müstesnâ minhi doğru harekesiyle seç.", exHtml: "<span class=\"ar\">زُرْتُ عَوَاصِمَ البِلَادِ العَرَبِيَّةِ مَا خَلَا القَاهِرَةَ.</span>", items: PL([
      ["اسْتَقْبَلَ ___ رَئِيسَ الوُزَرَاءِ غَيْرَ وَزِيرٍ.", "الوُزَرَاءُ", "الوُزَرَاءَ", "الوَزِيرُ", "Bakanlar başbakanı karşıladı, biri hariç.", "Fâil, çoğul."],
      ["بَاعَ أَحْمَدُ ___ الَّتِي يَمْلِكُهَا سِوَى شَقَّةٍ.", "الشُّقَقَ", "الشُّقَقُ", "الشَّقَّةَ", "Ahmed dairelerini sattı, biri hariç.", "Mef’ûl, çoğul."],
      ["أَشْرَفَ الأُسْتَاذُ عَلَى ___ المَاجِسْتِيرِ مَا خَلَا رِسَالَةً.", "رَسَائِلِ", "رَسَائِلَ", "رِسَالَةِ", "Hoca yüksek lisans tezlerini yönetti, biri hariç.", "عَلَى ile mecrûr."],
      ["وَصَلَتِ ___ إِلَى المِينَاءِ مَا عَدَا سَفِينَةً.", "السُّفُنُ", "السُّفُنَ", "السَّفِينَةُ", "Gemiler limana vardı, biri hariç.", "Fâil, çoğul."],
      ["حَلَّ الطَّالِبُ ___ حَاشَا تَدْرِيبٍ.", "التَّدْرِيبَاتِ", "التَّدْرِيبَاتُ", "التَّدْرِيبَ", "Öğrenci alıştırmaları çözdü, biri hariç.", "Mef’ûl; cem-i müennes esreyle mansûb."],
      ["حَضَرَتِ ___ إِلَى المُسْتَشْفَى غَيْرَ مُمَرِّضَةٍ.", "المُمَرِّضَاتُ", "المُمَرِّضَاتِ", "المُمَرِّضَةُ", "Hemşireler hastaneye geldi, biri hariç.", "Fâil, çoğul."],
      ["قَطَفْتُ ___ الَّتِي فِي الحَدِيقَةِ خَلَا زَهْرَةٍ.", "الزُّهُورَ", "الزُّهُورُ", "الزَّهْرَةَ", "Bahçedeki çiçekleri kopardım, biri hariç.", "Mef’ûl, çoğul."],
      ["اسْتَقْبَلَ العَمِيدُ ___ سِوَى زَائِرٍ.", "الزَّائِرِينَ", "الزَّائِرُونَ", "الزَّائِرَ", "Dekan ziyaretçileri karşıladı, biri hariç.", "Mef’ûl: yâ ile mansûb."]
    ])},
    { type: "pick", num: "ب-٧", ar: "اضْبِطْ أَدَاةَ الاسْتِثْنَاءِ وَالمُسْتَثْنَى بِالشَّكْلِ", tr: "Nâkıs üslup: doğru harekeli edat + müstesnâyı seç.", exHtml: "<span class=\"ar\">مَا عَادَتْ غَيْرُ طَائِرَةٍ.</span>", items: PL([
      ["مَا ذَهَبَ ___ (غير طالب)", "غَيْرُ طَالِبٍ", "غَيْرَ طَالِبٍ", "غَيْرُ طَالِبٌ", "Bir öğrenciden başkası gitmedi.", "غَيْرُ fâil, merfû; طَالِبٍ mecrûr."],
      ["مَا رَأَيْتُ ___ (سوى زائر)", "سِوَى زَائِرٍ", "سِوَى زَائِرًا", "سِوَى زَائِرٌ", "Bir ziyaretçiden başkasını görmedim.", "سِوَى mef’ûl (takdîren mansûb); زَائِرٍ mecrûr."],
      ["لَمْ يَدْخُلِ المُسْتَشْفَى ___ (غير مريض)", "غَيْرُ مَرِيضٍ", "غَيْرَ مَرِيضٍ", "غَيْرِ مَرِيضٍ", "Hastaneye bir hastadan başkası girmedi.", "غَيْرُ fâil."],
      ["مَا تَفَتَّحَتْ ___ (غير زهرة)", "غَيْرُ زَهْرَةٍ", "غَيْرَ زَهْرَةٍ", "غَيْرُ زَهْرَةٌ", "Bir çiçekten başkası açmadı.", "غَيْرُ fâil."],
      ["مَا خَرَجَ مِنَ السِّجْنِ ___ (غير سجين)", "غَيْرُ سَجِينٍ", "غَيْرَ سَجِينٍ", "غَيْرِ سَجِينٍ", "Hapisten bir mahkûmdan başkası çıkmadı.", "غَيْرُ fâil."],
      ["مَا رَأَيْتُ ___ (سوى موظف)", "سِوَى مُوَظَّفٍ", "سِوَى مُوَظَّفًا", "سِوَى مُوَظَّفٌ", "Bir memurdan başkasını görmedim.", "سِوَى mef’ûl; ardından mecrûr."],
      ["لَمْ تَشْتَرِكْ فِي الحَفْلِ ___ (غير مدرسة)", "غَيْرُ مُدَرِّسَةٍ", "غَيْرَ مُدَرِّسَةٍ", "غَيْرُ مُدَرِّسَةٌ", "Kutlamaya bir öğretmenden (kadın) başkası katılmadı.", "غَيْرُ fâil."],
      ["لَمْ تَصِلْ إِلَى المِينَاءِ ___ (غير سفينة)", "غَيْرُ سَفِينَةٍ", "غَيْرَ سَفِينَةٍ", "غَيْرُ سَفِينَةً", "Limana bir gemiden başkası varmadı.", "غَيْرُ fâil."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · عَدَا، خَلَا، حَاشَا
{
  id: "u4", no: 4, ar: "المُسْتَثْنَى بِخَلَا وَعَدَا وَحَاشَا", tr: "خَلَا، عَدَا، حَاشَا ile Müstesnâ", short: "عَدَا · خَلَا", col: "ref", legend: ["cerr", "mz", "nasb"],
  goals: ["مَا عَدَا / مَا خَلَا’dan sonra müstesnânın vâciben mansûb olduğunu bilmek", "عَدَا، خَلَا، حَاشَا’dan sonra nasb ve cerrin ikisinin de câiz olduğunu bilmek", "Tâmm menfî cümlede bütün edatlarla müstesnâyı doğru yazmak"],
  examples: [
    { s: "حَضَرَ:- / الطُّلَّابُ:cerr / مَا عَدَا:mz / طَالِبًا.:nasb", tr: "Öğrenciler geldi, biri hariç. (vâcib nasb)" },
    { s: "حَضَرَ:- / الطُّلَّابُ:cerr / عَدَا:mz / طَالِبًا / طَالِبٍ.:nasb", tr: "Öğrenciler geldi, biri hariç. (nasb ya da cer)", pair: "حَضَرَ:- / الطُّلَّابُ:cerr / حَاشَا:mz / طَالِبًا / طَالِبٍ.:nasb", pairTr: "Öğrenciler geldi, biri hariç." }
  ],
  rules: [
    { tr: "<span class=\"ar\">خَلَا، عَدَا</span>’nın başına <span class=\"ar\">مَا</span> (mastar mâsı) gelirse fiil olurlar; müstesnâ <b>mef’ûlün bih</b> olarak <b>vâciben mansûb</b>dur: <span class=\"ar\">مَا عَدَا طَالِبًا</span>." },
    { tr: "<span class=\"ar\">مَا</span> gelmezse hem fiil hem harf-i cer sayılabilirler: müstesnâ <b>mansûb</b> ya da <b>mecrûr</b>: <span class=\"ar\">عَدَا طَالِبًا / طَالِبٍ</span>." },
    { tr: "<span class=\"ar\">حَاشَا</span>’nın başına <span class=\"ar\">مَا</span> gelmez; müstesnâsı her zaman nasb ya da cer olabilir: <span class=\"ar\">حَاشَا طَالِبًا / طَالِبٍ</span>." },
    { tr: "Özet: <span class=\"ar\">إِلَّا</span> → üsluba göre · <span class=\"ar\">غَيْرُ، سِوَى</span> → ardındaki hep mecrûr · <span class=\"ar\">مَا عَدَا، مَا خَلَا</span> → hep mansûb · <span class=\"ar\">عَدَا، خَلَا، حَاشَا</span> → mansûb ya da mecrûr." }
  ],
  kaide: ["٢ ـ خَلَا، عَدَا، حَاشَا: أ ـ لِلْمُسْتَثْنَى بِـ«عَدَا، خَلَا» حَالَتَانِ: ١ ـ وُجُوبُ النَّصْبِ عَلَى أَنَّهُ مَفْعُولٌ بِهِ إِذَا دَخَلَتْ عَلَيْهِمَا «مَا»: حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبًا. ٢ ـ جَوَازُ النَّصْبِ أَوِ الجَرِّ إِذَا لَمْ تَدْخُلْ عَلَيْهِمَا «مَا»: حَضَرَ الطُّلَّابُ عَدَا طَالِبًا / طَالِبٍ. ب ـ جَوَازُ النَّصْبِ أَوِ الجَرِّ فِي المُسْتَثْنَى بِـ«حَاشَا»؛ لِأَنَّ «مَا» لَا تَدْخُلُ عَلَيْهَا: حَضَرَ الطُّلَّابُ حَاشَا طَالِبًا / طَالِبٍ."],
  ex: [
    { type: "classify", extra: true, opts: HKM, ar: "مَا حُكْمُ المُسْتَثْنَى بَعْدَ هَذِهِ الأَدَاةِ؟", tr: "Koyu edattan sonra müstesnânın hükmü ne?", items: CL([
      [HL("حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبًا", "مَا عَدَا"), "v", "مَا + عَدَا: fiil, müstesnâ mef’ûl."],
      [HL("هَجَمَ الجُنُودُ مَا خَلَا جُنْدِيًّا", "مَا خَلَا"), "v", "مَا + خَلَا: vâcib nasb."],
      [HL("حَضَرَ الطُّلَّابُ عَدَا طَالِبًا / طَالِبٍ", "عَدَا"), "c", "مَا yok: nasb ya da cer."],
      [HL("أُحِبُّ النَّاسَ خَلَا الكَاذِبِينَ", "خَلَا"), "c", "مَا yok."],
      [HL("حَضَرَ الطُّلَّابُ حَاشَا طَالِبًا / طَالِبٍ", "حَاشَا"), "c", "حَاشَا: nasb ya da cer."],
      [HL("حَضَرَ الطُّلَّابُ غَيْرَ عَلِيٍّ", "غَيْرَ"), "j", "غَيْرَ’den sonra hep mecrûr."],
      [HL("حَضَرَتِ الطَّبِيبَاتُ سِوَى طَبِيبَةٍ", "سِوَى"), "j", "سِوَى’dan sonra hep mecrûr."],
      [HL("نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا", "إِلَّا"), "v", "Tâmm müsbet إِلَّا: vâcib nasb."],
      [HL("غَادَرَتِ السُّفُنُ المِينَاءَ مَا خَلَا سَفِينَةً", "مَا خَلَا"), "v", "Vâcib nasb."]
    ]) },
    { type: "pick", fill: true, num: "ب-٣", ar: "امْلَإِ الفَرَاغَ بِمُسْتَثْنًى مُنَاسِبٍ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "Edata göre doğru biçimi seç. Bazen iki biçim de câizdir!", exHtml: "<span class=\"ar\">عَادَتِ الطَّائِرَاتُ سِوَى طَائِرَةٍ.</span>", items: PL([
      ["سَافَرَ الوُزَرَاءُ إِلَى بَيْرُوتَ غَيْرَ ___.", "وَزِيرٍ", "وَزِيرًا", "وَزِيرٌ", "Bakanlar Beyrut’a gitti, biri hariç.", "غَيْرَ + mecrûr."],
      ["وَصَلَ الضُّيُوفُ إِلَى المُتْحَفِ سِوَى ___.", "ضَيْفٍ", "ضَيْفًا", "ضَيْفٌ", "Misafirler müzeye vardı, biri hariç.", "سِوَى + mecrûr."],
      ["غَادَرَتِ السُّفُنُ المِينَاءَ مَا خَلَا ___.", "سَفِينَةً", "سَفِينَةٍ", "سَفِينَةٌ", "Gemiler limandan ayrıldı, biri hariç.", "مَا خَلَا: vâcib nasb."],
      ["تَشْتَرِكُ الأُسْتَاذَاتُ فِي الحَفْلِ حَاشَا ___.", "أُسْتَاذَةً ya da أُسْتَاذَةٍ", "yalnız أُسْتَاذَةً", "أُسْتَاذَةٌ", "Hocalar (kadın) kutlamaya katılıyor, biri hariç.", "حَاشَا: nasb ya da cer."],
      ["مَرَّتِ القِطَارَاتُ بِالمَحَطَّةِ غَيْرَ ___.", "قِطَارٍ", "قِطَارًا", "قِطَارٌ", "Trenler istasyondan geçti, biri hariç.", "غَيْرَ + mecrûr."],
      ["سَيَسْتَقْبِلُ المُوَظَّفُونَ الوَزِيرَ سِوَى ___.", "مُوَظَّفٍ", "مُوَظَّفًا", "مُوَظَّفٌ", "Memurlar bakanı karşılayacak, biri hariç.", "سِوَى + mecrûr."],
      ["تَوَجَّهَ المُسَافِرُونَ إِلَى الحَافِلَةِ مَا عَدَا ___.", "مُسَافِرًا", "مُسَافِرٍ", "مُسَافِرٌ", "Yolcular otobüse yöneldi, biri hariç.", "مَا عَدَا: vâcib nasb."],
      ["دَخَلَ البَاحِثُونَ المَكْتَبَةَ عَدَا ___.", "بَاحِثًا ya da بَاحِثٍ", "yalnız بَاحِثٍ", "بَاحِثٌ", "Araştırmacılar kütüphaneye girdi, biri hariç.", "عَدَا (مَا’sız): nasb ya da cer."]
    ])},
    { type: "pick", fill: true, num: "ب-٥", ar: "اضْبِطِ المُسْتَثْنَى بِالشَّكْلِ", tr: "Müstesnânın doğru harekesini seç.", items: PL([
      ["زَارَتِ الزَّائِرَاتُ الآثَارَ التَّارِيخِيَّةَ غَيْرَ ___.", "زَائِرَةٍ", "زَائِرَةً", "زَائِرَةٌ", "Ziyaretçiler (kadın) tarihî eserleri gezdi, biri hariç.", "غَيْرَ + mecrûr."],
      ["زَارَ وَزِيرُ التَّرْبِيَةِ المَدَارِسَ سِوَى ___.", "مَدْرَسَةٍ", "مَدْرَسَةً", "مَدْرَسَةٌ", "Eğitim bakanı okulları gezdi, biri hariç.", "سِوَى + mecrûr."],
      ["سَتَخْرُجُ الطَّبِيبَاتُ مِنَ المُسْتَشْفَى خَلَا ___.", "طَبِيبَةً ya da طَبِيبَةٍ", "yalnız طَبِيبَةً", "طَبِيبَةٌ", "Kadın doktorlar hastaneden çıkacak, biri hariç.", "خَلَا (مَا’sız): ikisi de câiz."],
      ["اشْتَرَكَتِ المُدَرِّسَاتُ فِي الاجْتِمَاعِ عَدَا ___.", "مُدَرِّسَةً ya da مُدَرِّسَةٍ", "yalnız مُدَرِّسَةٍ", "مُدَرِّسَةٌ", "Öğretmenler (kadın) toplantıya katıldı, biri hariç.", "عَدَا: ikisi de câiz."],
      ["دَخَلَتِ الطَّالِبَاتُ المَكْتَبَاتِ حَاشَا ___.", "مَكْتَبَةً ya da مَكْتَبَةٍ", "yalnız مَكْتَبَةً", "مَكْتَبَةٌ", "Kız öğrenciler kütüphanelere girdi, biri hariç.", "حَاشَا: ikisi de câiz."],
      ["دَخَلَتِ المُسْلِمَاتُ المَسْجِدَ مَا خَلَا ___.", "مُسْلِمَةً", "مُسْلِمَةٍ", "مُسْلِمَةً ya da مُسْلِمَةٍ", "Müslüman kadınlar mescide girdi, biri hariç.", "مَا خَلَا: yalnız nasb."],
      ["حَفِظْتُ سُوَرَ القُرْآنِ الكَرِيمِ سِوَى ___.", "سُورَةٍ", "سُورَةً", "سُورَةٌ", "Kur’an’ın surelerini ezberledim, biri hariç.", "سِوَى + mecrûr."],
      ["نَجَحَتِ الطَّالِبَاتُ فِي الامْتِحَانِ غَيْرَ ___.", "طَالِبَةٍ", "طَالِبَةً", "طَالِبَةٌ", "Kız öğrenciler sınavı kazandı, biri hariç.", "غَيْرَ + mecrûr."]
    ])},
    { type: "pick", fill: true, num: "ب-٦", ar: "امْلَإِ الفَرَاغَ بِمُسْتَثْنًى مُنَاسِبٍ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "Tâmm menfî cümle: parantezdeki edatla doğru yazılışı seç.", exHtml: "<span class=\"ar\">مَا عَادَتِ الطَّائِرَاتُ غَيْرَ طَائِرَةٍ.</span>", items: PL([
      ["مَا ذَهَبَ الطُّلَّابُ ___. (غَيْر)", "غَيْرَ / غَيْرُ طَالِبٍ", "غَيْرَ طَالِبًا", "غَيْرِ طَالِبٍ", "Öğrencilerden biri dışında giden olmadı.", "Menfî: غَيْرَ (nasb) ya da غَيْرُ (الطُّلَّابُ’a bedel); طَالِبٍ mecrûr."],
      ["مَا رَأَيْتُ العُمَّالَ ___. (سِوَى)", "سِوَى عَامِلٍ", "سِوَى عَامِلًا", "سِوَى عَامِلٌ", "İşçilerden biri dışında kimseyi görmedim.", "سِوَى + mecrûr."],
      ["مَا مَرَرْتُ بِالأَصْدِقَاءِ ___. (مَا عَدَا)", "مَا عَدَا صَدِيقًا", "مَا عَدَا صَدِيقٍ", "مَا عَدَا صَدِيقٌ", "Arkadaşlardan biri dışında kimsenin yanından geçmedim.", "مَا عَدَا: vâcib nasb."],
      ["مَا تَفَتَّحَتِ الأَزْهَارُ فِي الحَدِيقَةِ ___. (عَدَا)", "عَدَا زَهْرَةً / زَهْرَةٍ", "عَدَا زَهْرَةٌ", "yalnız عَدَا زَهْرَةٍ", "Bahçede çiçeklerden biri dışında açan olmadı.", "عَدَا: nasb ya da cer."],
      ["مَا اتَّصَلْتُ بِالزَّائِرِينَ ___. (خَلَا)", "خَلَا زَائِرًا / زَائِرٍ", "خَلَا زَائِرٌ", "yalnız خَلَا زَائِرًا", "Ziyaretçilerden biri dışında kimseyle görüşmedim.", "خَلَا: nasb ya da cer."],
      ["مَا رَأَيْتُ الأَطِبَّاءَ ___. (مَا خَلَا)", "مَا خَلَا طَبِيبًا", "مَا خَلَا طَبِيبٍ", "مَا خَلَا طَبِيبٌ", "Doktorlardan biri dışında kimseyi görmedim.", "مَا خَلَا: vâcib nasb."],
      ["لَمْ تَشْتَرِكِ المُدَرِّسَاتُ فِي الحَفْلِ ___. (غَيْر)", "غَيْرَ / غَيْرُ مُدَرِّسَةٍ", "غَيْرَ مُدَرِّسَةً", "غَيْرِ مُدَرِّسَةٍ", "Öğretmenlerden biri dışında katılan olmadı.", "Menfî: nasb ya da bedel."],
      ["لَمْ يَدْخُلِ الطُّلَّابُ المُسْتَشْفَى ___. (سِوَى)", "سِوَى طَالِبٍ", "سِوَى طَالِبًا", "سِوَى طَالِبٌ", "Öğrencilerden biri dışında hastaneye giren olmadı.", "سِوَى + mecrûr."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · HADİS VE OKUMALAR
{
  id: "u5", no: 5, ar: "أَحَادِيثُ وَقِرَاءَاتٌ", tr: "Hadisler ve Okumalar", short: "Okumalar", col: "muz", legend: ["cerr", "mz", "nasb"],
  goals: ["Hadislerde istisnâyı harekelemek", "Sorulara istisnâ üslubuyla cevap vermek", "“Eş’ab ve yemek” ile “Okul ziyareti” metinlerinde rükünleri bulmak"],
  examples: [
    { s: "لَا يُحِبُّهُمْ:- / إِلَّا:mz / مُؤْمِنٌ:nasb", tr: "Onları (Ensâr’ı) ancak mü’min sever. (Hadis · nâkıs)" },
    { s: "زَارَ:- / المَدَارِسَ:cerr / كُلَّهَا:- / غَيْرَ:mz / مَدْرَسَةٍ.:nasb", tr: "Okulların hepsini gezdi, biri hariç." }
  ],
  rules: [
    { tr: "Cevapta istisnâ: <span class=\"ar\">هَلْ نَظَّفَتِ المَرْأَةُ الغُرَفَ؟ ← نَعَمْ، نَظَّفَتِ المَرْأَةُ الغُرَفَ غَيْرَ غُرْفَةٍ</span>. Soru “sen” diyorsa cevap “ben” olur: <span class=\"ar\">أَرْسَلْتَ ← أَرْسَلْتُ</span>." },
    { tr: "Nâkıs üslup “yalnız / ancak” anlamı verir ve çok yaygındır: <span class=\"ar\">مَا نَأْكُلُ إِلَّا سُمًّا</span> (yalnız zehir yiyoruz)." }
  ],
  kaide: ["اقْرَإِ النَّصَّ ثُمَّ اسْتَخْرِجْ مِنْهُ المُسْتَثْنَى مِنْهُ وَالمُسْتَثْنَى."],
  ex: [
    { type: "pick", fill: true, num: "أ-٧", ar: "اقْرَإِ الأَحَادِيثَ الشَّرِيفَةَ وَاضْبِطِ المُسْتَثْنَى بِالشَّكْلِ", tr: "Hadislerdeki müstesnâyı doğru harekesiyle seç.", exHtml: "<span class=\"ar\">قَالَ رَسُولُ اللهِ ﷺ فِي الأَنْصَارِ: لَا يُحِبُّهُمْ إِلَّا مُؤْمِنٌ، وَلَا يُبْغِضُهُمْ إِلَّا مُنَافِقٌ، مَنْ أَحَبَّهُمْ أَحَبَّهُ اللهُ، وَمَنْ أَبْغَضَهُمْ أَبْغَضَهُ اللهُ.</span>", items: PL([
      ["لَا يُحِبُّهُمْ إِلَّا ___.", "مُؤْمِنٌ", "مُؤْمِنًا", "مُؤْمِنٍ", "Onları ancak mü’min sever. (Buhârî, Müslim)", "Nâkıs: fâil, merfû."],
      ["وَلَا يُبْغِضُهُمْ إِلَّا ___.", "مُنَافِقٌ", "مُنَافِقًا", "مُنَافِقٍ", "Onlara ancak münafık buğzeder.", "Nâkıs: fâil."],
      ["وَاللهِ مَا عَلِمْنَا إِلَّا ___.", "خَيْرًا", "خَيْرٌ", "خَيْرٍ", "Vallahi hayırdan başka bir şey bilmedik.", "Nâkıs: mef’ûl, mansûb."],
      ["وَإِنِّي لَا أَقْبَلُ إِلَّا <b>مَا</b> ابْتُغِيَ بِهِ وَجْهِي. (مَا’nın i’rabı)", "mahallen mansûb mef’ûl (nâkıs)", "merfû fâil", "tâmm müsbette müstesnâ", "Ben ancak benim rızam gözetilerek yapılanı kabul ederim.", "Müstesnâ minh yok: أَقْبَلُ’nün mef’ûlü."]
    ])},
    { type: "pick", num: "ب-٨", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ بِأُسْلُوبِ الاسْتِثْنَاءِ", tr: "Soruya istisnâ üslubuyla doğru cevap veren cümleyi seç.", exHtml: "<span class=\"ar\">هَلْ نَظَّفَتِ المَرْأَةُ الغُرَفَ؟ ← نَعَمْ، نَظَّفَتِ المَرْأَةُ الغُرَفَ غَيْرَ غُرْفَةٍ.</span>", items: PL([
      ["هَلْ غَادَرَ الصَّحَفِيُّونَ قَاعَةَ الاجْتِمَاعِ؟", "نَعَمْ، غَادَرَ الصَّحَفِيُّونَ القَاعَةَ إِلَّا صَحَفِيًّا.", "نَعَمْ، غَادَرَ الصَّحَفِيُّونَ القَاعَةَ إِلَّا صَحَفِيٌّ.", "نَعَمْ، غَادَرَ الصَّحَفِيُّونَ القَاعَةَ غَيْرَ صَحَفِيًّا.", "Gazeteciler toplantı salonundan ayrıldı mı? Evet, biri hariç.", "Tâmm müsbet: إِلَّا + mansûb."],
      ["هَلْ أَرْسَلْتَ الكُتُبَ إِلَى بَلَدِكَ؟", "نَعَمْ، أَرْسَلْتُ الكُتُبَ سِوَى كِتَابٍ.", "نَعَمْ، أَرْسَلْتُ الكُتُبَ سِوَى كِتَابًا.", "نَعَمْ، أَرْسَلْتَ الكُتُبَ سِوَى كِتَابٍ.", "Kitapları ülkene gönderdin mi? Evet, biri hariç.", "Cevap “ben”: أَرْسَلْتُ; سِوَى + mecrûr."],
      ["هَلْ رَأَيْتَ الوُزَرَاءَ فِي المُؤْتَمَرِ؟", "نَعَمْ، رَأَيْتُ الوُزَرَاءَ مَا عَدَا وَزِيرًا.", "نَعَمْ، رَأَيْتُ الوُزَرَاءَ مَا عَدَا وَزِيرٍ.", "نَعَمْ، رَأَيْتُ الوُزَرَاءُ مَا عَدَا وَزِيرًا.", "Kongrede bakanları gördün mü? Evet, biri hariç.", "مَا عَدَا: vâcib nasb."],
      ["هَلْ تَفَتَّحَتِ الأَزْهَارُ فِي الحَدِيقَةِ؟", "نَعَمْ، تَفَتَّحَتِ الأَزْهَارُ عَدَا زَهْرَةٍ.", "نَعَمْ، تَفَتَّحَتِ الأَزْهَارُ عَدَا زَهْرَةٌ.", "نَعَمْ، تَفَتَّحَتِ الأَزْهَارَ عَدَا زَهْرَةً.", "Bahçede çiçekler açtı mı? Evet, biri hariç.", "عَدَا: cer (ya da nasb); fâil merfû."],
      ["هَلْ نَظَّفَ العَامِلُ الشَّوَارِعَ؟", "نَعَمْ، نَظَّفَ العَامِلُ الشَّوَارِعَ إِلَّا شَارِعًا.", "نَعَمْ، نَظَّفَ العَامِلُ الشَّوَارِعَ إِلَّا شَارِعٌ.", "نَعَمْ، نَظَّفَ العَامِلُ الشَّوَارِعَ إِلَّا شَارِعٍ.", "İşçi sokakları temizledi mi? Evet, biri hariç.", "Tâmm müsbet."],
      ["هَلْ كَتَبَ الطَّالِبُ التَّدْرِيبَاتِ؟", "نَعَمْ، كَتَبَ الطَّالِبُ التَّدْرِيبَاتِ غَيْرَ تَدْرِيبٍ.", "نَعَمْ، كَتَبَ الطَّالِبُ التَّدْرِيبَاتِ غَيْرُ تَدْرِيبٍ.", "نَعَمْ، كَتَبَ الطَّالِبُ التَّدْرِيبَاتِ غَيْرَ تَدْرِيبًا.", "Öğrenci alıştırmaları yazdı mı? Evet, biri hariç.", "Tâmm müsbet: غَيْرَ vâciben mansûb."],
      ["هَلْ تَسَلَّمَ الخِرِّيجُونَ شَهَادَاتِهِمْ؟", "نَعَمْ، تَسَلَّمَ الخِرِّيجُونَ شَهَادَاتِهِمْ إِلَّا خِرِّيجًا.", "نَعَمْ، تَسَلَّمَ الخِرِّيجُونَ شَهَادَاتِهِمْ إِلَّا خِرِّيجٌ.", "نَعَمْ، تَسَلَّمَ الخِرِّيجُونَ شَهَادَاتِهِمْ إِلَّا خِرِّيجٍ.", "Mezunlar diplomalarını aldı mı? Evet, biri hariç.", "Tâmm müsbet."],
      ["هَلْ فَتَحْتَ الأَبْوَابَ فِي الكُلِّيَّةِ؟", "نَعَمْ، فَتَحْتُ الأَبْوَابَ خَلَا بَابًا.", "نَعَمْ، فَتَحْتُ الأَبْوَابَ خَلَا بَابٌ.", "نَعَمْ، فَتَحْتَ الأَبْوَابَ خَلَا بَابًا.", "Fakültedeki kapıları açtın mı? Evet, biri hariç.", "Cevap “ben”: فَتَحْتُ; خَلَا: nasb (ya da cer بَابٍ)."]
    ])},
    { type: "reading", num: "أ-٨", ar: "اقْرَإِ النَّصَّ التَّالِيَ وَاضْبِطِ المُسْتَثْنَى بِالشَّكْلِ", tr: "Metni oku, soruları cevapla; sonra koyu kelimenin görevini seç. (Kitapta bu alıştırmanın metni yok; dersin serbest okuması kullanıldı.)", title: "أَشْعَبُ وَالطَّعَامُ",
      text: "دَخَلَ رَجُلٌ اسْمُهُ أَشْعَبُ عَلَى جَمَاعَةٍ يَأْكُلُونَ، وَكَانُوا لَا يَعْرِفُونَ أَشْعَبَ. عِنْدَمَا دَخَلَ عَلَيْهِمْ قَالَ: السَّلَامُ عَلَيْكُمْ يَا أَيُّهَا اللِّئَامُ! فَنَظَرُوا إِلَيْهِ قَائِلِينَ: لَا وَاللهِ، نَحْنُ لَسْنَا لِئَامًا، بَلْ نَحْنُ كِرَامٌ. ثُمَّ جَلَسَ أَشْعَبُ بَيْنَهُمْ وَهُوَ يَقُولُ: اللَّهُمَّ اجْعَلْ هَؤُلَاءِ مِنَ الصَّادِقِينَ، وَاجْعَلْنِي مِنَ الكَاذِبِينَ. ثُمَّ مَدَّ يَدَهُ إِلَى الإِنَاءِ الَّذِي بَيْنَ أَيْدِيهِمْ وَهُوَ يَقُولُ: مَاذَا تَأْكُلُونَ؟ قَالُوا: مَا نَأْكُلُ إِلَّا سُمًّا! فَمَلَأَ أَشْعَبُ فَمَهُ وَهُوَ يَقُولُ: الحَيَاةُ مِنْ بَعْدِكُمْ حَرَامٌ عَلَيَّ! فَقَالُوا لَهُ: يَا رَجُلُ، هَلْ عَرَفْتَ مِنَّا أَحَدًا؟ فَأَشَارَ أَشْعَبُ إِلَى الطَّعَامِ قَائِلًا: مَا عَرَفْتُ إِلَّا هَذَا!<br><span class=\"muted\">(العَرَبِيَّةُ بَيْنَ يَدَيْكَ، جـ ٣، ص ١٦٤، بِتَصَرُّفٍ)</span>",
      textTr: "Eş’ab adında bir adam yemek yiyen bir topluluğun yanına girdi; onlar Eş’ab’ı tanımıyorlardı. Yanlarına girince: “Esselâmü aleyküm ey cimriler!” dedi. Ona bakıp: “Hayır vallahi, biz cimri değiliz, bilakis cömertiz” dediler. Eş’ab aralarına oturdu ve: “Allah’ım, bunları doğru söyleyenlerden, beni de yalancılardan kıl” dedi. Sonra elini önlerindeki kaba uzatıp: “Ne yiyorsunuz?” diye sordu. “Zehirden başka bir şey yemiyoruz!” dediler. Eş’ab ağzını doldurdu ve: “Sizden sonra hayat bana haram!” dedi. Ona: “Be adam, aramızdan birini tanıyor musun?” dediler. Eş’ab yemeği göstererek: “Bundan başkasını tanımıyorum!” dedi.",
      qa: [
        { q: "بِمَاذَا سَلَّمَ أَشْعَبُ عَلَى الجَمَاعَةِ؟", a: "قَالَ: السَّلَامُ عَلَيْكُمْ يَا أَيُّهَا اللِّئَامُ!", tr: "Eş’ab topluluğa nasıl selam verdi? “Ey cimriler” diyerek." },
        { q: "مَاذَا قَالُوا عِنْدَمَا سَأَلَهُمْ: مَاذَا تَأْكُلُونَ؟", a: "قَالُوا: مَا نَأْكُلُ إِلَّا سُمًّا!", tr: "“Ne yiyorsunuz?” deyince ne dediler? “Zehirden başka bir şey yemiyoruz.”" },
        { q: "مَاذَا فَعَلَ أَشْعَبُ بَعْدَ ذَلِكَ؟", a: "مَلَأَ فَمَهُ بِالطَّعَامِ.", tr: "Eş’ab sonra ne yaptı? Ağzını doldurdu." },
        { q: "مَنْ عَرَفَ أَشْعَبُ مِنْهُمْ؟", a: "مَا عَرَفَ إِلَّا الطَّعَامَ!", tr: "Eş’ab onlardan kimi tanıyordu? Yalnız yemeği!" }
      ],
      cls: { opts: RL4, ar: "مَا وَظِيفَةُ الكَلِمَةِ؟", tr: "Koyu kelime istisnâda ne?", items: [
        { s: HL("مَا نَأْكُلُ إِلَّا سُمًّا", "سُمًّا"), a: "n", why: "Nâkıs: müstesnâ, i’rabda mef’ûl (mansûb)." },
        { s: HL("مَا نَأْكُلُ إِلَّا سُمًّا", "إِلَّا"), a: "e", why: "İstisnâ edatı (burada hasr)." },
        { s: HL("مَا عَرَفْتُ إِلَّا هَذَا", "هَذَا"), a: "n", why: "Nâkıs: mef’ûl, mahallen mansûb." },
        { s: HL("نَحْنُ لَسْنَا لِئَامًا", "لِئَامًا"), a: "x", why: "لَيْسَ’in haberi." },
        { s: HL("بَلْ نَحْنُ كِرَامٌ", "كِرَامٌ"), a: "x", why: "Haber." },
        { s: HL("فَأَشَارَ أَشْعَبُ إِلَى الطَّعَامِ قَائِلًا", "قَائِلًا"), a: "x", why: "Hâl." },
        { s: HL("هَلْ عَرَفْتَ مِنَّا أَحَدًا؟", "أَحَدًا"), a: "x", why: "Mef’ûlün bih." }
      ]}
    },
    { type: "reading", num: "ب-٩", ar: "اقْرَإِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ المُسْتَثْنَى مِنْهُ وَالمُسْتَثْنَى", tr: "Metni oku, soruları cevapla; sonra koyu kelimeyi sınıflandır.", title: "زِيَارَةُ المَدَارِسِ",
      text: "قَامَ مُدِيرُ التَّرْبِيَةِ فِي إِسْطَنْبُولَ فِي بِدَايَةِ العَامِ الدِّرَاسِيِّ بِجَوْلَةٍ إِلَى بَعْضِ المَدَارِسِ لِلتَّعَرُّفِ عَلَى سَيْرِ الدِّرَاسَةِ فِيهَا. وَقَدْ زَارَ المَدَارِسَ كُلَّهَا غَيْرَ مَدْرَسَةٍ، وَقَابَلَ المُدِيرِينَ كُلَّهُمْ مَا خَلَا مُدِيرًا وَاحِدًا، وَتَحَدَّثَ مَعَهُمْ وَاسْتَمَعَ إِلَى حَدِيثِهِمْ حَوْلَ القَضَايَا التَّعْلِيمِيَّةِ، كَمَا سَأَلَهُمْ عَنِ الكُتُبِ المَدْرَسِيَّةِ، فَأَجَابَهُ أَحَدُهُمْ قَائِلًا: وَصَلَتِ الكُتُبُ كُلُّهَا إِلَى التَّلَامِيذِ سِوَى كِتَابِ المُوسِيقَى، فَوَعَدَهُ بِإِرْسَالِهِ فِي أَسْرَعِ وَقْتٍ مُمْكِنٍ.<br>ثُمَّ عَقَدَ اجْتِمَاعًا مَعَ المُدَرِّسِينَ فِي مَدْرَسَةٍ ابْتِدَائِيَّةٍ. حَضَرَ الاجْتِمَاعَ المُدَرِّسُونَ عَدَا مُدَرِّسٍ؛ لِأَنَّهُ كَانَ مَرِيضًا. وَقَدْ نَاقَشَ المُجْتَمِعُونَ المَشَاكِلَ الَّتِي يُوَاجِهُهَا التَّلَامِيذُ وَطُرُقَ حَلِّهَا. بَعْدَ الاجْتِمَاعِ تَنَاوَلَ مُدِيرُ التَّرْبِيَةِ الغَدَاءَ مَعَ المُدَرِّسِينَ وَالتَّلَامِيذِ فِي مَطْعَمِ المَدْرَسَةِ، ثُمَّ غَادَرَ المَدْرَسَةَ بِسَيَّارَتِهِ الخَاصَّةِ.",
      textTr: "İstanbul millî eğitim müdürü öğretim yılının başında, derslerin gidişatını tanımak için bazı okullara bir gezi yaptı. Okulların hepsini gezdi, biri hariç; müdürlerin hepsiyle görüştü, biri hariç. Onlarla konuştu, eğitim meseleleri hakkındaki sözlerini dinledi; ders kitaplarını da sordu. İçlerinden biri: “Müzik kitabı dışında bütün kitaplar öğrencilere ulaştı” dedi; müdür de onu en kısa zamanda göndermeye söz verdi. Sonra bir ilkokulda öğretmenlerle toplantı yaptı. Toplantıya öğretmenler katıldı, hasta olduğu için biri hariç. Toplananlar öğrencilerin karşılaştığı sorunları ve çözüm yollarını tartıştı. Toplantıdan sonra eğitim müdürü öğretmenler ve öğrencilerle okulun yemekhanesinde öğle yemeği yedi, sonra özel arabasıyla okuldan ayrıldı.",
      qa: [
        { q: "مَتَى قَامَ مُدِيرُ التَّرْبِيَةِ بِجَوْلَتِهِ؟", a: "فِي بِدَايَةِ العَامِ الدِّرَاسِيِّ.", tr: "Müdür gezisini ne zaman yaptı? Öğretim yılının başında." },
        { q: "هَلْ زَارَ المَدَارِسَ كُلَّهَا؟", a: "زَارَهَا كُلَّهَا غَيْرَ مَدْرَسَةٍ.", tr: "Bütün okulları gezdi mi? Biri hariç." },
        { q: "أَيُّ كِتَابٍ لَمْ يَصِلْ إِلَى التَّلَامِيذِ؟", a: "كِتَابُ المُوسِيقَى.", tr: "Hangi kitap öğrencilere ulaşmadı? Müzik kitabı." },
        { q: "لِمَاذَا لَمْ يَحْضُرْ أَحَدُ المُدَرِّسِينَ الاجْتِمَاعَ؟", a: "لِأَنَّهُ كَانَ مَرِيضًا.", tr: "Öğretmenlerden biri neden toplantıya katılmadı? Hastaydı." }
      ],
      cls: { opts: RL5, ar: "اسْتَخْرِجْ: المُسْتَثْنَى مِنْهُ، المُسْتَثْنَى، المَفْعُولُ بِهِ، الاسْمُ المَنْسُوبُ", tr: "Koyu kelime hangisi?", items: [
        { s: HL("زَارَ المَدَارِسَ كُلَّهَا غَيْرَ مَدْرَسَةٍ", "مَدْرَسَةٍ"), a: "n", why: "Müstesnâ (غَيْرَ + mecrûr)." },
        { s: HL("قَابَلَ المُدِيرِينَ كُلَّهُمْ مَا خَلَا مُدِيرًا", "مُدِيرًا"), a: "n", why: "Müstesnâ (مَا خَلَا: vâcib nasb)." },
        { s: HL("وَصَلَتِ الكُتُبُ كُلُّهَا إِلَى التَّلَامِيذِ سِوَى كِتَابِ المُوسِيقَى", "الكُتُبُ"), a: "m", why: "Müstesnâ minh (fâil)." },
        { s: HL("وَصَلَتِ الكُتُبُ كُلُّهَا إِلَى التَّلَامِيذِ سِوَى كِتَابِ المُوسِيقَى", "كِتَابِ"), a: "n", why: "Müstesnâ (سِوَى + mecrûr)." },
        { s: HL("حَضَرَ الاجْتِمَاعَ المُدَرِّسُونَ عَدَا مُدَرِّسٍ", "المُدَرِّسُونَ"), a: "m", why: "Müstesnâ minh (fâil)." },
        { s: HL("حَضَرَ الاجْتِمَاعَ المُدَرِّسُونَ عَدَا مُدَرِّسٍ", "مُدَرِّسٍ"), a: "n", why: "Müstesnâ (عَدَا + cer)." },
        { s: HL("ثُمَّ عَقَدَ اجْتِمَاعًا مَعَ المُدَرِّسِينَ", "اجْتِمَاعًا"), a: "f", why: "Mef’ûlün bih." },
        { s: HL("نَاقَشَ المُجْتَمِعُونَ المَشَاكِلَ", "المَشَاكِلَ"), a: "f", why: "Mef’ûlün bih." },
        { s: HL("تَنَاوَلَ مُدِيرُ التَّرْبِيَةِ الغَدَاءَ", "الغَدَاءَ"), a: "f", why: "Mef’ûlün bih." },
        { s: HL("فِي بِدَايَةِ العَامِ الدِّرَاسِيِّ", "الدِّرَاسِيِّ"), a: "s", why: "Nisbe yâsı: ـِيّ." },
        { s: HL("حَوْلَ القَضَايَا التَّعْلِيمِيَّةِ", "التَّعْلِيمِيَّةِ"), a: "s", why: "İsm-i mensûb (müennes)." },
        { s: HL("سَأَلَهُمْ عَنِ الكُتُبِ المَدْرَسِيَّةِ", "المَدْرَسِيَّةِ"), a: "s", why: "İsm-i mensûb." },
        { s: HL("فِي مَدْرَسَةٍ ابْتِدَائِيَّةٍ", "ابْتِدَائِيَّةٍ"), a: "s", why: "İsm-i mensûb." },
        { s: HL("غَادَرَ المَدْرَسَةَ بِسَيَّارَتِهِ الخَاصَّةِ", "الخَاصَّةِ"), a: "x", why: "Sıfat ama nisbe değil (ism-i fâil خَاصّ)." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["حَضَرَ الطُّلَّابُ إِلَّا {عَلِيًّا}.", ["عَلِيًّا", "عَلِيٌّ", "عَلِيٍّ"], "tâmm müsbet: vâcib nasb", "Öğrenciler geldi, Ali hariç.", "u1"],
  ["ذَهَبَتِ الطَّبِيبَاتُ إِلَّا {طَبِيبَةً}.", ["طَبِيبَةً", "طَبِيبَةٌ", "طَبِيبَةٍ"], "tâmm müsbet", "Doktorlar gitti, biri hariç.", "u1"],
  ["فَسَجَدُوا إِلَّا {إِبْلِيسَ}.", ["إِبْلِيسَ", "إِبْلِيسُ", "إِبْلِيسٍ"], "tâmm müsbet; gayr-i munsarif", "İblis hariç secde ettiler.", "u1"],
  ["هَاجَرَتِ الطُّيُورُ إِلَّا {العَصَافِيرَ}.", ["العَصَافِيرَ", "العَصَافِيرُ", "العَصَافِيرِ"], "tâmm müsbet", "Kuşlar göç etti, serçeler hariç.", "u1"],
  ["مَا حَضَرَ إِلَّا {عَلِيٌّ}.", ["عَلِيٌّ", "عَلِيًّا", "عَلِيٍّ"], "nâkıs: fâil", "Ali’den başkası gelmedi.", "u2"],
  ["مَا رَأَيْتُ إِلَّا {عَلِيًّا}.", ["عَلِيًّا", "عَلِيٌّ", "عَلِيٍّ"], "nâkıs: mef’ûl", "Ali’den başkasını görmedim.", "u2"],
  ["مَا مَرَرْتُ إِلَّا {بِطَالِبٍ}.", ["بِطَالِبٍ", "طَالِبًا", "بِطَالِبًا"], "nâkıs: harf-i cerle", "Bir öğrenciden başkasının yanından geçmedim.", "u2"],
  ["نَجَحَ الطُّلَّابُ إِلَّا {مَحْمُودًا}.", ["مَحْمُودًا", "مَحْمُودٌ", "مَحْمُودٍ"], "tâmm müsbet", "Öğrenciler kazandı, Mahmud hariç.", "u2"],
  ["مَا نَجَحَ إِلَّا {طَالِبٌ}.", ["طَالِبٌ", "طَالِبًا", "طَالِبٍ"], "nâkıs: fâil", "Bir öğrenciden başkası kazanmadı.", "u2"],
  ["لَمْ يَصْعَدْ إِلَى الطَّائِرَةِ إِلَّا {رَاكِبٌ}.", ["رَاكِبٌ", "رَاكِبًا", "رَاكِبٍ"], "nâkıs: fâil", "Uçağa yalnız bir yolcu bindi.", "u2"],
  ["زُرْتُ مَدَارِسَ الحَيِّ إِلَّا {مَدْرَسَةً}.", ["مَدْرَسَةً", "مَدْرَسَةٌ", "مَدْرَسَةٍ"], "tâmm müsbet", "Mahallenin okullarını gezdim, biri hariç.", "u2"],
  ["حَضَرَ الطُّلَّابُ غَيْرَ {عَلِيٍّ}.", ["عَلِيٍّ", "عَلِيًّا", "عَلِيٌّ"], "غَيْرَ + mecrûr", "Öğrenciler geldi, Ali hariç.", "u3"],
  ["حَضَرَ الطُّلَّابُ {غَيْرَ} عَلِيٍّ.", ["غَيْرَ", "غَيْرُ", "غَيْرِ"], "tâmm müsbet: غَيْرَ vâcib nasb", "Öğrenciler geldi, Ali hariç.", "u3"],
  ["مَا حَضَرَ {غَيْرُ} عَلِيٍّ.", ["غَيْرُ", "غَيْرَ", "غَيْرِ"], "nâkıs: غَيْرُ fâil", "Ali’den başkası gelmedi.", "u3"],
  ["حَضَرَتِ الطَّبِيبَاتُ سِوَى {طَبِيبَةٍ}.", ["طَبِيبَةٍ", "طَبِيبَةً", "طَبِيبَةٌ"], "سِوَى + mecrûr", "Doktorlar geldi, biri hariç.", "u3"],
  ["سَافَرْتُ إِلَى البِلَادِ العَرَبِيَّةِ غَيْرَ {الجَزَائِرِ}.", ["الجَزَائِرِ", "الجَزَائِرَ", "الجَزَائِرُ"], "tarifli gayr-i munsarif: kesra", "Arap ülkelerine gittim, Cezayir hariç.", "u3"],
  ["مَا رَأَيْتُ {غَيْرَ} مَحْمُودٍ.", ["غَيْرَ", "غَيْرُ", "غَيْرِ"], "nâkıs: غَيْرَ mef’ûl", "Mahmud’dan başkasını görmedim.", "u3"],
  ["حَضَرَ الطُّلَّابُ مَا عَدَا {طَالِبًا}.", ["طَالِبًا", "طَالِبٍ", "طَالِبٌ"], "مَا عَدَا: vâcib nasb", "Öğrenciler geldi, biri hariç.", "u4"],
  ["هَجَمَ الجُنُودُ مَا خَلَا {جُنْدِيًّا}.", ["جُنْدِيًّا", "جُنْدِيٍّ", "جُنْدِيٌّ"], "مَا خَلَا: vâcib nasb", "Askerler saldırdı, biri hariç.", "u4"],
  ["غَادَرَتِ السُّفُنُ المِينَاءَ مَا خَلَا {سَفِينَةً}.", ["سَفِينَةً", "سَفِينَةٍ", "سَفِينَةٌ"], "مَا خَلَا", "Gemiler limandan ayrıldı, biri hariç.", "u4"],
  ["تَوَجَّهَ المُسَافِرُونَ إِلَى الحَافِلَةِ مَا عَدَا {مُسَافِرًا}.", ["مُسَافِرًا", "مُسَافِرٍ", "مُسَافِرٌ"], "مَا عَدَا", "Yolcular otobüse yöneldi, biri hariç.", "u4"],
  ["دَخَلَتِ المُسْلِمَاتُ المَسْجِدَ مَا خَلَا {مُسْلِمَةً}.", ["مُسْلِمَةً", "مُسْلِمَةٍ", "مُسْلِمَةٌ"], "مَا خَلَا", "Müslüman kadınlar mescide girdi, biri hariç.", "u4"],
  ["لَا يُحِبُّهُمْ إِلَّا {مُؤْمِنٌ}.", ["مُؤْمِنٌ", "مُؤْمِنًا", "مُؤْمِنٍ"], "nâkıs: fâil", "Onları ancak mü’min sever.", "u5"],
  ["وَاللهِ مَا عَلِمْنَا إِلَّا {خَيْرًا}.", ["خَيْرًا", "خَيْرٌ", "خَيْرٍ"], "nâkıs: mef’ûl", "Hayırdan başka bir şey bilmedik.", "u5"],
  ["مَا نَأْكُلُ إِلَّا {سُمًّا}.", ["سُمًّا", "سُمٌّ", "سُمٍّ"], "nâkıs: mef’ûl", "Zehirden başka bir şey yemiyoruz.", "u5"],
  ["وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا {اللهُ}.", ["اللهُ", "اللهَ", "اللهِ"], "nâkıs: fâil", "Onun tevilini Allah’tan başkası bilmez.", "u5"],
  ["لَا يَأْكُلُهُ إِلَّا {الخَاطِئُونَ}.", ["الخَاطِئُونَ", "الخَاطِئِينَ", "الخَاطِئُ"], "nâkıs: fâil, vâv ile", "Onu ancak günahkârlar yer.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا ← غَيْر", "حَضَرَ الطُّلَّابُ غَيْرَ عَلِيٍّ", "حَضَرَ الطُّلَّابُ غَيْرَ عَلِيًّا", "حَضَرَ الطُّلَّابُ غَيْرُ عَلِيٍّ", "غَيْرَ mansûb, ardı mecrûr", "u3"],
  ["حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا ← سِوَى", "حَضَرَ الطُّلَّابُ سِوَى عَلِيٍّ", "حَضَرَ الطُّلَّابُ سِوَى عَلِيًّا", "حَضَرَ الطُّلَّابُ سِوَى عَلِيٌّ", "سِوَى + mecrûr", "u3"],
  ["مَا حَضَرَ إِلَّا عَلِيٌّ ← غَيْر", "مَا حَضَرَ غَيْرُ عَلِيٍّ", "مَا حَضَرَ غَيْرَ عَلِيٍّ", "مَا حَضَرَ غَيْرُ عَلِيٌّ", "nâkıs: غَيْرُ fâil", "u3"],
  ["مَا رَأَيْتُ إِلَّا عَلِيًّا ← غَيْر", "مَا رَأَيْتُ غَيْرَ عَلِيٍّ", "مَا رَأَيْتُ غَيْرُ عَلِيٍّ", "مَا رَأَيْتُ غَيْرَ عَلِيًّا", "nâkıs: غَيْرَ mef’ûl", "u3"],
  ["حَضَرَ الطُّلَّابُ إِلَّا طَالِبًا ← مَا عَدَا", "حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبًا", "حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبٍ", "حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبٌ", "مَا عَدَا: vâcib nasb", "u4"],
  ["حَضَرَ الطُّلَّابُ غَيْرَ طَالِبٍ ← مَا خَلَا", "حَضَرَ الطُّلَّابُ مَا خَلَا طَالِبًا", "حَضَرَ الطُّلَّابُ مَا خَلَا طَالِبٍ", "حَضَرَ الطُّلَّابُ مَا خَلَا طَالِبٌ", "مَا خَلَا: vâcib nasb", "u4"],
  ["حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبًا ← سِوَى", "حَضَرَ الطُّلَّابُ سِوَى طَالِبٍ", "حَضَرَ الطُّلَّابُ سِوَى طَالِبًا", "حَضَرَ الطُّلَّابُ سِوَى طَالِبٌ", "سِوَى + mecrûr", "u4"],
  ["نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا ← olumsuz (nâkıs)", "مَا نَجَحَ إِلَّا مَحْمُودٌ", "مَا نَجَحَ إِلَّا مَحْمُودًا", "مَا نَجَحَ إِلَّا مَحْمُودٍ", "nâkıs: fâil", "u2"],
  ["حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا ← olumsuz (tâmm)", "مَا حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا", "مَا حَضَرَ الطُّلَّابُ إِلَّا عَلِيٍّ", "مَا حَضَرَ الطُّلَّابَ إِلَّا عَلِيًّا", "nasb (ya da bedel عَلِيٌّ)", "u2"],
  ["مَا مَرَرْتُ بِالطُّلَّابِ إِلَّا طَالِبًا ← bedel", "مَا مَرَرْتُ بِالطُّلَّابِ إِلَّا طَالِبٍ", "مَا مَرَرْتُ بِالطُّلَّابِ إِلَّا طَالِبٌ", "مَا مَرَرْتُ بِالطُّلَّابِ إِلَّا بِطَالِبًا", "bedel: mecrûr", "u2"],
  ["مَا نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا ← bedel", "مَا نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودٌ", "مَا نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودٍ", "مَا نَجَحَ الطُّلَّابَ إِلَّا مَحْمُودٌ", "bedel: merfû", "u2"],
  ["مَا حَضَرَ الطُّلَّابُ غَيْرَ عَلِيٍّ ← bedel", "مَا حَضَرَ الطُّلَّابُ غَيْرُ عَلِيٍّ", "مَا حَضَرَ الطُّلَّابُ غَيْرُ عَلِيٌّ", "مَا حَضَرَ الطُّلَّابُ غَيْرِ عَلِيٍّ", "غَيْرُ bedel, merfû", "u3"],
  ["هَلْ نَظَّفْتَ الغُرَفَ؟ ← cevap", "نَعَمْ، نَظَّفْتُ الغُرَفَ غَيْرَ غُرْفَةٍ", "نَعَمْ، نَظَّفْتَ الغُرَفَ غَيْرَ غُرْفَةٍ", "نَعَمْ، نَظَّفْتُ الغُرَفَ غَيْرَ غُرْفَةً", "cevap “ben”; غَيْرَ + mecrûr", "u5"],
  ["حَضَرَ الطُّلَّابُ عَدَا طَالِبًا ← cer", "حَضَرَ الطُّلَّابُ عَدَا طَالِبٍ", "حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبٍ", "حَضَرَ الطُّلَّابُ عَدَا طَالِبٌ", "مَا’sız عَدَا cer de alır", "u4"]
];
// Hangi üslup? hız oyunu
var NOUN_LIST = [];
UNITS.forEach(function (u) { u.ex.forEach(function (ex) {
  if (ex.type === "classify" && ex.opts === TUR) ex.items.forEach(function (it) { NOUN_LIST.push([it.s, it.a, it.why]); });
}); });
[["أُحِبُّ النَّاسَ إِلَّا الكَاذِبِينَ.", "t", "Olumlu, tâmm."], ["مَا فَعَلُوهُ إِلَّا قَلِيلٌ مِنْهُمْ.", "n", "Olumsuz, müstesnâ minh zamir."], ["وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا اللهُ.", "k", "Müstesnâ minh yok."],
 ["لَا يُحِبُّهُمْ إِلَّا مُؤْمِنٌ.", "k", "Nâkıs."], ["مَا غَرَّدَتِ الطُّيُورُ إِلَّا عُصْفُورًا.", "n", "Olumsuz, tâmm."], ["فَسَجَدُوا إِلَّا إِبْلِيسَ.", "t", "Olumlu, tâmm."],
 ["مَا حَضَرَ غَيْرُ عَلِيٍّ.", "k", "Nâkıs (غَيْر ile)."], ["مَا ذَهَبَ الطُّلَّابُ غَيْرَ طَالِبٍ.", "n", "Tâmm menfî."], ["حَضَرَ الطُّلَّابُ مَا عَدَا طَالِبًا.", "t", "Tâmm müsbet."],
 ["مَا نَأْكُلُ إِلَّا سُمًّا.", "k", "Nâkıs."]
].forEach(function (x) { NOUN_LIST.push(x); });
var SP_M = TUR;
// Müstesnânın hükmü: hız oyunu
var MM_OPTS = HKM;
var MM_LIST = UNITS[3].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
[["سَافَرَ الطُّلَّابُ <b class=\"hl\">مَا خَلَا</b> …", "v", "مَا خَلَا"], ["زَارَ المَدَارِسَ <b class=\"hl\">غَيْرَ</b> …", "j", "غَيْرَ + mecrûr"], ["دَخَلَ البَاحِثُونَ <b class=\"hl\">عَدَا</b> …", "c", "عَدَا"],
 ["نَجَحَتِ الطَّالِبَاتُ <b class=\"hl\">سِوَى</b> …", "j", "سِوَى + mecrûr"], ["فَهِمَ المُهَنْدِسُونَ <b class=\"hl\">حَاشَا</b> …", "c", "حَاشَا"], ["فَازَ المُتَسَابِقُونَ <b class=\"hl\">مَا عَدَا</b> …", "v", "مَا عَدَا"],
 ["فَسَجَدُوا <b class=\"hl\">إِلَّا</b> …", "v", "Tâmm müsbet إِلَّا"], ["أُحِبُّ النَّاسَ <b class=\"hl\">خَلَا</b> …", "c", "خَلَا"]
].forEach(function (x) { MM_LIST.push(x); });
var HAFIZA = {
  ed: { name: "إِلَّا ↔ غَيْرَ", pairs: [["إِلَّا عَلِيًّا", "غَيْرَ عَلِيٍّ"], ["إِلَّا طَبِيبَةً", "سِوَى طَبِيبَةٍ"], ["إِلَّا مُدَرِّسًا", "غَيْرَ مُدَرِّسٍ"], ["مَا حَضَرَ إِلَّا عَلِيٌّ", "مَا حَضَرَ غَيْرُ عَلِيٍّ"], ["مَا رَأَيْتُ إِلَّا عَلِيًّا", "مَا رَأَيْتُ غَيْرَ عَلِيٍّ"], ["إِلَّا طَالِبًا", "مَا عَدَا طَالِبًا"], ["إِلَّا جُنْدِيًّا", "مَا خَلَا جُنْدِيًّا"]] },
  us: { name: "Tâmm ↔ nâkıs", pairs: [["حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا", "مَا حَضَرَ إِلَّا عَلِيٌّ"], ["رَأَيْتُ الطُّلَّابَ إِلَّا عَلِيًّا", "مَا رَأَيْتُ إِلَّا عَلِيًّا"], ["مَرَرْتُ بِالطُّلَّابِ إِلَّا طَالِبًا", "مَا مَرَرْتُ إِلَّا بِطَالِبٍ"], ["نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا", "مَا نَجَحَ إِلَّا مَحْمُودٌ"], ["أَكَلْنَا الطَّعَامَ إِلَّا سُمًّا", "مَا نَأْكُلُ إِلَّا سُمًّا"], ["عَادَتِ الطَّائِرَاتُ إِلَّا طَائِرَةً", "مَا عَادَتْ إِلَّا طَائِرَةٌ"], ["حَضَرَ الطُّلَّابُ غَيْرَ عَلِيٍّ", "مَا حَضَرَ غَيْرُ عَلِيٍّ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا", "Ali hariç öğrenciler geldi."], ["مَا حَضَرَ إِلَّا عَلِيٌّ", "Yalnız Ali geldi."], ["لَا يُحِبُّهُمْ إِلَّا مُؤْمِنٌ", "Onları ancak mü’min sever."], ["فَسَجَدُوا إِلَّا إِبْلِيسَ", "İblis hariç secde ettiler."], ["مَا عَرَفْتُ إِلَّا هَذَا", "Bundan başkasını tanımadım."], ["وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا اللهُ", "Tevilini yalnız Allah bilir."], ["زَارَ المَدَارِسَ غَيْرَ مَدْرَسَةٍ", "Biri hariç okulları gezdi."]] }
};
var KARTLAR = [
  ["Müstesnâ nedir?", "İstisnâ edatından sonra gelip öncekinden hükümde ayrılan isim."],
  ["Üç rükün?", "Müstesnâ minh · edat · müstesnâ: حَضَرَ الطُّلَّابُ إِلَّا عَلِيًّا"],
  ["Tâmm müsbet?", "Müstesnâ minh var, cümle olumlu → vâcib nasb."],
  ["Tâmm menfî?", "Nasb ya da bedel: مَا نَجَحَ الطُّلَّابُ إِلَّا مَحْمُودًا / مَحْمُودٌ"],
  ["Nâkıs?", "Müstesnâ minh yok; إِلَّا yokmuş gibi i’rab: مَا نَجَحَ إِلَّا طَالِبٌ"],
  ["غَيْرُ / سِوَى?", "Ardındaki isim hep mecrûr; kendileri إِلَّا’lı müstesnâ gibi i’rab edilir."],
  ["سِوَى’nın harekesi?", "Takdîrî (elif-i maksûre)."],
  ["مَا عَدَا / مَا خَلَا?", "Müstesnâ vâciben mansûb (mef’ûlün bih)."],
  ["عَدَا / خَلَا (مَا’sız)?", "Nasb ya da cer câiz: عَدَا طَالِبًا / طَالِبٍ"],
  ["حَاشَا?", "Başına مَا gelmez; nasb ya da cer câiz."],
  ["مَا حَضَرَ غَيْرُ عَلِيٍّ?", "Nâkıs: غَيْرُ fâil, عَلِيٍّ muzâfun ileyh."],
  ["لَا يُحِبُّهُمْ إِلَّا مُؤْمِنٌ?", "Nâkıs: مُؤْمِنٌ fâil; anlam “ancak mü’min sever”."]
];
