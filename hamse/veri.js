// ================= VERİ: Ef’âl-i Hamse (الأَفْعَالُ الخَمْسَةُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mi: { ar: "فِعْلٌ مِنَ الأَفْعَالِ الخَمْسَةِ", tr: "Ef’âl-i hamse" }, cerr: { ar: "النُّونُ", tr: "Nûn" },
  mz: { ar: "أَدَاةٌ", tr: "Nasb / cezm edatı" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "mz"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Meczûm", "مَجْزُومٌ", "ref"]];
var HAL_TR = { ref: "Merfû", nasb: "Mansûb", cezm: "Meczûm" };
var TUR_OPTS = HAL_OPTS;
// Makine fiilleri: [muzâri, Türkçe]
var MV = [["يَكْتُبُ", "yazmak"], ["يَذْهَبُ", "gitmek"], ["يَجْلِسُ", "oturmak"], ["يَعْمَلُ", "çalışmak"], ["يَدْرُسُ", "ders çalışmak"], ["يَشْرَبُ", "içmek"], ["يَخْرُجُ", "çıkmak"], ["يَفْهَمُ", "anlamak"]];
// Beş kalıp (altı şahıs): [zamir, ön ek, merfû eki (nûnsuz), nûn, mansûb/meczûm eki, Türkçe, kısa ad]
var FORMS = [
  ["هُمَا", "يَ", "َا", "نِ", "َا", "o ikisi (erkek)", "yef’alâni"],
  ["هُمَا", "تَ", "َا", "نِ", "َا", "o ikisi (kadın)", "tef’alâni"],
  ["أَنْتُمَا", "تَ", "َا", "نِ", "َا", "siz ikiniz", "tef’alâni"],
  ["هُمْ", "يَ", "ُو", "نَ", "ُوا", "onlar", "yef’alûne"],
  ["أَنْتُمْ", "تَ", "ُو", "نَ", "ُوا", "siz", "tef’alûne"],
  ["أَنْتِ", "تَ", "ِي", "نَ", "ِي", "sen (kadın)", "tef’alîne"]
];
function body(mu) { return mu.slice(2, -1); }
// fiil, şahıs, hal (0 merfû, 1 mansûb, 2 meczûm), html?
function hf(mu, fi, h, html) {
  var F = FORMS[fi], b = F[1] + body(mu);
  if (h === 0) return b + F[2] + (html ? '<b class="nun">' + F[3] + '</b>' : F[3]);
  return b + F[4];
}
var PART = [["", "Merfû", "nûn kalır (sübût-ı nûn)"], ["لَنْ", "Mansûb", "nûn düşer (hazf-ı nûn)"], ["لَمْ", "Meczûm", "nûn düşer (hazf-ı nûn)"]];
// Ef’âl-i hamse mi? oyunu: [kelime, e/h, açıklama]
var HM_LIST = [
  ["يَكْتُبَانِ", "e", "elif-i isneyn"], ["تَكْتُبَانِ", "e", "elif-i isneyn"], ["يَكْتُبُونَ", "e", "vâv-ı cemâat"], ["تَكْتُبُونَ", "e", "vâv-ı cemâat"], ["تَكْتُبِينَ", "e", "yâ-yı muhâtaba"],
  ["يَخْرُجُونَ", "e", "vâv-ı cemâat"], ["يَقْرَآنِ", "e", "elif-i isneyn"], ["تَبْدَئِينَ", "e", "yâ-yı muhâtaba"], ["يَجْتَمِعُونَ", "e", "vâv-ı cemâat"], ["لَمْ يَخْرُجَا", "e", "meczûm: nûn düştü"],
  ["لَنْ يَذْهَبُوا", "e", "mansûb: nûn düştü"], ["تَعْرِفُونَ", "e", "vâv-ı cemâat"], ["تُجَهِّزِينَ", "e", "yâ-yı muhâtaba"], ["يُرِيدَانِ", "e", "elif-i isneyn"],
  ["يَكْتُبُ", "h", "tekil muzâri"], ["يَدْخُلُ", "h", "tekil muzâri"], ["لَنْ يَرْجِعَ", "h", "tekil muzâri (mansûb)"], ["نَكْتُبُ", "h", "biz: zamir eki yok"], ["أَكْتُبُ", "h", "ben"],
  ["يَكْتُبْنَ", "h", "nûn-ı nisve: mebnî, ef’âl-i hamseden değil"], ["تَغْسِلْنَ", "h", "nûn-ı nisve"], ["كَتَبُوا", "h", "mâzi"], ["كَتَبَا", "h", "mâzi"], ["اُكْتُبُوا", "h", "emir"], ["كُونُوا", "h", "emir"], ["ابْدَؤُوا", "h", "emir"]
];
var HM_G = [["e", "Ef’âl-i hamse", "مِنَ الأَفْعَالِ الخَمْسَةِ", "mi"], ["h", "Değil", "لَيْسَ مِنْهَا", "x"]];

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

var UNITS = [
// ---------------------------------------------------------------- 1 · NEDİR
{
  id: "u1", no: 1, ar: "مَا الأَفْعَالُ الخَمْسَةُ؟", tr: "Ef’âl-i Hamse Nedir?", short: "Nedir?", col: "mi", legend: ["mi", "cerr"],
  goals: ["Ef’âl-i hamsenin, elif-i isneyn, yâ-yı muhâtaba ya da vâv-ı cemâat bitişen muzâri olduğunu bilmek", "Beş kalıbı tanımak: يَفْعَلَانِ، تَفْعَلَانِ، يَفْعَلُونَ، تَفْعَلُونَ، تَفْعَلِينَ", "Cümlede ef’âl-i hamseyi bulmak ve öznesine uygun olanı seçmek"],
  examples: [
    { s: "هُمَا:- / يَعْمَلَانِ.:mi", tr: "O ikisi çalışıyor.", pair: "أَنْتُمَا:- / تَعْمَلَانِ.:mi", pairTr: "Siz ikiniz çalışıyorsunuz." },
    { s: "هُمْ:- / يَعْمَلُونَ.:mi", tr: "Onlar çalışıyor.", pair: "أَنْتُمْ:- / تَعْمَلُونَ.:mi", pairTr: "Siz çalışıyorsunuz." },
    { s: "أَنْتِ:- / تَعْمَلِينَ.:mi", tr: "Sen (kadın) çalışıyorsun.", pair: "الطَّالِبَانِ:- / يَجْلِسَانِ.:mi", pairTr: "İki öğrenci oturuyor." }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">Ef’âl-i hamse</b> (<span class=\"ar\">الأَفْعَالُ الخَمْسَةُ</span>): sonuna <b>elif-i isneyn</b> (<span class=\"ar\">ا</span>), <b>yâ-yı muhâtaba</b> (<span class=\"ar\">ي</span>) ya da <b>vâv-ı cemâat</b> (<span class=\"ar\">و</span>) bitişen muzâri fiildir." },
    { tr: "Elif-i isneyn: <span class=\"ar\">الطَّالِبَانِ يَكْتُبَانِ الدَّرْسَ، الطَّالِبَتَانِ تَدْخُلَانِ الكُلِّيَّةَ</span>." },
    { tr: "Yâ-yı muhâtaba: <span class=\"ar\">أَنْتِ تَكْتُبِينَ الدَّرْسَ</span>. Vâv-ı cemâat: <span class=\"ar\">الطُّلَّابُ يَرْكَبُونَ الحَافِلَةَ</span>." },
    { tr: "Beş kalıp: <span class=\"ar\">يَفْعَلَانِ، تَفْعَلَانِ، يَفْعَلُونَ، تَفْعَلُونَ، تَفْعَلِينَ</span>. (<span class=\"ar\">تَفْعَلَانِ</span> hem \"o ikisi (kadın)\" hem \"siz ikiniz\" için.)", ex: ["يَكْتُبَانِ", "تَكْتُبَانِ", "يَكْتُبُونَ", "تَكْتُبُونَ", "تَكْتُبِينَ"] },
    { tr: "Ef’âl-i hamseden <b>değil</b>: tekil muzâri (<span class=\"ar\">يَدْخُلُ</span>), dişil çoğul (<span class=\"ar\">يَكْتُبْنَ</span>, nûn-ı nisve: mebnî), mâzi (<span class=\"ar\">كَتَبُوا</span>), emir (<span class=\"ar\">اُكْتُبُوا</span>)." }
  ],
  kaide: [
    "١ ـ الأَفْعَالُ الخَمْسَةُ: فِعْلٌ مُضَارِعٌ اتَّصَلَتْ بِهِ أَلِفُ الاثْنَيْنِ أَوْ يَاءُ المُخَاطَبَةِ أَوْ وَاوُ الجَمَاعَةِ.",
    "أَلِفُ الاثْنَيْنِ: الطَّالِبَانِ يَكْتُبَانِ الدَّرْسَ، الطَّالِبَتَانِ تَدْخُلَانِ الكُلِّيَّةَ. يَاءُ المُخَاطَبَةِ: أَنْتِ تَكْتُبِينَ الدَّرْسَ. وَاوُ الجَمَاعَةِ: الطُّلَّابُ يَرْكَبُونَ الحَافِلَةَ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنِ الأَفْعَالَ الخَمْسَةَ فِي الجُمَلِ التَّالِيَةِ", tr: "Ef’âl-i hamse olan fiile dokun. Bazı cümlelerde yok: tekil muzâri ef’âl-i hamse değildir.", items: [
      W("العُمَّالُ [يَخْرُجُونَ] مِنَ المَصْنَعِ.", "İşçiler fabrikadan çıkıyor.", "يَخْرُجُونَ: vâv-ı cemâat."),
      W("السَّائِحُ يَدْخُلُ المَتْحَفَ.", "Turist müzeye giriyor.", "Yok: يَدْخُلُ tekil muzâri."),
      W("الرَّجُلَانِ لَمْ [يَخْرُجَا] إِلَى السُّوقِ.", "İki adam çarşıya çıkmadı.", "يَخْرُجَا: elif-i isneyn; لَمْ yüzünden nûn düştü."),
      W("الطَّالِبَانِ [يَقْرَآنِ] الدَّرْسَ.", "İki öğrenci dersi okuyor.", "يَقْرَآنِ = يَقْرَأَانِ (hemze + elif → آ)."),
      W("الوُزَرَاءُ [يَجْتَمِعُونَ] فِي إِسْطَنْبُولَ.", "Bakanlar İstanbul’da toplanıyor.", "Vâv-ı cemâat."),
      W("الأُسْتَاذُ يَحْمِلُ الحَقِيبَةَ.", "Hoca çantayı taşıyor.", "Yok: tekil."),
      W("أَنْتِ [تَبْدَئِينَ] الكِتَابَةَ.", "Sen (kadın) yazmaya başlıyorsun.", "Yâ-yı muhâtaba."),
      W("المُسَافِرُ لَنْ يَرْجِعَ إِلَى بَلَدِهِ هَذَا الأُسْبُوعَ.", "Yolcu bu hafta memleketine dönmeyecek.", "Yok: يَرْجِعَ tekil; لَنْ onu fethayla mansûb yaptı.")
    ]},
    { type: "pick", fill: true, num: "٢", ar: "امْلَأِ الفَرَاغَ بِالفِعْلِ المُنَاسِبِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Özneye uyan fiili seç: kaç kişi, erkek mi kadın mı, akıllı mı?", items: [
      { q: "الأَطِبَّاءُ ___ إِلَى المُسْتَشْفَى.", o: ["يَذْهَبُ", "يَذْهَبَانِ", "يَذْهَبُونَ"], a: 2, tr: "Doktorlar hastaneye gidiyor.", why: "Özne önde, eril çoğul → يَذْهَبُونَ." },
      { q: "الطُّلَّابُ ___ فِي كُلِّيَّةِ الإِلَهِيَّاتِ.", o: ["يَدْرُسُ", "يَدْرُسْنَ", "يَدْرُسُونَ"], a: 2, tr: "Öğrenciler İlahiyat Fakültesinde okuyor.", why: "Eril çoğul → يَدْرُسُونَ. يَدْرُسْنَ dişil içindir." },
      { q: "الجَرِيدَتَانِ ___ فِي أَنْقَرَةَ.", o: ["تَصْدُرُ", "تَصْدُرَانِ", "يَصْدُرُ"], a: 1, tr: "İki gazete Ankara’da çıkıyor.", why: "Dişil müsennâ → تَصْدُرَانِ." },
      { q: "الضُّيُوفُ ___ فِي الفُنْدُقِ الجَدِيدِ.", o: ["تَسْكُنُ", "يَسْكُنَانِ", "يَسْكُنُونَ"], a: 2, tr: "Misafirler yeni otelde kalıyor.", why: "Akıllı eril çoğul → يَسْكُنُونَ." },
      { q: "المُدَرِّسُونَ ___ عَلَى العَمَلِ بِنَشَاطٍ.", o: ["يُشْرِفُ", "يُشْرِفْنَ", "يُشْرِفُونَ"], a: 2, tr: "Öğretmenler işi gayretle yönetiyor.", why: "يُشْرِفُونَ." },
      { q: "أَنْتِ ___ فِي الحَدِيقَةِ.", o: ["تَلْعَبُ", "تَلْعَبِينَ", "تَلْعَبُونَ"], a: 1, tr: "Sen (kadın) bahçede oynuyorsun.", why: "أَنْتِ → yâ-yı muhâtaba: تَلْعَبِينَ." },
      { q: "المُمَرِّضَتَانِ ___ الطَّعَامَ.", o: ["يَأْكُلَانِ", "تَأْكُلَانِ", "يَأْكُلْنَ"], a: 1, tr: "İki hemşire yemek yiyor.", why: "Dişil müsennâ → تَـ ile: تَأْكُلَانِ." },
      { q: "الشُّرْطِيَّانِ ___ السِّلَاحَ.", o: ["يَحْمِلَانِ", "يَحْمِلُ", "تَحْمِلَانِ"], a: 0, tr: "İki polis silah taşıyor.", why: "Eril müsennâ → يَحْمِلَانِ." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · TESNİYE VE CEMİ
{
  id: "u2", no: 2, ar: "التَّثْنِيَةُ وَالجَمْعُ", tr: "Müsennâ ve Cemi Yapma", short: "Müsennâ · cemi", col: "cerr", legend: ["mi"],
  goals: ["Mübtedâyı müsennâ yapınca fiili de müsennâ yapmak: الطَّبِيبَانِ يَفْحَصَانِ", "Mübtedâyı cemi yapınca fiili vâv-ı cemâatle yazmak: الطُّلَّابُ يَنْزِلُونَ", "Dişil çoğulun fiilinin (يَغْسِلْنَ) ef’âl-i hamseden olmadığını görmek"],
  examples: [
    { s: "الطَّبِيبُ:- / يَفْحَصُ:x / المَرِيضَ.:-", tr: "Doktor hastayı muayene ediyor.", pair: "الطَّبِيبَانِ:- / يَفْحَصَانِ:mi / المَرِيضَ.:-", pairTr: "İki doktor hastayı muayene ediyor." },
    { s: "الطَّالِبُ:- / يَنْزِلُ:x / مِنَ السَّيَّارَةِ.:-", tr: "Öğrenci arabadan iniyor.", pair: "الطُّلَّابُ:- / يَنْزِلُونَ:mi / مِنَ السَّيَّارَةِ.:-", pairTr: "Öğrenciler arabadan iniyor." }
  ],
  rules: [
    { tr: "Mübtedâ önde iken fiil ona sayıda ve cinsiyette uyar: <span class=\"ar\">الطَّبِيبَانِ يَفْحَصَانِ</span>, <span class=\"ar\">الطِّفْلَتَانِ تَشْرَبَانِ</span>, <span class=\"ar\">المُسْلِمُونَ يَشْكُرُونَ</span>." },
    { tr: "Eril müsennâ <span class=\"ar\">يَـ…َانِ</span>, dişil müsennâ <span class=\"ar\">تَـ…َانِ</span> ile gelir." },
    { tr: "Akıllı eril çoğul (sâlim ya da kırık) <span class=\"ar\">يَـ…ُونَ</span>: <span class=\"ar\">التُّجَّارُ يَخْسَرُونَ، الأَطْفَالُ يَأْكُلُونَ</span>." },
    { tr: "Dişil çoğul <span class=\"ar\">يَـ…ْنَ</span> alır: <span class=\"ar\">النِّسَاءُ يَغْسِلْنَ</span>. Bu nûn, nûn-ı nisvedir; fiil mebnîdir ve ef’âl-i hamseden sayılmaz." },
    { tr: "Cümlede <span class=\"ar\">لَنْ</span> varsa çevirince nûn düşer: <span class=\"ar\">الشَّاهِدُ لَنْ يَكْذِبَ ← الشُّهُودُ لَنْ يَكْذِبُوا</span>." }
  ],
  kaide: ["حَوِّلِ المُبْتَدَأَ فِي الجُمَلِ التَّالِيَةِ إِلَى المُثَنَّى، مِثْلُ: الطَّبِيبُ يَفْحَصُ المَرِيضَ ← الطَّبِيبَانِ يَفْحَصَانِ المَرِيضَ.", "حَوِّلِ المُبْتَدَأَ إِلَى الجَمْعِ، مِثْلُ: الطَّالِبُ يَنْزِلُ مِنَ السَّيَّارَةِ ← الطُّلَّابُ يَنْزِلُونَ مِنَ السَّيَّارَةِ."],
  ex: [
    { type: "combo", num: "٣", ar: "حَوِّلِ المُبْتَدَأَ فِي الجُمَلِ التَّالِيَةِ إِلَى المُثَنَّى", tr: "Mübtedâyı müsennâ yap, fiili de ona uydur.", exHtml: "<span class=\"ar\">الطَّبِيبُ يَفْحَصُ المَرِيضَ ← الطَّبِيبَانِ يَفْحَصَانِ المَرِيضَ.</span>", items: [
      CB("الطِّفْلَةُ تَشْرَبُ الحَلِيبَ.", [["الطِّفْلَتَانِ", "الطِّفْلَانِ", "الطِّفْلَتَيْنِ"], ["يَشْرَبَانِ", "تَشْرَبَانِ", "تَشْرَبُونَ"], "الحَلِيبَ."], [0, 1], "İki kız çocuk süt içiyor.", "Dişil müsennâ: تَشْرَبَانِ."),
      CB("الإِذَاعَةُ تَنْشُرُ الأَخْبَارَ.", [["الإِذَاعَاتُ", "الإِذَاعَتَانِ", "الإِذَاعَتَيْنِ"], ["تَنْشُرَانِ", "يَنْشُرَانِ", "تَنْشُرُ"], "الأَخْبَارَ."], [1, 0], "İki radyo haberleri yayınlıyor.", "Mübtedâ merfû: الإِذَاعَتَانِ; fiil تَنْشُرَانِ."),
      CB("البِنْتُ تَذْهَبُ إِلَى المَدْرَسَةِ.", [["البِنْتَيْنِ", "البَنَاتُ", "البِنْتَانِ"], ["تَذْهَبِينَ", "تَذْهَبَانِ", "يَذْهَبَانِ"], "إِلَى المَدْرَسَةِ."], [2, 1], "İki kız okula gidiyor.", "تَذْهَبَانِ."),
      CB("الفَلَّاحُ يَزْرَعُ الحَقْلَ.", [["الفَلَّاحَانِ", "الفَلَّاحُونَ", "الفَلَّاحَيْنِ"], ["تَزْرَعَانِ", "يَزْرَعُونَ", "يَزْرَعَانِ"], "الحَقْلَ."], [0, 2], "İki çiftçi tarlayı ekiyor.", "Eril müsennâ: يَزْرَعَانِ."),
      CB("التِّلْمِيذُ يَحْفَظُ سُورَةَ الوَاقِعَةِ.", [["التِّلْمِيذَيْنِ", "التِّلْمِيذَانِ", "التَّلَامِيذُ"], ["يَحْفَظَانِ", "تَحْفَظَانِ", "يَحْفَظُونَ"], "سُورَةَ الوَاقِعَةِ."], [1, 0], "İki öğrenci Vâkıa sûresini ezberliyor.", "يَحْفَظَانِ."),
      CB("النَّجَّارُ يَحْضُرُ إِلَى البَيْتِ.", [["النَّجَّارُونَ", "النَّجَّارَيْنِ", "النَّجَّارَانِ"], ["يَحْضُرُونَ", "يَحْضُرَانِ", "تَحْضُرَانِ"], "إِلَى البَيْتِ."], [2, 1], "İki marangoz eve geliyor.", "يَحْضُرَانِ."),
      CB("الخَيَّاطُ يَرْجِعُ مِنَ السُّوقِ.", [["الخَيَّاطَانِ", "الخَيَّاطَيْنِ", "الخَيَّاطُونَ"], ["يَرْجِعَا", "يَرْجِعَانِ", "تَرْجِعَانِ"], "مِنَ السُّوقِ."], [0, 1], "İki terzi çarşıdan dönüyor.", "Edat yok: nûn kalır, يَرْجِعَانِ."),
      CB("الطَّالِبُ يَفْهَمُ الدَّرْسَ.", [["الطُّلَّابُ", "الطَّالِبَانِ", "الطَّالِبَيْنِ"], ["يَفْهَمَانِ", "تَفْهَمَانِ", "يَفْهَمُونَ"], "الدَّرْسَ."], [1, 0], "İki öğrenci dersi anlıyor.", "يَفْهَمَانِ.")
    ]},
    { type: "combo", num: "٤", ar: "حَوِّلِ المُبْتَدَأَ فِي الجُمَلِ التَّالِيَةِ إِلَى الجَمْعِ", tr: "Mübtedâyı çoğul yap, fiili de ona uydur. لَنْ varsa nûn düşer; dişil çoğulda fiil nûn-ı nisve alır.", exHtml: "<span class=\"ar\">الطَّالِبُ يَنْزِلُ مِنَ السَّيَّارَةِ ← الطُّلَّابُ يَنْزِلُونَ مِنَ السَّيَّارَةِ.</span>", items: [
      CB("الشَّاهِدُ لَنْ يَكْذِبَ.", [["الشُّهُودُ", "الشَّاهِدَانِ", "الشَّاهِدَاتُ"], ["لَنْ يَكْذِبُونَ", "لَنْ يَكْذِبُوا", "لَنْ يَكْذِبَا"]], [0, 1], "Şahitler yalan söylemeyecek.", "لَنْ nasb eder: nûn düşer, elif-i fâriqa yazılır: يَكْذِبُوا."),
      CB("المَنْدُوبُ يَحْضُرُ الاجْتِمَاعَ.", [["المَنْدُوبَانِ", "المَنْدُوبُونَ", "المَنْدُوبِينَ"], ["يَحْضُرُوا", "يَحْضُرَانِ", "يَحْضُرُونَ"], "الاجْتِمَاعَ."], [1, 2], "Temsilciler toplantıya katılıyor.", "Edat yok: يَحْضُرُونَ."),
      CB("المُسَافِرُ يَجْلِسُ فِي القَاعَةِ.", [["المُسَافِرِينَ", "المُسَافِرَانِ", "المُسَافِرُونَ"], ["يَجْلِسُونَ", "يَجْلِسْنَ", "يَجْلِسُ"], "فِي القَاعَةِ."], [2, 0], "Yolcular salonda oturuyor.", "يَجْلِسُونَ."),
      CB("الخَادِمُ يَكْنُسُ الصُّفُوفَ.", [["الخَدَمُ", "الخَادِمَانِ", "الخَادِمَةُ"], ["يَكْنُسَانِ", "يَكْنُسُونَ", "تَكْنُسُ"], "الصُّفُوفَ."], [0, 1], "Hizmetliler sınıfları süpürüyor.", "Kırık çoğul ama akıllı: يَكْنُسُونَ."),
      CB("التَّاجِرُ لَنْ يَخْسَرَ فِي التِّجَارَةِ.", [["التُّجَّارُ", "التَّاجِرَانِ", "التَّاجِرَاتُ"], ["لَنْ يَخْسَرُوا", "لَنْ يَخْسَرُونَ", "لَنْ يَخْسَرَ"], "فِي التِّجَارَةِ."], [0, 0], "Tüccarlar ticarette zarar etmeyecek.", "لَنْ: nûn düşer → يَخْسَرُوا."),
      CB("المُسْلِمُ يَشْكُرُ اللهَ.", [["المُسْلِمِينَ", "المُسْلِمُونَ", "المُسْلِمَانِ"], ["يَشْكُرُونَ", "يَشْكُرُوا", "يَشْكُرَانِ"], "اللهَ."], [1, 0], "Müslümanlar Allah’a şükrediyor.", "يَشْكُرُونَ."),
      CB("المَرْأَةُ تَغْسِلُ الأَطْبَاقَ.", [["النِّسَاءُ", "المَرْأَتَانِ", "الرِّجَالُ"], ["يَغْسِلُونَ", "يَغْسِلْنَ", "تَغْسِلَانِ"], "الأَطْبَاقَ."], [0, 1], "Kadınlar tabakları yıkıyor.", "Dişil çoğul: يَغْسِلْنَ (nûn-ı nisve). Bu fiil ef’âl-i hamseden değildir."),
      CB("الطِّفْلُ يَأْكُلُ المَوْزَ.", [["الطِّفْلَانِ", "الأَطْفَالُ", "الطِّفْلَةُ"], ["يَأْكُلُونَ", "يَأْكُلُ", "يَأْكُلَا"], "المَوْزَ."], [1, 0], "Çocuklar muz yiyor.", "يَأْكُلُونَ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · CÜMLEDE KULLANMA
{
  id: "u3", no: 3, ar: "الأَفْعَالُ الخَمْسَةُ فِي الجُمْلَةِ", tr: "Cümlede Ef’âl-i Hamse", short: "Cümlede", col: "nasb", legend: ["mi", "x"],
  goals: ["Fiil önde iken tekil, özne önde iken uyumlu (ef’âl-i hamse) olduğunu görmek", "Fiil cümlesini isim cümlesine çevirmek: يَلْعَبُ الأَوْلَادُ ← الأَوْلَادُ يَلْعَبُونَ", "Boşluğa uygun ef’âl-i hamseyi koymak"],
  examples: [
    { s: "يَلْعَبُ:x / الأَوْلَادُ فِي الحَدِيقَةِ.:-", tr: "Çocuklar bahçede oynuyor (fiil cümlesi).", pair: "الأَوْلَادُ:- / يَلْعَبُونَ:mi / فِي الحَدِيقَةِ.:-", pairTr: "Çocuklar bahçede oynuyor (isim cümlesi)." },
    { s: "تَطْبُخُ:x / المَرْأَتَانِ الطَّعَامَ.:-", tr: "İki kadın yemek pişiriyor.", pair: "المَرْأَتَانِ:- / تَطْبُخَانِ:mi / الطَّعَامَ.:-", pairTr: "İki kadın yemek pişiriyor." }
  ],
  rules: [
    { tr: "<b>Fiil önde</b> (fiil cümlesi) iken fiil tekil kalır, yalnız cinsiyette uyar: <span class=\"ar\">يَلْعَبُ الأَوْلَادُ، تَطْبُخُ المَرْأَتَانِ</span>." },
    { tr: "<b>Özne önde</b> (isim cümlesi) iken fiil sayıda da uyar ve ef’âl-i hamse olur: <span class=\"ar\">الأَوْلَادُ يَلْعَبُونَ، المَرْأَتَانِ تَطْبُخَانِ</span>." },
    { tr: "Çevirme yolu: özneyi başa al, fiile elif (ikil) ya da vâv (çoğul) ve nûn ekle." },
    { tr: "Edat yoksa nûn kalır: <span class=\"ar\">الفَلَّاحُونَ يَحْرُثُونَ الأَرْضَ</span>. لَنْ / لَمْ varsa nûn düşer: <span class=\"ar\">الفَرِيقَانِ لَمْ يَنْزِلَا</span>." }
  ],
  kaide: ["حَوِّلِ الجُمَلَ الفِعْلِيَّةَ التَّالِيَةَ إِلَى الجُمَلِ الاسْمِيَّةِ، مِثْلُ: يَلْعَبُ الأَوْلَادُ فِي الحَدِيقَةِ ← الأَوْلَادُ يَلْعَبُونَ فِي الحَدِيقَةِ."],
  ex: [
    { type: "combo", num: "٦", ar: "حَوِّلِ الجُمَلَ الفِعْلِيَّةَ التَّالِيَةَ إِلَى الجُمَلِ الاسْمِيَّةِ", tr: "Özneyi başa aldık; fiili ona uydur.", exHtml: "<span class=\"ar\">يَلْعَبُ الأَوْلَادُ فِي الحَدِيقَةِ ← الأَوْلَادُ يَلْعَبُونَ فِي الحَدِيقَةِ.</span>", items: [
      CB("يَدْخُلُ الصَّحَفِيُّونَ القَاعَةَ.", ["الصَّحَفِيُّونَ", ["يَدْخُلُ", "يَدْخُلُونَ", "يَدْخُلَانِ"], "القَاعَةَ."], [1], "Gazeteciler salona giriyor.", "Özne önde, eril çoğul: يَدْخُلُونَ."),
      CB("يَخْرُجُ المُهَنْدِسُونَ مِنَ الشَّرِكَةِ.", ["المُهَنْدِسُونَ", ["يَخْرُجُونَ", "يَخْرُجُ", "يَخْرُجُوا"], "مِنَ الشَّرِكَةِ."], [0], "Mühendisler şirketten çıkıyor.", "Edat yok: nûn kalır, يَخْرُجُونَ."),
      CB("يَتْعَبُ الفَلَّاحُونَ.", ["الفَلَّاحُونَ", ["يَتْعَبَانِ", "يَتْعَبْنَ", "يَتْعَبُونَ"], "."], [2], "Çiftçiler yoruluyor.", "يَتْعَبُونَ."),
      CB("يَفْتَحُ اللُّصُوصُ بَابَ البَيْتِ.", ["اللُّصُوصُ", ["يَفْتَحُ", "يَفْتَحُونَ", "تَفْتَحُ"], "بَابَ البَيْتِ."], [1], "Hırsızlar evin kapısını açıyor.", "Kırık çoğul, akıllı: يَفْتَحُونَ."),
      CB("يَجْتَمِعُ النَّاسُ فِي المَسْجِدِ.", ["النَّاسُ", ["يَجْتَمِعُونَ", "يَجْتَمِعُ", "يَجْتَمِعَانِ"], "فِي المَسْجِدِ."], [0], "İnsanlar mescitte toplanıyor.", "النَّاسُ çoğul anlamlı: يَجْتَمِعُونَ."),
      CB("تَطْبُخُ المَرْأَتَانِ الطَّعَامَ.", ["المَرْأَتَانِ", ["يَطْبُخَانِ", "تَطْبُخُ", "تَطْبُخَانِ"], "الطَّعَامَ."], [2], "İki kadın yemek pişiriyor.", "Dişil müsennâ: تَطْبُخَانِ."),
      CB("يَضْحَكُ الطُّلَّابُ.", ["الطُّلَّابُ", ["يَضْحَكُونَ", "يَضْحَكُ", "يَضْحَكْنَ"], "."], [0], "Öğrenciler gülüyor.", "يَضْحَكُونَ."),
      CB("يَنْزِلُ المُسَافِرُونَ مِنَ القِطَارِ.", ["المُسَافِرُونَ", ["يَنْزِلُ", "يَنْزِلَانِ", "يَنْزِلُونَ"], "مِنَ القِطَارِ."], [2], "Yolcular trenden iniyor.", "يَنْزِلُونَ.")
    ]},
    { type: "pick", fill: true, num: "٥", ar: "امْلَأِ الفَرَاغَ فِي الجُمَلِ التَّالِيَةِ بِفِعْلٍ مُنَاسِبٍ مِنَ الأَفْعَالِ الخَمْسَةِ", tr: "Uygun ef’âl-i hamseyi seç. Kitapta serbest; burada özneye ve edata bak.", items: [
      { q: "السَّائِحَانِ ___ الطَّائِرَةَ.", o: ["يَرْكَبَانِ", "يَرْكَبُونَ", "يَرْكَبُ"], a: 0, tr: "İki turist uçağa biniyor.", why: "Eril müsennâ: يَرْكَبَانِ." },
      { q: "أَنْتِ ___ الحَقِيبَةَ.", o: ["تَحْمِلُ", "تَحْمِلِينَ", "تَحْمِلَانِ"], a: 1, tr: "Sen (kadın) çantayı taşıyorsun.", why: "أَنْتِ: تَحْمِلِينَ." },
      { q: "الفَرِيقَانِ لَمْ ___ إِلَى أَرْضِ المَلْعَبِ.", o: ["يَنْزِلَانِ", "يَنْزِلَا", "يَنْزِلُوا"], a: 1, tr: "İki takım sahaya inmedi.", why: "لَمْ cezm eder: nûn düşer → يَنْزِلَا." },
      { q: "الشَّابَّانِ ___ فِي البَحْرِ.", o: ["يَسْبَحَانِ", "يَسْبَحُونَ", "تَسْبَحِينَ"], a: 0, tr: "İki genç denizde yüzüyor.", why: "يَسْبَحَانِ." },
      { q: "المُدَرِّسُونَ ___ عَلَى تَرْبِيَةِ الأَطْفَالِ.", o: ["يَحْرِصُوا", "يَحْرِصَانِ", "يَحْرِصُونَ"], a: 2, tr: "Öğretmenler çocukların eğitimine özen gösteriyor.", why: "Edat yok: nûn kalır, يَحْرِصُونَ." },
      { q: "الصَّادِقُونَ ___ الجَنَّةَ.", o: ["يَدْخُلُوا", "يَدْخُلُونَ", "يَدْخُلَانِ"], a: 1, tr: "Doğrular cennete girer.", why: "Edat yok: يَدْخُلُونَ." },
      { q: "الرَّجُلَانِ ___ العَمَلَ.", o: ["يَتْرُكُونَ", "يَتْرُكَا", "يَتْرُكَانِ"], a: 2, tr: "İki adam işi bırakıyor.", why: "Edat yok: يَتْرُكَانِ (يَتْرُكَا ancak lem/len ile)." },
      { q: "الفَلَّاحُونَ ___ الأَرْضَ.", o: ["يَحْرُثُونَ", "يَحْرُثُوا", "يَحْرُثَانِ"], a: 0, tr: "Çiftçiler toprağı sürüyor.", why: "يَحْرُثُونَ." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · İ'RAB
{
  id: "u4", no: 4, ar: "إِعْرَابُ الأَفْعَالِ الخَمْسَةِ", tr: "İ’rab: Nûnun Kalması ve Düşmesi", short: "İ’rab", col: "ref", legend: ["mi", "cerr", "mz"],
  goals: ["Ef’âl-i hamsenin merfûda nûnu koruduğunu bilmek (sübût-ı nûn)", "Mansûb ve meczûmda nûnun düştüğünü görmek (hazf-ı nûn): لَنْ يَذْهَبُوا، لَمْ يَتْرُكُوا", "Âyetlerde ef’âl-i hamseyi bulup i’rab hükmünü söylemek"],
  examples: [
    { s: "الطَّبِيبَانِ:- / يَذْهَبَا:mi / نِ:cerr / إِلَى المُسْتَشْفَى.:-", tr: "İki doktor hastaneye gidiyor (merfû: nûn var)." },
    { s: "الصَّحَفِيُّونَ:- / لَنْ:mz / يَذْهَبُوا:mi / إِلَى المُؤْتَمَرِ.:-", tr: "Gazeteciler konferansa gitmeyecek (mansûb: nûn düştü)." },
    { s: "الوُزَرَاءُ:- / لَمْ:mz / يَتْرُكُوا:mi / قَاعَةَ الاجْتِمَاعِ.:-", tr: "Bakanlar toplantı salonunu terk etmedi (meczûm: nûn düştü)." }
  ],
  rules: [
    { tr: "Ef’âl-i hamse <b>merfûda nûnun kalmasıyla</b> (<span class=\"ar\">ثُبُوتُ النُّونِ</span>) i’rab alır: <span class=\"ar\">يَذْهَبَانِ، يَذْهَبُونَ، تَذْهَبِينَ</span>." },
    { tr: "<b>Mansûb</b> ve <b>meczûmda nûn düşer</b> (<span class=\"ar\">حَذْفُ النُّونِ</span>): <span class=\"ar\">لَنْ يَذْهَبُوا، أَنْ يَخْرُجَا، لَمْ تَفْعَلُوا، لَا تَدْخُلُوا</span>." },
    { tr: "Nasb edatları: <span class=\"ar\">أَنْ، لَنْ، كَيْ، حَتَّى…</span> · Cezm edatları: <span class=\"ar\">لَمْ، لَمَّا، لَا (nâhiye), لَامُ الأَمْرِ، إِنْ (şart)</span>." },
    { tr: "Vâv-ı cemâatten sonra nûn düşünce okunmayan bir elif yazılır (<b>elif-i fâriqa</b>): <span class=\"ar\">لَنْ يَكْتُبُوا</span>. Elif-i isneynde ve yâ-yı muhâtabada yazılmaz: <span class=\"ar\">لَمْ يَكْتُبَا، لَمْ تَكْتُبِي</span>." },
    { tr: "Atıfla gelen fiil de aynı hükmü alır: <span class=\"ar\">أَنْ يُخْرِجَاكُمْ… وَيَذْهَبَا</span> (ikisi de mansûb)." },
    { tr: "Zamir eklenince de nûn düşmüş olarak kalır: <span class=\"ar\">فَلَا تَدْخُلُوهَا، أَنْ يُخْرِجَاكُمْ</span>." }
  ],
  kaide: ["٢ ـ الأَفْعَالُ الخَمْسَةُ تُرْفَعُ بِثُبُوتِ النُّونِ، وَتُنْصَبُ وَتُجْزَمُ بِحَذْفِهَا: الطَّبِيبَانِ يَذْهَبَانِ إِلَى المُسْتَشْفَى (مَرْفُوعٌ)، الصَّحَفِيُّونَ لَنْ يَذْهَبُوا إِلَى المُؤْتَمَرِ (مَنْصُوبٌ)، الوُزَرَاءُ لَمْ يَتْرُكُوا قَاعَةَ الاجْتِمَاعِ (مَجْزُومٌ)."],
  ex: [
    { type: "find", target: "y", num: "٧", ar: "عَيِّنِ الأَفْعَالَ الخَمْسَةَ فِي الآيَاتِ التَّالِيَةِ", tr: "Âyetlerdeki ef’âl-i hamseye dokun. Emir (ارْجِعُوا، فَاتَّقُوا) ve mâzi (كَفَرُوا، أُعِيدُوا) ef’âl-i hamse değildir.", items: [
      W("فَإِنْ لَمْ [تَفْعَلُوا] وَلَنْ [تَفْعَلُوا] فَاتَّقُوا النَّارَ الَّتِي وَقُودُهَا النَّاسُ وَالحِجَارَةُ", "Eğer yapamazsanız, ki asla yapamayacaksınız, yakıtı insanlar ve taşlar olan ateşten sakının. (Bakara 24)", "لَمْ تَفْعَلُوا: meczûm; لَنْ تَفْعَلُوا: mansûb."),
      W("فَإِنْ لَمْ [تَجِدُوا] فِيهَا أَحَدًا فَلَا [تَدْخُلُوهَا] حَتَّى يُؤْذَنَ لَكُمْ وَإِنْ قِيلَ لَكُمُ ارْجِعُوا فَارْجِعُوا هُوَ أَزْكَى لَكُمْ وَاللهُ بِمَا [تَعْمَلُونَ] عَلِيمٌ", "Orada kimseyi bulamazsanız size izin verilinceye kadar girmeyin; \"Dönün\" denirse dönün… Allah yaptıklarınızı bilir. (Nûr 28)", "Üç fiil: تَجِدُوا (meczûm), تَدْخُلُوهَا (meczûm, lâ-yı nâhiye), تَعْمَلُونَ (merfû). ارْجِعُوا emirdir."),
      W("قَالُوا إِنَّا تَطَيَّرْنَا بِكُمْ لَئِنْ لَمْ [تَنْتَهُوا] لَنَرْجُمَنَّكُمْ", "\"Sizi uğursuz sayıyoruz; vazgeçmezseniz sizi taşlarız\" dediler. (Yâsîn 18)", "لَمْ تَنْتَهُوا: meczûm."),
      W("إِنَّ الَّذِينَ كَفَرُوا وَصَدُّوا عَنْ سَبِيلِ اللهِ وَشَاقُّوا الرَّسُولَ لَنْ [يَضُرُّوا] اللهَ شَيْئًا", "İnkâr edip Allah yolundan alıkoyan ve Peygambere karşı gelenler Allah’a hiçbir zarar veremezler. (Muhammed 32)", "لَنْ يَضُرُّوا: mansûb. كَفَرُوا، صَدُّوا، شَاقُّوا mâzidir."),
      W("فَقُلْ لَنْ [تَخْرُجُوا] مَعِيَ أَبَدًا وَلَنْ [تُقَاتِلُوا] مَعِيَ عَدُوًّا", "De ki: Benimle asla çıkmayacaksınız ve benimle birlikte hiçbir düşmanla savaşmayacaksınız. (Tevbe 83)", "İkisi de لَنْ ile mansûb."),
      W("قَالُوا إِنْ هَذَانِ لَسَاحِرَانِ [يُرِيدَانِ] أَنْ [يُخْرِجَاكُمْ] مِنْ أَرْضِكُمْ بِسِحْرِهِمَا [وَيَذْهَبَا] بِطَرِيقَتِكُمُ المُثْلَى", "Bu ikisi, sizi büyüleriyle yurdunuzdan çıkarmak ve örnek yolunuzu ortadan kaldırmak isteyen iki büyücüdür. (Tâhâ 63)", "يُرِيدَانِ merfû; يُخْرِجَا ve يَذْهَبَا أَنْ ile mansûb."),
      W("كُلَّمَا أَرَادُوا أَنْ [يَخْرُجُوا] مِنْهَا مِنْ غَمٍّ أُعِيدُوا فِيهَا", "Gamdan dolayı oradan her çıkmak istediklerinde geri döndürülürler. (Hac 22)", "أَنْ يَخْرُجُوا: mansûb. أَرَادُوا ve أُعِيدُوا mâzi."),
      W("إِنَّمَا كَانَ قَوْلَ المُؤْمِنِينَ إِذَا دُعُوا إِلَى اللهِ وَرَسُولِهِ لِيَحْكُمَ بَيْنَهُمْ أَنْ [يَقُولُوا] سَمِعْنَا وَأَطَعْنَا", "Müminlerin sözü, aralarında hüküm vermesi için Allah’a ve Resûlüne çağrıldıklarında \"İşittik ve itaat ettik\" demekten ibarettir. (Nûr 51)", "أَنْ يَقُولُوا: mansûb. لِيَحْكُمَ tekil.")
    ]},
    { type: "classify", num: "٧", opts: HAL_OPTS, ar: "بَيِّنِ الحُكْمَ الإِعْرَابِيَّ لِلْأَفْعَالِ الخَمْسَةِ", tr: "Koyu fiilin i’rab hükmü ne? Önündeki edata ve nûna bak.", items: [
      { s: HL("فَإِنْ لَمْ تَفْعَلُوا", "تَفْعَلُوا") + ' <small class="muted">(Bakara 24)</small>', a: "cezm", why: "لَمْ: meczûm, nûn düştü." },
      { s: HL("وَلَنْ تَفْعَلُوا", "تَفْعَلُوا"), a: "nasb", why: "لَنْ: mansûb, nûn düştü." },
      { s: HL("فَإِنْ لَمْ تَجِدُوا فِيهَا أَحَدًا", "تَجِدُوا") + ' <small class="muted">(Nûr 28)</small>', a: "cezm", why: "لَمْ: meczûm." },
      { s: HL("فَلَا تَدْخُلُوهَا", "تَدْخُلُوهَا"), a: "cezm", why: "لَا-yı nâhiye: meczûm; nûn düştü, sonra هَا zamiri geldi." },
      { s: HL("وَاللهُ بِمَا تَعْمَلُونَ عَلِيمٌ", "تَعْمَلُونَ"), a: "ref", why: "Edat yok: merfû, nûn sabit." },
      { s: HL("لَئِنْ لَمْ تَنْتَهُوا", "تَنْتَهُوا") + ' <small class="muted">(Yâsîn 18)</small>', a: "cezm", why: "لَمْ: meczûm." },
      { s: HL("لَنْ يَضُرُّوا اللهَ شَيْئًا", "يَضُرُّوا") + ' <small class="muted">(Muhammed 32)</small>', a: "nasb", why: "لَنْ: mansûb." },
      { s: HL("لَنْ تَخْرُجُوا مَعِيَ أَبَدًا", "تَخْرُجُوا") + ' <small class="muted">(Tevbe 83)</small>', a: "nasb", why: "لَنْ: mansûb." },
      { s: HL("وَلَنْ تُقَاتِلُوا مَعِيَ عَدُوًّا", "تُقَاتِلُوا"), a: "nasb", why: "لَنْ: mansûb." },
      { s: HL("لَسَاحِرَانِ يُرِيدَانِ", "يُرِيدَانِ") + ' <small class="muted">(Tâhâ 63)</small>', a: "ref", why: "Edat yok: merfû, nûn sabit." },
      { s: HL("أَنْ يُخْرِجَاكُمْ مِنْ أَرْضِكُمْ", "يُخْرِجَاكُمْ"), a: "nasb", why: "أَنْ: mansûb; nûn düştü, كُمْ zamiri bitişti." },
      { s: HL("وَيَذْهَبَا بِطَرِيقَتِكُمُ المُثْلَى", "يَذْهَبَا"), a: "nasb", why: "يُخْرِجَا'ya atıf: o da mansûb." },
      { s: HL("أَنْ يَخْرُجُوا مِنْهَا", "يَخْرُجُوا") + ' <small class="muted">(Hac 22)</small>', a: "nasb", why: "أَنْ: mansûb." },
      { s: HL("أَنْ يَقُولُوا سَمِعْنَا وَأَطَعْنَا", "يَقُولُوا") + ' <small class="muted">(Nûr 51)</small>', a: "nasb", why: "أَنْ: mansûb." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: وَصِيَّةُ وَالِدٍ", tr: "Okuma: Bir Babanın Vasiyeti", short: "Okuma", col: "muz", legend: ["mi"],
  goals: ["Bir metinde ef’âl-i hamseyi bulup i’rabını söylemek", "Emir (كُونُوا) ve tekil muzâriyi (يَعْمَلُ) ef’âl-i hamseden ayırmak", "Metindeki sıfat-ı müşebbehe, ism-i fâil, ism-i mekân ve ism-i tasğiri bulmak"],
  examples: [
    { s: "أَنْتُمْ:- / تَعْرِفُونَ:mi / أَنَّنِي أَصْبَحْتُ شَيْخًا كَبِيرًا.:-", tr: "Benim yaşlı biri olduğumu biliyorsunuz." },
    { s: "وَالصَّادِقُونَ:- / لَنْ يَنْدَمُوا:mi / أَبَدًا.:-", tr: "Doğrular asla pişman olmaz." }
  ],
  rules: [
    { tr: "Metinde ef’âl-i hamse: <span class=\"ar\">تَعْرِفُونَ، تَعْتَمِدُوا، تَفْعَلُوا، يَذْهَبَانِ، تُجَهِّزِينَ، يَنْدَمُوا</span>." },
    { tr: "<span class=\"ar\">ابْدَؤُوا، كُونُوا، اتَّقُوا</span> emirdir; <span class=\"ar\">آمَنُوا</span> mâzidir; <span class=\"ar\">يَعْمَلُ، نَكُونَ</span> ise ef’âl-i hamse kalıbında değildir." },
    { tr: "Diğer isimler: sıfat-ı müşebbehe <span class=\"ar\">كَبِيرًا، صَعْبًا</span>; ism-i fâil <span class=\"ar\">الوَالِدُ، الصَّادِقِينَ، المُسْلِمِ، دَائِمًا، مُحْسِنٌ</span>; ism-i mekân <span class=\"ar\">المَتْجَرِ</span>; ism-i tasğir <span class=\"ar\">حُسَيْنٌ</span> (حَسَنٌ'un küçültmesi)." }
  ],
  kaide: ["اقْرَأِ النَّصَّ ثُمَّ اسْتَخْرِجْ مِنْهُ: الأَفْعَالَ الخَمْسَةَ، وَالصِّفَةَ المُشَبَّهَةَ، وَاسْمَ الفَاعِلِ، وَاسْمَ المَكَانِ، وَاسْمَ التَّصْغِيرِ."],
  ex: [
    { type: "reading", num: "٨", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ مَا هُوَ مَطْلُوبٌ", tr: "Metni oku; sonra koyu kelimenin ne olduğunu seç.", title: "وَصِيَّةُ وَالِدٍ",
      text: "جَلَسَ الوَالِدُ بَيْنَ أَبْنَائِهِ وَقَالَ لَهُمْ: أَنْتُمْ تَعْرِفُونَ أَنَّنِي أَصْبَحْتُ شَيْخًا كَبِيرًا، وَلَا بُدَّ أَنْ تَعْتَمِدُوا عَلَى أَنْفُسِكُمْ، وَإِنْ لَمْ تَفْعَلُوا ذَلِكَ سَيَكُونُ الأَمْرُ صَعْبًا عَلَيْكُمْ. ابْدَؤُوا اليَوْمَ العَمَلَ بِمُفْرَدِكُمْ: حَسَنٌ وَحُسَيْنٌ يَذْهَبَانِ إِلَى الحَقْلِ، وَأَنْتِ يَا زَيْنَبُ تُجَهِّزِينَ لَهُمَا الطَّعَامَ، وَمُحْسِنٌ يَعْمَلُ فِي المَتْجَرِ. وَنَصِيحَتِي لَكُمْ: كُونُوا دَائِمًا مِنَ الصَّادِقِينَ، وَهَذَا مِنْ خُلُقِ المُسْلِمِ، وَالصَّادِقُونَ لَنْ يَنْدَمُوا أَبَدًا. وَلَقَدْ أَمَرَنَا اللهُ أَنْ نَكُونَ مَعَ الصَّادِقِينَ، قَالَ تَعَالَى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللهَ وَكُونُوا مَعَ الصَّادِقِينَ﴾ (التوبة ١١٩).",
      textTr: "Bir Babanın Vasiyeti. Baba çocuklarının arasına oturdu ve onlara dedi ki: Yaşlandığımı biliyorsunuz; artık kendinize güvenmeniz gerekiyor. Bunu yapmazsanız iş sizin için zor olacak. Bugün işe kendi başınıza başlayın: Hasan ile Hüseyin tarlaya gidiyor; sen ey Zeynep, onlara yemek hazırlıyorsun; Muhsin de dükkânda çalışıyor. Size nasihatim: Daima doğrulardan olun; bu, Müslümanın ahlâkındandır. Doğrular asla pişman olmaz. Allah bize doğrularla beraber olmamızı emretti: \"Ey iman edenler, Allah’tan sakının ve doğrularla beraber olun.\" (Tevbe 119)",
      qa: [
        { q: "مَاذَا قَالَ الوَالِدُ لِأَبْنَائِهِ؟", a: "قَالَ: لَا بُدَّ أَنْ تَعْتَمِدُوا عَلَى أَنْفُسِكُمْ.", tr: "Baba çocuklarına ne dedi? Kendinize güvenmeniz gerekir." },
        { q: "أَيْنَ يَذْهَبُ حَسَنٌ وَحُسَيْنٌ؟", a: "يَذْهَبَانِ إِلَى الحَقْلِ.", tr: "Hasan ve Hüseyin nereye gidiyor? Tarlaya." },
        { q: "مَا نَصِيحَةُ الوَالِدِ؟", a: "كُونُوا دَائِمًا مِنَ الصَّادِقِينَ.", tr: "Babanın nasihati ne? Daima doğrulardan olun." }
      ],
      cls: { opts: [["h", "Ef’âl-i hamse", "الأَفْعَالُ الخَمْسَةُ", "mi"], ["s", "Sıfat-ı müşebbehe", "صِفَةٌ مُشَبَّهَةٌ", "nasb"], ["f", "İsm-i fâil", "اسْمُ فَاعِلٍ", "cerr"], ["m", "İsm-i mekân", "اسْمُ مَكَانٍ", "mz"], ["t", "İsm-i tasğir", "اسْمُ تَصْغِيرٍ", "mun"], ["x", "Hiçbiri", "لَيْسَ مِنْهَا", "x"]], ar: "اسْتَخْرِجْ مِنَ القِطْعَةِ", tr: "Koyu kelime ne?", items: [
        { s: HL("جَلَسَ الوَالِدُ بَيْنَ أَبْنَائِهِ", "الوَالِدُ"), a: "f", why: "وَلَدَ ← وَالِدٌ: فَاعِلٌ kalıbı." },
        { s: HL("أَنْتُمْ تَعْرِفُونَ", "تَعْرِفُونَ"), a: "h", why: "Vâv-ı cemâat; merfû (nûn sabit)." },
        { s: HL("أَصْبَحْتُ شَيْخًا كَبِيرًا", "كَبِيرًا"), a: "s", why: "كَبُرَ ← كَبِيرٌ: فَعِيلٌ." },
        { s: HL("لَا بُدَّ أَنْ تَعْتَمِدُوا عَلَى أَنْفُسِكُمْ", "تَعْتَمِدُوا"), a: "h", why: "أَنْ ile mansûb; nûn düştü." },
        { s: HL("وَإِنْ لَمْ تَفْعَلُوا ذَلِكَ", "تَفْعَلُوا"), a: "h", why: "لَمْ ile meczûm." },
        { s: HL("سَيَكُونُ الأَمْرُ صَعْبًا", "صَعْبًا"), a: "s", why: "صَعُبَ ← صَعْبٌ: فَعْلٌ." },
        { s: HL("ابْدَؤُوا اليَوْمَ العَمَلَ", "ابْدَؤُوا"), a: "x", why: "Emir; ef’âl-i hamse muzâri olmalı." },
        { s: HL("حَسَنٌ وَحُسَيْنٌ يَذْهَبَانِ", "حُسَيْنٌ"), a: "t", why: "حَسَنٌ ← حُسَيْنٌ: فُعَيْلٌ, küçültme." },
        { s: HL("حَسَنٌ وَحُسَيْنٌ يَذْهَبَانِ إِلَى الحَقْلِ", "يَذْهَبَانِ"), a: "h", why: "Elif-i isneyn; merfû." },
        { s: HL("وَأَنْتِ يَا زَيْنَبُ تُجَهِّزِينَ لَهُمَا الطَّعَامَ", "تُجَهِّزِينَ"), a: "h", why: "Yâ-yı muhâtaba; merfû." },
        { s: HL("وَمُحْسِنٌ يَعْمَلُ فِي المَتْجَرِ", "مُحْسِنٌ"), a: "f", why: "أَحْسَنَ ← مُحْسِنٌ: mezîdin ism-i fâili (burada özel isim)." },
        { s: HL("يَعْمَلُ فِي المَتْجَرِ", "يَعْمَلُ"), a: "x", why: "Tekil muzâri: ef’âl-i hamse değil." },
        { s: HL("يَعْمَلُ فِي المَتْجَرِ", "المَتْجَرِ"), a: "m", why: "تَجَرَ ← مَتْجَرٌ: مَفْعَلٌ, ticaret yeri." },
        { s: HL("كُونُوا دَائِمًا مِنَ الصَّادِقِينَ", "كُونُوا"), a: "x", why: "Emir." },
        { s: HL("كُونُوا دَائِمًا مِنَ الصَّادِقِينَ", "الصَّادِقِينَ"), a: "f", why: "صَدَقَ ← صَادِقٌ: ism-i fâil." },
        { s: HL("وَهَذَا مِنْ خُلُقِ المُسْلِمِ", "المُسْلِمِ"), a: "f", why: "أَسْلَمَ ← مُسْلِمٌ: ism-i fâil." },
        { s: HL("وَالصَّادِقُونَ لَنْ يَنْدَمُوا أَبَدًا", "يَنْدَمُوا"), a: "h", why: "لَنْ ile mansûb." }
      ]},
      cls2: { opts: HAL_OPTS, ar: "إِعْرَابُ الأَفْعَالِ الخَمْسَةِ فِي القِطْعَةِ", tr: "Metindeki ef’âl-i hamsenin i’rab hükmü ne?", items: [
        { s: HL("أَنْتُمْ تَعْرِفُونَ", "تَعْرِفُونَ"), a: "ref", why: "Edat yok: nûn sabit." },
        { s: HL("أَنْ تَعْتَمِدُوا", "تَعْتَمِدُوا"), a: "nasb", why: "أَنْ: nûn düştü." },
        { s: HL("لَمْ تَفْعَلُوا", "تَفْعَلُوا"), a: "cezm", why: "لَمْ: nûn düştü." },
        { s: HL("يَذْهَبَانِ إِلَى الحَقْلِ", "يَذْهَبَانِ"), a: "ref", why: "Nûn sabit." },
        { s: HL("تُجَهِّزِينَ لَهُمَا الطَّعَامَ", "تُجَهِّزِينَ"), a: "ref", why: "Nûn sabit." },
        { s: HL("لَنْ يَنْدَمُوا أَبَدًا", "يَنْدَمُوا"), a: "nasb", why: "لَنْ: nûn düştü." }
      ]}
    }
  ]
}
];

// Doğru Fiil oyunu: [cümle {fiil}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var HM_POOL = [
  ["هُمَا {يَعْمَلَانِ}.", ["يَعْمَلَانِ", "يَعْمَلُونَ", "يَعْمَلُ"], "o ikisi: elif-i isneyn", "O ikisi çalışıyor.", "u1"],
  ["هُمْ {يَعْمَلُونَ}.", ["يَعْمَلُونَ", "يَعْمَلَانِ", "تَعْمَلِينَ"], "onlar: vâv-ı cemâat", "Onlar çalışıyor.", "u1"],
  ["أَنْتِ {تَعْمَلِينَ}.", ["تَعْمَلِينَ", "تَعْمَلُ", "تَعْمَلُونَ"], "sen (kadın): yâ-yı muhâtaba", "Sen (kadın) çalışıyorsun.", "u1"],
  ["أَنْتُمَا {تَعْمَلَانِ}.", ["تَعْمَلَانِ", "يَعْمَلَانِ", "تَعْمَلُونَ"], "siz ikiniz", "Siz ikiniz çalışıyorsunuz.", "u1"],
  ["أَنْتُمْ {تَعْمَلُونَ}.", ["تَعْمَلُونَ", "يَعْمَلُونَ", "تَعْمَلَانِ"], "siz", "Siz çalışıyorsunuz.", "u1"],
  ["الجَرِيدَتَانِ {تَصْدُرَانِ} فِي أَنْقَرَةَ.", ["تَصْدُرَانِ", "يَصْدُرَانِ", "تَصْدُرُ"], "dişil müsennâ", "İki gazete Ankara’da çıkıyor.", "u1"],
  ["الطِّفْلَتَانِ {تَشْرَبَانِ} الحَلِيبَ.", ["تَشْرَبَانِ", "يَشْرَبَانِ", "تَشْرَبُ"], "dişil müsennâ", "İki kız çocuk süt içiyor.", "u2"],
  ["الفَلَّاحَانِ {يَزْرَعَانِ} الحَقْلَ.", ["يَزْرَعَانِ", "تَزْرَعَانِ", "يَزْرَعُونَ"], "eril müsennâ", "İki çiftçi tarlayı ekiyor.", "u2"],
  ["الشُّهُودُ لَنْ {يَكْذِبُوا}.", ["يَكْذِبُوا", "يَكْذِبُونَ", "يَكْذِبَ"], "لَنْ: nûn düşer", "Şahitler yalan söylemeyecek.", "u2"],
  ["النِّسَاءُ {يَغْسِلْنَ} الأَطْبَاقَ.", ["يَغْسِلْنَ", "يَغْسِلُونَ", "تَغْسِلَانِ"], "dişil çoğul: nûn-ı nisve", "Kadınlar tabakları yıkıyor.", "u2"],
  ["المُسْلِمُونَ {يَشْكُرُونَ} اللهَ.", ["يَشْكُرُونَ", "يَشْكُرُوا", "يَشْكُرَانِ"], "edat yok: nûn kalır", "Müslümanlar Allah’a şükrediyor.", "u2"],
  ["الأَوْلَادُ {يَلْعَبُونَ} فِي الحَدِيقَةِ.", ["يَلْعَبُونَ", "يَلْعَبُ", "يَلْعَبَانِ"], "özne önde: uyum", "Çocuklar bahçede oynuyor.", "u3"],
  ["{يَلْعَبُ} الأَوْلَادُ فِي الحَدِيقَةِ.", ["يَلْعَبُ", "يَلْعَبُونَ", "يَلْعَبَانِ"], "fiil önde: tekil", "Çocuklar bahçede oynuyor.", "u3"],
  ["المَرْأَتَانِ {تَطْبُخَانِ} الطَّعَامَ.", ["تَطْبُخَانِ", "تَطْبُخُ", "يَطْبُخَانِ"], "dişil müsennâ", "İki kadın yemek pişiriyor.", "u3"],
  ["الفَرِيقَانِ لَمْ {يَنْزِلَا} إِلَى المَلْعَبِ.", ["يَنْزِلَا", "يَنْزِلَانِ", "يَنْزِلُوا"], "لَمْ: nûn düşer", "İki takım sahaya inmedi.", "u3"],
  ["الصَّادِقُونَ {يَدْخُلُونَ} الجَنَّةَ.", ["يَدْخُلُونَ", "يَدْخُلُوا", "يَدْخُلَانِ"], "edat yok", "Doğrular cennete girer.", "u3"],
  ["الطَّبِيبَانِ {يَذْهَبَانِ} إِلَى المُسْتَشْفَى.", ["يَذْهَبَانِ", "يَذْهَبَا", "يَذْهَبُوا"], "merfû: nûn sabit", "İki doktor hastaneye gidiyor.", "u4"],
  ["الصَّحَفِيُّونَ لَنْ {يَذْهَبُوا} إِلَى المُؤْتَمَرِ.", ["يَذْهَبُوا", "يَذْهَبُونَ", "يَذْهَبُو"], "mansûb: nûn düşer, elif-i fâriqa", "Gazeteciler konferansa gitmeyecek.", "u4"],
  ["الوُزَرَاءُ لَمْ {يَتْرُكُوا} القَاعَةَ.", ["يَتْرُكُوا", "يَتْرُكُونَ", "يَتْرُكَا"], "meczûm", "Bakanlar salonu terk etmedi.", "u4"],
  ["فَإِنْ لَمْ {تَفْعَلُوا} وَلَنْ تَفْعَلُوا", ["تَفْعَلُوا", "تَفْعَلُونَ", "تَفْعَلِي"], "Bakara 24", "Yapamazsanız…", "u4"],
  ["يُرِيدَانِ أَنْ {يُخْرِجَاكُمْ} مِنْ أَرْضِكُمْ", ["يُخْرِجَاكُمْ", "يُخْرِجَانِكُمْ", "يُخْرِجُوكُمْ"], "أَنْ: mansûb (Tâhâ 63)", "Sizi yurdunuzdan çıkarmak istiyorlar.", "u4"],
  ["أَنْتُمْ {تَعْرِفُونَ} أَنَّنِي أَصْبَحْتُ شَيْخًا.", ["تَعْرِفُونَ", "تَعْرِفُوا", "يَعْرِفُونَ"], "merfû", "Yaşlandığımı biliyorsunuz.", "u5"],
  ["لَا بُدَّ أَنْ {تَعْتَمِدُوا} عَلَى أَنْفُسِكُمْ.", ["تَعْتَمِدُوا", "تَعْتَمِدُونَ", "تَعْتَمِدَا"], "أَنْ: mansûb", "Kendinize güvenmeniz gerek.", "u5"],
  ["وَالصَّادِقُونَ لَنْ {يَنْدَمُوا} أَبَدًا.", ["يَنْدَمُوا", "يَنْدَمُونَ", "يَنْدَمَ"], "لَنْ: mansûb", "Doğrular asla pişman olmaz.", "u5"],
  ["وَأَنْتِ يَا زَيْنَبُ {تُجَهِّزِينَ} الطَّعَامَ.", ["تُجَهِّزِينَ", "تُجَهِّزُ", "تُجَهِّزِي"], "merfû: nûn sabit", "Sen ey Zeynep yemek hazırlıyorsun.", "u5"]
];
var HAFIZA = {
  rc: { name: "Merfû ↔ meczûm", pairs: [["يَكْتُبَانِ", "لَمْ يَكْتُبَا"], ["تَكْتُبَانِ", "لَمْ تَكْتُبَا"], ["يَكْتُبُونَ", "لَمْ يَكْتُبُوا"], ["تَكْتُبُونَ", "لَمْ تَكْتُبُوا"], ["تَكْتُبِينَ", "لَمْ تَكْتُبِي"], ["يَذْهَبُونَ", "لَنْ يَذْهَبُوا"], ["تَجْلِسِينَ", "لَنْ تَجْلِسِي"]] },
  zf: { name: "Zamir ↔ fiil", pairs: [["هُمَا (erkek)", "يَعْمَلَانِ"], ["هُمَا (kadın)", "تَعْمَلَانِ"], ["هُمْ", "يَعْمَلُونَ"], ["أَنْتُمْ", "تَعْمَلُونَ"], ["أَنْتِ", "تَعْمَلِينَ"], ["هُنَّ", "يَعْمَلْنَ"], ["هُوَ", "يَعْمَلُ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["يَذْهَبَانِ", "o ikisi gidiyor"], ["لَنْ يَذْهَبُوا", "gitmeyecekler"], ["لَمْ يَتْرُكُوا", "terk etmediler"], ["تَكْتُبِينَ", "(kadın) yazıyorsun"], ["أَنْ يَخْرُجُوا", "çıkmaları"], ["لَا تَدْخُلُوهَا", "oraya girmeyin"], ["تَعْرِفُونَ", "biliyorsunuz"], ["لَمْ تَفْعَلُوا", "yapmadınız"]] }
};
var KARTLAR = [
  ["Ef’âl-i hamse nedir?", "Sonuna elif-i isneyn, yâ-yı muhâtaba ya da vâv-ı cemâat bitişen muzâri."],
  ["Beş kalıp?", "يَفْعَلَانِ، تَفْعَلَانِ، يَفْعَلُونَ، تَفْعَلُونَ، تَفْعَلِينَ"],
  ["Merfûda i’rab alameti?", "Nûnun kalması (ثُبُوتُ النُّونِ): يَذْهَبَانِ"],
  ["Mansûb ve meczûmda?", "Nûnun düşmesi (حَذْفُ النُّونِ): لَنْ يَذْهَبُوا، لَمْ يَتْرُكُوا"],
  ["Elif-i fâriqa nedir?", "Nûn düşünce vâv-ı cemâatten sonra yazılan okunmayan elif: يَكْتُبُوا"],
  ["يَكْتُبْنَ ef’âl-i hamse mi?", "Hayır: nûn-ı nisve; fiil mebnîdir."],
  ["كَتَبُوا ve اُكْتُبُوا?", "Mâzi ve emir; ef’âl-i hamse değil (muzâri olmalı)."],
  ["Fiil önde iken?", "Tekil kalır: يَلْعَبُ الأَوْلَادُ. Özne önde: الأَوْلَادُ يَلْعَبُونَ"],
  ["Dişil müsennâ hangi harfle başlar?", "تَـ ile: الطَّالِبَتَانِ تَدْخُلَانِ"],
  ["يَقْرَآنِ ne?", "يَقْرَأَانِ: hemze + elif → آ; elif-i isneyn, ef’âl-i hamse."],
  ["فَلَا تَدْخُلُوهَا: hüküm?", "لَا-yı nâhiye ile meczûm; nûn düştü, sonra هَا geldi."],
  ["Nasb ve cezm edatları?", "Nasb: أَنْ، لَنْ، كَيْ · Cezm: لَمْ، لَمَّا، لَا (nâhiye)"]
];
