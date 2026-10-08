// ================= VERİ: Şartın Cevabının Fâ ile Birlikte Gelmesi (اقْتِرَانُ جَوَابِ الشَّرْطِ بِالفَاءِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "أَدَاةُ الشَّرْطِ", tr: "Şart edatı" }, nasb: { ar: "فِعْلُ الشَّرْطِ", tr: "Şart fiili" }, cerr: { ar: "جَوَابُ الشَّرْطِ", tr: "Cevap" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var SBB = [["i", "İsim cümlesi", "جُمْلَةٌ اسْمِيَّةٌ", "nasb"], ["t", "Talep (emir, nehy, istifham, temennî)", "جُمْلَةٌ طَلَبِيَّةٌ", "cerr"], ["n", "مَا / لَا / لَنْ ile nefy", "مَنْفِيَّةٌ بِمَا / لَا / لَنْ", "mi"], ["q", "قَدْ / سَـ / سَوْفَ", "مَسْبُوقَةٌ بِقَدْ / السِّينِ / سَوْفَ", "ref"], ["j", "Câmid fiil", "فِعْلُهَا جَامِدٌ", "mz"]];
var FN = [["v", "Fâ gerekli", "يَجِبُ اقْتِرَانُهُ بِالفَاءِ", "cerr"], ["y", "Fâ gerekmez", "لَا يَجِبُ اقْتِرَانُهُ بِالفَاءِ", "x"]];
var IR = [["r", "Merfû", "مَرْفُوعٌ", "nasb"], ["s", "Mansûb", "مَنْصُوبٌ", "cerr"], ["m", "Meczûm", "مَجْزُومٌ", "mi"]];
var RDS = SBB.concat([["x", "Şart cevabı değil", "لَيْسَتْ جَوَابَ شَرْطٍ", "x"]]);
var TUR_TR = { i: "İsim cümlesi", t: "Talep", n: "Nefy (مَا / لَا / لَنْ)", q: "قَدْ / سَـ / سَوْفَ", j: "Câmid fiil", v: "Fâ gerekli", y: "Fâ gerekmez", r: "Merfû", s: "Mansûb", m: "Meczûm", x: "Cevap değil" };
// Makine: [edat, şart fiili, Türkçe şart, [6 cevap], [6 Türkçe]]
var MI = [
  ["إِنْ", "تَجْتَهِدْ", "Çalışırsan", ["تَنْجَحْ", "فَالنَّجَاحُ حَلِيفُكَ", "فَاسْتَمِرَّ فِي اجْتِهَادِكَ", "فَلَنْ تَفْشَلَ", "فَسَوْفَ تَنْجَحُ", "فَنِعْمَ مَا تَفْعَلُ"], ["başarırsın", "başarı senin dostundur", "çalışmaya devam et", "asla başarısız olmazsın", "başaracaksın", "ne güzel yapıyorsun"]],
  ["مَنْ", "يَصْدُقْ", "Kim doğru söylerse", ["يَثِقْ بِهِ النَّاسُ", "فَهُوَ مَحْبُوبٌ", "فَلْيَثْبُتْ عَلَى صِدْقِهِ", "فَلَا يَخَافُ أَحَدًا", "فَسَيَثِقُ بِهِ النَّاسُ", "فَلَيْسَ بِخَاسِرٍ"], ["insanlar ona güvenir", "o sevilen biridir", "doğruluğunda sebat etsin", "kimseden korkmaz", "insanlar ona güvenecek", "kaybeden değildir"]],
  ["إِذَا", "جَاءَ الضَّيْفُ", "Misafir geldiğinde", ["أَكْرَمْنَاهُ", "فَالبَيْتُ بَيْتُهُ", "فَأَكْرِمْهُ", "فَلَنْ نَتْرُكَهُ وَحْدَهُ", "فَسَنُكْرِمُهُ", "فَعَسَى أَنْ يُسَرَّ"], ["ona ikram ederiz", "ev onun evidir", "ona ikram et", "onu asla yalnız bırakmayız", "ona ikram edeceğiz", "umulur ki sevinir"]],
  ["مَتَى", "تَقْرَأْ", "Ne zaman okursan", ["تَتَعَلَّمْ", "فَالكِتَابُ صَدِيقُكَ", "فَاخْتَرْ كِتَابًا نَافِعًا", "فَمَا يَضِيعُ وَقْتُكَ", "فَسَوْفَ تَتَعَلَّمُ", "فَنِعْمَ العَمَلُ"], ["öğrenirsin", "kitap senin dostundur", "faydalı bir kitap seç", "vaktin boşa gitmez", "öğreneceksin", "ne güzel bir iş"]],
  ["مَنْ", "يُفْشِ سِرَّ صَدِيقِهِ", "Kim arkadaşının sırrını ifşa ederse", ["يَخْسَرْهُ", "فَهُوَ خَائِنٌ", "فَلَا تَأْتَمِنْهُ", "فَلَنْ يَثِقَ بِهِ أَحَدٌ", "فَسَيَنْدَمُ", "فَلَيْسَ بِصَدِيقٍ"], ["onu kaybeder", "o bir hâindir", "ona güvenme", "kimse ona asla güvenmez", "pişman olacak", "arkadaş değildir"]]
];
var MC = ["Fâsız", "İsim cümlesi", "Talep", "Nefy", "سَـ / سَوْفَ", "Câmid"];
var MN = [
  "Cevap fâsız fiil cümlesi: fâ gerekmez. Câzim edatta muzâri meczûm olur; إِذَا câzim değildir, cevabı mâzî.",
  "Cevap isim cümlesi: fâ gerekir; bütün cümle mahallen meczûm.",
  "Cevap talep (emir, nehy): fâ gerekir.",
  "Cevap مَا / لَا / لَنْ ile menfî: fâ gerekir; لَنْ’den sonra fiil mansûb, مَا / لَا’dan sonra merfû.",
  "Cevap سَـ / سَوْفَ ile: fâ gerekir; fiil meczûm olmaz, merfû kalır.",
  "Cevap câmid fiil (لَيْسَ، عَسَى، نِعْمَ، بِئْسَ): fâ gerekir."
];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CBP(parts, i, tr, why) {
  var p = [], ok = [], si = 0;
  parts.forEach(function (x) { if (typeof x === "string") p.push(x); else { var r = ROT(x, i + si++); p.push(r); ok.push(r.a); } });
  return { q: "", p: p, ok: [ok], tr: tr, why: why };
}
// Cevap + sebep: [cümle, [cevap ×3], sebep anahtarı ya da [sebep ×3], Türkçe, açıklama]
var SBA = { i: "جُمْلَةٌ اسْمِيَّةٌ", t: "جُمْلَةٌ طَلَبِيَّةٌ", n: "مَنْفِيَّةٌ بِمَا / لَا / لَنْ", q: "مَسْبُوقَةٌ بِقَدْ / السِّينِ / سَوْفَ", j: "فِعْلُهَا جَامِدٌ" };
var SBT = { i: ["i", "t", "q"], t: ["t", "i", "n"], n: ["n", "q", "i"], q: ["q", "n", "j"], j: ["j", "i", "t"] };
function CS(x, i) {
  var sb = typeof x[2] === "string" ? SBT[x[2]].map(function (k) { return SBA[k]; }) : x[2];
  return CBP([x[0] + "<br>الجَوَابُ:", x[1], "· السَّبَبُ:", sb], i, x[3], x[4]);
}

var UNITS = [
// ---------------------------------------------------------------- 1 · KURAL
{
  id: "u1", no: 1, ar: "اقْتِرَانُ جَوَابِ الشَّرْطِ بِالفَاءِ", tr: "Kural: Fâ Ne Zaman Gerekir?", short: "Kural", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Şart cevabının aslen fâsız geldiğini bilmek", "Fâ’nın gerektiği beş durumu saymak: isim cümlesi, talep, nefy, قَدْ / سَـ / سَوْفَ, câmid fiil", "Kuralın câzim olan ve olmayan bütün edatlarda geçerli olduğunu bilmek"],
  examples: [
    { s: "وَإِنْ:mz / يَمْسَسْكَ اللهُ بِضُرٍّ:nasb / فَلَا كَاشِفَ لَهُ إِلَّا هُوَ:cerr", tr: "Allah sana bir zarar dokundurursa onu O’ndan başka giderecek yoktur. (En’âm 17)", pair: "وَإِنْ:mz / يَمْسَسْكَ بِخَيْرٍ:nasb / فَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ:cerr", pairTr: "Sana bir iyilik dokundurursa, O her şeye kadirdir. (isim cümlesi)" },
    { s: "مَنْ:mz / يُفْشِ سِرَّ صَدِيقِهِ:nasb / فَلَيْسَ بِصَدِيقٍ.:cerr", tr: "Kim arkadaşının sırrını ifşa ederse arkadaş değildir. (câmid fiil)", pair: "مَنْ:mz / يَجْتَهِدْ:nasb / يَنْجَحْ.:cerr", pairTr: "Kim çalışırsa başarır. (fâsız: meczûm)" }
  ],
  rules: [
    { tr: "Şart cevabının <b>aslı fâsızdır</b>: <span class=\"ar\">مَنْ يَجْتَهِدْ يَنْجَحْ</span>. Ama cevap şart fiili gibi kurulamıyorsa, şarta bağlanması için başına <b>fâ</b> (<span class=\"ar\">فَـ</span>) getirilir. Bu, câzim edatlarda da (<span class=\"ar\">إِنْ، مَنْ، مَتَى</span>…) câzim olmayanlarda da (<span class=\"ar\">إِذَا، لَوْ</span>…) böyledir." },
    { tr: "Fâ’nın <b>gerektiği beş durum</b>:", ex: ["١ ـ جُمْلَةٌ اسْمِيَّةٌ: فَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", "٢ ـ طَلَبٌ: فَاتَّبِعْ · فَلَا تُقَصِّرْ · فَهَلْ تَكْتُمُهُ؟", "٣ ـ نَفْيٌ بِمَا / لَا / لَنْ: فَلَنْ تَنَالَ · فَمَا يَمْتَنِعُ", "٤ ـ قَدْ / السِّينُ / سَوْفَ: فَقَدْ عَرَفَ · فَسَوْفَ تَنْدَمُ", "٥ ـ فِعْلٌ جَامِدٌ: فَلَيْسَ · فَعَسَى · فَنِعْمَ · فَبِئْسَ"] },
    { tr: "<b>İsim cümlesi</b> olumlu da olumsuz da olabilir: <span class=\"ar\">فَهُوَ قَدِيرٌ · فَلَا كَاشِفَ لَهُ</span> (cinsi nefy eden لَا ile isim cümlesi)." },
    { tr: "<b>Câmid fiil</b> çekimi olmayan fiildir: <span class=\"ar\">لَيْسَ، عَسَى، نِعْمَ، بِئْسَ</span>. Muzârisi olmadığı için cezmedilemez; fâ ile bağlanır." },
    { tr: "Klasik ezber beyti: <span class=\"ar\">اسْمِيَّةٌ طَلَبِيَّةٌ وَبِجَامِدٍ ‖ وَبِمَا وَقَدْ وَبِلَنْ وَبِالتَّنْفِيسِ</span>. <span class=\"ar\">لَمْ</span> ile olumsuz cevap fâ istemez: <span class=\"ar\">إِنْ تُهْمِلْ لَمْ تَنْجَحْ</span>." }
  ],
  kaide: ["الأَصْلُ فِي جَوَابِ الشَّرْطِ أَنْ يَكُونَ غَيْرَ مُقْتَرِنٍ بِالفَاءِ، إِلَّا أَنَّهُ يَجِبُ اقْتِرَانُ جَوَابِ الشَّرْطِ بِالفَاءِ فِي حَالَاتٍ مُعَيَّنَةٍ، سَوَاءٌ أَكَانَتْ أَدَوَاتُ الشَّرْطِ مِنَ الأَدَوَاتِ الجَازِمَةِ أَمْ كَانَتْ مِنَ الأَدَوَاتِ غَيْرِ الجَازِمَةِ. وَهَذِهِ الحَالَاتُ هِيَ:", "أ ـ إِذَا كَانَ جَوَابُ الشَّرْطِ جُمْلَةً اسْمِيَّةً، سَوَاءٌ أَكَانَتْ مُثْبَتَةً أَمْ مَنْفِيَّةً، مِثْلُ: ﴿وَإِنْ يَمْسَسْكَ اللهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ وَإِنْ يَمْسَسْكَ بِخَيْرٍ فَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ﴾.", "هـ ـ إِذَا كَانَ جَوَابُ الشَّرْطِ جُمْلَةً فِعْلِيَّةً فِعْلُهَا جَامِدٌ (أَيْ لَا يَتَصَرَّفُ) كَـ«لَيْسَ، عَسَى، نِعْمَ، بِئْسَ»، مِثْلُ: مَنْ يُفْشِ سِرَّ صَدِيقِهِ فَلَيْسَ بِصَدِيقٍ، إِنْ تَعْمَلُوا صَالِحًا فَعَسَى اللهُ أَنْ يُدْخِلَكُمُ الجَنَّةَ، إِنْ تَتَعَاوَنُوا عَلَى البِرِّ وَالتَّقْوَى فَنِعْمَ مَا تَصْنَعُونَ، إِذَا تُخْلِفُ وَعْدَكَ فَبِئْسَ مَا تَعْمَلُ."],
  ex: [
    { type: "classify", extra: true, opts: SBB, ar: "بَيِّنْ سَبَبَ اقْتِرَانِ الجَوَابِ بِالفَاءِ", tr: "Kitabın örnekleri: koyu cevap fâyı niçin almış?", items: CL([
      [HL("وَإِنْ يَمْسَسْكَ اللهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ", "فَلَا كَاشِفَ لَهُ إِلَّا هُوَ"), "i", "Cinsi nefy eden لَا ile olumsuz isim cümlesi."],
      [HL("وَإِنْ يَمْسَسْكَ بِخَيْرٍ فَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", "فَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ"), "i", "Mübtedâ هُوَ, haber قَدِيرٌ."],
      [HL("يَا وَلَدِي، إِنْ عَصَيْتَ أَمْرِي فَلَنْ تَنَالَ مَحَبَّتِي", "فَلَنْ تَنَالَ مَحَبَّتِي"), "n", "لَنْ ile nefy."],
      [HL("مَنْ يَجْتَهِدْ فَمَا يَمْتَنِعُ أَحَدٌ عَنْ مُكَافَأَتِهِ", "فَمَا يَمْتَنِعُ أَحَدٌ"), "n", "مَا ile nefy."],
      [HL("إِذَا لَمْ تَلْتَزِمِ الصِّدْقَ فَلَا يَثِقُ بِكَ أَحَدٌ", "فَلَا يَثِقُ بِكَ أَحَدٌ"), "n", "لَا ile nefy; fiil merfû."],
      [HL("إِذَا أُصِبْتَ بِمَرَضٍ فَاتَّبِعْ نَصِيحَةَ الطَّبِيبِ", "فَاتَّبِعْ نَصِيحَةَ الطَّبِيبِ"), "t", "Emir."],
      [HL("إِنْ كُلِّفْتَ بِعَمَلٍ فَلَا تُقَصِّرْ فِيهِ", "فَلَا تُقَصِّرْ فِيهِ"), "t", "Nehy."],
      [HL("إِذَا حَدَّثْتُكَ بِسِرٍّ فَهَلْ تَكْتُمُهُ؟", "فَهَلْ تَكْتُمُهُ؟"), "t", "İstifham."],
      [HL("لَوْ نَخْرُجُ مُبَاشَرَةً فَلَعَلَّنَا نُدْرِكُ القِطَارَ", "فَلَعَلَّنَا نُدْرِكُ القِطَارَ"), "t", "Kitaba göre temennî (aslında لَعَلَّ tereccîdir)."],
      [HL("مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ", "فَقَدْ عَرَفَ رَبَّهُ"), "q", "قَدْ ile."],
      [HL("إِنْ تُهْمِلْ فِي شَبَابِكَ فَسَوْفَ تَنْدَمُ فِي شَيْخُوخَتِكَ", "فَسَوْفَ تَنْدَمُ"), "q", "سَوْفَ ile."],
      [HL("إِذَا فَكَّرْتَ حَقَّ التَّفْكِيرِ فَسَيَسْهُلُ عَلَيْكَ كُلُّ عَسِيرٍ", "فَسَيَسْهُلُ عَلَيْكَ"), "q", "سَـ ile."],
      [HL("مَنْ يُفْشِ سِرَّ صَدِيقِهِ فَلَيْسَ بِصَدِيقٍ", "فَلَيْسَ بِصَدِيقٍ"), "j", "لَيْسَ câmid."],
      [HL("إِنْ تَعْمَلُوا صَالِحًا فَعَسَى اللهُ أَنْ يُدْخِلَكُمُ الجَنَّةَ", "فَعَسَى اللهُ"), "j", "عَسَى câmid."],
      [HL("إِنْ تَتَعَاوَنُوا عَلَى البِرِّ وَالتَّقْوَى فَنِعْمَ مَا تَصْنَعُونَ", "فَنِعْمَ مَا تَصْنَعُونَ"), "j", "نِعْمَ câmid."],
      [HL("إِذَا تُخْلِفُ وَعْدَكَ فَبِئْسَ مَا تَعْمَلُ", "فَبِئْسَ مَا تَعْمَلُ"), "j", "بِئْسَ câmid."]
    ]) },
    { type: "classify", extra: true, opts: FN, ar: "هَلْ يَجِبُ اقْتِرَانُ الجَوَابِ بِالفَاءِ؟", tr: "… yerine cevap geliyor: fâ gerekli mi?", items: CL([
      ["مَنْ يَجْتَهِدْ … يَنْجَحْ", "y", "Muzâri cevap meczûm; fâ gerekmez."],
      ["مَنْ يَجْتَهِدْ … النَّجَاحُ حَلِيفُهُ", "v", "İsim cümlesi."],
      ["إِنْ زُرْتَنِي … أَكْرَمْتُكَ", "y", "Mâzî fiil: fâ gerekmez."],
      ["إِنْ جَاءَ زَيْدٌ … أَكْرِمْهُ", "v", "Emir."],
      ["إِنْ تُهْمِلْ … لَمْ تَنْجَحْ", "y", "لَمْ ile olumsuz: fâ gerekmez."],
      ["إِنْ تُهْمِلْ … لَنْ تَنْجَحَ", "v", "لَنْ ile nefy."],
      ["مَنْ يَصْدُقْ … يَثِقْ بِهِ النَّاسُ", "y", "Meczûm muzâri."],
      ["مَنْ يَصْدُقْ … سَيَثِقُ بِهِ النَّاسُ", "v", "سَـ ile."],
      ["إِذَا جَاءَ الشِّتَاءُ … بَرَدَ الجَوُّ", "y", "Mâzî: fâ gerekmez."],
      ["مَنْ يَكْذِبْ … لَيْسَ بِصَادِقٍ", "v", "لَيْسَ câmid."],
      ["مَنْ فَهِمَ السُّؤَالَ … قَدْ عَرَفَ نِصْفَ الجَوَابِ", "v", "قَدْ ile."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · TALEP VE NEFY
{
  id: "u2", no: 2, ar: "الجُمْلَةُ الطَّلَبِيَّةُ وَالمَنْفِيَّةُ", tr: "Talep ve Nefy", short: "Talep · nefy", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Emir, nehy, istifham ve temennî cevabının fâ aldığını bilmek", "مَا / لَا / لَنْ ile olumsuz cevabın fâ aldığını bilmek", "Cevabı bulup harekelemek ve sebebini söylemek"],
  examples: [
    { s: "إِذَا:mz / أُصِبْتَ بِمَرَضٍ:nasb / فَاتَّبِعْ نَصِيحَةَ الطَّبِيبِ.:cerr", tr: "Hastalanırsan doktorun tavsiyesine uy. (emir)", pair: "إِنْ:mz / كُلِّفْتَ بِعَمَلٍ:nasb / فَلَا تُقَصِّرْ فِيهِ.:cerr", pairTr: "Bir işle görevlendirilirsen onda kusur etme. (nehy)" },
    { s: "يَا وَلَدِي!:- / إِنْ:mz / عَصَيْتَ أَمْرِي:nasb / فَلَنْ تَنَالَ مَحَبَّتِي.:cerr", tr: "Oğlum! Emrime karşı gelirsen sevgimi kazanamazsın. (لَنْ)", pair: "إِذَا:mz / حَدَّثْتُكَ بِسِرٍّ:nasb / فَهَلْ تَكْتُمُهُ؟:cerr", pairTr: "Sana bir sır söylersem saklar mısın? (istifham)" }
  ],
  rules: [
    { tr: "<b>Talep</b> bildiren cevap fâ alır: emir (<span class=\"ar\">فَاتَّبِعْ</span>), nehy (<span class=\"ar\">فَلَا تُقَصِّرْ</span>), istifham (<span class=\"ar\">فَهَلْ تَكْتُمُهُ؟</span>), temennî / tereccî (<span class=\"ar\">فَلَعَلَّنَا نُدْرِكُ</span>)." },
    { tr: "<b>مَا، لَا، لَنْ</b> ile olumsuz cevap fâ alır: <span class=\"ar\">فَلَنْ تَنَالَ · فَمَا يَمْتَنِعُ · فَلَا يَثِقُ</span>. لَنْ’den sonra fiil mansûb, مَا ve nâfiye لَا’dan sonra merfûdur." },
    { tr: "Nehy لَا’sı (<span class=\"ar\">فَلَا تُقَصِّرْ</span>) ile nâfiye لَا’yı (<span class=\"ar\">فَلَا يَثِقُ</span>) karıştırma: ilki fiili cezmeder, ikincisi etmez." },
    { tr: "Not: Klasik gramerde nâfiye لَا ile cevap fâsız da gelebilir; o zaman fiil meczûm olur: <span class=\"ar\">وَإِنْ تَدْعُوهُمْ إِلَى الهُدَى لَا يَتَّبِعُوكُمْ</span> (A’râf 193). Fâ gelirse fiil merfû olur: <span class=\"ar\">فَلَا يَثِقُ</span>." }
  ],
  kaide: ["ب ـ إِذَا كَانَ جَوَابُ الشَّرْطِ جُمْلَةً فِعْلِيَّةً فِعْلُهَا يُفِيدُ الطَّلَبَ كَالأَمْرِ وَالنَّهْيِ وَالاسْتِفْهَامِ وَالتَّمَنِّي، مِثْلُ: إِذَا أُصِبْتَ بِمَرَضٍ فَاتَّبِعْ نَصِيحَةَ الطَّبِيبِ (أَمْرٌ)، إِنْ كُلِّفْتَ بِعَمَلٍ فَلَا تُقَصِّرْ فِيهِ (نَهْيٌ)، إِذَا حَدَّثْتُكَ بِسِرٍّ فَهَلْ تَكْتُمُهُ؟ (اسْتِفْهَامٌ)، لَوْ نَخْرُجُ مُبَاشَرَةً فَلَعَلَّنَا نُدْرِكُ القِطَارَ (تَمَنٍّ).", "جـ ـ إِذَا كَانَ جَوَابُ الشَّرْطِ جُمْلَةً فِعْلِيَّةً فِعْلُهَا مَنْفِيٌّ بِأَحَدِ حُرُوفِ النَّفْيِ «مَا، لَا، لَنْ»، مِثْلُ: يَا وَلَدِي! إِنْ عَصَيْتَ أَمْرِي فَلَنْ تَنَالَ مَحَبَّتِي، مَنْ يَجْتَهِدْ فَمَا يَمْتَنِعُ أَحَدٌ عَنْ مُكَافَأَتِهِ، إِذَا لَمْ تَلْتَزِمِ الصِّدْقَ فَلَا يَثِقُ بِكَ أَحَدٌ."],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنْ جَوَابَ الشَّرْطِ وَاضْبِطْهُ ثُمَّ بَيِّنْ سَبَبَ اقْتِرَانِهِ بِالفَاءِ", tr: "Doğru harekeli cevabı ve fâ sebebini seç.", exHtml: "<span class=\"ar\">إِذَا مَسَّكَ ضُرٌّ مِنَ الشَّيْطَانِ فَلَا دَافِعَ لَهُ إِلَّا ذِكْرُ اللهِ ← جُمْلَةٌ اسْمِيَّةٌ</span>", items: [
      ["إِذَا أُصِبْتَ بِزُكَامٍ فَتَنَاوَلِ البُرْتُقَالَ وَاللَّيْمُونَ كَثِيرًا.", ["فَتَنَاوَلِ البُرْتُقَالَ", "فَتَنَاوَلُ البُرْتُقَالَ", "أُصِبْتَ بِزُكَامٍ"], "t", "Nezle olursan bol portakal ve limon ye.", "Emir; sükûn, sonraki ال için kesreye döner."],
      ["إِنْ كُلِّفْتَ بِوَظِيفَةٍ فَلَا تُهْمِلْ فِيهَا أَيَّ تَفْصِيلٍ.", ["فَلَا تُهْمِلْ فِيهَا", "فَلَا تُهْمِلُ فِيهَا", "كُلِّفْتَ بِوَظِيفَةٍ"], "t", "Bir görev alırsan onun hiçbir ayrıntısını ihmal etme.", "Nehy: fiil meczûm."],
      ["إِذَا أَطْلَعْتُكَ عَلَى سِرٍّ فَهَلْ تَحْفَظُهُ؟", ["فَهَلْ تَحْفَظُهُ", "فَهَلْ تَحْفَظْهُ", "أَطْلَعْتُكَ عَلَى سِرٍّ"], "t", "Sana bir sır açarsam onu saklar mısın?", "İstifham: fiil merfû."],
      ["لَوْ نَتَوَضَّأُ مُبَاشَرَةً فَلَعَلَّنَا نُدْرِكُ الصَّلَاةَ فِي المَسْجِدِ.", ["فَلَعَلَّنَا نُدْرِكُ الصَّلَاةَ", "فَلَعَلَّنَا نُدْرِكْ الصَّلَاةَ", "نَتَوَضَّأُ مُبَاشَرَةً"], "t", "Hemen abdest alırsak belki namaza mescitte yetişiriz.", "Kitaba göre temennî (لَعَلَّ aslında tereccî)."],
      ["يَا وَلَدِي، إِذَا لَمْ تُطِعِ الأَمْرَ فَلَنْ تَنْجَحَ فِي مَشْرُوعٍ.", ["فَلَنْ تَنْجَحَ", "فَلَنْ تَنْجَحْ", "لَمْ تُطِعِ الأَمْرَ"], "n", "Oğlum, emre uymazsan hiçbir projede başarılı olamazsın.", "لَنْ ile nefy: fiil mansûb."],
      ["مَنْ يَحْفَظِ الأَمَانَةَ فَمَا يَمْتَنِعُ أَحَدٌ عَنْ ثَنَائِهِ.", ["فَمَا يَمْتَنِعُ أَحَدٌ", "فَمَا يَمْتَنِعْ أَحَدٌ", "يَحْفَظِ الأَمَانَةَ"], "n", "Kim emanete riayet ederse kimse onu övmekten geri durmaz.", "مَا ile nefy: fiil merfû."],
      ["إِذَا لَمْ تَعْمَلْ بِالصِّدْقِ فَلَا يَحْتَرِمُكَ أَحَدٌ.", ["فَلَا يَحْتَرِمُكَ أَحَدٌ", "فَلَا يَحْتَرِمْكَ أَحَدٌ", "لَمْ تَعْمَلْ بِالصِّدْقِ"], "n", "Doğrulukla davranmazsan kimse sana saygı duymaz.", "لَا ile nefy: fiil merfû."],
      ["مَنْ فَهِمَ السُّؤَالَ فَقَدْ عَرَفَ نِصْفَ الجَوَابِ.", ["فَقَدْ عَرَفَ نِصْفَ الجَوَابِ", "فَقَدْ يَعْرِفْ نِصْفَ الجَوَابِ", "فَهِمَ السُّؤَالَ"], "q", "Soruyu anlayan cevabın yarısını bilmiş olur.", "قَدْ ile."]
    ].map(CS) },
    { type: "pick", fill: true, extra: true, ar: "أَكْمِلْ بِالجَوَابِ الصَّحِيحِ", tr: "Boşluğa cevabın doğru biçimini seç.", items: PL([
      ["مَنْ يَدْرُسْ ___. (سَيَنْجَحُ)", "فَسَيَنْجَحُ", "فَسَيَنْجَحْ", "فَسَيَنْجَحَ", "Kim çalışırsa başaracak.", "سَـ: fâ gerekir, fiil merfû kalır."],
      ["إِنْ عَصَيْتَ أَمْرِي ___ مَحَبَّتِي. (لَنْ تَنَالَ)", "فَلَنْ تَنَالَ", "فَلَنْ تَنَلْ", "فَلَنْ تَنَالُ", "Emrime karşı gelirsen sevgimi kazanamazsın.", "لَنْ: fâ gerekir, fiil mansûb."],
      ["إِذَا لَمْ تَلْتَزِمِ الصِّدْقَ ___ بِكَ أَحَدٌ. (لَا يَثِقُ)", "فَلَا يَثِقُ", "فَلَا يَثِقَ", "فَلَنْ يَثِقُ", "Doğruluğa bağlı kalmazsan kimse sana güvenmez.", "Nâfiye لَا: fiil merfû."],
      ["إِنْ كُلِّفْتَ بِعَمَلٍ ___ فِيهِ. (لَا تُقَصِّرْ)", "فَلَا تُقَصِّرْ", "لَا تُقَصِّرْ", "فَلَا تُقَصِّرَ", "Bir işle görevlendirilirsen onda kusur etme.", "Nehy: fâ gerekir, fiil meczûm."],
      ["إِذَا حَدَّثْتُكَ بِسِرٍّ ___؟ (هَلْ تَكْتُمُهُ)", "فَهَلْ تَكْتُمُهُ", "هَلْ تَكْتُمُهُ", "فَهَلْ تَكْتُمْهُ", "Sana bir sır söylersem saklar mısın?", "İstifham: fâ gerekir, fiil merfû."],
      ["مَنْ يُفْشِ سِرَّ صَدِيقِهِ ___ بِصَدِيقٍ. (لَيْسَ)", "فَلَيْسَ", "لَيْسَ", "فَلَيْسَتْ", "Kim arkadaşının sırrını ifşa ederse arkadaş değildir.", "Câmid fiil: fâ gerekir."],
      ["مَنْ عَرَفَ نَفْسَهُ ___ رَبَّهُ. (قَدْ عَرَفَ)", "فَقَدْ عَرَفَ", "قَدْ عَرَفَ", "فَقَدْ يَعْرِفْ", "Kendini bilen Rabbini bilir.", "قَدْ: fâ gerekir."],
      ["إِنْ تُهْمِلْ فِي شَبَابِكَ ___ فِي شَيْخُوخَتِكَ. (سَوْفَ تَنْدَمُ)", "فَسَوْفَ تَنْدَمُ", "فَسَوْفَ تَنْدَمْ", "سَوْفَ تَنْدَمُ", "Gençliğinde ihmal edersen yaşlılığında pişman olacaksın.", "سَوْفَ: fâ gerekir, fiil merfû."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · قَدْ / سَـ / سَوْفَ VE ŞİİRDE
{
  id: "u3", no: 3, ar: "قَدْ وَالسِّينُ وَسَوْفَ · فِي الشِّعْرِ", tr: "قَدْ، سَـ، سَوْفَ ve Şiirde", short: "Şiirde", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["قَدْ، سَـ، سَوْفَ ile gelen cevabın fâ aldığını bilmek", "Beyitlerde şart edatını, şart fiilini ve fâ’lı cevabı bulmak", "Fâ’nın sebebini beyitte göstermek"],
  examples: [
    { s: "مَنْ:mz / عَرَفَ نَفْسَهُ:nasb / فَقَدْ عَرَفَ رَبَّهُ.:cerr", tr: "Kendini bilen Rabbini bilir. (قَدْ)", pair: "إِذَا:mz / فَكَّرْتَ حَقَّ التَّفْكِيرِ:nasb / فَسَيَسْهُلُ عَلَيْكَ كُلُّ عَسِيرٍ.:cerr", pairTr: "Gereği gibi düşünürsen her zorluk sana kolay gelecek. (سَـ)" },
    { s: "وَمَنْ:mz / تَكُنِ العَلْيَاءُ هِمَّةَ نَفْسِهِ:nasb / فَكُلُّ الَّذِي يَلْقَاهُ فِيهَا مُحَبَّبُ:cerr", tr: "Kimin gönlünün himmeti yücelik olursa, o yolda karşılaştığı her şey ona sevimli gelir. (isim cümlesi)" }
  ],
  rules: [
    { tr: "Cevaptaki fiilin başında <b>قَدْ</b>, <b>سَـ</b> (sîn) ya da <b>سَوْفَ</b> varsa fâ gerekir: <span class=\"ar\">فَقَدْ عَرَفَ · فَسَيَسْهُلُ · فَسَوْفَ تَنْدَمُ</span>." },
    { tr: "سَـ ve سَوْفَ’ten sonra muzâri <b>merfû</b> kalır; şart edatı onu cezmedemez." },
    { tr: "Şiirde cevap çoğu zaman ikinci mısradadır: <span class=\"ar\">إِذَا المَرْءُ لَمْ يَدْنَسْ… ‖ فَكُلُّ رِدَاءٍ يَرْتَدِيهِ جَمِيلُ</span>." },
    { tr: "Şart edatından sonra isim gelirse şart fiili gizlidir: <span class=\"ar\">فَإِنْ هِيَ ضَاقَتْ · إِذَا المَرْءُ لَمْ يَدْنَسْ</span>. Cevap öne geçen sözden anlaşılırsa hazfedilir; o zaman fâ da yoktur." }
  ],
  kaide: ["د ـ إِذَا كَانَ جَوَابُ الشَّرْطِ جُمْلَةً فِعْلِيَّةً فِعْلُهَا مَسْبُوقٌ بِـ«قَدْ، السِّينِ، سَوْفَ»، مِثْلُ: مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ، إِنْ تُهْمِلْ فِي شَبَابِكَ فَسَوْفَ تَنْدَمُ فِي شَيْخُوخَتِكَ، إِذَا فَكَّرْتَ حَقَّ التَّفْكِيرِ فَسَيَسْهُلُ عَلَيْكَ كُلُّ عَسِيرٍ."],
  ex: [
    { type: "combo", num: "٢", ar: "عَيِّنْ جَوَابَ الشَّرْطِ فِي الأَبْيَاتِ التَّالِيَةِ ثُمَّ اضْبِطْهُ وَبَيِّنْ سَبَبَ اقْتِرَانِهِ بِالفَاءِ", tr: "Beyitteki cevabı ve fâ sebebini seç.", exHtml: "<span class=\"ar\">وَمَنْ تَكُنِ العَلْيَاءُ هِمَّةَ نَفْسِهِ ‖ فَكُلُّ الَّذِي يَلْقَاهُ فِيهَا مُحَبَّبُ ← جُمْلَةٌ اسْمِيَّةٌ</span>", items: [
      ["وَإِذَا تَنَاسَبَتِ الرِّجَالُ فَمَا أَرَى ‖ نَسَبًا يُقَاسُ بِصَالِحِ الأَعْمَالِ", ["فَمَا أَرَى نَسَبًا", "تَنَاسَبَتِ الرِّجَالُ", "نَسَبًا يُقَاسُ"], "n", "İnsanlar soylarıyla övüştüğünde, ben salih amelle ölçülen bir soydan başkasını görmem.", "مَا ile nefy."],
      ["وَإِذَا لَمْ يَكُنْ مِنَ المَوْتِ بُدٌّ ‖ فَمِنَ العَجْزِ أَنْ تَمُوتَ جَبَانَا", ["فَمِنَ العَجْزِ أَنْ تَمُوتَ", "لَمْ يَكُنْ مِنَ المَوْتِ بُدٌّ", "أَنْ تَمُوتَ جَبَانَا"], "i", "Ölümden kaçış yoksa korkak olarak ölmek acizliktir. (el-Mütenebbî)", "İsim cümlesi: haber مِنَ العَجْزِ öne geçmiş, mübtedâ أَنْ تَمُوتَ."],
      ["فَإِنْ يَقْتَسِمْ مَالِي بَنِيَّ وَإِخْوَتِي ‖ فَلَنْ يَقْسِمُوا خُلْقِي وَلَا فِعْلِي", ["فَلَنْ يَقْسِمُوا خُلْقِي", "فَلَنْ يَقْسِمُونَ خُلْقِي", "يَقْتَسِمْ مَالِي"], "n", "Oğullarım ve kardeşlerim malımı paylaşsalar da ahlakımı ve işimi paylaşamazlar.", "لَنْ ile nefy: fiil mansûb, nûn düşer."],
      ["اطْلُبُوا المَجْدَ عَلَى الأَرْضِ فَإِنْ ‖ هِيَ ضَاقَتْ فَاطْلُبُوهُ فِي السَّمَاءِ", ["فَاطْلُبُوهُ فِي السَّمَاءِ", "اطْلُبُوا المَجْدَ", "هِيَ ضَاقَتْ"], "t", "Şerefi yeryüzünde arayın; yeryüzü daralırsa onu gökte arayın.", "Emir."],
      ["إِذَا المَرْءُ لَمْ يَدْنَسْ مِنَ اللُّؤْمِ عِرْضُهُ ‖ فَكُلُّ رِدَاءٍ يَرْتَدِيهِ جَمِيلُ", ["فَكُلُّ رِدَاءٍ يَرْتَدِيهِ جَمِيلُ", "فَكُلَّ رِدَاءٍ يَرْتَدِيهِ جَمِيلُ", "لَمْ يَدْنَسْ عِرْضُهُ"], "i", "Kişinin namusu alçaklıkla kirlenmediyse giydiği her elbise güzeldir. (es-Semev’el)", "İsim cümlesi: mübtedâ كُلُّ, haber جَمِيلُ."],
      ["إِذَا مَا أَتَى يَوْمٌ يُفَرِّقُ بَيْنَنَا ‖ بِمَوْتٍ فَكُنْ أَنْتَ الَّذِي يَتَأَخَّرُ", ["فَكُنْ أَنْتَ الَّذِي يَتَأَخَّرُ", "يُفَرِّقُ بَيْنَنَا", "فَتَكُونُ أَنْتَ الَّذِي يَتَأَخَّرُ"], "t", "Bizi ölümle ayıran bir gün gelirse geride kalan sen ol.", "Emir: كُنْ."],
      ["إِذَا لَمْ تَخْشَ عَاقِبَةَ اللَّيَالِي ‖ وَلَمْ تَسْتَحْيِ فَاصْنَعْ مَا تَشَاءُ", ["فَاصْنَعْ مَا تَشَاءُ", "لَمْ تَسْتَحْيِ", "فَتَصْنَعُ مَا تَشَاءُ"], "t", "Gecelerin (zamanın) sonundan korkmuyor ve utanmıyorsan dilediğini yap.", "Emir."],
      ["فَلَا وَاللهِ مَا فِي العَيْشِ خَيْرٌ ‖ وَلَا الدُّنْيَا إِذَا ذَهَبَ الحَيَاءُ", ["مَحْذُوفٌ يَدُلُّ عَلَيْهِ مَا قَبْلَهُ", "فَلَا وَاللهِ", "ذَهَبَ الحَيَاءُ"], ["لَا فَاءَ: الجَوَابُ مَحْذُوفٌ", "جُمْلَةٌ اسْمِيَّةٌ", "جُمْلَةٌ طَلَبِيَّةٌ"], "Hayır, vallahi! Hayâ gidince ne yaşamakta hayır vardır ne dünyada.", "إِذَا sonda: cevap hazfedilmiş, öncesi ona delâlet ediyor; fâ yok."],
      ["إِذَا لَمْ يَكُنْ صَفْوُ الوِدَادِ طَبِيعَةً ‖ فَلَا خَيْرَ فِي وُدٍّ يَجِيءُ تَكَلُّفَا", ["فَلَا خَيْرَ فِي وُدٍّ", "فَلَا خَيْرٌ فِي وُدٍّ", "لَمْ يَكُنْ صَفْوُ الوِدَادِ"], "i", "Sevginin saflığı tabiattan gelmiyorsa zorlamayla gelen sevgide hayır yoktur. (İmam Şâfiî’ye nispet edilir)", "Cinsi nefy eden لَا: isim cümlesi."]
    ].map(CS) },
    { type: "tag", extra: true, roles: ["mz", "nasb", "cerr", "x"], ar: "عَيِّنْ أَدَاةَ الشَّرْطِ وَفِعْلَ الشَّرْطِ وَجَوَابَهُ", tr: "Beyitte edatı, şart fiilini ve cevabı etiketle.", items: [
      T("وَإِذَا:mz / تَنَاسَبَتِ الرِّجَالُ:nasb / فَمَا أَرَى ‖ نَسَبًا يُقَاسُ بِصَالِحِ الأَعْمَالِ:cerr", "İnsanlar soylarıyla övüştüğünde salih amelle ölçülen soydan başkasını görmem.", "مَا ile nefy."),
      T("اطْلُبُوا المَجْدَ عَلَى الأَرْضِ:x / فَإِنْ:mz / هِيَ ضَاقَتْ:nasb / فَاطْلُبُوهُ فِي السَّمَاءِ:cerr", "Şerefi yeryüzünde arayın; daralırsa gökte arayın.", "Şart fiili gizli, ضَاقَتْ onu açıklar."),
      T("إِذَا:mz / المَرْءُ لَمْ يَدْنَسْ مِنَ اللُّؤْمِ عِرْضُهُ:nasb / فَكُلُّ رِدَاءٍ يَرْتَدِيهِ جَمِيلُ:cerr", "Namusu kirlenmeyenin giydiği her elbise güzeldir.", "İsim cümlesi."),
      T("إِذَا مَا:mz / أَتَى يَوْمٌ يُفَرِّقُ بَيْنَنَا ‖ بِمَوْتٍ:nasb / فَكُنْ أَنْتَ الَّذِي يَتَأَخَّرُ:cerr", "Bizi ölümle ayıran gün gelirse geride kalan sen ol.", "مَا zâide; cevap emir."),
      T("إِذَا:mz / لَمْ يَكُنْ صَفْوُ الوِدَادِ طَبِيعَةً:nasb / فَلَا خَيْرَ فِي وُدٍّ يَجِيءُ تَكَلُّفَا:cerr", "Sevgi tabiattan gelmiyorsa zorlama sevgide hayır yoktur.", "İsim cümlesi."),
      T("إِنْ:mz / تُهْمِلْ فِي شَبَابِكَ:nasb / فَسَوْفَ تَنْدَمُ فِي شَيْخُوخَتِكَ:cerr", "Gençliğinde ihmal edersen yaşlılığında pişman olacaksın.", "سَوْفَ ile.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · İ’RAB VE FÂ’LI CEVAP KURMAK
{
  id: "u4", no: 4, ar: "إِعْرَابُ الجَوَابِ المُقْتَرِنِ بِالفَاءِ", tr: "Fâ’lı Cevap Kurmak ve İ’rabı", short: "İ’rab", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Fâ’lı muzârinin şart sebebiyle meczûm olmadığını bilmek", "Fâ’lı cümlenin bütününün mahallen meczûm olduğunu bilmek", "Fâsız cevabı fâ’lı cevaba çevirmek"],
  examples: [
    { s: "مَنْ:mz / يَدْرُسْ:nasb / فَسَيَنْجَحُ.:cerr", tr: "Kim çalışırsa başaracak. (fâ’lı: merfû)", pair: "مَنْ:mz / يَدْرُسْ:nasb / يَنْجَحْ.:cerr", pairTr: "Kim çalışırsa başarır. (fâsız: meczûm)" },
    { s: "إِذَا:mz / أَخْلَفْتَ وَعْدَكَ:nasb / فَسَتَكْرَهُكَ بِيئَتُكَ.:cerr", tr: "Sözünden dönersen çevren senden hoşlanmayacak.", pair: "إِذَا:mz / أَخْلَفْتَ وَعْدَكَ:nasb / كَرِهَتْكَ بِيئَتُكَ.:cerr", pairTr: "Sözünden dönersen çevren senden hoşlanmaz. (fâsız)" }
  ],
  rules: [
    { tr: "Fâ’lı cevaptaki muzâri, şart edatı yüzünden <b>meczûm olmaz</b>. Kendi konumuna göre merfû (<span class=\"ar\">فَسَيَنْجَحُ · فَمَا يَمْتَنِعُ</span>), mansûb (<span class=\"ar\">فَلَنْ تَنَالَ</span>) ya da başka bir sebeple meczûm (<span class=\"ar\">فَلَا تُقَصِّرْ · فَلْيَجْلِسْ</span>) olur." },
    { tr: "Fâ ile birlikte <b>bütün cümle</b> cevâbu’ş-şart olarak <b>mahallen meczûmdur</b>: <span class=\"ar\">فَسَيَنْجَحُ: الجُمْلَةُ فِي مَحَلِّ جَزْمٍ جَوَابُ الشَّرْطِ</span>." },
    { tr: "Fâsız cevabı fâ’lıya çevirirken fâ’yı gerektiren bir öğe ekle ve fiilin harekesini düzelt:", ex: ["تَفْهَمِ الحَقِيقَةَ ← فَسَتَفْهَمُ الحَقِيقَةَ", "يُقْبِلْ إِلَيْكَ الصَّدِيقُ ← فَالصَّدِيقُ مُقْبِلٌ إِلَيْكَ", "مَلَكْتَ قُلُوبَهُمْ ← فَقَدْ مَلَكْتَ قُلُوبَهُمْ"] },
    { tr: "إِذَا câzim değildir; cevabındaki muzâri zaten merfûdur: <span class=\"ar\">إِذَا لَمْ تُوَاظِبْ… فَسَتَرْسُبُ</span>." }
  ],
  kaide: ["٢ ـ الفِعْلُ المُضَارِعُ الَّذِي يَقْتَرِنُ بِالفَاءِ وَالَّذِي يَكُونُ جَوَابًا لِلشَّرْطِ لَا يَكُونُ مَجْزُومًا بِسَبَبِ دُخُولِ الفَاءِ عَلَيْهِ، فِي هَذِهِ الحَالَةِ يَكُونُ مَرْفُوعًا أَوْ مَنْصُوبًا أَوْ مَجْزُومًا بِحَسَبِ مَوْقِعِهِ فِي الجُمْلَةِ، وَتَكُونُ الجُمْلَةُ المُقْتَرِنَةُ بِالفَاءِ كُلُّهَا فِي مَحَلِّ جَزْمٍ، مِثْلُ: مَنْ يَدْرُسْ فَسَيَنْجَحُ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "اجْعَلْ جَوَابَ الشَّرْطِ مُقْتَرِنًا بِالفَاءِ مَعَ الضَّبْطِ وَتَغْيِيرِ مَا يَلْزَمُ", tr: "Parantezdeki fâsız cevabın fâ’lı doğru biçimini seç.", exHtml: "<span class=\"ar\">إِذَا أَخْلَفْتَ وَعْدَكَ كَرِهَتْكَ بِيئَتُكَ ← إِذَا أَخْلَفْتَ وَعْدَكَ فَسَتَكْرَهُكَ بِيئَتُكَ</span>", items: PL([
      ["إِنْ تَقْرَأْ لِكُتَّابٍ مُحَايِدِينَ ___. (تَفْهَمِ الحَقِيقَةَ)", "فَسَتَفْهَمُ الحَقِيقَةَ", "فَسَتَفْهَمِ الحَقِيقَةَ", "فَتَفْهَمِ الحَقِيقَةَ", "Tarafsız yazarları okursan gerçeği anlayacaksın.", "سَـ eklenir; fiil merfû olur."],
      ["مَهْمَا يَحْسُدْكَ العَدُوُّ ___. (يُقْبِلْ إِلَيْكَ الصَّدِيقُ)", "فَالصَّدِيقُ مُقْبِلٌ إِلَيْكَ", "فَيُقْبِلْ إِلَيْكَ الصَّدِيقُ", "فَالصَّدِيقَ مُقْبِلٌ إِلَيْكَ", "Düşman seni ne kadar kıskanırsa kıskansın dost sana yönelir.", "İsim cümlesine çevrilir."],
      ["مَنْ يَحْفَظْ سِرَّ صَدِيقِهِ ___. (يَنَلْ ثِقَتَهُ)", "فَسَيَنَالُ ثِقَتَهُ", "فَسَيَنَلْ ثِقَتَهُ", "فَيَنَلْ ثِقَتَهُ", "Arkadaşının sırrını saklayan onun güvenini kazanacak.", "سَـ: fiil merfû, illetli harf geri gelir."],
      ["مَتَى أَحْسَنْتَ إِلَى النَّاسِ ___. (مَلَكْتَ قُلُوبَهُمْ)", "فَقَدْ مَلَكْتَ قُلُوبَهُمْ", "فَمَلَكْتَ قُلُوبَهُمْ", "قَدْ مَلَكْتَ قُلُوبَهُمْ", "İnsanlara iyilik ettiğinde kalplerini kazanmış olursun.", "قَدْ eklenir; fâ gerekir."],
      ["إِنْ تَعْمَلْ فِي صِغَرِكَ ___. (تَرْتَحْ فِي كِبَرِكَ)", "فَسَوْفَ تَرْتَاحُ فِي كِبَرِكَ", "فَسَوْفَ تَرْتَحْ فِي كِبَرِكَ", "فَتَرْتَحْ فِي كِبَرِكَ", "Küçükken çalışırsan büyüyünce rahat edeceksin.", "سَوْفَ: merfû, elif geri gelir."],
      ["أَيَّ عَمَلٍ تَعْمَلْ ___. (انْوِ فِيهِ الخَيْرَ)", "فَانْوِ فِيهِ الخَيْرَ", "انْوِ فِيهِ الخَيْرَ", "فَانْوِي فِيهِ الخَيْرَ", "Hangi işi yaparsan yap, onda hayrı niyet et.", "Emir: fâ gerekir (kitapta fâsız yazılmış)."],
      ["إِذَا لَمْ تُوَاظِبْ عَلَى دُرُوسِكَ ___. (تَرْسُبُ فِي الاخْتِبَارِ)", "فَسَتَرْسُبُ فِي الاخْتِبَارِ", "فَسَتَرْسُبْ فِي الاخْتِبَارِ", "فَتَرْسُبْ فِي الاخْتِبَارِ", "Derslerine devam etmezsen sınavda kalacaksın.", "سَـ: merfû."],
      ["مَتَى تُرْضِ الوَالِدَيْنِ ___. (تَنَلْ سَعَادَةَ الدَّارَيْنِ)", "فَسَتَنَالُ سَعَادَةَ الدَّارَيْنِ", "فَسَتَنَلْ سَعَادَةَ الدَّارَيْنِ", "فَتَنَلْ سَعَادَةَ الدَّارَيْنِ", "Anne babanı razı edersen iki dünya saadetine ereceksin.", "سَـ: merfû."]
    ])},
    { type: "classify", extra: true, opts: IR, ar: "مَا إِعْرَابُ الفِعْلِ المُضَارِعِ فِي الجَوَابِ المُقْتَرِنِ بِالفَاءِ؟", tr: "Fâ’lı cevaptaki koyu muzâri merfû mu, mansûb mu, meczûm mu?", items: CL([
      [HL("مَنْ يَدْرُسْ فَسَيَنْجَحُ", "فَسَيَنْجَحُ"), "r", "سَـ’den sonra merfû."],
      [HL("إِنْ عَصَيْتَ أَمْرِي فَلَنْ تَنَالَ مَحَبَّتِي", "تَنَالَ"), "s", "لَنْ ile mansûb."],
      [HL("إِنْ كُلِّفْتَ بِعَمَلٍ فَلَا تُقَصِّرْ فِيهِ", "تُقَصِّرْ"), "m", "Nehy لَا’sı ile meczûm (şart yüzünden değil)."],
      [HL("إِذَا حَدَّثْتُكَ بِسِرٍّ فَهَلْ تَكْتُمُهُ؟", "تَكْتُمُهُ"), "r", "İstifhamda merfû."],
      [HL("مَنْ يَجْتَهِدْ فَمَا يَمْتَنِعُ أَحَدٌ عَنْ مُكَافَأَتِهِ", "يَمْتَنِعُ"), "r", "مَا’dan sonra merfû."],
      [HL("إِذَا لَمْ تُطِعِ الأَمْرَ فَلَنْ تَنْجَحَ فِي مَشْرُوعٍ", "تَنْجَحَ"), "s", "لَنْ ile mansûb."],
      [HL("إِذَا جَاءَ الضَّيْفُ فَلْيَجْلِسْ فِي الصَّدْرِ", "فَلْيَجْلِسْ"), "m", "Emir lâmı ile meczûm."],
      [HL("إِنْ تُهْمِلْ فِي شَبَابِكَ فَسَوْفَ تَنْدَمُ", "تَنْدَمُ"), "r", "سَوْفَ’ten sonra merfû."],
      [HL("إِذَا لَمْ تَلْتَزِمِ الصِّدْقَ فَلَا يَثِقُ بِكَ أَحَدٌ", "يَثِقُ"), "r", "Nâfiye لَا: merfû."],
      [HL("مَتَى تُرْضِ الوَالِدَيْنِ فَسَتَنَالُ سَعَادَةَ الدَّارَيْنِ", "فَسَتَنَالُ"), "r", "سَـ’den sonra merfû."],
      [HL("إِنْ تُطِعْ وَالِدَيْكَ فَلَنْ تَخْسَرَ", "تَخْسَرَ"), "s", "لَنْ ile mansûb."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · ÂYET, HADİS VE OKUMA
{
  id: "u5", no: 5, ar: "فِي الآيَاتِ وَالحَدِيثِ وَالقِرَاءَةِ", tr: "Âyet, Hadis ve Okuma", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Âyet ve hadislerde şart edatını, şart fiilini ve cevabı bulmak", "Bir cümlede birden çok şart yapısını ayırmak", "“اِرْضَ بِمَا لَدَيْكَ” metninde şart cümlelerini ve fâ sebebini bulmak"],
  examples: [
    { s: "إِنْ:mz / يَنْصُرْكُمُ اللهُ:nasb / فَلَا غَالِبَ لَكُمْ:cerr", tr: "Allah size yardım ederse size galip gelecek yoktur. (Âl-i İmrân 160)", pair: "وَمَنْ:mz / يَتَوَكَّلْ عَلَى اللهِ:nasb / فَهُوَ حَسْبُهُ:cerr", pairTr: "Kim Allah’a tevekkül ederse O ona yeter. (Talâk 3)" },
    { s: "إِذَا:mz / سَأَلْتَ:nasb / فَاسْأَلِ اللهَ:cerr", tr: "İstediğinde Allah’tan iste. (Hadis)" }
  ],
  rules: [
    { tr: "Bir âyette birden çok şart cümlesi olabilir: <span class=\"ar\">إِنْ يَنْصُرْكُمُ… فَلَا غَالِبَ · وَإِنْ يَخْذُلْكُمْ فَمَنْ ذَا الَّذِي…</span>." },
    { tr: "Aynı âyette fâsız ve fâ’lı cevap yan yana gelebilir: <span class=\"ar\">مَنْ يَتَّقِ اللهَ يَجْعَلْ لَهُ مَخْرَجًا · وَمَنْ يَتَوَكَّلْ… فَهُوَ حَسْبُهُ</span>." },
    { tr: "Her fâ şart cevabının fâsı değildir: <span class=\"ar\">فَلْيَتَوَكَّلِ · فَإِنَّ الشُّهُودَ مَلَائِكَةٌ · فَهُوَ رَاحِلٌ</span> gibi fâlar öncesine bağlar ya da sebep bildirir (ta’lîl)." },
    { tr: "Emrin cevabı da meczûm olur ama şart cevabı sayılmaz: <span class=\"ar\">فَاتَّبِعُونِي يُحْبِبْكُمُ اللهُ</span>." }
  ],
  kaide: ["عَيِّنْ أَدَاةَ الشَّرْطِ وَفِعْلَ الشَّرْطِ وَجَوَابَهُ فِي الآيَاتِ وَالأَحَادِيثِ، وَبَيِّنْ سَبَبَ اقْتِرَانِ الجَوَابِ بِالفَاءِ فِي النَّصِّ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "٤", ar: "عَيِّنْ فِي الآيَاتِ القُرْآنِيَّةِ التَّالِيَةِ أَدَاةَ الشَّرْطِ وَفِعْلَ الشَّرْطِ وَجَوَابَ الشَّرْطِ", tr: "Edatı, şart fiilini ve cevabı etiketle; kalanlar Başka.", items: [
      T("إِنْ:mz / يَنْصُرْكُمُ اللهُ:nasb / فَلَا غَالِبَ لَكُمْ:cerr / وَإِنْ:mz / يَخْذُلْكُمْ:nasb / فَمَنْ ذَا الَّذِي يَنْصُرُكُمْ مِنْ بَعْدِهِ:cerr / وَعَلَى اللهِ فَلْيَتَوَكَّلِ المُؤْمِنُونَ:x", "Allah size yardım ederse size galip gelecek yoktur; sizi yardımsız bırakırsa O’ndan sonra size kim yardım edebilir? Müminler yalnız Allah’a tevekkül etsin. (Âl-i İmrân 160)", "İsim cümlesi ve istifham; son fâ şart cevabı değil."),
      T("مَنْ:mz / يُطِعِ الرَّسُولَ:nasb / فَقَدْ أَطَاعَ اللهَ:cerr / وَمَنْ:mz / تَوَلَّى:nasb / فَمَا أَرْسَلْنَاكَ عَلَيْهِمْ حَفِيظًا:cerr", "Kim Peygamber’e itaat ederse Allah’a itaat etmiş olur; kim yüz çevirirse, seni onların başına bekçi göndermedik. (Nisâ 80)", "قَدْ ve مَا ile."),
      T("وَمَنْ:mz / يَتَّقِ اللهَ:nasb / يَجْعَلْ لَهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ:cerr / وَمَنْ:mz / يَتَوَكَّلْ عَلَى اللهِ:nasb / فَهُوَ حَسْبُهُ:cerr / إِنَّ اللهَ بَالِغُ أَمْرِهِ قَدْ جَعَلَ اللهُ لِكُلِّ شَيْءٍ قَدْرًا:x", "Kim Allah’tan korkarsa Allah ona bir çıkış yolu açar ve onu ummadığı yerden rızıklandırır; kim Allah’a tevekkül ederse O ona yeter. (Talâk 2-3)", "İlk cevap fâsız (meczûm), ikincisi isim cümlesi."),
      T("إِنْ:mz / كُنْتُمْ تُحِبُّونَ اللهَ:nasb / فَاتَّبِعُونِي:cerr / يُحْبِبْكُمُ اللهُ:x", "Allah’ı seviyorsanız bana uyun ki Allah da sizi sevsin. (Âl-i İmrân 31)", "Emir; يُحْبِبْكُمْ emrin cevabı."),
      T("وَإِذَا:mz / قُرِئَ القُرْآنُ:nasb / فَاسْتَمِعُوا لَهُ وَأَنْصِتُوا:cerr / لَعَلَّكُمْ تُرْحَمُونَ:x", "Kur’an okunduğunda onu dinleyin ve susun ki rahmete eresiniz. (A’râf 204; kitapta “En’âm” yazılmış)", "Emir."),
      T("يَا أَيُّهَا الَّذِينَ آمَنُوا:x / إِنْ:mz / جَاءَكُمْ فَاسِقٌ بِنَبَإٍ:nasb / فَتَبَيَّنُوا:cerr / أَنْ تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَى مَا فَعَلْتُمْ نَادِمِينَ:x", "Ey iman edenler! Bir fâsık size bir haber getirirse, bilmeden bir topluluğa zarar verip yaptığınıza pişman olmamak için onu araştırın. (Hucurât 6)", "Emir."),
      T("يَا غُلَامُ،:x / إِذَا:mz / سَأَلْتَ:nasb / فَاسْأَلِ اللهَ:cerr / وَإِذَا:mz / اسْتَعَنْتَ:nasb / فَاسْتَعِنْ بِاللهِ:cerr", "Ey çocuk! İstediğinde Allah’tan iste, yardım dilediğinde Allah’tan dile. (Hadis, İbn Abbâs’a)", "İki emir."),
      T("إِذَا:mz / مَرَرْتُمْ بِرِيَاضِ الجَنَّةِ:nasb / فَارْتَعُوا:cerr / قَالُوا: وَمَا رِيَاضُ الجَنَّةِ؟ قَالَ: مَجَالِسُ العِلْمِ.:x", "Cennet bahçelerine uğradığınızda oralardan nasiplenin. “Cennet bahçeleri nedir?” dediler. “İlim meclisleri” buyurdu. (Hadis)", "Emir.")
    ]},
    { type: "reading", num: "٥", ar: "اقْرَأِ النَّصَّ وَعَيِّنِ الجُمَلَ الشَّرْطِيَّةَ ثُمَّ بَيِّنْ سَبَبَ اقْتِرَانِ جَوَابِ الشَّرْطِ بِالفَاءِ", tr: "Metni oku, soruları cevapla; sonra koyu fâ’lı ifadenin sebebini seç.", title: "اِرْضَ بِمَا لَدَيْكَ!",
      text: "لَا تُسَافِرْ إِلَى الصَّحْرَاءِ بَحْثًا عَنِ الأَشْجَارِ الجَمِيلَةِ، فَلَنْ تَجِدَ فِي الصَّحْرَاءِ غَيْرَ الوَحْشَةِ، وَانْظُرْ إِلَى الأَشْجَارِ الَّتِي تُظِلُّكَ بِظِلِّهَا وَتُسْعِدُكَ بِثِمَارِهَا وَتُشْجِيكَ بِأَغَانِي طُيُورِهَا.<br>لَا تُحَاوِلْ أَنْ تُغَيِّرَ حِسَابَاتِ الأَمْسِ وَلَا الأَشْيَاءَ الَّتِي خَسِرْتَهَا فِيهِ، فَإِذَا العُمْرُ سَقَطَتْ أَوْرَاقُهُ فَلَنْ يَعُودَ مَرَّةً أُخْرَى، وَلَكِنْ مَعَ كُلِّ رَبِيعٍ جَدِيدٍ سَتَخْضَرُّ أَوْرَاقٌ أُخْرَى جَدِيدَةٌ، فَحَافِظْ عَلَيْهَا مِنَ الآنَ. انْظُرْ إِلَى تِلْكَ الأَوْرَاقِ الَّتِي تُغَطِّي وَجْهَ السَّمَاءِ وَدَعْ عَنْكَ مَا سَقَطَ عَلَى الأَرْضِ، فَمَتَى سَقَطَ الشَّيْءُ عَلَى الأَرْضِ فَقَدْ أَصْبَحَ جُزْءًا مِنَ التُّرَابِ.<br>وَإِذَا كَانَ المَاضِي قَدْ ضَاعَ فَبَيْنَ يَدَيْكَ اليَوْمُ، وَإِذَا كَانَ اليَوْمُ سَوْفَ يَجْمَعُ أَوْرَاقَهُ وَيَرْحَلُ فَلَدَيْكَ الغَدُ، فَلَا تَحْزَنْ عَلَى الأَمْسِ لِأَنَّهُ لَنْ يَعُودَ، وَلَا تَأْسَفْ عَلَى اليَوْمِ فَهُوَ رَاحِلٌ، وَاحْلُمْ بِشَمْسٍ مُضِيئَةٍ فِي غَدٍ جَمِيلٍ.<br>وَإِذَا لَمْ تَجِدْ مَنْ يُسْعِدُكَ فَحَاوِلْ أَنْ تُسْعِدَ نَفْسَكَ، وَإِذَا لَمْ تَجِدْ مَنْ يُضِيءُ لَكَ قِنْدِيلًا فَلَا تَذْهَبْ إِلَى آخَرَ يُطْفِئُهُ.<br>وَإِذَا لَمْ تَجِدْ عَدْلًا فِي مَحْكَمَةِ الدُّنْيَا فَارْفَعْ مِلَفَّكَ إِلَى مَحْكَمَةِ الآخِرَةِ، فَإِنَّ الشُّهُودَ مَلَائِكَةٌ، وَالدَّعْوَى مَحْفُوظَةٌ، وَالقَاضِي هُوَ أَحْكَمُ الحَاكِمِينَ.",
      textTr: "Güzel ağaçlar aramak için çöle gitme; çölde ıssızlıktan başka bir şey bulamazsın. Sana gölgesiyle gölge veren, meyveleriyle seni sevindiren, kuşlarının şarkılarıyla seni coşturan ağaçlara bak.<br>Dünün hesaplarını ve orada kaybettiğin şeyleri değiştirmeye çalışma; ömrün yaprakları düştüğünde bir daha geri gelmez. Ama her yeni baharda başka yeni yapraklar yeşerecek; onları şimdiden koru. Göğün yüzünü örten şu yapraklara bak, yere düşeni bırak; bir şey yere düştüğünde artık topraktan bir parça olmuştur.<br>Geçmiş kaybolduysa bugün elinin altında; bugün de yapraklarını toplayıp gidecekse yarın senin. Düne üzülme, çünkü geri gelmeyecek; bugüne de yanma, o da gidicidir; güzel bir yarında parlayan bir güneşi hayal et.<br>Seni mutlu edecek birini bulamazsan kendini mutlu etmeye çalış; sana kandil yakacak birini bulamazsan onu söndürecek başka birine gitme.<br>Dünya mahkemesinde adalet bulamazsan dosyanı ahiret mahkemesine taşı; çünkü orada şahitler meleklerdir, dava korunmuştur, hâkim de hâkimlerin en hâkimidir.",
      qa: [
        { q: "لِمَاذَا لَا نُسَافِرُ إِلَى الصَّحْرَاءِ بَحْثًا عَنِ الأَشْجَارِ؟", a: "لِأَنَّنَا لَنْ نَجِدَ فِيهَا غَيْرَ الوَحْشَةِ.", tr: "Ağaç aramak için niçin çöle gitmeyiz? Çünkü orada ıssızlıktan başka bir şey bulamayız." },
        { q: "مَاذَا يَحْدُثُ إِذَا سَقَطَتْ أَوْرَاقُ العُمْرِ؟", a: "لَا يَعُودُ العُمْرُ مَرَّةً أُخْرَى.", tr: "Ömrün yaprakları düşünce ne olur? Ömür bir daha geri gelmez." },
        { q: "مَاذَا يُصْبِحُ الشَّيْءُ إِذَا سَقَطَ عَلَى الأَرْضِ؟", a: "يُصْبِحُ جُزْءًا مِنَ التُّرَابِ.", tr: "Bir şey yere düşünce ne olur? Topraktan bir parça olur." },
        { q: "مَاذَا نَفْعَلُ إِذَا لَمْ نَجِدْ مَنْ يُسْعِدُنَا؟", a: "نُحَاوِلُ أَنْ نُسْعِدَ أَنْفُسَنَا.", tr: "Bizi mutlu edecek birini bulamazsak ne yaparız? Kendimizi mutlu etmeye çalışırız." },
        { q: "أَيْنَ نَرْفَعُ مِلَفَّنَا إِذَا لَمْ نَجِدْ عَدْلًا فِي الدُّنْيَا؟", a: "إِلَى مَحْكَمَةِ الآخِرَةِ؛ فَالشُّهُودُ مَلَائِكَةٌ، وَالقَاضِي أَحْكَمُ الحَاكِمِينَ.", tr: "Dünyada adalet bulamazsak dosyamızı nereye taşırız? Ahiret mahkemesine; orada şahitler melek, hâkim de hâkimlerin en hâkimidir." }
      ],
      cls: { opts: RDS, ar: "مَا سَبَبُ اقْتِرَانِ الجَوَابِ بِالفَاءِ؟", tr: "Koyu fâ’lı ifade şart cevabı mı? Öyleyse fâ’nın sebebi ne?", items: [
        { s: HL("فَإِذَا العُمْرُ سَقَطَتْ أَوْرَاقُهُ فَلَنْ يَعُودَ مَرَّةً أُخْرَى", "فَلَنْ يَعُودَ"), a: "n", why: "إِذَا’nın cevabı; لَنْ ile nefy." },
        { s: HL("فَمَتَى سَقَطَ الشَّيْءُ عَلَى الأَرْضِ فَقَدْ أَصْبَحَ جُزْءًا مِنَ التُّرَابِ", "فَقَدْ أَصْبَحَ"), a: "q", why: "مَتَى’nın cevabı; قَدْ ile." },
        { s: HL("وَإِذَا كَانَ المَاضِي قَدْ ضَاعَ فَبَيْنَ يَدَيْكَ اليَوْمُ", "فَبَيْنَ يَدَيْكَ اليَوْمُ"), a: "i", why: "İsim cümlesi: haber öne geçmiş." },
        { s: HL("وَإِذَا كَانَ اليَوْمُ سَوْفَ يَجْمَعُ أَوْرَاقَهُ وَيَرْحَلُ فَلَدَيْكَ الغَدُ", "فَلَدَيْكَ الغَدُ"), a: "i", why: "İsim cümlesi." },
        { s: HL("وَإِذَا لَمْ تَجِدْ مَنْ يُسْعِدُكَ فَحَاوِلْ أَنْ تُسْعِدَ نَفْسَكَ", "فَحَاوِلْ"), a: "t", why: "Emir." },
        { s: HL("وَإِذَا لَمْ تَجِدْ مَنْ يُضِيءُ لَكَ قِنْدِيلًا فَلَا تَذْهَبْ إِلَى آخَرَ يُطْفِئُهُ", "فَلَا تَذْهَبْ"), a: "t", why: "Nehy." },
        { s: HL("وَإِذَا لَمْ تَجِدْ عَدْلًا فِي مَحْكَمَةِ الدُّنْيَا فَارْفَعْ مِلَفَّكَ", "فَارْفَعْ مِلَفَّكَ"), a: "t", why: "Emir." },
        { s: HL("لَا تُسَافِرْ إِلَى الصَّحْرَاءِ… فَلَنْ تَجِدَ فِي الصَّحْرَاءِ غَيْرَ الوَحْشَةِ", "فَلَنْ تَجِدَ"), a: "x", why: "Şart edatı yok: fâ sebep bildirir (ta’lîl)." },
        { s: HL("سَتَخْضَرُّ أَوْرَاقٌ أُخْرَى جَدِيدَةٌ، فَحَافِظْ عَلَيْهَا مِنَ الآنَ", "فَحَافِظْ عَلَيْهَا"), a: "x", why: "Öncesine bağlayan fâ; şart yok." },
        { s: HL("وَلَا تَأْسَفْ عَلَى اليَوْمِ فَهُوَ رَاحِلٌ", "فَهُوَ رَاحِلٌ"), a: "x", why: "Ta’lîl fâsı: “çünkü o gidicidir”." },
        { s: HL("فَارْفَعْ مِلَفَّكَ إِلَى مَحْكَمَةِ الآخِرَةِ، فَإِنَّ الشُّهُودَ مَلَائِكَةٌ", "فَإِنَّ الشُّهُودَ مَلَائِكَةٌ"), a: "x", why: "Ta’lîl fâsı." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["وَإِنْ يَمْسَسْكَ بِخَيْرٍ {فَهُوَ} عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", ["فَهُوَ", "هُوَ", "وَهُوَ"], "isim cümlesi: fâ", "Sana bir iyilik dokundurursa O her şeye kadirdir.", "u1"],
  ["مَنْ يَجْتَهِدْ {يَنْجَحْ}.", ["يَنْجَحْ", "فَيَنْجَحْ", "يَنْجَحُ"], "fâsız muzâri: meczûm", "Kim çalışırsa başarır.", "u1"],
  ["مَنْ يُفْشِ سِرَّ صَدِيقِهِ {فَلَيْسَ} بِصَدِيقٍ.", ["فَلَيْسَ", "لَيْسَ", "فَلَمْ"], "câmid fiil: fâ", "Sırrı ifşa eden arkadaş değildir.", "u1"],
  ["إِنْ تَعْمَلُوا صَالِحًا {فَعَسَى} اللهُ أَنْ يُدْخِلَكُمُ الجَنَّةَ.", ["فَعَسَى", "عَسَى", "فَيَعْسَى"], "câmid fiil: fâ", "Salih amel işlerseniz umulur ki Allah sizi cennete koyar.", "u1"],
  ["إِنْ تَتَعَاوَنُوا عَلَى البِرِّ {فَنِعْمَ} مَا تَصْنَعُونَ.", ["فَنِعْمَ", "نِعْمَ", "فَيَنْعَمُ"], "câmid fiil: fâ", "İyilikte yardımlaşırsanız ne güzel yaparsınız.", "u1"],
  ["إِذَا أُصِبْتَ بِمَرَضٍ {فَاتَّبِعْ} نَصِيحَةَ الطَّبِيبِ.", ["فَاتَّبِعْ", "اتَّبِعْ", "فَتَتَّبِعْ"], "emir: fâ", "Hastalanırsan doktorun tavsiyesine uy.", "u2"],
  ["إِنْ كُلِّفْتَ بِعَمَلٍ فَلَا {تُقَصِّرْ} فِيهِ.", ["تُقَصِّرْ", "تُقَصِّرُ", "تُقَصِّرَ"], "nehy: meczûm", "Bir işle görevlendirilirsen kusur etme.", "u2"],
  ["إِذَا حَدَّثْتُكَ بِسِرٍّ فَهَلْ {تَكْتُمُهُ}؟", ["تَكْتُمُهُ", "تَكْتُمْهُ", "تَكْتُمَهُ"], "istifham: merfû", "Sana sır söylersem saklar mısın?", "u2"],
  ["إِنْ عَصَيْتَ أَمْرِي فَلَنْ {تَنَالَ} مَحَبَّتِي.", ["تَنَالَ", "تَنَلْ", "تَنَالُ"], "لَنْ: mansûb", "Emrime karşı gelirsen sevgimi kazanamazsın.", "u2"],
  ["مَنْ يَجْتَهِدْ فَمَا {يَمْتَنِعُ} أَحَدٌ عَنْ مُكَافَأَتِهِ.", ["يَمْتَنِعُ", "يَمْتَنِعْ", "يَمْتَنِعَ"], "مَا: merfû", "Çalışanı ödüllendirmekten kimse geri durmaz.", "u2"],
  ["إِذَا لَمْ تَلْتَزِمِ الصِّدْقَ فَلَا {يَثِقُ} بِكَ أَحَدٌ.", ["يَثِقُ", "يَثِقْ", "يَثِقَ"], "nâfiye لَا: merfû", "Doğruluğa bağlı kalmazsan kimse sana güvenmez.", "u2"],
  ["مَنْ عَرَفَ نَفْسَهُ {فَقَدْ} عَرَفَ رَبَّهُ.", ["فَقَدْ", "قَدْ", "فَلَمْ"], "قَدْ: fâ", "Kendini bilen Rabbini bilir.", "u3"],
  ["فَإِنْ يَقْتَسِمْ مَالِي بَنِيَّ وَإِخْوَتِي ‖ فَلَنْ {يَقْسِمُوا} خُلْقِي وَلَا فِعْلِي", ["يَقْسِمُوا", "يَقْسِمُونَ", "يَقْسِمْ"], "لَنْ: mansûb, nûn düşer", "Malımı paylaşsalar da ahlakımı paylaşamazlar.", "u3"],
  ["اطْلُبُوا المَجْدَ عَلَى الأَرْضِ فَإِنْ ‖ هِيَ ضَاقَتْ {فَاطْلُبُوهُ} فِي السَّمَاءِ", ["فَاطْلُبُوهُ", "اطْلُبُوهُ", "فَتَطْلُبُوهُ"], "emir: fâ", "Yeryüzü daralırsa şerefi gökte arayın.", "u3"],
  ["إِذَا المَرْءُ لَمْ يَدْنَسْ مِنَ اللُّؤْمِ عِرْضُهُ ‖ {فَكُلُّ} رِدَاءٍ يَرْتَدِيهِ جَمِيلُ", ["فَكُلُّ", "كُلُّ", "فَكُلَّ"], "isim cümlesi: mübtedâ merfû", "Namusu kirlenmeyenin her elbisesi güzeldir.", "u3"],
  ["إِذَا لَمْ يَكُنْ صَفْوُ الوِدَادِ طَبِيعَةً ‖ فَلَا {خَيْرَ} فِي وُدٍّ يَجِيءُ تَكَلُّفَا", ["خَيْرَ", "خَيْرٌ", "خَيْرًا"], "cinsi nefy eden لَا: isim cümlesi", "Zorlama sevgide hayır yoktur.", "u3"],
  ["إِذَا فَكَّرْتَ حَقَّ التَّفْكِيرِ {فَسَيَسْهُلُ} عَلَيْكَ كُلُّ عَسِيرٍ.", ["فَسَيَسْهُلُ", "فَسَيَسْهُلْ", "سَيَسْهُلُ"], "سَـ: fâ, merfû", "Gereği gibi düşünürsen her zorluk kolaylaşacak.", "u3"],
  ["مَنْ يَدْرُسْ {فَسَيَنْجَحُ}.", ["فَسَيَنْجَحُ", "فَسَيَنْجَحْ", "سَيَنْجَحُ"], "fâ’lı muzâri meczûm olmaz", "Kim çalışırsa başaracak.", "u4"],
  ["إِنْ تَقْرَأْ لِكُتَّابٍ مُحَايِدِينَ {فَسَتَفْهَمُ} الحَقِيقَةَ.", ["فَسَتَفْهَمُ", "فَسَتَفْهَمِ", "سَتَفْهَمُ"], "سَـ: merfû", "Tarafsız yazarları okursan gerçeği anlayacaksın.", "u4"],
  ["مَتَى أَحْسَنْتَ إِلَى النَّاسِ {فَقَدْ} مَلَكْتَ قُلُوبَهُمْ.", ["فَقَدْ", "قَدْ", "فَلَمْ"], "قَدْ: fâ", "İyilik ettiğinde kalpleri kazanmış olursun.", "u4"],
  ["إِنْ تَعْمَلْ فِي صِغَرِكَ فَسَوْفَ {تَرْتَاحُ} فِي كِبَرِكَ.", ["تَرْتَاحُ", "تَرْتَحْ", "تَرْتَاحَ"], "سَوْفَ: merfû", "Küçükken çalışırsan büyüyünce rahat edeceksin.", "u4"],
  ["إِذَا لَمْ تُوَاظِبْ عَلَى دُرُوسِكَ {فَسَتَرْسُبُ} فِي الاخْتِبَارِ.", ["فَسَتَرْسُبُ", "فَسَتَرْسُبْ", "تَرْسُبْ"], "سَـ: merfû", "Derslerine devam etmezsen sınavda kalacaksın.", "u4"],
  ["إِنْ يَنْصُرْكُمُ اللهُ {فَلَا} غَالِبَ لَكُمْ.", ["فَلَا", "لَا", "فَلَنْ"], "isim cümlesi: fâ", "Allah size yardım ederse size galip gelecek yoktur.", "u5"],
  ["مَنْ يُطِعِ الرَّسُولَ {فَقَدْ} أَطَاعَ اللهَ.", ["فَقَدْ", "قَدْ", "فَلَا"], "قَدْ: fâ", "Peygamber’e itaat eden Allah’a itaat etmiş olur.", "u5"],
  ["وَمَنْ يَتَوَكَّلْ عَلَى اللهِ {فَهُوَ} حَسْبُهُ.", ["فَهُوَ", "هُوَ", "فَهُمْ"], "isim cümlesi: fâ", "Allah’a tevekkül edene O yeter.", "u5"],
  ["إِذَا سَأَلْتَ {فَاسْأَلِ} اللهَ.", ["فَاسْأَلِ", "اسْأَلِ", "فَتَسْأَلُ"], "emir: fâ", "İstediğinde Allah’tan iste.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["مَنْ يَدْرُسْ يَنْجَحْ ← سَـ ile", "مَنْ يَدْرُسْ فَسَيَنْجَحُ", "مَنْ يَدْرُسْ سَيَنْجَحُ", "مَنْ يَدْرُسْ فَسَيَنْجَحْ", "سَـ: fâ gerekir, fiil merfû.", "u1"],
  ["إِنْ تَجْتَهِدْ تَنْجَحْ ← isim cümlesi (النَّجَاحُ حَلِيفُكَ)", "إِنْ تَجْتَهِدْ فَالنَّجَاحُ حَلِيفُكَ", "إِنْ تَجْتَهِدْ النَّجَاحُ حَلِيفُكَ", "إِنْ تَجْتَهِدْ فَالنَّجَاحَ حَلِيفُكَ", "İsim cümlesi: fâ gerekir.", "u1"],
  ["مَنْ يُفْشِ سِرَّ صَدِيقِهِ يَخْسَرْهُ ← لَيْسَ ile", "مَنْ يُفْشِ سِرَّ صَدِيقِهِ فَلَيْسَ بِصَدِيقٍ", "مَنْ يُفْشِ سِرَّ صَدِيقِهِ لَيْسَ بِصَدِيقٍ", "مَنْ يُفْشِ سِرَّ صَدِيقِهِ فَلَيْسَ بِصَدِيقٌ", "Câmid fiil: fâ gerekir.", "u1"],
  ["إِنْ تَعْمَلُوا صَالِحًا تُفْلِحُوا ← عَسَى ile", "إِنْ تَعْمَلُوا صَالِحًا فَعَسَى اللهُ أَنْ يَرْحَمَكُمْ", "إِنْ تَعْمَلُوا صَالِحًا عَسَى اللهُ أَنْ يَرْحَمَكُمْ", "إِنْ تَعْمَلُوا صَالِحًا فَعَسَى اللهَ أَنْ يَرْحَمَكُمْ", "Câmid fiil: fâ gerekir.", "u1"],
  ["إِذَا أُصِبْتَ بِمَرَضٍ تَتَّبِعُ نَصِيحَةَ الطَّبِيبِ ← emir", "إِذَا أُصِبْتَ بِمَرَضٍ فَاتَّبِعْ نَصِيحَةَ الطَّبِيبِ", "إِذَا أُصِبْتَ بِمَرَضٍ اتَّبِعْ نَصِيحَةَ الطَّبِيبِ", "إِذَا أُصِبْتَ بِمَرَضٍ فَتَتَّبِعْ نَصِيحَةَ الطَّبِيبِ", "Emir: fâ gerekir.", "u2"],
  ["إِنْ كُلِّفْتَ بِعَمَلٍ تُقَصِّرْ فِيهِ ← nehy", "إِنْ كُلِّفْتَ بِعَمَلٍ فَلَا تُقَصِّرْ فِيهِ", "إِنْ كُلِّفْتَ بِعَمَلٍ لَا تُقَصِّرْ فِيهِ", "إِنْ كُلِّفْتَ بِعَمَلٍ فَلَا تُقَصِّرُ فِيهِ", "Nehy: fâ gerekir, fiil meczûm.", "u2"],
  ["إِنْ عَصَيْتَ أَمْرِي تَخْسَرْ مَحَبَّتِي ← لَنْ تَنَالَ", "إِنْ عَصَيْتَ أَمْرِي فَلَنْ تَنَالَ مَحَبَّتِي", "إِنْ عَصَيْتَ أَمْرِي لَنْ تَنَالَ مَحَبَّتِي", "إِنْ عَصَيْتَ أَمْرِي فَلَنْ تَنَلْ مَحَبَّتِي", "لَنْ: fâ gerekir, fiil mansûb.", "u2"],
  ["إِذَا حَدَّثْتُكَ بِسِرٍّ تَكْتُمُهُ ← istifham (هَلْ)", "إِذَا حَدَّثْتُكَ بِسِرٍّ فَهَلْ تَكْتُمُهُ؟", "إِذَا حَدَّثْتُكَ بِسِرٍّ هَلْ تَكْتُمُهُ؟", "إِذَا حَدَّثْتُكَ بِسِرٍّ فَهَلْ تَكْتُمْهُ؟", "İstifham: fâ gerekir.", "u2"],
  ["مَنْ عَرَفَ نَفْسَهُ عَرَفَ رَبَّهُ ← قَدْ ile", "مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ", "مَنْ عَرَفَ نَفْسَهُ قَدْ عَرَفَ رَبَّهُ", "مَنْ عَرَفَ نَفْسَهُ فَعَرَفَ رَبَّهُ", "قَدْ: fâ gerekir.", "u3"],
  ["إِذَا لَمْ تَسْتَحْيِ تَصْنَعُ مَا تَشَاءُ ← emir", "إِذَا لَمْ تَسْتَحْيِ فَاصْنَعْ مَا تَشَاءُ", "إِذَا لَمْ تَسْتَحْيِ اصْنَعْ مَا تَشَاءُ", "إِذَا لَمْ تَسْتَحْيِ فَتَصْنَعُ مَا تَشَاءُ", "Emir: fâ gerekir.", "u3"],
  ["مَتَى أَحْسَنْتَ إِلَى النَّاسِ مَلَكْتَ قُلُوبَهُمْ ← قَدْ ile", "مَتَى أَحْسَنْتَ إِلَى النَّاسِ فَقَدْ مَلَكْتَ قُلُوبَهُمْ", "مَتَى أَحْسَنْتَ إِلَى النَّاسِ قَدْ مَلَكْتَ قُلُوبَهُمْ", "مَتَى أَحْسَنْتَ إِلَى النَّاسِ فَمَلَكْتَ قُلُوبَهُمْ", "قَدْ: fâ gerekir.", "u4"],
  ["مَتَى تُرْضِ الوَالِدَيْنِ تَنَلْ سَعَادَةَ الدَّارَيْنِ ← سَـ ile", "مَتَى تُرْضِ الوَالِدَيْنِ فَسَتَنَالُ سَعَادَةَ الدَّارَيْنِ", "مَتَى تُرْضِ الوَالِدَيْنِ فَسَتَنَلْ سَعَادَةَ الدَّارَيْنِ", "مَتَى تُرْضِ الوَالِدَيْنِ سَتَنَالُ سَعَادَةَ الدَّارَيْنِ", "سَـ: merfû, elif geri gelir.", "u4"],
  ["أَيَّ عَمَلٍ تَعْمَلْ تَنْوِ فِيهِ الخَيْرَ ← emir", "أَيَّ عَمَلٍ تَعْمَلْ فَانْوِ فِيهِ الخَيْرَ", "أَيَّ عَمَلٍ تَعْمَلْ انْوِ فِيهِ الخَيْرَ", "أَيَّ عَمَلٍ تَعْمَلْ فَانْوِي فِيهِ الخَيْرَ", "Emir: fâ gerekir; illetli harf düşer.", "u4"],
  ["إِنْ يَنْصُرْكُمُ اللهُ لَا يَغْلِبْكُمْ أَحَدٌ ← isim cümlesi (لَا غَالِبَ)", "إِنْ يَنْصُرْكُمُ اللهُ فَلَا غَالِبَ لَكُمْ", "إِنْ يَنْصُرْكُمُ اللهُ لَا غَالِبَ لَكُمْ", "إِنْ يَنْصُرْكُمُ اللهُ فَلَا غَالِبٌ لَكُمْ", "İsim cümlesi: fâ gerekir.", "u5"],
  ["إِذَا اسْتَعَنْتَ تَسْتَعِينُ بِاللهِ ← emir", "إِذَا اسْتَعَنْتَ فَاسْتَعِنْ بِاللهِ", "إِذَا اسْتَعَنْتَ اسْتَعِنْ بِاللهِ", "إِذَا اسْتَعَنْتَ فَاسْتَعِينُ بِاللهِ", "Emir: fâ gerekir.", "u5"]
];
// Fâ sebebi hız oyunu
var NOUN_LIST = UNITS[0].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = SBB;
// Fâ gerekli mi hız oyunu
var MM_OPTS = FN;
var MM_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  sb: { name: "Cevap ↔ sebep", pairs: [["فَهُوَ حَسْبُهُ", "isim cümlesi"], ["فَاتَّبِعُونِي", "emir"], ["فَلَا تُقَصِّرْ", "nehy"], ["فَهَلْ تَكْتُمُهُ؟", "istifham"], ["فَلَنْ تَنَالَ", "len ile nefy"], ["فَقَدْ عَرَفَ", "kad ile"], ["فَسَوْفَ تَنْدَمُ", "sevfe ile"], ["فَلَيْسَ بِصَدِيقٍ", "câmid fiil"]] },
  fz: { name: "Fâsız ↔ fâ’lı", pairs: [["يَنْجَحْ", "فَسَيَنْجَحُ"], ["تَنَلْ مَحَبَّتِي", "فَلَنْ تَنَالَ مَحَبَّتِي"], ["تَفْهَمِ الحَقِيقَةَ", "فَسَتَفْهَمُ الحَقِيقَةَ"], ["يَنَلْ ثِقَتَهُ", "فَسَيَنَالُ ثِقَتَهُ"], ["مَلَكْتَ قُلُوبَهُمْ", "فَقَدْ مَلَكْتَ قُلُوبَهُمْ"], ["تَرْتَحْ فِي كِبَرِكَ", "فَسَوْفَ تَرْتَاحُ فِي كِبَرِكَ"], ["يُقْبِلْ إِلَيْكَ الصَّدِيقُ", "فَالصَّدِيقُ مُقْبِلٌ إِلَيْكَ"], ["كَرِهَتْكَ بِيئَتُكَ", "فَسَتَكْرَهُكَ بِيئَتُكَ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ", "kendini bilen Rabbini bilir"], ["فَلَا غَالِبَ لَكُمْ", "size galip gelecek yoktur"], ["فَهُوَ حَسْبُهُ", "O ona yeter"], ["فَتَبَيَّنُوا", "araştırın"], ["فَاسْأَلِ اللهَ", "Allah’tan iste"], ["فَارْتَعُوا", "oralardan nasiplenin"], ["فَبِئْسَ مَا تَعْمَلُ", "ne kötü yapıyorsun"], ["فَسَيَسْهُلُ عَلَيْكَ", "sana kolay gelecek"]] }
};
var KARTLAR = [
  ["Şart cevabı aslen fâ alır mı?", "Hayır; aslı fâsızdır: مَنْ يَجْتَهِدْ يَنْجَحْ. Beş durumda fâ gerekir."],
  ["Cevap isim cümlesi ise?", "Fâ gerekir: فَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ"],
  ["Cevap talep ise?", "Emir, nehy, istifham, temennî: فَاتَّبِعْ · فَلَا تُقَصِّرْ · فَهَلْ تَكْتُمُهُ؟"],
  ["Hangi nefy harfleri fâ ister?", "مَا، لَا، لَنْ: فَلَنْ تَنَالَ · فَمَا يَمْتَنِعُ"],
  ["لَمْ ile olumsuz cevap?", "Fâ gerekmez: إِنْ تُهْمِلْ لَمْ تَنْجَحْ"],
  ["قَدْ، سَـ، سَوْفَ?", "Fâ gerekir: فَقَدْ عَرَفَ · فَسَوْفَ تَنْدَمُ"],
  ["Câmid fiiller?", "لَيْسَ، عَسَى، نِعْمَ، بِئْسَ: فَلَيْسَ بِصَدِيقٍ"],
  ["Fâ’lı muzâri meczûm olur mu?", "Şart yüzünden olmaz: فَسَيَنْجَحُ (merfû), فَلَنْ تَنَالَ (mansûb)."],
  ["Fâ’lı cümlenin i’rabı?", "Bütünü mahallen meczûm: cevâbu’ş-şart."],
  ["Kural إِذَا ve لَوْ’da da geçerli mi?", "Evet; câzim olsun olmasın her şart edatında."],
  ["Her fâ şart cevabı mıdır?", "Hayır: فَإِنَّ الشُّهُودَ… · فَهُوَ رَاحِلٌ ta’lîl fâsıdır."],
  ["Ezber beyti?", "اسْمِيَّةٌ طَلَبِيَّةٌ وَبِجَامِدٍ ‖ وَبِمَا وَقَدْ وَبِلَنْ وَبِالتَّنْفِيسِ"]
];
