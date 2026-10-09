// ================= VERİ: Hemze ve Yazılışı (الهَمْزَةُ وَكِتَابَتُهَا) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "هَمْزَةُ القَطْعِ", tr: "Hemze-i kat’" }, nasb: { ar: "هَمْزَةُ الوَصْلِ", tr: "Hemze-i vasl" }, cerr: { ar: "الهَمْزَةُ المُتَوَسِّطَةُ وَالمُتَطَرِّفَةُ", tr: "Ortada / sonda hemze" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var KV = [["k", "Hemze-i kat’", "هَمْزَةُ قَطْعٍ", "mz"], ["v", "Hemze-i vasl", "هَمْزَةُ وَصْلٍ", "nasb"]];
var SEAT = [["a", "Elif üzerinde", "عَلَى الأَلِفِ (أ)", "nasb"], ["w", "Vav üzerinde", "عَلَى الوَاوِ (ؤ)", "cerr"], ["y", "Nebre üzerinde", "عَلَى النَّبْرَةِ (ئ)", "mi"], ["m", "Tek başına", "مُنْفَرِدَةٌ (ء)", "ref"]];
var KIND = [["k", "Kat’ (başta)", "هَمْزَةُ قَطْعٍ", "mz"], ["v", "Vasl", "هَمْزَةُ وَصْلٍ", "nasb"], ["o", "Ortada", "مُتَوَسِّطَةٌ", "cerr"], ["s", "Sonda", "مُتَطَرِّفَةٌ", "ref"]];
var TUR_TR = { k: "Kat’", v: "Vasl", a: "Elif", w: "Vav", y: "Nebre", m: "Tek başına", o: "Ortada", s: "Sonda" };
// Makine: konum × önceki harf × hemzenin harekesi → [örnek, yazılış, kural]
var HP = ["Başta", "Ortada", "Sonda"];
var HPV = ["Üstün", "Ötre", "Esre", "Sâkin", "Med elifi"];
var HOW = ["Üstün", "Ötre", "Esre", "Sükûn"];
var HINI = [["أَحْمَدُ · أَعْطَى", "أ", "Kelime başında üstünlü hemze elifin üstüne yazılır."], ["أُمُورٌ · أُخِذَ", "أ", "Kelime başında ötreli hemze de elifin üstüne yazılır."], ["إِنْشَاءٌ · إِحْسَانٌ", "إ", "Kelime başında esreli hemze elifin altına yazılır."], ["", "—", "Kelime sâkin bir harfle başlamaz."]];
var HMID = [
  [["سَأَلَ · مُكَافَأَةٌ", "أ", "Üstünden sonra üstünlü hemze: elif üzerinde."], ["رَؤُوفٌ · يَؤُوبُ", "ؤ", "Ötre üstünden güçlüdür: vav üzerinde."], ["سَئِمَ · يَئِسَ", "ئ", "Esre en güçlüdür: nebre üzerinde."], ["رَأْسٌ · يَأْخُذُ", "أ", "Sâkin hemze, önceki harf üstünlü: elif üzerinde."]],
  [["مُؤَجَّلٌ · مُؤَنَّثٌ", "ؤ", "Ötreden sonra üstünlü hemze: vav üzerinde."], ["رُؤُوسٌ · كُؤُوسٌ", "ؤ", "Ötreden sonra ötreli hemze: vav üzerinde."], ["سُئِلَ · رُئِسَ", "ئ", "Esre en güçlüdür: nebre üzerinde."], ["مُؤْمِنٌ · يُؤْثِرُ", "ؤ", "Ötreden sonra sâkin hemze: vav üzerinde."]],
  [["فِئَةٌ · مِئَةٌ", "ئ", "Esreden sonra üstünlü hemze: nebre üzerinde."], ["سَنُقْرِئُكَ · مَبَادِئُكَ", "ئ", "Esreden sonra ötreli hemze: nebre üzerinde."], ["مُتَّكِئِينَ · تُنْشِئِينَ", "ئ", "Esreden sonra esreli hemze: nebre üzerinde."], ["بِئْرٌ · مِئْذَنَةٌ", "ئ", "Esreden sonra sâkin hemze: nebre üzerinde."]],
  [["مَسْأَلَةٌ · فَجْأَةٌ", "أ", "Sâkin sahih harften sonra hemzenin kendi harekesine bakılır: üstün → elif."], ["مَسْؤُولٌ · مَذْؤُومٌ", "ؤ", "Sâkinden sonra ötreli hemze: vav üzerinde."], ["أَسْئِلَةٌ · جُزْئِيَّةٌ", "ئ", "Sâkinden sonra esreli hemze: nebre üzerinde."], ["", "—", "İki sâkin yan yana gelmez."]],
  [["تَسَاءَلَ · عَبَاءَةٌ", "ء", "Med elifinden sonra üstünlü hemze tek başına yazılır."], ["تَفَاؤُلٌ · تَشَاؤُمٌ", "ؤ", "Med elifinden sonra ötreli hemze: vav üzerinde."], ["سَائِلٌ · قَائِمٌ", "ئ", "Esreli hemze: nebre üzerinde."], ["", "—", "Med harfinden sonra sâkin hemze gelmez."]]
];
var HFIN = [["قَرَأَ · الخَطَأُ", "أ", "Sondaki hemze önceki harfin harekesine göre yazılır: üstün → elif."], ["اللُّؤْلُؤُ · التَّهَيُّؤُ", "ؤ", "Önceki harf ötreli → vav."], ["قَارِئٌ · يَتَّكِئُ", "ئ", "Önceki harf esreli → ya."], ["المَرْءُ · الجُزْءُ · دِفْءٌ", "ء", "Önceki harf sâkin → tek başına."], ["سَمَاءٌ · وُضُوءٌ · فَيْءٌ", "ء", "Önceki harf med (ya da sâkin) → tek başına."]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function QH(s) { return s.replace("ء", '<b class="hl">ء</b>'); }
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
// Hemze + yazılış sebebi: [cümle, [kelime ×3], sebep anahtarı, Türkçe, açıklama]
var SBH = {
  wfd: "كُتِبَتْ عَلَى الوَاوِ؛ لِأَنَّهَا مَفْتُوحَةٌ بَعْدَ ضَمٍّ", mmd: "كُتِبَتْ مُنْفَرِدَةً؛ لِأَنَّهَا مَفْتُوحَةٌ بَعْدَ مَدٍّ", msk: "كُتِبَتْ مُنْفَرِدَةً؛ لِأَنَّهَا مُتَطَرِّفَةٌ بَعْدَ سَاكِنٍ",
  yfk: "كُتِبَتْ عَلَى النَّبْرَةِ؛ لِأَنَّهَا مَفْتُوحَةٌ بَعْدَ كَسْرٍ", afs: "كُتِبَتْ عَلَى الأَلِفِ؛ لِأَنَّهَا مَفْتُوحَةٌ بَعْدَ سَاكِنٍ صَحِيحٍ", wds: "كُتِبَتْ عَلَى الوَاوِ؛ لِأَنَّهَا مَضْمُومَةٌ بَعْدَ سَاكِنٍ",
  yk: "كُتِبَتْ عَلَى النَّبْرَةِ؛ لِأَنَّهَا مَكْسُورَةٌ", aff: "كُتِبَتْ عَلَى الأَلِفِ؛ لِأَنَّهَا مَفْتُوحَةٌ بَعْدَ فَتْحٍ"
};
var TSH = { wfd: ["wfd", "aff", "yk"], mmd: ["mmd", "aff", "msk"], msk: ["msk", "mmd", "afs"], yfk: ["yfk", "aff", "wfd"], afs: ["afs", "aff", "msk"], wds: ["wds", "wfd", "afs"], yk: ["yk", "yfk", "mmd"], aff: ["aff", "afs", "wfd"] };
function HS(x, i) { return CBP([x[0] + "<br>الهَمْزَةُ:", x[1], "<br>السَّبَبُ:", TSH[x[2]].map(function (k) { return SBH[k]; })], i, x[3], x[4]); }

var METIN = "كَانَتْ هَالَةُ الصَّغِيرَةُ تُحِبُّ الذَّهَابَ إِلَى بَيْتِ جَدِّهَا وَأَعْمَامِهَا، وَكَانَتْ تُحِبُّ أَنْ يُرَحِّبُوا بِهَا، وَأَنْ يُحِبُّوا جُلُوسَهَا بَيْنَهُمْ. كَانَتْ تُكْثِرُ مِنَ الحَدِيثِ مَعَهُمْ، وَكَانَتْ تَحْكِي طَوِيلًا عَنِ القَصَصِ الَّتِي تَحْصُلُ فِي بَيْتِهِمْ، وَمَا يَجْرِي بَيْنَ أَفْرَادِ عَائِلَتِهَا، وَكَانَتْ تَشْعُرُ بِأَنَّهُمْ يَهْتَمُّونَ بِأَحَادِيثِهَا، وَخُصُوصًا عِنْدَمَا تَتَحَدَّثُ عَنْ شِجَارٍ حَصَلَ بَيْنَ وَالِدَيْهَا." +
  "<br>بَعْدَ مُدَّةٍ لَاحَظَتْ هَالَةُ أَنَّ زَوْجَةَ عَمِّهَا بَدَأَتْ تَسْأَلُهَا عَنْ أُمُورٍ تَخُصُّ عَائِلَتَهَا، وَأَنَّهَا تَسْأَلُ عَنْ عَلَاقَةِ وَالِدَيْهَا بِبَعْضِهِمَا، وَعَنْ عَلَاقَةِ إِخْوَتِهَا بِوَالِدَيْهَا كَذَلِكَ، وَكَانَتْ هَالَةُ تَبْدَأُ فِي الحَدِيثِ مَعَ أَوَّلِ قَضْمَةٍ مِنَ الحَلْوَى الَّتِي تَصْنَعُهَا لَهَا زَوْجَةُ عَمِّهَا." +
  "<br>فِي إِحْدَى المَرَّاتِ، وَبَيْنَمَا كَانَتْ تَقْتَرِبُ مِنْ بَابِ غُرْفَةِ الطَّعَامِ، سَمِعَتْ زَوْجَةَ عَمِّهَا تَقُولُ لِابْنَتِهَا: «هَذِهِ أُمُورٌ تَخُصُّ عَائِلَتَنَا وَحْدَهَا، وَلَا أُرِيدُ أَنْ تُصْبِحَ أَسْرَارُنَا مِلْكًا لِلْجَمِيعِ، فَهَلْ تُرِيدِينَ أَنْ تَكُونِي مِثْلَ هَالَةَ وَتُؤْذِي أَهْلَكِ وَوَالِدَتَكِ عِنْدَمَا تُذِيعِينَ أُمُورًا حَصَلَتْ مَعَهُمْ أَمَامَ الجَمِيعِ؟»" +
  "<br>عَلِمَتْ هَالَةُ حِينَئِذٍ أَنَّ مَا تَفْعَلُهُ يُشَوِّهُ صُورَتَهَا فِي عُيُونِ مَنْ يَسْتَمِعُ إِلَيْهَا، وَتَخَيَّلَتْ كَمْ آذَتْ نَفْسَهَا وَعَائِلَتَهَا عِنْدَمَا جَعَلَتْ قَصَصَ شِجَارَاتِهِمْ وَأَحَادِيثِهِمْ مَعْرُوضَةً لِلْجَمِيعِ! وَقَرَّرَتْ مُنْذُ تِلْكَ اللَّحْظَةِ أَنْ تَلْتَزِمَ الصَّمْتَ خَارِجَ المَنْزِلِ، وَأَلَّا تُؤْذِيَ عَائِلَتَهَا عِنْدَمَا تَتَحَدَّثُ عَنْ أَسْرَارِهِمْ لِلْغُرَبَاءِ أَوْ حَتَّى لِأَقَارِبِهِمْ، وَأَلَّا تَظْهَرَ لِلْجَمِيعِ وَكَأَنَّهَا ثَرْثَارَةٌ لَا تَعْرِفُ كَيْفَ تَضْبِطُ نَفْسَهَا، أَوْ أَنَّهَا مَا تَزَالُ صَغِيرَةً يُمْكِنُهُمْ مِنْ خِلَالِهَا كَشْفُ الأَسْرَارِ." +
  "<br>كَانَتْ هَذِهِ قِصَّةَ هَالَةَ، وَقَدْ تَعَلَّمَتْ مِمَّا حَصَلَ مَعَهَا الكَثِيرَ، وَقَرَّرَتْ أَنْ تَحْفَظَ أَسْرَارَ عَائِلَتِهَا جَيِّدًا بَعْدَ ذَلِكَ الدَّرْسِ، وَفَهِمَتْ أَنَّ الشِّجَارَاتِ العَائِلِيَّةَ وَمَا يَحْصُلُ بَيْنَ الوَالِدَيْنِ وَبَيْنَ الإِخْوَةِ مِنَ الأَسْرَارِ، وَأَنَّهَا يَجِبُ أَنْ تَلْتَزِمَ الصَّمْتَ فِي كُلِّ مَا قَدْ يَجْعَلُ الآخَرِينَ يَتَسَلَّوْنَ بِقَصَصِهِمْ." +
  "<br>الكَثِيرُ مِنَ الأَوْلَادِ يَفْعَلُونَ مِثْلَ هَالَةَ دُونَ أَنْ يَنْتَبِهُوا لِلْأَمْرِ، وَيَفْعَلُونَهُ بِبَرَاءَةٍ، دُونَ أَنْ يَعْرِفُوا الفَرْقَ بَيْنَ مَا يَجِبُ أَنْ يَقُولُوهُ وَمَا لَا يَجِبُ أَنْ يُقَالَ. وَقَدْ تَكُونُ أَنْتَ أَوْ أَحَدُ إِخْوَتِكَ أَوْ أَصْحَابِكَ مِنْهُمْ، وَلَكِنَّكَ عَرَفْتَ الآنَ أَنَّ هَذَا خَطَأٌ كَبِيرٌ نُتْعِبُ بِهِ أَهْلَنَا وَأَنْفُسَنَا، وَأَنَّنَا لَوْ بَقِينَا نُذِيعُ الأَسْرَارَ فَسَوْفَ:" +
  "<br>• يَبْتَعِدُ مَنْ حَوْلَنَا بِأَسْرَارِهِ عَنَّا.<br>• سَيُعَامِلُونَنَا كَصِغَارٍ وَغَيْرِ مَسْؤُولِينَ.<br>• سَنَشْعُرُ بِالوَحْدَةِ، وَبِأَنَّ أَهْلَنَا يَتَضَايَقُونَ مِنَّا.<br>• سَيَغْضَبُ أَهْلُنَا مِنَّا، وَهَذَا سَيُؤَدِّي إِلَى غَضَبِ اللهِ عَلَيْنَا بِالتَّأْكِيدِ.<br>• سَيُؤَنِّبُنَا ضَمِيرُنَا وَنَحْنُ نَرَى أَنَّنَا تَسَبَّبْنَا فِي الآلَامِ لِعَائِلَتِنَا.";

var UNITS = [
// ---------------------------------------------------------------- 1 · KAT’ VE VASL
{
  id: "u1", no: 1, ar: "هَمْزَةُ القَطْعِ وَهَمْزَةُ الوَصْلِ", tr: "Hemze-i Kat’ ve Hemze-i Vasl", short: "Kat’ · vasl", col: "mz", legend: ["mz", "nasb"],
  goals: ["Hemzenin hareke alan elif olduğunu ve başta, ortada, sonda gelebildiğini bilmek", "Hemze-i kat’ın hem başta hem ulamada okunduğunu, vaslın ise ulamada düştüğünü bilmek", "Kat’ hemzesini أ / إ, vasl hemzesini yalın ا ile yazmak"],
  examples: [
    { s: "﴿إِنَّا:mz / أَعْطَيْنَاكَ:mz / الكَوْثَرَ﴾:-", tr: "Şüphesiz biz sana Kevser’i verdik. (Kevser 1)", pair: "﴿هَلْ جَزَاءُ:- / الْإِحْسَانِ:mz / إِلَّا:mz / الْإِحْسَانُ﴾:-", pairTr: "İyiliğin karşılığı iyilikten başka mıdır? (Rahmân 60)" },
    { s: "أَقْبِلْ:mz / يَا رَجُلُ،:- / وَيَا رَجُلُ:- / أَقْبِلْ.:mz", tr: "Gel ey adam! (kat’: her iki durumda okunur)", pair: "اُدْخُلْ:nasb / يَا رَجُلُ،:- / يَا رَجُلُ:- / ادْخُلْ!:nasb", pairTr: "Gir ey adam! (vasl: ulamada okunmaz)" },
    { s: "﴿اِعْمَلُوا:nasb / آلَ دَاوُودَ شُكْرًا﴾:-", tr: "Ey Dâvûd ailesi, şükür olarak çalışın. (Sebe’ 13)", pair: "﴿وَقُلِ:- / اعْمَلُوا:nasb / فَسَيَرَى اللهُ عَمَلَكُمْ﴾:-", pairTr: "De ki: Çalışın; Allah amelinizi görecektir. (Tevbe 105)" }
  ],
  rules: [
    { tr: "<b>Hemze</b>, hareke alan eliftir (<span class=\"ar\">أَ، أُ، إِ</span>); kelimenin başında (<span class=\"ar\">أَسَدٌ، أُخِذَ، إِحْسَانٌ</span>), ortasında (<span class=\"ar\">سَأَلَ، سُئِلَ</span>) ve sonunda (<span class=\"ar\">قَرَأَ، يُنَبَّأُ</span>) gelir. Başta iki türlüdür: kat’ ve vasl." },
    { tr: "<b>Hemze-i kat’</b> hem söze başlarken hem ulamada okunur; üstünlü ve ötreliyse elifin <b>üstüne</b>, esreliyse <b>altına</b> yazılır: <span class=\"ar\">أَوْفَدَ، أُخِذَ، إِقْبَالٌ</span>; ulamada da okunur: <span class=\"ar\">وَيَا رَجُلُ أَقْبِلْ</span>." },
    { tr: "<b>Hemze-i vasl</b> yalnız söze başlarken okunur, ulamada düşer; hemze işareti konmadan <b>yalın elif</b> yazılır: <span class=\"ar\">اِنْتَشَرَ ← فَانْتَشَرَ</span>, <span class=\"ar\">اُدْخُلْ ← يَا رَجُلُ ادْخُلْ</span>, <span class=\"ar\">القَلَمُ ← وَالقَلَمُ</span>." },
    { tr: "Ayırt etme ipucu: kelimenin önüne <span class=\"ar\">وَ</span> ya da <span class=\"ar\">فَ</span> koy: hemze okunuyorsa kat’ (<span class=\"ar\">وَأَكْرَمَ</span>), okunmuyorsa vasl (<span class=\"ar\">وَاجْتَمَعَ</span>)." }
  ],
  kaide: ["الهَمْزَةُ: هِيَ الأَلِفُ المُتَحَرِّكَةُ (أَ، أُ، إِ) الَّتِي تَقْبَلُ الحَرَكَاتِ، وَتَقَعُ فِي أَوَّلِ الكَلِمَةِ: (أَسَدٌ، أَعْطَى، أُخِذَ، إِحْسَانٌ)، وَفِي وَسَطِهَا: (سَأَلَ، سُئِلَ، شَؤُمَ)، وَفِي آخِرِهَا: (قَرَأَ، يُنَبَّأُ). وَهِيَ نَوْعَانِ: هَمْزَةُ القَطْعِ وَهَمْزَةُ الوَصْلِ.", "١ ـ هَمْزَةُ القَطْعِ: وَهِيَ الَّتِي تَثْبُتُ فِي بَدْءِ الكَلَامِ وَفِي وَصْلِهِ. وَهِيَ هَمْزَةٌ يُنْطَقُ بِهَا دَائِمًا، وَتُكْتَبُ فَوْقَ الأَلِفِ إِذَا جَاءَتْ مَفْتُوحَةً (أَوْفَدَ) أَوْ مَضْمُومَةً (أُخِذَ)، وَتُكْتَبُ تَحْتَ الأَلِفِ إِذَا كَانَتْ مَكْسُورَةً (إِقْبَالٌ): أَقْبِلْ يَا رَجُلُ، وَيَا رَجُلُ أَقْبِلْ.", "٢ ـ هَمْزَةُ الوَصْلِ: وَهِيَ الَّتِي يُنْطَقُ بِهَا فِي بَدْءِ الكَلَامِ وَيَسْقُطُ النُّطْقُ بِهَا فِي وَصْلِهِ، وَتُكْتَبُ أَلِفُهَا مُجَرَّدَةً مِنَ الهَمْزَةِ (ء) فِي بَدْءِ الكَلَامِ وَفِي وَصْلِهِ، مِثْلُ: اِنْتَشَرَ، فَانْتَشَرَ. اُدْخُلْ يَا رَجُلُ، يَا رَجُلُ ادْخُلْ، اِعْمَلْ وَاعْمَلْ، اَلْقَلَمُ وَالقَلَمُ."],
  ex: [
    { type: "classify", num: "١", opts: KV, ar: "عَيِّنْ نَوْعَ الهَمْزَةِ فِي الجُمَلِ الآتِيَةِ وَاضْبِطْهَا", tr: "Koyu kelimenin başındaki hemze kat’ mı, vasl mı? (Hemze işaretleri kaldırıldı; doğru yazılış açıklamada.)", exHtml: "<span class=\"ar\">اشْكُرْ مَنْ صَنَعَ المَعْرُوفَ ← اشْكُرْ: هَمْزَةُ وَصْلٍ · أَعْجَبَنِي اسْتِبْشَارُكَ ← أَعْجَبَنِي: هَمْزَةُ قَطْعٍ</span>", items: CL([
      [HL("مَنِ اسْتَمْسَكَ بِالحَقِّ فَازَ.", "اسْتَمْسَكَ"), "v", "İstif’âl mâzisi: vasl; ulamada okunmaz (مَنِ اسْتَمْسَكَ)."],
      [HL("اثْقَلُ النَّاسِ حِمْلًا اكْثَرُهُمْ مَسْؤُولِيَّةً.", "اثْقَلُ"), "k", "İsm-i tafdîl: kat’ (أَثْقَلُ، أَكْثَرُهُمْ)."],
      [HL("تَنَاسَ الشَّرَّ وَاذْكُرِ الخَيْرَ.", "وَاذْكُرِ"), "v", "Sülâsî emir: vasl (وَاذْكُرْ)."],
      [HL("اذَا عَلِمْتَ فَاعْمَلْ بِعِلْمِكَ.", "اذَا"), "k", "Harf / zarf: kat’ (إِذَا). فَاعْمَلْ ise vasl."],
      [HL("اسْتَغْفَرْتُ لِذُنُوبِي.", "اسْتَغْفَرْتُ"), "v", "İstif’âl: vasl (اِسْتَغْفَرْتُ)."],
      [HL("احْسِنْ إِلَى النَّاسِ تَسْتَعْبِدْ قُلُوبَهُمْ.", "احْسِنْ"), "k", "İf’âl emri: kat’ (أَحْسِنْ)."],
      [HL("إِذَا سَمِعْتَ الدَّرْسَ فَانْتَبِهْ.", "فَانْتَبِهْ"), "v", "İfti’âl emri: vasl (فَانْتَبِهْ)."],
      [HL("إِذَا سَمِعْتُ الدَّرْسَ فَانْتَبِهُ.", "فَانْتَبِهُ"), "k", "Muzâri, أَنَا: kat’ (فَأَنْتَبِهُ)."]
    ]) },
    { type: "classify", extra: true, opts: KV, ar: "هَمْزَةُ قَطْعٍ أَمْ هَمْزَةُ وَصْلٍ؟", tr: "Kelimenin başındaki hemze kat’ mı, vasl mı?", items: CL([
      ["اَحْمَدُ", "k", "İsim: أَحْمَدُ."], ["اُمُورٌ", "k", "Çoğul isim: أُمُورٌ."], ["اِنْشَاءٌ", "k", "İf’âl masdarı: إِنْشَاءٌ."], ["اَكْرَمَ", "k", "İf’âl mâzisi: أَكْرَمَ."], ["اَكْرِمْ", "k", "İf’âl emri: أَكْرِمْ."], ["اِكْرَامٌ", "k", "İf’âl masdarı: إِكْرَامٌ."], ["اَكْتُبُ (أَنَا)", "k", "Muzâri أَنَا: أَكْتُبُ."], ["اِنَّ", "k", "Harf: إِنَّ."],
      ["اِجْتَمَعَ", "v", "Hümâsî mâzi."], ["اِجْتَمِعْ", "v", "Hümâsî emir."], ["اِجْتِمَاعٌ", "v", "Hümâsî masdar."], ["اِسْتَخْرَجَ", "v", "Südâsî mâzi."], ["اِسْتِخْرَاجٌ", "v", "Südâsî masdar."], ["اُكْتُبْ", "v", "Sülâsî emir."], ["اِجْلِسْ", "v", "Sülâsî emir."], ["اَلْقَلَمُ", "v", "Harf-i tarif ال."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · BAŞTA HEMZE
{
  id: "u2", no: 2, ar: "كِتَابَةُ الهَمْزَةِ فِي أَوَّلِ الكَلِمَةِ", tr: "Kelime Başında Hemze", short: "Başta", col: "nasb", legend: ["mz", "nasb"],
  goals: ["Hümâsî ve südâsî fiilin mâzi, emir ve masdarındaki hemzenin vasl olduğunu bilmek", "Sülâsî emrin hemzesinin vasl, if’âl bâbının hemzelerinin kat’ olduğunu bilmek", "Başta kat’ hemzesini doğru yazmak: أَ، أُ، إِ"],
  examples: [
    { s: "اِجْتَمَعَ:nasb / الطُّلَّابُ،:- / اِجْتَمِعُوا!:nasb / الاجْتِمَاعُ:nasb / مُهِمٌّ.:-", tr: "Öğrenciler toplandı; toplanın! Toplantı önemli. (hümâsî: vasl)", pair: "أَكْرَمَ:mz / الضَّيْفَ،:- / أَكْرِمْ!:mz / الإِكْرَامُ:mz / وَاجِبٌ.:-", pairTr: "Misafire ikram etti; ikram et! İkram vaciptir. (if’âl: kat’)" }
  ],
  rules: [
    { tr: "<b>Vasl</b> hemzeleri:<br>• hümâsî ve südâsî fiilin mâzi, emir, masdarı: <span class=\"ar\">اِجْتَمَعَ، اِجْتَمِعْ، اِجْتِمَاعٌ · اِسْتَخْرَجَ، اِسْتَخْرِجْ، اِسْتِخْرَاجٌ</span><br>• sülâsî emir: <span class=\"ar\">اِقْرَأْ، اُكْتُبْ، اِجْلِسْ، اُنْظُرْ</span><br>• harf-i tarif: <span class=\"ar\">اَلْقَلَمُ ← وَالقَلَمُ</span>" },
    { tr: "<b>Kat’</b> hemzeleri: <b>if’âl</b> bâbının mâzi, emir ve masdarı (<span class=\"ar\">أَكْرَمَ، أَكْرِمْ، إِكْرَامٌ</span>); muzâride <span class=\"ar\">أَنَا</span> hemzesi (<span class=\"ar\">أَكْتُبُ</span>); isimler (<span class=\"ar\">أَحْمَدُ، أَخْضَرُ</span>); harfler (<span class=\"ar\">إِنَّ، أَنْ</span>)." },
    { tr: "Kelime başındaki kat’ hemzesi her zaman <b>elif</b> üzerinde (üstün, ötre) ya da altında (esre) yazılır: <span class=\"ar\">أَلْعَبُ، أُمُورٌ، إِنْشَاءٌ</span>." },
    { tr: "Not: kitapta geçmese de <span class=\"ar\">اِبْنٌ، اِسْمٌ، اِمْرَأَةٌ، اِثْنَانِ</span> gibi birkaç ismin hemzesi de vasldır." }
  ],
  kaide: ["مُلَاحَظَةٌ: الهَمْزَةُ الوَارِدَةُ فِي المَاضِي وَالأَمْرِ وَالمَصْدَرِ لِلْفِعْلِ الخُمَاسِيِّ وَالسُّدَاسِيِّ، وَكَذَلِكَ الهَمْزَةُ الوَارِدَةُ فِي صِيغَةِ الأَمْرِ لِلْفِعْلِ الثُّلَاثِيِّ، كُلُّهَا هَمَزَاتُ وَصْلٍ، مِثْلُ: اِجْتَمَعَ، اِجْتَمِعْ، اِجْتِمَاعٌ، اِسْتَخْرَجَ، اِسْتَخْرِجْ، اِسْتِخْرَاجٌ، اِقْرَأْ، اُكْتُبْ، اِجْلِسْ، اُنْظُرْ؛ إِلَّا أَنَّ هَمَزَاتِ بَابِ الإِفْعَالِ فَإِنَّهَا هَمَزَاتُ قَطْعٍ، مِثْلُ: أَفْعَلَ، أَفْعِلْ، إِفْعَالٌ: أَكْرَمَ، أَكْرِمْ، إِكْرَامٌ.", "٣ ـ كِتَابَةُ الهَمْزَةِ فِي أَوَّلِ الكَلِمَةِ: الهَمْزَةُ فِي أَوَّلِ الكَلِمَةِ هِيَ هَمْزَةُ القَطْعِ الَّتِي مَرَّتْ آنِفًا، وَتُكْتَبُ عَلَى أَلِفٍ، سَوَاءٌ أَكَانَتْ مَفْتُوحَةً (أَلْعَبُ) أَمْ مَضْمُومَةً (أُمُورٌ) أَمْ مَكْسُورَةً (إِنْشَاءٌ)، وَسَوَاءٌ أَكَانَتْ فِي الاسْمِ (أَحْمَدُ، أَخْضَرُ) أَمْ فِي الفِعْلِ (أَيْنَعَ، أَقْبَلَ) أَمْ فِي الحَرْفِ (إِنَّ، أَنْ)."],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "اكْتُبِ الكَلِمَةَ بِهَمْزَتِهَا الصَّحِيحَةِ", tr: "Boşluğa doğru yazılmış biçimi seç.", items: PL([
      ["___ الطَّالِبُ الكِتَابَ مِنْ حَقِيبَتِهِ. (çıkardı)", "أَخْرَجَ", "اَخْرَجَ", "إِخْرَجَ", "Öğrenci kitabı çantasından çıkardı.", "İf’âl: kat’, üstün → أَ."],
      ["___ الطُّلَّابُ فِي القَاعَةِ. (toplandı)", "اِجْتَمَعَ", "أَجْتَمَعَ", "إِجْتَمَعَ", "Öğrenciler salonda toplandı.", "Hümâsî: vasl, yalın elif."],
      ["___ إِلَى الصُّورَةِ! (bak)", "اُنْظُرْ", "أُنْظُرْ", "إِنْظُرْ", "Resme bak!", "Sülâsî emir: vasl."],
      ["___ الضَّيْفِ وَاجِبٌ. (ikram)", "إِكْرَامُ", "اِكْرَامُ", "أَكْرَامُ", "Misafire ikram vaciptir.", "İf’âl masdarı: kat’, esre → إِ."],
      ["___ المَعَادِنِ صَعْبٌ. (çıkarma)", "اِسْتِخْرَاجُ", "إِسْتِخْرَاجُ", "أَسْتِخْرَاجُ", "Madenleri çıkarmak zordur.", "Südâsî masdar: vasl."],
      ["___ كِتَابًا كُلَّ أُسْبُوعٍ. (okurum)", "أَقْرَأُ", "اَقْرَأُ", "اِقْرَأُ", "Her hafta bir kitap okurum.", "Muzâri أَنَا: kat’."],
      ["___ ضَيْفَكَ! (ikram et)", "أَكْرِمْ", "اِكْرِمْ", "إِكْرِمْ", "Misafirine ikram et!", "İf’âl emri: kat’."],
      ["___ فِي مَكَانِكَ! (otur)", "اِجْلِسْ", "إِجْلِسْ", "أَجْلِسْ", "Yerinde otur!", "Sülâsî emir: vasl."],
      ["هَذِهِ ___ مُهِمَّةٌ. (işler)", "أُمُورٌ", "اُمُورٌ", "ؤُمُورٌ", "Bunlar önemli işler.", "İsim başında ötreli kat’ hemzesi elif üstünde."],
      ["___ كَانَتِ الأَشْجَارُ. (meyve verdi)", "أَيْنَعَتِ", "اَيْنَعَتِ", "إِيْنَعَتِ", "Ağaçlar meyve verdi.", "İf’âl: أَيْنَعَ."]
    ])},
    { type: "classify", extra: true, opts: KV, ar: "هَمْزَةُ قَطْعٍ أَمْ وَصْلٍ؟ (فِي الوَصْلِ)", tr: "Önüne وَ / فَ gelince hemze okunuyor mu?", items: CL([
      [HL("وَاجْتَمَعَ النَّاسُ", "وَاجْتَمَعَ"), "v", "Okunmaz: vasl."], [HL("وَأَكْرَمَ الضَّيْفَ", "وَأَكْرَمَ"), "k", "Okunur: kat’."], [HL("فَانْتَشَرَ الخَبَرُ", "فَانْتَشَرَ"), "v", "Vasl."], [HL("وَأُخِذَ المَالُ", "وَأُخِذَ"), "k", "Kat’."],
      [HL("يَا رَجُلُ ادْخُلْ", "ادْخُلْ"), "v", "Vasl."], [HL("يَا رَجُلُ أَقْبِلْ", "أَقْبِلْ"), "k", "Kat’."], [HL("وَالقَلَمُ", "وَالقَلَمُ"), "v", "ال: vasl."], [HL("وَإِحْسَانٌ", "وَإِحْسَانٌ"), "k", "Kat’."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · ORTADA HEMZE
{
  id: "u3", no: 3, ar: "كِتَابَةُ الهَمْزَةِ المُتَوَسِّطَةِ", tr: "Kelime Ortasında Hemze", short: "Ortada", col: "cerr", legend: ["cerr"],
  goals: ["Ortadaki hemzenin elif, vav ya da nebre üzerine yazılışını kurala bağlamak", "Hareke gücünü kullanmak: esre (ئ) > ötre (ؤ) > üstün (أ) > sükûn", "Med elifine bitişik üstünlü hemzenin tek başına yazıldığını bilmek"],
  examples: [
    { s: "سَأَلَنِي:cerr / المَأْمُورُ:cerr / بِالاسْتِنْطَاقِ:- / مَسْأَلَةً:cerr / صَعْبَةً.:-", tr: "Sorgu memuru bana zor bir soru sordu. (elif)", pair: "ضَعِ:- / الأَسْمَاءَ:- / المُؤَنَّثَةَ:cerr / عَلَى:- / رُؤُوسِ:cerr / القَوَائِمِ.:-", pairTr: "Müennes isimleri listelerin başına koy. (vav)" },
    { s: "اسْتَمَعْنَا إِلَى الأَذَانِ:- / مُتَّكِئِينَ:cerr / عَلَى:- / المِئْذَنَةِ.:cerr", tr: "Minareye yaslanarak ezanı dinledik. (nebre)" }
  ],
  rules: [
    { tr: "Ortadaki hemzede <b>hemzenin kendi harekesi</b> ile <b>önceki harfin harekesi</b> karşılaştırılır; güçlü olan kazanır: <b>esre → ئ</b>, <b>ötre → ؤ</b>, <b>üstün → أ</b>." },
    { tr: "<b>Elif</b> üzerine (أ):<br>• üstünden sonra üstün: <span class=\"ar\">سَأَلَ، تَتَأَلَّمُ، مُكَافَأَةٌ</span><br>• sâkin sahih harften sonra üstün: <span class=\"ar\">فَجْأَةٌ، مَسْأَلَةٌ</span><br>• üstünden sonra sâkin: <span class=\"ar\">يَأْخُذُ، مَأْمُورٌ، بَدَأْتُ، رَأْسٌ، كَأْسٌ</span>" },
    { tr: "<b>Vav</b> üzerine (ؤ):<br>• ötreli hemze, önceki ötre ya da üstün: <span class=\"ar\">كُؤُوسٌ، رُؤُوسٌ، يَؤُوبُ، تَفَاؤُلٌ، تَشَاؤُمٌ</span><br>• ötreden sonra üstün ya da sâkin: <span class=\"ar\">مُؤَنَّثٌ، مُؤَجَّلٌ، مُؤْمِنٌ، يُؤْثِرُ</span>" },
    { tr: "<b>Nebre</b> üzerine (ئ):<br>• hemze esreli: <span class=\"ar\">مُتَّكِئِينَ، سُئِلَتْ، يَئِسَ، لَئِيمٌ، سَائِلٌ، أَسْئِلَةٌ</span><br>• önceki harf esreli: <span class=\"ar\">فِئَةٌ، مِئَةٌ، بِئْرٌ، مِئْذَنَةٌ، سَنُقْرِئُكَ</span>" },
    { tr: "<b>Tek başına</b> (ء): med elifinden sonra üstünlü hemze (<span class=\"ar\">سَاءَلَ، تَسَاءَلَ، عَبَاءَةٌ</span>) ve ikil elifinden önce sâkinden sonra gelen hemze (<span class=\"ar\">جُزْءَانِ، ضَوْءَانِ</span>; ama <span class=\"ar\">جَاءَا</span>)." }
  ],
  kaide: ["٤ ـ كِتَابَةُ الهَمْزَةِ المُتَوَسِّطَةِ: تُكْتَبُ هَذِهِ الهَمْزَةُ عَلَى الأَلِفِ وَعَلَى الوَاوِ وَعَلَى النَّبْرَةِ. أ ـ عَلَى الأَلِفِ: إِذَا كَانَتْ مَفْتُوحَةً بَعْدَ فَتْحٍ (سَأَلَ، تَتَأَلَّمُ، مُكَافَأَةٌ)، أَوْ مَفْتُوحَةً بَعْدَ حَرْفٍ صَحِيحٍ سَاكِنٍ (فَجْأَةٌ، مَسْأَلَةٌ)، أَوْ سَاكِنَةً بَعْدَ فَتْحٍ (يَأْخُذُ، مَأْمُورٌ، بَدَأْتُ، رَأْسٌ، كَأْسٌ). مُلَاحَظَةٌ: إِذَا كَانَتْ مَفْتُوحَةً بَعْدَ أَلِفِ المَدِّ تُكْتَبُ قِطْعَةً مُنْفَرِدَةً (سَاءَلَ، تَسَاءَلَ، عَبَاءَةٌ)، وَإِذَا كَانَتْ مَفْتُوحَةً قَبْلَ أَلِفِ المَدِّ تُكْتَبُ مُنْفَرِدَةً (جُزْءَانِ، ضَوْءَانِ، جَاءَا).", "ب ـ عَلَى الوَاوِ: إِذَا كَانَتْ مَضْمُومَةً بَعْدَ ضَمٍّ أَوْ فَتْحٍ (كُؤُوسٌ، رُؤُوسٌ، يَؤُوبُ، خَطَؤُهُمْ، تَفَاؤُلٌ، تَشَاؤُمٌ، تَثَاؤُبٌ)، أَوْ مَفْتُوحَةً أَوْ سَاكِنَةً بَعْدَ ضَمٍّ (مُؤَنَّثٌ، مُؤَجَّلٌ، مُؤَازِرٌ، مُؤْمِنٌ، مُؤْذٍ، يُؤْثِرُ).", "جـ ـ عَلَى النَّبْرَةِ: إِذَا كَانَتْ مَكْسُورَةً (مُتَّكِئِينَ، تُنْشِئِينَ، رُئِسَ، وُئِدَتْ، سُئِلَتْ، يَئِسَ، لَئِيمٌ، أَئِمَّةٌ، سَائِلٌ، جُزْئِيَّةٌ، أَسْئِلَةٌ)، أَوْ مَفْتُوحَةً أَوْ سَاكِنَةً أَوْ مَضْمُومَةً بَعْدَ كَسْرٍ (فِئَةٌ، ظَمِئَتْ، دَافِئَةٌ، مِئَةٌ، بِئْرٌ، بِئْسَ، مِئْذَنَةٌ، سَنُقْرِئُكَ، مَبَادِئُكَ)."],
  ex: [
    { type: "combo", num: "٢", ar: "عَيِّنِ الهَمْزَةَ وَاشْرَحْ سَبَبَ كِتَابَتِهَا عَلَى الشَّكْلِ الوَارِدِ", tr: "Hemzeli kelimeyi ve yazılış sebebini seç.", exHtml: "<span class=\"ar\">﴿رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا﴾ ← تُؤَاخِذْنَا: كُتِبَتْ عَلَى الوَاوِ؛ لِأَنَّهَا مَفْتُوحَةٌ بَعْدَ ضَمٍّ · تَفَاءَلُوا بِالخَيْرِ تَجِدُوهُ ← تَفَاءَلُوا: كُتِبَتْ مُنْفَرِدَةً؛ لِأَنَّهَا مَفْتُوحَةٌ بَعْدَ مَدٍّ</span>", items: [
      ["﴿وَالأَنْعَامَ خَلَقَهَا لَكُمْ فِيهَا دِفْءٌ وَمَنَافِعُ﴾", ["دِفْءٌ", "خَلَقَهَا", "مَنَافِعُ"], "msk", "Hayvanları da yarattı; onlarda sizin için ısınma ve faydalar var. (Nahl 5)", "Sondaki hemze sâkin harften sonra: tek başına."],
      ["﴿وَكَذَلِكَ بَعَثْنَاهُمْ لِيَتَسَاءَلُوا بَيْنَهُمْ﴾", ["لِيَتَسَاءَلُوا", "بَعَثْنَاهُمْ", "بَيْنَهُمْ"], "mmd", "Aralarında birbirlerine sorsunlar diye onları böylece uyandırdık. (Kehf 19)", "Med elifinden sonra üstünlü: tek başına."],
      ["﴿كَمْ مِنْ فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللهِ﴾", ["فِئَةٍ", "قَلِيلَةٍ", "غَلَبَتْ"], "yfk", "Nice az topluluk Allah’ın izniyle çok topluluğu yendi. (Bakara 249)", "Esreden sonra üstünlü: nebre."],
      ["مَنِ اسْتَبَدَّ بِرَأْيِهِ خَفَّتْ وَطْأَتُهُ عَلَى أَعْدَائِهِ.", ["وَطْأَتُهُ", "خَفَّتْ", "عَلَى"], "afs", "Görüşünde diretenin düşmanları üzerindeki baskısı hafifler.", "Sâkinden sonra üstünlü: elif. (رَأْيِهِ: sâkin, üstünden sonra; أَعْدَائِهِ: esreli.)"],
      ["﴿وَالَّذِينَ كَفَرُوا بِآيَاتِنَا هُمْ أَصْحَابُ المَشْأَمَةِ﴾", ["المَشْأَمَةِ", "كَفَرُوا", "هُمْ"], "afs", "Âyetlerimizi inkâr edenler ise solculardır. (Beled 19)", "Sâkin ش’den sonra üstünlü: elif."],
      ["﴿قَالَ اخْرُجْ مِنْهَا مَذْؤُومًا مَدْحُورًا﴾", ["مَذْؤُومًا", "مَدْحُورًا", "مِنْهَا"], "wds", "Dedi ki: Yerilmiş ve kovulmuş olarak oradan çık. (A’râf 18)", "Sâkinden sonra ötreli: vav. (Mushaf yazımı: مَذْءُومًا.)"],
      ["لَا تُؤَخِّرْ عَمَلَ اليَوْمِ إِلَى الغَدِ.", ["تُؤَخِّرْ", "عَمَلَ", "الغَدِ"], "wfd", "Bugünün işini yarına bırakma.", "Ötreden sonra üstünlü: vav."],
      ["مَصَائِبُ قَوْمٍ عِنْدَ قَوْمٍ فَوَائِدُ.", ["مَصَائِبُ", "قَوْمٍ", "عِنْدَ"], "yk", "Bir topluluğun musibetleri, başka bir topluluğa faydadır.", "Esreli hemze: nebre (فَوَائِدُ da öyle)."]
    ].map(HS) },
    { type: "classify", extra: true, opts: SEAT, ar: "عَلَى أَيِّ حَرْفٍ تُكْتَبُ الهَمْزَةُ؟", tr: "Renkli ء yerine hangi biçim yazılır?", items: CL([
      [QH("سَءَلَ"), "a", "Üstünden sonra üstün: سَأَلَ."], [QH("مَسْءَلَةٌ"), "a", "Sâkinden sonra üstün: مَسْأَلَةٌ."], [QH("فَجْءَةً"), "a", "فَجْأَةً."], [QH("يَءْخُذُ"), "a", "Üstünden sonra sâkin: يَأْخُذُ."], [QH("رَءْسٌ"), "a", "رَأْسٌ."],
      [QH("كُءُوسٌ"), "w", "كُؤُوسٌ."], [QH("رُءُوسٌ"), "w", "رُؤُوسٌ."], [QH("تَفَاءُلٌ"), "w", "Med elifinden sonra ötreli: تَفَاؤُلٌ."], [QH("مُءْمِنٌ"), "w", "Ötreden sonra sâkin: مُؤْمِنٌ."], [QH("مُءَجَّلٌ"), "w", "مُؤَجَّلٌ."],
      [QH("فِءَةٌ"), "y", "Esreden sonra: فِئَةٌ."], [QH("بِءْرٌ"), "y", "بِئْرٌ."], [QH("سُءِلَ"), "y", "Esreli: سُئِلَ."], [QH("لَءِيمٌ"), "y", "لَئِيمٌ."], [QH("مُتَّكِءِينَ"), "y", "مُتَّكِئِينَ."],
      [QH("سَاءَلَ"), "m", "Med elifinden sonra üstünlü: tek başına."], [QH("عَبَاءَةٌ"), "m", "Tek başına."], [QH("جُزْءَانِ"), "m", "İkil elifinden önce: tek başına."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · SONDA HEMZE
{
  id: "u4", no: 4, ar: "كِتَابَةُ الهَمْزَةِ المُتَطَرِّفَةِ", tr: "Kelime Sonunda Hemze", short: "Sonda", col: "mi", legend: ["cerr"],
  goals: ["Sondaki hemzenin yalnız önceki harfin harekesine göre yazıldığını bilmek", "Önceki harf sâkin ya da med harfiyse tek başına (ء) yazmak", "Sondaki hemzeyi doğru yazılmış biçimler arasından seçmek"],
  examples: [
    { s: "قَرَأَ:cerr / القَارِئُ:cerr / كَلِمَةَ:- / اللُّؤْلُؤِ:cerr / خَطَأً.:cerr", tr: "Okuyucu “lü’lü’” kelimesini yanlış okudu.", pair: "يَسُوءُ:cerr / غِذَاءُ:cerr / المَرْءِ:cerr / إِذَا لَمْ يُحْفَظْ فِي:- / الفَيْءِ.:cerr", pairTr: "Gölgede saklanmazsa insanın gıdası bozulur." }
  ],
  rules: [
    { tr: "Sondaki hemzede hemzenin kendi harekesine <b>bakılmaz</b>; yalnız <b>önceki harfin harekesi</b> belirler:<br>• üstün → elif: <span class=\"ar\">قَرَأَ، يَقْرَأُ، الخَطَأُ</span><br>• ötre → vav: <span class=\"ar\">التَّهَيُّؤُ، اللُّؤْلُؤُ، امْرُؤٌ، التَّنَبُّؤُ</span><br>• esre → nebre: <span class=\"ar\">يَتَّكِئُ، نَاشِئٌ، قَارِئٌ</span>" },
    { tr: "Önceki harf <b>sâkin</b> ya da <b>med harfi</b> ise hemze <b>tek başına</b> yazılır: <span class=\"ar\">المَرْءُ، السُّوءُ، النَّشْءُ، الجُزْءُ، دِفْءٌ، مِلْءٌ، جَاءَ، سَمَاءٌ، وُضُوءٌ، فَيْءٌ</span>." },
    { tr: "Dikkat: <span class=\"ar\">امْرُؤٌ</span>’da hemzeden önceki harf i’raba göre değişir: <span class=\"ar\">هَذَا امْرُؤٌ · رَأَيْتُ امْرَأً · كُلُّ امْرِئٍ</span>; hemzenin yazılışı da ona uyar." }
  ],
  kaide: ["٥ ـ كِتَابَةُ الهَمْزَةِ المُتَطَرِّفَةِ: إِذَا كَانَ مَا قَبْلَ الهَمْزَةِ المُتَطَرِّفَةِ مُتَحَرِّكًا كُتِبَتْ بِحَرْفٍ يُنَاسِبُ حَرَكَةَ مَا قَبْلَهَا مَهْمَا كَانَتْ حَرَكَتُهَا: عَلَى الأَلِفِ فِي مِثْلِ: قَرَأَ، يَقْرَأُ، الخَطَأُ. وَعَلَى الوَاوِ فِي مِثْلِ: التَّهَيُّؤُ، اللُّؤْلُؤُ، امْرُؤٌ، التَّنَبُّؤُ. وَعَلَى اليَاءِ فِي مِثْلِ: يَتَّكِئُ، نَاشِئٌ، قَارِئٌ. وَإِنْ كَانَ مَا قَبْلَهَا سَاكِنًا أَوْ حَرْفَ مَدٍّ كُتِبَتْ مُفْرَدَةً بِصُورَةِ القَطْعِ هَكَذَا (ء)، مِثْلُ: المَرْءُ، السُّوءُ، النَّشْءُ، الجُزْءُ، دِفْءٌ، مِلْءٌ، جَاءَ، سَمَاءٌ، وُضُوءٌ، فَيْءٌ."],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الكِتَابَةَ الصَّحِيحَةَ", tr: "Boşluğa sondaki hemzesi doğru yazılmış kelimeyi seç.", items: PL([
      ["___ الوَلَدُ القُرْآنَ.", "قَرَأَ", "قَرَءَ", "قَرَئَ", "Çocuk Kur’an okudu.", "Önceki üstün: elif."],
      ["هَذَا ___ صَغِيرٌ.", "خَطَأٌ", "خَطَءٌ", "خَطَئٌ", "Bu küçük bir hata.", "Önceki üstün: elif."],
      ["اشْتَرَتْ أُمِّي عِقْدًا مِنَ ___.", "اللُّؤْلُؤِ", "اللُّؤْلُئِ", "اللُّؤْلُءِ", "Annem inciden bir gerdanlık aldı.", "Önceki ötre: vav (hemzenin esresine bakılmaz)."],
      ["___ القُرْآنِ صَوْتُهُ جَمِيلٌ.", "قَارِئُ", "قَارِؤُ", "قَارِءُ", "Kur’an okuyucusunun sesi güzel.", "Önceki esre: ya."],
      ["الشَّيْخُ ___ عَلَى العَصَا.", "يَتَّكِئُ", "يَتَّكِؤُ", "يَتَّكَأُ", "Yaşlı adam bastona yaslanıyor.", "Önceki esre: ya."],
      ["﴿كُلُّ ___ بِمَا كَسَبَ رَهِينٌ﴾", "امْرِئٍ", "امْرُؤٍ", "امْرَأٍ", "Herkes kazandığına karşılık rehindir. (Tûr 21)", "Mecrûr: ر esreli, hemze ya üzerinde."],
      ["___ مَعَ مَنْ أَحَبَّ.", "المَرْءُ", "المَرْؤُ", "المَرْأُ", "Kişi sevdiğiyle beraberdir. (Hadis)", "Önceki sâkin: tek başına."],
      ["هَذَا ___ مِنَ الكِتَابِ.", "جُزْءٌ", "جُزْؤٌ", "جُزْأٌ", "Bu kitaptan bir bölüm.", "Önceki sâkin: tek başına."],
      ["نَزَلَ المَطَرُ مِنَ ___.", "السَّمَاءِ", "السَّمَائِ", "السَّمَاأِ", "Gökten yağmur indi.", "Önceki med: tek başına."],
      ["___ هُ كَامِلٌ.", "وُضُوءُ", "وُضُوؤُ", "وُضُوئُ", "Abdesti tam.", "Önceki med (و): tek başına."],
      ["جَلَسْنَا فِي ___ الشَّجَرَةِ.", "فَيْءِ", "فَيْئِ", "فَيْأِ", "Ağacın gölgesinde oturduk.", "Önceki sâkin (يْ): tek başına."],
      ["مِنَ الصَّعْبِ ___ بِالمُسْتَقْبَلِ.", "التَّنَبُّؤُ", "التَّنَبُّأُ", "التَّنَبُّئُ", "Geleceği tahmin etmek zordur.", "Önceki ötre: vav."]
    ])},
    { type: "classify", extra: true, opts: SEAT, ar: "كَيْفَ تُكْتَبُ الهَمْزَةُ المُتَطَرِّفَةُ؟", tr: "Sondaki renkli ء yerine hangi biçim yazılır?", items: CL([
      [QH("قَرَءَ"), "a", "قَرَأَ."], [QH("يَقْرَءُ"), "a", "يَقْرَأُ."], [QH("الخَطَءُ"), "a", "الخَطَأُ."],
      [QH("التَّهَيُّءُ"), "w", "التَّهَيُّؤُ."], [QH("امْرُءٌ"), "w", "امْرُؤٌ."], [QH("التَّنَبُّءُ"), "w", "التَّنَبُّؤُ."],
      [QH("يَتَّكِءُ"), "y", "يَتَّكِئُ."], [QH("نَاشِءٌ"), "y", "نَاشِئٌ."], [QH("قَارِءٌ"), "y", "قَارِئٌ."],
      [QH("المَرْءُ"), "m", "Önceki sâkin."], [QH("السُّوءُ"), "m", "Önceki med."], [QH("دِفْءٌ"), "m", "Önceki sâkin."], [QH("سَمَاءٌ"), "m", "Önceki med."], [QH("جَاءَ"), "m", "Önceki med."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "القِرَاءَةُ: لَا تُفْشِ أَسْرَارَ عَائِلَتِكَ", tr: "Okuma: Ailenin Sırlarını Yayma", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Metindeki hemzelerin türünü belirlemek: kat’, vasl, ortada, sonda", "Ortadaki ve sondaki hemzenin yazılış sebebini söylemek"],
  examples: [
    { s: "لَا تُفْشِ:- / أَسْرَارَ:mz / عَائِلَتِكَ.:cerr", tr: "Ailenin sırlarını yayma. (Esrâr: baştaki kat’ hemzesi; âile: ortadaki esreli hemze, nebre üzerinde)", pair: "بَدَأَتْ:cerr / تَسْأَلُهَا:cerr / عَنْ:- / أُمُورٍ.:mz", pairTr: "Ona işlerini sormaya başladı." }
  ],
  rules: [
    { tr: "Metindeki hemzeleri dört gruba ayır: başta kat’ (<span class=\"ar\">أَسْرَارَ، إِخْوَتِهَا، آذَتْ</span>), vasl (<span class=\"ar\">الذَّهَابَ، لِابْنَتِهَا، الصَّمْتَ</span>), ortada (<span class=\"ar\">عَائِلَتِهَا، تَسْأَلُهَا، تُؤْذِي، مَسْؤُولِينَ، بَرَاءَةٍ</span>), sonda (<span class=\"ar\">خَطَأٌ</span>)." },
    { tr: "<span class=\"ar\">حِينَئِذٍ</span>: hemze esreli, nebre üzerinde. <span class=\"ar\">سَيُؤَنِّبُنَا، سَيُؤَدِّي</span>: ötreden sonra üstünlü, vav üzerinde." }
  ],
  kaide: ["عَيِّنْ نَوْعَ الهَمْزَةِ فِي القِصَّةِ التَّالِيَةِ، وَاشْرَحْ سَبَبَ كِتَابَتِهَا عَلَى الشَّكْلِ الوَارِدِ."],
  ex: [
    { type: "reading", num: "٣", ar: "عَيِّنْ نَوْعَ الهَمْزَةِ فِي القِصَّةِ التَّالِيَةِ وَاشْرَحْ سَبَبَ كِتَابَتِهَا عَلَى الشَّكْلِ الوَارِدِ", tr: "Hikâyeyi oku, soruları cevapla; sonra koyu kelimedeki hemzenin türünü ve yazılışını seç.", title: "لَا تُفْشِ أَسْرَارَ عَائِلَتِكَ",
      text: METIN,
      textTr: "Küçük Hâle dedesinin ve amcalarının evine gitmeyi severdi; onların kendisine hoş geldin demelerini ve aralarında oturmasından hoşlanmalarını isterdi. Onlarla çok konuşur, evlerinde olan hikâyeleri ve ailesi arasında geçenleri uzun uzun anlatırdı; özellikle anne babası arasındaki bir kavgadan söz ederken onların sözlerine ilgi gösterdiğini hissederdi.<br>Bir süre sonra Hâle, amcasının eşinin ailesine dair işleri, anne babasının birbiriyle ilişkisini, kardeşlerinin anne babasıyla ilişkisini sormaya başladığını fark etti. Hâle de amcasının eşinin yaptığı tatlıdan ilk ısırıkla birlikte anlatmaya başlardı.<br>Bir keresinde yemek odasının kapısına yaklaşırken amcasının eşinin kızına şöyle dediğini duydu: “Bunlar yalnız ailemizi ilgilendiren işler; sırlarımızın herkesin malı olmasını istemem. Sen de Hâle gibi olup ailene ve annene, başlarından geçenleri herkesin önünde yayarak eziyet etmek mi istiyorsun?”<br>Hâle o an, yaptığı şeyin kendisini dinleyenlerin gözünde imajını bozduğunu anladı; kavgalarını ve sözlerini herkese açarak kendine ve ailesine ne kadar eziyet ettiğini düşündü. O andan itibaren ev dışında susmaya, ailesinin sırlarını yabancılara, hatta akrabalara anlatarak onlara eziyet etmemeye; kendini tutamayan bir geveze ya da sırları ondan öğrenilebilecek küçük bir çocuk gibi görünmemeye karar verdi.<br>Hâle bu yaşadıklarından çok şey öğrendi ve o dersten sonra ailesinin sırlarını iyi korumaya karar verdi; aile kavgalarının, anne baba ve kardeşler arasında olanların sır olduğunu, başkalarının eğlencesine dönüşebilecek her şeyde susması gerektiğini anladı.<br>Pek çok çocuk da farkına varmadan, masumca Hâle gibi yapar; söylenmesi gerekenle gerekmeyen arasındaki farkı bilmez. Sen, kardeşlerinden ya da arkadaşlarından biri onlardan olabilirsiniz; ama artık bunun büyük bir hata olduğunu öğrendin. Sırları yaymaya devam edersek: çevremizdekiler sırlarını bizden uzak tutar; bize küçük ve sorumsuz gibi davranırlar; yalnız kalır, ailemizin bizden bunaldığını hissederiz; ailemiz bize kızar, bu da Allah’ın gazabına yol açar; ailemize acı verdiğimizi gördükçe vicdanımız bizi kınar.",
      qa: [
        { q: "مَاذَا كَانَتْ هَالَةُ تُحِبُّ؟", a: "كَانَتْ تُحِبُّ الذَّهَابَ إِلَى بَيْتِ جَدِّهَا وَأَعْمَامِهَا وَالحَدِيثَ مَعَهُمْ.", tr: "Hâle neyi severdi? Dedesinin ve amcalarının evine gidip onlarla konuşmayı." },
        { q: "عَمَّ كَانَتْ زَوْجَةُ عَمِّهَا تَسْأَلُهَا؟", a: "عَنْ أُمُورٍ تَخُصُّ عَائِلَتَهَا، وَعَنْ عَلَاقَةِ وَالِدَيْهَا وَإِخْوَتِهَا.", tr: "Amcasının eşi ona neyi sorardı? Ailesine dair işleri, anne babasının ve kardeşlerinin ilişkilerini." },
        { q: "مَاذَا سَمِعَتْ هَالَةُ مِنْ زَوْجَةِ عَمِّهَا؟", a: "سَمِعَتْهَا تَنْهَى ابْنَتَهَا أَنْ تَكُونَ مِثْلَهَا فَتُذِيعَ أَسْرَارَ أَهْلِهَا.", tr: "Hâle amcasının eşinden ne duydu? Kızına, Hâle gibi ailesinin sırlarını yaymamasını söylediğini." },
        { q: "مَاذَا قَرَّرَتْ هَالَةُ بَعْدَ ذَلِكَ؟", a: "قَرَّرَتْ أَنْ تَلْتَزِمَ الصَّمْتَ خَارِجَ المَنْزِلِ وَأَنْ تَحْفَظَ أَسْرَارَ عَائِلَتِهَا.", tr: "Hâle sonra neye karar verdi? Ev dışında susmaya ve ailesinin sırlarını korumaya." }
      ],
      cls: { opts: KIND, ar: "مَا نَوْعُ الهَمْزَةِ؟", tr: "Koyu kelimedeki hemze: başta kat’ mı, vasl mı, ortada mı, sonda mı?", items: [
        { s: HL("لَا تُفْشِ أَسْرَارَ عَائِلَتِكَ", "أَسْرَارَ"), a: "k", why: "Başta, ulamada da okunur: kat’." },
        { s: HL("لَا تُفْشِ أَسْرَارَ عَائِلَتِكَ", "عَائِلَتِكَ"), a: "o", why: "Ortada, esreli: ئ." },
        { s: HL("تُحِبُّ الذَّهَابَ إِلَى بَيْتِ جَدِّهَا", "الذَّهَابَ"), a: "v", why: "ال: vasl." },
        { s: HL("بَدَأَتْ تَسْأَلُهَا", "بَدَأَتْ"), a: "o", why: "Ortada: üstünden sonra üstünlü, elif." },
        { s: HL("بَدَأَتْ تَسْأَلُهَا", "تَسْأَلُهَا"), a: "o", why: "Ortada: sâkinden sonra üstünlü, elif." },
        { s: HL("عَلَاقَةِ إِخْوَتِهَا بِوَالِدَيْهَا", "إِخْوَتِهَا"), a: "k", why: "Başta esreli kat’: إِ." },
        { s: HL("تَقُولُ لِابْنَتِهَا", "لِابْنَتِهَا"), a: "v", why: "اِبْنَةٌ: vasl; ulamada okunmaz." },
        { s: HL("وَتُؤْذِي أَهْلَكِ", "وَتُؤْذِي"), a: "o", why: "Ortada: ötreden sonra sâkin, vav." },
        { s: HL("عَلِمَتْ هَالَةُ حِينَئِذٍ", "حِينَئِذٍ"), a: "o", why: "Ortada, esreli: nebre." },
        { s: HL("كَمْ آذَتْ نَفْسَهَا", "آذَتْ"), a: "k", why: "Başta kat’ hemzesi + med elifi: آ." },
        { s: HL("كَصِغَارٍ وَغَيْرِ مَسْؤُولِينَ", "مَسْؤُولِينَ"), a: "o", why: "Ortada: sâkinden sonra ötreli, vav." },
        { s: HL("وَيَفْعَلُونَهُ بِبَرَاءَةٍ", "بِبَرَاءَةٍ"), a: "o", why: "Ortada: med elifinden sonra üstünlü, tek başına." },
        { s: HL("أَنَّ هَذَا خَطَأٌ كَبِيرٌ", "خَطَأٌ"), a: "s", why: "Sonda: önceki üstün, elif." },
        { s: HL("سَيُؤَنِّبُنَا ضَمِيرُنَا", "سَيُؤَنِّبُنَا"), a: "o", why: "Ortada: ötreden sonra üstünlü, vav." }
      ]},
      cls2: { opts: SEAT, ar: "كَيْفَ كُتِبَتِ الهَمْزَةُ؟", tr: "Koyu kelimedeki ortadaki / sondaki hemze nasıl yazılmış?", items: [
        { s: HL("عَائِلَتِكَ", "عَائِلَتِكَ"), a: "y", why: "Esreli: nebre." },
        { s: HL("بَدَأَتْ", "بَدَأَتْ"), a: "a", why: "Üstünden sonra üstünlü: elif." },
        { s: HL("تَسْأَلُهَا", "تَسْأَلُهَا"), a: "a", why: "Sâkinden sonra üstünlü: elif." },
        { s: HL("تُؤْذِي", "تُؤْذِي"), a: "w", why: "Ötreden sonra sâkin: vav." },
        { s: HL("حِينَئِذٍ", "حِينَئِذٍ"), a: "y", why: "Esreli: nebre." },
        { s: HL("مَسْؤُولِينَ", "مَسْؤُولِينَ"), a: "w", why: "Sâkinden sonra ötreli: vav." },
        { s: HL("بِبَرَاءَةٍ", "بِبَرَاءَةٍ"), a: "m", why: "Med elifinden sonra üstünlü: tek başına." },
        { s: HL("خَطَأٌ", "خَطَأٌ"), a: "a", why: "Sonda, önceki üstün: elif." },
        { s: HL("سَيُؤَدِّي", "سَيُؤَدِّي"), a: "w", why: "Ötreden sonra üstünlü: vav." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["﴿إِنَّا {أَعْطَيْنَاكَ} الكَوْثَرَ﴾", ["أَعْطَيْنَاكَ", "اَعْطَيْنَاكَ", "إِعْطَيْنَاكَ"], "if’âl: kat’", "Sana Kevser’i verdik.", "u1"],
  ["يَا رَجُلُ {ادْخُلْ}!", ["ادْخُلْ", "أُدْخُلْ", "أَدْخُلْ"], "sülâsî emir: vasl", "Ey adam, gir!", "u1"],
  ["﴿وَقُلِ {اعْمَلُوا}﴾", ["اعْمَلُوا", "أعْمَلُوا", "إِعْمَلُوا"], "vasl", "De ki: Çalışın.", "u1"],
  ["مَنِ {اسْتَمْسَكَ} بِالحَقِّ فَازَ.", ["اسْتَمْسَكَ", "أَسْتَمْسَكَ", "إِسْتَمْسَكَ"], "südâsî: vasl", "Hakka sarılan kazandı.", "u1"],
  ["{أَحْسِنْ} إِلَى النَّاسِ.", ["أَحْسِنْ", "اِحْسِنْ", "إِحْسِنْ"], "if’âl emri: kat’", "İnsanlara iyilik et.", "u1"],
  ["{اِجْتَمَعَ} الطُّلَّابُ.", ["اِجْتَمَعَ", "أَجْتَمَعَ", "إِجْتَمَعَ"], "hümâsî: vasl", "Öğrenciler toplandı.", "u2"],
  ["{إِكْرَامُ} الضَّيْفِ وَاجِبٌ.", ["إِكْرَامُ", "اِكْرَامُ", "أَكْرَامُ"], "if’âl masdarı: kat’", "Misafire ikram vaciptir.", "u2"],
  ["{أَقْرَأُ} كِتَابًا كُلَّ أُسْبُوعٍ.", ["أَقْرَأُ", "اَقْرَأُ", "اِقْرَأُ"], "muzâri أَنَا: kat’", "Her hafta bir kitap okurum.", "u2"],
  ["هَذِهِ {أُمُورٌ} مُهِمَّةٌ.", ["أُمُورٌ", "اُمُورٌ", "إُمُورٌ"], "isim: kat’", "Bunlar önemli işler.", "u2"],
  ["{سَأَلَنِي} المَأْمُورُ.", ["سَأَلَنِي", "سَئَلَنِي", "سَؤَلَنِي"], "üstünden sonra üstün: أ", "Memur bana sordu.", "u3"],
  ["ضَعْهَا عَلَى {رُؤُوسِ} القَوَائِمِ.", ["رُؤُوسِ", "رُأُوسِ", "رُئُوسِ"], "ötreden sonra ötre: ؤ", "Onları listelerin başına koy.", "u3"],
  ["اسْتَمَعْنَا إِلَى الأَذَانِ {مُتَّكِئِينَ}.", ["مُتَّكِئِينَ", "مُتَّكِأِينَ", "مُتَّكِؤِينَ"], "esreli: ئ", "Yaslanarak ezanı dinledik.", "u3"],
  ["﴿{لِيَتَسَاءَلُوا} بَيْنَهُمْ﴾", ["لِيَتَسَاءَلُوا", "لِيَتَسَائَلُوا", "لِيَتَسَاأَلُوا"], "med elifinden sonra: ء", "Birbirlerine sorsunlar diye.", "u3"],
  ["{تَفَاءَلُوا} بِالخَيْرِ تَجِدُوهُ.", ["تَفَاءَلُوا", "تَفَائَلُوا", "تَفَاأَلُوا"], "med elifinden sonra üstün: ء", "Hayra yorun, hayır bulursunuz.", "u3"],
  ["لَا {تُؤَخِّرْ} عَمَلَ اليَوْمِ.", ["تُؤَخِّرْ", "تُأَخِّرْ", "تُئَخِّرْ"], "ötreden sonra üstün: ؤ", "Bugünün işini erteleme.", "u3"],
  ["﴿كَمْ مِنْ {فِئَةٍ} قَلِيلَةٍ﴾", ["فِئَةٍ", "فِأَةٍ", "فِؤَةٍ"], "esreden sonra: ئ", "Nice az topluluk.", "u3"],
  ["مَنِ اسْتَبَدَّ بِرَأْيِهِ خَفَّتْ {وَطْأَتُهُ}.", ["وَطْأَتُهُ", "وَطْءَتُهُ", "وَطْئَتُهُ"], "sâkinden sonra üstün: أ", "Baskısı hafifledi.", "u3"],
  ["قَرَأَ القَارِئُ كَلِمَةَ {اللُّؤْلُؤِ}.", ["اللُّؤْلُؤِ", "اللُّؤْلُئِ", "اللُّؤْلُءِ"], "önceki ötre: ؤ", "“Lü’lü’” kelimesini okudu.", "u4"],
  ["يَسُوءُ غِذَاءُ {المَرْءِ}.", ["المَرْءِ", "المَرْئِ", "المَرْأِ"], "önceki sâkin: ء", "İnsanın gıdası bozulur.", "u4"],
  ["{القَارِئُ} يَقْرَأُ.", ["القَارِئُ", "القَارِؤُ", "القَارِءُ"], "önceki esre: ئ", "Okuyucu okuyor.", "u4"],
  ["﴿فِيهَا {دِفْءٌ} وَمَنَافِعُ﴾", ["دِفْءٌ", "دِفْأٌ", "دِفْئٌ"], "önceki sâkin: ء", "Onlarda ısınma ve faydalar var.", "u4"],
  ["الشَّيْخُ {يَتَّكِئُ} عَلَى العَصَا.", ["يَتَّكِئُ", "يَتَّكِؤُ", "يَتَّكَأُ"], "önceki esre: ئ", "Yaşlı adam bastona yaslanıyor.", "u4"],
  ["لَا تُفْشِ {أَسْرَارَ} عَائِلَتِكَ.", ["أَسْرَارَ", "اَسْرَارَ", "إِسْرَارَ"], "isim başında kat’", "Ailenin sırlarını yayma.", "u5"],
  ["لَا تُفْشِ أَسْرَارَ {عَائِلَتِكَ}.", ["عَائِلَتِكَ", "عَاأِلَتِكَ", "عَاءِلَتِكَ"], "esreli: ئ", "Ailenin sırlarını yayma.", "u5"],
  ["هَذَا {خَطَأٌ} كَبِيرٌ.", ["خَطَأٌ", "خَطَءٌ", "خَطَئٌ"], "önceki üstün: أ", "Bu büyük bir hata.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["اَكْرَمَ ← hemzeyi doğru yaz", "أَكْرَمَ", "اَكْرَمَ", "إِكْرَمَ", "If’âl mâzisi: kat’.", "u1"],
  ["يَا رَجُلُ + اُدْخُلْ ← ulayarak yaz", "يَا رَجُلُ ادْخُلْ", "يَا رَجُلُ أُدْخُلْ", "يَا رَجُلُ اُدْخُلْ", "Vasl hemzesi ulamada okunmaz, harekesiz elif.", "u1"],
  ["وَ + اَقْبِلْ ← ulayarak yaz", "وَأَقْبِلْ", "وَاقْبِلْ", "وَإِقْبِلْ", "If’âl emri kat’: ulamada okunur.", "u1"],
  ["اِسْتَخْرَجَ ← masdar", "اِسْتِخْرَاجٌ", "إِسْتِخْرَاجٌ", "أَسْتِخْرَاجٌ", "Südâsî masdar: vasl.", "u2"],
  ["أَنْشَأَ ← masdar", "إِنْشَاءٌ", "اِنْشَاءٌ", "أَنْشَاءٌ", "If’âl masdarı: kat’, esreli → إ.", "u2"],
  ["كَتَبَ ← emir", "اُكْتُبْ", "أُكْتُبْ", "إُكْتُبْ", "Sülâsî emir: vasl.", "u2"],
  ["سَءَلَ ← hemzeyi yerine yaz", "سَأَلَ", "سَئَلَ", "سَؤَلَ", "Üstünden sonra üstünlü: أ.", "u3"],
  ["مُءْمِنٌ ← hemzeyi yerine yaz", "مُؤْمِنٌ", "مُأْمِنٌ", "مُئْمِنٌ", "Ötreden sonra sâkin: ؤ.", "u3"],
  ["بِءْرٌ ← hemzeyi yerine yaz", "بِئْرٌ", "بِأْرٌ", "بِؤْرٌ", "Esreden sonra: ئ.", "u3"],
  ["سَأَلَ ← tefâ’ul mâzisi", "تَسَاءَلَ", "تَسَائَلَ", "تَسَاأَلَ", "Tefâ’ul kalıbında hemze med elifinden sonra üstünlü gelir: tek başına.", "u3"],
  ["يَتَّكِء ← sondaki hemze", "يَتَّكِئُ", "يَتَّكِؤُ", "يَتَّكِأُ", "Önceki esre: ئ.", "u4"],
  ["التَّهَيُّء ← sondaki hemze", "التَّهَيُّؤُ", "التَّهَيُّأُ", "التَّهَيُّئُ", "Önceki ötre: ؤ.", "u4"],
  ["الجُزْء ← sondaki hemze", "الجُزْءُ", "الجُزْؤُ", "الجُزْأُ", "Önceki sâkin: ء.", "u4"],
  ["مَسْءُولٌ ← hemzeyi yerine yaz", "مَسْؤُولٌ", "مَسْأُولٌ", "مَسْئُولٌ", "Sâkinden sonra ötreli: ؤ.", "u5"]
];
// Yazılış hız oyunu (ortada)
var NOUN_LIST = UNITS[2].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = SEAT;
// Kat’ mı vasl mı hız oyunu
var MM_OPTS = KV;
var MM_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  se: { name: "Kelime ↔ kural", pairs: [["سَأَلَ", "üstünden sonra üstün: أ"], ["مُؤْمِنٌ", "ötreden sonra sâkin: ؤ"], ["فِئَةٌ", "esreden sonra: ئ"], ["تَسَاءَلَ", "med elifinden sonra: ء"], ["المَرْءُ", "sonda, sâkinden sonra: ء"], ["قَارِئٌ", "sonda, esreden sonra: ئ"], ["اللُّؤْلُؤُ", "sonda, ötreden sonra: ؤ"], ["مَسْأَلَةٌ", "sâkinden sonra üstün: أ"]] },
  ce: { name: "Vasl ↔ kat’", pairs: [["اِجْتَمَعَ", "hümâsî: vasl"], ["اِسْتِخْرَاجٌ", "südâsî masdar: vasl"], ["اُكْتُبْ", "sülâsî emir: vasl"], ["اَلْقَلَمُ", "harf-i tarif: vasl"], ["أَكْرَمَ", "if’âl: kat’"], ["إِكْرَامٌ", "if’âl masdarı: kat’"], ["أَكْتُبُ", "muzâri أَنَا: kat’"], ["إِنَّ", "harf: kat’"]] },
  ay: { name: "Âyet ↔ Türkçe", pairs: [["إِنَّا أَعْطَيْنَاكَ الكَوْثَرَ", "sana Kevser’i verdik"], ["هَلْ جَزَاءُ الإِحْسَانِ إِلَّا الإِحْسَانُ", "iyiliğin karşılığı iyilikten başkası mı?"], ["اِعْمَلُوا آلَ دَاوُودَ شُكْرًا", "ey Dâvûd ailesi, şükür olarak çalışın"], ["لِيَتَسَاءَلُوا بَيْنَهُمْ", "birbirlerine sorsunlar diye"], ["كَمْ مِنْ فِئَةٍ قَلِيلَةٍ", "nice az topluluk"], ["فِيهَا دِفْءٌ وَمَنَافِعُ", "onlarda ısınma ve faydalar var"], ["رَبَّنَا لَا تُؤَاخِذْنَا", "Rabbimiz, bizi sorumlu tutma"], ["أَأُنْزِلَ عَلَيْهِ الذِّكْرُ", "zikir ona mı indirildi?"]] }
};
var KARTLAR = [
  ["Hemze nedir?", "Hareke alan elif: أَ، أُ، إِ. Başta, ortada, sonda gelir."],
  ["Hemze-i kat’?", "Hem başta hem ulamada okunur; أ / إ ile yazılır: أَقْبِلْ يَا رَجُلُ، وَيَا رَجُلُ أَقْبِلْ"],
  ["Hemze-i vasl?", "Ulamada düşer; yalın ا ile yazılır: اُدْخُلْ ← يَا رَجُلُ ادْخُلْ"],
  ["Hangi hemzeler vasl?", "Hümâsî / südâsî mâzi, emir, masdar; sülâsî emir; harf-i tarif."],
  ["If’âl bâbı?", "Kat’: أَكْرَمَ، أَكْرِمْ، إِكْرَامٌ"],
  ["Ortada hemzenin kuralı?", "Hemze ve önceki harfin harekesi karşılaştırılır: esre (ئ) > ötre (ؤ) > üstün (أ)"],
  ["سَاءَلَ neden tek başına?", "Med elifinden sonra üstünlü hemze."],
  ["تَفَاؤُلٌ?", "Med elifinden sonra ötreli: vav üzerinde."],
  ["Sondaki hemzenin kuralı?", "Yalnız önceki harfin harekesine bakılır."],
  ["المَرْءُ, سَمَاءٌ?", "Önceki harf sâkin ya da med: tek başına (ء)."],
  ["امْرُؤٌ / امْرِئٍ?", "ر’nin harekesi i’raba göre değişir; hemze ona uyar."],
  ["Kat’ mı vasl mı, nasıl anlarım?", "Önüne وَ koy: okunuyorsa kat’ (وَأَكْرَمَ), okunmuyorsa vasl (وَاجْتَمَعَ)."]
];
