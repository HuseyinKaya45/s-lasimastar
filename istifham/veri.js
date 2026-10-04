// ================= VERİ: İstifham Edatları (أَدَوَاتُ الاسْتِفْهَامِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mi: { ar: "حَرْفُ اسْتِفْهَامٍ", tr: "Harf-i istifham" }, cerr: { ar: "اسْمُ اسْتِفْهَامٍ", tr: "İsm-i istifham" },
  mz: { ar: "حَرْفُ جَوَابٍ", tr: "Cevap edatı" }, nasb: { ar: "أَمْ", tr: "Ta’yin (أَمْ)" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cer", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
// Ne soruyor?
var NE = [["k", "Kişi", "العَاقِلُ", "cerr"], ["s", "Şey", "غَيْرُ العَاقِلِ", "mz"], ["b", "Sebep", "السَّبَبُ", "ref"], ["h", "Hâl", "الحَالُ", "nasb"], ["z", "Zaman", "الزَّمَانُ", "mi"], ["m", "Mekân", "المَكَانُ", "mus"], ["a", "Sayı", "العَدَدُ", "sf"], ["t", "Seçim", "التَّعْيِينُ", "mun"], ["c", "Evet mi, hayır mı?", "مَضْمُونُ الجُمْلَةِ", "muz"]];
var NE_TR = {}; NE.forEach(function (n) { NE_TR[n[0]] = n[1]; });
// Edatlar: [edat, tür (h: harf, i: isim), ne sorar, Türkçe, örnek, örnek Türkçe]
var EDAT = [
  ["أَ", "h", "c", "-mi? (hemze)", "أَكَتَبْتَ الدَّرْسَ؟", "Dersi yazdın mı?"],
  ["هَلْ", "h", "c", "-mi?", "هَلْ كَتَبْتَ الدَّرْسَ؟", "Dersi yazdın mı?"],
  ["مَنْ", "i", "k", "kim?", "مَنْ سَافَرَ إِلَى أَنْقَرَةَ؟", "Ankara’ya kim gitti?"],
  ["مَا", "i", "s", "ne?", "مَا أَكَلْتَ؟", "Ne yedin?"],
  ["مَاذَا", "i", "s", "ne?", "مَاذَا أَكَلْتَ؟", "Ne yedin?"],
  ["لِمَاذَا", "i", "b", "niçin?", "لِمَاذَا تَأَخَّرْتَ هَذَا الصَّبَاحَ؟", "Bu sabah niçin geciktin?"],
  ["كَيْفَ", "i", "h", "nasıl?", "كَيْفَ رَجَعْتَ إِلَى البَيْتِ؟", "Eve nasıl döndün?"],
  ["مَتَى", "i", "z", "ne zaman?", "مَتَى وَصَلْتَ إِلَى إِسْطَنْبُولَ؟", "İstanbul’a ne zaman vardın?"],
  ["أَيْنَ", "i", "m", "nerede?", "أَيْنَ سَكَنُكَ؟", "Evin nerede?"],
  ["أَنَّى", "i", "m", "nereden? nasıl?", "يَا مَرْيَمُ أَنَّى لَكِ هَذَا؟", "Ey Meryem, bu sana nereden?"],
  ["كَمْ", "i", "a", "kaç?", "كَمْ كِتَابًا قَرَأْتَ؟", "Kaç kitap okudun?"],
  ["أَيُّ", "i", "t", "hangi?", "أَيَّ طَعَامٍ تُحِبُّ؟", "Hangi yemeği seversin?"]
];
var EDAT_BY = {}; EDAT.forEach(function (e) { EDAT_BY[e[0]] = e; });

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
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }

// Soru makinesi: cümlenin bir parçasına dokun → soru
var MAK = [
  { tr: "Hüseyin dün arkadaşını ziyaret etmek için uçakla Ankara’ya gitti.",
    parts: [["سَافَرَ", ""], ["حُسَيْنٌ", "k"], ["إِلَى أَنْقَرَةَ", "m"], ["أَمْسِ", "z"], ["بِالطَّائِرَةِ", "h"], ["لِزِيَارَةِ صَدِيقِهِ", "b"]],
    q: { c: ["هَلْ", "هَلْ سَافَرَ حُسَيْنٌ إِلَى أَنْقَرَةَ؟", "Hüseyin Ankara’ya gitti mi?", "نَعَمْ، سَافَرَ."], k: ["مَنْ", "مَنْ سَافَرَ إِلَى أَنْقَرَةَ؟", "Ankara’ya kim gitti?", "حُسَيْنٌ."], m: ["أَيْنَ", "إِلَى أَيْنَ سَافَرَ حُسَيْنٌ؟", "Hüseyin nereye gitti?", "إِلَى أَنْقَرَةَ."],
      z: ["مَتَى", "مَتَى سَافَرَ حُسَيْنٌ إِلَى أَنْقَرَةَ؟", "Hüseyin Ankara’ya ne zaman gitti?", "أَمْسِ."], h: ["كَيْفَ", "كَيْفَ سَافَرَ حُسَيْنٌ إِلَى أَنْقَرَةَ؟", "Hüseyin Ankara’ya nasıl gitti?", "بِالطَّائِرَةِ."], b: ["لِمَاذَا", "لِمَاذَا سَافَرَ حُسَيْنٌ إِلَى أَنْقَرَةَ؟", "Hüseyin Ankara’ya niçin gitti?", "لِزِيَارَةِ صَدِيقِهِ."] } },
  { tr: "Öğrenci kütüphanede üç kitap okudu.",
    parts: [["قَرَأَ", ""], ["الطَّالِبُ", "k"], ["ثَلَاثَةَ", "a"], ["كُتُبٍ", "s"], ["فِي المَكْتَبَةِ", "m"]],
    q: { c: ["هَلْ", "هَلْ قَرَأَ الطَّالِبُ ثَلَاثَةَ كُتُبٍ؟", "Öğrenci üç kitap okudu mu?", "نَعَمْ، قَرَأَ."], k: ["مَنْ", "مَنْ قَرَأَ ثَلَاثَةَ كُتُبٍ؟", "Üç kitabı kim okudu?", "الطَّالِبُ."], a: ["كَمْ", "كَمْ كِتَابًا قَرَأَ الطَّالِبُ؟", "Öğrenci kaç kitap okudu?", "ثَلَاثَةَ كُتُبٍ."],
      s: ["مَاذَا", "مَاذَا قَرَأَ الطَّالِبُ؟", "Öğrenci ne okudu?", "كُتُبًا."], m: ["أَيْنَ", "أَيْنَ قَرَأَ الطَّالِبُ الكُتُبَ؟", "Öğrenci kitapları nerede okudu?", "فِي المَكْتَبَةِ."] } },
  { tr: "Hadis kitaplarını mı yoksa tefsir kitaplarını mı seversin? Hadis kitaplarını severim.",
    parts: [["أُحِبُّ", ""], ["كُتُبَ الحَدِيثِ", "t"]],
    q: { c: ["أَ", "أَتُحِبُّ كُتُبَ الحَدِيثِ؟", "Hadis kitaplarını sever misin?", "نَعَمْ، أُحِبُّهَا."], t: ["أَيُّ / أَمْ", "أَيَّ الكُتُبِ تُحِبُّ؟ · أَتُحِبُّ كُتُبَ الحَدِيثِ أَمْ كُتُبَ التَّفْسِيرِ؟", "Hangi kitapları seversin? · Hadis kitaplarını mı, tefsir kitaplarını mı?", "كُتُبَ الحَدِيثِ."] } }
];

var UNITS = [
// ---------------------------------------------------------------- 1 · HEMZE VE HEL
{
  id: "u1", no: 1, ar: "حَرْفَا الاسْتِفْهَامِ: الهَمْزَةُ وَهَلْ", tr: "Harf-i İstifham: Hemze ve Hel", short: "Hemze · hel", col: "mi", legend: ["mi", "mz", "nasb"],
  goals: ["Soru edatlarının cümlenin başına geldiğini ve ikiye ayrıldığını bilmek: harf ve isim", "Hemze ve هَلْ ile sorulan soruya نَعَمْ ya da لَا ile cevap vermek", "أَمْ ile seçim sorusu sormak ve seçilen şeyi söyleyerek cevap vermek"],
  examples: [
    { s: "هَلْ:mi / كَتَبْتَ الدَّرْسَ؟:-", tr: "Dersi yazdın mı?", pair: "نَعَمْ:mz / كَتَبْتُ.:-", pairTr: "Evet, yazdım." },
    { s: "أَ:mi / تُحِبُّ السَّفَرَ إِلَى خَارِجِ البِلَادِ؟:-", tr: "Yurt dışına seyahati sever misin?", pair: "لَا:mz / مَا كَتَبْتُ.:-", pairTr: "Hayır, yazmadım." },
    { s: "أَ:mi / أَنْتَ مُدَرِّسٌ:- / أَمْ:nasb / مُهَنْدِسٌ؟:-", tr: "Sen öğretmen misin, mühendis mi?", pair: "أَنَا مُدَرِّسٌ.:-", pairTr: "Ben öğretmenim. (Seçim sorusunda نَعَمْ denmez.)" }
  ],
  rules: [
    { tr: "<b>Soru edatları</b> (<span class=\"ar\">أَدَوَاتُ الاسْتِفْهَامِ</span>) bir şeyi sormak için kullanılır ve cümlenin <b>başına</b> gelir. İkiye ayrılır: <b class=\"r-mi\">harf</b> ve <b class=\"r-cerr\">isim</b>." },
    { tr: "Harf-i istifham ikidir: <b>hemze</b> (<span class=\"ar\">أَ</span>) ve <b>هَلْ</b>. İ’rabda yerleri yoktur.", ex: ["أَ", "هَلْ"] },
    { tr: "Hemze ve هَلْ cümlenin içeriğini (olup olmadığını) sorar. Cevap evetse <b class=\"r-mz\">نَعَمْ</b>, hayırsa <b class=\"r-mz\">لَا</b> olur.", ex: ["أَكَتَبْتَ الدَّرْسَ؟ نَعَمْ، كَتَبْتُ.", "هَلْ كَتَبْتَ الدَّرْسَ؟ لَا، مَا كَتَبْتُ."] },
    { tr: "Hemze ile <b>seçim</b> (ta’yin) de sorulur. Soran, iki şeyden birinin doğru olduğunu bilir; hangisi olduğunu sorar. Bu durumda <b class=\"r-nasb\">أَمْ</b> kullanılır, cevapta da biri söylenir; نَعَمْ ve لَا denmez.", ex: ["أَأَنْتَ مُدَرِّسٌ أَمْ مُهَنْدِسٌ؟ أَنَا مُدَرِّسٌ."] },
    { tr: "Hemze bitişik yazılır: <span class=\"ar\">أَ + تُحِبُّ ← أَتُحِبُّ</span>. Soruda \"sen\" varsa cevapta \"ben\" olur: <span class=\"ar\">أَتُحِبُّ؟ نَعَمْ، أُحِبُّ</span>." },
    { tr: "Seçim sorusu yalnız hemzeyle sorulur; هَلْ ile <span class=\"ar\">أَمْ</span> kullanılmaz." }
  ],
  kaide: [
    "أَدَوَاتُ الاسْتِفْهَامِ هِيَ الأَدَوَاتُ الَّتِي تُسْتَخْدَمُ لِلاسْتِفْهَامِ عَنْ أَمْرٍ مَا، وَتَقَعُ فِي أَوَّلِ الجُمْلَةِ، وَتَنْقَسِمُ إِلَى قِسْمَيْنِ: حُرُوفُ اسْتِفْهَامٍ وَأَسْمَاءُ اسْتِفْهَامٍ.",
    "١ ـ حُرُوفُ الاسْتِفْهَامِ هِيَ: هَلْ وَالهَمْزَةُ (أَ)، لَا مَحَلَّ لَهُمَا مِنَ الإِعْرَابِ.",
    "أ ـ الهَمْزَةُ: ١ ـ يُسْأَلُ بِهَا عَنْ مَضْمُونِ الجُمْلَةِ، وَيَكُونُ جَوَابُهَا «نَعَمْ» فِي الإِثْبَاتِ وَ«لَا» فِي النَّفْيِ، مِثْلُ: أَكَتَبْتَ الدَّرْسَ؟ نَعَمْ، كَتَبْتُ. لَا، مَا كَتَبْتُ.",
    "٢ ـ وَيُسْأَلُ بِهَا عَنِ التَّعْيِينِ إِذَا كَانَ السَّائِلُ يَعْرِفُ مَضْمُونَ الجُمْلَةِ، أَيْ تَعْيِينِ أَحَدِ أَمْرَيْنِ أَوْ شَيْئَيْنِ، وَيَكُونُ الجَوَابُ بِتَعْيِينِ وَاحِدٍ مِمَّا ذُكِرَ فِي السُّؤَالِ، وَلَا بُدَّ مِنِ اسْتِعْمَالِ «أَمْ» العَاطِفَةِ، مِثْلُ: أَأَنْتَ مُدَرِّسٌ أَمْ مُهَنْدِسٌ؟ أَنَا مُدَرِّسٌ.",
    "ب ـ هَلْ: يُسْأَلُ بِهَا عَنْ مَضْمُونِ الجُمْلَةِ، وَيَكُونُ جَوَابُهَا «نَعَمْ» فِي الإِثْبَاتِ وَ«لَا» فِي النَّفْيِ، مِثْلُ: هَلْ كَتَبْتَ الدَّرْسَ؟ نَعَمْ، كَتَبْتُ. لَا، مَا كَتَبْتُ."
  ],
  ex: [
    { type: "combo", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ كَمَا فِي المِثَالِ", tr: "Cevabı kur: kutulara dokunarak cevap edatını ve fiili seç. Evet de hayır da doğru olabilir; seçim sorusunda (أَمْ) biri söylenir.", exHtml: "<span class=\"ar\">هَلْ زُرْتَ المَتْحَفَ؟ ← نَعَمْ، زُرْتُ المَتْحَفَ.</span>", items: [
      CB("أَتُحِبُّ السَّفَرَ إِلَى خَارِجِ البِلَادِ؟", [["نَعَمْ،", "لَا،", "بَلَى،"], ["أُحِبُّ", "تُحِبُّ", "لَا أُحِبُّ"], "السَّفَرَ إِلَى خَارِجِ البِلَادِ."], [[0, 0], [1, 2]], ["Evet, yurt dışına seyahati severim.", "Hayır, yurt dışına seyahati sevmem."], "Olumlu soru: evet → نَعَمْ, hayır → لَا. Soru \"sen\" (تُحِبُّ), cevap \"ben\" (أُحِبُّ)."),
      CB("هَلْ نَهَى الإِسْلَامُ عَنِ الخَمْرِ؟", [["لَا،", "بَلَى،", "نَعَمْ،"], ["لَمْ يَنْهَ", "نَهَى", "نَهَيْتُ"], "الإِسْلَامُ عَنِ الخَمْرِ."], [2, 1], "Evet, İslâm içkiyi yasakladı.", "Olumlu soru, cevap evet: نَعَمْ."),
      CB("أَتُسَافِرُ إِلَى دِمَشْقَ بِالطَّائِرَةِ أَمْ بِالحَافِلَةِ؟", [["نَعَمْ، أُسَافِرُ", "أُسَافِرُ", "لَا، أُسَافِرُ"], "إِلَى دِمَشْقَ", ["بِالطَّائِرَةِ.", "بِالحَافِلَةِ.", "بِالطَّائِرَةِ أَمْ بِالحَافِلَةِ."]], [[1, 0], [1, 1]], ["Şam’a uçakla giderim.", "Şam’a otobüsle giderim."], "أَمْ ile seçim sorusu: نَعَمْ / لَا denmez, ikisinden biri söylenir."),
      CB("هَلْ نَصَحَهُ الطَّبِيبُ أَنْ يَقْضِيَ العُطْلَةَ فِي بَلَدٍ جَمِيلٍ؟", [["نَعَمْ،", "بَلَى،", "لَا،"], ["نَصَحَنِي", "نَصَحَهُ", "مَا نَصَحَهُ"], "الطَّبِيبُ أَنْ يَقْضِيَ العُطْلَةَ فِي بَلَدٍ جَمِيلٍ."], [[0, 1], [2, 2]], ["Evet, doktor ona tatili güzel bir ülkede geçirmesini tavsiye etti.", "Hayır, doktor ona bunu tavsiye etmedi."], "Soru \"o\" hakkında (نَصَحَهُ); cevapta da هُ kalır."),
      CB("هَلْ أَوْقَفْتَ السَّيَّارَةَ أَمَامَ الكُلِّيَّةِ؟", [["نَعَمْ،", "لَا،", "بَلَى،"], ["أَوْقَفْتُ", "أَوْقَفْتَ", "مَا أَوْقَفْتُ"], "السَّيَّارَةَ أَمَامَ الكُلِّيَّةِ."], [[0, 0], [1, 2]], ["Evet, arabayı fakültenin önüne park ettim.", "Hayır, arabayı fakültenin önüne park etmedim."], "أَوْقَفْتَ (sen) → أَوْقَفْتُ (ben)."),
      CB("أَتَدْرُسُ فَاطِمَةُ فِي كُلِّيَّةِ الآدَابِ أَمْ كُلِّيَّةِ الطِّبِّ؟", [["نَعَمْ، تَدْرُسُ", "تَدْرُسُ", "لَا، تَدْرُسُ"], "فَاطِمَةُ فِي", ["كُلِّيَّةِ الآدَابِ.", "كُلِّيَّةِ الطِّبِّ.", "كُلِّيَّةِ الآدَابِ أَمْ كُلِّيَّةِ الطِّبِّ."]], [[1, 0], [1, 1]], ["Fâtıma edebiyat fakültesinde okuyor.", "Fâtıma tıp fakültesinde okuyor."], "Seçim sorusu: birini söyle."),
      CB("أَتُرِيدُ السَّفَرَ مَعَ أَخِيكَ فِي الشَّهْرِ القَادِمِ؟", [["نَعَمْ،", "لَا،", "بَلَى،"], ["أُرِيدُ", "تُرِيدُ", "لَا أُرِيدُ"], "السَّفَرَ مَعَ", ["أَخِي", "أَخِيكَ", "أَخِيهِ"], "فِي الشَّهْرِ القَادِمِ."], [[0, 0, 0], [1, 2, 0]], ["Evet, gelecek ay kardeşimle yolculuk etmek istiyorum.", "Hayır, gelecek ay kardeşimle yolculuk etmek istemiyorum."], "أَخِيكَ (senin kardeşin) → أَخِي (benim kardeşim)."),
      CB("أَلَسْتَ مُدَرِّسًا فِي الابْتِدَائِيَّةِ؟", [["نَعَمْ،", "لَا،", "بَلَى،"], ["أَنَا مُدَرِّسٌ", "لَسْتُ مُدَرِّسًا", "أَنْتَ مُدَرِّسٌ"], "فِي الابْتِدَائِيَّةِ."], [[2, 0], [0, 1]], ["Hayır öyle değil; ben ilkokulda öğretmenim.", "Evet, ilkokulda öğretmen değilim."], "Olumsuz soru! Öğretmensen بَلَى, değilsen نَعَمْ. (2. konuya bak.)")
    ]},
    { type: "combo", num: "٢", ar: "حَوِّلِ الجُمَلَ التَّالِيَةَ إِلَى أَسَالِيبِ اسْتِفْهَامٍ بِـ«هَلْ» أَوِ الهَمْزَةِ", tr: "Cümleyi soruya çevir. Eğik çizgi (/) varsa seçim sorusu: hemze ve أَمْ. Kişiyi de çevir: ben → sen.", exHtml: "<span class=\"ar\">سَيَّارَةُ الأُسْتَاذِ جَدِيدَةٌ ← هَلْ سَيَّارَةُ الأُسْتَاذِ جَدِيدَةٌ؟ · أُرِيدُ القَهْوَةَ / الشَّايَ ← أَتُرِيدُ القَهْوَةَ أَمِ الشَّايَ؟</span>", items: [
      CB("سَأُسَافِرُ إِلَى مَكَّةَ / المَدِينَةِ.", [["أَسَتُسَافِرُ", "هَلْ سَتُسَافِرُ", "أَسَأُسَافِرُ"], "إِلَى مَكَّةَ", ["أَوْ", "أَمْ", "هَلْ"], "إِلَى المَدِينَةِ؟"], [0, 1], "Mekke’ye mi gideceksin, Medine’ye mi?", "Seçim sorusu: hemze + أَمْ. Ben (سَأُسَافِرُ) → sen (سَتُسَافِرُ)."),
      CB("إِسْطَنْبُولُ مَدِينَةٌ تَارِيخِيَّةٌ.", [["مَا", "هَلْ", "أَمْ"], "إِسْطَنْبُولُ مَدِينَةٌ تَارِيخِيَّةٌ؟"], [1], "İstanbul tarihî bir şehir mi?", "Evet-hayır sorusu: هَلْ (ya da hemze: أَإِسْطَنْبُولُ…)."),
      CB("رَجَعْنَا مِنَ الرِّحْلَةِ بِالقِطَارِ / السَّيَّارَةِ.", [["هَلْ رَجَعْنَا", "أَرَجَعْنَا", "أَرَجَعْتُمْ"], "مِنَ الرِّحْلَةِ بِالقِطَارِ", ["أَمْ", "أَوْ", "هَلْ"], "بِالسَّيَّارَةِ؟"], [2, 0], "Geziden trenle mi döndünüz, arabayla mı?", "Biz (رَجَعْنَا) → siz (رَجَعْتُمْ); seçim için hemze + أَمْ."),
      CB("يَطْلُبُ الطُّلَّابُ التَّرْوِيحَ بَعْدَ عَنَاءِ الدِّرَاسَةِ.", [["أَمْ يَطْلُبُ", "هَلْ يَطْلُبُ", "مَنْ يَطْلُبُ"], "الطُّلَّابُ التَّرْوِيحَ بَعْدَ عَنَاءِ الدِّرَاسَةِ؟"], [1], "Öğrenciler ders yorgunluğundan sonra eğlence ister mi?", "Evet-hayır sorusu: هَلْ (ya da أَيَطْلُبُ)."),
      CB("نَعَمْ، لَسْتُ عَامِلًا فِي هَذَا المَصْنَعِ.", [["هَلْ لَسْتُ", "أَلَسْتُ", "أَلَسْتَ"], "عَامِلًا فِي هَذَا المَصْنَعِ؟"], [2], "Bu fabrikada işçi değil misin?", "Cevap \"نَعَمْ، لَسْتُ\": soru olumsuzdu. Olumsuz soru hemzeyle sorulur (هَلْ olumsuza girmez); ben → sen: أَلَسْتَ."),
      CB("أَنَسٌ طَالِبٌ تُرْكِيٌّ / بَاكِسْتَانِيٌّ.", [["هَلْ أَنَسٌ", "أَنَسٌ", "أَأَنَسٌ"], "طَالِبٌ تُرْكِيٌّ", ["أَمْ", "هَلْ", "أَوْ"], "بَاكِسْتَانِيٌّ؟"], [2, 0], "Enes Türk öğrenci mi, Pakistanlı mı?", "Seçim: hemze + أَمْ. (أَتُرْكِيٌّ أَنَسٌ أَمْ بَاكِسْتَانِيٌّ؟ de olur.)"),
      CB("أَقْرَأُ القُرْآنَ صَبَاحًا / لَيْلًا.", [["أَتَقْرَأُ", "هَلْ أَقْرَأُ", "أَأَقْرَأُ"], "القُرْآنَ صَبَاحًا", ["أَوْ", "أَمْ", "هَلْ"], "لَيْلًا؟"], [0, 1], "Kur’an’ı sabah mı okursun, gece mi?", "Ben (أَقْرَأُ) → sen (تَقْرَأُ); seçim: أَمْ."),
      CB("شَرِبَ المَرِيضُ الدَّوَاءَ.", [["مَنْ شَرِبَ", "هَلْ شَرِبَ", "أَمْ شَرِبَ"], "المَرِيضُ الدَّوَاءَ؟"], [1], "Hasta ilacı içti mi?", "Evet-hayır sorusu: هَلْ (ya da أَشَرِبَ).")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · BELÂ VE NE'AM
{
  id: "u2", no: 2, ar: "الاسْتِفْهَامُ المَنْفِيُّ: بَلَى وَنَعَمْ", tr: "Olumsuz Soru: Belâ ve Ne’am", short: "Belâ · ne’am", col: "mz", legend: ["mi", "mz"],
  goals: ["Hemzenin olumsuz cümleye girdiğini görmek: أَلَمْ، أَلَيْسَ، أَمَا، أَلَا", "Olumsuz soruya \"evet, yaptım\" demek için بَلَى kullanmak", "Olumsuz soruya \"evet, yapmadım\" demek için نَعَمْ kullanmak"],
  examples: [
    { s: "أَ:mi / لَسْتَ طَالِبًا؟:-", tr: "Öğrenci değil misin?", pair: "بَلَى:mz / أَنَا طَالِبٌ.:-", pairTr: "Hayır öyle değil, ben öğrenciyim." },
    { s: "أَ:mi / لَمْ تَقْرَإِ الصَّحِيفَةَ؟:-", tr: "Gazeteyi okumadın mı?", pair: "نَعَمْ:mz / لَمْ أَقْرَأْهَا.:-", pairTr: "Evet, okumadım." },
    { s: "أَ:mi / لَسْتُ بِرَبِّكُمْ؟:-", tr: "Ben sizin Rabbiniz değil miyim? (A’râf 172)", pair: "بَلَى:mz / شَهِدْنَا.:-", pairTr: "Evet (Rabbimizsin), şahit olduk." }
  ],
  rules: [
    { tr: "Hemze olumsuz cümlenin de başına gelir: <span class=\"ar\">أَلَمْ، أَلَيْسَ، أَلَسْتَ، أَمَا، أَلَا</span>. هَلْ olumsuz cümleye girmez." },
    { tr: "Olumsuz soruya verilen cevap, olumsuzluğu <b>bozuyorsa</b> (yani iş olmuşsa) <b class=\"r-mz\">بَلَى</b> denir.", ex: ["أَلَسْتَ طَالِبًا؟ بَلَى، أَنَا طَالِبٌ."] },
    { tr: "Olumsuzluğu <b>onaylıyorsa</b> (yani iş olmamışsa) <b class=\"r-mz\">نَعَمْ</b> denir.", ex: ["أَلَسْتَ طَالِبًا؟ نَعَمْ، لَسْتُ طَالِبًا."] },
    { tr: "Türkçede ikisi de \"evet\" gibi gelebilir. Ayırmanın yolu: cevabın devamı olumluysa بَلَى, olumsuzsa نَعَمْ." },
    { tr: "Ünlü örnek: <span class=\"ar\">أَلَسْتُ بِرَبِّكُمْ؟ قَالُوا بَلَى</span>. Burada نَعَمْ deselerdi \"evet, Rabbimiz değilsin\" demiş olurlardı." }
  ],
  kaide: ["٣ ـ وَيُسْأَلُ بِالهَمْزَةِ عَنْ مَضْمُونِ الجُمْلَةِ، وَتَدْخُلُ عَلَى النَّفْيِ (الجُمْلَةِ المَنْفِيَّةِ)، وَيَكُونُ جَوَابُهَا «بَلَى» فِي الإِثْبَاتِ وَ«نَعَمْ» فِي النَّفْيِ، مِثْلُ: أَلَسْتَ طَالِبًا؟ بَلَى، أَنَا طَالِبٌ. نَعَمْ، لَسْتُ طَالِبًا."],
  ex: [
    { type: "combo", num: "٣", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ بِـ«بَلَى» أَوْ «نَعَمْ»", tr: "Olumsuz soruya iki türlü cevap ver: iş olduysa بَلَى + olumlu, olmadıysa نَعَمْ + olumsuz. İkisi de doğru sayılır; uyumlu olmaları yeter.", exHtml: "<span class=\"ar\">أَلَمْ تَقْرَإِ الصَّحِيفَةَ؟ ← بَلَى، قَرَأْتُهَا. · نَعَمْ، لَمْ أَقْرَأْهَا.</span>", items: [
      CB("أَمَا حَضَرَ الوَزِيرُ إِلَى الاجْتِمَاعِ؟", [["بَلَى،", "نَعَمْ،", "لَا،"], ["حَضَرَ", "مَا حَضَرَ", "حَضَرْتُ"], "."], [[0, 0], [1, 1]], ["Hayır öyle değil, geldi.", "Evet, gelmedi."], "بَلَى + olumlu ya da نَعَمْ + olumsuz."),
      CB("أَلَا تُسَافِرُ إِلَى خَارِجِ البِلَادِ فِي العُطْلَةِ؟", [["نَعَمْ،", "لَا،", "بَلَى،"], ["لَا أُسَافِرُ", "أُسَافِرُ", "تُسَافِرُ"], "."], [[2, 1], [0, 0]], ["Hayır öyle değil, giderim.", "Evet, gitmem."], "Sen → ben: أُسَافِرُ."),
      CB("أَلَيْسَ الهَدَفُ مِنَ التَّرْوِيحِ قَضَاءَ الوَقْتِ فِي أَنْشِطَةٍ مُفِيدَةٍ؟", [["بَلَى،", "لَا،", "نَعَمْ،"], ["هُوَ ذَلِكَ", "لَسْتُ كَذَلِكَ", "لَيْسَ ذَلِكَ"], "."], [[0, 0], [2, 2]], ["Hayır öyle değil, amaç budur.", "Evet, amaç bu değildir."], "Konu \"amaç\" (o): لَيْسَ, لَسْتُ değil."),
      CB("أَلَسْتَ طَبِيبًا فِي المُسْتَشْفَى الحُكُومِيِّ؟", [["بَلَى،", "نَعَمْ،", "لَا،"], ["أَنَا طَبِيبٌ", "لَسْتُ طَبِيبًا", "لَسْتَ طَبِيبًا"], "فِيهِ."], [[0, 0], [1, 1]], ["Hayır öyle değil, orada doktorum.", "Evet, orada doktor değilim."], "Sen (لَسْتَ) → ben (لَسْتُ)."),
      CB("أَمَا خَرَجَتِ المُهَنْدِسَةُ مِنَ الشَّرِكَةِ؟", [["لَا،", "بَلَى،", "نَعَمْ،"], ["خَرَجْتُ", "خَرَجَتْ", "مَا خَرَجَتْ"], "."], [[1, 1], [2, 2]], ["Hayır öyle değil, çıktı.", "Evet, çıkmadı."], "Özne dişil: خَرَجَتْ."),
      CB("أَلَمْ تَفْحَصِ الطَّبِيبَةُ المَرِيضَةَ؟", [["بَلَى،", "نَعَمْ،", "لَا،"], ["فَحَصَتْهَا", "لَمْ تَفْحَصْهَا", "فَحَصْتُهَا"], "."], [[0, 0], [1, 1]], ["Hayır öyle değil, muayene etti.", "Evet, muayene etmedi."], "Kadın doktor (o): فَحَصَتْ; hasta için هَا."),
      CB("أَلَا تَسْتَقْبِلُ الضُّيُوفَ فِي المَطَارِ؟", [["نَعَمْ،", "بَلَى،", "لَا،"], ["تَسْتَقْبِلُهُمْ", "أَسْتَقْبِلُهُمْ", "لَا أَسْتَقْبِلُهُمْ"], "."], [[1, 1], [0, 2]], ["Hayır öyle değil, karşılarım.", "Evet, karşılamam."], "Misafirler için هُمْ."),
      CB("أَمَا اشْتَرَكَ الصَّحَفِيُّونَ فِي المُؤْتَمَرِ؟", [["بَلَى،", "لَا،", "نَعَمْ،"], ["اشْتَرَكُوا", "اشْتَرَكْنَا", "مَا اشْتَرَكُوا"], "."], [[0, 0], [2, 2]], ["Hayır öyle değil, katıldılar.", "Evet, katılmadılar."], "Gazeteciler (onlar): اشْتَرَكُوا.")
    ]},
    { type: "pick", extra: true, ar: "مَا الجَوَابُ الصَّحِيحُ؟", tr: "Soru olumlu mu, olumsuz mu? Anlatılmak istenene uyan cevap edatını seç.", items: [
      { q: "هَلْ صَلَّيْتَ؟ (Kıldım.)", o: ["بَلَى", "نَعَمْ", "لَا"], a: 1, why: "Olumlu soru, cevap evet: نَعَمْ.", tr: "" },
      { q: "أَلَمْ تُصَلِّ؟ (Kıldım.)", o: ["نَعَمْ", "لَا", "بَلَى"], a: 2, why: "Olumsuz soru, iş oldu: بَلَى.", tr: "" },
      { q: "أَلَمْ تُصَلِّ؟ (Kılmadım.)", o: ["نَعَمْ", "بَلَى", "لَا"], a: 0, why: "Olumsuz soru, olumsuzluk doğru: نَعَمْ.", tr: "" },
      { q: "أَذَهَبْتَ إِلَى السُّوقِ؟ (Gitmedim.)", o: ["بَلَى", "لَا", "نَعَمْ"], a: 1, why: "Olumlu soru, cevap hayır: لَا.", tr: "" },
      { q: "أَلَيْسَ اللهُ بِأَحْكَمِ الحَاكِمِينَ؟", o: ["بَلَى", "نَعَمْ", "لَا"], a: 0, why: "Olumsuz soru, olumsuzluk bozuluyor: بَلَى (Tîn 8).", tr: "Allah hâkimlerin en hâkimi değil mi?" },
      { q: "أَمَا قَرَأْتَ الكِتَابَ؟ (Okumadım.)", o: ["لَا", "بَلَى", "نَعَمْ"], a: 2, why: "Olumsuz soru, okumadım: نَعَمْ.", tr: "" }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · İSİM İSTİFHAM
{
  id: "u3", no: 3, ar: "أَسْمَاءُ الاسْتِفْهَامِ", tr: "İsm-i İstifham", short: "Soru isimleri", col: "cerr", legend: ["cerr"],
  goals: ["On soru ismini ve neyi sorduklarını bilmek", "مَنْ ile kişi, مَا / مَاذَا ile şey sorulduğunu ayırt etmek", "أَيُّ'nün izafetle her şeyi sorabildiğini ve i’rab aldığını bilmek"],
  examples: [
    { s: "مَنْ:cerr / قَرَأَ سُورَةَ الوَاقِعَةِ؟:-", tr: "Vâkıa sûresini kim okudu?", pair: "مَا:cerr / أَحَبُّ الأَعْمَالِ إِلَى اللهِ تَعَالَى؟:-", pairTr: "Allah’a en sevimli amel nedir?" },
    { s: "مَتَى:cerr / وَصَلْتَ؟:-", tr: "Ne zaman vardın?", pair: "كَيْفَ:cerr / الجَوُّ اليَوْمَ؟:-", pairTr: "Bugün hava nasıl?" },
    { s: "أَيَّ:cerr / صَدِيقٍ تُحِبُّ؟:-", tr: "Hangi arkadaşı seversin?", pair: "فِي أَيِّ:cerr / وَقْتٍ حَضَرْتَ؟:-", pairTr: "Hangi vakitte geldin?" }
  ],
  rules: [
    { tr: "Soru isimleri: <span class=\"ar\">مَنْ، مَا، مَاذَا، لِمَاذَا، كَيْفَ، مَتَى، أَيْنَ، أَنَّى، كَمْ، أَيُّ</span>. Cümledeki yerlerine göre <b>mahallen</b> i’rab alırlar (mebnîdirler); yalnız <span class=\"ar\">أَيُّ</span> i’rabı lafzen alır." },
    { tr: "<span class=\"ar\">مَنْ</span> akıllıyı (kişiyi), <span class=\"ar\">مَا / مَاذَا</span> akılsızı (şeyi) sorar.", ex: ["مَنْ سَافَرَ إِلَى أَنْقَرَةَ؟", "مَاذَا أَكَلْتَ؟"] },
    { tr: "<span class=\"ar\">لِمَاذَا</span> sebebi, <span class=\"ar\">كَيْفَ</span> hâli, <span class=\"ar\">مَتَى</span> zamanı, <span class=\"ar\">أَيْنَ</span> yeri sorar.", ex: ["لِمَاذَا تَأَخَّرْتَ؟", "كَيْفَ رَجَعْتَ؟", "مَتَى وَصَلْتَ؟", "أَيْنَ سَكَنُكَ؟"] },
    { tr: "<span class=\"ar\">أَنَّى</span> hem yeri (nereden) hem hâli (nasıl) sorar: <span class=\"ar\">يَا مَرْيَمُ أَنَّى لَكِ هَذَا</span> (Âl-i İmrân 37), <span class=\"ar\">أَنَّى يُحْيِي هَذِهِ اللهُ بَعْدَ مَوْتِهَا</span> (Bakara 259)." },
    { tr: "<span class=\"ar\">كَمْ</span> sayıyı sorar; arkasındaki isim tekil ve mansûb olur (temyiz).", ex: ["كَمْ كِتَابًا قَرَأْتَ؟", "كَمْ سُورَةً قَرَأْتَ؟"] },
    { tr: "<span class=\"ar\">أَيُّ</span> seçim ve ta’yin için kullanılır; muzâf olduğu isme göre kişiyi, şeyi, zamanı ya da yeri sorar.", ex: ["أَيَّ صَدِيقٍ تُحِبُّ؟", "أَيَّ طَعَامٍ تُحِبُّ؟", "فِي أَيِّ وَقْتٍ؟", "فِي أَيِّ مَدْرَسَةٍ؟"] }
  ],
  kaide: [
    "٢ ـ أَسْمَاءُ الاسْتِفْهَامِ هِيَ: مَنْ، مَا، مَاذَا، لِمَاذَا، كَيْفَ، مَتَى، أَيْنَ، أَنَّى، كَمْ، أَيُّ. وَتُعْرَبُ أَسْمَاءُ الاسْتِفْهَامِ حَسَبَ مَوْقِعِهَا فِي الجُمْلَةِ (إِعْرَابًا مَحَلِّيًّا) غَيْرَ «أَيّ».",
    "مَنْ: يُسْأَلُ بِهَا عَنِ العَاقِلِ. مَا / مَاذَا: عَنْ غَيْرِ العَاقِلِ. لِمَاذَا: عَنِ السَّبَبِ. كَيْفَ: عَنِ الحَالِ. مَتَى: عَنِ الزَّمَانِ. أَيْنَ: عَنِ المَكَانِ. أَنَّى: عَنِ المَكَانِ وَالحَالِ. كَمْ: عَنِ العَدَدِ.",
    "أَيُّ: يُسْأَلُ بِهَا لِلاخْتِيَارِ أَوِ التَّعْيِينِ حَسَبَ الاسْمِ الَّذِي تُضَافُ إِلَيْهِ: العَاقِلِ (أَيَّ صَدِيقٍ تُحِبُّ؟)، وَغَيْرِ العَاقِلِ (أَيَّ طَعَامٍ تُحِبُّ؟)، وَالزَّمَانِ (فِي أَيِّ وَقْتٍ حَضَرْتَ؟)، وَالمَكَانِ (فِي أَيِّ مَدْرَسَةٍ دَرَسْتَ؟)."
  ],
  ex: [
    { type: "bank", num: "٥", ar: "امْلَأِ الفَرَاغَ بِالأَدَاةِ المُنَاسِبَةِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Önce bir soru edatı seç, sonra uygun boşluğa dokun. Her edat bir kez kullanılır.",
      bank: ["مَنْ", "مَا", "مَاذَا", "لِمَاذَا", "مَتَى", "كَيْفَ", "أَيْنَ", "كَمْ", "أَيَّ"], items: [
      { h: "تَعِيشُ أُسْرَتُكَ؟", a: [6], tr: "Ailen nerede yaşıyor?", why: "Yer: أَيْنَ." },
      { h: "حَصَلَ عَلَى الجَائِزَةِ؟", a: [0], tr: "Ödülü kim aldı?", why: "Kişi: مَنْ." },
      { h: "لَمْ تَحْضُرْ زَيْنَبُ إِلَى الكُلِّيَّةِ؟", a: [3], tr: "Zeynep fakülteye niçin gelmedi?", why: "Sebep: لِمَاذَا." },
      { h: "اسْمُ المُؤَلِّفِ؟", a: [1], tr: "Yazarın adı ne?", why: "İsim cümlesinde şey: مَا." },
      { h: "تَأْكُلُ فِي الغَدَاءِ؟", a: [2, 1], tr: "Öğle yemeğinde ne yersin?", why: "Fiil cümlesinde şey: مَاذَا (مَا da olur)." },
      { h: "تَبْدَأُ الدِّرَاسَةُ فِي الكُلِّيَّةِ وَمَتَى تَنْتَهِي؟", a: [4], tr: "Fakültede eğitim ne zaman başlıyor, ne zaman bitiyor?", why: "Zaman: مَتَى." },
      { h: "طَالِبًا يَدْرُسُ فِي هَذِهِ الكُلِّيَّةِ؟", a: [7], tr: "Bu fakültede kaç öğrenci okuyor?", why: "Sayı: كَمْ; arkasında tekil mansûb: طَالِبًا." },
      { h: "كِتَابٍ تُفَضِّلُ؟", a: [8], tr: "Hangi kitabı tercih edersin?", why: "Seçim: أَيَّ + muzâfun ileyh (كِتَابٍ)." },
      { h: "سَافَرْتَ إِلَى الجَزَائِرِ؟", a: [5, 4, 3], tr: "Cezayir’e nasıl gittin?", why: "Kalan edat كَيْفَ: hâl sorusu." }
    ]},
    { type: "classify", extra: true, opts: NE.slice(0, 8), ar: "عَمَّ يُسْأَلُ؟", tr: "Bu soru ne soruyor?", items: [
      { s: HL("مَنْ سَافَرَ إِلَى أَنْقَرَةَ؟", "مَنْ"), a: "k", why: "مَنْ: akıllı (kişi).", tr: "Ankara’ya kim gitti?" },
      { s: HL("مَاذَا أَكَلْتَ؟", "مَاذَا"), a: "s", why: "مَاذَا: akılsız (şey).", tr: "Ne yedin?" },
      { s: HL("لِمَاذَا تَأَخَّرْتَ هَذَا الصَّبَاحَ؟", "لِمَاذَا"), a: "b", why: "لِمَاذَا: sebep.", tr: "Bu sabah niçin geciktin?" },
      { s: HL("كَيْفَ رَجَعْتَ إِلَى البَيْتِ؟", "كَيْفَ"), a: "h", why: "كَيْفَ: hâl.", tr: "Eve nasıl döndün?" },
      { s: HL("مَتَى وَصَلْتَ إِلَى إِسْطَنْبُولَ؟", "مَتَى"), a: "z", why: "مَتَى: zaman.", tr: "İstanbul’a ne zaman vardın?" },
      { s: HL("أَيْنَ سَكَنُكَ؟", "أَيْنَ"), a: "m", why: "أَيْنَ: mekân.", tr: "Evin nerede?" },
      { s: HL("كَمْ كِتَابًا قَرَأْتَ؟", "كَمْ"), a: "a", why: "كَمْ: sayı.", tr: "Kaç kitap okudun?" },
      { s: HL("أَيَّ طَعَامٍ تُحِبُّ؟", "أَيَّ"), a: "t", why: "أَيُّ: seçim.", tr: "Hangi yemeği seversin?" },
      { s: HL("يَا مَرْيَمُ أَنَّى لَكِ هَذَا؟", "أَنَّى") + ' <small class="muted">(Âl-i İmrân 37)</small>', a: "m", why: "أَنَّى burada \"nereden\": mekân.", tr: "Ey Meryem, bu sana nereden?" },
      { s: HL("أَنَّى يُحْيِي هَذِهِ اللهُ بَعْدَ مَوْتِهَا؟", "أَنَّى") + ' <small class="muted">(Bakara 259)</small>', a: "h", why: "أَنَّى burada \"nasıl\": hâl.", tr: "Allah burayı ölümünden sonra nasıl diriltir?" }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · SORU SOR, CEVAP VER
{
  id: "u4", no: 4, ar: "السُّؤَالُ وَالجَوَابُ", tr: "Soru Sor, Cevap Ver", short: "Soru · cevap", col: "nasb", legend: ["cerr", "mi"],
  goals: ["Soru isminin istediği türde cevap vermek: مَتَى → zaman, أَيْنَ → yer", "Cümlenin bir parçasına uygun soruyu kurmak", "Soruda ve cevapta kişiyi çevirmek: تَأَخَّرْتُ → لِمَاذَا تَأَخَّرْتَ؟"],
  examples: [
    { s: "مَنْ:cerr / سَافَرَ إِلَى أَنْقَرَةَ؟:-", tr: "Ankara’ya kim gitti?", pair: "سَافَرَ حُسَيْنٌ إِلَى أَنْقَرَةَ.:-", pairTr: "Hüseyin Ankara’ya gitti." },
    { s: "كَيْفَ:cerr / دَخَلَ الأُسْتَاذُ؟:-", tr: "Hoca nasıl girdi?", pair: "دَخَلَ الأُسْتَاذُ مُتَبَسِّمًا.:-", pairTr: "Hoca gülümseyerek girdi." },
    { s: "هَلْ:mi / تَدْرُسُ فِي كُلِّيَّةِ التَّرْبِيَةِ؟:-", tr: "Eğitim fakültesinde mi okuyorsun?", pair: "نَعَمْ، أَنَا أَدْرُسُ فِي كُلِّيَّةِ التَّرْبِيَةِ.:-", pairTr: "Evet, eğitim fakültesinde okuyorum." }
  ],
  rules: [
    { tr: "Cevap, sorunun istediği bilgiyi verir: <span class=\"ar\">مَتَى</span> → zaman, <span class=\"ar\">أَيْنَ</span> → yer, <span class=\"ar\">كَمْ</span> → sayı, <span class=\"ar\">كَيْفَ</span> → hâl. نَعَمْ / لَا yalnız hemze ve هَلْ sorularına verilir." },
    { tr: "Soru kurarken sorulan parça cümleden çıkar, yerine soru ismi en başa gelir: <span class=\"ar\">سَافَرَ حُسَيْنٌ ← مَنْ سَافَرَ؟</span>" },
    { tr: "Sorulan parça kişi ise مَنْ, şey ise مَاذَا, sebep ise لِمَاذَا, hâl ise كَيْفَ, zaman ise مَتَى, yer ise أَيْنَ, sayı ise كَمْ kullanılır." },
    { tr: "Cevap \"نَعَمْ\" ile başlıyorsa soru هَلْ ya da hemzeyle sorulmuştur." },
    { tr: "\"Ben\" diyen cümle soruda \"sen\" olur: <span class=\"ar\">تَأَخَّرْتُ ← لِمَاذَا تَأَخَّرْتَ؟</span>, <span class=\"ar\">أُحِبُّ ← أَيَّ الكُتُبِ تُحِبُّ؟</span>" }
  ],
  kaide: ["هَاتِ أَسْئِلَةً مُنَاسِبَةً لِلْكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ، مِثْلُ: سَافَرَ حُسَيْنٌ إِلَى أَنْقَرَةَ ← مَنْ سَافَرَ إِلَى أَنْقَرَةَ؟"],
  ex: [
    { type: "pick", num: "٤", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ", tr: "Soruya uyan cevabı seç. Kitapta cevap serbest; burada sorunun istediği bilgiyi veren cevabı bul.", items: [
      { q: "مَنْ أَلَّفَ كِتَابَ «رِيَاضِ الصَّالِحِينَ»؟", o: ["أَلَّفَهُ فِي دِمَشْقَ.", "أَلَّفَهُ الإِمَامُ النَّوَوِيُّ.", "نَعَمْ، أَلَّفَهُ."], a: 1, why: "مَنْ kişiyi sorar: İmam Nevevî.", tr: "Riyâzü’s-Sâlihîn’i kim yazdı? İmam Nevevî yazdı." },
      { q: "مَا أَحَبُّ الأَعْمَالِ إِلَى اللهِ؟", o: ["أَحَبُّ الأَعْمَالِ إِلَى اللهِ أَدْوَمُهَا وَإِنْ قَلَّ.", "أَحَبُّهَا فِي رَمَضَانَ.", "لَا، لَا أُحِبُّهَا."], a: 0, why: "مَا şeyi sorar. Hadiste: أَدْوَمُهَا وَإِنْ قَلَّ (Buhârî, Müslim).", tr: "Allah’a en sevimli amel, az da olsa devamlı olanıdır." },
      { q: "مَتَى يَأْتِي مُدِيرُ الجَامِعَةِ؟", o: ["يَأْتِي بِالسَّيَّارَةِ.", "يَأْتِي مِنْ أَنْقَرَةَ.", "يَأْتِي غَدًا صَبَاحًا."], a: 2, why: "مَتَى zamanı sorar.", tr: "Rektör yarın sabah geliyor." },
      { q: "أَيْنَ تَرَكْتَ حَقِيبَتَكَ؟", o: ["تَرَكْتُهَا فِي الصَّفِّ.", "تَرَكْتُهَا أَمْسِ.", "تَرَكْتُهَا لِأَنِّي تَعِبْتُ."], a: 0, why: "أَيْنَ yeri sorar.", tr: "Çantamı sınıfta bıraktım." },
      { q: "كَمْ سُورَةً قَرَأْتَ أَمْسِ؟", o: ["قَرَأْتُهَا فِي المَسْجِدِ.", "قَرَأْتُ ثَلَاثَ سُوَرٍ.", "قَرَأْتُهَا بِصَوْتٍ جَمِيلٍ."], a: 1, why: "كَمْ sayıyı sorar. (Kitapta \"كم سورة\" yazıyor; temyiz mansûb olur: سُورَةً.)", tr: "Dün üç sûre okudum." },
      { q: "كَيْفَ وَجَدْتَ المَكْتَبَةَ؟", o: ["وَجَدْتُهَا أَمْسِ.", "وَجَدْتُهَا فِي الكُلِّيَّةِ.", "وَجَدْتُهَا جَمِيلَةً وَمُنَظَّمَةً."], a: 2, why: "كَيْفَ hâli sorar.", tr: "Kütüphaneyi güzel ve düzenli buldum." },
      { q: "أَيَّ مَكَانٍ تُفَضِّلُ لِلتَّرْوِيحِ فِي العُطْلَةِ؟", o: ["أُفَضِّلُ شَاطِئَ البَحْرِ.", "أُفَضِّلُهُ كَثِيرًا.", "نَعَمْ، أُفَضِّلُ."], a: 0, why: "أَيَّ مَكَانٍ: bir yer seçilir.", tr: "Deniz kıyısını tercih ederim." },
      { q: "فِي أَيِّ وَقْتٍ تَحْضُرُ إِلَى الكُلِّيَّةِ؟", o: ["أَحْضُرُ بِالحَافِلَةِ.", "أَحْضُرُ فِي السَّاعَةِ الثَّامِنَةِ.", "أَحْضُرُ مَعَ أَصْدِقَائِي."], a: 1, why: "أَيِّ وَقْتٍ: zaman.", tr: "Fakülteye saat sekizde gelirim." }
    ]},
    { type: "pick", num: "٦", ar: "هَاتِ أَسْئِلَةً مُنَاسِبَةً لِلْكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ", tr: "Koyu parçayı soran soru hangisi?", exHtml: "<span class=\"ar\">سَافَرَ <b class=\"hl\">حُسَيْنٌ</b> إِلَى أَنْقَرَةَ ← مَنْ سَافَرَ إِلَى أَنْقَرَةَ؟</span>", items: [
      { q: HL("دَخَلَ الأُسْتَاذُ مُتَبَسِّمًا.", "مُتَبَسِّمًا"), o: ["مَتَى دَخَلَ الأُسْتَاذُ؟", "كَيْفَ دَخَلَ الأُسْتَاذُ؟", "مَنْ دَخَلَ؟"], a: 1, why: "مُتَبَسِّمًا hâldir: كَيْفَ.", tr: "Hoca nasıl girdi?" },
      { q: HL("فِي المَسْجِدِ أَلْفُ مُسْلِمٍ.", "أَلْفُ"), o: ["كَمْ مُسْلِمًا فِي المَسْجِدِ؟", "أَيْنَ المُسْلِمُونَ؟", "مَنْ فِي المَسْجِدِ؟"], a: 0, why: "Sayı: كَمْ + tekil mansûb (مُسْلِمًا).", tr: "Mescitte kaç Müslüman var?" },
      { q: HL("يَسْكُنُ السُّيَّاحُ فِي الفُنْدُقِ الكَبِيرِ.", "فِي الفُنْدُقِ الكَبِيرِ"), o: ["مَنْ يَسْكُنُ فِي الفُنْدُقِ؟", "لِمَاذَا يَسْكُنُ السُّيَّاحُ؟", "أَيْنَ يَسْكُنُ السُّيَّاحُ؟"], a: 2, why: "Yer: أَيْنَ.", tr: "Turistler nerede kalıyor?" },
      { q: HL("غَادَرَتِ الحَافِلَةُ المَوْقِفَ قَبْلَ سَاعَةٍ.", "قَبْلَ سَاعَةٍ"), o: ["مَتَى غَادَرَتِ الحَافِلَةُ المَوْقِفَ؟", "كَيْفَ غَادَرَتِ الحَافِلَةُ؟", "مَاذَا غَادَرَتِ الحَافِلَةُ؟"], a: 0, why: "Zaman: مَتَى.", tr: "Otobüs duraktan ne zaman ayrıldı?" },
      { q: HL("أُحِبُّ كُتُبَ الحَدِيثِ.", "كُتُبَ الحَدِيثِ"), o: ["مَنْ تُحِبُّ؟", "أَيَّ الكُتُبِ تُحِبُّ؟", "مَتَى تُحِبُّ الكُتُبَ؟"], a: 1, why: "Seçim: أَيَّ الكُتُبِ (مَاذَا تُحِبُّ؟ de olur). Ben → sen.", tr: "Hangi kitapları seversin?" },
      { q: HL("تَأَخَّرْتُ بِسَبَبِ الازْدِحَامِ فِي المُرُورِ.", "بِسَبَبِ الازْدِحَامِ فِي المُرُورِ"), o: ["كَيْفَ تَأَخَّرْتَ؟", "مَتَى تَأَخَّرْتَ؟", "لِمَاذَا تَأَخَّرْتَ؟"], a: 2, why: "Sebep: لِمَاذَا; ben (تَأَخَّرْتُ) → sen (تَأَخَّرْتَ).", tr: "Niçin geciktin?" },
      { q: HL("نَعَمْ، أَنَا أَدْرُسُ فِي كُلِّيَّةِ التَّرْبِيَةِ.", "نَعَمْ"), o: ["أَيْنَ تَدْرُسُ؟", "هَلْ تَدْرُسُ فِي كُلِّيَّةِ التَّرْبِيَةِ؟", "مَاذَا تَدْرُسُ؟"], a: 1, why: "Cevap نَعَمْ: soru هَلْ (ya da hemze) ile.", tr: "Eğitim fakültesinde mi okuyorsun?" },
      { q: HL("شَرِبَ الطِّفْلُ الحَلِيبَ.", "الحَلِيبَ"), o: ["مَاذَا شَرِبَ الطِّفْلُ؟", "مَنْ شَرِبَ الحَلِيبَ؟", "كَمْ شَرِبَ الطِّفْلُ؟"], a: 0, why: "Şey: مَاذَا. (Altı çizili الطِّفْلُ olsaydı: مَنْ شَرِبَ الحَلِيبَ؟)", tr: "Çocuk ne içti?" }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: أَبُو الدَّرْدَاءِ، الآيَاتُ وَالأَحَادِيثُ", tr: "Okuma: Ebu’d-Derdâ, Âyet ve Hadisler", short: "Okuma", col: "muz", legend: ["mi", "cerr", "mz"],
  goals: ["Bir hikâyede soru edatlarını, emr-i hâzırı ve nehy-i hâzırı ayırmak", "Âyet ve hadislerde soru edatlarını bulmak; bitişik hemzeyi fark etmek: أَفَنَجْعَلُ، أَأَنْتُمْ", "Soru gibi görünen ama soru olmayanları ayırmak: şart bildiren مَنْ"],
  examples: [
    { s: "مَا:cerr / الأَمْرُ؟:-", tr: "Mesele ne?", pair: "أَ:mi / فَلَا تُبْغِضُهُ؟:-", pairTr: "Ona buğzetmez misin?" },
    { s: "أَ:mi / لَسْتُ بِرَبِّكُمْ؟:-", tr: "Ben sizin Rabbiniz değil miyim? (A’râf 172)", pair: "قَالُوا:- / بَلَى:mz", pairTr: "Evet (Rabbimizsin) dediler." },
    { s: "أَ:mi / لَمْ تَرَ:- / كَيْفَ:cerr / فَعَلَ رَبُّكَ بِأَصْحَابِ الفِيلِ؟:-", tr: "Rabbinin fil sahiplerine ne yaptığını görmedin mi? (Fîl 1)" }
  ],
  rules: [
    { tr: "Hemze bitişik yazıldığı için kelimenin başında aranır: <span class=\"ar\">أَرَأَيْتُمْ، أَفَلَمْ، أَفَلَا، أَيَعْجِزُ، أَئِذَا، أَإِنَّا، أَأَنْتُمْ</span>." },
    { tr: "Hemzeden sonra <span class=\"ar\">فَـ</span> ya da <span class=\"ar\">وَ</span> gelebilir: <span class=\"ar\">أَفَنَجْعَلُ، أَفَلَا</span>." },
    { tr: "Dikkat: <span class=\"ar\">مَنْ حَفِظَ عَشْرَ آيَاتٍ… عُصِمَ</span> cümlesinde مَنْ soru değil, şart ismidir (\"kim ezberlerse… korunur\")." },
    { tr: "<b>Emr-i hâzır</b>: <span class=\"ar\">عِظُوهُ، بَصِّرُوهُ، احْمَدُوا</span>. <b>Nehy-i hâzır</b>: <span class=\"ar\">لَا تَسُبُّوا، لَا تَضْرِبُوهُ</span>. <span class=\"ar\">لَمْ يَجْمَعْ</span> ise nehiy değil, olumsuz geçmiştir." },
    { tr: "<span class=\"ar\">هَلِ الإِنْتَرْنِتْ كُلُّهَا فَوَائِدُ؟</span>: هَلْ\'den sonra ال gelince lâm kesre alır: <span class=\"ar\">هَلِ</span>." }
  ],
  kaide: ["اقْرَأِ النَّصَّ ثُمَّ اسْتَخْرِجْ مِنْهُ أَدَوَاتِ الاسْتِفْهَامِ وَالأَمْرَ الحَاضِرَ وَالنَّهْيَ الحَاضِرَ.", "اقْرَأِ الآيَاتِ وَالأَحَادِيثَ التَّالِيَةَ ثُمَّ اسْتَخْرِجْ مِنْهَا أَدَوَاتِ الاسْتِفْهَامِ."],
  ex: [
    { type: "reading", num: "٧", ar: "اقْرَأِ النَّصَّ ثُمَّ اسْتَخْرِجْ أَدَوَاتِ الاسْتِفْهَامِ وَالأَمْرَ الحَاضِرَ وَالنَّهْيَ الحَاضِرَ", tr: "Hikâyeyi oku; sonra koyu ifadenin ne olduğunu seç.", title: "مِنْ أَخْبَارِ أَبِي الدَّرْدَاءِ الأَنْصَارِيِّ رَضِيَ اللهُ عَنْهُ",
      text: "هُوَ مِنْ كِبَارِ الصَّحَابَةِ رَضِيَ اللهُ عَنْهُمْ، وَالدَّرْدَاءُ اسْمُ بِنْتِهِ. وَقَدْ كَانَ أَبُو الدَّرْدَاءِ رَضِيَ اللهُ عَنْهُ أَحَدَ أَرْبَعَةٍ جَمَعُوا القُرْآنَ كُلَّهُ فِي عَهْدِ النَّبِيِّ ﷺ؛ فَقَدْ رَوَى البُخَارِيُّ عَنْ أَنَسِ بْنِ مَالِكٍ قَالَ: مَاتَ النَّبِيُّ ﷺ وَلَمْ يَجْمَعِ القُرْآنَ غَيْرُ أَرْبَعَةٍ: أَبُو الدَّرْدَاءِ، وَمُعَاذُ بْنُ جَبَلٍ، وَزَيْدُ بْنُ ثَابِتٍ، وَأَبُو زَيْدٍ. أَرْسَلَهُ الخَلِيفَةُ عُمَرُ بْنُ الخَطَّابِ إِلَى دِمَشْقَ لِيُعَلِّمَ أَهْلَهَا كِتَابَ اللهِ وَسُنَّةَ نَبِيِّهِ. وَذَاتَ يَوْمٍ مَرَّ أَبُو الدَّرْدَاءِ عَلَى أُنَاسٍ يَضْرِبُونَ رَجُلًا وَيَسُبُّونَهُ، فَقَالَ لَهُمْ: مَا الأَمْرُ؟ قَالُوا: أَذْنَبَ ذَنْبًا كَبِيرًا. قَالَ: أَرَأَيْتُمْ لَوْ وَجَدْتُمُوهُ فِي بِئْرٍ، أَفَلَمْ تَكُونُوا تَسْتَخْرِجُونَهُ مِنْهَا؟ قَالُوا: بَلَى. قَالَ: لَا تَسُبُّوا أَخَاكُمْ وَلَا تَضْرِبُوهُ، وَإِنَّمَا عِظُوهُ وَبَصِّرُوهُ، وَاحْمَدُوا اللهَ الَّذِي عَافَاكُمْ مِنَ الوُقُوعِ فِي ذَنْبِهِ الَّذِي وَقَعَ فِيهِ. قَالُوا: أَفَلَا تُبْغِضُهُ وَتَكْرَهُهُ؟ قَالَ: إِنَّمَا أُبْغِضُ عَمَلَهُ، فَإِذَا تَرَكَهُ فَهُوَ أَخِي. فَأَخَذَ الرَّجُلُ يَبْكِي وَيُعْلِنُ تَوْبَتَهُ.",
      textTr: "Ebu’d-Derdâ el-Ensârî’den haberler. O, sahâbenin büyüklerindendir; Derdâ kızının adıdır. Ebu’d-Derdâ, Peygamber ﷺ zamanında Kur’an’ın tamamını toplayan dört kişiden biriydi. Buhârî, Enes b. Mâlik’ten şöyle rivayet eder: \"Peygamber ﷺ vefat ettiğinde Kur’an’ı dört kişiden başkası toplamamıştı: Ebu’d-Derdâ, Muâz b. Cebel, Zeyd b. Sâbit ve Ebû Zeyd.\" Halife Ömer b. Hattâb onu, halkına Allah’ın kitabını ve Peygamberinin sünnetini öğretmesi için Şam’a gönderdi. Bir gün Ebu’d-Derdâ, bir adamı döven ve ona söven insanların yanından geçti ve onlara \"Mesele ne?\" dedi. \"Büyük bir günah işledi\" dediler. \"Onu bir kuyuda bulsaydınız, oradan çıkarmaz mıydınız?\" dedi. \"Evet, çıkarırdık\" dediler. \"Kardeşinize sövmeyin, onu dövmeyin; ona öğüt verin, gözünü açın ve sizi onun düştüğü günaha düşmekten koruyan Allah’a hamdedin\" dedi. \"Ona buğzetmez misin?\" dediler. \"Ben yalnız onun yaptığına buğzederim; onu bırakırsa o benim kardeşimdir\" dedi. Bunun üzerine adam ağlamaya başladı ve tövbesini ilan etti.",
      qa: [
        { q: "مَنْ أَرْسَلَ أَبَا الدَّرْدَاءِ إِلَى دِمَشْقَ؟", a: "أَرْسَلَهُ الخَلِيفَةُ عُمَرُ بْنُ الخَطَّابِ.", tr: "Ebu’d-Derdâ’yı Şam’a kim gönderdi? Halife Ömer b. Hattâb." },
        { q: "لِمَاذَا أَرْسَلَهُ إِلَى دِمَشْقَ؟", a: "لِيُعَلِّمَ أَهْلَهَا كِتَابَ اللهِ وَسُنَّةَ نَبِيِّهِ.", tr: "Niçin gönderdi? Halkına Allah’ın kitabını ve sünneti öğretmesi için." },
        { q: "مَاذَا قَالَ أَبُو الدَّرْدَاءِ عَنِ الرَّجُلِ؟", a: "قَالَ: إِنَّمَا أُبْغِضُ عَمَلَهُ، فَإِذَا تَرَكَهُ فَهُوَ أَخِي.", tr: "Ebu’d-Derdâ adam hakkında ne dedi? \"Yalnız yaptığına buğzederim; onu bırakırsa kardeşimdir.\"" }
      ],
      cls: { opts: [["i", "Soru edatı", "أَدَاةُ اسْتِفْهَامٍ", "cerr"], ["e", "Emr-i hâzır", "أَمْرُ الحَاضِرِ", "ref"], ["n", "Nehy-i hâzır", "نَهْيُ الحَاضِرِ", "nasb"], ["x", "Hiçbiri", "لَيْسَ مِنْهَا", "x"]], ar: "أَدَوَاتُ الاسْتِفْهَامِ وَالأَمْرُ وَالنَّهْيُ", tr: "Koyu ifade soru edatı mı, emr-i hâzır mı, nehy-i hâzır mı, hiçbiri mi?", items: [
        { s: HL("فَقَالَ لَهُمْ: مَا الأَمْرُ؟", "مَا"), a: "i", why: "مَا: şeyi soran soru ismi." },
        { s: HL("أَرَأَيْتُمْ لَوْ وَجَدْتُمُوهُ فِي بِئْرٍ", "أَرَأَيْتُمْ"), a: "i", why: "Başta bitişik hemze: أَ + رَأَيْتُمْ." },
        { s: HL("أَفَلَمْ تَكُونُوا تَسْتَخْرِجُونَهُ مِنْهَا؟", "أَفَلَمْ"), a: "i", why: "Hemze + فَـ + لَمْ: olumsuz soru; cevap بَلَى." },
        { s: HL("لَا تَسُبُّوا أَخَاكُمْ", "لَا تَسُبُّوا"), a: "n", why: "لَا + meczûm muzâri, muhatap: nehy-i hâzır." },
        { s: HL("وَلَا تَضْرِبُوهُ", "لَا تَضْرِبُوهُ"), a: "n", why: "Nehy-i hâzır." },
        { s: HL("وَإِنَّمَا عِظُوهُ", "عِظُوهُ"), a: "e", why: "وَعَظَ يَعِظُ ← عِظُوا + هُ: emr-i hâzır." },
        { s: HL("وَبَصِّرُوهُ", "بَصِّرُوهُ"), a: "e", why: "بَصَّرَ يُبَصِّرُ ← بَصِّرُوا + هُ: emr-i hâzır." },
        { s: HL("وَاحْمَدُوا اللهَ الَّذِي عَافَاكُمْ", "احْمَدُوا"), a: "e", why: "حَمِدَ يَحْمَدُ ← اِحْمَدُوا: emr-i hâzır." },
        { s: HL("قَالُوا: أَفَلَا تُبْغِضُهُ وَتَكْرَهُهُ؟", "أَفَلَا"), a: "i", why: "Hemze + فَـ + لَا: olumsuz soru." },
        { s: HL("وَلَمْ يَجْمَعِ القُرْآنَ غَيْرُ أَرْبَعَةٍ", "لَمْ يَجْمَعِ"), a: "x", why: "لَمْ + meczûm: olumsuz geçmiş; nehiy değil, gâib." },
        { s: HL("لِيُعَلِّمَ أَهْلَهَا كِتَابَ اللهِ", "لِيُعَلِّمَ"), a: "x", why: "\"öğretmesi için\": lâm-ı ta’lîl, emir değil." }
      ]}
    },
    { type: "find", target: "y", num: "٩", ar: "اقْرَأِ الآيَاتِ وَالأَحَادِيثَ التَّالِيَةَ ثُمَّ اسْتَخْرِجْ مِنْهَا أَدَوَاتِ الاسْتِفْهَامِ", tr: "Soru edatı taşıyan kelimelere dokun. Hemze bitişikse bütün kelimeye dokun. Birinde soru edatı yok; dikkat.", items: [
      W("مَنْ حَفِظَ عَشْرَ آيَاتٍ مِنْ أَوَّلِ سُورَةِ الكَهْفِ عُصِمَ مِنَ الدَّجَّالِ.", "Kim Kehf sûresinin başından on âyet ezberlerse Deccâl’den korunur. (Müslim)", "Soru edatı yok: مَنْ burada şart ismidir (kim … ise)."),
      W("[أَيَعْجِزُ] أَحَدُكُمْ أَنْ يَقْرَأَ فِي لَيْلَةٍ ثُلُثَ القُرْآنِ؟ قَالُوا: [وَكَيْفَ] يَقْرَأُ ثُلُثَ القُرْآنِ؟", "Biriniz bir gecede Kur’an’ın üçte birini okumaktan âciz mi kalır? \"Kur’an’ın üçte birini nasıl okur?\" dediler. (Müslim)", "أَيَعْجِزُ: hemze; كَيْفَ: hâl."),
      W("[أَلَا] أُخْبِرُكُمْ بِأَفْضَلَ مِنْ دَرَجَةِ الصِّيَامِ وَالصَّلَاةِ وَالصَّدَقَةِ؟ قَالُوا: بَلَى.", "Size oruç, namaz ve sadaka derecesinden daha üstününü haber vereyim mi? \"Evet\" dediler. (Tirmizî)", "أَلَا: hemze + لَا; cevap بَلَى."),
      W("وَقَالُوا [أَئِذَا] كُنَّا عِظَامًا وَرُفَاتًا [أَإِنَّا] لَمَبْعُوثُونَ خَلْقًا جَدِيدًا", "\"Kemik ve ufalanmış toz olduğumuzda, gerçekten yeni bir yaratılışla diriltilecek miyiz?\" dediler. (İsrâ 98)", "İki soru hemzesi: أَئِذَا ve أَإِنَّا."),
      W("فَيَقُولُ [أَأَنْتُمْ] أَضْلَلْتُمْ عِبَادِي هَؤُلَاءِ {أَمْ} هُمْ ضَلُّوا السَّبِيلَ", "\"Şu kullarımı siz mi saptırdınız, yoksa onlar mı yoldan saptılar?\" der. (Furkân 17)", "أَأَنْتُمْ: seçim hemzesi; أَمْ ile birlikte gelir."),
      W("[أَفَنَجْعَلُ] المُسْلِمِينَ كَالمُجْرِمِينَ؟ [مَا] لَكُمْ [كَيْفَ] تَحْكُمُونَ؟", "Müslümanları suçlular gibi mi tutacağız? Size ne oluyor, nasıl hükmediyorsunuz? (Kalem 35–36)", "أَفَنَجْعَلُ: hemze + فَـ; مَا ve كَيْفَ: soru isimleri."),
      W("[أَلَسْتُ] بِرَبِّكُمْ؟ قَالُوا بَلَى شَهِدْنَا", "\"Ben sizin Rabbiniz değil miyim?\" \"Evet, şahit olduk\" dediler. (A’râf 172)", "أَلَسْتُ: hemze + لَسْتُ (kitapta أَلَسْتَ yazılmış; âyette أَلَسْتُ'dur)."),
      W("[أَلَمْ] تَرَ [كَيْفَ] فَعَلَ رَبُّكَ بِأَصْحَابِ الفِيلِ؟ [أَلَمْ] يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ؟", "Rabbinin fil sahiplerine ne yaptığını görmedin mi? Onların tuzağını boşa çıkarmadı mı? (Fîl 1–2)", "أَلَمْ (iki kez) ve كَيْفَ. Kitapta kaynak \"Nûh 15\" yazılmış; doğrusu Fîl 1–2.")
    ]},
    { type: "reading", ar: "قِرَاءَةٌ حُرَّةٌ", tr: "Serbest okuma: metni oku, sonra metindeki soruların ne sorduğunu seç.", title: "الشَّبَكَةُ الدَّوْلِيَّةُ (الإِنْتَرْنِتْ) وَالعَوْلَمَةُ",
      text: "هُنَاكَ سُؤَالٌ يَشْغَلُ بَالَ النَّاسِ: كَيْفَ أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً؟ وَالجَوَابُ عَلَى هَذَا السُّؤَالِ بَسِيطٌ جِدًّا: أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً بِفَضْلِ الشَّبَكَةِ الدَّوْلِيَّةِ (الإِنْتَرْنِتْ)، لِأَنَّ كُلَّ شَيْءٍ أَصْبَحَ قَرِيبًا مِنَ الإِنْسَانِ؛ فَالَّذِي يَسْكُنُ فِي الشَّرْقِ الأَوْسَطِ يَسْتَطِيعُ أَنْ يَعْرِفَ كُلَّ مَا يَحْدُثُ فِي أُورُبَّا أَوْ فِي اليَابَانِ أَوْ فِي الصِّينِ أَوْ فِي أَمْرِيكَا، وَذَلِكَ عَنْ طَرِيقِ مَوَاقِعِ الإِنْتَرْنِتْ التَّابِعَةِ لِلْجَامِعَاتِ المَشْهُورَةِ، أَوِ التَّابِعَةِ لِلْمُؤَسَّسَاتِ الحُكُومِيَّةِ وَالخَاصَّةِ، أَوِ التَّابِعَةِ لِلْقَنَوَاتِ التِّلْفِزْيُونِيَّةِ المَعْرُوفَةِ فِي العَالَمِ. وَالسُّؤَالُ الآخَرُ الَّذِي يُوَجِّهُهُ إِنْسَانُ هَذَا العَصْرِ هُوَ: هَلِ الإِنْتَرْنِتْ كُلُّهَا فَوَائِدُ، أَوْ هِيَ ضَرَرٌ كُلِّيًّا؟ طَبْعًا، إِنَّ كُلَّ نِعْمَةٍ لَهَا فَوَائِدُ وَلَهَا أَضْرَارٌ، لَهَا حَسَنَاتٌ وَلَهَا سَيِّئَاتٌ، لَهَا إِيجَابِيَّاتٌ وَلَهَا سَلْبِيَّاتٌ؛ هَكَذَا قَانُونُ الحَيَاةِ. مِثْلُ السِّلَاحِ: ذُو حَدَّيْنِ، يَنْفَعُ وَيَضُرُّ؛ إِنْ يَسْتَعْمِلْهُ الإِنْسَانُ فِي الخَيْرِ فَهُوَ خَيْرٌ، وَإِنْ يَسْتَعْمِلْهُ فِي الشَّرِّ فَهُوَ شَرٌّ. هَذَا امْتِحَانُ الإِنْسَانِ تُجَاهَ النِّعْمَةِ. مَا فَوَائِدُ الإِنْتَرْنِتْ يَا تُرَى؟ مِمَّا لَا شَكَّ فِيهِ أَنَّ الشَّبَكَةَ الدَّوْلِيَّةَ فِيهَا فَوَائِدُ كَثِيرَةٌ؛ فَمَثَلًا، الَّذِي يُرِيدُ أَنْ يَحْصُلَ عَلَى كِتَابٍ جَدِيدٍ صَدَرَ فِي أَمْرِيكَا يَسْتَطِيعُ أَنْ يَطْلُبَ ذَلِكَ الكِتَابَ وَيَشْتَرِيَهُ عَنْ طَرِيقِ بِطَاقَةِ الائْتِمَانِ وَيَسْتَلِمَهُ خِلَالَ أَيَّامٍ قَلِيلَةٍ. وَكَذَلِكَ الَّذِي يُرِيدُ أَنْ يَبْحَثَ عَنْ مَوْضُوعٍ مُعَيَّنٍ يَسْتَطِيعُ أَنْ يَجِدَ مَعْلُومَاتٍ كَثِيرَةً مِنَ المَوَاقِعِ العِلْمِيَّةِ الَّتِي تُقَدِّمُ خِدْمَاتٍ عَظِيمَةً لِلْبَاحِثِينَ. وَهُنَاكَ جَامِعَاتٌ مَفْتُوحَةٌ (التَّعْلِيمُ عَنْ بُعْدٍ) تَمْنَحُ إِمْكَانِيَّةَ الدِّرَاسَةِ عَنْ طَرِيقِ الإِنْتَرْنِتْ؛ فَفِي هَذِهِ الجَامِعَاتِ يُتَابِعُ المُتَعَلِّمُ الدُّرُوسَ مِنَ المَوْقِعِ، وَيُقَدِّمُ الامْتِحَانَاتِ عَلَى الإِنْتَرْنِتْ إِلِكْتُرُونِيًّا، وَيَتَخَرَّجُ وَيَحْصُلُ عَلَى الشَّهَادَةِ الجَامِعِيَّةِ.",
      textTr: "İnternet ve Küreselleşme. İnsanların aklını meşgul eden bir soru var: Dünya nasıl küçük bir köy oldu? Cevabı çok basit: Dünya internet sayesinde küçük bir köy oldu; çünkü her şey insana yakın hâle geldi. Orta Doğu’da oturan biri, Avrupa’da, Japonya’da, Çin’de ya da Amerika’da olan her şeyi bilebiliyor. Bu da ünlü üniversitelere, resmî ve özel kurumlara ya da dünyaca bilinen televizyon kanallarına ait internet siteleri sayesinde oluyor. Bu çağın insanının sorduğu diğer soru şudur: İnternet tamamen fayda mı, yoksa tamamen zarar mı? Elbette her nimetin faydaları da zararları da, iyi yanları da kötü yanları da vardır; hayatın kanunu böyledir. Tıpkı silah gibi iki ağızlıdır: fayda da verir, zarar da. İnsan onu hayırda kullanırsa hayırdır, şerde kullanırsa şerdir. Bu, insanın nimet karşısındaki imtihanıdır. Peki internetin faydaları nelerdir? Şüphesiz internetin çok faydası vardır. Örneğin Amerika’da çıkan yeni bir kitabı almak isteyen kişi, onu kredi kartıyla isteyip satın alabilir ve birkaç gün içinde teslim alabilir. Belli bir konuyu araştırmak isteyen de araştırmacılara büyük hizmet sunan bilimsel sitelerden çok bilgi bulabilir. Bir de internet üzerinden okuma imkânı veren açık üniversiteler (uzaktan eğitim) vardır; bu üniversitelerde öğrenci dersleri siteden takip eder, sınavlara internette elektronik olarak girer, mezun olur ve üniversite diplomasını alır.",
      qa: [
        { q: "كَيْفَ أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً؟", a: "أَصْبَحَ قَرْيَةً صَغِيرَةً بِفَضْلِ الشَّبَكَةِ الدَّوْلِيَّةِ (الإِنْتَرْنِتْ).", tr: "Dünya nasıl küçük bir köy oldu? İnternet sayesinde." },
        { q: "هَلِ الإِنْتَرْنِتْ كُلُّهَا فَوَائِدُ؟", a: "لَا، لَهَا فَوَائِدُ وَلَهَا أَضْرَارٌ.", tr: "İnternet tamamen fayda mı? Hayır; faydaları da zararları da var." },
        { q: "مَاذَا تَمْنَحُ الجَامِعَاتُ المَفْتُوحَةُ؟", a: "تَمْنَحُ إِمْكَانِيَّةَ الدِّرَاسَةِ عَنْ طَرِيقِ الإِنْتَرْنِتْ.", tr: "Açık üniversiteler ne imkân verir? İnternetten okuma imkânı." }
      ],
      cls: { opts: NE.slice(0, 9), ar: "عَمَّ يُسْأَلُ فِي النَّصِّ؟", tr: "Metindeki soru ne soruyor?", items: [
        { s: HL("كَيْفَ أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً؟", "كَيْفَ"), a: "h", why: "كَيْفَ: hâl (nasıl)." },
        { s: HL("هَلِ الإِنْتَرْنِتْ كُلُّهَا فَوَائِدُ، أَوْ هِيَ ضَرَرٌ كُلِّيًّا؟", "هَلِ"), a: "c", why: "هَلْ: cümlenin içeriği (evet / hayır). هَلْ ile أَمْ değil أَوْ kullanılmış." },
        { s: HL("مَا فَوَائِدُ الإِنْتَرْنِتْ يَا تُرَى؟", "مَا"), a: "s", why: "مَا: şey." }
      ]}
    }
  ]
}
];

// Doğru Edat oyunu: [cümle {edat}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var IS_POOL = [
  ["{هَلْ} كَتَبْتَ الدَّرْسَ؟ نَعَمْ، كَتَبْتُ.", ["هَلْ", "مَنْ", "كَمْ"], "cevap نَعَمْ: هَلْ", "Dersi yazdın mı? Evet, yazdım.", "u1"],
  ["{أَ}تُحِبُّ السَّفَرَ؟", ["أَ", "مَا", "لِ"], "bitişik soru hemzesi", "Yolculuğu sever misin?", "u1"],
  ["{أَ}أَنْتَ مُدَرِّسٌ أَمْ مُهَنْدِسٌ؟", ["أَ", "هَلْ", "مَنْ"], "أَمْ ile seçim: yalnız hemze", "Öğretmen misin, mühendis mi?", "u1"],
  ["أَتُرِيدُ القَهْوَةَ {أَمِ} الشَّايَ؟", ["أَمِ", "أَوِ", "هَلِ"], "seçim sorusu: أَمْ", "Kahve mi istersin, çay mı?", "u1"],
  ["{هَلْ} شَرِبَ المَرِيضُ الدَّوَاءَ؟", ["هَلْ", "أَمْ", "كَيْفَ"], "evet-hayır sorusu", "Hasta ilacı içti mi?", "u1"],
  ["أَلَسْتَ طَالِبًا؟ {بَلَى}، أَنَا طَالِبٌ.", ["بَلَى", "نَعَمْ", "لَا"], "olumsuz soru, olumlu cevap", "Öğrenci değil misin? Hayır öyle değil, öğrenciyim.", "u2"],
  ["أَلَسْتَ طَالِبًا؟ {نَعَمْ}، لَسْتُ طَالِبًا.", ["نَعَمْ", "بَلَى", "لَا"], "olumsuz soru, olumsuz cevap", "Öğrenci değil misin? Evet, değilim.", "u2"],
  ["أَلَمْ تَقْرَإِ الصَّحِيفَةَ؟ {بَلَى}، قَرَأْتُهَا.", ["بَلَى", "نَعَمْ", "أَمْ"], "olumsuzluk bozuluyor: بَلَى", "Gazeteyi okumadın mı? Hayır öyle değil, okudum.", "u2"],
  ["أَمَا حَضَرَ الوَزِيرُ؟ {نَعَمْ}، مَا حَضَرَ.", ["نَعَمْ", "بَلَى", "هَلْ"], "olumsuzluk onaylanıyor: نَعَمْ", "Bakan gelmedi mi? Evet, gelmedi.", "u2"],
  ["أَلَسْتُ بِرَبِّكُمْ؟ قَالُوا {بَلَى}.", ["بَلَى", "نَعَمْ", "لَا"], "A’râf 172", "Ben Rabbiniz değil miyim? Evet dediler.", "u2"],
  ["{أَيْنَ} تَعِيشُ أُسْرَتُكَ؟", ["أَيْنَ", "مَنْ", "كَمْ"], "yer", "Ailen nerede yaşıyor?", "u3"],
  ["{مَنْ} حَصَلَ عَلَى الجَائِزَةِ؟", ["مَنْ", "مَا", "مَتَى"], "kişi", "Ödülü kim aldı?", "u3"],
  ["{لِمَاذَا} لَمْ تَحْضُرْ زَيْنَبُ؟", ["لِمَاذَا", "أَيْنَ", "كَمْ"], "sebep", "Zeynep niçin gelmedi?", "u3"],
  ["{مَا} اسْمُ المُؤَلِّفِ؟", ["مَا", "مَنْ", "كَيْفَ"], "şey (isim cümlesi)", "Yazarın adı ne?", "u3"],
  ["{مَاذَا} تَأْكُلُ فِي الغَدَاءِ؟", ["مَاذَا", "مَنْ", "أَيْنَ"], "şey (fiil cümlesi)", "Öğlen ne yersin?", "u3"],
  ["{كَمْ} طَالِبًا يَدْرُسُ فِي الكُلِّيَّةِ؟", ["كَمْ", "أَيُّ", "مَنْ"], "sayı + tekil mansûb", "Fakültede kaç öğrenci okuyor?", "u3"],
  ["{أَيَّ} كِتَابٍ تُفَضِّلُ؟", ["أَيَّ", "كَمْ", "مَا"], "seçim + muzâfun ileyh", "Hangi kitabı tercih edersin?", "u3"],
  ["يَا مَرْيَمُ {أَنَّى} لَكِ هَذَا؟", ["أَنَّى", "مَتَى", "كَمْ"], "nereden: أَنَّى (Âl-i İmrân 37)", "Ey Meryem, bu sana nereden?", "u3"],
  ["{كَيْفَ} دَخَلَ الأُسْتَاذُ؟ دَخَلَ مُتَبَسِّمًا.", ["كَيْفَ", "مَتَى", "مَنْ"], "hâl", "Hoca nasıl girdi? Gülümseyerek.", "u4"],
  ["{مَتَى} غَادَرَتِ الحَافِلَةُ؟ قَبْلَ سَاعَةٍ.", ["مَتَى", "أَيْنَ", "كَيْفَ"], "zaman", "Otobüs ne zaman ayrıldı? Bir saat önce.", "u4"],
  ["{أَيْنَ} يَسْكُنُ السُّيَّاحُ؟ فِي الفُنْدُقِ.", ["أَيْنَ", "مَتَى", "لِمَاذَا"], "yer", "Turistler nerede kalıyor? Otelde.", "u4"],
  ["{لِمَاذَا} تَأَخَّرْتَ؟ بِسَبَبِ الازْدِحَامِ.", ["لِمَاذَا", "كَمْ", "مَنْ"], "sebep", "Niçin geciktin? Trafik yüzünden.", "u4"],
  ["{مَنْ} أَلَّفَ «رِيَاضَ الصَّالِحِينَ»؟ الإِمَامُ النَّوَوِيُّ.", ["مَنْ", "مَا", "أَيْنَ"], "kişi", "Riyâzü’s-Sâlihîn’i kim yazdı? İmam Nevevî.", "u4"],
  ["{كَمْ} مُسْلِمًا فِي المَسْجِدِ؟ أَلْفُ مُسْلِمٍ.", ["كَمْ", "أَيْنَ", "مَنْ"], "sayı", "Mescitte kaç Müslüman var? Bin.", "u4"],
  ["فَقَالَ لَهُمْ: {مَا} الأَمْرُ؟", ["مَا", "مَنْ", "مَتَى"], "şey", "Onlara: Mesele ne? dedi.", "u5"],
  ["{أَ}فَلَا تُبْغِضُهُ؟", ["أَ", "هَلْ", "مَا"], "hemze + فَـ + لَا", "Ona buğzetmez misin?", "u5"],
  ["{أَلَمْ} تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الفِيلِ؟", ["أَلَمْ", "هَلْ لَمْ", "مَا لَمْ"], "olumsuz soru: hemze (Fîl 1)", "Rabbinin fil sahiplerine ne yaptığını görmedin mi?", "u5"],
  ["مَا لَكُمْ {كَيْفَ} تَحْكُمُونَ؟", ["كَيْفَ", "كَمْ", "مَنْ"], "hâl (Kalem 36)", "Size ne oluyor, nasıl hükmediyorsunuz?", "u5"],
  ["{كَيْفَ} أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً؟", ["كَيْفَ", "مَنْ", "كَمْ"], "hâl", "Dünya nasıl küçük bir köy oldu?", "u5"],
  ["{هَلِ} الإِنْتَرْنِتْ كُلُّهَا فَوَائِدُ؟", ["هَلِ", "مَنِ", "كَمِ"], "evet-hayır sorusu", "İnternet tamamen fayda mı?", "u5"]
];
// Hangi cevap? oyunu: [soru, kastedilen, doğru, Türkçe]
var BN_LIST = [
  ["هَلْ صَلَّيْتَ؟", "Kıldım.", "نَعَمْ"], ["هَلْ صَلَّيْتَ؟", "Kılmadım.", "لَا"], ["أَلَمْ تُصَلِّ؟", "Kıldım.", "بَلَى"], ["أَلَمْ تُصَلِّ؟", "Kılmadım.", "نَعَمْ"],
  ["أَتُحِبُّ الشَّايَ؟", "Severim.", "نَعَمْ"], ["أَتُحِبُّ الشَّايَ؟", "Sevmem.", "لَا"], ["أَلَا تُحِبُّ الشَّايَ؟", "Severim.", "بَلَى"], ["أَلَا تُحِبُّ الشَّايَ؟", "Sevmem.", "نَعَمْ"],
  ["أَلَسْتَ طَالِبًا؟", "Öğrenciyim.", "بَلَى"], ["أَلَسْتَ طَالِبًا؟", "Öğrenci değilim.", "نَعَمْ"], ["هَلْ أَنْتَ طَالِبٌ؟", "Öğrenciyim.", "نَعَمْ"], ["هَلْ أَنْتَ طَالِبٌ؟", "Öğrenci değilim.", "لَا"],
  ["أَمَا حَضَرَ الوَزِيرُ؟", "Geldi.", "بَلَى"], ["أَمَا حَضَرَ الوَزِيرُ؟", "Gelmedi.", "نَعَمْ"], ["أَذَهَبْتَ إِلَى السُّوقِ؟", "Gittim.", "نَعَمْ"], ["أَلَمْ تَذْهَبْ إِلَى السُّوقِ؟", "Gittim.", "بَلَى"],
  ["أَلَيْسَ اللهُ بِأَحْكَمِ الحَاكِمِينَ؟", "Öyledir.", "بَلَى"], ["أَلَسْتُ بِرَبِّكُمْ؟", "Rabbimizsin.", "بَلَى"]
];
var BN_G = [["نَعَمْ", "Ne’am", "نَعَمْ", "mz"], ["لَا", "Lâ", "لَا", "ref"], ["بَلَى", "Belâ", "بَلَى", "mi"]];
var HAFIZA = {
  an: { name: "Edat ↔ anlam", pairs: EDAT.map(function (e) { return [e[0], e[3]]; }) },
  ne: { name: "Edat ↔ ne sorar", pairs: [["مَنْ", "kişi"], ["مَاذَا", "şey"], ["لِمَاذَا", "sebep"], ["كَيْفَ", "hâl"], ["مَتَى", "zaman"], ["أَيْنَ", "mekân"], ["كَمْ", "sayı"], ["أَيُّ", "seçim"], ["هَلْ", "evet / hayır"]] },
  cv: { name: "Soru ↔ cevap", pairs: [["أَلَسْتَ طَالِبًا؟", "بَلَى، أَنَا طَالِبٌ."], ["هَلْ كَتَبْتَ؟", "نَعَمْ، كَتَبْتُ."], ["مَتَى وَصَلْتَ؟", "وَصَلْتُ أَمْسِ."], ["أَيْنَ سَكَنُكَ؟", "فِي إِسْطَنْبُولَ."], ["كَمْ كِتَابًا قَرَأْتَ؟", "ثَلَاثَةَ كُتُبٍ."], ["مَنْ قَرَأَ السُّورَةَ؟", "قَرَأَهَا عَلِيٌّ."], ["أَشَايًا تُرِيدُ أَمْ قَهْوَةً؟", "قَهْوَةً."], ["لِمَاذَا تَأَخَّرْتَ؟", "بِسَبَبِ الازْدِحَامِ."]] }
};
var KARTLAR = [
  ["Soru edatları kaça ayrılır?", "İkiye: harf (أَ، هَلْ) ve isim (مَنْ، مَا، مَاذَا…)."],
  ["Harf-i istifhamın i’rabı?", "Yoktur: لَا مَحَلَّ لَهُمَا مِنَ الإِعْرَابِ."],
  ["هَلْ sorusuna cevap?", "Evet: نَعَمْ · hayır: لَا"],
  ["Seçim sorusu nasıl sorulur?", "Hemze + أَمْ: أَأَنْتَ مُدَرِّسٌ أَمْ مُهَنْدِسٌ؟ Cevapta biri söylenir."],
  ["أَلَسْتَ طَالِبًا؟ Öğrenciysen?", "بَلَى، أَنَا طَالِبٌ."],
  ["أَلَسْتَ طَالِبًا؟ Öğrenci değilsen?", "نَعَمْ، لَسْتُ طَالِبًا."],
  ["مَنْ ve مَا farkı?", "مَنْ kişiyi (akıllı), مَا / مَاذَا şeyi (akılsız) sorar."],
  ["أَنَّى ne sorar?", "Yer (nereden) ve hâl (nasıl): يَا مَرْيَمُ أَنَّى لَكِ هَذَا؟"],
  ["كَمْ'den sonraki isim?", "Tekil ve mansûb: كَمْ كِتَابًا؟"],
  ["أَيُّ neden farklı?", "İ’rabı lafzen alır ve muzâf olduğu isme göre her şeyi sorar."],
  ["مَنْ حَفِظَ… عُصِمَ: soru mu?", "Hayır, şart: \"kim ezberlerse korunur\"."],
  ["أَلَسْتُ بِرَبِّكُمْ? Cevap?", "قَالُوا بَلَى: \"Evet, Rabbimizsin\"."]
];
