// ================= Kıraat 17 — أَعْيَادُ المُسْلِمِينَ =================
// Renk rolleri: mz bayramdan önce, nasb bayram günü, cerr sebep, mi kalıp, ref fiil
var ROLES = {
  mz: { ar: "قَبْلَ العِيدِ", tr: "Bayramdan önce" }, nasb: { ar: "يَوْمَ العِيدِ", tr: "Bayram günü" }, cerr: { ar: "السَّبَبُ", tr: "Sebep" },
  mi: { ar: "التَّرْكِيبُ", tr: "Kalıp" }, ref: { ar: "الفِعْلُ", tr: "Fiil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var BAYRAM = [["f", "Ramazan Bayramı", "عِيدُ الفِطْرِ", "mz"], ["a", "Kurban Bayramı", "عِيدُ الأَضْحَى", "nasb"], ["k", "İkisi de", "كِلَاهُمَا", "ref"]];
var UYGUN = [["u", "Uygun ✓", "مُنَاسِبٌ", "mz"], ["g", "Uygun değil ✗", "غَيْرُ مُنَاسِبٍ", "cerr"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", f: "Ramazan Bayramı", a: "Kurban Bayramı", k: "İkisi de", u: "Uygun", g: "Uygun değil" };

// Bayram günü sırası: [zaman, Arapça, Türkçe, rol]
var GUN = [
  ["لَيْلَةَ العِيدِ", "تَرْتِيبُ البَيْتِ وَتَجْهِيزُ الثِّيَابِ وَشِرَاءُ الحَلَوِيَّاتِ", "Bayramdan bir gece önce: ev düzenlenir, elbiseler hazırlanır, tatlı alınır.", "mz"],
  ["قَبْلَ الفَجْرِ", "أَسْتَيْقِظُ وَأَغْتَسِلُ وَأَرْتَدِي مَلَابِسِي الجَدِيدَةَ", "Şafaktan önce: kalkarım, yıkanırım, yeni elbiselerimi giyerim.", "mz"],
  ["الفَجْرَ", "أُصَلِّي الفَجْرَ مَعَ أَصْدِقَائِي فِي المَسْجِدِ", "Sabah namazını arkadaşlarımla camide kılarım.", "nasb"],
  ["صَبَاحَ العِيدِ", "نُكَبِّرُ وَنُصَلِّي صَلَاةَ العِيدِ وَنَسْتَمِعُ إِلَى الخُطْبَةِ", "Tekbir getiririz, bayram namazını kılarız, hutbeyi dinleriz.", "nasb"],
  ["بَعْدَ الصَّلَاةِ", "نُهَنِّئُ عَائِلَاتِنَا وَنَزُورُ الأَقَارِبَ وَالأَصْدِقَاءَ", "Ailelerimizi tebrik eder, akraba ve arkadaşları ziyaret ederiz.", "cerr"],
  ["بَعْدَ ذَلِكَ", "نَذْهَبُ إِلَى المُتَنَزَّهَاتِ وَمَدِينَةِ الأَلْعَابِ", "Parklara ve lunaparka gideriz: bayram sevinç günüdür.", "cerr"]
];

// Karar makinesi: [ben biçimi, ön ek harekesi, kök, هُمْ biçimi (özel), devam, Türkçe]
var FIIL = [
  ["أَسْتَيْقِظَ", "َ", "سْتَيْقِظ", "", "قَبْلَ الفَجْرِ", "şafaktan önce kalkmaya"],
  ["أَغْتَسِلَ", "َ", "غْتَسِل", "", "صَبَاحَ العِيدِ", "bayram sabahı yıkanmaya (gusül almaya)"],
  ["أَرْتَدِيَ", "َ", "رْتَدِي", "رْتَدُوا", "المَلَابِسَ الجَدِيدَةَ", "yeni elbiseleri giymeye"],
  ["أُكَبِّرَ", "ُ", "كَبِّر", "", "فِي المَسْجِدِ", "camide tekbir getirmeye"],
  ["أُصَلِّيَ", "ُ", "صَلِّي", "صَلُّوا", "صَلَاةَ العِيدِ", "bayram namazını kılmaya"],
  ["أَسْتَمِعَ", "َ", "سْتَمِع", "", "إِلَى الخُطْبَةِ", "hutbeyi dinlemeye"],
  ["أُهَنِّئَ", "ُ", "هَنِّئ", "", "الأَقَارِبَ بِالعِيدِ", "akrabaları bayram için tebrik etmeye"],
  ["أَزُورَ", "َ", "زُور", "", "الأَصْدِقَاءَ", "arkadaşları ziyaret etmeye"],
  ["أَذْهَبَ", "َ", "ذْهَب", "", "إِلَى مَدِينَةِ الأَلْعَابِ", "lunaparka gitmeye"]
];
// Kişiler: [zamir, Türkçe, قَرَّرَ biçimi, muzâri ön harfi, Türkçe yüklem]
var KISI = [["أَنَا", "Ben", "قَرَّرْتُ", "أ", "karar verdim"], ["نَحْنُ", "Biz", "قَرَّرْنَا", "ن", "karar verdik"], ["هُوَ", "O (erkek)", "قَرَّرَ", "ي", "karar verdi"], ["هِيَ", "O (kız)", "قَرَّرَتْ", "ت", "karar verdi"], ["أَنْتَ", "Sen", "قَرَّرْتَ", "ت", "karar verdin"], ["هُمْ", "Onlar", "قَرَّرُوا", "ي", "karar verdiler"]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "يَحْتَفِلُ المُسْلِمُونَ كُلَّ عَامٍ بِعِيدَيْنِ، هُمَا: عِيدُ الفِطْرِ، وَعِيدُ الأَضْحَى. عِيدُ الفِطْرِ يَأْتِي بَعْدَ صِيَامِ شَهْرِ رَمَضَانَ، وَهُوَ مُكَافَأَةٌ لِلصَّائِمِينَ، لِأَنَّهُمْ صَامُوا شَهْرَ رَمَضَانَ وَأَطَاعُوا رَبَّهُمْ. وَعِيدُ الأَضْحَى يَأْتِي بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ." +
  "<br>وَقَبْلَ العِيدِ بِلَيْلَةٍ يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ فِي تَرْتِيبِ البَيْتِ وَتَجْهِيزِ الثِّيَابِ وَشِرَاءِ الحَلَوِيَّاتِ، كَالبَقْلَاوَةِ عِنْدَ الأَتْرَاكِ، وَكَعْكِ العِيدِ عِنْدَ العَرَبِ، وَيَكُونُ الكَعْكُ مَحْشُوًّا بِالتَّمْرِ أَوِ الفُسْتُقِ أَوِ الجَوْزِ." +
  "<br>وَفِي صَبَاحِ يَوْمِ العِيدِ يَخْرُجُ المُسْلِمُونَ، صِغَارًا وَكِبَارًا، إِلَى صَلَاةِ العِيدِ بِالمَلَابِسِ الجَدِيدَةِ، وَهُمْ يُكَبِّرُونَ، ثُمَّ يَعُودُونَ إِلَى بُيُوتِهِمْ لِلْمُعَايَدَةِ وَلِاسْتِقْبَالِ الضُّيُوفِ وَتَبَادُلِ الزِّيَارَاتِ وَالتَّهَانِي." +
  "<br>فِي هَذَا العِيدِ قَرَّرْتُ أَنْ أَسْتَيْقِظَ قَبْلَ الفَجْرِ لِأَغْتَسِلَ وَأَرْتَدِيَ مَلَابِسِي الجَدِيدَةَ وَأَتَوَجَّهَ بَعْدَ ذَلِكَ إِلَى أَدَاءِ صَلَاةِ الفَجْرِ مَعَ أَصْدِقَائِي مُحَمَّدٍ وَحُسَامٍ وَأَحْمَدَ، ثُمَّ بَقِينَا فِي المَسْجِدِ لِنُكَبِّرَ وَنُصَلِّيَ صَلَاةَ العِيدِ وَنَسْتَمِعَ إِلَى الخُطْبَةِ، ثُمَّ رَجَعْنَا إِلَى بُيُوتِنَا لِنُهَنِّئَ عَائِلَاتِنَا بِالعِيدِ وَنَزُورَ الأَصْدِقَاءَ، وَقَدْ قَرَّرْتُ أَنَا وَأَصْدِقَائِي الذَّهَابَ إِلَى بَعْضِ المُتَنَزَّهَاتِ وَمَدِينَةِ الأَلْعَابِ، لِأَنَّ يَوْمَ العِيدِ يَوْمُ سَعَادَةٍ وَسُرُورٍ.";
var METIN_TR = "Müslümanlar her yıl iki bayram kutlar: Ramazan Bayramı ve Kurban Bayramı. Ramazan Bayramı ramazan orucundan sonra gelir; oruç tutanlara bir ödüldür, çünkü onlar ramazan ayında oruç tutmuş ve Rablerine itaat etmişlerdir. Kurban Bayramı ise hac farîzası yerine getirildikten sonra gelir." +
  "<br>Bayramdan bir gece önce aile fertleri evi düzenlemede, elbiseleri hazırlamada ve tatlı almada yardımlaşır; Türklerde baklava, Araplarda bayram çöreği (ka‘k) gibi. Çörek hurma, fıstık ya da ceviz ile doldurulur." +
  "<br>Bayram günü sabahı Müslümanlar, küçük büyük, yeni elbiseleriyle tekbir getirerek bayram namazına çıkar; sonra bayramlaşmak, misafir karşılamak, karşılıklı ziyaret ve tebrikleşmek için evlerine dönerler." +
  "<br>Bu bayramda şafaktan önce kalkmaya karar verdim; yıkanmak, yeni elbiselerimi giymek ve ardından arkadaşlarım Muhammed, Hüsâm ve Ahmed’le sabah namazını kılmaya gitmek için. Sonra tekbir getirmek, bayram namazını kılmak ve hutbeyi dinlemek için camide kaldık. Ardından ailelerimizin bayramını tebrik etmek ve arkadaşları ziyaret etmek için evlerimize döndük. Arkadaşlarımla bazı parklara ve lunaparka gitmeye karar verdik; çünkü bayram günü mutluluk ve sevinç günüdür.";
var SOZLUK = [["يَحْتَفِلُ بِـ", "…i kutlar"], ["عِيدُ الفِطْرِ", "Ramazan Bayramı"], ["عِيدُ الأَضْحَى", "Kurban Bayramı"], ["مُكَافَأَةٌ", "ödül"], ["الصَّائِمُونَ", "oruç tutanlar"], ["أَطَاعُوا", "itaat ettiler"], ["أَدَاءُ فَرِيضَةِ الحَجِّ", "hac farzını yerine getirme"], ["قَبْلَ العِيدِ بِلَيْلَةٍ", "bayramdan bir gece önce"], ["يَتَعَاوَنُ", "yardımlaşır"], ["أَفْرَادُ الأُسْرَةِ", "aile fertleri"], ["تَجْهِيزٌ", "hazırlama"], ["الحَلَوِيَّاتُ", "tatlılar"], ["الكَعْكُ", "bayram çöreği"], ["مَحْشُوًّا بِـ", "…ile doldurulmuş"], ["الفُسْتُقُ / الجَوْزُ", "fıstık / ceviz"], ["يُكَبِّرُونَ", "tekbir getirirler"], ["المُعَايَدَةُ", "bayramlaşma"], ["اسْتِقْبَالُ الضُّيُوفِ", "misafir karşılama"], ["تَبَادُلُ الزِّيَارَاتِ وَالتَّهَانِي", "karşılıklı ziyaret ve tebrik"], ["قَرَّرْتُ", "karar verdim"], ["أَغْتَسِلُ", "yıkanırım, gusül alırım"], ["أَرْتَدِي", "giyerim"], ["أَتَوَجَّهُ إِلَى", "…e yönelirim, giderim"], ["الخُطْبَةُ", "hutbe"], ["نُهَنِّئُ", "tebrik ederiz"], ["المُتَنَزَّهَاتُ", "parklar, mesire yerleri"], ["مَدِينَةُ الأَلْعَابِ", "lunapark"], ["سُرُورٌ", "sevinç"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendini düşünmek: Türkiye’deki özel günler, Ramazan Bayramı ne zaman gelir, bayramda ne yaparız", "Bayramları anlatan metni durmadan okumak ve dinlemek", "Bayram kelimelerini öğrenmek: عِيدٌ، صَلَاةُ العِيدِ، يُكَبِّرُونَ، المُعَايَدَةُ، التَّهَانِي", "Metindeki bilgilerin doğru mu yanlış mı olduğunu bulmak"],
  examples: [
    { s: "قَبْلَ العِيدِ بِلَيْلَةٍ:mz / يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ:- / فِي تَرْتِيبِ البَيْتِ.:mz.Hazırlık", tr: "Bayramdan bir gece önce aile fertleri evi düzenlemede yardımlaşır." },
    { s: "وَفِي صَبَاحِ يَوْمِ العِيدِ:nasb / يَخْرُجُ المُسْلِمُونَ إِلَى صَلَاةِ العِيدِ:- / وَهُمْ يُكَبِّرُونَ.:nasb.Hâl", tr: "Bayram sabahı Müslümanlar tekbir getirerek bayram namazına çıkar." }
  ],
  rules: [
    { tr: "<b>İki bayram:</b> <span class=\"ar\">عِيدُ الفِطْرِ</span> Ramazan (Şeker) Bayramı: ramazan orucundan sonra gelir, oruç tutanlara bir ödüldür (<span class=\"ar\">مُكَافَأَةٌ لِلصَّائِمِينَ</span>). <span class=\"ar\">عِيدُ الأَضْحَى</span> Kurban Bayramı: hac farîzasından sonra gelir." },
    { tr: "<b>Bayram tatlıları:</b> Türklerde <span class=\"ar\">البَقْلَاوَةُ</span> baklava, Araplarda <span class=\"ar\">كَعْكُ العِيدِ</span> bayram çöreği; çöreğin içi hurma, fıstık ya da cevizdir (<span class=\"ar\">مَحْشُوٌّ بِالتَّمْرِ أَوِ الفُسْتُقِ أَوِ الجَوْزِ</span>)." },
    { tr: "<b>Metnin son paragrafı</b> birinci tekil şahısla (<span class=\"ar\">أَنَا</span>) anlatılır: <span class=\"ar\">قَرَّرْتُ، بَقِينَا، رَجَعْنَا</span>. Kitabın 3. etkinliği bu kişiye <b>Murâd</b> (<span class=\"ar\">مُرَاد</span>) adını verir ve olayları gelecek zamanla (<span class=\"ar\">سَيَسْتَيْقِظُ</span>) anlatır." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: اذْكُرْ / اذْكُرِي بَعْضَ المُنَاسَبَاتِ الخَاصَّةِ فِي تُرْكِيَا؟ مَتَى يَأْتِي عِيدُ الفِطْرِ؟ مَاذَا نَفْعَلُ فِي الأَعْيَادِ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "أَعْيَادُ المُسْلِمِينَ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "اذْكُرْ بَعْضَ المُنَاسَبَاتِ الخَاصَّةِ فِي تُرْكِيَا.", a: "عِيدُ الفِطْرِ وَعِيدُ الأَضْحَى وَلَيْلَةُ القَدْرِ وَالمَوْلِدُ النَّبَوِيُّ.", tr: "Türkiye’deki bazı özel günler? (Örnek) Ramazan ve Kurban Bayramı, Kadir Gecesi, Mevlid Kandili." },
        { q: "مَتَى يَأْتِي عِيدُ الفِطْرِ؟", a: "يَأْتِي عِيدُ الفِطْرِ بَعْدَ صِيَامِ شَهْرِ رَمَضَانَ.", tr: "Ramazan Bayramı ne zaman gelir? Ramazan orucundan sonra." },
        { q: "مَاذَا نَفْعَلُ فِي الأَعْيَادِ؟", a: "نُصَلِّي صَلَاةَ العِيدِ وَنَزُورُ الأَقَارِبَ وَنُهَنِّئُ بَعْضَنَا.", tr: "Bayramlarda ne yaparız? Bayram namazı kılarız, akrabaları ziyaret eder, birbirimizi tebrik ederiz." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "يَحْتَفِلُ المُسْلِمُونَ كُلَّ عَامٍ بِعِيدَيْنِ.", a: "d", why: "عِيدُ الفِطْرِ وَعِيدُ الأَضْحَى." },
        { s: "يَأْتِي عِيدُ الفِطْرِ بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ.", a: "y", why: "Ramazan orucundan sonra; hacdan sonra gelen Kurban Bayramı’dır." },
        { s: "عِيدُ الفِطْرِ مُكَافَأَةٌ لِلصَّائِمِينَ.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَأْتِي عِيدُ الأَضْحَى بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ.", a: "d", why: "Metinde aynen geçer." },
        { s: "البَقْلَاوَةُ مِنْ حَلَوِيَّاتِ العِيدِ عِنْدَ العَرَبِ.", a: "y", why: "Baklava Türklerde; Araplarda كَعْكُ العِيدِ." },
        { s: "يَكُونُ الكَعْكُ مَحْشُوًّا بِالتَّمْرِ أَوِ الفُسْتُقِ أَوِ الجَوْزِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَخْرُجُ الكِبَارُ فَقَطْ إِلَى صَلَاةِ العِيدِ.", a: "y", why: "صِغَارًا وَكِبَارًا (küçük büyük)." },
        { s: "يُكَبِّرُ المُسْلِمُونَ وَهُمْ يَخْرُجُونَ إِلَى صَلَاةِ العِيدِ.", a: "d", why: "وَهُمْ يُكَبِّرُونَ." },
        { s: "اسْتَيْقَظَ الكَاتِبُ بَعْدَ طُلُوعِ الشَّمْسِ.", a: "y", why: "قَبْلَ الفَجْرِ (şafaktan önce)." },
        { s: "صَلَّى الكَاتِبُ الفَجْرَ مَعَ أَصْدِقَائِهِ.", a: "d", why: "مُحَمَّدٍ وَحُسَامٍ وَأَحْمَدَ." },
        { s: "خَرَجَ الكَاتِبُ مِنَ المَسْجِدِ قَبْلَ الخُطْبَةِ.", a: "y", why: "Hutbeyi dinlemek için kaldılar: وَنَسْتَمِعَ إِلَى الخُطْبَةِ." },
        { s: "يَوْمُ العِيدِ يَوْمُ سَعَادَةٍ وَسُرُورٍ.", a: "d", why: "Metnin son cümlesi." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("يَحْتَفِلُ المُسْلِمُونَ كُلَّ عَامٍ بِعِيدَيْنِ", "يَحْتَفِلُ"), "kutlar", "unutur", "bekler", "Müslümanlar her yıl iki bayram kutlar.", "احْتِفَالٌ: kutlama."],
      [HL("وَهُوَ مُكَافَأَةٌ لِلصَّائِمِينَ", "مُكَافَأَةٌ"), "ödül", "ceza", "hediye paketi", "Oruç tutanlara bir ödüldür.", "≠ عُقُوبَةٌ"],
      [HL("لِأَنَّهُمْ صَامُوا شَهْرَ رَمَضَانَ وَأَطَاعُوا رَبَّهُمْ", "وَأَطَاعُوا"), "ve itaat ettiler", "ve isyan ettiler", "ve unuttular", "Rablerine itaat ettiler.", "≠ عَصَى"],
      [HL("بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ", "فَرِيضَةِ"), "farz", "sünnet", "yolculuk", "Hac farzını yerine getirdikten sonra.", "Çoğulu: فَرَائِضُ."],
      [HL("يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ", "يَتَعَاوَنُ"), "yardımlaşır", "tartışır", "ayrılır", "Aile fertleri yardımlaşır.", "= يَتَسَاعَدُ"],
      [HL("وَتَجْهِيزِ الثِّيَابِ", "وَتَجْهِيزِ"), "ve hazırlama", "ve yıkama", "ve satma", "Elbiseleri hazırlama.", "جَهَّزَ: hazırladı."],
      [HL("وَيَكُونُ الكَعْكُ مَحْشُوًّا بِالتَّمْرِ", "مَحْشُوًّا"), "doldurulmuş, içli", "kızarmış", "tuzlu", "Çörek hurmayla doldurulur.", ""],
      [HL("وَهُمْ يُكَبِّرُونَ", "يُكَبِّرُونَ"), "tekbir getirirler", "büyürler", "büyütürler", "Tekbir getirirler: اللهُ أَكْبَرُ.", ""],
      [HL("لِلْمُعَايَدَةِ وَلِاسْتِقْبَالِ الضُّيُوفِ", "لِلْمُعَايَدَةِ"), "bayramlaşmak için", "yemek için", "uyumak için", "Bayramlaşmak ve misafir karşılamak için.", "عِيدٌ kökünden."],
      [HL("لِأَغْتَسِلَ وَأَرْتَدِيَ مَلَابِسِي الجَدِيدَةَ", "وَأَرْتَدِيَ"), "ve giyeyim", "ve çıkarayım", "ve satayım", "Yıkanıp yeni elbiselerimi giymek için.", "= أَلْبَسَ · ≠ أَخْلَعَ"],
      [HL("لِنُهَنِّئَ عَائِلَاتِنَا بِالعِيدِ", "لِنُهَنِّئَ"), "tebrik etmek için", "ziyaret etmek için", "uyandırmak için", "Ailelerimizin bayramını tebrik etmek için.", "تَهْنِئَةٌ، التَّهَانِي"],
      [HL("الذَّهَابَ إِلَى بَعْضِ المُتَنَزَّهَاتِ", "المُتَنَزَّهَاتِ"), "parklar, mesire yerleri", "müzeler", "pazarlar", "Bazı parklara gitmek.", "Tekili: مُتَنَزَّهٌ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama: Bayram Nasıl Geçer?", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak", "Cümleyi sebebi ya da ayrıntısıyla eşleştirmek", "Ramazan ve Kurban Bayramı’nı ayırmak"],
  examples: [
    { s: "يَحْتَفِلُ المُسْلِمُونَ بِعِيدِ الفِطْرِ:- / لِأَنَّهُمْ صَامُوا شَهْرَهُمْ:cerr", tr: "Müslümanlar Ramazan Bayramı’nı kutlar; çünkü aylarını oruçla geçirdiler.", pair: "سَيَسْتَيْقِظُ مُرَادٌ قَبْلَ الفَجْرِ:mz / لِأَدَاءِ صَلَاةِ الفَجْرِ:cerr", pairTr: "Murâd sabah namazını kılmak için şafaktan önce kalkacak." }
  ],
  rules: [
    { tr: "<b>Sebep bildiren ifadeler:</b> <span class=\"ar\">لِأَنَّ + isim cümlesi</span> “çünkü”: <span class=\"ar\">لِأَنَّهُمْ صَامُوا</span> · <span class=\"ar\">لِـ + mastar</span> “…mek için”: <span class=\"ar\">لِأَدَاءِ صَلَاةِ الفَجْرِ، لِلْمُعَايَدَةِ</span> · <span class=\"ar\">لِـ + muzâri</span> “…sın diye”: <span class=\"ar\">لِأَغْتَسِلَ، لِنُكَبِّرَ</span>." },
    { tr: "<b>Kitaptaki 2. etkinlik, 3. madde:</b> “Bütün Müslümanlar bayram namazına yeni elbiselerle çıkar.” Metin <span class=\"ar\">صِغَارًا وَكِبَارًا… بِالمَلَابِسِ الجَدِيدَةِ</span> dediği için doğru kabul edildi; ama “bütün (<span class=\"ar\">جَمِيعُ</span>)” kelimesi metinde yoktur." },
    { tr: "<b>4. madde:</b> İnsanlar namazdan sonra yemek için değil; bayramlaşmak, misafir karşılamak, ziyaret ve tebrikleşmek için evlerine döner. Bu yüzden yanlıştır." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: كَمْ عِيدًا عِنْدَ المُسْلِمِينَ؟ مَتَى يَأْتِي العِيدَانِ؟ كَيْفَ يَسْتَعِدُّ المُسْلِمُونَ لِلْعِيدِ؟ مَاذَا يَفْعَلُ المُسْلِمُونَ قَبْلَ العِيدِ بِلَيْلَةٍ؟ كَيْفَ يَخْرُجُ المُسْلِمُونَ إِلَى صَلَاةِ العِيدِ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ. ٣ ـ صِلْ بَيْنَ الجُمَلِ فِي العَمُودِ «أ» مَعَ مَا يُنَاسِبُهَا مِنَ الجُمَلِ فِي العَمُودِ «ب»."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["كَمْ عِيدًا عِنْدَ المُسْلِمِينَ؟", "عِيدَانِ: عِيدُ الفِطْرِ وَعِيدُ الأَضْحَى.", "عِيدٌ وَاحِدٌ.", "ثَلَاثَةُ أَعْيَادٍ.", "Müslümanların kaç bayramı var? İki.", ""],
      ["مَتَى يَأْتِي العِيدَانِ؟", "عِيدُ الفِطْرِ بَعْدَ صِيَامِ رَمَضَانَ، وَعِيدُ الأَضْحَى بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ.", "يَأْتِيَانِ فِي أَوَّلِ السَّنَةِ.", "يَأْتِيَانِ قَبْلَ رَمَضَانَ.", "İki bayram ne zaman gelir?", ""],
      ["كَيْفَ يَسْتَعِدُّ المُسْلِمُونَ لِلْعِيدِ؟", "يُرَتِّبُونَ البَيْتَ وَيُجَهِّزُونَ الثِّيَابَ وَيَشْتَرُونَ الحَلَوِيَّاتِ.", "يَنَامُونَ طَوِيلًا.", "يُسَافِرُونَ إِلَى الحَجِّ كُلُّهُمْ.", "Bayrama nasıl hazırlanırlar? Ev, elbise, tatlı.", ""],
      ["مَاذَا يَفْعَلُ المُسْلِمُونَ قَبْلَ العِيدِ بِلَيْلَةٍ؟", "يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ فِي تَرْتِيبِ البَيْتِ وَتَجْهِيزِ الثِّيَابِ.", "يَخْرُجُونَ إِلَى صَلَاةِ العِيدِ.", "يَسْتَمِعُونَ إِلَى الخُطْبَةِ.", "Bayramdan bir gece önce ne yaparlar?", ""],
      ["كَيْفَ يَخْرُجُ المُسْلِمُونَ إِلَى صَلَاةِ العِيدِ؟", "صِغَارًا وَكِبَارًا، بِالمَلَابِسِ الجَدِيدَةِ، وَهُمْ يُكَبِّرُونَ.", "بِالمَلَابِسِ القَدِيمَةِ وَهُمْ صَامِتُونَ.", "الكِبَارُ فَقَطْ.", "Bayram namazına nasıl çıkarlar?", ""]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["شِرَاءُ الحَلَوِيَّاتِ مَظْهَرٌ مِنْ مَظَاهِرِ الاحْتِفَالِ بِالعِيدِ عِنْدَ الأَتْرَاكِ.", "d", "كَالبَقْلَاوَةِ عِنْدَ الأَتْرَاكِ."],
      ["قَبْلَ العِيدِ بِأُسْبُوعٍ يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ فِي تَرْتِيبِ البَيْتِ.", "y", "قَبْلَ العِيدِ بِلَيْلَةٍ (bir gece önce)."],
      ["يَخْرُجُ جَمِيعُ المُسْلِمِينَ إِلَى صَلَاةِ العِيدِ بِالثِّيَابِ الجَدِيدَةِ.", "d", "صِغَارًا وَكِبَارًا… بِالمَلَابِسِ الجَدِيدَةِ."],
      ["يَعُودُ النَّاسُ إِلَى بُيُوتِهِمْ بَعْدَ الصَّلَاةِ لِتَنَاوُلِ الطَّعَامِ.", "y", "لِلْمُعَايَدَةِ وَلِاسْتِقْبَالِ الضُّيُوفِ وَتَبَادُلِ الزِّيَارَاتِ."]
    ]) },
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ الجُمَلِ فِي العَمُودِ «أ» مَعَ مَا يُنَاسِبُهَا مِنَ الجُمَلِ فِي العَمُودِ «ب»", tr: "Önce aşağıdan B sütunundaki parçayı seç, sonra A sütunundaki cümlenin kutusuna dokun.", bank: ["لِأَدَاءِ صَلَاةِ الفَجْرِ مَعَ أَصْدِقَائِهِ", "لِأَنَّ يَوْمَ العِيدِ يَوْمُ سُرُورٍ وَسَعَادَةٍ", "مَعَ أَصْدِقَائِهِ فِي المَسْجِدِ", "لِأَنَّهُمْ صَامُوا شَهْرَهُمْ وَأَطَاعُوا رَبَّهُمْ"], items: [
      { pre: "يَحْتَفِلُ المُسْلِمُونَ بِعِيدِ الفِطْرِ", a: [3], tr: "Müslümanlar Ramazan Bayramı’nı kutlar; çünkü oruç tuttular ve Rablerine itaat ettiler." },
      { pre: "سَيَسْتَيْقِظُ مُرَادٌ قَبْلَ الفَجْرِ", a: [0], tr: "Murâd, arkadaşlarıyla sabah namazını kılmak için şafaktan önce kalkacak." },
      { pre: "سَيَذْهَبُ مُرَادٌ مَعَ أَصْدِقَائِهِ إِلَى المُتَنَزَّهَاتِ", a: [1], tr: "Murâd arkadaşlarıyla parklara gidecek; çünkü bayram sevinç günüdür." },
      { pre: "سَيُصَلِّي مُرَادٌ صَلَاةَ العِيدِ", a: [2], tr: "Murâd bayram namazını arkadaşlarıyla camide kılacak." }
    ]},
    { type: "classify", extra: true, opts: BAYRAM, ar: "عِيدُ الفِطْرِ أَمْ عِيدُ الأَضْحَى أَمْ كِلَاهُمَا؟", tr: "Bu bilgi hangi bayrama ait: Ramazan Bayramı mı, Kurban Bayramı mı, ikisi de mi?", items: CL([
      ["يَأْتِي بَعْدَ صِيَامِ شَهْرِ رَمَضَانَ.", "f", "عِيدُ الفِطْرِ"], ["مُكَافَأَةٌ لِلصَّائِمِينَ.", "f", "عِيدُ الفِطْرِ"], ["يَكُونُ فِي أَوَّلِ يَوْمٍ مِنْ شَهْرِ شَوَّالٍ.", "f", "1 Şevval."],
      ["يَأْتِي بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ.", "a", "عِيدُ الأَضْحَى"], ["يَذْبَحُ فِيهِ المُسْلِمُونَ الأَضَاحِيَ.", "a", "Kurban kesilir (أُضْحِيَةٌ)."], ["يَكُونُ فِي العَاشِرِ مِنْ ذِي الحِجَّةِ.", "a", "10 Zilhicce."],
      ["يَخْرُجُ المُسْلِمُونَ إِلَى صَلَاةِ العِيدِ.", "k", "İki bayramda da bayram namazı kılınır."], ["يَتَبَادَلُ النَّاسُ الزِّيَارَاتِ وَالتَّهَانِي.", "k", "İkisinde de."], ["يَلْبَسُ النَّاسُ المَلَابِسَ الجَدِيدَةَ.", "k", "İkisinde de."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Eş, Zıt", short: "Kelimeler", col: "mi", legend: ["mz", "cerr"],
  goals: ["Bayram paragrafında boşlukları doldurmak", "Metinde altı çizili kelimelerin eş anlamlısını bulmak", "Kelimeleri zıt anlamlılarıyla eşleştirmek"],
  examples: [
    { s: "يَلْبَسُ:mz.Kelime / = يَرْتَدِي:nasb.Eş", tr: "giyer", pair: "صَامَ:mz.Kelime / ≠ أَفْطَرَ:cerr.Zıt", pairTr: "oruç tuttu ≠ orucunu açtı" }
  ],
  rules: [
    { tr: "<b>Eş anlam (5. etkinlik, metinden):</b> <span class=\"ar\">تُجَهِّزُ = تُعِدُّ · نَتَسَاعَدُ = نَتَعَاوَنُ · المَلَابِسُ = الثِّيَابُ · المُعَايَدَةُ = التَّهْنِئَةُ · يَعُودُ = يَرْجِعُ · السَّعَادَةُ = السُّرُورُ · يَلْبَسُ = يَرْتَدِي</span>. Not: <span class=\"ar\">تُجَهِّزُ</span>’ün eşi metinde fiil olarak geçmez; metinde aynı kökten <span class=\"ar\">تَجْهِيزِ</span> vardır. Burada <span class=\"ar\">تُعِدُّ</span> verildi." },
    { tr: "<b>Zıt anlam (6. etkinlik):</b> <span class=\"ar\">وَدَّعَ ≠ اسْتَقْبَلَ · يَشْتَرِي ≠ يَبِيعُ · صَامَ ≠ أَفْطَرَ · ارْتَدَى ≠ خَلَعَ · أَطَاعَ ≠ عَصَى · مُكَافَأَةٌ ≠ عُقُوبَةٌ · يَخْرُجُ ≠ يَدْخُلُ · سَعَادَةٌ ≠ حُزْنٌ</span>." },
    { tr: "<b>4. etkinlik:</b> kitapta “<span class=\"ar\">وَيُهَنِّئُ … بَعْضًا</span>” için tek boşluk var ama iki kelime gerekir: <span class=\"ar\">يُهَنِّئُ الكِبَارُ بَعْضُهُمْ بَعْضًا</span> (büyükler birbirini tebrik eder). Burada iki ayrı boşluk yapıldı." }
  ],
  kaide: ["٤ ـ امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ فِيمَا يَلِي: (بَعْضُهُمْ، الجَمِيلَةَ، الأَطْفَالُ، المَلَابِسَ، الكِبَارُ، يَرْكَبُونَ، بِخَيْرٍ).", "٥ ـ اقْرَإِ الجُمَلَ الآتِيَةَ، وَابْحَثْ عَنْ مُرَادِفِ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ فِي نَصِّ القِرَاءَةِ. ٦ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي."],
  ex: [
    { type: "bank", num: "٤", ar: "امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ فِيمَا يَلِي", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Her kelime bir kez kullanılır.", bank: ["بَعْضُهُمْ", "الجَمِيلَةَ", "الأَطْفَالُ", "المَلَابِسَ", "الكِبَارُ", "يَرْكَبُونَ", "بِخَيْرٍ"],
      tr2: "Çocuklar bayram günü sevinir; yeni elbiseleri giyer, güzel oyuncaklarını taşır, tatlı alır, salıncaklara biner, akrabalarını ziyaret eder, oynayıp eğlenirler. Sabah erkenden namazgâhlara giderler; büyükler birbirini tebrik eder ve her biri diğerine “Nice bayramlara (her yıl hayırla olun)” der.",
      parts: ["يَفْرَحُ", { a: [2] }, "بِيَوْمِ العِيدِ، فَيَلْبَسُونَ", { a: [3] }, "الجَدِيدَةَ، وَيَحْمِلُونَ لُعَبَهُمُ", { a: [1] }, "، وَيَشْتَرُونَ الحَلْوَى، وَ", { a: [5] }, "الأَرَاجِيحَ، وَيَزُورُونَ أَقَارِبَهُمْ، وَيَلْعَبُونَ وَيَمْرَحُونَ، وَيَذْهَبُونَ فِي الصَّبَاحِ البَاكِرِ إِلَى المُصَلَّيَاتِ، وَيُهَنِّئُ", { a: [4] }, { a: [0] }, "بَعْضًا، وَكُلٌّ مِنْهُمْ يَقُولُ لِلْآخَرِ: كُلَّ عَامٍ وَأَنْتُمْ", { a: [6] }, "."] },
    { type: "bank", num: "٥", ar: "اقْرَإِ الجُمَلَ الآتِيَةَ، وَابْحَثْ عَنْ مُرَادِفِ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ", tr: "Önce aşağıdan eş anlamlıyı seç, sonra cümlenin kutusuna dokun.", bank: ["تُعِدُّ", "نَتَعَاوَنُ", "الثِّيَابُ", "التَّهْنِئَةُ", "يَرْجِعُ", "السُّرُورُ", "يَرْتَدِي"], items: [
      { pre: "تُجَهِّزُ أُمِّي حَلْوَى العِيدِ قَبْلَ يَوْمَيْنِ. (تُجَهِّزُ =)", a: [0], tr: "Annem bayram tatlısını iki gün önce hazırlar." },
      { pre: "نَتَسَاعَدُ أَنَا وَإِخْوَتِي فِي أَعْمَالِ المَنْزِلِ. (نَتَسَاعَدُ =)", a: [1], tr: "Kardeşlerimle ev işlerinde yardımlaşırız." },
      { pre: "المَلَابِسُ فِي السُّوقِ المَرْكَزِيِّ رَخِيصَةٌ. (المَلَابِسُ =)", a: [2], tr: "Merkez çarşıdaki elbiseler ucuzdur." },
      { pre: "مُعَايَدَةُ الأَقَارِبِ وَاجِبٌ فِي الأَعْيَادِ. (مُعَايَدَةُ =)", a: [3], tr: "Bayramlarda akrabalarla bayramlaşmak bir görevdir." },
      { pre: "يَعُودُ أَبِي مِنْ عَمَلِهِ مُتَأَخِّرًا. (يَعُودُ =)", a: [4], tr: "Babam işinden geç döner." },
      { pre: "السَّعَادَةُ هِيَ عُنْوَانُ العِيدِ عِنْدَ الأَطْفَالِ. (السَّعَادَةُ =)", a: [5], tr: "Çocuklar için bayramın adı mutluluktur." },
      { pre: "يَلْبَسُ الأَطْفَالُ مَلَابِسَهُمُ الجَدِيدَةَ فِي العِيدِ. (يَلْبَسُ =)", a: [6], tr: "Çocuklar bayramda yeni elbiselerini giyer." }
    ]},
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["أَفْطَرَ", "خَلَعَ", "اسْتَقْبَلَ", "عَصَى", "يَبِيعُ", "يَدْخُلُ", "حُزْنٌ", "عُقُوبَةٌ"], items: [
      { pre: "وَدَّعَ ≠", a: [2], tr: "uğurladı ≠ karşıladı" }, { pre: "يَشْتَرِي ≠", a: [4], tr: "satın alır ≠ satar" }, { pre: "صَامَ ≠", a: [0], tr: "oruç tuttu ≠ iftar etti" }, { pre: "ارْتَدَى ≠", a: [1], tr: "giydi ≠ çıkardı" }, { pre: "أَطَاعَ ≠", a: [3], tr: "itaat etti ≠ isyan etti" }, { pre: "مُكَافَأَةٌ ≠", a: [7], tr: "ödül ≠ ceza" }, { pre: "يَخْرُجُ ≠", a: [5], tr: "çıkar ≠ girer" }, { pre: "سَعَادَةٌ ≠", a: [6], tr: "mutluluk ≠ hüzün" }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · ÇOĞUL VE SORU
{
  id: "u4", no: 4, ar: "الجَمْعُ وَالسُّؤَالُ", tr: "Çoğul ve Soru Kurma", short: "Çoğul · soru", col: "ref", legend: ["mz", "mi"],
  goals: ["Kelimelerin çoğulunu yazmak", "Cevaba uygun soruyu sormak", "Soru kelimelerini doğru seçmek: مَتَى، مَاذَا، لِمَاذَا، بِمَ، كَيْفَ، كَمْ"],
  examples: [
    { s: "عِيدٌ:mz.Tekil / ← أَعْيَادٌ:nasb.Çoğul", tr: "bayram → bayramlar", pair: "مَتَى:mi.Soru / يَأْتِي عِيدُ الفِطْرِ؟:-", pairTr: "Ramazan Bayramı ne zaman gelir?" }
  ],
  rules: [
    { tr: "<b>Çoğullar (7. etkinlik):</b> <span class=\"ar\">طَاعَةٌ ← طَاعَاتٌ · لِبَاسٌ ← أَلْبِسَةٌ · عِيدٌ ← أَعْيَادٌ · مُتَنَزَّهٌ ← مُتَنَزَّهَاتٌ · احْتِفَالٌ ← احْتِفَالَاتٌ · مُكَافَأَةٌ ← مُكَافَآتٌ · قَرِيبٌ ← أَقَارِبُ · عَائِلَةٌ ← عَائِلَاتٌ</span>." },
    { tr: "<b>Soru kelimeleri (8. etkinlik):</b> zaman → <span class=\"ar\">مَتَى</span> · iş, eylem → <span class=\"ar\">مَاذَا</span> · sebep, amaç → <span class=\"ar\">لِمَاذَا</span> · “neyle?” → <span class=\"ar\">بِمَ / بِمَاذَا</span> · biçim, yol → <span class=\"ar\">كَيْفَ</span> · sayı → <span class=\"ar\">كَمْ + tekil mansûb</span> (<span class=\"ar\">كَمْ عِيدًا؟</span>)." },
    { tr: "<b>Dikkat:</b> <span class=\"ar\">قَرِيبٌ</span> “akraba” anlamında çoğulu <span class=\"ar\">أَقَارِبُ / أَقْرِبَاءُ</span>’dır; “yakın” sıfatı olarak <span class=\"ar\">قَرِيبُونَ</span> de denir." }
  ],
  kaide: ["٧ ـ اكْتُبْ جَمْعَ الكَلِمَاتِ الآتِيَةِ.", "٨ ـ اكْتُبْ أَسْئِلَةً مُنَاسِبَةً لِلْأَجْوِبَةِ الآتِيَةِ."],
  ex: [
    { type: "bank", num: "٧", ar: "اكْتُبْ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Önce aşağıdan çoğulu seç, sonra kelimenin kutusuna dokun.", bank: ["أَعْيَادٌ", "طَاعَاتٌ", "مُكَافَآتٌ", "أَلْبِسَةٌ", "أَقَارِبُ", "مُتَنَزَّهَاتٌ", "عَائِلَاتٌ", "احْتِفَالَاتٌ"], items: [
      { pre: "طَاعَةٌ ←", a: [1], tr: "itaat, ibadet" }, { pre: "لِبَاسٌ ←", a: [3], tr: "elbise" }, { pre: "عِيدٌ ←", a: [0], tr: "bayram" }, { pre: "مُتَنَزَّهٌ ←", a: [5], tr: "park, mesire yeri" }, { pre: "احْتِفَالٌ ←", a: [7], tr: "kutlama" }, { pre: "مُكَافَأَةٌ ←", a: [2], tr: "ödül" }, { pre: "قَرِيبٌ ←", a: [4], tr: "akraba" }, { pre: "عَائِلَةٌ ←", a: [6], tr: "aile" }
    ]},
    { type: "pick", fill: true, num: "٨", ar: "اكْتُبْ أَسْئِلَةً مُنَاسِبَةً لِلْأَجْوِبَةِ الآتِيَةِ", tr: "Cevaba uyan soruyu seç.", items: PL([
      ["___ — يَأْتِي عِيدُ الفِطْرِ بَعْدَ شَهْرِ رَمَضَانَ.", "مَتَى يَأْتِي عِيدُ الفِطْرِ؟", "مَاذَا يَأْتِي بَعْدَ العِيدِ؟", "كَمْ عِيدًا عِنْدَكُمْ؟", "Ramazan Bayramı ne zaman gelir?", "Zaman → مَتَى"],
      ["___ — نَشْتَرِي المَلَابِسَ الجَدِيدَةَ وَنُجَهِّزُ الحَلَوِيَّاتِ.", "مَاذَا تَفْعَلُونَ قَبْلَ العِيدِ؟", "مَتَى تَشْتَرُونَ؟", "كَمْ ثَوْبًا تَشْتَرُونَ؟", "Bayramdan önce ne yaparsınız?", "Eylem → مَاذَا"],
      ["___ — يَسْتَيْقِظُ عَلِيٌّ مُبَكِّرًا لِيُصَلِّيَ صَلَاةَ الفَجْرِ.", "لِمَاذَا يَسْتَيْقِظُ عَلِيٌّ مُبَكِّرًا؟", "مَتَى يُصَلِّي عَلِيٌّ؟", "أَيْنَ يَنَامُ عَلِيٌّ؟", "Ali neden erken kalkar?", "Amaç (لِـ) → لِمَاذَا"],
      ["___ — يَكُونُ الكَعْكُ مَحْشُوًّا بِالفُسْتُقِ أَوِ الجَوْزِ.", "بِمَ يَكُونُ الكَعْكُ مَحْشُوًّا؟", "مَتَى يَكُونُ الكَعْكُ؟", "كَمْ كَعْكًا عِنْدَكَ؟", "Çörek neyle doldurulur?", "بِـ + مَا → بِمَ"],
      ["___ — يَسْتَعِدُّ المُسْلِمُونَ لِلْعِيدِ بِصُنْعِ الحَلَوِيَّاتِ.", "كَيْفَ يَسْتَعِدُّ المُسْلِمُونَ لِلْعِيدِ؟", "مَنْ يَسْتَعِدُّ لِلْعِيدِ؟", "مَتَى العِيدُ؟", "Müslümanlar bayrama nasıl hazırlanır?", "Yol, biçim → كَيْفَ"],
      ["___ — عِيدَانِ: عِيدُ الفِطْرِ وَعِيدُ الأَضْحَى.", "كَمْ عِيدًا عِنْدَ المُسْلِمِينَ؟", "كَمْ عِيدٌ عِنْدَ المُسْلِمِينَ؟", "مَتَى عِيدُ المُسْلِمِينَ؟", "Müslümanların kaç bayramı var?", "كَمْ + tekil mansûb: عِيدًا"]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اخْتَرْ أَدَاةَ الاسْتِفْهَامِ المُنَاسِبَةَ", tr: "Uygun soru kelimesini seç.", items: PL([
      ["___ تَذْهَبُ إِلَى صَلَاةِ العِيدِ؟ — أَذْهَبُ مَعَ أَبِي.", "مَعَ مَنْ", "مَتَى", "كَمْ", "Bayram namazına kiminle gidersin? Babamla.", ""],
      ["___ تَبْدَأُ صَلَاةُ العِيدِ؟ — بَعْدَ شُرُوقِ الشَّمْسِ.", "مَتَى", "أَيْنَ", "مَاذَا", "Bayram namazı ne zaman başlar?", ""],
      ["___ تُصَلُّونَ صَلَاةَ العِيدِ؟ — فِي المَسْجِدِ الكَبِيرِ.", "أَيْنَ", "كَيْفَ", "لِمَاذَا", "Bayram namazını nerede kılarsınız?", ""],
      ["___ يَوْمًا عِيدُ الأَضْحَى؟ — أَرْبَعَةُ أَيَّامٍ.", "كَمْ", "مَتَى", "مَا", "Kurban Bayramı kaç gündür? Dört gün.", "كَمْ يَوْمًا"]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · CÜMLE VE KALIPLAR
{
  id: "u5", no: 5, ar: "تَرْتِيبُ الجُمَلِ وَالتَّرَاكِيبُ", tr: "Cümle Dizme ve Kalıplar", short: "Kalıplar", col: "muz", legend: ["mi", "ref", "cerr"],
  goals: ["Karışık kelimelerden anlamlı cümle kurmak", "Bayramda söylenen ve yapılan şeylerden uygun olmayanı bulmak (10. etkinlik)", "قَرَّرَ أَنْ + mansûb ve لِـ + mansûb kalıplarını kullanmak"],
  examples: [
    { s: "قَرَّرْتُ:ref / أَنْ أَسْتَيْقِظَ:mi.أَنْ + mansûb / قَبْلَ الفَجْرِ:-", tr: "Şafaktan önce kalkmaya karar verdim." },
    { s: "بَقِينَا فِي المَسْجِدِ:- / لِنُكَبِّرَ وَنُصَلِّيَ:cerr.لِـ + mansûb", tr: "Tekbir getirmek ve namaz kılmak için camide kaldık.", pair: "كُلَّ عَامٍ وَأَنْتُمْ بِخَيْرٍ:mi.Tebrik", pairTr: "Nice yıllara (her yıl hayırla olun)." }
  ],
  rules: [
    { tr: "<b>قَرَّرَ أَنْ + muzâri mansûb</b> “…meye karar verdi”: <span class=\"ar\">قَرَّرْتُ أَنْ أَسْتَيْقِظَ</span>. Mastarla da söylenir: <span class=\"ar\">قَرَّرْتُ الذَّهَابَ</span> = <span class=\"ar\">قَرَّرْتُ أَنْ أَذْهَبَ</span>." },
    { tr: "<b>لِـ + muzâri mansûb</b> “…mek için”: <span class=\"ar\">لِأَغْتَسِلَ، لِنُكَبِّرَ، لِنُهَنِّئَ</span>. Mansûb fiilin sonu üstünlü olur; <span class=\"ar\">هُمْ</span> için <span class=\"ar\">ـُوا</span> (nûn düşer): <span class=\"ar\">لِيُصَلُّوا</span>. Aynı cümlede <span class=\"ar\">وَ</span> ile bağlanan fiiller de mansûb kalır: <span class=\"ar\">لِأَغْتَسِلَ وَأَرْتَدِيَ وَأَتَوَجَّهَ</span>." },
    { tr: "<b>Bayram tebrikleri (10. etkinlik):</b> <span class=\"ar\">كُلَّ عَامٍ وَأَنْتُمْ بِخَيْرٍ · عِيدٌ سَعِيدٌ · عِيدٌ مُبَارَكٌ · تَقَبَّلَ اللهُ طَاعَاتِكُمْ</span>. <span class=\"ar\">مُبَارَكٌ الثِّيَابُ</span> bayram tebriki değildir (yeni elbise alana “güle güle giy” anlamında <span class=\"ar\">مُبَارَكٌ الثَّوْبُ الجَدِيدُ</span> denebilir). Bayramda <span class=\"ar\">يَرْقُصُونَ وَيُغَنُّونَ</span> metinde geçmez; kitap bunu yanlış seçenek olarak verir." },
    { tr: "<b>Cümle dizme (9. etkinlik):</b> <span class=\"ar\">تَسْتَعِدُّ الأُسْرَةُ المُسْلِمَةُ قَبْلَ الأَعْيَادِ · يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ فِي تَرْتِيبِ البَيْتِ · يُكَبِّرُ المُسْلِمُونَ صَبَاحَ يَوْمِ العِيدِ · أَرْتَدِي مَلَابِسِيَ الجَدِيدَةَ فِي العِيدِ</span>." }
  ],
  kaide: ["٩ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً.", "١٠ ـ ارْسُمْ دَائِرَةً حَوْلَ الإِجَابَةِ الخَاطِئَةِ: ١. عِنْدَمَا يَخْرُجُ النَّاسُ مِنْ صَلَاةِ العِيدِ يَتَبَادَلُونَ التَّهَانِيَ وَيَقُولُونَ لِبَعْضِهِمْ… ٢. يَقُومُ النَّاسُ فِي العِيدِ بِأَعْمَالٍ كَثِيرَةٍ…"],
  ex: [
    { type: "pick", num: "٩", ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Karışık kelimelerden kurulan doğru cümleyi seç.", items: PL([
      ["قَبْلَ، المُسْلِمَةُ، تَسْتَعِدُّ، الأُسْرَةُ، الأَعْيَادِ", "تَسْتَعِدُّ الأُسْرَةُ المُسْلِمَةُ قَبْلَ الأَعْيَادِ.", "تَسْتَعِدُّ الأَعْيَادُ قَبْلَ الأُسْرَةِ المُسْلِمَةِ.", "المُسْلِمَةُ قَبْلَ تَسْتَعِدُّ الأُسْرَةُ الأَعْيَادِ.", "Müslüman aile bayramlardan önce hazırlanır.", "Fiil + fâil + sıfat + zarf."],
      ["فِي، الأُسْرَةِ، البَيْتِ، تَرْتِيبِ، يَتَعَاوَنُ، أَفْرَادُ", "يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ فِي تَرْتِيبِ البَيْتِ.", "يَتَعَاوَنُ البَيْتُ فِي تَرْتِيبِ أَفْرَادِ الأُسْرَةِ.", "فِي أَفْرَادُ يَتَعَاوَنُ الأُسْرَةِ تَرْتِيبِ البَيْتِ.", "Aile fertleri evi düzenlemede yardımlaşır.", "İzafet: أَفْرَادُ الأُسْرَةِ."],
      ["يَوْمِ، المُسْلِمُونَ، صَبَاحَ، يُكَبِّرُ، العِيدِ", "يُكَبِّرُ المُسْلِمُونَ صَبَاحَ يَوْمِ العِيدِ.", "يُكَبِّرُونَ المُسْلِمُونَ صَبَاحَ يَوْمِ العِيدِ.", "صَبَاحُ المُسْلِمِينَ يُكَبِّرُ يَوْمَ العِيدِ.", "Müslümanlar bayram sabahı tekbir getirir.", "Fiil başta → tekil kalır: يُكَبِّرُ المُسْلِمُونَ."],
      ["الجَدِيدَةَ، مَلَابِسِي، فِي، أَرْتَدِي، العِيدِ", "أَرْتَدِي مَلَابِسِيَ الجَدِيدَةَ فِي العِيدِ.", "أَرْتَدِي العِيدَ فِي مَلَابِسِي الجَدِيدَةِ.", "الجَدِيدَةَ أَرْتَدِي فِي مَلَابِسِي العِيدِ.", "Bayramda yeni elbiselerimi giyerim.", ""]
    ])},
    { type: "classify", num: "١٠", opts: UYGUN, ar: "ارْسُمْ دَائِرَةً حَوْلَ الإِجَابَةِ الخَاطِئَةِ", tr: "Uygun olmayanı (✗) bul. 1) Namazdan çıkınca birbirlerine ne derler? 2) Bayramda ne yaparlar?", items: CL([
      ["١ · كُلَّ عَامٍ وَأَنْتُمْ بِخَيْرٍ.", "u", "Her yıl hayırla olun."], ["١ · عِيدٌ سَعِيدٌ.", "u", "Mutlu bayramlar."], ["١ · عِيدٌ مُبَارَكٌ.", "u", "Bayramınız mübarek olsun."], ["١ · تَقَبَّلَ اللهُ طَاعَاتِكُمْ.", "u", "Allah ibadetlerinizi kabul etsin."], ["١ · مُبَارَكٌ الثِّيَابُ.", "g", "Bayram tebriki değildir."],
      ["٢ · يُعْطُونَ الفُقَرَاءَ المَالَ.", "u", "Fakirlere para verirler."], ["٢ · يَزُورُونَ أَقَارِبَهُمْ.", "u", "Akrabalarını ziyaret ederler."], ["٢ · يُوَزِّعُونَ الهَدَايَا.", "u", "Hediye dağıtırlar."], ["٢ · يَرْقُصُونَ وَيُغَنُّونَ.", "g", "Kitabın yanlış kabul ettiği seçenek."], ["٢ · يَأْخُذُونَ أَوْلَادَهُمْ إِلَى حَدِيقَةِ الأَلْعَابِ.", "u", "Çocuklarını lunaparka götürürler."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "أَنْ / لِـ + المُضَارِعُ المَنْصُوبُ", tr: "Boşluğa uygun mansûb fiili seç.", items: PL([
      ["قَرَّرْتُ أَنْ ___ قَبْلَ الفَجْرِ.", "أَسْتَيْقِظَ", "أَسْتَيْقِظُ", "اسْتَيْقَظْتُ", "Şafaktan önce kalkmaya karar verdim.", "أَنْ + mansûb (ـَ)"],
      ["قَرَّرْنَا أَنْ ___ الأَصْدِقَاءَ.", "نَزُورَ", "نَزُورُ", "زُرْنَا", "Arkadaşları ziyaret etmeye karar verdik.", "نَحْنُ → نَـ…ـَ"],
      ["بَقِينَا فِي المَسْجِدِ لِـ___ صَلَاةَ العِيدِ.", "نُصَلِّيَ", "نُصَلِّي", "صَلَّيْنَا", "Bayram namazını kılmak için camide kaldık.", "لِـ + mansûb: نُصَلِّيَ"],
      ["خَرَجَ النَّاسُ لِـ___ العِيدَ.", "يُصَلُّوا", "يُصَلُّونَ", "صَلَّوْا", "İnsanlar bayram namazını kılmak için çıktılar.", "هُمْ + mansûb: nûn düşer."],
      ["قَرَّرَتْ أُمِّي أَنْ ___ الكَعْكَ.", "تُجَهِّزَ", "يُجَهِّزَ", "تُجَهِّزُ", "Annem çöreği hazırlamaya karar verdi.", "هِيَ → تُـ…ـَ"],
      ["رَجَعْنَا إِلَى بُيُوتِنَا لِـ___ عَائِلَاتِنَا.", "نُهَنِّئَ", "نُهَنِّئُ", "هَنَّأْنَا", "Ailelerimizi tebrik etmek için evlerimize döndük.", "لِنُهَنِّئَ"]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["يَحْتَفِلُ المُسْلِمُونَ كُلَّ عَامٍ {بِعِيدَيْنِ}.", ["بِعِيدَيْنِ", "بِعِيدٍ", "بِأَعْيَادٍ"], "metin", "İki bayram.", "u1"],
  ["عِيدُ الفِطْرِ {مُكَافَأَةٌ} لِلصَّائِمِينَ.", ["مُكَافَأَةٌ", "عُقُوبَةٌ", "فَرِيضَةٌ"], "metin", "Oruç tutanlara ödül.", "u1"],
  ["عِيدُ الأَضْحَى يَأْتِي بَعْدَ أَدَاءِ فَرِيضَةِ {الحَجِّ}.", ["الحَجِّ", "الصِّيَامِ", "الزَّكَاةِ"], "metin", "Hacdan sonra.", "u1"],
  ["قَبْلَ العِيدِ {بِلَيْلَةٍ} يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ.", ["بِلَيْلَةٍ", "بِشَهْرٍ", "بِسَنَةٍ"], "metin", "Bir gece önce.", "u1"],
  ["كَالبَقْلَاوَةِ عِنْدَ {الأَتْرَاكِ}.", ["الأَتْرَاكِ", "العَرَبِ", "الفُرْسِ"], "metin", "Türklerde baklava.", "u1"],
  ["يَكُونُ الكَعْكُ {مَحْشُوًّا} بِالتَّمْرِ.", ["مَحْشُوًّا", "مَشْوِيًّا", "مَكْسُورًا"], "metin", "Hurmayla doldurulmuş.", "u1"],
  ["يَخْرُجُونَ إِلَى صَلَاةِ العِيدِ وَهُمْ {يُكَبِّرُونَ}.", ["يُكَبِّرُونَ", "يَنَامُونَ", "يَبِيعُونَ"], "anlama", "Tekbir getirerek.", "u2"],
  ["يَعُودُونَ إِلَى بُيُوتِهِمْ {لِلْمُعَايَدَةِ}.", ["لِلْمُعَايَدَةِ", "لِلنَّوْمِ", "لِلدِّرَاسَةِ"], "anlama", "Bayramlaşmak için.", "u2"],
  ["يَوْمُ العِيدِ يَوْمُ سَعَادَةٍ وَ{سُرُورٍ}.", ["سُرُورٍ", "حُزْنٍ", "تَعَبٍ"], "anlama", "Mutluluk ve sevinç.", "u2"],
  ["يَفْرَحُ {الأَطْفَالُ} بِيَوْمِ العِيدِ.", ["الأَطْفَالُ", "المَلَابِسُ", "بِخَيْرٍ"], "boşluk", "Çocuklar sevinir.", "u3"],
  ["وَ{يَرْكَبُونَ} الأَرَاجِيحَ.", ["يَرْكَبُونَ", "يَشْتَرُونَ", "يَلْبَسُونَ"], "boşluk", "Salıncaklara binerler.", "u3"],
  ["كُلَّ عَامٍ وَأَنْتُمْ {بِخَيْرٍ}.", ["بِخَيْرٍ", "بَعْضُهُمْ", "سَعِيدٌ"], "boşluk", "Nice yıllara.", "u3"],
  ["يَلْبَسُ = {يَرْتَدِي}.", ["يَرْتَدِي", "يَخْلَعُ", "يَبِيعُ"], "eş anlam", "giyer", "u3"],
  ["السَّعَادَةُ = {السُّرُورُ}.", ["السُّرُورُ", "الحُزْنُ", "العِيدُ"], "eş anlam", "mutluluk = sevinç", "u3"],
  ["صَامَ ≠ {أَفْطَرَ}.", ["أَفْطَرَ", "أَطَاعَ", "صَلَّى"], "zıt", "oruç tuttu ≠ iftar etti", "u3"],
  ["مُكَافَأَةٌ ≠ {عُقُوبَةٌ}.", ["عُقُوبَةٌ", "هَدِيَّةٌ", "طَاعَةٌ"], "zıt", "ödül ≠ ceza", "u3"],
  ["عِيدٌ ← {أَعْيَادٌ}.", ["أَعْيَادٌ", "عِيدَاتٌ", "عُيُودٌ"], "çoğul", "bayram → bayramlar", "u4"],
  ["قَرِيبٌ ← {أَقَارِبُ}.", ["أَقَارِبُ", "قُرُوبٌ", "قَرِيبَاتٌ"], "çoğul", "akraba → akrabalar", "u4"],
  ["{كَمْ} عِيدًا عِنْدَ المُسْلِمِينَ؟", ["كَمْ", "مَتَى", "كَيْفَ"], "soru", "Kaç bayram?", "u4"],
  ["{لِمَاذَا} يَسْتَيْقِظُ عَلِيٌّ مُبَكِّرًا؟", ["لِمَاذَا", "كَمْ", "أَيْنَ"], "soru", "Neden erken kalkar?", "u4"],
  ["قَرَّرْتُ أَنْ {أَسْتَيْقِظَ} قَبْلَ الفَجْرِ.", ["أَسْتَيْقِظَ", "أَسْتَيْقِظُ", "اسْتَيْقَظْتُ"], "kalıp", "Kalkmaya karar verdim.", "u5"],
  ["بَقِينَا فِي المَسْجِدِ لِ{نُكَبِّرَ}.", ["نُكَبِّرَ", "نُكَبِّرُ", "كَبَّرْنَا"], "kalıp", "Tekbir getirmek için.", "u5"],
  ["عِيدٌ {مُبَارَكٌ}.", ["مُبَارَكٌ", "مُبَارَكَةٌ", "بَارِكٌ"], "tebrik", "Bayramınız mübarek olsun.", "u5"],
  ["تَقَبَّلَ اللهُ {طَاعَاتِكُمْ}.", ["طَاعَاتِكُمْ", "ثِيَابَكُمْ", "أَلْعَابَكُمْ"], "tebrik", "Allah ibadetlerinizi kabul etsin.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["يَأْتِي عِيدُ الفِطْرِ بَعْدَ الحَجِّ ← metne göre düzelt", "يَأْتِي عِيدُ الفِطْرِ بَعْدَ صِيَامِ رَمَضَانَ", "يَأْتِي عِيدُ الفِطْرِ قَبْلَ رَمَضَانَ", "لَا يَأْتِي عِيدُ الفِطْرِ", "Ramazan orucundan sonra.", "u1"],
  ["قَبْلَ العِيدِ بِأُسْبُوعٍ يَتَعَاوَنُونَ ← düzelt", "قَبْلَ العِيدِ بِلَيْلَةٍ يَتَعَاوَنُونَ", "بَعْدَ العِيدِ بِلَيْلَةٍ يَتَعَاوَنُونَ", "لَا يَتَعَاوَنُونَ أَبَدًا", "Bir gece önce.", "u2"],
  ["يَعُودُونَ لِتَنَاوُلِ الطَّعَامِ ← düzelt", "يَعُودُونَ لِلْمُعَايَدَةِ وَاسْتِقْبَالِ الضُّيُوفِ", "يَعُودُونَ لِلنَّوْمِ", "لَا يَعُودُونَ إِلَى بُيُوتِهِمْ", "Bayramlaşmak için.", "u2"],
  ["المُعَايَدَةُ ← eş anlam", "تَهْنِئَةٌ", "عِبَادَةٌ", "عَادَةٌ", "bayramlaşma = tebrik", "u3"],
  ["يَعُودُ ← eş anlam", "يَرْجِعُ", "يَخْرُجُ", "يَزُورُ", "döner", "u3"],
  ["ارْتَدَى ← zıt anlam", "خَلَعَ", "لَبِسَ", "اشْتَرَى", "giydi ≠ çıkardı", "u3"],
  ["وَدَّعَ ← zıt anlam", "اسْتَقْبَلَ", "سَافَرَ", "هَنَّأَ", "uğurladı ≠ karşıladı", "u3"],
  ["لِبَاسٌ ← çoğul", "أَلْبِسَةٌ", "لُبُوسٌ", "لِبَاسَاتٌ", "elbise → elbiseler", "u4"],
  ["مُكَافَأَةٌ ← çoğul", "مُكَافَآتٌ", "مَكَافِئُ", "كُفُوءٌ", "ödül → ödüller", "u4"],
  ["يَأْتِي العِيدُ بَعْدَ رَمَضَانَ ← soru", "مَتَى يَأْتِي العِيدُ؟", "كَمْ يَأْتِي العِيدُ؟", "مَاذَا يَأْتِي العِيدُ؟", "Zaman → مَتَى", "u4"],
  ["أَسْتَيْقِظُ ← قَرَّرْتُ أَنْ…", "قَرَّرْتُ أَنْ أَسْتَيْقِظَ", "قَرَّرْتُ أَنْ أَسْتَيْقِظُ", "قَرَّرْتُ أَنِ اسْتَيْقَظْتُ", "أَنْ + mansûb", "u5"],
  ["نُصَلِّي ← لِـ ile", "لِنُصَلِّيَ", "لِنُصَلِّي", "لِصَلَّيْنَا", "لِـ + mansûb", "u5"],
  ["يَزُورُونَ ← أَنْ ile", "أَنْ يَزُورُوا", "أَنْ يَزُورُونَ", "أَنْ زَارُوا", "هُمْ + mansûb: nûn düşer.", "u5"],
  ["قَرَّرْتُ أَنْ أَذْهَبَ ← mastarla", "قَرَّرْتُ الذَّهَابَ", "قَرَّرْتُ الذَّاهِبَ", "قَرَّرْتُ ذَهَبْتُ", "أَنْ أَذْهَبَ = الذَّهَابَ", "u5"]
];
// Ramazan mı, Kurban mı, ikisi mi? hız oyunu
var NOUN_LIST = [
  ["يَأْتِي بَعْدَ صِيَامِ رَمَضَانَ 🌙", "f", "عِيدُ الفِطْرِ"], ["مُكَافَأَةٌ لِلصَّائِمِينَ", "f", "عِيدُ الفِطْرِ"], ["أَوَّلُ يَوْمٍ مِنْ شَوَّالٍ", "f", "1 Şevval"], ["زَكَاةُ الفِطْرِ قَبْلَ صَلَاتِهِ", "f", "Fıtır sadakası"], ["يُسَمِّيهِ الأَتْرَاكُ «عِيدَ الحَلْوَى» 🍬", "f", "Şeker Bayramı"],
  ["يَأْتِي بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ 🕋", "a", "عِيدُ الأَضْحَى"], ["ذَبْحُ الأُضْحِيَةِ 🐑", "a", "Kurban kesmek"], ["العَاشِرُ مِنْ ذِي الحِجَّةِ", "a", "10 Zilhicce"], ["يَأْتِي بَعْدَ يَوْمِ عَرَفَةَ", "a", "Arefe’den sonra"], ["يُسَمِّيهِ الأَتْرَاكُ «عِيدَ القُرْبَانِ»", "a", "Kurban Bayramı"],
  ["صَلَاةُ العِيدِ 🕌", "k", "İkisinde de"], ["التَّكْبِيرُ: اللهُ أَكْبَرُ", "k", "İkisinde de"], ["المَلَابِسُ الجَدِيدَةُ 👕", "k", "İkisinde de"], ["تَبَادُلُ الزِّيَارَاتِ وَالتَّهَانِي", "k", "İkisinde de"], ["كُلَّ عَامٍ وَأَنْتُمْ بِخَيْرٍ", "k", "İkisinde de"]
];
var SP_M = BAYRAM;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; }).concat(UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; }));
var HAFIZA = {
  es: { name: "Kelime ↔ eş anlamlısı", pairs: [["تُجَهِّزُ", "تُعِدُّ"], ["نَتَسَاعَدُ", "نَتَعَاوَنُ"], ["المَلَابِسُ", "الثِّيَابُ"], ["المُعَايَدَةُ", "التَّهْنِئَةُ"], ["يَعُودُ", "يَرْجِعُ"], ["السَّعَادَةُ", "السُّرُورُ"], ["يَلْبَسُ", "يَرْتَدِي"]] },
  zd: { name: "Kelime ↔ zıt anlamlısı", pairs: [["وَدَّعَ", "اسْتَقْبَلَ"], ["يَشْتَرِي", "يَبِيعُ"], ["صَامَ", "أَفْطَرَ"], ["ارْتَدَى", "خَلَعَ"], ["أَطَاعَ", "عَصَى"], ["مُكَافَأَةٌ", "عُقُوبَةٌ"], ["يَخْرُجُ", "يَدْخُلُ"], ["سَعَادَةٌ", "حُزْنٌ"]] },
  cm: { name: "Tekil ↔ çoğul", pairs: [["طَاعَةٌ", "طَاعَاتٌ"], ["لِبَاسٌ", "أَلْبِسَةٌ"], ["عِيدٌ", "أَعْيَادٌ"], ["مُتَنَزَّهٌ", "مُتَنَزَّهَاتٌ"], ["احْتِفَالٌ", "احْتِفَالَاتٌ"], ["مُكَافَأَةٌ", "مُكَافَآتٌ"], ["قَرِيبٌ", "أَقَارِبُ"], ["عَائِلَةٌ", "عَائِلَاتٌ"]] }
};
var KARTLAR = [
  ["Müslümanların bayramları?", "عِيدُ الفِطْرِ · عِيدُ الأَضْحَى"],
  ["Ramazan Bayramı ne zaman, neden?", "بَعْدَ صِيَامِ رَمَضَانَ · مُكَافَأَةٌ لِلصَّائِمِينَ لِأَنَّهُمْ صَامُوا وَأَطَاعُوا رَبَّهُمْ"],
  ["Kurban Bayramı ne zaman?", "بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ"],
  ["Bayramdan bir gece önce?", "تَرْتِيبُ البَيْتِ · تَجْهِيزُ الثِّيَابِ · شِرَاءُ الحَلَوِيَّاتِ"],
  ["Bayram tatlıları?", "البَقْلَاوَةُ عِنْدَ الأَتْرَاكِ · كَعْكُ العِيدِ عِنْدَ العَرَبِ (بِالتَّمْرِ أَوِ الفُسْتُقِ أَوِ الجَوْزِ)"],
  ["Bayram sabahı?", "يَخْرُجُونَ صِغَارًا وَكِبَارًا بِالمَلَابِسِ الجَدِيدَةِ وَهُمْ يُكَبِّرُونَ"],
  ["Namazdan sonra?", "المُعَايَدَةُ · اسْتِقْبَالُ الضُّيُوفِ · تَبَادُلُ الزِّيَارَاتِ وَالتَّهَانِي"],
  ["Bayram tebrikleri?", "كُلَّ عَامٍ وَأَنْتُمْ بِخَيْرٍ · عِيدٌ سَعِيدٌ · عِيدٌ مُبَارَكٌ · تَقَبَّلَ اللهُ طَاعَاتِكُمْ"],
  ["Eş anlamlar?", "يَلْبَسُ = يَرْتَدِي · يَعُودُ = يَرْجِعُ · السَّعَادَةُ = السُّرُورُ · المَلَابِسُ = الثِّيَابُ"],
  ["Zıt anlamlar?", "صَامَ ≠ أَفْطَرَ · أَطَاعَ ≠ عَصَى · وَدَّعَ ≠ اسْتَقْبَلَ · مُكَافَأَةٌ ≠ عُقُوبَةٌ"],
  ["Çoğullar?", "أَعْيَادٌ · أَلْبِسَةٌ · طَاعَاتٌ · مُكَافَآتٌ · أَقَارِبُ · عَائِلَاتٌ"],
  ["Kalıplar?", "قَرَّرْتُ أَنْ أَسْتَيْقِظَ · لِأَغْتَسِلَ · لِنُكَبِّرَ · لِأَنَّ يَوْمَ العِيدِ يَوْمُ سُرُورٍ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat17";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("عِيدٌ", "i", "bayram", "أَعْيَادٌ", "efal", "", "", "يَحْتَفِلُ المُسْلِمُونَ كُلَّ عَامٍ بِعِيدَيْنِ.", "بِعِيدَيْنِ", "Müslümanlar her yıl iki bayram kutlar."),
  KW("احْتَفَلَ", "f", "kutladı (بِـ)", "", "", "", "", "يَحْتَفِلُ المُسْلِمُونَ كُلَّ عَامٍ بِعِيدَيْنِ.", "يَحْتَفِلُ", "Müslümanlar her yıl iki bayram kutlar."),
  KW("احْتِفَالٌ", "i", "kutlama", "احْتِفَالَاتٌ", "at", "", "", "شِرَاءُ الحَلَوِيَّاتِ مِنْ مَظَاهِرِ الاحْتِفَالِ بِالعِيدِ.", "الاحْتِفَالِ", "Tatlı almak bayram kutlamasının görünümlerindendir."),
  KW("مُكَافَأَةٌ", "i", "ödül", "مُكَافَآتٌ", "at", "جَائِزَةٌ", "عُقُوبَةٌ", "وَهُوَ مُكَافَأَةٌ لِلصَّائِمِينَ.", "مُكَافَأَةٌ", "O, oruç tutanlara bir ödüldür."),
  KW("صَائِمٌ", "s", "oruçlu", "صَائِمُونَ", "un", "", "مُفْطِرٌ", "وَهُوَ مُكَافَأَةٌ لِلصَّائِمِينَ.", "لِلصَّائِمِينَ", "Oruç tutanlara bir ödüldür."),
  KW("صَامَ", "f", "oruç tuttu", "", "", "", "أَفْطَرَ", "لِأَنَّهُمْ صَامُوا شَهْرَ رَمَضَانَ.", "صَامُوا", "Çünkü ramazan ayında oruç tuttular."),
  KW("أَطَاعَ", "f", "itaat etti", "", "", "", "عَصَى", "لِأَنَّهُمْ صَامُوا شَهْرَ رَمَضَانَ وَأَطَاعُوا رَبَّهُمْ.", "وَأَطَاعُوا", "Oruç tuttular ve Rablerine itaat ettiler."),
  KW("طَاعَةٌ", "i", "itaat, ibadet", "طَاعَاتٌ", "at", "عِبَادَةٌ", "مَعْصِيَةٌ", "تَقَبَّلَ اللهُ طَاعَاتِكُمْ.", "طَاعَاتِكُمْ", "Allah ibadetlerinizi kabul etsin."),
  KW("فَرِيضَةٌ", "i", "farz", "فَرَائِضُ", "feail", "", "", "يَأْتِي بَعْدَ أَدَاءِ فَرِيضَةِ الحَجِّ.", "فَرِيضَةِ", "Hac farzını yerine getirdikten sonra gelir."),
  KW("تَعَاوَنَ", "f", "yardımlaştı", "", "", "تَسَاعَدَ", "", "يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ فِي تَرْتِيبِ البَيْتِ.", "يَتَعَاوَنُ", "Aile fertleri evi düzenlemede yardımlaşır."),
  KW("فَرْدٌ", "i", "fert, kişi", "أَفْرَادٌ", "efal", "", "", "يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ.", "أَفْرَادُ", "Aile fertleri yardımlaşır."),
  KW("أُسْرَةٌ", "i", "aile", "أُسَرٌ", "fual", "عَائِلَةٌ", "", "يَتَعَاوَنُ أَفْرَادُ الأُسْرَةِ.", "الأُسْرَةِ", "Aile fertleri yardımlaşır."),
  KW("جَهَّزَ", "f", "hazırladı", "", "", "أَعَدَّ", "", "تُجَهِّزُ أُمِّي حَلْوَى العِيدِ قَبْلَ يَوْمَيْنِ.", "تُجَهِّزُ", "Annem bayram tatlısını iki gün önce hazırlar."),
  KW("ثَوْبٌ", "i", "elbise", "ثِيَابٌ", "fial", "لِبَاسٌ", "", "وَتَجْهِيزِ الثِّيَابِ وَشِرَاءِ الحَلَوِيَّاتِ.", "الثِّيَابِ", "Elbiseleri hazırlamak ve tatlı almak."),
  KW("لِبَاسٌ", "i", "elbise, giysi", "أَلْبِسَةٌ", "efile", "ثَوْبٌ", "", "يَلْبَسُ الأَطْفَالُ أَجْمَلَ الأَلْبِسَةِ.", "الأَلْبِسَةِ", "Çocuklar en güzel elbiseleri giyer."),
  KW("حَلْوَى", "i", "tatlı", "حَلَوِيَّاتٌ", "at", "", "", "وَشِرَاءِ الحَلَوِيَّاتِ، كَالبَقْلَاوَةِ.", "الحَلَوِيَّاتِ", "Baklava gibi tatlılar almak."),
  KW("مَحْشُوٌّ", "s", "doldurulmuş, içli", "", "", "", "", "وَيَكُونُ الكَعْكُ مَحْشُوًّا بِالتَّمْرِ.", "مَحْشُوًّا", "Çörek hurmayla doldurulur."),
  KW("تَمْرٌ", "i", "hurma", "تُمُورٌ", "fuul", "", "", "وَيَكُونُ الكَعْكُ مَحْشُوًّا بِالتَّمْرِ.", "بِالتَّمْرِ", "Çörek hurmayla doldurulur."),
  KW("كَبَّرَ", "f", "tekbir getirdi", "", "", "", "", "يَخْرُجُونَ إِلَى صَلَاةِ العِيدِ وَهُمْ يُكَبِّرُونَ.", "يُكَبِّرُونَ", "Tekbir getirerek bayram namazına çıkarlar."),
  KW("ضَيْفٌ", "i", "misafir", "ضُيُوفٌ", "fuul", "", "مُضِيفٌ", "يَعُودُونَ لِاسْتِقْبَالِ الضُّيُوفِ.", "الضُّيُوفِ", "Misafir karşılamak için dönerler."),
  KW("اسْتَقْبَلَ", "f", "karşıladı", "", "", "", "وَدَّعَ", "يَعُودُونَ لِاسْتِقْبَالِ الضُّيُوفِ.", "لِاسْتِقْبَالِ", "Misafir karşılamak için dönerler."),
  KW("مُعَايَدَةٌ", "i", "bayramlaşma", "", "", "تَهْنِئَةٌ", "", "ثُمَّ يَعُودُونَ إِلَى بُيُوتِهِمْ لِلْمُعَايَدَةِ.", "لِلْمُعَايَدَةِ", "Sonra bayramlaşmak için evlerine dönerler."),
  KW("تَهْنِئَةٌ", "i", "tebrik", "تَهَانٍ", "diger", "مُعَايَدَةٌ", "", "وَتَبَادُلِ الزِّيَارَاتِ وَالتَّهَانِي.", "وَالتَّهَانِي", "Karşılıklı ziyaret ve tebrikleşme."),
  KW("زِيَارَةٌ", "i", "ziyaret", "زِيَارَاتٌ", "at", "", "", "وَتَبَادُلِ الزِّيَارَاتِ وَالتَّهَانِي.", "الزِّيَارَاتِ", "Karşılıklı ziyaretler ve tebrikler."),
  KW("قَرَّرَ", "f", "karar verdi", "", "", "", "", "فِي هَذَا العِيدِ قَرَّرْتُ أَنْ أَسْتَيْقِظَ قَبْلَ الفَجْرِ.", "قَرَّرْتُ", "Bu bayramda şafaktan önce kalkmaya karar verdim."),
  KW("اسْتَيْقَظَ", "f", "uyandı, kalktı", "", "", "صَحَا", "نَامَ", "قَرَّرْتُ أَنْ أَسْتَيْقِظَ قَبْلَ الفَجْرِ.", "أَسْتَيْقِظَ", "Şafaktan önce kalkmaya karar verdim."),
  KW("اغْتَسَلَ", "f", "yıkandı, gusül aldı", "", "", "", "", "قَبْلَ الفَجْرِ لِأَغْتَسِلَ وَأَرْتَدِيَ مَلَابِسِي.", "لِأَغْتَسِلَ", "Yıkanıp elbiselerimi giymek için."),
  KW("ارْتَدَى", "f", "giydi", "", "", "لَبِسَ", "خَلَعَ", "لِأَغْتَسِلَ وَأَرْتَدِيَ مَلَابِسِي الجَدِيدَةَ.", "وَأَرْتَدِيَ", "Yıkanıp yeni elbiselerimi giymek için."),
  KW("تَوَجَّهَ", "f", "yöneldi, gitti (إِلَى)", "", "", "ذَهَبَ", "", "وَأَتَوَجَّهَ بَعْدَ ذَلِكَ إِلَى أَدَاءِ صَلَاةِ الفَجْرِ.", "وَأَتَوَجَّهَ", "Sonra sabah namazını kılmaya gitmek için."),
  KW("خُطْبَةٌ", "i", "hutbe", "خُطَبٌ", "fual", "", "", "وَنُصَلِّيَ صَلَاةَ العِيدِ وَنَسْتَمِعَ إِلَى الخُطْبَةِ.", "الخُطْبَةِ", "Bayram namazını kılıp hutbeyi dinlemek için."),
  KW("هَنَّأَ", "f", "tebrik etti (بِـ)", "", "", "", "", "ثُمَّ رَجَعْنَا لِنُهَنِّئَ عَائِلَاتِنَا بِالعِيدِ.", "لِنُهَنِّئَ", "Sonra ailelerimizi tebrik etmek için döndük."),
  KW("عَائِلَةٌ", "i", "aile", "عَائِلَاتٌ", "at", "أُسْرَةٌ", "", "لِنُهَنِّئَ عَائِلَاتِنَا بِالعِيدِ.", "عَائِلَاتِنَا", "Ailelerimizi bayram için tebrik etmek için."),
  KW("قَرِيبٌ", "i", "akraba; yakın", "أَقَارِبُ", "efail", "", "بَعِيدٌ", "وَيَزُورُونَ أَقَارِبَهُمْ.", "أَقَارِبَهُمْ", "Akrabalarını ziyaret ederler."),
  KW("مُتَنَزَّهٌ", "i", "park, mesire yeri", "مُتَنَزَّهَاتٌ", "at", "حَدِيقَةٌ", "", "قَرَّرْنَا الذَّهَابَ إِلَى بَعْضِ المُتَنَزَّهَاتِ.", "المُتَنَزَّهَاتِ", "Bazı parklara gitmeye karar verdik."),
  KW("لُعْبَةٌ", "i", "oyuncak; oyun", "لُعَبٌ", "fual", "", "", "وَيَحْمِلُونَ لُعَبَهُمُ الجَمِيلَةَ.", "لُعَبَهُمُ", "Güzel oyuncaklarını taşırlar."),
  KW("سَعَادَةٌ", "i", "mutluluk", "", "", "سُرُورٌ", "حُزْنٌ", "لِأَنَّ يَوْمَ العِيدِ يَوْمُ سَعَادَةٍ وَسُرُورٍ.", "سَعَادَةٍ", "Çünkü bayram günü mutluluk ve sevinç günüdür."),
  KW("سُرُورٌ", "i", "sevinç", "", "", "فَرَحٌ", "حُزْنٌ", "لِأَنَّ يَوْمَ العِيدِ يَوْمُ سَعَادَةٍ وَسُرُورٍ.", "وَسُرُورٍ", "Çünkü bayram günü mutluluk ve sevinç günüdür.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"efal":["أَفْعَالٌ","ef’âl","أَعْيَادٌ، أَفْرَادٌ"],"at":["ـَاتٌ","cem-i müennes sâlim","احْتِفَالَاتٌ، زِيَارَاتٌ"],"un":["ـُونَ","cem-i müzekker sâlim","صَائِمُونَ، مُسْلِمُونَ"],"feail":["فَعَائِلُ","feâil","فَرَائِضُ، رَسَائِلُ"],"fual":["فُعَلٌ","fu’al","أُسَرٌ، خُطَبٌ، لُعَبٌ"],"fial":["فِعَالٌ","fiâl","ثِيَابٌ، كِبَارٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَلْبِسَةٌ، أَطْعِمَةٌ"],"fuul":["فُعُولٌ","fuûl","تُمُورٌ، ضُيُوفٌ"],"efail":["أَفَاعِلُ","efâil","أَقَارِبُ، أَصَابِعُ"],"diger":["…","başka kalıplar","تَهَانٍ"]};
