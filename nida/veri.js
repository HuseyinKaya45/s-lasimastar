// ================= VERİ: Nidâ Üslubu (أُسْلُوبُ النِّدَاءِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "أَدَاةُ النِّدَاءِ", tr: "Nidâ edatı" }, nasb: { ar: "المُنَادَى", tr: "Münâdâ" }, cerr: { ar: "", tr: "Tamamlayıcı" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var MT = [["a", "Alem", "عَلَمٌ", "nasb"], ["m", "Nekre-i maksûde", "نَكِرَةٌ مَقْصُودَةٌ", "cerr"], ["g", "Nekre-i gayr-i maksûde", "نَكِرَةٌ غَيْرُ مَقْصُودَةٍ", "mi"], ["z", "Muzâf", "مُضَافٌ", "ref"], ["s", "Şibh-i muzâf", "شَبِيهٌ بِالمُضَافِ", "mz"]];
var MG = [["m", "Nekre-i maksûde", "نَكِرَةٌ مَقْصُودَةٌ", "cerr"], ["g", "Nekre-i gayr-i maksûde", "نَكِرَةٌ غَيْرُ مَقْصُودَةٍ", "mi"]];
var ED = [["q", "Yakın için (أَ، أَيْ)", "لِلْقَرِيبِ", "nasb"], ["u", "Uzak için (أَيَا، هَيَا)", "لِلْبَعِيدِ", "cerr"], ["h", "Her ikisi için (يَا)", "لِلْقَرِيبِ وَالبَعِيدِ", "mi"]];
var MTX = MT.concat([["x", "Münâdâ değil", "لَيْسَ مُنَادًى", "x"]]);
var HK = [["b", "Mebnî (merfû alâmeti üzere)", "مَبْنِيٌّ عَلَى مَا يُرْفَعُ بِهِ", "nasb"], ["n", "Mansûb", "مَنْصُوبٌ", "cerr"]];
var TUR_TR = { a: "Alem", m: "Nekre-i maksûde", g: "Gayr-i maksûde", z: "Muzâf", s: "Şibh-i muzâf", q: "Yakın", u: "Uzak", h: "Her ikisi", x: "Değil", b: "Mebnî", n: "Mansûb" };
// Makine: münâdâ türü × sayı/cinsiyet → [cümle, Türkçe]
var NT = ["Alem", "Nekre-i maksûde", "Gayr-i maksûde", "Muzâf", "Şibh-i muzâf", "Harf-i tarifli"];
var NN = ["Müfred müz.", "Müfred müen.", "Müsennâ", "Cem"];
var NX = [
  [["يَا:mz / سَعِيدُ،:nasb / تَعَالَ!:x", "Ey Saîd, gel!"], ["يَا:mz / فَاطِمَةُ،:nasb / تَعَالَيْ!:x", "Ey Fâtıma, gel!"], ["يَا:mz / مُحَمَّدَانِ،:nasb / تَعَالَيَا!:x", "Ey (iki) Muhammed, gelin!"], ["يَا:mz / مُحَمَّدُونَ،:nasb / تَعَالَوْا!:x", "Ey Muhammedler, gelin!"]],
  [["يَا:mz / طَالِبُ،:nasb / اجْلِسْ!:x", "Ey öğrenci (karşımdaki), otur!"], ["يَا:mz / طَالِبَةُ،:nasb / اجْلِسِي!:x", "Ey kız öğrenci, otur!"], ["يَا:mz / طَالِبَانِ،:nasb / اجْلِسَا!:x", "Ey iki öğrenci, oturun!"], ["يَا:mz / طُلَّابُ،:nasb / اجْلِسُوا!:x", "Ey öğrenciler, oturun!"]],
  [["يَا:mz / غَافِلًا،:nasb / تَنَبَّهْ!:x", "Ey (herhangi bir) gafil, uyan!"], ["يَا:mz / غَافِلَةً،:nasb / تَنَبَّهِي!:x", "Ey gafil kadın, uyan!"], ["يَا:mz / غَافِلَيْنِ،:nasb / تَنَبَّهَا!:x", "Ey iki gafil, uyanın!"], ["يَا:mz / غَافِلِينَ،:nasb / تَنَبَّهُوا!:x", "Ey gafiller, uyanın!"]],
  [["يَا:mz / طَالِبَ العِلْمِ،:nasb / اجْتَهِدْ!:x", "Ey ilim talebesi, çalış!"], ["يَا:mz / طَالِبَةَ العِلْمِ،:nasb / اجْتَهِدِي!:x", "Ey ilim talebesi (kız), çalış!"], ["يَا:mz / طَالِبَيِ العِلْمِ،:nasb / اجْتَهِدَا!:x", "Ey iki ilim talebesi, çalışın!"], ["يَا:mz / طُلَّابَ العِلْمِ،:nasb / اجْتَهِدُوا!:x", "Ey ilim talebeleri, çalışın!"]],
  [["يَا:mz / طَالِبًا عِلْمًا،:nasb / اجْتَهِدْ!:x", "Ey ilim arayan, çalış!"], ["يَا:mz / طَالِبَةً عِلْمًا،:nasb / اجْتَهِدِي!:x", "Ey ilim arayan (kız), çalış!"], ["يَا:mz / طَالِبَيْنِ عِلْمًا،:nasb / اجْتَهِدَا!:x", "Ey ilim arayan iki kişi, çalışın!"], ["يَا:mz / طَالِبِينَ عِلْمًا،:nasb / اجْتَهِدُوا!:x", "Ey ilim arayanlar, çalışın!"]],
  [["يَا أَيُّهَا:mz / الطَّالِبُ،:nasb / اجْتَهِدْ!:x", "Ey öğrenci, çalış!"], ["يَا أَيَّتُهَا:mz / الطَّالِبَةُ،:nasb / اجْتَهِدِي!:x", "Ey kız öğrenci, çalış!"], ["يَا أَيُّهَا:mz / الطَّالِبَانِ،:nasb / اجْتَهِدَا!:x", "Ey iki öğrenci, çalışın!"], ["يَا أَيُّهَا:mz / الطُّلَّابُ،:nasb / اجْتَهِدُوا!:x", "Ey öğrenciler, çalışın!"]]
];
var NH = [
  "Alem müfred: merfû alâmeti üzere mebnî (damme, müsennâda elif, cemde vav); mahallen mansûb.",
  "Nekre-i maksûde: belirli birine seslenilir; merfû alâmeti üzere mebnî, mahallen mansûb.",
  "Nekre-i gayr-i maksûde: belirsiz birine seslenilir; mansûb ve tenvinli.",
  "Muzâf: mansûb; müsennâ ve cemde nûn düşer.",
  "Şibh-i muzâf: mansûb ve tenvinli; ardından ma’mûlü gelir.",
  "harf-i tarifli isme doğrudan يَا gelmez: araya أَيُّهَا / أَيَّتُهَا girer; أَيُّ mebnî, ardındaki isim merfû sıfattır."
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
// Edat + münâdâ: [cümle, [edat ×3], [münâdâ ×3], Türkçe, açıklama]
function EM(x, i) { return CBP([x[0] + "<br>الأَدَاةُ:", x[1], "· المُنَادَى:", x[2]], i, x[3], x[4]); }
// Zabt + hüküm: [cümle, [biçim ×3], hüküm anahtarı, Türkçe, açıklama]
var HKS = { bd: "مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ؛ لِأَنَّهُ عَلَمٌ مُفْرَدٌ", bm: "مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ؛ لِأَنَّهُ نَكِرَةٌ مَقْصُودَةٌ", nz: "مَنْصُوبٌ؛ لِأَنَّهُ مُضَافٌ", ns: "مَنْصُوبٌ؛ لِأَنَّهُ شَبِيهٌ بِالمُضَافِ", ng: "مَنْصُوبٌ؛ لِأَنَّهُ نَكِرَةٌ غَيْرُ مَقْصُودَةٍ" };
var TRP = { bd: ["bd", "nz", "ng"], bm: ["bm", "ng", "nz"], nz: ["nz", "bm", "ns"], ns: ["ns", "nz", "bm"], ng: ["ng", "bm", "ns"] };
function ZH(x, i) { return CBP([x[0] + "<br>الضَّبْطُ:", x[1], "<br>الحُكْمُ:", TRP[x[2]].map(function (k) { return HKS[k]; })], i, x[3], x[4]); }

var METIN = "عِنْدَمَا جَاءَ الإِسْلَامُ جَعَلَ الحُبَّ وَالرَّحْمَةَ فِي قُلُوبِ المُؤْمِنِينَ بِهِ، وَنَشَرَ رُوحَ التَّعَاوُنِ وَالمُسَاوَاةِ فِي الدَّوْلَةِ الإِسْلَامِيَّةِ، فَأَحَبَّ كُلُّ مُسْلِمٍ أَخَاهُ المُسْلِمَ، وَسَاعَدَ كُلُّ إِنْسَانٍ أَخَاهُ الإِنْسَانَ، مَهْمَا كَانَ دِينُهُ وَمَهْمَا كَانَتْ طَبَقَتُهُ." +
  "<br>وَذَكَرَ التَّارِيخُ صُوَرًا جَمِيلَةً لِبَعْضِ المُؤْمِنِينَ أَصْحَابِ المَبَادِئِ العَظِيمَةِ الَّذِينَ قَدَّمُوا أَنْفُسَهُمْ وَأَمْوَالَهُمْ فِي سَبِيلِ اللهِ، وَهَذِهِ قِصَّةٌ لِوَاحِدٍ مِنْ هَؤُلَاءِ:" +
  "<br>فِي عَهْدِ الخَلِيفَةِ أَبِي بَكْرٍ الصِّدِّيقِ رَضِيَ اللهُ عَنْهُ أَصَابَتِ المُسْلِمِينَ فِي المَدِينَةِ مَجَاعَةٌ شَدِيدَةٌ. فِي تِلْكَ السَّنَةِ وَصَلَتْ قَافِلَةٌ كَبِيرَةٌ فِيهَا أَلْفُ جَمَلٍ تَحْمِلُ بِضَاعَةً مِنَ الشَّامِ، وَكَانَتْ تِلْكَ البِضَاعَةُ لِعُثْمَانَ بْنِ عَفَّانَ رَضِيَ اللهُ عَنْهُ. عِنْدَمَا وَقَفَتِ القَافِلَةُ أَمَامَ دَارِهِ أَذَاعَ النَّاسُ الخَبَرَ، وَسَمِعَ بِهَا سُكَّانُ المَدِينَةِ كُلُّهُمْ، فَأَتَى إِلَيْهِ التُّجَّارُ يُرِيدُونَ أَنْ يَشْتَرُوا مِنْهُ البِضَاعَةَ، وَدَارَتْ بَيْنَهُمْ وَبَيْنَ عُثْمَانَ مُحَادَثَةٌ فِي هَذَا المَوْضُوعِ." +
  "<br><b>عُثْمَانُ:</b> يَا تُجَّارَ المَدِينَةِ، تَفَضَّلُوا، مَاذَا تُرِيدُونَ؟" +
  "<br><b>التُّجَّارُ:</b> يَا عُثْمَانُ، إِنَّكَ تَعْلَمُ مَا نُرِيدُ؛ بِعْنَا مِنْ هَذَا الَّذِي جَاءَ إِلَيْكَ، فَإِنَّكَ تَعْلَمُ حَاجَةَ النَّاسِ إِلَيْهِ." +
  "<br><b>عُثْمَانُ:</b> كَمْ تَدْفَعُونَ لِي ـ يَا تُجَّارُ ـ فِي هَذِهِ البِضَاعَةِ؟" +
  "<br><b>التُّجَّارُ:</b> يَا ابْنَ عَفَّانَ، نَدْفَعُ لَكَ بِالدِّرْهَمِ دِرْهَمَيْنِ." +
  "<br><b>عُثْمَانُ:</b> لَقَدْ أُعْطِيتُ زِيَادَةً عَلَى هَذَا." +
  "<br><b>التُّجَّارُ:</b> نُعْطِيكَ بِالدِّرْهَمِ أَرْبَعَةً." +
  "<br><b>عُثْمَانُ:</b> يَا قَوْمِ، لَقَدْ أُعْطِيتُ أَكْثَرَ مِنْ ذَلِكَ." +
  "<br><b>التُّجَّارُ:</b> يَا ابْنَ عَفَّانَ، مَا فِي المَدِينَةِ تُجَّارٌ غَيْرُنَا، وَمَا سَبَقَنَا أَحَدٌ إِلَيْكَ، فَمَنْ أَعْطَاكَ أَكْثَرَ مِمَّا أَعْطَيْنَا؟" +
  "<br><b>عُثْمَانُ:</b> أَيُّهَا النَّاسُ، إِنَّ اللهَ أَعْطَانِي بِكُلِّ دِرْهَمٍ عَشَرَةً، فَهَلْ عِنْدَكُمْ زِيَادَةٌ؟" +
  "<br><b>التُّجَّارُ:</b> لَا." +
  "<br><b>عُثْمَانُ:</b> لَقَدْ بِعْتُ البِضَاعَةَ لِلَّهِ، وَجَعَلْتُ كُلَّ مَا حَمَلَتْ هَذِهِ الجِمَالُ لِفُقَرَاءِ المَدِينَةِ. ثُمَّ نَادَى أَهْلَ المَدِينَةِ: يَا مَعْشَرَ المُسْلِمِينَ، فَلْيَأْخُذْ كُلُّ فَقِيرٍ مَا يَكْفِيهِ وَأَهْلَهُ.";

var UNITS = [
// ---------------------------------------------------------------- 1 · ÜSLUP VE EDATLAR
{
  id: "u1", no: 1, ar: "أُسْلُوبُ النِّدَاءِ وَأَدَوَاتُهُ", tr: "Nidâ Üslubu ve Edatları", short: "Edatlar", col: "mz", legend: ["mz", "nasb"],
  goals: ["Nidânın çağırma ya da dikkat çekme üslubu olduğunu bilmek", "Nidâ cümlesinde edatı ve münâdâyı ayırmak", "Edatları yakın, uzak ve her ikisi için ayırmak: أَ، أَيْ، يَا، أَيَا، هَيَا"],
  examples: [
    { s: "يَا:mz / طَالِبَ العِلْمِ،:nasb / لَا تَتَسَرَّعْ!:-", tr: "Ey ilim talebesi, acele etme!", pair: "أَيَا:mz / فَاطِمَةُ،:nasb / هَلْ تَسْمَعِينَنِي؟:-", pairTr: "Ey (uzaktaki) Fâtıma, beni duyuyor musun?" },
    { s: "أَ:mz / تَاجِرُ،:nasb / مَاذَا تَعْرِضُ؟:-", tr: "Ey (yakındaki) tüccar, ne sergiliyorsun?", pair: "أَيْ:mz / خَلِيلُ،:nasb / رُدَّ عَلَى الهَاتِفِ!:-", pairTr: "Ey Halil, telefona bak!" }
  ],
  rules: [
    { tr: "<b>Nidâ üslubu</b> (<span class=\"ar\">أُسْلُوبُ النِّدَاءِ</span>), birini çağırmak ya da dikkatini çekmek için kullanılır. İki temel öğesi vardır: <b>nidâ edatı</b> ve <b>münâdâ</b> (seslenilen)." },
    { tr: "En çok kullanılan edatlar ve mesafeleri:", ex: ["أَ · أَيْ ← لِلْقَرِيبِ: أَعَادِلُ · أَيْ خَلِيلُ", "يَا ← لِكُلِّ مُنَادًى: يَا صَلَاحَ الدِّينِ", "أَيَا · هَيَا ← لِلْبَعِيدِ: أَيَا إِبْرَاهِيمُ · هَيَا سَلِيمُ"] },
    { tr: "Nidâ cümlesinde münâdâdan sonra çoğu zaman bir <b>emir</b>, <b>nehy</b>, <b>soru</b> ya da <b>dua</b> gelir: <span class=\"ar\">يَا سَلِيمُ، لَا تَقْلَقْ! · يَا رَسُولَ اللهِ، خُذْ بِيَدِي</span>." },
    { tr: "Nidâ hamzası (<span class=\"ar\">أَعَادِلُ</span>) ile soru hamzasını (<span class=\"ar\">أَأَنْتَ فَعَلْتَ هَذَا؟</span>) karıştırma: nidâ hamzasından sonra seslenilen isim gelir." }
  ],
  kaide: ["أُسْلُوبُ النِّدَاءِ: هُوَ أُسْلُوبٌ يُسْتَخْدَمُ لِلِاسْتِدْعَاءِ أَوِ التَّنْبِيهِ عَنْ طَرِيقِ اسْتِعْمَالِ أَدَوَاتٍ تُسَمَّى «أَدَوَاتِ النِّدَاءِ». يَتَكَوَّنُ هَذَا الأُسْلُوبُ مِنْ عُنْصُرَيْنِ أَسَاسِيَّيْنِ هُمَا: أَدَاةُ النِّدَاءِ وَالمُنَادَى.", "١ ـ أَدَوَاتُ النِّدَاءِ الأَكْثَرُ اسْتِعْمَالًا: أَ، أَيْ، يَا، أَيَا، هَيَا. أ ـ «أَ» وَ«أَيْ» يُسْتَعْمَلَانِ لِنِدَاءِ القَرِيبِ، مِثْلُ: أَعَادِلُ سَاعِدْنِي فِي رَفْعِ الحِمْلِ؛ أَيْ خَلِيلُ رُدَّ عَلَى الهَاتِفِ. ب ـ وَتُسْتَعْمَلُ «يَا» لِكُلِّ مُنَادًى، بَعِيدًا كَانَ أَوْ قَرِيبًا، مِثْلُ: يَا صَلَاحَ الدِّينِ، مَهْلًا. جـ ـ وَتُسْتَعْمَلُ «أَيَا» وَ«هَيَا» لِنِدَاءِ البَعِيدِ، مِثْلُ: أَيَا إِبْرَاهِيمُ، تَعَالَ. هَيَا سَلِيمُ، هَلْ أَتْمَمْتَ كِتَابَةَ وَاجِبِكَ؟"],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنْ أَدَاةَ النِّدَاءِ وَالاسْمَ المُنَادَى فِي الجُمَلِ الآتِيَةِ", tr: "Nidâ edatını ve münâdâyı seç.", exHtml: "<span class=\"ar\">يَا رَاكِبَ الدَّرَّاجَةِ، انْتَبِهْ! ← الأَدَاةُ: يَا · المُنَادَى: رَاكِبَ الدَّرَّاجَةِ</span>", items: [
      ["أَعَادِلُ! سَاعِدْنِي فِي رَفْعِ هَذَا الصُّنْدُوقِ.", ["أَ", "يَا", "أَيْ"], ["عَادِلُ", "الصُّنْدُوقِ", "رَفْعِ"], "Âdil! Bu sandığı kaldırmama yardım et.", "Yakın için hamza."],
      ["أَيْ خَلِيلُ، رُدَّ عَلَى الهَاتِفِ!", ["أَيْ", "أَ", "يَا"], ["خَلِيلُ", "الهَاتِفِ", "رُدَّ"], "Halil, telefona bak!", "Yakın için أَيْ."],
      ["يَا صَلَاحَ الدِّينِ، تَوَقَّفْ قَلِيلًا وَلَا تُتْعِبْ نَفْسَكَ!", ["يَا", "أَيَا", "هَيَا"], ["صَلَاحَ الدِّينِ", "الدِّينِ", "نَفْسَكَ"], "Selâhaddin, biraz dur, kendini yorma!", "Muzâf münâdâ."],
      ["يَا إِخْوَانُ، اقْتَرِبُوا مِنَّا حَتَّى لَا يُدْرِكَكُمُ العَدُوُّ.", ["يَا", "أَ", "أَيْ"], ["إِخْوَانُ", "العَدُوُّ", "مِنَّا"], "Kardeşler, düşman size yetişmesin diye bize yaklaşın.", "Nekre-i maksûde."],
      ["أَيَا إِبْرَاهِيمُ، تَعَالَ!", ["أَيَا", "يَا", "هَيَا"], ["إِبْرَاهِيمُ", "تَعَالَ", "أَيَا"], "Ey İbrâhim, gel!", "Uzak için أَيَا."],
      ["هَيَا سَلِيمُ، هَلْ أَتْمَمْتَ وَصْلَ الكَهْرَبَاءِ؟", ["هَيَا", "أَيَا", "يَا"], ["سَلِيمُ", "الكَهْرَبَاءِ", "وَصْلَ"], "Ey Selim, elektriği bağlamayı bitirdin mi?", "Uzak için هَيَا."],
      ["يَا رَسُولَ اللهِ، خُذْ بِيَدِي.", ["يَا", "أَ", "أَيَا"], ["رَسُولَ اللهِ", "اللهِ", "يَدِي"], "Ey Allah’ın Resûlü, elimden tut.", "Muzâf."],
      ["يَا عَبْدَ الرَّحْمَنِ، هَلُمَّ!", ["يَا", "أَيْ", "هَيَا"], ["عَبْدَ الرَّحْمَنِ", "الرَّحْمَنِ", "هَلُمَّ"], "Ey Abdurrahman, gel!", "Muzâf."]
    ].map(EM) },
    { type: "classify", extra: true, opts: ED, ar: "لِمَنْ تُسْتَعْمَلُ الأَدَاةُ؟", tr: "Koyu edat yakın için mi, uzak için mi, her ikisi için mi?", items: CL([
      [HL("أَعَادِلُ، سَاعِدْنِي", "أَ"), "q", "Hamza: yakın."],
      [HL("أَيْ خَلِيلُ، رُدَّ عَلَى الهَاتِفِ", "أَيْ"), "q", "Yakın."],
      [HL("أَتَاجِرُ، مَاذَا تَعْرِضُ؟", "أَ"), "q", "Yakın."],
      [HL("أَيْ بُنَيَّ، اسْمَعْ نَصِيحَتِي", "أَيْ"), "q", "Yakın."],
      [HL("أَيَا إِبْرَاهِيمُ، تَعَالَ", "أَيَا"), "u", "Uzak."],
      [HL("هَيَا سَلِيمُ، هَلْ أَتْمَمْتَ وَاجِبَكَ؟", "هَيَا"), "u", "Uzak."],
      [HL("أَيَا فَاطِمَةُ، هَلْ تَسْمَعِينَنِي؟", "أَيَا"), "u", "Uzak."],
      [HL("أَيَا مُؤْمِنًا، حَاسِبْ نَفْسَكَ", "أَيَا"), "u", "Uzak."],
      [HL("يَا صَلَاحَ الدِّينِ، مَهْلًا", "يَا"), "h", "يَا her mesafe için."],
      [HL("يَا رَسُولَ اللهِ، خُذْ بِيَدِي", "يَا"), "h", "Her ikisi."],
      [HL("يَا أَيُّهَا الإِنْسَانُ", "يَا"), "h", "Her ikisi."],
      [HL("يَا عَبْدَ الرَّحْمَنِ، هَلُمَّ", "يَا"), "h", "Her ikisi."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · MÜNÂDÂNIN TÜRLERİ
{
  id: "u2", no: 2, ar: "أَنْوَاعُ المُنَادَى", tr: "Münâdânın Beş Türü", short: "Türler", col: "nasb", legend: ["mz", "nasb"],
  goals: ["Münâdânın beş türünü bilmek: alem, nekre-i maksûde, nekre-i gayr-i maksûde, muzâf, şibh-i muzâf", "Nekre-i maksûde ile gayr-i maksûdeyi ayırmak", "Şibh-i muzâfı muzâftan ayırmak"],
  examples: [
    { s: "يَا:mz / سَعِيدُ:nasb", tr: "Ey Saîd! (alem)", pair: "يَا:mz / شُرْطِيُّ:nasb", pairTr: "Ey polis! (karşımdaki polis: nekre-i maksûde)" },
    { s: "أَيَا:mz / سَامِعًا:nasb / سَاعِدْنِي!:-", tr: "Ey (beni duyan herhangi biri), yardım et! (nekre-i gayr-i maksûde)", pair: "يَا:mz / مُتْقِنًا عَمَلَهُ:nasb / وَفَّقَكَ اللهُ!:-", pairTr: "Ey işini sağlam yapan, Allah seni başarılı kılsın! (şibh-i muzâf)" }
  ],
  rules: [
    { tr: "<b>Alem</b>: özel isim: <span class=\"ar\">يَا سَعِيدُ، يَا مُصْطَفَى</span>." },
    { tr: "<b>Nekre-i maksûde</b>: adını kullanmadan, sıfatı ya da göreviyle <b>belirli</b> birine seslenmek: <span class=\"ar\">يَا شُرْطِيُّ، يَا سَائِقُ</span> (karşımdaki polis, şoför)." },
    { tr: "<b>Nekre-i gayr-i maksûde</b>: <b>belirli olmayan</b> birine seslenmek; örneğin asansörde kalan birinin “Beni duyan biri, yardım edin!” demesi: <span class=\"ar\">أَيَا سَامِعًا سَاعِدْنِي!</span>" },
    { tr: "<b>Muzâf</b>: <span class=\"ar\">يَا عَبْدَ الرَّحْمَنِ، يَا رَاكِبَ الدَّرَّاجَةِ</span>. <b>Şibh-i muzâf</b>: fiili gibi amel eden müştak (ism-i fâil, ism-i mef’ûl, sıfat-ı müşebbehe, ism-i tafdîl) ve ma’mûlü: <span class=\"ar\">يَا مُتْقِنًا عَمَلَهُ · يَا حَسَنًا خُلُقُهُ</span>." },
    { tr: "İpucu: harekeye bak. <span class=\"ar\">يَا نَائِمُ</span> (damme, tenvinsiz) → maksûde; <span class=\"ar\">يَا رَاكِبًا</span> (tenvinli fetha) → gayr-i maksûde." }
  ],
  kaide: ["٢ ـ المُنَادَى: هُوَ الاسْمُ المَذْكُورُ بَعْدَ أَدَاةِ النِّدَاءِ لِلتَّنْبِيهِ أَوِ الاسْتِدْعَاءِ، مِثْلُ: يَا عَبْدَ الرَّحْمَنِ، انْتَبِهْ إِلَى شَرْحِ المُعَلِّمِ! المُنَادَى خَمْسَةُ أَنْوَاعٍ، هِيَ: أ ـ العَلَمُ، مِثْلُ: يَا سَعِيدُ، يَا مُصْطَفَى. ب ـ النَّكِرَةُ المَقْصُودَةُ: وَتَعْنِي نِدَاءَ مَنْ تَعْرِفُ اسْمَهُ بِدَلَالَةِ صِفَتِهِ أَوْ وَظِيفَتِهِ، مِثْلُ: يَا شُرْطِيُّ، وَيَا سَائِقُ. جـ ـ النَّكِرَةُ غَيْرُ المَقْصُودَةِ: وَتَعْنِي نِدَاءَ مَنْ لَا تَعْرِفُ اسْمَهُ وَلَا صِفَتَهُ، مِثْلُ نِدَاءِ شَخْصٍ حُصِرَ فِي مِصْعَدٍ: أَيَا سَامِعًا سَاعِدْنِي! د ـ المُنَادَى المُضَافُ، مِثْلُ: يَا عَبْدَ الرَّحْمَنِ، وَيَا رَاكِبَ الدَّرَّاجَةِ. هـ ـ المُنَادَى الشَّبِيهُ بِالمُضَافِ، وَهُوَ المُشْتَقُّ العَامِلُ عَمَلَ فِعْلِهِ، مِثْلُ: يَا مُتْقِنًا عَمَلَهُ، وَفَّقَكَ اللهُ! يَا حَسَنًا خُلُقُهُ."],
  ex: [
    { type: "classify", num: "٢", opts: MT, ar: "عَيِّنْ نَوْعَ المُنَادَى فِي الجُمَلِ التَّالِيَةِ", tr: "Koyu münâdânın türünü seç.", exHtml: "<span class=\"ar\">يَا طَالِبَ العِلْمِ، لَا تُهْمِلْ قِرَاءَةَ القُرْآنِ! ← مُضَافٌ · يَا سَلِيمُ، لَا تَقْلَقْ! ← عَلَمٌ</span>", items: CL([
      [HL("أَيَا سَامِعًا سَاعِدْنِي!", "سَامِعًا"), "g", "Belirsiz biri; tenvinli mansûb."],
      [HL("أَيْ عَبْدَ الرَّحْمَنِ، تَمَسَّكْ بِالصِّدْقِ وَالأَخْلَاقِ!", "عَبْدَ الرَّحْمَنِ"), "z", "Muzâf."],
      [HL("يَا مُحْسِنًا، أَجْرُكَ عَلَى اللهِ!", "مُحْسِنًا"), "g", "Belirsiz bir hayırsevere; tenvinli."],
      [HL("هَيَا سَلِيمُ، هَلْ أَتْمَمْتَ الإِجْرَاءَاتِ الرَّسْمِيَّةَ؟", "سَلِيمُ"), "a", "Özel isim."],
      [HL("يَا حَارِسًا، أَعَانَكَ اللهُ!", "حَارِسًا"), "g", "Tenvinli: gayr-i maksûde."],
      [HL("يَا مُتْقِنًا عَمَلَهُ، وَفَّقَكَ اللهُ!", "مُتْقِنًا عَمَلَهُ"), "s", "İsm-i fâil + mef’ûlü."],
      [HL("أَيَا طُلَّابَ العَرَبِيَّةِ، اقْرَؤُوا القُرْآنَ لَيْلَ نَهَارَ.", "طُلَّابَ العَرَبِيَّةِ"), "z", "Muzâf."],
      [HL("يَا ابْنَ الكِرَامِ لَا تَتَسَرَّعْ!", "ابْنَ الكِرَامِ"), "z", "Muzâf."]
    ]) },
    { type: "classify", num: "٣", opts: MG, ar: "عَيِّنِ النَّكِرَةَ المَقْصُودَةَ وَالنَّكِرَةَ غَيْرَ المَقْصُودَةِ", tr: "Koyu münâdâ nekre-i maksûde mi, gayr-i maksûde mi?", exHtml: "<span class=\"ar\">يَا رَاكِبًا، انْتَبِهْ! ← نَكِرَةٌ غَيْرُ مَقْصُودَةٍ · يَا نَائِمُ، اسْتَيْقِظْ! ← نَكِرَةٌ مَقْصُودَةٌ</span>", items: CL([
      [HL("يَا عَالِمُ، انْشُرْ عِلْمَكَ، وَلَا تَكُنْ بَخِيلًا!", "عَالِمُ"), "m", "Belirli bir âlime; damme üzere mebnî."],
      [HL("يَا قَاضِيًا، مَا أَسْوَأَ أَلَّا يُعَاقَبَ المُجْرِمُ!", "قَاضِيًا"), "g", "Tenvinli: belirsiz bir hâkim."],
      [HL("يَا رَاكِبَانِ، مَا أَبْطَأَ السَّيَّارَةَ الَّتِي تَرْكَبَانِهَا!", "رَاكِبَانِ"), "m", "Belirli iki kişi; elif üzere mebnî."],
      [HL("أَمُهْمِلًا، إِنَّ الكَسَلَ مَرَضٌ لَا دَوَاءَ لَهُ!", "مُهْمِلًا"), "g", "Tenvinli."],
      [HL("هَيَا مُدَرِّسُونَ، مَا أَحْسَنَ مُعَامَلَتَكُمْ لِطُلَّابِكُمْ!", "مُدَرِّسُونَ"), "m", "Belirli öğretmenler; vav üzere mebnî."],
      [HL("يَا ظَالِمًا، مَا أَشَدَّ عَاقِبَةَ ظُلْمِكَ يَوْمَ القِيَامَةِ!", "ظَالِمًا"), "g", "Tenvinli."],
      [HL("أَيَا مُؤْمِنًا، حَاسِبْ نَفْسَكَ قَبْلَ أَنْ تُحَاسَبَ!", "مُؤْمِنًا"), "g", "Tenvinli: her mümine."],
      [HL("أَيَا سَاكِتُ، حَدِّثْنَا عَنْ مُشْكِلَتِكَ!", "سَاكِتُ"), "m", "Karşıdaki susan kişi; damme."]
    ]) },
    { type: "classify", extra: true, opts: MT, ar: "مَا نَوْعُ المُنَادَى؟", tr: "Münâdânın türünü seç.", items: CL([
      [HL("يَا سَعِيدُ", "سَعِيدُ"), "a", "Alem."],
      [HL("يَا مُصْطَفَى", "مُصْطَفَى"), "a", "Alem (takdiren mebnî)."],
      [HL("يَا فَاطِمَةُ، أَكْمِلِي الرِّسَالَةَ", "فَاطِمَةُ"), "a", "Alem."],
      [HL("أَيَا إِبْرَاهِيمُ، تَعَالَ", "إِبْرَاهِيمُ"), "a", "Alem."],
      [HL("يَا شُرْطِيُّ، سَاعِدْنِي", "شُرْطِيُّ"), "m", "Belirli bir polis."],
      [HL("يَا سَائِقُ، تَمَهَّلْ", "سَائِقُ"), "m", "Belirli bir şoför."],
      [HL("يَا تَاجِرُ، مَاذَا تَعْرِضُ؟", "تَاجِرُ"), "m", "Karşıdaki tüccar."],
      [HL("يَا نَائِمُ، اسْتَيْقِظْ", "نَائِمُ"), "m", "Belirli bir uyuyan."],
      [HL("يَا رَاكِبًا، انْتَبِهْ", "رَاكِبًا"), "g", "Belirsiz bir binici."],
      [HL("يَا غَافِلًا، تَنَبَّهْ", "غَافِلًا"), "g", "Belirsiz."],
      [HL("يَا عَبْدَ الرَّحْمَنِ", "عَبْدَ الرَّحْمَنِ"), "z", "Muzâf."],
      [HL("يَا رَاكِبَ الدَّرَّاجَةِ", "رَاكِبَ الدَّرَّاجَةِ"), "z", "Muzâf."],
      [HL("يَا طَالِبَ العِلْمِ", "طَالِبَ العِلْمِ"), "z", "Muzâf."],
      [HL("يَا حَسَنًا خُلُقُهُ", "حَسَنًا خُلُقُهُ"), "s", "Sıfat-ı müşebbehe + fâili."],
      [HL("يَا طَالِعًا جَبَلًا", "طَالِعًا جَبَلًا"), "s", "İsm-i fâil + mef’ûlü."],
      [HL("يَا مُقَلِّبًا القُلُوبَ", "مُقَلِّبًا القُلُوبَ"), "s", "İsm-i fâil + mef’ûlü."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · İ’RAB
{
  id: "u3", no: 3, ar: "إِعْرَابُ المُنَادَى", tr: "Münâdânın İ’rabı", short: "İ’rab", col: "cerr", legend: ["mz", "nasb"],
  goals: ["Alem ve nekre-i maksûdenin merfû alâmeti üzere mebnî olduğunu bilmek", "Muzâf, şibh-i muzâf ve gayr-i maksûdenin mansûb olduğunu bilmek", "Münâdâyı harekeleyip hükmünü ve sebebini söylemek"],
  examples: [
    { s: "يَا:mz / فَاطِمَةُ،:nasb / أَكْمِلِي الرِّسَالَةَ.:-", tr: "Fâtıma, mektubu bitir. (mebnî: damme)", pair: "يَا:mz / تَاجِرُ،:nasb / مَاذَا تَعْرِضُ؟:-", pairTr: "Tüccar, ne sergiliyorsun? (mebnî: damme)" },
    { s: "يَا:mz / طَالِبَ العِلْمِ،:nasb / لَا تَتَسَرَّعْ!:-", tr: "İlim talebesi, acele etme! (mansûb: muzâf)", pair: "يَا:mz / حَسَنًا خُلُقُهُ:nasb / تَقَدَّمْ!:-", pairTr: "Ahlakı güzel olan, öne geç! (mansûb: şibh-i muzâf)" }
  ],
  rules: [
    { tr: "<b>Mebnî</b> münâdâ (merfû alâmeti üzere, mahallen mansûb): <b>müfred alem</b> ve <b>nekre-i maksûde</b>:", ex: ["يَا فَاطِمَةُ (ضَمَّةٌ) · يَا طَالِبَانِ (أَلِفٌ) · يَا مُدَرِّسُونَ (وَاوٌ)", "يَا مُصْطَفَى (ضَمَّةٌ مُقَدَّرَةٌ)"] },
    { tr: "<b>Mansûb</b> münâdâ: <b>muzâf</b> (<span class=\"ar\">يَا طَالِبَ العِلْمِ</span>), <b>şibh-i muzâf</b> (<span class=\"ar\">يَا حَسَنًا خُلُقُهُ</span>) ve <b>nekre-i gayr-i maksûde</b> (<span class=\"ar\">يَا سَامِعًا</span>)." },
    { tr: "Burada “müfred” tek kelime demektir (muzâf ya da şibh-i muzâf olmayan); ikil ve çoğul da müfred sayılır: <span class=\"ar\">يَا مُحَمَّدَانِ · يَا مُحَمَّدُونَ</span>." },
    { tr: "Mansûb münâdâ tenvini korur (gayr-i maksûde, şibh-i muzâf); muzâf ise tenvin almaz ve müsennâ / cem nûnu düşer: <span class=\"ar\">يَا مُدَرِّسِي الحِسَابِ</span>." }
  ],
  kaide: ["إِعْرَابُ المُنَادَى: أ ـ يُبْنَى عَلَى مَا يُرْفَعُ بِهِ: إِذَا كَانَ عَلَمًا مُفْرَدًا، مِثْلُ: يَا فَاطِمَةُ، أَكْمِلِي الرِّسَالَةَ. أَوْ إِذَا كَانَ نَكِرَةً مَقْصُودَةً، مِثْلُ: يَا تَاجِرُ، مَاذَا تَعْرِضُ؟ ب ـ وَيُنْصَبُ المُنَادَى: إِذَا كَانَ مُضَافًا، مِثْلُ: يَا طَالِبَ العِلْمِ، لَا تَتَسَرَّعْ! أَوْ إِذَا كَانَ شَبِيهًا بِالمُضَافِ، مِثْلُ: يَا حَسَنًا خُلُقُهُ تَقَدَّمْ! أَوْ إِذَا كَانَ نَكِرَةً غَيْرَ مَقْصُودَةٍ، مِثْلُ: يَا سَامِعًا سَاعِدْنِي."],
  ex: [
    { type: "combo", num: "٧", ar: "شَكِّلِ المُنَادَى فِيمَا يَأْتِي ثُمَّ بَيِّنْ حُكْمَ وَسَبَبَ الإِعْرَابِ", tr: "Münâdânın doğru harekesini ve i’rab hükmünü seç.", exHtml: "<span class=\"ar\">اللَّهُمَّ يَا غَافِرَ الذَّنْبِ وَيَا قَابِلَ التَّوْبِ ← مَنْصُوبٌ بِالفَتْحَةِ؛ لِأَنَّهُ مُضَافٌ</span>", items: [
      ["﴿___ لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا﴾", ["رَبَّنَا", "رَبُّنَا", "رَبِّنَا"], "nz", "Rabbimiz, unutur ya da yanılırsak bizi sorumlu tutma. (Bakara 286)", "Edat (يَا) hazfedilmiş; muzâf."],
      ["﴿قَالُوا يَا ___ قَدْ جَادَلْتَنَا فَأَكْثَرْتَ جِدَالَنَا﴾", ["نُوحُ", "نُوحًا", "نُوحٍ"], "bd", "“Ey Nûh, bizimle tartıştın, hem de çok tartıştın” dediler. (Hûd 32)", "Müfred alem."],
      ["﴿قَالُوا أَأَنْتَ فَعَلْتَ هَذَا بِآلِهَتِنَا يَا ___﴾", ["إِبْرَاهِيمُ", "إِبْرَاهِيمَ", "إِبْرَاهِيمٍ"], "bd", "“Bunu ilahlarımıza sen mi yaptın ey İbrâhim?” dediler. (Enbiyâ 62)", "Müfred alem."],
      ["أَيَا ___، لَا طَرِيقَ إِلَى النَّجَاحِ غَيْرُ العَمَلِ!", ["طَالِبَاتُ", "طَالِبَاتٍ", "طَالِبَاتِ"], "bm", "Kız öğrenciler, başarıya çalışmaktan başka yol yok!", "Belirli kızlara: nekre-i maksûde."],
      ["يَا ___، لَا تَنْسَ أَنَّكَ تَمْشِي عَلَى عَجَلَتَيْنِ!", ["رَاكِبًا الدَّرَّاجَةَ", "رَاكِبُ الدَّرَّاجَةِ", "رَاكِبٌ الدَّرَّاجَةَ"], "ns", "Ey bisiklete binen, iki tekerlek üstünde gittiğini unutma!", "İsm-i fâil + mef’ûlü: şibh-i muzâf (muzâf söyleyiş: رَاكِبَ الدَّرَّاجَةِ)."],
      ["يَا ___، إِنَّ الجَنَّةَ تَحْتَ قَدَمَيْكِ!", ["أَيَّتُهَا الأُمُّ", "أَيَّتَهَا الأُمَّ", "أَيَّتُهَا الأُمَّ"], "bm", "Ey anne, cennet ayaklarının altındadır!", "أَيَّةُ nekre-i maksûde, mebnî; الأُمُّ sıfat, merfû."],
      ["هَيَا ___، لَيْسَ هُنَاكَ نِعْمَةٌ أَكْبَرُ مِنَ الإِيمَانِ!", ["مُؤْمِنًا", "مُؤْمِنُ", "مُؤْمِنٍ"], "ng", "Ey mümin, imandan büyük nimet yoktur!", "Her mümine: gayr-i maksûde."],
      ["يَا ___، أَنْتَ الَّذِي عَلَّمْتَنَا مَكَارِمَ الأَخْلَاقِ!", ["رَسُولَ اللهِ", "رَسُولُ اللهِ", "رَسُولِ اللهِ"], "nz", "Ey Allah’ın Resûlü, bize güzel ahlakı sen öğrettin!", "Muzâf."]
    ].map(ZH) },
    { type: "pick", fill: true, extra: true, ar: "اضْبِطِ المُنَادَى", tr: "Boşluğa münâdânın doğru biçimini seç.", items: PL([
      ["يَا ___، أَكْمِلِي الرِّسَالَةَ. (فَاطِمَة)", "فَاطِمَةُ", "فَاطِمَةَ", "فَاطِمَةً", "Fâtıma, mektubu bitir.", "Alem: damme üzere mebnî."],
      ["يَا ___، مَاذَا تَعْرِضُ؟ (karşıdaki tüccar)", "تَاجِرُ", "تَاجِرًا", "تَاجِرَ", "Tüccar, ne sergiliyorsun?", "Nekre-i maksûde: damme."],
      ["يَا ___ العِلْمِ، لَا تَتَسَرَّعْ!", "طَالِبَ", "طَالِبُ", "طَالِبًا", "İlim talebesi, acele etme!", "Muzâf: mansûb, tenvinsiz."],
      ["يَا ___ خُلُقُهُ، تَقَدَّمْ!", "حَسَنًا", "حَسَنُ", "حَسَنٌ", "Ahlakı güzel olan, öne geç!", "Şibh-i muzâf: tenvinli mansûb."],
      ["أَيَا ___ سَاعِدْنِي! (belirsiz biri)", "سَامِعًا", "سَامِعُ", "سَامِعٍ", "Beni duyan biri, yardım et!", "Gayr-i maksûde: tenvinli."],
      ["يَا ___، اسْتَيْقِظْ! (karşıdaki uyuyan)", "نَائِمُ", "نَائِمًا", "نَائِمِ", "Uyuyan, uyan!", "Maksûde: damme."],
      ["يَا ___ الرَّحْمَنِ، انْتَبِهْ!", "عَبْدَ", "عَبْدُ", "عَبْدِ", "Abdurrahman, dikkat et!", "Muzâf."],
      ["يَا ___، اجْلِسَا! (karşıdaki iki öğrenci)", "طَالِبَانِ", "طَالِبَيْنِ", "طَالِبُونَ", "İki öğrenci, oturun!", "Maksûde müsennâ: elif üzere mebnî."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · أَيُّهَا، اللَّهُمَّ، HAZF
{
  id: "u4", no: 4, ar: "أَيُّهَا وَأَيَّتُهَا · اللَّهُمَّ · حَذْفُ حَرْفِ النِّدَاءِ", tr: "Eyyühâ, Allâhümme ve Edatın Hazfı", short: "أَيُّهَا", col: "mi", legend: ["mz", "nasb"],
  goals: ["harf-i tarifli isme أَيُّهَا / أَيَّتُهَا ile seslenmek", "يَا اللهُ ve اللَّهُمَّ kullanımını bilmek", "يَا’nın hazfedildiği cümleleri tanımak"],
  examples: [
    { s: "يَا أَيُّهَا:mz / الإِنْسَانُ:nasb / مَا غَرَّكَ بِرَبِّكَ الكَرِيمِ:-", tr: "Ey insan, seni kerim olan Rabbine karşı ne aldattı? (İnfitâr 6)", pair: "يَا أَيَّتُهَا:mz / النَّفْسُ المُطْمَئِنَّةُ:nasb", pairTr: "Ey huzura ermiş nefis! (Fecr 27)" },
    { s: "اللَّهُمَّ:nasb / أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ:-", tr: "Allah’ım, Selâm sensin, selamet sendendir.", pair: "رَبِّ:nasb / أَرِنِي أَنْظُرْ إِلَيْكَ:-", pairTr: "Rabbim, bana (kendini) göster, sana bakayım. (A’râf 143)" }
  ],
  rules: [
    { tr: "harf-i tarifli isme seslenirken araya müzekkerde <b><span class=\"ar\">أَيُّهَا</span></b>, müennesde <b><span class=\"ar\">أَيَّتُهَا</span></b> girer; ikil ve çoğulda da aynı kalır:", ex: ["يَا أَيُّهَا الأُسْتَاذُ · يَا أَيُّهَا المُهَنْدِسُونَ · يَا أَيُّهَا النَّاسُ", "يَا أَيَّتُهَا الطَّالِبَاتُ · يَا أَيَّتُهَا الأُمَّهَاتُ"] },
    { tr: "Lafza-i celâlde istisna: <span class=\"ar\">يَا اللهُ</span>. Ayrıca يَا atılıp yerine şeddeli, fethalı bir mim eklenir: <span class=\"ar\">اللَّهُمَّ</span> (tazim)." },
    { tr: "Yalnız <span class=\"ar\">يَا</span> sıkça hazfedilir: <span class=\"ar\">﴿يُوسُفُ أَعْرِضْ عَنْ هَذَا﴾ · ﴿رَبِّ أَرِنِي﴾ · أَيُّهَا الرَّجُلُ · أَيَّتُهَا الفَتَاةُ</span> (takdiri: يَا يُوسُفُ، يَا رَبِّ، يَا أَيُّهَا…)." },
    { tr: "İ’rab: <span class=\"ar\">أَيُّ</span> nekre-i maksûdedir, damme üzere mebnî; <span class=\"ar\">هَا</span> tenbih; ardındaki harf-i tarifli isim merfû sıfattır: <span class=\"ar\">يَا أَيُّهَا النَّاسُ</span>." },
    { tr: "Cümle kurarken zamiri münâdâya uydur: <span class=\"ar\">أَيُّهَا الأَصْدِقَاءُ، مَنْ حَدَّثَكُمْ… · أَيَّتُهَا الصَّدِيقَاتُ، مَنْ ذَكَرَ لَكُنَّ…</span>. <span class=\"ar\">قَالَ</span>’dan sonra <span class=\"ar\">إِنَّ</span>, öbür fiillerden sonra <span class=\"ar\">أَنَّ</span> gelir." }
  ],
  kaide: ["٣ ـ عِنْدَ نِدَاءِ الاسْمِ الَّذِي فِيهِ «الـ» التَّعْرِيفِ يُؤْتَى قَبْلَهُ بِكَلِمَةِ «أَيُّهَا» لِلْمُذَكَّرِ، وَ«أَيَّتُهَا» لِلْمُؤَنَّثِ، وَتَبْقَيَانِ مَعَ التَّثْنِيَةِ وَالجَمْعِ بِلَفْظٍ وَاحِدٍ، مِثْلُ قَوْلِهِ تَعَالَى: ﴿يَا أَيُّهَا الإِنْسَانُ مَا غَرَّكَ بِرَبِّكَ الكَرِيمِ﴾، وَقَوْلِهِ: ﴿يَا أَيَّتُهَا النَّفْسُ المُطْمَئِنَّةُ﴾، وَقَوْلِهِ: ﴿يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ﴾.", "٤ ـ إِذَا كَانَ المُنَادَى لَفْظَ الجَلَالَةِ (اللهُ) تَقُولُ: يَا اللهُ، وَقَدْ تُحْذَفُ يَاءُ النِّدَاءِ وَيُعَوَّضُ عَنْهَا بِمِيمٍ مُشَدَّدَةٍ مَفْتُوحَةٍ دَلَالَةً عَلَى التَّعْظِيمِ، مِثْلُ: اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ.", "٥ ـ يَجُوزُ حَذْفُ حَرْفِ النِّدَاءِ بِكَثْرَةٍ إِذَا كَانَ «يَا» دُونَ غَيْرِهَا، مِثْلُ قَوْلِهِ تَعَالَى: ﴿يُوسُفُ أَعْرِضْ عَنْ هَذَا﴾، وَ﴿رَبِّ أَرِنِي أَنْظُرْ إِلَيْكَ﴾، وَمِثْلُ: أَيُّهَا الرَّجُلُ، وَأَيَّتُهَا الفَتَاةُ. وَالتَّقْدِيرُ: يَا يُوسُفُ، وَيَا رَبِّ، وَيَا أَيُّهَا، وَيَا أَيَّتُهَا."],
  ex: [
    { type: "pick", fill: true, num: "٤", ar: "امْلَإِ الفَرَاغَ بِـ«يَا أَيُّهَا» أَوْ «يَا أَيَّتُهَا»", tr: "Boşluğa uygun nidâyı seç.", exHtml: "<span class=\"ar\">يَا أَيُّهَا الأُسْتَاذُ! · يَا أَيَّتُهَا الطَّالِبَاتُ!</span>", items: PL([
      ["___ المُخْلِصُ فِي دِينِهِ!", "يَا أَيُّهَا", "يَا أَيَّتُهَا", "يَا", "Ey dininde ihlaslı olan!", "Müzekker."],
      ["___ العَامِلَةُ الكَسُولَةُ!", "يَا أَيَّتُهَا", "يَا أَيُّهَا", "يَا", "Ey tembel işçi kadın!", "Müennes."],
      ["___ الأَطِبَّاءُ المُشْفِقُونَ!", "يَا أَيُّهَا", "يَا أَيَّتُهَا", "يَا", "Ey şefkatli doktorlar!", "Çoğulda da أَيُّهَا."],
      ["___ السُّيَّاحُ الأُورُوبِّيُّونَ!", "يَا أَيُّهَا", "يَا أَيَّتُهَا", "يَا", "Ey Avrupalı turistler!", "Müzekker çoğul."],
      ["___ المُهَنْدِسُونَ النَّشِيطُونَ!", "يَا أَيُّهَا", "يَا أَيَّتُهَا", "يَا", "Ey çalışkan mühendisler!", "Müzekker."],
      ["___ الفَتَيَاتُ المُؤَدَّبَاتُ!", "يَا أَيَّتُهَا", "يَا أَيُّهَا", "يَا", "Ey edepli kızlar!", "Müennes çoğulda da أَيَّتُهَا."],
      ["___ الأَئِمَّةُ وَالحُكَّامُ، العَدْلُ أَسَاسُ المُلْكِ!", "يَا أَيُّهَا", "يَا أَيَّتُهَا", "يَا", "Ey imamlar ve yöneticiler, adalet mülkün temelidir!", "Müzekker."],
      ["___ الأُمَّهَاتُ الرَّحِيمَاتُ!", "يَا أَيَّتُهَا", "يَا أَيُّهَا", "يَا", "Ey merhametli anneler!", "Müennes."]
    ])},
    { type: "pick", num: "٥", ar: "كَوِّنْ جُمَلًا مِنَ الكَلِمَاتِ بَيْنَ القَوْسَيْنِ وَبَيِّنْ إِعْرَابَ المُنَادَى", tr: "Kelimelerden kurulan doğru cümleyi seç. (أَيُّ: damme üzere mebnî nekre-i maksûde; ardındaki isim merfû sıfat.)", exHtml: "<span class=\"ar\">(نَاسٌ / أَخْبَرَ / رِسَالَةٌ) ← أَيُّهَا النَّاسُ، مَنْ أَخْبَرَكُمْ أَنَّ مَعِي رِسَالَةً؟! · (صَدِيقَاتٌ / ذَكَرَ لِـ / نُقُودٌ) ← أَيَّتُهَا الصَّدِيقَاتُ، مَنْ ذَكَرَ لَكُنَّ أَنَّ مَعِي نُقُودًا؟!</span>", items: PL([
      ["(أَصْدِقَاءُ / حَدَّثَ / نُقُودٌ كَثِيرَةٌ)", "أَيُّهَا الأَصْدِقَاءُ، مَنْ حَدَّثَكُمْ أَنَّ مَعِي نُقُودًا كَثِيرَةً؟!", "أَيَّتُهَا الأَصْدِقَاءُ، مَنْ حَدَّثَكُنَّ أَنَّ مَعِي نُقُودًا كَثِيرَةً؟!", "أَيُّهَا الأَصْدِقَاءَ، مَنْ حَدَّثَكُمْ أَنَّ مَعِي نُقُودٌ كَثِيرَةٌ؟!", "Ey arkadaşlar, size yanımda çok para olduğunu kim söyledi?!", "أَنَّ’nin ismi mansûb: نُقُودًا."],
      ["(عَامِلَاتٌ / قَالَ لِـ / كُتُبٌ)", "أَيَّتُهَا العَامِلَاتُ، مَنْ قَالَ لَكُنَّ إِنَّ مَعِي كُتُبًا؟!", "أَيُّهَا العَامِلَاتُ، مَنْ قَالَ لَكُمْ إِنَّ مَعِي كُتُبًا؟!", "أَيَّتُهَا العَامِلَاتِ، مَنْ قَالَ لَكُنَّ إِنَّ مَعِي كُتُبٌ؟!", "Ey işçi kadınlar, size yanımda kitap olduğunu kim söyledi?!", "قَالَ’dan sonra إِنَّ."],
      ["(أَعْدَاءٌ / أَشْعَرَ / سِلَاحٌ)", "أَيُّهَا الأَعْدَاءُ، مَنْ أَشْعَرَكُمْ أَنَّ مَعِي سِلَاحًا؟!", "أَيَّتُهَا الأَعْدَاءُ، مَنْ أَشْعَرَكُنَّ أَنَّ مَعِي سِلَاحًا؟!", "أَيُّهَا الأَعْدَاءُ، مَنْ أَشْعَرَكُمْ أَنَّ مَعِي سِلَاحٌ؟!", "Ey düşmanlar, size yanımda silah olduğunu kim sezdirdi?!", "Müzekker çoğul: أَيُّهَا, كُمْ."],
      ["(شُرْطِيٌّ / أَخْبَرَ / سَارِقٌ)", "أَيُّهَا الشُّرْطِيُّ، مَنْ أَخْبَرَكَ أَنَّ مَعِي سَارِقًا؟!", "أَيُّهَا الشُّرْطِيُّ، مَنْ أَخْبَرَكُمْ أَنَّ مَعِي سَارِقًا؟!", "أَيَّتُهَا الشُّرْطِيُّ، مَنْ أَخْبَرَكَ أَنَّ مَعِي سَارِقًا؟!", "Ey polis, sana yanımda hırsız olduğunu kim haber verdi?!", "Tekil: كَ."],
      ["(تَاجِرَاتٌ / أَبْلَغَ / بِضَاعَةٌ جَدِيدَةٌ)", "أَيَّتُهَا التَّاجِرَاتُ، مَنْ أَبْلَغَكُنَّ أَنَّ مَعِي بِضَاعَةً جَدِيدَةً؟!", "أَيُّهَا التَّاجِرَاتُ، مَنْ أَبْلَغَكُمْ أَنَّ مَعِي بِضَاعَةً جَدِيدَةً؟!", "أَيَّتُهَا التَّاجِرَاتُ، مَنْ أَبْلَغَكُنَّ أَنَّ مَعِي بِضَاعَةٌ جَدِيدَةٌ؟!", "Ey tüccar kadınlar, size yanımda yeni mal olduğunu kim bildirdi?!", "Müennes çoğul: أَيَّتُهَا, كُنَّ."],
      ["(وَزِيرٌ / حَدَّثَ / نُقُودٌ كَثِيرَةٌ)", "أَيُّهَا الوَزِيرُ، مَنْ حَدَّثَكَ أَنَّ مَعِي نُقُودًا كَثِيرَةً؟!", "يَا الوَزِيرُ، مَنْ حَدَّثَكَ أَنَّ مَعِي نُقُودًا كَثِيرَةً؟!", "أَيُّهَا الوَزِيرَ، مَنْ حَدَّثَكَ أَنَّ مَعِي نُقُودًا كَثِيرَةً؟!", "Ey bakan, sana yanımda çok para olduğunu kim söyledi?!", "يَا doğrudan harf-i tarifli isme gelmez."],
      ["(بَائِعَاتٌ / أَعْلَمَ / مُنْتَجَاتٌ غَالِيَةٌ)", "أَيَّتُهَا البَائِعَاتُ، مَنْ أَعْلَمَكُنَّ أَنَّ مَعِي مُنْتَجَاتٍ غَالِيَةً؟!", "أَيَّتُهَا البَائِعَاتُ، مَنْ أَعْلَمَكُنَّ أَنَّ مَعِي مُنْتَجَاتًا غَالِيَةً؟!", "أَيُّهَا البَائِعَاتُ، مَنْ أَعْلَمَكُمْ أَنَّ مَعِي مُنْتَجَاتٍ غَالِيَةً؟!", "Ey satıcı kadınlar, size yanımda pahalı ürünler olduğunu kim bildirdi?!", "Cem-i müennes kesre ile mansûb: مُنْتَجَاتٍ."],
      ["(حُرَّاسٌ / أَخْبَرَ / مُتَسَوِّلٌ)", "أَيُّهَا الحُرَّاسُ، مَنْ أَخْبَرَكُمْ أَنَّ مَعِي مُتَسَوِّلًا؟!", "أَيَّتُهَا الحُرَّاسُ، مَنْ أَخْبَرَكُنَّ أَنَّ مَعِي مُتَسَوِّلًا؟!", "يَا الحُرَّاسُ، مَنْ أَخْبَرَكُمْ أَنَّ مَعِي مُتَسَوِّلًا؟!", "Ey bekçiler, size yanımda dilenci olduğunu kim haber verdi?!", "Müzekker çoğul."]
    ])},
    { type: "pick", extra: true, ar: "مَا تَقْدِيرُ حَرْفِ النِّدَاءِ المَحْذُوفِ؟", tr: "Nidâ edatı hazfedilmiş: takdiri hangisi?", items: PL([
      ["﴿يُوسُفُ أَعْرِضْ عَنْ هَذَا﴾", "يَا يُوسُفُ", "أَيَا يُوسُفُ", "هَيَا يُوسُفُ", "Yûsuf, bundan vazgeç. (Yûsuf 29)", "Yalnız يَا hazfedilir."],
      ["﴿رَبِّ أَرِنِي أَنْظُرْ إِلَيْكَ﴾", "يَا رَبِّ", "أَيْ رَبِّ", "هَيَا رَبِّ", "Rabbim, bana göster, sana bakayım. (A’râf 143)", "يَا رَبِّ: ي hazfedilmiş muzâf."],
      ["أَيُّهَا الرَّجُلُ، اصْبِرْ!", "يَا أَيُّهَا الرَّجُلُ", "أَ أَيُّهَا الرَّجُلُ", "أَيَا أَيُّهَا الرَّجُلُ", "Ey adam, sabret!", "Takdiri: يَا أَيُّهَا."],
      ["أَيَّتُهَا الفَتَاةُ، اجْتَهِدِي!", "يَا أَيَّتُهَا الفَتَاةُ", "يَا أَيُّهَا الفَتَاةُ", "أَيْ أَيَّتُهَا الفَتَاةُ", "Ey genç kız, çalış!", "Müennes: أَيَّتُهَا."],
      ["اللَّهُمَّ أَنْتَ السَّلَامُ", "يَا اللهُ", "يَا أَيُّهَا اللهُ", "أَيَا اللهُ", "Allah’ım, Selâm sensin.", "Mim, hazfedilen يَا’nın yerini tutar."],
      ["﴿رَبَّنَا لَا تُؤَاخِذْنَا﴾", "يَا رَبَّنَا", "يَا رَبُّنَا", "أَيَا رَبَّنَا", "Rabbimiz, bizi sorumlu tutma.", "Muzâf: mansûb."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · ŞİBH-İ MUZÂF VE OKUMA
{
  id: "u5", no: 5, ar: "مِنَ المُضَافِ إِلَى الشَّبِيهِ بِالمُضَافِ · القِرَاءَةُ", tr: "Muzâftan Şibh-i Muzâfa ve Okuma", short: "Okuma", col: "muz", legend: ["mz", "nasb"],
  goals: ["Muzâf münâdâyı şibh-i muzâfa çevirip harekelemek", "“فِي سَبِيلِ اللهِ” metnindeki münâdâları bulmak", "Münâdânın türünü ve i’rabını söylemek"],
  examples: [
    { s: "اللَّهُمَّ:- / يَا:mz / مُقَلِّبَ القُلُوبِ وَالأَبْصَارِ:nasb", tr: "Allah’ım, ey kalpleri ve gözleri çeviren! (muzâf)", pair: "اللَّهُمَّ:- / يَا:mz / مُقَلِّبًا القُلُوبَ وَالأَبْصَارَ:nasb", pairTr: "Aynı anlam. (şibh-i muzâf)" }
  ],
  rules: [
    { tr: "<b>Muzâf → şibh-i muzâf:</b> münâdâ tenvin alır; muzâfun ileyh, münâdânın ma’mûlü (mef’ûl) olur ve mansûb okunur:", ex: ["يَا سَائِقَ السَّيَّارَةِ ← يَا سَائِقًا السَّيَّارَةَ", "يَا قَائِدَ الجُنُودِ ← يَا قَائِدًا الجُنُودَ"] },
    { tr: "Cem-i müennes sâlim mansûbda kesre aldığı için görünüşte değişmez: <span class=\"ar\">يَا قَاضِيًا الحَاجَاتِ</span>; maksûr isimde de hareke görünmez: <span class=\"ar\">يَا رَافِعًا الشَّكْوَى</span>." },
    { tr: "Muzâf cem-i müzekkerde nûn düşmüştü; şibh-i muzâfta geri gelir: <span class=\"ar\">يَا مُدَرِّسِي الحِسَابِ ← يَا مُدَرِّسِينَ الحِسَابَ</span>." },
    { tr: "<span class=\"ar\">يَا قَوْمِ</span>: muzâf; mütekellim yâsı hazfedilmiş (<span class=\"ar\">يَا قَوْمِي</span>). <span class=\"ar\">نَادَى أَهْلَ المَدِينَةِ</span>’deki <span class=\"ar\">أَهْلَ</span> ise münâdâ değil, mef’ûldür." }
  ],
  kaide: ["حَوِّلِ المُنَادَى المُضَافَ إِلَى مُنَادًى شَبِيهٍ بِالمُضَافِ وَاضْبِطْ آخِرَهُ. اقْرَأِ النَّصَّ ثُمَّ عَيِّنِ المُنَادَى وَاضْبِطْهُ بِالشَّكْلِ وَبَيِّنْ سَبَبَ الضَّبْطِ."],
  ex: [
    { type: "pick", num: "٦", ar: "حَوِّلِ المُنَادَى المُضَافَ إِلَى مُنَادًى شَبِيهٍ بِالمُضَافِ وَاضْبِطْ آخِرَهُ", tr: "Şibh-i muzâfa çevrilmiş doğru biçimi seç.", exHtml: "<span class=\"ar\">اللَّهُمَّ يَا مُقَلِّبَ القُلُوبِ وَالأَبْصَارِ ← اللَّهُمَّ يَا مُقَلِّبًا القُلُوبَ وَالأَبْصَارَ</span>", items: PL([
      ["يَا سَائِقَ السَّيَّارَةِ، السُّرْعَةُ هَلَاكٌ!", "يَا سَائِقًا السَّيَّارَةَ", "يَا سَائِقًا السَّيَّارَةِ", "يَا سَائِقُ السَّيَّارَةَ", "Ey arabanın şoförü, hız ölümdür!", "Münâdâ tenvinli, mef’ûl mansûb."],
      ["يَا قَاضِيَ الحَاجَاتِ، وَيَا مُجِيبَ الدَّعَوَاتِ، اسْتَجِبْ دُعَاءَنَا!", "يَا قَاضِيًا الحَاجَاتِ، وَيَا مُجِيبًا الدَّعَوَاتِ", "يَا قَاضِيَ الحَاجَاتَ، وَيَا مُجِيبَ الدَّعَوَاتَ", "يَا قَاضٍ الحَاجَاتِ، وَيَا مُجِيبٌ الدَّعَوَاتِ", "Ey ihtiyaçları gideren, ey duaları kabul eden, duamızı kabul et!", "Cem-i müennes mansûbda kesreli kalır."],
      ["يَا قَائِدَ الجُنُودِ، أَحْسِنْ مُعَامَلَتَكَ لِجُنُودِكَ!", "يَا قَائِدًا الجُنُودَ", "يَا قَائِدًا الجُنُودِ", "يَا قَائِدُ الجُنُودَ", "Ey askerlerin komutanı, askerlerine iyi davran!", "Mef’ûl mansûb."],
      ["يَا رَحِيمَ العِبَادِ، ارْحَمْ عَبْدَكَ العَاجِزَ!", "يَا رَحِيمًا بِالعِبَادِ", "يَا رَحِيمًا العِبَادِ", "يَا رَحِيمُ بِالعِبَادِ", "Ey kullarına merhametli olan, âciz kuluna merhamet et!", "رَحِيمٌ ma’mûlünü بِـ ile alır."],
      ["يَا مُدَرِّسِي الحِسَابِ، مَا أَحْسَنَ مُعَامَلَتَكُمْ لِطُلَّابِكُمْ!", "يَا مُدَرِّسِينَ الحِسَابَ", "يَا مُدَرِّسُونَ الحِسَابَ", "يَا مُدَرِّسِي الحِسَابَ", "Ey matematik öğretmenleri, öğrencilerinize ne güzel davranıyorsunuz!", "Nûn geri gelir; münâdâ mansûb (yâ ile)."],
      ["يَا ظَالِمَ الرَّعِيَّةِ، مَا أَشَدَّ عَاقِبَةَ ظُلْمِكَ يَوْمَ القِيَامَةِ!", "يَا ظَالِمًا الرَّعِيَّةَ", "يَا ظَالِمًا الرَّعِيَّةِ", "يَا ظَالِمُ الرَّعِيَّةَ", "Ey halkına zulmeden, kıyamet günü zulmünün akıbeti ne çetin!", "Mef’ûl mansûb."],
      ["أَيَا حَاكِمَ الدَّوْلَةِ، حَاسِبْ نَفْسَكَ قَبْلَ أَنْ تُحَاسَبَ!", "أَيَا حَاكِمًا الدَّوْلَةَ", "أَيَا حَاكِمًا الدَّوْلَةِ", "أَيَا حَاكِمُ الدَّوْلَةَ", "Ey devletin yöneticisi, hesaba çekilmeden kendini hesaba çek!", "Mef’ûl mansûb."],
      ["أَيَا رَافِعَ الشَّكْوَى، حَدِّثْنَا عَنْ مُشْكِلَتِكَ!", "أَيَا رَافِعًا الشَّكْوَى", "أَيَا رَافِعُ الشَّكْوَى", "أَيَا رَافِعٌ الشَّكْوَى", "Ey şikâyetini ileten, bize derdini anlat!", "Maksûr الشَّكْوَى’de hareke görünmez."]
    ])},
    { type: "reading", num: "٨", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ عَيِّنِ المُنَادَى وَاضْبِطْهُ بِالشَّكْلِ وَبَيِّنْ سَبَبَ الضَّبْطِ", tr: "Metni oku, soruları cevapla; sonra koyu kelimenin münâdâ türünü ve i’rabını seç.", title: "فِي سَبِيلِ اللهِ",
      text: METIN,
      textTr: "İslam geldiğinde, ona inananların kalplerine sevgi ve merhamet koydu; İslam devletinde yardımlaşma ve eşitlik ruhunu yaydı. Her Müslüman Müslüman kardeşini sevdi, her insan –dini ve sınıfı ne olursa olsun– insan kardeşine yardım etti.<br>Tarih, canlarını ve mallarını Allah yolunda feda eden büyük ilkeli bazı müminlerin güzel tablolarını anlatır. Bu da onlardan birinin hikâyesidir:<br>Halife Ebû Bekir es-Sıddîk (r.a.) döneminde Medine’deki Müslümanlar şiddetli bir kıtlığa uğradı. O yıl, Şam’dan mal taşıyan bin develik büyük bir kervan geldi; bu mallar Osman b. Affân’ındı (r.a.). Kervan evinin önünde durunca halk haberi yaydı; Medine halkının hepsi duydu. Tüccarlar malı satın almak için ona geldi ve aralarında bir konuşma geçti.<br>Osman: Ey Medine tüccarları, buyurun; ne istiyorsunuz?<br>Tüccarlar: Ey Osman, ne istediğimizi biliyorsun; sana gelen bu maldan bize sat, insanların ona ihtiyacını biliyorsun.<br>Osman: Bu mala –ey tüccarlar– bana ne verirsiniz?<br>Tüccarlar: Ey Affân’ın oğlu, bir dirheme iki dirhem veririz.<br>Osman: Bundan fazlası teklif edildi.<br>Tüccarlar: Dirheme dört veririz.<br>Osman: Ey kavmim, bundan da fazlası teklif edildi.<br>Tüccarlar: Ey Affân’ın oğlu, Medine’de bizden başka tüccar yok, kimse de bizden önce sana gelmedi; bizim verdiğimizden fazlasını kim verdi?<br>Osman: Ey insanlar, Allah bana her dirheme on verdi; sizde fazlası var mı?<br>Tüccarlar: Hayır.<br>Osman: Malı Allah için sattım; bu develerin taşıdığı her şeyi Medine’nin fakirlerine verdim. Sonra Medine halkına seslendi: Ey Müslümanlar topluluğu, her fakir kendine ve ailesine yetecek kadar alsın.",
      qa: [
        { q: "مَاذَا أَصَابَ المُسْلِمِينَ فِي عَهْدِ أَبِي بَكْرٍ؟", a: "أَصَابَتْهُمْ مَجَاعَةٌ شَدِيدَةٌ.", tr: "Ebû Bekir döneminde Müslümanlara ne oldu? Şiddetli bir kıtlık." },
        { q: "كَمْ جَمَلًا كَانَ فِي القَافِلَةِ؟ وَلِمَنْ كَانَتِ البِضَاعَةُ؟", a: "كَانَ فِيهَا أَلْفُ جَمَلٍ، وَكَانَتِ البِضَاعَةُ لِعُثْمَانَ بْنِ عَفَّانَ.", tr: "Kervanda kaç deve vardı, mal kimindi? Bin deve; mal Osman b. Affân’ındı." },
        { q: "كَمْ دَفَعَ التُّجَّارُ فِي البِضَاعَةِ؟", a: "دَفَعُوا بِالدِّرْهَمِ دِرْهَمَيْنِ، ثُمَّ أَرْبَعَةً.", tr: "Tüccarlar ne teklif etti? Dirheme iki, sonra dört." },
        { q: "لِمَنْ بَاعَ عُثْمَانُ البِضَاعَةَ؟ وَلِمَاذَا؟", a: "بَاعَهَا لِلَّهِ، لِأَنَّ اللهَ أَعْطَاهُ بِكُلِّ دِرْهَمٍ عَشَرَةً؛ فَجَعَلَهَا لِفُقَرَاءِ المَدِينَةِ.", tr: "Osman malı kime sattı, niçin? Allah’a; çünkü Allah her dirheme on verdi; malı Medine fakirlerine bağışladı." }
      ],
      cls: { opts: MTX, ar: "مَا نَوْعُ المُنَادَى؟", tr: "Koyu kelime münâdâ mı? Münâdâysa türü ne?", items: [
        { s: HL("يَا تُجَّارَ المَدِينَةِ، تَفَضَّلُوا", "تُجَّارَ المَدِينَةِ"), a: "z", why: "Muzâf." },
        { s: HL("يَا عُثْمَانُ، إِنَّكَ تَعْلَمُ مَا نُرِيدُ", "عُثْمَانُ"), a: "a", why: "Alem." },
        { s: HL("كَمْ تَدْفَعُونَ لِي ـ يَا تُجَّارُ ـ", "تُجَّارُ"), a: "m", why: "Karşısındaki tüccarlar: nekre-i maksûde, damme." },
        { s: HL("يَا ابْنَ عَفَّانَ، نَدْفَعُ لَكَ", "ابْنَ عَفَّانَ"), a: "z", why: "Muzâf." },
        { s: HL("يَا قَوْمِ، لَقَدْ أُعْطِيتُ أَكْثَرَ", "قَوْمِ"), a: "z", why: "Mütekellim yâsına muzâf (yâ hazfedilmiş)." },
        { s: HL("أَيُّهَا النَّاسُ، إِنَّ اللهَ أَعْطَانِي", "أَيُّهَا"), a: "m", why: "أَيُّ nekre-i maksûde; edat hazfedilmiş; النَّاسُ sıfat." },
        { s: HL("يَا مَعْشَرَ المُسْلِمِينَ، فَلْيَأْخُذْ", "مَعْشَرَ المُسْلِمِينَ"), a: "z", why: "Muzâf." },
        { s: HL("ثُمَّ نَادَى أَهْلَ المَدِينَةِ", "أَهْلَ المَدِينَةِ"), a: "x", why: "نَادَى fiilinin mef’ûlü; münâdâ değil." },
        { s: HL("فَأَحَبَّ كُلُّ مُسْلِمٍ أَخَاهُ المُسْلِمَ", "أَخَاهُ"), a: "x", why: "Mef’ûl." }
      ]},
      cls2: { opts: HK, ar: "مَا حُكْمُ المُنَادَى؟", tr: "Münâdâ mebnî mi, mansûb mu?", items: [
        { s: HL("يَا تُجَّارَ المَدِينَةِ", "تُجَّارَ"), a: "n", why: "Muzâf: mansûb." },
        { s: HL("يَا عُثْمَانُ", "عُثْمَانُ"), a: "b", why: "Müfred alem: damme üzere mebnî." },
        { s: HL("ـ يَا تُجَّارُ ـ", "تُجَّارُ"), a: "b", why: "Nekre-i maksûde: damme üzere mebnî." },
        { s: HL("يَا ابْنَ عَفَّانَ", "ابْنَ"), a: "n", why: "Muzâf." },
        { s: HL("يَا قَوْمِ", "قَوْمِ"), a: "n", why: "Muzâf: takdiren mansûb." },
        { s: HL("أَيُّهَا النَّاسُ", "أَيُّهَا"), a: "b", why: "أَيُّ: damme üzere mebnî." },
        { s: HL("يَا مَعْشَرَ المُسْلِمِينَ", "مَعْشَرَ"), a: "n", why: "Muzâf." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["أَيْ {خَلِيلُ}، رُدَّ عَلَى الهَاتِفِ!", ["خَلِيلُ", "خَلِيلًا", "خَلِيلِ"], "alem: damme üzere mebnî", "Halil, telefona bak!", "u1"],
  ["أَيَا {إِبْرَاهِيمُ}، تَعَالَ!", ["إِبْرَاهِيمُ", "إِبْرَاهِيمَ", "إِبْرَاهِيمٍ"], "alem", "Ey İbrâhim, gel!", "u1"],
  ["يَا {رَسُولَ} اللهِ، خُذْ بِيَدِي.", ["رَسُولَ", "رَسُولُ", "رَسُولِ"], "muzâf: mansûb", "Ey Allah’ın Resûlü, elimden tut.", "u1"],
  ["يَا {عَبْدَ} الرَّحْمَنِ، هَلُمَّ!", ["عَبْدَ", "عَبْدُ", "عَبْدِ"], "muzâf", "Abdurrahman, gel!", "u1"],
  ["هَيَا {سَلِيمُ}، هَلْ أَتْمَمْتَ وَاجِبَكَ؟", ["سَلِيمُ", "سَلِيمًا", "سَلِيمَ"], "alem", "Selim, ödevini bitirdin mi?", "u1"],
  ["يَا {مُتْقِنًا} عَمَلَهُ، وَفَّقَكَ اللهُ!", ["مُتْقِنًا", "مُتْقِنُ", "مُتْقِنَ"], "şibh-i muzâf", "İşini sağlam yapan, Allah seni muvaffak kılsın!", "u2"],
  ["يَا حَسَنًا {خُلُقُهُ} تَقَدَّمْ!", ["خُلُقُهُ", "خُلُقَهُ", "خُلُقِهِ"], "sıfatın fâili: merfû", "Ahlakı güzel olan, öne geç!", "u2"],
  ["يَا {شُرْطِيُّ}، سَاعِدْنِي!", ["شُرْطِيُّ", "شُرْطِيًّا", "شُرْطِيِّ"], "nekre-i maksûde", "Polis, bana yardım et!", "u2"],
  ["أَيَا {سَامِعًا} سَاعِدْنِي!", ["سَامِعًا", "سَامِعُ", "سَامِعِ"], "gayr-i maksûde", "Beni duyan biri, yardım et!", "u2"],
  ["يَا {ابْنَ} الكِرَامِ لَا تَتَسَرَّعْ!", ["ابْنَ", "ابْنُ", "ابْنِ"], "muzâf", "Ey cömertlerin oğlu, acele etme!", "u2"],
  ["يَا {فَاطِمَةُ}، أَكْمِلِي الرِّسَالَةَ.", ["فَاطِمَةُ", "فَاطِمَةَ", "فَاطِمَةً"], "alem", "Fâtıma, mektubu bitir.", "u3"],
  ["يَا {تَاجِرُ}، مَاذَا تَعْرِضُ؟", ["تَاجِرُ", "تَاجِرًا", "تَاجِرَ"], "maksûde", "Tüccar, ne sergiliyorsun?", "u3"],
  ["يَا {طَالِبَ} العِلْمِ، لَا تَتَسَرَّعْ!", ["طَالِبَ", "طَالِبُ", "طَالِبًا"], "muzâf", "İlim talebesi, acele etme!", "u3"],
  ["يَا {رَاكِبَانِ}، مَا أَبْطَأَ السَّيَّارَةَ!", ["رَاكِبَانِ", "رَاكِبَيْنِ", "رَاكِبُونَ"], "maksûde müsennâ: elif", "İki yolcu, araba ne yavaş!", "u3"],
  ["هَيَا {مُدَرِّسُونَ}، أَحْسِنُوا إِلَى طُلَّابِكُمْ!", ["مُدَرِّسُونَ", "مُدَرِّسِينَ", "مُدَرِّسَيْنِ"], "maksûde cem: vav", "Öğretmenler, öğrencilerinize iyi davranın!", "u3"],
  ["يَا {أَيُّهَا} الإِنْسَانُ مَا غَرَّكَ بِرَبِّكَ الكَرِيمِ", ["أَيُّهَا", "أَيَّتُهَا", "أَيُّ"], "harf-i tarifli müzekker", "Ey insan…", "u4"],
  ["يَا {أَيَّتُهَا} النَّفْسُ المُطْمَئِنَّةُ", ["أَيَّتُهَا", "أَيُّهَا", "أَيَّتَهَا"], "harf-i tarifli müennes", "Ey huzura ermiş nefis!", "u4"],
  ["يَا أَيُّهَا {النَّاسُ} اتَّقُوا رَبَّكُمْ", ["النَّاسُ", "النَّاسَ", "النَّاسِ"], "sıfat: merfû", "Ey insanlar, Rabbinizden korkun.", "u4"],
  ["{اللَّهُمَّ} أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ", ["اللَّهُمَّ", "يَا اللَّهُمَّ", "اللهَ"], "mim, يَا’nın yerinde", "Allah’ım, Selâm sensin.", "u4"],
  ["﴿{يُوسُفُ} أَعْرِضْ عَنْ هَذَا﴾", ["يُوسُفُ", "يُوسُفَ", "يُوسُفًا"], "edat hazf; alem mebnî", "Yûsuf, bundan vazgeç.", "u4"],
  ["يَا {سَائِقًا} السَّيَّارَةَ، السُّرْعَةُ هَلَاكٌ!", ["سَائِقًا", "سَائِقُ", "سَائِقَ"], "şibh-i muzâf", "Ey arabayı süren, hız ölümdür!", "u5"],
  ["يَا قَائِدًا {الجُنُودَ}، أَحْسِنْ مُعَامَلَتَكَ!", ["الجُنُودَ", "الجُنُودِ", "الجُنُودُ"], "ma’mûl: mansûb", "Ey askerleri yöneten, iyi davran!", "u5"],
  ["يَا {تُجَّارَ} المَدِينَةِ، تَفَضَّلُوا.", ["تُجَّارَ", "تُجَّارُ", "تُجَّارِ"], "muzâf", "Ey Medine tüccarları, buyurun.", "u5"],
  ["يَا {ابْنَ} عَفَّانَ، نَدْفَعُ لَكَ…", ["ابْنَ", "ابْنُ", "ابْنِ"], "muzâf", "Ey Affân’ın oğlu…", "u5"],
  ["يَا {مَعْشَرَ} المُسْلِمِينَ، فَلْيَأْخُذْ كُلُّ فَقِيرٍ مَا يَكْفِيهِ.", ["مَعْشَرَ", "مَعْشَرُ", "مَعْشَرِ"], "muzâf", "Ey Müslümanlar topluluğu…", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["خَلِيلٌ ← أَيْ ile seslen", "أَيْ خَلِيلُ", "أَيْ خَلِيلًا", "أَيْ خَلِيلٌ", "Alem: damme üzere mebnî, tenvinsiz.", "u1"],
  ["إِبْرَاهِيمُ (uzakta) ← uzak edatı", "أَيَا إِبْرَاهِيمُ", "أَ إِبْرَاهِيمُ", "أَيْ إِبْرَاهِيمُ", "Uzak için أَيَا / هَيَا.", "u1"],
  ["عَبْدُ الرَّحْمَنِ ← يَا ile", "يَا عَبْدَ الرَّحْمَنِ", "يَا عَبْدُ الرَّحْمَنِ", "يَا عَبْدِ الرَّحْمَنِ", "Muzâf: mansûb.", "u1"],
  ["حَارِسٌ (belirsiz biri) ← يَا ile", "يَا حَارِسًا", "يَا حَارِسُ", "يَا حَارِسٍ", "Gayr-i maksûde: tenvinli mansûb.", "u2"],
  ["حَارِسٌ (karşındaki) ← يَا ile", "يَا حَارِسُ", "يَا حَارِسًا", "يَا حَارِسٍ", "Maksûde: damme üzere mebnî.", "u2"],
  ["مُتْقِنٌ عَمَلَهُ ← يَا ile", "يَا مُتْقِنًا عَمَلَهُ", "يَا مُتْقِنُ عَمَلَهُ", "يَا مُتْقِنَ عَمَلُهُ", "Şibh-i muzâf: tenvinli mansûb.", "u2"],
  ["طَالِبَانِ (karşındaki) ← يَا ile", "يَا طَالِبَانِ", "يَا طَالِبَيْنِ", "يَا طَالِبَانُ", "Maksûde müsennâ: elif üzere mebnî.", "u3"],
  ["مُدَرِّسُو الحِسَابِ ← يَا ile", "يَا مُدَرِّسِي الحِسَابِ", "يَا مُدَرِّسُو الحِسَابِ", "يَا مُدَرِّسِينَ الحِسَابِ", "Muzâf cem: yâ ile mansûb, nûn düşer.", "u3"],
  ["الأُسْتَاذُ ← nidâ", "يَا أَيُّهَا الأُسْتَاذُ", "يَا الأُسْتَاذُ", "يَا أَيَّتُهَا الأُسْتَاذُ", "harf-i tarifli isme أَيُّهَا ile.", "u4"],
  ["الطَّالِبَاتُ ← nidâ", "يَا أَيَّتُهَا الطَّالِبَاتُ", "يَا أَيُّهَا الطَّالِبَاتُ", "يَا الطَّالِبَاتُ", "Müennes: أَيَّتُهَا.", "u4"],
  ["يَا اللهُ ← mîmle", "اللَّهُمَّ", "يَا اللَّهُمَّ", "اللهُمُّ", "يَا atılır, şeddeli fethalı mim gelir.", "u4"],
  ["يَا سَائِقَ السَّيَّارَةِ ← şibh-i muzâf", "يَا سَائِقًا السَّيَّارَةَ", "يَا سَائِقًا السَّيَّارَةِ", "يَا سَائِقُ السَّيَّارَةَ", "Tenvin + mansûb ma’mûl.", "u5"],
  ["يَا ظَالِمَ الرَّعِيَّةِ ← şibh-i muzâf", "يَا ظَالِمًا الرَّعِيَّةَ", "يَا ظَالِمًا الرَّعِيَّةِ", "يَا ظَالِمُ الرَّعِيَّةَ", "Tenvin + mansûb ma’mûl.", "u5"],
  ["يَا قَائِدَ الجُنُودِ ← şibh-i muzâf", "يَا قَائِدًا الجُنُودَ", "يَا قَائِدُ الجُنُودَ", "يَا قَائِدًا الجُنُودِ", "Tenvin + mansûb ma’mûl.", "u5"]
];
// Münâdâ türü hız oyunu
var NOUN_LIST = UNITS[1].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = MT;
// Edat mesafesi hız oyunu
var MM_OPTS = ED;
var MM_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  ed: { name: "Edat ↔ kullanım", pairs: [["أَ", "yakın için"], ["أَيْ", "yakın için de"], ["يَا", "her mesafe için"], ["أَيَا", "uzak için"], ["هَيَا", "uzak için de"], ["أَيُّهَا", "harf-i tarifli müzekkere"], ["أَيَّتُهَا", "harf-i tarifli müennese"], ["اللَّهُمَّ", "يَا اللهُ yerine"]] },
  tu: { name: "Münâdâ ↔ tür", pairs: [["يَا سَعِيدُ", "alem"], ["يَا شُرْطِيُّ", "nekre-i maksûde"], ["أَيَا سَامِعًا", "nekre-i gayr-i maksûde"], ["يَا عَبْدَ الرَّحْمَنِ", "muzâf"], ["يَا مُتْقِنًا عَمَلَهُ", "şibh-i muzâf"], ["يَا طَالِبَانِ", "elif üzere mebnî"], ["يَا مُدَرِّسُونَ", "vav üzere mebnî"], ["يَا قَوْمِ", "yâsı hazfedilmiş muzâf"]] },
  ay: { name: "Âyet ↔ Türkçe", pairs: [["يَا أَيُّهَا الإِنْسَانُ", "ey insan"], ["يَا أَيَّتُهَا النَّفْسُ المُطْمَئِنَّةُ", "ey huzura ermiş nefis"], ["يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ", "ey insanlar, Rabbinizden korkun"], ["يُوسُفُ أَعْرِضْ عَنْ هَذَا", "Yûsuf, bundan vazgeç"], ["رَبِّ أَرِنِي أَنْظُرْ إِلَيْكَ", "Rabbim, bana göster, sana bakayım"], ["رَبَّنَا لَا تُؤَاخِذْنَا", "Rabbimiz, bizi sorumlu tutma"], ["يَا نُوحُ قَدْ جَادَلْتَنَا", "Nûh, bizimle tartıştın"], ["اللَّهُمَّ أَنْتَ السَّلَامُ", "Allah’ım, Selâm sensin"]] }
};
var KARTLAR = [
  ["Nidâ üslubu nedir?", "Çağırma ya da dikkat çekme üslubu: edat + münâdâ."],
  ["Yakın için edatlar?", "أَ ve أَيْ: أَعَادِلُ · أَيْ خَلِيلُ"],
  ["Uzak için edatlar?", "أَيَا ve هَيَا: أَيَا إِبْرَاهِيمُ · هَيَا سَلِيمُ"],
  ["Her mesafe için?", "يَا: يَا صَلَاحَ الدِّينِ"],
  ["Münâdânın beş türü?", "Alem · nekre-i maksûde · gayr-i maksûde · muzâf · şibh-i muzâf"],
  ["Hangileri mebnî?", "Müfred alem ve nekre-i maksûde: merfû alâmeti üzere mebnî, mahallen mansûb."],
  ["Hangileri mansûb?", "Muzâf, şibh-i muzâf, nekre-i gayr-i maksûde."],
  ["يَا شُرْطِيُّ / يَا رَاكِبًا farkı?", "Damme: belirli kişi (maksûde); tenvinli fetha: belirsiz (gayr-i maksûde)."],
  ["harf-i tarifli isme nasıl seslenilir?", "يَا أَيُّهَا (müzekker) · يَا أَيَّتُهَا (müennes); ikil ve çoğulda da aynı."],
  ["Lafza-i celâl?", "يَا اللهُ ya da اللَّهُمَّ (mim, يَا’nın yerinde)."],
  ["Hangi edat hazfedilir?", "Yalnız يَا: يُوسُفُ أَعْرِضْ · رَبِّ أَرِنِي"],
  ["Muzâftan şibh-i muzâfa?", "يَا سَائِقَ السَّيَّارَةِ ← يَا سَائِقًا السَّيَّارَةَ"]
];
