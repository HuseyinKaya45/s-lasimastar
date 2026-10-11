// ================= VERİ: رِحْلَةُ حَسَنٍ · çeviri ve fiil cümlesi sınıf dersi =================
// Kelime yazımı: "Arapça|Türkçe|rol" · " · " ile ayrılır.
// Roller: fl fiil, fa fâil, mf mef'ûl bih, tm tümleç (câr-mecrûr, zaman, yer), x bağlaç, mb mübtedâ, hb haber, ek haber verilen söz, kn كَانَ.
// "(هُوَ)" gibi parantezli kelime gizli fâildir: metinde okunmaz, analizde kesik çizgiyle görünür.
// "+" ile başlayan kelime öncekine bitişik yazılır (أَخْبَرَ + هَا = أَخْبَرَهَا).
var ROLLER = {
  fl: { tr: "Fiil", ar: "فِعْلٌ" }, fa: { tr: "Fâil", ar: "فَاعِلٌ" }, mf: { tr: "Mef'ûl bih", ar: "مَفْعُولٌ بِهِ" },
  tm: { tr: "Tümleç", ar: "مُتَعَلِّقٌ" }, x: { tr: "Bağlaç", ar: "حَرْفُ عَطْفٍ" },
  mb: { tr: "Mübtedâ", ar: "مُبْتَدَأٌ" }, hb: { tr: "Haber", ar: "خَبَرٌ" },
  ek: { tr: "Haber verilen söz", ar: "" }, kn: { tr: "كَانَ (ileride)", ar: "كَانَ" }
};
var BASLIK = "رِحْلَةُ حَسَنٍ";
// c: cümlecikler · ["f", fiil, fâil, mef'ûl, açıklama] ya da ["i", mübtedâ, haber, açıklama]
var CUMLE = [
  { p: 1, k: "حَسَنٌ|Hasan|mb · طَالِبٌ|öğrenci|hb · فِي|-de|tm · جَامِعَةِ|üniversitesi|tm · أَنْقَرَةَ.|Ankara|tm",
    tr: "Hasan Ankara Üniversitesinde öğrencidir.", y: "Hasan İstanbul Üniversitesinde öğretmendir.",
    c: [["i", "حَسَنٌ", "طَالِبٌ", "İsimle başlar: isim cümlesi. Fiil cümlesiyle karşılaştırmak için."]],
    n: "Bu cümle isimle başlıyor (حَسَنٌ): isim cümlesidir. Üçüncü cümleden itibaren cümleler fiille başlar." },
  { p: 1, k: "عُمْرُهُ|yaşı|mb · عِشْرُونَ|yirmi|hb · سَنَةً.|yıl|hb",
    tr: "Yirmi yaşındadır.", y: "Otuz yaşındadır.",
    c: [["i", "عُمْرُهُ", "عِشْرُونَ سَنَةً", "İsim cümlesi."]],
    n: "Kelime kelime “Yaşı yirmi yıldır”; Türkçede “Yirmi yaşındadır” denir." },
  { p: 1, k: "يَدْرُسُ|okuyor|fl · (هُوَ)|o|fa · فِي|-de|tm · كُلِّيَّةِ|fakültesi|tm · الهَنْدَسَةِ|mühendislik|tm · فِي|-de|tm · السَّنَةِ|sınıf, yıl|tm · الأُولَى.|birinci|tm",
    tr: "Mühendislik fakültesinde birinci sınıfta okuyor.", y: "Tıp fakültesinde son sınıfta okuyor.",
    c: [["f", "يَدْرُسُ", "(هُوَ) gizli", "—", "Fâil gizli zamirdir: هُوَ = Hasan. Fiil muzâri: “okuyor”."]],
    n: "Fâil görünmüyor; fiilin içinde gizli (هُوَ). السَّنَةُ الأُولَى burada “birinci sınıf”." },
  { p: 1, k: "يَسْكُنُ|oturuyor|fl · (هُوَ)|o|fa · فِي|-de|tm · شَقَّةٍ|daire|tm · صَغِيرَةٍ|küçük|tm · مَعَ|ile|tm · أَصْدِقَائِهِ.|arkadaşları|tm",
    tr: "Arkadaşlarıyla küçük bir dairede oturuyor.", y: "Ailesiyle büyük bir evde oturuyor.",
    c: [["f", "يَسْكُنُ", "(هُوَ) gizli", "—", "Mef'ûl yok: يَسْكُنُ nesne almaz; فِي شَقَّةٍ yer bildirir."]],
    n: "شَقَّةٌ: apartman dairesi. مَعَ أَصْدِقَائِهِ “arkadaşlarıyla”." },
  { p: 2, k: "كَتَبَ|yazdı|fl · حَسَنٌ|Hasan|fa · رِسَالَةً|bir mektup|mf · إِلِكْتُرُونِيَّةً|elektronik|mf · إِلَى|-e|tm · أُمِّهِ|annesi|tm · وَ|ve|x · أَخْبَرَ|haber verdi|fl · +هَا|ona (kadın)|mf · (هُوَ)|o|fa · فِي|-de|tm · الرِّسَالَةِ|mektup|tm · أَنَّهُ سَيَحْضُرُ إِلَى البَيْتِ بَعْدَ ثَلَاثَةِ أَيَّامٍ.|üç gün sonra eve geleceğini|ek",
    tr: "Hasan annesine bir e-posta yazdı ve mektupta ona üç gün sonra eve geleceğini bildirdi.", y: "Hasan babasına bir mektup yazdı ve bir hafta sonra geleceğini söyledi.",
    c: [["f", "كَتَبَ", "حَسَنٌ", "رِسَالَةً إِلِكْتُرُونِيَّةً", "Fâil merfû (حَسَنٌ), mef'ûl bih mansûb (رِسَالَةً)."], ["f", "أَخْبَرَ", "(هُوَ) gizli", "ـهَا (bitişik zamir)", "Mef'ûl bitişik zamir olabilir: أَخْبَرَهَا “ona haber verdi”."]],
    n: "رِسَالَةٌ إِلِكْتُرُونِيَّةٌ “e-posta”. أَنَّهُ سَيَحْضُرُ… “geleceğini”: سَـ gelecek zaman ön ekidir. Arapçada sıra fiil–fâil–mef'ûl, Türkçede özne–nesne–yüklem." },
  { p: 2, k: "وَ|ve|x · فِي|-de|tm · يَوْمِ|günü|tm · الجُمُعَةِ|cuma|tm · لَبِسَ|giydi|fl · حَسَنٌ|Hasan|fa · المَلَابِسَ|elbiseleri|mf · الجَدِيدَةَ|yeni|mf · وَ|ve|x · حَمَلَ|aldı, taşıdı|fl · (هُوَ)|o|fa · حَقِيبَةَ|çantası|mf · السَّفَرِ|yolculuk|mf · وَ|ve|x · رَكِبَ|bindi|fl · (هُوَ)|o|fa · الحَافِلَةَ|otobüs(e)|mf · وَ|ve|x · ذَهَبَ|gitti|fl · (هُوَ)|o|fa · إِلَى|-e|tm · إِسْطَنْبُولَ.|İstanbul|tm",
    tr: "Cuma günü Hasan yeni elbiselerini giydi, valizini aldı, otobüse bindi ve İstanbul’a gitti.", y: "Cuma günü Hasan trene binip Ankara’ya döndü.",
    c: [["f", "لَبِسَ", "حَسَنٌ", "المَلَابِسَ الجَدِيدَةَ", "Başta tümleç (فِي يَوْمِ الجُمُعَةِ) var; cümle yine fiil cümlesidir."], ["f", "حَمَلَ", "(هُوَ) gizli", "حَقِيبَةَ السَّفَرِ", "Fâil ilk fiilde açık, sonrakilerde gizli."], ["f", "رَكِبَ", "(هُوَ) gizli", "الحَافِلَةَ", "Arapçada mef'ûl; Türkçede “otobüse”."], ["f", "ذَهَبَ", "(هُوَ) gizli", "—", "ذَهَبَ mef'ûl almaz; إِلَى إِسْطَنْبُولَ tümleçtir."]],
    n: "Türkçede “bindi” -e ister: رَكِبَ الحَافِلَةَ “otobüse bindi” (Arapçada mef'ûl). حَقِيبَةُ السَّفَرِ “yolculuk çantası, valiz”." },
  { p: 3, k: "اِسْتَقْبَلَتِ|karşıladı|fl · الأُمُّ|anne|fa · وَلَدَهَا|oğlu(nu)|mf · فِي|-de|tm · المَحَطَّةِ،|istasyon, otogar|tm · ثُمَّ|sonra|x · ذَهَبَ|gitti|fl · الاِثْنَانِ|ikisi|fa · بِسَيَّارَةِ أُجْرَةٍ|taksiyle|tm · إِلَى|-e|tm · البَيْتِ.|ev|tm",
    tr: "Anne oğlunu otogarda karşıladı, sonra ikisi taksiyle eve gitti.", y: "Baba oğlunu havalimanında karşıladı.",
    c: [["f", "اِسْتَقْبَلَتِ", "الأُمُّ", "وَلَدَهَا", "Fâil dişil → fiile تْ eklenir; ال’den önce تِ okunur."], ["f", "ذَهَبَ", "الاِثْنَانِ", "—", "Fâil ikil ama fiil tekil: fiil başta olunca tekil kalır (ذَهَبَا değil)."]],
    n: "سَيَّارَةُ أُجْرَةٍ “kiralık araba” = taksi. الاِثْنَانِ “ikisi” (anne ile oğul)." },
  { p: 3, k: "قَدَّمَتِ|ikram etti|fl · الأُمُّ|anne|fa · أَوَّلًا|önce|tm · لِوَلَدِهَا|oğluna|tm · عَصِيرًا|meyve suyu|mf · بَارِدًا،|soğuk|mf · ثُمَّ|sonra|x · طَبَخَتْ|pişirdi|fl · (هِيَ)|o|fa · لَهُ|ona|tm · طَعَامًا|yemek|mf · لَذِيذًا،|lezzetli|mf · وَ|ve|x · عَمِلَتْ|yaptı|fl · (هِيَ)|o|fa · لَهُ|ona|tm · قَهْوَةً|kahve|mf · تُرْكِيَّةً.|Türk|mf",
    tr: "Anne önce oğluna soğuk bir meyve suyu ikram etti, sonra ona lezzetli bir yemek pişirdi ve Türk kahvesi yaptı.", y: "Anne oğluna sıcak çay ikram etti.",
    c: [["f", "قَدَّمَتِ", "الأُمُّ", "عَصِيرًا بَارِدًا", "Mef'ûl, araya giren أَوَّلًا لِوَلَدِهَا’dan sonra gelmiş."], ["f", "طَبَخَتْ", "(هِيَ) gizli", "طَعَامًا لَذِيذًا", "Gizli fâil dişil (هِيَ) → fiilde تْ."], ["f", "عَمِلَتْ", "(هِيَ) gizli", "قَهْوَةً تُرْكِيَّةً", "Aynı yapı."]],
    n: "قَدَّمَ لِـ “…e ikram etti, sundu”. طَبَخَتْ ve عَمِلَتْ’taki تْ, fâilin dişil olduğunu gösterir." },
  { p: 4, k: "وَ|ve|x · فِي|-de|tm · المَسَاءِ|akşam|tm · صَحِبَتِ|yanına aldı|fl · الأُمُّ|anne|fa · وَلَدَهَا،|oğlu(nu)|mf · وَ|ve|x · ذَهَبَ|gitti|fl · +ا|(o ikisi)|fa · مَعًا|birlikte|tm · إِلَى|-e|tm · السَّاحِلِ.|sahil|tm",
    tr: "Akşam anne oğlunu yanına aldı ve ikisi birlikte sahile gittiler.", y: "Akşam anne ile oğlu evde oturdu.",
    c: [["f", "صَحِبَتِ", "الأُمُّ", "وَلَدَهَا", "Dişil fâil → تْ; ال’den önce تِ."], ["f", "ذَهَبَا", "ـا (ikil elifi)", "—", "Fâil bitişik zamir: ikil elifi. Fâil zamir olunca fiil sayıyı gösterir."]],
    n: "صَحِبَ: eşlik etti, yanına aldı. Karşılaştır: ذَهَبَ الاِثْنَانِ (fâil isim → fiil tekil) · ذَهَبَا (fâil zamir → ikil)." },
  { p: 4, k: "شَاهَدَ|gördü|fl · حَسَنٌ|Hasan|fa · سَفِينَةً|gemi|mf · كَبِيرَةً|büyük|mf · فِي|-de|tm · البَحْرِ.|deniz|tm",
    tr: "Hasan denizde büyük bir gemi gördü.", y: "Hasan denizde küçük bir balık gördü.",
    c: [["f", "شَاهَدَ", "حَسَنٌ", "سَفِينَةً كَبِيرَةً", "Mef'ûl sıfatıyla birlikte mansûb: سَفِينَةً كَبِيرَةً."]],
    n: "Nekre mef'ûl Türkçeye “bir …” diye çevrilir: سَفِينَةً كَبِيرَةً “büyük bir gemi”." },
  { p: 4, k: "كَانَتِ السَّفِينَةُ|gemi (…idi)|kn · تَجْرِي|gidiyor|fl · (هِيَ)|o|fa · بِسُرْعَةٍ.|hızla|tm",
    tr: "Gemi hızla gidiyordu.", y: "Gemi limanda duruyordu.",
    c: [["f", "تَجْرِي", "(هِيَ) gizli", "—", "كَانَتْ … تَجْرِي = “gidiyordu”. كَانَ ve kardeşleri ileride ayrıca işlenecek."]],
    n: "كَانَ + muzâri: geçmişte süren iş, “gidiyordu”. Bu cümlenin yapısı ileride işlenecek; şimdilik anlamı yeter." },
  { p: 5, k: "بَقِيَ|kaldı|fl · حَسَنٌ|Hasan|fa · مَعَ|ile|tm · أُمِّهِ|annesi|tm · يَوْمَيْنِ.|iki gün|tm",
    tr: "Hasan annesiyle iki gün kaldı.", y: "Hasan annesiyle bir hafta kaldı.",
    c: [["f", "بَقِيَ", "حَسَنٌ", "—", "يَوْمَيْنِ zaman bildirir, mef'ûl değildir."]],
    n: "يَوْمَيْنِ “iki gün” (ikil)." },
  { p: 5, k: "وَ|ve|x · فِي|-de|tm · مَسَاءِ|akşamı|tm · يَوْمِ|günü|tm · الأَحَدِ|pazar|tm · حَجَزَ|ayırttı|fl · (هُوَ)|o|fa · تَذْكِرَةً|bilet|mf · مِنَ|-den|tm · الإِنْتَرْنِتِ.|internet|tm",
    tr: "Pazar günü akşam internetten bilet aldı.", y: "Cumartesi sabahı gişeden bilet aldı.",
    c: [["f", "حَجَزَ", "(هُوَ) gizli", "تَذْكِرَةً", "Mef'ûl mansûb: تَذْكِرَةً."]],
    n: "حَجَزَ: (yer, bilet) ayırttı. Türkçede “bilet aldı” daha doğal." },
  { p: 5, k: "وَ|ve|x · فِي|-de|tm · السَّاعَةِ|saat|tm · الثَّانِيَةَ عَشْرَةَ|on iki|tm · لَيْلًا|gece|tm · وَدَّعَ|veda etti|fl · (هُوَ)|o|fa · وَالِدَتَهُ،|annesi(ne)|mf · وَ|ve|x · خَرَجَ|çıktı|fl · (هُوَ)|o|fa · مِنَ|-den|tm · البَيْتِ.|ev|tm",
    tr: "Gece saat on ikide annesine veda etti ve evden çıktı.", y: "Sabah saat sekizde babasına veda etti.",
    c: [["f", "وَدَّعَ", "(هُوَ) gizli", "وَالِدَتَهُ", "Arapçada mef'ûl, Türkçede “annesine”."], ["f", "خَرَجَ", "(هُوَ) gizli", "—", "خَرَجَ mef'ûl almaz; مِنَ البَيْتِ tümleç."]],
    n: "وَدَّعَ وَالِدَتَهُ “annesine veda etti”. وَالِدَةٌ = أُمٌّ (anne)." },
  { p: 5, k: "رَكِبَ|bindi|fl · (هُوَ)|o|fa · الحَافِلَةَ|otobüs(e)|mf · مِنْ|-den|tm · مَحَطَّةِ|otogarı|tm · الحَرَمِ|Harem|tm · السَّاعَةَ|saat|tm · الثَّانِيَةَ عَشْرَةَ|on iki|tm · وَالنِّصْفَ.|buçuk|tm",
    tr: "Harem otogarından saat on iki buçukta otobüse bindi.", y: "Esenler otogarından saat birde trene bindi.",
    c: [["f", "رَكِبَ", "(هُوَ) gizli", "الحَافِلَةَ", "السَّاعَةَ… zaman bildirir; mef'ûl değildir."]],
    n: "مَحَطَّةُ الحَرَمِ: İstanbul’daki Harem otogarı. وَالنِّصْفَ “buçuk”." },
  { p: 5, k: "بَعْدَ|sonra|tm · خَمْسِ|beş|tm · سَاعَاتٍ|saat|tm · وَصَلَ|vardı|fl · (هُوَ)|o|fa · إِلَى|-e|tm · أَنْقَرَةَ.|Ankara|tm",
    tr: "Beş saat sonra Ankara’ya vardı.", y: "On saat sonra İzmir’e vardı.",
    c: [["f", "وَصَلَ", "(هُوَ) gizli", "—", "Başta zaman bildiren tümleç var; cümle fiil cümlesidir."]],
    n: "بَعْدَ خَمْسِ سَاعَاتٍ “beş saat sonra”. وَصَلَ إِلَى “…e vardı”." },
  { p: 5, k: "ذَهَبَ|gitti|fl · (هُوَ)|o|fa · إِلَى|-e|tm · البَيْتِ،|ev|tm · اِسْتَرَاحَ|dinlendi|fl · (هُوَ)|o|fa · قَلِيلًا|biraz|tm · ثُمَّ|sonra|x · ذَهَبَ|gitti|fl · (هُوَ)|o|fa · إِلَى|-e|tm · الجَامِعَةِ.|üniversite|tm",
    tr: "Eve gitti, biraz dinlendi, sonra üniversiteye gitti.", y: "Eve gitti ve bütün gün uyudu.",
    c: [["f", "ذَهَبَ", "(هُوَ) gizli", "—", ""], ["f", "اِسْتَرَاحَ", "(هُوَ) gizli", "—", "قَلِيلًا miktar bildirir; mef'ûl değildir."], ["f", "ذَهَبَ", "(هُوَ) gizli", "—", ""]],
    n: "Üç fiil art arda; hepsinin fâili gizli هُوَ (Hasan)." }
];
// Kelime kartları: [Arapça, Türkçe, çoğul ya da muzâri, zıt anlamlı]
var KELIME = [
  ["طَالِبٌ", "öğrenci", "طُلَّابٌ", ""], ["جَامِعَةٌ", "üniversite", "جَامِعَاتٌ", ""], ["عُمْرٌ", "yaş, ömür", "أَعْمَارٌ", ""], ["سَنَةٌ", "yıl; sınıf", "سَنَوَاتٌ", ""],
  ["دَرَسَ", "ders okudu, öğrenim gördü", "يَدْرُسُ", ""], ["كُلِّيَّةٌ", "fakülte", "كُلِّيَّاتٌ", ""], ["هَنْدَسَةٌ", "mühendislik", "", ""], ["سَكَنَ", "oturdu, ikamet etti", "يَسْكُنُ", ""],
  ["شَقَّةٌ", "daire", "شُقَقٌ", ""], ["صَغِيرٌ", "küçük", "", "كَبِيرٌ"], ["صَدِيقٌ", "arkadaş", "أَصْدِقَاءُ", "عَدُوٌّ"], ["كَتَبَ", "yazdı", "يَكْتُبُ", ""],
  ["رِسَالَةٌ", "mektup, mesaj", "رَسَائِلُ", ""], ["أَخْبَرَ", "haber verdi", "يُخْبِرُ", ""], ["حَضَرَ", "geldi, hazır bulundu", "يَحْضُرُ", "غَابَ"], ["بَيْتٌ", "ev", "بُيُوتٌ", ""],
  ["يَوْمٌ", "gün", "أَيَّامٌ", "لَيْلَةٌ"], ["الجُمُعَةُ", "cuma", "", ""], ["لَبِسَ", "giydi", "يَلْبَسُ", "خَلَعَ"], ["مَلَابِسُ", "elbiseler", "", ""],
  ["جَدِيدٌ", "yeni", "", "قَدِيمٌ"], ["حَمَلَ", "taşıdı, aldı", "يَحْمِلُ", ""], ["حَقِيبَةٌ", "çanta", "حَقَائِبُ", ""], ["سَفَرٌ", "yolculuk", "أَسْفَارٌ", ""],
  ["رَكِبَ", "bindi", "يَرْكَبُ", "نَزَلَ"], ["حَافِلَةٌ", "otobüs", "حَافِلَاتٌ", ""], ["ذَهَبَ", "gitti", "يَذْهَبُ", "رَجَعَ"], ["اِسْتَقْبَلَ", "karşıladı", "يَسْتَقْبِلُ", "وَدَّعَ"],
  ["وَلَدٌ", "çocuk, oğul", "أَوْلَادٌ", "بِنْتٌ"], ["مَحَطَّةٌ", "istasyon, otogar", "مَحَطَّاتٌ", ""], ["سَيَّارَةُ أُجْرَةٍ", "taksi", "", ""], ["قَدَّمَ", "ikram etti, sundu", "يُقَدِّمُ", ""],
  ["عَصِيرٌ", "meyve suyu", "", ""], ["بَارِدٌ", "soğuk", "", "حَارٌّ"], ["طَبَخَ", "pişirdi", "يَطْبُخُ", ""], ["مَسَاءٌ", "akşam", "", "صَبَاحٌ"],
  ["صَحِبَ", "eşlik etti, yanına aldı", "يَصْحَبُ", ""], ["سَاحِلٌ", "sahil", "سَوَاحِلُ", ""], ["شَاهَدَ", "gördü, seyretti", "يُشَاهِدُ", ""], ["سَفِينَةٌ", "gemi", "سُفُنٌ", ""],
  ["بَحْرٌ", "deniz", "بِحَارٌ", ""], ["سُرْعَةٌ", "hız", "", "بُطْءٌ"], ["بَقِيَ", "kaldı", "يَبْقَى", ""], ["الأَحَدُ", "pazar", "", ""],
  ["حَجَزَ", "(yer, bilet) ayırttı", "يَحْجِزُ", ""], ["تَذْكِرَةٌ", "bilet", "تَذَاكِرُ", ""], ["لَيْلًا", "gece, geceleyin", "", "نَهَارًا"], ["وَدَّعَ", "veda etti", "يُوَدِّعُ", "اِسْتَقْبَلَ"],
  ["وَالِدَةٌ", "anne", "", "وَالِدٌ"], ["خَرَجَ", "çıktı", "يَخْرُجُ", "دَخَلَ"], ["سَاعَةٌ", "saat", "سَاعَاتٌ", ""], ["وَصَلَ", "vardı", "يَصِلُ", "غَادَرَ"],
  ["اِسْتَرَاحَ", "dinlendi", "يَسْتَرِيحُ", ""], ["قَلِيلًا", "biraz", "", "كَثِيرًا"]
];
// Kaide kartları (ilk kitap seviyesi)
var KAIDE = [
  ["Fiil cümlesi", "Fiille başlayan cümledir. Öğeleri: <b class=\"c-fl\">fiil</b>, <b class=\"c-fa\">fâil</b> (işi yapan) ve fiil nesne alıyorsa <b class=\"c-mf\">mef'ûl bih</b>. <span class=\"ar\"><b class=\"c-fl\">كَتَبَ</b> <b class=\"c-fa\">حَسَنٌ</b> <b class=\"c-mf\">رِسَالَةً</b></span> “Hasan bir mektup yazdı.”"],
  ["Fâil merfû", "İşi yapan merfû olur: <span class=\"ar\">حَسَنٌ · الأُمُّ · الاِثْنَانِ · المُسَافِرُونَ</span>."],
  ["Mef'ûl bih mansûb", "İşten etkilenen mansûb olur: <span class=\"ar\">رِسَالَةً · الحَافِلَةَ · وَلَدَهَا · عَصِيرًا</span>. Her fiil mef'ûl almaz: <span class=\"ar\">ذَهَبَ · يَسْكُنُ · خَرَجَ · بَقِيَ</span>."],
  ["Gizli ve bitişik fâil", "Fâil görünmeyebilir: <span class=\"ar\">يَدْرُسُ <span class=\"gz\">هُوَ</span> · طَبَخَتْ <span class=\"gz\">هِيَ</span></span>; ya da fiile bitişik zamir olur: <span class=\"ar\">ذَهَبَ<b class=\"c-fa\">ا</b></span> “ikisi gitti”. Programda gizli fâil kesik çizgiyle gösterilir."],
  ["Dişil fâil → dişil fiil", "Mâzide fiilin sonuna <b>تْ</b>: <span class=\"ar\">طَبَخَتْ · اِسْتَقْبَلَتِ الأُمُّ</span>. Muzâride başa <b>تَـ</b>: <span class=\"ar\">تَطْبُخُ الأُمُّ · تَجْرِي السَّفِينَةُ</span>."],
  ["Fiil başta → hep tekil", "Fâil ikil ya da çoğul olsa da fiil tekil kalır: <span class=\"ar\">ذَهَبَ الاِثْنَانِ · رَكِبَ المُسَافِرُونَ · خَرَجَتِ المُوَظَّفَاتُ</span>. Fâil zamir olunca sayı fiilde görünür: <span class=\"ar\">ذَهَبَا · ذَهَبُوا</span>."],
  ["Okunuş: تْ + ال → تِ", "Sâkin تْ’dan sonra ال gelince تْ esre alır: <span class=\"ar\">اِسْتَقْبَلَتِ الأُمُّ · صَحِبَتِ الأُمُّ · قَدَّمَتِ الأُمُّ</span>."],
  ["Mef'ûl zamir olabilir; tümleç mef'ûl değildir", "<span class=\"ar\">أَخْبَرَ<b class=\"c-mf\">هَا</b></span> “ona haber verdi”. Zaman ve yer bildiren <span class=\"ar\">فِي المَسَاءِ · يَوْمَيْنِ · لَيْلًا · إِلَى البَيْتِ</span> tümleçtir, mef'ûl değildir."],
  ["Çeviri ipucu", "Arapçada sıra fiil–fâil–mef'ûl, Türkçede özne–nesne–yüklem: <span class=\"ar\">كَتَبَ حَسَنٌ رِسَالَةً</span> → “Hasan bir mektup yazdı.” Bazı fiiller Türkçede -e ister: <span class=\"ar\">رَكِبَ الحَافِلَةَ</span> “otobüse bindi”, <span class=\"ar\">وَدَّعَ وَالِدَتَهُ</span> “annesine veda etti”."],
  ["İsim cümlesiyle farkı", "<span class=\"ar\">حَسَنٌ طَالِبٌ</span> isimle başlar: isim cümlesi. <span class=\"ar\">يَدْرُسُ حَسَنٌ</span> fiille başlar: fiil cümlesi. Başta bir tümleç olması değiştirmez: <span class=\"ar\">وَفِي يَوْمِ الجُمُعَةِ لَبِسَ حَسَنٌ…</span> fiil cümlesidir."]
];
// Alıştırmalar: [soru (___ boşluk), doğru, yanlış1, yanlış2, açıklama, etiket]
var UYUM = [
  ["___ الأُمُّ وَلَدَهَا.", "اِسْتَقْبَلَتِ", "اِسْتَقْبَلَ", "اِسْتَقْبَلَا", "Fâil dişil → تْ (ال’den önce تِ)."],
  ["___ حَسَنٌ رِسَالَةً.", "كَتَبَ", "كَتَبَتْ", "كَتَبُوا", "Eril tekil fâil."],
  ["___ الاِثْنَانِ إِلَى البَيْتِ.", "ذَهَبَ", "ذَهَبَا", "ذَهَبُوا", "Fiil başta → tekil."],
  ["___ المُسَافِرُونَ الحَافِلَةَ.", "رَكِبَ", "رَكِبُوا", "رَكِبَتْ", "Fiil başta → tekil, eril."],
  ["___ المُوَظَّفَاتُ مِنَ الفُنْدُقِ.", "خَرَجَتِ", "خَرَجْنَ", "خَرَجَ", "Dişil fâil → تْ; fiil başta tekil."],
  ["___ الأُمُّ طَعَامًا لَذِيذًا.", "طَبَخَتِ", "طَبَخَ", "طَبَخْنَ", "Dişil fâil → تْ."],
  ["صَحِبَتِ الأُمُّ وَلَدَهَا وَ___ مَعًا.", "ذَهَبَا", "ذَهَبَ", "ذَهَبُوا", "Fâil zamir (ikisi) → ikil elifi."],
  ["___ الطَّالِبَتَانِ الدَّرْسَ.", "كَتَبَتِ", "كَتَبَتَا", "كَتَبَ", "Fiil başta tekil; fâil dişil → كَتَبَتْ."],
  ["___ الأُمُّ قَهْوَةً.", "تَعْمَلُ", "يَعْمَلُ", "تَعْمَلِينَ", "Muzâride dişil fâil → تَـ.", "muzâri"],
  ["___ حَسَنٌ فِي الجَامِعَةِ.", "يَدْرُسُ", "تَدْرُسُ", "يَدْرُسُونَ", "Eril fâil → يَـ.", "muzâri"],
  ["___ السَّفِينَةُ بِسُرْعَةٍ.", "تَجْرِي", "يَجْرِي", "تَجْرِيَانِ", "Gemi dişildir → تَـ.", "muzâri"],
  ["___ البِنْتُ عَصِيرًا بَارِدًا.", "شَرِبَتِ", "شَرِبَ", "شَرِبْنَ", "Dişil fâil → تْ."],
  ["___ الوَلَدَانِ مِنَ البَيْتِ.", "خَرَجَ", "خَرَجَا", "خَرَجُوا", "Fiil başta tekil."],
  ["___ المُسَافِرُونَ إِلَى أَنْقَرَةَ.", "يَذْهَبُ", "يَذْهَبُونَ", "تَذْهَبُ", "Muzâride de fiil başta tekil kalır.", "muzâri"]
];
var IRAB = [
  ["كَتَبَ حَسَنٌ ___ .", "رِسَالَةً", "رِسَالَةٌ", "رِسَالَةٍ", "Mef'ûl bih mansûb: ـً."],
  ["شَاهَدَ ___ سَفِينَةً.", "حَسَنٌ", "حَسَنًا", "حَسَنٍ", "Fâil merfû: ـٌ."],
  ["رَكِبَ حَسَنٌ ___ .", "الحَافِلَةَ", "الحَافِلَةُ", "الحَافِلَةِ", "Mef'ûl mansûb (ال’li: ـَ)."],
  ["اِسْتَقْبَلَتِ ___ وَلَدَهَا.", "الأُمُّ", "الأُمَّ", "الأُمِّ", "Fâil merfû."],
  ["طَبَخَتِ الأُمُّ ___ لَذِيذًا.", "طَعَامًا", "طَعَامٌ", "طَعَامٍ", "Mef'ûl mansûb."],
  ["ذَهَبَ ___ إِلَى البَيْتِ.", "الاِثْنَانِ", "الاِثْنَيْنِ", "الاِثْنَا", "Fâil merfû; ikilde ref alameti ـَانِ."],
  ["حَجَزَ حَسَنٌ ___ .", "تَذْكِرَةً", "تَذْكِرَةٌ", "تَذْكِرَةٍ", "Mef'ûl mansûb."],
  ["وَدَّعَ حَسَنٌ ___ .", "وَالِدَتَهُ", "وَالِدَتُهُ", "وَالِدَتِهِ", "Mef'ûl mansûb; zamirden önce ـَ."],
  ["خَرَجَ ___ مِنَ الفُنْدُقِ.", "المُوَظَّفُونَ", "المُوَظَّفِينَ", "المُوَظَّفَيْنِ", "Fâil merfû; cem-i müzekker sâlimde ref ـُونَ."],
  ["شَاهَدَ حَسَنٌ ___ كَبِيرَةً.", "سَفِينَةً", "سَفِينَةٌ", "سَفِينَةٍ", "Mef'ûl mansûb; sıfatı da mansûb."]
];
var FAIL = [
  ["كَتَبَ حَسَنٌ رِسَالَةً إِلَى أُمِّهِ.", "حَسَنٌ", "رِسَالَةً", "أُمِّهِ", "İşi yapan, merfû."],
  ["اِسْتَقْبَلَتِ الأُمُّ وَلَدَهَا فِي المَحَطَّةِ.", "الأُمُّ", "وَلَدَهَا", "المَحَطَّةِ", "İşi yapan anne; fiil dişil."],
  ["يَدْرُسُ فِي كُلِّيَّةِ الهَنْدَسَةِ.", "Gizli zamir (هُوَ)", "كُلِّيَّةِ", "الهَنْدَسَةِ", "Fâil görünmüyor: هُوَ (Hasan)."],
  ["ذَهَبَ الاِثْنَانِ إِلَى البَيْتِ.", "الاِثْنَانِ", "البَيْتِ", "Gizli zamir (هُوَ)", "Fâil açık: الاِثْنَانِ (fiil yine tekil)."],
  ["طَبَخَتْ لَهُ طَعَامًا لَذِيذًا.", "Gizli zamir (هِيَ)", "طَعَامًا", "لَهُ", "Fâil gizli: هِيَ (anne)."],
  ["شَاهَدَ حَسَنٌ سَفِينَةً كَبِيرَةً.", "حَسَنٌ", "سَفِينَةً", "كَبِيرَةً", "İşi yapan Hasan."],
  ["ذَهَبَا مَعًا إِلَى السَّاحِلِ.", "ـا (ikil elifi)", "مَعًا", "السَّاحِلِ", "Fâil fiile bitişik zamir."],
  ["بَقِيَ حَسَنٌ مَعَ أُمِّهِ يَوْمَيْنِ.", "حَسَنٌ", "أُمِّهِ", "يَوْمَيْنِ", "Kalan Hasan."],
  ["وَدَّعَ وَالِدَتَهُ وَخَرَجَ مِنَ البَيْتِ.", "Gizli zamir (هُوَ)", "وَالِدَتَهُ", "البَيْتِ", "Fâil gizli; وَالِدَتَهُ mef'ûldür."],
  ["لَبِسَ حَسَنٌ المَلَابِسَ الجَدِيدَةَ.", "حَسَنٌ", "المَلَابِسَ", "الجَدِيدَةَ", "İşi yapan Hasan."]
];
var MEFUL = [
  ["كَتَبَ حَسَنٌ رِسَالَةً إِلَى أُمِّهِ.", "رِسَالَةً", "حَسَنٌ", "أُمِّهِ", "İşten etkilenen, mansûb."],
  ["رَكِبَ الحَافِلَةَ وَذَهَبَ إِلَى إِسْطَنْبُولَ.", "الحَافِلَةَ", "إِسْطَنْبُولَ", "Mef'ûl yok", "Bindiği şey: الحَافِلَةَ."],
  ["ذَهَبَ الاِثْنَانِ إِلَى البَيْتِ.", "Mef'ûl yok", "الاِثْنَانِ", "البَيْتِ", "ذَهَبَ mef'ûl almaz; إِلَى البَيْتِ tümleçtir."],
  ["قَدَّمَتِ الأُمُّ لِوَلَدِهَا عَصِيرًا بَارِدًا.", "عَصِيرًا بَارِدًا", "لِوَلَدِهَا", "الأُمُّ", "İkram edilen şey."],
  ["أَخْبَرَهَا فِي الرِّسَالَةِ.", "ـهَا (bitişik zamir)", "الرِّسَالَةِ", "Mef'ûl yok", "Haber verilen kişi: ـهَا (annesi)."],
  ["بَقِيَ حَسَنٌ مَعَ أُمِّهِ يَوْمَيْنِ.", "Mef'ûl yok", "يَوْمَيْنِ", "أُمِّهِ", "يَوْمَيْنِ zaman bildirir."],
  ["حَجَزَ تَذْكِرَةً مِنَ الإِنْتَرْنِتِ.", "تَذْكِرَةً", "الإِنْتَرْنِتِ", "Mef'ûl yok", "Ayırttığı şey: تَذْكِرَةً."],
  ["وَدَّعَ وَالِدَتَهُ.", "وَالِدَتَهُ", "Mef'ûl yok", "Gizli zamir (هُوَ)", "Veda ettiği kişi."],
  ["شَاهَدَ حَسَنٌ سَفِينَةً فِي البَحْرِ.", "سَفِينَةً", "البَحْرِ", "حَسَنٌ", "Gördüğü şey."],
  ["اِسْتَرَاحَ قَلِيلًا.", "Mef'ûl yok", "قَلِيلًا", "Gizli zamir (هُوَ)", "قَلِيلًا miktar bildirir."]
];
var TUR = [
  ["حَسَنٌ طَالِبٌ فِي جَامِعَةِ أَنْقَرَةَ.", "i", "İsimle başlar."], ["عُمْرُهُ عِشْرُونَ سَنَةً.", "i", "İsimle başlar."],
  ["يَدْرُسُ فِي كُلِّيَّةِ الهَنْدَسَةِ.", "f", "Fiille başlar."], ["كَتَبَ حَسَنٌ رِسَالَةً.", "f", "Fiille başlar."],
  ["الحَافِلَةُ كَبِيرَةٌ.", "i", "İsimle başlar."], ["رَكِبَ حَسَنٌ الحَافِلَةَ.", "f", "Fiille başlar."],
  ["الشَّقَّةُ صَغِيرَةٌ.", "i", "İsimle başlar."], ["يَسْكُنُ مَعَ أَصْدِقَائِهِ.", "f", "Fiille başlar."],
  ["القَهْوَةُ لَذِيذَةٌ.", "i", "İsimle başlar."], ["طَبَخَتِ الأُمُّ طَعَامًا.", "f", "Fiille başlar."],
  ["السَّفِينَةُ كَبِيرَةٌ.", "i", "İsimle başlar."], ["وَفِي المَسَاءِ ذَهَبَا إِلَى السَّاحِلِ.", "f", "Başta tümleç olsa da fiil cümlesidir."]
];
var TUR_OPTS = [["i", "İsim cümlesi"], ["f", "Fiil cümlesi"]];
var DONUSTUR = [
  ["كَتَبَ حَسَنٌ رِسَالَةً ← fâil: الأُمُّ", "كَتَبَتِ الأُمُّ رِسَالَةً", "كَتَبَ الأُمُّ رِسَالَةً", "كَتَبَتِ الأُمُّ رِسَالَةٌ", "Dişil fâil → تْ; mef'ûl mansûb kalır."],
  ["ذَهَبَ حَسَنٌ ← fâil: الاِثْنَانِ", "ذَهَبَ الاِثْنَانِ", "ذَهَبَا الاِثْنَانِ", "ذَهَبُوا الاِثْنَانِ", "Fiil başta tekil."],
  ["رَكِبَ حَسَنٌ الحَافِلَةَ ← fâil: المُسَافِرُونَ", "رَكِبَ المُسَافِرُونَ الحَافِلَةَ", "رَكِبُوا المُسَافِرُونَ الحَافِلَةَ", "رَكِبَ المُسَافِرِينَ الحَافِلَةَ", "Fiil tekil; fâil merfû (ـُونَ)."],
  ["طَبَخَتِ الأُمُّ طَعَامًا ← muzâri", "تَطْبُخُ الأُمُّ طَعَامًا", "يَطْبُخُ الأُمُّ طَعَامًا", "تَطْبُخِينَ الأُمُّ طَعَامًا", "Muzâride dişil → تَـ."],
  ["كَتَبَ حَسَنٌ رِسَالَةً ← muzâri", "يَكْتُبُ حَسَنٌ رِسَالَةً", "تَكْتُبُ حَسَنٌ رِسَالَةً", "يَكْتُبُونَ حَسَنٌ رِسَالَةً", "Eril → يَـ."],
  ["يَدْرُسُ حَسَنٌ ← mâzi", "دَرَسَ حَسَنٌ", "دَرَسَتْ حَسَنٌ", "دَرَسُوا حَسَنٌ", "Eril tekil mâzi."],
  ["شَاهَدَ حَسَنٌ سَفِينَةً ← fâil: البِنْتُ", "شَاهَدَتِ البِنْتُ سَفِينَةً", "شَاهَدَ البِنْتُ سَفِينَةً", "شَاهَدَتِ البِنْتَ سَفِينَةً", "Dişil → تْ; fâil merfû."],
  ["حَجَزَ حَسَنٌ تَذْكِرَةً ← mef'ûl: الحَقِيبَةَ", "حَجَزَ حَسَنٌ الحَقِيبَةَ", "حَجَزَتْ حَسَنٌ الحَقِيبَةَ", "حَجَزَ حَسَنٌ الحَقِيبَةُ", "Mef'ûl değişince fiil değişmez; mef'ûl mansûb."],
  ["خَرَجَ حَسَنٌ مِنَ البَيْتِ ← fâil: المُوَظَّفَاتُ", "خَرَجَتِ المُوَظَّفَاتُ مِنَ البَيْتِ", "خَرَجْنَ المُوَظَّفَاتُ مِنَ البَيْتِ", "خَرَجَ المُوَظَّفَاتُ مِنَ البَيْتِ", "Dişil fâil → خَرَجَتْ; fiil başta tekil."],
  ["اِسْتَقْبَلَتِ الأُمُّ وَلَدَهَا ← fâil: الأَبُ", "اِسْتَقْبَلَ الأَبُ وَلَدَهُ", "اِسْتَقْبَلَتِ الأَبُ وَلَدَهُ", "اِسْتَقْبَلَ الأَبَ وَلَدَهُ", "Eril fâil; zamir de değişir: وَلَدَهُ."]
];
var DY = [
  ["حَسَنٌ طَالِبٌ فِي جَامِعَةِ إِسْطَنْبُولَ.", false, "فِي جَامِعَةِ أَنْقَرَةَ"], ["عُمْرُ حَسَنٍ عِشْرُونَ سَنَةً.", true, "Metinde aynen geçer."],
  ["يَسْكُنُ حَسَنٌ مَعَ أُسْرَتِهِ.", false, "مَعَ أَصْدِقَائِهِ"], ["كَتَبَ حَسَنٌ رِسَالَةً إِلَى أَبِيهِ.", false, "إِلَى أُمِّهِ"],
  ["ذَهَبَ حَسَنٌ إِلَى إِسْطَنْبُولَ بِالحَافِلَةِ.", true, "رَكِبَ الحَافِلَةَ وَذَهَبَ إِلَى إِسْطَنْبُولَ"], ["اِسْتَقْبَلَتِ الأُمُّ وَلَدَهَا فِي المَطَارِ.", false, "فِي المَحَطَّةِ"],
  ["قَدَّمَتِ الأُمُّ لِوَلَدِهَا عَصِيرًا بَارِدًا.", true, "Metinde aynen geçer."], ["شَاهَدَ حَسَنٌ سَفِينَةً صَغِيرَةً.", false, "سَفِينَةً كَبِيرَةً"],
  ["بَقِيَ حَسَنٌ مَعَ أُمِّهِ أُسْبُوعًا.", false, "يَوْمَيْنِ"], ["حَجَزَ حَسَنٌ تَذْكِرَةً مِنَ الإِنْتَرْنِتِ.", true, "Metinde aynen geçer."],
  ["وَصَلَ حَسَنٌ إِلَى أَنْقَرَةَ بَعْدَ خَمْسِ سَاعَاتٍ.", true, "Metinde aynen geçer."], ["نَامَ حَسَنٌ يَوْمًا كَامِلًا فِي البَيْتِ.", false, "اِسْتَرَاحَ قَلِيلًا ثُمَّ ذَهَبَ إِلَى الجَامِعَةِ"]
];
var SORU = [
  ["أَيْنَ يَدْرُسُ حَسَنٌ؟", "يَدْرُسُ فِي كُلِّيَّةِ الهَنْدَسَةِ فِي جَامِعَةِ أَنْقَرَةَ.", "Hasan nerede okuyor?"],
  ["كَمْ عُمْرُ حَسَنٍ؟", "عُمْرُهُ عِشْرُونَ سَنَةً.", "Hasan kaç yaşında?"],
  ["مَعَ مَنْ يَسْكُنُ حَسَنٌ؟", "يَسْكُنُ مَعَ أَصْدِقَائِهِ.", "Hasan kiminle oturuyor?"],
  ["مَاذَا كَتَبَ حَسَنٌ؟", "كَتَبَ رِسَالَةً إِلِكْتُرُونِيَّةً إِلَى أُمِّهِ.", "Hasan ne yazdı?"],
  ["مَتَى ذَهَبَ حَسَنٌ إِلَى إِسْطَنْبُولَ؟", "ذَهَبَ فِي يَوْمِ الجُمُعَةِ.", "Hasan ne zaman İstanbul’a gitti?"],
  ["أَيْنَ اسْتَقْبَلَتِ الأُمُّ وَلَدَهَا؟", "اِسْتَقْبَلَتْهُ فِي المَحَطَّةِ.", "Anne oğlunu nerede karşıladı?"],
  ["مَاذَا قَدَّمَتِ الأُمُّ لِوَلَدِهَا؟", "قَدَّمَتْ لَهُ عَصِيرًا بَارِدًا.", "Anne oğluna ne ikram etti?"],
  ["مَاذَا شَاهَدَ حَسَنٌ فِي البَحْرِ؟", "شَاهَدَ سَفِينَةً كَبِيرَةً.", "Hasan denizde ne gördü?"],
  ["كَمْ يَوْمًا بَقِيَ حَسَنٌ مَعَ أُمِّهِ؟", "بَقِيَ مَعَهَا يَوْمَيْنِ.", "Hasan annesiyle kaç gün kaldı?"],
  ["مَتَى وَصَلَ حَسَنٌ إِلَى أَنْقَرَةَ؟", "وَصَلَ بَعْدَ خَمْسِ سَاعَاتٍ.", "Hasan Ankara’ya ne zaman vardı?"]
];
// Türkçeden Arapçaya yeni cümleler: [Türkçe, Arapça, ipucu]
var TRANSFER = [
  ["Hasan bir kahve içti.", "شَرِبَ حَسَنٌ قَهْوَةً.", "شَرِبَ: içti · mef'ûl mansûb"],
  ["Anne bir mektup yazdı.", "كَتَبَتِ الأُمُّ رِسَالَةً.", "Dişil fâil → تْ"],
  ["Kız otobüse bindi.", "رَكِبَتِ البِنْتُ الحَافِلَةَ.", "رَكِبَ + mef'ûl (Türkçede -e)"],
  ["Hasan büyük bir gemi gördü.", "شَاهَدَ حَسَنٌ سَفِينَةً كَبِيرَةً.", "Nekre mef'ûl: “bir …”"],
  ["Anne oğlunu otogarda karşıladı.", "اِسْتَقْبَلَتِ الأُمُّ وَلَدَهَا فِي المَحَطَّةِ.", "تْ + ال → تِ"],
  ["İki kardeş eve döndü.", "رَجَعَ الأَخَوَانِ إِلَى البَيْتِ.", "Fiil başta tekil"],
  ["Anne lezzetli bir yemek pişiriyor.", "تَطْبُخُ الأُمُّ طَعَامًا لَذِيذًا.", "Muzâri, dişil → تَـ"],
  ["Hasan annesine veda etti.", "وَدَّعَ حَسَنٌ أُمَّهُ.", "Türkçede -e, Arapçada mef'ûl"],
  ["Yolcular otogardan çıktı.", "خَرَجَ المُسَافِرُونَ مِنَ المَحَطَّةِ.", "Fiil başta tekil"],
  ["Hasan üniversitede okuyor.", "يَدْرُسُ حَسَنٌ فِي الجَامِعَةِ.", "Muzâri, eril → يَـ"],
  ["Hasan internetten bir bilet aldı.", "حَجَزَ حَسَنٌ تَذْكِرَةً مِنَ الإِنْتَرْنِتِ.", "حَجَزَ تَذْكِرَةً"],
  ["Kadın çalışanlar akşam çıktı.", "خَرَجَتِ المُوَظَّفَاتُ فِي المَسَاءِ.", "Dişil fâil, fiil tekil"]
];
// Uyum makinesi ve cümle kurucu: fâiller [Arapça, Türkçe (özne), cinsiyet e/d, sayı 1/2/3]
var UM_FAIL = [
  ["حَسَنٌ", "Hasan", "e", 1], ["الأُمُّ", "Anne", "d", 1], ["السَّائِقُ", "Şoför", "e", 1], ["البِنْتُ", "Kız", "d", 1],
  ["الطَّالِبَانِ", "İki öğrenci", "e", 2], ["الطَّالِبَتَانِ", "İki kız öğrenci", "d", 2], ["المُسَافِرُونَ", "Yolcular", "e", 3], ["المُوَظَّفَاتُ", "Kadın çalışanlar", "d", 3]
];
// fiiller: [mâzi kökü, muzâri ön harf harekesi, muzâri kökü, Türkçe geçmiş, Türkçe şimdiki, mef'ûller [[Ar, Tr]], tümleçler [[Ar, Tr]]]
var UM_FIIL = {
  ktb: ["كَتَب", "َ", "كْتُب", "yazdı", "yazıyor", [["رِسَالَةً", "bir mektup"], ["الدَّرْسَ", "dersi"]], []],
  rkb: ["رَكِب", "َ", "رْكَب", "bindi", "biniyor", [["الحَافِلَةَ", "otobüse"], ["السَّفِينَةَ", "gemiye"]], []],
  shhd: ["شَاهَد", "ُ", "شَاهِد", "gördü", "görüyor", [["سَفِينَةً كَبِيرَةً", "büyük bir gemi"], ["البَحْرَ", "denizi"]], []],
  tbkh: ["طَبَخ", "َ", "طْبُخ", "pişirdi", "pişiriyor", [["طَعَامًا لَذِيذًا", "lezzetli bir yemek"]], []],
  hml: ["حَمَل", "َ", "حْمِل", "taşıdı", "taşıyor", [["الحَقِيبَةَ", "çantayı"]], []],
  hjz: ["حَجَز", "َ", "حْجِز", "ayırttı", "ayırtıyor", [["تَذْكِرَةً", "bir bilet"]], []],
  dhb: ["ذَهَب", "َ", "ذْهَب", "gitti", "gidiyor", [], [["إِلَى الجَامِعَةِ", "üniversiteye"], ["إِلَى إِسْطَنْبُولَ", "İstanbul’a"]]],
  khrj: ["خَرَج", "َ", "خْرُج", "çıktı", "çıkıyor", [], [["مِنَ البَيْتِ", "evden"], ["مِنَ المَحَطَّةِ", "otogardan"]]]
};
var UM_BICIM = [["e1", "Eril tekil (هُوَ)"], ["d1", "Dişil tekil (هِيَ)"], ["e2", "İkil (هُمَا)"], ["e3", "Eril çoğul (هُمْ)"], ["d3", "Dişil çoğul (هُنَّ)"]];
// Ders akışı: [sekme, başlık, dakika, ne yapılır]
var AKIS = [
  ["kelime", "Isınma: kelimeler", 8, "Kelime kartlarını çevir. Fiillerin muzârisini de söylet: كَتَبَ – يَكْتُبُ."],
  ["metin", "Metni dinle ve oku", 8, "Önce dinlet, sonra sesli okut. Bilinmeyen kelimeye dokunup anlamını göster."],
  ["ceviri", "Cümle cümle çeviri", 15, "Her cümlede önce öğrenciler çevirsin; sonra kelime kelime ve doğal çeviriyi aç, nottaki tuzağı konuş."],
  ["isim", "Fiil cümlesi: kaide ve analiz", 12, "Kaide kartlarını anlat; metnin cümlelerinde fiil, fâil ve mef'ûlü sınıfla birlikte işaretle. Gizli fâile dikkat."],
  ["alistirma", "Alıştırmalar", 12, "Fiil–fâil makinesi, fiilin biçimi, harekeyi seç, fâili ve mef'ûlü bul, isim mi fiil cümlesi mi."],
  ["ceviri", "Türkçeden Arapçaya", 8, "Çeviri sekmesinde “Türkçe → Arapça” ve “Yeni cümleler” modlarını kullan."],
  ["yaris", "Takım yarışması", 10, "Takımlar sırayla cevaplasın: çeviri, fiilin biçimi, fâil, mef'ûl, doğru–yanlış."],
  ["uret", "Üretim: kendi yolculuğunu anlat", 7, "Cümle kurucu ile cümle kurdur; sonra her öğrenci bir yolculuğunu 5 fiil cümlesiyle yazsın."]
];
