// ================= VERİ: Kıraat 23 — مَفْهُومُ الجِهَادِ فِي الإِسْلَامِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "الجِهَادُ", tr: "Cihad" }, nasb: { ar: "الغَايَةُ", tr: "Gaye" }, cerr: { ar: "الدَّلِيلُ", tr: "Delil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "cerr"]];
var ZE = [["z", "Zıt anlam", "ضِدٌّ", "cerr"], ["e", "Eş anlam", "مُرَادِفٌ", "mz"]];
var TC = [["t", "Tekil", "مُفْرَدٌ", "nasb"], ["c", "Çoğul", "جَمْعٌ", "ref"]];
var GAYE = [["z", "Zulmü defetmek", "دَفْعُ الظُّلْمِ", "cerr"], ["m", "Mazlumları korumak", "الدِّفَاعُ عَنِ المُسْتَضْعَفِينَ", "nasb"], ["q", "Saldırana karşılık", "قِتَالُ المُعْتَدِينَ", "mz"], ["b", "Tebliğ", "إِبْلَاغُ كَلِمَةِ اللهِ", "mi"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", z: "Zıt", e: "Eş", t: "Tekil", c: "Çoğul", m: "Mazlum", q: "Saldırı", b: "Tebliğ" };

// Makine: [konu (ar), konu (tr), fikir, delil, anahtar kelimeler, düşünme sorusu, [tr ×4]]
var CMP = [
  ["التَّعْرِيفُ", "Tanım", "الجِهَادُ لُغَةً: المَشَقَّةُ، وَاصْطِلَاحًا: بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ، وَيُطْلَقُ أَيْضًا عَلَى مُجَاهَدَةِ النَّفْسِ وَالشَّيْطَانِ وَالفُسَّاقِ.", "«رَأْسُ الأَمْرِ الإِسْلَامُ، وَعَمُودُهُ الصَّلَاةُ، وَذِرْوَةُ سَنَامِهِ الجِهَادُ» (رَوَاهُ التِّرْمِذِيُّ)", "المَشَقَّةُ · بَذْلُ الجُهْدِ · مُجَاهَدَةُ النَّفْسِ", "هَلْ لِلْجِهَادِ أَنْوَاعٌ، أَوْ هُوَ جِهَادٌ وَاحِدٌ؟", ["Cihad sözlükte meşakkat; terimde kâfirlerle savaşta güç harcamaktır. Nefse, şeytana ve fâsıklara karşı mücadeleye de cihad denir.", "“İşin başı İslâm, direği namaz, hörgücünün zirvesi cihaddır.” (Tirmizî)", "meşakkat · güç harcamak · nefisle mücadele", "Cihadın türleri var mıdır, yoksa tek bir cihad mı vardır?"]],
  ["دَفْعُ الظُّلْمِ", "Zulmü defetmek", "دَفْعُ الظُّلْمِ وَرَفْعُ الأَذَى عَنِ المُسْلِمِينَ كَانَ أَوَّلَ جِهَادٍ لِلْمُسْلِمِينَ.", "﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا وَإِنَّ اللهَ عَلَى نَصْرِهِمْ لَقَدِيرٌ﴾ (الحج: ٣٩)", "الظُّلْمُ · الأَذَى · الحَبَشَةُ · يَثْرِبُ", "لِمَاذَا هَاجَرَ المُسْلِمُونَ مِنْ مَكَّةَ؟", ["Zulmü defetmek ve Müslümanlardan eziyeti kaldırmak, Müslümanların ilk cihadıydı.", "“Kendilerine savaş açılanlara, zulme uğradıkları için izin verildi; Allah onlara yardım etmeye elbette kadirdir.” (Hac 39)", "zulüm · eziyet · Habeşistan · Yesrib", "Müslümanlar Mekke’den niçin hicret etti?"]],
  ["نُصْرَةُ المُسْتَضْعَفِينَ", "Mazlumları korumak", "الدِّفَاعُ عَنِ المَظْلُومِينَ المُضْطَهَدِينَ الَّذِينَ لَا يَسْتَطِيعُونَ الدِّفَاعَ عَنْ أَنْفُسِهِمْ.", "﴿وَمَا لَكُمْ لَا تُقَاتِلُونَ فِي سَبِيلِ اللهِ وَالمُسْتَضْعَفِينَ مِنَ الرِّجَالِ وَالنِّسَاءِ وَالوِلْدَانِ﴾ (النساء: ٧٥)", "المُضْطَهَدُونَ · البَغْيُ · الفِتْنَةُ", "لِمَاذَا كَانَتِ الفِتْنَةُ فِي الدِّينِ أَشَدَّ مِنَ القَتْلِ؟", ["Kendilerini savunamayan, ezilen mazlumları savunmak.", "“Size ne oluyor da Allah yolunda ve zayıf bırakılmış erkekler, kadınlar ve çocuklar uğruna savaşmıyorsunuz?” (Nisâ 75)", "ezilenler · azgınlık · fitne", "Dinde fitne niçin öldürmekten daha ağırdır?"]],
  ["رَدُّ العُدْوَانِ", "Saldırıya karşılık", "مُجَاهَدَةُ الكَافِرِينَ وَقِتَالُهُمْ إِذَا بَدَؤُوا المُسْلِمِينَ بِالقِتَالِ أَوْ نَقَضُوا عُهُودَهُمْ.", "﴿وَقَاتِلُوا فِي سَبِيلِ اللهِ الَّذِينَ يُقَاتِلُونَكُمْ وَلَا تَعْتَدُوا إِنَّ اللهَ لَا يُحِبُّ المُعْتَدِينَ﴾ (البقرة: ١٩٠)", "نَقْضُ العَهْدِ · الوَفَاءُ · المُعَامَلَةُ بِالمِثْلِ", "مَاذَا يَفْعَلُ المُسْلِمُونَ إِذَا وَفَى الآخَرُونَ بِالعُهُودِ؟", ["Kâfirler Müslümanlara savaş açarsa ya da ahitlerini bozarsa onlarla savaşmak.", "“Sizinle savaşanlarla Allah yolunda savaşın, ama aşırı gitmeyin; Allah aşırı gidenleri sevmez.” (Bakara 190)", "ahdi bozmak · ahde vefa · karşılıklılık", "Karşı taraf ahdine vefa gösterirse Müslümanlar ne yapar?"]],
  ["إِبْلَاغُ الدَّعْوَةِ", "Tebliğ", "بَذْلُ الجُهْدِ لِإِبْلَاغِ كَلِمَةِ اللهِ إِلَى النَّاسِ، وَتَحْقِيقُ عَالَمِيَّةِ الرِّسَالَةِ.", "﴿هُوَ الَّذِي أَرْسَلَ رَسُولَهُ بِالهُدَى وَدِينِ الحَقِّ لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ﴾ (التوبة: ٣٣)", "الإِبْلَاغُ · عَالَمِيَّةُ الرِّسَالَةِ · الهُدَى", "كَيْفَ نُبَلِّغُ كَلِمَةَ اللهِ إِلَى النَّاسِ اليَوْمَ؟", ["Allah’ın sözünü insanlara ulaştırmak ve risaletin evrenselliğini gerçekleştirmek için çaba harcamak.", "“Dinini bütün dinlere üstün kılmak için Resûlünü hidayet ve hak din ile gönderen O’dur.” (Tevbe 33)", "tebliğ · risaletin evrenselliği · hidayet", "Allah’ın sözünü bugün insanlara nasıl ulaştırırız?"]],
  ["الآدَابُ", "Âdâb", "لَا يَجُوزُ الاعْتِدَاءُ عَلَى غَيْرِ المُحَارِبِينَ وَلَا عَلَى أَمَاكِنِ العِبَادَةِ وَمَنْ فِيهَا مِنَ العَابِدِينَ.", "«نَهَى رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ عَنْ قَتْلِ النِّسَاءِ وَالصِّبْيَانِ» (مُتَّفَقٌ عَلَيْهِ)", "غَيْرُ المُحَارِبِينَ · العَجَزَةُ · أَمَاكِنُ العِبَادَةِ", "مَنْ هُمُ الَّذِينَ لَا يَجُوزُ الاعْتِدَاءُ عَلَيْهِمْ فِي الحَرْبِ؟", ["Savaşmayanlara, ibadet yerlerine ve oradaki ibadet edenlere saldırmak caiz değildir.", "“Resûlullah kadınları ve çocukları öldürmeyi yasakladı.” (Buhârî, Müslim)", "savaşmayanlar · âcizler · ibadet yerleri", "Savaşta kimlere saldırmak caiz değildir?"]]
];
var CMH = ["الفِكْرَةُ · Fikir", "الدَّلِيلُ · Delil", "كَلِمَاتٌ · Kelimeler", "سُؤَالٌ · Düşün"];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "وَرَدَ ذِكْرُ الجِهَادِ كَثِيرًا فِي الكِتَابِ وَالسُّنَّةِ، فَمِنْ ذَلِكَ قَوْلُ اللهِ تَعَالَى فِي كِتَابِهِ الكَرِيمِ: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا هَلْ أَدُلُّكُمْ عَلَى تِجَارَةٍ تُنْجِيكُمْ مِنْ عَذَابٍ أَلِيمٍ تُؤْمِنُونَ بِاللهِ وَرَسُولِهِ وَتُجَاهِدُونَ فِي سَبِيلِ اللهِ بِأَمْوَالِكُمْ وَأَنْفُسِكُمْ ذَلِكُمْ خَيْرٌ لَكُمْ إِنْ كُنْتُمْ تَعْلَمُونَ﴾ (الصف: ١٠-١١)، وَقَوْلُهُ سُبْحَانَهُ: ﴿فَلَا تُطِعِ الكَافِرِينَ وَجَاهِدْهُمْ بِهِ جِهَادًا كَبِيرًا﴾ (الفرقان: ٥٢). وَمِنْ ذَلِكَ قَوْلُ النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: «رَأْسُ الأَمْرِ الإِسْلَامُ، وَعَمُودُهُ الصَّلَاةُ، وَذِرْوَةُ سَنَامِهِ الجِهَادُ» (رَوَاهُ التِّرْمِذِيُّ)." +
  "<br>فَمَا هُوَ الجِهَادُ، وَمَا غَايَاتُهُ؟ قَالَ العَلَّامَةُ ابْنُ حَجَرٍ العَسْقَلَانِيُّ: «الجِهَادُ لُغَةً: المَشَقَّةُ، وَاصْطِلَاحًا: بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ، وَيُطْلَقُ أَيْضًا عَلَى مُجَاهَدَةِ النَّفْسِ وَالشَّيْطَانِ وَالفُسَّاقِ». وَالجِهَادُ الحَقِيقِيُّ هُوَ الجِهَادُ الَّذِي يُقْصَدُ بِهِ وَجْهُ اللهِ وَإِعْلَاءُ كَلِمَتِهِ وَرَفْعُ رَايَةِ الحَقِّ، فَإِذَا أُرِيدَ بِهِ شَيْءٌ دُونَ ذَلِكَ مِنْ حُظُوظِ الدُّنْيَا فَهُوَ لَيْسَ جِهَادًا." +
  "<br>إِنَّ تَشْرِيعَ الجِهَادِ فِي الإِسْلَامِ لَيْسَ لِلِاعْتِدَاءِ عَلَى الآخَرِينَ، وَلَكِنَّهُ تَشْرِيعٌ لَهُ أَسْبَابٌ وَغَايَاتٌ يَهْدِفُ الإِسْلَامُ إِلَى تَحْقِيقِهَا، وَمِنْ أَهَمِّ هَذِهِ الغَايَاتِ مَا نُشِيرُ إِلَيْهِ بِإِيجَازٍ فِيمَا يَأْتِي:" +
  "<br>• دَفْعُ الظُّلْمِ، وَرَفْعُ الأَذَى عَنِ المُسْلِمِينَ. وَكَانَ دَفْعُ الظُّلْمِ أَوَّلَ جِهَادٍ لِلْمُسْلِمِينَ الَّذِينَ تَعَرَّضُوا فِي مَكَّةَ لِلظُّلْمِ وَالأَذَى مِنَ المُشْرِكِينَ، حَتَّى أَخْرَجُوهُمْ مِنْ دِيَارِهِمْ وَأَمْوَالِهِمْ إِلَى «الحَبَشَةِ» أَوَّلًا، ثُمَّ إِلَى «يَثْرِبَ» ثَانِيًا، وَقَدْ أَذِنَ اللهُ لَهُمْ فِي مُقَاتَلَةِ هَؤُلَاءِ المُشْرِكِينَ: ﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا وَإِنَّ اللهَ عَلَى نَصْرِهِمْ لَقَدِيرٌ الَّذِينَ أُخْرِجُوا مِنْ دِيَارِهِمْ بِغَيْرِ حَقٍّ إِلَّا أَنْ يَقُولُوا رَبُّنَا اللهُ﴾ (الحج: ٣٩-٤٠)." +
  "<br>• الدِّفَاعُ عَنِ المَظْلُومِينَ المُضْطَهَدِينَ الَّذِينَ لَا يَسْتَطِيعُونَ الدِّفَاعَ عَنْ أَنْفُسِهِمْ، وَلَا يَسْتَطِيعُونَ أَنْ يُهَاجِرُوا مِنْ أَرْضِ الشِّرْكِ إِلَى بِلَادِ الإِسْلَامِ: ﴿وَمَا لَكُمْ لَا تُقَاتِلُونَ فِي سَبِيلِ اللهِ وَالمُسْتَضْعَفِينَ مِنَ الرِّجَالِ وَالنِّسَاءِ وَالوِلْدَانِ الَّذِينَ يَقُولُونَ رَبَّنَا أَخْرِجْنَا مِنْ هَذِهِ القَرْيَةِ الظَّالِمِ أَهْلُهَا﴾ (النساء: ٧٥)، وَيَرْتَبِطُ بِهَذَا ارْتِبَاطًا وَثِيقًا حِمَايَةُ المُسْلِمِينَ مِنَ البَغْيِ الَّذِي يُؤَدِّي إِلَى الفِتْنَةِ فِي الدِّينِ الَّتِي هِيَ أَشَدُّ مِنَ القَتْلِ، وَلِذَلِكَ يَقُولُ اللهُ تَعَالَى: ﴿وَقَاتِلُوهُمْ حَتَّى لَا تَكُونَ فِتْنَةٌ وَيَكُونَ الدِّينُ لِلَّهِ﴾ (البقرة: ١٩٣)." +
  "<br>• مُجَاهَدَةُ الكَافِرِينَ وَقِتَالُهُمْ إِذَا بَدَؤُوا المُسْلِمِينَ بِالقِتَالِ: ﴿وَقَاتِلُوا فِي سَبِيلِ اللهِ الَّذِينَ يُقَاتِلُونَكُمْ وَلَا تَعْتَدُوا إِنَّ اللهَ لَا يُحِبُّ المُعْتَدِينَ﴾ (البقرة: ١٩٠)، وَيَرْتَبِطُ بِهَذَا السَّبَبِ نَقْضُ المُشْرِكِينَ وَغَيْرِهِمْ لِعُهُودِهِمُ الَّتِي قَطَعُوهَا عَلَى أَنْفُسِهِمْ لِلْمُؤْمِنِينَ: ﴿وَإِنْ نَكَثُوا أَيْمَانَهُمْ مِنْ بَعْدِ عَهْدِهِمْ وَطَعَنُوا فِي دِينِكُمْ فَقَاتِلُوا أَئِمَّةَ الكُفْرِ إِنَّهُمْ لَا أَيْمَانَ لَهُمْ لَعَلَّهُمْ يَنْتَهُونَ﴾ (التوبة: ١٢)، فَإِذَا وَفَوْا بِالعُهُودِ وَاسْتَقَامُوا فِي تَعَامُلِهِمْ مَعَ المُسْلِمِينَ فَإِنَّ المُسْلِمِينَ مُكَلَّفُونَ بِمُعَامَلَتِهِمْ بِالمِثْلِ: ﴿فَمَا اسْتَقَامُوا لَكُمْ فَاسْتَقِيمُوا لَهُمْ إِنَّ اللهَ يُحِبُّ المُتَّقِينَ﴾ (التوبة: ٧)." +
  "<br>• بَذْلُ الجُهْدِ لِإِبْلَاغِ كَلِمَةِ اللهِ إِلَى النَّاسِ، وَتَحْقِيقُ عَالَمِيَّةِ الرِّسَالَةِ، قَالَ تَعَالَى: ﴿هُوَ الَّذِي أَرْسَلَ رَسُولَهُ بِالهُدَى وَدِينِ الحَقِّ لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ وَلَوْ كَرِهَ المُشْرِكُونَ﴾ (التوبة: ٣٣)." +
  "<br>وَبِسَبَبِ هَذِهِ المَهَامِّ الجَلِيلَةِ الَّتِي يَقُومُ بِهَا الجِهَادُ فِي الدِّفَاعِ عَنِ الإِسْلَامِ وَالعَمَلِ عَلَى نَشْرِهِ، كَانَ لِلْجِهَادِ مَكَانَةٌ عُظْمَى؛ فَهُوَ «ذِرْوَةُ سَنَامِ الإِسْلَامِ» كَمَا وَصَفَهُ الرَّسُولُ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَكَانَ القَائِمُونَ بِهِ مِنَ المُجَاهِدِينَ وَالشُّهَدَاءِ فِي الدَّرَجَاتِ العُلَى عِنْدَ اللهِ، كَمَا تَدُلُّ عَلَى ذَلِكَ الآيَاتُ وَالأَحَادِيثُ الكَثِيرَةُ." +
  "<br>هَذَا، وَلِلْجِهَادِ فِي الإِسْلَامِ آدَابٌ سَامِيَةٌ يَنْبَغِي الالْتِزَامُ بِهَا، مِنْهَا: أَنَّهُ لَا يَجُوزُ الاعْتِدَاءُ عَلَى غَيْرِ المُحَارِبِينَ مِنَ الرِّجَالِ وَالنِّسَاءِ وَالأَطْفَالِ وَالشُّيُوخِ وَالعَجَزَةِ، وَكَذَلِكَ أَمَاكِنُ العِبَادَةِ لِغَيْرِ المُسْلِمِينَ وَمَنْ فِيهَا مِنَ العَابِدِينَ، بِعَكْسِ مَا تَفْعَلُهُ بَعْضُ الدُّوَلِ البَاغِيَةِ الَّتِي تَقُومُ بِقَتْلِ الأَبْرِيَاءِ مِنَ المَدَنِيِّينَ وَالنِّسَاءِ وَالأَطْفَالِ وَالشُّيُوخِ وَالعَجَزَةِ.";
var METIN_TR = "Cihad Kitap’ta ve Sünnet’te çok geçer. Bunlardan biri Allah Teâlâ’nın şu sözüdür: “Ey iman edenler! Sizi acı bir azaptan kurtaracak bir ticarete yol göstereyim mi? Allah’a ve Resûlü’ne iman edersiniz, mallarınızla ve canlarınızla Allah yolunda cihad edersiniz. Eğer bilirseniz bu sizin için daha hayırlıdır.” (Saf 10-11) Bir diğeri: “Kâfirlere boyun eğme; onlara karşı bununla (Kur’an’la) büyük bir cihad ver.” (Furkân 52) Peygamber’in (s.a.v.) şu sözü de bunlardandır: “İşin başı İslâm, direği namaz, hörgücünün zirvesi cihaddır.” (Tirmizî)" +
  "<br>Peki cihad nedir, gayeleri nelerdir? Allâme İbn Hacer el-Askalânî şöyle der: “Cihad sözlükte meşakkat; terim olarak kâfirlerle savaşta güç harcamaktır. Nefse, şeytana ve fâsıklara karşı mücadeleye de cihad denir.” Gerçek cihad, Allah’ın rızası, O’nun sözünün yüceltilmesi ve hakkın sancağının yükseltilmesi amaçlanan cihaddır. Onunla bunun dışında bir dünya nasibi istenirse o cihad değildir." +
  "<br>İslâm’da cihadın meşru kılınması başkalarına saldırmak için değildir; o, İslâm’ın gerçekleştirmeyi hedeflediği sebepleri ve gayeleri olan bir hükümdür. Bu gayelerin en önemlilerine aşağıda kısaca değiniyoruz:" +
  "<br>• Zulmü defetmek ve Müslümanlardan eziyeti kaldırmak. Zulmü defetmek, Mekke’de müşriklerin zulmüne ve eziyetine uğrayan Müslümanların ilk cihadıydı; müşrikler onları yurtlarından ve mallarından önce Habeşistan’a, sonra Yesrib’e çıkardılar. Allah da onlara bu müşriklerle savaşma izni verdi: “Kendilerine savaş açılanlara, zulme uğradıkları için izin verildi; Allah onlara yardım etmeye elbette kadirdir. Onlar sadece ‘Rabbimiz Allah’tır’ dedikleri için haksız yere yurtlarından çıkarılanlardır.” (Hac 39-40)" +
  "<br>• Kendini savunamayan ve şirk diyarından İslâm diyarına hicret edemeyen ezilmiş mazlumları savunmak: “Size ne oluyor da Allah yolunda ve ‘Rabbimiz, bizi halkı zalim olan bu şehirden çıkar’ diyen zayıf bırakılmış erkekler, kadınlar ve çocuklar uğruna savaşmıyorsunuz?” (Nisâ 75) Buna sıkı sıkıya bağlı olan bir şey de Müslümanları, öldürmekten daha ağır olan dinde fitneye götüren azgınlıktan korumaktır. Bu yüzden Allah Teâlâ: “Fitne kalmayıncaya ve din Allah’ın oluncaya kadar onlarla savaşın.” (Bakara 193) buyurur." +
  "<br>• Kâfirler Müslümanlara savaş açarsa onlara karşı mücadele etmek ve savaşmak: “Sizinle savaşanlarla Allah yolunda savaşın, ama aşırı gitmeyin; Allah aşırı gidenleri sevmez.” (Bakara 190) Bu sebeple ilgili olan bir durum da müşriklerin ve başkalarının müminlere verdikleri ahitleri bozmalarıdır: “Ahitlerinden sonra yeminlerini bozar ve dininize saldırırlarsa küfrün önderleriyle savaşın; onların yeminleri yoktur, belki vazgeçerler.” (Tevbe 12) Ahitlerine vefa gösterir ve Müslümanlarla ilişkilerinde dürüst kalırlarsa Müslümanlar da onlara aynı şekilde davranmakla yükümlüdür: “Onlar size karşı dürüst davrandıkça siz de onlara karşı dürüst davranın; Allah takvâ sahiplerini sever.” (Tevbe 7)" +
  "<br>• Allah’ın sözünü insanlara ulaştırmak ve risaletin evrenselliğini gerçekleştirmek için çaba harcamak. Allah Teâlâ şöyle buyurur: “Müşrikler hoşlanmasa da dinini bütün dinlere üstün kılmak için Resûlünü hidayet ve hak din ile gönderen O’dur.” (Tevbe 33)" +
  "<br>Cihadın İslâm’ı savunma ve yaymaya çalışmadaki bu yüce görevleri sebebiyle cihadın çok büyük bir yeri vardır: Resûlullah’ın (s.a.v.) nitelediği gibi o “İslâm’ın hörgücünün zirvesidir”. Pek çok âyet ve hadisin gösterdiği gibi, onu yerine getiren mücahitler ve şehitler Allah katında yüksek derecelerdedir." +
  "<br>Bundan başka İslâm’da cihadın uyulması gereken yüce âdâbı vardır. Bunlardan biri şudur: Savaşmayan erkeklere, kadınlara, çocuklara, yaşlılara ve âcizlere; aynı şekilde gayrimüslimlerin ibadet yerlerine ve oradaki ibadet edenlere saldırmak caiz değildir. Bu, sivillerden, kadınlardan, çocuklardan, yaşlılardan ve âcizlerden masumları öldüren bazı zalim devletlerin yaptığının tam tersidir.";
var SOZLUK = [["المَشَقَّةُ", "meşakkat, zorluk"], ["بَذْلُ الجُهْدِ", "güç harcamak, çabalamak"], ["الفُسَّاقُ (فَاسِقٌ)", "günahkârlar, fâsıklar"], ["إِعْلَاءٌ", "yüceltmek"], ["رَايَةٌ", "sancak, bayrak"], ["حُظُوظُ الدُّنْيَا", "dünya nasipleri, menfaatler"], ["تَشْرِيعٌ", "meşru kılma, hüküm koyma"], ["بِإِيجَازٍ", "kısaca"], ["الأَذَى", "eziyet"], ["المُضْطَهَدُونَ", "ezilenler, baskı görenler"], ["المُسْتَضْعَفُونَ", "zayıf bırakılanlar"], ["البَغْيُ", "azgınlık, haddi aşma"], ["الفِتْنَةُ", "fitne, dinden döndürme baskısı"], ["نَقْضُ العَهْدِ", "ahdi bozmak"], ["نَكَثُوا", "bozdular"], ["ذِرْوَةُ السَّنَامِ", "hörgücün zirvesi"], ["سَامِيَةٌ", "yüce"], ["العَجَزَةُ (عَاجِزٌ)", "âcizler, güçsüzler"], ["البَاغِيَةُ", "zalim, azgın"], ["الأَبْرِيَاءُ (بَرِيءٌ)", "masumlar, suçsuzlar"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce konuyu düşünmek: cihad nedir, türleri var mıdır?", "Metni baştan sona okumak ve dinlemek", "Yeni kelimeleri anlamlarıyla öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "الجِهَادُ لُغَةً::mz / المَشَقَّةُ،:- / وَاصْطِلَاحًا::mz / بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ.:-", tr: "Cihad sözlükte meşakkat; terimde kâfirlerle savaşta güç harcamaktır." },
    { s: "رَأْسُ الأَمْرِ الإِسْلَامُ،:- / وَعَمُودُهُ الصَّلَاةُ،:- / وَذِرْوَةُ سَنَامِهِ:nasb / الجِهَادُ.:mz", tr: "İşin başı İslâm, direği namaz, hörgücünün zirvesi cihaddır. (Tirmizî)" }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> Cihadın tanımı, gayeleri, İslâm’daki yeri ve âdâbı. Metin önce âyet ve hadislerle cihadın önemini, sonra tanımını, dört gayesini ve son olarak savaş âdâbını anlatır." },
    { tr: "<b>Tanım:</b> Sözlükte <span class=\"ar\">المَشَقَّةُ</span> (meşakkat); terimde <span class=\"ar\">بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ</span>. Nefse, şeytana ve fâsıklara karşı mücadele de cihaddır." },
    { tr: "<b>Gerçek cihad:</b> Allah’ın rızası ve O’nun sözünün yüceltilmesi için yapılandır; dünya menfaati için yapılan cihad değildir." },
    { tr: "<b>Okuma yolu:</b> Önce okuma öncesi soruları düşün, sonra metni bir kez baştan sona oku ya da “Metni dinle” düğmesiyle dinle. Bilmediğin kelimeyi sözlükte bul." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَا تَعْرِيفُكَ لِلْجِهَادِ؟ هَلْ لِلْجِهَادِ أَنْوَاعٌ، أَوْ هُوَ جِهَادٌ وَاحِدٌ؟", METIN.split("<br>")[0], METIN.split("<br>")[1]],
  ex: [
    { type: "reading", ar: "اقْرَأِ النَّصَّ ثُمَّ ضَعْ إِشَارَةَ (✓) أَمَامَ الجُمْلَةِ الصَّحِيحَةِ، وَإِشَارَةَ (✗) أَمَامَ الجُمْلَةِ الخَاطِئَةِ", tr: "Okuma öncesi sorularını düşün, metni oku ya da dinle; sonra cümlenin metne göre doğru mu yanlış mı olduğunu seç. İlk beş cümle kitaptandır.", title: "مَفْهُومُ الجِهَادِ فِي الإِسْلَامِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَا تَعْرِيفُكَ لِلْجِهَادِ؟", a: "الجِهَادُ بَذْلُ الجُهْدِ وَالطَّاقَةِ فِي سَبِيلِ اللهِ لِإِعْلَاءِ كَلِمَتِهِ.", tr: "Cihadı nasıl tanımlarsın? (Örnek cevap) Allah’ın sözünü yüceltmek için Allah yolunda güç ve çaba harcamak." },
        { q: "هَلْ لِلْجِهَادِ أَنْوَاعٌ، أَوْ هُوَ جِهَادٌ وَاحِدٌ؟", a: "لِلْجِهَادِ أَنْوَاعٌ: جِهَادُ الكُفَّارِ بِالقِتَالِ، وَمُجَاهَدَةُ النَّفْسِ، وَمُجَاهَدَةُ الشَّيْطَانِ، وَمُجَاهَدَةُ الفُسَّاقِ.", tr: "Cihadın türleri var mı? Evet: kâfirlere karşı savaş, nefisle, şeytanla ve fâsıklarla mücadele." },
        { q: "مَا الآيَتَانِ اللَّتَانِ ذَكَرَهُمَا النَّصُّ أَوَّلًا؟", a: "آيَةُ الصَّفِّ: ﴿هَلْ أَدُلُّكُمْ عَلَى تِجَارَةٍ...﴾ وَآيَةُ الفُرْقَانِ: ﴿وَجَاهِدْهُمْ بِهِ جِهَادًا كَبِيرًا﴾.", tr: "Metnin ilk andığı iki âyet hangileri? Saf 10-11 ve Furkân 52." },
        { q: "كَيْفَ وَصَفَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ الجِهَادَ؟", a: "وَصَفَهُ بِأَنَّهُ ذِرْوَةُ سَنَامِ الإِسْلَامِ.", tr: "Peygamber cihadı nasıl nitelendirdi? İslâm’ın hörgücünün zirvesi olarak." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "الجِهَادُ الحَقِيقِيُّ مَا أُرِيدَ بِهِ رَفْعُ كَلِمَةِ اللهِ تَعَالَى.", a: "d", why: "Kitap ١: وَإِعْلَاءُ كَلِمَتِهِ وَرَفْعُ رَايَةِ الحَقِّ." },
        { s: "الجِهَادُ فِي اللُّغَةِ هُوَ المَشَقَّةُ، وَفِي الشَّرْعِ هُوَ بَذْلُ الجُهْدِ فِي مُحَارَبَةِ النَّاسِ.", a: "y", why: "Kitap ٢: Terim anlamı “insanlarla” değil, kâfirlerle savaşta güç harcamaktır: فِي قِتَالِ الكُفَّارِ." },
        { s: "يَثْرِبُ هُوَ الاسْمُ القَدِيمُ لِلْمَدِينَةِ المُنَوَّرَةِ.", a: "d", why: "Kitap ٣: Hicret önce Habeşistan’a, sonra Yesrib’e (Medine) oldu." },
        { s: "الفِتْنَةُ فِي الدِّينِ جَرِيمَةٌ وَإِثْمٌ كَبِيرٌ مِثْلُ قَتْلِ النَّفْسِ تَمَامًا.", a: "y", why: "Kitap ٤ (düzenlendi): Metne göre fitne öldürmekle eşit değil, ondan daha ağırdır: أَشَدُّ مِنَ القَتْلِ." },
        { s: "مِنْ آدَابِ الجِهَادِ الإِسْلَامِيِّ عَدَمُ الاعْتِدَاءِ عَلَى الأَبْرِيَاءِ وَالمَدَنِيِّينَ.", a: "d", why: "Kitap ٥: لَا يَجُوزُ الاعْتِدَاءُ عَلَى غَيْرِ المُحَارِبِينَ." },
        { s: "شُرِعَ الجِهَادُ فِي الإِسْلَامِ لِلِاعْتِدَاءِ عَلَى الآخَرِينَ.", a: "y", why: "لَيْسَ لِلِاعْتِدَاءِ عَلَى الآخَرِينَ." },
        { s: "إِذَا أُرِيدَ بِالجِهَادِ شَيْءٌ مِنْ حُظُوظِ الدُّنْيَا فَهُوَ لَيْسَ جِهَادًا.", a: "d", why: "Metinde aynen geçer." },
        { s: "هَاجَرَ المُسْلِمُونَ أَوَّلًا إِلَى يَثْرِبَ ثُمَّ إِلَى الحَبَشَةِ.", a: "y", why: "Önce Habeşistan, sonra Yesrib." },
        { s: "كَانَ دَفْعُ الظُّلْمِ أَوَّلَ جِهَادٍ لِلْمُسْلِمِينَ.", a: "d", why: "Birinci gaye." },
        { s: "إِذَا وَفَى المُشْرِكُونَ بِالعُهُودِ فَالمُسْلِمُونَ مُكَلَّفُونَ بِمُعَامَلَتِهِمْ بِالمِثْلِ.", a: "d", why: "فَمَا اسْتَقَامُوا لَكُمْ فَاسْتَقِيمُوا لَهُمْ." },
        { s: "يُطْلَقُ الجِهَادُ عَلَى قِتَالِ الكُفَّارِ فَقَطْ.", a: "y", why: "Nefse, şeytana ve fâsıklara karşı mücadeleye de denir." },
        { s: "يَجُوزُ الاعْتِدَاءُ عَلَى أَمَاكِنِ العِبَادَةِ لِغَيْرِ المُسْلِمِينَ.", a: "y", why: "İbadet yerlerine ve içindekilere saldırmak caiz değildir." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("الجِهَادُ لُغَةً: المَشَقَّةُ", "المَشَقَّةُ"), "meşakkat, zorluk", "kolaylık", "savaş", "Cihad sözlükte meşakkattir.", "شَقَّ عَلَيْهِ: ona zor geldi."],
      [HL("بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ", "بَذْلُ الجُهْدِ"), "güç harcamak", "gücü saklamak", "dinlenmek", "Kâfirlerle savaşta güç harcamak.", "بَذَلَ: cömertçe vermek."],
      [HL("وَرَفْعُ رَايَةِ الحَقِّ", "رَايَةِ"), "sancak", "yol", "söz", "Hakkın sancağını yükseltmek.", "Çoğulu: رَايَاتٌ."],
      [HL("مِنْ حُظُوظِ الدُّنْيَا", "حُظُوظِ"), "nasipler, menfaatler", "zorluklar", "kurallar", "Dünya nasiplerinden.", "Tekili: حَظٌّ."],
      [HL("مَا نُشِيرُ إِلَيْهِ بِإِيجَازٍ", "بِإِيجَازٍ"), "kısaca", "uzun uzun", "yavaşça", "Kısaca değindiğimiz şey.", "Zıddı: بِإِطْنَابٍ / بِتَفْصِيلٍ."],
      [HL("وَرَفْعُ الأَذَى عَنِ المُسْلِمِينَ", "الأَذَى"), "eziyet", "yardım", "korku", "Müslümanlardan eziyeti kaldırmak.", "آذَى: incitmek."],
      [HL("الدِّفَاعُ عَنِ المَظْلُومِينَ المُضْطَهَدِينَ", "المُضْطَهَدِينَ"), "ezilenler, baskı görenler", "zalimler", "göçmenler", "Ezilmiş mazlumları savunmak.", "اضْطَهَدَ: baskı yapmak."],
      [HL("حِمَايَةُ المُسْلِمِينَ مِنَ البَغْيِ", "البَغْيِ"), "azgınlık, haddi aşma", "adalet", "yoksulluk", "Müslümanları azgınlıktan korumak.", "بَاغٍ: zalim, azgın."],
      [HL("وَإِنْ نَكَثُوا أَيْمَانَهُمْ", "نَكَثُوا"), "bozdular", "tuttular", "yazdılar", "Yeminlerini bozarlarsa.", "Eş anlamlısı: نَقَضُوا."],
      [HL("وَذِرْوَةُ سَنَامِهِ الجِهَادُ", "ذِرْوَةُ"), "zirve", "temel", "kapı", "Hörgücünün zirvesi cihaddır.", "Eş anlamlısı: قِمَّةٌ."],
      [HL("آدَابٌ سَامِيَةٌ", "سَامِيَةٌ"), "yüce", "basit", "eski", "Yüce âdâb.", "سَمَا: yükseldi."],
      [HL("بَعْضُ الدُّوَلِ البَاغِيَةِ", "البَاغِيَةِ"), "zalim, azgın", "zengin", "uzak", "Bazı zalim devletler.", "Eş anlamlısı: الظَّالِمَةُ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "أَسْئِلَةُ الفَهْمِ العَامِّ وَمَا بَعْدَ القِرَاءَةِ", tr: "Metni Anlama: Cihadın Gayeleri", short: "Anlama", col: "nasb", legend: ["nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cihadın dört gayesini delilleriyle bilmek", "Âyeti ilgili olduğu gayeyle eşleştirmek", "Okuma sonrası soruyu âyetten delil getirerek cevaplamak"],
  examples: [
    { s: "دَفْعُ الظُّلْمِ:nasb / ← ﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا﴾:cerr", tr: "Zulmü defetmek ← Hac 39" },
    { s: "إِبْلَاغُ كَلِمَةِ اللهِ:nasb / ← ﴿لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ﴾:cerr", tr: "Tebliğ ← Tevbe 33" }
  ],
  rules: [
    { tr: "Metne göre cihadın en önemli dört gayesi:<br>• <b>Zulmü defetmek</b>: <span class=\"ar\">دَفْعُ الظُّلْمِ وَرَفْعُ الأَذَى</span> (Hac 39-40)<br>• <b>Mazlumları korumak</b>: <span class=\"ar\">الدِّفَاعُ عَنِ المُسْتَضْعَفِينَ</span> (Nisâ 75, Bakara 193)<br>• <b>Saldırana ve ahdi bozana karşılık</b>: <span class=\"ar\">قِتَالُ المُعْتَدِينَ وَنَاقِضِي العَهْدِ</span> (Bakara 190, Tevbe 12, 7)<br>• <b>Tebliğ</b>: <span class=\"ar\">إِبْلَاغُ كَلِمَةِ اللهِ وَعَالَمِيَّةُ الرِّسَالَةِ</span> (Tevbe 33)" },
    { tr: "Soru kelimesine dikkat et: <span class=\"ar\">مَا</span> tanım ister, <span class=\"ar\">مَا مَوْقِفُ</span> tutum ister, <span class=\"ar\">مَا الدَّلِيلُ</span> âyet ya da hadis ister. Delil isteyen soruda cevabını bir âyetle destekle." },
    { tr: "Okuma sonrası: <span class=\"ar\">﴿وَأَعِدُّوا لَهُمْ مَا اسْتَطَعْتُمْ مِنْ قُوَّةٍ﴾</span> (Enfâl 60) âyetinin devamı gücün amacını söyler: <span class=\"ar\">﴿تُرْهِبُونَ بِهِ عَدُوَّ اللهِ وَعَدُوَّكُمْ﴾</span>; yani düşmanı caydırmak." }
  ],
  kaide: ["أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ: ١ ـ مَا مَفْهُومُ الجِهَادِ كَمَا فَهِمْتَ مِنَ النَّصِّ؟ ٢ ـ اكْتُبْ غَايَتَيْنِ مِنْ غَايَاتِ تَشْرِيعِ الجِهَادِ بِاخْتِصَارٍ مَعَ الدَّلِيلِ القُرْآنِيِّ. ٣ ـ مَا مَوْقِفُ الإِسْلَامِ مِنْ غَيْرِ المُحَارِبِينَ لَهُ وَمِنَ الأَطْفَالِ وَالنِّسَاءِ وَالشُّيُوخِ أَثْنَاءَ الحَرْبِ؟ ٤ ـ إِذَا نَقَضَ المُشْرِكُونَ عَهْدَهُمْ مَعَ المُسْلِمِينَ، فَهَلْ يَجِبُ جِهَادُهُمْ؟ وَمَا الدَّلِيلُ؟", "أَسْئِلَةُ مَا بَعْدَ القِرَاءَةِ: أَمَرَنَا اللهُ تَعَالَى فِي كِتَابِهِ العَزِيزِ بِإِعْدَادِ القُوَّةِ فَقَالَ تَعَالَى: ﴿وَأَعِدُّوا لَهُمْ مَا اسْتَطَعْتُمْ مِنْ قُوَّةٍ...﴾ (الأنفال: ٦٠). فَمَا الغَرَضُ مِنْ إِعْدَادِ هَذِهِ القُوَّةِ، وَمَا الدَّلِيلُ؟"],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ", tr: "Metne göre en doğru cevabı seç. İlk dört soru kitaptandır.", items: PL([
      ["مَا مَفْهُومُ الجِهَادِ كَمَا فَهِمْتَ مِنَ النَّصِّ؟", "بَذْلُ الجُهْدِ فِي سَبِيلِ اللهِ لِإِعْلَاءِ كَلِمَتِهِ، وَيَشْمَلُ قِتَالَ الكُفَّارِ وَمُجَاهَدَةَ النَّفْسِ وَالشَّيْطَانِ.", "الاعْتِدَاءُ عَلَى الآخَرِينَ لِأَخْذِ أَمْوَالِهِمْ.", "كُلُّ حَرْبٍ يَقُومُ بِهَا النَّاسُ لِأَيِّ غَرَضٍ.", "Metne göre cihad kavramı nedir?", "Tanım + niyet: وَجْهُ اللهِ وَإِعْلَاءُ كَلِمَتِهِ."],
      ["اكْتُبْ غَايَتَيْنِ مِنْ غَايَاتِ تَشْرِيعِ الجِهَادِ مَعَ الدَّلِيلِ.", "دَفْعُ الظُّلْمِ: ﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا﴾، وَإِبْلَاغُ كَلِمَةِ اللهِ: ﴿لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ﴾.", "جَمْعُ الغَنَائِمِ: ﴿وَأَعِدُّوا لَهُمْ﴾، وَالشُّهْرَةُ: ﴿فَلَا تُطِعِ الكَافِرِينَ﴾.", "حُظُوظُ الدُّنْيَا: ﴿تِجَارَةٍ تُنْجِيكُمْ﴾، وَالاعْتِدَاءُ: ﴿وَلَا تَعْتَدُوا﴾.", "Cihadın iki gayesini deliliyle yaz.", "Dört gayeden herhangi ikisi delilleriyle yazılabilir."],
      ["مَا مَوْقِفُ الإِسْلَامِ مِنْ غَيْرِ المُحَارِبِينَ وَمِنَ الأَطْفَالِ وَالنِّسَاءِ وَالشُّيُوخِ أَثْنَاءَ الحَرْبِ؟", "لَا يَجُوزُ الاعْتِدَاءُ عَلَيْهِمْ، وَلَا عَلَى أَمَاكِنِ العِبَادَةِ وَمَنْ فِيهَا.", "يَجُوزُ قِتَالُهُمْ إِذَا كَانُوا مِنَ الكُفَّارِ.", "يُتْرَكُ أَمْرُهُمْ لِلْقَائِدِ يَفْعَلُ مَا يَشَاءُ.", "İslâm’ın savaşta savaşmayanlara, çocuklara, kadınlara ve yaşlılara karşı tutumu nedir?", "Cihadın âdâbından: Resûlullah kadınları ve çocukları öldürmeyi yasakladı."],
      ["إِذَا نَقَضَ المُشْرِكُونَ عَهْدَهُمْ مَعَ المُسْلِمِينَ، فَهَلْ يَجِبُ جِهَادُهُمْ؟ وَمَا الدَّلِيلُ؟", "نَعَمْ: ﴿وَإِنْ نَكَثُوا أَيْمَانَهُمْ مِنْ بَعْدِ عَهْدِهِمْ وَطَعَنُوا فِي دِينِكُمْ فَقَاتِلُوا أَئِمَّةَ الكُفْرِ﴾.", "لَا، لِأَنَّ العَهْدَ لَا يُنْقَضُ أَبَدًا.", "نَعَمْ: ﴿هَلْ أَدُلُّكُمْ عَلَى تِجَارَةٍ﴾.", "Müşrikler ahdi bozarsa onlarla cihad gerekir mi? Delil nedir?", "Tevbe 12; ahde vefa gösterirlerse: فَمَا اسْتَقَامُوا لَكُمْ فَاسْتَقِيمُوا لَهُمْ."],
      ["لِمَاذَا لَمْ يَكُنْ تَشْرِيعُ الجِهَادِ لِلِاعْتِدَاءِ؟", "لِأَنَّ اللهَ قَالَ: ﴿وَلَا تَعْتَدُوا إِنَّ اللهَ لَا يُحِبُّ المُعْتَدِينَ﴾.", "لِأَنَّ المُسْلِمِينَ كَانُوا قَلِيلِينَ.", "لِأَنَّ الحَرْبَ كَانَتْ صَعْبَةً.", "Cihad niçin saldırı için meşru kılınmadı?", "Bakara 190."],
      ["إِلَى أَيْنَ أَخْرَجَ المُشْرِكُونَ المُسْلِمِينَ؟", "إِلَى الحَبَشَةِ أَوَّلًا، ثُمَّ إِلَى يَثْرِبَ ثَانِيًا.", "إِلَى يَثْرِبَ أَوَّلًا، ثُمَّ إِلَى الحَبَشَةِ.", "إِلَى الشَّامِ وَالعِرَاقِ.", "Müşrikler Müslümanları nereye çıkardı?", "Habeşistan hicretleri, sonra Medine’ye hicret."],
      ["مَا مَكَانَةُ المُجَاهِدِينَ وَالشُّهَدَاءِ عِنْدَ اللهِ؟", "هُمْ فِي الدَّرَجَاتِ العُلَى.", "هُمْ مِثْلُ غَيْرِهِمْ.", "لَمْ يَذْكُرْهَا النَّصُّ.", "Mücahitlerin ve şehitlerin Allah katındaki yeri nedir?", "Yüksek dereceler: الدَّرَجَاتُ العُلَى."]
    ])},
    { type: "pick", num: "ج", ar: "أَسْئِلَةُ مَا بَعْدَ القِرَاءَةِ: ﴿وَأَعِدُّوا لَهُمْ مَا اسْتَطَعْتُمْ مِنْ قُوَّةٍ...﴾", tr: "Enfâl 60’taki gücü hazırlamanın amacı nedir? İlk soru kitaptandır, diğer ikisi onu açar.", items: PL([
      ["فَمَا الغَرَضُ مِنْ إِعْدَادِ هَذِهِ القُوَّةِ، وَمَا الدَّلِيلُ؟", "إِرْهَابُ العَدُوِّ وَرَدْعُهُ حَتَّى لَا يَعْتَدِيَ عَلَى المُسْلِمِينَ: ﴿تُرْهِبُونَ بِهِ عَدُوَّ اللهِ وَعَدُوَّكُمْ﴾.", "الاعْتِدَاءُ عَلَى الشُّعُوبِ الضَّعِيفَةِ: ﴿وَلَا تَعْتَدُوا﴾.", "التَّفَاخُرُ بِالسِّلَاحِ: ﴿فَلَا تُطِعِ الكَافِرِينَ﴾.", "Bu gücü hazırlamanın amacı ve delili nedir?", "Âyetin devamı: تُرْهِبُونَ بِهِ عَدُوَّ اللهِ وَعَدُوَّكُمْ — caydırıcılık."],
      ["مَا مَعْنَى «تُرْهِبُونَ بِهِ عَدُوَّ اللهِ»؟", "تُخِيفُونَ بِهِ العَدُوَّ فَلَا يَجْرُؤُ عَلَى الاعْتِدَاءِ.", "تَقْتُلُونَ بِهِ الأَبْرِيَاءَ.", "تَتْرُكُونَ بِهِ الجِهَادَ.", "“Onunla Allah’ın düşmanını korkutursunuz” ne demektir?", "Korkutup saldırıdan alıkoymak: caydırma."],
      ["هَلْ تَتَعَارَضُ هَذِهِ الآيَةُ مَعَ آدَابِ الجِهَادِ؟", "لَا؛ فَالقُوَّةُ لِلرَّدْعِ وَالدِّفَاعِ، وَلَا يَجُوزُ بِهَا الاعْتِدَاءُ عَلَى الأَبْرِيَاءِ.", "نَعَمْ؛ فَهِيَ تُبِيحُ قَتْلَ كُلِّ أَحَدٍ.", "نَعَمْ؛ فَهِيَ تَنْهَى عَنِ الدِّفَاعِ.", "Bu âyet cihadın âdâbıyla çelişir mi?", "Güç caydırmak ve savunmak içindir; masumlara saldırı yine yasaktır."]
    ])},
    { type: "classify", extra: true, opts: GAYE, ar: "اسْتَدِلَّ: أَيُّ غَايَةٍ تَدُلُّ عَلَيْهَا الآيَةُ أَوِ العِبَارَةُ؟", tr: "Âyet ya da ifade cihadın hangi gayesini anlatıyor?", items: CL([
      ["﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا﴾", "z", "Hac 39: zulme uğradıkları için izin."],
      ["﴿الَّذِينَ أُخْرِجُوا مِنْ دِيَارِهِمْ بِغَيْرِ حَقٍّ﴾", "z", "Hac 40: haksız yere yurtlarından çıkarılanlar."],
      ["تَعَرَّضُوا فِي مَكَّةَ لِلظُّلْمِ وَالأَذَى", "z", "Mekke’deki zulüm."],
      ["﴿وَالمُسْتَضْعَفِينَ مِنَ الرِّجَالِ وَالنِّسَاءِ وَالوِلْدَانِ﴾", "m", "Nisâ 75: zayıf bırakılanlar."],
      ["﴿رَبَّنَا أَخْرِجْنَا مِنْ هَذِهِ القَرْيَةِ الظَّالِمِ أَهْلُهَا﴾", "m", "Hicret edemeyen mazlumların duası."],
      ["﴿وَقَاتِلُوهُمْ حَتَّى لَا تَكُونَ فِتْنَةٌ﴾", "m", "Bakara 193: Müslümanları dinde fitneden korumak."],
      ["﴿وَقَاتِلُوا فِي سَبِيلِ اللهِ الَّذِينَ يُقَاتِلُونَكُمْ﴾", "q", "Bakara 190: savaş açanlara karşı."],
      ["﴿وَإِنْ نَكَثُوا أَيْمَانَهُمْ مِنْ بَعْدِ عَهْدِهِمْ﴾", "q", "Tevbe 12: ahdi bozanlar."],
      ["﴿فَمَا اسْتَقَامُوا لَكُمْ فَاسْتَقِيمُوا لَهُمْ﴾", "q", "Tevbe 7: ahde vefa edene vefa."],
      ["﴿هُوَ الَّذِي أَرْسَلَ رَسُولَهُ بِالهُدَى وَدِينِ الحَقِّ﴾", "b", "Tevbe 33: hak dinin ulaştırılması."],
      ["تَحْقِيقُ عَالَمِيَّةِ الرِّسَالَةِ", "b", "Risaletin evrenselliği."],
      ["إِبْلَاغُ كَلِمَةِ اللهِ إِلَى النَّاسِ", "b", "Tebliğ."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · ZIT VE EŞ ANLAM
{
  id: "u3", no: 3, ar: "لُغَةُ النَّصِّ: الضِّدُّ وَالمُرَادِفُ", tr: "Metnin Dili: Zıt ve Eş Anlam", short: "Zıt · eş", col: "mi", legend: [],
  goals: ["Metindeki kelimelerin zıt anlamlılarını bulmak", "Metindeki kelimelerin eş anlamlılarını bulmak", "Bir kelime çiftinin zıt mı eş mi olduğunu ayırmak"],
  examples: [
    { s: "الحَقُّ:mz.Kelime / ≠ البَاطِلُ:cerr.Zıt", tr: "hak ≠ batıl (zıt: ضِدٌّ)", pair: "ذِرْوَةٌ:mz.Kelime / = قِمَّةٌ:nasb.Eş", pairTr: "zirve = doruk (eş: مُرَادِفٌ)" },
    { s: "وَفَوْا:mz.Kelime / ≠ نَكَثُوا:cerr.Zıt", tr: "vefa gösterdiler ≠ bozdular", pair: "البَاغِيَةُ:mz.Kelime / = الظَّالِمَةُ:nasb.Eş", pairTr: "azgın = zalim" }
  ],
  rules: [
    { tr: "<b>Zıt anlam</b> (<span class=\"ar\">الضِّدُّ</span>): anlamı karşıt kelime. Metinden: <span class=\"ar\">قِتَالٌ ≠ صُلْحٌ / سِلْمٌ · الحَقُّ ≠ البَاطِلُ · الدُّنْيَا ≠ الآخِرَةُ · الظُّلْمُ ≠ العَدْلُ</span>." },
    { tr: "Fiillerin zıddı da fiil olur: <span class=\"ar\">رَفَعَ ≠ خَفَضَ · وَفَى ≠ أَخْلَفَ (نَكَثَ) · اسْتَقَامَ ≠ انْحَرَفَ</span>; sıfatın zıddı sıfat: <span class=\"ar\">وَثِيقٌ ≠ ضَعِيفٌ</span>." },
    { tr: "<b>Eş anlam</b> (<span class=\"ar\">المُرَادِفُ</span>): anlamı aynı ya da çok yakın kelime: <span class=\"ar\">وَرَدَ = جَاءَ · ذِرْوَةٌ = قِمَّةٌ · قِتَالٌ = مُحَارَبَةٌ · يُقْصَدُ = يُرَادُ بِهِ</span>." },
    { tr: "Eş anlamlıyı cümlede kelimenin yerine koyup dene; anlam bozulmuyorsa doğrudur: <span class=\"ar\">آدَابٌ سَامِيَةٌ ← آدَابٌ رَفِيعَةٌ</span>." }
  ],
  kaide: ["اذْكُرْ ضِدَّ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ: (البَاطِلُ، ضَعِيفٌ، العَدْلُ، انْحَرَفُوا، أَخْلَفُوا بِـ (نَكَثُوا)، الآخِرَةُ، خَفْضٌ، صُلْحٌ / سِلْمٌ).", "اذْكُرْ مُرَادِفَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ: (رَفْعٌ، الظَّالِمَةُ، جَاءَ، رَفِيعَةٌ، مُحَارَبَةٌ، قِمَّةٌ، كِبَارُ السِّنِّ، يُرَادُ بِهِ)."],
  ex: [
    { type: "bank", num: "١", ar: "اذْكُرْ ضِدَّ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ فِي الجُمَلِ التَّالِيَةِ", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra koyu kelimenin kutusuna dokun.", bank: ["البَاطِلُ", "ضَعِيفٌ", "العَدْلُ", "انْحَرَفُوا", "أَخْلَفُوا (نَكَثُوا)", "الآخِرَةُ", "خَفْضٌ", "صُلْحٌ / سِلْمٌ"], items: [
      { pre: HL("بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ.", "قِتَالِ") + " ≠", a: [7], tr: "savaş ≠ barış" },
      { pre: HL("وَرَفْعُ رَايَةِ الحَقِّ.", "الحَقِّ") + " ≠", a: [0], tr: "hak ≠ batıl" },
      { pre: HL("دُونَ ذَلِكَ مِنْ حُظُوظِ الدُّنْيَا.", "الدُّنْيَا") + " ≠", a: [5], tr: "dünya ≠ âhiret" },
      { pre: HL("وَكَانَ دَفْعُ الظُّلْمِ أَوَّلَ جِهَادٍ.", "الظُّلْمِ") + " ≠", a: [2], tr: "zulüm ≠ adalet" },
      { pre: HL("رَفْعُ الأَذَى عَنِ المُسْلِمِينَ.", "رَفْعُ") + " ≠", a: [6], tr: "kaldırmak, yükseltmek ≠ indirmek" },
      { pre: HL("وَيَرْتَبِطُ بِهَذَا ارْتِبَاطًا وَثِيقًا.", "وَثِيقًا") + " ≠", a: [1], tr: "sağlam ≠ zayıf" },
      { pre: HL("فَإِذَا وَفَوْا بِالعُهُودِ.", "وَفَوْا") + " ≠", a: [4], tr: "vefa gösterdiler ≠ sözlerinden döndüler" },
      { pre: HL("وَاسْتَقَامُوا فِي تَعَامُلِهِمْ مَعَ المُسْلِمِينَ.", "وَاسْتَقَامُوا") + " ≠", a: [3], tr: "dürüst kaldılar ≠ saptılar" }
    ]},
    { type: "bank", num: "٢", ar: "اذْكُرْ مُرَادِفَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ فِي الجُمَلِ التَّالِيَةِ", tr: "Önce aşağıdan eş anlamlıyı seç, sonra koyu kelimenin kutusuna dokun.", bank: ["رَفْعٌ", "الظَّالِمَةُ", "جَاءَ", "رَفِيعَةٌ", "مُحَارَبَةٌ", "قِمَّةٌ", "كِبَارُ السِّنِّ", "يُرَادُ بِهِ"], items: [
      { pre: HL("وَرَدَ ذِكْرُ الجِهَادِ كَثِيرًا فِي الكِتَابِ وَالسُّنَّةِ.", "وَرَدَ") + " =", a: [2], tr: "geçti = geldi" },
      { pre: HL("وَعَمُودُهُ الصَّلَاةُ، وَذِرْوَةُ سَنَامِهِ الجِهَادُ.", "وَذِرْوَةُ") + " =", a: [5], tr: "zirve = doruk" },
      { pre: HL("بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ.", "قِتَالِ") + " =", a: [4], tr: "savaş = muharebe" },
      { pre: HL("الجِهَادُ الَّذِي يُقْصَدُ بِهِ وَجْهُ اللهِ.", "يُقْصَدُ") + " =", a: [7], tr: "kastedilir = istenir" },
      { pre: HL("وَإِعْلَاءُ كَلِمَتِهِ.", "وَإِعْلَاءُ") + " =", a: [0], tr: "yüceltme = yükseltme" },
      { pre: HL("وَلِلْجِهَادِ فِي الإِسْلَامِ آدَابٌ سَامِيَةٌ.", "سَامِيَةٌ") + " =", a: [3], tr: "yüce = yüksek" },
      { pre: HL("بِعَكْسِ مَا تَفْعَلُهُ بَعْضُ الدُّوَلِ البَاغِيَةِ.", "البَاغِيَةِ") + " =", a: [1], tr: "azgın = zalim" },
      { pre: HL("بِقَتْلِ الأَبْرِيَاءِ مِنَ الشُّيُوخِ.", "الشُّيُوخِ") + " =", a: [6], tr: "ihtiyarlar = yaşlılar" }
    ]},
    { type: "classify", extra: true, opts: ZE, ar: "ضِدٌّ أَمْ مُرَادِفٌ؟", tr: "Kelime çifti zıt anlamlı mı, eş anlamlı mı?", items: CL([
      ["الحَقُّ / البَاطِلُ", "z", "hak ≠ batıl"],
      ["وَرَدَ / جَاءَ", "e", "geçti = geldi"],
      ["الظُّلْمُ / العَدْلُ", "z", "zulüm ≠ adalet"],
      ["ذِرْوَةٌ / قِمَّةٌ", "e", "zirve = doruk"],
      ["الدُّنْيَا / الآخِرَةُ", "z", "dünya ≠ âhiret"],
      ["البَاغِيَةُ / الظَّالِمَةُ", "e", "azgın = zalim"],
      ["وَفَوْا / نَكَثُوا", "z", "vefa ≠ bozma"],
      ["سَامِيَةٌ / رَفِيعَةٌ", "e", "yüce = yüksek"],
      ["وَثِيقٌ / ضَعِيفٌ", "z", "sağlam ≠ zayıf"],
      ["قِتَالٌ / مُحَارَبَةٌ", "e", "savaş = muharebe"],
      ["رَفْعٌ / خَفْضٌ", "z", "yükseltme ≠ indirme"],
      ["إِعْلَاءٌ / رَفْعٌ", "e", "yüceltme = yükseltme"],
      ["اسْتَقَامُوا / انْحَرَفُوا", "z", "dürüst kaldılar ≠ saptılar"],
      ["نَكَثُوا / نَقَضُوا", "e", "ikisi de “bozdular”"],
      ["قِتَالٌ / سِلْمٌ", "z", "savaş ≠ barış"],
      ["الشُّيُوخُ / كِبَارُ السِّنِّ", "e", "ihtiyarlar = yaşlılar"]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · ÇOĞUL VE TEKİL
{
  id: "u4", no: 4, ar: "لُغَةُ النَّصِّ: الجَمْعُ وَالمُفْرَدُ", tr: "Metnin Dili: Çoğul ve Tekil", short: "Çoğul · tekil", col: "ref", legend: [],
  goals: ["Metindeki kelimelerin çoğullarını bilmek", "Metindeki çoğul kelimelerin tekillerini bulmak", "Kelimenin tekil mi çoğul mu olduğunu ayırmak"],
  examples: [
    { s: "رَأْسٌ:mz.Tekil / ← رُؤُوسٌ:nasb.Çoğul", tr: "baş → başlar (cem-i teksîr)", pair: "رَايَةٌ:mz.Tekil / ← رَايَاتٌ:nasb.Çoğul", pairTr: "sancak → sancaklar (cem-i müennes sâlim)" },
    { s: "الشُّهَدَاءُ:nasb.Çoğul / ← شَهِيدٌ:mz.Tekil", tr: "şehitler → şehit (فُعَلَاءُ ← فَعِيلٌ)", pair: "الأَبْرِيَاءُ:nasb.Çoğul / ← بَرِيءٌ:mz.Tekil", pairTr: "masumlar → masum (أَفْعِلَاءُ ← فَعِيلٌ)" }
  ],
  rules: [
    { tr: "Metindeki çoğulların çoğu <b>cem-i teksîr</b>dir; kelimenin kalıbı değişir:<br>• <span class=\"ar\">فُعُولٌ</span>: <span class=\"ar\">رَأْسٌ ← رُؤُوسٌ · نَفْسٌ ← نُفُوسٌ · عَهْدٌ ← عُهُودٌ · شَيْخٌ ← شُيُوخٌ</span><br>• <span class=\"ar\">أَفْعَالٌ / أَفْعِلَةٌ</span>: <span class=\"ar\">نَوْعٌ ← أَنْوَاعٌ · عَمُودٌ ← أَعْمِدَةٌ</span><br>• <span class=\"ar\">فِعَلٌ</span>: <span class=\"ar\">فِتْنَةٌ ← فِتَنٌ</span>" },
    { tr: "• <span class=\"ar\">فَعَالِيلُ / فَعَائِلُ / مَفَاعِلُ</span>: <span class=\"ar\">شَيْطَانٌ ← شَيَاطِينُ · رِسَالَةٌ ← رَسَائِلُ · مَرْتَبَةٌ ← مَرَاتِبُ · مَهَمَّةٌ ← مَهَامُّ</span><br>• <span class=\"ar\">فُعَلَاءُ / أَفْعِلَاءُ</span>: <span class=\"ar\">شَهِيدٌ ← شُهَدَاءُ · بَرِيءٌ ← أَبْرِيَاءُ</span><br>• <span class=\"ar\">فَعَلَةٌ</span>: <span class=\"ar\">عَاجِزٌ ← عَجَزَةٌ</span>" },
    { tr: "Bazı kelimeler <b>cem-i müennes sâlim</b> ile toplanır: <span class=\"ar\">رَايَةٌ ← رَايَاتٌ · غَايَةٌ ← غَايَاتٌ</span>. Bazılarının iki çoğulu vardır: <span class=\"ar\">نَفْسٌ ← نُفُوسٌ / أَنْفُسٌ · أَرْضٌ ← أَرَاضٍ / أَرَضُونَ · رِسَالَةٌ ← رَسَائِلُ / رِسَالَاتٌ</span>." },
    { tr: "Tekili bulmak için kelimeden ek ve zamirleri at, kökü bul: <span class=\"ar\">لِعُهُودِهِمْ ← عُهُودٌ ← عَهْدٌ · وَمَرَاتِبِهِ ← مَرَاتِبُ ← مَرْتَبَةٌ</span>." }
  ],
  kaide: ["هَاتِ جَمْعَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ: رَأْسُ، عَمُودُهُ، النَّفْسِ، الشَّيْطَانِ، رَايَةِ، أَرْضِ، الفِتْنَةِ، الرِّسَالَةِ.", "هَاتِ مُفْرَدَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ: أَنْوَاعَهُ، مَرَاتِبَهُ، لِعُهُودِهِمْ، المَهَامِّ، الشُّهَدَاءِ، الأَبْرِيَاءِ، الشُّيُوخِ، العَجَزَةِ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "هَاتِ جَمْعَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ فِي الجُمَلِ الآتِيَةِ", tr: "Koyu kelimenin çoğulunu seç.", items: PL([
      [HL("«رَأْسُ الأَمْرِ الإِسْلَامُ»", "رَأْسُ") + " ← ___", "رُؤُوسٌ", "رُؤَسَاءُ", "رَأْسَاتٌ", "baş → başlar", "رُؤَسَاءُ, رَئِيسٌ’in çoğuludur (başkanlar)."],
      [HL("«وَعَمُودُهُ الصَّلَاةُ»", "وَعَمُودُهُ") + " ← ___", "أَعْمِدَةٌ / عُمُدٌ", "عَمَائِدُ", "عُمُودَاتٌ", "direk → direkler", "İki çoğul da kullanılır."],
      [HL("وَيُطْلَقُ أَيْضًا عَلَى مُجَاهَدَةِ النَّفْسِ", "النَّفْسِ") + " ← ___", "النُّفُوسُ / الأَنْفُسُ", "النَّفَائِسُ", "النَّفْسَاتُ", "nefis → nefisler", "نَفَائِسُ, نَفِيسٌ’in çoğuludur (değerli şeyler)."],
      [HL("وَالشَّيْطَانِ وَالفُسَّاقِ", "وَالشَّيْطَانِ") + " ← ___", "الشَّيَاطِينُ", "الشَّيْطَانَاتُ", "الشُّطَّانُ", "şeytan → şeytanlar", "فَعَالِينُ kalıbı."],
      [HL("وَرَفْعُ رَايَةِ الحَقِّ", "رَايَةِ") + " ← ___", "رَايَاتٌ", "رُيُوتٌ", "أَرْيَاءُ", "sancak → sancaklar", "Cem-i müennes sâlim."],
      [HL("أَنْ يُهَاجِرُوا مِنْ أَرْضِ الشِّرْكِ", "أَرْضِ") + " ← ___", "أَرَاضٍ (الأَرَاضِي)", "أُرُوضٌ", "أَرْضَاتٌ", "toprak → topraklar", "Yaygın çoğul أَرَاضٍ’dir; أَرَضُونَ da kullanılır."],
      [HL("الَّذِي يُؤَدِّي إِلَى الفِتْنَةِ فِي الدِّينِ", "الفِتْنَةِ") + " ← ___", "الفِتَنُ", "الفُتُونُ", "الأَفْتَانُ", "fitne → fitneler", "فِعَلٌ kalıbı."],
      [HL("وَتَحْقِيقُ عَالَمِيَّةِ الرِّسَالَةِ", "الرِّسَالَةِ") + " ← ___", "الرَّسَائِلُ / الرِّسَالَاتُ", "الرُّسُلُ", "المُرْسَلُونَ", "risale → risaleler", "الرُّسُلُ, رَسُولٌ’ün çoğuludur."]
    ])},
    { type: "pick", fill: true, num: "٤", ar: "هَاتِ مُفْرَدَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ فِي الجُمَلِ الآتِيَةِ", tr: "Koyu kelimenin tekilini seç.", items: PL([
      [HL("أَخَذَ يَذْكُرُ أَنْوَاعَهُ وَمَرَاتِبَهُ.", "أَنْوَاعَهُ") + " ← ___", "نَوْعٌ", "نَائِعٌ", "نَوْعَةٌ", "türler → tür", "أَفْعَالٌ ← فَعْلٌ."],
      [HL("أَخَذَ يَذْكُرُ أَنْوَاعَهُ وَمَرَاتِبَهُ.", "وَمَرَاتِبَهُ") + " ← ___", "مَرْتَبَةٌ", "رُتْبَةٌ", "مُرَتَّبٌ", "mertebeler → mertebe", "مَفَاعِلُ ← مَفْعَلَةٌ. (رُتْبَةٌ’nin çoğulu: رُتَبٌ.)"],
      [HL("نَقْضُ المُشْرِكِينَ لِعُهُودِهِمُ الَّتِي قَطَعُوهَا", "لِعُهُودِهِمُ") + " ← ___", "عَهْدٌ", "عَاهِدٌ", "مَعْهَدٌ", "ahitler → ahit", "مَعْهَدٌ: enstitü."],
      [HL("وَبِسَبَبِ هَذِهِ المَهَامِّ الجَلِيلَةِ", "المَهَامِّ") + " ← ___", "مَهَمَّةٌ (مُهِمَّةٌ)", "هَمٌّ", "مُهْتَمٌّ", "görevler → görev", "هَمٌّ’ın çoğulu: هُمُومٌ."],
      [HL("مِنَ المُجَاهِدِينَ وَالشُّهَدَاءِ", "وَالشُّهَدَاءِ") + " ← ___", "شَهِيدٌ", "شَاهِدٌ", "مَشْهَدٌ", "şehitler → şehit", "شَاهِدٌ’ın çoğulu: شُهُودٌ."],
      [HL("بِقَتْلِ الأَبْرِيَاءِ مِنَ المَدَنِيِّينَ", "الأَبْرِيَاءِ") + " ← ___", "بَرِيءٌ", "بَرٌّ", "بَارِئٌ", "masumlar → masum", "بَرٌّ’ın çoğulu: أَبْرَارٌ."],
      [HL("مِنَ المَدَنِيِّينَ وَالنِّسَاءِ وَالأَطْفَالِ وَالشُّيُوخِ", "وَالشُّيُوخِ") + " ← ___", "شَيْخٌ", "شَائِخٌ", "مَشْيَخَةٌ", "ihtiyarlar → ihtiyar", "فُعُولٌ ← فَعْلٌ."],
      [HL("وَالأَطْفَالِ وَالشُّيُوخِ وَالعَجَزَةِ", "وَالعَجَزَةِ") + " ← ___", "عَاجِزٌ", "عَجُوزٌ", "مُعْجِزَةٌ", "âcizler → âciz", "فَعَلَةٌ ← فَاعِلٌ. (عَجُوزٌ’un çoğulu: عَجَائِزُ.)"]
    ])},
    { type: "classify", extra: true, opts: TC, ar: "مُفْرَدٌ أَمْ جَمْعٌ؟", tr: "Metindeki kelime tekil mi, çoğul mu?", items: CL([
      ["المُسْتَضْعَفِينَ", "c", "Cem-i müzekker sâlim."],
      ["الوِلْدَانِ", "c", "Tekili: وَلِيدٌ (çocuk). İkil gibi görünür ama çoğuldur."],
      ["رَايَةٌ", "t", "Çoğulu: رَايَاتٌ."],
      ["أَيْمَانَهُمْ", "c", "Tekili: يَمِينٌ (yemin)."],
      ["الدُّوَلِ", "c", "Tekili: دَوْلَةٌ."],
      ["غَايَةٌ", "t", "Çoğulu: غَايَاتٌ."],
      ["الكُفَّارِ", "c", "Tekili: كَافِرٌ."],
      ["الفُسَّاقِ", "c", "Tekili: فَاسِقٌ."],
      ["عَهْدٌ", "t", "Çoğulu: عُهُودٌ."],
      ["آدَابٌ", "c", "Tekili: أَدَبٌ."],
      ["تِجَارَةٌ", "t", "Kazanç, ticaret."],
      ["دِيَارِهِمْ", "c", "Tekili: دَارٌ."],
      ["أَمْوَالِكُمْ", "c", "Tekili: مَالٌ."],
      ["المَشَقَّةُ", "t", "Çoğulu: مَشَاقُّ."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · ÜSLUP
{
  id: "u5", no: 5, ar: "لُغَةُ النَّصِّ: الأَسَالِيبُ وَالتَّرَاكِيبُ", tr: "Metnin Dili: Harf-i Cer, Üslup, Vezin", short: "Üslup", col: "muz", legend: [],
  goals: ["Fiilleri metindeki harf-i cerleriyle birlikte kullanmak", "“Değil, aksine” (leyse… velâkinne) ve “bundan başka” (hâzâ, ve li…) üsluplarıyla cümle kurmak", "Kökten uygun vezni (masdar) türetmek", "Kelimeleri uygun tamlamalarda eşleştirmek"],
  examples: [
    { s: "يَهْدِفُ:mz.Fiil / إِلَى:nasb.Harf-i cer / تَحْقِيقِهَا:-", tr: "Onu gerçekleştirmeyi hedefler.", pair: "يَرْتَبِطُ:mz.Fiil / بِـ:nasb.Harf-i cer / هَذَا:-", pairTr: "Buna bağlıdır." },
    { s: "لَيْسَ:cerr.Olumsuzlama / لِلِاعْتِدَاءِ،:- / وَلَكِنَّهُ:nasb.Düzeltme / تَشْرِيعٌ لَهُ أَسْبَابٌ وَغَايَاتٌ:-", tr: "Saldırı için değildir; aksine sebepleri ve gayeleri olan bir hükümdür." }
  ],
  rules: [
    { tr: "Bazı fiiller belli bir harf-i cerle kullanılır ve anlamı onunla tamamlanır:<br>• <span class=\"ar\">دَلَّ عَلَى</span> (göstermek) · <span class=\"ar\">هَدَفَ إِلَى</span> (hedeflemek) · <span class=\"ar\">أَشَارَ إِلَى</span> (işaret etmek)<br>• <span class=\"ar\">تَعَرَّضَ لِـ</span> (maruz kalmak) · <span class=\"ar\">أَذِنَ لِـ</span> (izin vermek)<br>• <span class=\"ar\">ارْتَبَطَ بِـ</span> (bağlı olmak) · <span class=\"ar\">قَامَ بِـ</span> (yerine getirmek)" },
    { tr: "<b>Değil, aksine</b> kalıbı (<span class=\"ar\">لَيْسَ ... وَلَكِنَّ</span>): bir şeyi olumsuzlayıp doğrusunu söyler (“… değildir, aksine …”): <span class=\"ar\">لَيْسَ الغِنَى عَنْ كَثْرَةِ المَالِ، وَلَكِنَّ الغِنَى غِنَى النَّفْسِ</span>." },
    { tr: "<b>Bundan başka</b> kalıbı (<span class=\"ar\">هَذَا، وَلِـ</span>): önceki konuyu bitirip yeni bir noktaya geçer (“Bundan başka … vardır”): <span class=\"ar\">هَذَا، وَلِلصَّلَاةِ آدَابٌ كَثِيرَةٌ</span>." },
    { tr: "<b>Vezin:</b> Kökten bağlama uygun masdarı türet:<br>• <span class=\"ar\">ع ل و</span> kökünden <span class=\"ar\">إِعْلَاءٌ</span> (if’âl kalıbı)<br>• <span class=\"ar\">ش ر ع</span> kökünden <span class=\"ar\">تَشْرِيعٌ</span> (tef’îl kalıbı)<br>• <span class=\"ar\">د ف ع</span> kökünden <span class=\"ar\">دِفَاعٌ</span> (fi’âl kalıbı)" }
  ],
  kaide: ["صِلِ الكَلِمَاتِ التَّالِيَةَ بِحُرُوفِ الجَرِّ المُنَاسِبَةِ لَهَا، ثُمَّ ضَعْهَا فِي جُمَلٍ مِنْ عِنْدِكَ: دَلَّ، هَدَفَ، أَشَارَ، تَعَرَّضَ، أَذِنَ، ارْتَبَطَ، قَامَ.", "لَاحِظِ الأَسَالِيبَ اللُّغَوِيَّةَ التَّالِيَةَ، ثُمَّ حَاوِلْ أَنْ تَكْتُبَ جُمَلًا عَلَى غِرَارِهَا. ضَعْ فِي الفَرَاغِ الوَزْنَ الصَّحِيحَ مِنَ الجُذُورِ. صِلْ بَيْنَ كَلِمَاتِ القَائِمَةِ (أ) بِمَا يُنَاسِبُهَا مِنْ كَلِمَاتِ القَائِمَةِ (ب)."],
  ex: [
    { type: "pick", num: "٥", ar: "صِلِ الكَلِمَاتِ التَّالِيَةَ بِحُرُوفِ الجَرِّ المُنَاسِبَةِ لَهَا", tr: "Boşluğa fiilin metinde kullanıldığı harf-i cerri seç.", items: PL([
      ["كَمَا تَدُلُّ ___ ذَلِكَ الآيَاتُ وَالأَحَادِيثُ.", "عَلَى", "مِنْ", "عَنْ", "Âyet ve hadislerin gösterdiği gibi.", "دَلَّ عَلَى: göstermek."],
      ["يَهْدِفُ الإِسْلَامُ ___ تَحْقِيقِهَا.", "إِلَى", "عَلَى", "عَنْ", "İslâm onları gerçekleştirmeyi hedefler.", "هَدَفَ إِلَى."],
      ["مَا نُشِيرُ ___ بِإِيجَازٍ.", "إِلَيْهِ", "عَلَيْهِ", "مِنْهُ", "Kısaca değindiğimiz şey.", "أَشَارَ إِلَى."],
      ["الأَذَى الَّذِي تَعَرَّضُوا ___ فِي مَكَّةَ.", "لَهُ", "بِهِ", "عَنْهُ", "Mekke’de maruz kaldıkları eziyet.", "تَعَرَّضَ لِـ: maruz kalmak."],
      ["وَقَدْ أَذِنَ اللهُ ___ فِي مُقَاتَلَةِ المُشْرِكِينَ.", "لَهُمْ", "عَنْهُمْ", "مِنْهُمْ", "Allah onlara savaşma izni verdi.", "أَذِنَ لِـ فُلَانٍ فِي كَذَا."],
      ["السَّبَبُ الَّذِي يَرْتَبِطُ ___ نَقْضُ العُهُودِ.", "بِهِ", "عَنْهُ", "مِنْهُ", "Ahitlerin bozulmasının bağlı olduğu sebep.", "ارْتَبَطَ بِـ."],
      ["المَهَامُّ الَّتِي يَقُومُ ___ الجِهَادُ.", "بِهَا", "عَنْهَا", "مِنْهَا", "Cihadın yerine getirdiği görevler.", "قَامَ بِـ: yerine getirmek; قَامَ عَنْ: kalkmak."]
    ])},
    { type: "pick", num: "٦", ar: "لَاحِظِ الأَسَالِيبَ اللُّغَوِيَّةَ التَّالِيَةَ، ثُمَّ حَاوِلْ أَنْ تَكْتُبَ جُمَلًا عَلَى غِرَارِهَا", tr: "Üsluba uygun cümleyi seç.", items: PL([
      ["Model: «إِنَّ تَشْرِيعَ الجِهَادِ لَيْسَ لِلِاعْتِدَاءِ، وَلَكِنَّهُ تَشْرِيعٌ لَهُ غَايَاتٌ». Aynı üslupta cümle hangisi?", "لَيْسَ العِلْمُ لِلتَّفَاخُرِ، وَلَكِنَّهُ لِلْعَمَلِ وَالنَّفْعِ.", "العِلْمُ لِلتَّفَاخُرِ وَلِلْعَمَلِ.", "لَا تَتَفَاخَرْ بِالعِلْمِ وَاعْمَلْ.", "İlim övünmek için değildir; aksine amel ve fayda içindir.", "لَيْسَ ile olumsuzla, وَلَكِنَّ ile doğrusunu söyle."],
      ["Boşluğu doldur: لَيْسَ الصِّيَامُ تَرْكَ الطَّعَامِ فَقَطْ، ___ تَرْكُ المَعَاصِي أَيْضًا.", "وَلَكِنَّهُ", "لِأَنَّهُ", "فَإِنَّهُ", "Oruç yalnız yemeyi bırakmak değildir; aksine günahları da bırakmaktır.", "Düzeltme anlamı: وَلَكِنَّ."],
      ["Boşluğu doldur: ___ الإِسْلَامُ دِينَ عُنْفٍ، وَلَكِنَّهُ دِينُ رَحْمَةٍ.", "لَيْسَ", "إِنَّ", "كَانَ", "İslâm şiddet dini değildir; aksine rahmet dinidir.", "لَيْسَ haberini nasbeder: دِينَ."],
      ["Model: «هَذَا، وَلِلْجِهَادِ فِي الإِسْلَامِ آدَابٌ سَامِيَةٌ». Aynı üslupta cümle hangisi?", "هَذَا، وَلِلصَّلَاةِ فِي الإِسْلَامِ آدَابٌ كَثِيرَةٌ، مِنْهَا: الخُشُوعُ.", "هَذِهِ الصَّلَاةُ لَهَا آدَابٌ.", "صَلَّيْتُ هَذَا اليَوْمَ.", "Bundan başka İslâm’da namazın birçok âdâbı vardır; huşu bunlardandır.", "هَذَا، وَ… yeni bir noktaya geçiş."],
      ["Boşluğu doldur: ___، وَلِطَالِبِ العِلْمِ آدَابٌ يَنْبَغِي الالْتِزَامُ بِهَا.", "هَذَا", "هَذِهِ", "هُنَا", "Bundan başka ilim talebesinin uyması gereken âdâbı vardır.", "Geçiş kalıbı her zaman هَذَا ile kurulur."]
    ])},
    { type: "pick", fill: true, num: "٧", ar: "ضَعْ فِي الفَرَاغِ الوَزْنَ الصَّحِيحَ مِنَ الجُذُورِ بِمَا يَتَنَاسَبُ مَعَ السِّيَاقِ اللُّغَوِيِّ", tr: "Parantezdeki kökten bağlama uygun masdarı seç.", items: PL([
      ["وَالجِهَادُ الحَقِيقِيُّ هُوَ الجِهَادُ الَّذِي يُقْصَدُ بِهِ وَجْهُ اللهِ وَ___ كَلِمَتِهِ. (ع ل و)", "إِعْلَاءُ", "عُلُوُّ", "تَعَالِي", "…ve O’nun sözünün yüceltilmesi.", "إِفْعَالٌ: yüceltme (müteaddî)."],
      ["إِنَّ ___ الجِهَادِ فِي الإِسْلَامِ لَيْسَ لِلِاعْتِدَاءِ. (ش ر ع)", "تَشْرِيعَ", "شَرْعَ", "شُرُوعَ", "Cihadın meşru kılınması saldırı için değildir.", "تَفْعِيلٌ; إِنَّ’nin ismi olduğu için mansûb."],
      ["وَبِسَبَبِ هَذِهِ المَهَامِّ الَّتِي يَقُومُ بِهَا الجِهَادُ فِي ___ عَنِ الإِسْلَامِ. (د ف ع)", "الدِّفَاعِ", "الدَّفْعِ", "التَّدَافُعِ", "İslâm’ı savunmada.", "فِعَالٌ (مُفَاعَلَةٌ’nin masdarı): savunma."]
    ])},
    { type: "bank", num: "٨", ar: "صِلْ بَيْنَ كَلِمَاتِ القَائِمَةِ (أ) بِمَا يُنَاسِبُهَا مِنْ كَلِمَاتِ القَائِمَةِ (ب)", tr: "Önce aşağıdan (b) listesinden kelimeyi seç, sonra (a) listesindeki uygun kelimenin kutusuna dokun.", bank: ["الأَبْرِيَاءِ", "سَنَامٍ", "العَهْدِ", "الدُّنْيَا", "الحَقِّ", "الجُهْدِ"], items: [
      { pre: "رَايَةُ", a: [4], tr: "hakkın sancağı" },
      { pre: "نَقْضُ", a: [2], tr: "ahdi bozmak" },
      { pre: "ذِرْوَةُ", a: [1], tr: "hörgücün zirvesi" },
      { pre: "قَتْلُ", a: [0], tr: "masumları öldürmek" },
      { pre: "حُظُوظُ", a: [3], tr: "dünya nasipleri" },
      { pre: "بَذْلُ", a: [5], tr: "güç harcamak" }
    ]}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["وَرَدَ ذِكْرُ {الجِهَادِ} كَثِيرًا فِي الكِتَابِ وَالسُّنَّةِ.", ["الجِهَادِ", "الصِّيَامِ", "السَّفَرِ"], "metinden", "Cihad Kitap’ta ve Sünnet’te çok geçer.", "u1"],
  ["رَأْسُ الأَمْرِ الإِسْلَامُ، وَعَمُودُهُ {الصَّلَاةُ}.", ["الصَّلَاةُ", "الجِهَادُ", "الزَّكَاةُ"], "hadis", "İşin başı İslâm, direği namazdır.", "u1"],
  ["وَذِرْوَةُ {سَنَامِهِ} الجِهَادُ.", ["سَنَامِهِ", "رَأْسِهِ", "عَمُودِهِ"], "hadis", "Hörgücünün zirvesi cihaddır.", "u1"],
  ["الجِهَادُ لُغَةً: {المَشَقَّةُ}.", ["المَشَقَّةُ", "القِتَالُ", "الرَّاحَةُ"], "tanım", "Cihad sözlükte meşakkattir.", "u1"],
  ["وَاصْطِلَاحًا: بَذْلُ الجُهْدِ فِي قِتَالِ {الكُفَّارِ}.", ["الكُفَّارِ", "النَّاسِ", "الأَبْرِيَاءِ"], "tanım", "Terimde kâfirlerle savaşta güç harcamak.", "u1"],
  ["وَيُطْلَقُ أَيْضًا عَلَى مُجَاهَدَةِ {النَّفْسِ} وَالشَّيْطَانِ.", ["النَّفْسِ", "الأَطْفَالِ", "المَالِ"], "tanım", "Nefse ve şeytana karşı mücadeleye de denir.", "u1"],
  ["إِنَّ تَشْرِيعَ الجِهَادِ لَيْسَ {لِلِاعْتِدَاءِ} عَلَى الآخَرِينَ.", ["لِلِاعْتِدَاءِ", "لِلدِّفَاعِ", "لِلْعَدْلِ"], "gaye", "Cihadın meşru kılınması saldırı için değildir.", "u2"],
  ["وَكَانَ دَفْعُ {الظُّلْمِ} أَوَّلَ جِهَادٍ لِلْمُسْلِمِينَ.", ["الظُّلْمِ", "العَدْلِ", "الجَهْلِ"], "1. gaye", "Zulmü defetmek ilk cihaddı.", "u2"],
  ["أَخْرَجُوهُمْ إِلَى الحَبَشَةِ أَوَّلًا، ثُمَّ إِلَى {يَثْرِبَ} ثَانِيًا.", ["يَثْرِبَ", "مَكَّةَ", "الشَّامِ"], "1. gaye", "Önce Habeşistan’a, sonra Yesrib’e.", "u2"],
  ["الفِتْنَةُ فِي الدِّينِ {أَشَدُّ} مِنَ القَتْلِ.", ["أَشَدُّ", "أَخَفُّ", "أَقَلُّ"], "2. gaye", "Dinde fitne öldürmekten daha ağırdır.", "u2"],
  ["﴿وَلَا {تَعْتَدُوا} إِنَّ اللهَ لَا يُحِبُّ المُعْتَدِينَ﴾", ["تَعْتَدُوا", "تُقَاتِلُوا", "تَنْصُرُوا"], "3. gaye", "Aşırı gitmeyin; Allah aşırı gidenleri sevmez.", "u2"],
  ["﴿فَمَا اسْتَقَامُوا لَكُمْ {فَاسْتَقِيمُوا} لَهُمْ﴾", ["فَاسْتَقِيمُوا", "فَقَاتِلُوهُمْ", "فَاتْرُكُوهُمْ"], "3. gaye", "Size dürüst davrandıkça siz de dürüst davranın.", "u2"],
  ["بَذْلُ الجُهْدِ لِإِبْلَاغِ كَلِمَةِ اللهِ إِلَى {النَّاسِ}.", ["النَّاسِ", "المُسْلِمِينَ", "الأَغْنِيَاءِ"], "4. gaye", "Allah’ın sözünü insanlara ulaştırmak.", "u2"],
  ["الحَقُّ ضِدُّ {البَاطِلِ}.", ["البَاطِلِ", "العَدْلِ", "الصِّدْقِ"], "zıt", "Hak batılın zıddıdır.", "u3"],
  ["الظُّلْمُ ضِدُّ {العَدْلِ}.", ["العَدْلِ", "البَغْيِ", "الأَذَى"], "zıt", "Zulüm adaletin zıddıdır.", "u3"],
  ["الدُّنْيَا ضِدُّ {الآخِرَةِ}.", ["الآخِرَةِ", "الأَرْضِ", "الحَيَاةِ"], "zıt", "Dünya âhiretin zıddıdır.", "u3"],
  ["ذِرْوَةٌ تَعْنِي {قِمَّةً}.", ["قِمَّةً", "قَاعِدَةً", "وَسَطًا"], "eş anlam", "Zirve doruk demektir.", "u3"],
  ["البَاغِيَةُ تَعْنِي {الظَّالِمَةَ}.", ["الظَّالِمَةَ", "العَادِلَةَ", "الضَّعِيفَةَ"], "eş anlam", "Azgın zalim demektir.", "u3"],
  ["جَمْعُ رَأْسٍ: {رُؤُوسٌ}.", ["رُؤُوسٌ", "رُؤَسَاءُ", "رَأْسَاتٌ"], "çoğul", "Baş → başlar.", "u4"],
  ["جَمْعُ فِتْنَةٍ: {فِتَنٌ}.", ["فِتَنٌ", "فُتُونٌ", "أَفْتَانٌ"], "çoğul", "Fitne → fitneler.", "u4"],
  ["مُفْرَدُ الشُّهَدَاءِ: {شَهِيدٌ}.", ["شَهِيدٌ", "شَاهِدٌ", "مَشْهَدٌ"], "tekil", "Şehitler → şehit.", "u4"],
  ["مُفْرَدُ العَجَزَةِ: {عَاجِزٌ}.", ["عَاجِزٌ", "عَجُوزٌ", "مُعْجِزَةٌ"], "tekil", "Âcizler → âciz.", "u4"],
  ["يَهْدِفُ الإِسْلَامُ {إِلَى} تَحْقِيقِ غَايَاتِهِ.", ["إِلَى", "عَلَى", "عَنْ"], "harf-i cer", "İslâm gayelerini gerçekleştirmeyi hedefler.", "u5"],
  ["{لَيْسَ} الجِهَادُ لِلِاعْتِدَاءِ، وَلَكِنَّهُ لِدَفْعِ الظُّلْمِ.", ["لَيْسَ", "إِنَّ", "لَعَلَّ"], "üslup", "Cihad saldırı için değil, zulmü defetmek içindir.", "u5"],
  ["يُقْصَدُ بِهِ وَجْهُ اللهِ وَ{إِعْلَاءُ} كَلِمَتِهِ.", ["إِعْلَاءُ", "عُلُوُّ", "تَعَالِي"], "vezin", "O’nun sözünün yüceltilmesi.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["الجِهَادُ بَذْلُ الجُهْدِ فِي مُحَارَبَةِ النَّاسِ ← metne göre düzelt", "الجِهَادُ بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ", "الجِهَادُ بَذْلُ الجُهْدِ فِي جَمْعِ المَالِ", "الجِهَادُ تَرْكُ الجُهْدِ فِي قِتَالِ الكُفَّارِ", "İbn Hacer’in tanımı.", "u1"],
  ["هَاجَرُوا إِلَى يَثْرِبَ أَوَّلًا ← metne göre düzelt", "هَاجَرُوا إِلَى الحَبَشَةِ أَوَّلًا", "هَاجَرُوا إِلَى مَكَّةَ أَوَّلًا", "هَاجَرُوا إِلَى الشَّامِ أَوَّلًا", "Önce Habeşistan, sonra Yesrib.", "u1"],
  ["الفِتْنَةُ أَخَفُّ مِنَ القَتْلِ ← metne göre düzelt", "الفِتْنَةُ أَشَدُّ مِنَ القَتْلِ", "الفِتْنَةُ مِثْلُ القَتْلِ", "الفِتْنَةُ لَيْسَتْ ذَنْبًا", "Bakara 191’deki ifade.", "u2"],
  ["شُرِعَ الجِهَادُ لِلِاعْتِدَاءِ ← metne göre düzelt", "شُرِعَ الجِهَادُ لِدَفْعِ الظُّلْمِ", "شُرِعَ الجِهَادُ لِجَمْعِ الغَنَائِمِ", "شُرِعَ الجِهَادُ لِقَتْلِ الأَبْرِيَاءِ", "لَيْسَ لِلِاعْتِدَاءِ عَلَى الآخَرِينَ.", "u2"],
  ["يَجُوزُ قَتْلُ الشُّيُوخِ فِي الحَرْبِ ← metne göre düzelt", "لَا يَجُوزُ قَتْلُ الشُّيُوخِ فِي الحَرْبِ", "يَجِبُ قَتْلُ الشُّيُوخِ فِي الحَرْبِ", "يُسْتَحَبُّ قَتْلُ الشُّيُوخِ فِي الحَرْبِ", "Cihadın âdâbı.", "u2"],
  ["الحَقُّ ← zıt anlam", "البَاطِلُ", "العَدْلُ", "الصِّدْقُ", "Hak ≠ batıl.", "u3"],
  ["وَفَوْا ← zıt anlam", "نَكَثُوا", "اسْتَقَامُوا", "صَدَقُوا", "Vefa ≠ bozma.", "u3"],
  ["ذِرْوَةٌ ← eş anlam", "قِمَّةٌ", "قَاعِدَةٌ", "أَسَاسٌ", "Zirve = doruk.", "u3"],
  ["سَامِيَةٌ ← eş anlam", "رَفِيعَةٌ", "دَنِيئَةٌ", "قَدِيمَةٌ", "Yüce = yüksek.", "u3"],
  ["الشَّيْطَانُ ← çoğul", "الشَّيَاطِينُ", "الشَّيْطَانَاتُ", "الشُّطَّانُ", "فَعَالِينُ.", "u4"],
  ["الأَبْرِيَاءُ ← tekil", "بَرِيءٌ", "بَرٌّ", "بَارِئٌ", "أَفْعِلَاءُ ← فَعِيلٌ.", "u4"],
  ["المَهَامُّ ← tekil", "مَهَمَّةٌ", "هَمٌّ", "مُهْتَمٌّ", "مَفَاعِلُ ← مَفْعَلَةٌ.", "u4"],
  ["تَعَرَّضَ … الظُّلْمِ ← harf-i cer ekle", "تَعَرَّضَ لِلظُّلْمِ", "تَعَرَّضَ عَنِ الظُّلْمِ", "تَعَرَّضَ مِنَ الظُّلْمِ", "تَعَرَّضَ لِـ: maruz kalmak.", "u5"],
  ["الجِهَادُ لِلِاعْتِدَاءِ. الجِهَادُ لِدَفْعِ الظُّلْمِ. ← لَيْسَ… وَلَكِنَّ ile birleştir", "لَيْسَ الجِهَادُ لِلِاعْتِدَاءِ، وَلَكِنَّهُ لِدَفْعِ الظُّلْمِ", "لَيْسَ الجِهَادُ لِلِاعْتِدَاءِ، لِأَنَّهُ لِدَفْعِ الظُّلْمِ", "الجِهَادُ لِلِاعْتِدَاءِ وَلِدَفْعِ الظُّلْمِ", "Olumsuzla ve düzelt.", "u5"]
];
// Zıt mı eş mi hız oyunu
var NOUN_LIST = UNITS[2].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = ZE;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt anlamı", pairs: [["قِتَالٌ", "صُلْحٌ"], ["الحَقُّ", "البَاطِلُ"], ["الدُّنْيَا", "الآخِرَةُ"], ["الظُّلْمُ", "العَدْلُ"], ["رَفْعٌ", "خَفْضٌ"], ["وَثِيقٌ", "ضَعِيفٌ"], ["وَفَوْا", "نَكَثُوا"], ["اسْتَقَامُوا", "انْحَرَفُوا"]] },
  es: { name: "Kelime ↔ eş anlamı", pairs: [["وَرَدَ", "جَاءَ"], ["ذِرْوَةٌ", "قِمَّةٌ"], ["قِتَالٌ", "مُحَارَبَةٌ"], ["يُقْصَدُ", "يُرَادُ بِهِ"], ["إِعْلَاءٌ", "رَفْعٌ"], ["سَامِيَةٌ", "رَفِيعَةٌ"], ["البَاغِيَةُ", "الظَّالِمَةُ"], ["الشُّيُوخُ", "كِبَارُ السِّنِّ"]] },
  co: { name: "Tekil ↔ çoğul", pairs: [["رَأْسٌ", "رُؤُوسٌ"], ["شَيْطَانٌ", "شَيَاطِينُ"], ["رَايَةٌ", "رَايَاتٌ"], ["فِتْنَةٌ", "فِتَنٌ"], ["عَهْدٌ", "عُهُودٌ"], ["شَهِيدٌ", "شُهَدَاءُ"], ["بَرِيءٌ", "أَبْرِيَاءُ"], ["عَاجِزٌ", "عَجَزَةٌ"]] }
};
var KARTLAR = [
  ["Cihadın sözlük anlamı?", "المَشَقَّةُ — meşakkat, zorluk."],
  ["Cihadın terim anlamı?", "بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ — kâfirlerle savaşta güç harcamak."],
  ["Cihad başka neye de denir?", "مُجَاهَدَةُ النَّفْسِ وَالشَّيْطَانِ وَالفُسَّاقِ — nefis, şeytan ve fâsıklarla mücadele."],
  ["Gerçek cihad hangisidir?", "Allah’ın rızası ve sözünün yüceltilmesi için yapılan; dünya menfaati için olan cihad değildir."],
  ["Hadise göre cihadın yeri?", "ذِرْوَةُ سَنَامِ الإِسْلَامِ — İslâm’ın hörgücünün zirvesi (Tirmizî)."],
  ["1. gaye ve delili?", "دَفْعُ الظُّلْمِ — Hac 39-40: أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا"],
  ["2. gaye ve delili?", "الدِّفَاعُ عَنِ المُسْتَضْعَفِينَ — Nisâ 75; fitneye karşı Bakara 193."],
  ["3. gaye ve delili?", "قِتَالُ المُعْتَدِينَ وَنَاقِضِي العَهْدِ — Bakara 190, Tevbe 12; vefaya vefa: Tevbe 7."],
  ["4. gaye ve delili?", "إِبْلَاغُ كَلِمَةِ اللهِ — Tevbe 33: لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ"],
  ["Cihadın âdâbı?", "Savaşmayanlara, kadın, çocuk, yaşlı ve âcizlere, ibadet yerlerine saldırmak caiz değildir."],
  ["Enfâl 60’ta gücün amacı?", "تُرْهِبُونَ بِهِ عَدُوَّ اللهِ وَعَدُوَّكُمْ — düşmanı caydırmak."],
  ["Üslup kalıpları?", "لَيْسَ… وَلَكِنَّ… (değil, aksine) · هَذَا، وَلِـ… (bundan başka)"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat23";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("جِهَادٌ", "i", "cihad, çaba", "", "", "", "", "وَرَدَ ذِكْرُ الجِهَادِ كَثِيرًا فِي الكِتَابِ وَالسُّنَّةِ.", "الجِهَادِ", "Cihad Kitap’ta ve Sünnet’te çokça anılmıştır."),
  KW("وَرَدَ", "f", "geçti, yer aldı", "", "", "جَاءَ", "", "وَرَدَ ذِكْرُ الجِهَادِ كَثِيرًا فِي الكِتَابِ وَالسُّنَّةِ.", "وَرَدَ", "Cihad Kitap’ta ve Sünnet’te çokça geçmiştir."),
  KW("تِجَارَةٌ", "i", "ticaret, alışveriş", "تِجَارَاتٌ", "at", "", "", "هَلْ أَدُلُّكُمْ عَلَى تِجَارَةٍ تُنْجِيكُمْ مِنْ عَذَابٍ أَلِيمٍ.", "تِجَارَةٍ", "Sizi acıklı azaptan kurtaracak bir ticaret göstereyim mi?"),
  KW("أَنْجَى", "f", "kurtardı", "", "", "خَلَّصَ", "أَهْلَكَ", "هَلْ أَدُلُّكُمْ عَلَى تِجَارَةٍ تُنْجِيكُمْ مِنْ عَذَابٍ أَلِيمٍ.", "تُنْجِيكُمْ", "Sizi acıklı azaptan kurtaracak bir ticaret."),
  KW("أَلِيمٌ", "s", "acıklı, elem verici", "", "", "مُؤْلِمٌ", "", "تُنْجِيكُمْ مِنْ عَذَابٍ أَلِيمٍ.", "أَلِيمٍ", "Sizi acıklı bir azaptan kurtarır."),
  KW("نَفْسٌ", "i", "nefis, can", "أَنْفُسٌ", "efal", "", "", "وَتُجَاهِدُونَ فِي سَبِيلِ اللهِ بِأَمْوَالِكُمْ وَأَنْفُسِكُمْ.", "وَأَنْفُسِكُمْ", "Allah yolunda mallarınızla ve canlarınızla cihad edersiniz."),
  KW("ذِرْوَةٌ", "i", "zirve, doruk", "ذُرًى", "diger", "قِمَّةٌ", "", "وَذِرْوَةُ سَنَامِهِ الجِهَادُ.", "وَذِرْوَةُ", "Onun hörgücünün zirvesi cihaddır."),
  KW("عَمُودٌ", "i", "direk, sütun", "أَعْمِدَةٌ", "efile", "", "", "رَأْسُ الأَمْرِ الإِسْلَامُ، وَعَمُودُهُ الصَّلَاةُ.", "وَعَمُودُهُ", "İşin başı İslam, direği namazdır."),
  KW("غَايَةٌ", "i", "amaç, gaye", "غَايَاتٌ", "at", "هَدَفٌ", "", "فَمَا هُوَ الجِهَادُ، وَمَا غَايَاتُهُ؟", "غَايَاتُهُ", "Cihad nedir, amaçları nelerdir?"),
  KW("مَشَقَّةٌ", "i", "zorluk, meşakkat", "مَشَاقُّ", "diger", "صُعُوبَةٌ", "سُهُولَةٌ", "الجِهَادُ لُغَةً: المَشَقَّةُ.", "المَشَقَّةُ", "Cihad sözlükte meşakkat demektir."),
  KW("بَذَلَ", "f", "harcadı, ortaya koydu", "", "", "", "بَخِلَ", "بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ.", "بَذْلُ", "Kâfirlerle savaşta gayret sarf etmek."),
  KW("قِتَالٌ", "i", "savaş, çarpışma", "", "", "مُحَارَبَةٌ", "صُلْحٌ", "بَذْلُ الجُهْدِ فِي قِتَالِ الكُفَّارِ.", "قِتَالِ", "Kâfirlerle savaşta gayret sarf etmek."),
  KW("شَيْطَانٌ", "i", "şeytan", "شَيَاطِينُ", "diger", "", "", "عَلَى مُجَاهَدَةِ النَّفْسِ وَالشَّيْطَانِ وَالفُسَّاقِ.", "وَالشَّيْطَانِ", "Nefis, şeytan ve fasıklarla mücadele."),
  KW("فَاسِقٌ", "i", "fâsık, günahkâr", "فُسَّاقٌ", "fual2", "", "صَالِحٌ", "عَلَى مُجَاهَدَةِ النَّفْسِ وَالشَّيْطَانِ وَالفُسَّاقِ.", "وَالفُسَّاقِ", "Nefis, şeytan ve fasıklarla mücadele."),
  KW("إِعْلَاءٌ", "i", "yüceltme", "", "", "رَفْعٌ", "", "يُقْصَدُ بِهِ وَجْهُ اللهِ وَإِعْلَاءُ كَلِمَتِهِ.", "وَإِعْلَاءُ", "Onunla Allah’ın rızası ve kelimesinin yüceltilmesi kastedilir."),
  KW("رَايَةٌ", "i", "sancak, bayrak", "رَايَاتٌ", "at", "عَلَمٌ", "", "وَرَفْعُ رَايَةِ الحَقِّ.", "رَايَةِ", "Ve hakkın sancağını yükseltmek."),
  KW("حَظٌّ", "i", "pay, nasip", "حُظُوظٌ", "fuul", "نَصِيبٌ", "", "فَإِذَا أُرِيدَ بِهِ شَيْءٌ مِنْ حُظُوظِ الدُّنْيَا فَهُوَ لَيْسَ جِهَادًا.", "حُظُوظِ", "Onunla dünyalık paylar istenirse cihad olmaz."),
  KW("تَشْرِيعٌ", "i", "teşri, hükme bağlama", "", "", "", "", "إِنَّ تَشْرِيعَ الجِهَادِ لَيْسَ لِلِاعْتِدَاءِ عَلَى الآخَرِينَ.", "تَشْرِيعَ", "Cihadın meşru kılınması başkalarına saldırmak için değildir."),
  KW("اعْتَدَى", "f", "saldırdı (عَلَى)", "", "", "", "", "إِنَّ تَشْرِيعَ الجِهَادِ لَيْسَ لِلِاعْتِدَاءِ عَلَى الآخَرِينَ.", "لِلِاعْتِدَاءِ", "Cihad başkalarına saldırmak için değildir."),
  KW("إِيجَازٌ", "i", "kısalık, özet", "", "", "اخْتِصَارٌ", "إِطْنَابٌ", "مَا نُشِيرُ إِلَيْهِ بِإِيجَازٍ فِيمَا يَأْتِي.", "بِإِيجَازٍ", "Aşağıda kısaca işaret ettiğimiz şeyler."),
  KW("ظُلْمٌ", "i", "zulüm", "", "", "جَوْرٌ", "عَدْلٌ", "دَفْعُ الظُّلْمِ، وَرَفْعُ الأَذَى عَنِ المُسْلِمِينَ.", "الظُّلْمِ", "Zulmü defetmek ve Müslümanlardan eziyeti kaldırmak."),
  KW("أَذًى", "i", "eziyet", "", "", "", "", "دَفْعُ الظُّلْمِ، وَرَفْعُ الأَذَى عَنِ المُسْلِمِينَ.", "الأَذَى", "Müslümanlardan eziyeti kaldırmak."),
  KW("دَارٌ", "i", "yurt, ev", "دِيَارٌ", "fial", "بَيْتٌ", "", "حَتَّى أَخْرَجُوهُمْ مِنْ دِيَارِهِمْ وَأَمْوَالِهِمْ.", "دِيَارِهِمْ", "Sonunda onları yurtlarından ve mallarından çıkardılar."),
  KW("أَذِنَ", "f", "izin verdi (لِـ / فِي)", "", "", "", "مَنَعَ", "وَقَدْ أَذِنَ اللهُ لَهُمْ فِي مُقَاتَلَةِ هَؤُلَاءِ المُشْرِكِينَ.", "أَذِنَ", "Allah onlara bu müşriklerle savaşma izni verdi."),
  KW("مَظْلُومٌ", "i", "mazlum", "مَظْلُومُونَ", "un", "", "ظَالِمٌ", "الدِّفَاعُ عَنِ المَظْلُومِينَ المُضْطَهَدِينَ.", "المَظْلُومِينَ", "Zulme uğrayan mazlumları savunmak."),
  KW("مُضْطَهَدٌ", "s", "baskı gören", "مُضْطَهَدُونَ", "un", "", "", "الدِّفَاعُ عَنِ المَظْلُومِينَ المُضْطَهَدِينَ.", "المُضْطَهَدِينَ", "Baskı gören mazlumları savunmak."),
  KW("وَثِيقٌ", "s", "sıkı, sağlam", "", "", "مَتِينٌ", "ضَعِيفٌ", "وَيَرْتَبِطُ بِهَذَا ارْتِبَاطًا وَثِيقًا.", "وَثِيقًا", "Buna sıkı sıkıya bağlıdır."),
  KW("بَغْيٌ", "i", "haddi aşma, zulüm", "", "", "ظُلْمٌ", "عَدْلٌ", "حِمَايَةُ المُسْلِمِينَ مِنَ البَغْيِ.", "البَغْيِ", "Müslümanları zulümden korumak."),
  KW("فِتْنَةٌ", "i", "fitne", "فِتَنٌ", "fiel", "", "", "الفِتْنَةُ فِي الدِّينِ أَشَدُّ مِنَ القَتْلِ.", "الفِتْنَةُ", "Dinde fitne öldürmekten daha ağırdır."),
  KW("عَهْدٌ", "i", "ahit, antlaşma", "عُهُودٌ", "fuul", "مِيثَاقٌ", "", "نَقْضُ المُشْرِكِينَ لِعُهُودِهِمْ.", "لِعُهُودِهِمْ", "Müşriklerin ahitlerini bozması."),
  KW("نَقَضَ", "f", "bozdu (ahdi)", "", "", "نَكَثَ", "وَفَى", "نَقْضُ المُشْرِكِينَ لِعُهُودِهِمْ.", "نَقْضُ", "Müşriklerin ahitlerini bozması."),
  KW("اسْتَقَامَ", "f", "doğru davrandı", "", "", "", "انْحَرَفَ", "فَمَا اسْتَقَامُوا لَكُمْ فَاسْتَقِيمُوا لَهُمْ.", "اسْتَقَامُوا", "Onlar size dürüst davrandıkça siz de onlara dürüst davranın."),
  KW("مُكَلَّفٌ", "s", "yükümlü, sorumlu", "مُكَلَّفُونَ", "un", "", "", "فَإِنَّ المُسْلِمِينَ مُكَلَّفُونَ بِمُعَامَلَتِهِمْ بِالمِثْلِ.", "مُكَلَّفُونَ", "Müslümanlar onlara aynı şekilde davranmakla yükümlüdür."),
  KW("أَبْلَغَ", "f", "ulaştırdı, tebliğ etti", "", "", "", "", "بَذْلُ الجُهْدِ لِإِبْلَاغِ كَلِمَةِ اللهِ إِلَى النَّاسِ.", "لِإِبْلَاغِ", "Allah’ın sözünü insanlara ulaştırmak için çaba."),
  KW("مُهِمَّةٌ", "i", "görev", "مَهَامُّ", "diger", "وَظِيفَةٌ", "", "وَبِسَبَبِ هَذِهِ المَهَامِّ الجَلِيلَةِ.", "المَهَامِّ", "Bu yüce görevler yüzünden."),
  KW("جَلِيلٌ", "s", "yüce, büyük", "", "", "عَظِيمٌ", "حَقِيرٌ", "وَبِسَبَبِ هَذِهِ المَهَامِّ الجَلِيلَةِ.", "الجَلِيلَةِ", "Bu yüce görevler yüzünden."),
  KW("شَهِيدٌ", "i", "şehit", "شُهَدَاءُ", "fuela", "", "", "وَكَانَ القَائِمُونَ بِهِ مِنَ المُجَاهِدِينَ وَالشُّهَدَاءِ.", "وَالشُّهَدَاءِ", "Onu yapan mücahitler ve şehitler."),
  KW("سَامٍ", "s", "yüksek, yüce", "", "", "رَفِيعٌ", "", "وَلِلْجِهَادِ فِي الإِسْلَامِ آدَابٌ سَامِيَةٌ.", "سَامِيَةٌ", "İslam’da cihadın yüce adabı vardır."),
  KW("أَدَبٌ", "i", "edep, kural", "آدَابٌ", "efal", "", "", "وَلِلْجِهَادِ فِي الإِسْلَامِ آدَابٌ سَامِيَةٌ.", "آدَابٌ", "İslam’da cihadın yüce adabı vardır."),
  KW("عَاجِزٌ", "i", "âciz, güçsüz", "عَجَزَةٌ", "fuale", "", "قَادِرٌ", "لَا يَجُوزُ الاعْتِدَاءُ عَلَى الشُّيُوخِ وَالعَجَزَةِ.", "وَالعَجَزَةِ", "Yaşlılara ve güçsüzlere saldırmak caiz değildir."),
  KW("بَرِيءٌ", "s", "masum, suçsuz", "أَبْرِيَاءُ", "efila", "", "مُذْنِبٌ", "الَّتِي تَقُومُ بِقَتْلِ الأَبْرِيَاءِ مِنَ المَدَنِيِّينَ.", "الأَبْرِيَاءِ", "Masum sivilleri öldüren."),
  KW("بَاغٍ", "s", "zalim, haddini aşan", "بُغَاةٌ", "fuale", "ظَالِمٌ", "عَادِلٌ", "بِعَكْسِ مَا تَفْعَلُهُ بَعْضُ الدُّوَلِ البَاغِيَةِ.", "البَاغِيَةِ", "Bazı zalim devletlerin yaptığının aksine.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"at":["ـَاتٌ","cem-i müennes sâlim","غَايَاتٌ، رَايَاتٌ"],"efal":["أَفْعَالٌ","ef’âl","آدَابٌ، أَنْفُسٌ (أَفْعُلٌ)"],"efile":["أَفْعِلَةٌ","ef’ile","أَعْمِدَةٌ"],"fual2":["فُعَّالٌ","fu’’âl","فُسَّاقٌ، كُفَّارٌ"],"fuul":["فُعُولٌ","fuûl","حُظُوظٌ، عُهُودٌ"],"fial":["فِعَالٌ","fiâl","دِيَارٌ، رِجَالٌ"],"un":["ـُونَ","cem-i müzekker sâlim","مَظْلُومُونَ، مُكَلَّفُونَ"],"fiel":["فِعَلٌ","fi’al","فِتَنٌ، حِرَفٌ"],"fuela":["فُعَلَاءُ","fuelâ","شُهَدَاءُ"],"fuale":["فَعَلَةٌ / فُعَلَةٌ","fa‘ale / fu‘ale","عَجَزَةٌ، بُغَاةٌ"],"efila":["أَفْعِلَاءُ","ef‘ilâ","أَبْرِيَاءُ، أَصْدِقَاءُ"],"diger":["…","başka kalıplar","شَيَاطِينُ، مَشَاقُّ، مَهَامُّ"]};
