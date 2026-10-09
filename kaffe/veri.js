// ================= VERİ: İnne mi, Enne mi? Mâ-i Kâffe (كَسْرُ هَمْزَةِ «إِنَّ» · «مَا» الكَافَّةُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "إِنَّ وَأَخَوَاتُهَا", tr: "İnne / kardeşleri" }, nasb: { ar: "الاسْمُ بَعْدَهَا", tr: "Ardındaki isim" }, cerr: { ar: "سَبَبُ الضَّبْطِ", tr: "Kesre / fetha sebebi" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var KE = [["k", "İnne (kesre)", "إِنَّ المَكْسُورَةُ", "nasb"], ["f", "Enne (fetha)", "أَنَّ المَفْتُوحَةُ", "cerr"]];
var KS = [["a", "Söz başında", "فِي أَوَّلِ الكَلَامِ", "nasb"], ["q", "Kavilden sonra", "بَعْدَ القَوْلِ", "cerr"], ["h", "Hays’ten sonra", "بَعْدَ «حَيْثُ»", "mi"], ["y", "Yeminden sonra", "بَعْدَ اليَمِينِ", "ref"], ["l", "Hâl cümlesi başında", "فِي أَوَّلِ جُمْلَةِ الحَالِ", "mz"], ["s", "Sıla cümlesi başında", "فِي أَوَّلِ جُمْلَةِ الصِّلَةِ", "muz"], ["e", "Elâ’dan sonra", "بَعْدَ «أَلَا» الاسْتِفْتَاحِيَّةِ", "sf"]];
var KSF = KS.concat([["f", "Enne (fetha)", "أَنَّ المَفْتُوحَةُ", "x"]]);
var EN = [["c", "Harf-i cerden / muzâftan sonra", "بَعْدَ حَرْفِ جَرٍّ أَوْ مُضَافٍ", "nasb"], ["m", "Mef’ûl yerinde", "فِي مَحَلِّ مَفْعُولٍ بِهِ", "cerr"], ["t", "Fâil ya da mübtedâ yerinde", "فِي مَحَلِّ فَاعِلٍ أَوْ مُبْتَدَإٍ", "mi"]];
var AM = [["a", "Âmil", "عَامِلَةٌ", "nasb"], ["g", "Gayr-i âmil", "غَيْرُ عَامِلَةٍ", "cerr"]];
var MK = [["r", "İsim merfû (mübtedâ)", "الاسْمُ بَعْدَهَا مَرْفُوعٌ", "nasb"], ["f", "Fiil cümlesine girdi", "دَخَلَتْ عَلَى الجُمْلَةِ الفِعْلِيَّةِ", "cerr"], ["n", "Leytemâ amel etti", "عَمِلَتْ «لَيْتَمَا»", "mi"]];
var TUR_TR = { k: "İnne", f: "Enne", a: "Söz başı", q: "Kavil", h: "Hays", y: "Yemin", l: "Hâl", s: "Sıla", e: "Elâ", c: "Cerden sonra", m: "Mef’ûl", t: "Fâil / mübtedâ", g: "Gayr-i âmil", r: "Merfû", n: "Mansûb" };
// Makine: cümle × yer → [cümle, Türkçe]
var IW = ["العِلْمُ نُورٌ", "الصِّدْقُ يُنْجِي", "المُؤْمِنُونَ إِخْوَةٌ"];
var IC = ["Söz başı", "Kavilden sonra", "Yeminden sonra", "Hays’ten sonra", "Hâl cümlesi", "Sıla cümlesi", "Elâ’dan sonra", "Fiilden sonra: enne", "Mâ-i kâffe"];
var IX = [
  [["إِنَّ:mz / العِلْمَ:nasb / نُورٌ.:x", "Şüphesiz ilim nurdur."], ["قَالَ المُعَلِّمُ::cerr / إِنَّ:mz / العِلْمَ:nasb / نُورٌ.:x", "Öğretmen: “Şüphesiz ilim nurdur” dedi."], ["وَاللهِ:cerr / إِنَّ:mz / العِلْمَ:nasb / لَنُورٌ.:x", "Allah’a yemin olsun ki ilim nurdur."], ["اجْلِسْ:x / حَيْثُ:cerr / إِنَّ:mz / العِلْمَ:nasb / يُطْلَبُ.:x", "İlmin arandığı yerde otur."], ["دَخَلْتُ المَكْتَبَةَ:x / وَ:cerr / إِنَّ:mz / العِلْمَ:nasb / يَمْلَأُ قَلْبِي.:x", "Kütüphaneye girdim; ilim kalbimi dolduruyordu."], ["صَاحِبِ:x / الَّذِي:cerr / إِنَّ:mz / عِلْمَهُ:nasb / نَافِعٌ.:x", "İlmi faydalı olanla dost ol."], ["أَلَا:cerr / إِنَّ:mz / العِلْمَ:nasb / نُورٌ.:x", "Bilin ki ilim nurdur."], ["أَعْتَقِدُ:cerr / أَنَّ:mz / العِلْمَ:nasb / نُورٌ.:x", "İlmin nur olduğuna inanıyorum."], ["إِنَّمَا:mz / العِلْمُ:nasb / نُورٌ.:x", "İlim ancak nurdur."]],
  [["إِنَّ:mz / الصِّدْقَ:nasb / يُنْجِي.:x", "Şüphesiz doğruluk kurtarır."], ["قَالَ أَبِي::cerr / إِنَّ:mz / الصِّدْقَ:nasb / يُنْجِي.:x", "Babam: “Doğruluk kurtarır” dedi."], ["وَاللهِ:cerr / إِنَّ:mz / الصِّدْقَ:nasb / لَيُنْجِي.:x", "Vallahi doğruluk kurtarır."], ["قُلِ الحَقَّ:x / حَيْثُ:cerr / إِنَّ:mz / الصِّدْقَ:nasb / يُنْجِي.:x", "Doğruyu söyle; çünkü doğruluk kurtarır."], ["تَكَلَّمَ الشَّاهِدُ:x / وَ:cerr / إِنَّهُ:mz / صَادِقٌ.:x", "Şahit konuştu, hem de doğru söyleyerek."], ["كُنْ مَعَ:x / الَّذِي:cerr / إِنَّ:mz / صِدْقَهُ:nasb / ظَاهِرٌ.:x", "Doğruluğu açık olanla beraber ol."], ["أَلَا:cerr / إِنَّ:mz / الصِّدْقَ:nasb / يُنْجِي.:x", "Bilin ki doğruluk kurtarır."], ["عَلِمْتُ:cerr / أَنَّ:mz / الصِّدْقَ:nasb / يُنْجِي.:x", "Doğruluğun kurtardığını öğrendim."], ["إِنَّمَا:mz / يُنْجِي:x / الصِّدْقُ.:nasb", "Ancak doğruluk kurtarır. (fiil cümlesi)"]],
  [["إِنَّ:mz / المُؤْمِنِينَ:nasb / إِخْوَةٌ.:x", "Şüphesiz müminler kardeştir."], ["قَالَ الخَطِيبُ::cerr / إِنَّ:mz / المُؤْمِنِينَ:nasb / إِخْوَةٌ.:x", "Hatip: “Müminler kardeştir” dedi."], ["وَاللهِ:cerr / إِنَّ:mz / المُؤْمِنِينَ:nasb / لَإِخْوَةٌ.:x", "Vallahi müminler kardeştir."], ["نَتَعَاوَنُ:x / حَيْثُ:cerr / إِنَّ:mz / المُؤْمِنِينَ:nasb / إِخْوَةٌ.:x", "Yardımlaşırız; çünkü müminler kardeştir."], ["اجْتَمَعَ النَّاسُ فِي المَسْجِدِ:x / وَ:cerr / إِنَّهُمْ:mz / إِخْوَةٌ.:x", "İnsanlar kardeşçe camide toplandı."], ["أُحِبُّ القَوْمَ:x / الَّذِينَ:cerr / إِنَّهُمْ:mz / إِخْوَةٌ فِي اللهِ.:x", "Allah için kardeş olan topluluğu severim."], ["أَلَا:cerr / إِنَّ:mz / المُؤْمِنِينَ:nasb / إِخْوَةٌ.:x", "Bilin ki müminler kardeştir."], ["اعْلَمْ:cerr / أَنَّ:mz / المُؤْمِنِينَ:nasb / إِخْوَةٌ.:x", "Müminlerin kardeş olduğunu bil."], ["﴿إِنَّمَا:mz / المُؤْمِنُونَ:nasb / إِخْوَةٌ﴾:x", "Müminler ancak kardeştir. (Hucurât 10)"]]
];
var IN = [
  "Söz başında hemze kesreli okunur: إِنَّ.",
  "قَالَ / يَقُولُ’den sonra söz aynen aktarılır: kesre.",
  "Yeminden (وَاللهِ، وَرَبِّ الكَعْبَةِ، وَالعَصْرِ) sonra kesre.",
  "حَيْثُ’ten sonra kesre: حَيْثُ إِنَّ.",
  "Hâl cümlesinin başında (وَ’dan sonra) kesre.",
  "Mevsûlden sonra sıla cümlesinin başında kesre.",
  "İstiftâh edatı أَلَا’dan sonra kesre.",
  "Fiilin mef’ûlü, fâili ya da harf-i cerin mecrûru yerinde (masdara çevrilebiliyorsa) fetha: أَنَّ.",
  "مَا الكَافَّةُ inne’yi amelden alıkoyar: ardındaki isim merfû mübtedâ olur; fiil cümlesine de girebilir."
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
// Zabt + sebep: [cümle, [biçim ×3], sebep anahtarı, Türkçe, açıklama]
var SBB = { a: "وَقَعَتْ فِي أَوَّلِ الكَلَامِ", q: "وَقَعَتْ بَعْدَ القَوْلِ", h: "وَقَعَتْ بَعْدَ «حَيْثُ»", y: "وَقَعَتْ بَعْدَ اليَمِينِ", l: "وَقَعَتْ فِي أَوَّلِ جُمْلَةِ الحَالِ", s: "وَقَعَتْ فِي أَوَّلِ جُمْلَةِ الصِّلَةِ", e: "وَقَعَتْ بَعْدَ «أَلَا» الاسْتِفْتَاحِيَّةِ" };
var TSB = { a: ["a", "y", "e"], q: ["q", "a", "s"], h: ["h", "l", "a"], y: ["y", "e", "a"], l: ["l", "s", "h"], s: ["s", "l", "q"], e: ["e", "y", "a"] };
function ZS(x, i) { return CBP([x[0] + "<br>الضَّبْطُ:", x[1], "<br>السَّبَبُ:", TSB[x[2]].map(function (k) { return SBB[k]; })], i, x[3], x[4]); }

var METIN1 = "يَقُولُ المُؤَرِّخُونَ انَّ إِسْطَنْبُولَ مَدِينَةٌ قَدِيمَةٌ يَمْتَدُّ تَارِيخُهَا إِلَى آلَافِ السِّنِينَ قَبْلَ المِيلَادِ، تَشْتَهِرُ بِانَّهَا كَثِيرَةُ الآثَارِ التَّارِيخِيَّةِ، مِنْ بَيْنِهَا مَسَاجِدُ وَكَنَائِسُ وَقُصُورٌ. كَانَتْ مَرْكَزَ الخِلَافَةِ حَيْثُ انَّ الخُلَفَاءَ العُثْمَانِيِّينَ كَانُوا يُقِيمُونَ فِيهَا." +
  "<br>انَّ إِسْطَنْبُولَ أَكْثَرُ المُدُنِ فِي تُرْكِيَا سُكَّانًا، فَإِذَا زُرْتَهَا أَدْهَشَكَ انَّ شَوَارِعَهَا مُزْدَحِمَةٌ، وَرَأَيْتَ فِي الوَقْتِ نَفْسِهِ انَّ الخِدْمَاتِ البَلَدِيَّةَ فِي المُسْتَوَى العَالِي. وَلَوْ شَاهَدْتَ بَعْضَ آثَارِهَا القَدِيمَةِ الَّتِي انَّهَا مِنْ أَرْوَعِ مَا صَنَعَهُ الإِنْسَانُ، لَعَلِمْتَ انَّ شَأْنَ الدَّوْلَةِ العُثْمَانِيَّةِ كَانَ عَظِيمًا.";
var METIN2 = "زُرْتُ إِحْدَى الأَسْوَاقِ الكَبِيرَةِ مَرَّةً، وَمَا كُنْتُ أَبْغِي شِرَاءً وَلَا بَيْعًا، وَإِنَّمَا أَرَدْتُ أَنْ أَعْرِفَ شَيْئًا مِنْ عَادَاتِ القَوْمِ وَأَعْمَالِهِمْ وَسُلُوكِهِمْ فِي هَذِهِ السُّوقِ. وَصَلْتُ إِلَيْهَا مُبَكِّرًا، فَخُيِّلَ إِلَيَّ أَنَّمَا الشَّوَارِعُ المُؤَدِّيَةُ إِلَيْهَا أَنْهَارٌ تَزْخَرُ بِالنَّاسِ: مِنْ رِجَالٍ وَنِسَاءٍ وَغِلْمَانٍ، وَمَا بَلَغْتُ بَابَهَا حَتَّى شَهِدْتُ النَّاسَ يَتَزَاحَمُونَ وَيَتَدَافَعُونَ، كَأَنَّمَا يَتَقَاتَلُونَ فِي مَلْحَمَةٍ أَوْ مَعْرَكَةٍ شَدِيدَةٍ." +
  "<br>دَفَعْتُ بِنَفْسِي بَيْنَ الأَقْدَامِ وَدَخَلْتُ السُّوقَ، فَإِذَا سِلَعٌ مَعْرُوضَةٌ فِي غَيْرِ نِظَامٍ، وَالنَّاسُ مُجْتَمِعُونَ أَمَامَهَا وَهُمْ حَيَارَى لَا يَدْرُونَ مِنْ أَثْمَانِهَا شَيْئًا، وَلَكِنَّهُمْ يَتَسَاوَمُونَ فِيهَا مُسَاوَمَةً شَدِيدَةً. وَلَيْتَمَا لِهَذِهِ الأَسْوَاقِ نِظَامًا صِحِّيًّا وَقَوَانِينَ حَتَّى لَا يُغَشَّ النَّاسُ فِيهَا.";

var UNITS = [
// ---------------------------------------------------------------- 1 · İNNE Mİ ENNE Mİ
{
  id: "u1", no: 1, ar: "إِنَّ أَمْ أَنَّ؟", tr: "İnne mi, Enne mi?", short: "İnne / Enne", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Hemzesi kesreli إِنَّ ile fethalı أَنَّ’yi ayırmak", "İnne’nin cümleyi kendi başına başlattığını, enne’nin cümleyi bir masdar gibi başka bir cümleye bağladığını görmek", "Boşluğa doğru biçimi koymak"],
  examples: [
    { s: "إِنَّ:mz / اللهَ:nasb / عَلِيمٌ حَكِيمٌ.:x", tr: "Şüphesiz Allah her şeyi bilendir, hikmet sahibidir. (söz başı: kesre)", pair: "أَعْتَقِدُ:cerr / أَنَّ:mz / الصِّحَّةَ:nasb / مُهِمَّةٌ.:x", pairTr: "Sağlığın önemli olduğuna inanıyorum. (mef’ûl yerinde: fetha)" },
    { s: "قَالَ الرَّجُلُ::cerr / إِنَّ:mz / وَلَدِي:nasb / قَدْ أُصِيبَ بِالسُّكَّرِيِّ.:x", tr: "Adam: “Oğlum şeker hastalığına yakalandı” dedi. (kavilden sonra: kesre)", pair: "سَمِعْتُ:cerr / أَنَّ:mz / عَدْنَانَ:nasb / مُصَابٌ بِالزُّكَامِ.:x", pairTr: "Adnân’ın nezle olduğunu duydum. (fetha)" }
  ],
  rules: [
    { tr: "<span class=\"ar\">إِنَّ</span> ile <span class=\"ar\">أَنَّ</span> aynı harftir: ismini nasb, haberini ref eder. Fark hemzenin harekesindedir." },
    { tr: "<b>Enne (fetha)</b>: ardındaki cümle bir <b>masdar</b>a çevrilebiliyorsa, yani başka bir cümlenin parçasıysa:", ex: ["mef’ûl: أَعْتَقِدُ أَنَّ الصِّحَّةَ مُهِمَّةٌ = أَعْتَقِدُ أَهَمِّيَّةَ الصِّحَّةِ", "fâil / mübtedâ: يَسُرُّنِي أَنَّكَ نَاجِحٌ · مِنَ المَعْلُومِ أَنَّ…", "harf-i cer / muzâftan sonra: إِلَى أَنَّ · بِأَنَّهَا · رَغْمَ أَنَّ · غَيْرَ أَنَّهُ"] },
    { tr: "<b>İnne (kesre)</b>: cümle kendi başına bir sözse ve masdara çevrilemiyorsa; kitap bunun <b>yedi yerini</b> sayar (2. konu): söz başı, kavilden sonra, hays’ten sonra, yeminden sonra, hâl cümlesi başı, sıla cümlesi başı, elâ’dan sonra." },
    { tr: "Dikkat: <span class=\"ar\">قَالَ</span> kesre ister, <span class=\"ar\">أَخْبَرَ · سَمِعَ · ظَنَّ · عَلِمَ · اعْتَقَدَ</span> fetha ister: <span class=\"ar\">قَالَ إِنَّهُ… · أَخْبَرَنِي أَنَّهُ…</span>" }
  ],
  kaide: ["١ ـ تُكْسَرُ الهَمْزَةُ (إِنَّ) فِي المَوَاضِعِ التَّالِيَةِ: أ ـ فِي أَوَّلِ الكَلَامِ. ب ـ بَعْدَ القَوْلِ (قَالَ، يَقُولُ…). جـ ـ بَعْدَ «حَيْثُ». د ـ بَعْدَ اليَمِينِ. هـ ـ فِي أَوَّلِ جُمْلَةِ الحَالِ. و ـ بَعْدَ الاسْمِ المَوْصُولِ فِي أَوَّلِ جُمْلَةِ الصِّلَةِ. ز ـ بَعْدَ «أَلَا» الاسْتِفْتَاحِيَّةِ."],
  ex: [
    { type: "classify", num: "١", opts: KE, ar: "عَيِّنْ «إِنَّ» المَكْسُورَةَ هَمْزَتُهَا فِيمَا يَأْتِي", tr: "Koyu “انّ” kesreli inne mi, fethalı enne mi?", items: CL([
      [HL("انَّ مِنَ البَيَانِ لَسِحْرًا.", "انَّ"), "k", "Söz başı: إِنَّ مِنَ البَيَانِ لَسِحْرًا (hadis)."],
      [HL("وَاللهِ انَّ بَعْضَ النَّاسِ لَا يُهِمُّهُمْ أَيُّ شَيْءٍ.", "انَّ"), "k", "Yeminden sonra."],
      [HL("سَمِعْتُ انَّ عَدْنَانَ مُصَابٌ بِالزُّكَامِ.", "انَّ"), "f", "سَمِعْتُ’in mef’ûlü yerinde: أَنَّ."],
      [HL("أَكْرَهُ الَّذِينَ انَّهُمْ يُخْلِفُونَ وَعْدَهُمْ.", "انَّ"), "k", "Sıla cümlesinin başında."],
      [HL("يَقُولُ صَدِيقِي انَّهُ فِي يَأْسٍ عَظِيمٍ.", "انَّ"), "k", "Kavilden sonra."],
      [HL("ذَهَبَ إِلَى العَمَلِ بِالرَّغْمِ مِنْ انَّهُ مَرِيضٌ جِدًّا.", "انَّ"), "f", "Harf-i cerden sonra: أَنَّ."],
      [HL("رَجَعَ الوَلَدُ مِنَ المَدْرَسَةِ وَانَّهُ نَالَ الجَائِزَةَ الرِّيَاضِيَّةَ.", "انَّ"), "k", "Hâl cümlesinin başında."],
      [HL("تُشِيرُ التَّطَوُّرَاتُ الأَخِيرَةُ إِلَى انَّ الوَضْعَ الاقْتِصَادِيَّ سَيَتَحَسَّنُ.", "انَّ"), "f", "إِلَى’dan sonra: أَنَّ."]
    ]) },
    { type: "pick", fill: true, num: "٢", ar: "امْلَإِ الفَرَاغَ بِـ«ان» وَاضْبِطْ هَمْزَتَهَا", tr: "Boşluğa doğru biçimi seç.", exHtml: "<span class=\"ar\">قَالَتْ لِي أُمِّي: «إِنَّ أَبَاكَ يَحْتَاجُ إِلَيْكَ الآنَ»</span>", items: PL([
      ["أَعْتَقِدُ ___ الصِّحَّةَ لَهَا صِلَةٌ قَوِيَّةٌ بِأُسْلُوبِ الحَيَاةِ.", "أَنَّ", "إِنَّ", "أَنْ", "Sağlığın yaşam tarzıyla güçlü bir bağı olduğuna inanıyorum.", "Mef’ûl yerinde: fetha."],
      ["وَرَبِّ الكَعْبَةِ ___ سَأَحُلُّ هَذِهِ المُشْكِلَةَ فِي أَقْرَبِ وَقْتٍ مُمْكِنٍ.", "إِنِّي", "أَنِّي", "أَنْ", "Kâbe’nin Rabbine yemin olsun ki bu sorunu en kısa zamanda çözeceğim.", "Yeminden sonra: kesre."],
      ["أَخْبَرَنِي صَدِيقِي ___ تَزَوَّجَ قَبْلَ ثَلَاثَةِ أَشْهُرٍ.", "أَنَّهُ", "إِنَّهُ", "أَنْ", "Arkadaşım üç ay önce evlendiğini haber verdi.", "أَخْبَرَ kavil değildir: fetha."],
      ["أَلَا ___ الآنَ فِي وَرْطَةٍ عَظِيمَةٍ وَلَنْ يَتَمَكَّنُوا مِنَ الخُرُوجِ مِنْهَا.", "إِنَّهُمْ", "أَنَّهُمْ", "أَنْ", "Bilin ki onlar şimdi büyük bir açmazdalar ve çıkamayacaklar.", "Elâ’dan sonra: kesre."],
      ["___ هَذِهِ السَّيَّارَةَ قَدْ تَعَرَّضَتْ لِحَادِثٍ خَطِيرٍ فِي السَّنَةِ المَاضِيَةِ.", "إِنَّ", "أَنَّ", "أَنْ", "Bu araba geçen yıl ağır bir kaza geçirdi.", "Söz başı: kesre."],
      ["أَظُنُّ ___ عَلِيًّا ذَهَبَ إِلَى بَيْتِهِ مُبَكِّرًا اليَوْمَ.", "أَنَّ", "إِنَّ", "أَنْ", "Sanırım Ali bugün evine erken gitti.", "Mef’ûl yerinde: fetha."],
      ["مِنَ المَعْلُومِ ___ الدِّرَاسَاتِ العُلْيَا أَصْبَحَتْ ذَاتَ أَهَمِّيَّةٍ كَبِيرَةٍ.", "أَنَّ", "إِنَّ", "أَنْ", "Lisansüstü çalışmaların büyük önem kazandığı bilinmektedir.", "Muahhar mübtedâ yerinde: fetha."],
      ["مُوسَى شَابٌّ مُخْلِصٌ، غَيْرَ ___ مُتَسَاهِلٌ فِي عَمَلِهِ.", "أَنَّهُ", "إِنَّهُ", "أَنْ", "Mûsâ ihlaslı bir genç, ne var ki işinde gevşek.", "غَيْرَ muzâftır: fetha."]
    ])},
    { type: "classify", extra: true, opts: KE, ar: "إِنَّ أَمْ أَنَّ؟", tr: "Koyu “انّ” kesreli mi, fethalı mı?", items: CL([
      [HL("انَّ اللهَ عَلِيمٌ حَكِيمٌ.", "انَّ"), "k", "Söz başı."],
      [HL("قَالَ الرَّجُلُ: انَّ وَلَدِي مَرِيضٌ.", "انَّ"), "k", "Kavilden sonra."],
      [HL("﴿وَالعَصْرِ انَّ الإِنْسَانَ لَفِي خُسْرٍ﴾", "انَّ"), "k", "Yeminden sonra."],
      [HL("﴿أَلَا انَّهُمْ هُمُ المُفْسِدُونَ﴾", "انَّ"), "k", "Elâ’dan sonra."],
      [HL("يُرِيدُ أَنْ يَعِيشَ حَيْثُ انَّ البِيئَةَ نَظِيفَةٌ.", "انَّ"), "k", "Hays’ten sonra."],
      [HL("تَرَكْتُ الأَوْلَادَ وَانَّهُمْ فِي نَوْمٍ عَمِيقٍ.", "انَّ"), "k", "Hâl cümlesi."],
      [HL("لَا تَكُنْ مَعَ الَّذِي انَّ ظَاهِرَهُ مُخْتَلِفٌ عَنْ بَاطِنِهِ.", "انَّ"), "k", "Sıla cümlesi."],
      [HL("يَقُولُ صَدِيقِي انَّهُ فِي يَأْسٍ.", "انَّ"), "k", "Kavilden sonra."],
      [HL("أَعْتَقِدُ انَّ الصِّحَّةَ مُهِمَّةٌ.", "انَّ"), "f", "Mef’ûl yerinde."],
      [HL("سَمِعْتُ انَّ عَدْنَانَ مُصَابٌ.", "انَّ"), "f", "Mef’ûl yerinde."],
      [HL("أَظُنُّ انَّ عَلِيًّا ذَهَبَ.", "انَّ"), "f", "Mef’ûl yerinde."],
      [HL("مِنَ المَعْلُومِ انَّ العِلْمَ نَافِعٌ.", "انَّ"), "f", "Mübtedâ yerinde."],
      [HL("أَخْبَرَنِي صَدِيقِي انَّهُ تَزَوَّجَ.", "انَّ"), "f", "أَخْبَرَ: fetha."],
      [HL("تَشْتَهِرُ إِسْطَنْبُولُ بِانَّهَا قَدِيمَةٌ.", "انَّ"), "f", "Harf-i cerden sonra."],
      [HL("يَسُرُّنِي انَّكَ نَاجِحٌ.", "انَّ"), "f", "Fâil yerinde."],
      [HL("عَلِمْتُ انَّ الامْتِحَانَ سَهْلٌ.", "انَّ"), "f", "Mef’ûl yerinde."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · KESRENİN YEDİ YERİ
{
  id: "u2", no: 2, ar: "مَوَاضِعُ كَسْرِ هَمْزَةِ «إِنَّ»", tr: "Kesrenin Yedi Yeri", short: "Yedi yer", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["İnne’nin kesreli okunduğu yedi yeri bilmek", "Her cümlede kesrenin sebebini söylemek", "Boşluğa kesreli inne’yi koyup sebebini göstermek"],
  examples: [
    { s: "يُرِيدُ الإِنْسَانُ أَنْ يَعِيشَ:x / حَيْثُ:cerr / إِنَّ:mz / البِيئَةَ:nasb / نَظِيفَةٌ.:x", tr: "İnsan, çevrenin temiz olduğu yerde yaşamak ister. (hays)", pair: "﴿وَالعَصْرِ:cerr / إِنَّ:mz / الإِنْسَانَ:nasb / لَفِي خُسْرٍ﴾:x", pairTr: "Asra yemin olsun ki insan ziyandadır. (yemin)" },
    { s: "تَرَكْتُ الأَوْلَادَ:x / وَ:cerr / إِنَّهُمْ:mz / فِي نَوْمٍ عَمِيقٍ.:x", tr: "Çocukları derin uykudayken bıraktım. (hâl)", pair: "لَا تَكُنْ مَعَ الشَّخْصِ:x / الَّذِي:cerr / إِنَّ:mz / ظَاهِرَهُ:nasb / مُخْتَلِفٌ عَنْ بَاطِنِهِ.:x", pairTr: "Dışı içinden farklı olan kişiyle beraber olma. (sıla)" },
    { s: "﴿أَلَا:cerr / إِنَّهُمْ:mz / هُمُ المُفْسِدُونَ﴾:x", tr: "İyi bilin ki onlar bozguncuların ta kendileridir. (Bakara 12 · elâ)" }
  ],
  rules: [
    { tr: "Hemze şu yedi yerde <b>kesreli</b> okunur:", ex: ["١ فِي أَوَّلِ الكَلَامِ: إِنَّ اللهَ عَلِيمٌ حَكِيمٌ", "٢ بَعْدَ القَوْلِ: قَالَ الرَّجُلُ: إِنَّ وَلَدِي…", "٣ بَعْدَ «حَيْثُ»: حَيْثُ إِنَّ البِيئَةَ نَظِيفَةٌ", "٤ بَعْدَ اليَمِينِ: وَالعَصْرِ إِنَّ الإِنْسَانَ لَفِي خُسْرٍ", "٥ فِي أَوَّلِ جُمْلَةِ الحَالِ: وَإِنَّهُمْ فِي نَوْمٍ عَمِيقٍ", "٦ فِي أَوَّلِ جُمْلَةِ الصِّلَةِ: الَّذِي إِنَّ ظَاهِرَهُ…", "٧ بَعْدَ «أَلَا»: أَلَا إِنَّهُمْ هُمُ المُفْسِدُونَ"] },
    { tr: "Ortak nokta: bu yerlerde <span class=\"ar\">إِنَّ</span>’den sonraki cümle bağımsız bir cümledir; masdara çevrilip bir fiilin ya da harf-i cerin parçası yapılamaz." },
    { tr: "Yeminden sonra haber çoğu zaman <b>lâm-ı müzahleka</b> alır: <span class=\"ar\">وَاللهِ إِنَّ العَاقِبَةَ لَلْمُتَّقِينَ · إِنَّكَ لَمِنَ المُرْسَلِينَ</span>." },
    { tr: "Hâl cümlesi <span class=\"ar\">وَ</span> (vâv-ı hâliyye) ile başlar: <span class=\"ar\">فَرَّ الأَعْدَاءُ وَإِنَّهُمْ قَلِقُونَ</span> = “korku içinde kaçtılar”." }
  ],
  kaide: ["١ ـ تُكْسَرُ الهَمْزَةُ (إِنَّ) فِي المَوَاضِعِ التَّالِيَةِ: أ ـ فِي أَوَّلِ الكَلَامِ، مِثْلُ: إِنَّ اللهَ عَلِيمٌ حَكِيمٌ. ب ـ بَعْدَ القَوْلِ (قَالَ، يَقُولُ…)، مِثْلُ: قَالَ الرَّجُلُ: إِنَّ وَلَدِي قَدْ أُصِيبَ بِالسُّكَّرِيِّ. جـ ـ بَعْدَ «حَيْثُ»، مِثْلُ: يُرِيدُ الإِنْسَانُ أَنْ يَعِيشَ حَيْثُ إِنَّ البِيئَةَ نَظِيفَةٌ. د ـ بَعْدَ اليَمِينِ، مِثْلُ: ﴿وَالعَصْرِ إِنَّ الإِنْسَانَ لَفِي خُسْرٍ﴾. هـ ـ فِي أَوَّلِ جُمْلَةِ الحَالِ، مِثْلُ: تَرَكْتُ الأَوْلَادَ وَإِنَّهُمْ فِي نَوْمٍ عَمِيقٍ. و ـ بَعْدَ الاسْمِ المَوْصُولِ فِي أَوَّلِ جُمْلَةِ الصِّلَةِ، مِثْلُ: لَا تَكُنْ مَعَ الشَّخْصِ الَّذِي إِنَّ ظَاهِرَهُ مُخْتَلِفٌ عَنْ بَاطِنِهِ. ز ـ بَعْدَ «أَلَا» الاسْتِفْتَاحِيَّةِ، مِثْلُ: ﴿أَلَا إِنَّهُمْ هُمُ المُفْسِدُونَ﴾."],
  ex: [
    { type: "classify", num: "٣", opts: KS, ar: "اشْرَحْ سَبَبَ كَسْرِ الهَمْزَةِ فِي الجُمَلِ التَّالِيَةِ", tr: "Koyu إِنَّ neden kesreli?", exHtml: "<span class=\"ar\">﴿يس وَالقُرْآنِ الحَكِيمِ إِنَّكَ لَمِنَ المُرْسَلِينَ﴾ ← وَقَعَتْ بَعْدَ اليَمِينِ</span>", items: CL([
      [HL("﴿إِنَّ الأَبْرَارَ لَفِي نَعِيمٍ﴾", "إِنَّ"), "a", "Söz başı. (İnfitâr 13)"],
      [HL("اعْتَمِدْ عَلَى الكُتَّابِ الَّذِينَ إِنَّهُمْ مُحَايِدُونَ فِي آرَائِهِمْ.", "إِنَّ"), "s", "الَّذِينَ’den sonra: sıla."],
      [HL("أَلَا إِنَّ الدُّنْيَا فَانِيَةٌ وَإِنَّ الآخِرَةَ لَهِيَ دَارُ القَرَارِ.", "إِنَّ"), "e", "Elâ’dan sonra (ikincisi ona atfedilmiş)."],
      [HL("تَكَلَّمْ حَيْثُ إِنَّ الكَلَامَ مُفِيدٌ.", "إِنَّ"), "h", "Hays’ten sonra."],
      [HL("وَاللهِ إِنَّ العِلْمَ أَسَاسُ العَمَلِ.", "إِنَّ"), "y", "Yeminden sonra."],
      [HL("قَضَيْتُ سَنَوَاتٍ طَوِيلَةً فِي الخَارِجِ وَإِنِّي أَحِنُّ إِلَى وَطَنِي.", "إِنِّي"), "l", "Hâl cümlesi: “vatanımı özleyerek”."],
      [HL("إِنَّ الجَوَّ سَيَكُونُ مُثْلِجًا اليَوْمَ حَسَبَ التَّوَقُّعَاتِ الجَوِّيَّةِ.", "إِنَّ"), "a", "Söz başı."],
      [HL("لِأَبِي العَلَاءِ المَعَرِّيِّ مِنَ الأَشْعَارِ مَا إِنَّ فَهْمَهَا صَعْبٌ.", "إِنَّ"), "s", "Mevsûl مَا’dan sonra: sıla."]
    ]) },
    { type: "combo", num: "٤", ar: "امْلَإِ الفَرَاغَ بِـ«ان» وَاضْبِطْ هَمْزَتَهَا وَبَيِّنْ سَبَبَ الضَّبْطِ", tr: "Doğru biçimi ve kesrenin sebebini seç.", exHtml: "<span class=\"ar\">أَلَا إِنَّ اللهَ لَا يُحِبُّ مَنْ يَتَكَبَّرُ عَلَى العِبَادِ ← وَقَعَتْ بَعْدَ «أَلَا»</span>", items: [
      ["___ اللهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا.", ["إِنَّ", "أَنَّ", "أَنْ"], "a", "Şüphesiz Allah bütün günahları bağışlar.", "Söz başı."],
      ["قَالَ أَبِي: ___ الوَقْتَ قَدْ حَانَ لِلسَّفَرِ.", ["إِنَّ", "أَنَّ", "أَنْ"], "q", "Babam: “Yolculuk vakti geldi” dedi.", "Kavilden sonra."],
      ["وَاللهِ ___ العَاقِبَةَ لِلْمُؤْمِنِينَ.", ["إِنَّ", "أَنَّ", "أَنْ"], "y", "Vallahi akıbet müminlerindir.", "Yeminden sonra."],
      ["اذْهَبْ حَيْثُ ___ الهَوَاءَ نَقِيٌّ وَالمَاءَ صَافٍ.", ["إِنَّ", "أَنَّ", "أَنْ"], "h", "Havanın temiz, suyun berrak olduğu yere git.", "Hays’ten sonra."],
      ["فَرَّ الأَعْدَاءُ مِنْ مَيْدَانِ القِتَالِ وَ___ قَلِقُونَ.", ["إِنَّهُمْ", "أَنَّهُمْ", "أَنْ"], "l", "Düşmanlar savaş meydanından korku içinde kaçtı.", "Hâl cümlesi."],
      ["كُنْ مَعَ مَنْ ___ صَادِقٌ فِي كَلَامِهِ وَلَا يُخْلِفُ وَعْدَهُ.", ["إِنَّهُ", "أَنَّهُ", "أَنْ"], "s", "Sözünde doğru olan ve vadinden dönmeyenle beraber ol.", "Mevsûl مَنْ’den sonra: sıla."],
      ["أَلَا ___ الحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ.", ["إِنَّ", "أَنَّ", "أَنْ"], "e", "Bilin ki iyilikler kötülükleri giderir.", "Elâ’dan sonra."],
      ["أَخْبَرَنِي بِوَفَاةِ أَبِيهِ وَ___ فِي حُزْنٍ شَدِيدٍ.", ["إِنَّهُ", "أَنَّهُ", "أَنْ"], "l", "Derin bir hüzün içinde bana babasının vefatını haber verdi.", "Hâl cümlesi (أَخْبَرَ’nin mef’ûlü değil)."]
    ].map(ZS) },
    { type: "classify", extra: true, opts: KS, ar: "مَا سَبَبُ كَسْرِ الهَمْزَةِ؟", tr: "Kesrenin sebebini seç.", items: CL([
      [HL("إِنَّ اللهَ عَلِيمٌ حَكِيمٌ.", "إِنَّ"), "a", "Söz başı."],
      [HL("﴿إِنَّ الأَبْرَارَ لَفِي نَعِيمٍ﴾", "إِنَّ"), "a", "Söz başı."],
      [HL("قَالَ الرَّجُلُ: إِنَّ وَلَدِي قَدْ أُصِيبَ بِالسُّكَّرِيِّ.", "إِنَّ"), "q", "Kavil."],
      [HL("قَالَتْ لِي أُمِّي: إِنَّ أَبَاكَ يَحْتَاجُ إِلَيْكَ.", "إِنَّ"), "q", "Kavil."],
      [HL("يُرِيدُ أَنْ يَعِيشَ حَيْثُ إِنَّ البِيئَةَ نَظِيفَةٌ.", "إِنَّ"), "h", "Hays."],
      [HL("اذْهَبْ حَيْثُ إِنَّ الهَوَاءَ نَقِيٌّ.", "إِنَّ"), "h", "Hays."],
      [HL("﴿وَالعَصْرِ إِنَّ الإِنْسَانَ لَفِي خُسْرٍ﴾", "إِنَّ"), "y", "Yemin."],
      [HL("﴿يس وَالقُرْآنِ الحَكِيمِ إِنَّكَ لَمِنَ المُرْسَلِينَ﴾", "إِنَّ"), "y", "Yemin."],
      [HL("تَرَكْتُ الأَوْلَادَ وَإِنَّهُمْ فِي نَوْمٍ عَمِيقٍ.", "إِنَّ"), "l", "Hâl."],
      [HL("فَرَّ الأَعْدَاءُ وَإِنَّهُمْ قَلِقُونَ.", "إِنَّ"), "l", "Hâl."],
      [HL("لَا تَكُنْ مَعَ الشَّخْصِ الَّذِي إِنَّ ظَاهِرَهُ مُخْتَلِفٌ.", "إِنَّ"), "s", "Sıla."],
      [HL("كُنْ مَعَ مَنْ إِنَّهُ صَادِقٌ.", "إِنَّ"), "s", "Sıla."],
      [HL("﴿أَلَا إِنَّهُمْ هُمُ المُفْسِدُونَ﴾", "إِنَّ"), "e", "Elâ."],
      [HL("أَلَا إِنَّ الحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ.", "إِنَّ"), "e", "Elâ."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · CÜMLE TAMAMLAMA VE METİN
{
  id: "u3", no: 3, ar: "إِكْمَالُ الجُمَلِ وَضَبْطُ «ان» فِي النَّصِّ", tr: "Cümle Tamamlama ve Metinde Zabt", short: "Metin", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Verilen başlangıcı inne ya da enne ile doğru tamamlamak", "İnne / enne’nin isminin mansûb, haberinin merfû olduğunu korumak", "“İstanbul” metnindeki her “ان”ı zabtedip sebebini söylemek"],
  examples: [
    { s: "قَالَ المُدِيرُ::cerr / إِنَّ:mz / الاجْتِمَاعَ:nasb / سَيَبْدَأُ بَعْدَ قَلِيلٍ.:x", tr: "Müdür: “Toplantı birazdan başlayacak” dedi.", pair: "اعْلَمْ:cerr / أَنَّ:mz / الصَّلَاةَ:nasb / عِمَادُ الدِّينِ.:x", pairTr: "Bil ki namaz dinin direğidir." }
  ],
  rules: [
    { tr: "Cümleyi tamamlarken iki şeye bak: <b>hemze</b> (başlangıç kesre mi istiyor, fetha mı?) ve <b>i’rab</b> (isim mansûb, haber merfû)." },
    { tr: "Başlangıçlar:", ex: ["قَالَ · وَاللهِ · أَلَا ← إِنَّ", "أَعْتَقِدُ · اعْلَمْ · سَمِعْتُ · رَغْمَ ← أَنَّ", "مَنْ قَالَ لَكَ ← إِنَّ (kavil)"] },
    { tr: "Metinde: <span class=\"ar\">بِأَنَّهَا</span> (harf-i cer), <span class=\"ar\">أَدْهَشَكَ أَنَّ…</span> (fâil), <span class=\"ar\">رَأَيْتَ أَنَّ… · لَعَلِمْتَ أَنَّ…</span> (mef’ûl) fethalıdır." }
  ],
  kaide: ["أَكْمِلْ كَمَا فِي المِثَالِ مَعَ ضَبْطِ الهَمْزَةِ بِالشَّكْلِ: إِنَّ اللهَ سَمِيعٌ عَلِيمٌ. اضْبِطْ «ان» فِي القِطْعَةِ التَّالِيَةِ بِـ«إِنَّ» المَكْسُورَةِ الهَمْزَةِ وَ«أَنَّ» المَفْتُوحَةِ الهَمْزَةِ مَعَ ذِكْرِ أَسْبَابِ كَسْرِ هَمْزَتِهَا."],
  ex: [
    { type: "pick", num: "٥", ar: "أَكْمِلْ كَمَا فِي المِثَالِ التَّالِي مَعَ ضَبْطِ الهَمْزَةِ بِالشَّكْلِ", tr: "Cümlenin doğru devamını seç.", exHtml: "<span class=\"ar\">إِنَّ اللهَ سَمِيعٌ عَلِيمٌ.</span>", items: PL([
      ["قَالَ المُدِيرُ: …", "إِنَّ الاجْتِمَاعَ سَيَبْدَأُ بَعْدَ قَلِيلٍ.", "أَنَّ الاجْتِمَاعَ سَيَبْدَأُ بَعْدَ قَلِيلٍ.", "إِنَّ الاجْتِمَاعُ سَيَبْدَأُ بَعْدَ قَلِيلٍ.", "Müdür: “Toplantı birazdan başlayacak” dedi.", "Kavil: kesre; isim mansûb."],
      ["أَعْتَقِدُ …", "أَنَّ النَّجَاحَ يَحْتَاجُ إِلَى صَبْرٍ.", "إِنَّ النَّجَاحَ يَحْتَاجُ إِلَى صَبْرٍ.", "أَنَّ النَّجَاحُ يَحْتَاجُ إِلَى صَبْرٍ.", "Başarının sabır gerektirdiğine inanıyorum.", "Mef’ûl yerinde: fetha."],
      ["اعْلَمْ …", "أَنَّ الصَّلَاةَ عِمَادُ الدِّينِ.", "إِنَّ الصَّلَاةَ عِمَادُ الدِّينِ.", "أَنَّ الصَّلَاةُ عِمَادُ الدِّينِ.", "Bil ki namaz dinin direğidir.", "Mef’ûl yerinde: fetha."],
      ["وَاللهِ …", "إِنَّ الصِّدْقَ لَطَرِيقُ النَّجَاةِ.", "أَنَّ الصِّدْقَ لَطَرِيقُ النَّجَاةِ.", "إِنَّ الصِّدْقُ لَطَرِيقُ النَّجَاةِ.", "Vallahi doğruluk kurtuluş yoludur.", "Yemin: kesre."],
      ["أَلَا …", "إِنَّ نَصْرَ اللهِ قَرِيبٌ.", "أَنَّ نَصْرَ اللهِ قَرِيبٌ.", "إِنَّ نَصْرُ اللهِ قَرِيبٌ.", "Bilin ki Allah’ın yardımı yakındır.", "Elâ: kesre."],
      ["خَرَجَ أَحْمَدُ مِنَ البَيْتِ رَغْمَ …", "أَنَّ المَطَرَ شَدِيدٌ.", "إِنَّ المَطَرَ شَدِيدٌ.", "أَنَّ المَطَرُ شَدِيدٌ.", "Yağmur şiddetli olmasına rağmen Ahmed evden çıktı.", "رَغْمَ muzâf: fetha."],
      ["سَمِعْتُ …", "أَنَّ الامْتِحَانَ سَهْلٌ.", "إِنَّ الامْتِحَانَ سَهْلٌ.", "أَنَّ الامْتِحَانُ سَهْلٌ.", "Sınavın kolay olduğunu duydum.", "Mef’ûl yerinde: fetha."],
      ["مَنْ قَالَ لَكَ …", "إِنَّ الامْتِحَانَ صَعْبٌ؟", "أَنَّ الامْتِحَانَ صَعْبٌ؟", "إِنَّ الامْتِحَانُ صَعْبٌ؟", "Sana sınavın zor olduğunu kim söyledi?", "Kavil: kesre."]
    ])},
    { type: "reading", num: "٩", ar: "اضْبِطْ «ان» فِي القِطْعَةِ التَّالِيَةِ بِـ«إِنَّ» المَكْسُورَةِ الهَمْزَةِ وَ«أَنَّ» المَفْتُوحَةِ الهَمْزَةِ مَعَ ذِكْرِ أَسْبَابِ كَسْرِ هَمْزَتِهَا", tr: "Metni oku, soruları cevapla; sonra her “انّ”ın kesreli mi fethalı mı olduğunu ve sebebini seç.", title: "إِسْطَنْبُولُ",
      text: METIN1,
      textTr: "Tarihçiler, İstanbul’un tarihi milattan önce binlerce yıla uzanan eski bir şehir olduğunu söyler. Aralarında camiler, kiliseler ve sarayların bulunduğu çok sayıda tarihî eseriyle meşhurdur. Osmanlı halifeleri orada oturduğu için hilafetin merkeziydi.<br>İstanbul Türkiye’nin en kalabalık şehridir. Onu ziyaret edersen caddelerinin kalabalığı seni şaşırtır; aynı zamanda belediye hizmetlerinin üst seviyede olduğunu görürsün. İnsanın yaptığı en güzel eserlerden olan bazı eski eserlerini görseydin, Osmanlı Devleti’nin şanının ne kadar büyük olduğunu anlardın.",
      qa: [
        { q: "مَاذَا يَقُولُ المُؤَرِّخُونَ عَنْ إِسْطَنْبُولَ؟", a: "يَقُولُونَ إِنَّهَا مَدِينَةٌ قَدِيمَةٌ يَمْتَدُّ تَارِيخُهَا إِلَى آلَافِ السِّنِينَ قَبْلَ المِيلَادِ.", tr: "Tarihçiler İstanbul hakkında ne der? Tarihi milattan önce binlerce yıla uzanan eski bir şehir olduğunu." },
        { q: "بِمَ تَشْتَهِرُ إِسْطَنْبُولُ؟", a: "تَشْتَهِرُ بِأَنَّهَا كَثِيرَةُ الآثَارِ التَّارِيخِيَّةِ: مَسَاجِدَ وَكَنَائِسَ وَقُصُورٍ.", tr: "İstanbul neyle meşhurdur? Camiler, kiliseler ve saraylar gibi çok sayıda tarihî eserle." },
        { q: "لِمَاذَا كَانَتْ إِسْطَنْبُولُ مَرْكَزَ الخِلَافَةِ؟", a: "لِأَنَّ الخُلَفَاءَ العُثْمَانِيِّينَ كَانُوا يُقِيمُونَ فِيهَا.", tr: "İstanbul niçin hilafetin merkeziydi? Osmanlı halifeleri orada oturduğu için." },
        { q: "مَاذَا يُدْهِشُ الزَّائِرَ فِي إِسْطَنْبُولَ؟", a: "يُدْهِشُهُ أَنَّ شَوَارِعَهَا مُزْدَحِمَةٌ، وَيَرَى أَنَّ الخِدْمَاتِ البَلَدِيَّةَ فِي المُسْتَوَى العَالِي.", tr: "İstanbul’da ziyaretçiyi ne şaşırtır? Caddelerin kalabalığı; ayrıca belediye hizmetlerinin üst seviyede olduğunu görür." }
      ],
      cls: { opts: KSF, ar: "اضْبِطِ الهَمْزَةَ وَاذْكُرْ سَبَبَ الكَسْرِ", tr: "Koyu “انّ” kesreliyse sebebini, fethalıysa “Enne”yi seç.", items: [
        { s: HL("يَقُولُ المُؤَرِّخُونَ انَّ إِسْطَنْبُولَ مَدِينَةٌ قَدِيمَةٌ", "انَّ"), a: "q", why: "يَقُولُ’dan sonra: إِنَّ." },
        { s: HL("تَشْتَهِرُ بِانَّهَا كَثِيرَةُ الآثَارِ", "انَّ"), a: "f", why: "Harf-i cerden sonra: بِأَنَّهَا." },
        { s: HL("كَانَتْ مَرْكَزَ الخِلَافَةِ حَيْثُ انَّ الخُلَفَاءَ", "انَّ"), a: "h", why: "حَيْثُ’ten sonra: إِنَّ." },
        { s: HL("انَّ إِسْطَنْبُولَ أَكْثَرُ المُدُنِ فِي تُرْكِيَا سُكَّانًا", "انَّ"), a: "a", why: "Söz başı: إِنَّ." },
        { s: HL("أَدْهَشَكَ انَّ شَوَارِعَهَا مُزْدَحِمَةٌ", "انَّ"), a: "f", why: "أَدْهَشَ’in fâili yerinde: أَنَّ." },
        { s: HL("وَرَأَيْتَ فِي الوَقْتِ نَفْسِهِ انَّ الخِدْمَاتِ البَلَدِيَّةَ", "انَّ"), a: "f", why: "رَأَيْتَ’nin mef’ûlü yerinde: أَنَّ." },
        { s: HL("آثَارِهَا القَدِيمَةِ الَّتِي انَّهَا مِنْ أَرْوَعِ مَا صَنَعَهُ الإِنْسَانُ", "انَّ"), a: "s", why: "الَّتِي’den sonra: إِنَّ." },
        { s: HL("لَعَلِمْتَ انَّ شَأْنَ الدَّوْلَةِ العُثْمَانِيَّةِ كَانَ عَظِيمًا", "انَّ"), a: "f", why: "عَلِمْتَ’nin mef’ûlü yerinde: أَنَّ." }
      ]},
      cls2: { opts: EN, ar: "لِمَاذَا فُتِحَتِ الهَمْزَةُ؟", tr: "Bu enne’ler neden fethalı?", items: [
        { s: HL("تَشْتَهِرُ بِأَنَّهَا كَثِيرَةُ الآثَارِ", "أَنَّ"), a: "c", why: "بِـ harf-i ceri." },
        { s: HL("أَدْهَشَكَ أَنَّ شَوَارِعَهَا مُزْدَحِمَةٌ", "أَنَّ"), a: "t", why: "Fâil: أَدْهَشَكَ ازْدِحَامُ شَوَارِعِهَا." },
        { s: HL("وَرَأَيْتَ أَنَّ الخِدْمَاتِ البَلَدِيَّةَ فِي المُسْتَوَى العَالِي", "أَنَّ"), a: "m", why: "Mef’ûl." },
        { s: HL("لَعَلِمْتَ أَنَّ شَأْنَ الدَّوْلَةِ كَانَ عَظِيمًا", "أَنَّ"), a: "m", why: "Mef’ûl." },
        { s: HL("مِنَ المَعْلُومِ أَنَّ الدِّرَاسَاتِ العُلْيَا مُهِمَّةٌ", "أَنَّ"), a: "t", why: "Muahhar mübtedâ." },
        { s: HL("تُشِيرُ التَّطَوُّرَاتُ إِلَى أَنَّ الوَضْعَ سَيَتَحَسَّنُ", "أَنَّ"), a: "c", why: "إِلَى harf-i ceri." },
        { s: HL("أَظُنُّ أَنَّ عَلِيًّا ذَهَبَ", "أَنَّ"), a: "m", why: "Mef’ûl." },
        { s: HL("خَرَجَ رَغْمَ أَنَّ المَطَرَ شَدِيدٌ", "أَنَّ"), a: "c", why: "رَغْمَ’nin muzâfun ileyhi." }
      ]}
    }
  ]
},
// ---------------------------------------------------------------- 4 · MÂ-İ KÂFFE
{
  id: "u4", no: 4, ar: "«مَا» الكَافَّةُ", tr: "Mâ-i Kâffe", short: "Mâ-i kâffe", col: "mi", legend: ["mz", "nasb"],
  goals: ["Mâ-i kâffenin inne ve kardeşlerini amelden alıkoyduğunu bilmek", "Mâ’dan sonra ismin merfû (mübtedâ) olduğunu uygulamak", "Leytemâ’da iki yolun da caiz olduğunu bilmek", "Mâ’lı harfin fiil cümlesine de girebildiğini görmek"],
  examples: [
    { s: "إِنَّ:mz / المُؤْمِنِينَ:nasb / إِخْوَةٌ.:x", tr: "Şüphesiz müminler kardeştir. (âmil: isim mansûb)", pair: "﴿إِنَّمَا:mz / المُؤْمِنُونَ:nasb / إِخْوَةٌ﴾:x", pairTr: "Müminler ancak kardeştir. (Hucurât 10 · gayr-i âmil: isim merfû)" },
    { s: "لَيْتَمَا:mz / السَّلَامَ:nasb / يَعُمُّ العَالَمَ.:x", tr: "Keşke barış dünyayı kaplasa. (leytemâ amel etti)", pair: "لَيْتَمَا:mz / السَّلَامُ:nasb / يَعُمُّ العَالَمَ.:x", pairTr: "Aynı anlam. (amel etmedi)" },
    { s: "﴿إِنَّمَا:mz / يَخْشَى:x / اللهَ مِنْ عِبَادِهِ:x / العُلَمَاءُ﴾:nasb", tr: "Allah’tan kulları içinde ancak âlimler korkar. (Fâtır 28 · fiil cümlesi)" }
  ],
  rules: [
    { tr: "<span class=\"ar\">مَا</span> <b>kâffe</b> (alıkoyan), <span class=\"ar\">إِنَّ · أَنَّ · كَأَنَّ · لَكِنَّ · لَيْتَ · لَعَلَّ</span>’ye bitişir ve onları <b>amelden alıkoyar</b>: ardındaki isim artık mansûb değil, <b>merfû mübtedâ</b>dır.", ex: ["إِنَّ المُؤْمِنِينَ إِخْوَةٌ ← إِنَّمَا المُؤْمِنُونَ إِخْوَةٌ", "كَأَنَّ حَلِيمَةَ… ← كَأَنَّمَا حَلِيمَةُ…"] },
    { tr: "İstisna <b>leyte</b>: <span class=\"ar\">لَيْتَمَا</span>’dan sonra isim hem mansûb (amel eder) hem merfû (amel etmez) okunabilir: <span class=\"ar\">لَيْتَمَا السَّلَامَ / السَّلَامُ يَعُمُّ العَالَمَ</span>." },
    { tr: "Mâ’lı harf <b>fiil cümlesine</b> de girer: <span class=\"ar\">﴿إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ العُلَمَاءُ﴾ · لَيْتَمَا يَنْزِلُ المَطَرُ</span>." },
    { tr: "<span class=\"ar\">إِنَّمَا</span> çoğu zaman <b>hasr</b> (ancak, yalnızca) anlamı verir: <span class=\"ar\">إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ</span> = “Ameller ancak niyetlere göredir.”" }
  ],
  kaide: ["٢ ـ إِذَا اتَّصَلَتْ «مَا» الكَافَّةُ بِـ«إِنَّ» وَأَخَوَاتِهَا: أ ـ كَفَّتْهَا (مَنَعَتْهَا) عَنِ العَمَلِ، بِمَعْنَى أَنَّ «إِنَّ» وَأَخَوَاتِهَا لَا تَنْصِبُ الاسْمَ حِينَئِذٍ، مِثْلُ: إِنَّ المُؤْمِنِينَ إِخْوَةٌ ← ﴿إِنَّمَا المُؤْمِنُونَ إِخْوَةٌ﴾. إِلَّا أَنَّ «لَيْتَ» إِذَا اتَّصَلَتْ بِهَا «مَا» الكَافَّةُ يَجُوزُ عَمَلُهَا، مِثْلُ: لَيْتَمَا السَّلَامَ يَعُمُّ العَالَمَ، وَعَدَمُ عَمَلِهَا، مِثْلُ: لَيْتَمَا السَّلَامُ يَعُمُّ العَالَمَ. ب ـ وَتَدْخُلُ أَيْضًا عَلَى الجُمْلَةِ الفِعْلِيَّةِ، مِثْلُ: ﴿إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ العُلَمَاءُ﴾."],
  ex: [
    { type: "pick", fill: true, num: "٦", ar: "اضْبِطْ بِالشَّكْلِ الاسْمَ بَعْدَ «إِنَّ» وَأَخَوَاتِهَا فِي الجُمَلِ التَّالِيَةِ", tr: "Boşluktaki ismin doğru harekesini seç. (Mâ var mı? Leyte mi?)", exHtml: "<span class=\"ar\">إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ.</span>", items: PL([
      ["كَأَنَّمَا ___ بَدْرٌ مُضِيءٌ.", "وَجْهُهُ", "وَجْهَهُ", "وَجْهِهِ", "Yüzü sanki parlayan bir dolunay.", "Mâ-i kâffe: isim merfû."],
      ["لَيْتَمَا ___ فِي سَلَامٍ وَأَمْنٍ.", "العَالَمُ أَوِ العَالَمَ", "العَالَمَ فَقَطْ", "العَالَمِ", "Keşke dünya barış ve güven içinde olsa.", "Leytemâ: iki yol da caiz."],
      ["لَعَلَّ ___ سَتُعْلَنُ غَدًا صَبَاحًا.", "النَّتِيجَةَ", "النَّتِيجَةُ", "النَّتِيجَةِ", "Belki sonuç yarın sabah açıklanır.", "Mâ yok: لَعَلَّ amel eder, isim mansûb."],
      ["لَيْتَمَا ___ قَرِيبَةٌ مِنْ بَيْتِنَا.", "المَدْرَسَةُ أَوِ المَدْرَسَةَ", "المَدْرَسَةَ فَقَطْ", "المَدْرَسَةِ", "Keşke okul evimize yakın olsa.", "Leytemâ: iki yol da caiz."],
      ["﴿إِنَّمَا ___ الدُّنْيَا لَعِبٌ وَلَهْوٌ﴾", "الحَيَاةُ", "الحَيَاةَ", "الحَيَاةِ", "Dünya hayatı ancak bir oyun ve eğlencedir. (Muhammed 36)", "Mâ-i kâffe: merfû."],
      ["لَكِنَّ ___ لَا يُمْكِنُ أَنْ تَفْعَلَ هَذَا.", "خَدِيجَةَ", "خَدِيجَةُ", "خَدِيجَةِ", "Ama Hatice bunu yapamaz.", "Mâ yok: isim mansûb."],
      ["كَأَنَّمَا ___ سَيَنْقَطِعُ بَعْدَ قَلِيلٍ.", "الثَّلْجُ", "الثَّلْجَ", "الثَّلْجِ", "Sanki kar birazdan dinecek.", "Mâ-i kâffe: merfû."],
      ["لَعَلَّمَا ___ مُحَمَّدٍ مُسَافِرَةٌ إِلَى بَلَدٍ آخَرَ.", "أُسْرَةُ", "أُسْرَةَ", "أُسْرَةِ", "Belki Muhammed’in ailesi başka bir ülkeye yolculuk ediyordur.", "Mâ-i kâffe: merfû."]
    ])},
    { type: "pick", num: "٧", ar: "أَدْخِلْ «مَا» الكَافَّةَ عَلَى «إِنَّ» وَأَخَوَاتِهَا فِي الجُمَلِ الآتِيَةِ وَاضْبِطِ الاسْمَ بَعْدَهَا", tr: "Mâ-i kâffe eklenmiş doğru cümleyi seç.", exHtml: "<span class=\"ar\">كَأَنَّ حَلِيمَةَ وُلِدَتْ أَدِيبَةً ← كَأَنَّمَا حَلِيمَةُ وُلِدَتْ أَدِيبَةً</span>", items: PL([
      ["إِنَّ مُهِمَّةَ الرُّسُلِ إِنْذَارٌ لِلنَّاسِ.", "إِنَّمَا مُهِمَّةُ الرُّسُلِ إِنْذَارٌ لِلنَّاسِ.", "إِنَّمَا مُهِمَّةَ الرُّسُلِ إِنْذَارٌ لِلنَّاسِ.", "إِنَّمَا مُهِمَّةُ الرُّسُلِ إِنْذَارًا لِلنَّاسِ.", "Peygamberlerin görevi ancak insanları uyarmaktır.", "İsim merfû; haber de merfû kalır."],
      ["أَعْلَمُ أَنَّ عَلِيًّا رَجُلٌ كَرِيمٌ.", "أَعْلَمُ أَنَّمَا عَلِيٌّ رَجُلٌ كَرِيمٌ.", "أَعْلَمُ أَنَّمَا عَلِيًّا رَجُلٌ كَرِيمٌ.", "أَعْلَمُ إِنَّمَا عَلِيٌّ رَجُلٌ كَرِيمٌ.", "Ali’nin cömert bir adam olduğunu biliyorum.", "Hemze fethalı kalır; isim merfû."],
      ["لَعَلَّ المُدِيرَ فِي قَاعَةِ الاجْتِمَاعِ.", "لَعَلَّمَا المُدِيرُ فِي قَاعَةِ الاجْتِمَاعِ.", "لَعَلَّمَا المُدِيرَ فِي قَاعَةِ الاجْتِمَاعِ.", "لَعَلَّ مَا المُدِيرُ فِي قَاعَةِ الاجْتِمَاعِ.", "Müdür belki toplantı salonundadır.", "Mâ bitişik yazılır; isim merfû."],
      ["لَكِنَّ أُمَّهُ لَمْ تَتَّفِقْ مَعَهُ فِي هَذَا المَوْضُوعِ.", "لَكِنَّمَا أُمُّهُ لَمْ تَتَّفِقْ مَعَهُ فِي هَذَا المَوْضُوعِ.", "لَكِنَّمَا أُمَّهُ لَمْ تَتَّفِقْ مَعَهُ فِي هَذَا المَوْضُوعِ.", "لَكِنْ مَا أُمُّهُ لَمْ تَتَّفِقْ مَعَهُ فِي هَذَا المَوْضُوعِ.", "Ama annesi bu konuda onunla uzlaşmadı.", "İsim merfû."],
      ["لَيْتَ الشَّبَابَ يَعُودُ يَوْمًا.", "لَيْتَمَا الشَّبَابَ (أَوِ الشَّبَابُ) يَعُودُ يَوْمًا.", "لَيْتَمَا الشَّبَابِ يَعُودُ يَوْمًا.", "لَيْتَ مَا الشَّبَابُ يَعُودُ يَوْمًا.", "Keşke gençlik bir gün geri gelse.", "Leytemâ: iki yol da caiz."],
      ["كَأَنَّ جَعْفَرًا قُسُّ بْنُ سَاعِدَةَ فِي حَدِيثِهِ.", "كَأَنَّمَا جَعْفَرٌ قُسُّ بْنُ سَاعِدَةَ فِي حَدِيثِهِ.", "كَأَنَّمَا جَعْفَرًا قُسُّ بْنُ سَاعِدَةَ فِي حَدِيثِهِ.", "كَأَنَّمَا جَعْفَرٌ قُسَّ بْنَ سَاعِدَةَ فِي حَدِيثِهِ.", "Ca’fer konuşmasında sanki Kuss b. Sâide.", "İsim merfû (tenvinli)."],
      ["إِنَّ عِلْمَ السَّاعَةِ عِنْدَ اللهِ.", "إِنَّمَا عِلْمُ السَّاعَةِ عِنْدَ اللهِ.", "إِنَّمَا عِلْمَ السَّاعَةِ عِنْدَ اللهِ.", "إِنَّ مَا عِلْمُ السَّاعَةِ عِنْدَ اللهِ.", "Kıyametin bilgisi ancak Allah katındadır.", "İsim merfû."],
      ["لَيْتَ النَّاسَ يُحِبُّ بَعْضُهُمْ بَعْضًا.", "لَيْتَمَا النَّاسَ (أَوِ النَّاسُ) يُحِبُّ بَعْضُهُمْ بَعْضًا.", "لَيْتَمَا النَّاسِ يُحِبُّ بَعْضُهُمْ بَعْضًا.", "لَيْتَ مَا النَّاسُ يُحِبُّ بَعْضُهُمْ بَعْضًا.", "Keşke insanlar birbirini sevse.", "Leytemâ: iki yol da caiz."]
    ])},
    { type: "classify", extra: true, opts: AM, ar: "عَامِلَةٌ أَمْ غَيْرُ عَامِلَةٍ؟", tr: "Koyu harf âmil mi (ismi mansûb), gayr-i âmil mi?", items: CL([
      [HL("إِنَّ اللهَ عَلِيمٌ حَكِيمٌ.", "إِنَّ"), "a", "İsim mansûb."],
      [HL("﴿إِنَّمَا المُؤْمِنُونَ إِخْوَةٌ﴾", "إِنَّمَا"), "g", "İsim merfû."],
      [HL("كَأَنَّ حَلِيمَةَ وُلِدَتْ أَدِيبَةً.", "كَأَنَّ"), "a", "İsim mansûb."],
      [HL("كَأَنَّمَا حَلِيمَةُ وُلِدَتْ أَدِيبَةً.", "كَأَنَّمَا"), "g", "İsim merfû."],
      [HL("لَيْتَمَا السَّلَامَ يَعُمُّ العَالَمَ.", "لَيْتَمَا"), "a", "İsim mansûb: leytemâ amel etti."],
      [HL("لَيْتَمَا السَّلَامُ يَعُمُّ العَالَمَ.", "لَيْتَمَا"), "g", "İsim merfû."],
      [HL("لَعَلَّ النَّتِيجَةَ سَتُعْلَنُ غَدًا.", "لَعَلَّ"), "a", "Mâ yok."],
      [HL("لَعَلَّمَا نَجِيبٌ نَاجِحٌ.", "لَعَلَّمَا"), "g", "İsim merfû."],
      [HL("لَكِنَّ خَدِيجَةَ لَا تَفْعَلُ هَذَا.", "لَكِنَّ"), "a", "Mâ yok."],
      [HL("اجْتَهَدَ وَلَكِنَّمَا رَسَبَ.", "لَكِنَّمَا"), "g", "Fiil cümlesine girdi."],
      [HL("أَعْلَمُ أَنَّ عَلِيًّا كَرِيمٌ.", "أَنَّ"), "a", "Mâ yok."],
      [HL("أَعْلَمُ أَنَّمَا عَلِيٌّ كَرِيمٌ.", "أَنَّمَا"), "g", "İsim merfû."],
      [HL("لَيْتَ الشَّبَابَ يَعُودُ يَوْمًا.", "لَيْتَ"), "a", "Mâ yok."],
      [HL("﴿إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ العُلَمَاءُ﴾", "إِنَّمَا"), "g", "Fiil cümlesine girdi."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · MÂ’NIN ETKİSİ VE OKUMA
{
  id: "u5", no: 5, ar: "أَثَرُ «مَا» الكَافَّةِ · القِرَاءَةُ", tr: "Mâ’nın Etkisi ve Okuma", short: "Okuma", col: "muz", legend: ["mz", "nasb"],
  goals: ["Mâ-i kâffenin cümledeki etkisini söylemek: isim merfû mu, fiil cümlesi mi?", "“Çarşıda bir gezinti” metninde âmil ve gayr-i âmil harfleri ayırmak"],
  examples: [
    { s: "إِنَّمَا:mz / العِزَّةُ:nasb / لِلَّهِ.:x", tr: "İzzet ancak Allah’ındır. ← kuffet: isim merfû geldi.", pair: "لَيْتَمَا:mz / يَنْزِلُ:x / المَطَرُ.:x", pairTr: "Keşke yağmur yağsa. ← kuffet: fiil cümlesine girdi." }
  ],
  rules: [
    { tr: "Mâ-i kâffenin etkisini söylerken iki kalıp kullan:", ex: ["كُفَّتْ «إِنَّ» عَنِ العَمَلِ فَجَاءَ الاسْمُ بَعْدَهَا مَرْفُوعًا", "كُفَّتْ «لَيْتَ» عَنِ العَمَلِ فَدَخَلَتْ عَلَى الجُمْلَةِ الفِعْلِيَّةِ"] },
    { tr: "Metinde mâ’sız harf âmildir: <span class=\"ar\">وَلَكِنَّهُمْ يَتَسَاوَمُونَ</span> (هُمْ, لَكِنَّ’nin ismi). <span class=\"ar\">وَلَيْتَمَا لِهَذِهِ الأَسْوَاقِ نِظَامًا</span>’da ise leytemâ amel etmiştir: <span class=\"ar\">نِظَامًا</span> muahhar isimdir." },
    { tr: "<span class=\"ar\">وَمَا كُنْتُ أَبْغِي</span>’deki <span class=\"ar\">مَا</span> nefy edatıdır, kâffe değil: kâffe yalnız inne ve kardeşlerine bitişik gelir." }
  ],
  kaide: ["بَيِّنْ أَثَرَ «مَا» الكَافَّةِ فِي الجُمَلِ التَّالِيَةِ. بَيِّنِ الحُرُوفَ العَامِلَةَ وَغَيْرَ العَامِلَةِ مِنْ «إِنَّ» وَأَخَوَاتِهَا فِي القِطْعَةِ التَّالِيَةِ."],
  ex: [
    { type: "classify", num: "٨", opts: MK, ar: "بَيِّنْ أَثَرَ «مَا» الكَافَّةِ فِي الجُمَلِ التَّالِيَةِ", tr: "Mâ-i kâffe cümlede ne yaptı?", exHtml: "<span class=\"ar\">إِنَّمَا العِزَّةُ لِلَّهِ ← كُفَّتْ «إِنَّ» عَنِ العَمَلِ فَجَاءَ الاسْمُ بَعْدَهَا مَرْفُوعًا · لَيْتَمَا يَنْزِلُ المَطَرُ ← دَخَلَتْ عَلَى الجُمْلَةِ الفِعْلِيَّةِ</span>", items: CL([
      [HL("لَعَلَّمَا نَجِيبٌ نَاجِحٌ فِي الاخْتِبَارِ.", "لَعَلَّمَا"), "r", "نَجِيبٌ merfû mübtedâ."],
      [HL("﴿إِنَّمَا يَعْمُرُ مَسَاجِدَ اللهِ مَنْ آمَنَ بِاللهِ وَاليَوْمِ الآخِرِ﴾", "إِنَّمَا"), "f", "يَعْمُرُ fiili. (Tevbe 18)"],
      [HL("كَأَنَّمَا الطِّفْلُ رَجُلٌ كَبِيرٌ فِي سُلُوكِهِ.", "كَأَنَّمَا"), "r", "الطِّفْلُ merfû."],
      [HL("اجْتَهَدَ زَمِيلِي كَثِيرًا وَلَكِنَّمَا رَسَبَ فِي الامْتِحَانِ.", "لَكِنَّمَا"), "f", "رَسَبَ fiili."],
      [HL("عِنْدَمَا أَنْظُرُ إِلَى الجِبَالِ أَشْعُرُ كَأَنَّمَا تُرَاقِبُنِي مِنْ بَعِيدٍ.", "كَأَنَّمَا"), "f", "تُرَاقِبُ fiili."],
      [HL("اعْلَمُوا أَنَّمَا إِلَهُكُمْ إِلَهٌ وَاحِدٌ لَا شَرِيكَ لَهُ.", "أَنَّمَا"), "r", "إِلَهُكُمْ merfû."],
      [HL("لَيْتَمَا تَأْتِي الحَافِلَةُ فِي وَقْتِهَا حَتَّى لَا نَنْتَظِرَ طَوِيلًا.", "لَيْتَمَا"), "f", "تَأْتِي fiili."],
      [HL("مَا قُلْتُ لَكَ هَذَا لِأُوذِيَكَ، إِنَّمَا قُلْتُهُ لِتَعْرِفَ الحَقِيقَةَ.", "إِنَّمَا"), "f", "قُلْتُهُ fiili."]
    ]) },
    { type: "classify", extra: true, opts: MK, ar: "مَا أَثَرُ «مَا»؟", tr: "Mâ’nın etkisini seç.", items: CL([
      [HL("إِنَّمَا العِزَّةُ لِلَّهِ.", "إِنَّمَا"), "r", "İsim merfû."],
      [HL("لَيْتَمَا يَنْزِلُ المَطَرُ.", "لَيْتَمَا"), "f", "Fiil cümlesi."],
      [HL("لَيْتَمَا السَّلَامَ يَعُمُّ العَالَمَ.", "لَيْتَمَا"), "n", "السَّلَامَ mansûb: amel etti."],
      [HL("لَيْتَمَا الشَّبَابَ يَعُودُ يَوْمًا.", "لَيْتَمَا"), "n", "Amel etti."],
      [HL("إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ.", "إِنَّمَا"), "r", "İsim merfû."],
      [HL("﴿إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ العُلَمَاءُ﴾", "إِنَّمَا"), "f", "Fiil cümlesi."],
      [HL("وَلَيْتَمَا لِهَذِهِ الأَسْوَاقِ نِظَامًا صِحِّيًّا.", "لَيْتَمَا"), "n", "نِظَامًا mansûb: amel etti."],
      [HL("كَأَنَّمَا يَتَقَاتَلُونَ فِي مَعْرَكَةٍ.", "كَأَنَّمَا"), "f", "Fiil cümlesi."]
    ]) },
    { type: "reading", num: "١٠", ar: "بَيِّنِ الحُرُوفَ العَامِلَةَ وَغَيْرَ العَامِلَةِ مِنْ «إِنَّ» وَأَخَوَاتِهَا فِي القِطْعَةِ التَّالِيَةِ", tr: "Metni oku, soruları cevapla; sonra koyu harfin âmil olup olmadığını ve mâ’nın etkisini seç.", title: "جَوْلَةٌ فِي السُّوقِ",
      text: METIN2,
      textTr: "Bir keresinde büyük çarşılardan birini gezdim; ne bir şey almak ne de satmak istiyordum, yalnızca bu çarşıdaki insanların âdetlerinden, işlerinden ve davranışlarından bir şeyler öğrenmek istedim. Oraya erkenden vardım; çarşıya giden caddeler bana erkekler, kadınlar ve çocuklarla taşan nehirler gibi göründü. Kapısına varır varmaz insanların, sanki şiddetli bir savaşta çarpışıyormuş gibi itiştiğini, kakıştığını gördüm.<br>Ayakların arasından kendimi ittim ve çarşıya girdim: bir de baktım, mallar düzensizce sergilenmiş; insanlar önlerinde toplanmış, fiyatlarından hiçbir şey bilmeden şaşkın şaşkın duruyorlar, ama sıkı sıkı pazarlık ediyorlar. Keşke bu çarşıların, insanların aldatılmaması için sağlıklı bir düzeni ve kanunları olsa! (en-Nahvu’l-Vâdıh, 2. cilt, uyarlanarak)",
      qa: [
        { q: "لِمَاذَا زَارَ الكَاتِبُ السُّوقَ؟", a: "لِيَعْرِفَ شَيْئًا مِنْ عَادَاتِ القَوْمِ وَأَعْمَالِهِمْ وَسُلُوكِهِمْ، لَا لِلشِّرَاءِ وَلَا لِلْبَيْعِ.", tr: "Yazar çarşıyı niçin ziyaret etti? Alışveriş için değil, insanların âdetlerini ve davranışlarını öğrenmek için." },
        { q: "بِمَ شَبَّهَ الكَاتِبُ الشَّوَارِعَ المُؤَدِّيَةَ إِلَى السُّوقِ؟", a: "شَبَّهَهَا بِأَنْهَارٍ تَزْخَرُ بِالنَّاسِ.", tr: "Yazar çarşıya giden caddeleri neye benzetti? İnsanlarla taşan nehirlere." },
        { q: "كَيْفَ كَانَتِ السِّلَعُ مَعْرُوضَةً؟", a: "كَانَتْ مَعْرُوضَةً فِي غَيْرِ نِظَامٍ.", tr: "Mallar nasıl sergilenmişti? Düzensizce." },
        { q: "مَاذَا تَمَنَّى الكَاتِبُ؟", a: "تَمَنَّى أَنْ يَكُونَ لِلْأَسْوَاقِ نِظَامٌ صِحِّيٌّ وَقَوَانِينُ حَتَّى لَا يُغَشَّ النَّاسُ.", tr: "Yazar ne diledi? Çarşıların, insanlar aldatılmasın diye sağlıklı bir düzeni ve kanunları olmasını." }
      ],
      cls: { opts: AM, ar: "عَامِلَةٌ أَمْ غَيْرُ عَامِلَةٍ؟", tr: "Koyu harf âmil mi, gayr-i âmil mi?", items: [
        { s: HL("وَإِنَّمَا أَرَدْتُ أَنْ أَعْرِفَ شَيْئًا", "إِنَّمَا"), a: "g", why: "Mâ-i kâffe; fiil cümlesine girdi." },
        { s: HL("فَخُيِّلَ إِلَيَّ أَنَّمَا الشَّوَارِعُ المُؤَدِّيَةُ إِلَيْهَا أَنْهَارٌ", "أَنَّمَا"), a: "g", why: "الشَّوَارِعُ merfû." },
        { s: HL("كَأَنَّمَا يَتَقَاتَلُونَ فِي مَلْحَمَةٍ", "كَأَنَّمَا"), a: "g", why: "Fiil cümlesine girdi." },
        { s: HL("وَلَكِنَّهُمْ يَتَسَاوَمُونَ فِيهَا", "لَكِنَّ"), a: "a", why: "Mâ yok: هُمْ ismi, يَتَسَاوَمُونَ haberi." },
        { s: HL("وَلَيْتَمَا لِهَذِهِ الأَسْوَاقِ نِظَامًا صِحِّيًّا", "لَيْتَمَا"), a: "a", why: "نِظَامًا mansûb: leytemâ amel etti." }
      ]},
      cls2: { opts: MK.concat([["x", "Mâ yok: harf amel etti", "لَا «مَا» · عَامِلَةٌ", "x"]]), ar: "مَا أَثَرُ «مَا»؟", tr: "Mâ’nın etkisi ne? (Mâ yoksa son seçeneği seç.)", items: [
        { s: HL("وَإِنَّمَا أَرَدْتُ", "إِنَّمَا"), a: "f", why: "أَرَدْتُ fiili." },
        { s: HL("أَنَّمَا الشَّوَارِعُ أَنْهَارٌ", "أَنَّمَا"), a: "r", why: "Mübtedâ merfû." },
        { s: HL("كَأَنَّمَا يَتَقَاتَلُونَ", "كَأَنَّمَا"), a: "f", why: "Fiil cümlesi." },
        { s: HL("وَلَكِنَّهُمْ يَتَسَاوَمُونَ", "لَكِنَّ"), a: "x", why: "Mâ yok." },
        { s: HL("وَلَيْتَمَا لِهَذِهِ الأَسْوَاقِ نِظَامًا", "لَيْتَمَا"), a: "n", why: "İsim mansûb." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["{إِنَّ} اللهَ عَلِيمٌ حَكِيمٌ.", ["إِنَّ", "أَنَّ", "أَنْ"], "söz başı: kesre", "Şüphesiz Allah bilendir, hikmet sahibidir.", "u1"],
  ["سَمِعْتُ {أَنَّ} عَدْنَانَ مُصَابٌ بِالزُّكَامِ.", ["أَنَّ", "إِنَّ", "أَنْ"], "mef’ûl yerinde: fetha", "Adnân’ın nezle olduğunu duydum.", "u1"],
  ["أَظُنُّ {أَنَّ} عَلِيًّا ذَهَبَ إِلَى بَيْتِهِ.", ["أَنَّ", "إِنَّ", "إِنْ"], "fetha", "Sanırım Ali evine gitti.", "u1"],
  ["أَعْتَقِدُ أَنَّ {الصِّحَّةَ} مُهِمَّةٌ.", ["الصِّحَّةَ", "الصِّحَّةُ", "الصِّحَّةِ"], "enne’nin ismi: mansûb", "Sağlığın önemli olduğuna inanıyorum.", "u1"],
  ["تُشِيرُ التَّطَوُّرَاتُ إِلَى {أَنَّ} الوَضْعَ سَيَتَحَسَّنُ.", ["أَنَّ", "إِنَّ", "أَنْ"], "harf-i cerden sonra", "Gelişmeler durumun düzeleceğine işaret ediyor.", "u1"],
  ["قَالَ الرَّجُلُ: {إِنَّ} وَلَدِي مَرِيضٌ.", ["إِنَّ", "أَنَّ", "أَنْ"], "kavil: kesre", "Adam: “Oğlum hasta” dedi.", "u2"],
  ["﴿وَالعَصْرِ {إِنَّ} الإِنْسَانَ لَفِي خُسْرٍ﴾", ["إِنَّ", "أَنَّ", "إِنْ"], "yemin: kesre", "Asra yemin olsun ki insan ziyandadır.", "u2"],
  ["تَكَلَّمْ حَيْثُ {إِنَّ} الكَلَامَ مُفِيدٌ.", ["إِنَّ", "أَنَّ", "أَنْ"], "hays: kesre", "Söz faydalı olduğu için konuş.", "u2"],
  ["تَرَكْتُ الأَوْلَادَ وَ{إِنَّهُمْ} فِي نَوْمٍ عَمِيقٍ.", ["إِنَّهُمْ", "أَنَّهُمْ", "إِنَّهُمُو"], "hâl: kesre", "Çocukları derin uykudayken bıraktım.", "u2"],
  ["أَكْرَهُ الَّذِينَ {إِنَّهُمْ} يُخْلِفُونَ وَعْدَهُمْ.", ["إِنَّهُمْ", "أَنَّهُمْ", "أَنْ"], "sıla: kesre", "Sözünden dönenleri sevmem.", "u2"],
  ["﴿أَلَا {إِنَّهُمْ} هُمُ المُفْسِدُونَ﴾", ["إِنَّهُمْ", "أَنَّهُمْ", "أَنْ"], "elâ: kesre", "Bilin ki onlar bozguncuların ta kendisidir.", "u2"],
  ["قَالَ المُدِيرُ: إِنَّ {الاجْتِمَاعَ} سَيَبْدَأُ.", ["الاجْتِمَاعَ", "الاجْتِمَاعُ", "الاجْتِمَاعِ"], "inne’nin ismi: mansûb", "Müdür: “Toplantı başlayacak” dedi.", "u3"],
  ["اعْلَمْ {أَنَّ} الصَّلَاةَ عِمَادُ الدِّينِ.", ["أَنَّ", "إِنَّ", "أَنْ"], "mef’ûl: fetha", "Bil ki namaz dinin direğidir.", "u3"],
  ["تَشْتَهِرُ إِسْطَنْبُولُ {بِأَنَّهَا} قَدِيمَةٌ.", ["بِأَنَّهَا", "بِإِنَّهَا", "بِأَنْ"], "harf-i cer: fetha", "İstanbul eski oluşuyla meşhurdur.", "u3"],
  ["كَانَتْ مَرْكَزَ الخِلَافَةِ حَيْثُ إِنَّ {الخُلَفَاءَ} كَانُوا يُقِيمُونَ فِيهَا.", ["الخُلَفَاءَ", "الخُلَفَاءُ", "الخُلَفَاءِ"], "inne’nin ismi: mansûb", "Halifeler orada oturduğu için hilafet merkeziydi.", "u3"],
  ["أَدْهَشَكَ {أَنَّ} شَوَارِعَهَا مُزْدَحِمَةٌ.", ["أَنَّ", "إِنَّ", "أَنْ"], "fâil yerinde: fetha", "Caddelerinin kalabalığı seni şaşırttı.", "u3"],
  ["﴿إِنَّمَا {المُؤْمِنُونَ} إِخْوَةٌ﴾", ["المُؤْمِنُونَ", "المُؤْمِنِينَ", "المُؤْمِنِ"], "mâ-i kâffe: merfû", "Müminler ancak kardeştir.", "u4"],
  ["إِنَّمَا {الأَعْمَالُ} بِالنِّيَّاتِ.", ["الأَعْمَالُ", "الأَعْمَالَ", "الأَعْمَالِ"], "mâ-i kâffe: merfû", "Ameller ancak niyetlere göredir.", "u4"],
  ["كَأَنَّمَا {وَجْهُهُ} بَدْرٌ مُضِيءٌ.", ["وَجْهُهُ", "وَجْهَهُ", "وَجْهِهِ"], "mâ-i kâffe: merfû", "Yüzü sanki parlak bir dolunay.", "u4"],
  ["لَكِنَّ {خَدِيجَةَ} لَا تَفْعَلُ هَذَا.", ["خَدِيجَةَ", "خَدِيجَةُ", "خَدِيجَةِ"], "mâ yok: mansûb", "Ama Hatice bunu yapmaz.", "u4"],
  ["لَعَلَّ {النَّتِيجَةَ} سَتُعْلَنُ غَدًا.", ["النَّتِيجَةَ", "النَّتِيجَةُ", "النَّتِيجَةِ"], "mâ yok: mansûb", "Belki sonuç yarın açıklanır.", "u4"],
  ["إِنَّمَا {العِزَّةُ} لِلَّهِ.", ["العِزَّةُ", "العِزَّةَ", "العِزَّةِ"], "kuffet: merfû", "İzzet ancak Allah’ındır.", "u5"],
  ["لَعَلَّمَا {نَجِيبٌ} نَاجِحٌ فِي الاخْتِبَارِ.", ["نَجِيبٌ", "نَجِيبًا", "نَجِيبٍ"], "kuffet: merfû", "Belki Necîb sınavda başarılıdır.", "u5"],
  ["وَلَكِنَّ{هُمْ} يَتَسَاوَمُونَ فِيهَا.", ["هُمْ", "هُمُو", "هِمْ"], "lâkinne’nin ismi (zamir)", "Ama pazarlık ediyorlar.", "u5"],
  ["وَلَيْتَمَا لِهَذِهِ الأَسْوَاقِ {نِظَامًا} صِحِّيًّا.", ["نِظَامًا", "نِظَامٍ", "نِظَامَ"], "leytemâ amel etti: mansûb", "Keşke bu çarşıların sağlıklı bir düzeni olsa.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["الصِّحَّةُ مُهِمَّةٌ ← أَعْتَقِدُ ile başla", "أَعْتَقِدُ أَنَّ الصِّحَّةَ مُهِمَّةٌ.", "أَعْتَقِدُ إِنَّ الصِّحَّةَ مُهِمَّةٌ.", "أَعْتَقِدُ أَنَّ الصِّحَّةُ مُهِمَّةٌ.", "Mef’ûl yerinde: fetha; isim mansûb.", "u1"],
  ["عَدْنَانُ مَرِيضٌ ← سَمِعْتُ ile başla", "سَمِعْتُ أَنَّ عَدْنَانَ مَرِيضٌ.", "سَمِعْتُ إِنَّ عَدْنَانَ مَرِيضٌ.", "سَمِعْتُ أَنَّ عَدْنَانُ مَرِيضٌ.", "Fetha; isim mansûb.", "u1"],
  ["العِلْمُ نَافِعٌ ← söz başına inne koy", "إِنَّ العِلْمَ نَافِعٌ.", "أَنَّ العِلْمَ نَافِعٌ.", "إِنَّ العِلْمُ نَافِعٌ.", "Söz başı: kesre.", "u1"],
  ["الوَقْتُ قَدْ حَانَ ← قَالَ أَبِي ile başla", "قَالَ أَبِي: إِنَّ الوَقْتَ قَدْ حَانَ.", "قَالَ أَبِي: أَنَّ الوَقْتَ قَدْ حَانَ.", "قَالَ أَبِي: إِنَّ الوَقْتُ قَدْ حَانَ.", "Kavil: kesre.", "u2"],
  ["العِلْمُ أَسَاسُ العَمَلِ ← yeminle başla", "وَاللهِ إِنَّ العِلْمَ أَسَاسُ العَمَلِ.", "وَاللهِ أَنَّ العِلْمَ أَسَاسُ العَمَلِ.", "وَاللهِ إِنَّ العِلْمُ أَسَاسُ العَمَلِ.", "Yemin: kesre.", "u2"],
  ["الحَسَنَاتُ يُذْهِبْنَ السَّيِّئَاتِ ← elâ ile başla", "أَلَا إِنَّ الحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ.", "أَلَا أَنَّ الحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ.", "أَلَا إِنَّ الحَسَنَاتُ يُذْهِبْنَ السَّيِّئَاتِ.", "Elâ: kesre; cem-i müennes kesre ile mansûb.", "u2"],
  ["الامْتِحَانُ صَعْبٌ ← مَنْ قَالَ لَكَ ile başla", "مَنْ قَالَ لَكَ إِنَّ الامْتِحَانَ صَعْبٌ؟", "مَنْ قَالَ لَكَ أَنَّ الامْتِحَانَ صَعْبٌ؟", "مَنْ قَالَ لَكَ إِنَّ الامْتِحَانُ صَعْبٌ؟", "Kavil: kesre.", "u3"],
  ["المَطَرُ شَدِيدٌ ← رَغْمَ ile bağla", "رَغْمَ أَنَّ المَطَرَ شَدِيدٌ", "رَغْمَ إِنَّ المَطَرَ شَدِيدٌ", "رَغْمَ أَنَّ المَطَرُ شَدِيدٌ", "Muzâftan sonra: fetha.", "u3"],
  ["إِنَّ المُؤْمِنِينَ إِخْوَةٌ ← mâ-i kâffe ekle", "إِنَّمَا المُؤْمِنُونَ إِخْوَةٌ.", "إِنَّمَا المُؤْمِنِينَ إِخْوَةٌ.", "إِنَّ مَا المُؤْمِنُونَ إِخْوَةٌ.", "İsim merfû olur.", "u4"],
  ["كَأَنَّ حَلِيمَةَ أَدِيبَةٌ ← mâ-i kâffe ekle", "كَأَنَّمَا حَلِيمَةُ أَدِيبَةٌ.", "كَأَنَّمَا حَلِيمَةَ أَدِيبَةٌ.", "كَأَنَّمَا حَلِيمَةُ أَدِيبَةً.", "İsim merfû.", "u4"],
  ["لَعَلَّ المُدِيرَ هُنَا ← mâ-i kâffe ekle", "لَعَلَّمَا المُدِيرُ هُنَا.", "لَعَلَّمَا المُدِيرَ هُنَا.", "لَعَلَّ مَا المُدِيرُ هُنَا.", "İsim merfû; bitişik yazılır.", "u4"],
  ["لَيْتَ السَّلَامَ يَعُمُّ ← mâ-i kâffe ekle", "لَيْتَمَا السَّلَامَ (أَوِ السَّلَامُ) يَعُمُّ", "لَيْتَمَا السَّلَامِ يَعُمُّ", "لَيْتَ مَا السَّلَامُ يَعُمُّ", "Leytemâ: iki yol da caiz.", "u4"],
  ["إِنَّ العِزَّةَ لِلَّهِ ← mâ-i kâffe ekle", "إِنَّمَا العِزَّةُ لِلَّهِ.", "إِنَّمَا العِزَّةَ لِلَّهِ.", "إِنَّمَا العِزَّةِ لِلَّهِ.", "Kuffet: isim merfû.", "u5"],
  ["يَنْزِلُ المَطَرُ ← لَيْتَمَا ile dile", "لَيْتَمَا يَنْزِلُ المَطَرُ.", "لَيْتَ يَنْزِلُ المَطَرُ.", "لَيْتَمَا يَنْزِلَ المَطَرَ.", "Mâ’lı harf fiil cümlesine girer; mâ’sız giremez.", "u5"]
];
// Kesre sebebi hız oyunu
var NOUN_LIST = UNITS[1].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = KS;
// İnne mi enne mi hız oyunu
var MM_OPTS = KE;
var MM_LIST = UNITS[0].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  se: { name: "Başlangıç ↔ hemze", pairs: [["قَالَ…", "إِنَّ (kavil)"], ["وَاللهِ…", "إِنَّ (yemin)"], ["أَلَا…", "إِنَّ (elâ)"], ["حَيْثُ…", "إِنَّ (hays)"], ["الَّذِي…", "إِنَّ (sıla)"], ["أَعْتَقِدُ…", "أَنَّ (mef’ûl)"], ["بِـ / إِلَى…", "أَنَّ (harf-i cer)"], ["مِنَ المَعْلُومِ…", "أَنَّ (mübtedâ)"]] },
  ce: { name: "Mâ’sız ↔ mâ’lı", pairs: [["إِنَّ المُؤْمِنِينَ", "إِنَّمَا المُؤْمِنُونَ"], ["كَأَنَّ حَلِيمَةَ", "كَأَنَّمَا حَلِيمَةُ"], ["لَعَلَّ المُدِيرَ", "لَعَلَّمَا المُدِيرُ"], ["لَكِنَّ أُمَّهُ", "لَكِنَّمَا أُمُّهُ"], ["أَنَّ عَلِيًّا", "أَنَّمَا عَلِيٌّ"], ["إِنَّ عِلْمَ السَّاعَةِ", "إِنَّمَا عِلْمُ السَّاعَةِ"], ["لَيْتَ الشَّبَابَ", "لَيْتَمَا الشَّبَابَ / الشَّبَابُ"], ["إِنَّ العِزَّةَ", "إِنَّمَا العِزَّةُ"]] },
  ay: { name: "Âyet / hadis ↔ Türkçe", pairs: [["إِنَّ الإِنْسَانَ لَفِي خُسْرٍ", "insan ziyandadır"], ["أَلَا إِنَّهُمْ هُمُ المُفْسِدُونَ", "bilin ki onlar bozgunculardır"], ["إِنَّمَا المُؤْمِنُونَ إِخْوَةٌ", "müminler ancak kardeştir"], ["إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ العُلَمَاءُ", "Allah’tan ancak âlimler korkar"], ["إِنَّ الأَبْرَارَ لَفِي نَعِيمٍ", "iyiler nimetler içindedir"], ["إِنَّكَ لَمِنَ المُرْسَلِينَ", "sen elbette peygamberlerdensin"], ["إِنَّمَا الحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ", "dünya hayatı oyun ve eğlencedir"], ["إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", "ameller niyetlere göredir"]] }
};
var KARTLAR = [
  ["İnne ile enne farkı?", "Aynı harf; enne’den sonraki cümle masdara çevrilir, inne’den sonraki bağımsızdır."],
  ["Kesrenin yedi yeri?", "Söz başı · kavil · hays · yemin · hâl · sıla · elâ"],
  ["قَالَ’dan sonra?", "إِنَّ: قَالَ الرَّجُلُ: إِنَّ وَلَدِي…"],
  ["أَخْبَرَ / سَمِعَ / ظَنَّ’dan sonra?", "أَنَّ: أَخْبَرَنِي أَنَّهُ تَزَوَّجَ"],
  ["Harf-i cerden sonra?", "أَنَّ: بِأَنَّهَا · إِلَى أَنَّ"],
  ["Hâl cümlesinde?", "وَإِنَّ: تَرَكْتُ الأَوْلَادَ وَإِنَّهُمْ نَائِمُونَ"],
  ["Mâ-i kâffe ne yapar?", "İnne ve kardeşlerini amelden alıkoyar: isim merfû olur."],
  ["إِنَّمَا’dan sonra isim?", "Merfû mübtedâ: إِنَّمَا المُؤْمِنُونَ إِخْوَةٌ"],
  ["Leytemâ’nın farkı?", "Hem amel edebilir hem etmeyebilir: لَيْتَمَا السَّلَامَ / السَّلَامُ"],
  ["Mâ’lı harf fiile girer mi?", "Evet: إِنَّمَا يَخْشَى اللهَ… · لَيْتَمَا يَنْزِلُ المَطَرُ"],
  ["إِنَّمَا’nın anlamı?", "Hasr: “ancak, yalnızca”."],
  ["وَمَا كُنْتُ أَبْغِي’deki مَا?", "Nefy edatı; kâffe değil."]
];
