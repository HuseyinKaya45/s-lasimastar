// ================= VERİ: kitaptaki dört ders (kelime ve isim bilgisi) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" olan parça düz metindir (seçilmez).
var ROLES = {
  ism: { ar: "اسْمٌ", tr: "İsim" }, fiil: { ar: "فِعْلٌ", tr: "Fiil" }, harf: { ar: "حَرْفٌ", tr: "Harf" },
  muz: { ar: "مُذَكَّرٌ", tr: "Müzekker" }, mun: { ar: "مُؤَنَّثٌ", tr: "Müennes" },
  muf: { ar: "مُفْرَدٌ", tr: "Müfred" }, mus: { ar: "مُثَنًّى", tr: "Müsennâ" }, cem: { ar: "جَمْعٌ", tr: "Cem" },
  nek: { ar: "نَكِرَةٌ", tr: "Nekire" }, mar: { ar: "مَعْرِفَةٌ", tr: "Marife" },
  y: { ar: "✓", tr: "Seçili" }
};
var CEM_OPTS = [["mzs", "Cem-i müzekker sâlim", "جَمْعُ المُذَكَّرِ السَّالِمُ", "muz"], ["mns", "Cem-i müennes sâlim", "جَمْعُ المُؤَنَّثِ السَّالِمُ", "mun"], ["tks", "Cem-i teksîr", "جَمْعُ التَّكْسِيرِ", "cem"]];
var SAYI_OPTS = [["muf", "Müfred", "مُفْرَدٌ", "muf"], ["mus", "Müsennâ", "مُثَنًّى", "mus"], ["cem", "Cem", "جَمْعٌ", "cem"]];
var KELIME_OPTS = [["ism", "İsim", "اسْمٌ", "ism"], ["fiil", "Fiil", "فِعْلٌ", "fiil"], ["harf", "Harf", "حَرْفٌ", "harf"]];
var MARIFE_OPTS = [["zamir", "Zamir", "الضَّمِيرُ", "mar"], ["isaret", "İsm-i işaret", "اسْمُ الإِشَارَةِ", "mar"], ["mevsul", "İsm-i mevsûl", "الاسْمُ المَوْصُولُ", "mar"], ["alem", "Alem (özel isim)", "العَلَمُ", "mar"], ["al", "ال ile", "المُعَرَّفُ بِأَلْ", "mar"], ["izafet", "İzafetle", "المُضَافُ إِلَى المَعْرِفَةِ", "mar"]];

var UNITS = [
// ---------------------------------------------------------------- 1
{
  id: "u1", no: 1, ar: "أَقْسَامُ الكَلِمَةِ", tr: "Kelimenin Kısımları", short: "Kelime", col: "ism",
  goals: ["Kelimenin üç kısmını ayırmak: isim, fiil, harf", "İsmin gösterdiği altı alanı tanımak", "Cümledeki her kelimenin kısmını bulmak"],
  examples: [
    { s: "عَلِيٌّ:ism / طَالِبٌ:ism / فِي:harf / كُلِّيَّةِ:ism / العُلُومِ:ism / الإِسْلَامِيَّةِ:ism", tr: "Ali İslâmî İlimler Fakültesinde öğrencidir." },
    { s: "مَحْمُودٌ:ism / مُدَرِّسٌ:ism / فِي:harf / الجَامِعَةِ:ism", tr: "Mahmûd üniversitede öğretmendir." },
    { s: "رَجَعَ:fiil / خَالِدٌ:ism / مِنَ:harf / السُّوقِ:ism", tr: "Hâlid çarşıdan döndü." },
    { s: "قَرَأَ:fiil / عَلِيٌّ:ism / الكِتَابَ:ism", tr: "Ali kitabı okudu." },
    { s: "شَرَحَ:fiil / مَحْمُودٌ:ism / الدَّرْسَ:ism", tr: "Mahmûd dersi anlattı." },
    { s: "ذَهَبَ:fiil / الرَّجُلُ:ism / إِلَى:harf / المَسْجِدِ:ism", tr: "Adam mescide gitti." }
  ],
  rules: [
    { tr: "Kelime üç kısma ayrılır: <b class=\"r-ism\">isim</b>, <b class=\"r-fiil\">fiil</b> ve <b class=\"r-harf\">harf</b>.", ex: ["اسْمٌ: عَلِيٌّ، طَالِبٌ، السُّوقُ", "فِعْلٌ: رَجَعَ، قَرَأَ، ذَهَبَ", "حَرْفٌ: فِي، مِنْ، إِلَى"] },
    { tr: "<b class=\"r-ism\">İsim</b>; insan, hayvan, bitki, mekân, zaman ya da cansız bir varlığı gösterir.", ex: ["مُحَمَّدٌ، جَمَلٌ، تُفَّاحٌ، مَسْجِدٌ، صَبَاحٌ، قَلَمٌ"] },
    { tr: "<b class=\"r-fiil\">Fiil</b>, belli bir zamanda bir işin olduğunu bildirir.", ex: ["رَجَعَ، قَرَأَ، شَرَحَ، ذَهَبَ"] },
    { tr: "<b class=\"r-harf\">Harf</b>in tek başına anlamı yoktur; ancak isim ve fiillerle birlikte anlam kazanır.", ex: ["فِي، مِنْ، إِلَى"] },
    { tr: "İpucu: tenvin (ـٌ ـً ـٍ) ve başta <span class=\"ar\">الـ</span> varsa kelime isimdir. Zamirler (<span class=\"ar\">هُوَ، أَنَا</span>), <span class=\"ar\">الآنَ، قَبْلَ، جِدًّا</span> gibi kelimeler de isimdir." }
  ],
  kaide: [
    "أ ـ الكَلِمَةُ تَنْقَسِمُ إِلَى ثَلَاثَةِ أَقْسَامٍ: اسْمٌ وَفِعْلٌ وَحَرْفٌ.",
    "ب ـ الاسْمُ يَدُلُّ عَلَى: إِنْسَانٍ أَوْ حَيَوَانٍ أَوْ نَبَاتٍ أَوْ مَكَانٍ أَوْ زَمَانٍ أَوْ جَمَادٍ.",
    "ج ـ الفِعْلُ يَدُلُّ عَلَى حُدُوثِ شَيْءٍ فِي زَمَانٍ خَاصٍّ، مِثْلُ: رَجَعَ، قَرَأَ، شَرَحَ، ذَهَبَ.",
    "د ـ الحَرْفُ لَيْسَ لَهُ مَعْنًى إِلَّا مَعَ غَيْرِهِ مِنَ الأَسْمَاءِ وَالأَفْعَالِ، مِثْلُ: فِي، مِنْ، إِلَى."
  ],
  ex: [
    { type: "classify", opts: KELIME_OPTS, ar: "عَيِّنِ الاسْمَ وَالفِعْلَ وَالحَرْفَ فِي الكَلِمَاتِ التَّالِيَةِ", tr: "Kelime isim mi, fiil mi, harf mi?",
      exHtml: "<span class=\"ar\">سَكَتَ ← فِعْلٌ · كِتَابٌ ← اسْمٌ · فِي ← حَرْفٌ</span>", items: [
      { s: "شَاهِدٌ", a: "ism", tr: "şahit", why: "Tenvin var: isim." }, { s: "عَالِمٌ", a: "ism", tr: "âlim", why: "Tenvin var: isim." },
      { s: "إِلَى", a: "harf", tr: "-e, -a doğru" }, { s: "شَرِبَ", a: "fiil", tr: "içti" }, { s: "نَظَرَ", a: "fiil", tr: "baktı" },
      { s: "مَنْصُورٌ", a: "ism", tr: "Mansûr (özel isim)" }, { s: "مِنْ", a: "harf", tr: "-den" }, { s: "سَلِمَ", a: "fiil", tr: "kurtuldu, esen kaldı" }
    ]},
    { type: "tag", roles: ["ism", "fiil", "harf"], ar: "عَيِّنْ فِي الجُمَلِ التَّالِيَةِ الاسْمَ وَالفِعْلَ وَالحَرْفَ", tr: "Her kelimeye dokunarak kısmını seç.",
      exHtml: "<span class=\"ar\">دَرَسَ أَحْمَدُ فِي الجَامِعَةِ: اسْمٌ (أَحْمَدُ، الجَامِعَةِ) · فِعْلٌ (دَرَسَ) · حَرْفٌ (فِي)</span>", items: [
      { c: "أَكَلَ:fiil / حُسَيْنٌ:ism / مِنَ:harf / الطَّعَامِ:ism", tr: "Hüseyin yemekten yedi." },
      { c: "شَرِبَ:fiil / خَالِدٌ:ism / العَصِيرَ:ism / فِي:harf / المَسَاءِ:ism", tr: "Hâlid akşam meyve suyu içti." },
      { c: "جَلَسَ:fiil / الأُسْتَاذُ:ism / عَلَى:harf / الكُرْسِيِّ:ism", tr: "Hoca sandalyeye oturdu." },
      { c: "خَرَجَ:fiil / الوَالِدُ:ism / مِنَ:harf / المَنْزِلِ:ism", tr: "Baba evden çıktı." },
      { c: "وَضَعَ:fiil / الطَّبِيبُ:ism / القَلَمَ:ism / عَلَى:harf / الطَّاوِلَةِ:ism", tr: "Doktor kalemi masanın üstüne koydu." },
      { c: "نَظَرَ:fiil / المُهَنْدِسُ:ism / إِلَى:harf / الصُّورَةِ:ism", tr: "Mühendis resme baktı." },
      { c: "حَضَرَ:fiil / مُحَمَّدٌ:ism / وَ:harf / حَسَنٌ:ism", tr: "Muhammed ve Hasan geldi.", why: "<span class=\"ar\">وَ</span> (ve) da bir harftir." },
      { c: "دَخَلَ:fiil / الضَّيْفُ:ism / غُرْفَةَ:ism / الجُلُوسِ:ism", tr: "Misafir oturma odasına girdi." }
    ]},
    { type: "tag", roles: ["ism", "fiil", "harf"], ar: "عَيِّنْ فِيمَا يَلِي الاسْمَ وَالفِعْلَ وَالحَرْفَ", tr: "Âyet, hadis ve cümlelerde isim, fiil ve harfi belirle.", items: [
      { pre: "﴿", c: "خَتَمَ:fiil / اللهُ:ism / عَلَى:harf / قُلُوبِهِمْ:ism / وَ:harf / عَلَى:harf / سَمْعِهِمْ:ism", post: "﴾ (البقرة: ٧)", tr: "Allah onların kalplerini ve kulaklarını mühürlemiştir.", why: "<span class=\"ar\">قُلُوبِهِمْ</span>: isim + zamir; bütün kelime isim sayılır." },
      { pre: "قَالَ النَّبِيُّ ﷺ:", c: "كُلُّ:ism / مَعْرُوفٍ:ism / صَدَقَةٌ:ism", tr: "Her iyilik bir sadakadır.", why: "Bu cümlede fiil ve harf yok: üç kelime de isim." },
      { pre: "قَالَ النَّبِيُّ ﷺ:", c: "الطُّهُورُ:ism / نِصْفُ:ism / الإِيمَانِ:ism", tr: "Temizlik imanın yarısıdır.", why: "Üç kelime de isim." },
      { pre: "قَالَ النَّبِيُّ ﷺ:", c: "الحَيَاءُ:ism / مِنَ:harf / الإِيمَانِ:ism", tr: "Hayâ imandandır." },
      { c: "ذَهَبَ:fiil / الطُّلَّابُ:ism / إِلَى:harf / المَدْرَسَةِ:ism", tr: "Öğrenciler okula gitti." },
      { c: "كَتَبَ:fiil / الطَّالِبُ:ism / بِـ:harf / القَلَمِ:ism", tr: "Öğrenci kalemle yazdı.", why: "<span class=\"ar\">بِالقَلَمِ</span> = <span class=\"ar\">بِـ</span> (harf) + <span class=\"ar\">القَلَمِ</span> (isim)." },
      { c: "جَلَسَ:fiil / عَبَّاسٌ:ism / فِي:harf / الحَدِيقَةِ:ism", tr: "Abbâs bahçede oturdu." },
      { c: "شَرِبَ:fiil / كَرِيمٌ:ism / المَاءَ:ism / بِـ:harf / البَسْمَلَةِ:ism", tr: "Kerîm suyu besmeleyle içti." }
    ]},
    { type: "pick", fill: true, ar: "امْلَأِ الفَرَاغَ بِاسْمٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa uygun ismi koy.",
      exHtml: "<span class=\"ar\">فَهِمَ الطَّالِبُ <u>الدَّرْسَ</u>.</span> <span class=\"muted\">(الدَّرْسَ – الطَّاوِلَةَ – الكُرْسِيَّ)</span>", items: [
      { q: "أَكَلَ الرَّجُلُ ___.", o: ["الشَّارِعَ", "البُرْتُقَالَ", "المَدِينَةَ"], a: 1, tr: "Adam portakalı yedi." },
      { q: "قَرَأَ ___ سُورَةَ الفَاتِحَةِ.", o: ["الكِتَابُ", "الرِّسَالَةُ", "الإِمَامُ"], a: 2, tr: "İmam Fâtiha sûresini okudu." },
      { q: "كَتَبَ جَمِيلٌ ___.", o: ["رِسَالَةً", "ذَهَبَ", "عَلَى"], a: 0, tr: "Cemîl bir mektup yazdı." },
      { q: "سَمِعَ الأَبُ ___.", o: ["الشَّارِعَ", "الأَخْبَارَ", "المِلْحَ"], a: 1, tr: "Baba haberleri dinledi." },
      { q: "لَعِبَ سُلَيْمَانُ بِـ___.", o: ["الغُرْفَةِ", "الكُرَةِ", "مِنْ"], a: 1, tr: "Süleyman topla oynadı." },
      { q: "جَلَسَ الأُسْتَاذُ عَلَى ___.", o: ["الصَّفِّ", "الكُرْسِيِّ", "ذَهَبَ"], a: 1, tr: "Hoca sandalyeye oturdu." },
      { q: "دَخَلَتْ فَاطِمَةُ ___.", o: ["الغُرْفَةَ", "الكِتَابَ", "الدَّفْتَرَ"], a: 0, tr: "Fâtıma odaya girdi." },
      { q: "وَضَعَ الطَّالِبُ ___ عَلَى الطَّاوِلَةِ.", o: ["الحَافِلَةَ", "السَّيَّارَةَ", "الكَأْسَ"], a: 2, tr: "Öğrenci bardağı masaya koydu." }
    ]},
    { type: "pick", fill: true, ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa uygun fiili koy.",
      exHtml: "<span class=\"ar\"><u>نَجَحَ</u> الطَّالِبُ فِي الامْتِحَانِ.</span> <span class=\"muted\">(نَجَحَ – خَرَجَ – ذَهَبَ)</span>", items: [
      { q: "___ خَالِدٌ مِنَ الغُرْفَةِ.", o: ["فِي", "خَرَجَ", "مَحْمُودٌ"], a: 1, tr: "Hâlid odadan çıktı." },
      { q: "___ عَلِيٌّ فِي الجَامِعَةِ.", o: ["دَرَسَ", "الكِتَابُ", "خَرَجَ"], a: 0, tr: "Ali üniversitede okudu." },
      { q: "___ خَلِيلٌ إِلَى البَحْرِ.", o: ["لَعِبَ", "لَبِسَ", "نَظَرَ"], a: 2, tr: "Halîl denize baktı." },
      { q: "___ الوَلَدُ العَصِيرَ.", o: ["شَرِبَ", "سَمِعَ", "فَهِمَ"], a: 0, tr: "Çocuk meyve suyunu içti." },
      { q: "___ الأُسْتَاذُ السَّيَّارَةَ.", o: ["نَزَلَ", "رَكِبَ", "ذَهَبَ"], a: 1, tr: "Hoca arabaya bindi." },
      { q: "___ المُسَافِرُ مِنَ الطَّائِرَةِ.", o: ["نَزَلَ", "لَعِبَ", "فَهِمَ"], a: 0, tr: "Yolcu uçaktan indi." },
      { q: "___ السَّائِحُ قَصْرَ طُوبْقَابِي.", o: ["ذَهَبَ", "أَكَلَ", "دَخَلَ"], a: 2, tr: "Turist Topkapı Sarayı'na girdi." },
      { q: "___ المُدَرِّسُ القَلَمَ وَالكِتَابَ.", o: ["أَخَذَ", "خَرَجَ", "فَهِمَ"], a: 0, tr: "Öğretmen kalemi ve kitabı aldı." }
    ]},
    { type: "pick", fill: true, ar: "امْلَأِ الفَرَاغَ بِحَرْفٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa uygun harfi koy.",
      exHtml: "<span class=\"ar\">نَزَلَ الرَّاكِبُ <u>مِنَ</u> الحَافِلَةِ.</span> <span class=\"muted\">(مِنْ – إِلَى – بِـ)</span>", items: [
      { q: "نَظَرَتْ زَيْنَبُ ___ النَّافِذَةِ.", o: ["فِي", "مِنَ", "بِـ"], a: 1, tr: "Zeyneb pencereden baktı." },
      { q: "جَلَسَ الطَّالِبُ ___أَدَبٍ.", o: ["بِـ", "إِلَى", "وَ"], a: 0, tr: "Öğrenci edeple oturdu." },
      { q: "سَأَلَ الأُسْتَاذُ ___ الطَّالِبِ.", o: ["مِنْ", "إِلَى", "عَنِ"], a: 2, tr: "Hoca öğrenciyi sordu." },
      { q: "شَرِبَ الطِّفْلُ العَصِيرَ ___الكَأْسِ.", o: ["بِـ", "إِلَى", "وَ"], a: 0, tr: "Çocuk meyve suyunu bardakla içti." },
      { q: "أَكَلَ الأَبُ الطَّعَامَ ___المِلْعَقَةِ.", o: ["إِلَى", "فِي", "بِـ"], a: 2, tr: "Baba yemeği kaşıkla yedi." },
      { q: "حَضَرَ الأُسْتَاذُ ___ الكُلِّيَّةِ.", o: ["إِلَى", "عَلَى", "فِي"], a: 0, tr: "Hoca fakülteye geldi." },
      { q: "أَخَذَتْ زَيْنَبُ ___ الصَّدِيقَةِ كِتَابًا.", o: ["فِي", "مِنَ", "بِـ"], a: 1, tr: "Zeyneb arkadaşından bir kitap aldı." },
      { q: "رَجَعَ الوَالِدُ ___ العَمَلِ.", o: ["مِنَ", "عَلَى", "فِي"], a: 0, tr: "Baba işten döndü." }
    ]},
    { type: "tag", roles: ["ism", "fiil", "harf"], reading: true, ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ وَعَيِّنِ الاسْمَ وَالفِعْلَ وَالحَرْفَ", tr: "Parçayı oku; cümlelerdeki her kelimenin kısmını belirle.",
      title: "اليَوْمُ الأَوَّلُ فِي الجَامِعَةِ",
      text: "نَجَحَ مُحَمَّدٌ فِي الامْتِحَانِ وَدَخَلَ كُلِّيَّةَ الإِلَهِيَّاتِ. حَضَرَ مِنْ بَلَدِهِ قَبْلَ أُسْبُوعٍ. وَهُوَ الآنَ فِي الصَّفِّ التَّمْهِيدِيِّ. هَذِهِ السَّنَةَ سَيَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ فِي الكُلِّيَّةِ. اللُّغَةُ العَرَبِيَّةُ مُهِمَّةٌ جِدًّا، لِأَنَّهَا لُغَةُ القُرْآنِ الكَرِيمِ وَالسُّنَّةِ النَّبَوِيَّةِ. وَفِي نِهَايَةِ السَّنَةِ سَيَفْهَمُ مُحَمَّدٌ الكُتُبَ العَرَبِيَّةَ.",
      textTr: "Muhammed sınavı kazandı ve İlahiyat Fakültesine girdi. Bir hafta önce memleketinden geldi. Şimdi hazırlık sınıfında. Bu yıl fakültede Arapça öğrenecek. Arapça çok önemlidir, çünkü Kur'ân-ı Kerîm'in ve Nebevî sünnetin dilidir. Yılın sonunda Muhammed Arapça kitapları anlayacak.",
      items: [
      { c: "نَجَحَ:fiil / مُحَمَّدٌ:ism / فِي:harf / الامْتِحَانِ:ism / وَ:harf / دَخَلَ:fiil / كُلِّيَّةَ:ism / الإِلَهِيَّاتِ:ism", tr: "Muhammed sınavı kazandı ve İlahiyat Fakültesine girdi." },
      { c: "حَضَرَ:fiil / مِنْ:harf / بَلَدِهِ:ism / قَبْلَ:ism / أُسْبُوعٍ:ism", tr: "Bir hafta önce memleketinden geldi.", why: "<span class=\"ar\">قَبْلَ</span> (önce) zaman bildiren bir isimdir." },
      { c: "وَ:harf / هُوَ:ism / الآنَ:ism / فِي:harf / الصَّفِّ:ism / التَّمْهِيدِيِّ:ism", tr: "O şimdi hazırlık sınıfındadır.", why: "Zamir <span class=\"ar\">هُوَ</span> ve zaman kelimesi <span class=\"ar\">الآنَ</span> isimdir." },
      { c: "هَذِهِ:ism / السَّنَةَ:ism / سَيَتَعَلَّمُ:fiil / اللُّغَةَ:ism / العَرَبِيَّةَ:ism / فِي:harf / الكُلِّيَّةِ:ism", tr: "Bu yıl fakültede Arapça öğrenecek.", why: "İşaret ismi <span class=\"ar\">هَذِهِ</span> bir isimdir." },
      { c: "اللُّغَةُ:ism / العَرَبِيَّةُ:ism / مُهِمَّةٌ:ism / جِدًّا:ism", tr: "Arapça çok önemlidir.", why: "<span class=\"ar\">جِدًّا</span> tenvinli bir isimdir." },
      { c: "وَ:harf / فِي:harf / نِهَايَةِ:ism / السَّنَةِ:ism / سَيَفْهَمُ:fiil / مُحَمَّدٌ:ism / الكُتُبَ:ism / العَرَبِيَّةَ:ism", tr: "Yılın sonunda Muhammed Arapça kitapları anlayacak." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2
{
  id: "u2", no: 2, ar: "الاسْمُ المُذَكَّرُ وَالاسْمُ المُؤَنَّثُ", tr: "Müzekker ve Müennes İsim", short: "Müzekker–Müennes", col: "mun",
  goals: ["Müzekker ve müennes ismi ayırmak", "Müennesin üç alametini tanımak: ة / ى / اء", "Bir cümleyi müennese ya da müzekkere çevirmek"],
  examples: [
    { s: "جَعْفَرٌ:muz / مُدَرِّسٌ:muz / مُخْلِصٌ:muz", tr: "Ca'fer ihlâslı bir öğretmendir.", pair: "زَيْنَبُ:mun / مُدَرِّسَةٌ:mun / مُخْلِصَةٌ:mun", pairTr: "Zeyneb ihlâslı bir öğretmendir." },
    { s: "أَجْلِسُ:- / مَعَ:- / خَالِدٍ:muz / وَ:- / مُحَمَّدٍ:muz", tr: "Hâlid ve Muhammed ile oturuyorum.", pair: "أَجْلِسُ:- / مَعَ:- / لَيْلَى:mun / وَ:- / سَمْرَاءَ:mun", pairTr: "Leylâ ve Semrâ ile oturuyorum." },
    { s: "دَخَلَ:- / المُدِيرُ:muz / الصَّفَّ:muz", tr: "Müdür sınıfa girdi.", pair: "دَخَلَتِ:- / المُدِيرَةُ:mun / الصَّفَّ:muz", pairTr: "Müdire sınıfa girdi." }
  ],
  rules: [
    { tr: "İsim cinsiyet bakımından iki türlüdür: <b class=\"r-muz\">müzekker</b> ve <b class=\"r-mun\">müennes</b>." },
    { tr: "<b class=\"r-muz\">Müzekker</b>: erkeği gösteren ya da müennes alameti taşımayan isimdir.", ex: ["جَعْفَرٌ، المُدِيرُ، مُخْلِصٌ، قَلَمٌ"] },
    { tr: "<b class=\"r-mun\">Müennes</b>: dişiyi gösteren ya da müennes alameti taşıyan isimdir.", ex: ["زَيْنَبُ، المُدِيرَةُ، حَمْرَاءُ، كُبْرَى، حَقِيبَةٌ"] },
    { tr: "Müennesin üç alameti vardır: <b>tâ-i merbûta</b> (ـة / ة), <b>elif-i maksûre</b> (ى) ve <b>elif-i memdûde</b> (اء).", ex: ["حَقِيبَةٌ", "كُبْرَى", "حَمْرَاءُ"] },
    { tr: "<b>Bilgi:</b> Bazı isimler alamet taşımadığı hâlde müennes kabul edilir (semâî müennes): <span class=\"ar\">الشَّمْسُ، الأَرْضُ، النَّفْسُ، الحَرْبُ، الدَّارُ</span>. Sondaki hemze kökün harfi ise alamet değildir: <span class=\"ar\">الغَدَاءُ</span> (öğle yemeği) müzekkerdir." }
  ],
  kaide: [
    "الاسْمُ مِنْ حَيْثُ الجِنْسُ نَوْعَانِ: مُذَكَّرٌ وَمُؤَنَّثٌ.",
    "١ـ الاسْمُ المُذَكَّرُ: هُوَ الاسْمُ الدَّالُّ عَلَى ذَكَرٍ أَوِ الاسْمُ الخَالِي مِنْ عَلَامَاتِ التَّأْنِيثِ. مِثْلُ: جَعْفَرٌ، المُدِيرُ، مُخْلِصٌ، قَلَمٌ.",
    "٢ـ الاسْمُ المُؤَنَّثُ: هُوَ الاسْمُ الدَّالُّ عَلَى أُنْثَى أَوِ الاسْمُ الشَّامِلُ عَلَامَةَ التَّأْنِيثِ. مِثْلُ: زَيْنَبُ، المُدِيرَةُ، حَمْرَاءُ، كُبْرَى، حَقِيبَةٌ.",
    "عَلَامَاتُ التَّأْنِيثِ ثَلَاثَةٌ: التَّاءُ المَرْبُوطَةُ (ـة / ة)، وَالأَلِفُ المَقْصُورَةُ (ى)، وَالأَلِفُ المَمْدُودَةُ (اء)."
  ],
  ex: [
    { type: "tag", roles: ["muz", "mun"], reading: true, ar: "اقْرَأِ الفِقْرَةَ التَّالِيَةَ ثُمَّ عَيِّنِ الاسْمَ المُذَكَّرَ وَالاسْمَ المُؤَنَّثَ", tr: "Kesik çizgili isimlere dokunarak müzekker mi, müennes mi olduğunu seç.",
      title: "عَائِلَةُ مُحَمَّدٍ",
      text: "خَرَجَ مُحَمَّدٌ مِنَ المَدْرَسَةِ، فَرَكِبَ الحَافِلَةَ، وَصَلَ إِلَى البَيْتِ، رَأَى وَالِدَهُ وَأُمَّهُ فِي الحَدِيقَةِ فَسَلَّمَ عَلَيْهِمَا، وَبَعْدَ فَتْرَةٍ قَصِيرَةٍ جَاءَ أَخُوهُ إِسْمَاعِيلُ وَأُخْتُهُ سَلْمَى مِنَ المَدْرَسَةِ. فَجَلَسَ الكُلُّ حَوْلَ المَائِدَةِ لِطَعَامِ الغَدَاءِ، ثُمَّ ذَهَبَ مُحَمَّدٌ إِلَى غُرْفَةِ النَّوْمِ وَدَخَلَتْ أُمُّهُ المَطْبَخَ وَغَسَلَتِ الأَطْبَاقَ.",
      textTr: "Muhammed okuldan çıktı, otobüse bindi, eve vardı. Babasını ve annesini bahçede gördü, onlara selam verdi. Kısa bir süre sonra kardeşi İsmâîl ve kız kardeşi Selmâ okuldan geldi. Hepsi öğle yemeği için sofranın etrafına oturdu. Sonra Muhammed yatak odasına gitti; annesi mutfağa girip tabakları yıkadı.",
      items: [
      { c: "خَرَجَ:- / مُحَمَّدٌ:muz / مِنَ:- / المَدْرَسَةِ:mun / ، فَرَكِبَ:- / الحَافِلَةَ:mun / ، وَصَلَ إِلَى:- / البَيْتِ:muz", tr: "Muhammed okuldan çıktı, otobüse bindi, eve vardı." },
      { c: "رَأَى:- / وَالِدَهُ:muz / وَ:- / أُمَّهُ:mun / فِي:- / الحَدِيقَةِ:mun", tr: "Babasını ve annesini bahçede gördü.", why: "<span class=\"ar\">أُمٌّ</span> alamet taşımaz ama dişiyi gösterir: müennes." },
      { c: "بَعْدَ:- / فَتْرَةٍ:mun / قَصِيرَةٍ:mun / جَاءَ:- / أَخُوهُ:muz / إِسْمَاعِيلُ:muz / وَ:- / أُخْتُهُ:mun / سَلْمَى:mun", tr: "Kısa bir süre sonra kardeşi İsmâîl ve kız kardeşi Selmâ geldi.", why: "<span class=\"ar\">سَلْمَى</span>: elif-i maksûre (ى) ve dişi adı. <span class=\"ar\">أُخْتٌ</span>: dişiyi gösterir." },
      { c: "فَجَلَسَ:- / الكُلُّ:muz / حَوْلَ:- / المَائِدَةِ:mun / لِـ:- / طَعَامِ:muz / الغَدَاءِ:muz", tr: "Hepsi öğle yemeği için sofranın etrafına oturdu.", why: "Tuzak: <span class=\"ar\">الغَدَاءِ</span> müzekkerdir; sondaki hemze kökün harfidir (غ د و), müennes alameti değil." },
      { c: "ذَهَبَ:- / مُحَمَّدٌ:muz / إِلَى:- / غُرْفَةِ:mun / النَّوْمِ:muz / وَدَخَلَتْ:- / أُمُّهُ:mun / المَطْبَخَ:muz", tr: "Muhammed yatak odasına gitti; annesi mutfağa girdi." }
    ]},
    { type: "pick", fill: true, ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الكَلِمَةِ المُنَاسِبَةِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Uygun kelimeyi seç: isme cinsiyette uymalı.",
      exHtml: "<span class=\"ar\">جَامِعَةُ مَرْمَرَةَ جَامِعَةٌ <u>كَبِيرَةٌ</u>.</span> <span class=\"muted\">(كَبِيرٌ – كَبِيرَةٌ)</span>", items: [
      { q: "عَدْنَانُ ___ فِي شَرِكَةِ الطَّيَرَانِ.", o: ["مُهَنْدِسٌ", "مُهَنْدِسَةٌ"], a: 0, tr: "Adnân havayolu şirketinde mühendistir." },
      { q: "خَدِيجَةُ ___ فِي المَدْرَسَةِ الثَّانَوِيَّةِ.", o: ["مُدَرِّسٌ", "مُدَرِّسَةٌ"], a: 1, tr: "Hadîce lisede öğretmendir." },
      { q: "إِبْرَاهِيمُ ___ فِي كُلِّيَّةِ الآدَابِ.", o: ["أُسْتَاذٌ", "أُسْتَاذَةٌ"], a: 0, tr: "İbrâhîm Edebiyat Fakültesinde hocadır." },
      { q: "القَاهِرَةُ مَدِينَةٌ ___.", o: ["قَدِيمٌ", "قَدِيمَةٌ"], a: 1, tr: "Kahire eski bir şehirdir." },
      { q: "لِمَنْ هَذِهِ السَّيَّارَةُ ___؟", o: ["الجَدِيدُ", "الجَدِيدَةُ"], a: 1, tr: "Bu yeni araba kimin?" },
      { q: "الكِتَابُ صَدِيقٌ ___.", o: ["وَفِيٌّ", "وَفِيَّةٌ"], a: 0, tr: "Kitap vefalı bir dosttur." },
      { q: "التَّدْخِينُ ___ بِالصِّحَّةِ.", o: ["مُضِرٌّ", "مُضِرَّةٌ"], a: 0, tr: "Sigara içmek sağlığa zararlıdır." },
      { q: "اللُّغَةُ ___ لُغَةُ القُرْآنِ.", o: ["العَرَبِيُّ", "العَرَبِيَّةُ"], a: 1, tr: "Arapça Kur'an'ın dilidir." }
    ]},
    { type: "bank", ar: "اخْتَرْ مِنَ العَمُودِ (ب) مَا يُنَاسِبُ كَلِمَاتِ العَمُودِ (أ) بِحَيْثُ تُكَوِّنُ جُمَلًا مُفِيدَةً", tr: "Önce aşağıdan (B) bir parça seç, sonra uygun başlangıca (A) dokun. Cinsiyet uyumuna dikkat!",
      bank: ["جَالِسٌ فِي المَكْتَبَةِ.", "مُرْتَفِعَةٌ فِي السَّمَاءِ.", "شُجَاعٌ.", "بِنْتٌ نَاجِحَةٌ فِي المَدْرَسَةِ.", "مُشْرِقَةٌ اليَوْمَ.", "سَهْلٌ.", "غَالِيَةً.", "مُخْلِصَةٌ فِي عَمَلِهَا."],
      items: [
      { pre: "عَائِشَةُ", a: [3, 7], tr: "Âişe okulda başarılı bir kızdır." },
      { pre: "المُدِيرَةُ", a: [7, 3], tr: "Müdire işinde ihlâslıdır." },
      { pre: "الامْتِحَانُ", a: [5], tr: "Sınav kolaydır." },
      { pre: "اشْتَرَيْتُ حَقِيبَةً", a: [6], tr: "Pahalı bir çanta satın aldım." },
      { pre: "الطَّالِبُ", a: [0, 2], tr: "Öğrenci kütüphanede oturuyor." },
      { pre: "الطَّائِرَةُ", a: [1], tr: "Uçak gökyüzünde yüksektedir." },
      { pre: "الجُنْدِيُّ", a: [2, 0], tr: "Asker cesurdur." },
      { pre: "الشَّمْسُ", a: [4, 1], tr: "Güneş bugün parlıyor.", why: "<span class=\"ar\">الشَّمْسُ</span> alametsiz (semâî) müennestir." }
    ]},
    { type: "pick", ar: "حَوِّلْ إِلَى المُؤَنَّثِ", tr: "Cümleyi müennese çevir: doğru şıkkı seç.",
      exHtml: "<span class=\"ar\">المُعَلِّمُ نَشِيطٌ ← المُعَلِّمَةُ نَشِيطَةٌ</span>", items: [
      { q: "الوَزِيرُ مُسَافِرٌ إِلَى بَيْرُوتَ.", o: ["الوَزِيرَةُ مُسَافِرَةٌ إِلَى بَيْرُوتَ.", "الوَزِيرَةُ مُسَافِرٌ إِلَى بَيْرُوتَ.", "الوَزِيرُ مُسَافِرَةٌ إِلَى بَيْرُوتَ."], a: 0, tr: "Kadın bakan Beyrut'a gidiyor." },
      { q: "المُوَظَّفُ جَالِسٌ فِي المَكْتَبِ.", o: ["المُوَظَّفَةُ جَالِسٌ فِي المَكْتَبِ.", "المُوَظَّفَةُ جَالِسَةٌ فِي المَكْتَبِ.", "المُوَظَّفَةُ جَالِسَةٌ فِي المَكْتَبَةِ."], a: 1, tr: "Kadın memur ofiste oturuyor.", why: "<span class=\"ar\">المَكْتَبِ</span> (ofis) cümlenin öznesi değil; değişmez." },
      { q: "المُدَرِّسُ مُخْلِصٌ.", o: ["المُدَرِّسَةُ مُخْلِصٌ.", "المُدَرِّسُ مُخْلِصَةٌ.", "المُدَرِّسَةُ مُخْلِصَةٌ."], a: 2, tr: "Kadın öğretmen ihlâslıdır." },
      { q: "هَذَا طَالِبٌ عِرَاقِيٌّ.", o: ["هَذِهِ طَالِبَةٌ عِرَاقِيَّةٌ.", "هَذَا طَالِبَةٌ عِرَاقِيَّةٌ.", "هَذِهِ طَالِبَةٌ عِرَاقِيٌّ."], a: 0, tr: "Bu, Iraklı bir kız öğrencidir.", why: "İşaret ismi de değişir: <span class=\"ar\">هَذَا ← هَذِهِ</span>." },
      { q: "خَالِي كَرِيمٌ.", o: ["خَالَتِي كَرِيمٌ.", "خَالَتِي كَرِيمَةٌ.", "عَمَّتِي كَرِيمَةٌ."], a: 1, tr: "Teyzem cömerttir.", why: "<span class=\"ar\">خَالٌ</span> (dayı) → <span class=\"ar\">خَالَةٌ</span> (teyze)." },
      { q: "أَخِي تَاجِرٌ.", o: ["أُخْتِي تَاجِرٌ.", "أُخْتِي تَاجِرَةٌ.", "أُمِّي تَاجِرَةٌ."], a: 1, tr: "Kız kardeşim tüccardır." },
      { q: "الوَلَدُ نَائِمٌ.", o: ["البِنْتُ نَائِمَةٌ.", "الوَلَدَةُ نَائِمَةٌ.", "البِنْتُ نَائِمٌ."], a: 0, tr: "Kız uyuyor.", why: "<span class=\"ar\">وَلَدٌ</span>'un müennesi ayrı bir kelimedir: <span class=\"ar\">بِنْتٌ</span>." },
      { q: "عَمِّي مُقِيمٌ فِي إِسْطَنْبُولَ.", o: ["عَمَّتِي مُقِيمٌ فِي إِسْطَنْبُولَ.", "خَالَتِي مُقِيمَةٌ فِي إِسْطَنْبُولَ.", "عَمَّتِي مُقِيمَةٌ فِي إِسْطَنْبُولَ."], a: 2, tr: "Halam İstanbul'da oturuyor.", why: "<span class=\"ar\">عَمٌّ</span> (amca) → <span class=\"ar\">عَمَّةٌ</span> (hala)." }
    ]},
    { type: "pick", ar: "حَوِّلْ إِلَى المُذَكَّرِ", tr: "Cümleyi müzekkere çevir: doğru şıkkı seç.",
      exHtml: "<span class=\"ar\">المَرْأَةُ مُنْتَظِرَةٌ ← الرَّجُلُ مُنْتَظِرٌ</span>", items: [
      { q: "البِنْتُ جَمِيلَةٌ.", o: ["الوَلَدُ جَمِيلَةٌ.", "الوَلَدُ جَمِيلٌ.", "البِنْتُ جَمِيلٌ."], a: 1, tr: "Oğlan güzeldir." },
      { q: "خَالَتِي تَاجِرَةٌ نَاجِحَةٌ.", o: ["خَالِي تَاجِرٌ نَاجِحٌ.", "خَالِي تَاجِرٌ نَاجِحَةٌ.", "خَالَتِي تَاجِرٌ نَاجِحٌ."], a: 0, tr: "Dayım başarılı bir tüccardır." },
      { q: "المُعَلِّمَةُ ذَاهِبَةٌ إِلَى المَدْرَسَةِ.", o: ["المُعَلِّمُ ذَاهِبَةٌ إِلَى المَدْرَسَةِ.", "المُعَلِّمُ ذَاهِبٌ إِلَى المَدْرَسِ.", "المُعَلِّمُ ذَاهِبٌ إِلَى المَدْرَسَةِ."], a: 2, tr: "Öğretmen okula gidiyor.", why: "<span class=\"ar\">المَدْرَسَةِ</span> özne değil; değişmez." },
      { q: "صَدِيقَتِي امْرَأَةٌ كَرِيمَةٌ.", o: ["صَدِيقِي رَجُلٌ كَرِيمٌ.", "صَدِيقِي امْرَأَةٌ كَرِيمٌ.", "صَدِيقِي امْرُؤٌ كَرِيمَةٌ."], a: 0, tr: "Arkadaşım cömert bir adamdır.", why: "<span class=\"ar\">امْرَأَةٌ</span>'nin karşılığı <span class=\"ar\">رَجُلٌ</span>." },
      { q: "البِنْتُ نَائِمَةٌ فِي المَهْدِ.", o: ["الوَلَدُ نَائِمَةٌ فِي المَهْدِ.", "الوَلَدُ نَائِمٌ فِي المَهْدِ.", "البِنْتُ نَائِمٌ فِي المَهْدِ."], a: 1, tr: "Oğlan beşikte uyuyor." },
      { q: "عَمَّتِي مُتَزَوِّجَةٌ مُنْذُ شَهْرٍ.", o: ["عَمِّي مُتَزَوِّجٌ مُنْذُ شَهْرٍ.", "عَمِّي مُتَزَوِّجَةٌ مُنْذُ شَهْرٍ.", "خَالِي مُتَزَوِّجٌ مُنْذُ شَهْرَةٍ."], a: 0, tr: "Amcam bir aydır evli." },
      { q: "المُدِيرَةُ مَوْجُودَةٌ فِي المَكْتَبِ.", o: ["المُدِيرُ مَوْجُودَةٌ فِي المَكْتَبِ.", "المُدِيرُ مَوْجُودٌ فِي المَكْتَبِ.", "المُدِيرَةُ مَوْجُودٌ فِي المَكْتَبِ."], a: 1, tr: "Müdür ofistedir." },
      { q: "الوَزِيرَةُ مُسَافِرَةٌ إِلَى أَلْمَانْيَا.", o: ["الوَزِيرُ مُسَافِرٌ إِلَى أَلْمَانْيَا.", "الوَزِيرُ مُسَافِرَةٌ إِلَى أَلْمَانْيَا.", "الوَزِيرَةُ مُسَافِرٌ إِلَى أَلْمَانْيَا."], a: 0, tr: "Bakan Almanya'ya gidiyor." }
    ]},
    { type: "combo", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الاسْمِ المُنَاسِبِ وَبَيِّنْ نَوْعَهُ", tr: "Kutulara dokunarak uygun ismi seç ve türünü (müzekker / müennes) belirt.",
      exHtml: "<span class=\"ar\">الطَّالِبَةُ نَاجِحَةٌ ← مُؤَنَّثٌ · البَيْتُ كَبِيرٌ ← مُذَكَّرٌ</span>", items: [
      { p: [{ o: ["السَّيَّارَةُ", "الطَّالِبُ", "البِنْتُ"] }, "جَالِسٌ فِي الصَّفِّ.", " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[1, 0]], tr: "Öğrenci sınıfta oturuyor." },
      { p: ["الحَافِلَةُ", { o: ["سَرِيعٌ", "طَوِيلٌ", "سَرِيعَةٌ"] }, " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[2, 1]], tr: "Otobüs hızlıdır." },
      { p: [{ o: ["الرَّجُلُ", "المَرْأَةُ", "الوَلَدُ"] }, "ذَاهِبَةٌ إِلَى السُّوقِ.", " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[1, 1]], tr: "Kadın çarşıya gidiyor." },
      { p: [{ o: ["أُخْتِي", "أُمِّي", "أَخِي"] }, "وَلَدٌ طَيِّبٌ.", " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[2, 0]], tr: "Kardeşim iyi bir çocuktur." },
      { p: ["أَنْقَرَةُ", { o: ["جَبَلُ", "عَاصِمَةُ", "بَحْرُ"] }, "تُرْكِيَا.", " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[1, 1]], tr: "Ankara Türkiye'nin başkentidir." },
      { p: ["فَرِيدٌ", { o: ["طَالِبَةٌ", "طَالِبٌ", "طَبِيبَةٌ"] }, "فِي كُلِّيَّةِ الطِّبِّ.", " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[1, 0]], tr: "Ferîd Tıp Fakültesinde öğrencidir." },
      { p: ["عَلِيٌّ يَسْكُنُ فِي", { o: ["الشَّقَّةِ", "الطَّابِقِ", "الغُرْفَةِ"] }, "الثَّالِثِ.", " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[1, 0]], tr: "Ali üçüncü katta oturuyor.", why: "Sıfat <span class=\"ar\">الثَّالِثِ</span> müzekker; isim de müzekker olmalı: <span class=\"ar\">الطَّابِقِ</span>." },
      { p: ["رَكِبْتُ", { o: ["السَّيَّارَةَ", "الحِصَانَ", "الحَافِلَةَ"] }, " ← ", { o: ["مُذَكَّرٌ", "مُؤَنَّثٌ"] }], ok: [[0, 1], [1, 0], [2, 1]], tr: ["Arabaya bindim.", "Ata bindim.", "Otobüse bindim."] }
    ]},
    { type: "pick", ar: "هَاتِ المُؤَنَّثَ لِلْكَلِمَاتِ التَّالِيَةِ", tr: "Kelimenin müennesini seç. Bazılarının müennesi bambaşka bir kelimedir!", items: [
      { q: "وَلَدٌ", o: ["وَلَدَةٌ", "بِنْتٌ", "أُخْتٌ"], a: 1, tr: "oğlan → kız" }, { q: "رَجُلٌ", o: ["امْرَأَةٌ", "رَجُلَةٌ", "أُمٌّ"], a: 0, tr: "adam → kadın" },
      { q: "ابْنٌ", o: ["بِنْتٌ / ابْنَةٌ", "ابْنَاءُ", "أُخْتٌ"], a: 0, tr: "oğul → kız (evlat)" }, { q: "عَمٌّ", o: ["خَالَةٌ", "عَمَّةٌ", "عَمَّى"], a: 1, tr: "amca → hala" },
      { q: "خَالٌ", o: ["خَالَةٌ", "عَمَّةٌ", "خَالَى"], a: 0, tr: "dayı → teyze" }, { q: "أَبٌ", o: ["أَبَةٌ", "أُخْتٌ", "أُمٌّ"], a: 2, tr: "baba → anne" },
      { q: "أَخٌ", o: ["أُخْتٌ", "أَخَةٌ", "أُمٌّ"], a: 0, tr: "erkek kardeş → kız kardeş" }, { q: "دِيكٌ", o: ["دِيكَةٌ", "دَجَاجَةٌ", "بَقَرَةٌ"], a: 1, tr: "horoz → tavuk" },
      { q: "ثَوْرٌ", o: ["ثَوْرَةٌ", "نَاقَةٌ", "بَقَرَةٌ"], a: 2, tr: "boğa → inek" }, { q: "جَمَلٌ", o: ["نَاقَةٌ", "جَمَلَةٌ", "بَقَرَةٌ"], a: 0, tr: "erkek deve → dişi deve" }
    ]},
    { type: "bank", ar: "امْلَأِ الفَرَاغَاتِ فِي القِطْعَةِ التَّالِيَةِ بِالكَلِمَاتِ المُنَاسِبَةِ", tr: "Önce aşağıdan bir kelime seç, sonra metindeki boşluğa dokun. Cinsiyete dikkat.",
      bank: ["مُعَلِّمٌ", "غُرْفَةٌ", "طَالِبَةٌ", "تِلْفَازٌ", "مَطْبَخٌ", "كَبِيرٌ", "كَبِيرَةٌ", "طَبِيبَةٌ", "قَدِيمٌ", "حَدِيقَةٌ"],
      parts: ["البَيْتُ", { a: [5, 8] }, "وَجَمِيلٌ. تُوجَدُ فِي البَيْتِ", { a: [1] }, "لِلْجُلُوسِ وَغُرْفَةٌ لِلنَّوْمِ وَ", { a: [4] }, "وَحَمَّامٌ، وَأَمَامَ البَيْتِ", { a: [9] }, "جَمِيلَةٌ. الأَبُ", { a: [0] }, "وَالأُمُّ", { a: [7, 2] }, "وَالأُخْتُ", { a: [2, 7] }, "وَأَنَا طَالِبٌ أَيْضًا. لِي غُرْفَةٌ", { a: [6] }, "وَفِي الغُرْفَةِ طَاوِلَةٌ وَكُرْسِيٌّ وَسَرِيرٌ كَبِيرٌ وَخِزَانَةٌ جَمِيلَةٌ وَرَادْيُو", { a: [8, 5] }, "وَجِهَازُ فِيدْيُو يَابَانِيٌّ وَ", { a: [3] }, "جَدِيدٌ وَمَكْتَبَةٌ صَغِيرَةٌ."],
      tr: "Ev büyük ve güzeldir. Evde bir oturma odası, bir yatak odası, mutfak ve banyo var; evin önünde güzel bir bahçe var. Babam öğretmen, annem doktor, kız kardeşim öğrenci; ben de öğrenciyim. Büyük bir odam var; odada masa, sandalye, büyük bir yatak, güzel bir dolap, eski bir radyo, Japon bir video cihazı, yeni bir televizyon ve küçük bir kütüphane var."
    },
    { type: "find", target: "mun", ar: "اقْرَأِ الآيَاتِ الكَرِيمَةَ التَّالِيَةَ وَعَيِّنِ الأَسْمَاءَ المُؤَنَّثَةَ فِيهَا", tr: "Âyetlerdeki müennes isimlere dokun (kesik çizgili kelimeler isimdir), sonra Kontrol et.", items: [
      { c: "وَلِلَّهِ:- / الأَسْمَاءُ:n / الحُسْنَى:y / فَادْعُوهُ بِهَا:-", src: "الأعراف ١٨٠", why: "<span class=\"ar\">الحُسْنَى</span>: elif-i maksûre (ى). <span class=\"ar\">الأَسْمَاءُ</span>'daki hemze köktendir (اسم)." },
      { c: "وَاسْتَعِينُوا:- / بِـ:- / الصَّبْرِ:n / وَ:- / الصَّلَاةِ:y", src: "البقرة ٤٥", why: "<span class=\"ar\">الصَّلَاةِ</span>: tâ-i merbûta." },
      { c: "إِنَّا أَنْزَلْنَاهُ فِي:- / لَيْلَةِ:y / القَدْرِ:n", src: "القدر ١", why: "<span class=\"ar\">لَيْلَةِ</span>: tâ-i merbûta." },
      { c: "إِنَّهَا:- / بَقَرَةٌ:y / صَفْرَاءُ:y / فَاقِعٌ:n / لَوْنُهَا:n / تَسُرُّ:- / النَّاظِرِينَ:n", src: "البقرة ٦٩", why: "<span class=\"ar\">بَقَرَةٌ</span>: ة · <span class=\"ar\">صَفْرَاءُ</span>: elif-i memdûde (اء)." },
      { c: "وَ:- / الشَّمْسِ:y / وَضُحَاهَا:-", src: "الشمس ١", why: "<span class=\"ar\">الشَّمْسُ</span> alametsiz (semâî) müennestir." },
      { c: "إِذَا زُلْزِلَتِ:- / الأَرْضُ:y / زِلْزَالَهَا:n", src: "الزلزلة ١", why: "<span class=\"ar\">الأَرْضُ</span> semâî müennestir; <span class=\"ar\">زِلْزَالٌ</span> müzekker." },
      { c: "يَا أَيَّتُهَا:- / النَّفْسُ:y / المُطْمَئِنَّةُ:y", src: "الفجر ٢٧", why: "<span class=\"ar\">النَّفْسُ</span> semâî müennes; <span class=\"ar\">المُطْمَئِنَّةُ</span>: ة." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3
{
  id: "u3", no: 3, ar: "المُفْرَدُ وَالمُثَنَّى وَالجَمْعُ", tr: "Müfred, Müsennâ ve Cem", short: "Tekil–İkil–Çoğul", col: "cem",
  goals: ["Müfred, müsennâ ve cemi ayırmak", "Müsennâyı ـانِ / ـَيْنِ ile kurmak", "Cemin üç türünü tanımak: müzekker sâlim, müennes sâlim, teksîr"],
  examples: [
    { s: "مُعَلِّمٌ:muf / مُعَلِّمَانِ:mus / مُعَلِّمُونَ:cem", tr: "öğretmen · iki öğretmen · öğretmenler (cem-i müzekker sâlim)", noLabel: false },
    { s: "طَبِيبَةٌ:muf / طَبِيبَتَانِ:mus / طَبِيبَاتٌ:cem", tr: "kadın doktor · iki kadın doktor · kadın doktorlar (cem-i müennes sâlim)" },
    { s: "يَوْمٌ:muf / يَوْمَانِ:mus / أَيَّامٌ:cem", tr: "gün · iki gün · günler (cem-i teksîr)" }
  ],
  rules: [
    { tr: "İsim sayı bakımından üç türlüdür: <b class=\"r-muf\">müfred</b> (tekil), <b class=\"r-mus\">müsennâ</b> (ikil), <b class=\"r-cem\">cem</b> (çoğul)." },
    { tr: "<b class=\"r-muf\">Müfred</b> bir kişiyi ya da bir şeyi gösterir.", ex: ["كِتَابٌ، طَائِرَةٌ، مُسْلِمٌ"] },
    { tr: "<b class=\"r-mus\">Müsennâ</b> ikiyi gösterir: müfredin sonuna <b>ـانِ</b> ya da <b>ـَيْنِ</b> eklenir.", ex: ["كِتَابَانِ / كِتَابَيْنِ", "طَائِرَتَانِ / طَائِرَتَيْنِ", "مُسْلِمَانِ / مُسْلِمَيْنِ"] },
    { tr: "<b class=\"r-cem\">Cem</b> ikiden fazlasını gösterir ve üç türlüdür:", ex: ["كُتُبٌ، طَائِرَاتٌ، مُسْلِمُونَ"] },
    { tr: "<b>Cem-i müzekker sâlim:</b> sona <b>ـُونَ</b> ya da <b>ـِينَ</b> eklenir.", ex: ["مُدَرِّسٌ ← مُدَرِّسُونَ / مُدَرِّسِينَ", "مُؤْمِنٌ ← مُؤْمِنُونَ / مُؤْمِنِينَ"] },
    { tr: "<b>Cem-i müennes sâlim:</b> sondaki ة yerine <b>ـَاتٌ</b> gelir.", ex: ["مُدَرِّسَةٌ ← مُدَرِّسَاتٌ", "مُؤْمِنَةٌ ← مُؤْمِنَاتٌ"] },
    { tr: "<b>Cem-i teksîr (mükesser):</b> müfredin yapısı değişir, kalıbı kırılır.", ex: ["كِتَابٌ ← كُتُبٌ", "طِفْلٌ ← أَطْفَالٌ", "مَسْجِدٌ ← مَسَاجِدُ"] }
  ],
  kaide: [
    "١ـ الاسْمُ مِنْ حَيْثُ العَدَدُ ثَلَاثَةُ أَنْوَاعٍ:",
    "أ ـ مُفْرَدٌ: يَدُلُّ عَلَى وَاحِدٍ أَوْ وَاحِدَةٍ. مِثَالٌ: كِتَابٌ، طَائِرَةٌ، مُسْلِمٌ.",
    "ب ـ مُثَنًّى: يَدُلُّ عَلَى اثْنَيْنِ أَوِ اثْنَتَيْنِ بِزِيَادَةِ (ـانِ) أَوْ (ـَيْنِ) عَلَى المُفْرَدِ. مِثَالٌ: كِتَابَانِ / كِتَابَيْنِ، طَائِرَتَانِ / طَائِرَتَيْنِ، مُسْلِمَانِ / مُسْلِمَيْنِ.",
    "ج ـ جَمْعٌ: يَدُلُّ عَلَى أَكْثَرَ مِنَ اثْنَيْنِ أَوِ اثْنَتَيْنِ. مِثَالٌ: كُتُبٌ، طَائِرَاتٌ، مُسْلِمُونَ.",
    "٢ـ الجَمْعُ ثَلَاثَةُ أَنْوَاعٍ:",
    "أ ـ جَمْعُ المُذَكَّرِ السَّالِمُ: يَكُونُ بِزِيَادَةِ (ـُونَ) أَوْ (ـِينَ) فِي آخِرِ الاسْمِ المُفْرَدِ: مُدَرِّسٌ ← مُدَرِّسُونَ / مُدَرِّسِينَ.",
    "ب ـ جَمْعُ المُؤَنَّثِ السَّالِمُ: يَكُونُ بِزِيَادَةِ (ـات) بِمَكَانِ التَّاءِ المَرْبُوطَةِ فِي آخِرِ الاسْمِ المُفْرَدِ: مُدَرِّسَةٌ ← مُدَرِّسَاتٌ.",
    "ج ـ جَمْعُ التَّكْسِيرِ / المُكَسَّرِ: يَكُونُ بِتَغْيِيرِ الاسْمِ المُفْرَدِ: كِتَابٌ ← كُتُبٌ، طِفْلٌ ← أَطْفَالٌ، مَسْجِدٌ ← مَسَاجِدُ."
  ],
  ex: [
    { type: "classify", opts: SAYI_OPTS, ar: "مَا الأَسْمَاءُ الدَّالَّةُ عَلَى المُفْرَدِ وَالمُثَنَّى وَالجَمْعِ فِي جِسْمِ الإِنْسَانِ؟", tr: "Vücudumuzdan kelimeler: müfred mi, müsennâ mı, cem mi?",
      exHtml: "<span class=\"ar\">قَلْبٌ ← مُفْرَدٌ · أُذُنَانِ ← مُثَنًّى · أَصَابِعُ ← جَمْعٌ</span>", items: [
      { s: "رَأْسٌ", a: "muf", tr: "baş" }, { s: "عَيْنَانِ", a: "mus", tr: "iki göz" }, { s: "أَسْنَانٌ", a: "cem", tr: "dişler" }, { s: "أَنْفٌ", a: "muf", tr: "burun" },
      { s: "يَدَانِ", a: "mus", tr: "iki el" }, { s: "شَفَتَانِ", a: "mus", tr: "iki dudak" }, { s: "لِسَانٌ", a: "muf", tr: "dil" }, { s: "أَظَافِرُ", a: "cem", tr: "tırnaklar" },
      { s: "رِجْلَانِ", a: "mus", tr: "iki ayak" }, { s: "شُعُورٌ", a: "cem", tr: "saçlar" }
    ]},
    { type: "pick", ar: "هَاتِ المُثَنَّى لِلْكَلِمَاتِ الآتِيَةِ", tr: "Müsennâsını seç.", exHtml: "<span class=\"ar\">قَلَمٌ ← قَلَمَانِ · طَالِبَةٌ ← طَالِبَتَانِ</span>", items: [
      { q: "مُدَرِّسٌ", o: ["مُدَرِّسُونَ", "مُدَرِّسَانِ", "مُدَرِّسَتَانِ"], a: 1, tr: "iki öğretmen" },
      { q: "جَامِعَةٌ", o: ["جَامِعَتَانِ", "جَامِعَانِ", "جَامِعَاتٌ"], a: 0, tr: "iki üniversite", why: "Müennes isimde ة, tâ olarak kalır: <span class=\"ar\">جَامِعَتَانِ</span>." },
      { q: "بَلَدٌ", o: ["بِلَادٌ", "بَلَدَانِ", "بَلَدَتَانِ"], a: 1, tr: "iki ülke" },
      { q: "مَدِينَةٌ", o: ["مُدُنٌ", "مَدِينَانِ", "مَدِينَتَانِ"], a: 2, tr: "iki şehir" },
      { q: "عَالِمٌ", o: ["عَالِمَانِ", "عُلَمَاءُ", "عَالِمُونَ"], a: 0, tr: "iki âlim" },
      { q: "مَكْتَبَةٌ", o: ["مَكْتَبَانِ", "مَكْتَبَتَانِ", "مَكْتَبَاتٌ"], a: 1, tr: "iki kütüphane" }
    ]},
    { type: "find", target: "cem", ar: "عَيِّنِ الاسْمَ الجَمْعَ فِيمَا يَأْتِي", tr: "Cümledeki cem (çoğul) isme dokun, sonra Kontrol et.",
      exHtml: "<span class=\"ar\">فِي المَكْتَبَةِ كَثِيرٌ مِنَ <u>الطُّلَّابِ</u>.</span>", items: [
      { c: "تَقَدَّمَتِ:- / العُلُومُ:y / الطَّبِيعِيَّةُ:n / فِي:- / هَذَا:n / العَصْرِ:n", tr: "Tabiat ilimleri bu çağda ilerledi.", why: "<span class=\"ar\">الطَّبِيعِيَّةُ</span> çoğulun sıfatıdır ama kendisi tekil müennes kalıptadır." },
      { c: "قَابَلْتُ:- / الطَّبِيبَاتِ:y / فِي:- / المُسْتَشْفَى:n", tr: "Hastanede kadın doktorlarla görüştüm." },
      { c: "المُسْتَمِعُونَ:y / فِي:- / قَاعَةِ:n / المُحَاضَرَةِ:n", tr: "Dinleyiciler konferans salonunda." },
      { c: "يُمَارِسُ:- / أَحْمَدُ:n / هِوَايَاتٍ:y / عَدِيدَةً:n", tr: "Ahmed birçok hobiyle uğraşıyor." },
      { c: "فِي:- / المَكْتَبَةِ:n / كُتُبٌ:y / عِلْمِيَّةٌ:n", tr: "Kütüphanede ilmî kitaplar var." },
      { c: "الصِّينُ:n / أَكْبَرُ:n / الدُّوَلِ:y / فِي:- / العَالَمِ:n", tr: "Çin dünyanın en büyük ülkesidir." },
      { c: "تَدْعُو:- / آيَاتٌ:y / كَثِيرَةٌ:n / فِي:- / القُرْآنِ:n / المُؤْمِنَ:n / إِلَى:- / التَّفْكِيرِ:n", tr: "Kur'an'da birçok âyet mümini düşünmeye çağırır." },
      { c: "الصَّلَاةُ:n / رُكْنٌ:n / مِنْ:- / أَرْكَانِ:y / الإِسْلَامِ:n", tr: "Namaz İslâm'ın rükünlerinden biridir." }
    ]},
    { type: "pick", ar: "هَاتِ المُفْرَدَ لِلْجُمُوعِ التَّالِيَةِ", tr: "Çoğulun müfredini (tekilini) seç.", exHtml: "<span class=\"ar\">إِخْوَةٌ ← أَخٌ · مُهَنْدِسُونَ ← مُهَنْدِسٌ · عَمَّاتٌ ← عَمَّةٌ</span>", items: [
      { q: "شُعَرَاءُ", o: ["شَعْرٌ", "شَاعِرٌ", "شَعِيرٌ"], a: 1, tr: "şairler → şair" },
      { q: "مُوَظَّفُونَ", o: ["مُوَظَّفٌ", "وَظِيفَةٌ", "مُوَظَّفَةٌ"], a: 0, tr: "memurlar → memur" },
      { q: "بَنَاتٌ", o: ["بَنَاتَةٌ", "ابْنٌ", "بِنْتٌ"], a: 2, tr: "kızlar → kız" },
      { q: "أَخْوَالٌ", o: ["خَالٌ", "خَالَةٌ", "حَالٌ"], a: 0, tr: "dayılar → dayı" },
      { q: "سَيِّدَاتٌ", o: ["سَيِّدٌ", "سَيِّدَةٌ", "سَادَةٌ"], a: 1, tr: "hanımlar → hanım" },
      { q: "طُلَّابٌ", o: ["طَالِبٌ", "طَلَبٌ", "طَالِبَةٌ"], a: 0, tr: "öğrenciler → öğrenci" },
      { q: "رُؤَسَاءُ", o: ["رَأْسٌ", "رِئَاسَةٌ", "رَئِيسٌ"], a: 2, tr: "başkanlar → başkan" },
      { q: "آبَاءٌ", o: ["أَبٌ", "أُمٌّ", "بَابٌ"], a: 0, tr: "babalar → baba" },
      { q: "أَجْدَادٌ", o: ["جَدِيدٌ", "جَدٌّ", "جِدٌّ"], a: 1, tr: "dedeler → dede" },
      { q: "دَفَاتِرُ", o: ["دَفْتَرٌ", "دَفْتَرَةٌ", "دَفَّةٌ"], a: 0, tr: "defterler → defter" },
      { q: "أَقْلَامٌ", o: ["قَلَمٌ", "قَلَمَةٌ", "إِقْلِيمٌ"], a: 0, tr: "kalemler → kalem" }
    ]},
    { type: "dp", ar: "حَوِّلْ إِلَى صِيغَةِ المُثَنَّى ثُمَّ صِيغَةِ الجَمْعِ", tr: "Önce müsennâya, sonra cemie çevir: doğru şıkkı seç.",
      exHtml: "<span class=\"ar\">الطَّبِيبُ مُخْلِصٌ ← الطَّبِيبَانِ مُخْلِصَانِ ← الأَطِبَّاءُ مُخْلِصُونَ</span><br><span class=\"ar\">الطَّبِيبَةُ مُخْلِصَةٌ ← الطَّبِيبَتَانِ مُخْلِصَتَانِ ← الطَّبِيبَاتُ مُخْلِصَاتٌ</span>", rows: [
      { s: "المُهَنْدِسُ مُسَافِرٌ.", d: ["المُهَنْدِسَانِ مُسَافِرَانِ.", "المُهَنْدِسَانِ مُسَافِرٌ.", "المُهَنْدِسُونَ مُسَافِرَانِ."], p: ["المُهَنْدِسُونَ مُسَافِرُونَ.", "المُهَنْدِسُونَ مُسَافِرٌ.", "المُهَنْدِسَاتُ مُسَافِرُونَ."], tr: ["Mühendis yolculukta.", "İki mühendis yolculukta.", "Mühendisler yolculukta."] },
      { s: "الطَّالِبَةُ مَرِيضَةٌ.", d: ["الطَّالِبَتَانِ مَرِيضَتَانِ.", "الطَّالِبَانِ مَرِيضَانِ.", "الطَّالِبَتَانِ مَرِيضَةٌ."], p: ["الطَّالِبَاتُ مَرِيضَاتٌ.", "الطَّالِبَاتُ مَرِيضُونَ.", "الطُّلَّابُ مَرِيضَاتٌ."], tr: ["Kız öğrenci hasta.", "İki kız öğrenci hasta.", "Kız öğrenciler hasta."] },
      { s: "الطِّفْلُ ضَاحِكٌ.", d: ["الطِّفْلَانِ ضَاحِكَانِ.", "الطِّفْلَتَانِ ضَاحِكَانِ.", "الطِّفْلَانِ ضَاحِكٌ."], p: ["الأَطْفَالُ ضَاحِكُونَ.", "الطِّفْلُونَ ضَاحِكُونَ.", "الأَطْفَالُ ضَاحِكٌ."], tr: ["Çocuk gülüyor.", "İki çocuk gülüyor.", "Çocuklar gülüyor."], why: "<span class=\"ar\">طِفْلٌ</span>'un çoğulu kırık çoğuldur: <span class=\"ar\">أَطْفَالٌ</span>." },
      { s: "المُدِيرُ فِي المَكْتَبِ.", d: ["المُدِيرَانِ فِي المَكْتَبِ.", "المُدِيرَانِ فِي المَكْتَبَانِ.", "المُدِيرُ فِي المَكْتَبَيْنِ."], p: ["المُدِيرُونَ فِي المَكْتَبِ.", "المُدِيرُونَ فِي المَكَاتِبُونَ.", "المُدِيرُ فِي المَكَاتِبِ."], tr: ["Müdür ofiste.", "İki müdür ofiste.", "Müdürler ofiste."], why: "Haber (<span class=\"ar\">فِي المَكْتَبِ</span>) değişmez; yalnız mübtedâ değişir." },
      { s: "المُدَرِّسَةُ ذَاهِبَةٌ إِلَى البَيْتِ.", d: ["المُدَرِّسَتَانِ ذَاهِبَتَانِ إِلَى البَيْتِ.", "المُدَرِّسَتَانِ ذَاهِبَةٌ إِلَى البَيْتِ.", "المُدَرِّسَانِ ذَاهِبَتَانِ إِلَى البَيْتِ."], p: ["المُدَرِّسَاتُ ذَاهِبَاتٌ إِلَى البَيْتِ.", "المُدَرِّسَاتُ ذَاهِبُونَ إِلَى البَيْتِ.", "المُدَرِّسُونَ ذَاهِبَاتٌ إِلَى البَيْتِ."], tr: ["Kadın öğretmen eve gidiyor.", "İki kadın öğretmen eve gidiyor.", "Kadın öğretmenler eve gidiyor."] },
      { s: "المُسْلِمُ صَائِمٌ فِي رَمَضَانَ.", d: ["المُسْلِمَانِ صَائِمَانِ فِي رَمَضَانَ.", "المُسْلِمَانِ صَائِمٌ فِي رَمَضَانَ.", "المُسْلِمُونَ صَائِمَانِ فِي رَمَضَانَ."], p: ["المُسْلِمُونَ صَائِمُونَ فِي رَمَضَانَ.", "المُسْلِمُونَ صَائِمٌ فِي رَمَضَانَ.", "المُسْلِمَاتُ صَائِمُونَ فِي رَمَضَانَ."], tr: ["Müslüman Ramazan'da oruçludur.", "İki Müslüman Ramazan'da oruçludur.", "Müslümanlar Ramazan'da oruçludur."] },
      { s: "المُمَرِّضَةُ مُسَاعِدَةٌ الطَّبِيبَ.", d: ["المُمَرِّضَتَانِ مُسَاعِدَتَانِ الطَّبِيبَ.", "المُمَرِّضَتَانِ مُسَاعِدَتَانِ الطَّبِيبَيْنِ.", "المُمَرِّضَانِ مُسَاعِدَةٌ الطَّبِيبَ."], p: ["المُمَرِّضَاتُ مُسَاعِدَاتٌ الطَّبِيبَ.", "المُمَرِّضَاتُ مُسَاعِدُونَ الطَّبِيبَ.", "المُمَرِّضَاتُ مُسَاعِدَاتٌ الأَطِبَّاءُ."], tr: ["Hemşire doktora yardım ediyor.", "İki hemşire doktora yardım ediyor.", "Hemşireler doktora yardım ediyor."], why: "<span class=\"ar\">الطَّبِيبَ</span> değişmez; sayısı değişen yalnız hemşiredir." },
      { s: "الوَلَدُ صَغِيرٌ.", d: ["الوَلَدَانِ صَغِيرَانِ.", "الوَلَدَانِ صَغِيرٌ.", "الوَلَدُونَ صَغِيرَانِ."], p: ["الأَوْلَادُ صِغَارٌ.", "الوَلَدُونَ صَغِيرُونَ.", "الأَوْلَادُ صَغِيرٌ."], tr: ["Çocuk küçüktür.", "İki çocuk küçüktür.", "Çocuklar küçüktür."], why: "İkisi de kırık çoğul: <span class=\"ar\">أَوْلَادٌ</span> ve <span class=\"ar\">صِغَارٌ</span>." }
    ]},
    { type: "pick", fill: true, ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الاسْمِ المُنَاسِبِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Uygun kelimeyi seç: sayı ve cinsiyete dikkat.",
      exHtml: "<span class=\"ar\">البَيْتَانِ <u>كَبِيرَانِ</u>.</span> <span class=\"muted\">(كَبِيرٌ – كَبِيرَةٌ – كَبِيرَانِ)</span>", items: [
      { q: "الطِّفْلُ ___ فِي الغُرْفَةِ.", o: ["نَائِمٌ", "نَائِمَةٌ", "نَائِمُونَ"], a: 0, tr: "Çocuk odada uyuyor." },
      { q: "أَحْمَدُ وَمُصْطَفَى ___ إِلَى السُّوقِ.", o: ["ذَاهِبٌ", "ذَاهِبَانِ", "ذَاهِبُونَ"], a: 1, tr: "Ahmed ve Mustafa çarşıya gidiyor." },
      { q: "مُدِيرَةُ المَدْرَسَةِ ___ فِي الحَدِيقَةِ.", o: ["جَالِسَةٌ", "جَالِسٌ", "جَالِسَانِ"], a: 0, tr: "Okul müdiresi bahçede oturuyor." },
      { q: "النَّافِذَةُ ___.", o: ["مَفْتُوحٌ", "مَفْتُوحَةٌ", "مَفْتُوحَتَانِ"], a: 1, tr: "Pencere açık." },
      { q: "فَاطِمَةُ وَسَلْمَى ___ فِي الامْتِحَانِ.", o: ["نَاجِحٌ", "نَاجِحَةٌ", "نَاجِحَتَانِ"], a: 2, tr: "Fâtıma ve Selmâ sınavı kazandı." },
      { q: "الزُّوَّارُ ___ أَمَامَ المُتْحَفِ.", o: ["وَاقِفٌ", "وَاقِفَاتٌ", "وَاقِفُونَ"], a: 2, tr: "Ziyaretçiler müzenin önünde duruyor." },
      { q: "العَامِلَانِ ___ إِلَى المَصْنَعِ.", o: ["ذَاهِبَانِ", "ذَاهِبَتَانِ", "ذَاهِبَةٌ"], a: 0, tr: "İki işçi fabrikaya gidiyor." },
      { q: "الغُرْفَةُ ___.", o: ["نَظِيفٌ", "نَظِيفَةٌ", "نَظِيفَتَانِ"], a: 1, tr: "Oda temiz." }
    ]},
    { type: "bank", ar: "اخْتَرْ مِنَ العَمُودِ (ب) الجَمْعَ لِكُلِّ اسْمٍ فِي العَمُودِ (أ)", tr: "Önce aşağıdan çoğulu seç, sonra tekiline dokun.",
      bank: ["المُعَلِّمُونَ", "الأَطِبَّاءُ", "المُهَنْدِسَاتُ", "المُعَلِّمَاتُ", "المُسَافِرَاتُ", "المُسَافِرُونَ", "الطَّبِيبَاتُ", "المُهَنْدِسُونَ"],
      items: [
      { pre: "المُهَنْدِسُ", a: [7] }, { pre: "المُعَلِّمَةُ", a: [3] }, { pre: "الطَّبِيبَةُ", a: [6] }, { pre: "المُسَافِرُ", a: [5] },
      { pre: "الطَّبِيبُ", a: [1] }, { pre: "المُهَنْدِسَةُ", a: [2] }, { pre: "المُسَافِرَةُ", a: [4] }, { pre: "المُعَلِّمُ", a: [0] }
    ]},
    { type: "classify", opts: CEM_OPTS, ar: "بَيِّنْ نَوْعَ الجَمْعِ الَّذِي تَحْتَهُ خَطٌّ", tr: "Altı çizili çoğulun türü nedir?",
      exHtml: "<span class=\"ar\"><u>نَوَافِذُ</u> البَيْتِ مَفْتُوحَةٌ ← جَمْعُ التَّكْسِيرِ</span>", items: [
      { s: "يَجْتَمِعُ مَجْلِسُ <u>النُّوَّابِ</u> اليَوْمَ.", a: "tks", tr: "Milletvekilleri meclisi bugün toplanıyor.", why: "<span class=\"ar\">نَائِبٌ ← نُوَّابٌ</span>: kalıp değişti." },
      { s: "<u>المُعَلِّمُونَ</u> يَنْتَظِرُونَ أَمَامَ المَدْرَسَةِ.", a: "mzs", tr: "Öğretmenler okulun önünde bekliyor.", why: "Sona ـُونَ eklendi." },
      { s: "<u>السَّائِحَاتُ</u> رَجَعْنَ إِلَى وَطَنِهِنَّ.", a: "mns", tr: "Kadın turistler vatanlarına döndü.", why: "ة yerine ـَاتٌ geldi." },
      { s: "أَقْرَأُ <u>كُتُبًا</u> أَدَبِيَّةً.", a: "tks", tr: "Edebî kitaplar okuyorum.", why: "<span class=\"ar\">كِتَابٌ ← كُتُبٌ</span>." },
      { s: "﴿إِنَّمَا <u>المُؤْمِنُونَ</u> إِخْوَةٌ﴾", a: "mzs", tr: "Müminler ancak kardeştir.", why: "Sona ـُونَ eklendi. Aynı âyetteki <span class=\"ar\">إِخْوَةٌ</span> ise kırık çoğuldur." },
      { s: "تَحَدَّثَ مُدِيرُ المُسْتَشْفَى إِلَى <u>الطَّبِيبَاتِ</u>.", a: "mns", tr: "Hastane müdürü kadın doktorlarla konuştu." },
      { s: "المِينَاءُ مَمْلُوءٌ بِـ<u>السُّفُنِ</u>.", a: "tks", tr: "Liman gemilerle dolu.", why: "<span class=\"ar\">سَفِينَةٌ ← سُفُنٌ</span>." },
      { s: "أُشَاهِدُ <u>الطَّائِرَاتِ</u> فِي السَّمَاءِ.", a: "mns", tr: "Gökyüzünde uçakları izliyorum.", why: "Cem-i müennes sâlim akıl sahibi olmayan isimlerde de kullanılır: <span class=\"ar\">طَائِرَةٌ ← طَائِرَاتٌ</span>." }
    ]},
    { type: "pick", ar: "اكْتُبِ الجَمْعَ المُنَاسِبَ لِكُلِّ اسْمٍ", tr: "Her ismin çoğulunu seç.", items: [
      { q: "حَقِيبَةٌ", o: ["حَقَائِبُ", "حَقِيبَاتٌ", "حُقُوبٌ"], a: 0, tr: "çanta → çantalar" }, { q: "قَلَمٌ", o: ["قَلَمُونَ", "أَقْلَامٌ", "قَلَمَاتٌ"], a: 1, tr: "kalem → kalemler" },
      { q: "كَاتِبٌ", o: ["كُتُبٌ", "كُتَّابٌ", "كِتَابَاتٌ"], a: 1, tr: "yazar → yazarlar", why: "<span class=\"ar\">كُتُبٌ</span> kitapların çoğuludur, yazarların değil." },
      { q: "مُدِيرٌ", o: ["مُدِيرُونَ", "مَدَارٌ", "أَدْيِرَةٌ"], a: 0, tr: "müdür → müdürler" }, { q: "رَجُلٌ", o: ["رَجُلُونَ", "رِجَالٌ", "رِجْلٌ"], a: 1, tr: "adam → adamlar" },
      { q: "امْرَأَةٌ", o: ["امْرَأَاتٌ", "مَرْأَى", "نِسَاءٌ"], a: 2, tr: "kadın → kadınlar" }, { q: "مُحَاضِرٌ", o: ["مُحَاضِرُونَ", "مُحَاضَرَاتٌ", "حُضُورٌ"], a: 0, tr: "konferansçı → konferansçılar" },
      { q: "صُورَةٌ", o: ["صُوَرٌ", "صُورُونَ", "أَصْوَارٌ"], a: 0, tr: "resim → resimler" }, { q: "حَادِثَةٌ", o: ["حَدِيثٌ", "حَوَادِثُ", "حَادِثُونَ"], a: 1, tr: "olay → olaylar" },
      { q: "حَرْبٌ", o: ["حُرُوبٌ", "حَرْبَاتٌ", "حَارِبُونَ"], a: 0, tr: "savaş → savaşlar" }
    ]},
    { type: "pick", ar: "حَوِّلْ إِلَى صِيغَةِ جَمْعِ المُؤَنَّثِ السَّالِمِ", tr: "Cem-i müennes sâlime çevir: doğru şıkkı seç.",
      exHtml: "<span class=\"ar\">المُسَافِرُونَ مُنْتَظِرُونَ فِي المَطَارِ ← المُسَافِرَاتُ مُنْتَظِرَاتٌ فِي المَطَارِ</span>", items: [
      { q: "المُعَلِّمُونَ مُسْتَمِعُونَ إِلَى المُحَاضَرَةِ.", o: ["المُعَلِّمَاتُ مُسْتَمِعَاتٌ إِلَى المُحَاضَرَةِ.", "المُعَلِّمَاتُ مُسْتَمِعُونَ إِلَى المُحَاضَرَةِ.", "المُعَلِّمَاتُ مُسْتَمِعَاتٌ إِلَى المُحَاضَرَاتِ."], a: 0, tr: "Kadın öğretmenler konferansı dinliyor." },
      { q: "اللَّاعِبُونَ نَازِلُونَ إِلَى أَرْضِ المَلْعَبِ.", o: ["اللَّاعِبَاتُ نَازِلُونَ إِلَى أَرْضِ المَلْعَبِ.", "اللَّاعِبَاتُ نَازِلَاتٌ إِلَى أَرْضِ المَلْعَبِ.", "اللَّاعِبَةُ نَازِلَاتٌ إِلَى أَرْضِ المَلْعَبِ."], a: 1, tr: "Kadın oyuncular sahaya iniyor." },
      { q: "المُسْلِمُونَ صَائِمُونَ فِي رَمَضَانَ.", o: ["المُسْلِمَاتُ صَائِمَاتٌ فِي رَمَضَانَ.", "المُسْلِمَاتُ صَائِمُونَ فِي رَمَضَانَ.", "المُسْلِمَتَانِ صَائِمَتَانِ فِي رَمَضَانَ."], a: 0, tr: "Müslüman hanımlar Ramazan'da oruçludur." },
      { q: "الطُّلَّابُ رَاجِعُونَ مِنَ المَدْرَسَةِ.", o: ["الطُّلَّابَاتُ رَاجِعَاتٌ مِنَ المَدْرَسَةِ.", "الطَّالِبَاتُ رَاجِعُونَ مِنَ المَدْرَسَةِ.", "الطَّالِبَاتُ رَاجِعَاتٌ مِنَ المَدْرَسَةِ."], a: 2, tr: "Kız öğrenciler okuldan dönüyor.", why: "Kırık çoğul <span class=\"ar\">طُلَّابٌ</span>'ın müennesi müfredden kurulur: <span class=\"ar\">طَالِبَةٌ ← طَالِبَاتٌ</span>." },
      { q: "الأَطْفَالُ نَائِمُونَ فِي الغُرْفَةِ.", o: ["الأَطْفَالَاتُ نَائِمَاتٌ فِي الغُرْفَةِ.", "الطِّفْلَاتُ نَائِمَاتٌ فِي الغُرْفَةِ.", "الطِّفْلَاتُ نَائِمُونَ فِي الغُرْفَةِ."], a: 1, tr: "Kız çocukları odada uyuyor." },
      { q: "الوُزَرَاءُ مَسْرُورُونَ بِالرِّحْلَةِ.", o: ["الوَزِيرَاتُ مَسْرُورَاتٌ بِالرِّحْلَةِ.", "الوُزَرَاءَاتُ مَسْرُورَاتٌ بِالرِّحْلَةِ.", "الوَزِيرَاتُ مَسْرُورُونَ بِالرِّحْلَةِ."], a: 0, tr: "Kadın bakanlar geziden memnun." },
      { q: "الشُّعَرَاءُ مُجْتَمِعُونَ فِي الخَيْمَةِ.", o: ["الشَّاعِرَاتُ مُجْتَمِعُونَ فِي الخَيْمَةِ.", "الشُّعَرَاءَاتُ مُجْتَمِعَاتٌ فِي الخَيْمَةِ.", "الشَّاعِرَاتُ مُجْتَمِعَاتٌ فِي الخَيْمَةِ."], a: 2, tr: "Kadın şairler çadırda toplandı." },
      { q: "المُدِيرُونَ ذَاهِبُونَ إِلَى العَاصِمَةِ.", o: ["المُدِيرَاتُ ذَاهِبَاتٌ إِلَى العَاصِمَةِ.", "المُدِيرَاتُ ذَاهِبُونَ إِلَى العَاصِمَةِ.", "المُدِيرَةُ ذَاهِبَاتٌ إِلَى العَاصِمَةِ."], a: 0, tr: "Müdireler başkente gidiyor." }
    ]},
    { type: "tag", roles: ["muf", "mus", "cem"], reading: true, ar: "اقْرَأِ النَّصَّ وَاسْتَخْرِجِ الاسْمَ المُفْرَدَ وَالمُثَنَّى وَالجَمْعَ", tr: "Mektubu oku; kesik çizgili isimlerin müfred, müsennâ ya da cem olduğunu belirle.",
      title: "رِسَالَةٌ إِلَى الأَبِ",
      text: "أَبِي العَزِيزَ، حَفِظَهُ اللهُ، السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ. أَنَا وَصَلْتُ إِلَى إِسْطَنْبُولَ مَسَاءً، اسْتَقْبَلَنِي فِي المَطَارِ صَدِيقَانِ، هُمَا مُرَادٌ وَمَلِيحٌ. أَخَذَانِي أَوَّلًا إِلَى سَكَنِ الطُّلَّابِ. يَقَعُ السَّكَنُ فِي مِنْطَقَةٍ هَادِئَةٍ وَخَضْرَاءَ، اسْمُهَا تشَامْلِيجَا، وَيَتَكَوَّنُ مِنْ بِنَاءَيْنِ تَارِيخِيَّيْنِ. قَضَيْتُ فِي اليَوْمِ الأَوَّلِ سَاعَاتٍ مُمْتِعَةً وَتَعَرَّفْتُ عَلَى الأَصْدِقَاءِ فِي السَّكَنِ. وَفِي اليَوْمِ الثَّانِي رَافَقَنِي صَدِيقِي مُرَادٌ وَذَهَبْنَا مَعًا إِلَى الكُلِّيَّةِ، وَبَدَأَتِ الدِّرَاسَةُ مِنَ السَّاعَةِ الأُولَى. أَعْجَبَتْنِي الكُلِّيَّةُ، فَهِيَ فِي سَاحَةٍ وَاسِعَةٍ وَخَضْرَاءَ، وَالمُدَرِّسُونَ فِيهَا مَاهِرُونَ، وَالكُتُبُ المُقَرَّرَةُ مُفِيدَةٌ جِدًّا. تَعَرَّفْتُ عَلَى مُدَرِّسَيْنِ مِنْ سُورِيَا وَالعِرَاقِ. وَأَنَا سَعِيدٌ لِأَنَّنِي أَدْرُسُ مَعَ زُمَلَائِي الَّذِينَ حَضَرُوا مِنْ مُدُنٍ مُخْتَلِفَةٍ. أَبِي العَزِيزَ، أَنَا بِخَيْرٍ وَالحَمْدُ لِلَّهِ، وَسَأَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ فِي أَسْرَعِ وَقْتٍ إِنْ شَاءَ اللهُ تَعَالَى، وَأَفْهَمُ القُرْآنَ الكَرِيمَ وَالأَحَادِيثَ النَّبَوِيَّةَ الشَّرِيفَةَ. بَلِّغْ سَلَامِي إِلَى وَالِدَتِي وَإِخْوَتِي وَأَخَوَاتِي، وَتَحِيَّاتِي لِلْجَمِيعِ. وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ. وَلَدُكُمُ المُطِيعُ.",
      textTr: "Sevgili babacığım, Allah seni korusun. Esselâmü aleyküm. Akşam İstanbul'a vardım; havalimanında iki arkadaş, Murad ve Melîh beni karşıladı. Önce beni öğrenci yurduna götürdüler. Yurt, Çamlıca denen sakin ve yeşil bir bölgede, iki tarihî binadan oluşuyor. İlk günü güzel saatlerle geçirdim ve yurttaki arkadaşlarla tanıştım. İkinci gün arkadaşım Murad bana eşlik etti; birlikte fakülteye gittik, ders ilk saatte başladı. Fakülte hoşuma gitti: geniş ve yeşil bir alanda; hocaları mahir, okutulan kitaplar çok faydalı. Suriye ve Irak'tan iki hocayla tanıştım. Farklı şehirlerden gelen arkadaşlarımla okuduğum için mutluyum. Babacığım, ben iyiyim, elhamdülillah. İnşallah Arapçayı en kısa zamanda öğrenip Kur'an'ı ve hadisleri anlayacağım. Selamımı anneme, erkek ve kız kardeşlerime ilet; herkese selamlar. Ve's-selâmü aleyküm. İtaatkâr oğlunuz.",
      items: [
      { c: "اسْتَقْبَلَنِي:- / فِي:- / المَطَارِ:muf / صَدِيقَانِ:mus", tr: "Havalimanında iki arkadaş beni karşıladı." },
      { c: "يَتَكَوَّنُ:- / مِنْ:- / بِنَاءَيْنِ:mus / تَارِيخِيَّيْنِ:mus", tr: "İki tarihî binadan oluşuyor.", why: "Müsennâ ـَيْنِ ile de gelir; sıfat da müsennâ olur." },
      { c: "قَضَيْتُ فِي:- / اليَوْمِ:muf / الأَوَّلِ:- / سَاعَاتٍ:cem / مُمْتِعَةً:-", tr: "İlk günü güzel saatlerle geçirdim." },
      { c: "المُدَرِّسُونَ:cem / فِيهَا:- / مَاهِرُونَ:cem", tr: "Oradaki hocalar mahir." },
      { c: "الكُتُبُ:cem / المُقَرَّرَةُ مُفِيدَةٌ جِدًّا:-", tr: "Okutulan kitaplar çok faydalı." },
      { c: "تَعَرَّفْتُ عَلَى:- / مُدَرِّسَيْنِ:mus / مِنْ:- / سُورِيَا:muf / وَ:- / العِرَاقِ:muf", tr: "Suriye ve Irak'tan iki hocayla tanıştım." },
      { c: "أَدْرُسُ مَعَ:- / زُمَلَائِي:cem / الَّذِينَ حَضَرُوا مِنْ:- / مُدُنٍ:cem / مُخْتَلِفَةٍ:-", tr: "Farklı şehirlerden gelen arkadaşlarımla okuyorum." },
      { c: "بَلِّغْ:- / سَلَامِي:muf / إِلَى:- / وَالِدَتِي:muf / وَ:- / إِخْوَتِي:cem / وَ:- / أَخَوَاتِي:cem", tr: "Selamımı anneme, erkek ve kız kardeşlerime ilet." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4
{
  id: "u4", no: 4, ar: "الاسْمُ النَّكِرَةُ وَالاسْمُ المَعْرِفَةُ", tr: "Nekire ve Marife İsim", short: "Nekire–Marife", col: "mar",
  goals: ["Nekire ile marifeyi ayırmak", "Marifenin altı türünü tanımak", "Nekireyi ال ve izafetle marife yapmak"],
  examples: [
    { s: "هَذَا:mar / كِتَابٌ:nek / مُفِيدٌ:nek", tr: "Bu faydalı bir kitaptır." },
    { s: "اشْتَرَيْتُ:- / قَمِيصًا:nek / جَمِيلًا:nek", tr: "Güzel bir gömlek satın aldım." },
    { s: "تَعَرَّفْتُ:- / إِلَى:- / رَجُلٍ:nek", tr: "Bir adamla tanıştım." },
    { s: "كَانَ:- / الرَّجُلُ:mar / فَقِيرًا:nek", tr: "Adam fakirdi.", why: "Bir önceki cümlede tanıştığımız adam artık belli: <span class=\"ar\">الرَّجُلُ</span>." },
    { s: "أَحْمَدُ:mar / مِنْ:- / إِسْطَنْبُولَ:mar", tr: "Ahmed İstanbul'dandır." },
    { s: "هُوَ:mar / طَالِبٌ:nek / فِي:- / جَامِعَةِ:mar / إِسْطَنْبُولَ:mar", tr: "O, İstanbul Üniversitesinde öğrencidir." },
    { s: "وَجَدْتُ:- / الكِتَابَ:mar / الَّذِي:mar / فَقَدْتُ:- / فِي:- / المَكْتَبَةِ:mar", tr: "Kütüphanede kaybettiğim kitabı buldum." }
  ],
  rules: [
    { tr: "<b class=\"r-nek\">Nekire</b> belirsiz bir şeyi gösterir ve çoğunlukla <b>tenvinli</b>dir (ـٌ ـً ـٍ).", ex: ["هُوَ رَجُلٌ طَيِّبٌ", "قَرَأْتُ رِسَالَةً", "سَأُسَافِرُ غَدًا مَعَ صَدِيقٍ"] },
    { tr: "<b class=\"r-mar\">Marife</b> belli, bilinen bir şeyi gösterir ve altı türlüdür:" },
    { tr: "1. <b>Zamir</b>", ex: ["أَنَا، أَنْتَ، هُوَ"] },
    { tr: "2. <b>İsm-i işaret</b>", ex: ["هَذَا، هَذِهِ، هَؤُلَاءِ، ذَلِكَ"] },
    { tr: "3. <b>İsm-i mevsûl</b>", ex: ["الَّذِي، الَّتِي، الَّذِينَ"] },
    { tr: "4. <b>Alem</b> (özel isim). Dikkat: bazı özel isimler tenvin alır ama yine marifedir: <span class=\"ar\">حَسَنٌ، مُحَمَّدٌ</span>.", ex: ["أَحْمَدُ، مَكَّةُ، قَطَرُ"] },
    { tr: "5. <b>ال ile marife</b> olan isim. ال gelince tenvin düşer.", ex: ["الطَّبِيبُ، النَّهْرُ، السَّاعَةُ"] },
    { tr: "6. <b>Marifeye muzâf</b> olan isim (izafetle marife). Muzâf ال ve tenvin almaz.", ex: ["صَدِيقُ خَلِيلٍ، وَلَدِي، طَبِيبُ الأَسْنَانِ"] }
  ],
  kaide: [
    "الاسْمُ النَّكِرَةُ يَدُلُّ عَلَى شَيْءٍ غَيْرِ مُعَيَّنٍ، وَيَكُونُ عَادَةً مُنَوَّنًا (ـٌ، ـً، ـٍ)، مِثْلُ: هُوَ رَجُلٌ طَيِّبٌ – قَرَأْتُ رِسَالَةً – سَأُسَافِرُ غَدًا مَعَ صَدِيقٍ.",
    "الاسْمُ المَعْرِفَةُ يَدُلُّ عَلَى شَيْءٍ مُعَيَّنٍ، وَهُوَ سِتَّةُ أَنْوَاعٍ:",
    "١ـ الضَّمِيرُ: أَنَا، أَنْتَ، هُوَ...  ٢ـ اسْمُ الإِشَارَةِ: هَذَا، هَذِهِ، هَؤُلَاءِ، ذَلِكَ...",
    "٣ـ الاسْمُ المَوْصُولُ: الَّذِي، الَّتِي، الَّذِينَ...  ٤ـ العَلَمُ: أَحْمَدُ، مَكَّةُ، قَطَرُ...",
    "٥ـ المُعَرَّفُ بِلَامِ التَّعْرِيفِ (ال): الطَّبِيبُ، النَّهْرُ، السَّاعَةُ...",
    "٦ـ المُضَافُ إِلَى الاسْمِ المَعْرِفَةِ: صَدِيقُ خَلِيلٍ، وَلَدِي، طَبِيبُ الأَسْنَانِ..."
  ],
  ex: [
    { type: "tag", roles: ["nek", "mar"], ar: "عَيِّنِ الاسْمَ المَعْرِفَةَ وَالاسْمَ النَّكِرَةَ فِيمَا يَأْتِي", tr: "Kesik çizgili isimlere dokunarak nekire mi, marife mi seç.",
      exHtml: "<span class=\"ar\">انْتَقَلَ حَسَنٌ إِلَى بَيْتٍ جَدِيدٍ (حَسَنٌ: مَعْرِفَةٌ، بَيْتٌ: نَكِرَةٌ)</span>", items: [
      { c: "هَذَا:mar / الكِتَابُ:mar / مُفِيدٌ:nek", tr: "Bu kitap faydalıdır." },
      { c: "هَؤُلَاءِ:mar / الطَّالِبَاتُ:mar / هُنَّ:mar / اللَّاتِي:mar / يَدْرُسْنَ بِـ:- / جُهْدٍ:nek / وَ:- / إِخْلَاصٍ:nek", tr: "Gayret ve ihlâsla çalışanlar işte bu kız öğrencilerdir.", why: "İşaret ismi, zamir ve mevsûl de marifedir." },
      { c: "هَلْ:- / أَنْتَ:mar / طَالِبٌ:nek / فِي:- / كُلِّيَّةِ:mar / الإِلَهِيَّاتِ:mar", tr: "Sen İlahiyat Fakültesinde öğrenci misin?", why: "<span class=\"ar\">كُلِّيَّةِ</span> marifeye muzâf olduğu için marifedir." },
      { c: "اشْتَرَتْ:- / زَيْنَبُ:mar / كِتَابَ:mar / الجُغْرَافْيَا:mar / مِنَ:- / المَكْتَبَةِ:mar", tr: "Zeyneb coğrafya kitabını kitapçıdan aldı." },
      { c: "حَسَنٌ:mar / طَبِيبٌ:nek / فِي:- / مُسْتَشْفَى:mar / الأَطْفَالِ:mar", tr: "Hasan çocuk hastanesinde doktordur.", why: "Tuzak: <span class=\"ar\">حَسَنٌ</span> tenvinli olduğu hâlde özel isim (alem) olduğu için marifedir." },
      { c: "وَصَلَ:- / حُسَيْنٌ:mar / إِلَى:- / الكُلِّيَّةِ:mar / بِـ:- / دَرَّاجَةٍ:nek / نَارِيَّةٍ:nek", tr: "Hüseyin fakülteye motosikletle geldi." },
      { c: "أَقْرَأُ:- / كُتُبًا:nek / عَرَبِيَّةً:nek / كَثِيرَةً:nek", tr: "Birçok Arapça kitap okuyorum." },
      { pre: "﴿", c: "اقْرَأْ بِـ:- / اسْمِ:mar / رَبِّكَ:mar / الَّذِي:mar / خَلَقَ:-", post: "﴾ (العلق: ١)", tr: "Yaratan Rabbinin adıyla oku.", why: "<span class=\"ar\">رَبِّكَ</span>: zamire muzâf (izafetle marife); <span class=\"ar\">اسْمِ</span>: marifeye muzâf." }
    ]},
    { type: "classify", opts: MARIFE_OPTS, ar: "بَيِّنْ نَوْعَ المَعْرِفَةِ", tr: "Bu marife isim hangi türden? (Kitaptaki altı türü pekiştirmek için)", items: [
      { s: "أَنَا", a: "zamir", tr: "ben" }, { s: "هَذِهِ", a: "isaret", tr: "bu (dişil)" }, { s: "الَّذِي", a: "mevsul", tr: "ki o (eril)" }, { s: "مَكَّةُ", a: "alem", tr: "Mekke" },
      { s: "النَّهْرُ", a: "al", tr: "nehir (belli)" }, { s: "صَدِيقُ خَلِيلٍ", a: "izafet", tr: "Halîl'in arkadaşı" }, { s: "هُمْ", a: "zamir", tr: "onlar" }, { s: "ذَلِكَ", a: "isaret", tr: "şu" },
      { s: "الَّتِي", a: "mevsul", tr: "ki o (dişil)" }, { s: "قَطَرُ", a: "alem", tr: "Katar" }, { s: "السَّاعَةُ", a: "al", tr: "saat (belli)" }, { s: "وَلَدِي", a: "izafet", tr: "oğlum", why: "Zamire muzâf: izafetle marife." },
      { s: "هَؤُلَاءِ", a: "isaret", tr: "bunlar" }, { s: "الَّذِينَ", a: "mevsul", tr: "ki onlar" }, { s: "حَسَنٌ", a: "alem", tr: "Hasan", why: "Tenvinli ama özel isim." }, { s: "طَبِيبُ الأَسْنَانِ", a: "izafet", tr: "diş doktoru" }
    ]},
    { type: "reading", ar: "اقْرَأِ الحِوَارَ التَّالِيَ", tr: "Diyaloğu oku ve soruları cevapla.", title: "مُكَالَمَةٌ هَاتِفِيَّةٌ",
      dialog: [
        ["طَلْحَةُ", "آلُو، السَّلَامُ عَلَيْكُمْ، مَنْ مَعِي؟"], ["مَرْيَمُ", "أَنَا مَرْيَمُ."], ["طَلْحَةُ", "مَرْحَبًا، أَنَا طَلْحَةُ، صَبَاحَ الخَيْرِ، كَيْفَ حَالُكِ؟"], ["مَرْيَمُ", "صَبَاحَ النُّورِ، أَنَا بِخَيْرٍ الحَمْدُ لِلَّهِ."],
        ["طَلْحَةُ", "أَيْنَ أَنْتِ الآنَ؟"], ["مَرْيَمُ", "أَنَا الآنَ فِي إِسْطَنْبُولَ. كَيْفَ الحَالُ؟"], ["طَلْحَةُ", "أَنَا بِخَيْرٍ. كَيْفَ الصِّحَّةُ؟"], ["مَرْيَمُ", "شُكْرًا، لَا بَأْسَ، وَكَيْفَ حَالُ العَائِلَةِ؟"],
        ["طَلْحَةُ", "العَائِلَةُ بِخَيْرٍ، شُكْرًا. وَكَيْفَ حَالُ الأَبِ؟"], ["مَرْيَمُ", "هُوَ الآنَ فِي الإِسْكَنْدَرِيَّةِ وَهُوَ بِخَيْرٍ."], ["طَلْحَةُ", "كَيْفَ عَائِشَةُ وَأَيْنَ هِيَ الآنَ؟"], ["مَرْيَمُ", "هِيَ بِخَيْرٍ الحَمْدُ لِلَّهِ. هِيَ فِي السُّوقِ مَعَ صَدِيقَاتِهَا."],
        ["طَلْحَةُ", "كَيْفَ إِسْطَنْبُولُ؟"], ["مَرْيَمُ", "إِسْطَنْبُولُ مَدِينَةٌ كَبِيرَةٌ وَجَمِيلَةٌ، فِيهَا شَوَارِعُ وَاسِعَةٌ وَبِنَايَاتٌ عَالِيَةٌ."], ["طَلْحَةُ", "طَيِّبٌ، مَعَ السَّلَامَةِ وَإِلَى اللِّقَاءِ."], ["مَرْيَمُ", "مَعَ السَّلَامَةِ."]
      ],
      textTr: "Talha telefonla Meryem'i arıyor. Meryem İstanbul'da; babası İskenderiye'de; Âişe arkadaşlarıyla çarşıda. Meryem'e göre İstanbul geniş caddeleri ve yüksek binalarıyla büyük ve güzel bir şehir.",
      qa: [
        { q: "مَنْ يَتَكَلَّمُ بِالتِّلِفُونِ؟", a: "يَتَكَلَّمُ طَلْحَةُ وَمَرْيَمُ.", tr: "Telefonda kim konuşuyor? Talha ve Meryem." },
        { q: "مَنْ فِي الإِسْكَنْدَرِيَّةِ؟", a: "الأَبُ فِي الإِسْكَنْدَرِيَّةِ.", tr: "İskenderiye'de kim var? Baba." },
        { q: "أَيْنَ مَرْيَمُ؟", a: "مَرْيَمُ الآنَ فِي إِسْطَنْبُولَ.", tr: "Meryem nerede? İstanbul'da. (Kitapta \"Talha nerede?\" diye soruluyor; diyalogda İstanbul'da olan Meryem'dir, Talha'nın yeri söylenmiyor.)" }
      ],
      cls: { opts: [["nek", "Nekire", "نَكِرَةٌ", "nek"], ["mar", "Marife", "مَعْرِفَةٌ", "mar"]], ar: "اسْتَخْرِجْ مِنَ الحِوَارِ: اسْمًا نَكِرَةً وَاسْمًا مَعْرِفَةً", tr: "Diyalogdaki bu isimler nekire mi, marife mi?", items: [
        { s: "مَدِينَةٌ", a: "nek", why: "Tenvinli, belirsiz: nekire." }, { s: "مَرْيَمُ", a: "mar", why: "Özel isim (alem)." }, { s: "شَوَارِعُ", a: "nek", why: "Belirsiz çoğul: nekire (bu kalıp tenvin almaz)." }, { s: "العَائِلَةُ", a: "mar", why: "ال ile marife." },
        { s: "بِنَايَاتٌ", a: "nek", why: "Tenvinli: nekire." }, { s: "هِيَ", a: "mar", why: "Zamir: marife." }, { s: "حَالُ العَائِلَةِ", a: "mar", why: "Marifeye muzâf: izafetle marife." }, { s: "صَدِيقَاتِهَا", a: "mar", why: "Zamire muzâf: marife." }
      ]},
      cls2: { opts: [["muz", "Müzekker", "مُذَكَّرٌ", "muz"], ["mun", "Müennes", "مُؤَنَّثٌ", "mun"]], ar: "اسْتَخْرِجْ: اسْمًا مُذَكَّرًا وَاسْمًا مُؤَنَّثًا", tr: "Bu isimler müzekker mi, müennes mi?", items: [
        { s: "الأَبُ", a: "muz" }, { s: "عَائِشَةُ", a: "mun" }, { s: "الصِّحَّةُ", a: "mun", why: "ة var." }, { s: "مَدِينَةٌ", a: "mun", why: "ة var." }, { s: "الحَالُ", a: "muz" }, { s: "إِسْطَنْبُولُ", a: "mun", why: "Şehir adları genellikle müennes kabul edilir; sıfatı da müennes gelmiş: مَدِينَةٌ كَبِيرَةٌ." }
      ]}
    },
    { type: "pick", ar: "اجْعَلِ الأَسْمَاءَ النَّكِرَةَ فِي الجُمَلِ التَّالِيَةِ مُعَرَّفَةً بِأَلْ", tr: "Nekireleri ال ile marife yap: doğru şıkkı seç. ال gelince tenvin düşer!",
      exHtml: "<span class=\"ar\">رَأَيْتُ طِفْلًا يَلْعَبُ فِي الحَدِيقَةِ ← رَأَيْتُ الطِّفْلَ يَلْعَبُ فِي الحَدِيقَةِ</span>", items: [
      { q: "اشْتَرَيْتُ كِتَابًا وَدَفْتَرًا أَمْسِ.", o: ["اشْتَرَيْتُ الكِتَابًا وَالدَّفْتَرًا أَمْسِ.", "اشْتَرَيْتُ الكِتَابَ وَالدَّفْتَرَ أَمْسِ.", "اشْتَرَيْتُ الكِتَابُ وَالدَّفْتَرُ أَمْسِ."], a: 1, tr: "Kitabı ve defteri dün aldım.", why: "ال ile tenvin bir arada olmaz: <span class=\"ar\">الكِتَابًا</span> yanlıştır." },
      { q: "هَذِهِ طَبِيبَةٌ تَعْمَلُ فِي مُسْتَشْفًى كَبِيرٍ.", o: ["هَذِهِ الطَّبِيبَةُ تَعْمَلُ فِي المُسْتَشْفَى الكَبِيرِ.", "هَذِهِ الطَّبِيبَةٌ تَعْمَلُ فِي المُسْتَشْفَى كَبِيرٍ.", "هَذِهِ طَبِيبَةُ تَعْمَلُ فِي مُسْتَشْفًى الكَبِيرِ."], a: 0, tr: "Bu doktor hanım büyük hastanede çalışıyor.", why: "İsim ال alınca sıfatı da ال alır: <span class=\"ar\">المُسْتَشْفَى الكَبِيرِ</span>." },
      { q: "وَصَلَتْ بِنْتٌ إِلَى الحَدِيقَةِ.", o: ["وَصَلَتِ البِنْتٌ إِلَى الحَدِيقَةِ.", "وَصَلَتِ البِنْتُ إِلَى الحَدِيقَةِ.", "وَصَلَتْ البِنْتَ إِلَى الحَدِيقَةِ."], a: 1, tr: "Kız bahçeye vardı." },
      { q: "رَأَيْتُ طَالِبًا يَجْتَهِدُ فِي دُرُوسِهِ بِانْتِبَاهٍ.", o: ["رَأَيْتُ الطَّالِبًا يَجْتَهِدُ فِي دُرُوسِهِ.", "رَأَيْتُ الطَّالِبُ يَجْتَهِدُ فِي دُرُوسِهِ.", "رَأَيْتُ الطَّالِبَ يَجْتَهِدُ فِي دُرُوسِهِ بِانْتِبَاهٍ."], a: 2, tr: "Derslerinde dikkatle çalışan öğrenciyi gördüm." },
      { q: "شَكَرَ الرَّجُلُ العَامِلَةَ.", o: ["Bu cümlede nekire yok; aynen kalır.", "شَكَرَ الرَّجُلٌ العَامِلَةً.", "شَكَرَ رَجُلٌ عَامِلَةً."], a: 0, tr: "Adam işçi kadına teşekkür etti.", why: "<span class=\"ar\">الرَّجُلُ</span> ve <span class=\"ar\">العَامِلَةَ</span> zaten ال ile marifedir." },
      { q: "تَعَرَّفْتُ فِي مَسْجِدٍ إِلَى سَائِحٍ مِصْرِيٍّ.", o: ["تَعَرَّفْتُ فِي المَسْجِدِ إِلَى السَّائِحِ مِصْرِيٍّ.", "تَعَرَّفْتُ فِي المَسْجِدٍ إِلَى السَّائِحٍ المِصْرِيٍّ.", "تَعَرَّفْتُ فِي المَسْجِدِ إِلَى السَّائِحِ المِصْرِيِّ."], a: 2, tr: "Mescitte Mısırlı turistle tanıştım." },
      { q: "شَاهَدْتُ بَرْنَامَجًا فِي التِّلْفَازِ.", o: ["شَاهَدْتُ البَرْنَامَجَ فِي التِّلْفَازِ.", "شَاهَدْتُ البَرْنَامَجًا فِي التِّلْفَازِ.", "شَاهَدْتُ البَرْنَامَجُ فِي التِّلْفَازِ."], a: 0, tr: "Programı televizyonda izledim." },
      { q: "هَذَا طَالِبٌ نَجَحَ فِي الامْتِحَانِ.", o: ["هَذَا الطَّالِبٌ نَجَحَ فِي الامْتِحَانِ.", "هَذَا الطَّالِبُ نَجَحَ فِي الامْتِحَانِ.", "هَذَا الطَّالِبَ نَجَحَ فِي الامْتِحَانِ."], a: 1, tr: "Sınavı kazanan öğrenci bu." }
    ]},
    { type: "pick", ar: "اجْعَلِ الأَسْمَاءَ التَّالِيَةَ مُعَرَّفَةً بِالإِضَافَةِ", tr: "İzafetle marife yap: muzâf ال ve tenvin almaz. Doğru tamlamayı seç.",
      exHtml: "<span class=\"ar\">مُهَنْدِسٌ (الشَّرِكَة) ← تَكَلَّمْتُ مَعَ مُهَنْدِسِ الشَّرِكَةِ</span>", items: [
      { q: "مُدَرِّسٌ (الصَّفّ)", o: ["المُدَرِّسُ الصَّفِّ", "مُدَرِّسُ الصَّفِّ", "مُدَرِّسٌ الصَّفُّ"], a: 1, tr: "sınıfın öğretmeni" },
      { q: "كُلِّيَّةٌ (الطِّبّ)", o: ["كُلِّيَّةُ الطِّبِّ", "الكُلِّيَّةُ الطِّبِّ", "كُلِّيَّةٌ الطِّبِّ"], a: 0, tr: "tıp fakültesi" },
      { q: "جَامِعَةٌ (الشَّرْق الأَوْسَط)", o: ["جَامِعَةٌ الشَّرْقِ الأَوْسَطِ", "الجَامِعَةُ الشَّرْقُ الأَوْسَطُ", "جَامِعَةُ الشَّرْقِ الأَوْسَطِ"], a: 2, tr: "Orta Doğu Üniversitesi" },
      { q: "رَئِيسٌ (الدَّوْلَة)", o: ["رَئِيسُ الدَّوْلَةِ", "الرَّئِيسُ الدَّوْلَةِ", "رَئِيسٌ الدَّوْلَةِ"], a: 0, tr: "devlet başkanı" },
      { q: "مَكْتَبَةٌ (الجَامِعَة)", o: ["المَكْتَبَةُ الجَامِعَةِ", "مَكْتَبَةُ الجَامِعَةِ", "مَكْتَبَةٌ الجَامِعَةُ"], a: 1, tr: "üniversite kütüphanesi" },
      { q: "طَبِيبٌ (القَلْب)", o: ["طَبِيبٌ القَلْبِ", "الطَّبِيبُ القَلْبِ", "طَبِيبُ القَلْبِ"], a: 2, tr: "kalp doktoru" },
      { q: "مُدِيرٌ (المَدْرَسَة)", o: ["مُدِيرُ المَدْرَسَةِ", "المُدِيرُ المَدْرَسَةِ", "مُدِيرٌ المَدْرَسَةِ"], a: 0, tr: "okul müdürü" },
      { q: "مِفْتَاحٌ (البَاب)", o: ["المِفْتَاحُ البَابِ", "مِفْتَاحُ البَابِ", "مِفْتَاحٌ البَابُ"], a: 1, tr: "kapının anahtarı" }
    ]},
    { type: "pick", fill: true, ar: "أَكْمِلْ بِوَضْعِ اسْمٍ مَعْرِفَةٍ مُنَاسِبٍ", tr: "Boşluğa uygun marife ismi koy.", exHtml: "<span class=\"ar\">وَصَلَ <u>المُدِيرُ</u> إِلَى الشَّرِكَةِ.</span>", items: [
      { q: "قَرَأْتُ ___ هَذَا الصَّبَاحَ.", o: ["الجَرِيدَةَ", "جَرِيدَةً", "جَرِيدَةٌ"], a: 0, tr: "Bu sabah gazeteyi okudum.", why: "ال ile marife." },
      { q: "يَسْكُنُ ___ فِي شَارِعِ الجُمْهُورِيَّةِ.", o: ["صَدِيقٌ", "صَدِيقِي", "صَدِيقًا"], a: 1, tr: "Arkadaşım Cumhuriyet Caddesinde oturuyor.", why: "Zamire muzâf: izafetle marife." },
      { q: "___ أَخِي الأَكْبَرُ.", o: ["هَذَا", "رَجُلٌ", "طَالِبٌ"], a: 0, tr: "Bu benim ağabeyim.", why: "İsm-i işaret." },
      { q: "___ جَامِعَةٌ كَبِيرَةٌ.", o: ["جَامِعَةٌ", "مَرْمَرَةُ", "مَدِينَةٌ"], a: 1, tr: "Marmara büyük bir üniversitedir.", why: "Alem (özel isim)." },
      { q: "يَطُوفُ ___ بِالكَعْبَةِ.", o: ["حُجَّاجٌ", "حَاجًّا", "الحُجَّاجُ"], a: 2, tr: "Hacılar Kâbe'yi tavaf ediyor.", why: "ال ile marife." },
      { q: "هَلْ تَكَلَّمْتَ مَعَ الرَّجُلِ ___ قَدَّمْتُهُ إِلَيْكَ؟", o: ["الَّذِي", "الَّتِي", "الَّذِينَ"], a: 0, tr: "Sana tanıttığım adamla konuştun mu?", why: "İsm-i mevsûl; <span class=\"ar\">الرَّجُلِ</span> tekil müzekker olduğu için <span class=\"ar\">الَّذِي</span>." },
      { q: "___ عَاصِمَةُ تُرْكِيَا.", o: ["إِسْطَنْبُولُ", "مَدِينَةٌ", "أَنْقَرَةُ"], a: 2, tr: "Ankara Türkiye'nin başkentidir.", why: "Alem." },
      { q: "___ البَيْتِ مَفْتُوحَةٌ.", o: ["نَافِذَةُ", "نَافِذَةٌ", "النَّافِذَةُ"], a: 0, tr: "Evin penceresi açık.", why: "Marifeye muzâf: muzâf ال ve tenvin almaz." }
    ]},
    { type: "find", target: "mar", reading: true, ar: "اقْرَأِ الفِقْرَةَ التَّالِيَةَ وَعَيِّنِ الاسْمَ المَعْرِفَةَ", tr: "Paragraftaki marife isimlere dokun (kesik çizgili kelimeler isimdir), sonra Kontrol et.",
      title: "دُرُوسُنَا",
      text: "نَحْنُ نَتَعَلَّمُ هَذِهِ السَّنَةَ اللُّغَةَ العَرَبِيَّةَ فِي الصَّفِّ التَّحْضِيرِيِّ. عِنْدَنَا أَرْبَعُ مَوَادَّ دِرَاسِيَّةٍ. وَمِنْ بَيْنِ هَذِهِ المَوَادِّ مَادَّةُ القَوَاعِدِ العَرَبِيَّةِ الَّتِي تَتَنَاوَلُ خَصَائِصَ الكَلِمَاتِ وَالجُمَلِ فِي العَرَبِيَّةِ مِنْ حَيْثُ البِنَاءُ وَالإِعْرَابُ. القَوَاعِدُ مُهِمَّةٌ جِدًّا، لِأَنَّنَا نُكَوِّنُ بِهَا جُمَلًا صَحِيحَةً وَنُمَيِّزُ صَحِيحَهَا مِنْ خَطَئِهَا.",
      textTr: "Bu yıl hazırlık sınıfında Arapça öğreniyoruz. Dört dersimiz var. Bu derslerden biri, Arapçada kelimelerin ve cümlelerin yapı ve i'rab bakımından özelliklerini ele alan Arapça kurallar (gramer) dersidir. Kurallar çok önemlidir; çünkü onlarla doğru cümleler kurar, doğruyu yanlıştan ayırırız.",
      items: [
      { c: "نَحْنُ:y / نَتَعَلَّمُ:- / هَذِهِ:y / السَّنَةَ:y / اللُّغَةَ:y / العَرَبِيَّةَ:y / فِي:- / الصَّفِّ:y / التَّحْضِيرِيِّ:y", tr: "Bu yıl hazırlık sınıfında Arapça öğreniyoruz.", why: "Hepsi marife: zamir, işaret ismi ve ال'li isimler." },
      { c: "عِنْدَنَا:- / أَرْبَعُ:n / مَوَادَّ:n / دِرَاسِيَّةٍ:n", tr: "Dört dersimiz var.", why: "Hepsi nekire: hiçbiri ال almamış ve marifeye muzâf değil." },
      { c: "مِنْ بَيْنِ:- / هَذِهِ:y / المَوَادِّ:y / مَادَّةُ:y / القَوَاعِدِ:y / العَرَبِيَّةِ:y / الَّتِي:y / تَتَنَاوَلُ:- / خَصَائِصَ:y / الكَلِمَاتِ:y", tr: "Bu derslerden biri, kelimelerin özelliklerini ele alan Arapça gramer dersidir.", why: "<span class=\"ar\">مَادَّةُ</span> ve <span class=\"ar\">خَصَائِصَ</span> marifeye muzâf olduğu için marifedir; <span class=\"ar\">الَّتِي</span> mevsûl." },
      { c: "القَوَاعِدُ:y / مُهِمَّةٌ:n / جِدًّا:n", tr: "Kurallar çok önemlidir." },
      { c: "نُكَوِّنُ بِهَا:- / جُمَلًا:n / صَحِيحَةً:n", tr: "Onlarla doğru cümleler kurarız." }
    ]},
    { type: "classify", opts: [["muf", "Müfred", "مُفْرَدٌ", "muf"], ["mns", "Cem-i müennes sâlim", "جَمْعُ مُؤَنَّثٍ سَالِمٌ", "mun"], ["tks", "Cem-i teksîr", "جَمْعُ تَكْسِيرٍ", "cem"]], ar: "اسْتَخْرِجْ مِنَ الفِقْرَةِ: جَمْعَ مُؤَنَّثٍ سَالِمًا، جَمْعَ تَكْسِيرٍ، اسْمًا مُفْرَدًا", tr: "Paragraftaki bu isimler hangi türden?", items: [
      { s: "الكَلِمَاتِ", a: "mns", why: "كَلِمَةٌ ← كَلِمَاتٌ" }, { s: "المَوَادِّ", a: "tks", why: "مَادَّةٌ ← مَوَادُّ" }, { s: "القَوَاعِدُ", a: "tks", why: "قَاعِدَةٌ ← قَوَاعِدُ" }, { s: "السَّنَةَ", a: "muf" },
      { s: "خَصَائِصَ", a: "tks", why: "خَصِيصَةٌ ← خَصَائِصُ" }, { s: "الجُمَلِ", a: "tks", why: "جُمْلَةٌ ← جُمَلٌ" }, { s: "اللُّغَةَ", a: "muf" }, { s: "الصَّفِّ", a: "muf" }
    ]}
  ]
}
];

// ---------- oyun ve quiz havuzları ----------
var KELIME_POOL = [
  ["كِتَابٌ", "ism"], ["قَلَمٌ", "ism"], ["مَسْجِدٌ", "ism"], ["صَبَاحٌ", "ism"], ["جَمَلٌ", "ism"], ["تُفَّاحٌ", "ism"], ["هُوَ", "ism"], ["هَذَا", "ism"], ["الآنَ", "ism"], ["مُدَرِّسٌ", "ism"], ["إِسْطَنْبُولُ", "ism"], ["الَّذِي", "ism"], ["جِدًّا", "ism"], ["قَبْلَ", "ism"],
  ["رَجَعَ", "fiil"], ["قَرَأَ", "fiil"], ["شَرَحَ", "fiil"], ["ذَهَبَ", "fiil"], ["سَكَتَ", "fiil"], ["نَظَرَ", "fiil"], ["سَيَتَعَلَّمُ", "fiil"], ["يَدْرُسُ", "fiil"], ["كَتَبَ", "fiil"], ["جَلَسَ", "fiil"], ["سَلِمَ", "fiil"], ["يَفْهَمُ", "fiil"],
  ["فِي", "harf"], ["مِنْ", "harf"], ["إِلَى", "harf"], ["عَلَى", "harf"], ["عَنْ", "harf"], ["بِـ", "harf"], ["وَ", "harf"], ["هَلْ", "harf"], ["ثُمَّ", "harf"], ["لَا", "harf"]
];
var CINS_POOL = [
  ["قَلَمٌ", "muz", "Alamet yok."], ["حَقِيبَةٌ", "mun", "Tâ-i merbûta (ة)."], ["كُبْرَى", "mun", "Elif-i maksûre (ى)."], ["حَمْرَاءُ", "mun", "Elif-i memdûde (اء)."], ["زَيْنَبُ", "mun", "Dişi adı."], ["جَعْفَرٌ", "muz", "Erkek adı."],
  ["مَدْرَسَةٌ", "mun", "ة var."], ["بَيْتٌ", "muz", "Alamet yok."], ["أُمٌّ", "mun", "Dişiyi gösterir."], ["أَبٌ", "muz", "Erkeği gösterir."], ["لَيْلَى", "mun", "ى ve dişi adı."], ["صَحْرَاءُ", "mun", "اء alameti."],
  ["سَمْرَاءُ", "mun", "اء alameti."], ["حُسْنَى", "mun", "ى alameti."], ["كِتَابٌ", "muz", "Alamet yok."], ["سَيَّارَةٌ", "mun", "ة var."], ["الشَّمْسُ", "mun", "Semâî müennes: alametsiz."], ["الأَرْضُ", "mun", "Semâî müennes."],
  ["النَّفْسُ", "mun", "Semâî müennes."], ["الحَرْبُ", "mun", "Semâî müennes."], ["الغَدَاءُ", "muz", "Tuzak: hemze kökten, alamet değil."], ["مَاءٌ", "muz", "Tuzak: hemze kökten, alamet değil."], ["بِنْتٌ", "mun", "Dişiyi gösterir."], ["وَلَدٌ", "muz", "Erkeği gösterir."],
  ["مَرْيَمُ", "mun", "Dişi adı."], ["مُدِيرٌ", "muz", "Alamet yok."], ["مُدِيرَةٌ", "mun", "ة var."], ["أُخْتٌ", "mun", "Dişiyi gösterir."], ["نَاقَةٌ", "mun", "ة var."], ["دِيكٌ", "muz", "Erkek hayvan."],
  ["ذِكْرَى", "mun", "ى alameti."], ["عَاصِمَةٌ", "mun", "ة var."], ["قَمَرٌ", "muz", "Alamet yok."], ["شَجَرَةٌ", "mun", "ة var."]
];
var SAYI_POOL = [
  ["كِتَابٌ", "muf"], ["كِتَابَانِ", "mus"], ["كُتُبٌ", "tks"], ["مُسْلِمٌ", "muf"], ["مُسْلِمَانِ", "mus"], ["مُسْلِمَيْنِ", "mus"], ["مُسْلِمُونَ", "mzs"], ["مُسْلِمِينَ", "mzs"], ["مُسْلِمَاتٌ", "mns"],
  ["طَائِرَةٌ", "muf"], ["طَائِرَتَانِ", "mus"], ["طَائِرَاتٌ", "mns"], ["طِفْلٌ", "muf"], ["أَطْفَالٌ", "tks"], ["مَسَاجِدُ", "tks"], ["مُدَرِّسُونَ", "mzs"], ["مُدَرِّسَاتٌ", "mns"], ["يَوْمَانِ", "mus"],
  ["أَيَّامٌ", "tks"], ["عَيْنَانِ", "mus"], ["أَصَابِعُ", "tks"], ["مُؤْمِنُونَ", "mzs"], ["مُؤْمِنَاتٌ", "mns"], ["رِجَالٌ", "tks"], ["نِسَاءٌ", "tks"], ["طُلَّابٌ", "tks"], ["طَالِبَتَيْنِ", "mus"],
  ["قَلْبٌ", "muf"], ["مُهَنْدِسِينَ", "mzs"], ["سَيَّارَاتٌ", "mns"], ["شُعَرَاءُ", "tks"], ["بُيُوتٌ", "tks"], ["مَدِينَةٌ", "muf"], ["مُدُنٌ", "tks"], ["بَيْتَيْنِ", "mus"], ["مُعَلِّمُونَ", "mzs"]
];
var MARIFE_POOL = [
  ["رَجُلٌ", "nek"], ["قَلَمٌ", "nek"], ["رِسَالَةً", "nek"], ["صَدِيقٍ", "nek"], ["مَدِينَةٌ", "nek"], ["بَيْتٌ جَدِيدٌ", "nek"], ["كُتُبًا", "nek"], ["مَوَادَّ", "nek"],
  ["أَنَا", "zamir"], ["هُوَ", "zamir"], ["نَحْنُ", "zamir"], ["أَنْتِ", "zamir"], ["هَذَا", "isaret"], ["هَذِهِ", "isaret"], ["ذَلِكَ", "isaret"], ["هَؤُلَاءِ", "isaret"],
  ["الَّذِي", "mevsul"], ["الَّتِي", "mevsul"], ["الَّذِينَ", "mevsul"], ["أَحْمَدُ", "alem"], ["مَكَّةُ", "alem"], ["حَسَنٌ", "alem"], ["تُرْكِيَا", "alem"], ["مُحَمَّدٌ", "alem"],
  ["الطَّبِيبُ", "al"], ["النَّهْرُ", "al"], ["الكِتَابُ", "al"], ["السَّاعَةُ", "al"], ["صَدِيقُ خَلِيلٍ", "izafet"], ["وَلَدِي", "izafet"], ["طَبِيبُ الأَسْنَانِ", "izafet"], ["بَابُ البَيْتِ", "izafet"]
];
var HAFIZA = {
  cogul: { name: "Tekil ↔ Çoğul", pairs: [["كِتَابٌ", "كُتُبٌ"], ["طِفْلٌ", "أَطْفَالٌ"], ["مَسْجِدٌ", "مَسَاجِدُ"], ["رَجُلٌ", "رِجَالٌ"], ["امْرَأَةٌ", "نِسَاءٌ"], ["يَوْمٌ", "أَيَّامٌ"], ["قَلَمٌ", "أَقْلَامٌ"], ["طَالِبٌ", "طُلَّابٌ"], ["صُورَةٌ", "صُوَرٌ"], ["شَاعِرٌ", "شُعَرَاءُ"], ["أَبٌ", "آبَاءٌ"], ["حَرْبٌ", "حُرُوبٌ"]] },
  cins: { name: "Erkek ↔ Dişi", pairs: [["وَلَدٌ", "بِنْتٌ"], ["رَجُلٌ", "امْرَأَةٌ"], ["أَبٌ", "أُمٌّ"], ["أَخٌ", "أُخْتٌ"], ["عَمٌّ", "عَمَّةٌ"], ["خَالٌ", "خَالَةٌ"], ["دِيكٌ", "دَجَاجَةٌ"], ["ثَوْرٌ", "بَقَرَةٌ"], ["جَمَلٌ", "نَاقَةٌ"], ["مُدِيرٌ", "مُدِيرَةٌ"], ["طَبِيبٌ", "طَبِيبَةٌ"], ["أَحْمَرُ", "حَمْرَاءُ"]] }
};
// Hatırlatma kartları (özet sayfası)
var KARTLAR = [
  ["Kelime kaç kısımdır?", "Üç: isim (اسْمٌ), fiil (فِعْلٌ), harf (حَرْفٌ)."],
  ["İsim neleri gösterir?", "İnsan, hayvan, bitki, mekân, zaman, cansız varlık: مُحَمَّدٌ، جَمَلٌ، تُفَّاحٌ، مَسْجِدٌ، صَبَاحٌ، قَلَمٌ"],
  ["Fiil neyi bildirir?", "Belli bir zamanda bir işin olmasını: رَجَعَ، قَرَأَ، ذَهَبَ"],
  ["Harfin özelliği?", "Tek başına anlamı yoktur; isim ve fiille anlam kazanır: فِي، مِنْ، إِلَى"],
  ["Müennesin üç alameti?", "ة (tâ-i merbûta), ى (elif-i maksûre), اء (elif-i memdûde): حَقِيبَةٌ، كُبْرَى، حَمْرَاءُ"],
  ["Alametsiz müennes örneği?", "Dişiyi gösterenler (زَيْنَبُ، أُمٌّ) ve semâî müennesler (الشَّمْسُ، الأَرْضُ، النَّفْسُ)."],
  ["Müsennâ nasıl yapılır?", "Müfredin sonuna ـانِ ya da ـَيْنِ eklenir: كِتَابَانِ / كِتَابَيْنِ"],
  ["Cemin üç türü?", "Müzekker sâlim (ـُونَ/ـِينَ), müennes sâlim (ـَاتٌ), teksîr (kalıp değişir)."],
  ["Cem-i müzekker sâlim örneği?", "مُدَرِّسٌ ← مُدَرِّسُونَ / مُدَرِّسِينَ"],
  ["Cem-i teksîr örneği?", "كِتَابٌ ← كُتُبٌ، طِفْلٌ ← أَطْفَالٌ، مَسْجِدٌ ← مَسَاجِدُ"],
  ["Nekirenin işareti?", "Belirsizdir, çoğunlukla tenvinlidir: رَجُلٌ، رِسَالَةً، صَدِيقٍ"],
  ["Marife kaç türdür?", "Altı: zamir, ism-i işaret, ism-i mevsûl, alem, ال'li isim, marifeye muzâf isim."],
  ["ال ile tenvin bir arada olur mu?", "Hayır. الكِتَابُ olur, الكِتَابٌ olmaz."],
  ["Muzâfın özelliği?", "ال ve tenvin almaz: مُدِيرُ المَدْرَسَةِ (المُدِيرُ المَدْرَسَةِ yanlış)."],
  ["حَسَنٌ tenvinli; nekire mi?", "Hayır, özel isim (alem) olduğu için marifedir."],
  ["الغَدَاءُ müennes mi?", "Hayır. Sondaki hemze kökten gelir; müennes alameti değildir."]
];
