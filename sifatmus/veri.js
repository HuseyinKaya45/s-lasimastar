// ================= VERİ: Sıfat-ı Müşebbehe (الصِّفَةُ المُشَبَّهَةُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "mi.أَفْعَل" gibi yazılırsa etikete not eklenir.
var ROLES = {
  mi: { ar: "صِفَةٌ مُشَبَّهَةٌ", tr: "Sıfat-ı müşebbehe" }, mz: { ar: "اسْمُ فَاعِلٍ", tr: "İsm-i fâil" }, cerr: { ar: "فِعْلٌ", tr: "Fiil" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
// vezinler: [anahtar, vezin, Türkçe ad, renk]
var VZ = [
  ["af", "أَفْعَلُ", "ef'al", "ref"], ["fn", "فَعْلَانُ", "fa'lân", "nasb"], ["fl", "فَعْلٌ", "fa'l", "cerr"], ["fil", "فِعْلٌ", "fi'l", "cerr"], ["ful", "فُعْلٌ", "fu'l", "cerr"],
  ["faa", "فَعَلٌ", "fa'al", "mz"], ["fai", "فَعِلٌ", "fa'il", "mz"], ["fy", "فَعِيلٌ", "fa'îl", "mi"], ["fyl", "فَيْعِلٌ", "fay'il", "muz"], ["fal", "فَعَالٌ", "fa'âl", "mun"], ["fual", "فُعَالٌ", "fu'âl", "mun"]
];
var VZ_BY = {}; VZ.forEach(function (v) { VZ_BY[v[0]] = v; });
var VZ_OPTS = VZ.map(function (v) { return [v[0], v[2], v[1], "x"]; });
var SF_OPTS = [["s", "Sıfat-ı müşebbehe", "صِفَةٌ مُشَبَّهَةٌ", "mi"], ["f", "İsm-i fâil", "اسْمُ فَاعِلٍ", "mz"], ["n", "Başka bir şey", "غَيْرُ ذَلِكَ", "x"]];

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
function PK(q, o, tr, why, k) { var r = o.slice(), a = (k || 0) % o.length; var c = r.splice(0, 1)[0]; r.splice(a, 0, c); return { q: q, o: r, a: a, tr: tr, why: why }; }
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }

// Sıfatlar: [sıfat, vezin, fiil, Türkçe, müennes, çoğul]
var SM = [
  ["أَحْمَرُ", "af", "—", "kırmızı", "حَمْرَاءُ", "حُمْرٌ"],
  ["أَبْيَضُ", "af", "—", "beyaz", "بَيْضَاءُ", "بِيضٌ"],
  ["أَخْضَرُ", "af", "—", "yeşil", "خَضْرَاءُ", "خُضْرٌ"],
  ["أَزْرَقُ", "af", "—", "mavi", "زَرْقَاءُ", "زُرْقٌ"],
  ["أَسْمَرُ", "af", "—", "esmer", "سَمْرَاءُ", "سُمْرٌ"],
  ["أَبْكَمُ", "af", "بَكِمَ", "dilsiz", "بَكْمَاءُ", "بُكْمٌ"],
  ["أَحْمَقُ", "af", "حَمُقَ", "ahmak", "حَمْقَاءُ", "حُمْقٌ"],
  ["عَطْشَانُ", "fn", "عَطِشَ", "susamış", "عَطْشَى", "عِطَاشٌ"],
  ["شَبْعَانُ", "fn", "شَبِعَ", "tok", "شَبْعَى", "شِبَاعٌ"],
  ["غَضْبَانُ", "fn", "غَضِبَ", "öfkeli", "غَضْبَى", "غِضَابٌ"],
  ["كَسْلَانُ", "fn", "كَسِلَ", "tembel", "كَسْلَى", "كُسَالَى"],
  ["سَهْلٌ", "fl", "سَهُلَ", "kolay", "سَهْلَةٌ", ""],
  ["صَعْبٌ", "fl", "صَعُبَ", "zor", "صَعْبَةٌ", "صِعَابٌ"],
  ["مِلْحٌ", "fil", "مَلُحَ", "tuzlu", "", ""],
  ["حُلْوٌ", "ful", "حَلَا", "tatlı", "حُلْوَةٌ", ""],
  ["حُرٌّ", "ful", "حَرَّ", "hür", "حُرَّةٌ", "أَحْرَارٌ"],
  ["حَسَنٌ", "faa", "حَسُنَ", "güzel", "حَسَنَةٌ", "حِسَانٌ"],
  ["فَرِحٌ", "fai", "فَرِحَ", "sevinçli", "فَرِحَةٌ", "فَرِحُونَ"],
  ["تَعِبٌ", "fai", "تَعِبَ", "yorgun", "تَعِبَةٌ", "تَعِبُونَ"],
  ["قَلِقٌ", "fai", "قَلِقَ", "endişeli", "قَلِقَةٌ", "قَلِقُونَ"],
  ["كَرِيمٌ", "fy", "كَرُمَ", "cömert", "كَرِيمَةٌ", "كِرَامٌ"],
  ["جَمِيلٌ", "fy", "جَمُلَ", "güzel", "جَمِيلَةٌ", ""],
  ["طَوِيلٌ", "fy", "طَالَ", "uzun", "طَوِيلَةٌ", "طِوَالٌ"],
  ["عَظِيمٌ", "fy", "عَظُمَ", "büyük", "عَظِيمَةٌ", "عُظَمَاءُ"],
  ["طَيِّبٌ", "fyl", "طَابَ", "güzel, temiz", "طَيِّبَةٌ", "طَيِّبُونَ"],
  ["جَيِّدٌ", "fyl", "جَادَ", "iyi", "جَيِّدَةٌ", ""],
  ["جَبَانٌ", "fal", "جَبُنَ", "korkak", "جَبَانَةٌ", "جُبَنَاءُ"],
  ["شُجَاعٌ", "fual", "شَجُعَ", "cesur", "شُجَاعَةٌ", "شُجْعَانٌ"]
];
var MAK_S = [0, 1, 7, 8, 11, 14, 16, 17, 20, 22, 24, 26, 27];
// tasrif: [müz. tekil, ikil, çoğul, müe. tekil, ikil, çoğul]
function smTasrif(e) {
  var s = e[0], k = e[1];
  if (k === "af") { var st = s.replace(/ُ$/, ""); return [s, st + "َانِ", e[5], e[4], e[4].replace(/اءُ$/, "اوَانِ"), e[5]]; }
  if (k === "fn") { var st2 = s.replace(/ُ$/, ""); return [s, st2 + "َانِ", st2 + "ُونَ / " + e[5], e[4], e[4].replace(/ى$/, "يَانِ"), e[5]]; }
  var b = s.replace(/ٌ$/, ""), fb = e[4] ? e[4].replace(/ةٌ$/, "") : b + "َ";
  return [s, b + "َانِ", e[5] || b + "ُونَ", e[4] || "—", e[4] ? fb + "تَانِ" : "—", e[4] ? fb + "اتٌ" : "—"];
}
var TS_LBL = ["Müzekker tekil", "Müzekker ikil", "Müzekker çoğul", "Müennes tekil", "Müennes ikil", "Müennes çoğul"];

var UNITS = [
// ---------------------------------------------------------------- 1 · ANLAM
{
  id: "u1", no: 1, ar: "الصِّفَةُ المُشَبَّهَةُ", tr: "Sıfat-ı Müşebbehe Nedir?", short: "Anlam", col: "mi", legend: ["mi", "cerr"],
  goals: ["Sıfat-ı müşebbehenin kalıcı bir niteliği gösterdiğini bilmek", "Geçişsiz (lâzım) üç harfli fiillerden, özellikle 4. ve 5. bâbdan geldiğini bilmek", "Fiilden sıfat-ı müşebbehe yapmak: قَبُحَ ← قَبِيحٌ"],
  examples: [
    { s: "لَبِسَ:cerr / عَلِيٌّ:- / قَمِيصًا:- / أَبْيَضَ:mi.أَفْعَل", tr: "Ali beyaz bir gömlek giydi.", pair: "يَلْبَسُ:cerr / عَلِيٌّ:- / قُمْصَانًا:- / بَيْضَاءَ:mi.فَعْلَاء", pairTr: "Ali beyaz gömlekler giyiyor." },
    { s: "المَرِيضُ:- / شَبْعَانُ:mi.فَعْلَان", tr: "Hasta tok.", pair: "المَرِيضَةُ:- / شَبْعَانَةٌ:mi.فَعْلَانَة", pairTr: "Hasta kadın tok." },
    { s: "الأُسْتَاذُ:- / نَشِيطٌ:mi.فَعِيل", tr: "Hoca çalışkan.", pair: "الأُسْتَاذَةُ:- / نَشِيطَةٌ:mi.فَعِيلَة", pairTr: "Hoca hanım çalışkan." }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">Sıfat-ı müşebbehe</b>, üç harfli <b>lâzım</b> (geçişsiz) fiilden alınan ve ism-i fâilin anlamını <b>sabit, kalıcı</b> bir nitelik olarak gösteren müştak isimdir." },
    { tr: "Çoğunlukla <b>4. bâb</b> (<span class=\"ar\">فَعِلَ – يَفْعَلُ</span>) ve <b>5. bâb</b> (<span class=\"ar\">فَعُلَ – يَفْعُلُ</span>) fiillerinden gelir.", ex: ["فَرِحَ يَفْرَحُ ← فَرِحٌ", "كَرُمَ يَكْرُمُ ← كَرِيمٌ", "حَسُنَ يَحْسُنُ ← حَسَنٌ"] },
    { tr: "İsm-i fâil geçici bir işi, sıfat-ı müşebbehe kalıcı bir hâli anlatır: <span class=\"ar\">ذَاهِبٌ</span> (giden, şu an) ↔ <span class=\"ar\">طَوِيلٌ</span> (uzun, hep)." },
    { tr: "Renk, kusur, açlık-tokluk, güzellik, büyüklük gibi kalıcı nitelikler için kullanılır: <span class=\"ar\">حَسَنٌ، أَحْمَرُ، عَطْشَانُ، تَعِبٌ، كَرِيمٌ</span>." },
    { tr: "Kalıbı semâîdir (kuralla değil, duyarak öğrenilir); bu yüzden birçok vezni vardır." }
  ],
  kaide: ["الصِّفَةُ المُشَبَّهَةُ: اسْمٌ مُشْتَقٌّ مِنَ الفِعْلِ الثُّلَاثِيِّ اللَّازِمِ لِلدَّلَالَةِ عَلَى مَعْنَى اسْمِ الفَاعِلِ عَلَى وَجْهِ الثُّبُوتِ. وَتَأْتِي خَاصَّةً مِنَ البَابِ الرَّابِعِ وَالخَامِسِ، وَهُمَا: (فَعِلَ – يَفْعَلُ، فَعُلَ – يَفْعُلُ)، نَحْوُ: حَسَنٌ، أَحْمَرُ، عَطْشَانُ، تَعِبٌ، كَرِيمٌ."],
  ex: [
    { type: "combo", num: "٢", ar: "امْلَإِ الفَرَاغَ كَمَا فِي المِثَالِ", tr: "Fiil cümlesini isim cümlesine çevir: fiil yerine sıfat-ı müşebbehe koy ve özneye uydur.", exHtml: "<span class=\"ar\">قَبُحَ الكَذِبُ ← الكَذِبُ قَبِيحٌ.</span>", items: [
      CB("صَلُبَ الثَّلْجُ.", ["الثَّلْجُ", ["صَالِبٌ", "صُلْبٌ", "مَصْلُوبٌ"]], [1], "Buz serttir.", "صَلُبَ ← صُلْبٌ (فُعْل)."),
      CB("نَشِطَ الطَّبِيبُ فِي عَمَلِهِ.", ["الطَّبِيبُ", ["نَشِيطٌ", "نَاشِطَةٌ", "مَنْشُوطٌ"], "فِي عَمَلِهِ."], [0], "Doktor işinde çalışkandır.", "نَشِطَ ← نَشِيطٌ (فَعِيل)."),
      CB("ظَمِئَتِ المَرْأَةُ.", ["المَرْأَةُ", ["ظَمْآنُ", "ظَامِئَةٌ", "ظَمْأَى"]], [2], "Kadın susamış.", "فَعْلَان'ın müennesi فَعْلَى: ظَمْأَى."),
      CB("قَرُبَ النَّصْرُ.", ["النَّصْرُ", ["قَرِيبٌ", "قَارِبٌ", "مَقْرُوبٌ"]], [0], "Zafer yakındır.", "قَرُبَ ← قَرِيبٌ (فَعِيل)."),
      CB("شَجُعَ المُجَاهِدُ.", ["المُجَاهِدُ", ["شَاجِعٌ", "شُجَاعٌ", "مَشْجُوعٌ"]], [1], "Mücahit cesurdur.", "شَجُعَ ← شُجَاعٌ (فُعَال)."),
      CB("عَظُمَ ثَوَابُ المُصَلِّينَ.", ["ثَوَابُ المُصَلِّينَ", ["عَاظِمٌ", "مَعْظُومٌ", "عَظِيمٌ"]], [2], "Namaz kılanların sevabı büyüktür.", "عَظُمَ ← عَظِيمٌ (فَعِيل)."),
      CB("جَبُنَ العَدُوُّ.", ["العَدُوُّ", ["جَبَانٌ", "جَابِنٌ", "مَجْبُونٌ"]], [0], "Düşman korkaktır.", "جَبُنَ ← جَبَانٌ (فَعَال)."),
      CB("حَسُنَ الصِّدْقُ.", ["الصِّدْقُ", ["حَاسِنٌ", "حَسَنٌ", "مَحْسُونٌ"]], [1], "Doğruluk güzeldir.", "حَسُنَ ← حَسَنٌ (فَعَل).")
    ]},
    { type: "classify", extra: true, opts: SF_OPTS, ar: "صِفَةٌ مُشَبَّهَةٌ أَمِ اسْمُ فَاعِلٍ؟", tr: "Kalıcı nitelik mi (sıfat-ı müşebbehe), işi yapan mı (ism-i fâil), yoksa başka bir şey mi?", items: [
      { s: "كَرِيمٌ", a: "s", why: "Cömertlik kalıcı bir nitelik: فَعِيل." },
      { s: "كَاتِبٌ", a: "f", why: "Yazan: فَاعِل." },
      { s: "عَطْشَانُ", a: "s", why: "Susuzluk hâli: فَعْلَان." },
      { s: "ذَاهِبٌ", a: "f", why: "Giden: فَاعِل." },
      { s: "أَحْمَرُ", a: "s", why: "Renk: أَفْعَل." },
      { s: "مَكْتُوبٌ", a: "n", why: "İsm-i mef'ûl." },
      { s: "حَسَنٌ", a: "s", why: "Güzellik: فَعَل." },
      { s: "غَفَّارٌ", a: "n", why: "Mübalağa sîgası (فَعَّال)." },
      { s: "تَعِبٌ", a: "s", why: "Yorgunluk hâli: فَعِل." },
      { s: "جَالِسٌ", a: "f", why: "Oturan: فَاعِل." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · أَفْعَلُ VE فَعْلَانُ
{
  id: "u2", no: 2, ar: "أَفْعَلُ وَفَعْلَانُ", tr: "Ef'al ve Fa'lân Vezinleri", short: "أَفْعَلُ · فَعْلَانُ", col: "ref", legend: ["mi", "cerr"],
  goals: ["أَفْعَلُ vezninin renk ve kusur bildirdiğini, müennesinin فَعْلَاءُ olduğunu bilmek", "فَعْلَانُ vezninin boşluk ve doluluk (açlık, tokluk, susuzluk) bildirdiğini, müennesinin فَعْلَى olduğunu bilmek", "İkisini ikil ve çoğul çekmek: أَحْمَرَانِ، حَمْرَاوَانِ، حُمْرٌ"],
  examples: [
    { s: "قَمِيصٌ:- / أَبْيَضُ:mi.أَفْعَل", tr: "beyaz gömlek", pair: "وَرْدَةٌ:- / حَمْرَاءُ:mi.فَعْلَاء", pairTr: "kırmızı gül" },
    { s: "الشَّجَرُ:- / الأَخْضَرُ:mi.أَفْعَل", tr: "yeşil ağaç", pair: "السَّمَاءُ:- / زَرْقَاءُ:mi.فَعْلَاء", pairTr: "gök mavidir" },
    { s: "الطِّفْلُ:- / جَوْعَانُ:mi.فَعْلَان", tr: "Çocuk aç.", pair: "البِنْتُ:- / غَضْبَى:mi.فَعْلَى", pairTr: "Kız öfkeli." }
  ],
  rules: [
    { tr: "<b>أَفْعَلُ</b> (<span class=\"ar\">أ ـــْ ـــ ـــُ</span>): <b>renk</b> ya da <b>kusur</b> bildirir.", ex: ["أَحْمَرُ", "أَبْيَضُ", "أَسْمَرُ", "أَزْرَقُ", "أَخْضَرُ", "أَبْكَمُ", "أَحْدَبُ", "أَحْمَقُ"] },
    { tr: "Müennesi <b>فَعْلَاءُ</b>:", ex: ["حَمْرَاءُ", "بَيْضَاءُ", "سَمْرَاءُ", "زَرْقَاءُ", "خَضْرَاءُ", "بَكْمَاءُ"] },
    { tr: "Tasrif: <span class=\"ar\">أَحْمَرُ، أَحْمَرَانِ، حُمْرٌ · حَمْرَاءُ، حَمْرَاوَانِ (حَمْرَاءَانِ)، حُمْرٌ</span>. Çoğul iki cins için de <span class=\"ar\">فُعْلٌ</span>." },
    { tr: "<b>فَعْلَانُ</b> (<span class=\"ar\">ـــ ـــْ ـــ انُ</span>): <b>boşluk</b> ya da <b>doluluk</b> bildirir (açlık, tokluk, susuzluk, öfke).", ex: ["عَطْشَانُ", "ظَمْآنُ", "غَضْبَانُ", "شَبْعَانُ", "جَوْعَانُ", "سَكْرَانُ", "كَسْلَانُ"] },
    { tr: "Müennesi <b>فَعْلَى</b>; bazen <span class=\"ar\">ـَانَةٌ</span> da kullanılır (<span class=\"ar\">شَبْعَانَةٌ</span>).", ex: ["عَطْشَى", "ظَمْأَى", "غَضْبَى", "شَبْعَى", "جَوْعَى", "كَسْلَى"] },
    { tr: "Tasrif: <span class=\"ar\">عَطْشَانُ، عَطْشَانَانِ، عَطْشَانُونَ / عِطَاشٌ · عَطْشَى (عَطْشَانَةٌ)، عَطْشَيَانِ (عَطْشَانَتَانِ)، عَطْشَانَاتٌ / عِطَاشٌ</span>." },
    { tr: "Bu iki vezin <b>gayr-i munsarif</b>tir: tenvin almaz, mansûbu fetha ile olur: <span class=\"ar\">قَمِيصًا أَبْيَضَ</span>." }
  ],
  kaide: [
    "١ ـ أَفْعَلُ: أَحْمَرُ، أَبْيَضُ، أَسْمَرُ، أَزْرَقُ، أَخْضَرُ، أَبْكَمُ، أَحْدَبُ، أَحْمَقُ. مُؤَنَّثُهُ: فَعْلَاءُ: حَمْرَاءُ، بَيْضَاءُ، سَمْرَاءُ، زَرْقَاءُ، خَضْرَاءُ، بَكْمَاءُ. (تَدُلُّ هَذِهِ الصِّيغَةُ عَلَى لَوْنٍ أَوْ عَيْبٍ.) تَصْرِيفُهَا: أَحْمَرُ، أَحْمَرَانِ، حُمْرٌ؛ حَمْرَاءُ، حَمْرَاءَانِ / حَمْرَاوَانِ، حُمْرٌ.",
    "٢ ـ فَعْلَانُ: عَطْشَانُ، ظَمْآنُ، غَضْبَانُ، شَبْعَانُ، جَوْعَانُ، سَكْرَانُ، كَسْلَانُ. مُؤَنَّثُهُ: فَعْلَى: عَطْشَى، ظَمْأَى، غَضْبَى، شَبْعَى، جَوْعَى، سَكْرَى، كَسْلَى. (تَدُلُّ هَذِهِ الصِّيغَةُ عَلَى خُلُوٍّ أَوِ امْتِلَاءٍ.) تَصْرِيفُهَا: عَطْشَانُ، عَطْشَانَانِ، عَطْشَانُونَ / عِطَاشٌ؛ عَطْشَانَةٌ / عَطْشَى، عَطْشَانَتَانِ / عَطْشَيَانِ، عَطْشَانَاتٌ / عِطَاشٌ."
  ],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "ضَعِ الصِّفَةَ المُنَاسِبَةَ", tr: "Parantezdeki sıfatı nitelediği isme uydur: müzekker mi, müennes mi?", items: [
      PK("لَبِسَ عَلِيٌّ قَمِيصًا ___. <span class=\"muted\">(أَبْيَض)</span>", ["أَبْيَضَ", "أَبْيَضًا", "بَيْضَاءَ"], "Ali beyaz bir gömlek giydi.", "Müzekker; gayr-i munsarif olduğu için tenvinsiz fetha: أَبْيَضَ.", 0),
      PK("يَلْبَسُ عَلِيٌّ قُمْصَانًا ___. <span class=\"muted\">(أَبْيَض)</span>", ["بَيْضَاءَ", "أَبْيَضَ", "بَيْضَاءً"], "Ali beyaz gömlekler giyiyor.", "İnsan dışı çoğul müennes tekil sıfat alır: بَيْضَاءَ (بِيضًا da olur).", 1),
      PK("هَذِهِ وَرْدَةٌ ___. <span class=\"muted\">(أَحْمَر)</span>", ["حَمْرَاءُ", "أَحْمَرُ", "أَحْمَرَةٌ"], "Bu kırmızı bir gül.", "Müennes: فَعْلَاءُ → حَمْرَاءُ.", 2),
      PK("السَّمَاءُ ___. <span class=\"muted\">(أَزْرَق)</span>", ["زَرْقَاءُ", "أَزْرَقُ", "زُرْقٌ"], "Gök mavidir.", "السَّمَاءُ müennes: زَرْقَاءُ.", 0),
      PK("المَرِيضَةُ ___. <span class=\"muted\">(شَبْعَان)</span>", ["شَبْعَى", "شَبْعَاءُ", "شِبَاعٌ"], "Hasta kadın tok.", "فَعْلَان → فَعْلَى (kitapta شَبْعَانَةٌ da var).", 1),
      PK("الطِّفْلُ ___. <span class=\"muted\">(جَوْعَان)</span>", ["جَوْعَانُ", "جَوْعَى", "جَائِعَةٌ"], "Çocuk aç.", "Müzekker: جَوْعَانُ.", 2),
      PK("البِنْتُ ___. <span class=\"muted\">(غَضْبَان)</span>", ["غَضْبَى", "غَضْبَانُ", "غَضْبَاءُ"], "Kız öfkeli.", "Müennes: غَضْبَى.", 0),
      PK("الأَوْرَاقُ ___. <span class=\"muted\">(أَخْضَر)</span>", ["خَضْرَاءُ", "أَخْضَرُ", "خُضْرَى"], "Yapraklar yeşil.", "İnsan dışı çoğul → müennes tekil: خَضْرَاءُ.", 1)
    ]},
    { type: "pick", extra: true, ar: "صَرِّفِ الصِّفَةَ", tr: "Tasrif: istenen şekli seç.", items: [
      PK("أَحْمَرُ ← çoğul", ["حُمْرٌ", "أَحْمَرُونَ", "حَمْرَاوَاتٌ"], "kırmızılar", "أَفْعَل'in çoğulu فُعْلٌ: حُمْرٌ.", 0),
      PK("حَمْرَاءُ ← ikil", ["حَمْرَاوَانِ", "حَمْرَاتَانِ", "أَحْمَرَانِ"], "iki kırmızı (müennes)", "Hemze vav'a döner: حَمْرَاوَانِ (حَمْرَاءَانِ da olur).", 1),
      PK("أَبْيَضُ ← müzekker ikil", ["أَبْيَضَانِ", "بَيْضَاوَانِ", "بِيضَانِ"], "iki beyaz", "أَبْيَضَانِ.", 2),
      PK("عَطْشَانُ ← çoğul", ["عِطَاشٌ", "عَطْشَى", "عَطْشَاوَاتٌ"], "susamışlar", "عِطَاشٌ (عَطْشَانُونَ da olur).", 0),
      PK("عَطْشَى ← ikil", ["عَطْشَيَانِ", "عَطْشَاوَانِ", "عَطْشَانَانِ"], "iki susamış kadın", "ى → يَانِ: عَطْشَيَانِ.", 1),
      PK("أَخْضَرُ ← müennes", ["خَضْرَاءُ", "أَخْضَرَةٌ", "خُضْرٌ"], "yeşil (müennes)", "خَضْرَاءُ.", 2)
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · DİĞER VEZİNLER
{
  id: "u3", no: 3, ar: "صِيَغُ الصِّفَةِ المُشَبَّهَةِ", tr: "Diğer Vezinler", short: "Vezinler", col: "cerr", legend: ["mi"],
  goals: ["Diğer vezinleri tanımak: فَعْلٌ، فِعْلٌ، فُعْلٌ، فَعَلٌ، فَعِلٌ، فَعِيلٌ، فَيْعِلٌ، فَعَالٌ، فُعَالٌ", "Âyet ve hadislerde sıfat-ı müşebbeheyi bulup veznini söylemek", "Cümlede uygun sıfat-ı müşebbeheyi kullanmak"],
  examples: [
    { s: "سَهْلٌ:mi.فَعْل / صَعْبٌ:mi.فَعْل", tr: "kolay · zor", pair: "مِلْحٌ:mi.فِعْل / حُلْوٌ:mi.فُعْل", pairTr: "tuzlu · tatlı" },
    { s: "حَسَنٌ:mi.فَعَل / فَرِحٌ:mi.فَعِل", tr: "güzel · sevinçli", pair: "كَرِيمٌ:mi.فَعِيل / طَيِّبٌ:mi.فَيْعِل", pairTr: "cömert · iyi" },
    { s: "جَبَانٌ:mi.فَعَال / شُجَاعٌ:mi.فُعَال", tr: "korkak · cesur" }
  ],
  rules: [
    { tr: "<b>فَعْلٌ</b>: <span class=\"ar\">سَهْلٌ، صَعْبٌ، عَذْبٌ</span> · <b>فِعْلٌ</b>: <span class=\"ar\">مِلْحٌ، رِخْوٌ</span> · <b>فُعْلٌ</b>: <span class=\"ar\">حُلْوٌ، مُرٌّ، حُرٌّ، صُلْبٌ</span>." },
    { tr: "<b>فَعَلٌ</b>: <span class=\"ar\">حَسَنٌ، بَطَلٌ</span> · <b>فَعِلٌ</b>: <span class=\"ar\">فَرِحٌ، تَعِبٌ، قَلِقٌ، حَزِنٌ</span>." },
    { tr: "<b>فَعِيلٌ</b> (en yaygın): <span class=\"ar\">كَرِيمٌ، بَخِيلٌ، جَمِيلٌ، قَبِيحٌ، طَوِيلٌ، قَصِيرٌ، مَرِيضٌ، شَدِيدٌ</span>." },
    { tr: "<b>فَيْعِلٌ</b> (çoğunlukla ortası elif olan fiillerden): <span class=\"ar\">طَيِّبٌ، سَيِّدٌ، جَيِّدٌ، مَيِّتٌ</span>." },
    { tr: "<b>فَعَالٌ</b>: <span class=\"ar\">جَبَانٌ</span> · <b>فُعَالٌ</b>: <span class=\"ar\">شُجَاعٌ، فُرَاتٌ، أُجَاجٌ</span>." },
    { tr: "Dikkat: فَعِيل hem sıfat-ı müşebbehe (<span class=\"ar\">كَرِيمٌ</span>, kalıcı nitelik) hem mübalağa (<span class=\"ar\">رَحِيمٌ، عَلِيمٌ</span>) olabilir; fiile ve anlama bak." }
  ],
  kaide: ["صِيَغُ الصِّفَةِ المُشَبَّهَةِ: ١ ـ أَفْعَلُ ٢ ـ فَعْلَانُ ٣ ـ فَعْلٌ: سَهْلٌ، صَعْبٌ ٤ ـ فِعْلٌ: مِلْحٌ، رِخْوٌ ٥ ـ فُعْلٌ: حُلْوٌ، مُرٌّ، حُرٌّ ٦ ـ فَعَلٌ: حَسَنٌ، بَطَلٌ ٧ ـ فَعِلٌ: فَرِحٌ، تَعِبٌ، قَلِقٌ، حَزِنٌ ٨ ـ فَعِيلٌ: كَرِيمٌ، بَخِيلٌ، جَمِيلٌ، قَبِيحٌ، طَوِيلٌ، قَصِيرٌ، مَرِيضٌ، شَدِيدٌ ٩ ـ فَيْعِلٌ: طَيِّبٌ، سَيِّدٌ، جَيِّدٌ، مَيِّتٌ (غَالِبًا مِنَ الفِعْلِ الأَجْوَفِ) ١٠ ـ فَعَالٌ: جَبَانٌ ١١ ـ فُعَالٌ: شُجَاعٌ، فُرَاتٌ، أُجَاجٌ."],
  ex: [
    { type: "find", target: "y", num: "١ (أ)", ar: "ضَعْ خَطًّا تَحْتَ الصِّفَةِ المُشَبَّهَةِ", tr: "Sıfat-ı müşebbeheye dokun. İsm-i fâil (شَانِئَكَ) ve isim (الخَطِيبِ، المِيزَانِ) hedef değil.", items: [
      W("﴿هَذَا [عَذْبٌ] [فُرَاتٌ] وَهَذَا [مِلْحٌ] [أُجَاجٌ]﴾", "Bu tatlı, susuzluk giderici; şu tuzlu, acı. (Furkân 25/53)", "عَذْبٌ فَعْل; فُرَاتٌ فُعَال; مِلْحٌ فِعْل; أُجَاجٌ فُعَال."),
      W("﴿وَإِنَّكَ لَعَلَى خُلُقٍ [عَظِيمٍ]﴾", "Sen elbette büyük bir ahlâk üzeresin. (Kalem 68/4)", "عَظِيمٌ: فَعِيل (عَظُمَ)."),
      W("﴿الَّذِي جَعَلَ لَكُمْ مِنَ الشَّجَرِ [الأَخْضَرِ] نَارًا﴾", "O ki size yeşil ağaçtan ateş çıkardı. (Yâsîn 36/80)", "أَخْضَرُ: أَفْعَل (renk)."),
      W("﴿إِنَّ شَانِئَكَ هُوَ [الأَبْتَرُ]﴾", "Asıl soyu kesik olan sana buğzedendir. (Kevser 108/3)", "أَبْتَرُ: أَفْعَل (kusur). شَانِئٌ ism-i fâildir."),
      W("﴿يَحْسَبُهُ [الظَّمْآنُ] مَاءً﴾", "Susamış kişi onu su sanır. (Nûr 24/39)", "ظَمْآنُ: فَعْلَان."),
      W("كَلِمَتَانِ [خَفِيفَتَانِ] عَلَى اللِّسَانِ، [ثَقِيلَتَانِ] فِي المِيزَانِ، [حَبِيبَتَانِ] إِلَى الرَّحْمَنِ: سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ [العَظِيمِ].", "İki kelime vardır ki dile hafif, mizanda ağır, Rahmân'a sevimlidir: Sübhânallâhi ve bi-hamdihî, Sübhânallâhi'l-azîm.", "خَفِيفٌ، ثَقِيلٌ، حَبِيبٌ، عَظِيمٌ: فَعِيل. الرَّحْمَنُ da فَعْلَان veznindedir ama âlimler onu çoğunlukla mübalağa sayar; burada hedef değil."),
      W("أُسْلُوبُ الخَطِيبِ [حَسَنٌ].", "Hatibin üslûbu güzeldir.", "حَسَنٌ: فَعَل. الخَطِيبُ burada \"hatip\" anlamında bir isim."),
      W("المُسْلِمُونَ [فَرِحُونَ] بِحُلُولِ عِيدِ الفِطْرِ.", "Müslümanlar Ramazan Bayramı'nın gelişine seviniyor.", "فَرِحٌ: فَعِل (çoğulu فَرِحُونَ).")
    ]},
    { type: "classify", num: "١ (ب)", opts: VZ_OPTS, ar: "اذْكُرْ صِيغَتَهَا", tr: "Bulduğun sıfat-ı müşebbehe hangi vezinde?", items: [
      { s: "عَذْبٌ", a: "fl", why: "فَعْل." }, { s: "فُرَاتٌ", a: "fual", why: "فُعَال." }, { s: "مِلْحٌ", a: "fil", why: "فِعْل." },
      { s: "أُجَاجٌ", a: "fual", why: "فُعَال." }, { s: "عَظِيمٌ", a: "fy", why: "فَعِيل." }, { s: "الأَخْضَرُ", a: "af", why: "أَفْعَل." },
      { s: "الأَبْتَرُ", a: "af", why: "أَفْعَل." }, { s: "الظَّمْآنُ", a: "fn", why: "فَعْلَان." }, { s: "خَفِيفَتَانِ", a: "fy", why: "خَفِيفٌ: فَعِيل (ikil)." },
      { s: "ثَقِيلَتَانِ", a: "fy", why: "ثَقِيلٌ: فَعِيل." }, { s: "حَسَنٌ", a: "faa", why: "فَعَل." }, { s: "فَرِحُونَ", a: "fai", why: "فَرِحٌ: فَعِل." }
    ]},
    { type: "bank", num: "٣", ar: "امْلَإِ الفَرَاغَ بِصِفَةٍ مُشَبَّهَةٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Önce aşağıdan bir sıfat seç, sonra uygun boşluğa dokun. Harekeye (ٌ، ًا، ِ) dikkat.",
      bank: ["طَوِيلٌ", "الجَمِيلِ", "صَحِيحٌ", "قَصِيرٌ", "سَلِيمًا", "حَسَنَةٌ", "صَعْبًا", "الشَّدِيدِ"], items: [
      { pre: "عَطِشَ الصَّائِمُ مِنَ الحَرِّ", h: ".", a: [7], tr: "Oruçlu, şiddetli sıcaktan susadı." },
      { pre: "طَرِيقُ النَّجَاحِ", h: ".", a: [0], tr: "Başarının yolu uzundur." },
      { pre: "حَبْلُ الكَذِبِ", h: ".", a: [3], tr: "Yalanın ipi kısadır." },
      { pre: "لَيْسَ النَّجَاحُ", h: ".", a: [6], tr: "Başarı zor değildir." },
      { pre: "أَخْلَاقُ حُسَيْنٍ", h: ".", a: [5], tr: "Hüseyin'in ahlâkı güzeldir." },
      { pre: "جَوَابُ عَلِيٍّ", h: ".", a: [2], tr: "Ali'nin cevabı doğrudur." },
      { pre: "نَظَرَ السَّائِحُ إِلَى الوَادِي", h: ".", a: [1], tr: "Turist güzel vadiye baktı." },
      { pre: "وَهَبَ اللهُ لِلْأَدِيبِ ذَوْقًا", h: ".", a: [4], tr: "Allah edibe sağlam bir zevk verdi." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ: الصَّدِيقُ", tr: "Okuma: Dost", short: "Okuma", col: "muz", legend: ["mi"],
  goals: ["Bir metinde sıfat-ı müşebbeheyi bulmak", "Zıt sıfatları görmek: قَلِيلٌ ↔ كَثِيرٌ، ضَعِيفٌ ↔ قَوِيٌّ", "فَعِيل vezninde ama isim olan kelimeyi (الصَّدِيقُ) ayırmak"],
  examples: [
    { s: "المَرْءُ:- / قَلِيلٌ:mi.فَعِيل / بِنَفْسِهِ:- / كَثِيرٌ:mi.فَعِيل / بِإِخْوَانِهِ:-", tr: "Kişi kendi başına azdır, kardeşleriyle çoktur." },
    { s: "وَهُوَ:- / ضَعِيفٌ:mi.فَعِيل / وَحْدَهُ:- / قَوِيٌّ:mi.فَعِيل / بِأَصْدِقَائِهِ:-", tr: "O tek başına zayıf, dostlarıyla güçlüdür." },
    { s: "وَالصَّدِيقُ:- / الوَفِيُّ:mi.فَعِيل", tr: "vefalı dost" }
  ],
  rules: [
    { tr: "Metindeki sıfat-ı müşebbeheler فَعِيل veznindedir: <span class=\"ar\">قَلِيلٌ، كَثِيرٌ، ضَعِيفٌ، قَوِيٌّ، الوَفِيُّ</span>." },
    { tr: "<span class=\"ar\">قَوِيٌّ، وَفِيٌّ</span>: son harf و ya da ي olduğu için şedde: <span class=\"ar\">قَوِيْيٌ ← قَوِيٌّ</span>." },
    { tr: "<span class=\"ar\">الصَّدِيقُ</span> de فَعِيل kalıbında ama burada \"dost\" anlamında bir isimdir; kimseyi nitelemiyor." }
  ],
  kaide: ["اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ عَيِّنِ الصِّفَةَ المُشَبَّهَةَ."],
  ex: [
    { type: "reading", num: "٤", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ", tr: "Metni oku; sorulara bak. Ardından sıfat-ı müşebbeheleri bul.", title: "الصَّدِيقُ",
      text: "المَرْءُ قَلِيلٌ بِنَفْسِهِ، كَثِيرٌ بِإِخْوَانِهِ، وَهُوَ ضَعِيفٌ وَحْدَهُ، قَوِيٌّ بِأَصْدِقَائِهِ. وَالصَّدِيقُ الوَفِيُّ يُسَاعِدُ صَدِيقَهُ فِي السَّرَّاءِ وَالضَّرَّاءِ وَفِي اليُسْرِ وَالعُسْرِ، وَيَجِبُ عَلَى الإِنْسَانِ أَنْ يَطْلُبَ الصَّدِيقَ الَّذِي يُرْشِدُهُ إِلَى الخَيْرِ وَيُبْعِدُهُ عَنِ الشَّرِّ.",
      textTr: "Dost. Kişi kendi başına azdır, kardeşleriyle çoktur; tek başına zayıf, dostlarıyla güçlüdür. Vefalı dost, dostuna iyi günde ve kötü günde, kolaylıkta ve zorlukta yardım eder. İnsanın kendisini hayra yönelten ve kötülükten uzaklaştıran dostu araması gerekir.",
      qa: [
        { q: "مَتَى يَكُونُ المَرْءُ قَوِيًّا؟", a: "يَكُونُ قَوِيًّا بِأَصْدِقَائِهِ.", tr: "Kişi ne zaman güçlüdür? Dostlarıyla." },
        { q: "مَاذَا يَفْعَلُ الصَّدِيقُ الوَفِيُّ؟", a: "يُسَاعِدُ صَدِيقَهُ فِي السَّرَّاءِ وَالضَّرَّاءِ وَفِي اليُسْرِ وَالعُسْرِ.", tr: "Vefalı dost ne yapar? İyi ve kötü günde, kolaylık ve zorlukta dostuna yardım eder." },
        { q: "أَيَّ صَدِيقٍ يَطْلُبُ الإِنْسَانُ؟", a: "يَطْلُبُ الصَّدِيقَ الَّذِي يُرْشِدُهُ إِلَى الخَيْرِ وَيُبْعِدُهُ عَنِ الشَّرِّ.", tr: "İnsan nasıl bir dost aramalı? Onu hayra yönelten, kötülükten uzaklaştıran dostu." }
      ]
    },
    { type: "find", target: "y", num: "٤", ar: "عَيِّنِ الصِّفَةَ المُشَبَّهَةَ", tr: "Sıfat-ı müşebbeheye dokun. Tuzak: الصَّدِيقُ (isim).", items: [
      W("المَرْءُ [قَلِيلٌ] بِنَفْسِهِ، [كَثِيرٌ] بِإِخْوَانِهِ،", "Kişi kendi başına azdır, kardeşleriyle çoktur.", "قَلِيلٌ، كَثِيرٌ: فَعِيل."),
      W("وَهُوَ [ضَعِيفٌ] وَحْدَهُ، [قَوِيٌّ] بِأَصْدِقَائِهِ.", "O tek başına zayıf, dostlarıyla güçlüdür.", "ضَعِيفٌ، قَوِيٌّ: فَعِيل."),
      W("وَالصَّدِيقُ [الوَفِيُّ] يُسَاعِدُ صَدِيقَهُ فِي السَّرَّاءِ وَالضَّرَّاءِ وَفِي اليُسْرِ وَالعُسْرِ،", "Vefalı dost, dostuna iyi günde ve kötü günde, kolaylıkta ve zorlukta yardım eder.", "الوَفِيُّ: فَعِيل. الصَّدِيقُ isim; السَّرَّاءُ ve الضَّرَّاءُ (iyi gün, kötü gün) isimdir."),
      W("وَيَجِبُ عَلَى الإِنْسَانِ أَنْ يَطْلُبَ الصَّدِيقَ الَّذِي يُرْشِدُهُ إِلَى الخَيْرِ وَيُبْعِدُهُ عَنِ الشَّرِّ.", "İnsanın, kendisini hayra yönelten ve kötülükten uzaklaştıran dostu araması gerekir.", "Bu cümlede sıfat-ı müşebbehe yok.")
    ]}
  ]
}
];

// Doğru Sıfat oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var SF_POOL = [
  ["المَرِيضُ {شَبْعَانُ}.", ["شَبْعَانُ", "شَابِعٌ", "مَشْبُوعٌ"], "tokluk hâli → فَعْلَان", "Hasta tok.", "u1"],
  ["الأُسْتَاذُ {نَشِيطٌ}.", ["نَشِيطٌ", "نَاشِطٌ", "مَنْشُوطٌ"], "kalıcı nitelik → فَعِيل", "Hoca çalışkan.", "u1"],
  ["الكَذِبُ {قَبِيحٌ}.", ["قَبِيحٌ", "قَابِحٌ", "مَقْبُوحٌ"], "قَبُحَ → فَعِيل", "Yalan çirkindir.", "u1"],
  ["الثَّلْجُ {صُلْبٌ}.", ["صُلْبٌ", "صَالِبٌ", "مَصْلُوبٌ"], "صَلُبَ → فُعْل", "Buz serttir.", "u1"],
  ["النَّصْرُ {قَرِيبٌ}.", ["قَرِيبٌ", "قَارِبٌ", "قُرْبٌ"], "قَرُبَ → فَعِيل", "Zafer yakındır.", "u1"],
  ["العَدُوُّ {جَبَانٌ}.", ["جَبَانٌ", "جَابِنٌ", "جُبْنٌ"], "جَبُنَ → فَعَال", "Düşman korkaktır.", "u1"],
  ["لَبِسَ عَلِيٌّ قَمِيصًا {أَبْيَضَ}.", ["أَبْيَضَ", "بَيْضَاءَ", "أَبْيَضًا"], "müzekker, tenvinsiz", "Ali beyaz bir gömlek giydi.", "u2"],
  ["هَذِهِ وَرْدَةٌ {حَمْرَاءُ}.", ["حَمْرَاءُ", "أَحْمَرُ", "حُمْرٌ"], "müennes → فَعْلَاء", "Bu kırmızı bir gül.", "u2"],
  ["المَرْأَةُ {ظَمْأَى}.", ["ظَمْأَى", "ظَمْآنُ", "ظَمْآءُ"], "müennes → فَعْلَى", "Kadın susamış.", "u2"],
  ["الطِّفْلُ {جَوْعَانُ}.", ["جَوْعَانُ", "جَوْعَى", "جَائِعَاءُ"], "müzekker → فَعْلَان", "Çocuk aç.", "u2"],
  ["﴿مِنَ الشَّجَرِ {الأَخْضَرِ} نَارًا﴾", ["الأَخْضَرِ", "الخَضْرَاءِ", "الخُضْرِ"], "الشَّجَرُ müzekker → أَفْعَل", "Yeşil ağaçtan ateş.", "u2"],
  ["﴿يَحْسَبُهُ {الظَّمْآنُ} مَاءً﴾", ["الظَّمْآنُ", "الظَّامِئُ", "الظَّمَأُ"], "susuzluk → فَعْلَان", "Susamış onu su sanır.", "u2"],
  ["﴿هَذَا عَذْبٌ {فُرَاتٌ}﴾", ["فُرَاتٌ", "فَارِتٌ", "مَفْرُوتٌ"], "فُعَال", "Bu tatlı, susuzluk giderici.", "u3"],
  ["﴿وَإِنَّكَ لَعَلَى خُلُقٍ {عَظِيمٍ}﴾", ["عَظِيمٍ", "عَاظِمٍ", "مُعَظَّمٍ"], "فَعِيل", "Sen büyük bir ahlâk üzeresin.", "u3"],
  ["أُسْلُوبُ الخَطِيبِ {حَسَنٌ}.", ["حَسَنٌ", "حَاسِنٌ", "حُسْنٌ"], "فَعَل", "Hatibin üslûbu güzel.", "u3"],
  ["المُسْلِمُونَ {فَرِحُونَ} بِالعِيدِ.", ["فَرِحُونَ", "فَارِحُونَ", "مَفْرُوحُونَ"], "فَعِل, çoğul", "Müslümanlar bayrama seviniyor.", "u3"],
  ["طَرِيقُ النَّجَاحِ {طَوِيلٌ}.", ["طَوِيلٌ", "طَائِلٌ", "طُولٌ"], "فَعِيل", "Başarının yolu uzundur.", "u3"],
  ["هَذَا طَعَامٌ {طَيِّبٌ}.", ["طَيِّبٌ", "طَائِبٌ", "مَطْيُوبٌ"], "فَيْعِل", "Bu güzel bir yemek.", "u3"],
  ["المُجَاهِدُ {شُجَاعٌ}.", ["شُجَاعٌ", "شَاجِعٌ", "شَجَاعَةٌ"], "فُعَال", "Mücahit cesurdur.", "u3"],
  ["المَرْءُ {قَلِيلٌ} بِنَفْسِهِ.", ["قَلِيلٌ", "قَالِلٌ", "قِلَّةٌ"], "فَعِيل", "Kişi kendi başına azdır.", "u4"],
  ["المَرْءُ {كَثِيرٌ} بِإِخْوَانِهِ.", ["كَثِيرٌ", "كَاثِرٌ", "كَثْرَةٌ"], "فَعِيل", "Kişi kardeşleriyle çoktur.", "u4"],
  ["هُوَ {ضَعِيفٌ} وَحْدَهُ.", ["ضَعِيفٌ", "ضَاعِفٌ", "مُضَاعَفٌ"], "فَعِيل", "O tek başına zayıftır.", "u4"],
  ["هُوَ {قَوِيٌّ} بِأَصْدِقَائِهِ.", ["قَوِيٌّ", "قَاوٍ", "قُوَّةٌ"], "فَعِيل", "O dostlarıyla güçlüdür.", "u4"],
  ["وَالصَّدِيقُ {الوَفِيُّ} يُسَاعِدُ صَدِيقَهُ.", ["الوَفِيُّ", "الوَافِي", "الوَفَاءُ"], "فَعِيل", "Vefalı dost dostuna yardım eder.", "u4"]
];
var ZIT = [["طَوِيلٌ", "قَصِيرٌ"], ["سَهْلٌ", "صَعْبٌ"], ["حُلْوٌ", "مُرٌّ"], ["جَبَانٌ", "شُجَاعٌ"], ["شَبْعَانُ", "جَوْعَانُ"], ["قَوِيٌّ", "ضَعِيفٌ"], ["كَرِيمٌ", "بَخِيلٌ"], ["جَمِيلٌ", "قَبِيحٌ"], ["قَلِيلٌ", "كَثِيرٌ"], ["أَبْيَضُ", "أَسْوَدُ"], ["فَرِحٌ", "حَزِنٌ"], ["عَذْبٌ", "مِلْحٌ"]];
var HAFIZA = {
  mu: { name: "Müzekker ↔ müennes", pairs: SM.filter(function (e) { return e[1] === "af" || e[1] === "fn"; }).map(function (e) { return [e[0], e[4]]; }) },
  zt: { name: "Zıt sıfatlar", pairs: ZIT },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["أَحْمَرُ", "kırmızı"], ["أَبْيَضُ", "beyaz"], ["أَخْضَرُ", "yeşil"], ["أَزْرَقُ", "mavi"], ["عَطْشَانُ", "susamış"], ["جَوْعَانُ", "aç"], ["غَضْبَانُ", "öfkeli"], ["كَسْلَانُ", "tembel"], ["سَهْلٌ", "kolay"], ["حُلْوٌ", "tatlı"], ["شُجَاعٌ", "cesur"], ["تَعِبٌ", "yorgun"]] }
};
var KARTLAR = [
  ["Sıfat-ı müşebbehe nedir?", "Lâzım üç harfli fiilden alınan, ism-i fâilin anlamını kalıcı bir nitelik olarak gösteren müştak isim."],
  ["Hangi bâblardan gelir?", "Çoğunlukla 4. bâb (فَعِلَ يَفْعَلُ) ve 5. bâb (فَعُلَ يَفْعُلُ)."],
  ["أَفْعَلُ neyi bildirir?", "Renk ya da kusur: أَحْمَرُ، أَبْكَمُ"],
  ["أَفْعَلُ'ün müennesi ve çoğulu?", "فَعْلَاءُ ve فُعْلٌ: حَمْرَاءُ، حُمْرٌ"],
  ["فَعْلَانُ neyi bildirir?", "Boşluk ya da doluluk: عَطْشَانُ، شَبْعَانُ، جَوْعَانُ"],
  ["فَعْلَانُ'ın müennesi?", "فَعْلَى: عَطْشَى (bazen عَطْشَانَةٌ)"],
  ["حَمْرَاءُ'nun ikili?", "حَمْرَاوَانِ (حَمْرَاءَانِ)"],
  ["فَعِيل örnekleri?", "كَرِيمٌ، جَمِيلٌ، طَوِيلٌ، عَظِيمٌ، قَرِيبٌ"],
  ["فَيْعِل örnekleri?", "طَيِّبٌ، سَيِّدٌ، جَيِّدٌ، مَيِّتٌ (çoğunlukla ecvef fiilden)"],
  ["فُعَال örnekleri?", "شُجَاعٌ، فُرَاتٌ، أُجَاجٌ"],
  ["İsm-i fâilden farkı?", "İsm-i fâil geçici iş (ذَاهِبٌ); sıfat-ı müşebbehe kalıcı nitelik (طَوِيلٌ)."],
  ["قَمِيصًا أَبْيَضَ neden tenvinsiz?", "أَفْعَلُ ve فَعْلَانُ gayr-i munsariftir: tenvin almaz."]
];
