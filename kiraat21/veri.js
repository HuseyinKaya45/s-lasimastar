// ================= Kıraat 21 — العَادَاتُ الرَّمَضَانِيَّةُ =================
// Renk rolleri: mz karşılama/şehir, nasb sosyal âdet, cerr amaç/sebep, mi kalıp, ref fiil
var ROLES = {
  mz: { ar: "الاسْتِقْبَالُ", tr: "Karşılama" }, nasb: { ar: "العَادَاتُ", tr: "Âdet" }, cerr: { ar: "الغَرَضُ", tr: "Amaç" },
  mi: { ar: "التَّرْكِيبُ", tr: "Kalıp" }, ref: { ar: "الفِعْلُ", tr: "Fiil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var HARF = [["b", "bi (ile)", "بِـ", "mz"], ["i", "ilâ (-e)", "إِلَى", "nasb"], ["m", "min (-den)", "مِنْ", "ref"], ["l", "li (için)", "لِـ", "mi"], ["a", "‘an (-den)", "عَنْ", "cerr"]];
var ADET = [["r", "Ramazan âdeti", "عَادَةٌ رَمَضَانِيَّةٌ", "mz"], ["g", "Ramazan’a özgü değil", "لَيْسَتْ رَمَضَانِيَّةً", "cerr"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", b: "بِـ", i: "إِلَى", m: "مِنْ", l: "لِـ", a: "عَنْ", r: "Ramazan âdeti", g: "Ramazan’a özgü değil", e: "Eş anlam", z: "Zıt anlam" };

// Ramazan’ın üç onu (Şam atasözü)
var ONLAR = [["العَشْرُ الأُوَلُ", "لِلْمَرَقِ", "لِتَحْضِيرِ وَجَبَاتِ الطَّعَامِ", "İlk on gün çorba içindir: yemek hazırlığı.", "mz"], ["العَشْرُ الأَوْسَطُ", "لِلْخِرَقِ", "لِشِرَاءِ ثِيَابِ العِيدِ", "Orta on gün bez parçaları içindir: bayramlık alışverişi.", "nasb"], ["العَشْرُ الأَخِيرُ", "لِصَرِّ الوَرَقِ", "لِإِعْدَادِ حَلْوَى العِيدِ", "Son on gün yufka sarmak içindir: bayram tatlısı hazırlığı.", "cerr"]];

// Amaç makinesi: [ana cümle, mastar, mansûb fiil, nesne (mecrûr), nesne (mansûb), Türkçe]
var AMAC = [
  ["يَتَجَوَّلُ المُسَحِّرَاتِيُّ فِي الأَحْيَاءِ", "إِيقَاظِ", "يُوقِظَ", "الصَّائِمِينَ", "الصَّائِمِينَ", "Mesaharatî oruçluları uyandırmak için mahallelerde dolaşır."],
  ["يَسْتَيْقِظُ النَّاسُ قُبَيْلَ الفَجْرِ", "تَنَاوُلِ", "يَتَنَاوَلُوا", "طَعَامِ السَّحُورِ", "طَعَامَ السَّحُورِ", "İnsanlar sahur yemeğini yemek için fecirden az önce kalkar."],
  ["يَشْتَرِي المُسْلِمُونَ المَلَابِسَ", "اسْتِقْبَالِ", "يَسْتَقْبِلُوا", "العِيدِ", "العِيدَ", "Müslümanlar bayramı karşılamak için elbise alır."],
  ["يَدْعُو الجَارُ جِيرَانَهُ", "تَنَاوُلِ", "يَتَنَاوَلُوا", "الإِفْطَارِ مَعَهُ", "الإِفْطَارَ مَعَهُ", "Komşu, onunla iftar etsinler diye komşularını davet eder."],
  ["تُسَاعِدُ شَيْمَاءُ أُمَّهَا", "تَحْضِيرِ", "تُحَضِّرَ", "الفُطُورِ", "الفُطُورَ", "Şeyma iftar yemeğini hazırlamak için annesine yardım eder."],
  ["تَفْتَحُ المَحَلَّاتُ أَبْوَابَهَا لَيْلًا", "خِدْمَةِ", "تَخْدُمَ", "النَّاسِ", "النَّاسَ", "Dükkânlar insanlara hizmet etmek için gece kapılarını açar."]
];
var ZK = [["Mastar (لِـ)", "لِإِيقَاظِ…"], ["Fiil (لِـ)", "لِيُوقِظَ…"], ["Fiil (حَتَّى)", "حَتَّى يُوقِظَ…"]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "الصِّيَامُ رُكْنٌ مِنْ أَرْكَانِ الإِسْلَامِ، وَرَمَضَانُ هُوَ الشَّهْرُ الَّذِي أُنْزِلَ فِيهِ القُرْآنُ الكَرِيمُ، قَالَ تَعَالَى: ﴿شَهْرُ رَمَضَانَ الَّذِي أُنْزِلَ فِيهِ الْقُرْآنُ هُدًى لِلنَّاسِ وَبَيِّنَاتٍ مِنَ الْهُدَى وَالْفُرْقَانِ ۚ فَمَنْ شَهِدَ مِنْكُمُ الشَّهْرَ فَلْيَصُمْهُ ۖ وَمَنْ كَانَ مَرِيضًا أَوْ عَلَى سَفَرٍ فَعِدَّةٌ مِنْ أَيَّامٍ أُخَرَ ۗ يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ…﴾ (البقرة: ١٨٥). وَهُوَ شَهْرُ الرَّحْمَةِ وَالمَغْفِرَةِ وَالتَّوْبَةِ، لِذَلِكَ يَنْتَظِرُهُ المُسْلِمُونَ كُلَّ سَنَةٍ بِفَارِغِ الصَّبْرِ، وَلَهُ مَكَانَةٌ خَاصَّةٌ فِي قُلُوبِ المُسْلِمِينَ." +
  "<br>فِي هَذَا الشَّهْرِ المُبَارَكِ تَتَنَوَّعُ الأَطْعِمَةُ، وَتَتَزَيَّنُ المَبَانِي وَمَآذِنُ الجَوَامِعِ فِي كُلِّ المُدُنِ بِالمَصَابِيحِ، وَتَزْدَحِمُ الشَّوَارِعُ بِالنَّاسِ وَالسَّيَّارَاتِ، وَتَفْتَحُ المَحَلَّاتُ التِّجَارِيَّةُ وَالأَسْوَاقُ أَبْوَابَهَا إِلَى سَاعَاتٍ مُتَأَخِّرَةٍ مِنَ اللَّيْلِ. وَفِي شَهْرِ رَمَضَانَ تَكْثُرُ الزِّيَارَاتُ العَائِلِيَّةُ وَصِلَةُ الأَرْحَامِ وَتَبَادُلُ الزِّيَارَاتِ وَالمَأْكُولَاتِ مَعَ الجِيرَانِ، وَيَسْتَضِيفُ كُلٌّ مِنْهُمُ الآخَرَ لِتَنَاوُلِ الإِفْطَارِ عَلَى مَائِدَتِهِ." +
  "<br>وَلِلْمُدُنِ الإِسْلَامِيَّةِ عَادَاتٌ وَتَقَالِيدُ رَمَضَانِيَّةٌ مُتَشَابِهَةٌ، وَرِثُوهَا عَنْ أَجْدَادِهِمْ. وَمِنْ هَذِهِ العَادَاتِ: الاسْتِيقَاظُ عَلَى مِدْفَعِ السَّحُورِ وَالإِفْطَارُ عَلَيْهِ، وَالمُسَحِّرَاتِيُّ الَّذِي يَتَجَوَّلُ فِي الأَحْيَاءِ لِإِيقَاظِ الصَّائِمِينَ حَتَّى يَتَنَاوَلُوا طَعَامَ السَّحُورِ، إِضَافَةً إِلَى ذَلِكَ هُنَاكَ الحَلَوِيَّاتُ وَالمَشْرُوبَاتُ الخَاصَّةُ بِهَذَا الشَّهْرِ الفَضِيلِ." +
  "<br>وَفِي الأَيَّامِ الأَخِيرَةِ مِنَ الشَّهْرِ المُبَارَكِ يَبْدَأُ المُسْلِمُونَ بِشِرَاءِ المَلَابِسِ وَالحَلَوِيَّاتِ لِاسْتِقْبَالِ العِيدِ، فَهُنَاكَ مَثَلٌ مَشْهُورٌ لَدَى أَهْلِ دِمَشْقَ يَقُولُ: «العَشْرُ الأُوَلُ مِنْ رَمَضَانَ لِلْمَرَقِ» أَيْ لِتَحْضِيرِ وَجَبَاتِ الطَّعَامِ، «وَالعَشْرُ الأَوْسَطُ لِلْخِرَقِ» أَيْ لِشِرَاءِ ثِيَابِ العِيدِ، «وَالعَشْرُ الأَخِيرُ لِصَرِّ الوَرَقِ» أَيْ لِإِعْدَادِ حَلْوَى العِيدِ.";
var METIN_TR = "Oruç İslam’ın şartlarından biridir. Ramazan, Kur’an-ı Kerîm’in indirildiği aydır. Yüce Allah şöyle buyurur: “Ramazan ayı, insanlara yol gösterici, doğrunun ve doğruyu eğriden ayırmanın açık delilleri olarak Kur’an’ın indirildiği aydır. Sizden kim bu aya ulaşırsa onda oruç tutsun. Kim hasta ya da yolculukta olursa, tutamadığı günler sayısınca başka günlerde tutsun. Allah size kolaylık diler, zorluk dilemez…” (Bakara 185). Ramazan rahmet, mağfiret ve tövbe ayıdır; bu yüzden Müslümanlar onu her yıl sabırsızlıkla bekler; Müslümanların kalbinde özel bir yeri vardır." +
  "<br>Bu mübarek ayda yemekler çeşitlenir; bütün şehirlerde binalar ve cami minareleri kandillerle (ışıklarla) süslenir; sokaklar insanlarla ve arabalarla dolar; ticari dükkânlar ve çarşılar kapılarını gecenin geç saatlerine kadar açık tutar. Ramazanda aile ziyaretleri, sıla-i rahim, komşularla karşılıklı ziyaret ve yemek alışverişi çoğalır; herkes birbirini sofrasında iftara misafir eder." +
  "<br>İslam şehirlerinin atalarından miras aldıkları birbirine benzeyen ramazan âdet ve gelenekleri vardır. Bu âdetlerden bazıları: sahur topuyla uyanmak ve iftar topuyla orucu açmak; oruçluları sahur yemeği yesinler diye uyandırmak için mahallelerde dolaşan mesaharatî (davulcu). Ayrıca bu faziletli aya özgü tatlılar ve içecekler vardır." +
  "<br>Mübarek ayın son günlerinde Müslümanlar bayramı karşılamak için elbise ve tatlı almaya başlar. Şamlılar arasında meşhur bir atasözü vardır: “Ramazanın ilk on günü çorba içindir” yani yemek hazırlamak için; “ortadaki on gün bez parçaları içindir” yani bayramlık almak için; “son on gün yufka sarmak içindir” yani bayram tatlısını hazırlamak için.";
var SOZLUK = [["رُكْنٌ / أَرْكَانٌ", "şart, temel / şartlar"], ["أُنْزِلَ", "indirildi"], ["المَغْفِرَةُ", "bağışlanma"], ["بِفَارِغِ الصَّبْرِ", "sabırsızlıkla"], ["مَكَانَةٌ", "yer, değer"], ["تَتَنَوَّعُ", "çeşitlenir"], ["تَتَزَيَّنُ", "süslenir"], ["مَآذِنُ", "minareler"], ["المَصَابِيحُ", "lambalar, kandiller"], ["تَزْدَحِمُ", "kalabalıklaşır"], ["صِلَةُ الأَرْحَامِ", "akrabaları ziyaret (sıla-i rahim)"], ["يَسْتَضِيفُ", "misafir eder"], ["مَائِدَةٌ", "sofra"], ["تَقَالِيدُ", "gelenekler"], ["مُتَشَابِهَةٌ", "birbirine benzer"], ["وَرِثُوهَا عَنْ", "…den miras aldılar"], ["أَجْدَادٌ", "atalar, dedeler"], ["مِدْفَعُ السَّحُورِ", "sahur topu"], ["المُسَحِّرَاتِيُّ", "ramazan davulcusu"], ["إِيقَاظٌ", "uyandırma"], ["الفَضِيلُ", "faziletli"], ["مَثَلٌ", "atasözü"], ["لَدَى", "…de, katında"], ["المَرَقُ", "et suyu, çorba"], ["الخِرَقُ", "bez parçaları (kumaş)"], ["صَرُّ الوَرَقِ", "yufka sarmak"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendini düşünmek: Ramazan’ı nasıl karşılarsın, iftarda ne yersin, ramazanda camiye ne zaman gidersin", "Ramazan âdetlerini anlatan metni durmadan okumak ve dinlemek", "Ramazan kelimelerini öğrenmek: السَّحُورُ، الإِفْطَارُ، المُسَحِّرَاتِيُّ، المِدْفَعُ، صِلَةُ الأَرْحَامِ", "Metindeki bilgilerin doğru mu yanlış mı olduğunu bulmak"],
  examples: [
    { s: "فِي هَذَا الشَّهْرِ المُبَارَكِ:- / تَتَنَوَّعُ الأَطْعِمَةُ،:mz / وَتَتَزَيَّنُ المَبَانِي بِالمَصَابِيحِ.:mz", tr: "Bu mübarek ayda yemekler çeşitlenir, binalar ışıklarla süslenir." },
    { s: "المُسَحِّرَاتِيُّ:nasb / يَتَجَوَّلُ فِي الأَحْيَاءِ:- / لِإِيقَاظِ الصَّائِمِينَ.:cerr", tr: "Mesaharatî oruçluları uyandırmak için mahallelerde dolaşır." }
  ],
  rules: [
    { tr: "<b>Ramazan nasıl karşılanır?</b> Yemekler çeşitlenir (<span class=\"ar\">تَتَنَوَّعُ الأَطْعِمَةُ</span>), binalar ve minareler ışıklarla süslenir (<span class=\"ar\">تَتَزَيَّنُ… بِالمَصَابِيحِ</span>), sokaklar kalabalıklaşır, dükkânlar geç saate kadar açık kalır." },
    { tr: "<b>Sosyal âdetler:</b> aile ziyaretleri, sıla-i rahim (<span class=\"ar\">صِلَةُ الأَرْحَامِ</span>), komşularla yemek alışverişi, birbirini iftara davet etmek. <b>Eski âdetler:</b> sahur ve iftar topu (<span class=\"ar\">مِدْفَعُ السَّحُورِ وَالإِفْطَارِ</span>), ramazan davulcusu (<span class=\"ar\">المُسَحِّرَاتِيُّ</span>), ramazana özgü tatlı ve içecekler." },
    { tr: "<b>Kitapla ilgili not:</b> metin “<span class=\"ar\">الصِّيَامُ رُكْنٌ… وَهُوَ الشَّهْرُ الَّذِي أُنْزِلَ فِيهِ القُرْآنُ</span>” diye başlar; ama “ay” oruç değil Ramazan’dır. Burada “<span class=\"ar\">وَرَمَضَانُ هُوَ الشَّهْرُ…</span>” diye düzeltildi. Âyet Bakara 185’tir; kitap kaynağı vermez." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: كَيْفَ تَسْتَقْبِلُ رَمَضَانَ؟ مَاذَا تَأْكُلُ فِي طَعَامِ الإِفْطَارِ؟ مَتَى تَذْهَبُ إِلَى المَسْجِدِ فِي رَمَضَانَ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "العَادَاتُ الرَّمَضَانِيَّةُ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "كَيْفَ تَسْتَقْبِلُ رَمَضَانَ؟", a: "أَسْتَقْبِلُهُ بِالفَرَحِ، وَأُزَيِّنُ البَيْتَ، وَأَشْتَرِي مَا نَحْتَاجُ إِلَيْهِ.", tr: "Ramazan’ı nasıl karşılarsın? (Örnek) Sevinçle; evi süsler, ihtiyaçları alırım." },
        { q: "مَاذَا تَأْكُلُ فِي طَعَامِ الإِفْطَارِ؟", a: "آكُلُ التَّمْرَ وَالشُّورْبَةَ وَخُبْزَ رَمَضَانَ، ثُمَّ الطَّعَامَ الرَّئِيسِيَّ وَالغُلَّاشَ.", tr: "İftarda ne yersin? (Örnek) Hurma, çorba, ramazan pidesi, ana yemek ve güllaç." },
        { q: "مَتَى تَذْهَبُ إِلَى المَسْجِدِ فِي رَمَضَانَ؟", a: "أَذْهَبُ إِلَى المَسْجِدِ لِصَلَاةِ التَّرَاوِيحِ بَعْدَ الإِفْطَارِ.", tr: "Ramazanda camiye ne zaman gidersin? İftardan sonra teravih için." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "الصِّيَامُ رُكْنٌ مِنْ أَرْكَانِ الإِسْلَامِ.", a: "d", why: "Metnin ilk cümlesi." },
        { s: "أُنْزِلَ القُرْآنُ الكَرِيمُ فِي شَهْرِ شَعْبَانَ.", a: "y", why: "Ramazan’da: ﴿شَهْرُ رَمَضَانَ الَّذِي أُنْزِلَ فِيهِ الْقُرْآنُ﴾" },
        { s: "رَمَضَانُ شَهْرُ الرَّحْمَةِ وَالمَغْفِرَةِ وَالتَّوْبَةِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَنْتَظِرُ المُسْلِمُونَ رَمَضَانَ بِفَارِغِ الصَّبْرِ.", a: "d", why: "Sabırsızlıkla beklerler." },
        { s: "تَتَزَيَّنُ المَبَانِي وَالمَآذِنُ بِالمَصَابِيحِ فِي رَمَضَانَ.", a: "d", why: "Metinde aynen geçer." },
        { s: "تُغْلِقُ المَحَلَّاتُ أَبْوَابَهَا مُبَكِّرًا فِي رَمَضَانَ.", a: "y", why: "Gecenin geç saatlerine kadar açık kalır." },
        { s: "تَقِلُّ الزِّيَارَاتُ العَائِلِيَّةُ فِي رَمَضَانَ.", a: "y", why: "تَكْثُرُ الزِّيَارَاتُ (çoğalır)." },
        { s: "يَسْتَيْقِظُ النَّاسُ عَلَى مِدْفَعِ السَّحُورِ.", a: "d", why: "الاسْتِيقَاظُ عَلَى مِدْفَعِ السَّحُورِ." },
        { s: "المُسَحِّرَاتِيُّ يَبِيعُ الحَلَوِيَّاتِ فِي السُّوقِ.", a: "y", why: "Oruçluları sahura uyandırmak için mahallelerde dolaşır." },
        { s: "يَبْدَأُ المُسْلِمُونَ بِشِرَاءِ ثِيَابِ العِيدِ فِي آخِرِ رَمَضَانَ.", a: "d", why: "فِي الأَيَّامِ الأَخِيرَةِ مِنَ الشَّهْرِ." },
        { s: "المَثَلُ «العَشْرُ الأُوَلُ لِلْمَرَقِ» مَشْهُورٌ لَدَى أَهْلِ القَاهِرَةِ.", a: "y", why: "لَدَى أَهْلِ دِمَشْقَ (Şam)." },
        { s: "«العَشْرُ الأَخِيرُ لِصَرِّ الوَرَقِ» أَيْ لِإِعْدَادِ حَلْوَى العِيدِ.", a: "d", why: "Metinde aynen geçer." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("الصِّيَامُ رُكْنٌ مِنْ أَرْكَانِ الإِسْلَامِ", "رُكْنٌ"), "şart, temel", "köşe", "ibadet yeri", "Oruç İslam’ın şartlarından biridir.", "Çoğulu: أَرْكَانٌ."],
      [HL("يَنْتَظِرُهُ المُسْلِمُونَ بِفَارِغِ الصَّبْرِ", "بِفَارِغِ الصَّبْرِ"), "sabırsızlıkla", "sabırla", "korkuyla", "Sabırsızlıkla beklerler.", "Kelimesi kelimesine: boşalmış sabırla."],
      [HL("تَتَنَوَّعُ الأَطْعِمَةُ", "تَتَنَوَّعُ"), "çeşitlenir", "azalır", "pişer", "Yemekler çeşitlenir.", "= تَتَعَدَّدُ"],
      [HL("وَتَتَزَيَّنُ المَبَانِي", "وَتَتَزَيَّنُ"), "ve süslenir", "ve yıkılır", "ve boyanır", "Binalar süslenir.", "زِينَةٌ: süs."],
      [HL("وَمَآذِنُ الجَوَامِعِ", "وَمَآذِنُ"), "ve minareler", "ve kubbeler", "ve kapılar", "Camilerin minareleri.", "Tekili: مِئْذَنَةٌ."],
      [HL("بِالمَصَابِيحِ", "بِالمَصَابِيحِ"), "lambalarla, ışıklarla", "bayraklarla", "çiçeklerle", "Lambalarla süslenir.", "Tekili: مِصْبَاحٌ."],
      [HL("وَصِلَةُ الأَرْحَامِ", "وَصِلَةُ الأَرْحَامِ"), "ve akrabayı ziyaret (sıla-i rahim)", "ve hastane ziyareti", "ve yolculuk", "Akrabalarla bağı sürdürmek.", ""],
      [HL("وَيَسْتَضِيفُ كُلٌّ مِنْهُمُ الآخَرَ", "وَيَسْتَضِيفُ"), "ve misafir eder", "ve ziyaret eder", "ve uğurlar", "Herkes birbirini misafir eder.", "ضَيْفٌ: misafir."],
      [HL("عَادَاتٌ وَتَقَالِيدُ رَمَضَانِيَّةٌ", "وَتَقَالِيدُ"), "ve gelenekler", "ve kanunlar", "ve yemekler", "Ramazan âdet ve gelenekleri.", "Tekili: تَقْلِيدٌ."],
      [HL("وَرِثُوهَا عَنْ أَجْدَادِهِمْ", "وَرِثُوهَا"), "miras aldılar", "unuttular", "sattılar", "Atalarından miras aldılar.", "مِيرَاثٌ: miras."],
      [HL("الاسْتِيقَاظُ عَلَى مِدْفَعِ السَّحُورِ", "مِدْفَعِ"), "top", "davul", "zil", "Sahur topu.", "Çoğulu: مَدَافِعُ."],
      [HL("مَثَلٌ مَشْهُورٌ لَدَى أَهْلِ دِمَشْقَ", "لَدَى"), "…de, katında", "…e doğru", "…den uzak", "Şamlılar arasında meşhur bir atasözü.", "= عِنْدَ"]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama: Ramazan Nasıl Yaşanır?", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak", "Ramazan’ın üç onunu (Şam atasözü) bilmek"],
  examples: [
    { s: "العَشْرُ الأُوَلُ:mz / لِلْمَرَقِ:cerr", tr: "İlk on gün çorba (yemek) içindir.", pair: "وَالعَشْرُ الأَخِيرُ:nasb / لِصَرِّ الوَرَقِ:cerr", pairTr: "Son on gün yufka sarmak (bayram tatlısı) içindir." }
  ],
  rules: [
    { tr: "<b>Mesaharatî (<span class=\"ar\">المُسَحِّرَاتِيُّ</span>):</b> sahur vakti mahallelerde dolaşıp oruçluları uyandıran kişi; Türkiye’de <b>ramazan davulcusu</b>. Görevi: <span class=\"ar\">إِيقَاظُ الصَّائِمِينَ حَتَّى يَتَنَاوَلُوا طَعَامَ السَّحُورِ</span>." },
    { tr: "<b>2. etkinlik:</b> Âdetler birbirine benzerdir (<span class=\"ar\">مُتَشَابِهَةٌ</span> = <span class=\"ar\">مُتَقَارِبَةٌ</span>) · yalnız zenginler hazırlanmaz · komşular ve akrabalar ziyaretleşir · âdetler dışarıdan gelmedi, atalardan miras kaldı · ticari hareket zayıflamaz, dükkânlar gece geç saate kadar açıktır." },
    { tr: "<b>Atasözü:</b> <span class=\"ar\">العَشْرُ</span> “on gün” demektir. Kitap <span class=\"ar\">الأَوَّلُ / الأَخِيرُ</span> yazmış; dilbilgisine göre <span class=\"ar\">العَشْرُ الأُوَلُ / الأَوَاخِرُ</span> da denir. Atasözü halk dilinde olduğu için kitaptaki biçim korunarak <span class=\"ar\">الأُوَلُ</span> yazıldı." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: لِمَاذَا يَنْتَظِرُ المُسْلِمُونَ شَهْرَ رَمَضَانَ؟ كَيْفَ يَسْتَقْبِلُ المُسْلِمُونَ شَهْرَ رَمَضَانَ؟ مَا العَادَاتُ الاجْتِمَاعِيَّةُ الخَاصَّةُ بِشَهْرِ رَمَضَانَ؟ مَا وَظِيفَةُ المُسَحِّرَاتِيِّ، وَكَيْفَ يَقُومُ بِوَظِيفَتِهِ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) بِجَانِبِ الجُمَلِ الآتِيَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["لِمَاذَا يَنْتَظِرُ المُسْلِمُونَ شَهْرَ رَمَضَانَ؟", "لِأَنَّهُ شَهْرُ الرَّحْمَةِ وَالمَغْفِرَةِ وَالتَّوْبَةِ، وَأُنْزِلَ فِيهِ القُرْآنُ.", "لِأَنَّهُ شَهْرُ العُطْلَةِ الصَّيْفِيَّةِ.", "لِأَنَّ الأَسْوَاقَ تُغْلَقُ فِيهِ.", "Neden beklerler? Rahmet, mağfiret, tövbe ayı; Kur’an indirildi.", ""],
      ["كَيْفَ يَسْتَقْبِلُ المُسْلِمُونَ شَهْرَ رَمَضَانَ؟", "تَتَنَوَّعُ الأَطْعِمَةُ، وَتَتَزَيَّنُ المَبَانِي وَالمَآذِنُ بِالمَصَابِيحِ، وَتَزْدَحِمُ الشَّوَارِعُ.", "يُسَافِرُونَ جَمِيعًا إِلَى البَحْرِ.", "يُغْلِقُونَ بُيُوتَهُمْ.", "Ramazanı nasıl karşılarlar?", ""],
      ["مَا العَادَاتُ الاجْتِمَاعِيَّةُ الخَاصَّةُ بِشَهْرِ رَمَضَانَ؟", "الزِّيَارَاتُ العَائِلِيَّةُ، وَصِلَةُ الأَرْحَامِ، وَتَبَادُلُ المَأْكُولَاتِ مَعَ الجِيرَانِ، وَالدَّعْوَةُ إِلَى الإِفْطَارِ.", "النَّوْمُ طُولَ النَّهَارِ.", "السَّفَرُ إِلَى الخَارِجِ.", "Ramazana özgü sosyal âdetler.", ""],
      ["مَا وَظِيفَةُ المُسَحِّرَاتِيِّ، وَكَيْفَ يَقُومُ بِوَظِيفَتِهِ؟", "يُوقِظُ الصَّائِمِينَ لِتَنَاوُلِ السَّحُورِ، وَيَتَجَوَّلُ فِي الأَحْيَاءِ (بِطَبْلِهِ).", "يَطْبُخُ طَعَامَ الإِفْطَارِ لِلنَّاسِ.", "يَبِيعُ ثِيَابَ العِيدِ.", "Mesaharatînin görevi: oruçluları sahura uyandırır; mahallelerde dolaşır.", "Davul metinde geçmez; resimde görülür."]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) بِجَانِبِ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["عَادَاتُ البِلَادِ الإِسْلَامِيَّةِ فِي رَمَضَانَ مُتَقَارِبَةٌ.", "d", "عَادَاتٌ وَتَقَالِيدُ رَمَضَانِيَّةٌ مُتَشَابِهَةٌ."],
      ["يَسْتَعِدُّ لِاسْتِقْبَالِ رَمَضَانَ الأَغْنِيَاءُ فَقَطْ.", "y", "Bütün Müslümanlar."],
      ["يَتَزَاوَرُ الجِيرَانُ وَالأَقَارِبُ فِي رَمَضَانَ.", "d", "تَكْثُرُ الزِّيَارَاتُ العَائِلِيَّةُ… مَعَ الجِيرَانِ."],
      ["بَعْضُ العَادَاتِ الرَّمَضَانِيَّةِ جَاءَتْ مِنَ الخَارِجِ.", "y", "وَرِثُوهَا عَنْ أَجْدَادِهِمْ."],
      ["تَضْعُفُ الحَرَكَةُ التِّجَارِيَّةُ فِي رَمَضَانَ.", "y", "Dükkânlar gece geç saatlere kadar açık."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "العَشْرُ الأُوَلُ وَالأَوْسَطُ وَالأَخِيرُ", tr: "Şam atasözüne göre boşluğa uyanı seç.", items: PL([
      ["«العَشْرُ الأُوَلُ مِنْ رَمَضَانَ ___»", "لِلْمَرَقِ", "لِلْخِرَقِ", "لِصَرِّ الوَرَقِ", "İlk on gün çorba içindir.", "Yemek hazırlığı."],
      ["«وَالعَشْرُ الأَوْسَطُ ___»", "لِلْخِرَقِ", "لِلْمَرَقِ", "لِصَرِّ الوَرَقِ", "Orta on gün bez parçaları içindir.", "Bayramlık alışverişi."],
      ["«وَالعَشْرُ الأَخِيرُ ___»", "لِصَرِّ الوَرَقِ", "لِلْمَرَقِ", "لِلْخِرَقِ", "Son on gün yufka sarmak içindir.", "Bayram tatlısı."],
      ["لِلْخِرَقِ: أَيْ ___", "لِشِرَاءِ ثِيَابِ العِيدِ", "لِتَحْضِيرِ وَجَبَاتِ الطَّعَامِ", "لِإِعْدَادِ حَلْوَى العِيدِ", "Bez parçaları = bayramlık.", ""],
      ["هَذَا المَثَلُ مَشْهُورٌ لَدَى أَهْلِ ___", "دِمَشْقَ", "بَغْدَادَ", "إِسْطَنْبُولَ", "Şamlıların atasözü.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · EŞ VE ZIT
{
  id: "u3", no: 3, ar: "المُرَادِفُ وَالضِّدُّ", tr: "Kelimeler: Eş ve Zıt Anlam", short: "Eş · zıt", col: "mi", legend: ["mz", "cerr"],
  goals: ["Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimelerin zıt anlamlısını bulmak"],
  examples: [
    { s: "مَائِدَةٌ:mz.Kelime / = سُفْرَةٌ:nasb.Eş", tr: "sofra", pair: "خَاصٌّ:mz.Kelime / ≠ عَامٌّ:cerr.Zıt", pairTr: "özel ≠ genel" }
  ],
  rules: [
    { tr: "<b>Eş anlam (3. etkinlik):</b> <span class=\"ar\">مَائِدَةٌ = سُفْرَةٌ · تَحْضِيرٌ = تَجْهِيزٌ · مَبْنًى = عِمَارَةٌ · كُسْوَةٌ = لِبَاسٌ · أَدَاءٌ = فِعْلٌ · تَنَوُّعٌ = تَعَدُّدٌ · لَدَى = عِنْدَ · المُبَارَكُ = المُقَدَّسُ · تَسَوُّقٌ = شِرَاءٌ · المَلَابِسُ = الثِّيَابُ · حَانَ = جَاءَ وَقْتُهُ</span>. Not: <span class=\"ar\">المُبَارَكُ</span> “bereketli”, <span class=\"ar\">المُقَدَّسُ</span> “kutsal” demektir; kitap yakın anlamlı sayar." },
    { tr: "<b>Zıt anlam (4. etkinlik):</b> kitap zıtları vermiyor; burada en yaygınları kullanıldı: <span class=\"ar\">فَارِغٌ ≠ مُمْتَلِئٌ · جَمِيلَةٌ ≠ قَبِيحَةٌ · خَاصٌّ ≠ عَامٌّ · الأَخِيرَةُ ≠ الأُولَى · مُخْتَلِفَةٌ ≠ مُتَشَابِهَةٌ · الفَرَحُ ≠ الحُزْنُ · قَدِيمٌ ≠ حَدِيثٌ</span>." }
  ],
  kaide: ["٣ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا.", "٤ ـ هَاتِ عَكْسَ الكَلِمَاتِ الآتِيَةِ."],
  ex: [
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["تَعَدُّدٌ", "لِبَاسٌ", "سُفْرَةٌ", "فِعْلٌ", "عِمَارَةٌ", "تَجْهِيزٌ", "المُقَدَّسُ", "عِنْدَ", "الثِّيَابُ", "جَاءَ وَقْتُهُ", "شِرَاءٌ"], items: [
      { pre: "مَائِدَةٌ =", a: [2], tr: "sofra" }, { pre: "تَحْضِيرٌ =", a: [5], tr: "hazırlama" }, { pre: "مَبْنًى =", a: [4], tr: "bina" }, { pre: "كُسْوَةٌ =", a: [1], tr: "giysi" }, { pre: "أَدَاءٌ =", a: [3], tr: "yerine getirme ≈ yapma" }, { pre: "تَنَوُّعٌ =", a: [0], tr: "çeşitlilik" }, { pre: "لَدَى =", a: [7], tr: "…de, yanında" }, { pre: "المُبَارَكُ =", a: [6], tr: "mübarek ≈ kutsal" }, { pre: "تَسَوُّقٌ =", a: [10], tr: "alışveriş" }, { pre: "المَلَابِسُ =", a: [8], tr: "elbiseler" }, { pre: "حَانَ =", a: [9], tr: "vakti geldi" }
    ]},
    { type: "bank", num: "٤", ar: "هَاتِ عَكْسَ الكَلِمَاتِ الآتِيَةِ", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["مُمْتَلِئٌ", "قَبِيحَةٌ", "عَامٌّ", "الأُولَى", "مُتَشَابِهَةٌ", "الحُزْنُ", "حَدِيثٌ"], items: [
      { pre: "فَارِغٌ ≠", a: [0], tr: "boş ≠ dolu" }, { pre: "جَمِيلَةٌ ≠", a: [1], tr: "güzel ≠ çirkin" }, { pre: "خَاصٌّ ≠", a: [2], tr: "özel ≠ genel" }, { pre: "الأَخِيرَةُ ≠", a: [3], tr: "son ≠ ilk" }, { pre: "مُخْتَلِفَةٌ ≠", a: [4], tr: "farklı ≠ benzer" }, { pre: "الفَرَحُ ≠", a: [5], tr: "sevinç ≠ hüzün" }, { pre: "قَدِيمٌ ≠", a: [6], tr: "eski ≠ yeni" }
    ]},
    { type: "classify", extra: true, opts: [["e", "Eş anlam", "مُرَادِفٌ", "mz"], ["z", "Zıt anlam", "ضِدٌّ", "cerr"]], ar: "مُرَادِفٌ أَمْ ضِدٌّ؟", tr: "Kelime çifti eş anlamlı mı, zıt anlamlı mı?", items: CL([
      ["مَائِدَةٌ — سُفْرَةٌ", "e", "sofra"], ["لَدَى — عِنْدَ", "e", "…de"], ["حَانَ — جَاءَ وَقْتُهُ", "e", "vakti geldi"], ["تَنَوُّعٌ — تَعَدُّدٌ", "e", "çeşitlilik"], ["المَلَابِسُ — الثِّيَابُ", "e", "elbiseler"],
      ["فَارِغٌ — مُمْتَلِئٌ", "z", "boş ≠ dolu"], ["خَاصٌّ — عَامٌّ", "z", "özel ≠ genel"], ["مُخْتَلِفَةٌ — مُتَشَابِهَةٌ", "z", "farklı ≠ benzer"], ["الفَرَحُ — الحُزْنُ", "z", "sevinç ≠ hüzün"], ["تَكْثُرُ — تَقِلُّ", "z", "çoğalır ≠ azalır"]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · ÇOĞUL VE KULLANIM
{
  id: "u4", no: 4, ar: "الجَمْعُ وَاسْتِعْمَالُ الكَلِمَاتِ", tr: "Çoğul, Kelime Eşleri ve Cümle Kurma", short: "Çoğul · kullanım", col: "ref", legend: ["mz", "nasb"],
  goals: ["Kelimelerin çoğulunu bulmak", "Birlikte kullanılan kelimeleri eşleştirmek (قِرَاءَةُ القُرْآنِ…)", "Verilen kelimeleri cümlede kullanmak"],
  examples: [
    { s: "مِئْذَنَةٌ:mz.Tekil / ← مَآذِنُ:nasb.Çoğul", tr: "minare → minareler", pair: "قِرَاءَةُ:mz / القُرْآنِ:nasb", pairTr: "Kur’an okumak" }
  ],
  rules: [
    { tr: "<b>Çoğullar (5. etkinlik):</b> <span class=\"ar\">رُكْنٌ ← أَرْكَانٌ · شَهْرٌ ← أَشْهُرٌ / شُهُورٌ · طَعَامٌ ← أَطْعِمَةٌ · مِئْذَنَةٌ ← مَآذِنُ · جَامِعٌ ← جَوَامِعُ · مِصْبَاحٌ ← مَصَابِيحُ · مَحَلٌّ ← مَحَلَّاتٌ · عَادَةٌ ← عَادَاتٌ · مِدْفَعٌ ← مَدَافِعُ</span>." },
    { tr: "<b>Birlikte gelen kelimeler (6. etkinlik):</b> <span class=\"ar\">قِرَاءَةُ القُرْآنِ · صِيَامُ رَمَضَانَ · بِفَارِغِ الصَّبْرِ · تَبَادُلُ التَّهَانِي · الأَكَلَاتُ التُّرْكِيَّةُ</span>. Kitap bunlarla kendi cümleni istiyor; burada boşluklu cümlelerle çalışılır." },
    { tr: "<b>8. etkinlik:</b> <span class=\"ar\">تَتَنَوَّعُ، تَكْثُرُ، يَتَجَوَّلُ فِي، حَانَ، يُحَضِّرُ</span> ile kendi cümleni defterine yaz; aşağıda örnek cümlelerle çalış." }
  ],
  kaide: ["٥ ـ هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ.", "٦ ـ صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ تَأْتِيَانِ مَعًا وَاسْتَعْمِلْهُمَا فِي جُمْلَةٍ صَحِيحَةٍ. ٨ ـ اكْتُبْ جُمَلًا تَحْتَوِي الكَلِمَاتِ الآتِيَةَ: تَتَنَوَّعُ، تَكْثُرُ، يَتَجَوَّلُ فِي، حَانَ، يُحَضِّرُ."],
  ex: [
    { type: "bank", num: "٥", ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Önce aşağıdan çoğulu seç, sonra kelimenin kutusuna dokun.", bank: ["أَرْكَانٌ", "شُهُورٌ", "أَطْعِمَةٌ", "مَآذِنُ", "جَوَامِعُ", "مَصَابِيحُ", "مَحَلَّاتٌ", "عَادَاتٌ", "مَدَافِعُ"], items: [
      { pre: "رُكْنٌ ←", a: [0], tr: "şart, temel" }, { pre: "شَهْرٌ ←", a: [1], tr: "ay (أَشْهُرٌ da olur)" }, { pre: "طَعَامٌ ←", a: [2], tr: "yemek" }, { pre: "مِئْذَنَةٌ ←", a: [3], tr: "minare" }, { pre: "جَامِعٌ ←", a: [4], tr: "cami" }, { pre: "مِصْبَاحٌ ←", a: [5], tr: "lamba" }, { pre: "مَحَلٌّ ←", a: [6], tr: "dükkân" }, { pre: "عَادَةٌ ←", a: [7], tr: "âdet" }, { pre: "مِدْفَعٌ ←", a: [8], tr: "top" }
    ]},
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ تَأْتِيَانِ مَعًا", tr: "Önce aşağıdan eşini seç, sonra kelimenin kutusuna dokun; sonra defterine her ikiliyle bir cümle yaz.", bank: ["الصَّبْرِ", "التَّهَانِي", "القُرْآنِ", "رَمَضَانَ", "التُّرْكِيَّةُ"], items: [
      { pre: "قِرَاءَةُ", a: [2], tr: "Kur’an okumak" }, { pre: "صِيَامُ", a: [3], tr: "ramazan orucu" }, { pre: "بِفَارِغِ", a: [0], tr: "sabırsızlıkla" }, { pre: "تَبَادُلُ", a: [1], tr: "tebrikleşme" }, { pre: "الأَكَلَاتُ", a: [4], tr: "Türk yemekleri" }
    ]},
    { type: "pick", fill: true, num: "٨", ar: "اكْتُبْ جُمَلًا تَحْتَوِي الكَلِمَاتِ الآتِيَةَ", tr: "Boşluğa uyan kelimeyi seç; sonra defterine her kelimeyle kendi cümleni yaz.", items: PL([
      ["___ الأَطْعِمَةُ عَلَى مَائِدَةِ الإِفْطَارِ.", "تَتَنَوَّعُ", "تَتَجَوَّلُ", "حَانَ", "İftar sofrasında yemekler çeşitlenir.", "تَتَنَوَّعُ"],
      ["___ الزِّيَارَاتُ بَيْنَ الأَقَارِبِ فِي رَمَضَانَ.", "تَكْثُرُ", "يُحَضِّرُ", "حَانَ", "Ramazanda akrabalar arası ziyaretler çoğalır.", "تَكْثُرُ"],
      ["___ المُسَحِّرَاتِيُّ فِي الشَّوَارِعِ قَبْلَ الفَجْرِ.", "يَتَجَوَّلُ", "تَكْثُرُ", "تَتَنَوَّعُ", "Davulcu fecirden önce sokaklarda dolaşır.", "يَتَجَوَّلُ فِي"],
      ["___ وَقْتُ الإِفْطَارِ، فَاجْتَمَعَتِ الأُسْرَةُ.", "حَانَ", "يَتَجَوَّلُ", "تَكْثُرُ", "İftar vakti geldi, aile toplandı.", "حَانَ = جَاءَ وَقْتُهُ"],
      ["___ أَبِي طَعَامَ السَّحُورِ.", "يُحَضِّرُ", "تَتَنَوَّعُ", "حَانَ", "Babam sahur yemeğini hazırlıyor.", "يُحَضِّرُ = يُجَهِّزُ"]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · CÜMLE VE HARF-İ CER
{
  id: "u5", no: 5, ar: "تَرْتِيبُ الجُمَلِ وَحُرُوفُ الجَرِّ", tr: "Cümle Dizme, Harf-i Cer ve Ramazan Âdetleri", short: "Cümle · cer", col: "muz", legend: ["mi", "cerr"],
  goals: ["Karışık kelimelerden anlamlı cümle kurmak", "Boşluğa uygun harf-i cerri koymak: بِـ، إِلَى، مِنْ، لِـ، عَنْ", "Kendi şehrindeki ramazan âdetlerini söylemek", "Amaç bildiren لِـ ve حَتَّى kalıplarını kullanmak"],
  examples: [
    { s: "يَتَجَوَّلُ فِي الأَحْيَاءِ:- / لِإِيقَاظِ الصَّائِمِينَ:cerr.لِـ + mastar / حَتَّى يَتَنَاوَلُوا السَّحُورَ.:cerr.حَتَّى + mansûb", tr: "Oruçluları uyandırmak için mahallelerde dolaşır; sahur yesinler diye." }
  ],
  rules: [
    { tr: "<b>Harf-i cerler (9. etkinlik):</b> <span class=\"ar\">رُكْنٌ مِنْ أَرْكَانِ</span> (bir parça → <span class=\"ar\">مِنْ</span>) · <span class=\"ar\">لِتَنَاوُلِ</span> (amaç → <span class=\"ar\">لِـ</span>) · <span class=\"ar\">يَذْهَبُ إِلَى</span> (yön → <span class=\"ar\">إِلَى</span>) · <span class=\"ar\">يَتَمَيَّزُ بِـ</span> (…ile öne çıkar) · <span class=\"ar\">يَرِثُ عَنْ</span> (…den miras alır)." },
    { tr: "<b>Amaç bildirme:</b> <span class=\"ar\">لِـ + mastar (mecrûr)</span>: <span class=\"ar\">لِإِيقَاظِ الصَّائِمِينَ</span> · <span class=\"ar\">لِـ / حَتَّى + muzâri mansûb</span>: <span class=\"ar\">لِيُوقِظَ، حَتَّى يَتَنَاوَلُوا</span>. Mastardan sonra nesne mecrûr olur (<span class=\"ar\">لِتَنَاوُلِ طَعَامِ</span>), fiilden sonra mansûb (<span class=\"ar\">لِيَتَنَاوَلُوا طَعَامَ</span>)." },
    { tr: "<b>Cümle dizme (7. etkinlik):</b> <span class=\"ar\">نَزَلَ القُرْآنُ الكَرِيمُ فِي شَهْرِ رَمَضَانَ · تُسَاعِدُ شَيْمَاءُ أُمَّهَا فِي تَحْضِيرِ الفُطُورِ · اجْتَمَعَ أَفْرَادُ الأُسْرَةِ حَوْلَ مَائِدَةِ السَّحُورِ · تَتَنَوَّعُ الاحْتِفَالَاتُ بِرَمَضَانَ فِي مَدِينَةِ إِسْطَنْبُولَ</span>." },
    { tr: "<b>10. etkinlik:</b> kendi şehrindeki üç ramazan âdetini yazman isteniyor. Türkiye’den örnekler: ramazan davulcusu, ramazan pidesi, güllaç, mukabele, teravih, iftar çadırları, mahya (iki minare arasına gerilen ışıklı yazı)." }
  ],
  kaide: ["٧ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً.", "٩ ـ اخْتَرْ حَرْفَ الجَرِّ المُنَاسِبَ وَاكْتُبْهُ فِي الفَرَاغِ المُنَاسِبِ: (بِـ، إِلَى، مِنْ، لِـ، عَنْ). ١٠ ـ اذْكُرْ ثَلَاثَةً مِنَ العَادَاتِ الرَّمَضَانِيَّةِ فِي مَدِينَتِكَ."],
  ex: [
    { type: "pick", num: "٧", ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Karışık kelimelerden kurulan doğru cümleyi seç.", items: PL([
      ["القُرْآنُ، نَزَلَ، فِي، الكَرِيمُ، رَمَضَانَ، شَهْرِ", "نَزَلَ القُرْآنُ الكَرِيمُ فِي شَهْرِ رَمَضَانَ.", "نَزَلَ رَمَضَانُ فِي شَهْرِ القُرْآنِ الكَرِيمِ.", "فِي القُرْآنِ نَزَلَ شَهْرُ رَمَضَانَ الكَرِيمُ.", "Kur’an-ı Kerîm Ramazan ayında indi.", ""],
      ["شَيْمَاءُ، أُمَّهَا، تَحْضِيرِ، تُسَاعِدُ، فِي، الفُطُورِ", "تُسَاعِدُ شَيْمَاءُ أُمَّهَا فِي تَحْضِيرِ الفُطُورِ.", "تُسَاعِدُ أُمُّهَا شَيْمَاءَ الفُطُورِ فِي تَحْضِيرِ.", "تُسَاعِدُ الفُطُورُ شَيْمَاءَ فِي تَحْضِيرِ أُمِّهَا.", "Şeyma iftarı hazırlamada annesine yardım eder.", "تُسَاعِدُ… فِي…"],
      ["أَفْرَادُ، اجْتَمَعَ، حَوْلَ، السَّحُورِ، مَائِدَةِ، الأُسْرَةِ", "اجْتَمَعَ أَفْرَادُ الأُسْرَةِ حَوْلَ مَائِدَةِ السَّحُورِ.", "اجْتَمَعَ السَّحُورُ حَوْلَ أَفْرَادِ الأُسْرَةِ.", "حَوْلَ اجْتَمَعَ الأُسْرَةِ مَائِدَةِ أَفْرَادُ السَّحُورِ.", "Aile fertleri sahur sofrası etrafında toplandı.", ""],
      ["الاحْتِفَالَاتُ، بِرَمَضَانَ، فِي، تَتَنَوَّعُ، إِسْطَنْبُولَ، مَدِينَةِ", "تَتَنَوَّعُ الاحْتِفَالَاتُ بِرَمَضَانَ فِي مَدِينَةِ إِسْطَنْبُولَ.", "تَتَنَوَّعُ إِسْطَنْبُولُ بِالاحْتِفَالَاتِ فِي مَدِينَةِ رَمَضَانَ.", "فِي رَمَضَانَ تَتَنَوَّعُ مَدِينَةُ الاحْتِفَالَاتِ بِإِسْطَنْبُولَ.", "İstanbul’da ramazan kutlamaları çeşitlenir.", ""]
    ])},
    { type: "pick", fill: true, num: "٩", ar: "اخْتَرْ حَرْفَ الجَرِّ المُنَاسِبَ وَاكْتُبْهُ فِي الفَرَاغِ", tr: "Boşluğa uygun harf-i cerri seç.", items: PL([
      ["الصِّيَامُ رُكْنٌ ___ أَرْكَانِ الإِسْلَامِ.", "مِنْ", "عَنْ", "إِلَى", "Oruç İslam’ın şartlarından biridir.", "Bir bütünün parçası → مِنْ"],
      ["يَسْتَيْقِظُ النَّاسُ قُبَيْلَ صَلَاةِ الفَجْرِ ___تَنَاوُلِ طَعَامِ السَّحُورِ.", "لِـ", "بِـ", "عَنْ", "İnsanlar sahur yemek için fecirden az önce kalkar.", "Amaç → لِـ"],
      ["يَذْهَبُ النَّاسُ ___ أَعْمَالِهِمْ فِي الصَّبَاحِ.", "إِلَى", "مِنْ", "عَنْ", "İnsanlar sabah işlerine gider.", "Yön → إِلَى"],
      ["يَتَمَيَّزُ الأَتْرَاكُ ___كَثْرَةِ مَوَائِدِ الخَيْرِ فِي شَهْرِ رَمَضَانَ.", "بِـ", "لِـ", "إِلَى", "Türkler ramazanda çok sayıda hayır sofrasıyla öne çıkar.", "يَتَمَيَّزُ بِـ"],
      ["يَرِثُ الأَوْلَادُ العَادَاتِ الاجْتِمَاعِيَّةَ ___ آبَائِهِمْ.", "عَنْ", "إِلَى", "بِـ", "Çocuklar sosyal âdetleri babalarından miras alır.", "وَرِثَ عَنْ"]
    ])},
    { type: "classify", num: "١٠", opts: ADET, ar: "اذْكُرْ ثَلَاثَةً مِنَ العَادَاتِ الرَّمَضَانِيَّةِ فِي مَدِينَتِكَ", tr: "Bu, Türkiye’de bir ramazan âdeti mi? Sonra kendi şehrinden üç âdeti defterine yaz.", items: CL([
      ["طَبَّالُ رَمَضَانَ يُوقِظُ النَّاسَ لِلسَّحُورِ 🥁", "r", "Ramazan davulcusu."], ["خُبْزُ رَمَضَانَ (البِيدَا) 🫓", "r", "Ramazan pidesi."], ["حَلْوَى الغُلَّاشِ", "r", "Güllaç."], ["المُقَابَلَةُ: قِرَاءَةُ القُرْآنِ فِي المَسَاجِدِ", "r", "Mukabele."], ["صَلَاةُ التَّرَاوِيحِ 🕌", "r", "Teravih."], ["المَحْيَا: كِتَابَةٌ مُضِيئَةٌ بَيْنَ مِئْذَنَتَيْنِ ✨", "r", "Mahya."], ["خِيَامُ الإِفْطَارِ", "r", "İftar çadırları."],
      ["رَمْيُ الجِمَارِ", "g", "Hacca özgü."], ["ذَبْحُ الأُضْحِيَةِ 🐑", "g", "Kurban Bayramı’na özgü."], ["الذَّهَابُ إِلَى المَدْرَسَةِ يَوْمَ الإِثْنَيْنِ", "g", "Her hafta olur."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "لِـ وَحَتَّى", tr: "Amaç bildiren kalıpta doğru biçimi seç.", items: PL([
      ["يَتَجَوَّلُ المُسَحِّرَاتِيُّ لِـ___ الصَّائِمِينَ.", "إِيقَاظِ", "إِيقَاظُ", "يُوقِظُ", "Oruçluları uyandırmak için dolaşır.", "لِـ + mastar (mecrûr)"],
      ["يُوقِظُهُمْ حَتَّى ___ طَعَامَ السَّحُورِ.", "يَتَنَاوَلُوا", "يَتَنَاوَلُونَ", "تَنَاوُلِ", "Sahur yesinler diye uyandırır.", "حَتَّى + mansûb: nûn düşer."],
      ["يَشْتَرِي المُسْلِمُونَ المَلَابِسَ لِـ___ العِيدِ.", "اسْتِقْبَالِ", "يَسْتَقْبِلُوا", "اسْتِقْبَالُ", "Bayramı karşılamak için elbise alırlar.", "Mastardan sonra العِيدِ mecrûr."],
      ["يَشْتَرِي المُسْلِمُونَ المَلَابِسَ لِـ___ العِيدَ.", "يَسْتَقْبِلُوا", "اسْتِقْبَالِ", "يَسْتَقْبِلُونَ", "Bayramı karşılasınlar diye elbise alırlar.", "Fiilden sonra العِيدَ mansûb."],
      ["يَدْعُو الجَارُ جِيرَانَهُ لِـ___ الإِفْطَارِ.", "تَنَاوُلِ", "يَتَنَاوَلُ", "تَنَاوُلُ", "Komşu, komşularını iftara davet eder.", ""]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["الصِّيَامُ {رُكْنٌ} مِنْ أَرْكَانِ الإِسْلَامِ.", ["رُكْنٌ", "رُكُوعٌ", "رُكُوبٌ"], "metin", "İslam’ın şartlarından.", "u1"],
  ["يَنْتَظِرُهُ المُسْلِمُونَ بِفَارِغِ {الصَّبْرِ}.", ["الصَّبْرِ", "الوَقْتِ", "الصَّوْمِ"], "metin", "Sabırsızlıkla.", "u1"],
  ["فِي هَذَا الشَّهْرِ {تَتَنَوَّعُ} الأَطْعِمَةُ.", ["تَتَنَوَّعُ", "تَقِلُّ", "تَبْرُدُ"], "metin", "Yemekler çeşitlenir.", "u1"],
  ["تَتَزَيَّنُ المَبَانِي بِ{المَصَابِيحِ}.", ["المَصَابِيحِ", "المَدَافِعِ", "المَآذِنِ"], "metin", "Lambalarla süslenir.", "u1"],
  ["وَتَكْثُرُ الزِّيَارَاتُ وَ{صِلَةُ} الأَرْحَامِ.", ["صِلَةُ", "قَطْعُ", "سَفَرُ"], "metin", "Sıla-i rahim.", "u1"],
  ["وَرِثُوهَا عَنْ {أَجْدَادِهِمْ}.", ["أَجْدَادِهِمْ", "جِيرَانِهِمْ", "أَوْلَادِهِمْ"], "metin", "Atalarından.", "u1"],
  ["الاسْتِيقَاظُ عَلَى {مِدْفَعِ} السَّحُورِ.", ["مِدْفَعِ", "مِصْبَاحِ", "مَائِدَةِ"], "metin", "Sahur topu.", "u1"],
  ["عَادَاتُ البِلَادِ الإِسْلَامِيَّةِ {مُتَقَارِبَةٌ}.", ["مُتَقَارِبَةٌ", "مُخْتَلِفَةٌ", "قَلِيلَةٌ"], "anlama", "Birbirine benzer.", "u2"],
  ["يَتَجَوَّلُ {المُسَحِّرَاتِيُّ} فِي الأَحْيَاءِ.", ["المُسَحِّرَاتِيُّ", "التَّاجِرُ", "الطَّبِيبُ"], "anlama", "Ramazan davulcusu.", "u2"],
  ["«العَشْرُ الأَوْسَطُ {لِلْخِرَقِ}».", ["لِلْخِرَقِ", "لِلْمَرَقِ", "لِلْوَرَقِ"], "anlama", "Bayramlık için.", "u2"],
  ["مَائِدَةٌ = {سُفْرَةٌ}.", ["سُفْرَةٌ", "سَفَرٌ", "مَدِينَةٌ"], "eş anlam", "sofra", "u3"],
  ["لَدَى = {عِنْدَ}.", ["عِنْدَ", "إِلَى", "عَنْ"], "eş anlam", "…de", "u3"],
  ["حَانَ = {جَاءَ وَقْتُهُ}.", ["جَاءَ وَقْتُهُ", "ذَهَبَ", "تَأَخَّرَ"], "eş anlam", "vakti geldi", "u3"],
  ["فَارِغٌ ≠ {مُمْتَلِئٌ}.", ["مُمْتَلِئٌ", "خَالٍ", "صَغِيرٌ"], "zıt", "boş ≠ dolu", "u3"],
  ["خَاصٌّ ≠ {عَامٌّ}.", ["عَامٌّ", "خَالِصٌ", "جَدِيدٌ"], "zıt", "özel ≠ genel", "u3"],
  ["مِئْذَنَةٌ ← {مَآذِنُ}.", ["مَآذِنُ", "مِئْذَنَاتٌ", "أَذَانٌ"], "çoğul", "minare → minareler", "u4"],
  ["مِصْبَاحٌ ← {مَصَابِيحُ}.", ["مَصَابِيحُ", "صُبُوحٌ", "مِصْبَاحَاتٌ"], "çoğul", "lamba → lambalar", "u4"],
  ["تَبَادُلُ {التَّهَانِي}.", ["التَّهَانِي", "الصَّبْرِ", "القُرْآنِ"], "kelime eşi", "tebrikleşme", "u4"],
  ["{حَانَ} وَقْتُ الإِفْطَارِ.", ["حَانَ", "تَكْثُرُ", "تَتَنَوَّعُ"], "kullanım", "İftar vakti geldi.", "u4"],
  ["يَذْهَبُ النَّاسُ {إِلَى} أَعْمَالِهِمْ.", ["إِلَى", "عَنْ", "بِـ"], "harf-i cer", "İşlerine giderler.", "u5"],
  ["يَرِثُ الأَوْلَادُ العَادَاتِ {عَنْ} آبَائِهِمْ.", ["عَنْ", "إِلَى", "لِـ"], "harf-i cer", "Babalarından miras alırlar.", "u5"],
  ["يَتَمَيَّزُ الأَتْرَاكُ {بِـ}كَثْرَةِ مَوَائِدِ الخَيْرِ.", ["بِـ", "مِنْ", "عَنْ"], "harf-i cer", "…ile öne çıkarlar.", "u5"],
  ["يُوقِظُهُمْ حَتَّى {يَتَنَاوَلُوا} السَّحُورَ.", ["يَتَنَاوَلُوا", "يَتَنَاوَلُونَ", "تَنَاوُلِ"], "kalıp", "Sahur yesinler diye.", "u5"],
  ["لِ{إِيقَاظِ} الصَّائِمِينَ.", ["إِيقَاظِ", "يُوقِظُ", "إِيقَاظُ"], "kalıp", "Uyandırmak için.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["تُغْلِقُ المَحَلَّاتُ مُبَكِّرًا ← metne göre düzelt", "تَفْتَحُ المَحَلَّاتُ أَبْوَابَهَا إِلَى سَاعَاتٍ مُتَأَخِّرَةٍ", "تُغْلِقُ المَحَلَّاتُ طُولَ الشَّهْرِ", "لَا تُوجَدُ مَحَلَّاتٌ", "Geç saatlere kadar açık.", "u1"],
  ["جَاءَتِ العَادَاتُ مِنَ الخَارِجِ ← düzelt", "وَرِثُوا العَادَاتِ عَنْ أَجْدَادِهِمْ", "اشْتَرَوُا العَادَاتِ مِنَ السُّوقِ", "لَيْسَ لَهُمْ عَادَاتٌ", "Atalardan miras.", "u2"],
  ["تَقِلُّ الزِّيَارَاتُ فِي رَمَضَانَ ← düzelt", "تَكْثُرُ الزِّيَارَاتُ فِي رَمَضَانَ", "تَنْتَهِي الزِّيَارَاتُ فِي رَمَضَانَ", "لَا زِيَارَاتِ فِي رَمَضَانَ", "Ziyaretler çoğalır.", "u2"],
  ["تَحْضِيرٌ ← eş anlam", "تَجْهِيزٌ", "تَسَوُّقٌ", "تَنَوُّعٌ", "hazırlama", "u3"],
  ["كُسْوَةٌ ← eş anlam", "لِبَاسٌ", "سُفْرَةٌ", "عِمَارَةٌ", "giysi", "u3"],
  ["مُخْتَلِفَةٌ ← zıt anlam", "مُتَشَابِهَةٌ", "مُتَنَوِّعَةٌ", "مُتَعَدِّدَةٌ", "farklı ≠ benzer", "u3"],
  ["الأَخِيرَةُ ← zıt anlam", "الأُولَى", "الوُسْطَى", "الآخِرَةُ", "son ≠ ilk", "u3"],
  ["جَامِعٌ ← çoğul", "جَوَامِعُ", "جَامِعَاتٌ", "جُمُوعٌ", "cami → camiler", "u4"],
  ["مِدْفَعٌ ← çoğul", "مَدَافِعُ", "مِدْفَعَاتٌ", "دُفُوعٌ", "top → toplar", "u4"],
  ["رُكْنٌ ← çoğul", "أَرْكَانٌ", "رُكُونٌ", "رِكَانٌ", "şart → şartlar", "u4"],
  ["لِإِيقَاظِ الصَّائِمِينَ ← لِـ + fiil", "لِيُوقِظَ الصَّائِمِينَ", "لِيُوقِظُ الصَّائِمِينَ", "لِأَيْقَظَ الصَّائِمِينَ", "لِـ + muzâri mansûb", "u5"],
  ["لِتَنَاوُلِ طَعَامِ السَّحُورِ ← حَتَّى ile", "حَتَّى يَتَنَاوَلُوا طَعَامَ السَّحُورِ", "حَتَّى يَتَنَاوَلُونَ طَعَامِ السَّحُورِ", "حَتَّى تَنَاوُلِ طَعَامَ السَّحُورِ", "حَتَّى + mansûb; nesne mansûb.", "u5"],
  ["لِيَسْتَقْبِلُوا العِيدَ ← mastarla", "لِاسْتِقْبَالِ العِيدِ", "لِاسْتِقْبَالُ العِيدَ", "لِمُسْتَقْبِلِ العِيدِ", "لِـ + mastar; nesne mecrûr.", "u5"],
  ["يَرِثُ الأَوْلَادُ العَادَاتِ … آبَائِهِمْ ← harf-i cer", "يَرِثُ الأَوْلَادُ العَادَاتِ عَنْ آبَائِهِمْ", "يَرِثُ الأَوْلَادُ العَادَاتِ إِلَى آبَائِهِمْ", "يَرِثُ الأَوْلَادُ العَادَاتِ بِآبَائِهِمْ", "وَرِثَ عَنْ", "u5"]
];
// Hangi harf-i cer? hız oyunu
var NOUN_LIST = [
  ["الصِّيَامُ رُكْنٌ … أَرْكَانِ الإِسْلَامِ.", "m", "مِنْ"], ["يَشْرَبُ الصَّائِمُ قَلِيلًا … المَاءِ.", "m", "مِنْ"], ["خَرَجَ النَّاسُ … المَسْجِدِ.", "m", "مِنْ"],
  ["يَذْهَبُ النَّاسُ … أَعْمَالِهِمْ.", "i", "إِلَى"], ["تَفْتَحُ المَحَلَّاتُ … سَاعَاتٍ مُتَأَخِّرَةٍ.", "i", "إِلَى"], ["يَتَوَجَّهُ المُصَلُّونَ … المَسْجِدِ.", "i", "إِلَى"],
  ["تَتَزَيَّنُ المَآذِنُ … المَصَابِيحِ.", "b", "بِـ"], ["تَزْدَحِمُ الشَّوَارِعُ … النَّاسِ.", "b", "بِـ"], ["يَتَمَيَّزُ الأَتْرَاكُ … كَثْرَةِ المَوَائِدِ.", "b", "بِـ"], ["يَبْدَأُ المُسْلِمُونَ … شِرَاءِ المَلَابِسِ.", "b", "بِـ"],
  ["يَسْتَيْقِظُونَ … تَنَاوُلِ السَّحُورِ.", "l", "لِـ"], ["يَشْتَرُونَ المَلَابِسَ … اسْتِقْبَالِ العِيدِ.", "l", "لِـ"], ["يَتَجَوَّلُ المُسَحِّرَاتِيُّ … إِيقَاظِ الصَّائِمِينَ.", "l", "لِـ"],
  ["وَرِثُوا العَادَاتِ … أَجْدَادِهِمْ.", "a", "عَنْ"], ["يَبْحَثُ الفَقِيرُ … عَمَلٍ.", "a", "عَنْ"], ["تَحَدَّثَ الإِمَامُ … فَضْلِ رَمَضَانَ.", "a", "عَنْ"]
];
var SP_M = HARF;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; }).concat(UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; }));
var HAFIZA = {
  es: { name: "Kelime ↔ eş anlamlısı", pairs: [["مَائِدَةٌ", "سُفْرَةٌ"], ["تَحْضِيرٌ", "تَجْهِيزٌ"], ["مَبْنًى", "عِمَارَةٌ"], ["كُسْوَةٌ", "لِبَاسٌ"], ["تَنَوُّعٌ", "تَعَدُّدٌ"], ["لَدَى", "عِنْدَ"], ["تَسَوُّقٌ", "شِرَاءٌ"], ["حَانَ", "جَاءَ وَقْتُهُ"]] },
  zd: { name: "Kelime ↔ zıt anlamlısı", pairs: [["فَارِغٌ", "مُمْتَلِئٌ"], ["جَمِيلَةٌ", "قَبِيحَةٌ"], ["خَاصٌّ", "عَامٌّ"], ["الأَخِيرَةُ", "الأُولَى"], ["مُخْتَلِفَةٌ", "مُتَشَابِهَةٌ"], ["الفَرَحُ", "الحُزْنُ"], ["قَدِيمٌ", "حَدِيثٌ"]] },
  cm: { name: "Tekil ↔ çoğul", pairs: [["رُكْنٌ", "أَرْكَانٌ"], ["طَعَامٌ", "أَطْعِمَةٌ"], ["مِئْذَنَةٌ", "مَآذِنُ"], ["جَامِعٌ", "جَوَامِعُ"], ["مِصْبَاحٌ", "مَصَابِيحُ"], ["مِدْفَعٌ", "مَدَافِعُ"], ["عَادَةٌ", "عَادَاتٌ"], ["شَهْرٌ", "شُهُورٌ"]] }
};
var KARTLAR = [
  ["Oruç ve Ramazan?", "الصِّيَامُ رُكْنٌ مِنْ أَرْكَانِ الإِسْلَامِ · رَمَضَانُ: أُنْزِلَ فِيهِ القُرْآنُ"],
  ["Neden sabırsızlıkla beklenir?", "شَهْرُ الرَّحْمَةِ وَالمَغْفِرَةِ وَالتَّوْبَةِ · يَنْتَظِرُونَهُ بِفَارِغِ الصَّبْرِ"],
  ["Şehirler nasıl değişir?", "تَتَنَوَّعُ الأَطْعِمَةُ · تَتَزَيَّنُ المَبَانِي وَالمَآذِنُ بِالمَصَابِيحِ · تَزْدَحِمُ الشَّوَارِعُ"],
  ["Dükkânlar?", "تَفْتَحُ أَبْوَابَهَا إِلَى سَاعَاتٍ مُتَأَخِّرَةٍ مِنَ اللَّيْلِ"],
  ["Sosyal âdetler?", "الزِّيَارَاتُ العَائِلِيَّةُ · صِلَةُ الأَرْحَامِ · تَبَادُلُ المَأْكُولَاتِ · الدَّعْوَةُ إِلَى الإِفْطَارِ"],
  ["Eski âdetler?", "مِدْفَعُ السَّحُورِ وَالإِفْطَارِ · المُسَحِّرَاتِيُّ · الحَلَوِيَّاتُ وَالمَشْرُوبَاتُ الخَاصَّةُ"],
  ["Mesaharatî?", "يَتَجَوَّلُ فِي الأَحْيَاءِ لِإِيقَاظِ الصَّائِمِينَ حَتَّى يَتَنَاوَلُوا السَّحُورَ"],
  ["Şam atasözü?", "العَشْرُ الأُوَلُ لِلْمَرَقِ · الأَوْسَطُ لِلْخِرَقِ · الأَخِيرُ لِصَرِّ الوَرَقِ"],
  ["Eş anlamlar?", "مَائِدَةٌ = سُفْرَةٌ · لَدَى = عِنْدَ · حَانَ = جَاءَ وَقْتُهُ · كُسْوَةٌ = لِبَاسٌ"],
  ["Zıt anlamlar?", "فَارِغٌ ≠ مُمْتَلِئٌ · خَاصٌّ ≠ عَامٌّ · مُخْتَلِفَةٌ ≠ مُتَشَابِهَةٌ · الفَرَحُ ≠ الحُزْنُ"],
  ["Çoğullar?", "أَرْكَانٌ · أَطْعِمَةٌ · مَآذِنُ · جَوَامِعُ · مَصَابِيحُ · مَدَافِعُ"],
  ["Harf-i cerler?", "رُكْنٌ مِنْ · يَذْهَبُ إِلَى · يَتَمَيَّزُ بِـ · لِتَنَاوُلِ · يَرِثُ عَنْ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat21";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("رُكْنٌ", "i", "şart, temel; köşe", "أَرْكَانٌ", "efal", "", "", "الصِّيَامُ رُكْنٌ مِنْ أَرْكَانِ الإِسْلَامِ.", "رُكْنٌ", "Oruç İslam’ın şartlarından biridir."),
  KW("صِيَامٌ", "i", "oruç", "", "", "صَوْمٌ", "إِفْطَارٌ", "الصِّيَامُ رُكْنٌ مِنْ أَرْكَانِ الإِسْلَامِ.", "الصِّيَامُ", "Oruç İslam’ın şartlarından biridir."),
  KW("أَنْزَلَ", "f", "indirdi (أُنْزِلَ: indirildi)", "", "", "", "", "رَمَضَانُ هُوَ الشَّهْرُ الَّذِي أُنْزِلَ فِيهِ القُرْآنُ.", "أُنْزِلَ", "Ramazan, Kur’an’ın indirildiği aydır."),
  KW("مَغْفِرَةٌ", "i", "bağışlanma", "", "", "", "", "وَهُوَ شَهْرُ الرَّحْمَةِ وَالمَغْفِرَةِ وَالتَّوْبَةِ.", "وَالمَغْفِرَةِ", "Rahmet, mağfiret ve tövbe ayıdır."),
  KW("انْتَظَرَ", "f", "bekledi", "", "", "تَرَقَّبَ", "", "يَنْتَظِرُهُ المُسْلِمُونَ بِفَارِغِ الصَّبْرِ.", "يَنْتَظِرُهُ", "Müslümanlar onu sabırsızlıkla bekler."),
  KW("فَارِغٌ", "s", "boş", "", "", "خَالٍ", "مُمْتَلِئٌ", "يَنْتَظِرُهُ المُسْلِمُونَ بِفَارِغِ الصَّبْرِ.", "بِفَارِغِ", "Onu sabırsızlıkla beklerler."),
  KW("مَكَانَةٌ", "i", "yer, değer, itibar", "", "", "مَنْزِلَةٌ", "", "وَلَهُ مَكَانَةٌ خَاصَّةٌ فِي قُلُوبِ المُسْلِمِينَ.", "مَكَانَةٌ", "Müslümanların kalbinde özel bir yeri vardır."),
  KW("خَاصٌّ", "s", "özel", "", "", "", "عَامٌّ", "وَلَهُ مَكَانَةٌ خَاصَّةٌ فِي قُلُوبِ المُسْلِمِينَ.", "خَاصَّةٌ", "Özel bir yeri vardır."),
  KW("تَنَوَّعَ", "f", "çeşitlendi", "", "", "تَعَدَّدَ", "", "فِي هَذَا الشَّهْرِ المُبَارَكِ تَتَنَوَّعُ الأَطْعِمَةُ.", "تَتَنَوَّعُ", "Bu mübarek ayda yemekler çeşitlenir."),
  KW("طَعَامٌ", "i", "yemek", "أَطْعِمَةٌ", "efile", "", "", "فِي هَذَا الشَّهْرِ المُبَارَكِ تَتَنَوَّعُ الأَطْعِمَةُ.", "الأَطْعِمَةُ", "Yemekler çeşitlenir."),
  KW("تَزَيَّنَ", "f", "süslendi", "", "", "", "", "وَتَتَزَيَّنُ المَبَانِي بِالمَصَابِيحِ.", "وَتَتَزَيَّنُ", "Binalar lambalarla süslenir."),
  KW("مَبْنًى", "i", "bina", "مَبَانٍ", "diger", "عِمَارَةٌ", "", "وَتَتَزَيَّنُ المَبَانِي بِالمَصَابِيحِ.", "المَبَانِي", "Binalar lambalarla süslenir."),
  KW("مِئْذَنَةٌ", "i", "minare", "مَآذِنُ", "mefail", "", "", "وَمَآذِنُ الجَوَامِعِ فِي كُلِّ المُدُنِ.", "وَمَآذِنُ", "Bütün şehirlerde cami minareleri."),
  KW("جَامِعٌ", "i", "cami", "جَوَامِعُ", "fevail", "مَسْجِدٌ", "", "وَمَآذِنُ الجَوَامِعِ فِي كُلِّ المُدُنِ.", "الجَوَامِعِ", "Cami minareleri."),
  KW("مِصْبَاحٌ", "i", "lamba, kandil", "مَصَابِيحُ", "mefail2", "", "", "وَتَتَزَيَّنُ المَبَانِي بِالمَصَابِيحِ.", "بِالمَصَابِيحِ", "Binalar lambalarla süslenir."),
  KW("ازْدَحَمَ", "f", "kalabalıklaştı (بِـ)", "", "", "", "", "وَتَزْدَحِمُ الشَّوَارِعُ بِالنَّاسِ وَالسَّيَّارَاتِ.", "وَتَزْدَحِمُ", "Sokaklar insanlarla ve arabalarla dolar."),
  KW("مَحَلٌّ", "i", "dükkân", "مَحَلَّاتٌ", "at", "دُكَّانٌ", "", "وَتَفْتَحُ المَحَلَّاتُ التِّجَارِيَّةُ أَبْوَابَهَا.", "المَحَلَّاتُ", "Ticari dükkânlar kapılarını açar."),
  KW("مُتَأَخِّرٌ", "s", "geç", "", "", "", "مُبَكِّرٌ", "إِلَى سَاعَاتٍ مُتَأَخِّرَةٍ مِنَ اللَّيْلِ.", "مُتَأَخِّرَةٍ", "Gecenin geç saatlerine kadar."),
  KW("رَحِمٌ", "i", "akrabalık; rahim", "أَرْحَامٌ", "efal", "", "", "تَكْثُرُ الزِّيَارَاتُ العَائِلِيَّةُ وَصِلَةُ الأَرْحَامِ.", "الأَرْحَامِ", "Aile ziyaretleri ve sıla-i rahim çoğalır."),
  KW("اسْتَضَافَ", "f", "misafir etti", "", "", "", "", "وَيَسْتَضِيفُ كُلٌّ مِنْهُمُ الآخَرَ لِتَنَاوُلِ الإِفْطَارِ.", "وَيَسْتَضِيفُ", "Herkes birbirini iftara misafir eder."),
  KW("مَائِدَةٌ", "i", "sofra", "مَوَائِدُ", "feail", "سُفْرَةٌ", "", "لِتَنَاوُلِ الإِفْطَارِ عَلَى مَائِدَتِهِ.", "مَائِدَتِهِ", "Sofrasında iftar etmek için."),
  KW("عَادَةٌ", "i", "âdet", "عَادَاتٌ", "at", "تَقْلِيدٌ", "", "وَلِلْمُدُنِ الإِسْلَامِيَّةِ عَادَاتٌ رَمَضَانِيَّةٌ.", "عَادَاتٌ", "İslam şehirlerinin ramazan âdetleri vardır."),
  KW("تَقْلِيدٌ", "i", "gelenek", "تَقَالِيدُ", "tefail", "عَادَةٌ", "", "عَادَاتٌ وَتَقَالِيدُ رَمَضَانِيَّةٌ مُتَشَابِهَةٌ.", "وَتَقَالِيدُ", "Birbirine benzeyen ramazan âdet ve gelenekleri."),
  KW("مُتَشَابِهٌ", "s", "birbirine benzer", "", "", "مُتَقَارِبٌ", "مُخْتَلِفٌ", "عَادَاتٌ وَتَقَالِيدُ رَمَضَانِيَّةٌ مُتَشَابِهَةٌ.", "مُتَشَابِهَةٌ", "Birbirine benzeyen âdetler."),
  KW("وَرِثَ", "f", "miras aldı (عَنْ)", "", "", "", "", "وَرِثُوهَا عَنْ أَجْدَادِهِمْ.", "وَرِثُوهَا", "Onları atalarından miras aldılar."),
  KW("جَدٌّ", "i", "dede, ata", "أَجْدَادٌ", "efal", "", "حَفِيدٌ", "وَرِثُوهَا عَنْ أَجْدَادِهِمْ.", "أَجْدَادِهِمْ", "Atalarından miras aldılar."),
  KW("مِدْفَعٌ", "i", "top", "مَدَافِعُ", "mefail", "", "", "الاسْتِيقَاظُ عَلَى مِدْفَعِ السَّحُورِ.", "مِدْفَعِ", "Sahur topuyla uyanmak."),
  KW("سَحُورٌ", "i", "sahur yemeği", "", "", "", "فُطُورٌ", "الاسْتِيقَاظُ عَلَى مِدْفَعِ السَّحُورِ.", "السَّحُورِ", "Sahur topuyla uyanmak."),
  KW("تَجَوَّلَ", "f", "dolaştı (فِي)", "", "", "طَافَ", "", "وَالمُسَحِّرَاتِيُّ الَّذِي يَتَجَوَّلُ فِي الأَحْيَاءِ.", "يَتَجَوَّلُ", "Mahallelerde dolaşan davulcu."),
  KW("إِيقَاظٌ", "i", "uyandırma", "", "", "", "إِنَامَةٌ", "يَتَجَوَّلُ فِي الأَحْيَاءِ لِإِيقَاظِ الصَّائِمِينَ.", "لِإِيقَاظِ", "Oruçluları uyandırmak için dolaşır."),
  KW("صَائِمٌ", "i", "oruçlu", "صَائِمُونَ", "un", "", "مُفْطِرٌ", "يَتَجَوَّلُ فِي الأَحْيَاءِ لِإِيقَاظِ الصَّائِمِينَ.", "الصَّائِمِينَ", "Oruçluları uyandırmak için."),
  KW("فَضِيلٌ", "s", "faziletli, değerli", "", "", "مُبَارَكٌ", "", "الحَلَوِيَّاتُ الخَاصَّةُ بِهَذَا الشَّهْرِ الفَضِيلِ.", "الفَضِيلِ", "Bu faziletli aya özgü tatlılar."),
  KW("مَثَلٌ", "i", "atasözü; örnek", "أَمْثَالٌ", "efal", "", "", "فَهُنَاكَ مَثَلٌ مَشْهُورٌ لَدَى أَهْلِ دِمَشْقَ.", "مَثَلٌ", "Şamlılar arasında meşhur bir atasözü vardır."),
  KW("لَدَى", "h", "…de, katında", "", "", "عِنْدَ", "", "فَهُنَاكَ مَثَلٌ مَشْهُورٌ لَدَى أَهْلِ دِمَشْقَ.", "لَدَى", "Şamlılar arasında meşhur bir atasözü."),
  KW("تَحْضِيرٌ", "i", "hazırlama", "", "", "تَجْهِيزٌ", "", "أَيْ لِتَحْضِيرِ وَجَبَاتِ الطَّعَامِ.", "لِتَحْضِيرِ", "Yani yemek hazırlamak için."),
  KW("وَجْبَةٌ", "i", "öğün", "وَجَبَاتٌ", "at", "", "", "أَيْ لِتَحْضِيرِ وَجَبَاتِ الطَّعَامِ.", "وَجَبَاتِ", "Yani yemek öğünlerini hazırlamak için."),
  KW("حَانَ", "f", "vakti geldi", "", "", "جَاءَ وَقْتُهُ", "", "حَانَ وَقْتُ الإِفْطَارِ، فَاجْتَمَعَتِ الأُسْرَةُ.", "حَانَ", "İftar vakti geldi, aile toplandı."),
  KW("كُسْوَةٌ", "i", "giysi, elbise", "كُسًى", "diger", "لِبَاسٌ", "", "اشْتَرَى الأَبُ كُسْوَةَ العِيدِ لِأَوْلَادِهِ.", "كُسْوَةَ", "Baba çocuklarına bayramlık aldı.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"efal":["أَفْعَالٌ","ef’âl","أَرْكَانٌ، أَجْدَادٌ، أَمْثَالٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ"],"mefail":["مَفَاعِلُ","mefâil","مَآذِنُ، مَدَافِعُ"],"mefail2":["مَفَاعِيلُ","mefâîl","مَصَابِيحُ، مَفَاتِيحُ"],"fevail":["فَوَاعِلُ","fevâil","جَوَامِعُ، شَوَارِعُ"],"feail":["فَعَائِلُ","feâil","مَوَائِدُ، رَسَائِلُ"],"tefail":["تَفَاعِيلُ","tefâîl","تَقَالِيدُ"],"at":["ـَاتٌ","cem-i müennes sâlim","مَحَلَّاتٌ، عَادَاتٌ، وَجَبَاتٌ"],"un":["ـُونَ","cem-i müzekker sâlim","صَائِمُونَ"],"diger":["…","başka kalıplar","مَبَانٍ، كُسًى"]};
