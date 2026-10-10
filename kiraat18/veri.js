// ================= Kıraat 18 — إِسْطَنْبُولُ =================
// Renk rolleri: mz tarih, nasb yer/doğa, cerr eser, mi kalıp, ref fiil
var ROLES = {
  mz: { ar: "التَّارِيخُ", tr: "Tarih" }, nasb: { ar: "المَكَانُ", tr: "Yer / doğa" }, cerr: { ar: "المَعْلَمُ", tr: "Eser" },
  mi: { ar: "التَّرْكِيبُ", tr: "Kalıp" }, ref: { ar: "الفِعْلُ", tr: "Fiil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var MEKAN = [["c", "Cami / kilise", "مَسْجِدٌ / كَنِيسَةٌ", "mz"], ["q", "Saray", "قَصْرٌ", "nasb"], ["b", "Kule / köprü", "بُرْجٌ / جِسْرٌ", "ref"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", c: "Cami / kilise", q: "Saray", b: "Kule / köprü" };

// Tarih çizgisi: [zaman, Arapça, Türkçe, rol]
var TARIH = [
  ["قَبْلَ المِيلَادِ", "بِيزَنْطَةُ", "Bizantion: şehrin tarihi milattan önceye uzanır.", "mz"],
  ["ثُمَّ", "القُسْطَنْطِينِيَّةُ", "Konstantinopolis: şehrin ikinci tarihî adı.", "mz"],
  ["عَصْرُ الصَّحَابَةِ", "أَبُو أَيُّوبَ الأَنْصَارِيُّ مَاتَ وَدُفِنَ فِيهَا", "Sahabe fethe çalıştı; Ebû Eyyûb el-Ensârî orada vefat etti ve defnedildi.", "nasb"],
  ["١٤٥٣م", "فَتَحَهَا السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ", "Fatih Sultan Mehmed şehri fethetti: önemli bir tarihî olay.", "cerr"],
  ["اليَوْمَ", "أَكْبَرُ مُدُنِ تُرْكِيَا مِنْ حَيْثُ عَدَدُ السُّكَّانِ", "Bugün nüfusça Türkiye’nin en büyük şehri; yollar, köprüler, tüneller.", "ref"]
];

// Tafdîl makinesi: [sıfat (müennes), أَفْعَلُ (merfû), أَفْعَلِ (mecrûr), temyiz, Türkçe sıfat, Türkçe ek]
var SIFAT = [
  ["كَبِيرَةٌ", "أَكْبَرُ", "أَكْبَرِ", "", "büyük", "tür"],
  ["جَمِيلَةٌ", "أَجْمَلُ", "أَجْمَلِ", "", "güzel", "dir"],
  ["مُهِمَّةٌ", "أَهَمُّ", "أَهَمِّ", "", "önemli", "dir"],
  ["مَشْهُورَةٌ", "أَشْهَرُ", "أَشْهَرِ", "", "meşhur", "dur"],
  ["غَنِيَّةٌ", "أَغْنَى", "أَغْنَى", "", "zengin", "dir"],
  ["مُزْدَحِمَةٌ", "أَكْثَرُ", "أَكْثَرِ", "ازْدِحَامًا", "kalabalık", "tır"]
];
var ZK = [["Sıfat", "مَدِينَةٌ كَبِيرَةٌ"], ["Kıyas", "أَكْبَرُ مِنْ"], ["En …", "أَكْبَرُ المُدُنِ"], ["En …lerden", "مِنْ أَكْبَرِ المُدُنِ"]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "إِسْطَنْبُولُ مَدِينَةٌ جَمِيلَةٌ، تَقَعُ عَلَى مَضِيقِ «البُوسْفُورِ»، وَهِيَ المَدِينَةُ الوَحِيدَةُ فِي العَالَمِ الَّتِي تَقَعُ عَلَى قَارَّتَيْنِ: آسْيَا وَأُورُوبَّا، لِذَلِكَ تَجْذِبُ السَّائِحِينَ مِنْ كُلِّ أَنْحَاءِ العَالَمِ." +
  "<br>تُعْرَفُ إِسْطَنْبُولُ تَارِيخِيًّا بِاسْمَيْ «بِيزَنْطَةَ» وَ«القُسْطَنْطِينِيَّةِ»، وَيَعُودُ تَارِيخُهَا إِلَى مَا قَبْلَ المِيلَادِ. وَهِيَ أَكْبَرُ المُدُنِ فِي تُرْكِيَا مِنْ حَيْثُ عَدَدُ السُّكَّانِ، وَهِيَ أَيْضًا مِنْ أَكْثَرِ المُدُنِ ازْدِحَامًا فِي العَالَمِ." +
  "<br>فُتِحَتْ إِسْطَنْبُولُ سَنَةَ ١٤٥٣ لِلْمِيلَادِ مِنْ قِبَلِ السُّلْطَانِ مُحَمَّدٍ الفَاتِحِ، وَهُوَ حَدَثٌ تَارِيخِيٌّ مُهِمٌّ. وَكَانَ المُسْلِمُونَ مُنْذُ عَصْرِ الصَّحَابَةِ يُحَاوِلُونَ فَتْحَ هَذِهِ المَدِينَةِ لِيَنَالُوا مَدْحَ النَّبِيِّ ﷺ فِي قَوْلِهِ: «لَتُفْتَحَنَّ القُسْطَنْطِينِيَّةُ، فَلَنِعْمَ الأَمِيرُ أَمِيرُهَا، وَلَنِعْمَ الجَيْشُ ذَلِكَ الجَيْشُ». لِهَذَا جَاءَ كَثِيرٌ مِنَ الصَّحَابَةِ، وَعَلَى رَأْسِهِمْ أَبُو أَيُّوبَ الأَنْصَارِيُّ لِيَنَالَ هَذَا الشَّرَفَ، فَمَاتَ وَدُفِنَ فِيهَا، وَكَانَ هَذَا الشَّرَفُ لِلسُّلْطَانِ مُحَمَّدٍ، وَلِهَذَا سُمِّيَ بِـ«الفَاتِحِ»." +
  "<br>تَشْتَهِرُ إِسْطَنْبُولُ بِبِيئَةٍ طَبِيعِيَّةٍ مُتَنَوِّعَةٍ، تَجْمَعُ هَذِهِ الطَّبِيعَةُ بَيْنَ الجِبَالِ الخَضْرَاءِ، وَالسُّهُولِ الزِّرَاعِيَّةِ، وَالجُزُرِ الجَمِيلَةِ. وَهَذِهِ الطَّبِيعَةُ الجَمِيلَةُ، إِضَافَةً إِلَى الجَوِّ المُعْتَدِلِ وَالمِيَاهِ الوَفِيرَةِ، جَعَلَتْ إِسْطَنْبُولَ مَصِيفًا رَائِعًا لِمَنْ يَحْضُرُ إِلَيْهَا مِنَ الدَّاخِلِ وَالخَارِجِ." +
  "<br>إِسْطَنْبُولُ مِنْ أَهَمِّ المَوَاقِعِ السِّيَاحِيَّةِ فِي تُرْكِيَا، فِيهَا آلَافُ الفَنَادِقِ وَالمَوَاقِعِ السِّيَاحِيَّةِ، وَفِيهَا عَدَدٌ كَبِيرٌ مِنَ المَعَالِمِ الأَثَرِيَّةِ، مِثْلُ المَسَاجِدِ وَالكَنَائِسِ وَالمَعَابِدِ وَالقُصُورِ وَالأَبْرَاجِ. وَمِنْ أَهَمِّ مَعَالِمِهَا التَّارِيخِيَّةِ: «آيَا صُوفْيَا»، وَمَسْجِدُ «السُّلْطَانِ أَحْمَدَ»، وَ«قَصْرُ طُوبْقَابِي»، وَ«جِسْرُ البُوسْفُورِ»، وَ«بُرْجُ غَلَطَةَ»، وَ«بُرْجُ البِنْتِ»، وَ«قَصْرُ يِلْدِز»." +
  "<br>وَلِأَهَمِّيَّةِ مَدِينَةِ إِسْطَنْبُولَ التَّارِيخِيَّةِ وَالسِّيَاحِيَّةِ وَالاقْتِصَادِيَّةِ، اهْتَمَّتِ الحُكُومَةُ بِهَا اهْتِمَامًا كَبِيرًا، فَأَنْشَأَتْ شَبَكَةً مِنَ الطُّرُقِ وَالجُسُورِ وَالأَنْفَاقِ لِتَسْهِيلِ حَرَكَةِ وَسَائِلِ النَّقْلِ.";
var METIN_TR = "İstanbul, Boğaziçi’nde yer alan güzel bir şehirdir. Dünyada iki kıta üzerinde, Asya ve Avrupa’da bulunan tek şehirdir; bu yüzden dünyanın her yerinden turist çeker." +
  "<br>İstanbul tarihte “Bizantion” ve “Konstantinopolis” adlarıyla bilinir; tarihi milattan önceye uzanır. Nüfus bakımından Türkiye’nin en büyük şehridir; aynı zamanda dünyanın en kalabalık şehirlerindendir." +
  "<br>İstanbul 1453’te Sultan Fatih Mehmed tarafından fethedildi; bu önemli bir tarihî olaydır. Müslümanlar sahabe döneminden beri, Peygamber’in (s.a.v.) “Konstantinopolis mutlaka fethedilecektir; onun komutanı ne güzel komutan, o ordu ne güzel ordudur” sözündeki övgüye ulaşmak için bu şehri fethetmeye çalışıyordu. Bu yüzden başta Ebû Eyyûb el-Ensârî olmak üzere birçok sahabe bu şerefe ermek için geldi; o orada vefat edip defnedildi. Bu şeref Sultan Mehmed’e nasip oldu; bu yüzden “Fâtih” diye anıldı." +
  "<br>İstanbul çeşitli bir doğal çevresiyle meşhurdur; bu doğa yeşil dağları, tarım ovalarını ve güzel adaları bir araya getirir. Bu güzel doğa, ılıman havası ve bol suyuyla birlikte İstanbul’u yurt içinden ve dışından gelenler için harika bir yazlık yapmıştır." +
  "<br>İstanbul, Türkiye’nin en önemli turizm yerlerindendir; binlerce otel ve turistik yer vardır. Camiler, kiliseler, mabetler, saraylar ve kuleler gibi çok sayıda tarihî eser bulunur. En önemli tarihî eserlerinden bazıları: Ayasofya, Sultanahmet Camii, Topkapı Sarayı, Boğaziçi Köprüsü, Galata Kulesi, Kız Kulesi ve Yıldız Sarayı." +
  "<br>İstanbul’un tarihî, turistik ve ekonomik önemi yüzünden devlet şehre büyük önem verdi; ulaşım araçlarının hareketini kolaylaştırmak için bir yollar, köprüler ve tüneller ağı kurdu.";
var SOZLUK = [["مَضِيقٌ", "boğaz"], ["البُوسْفُورُ", "İstanbul Boğazı"], ["الوَحِيدَةُ", "tek, biricik"], ["قَارَّتَانِ", "iki kıta"], ["تَجْذِبُ", "çeker"], ["أَنْحَاءُ العَالَمِ", "dünyanın her yanı"], ["بِاسْمَيْ", "iki adıyla"], ["مِنْ حَيْثُ", "…bakımından"], ["ازْدِحَامًا", "kalabalık bakımından"], ["مِنْ قِبَلِ", "tarafından"], ["لِيَنَالُوا", "ulaşsınlar diye"], ["مَدْحٌ", "övgü"], ["عَلَى رَأْسِهِمْ", "başta …olmak üzere"], ["الشَّرَفُ", "şeref"], ["دُفِنَ", "defnedildi"], ["بِيئَةٌ طَبِيعِيَّةٌ", "doğal çevre"], ["مُتَنَوِّعَةٌ", "çeşitli"], ["السُّهُولُ", "ovalar"], ["الجُزُرُ", "adalar"], ["المُعْتَدِلُ", "ılıman"], ["الوَفِيرَةُ", "bol"], ["مَصِيفٌ", "yazlık"], ["المَعَالِمُ الأَثَرِيَّةُ", "tarihî eserler"], ["الكَنَائِسُ / المَعَابِدُ", "kiliseler / mabetler"], ["القُصُورُ / الأَبْرَاجُ", "saraylar / kuleler"], ["بُرْجُ البِنْتِ", "Kız Kulesi"], ["اهْتَمَّتْ بِـ", "…e önem verdi"], ["أَنْشَأَتْ", "kurdu, inşa etti"], ["شَبَكَةٌ", "ağ"], ["الأَنْفَاقُ", "tüneller"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendi şehrini düşünmek: adı, yeri, neyle meşhur", "İstanbul’u anlatan metni durmadan okumak ve dinlemek", "Şehir ve tarih kelimelerini öğrenmek: مَضِيقٌ، قَارَّةٌ، مَعْلَمٌ، قَصْرٌ، بُرْجٌ", "Metindeki bilgilerin doğru mu yanlış mı olduğunu bulmak"],
  examples: [
    { s: "إِسْطَنْبُولُ:- / تَقَعُ عَلَى قَارَّتَيْنِ:nasb / آسْيَا وَأُورُوبَّا.:nasb.Kıtalar", tr: "İstanbul iki kıta üzerindedir: Asya ve Avrupa." },
    { s: "فُتِحَتْ إِسْطَنْبُولُ:- / سَنَةَ ١٤٥٣:mz / مِنْ قِبَلِ السُّلْطَانِ مُحَمَّدٍ الفَاتِحِ.:cerr.Fâtih", tr: "İstanbul 1453’te Sultan Fatih Mehmed tarafından fethedildi." }
  ],
  rules: [
    { tr: "<b>Coğrafya:</b> İstanbul <span class=\"ar\">مَضِيقُ البُوسْفُورِ</span> (Boğaziçi) üzerindedir ve iki kıtada (<span class=\"ar\">آسْيَا وَأُورُوبَّا</span>) bulunan <b>tek</b> şehirdir (<span class=\"ar\">المَدِينَةُ الوَحِيدَةُ</span>)." },
    { tr: "<b>Tarih:</b> eski adları <span class=\"ar\">بِيزَنْطَةُ</span> ve <span class=\"ar\">القُسْطَنْطِينِيَّةُ</span>. 1453’te <span class=\"ar\">السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ</span> fethetti. Peygamberimizin (s.a.v.) müjdesi: <span class=\"ar\">«لَتُفْتَحَنَّ القُسْطَنْطِينِيَّةُ، فَلَنِعْمَ الأَمِيرُ أَمِيرُهَا، وَلَنِعْمَ الجَيْشُ ذَلِكَ الجَيْشُ»</span> (Ahmed b. Hanbel, el-Müsned). Kitap bu hadisi ayet parantezi ﴿ ﴾ içinde vermiş; burada hadis tırnağıyla « » yazıldı." },
    { tr: "<b>Kitapta</b> <span class=\"ar\">تُشْتَهَرُ</span> (meçhul) yazılmış; doğrusu <span class=\"ar\">تَشْتَهِرُ</span>’dir: “…ile meşhurdur”. Burada metin ve alıştırmalarda doğru biçim kullanıldı." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَا اسْمُ مَدِينَتِكَ؟ أَيْنَ تَقَعُ مَدِينَتُكَ؟ بِمَاذَا تَشْتَهِرُ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "إِسْطَنْبُولُ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَا اسْمُ مَدِينَتِكَ؟", a: "اسْمُ مَدِينَتِي قُونِيَةُ.", tr: "Şehrinin adı ne? (Örnek) Şehrimin adı Konya." },
        { q: "أَيْنَ تَقَعُ مَدِينَتُكَ؟", a: "تَقَعُ مَدِينَتِي فِي وَسَطِ الأَنَاضُولِ.", tr: "Şehrin nerede? (Örnek) Anadolu’nun ortasında." },
        { q: "بِمَاذَا تَشْتَهِرُ؟", a: "تَشْتَهِرُ بِمَوْلَانَا جَلَالِ الدِّينِ الرُّومِيِّ وَبِسُهُولِهَا الزِّرَاعِيَّةِ.", tr: "Neyle meşhur? (Örnek) Mevlânâ ve tarım ovalarıyla." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "تَقَعُ إِسْطَنْبُولُ عَلَى مَضِيقِ البُوسْفُورِ.", a: "d", why: "Metnin ilk cümlesi." },
        { s: "إِسْطَنْبُولُ مَدِينَةٌ تَقَعُ فِي قَارَّةِ آسْيَا فَقَطْ.", a: "y", why: "İki kıtada: آسْيَا وَأُورُوبَّا." },
        { s: "مِنْ أَسْمَاءِ إِسْطَنْبُولَ التَّارِيخِيَّةِ «بِيزَنْطَةُ».", a: "d", why: "بِاسْمَيْ بِيزَنْطَةَ وَالقُسْطَنْطِينِيَّةِ." },
        { s: "يَعُودُ تَارِيخُ إِسْطَنْبُولَ إِلَى مِئَةِ سَنَةٍ فَقَطْ.", a: "y", why: "إِلَى مَا قَبْلَ المِيلَادِ." },
        { s: "فُتِحَتْ إِسْطَنْبُولُ سَنَةَ ١٤٥٣ لِلْمِيلَادِ.", a: "d", why: "مِنْ قِبَلِ السُّلْطَانِ مُحَمَّدٍ الفَاتِحِ." },
        { s: "فَتَحَ أَبُو أَيُّوبَ الأَنْصَارِيُّ إِسْطَنْبُولَ.", a: "y", why: "Fethe çalıştı, orada vefat etti; fethetmek Sultan Mehmed’e nasip oldu." },
        { s: "سُمِّيَ السُّلْطَانُ مُحَمَّدٌ بِـ«الفَاتِحِ».", a: "d", why: "وَلِهَذَا سُمِّيَ بِالفَاتِحِ." },
        { s: "جَوُّ إِسْطَنْبُولَ حَارٌّ جِدًّا.", a: "y", why: "الجَوُّ المُعْتَدِلُ (ılıman)." },
        { s: "فِي إِسْطَنْبُولَ جُزُرٌ جَمِيلَةٌ.", a: "d", why: "وَالجُزُرِ الجَمِيلَةِ." },
        { s: "فِي إِسْطَنْبُولَ فُنْدُقٌ وَاحِدٌ.", a: "y", why: "آلَافُ الفَنَادِقِ (binlerce otel)." },
        { s: "قَصْرُ طُوبْقَابِي مِنْ مَعَالِمِ إِسْطَنْبُولَ التَّارِيخِيَّةِ.", a: "d", why: "Metinde sayılır." },
        { s: "أَنْشَأَتِ الحُكُومَةُ الطُّرُقَ وَالجُسُورَ لِتَسْهِيلِ حَرَكَةِ النَّقْلِ.", a: "d", why: "Metnin son cümlesi." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("تَقَعُ عَلَى مَضِيقِ البُوسْفُورِ", "مَضِيقِ"), "boğaz", "nehir", "köprü", "Boğaziçi’nde yer alır.", "ضَيِّقٌ: dar."],
      [HL("وَهِيَ المَدِينَةُ الوَحِيدَةُ فِي العَالَمِ", "الوَحِيدَةُ"), "tek", "en büyük", "en eski", "Dünyadaki tek şehirdir.", "9. etkinlik: لَا يُوجَدُ مَعَهُ شَيْءٌ آخَرُ."],
      [HL("لِذَلِكَ تَجْذِبُ السَّائِحِينَ", "تَجْذِبُ"), "çeker", "kovar", "korkutur", "Bu yüzden turist çeker.", "= تَشُدُّ"],
      [HL("مِنْ أَكْثَرِ المُدُنِ ازْدِحَامًا", "ازْدِحَامًا"), "kalabalık bakımından", "temizlik bakımından", "sessizlik bakımından", "En kalabalık şehirlerden.", "Temyiz: أَكْثَرُ + mansûb mastar."],
      [HL("مِنْ قِبَلِ السُّلْطَانِ مُحَمَّدٍ الفَاتِحِ", "مِنْ قِبَلِ"), "tarafından", "önce", "yerine", "Sultan Fatih Mehmed tarafından.", "Meçhul fiille: فُتِحَتْ… مِنْ قِبَلِ"],
      [HL("لِيَنَالُوا مَدْحَ النَّبِيِّ ﷺ", "لِيَنَالُوا"), "ulaşmak (elde etmek) için", "unutmak için", "anlatmak için", "Peygamberin övgüsüne ulaşmak için.", "نَالَ = حَصَلَ"],
      [HL("وَعَلَى رَأْسِهِمْ أَبُو أَيُّوبَ الأَنْصَارِيُّ", "وَعَلَى رَأْسِهِمْ"), "başta … olmak üzere", "başlarının üstünde", "arkalarında", "Başta Ebû Eyyûb olmak üzere.", ""],
      [HL("فَمَاتَ وَدُفِنَ فِيهَا", "وَدُفِنَ"), "ve defnedildi", "ve doğdu", "ve yaşadı", "Orada vefat etti ve defnedildi.", ""],
      [HL("وَالسُّهُولِ الزِّرَاعِيَّةِ", "وَالسُّهُولِ"), "ve ovalar", "ve dağlar", "ve denizler", "Tarım ovaları.", "Tekili: سَهْلٌ."],
      [HL("إِضَافَةً إِلَى الجَوِّ المُعْتَدِلِ", "المُعْتَدِلِ"), "ılıman", "soğuk", "yağmurlu", "Ilıman havaya ek olarak.", ""],
      [HL("جَعَلَتْ إِسْطَنْبُولَ مَصِيفًا رَائِعًا", "مَصِيفًا"), "yazlık", "kışlık", "liman", "İstanbul’u harika bir yazlık yaptı.", "≠ مَشْتًى"],
      [HL("فَأَنْشَأَتْ شَبَكَةً مِنَ الطُّرُقِ", "شَبَكَةً"), "ağ", "kapı", "harita", "Bir yollar ağı kurdu.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama: Şehrin Özellikleri", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak", "A sütunundaki cümleyi B sütunundaki devamıyla eşleştirmek", "Tarihî eserleri türlerine göre ayırmak"],
  examples: [
    { s: "تَشْتَهِرُ إِسْطَنْبُولُ:- / بِبِيئَةٍ طَبِيعِيَّةٍ مُتَنَوِّعَةٍ:nasb", tr: "İstanbul çeşitli bir doğal çevreyle meşhurdur.", pair: "مِنْ أَهَمِّ مَعَالِمِهَا:- / بُرْجُ غَلَطَةَ:cerr", pairTr: "En önemli eserlerinden biri Galata Kulesi’dir." }
  ],
  rules: [
    { tr: "<b>Coğrafî özelliği (<span class=\"ar\">المِيزَةُ الجُغْرَافِيَّةُ</span>):</b> iki kıtada bulunan tek şehir. <b>En büyük</b>: alan bakımından değil, <b>nüfus</b> bakımından (<span class=\"ar\">مِنْ حَيْثُ عَدَدُ السُّكَّانِ</span>); 2. etkinliğin 1. maddesi bu yüzden yanlıştır." },
    { tr: "<b>2. etkinlik, 3. madde:</b> “İstanbul’da yalnızca eski mahalleler var” yanlıştır. 10. etkinlik bunu söyler: <span class=\"ar\">تَجْمَعُ إِسْطَنْبُولُ بَيْنَ الأَحْيَاءِ التُّرَاثِيَّةِ وَالحَدِيثَةِ</span> (hem tarihî hem modern mahalleler)." },
    { tr: "<b>3. etkinlik:</b> ilk iki madde birbirine çok yakındır; burada metne en uygun eşleşme kullanıldı: “İstanbul güzel bir şehirdir ← çeşitli yerleri ve güzel doğası yüzünden”, “İstanbul turizm için güzel bir yerdir ← dünyanın her yanından turist çeker”." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: أَيْنَ تَقَعُ مَدِينَةُ إِسْطَنْبُولَ؟ مَا المِيزَةُ الجُغْرَافِيَّةُ لِمَدِينَةِ إِسْطَنْبُولَ؟ مَا الأَسْمَاءُ الأُخْرَى لِمَدِينَةِ إِسْطَنْبُولَ؟ مَا أَهَمُّ المَعَالِمِ التَّارِيخِيَّةِ فِي إِسْطَنْبُولَ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ. ٣ ـ صِلْ بَيْنَ الجُمَلِ فِي العَمُودِ «أ» مَعَ مَا يُنَاسِبُهَا مِنَ الجُمَلِ فِي العَمُودِ «ب»."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["أَيْنَ تَقَعُ مَدِينَةُ إِسْطَنْبُولَ؟", "تَقَعُ عَلَى مَضِيقِ البُوسْفُورِ.", "تَقَعُ فِي وَسَطِ الأَنَاضُولِ.", "تَقَعُ عَلَى البَحْرِ الأَحْمَرِ.", "İstanbul nerededir? Boğaziçi’nde.", ""],
      ["مَا المِيزَةُ الجُغْرَافِيَّةُ لِمَدِينَةِ إِسْطَنْبُولَ؟", "هِيَ المَدِينَةُ الوَحِيدَةُ فِي العَالَمِ الَّتِي تَقَعُ عَلَى قَارَّتَيْنِ.", "هِيَ أَصْغَرُ مَدِينَةٍ فِي تُرْكِيَا.", "لَيْسَ فِيهَا بَحْرٌ.", "Coğrafî özelliği: iki kıtadaki tek şehir.", ""],
      ["مَا الأَسْمَاءُ الأُخْرَى لِمَدِينَةِ إِسْطَنْبُولَ؟", "بِيزَنْطَةُ وَالقُسْطَنْطِينِيَّةُ.", "أَنْقَرَةُ وَإِزْمِيرُ.", "بُورْصَةُ وَقُونِيَةُ.", "Diğer adları: Bizantion, Konstantinopolis.", ""],
      ["مَا أَهَمُّ المَعَالِمِ التَّارِيخِيَّةِ فِي إِسْطَنْبُولَ؟", "آيَا صُوفْيَا وَمَسْجِدُ السُّلْطَانِ أَحْمَدَ وَقَصْرُ طُوبْقَابِي وَبُرْجُ غَلَطَةَ.", "الأَهْرَامَاتُ وَأَبُو الهَوْلِ.", "بُرْجُ إِيفِلَ.", "En önemli tarihî eserleri.", ""]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["إِسْطَنْبُولُ أَكْبَرُ المُدُنِ فِي تُرْكِيَا مِنْ حَيْثُ المِسَاحَةُ.", "y", "مِنْ حَيْثُ عَدَدُ السُّكَّانِ (nüfus)."],
      ["بَشَّرَ النَّبِيُّ مُحَمَّدٌ ﷺ بِفَتْحِ إِسْطَنْبُولَ.", "d", "«لَتُفْتَحَنَّ القُسْطَنْطِينِيَّةُ…»"],
      ["إِسْطَنْبُولُ تَحْتَوِي عَلَى أَحْيَاءٍ قَدِيمَةٍ فَقَطْ.", "y", "Hem tarihî hem modern mahalleler (10. etkinlik)."],
      ["مِنْ أَهَمِّ المَعَالِمِ فِي إِسْطَنْبُولَ بُرْجُ غَلَطَةَ.", "d", "Metinde sayılır."]
    ]) },
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ الجُمَلِ فِي العَمُودِ «أ» مَعَ مَا يُنَاسِبُهَا مِنَ الجُمَلِ فِي العَمُودِ «ب»", tr: "Önce aşağıdan B sütunundaki parçayı seç, sonra A sütunundaki cümlenin kutusuna dokun.", bank: ["بِسَبَبِ أَمَاكِنِهَا المُتَنَوِّعَةِ وَطَبِيعَتِهَا الجَمِيلَةِ", "مُدُنِ العَالَمِ ازْدِحَامًا", "تَجْذِبُ السَّائِحِينَ مِنْ كُلِّ أَنْحَاءِ العَالَمِ", "لِتَسْهِيلِ حَرَكَةِ وَسَائِلِ النَّقْلِ", "بِبِيئَةٍ طَبِيعِيَّةٍ مُتَنَوِّعَةٍ"], items: [
      { pre: "إِسْطَنْبُولُ مَدِينَةٌ جَمِيلَةٌ", a: [0], tr: "İstanbul güzel bir şehirdir; çeşitli yerleri ve güzel doğası yüzünden." },
      { pre: "إِسْطَنْبُولُ مَكَانٌ جَمِيلٌ لِلسِّيَاحَةِ", a: [2], tr: "İstanbul turizm için güzel bir yerdir; dünyanın her yanından turist çeker." },
      { pre: "تَشْتَهِرُ إِسْطَنْبُولُ", a: [4], tr: "İstanbul çeşitli bir doğal çevreyle meşhurdur." },
      { pre: "إِسْطَنْبُولُ مِنْ أَكْثَرِ", a: [1], tr: "İstanbul dünyanın en kalabalık şehirlerindendir." },
      { pre: "أَنْشَأَتِ الحُكُومَةُ التُّرْكِيَّةُ الكَثِيرَ مِنْ مَشْرُوعَاتِ المُوَاصَلَاتِ", a: [3], tr: "Türk hükûmeti ulaşım araçlarının hareketini kolaylaştırmak için birçok ulaşım projesi yaptı." }
    ]},
    { type: "classify", extra: true, opts: MEKAN, ar: "مَا نَوْعُ هَذَا المَعْلَمِ؟", tr: "Bu İstanbul eseri cami/kilise mi, saray mı, kule/köprü mü?", items: CL([
      ["آيَا صُوفْيَا 🕌", "c", "Önce kilise, sonra cami."], ["مَسْجِدُ السُّلْطَانِ أَحْمَدَ", "c", "Mavi Cami."], ["جَامِعُ السُّلَيْمَانِيَّةِ", "c", "Mimar Sinan’ın eseri."],
      ["قَصْرُ طُوبْقَابِي 🏰", "q", "Osmanlı sarayı."], ["قَصْرُ يِلْدِز", "q", "Saray."], ["قَصْرُ دُولْمَه بَاغْچَه", "q", "Boğaz kıyısında saray."],
      ["بُرْجُ غَلَطَةَ 🗼", "b", "Kule."], ["بُرْجُ البِنْتِ", "b", "Kız Kulesi."], ["جِسْرُ البُوسْفُورِ 🌉", "b", "Köprü."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · BOŞLUK VE CÜMLE TAMAMLAMA
{
  id: "u3", no: 3, ar: "مَلْءُ الفَرَاغَاتِ وَتَتِمَّةُ الجُمَلِ", tr: "Boşluk Doldurma ve Cümle Tamamlama", short: "Boşluk", col: "mi", legend: ["mz", "mi"],
  goals: ["İstanbul paragrafında boşlukları doldurmak", "Cümleyi uygun devamıyla tamamlamak", "İsm-i tafdîli (أَفْعَلُ) tanımak: أَكْبَرُ، أَكْثَرُ، أَهَمُّ"],
  examples: [
    { s: "إِسْطَنْبُولُ:- / أَكْبَرُ المُدُنِ:mi.En büyük / فِي تُرْكِيَا.:-", tr: "İstanbul Türkiye’nin en büyük şehridir.", pair: "مِنْ أَهَمِّ:mi.En önemlilerden / المَوَاقِعِ السِّيَاحِيَّةِ:-", pairTr: "En önemli turizm yerlerinden." }
  ],
  rules: [
    { tr: "<b>4. etkinlik:</b> kitap boşluklar için kelime vermiyor; burada metinden alınan kelimeler bankaya kondu: <span class=\"ar\">اسْمَيْ، مَرْكَزُ، قَارَّتَيْنِ، السِّيَاحِيَّةِ، مَعَالِمِهَا، تَشْتَهِرُ</span>. <span class=\"ar\">مَرْكَزُ</span> metinde geçmez; ama “…kültür, ekonomi ve finans merkezi” anlamı bunu ister." },
    { tr: "<b>Kitapta</b> “<span class=\"ar\">وَتُعْتَبَرُ إِحْدَى أَهَمِّ المَوَاقِعِ</span>” yazılmış; <span class=\"ar\">مَوَاقِعُ</span> eril olduğu için doğrusu <span class=\"ar\">أَحَدَ أَهَمِّ المَوَاقِعِ</span>’dir. Özne İstanbul (dişil) olduğu için <span class=\"ar\">إِحْدَى</span> de savunulabilir; burada metindeki <span class=\"ar\">مِنْ أَهَمِّ</span> kullanıldı." },
    { tr: "<b>İsm-i tafdîl:</b> <span class=\"ar\">كَبِيرٌ ← أَكْبَرُ · مُهِمٌّ ← أَهَمُّ · كَثِيرٌ ← أَكْثَرُ</span>. Kalıplar: <span class=\"ar\">أَكْبَرُ مِنْ</span> “…den daha büyük” · <span class=\"ar\">أَكْبَرُ المُدُنِ</span> “en büyük şehir” · <span class=\"ar\">مِنْ أَكْبَرِ المُدُنِ</span> “en büyük şehirlerden”. Sıfat doğrudan yapılamıyorsa <span class=\"ar\">أَكْثَرُ + mastar</span>: <span class=\"ar\">أَكْثَرُ ازْدِحَامًا</span>." }
  ],
  kaide: ["٤ ـ امْلَإِ الفَرَاغَاتِ فِي الجُمَلِ الآتِيَةِ بِالكَلِمَةِ المُنَاسِبَةِ.", "٥ ـ صِلْ بَيْنَ الجُمْلَةِ وَتَتِمَّتِهَا المُنَاسِبَةِ فِيمَا يَأْتِي."],
  ex: [
    { type: "bank", num: "٤", ar: "امْلَإِ الفَرَاغَاتِ فِي الجُمَلِ الآتِيَةِ بِالكَلِمَةِ المُنَاسِبَةِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Her kelime bir kez kullanılır.", bank: ["اسْمَيْ", "مَرْكَزُ", "قَارَّتَيْنِ", "السِّيَاحِيَّةِ", "مَعَالِمِهَا", "تَشْتَهِرُ"],
      tr2: "İstanbul tarihte Bizantion ve Konstantinopolis adlarıyla bilinir; Türkiye’nin kültür, ekonomi ve finans merkezidir; dünyada iki kıta, Asya ile Avrupa arasında bulunan tek şehirdir. Türkiye’nin en önemli turizm yerlerindendir; en önemli tarihî eserlerinden biri Ayasofya’dır. İstanbul ayrıca çeşitli bir doğal çevreyle meşhurdur.",
      parts: ["مَدِينَةُ إِسْطَنْبُولَ تُعْرَفُ تَارِيخِيًّا بِـ", { a: [0] }, "بِيزَنْطَةَ وَالقُسْطَنْطِينِيَّةِ، وَهِيَ", { a: [1] }, "تُرْكِيَا الثَّقَافِيُّ وَالاقْتِصَادِيُّ وَالمَالِيُّ، وَهِيَ المَدِينَةُ الوَحِيدَةُ فِي العَالَمِ الَّتِي تَقَعُ بَيْنَ", { a: [2] }, ": آسْيَا وَأُورُوبَّا.<br>وَهِيَ مِنْ أَهَمِّ المَوَاقِعِ", { a: [3] }, "فِي تُرْكِيَا، وَمِنْ أَهَمِّ", { a: [4] }, "التَّارِيخِيَّةِ «آيَا صُوفْيَا»، كَمَا", { a: [5] }, "إِسْطَنْبُولُ بِبِيئَةٍ طَبِيعِيَّةٍ مُتَنَوِّعَةٍ."] },
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الجُمْلَةِ وَتَتِمَّتِهَا المُنَاسِبَةِ فِيمَا يَأْتِي", tr: "Önce aşağıdan cümlenin devamını seç, sonra cümlenin kutusuna dokun.", bank: ["التَّسْهِيلَاتِ لِلطُّلَّابِ الأَجَانِبِ.", "بِالصُّوَرِ مَعَ أَصْدِقَائِي، فَهِيَ ذِكْرَى جَمِيلَةٌ.", "تَجْذِبُ السُّيَّاحَ إِلَيْهَا.", "عَلَى شَبَكَةِ التَّوَاصُلِ الاجْتِمَاعِيِّ (الإِنْتَرْنِت)."], items: [
      { pre: "مَدِينَةُ بُورْصَةَ", a: [2], tr: "Bursa şehri turistleri kendine çeker." },
      { pre: "أَنْشَأْتُ حِسَابَ فِيسْبُوك", a: [3], tr: "Sosyal ağda (internette) bir Facebook hesabı açtım." },
      { pre: "جَامِعَتُنَا تُقَدِّمُ", a: [0], tr: "Üniversitemiz yabancı öğrencilere kolaylıklar sağlar." },
      { pre: "أُحِبُّ أَنْ أَحْتَفِظَ", a: [1], tr: "Arkadaşlarımla fotoğrafları saklamayı severim; onlar güzel bir hatıradır." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "اسْمُ التَّفْضِيلِ", tr: "Boşluğa uygun ism-i tafdîl biçimini seç.", items: PL([
      ["إِسْطَنْبُولُ ___ المُدُنِ فِي تُرْكِيَا مِنْ حَيْثُ عَدَدُ السُّكَّانِ.", "أَكْبَرُ", "كَبِيرَةُ", "الأَكْبَرُ", "Nüfusça Türkiye’nin en büyük şehri.", "أَفْعَلُ + çoğul isim: “en …”"],
      ["هِيَ مِنْ ___ المُدُنِ ازْدِحَامًا فِي العَالَمِ.", "أَكْثَرِ", "أَكْثَرُ", "كَثِيرِ", "Dünyanın en kalabalık şehirlerinden.", "مِنْ’den sonra mecrûr: أَكْثَرِ"],
      ["إِسْطَنْبُولُ مِنْ ___ المَوَاقِعِ السِّيَاحِيَّةِ.", "أَهَمِّ", "مُهِمِّ", "أَهَمُّ", "En önemli turizm yerlerinden.", "مُهِمٌّ ← أَهَمُّ"],
      ["إِسْطَنْبُولُ ___ مِنْ أَنْقَرَةَ سُكَّانًا.", "أَكْثَرُ", "أَكْثَرِ", "كَثِيرَةٌ", "İstanbul’un nüfusu Ankara’dan fazladır.", "Kıyas: أَفْعَلُ + مِنْ"],
      ["جَوُّ إِسْطَنْبُولَ ___ مِنْ جَوِّ أَرْضُرُومَ.", "أَدْفَأُ", "دَافِئٌ", "الدَّافِئُ", "İstanbul’un havası Erzurum’unkinden daha ılıktır.", "دَافِئٌ ← أَدْفَأُ"],
      ["آيَا صُوفْيَا مِنْ ___ المَعَالِمِ فِي العَالَمِ.", "أَشْهَرِ", "مَشْهُورِ", "شُهْرَةِ", "Ayasofya dünyanın en meşhur eserlerindendir.", "مَشْهُورٌ ← أَشْهَرُ"]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · EŞ, ZIT, ÇOĞUL
{
  id: "u4", no: 4, ar: "المُرَادِفُ وَالضِّدُّ وَالجَمْعُ", tr: "Eş, Zıt ve Çoğul", short: "Eş · zıt · çoğul", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek", "Kelimelerin çoğulunu yazmak"],
  examples: [
    { s: "تَجْذِبُ:mz.Kelime / = تَشُدُّ:nasb.Eş", tr: "çeker", pair: "مَصِيفٌ:mz.Kelime / ≠ مَشْتًى:cerr.Zıt", pairTr: "yazlık ≠ kışlık" }
  ],
  rules: [
    { tr: "<b>Eş anlam (6. etkinlik):</b> <span class=\"ar\">أَنْحَاءٌ = أَطْرَافٌ · الوَفِيرَةُ = الكَثِيرَةُ · أَنْشَأَ = بَنَى · طَرِيقٌ = سَبِيلٌ · تَسْهِيلٌ = تَيْسِيرٌ · نَالَ = حَصَلَ · تَجْذِبُ = تَشُدُّ · المُتَنَوِّعَةُ = المُتَعَدِّدَةُ · المُعْتَدِلُ = الدَّافِئُ</span>. Not: <span class=\"ar\">المُعْتَدِلُ</span> “ılıman”, <span class=\"ar\">الدَّافِئُ</span> “ılık, sıcak” demektir; kitap yakın anlamlı sayar." },
    { tr: "<b>Zıt anlam (7. etkinlik):</b> <span class=\"ar\">أَكْبَرُ ≠ أَصْغَرُ · مَصِيفٌ ≠ مَشْتًى · قَدِيمٌ ≠ حَدِيثٌ · اهْتَمَّ ≠ أَهْمَلَ · أَنْشَأَ ≠ هَدَمَ · مَدَحَ ≠ ذَمَّ</span>." },
    { tr: "<b>Çoğullar (8. etkinlik):</b> <span class=\"ar\">حَيٌّ ← أَحْيَاءٌ · بُرْجٌ ← أَبْرَاجٌ · قَارَّةٌ ← قَارَّاتٌ · قَصْرٌ ← قُصُورٌ · غَرَضٌ ← أَغْرَاضٌ · نَفَقٌ ← أَنْفَاقٌ</span>. Çoğunluğu <span class=\"ar\">أَفْعَالٌ</span> kalıbındadır." }
  ],
  kaide: ["٦ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي. ٧ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي.", "٨ ـ اكْتُبْ جَمْعَ الكَلِمَاتِ الآتِيَةِ."],
  ex: [
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["الكَثِيرَةُ", "أَطْرَافٌ", "سَبِيلٌ", "بَنَى", "حَصَلَ", "تَيْسِيرٌ", "الدَّافِئُ", "المُتَعَدِّدَةُ", "تَشُدُّ"], items: [
      { pre: "أَنْحَاءٌ =", a: [1], tr: "taraflar, yanlar" }, { pre: "الوَفِيرَةُ =", a: [0], tr: "bol = çok" }, { pre: "أَنْشَأَ =", a: [3], tr: "kurdu = inşa etti" }, { pre: "طَرِيقٌ =", a: [2], tr: "yol" }, { pre: "تَسْهِيلٌ =", a: [5], tr: "kolaylaştırma" }, { pre: "نَالَ =", a: [4], tr: "elde etti" }, { pre: "تَجْذِبُ =", a: [8], tr: "çeker" }, { pre: "المُتَنَوِّعَةُ =", a: [7], tr: "çeşitli" }, { pre: "المُعْتَدِلُ =", a: [6], tr: "ılıman ≈ ılık" }
    ]},
    { type: "bank", num: "٧", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["مَشْتًى", "أَصْغَرُ", "هَدَمَ", "ذَمَّ", "أَهْمَلَ", "حَدِيثٌ"], items: [
      { pre: "أَكْبَرُ ≠", a: [1], tr: "daha büyük ≠ daha küçük" }, { pre: "مَصِيفٌ ≠", a: [0], tr: "yazlık ≠ kışlık" }, { pre: "قَدِيمٌ ≠", a: [5], tr: "eski ≠ yeni" }, { pre: "اهْتَمَّ ≠", a: [4], tr: "önem verdi ≠ ihmal etti" }, { pre: "أَنْشَأَ ≠", a: [2], tr: "inşa etti ≠ yıktı" }, { pre: "مَدَحَ ≠", a: [3], tr: "övdü ≠ yerdi" }
    ]},
    { type: "bank", num: "٨", ar: "اكْتُبْ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Önce aşağıdan çoğulu seç, sonra kelimenin kutusuna dokun.", bank: ["أَحْيَاءٌ", "أَبْرَاجٌ", "قَارَّاتٌ", "قُصُورٌ", "أَغْرَاضٌ", "أَنْفَاقٌ"], items: [
      { pre: "حَيٌّ ←", a: [0], tr: "mahalle" }, { pre: "بُرْجٌ ←", a: [1], tr: "kule" }, { pre: "قَارَّةٌ ←", a: [2], tr: "kıta" }, { pre: "قَصْرٌ ←", a: [3], tr: "saray" }, { pre: "غَرَضٌ ←", a: [4], tr: "amaç; eşya" }, { pre: "نَفَقٌ ←", a: [5], tr: "tünel" }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · ANLAM VE CÜMLE
{
  id: "u5", no: 5, ar: "المَعَانِي وَتَرْتِيبُ الجُمَلِ", tr: "Kelime Anlamı ve Cümle Dizme", short: "Anlam · cümle", col: "muz", legend: ["mi", "ref"],
  goals: ["Kelimeyi Arapça tanımıyla eşleştirmek", "Karışık kelimelerden anlamlı cümle kurmak", "Metnin kalıplarını kullanmak: مِنْ حَيْثُ، مِنْ قِبَلِ، تَجْمَعُ بَيْنَ… وَ…، اهْتَمَّ بِـ… اهْتِمَامًا"],
  examples: [
    { s: "تَجْمَعُ:ref / إِسْطَنْبُولُ:- / بَيْنَ الأَحْيَاءِ التُّرَاثِيَّةِ وَالحَدِيثَةِ.:mi.بَيْنَ… وَ…", tr: "İstanbul tarihî ve modern mahalleleri bir araya getirir." },
    { s: "اهْتَمَّتِ الحُكُومَةُ بِهَا:ref / اهْتِمَامًا كَبِيرًا.:mi.Mef’ûl-i mutlak", tr: "Hükûmet ona büyük önem verdi." }
  ],
  rules: [
    { tr: "<b>Kelime anlamları (9. etkinlik):</b> <span class=\"ar\">مَوْقِعٌ</span> = coğrafî yer · <span class=\"ar\">وَحِيدٌ</span> = yanında başka şey ya da kimse olmayan · <span class=\"ar\">قَصْرٌ</span> = önemli ve zengin birinin büyük evi · <span class=\"ar\">أَغْرَاضٌ</span> = hedefler ve amaçlar · <span class=\"ar\">احْتَفَظَ</span> = bir şeyi alıp önem verdi, satmadı ya da bırakmadı · <span class=\"ar\">وَفِيرٌ</span> = çok (<span class=\"ar\">مَاءٌ وَفِيرٌ، مَالٌ وَفِيرٌ</span>)." },
    { tr: "<b>Kalıplar:</b> <span class=\"ar\">مِنْ حَيْثُ</span> “…bakımından” · <span class=\"ar\">مِنْ قِبَلِ</span> “…tarafından” (meçhul fiille) · <span class=\"ar\">تَجْمَعُ بَيْنَ… وَ…</span> “…ile …yi bir araya getirir” · <span class=\"ar\">اهْتَمَّ بِـ… اهْتِمَامًا كَبِيرًا</span> “…e büyük önem verdi” (mef’ûl-i mutlak) · <span class=\"ar\">وَعَلَى رَأْسِهِمْ</span> “başta …olmak üzere”." },
    { tr: "<b>Cümle dizme (10. etkinlik):</b> <span class=\"ar\">تَشْتَهِرُ إِسْطَنْبُولُ بِالكَثِيرِ مِنَ الأَمَاكِنِ التَّارِيخِيَّةِ · إِسْطَنْبُولُ المَدِينَةُ الوَحِيدَةُ فِي العَالَمِ الَّتِي تَقَعُ عَلَى قَارَّتَيْنِ · تَجْمَعُ إِسْطَنْبُولُ بَيْنَ الأَحْيَاءِ التُّرَاثِيَّةِ وَالحَدِيثَةِ · تَقَعُ إِسْطَنْبُولُ بَيْنَ قَارَّتَيْ آسْيَا وَأُورُوبَّا</span>. Son maddede ikili izafette nûn düşer: <span class=\"ar\">قَارَّتَيْ</span>." }
  ],
  kaide: ["٩ ـ صِلْ بَيْنَ الكَلِمَةِ وَمَا تَعْنِيهِ فِيمَا يَأْتِي.", "١٠ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً."],
  ex: [
    { type: "bank", num: "٩", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمَا تَعْنِيهِ فِيمَا يَأْتِي", tr: "Önce aşağıdan tanımı seç, sonra kelimenin kutusuna dokun.", bank: ["بَيْتٌ كَبِيرٌ لِشَخْصٍ مُهِمٍّ وَغَنِيٍّ.", "أَخَذَ شَيْئًا وَاهْتَمَّ بِهِ، وَمَا بَاعَهُ أَوْ تَرَكَهُ.", "مَكَانٌ جُغْرَافِيٌّ.", "لَا يُوجَدُ مَعَهُ شَيْءٌ أَوْ شَخْصٌ آخَرُ.", "مَاءٌ كَثِيرٌ، مَالٌ كَثِيرٌ.", "أَهْدَافٌ وَغَايَاتٌ."], items: [
      { pre: "مَوْقِعٌ :", a: [2], tr: "yer, konum" }, { pre: "وَحِيدٌ :", a: [3], tr: "tek, yalnız" }, { pre: "قَصْرٌ :", a: [0], tr: "saray" }, { pre: "أَغْرَاضٌ :", a: [5], tr: "amaçlar" }, { pre: "احْتَفَظَ :", a: [1], tr: "sakladı, korudu" }, { pre: "وَفِيرٌ :", a: [4], tr: "bol" }
    ]},
    { type: "pick", num: "١٠", ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Karışık kelimelerden kurulan doğru cümleyi seç.", items: PL([
      ["التَّارِيخِيَّةِ، إِسْطَنْبُولُ، مِنْ، بِالكَثِيرِ، الأَمَاكِنِ، تَشْتَهِرُ", "تَشْتَهِرُ إِسْطَنْبُولُ بِالكَثِيرِ مِنَ الأَمَاكِنِ التَّارِيخِيَّةِ.", "تَشْتَهِرُ الأَمَاكِنُ بِالكَثِيرِ مِنْ إِسْطَنْبُولَ التَّارِيخِيَّةِ.", "إِسْطَنْبُولُ التَّارِيخِيَّةُ مِنَ الأَمَاكِنِ تَشْتَهِرُ بِالكَثِيرِ.", "İstanbul birçok tarihî yeriyle meşhurdur.", "تَشْتَهِرُ بِـ"],
      ["المَدِينَةُ، إِسْطَنْبُولُ، فِي، الوَحِيدَةُ، العَالَمِ، تَقَعُ، عَلَى، الَّتِي، قَارَّتَيْنِ", "إِسْطَنْبُولُ المَدِينَةُ الوَحِيدَةُ فِي العَالَمِ الَّتِي تَقَعُ عَلَى قَارَّتَيْنِ.", "إِسْطَنْبُولُ تَقَعُ عَلَى العَالَمِ الوَحِيدَةُ فِي قَارَّتَيْنِ الَّتِي المَدِينَةُ.", "الَّتِي إِسْطَنْبُولُ قَارَّتَيْنِ عَلَى المَدِينَةُ الوَحِيدَةُ تَقَعُ.", "İstanbul dünyada iki kıta üzerinde bulunan tek şehirdir.", "İsm-i mevsûl الَّتِي + sıla cümlesi."],
      ["الأَحْيَاءِ، وَالحَدِيثَةِ، تَجْمَعُ، التُّرَاثِيَّةِ، إِسْطَنْبُولُ، بَيْنَ", "تَجْمَعُ إِسْطَنْبُولُ بَيْنَ الأَحْيَاءِ التُّرَاثِيَّةِ وَالحَدِيثَةِ.", "تَجْمَعُ الأَحْيَاءُ بَيْنَ إِسْطَنْبُولَ التُّرَاثِيَّةِ وَالحَدِيثَةِ.", "بَيْنَ إِسْطَنْبُولُ تَجْمَعُ التُّرَاثِيَّةِ الأَحْيَاءِ وَالحَدِيثَةِ.", "İstanbul tarihî ve modern mahalleleri bir araya getirir.", "تَجْمَعُ بَيْنَ… وَ…"],
      ["بَيْنَ، أُورُوبَّا، إِسْطَنْبُولُ، آسْيَا، وَ، تَقَعُ، قَارَّتَيْ", "تَقَعُ إِسْطَنْبُولُ بَيْنَ قَارَّتَيْ آسْيَا وَأُورُوبَّا.", "تَقَعُ آسْيَا بَيْنَ إِسْطَنْبُولَ وَقَارَّتَيْ أُورُوبَّا.", "تَقَعُ إِسْطَنْبُولُ قَارَّتَيْ بَيْنَ أُورُوبَّا وَآسْيَا.", "İstanbul Asya ve Avrupa kıtaları arasında yer alır.", "قَارَّتَانِ + izafet → قَارَّتَيْ"]
    ])},
    { type: "pick", fill: true, extra: true, ar: "التَّرَاكِيبُ", tr: "Boşluğa metindeki kalıba uyan ifadeyi seç.", items: PL([
      ["إِسْطَنْبُولُ أَكْبَرُ المُدُنِ ___ عَدَدُ السُّكَّانِ.", "مِنْ حَيْثُ", "مِنْ قِبَلِ", "عَلَى رَأْسِ", "Nüfus bakımından en büyük şehir.", "مِنْ حَيْثُ: …bakımından"],
      ["فُتِحَتِ المَدِينَةُ ___ السُّلْطَانِ مُحَمَّدٍ.", "مِنْ قِبَلِ", "مِنْ حَيْثُ", "بَيْنَ", "Şehir Sultan Mehmed tarafından fethedildi.", "Meçhul fiil + مِنْ قِبَلِ"],
      ["تَجْمَعُ الطَّبِيعَةُ ___ الجِبَالِ وَالسُّهُولِ.", "بَيْنَ", "مِنْ", "عَلَى", "Doğa dağları ve ovaları bir araya getirir.", "تَجْمَعُ بَيْنَ… وَ…"],
      ["اهْتَمَّتِ الحُكُومَةُ بِالمَدِينَةِ ___ كَبِيرًا.", "اهْتِمَامًا", "اهْتِمَامٌ", "مُهِمًّا", "Hükûmet şehre büyük önem verdi.", "Mef’ûl-i mutlak: fiilin mastarı mansûb."],
      ["جَاءَ كَثِيرٌ مِنَ الصَّحَابَةِ، وَ___ أَبُو أَيُّوبَ.", "عَلَى رَأْسِهِمْ", "مِنْ حَيْثُ", "مِنْ قِبَلِهِمْ", "Başta Ebû Eyyûb olmak üzere birçok sahabe geldi.", ""],
      ["أَنْشَأَتِ الحُكُومَةُ الأَنْفَاقَ ___ حَرَكَةِ النَّقْلِ.", "لِتَسْهِيلِ", "لِتَسْهِيلُ", "تَسْهِيلًا", "Ulaşımı kolaylaştırmak için tüneller yaptı.", "لِـ + mastar (mecrûr)"]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["تَقَعُ إِسْطَنْبُولُ عَلَى {مَضِيقِ} البُوسْفُورِ.", ["مَضِيقِ", "نَهْرِ", "جَبَلِ"], "metin", "Boğaziçi’nde.", "u1"],
  ["هِيَ المَدِينَةُ {الوَحِيدَةُ} الَّتِي تَقَعُ عَلَى قَارَّتَيْنِ.", ["الوَحِيدَةُ", "الصَّغِيرَةُ", "القَدِيمَةُ"], "metin", "Tek şehir.", "u1"],
  ["تَجْذِبُ {السَّائِحِينَ} مِنْ كُلِّ أَنْحَاءِ العَالَمِ.", ["السَّائِحِينَ", "الجُنُودَ", "الفَلَّاحِينَ"], "metin", "Turist çeker.", "u1"],
  ["تُعْرَفُ تَارِيخِيًّا بِاسْمَيْ بِيزَنْطَةَ وَ{القُسْطَنْطِينِيَّةِ}.", ["القُسْطَنْطِينِيَّةِ", "أَنْقَرَةَ", "بُورْصَةَ"], "metin", "Konstantinopolis.", "u1"],
  ["فُتِحَتْ إِسْطَنْبُولُ سَنَةَ {١٤٥٣} لِلْمِيلَادِ.", ["١٤٥٣", "١٩٢٣", "١٠٧١"], "metin", "1453’te.", "u1"],
  ["عَلَى رَأْسِهِمْ أَبُو أَيُّوبَ {الأَنْصَارِيُّ}.", ["الأَنْصَارِيُّ", "الفَاتِحُ", "الصِّدِّيقُ"], "metin", "Ebû Eyyûb el-Ensârî.", "u1"],
  ["أَكْبَرُ المُدُنِ مِنْ حَيْثُ عَدَدُ {السُّكَّانِ}.", ["السُّكَّانِ", "الجِبَالِ", "البِحَارِ"], "anlama", "Nüfus bakımından.", "u2"],
  ["تَشْتَهِرُ بِبِيئَةٍ طَبِيعِيَّةٍ {مُتَنَوِّعَةٍ}.", ["مُتَنَوِّعَةٍ", "فَقِيرَةٍ", "صَغِيرَةٍ"], "anlama", "Çeşitli doğal çevre.", "u2"],
  ["مِنْ أَهَمِّ مَعَالِمِهَا {بُرْجُ} غَلَطَةَ.", ["بُرْجُ", "قَصْرُ", "جِسْرُ"], "anlama", "Galata Kulesi.", "u2"],
  ["أَنْشَأَتْ شَبَكَةً مِنَ الطُّرُقِ وَالجُسُورِ وَ{الأَنْفَاقِ}.", ["الأَنْفَاقِ", "الأَسْوَاقِ", "الأَحْيَاءِ"], "anlama", "Tüneller.", "u2"],
  ["هِيَ {مَرْكَزُ} تُرْكِيَا الثَّقَافِيُّ وَالاقْتِصَادِيُّ.", ["مَرْكَزُ", "قَارَّةُ", "قَصْرُ"], "boşluk", "Türkiye’nin kültür ve ekonomi merkezi.", "u3"],
  ["مَدِينَةُ بُورْصَةَ تَجْذِبُ {السُّيَّاحَ} إِلَيْهَا.", ["السُّيَّاحَ", "الصُّوَرَ", "الطُّلَّابَ"], "boşluk", "Turist çeker.", "u3"],
  ["هِيَ مِنْ {أَكْثَرِ} المُدُنِ ازْدِحَامًا.", ["أَكْثَرِ", "أَكْثَرُ", "كَثِيرِ"], "tafdîl", "En kalabalıklardan.", "u3"],
  ["أَنْحَاءٌ = {أَطْرَافٌ}.", ["أَطْرَافٌ", "أَحْيَاءٌ", "أَبْرَاجٌ"], "eş anlam", "taraflar", "u4"],
  ["نَالَ = {حَصَلَ}.", ["حَصَلَ", "نَامَ", "هَدَمَ"], "eş anlam", "elde etti", "u4"],
  ["تَجْذِبُ = {تَشُدُّ}.", ["تَشُدُّ", "تَطْرُدُ", "تَبْنِي"], "eş anlam", "çeker", "u4"],
  ["مَدَحَ ≠ {ذَمَّ}.", ["ذَمَّ", "حَمِدَ", "شَكَرَ"], "zıt", "övdü ≠ yerdi", "u4"],
  ["اهْتَمَّ ≠ {أَهْمَلَ}.", ["أَهْمَلَ", "أَنْشَأَ", "حَفِظَ"], "zıt", "önem verdi ≠ ihmal etti", "u4"],
  ["قَصْرٌ ← {قُصُورٌ}.", ["قُصُورٌ", "أَقْصَارٌ", "قَصْرَاتٌ"], "çoğul", "saray → saraylar", "u4"],
  ["حَيٌّ ← {أَحْيَاءٌ}.", ["أَحْيَاءٌ", "حَيَوَاتٌ", "أَحْوَاءٌ"], "çoğul", "mahalle → mahalleler", "u4"],
  ["بَيْتٌ كَبِيرٌ لِشَخْصٍ مُهِمٍّ وَغَنِيٍّ: {قَصْرٌ}.", ["قَصْرٌ", "مَوْقِعٌ", "بُرْجٌ"], "anlam", "Saray.", "u5"],
  ["أَكْبَرُ المُدُنِ {مِنْ حَيْثُ} عَدَدُ السُّكَّانِ.", ["مِنْ حَيْثُ", "مِنْ قِبَلِ", "عَلَى رَأْسِ"], "kalıp", "…bakımından", "u5"],
  ["فُتِحَتْ {مِنْ قِبَلِ} السُّلْطَانِ مُحَمَّدٍ.", ["مِنْ قِبَلِ", "مِنْ حَيْثُ", "بَيْنَ"], "kalıp", "…tarafından", "u5"],
  ["تَجْمَعُ {بَيْنَ} الأَحْيَاءِ التُّرَاثِيَّةِ وَالحَدِيثَةِ.", ["بَيْنَ", "مِنْ", "إِلَى"], "kalıp", "…ile …yi bir araya getirir", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["إِسْطَنْبُولُ أَكْبَرُ المُدُنِ مِسَاحَةً ← metne göre düzelt", "إِسْطَنْبُولُ أَكْبَرُ المُدُنِ مِنْ حَيْثُ عَدَدُ السُّكَّانِ", "إِسْطَنْبُولُ أَصْغَرُ المُدُنِ", "إِسْطَنْبُولُ أَكْبَرُ القَارَّاتِ", "Nüfus bakımından.", "u2"],
  ["فَتَحَ أَبُو أَيُّوبَ إِسْطَنْبُولَ ← düzelt", "فَتَحَ السُّلْطَانُ مُحَمَّدٌ إِسْطَنْبُولَ", "فَتَحَ الصَّحَابَةُ إِسْطَنْبُولَ سَنَةَ ١٤٥٣", "لَمْ تُفْتَحْ إِسْطَنْبُولُ", "Fâtih Sultan Mehmed.", "u1"],
  ["جَوُّ إِسْطَنْبُولَ حَارٌّ جِدًّا ← düzelt", "جَوُّ إِسْطَنْبُولَ مُعْتَدِلٌ", "جَوُّ إِسْطَنْبُولَ بَارِدٌ جِدًّا", "لَيْسَ فِي إِسْطَنْبُولَ جَوٌّ", "Ilıman.", "u1"],
  ["كَبِيرٌ ← tafdîl", "أَكْبَرُ", "كُبْرَى", "كَبُرَ", "büyük → daha büyük / en büyük", "u3"],
  ["مُهِمٌّ ← tafdîl", "أَهَمُّ", "مُهِمَّةٌ", "اهْتَمَّ", "önemli → en önemli", "u3"],
  ["مُزْدَحِمَةٌ ← tafdîl", "أَكْثَرُ ازْدِحَامًا", "أَزْحَمُ ازْدِحَامًا", "مُزْدَحِمَةٌ جِدًّا", "أَكْثَرُ + mastar", "u3"],
  ["الوَفِيرَةُ ← eş anlam", "الكَثِيرَةُ", "القَلِيلَةُ", "الجَمِيلَةُ", "bol = çok", "u4"],
  ["تَسْهِيلٌ ← eş anlam", "تَيْسِيرٌ", "تَصْعِيبٌ", "تَأْخِيرٌ", "kolaylaştırma", "u4"],
  ["أَنْشَأَ ← zıt anlam", "هَدَمَ", "بَنَى", "اهْتَمَّ", "inşa etti ≠ yıktı", "u4"],
  ["مَصِيفٌ ← zıt anlam", "مَشْتًى", "مَلْعَبٌ", "مَوْقِعٌ", "yazlık ≠ kışlık", "u4"],
  ["بُرْجٌ ← çoğul", "أَبْرَاجٌ", "بُرُوجَاتٌ", "بِرَاجٌ", "kule → kuleler", "u4"],
  ["غَرَضٌ ← çoğul", "أَغْرَاضٌ", "غُرُوضٌ", "غَرَضَاتٌ", "amaç → amaçlar", "u4"],
  ["قَارَّتَانِ + آسْيَا وَأُورُوبَّا ← izafet", "قَارَّتَيْ آسْيَا وَأُورُوبَّا", "قَارَّتَيْنِ آسْيَا وَأُورُوبَّا", "قَارَّتَانِ آسْيَا وَأُورُوبَّا", "İkilde izafette nûn düşer.", "u5"],
  ["فَتَحَ السُّلْطَانُ المَدِينَةَ ← meçhul", "فُتِحَتِ المَدِينَةُ مِنْ قِبَلِ السُّلْطَانِ", "فَتَحَتِ المَدِينَةُ السُّلْطَانَ", "فُتِحَ السُّلْطَانُ مِنْ قِبَلِ المَدِينَةِ", "Meçhul + مِنْ قِبَلِ", "u5"]
];
// Cami mi, saray mı, kule/köprü mü? hız oyunu
var NOUN_LIST = [
  ["آيَا صُوفْيَا 🕌", "c", "Önce kilise, sonra cami."], ["مَسْجِدُ السُّلْطَانِ أَحْمَدَ", "c", "Mavi Cami."], ["جَامِعُ السُّلَيْمَانِيَّةِ", "c", "Mimar Sinan."], ["جَامِعُ الفَاتِحِ", "c", "Fatih Camii."], ["جَامِعُ أَبِي أَيُّوبَ الأَنْصَارِيِّ", "c", "Eyüp Sultan Camii."], ["كَنِيسَةُ القِدِّيسِ جُورْج", "c", "Fener’deki kilise."],
  ["قَصْرُ طُوبْقَابِي 🏰", "q", "Saray."], ["قَصْرُ يِلْدِز", "q", "Saray."], ["قَصْرُ دُولْمَه بَاغْچَه", "q", "Saray."], ["قَصْرُ بَيْلَرْبَيِي", "q", "Anadolu yakasında saray."],
  ["بُرْجُ غَلَطَةَ 🗼", "b", "Kule."], ["بُرْجُ البِنْتِ", "b", "Kız Kulesi."], ["جِسْرُ البُوسْفُورِ 🌉", "b", "Köprü."], ["جِسْرُ غَلَطَةَ", "b", "Köprü."], ["جِسْرُ السُّلْطَانِ مُحَمَّدٍ الفَاتِحِ", "b", "Köprü."], ["بُرْجُ بَايَزِيدَ", "b", "Kule (yangın kulesi)."]
];
var SP_M = MEKAN;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; }).concat(UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; }));
var HAFIZA = {
  es: { name: "Kelime ↔ eş anlamlısı", pairs: [["أَنْحَاءٌ", "أَطْرَافٌ"], ["الوَفِيرَةُ", "الكَثِيرَةُ"], ["أَنْشَأَ", "بَنَى"], ["طَرِيقٌ", "سَبِيلٌ"], ["تَسْهِيلٌ", "تَيْسِيرٌ"], ["نَالَ", "حَصَلَ"], ["تَجْذِبُ", "تَشُدُّ"], ["المُتَنَوِّعَةُ", "المُتَعَدِّدَةُ"]] },
  zd: { name: "Kelime ↔ zıt anlamlısı", pairs: [["أَكْبَرُ", "أَصْغَرُ"], ["مَصِيفٌ", "مَشْتًى"], ["قَدِيمٌ", "حَدِيثٌ"], ["اهْتَمَّ", "أَهْمَلَ"], ["أَنْشَأَ", "هَدَمَ"], ["مَدَحَ", "ذَمَّ"]] },
  cm: { name: "Tekil ↔ çoğul", pairs: [["حَيٌّ", "أَحْيَاءٌ"], ["بُرْجٌ", "أَبْرَاجٌ"], ["قَارَّةٌ", "قَارَّاتٌ"], ["قَصْرٌ", "قُصُورٌ"], ["غَرَضٌ", "أَغْرَاضٌ"], ["نَفَقٌ", "أَنْفَاقٌ"], ["مَعْلَمٌ", "مَعَالِمُ"]] }
};
var KARTLAR = [
  ["İstanbul nerededir?", "عَلَى مَضِيقِ البُوسْفُورِ · المَدِينَةُ الوَحِيدَةُ عَلَى قَارَّتَيْنِ: آسْيَا وَأُورُوبَّا"],
  ["Tarihî adları?", "بِيزَنْطَةُ · القُسْطَنْطِينِيَّةُ · تَارِيخُهَا قَبْلَ المِيلَادِ"],
  ["Neyle en büyük?", "أَكْبَرُ المُدُنِ فِي تُرْكِيَا مِنْ حَيْثُ عَدَدُ السُّكَّانِ · مِنْ أَكْثَرِ المُدُنِ ازْدِحَامًا"],
  ["Fetih?", "١٤٥٣م مِنْ قِبَلِ السُّلْطَانِ مُحَمَّدٍ الفَاتِحِ"],
  ["Hadis?", "«لَتُفْتَحَنَّ القُسْطَنْطِينِيَّةُ، فَلَنِعْمَ الأَمِيرُ أَمِيرُهَا، وَلَنِعْمَ الجَيْشُ ذَلِكَ الجَيْشُ»"],
  ["Ebû Eyyûb el-Ensârî?", "جَاءَ لِيَنَالَ هَذَا الشَّرَفَ، فَمَاتَ وَدُفِنَ فِيهَا"],
  ["Doğası?", "الجِبَالُ الخَضْرَاءُ · السُّهُولُ الزِّرَاعِيَّةُ · الجُزُرُ · الجَوُّ المُعْتَدِلُ · المِيَاهُ الوَفِيرَةُ"],
  ["Tarihî eserleri?", "آيَا صُوفْيَا · مَسْجِدُ السُّلْطَانِ أَحْمَدَ · قَصْرُ طُوبْقَابِي · بُرْجُ غَلَطَةَ · بُرْجُ البِنْتِ · قَصْرُ يِلْدِز"],
  ["Eş anlamlar?", "أَنْحَاءٌ = أَطْرَافٌ · أَنْشَأَ = بَنَى · نَالَ = حَصَلَ · تَجْذِبُ = تَشُدُّ"],
  ["Zıt anlamlar?", "مَصِيفٌ ≠ مَشْتًى · اهْتَمَّ ≠ أَهْمَلَ · أَنْشَأَ ≠ هَدَمَ · مَدَحَ ≠ ذَمَّ"],
  ["Çoğullar?", "أَحْيَاءٌ · أَبْرَاجٌ · قَارَّاتٌ · قُصُورٌ · أَغْرَاضٌ · أَنْفَاقٌ"],
  ["Kalıplar?", "مِنْ حَيْثُ · مِنْ قِبَلِ · تَجْمَعُ بَيْنَ… وَ… · اهْتَمَّ بِـ… اهْتِمَامًا كَبِيرًا"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat18";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("مَدِينَةٌ", "i", "şehir", "مُدُنٌ", "fuul_k", "", "قَرْيَةٌ", "هِيَ أَكْبَرُ المُدُنِ فِي تُرْكِيَا.", "المُدُنِ", "Türkiye’nin en büyük şehridir."),
  KW("مَضِيقٌ", "i", "boğaz", "مَضَائِقُ", "feail", "", "", "تَقَعُ عَلَى مَضِيقِ البُوسْفُورِ.", "مَضِيقِ", "Boğaziçi’nde yer alır."),
  KW("وَحِيدٌ", "s", "tek, biricik", "", "", "", "", "وَهِيَ المَدِينَةُ الوَحِيدَةُ فِي العَالَمِ.", "الوَحِيدَةُ", "Dünyadaki tek şehirdir."),
  KW("قَارَّةٌ", "i", "kıta", "قَارَّاتٌ", "at", "", "", "الَّتِي تَقَعُ عَلَى قَارَّتَيْنِ: آسْيَا وَأُورُوبَّا.", "قَارَّتَيْنِ", "İki kıta üzerinde bulunan."),
  KW("جَذَبَ", "f", "çekti", "", "", "شَدَّ", "", "لِذَلِكَ تَجْذِبُ السَّائِحِينَ.", "تَجْذِبُ", "Bu yüzden turist çeker."),
  KW("سَائِحٌ", "i", "turist", "سُيَّاحٌ", "fual2", "", "", "مَدِينَةُ بُورْصَةَ تَجْذِبُ السُّيَّاحَ إِلَيْهَا.", "السُّيَّاحَ", "Bursa turistleri kendine çeker."),
  KW("نَحْوٌ", "i", "yön, taraf", "أَنْحَاءٌ", "efal", "طَرَفٌ", "", "مِنْ كُلِّ أَنْحَاءِ العَالَمِ.", "أَنْحَاءِ", "Dünyanın her yanından."),
  KW("سَاكِنٌ", "i", "sakin, oturan", "سُكَّانٌ", "fual2", "", "", "أَكْبَرُ المُدُنِ مِنْ حَيْثُ عَدَدُ السُّكَّانِ.", "السُّكَّانِ", "Nüfus bakımından en büyük şehir."),
  KW("ازْدِحَامٌ", "i", "kalabalık, izdiham", "", "", "", "", "مِنْ أَكْثَرِ المُدُنِ ازْدِحَامًا فِي العَالَمِ.", "ازْدِحَامًا", "Dünyanın en kalabalık şehirlerinden."),
  KW("حَيٌّ", "i", "mahalle", "أَحْيَاءٌ", "efal", "", "", "تَجْمَعُ بَيْنَ الأَحْيَاءِ التُّرَاثِيَّةِ وَالحَدِيثَةِ.", "الأَحْيَاءِ", "Tarihî ve modern mahalleleri bir araya getirir."),
  KW("فَتَحَ", "f", "fethetti; açtı", "", "", "", "", "فُتِحَتْ إِسْطَنْبُولُ سَنَةَ ١٤٥٣ لِلْمِيلَادِ.", "فُتِحَتْ", "İstanbul 1453’te fethedildi."),
  KW("نَالَ", "f", "elde etti, ulaştı", "", "", "حَصَلَ", "", "لِيَنَالُوا مَدْحَ النَّبِيِّ ﷺ.", "لِيَنَالُوا", "Peygamberin övgüsüne ulaşmak için."),
  KW("مَدَحَ", "f", "övdü", "", "", "", "ذَمَّ", "لِيَنَالُوا مَدْحَ النَّبِيِّ ﷺ.", "مَدْحَ", "Peygamberin övgüsüne ulaşmak için."),
  KW("أَمِيرٌ", "i", "emir, komutan", "أُمَرَاءُ", "fuela", "", "", "فَلَنِعْمَ الأَمِيرُ أَمِيرُهَا.", "الأَمِيرُ", "Onun komutanı ne güzel komutandır."),
  KW("جَيْشٌ", "i", "ordu", "جُيُوشٌ", "fuul", "", "", "وَلَنِعْمَ الجَيْشُ ذَلِكَ الجَيْشُ.", "الجَيْشُ", "O ordu ne güzel ordudur."),
  KW("شَرَفٌ", "i", "şeref", "", "", "", "", "جَاءَ لِيَنَالَ هَذَا الشَّرَفَ.", "الشَّرَفَ", "Bu şerefe ermek için geldi."),
  KW("دُفِنَ", "f", "defnedildi", "", "", "", "", "فَمَاتَ وَدُفِنَ فِيهَا.", "وَدُفِنَ", "Orada vefat etti ve defnedildi."),
  KW("اشْتَهَرَ", "f", "meşhur oldu (بِـ)", "", "", "عُرِفَ", "", "تَشْتَهِرُ إِسْطَنْبُولُ بِبِيئَةٍ طَبِيعِيَّةٍ مُتَنَوِّعَةٍ.", "تَشْتَهِرُ", "İstanbul çeşitli bir doğal çevreyle meşhurdur."),
  KW("بِيئَةٌ", "i", "çevre", "بِيئَاتٌ", "at", "", "", "تَشْتَهِرُ إِسْطَنْبُولُ بِبِيئَةٍ طَبِيعِيَّةٍ.", "بِبِيئَةٍ", "İstanbul doğal çevresiyle meşhurdur."),
  KW("مُتَنَوِّعٌ", "s", "çeşitli", "", "", "مُتَعَدِّدٌ", "", "بِبِيئَةٍ طَبِيعِيَّةٍ مُتَنَوِّعَةٍ.", "مُتَنَوِّعَةٍ", "Çeşitli bir doğal çevre."),
  KW("جَبَلٌ", "i", "dağ", "جِبَالٌ", "fial", "", "سَهْلٌ", "تَجْمَعُ بَيْنَ الجِبَالِ الخَضْرَاءِ.", "الجِبَالِ", "Yeşil dağları bir araya getirir."),
  KW("سَهْلٌ", "i", "ova", "سُهُولٌ", "fuul", "", "جَبَلٌ", "وَالسُّهُولِ الزِّرَاعِيَّةِ وَالجُزُرِ.", "وَالسُّهُولِ", "Tarım ovaları ve adalar."),
  KW("جَزِيرَةٌ", "i", "ada", "جُزُرٌ", "fuul_k", "", "", "وَالجُزُرِ الجَمِيلَةِ.", "وَالجُزُرِ", "Ve güzel adalar."),
  KW("مُعْتَدِلٌ", "s", "ılıman", "", "", "دَافِئٌ", "", "إِضَافَةً إِلَى الجَوِّ المُعْتَدِلِ.", "المُعْتَدِلِ", "Ilıman havaya ek olarak."),
  KW("وَفِيرٌ", "s", "bol", "", "", "كَثِيرٌ", "قَلِيلٌ", "وَالمِيَاهِ الوَفِيرَةِ.", "الوَفِيرَةِ", "Ve bol sular."),
  KW("مَصِيفٌ", "i", "yazlık", "مَصَايِفُ", "mefail", "", "مَشْتًى", "جَعَلَتْ إِسْطَنْبُولَ مَصِيفًا رَائِعًا.", "مَصِيفًا", "İstanbul’u harika bir yazlık yaptı."),
  KW("مَوْقِعٌ", "i", "yer, konum", "مَوَاقِعُ", "mefail", "مَكَانٌ", "", "مِنْ أَهَمِّ المَوَاقِعِ السِّيَاحِيَّةِ.", "المَوَاقِعِ", "En önemli turizm yerlerinden."),
  KW("فُنْدُقٌ", "i", "otel", "فَنَادِقُ", "felail", "", "", "فِيهَا آلَافُ الفَنَادِقِ.", "الفَنَادِقِ", "Binlerce oteli vardır."),
  KW("مَعْلَمٌ", "i", "tarihî eser, simge yapı", "مَعَالِمُ", "mefail", "", "", "عَدَدٌ كَبِيرٌ مِنَ المَعَالِمِ الأَثَرِيَّةِ.", "المَعَالِمِ", "Çok sayıda tarihî eser."),
  KW("قَصْرٌ", "i", "saray", "قُصُورٌ", "fuul", "", "", "وَقَصْرُ طُوبْقَابِي وَقَصْرُ يِلْدِز.", "وَقَصْرُ", "Topkapı Sarayı ve Yıldız Sarayı."),
  KW("بُرْجٌ", "i", "kule", "أَبْرَاجٌ", "efal", "", "", "وَبُرْجُ غَلَطَةَ وَبُرْجُ البِنْتِ.", "وَبُرْجُ", "Galata Kulesi ve Kız Kulesi."),
  KW("جِسْرٌ", "i", "köprü", "جُسُورٌ", "fuul", "", "", "شَبَكَةً مِنَ الطُّرُقِ وَالجُسُورِ.", "وَالجُسُورِ", "Yollar ve köprüler ağı."),
  KW("اهْتَمَّ", "f", "önem verdi (بِـ)", "", "", "", "أَهْمَلَ", "اهْتَمَّتِ الحُكُومَةُ بِهَا اهْتِمَامًا كَبِيرًا.", "اهْتَمَّتِ", "Hükûmet ona büyük önem verdi."),
  KW("أَنْشَأَ", "f", "kurdu, inşa etti", "", "", "بَنَى", "هَدَمَ", "فَأَنْشَأَتْ شَبَكَةً مِنَ الطُّرُقِ.", "فَأَنْشَأَتْ", "Bir yollar ağı kurdu."),
  KW("شَبَكَةٌ", "i", "ağ", "شَبَكَاتٌ", "at", "", "", "فَأَنْشَأَتْ شَبَكَةً مِنَ الطُّرُقِ.", "شَبَكَةً", "Bir yollar ağı kurdu."),
  KW("تَسْهِيلٌ", "i", "kolaylaştırma", "تَسْهِيلَاتٌ", "at", "تَيْسِيرٌ", "", "لِتَسْهِيلِ حَرَكَةِ وَسَائِلِ النَّقْلِ.", "لِتَسْهِيلِ", "Ulaşımın hareketini kolaylaştırmak için."),
  KW("احْتَفَظَ", "f", "sakladı, korudu (بِـ)", "", "", "", "", "أُحِبُّ أَنْ أَحْتَفِظَ بِالصُّوَرِ.", "أَحْتَفِظَ", "Fotoğrafları saklamayı severim."),
  KW("غَرَضٌ", "i", "amaç; eşya", "أَغْرَاضٌ", "efal", "هَدَفٌ", "", "أَغْرَاضٌ: أَهْدَافٌ وَغَايَاتٌ.", "أَغْرَاضٌ", "Amaçlar: hedefler ve gayeler.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul_k":["فُعُلٌ","fu’ul","مُدُنٌ، جُزُرٌ"],"feail":["فَعَائِلُ","feâil","مَضَائِقُ، رَسَائِلُ"],"at":["ـَاتٌ","cem-i müennes sâlim","قَارَّاتٌ، شَبَكَاتٌ"],"fual2":["فُعَّالٌ","fu’’âl","سُيَّاحٌ، سُكَّانٌ"],"efal":["أَفْعَالٌ","ef’âl","أَحْيَاءٌ، أَبْرَاجٌ، أَغْرَاضٌ"],"fuela":["فُعَلَاءُ","fuelâ","أُمَرَاءُ، وُزَرَاءُ"],"fuul":["فُعُولٌ","fuûl","قُصُورٌ، جُسُورٌ، سُهُولٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، بِحَارٌ"],"mefail":["مَفَاعِلُ","mefâil","مَعَالِمُ، مَوَاقِعُ، مَصَايِفُ"],"felail":["فَعَالِلُ","fe‘âlil","فَنَادِقُ، دَرَاهِمُ"]};
