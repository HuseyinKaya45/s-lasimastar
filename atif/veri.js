// ================= VERİ: Atıf ve Atıf Edatları (العَطْفُ وَحُرُوفُهُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "المَعْطُوفُ عَلَيْهِ", tr: "Ma’tûf aleyh" }, mz: { ar: "حَرْفُ العَطْفِ", tr: "Atıf edatı" }, nasb: { ar: "المَعْطُوفُ", tr: "Ma’tûf" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var BT = [["i", "İki isim", "بَيْنَ اسْمَيْنِ", "cerr"], ["f", "İki fiil / fiil cümlesi", "بَيْنَ فِعْلَيْنِ", "mi"], ["c", "İki isim cümlesi", "بَيْنَ جُمْلَتَيْنِ اسْمِيَّتَيْنِ", "nasb"]];
var ANL1 = [["w", "Mutlak cem’ (وَ)", "مُطْلَقُ الجَمْعِ", "cerr"], ["f", "Tertîb + ta’kîb (فَـ)", "التَّرْتِيبُ وَالتَّعْقِيبُ", "nasb"], ["s", "Tertîb + terâhî (ثُمَّ)", "التَّرْتِيبُ وَالتَّرَاخِي", "mi"]];
var ANL2 = [["o", "Tahyîr / şek (أَوْ)", "التَّخْيِيرُ أَوِ الشَّكُّ", "cerr"], ["a", "Ta’yîn talebi (أَمْ)", "طَلَبُ التَّعْيِينِ", "nasb"], ["l", "Nefy (لَا)", "نَفْيُ الحُكْمِ", "x"], ["k", "İstidrâk (لَكِنْ)", "الاسْتِدْرَاكُ", "mi"], ["b", "İdrâb (بَلْ)", "الإِضْرَابُ", "mz"], ["h", "Gâye (حَتَّى)", "الغَايَةُ", "ref"]];
var RL4 = [["m", "Ma’tûf aleyh", "المَعْطُوفُ عَلَيْهِ", "cerr"], ["e", "Atıf edatı", "حَرْفُ العَطْفِ", "mz"], ["n", "Ma’tûf", "المَعْطُوفُ", "nasb"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];
var IRB = [["r", "Merfû", "مَرْفُوعٌ", "cerr"], ["n", "Mansûb", "مَنْصُوبٌ", "nasb"], ["c", "Mecrûr", "مَجْرُورٌ", "mi"]];
var TUR_TR = { i: "İki isim", f: "İki fiil", c: "İki isim cümlesi" };
// Atıf makinesi: çerçeveler [fiil, olumsuz, soru, i’rab adı, Türkçe fiil]
var AF = [["حَضَرَ", "مَا حَضَرَ", "أَحَضَرَ", "merfû (fâil)", "geldi", "geldi"], ["رَأَيْتُ", "مَا رَأَيْتُ", "أَرَأَيْتَ", "mansûb (mef’ûl)", "gördüm", "gördün"], ["سَلَّمْتُ عَلَى", "مَا سَلَّمْتُ عَلَى", "أَسَلَّمْتَ عَلَى", "mecrûr (عَلَى ile)", "selam verdim", "selam verdin"]];
// isim çiftleri: [A: merfû, mansûb, mecrûr], [B: …], Türkçe A, B
var AP = [
  [["الطَّالِبُ", "الطَّالِبَ", "الطَّالِبِ"], ["المُدَرِّسُ", "المُدَرِّسَ", "المُدَرِّسِ"], ["öğrenci", "öğrenciyi", "öğrenciye"], ["öğretmen", "öğretmeni", "öğretmene"]],
  [["المُهَنْدِسُونَ", "المُهَنْدِسِينَ", "المُهَنْدِسِينَ"], ["العُمَّالُ", "العُمَّالَ", "العُمَّالِ"], ["mühendisler", "mühendisleri", "mühendislere"], ["işçiler", "işçileri", "işçilere"]],
  [["الضُّيُوفُ", "الضُّيُوفَ", "الضُّيُوفِ"], ["الوَزِيرُ", "الوَزِيرَ", "الوَزِيرِ"], ["misafirler", "misafirleri", "misafirlere"], ["bakan", "bakanı", "bakana"]]
];
// edatlar: [görünen, bitişik mi, vasl biçimi, tür (n: normal, q: soru, g: olumsuz), anlam, Türkçe kalıbı]
var AE = [
  ["وَ", 1, "وَ", "n", "mutlak cem’", "A ve B {V}"], ["فَـ", 1, "فَ", "n", "tertîb + ta’kîb", "A, hemen ardından B {V}"], ["ثُمَّ", 0, "ثُمَّ", "n", "tertîb + terâhî", "A, bir süre sonra B {V}"],
  ["أَوْ", 0, "أَوِ", "n", "tahyîr / şek", "A ya da B {V}"], ["أَمْ", 0, "أَمِ", "q", "ta’yîn talebi", "A {Q}, B {Q2} {V}?"], ["لَا", 0, "لَا", "n", "nefy", "A {V}, B değil"],
  ["لَكِنْ", 0, "لَكِنِ", "g", "istidrâk", "A değil ama B {V}"], ["بَلْ", 0, "بَلِ", "n", "idrâb", "A {V} — hayır, B"], ["حَتَّى", 0, "حَتَّى", "n", "gâye", "A {V}, B bile"]
];
function atifCumle(fi, ei, pi) {
  var F = AF[fi], E = AE[ei], Pp = AP[pi], a = Pp[0][fi], b = Pp[1][fi];
  var v = E[3] === "q" ? F[2] : E[3] === "g" ? F[1] : F[0];
  var ed = '<b style="color:var(--mz)">' + E[2] + '</b>', bb = '<b style="color:var(--nasb)">' + b + '</b>';
  var ar = v + ' <b style="color:var(--cerr)">' + a + '</b> ' + (E[1] ? ed + bb : ed + ' ' + bb) + (E[3] === "q" ? '؟' : '.');
  var ta = Pp[2][fi], tb = Pp[3][fi];
  return [ar, E[5].replace("A", ta).replace("B", tb).replace("{Q}", soruEki(ta)).replace("{Q2}", soruEki(tb)).replace("{V}", E[3] === "q" ? F[5] : F[4])];
}

function soruEki(w) { var m = w.match(/[aıoueiöü](?=[^aıoueiöü]*$)/); var v = m ? m[0] : "e"; return { a: "mı", ı: "mı", o: "mu", u: "mu", e: "mi", i: "mi", ö: "mü", ü: "mü" }[v]; }
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var UNITS = [
// ---------------------------------------------------------------- 1 · ATIF NEDİR
{
  id: "u1", no: 1, ar: "العَطْفُ وَعَنَاصِرُهُ", tr: "Atıf Nedir? Üç Unsur", short: "Nedir?", col: "mz", legend: ["cerr", "mz", "nasb"],
  goals: ["Atfın, bir kelimeyi bir edatla öncekine bağlayıp i’rabda ona uydurmak olduğunu bilmek", "Üç unsuru bulmak: ma’tûf aleyh, atıf edatı, ma’tûf", "Atfın iki isim, iki fiil ya da iki cümle arasında olabildiğini bilmek"],
  examples: [
    { s: "حَضَرَ:- / إِبْرَاهِيمُ:cerr / وَ:mz / أَحْمَدُ:nasb / إِلَى الاجْتِمَاعِ.:-", tr: "İbrahim ve Ahmed toplantıya geldi. (iki isim)" },
    { s: "أَكَلَ:cerr / عَلِيٌّ:- / وَ:mz / شَرِبَ.:nasb", tr: "Ali yedi ve içti. (iki fiil)", pair: "جَاءَتِ السَّيَّارَةُ:cerr / فَ:mz / رَكِبَ الأَبُ.:nasb", pairTr: "Araba geldi, hemen baba bindi." },
    { s: "العِلْمُ نُورٌ:cerr / وَ:mz / الجَهْلُ ظُلْمَةٌ.:nasb", tr: "İlim nurdur, cehalet karanlıktır. (iki isim cümlesi)" }
  ],
  rules: [
    { tr: "<b>Atıf</b> (<span class=\"ar\">العَطْفُ</span>): bir kelimeyi, kendinden önceki kelimeye bir <b class=\"r-mz\">atıf edatı</b> ile bağlayıp i’rabda ona tâbi kılmaktır." },
    { tr: "Atıf edatları (dokuz): <span class=\"ar\">الوَاوُ، الفَاءُ، ثُمَّ، أَوْ، أَمْ، بَلْ، لَكِنْ، حَتَّى، لَا</span>." },
    { tr: "Üç unsur:", ex: ["المَعْطُوفُ عَلَيْهِ (ma’tûf aleyh): edattan önceki → إِبْرَاهِيمُ", "حَرْفُ العَطْفِ (edat): bağlayan → وَ", "المَعْطُوفُ (ma’tûf): edattan sonraki → أَحْمَدُ"] },
    { tr: "Atıf iki isim (<span class=\"ar\">إِبْرَاهِيمُ وَأَحْمَدُ</span>), iki fiil (<span class=\"ar\">أَكَلَ وَشَرِبَ</span>) ya da iki cümle (<span class=\"ar\">العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةٌ</span>) arasında olur." },
    { tr: "Yazımda <span class=\"ar\">وَ</span> ve <span class=\"ar\">فَـ</span> sonraki kelimeye bitişik yazılır; ötekiler ayrı yazılır. Sâkin biten edat (<span class=\"ar\">أَوْ، أَمْ، بَلْ، لَكِنْ</span>) “ال”den önce esre alır: <span class=\"ar\">أَوِ اللَّبَنَ</span>." }
  ],
  kaide: [
    "١ ـ العَطْفُ هُوَ أَنْ تُرْبَطَ كَلِمَةٌ بِكَلِمَةٍ أُخْرَى قَبْلَهَا لِتَتْبَعَهَا فِي إِعْرَابِهَا، وَذَلِكَ بِاسْتِعْمَالِ أَحَدِ حُرُوفِ العَطْفِ، وَهِيَ: الوَاوُ، الفَاءُ، ثُمَّ، أَوْ، أَمْ، بَلْ، لَكِنْ، حَتَّى، لَا.",
    "٢ ـ يَكُونُ العَطْفُ بَيْنَ اسْمَيْنِ أَوْ فِعْلَيْنِ أَوْ جُمْلَتَيْنِ: حَضَرَ إِبْرَاهِيمُ وَأَحْمَدُ إِلَى الاجْتِمَاعِ / جَاءَتِ السَّيَّارَةُ فَرَكِبَ الأَبُ / العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةٌ.",
    "٣ ـ العَطْفُ يَتَكَوَّنُ مِنْ ثَلَاثَةِ عَنَاصِرَ: أ ـ مَعْطُوفٌ: يَأْتِي بَعْدَ حَرْفِ العَطْفِ. ب ـ مَعْطُوفٌ عَلَيْهِ: يَأْتِي قَبْلَ حَرْفِ العَطْفِ. جـ ـ أَدَاةُ العَطْفِ: تَرْبِطُ بَيْنَ المَعْطُوفِ وَالمَعْطُوفِ عَلَيْهِ."
  ],
  ex: [
    { type: "tag", roles: ["cerr", "mz", "nasb", "x"], num: "١", ar: "عَيِّنِ المَعْطُوفَ وَالمَعْطُوفَ عَلَيْهِ وَأَدَاةَ العَطْفِ", tr: "Parçalara dokunarak Ma’tûf aleyh, Atıf edatı, Ma’tûf ya da Başka diye etiketle.", exHtml: "<span class=\"ar\">رَكِبَ عَلِيٌّ وَأَحْمَدُ الحَافِلَةَ ← عَلِيٌّ · أَحْمَدُ · الوَاوُ</span>", items: [
      T("مَارَسَ مُرَادٌ رِيَاضَةَ:x / كُرَةِ السَّلَّةِ:cerr / وَ:mz / السِّبَاحَةِ:nasb", "Murad basketbol ve yüzme sporu yaptı.", "السِّبَاحَةِ, كُرَةِ’ye atfedildi: mecrûr."),
      T("حَذَّرَ الأَطِبَّاءُ مِنَ:x / الدُّهْنِ:cerr / ثُمَّ:mz / السُّكَّرِ:nasb", "Doktorlar yağdan, sonra da şekerden sakındırdı.", "ثُمَّ ile mecrûr."),
      T("شَرِبَ الطِّفْلُ:x / اللَّبَنَ:cerr / فَ:mz / العَصِيرَ:nasb", "Çocuk sütü, ardından meyve suyunu içti.", "فَـ ile mansûb."),
      T("أَ:x / مُطِيعٌ:cerr / وَلَدُكَ:x / أَمْ:mz / مُعَانِدٌ:nasb / يَا أَحْمَدُ؟:x", "Ahmed, oğlun itaatkâr mı, inatçı mı?", "أَمْ: ta’yîn sorusu; merfû."),
      T("مَا:x / خَافَ:cerr / عَمَّارٌ:x / لَكِنْ:mz / صَبَرَ:nasb", "Ammâr korkmadı, bilakis sabretti.", "Kitap fiile atıf sayıyor (bkz. not)."),
      T("مَا:x / شَكَّ:cerr / بِلَالٌ فِي دَعْوَتِهِ:x / بَلْ:mz / ثَبَتَ:nasb", "Bilâl davasından şüphe etmedi, aksine sebat etti.", "Kitap fiile atıf sayıyor (bkz. not)."),
      T("أَكَلَ يَحْيَى:x / السَّمَكَةَ:cerr / حَتَّى:mz / رَأْسَهَا:nasb", "Yahyâ balığı başına varıncaya kadar yedi.", "حَتَّى: gâye; mansûb."),
      T("اشْرَبِ:x / المَاءَ:cerr / أَوِ:mz / اللَّبَنَ:nasb", "Su ya da süt iç.", "أَوْ: tahyîr; mansûb.")
    ]},
    { type: "classify", extra: true, opts: BT, ar: "بَيْنَ مَاذَا وَقَعَ العَطْفُ؟", tr: "Atıf neyin arasında? İsim, fiil ya da isim cümlesi?", items: CL([
      [HL("حَضَرَ إِبْرَاهِيمُ وَأَحْمَدُ إِلَى الاجْتِمَاعِ", "وَأَحْمَدُ"), "i", "İki isim."],
      [HL("جَاءَتِ السَّيَّارَةُ فَرَكِبَ الأَبُ", "فَرَكِبَ"), "f", "İki fiil (fiil cümlesi)."],
      [HL("العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةٌ", "وَالجَهْلُ ظُلْمَةٌ"), "c", "İki isim cümlesi."],
      [HL("أَكَلَ عَلِيٌّ وَشَرِبَ", "وَشَرِبَ"), "f", "İki fiil."],
      [HL("جَاءَ العَدْلُ وَزَالَ الظُّلْمُ", "وَزَالَ الظُّلْمُ"), "f", "İki fiil cümlesi."],
      [HL("شَرِبَ الطِّفْلُ اللَّبَنَ فَالعَصِيرَ", "فَالعَصِيرَ"), "i", "İki isim."],
      [HL("يَحْتَرِمُنِي إِبْرَاهِيمُ وَأَحْتَرِمُهُ", "وَأَحْتَرِمُهُ"), "f", "İki muzâri fiil."],
      [HL("إِسْطَنْبُولُ مَدِينَةٌ حَدِيثَةٌ وَهِيَ قَدِيمَةٌ", "وَهِيَ قَدِيمَةٌ"), "c", "İki isim cümlesi."],
      [HL("اشْرَبِ المَاءَ أَوِ اللَّبَنَ", "أَوِ اللَّبَنَ"), "i", "İki isim."],
      [HL("الدِّينُ يُسْرٌ لَا عُسْرٌ", "لَا عُسْرٌ"), "i", "İki isim (haber ve ma’tûfu)."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · İ’RABDA UYUM
{
  id: "u2", no: 2, ar: "تَبَعِيَّةُ المَعْطُوفِ فِي الإِعْرَابِ", tr: "Ma’tûf İ’rabda Tâbidir", short: "İ’rab", col: "cerr", legend: ["cerr", "mz", "nasb"],
  goals: ["Ma’tûfu, ma’tûf aleyhin i’rabıyla okumak: merfû, mansûb, mecrûr", "Ma’tûftan geriye bakıp ma’tûf aleyhin i’rabını bulmak", "Gayr-i munsarif ve cem’ alâmetlerini atıfta korumak"],
  examples: [
    { s: "تَنَاوَلَتْ:- / مَرْيَمُ:cerr / وَ:mz / شَوَالُ:nasb / العَشَاءَ فِي مَطْعَمِ الكُلِّيَّةِ.:-", tr: "Meryem ve Şevâl akşam yemeğini fakültenin yemekhanesinde yedi. (merfû)" },
    { s: "زَارَ إِبْرَاهِيمُ وَأَحْمَدُ:- / جَدَّيْهِمَا.:-", tr: "İbrahim ve Ahmed iki dedelerini ziyaret etti.", pair: "رَكِبْتُ:- / الحَافِلَةَ:cerr / ثُمَّ:mz / القِطَارَ.:nasb", pairTr: "Önce otobüse, sonra trene bindim. (mansûb)" },
    { s: "حَذَّرَ الأَطِبَّاءُ مِنَ:- / الدُّهْنِ:cerr / ثُمَّ:mz / السُّكَّرِ.:nasb", tr: "Doktorlar yağdan sonra şekerden sakındırdı. (mecrûr)" }
  ],
  rules: [
    { tr: "Ma’tûf, ma’tûf aleyhin i’rabına <b>tâbi</b>dir: o merfûysa merfû, mansûbsa mansûb, mecrûrsa mecrûr olur." },
    { tr: "Alâmet farklı olabilir ama i’rab aynıdır: <span class=\"ar\">رَأَيْتُ المُهَنْدِسِينَ وَالعُمَّالَ</span> (yâ / fetha: ikisi de mansûb)." },
    { tr: "İ’rab kalıbı: <span class=\"ar\">وَ: حَرْفُ عَطْفٍ · أَحْمَدُ: اسْمٌ مَعْطُوفٌ عَلَى إِبْرَاهِيمَ مَرْفُوعٌ</span>." },
    { tr: "Ma’tûf aleyhteki harf-i cer tekrar edilmeyebilir: <span class=\"ar\">مِنَ الدُّهْنِ ثُمَّ السُّكَّرِ</span>; soru edatı öne alınırsa ma’tûfun harfi takdir edilir: <span class=\"ar\">أَفِي الثَّانَوِيَّةِ تَدْرُسُ أَمِ الجَامِعَةِ</span>." }
  ],
  kaide: ["٤ ـ المَعْطُوفُ يَتْبَعُ المَعْطُوفَ عَلَيْهِ فِي ثَلَاثَةِ أُمُورٍ: أ ـ فِي الإِعْرَابِ: إِذَا كَانَ المَعْطُوفُ عَلَيْهِ مَرْفُوعًا يَكُونُ المَعْطُوفُ مَرْفُوعًا، وَإِذَا كَانَ الأَوَّلُ مَنْصُوبًا أَوْ مَجْرُورًا يَكُونُ الثَّانِي كَذَلِكَ مَنْصُوبًا أَوْ مَجْرُورًا: تَنَاوَلَتْ مَرْيَمُ وَشَوَالُ العَشَاءَ فِي مَطْعَمِ الكُلِّيَّةِ."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "امْلَإِ الفَرَاغَ بِالإِعْرَابِ الصَّحِيحِ لِلْمَعْطُوفِ", tr: "Ma’tûfun doğru harekesini seç: ma’tûf aleyhe uyar.", exHtml: "<span class=\"ar\">نَجَحَتْ عَائِشَةُ وَأُخْتُهَا. (أُخْتَهَا – أُخْتُهَا – أُخْتِهَا)</span>", items: PL([
      ["عَادَ المُسَافِرُ إِلَى أَهْلِهِ مُرْهَقًا وَ___.", "مُتْعَبًا", "مُتْعَبٌ", "مُتْعَبٍ", "Yolcu ailesine bitkin ve yorgun döndü.", "مُرْهَقًا hâl, mansûb → ma’tûf da mansûb."],
      ["زُرْتُ فِي إِسْطَنْبُولَ مَسْجِدَ السُّلَيْمَانِيَّةِ وَ___ طُوبْقَابِي.", "قَصْرَ", "قَصْرُ", "قَصْرِ", "İstanbul’da Süleymaniye Camii’ni ve Topkapı Sarayı’nı gezdim.", "مَسْجِدَ mef’ûl → قَصْرَ mansûb."],
      ["يُعْجِبُنِي فِي الشُّعَرَاءِ الأَتْرَاكِ مُحَمَّدُ عَاكِفٍ لَا ___.", "نَجِيبُ فَاضِلٍ", "نَجِيبَ فَاضِلٍ", "نَجِيبِ فَاضِلٍ", "Türk şairlerinden Mehmed Âkif’i beğeniyorum, Necip Fazıl’ı değil.", "مُحَمَّدُ fâil, merfû → ma’tûf merfû."],
      ["اشْتَرَكَ عَمَّارٌ فِي غَزْوَةِ بَدْرٍ ثُمَّ أُحُدٍ ثُمَّ ___.", "الخَنْدَقِ", "الخَنْدَقُ", "الخَنْدَقَ", "Ammâr Bedir, sonra Uhud, sonra Hendek gazvesine katıldı.", "بَدْرٍ muzâfun ileyh, mecrûr."],
      ["دَخَلَ إِلَى غُرْفَةِ المُدِيرِ مُمَثِّلُ الصَّفِّ فَـ___.", "الطُّلَّابُ", "الطُّلَّابَ", "الطُّلَّابِ", "Müdürün odasına sınıf temsilcisi, ardından öğrenciler girdi.", "مُمَثِّلُ fâil → merfû."],
      ["لَا أُفَضِّلُ قِرَاءَةَ القِصَصِ بَلِ ___.", "الرِّوَايَاتِ", "الرِّوَايَاتُ", "الرِّوَايَاتَ", "Hikâye okumayı değil, romanı tercih ederim.", "القِصَصِ mecrûr → الرِّوَايَاتِ mecrûr."],
      ["أَفِي الثَّانَوِيَّةِ تَدْرُسُ أَمِ ___؟", "الجَامِعَةِ", "الجَامِعَةَ", "الجَامِعَةُ", "Lisede mi okuyorsun, üniversitede mi?", "الثَّانَوِيَّةِ mecrûr (فِي takdir edilir)."],
      ["لَمْ يَكْفُرْ سَالِمٌ نِعْمَةَ رَبِّهِ بَلْ ___.", "شَكَرَ", "شُكْرٌ", "شُكْرًا", "Sâlim Rabbinin nimetine nankörlük etmedi, aksine şükretti.", "Fiile fiil atfedilir."]
    ])},
    { type: "pick", fill: true, num: "٣", ar: "ضَعْ خَطًّا تَحْتَ الإِعْرَابِ الصَّحِيحِ لِلْمَعْطُوفِ عَلَيْهِ", tr: "Bu sefer ters yön: ma’tûfa bakıp ma’tûf aleyhin harekesini seç.", exHtml: "<span class=\"ar\">رَكِبْتُ الحَافِلَةَ ثُمَّ القِطَارَ. (الحَافِلَةَ – الحَافِلَةِ – الحَافِلَةُ)</span>", items: PL([
      ["شَاهَدْتُ فِي الشَّارِعِ ___ وَقِطَّةً.", "كَلْبًا", "كَلْبٌ", "كَلْبٍ", "Sokakta bir köpek ve bir kedi gördüm.", "Mef’ûl: mansûb."],
      ["أُورُوبَّا قَارَّةٌ ___ لَا كَبِيرَةٌ.", "صَغِيرَةٌ", "صَغِيرَةً", "صَغِيرَةٍ", "Avrupa büyük değil, küçük bir kıtadır.", "قَارَّةٌ’nin sıfatı: merfû."],
      ["زَارَ الضُّيُوفُ ___ الأَثَرِيَّةَ ثُمَّ المَنَاظِرَ الطَّبِيعِيَّةَ.", "الأَمَاكِنَ", "الأَمَاكِنِ", "الأَمَاكِنُ", "Misafirler tarihî yerleri, sonra doğal manzaraları gezdi.", "Mef’ûl: mansûb."],
      ["الدِّينُ الَّذِي أَرْسَلَهُ اللهُ إِلَى كَافَّةِ النَّاسِ ___ لَا عُسْرٌ.", "يُسْرٌ", "يُسْرًا", "يُسْرٍ", "Allah’ın bütün insanlara gönderdiği din zorluk değil, kolaylıktır.", "Mübtedânın haberi: merfû."],
      ["حَضَرَ ضُيُوفٌ مِنْ جِيرَانِنَا فَسَلَّمَ عَلَيْهِمْ ___ فَمُصْطَفَى.", "إِبْرَاهِيمُ", "إِبْرَاهِيمَ", "إِبْرَاهِيمِ", "Komşularımızdan misafirler geldi; önce İbrahim, hemen ardından Mustafa onlara selam verdi.", "Fâil: merfû (gayr-i munsarif, tenvinsiz)."],
      ["لَمْ يَدْخُلْ ___ قَاعَةَ المُؤْتَمَرِ بَلْ وَزِيرُ الصِّحَّةِ.", "رَئِيسُ الوُزَرَاءِ", "رَئِيسَ الوُزَرَاءِ", "رَئِيسِ الوُزَرَاءِ", "Kongre salonuna başbakan değil, sağlık bakanı girdi.", "Fâil: merfû."],
      ["يَا يَحْيَى، إِلَى ___ تُسَافِرُ أَمِ العِرَاقِ؟", "السُّعُودِيَّةِ", "السُّعُودِيَّةَ", "السُّعُودِيَّةُ", "Yahyâ, Suudi Arabistan’a mı gidiyorsun, Irak’a mı?", "إِلَى ile mecrûr."],
      ["أَمَرَ اللهُ كُلَّ مُسْلِمٍ بِالصَّلَاةِ وَالزَّكَاةِ وَحَثَّهُ عَلَى ___ وَالعِبَادَةِ.", "الطَّاعَةِ", "الطَّاعَةَ", "الطَّاعَةُ", "Allah her Müslümana namazı ve zekâtı emretti, itaate ve ibadete teşvik etti.", "عَلَى ile mecrûr."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · FİİL VE CÜMLE UYUMU
{
  id: "u3", no: 3, ar: "تَبَعِيَّةُ الفِعْلِ وَالجُمْلَةِ", tr: "Fiil Kipi ve Cümle Türünde Uyum", short: "Fiil · cümle", col: "mi", legend: ["cerr", "mz", "nasb"],
  goals: ["Fiile atfedilen fiili aynı kipte (mâzî / muzâri / emir) yazmak", "İsim cümlesine isim cümlesi, fiil cümlesine fiil cümlesi atfetmek", "Ma’tûf fiilin zamirini doğru kurmak: أَكْرَمَنِي عَلِيٌّ وَأَكْرَمْتُهُ"],
  examples: [
    { s: "أَكْرَمَنِي:cerr / عَلِيٌّ:- / وَ:mz / أَكْرَمْتُهُ.:nasb", tr: "Ali bana ikram etti, ben de ona ikram ettim. (mâzî + mâzî)" },
    { s: "يَحْتَرِمُنِي:cerr / إِبْرَاهِيمُ:- / وَ:mz / أَحْتَرِمُهُ.:nasb", tr: "İbrahim bana saygı duyar, ben de ona. (muzâri + muzâri)", pair: "يَا أَحْمَدُ! خُذْ:cerr / هَذِهِ الرِّسَالَةَ:- / فَ:mz / أَرْسِلْهَا إِلَى عُمَرَ.:nasb", pairTr: "Ahmed! Şu mektubu al ve Ömer’e gönder. (emir + emir)" },
    { s: "جَاءَ العَدْلُ:cerr / وَ:mz / زَالَ الظُّلْمُ.:nasb", tr: "Adalet geldi, zulüm kalktı. (fiil cümlesi + fiil cümlesi)" }
  ],
  rules: [
    { tr: "<b>Fiil kipi</b>: mâzîye mâzî, muzâriye muzâri, emre emir atfedilir: <span class=\"ar\">أَكْرَمَنِي وَأَكْرَمْتُهُ · يَحْتَرِمُنِي وَأَحْتَرِمُهُ · خُذْ فَأَرْسِلْ</span>." },
    { tr: "<b>Cümle türü</b>: kitaba göre isim cümlesine isim cümlesi, fiil cümlesine fiil cümlesi atfedilir: <span class=\"ar\">العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةٌ · جَاءَ العَدْلُ وَزَالَ الظُّلْمُ</span>. (Bu, güzel olan tercihtir; farklı türler de atfedilebilir.)" },
    { tr: "Cümleye cümle atfedilince ikinci cümlenin i’rabı birincininkine bağlıdır; birincinin i’rabdan mahalli yoksa ikincinin de yoktur." }
  ],
  kaide: ["ب ـ فِي صِيغَةِ الفِعْلِ: إِذَا كَانَتْ عَمَلِيَّةُ العَطْفِ بَيْنَ فِعْلٍ وَآخَرَ يَتْبَعُ المَعْطُوفُ المَعْطُوفَ عَلَيْهِ فِي الصِّيغَةِ: أَكْرَمَنِي عَلِيٌّ وَأَكْرَمْتُهُ، يَحْتَرِمُنِي إِبْرَاهِيمُ وَأَحْتَرِمُهُ، يَا أَحْمَدُ! خُذْ هَذِهِ الرِّسَالَةَ فَأَرْسِلْهَا إِلَى عُمَرَ. جـ ـ فِي نَوْعِ الجُمْلَةِ: إِذَا كَانَ العَطْفُ بَيْنَ جُمْلَتَيْنِ فَإِنَّ الجُمْلَةَ الاسْمِيَّةَ تُعْطَفُ عَلَى الجُمْلَةِ الاسْمِيَّةِ، وَكَذَلِكَ الجُمْلَةُ الفِعْلِيَّةُ تُعْطَفُ عَلَى الجُمْلَةِ الفِعْلِيَّةِ: العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةٌ، جَاءَ العَدْلُ وَزَالَ الظُّلْمُ."],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الفِعْلَ المَعْطُوفَ المُنَاسِبَ", tr: "Ma’tûf fiili ma’tûf aleyhle aynı kipte seç.", items: PL([
      ["أَكْرَمَنِي عَلِيٌّ وَ___.", "أَكْرَمْتُهُ", "أُكْرِمُهُ", "أَكْرِمْهُ", "Ali bana ikram etti, ben de ona ikram ettim.", "Mâzîye mâzî."],
      ["يَحْتَرِمُنِي إِبْرَاهِيمُ وَ___.", "أَحْتَرِمُهُ", "احْتَرَمْتُهُ", "احْتَرِمْهُ", "İbrahim bana saygı duyar, ben de ona.", "Muzâriye muzâri."],
      ["يَا أَحْمَدُ! خُذْ هَذِهِ الرِّسَالَةَ فَ___ إِلَى عُمَرَ.", "أَرْسِلْهَا", "تُرْسِلُهَا", "أَرْسَلْتَهَا", "Ahmed, şu mektubu al ve Ömer’e gönder.", "Emre emir."],
      ["دَخَلَ الطَّالِبُ الصَّفَّ ثُمَّ ___.", "جَلَسَ", "يَجْلِسُ", "اجْلِسْ", "Öğrenci sınıfa girdi, sonra oturdu.", "Mâzîye mâzî."],
      ["اقْرَإِ الدَّرْسَ وَ___ مَا فِيهِ.", "احْفَظْ", "حَفِظْتَ", "تَحْفَظُ", "Dersi oku ve içindekini ezberle.", "Emre emir."],
      ["تَسْتَيْقِظُ فَاطِمَةُ مُبَكِّرًا فَ___.", "تُصَلِّي", "صَلَّتْ", "صَلِّي", "Fâtıma erken kalkar ve hemen namaz kılar.", "Muzâriye muzâri."],
      ["أَكَلَ عَلِيٌّ وَ___.", "شَرِبَ", "يَشْرَبُ", "اشْرَبْ", "Ali yedi ve içti.", "Mâzîye mâzî."],
      ["سَافِرْ إِلَى إِسْطَنْبُولَ وَ___ مَسَاجِدَهَا.", "زُرْ", "تَزُورُ", "زُرْتَ", "İstanbul’a git ve camilerini gez.", "Emre emir (ecvef: زُرْ)."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "أَكْمِلِ الجُمْلَةَ المَعْطُوفَةَ", tr: "Kitabın kuralına göre aynı türden ve doğru harekeli ikinci cümleyi seç.", items: PL([
      ["العِلْمُ نُورٌ وَ___.", "الجَهْلُ ظُلْمَةٌ", "الجَهْلَ ظُلْمَةٌ", "الجَهْلُ ظُلْمَةً", "İlim nur, cehalet karanlıktır.", "İsim cümlesine isim cümlesi; mübtedâ ve haber merfû."],
      ["جَاءَ العَدْلُ وَ___.", "زَالَ الظُّلْمُ", "الظُّلْمُ زَائِلٌ", "زَالَ الظُّلْمَ", "Adalet geldi, zulüm kalktı.", "Fiil cümlesine fiil cümlesi; fâil merfû."],
      ["الصِّدْقُ نَجَاةٌ وَ___.", "الكَذِبُ هَلَاكٌ", "يُهْلِكُ الكَذِبُ", "الكَذِبَ هَلَاكٌ", "Doğruluk kurtuluş, yalan helaktir.", "İsim cümlesi."],
      ["طَلَعَتِ الشَّمْسُ وَ___.", "غَرَبَ القَمَرُ", "القَمَرُ غَارِبٌ", "غَرَبَ القَمَرَ", "Güneş doğdu, ay battı.", "Fiil cümlesi."],
      ["الصَّبْرُ مُرٌّ وَ___.", "عَاقِبَتُهُ حُلْوَةٌ", "تَحْلُو عَاقِبَتُهُ", "عَاقِبَتَهُ حُلْوَةٌ", "Sabır acıdır, sonu tatlıdır.", "İsim cümlesi."],
      ["نَجَحَ أَحْمَدُ فَ___.", "فَرِحَ أَبُوهُ", "أَبُوهُ فَرِحٌ", "فَرِحَ أَبَاهُ", "Ahmed kazandı, hemen babası sevindi.", "Fiil cümlesi; أَبُوهُ fâil (esmâ-i hamse: vâv)."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · EDATLARIN ANLAMLARI
{
  id: "u4", no: 4, ar: "مَعَانِي حُرُوفِ العَطْفِ", tr: "Atıf Edatlarının Anlamları", short: "Anlamlar", col: "ref", legend: ["cerr", "mz", "nasb"],
  goals: ["وَ، فَـ، ثُمَّ arasındaki sıralama farkını bilmek", "أَوْ، أَمْ، لَا، لَكِنْ، بَلْ، حَتَّى’nın anlamlarını bilmek", "Bağlama uygun edatı seçmek"],
  examples: [
    { s: "دَخَلَ إِلَى المَحْكَمَةِ:- / القَاضِي:cerr / فَ:mz / المُحَامِي:nasb / فَ:mz / المُتَّهَمُ.:nasb", tr: "Mahkemeye hâkim, hemen ardından avukat, sonra sanık girdi. (tertîb + ta’kîb)" },
    { s: "تُوُفِّيَ:- / الرَّسُولُ ﷺ:cerr / ثُمَّ:mz / أَبُو بَكْرٍ:nasb / ثُمَّ:mz / عُمَرُ.:nasb", tr: "Resûlullah, bir süre sonra Ebû Bekir, sonra Ömer vefat etti. (tertîb + terâhî)" },
    { s: "ظَهَرَ عَلَى البَحْرِ:- / زَوْرَقٌ:cerr / بَلْ:mz / سَفِينَةٌ.:nasb", tr: "Denizde bir sandal — hayır, bir gemi göründü. (idrâb)", pair: "فَرَّ:- / العَدُوُّ:cerr / حَتَّى:mz / القَائِدُ.:nasb", pairTr: "Düşman, komutanı bile kaçtı. (gâye)" }
  ],
  rules: [
    { tr: "Sıralama bildirenler:", ex: ["وَ: mutlak cem’ (sıra bildirmez): حَضَرَ مُحَمَّدٌ وَحَسَنٌ وَحُسَيْنٌ", "فَـ: tertîb + ta’kîb (sıra, hemen ardından): دَخَلَ القَاضِي فَالمُحَامِي فَالمُتَّهَمُ", "ثُمَّ: tertîb + terâhî (sıra, arada zaman): تُوُفِّيَ الرَّسُولُ ﷺ ثُمَّ أَبُو بَكْرٍ ثُمَّ عُمَرُ"] },
    { tr: "Ötekiler:", ex: ["أَوْ: tahyîr ya da şek → نَقَلَ إِلَيَّ الخَبَرَ شَوَالٌ أَوْ نِهَالٌ", "أَمْ: ta’yîn talebi (soru) → عُمَرُ أَمْ مَحْمُودٌ كَتَبَ هَذَا المَقَالَ؟", "لَا: hükmü ma’tûftan kaldırır → نَضِجَ البِطِّيخُ لَا العِنَبُ", "لَكِنْ: istidrâk (olumsuzdan sonra) → مَا نَجَحَ عَلِيٌّ لَكِنْ أُخْتُهُ", "بَلْ: idrâb (önceki hükümden dönme) → ظَهَرَ زَوْرَقٌ بَلْ سَفِينَةٌ", "حَتَّى: gâye (en uç / en beklenmedik) → فَرَّ العَدُوُّ حَتَّى القَائِدُ"] },
    { tr: "<span class=\"ar\">أَمْ</span> hemze ile sorulan iki şeyden birini sorar (<span class=\"ar\">هَلْ</span> ile değil); <span class=\"ar\">هَلْ</span> sorusunda <span class=\"ar\">أَوْ</span> gelir: <span class=\"ar\">هَلْ نَبْدَأُ بِالسُّلَيْمَانِيَّةِ أَوِ السُّلْطَانِ أَحْمَدَ؟</span>" }
  ],
  kaide: ["٥ ـ أَدَوَاتُ العَطْفِ لَهَا مَعَانٍ مُخْتَلِفَةٌ: أ ـ الوَاوُ: لِمُطْلَقِ الجَمْعِ. ب ـ الفَاءُ: لِلتَّرْتِيبِ مَعَ التَّعْقِيبِ. جـ ـ ثُمَّ: لِلتَّرْتِيبِ مَعَ التَّرَاخِي. د ـ أَوْ: لِلتَّخْيِيرِ أَوِ الشَّكِّ. هـ ـ أَمْ: لِطَلَبِ التَّعْيِينِ. و ـ لَا: لِنَفْيِ الحُكْمِ عَنِ المَعْطُوفِ. ز ـ لَكِنْ: لِلاسْتِدْرَاكِ. حـ ـ بَلْ: لِلإِضْرَابِ عَنِ الحُكْمِ السَّابِقِ. ط ـ حَتَّى: لِلْغَايَةِ."],
  ex: [
    { type: "classify", extra: true, opts: ANL1, ar: "مَا مَعْنَى حَرْفِ العَطْفِ؟", tr: "وَ، فَـ، ثُمَّ: koyu edat hangi anlamda?", items: CL([
      [HL("حَضَرَ مُحَمَّدٌ وَحَسَنٌ وَحُسَيْنٌ", "وَحَسَنٌ"), "w", "Sıra yok, yalnız birlikte."],
      [HL("دَخَلَ القَاضِي فَالمُحَامِي فَالمُتَّهَمُ", "فَالمُحَامِي"), "f", "Hemen ardından."],
      [HL("تُوُفِّيَ الرَّسُولُ ﷺ ثُمَّ أَبُو بَكْرٍ", "ثُمَّ"), "s", "Arada iki yıldan fazla zaman var."],
      [HL("شَرِبَ الطِّفْلُ اللَّبَنَ فَالعَصِيرَ", "فَالعَصِيرَ"), "f", "Hemen ardından."],
      [HL("حَذَّرَ الأَطِبَّاءُ مِنَ الدُّهْنِ ثُمَّ السُّكَّرِ", "ثُمَّ"), "s", "Sonra (aralıklı)."],
      [HL("وَلِلَّهِ المَشْرِقُ وَالمَغْرِبُ", "وَالمَغْرِبُ"), "w", "Sıra yok."],
      [HL("آتَيْنَاهُ آيَاتِنَا فَانْسَلَخَ مِنْهَا", "فَانْسَلَخَ"), "f", "Hemen ardından (sebep-sonuç)."],
      [HL("اشْتَرَكَ عَمَّارٌ فِي بَدْرٍ ثُمَّ أُحُدٍ", "ثُمَّ"), "s", "Bedir’den bir yıl sonra Uhud."],
      [HL("مَارَسَ مُرَادٌ كُرَةَ السَّلَّةِ وَالسِّبَاحَةَ", "وَالسِّبَاحَةَ"), "w", "Sıra yok."]
    ]) },
    { type: "classify", extra: true, opts: ANL2, ar: "مَا مَعْنَى حَرْفِ العَطْفِ؟", tr: "أَوْ، أَمْ، لَا، لَكِنْ، بَلْ، حَتَّى: koyu edat hangi anlamda?", items: CL([
      [HL("نَقَلَ إِلَيَّ الخَبَرَ شَوَالٌ أَوْ نِهَالٌ", "أَوْ"), "o", "Şek: emin değilim."],
      [HL("اشْرَبِ المَاءَ أَوِ اللَّبَنَ", "أَوِ"), "o", "Tahyîr: birini seç."],
      [HL("عُمَرُ أَمْ مَحْمُودٌ كَتَبَ هَذَا المَقَالَ؟", "أَمْ"), "a", "Hangisi? Ta’yîn."],
      [HL("نَضِجَ البِطِّيخُ لَا العِنَبُ", "لَا"), "l", "Üzüm olgunlaşmadı."],
      [HL("مَا نَجَحَ عَلِيٌّ لَكِنْ أُخْتُهُ", "لَكِنْ"), "k", "İstidrâk."],
      [HL("ظَهَرَ عَلَى البَحْرِ زَوْرَقٌ بَلْ سَفِينَةٌ", "بَلْ"), "b", "İlk hükümden dönüş."],
      [HL("فَرَّ العَدُوُّ حَتَّى القَائِدُ", "حَتَّى"), "h", "En uç nokta: komutan bile."],
      [HL("أَكَلَ يَحْيَى السَّمَكَةَ حَتَّى رَأْسَهَا", "حَتَّى"), "h", "Başı bile."],
      [HL("أَفِي الثَّانَوِيَّةِ تَدْرُسُ أَمِ الجَامِعَةِ؟", "أَمِ"), "a", "Hangisi?"],
      [HL("أُورُوبَّا قَارَّةٌ صَغِيرَةٌ لَا كَبِيرَةٌ", "لَا"), "l", "Büyük değil."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "اخْتَرْ حَرْفَ العَطْفِ المُنَاسِبَ", tr: "Parantezdeki anlama uyan edatı seç.", items: PL([
      ["دَخَلَ القَاضِي ___المُحَامِي. (hemen ardından)", "فَـ", "ثُمَّ", "أَمْ", "Hâkim, hemen ardından avukat girdi.", "Ta’kîb: فَـ."],
      ["تُوُفِّيَ أَبُو بَكْرٍ ___ عُمَرُ. (yıllar sonra)", "ثُمَّ", "فَـ", "لَا", "Ebû Bekir, yıllar sonra Ömer vefat etti.", "Terâhî: ثُمَّ."],
      ["أَتَشْرَبُ شَايًا ___ قَهْوَةً؟ (hangisi?)", "أَمْ", "لَا", "حَتَّى", "Çay mı içersin, kahve mi?", "Ta’yîn sorusu: أَمْ."],
      ["خُذْ قَلَمًا ___ دَفْتَرًا. (birini seç)", "أَوْ", "أَمْ", "ثُمَّ", "Bir kalem ya da bir defter al.", "Tahyîr: أَوْ."],
      ["نَجَحَ أَحْمَدُ ___ خَالِدٌ. (Hâlid kazanmadı)", "لَا", "أَمْ", "حَتَّى", "Ahmed kazandı, Hâlid değil.", "Nefy: لَا (olumlu cümleden sonra)."],
      ["مَا جَاءَ عَلِيٌّ ___ أَخُوهُ. (ama kardeşi geldi)", "لَكِنْ", "أَمْ", "حَتَّى", "Ali gelmedi ama kardeşi geldi.", "İstidrâk: لَكِنْ (olumsuzdan sonra)."],
      ["قَرَأْتُ الكِتَابَ ___ آخِرَهُ. (sonuna kadar)", "حَتَّى", "لَكِنْ", "أَمْ", "Kitabı sonuna varıncaya kadar okudum.", "Gâye: حَتَّى."],
      ["رَأَيْتُ قِطًّا ___ أَسَدًا. (hayır, aslan!)", "بَلْ", "حَتَّى", "أَمْ", "Bir kedi — hayır, bir aslan gördüm.", "İdrâb: بَلْ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMA
{
  id: "u5", no: 5, ar: "آيَاتٌ وَقِرَاءَةٌ", tr: "Âyetler ve Okuma", short: "Okuma", col: "muz", legend: ["cerr", "mz", "nasb"],
  goals: ["Âyetlerde atfın unsurlarını bulmak", "Zincirleme atfı görmek: بِاللهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ", "“İstanbul’a ziyaret” metninde atıf unsurlarını bulmak"],
  examples: [
    { s: "وَلِلَّهِ:- / المَشْرِقُ:cerr / وَ:mz / المَغْرِبُ:nasb", tr: "Doğu da batı da Allah’ındır. (Bakara 115)" },
    { s: "أَرْسَلْنَاكَ:- / شَاهِدًا:cerr / وَ:mz / مُبَشِّرًا:nasb / وَ:mz / نَذِيرًا:nasb", tr: "Seni şahit, müjdeci ve uyarıcı olarak gönderdik. (Ahzâb 45)" }
  ],
  rules: [
    { tr: "Zincirleme atıfta her ma’tûf ilk ma’tûf aleyhe bağlanır ve onun i’rabını alır: <span class=\"ar\">بِاللهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَاليَوْمِ الآخِرِ</span> (hepsi mecrûr)." },
    { tr: "Fiile fiil, cümleye cümle atfı âyetlerde çoktur: <span class=\"ar\">اقْنُتِي… وَاسْجُدِي وَارْكَعِي</span> (emre emir), <span class=\"ar\">فَانْسَلَخَ… فَأَتْبَعَهُ… فَكَانَ</span> (mâzîye mâzî)." }
  ],
  kaide: ["عَيِّنِ المَعْطُوفَ وَالمَعْطُوفَ عَلَيْهِ وَأَدَاةَ العَطْفِ فِي الآيَاتِ وَالنُّصُوصِ."],
  ex: [
    { type: "tag", roles: ["cerr", "mz", "nasb", "x"], num: "٤", ar: "عَيِّنِ المَعْطُوفَ وَالمَعْطُوفَ عَلَيْهِ وَأَدَاةَ العَطْفِ فِي الآيَاتِ القُرْآنِيَّةِ", tr: "Âyetlerde atıf unsurlarını etiketle.", items: [
      T("إِلَّا مَنْ أَمَرَ بِ:x / صَدَقَةٍ:cerr / أَوْ:mz / مَعْرُوفٍ:nasb / أَوْ:mz / إِصْلَاحٍ:nasb / بَيْنَ النَّاسِ:x", "…ancak sadakayı, iyiliği ya da insanların arasını düzeltmeyi emreden hariç. (Nisâ 114)", "İki ma’tûf da صَدَقَةٍ’ye bağlı: mecrûr."),
      T("وَمَنْ يَكْفُرْ بِ:x / اللهِ:cerr / وَ:mz / مَلَائِكَتِهِ:nasb / وَ:mz / كُتُبِهِ:nasb / وَ:mz / رُسُلِهِ:nasb / وَ:mz / اليَوْمِ الآخِرِ:nasb", "Kim Allah’ı, meleklerini, kitaplarını, peygamberlerini ve âhiret gününü inkâr ederse… (Nisâ 136)", "Zincirleme atıf: hepsi mecrûr."),
      T("أَمْ تَحْسَبُ أَنَّ أَكْثَرَهُمْ:x / يَسْمَعُونَ:cerr / أَوْ:mz / يَعْقِلُونَ:nasb", "Yoksa onların çoğunun işittiğini ya da akıl erdirdiğini mi sanıyorsun? (Furkân 44)", "Muzâriye muzâri."),
      T("إِنَّا أَرْسَلْنَاكَ:x / شَاهِدًا:cerr / وَ:mz / مُبَشِّرًا:nasb / وَ:mz / نَذِيرًا:nasb", "Seni şahit, müjdeci ve uyarıcı olarak gönderdik. (Ahzâb 45)", "Hâle atıf: mansûb."),
      T("وَلِلَّهِ:x / المَشْرِقُ:cerr / وَ:mz / المَغْرِبُ:nasb", "Doğu da batı da Allah’ındır. (Bakara 115)", "Merfû."),
      T("الطَّلَاقُ مَرَّتَانِ فَ:x / إِمْسَاكٌ بِمَعْرُوفٍ:cerr / أَوْ:mz / تَسْرِيحٌ بِإِحْسَانٍ:nasb", "Boşama iki defadır; sonra ya iyilikle tutmak ya da güzellikle bırakmak. (Bakara 229)", "أَوْ: tahyîr; merfû."),
      T("يَا مَرْيَمُ:x / اقْنُتِي لِرَبِّكِ:cerr / وَ:mz / اسْجُدِي:nasb / وَ:mz / ارْكَعِي مَعَ الرَّاكِعِينَ:nasb", "Ey Meryem! Rabbine itaat et, secde et ve rükû edenlerle rükû et. (Âl-i İmrân 43)", "Emre emir."),
      T("وَاتْلُ عَلَيْهِمْ نَبَأَ الَّذِي:x / آتَيْنَاهُ آيَاتِنَا:cerr / فَ:mz / انْسَلَخَ مِنْهَا:nasb / فَ:mz / أَتْبَعَهُ الشَّيْطَانُ:nasb", "Onlara, âyetlerimizi verdiğimiz hâlde onlardan sıyrılan, bunun üzerine şeytanın peşine taktığı kişinin haberini oku. (A’râf 175)", "Mâzîye mâzî; فَـ: ardı ardına.")
    ]},
    { type: "reading", num: "٥", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ عَيِّنْ عَنَاصِرَ العَطْفِ", tr: "Metni oku, soruları cevapla; sonra koyu kelime atfın hangi unsuru?", title: "زِيَارَةٌ إِلَى إِسْطَنْبُولَ",
      text: "حَسَنٌ يُحِبُّ السِّيَاحَةَ، وَهُوَ يَسْكُنُ فِي مَدِينَةِ صَقَرْيَا. فِي العُطْلَةِ الصَّيْفِيَّةِ طَلَبَ حَسَنٌ مِنْ وَالِدِهِ أَنْ يَأْخُذَهُ إِلَى إِسْطَنْبُولَ كَيْ يُشَاهِدَ الأَمَاكِنَ التَّارِيخِيَّةَ وَالثَّقَافِيَّةَ؛ لِأَنَّ إِسْطَنْبُولَ مَدِينَةٌ قَدِيمَةٌ وَمَلِيئَةٌ بِالآثَارِ الإِسْلَامِيَّةِ وَالرُّومَانِيَّةِ. فَوَافَقَ الأَبُ عَلَى طَلَبِ وَلَدِهِ. شَاهَدَ حَسَنٌ هُنَاكَ عَدَدًا كَبِيرًا مِنَ السُّيَّاحِ الَّذِينَ يَقِفُونَ أَمَامَ الآثَارِ التَّارِيخِيَّةِ فَيُصَوِّرُونَهَا وَيَسْتَمِعُونَ إِلَى المَعْلُومَاتِ الَّتِي يُقَدِّمُهَا المُرْشِدُ السِّيَاحِيُّ لَهُمْ.<br>قَالَ الوَالِدُ لِوَلَدِهِ: إِسْطَنْبُولُ مَدِينَةٌ حَدِيثَةٌ، وَهِيَ قَدِيمَةٌ وَتَارِيخِيَّةٌ فِي نَفْسِ الوَقْتِ، وَفِيهَا آثَارٌ قَدِيمَةٌ مِنَ العَهْدِ الرُّومَانِيِّ مِثْلُ آيَاصُوفْيَا، وَفِيهَا أَيْضًا آثَارٌ مِنَ العَهْدِ العُثْمَانِيِّ مِثْلُ مَسْجِدِ السُّلَيْمَانِيَّةِ وَمَسْجِدِ السُّلْطَانِ أَحْمَدَ. قَالَ حَسَنٌ لِوَالِدِهِ: يَا وَالِدِي، هَلْ نَبْدَأُ بِمَسْجِدِ السُّلَيْمَانِيَّةِ أَوِ السُّلْطَانِ أَحْمَدَ؟ أَجَابَ الوَالِدُ: نَبْدَأُ بِمَسْجِدِ السُّلْطَانِ أَحْمَدَ لَا بِالسُّلَيْمَانِيَّةِ؛ لِأَنَّهُ أَقْرَبُ.",
      textTr: "Hasan gezmeyi sever; Sakarya şehrinde oturur. Yaz tatilinde babasından, tarihî ve kültürel yerleri görmek için kendisini İstanbul’a götürmesini istedi; çünkü İstanbul eski ve İslamî ile Roma eserleriyle dolu bir şehirdir. Baba oğlunun isteğini kabul etti. Hasan orada tarihî eserlerin önünde durup onları fotoğraflayan ve rehberin verdiği bilgileri dinleyen çok sayıda turist gördü. Baba oğluna: “İstanbul modern bir şehir; aynı zamanda eski ve tarihî. Ayasofya gibi Roma döneminden eski eserler, Süleymaniye Camii ve Sultan Ahmed Camii gibi Osmanlı döneminden eserler de var” dedi. Hasan babasına: “Babacığım, Süleymaniye Camii’nden mi başlayalım, Sultan Ahmed’den mi?” dedi. Babası: “Süleymaniye’den değil, Sultan Ahmed Camii’nden başlayalım; çünkü daha yakın” diye cevap verdi.",
      qa: [
        { q: "أَيْنَ يَسْكُنُ حَسَنٌ؟", a: "يَسْكُنُ فِي مَدِينَةِ صَقَرْيَا.", tr: "Hasan nerede oturuyor? Sakarya’da." },
        { q: "مَاذَا طَلَبَ حَسَنٌ مِنْ وَالِدِهِ؟", a: "أَنْ يَأْخُذَهُ إِلَى إِسْطَنْبُولَ لِيُشَاهِدَ الأَمَاكِنَ التَّارِيخِيَّةَ وَالثَّقَافِيَّةَ.", tr: "Hasan babasından ne istedi? İstanbul’a götürülmeyi." },
        { q: "مَاذَا يَفْعَلُ السُّيَّاحُ أَمَامَ الآثَارِ؟", a: "يُصَوِّرُونَهَا وَيَسْتَمِعُونَ إِلَى المُرْشِدِ السِّيَاحِيِّ.", tr: "Turistler eserlerin önünde ne yapıyor? Fotoğraf çekip rehberi dinliyor." },
        { q: "اذْكُرْ أَثَرًا مِنَ العَهْدِ الرُّومَانِيِّ.", a: "آيَاصُوفْيَا.", tr: "Roma döneminden bir eser say. Ayasofya." },
        { q: "بِأَيِّ مَسْجِدٍ بَدَآ؟ وَلِمَاذَا؟", a: "بِمَسْجِدِ السُّلْطَانِ أَحْمَدَ؛ لِأَنَّهُ أَقْرَبُ.", tr: "Hangi camiden başladılar, neden? Sultan Ahmed; daha yakın olduğu için." }
      ],
      cls: { opts: RL4, ar: "عَيِّنْ عَنَاصِرَ العَطْفِ", tr: "Koyu kelime atfın hangi unsuru?", items: [
        { s: HL("الأَمَاكِنَ التَّارِيخِيَّةَ وَالثَّقَافِيَّةَ", "التَّارِيخِيَّةَ"), a: "m", why: "Ma’tûf aleyh (sıfat)." },
        { s: HL("الأَمَاكِنَ التَّارِيخِيَّةَ وَالثَّقَافِيَّةَ", "الثَّقَافِيَّةَ"), a: "n", why: "Ma’tûf: mansûb." },
        { s: HL("مَدِينَةٌ قَدِيمَةٌ وَمَلِيئَةٌ بِالآثَارِ", "مَلِيئَةٌ"), a: "n", why: "Ma’tûf: merfû." },
        { s: HL("بِالآثَارِ الإِسْلَامِيَّةِ وَالرُّومَانِيَّةِ", "الإِسْلَامِيَّةِ"), a: "m", why: "Ma’tûf aleyh: mecrûr." },
        { s: HL("يَقِفُونَ أَمَامَ الآثَارِ فَيُصَوِّرُونَهَا", "يَقِفُونَ"), a: "m", why: "Ma’tûf aleyh (fiil)." },
        { s: HL("فَيُصَوِّرُونَهَا وَيَسْتَمِعُونَ إِلَى المَعْلُومَاتِ", "يَسْتَمِعُونَ"), a: "n", why: "Ma’tûf: muzâri." },
        { s: HL("وَهِيَ قَدِيمَةٌ وَتَارِيخِيَّةٌ", "تَارِيخِيَّةٌ"), a: "n", why: "Ma’tûf: merfû." },
        { s: HL("مِثْلُ مَسْجِدِ السُّلَيْمَانِيَّةِ وَمَسْجِدِ السُّلْطَانِ أَحْمَدَ", "وَمَسْجِدِ"), a: "n", why: "Vâv + ma’tûf: mecrûr." },
        { s: HL("بِمَسْجِدِ السُّلَيْمَانِيَّةِ أَوِ السُّلْطَانِ أَحْمَدَ", "أَوِ"), a: "e", why: "Atıf edatı (هَلْ ile أَوْ)." },
        { s: HL("نَبْدَأُ بِمَسْجِدِ السُّلْطَانِ أَحْمَدَ لَا بِالسُّلَيْمَانِيَّةِ", "لَا"), a: "e", why: "Atıf edatı: nefy." },
        { s: HL("فَوَافَقَ الأَبُ عَلَى طَلَبِ وَلَدِهِ", "الأَبُ"), a: "x", why: "Fâil." },
        { s: HL("حَسَنٌ يُحِبُّ السِّيَاحَةَ", "السِّيَاحَةَ"), a: "x", why: "Mef’ûlün bih." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["حَضَرَ إِبْرَاهِيمُ وَ{أَحْمَدُ} إِلَى الاجْتِمَاعِ.", ["أَحْمَدُ", "أَحْمَدَ", "أَحْمَدٍ"], "fâile atıf: merfû", "İbrahim ve Ahmed geldi.", "u1"],
  ["رَكِبَ عَلِيٌّ وَ{أَحْمَدُ} الحَافِلَةَ.", ["أَحْمَدُ", "أَحْمَدَ", "أَحْمَدِ"], "merfû", "Ali ve Ahmed otobüse bindi.", "u1"],
  ["شَرِبَ الطِّفْلُ اللَّبَنَ فَ{العَصِيرَ}.", ["العَصِيرَ", "العَصِيرُ", "العَصِيرِ"], "mef’ûle atıf: mansûb", "Çocuk süt, ardından meyve suyu içti.", "u1"],
  ["اشْرَبِ المَاءَ {أَوِ} اللَّبَنَ.", ["أَوِ", "أَوْ", "أَمِ"], "sâkin + ال: esre", "Su ya da süt iç.", "u1"],
  ["حَذَّرَ الأَطِبَّاءُ مِنَ الدُّهْنِ ثُمَّ {السُّكَّرِ}.", ["السُّكَّرِ", "السُّكَّرَ", "السُّكَّرُ"], "mecrûra atıf", "Doktorlar yağdan, sonra şekerden sakındırdı.", "u2"],
  ["عَادَ المُسَافِرُ مُرْهَقًا وَ{مُتْعَبًا}.", ["مُتْعَبًا", "مُتْعَبٌ", "مُتْعَبٍ"], "hâle atıf: mansûb", "Yolcu bitkin ve yorgun döndü.", "u2"],
  ["زُرْتُ مَسْجِدَ السُّلَيْمَانِيَّةِ وَ{قَصْرَ} طُوبْقَابِي.", ["قَصْرَ", "قَصْرُ", "قَصْرِ"], "mef’ûle atıf", "Süleymaniye’yi ve Topkapı Sarayı’nı gezdim.", "u2"],
  ["اشْتَرَكَ عَمَّارٌ فِي غَزْوَةِ بَدْرٍ ثُمَّ {أُحُدٍ}.", ["أُحُدٍ", "أُحُدًا", "أُحُدٌ"], "muzâfun ileyhe atıf: mecrûr", "Ammâr Bedir’e sonra Uhud’a katıldı.", "u2"],
  ["شَاهَدْتُ فِي الشَّارِعِ {كَلْبًا} وَقِطَّةً.", ["كَلْبًا", "كَلْبٌ", "كَلْبٍ"], "ma’tûf aleyh mansûb", "Sokakta bir köpek ve bir kedi gördüm.", "u2"],
  ["أُورُوبَّا قَارَّةٌ {صَغِيرَةٌ} لَا كَبِيرَةٌ.", ["صَغِيرَةٌ", "صَغِيرَةً", "صَغِيرَةٍ"], "sıfat merfû", "Avrupa küçük bir kıtadır.", "u2"],
  ["رَأَيْتُ المُهَنْدِسِينَ وَ{العُمَّالَ}.", ["العُمَّالَ", "العُمَّالُ", "العُمَّالِ"], "alâmet farklı, i’rab aynı: mansûb", "Mühendisleri ve işçileri gördüm.", "u2"],
  ["أَكْرَمَنِي عَلِيٌّ وَ{أَكْرَمْتُهُ}.", ["أَكْرَمْتُهُ", "أُكْرِمُهُ", "أَكْرِمْهُ"], "mâzîye mâzî", "Ali bana ikram etti, ben de ona.", "u3"],
  ["يَحْتَرِمُنِي إِبْرَاهِيمُ وَ{أَحْتَرِمُهُ}.", ["أَحْتَرِمُهُ", "احْتَرَمْتُهُ", "احْتَرِمْهُ"], "muzâriye muzâri", "İbrahim bana saygı duyar, ben de ona.", "u3"],
  ["خُذْ هَذِهِ الرِّسَالَةَ فَ{أَرْسِلْهَا} إِلَى عُمَرَ.", ["أَرْسِلْهَا", "تُرْسِلُهَا", "أَرْسَلْتَهَا"], "emre emir", "Bu mektubu al ve Ömer’e gönder.", "u3"],
  ["العِلْمُ نُورٌ وَ{الجَهْلُ} ظُلْمَةٌ.", ["الجَهْلُ", "الجَهْلَ", "الجَهْلِ"], "isim cümlesine isim cümlesi", "İlim nur, cehalet karanlık.", "u3"],
  ["جَاءَ العَدْلُ وَزَالَ {الظُّلْمُ}.", ["الظُّلْمُ", "الظُّلْمَ", "الظُّلْمِ"], "fiil cümlesi: fâil merfû", "Adalet geldi, zulüm kalktı.", "u3"],
  ["دَخَلَ القَاضِي {فَ}المُحَامِي.", ["فَ", "ثُمَّ ", "أَمِ "], "hemen ardından", "Hâkim, ardından avukat girdi.", "u4"],
  ["تُوُفِّيَ الرَّسُولُ ﷺ {ثُمَّ} أَبُو بَكْرٍ.", ["ثُمَّ", "فَ", "لَا"], "terâhî", "Resûlullah, sonra Ebû Bekir vefat etti.", "u4"],
  ["عُمَرُ {أَمْ} مَحْمُودٌ كَتَبَ هَذَا المَقَالَ؟", ["أَمْ", "لَا", "حَتَّى"], "ta’yîn sorusu", "Bu makaleyi Ömer mi yazdı, Mahmud mu?", "u4"],
  ["نَضِجَ البِطِّيخُ {لَا} العِنَبُ.", ["لَا", "أَمِ", "حَتَّى"], "nefy", "Karpuz olgunlaştı, üzüm değil.", "u4"],
  ["مَا نَجَحَ عَلِيٌّ {لَكِنْ} أُخْتُهُ.", ["لَكِنْ", "أَمْ", "حَتَّى"], "istidrâk", "Ali kazanmadı ama kız kardeşi kazandı.", "u4"],
  ["فَرَّ العَدُوُّ حَتَّى {القَائِدُ}.", ["القَائِدُ", "القَائِدَ", "القَائِدِ"], "fâile atıf: merfû", "Düşman, komutanı bile kaçtı.", "u4"],
  ["وَلِلَّهِ المَشْرِقُ وَ{المَغْرِبُ}.", ["المَغْرِبُ", "المَغْرِبَ", "المَغْرِبِ"], "merfû", "Doğu da batı da Allah’ındır.", "u5"],
  ["أَرْسَلْنَاكَ شَاهِدًا وَمُبَشِّرًا وَ{نَذِيرًا}.", ["نَذِيرًا", "نَذِيرٌ", "نَذِيرٍ"], "hâle atıf: mansûb", "Seni şahit, müjdeci ve uyarıcı gönderdik.", "u5"],
  ["بِاللهِ وَمَلَائِكَتِهِ وَ{كُتُبِهِ}.", ["كُتُبِهِ", "كُتُبَهُ", "كُتُبُهُ"], "mecrûra atıf", "Allah’a, meleklerine ve kitaplarına.", "u5"],
  ["هَلْ نَبْدَأُ بِالسُّلَيْمَانِيَّةِ {أَوِ} السُّلْطَانِ أَحْمَدَ؟", ["أَوِ", "أَمِ", "لَكِنِ"], "هَلْ ile أَوْ", "Süleymaniye’den mi başlayalım, Sultan Ahmed’den mi?", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["حَضَرَ الطَّالِبُ وَالمُدَرِّسُ ← رَأَيْتُ", "رَأَيْتُ الطَّالِبَ وَالمُدَرِّسَ", "رَأَيْتُ الطَّالِبَ وَالمُدَرِّسُ", "رَأَيْتُ الطَّالِبُ وَالمُدَرِّسَ", "ikisi de mansûb", "u2"],
  ["حَضَرَ الطَّالِبُ وَالمُدَرِّسُ ← سَلَّمْتُ عَلَى", "سَلَّمْتُ عَلَى الطَّالِبِ وَالمُدَرِّسِ", "سَلَّمْتُ عَلَى الطَّالِبِ وَالمُدَرِّسُ", "سَلَّمْتُ عَلَى الطَّالِبِ وَالمُدَرِّسَ", "ikisi de mecrûr", "u2"],
  ["حَضَرَ المُهَنْدِسُونَ وَالعُمَّالُ ← رَأَيْتُ", "رَأَيْتُ المُهَنْدِسِينَ وَالعُمَّالَ", "رَأَيْتُ المُهَنْدِسِينَ وَالعُمَّالُ", "رَأَيْتُ المُهَنْدِسُونَ وَالعُمَّالَ", "yâ ve fetha: ikisi mansûb", "u2"],
  ["رَأَيْتُ الضُّيُوفَ وَالوَزِيرَ ← حَضَرَ", "حَضَرَ الضُّيُوفُ وَالوَزِيرُ", "حَضَرَ الضُّيُوفُ وَالوَزِيرَ", "حَضَرَ الضُّيُوفَ وَالوَزِيرُ", "ikisi de merfû", "u2"],
  ["حَضَرَ الطَّالِبُ وَالمُدَرِّسُ ← أَمْ (soru)", "أَحَضَرَ الطَّالِبُ أَمِ المُدَرِّسُ؟", "هَلْ حَضَرَ الطَّالِبُ أَمِ المُدَرِّسُ؟", "أَحَضَرَ الطَّالِبُ أَمِ المُدَرِّسَ؟", "hemze + أَمْ; merfû", "u4"],
  ["حَضَرَ الطَّالِبُ وَالمُدَرِّسُ ← لَكِنْ", "مَا حَضَرَ الطَّالِبُ لَكِنِ المُدَرِّسُ", "حَضَرَ الطَّالِبُ لَكِنِ المُدَرِّسُ", "مَا حَضَرَ الطَّالِبُ لَكِنِ المُدَرِّسَ", "لَكِنْ olumsuzdan sonra", "u4"],
  ["حَضَرَ الطَّالِبُ وَالمُدَرِّسُ ← لَا", "حَضَرَ الطَّالِبُ لَا المُدَرِّسُ", "مَا حَضَرَ الطَّالِبُ لَا المُدَرِّسُ", "حَضَرَ الطَّالِبُ لَا المُدَرِّسَ", "لَا olumludan sonra", "u4"],
  ["حَضَرَ الطَّالِبُ وَالمُدَرِّسُ ← أَوْ", "حَضَرَ الطَّالِبُ أَوِ المُدَرِّسُ", "حَضَرَ الطَّالِبُ أَوْ المُدَرِّسَ", "حَضَرَ الطَّالِبُ أَمِ المُدَرِّسُ", "أَوِ + merfû", "u4"],
  ["حَضَرَ الطَّالِبُ وَالمُدَرِّسُ ← بَلْ", "حَضَرَ الطَّالِبُ بَلِ المُدَرِّسُ", "حَضَرَ الطَّالِبُ بَلِ المُدَرِّسَ", "حَضَرَ الطَّالِبُ بَلْ المُدَرِّسِ", "بَلِ + merfû", "u4"],
  ["أَكْرَمَنِي عَلِيٌّ ← وَ + ben", "أَكْرَمَنِي عَلِيٌّ وَأَكْرَمْتُهُ", "أَكْرَمَنِي عَلِيٌّ وَأُكْرِمُهُ", "أَكْرَمَنِي عَلِيٌّ وَأَكْرَمَنِي", "mâzîye mâzî", "u3"],
  ["يَحْتَرِمُنِي إِبْرَاهِيمُ ← وَ + ben", "يَحْتَرِمُنِي إِبْرَاهِيمُ وَأَحْتَرِمُهُ", "يَحْتَرِمُنِي إِبْرَاهِيمُ وَاحْتَرَمْتُهُ", "يَحْتَرِمُنِي إِبْرَاهِيمُ وَاحْتَرِمْهُ", "muzâriye muzâri", "u3"],
  ["خُذِ الرِّسَالَةَ ← فَ + gönder", "خُذِ الرِّسَالَةَ فَأَرْسِلْهَا", "خُذِ الرِّسَالَةَ فَتُرْسِلُهَا", "خُذِ الرِّسَالَةَ فَأَرْسَلْتَهَا", "emre emir", "u3"],
  ["العِلْمُ نُورٌ ← وَ + cehalet", "العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةٌ", "العِلْمُ نُورٌ وَالجَهْلَ ظُلْمَةٌ", "العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةً", "isim cümlesine isim cümlesi", "u3"],
  ["دَخَلَ القَاضِي وَالمُحَامِي ← hemen ardından", "دَخَلَ القَاضِي فَالمُحَامِي", "دَخَلَ القَاضِي ثُمَّ المُحَامِي", "دَخَلَ القَاضِي أَوِ المُحَامِي", "ta’kîb: فَـ", "u4"]
];
// İsim mi, fiil mi, cümle mi? hız oyunu
var NOUN_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
[[HL("نَجَحَتْ عَائِشَةُ وَأُخْتُهَا", "وَأُخْتُهَا"), "i", "İki isim."], [HL("اقْنُتِي لِرَبِّكِ وَاسْجُدِي", "وَاسْجُدِي"), "f", "İki emir fiil."], [HL("الصِّدْقُ نَجَاةٌ وَالكَذِبُ هَلَاكٌ", "وَالكَذِبُ هَلَاكٌ"), "c", "İki isim cümlesi."],
 [HL("طَلَعَتِ الشَّمْسُ وَغَرَبَ القَمَرُ", "وَغَرَبَ القَمَرُ"), "f", "İki fiil cümlesi."], [HL("وَلِلَّهِ المَشْرِقُ وَالمَغْرِبُ", "وَالمَغْرِبُ"), "i", "İki isim."], [HL("يَسْمَعُونَ أَوْ يَعْقِلُونَ", "أَوْ يَعْقِلُونَ"), "f", "İki fiil."]
].forEach(function (x) { NOUN_LIST.push(x); });
var SP_M = BT;
// Ma’tûfun i’rabı? hız oyunu
var MM_OPTS = IRB;
var MM_LIST = [
  [HL("حَضَرَ إِبْرَاهِيمُ وَأَحْمَدُ", "أَحْمَدُ"), "r", "Fâile atıf."], [HL("رَكِبْتُ الحَافِلَةَ ثُمَّ القِطَارَ", "القِطَارَ"), "n", "Mef’ûle atıf."], [HL("حَذَّرَ مِنَ الدُّهْنِ ثُمَّ السُّكَّرِ", "السُّكَّرِ"), "c", "Mecrûra atıf."],
  [HL("نَجَحَتْ عَائِشَةُ وَأُخْتُهَا", "أُخْتُهَا"), "r", "Fâile atıf."], [HL("شَاهَدْتُ كَلْبًا وَقِطَّةً", "قِطَّةً"), "n", "Mef’ûle atıf."], [HL("فِي غَزْوَةِ بَدْرٍ ثُمَّ أُحُدٍ", "أُحُدٍ"), "c", "Muzâfun ileyhe atıf."],
  [HL("رَأَيْتُ المُهَنْدِسِينَ وَالعُمَّالَ", "المُهَنْدِسِينَ"), "n", "Mef’ûl: yâ ile."], [HL("سَلَّمْتُ عَلَى الضُّيُوفِ حَتَّى الوَزِيرِ", "الوَزِيرِ"), "c", "عَلَى ile mecrûra atıf."], [HL("فَرَّ العَدُوُّ حَتَّى القَائِدُ", "القَائِدُ"), "r", "Fâile atıf."],
  [HL("أَرْسَلْنَاكَ شَاهِدًا وَمُبَشِّرًا", "مُبَشِّرًا"), "n", "Hâle atıf."], [HL("بِاللهِ وَمَلَائِكَتِهِ", "مَلَائِكَتِهِ"), "c", "Mecrûra atıf."], [HL("الدِّينُ يُسْرٌ لَا عُسْرٌ", "عُسْرٌ"), "r", "Habere atıf."],
  [HL("مَا نَجَحَ عَلِيٌّ لَكِنْ أُخْتُهُ", "أُخْتُهُ"), "r", "Fâile atıf."], [HL("أَكَلَ يَحْيَى السَّمَكَةَ حَتَّى رَأْسَهَا", "رَأْسَهَا"), "n", "Mef’ûle atıf."], [HL("لَا أُفَضِّلُ القِصَصَ بَلِ الرِّوَايَاتِ", "الرِّوَايَاتِ"), "n", "Mef’ûle atıf: cem-i müennes esreyle mansûb!"],
  [HL("إِلَى السُّعُودِيَّةِ أَمِ العِرَاقِ", "العِرَاقِ"), "c", "إِلَى ile mecrûra atıf."]
];
var HAFIZA = {
  ed: { name: "Edat ↔ anlamı", pairs: [["وَ", "mutlak cem’"], ["فَـ", "hemen ardından"], ["ثُمَّ", "bir süre sonra"], ["أَوْ", "ya da"], ["أَمْ", "…mı, …mı?"], ["لَا", "…değil"], ["بَلْ", "hayır, bilakis"], ["حَتَّى", "…bile"]] },
  ir: { name: "Ma’tûf aleyh ↔ ma’tûf", pairs: [["إِبْرَاهِيمُ", "وَأَحْمَدُ"], ["الحَافِلَةَ", "ثُمَّ القِطَارَ"], ["مِنَ الدُّهْنِ", "ثُمَّ السُّكَّرِ"], ["المَشْرِقُ", "وَالمَغْرِبُ"], ["شَاهِدًا", "وَمُبَشِّرًا"], ["كَلْبًا", "وَقِطَّةً"], ["بِاللهِ", "وَمَلَائِكَتِهِ"]] },
  fi: { name: "Fiil ↔ ma’tûf fiil", pairs: [["أَكْرَمَنِي", "وَأَكْرَمْتُهُ"], ["يَحْتَرِمُنِي", "وَأَحْتَرِمُهُ"], ["خُذْ", "فَأَرْسِلْ"], ["أَكَلَ", "وَشَرِبَ"], ["اقْنُتِي", "وَاسْجُدِي"], ["دَخَلَ", "ثُمَّ جَلَسَ"], ["يَسْمَعُونَ", "أَوْ يَعْقِلُونَ"]] }
};
var KARTLAR = [
  ["Atıf nedir?", "Bir kelimeyi edatla öncekine bağlayıp i’rabda ona tâbi kılmak."],
  ["Atıf edatları?", "وَ، فَـ، ثُمَّ، أَوْ، أَمْ، بَلْ، لَكِنْ، حَتَّى، لَا"],
  ["Üç unsur?", "Ma’tûf aleyh · edat · ma’tûf: إِبْرَاهِيمُ وَأَحْمَدُ"],
  ["Ma’tûf neye uyar?", "İ’rabda ma’tûf aleyhe: merfûya merfû, mansûba mansûb, mecrûra mecrûr."],
  ["Fiile atıf?", "Aynı kip: أَكْرَمَنِي وَأَكْرَمْتُهُ · خُذْ فَأَرْسِلْ"],
  ["Cümleye atıf?", "İsim cümlesine isim cümlesi: العِلْمُ نُورٌ وَالجَهْلُ ظُلْمَةٌ"],
  ["وَ / فَـ / ثُمَّ?", "Mutlak cem’ · tertîb + ta’kîb · tertîb + terâhî"],
  ["أَوْ / أَمْ?", "Tahyîr-şek · ta’yîn talebi (hemzeli soruda)"],
  ["لَا / لَكِنْ?", "لَا olumludan sonra nefy · لَكِنْ olumsuzdan sonra istidrâk"],
  ["بَلْ?", "İdrâb: ظَهَرَ زَوْرَقٌ بَلْ سَفِينَةٌ"],
  ["حَتَّى?", "Gâye: فَرَّ العَدُوُّ حَتَّى القَائِدُ"],
  ["أَوِ اللَّبَنَ — neden esre?", "Sâkin edat + ال: iki sâkin buluşur, edat esre alır."]
];
