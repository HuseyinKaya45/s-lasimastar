// ================= VERİ: Zamirler (الضَّمَائِرُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "mi.ـكَ" gibi yazılırsa etikete not eklenir.
var ROLES = {
  mz: { ar: "ضَمِيرٌ مُنْفَصِلٌ", tr: "Munfasıl zamir" }, mi: { ar: "ضَمِيرٌ مُتَّصِلٌ بِالاسْمِ", tr: "İsme bitişik" },
  nasb: { ar: "ضَمِيرُ نَصْبٍ", tr: "Fiile bitişik (mef'ûl)" }, ref: { ar: "خَبَرٌ", tr: "Haber" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
var AILE_OPTS = [["ny", "ـنِي (beni)", "يَاءُ المُتَكَلِّمِ", "x"], ["na", "نَا (bizi)", "نَا المُتَكَلِّمِينَ", "x"], ["h", "ـهُ ailesi (onu, onları)", "هَاءُ الغَائِبِ", "x"], ["k", "ـكَ ailesi (seni, sizi)", "كَافُ الخِطَابِ", "x"]];
var ZTUR_OPTS = [["nasb", "Fiile bitişik nasb (mef'ûl)", "ضَمِيرُ نَصْبٍ", "x"], ["ref", "Fiile bitişik ref (fâil)", "ضَمِيرُ رَفْعٍ", "x"], ["isim", "İsme bitişik", "مُتَّصِلٌ بِالاسْمِ", "x"], ["harf", "Harfe bitişik", "مُتَّصِلٌ بِالحَرْفِ", "x"]];

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^\[(.*)\](.*)$/.exec(w), p = /^\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
// önce müsennâ, sonra cem: aynı kutular, farklı doğru
function P2(q, parts, okM, okC, trM, trC, whyM, whyC) {
  return [CB(q + " <b class=\"r-mz\">→ ikil</b>", parts, okM, trM, whyM), CB(q + " <b class=\"r-nasb\">→ çoğul</b>", parts, okC, trC, whyC)];
}

// Zamir tablosu: [satır, sütun, etiket, munfasıl, ek, كِتَاب, نَصَحَ, يَنْصَحُ, لِـ, بِـ, Türkçe isim, Türkçe fiil, örnek, şahıs]
var ZT = [
  [0, 0, "Gâib · tekil", "هُوَ", "ـهُ", "كِتَابُهُ", "نَصَحَهُ", "يَنْصَحُهُ", "لَهُ", "بِهِ", "onun kitabı", "onu öğütledi", "هُوَ طَالِبٌ", "g"],
  [0, 1, "Gâib · ikil", "هُمَا", "ـهُمَا", "كِتَابُهُمَا", "نَصَحَهُمَا", "يَنْصَحُهُمَا", "لَهُمَا", "بِهِمَا", "o ikisinin kitabı", "o ikisini öğütledi", "هُمَا طَالِبَانِ", "g"],
  [0, 2, "Gâib · çoğul", "هُمْ", "ـهُمْ", "كِتَابُهُمْ", "نَصَحَهُمْ", "يَنْصَحُهُمْ", "لَهُمْ", "بِهِمْ", "onların kitabı", "onları öğütledi", "هُمْ طُلَّابٌ", "g"],
  [1, 0, "Gâibe · tekil", "هِيَ", "ـهَا", "كِتَابُهَا", "نَصَحَهَا", "يَنْصَحُهَا", "لَهَا", "بِهَا", "onun (kadın) kitabı", "onu (kadını) öğütledi", "هِيَ طَالِبَةٌ", "g"],
  [1, 1, "Gâibe · ikil", "هُمَا", "ـهُمَا", "كِتَابُهُمَا", "نَصَحَهُمَا", "يَنْصَحُهُمَا", "لَهُمَا", "بِهِمَا", "o ikisinin (kadın) kitabı", "o ikisini (kadınları) öğütledi", "هُمَا طَالِبَتَانِ", "g"],
  [1, 2, "Gâibe · çoğul", "هُنَّ", "ـهُنَّ", "كِتَابُهُنَّ", "نَصَحَهُنَّ", "يَنْصَحُهُنَّ", "لَهُنَّ", "بِهِنَّ", "onların (kadınların) kitabı", "onları (kadınları) öğütledi", "هُنَّ طَالِبَاتٌ", "g"],
  [2, 0, "Muhatab · tekil", "أَنْتَ", "ـكَ", "كِتَابُكَ", "نَصَحَكَ", "يَنْصَحُكَ", "لَكَ", "بِكَ", "senin kitabın", "seni öğütledi", "أَنْتَ طَالِبٌ", "m"],
  [2, 1, "Muhatab · ikil", "أَنْتُمَا", "ـكُمَا", "كِتَابُكُمَا", "نَصَحَكُمَا", "يَنْصَحُكُمَا", "لَكُمَا", "بِكُمَا", "ikinizin kitabı", "ikinizi öğütledi", "أَنْتُمَا طَالِبَانِ", "m"],
  [2, 2, "Muhatab · çoğul", "أَنْتُمْ", "ـكُمْ", "كِتَابُكُمْ", "نَصَحَكُمْ", "يَنْصَحُكُمْ", "لَكُمْ", "بِكُمْ", "sizin kitabınız", "sizi öğütledi", "أَنْتُمْ طُلَّابٌ", "m"],
  [3, 0, "Muhataba · tekil", "أَنْتِ", "ـكِ", "كِتَابُكِ", "نَصَحَكِ", "يَنْصَحُكِ", "لَكِ", "بِكِ", "senin (kadın) kitabın", "seni (kadını) öğütledi", "أَنْتِ طَالِبَةٌ", "m"],
  [3, 1, "Muhataba · ikil", "أَنْتُمَا", "ـكُمَا", "كِتَابُكُمَا", "نَصَحَكُمَا", "يَنْصَحُكُمَا", "لَكُمَا", "بِكُمَا", "ikinizin (kadın) kitabı", "ikinizi (kadınları) öğütledi", "أَنْتُمَا طَالِبَتَانِ", "m"],
  [3, 2, "Muhataba · çoğul", "أَنْتُنَّ", "ـكُنَّ", "كِتَابُكُنَّ", "نَصَحَكُنَّ", "يَنْصَحُكُنَّ", "لَكُنَّ", "بِكُنَّ", "sizin (kadınların) kitabınız", "sizi (kadınları) öğütledi", "أَنْتُنَّ طَالِبَاتٌ", "m"],
  [4, 0, "Mütekellim · tekil", "أَنَا", "ـي / ـنِي", "كِتَابِي", "نَصَحَنِي", "يَنْصَحُنِي", "لِي", "بِي", "benim kitabım", "beni öğütledi", "أَنَا طَالِبٌ · أَنَا طَالِبَةٌ", "t"],
  [4, 1, "Mütekellim · ikil ve çoğul", "نَحْنُ", "ـنَا", "كِتَابُنَا", "نَصَحَنَا", "يَنْصَحُنَا", "لَنَا", "بِنَا", "bizim kitabımız", "bizi öğütledi", "نَحْنُ طَالِبَانِ · نَحْنُ طُلَّابٌ", "t"]
];
var ZT_ROWS = [["Gâib", "الغَائِبُ", "muz"], ["Gâibe", "الغَائِبَةُ", "mun"], ["Muhatab", "المُخَاطَبُ", "muz"], ["Muhataba", "المُخَاطَبَةُ", "mun"], ["Mütekellim", "المُتَكَلِّمُ", "accent"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · MUNFASIL ZAMİRLER
{
  id: "u1", no: 1, ar: "ضَمَائِرُ الرَّفْعِ المُنْفَصِلَةُ", tr: "Munfasıl (Ayrı) Zamirler", short: "Munfasıl", col: "mz", legend: ["mz", "ref"],
  goals: ["On iki munfasıl zamiri şahıs, cinsiyet ve sayıyla eşleştirmek", "هُمَا، أَنْتُمَا ve نَحْنُ'un birden fazla durumu karşıladığını bilmek", "Zamire göre haberi tekil, ikil ya da çoğul yapmak"],
  examples: [
    { s: "أَنَا:mz / طَالِبٌ:ref", tr: "Ben öğrenciyim.", pair: "أَنَا:mz / طَالِبَةٌ:ref", pairTr: "Ben (kız) öğrenciyim." },
    { s: "نَحْنُ:mz / طَالِبَانِ:ref", tr: "Biz iki öğrenciyiz.", pair: "نَحْنُ:mz / طَالِبَتَانِ:ref", pairTr: "Biz iki kız öğrenciyiz." },
    { s: "نَحْنُ:mz / طُلَّابٌ:ref", tr: "Biz öğrencileriz.", pair: "نَحْنُ:mz / طَالِبَاتٌ:ref", pairTr: "Biz kız öğrencileriz." },
    { s: "أَنْتَ:mz / طَالِبٌ:ref", tr: "Sen öğrencisin.", pair: "أَنْتِ:mz / طَالِبَةٌ:ref", pairTr: "Sen (kız) öğrencisin." },
    { s: "أَنْتُمَا:mz / طَالِبَانِ:ref", tr: "Siz ikiniz öğrencisiniz.", pair: "أَنْتُمَا:mz / طَالِبَتَانِ:ref", pairTr: "Siz iki kız öğrencisiniz." },
    { s: "أَنْتُمْ:mz / طُلَّابٌ:ref", tr: "Siz öğrencilersiniz.", pair: "أَنْتُنَّ:mz / طَالِبَاتٌ:ref", pairTr: "Siz kız öğrencilersiniz." },
    { s: "هُوَ:mz / طَالِبٌ:ref", tr: "O öğrencidir.", pair: "هِيَ:mz / طَالِبَةٌ:ref", pairTr: "O (kız) öğrencidir." },
    { s: "هُمَا:mz / طَالِبَانِ:ref", tr: "Onlar iki öğrencidir.", pair: "هُمَا:mz / طَالِبَتَانِ:ref", pairTr: "Onlar iki kız öğrencidir." },
    { s: "هُمْ:mz / طُلَّابٌ:ref", tr: "Onlar öğrencidir.", pair: "هُنَّ:mz / طَالِبَاتٌ:ref", pairTr: "Onlar kız öğrencidir." }
  ],
  rules: [
    { tr: "Zamir; konuşanı (<b>mütekellim</b>), karşıdakini (<b>muhatab</b>) ya da orada olmayanı (<b>gâib</b>) gösterir." },
    { tr: "Zamir iki çeşittir: <b class=\"r-mz\">munfasıl</b> (ayrı yazılan, tek başına söylenen) ve <b class=\"r-mi\">muttasıl</b> (bitişik)." },
    { tr: "<b>Mütekellim</b>: <span class=\"ar\">أَنَا</span> tekil (erkek ve kadın), <span class=\"ar\">نَحْنُ</span> ikil ve çoğul (erkek ve kadın).", ex: ["أَنَا مُدِيرٌ · أَنَا مُدِيرَةٌ", "نَحْنُ مُدَرِّسَانِ · نَحْنُ مُدَرِّسُونَ"] },
    { tr: "<b>Muhatab</b> (erkek): <span class=\"ar\">أَنْتَ، أَنْتُمَا، أَنْتُمْ</span>. <b>Muhataba</b> (kadın): <span class=\"ar\">أَنْتِ، أَنْتُمَا، أَنْتُنَّ</span>.", ex: ["أَنْتَ طَبِيبٌ", "أَنْتُمْ أَطِبَّاءُ", "أَنْتُنَّ طَبِيبَاتٌ"] },
    { tr: "<b>Gâib</b> (erkek): <span class=\"ar\">هُوَ، هُمَا، هُمْ</span>. <b>Gâibe</b> (kadın): <span class=\"ar\">هِيَ، هُمَا، هُنَّ</span>.", ex: ["هُوَ مُهَنْدِسٌ", "هُمْ مُهَنْدِسُونَ", "هُنَّ مُهَنْدِسَاتٌ"] },
    { tr: "Bunlara <b>ref zamirleri</b> denir; cümlede genelde mübtedâ olurlar. Haber zamire uyar. <span class=\"ar\">هُمَا، أَنْتُمَا، نَحْنُ</span> birden fazla duruma yaradığı için cinsiyeti ve sayıyı haber gösterir." }
  ],
  kaide: [
    "١ ـ الضَّمِيرُ يَدُلُّ عَلَى المُتَكَلِّمِ / المُتَكَلِّمَةِ أَوِ المُخَاطَبِ / المُخَاطَبَةِ أَوِ الغَائِبِ / الغَائِبَةِ.",
    "٢ ـ الضَّمِيرُ نَوْعَانِ: مُنْفَصِلٌ وَمُتَّصِلٌ. المُنْفَصِلُ يُنْطَقُ وَيُكْتَبُ مُنْفَصِلًا (مُسْتَقِلًّا).",
    "٣ ـ أ) لِلْمُتَكَلِّمِ ضَمِيرَانِ: أَنَا، نَحْنُ. ب) لِلْمُخَاطَبِ: أَنْتَ، أَنْتُمَا، أَنْتُمْ. ج) لِلْمُخَاطَبَةِ: أَنْتِ، أَنْتُمَا، أَنْتُنَّ. د) لِلْغَائِبِ: هُوَ، هُمَا، هُمْ. هـ) لِلْغَائِبَةِ: هِيَ، هُمَا، هُنَّ.",
    "٤ ـ تُسَمَّى هَذِهِ الضَّمَائِرُ ضَمَائِرَ الرَّفْعِ المُنْفَصِلَةَ."
  ],
  ex: [
    { type: "pick", fill: true, num: "١", ar: "ضَعِ الضَّمِيرَ المُنْفَصِلَ المُنَاسِبَ", tr: "Habere bak (erkek mi, kadın mı; tekil mi, ikil mi, çoğul mu?) ve uygun zamiri seç.", exHtml: "<span class=\"ar\">هُوَ جَالِسٌ فِي الغُرْفَةِ. (هُوَ – أَنْتُمَا – نَحْنُ)</span>", items: [
      { q: "___ حَرِيصَةٌ عَلَى أَطْفَالِهَا.", o: ["هُمَا", "أَنْتُنَّ", "هِيَ"], a: 2, tr: "O (kadın) çocuklarına düşkündür.", why: "Haber müennes tekil: هِيَ." },
      { q: "___ لَاعِبُونَ فِي الحَدِيقَةِ.", o: ["أَنْتَ", "نَحْنُ", "أَنْتُمَا"], a: 1, tr: "Biz bahçede oynuyoruz.", why: "Haber çoğul: seçeneklerde yalnız نَحْنُ çoğula uyar." },
      { q: "___ طُلَّابٌ يَدْرُسُونَ فِي الجَامِعَةِ.", o: ["أَنْتُمَا", "هُمْ", "أَنَا"], a: 1, tr: "Onlar üniversitede okuyan öğrencilerdir.", why: "Haber çoğul, fiil gâib (يَدْرُسُونَ): هُمْ." },
      { q: "___ مُسَافِرٌ بَعْدَ أُسْبُوعٍ.", o: ["أَنَا", "هُمَا", "هُمْ"], a: 0, tr: "Bir hafta sonra yola çıkıyorum.", why: "Haber tekil: أَنَا." },
      { q: "___ وَاقِفَتَانِ أَمَامَ السَّيَّارَةِ.", o: ["أَنْتِ", "هُنَّ", "هُمَا"], a: 2, tr: "O iki kadın arabanın önünde duruyor.", why: "Haber müennes ikil: هُمَا." },
      { q: "___ عَامِلَاتٌ فِي المَصْنَعِ.", o: ["هُنَّ", "أَنْتُمَا", "هُمْ"], a: 0, tr: "Onlar (kadınlar) fabrikada işçidir.", why: "Haber müennes çoğul: هُنَّ." },
      { q: "___ مُصَلُّونَ فِي هَذَا المَسْجِدِ.", o: ["أَنْتُنَّ", "هُمَا", "نَحْنُ"], a: 2, tr: "Biz bu mescitte namaz kılarız.", why: "Haber müzekker çoğul: نَحْنُ." },
      { q: "___ مُدَرِّسَاتٌ فِي الثَّانَوِيَّةِ.", o: ["أَنْتِ", "نَحْنُ", "هِيَ"], a: 1, tr: "Biz lisede öğretmeniz (kadın).", why: "Haber müennes çoğul: نَحْنُ." }
    ]},
    { type: "combo", num: "٢", ar: "حَوِّلِ الضَّمِيرَ إِلَى المُثَنَّى وَالجَمْعِ وَغَيِّرْ مَا يَلْزَمُ", tr: "أَنَا ← نَحْنُ. Zamir aynı kalır; haberi önce ikil, sonra çoğul yap.",
      exHtml: "<span class=\"ar\">أَنَا طَالِبٌ فِي الجَامِعَةِ ← نَحْنُ طَالِبَانِ فِي الجَامِعَةِ ← نَحْنُ طُلَّابٌ فِي الجَامِعَةِ</span>", items: [].concat(
      P2("أَنَا مُسَافِرَةٌ لِلدِّرَاسَةِ.", ["نَحْنُ", ["مُسَافِرَةٌ", "مُسَافِرَتَانِ", "مُسَافِرَاتٌ", "مُسَافِرُونَ"], "لِلدِّرَاسَةِ."], [1], [2], "Biz iki kadın okumak için yolcuyuz.", "Biz (kadınlar) okumak için yolcuyuz.", "Müennes ikil: ـتَانِ.", "Müennes çoğul: ـَاتٌ."),
      P2("أَنَا طَيَّارٌ تُرْكِيٌّ.", ["نَحْنُ", ["طَيَّارٌ", "طَيَّارَانِ", "طَيَّارُونَ"], ["تُرْكِيٌّ", "تُرْكِيَّانِ", "تُرْكِيُّونَ", "أَتْرَاكٌ"]], [1, 1], [[2, 2], [2, 3]], "Biz iki Türk pilotuz.", "Biz Türk pilotlarız.", "Haber ve sıfatı ikil.", "Çoğul: طَيَّارُونَ تُرْكِيُّونَ (أَتْرَاكٌ da olur)."),
      P2("أَنَا تَاجِرَةٌ فِي أُسْكُدَارَ.", ["نَحْنُ", ["تَاجِرَةٌ", "تَاجِرَتَانِ", "تَاجِرَاتٌ", "تُجَّارٌ"], "فِي أُسْكُدَارَ."], [1], [2], "Biz iki kadın Üsküdar'da tüccarız.", "Biz (kadınlar) Üsküdar'da tüccarız.", "Müennes ikil.", "Müennes çoğul."),
      P2("أَنَا حَرِيصٌ عَلَى صَلَوَاتِي.", ["نَحْنُ", ["حَرِيصٌ", "حَرِيصَانِ", "حَرِيصُونَ"], "عَلَى", ["صَلَوَاتِي", "صَلَوَاتِنَا"]], [1, 1], [2, 1], "Biz ikimiz namazlarımıza düşkünüz.", "Biz namazlarımıza düşkünüz.", "Zamir de değişir: صَلَوَاتِي ← صَلَوَاتِنَا.", "Zamir: ـنَا."),
      P2("أَنَا رَحِيمَةٌ بِأَوْلَادِي.", ["نَحْنُ", ["رَحِيمَةٌ", "رَحِيمَتَانِ", "رَحِيمَاتٌ"], ["بِأَوْلَادِي", "بِأَوْلَادِنَا"]], [1, 1], [2, 1], "Biz iki kadın çocuklarımıza şefkatliyiz.", "Biz (kadınlar) çocuklarımıza şefkatliyiz.", "Müennes ikil; zamir ـنَا.", "Müennes çoğul; zamir ـنَا."),
      P2("أَنَا مُهْتَمٌّ بِاللُّغَةِ العَرَبِيَّةِ.", ["نَحْنُ", ["مُهْتَمٌّ", "مُهْتَمَّانِ", "مُهْتَمُّونَ"], "بِاللُّغَةِ العَرَبِيَّةِ."], [1], [2], "Biz ikimiz Arapçayla ilgiliyiz.", "Biz Arapçayla ilgiliyiz.", "İkil: ـانِ.", "Çoğul: ـُونَ."),
      P2("أَنَا سَاكِنٌ فِي شَقَّةٍ.", ["نَحْنُ", ["سَاكِنٌ", "سَاكِنَانِ", "سَاكِنُونَ"], "فِي شَقَّةٍ."], [1], [2], "Biz ikimiz bir dairede oturuyoruz.", "Biz bir dairede oturuyoruz.", "İkil.", "Çoğul."),
      P2("أَنَا مُحَاسِبَةٌ فِي الشَّرِكَةِ.", ["نَحْنُ", ["مُحَاسِبَةٌ", "مُحَاسِبَتَانِ", "مُحَاسِبَاتٌ"], "فِي الشَّرِكَةِ."], [1], [2], "Biz iki kadın şirkette muhasebeciyiz.", "Biz (kadınlar) şirkette muhasebeciyiz.", "Müennes ikil.", "Müennes çoğul.")
    )},
    { type: "combo", num: "٣", ar: "حَوِّلِ الضَّمِيرَ إِلَى المُثَنَّى وَالجَمْعِ وَغَيِّرْ مَا يَلْزَمُ", tr: "أَنْتَ / أَنْتِ ← أَنْتُمَا ← أَنْتُمْ / أَنْتُنَّ. Hem zamiri hem haberi seç.",
      exHtml: "<span class=\"ar\">أَنْتَ مُسَافِرٌ إِلَى أَنْقَرَةَ ← أَنْتُمَا مُسَافِرَانِ ← أَنْتُمْ مُسَافِرُونَ</span>", items: [].concat(
      P2("أَنْتَ ذَاهِبٌ إِلَى السُّوقِ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["ذَاهِبَانِ", "ذَاهِبُونَ", "ذَاهِبَاتٌ"], "إِلَى السُّوقِ."], [0, 0], [1, 1], "Siz ikiniz çarşıya gidiyorsunuz.", "Siz çarşıya gidiyorsunuz.", "أَنْتُمَا + ikil.", "Erkek çoğul: أَنْتُمْ + ـُونَ."),
      P2("أَنْتِ عَائِدَةٌ مِنَ العَمَلِ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["عَائِدَتَانِ", "عَائِدُونَ", "عَائِدَاتٌ"], "مِنَ العَمَلِ."], [0, 0], [2, 2], "Siz iki kadın işten dönüyorsunuz.", "Siz (kadınlar) işten dönüyorsunuz.", "أَنْتُمَا + müennes ikil.", "Kadın çoğul: أَنْتُنَّ + ـَاتٌ."),
      P2("أَنْتَ مُنْتَظِرٌ مُنْذُ سَاعَةٍ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["مُنْتَظِرَانِ", "مُنْتَظِرُونَ", "مُنْتَظِرَاتٌ"], "مُنْذُ سَاعَةٍ."], [0, 0], [1, 1], "Siz ikiniz bir saattir bekliyorsunuz.", "Siz bir saattir bekliyorsunuz.", "İkil.", "Erkek çoğul."),
      P2("أَنْتِ امْرَأَةٌ صَالِحَةٌ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["امْرَأَتَانِ", "نِسَاءٌ", "امْرَأَةٌ"], ["صَالِحَتَانِ", "صَالِحَاتٌ", "صَالِحَةٌ"]], [0, 0, 0], [2, 1, 1], "Siz iki salih kadınsınız.", "Siz salih kadınlarsınız.", "امْرَأَتَانِ صَالِحَتَانِ.", "امْرَأَةٌ'in çoğulu نِسَاءٌ; sıfat صَالِحَاتٌ."),
      P2("أَنْتَ وَلَدٌ مُطِيعٌ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["وَلَدَانِ", "أَوْلَادٌ", "وَلَدٌ"], ["مُطِيعَانِ", "مُطِيعُونَ", "مُطِيعٌ"]], [0, 0, 0], [1, 1, 1], "Siz iki itaatkâr çocuksunuz.", "Siz itaatkâr çocuklarsınız.", "وَلَدَانِ مُطِيعَانِ.", "Kırık çoğul أَوْلَادٌ; sıfat مُطِيعُونَ."),
      P2("أَنْتَ أُسْتَاذٌ فِي الجَامِعَةِ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["أُسْتَاذَانِ", "أَسَاتِذَةٌ", "أُسْتَاذُونَ"], "فِي الجَامِعَةِ."], [0, 0], [1, 1], "Siz ikiniz üniversitede hocasınız.", "Siz üniversitede hocalarsınız.", "İkil.", "Çoğul: kırık çoğul أَسَاتِذَةٌ."),
      P2("أَنْتِ مُخْتَصَّةٌ فِي التَّارِيخِ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["مُخْتَصَّتَانِ", "مُخْتَصُّونَ", "مُخْتَصَّاتٌ"], "فِي التَّارِيخِ."], [0, 0], [2, 2], "Siz iki kadın tarih uzmanısınız.", "Siz (kadınlar) tarih uzmanısınız.", "İkil.", "Kadın çoğul: أَنْتُنَّ مُخْتَصَّاتٌ."),
      P2("أَنْتِ سَاكِنَةٌ فِي شَارِعٍ وَاسِعٍ.", [["أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ"], ["سَاكِنَتَانِ", "سَاكِنُونَ", "سَاكِنَاتٌ"], "فِي شَارِعٍ وَاسِعٍ."], [0, 0], [2, 2], "Siz iki kadın geniş bir caddede oturuyorsunuz.", "Siz (kadınlar) geniş bir caddede oturuyorsunuz.", "İkil.", "Kadın çoğul.")
    )},
    { type: "combo", num: "٤", ar: "حَوِّلِ الضَّمِيرَ إِلَى المُثَنَّى وَالجَمْعِ وَغَيِّرْ مَا يَلْزَمُ", tr: "هُوَ / هِيَ ← هُمَا ← هُمْ / هُنَّ.",
      exHtml: "<span class=\"ar\">هُوَ ضَابِطٌ فِي الجَيْشِ ← هُمَا ضَابِطَانِ ← هُمْ ضُبَّاطٌ</span>", items: [].concat(
      P2("هُوَ مُتَحَدِّثٌ بِالعَرَبِيَّةِ.", [["هُمَا", "هُمْ", "هُنَّ"], ["مُتَحَدِّثَانِ", "مُتَحَدِّثُونَ", "مُتَحَدِّثَاتٌ"], "بِالعَرَبِيَّةِ."], [0, 0], [1, 1], "O ikisi Arapça konuşuyor.", "Onlar Arapça konuşuyor.", "İkil.", "Erkek çoğul."),
      P2("هِيَ مَاهِرَةٌ فِي السِّبَاحَةِ.", [["هُمَا", "هُمْ", "هُنَّ"], ["مَاهِرَتَانِ", "مَاهِرُونَ", "مَاهِرَاتٌ"], "فِي السِّبَاحَةِ."], [0, 0], [2, 2], "O iki kadın yüzmede ustadır.", "Onlar (kadınlar) yüzmede ustadır.", "Müennes ikil.", "Kadın çoğul: هُنَّ."),
      P2("هُوَ رَاكِضٌ بِسُرْعَةٍ.", [["هُمَا", "هُمْ", "هُنَّ"], ["رَاكِضَانِ", "رَاكِضُونَ", "رَاكِضَاتٌ"], "بِسُرْعَةٍ."], [0, 0], [1, 1], "O ikisi hızla koşuyor.", "Onlar hızla koşuyor.", "İkil.", "Erkek çoğul."),
      P2("هِيَ قَادِمَةٌ مَشْيًا.", [["هُمَا", "هُمْ", "هُنَّ"], ["قَادِمَتَانِ", "قَادِمُونَ", "قَادِمَاتٌ"], "مَشْيًا."], [0, 0], [2, 2], "O iki kadın yürüyerek geliyor.", "Onlar (kadınlar) yürüyerek geliyor.", "Müennes ikil.", "Kadın çoğul."),
      P2("هُوَ شَدِيدٌ عَلَى الطُّلَّابِ.", [["هُمَا", "هُمْ", "هُنَّ"], ["شَدِيدَانِ", "شَدِيدُونَ", "شِدَادٌ", "شَدِيدَاتٌ"], "عَلَى الطُّلَّابِ."], [0, 0], [[1, 1], [1, 2]], "O ikisi öğrencilere karşı serttir.", "Onlar öğrencilere karşı serttir.", "İkil.", "Çoğul: شَدِيدُونَ ya da kırık çoğul شِدَادٌ."),
      P2("هِيَ مُخْلِصَةٌ فِي العَمَلِ.", [["هُمَا", "هُمْ", "هُنَّ"], ["مُخْلِصَتَانِ", "مُخْلِصُونَ", "مُخْلِصَاتٌ"], "فِي العَمَلِ."], [0, 0], [2, 2], "O iki kadın işinde ihlaslıdır.", "Onlar (kadınlar) işinde ihlaslıdır.", "Müennes ikil.", "Kadın çoğul."),
      P2("هُوَ مُسْتَمِعٌ إِلَى المُدِيرِ.", [["هُمَا", "هُمْ", "هُنَّ"], ["مُسْتَمِعَانِ", "مُسْتَمِعُونَ", "مُسْتَمِعَاتٌ"], "إِلَى المُدِيرِ."], [0, 0], [1, 1], "O ikisi müdürü dinliyor.", "Onlar müdürü dinliyor.", "İkil.", "Erkek çoğul.")
    )},
    { type: "combo", num: "٥", ar: "أَعِدِ الجُمَلَ التَّالِيَةَ مُبْتَدِئًا بِمَا بَيْنَ القَوْسَيْنِ", tr: "Cümleyi parantezdeki zamirle yeniden kur: haber (ve sıfatı) zamire uysun.",
      exHtml: "<span class=\"ar\">أَنَا طَالِبٌ مِنْ تُرْكِيَا. (هُمْ) ← هُمْ طُلَّابٌ مِنْ تُرْكِيَا.</span>", items: [
      CB("أَنْتُنَّ نَاجِحَاتٌ فِي الدُّرُوسِ. <span class=\"muted\">(أَنَا)</span>", ["أَنَا", ["نَاجِحَاتٌ", "نَاجِحَةٌ", "نَاجِحٌ", "نَاجِحَانِ"], "فِي الدُّرُوسِ."], [[1], [2]], "Derslerde başarılıyım.", "أَنَا tekildir; konuşan kadınsa نَاجِحَةٌ, erkekse نَاجِحٌ."),
      CB("نَحْنُ مُوَظَّفُونَ فِي الدَّوْلَةِ. <span class=\"muted\">(أَنْتُنَّ)</span>", ["أَنْتُنَّ", ["مُوَظَّفُونَ", "مُوَظَّفَاتٌ", "مُوَظَّفَتَانِ"], "فِي الدَّوْلَةِ."], [1], "Siz (kadınlar) devlet memurusunuz.", "أَنْتُنَّ: kadın çoğul → ـَاتٌ."),
      CB("هِيَ ذَاهِبَةٌ إِلَى السُّوقِ. <span class=\"muted\">(هُمَا)</span>", ["هُمَا", ["ذَاهِبَةٌ", "ذَاهِبَتَانِ", "ذَاهِبَاتٌ"], "إِلَى السُّوقِ."], [1], "O iki kadın çarşıya gidiyor.", "Cümle kadınlardan söz ediyor: müennes ikil."),
      CB("أَنْتُمْ قَلِقُونَ هَذَا الصَّبَاحَ. <span class=\"muted\">(هُنَّ)</span>", ["هُنَّ", ["قَلِقُونَ", "قَلِقَاتٌ", "قَلِقَتَانِ"], "هَذَا الصَّبَاحَ."], [1], "Onlar (kadınlar) bu sabah endişeli.", "هُنَّ → ـَاتٌ."),
      CB("هُمْ جَالِسُونَ فِي المُخْتَبَرِ. <span class=\"muted\">(أَنْتِ)</span>", ["أَنْتِ", ["جَالِسُونَ", "جَالِسَةٌ", "جَالِسٌ"], "فِي المُخْتَبَرِ."], [1], "Sen (kadın) laboratuvarda oturuyorsun.", "أَنْتِ → müennes tekil."),
      CB("أَنْتُمَا دَارِسَانِ بِكُلِّيَّةِ الآدَابِ. <span class=\"muted\">(أَنْتُمْ)</span>", ["أَنْتُمْ", ["دَارِسَانِ", "دَارِسُونَ", "دَارِسَاتٌ"], "بِكُلِّيَّةِ الآدَابِ."], [1], "Siz edebiyat fakültesinde okuyorsunuz.", "أَنْتُمْ → ـُونَ."),
      CB("أَنْتَ صَحَفِيٌّ نَشِيطٌ. <span class=\"muted\">(نَحْنُ)</span>", ["نَحْنُ", ["صَحَفِيٌّ", "صَحَفِيُّونَ", "صَحَفِيَّانِ"], ["نَشِيطٌ", "نَشِيطُونَ", "نَشِيطَانِ"]], [[1, 1], [2, 2]], "Biz çalışkan gazetecileriz.", "نَحْنُ ikil ya da çoğul olabilir; haber ve sıfat birbirine uymalı."),
      CB("أَنْتِ لَاعِبَةٌ مَاهِرَةٌ. <span class=\"muted\">(هُوَ)</span>", ["هُوَ", ["لَاعِبَةٌ", "لَاعِبٌ", "لَاعِبُونَ"], ["مَاهِرَةٌ", "مَاهِرٌ", "مَاهِرُونَ"]], [1, 1], "O usta bir oyuncudur.", "هُوَ → müzekker tekil.")
    ]},
    { type: "pick", fill: true, num: "٦", ar: "أَكْمِلِ الحِوَارَاتِ التَّالِيَةَ بِضَمَائِرِ الرَّفْعِ المُنْفَصِلَةِ", tr: "Diyaloglardaki boşluklara uygun zamiri koy. Kimden söz edildiğine dikkat et.", items: [
      { q: "ـ مِنْ أَيْنَ ___ يَا عَائِشَةُ؟", o: ["أَنْتَ", "أَنْتِ", "هِيَ"], a: 1, tr: "Nerelisin Âişe?", why: "Âişe'ye hitap: muhataba → أَنْتِ." },
      { q: "ـ ___ مِنْ أَنْقَرَةَ، وَمِنْ أَيْنَ أَنْتَ يَا مُصْطَفَى؟", o: ["أَنَا", "هِيَ", "أَنْتِ"], a: 0, tr: "Ben Ankaralıyım; sen nerelisin Mustafa?", why: "Âişe kendinden söz ediyor: أَنَا." },
      { q: "ـ ___ مِنْ إِزْمِيتَ.", o: ["هُوَ", "أَنَا", "أَنْتَ"], a: 1, tr: "Ben İzmitliyim.", why: "Mustafa kendinden söz ediyor: أَنَا." },
      { q: "ـ أَيْنَ أَخُوكَ؟ ـ ___ مَعَ أَصْدِقَائِهِ فِي المَكْتَبَةِ.", o: ["هُوَ", "هُمْ", "أَنْتَ"], a: 0, tr: "Kardeşin nerede? O arkadaşlarıyla kütüphanede.", why: "Kardeş: gâib tekil → هُوَ. (Kitapta «أصدقاءه»; doğrusu أَصْدِقَائِهِ.)" },
      { q: "ـ … ___ يَسْتَعِدُّونَ لِلِامْتِحَانِ.", o: ["هُمَا", "هُمْ", "هُوَ"], a: 1, tr: "Onlar sınava hazırlanıyor.", why: "Fiil çoğul (يَسْتَعِدُّونَ): هُمْ." },
      { q: "ـ فِي أَيِّ كُلِّيَّةٍ يَدْرُسُ أَحْمَدُ وَسَلِيمٌ؟ ـ ___ يَدْرُسَانِ فِي كُلِّيَّةِ الطِّبِّ.", o: ["هُمْ", "هُمَا", "أَنْتُمَا"], a: 1, tr: "Ahmed ve Selîm hangi fakültede okuyor? Onlar tıp fakültesinde okuyor.", why: "İki kişi: هُمَا." },
      { q: "ـ … وَ___ كُلِّيَّةٌ كَبِيرَةٌ جِدًّا.", o: ["هُوَ", "هِيَ", "هُمَا"], a: 1, tr: "Ve o çok büyük bir fakültedir.", why: "Fakülte (كُلِّيَّةٌ) müennes: هِيَ." },
      { q: "ـ انْظُرْ إِلَى هَؤُلَاءِ الطَّالِبَاتِ! ـ نَعَمْ، ___ مُجْتَهِدَاتٌ جِدًّا.", o: ["هُمْ", "هُنَّ", "هِيَ"], a: 1, tr: "Şu kız öğrencilere bak! Evet, onlar çok çalışkan.", why: "Kız öğrenciler: هُنَّ." },
      { q: "ـ هَلْ فَرِيقُنَا سَيَغْلِبُ هَذِهِ المَرَّةَ؟ ـ نَعَمْ، بِالتَّأْكِيدِ. ___ اسْتَعَدُّوا لِلْمُبَارَاةِ جَيِّدًا.", o: ["هُوَ", "هُمْ", "نَحْنُ"], a: 1, tr: "Takımımız bu sefer kazanacak mı? Evet, kesinlikle. Onlar maça iyi hazırlandı.", why: "Fiil اسْتَعَدُّوا gâib çoğul: هُمْ." },
      { q: "ـ هَلْ أَحْمَدُ وَسُلَيْمَانُ فِي حُجْرَتِهِمَا؟ ـ لَا، ___ فِي السُّوقِ الآنَ.", o: ["هُمَا", "هُمْ", "أَنْتُمَا"], a: 0, tr: "Ahmed ve Süleyman odalarında mı? Hayır, onlar şimdi çarşıda.", why: "İki kişi: هُمَا." },
      { q: "ـ سَأَنْتَظِرُكَ فِي بَيْتِي اللَّيْلَةَ، هَلْ ___ مَشْغُولٌ هَذَا المَسَاءَ؟", o: ["أَنْتَ", "أَنَا", "هُوَ"], a: 0, tr: "Bu gece seni evimde bekleyeceğim; bu akşam meşgul müsün?", why: "Karşıdakine soruluyor: أَنْتَ." },
      { q: "ـ نَعَمْ، ___ مَشْغُولٌ جِدًّا.", o: ["أَنْتَ", "أَنَا", "نَحْنُ"], a: 1, tr: "Evet, çok meşgulüm.", why: "Cevaplayan kendinden söz ediyor: أَنَا. (Kitapta boşluktan sonra ayrıca «أنا» yazılmış; tekrar olmasın diye birini aldık.)" },
      { q: "ـ مُنْذُ مَتَى ___ عَامِلَانِ فِي هَذِهِ الشَّرِكَةِ؟", o: ["أَنْتُمَا", "أَنْتُمْ", "هُمَا"], a: 0, tr: "Ne zamandan beri bu şirkette çalışıyorsunuz (ikiniz)?", why: "İki kişiye soruluyor: أَنْتُمَا." },
      { q: "ـ ___ عَامِلَانِ مُنْذُ خَمْسِ سِنِينَ.", o: ["نَحْنُ", "هُمَا", "أَنْتُمَا"], a: 0, tr: "Beş yıldır çalışıyoruz.", why: "Cevaplayan ikisi: نَحْنُ (ikil de olur)." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · İSME BİTİŞİK ZAMİRLER
{
  id: "u2", no: 2, ar: "الضَّمَائِرُ المُتَّصِلَةُ بِالاسْمِ", tr: "İsme Bitişik Zamirler", short: "İsme bitişik", col: "mi", legend: ["mi", "ref"],
  goals: ["İsme eklenen zamirleri tanımak: ـي، ـنَا، ـكَ ailesi, ـهُ ailesi", "Bu zamirlerin muzâfun ileyh olduğunu, ismin ال ve tenvin almadığını bilmek", "ـهُ ailesinin kesreli harften ya da ي'den sonra kesre aldığını uygulamak"],
  examples: [
    { s: "قَلَمُكَ:mi.ـكَ: senin / مَكْسُورٌ:ref", tr: "Senin kalemin kırık." },
    { s: "بَيْتُهُ:mi.ـهُ: onun / وَاسِعٌ:ref", tr: "Onun evi geniş." },
    { s: "كِتَابِي:mi.ـي: benim / جَدِيدٌ:ref", tr: "Benim kitabım yeni." },
    { s: "كَلَامُهَا:mi.ـهَا: onun (kadın) / مَفْهُومٌ:ref", tr: "Onun (kadının) sözü anlaşılır." },
    { s: "رَبُّنَا:mi.ـنَا: bizim / غَفُورٌ:ref", tr: "Rabbimiz çok bağışlayıcıdır." },
    { s: "خُلُقُهُمْ:mi.ـهُمْ: onların / حَسَنٌ:ref", tr: "Onların ahlakı güzeldir." }
  ],
  rules: [
    { tr: "İsme bitişen zamirler: <span class=\"ar\">ـي</span> (benim), <span class=\"ar\">ـنَا</span> (bizim), <span class=\"ar\">ـكَ، ـكِ، ـكُمَا، ـكُمْ، ـكُنَّ</span> (senin, sizin), <span class=\"ar\">ـهُ، ـهَا، ـهُمَا، ـهُمْ، ـهُنَّ</span> (onun, onların).", ex: ["كِتَابِي", "كِتَابُنَا", "كِتَابُكَ", "كِتَابُهُمْ"] },
    { tr: "İsme bitişen zamir <b>muzâfun ileyh</b>tir; isim muzâf olur, bu yüzden ال ve tenvin almaz.", ex: ["كِتَابٌ ← كِتَابُهُ", "الكِتَابُ ← كِتَابِي"] },
    { tr: "Bu zamirler harflere de bitişir.", ex: ["لَهُ", "بِهِ", "لَكُمْ", "بِكُمْ", "إِنَّهُ", "عَلَيْهِ"] },
    { tr: "<span class=\"ar\">ـهُ، ـهُمَا، ـهُمْ، ـهُنَّ</span>; kesreli harften ya da ي'den sonra <b>kesreli</b> okunur.", ex: ["بِهِ · بِهِمَا · بِهِمْ · بِهِنَّ", "عَلَيْهِ · عَلَيْهِمَا · عَلَيْهِمْ · عَلَيْهِنَّ", "فِي بَيْتِهِ · لَهُ (kesre yok)"] },
    { tr: "İnsan dışı çoğul için tekil müennes zamir kullanılır: <span class=\"ar\">النُّقُودُ ← سَارِقُهَا</span>." }
  ],
  kaide: [
    "١ ـ الضَّمَائِرُ المُتَّصِلَةُ بِالاسْمِ: (ي) المُتَكَلِّمِ: كِتَابِي. (نَا) المُتَكَلِّمِينَ: كِتَابُنَا. (ك) المُخَاطَبِ: كِتَابُكَ، كِتَابُكِ، كِتَابُكُمَا، كِتَابُكُمْ، كِتَابُكُنَّ. (هـ) الغَائِبِ: كِتَابُهُ، كِتَابُهَا، كِتَابُهُمَا، كِتَابُهُمْ، كِتَابُهُنَّ.",
    "٢ ـ هَذِهِ الضَّمَائِرُ تَقَعُ مُضَافًا إِلَيْهِ عِنْدَ اتِّصَالِهَا بِالاسْمِ.",
    "٣ ـ هَذِهِ الضَّمَائِرُ تَتَّصِلُ بِالحُرُوفِ أَيْضًا، مِثْلُ: لَهُ، بِهِ، لَكُمْ، بِكُمْ، إِنَّهُ، عَلَيْهِ.",
    "٤ ـ تَكُونُ الضَّمَائِرُ (ه – هما – هم – هنّ) مَكْسُورَةً إِذَا جَاءَتْ بَعْدَ الحَرْفِ المَكْسُورِ أَوْ حَرْفِ اليَاءِ، مِثْلُ: بِهِ، بِهِمَا، بِهِمْ، بِهِنَّ، عَلَيْهِ، عَلَيْهِمَا، عَلَيْهِمْ، عَلَيْهِنَّ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "ضَعْ خَطًّا تَحْتَ الضَّمِيرِ المُتَّصِلِ بِالاسْمِ", tr: "Sonunda isme bitişik zamir olan kelimeye dokun. Dikkat: fiile bitişik zamirler (رَجَعُوا، كَتَبْتُ) hedef değil.", exHtml: "<span class=\"ar\">ذَهَبَ الطَّالِبُ بِسَيَّارَتِ<u>هِ</u>.</span>", items: [
      W("سَأَلَ الأُسْتَاذُ الطَّالِبَ عَنْ [بَلَدِهِ].", "Hoca öğrenciye memleketini sordu.", "بَلَدِهِ: ـهِ (kesreli harften sonra)."),
      W("قَرَأَتْ فَاطِمَةُ مِنْ [كِتَابِهَا].", "Fâtıma kitabından okudu.", "كِتَابِهَا: ـهَا."),
      W("الجَارُ خَرَجَ مِنْ [بَيْتِهِ].", "Komşu evinden çıktı.", "بَيْتِهِ: ـهِ."),
      W("أَحْمَدُ يَجْلِسُ مَعَ [صَدِيقِهِ].", "Ahmed arkadaşıyla oturuyor.", "صَدِيقِهِ: ـهِ."),
      W("الوُزَرَاءُ رَجَعُوا إِلَى [بِلَادِهِمْ].", "Bakanlar ülkelerine döndü.", "بِلَادِهِمْ: ـهِمْ. رَجَعُوا'daki و fiile bitişik ref zamiridir."),
      W("يَذْهَبُ النَّاسُ إِلَى [أَعْمَالِهِمْ].", "İnsanlar işlerine gider.", "أَعْمَالِهِمْ: ـهِمْ."),
      W("فَقَدَتْ عَائِشَةُ [قَلَمَهَا].", "Âişe kalemini kaybetti.", "قَلَمَهَا: ـهَا."),
      W("كَتَبْتُ اليَوْمَ رِسَالَةً إِلَى [أُسْرَتِي].", "Bugün aileme bir mektup yazdım.", "أُسْرَتِي: ـي. كَتَبْتُ'daki تُ fiile bitişik ref zamiridir.")
    ]},
    { type: "pick", fill: true, num: "٢", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الكَلِمَةِ المُنَاسِبَةِ", tr: "Zamir kime dönüyor? Cinsiyet ve sayıya bak.", exHtml: "<span class=\"ar\">يَفْتَحُ الطُّلَّابُ كُتُبَهُمْ.</span>", items: [
      { q: "تَرَكَ حَسَنٌ ___ فِي المَصْنَعِ.", o: ["عَمَلَهُ", "عَمَلَهُمَا", "عَمَلَهَا"], a: 0, tr: "Hasan işini fabrikada bıraktı.", why: "Hasan: ـهُ." },
      { q: "دَخَلَتْ خَدِيجَةُ ___ الجَدِيدَ.", o: ["بَيْتَهُ", "بَيْتَهُمْ", "بَيْتَهَا"], a: 2, tr: "Hatice yeni evine girdi.", why: "Hatice: ـهَا." },
      { q: "قَرَأَ الأَبُ ___.", o: ["كِتَابَهَا", "كِتَابَهُمْ", "كِتَابَهُ"], a: 2, tr: "Baba kitabını okudu.", why: "Baba: ـهُ." },
      { q: "وَضَعَ الضَّيْفُ ___ فِي الحَقِيبَةِ.", o: ["ثِيَابَهَا", "ثِيَابَهُ", "ثِيَابَهُمْ"], a: 1, tr: "Misafir elbiselerini çantaya koydu.", why: "Misafir: ـهُ." },
      { q: "رَكِبَ المُدِيرُ ___.", o: ["سَيَّارَتَهُمْ", "سَيَّارَتَهُ", "سَيَّارَتَهُمَا"], a: 1, tr: "Müdür arabasına bindi.", why: "Müdür: ـهُ." },
      { q: "شَكَرَتِ البَنَاتُ ___ عَلَى الهَدَايَا الجَمِيلَةِ.", o: ["أُمَّهُنَّ", "أُمَّهُمْ", "أُمَّهَا"], a: 0, tr: "Kızlar güzel hediyeler için annelerine teşekkür etti.", why: "Kızlar: ـهُنَّ." },
      { q: "فَرِحَ الأَسَاتِذَةُ بِنَجَاحِ ___.", o: ["طُلَّابِهَا", "طُلَّابِهِنَّ", "طُلَّابِهِمْ"], a: 2, tr: "Hocalar öğrencilerinin başarısına sevindi.", why: "Hocalar (erkek çoğul): ـهِمْ (kesreli harften sonra)." },
      { q: "اسْتَقْبَلَ المُوَظَّفُونَ ___ الجَدِيدَ.", o: ["صَدِيقَهُ", "صَدِيقَهُمَا", "صَدِيقَهُمْ"], a: 2, tr: "Memurlar yeni arkadaşlarını karşıladı.", why: "Memurlar: ـهُمْ." }
    ]},
    { type: "combo", num: "٣", ar: "اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِالضَّمِيرِ المُتَّصِلِ المُنَاسِبِ", tr: "Paranteze giren kelimeyi isme bitişik zamire çevir.", exHtml: "<span class=\"ar\">رَكِبْتُ سَيَّارَةَ (عَلِيٍّ) ← رَكِبْتُ سَيَّارَتَهُ.</span>", items: [
      CB("شَكَرَ العَمِيدُ جُهُودَ (أَنْتُمْ).", ["شَكَرَ العَمِيدُ", ["جُهُودَهُمْ", "جُهُودَكُمْ", "جُهُودَكَ", "جُهُودَنَا"]], [1], "Dekan çabalarınıza teşekkür etti.", "أَنْتُمْ → ـكُمْ."),
      CB("إِنَّ مَنْزِلَ (نَحْنُ) وَاسِعٌ.", ["إِنَّ", ["مَنْزِلِي", "مَنْزِلَنَا", "مَنْزِلَهُمْ", "مَنْزِلَكُمْ"], "وَاسِعٌ."], [1], "Evimiz geniştir.", "نَحْنُ → ـنَا."),
      CB("حَضَرَ سَائِقُ (الحَافِلَةِ).", ["حَضَرَ", ["سَائِقُهُ", "سَائِقُهَا", "سَائِقُهُمْ"]], [1], "Otobüsün şoförü geldi.", "الحَافِلَةُ müennes → ـهَا."),
      CB("بَنَاتُ (مَحْمُودٍ) مُهَذَّبَاتٌ.", [["بَنَاتُهَا", "بَنَاتُهُ", "بَنَاتُهُنَّ"], "مُهَذَّبَاتٌ."], [1], "Onun kızları terbiyelidir.", "Mahmud → ـهُ (zamir kızlara değil Mahmud'a döner)."),
      CB("أَعْرِفُ كَاتِبَ (القِصَّةِ).", ["أَعْرِفُ", ["كَاتِبَهُ", "كَاتِبَهَا", "كَاتِبَهُمْ"]], [1], "Onun (hikâyenin) yazarını tanıyorum.", "القِصَّةُ müennes → ـهَا."),
      CB("عَاقَبَ القَاضِي سَارِقَ (النُّقُودِ).", ["عَاقَبَ القَاضِي", ["سَارِقَهُمْ", "سَارِقَهَا", "سَارِقَهُ"]], [1], "Hâkim paranın hırsızını cezalandırdı.", "النُّقُودُ insan dışı çoğul → tekil müennes zamir: ـهَا."),
      CB("إِنَّ دَرَجَاتِ (فَاطِمَةَ) عَالِيَةٌ.", ["إِنَّ", ["دَرَجَاتِهِ", "دَرَجَاتِهَا", "دَرَجَاتِهِنَّ"], "عَالِيَةٌ."], [1], "Onun notları yüksektir.", "Fâtıma → ـهَا."),
      CB("سَلَّمَ الوَزِيرُ عَلَى (أَحْمَدَ).", ["سَلَّمَ الوَزِيرُ", ["عَلَيْهُ", "عَلَيْهِ", "عَلَاهُ"]], [1], "Bakan ona selam verdi.", "ي'den sonra ـهُ kesreli okunur: عَلَيْهِ.")
    ]},
    { type: "combo", num: "٤", ar: "حَوِّلْ ضَمِيرَ المُخَاطَبِ إِلَى ضَمِيرِ الغَائِبِ", tr: "Muhatab zamirini (ـكَ ailesi) aynı cinsiyet ve sayıdaki gâib zamirine (ـهُ ailesi) çevir. Kesre kuralına dikkat!", exHtml: "<span class=\"ar\">رَأَيْتُ وَالِدَكَ أَمَامَ المَدْرَسَةِ ← رَأَيْتُ وَالِدَهُ أَمَامَ المَدْرَسَةِ.</span>", items: [
      CB("فَرِحَ مُصْطَفَى بِنَجَاحِكُمْ.", ["فَرِحَ مُصْطَفَى", ["بِنَجَاحِهُمْ", "بِنَجَاحِهِمْ", "بِنَجَاحِهِ"]], [1], "Mustafa onların başarısına sevindi.", "ـكُمْ ← ـهُمْ; kesreli حِ'dan sonra kesreli: بِنَجَاحِهِمْ."),
      CB("سَيَّارَتُكَ الجَدِيدَةُ جَمِيلَةٌ جِدًّا.", [["سَيَّارَتُهَا", "سَيَّارَتُهُ", "سَيَّارَتُهِ"], "الجَدِيدَةُ جَمِيلَةٌ جِدًّا."], [1], "Onun yeni arabası çok güzel.", "ـكَ ← ـهُ. (Kitapta «جميل»; سَيَّارَةٌ müennes olduğu için جَمِيلَةٌ.)"),
      CB("يَذْهَبُ أَوْلَادُكِ إِلَى السُّوقِ.", ["يَذْهَبُ", ["أَوْلَادُهُ", "أَوْلَادُهَا", "أَوْلَادُهُنَّ"], "إِلَى السُّوقِ."], [1], "Onun (kadının) çocukları çarşıya gidiyor.", "ـكِ ← ـهَا."),
      CB("نَظَرَ الرَّجُلُ إِلَيْكُمَا.", ["نَظَرَ الرَّجُلُ", ["إِلَيْهُمَا", "إِلَيْهِمَا", "إِلَيْهَا"]], [1], "Adam o ikisine baktı.", "ـكُمَا ← ـهُمَا; ي'den sonra kesreli: إِلَيْهِمَا."),
      CB("أَخَذْتُ حَقِيبَتَكُمْ مِنْ فَوْقِ المِنْضَدَةِ.", ["أَخَذْتُ", ["حَقِيبَتَهُ", "حَقِيبَتَهُمْ", "حَقِيبَتَهِمْ"], "مِنْ فَوْقِ المِنْضَدَةِ."], [1], "Masanın üstünden onların çantasını aldım.", "ـكُمْ ← ـهُمْ (fethadan sonra damme kalır)."),
      CB("حَضَرْتُ لِوَدَاعِكُنَّ.", ["حَضَرْتُ", ["لِوَدَاعِهُنَّ", "لِوَدَاعِهِنَّ", "لِوَدَاعِهِمْ"]], [1], "Onları (kadınları) uğurlamaya geldim.", "ـكُنَّ ← ـهُنَّ; kesreden sonra: لِوَدَاعِهِنَّ."),
      CB("لَا أَقْبَلُ رَأْيَكَ.", ["لَا أَقْبَلُ", ["رَأْيَهَا", "رَأْيَهُ", "رَأْيَهُمْ"]], [1], "Onun görüşünü kabul etmiyorum.", "ـكَ ← ـهُ."),
      CB("أَخْلَاقُكَ حَسَنَةٌ.", [["أَخْلَاقُهُ", "أَخْلَاقُهَا", "أَخْلَاقُهِ"], "حَسَنَةٌ."], [0], "Onun ahlakı güzeldir.", "ـكَ ← ـهُ.")
    ]},
    { type: "combo", num: "٥", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ بِجُمَلٍ تَامَّةٍ", tr: "Cevapta zamir değişir: \"senin\" diye sorulana \"benim\", \"sizin\" diye sorulana \"bizim\" diye cevap verilir. (Kitapta cevaplar serbest; burada örnek cevaplar var.)", exHtml: "<span class=\"ar\">أَيْنَ صَدِيقُكَ؟ ← صَدِيقِي فِي البَيْتِ.</span>", items: [
      CB("إِلَى أَيْنَ سَافَرَ وَالِدُكُمْ؟", ["سَافَرَ", ["وَالِدُكُمْ", "وَالِدُنَا", "وَالِدِي"], "إِلَى أَنْقَرَةَ."], [1], "Babamız Ankara'ya gitti.", "ـكُمْ diye sorulana ـنَا ile cevap."),
      CB("أَيْنَ يَسْكُنُ أُسْتَاذُكَ؟", ["يَسْكُنُ", ["أُسْتَاذُكَ", "أُسْتَاذِي", "أُسْتَاذُنَا"], "فِي إِسْطَنْبُولَ."], [1], "Hocam İstanbul'da oturuyor.", "ـكَ → ـي."),
      CB("أَيْنَ يَدْرُسُ أَوْلَادُكَ؟", ["يَدْرُسُ", ["أَوْلَادُهُ", "أَوْلَادُكَ", "أَوْلَادِي"], "فِي المَدْرَسَةِ القَرِيبَةِ."], [2], "Çocuklarım yakındaki okulda okuyor.", "ـكَ → ـي."),
      CB("مَتَى وَصَلَتْ حَافِلَتُكِ؟", ["وَصَلَتْ", ["حَافِلَتِي", "حَافِلَتُكِ", "حَافِلَتُهَا"], "صَبَاحًا."], [0], "Otobüsüm sabah geldi.", "ـكِ → ـي."),
      CB("أَيْنَ يَجْلِسُ زُمَلَاؤُكَ؟", ["يَجْلِسُ", ["زُمَلَاؤُكَ", "زُمَلَاؤُهُ", "زُمَلَائِي"], "فِي الصَّفِّ."], [2], "Arkadaşlarım sınıfta oturuyor.", "ـكَ → ـي; ي'den önce hemze yâ üzerine yazılır: زُمَلَائِي."),
      CB("كَمْ قَمِيصًا لَكَ؟", [["لَكَ", "لِي", "لَهُ"], "ثَلَاثَةُ قُمْصَانٍ."], [1], "Üç gömleğim var.", "لَكَ → لِي."),
      CB("مَاذَا أَخَذَ الأُسْتَاذُ مِنْكُمْ؟", ["أَخَذَ", ["مِنْكُمْ", "مِنْهُمْ", "مِنَّا"], "الوَاجِبَاتِ."], [2], "Hoca bizden ödevleri aldı.", "مِنْكُمْ → مِنَّا (مِنْ + نَا)."),
      CB("مَتَى تَرْجِعُ إِلَى بَلَدِكَ؟", ["أَرْجِعُ إِلَى", ["بَلَدِكَ", "بَلَدِهِ", "بَلَدِي"], "فِي الصَّيْفِ."], [2], "Yazın memleketime dönüyorum.", "ـكَ → ـي.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · FİİLE BİTİŞİK NASB ZAMİRLERİ
{
  id: "u3", no: 3, ar: "ضَمَائِرُ النَّصْبِ المُتَّصِلَةُ بِالأَفْعَالِ", tr: "Fiile Bitişik Nasb Zamirleri", short: "Fiile bitişik", col: "nasb", legend: ["nasb", "ref"],
  goals: ["Fiile bitişen nasb zamirlerini tanımak: ـنِي، ـنَا، ـهُ ailesi, ـكَ ailesi", "Bu zamirlerin mef'ûl bih olduğunu bilmek", "نَصَحَنَا (bizi öğütledi) ile نَصَحْنَا (biz öğütledik) farkını ayırmak"],
  examples: [
    { s: "مَنَحَنِي:nasb.ـنِي: beni / المُدِيرُ:- / كِتَابًا:-", tr: "Müdür bana bir kitap verdi." },
    { s: "أَمَرَهُمُ:nasb.ـهُمْ: onları / المُدَرِّسُ:- / بِالجُلُوسِ:-", tr: "Öğretmen onlara oturmalarını emretti." },
    { s: "الأُسْتَاذُ:- / نَصَحَنَا:nasb.ـنَا: bizi", tr: "Hoca bize öğüt verdi." },
    { s: "يَأْمُرُنَا:nasb.ـنَا: bizi / الإِسْلَامُ:- / بِالعَدْلِ:-", tr: "İslâm bize adaleti emreder." },
    { s: "يَطْلُبُكَ:nasb.ـكَ: seni / الطَّبِيبُ:-", tr: "Doktor seni istiyor." },
    { s: "يَحْفَظُهَا:nasb.ـهَا: onu / الطَّالِبُ:-", tr: "Öğrenci onu ezberliyor." }
  ],
  rules: [
    { tr: "Fiile bitişen nasb zamirleri: <span class=\"ar\">ـنِي</span> (beni), <span class=\"ar\">ـنَا</span> (bizi), <span class=\"ar\">ـهُ، ـهَا، ـهُمَا، ـهُمْ، ـهُنَّ</span> (onu, onları), <span class=\"ar\">ـكَ، ـكِ، ـكُمَا، ـكُمْ، ـكُنَّ</span> (seni, sizi).", ex: ["نَصَحَنِي", "نَصَحَنَا", "نَصَحَهُ", "نَصَحَكَ"] },
    { tr: "Fiile bitişen bu zamirler <b>mef'ûl bih</b>tir (mahallen mansûb)." },
    { tr: "Mütekellim tekilde fiilde <span class=\"ar\">ـنِي</span> gelir (nûn-ı vikâye ile); isimde ise sadece <span class=\"ar\">ـي</span>: <span class=\"ar\">نَصَحَنِي</span> ama <span class=\"ar\">كِتَابِي</span>." },
    { tr: "Dikkat: <span class=\"ar\">نَا</span> fiilde iki görevde olabilir. <span class=\"ar\">نَصَحَنَا</span> (lâm fethalı): bizi öğütledi, mef'ûl. <span class=\"ar\">نَصَحْنَا</span> (lâm sakin): biz öğütledik, fâil." },
    { tr: "Zamir fiile bitişince fâil ondan sonra gelir: <span class=\"ar\">أَمَرَهُمُ المُدَرِّسُ</span>. İnsan dışı çoğul için <span class=\"ar\">ـهَا</span>: <span class=\"ar\">جَمَعَ الكُتُبَ فَنَقَلَهَا</span>." }
  ],
  kaide: [
    "١ ـ ضَمَائِرُ النَّصْبِ المُتَّصِلَةُ بِالأَفْعَالِ: يَاءُ المُتَكَلِّمِ: نَصَحَنِي. «نَا» المُتَكَلِّمِينَ: نَصَحَنَا. هَاءُ الغَائِبِ بِفُرُوعِهَا: نَصَحَهُ، نَصَحَهَا، نَصَحَهُمَا، نَصَحَهُمْ، نَصَحَهُنَّ. كَافُ الخِطَابِ بِفُرُوعِهَا: نَصَحَكَ، نَصَحَكِ، نَصَحَكُمَا، نَصَحَكُمْ، نَصَحَكُنَّ.",
    "٢ ـ إِذَا اتَّصَلَتِ الأَفْعَالُ بِضَمَائِرِ النَّصْبِ تَكُونُ الضَّمَائِرُ فِي مَحَلِّ نَصْبٍ مَفْعُولًا بِهِ."
  ],
  ex: [
    { type: "classify", num: "١", opts: AILE_OPTS, ar: "عَيِّنْ ضَمَائِرَ النَّصْبِ المُتَّصِلَةَ بِالأَفْعَالِ الصَّحِيحَةِ", tr: "Fiile bitişik nasb zamiri hangisi? Dikkat: تُ ve فَاعِل olan نَا fâildir, mef'ûl değil.", exHtml: "<span class=\"ar\">سَأَلَنِي الوَزِيرُ عَنِ اسْمِي ← يَاءُ المُتَكَلِّمِ</span>", items: [
      { s: "الطَّالِبُ <b class=\"hl\">وَعَدَنَا</b> بِالنَّجَاحِ.", a: "na", why: "وَعَدَنَا: \"bize söz verdi\"; lâm fethalı → نَا mef'ûl.", tr: "Öğrenci bize başarı sözü verdi." },
      { s: "<b class=\"hl\">سَلَّمَكُمْ</b> مُوَظَّفُ البَرِيدِ الطَّرْدَ.", a: "k", why: "ـكُمْ: sizi (size).", tr: "Postane memuru paketi size teslim etti." },
      { s: "<b class=\"hl\">بَلَغَهُ</b> خَبَرُ نَجَاحِهِ.", a: "h", why: "ـهُ: ona (ulaştı).", tr: "Başarısının haberi ona ulaştı." },
      { s: "<b class=\"hl\">جَمَعَهُمُ</b> المُدَرِّسُ أَمَامَ المَكْتَبَةِ.", a: "h", why: "ـهُمْ: onları.", tr: "Öğretmen onları kütüphanenin önünde topladı." },
      { s: "<b class=\"hl\">حَسِبْتُهُ</b> نَائِمًا.", a: "h", why: "ـهُ: onu. (تُ fâil zamiridir.)", tr: "Onu uyuyor sandım." },
      { s: "الأُسْتَاذُ <b class=\"hl\">يَطْلُبُكُمْ</b>.", a: "k", why: "ـكُمْ: sizi.", tr: "Hoca sizi istiyor." },
      { s: "<b class=\"hl\">نَقَلْنَاهُ</b> إِلَى البَيْتِ.", a: "h", why: "Mef'ûl ـهُ'dir. نَا burada fâildir (lâm sakin: نَقَلْنَا = biz taşıdık).", tr: "Onu eve taşıdık." },
      { s: "<b class=\"hl\">مَنَعَهُمُ</b> الحَارِسُ مِنَ الدُّخُولِ.", a: "h", why: "ـهُمْ: onları.", tr: "Bekçi onları girmekten alıkoydu." }
    ]},
    { type: "pick", num: "٢", ar: "اخْتَرِ التَّكْمِلَةَ الصَّحِيحَةَ", tr: "Zamir kime dönüyor? Cümlenin başındaki isme bak.", items: [
      { q: "وَصَلَ الوَزِيرُ إِلَى المَطَارِ…", o: ["اسْتَقْبَلَهُ المَسْؤُولُونَ.", "اسْتَقْبَلَهُمَا المَسْؤُولُونَ.", "اسْتَقْبَلَهُمُ المَسْؤُولُونَ."], a: 0, tr: "Bakan havalimanına vardı; yetkililer onu karşıladı.", why: "Bakan tekil: ـهُ." },
      { q: "حَضَرَ المُدَرِّسُونَ الحَفْلَ…", o: ["فَشَكَرَهَا العَمِيدُ.", "فَشَكَرَهُمَا العَمِيدُ.", "فَشَكَرَهُمُ العَمِيدُ."], a: 2, tr: "Öğretmenler törene geldi; dekan onlara teşekkür etti.", why: "Öğretmenler: ـهُمْ." },
      { q: "ذَهَبْنَا إِلَى بَيْتِ الجَارِ…", o: ["فَأَكْرَمَنَا.", "فَأَكْرَمَكُمْ.", "فَأَكْرَمَهَا."], a: 0, tr: "Komşunun evine gittik; bize ikram etti.", why: "Biz: ـنَا." },
      { q: "وَجَدْتُ شُبَّاكَ البَيْتِ مُغْلَقًا…", o: ["فَفَتَحْتُهَا.", "فَفَتَحْتُهُنَّ.", "فَفَتَحْتُهُ."], a: 2, tr: "Evin penceresini kapalı buldum ve onu açtım.", why: "شُبَّاكٌ müzekker tekil: ـهُ." },
      { q: "دَخَلَ المُدِيرُ إِلَى العُمَّالِ…", o: ["فَنَصَحَهُمَا.", "فَنَصَحَهُنَّ.", "فَنَصَحَهُمْ."], a: 2, tr: "Müdür işçilerin yanına girdi ve onlara öğüt verdi.", why: "İşçiler: ـهُمْ." },
      { q: "كَتَبْتُ مَقَالَةً فِي الخُلُقِ الحَسَنِ…", o: ["فَقَرَأْتُهُ فِي الكُلِّيَّةِ.", "فَقَرَأْتُهَا فِي الكُلِّيَّةِ.", "فَقَرَأْتُهُمْ فِي الكُلِّيَّةِ."], a: 1, tr: "Güzel ahlak hakkında bir makale yazdım ve onu fakültede okudum.", why: "مَقَالَةٌ müennes: ـهَا." },
      { q: "جَمَعَ المُدَرِّسُ الكُتُبَ…", o: ["فَنَقَلَهُ إِلَى الجَامِعَةِ.", "فَنَقَلَهُمْ إِلَى الجَامِعَةِ.", "فَنَقَلَهَا إِلَى الجَامِعَةِ."], a: 2, tr: "Öğretmen kitapları topladı ve onları üniversiteye taşıdı.", why: "Kitaplar insan dışı çoğul: tekil müennes ـهَا." },
      { q: "اسْتَقْبَلَ المَسْؤُولُونَ الوَزِيرَ…", o: ["فَشَكَرَهُمْ.", "فَشَكَرَهُ.", "فَشَكَرَهَا."], a: 0, tr: "Yetkililer bakanı karşıladı; o da onlara teşekkür etti.", why: "Bakan (fâil, gizli) yetkililere teşekkür etti: ـهُمْ." }
    ]},
    { type: "combo", num: "٣", ar: "اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِضَمِيرِ نَصْبٍ مُتَّصِلٍ", tr: "Paranteze giren mef'ûlü fiile bitişik zamire çevir.", exHtml: "<span class=\"ar\">عَلَّمْتُ (مَحْمُودًا) السِّبَاحَةَ ← عَلَّمْتُهُ السِّبَاحَةَ</span><br><span class=\"ar\">أَخَذَ صَدِيقِي (أَنَا) إِلَى السُّوقِ ← أَخَذَنِي صَدِيقِي إِلَى السُّوقِ</span>", items: [
      CB("أَكْرَمْتُ (الضَّيْفَيْنِ) فِي المَطْعَمِ.", [["أَكْرَمْتُهُ", "أَكْرَمْتُهُمَا", "أَكْرَمْتُهُمْ"], "فِي المَطْعَمِ."], [1], "Onları (ikisini) lokantada ağırladım.", "İki misafir: ـهُمَا."),
      CB("سَأَلَ الأُسْتَاذُ (نَحْنُ) عَنْ مَوْعِدِ الامْتِحَانِ.", [["سَأَلْنَا", "سَأَلَنَا", "سَأَلَنِي"], "الأُسْتَاذُ عَنْ مَوْعِدِ الامْتِحَانِ."], [1], "Hoca bize sınavın tarihini sordu.", "Bizi sordu: سَأَلَنَا (lâm fethalı). سَأَلْنَا \"biz sorduk\" olurdu."),
      CB("أَمَرَ اللهُ (المُسْلِمِينَ) بِالتَّقْوَى.", [["أَمَرَهُ", "أَمَرَهُمُ", "أَمَرَهُنَّ"], "اللهُ بِالتَّقْوَى."], [1], "Allah onlara takvayı emretti.", "Müslümanlar: ـهُمْ; ال'den önce ـهُمُ okunur."),
      CB("نَقَلْتُ (المُسَافِرَيْنِ) إِلَى المَطَارِ.", [["نَقَلْتُهُمْ", "نَقَلْتُهُمَا", "نَقَلْتُهُ"], "إِلَى المَطَارِ."], [1], "Onları (iki yolcuyu) havalimanına götürdüm.", "İki yolcu: ـهُمَا."),
      CB("تَرَكَ العَامِلُ (الحَقِيبَةَ) فِي الصَّيْدَلِيَّةِ.", [["تَرَكَهُ", "تَرَكَهَا", "تَرَكَهُمْ"], "العَامِلُ فِي الصَّيْدَلِيَّةِ."], [1], "İşçi onu (çantayı) eczanede bıraktı.", "الحَقِيبَةُ müennes: ـهَا."),
      CB("جَمَعَ الوَالِدُ (الأَطْفَالَ) فِي الحَدِيقَةِ.", [["جَمَعَهُ", "جَمَعَهَا", "جَمَعَهُمُ"], "الوَالِدُ فِي الحَدِيقَةِ."], [2], "Baba onları bahçede topladı.", "Çocuklar insan: ـهُمْ."),
      CB("وَجَدْتُ (الوَلَدَ) نَائِمًا.", [["وَجَدْتُهُ", "وَجَدْتُهَا", "وَجَدْتُهُمْ"], "نَائِمًا."], [0], "Onu uyurken buldum.", "Çocuk: ـهُ."),
      CB("قَرَأْتُ (الصُّحُفَ) أَمَامَ البَيْتِ.", [["قَرَأْتُهُمْ", "قَرَأْتُهَا", "قَرَأْتُهُنَّ"], "أَمَامَ البَيْتِ."], [1], "Onları (gazeteleri) evin önünde okudum.", "Gazeteler insan dışı çoğul: ـهَا.")
    ]},
    { type: "combo", num: "٤", ar: "اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِالكَلِمَاتِ المُنَاسِبَةِ", tr: "Örnek cümleyi parantezdeki kelimeye göre yeniden kur. Zamirse fiile bitişir; isimse fiilden sonra mef'ûl olarak yazılır.",
      exHtml: "<span class=\"ar\">أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. (هُوَ)</span><br><span class=\"ar\">يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ مِنَ الطَّيِّبَاتِ. (أَنْتُمْ)</span>", items: [
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(هُمْ)</span>", [["أَخَذْتُهُمْ", "أَخَذْتُهُنَّ", "أَخَذْتُهُمَا"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [0], "Onları Topkapı Müzesine götürdüm.", "هُمْ → ـهُمْ."),
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(هُنَّ)</span>", [["أَخَذْتُهُمْ", "أَخَذْتُهُنَّ", "أَخَذْتُهَا"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [1], "Onları (kadınları) Topkapı Müzesine götürdüm.", "هُنَّ → ـهُنَّ."),
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(العُمَّالَ)</span>", [["أَخَذْتُ العُمَّالَ", "أَخَذْتُهُمُ العُمَّالَ", "أَخَذْتُ العُمَّالُ"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [0], "İşçileri Topkapı Müzesine götürdüm.", "İsim gelince zamir kalkar; isim mef'ûl olur: العُمَّالَ."),
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(الضُّيُوفَ)</span>", [["أَخَذْتُهُمُ الضُّيُوفَ", "أَخَذْتُ الضُّيُوفُ", "أَخَذْتُ الضُّيُوفَ"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [2], "Misafirleri Topkapı Müzesine götürdüm.", "Mef'ûl: الضُّيُوفَ."),
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(المُسَافِرَيْنِ)</span>", [["أَخَذْتُ المُسَافِرَانِ", "أَخَذْتُ المُسَافِرَيْنِ", "أَخَذْتُهُمَا المُسَافِرَيْنِ"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [1], "İki yolcuyu Topkapı Müzesine götürdüm.", "Mef'ûl müsennâ: ـَيْنِ."),
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(أَنْتَ)</span>", [["أَخَذْتُكَ", "أَخَذْتُكِ", "أَخَذْتُهُ"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [0], "Seni Topkapı Müzesine götürdüm.", "أَنْتَ → ـكَ."),
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(أَنْتُمْ)</span>", [["أَخَذْتُكُمْ", "أَخَذْتُهُمْ", "أَخَذْتُكُنَّ"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [0], "Sizi Topkapı Müzesine götürdüm.", "أَنْتُمْ → ـكُمْ."),
      CB("أَخَذْتُهُ إِلَى مَتْحَفِ طُوبْقَابِي. <span class=\"muted\">(هِيَ)</span>", [["أَخَذْتُهُ", "أَخَذْتُهَا", "أَخَذْتُكِ"], "إِلَى مَتْحَفِ طُوبْقَابِي."], [1], "Onu (kadını) Topkapı Müzesine götürdüm.", "هِيَ → ـهَا."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(ـهُ)</span>", [["يَنْصُرُهُ", "يَنْصُرُهَا", "يَنْصُرُنَا"], "اللهُ", ["وَيَرْزُقُهُ", "وَيَرْزُقُهَا", "وَيَرْزُقُنَا"], "مِنَ الطَّيِّبَاتِ."], [0, 0], "Allah ona yardım eder ve onu temiz şeylerden rızıklandırır.", "İki fiilde de ـهُ."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(نَا)</span>", [["يَنْصُرُنِي", "يَنْصُرُنَا", "يَنْصُرُكُمُ"], "اللهُ", ["وَيَرْزُقُنِي", "وَيَرْزُقُنَا", "وَيَرْزُقُكُمْ"], "مِنَ الطَّيِّبَاتِ."], [1, 1], "Allah bize yardım eder ve bizi rızıklandırır.", "نَا → ـنَا."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(ي)</span>", [["يَنْصُرِي", "يَنْصُرُنِي", "يَنْصُرُنَا"], "اللهُ", ["وَيَرْزُقِي", "وَيَرْزُقُنِي", "وَيَرْزُقُنَا"], "مِنَ الطَّيِّبَاتِ."], [1, 1], "Allah bana yardım eder ve beni rızıklandırır.", "Fiilde ي → ـنِي (nûn-ı vikâye)."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(المُسْلِمِينَ)</span>", [["يَنْصُرُ", "يَنْصُرُهُمُ"], "اللهُ", ["المُسْلِمِينَ", "المُسْلِمُونَ"], ["وَيَرْزُقُهُمْ", "وَيَرْزُقُهُ", "وَيَرْزُقُ"], "مِنَ الطَّيِّبَاتِ."], [0, 0, 0], "Allah Müslümanlara yardım eder ve onları rızıklandırır.", "İlk fiilde isim mef'ûl olur (المُسْلِمِينَ); ikinci fiilde zamir: وَيَرْزُقُهُمْ."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(الصَّالِحِينَ)</span>", [["يَنْصُرُ", "يَنْصُرُهُمُ"], "اللهُ", ["الصَّالِحِينَ", "الصَّالِحُونَ"], ["وَيَرْزُقُهُمْ", "وَيَرْزُقُهُمَا", "وَيَرْزُقُ"], "مِنَ الطَّيِّبَاتِ."], [0, 0, 0], "Allah salihlere yardım eder ve onları rızıklandırır.", "الصَّالِحِينَ mef'ûl; وَيَرْزُقُهُمْ."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(السَّائِلَيْنِ)</span>", [["يَنْصُرُ", "يَنْصُرُهُمَا"], "اللهُ", ["السَّائِلَيْنِ", "السَّائِلَانِ"], ["وَيَرْزُقُهُمْ", "وَيَرْزُقُهُمَا", "وَيَرْزُقُ"], "مِنَ الطَّيِّبَاتِ."], [0, 0, 1], "Allah iki dilenciye yardım eder ve onları rızıklandırır.", "İkil: السَّائِلَيْنِ ve ـهُمَا."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(المُخْلِصِينَ)</span>", [["يَنْصُرُ", "يَنْصُرُهُمُ"], "اللهُ", ["المُخْلِصِينَ", "المُخْلِصُونَ"], ["وَيَرْزُقُهُمْ", "وَيَرْزُقُهَا", "وَيَرْزُقُ"], "مِنَ الطَّيِّبَاتِ."], [0, 0, 0], "Allah ihlaslılara yardım eder ve onları rızıklandırır.", "المُخْلِصِينَ mef'ûl; وَيَرْزُقُهُمْ."),
      CB("يَنْصُرُكُمُ اللهُ وَيَرْزُقُكُمْ. <span class=\"muted\">(أَنْتُنَّ)</span>", [["يَنْصُرُكُمُ", "يَنْصُرُكُنَّ", "يَنْصُرُهُنَّ"], "اللهُ", ["وَيَرْزُقُكُمْ", "وَيَرْزُقُكُنَّ", "وَيَرْزُقُهُنَّ"], "مِنَ الطَّيِّبَاتِ."], [1, 1], "Allah size (kadınlar) yardım eder ve sizi rızıklandırır.", "أَنْتُنَّ → ـكُنَّ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ: حَدِيثَانِ وَآلُ يَاسِرٍ", tr: "Okuma: İki Hadis ve Âl-i Yâsir", short: "Okuma", col: "ref", legend: ["mi", "nasb"],
  goals: ["Hadislerde isme ve harfe bitişik zamirleri bulmak", "Bir metinde fiile bitişik nasb zamirlerini, fiile bitişik ref zamirlerinden ayırmak", "أَبِي هُرَيْرَةَ gibi tuzakları fark etmek (\"babam\" değil, \"Ebû\")"],
  examples: [
    { s: "بَارَكَ:- / اللهُ:- / فِي:- / أَهْلِكَ:mi / وَمَالِكَ:mi", tr: "Allah ailene ve malına bereket versin.", why: "İsme bitişik ـكَ." },
    { s: "فَأَخَذُوهُمْ:nasb / جَمِيعًا:-", tr: "Hepsini yakaladılar.", why: "ـوا: fâil (ref zamiri); ـهُمْ: mef'ûl (nasb zamiri)." },
    { s: "إِنَّ:- / مَوْعِدَكُمُ:mi / الجَنَّةُ:-", tr: "Sizin buluşma yeriniz cennettir.", why: "İsme bitişik ـكُمْ." }
  ],
  rules: [
    { tr: "Bir kelimede iki zamir olabilir: <span class=\"ar\">فَأَخَذُوهُمْ</span> → <span class=\"ar\">ـوا</span> (onlar aldı: fâil) + <span class=\"ar\">ـهُمْ</span> (onları: mef'ûl)." },
    { tr: "<b>Fiile bitişik ref zamirleri</b> (fâil olurlar, ileride ayrıntılı): <span class=\"ar\">تُ، تَ، تِ، نَا، وا، ـنَ، ـا، ي</span>. Örnek: <span class=\"ar\">كَتَبْتُ، رَجَعُوا، سَخِرُوا</span>." },
    { tr: "Harfe bitişen zamir: <span class=\"ar\">إِلَيْهَا، بِهِمَا، عَنْهُمْ، مِنْهَا، عَلَيْهِ، مِنِّي، إِلَيَّ</span>." },
    { tr: "Tuzak: <span class=\"ar\">أَبِي هُرَيْرَةَ</span> ve <span class=\"ar\">ابْنِ أَبِي رَبِيعَةَ</span>'deki <span class=\"ar\">أَبِي</span> \"babam\" değil, \"Ebû\" künyesinin mecrûr hâlidir." }
  ],
  kaide: ["الضَّمَائِرُ المُتَّصِلَةُ بِالاسْمِ تَقَعُ مُضَافًا إِلَيْهِ، وَبِالفِعْلِ تَقَعُ مَفْعُولًا بِهِ (ضَمَائِرُ النَّصْبِ)."],
  ex: [
    { type: "find", target: "y", num: "٦", ar: "اقْرَأِ الحَدِيثَيْنِ وَعَيِّنْ فِيهِمَا الضَّمَائِرَ المُتَّصِلَةَ بِالاسْمِ وَالحَرْفِ", tr: "Hadislerde isme ya da harfe bitişik zamir taşıyan kelimelere dokun. Fiile bitişik zamirler (فَجَاءَهُ، دَعَاكَ) hedef değil.", items: [
      W("عَنْ عَبْدِ اللهِ بْنِ أَبِي رَبِيعَةَ رَضِيَ اللهُ [عَنْهُ] قَالَ:", "Abdullah bin Ebî Rebîa (r.a.) şöyle dedi:", "عَنْهُ: harfe bitişik. أَبِي burada \"Ebû\" künyesidir, zamir değil."),
      W("اسْتَقْرَضَ [مِنِّي] النَّبِيُّ صَلَّى اللهُ [عَلَيْهِ] وَسَلَّمَ أَرْبَعِينَ أَلْفًا،", "Peygamber (s.a.v.) benden kırk bin borç aldı.", "مِنِّي = مِنْ + ي; عَلَيْهِ."),
      W("فَجَاءَهُ مَالٌ، فَدَفَعَهُ [إِلَيَّ]،", "Sonra ona mal geldi; onu bana verdi.", "إِلَيَّ = إِلَى + ي. فَجَاءَهُ ve فَدَفَعَهُ'deki ـهُ fiile bitişiktir (mef'ûl)."),
      W("وَقَالَ: بَارَكَ اللهُ تَعَالَى فِي [أَهْلِكَ] [وَمَالِكَ]، إِنَّمَا جَزَاءُ السَّلَفِ الحَمْدُ وَالأَدَاءُ.", "Ve: \"Allah ailene ve malına bereket versin. Borcun karşılığı ancak hamd ve ödemedir\" dedi.", "أَهْلِكَ، مَالِكَ: isme bitişik ـكَ."),
      W("عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللهُ [عَنْهُ] [أَنَّهُ] قَالَ:", "Ebû Hüreyre (r.a.) şöyle dedi:", "أَنَّهُ: harfe bitişik. أَبِي = Ebû."),
      W("كَانَ النَّاسُ إِذَا رَأَوْا أَوَّلَ الثَّمَرِ جَاءُوا [بِهِ] إِلَى رَسُولِ اللهِ صَلَّى اللهُ [عَلَيْهِ] وَسَلَّمَ،", "İnsanlar ilk meyveyi görünce onu Resûlullah'a (s.a.v.) getirirlerdi.", "بِهِ، عَلَيْهِ. رَأَوْا، جَاءُوا'daki و fâildir."),
      W("فَإِذَا أَخَذَهُ رَسُولُ اللهِ قَالَ: اللَّهُمَّ بَارِكْ [لَنَا] فِي [ثَمَرِنَا]، وَبَارِكْ [لَنَا] فِي [مَدِينَتِنَا]،", "Resûlullah onu alınca: \"Allahım! Meyvemizi bize bereketli kıl, şehrimizi bize bereketli kıl\" derdi.", "لَنَا: harfe; ثَمَرِنَا، مَدِينَتِنَا: isme bitişik. أَخَذَهُ fiile bitişik."),
      W("وَبَارِكْ [لَنَا] فِي [صَاعِنَا]، وَبَارِكْ [لَنَا] فِي [مُدِّنَا]،", "\"Sâ'ımızı ve müddümüzü (ölçeklerimizi) bize bereketli kıl.\"", "لَنَا، صَاعِنَا، مُدِّنَا."),
      W("اللَّهُمَّ إِنَّ إِبْرَاهِيمَ [عَبْدُكَ] [وَخَلِيلُكَ] [وَنَبِيُّكَ]، [وَإِنِّي] [عَبْدُكَ] [وَنَبِيُّكَ]،", "\"Allahım! İbrahim senin kulun, dostun ve peygamberindir; ben de senin kulun ve peygamberinim.\"", "إِنِّي = إِنَّ + ي; diğerleri isme bitişik ـكَ."),
      W("[وَإِنَّهُ] دَعَاكَ لِمَكَّةَ [وَإِنِّي] أَدْعُوكَ لِلْمَدِينَةِ بِمِثْلِ مَا دَعَاكَ [بِهِ] لِمَكَّةَ [وَمِثْلَهُ] [مَعَهُ]،", "\"O sana Mekke için dua etti; ben de sana Medine için, onun Mekke için ettiği duanın bir mislini ve onunla beraber bir mislini daha diliyorum.\"", "دَعَاكَ ve أَدْعُوكَ fiile bitişiktir (hedef değil). مَعَهُ: مَعَ bir isimdir (zarf)."),
      W("ثُمَّ يَدْعُو أَصْغَرَ وَلِيدٍ يَرَاهُ فَيُعْطِيهِ ذَلِكَ الثَّمَرَ.", "Sonra gördüğü en küçük çocuğu çağırır ve o meyveyi ona verirdi.", "Bu cümlede isme ya da harfe bitişik zamir yok: يَرَاهُ ve فَيُعْطِيهِ fiile bitişiktir.")
    ]},
    { type: "classify", num: "٥ (٣)", opts: ZTUR_OPTS, ar: "عَيِّنْ ضَمَائِرَ النَّصْبِ وَالرَّفْعِ المُتَّصِلَةَ بِالفِعْلِ وَالضَّمَائِرَ المُتَّصِلَةَ بِالاسْمِ وَالحَرْفِ", tr: "Âl-i Yâsir parçasından: parantezde gösterilen zamir nereye bitişik ve görevi ne?", items: [
      { s: "أَسْرَعَتْ <b class=\"hl\">إِلَيْهَا</b> سُمَيَّةُ <span class=\"muted\">(ـهَا)</span>", a: "harf", why: "إِلَى harfine bitişik." },
      { s: "سُمَيَّةُ <b class=\"hl\">وَابْنُهَا</b> عَمَّارٌ <span class=\"muted\">(ـهَا)</span>", a: "isim", why: "ابْنٌ ismine bitişik: muzâfun ileyh." },
      { s: "ثُمَّ لَحِقَ <b class=\"hl\">بِهِمَا</b> زَوْجُهَا <span class=\"muted\">(ـهِمَا)</span>", a: "harf", why: "بِـ harfine bitişik; kesreden sonra ـهِمَا." },
      { s: "<b class=\"hl\">فَأَخَذُوهُمْ</b> جَمِيعًا <span class=\"muted\">(ـهُمْ)</span>", a: "nasb", why: "ـهُمْ: onları → mef'ûl." },
      { s: "<b class=\"hl\">فَأَخَذُوهُمْ</b> جَمِيعًا <span class=\"muted\">(ـوا)</span>", a: "ref", why: "ـوا: onlar aldı → fâil." },
      { s: "<b class=\"hl\">وَعَذَّبُوهُمْ</b> <span class=\"muted\">(ـهُمْ)</span>", a: "nasb", why: "ـهُمْ: onlara (işkence ettiler) → mef'ûl." },
      { s: "وَمَنَعُوا <b class=\"hl\">عَنْهُمُ</b> المَاءَ <span class=\"muted\">(ـهُمْ)</span>", a: "harf", why: "عَنْ harfine bitişik." },
      { s: "<b class=\"hl\">وَسَخِرُوا</b> مِنْهُمْ <span class=\"muted\">(ـوا)</span>", a: "ref", why: "ـوا: onlar alay etti → fâil." },
      { s: "إِنَّ <b class=\"hl\">مَوْعِدَكُمُ</b> الجَنَّةُ <span class=\"muted\">(ـكُمْ)</span>", a: "isim", why: "مَوْعِدٌ ismine bitişik." },
      { s: "وَتَرْجِعَ إِلَى دِينِ <b class=\"hl\">آبَائِهِمْ</b> <span class=\"muted\">(ـهِمْ)</span>", a: "isim", why: "آبَاءٌ ismine bitişik." },
      { s: "فَأَخَذَ أَبُو جَهْلٍ <b class=\"hl\">حَرْبَتَهُ</b> <span class=\"muted\">(ـهُ)</span>", a: "isim", why: "حَرْبَةٌ ismine bitişik." },
      { s: "<b class=\"hl\">فَقَتَلَهَا</b> <span class=\"muted\">(ـهَا)</span>", a: "nasb", why: "ـهَا: onu (Sümeyye'yi) → mef'ûl." },
      { s: "وَبَعْدَ <b class=\"hl\">اسْتِشْهَادِهَا</b> بِقَلِيلٍ <span class=\"muted\">(ـهَا)</span>", a: "isim", why: "اسْتِشْهَادٌ ismine bitişik." },
      { s: "<b class=\"hl\">وَطَلَبَ مِنْهَا</b> أَنْ تَتْرُكَ الإِسْلَامَ <span class=\"muted\">(ـهَا)</span>", a: "harf", why: "مِنْ harfine bitişik." }
    ]},
    { type: "reading", num: "٥", ar: "اقْرَأِ النَّصَّ التَّالِيَ", tr: "Parçayı oku ve soruların örnek cevaplarına bak.", title: "آلُ يَاسِرٍ",
      text: "لَمَّا ظَهَرَتْ فِي مَكَّةَ دَعْوَةُ الإِسْلَامِ أَسْرَعَتْ إِلَيْهَا سُمَيَّةُ وَابْنُهَا عَمَّارٌ، ثُمَّ لَحِقَ بِهِمَا زَوْجُهَا يَاسِرٌ. وَعَلِمَ المُشْرِكُونَ بِإِسْلَامِ آلِ يَاسِرٍ رَضِيَ اللهُ عَنْهُمْ، فَأَخَذُوهُمْ جَمِيعًا إِلَى صَحْرَاءِ مَكَّةَ وَقَيَّدُوهُمْ، ثُمَّ تَرَكُوهُمْ تَحْتَ الشَّمْسِ الحَارَّةِ وَعَذَّبُوهُمْ وَمَنَعُوا عَنْهُمُ المَاءَ وَسَخِرُوا مِنْهُمْ. وَكُلَّمَا مَرَّ عَلَيْهِمُ الرَّسُولُ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ كَانَ يَقُولُ لَهُمْ: «صَبْرًا آلَ يَاسِرٍ، إِنَّ مَوْعِدَكُمُ الجَنَّةُ». وَلَقَدْ صَبَرَ آلُ يَاسِرٍ عَلَى العَذَابِ صَبْرًا جَمِيلًا. لَقَدْ كَانَتْ سُمَيَّةُ عَجُوزًا ضَعِيفَةً. جَاءَ يَوْمًا أَبُو جَهْلٍ إِلَيْهَا وَطَلَبَ مِنْهَا أَنْ تَتْرُكَ الإِسْلَامَ وَتَرْجِعَ إِلَى دِينِ آبَائِهِمْ، فَرَفَضَتْ. فَأَخَذَ أَبُو جَهْلٍ حَرْبَتَهُ فَقَتَلَهَا، فَأَصْبَحَتْ أَوَّلَ شَهِيدَةٍ فِي الإِسْلَامِ. وَبَعْدَ اسْتِشْهَادِهَا بِقَلِيلٍ لَحِقَ بِهَا زَوْجُهَا يَاسِرٌ، رَضِيَ اللهُ عَنْهُمْ جَمِيعًا.",
      textTr: "Yâsir Ailesi. İslâm daveti Mekke'de ortaya çıkınca Sümeyye ve oğlu Ammâr ona koştu; sonra kocası Yâsir de onlara katıldı. Müşrikler Yâsir ailesinin Müslüman olduğunu öğrenince hepsini Mekke'nin çölüne götürüp bağladılar, sonra onları sıcak güneşin altında bıraktılar, onlara işkence ettiler, onlardan suyu esirgediler ve onlarla alay ettiler. Resûlullah (s.a.v.) yanlarından her geçtiğinde onlara \"Sabredin ey Yâsir ailesi, sizin buluşma yeriniz cennettir\" derdi. Yâsir ailesi işkenceye güzelce sabretti. Sümeyye yaşlı ve zayıf bir kadındı. Bir gün Ebû Cehil ona geldi ve İslâm'ı bırakıp atalarının dinine dönmesini istedi; o reddetti. Ebû Cehil mızrağını alıp onu öldürdü; böylece İslâm'daki ilk kadın şehit oldu. Şehadetinden kısa bir süre sonra kocası Yâsir de ona kavuştu. Allah hepsinden razı olsun.",
      qa: [
        { q: "مَنْ أَسْرَعَ إِلَى الإِسْلَامِ أَوَّلًا؟", a: "أَسْرَعَتْ إِلَيْهِ سُمَيَّةُ وَابْنُهَا عَمَّارٌ، ثُمَّ زَوْجُهَا يَاسِرٌ.", tr: "İslâm'a önce kim koştu? Sümeyye ve oğlu Ammâr, sonra kocası Yâsir." },
        { q: "مَاذَا كَانَ يَقُولُ لَهُمُ الرَّسُولُ ﷺ؟", a: "صَبْرًا آلَ يَاسِرٍ، إِنَّ مَوْعِدَكُمُ الجَنَّةُ.", tr: "Resûlullah onlara ne derdi? \"Sabredin ey Yâsir ailesi, buluşma yeriniz cennettir.\"" },
        { q: "مَنْ أَوَّلُ شَهِيدَةٍ فِي الإِسْلَامِ؟", a: "سُمَيَّةُ رَضِيَ اللهُ عَنْهَا.", tr: "İslâm'ın ilk kadın şehidi kimdir? Sümeyye (r.a.)." }
      ]
    }
  ]
}
];

// Doğru zamir oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var ZM_POOL = [
  ["{هِيَ} حَرِيصَةٌ عَلَى أَطْفَالِهَا.", ["هِيَ", "هُمَا", "أَنْتُنَّ"], "haber müennes tekil", "O çocuklarına düşkündür.", "u1"],
  ["{نَحْنُ} لَاعِبُونَ فِي الحَدِيقَةِ.", ["نَحْنُ", "أَنْتَ", "أَنْتُمَا"], "haber çoğul", "Biz bahçede oynuyoruz.", "u1"],
  ["{هُمْ} طُلَّابٌ يَدْرُسُونَ فِي الجَامِعَةِ.", ["هُمْ", "هُنَّ", "هُوَ"], "haber müzekker çoğul", "Onlar üniversitede okuyor.", "u1"],
  ["{هُمَا} وَاقِفَتَانِ أَمَامَ السَّيَّارَةِ.", ["هُمَا", "هُنَّ", "أَنْتِ"], "haber müennes ikil", "O ikisi arabanın önünde duruyor.", "u1"],
  ["{هُنَّ} عَامِلَاتٌ فِي المَصْنَعِ.", ["هُنَّ", "هُمْ", "أَنْتُمَا"], "haber müennes çoğul", "Onlar fabrikada işçi.", "u1"],
  ["{أَنْتُنَّ} طَالِبَاتٌ.", ["أَنْتُنَّ", "أَنْتُمْ", "أَنْتِ"], "muhataba çoğul", "Siz kız öğrencilersiniz.", "u1"],
  ["{أَنْتُمَا} طَبِيبَانِ.", ["أَنْتُمَا", "أَنْتُمْ", "هُمْ"], "muhatab ikil", "Siz ikiniz doktorsunuz.", "u1"],
  ["مِنْ أَيْنَ {أَنْتِ} يَا عَائِشَةُ؟", ["أَنْتِ", "أَنْتَ", "هِيَ"], "Âişe'ye hitap: muhataba", "Nerelisin Âişe?", "u1"],
  ["تَرَكَ حَسَنٌ {عَمَلَهُ} فِي المَصْنَعِ.", ["عَمَلَهُ", "عَمَلَهَا", "عَمَلَهُمَا"], "Hasan: ـهُ", "Hasan işini fabrikada bıraktı.", "u2"],
  ["دَخَلَتْ خَدِيجَةُ {بَيْتَهَا} الجَدِيدَ.", ["بَيْتَهَا", "بَيْتَهُ", "بَيْتَهُمْ"], "Hatice: ـهَا", "Hatice yeni evine girdi.", "u2"],
  ["شَكَرَتِ البَنَاتُ {أُمَّهُنَّ}.", ["أُمَّهُنَّ", "أُمَّهُمْ", "أُمَّهَا"], "kızlar: ـهُنَّ", "Kızlar annelerine teşekkür etti.", "u2"],
  ["فَرِحَ الأَسَاتِذَةُ بِنَجَاحِ {طُلَّابِهِمْ}.", ["طُلَّابِهِمْ", "طُلَّابِهُمْ", "طُلَّابِهِنَّ"], "kesreden sonra ـهِمْ", "Hocalar öğrencilerinin başarısına sevindi.", "u2"],
  ["سَلَّمَ الوَزِيرُ عَلَى أَحْمَدَ: سَلَّمَ {عَلَيْهِ}.", ["عَلَيْهِ", "عَلَيْهُ", "عَلَيْهَا"], "ي'den sonra ـهِ", "Bakan ona selam verdi.", "u2"],
  ["{كِتَابِي} جَدِيدٌ.", ["كِتَابِي", "كِتَابُنِي", "كِتَابُي"], "isimde yalnız ـي", "Benim kitabım yeni.", "u2"],
  ["عَاقَبَ القَاضِي سَارِقَ النُّقُودِ: {سَارِقَهَا}.", ["سَارِقَهَا", "سَارِقَهُمْ", "سَارِقَهُنَّ"], "insan dışı çoğul → ـهَا", "Hâkim paranın hırsızını cezalandırdı.", "u2"],
  ["نَظَرَ الرَّجُلُ {إِلَيْهِمَا}.", ["إِلَيْهِمَا", "إِلَيْهُمَا", "إِلَيْهَا"], "ي'den sonra ـهِمَا", "Adam o ikisine baktı.", "u2"],
  ["{مَنَحَنِي} المُدِيرُ كِتَابًا.", ["مَنَحَنِي", "مَنَحِي", "مَنَحْنِي"], "fiilde ـنِي", "Müdür bana bir kitap verdi.", "u3"],
  ["{سَأَلَنَا} الأُسْتَاذُ عَنْ مَوْعِدِ الامْتِحَانِ.", ["سَأَلَنَا", "سَأَلْنَا", "سَأَلَنِي"], "bizi sordu: lâm fethalı", "Hoca bize sınav tarihini sordu.", "u3"],
  ["جَمَعَ المُدَرِّسُ الكُتُبَ {فَنَقَلَهَا}.", ["فَنَقَلَهَا", "فَنَقَلَهُمْ", "فَنَقَلَهُ"], "insan dışı çoğul → ـهَا", "Öğretmen kitapları toplayıp taşıdı.", "u3"],
  ["وَصَلَ الوَزِيرُ {فَاسْتَقْبَلَهُ} المَسْؤُولُونَ.", ["فَاسْتَقْبَلَهُ", "فَاسْتَقْبَلَهُمْ", "فَاسْتَقْبَلَهَا"], "bakan: ـهُ", "Bakan geldi, yetkililer onu karşıladı.", "u3"],
  ["أَكْرَمْتُ الضَّيْفَيْنِ؛ {أَكْرَمْتُهُمَا} فِي المَطْعَمِ.", ["أَكْرَمْتُهُمَا", "أَكْرَمْتُهُمْ", "أَكْرَمْتُهُ"], "iki misafir: ـهُمَا", "İki misafiri lokantada ağırladım.", "u3"],
  ["يَا أَحْمَدُ، {يَطْلُبُكَ} الطَّبِيبُ.", ["يَطْلُبُكَ", "يَطْلُبُكِ", "يَطْلُبُهُ"], "Ahmed'e hitap: ـكَ", "Ahmed, doktor seni istiyor.", "u3"],
  ["يَا فَاطِمَةُ، الأُسْتَاذُ {يَنْتَظِرُكِ}.", ["يَنْتَظِرُكِ", "يَنْتَظِرُكَ", "يَنْتَظِرُهَا"], "Fâtıma'ya hitap: ـكِ", "Fâtıma, hoca seni bekliyor.", "u3"],
  ["المُسْلِمُونَ {أَمَرَهُمُ} اللهُ بِالتَّقْوَى.", ["أَمَرَهُمُ", "أَمَرَهُنَّ", "أَمَرَهُ"], "Müslümanlar: ـهُمْ", "Allah Müslümanlara takvayı emretti.", "u3"],
  ["رَضِيَ اللهُ {عَنْهُ}", ["عَنْهُ", "عَنْهِ", "عَنْهَا"], "gâib tekil; nun sakin, ـهُ", "Allah ondan razı olsun.", "u4"],
  ["اللَّهُمَّ بَارِكْ {لَنَا} فِي ثَمَرِنَا", ["لَنَا", "لِي", "لَكُمْ"], "dua eden \"biz\" diyor", "Allahım, meyvemizi bize bereketli kıl.", "u4"],
  ["يَا آلَ يَاسِرٍ، إِنَّ {مَوْعِدَكُمُ} الجَنَّةُ", ["مَوْعِدَكُمُ", "مَوْعِدَهُمُ", "مَوْعِدَنَا"], "onlara hitap: ـكُمْ", "Ey Yâsir ailesi, buluşma yeriniz cennettir.", "u4"],
  ["سُمَيَّةُ: أَخَذَ أَبُو جَهْلٍ حَرْبَتَهُ {فَقَتَلَهَا}.", ["فَقَتَلَهَا", "فَقَتَلَهُ", "فَقَتَلَهُنَّ"], "Sümeyye: ـهَا", "Ebû Cehil mızrağını alıp onu öldürdü.", "u4"]
];
// Ek dönüştürücü: [kök, tür (isim/fiil), Türkçe]
var DON_KOK = [["كِتَاب", "isim", "kitap"], ["بَيْت", "isim", "ev"], ["قَلَم", "isim", "kalem"], ["صَدِيق", "isim", "arkadaş"], ["نَصَحَ", "fiil", "öğütledi"], ["سَأَلَ", "fiil", "sordu"], ["أَكْرَمَ", "fiil", "ikram etti"], ["شَكَرَ", "fiil", "teşekkür etti"]];
var DON_EK = [["هُوَ", "هُ"], ["هُمَا", "هُمَا"], ["هُمْ", "هُمْ"], ["هِيَ", "هَا"], ["هُنَّ", "هُنَّ"], ["أَنْتَ", "كَ"], ["أَنْتُمَا", "كُمَا"], ["أَنْتُمْ", "كُمْ"], ["أَنْتِ", "كِ"], ["أَنْتُنَّ", "كُنَّ"], ["أَنَا", "*"], ["نَحْنُ", "نَا"]];
var HAFIZA = {
  ek: { name: "Ayrı ↔ bitişik", pairs: [["هُوَ", "ـهُ"], ["هِيَ", "ـهَا"], ["هُمْ", "ـهُمْ"], ["هُنَّ", "ـهُنَّ"], ["أَنْتَ", "ـكَ"], ["أَنْتِ", "ـكِ"], ["أَنْتُمْ", "ـكُمْ"], ["أَنْتُنَّ", "ـكُنَّ"], ["نَحْنُ", "ـنَا"], ["هُمَا", "ـهُمَا"], ["أَنْتُمَا", "ـكُمَا"], ["أَنَا", "ـي / ـنِي"]] },
  tr: { name: "Türkçe ↔ Arapça", pairs: [["benim kitabım", "كِتَابِي"], ["bizim evimiz", "بَيْتُنَا"], ["onun (kadın) kalemi", "قَلَمُهَا"], ["sizin hocanız", "أُسْتَاذُكُمْ"], ["beni öğütledi", "نَصَحَنِي"], ["onları sordu", "سَأَلَهُمْ"], ["seni bekliyor", "يَنْتَظِرُكَ"], ["onunla (erkek)", "بِهِ"], ["bize", "لَنَا"], ["onların üzerine", "عَلَيْهِمْ"], ["Rabbimiz", "رَبُّنَا"], ["bizi öğütledi", "نَصَحَنَا"]] }
};
var KARTLAR = [
  ["Zamir kaç şahsı gösterir?", "Üç: mütekellim (ben, biz), muhatab (sen, siz), gâib (o, onlar)."],
  ["Munfasıl zamirler kaç tane?", "On iki: أَنَا، نَحْنُ، أَنْتَ، أَنْتِ، أَنْتُمَا، أَنْتُمْ، أَنْتُنَّ، هُوَ، هِيَ، هُمَا، هُمْ، هُنَّ"],
  ["Hangi zamirler birden fazla duruma yarar?", "نَحْنُ (ikil ve çoğul), هُمَا ve أَنْتُمَا (erkek ve kadın ikil), أَنَا (erkek ve kadın)."],
  ["Munfasıl zamir cümlede genelde ne olur?", "Mübtedâ; haber ona uyar: هُنَّ طَالِبَاتٌ"],
  ["İsme bitişik zamirler?", "ـي، ـنَا، ـكَ، ـكِ، ـكُمَا، ـكُمْ، ـكُنَّ، ـهُ، ـهَا، ـهُمَا، ـهُمْ، ـهُنَّ"],
  ["İsme bitişen zamirin görevi?", "Muzâfun ileyh; isim ال ve tenvin almaz: كِتَابُهُ"],
  ["Kesre kuralı nedir?", "ـهُ، ـهُمَا، ـهُمْ، ـهُنَّ; kesreden ya da ي'den sonra kesreli: بِهِ، عَلَيْهِمْ"],
  ["Fiile bitişik nasb zamirleri?", "ـنِي، ـنَا، ـهُ ailesi, ـكَ ailesi: نَصَحَنِي، نَصَحَكُمْ"],
  ["Fiile bitişen nasb zamirinin görevi?", "Mef'ûl bih: يَطْلُبُكَ الطَّبِيبُ (doktor seni istiyor)"],
  ["كِتَابِي ile نَصَحَنِي farkı?", "İsimde yalnız ـي; fiilde ـنِي (nûn-ı vikâye)."],
  ["نَصَحَنَا ile نَصَحْنَا farkı?", "نَصَحَنَا: bizi öğütledi (mef'ûl). نَصَحْنَا: biz öğütledik (fâil)."],
  ["İnsan dışı çoğul için hangi zamir?", "Tekil müennes ـهَا: جَمَعَ الكُتُبَ فَنَقَلَهَا"],
  ["فَأَخَذُوهُمْ kaç zamir taşır?", "İki: ـوا (onlar aldı: fâil) ve ـهُمْ (onları: mef'ûl)."]
];
