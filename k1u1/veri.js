// ================= VERİ: el-Arabiyyetü beyne yedeyk 1, 1. ünite — التَّحِيَّةُ وَالتَّعارُفُ =================
// Ses: bütün ders kayıtları tek dosyada (ses.mp3) arka arkaya; parçaların yeri zaman.js içindeki ZAMAN tablosundadır.

// ---------------- DİYALOGLAR ----------------
// satır: [konuşan, Arapça, Türkçe, okunuş]; ses parçası kimliği: <id>-<satır no>
var DIYALOG = [
  { id: "d1a", ders: 1, ad: "الحِوارُ الأَوَّلُ (أ)", tr: "Birinci diyalog (a): Selamlaşma ve isim sorma", resim: "d1a", kisiler: ["خالِد", "خَليل"], satir: [
    [0, "السَّلامُ عَلَيْكُمْ.", "Selam üzerinize olsun.", "es-selâmu aleykum"],
    [1, "وَعَلَيْكُمُ السَّلامُ.", "Selam sizin de üzerinize olsun.", "ve aleykumu’s-selâm"],
    [0, "اِسْمي خالِد، ما اسْمُكَ؟", "Benim adım Hâlid. Senin adın ne?", "ismî Hâlid, me’smuke?"],
    [1, "اِسْمي خَليل.", "Benim adım Halîl.", "ismî Halîl"],
    [0, "كَيْفَ حالُكَ؟", "Nasılsın?", "keyfe hâluke?"],
    [1, "بِخَيْرٍ، وَالحَمْدُ لِلّهِ. وَكَيْفَ حالُكَ أَنْتَ؟", "İyiyim, Allah’a hamd olsun. Ya sen nasılsın?", "bi-hayr, ve’l-hamdu lillâh. ve keyfe hâluke ente?"],
    [0, "بِخَيْرٍ، وَالحَمْدُ لِلّهِ.", "İyiyim, Allah’a hamd olsun.", "bi-hayr, ve’l-hamdu lillâh"]
  ] },
  { id: "d1b", ders: 1, ad: "الحِوارُ الأَوَّلُ (ب)", tr: "Birinci diyalog (b): Kadınlar arasında", resim: "d1b", kisiler: ["خَوْلَة", "خَديجَة"], satir: [
    [0, "السَّلامُ عَلَيْكُمْ.", "Selam üzerinize olsun.", "es-selâmu aleykum"],
    [1, "وَعَلَيْكُمُ السَّلامُ.", "Selam sizin de üzerinize olsun.", "ve aleykumu’s-selâm"],
    [0, "اِسْمي خَوْلَة، ما اسْمُكِ؟", "Benim adım Havle. Senin adın ne? (kadına)", "ismî Havle, me’smuki?"],
    [1, "اِسْمي خَديجَة.", "Benim adım Hadîce.", "ismî Hadîce"],
    [0, "كَيْفَ حالُكِ؟", "Nasılsın? (kadına)", "keyfe hâluki?"],
    [1, "بِخَيْرٍ، وَالحَمْدُ لِلّهِ. وَكَيْفَ حالُكِ أَنْتِ؟", "İyiyim, Allah’a hamd olsun. Ya sen nasılsın?", "bi-hayr, ve’l-hamdu lillâh. ve keyfe hâluki enti?"],
    [0, "بِخَيْرٍ، وَالحَمْدُ لِلّهِ.", "İyiyim, Allah’a hamd olsun.", "bi-hayr, ve’l-hamdu lillâh"]
  ] },
  { id: "d2a", ders: 2, ad: "الحِوارُ الثّاني (أ)", tr: "İkinci diyalog (a): Nerelisin?", resim: "d2a", kisiler: ["مُحَمَّد", "شَريف"], satir: [
    [0, "السَّلامُ عَلَيْكُمْ.", "Selam üzerinize olsun.", "es-selâmu aleykum"],
    [1, "وَعَلَيْكُمُ السَّلامُ.", "Selam sizin de üzerinize olsun.", "ve aleykumu’s-selâm"],
    [0, "مِنْ أَيْنَ أَنْتَ؟", "Nerelisin? (Nereden sen?)", "min eyne ente?"],
    [1, "أَنا مِنْ باكِسْتان.", "Ben Pakistanlıyım (Pakistan’danım).", "ene min Pâkistân"],
    [0, "هَلْ أَنْتَ باكِسْتانِيٌّ؟", "Sen Pakistanlı mısın?", "hel ente pâkistâniyy?"],
    [1, "نَعَمْ، أَنا باكِسْتانِيٌّ. وَما جِنْسِيَّتُكَ أَنْتَ؟", "Evet, ben Pakistanlıyım. Ya senin uyruğun ne?", "na‘am, ene pâkistâniyy. ve mâ cinsiyyetuke ente?"],
    [0, "أَنا تُرْكِيٌّ. أَنا مِنْ تُرْكِيا.", "Ben Türk’üm. Türkiye’denim.", "ene turkiyy. ene min Turkiyâ"],
    [1, "أَهْلًا وَسَهْلًا.", "Hoş geldin, ehlen ve sehlen.", "ehlen ve sehlen"]
  ] },
  { id: "d2b", ders: 2, ad: "الحِوارُ الثّاني (ب)", tr: "İkinci diyalog (b): Kadınlar arasında", resim: "d2b", kisiler: ["مَرْيَم", "زَيْنَب"], satir: [
    [0, "السَّلامُ عَلَيْكُمْ.", "Selam üzerinize olsun.", "es-selâmu aleykum"],
    [1, "وَعَلَيْكُمُ السَّلامُ.", "Selam sizin de üzerinize olsun.", "ve aleykumu’s-selâm"],
    [0, "مِنْ أَيْنَ أَنْتِ؟", "Nerelisin? (kadına)", "min eyne enti?"],
    [1, "أَنا مِنْ مِصْر.", "Ben Mısır’danım.", "ene min Mısr"],
    [0, "هَلْ أَنْتِ مِصْرِيَّةٌ؟", "Sen Mısırlı mısın?", "hel enti mısriyye?"],
    [1, "نَعَمْ، أَنا مِصْرِيَّةٌ. وَما جِنْسِيَّتُكِ أَنْتِ؟", "Evet, ben Mısırlıyım. Ya senin uyruğun ne?", "na‘am, ene mısriyye. ve mâ cinsiyyetuki enti?"],
    [0, "أَنا سورِيَّةٌ. أَنا مِنْ سورِيا.", "Ben Suriyeliyim. Suriye’denim.", "ene sûriyye. ene min Sûriyâ"],
    [1, "أَهْلًا وَسَهْلًا.", "Hoş geldin.", "ehlen ve sehlen"]
  ] },
  { id: "d3a", ders: 3, ad: "الحِوارُ الثّالِثُ (أ)", tr: "Üçüncü diyalog (a): Tanıştırma", resim: "d3a", kisiler: ["أَحْمَد", "بَدْر", "الأَخ"], satir: [
    [0, "السَّلامُ عَلَيْكُمْ.", "Selam üzerinize olsun.", "es-selâmu aleykum"],
    [1, "وَعَلَيْكُمُ السَّلامُ.", "Selam sizin de üzerinize olsun.", "ve aleykumu’s-selâm"],
    [0, "هذا أَخي. هُوَ مُدَرِّسٌ.", "Bu kardeşim. O öğretmen.", "hâzâ ahî. huve muderris"],
    [1, "أَهْلًا وَسَهْلًا.", "Hoş geldiniz.", "ehlen ve sehlen"],
    [0, "هذا صَديقي. هُوَ مُهَنْدِسٌ.", "Bu arkadaşım. O mühendis.", "hâzâ sadîkî. huve muhendis"],
    [2, "أَهْلًا وَسَهْلًا.", "Hoş geldiniz.", "ehlen ve sehlen"],
    [0, "مَعَ السَّلامَةِ.", "Güle güle (esen kal).", "mea’s-selâme"],
    [1, "مَعَ السَّلامَةِ.", "Güle güle.", "mea’s-selâme"]
  ] },
  { id: "d3b", ders: 3, ad: "الحِوارُ الثّالِثُ (ب)", tr: "Üçüncü diyalog (b): Kadınlar arasında", resim: "d3b", kisiler: ["نَدَى", "هُدَى", "الأُخْت"], satir: [
    [0, "السَّلامُ عَلَيْكُمْ.", "Selam üzerinize olsun.", "es-selâmu aleykum"],
    [1, "وَعَلَيْكُمُ السَّلامُ.", "Selam sizin de üzerinize olsun.", "ve aleykumu’s-selâm"],
    [0, "هذِهِ أُخْتي. هِيَ طَبيبَةٌ.", "Bu kız kardeşim. O doktor.", "hâzihî uhtî. hiye tabîbe"],
    [1, "أَهْلًا وَسَهْلًا.", "Hoş geldiniz.", "ehlen ve sehlen"],
    [0, "هذِهِ صَديقَتي. هِيَ طالِبَةٌ.", "Bu arkadaşım (kız). O öğrenci.", "hâzihî sadîkatî. hiye tâlibe"],
    [2, "أَهْلًا وَسَهْلًا.", "Hoş geldiniz.", "ehlen ve sehlen"],
    [0, "مَعَ السَّلامَةِ.", "Güle güle.", "mea’s-selâme"],
    [1, "مَعَ السَّلامَةِ.", "Güle güle.", "mea’s-selâme"]
  ] }
];

// ---------------- KELİMELER ----------------
// [Arapça, Türkçe, okunuş, resim, ders, ses kimliği]
var KELIME = [
  ["كَيْفَ حالُكَ؟", "Nasılsın? (erkeğe)", "keyfe hâluke?", "kayfa_m", 1, "k1-1"],
  ["أَنْتِ", "sen (kadın)", "enti", "anti", 1, "k1-2"],
  ["ما اسْمُكَ؟", "Adın ne? (erkeğe)", "me’smuke?", "ismuka", 1, "k1-3"],
  ["كَيْفَ حالُكِ؟", "Nasılsın? (kadına)", "keyfe hâluki?", "kayfa_f", 1, "k1-4"],
  ["أَنْتَ", "sen (erkek)", "ente", "anta", 1, "k1-5"],
  ["ما اسْمُكِ؟", "Adın ne? (kadına)", "me’smuki?", "ismuki", 1, "k1-6"],
  ["ما جِنْسِيَّتُكَ؟", "Uyruğun ne? (erkeğe)", "mâ cinsiyyetuke?", "cins_m", 2, "k2-1"],
  ["ما جِنْسِيَّتُكِ؟", "Uyruğun ne? (kadına)", "mâ cinsiyyetuki?", "cins_f", 2, "k2-2"],
  ["أَنا", "ben (erkek)", "ene", "ana_m", 2, "k2-3"],
  ["أَنا", "ben (kadın)", "ene", "ana_f", 2, "k2-4"],
  ["باكِسْتان", "Pakistan", "Pâkistân", "h_pak", 2, "k2-5"],
  ["تُرْكِيا", "Türkiye", "Turkiyâ", "h_tur", 2, "k2-6"],
  ["مِصْر", "Mısır", "Mısr", "h_mis", 2, "k2-7"],
  ["سورِيا", "Suriye", "Sûriyâ", "h_sur", 2, "k2-8"],
  ["باكِسْتانِيٌّ", "Pakistanlı (erkek)", "pâkistâniyy", "pakistani", 2, "k2-9"],
  ["تُرْكِيٌّ", "Türk (erkek)", "turkiyy", "turki", 2, "k2-10"],
  ["مِصْرِيَّةٌ", "Mısırlı (kadın)", "mısriyye", "misriya", 2, "k2-11"],
  ["سورِيَّةٌ", "Suriyeli (kadın)", "sûriyye", "suriya_f", 2, "k2-12"],
  ["مُدَرِّسٌ", "öğretmen (erkek)", "muderris", "mudarris", 3, "k3-1"],
  ["طالِبَةٌ", "öğrenci (kız)", "tâlibe", "taliba", 3, "k3-2"],
  ["طَبيبَةٌ", "doktor (kadın)", "tabîbe", "tabiba", 3, "k3-3"],
  ["مُهَنْدِسٌ", "mühendis (erkek)", "muhendis", "muhandis", 3, "k3-4"],
  ["أَخٌ", "erkek kardeş", "ah", "akh", 3, "k3-5"],
  ["أُخْتٌ", "kız kardeş", "uht", "ukht", 3, "k3-6"],
  ["صَديقٌ", "arkadaş (erkek)", "sadîk", "sadiq", 3, "k3-7"],
  ["صَديقَةٌ", "arkadaş (kız)", "sadîka", "sadiqa", 3, "k3-8"],
  ["هذا", "bu (eril)", "hâzâ", "hadha", 3, "k3-9"],
  ["هذِهِ", "bu (dişil)", "hâzihî", "hadhihi", 3, "k3-10"],
  ["هُوَ", "o (erkek)", "huve", "huwa", 3, "k3-11"],
  ["هِيَ", "o (kadın)", "hiye", "hiya", 3, "k3-12"]
];
var SAYI = [["واحِدٌ", "bir", "vâhid", 1], ["اِثْنانِ", "iki", "isnân", 2], ["ثَلاثَةٌ", "üç", "selâse", 3], ["أَرْبَعَةٌ", "dört", "erba‘a", 4], ["خَمْسَةٌ", "beş", "hamse", 5]];
var RAKAM = ["١", "٢", "٣", "٤", "٥"];

// ---------------- KALIPLAR (Ders 5) ----------------
var KALIP_OZET = [
  ["أَنا / أَنْتَ / هُوَ", ["طالِبٌ", "مُدَرِّسٌ", "طَبيبٌ", "مِصْرِيٌّ", "تُرْكِيٌّ", "سورِيٌّ"], "Erkek için kelime ة almaz."],
  ["أَنا / أَنْتِ / هِيَ", ["طالِبَةٌ", "مُدَرِّسَةٌ", "طَبيبَةٌ", "مِصْرِيَّةٌ", "تُرْكِيَّةٌ", "سورِيَّةٌ"], "Kadın için kelimenin sonuna ة (yuvarlak te) gelir."],
  ["مِنْ أَيْنَ أَنْتَ؟ / أَنْتِ؟ / هُوَ؟ / هِيَ؟", ["أَنا مِنْ باكِسْتان.", "هُوَ مِنْ تُرْكِيا.", "هِيَ مِنْ مِصْر."], "مِنْ أَيْنَ = nereden? Cevapta مِنْ + ülke adı."],
  ["هَلْ أَنْتَ …؟ / هَلْ أَنْتِ …؟", ["نَعَمْ، أَنا باكِسْتانِيٌّ.", "نَعَمْ، أَنا تُرْكِيَّةٌ."], "هَلْ = mı / mi? (evet-hayır sorusu). Cevap: نَعَمْ = evet."],
  ["هذا (erkek) / هذِهِ (kadın)", ["هذا أَخي.", "هذا صَديقي.", "هذِهِ أُخْتي.", "هذِهِ صَديقَتي."], "ـي = benim: أَخ → أَخي (kardeşim)."],
  ["اِسْمي …", ["اِسْمي خالِد.", "اِسْمي خَوْلَة."], "اِسْم = isim; اِسْمي = benim adım."]
];
// Tedrîb 1: hel sorusu ve cevabı — [resim, nisbe (eril), dişi mi]
var HEL = [["turki", "تُرْكِيّ", false], ["turkiya", "تُرْكِيّ", true], ["misri", "مِصْرِيّ", false], ["misriya", "مِصْرِيّ", true], ["suri", "سورِيّ", false], ["suriya_f", "سورِيّ", true]];
// Tedrîb 2: tanıştırma cümlesi — [resim, akraba, meslek, dişi mi, doğru cümle]
var TANIT = [
  ["mudarris", "أَخ", "مُدَرِّس", false, "هذا أَخي، هُوَ مُدَرِّسٌ."],
  ["mudarrisa", "أُخْت", "مُدَرِّسَة", true, "هذِهِ أُخْتي، هِيَ مُدَرِّسَةٌ."],
  ["tabib", "صَديق", "طَبيب", false, "هذا صَديقي، هُوَ طَبيبٌ."],
  ["tabiba", "صَديقَة", "طَبيبَة", true, "هذِهِ صَديقَتي، هِيَ طَبيبَةٌ."],
  ["muhandis", "أَخ", "مُهَنْدِس", false, "هذا أَخي، هُوَ مُهَنْدِسٌ."],
  ["taliba", "أُخْت", "طالِبَة", true, "هذِهِ أُخْتي، هِيَ طالِبَةٌ."]
];
// Tedrîb 3: min eyne — [resim, zamir, ülke, soru, cevap] (ilki örnek)
var MINEYNE = [
  ["pakistani", "أَنْتَ", "باكِسْتان", "مِنْ أَيْنَ أَنْتَ؟", "أَنا مِنْ باكِسْتان."],
  ["turkiya", "أَنْتِ", "تُرْكِيا", "مِنْ أَيْنَ أَنْتِ؟", "أَنا مِنْ تُرْكِيا."],
  ["suri", "هُوَ", "سورِيا", "مِنْ أَيْنَ هُوَ؟", "هُوَ مِنْ سورِيا."],
  ["misriya", "هِيَ", "مِصْر", "مِنْ أَيْنَ هِيَ؟", "هِيَ مِنْ مِصْر."],
  ["q4c", "أَنْتِ", "باكِسْتان", "مِنْ أَيْنَ أَنْتِ؟", "أَنا مِنْ باكِسْتان."]
];
// Tedrîb 4: isim [resim, isim] (ilki örnek)
var ISIM = [["d1a", "خالِد"], ["akh", "خَليل"], ["d1b", "خَديجَة"], ["turki", "مُحَمَّد"], ["ana_f", "فاطِمَة"]];
// Tedrîb 5: nisbe — ülke [kişi resmi, nisbe, ülke]
var NISBE = [["turki", "تُرْكِيٌّ", "تُرْكِيا"], ["suriya_f", "سورِيَّةٌ", "سورِيا"], ["misriya", "مِصْرِيَّةٌ", "مِصْر"], ["pakistani", "باكِسْتانِيٌّ", "باكِسْتان"], ["turkiya", "تُرْكِيَّةٌ", "تُرْكِيا"]];

// ---------------- SESLER: خ (Ders 6) ----------------
var KHA_KELIME = ["خالِد", "خَليل", "خَوْلَة", "خَديجَة", "بِخَيْر"];
// [خ ile, ك ile]
var KHA_KAF = [["خَرَّ", "كَرَّ"], ["خَبير", "كَبير"], ["خُسوف", "كُسوف"], ["خانَ", "كانَ"], ["خاوِيَة", "كاوِيَة"], ["نَخْرَة", "نَكْرَة"], ["مَخَر", "مَكَر"], ["فِخاخ", "فِكاك"], ["نَخير", "نَكير"], ["مُخَرَّم", "مُكَرَّم"], ["فَخّ", "فَكّ"], ["مَسَخَ", "مَسَكَ"], ["ساخَ", "ساكَ"], ["مَسْلوخ", "مَسْلوك"], ["نَسَخَ", "نَسَكَ"]];
var AYET_KHA = [
  ["﴿وَلَلْآخِرَةُ خَيْرٌ لَكَ مِنَ الْأُولَى﴾", "الضحى: ٤"],
  ["﴿الْخَبِيثَاتُ لِلْخَبِيثِينَ وَالْخَبِيثُونَ لِلْخَبِيثَاتِ وَالطَّيِّبَاتُ لِلطَّيِّبِينَ وَالطَّيِّبُونَ لِلطَّيِّبَاتِ﴾", "النور: ٢٦"],
  ["﴿فَخَلَفَ مِنْ بَعْدِهِمْ خَلْفٌ أَضَاعُوا الصَّلَاةَ وَاتَّبَعُوا الشَّهَوَاتِ فَسَوْفَ يَلْقَوْنَ غَيًّا﴾", "مريم: ٥٩"],
  ["﴿فَاعْبُدِ اللَّهَ مُخْلِصًا لَهُ الدِّينَ﴾", "الزمر: ٢"],
  ["﴿يَخْلُقُكُمْ فِي بُطُونِ أُمَّهَاتِكُمْ خَلْقًا مِنْ بَعْدِ خَلْقٍ فِي ظُلُمَاتٍ ثَلَاثٍ﴾", "الزمر: ٦"],
  ["﴿فَمِنْكُمْ مَنْ يَبْخَلُ وَمَنْ يَبْخَلْ فَإِنَّمَا يَبْخَلُ عَنْ نَفْسِهِ﴾", "محمد: ٣٨"],
  ["﴿خُشَّعًا أَبْصَارُهُمْ يَخْرُجُونَ مِنَ الْأَجْدَاثِ كَأَنَّهُمْ جَرَادٌ مُنْتَشِرٌ﴾", "القمر: ٧"],
  ["﴿وَاللَّهُ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ ✽ الَّذِينَ يَبْخَلُونَ وَيَأْمُرُونَ النَّاسَ بِالْبُخْلِ﴾", "الحديد: ٢٣-٢٤"]
];

// ---------------- OKUMA (Ders 8) ----------------
var OKU_KELIME = [["أَنا", "ana_m"], ["أَنْتَ", "anta"], ["أَنْتِ", "anti"], ["هُوَ", "huwa"], ["هِيَ", "hiya"], ["طالِب", "talib"], ["مُدَرِّس", "mudarris"], ["طَبيبَة", "tabiba"], ["طالِبَة", "taliba"], ["هذا", "hadha"], ["هذِهِ", "hadhihi"]];
// Tedrîb 2: aynısını bul [kelime, şıklar, doğru indeks]
var AYNI = [["طَبيبَة", ["طالِب", "طَبيب", "طالِبَة", "طَبيبَة"], 3], ["أَنْتِ", ["أَيْنَ", "أَنا", "أَنْتَ", "أَنْتِ"], 3], ["مُهَنْدِسَة", ["مُدَرِّسَة", "مُهَنْدِسَة", "مُهَنْدِس", "مُدَرِّس"], 1], ["أَخ", ["أُخْت", "خالِد", "أَخ", "خَليل"], 2]];
// Tedrîb 3-4: farklı olanı bul [şıklar, farklı indeks]
var FARKLI = [[["هُوَ.", "هُوَ.", "هِيَ."], 2], [["أَنْتِ.", "أَنْتِ.", "أَنْتَ."], 2], [["هذا.", "هذِهِ.", "هذِهِ."], 0],
  [["كَيْفَ حالُكِ؟", "كَيْفَ حالُكَ؟", "كَيْفَ حالُكِ؟"], 1], [["ما اسْمُكَ؟", "ما اسْمُكِ؟", "ما اسْمُكَ؟"], 1], [["مِنْ أَيْنَ أَنْتِ؟", "مِنْ أَيْنَ أَنْتِ؟", "مِنْ أَيْنَ أَنْتَ؟"], 2]];
var AYNI_ESLE = ["أَنْتَ", "السَّلام", "مَعَ", "طَبيبَة", "مِنْ", "نَعَمْ", "ما", "طالِبَة", "أَنا", "هَلْ"];
// Tedrîb 6: cümleler [cümle, resim, Türkçe]
var OKU_CUMLE = [["هُوَ طالِبٌ.", "talib", "O öğrenci."], ["هِيَ طالِبَةٌ.", "taliba", "O öğrenci (kız)."], ["هُوَ مُدَرِّسٌ.", "mudarris", "O öğretmen."], ["هِيَ مُدَرِّسَةٌ.", "mudarrisa", "O öğretmen (kadın)."], ["أَنا تُرْكِيٌّ.", "turki", "Ben Türk’üm."], ["أَنا مِنْ سورِيا.", "suri", "Ben Suriye’denim."], ["أَنا مُهَنْدِسٌ.", "muhandis", "Ben mühendisim."], ["أَنا مِنْ باكِسْتان.", "pakistani", "Ben Pakistan’danım."], ["هِيَ مِصْرِيَّةٌ.", "misriya", "O Mısırlı (kadın)."]];

// ---------------- YAZI (Ders 9) ----------------
// [harf, ad, biçimler (tek/sonda/…), örnek kelimeler]
var HARF = [
  ["أ", "elif (hemze)", ["أ", "ـأ"], ["أَنا", "سَأَلَ", "تَوَضَّأَ"]],
  ["د", "dâl", ["د", "ـد"], ["دار", "مُدَرِّس", "واحِد"]],
  ["ذ", "zâl", ["ذ", "ـذ"], ["ذَهَبَ", "هذِهِ", "لَذيذ"]],
  ["ر", "râ", ["ر", "ـر"], ["رَأْس", "تُرْكِيّ", "بِخَيْر"]],
  ["ز", "zây", ["ز", "ـز"], ["زَيْنَب", "عَزْم", "عَزيز"]],
  ["و", "vâv", ["و", "ـو"], ["وَسَهْلًا", "خَوْلَة", "هُوَ"]]
];
var HARF_NOT = "Bu altı harf (أ د ذ ر ز و) kendinden sonraki harfe bitişmez; yalnız kendinden önceki harfe bitişebilir.";
var YAZ_KELIME = ["أنا", "سأل", "دار", "مدرس", "واحد", "رأس", "تركي", "زينب", "عزم", "موز", "عزيز"];
// Tedrîb 6: tekrar eden harf [harfler, doğru]
var TEKRAR_HARF = [[["د", "ر", "ذ", "د"], "د"], [["د", "ز", "ذ", "ز"], "ز"], [["د", "و", "و", "ر"], "و"], [["د", "ر", "ز", "ر"], "ر"]];
// Tedrîb 7-8: baştaki / sondaki harf [kelimeler, harf, baş mı]
var BAS_SON = [[["أَخٌ", "أَرْبَعَة", "أَيْنَ", "أَهْلًا"], "أ", true], [["واحِدٌ", "وَعَلَيْكُمْ", "وَسَهْلًا", "وَما"], "و", true], [["خالِدٌ", "الحَمْدُ", "واحِد", "مُحَمَّدٌ"], "د", false], [["بِخَيْر", "مِصْر", "فَجْر", "بَدْر"], "ر", false]];

// ---------------- KONUŞMA (Ders 7) ----------------
var KONUS = [
  ["Kendini tanıt: adını, uyruğunu ve ülkeni söyle.", "اِسْمي فاطِمَة، أَنا مِصْرِيَّةٌ. أَنا مِنْ مِصْر. — أَهْلًا وَسَهْلًا.", [["مَحْمود", "تُرْكِيّ – تُرْكِيا"], ["خَديجَة", "سورِيَّة – سورِيا"], ["عَلِيّ", "باكِسْتانِيّ – باكِسْتان"], ["أَحْمَد", "مِصْرِيّ – مِصْر"]]],
  ["Bir yakınını tanıt.", "هذا أَخي، هُوَ مُدَرِّسٌ. — أَهْلًا وَسَهْلًا.", [["أُخْت", "طَبيبَة"], ["صَديق", "مُهَنْدِس"], ["صَديقَة", "طالِبَة"], ["أَخ", "طالِب"]]],
  ["Selamlaş, hâl hatır sor, uyruğunu sor.", "السَّلامُ عَلَيْكُمْ. — وَعَلَيْكُمُ السَّلامُ. — كَيْفَ حالُكَ؟ — بِخَيْرٍ وَالحَمْدُ لِلّهِ. — ما جِنْسِيَّتُكَ؟ — أَنا باكِسْتانِيٌّ. — أَهْلًا وَسَهْلًا.", [["تُرْكِيَّة", ""], ["سورِيّ", ""], ["مِصْرِيَّة", ""], ["تُرْكِيّ", ""]]],
  ["Ad, ülke ve uyruk sor.", "ما اسْمُكَ؟ — اِسْمي بَدْر. — مِنْ أَيْنَ أَنْتَ؟ — أَنا مِنْ تُرْكِيا. — هَلْ أَنْتَ تُرْكِيٌّ؟ — نَعَمْ، أَنا تُرْكِيٌّ. — أَهْلًا وَسَهْلًا.", [["إِقْبال", "باكِسْتان"], ["أَنْوَر", "سورِيا"], ["سَعيد", "مِصْر"]]]
];
// Tedrîb 6: soruya cevap [soru, örnek cevap, Türkçe]
var CEVAPLA = [
  ["السَّلامُ عَلَيْكُمْ.", "وَعَلَيْكُمُ السَّلامُ.", "Selam üzerinize olsun."],
  ["ما اسْمُكَ؟", "اِسْمي …", "Adın ne?"],
  ["كَيْفَ حالُكَ؟", "بِخَيْرٍ، وَالحَمْدُ لِلّهِ.", "Nasılsın?"],
  ["مِنْ أَيْنَ أَنْتَ؟", "أَنا مِنْ تُرْكِيا.", "Nerelisin?"],
  ["ما جِنْسِيَّتُكَ؟", "أَنا تُرْكِيٌّ.", "Uyruğun ne?"],
  ["هَلْ أَنْتَ باكِسْتانِيٌّ؟", "نَعَمْ، أَنا باكِسْتانِيٌّ.", "Pakistanlı mısın?"],
  ["هَلْ أَنْتَ مِنْ سورِيا؟", "نَعَمْ، أَنا مِنْ سورِيا.", "Suriye’den misin?"],
  ["مَعَ السَّلامَةِ.", "مَعَ السَّلامَةِ.", "Güle güle."]
];

// ---------------- DİNLEME ----------------
// [ses kimliği, duyulan, şık resimleri, doğru resim]
var DINLE_GRUP = [
  { ad: "Dinle ve doğru resmi seç (Ders 4, tedrîb 1)", ar: "اِسْتَمِعْ ثُمَّ ضَعْ عَلامَةَ (✓) في المُرَبَّعِ المُناسِبِ", oge: [
    ["l4a-1", "هذا", ["hadha", "hadhihi"], "hadha"], ["l4a-2", "أُخْت", ["akh", "ukht"], "ukht"], ["l4a-3", "مُدَرِّس", ["talib", "mudarris"], "mudarris"],
    ["l4a-4", "مِصْر", ["h_sur", "h_mis"], "h_mis"], ["l4a-5", "طَبيبَة", ["muhandisa", "tabiba"], "tabiba"], ["l4a-6", "أَنْتِ", ["anta", "anti"], "anti"]] },
  { ad: "Duyduğun resmi göster (Ders 4, tedrîb 2)", ar: "أَشِرْ إِلى الصّورَةِ الَّتي تَسْمَعُ اسْمَها", oge: [
    ["l4b-1", "أُخْت", ["sadiq", "akh", "tabiba", "ukht"], "ukht"], ["l4b-2", "أَنْتِ", ["anti", "d3b", "h_tur", "anta"], "anti"], ["l4b-3", "مُدَرِّس", ["h_pak", "talib", "turki", "mudarris"], "mudarris"]] },
  { ad: "Dinle ve işaretle (Ders 6, tedrîb 1)", ar: "اِسْتَمِعْ، ثُمَّ ضَعْ عَلامَةَ (✓) في المُرَبَّعِ المُناسِبِ", oge: [
    ["l6a-1", "طَبيب", ["talib", "tabib"], "tabib"], ["l6a-2", "مُهَنْدِس", ["mudarris", "muhandis"], "muhandis"], ["l6a-3", "طَبيبَة", ["tabiba", "muhandisa"], "tabiba"],
    ["l6a-4", "مُدَرِّس", ["mudarris", "mudarrisa"], "mudarris"], ["l6a-5", "مُهَنْدِس", ["muhandis", "tabib"], "muhandis"], ["l6a-6", "طالِبَة", ["taliba", "tabiba"], "taliba"]] },
  { ad: "Dinle ve işaretle (Ders 6, tedrîb 2)", ar: "اِسْتَمِعْ، ثُمَّ ضَعْ عَلامَةَ (✓) في المُرَبَّعِ المُناسِبِ", oge: [
    ["l6b-1", "هذا أَخي.", ["akh", "ukht"], "akh"], ["l6b-2", "أَنْتَ مُدَرِّسٌ.", ["mudarris", "mudarrisa"], "mudarris"], ["l6b-3", "طالِبَة", ["muhandisa", "taliba"], "taliba"],
    ["l6b-4", "هُوَ صَديقي.", ["tabiba", "sadiq"], "sadiq"], ["l6b-5", "هِيَ طالِبَةٌ.", ["talib", "taliba"], "taliba"], ["l6b-6", "هذِهِ صَديقَتي.", ["sadiqa", "tabib"], "sadiqa"]] }
];
// Ders 6, tedrîb 3: dört diyalog — [ses, resim, kısa yazı]
var DINLE_DIYALOG = [["l6c-1", "t3d", "مِنْ أَيْنَ أَنْتِ؟ — أَنا مِنْ سورِيا. — هَلْ أَنْتِ سورِيَّةٌ؟ — نَعَمْ، أَنا سورِيَّةٌ."], ["l6c-2", "t3c", "السَّلامُ عَلَيْكُمْ. — وَعَلَيْكُمُ السَّلامُ. — اِسْمي مُحَمَّد، ما اسْمُكَ؟ — اِسْمي عَلِيّ."], ["l6c-3", "t3b", "كَيْفَ حالُكَ؟ — بِخَيْرٍ وَالحَمْدُ لِلّهِ. وَكَيْفَ حالُكَ أَنْتَ؟ — بِخَيْرٍ وَالحَمْدُ لِلّهِ."], ["l6c-4", "t3a", "هذِهِ أُخْتي، هِيَ طالِبَةٌ. — أَهْلًا وَسَهْلًا. — هذِهِ صَديقَتي، هِيَ طَبيبَةٌ. — أَهْلًا وَسَهْلًا."]];
// Ders 6, tedrîb 4: soruyu dinle, resmi bul — [ses, soru, doğru resim]
var DINLE_SORU = [["l6d-1", "هَلْ هذا طالِبٌ؟", "q4b"], ["l6d-2", "هَلْ أَنْتَ مِصْرِيٌّ؟", "q4f"], ["l6d-3", "هَلْ هذا تُرْكِيٌّ؟", "q4e"], ["l6d-4", "هَلْ هذِهِ طَبيبَةٌ؟", "q4d"], ["l6d-5", "مِنْ أَيْنَ أَنْتَ؟", "q4a"], ["l6d-6", "هَلْ أَنْتِ باكِسْتانِيَّةٌ؟", "q4c"]];
var DINLE_SORU_RESIM = ["q4a", "q4b", "q4c", "q4d", "q4e", "q4f"];
