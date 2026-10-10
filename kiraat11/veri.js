// ================= VERİ: Kıraat 11 — عِنْدَ الطَّبِيبِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "المَرِيضُ", tr: "Hasta" }, nasb: { ar: "الطَّبِيبُ", tr: "Doktor" }, cerr: { ar: "العَرَضُ", tr: "Belirti" },
  mi: { ar: "التَّرْكِيبُ", tr: "Kalıp" }, ref: { ar: "العِلَاجُ", tr: "Tedavi" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
// 9. etkinlik: doktorun işi mi?
var ISI = [["e", "Doktorun işi", "مِنْ عَمَلِ الطَّبِيبِ", "nasb"], ["h", "Doktorun işi değil", "لَيْسَ مِنْ عَمَلِهِ", "cerr"]];
// "Kim yapar?" hız oyunu
var KIM = [["tb", "Doktor", "الطَّبِيبُ", "nasb"], ["mm", "Hemşire", "المُمَرِّضُ", "mz"], ["sy", "Eczacı", "الصَّيْدَلَانِيُّ", "ref"], ["mr", "Hasta", "المَرِيضُ", "cerr"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", e: "Doktorun işi", h: "Doktorun işi değil", tb: "Doktor", mm: "Hemşire", sy: "Eczacı", mr: "Hasta" };

// Şikâyet makinesi: [بِـ’den sonra belirti, Türkçe, emoji, tavsiye fiili (أنا, أنت, هو, هي), tavsiyenin devamı, Türkçe tavsiye]
var SIKAYET = [
  ["بِصُدَاعٍ شَدِيدٍ", "şiddetli baş ağrısı", "🤕", ["أَرْتَاحَ", "تَرْتَاحَ", "يَرْتَاحَ", "تَرْتَاحَ"], "كَثِيرًا", "çok dinlenmek"],
  ["بِارْتِفَاعٍ فِي دَرَجَةِ الحَرَارَةِ", "ateş (yüksek vücut ısısı)", "🌡️", ["أَشْرَبَ", "تَشْرَبَ", "يَشْرَبَ", "تَشْرَبَ"], "كَثِيرًا مِنْ عَصِيرِ البُرْتُقَالِ", "bol portakal suyu içmek"],
  ["بِأَلَمٍ فِي البَطْنِ", "karın ağrısı", "😣", ["أَذْهَبَ", "تَذْهَبَ", "يَذْهَبَ", "تَذْهَبَ"], "إِلَى الطَّبِيبِ", "doktora gitmek"],
  ["بِزُكَامٍ", "nezle", "🤧", ["أَلْبَسَ", "تَلْبَسَ", "يَلْبَسَ", "تَلْبَسَ"], "مَلَابِسَ ثَقِيلَةً", "kalın giysiler giymek"],
  ["بِسُعَالٍ", "öksürük", "😷", ["أَتَنَاوَلَ", "تَتَنَاوَلَ", "يَتَنَاوَلَ", "تَتَنَاوَلَ"], "الدَّوَاءَ بِانْتِظَامٍ", "ilacı düzenli almak"],
  ["بِتَعَبٍ وَإِرْهَاقٍ", "yorgunluk ve bitkinlik", "😩", ["أَنَامَ", "تَنَامَ", "يَنَامَ", "تَنَامَ"], "مُبَكِّرًا", "erken yatmak"]
];
// Kişi: [zamir, يَشْعُرُ çekimi, عَلَى + zamir, Türkçe]
var KISI = [["أَنَا", "أَشْعُرُ", "عَلَيَّ", "Ben"], ["أَنْتَ", "تَشْعُرُ", "عَلَيْكَ", "Sen"], ["هُوَ", "يَشْعُرُ", "عَلَيْهِ", "O (erkek)"], ["هِيَ", "تَشْعُرُ", "عَلَيْهَا", "O (kadın)"]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "فِي أَحَدِ الأَيَّامِ اسْتَيْقَظَتِ الأُمُّ مُبَكِّرًا وَأَعَدَّتِ الطَّعَامَ لِلْأُسْرَةِ، ثُمَّ نَادَتِ ابْنَهَا «خَالِدًا» لِيَتَنَاوَلَ طَعَامَ الفَطُورِ وَيَذْهَبَ إِلَى المَدْرَسَةِ، لَكِنَّ «خَالِدًا» كَانَ مَرِيضًا، وَكَانَ يَشْعُرُ بِصُدَاعٍ شَدِيدٍ، وَكَانَ يُحِسُّ بِارْتِفَاعٍ فِي دَرَجَةِ الحَرَارَةِ وَبِأَلَمٍ فِي بَطْنِهِ، فَاتَّصَلَتْ أُمُّهُ بِالمُسْتَشْفَى وَطَلَبَتْ سَيَّارَةَ الإِسْعَافِ. جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ خَمْسِ دَقَائِقَ، حَمَلَ المُمَرِّضُونَ «خَالِدًا» وَوَضَعُوهُ فِي سَيَّارَةِ الإِسْعَافِ وَنَقَلُوهُ إِلَى المُسْتَشْفَى." +
  "<br>فَحَصَ الطَّبِيبُ «خَالِدًا» أَوَّلًا، ثُمَّ قَاسَ دَرَجَةَ حَرَارَتِهِ بِمِقْيَاسِ الحَرَارَةِ، وَقَاسَ ضَغْطَهُ بِمِقْيَاسِ الضَّغْطِ، ثُمَّ فَحَصَ صَدْرَهُ وَقَلْبَهُ بِالسَّمَّاعَةِ، وَقَالَ لَهُ: عِنْدَكَ أَعْرَاضُ زُكَامٍ شَدِيدٍ، رُبَّمَا خَرَجْتَ مِنَ المَنْزِلِ فِي البَرْدِ وَلَمْ تَلْبَسْ مَلَابِسَ ثَقِيلَةً، أَوِ انْتَقَلَتْ عَدْوَى إِلَيْكَ مِنْ شَخْصٍ مَرِيضٍ، فَأَخْبَرَهُ خَالِدٌ أَنَّ صَدِيقَهُ الَّذِي يَجْلِسُ بِجَانِبِهِ فِي المَدْرَسَةِ مُصَابٌ بِالزُّكَامِ." +
  "<br>كَتَبَ الطَّبِيبُ لِخَالِدٍ وَصْفَةَ العِلَاجِ، وَنَصَحَهُ بَعْضَ النَّصَائِحِ، فَقَالَ لَهُ: يَجِبُ عَلَيْكَ أَنْ تَشْرَبَ كَثِيرًا مِنْ عَصِيرِ البُرْتُقَالِ وَاللَّيْمُونِ، وَعَلَيْكَ أَنْ تَرْتَاحَ كَثِيرًا، وَأَنْ تَتَنَاوَلَ العِلَاجَ بِانْتِظَامٍ لِثَلَاثَةِ أَيَّامٍ، ثُمَّ تُرَاجِعَنِي بَعْدَ ذَلِكَ." +
  "<br>شَكَرَ خَالِدٌ وَوَالِدَتُهُ الطَّبِيبَ ثُمَّ ذَهَبَا إِلَى الصَّيْدَلِيَّةِ وَاشْتَرَيَا الدَّوَاءَ وَرَجَعَا إِلَى البَيْتِ. وَعِنْدَ وُصُولِهِمَا تَوَضَّأَتْ أُمُّ خَالِدٍ وَصَلَّتْ رَكْعَتَيْنِ صَلَاةَ الشُّكْرِ عَلَى سَلَامَةِ وَلَدِهَا." +
  "<br>بَعْدَ ثَلَاثَةِ أَيَّامٍ تَحَسَّنَتْ حَالَةُ خَالِدٍ كَثِيرًا وَأَصْبَحَ يَأْكُلُ جَيِّدًا وَيُمَارِسُ الرِّيَاضَةَ، ثُمَّ ذَهَبَ إِلَى مَوْعِدِهِ مَعَ الطَّبِيبِ فَفَحَصَهُ مَرَّةً ثَانِيَةً وَأَخْبَرَهُ بِأَنَّهُ تَعَافَى وَالحَمْدُ لِلَّهِ.";
var METIN_TR = "Bir gün anne erkenden kalktı ve aile için yemek hazırladı, sonra oğlu Hâlid’i kahvaltı edip okula gitsin diye çağırdı. Ama Hâlid hastaydı; şiddetli bir baş ağrısı hissediyordu, ateşinin yükseldiğini ve karnında bir ağrı hissediyordu. Annesi hastaneyi aradı ve ambulans istedi. Ambulans beş dakika sonra geldi; hastabakıcılar Hâlid’i taşıyıp ambulansa koydular ve hastaneye götürdüler." +
  "<br>Doktor önce Hâlid’i muayene etti, sonra termometreyle ateşini, tansiyon aletiyle tansiyonunu ölçtü, ardından steteskopla göğsünü ve kalbini dinledi ve ona şöyle dedi: “Sende şiddetli nezle belirtileri var. Belki soğukta kalın giysi giymeden evden çıktın ya da hasta birinden sana mikrop bulaştı.” Hâlid de okulda yanında oturan arkadaşının nezle olduğunu söyledi." +
  "<br>Doktor Hâlid’e ilaç reçetesini yazdı ve ona bazı tavsiyelerde bulundu: “Bol bol portakal ve limon suyu içmelisin, çok dinlenmelisin ve ilacı üç gün düzenli almalısın; sonra bana tekrar gel.”" +
  "<br>Hâlid ve annesi doktora teşekkür ettiler, sonra eczaneye gidip ilacı aldılar ve eve döndüler. Eve varınca Hâlid’in annesi abdest aldı ve oğlunun sağlığına kavuşması için iki rekât şükür namazı kıldı." +
  "<br>Üç gün sonra Hâlid’in durumu çok düzeldi; iyi yemeye ve spor yapmaya başladı. Sonra doktorla randevusuna gitti; doktor onu ikinci kez muayene etti ve iyileştiğini söyledi. Elhamdülillah.";
var SOZLUK = [["مَرِيضٌ ج مَرْضَى", "hasta"], ["صُدَاعٌ", "baş ağrısı"], ["يُحِسُّ بِـ", "…i hisseder"], ["دَرَجَةُ الحَرَارَةِ", "vücut ısısı, ateş"], ["بَطْنٌ", "karın"], ["سَيَّارَةُ الإِسْعَافِ", "ambulans"], ["المُمَرِّضُونَ", "hemşireler, hastabakıcılar"], ["فَحَصَ", "muayene etti"], ["قَاسَ", "ölçtü"], ["مِقْيَاسُ الحَرَارَةِ", "termometre"], ["مِقْيَاسُ الضَّغْطِ", "tansiyon aleti"], ["صَدْرٌ / قَلْبٌ", "göğüs / kalp"], ["السَّمَّاعَةُ", "steteskop"], ["أَعْرَاضٌ", "belirtiler"], ["زُكَامٌ", "nezle"], ["عَدْوَى", "bulaşma, enfeksiyon"], ["مُصَابٌ بِـ", "…e yakalanmış"], ["وَصْفَةُ العِلَاجِ", "ilaç reçetesi"], ["نَصَحَ", "tavsiye etti, öğüt verdi"], ["بِانْتِظَامٍ", "düzenli olarak"], ["رَاجَعَ", "(doktora) tekrar başvurdu"], ["الصَّيْدَلِيَّةُ", "eczane"], ["تَحَسَّنَ", "düzeldi, iyileşti"], ["مَوْعِدٌ", "randevu"], ["تَعَافَى", "iyileşti, şifa buldu"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendini düşünmek: hastalanınca nereye gidersin, ateşin çıkınca ne yaparsın, ilacı nereden alırsın", "Doktora gitme hikâyesini durmadan okumak ve dinlemek", "Hastalık, belirti ve tedavi kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "كَانَ خَالِدٌ:mz / يَشْعُرُ بِصُدَاعٍ شَدِيدٍ:cerr / وَبِأَلَمٍ فِي بَطْنِهِ.:cerr", tr: "Hâlid şiddetli bir baş ağrısı ve karnında ağrı hissediyordu." },
    { s: "فَحَصَ الطَّبِيبُ:nasb / «خَالِدًا»:mz / وَكَتَبَ لَهُ وَصْفَةَ العِلَاجِ.:ref", tr: "Doktor Hâlid’i muayene etti ve ona ilaç reçetesi yazdı." }
  ],
  rules: [
    { tr: "<b>Hastalık kelimeleri:</b> <span class=\"ar\">مَرِيضٌ</span> hasta · <span class=\"ar\">صُدَاعٌ = أَلَمُ الرَّأْسِ</span> baş ağrısı · <span class=\"ar\">زُكَامٌ</span> nezle · <span class=\"ar\">سُعَالٌ</span> öksürük · <span class=\"ar\">ارْتِفَاعُ دَرَجَةِ الحَرَارَةِ</span> ateş · <span class=\"ar\">أَعْرَاضٌ</span> belirtiler · <span class=\"ar\">عَدْوَى</span> bulaşma." },
    { tr: "<b>Doktorda:</b> <span class=\"ar\">فَحَصَ</span> muayene etti · <span class=\"ar\">قَاسَ الحَرَارَةَ / الضَّغْطَ</span> ateşi / tansiyonu ölçtü · <span class=\"ar\">السَّمَّاعَةُ</span> steteskop · <span class=\"ar\">وَصْفَةٌ</span> reçete · <span class=\"ar\">نَصَحَ</span> tavsiye etti · <span class=\"ar\">مَوْعِدٌ</span> randevu · <span class=\"ar\">رَاجَعَ الطَّبِيبَ</span> doktora tekrar gitti." },
    { tr: "<b>İyileşme:</b> <span class=\"ar\">تَحَسَّنَتْ حَالَتُهُ</span> durumu düzeldi · <span class=\"ar\">تَعَافَى</span> iyileşti, şifa buldu. Hastaya şöyle denir: <span class=\"ar\">أَرْجُو لَكَ الشِّفَاءَ</span> “Şifalar dilerim.”" }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: إِلَى أَيْنَ تَذْهَبُ / تَذْهَبِينَ إِذَا شَعَرْتَ بِالمَرَضِ؟ مَاذَا تَفْعَلُ / تَفْعَلِينَ إِذَا ارْتَفَعَتْ حَرَارَتُكَ؟ مِنْ أَيْنَ تَشْتَرِي / تَشْتَرِينَ الدَّوَاءَ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "عِنْدَ الطَّبِيبِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "إِلَى أَيْنَ تَذْهَبُ إِذَا شَعَرْتَ بِالمَرَضِ؟", a: "أَذْهَبُ إِلَى الطَّبِيبِ أَوْ إِلَى المُسْتَشْفَى.", tr: "Hastalanınca nereye gidersin? (Örnek) Doktora ya da hastaneye." },
        { q: "مَاذَا تَفْعَلُ إِذَا ارْتَفَعَتْ حَرَارَتُكَ؟", a: "أَشْرَبُ كَثِيرًا مِنَ المَاءِ وَالعَصِيرِ وَأَرْتَاحُ، ثُمَّ أَذْهَبُ إِلَى الطَّبِيبِ.", tr: "Ateşin çıkınca ne yaparsın? Bol su ve meyve suyu içer, dinlenirim; sonra doktora giderim." },
        { q: "مِنْ أَيْنَ تَشْتَرِي الدَّوَاءَ؟", a: "أَشْتَرِي الدَّوَاءَ مِنَ الصَّيْدَلِيَّةِ.", tr: "İlacı nereden alırsın? Eczaneden." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "اسْتَيْقَظَتِ الأُمُّ مُبَكِّرًا وَأَعَدَّتِ الطَّعَامَ.", a: "d", why: "Metnin ilk cümlesi." },
        { s: "ذَهَبَ خَالِدٌ إِلَى المَدْرَسَةِ فِي ذَلِكَ اليَوْمِ.", a: "y", why: "لَكِنَّ «خَالِدًا» كَانَ مَرِيضًا." },
        { s: "كَانَ خَالِدٌ يَشْعُرُ بِصُدَاعٍ شَدِيدٍ.", a: "d", why: "Metinde aynen geçer." },
        { s: "اتَّصَلَ أَبُو خَالِدٍ بِالمُسْتَشْفَى.", a: "y", why: "فَاتَّصَلَتْ أُمُّهُ بِالمُسْتَشْفَى." },
        { s: "جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ سَاعَةٍ.", a: "y", why: "بَعْدَ خَمْسِ دَقَائِقَ." },
        { s: "قَاسَ الطَّبِيبُ ضَغْطَ خَالِدٍ بِمِقْيَاسِ الضَّغْطِ.", a: "d", why: "وَقَاسَ ضَغْطَهُ بِمِقْيَاسِ الضَّغْطِ." },
        { s: "فَحَصَ الطَّبِيبُ صَدْرَ خَالِدٍ بِالسَّمَّاعَةِ.", a: "d", why: "فَحَصَ صَدْرَهُ وَقَلْبَهُ بِالسَّمَّاعَةِ." },
        { s: "عِنْدَ خَالِدٍ أَعْرَاضُ زُكَامٍ شَدِيدٍ.", a: "d", why: "Doktorun sözü." },
        { s: "صَدِيقُ خَالِدٍ مُصَابٌ بِالزُّكَامِ.", a: "d", why: "…أَنَّ صَدِيقَهُ… مُصَابٌ بِالزُّكَامِ." },
        { s: "نَصَحَ الطَّبِيبُ خَالِدًا أَنْ يَتَنَاوَلَ العِلَاجَ لِأُسْبُوعٍ.", a: "y", why: "لِثَلَاثَةِ أَيَّامٍ." },
        { s: "صَلَّتْ أُمُّ خَالِدٍ رَكْعَتَيْنِ صَلَاةَ الشُّكْرِ.", a: "d", why: "عَلَى سَلَامَةِ وَلَدِهَا." },
        { s: "بَعْدَ ثَلَاثَةِ أَيَّامٍ تَعَافَى خَالِدٌ.", a: "d", why: "وَأَخْبَرَهُ بِأَنَّهُ تَعَافَى." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("وَكَانَ يَشْعُرُ بِصُدَاعٍ شَدِيدٍ", "بِصُدَاعٍ"), "baş ağrısı", "karın ağrısı", "öksürük", "Şiddetli baş ağrısı hissediyordu.", "= أَلَمُ الرَّأْسِ"],
      [HL("وَكَانَ يُحِسُّ بِارْتِفَاعٍ فِي دَرَجَةِ الحَرَارَةِ", "يُحِسُّ"), "hissediyordu", "ölçüyordu", "unutuyordu", "Ateşinin yükseldiğini hissediyordu.", "= يَشْعُرُ"],
      [HL("وَبِأَلَمٍ فِي بَطْنِهِ", "بَطْنِهِ"), "karnı", "başı", "sırtı", "Karnında ağrı.", ""],
      [HL("وَطَلَبَتْ سَيَّارَةَ الإِسْعَافِ", "الإِسْعَافِ"), "ilk yardım (ambulans)", "itfaiye", "taksi", "Ambulans istedi.", "أَسْعَفَ: ilk yardım yaptı."],
      [HL("حَمَلَ المُمَرِّضُونَ «خَالِدًا»", "المُمَرِّضُونَ"), "hemşireler, hastabakıcılar", "öğretmenler", "polisler", "Hastabakıcılar Hâlid’i taşıdı.", ""],
      [HL("ثُمَّ قَاسَ دَرَجَةَ حَرَارَتِهِ", "قَاسَ"), "ölçtü", "yazdı", "sattı", "Ateşini ölçtü.", "مِقْيَاسٌ: ölçü aleti."],
      [HL("فَحَصَ صَدْرَهُ وَقَلْبَهُ بِالسَّمَّاعَةِ", "بِالسَّمَّاعَةِ"), "steteskopla", "termometreyle", "makasla", "Göğsünü ve kalbini steteskopla dinledi.", "سَمِعَ: duydu."],
      [HL("عِنْدَكَ أَعْرَاضُ زُكَامٍ شَدِيدٍ", "أَعْرَاضُ"), "belirtiler", "ilaçlar", "randevular", "Sende şiddetli nezle belirtileri var.", "Tekili: عَرَضٌ = عَلَامَةٌ."],
      [HL("أَوِ انْتَقَلَتْ عَدْوَى إِلَيْكَ", "عَدْوَى"), "bulaşma, mikrop", "ilaç", "yorgunluk", "Sana mikrop bulaştı.", ""],
      [HL("كَتَبَ الطَّبِيبُ لِخَالِدٍ وَصْفَةَ العِلَاجِ", "وَصْفَةَ"), "reçete", "fatura", "mektup", "Doktor ilaç reçetesi yazdı.", "Çoğulu: وَصَفَاتٌ."],
      [HL("وَأَنْ تَتَنَاوَلَ العِلَاجَ بِانْتِظَامٍ", "بِانْتِظَامٍ"), "düzenli olarak", "nadiren", "hızlıca", "İlacı düzenli al.", "نِظَامٌ: düzen."],
      [HL("وَأَخْبَرَهُ بِأَنَّهُ تَعَافَى", "تَعَافَى"), "iyileşti", "hastalandı", "uyudu", "İyileştiğini söyledi.", "= تَحَسَّنَ"]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama ve Olayların Sırası", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "ref"],
  goals: ["Metinle ilgili soruları cevaplamak", "Hikâyedeki olayları sıraya koymak", "Yanlış bilgiyi metne göre düzeltmek", "Hastanın, doktorun ve annenin ne yaptığını anlatmak"],
  examples: [
    { s: "اتَّصَلَتْ أُمُّهُ بِالمُسْتَشْفَى:mz.1 / ← فَحَصَهُ الطَّبِيبُ:nasb.2 / ← اشْتَرَيَا الدَّوَاءَ:ref.3 / ← تَعَافَى.:ref.4", tr: "Annesi hastaneyi aradı → doktor muayene etti → ilacı aldılar → iyileşti." }
  ],
  rules: [
    { tr: "<b>Olay sırası:</b> sabah (<span class=\"ar\">اسْتَيْقَظَتِ الأُمُّ</span>) → hastalık (<span class=\"ar\">كَانَ مَرِيضًا</span>) → ambulans (<span class=\"ar\">سَيَّارَةُ الإِسْعَافِ</span>) → muayene ve reçete (<span class=\"ar\">فَحَصَ… كَتَبَ الوَصْفَةَ</span>) → tavsiye (<span class=\"ar\">نَصَحَهُ</span>) → eczane (<span class=\"ar\">اشْتَرَيَا الدَّوَاءَ</span>) → iyileşme (<span class=\"ar\">تَحَسَّنَتْ حَالَتُهُ</span>)." },
    { tr: "<b>Kitaptaki 2. etkinlik:</b> “Annesi Hâlid’in kahvaltı edip okula gitmesini istiyor” ve “Hâlid ağrıyla uyandı” cümleleri metinde aynı ana aittir; ilk iki kutuya hangi sırayla koyarsan koy doğru kabul edilir." },
    { tr: "<b>Şükür namazı:</b> Hâlid’in annesi oğlunun iyileşmesine şükür için iki rekât namaz kıldı. Kitap dersi şu ayetle bitiriyor:<br><span class=\"ar\" style=\"display:block;font-size:1.25rem\">﴿وَمَنْ شَكَرَ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ وَمَنْ كَفَرَ فَإِنَّ رَبِّي غَنِيٌّ كَرِيمٌ﴾</span>“Kim şükrederse kendisi için şükretmiş olur; kim nankörlük ederse bilsin ki Rabbim müstağnîdir, kerîmdir.” (Neml 40)" }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَتَى شَعَرَ خَالِدٌ بِالمَرَضِ؟ مَا أَعْرَاضُ مَرَضِ خَالِدٍ؟ مَاذَا فَعَلَتْ أُمُّ خَالِدٍ عِنْدَمَا شَاهَدَتْهُ مَرِيضًا؟ بِمَاذَا نَصَحَ الطَّبِيبُ خَالِدًا؟", "٢ ـ رَتِّبِ الأَحْدَاثَ الآتِيَةَ كَمَا قَرَأْتَهَا فِي نَصِّ القِرَاءَةِ السَّابِقِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مَتَى شَعَرَ خَالِدٌ بِالمَرَضِ؟", "فِي الصَّبَاحِ، عِنْدَمَا نَادَتْهُ أُمُّهُ لِيَتَنَاوَلَ الفَطُورَ وَيَذْهَبَ إِلَى المَدْرَسَةِ.", "فِي المَسَاءِ، بَعْدَ أَنْ رَجَعَ مِنَ المَدْرَسَةِ.", "فِي المَدْرَسَةِ، عِنْدَمَا جَلَسَ بِجَانِبِ صَدِيقِهِ.", "Hâlid ne zaman hastalandığını hissetti? Sabah, annesi onu kahvaltıya çağırınca.", ""],
      ["مَا أَعْرَاضُ مَرَضِ خَالِدٍ؟", "صُدَاعٌ شَدِيدٌ، وَارْتِفَاعٌ فِي دَرَجَةِ الحَرَارَةِ، وَأَلَمٌ فِي البَطْنِ.", "سُعَالٌ وَأَلَمٌ فِي الرِّجْلِ.", "أَلَمٌ فِي العَيْنِ وَالأُذُنِ.", "Hâlid’in hastalık belirtileri neler? Baş ağrısı, ateş, karın ağrısı.", ""],
      ["مَاذَا فَعَلَتْ أُمُّ خَالِدٍ عِنْدَمَا شَاهَدَتْهُ مَرِيضًا؟", "اتَّصَلَتْ بِالمُسْتَشْفَى وَطَلَبَتْ سَيَّارَةَ الإِسْعَافِ.", "أَعْطَتْهُ دَوَاءً مِنَ البَيْتِ وَذَهَبَتْ إِلَى عَمَلِهَا.", "أَرْسَلَتْهُ إِلَى المَدْرَسَةِ.", "Annesi ne yaptı? Hastaneyi arayıp ambulans istedi.", ""],
      ["بِمَاذَا نَصَحَ الطَّبِيبُ خَالِدًا؟", "أَنْ يَشْرَبَ كَثِيرًا مِنْ عَصِيرِ البُرْتُقَالِ وَاللَّيْمُونِ، وَأَنْ يَرْتَاحَ، وَأَنْ يَتَنَاوَلَ العِلَاجَ بِانْتِظَامٍ.", "أَنْ يَذْهَبَ إِلَى المَدْرَسَةِ فِي اليَوْمِ التَّالِي.", "أَنْ يُمَارِسَ الرِّيَاضَةَ كُلَّ يَوْمٍ وَأَلَّا يَتَنَاوَلَ الدَّوَاءَ.", "Doktor ne tavsiye etti? Bol portakal ve limon suyu içmesini, dinlenmesini, ilacı düzenli almasını.", ""]
    ])},
    { type: "bank", num: "٢", ar: "رَتِّبِ الأَحْدَاثَ الآتِيَةَ كَمَا قَرَأْتَهَا فِي نَصِّ القِرَاءَةِ السَّابِقِ", tr: "Önce aşağıdan olayı seç, sonra sıradaki kutuya dokun (1 = ilk olay). İlk iki olay aynı ana ait; ikisi de iki sırada kabul edilir.", bank: ["أَخَذَتْ سَيَّارَةُ الإِسْعَافِ خَالِدًا إِلَى المُسْتَشْفَى", "اسْتَيْقَظَ خَالِدٌ وَهُوَ يَشْعُرُ بِالأَلَمِ", "تُرِيدُ أُمُّ خَالِدٍ أَنْ يَتَنَاوَلَ ابْنُهَا الفَطُورَ وَيَذْهَبَ إِلَى المَدْرَسَةِ", "تَحَسَّنَتْ حَالَةُ خَالِدٍ بَعْدَ أَيَّامٍ قَلِيلَةٍ", "اشْتَرَى خَالِدٌ وَأُمُّهُ الدَّوَاءَ", "يَحْتَاجُ خَالِدٌ إِلَى شُرْبِ العَصِيرِ وَالرَّاحَةِ", "فَحَصَ الطَّبِيبُ خَالِدًا، وَكَتَبَ لَهُ الوَصْفَةَ المُنَاسِبَةَ لِلزُّكَامِ"], items: [
      { pre: "١", a: [2, 1], tr: "Annesi kahvaltı edip okula gitmesini istiyor / Hâlid ağrıyla uyandı" }, { pre: "٢", a: [1, 2], tr: "(ilk ikisi aynı an)" }, { pre: "٣", a: [0], tr: "Ambulans Hâlid’i hastaneye götürdü." }, { pre: "٤", a: [6], tr: "Doktor muayene etti, nezle için reçete yazdı." }, { pre: "٥", a: [5], tr: "Hâlid’in meyve suyuna ve dinlenmeye ihtiyacı var (tavsiye)." }, { pre: "٦", a: [4], tr: "Hâlid ve annesi ilacı aldı." }, { pre: "٧", a: [3], tr: "Birkaç gün sonra durumu düzeldi." }
    ]},
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["اتَّصَلَ أَبُو خَالِدٍ بِالمُسْتَشْفَى. ✗", "اتَّصَلَتْ أُمُّ خَالِدٍ بِالمُسْتَشْفَى.", "اتَّصَلَ خَالِدٌ بِصَدِيقِهِ.", "لَمْ يَتَّصِلْ أَحَدٌ بِالمُسْتَشْفَى.", "Hâlid’in annesi hastaneyi aradı.", ""],
      ["جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ سَاعَةٍ. ✗", "جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ خَمْسِ دَقَائِقَ.", "جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ يَوْمَيْنِ.", "لَمْ تَأْتِ سَيَّارَةُ الإِسْعَافِ.", "Ambulans beş dakika sonra geldi.", ""],
      ["يَتَنَاوَلُ خَالِدٌ العِلَاجَ لِأُسْبُوعٍ. ✗", "يَتَنَاوَلُ خَالِدٌ العِلَاجَ بِانْتِظَامٍ لِثَلَاثَةِ أَيَّامٍ.", "يَتَنَاوَلُ خَالِدٌ العِلَاجَ لِشَهْرٍ.", "لَا يَتَنَاوَلُ خَالِدٌ العِلَاجَ.", "Hâlid ilacı üç gün düzenli alır.", ""],
      ["انْتَقَلَتِ العَدْوَى إِلَى خَالِدٍ مِنْ أُمِّهِ. ✗", "انْتَقَلَتِ العَدْوَى إِلَى خَالِدٍ مِنْ صَدِيقِهِ فِي المَدْرَسَةِ.", "انْتَقَلَتِ العَدْوَى إِلَى خَالِدٍ مِنَ الطَّبِيبِ.", "انْتَقَلَتِ العَدْوَى مِنْ خَالِدٍ إِلَى أُمِّهِ.", "Mikrop ona okuldaki arkadaşından bulaştı (muhtemelen).", "Doktor “belki” diyor; Hâlid arkadaşının nezle olduğunu söylüyor."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Eş, Çoğul, Zıt", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Doktor ve hastane kelimeleriyle boşluk doldurmak", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Tekil ile çoğulu eşleştirmek", "Altı çizili kelimenin zıddını bulmak"],
  examples: [
    { s: "صُدَاعٌ:mz.Kelime / = أَلَمُ الرَّأْسِ:nasb.Eş", tr: "baş ağrısı = baş ağrısı", pair: "مَرِيضٌ:mz.Kelime / ≠ سَلِيمٌ:cerr.Zıt", pairTr: "hasta ≠ sağlıklı" }
  ],
  rules: [
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">تَعَبٌ = إِرْهَاقٌ · دَوَاءٌ = عِلَاجٌ · صُدَاعٌ = أَلَمُ الرَّأْسِ · تَحَسَّنَ = تَعَافَى · يُعِدُّ = يُحَضِّرُ · عَرَضٌ = عَلَامَةٌ</span>" },
    { tr: "<b>Çoğullar:</b> <span class=\"ar\">مَرِيضٌ ← مَرْضَى · طَبِيبٌ ← أَطِبَّاءُ · مُمَرِّضَةٌ ← مُمَرِّضَاتٌ · سَيَّارَةٌ ← سَيَّارَاتٌ · وَصْفَةٌ ← وَصَفَاتٌ · نَصِيحَةٌ ← نَصَائِحُ · صَيْدَلِيَّةٌ ← صَيْدَلِيَّاتٌ</span>. <span class=\"ar\">مَرْضَى</span> (فَعْلَى) ve <span class=\"ar\">أَطِبَّاءُ</span> (أَفْعِلَاءُ) kırık çoğuldur." },
    { tr: "<b>Zıt anlam:</b> <span class=\"ar\">صَغِيرَةٌ ≠ كَبِيرَةٌ · قَرِيبَةٌ ≠ بَعِيدَةٌ · السَّلِيمُ ≠ المَرِيضُ · يَبِيعُ ≠ يَشْتَرِي · مُرْتَفِعَةٌ ≠ مُنْخَفِضَةٌ · كَامِلٌ ≠ نَاقِصٌ · بِانْتِظَامٍ ≠ بِغَيْرِ انْتِظَامٍ</span>" }
  ],
  kaide: ["٣ ـ امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِالكَلِمَاتِ المُنَاسِبَةِ مِنَ الصُّنْدُوقِ: (يُسَاعِدْنَ، مُشْكِلَتِهِ، يَسْتَطِيعُ، سَيَّارَةُ الإِسْعَافِ، المَرِيضُ، يَفْحَصُ، المَرِيضَ، الوَصْفَةَ).", "٤ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا. ٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَجَمْعِهَا. ٦ ـ اكْتُبْ عَكْسَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ فِي الجُمَلِ الآتِيَةِ."],
  ex: [
    { type: "bank", num: "٣", ar: "امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِالكَلِمَاتِ المُنَاسِبَةِ مِنَ الصُّنْدُوقِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Her kelime bir kez kullanılır.", bank: ["يُسَاعِدْنَ", "مُشْكِلَتِهِ", "يَسْتَطِيعُ", "سَيَّارَةُ الإِسْعَافِ", "المَرِيضُ", "يَفْحَصُ", "المَرِيضَ", "الوَصْفَةَ"],
      tr2: "1) Hasta doktorun muayenehanesine girer ve doktora sorununu anlatır; sonra doktor hastayı muayene eder ve hastalığına uygun reçeteyi verir. 2) Hemşireler doktora ve hastaya da yardım eder. 3) Ambulans hastanın evine gelir ve onu hastaneye götürür, çünkü yürüyemez.",
      parts: ["١ ـ يَدْخُلُ", { a: [4] }, "إِلَى عِيَادَةِ الطَّبِيبِ، وَيُخْبِرُ الطَّبِيبَ بِـ", { a: [1] }, "، ثُمَّ", { a: [5] }, "الطَّبِيبُ المَرِيضَ، وَيُعْطِيهِ", { a: [7] }, "المُنَاسِبَةَ لِمَرَضِهِ.<br>٢ ـ المُمَرِّضَاتُ", { a: [0] }, "الطَّبِيبَ، وَ", { a: [6] }, "أَيْضًا.<br>٣ ـ تَأْتِي", { a: [3] }, "إِلَى بَيْتِ المَرِيضِ وَتَأْخُذُهُ إِلَى المُسْتَشْفَى لِأَنَّهُ لَا", { a: [2] }, "أَنْ يَمْشِيَ."] },
    { type: "bank", num: "٤", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["أَلَمُ الرَّأْسِ", "يُحَضِّرُ", "إِرْهَاقٌ", "عِلَاجٌ", "تَعَافَى", "عَلَامَةٌ"], items: [
      { pre: "تَعَبٌ =", a: [2], tr: "yorgunluk = bitkinlik" }, { pre: "دَوَاءٌ =", a: [3], tr: "ilaç = tedavi" }, { pre: "صُدَاعٌ =", a: [0], tr: "baş ağrısı" }, { pre: "تَحَسَّنَ =", a: [4], tr: "düzeldi = iyileşti" }, { pre: "يُعِدُّ =", a: [1], tr: "hazırlar" }, { pre: "عَرَضٌ =", a: [5], tr: "belirti = işaret" }
    ]},
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَجَمْعِهَا فِي الآتِي", tr: "Önce aşağıdan çoğulu seç, sonra tekilin kutusuna dokun.", bank: ["سَيَّارَاتٌ", "نَصَائِحُ", "مَرْضَى", "صَيْدَلِيَّاتٌ", "أَطِبَّاءُ", "مُمَرِّضَاتٌ", "وَصَفَاتٌ"], items: [
      { pre: "مَرِيضٌ ←", a: [2], tr: "hasta → hastalar" }, { pre: "طَبِيبٌ ←", a: [4], tr: "doktor → doktorlar" }, { pre: "مُمَرِّضَةٌ ←", a: [5], tr: "hemşire → hemşireler" }, { pre: "سَيَّارَةٌ ←", a: [0], tr: "araba → arabalar" }, { pre: "وَصْفَةٌ ←", a: [6], tr: "reçete → reçeteler" }, { pre: "نَصِيحَةٌ ←", a: [1], tr: "öğüt → öğütler" }, { pre: "صَيْدَلِيَّةٌ ←", a: [3], tr: "eczane → eczaneler" }
    ]},
    { type: "bank", num: "٦", ar: "اكْتُبْ عَكْسَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ فِي الجُمَلِ الآتِيَةِ", tr: "Altı çizili kelimenin zıddını seç, sonra kutusuna dokun.", bank: ["كَبِيرَةٌ", "بَعِيدَةٌ", "المَرِيضِ", "يَشْتَرِي", "مُنْخَفِضَةً", "نَاقِصًا", "بِغَيْرِ انْتِظَامٍ"], items: [
      { pre: "١ ـ هُنَاكَ صَيْدَلِيَّةٌ <u>صَغِيرَةٌ</u> قَرِيبَةٌ مِنْ بَيْتِي. ≠", a: [0], tr: "Evime yakın küçük bir eczane var. küçük ≠ büyük" },
      { pre: "١ ـ هُنَاكَ صَيْدَلِيَّةٌ صَغِيرَةٌ <u>قَرِيبَةٌ</u> مِنْ بَيْتِي. ≠", a: [1], tr: "yakın ≠ uzak" },
      { pre: "٢ ـ العَقْلُ السَّلِيمُ فِي الجِسْمِ <u>السَّلِيمِ</u>. ≠", a: [2], tr: "Sağlam kafa sağlam vücutta bulunur. sağlam ≠ hasta" },
      { pre: "٣ ـ <u>يَبِيعُ</u> الصَّيْدَلَانِيُّ الدَّوَاءَ كَثِيرًا. ≠", a: [3], tr: "Eczacı çok ilaç satar. satar ≠ alır" },
      { pre: "٤ ـ قَاسَ الطَّبِيبُ دَرَجَةَ الحَرَارَةِ، فَكَانَتْ <u>مُرْتَفِعَةً</u> جِدًّا. ≠", a: [4], tr: "Ateş çok yüksekti. yüksek ≠ düşük" },
      { pre: "٥ ـ فَحَصَ الطَّبِيبُ خَالِدًا فَحْصًا <u>كَامِلًا</u>. ≠", a: [5], tr: "Doktor Hâlid’i tam olarak muayene etti. tam ≠ eksik" },
      { pre: "٦ ـ تَنَاوُلُ الدَّوَاءِ <u>بِانْتِظَامٍ</u> مُهِمٌّ جِدًّا. ≠", a: [6], tr: "İlacı düzenli almak çok önemli. düzenli ≠ düzensiz" }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · HASTANEDE
{
  id: "u4", no: 4, ar: "فِي العِيَادَةِ وَالمُسْتَشْفَى", tr: "Muayenehane ve Hastane: Kim Ne Yapar?", short: "Hastane", col: "ref", legend: ["nasb", "mz", "ref"],
  goals: ["Doktoru, hemşireyi, eczacıyı ve ilacı yaptıkları işle eşleştirmek", "Doğru kelimeyi seçmek: ambulans, şifa dileği, baş ağrısı", "Doktorun muayenede yaptığı işleri ayırmak", "Hastaneyle ilgili cümle kurmak"],
  examples: [
    { s: "الطَّبِيبُ:nasb / يَفْحَصُ المَرِيضَ:ref", tr: "Doktor hastayı muayene eder.", pair: "الصَّيْدَلَانِيَّةُ:nasb.Eczacı / تَبِيعُ الدَّوَاءَ:ref", pairTr: "Eczacı (kadın) ilaç satar." }
  ],
  rules: [
    { tr: "<b>Kim ne yapar?</b> <span class=\"ar\">الطَّبِيبُ يَفْحَصُ المَرِيضَ وَيَنْصَحُهُ</span> · <span class=\"ar\">المُمَرِّضُ يُسَاعِدُ الطَّبِيبَ</span> · <span class=\"ar\">الصَّيْدَلَانِيَّةُ تَبِيعُ الدَّوَاءَ</span> · <span class=\"ar\">الدَّوَاءُ يُعَالِجُ المَرَضَ</span> · <span class=\"ar\">سَيَّارَةُ الإِسْعَافِ تَنْقُلُ المَرْضَى</span>." },
    { tr: "<b>Doktorun muayenedeki işleri (9. etkinlik):</b> <span class=\"ar\">يُعَالِجُ، يُدَاوِي، يَفْحَصُ، يُسْعِفُ، يَكْتُبُ الوَصْفَةَ، يَقِيسُ الحَرَارَةَ، يَقِيسُ الضَّغْطَ</span>. Doktorun işi olmayanlar: <span class=\"ar\">يَأْكُلُ، يَتَأَلَّمُ، يَشْتَرِي، يَبِيعُ الدَّوَاءَ، يَقْرَأُ الجَرِيدَةَ، يُشَاهِدُ التِّلْفَازَ</span>." },
    { tr: "<b>Dişil fiil:</b> özne dişilse fiil <span class=\"ar\">تَـ</span> ile başlar: <span class=\"ar\">الصَّيْدَلَانِيَّةُ تَبِيعُ</span>, <span class=\"ar\">سَيَّارَةُ الإِسْعَافِ تَنْقُلُ</span>. Kadınlar topluluğu için <span class=\"ar\">يُسَاعِدْنَ</span>: <span class=\"ar\">المُمَرِّضَاتُ يُسَاعِدْنَ الطَّبِيبَ</span>." }
  ],
  kaide: ["٧ ـ صِلْ بَيْنَ الأَسْمَاءِ فِي (أ) وَالفِعْلِ المُنَاسِبِ لَهَا فِي (ب). ٨ ـ اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ.", "٩ ـ ضَعْ خَطًّا تَحْتَ الأَعْمَالِ الَّتِي يَقُومُ بِهَا الطَّبِيبُ فِي العِيَادَةِ: يُعَالِجُ، يُدَاوِي، يَفْحَصُ، يُسْعِفُ، يَأْكُلُ، يَتَأَلَّمُ، يَشْتَرِي، يَبِيعُ الدَّوَاءَ، يَكْتُبُ الوَصْفَةَ، يَقِيسُ الحَرَارَةَ، يَقِيسُ الضَّغْطَ، يَقْرَأُ الجَرِيدَةَ، يُشَاهِدُ التِّلْفَازَ."],
  ex: [
    { type: "bank", num: "٧", ar: "صِلْ بَيْنَ الأَسْمَاءِ فِي (أ) وَالفِعْلِ المُنَاسِبِ لَهَا فِي (ب)", tr: "Önce aşağıdan fiili seç, sonra ismin kutusuna dokun. “Doktor” iki kez geçiyor; iki fiili de alır.", bank: ["تَبِيعُ الدَّوَاءَ", "يَفْحَصُ المَرِيضَ", "يُعَالِجُ المَرَضَ", "يُسَاعِدُ الطَّبِيبَ", "يَنْصَحُ المَرِيضَ"], items: [
      { pre: "الطَّبِيبُ", a: [1, 4], tr: "Doktor hastayı muayene eder / hastaya öğüt verir." }, { pre: "المُمَرِّضُ", a: [3], tr: "Hemşire doktora yardım eder." }, { pre: "الصَّيْدَلَانِيَّةُ", a: [0], tr: "Eczacı ilaç satar." }, { pre: "الطَّبِيبُ", a: [1, 4], tr: "Doktor hastayı muayene eder / hastaya öğüt verir." }, { pre: "الدَّوَاءُ", a: [2], tr: "İlaç hastalığı tedavi eder." }
    ]},
    { type: "pick", fill: true, num: "٨", ar: "اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ", tr: "Boşluğa uyan kelimeyi seç (kitapta dört seçenek var; burada üçü).", items: PL([
      ["سَيَّارَةُ الإِسْعَافِ تَنْقُلُ المَرْضَى عِنْدَ ___ .", "الضَّرُورَةِ", "السُّرْعَةِ", "المُسْتَشْفَى", "Ambulans hastaları gerektiğinde (acil durumda) taşır.", "عِنْدَ الضَّرُورَةِ: gerektiğinde. Diğer seçenek: المَرَضِ."],
      ["نَقُولُ لِلشَّخْصِ «أَرْجُو لَكَ الشِّفَاءَ» عِنْدَمَا يَكُونُ ___ .", "مَرِيضًا", "مُسَافِرًا", "مُتْعَبًا", "“Şifalar dilerim” deriz, kişi hasta olunca.", "Diğer seçenekler: مُرْهَقًا، يَائِسًا."],
      ["___ أَلَمٌ فِي الرَّأْسِ.", "الصُّدَاعُ", "المَغَصُ", "السُّعَالُ", "Baş ağrısı başta bir ağrıdır.", "المَغَصُ: karın ağrısı (sancı); diğerleri: الإِقْيَاءُ kusma, الإِغْمَاءُ bayılma."],
      ["___ أَلَمٌ شَدِيدٌ فِي البَطْنِ.", "المَغَصُ", "الصُّدَاعُ", "الزُّكَامُ", "Sancı karında şiddetli ağrıdır.", "Ek soru."],
      ["عِنْدَمَا يَكُونُ الإِنْسَانُ ___ يَحْتَاجُ إِلَى الرَّاحَةِ.", "مُرْهَقًا", "سَلِيمًا", "نَشِيطًا", "İnsan bitkin olunca dinlenmeye ihtiyaç duyar.", "Ek soru. مُرْهَقٌ = مُتْعَبٌ."]
    ])},
    { type: "classify", num: "٩", opts: ISI, ar: "ضَعْ خَطًّا تَحْتَ الأَعْمَالِ الَّتِي يَقُومُ بِهَا الطَّبِيبُ فِي العِيَادَةِ", tr: "Bu iş doktorun muayenehanede yaptığı işlerden mi?", items: CL([
      ["يُعَالِجُ", "e", "Tedavi eder."], ["يُدَاوِي", "e", "İlaçla tedavi eder (= يُعَالِجُ)."], ["يَفْحَصُ", "e", "Muayene eder."], ["يُسْعِفُ", "e", "İlk yardım yapar."],
      ["يَأْكُلُ", "h", "Yemek muayene işi değil."], ["يَتَأَلَّمُ", "h", "Acı çeken hastadır."], ["يَشْتَرِي", "h", "Satın almak doktorun işi değil."], ["يَبِيعُ الدَّوَاءَ", "h", "İlacı eczacı satar."],
      ["يَكْتُبُ الوَصْفَةَ", "e", "Reçete yazar."], ["يَقِيسُ الحَرَارَةَ", "e", "Ateşi ölçer."], ["يَقِيسُ الضَّغْطَ", "e", "Tansiyonu ölçer."], ["يَقْرَأُ الجَرِيدَةَ", "h", "Gazete okumak muayene işi değil."], ["يُشَاهِدُ التِّلْفَازَ", "h", "Televizyon izlemek muayene işi değil."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · KALIPLAR
{
  id: "u5", no: 5, ar: "التَّرَاكِيبُ", tr: "Kalıplar: يَشْعُرُ بِـ، عَلَيْكَ أَنْ، يَتَأَلَّفُ مِنْ، عِنْدَمَا", short: "Kalıplar", col: "muz", legend: ["mi", "cerr", "ref"],
  goals: ["يَشْعُرُ بِـ (…i hisseder) kalıbıyla şikâyet söylemek", "عَلَيْكَ أَنْ (…melisin) kalıbıyla tavsiye vermek", "كَثِيرًا مِنْ ve يَتَأَلَّفُ مِنْ kalıplarını kullanmak", "عِنْدَمَا (…dığında) ile zaman cümlesi kurmak"],
  examples: [
    { s: "يَشْعُرُ:mi.Hisseder / بِـ:mi / تَعَبٍ وَإِرْهَاقٍ:cerr.Belirti", tr: "Yorgunluk ve bitkinlik hisseder." },
    { s: "عَلَيْكَ:mi.Zorunluluk / أَنْ تَشْرَبَ:ref.Mansûb / كَثِيرًا مِنْ:mi / عَصِيرِ البُرْتُقَالِ.:-", tr: "Bol portakal suyu içmelisin.", pair: "عِنْدَمَا:mi.Zaman / يَمْرَضُ النَّاسُ:cerr / يَذْهَبُونَ إِلَى المُسْتَشْفَى.:ref", pairTr: "İnsanlar hastalandığında hastaneye giderler." }
  ],
  rules: [
    { tr: "<b>يَشْعُرُ بِـ / يُحِسُّ بِـ</b> “…i hisseder”: hissedilen şey <span class=\"ar\">بِـ</span> ile gelir ve mecrûrdur: <span class=\"ar\">أَشْعُرُ بِصُدَاعٍ · يَشْعُرُ بِتَعَبٍ · تَشْعُرُ بِأَلَمٍ فِي البَطْنِ</span>." },
    { tr: "<b>عَلَيْكَ أَنْ + muzâri mansûb</b> “…melisin”: <span class=\"ar\">عَلَيْكَ أَنْ تَرْتَاحَ</span>. Zamirle: <span class=\"ar\">عَلَيَّ أَنْ أَرْتَاحَ · عَلَيْهِ أَنْ يَرْتَاحَ · عَلَيْهَا أَنْ تَرْتَاحَ</span>. Daha güçlüsü: <span class=\"ar\">يَجِبُ عَلَيْكَ أَنْ…</span>" },
    { tr: "<b>كَثِيرًا مِنْ</b> “bol bol, birçok”: <span class=\"ar\">تَشْرَبُ كَثِيرًا مِنْ عَصِيرِ البُرْتُقَالِ</span>. <b>يَتَأَلَّفُ مِنْ</b> “…den oluşur”: <span class=\"ar\">يَتَأَلَّفُ الكِتَابُ مِنْ قِسْمَيْنِ</span> (= <span class=\"ar\">يَتَكَوَّنُ مِنْ</span>)." },
    { tr: "<b>عِنْدَمَا</b> “…dığında, …ınca”: iki fiil cümlesini zamanla bağlar: <span class=\"ar\">عِنْدَمَا يَمْرَضُ النَّاسُ يَذْهَبُونَ إِلَى المُسْتَشْفَى</span>. Ardından fiil gelir." }
  ],
  kaide: ["١٠ ـ اقْرَإِ الجُمَلَ الآتِيَةَ، وَلَاحِظِ التَّرَاكِيبَ الَّتِي تَحْتَهَا خَطٌّ، ثُمَّ اكْتُبْ مِثَالًا لِكُلِّ تَرْكِيبٍ: ١. يَشْعُرُ أَحْمَدُ بِتَعَبٍ وَإِرْهَاقٍ شَدِيدٍ. ٢. عَلَيْكَ أَنْ تَشْرَبَ كَثِيرًا مِنْ عَصِيرِ البُرْتُقَالِ.", "٣. يَتَأَلَّفُ كِتَابُ اللُّغَةِ العَرَبِيَّةِ مِنْ قِسْمَيْنِ: (القِرَاءَةِ وَالكِتَابَةِ). ٤. عِنْدَمَا يَمْرَضُ النَّاسُ يَذْهَبُونَ إِلَى المُسْتَشْفَى."],
  ex: [
    { type: "pick", fill: true, num: "١٠", ar: "لَاحِظِ التَّرَاكِيبَ الَّتِي تَحْتَهَا خَطٌّ، ثُمَّ اكْتُبْ مِثَالًا لِكُلِّ تَرْكِيبٍ", tr: "Boşluğa kalıba uyan doğru biçimi seç; sonra defterine her kalıp için bir örnek yaz.", items: PL([
      ["يَشْعُرُ أَحْمَدُ ___ وَإِرْهَاقٍ شَدِيدٍ.", "بِتَعَبٍ", "تَعَبًا", "مِنْ تَعَبٍ", "Ahmed şiddetli yorgunluk ve bitkinlik hisseder.", "يَشْعُرُ + بِـ + mecrûr."],
      ["أَشْعُرُ ___ فِي بَطْنِي.", "بِأَلَمٍ", "أَلَمًا", "عَلَى أَلَمٍ", "Karnımda ağrı hissediyorum.", ""],
      ["___ أَنْ تَشْرَبَ كَثِيرًا مِنْ عَصِيرِ البُرْتُقَالِ.", "عَلَيْكَ", "لَكَ", "مِنْكَ", "Bol portakal suyu içmelisin.", "Zorunluluk: عَلَيْكَ أَنْ."],
      ["عَلَيْكَ أَنْ ___ كَثِيرًا.", "تَرْتَاحَ", "تَرْتَاحُ", "رَاحَةٌ", "Çok dinlenmelisin.", "أَنْ’den sonra muzâri mansûb."],
      ["تَشْرَبُ كَثِيرًا ___ العَصِيرِ.", "مِنَ", "فِي", "عَلَى", "Bol meyve suyu içersin.", "كَثِيرًا مِنْ"],
      ["يَتَأَلَّفُ كِتَابُ اللُّغَةِ العَرَبِيَّةِ ___ قِسْمَيْنِ.", "مِنْ", "عَلَى", "إِلَى", "Arapça kitabı iki bölümden oluşur.", "يَتَأَلَّفُ مِنْ = يَتَكَوَّنُ مِنْ"],
      ["___ يَمْرَضُ النَّاسُ يَذْهَبُونَ إِلَى المُسْتَشْفَى.", "عِنْدَمَا", "لِأَنَّ", "لَكِنْ", "İnsanlar hastalandığında hastaneye gider.", "Zaman → عِنْدَمَا + fiil."],
      ["عِنْدَمَا ___ خَالِدٌ اتَّصَلَتْ أُمُّهُ بِالمُسْتَشْفَى.", "مَرِضَ", "مَرِيضٌ", "المَرَضُ", "Hâlid hastalanınca annesi hastaneyi aradı.", "عِنْدَمَا’dan sonra fiil gelir."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "أَكْمِلْ بِالضَّمِيرِ المُنَاسِبِ", tr: "Kişiye uygun biçimi seç (يَشْعُرُ ve عَلَى + zamir).", items: PL([
      ["أَنَا ___ بِصُدَاعٍ.", "أَشْعُرُ", "يَشْعُرُ", "تَشْعُرُ", "Ben baş ağrısı hissediyorum.", "أَنَا → أَ"],
      ["هِيَ ___ بِتَعَبٍ.", "تَشْعُرُ", "يَشْعُرُ", "أَشْعُرُ", "O (kadın) yorgunluk hissediyor.", "هِيَ → تَـ"],
      ["___ أَنْ أَرْتَاحَ.", "عَلَيَّ", "عَلَيْكَ", "عَلَيْهِ", "Dinlenmeliyim.", "أَرْتَاحَ (ben) → عَلَيَّ"],
      ["___ أَنْ يَشْرَبَ العَصِيرَ.", "عَلَيْهِ", "عَلَيْهَا", "عَلَيَّ", "O (erkek) meyve suyu içmeli.", "يَشْرَبَ (o, e.) → عَلَيْهِ"],
      ["عَلَيْهَا أَنْ ___ الدَّوَاءَ بِانْتِظَامٍ.", "تَتَنَاوَلَ", "يَتَنَاوَلَ", "أَتَنَاوَلَ", "O (kadın) ilacı düzenli almalı.", "عَلَيْهَا → تَـ"]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["اسْتَيْقَظَتِ الأُمُّ {مُبَكِّرًا} وَأَعَدَّتِ الطَّعَامَ.", ["مُبَكِّرًا", "مُتَأَخِّرًا", "مَرِيضَةً"], "metin", "Anne erkenden kalktı.", "u1"],
  ["كَانَ خَالِدٌ يَشْعُرُ بِ{صُدَاعٍ} شَدِيدٍ.", ["صُدَاعٍ", "سُرُورٍ", "جُوعٍ"], "metin", "Şiddetli baş ağrısı hissediyordu.", "u1"],
  ["فَاتَّصَلَتْ أُمُّهُ بِ{المُسْتَشْفَى}.", ["المُسْتَشْفَى", "المَدْرَسَةِ", "السُّوقِ"], "metin", "Annesi hastaneyi aradı.", "u1"],
  ["جَاءَتْ سَيَّارَةُ {الإِسْعَافِ} بَعْدَ خَمْسِ دَقَائِقَ.", ["الإِسْعَافِ", "الأُجْرَةِ", "الشُّرْطَةِ"], "metin", "Ambulans beş dakika sonra geldi.", "u1"],
  ["قَاسَ دَرَجَةَ حَرَارَتِهِ بِ{مِقْيَاسِ} الحَرَارَةِ.", ["مِقْيَاسِ", "مِفْتَاحِ", "مِقَصِّ"], "metin", "Termometreyle ateşini ölçtü.", "u1"],
  ["فَحَصَ صَدْرَهُ وَقَلْبَهُ بِ{السَّمَّاعَةِ}.", ["السَّمَّاعَةِ", "المِلْعَقَةِ", "المِظَلَّةِ"], "metin", "Göğsünü ve kalbini steteskopla dinledi.", "u1"],
  ["عِنْدَكَ أَعْرَاضُ {زُكَامٍ} شَدِيدٍ.", ["زُكَامٍ", "فَرَحٍ", "جُوعٍ"], "metin", "Sende şiddetli nezle belirtileri var.", "u1"],
  ["كَتَبَ الطَّبِيبُ لِخَالِدٍ {وَصْفَةَ} العِلَاجِ.", ["وَصْفَةَ", "رِسَالَةَ", "قِصَّةَ"], "metin", "Doktor reçete yazdı.", "u1"],
  ["وَأَنْ تَتَنَاوَلَ العِلَاجَ {بِانْتِظَامٍ}.", ["بِانْتِظَامٍ", "بِسُرْعَةٍ", "أَحْيَانًا"], "anlama", "İlacı düzenli almalısın.", "u2"],
  ["ذَهَبَا إِلَى {الصَّيْدَلِيَّةِ} وَاشْتَرَيَا الدَّوَاءَ.", ["الصَّيْدَلِيَّةِ", "المَكْتَبَةِ", "المَطْعَمِ"], "anlama", "Eczaneye gidip ilacı aldılar.", "u2"],
  ["صَلَّتْ رَكْعَتَيْنِ صَلَاةَ {الشُّكْرِ}.", ["الشُّكْرِ", "الفَجْرِ", "الجُمُعَةِ"], "anlama", "İki rekât şükür namazı kıldı.", "u2"],
  ["بَعْدَ ثَلَاثَةِ أَيَّامٍ {تَحَسَّنَتْ} حَالَةُ خَالِدٍ.", ["تَحَسَّنَتْ", "سَاءَتْ", "تَغَيَّرَتْ"], "anlama", "Üç gün sonra durumu düzeldi.", "u2"],
  ["تَعَبٌ = {إِرْهَاقٌ}.", ["إِرْهَاقٌ", "عِلَاجٌ", "صُدَاعٌ"], "eş anlam", "Yorgunluk = bitkinlik.", "u3"],
  ["دَوَاءٌ = {عِلَاجٌ}.", ["عِلَاجٌ", "عَلَامَةٌ", "مَرَضٌ"], "eş anlam", "İlaç = tedavi.", "u3"],
  ["مَرِيضٌ ← {مَرْضَى}.", ["مَرْضَى", "مُرَضَاءُ", "مَرَائِضُ"], "çoğul", "Hasta → hastalar.", "u3"],
  ["طَبِيبٌ ← {أَطِبَّاءُ}.", ["أَطِبَّاءُ", "طُبُوبٌ", "طَبَائِبُ"], "çoğul", "Doktor → doktorlar.", "u3"],
  ["مُرْتَفِعَةٌ ≠ {مُنْخَفِضَةٌ}.", ["مُنْخَفِضَةٌ", "عَالِيَةٌ", "كَبِيرَةٌ"], "zıt", "Yüksek ≠ düşük.", "u3"],
  ["الصَّيْدَلَانِيَّةُ {تَبِيعُ} الدَّوَاءَ.", ["تَبِيعُ", "يَفْحَصُ", "تَكْتُبُ"], "kim ne yapar", "Eczacı ilaç satar.", "u4"],
  ["المُمَرِّضُ {يُسَاعِدُ} الطَّبِيبَ.", ["يُسَاعِدُ", "يَبِيعُ", "يَشْتَرِي"], "kim ne yapar", "Hemşire doktora yardım eder.", "u4"],
  ["نَقُولُ «أَرْجُو لَكَ الشِّفَاءَ» لِلشَّخْصِ {المَرِيضِ}.", ["المَرِيضِ", "المُسَافِرِ", "السَّلِيمِ"], "seçim", "Hasta kişiye şifa dileriz.", "u4"],
  ["يَشْعُرُ أَحْمَدُ {بِتَعَبٍ} شَدِيدٍ.", ["بِتَعَبٍ", "تَعَبًا", "تَعَبٌ"], "kalıp", "Ahmed şiddetli yorgunluk hissediyor.", "u5"],
  ["عَلَيْكَ أَنْ {تَرْتَاحَ} كَثِيرًا.", ["تَرْتَاحَ", "تَرْتَاحُ", "رَاحَةٌ"], "kalıp", "Çok dinlenmelisin.", "u5"],
  ["يَتَأَلَّفُ الكِتَابُ {مِنْ} قِسْمَيْنِ.", ["مِنْ", "إِلَى", "عَلَى"], "kalıp", "Kitap iki bölümden oluşur.", "u5"],
  ["{عِنْدَمَا} يَمْرَضُ النَّاسُ يَذْهَبُونَ إِلَى المُسْتَشْفَى.", ["عِنْدَمَا", "لِأَنَّ", "لَكِنْ"], "kalıp", "İnsanlar hastalanınca hastaneye gider.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["ذَهَبَ خَالِدٌ إِلَى المَدْرَسَةِ ← metne göre düzelt", "لَمْ يَذْهَبْ خَالِدٌ إِلَى المَدْرَسَةِ لِأَنَّهُ كَانَ مَرِيضًا", "ذَهَبَ خَالِدٌ إِلَى المَدْرَسَةِ مُبَكِّرًا", "ذَهَبَ خَالِدٌ إِلَى السُّوقِ", "Hâlid hastaydı.", "u1"],
  ["جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ سَاعَةٍ ← düzelt", "جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ خَمْسِ دَقَائِقَ", "جَاءَتْ سَيَّارَةُ الإِسْعَافِ بَعْدَ يَوْمٍ", "لَمْ تَأْتِ سَيَّارَةُ الإِسْعَافِ", "Beş dakika.", "u1"],
  ["يَتَنَاوَلُ العِلَاجَ لِأُسْبُوعٍ ← metne göre düzelt", "يَتَنَاوَلُ العِلَاجَ بِانْتِظَامٍ لِثَلَاثَةِ أَيَّامٍ", "يَتَنَاوَلُ العِلَاجَ لِشَهْرٍ", "يَتَنَاوَلُ العِلَاجَ مَرَّةً وَاحِدَةً", "Üç gün.", "u2"],
  ["تَعَبٌ ← eş anlam", "إِرْهَاقٌ", "رَاحَةٌ", "صُدَاعٌ", "yorgunluk = bitkinlik", "u3"],
  ["عَرَضٌ ← eş anlam", "عَلَامَةٌ", "عِلَاجٌ", "دَوَاءٌ", "belirti = işaret", "u3"],
  ["تَحَسَّنَ ← eş anlam", "تَعَافَى", "مَرِضَ", "تَعِبَ", "düzeldi = iyileşti", "u3"],
  ["نَصِيحَةٌ ← çoğul", "نَصَائِحُ", "نَصِيحَاتٌ", "أَنْصَاحٌ", "öğüt → öğütler", "u3"],
  ["السَّلِيمُ ← zıt anlam", "المَرِيضُ", "الصَّحِيحُ", "القَوِيُّ", "sağlam ≠ hasta", "u3"],
  ["كَامِلٌ ← zıt anlam", "نَاقِصٌ", "تَامٌّ", "كَبِيرٌ", "tam ≠ eksik", "u3"],
  ["الطَّبِيبُ ← ne yapar?", "يَفْحَصُ المَرِيضَ", "يَبِيعُ الدَّوَاءَ", "يُشَاهِدُ التِّلْفَازَ", "Doktor muayene eder.", "u4"],
  ["أَشْعُرُ + صُدَاعٌ ← kalıp", "أَشْعُرُ بِصُدَاعٍ", "أَشْعُرُ صُدَاعًا", "أَشْعُرُ مِنْ صُدَاعٍ", "يَشْعُرُ بِـ", "u5"],
  ["تَرْتَاحُ ← عَلَيْكَ أَنْ", "عَلَيْكَ أَنْ تَرْتَاحَ", "عَلَيْكَ أَنْ تَرْتَاحُ", "عَلَيْكَ تَرْتَاحَ", "أَنْ + mansûb", "u5"],
  ["هُوَ يَشْرَبُ ← عَلَى + zamir", "عَلَيْهِ أَنْ يَشْرَبَ", "عَلَيْهَا أَنْ يَشْرَبَ", "عَلَيْكَ أَنْ يَشْرَبُ", "O (e.) → عَلَيْهِ", "u5"],
  ["يَمْرَضُ / يَذْهَبُ إِلَى الطَّبِيبِ ← عِنْدَمَا", "عِنْدَمَا يَمْرَضُ يَذْهَبُ إِلَى الطَّبِيبِ", "لِأَنَّ يَمْرَضُ يَذْهَبُ إِلَى الطَّبِيبِ", "يَمْرَضُ عِنْدَمَا الطَّبِيبِ", "Zaman bağlacı.", "u5"]
];
// Kim yapar? hız oyunu
var NOUN_LIST = [
  ["يَفْحَصُ المَرِيضَ", "tb", "Doktor."], ["يَكْتُبُ الوَصْفَةَ", "tb", "Doktor."], ["يَقِيسُ الضَّغْطَ", "tb", "Doktor."], ["يَنْصَحُ المَرِيضَ", "tb", "Doktor."], ["يَقِيسُ الحَرَارَةَ بِالمِقْيَاسِ", "tb", "Doktor (hemşire de ölçebilir)."], ["يَفْحَصُ الصَّدْرَ بِالسَّمَّاعَةِ", "tb", "Doktor."],
  ["يُسَاعِدُ الطَّبِيبَ", "mm", "Hemşire."], ["يَحْمِلُ المَرِيضَ إِلَى سَيَّارَةِ الإِسْعَافِ", "mm", "Hemşire / hastabakıcı."], ["يُعْطِي المَرِيضَ الحُقْنَةَ", "mm", "Hemşire (iğne yapar)."],
  ["يَبِيعُ الدَّوَاءَ", "sy", "Eczacı."], ["يَقْرَأُ الوَصْفَةَ وَيُعْطِي الدَّوَاءَ", "sy", "Eczacı."], ["يَعْمَلُ فِي الصَّيْدَلِيَّةِ", "sy", "Eczacı."],
  ["يَشْعُرُ بِصُدَاعٍ", "mr", "Hasta."], ["يَتَنَاوَلُ الدَّوَاءَ بِانْتِظَامٍ", "mr", "Hasta."], ["يَشْتَرِي الدَّوَاءَ", "mr", "Hasta."], ["يُرَاجِعُ الطَّبِيبَ", "mr", "Hasta."], ["يَتَأَلَّمُ", "mr", "Hasta."], ["يَحْتَاجُ إِلَى الرَّاحَةِ", "mr", "Hasta."]
];
var SP_M = KIM;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  es: { name: "Kelime ↔ eş / zıt", pairs: [["تَعَبٌ", "إِرْهَاقٌ"], ["دَوَاءٌ", "عِلَاجٌ"], ["صُدَاعٌ", "أَلَمُ الرَّأْسِ"], ["تَحَسَّنَ", "تَعَافَى"], ["عَرَضٌ", "عَلَامَةٌ"], ["مُرْتَفِعَةٌ", "مُنْخَفِضَةٌ"], ["كَامِلٌ", "نَاقِصٌ"], ["سَلِيمٌ", "مَرِيضٌ"]] },
  cm: { name: "Tekil ↔ çoğul", pairs: [["مَرِيضٌ", "مَرْضَى"], ["طَبِيبٌ", "أَطِبَّاءُ"], ["مُمَرِّضَةٌ", "مُمَرِّضَاتٌ"], ["وَصْفَةٌ", "وَصَفَاتٌ"], ["نَصِيحَةٌ", "نَصَائِحُ"], ["صَيْدَلِيَّةٌ", "صَيْدَلِيَّاتٌ"], ["سَيَّارَةٌ", "سَيَّارَاتٌ"]] },
  km: { name: "Kim / ne ↔ ne yapar", pairs: [["الطَّبِيبُ", "يَفْحَصُ المَرِيضَ"], ["المُمَرِّضُ", "يُسَاعِدُ الطَّبِيبَ"], ["الصَّيْدَلَانِيَّةُ", "تَبِيعُ الدَّوَاءَ"], ["الدَّوَاءُ", "يُعَالِجُ المَرَضَ"], ["سَيَّارَةُ الإِسْعَافِ", "تَنْقُلُ المَرْضَى"], ["مِقْيَاسُ الحَرَارَةِ", "يَقِيسُ الحَرَارَةَ"], ["السَّمَّاعَةُ", "يَفْحَصُ الصَّدْرَ"]] }
};
var KARTLAR = [
  ["Hâlid’in belirtileri?", "صُدَاعٌ شَدِيدٌ · ارْتِفَاعٌ فِي دَرَجَةِ الحَرَارَةِ · أَلَمٌ فِي البَطْنِ"],
  ["Annesi ne yaptı?", "اتَّصَلَتْ بِالمُسْتَشْفَى وَطَلَبَتْ سَيَّارَةَ الإِسْعَافِ"],
  ["Doktor neleri yaptı?", "فَحَصَهُ · قَاسَ الحَرَارَةَ بِمِقْيَاسِ الحَرَارَةِ · قَاسَ الضَّغْطَ · فَحَصَ الصَّدْرَ وَالقَلْبَ بِالسَّمَّاعَةِ · كَتَبَ الوَصْفَةَ"],
  ["Teşhis ve sebep?", "أَعْرَاضُ زُكَامٍ شَدِيدٍ · خَرَجَ فِي البَرْدِ أَوِ انْتَقَلَتْ إِلَيْهِ عَدْوَى مِنْ صَدِيقِهِ"],
  ["Doktorun tavsiyeleri?", "يَشْرَبُ كَثِيرًا مِنْ عَصِيرِ البُرْتُقَالِ وَاللَّيْمُونِ · يَرْتَاحُ كَثِيرًا · يَتَنَاوَلُ العِلَاجَ بِانْتِظَامٍ لِثَلَاثَةِ أَيَّامٍ"],
  ["Hikâye nasıl bitiyor?", "اشْتَرَيَا الدَّوَاءَ · صَلَّتِ الأُمُّ صَلَاةَ الشُّكْرِ · بَعْدَ ثَلَاثَةِ أَيَّامٍ تَعَافَى خَالِدٌ"],
  ["Eş anlamlar?", "تَعَبٌ = إِرْهَاقٌ · دَوَاءٌ = عِلَاجٌ · صُدَاعٌ = أَلَمُ الرَّأْسِ · تَحَسَّنَ = تَعَافَى · يُعِدُّ = يُحَضِّرُ · عَرَضٌ = عَلَامَةٌ"],
  ["Çoğullar?", "مَرْضَى · أَطِبَّاءُ · مُمَرِّضَاتٌ · سَيَّارَاتٌ · وَصَفَاتٌ · نَصَائِحُ · صَيْدَلِيَّاتٌ"],
  ["Zıt anlamlar?", "صَغِيرَةٌ ≠ كَبِيرَةٌ · قَرِيبَةٌ ≠ بَعِيدَةٌ · السَّلِيمُ ≠ المَرِيضُ · يَبِيعُ ≠ يَشْتَرِي · مُرْتَفِعَةٌ ≠ مُنْخَفِضَةٌ · كَامِلٌ ≠ نَاقِصٌ"],
  ["Kim ne yapar?", "الطَّبِيبُ يَفْحَصُ وَيَنْصَحُ · المُمَرِّضُ يُسَاعِدُ · الصَّيْدَلَانِيَّةُ تَبِيعُ الدَّوَاءَ · الدَّوَاءُ يُعَالِجُ المَرَضَ"],
  ["يَشْعُرُ بِـ / عَلَيْكَ أَنْ?", "أَشْعُرُ بِصُدَاعٍ (…hissediyorum) · عَلَيْكَ أَنْ تَرْتَاحَ (…melisin; fiil mansûb)"],
  ["يَتَأَلَّفُ مِنْ / عِنْدَمَا?", "يَتَأَلَّفُ الكِتَابُ مِنْ قِسْمَيْنِ (…den oluşur) · عِنْدَمَا يَمْرَضُ… (…ınca)"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat11";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("مَرِيضٌ", "i", "hasta", "مَرْضَى", "fella", "", "سَلِيمٌ", "لَكِنَّ «خَالِدًا» كَانَ مَرِيضًا.", "مَرِيضًا", "Ama Hâlid hastaydı."),
  KW("طَبِيبٌ", "i", "doktor", "أَطِبَّاءُ", "efila", "", "", "فَحَصَ الطَّبِيبُ «خَالِدًا» أَوَّلًا.", "الطَّبِيبُ", "Doktor önce Hâlid’i muayene etti."),
  KW("مُمَرِّضٌ", "i", "hemşire, hastabakıcı", "مُمَرِّضُونَ", "un", "", "", "حَمَلَ المُمَرِّضُونَ «خَالِدًا».", "المُمَرِّضُونَ", "Hastabakıcılar Hâlid’i taşıdı."),
  KW("صَيْدَلِيَّةٌ", "i", "eczane", "صَيْدَلِيَّاتٌ", "at", "", "", "ثُمَّ ذَهَبَا إِلَى الصَّيْدَلِيَّةِ.", "الصَّيْدَلِيَّةِ", "Sonra eczaneye gittiler."),
  KW("مُسْتَشْفًى", "i", "hastane", "مُسْتَشْفَيَاتٌ", "at", "", "", "فَاتَّصَلَتْ أُمُّهُ بِالمُسْتَشْفَى.", "بِالمُسْتَشْفَى", "Annesi hastaneyi aradı."),
  KW("صُدَاعٌ", "i", "baş ağrısı", "", "", "أَلَمُ الرَّأْسِ", "", "وَكَانَ يَشْعُرُ بِصُدَاعٍ شَدِيدٍ.", "بِصُدَاعٍ", "Şiddetli baş ağrısı hissediyordu."),
  KW("أَلَمٌ", "i", "ağrı, acı", "آلَامٌ", "efal", "وَجَعٌ", "", "وَبِأَلَمٍ فِي بَطْنِهِ.", "وَبِأَلَمٍ", "Ve karnında ağrı."),
  KW("بَطْنٌ", "i", "karın", "بُطُونٌ", "fuul", "", "ظَهْرٌ", "وَبِأَلَمٍ فِي بَطْنِهِ.", "بَطْنِهِ", "Karnında ağrı."),
  KW("صَدْرٌ", "i", "göğüs", "صُدُورٌ", "fuul", "", "", "ثُمَّ فَحَصَ صَدْرَهُ وَقَلْبَهُ.", "صَدْرَهُ", "Sonra göğsünü ve kalbini muayene etti."),
  KW("قَلْبٌ", "i", "kalp", "قُلُوبٌ", "fuul", "", "", "ثُمَّ فَحَصَ صَدْرَهُ وَقَلْبَهُ.", "وَقَلْبَهُ", "Göğsünü ve kalbini."),
  KW("جِسْمٌ", "i", "vücut, beden", "أَجْسَامٌ", "efal", "بَدَنٌ", "", "العَقْلُ السَّلِيمُ فِي الجِسْمِ السَّلِيمِ.", "الجِسْمِ", "Sağlam kafa sağlam vücutta."),
  KW("زُكَامٌ", "i", "nezle", "", "", "", "", "عِنْدَكَ أَعْرَاضُ زُكَامٍ شَدِيدٍ.", "زُكَامٍ", "Sende şiddetli nezle belirtileri var."),
  KW("عَرَضٌ", "i", "belirti", "أَعْرَاضٌ", "efal", "عَلَامَةٌ", "", "عِنْدَكَ أَعْرَاضُ زُكَامٍ شَدِيدٍ.", "أَعْرَاضُ", "Sende şiddetli nezle belirtileri var."),
  KW("عَدْوَى", "i", "bulaşma, enfeksiyon", "", "", "", "", "أَوِ انْتَقَلَتْ عَدْوَى إِلَيْكَ مِنْ شَخْصٍ مَرِيضٍ.", "عَدْوَى", "Ya da hasta birinden sana mikrop bulaştı."),
  KW("دَوَاءٌ", "i", "ilaç", "أَدْوِيَةٌ", "efile", "عِلَاجٌ", "دَاءٌ", "وَاشْتَرَيَا الدَّوَاءَ.", "الدَّوَاءَ", "İlacı satın aldılar."),
  KW("عِلَاجٌ", "i", "tedavi, ilaç", "", "", "دَوَاءٌ", "", "كَتَبَ الطَّبِيبُ لِخَالِدٍ وَصْفَةَ العِلَاجِ.", "العِلَاجِ", "Doktor Hâlid’e ilaç reçetesi yazdı."),
  KW("وَصْفَةٌ", "i", "reçete", "وَصَفَاتٌ", "at", "", "", "كَتَبَ الطَّبِيبُ لِخَالِدٍ وَصْفَةَ العِلَاجِ.", "وَصْفَةَ", "Doktor reçete yazdı."),
  KW("نَصِيحَةٌ", "i", "öğüt, tavsiye", "نَصَائِحُ", "feail", "", "", "وَنَصَحَهُ بَعْضَ النَّصَائِحِ.", "النَّصَائِحِ", "Ona bazı öğütler verdi."),
  KW("سَيَّارَةٌ", "i", "araba", "سَيَّارَاتٌ", "at", "", "", "وَطَلَبَتْ سَيَّارَةَ الإِسْعَافِ.", "سَيَّارَةَ", "Ambulans istedi."),
  KW("مِقْيَاسٌ", "i", "ölçü aleti", "مَقَايِيسُ", "mefail_y", "", "", "قَاسَ دَرَجَةَ حَرَارَتِهِ بِمِقْيَاسِ الحَرَارَةِ.", "بِمِقْيَاسِ", "Termometreyle ateşini ölçtü."),
  KW("سَمَّاعَةٌ", "i", "steteskop; kulaklık", "سَمَّاعَاتٌ", "at", "", "", "فَحَصَ صَدْرَهُ وَقَلْبَهُ بِالسَّمَّاعَةِ.", "بِالسَّمَّاعَةِ", "Steteskopla göğsünü ve kalbini dinledi."),
  KW("مَوْعِدٌ", "i", "randevu", "مَوَاعِيدُ", "mefail_y", "", "", "ثُمَّ ذَهَبَ إِلَى مَوْعِدِهِ مَعَ الطَّبِيبِ.", "مَوْعِدِهِ", "Sonra doktorla randevusuna gitti."),
  KW("تَعَبٌ", "i", "yorgunluk", "", "", "إِرْهَاقٌ", "رَاحَةٌ", "يَشْعُرُ أَحْمَدُ بِتَعَبٍ وَإِرْهَاقٍ شَدِيدٍ.", "بِتَعَبٍ", "Ahmed şiddetli yorgunluk ve bitkinlik hisseder."),
  KW("سَلِيمٌ", "s", "sağlam, sağlıklı", "", "", "صَحِيحٌ", "مَرِيضٌ", "العَقْلُ السَّلِيمُ فِي الجِسْمِ السَّلِيمِ.", "السَّلِيمُ", "Sağlam kafa sağlam vücutta."),
  KW("شَدِيدٌ", "s", "şiddetli", "أَشِدَّاءُ", "efila", "قَوِيٌّ", "خَفِيفٌ", "وَكَانَ يَشْعُرُ بِصُدَاعٍ شَدِيدٍ.", "شَدِيدٍ", "Şiddetli baş ağrısı hissediyordu."),
  KW("مُصَابٌ", "s", "(hastalığa) yakalanmış", "", "", "", "سَلِيمٌ", "صَدِيقَهُ الَّذِي يَجْلِسُ بِجَانِبِهِ… مُصَابٌ بِالزُّكَامِ.", "مُصَابٌ", "Yanında oturan arkadaşı nezle."),
  KW("مُرْتَفِعٌ", "s", "yüksek", "", "", "عَالٍ", "مُنْخَفِضٌ", "قَاسَ الطَّبِيبُ دَرَجَةَ الحَرَارَةِ، فَكَانَتْ مُرْتَفِعَةً جِدًّا.", "مُرْتَفِعَةً", "Ateş çok yüksekti."),
  KW("كَامِلٌ", "s", "tam, eksiksiz", "", "", "تَامٌّ", "نَاقِصٌ", "فَحَصَ الطَّبِيبُ خَالِدًا فَحْصًا كَامِلًا.", "كَامِلًا", "Doktor Hâlid’i tam olarak muayene etti."),
  KW("فَحَصَ", "f", "muayene etti", "", "", "", "", "فَحَصَ الطَّبِيبُ «خَالِدًا» أَوَّلًا.", "فَحَصَ", "Doktor önce Hâlid’i muayene etti."),
  KW("قَاسَ", "f", "ölçtü", "", "", "", "", "ثُمَّ قَاسَ دَرَجَةَ حَرَارَتِهِ.", "قَاسَ", "Sonra ateşini ölçtü."),
  KW("شَعَرَ", "f", "hissetti", "", "", "أَحَسَّ", "", "وَكَانَ يَشْعُرُ بِصُدَاعٍ شَدِيدٍ.", "يَشْعُرُ", "Şiddetli baş ağrısı hissediyordu."),
  KW("نَصَحَ", "f", "öğüt verdi, tavsiye etti", "", "", "", "", "وَنَصَحَهُ بَعْضَ النَّصَائِحِ.", "وَنَصَحَهُ", "Ona bazı öğütler verdi."),
  KW("نَقَلَ", "f", "taşıdı, götürdü", "", "", "", "", "وَنَقَلُوهُ إِلَى المُسْتَشْفَى.", "وَنَقَلُوهُ", "Onu hastaneye götürdüler."),
  KW("تَحَسَّنَ", "f", "düzeldi, iyileşti", "", "", "تَعَافَى", "سَاءَ", "بَعْدَ ثَلَاثَةِ أَيَّامٍ تَحَسَّنَتْ حَالَةُ خَالِدٍ كَثِيرًا.", "تَحَسَّنَتْ", "Üç gün sonra Hâlid’in durumu çok düzeldi."),
  KW("تَعَافَى", "f", "iyileşti, şifa buldu", "", "", "تَحَسَّنَ", "مَرِضَ", "وَأَخْبَرَهُ بِأَنَّهُ تَعَافَى.", "تَعَافَى", "İyileştiğini söyledi."),
  KW("رَاجَعَ", "f", "(doktora) tekrar başvurdu", "", "", "", "", "ثُمَّ تُرَاجِعَنِي بَعْدَ ذَلِكَ.", "تُرَاجِعَنِي", "Sonra bana tekrar gel."),
  KW("عَالَجَ", "f", "tedavi etti", "", "", "دَاوَى", "", "الدَّوَاءُ يُعَالِجُ المَرَضَ.", "يُعَالِجُ", "İlaç hastalığı tedavi eder."),
  KW("تَأَلَّفَ", "f", "oluştu (مِنْ ile)", "", "", "تَكَوَّنَ", "", "يَتَأَلَّفُ كِتَابُ اللُّغَةِ العَرَبِيَّةِ مِنْ قِسْمَيْنِ.", "يَتَأَلَّفُ", "Arapça kitabı iki bölümden oluşur.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","بُطُونٌ، قُلُوبٌ"],"efal":["أَفْعَالٌ","ef’âl","أَعْرَاضٌ، آلَامٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَدْوِيَةٌ، أَحْذِيَةٌ"],"fella":["فَعْلَى","fe’lâ","مَرْضَى، جَرْحَى"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَطِبَّاءُ، أَشِدَّاءُ"],"feail":["فَعَائِلُ","feâil","نَصَائِحُ، رَسَائِلُ"],"mefail_y":["مَفَاعِيلُ","mefâîl","مَقَايِيسُ، مَوَاعِيدُ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","مُمَرِّضُونَ، فَلَّاحُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","صَيْدَلِيَّاتٌ، وَصَفَاتٌ"],"diger":["…","başka kalıplar","أَشْيَاءُ"]};
