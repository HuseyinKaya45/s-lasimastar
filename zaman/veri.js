// ================= VERİ: İsm-i Zaman, İsm-i Mekân, Mim’li Masdar =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  nasb: { ar: "اسْمُ زَمَانٍ", tr: "İsm-i zaman" }, cerr: { ar: "اسْمُ مَكَانٍ", tr: "İsm-i mekân" }, mi: { ar: "مَصْدَرٌ مِيمِيٌّ", tr: "Mim’li masdar" },
  mz: { ar: "الفِعْلُ", tr: "Fiil" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TUR = [["z", "İsm-i zaman", "اسْمُ زَمَانٍ", "nasb"], ["m", "İsm-i mekân", "اسْمُ مَكَانٍ", "cerr"], ["d", "Mim’li masdar", "مَصْدَرٌ مِيمِيٌّ", "mi"]];
var TUR_TR = { z: "İsm-i zaman", m: "İsm-i mekân", d: "Mim’li masdar" };
var VZ = [["a", "Mef’al", "مَفْعَلٌ", "mz"], ["i", "Mef’il", "مَفْعِلٌ", "ref"], ["z", "Mef’ûl kalıbı", "مُفْعَلٌ", "mun"]];
var VZ3 = [["a", "Mef’al", "مَفْعَلٌ", "mz"], ["i", "Mef’il", "مَفْعِلٌ", "ref"], ["at", "Mef’ala", "مَفْعَلَةٌ", "mun"]];
// Sebep → vezin
var KEY = {
  u: ["a", "Muzâride ayn ötreli (يَفْعُلُ)"], a: ["a", "Muzâride ayn üstünlü (يَفْعَلُ)"], i: ["i", "Muzâride ayn esreli (يَفْعِلُ)"],
  md: ["a", "Muzâaf (son iki harf aynı)"], av: ["a", "Ecvef vâvî (orta harf و)"], n: ["a", "Nâkıs (son harf illetli)"], l: ["a", "Lefîf (iki illet harfi)"],
  ms: ["i", "Misâl (ilk harf و)"], ay: ["i", "Ecvef yâî (orta harf ي)"], z: ["z", "Mezîd (üç harften fazla)"]
};
// Fiiller: [mâzi, muzâri, sebep, doğru isim, yanlış 1, yanlış 2, anlam]
var VERBS = [
  ["كَتَبَ", "يَكْتُبُ", "u", "مَكْتَبٌ", "مَكْتِبٌ", "مَكْتُوبٌ", "yazı yeri, büro"],
  ["خَرَجَ", "يَخْرُجُ", "u", "مَخْرَجٌ", "مَخْرِجٌ", "مَخْرُوجٌ", "çıkış"],
  ["دَخَلَ", "يَدْخُلُ", "u", "مَدْخَلٌ", "مَدْخِلٌ", "مَدْخُولٌ", "giriş"],
  ["نَظَرَ", "يَنْظُرُ", "u", "مَنْظَرٌ", "مَنْظِرٌ", "مَنْظُورٌ", "manzara, görünüş"],
  ["شَرِبَ", "يَشْرَبُ", "a", "مَشْرَبٌ", "مَشْرِبٌ", "مَشْرُوبٌ", "içme yeri, içiş"],
  ["لَعِبَ", "يَلْعَبُ", "a", "مَلْعَبٌ", "مَلْعِبٌ", "مَلْعُوبٌ", "oyun yeri, saha"],
  ["طَعِمَ", "يَطْعَمُ", "a", "مَطْعَمٌ", "مَطْعِمٌ", "مَطْعُومٌ", "lokanta, yemek"],
  ["ذَهَبَ", "يَذْهَبُ", "a", "مَذْهَبٌ", "مَذْهِبٌ", "مَذْهُوبٌ", "gidiş, gidilen yol"],
  ["جَلَسَ", "يَجْلِسُ", "i", "مَجْلِسٌ", "مَجْلَسٌ", "مَجْلُوسٌ", "oturma yeri / vakti, meclis"],
  ["رَجَعَ", "يَرْجِعُ", "i", "مَرْجِعٌ", "مَرْجَعٌ", "مَرْجُوعٌ", "dönüş yeri, kaynak"],
  ["عَرَضَ", "يَعْرِضُ", "i", "مَعْرِضٌ", "مَعْرَضٌ", "مَعْرُوضٌ", "sergi"],
  ["نَزَلَ", "يَنْزِلُ", "i", "مَنْزِلٌ", "مَنْزَلٌ", "مَنْزُولٌ", "konak, ev"],
  ["هَبَطَ", "يَهْبِطُ", "i", "مَهْبِطٌ", "مَهْبَطٌ", "مَهْبُوطٌ", "iniş yeri"],
  ["وَعَدَ", "يَعِدُ", "ms", "مَوْعِدٌ", "مَوْعَدٌ", "مَوْعُودٌ", "randevu, buluşma vakti"],
  ["وَلَدَ", "يَلِدُ", "ms", "مَوْلِدٌ", "مَوْلَدٌ", "مَوْلُودٌ", "doğum yeri / vakti"],
  ["وَقَفَ", "يَقِفُ", "ms", "مَوْقِفٌ", "مَوْقَفٌ", "مَوْقُوفٌ", "durak, duruş yeri"],
  ["صَارَ", "يَصِيرُ", "ay", "مَصِيرٌ", "مَصَارٌ", "مَصْيُورٌ", "varış, dönüş"],
  ["بَاتَ", "يَبِيتُ", "ay", "مَبِيتٌ", "مَبَاتٌ", "مَبْيُوتٌ", "gecelenecek yer"],
  ["قَامَ", "يَقُومُ", "av", "مَقَامٌ", "مَقِيمٌ", "مَقُومٌ", "durulan yer, makam"],
  ["زَارَ", "يَزُورُ", "av", "مَزَارٌ", "مَزِيرٌ", "مَزُورٌ", "ziyaret yeri"],
  ["فَرَّ", "يَفِرُّ", "md", "مَفَرٌّ", "مَفِرٌّ", "مَفْرُورٌ", "kaçacak yer"],
  ["مَرَّ", "يَمُرُّ", "md", "مَمَرٌّ", "مَمِرٌّ", "مَمْرُورٌ", "geçit, koridor"],
  ["بَنَى", "يَبْنِي", "n", "مَبْنًى", "مَبْنِيٌّ", "مَبْنِي", "bina"],
  ["رَمَى", "يَرْمِي", "n", "مَرْمًى", "مَرْمِيٌّ", "مَرْمِي", "kale, hedef"],
  ["سَعَى", "يَسْعَى", "n", "مَسْعًى", "مَسْعِيٌّ", "مَسْعِي", "say yeri, çaba"],
  ["أَوَى", "يَأْوِي", "l", "مَأْوًى", "مَأْوِيٌّ", "مَأْوِي", "barınak"],
  ["اِنْتَصَفَ", "يَنْتَصِفُ", "z", "مُنْتَصَفٌ", "مُنْتَصِفٌ", "مَنْتَصَفٌ", "orta (yer ya da vakit)"],
  ["اِجْتَمَعَ", "يَجْتَمِعُ", "z", "مُجْتَمَعٌ", "مُجْتَمِعٌ", "مَجْتَمَعٌ", "toplanma yeri, toplum"],
  ["اِسْتَشْفَى", "يَسْتَشْفِي", "z", "مُسْتَشْفًى", "مُسْتَشْفٍ", "مَسْتَشْفًى", "hastane"],
  ["صَلَّى", "يُصَلِّي", "z", "مُصَلًّى", "مُصَلٍّ", "مَصْلًى", "namazgâh"],
  ["اِلْتَقَى", "يَلْتَقِي", "z", "مُلْتَقًى", "مُلْتَقٍ", "مَلْقًى", "buluşma yeri"]
];
var KEY_NOTE = {
  i: "Bu kalıp zaman ve mekân içindir. Aynı fiilden kıyâsî mim’li masdar مَفْعَل gelir: ",
  ms: "Misâlde mim’li masdar da مَفْعِل gelir: مَوْعِدٌ (söz verme).",
  ay: "Zaman ve mekân مَفْعِل; مَصِيرٌ ve مَبِيتٌ masdar olarak da kullanılır.",
  z: "Mezîdde üçü de ism-i mef’ûl kalıbındadır: başta ötreli mîm, sondan önceki harf üstünlü.",
  n: "Sondaki illet harfi elif-i maksûreye döner: مَبْنًى (aslı مَبْنَيٌ).",
  l: "Lefîf: مَأْوًى (aslı مَأْوَيٌ).",
  av: "Ortadaki vâv elife döner: مَقَامٌ (aslı مَقْوَمٌ).",
  md: "İki aynı harf idğam olur: مَفَرٌّ (aslı مَفْرَرٌ)."
};

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function SUR(s) { return ' <small class="muted">(' + s + ')</small>'; }
// Fiil → vezin sınıflandırma maddeleri
function vzItems(list) {
  return list.map(function (m) {
    var v = VERBS.filter(function (x) { return x[0] === m; })[0], k = KEY[v[2]];
    return { s: v[0] + " – " + v[1], a: k[0], why: k[1] + ' → <span class="ar">' + v[3] + '</span>.' };
  });
}

var UNITS = [
// ---------------------------------------------------------------- 1 · ÜÇ İSİM
{
  id: "u1", no: 1, ar: "اسْمُ الزَّمَانِ وَاسْمُ المَكَانِ وَالمَصْدَرُ المِيمِيُّ", tr: "Üç İsim, Tek Kalıp", short: "Üç isim", col: "mi", legend: ["nasb", "cerr", "mi"],
  goals: ["İsm-i zamanın işin vaktini, ism-i mekânın işin yerini, mim’li masdarın işin kendisini bildirdiğini bilmek", "Üçünün aynı kalıpta geldiğini, aralarını cümlenin (siyak) ayırdığını görmek", "Cümlede bu isimleri bulup türünü söylemek"],
  examples: [
    { s: "مَدْخَلُ:cerr / الكُلِّيَّةِ وَاسِعٌ.:-", tr: "Fakültenin girişi (giriş yeri) geniştir.", pair: "أَكَلْتُ الغَدَاءَ فِي:- / المَنْزِلِ.:cerr", pairTr: "Öğle yemeğini evde yedim." },
    { s: "عَمِلْتُ وَاجِبِي فِي:- / المَكْتَبَةِ.:cerr", tr: "Ödevimi kütüphanede yaptım.", pair: "أُرِيدُ:- / مَخْرَجًا:mi / جَمِيلًا مِنَ المُشْكِلَةِ.:-", pairTr: "Sorundan güzel bir çıkış istiyorum." },
    { s: "خَرَجْتُ مِنَ البَيْتِ:- / مَطْلَعَ:nasb / الشَّمْسِ.:-", tr: "Evden güneşin doğuşu vaktinde çıktım.", pair: "وَقَفَتِ السَّيَّارَةُ فِي:- / مُنْتَصَفِ:cerr / الطَّرِيقِ.:-", pairTr: "Araba yolun ortasında durdu." }
  ],
  rules: [
    { tr: "<b class=\"r-nasb\">İsm-i zaman</b> (<span class=\"ar\">اسْمُ الزَّمَانِ</span>): işin <b>vaktini</b> bildiren türemiş isim: <span class=\"ar\">مَطْلَعَ الشَّمْسِ</span> = güneşin doğduğu vakit. Soru: <b>ne zaman?</b>" },
    { tr: "<b class=\"r-cerr\">İsm-i mekân</b> (<span class=\"ar\">اسْمُ المَكَانِ</span>): işin <b>yerini</b> bildiren türemiş isim: <span class=\"ar\">المَنْزِلُ، المَكْتَبَةُ، مَدْخَلُ الكُلِّيَّةِ</span>. Soru: <b>nerede?</b>" },
    { tr: "<b class=\"r-mi\">Mim’li masdar</b> (<span class=\"ar\">المَصْدَرُ المِيمِيُّ</span>): başına fazladan bir mîm gelen masdar; asıl masdarın anlamını taşır: <span class=\"ar\">مَخْرَجٌ = خُرُوجٌ</span> (çıkış). Soru: <b>ne / ne yapmak?</b>" },
    { tr: "Üçü de <b>aynı kalıpta</b> gelir; hangisi olduğunu <b>cümle</b> (siyak) belirler:", ex: ["مَخْرَجُ المَحَطَّةِ قَرِيبٌ (mekân)", "مَخْرَجُ القِطَارِ السَّاعَةَ الخَامِسَةَ (zaman)", "أُرِيدُ مَخْرَجًا مِنَ المُشْكِلَةِ (masdar)"] },
    { tr: "Dikkat: Mîmle başlayan her kelime bu üçünden değildir. <span class=\"ar\">مُغْلَقَةٌ، مَفْتُوحَةٌ</span> ism-i mef’ûl, <span class=\"ar\">المُتَّقِينَ</span> ism-i fâil, <span class=\"ar\">المَرْءُ</span> ise mîmi aslî olan bir isimdir." }
  ],
  kaide: [
    "اسْمُ الزَّمَانِ: اسْمٌ مُشْتَقٌّ يَدُلُّ عَلَى زَمَانِ الحَدَثِ.",
    "اسْمُ المَكَانِ: اسْمٌ مُشْتَقٌّ يَدُلُّ عَلَى مَكَانِ الحَدَثِ.",
    "المَصْدَرُ المِيمِيُّ: مَصْدَرٌ مَبْدُوءٌ بِمِيمٍ زَائِدَةٍ، وَلَهُ مَعْنَى المَصْدَرِ الأَصْلِيِّ.",
    "يَأْتِي اسْمُ الزَّمَانِ وَاسْمُ المَكَانِ وَالمَصْدَرُ المِيمِيُّ دَائِمًا عَلَى صُورَةٍ وَاحِدَةٍ، وَالسِّيَاقُ يُفَرِّقُ بَيْنَهَا."
  ],
  ex: [
    { type: "classify", extra: true, opts: TUR, ar: "مَا نَوْعُ الكَلِمَةِ المُلَوَّنَةِ؟", tr: "Isınma: kitabın örnek cümlelerinde koyu kelime zaman mı, mekân mı, mim’li masdar mı? Ne zaman? Nerede? Ne?", items: [
      { s: HL("مَدْخَلُ الكُلِّيَّةِ وَاسِعٌ.", "مَدْخَلُ"), a: "m", why: "Giriş yeri: nerede?", tr: "Fakültenin girişi geniştir." },
      { s: HL("أَكَلْتُ الغَدَاءَ فِي المَنْزِلِ.", "المَنْزِلِ"), a: "m", why: "Ev: yemeğin yendiği yer.", tr: "Öğle yemeğini evde yedim." },
      { s: HL("عَمِلْتُ وَاجِبِي فِي المَكْتَبَةِ.", "المَكْتَبَةِ"), a: "m", why: "Kütüphane: yer (tâ’lı, semâî).", tr: "Ödevimi kütüphanede yaptım." },
      { s: HL("أُرِيدُ مَخْرَجًا جَمِيلًا مِنَ المُشْكِلَةِ.", "مَخْرَجًا"), a: "d", why: "Çıkış (خُرُوجٌ): işin kendisi.", tr: "Sorundan güzel bir çıkış istiyorum." },
      { s: HL("خَرَجْتُ مِنَ البَيْتِ مَطْلَعَ الشَّمْسِ.", "مَطْلَعَ"), a: "z", why: "Güneşin doğduğu vakit: ne zaman?", tr: "Evden güneş doğarken çıktım." },
      { s: HL("وَقَفَتِ السَّيَّارَةُ فِي مُنْتَصَفِ الطَّرِيقِ.", "مُنْتَصَفِ"), a: "m", why: "Yolun ortası: yer. Mezîd اِنْتَصَفَ'den, ism-i mef’ûl kalıbında.", tr: "Araba yolun ortasında durdu." }
    ]},
    { type: "find", target: "y", num: "٤", ar: "ضَعْ خَطًّا تَحْتَ اسْمِ الزَّمَانِ وَالمَكَانِ وَالمَصْدَرِ المِيمِيِّ", tr: "Zaman, mekân ya da mim’li masdar olan kelimeye dokun. Tuzak: ism-i mef’ûl de mîmle başlar (مُغْلَقَةٌ، مَفْتُوحَةٌ).", exHtml: "<span class=\"ar\">بَدَأَتِ المُبَارَاةُ عَلَى <u>مَلْعَبِ</u> الكُلِّيَّةِ.</span> ← اسْمُ مَكَانٍ", items: [
      W("تَحُفُّ الأَشْجَارُ [مَدْخَلَ] المَدِينَةِ.", "Ağaçlar şehrin girişini çevreliyor.", "مَدْخَلَ: giriş yeri."),
      W("[مَجْلِسُ] العُلَمَاءِ بَعْدَ صَلَاةِ الفَجْرِ.", "Âlimlerin oturma vakti sabah namazından sonradır.", "مَجْلِسُ: oturma vakti."),
      W("بَعْضُ [المَطَاعِمِ] مَفْتُوحَةٌ حَتَّى الصَّبَاحِ.", "Bazı lokantalar sabaha kadar açık.", "المَطَاعِمِ (مَطْعَمٌ'un çoğulu). مَفْتُوحَةٌ ism-i mef’ûl."),
      W("اقْتَرَبَ [مَذْهَبُ] القِطَارِ.", "Trenin gidiş vakti yaklaştı.", "مَذْهَبُ: gidiş vakti."),
      W("[مَدْخَلُ] المَحَطَّةِ وَاسِعٌ.", "İstasyonun girişi geniş.", "مَدْخَلُ: giriş yeri."),
      W("أَبْوَابُ [المَدْرَسَةِ] مُغْلَقَةٌ.", "Okulun kapıları kapalı.", "المَدْرَسَةِ: ders yeri. مُغْلَقَةٌ ism-i mef’ûl."),
      W("[مَوْلِدُ] النَّبِيِّ ﷺ فِي مَكَّةَ المُكَرَّمَةِ.", "Peygamberin (s.a.v.) doğum yeri Mekke-i Mükerreme’dir.", "مَوْلِدُ: doğum yeri. المُكَرَّمَةِ ism-i mef’ûl."),
      W("[مَطْلَعُ] الشَّمْسِ السَّاعَةَ السَّادِسَةَ.", "Güneşin doğuşu saat altıda.", "مَطْلَعُ: doğuş vakti.")
    ]},
    { type: "classify", num: "٤", opts: TUR, ar: "اذْكُرْ نَوْعَهَا", tr: "Şimdi bulduğun kelimenin türünü seç. İpucu: haberi bir vakitse zaman, bir yerse mekândır.", items: [
      { s: HL("تَحُفُّ الأَشْجَارُ مَدْخَلَ المَدِينَةِ.", "مَدْخَلَ"), a: "m", why: "Şehrin girişi: yer." },
      { s: HL("مَجْلِسُ العُلَمَاءِ بَعْدَ صَلَاةِ الفَجْرِ.", "مَجْلِسُ"), a: "z", why: "Haberi bir vakit (بَعْدَ صَلَاةِ الفَجْرِ): oturma vakti. Kalıp da ipucu: مَفْعِل zaman-mekân içindir; mim’li masdar olsaydı مَجْلَسٌ olurdu." },
      { s: HL("بَعْضُ المَطَاعِمِ مَفْتُوحَةٌ حَتَّى الصَّبَاحِ.", "المَطَاعِمِ"), a: "m", why: "Lokantalar: yemek yenen yerler." },
      { s: HL("اقْتَرَبَ مَذْهَبُ القِطَارِ.", "مَذْهَبُ"), a: "z", alt: ["d"], why: "Trenin gidiş vakti yaklaştı: zaman. \"Trenin gidişi yaklaştı\" diye mim’li masdar da anlaşılabilir." },
      { s: HL("مَدْخَلُ المَحَطَّةِ وَاسِعٌ.", "مَدْخَلُ"), a: "m", why: "Geniş olan bir yer: giriş." },
      { s: HL("أَبْوَابُ المَدْرَسَةِ مُغْلَقَةٌ.", "المَدْرَسَةِ"), a: "m", why: "Ders okunan yer (tâ’lı, semâî)." },
      { s: HL("مَوْلِدُ النَّبِيِّ ﷺ فِي مَكَّةَ المُكَرَّمَةِ.", "مَوْلِدُ"), a: "m", alt: ["d"], why: "Haberi bir yer (فِي مَكَّةَ): doğum yeri. \"Doğumu Mekke’de oldu\" diye mim’li masdar da anlaşılabilir." },
      { s: HL("مَطْلَعُ الشَّمْسِ السَّاعَةَ السَّادِسَةَ.", "مَطْلَعُ"), a: "z", why: "Haberi bir saat: doğuş vakti." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · MEF’AL
{
  id: "u2", no: 2, ar: "وَزْنُ مَفْعَلٍ", tr: "Mef’al Vezni", short: "مَفْعَل", col: "cerr", legend: ["mz", "cerr"],
  goals: ["Muzâride aynı ötreli ya da üstünlü olan fiilden مَفْعَل yapmak: يَكْتُبُ ← مَكْتَبٌ، يَشْرَبُ ← مَشْرَبٌ", "Muzâaf, ecvef vâvî, nâkıs ve lefîften de مَفْعَل geldiğini bilmek: مَفَرٌّ، مَقَامٌ، مَبْنًى", "Tâ’lı semâî şekli (مَفْعَلَة) tanımak, müsennâ ve cemi yapmak: مَدْرَسَتَانِ، مَدَارِسُ"],
  examples: [
    { s: "شَرِبَ:- / يَشْرَبُ:mz / مَشْرَبٌ:cerr", tr: "içmek → içme yeri / içiş (يَفْعَلُ)", pair: "كَتَبَ:- / يَكْتُبُ:mz / مَكْتَبٌ:cerr", pairTr: "yazmak → yazı yeri (يَفْعُلُ)" },
    { s: "بَنَى:- / يَبْنِي:mz / مَبْنًى:cerr", tr: "nâkıs → bina", pair: "قَامَ:- / يَقُومُ:mz / مَقَامٌ:cerr", pairTr: "ecvef vâvî → makam" },
    { s: "فَرَّ:- / يَفِرُّ:mz / مَفَرٌّ:cerr", tr: "muzâaf → kaçacak yer (muzârisi esreli olduğu halde مَفْعَل)", pair: "دَرَسَ:- / يَدْرُسُ:mz / مَدْرَسَةٌ:cerr", pairTr: "tâ’lı semâî → okul" }
  ],
  rules: [
    { tr: "<b>مَفْعَل</b> (<span class=\"ar\">مَـ ـْـ ـَـ ـ</span>): zaman, mekân ve mim’li masdar bu vezinde gelir; şu iki durumda <b>kıyâsîdir</b>:" },
    { tr: "a) Muzâride aynü’l-fiil <b>ötreli ya da üstünlü</b> ise (<span class=\"ar\">يَفْعُلُ – يَفْعَلُ</span>):", ex: ["شَرِبَ – يَشْرَبُ – مَشْرَبٌ", "كَتَبَ – يَكْتُبُ – مَكْتَبٌ", "خَرَجَ – يَخْرُجُ – مَخْرَجٌ"] },
    { tr: "b) Fiil <b>muzâaf</b>, <b>ecvef vâvî</b>, <b>nâkıs</b> ya da <b>lefîf</b> ise (muzârinin harekesine bakılmaz):", ex: ["بَنَى – يَبْنِي – مَبْنًى", "فَرَّ – يَفِرُّ – مَفَرٌّ", "قَامَ – يَقُومُ – مَقَامٌ"] },
    { tr: "Tâ-yı merbûta ile de gelir (<span class=\"ar\">مَفْعَلَةٌ</span>); bu şekil <b>semâîdir</b> (kurala bağlı değil, Araplardan duyulmuştur):", ex: ["مَكْتَبَةٌ", "مَدْرَسَةٌ", "مَحْكَمَةٌ", "مَسْأَلَةٌ", "مَنْفَعَةٌ", "مَرْحَمَةٌ"] },
    { tr: "Müsennâsı düzenli, çoğulu <b>مَفَاعِلُ</b> kalıbında kırık çoğuldur (gayr-ı munsarif):", ex: ["مَكْتَبٌ – مَكْتَبَانِ – مَكَاتِبُ", "مَدْرَسَةٌ – مَدْرَسَتَانِ – مَدَارِسُ"] }
  ],
  kaide: [
    "١ ـ مَفْعَلٌ: يَأْتِي اسْمَا الزَّمَانِ وَالمَكَانِ وَالمَصْدَرُ المِيمِيُّ عَلَى هَذَا الوَزْنِ فِي حَالَتَيْنِ، وَهَذِهِ قِيَاسِيَّةٌ:",
    "أ ـ إِذَا كَانَتْ حَرَكَةُ عَيْنِ الفِعْلِ فِي المُضَارِعِ ضَمَّةً أَوْ فَتْحَةً (يَفْعُلُ – يَفْعَلُ)، مِثْلُ: شَرِبَ – يَشْرَبُ – مَشْرَبٌ، كَتَبَ – يَكْتُبُ – مَكْتَبٌ، خَرَجَ – يَخْرُجُ – مَخْرَجٌ.",
    "ب ـ إِذَا كَانَ الفِعْلُ مُضَاعَفًا أَوْ أَجْوَفَ وَاوِيًّا أَوْ نَاقِصًا أَوْ لَفِيفًا: بَنَى – يَبْنِي – مَبْنًى، فَرَّ – يَفِرُّ – مَفَرٌّ، قَامَ – يَقُومُ – مَقَامٌ.",
    "وَتَأْتِي أَيْضًا بِالتَّاءِ المَرْبُوطَةِ، وَهَذِهِ سَمَاعِيَّةٌ (مَفْعَلَةٌ)، مِثْلُ: مَكْتَبَةٌ، مَدْرَسَةٌ، مَحْكَمَةٌ، مَسْأَلَةٌ، مَنْفَعَةٌ، مَرْحَمَةٌ.",
    "تَصْرِيفُهَا: مَكْتَبٌ – مَكْتَبَانِ – مَكَاتِبُ، مَدْرَسَةٌ – مَدْرَسَتَانِ – مَدَارِسُ."
  ],
  ex: [
    { type: "pick", fill: true, num: "١", ar: "هَاتِ المَصْدَرَ المِيمِيَّ القِيَاسِيَّ مِنَ الأَفْعَالِ التَّالِيَةِ", tr: "Kıyâsî mim’li masdarı seç. Muzârinin aynü’l-fiiline bak: ötre ya da üstün → مَفْعَل.", items: [
      { q: "قَدِمَ – يَقْدَمُ ← ___", o: ["مَقْدَمٌ", "مَقْدِمٌ", "مَقْدُومٌ"], a: 0, tr: "gelmek → geliş", why: "يَفْعَلُ → مَفْعَل." },
      { q: "أَخَذَ – يَأْخُذُ ← ___", o: ["مَأْخِذٌ", "مَأْخَذٌ", "مَأْخُوذٌ"], a: 1, tr: "almak → alış, kaynak", why: "يَفْعُلُ → مَفْعَل. مَأْخُوذٌ ism-i mef’ûldür." },
      { q: "طَلَعَ – يَطْلُعُ ← ___", o: ["مَطْلَعٌ", "مَطْلُوعٌ", "مَطْلِعٌ"], a: 0, tr: "doğmak → doğuş", why: "يَفْعُلُ → مَفْعَل. (مَطْلِعٌ da işitilmiştir; Kadr 5’te bir kıraat.)" },
      { q: "غَرَبَ – يَغْرُبُ ← ___", o: ["مَغْرُوبٌ", "مَغْرِبٌ", "مَغْرَبٌ"], a: 2, tr: "batmak → batış", why: "Kıyâsî masdar مَغْرَبٌ. Yer ve vakit için kullanılan المَغْرِبُ ise semâîdir." },
      { q: "نَظَرَ – يَنْظُرُ ← ___", o: ["مَنْظَرٌ", "مَنْظِرٌ", "مَنْظُورٌ"], a: 0, tr: "bakmak → bakış, manzara", why: "يَفْعُلُ → مَفْعَل." },
      { q: "سَكَنَ – يَسْكُنُ ← ___", o: ["مُسْكَنٌ", "مَسْكَنٌ", "مَسْكُونٌ"], a: 1, tr: "oturmak → oturuş, mesken", why: "يَفْعُلُ → مَفْعَل. (Yer anlamında مَسْكِنٌ da işitilmiştir.)" },
      { q: "طَبَخَ – يَطْبُخُ ← ___", o: ["مَطْبُوخٌ", "مَطْبِخٌ", "مَطْبَخٌ"], a: 2, tr: "pişirmek → pişirme, mutfak", why: "يَفْعُلُ → مَفْعَل." },
      { q: "طَعِمَ – يَطْعَمُ ← ___", o: ["مَطْعَمٌ", "مَطْعُومٌ", "مَطْعِمٌ"], a: 0, tr: "yemek → yeme, lokanta", why: "يَفْعَلُ → مَفْعَل." },
      { q: "دَخَلَ – يَدْخُلُ ← ___", o: ["مَدْخِلٌ", "مَدْخَلٌ", "مُدْخَلٌ"], a: 1, tr: "girmek → giriş", why: "يَفْعُلُ → مَفْعَل. مُدْخَلٌ أَدْخَلَ'nin ism-i mef’ûlüdür." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "ثَنِّ وَاجْمَعْ", tr: "Müsennâ ya da cemi yap. Çoğul مَفَاعِلُ kalıbında.", items: [
      { q: "مَكْتَبٌ ← cemi: ___", o: ["مَكْتَبَاتٌ", "مَكَاتِبُ", "مَكْتُوبُونَ"], a: 1, why: "مَفَاعِلُ: مَكَاتِبُ." },
      { q: "مَدْرَسَةٌ ← müsennâ: ___", o: ["مَدْرَسَتَانِ", "مَدْرَسَانِ", "مَدَارِسُ"], a: 0, why: "Tâ korunur: مَدْرَسَتَانِ." },
      { q: "مَدْرَسَةٌ ← cemi: ___", o: ["مَدْرَسُونَ", "مَدَارِسُ", "مَدْرَسَتَانِ"], a: 1, why: "مَفَاعِلُ: مَدَارِسُ." },
      { q: "مَطْعَمٌ ← cemi: ___", o: ["مَطَاعِمُ", "مَطْعَمَانِ", "مَطْعُومَاتٌ"], a: 0, why: "مَطَاعِمُ (kitaptaki 4. alıştırmada geçer)." },
      { q: "مَلْعَبٌ ← müsennâ: ___", o: ["مَلَاعِبُ", "مَلْعَبَانِ", "مَلْعَبَتَانِ"], a: 1, why: "مَلْعَبَانِ." },
      { q: "مَنْزِلٌ ← cemi: ___", o: ["مَنْزِلَانِ", "مَنْزُولُونَ", "مَنَازِلُ"], a: 2, why: "مَنَازِلُ (kitaptaki 5. alıştırmada geçer)." },
      { q: "مَسْجِدٌ ← cemi: ___", o: ["مَسَاجِدُ", "مَسْجِدَاتٌ", "سُجُودٌ"], a: 0, why: "مَسَاجِدُ." },
      { q: "مَصْنَعٌ ← cemi: ___", o: ["مَصْنَعَانِ", "مَصَانِعُ", "صِنَاعَاتٌ"], a: 1, why: "مَصَانِعُ." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · MEF’İL
{
  id: "u3", no: 3, ar: "وَزْنُ مَفْعِلٍ وَالمَزِيدُ", tr: "Mef’il Vezni ve Mezîd Fiil", short: "مَفْعِل", col: "nasb", legend: ["mz", "nasb"],
  goals: ["Muzâride aynı esreli fiilden, misâlden ve ecvef yâîden مَفْعِل yapmak: مَجْلِسٌ، مَوْقِفٌ، مَصِيرٌ", "Semâî şekilleri (مَسْأَلَةٌ، مَعْذِرَةٌ) tanımak", "Mezîd fiilden ism-i mef’ûl kalıbıyla yapmak: اِنْتَصَفَ ← مُنْتَصَفٌ"],
  examples: [
    { s: "جَلَسَ:- / يَجْلِسُ:mz / مَجْلِسٌ:nasb", tr: "oturmak → oturma yeri (يَفْعِلُ)", pair: "رَجَعَ:- / يَرْجِعُ:mz / مَرْجِعٌ:nasb", pairTr: "dönmek → dönüş yeri (يَفْعِلُ)" },
    { s: "وَقَفَ:- / يَقِفُ:mz / مَوْقِفٌ:nasb", tr: "misâl → durak", pair: "صَارَ:- / يَصِيرُ:mz / مَصِيرٌ:nasb", pairTr: "ecvef yâî → varış" },
    { s: "اِنْتَصَفَ:- / يَنْتَصِفُ:mz / مُنْتَصَفٌ:nasb", tr: "mezîd → orta (ism-i mef’ûl kalıbı)", pair: "غَفَرَ:- / يَغْفِرُ:mz / مَغْفِرَةٌ:nasb", pairTr: "tâ’lı semâî → mağfiret" }
  ],
  rules: [
    { tr: "<b>مَفْعِل</b> (<span class=\"ar\">مَـ ـْـ ـِـ ـ</span>): <b>zaman ve mekân</b> isimleri şu iki durumda bu vezinde gelir (kıyâsî):" },
    { tr: "a) Muzâride aynü’l-fiil <b>esreli</b> ise (<span class=\"ar\">يَفْعِلُ</span>):", ex: ["رَجَعَ – يَرْجِعُ – مَرْجِعٌ", "جَلَسَ – يَجْلِسُ – مَجْلِسٌ", "عَرَضَ – يَعْرِضُ – مَعْرِضٌ"] },
    { tr: "b) Fiil <b>misâl</b> ya da <b>ecvef yâî</b> ise:", ex: ["وَقَفَ – يَقِفُ – مَوْقِفٌ", "وَلَدَ – يَلِدُ – مَوْلِدٌ", "وَقَعَ – يَقَعُ – مَوْقِعٌ", "صَارَ – يَصِيرُ – مَصِيرٌ"] },
    { tr: "Tâ’lı şekli (<span class=\"ar\">مَفْعِلَةٌ</span>) <b>semâîdir</b>:", ex: ["نَزَلَ – يَنْزِلُ – مَنْزِلَةٌ", "غَفَرَ – يَغْفِرُ – مَغْفِرَةٌ", "عَرَفَ – يَعْرِفُ – مَعْرِفَةٌ"] },
    { tr: "Not: يَفْعِلُ kalıbındaki sahih fiilin kıyâsî mim’li masdarı مَفْعَل olur (<span class=\"ar\">مَجْلَسٌ</span> = oturuş). <span class=\"ar\">مَرْجِعٌ، مَصِيرٌ، مَحِيصٌ</span> gibi kelimeler masdar olarak da kullanılır; bunlar semâîdir. Misâlin mim’li masdarı da مَفْعِل gelir: <span class=\"ar\">مَوْعِدٌ</span>." },
    { tr: "<b>Mezîd</b> fiilden (üç harften fazla) zaman, mekân ve mim’li masdar <b>ism-i mef’ûl kalıbında</b> gelir: muzâri harfi yerine ötreli <span class=\"ar\">مُـ</span>, sondan önceki harf üstünlü.", ex: ["اِنْتَصَفَ – يَنْتَصِفُ – مُنْتَصَفٌ", "اِسْتَشْفَى – مُسْتَشْفًى", "صَلَّى – مُصَلًّى", "اِجْتَمَعَ – مُجْتَمَعٌ"] }
  ],
  kaide: [
    "٢ ـ مَفْعِلٌ: يَأْتِي اسْمَا الزَّمَانِ وَالمَكَانِ عَلَى هَذَا الوَزْنِ فِي حَالَتَيْنِ، وَهَذِهِ قِيَاسِيَّةٌ:",
    "أ ـ إِذَا كَانَتْ حَرَكَةُ عَيْنِ الفِعْلِ فِي المُضَارِعِ كَسْرَةً (يَفْعِلُ)، مِثْلُ: رَجَعَ – يَرْجِعُ – مَرْجِعٌ، جَلَسَ – يَجْلِسُ – مَجْلِسٌ، عَرَضَ – يَعْرِضُ – مَعْرِضٌ.",
    "ب ـ إِذَا كَانَ الفِعْلُ مِثَالًا أَوْ أَجْوَفَ يَائِيًّا، مِثْلُ: وَقَفَ – يَقِفُ – مَوْقِفٌ، وَلَدَ – يَلِدُ – مَوْلِدٌ، وَقَعَ – يَقَعُ – مَوْقِعٌ، صَارَ – يَصِيرُ – مَصِيرٌ.",
    "وَتَأْتِي أَيْضًا بِالتَّاءِ المَرْبُوطَةِ، وَهَذِهِ سَمَاعِيَّةٌ (مَفْعِلَةٌ)، مِثْلُ: نَزَلَ – يَنْزِلُ – مَنْزِلَةٌ، غَفَرَ – يَغْفِرُ – مَغْفِرَةٌ، عَرَفَ – يَعْرِفُ – مَعْرِفَةٌ.",
    "اسْمَا الزَّمَانِ وَالمَكَانِ وَالمَصْدَرُ المِيمِيُّ مِنَ الفِعْلِ فَوْقَ الثُّلَاثِيِّ يَأْتِي عَلَى وَزْنِ اسْمِ المَفْعُولِ: اِنْتَصَفَ – يَنْتَصِفُ – مُنْتَصَفٌ."
  ],
  ex: [
    { type: "classify", extra: true, opts: VZ, ar: "عَلَى أَيِّ وَزْنٍ يَأْتِي؟", tr: "Bu fiilden zaman-mekân ismi hangi vezinde gelir? Önce fiilin türüne, sonra muzârinin aynına bak.", items: vzItems(["جَلَسَ", "كَتَبَ", "وَقَفَ", "قَامَ", "بَنَى", "صَارَ", "شَرِبَ", "عَرَضَ", "فَرَّ", "وَلَدَ", "اِسْتَشْفَى", "نَزَلَ", "أَوَى", "صَلَّى"]) },
    { type: "pick", fill: true, num: "٢", ar: "هَاتِ المَصْدَرَ المِيمِيَّ السَّمَاعِيَّ مِنَ الأَفْعَالِ التَّالِيَةِ", tr: "Semâî (tâ’lı) mim’li masdarı seç. Muzârinin aynı üstünlü/ötreli ise مَفْعَلَة, esreli ise مَفْعِلَة.", items: [
      { q: "سَأَلَ – يَسْأَلُ ← ___", o: ["مَسْأَلَةٌ", "مَسْئِلَةٌ", "مَسْؤُولَةٌ"], a: 0, tr: "sormak → soru, mesele", why: "يَفْعَلُ → مَفْعَلَةٌ." },
      { q: "رَحِمَ – يَرْحَمُ ← ___", o: ["مَرْحُومَةٌ", "مَرْحَمَةٌ", "مَرْحِمَةٌ"], a: 1, tr: "merhamet etmek → merhamet", why: "يَفْعَلُ → مَفْعَلَةٌ." },
      { q: "نَفَعَ – يَنْفَعُ ← ___", o: ["مَنْفِعَةٌ", "مَنْفُوعَةٌ", "مَنْفَعَةٌ"], a: 2, tr: "fayda vermek → menfaat", why: "يَفْعَلُ → مَفْعَلَةٌ." },
      { q: "شَغَلَ – يَشْغَلُ ← ___", o: ["مَشْغَلَةٌ", "مَشْغُولَةٌ", "مَشْغِلَةٌ"], a: 0, tr: "meşgul etmek → meşgale", why: "يَفْعَلُ → مَفْعَلَةٌ. مَشْغُولَةٌ ism-i mef’ûl." },
      { q: "فَسَدَ – يَفْسُدُ ← ___", o: ["مُفْسِدَةٌ", "مَفْسَدَةٌ", "مَفْسِدَةٌ"], a: 1, tr: "bozulmak → bozulma, fesat", why: "يَفْعُلُ → مَفْعَلَةٌ. مُفْسِدَةٌ ism-i fâil." },
      { q: "عَذَرَ – يَعْذِرُ ← ___", o: ["مَعْذَرَةٌ", "مَعْذُورَةٌ", "مَعْذِرَةٌ"], a: 2, tr: "mazur görmek → özür", why: "يَفْعِلُ → مَفْعِلَةٌ." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "هَاتِ اسْمَ المَكَانِ مِنَ الفِعْلِ المَزِيدِ", tr: "Mezîd fiil: zaman-mekân ismi ism-i mef’ûl kalıbında (مُـ + sondan önceki harf üstünlü). Esreli olan ism-i fâildir.", items: [
      { q: "اِنْتَصَفَ – يَنْتَصِفُ ← ___", o: ["مُنْتَصِفٌ", "مُنْتَصَفٌ", "مَنْتَصَفٌ"], a: 1, tr: "orta", why: "مُنْتَصَفٌ; مُنْتَصِفٌ ism-i fâil." },
      { q: "اِسْتَشْفَى – يَسْتَشْفِي ← ___", o: ["مُسْتَشْفًى", "مُسْتَشْفٍ", "مَسْتَشْفًى"], a: 0, tr: "hastane", why: "مُسْتَشْفًى: şifa aranan yer." },
      { q: "صَلَّى – يُصَلِّي ← ___", o: ["مُصَلٍّ", "مَصْلًى", "مُصَلًّى"], a: 2, tr: "namazgâh", why: "مُصَلًّى; مُصَلٍّ namaz kılan (ism-i fâil)." },
      { q: "اِجْتَمَعَ – يَجْتَمِعُ ← ___", o: ["مُجْتَمَعٌ", "مُجْتَمِعٌ", "مَجْتَمَعٌ"], a: 0, tr: "toplanma yeri, toplum", why: "مُجْتَمَعٌ." },
      { q: "اِلْتَقَى – يَلْتَقِي ← ___", o: ["مُلْتَقٍ", "مُلْتَقًى", "مَلْقًى"], a: 1, tr: "buluşma yeri", why: "مُلْتَقًى." },
      { q: "أَقَامَ – يُقِيمُ ← ___", o: ["مُقِيمٌ", "مَقَامٌ", "مُقَامٌ"], a: 2, tr: "ikamet yeri / vakti", why: "Mezîd أَقَامَ'dan مُقَامٌ; مَقَامٌ sülâsî قَامَ'dandır." },
      { q: "اِنْصَرَفَ – يَنْصَرِفُ ← ___", o: ["مُنْصَرَفٌ", "مُنْصَرِفٌ", "مَصْرَفٌ"], a: 0, tr: "ayrılış yeri / vakti", why: "مُنْصَرَفٌ." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · ÂYET VE CÜMLE
{
  id: "u4", no: 4, ar: "فِي الآيَاتِ وَالجُمَلِ", tr: "Âyetlerde ve Cümlelerde", short: "Âyet · cümle", col: "ref", legend: ["nasb", "cerr", "mi"],
  goals: ["Âyetlerde zaman, mekân ve mim’li masdarı bulmak", "Kelimenin veznini (sîgasını) söylemek: مَفْعَلٌ، مَفْعِلٌ، مَفْعَلَةٌ", "Boşluğa anlama uygun zaman-mekân ismini koymak"],
  examples: [
    { s: "سَلَامٌ هِيَ حَتَّى:- / مَطْلَعِ:nasb / الفَجْرِ:-", tr: "O gece, fecrin doğuşuna kadar bir selamettir. (Kadr 5)" },
    { s: "إِلَى اللهِ:- / مَرْجِعُكُمْ:mi / جَمِيعًا:-", tr: "Hepinizin dönüşü Allah’adır. (Mâide 48)" },
    { s: "إِنَّ المُتَّقِينَ فِي:- / مَقَامٍ:cerr / أَمِينٍ:-", tr: "Takva sahipleri güvenli bir makamdadır. (Duhân 51)" }
  ],
  rules: [
    { tr: "Önce kelimenin <b>kökünü</b> bul, sonra fiilin muzârisine bak: <span class=\"ar\">مَطْلَع ← طَلَعَ يَطْلُعُ</span> → مَفْعَل." },
    { tr: "İllet harfli kelimelerde aslını düşün: <span class=\"ar\">مَأْوًى ← مَأْوَيٌ</span> (lefîf), <span class=\"ar\">مَقَامٌ ← مَقْوَمٌ</span> (ecvef vâvî), <span class=\"ar\">مَحِيصٌ ← مَحْيِصٌ</span> (ecvef yâî), <span class=\"ar\">مَوَدَّةٌ ← مَوْدَدَةٌ</span> (muzâaf)." },
    { tr: "Türünü cümle belirler. Âyetlerde bazı kelimeler iki türlü anlaşılabilir: <span class=\"ar\">مَخْرَجًا</span> çıkış (masdar) ya da çıkış yolu (mekân); <span class=\"ar\">المَصِيرُ</span> dönüş (masdar) ya da varılacak yer (mekân)." },
    { tr: "Boşluk doldururken soruya bak: vakit mi (<span class=\"ar\">عِنْدَ المَغْرِبِ</span>), yer mi (<span class=\"ar\">مَوْقِفُ السَّيَّارَةِ</span>), iş mi (<span class=\"ar\">مَرْجِعُنَا</span>)?" }
  ],
  kaide: ["ضَعْ خَطًّا تَحْتَ اسْمِ الزَّمَانِ وَاسْمِ المَكَانِ وَالمَصْدَرِ المِيمِيِّ ثُمَّ اذْكُرْ صِيغَتَهَا.", "امْلَأِ الفَرَاغَ مِمَّا بَيْنَ القَوْسَيْنِ: (مَدْخَل – مَوْعِدَه – مَرْجِعنا – مَوْقِف – مَطْلَع – مَنَازِل – مَهْبِط – المَغْرِب)."],
  ex: [
    { type: "find", target: "y", num: "٣", ar: "ضَعْ خَطًّا تَحْتَ اسْمِ الزَّمَانِ وَاسْمِ المَكَانِ وَالمَصْدَرِ المِيمِيِّ", tr: "Âyette zaman, mekân ya da mim’li masdar olan kelimeye dokun. Dördüncü âyette iki tane var.", items: [
      W("سَلَامٌ هِيَ حَتَّى [مَطْلَعِ] الفَجْرِ", "O gece, fecrin doğuşuna kadar bir selamettir. (Kadr 5)", "مَطْلَعِ: doğuş vakti."),
      W("وَمَنْ يَتَّقِ اللهَ يَجْعَلْ لَهُ [مَخْرَجًا]", "Kim Allah’tan korkarsa Allah ona bir çıkış yolu açar. (Talâk 2)", "مَخْرَجًا."),
      W("إِلَى اللهِ [مَرْجِعُكُمْ] جَمِيعًا", "Hepinizin dönüşü Allah’adır. (Mâide 48)", "مَرْجِعُكُمْ."),
      W("أُولَئِكَ [مَأْوَاهُمْ] جَهَنَّمُ وَلَا يَجِدُونَ عَنْهَا [مَحِيصًا]", "Onların barınağı cehennemdir; ondan kaçacak bir yer bulamazlar. (Nisâ 121)", "مَأْوَاهُمْ ve مَحِيصًا."),
      W("غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ [المَصِيرُ]", "Rabbimiz, bağışlamanı dileriz; dönüş sanadır. (Bakara 285)", "المَصِيرُ. غُفْرَانَ ise mîmsiz asıl masdar."),
      W("وَجَعَلَ بَيْنَكُمْ [مَوَدَّةً] وَرَحْمَةً", "Aranıza sevgi ve merhamet koydu. (Rûm 21)", "مَوَدَّةً; رَحْمَةً mîmsiz asıl masdar."),
      W("إِنَّ المُتَّقِينَ فِي [مَقَامٍ] أَمِينٍ", "Takva sahipleri güvenli bir makamdadır. (Duhân 51)", "مَقَامٍ. المُتَّقِينَ ism-i fâil."),
      W("الدُّنْيَا [مَزْرَعَةُ] الآخِرَةِ", "Dünya, âhiretin tarlasıdır.", "مَزْرَعَةُ.")
    ]},
    { type: "classify", num: "٣", opts: TUR, ar: "مَا نَوْعُهَا؟", tr: "Koyu kelime zaman mı, mekân mı, mim’li masdar mı? İki anlamı da olan kelimelerde iki cevap da kabul.", items: [
      { s: HL("حَتَّى مَطْلَعِ الفَجْرِ", "مَطْلَعِ") + SUR("Kadr 5"), a: "z", why: "Fecrin doğduğu vakit." },
      { s: HL("يَجْعَلْ لَهُ مَخْرَجًا", "مَخْرَجًا") + SUR("Talâk 2"), a: "d", alt: ["m"], why: "Çıkış (خُرُوجٌ): mim’li masdar. \"Çıkış yolu\" diye mekân da anlaşılır." },
      { s: HL("إِلَى اللهِ مَرْجِعُكُمْ جَمِيعًا", "مَرْجِعُكُمْ") + SUR("Mâide 48"), a: "d", alt: ["m"], why: "Dönüşünüz (رُجُوعُكُمْ): mim’li masdar. مَفْعِل kalıbında olduğu halde masdar: semâî." },
      { s: HL("أُولَئِكَ مَأْوَاهُمْ جَهَنَّمُ", "مَأْوَاهُمْ") + SUR("Nisâ 121"), a: "m", why: "Barınakları: yer." },
      { s: HL("وَلَا يَجِدُونَ عَنْهَا مَحِيصًا", "مَحِيصًا"), a: "m", alt: ["d"], why: "Kaçacak yer: mekân. \"Kaçış\" diye masdar da anlaşılır." },
      { s: HL("وَإِلَيْكَ المَصِيرُ", "المَصِيرُ") + SUR("Bakara 285"), a: "d", alt: ["m"], why: "Dönüş: mim’li masdar; varılacak yer diye mekân da anlaşılır." },
      { s: HL("وَجَعَلَ بَيْنَكُمْ مَوَدَّةً", "مَوَدَّةً") + SUR("Rûm 21"), a: "d", why: "Sevgi: işin kendisi." },
      { s: HL("إِنَّ المُتَّقِينَ فِي مَقَامٍ أَمِينٍ", "مَقَامٍ") + SUR("Duhân 51"), a: "m", why: "Durulan yer: makam." },
      { s: HL("الدُّنْيَا مَزْرَعَةُ الآخِرَةِ", "مَزْرَعَةُ"), a: "m", why: "Ekin yeri: tarla." }
    ]},
    { type: "classify", num: "٣", opts: VZ3, ar: "اذْكُرْ صِيغَتَهَا", tr: "Kelimenin sîgası (vezni) hangisi? Kökü ve aslını düşün.", items: [
      { s: HL("مَطْلَعِ الفَجْرِ", "مَطْلَعِ"), a: "a", why: "طَلَعَ – يَطْلُعُ: مَفْعَلٌ." },
      { s: HL("مَخْرَجًا", "مَخْرَجًا"), a: "a", why: "خَرَجَ – يَخْرُجُ: مَفْعَلٌ." },
      { s: HL("مَرْجِعُكُمْ", "مَرْجِعُكُمْ"), a: "i", why: "رَجَعَ – يَرْجِعُ: مَفْعِلٌ." },
      { s: HL("مَأْوَاهُمْ", "مَأْوَاهُمْ"), a: "a", why: "أَوَى – يَأْوِي (lefîf): مَفْعَلٌ, aslı مَأْوَيٌ." },
      { s: HL("مَحِيصًا", "مَحِيصًا"), a: "i", why: "حَاصَ – يَحِيصُ (ecvef yâî): مَفْعِلٌ, aslı مَحْيِصٌ." },
      { s: HL("المَصِيرُ", "المَصِيرُ"), a: "i", why: "صَارَ – يَصِيرُ (ecvef yâî): مَفْعِلٌ." },
      { s: HL("مَوَدَّةً", "مَوَدَّةً"), a: "at", why: "وَدَّ – يَوَدُّ (muzâaf): مَفْعَلَةٌ, aslı مَوْدَدَةٌ." },
      { s: HL("مَقَامٍ", "مَقَامٍ"), a: "a", why: "قَامَ – يَقُومُ (ecvef vâvî): مَفْعَلٌ, aslı مَقْوَمٌ." },
      { s: HL("مَزْرَعَةُ", "مَزْرَعَةُ"), a: "at", why: "زَرَعَ – يَزْرَعُ: مَفْعَلَةٌ (semâî)." }
    ]},
    { type: "bank", num: "٥", ar: "امْلَأِ الفَرَاغَ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Önce aşağıdan bir kelime seç, sonra uygun boşluğa dokun. Her kelime bir kez kullanılır.",
      bank: ["مَدْخَلُ", "مَوْعِدَهُ", "مَرْجِعُنَا", "مَوْقِفُ", "مَطْلَعِ", "مَنَازِلُ", "مَهْبِطُ", "المَغْرِبِ"], items: [
      { pre: "مَكَّةُ", h: "الوَحْيِ.", a: [6], tr: "Mekke vahyin indiği yerdir." },
      { pre: "بَلَغْنَا نِهَايَةَ الرِّحْلَةِ عِنْدَ", h: ".", a: [7], tr: "Yolculuğun sonuna akşam vakti vardık." },
      { h: "السَّيَّارَةِ بَيْنَ العِمَارَتَيْنِ.", a: [3, 0], tr: "Arabanın park yeri iki binanın arasında." },
      { h: "الطُّلَّابِ قَرِيبَةٌ مِنَ الكُلِّيَّةِ.", a: [5], tr: "Öğrencilerin evleri fakülteye yakın." },
      { h: "المَدْرَسَةِ ضَيِّقٌ.", a: [0, 3], tr: "Okulun girişi dar." },
      { pre: "لَا يُخْلِفُ الصَّادِقُ", h: ".", a: [1], tr: "Doğru insan sözünden caymaz." },
      { pre: "إِلَى اللهِ", h: ".", a: [2], tr: "Dönüşümüz Allah’adır." },
      { pre: "صَلَاةُ الفَجْرِ قَبْلَ", h: "الشَّمْسِ.", a: [4], tr: "Sabah namazı güneşin doğuşundan öncedir." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: مَوْعِدٌ مَعَ الأُسْتَاذِ", tr: "Okuma: Hocamla Randevu", short: "Okuma", col: "muz", legend: ["nasb", "cerr", "mi"],
  goals: ["Bir metinde zaman, mekân ve mim’li masdarı bulmak", "Aynı kelimenin (مَوْعِدٌ) bir yerde masdar, bir yerde zaman olabileceğini görmek", "Mîmle başlayan ism-i mef’ûlü (مَغْبُونٌ، المُحَدَّدِ) bu üçünden ayırmak"],
  examples: [
    { s: "ذَهَبْتُ إِلَى:- / مَنْزِلِهِ:cerr / فِي:- / المَوْعِدِ:nasb / المُحَدَّدِ.:-", tr: "Belirlenen vakitte onun evine gittim." },
    { s: "إِنَّ قَتْلَهُ:- / مَفْسَدَةٌ:mi / لِلْمَرْءِ،:- / وَمَهْلَكَةٌ:mi / لِلْمَالِ.:-", tr: "Onu öldürmek kişiyi bozar, malı helâk eder." }
  ],
  rules: [
    { tr: "Metinde ism-i zaman: <span class=\"ar\">المَوْعِدِ المُحَدَّدِ</span>. İsm-i mekân: <span class=\"ar\">مَنْزِلِهِ</span>." },
    { tr: "Mim’li masdar: <span class=\"ar\">مَوْعِدٍ، مَرْآهُ، مَفْسَدَةٌ، مَهْلَكَةٌ، مَهَابَةِ، مَحَبَّةَ، مَضَرَّةٌ</span>." },
    { tr: "İsm-i mef’ûl: <span class=\"ar\">المُحَدَّدِ، مَغْبُونٌ</span>. Sıfat-ı müşebbehe: <span class=\"ar\">كَثِيرٌ</span>." },
    { tr: "<span class=\"ar\">مَرْآهُ = مَرْأَى + هُ</span>: رَأَى nâkıs olduğu için مَفْعَل (onu görmek)." }
  ],
  kaide: ["اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ: اسْمَ الزَّمَانِ، اسْمَ المَكَانِ، المَصْدَرَ المِيمِيَّ، اسْمَ المَفْعُولِ، الصِّفَةَ المُشَبَّهَةَ."],
  ex: [
    { type: "reading", num: "٦", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ", tr: "Metni oku; sonra koyu kelimenin ne olduğunu seç.", title: "مَوْعِدٌ مَعَ الأُسْتَاذِ",
      text: "كُنْتُ عَلَى مَوْعِدٍ مَعَ أُسْتَاذِي. اشْتَاقَتْ نَفْسِي إِلَى مَرْآهُ مُنْذُ زَمَنٍ. ذَهَبْتُ إِلَى مَنْزِلِهِ فِي المَوْعِدِ المُحَدَّدِ. بَدَأَ الأُسْتَاذُ كَعَادَتِهِ يَنْصَحُنِي فَقَالَ لِي: عَلَيْكَ بِوَقْتِ الفَرَاغِ، فَإِنَّ قَتْلَهُ مَفْسَدَةٌ لِلْمَرْءِ، وَمَهْلَكَةٌ لِلْمَالِ. يَقُولُ الرَّسُولُ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: «نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالفَرَاغُ». وَإِيَّاكَ وَالمِزَاحَ، فَإِنَّهُ يَذْهَبُ بِمَهَابَةِ المَرْءِ. وَاعْلَمْ أَنَّ مَحَبَّةَ المَالِ بِشِدَّةٍ مَضَرَّةٌ لِلْإِنْسَانِ. يَجِبُ أَنْ تَكُونَ مَحَبَّةُ اللهِ وَرَسُولِهِ أَكْبَرَ مِنْهَا.",
      textTr: "Hocamla Randevu. Hocamla bir randevum vardı. Uzun zamandır onu görmeyi özlemiştim. Belirlenen vakitte evine gittim. Hocam âdeti olduğu üzere bana öğüt vermeye başladı ve dedi ki: Boş vaktine sahip çık; çünkü onu öldürmek kişiyi bozar, malı da helâk eder. Resûlullah (s.a.v.) buyuruyor: “İki nimet vardır ki insanların çoğu onlarda aldanmıştır: sağlık ve boş vakit.” Şakadan (aşırı mizahtan) sakın; çünkü o, kişinin heybetini giderir. Bil ki malı aşırı sevmek insana zarardır. Allah’ın ve Resûlünün sevgisi ondan daha büyük olmalıdır.",
      qa: [
        { q: "مَعَ مَنْ كَانَ الكَاتِبُ عَلَى مَوْعِدٍ؟", a: "كَانَ عَلَى مَوْعِدٍ مَعَ أُسْتَاذِهِ.", tr: "Yazar kiminle randevuluydu? Hocasıyla." },
        { q: "أَيْنَ ذَهَبَ؟ وَمَتَى؟", a: "ذَهَبَ إِلَى مَنْزِلِ أُسْتَاذِهِ فِي المَوْعِدِ المُحَدَّدِ.", tr: "Nereye ve ne zaman gitti? Belirlenen vakitte hocasının evine." },
        { q: "مَا النِّعْمَتَانِ اللَّتَانِ يُغْبَنُ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ؟", a: "الصِّحَّةُ وَالفَرَاغُ.", tr: "İnsanların çoğunun aldandığı iki nimet nedir? Sağlık ve boş vakit." },
        { q: "لِمَاذَا نَهَاهُ عَنِ المِزَاحِ؟", a: "لِأَنَّهُ يَذْهَبُ بِمَهَابَةِ المَرْءِ.", tr: "Onu şakadan neden sakındırdı? Kişinin heybetini giderdiği için." }
      ],
      cls: { opts: [["z", "İsm-i zaman", "اسْمُ زَمَانٍ", "nasb"], ["m", "İsm-i mekân", "اسْمُ مَكَانٍ", "cerr"], ["d", "Mim’li masdar", "مَصْدَرٌ مِيمِيٌّ", "mi"], ["f", "İsm-i mef’ûl", "اسْمُ مَفْعُولٍ", "mz"], ["s", "Sıfat-ı müşebbehe", "صِفَةٌ مُشَبَّهَةٌ", "mun"], ["x", "Hiçbiri", "لَيْسَ مِنْهَا", "x"]], ar: "اسْتَخْرِجْ مِنَ النَّصِّ", tr: "Koyu kelime ne?", items: [
        { s: HL("كُنْتُ عَلَى مَوْعِدٍ مَعَ أُسْتَاذِي", "مَوْعِدٍ"), a: "d", alt: ["z"], why: "Randevu (söz verme): mim’li masdar; misâlden olduğu için مَفْعِل. Randevu vakti diye zaman da anlaşılabilir." },
        { s: HL("اشْتَاقَتْ نَفْسِي إِلَى مَرْآهُ", "مَرْآهُ"), a: "d", why: "مَرْأَى + هُ: onu görmek. رَأَى nâkıs: مَفْعَل." },
        { s: HL("ذَهَبْتُ إِلَى مَنْزِلِهِ", "مَنْزِلِهِ"), a: "m", why: "Ev: yer. نَزَلَ – يَنْزِلُ: مَفْعِل." },
        { s: HL("فِي المَوْعِدِ المُحَدَّدِ", "المَوْعِدِ"), a: "z", why: "Belirlenen vakit: zaman." },
        { s: HL("فِي المَوْعِدِ المُحَدَّدِ", "المُحَدَّدِ"), a: "f", why: "حَدَّدَ → مُحَدَّدٌ: belirlenmiş." },
        { s: HL("فَإِنَّ قَتْلَهُ مَفْسَدَةٌ لِلْمَرْءِ", "مَفْسَدَةٌ"), a: "d", why: "Bozulma: mim’li masdar (semâî)." },
        { s: HL("فَإِنَّ قَتْلَهُ مَفْسَدَةٌ لِلْمَرْءِ", "المَرْءِ"), a: "x", why: "Mîmi aslî harf (kök م ر ء): türemiş isim değil." },
        { s: HL("وَمَهْلَكَةٌ لِلْمَالِ", "مَهْلَكَةٌ"), a: "d", why: "هَلَكَ → مَهْلَكَةٌ: helâk (semâî)." },
        { s: HL("نِعْمَتَانِ مَغْبُونٌ فِيهِمَا", "مَغْبُونٌ"), a: "f", why: "غَبَنَ → مَغْبُونٌ: aldatılmış." },
        { s: HL("مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ", "كَثِيرٌ"), a: "s", why: "كَثُرَ → كَثِيرٌ: فَعِيلٌ." },
        { s: HL("الصِّحَّةُ وَالفَرَاغُ", "الصِّحَّةُ"), a: "x", why: "Mîmsiz asıl masdar." },
        { s: HL("فَإِنَّهُ يَذْهَبُ بِمَهَابَةِ المَرْءِ", "بِمَهَابَةِ"), a: "d", why: "هَابَ → مَهَابَةٌ: heybet (mim’li masdar, tâ’lı)." },
        { s: HL("وَاعْلَمْ أَنَّ مَحَبَّةَ المَالِ", "مَحَبَّةَ"), a: "d", why: "حَبَّ → مَحَبَّةٌ: sevgi (muzâaf, tâ’lı)." },
        { s: HL("بِشِدَّةٍ مَضَرَّةٌ لِلْإِنْسَانِ", "مَضَرَّةٌ"), a: "d", why: "ضَرَّ → مَضَرَّةٌ: zarar." },
        { s: HL("أَكْبَرَ مِنْهَا", "أَكْبَرَ"), a: "x", why: "İsm-i tafdîl (أَفْعَلُ)." }
      ]},
      cls2: { opts: [["k", "Kıyâsî", "قِيَاسِيٌّ", "mz"], ["s", "Semâî", "سَمَاعِيٌّ", "mun"]], ar: "قِيَاسِيٌّ أَمْ سَمَاعِيٌّ؟", tr: "Metindeki zaman-mekân ve mim’li masdarlar kıyâsî mi, semâî mi? Tâ’lı olanlar semâîdir.", items: [
        { s: "مَوْعِدٌ", a: "k", why: "Misâl → مَفْعِل: kıyâsî." },
        { s: "مَرْأَى", a: "k", why: "Nâkıs → مَفْعَل: kıyâsî." },
        { s: "مَنْزِلٌ", a: "k", why: "يَنْزِلُ → مَفْعِل: kıyâsî." },
        { s: "مَفْسَدَةٌ", a: "s", why: "Tâ’lı: semâî." },
        { s: "مَهْلَكَةٌ", a: "s", why: "Tâ’lı: semâî." },
        { s: "مَهَابَةٌ", a: "s", why: "Tâ’lı: semâî." },
        { s: "مَحَبَّةٌ", a: "s", why: "Tâ’lı: semâî." },
        { s: "مَضَرَّةٌ", a: "s", why: "Tâ’lı: semâî." }
      ]}
    }
  ]
}
];

// Doğru Kalıp oyunu: [cümle {kelime}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var ZM_POOL = [
  ["{مَدْخَلُ} الكُلِّيَّةِ وَاسِعٌ.", ["مَدْخَلُ", "مَدْخِلُ", "مَدْخُولُ"], "يَدْخُلُ → مَفْعَل", "Fakültenin girişi geniş.", "u1"],
  ["أَكَلْتُ الغَدَاءَ فِي {المَنْزِلِ}.", ["المَنْزِلِ", "المَنْزَلِ", "المَنْزُولِ"], "يَنْزِلُ → مَفْعِل", "Öğle yemeğini evde yedim.", "u1"],
  ["خَرَجْتُ مِنَ البَيْتِ {مَطْلَعَ} الشَّمْسِ.", ["مَطْلَعَ", "مُطْلَعَ", "مَطْلُوعَ"], "يَطْلُعُ → مَفْعَل (zaman)", "Güneş doğarken çıktım.", "u1"],
  ["وَقَفَتِ السَّيَّارَةُ فِي {مُنْتَصَفِ} الطَّرِيقِ.", ["مُنْتَصَفِ", "مُنْتَصِفِ", "مَنْتَصَفِ"], "mezîd: ism-i mef’ûl kalıbı", "Araba yolun ortasında durdu.", "u1"],
  ["أُرِيدُ {مَخْرَجًا} مِنَ المُشْكِلَةِ.", ["مَخْرَجًا", "مَخْرِجًا", "مَخْرُوجًا"], "يَخْرُجُ → مَفْعَل (masdar)", "Sorundan bir çıkış istiyorum.", "u1"],
  ["نَلْعَبُ فِي {المَلْعَبِ}.", ["المَلْعَبِ", "المَلْعِبِ", "المَلْعُوبِ"], "يَلْعَبُ → مَفْعَل", "Sahada oynuyoruz.", "u2"],
  ["أَكَلْنَا فِي {المَطْعَمِ}.", ["المَطْعَمِ", "المَطْعِمِ", "المَطْعُومِ"], "يَطْعَمُ → مَفْعَل", "Lokantada yedik.", "u2"],
  ["تَطْبُخُ أُمِّي فِي {المَطْبَخِ}.", ["المَطْبَخِ", "المَطْبِخِ", "المَطْبُوخِ"], "يَطْبُخُ → مَفْعَل", "Annem mutfakta yemek pişiriyor.", "u2"],
  ["هَذَا {مَبْنًى} جَمِيلٌ.", ["مَبْنًى", "مَبْنِيٌّ", "مَبْنِي"], "nâkıs → مَفْعَل; مَبْنِيٌّ ism-i mef’ûl", "Bu güzel bir bina.", "u2"],
  ["رَمَى اللَّاعِبُ الكُرَةَ إِلَى {المَرْمَى}.", ["المَرْمَى", "المَرْمِيِّ", "المَرْمِي"], "nâkıs → مَفْعَل", "Oyuncu topu kaleye attı.", "u2"],
  ["زُرْنَا {مَقَامَ} إِبْرَاهِيمَ.", ["مَقَامَ", "مَقِيمَ", "مُقِيمَ"], "ecvef vâvî → مَفْعَل", "Makam-ı İbrâhim’i ziyaret ettik.", "u2"],
  ["لَا {مَفَرَّ} مِنَ المَوْتِ.", ["مَفَرَّ", "مَفِرَّ", "مَفْرُورَ"], "muzâaf → مَفْعَل", "Ölümden kaçış yok.", "u2"],
  ["جَلَسْنَا فِي {المَجْلِسِ}.", ["المَجْلِسِ", "المَجْلَسِ", "المَجْلُوسِ"], "يَجْلِسُ → مَفْعِل (yer)", "Mecliste oturduk.", "u3"],
  ["انْتَظَرْتُهُ فِي {المَوْقِفِ}.", ["المَوْقِفِ", "المَوْقَفِ", "المَوْقُوفِ"], "misâl → مَفْعِل", "Onu durakta bekledim.", "u3"],
  ["زُرْنَا {مَعْرِضَ} الكِتَابِ.", ["مَعْرِضَ", "مَعْرَضَ", "مَعْرُوضَ"], "يَعْرِضُ → مَفْعِل", "Kitap fuarını gezdik.", "u3"],
  ["ذَهَبَ أَبِي إِلَى {المُسْتَشْفَى}.", ["المُسْتَشْفَى", "المُسْتَشْفِي", "المَسْتَشْفَى"], "mezîd: ism-i mef’ûl kalıbı", "Babam hastaneye gitti.", "u3"],
  ["صَلَّيْنَا فِي {المُصَلَّى}.", ["المُصَلَّى", "المُصَلِّي", "المَصْلَى"], "mezîd: مُصَلًّى", "Namazgâhta namaz kıldık.", "u3"],
  ["هَذِهِ {مَسْأَلَةٌ} صَعْبَةٌ.", ["مَسْأَلَةٌ", "مَسْئِلَةٌ", "مَسْؤُولَةٌ"], "semâî مَفْعَلَة", "Bu zor bir mesele.", "u3"],
  ["سَلَامٌ هِيَ حَتَّى {مَطْلَعِ} الفَجْرِ", ["مَطْلَعِ", "مُطْلَعِ", "مَطْلُوعِ"], "Kadr 5", "Fecrin doğuşuna kadar bir selamettir.", "u4"],
  ["وَمَنْ يَتَّقِ اللهَ يَجْعَلْ لَهُ {مَخْرَجًا}", ["مَخْرَجًا", "مَخْرِجًا", "مَخْرُوجًا"], "Talâk 2", "Allah ona bir çıkış yolu açar.", "u4"],
  ["إِنَّ المُتَّقِينَ فِي {مَقَامٍ} أَمِينٍ", ["مَقَامٍ", "مَقِيمٍ", "مَقُومٍ"], "Duhân 51", "Takva sahipleri güvenli bir makamdadır.", "u4"],
  ["مَكَّةُ {مَهْبِطُ} الوَحْيِ.", ["مَهْبِطُ", "مَهْبَطُ", "مَهْبُوطُ"], "يَهْبِطُ → مَفْعِل", "Mekke vahyin indiği yerdir.", "u4"],
  ["كُنْتُ عَلَى {مَوْعِدٍ} مَعَ أُسْتَاذِي.", ["مَوْعِدٍ", "مَوْعَدٍ", "مَوْعُودٍ"], "misâl → مَفْعِل", "Hocamla randevum vardı.", "u5"],
  ["ذَهَبْتُ إِلَى {مَنْزِلِهِ}.", ["مَنْزِلِهِ", "مَنْزَلِهِ", "مَنْزُولِهِ"], "يَنْزِلُ → مَفْعِل", "Onun evine gittim.", "u5"],
  ["إِنَّ قَتْلَهُ {مَفْسَدَةٌ} لِلْمَرْءِ.", ["مَفْسَدَةٌ", "مَفْسِدَةٌ", "مُفْسِدَةٌ"], "يَفْسُدُ → مَفْعَلَة", "Onu öldürmek kişiyi bozar.", "u5"],
  ["مَحَبَّةُ المَالِ بِشِدَّةٍ {مَضَرَّةٌ} لِلْإِنْسَانِ.", ["مَضَرَّةٌ", "مَضِرَّةٌ", "مَضْرُورَةٌ"], "muzâaf → مَفْعَلَة", "Malı aşırı sevmek zarardır.", "u5"]
];
// Zaman mı mekân mı masdar mı? [cümle (html), cevap, açıklama]
var ZM_LIST = [
  [HL("خَرَجْتُ مَطْلَعَ الشَّمْسِ", "مَطْلَعَ"), "z", "doğuş vakti"], [HL("مَدْخَلُ الكُلِّيَّةِ وَاسِعٌ", "مَدْخَلُ"), "m", "giriş yeri"],
  [HL("أُرِيدُ مَخْرَجًا مِنَ المُشْكِلَةِ", "مَخْرَجًا"), "d", "çıkış"], [HL("أَكَلْتُ فِي المَنْزِلِ", "المَنْزِلِ"), "m", "ev"],
  [HL("مَطْلَعُ الشَّمْسِ السَّاعَةَ السَّادِسَةَ", "مَطْلَعُ"), "z", "doğuş vakti"], [HL("وَجَعَلَ بَيْنَكُمْ مَوَدَّةً", "مَوَدَّةً"), "d", "sevgi"],
  [HL("إِنَّ المُتَّقِينَ فِي مَقَامٍ أَمِينٍ", "مَقَامٍ"), "m", "makam"], [HL("الدُّنْيَا مَزْرَعَةُ الآخِرَةِ", "مَزْرَعَةُ"), "m", "tarla"],
  [HL("مَجْلِسُ العُلَمَاءِ بَعْدَ الفَجْرِ", "مَجْلِسُ"), "z", "oturma vakti"], [HL("قَتْلُ الوَقْتِ مَفْسَدَةٌ", "مَفْسَدَةٌ"), "d", "bozulma"],
  [HL("ذَهَبْتُ فِي المَوْعِدِ المُحَدَّدِ", "المَوْعِدِ"), "z", "belirlenen vakit"], [HL("مَكَّةُ مَهْبِطُ الوَحْيِ", "مَهْبِطُ"), "m", "iniş yeri"],
  [HL("صَلَاةُ الفَجْرِ قَبْلَ مَطْلَعِ الشَّمْسِ", "مَطْلَعِ"), "z", "doğuş vakti"], [HL("بَعْضُ المَطَاعِمِ مَفْتُوحَةٌ", "المَطَاعِمِ"), "m", "lokantalar"],
  [HL("مَحَبَّةُ المَالِ مَضَرَّةٌ", "مَضَرَّةٌ"), "d", "zarar"], [HL("اشْتَاقَتْ نَفْسِي إِلَى مَرْآهُ", "مَرْآهُ"), "d", "onu görmek"],
  [HL("مَوْقِفُ السَّيَّارَةِ بَيْنَ العِمَارَتَيْنِ", "مَوْقِفُ"), "m", "park yeri"], [HL("بَلَغْنَا القَرْيَةَ عِنْدَ المَغْرِبِ", "المَغْرِبِ"), "z", "akşam vakti"],
  [HL("نَلْعَبُ فِي المَلْعَبِ", "المَلْعَبِ"), "m", "saha"], [HL("جِئْتُ مُنْتَصَفَ اللَّيْلِ", "مُنْتَصَفَ"), "z", "gece yarısı"],
  [HL("وَقَفَتِ السَّيَّارَةُ فِي مُنْتَصَفِ الطَّرِيقِ", "مُنْتَصَفِ"), "m", "yolun ortası"], [HL("يَذْهَبُ المِزَاحُ بِالمَهَابَةِ", "بِالمَهَابَةِ"), "d", "heybet"],
  [HL("جَلَسْنَا فِي مَجْلِسِ العِلْمِ", "مَجْلِسِ"), "m", "ilim meclisi (yer)"], [HL("نَامَ الضُّيُوفُ فِي المَبِيتِ", "المَبِيتِ"), "m", "gecelenecek yer"]
];
var HAFIZA = {
  fi: { name: "Fiil ↔ isim", pairs: [["كَتَبَ", "مَكْتَبٌ"], ["جَلَسَ", "مَجْلِسٌ"], ["وَقَفَ", "مَوْقِفٌ"], ["بَنَى", "مَبْنًى"], ["قَامَ", "مَقَامٌ"], ["اِسْتَشْفَى", "مُسْتَشْفًى"], ["دَرَسَ", "مَدْرَسَةٌ"]] },
  cm: { name: "Müfred ↔ cemi", pairs: [["مَكْتَبٌ", "مَكَاتِبُ"], ["مَدْرَسَةٌ", "مَدَارِسُ"], ["مَنْزِلٌ", "مَنَازِلُ"], ["مَطْعَمٌ", "مَطَاعِمُ"], ["مَسْجِدٌ", "مَسَاجِدُ"], ["مَلْعَبٌ", "مَلَاعِبُ"], ["مَصْنَعٌ", "مَصَانِعُ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["مَطْعَمٌ", "lokanta"], ["مَطْبَخٌ", "mutfak"], ["مَوْقِفٌ", "durak"], ["مَعْرِضٌ", "sergi"], ["مُسْتَشْفًى", "hastane"], ["مَلْعَبٌ", "saha, stadyum"], ["مَوْعِدٌ", "randevu"], ["مَهْبِطٌ", "iniş yeri"]] }
};
var KARTLAR = [
  ["İsm-i zaman nedir?", "İşin vaktini bildiren türemiş isim: مَطْلَعَ الشَّمْسِ (güneşin doğduğu vakit)."],
  ["İsm-i mekân nedir?", "İşin yerini bildiren türemiş isim: المَنْزِلُ، المَكْتَبَةُ"],
  ["Mim’li masdar nedir?", "Başına fazladan mîm gelen masdar: مَخْرَجٌ = خُرُوجٌ"],
  ["Üçünü ne ayırır?", "Kalıpları aynı; aralarını cümle (siyak) ayırır."],
  ["مَفْعَل ne zaman?", "Muzâride ayn ötreli/üstünlü: مَكْتَبٌ، مَشْرَبٌ; muzâaf, ecvef vâvî, nâkıs, lefîf: مَفَرٌّ، مَقَامٌ، مَبْنًى"],
  ["مَفْعِل ne zaman?", "Muzâride ayn esreli: مَجْلِسٌ; misâl: مَوْقِفٌ; ecvef yâî: مَصِيرٌ"],
  ["Tâ’lı şekiller?", "Semâî: مَدْرَسَةٌ، مَكْتَبَةٌ، مَغْفِرَةٌ، مَعْرِفَةٌ"],
  ["Mezîd fiilden?", "İsm-i mef’ûl kalıbında: مُنْتَصَفٌ، مُسْتَشْفًى، مُصَلًّى"],
  ["مَكْتَبٌ'un müsennâ ve cemisi?", "مَكْتَبَانِ – مَكَاتِبُ"],
  ["مَبْنًى ile مَبْنِيٌّ farkı?", "مَبْنًى: bina (mekân). مَبْنِيٌّ: inşa edilmiş (ism-i mef’ûl)."],
  ["مَجْلِسٌ ile مَجْلَسٌ?", "مَجْلِسٌ: oturma yeri/vakti. مَجْلَسٌ: oturuş (mim’li masdar)."],
  ["مَوْعِدٌ hep masdar mı?", "Hayır: عَلَى مَوْعِدٍ (randevu, masdar), فِي المَوْعِدِ (vakit, zaman)."]
];
