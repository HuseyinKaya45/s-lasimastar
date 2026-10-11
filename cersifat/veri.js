// ================= VERİ: الطِّفْلُ المَرِيضُ · إِسْطَنْبُولُ · harf-i cer ve sıfat tamlaması sınıf dersi =================
// Kelime yazımı: "Arapça|Türkçe|cer|sıfat" · " · " ile ayrılır · "+" ile başlayan kelime öncekine bitişik yazılır (بِـ, لِـ).
// cer katmanı: hc harf-i cer, mj mecrûr (harfin hemen ardından gelen isim), mt mecrûra و ile bağlı (o da mecrûr; işaretlenmesi şart değil).
// sıfat katmanı: mv mevsuf, sf sıfat.
var ROL = {
  hc: { tr: "Harf-i cer", k: "Harf" }, mj: { tr: "Mecrûr", k: "Mecrûr" }, mt: { tr: "Mecrûra bağlı (و ile)", k: "Bağlı" },
  mv: { tr: "Mevsuf (nitelenen)", k: "Mevsuf" }, sf: { tr: "Sıfat", k: "Sıfat" }
};
var BASLIK = ["الطِّفْلُ المَرِيضُ", "إِسْطَنْبُولُ: المَدِينَةُ القَدِيمَةُ وَالحَدِيثَةُ"];
var PARA = [[1, 2], [3, 4, 5]];
// m: metin · p: paragraf · cer: [harf, mecrûr, alamet, not] · sif: [mevsuf, sıfat, uyum, not]
var CUMLE = [
  { m: 1, p: 1, k: "شَعَرَ|hissetti · الطِّفْلُ|çocuk||mv · الصَّغِيرُ|küçük||sf · بِ|(-i)|hc · +أَلَمٍ|ağrı|mj|mv · شَدِيدٍ|şiddetli||sf · فِي|-de|hc · مَعِدَتِهِ.|midesi|mj",
    tr: "Küçük çocuk midesinde şiddetli bir ağrı hissetti.", y: "Küçük çocuk başında hafif bir ağrı hissetti.",
    cer: [["بِـ", "أَلَمٍ", "esre (tenvinli: ـٍ)", "شَعَرَ بِـ “…-i hissetti”: Arapçada بِـ, Türkçede belirtme hâli. بِـ kelimeye bitişik yazılır."], ["فِي", "مَعِدَتِهِ", "esre", "Yer: “midesinde”. ـهِ zamiri “onun”."]],
    sif: [["الطِّفْلُ", "الصَّغِيرُ", "müzekker · tekil · merfû · belirli", "Fâil ve sıfatı: ikisi de ال’li ve merfû."], ["أَلَمٍ", "شَدِيدٍ", "müzekker · tekil · mecrûr · belirsiz", "Harf-i cer yalnız أَلَمٍ’i mecrûr yapar; sıfat ona uyduğu için o da mecrûr."]],
    n: "Türkçede sıfat önce gelir (“küçük çocuk”), Arapçada sonra: الطِّفْلُ الصَّغِيرُ. أَلَمٍ شَدِيدٍ belirsiz: “şiddetli bir ağrı”." },
  { m: 1, p: 1, k: "أَخَذَتْهُ|onu götürdü · أُمُّهُ|annesi · إِلَى|-e|hc · الطَّبِيبِ|doktor|mj|mv · المُنَاوِبِ.|nöbetçi||sf",
    tr: "Annesi onu nöbetçi doktora götürdü.", y: "Babası onu hastaneye götürdü.",
    cer: [["إِلَى", "الطَّبِيبِ", "esre", "Yön: “doktora”. أَخَذَ… إِلَى “…-e götürdü”."]],
    sif: [["الطَّبِيبِ", "المُنَاوِبِ", "müzekker · tekil · mecrûr · belirli", "Mevsuf إِلَى ile mecrûr; sıfat da mecrûr."]],
    n: "أَخَذَتْهُ: fâil أُمُّهُ dişil olduğu için تْ; ـهُ “onu” (mef’ûl). Harf + tamlama: إِلَى الطَّبِيبِ المُنَاوِبِ, ikisi de esre." },
  { m: 1, p: 1, k: "فَحَصَ|muayene etti · الطَّبِيبُ|doktor · الطِّفْلَ|çocuğu · ثُمَّ|sonra · سَأَلَ|sordu · الأُمَّ:|anne(ye) · مَاذَا|ne · أَكَلَ|yedi · وَلَدُكِ؟|oğlun",
    tr: "Doktor çocuğu muayene etti, sonra anneye sordu: Oğlun ne yedi?", y: "Doktor anneyi muayene etti ve çocuğa sordu.",
    cer: [], sif: [],
    yok: "الطَّبِيبُ الطِّفْلَ yan yana ve ikisi de ال’li, ama tamlama değildir: biri merfû (fâil), öbürü mansûb (mef’ûl). Sıfat hâlde de uyar!",
    n: "سَأَلَ الأُمَّ “anneye sordu”: Arapçada mef’ûl, Türkçede “-e”. وَلَدُكِ: ـكِ dişil “senin” (anneye hitap)." },
  { m: 1, p: 1, k: "قَالَتْ:|dedi · أَكَلَ|yedi · طَعَامًا|yemek||mv · كَثِيرًا|çok||sf · وَشَرِبَ|ve içti · مَاءً|su||mv · بَارِدًا.|soğuk||sf",
    tr: "Dedi ki: Çok yemek yedi ve soğuk su içti.", y: "Dedi ki: Az yemek yedi ve sıcak süt içti.",
    cer: [],
    sif: [["طَعَامًا", "كَثِيرًا", "müzekker · tekil · mansûb · belirsiz", "Mef’ûl ve sıfatı: ikisi de üstün tenvin."], ["مَاءً", "بَارِدًا", "müzekker · tekil · mansûb · belirsiz", "مَاءٌ müzekkerdir; sıfatı بَارِدًا (بَارِدَةً değil)."]],
    yok: "Bu cümlede harf-i cer yok.",
    n: "مَاءً: hemze ile biten kelimede mansûb tenvinde elif yazılmaz. طَعَامًا كَثِيرًا “çok yemek”." },
  { m: 1, p: 1, k: "قَالَ|dedi · الطَّبِيبُ:|doktor · المَاءُ|su · ضَرُورِيٌّ|gereklidir · لِ|için|hc · +لْحَيَاةِ،|hayat|mj · لَكِنِ|ama · المَاءُ|su||mv · البَارِدُ|soğuk||sf · ضَرَرٌ|zarardır · لِ|için|hc · +صِحَّةِ|sağlığı|mj · الأَوْلَادِ.|çocuklar",
    tr: "Doktor dedi ki: Su hayat için gereklidir, ama soğuk su çocukların sağlığına zararlıdır.", y: "Doktor dedi ki: Soğuk su çocukların sağlığı için faydalıdır.",
    cer: [["لِـ", "الحَيَاةِ", "esre", "لِـ + ال → لِلْ: ال’nin elifi düşer, لِلْحَيَاةِ yazılır. “Hayat için”."], ["لِـ", "صِحَّةِ", "esre", "صِحَّةِ الأَوْلَادِ izafettir; harf yalnız صِحَّةِ’yi mecrûr yapar, الأَوْلَادِ muzâfun ileyh olarak mecrûr."]],
    sif: [["المَاءُ", "البَارِدُ", "müzekker · tekil · merfû · belirli", "İkisi de belirli → tamlama: “soğuk su”."]],
    n: "Karşılaştır: المَاءُ ضَرُورِيٌّ (belirli + belirsiz) cümledir: “su gereklidir”. المَاءُ البَارِدُ (belirli + belirli) tamlamadır: “soğuk su”. لَكِنِ: hafif لَكِنْ, ardındaki ال yüzünden esreyle okunur. Fasih Arapçada daha çok المَاءُ البَارِدُ مُضِرٌّ بِصِحَّةِ الأَوْلَادِ denir." },
  { m: 1, p: 1, k: "أَنَا|ben · أَنْصَحُكِ|sana tavsiye ederim · بِ|(-i)|hc · +المَاءِ|su|mj|mv · الدَّافِئِ.|ılık||sf",
    tr: "Sana ılık suyu tavsiye ederim.", y: "Sana soğuk suyu tavsiye ederim.",
    cer: [["بِـ", "المَاءِ", "esre", "نَصَحَ بِـ “…-i tavsiye etti”. بِـ + المَاءِ → بِالمَاءِ (bitişik)."]],
    sif: [["المَاءِ", "الدَّافِئِ", "müzekker · tekil · mecrûr · belirli", "Mevsuf بِـ ile mecrûr; sıfat da esre."]],
    n: "أَنْصَحُكِ: ـكِ dişil “sana” (anneye). Fiil + harf kalıbı: نَصَحَ بِـ." },
  { m: 1, p: 2, k: "كَتَبَ|yazdı · الطَّبِيبُ|doktor||mv · المَاهِرُ|usta||sf · عِلَاجًا|ilaç||mv · قَوِيًّا.|güçlü||sf",
    tr: "Usta doktor güçlü bir ilaç yazdı.", y: "Genç doktor hafif bir ilaç yazdı.",
    cer: [],
    sif: [["الطَّبِيبُ", "المَاهِرُ", "müzekker · tekil · merfû · belirli", "Fâil ve sıfatı."], ["عِلَاجًا", "قَوِيًّا", "müzekker · tekil · mansûb · belirsiz", "Mef’ûl ve sıfatı: “güçlü bir ilaç”."]],
    yok: "Bu cümlede harf-i cer yok.",
    n: "Bir cümlede iki tamlama: biri merfû ve belirli, öbürü mansûb ve belirsiz. Sıfat her seferinde kendi mevsufuna uyar." },
  { m: 1, p: 2, k: "ذَهَبَتِ|gitti · الأُمُّ|anne · إِلَى|-e|hc · الصَّيْدَلِيَّةِ|eczane|mj · وَأَخَذَتِ|ve aldı · العِلَاجَ|ilacı · ثُمَّ|sonra · رَجَعَتْ|döndü · إِلَى|-e|hc · البَيْتِ.|ev|mj",
    tr: "Anne eczaneye gitti, ilacı aldı, sonra eve döndü.", y: "Anne hastaneye gitti ve orada kaldı.",
    cer: [["إِلَى", "الصَّيْدَلِيَّةِ", "esre", "ذَهَبَ إِلَى “…-e gitti”."], ["إِلَى", "البَيْتِ", "esre", "رَجَعَ إِلَى “…-e döndü”."]],
    sif: [], yok: "Bu cümlede sıfat tamlaması yok.",
    n: "ذَهَبَتِ الأُمُّ: تْ + ال → تِ. إِلَى البَيْتِ “ilel-beyti” okunur: ى uzatılmaz, ال’nin hemzesi düşer." },
  { m: 1, p: 2, k: "شَرِبَ|içti · الطِّفْلُ|çocuk · العِلَاجَ|ilacı · يَوْمَيْنِ|iki gün||mv · مُنْتَظِمَيْنِ|düzenli||sf · ثُمَّ|sonra · أَصْبَحَ|oldu · طِفْلًا|çocuk||mv · نَشِيطًا|canlı||sf · كَمَا|gibi · كَانَ.|(eskiden) olduğu",
    tr: "Çocuk ilacı iki gün düzenli içti, sonra eskisi gibi canlı bir çocuk oldu.", y: "Çocuk ilacı bir hafta içti ama iyileşmedi.",
    cer: [],
    sif: [["يَوْمَيْنِ", "مُنْتَظِمَيْنِ", "müzekker · ikil · mansûb · belirsiz", "Mevsuf ikil → sıfat da ikil: ـَيْنِ."], ["طِفْلًا", "نَشِيطًا", "müzekker · tekil · mansûb · belirsiz", "أَصْبَحَ’den sonra mansûb (bu kalıp ileride); sıfat uyar."]],
    yok: "Bu cümlede harf-i cer yok.",
    n: "العِلَاجَ يَوْمَيْنِ tamlama değildir (biri belirli, öbürü belirsiz; görevleri farklı). أَصْبَحَ ve كَمَا كَانَ ileride işlenecek; şimdilik “oldu”, “eskisi gibi” diye çevir." },
  { m: 2, p: 3, k: "إِسْطَنْبُولُ|İstanbul · مَدِينَةٌ|bir şehir||mv · قَدِيمَةٌ|eski||sf · وَحَدِيثَةٌ|ve modern||sf · فِي|-de|hc · نَفْسِ|aynı|mj · الوَقْتِ.|zaman",
    tr: "İstanbul aynı zamanda hem eski hem modern bir şehirdir.", y: "İstanbul yalnızca modern bir şehirdir.",
    cer: [["فِي", "نَفْسِ", "esre", "نَفْسِ الوَقْتِ izafet: “aynı zaman”. Harf yalnız نَفْسِ’i mecrûr yapar."]],
    sif: [["مَدِينَةٌ", "قَدِيمَةٌ وَحَدِيثَةٌ", "müennes · tekil · merfû · belirsiz", "Bir mevsufun iki sıfatı; ikincisi و ile bağlanmış. İkisi de dişil."]],
    n: "إِسْطَنْبُولُ مَدِينَةٌ… bir isim cümlesidir; tamlama haberin içindedir: مَدِينَةٌ قَدِيمَةٌ. Fasih Arapçada “aynı zamanda” daha çok فِي الوَقْتِ نَفْسِهِ diye söylenir." },
  { m: 2, p: 3, k: "فِي|-de|hc · إِسْطَنْبُولَ|İstanbul|mj · تَارِيخٌ|tarih||mv · قَدِيمٌ|eski||sf · وَتَارِيخٌ|ve tarih||mv · حَدِيثٌ.|yeni||sf",
    tr: "İstanbul’un eski bir tarihi ve yeni bir tarihi vardır.", y: "İstanbul’un tarihi yoktur.",
    cer: [["فِي", "إِسْطَنْبُولَ", "üstün (özel isim esre almaz; ileride)", "Mecrûr ama esre görünmez: bazı özel isimler mecrûrken üstün alır."]],
    sif: [["تَارِيخٌ", "قَدِيمٌ", "müzekker · tekil · merfû · belirsiz", "“Eski bir tarih”."], ["تَارِيخٌ", "حَدِيثٌ", "müzekker · tekil · merfû · belirsiz", "“Yeni bir tarih”."]],
    n: "فِي إِسْطَنْبُولَ تَارِيخٌ… “İstanbul’da … vardır”: câr-mecrûr başa geçmiş. Türkçede “-in … vardır” diye de çevrilir." },
  { m: 2, p: 3, k: "يَرَى|görür · الإِنْسَانُ|insan · فِي|-de|hc · هَذِهِ|bu|mj · المَدِينَةِ|şehir|mj · المَبَانِيَ|binalar||mv · القَدِيمَةَ|eski||sf · وَالمَبَانِيَ|ve binalar||mv · الحَدِيثَةَ|modern||sf · جَنْبًا|yan · إِلَى|-e|hc · جَنْبٍ.|yan|mj",
    tr: "İnsan bu şehirde eski binaları ve modern binaları yan yana görür.", y: "İnsan bu şehirde yalnız eski binaları görür.",
    cer: [["فِي", "هَذِهِ المَدِينَةِ", "esre المَدِينَةِ’de görünür (هَذِهِ değişmez)", "“Bu şehirde”: işaret ismi ve ardındaki isim birlikte mecrûr."], ["إِلَى", "جَنْبٍ", "esre (tenvinli)", "جَنْبًا إِلَى جَنْبٍ kalıbı: “yan yana”."]],
    sif: [["المَبَانِيَ", "القَدِيمَةَ", "akılsız çoğul → dişil tekil · mansûb · belirli", "مَبَانٍ “binalar” akılsız çoğuldur; sıfatı dişil tekil: القَدِيمَةَ."], ["المَبَانِيَ", "الحَدِيثَةَ", "akılsız çoğul → dişil tekil · mansûb · belirli", "Aynı kural."]],
    n: "Akılsız çoğulun sıfatı dişil tekil olur: المَبَانِيَ القَدِيمَةَ (القَدِيمِينَ değil)." },
  { m: 2, p: 3, k: "وَيُشَاهِدُ|ve seyreder · الإِنْسَانُ|insan · أَيْضًا|ayrıca · المَسَاجِدَ|camiler||mv · التَّارِيخِيَّةَ|tarihî||sf · وَالأَسْوَاقَ|ve çarşılar||mv · العُثْمَانِيَّةَ|Osmanlı||sf · وَالأَسْوَارَ|ve surlar||mv · العَالِيَةَ|yüksek||sf · وَالمَنَاظِرَ|ve manzaralar||mv · الطَّبِيعِيَّةَ|doğal||sf · وَالسَّاحِلَ|ve sahil||mv · الطَّوِيلَ|uzun||sf · وَالمَضِيقَ|ve boğaz||mv · الجَمِيلَ.|güzel||sf",
    tr: "İnsan ayrıca tarihî camileri, Osmanlı çarşılarını, yüksek surları, doğal manzaraları, uzun sahili ve güzel boğazı seyreder.", y: "İnsan ayrıca yeni camileri ve kısa sahili seyreder.",
    cer: [],
    sif: [["المَسَاجِدَ", "التَّارِيخِيَّةَ", "akılsız çoğul → dişil tekil · mansûb · belirli", "Camiler akılsız: sıfat dişil tekil."], ["الأَسْوَاقَ", "العُثْمَانِيَّةَ", "akılsız çoğul → dişil tekil · mansûb · belirli", "Aynı kural."], ["الأَسْوَارَ", "العَالِيَةَ", "akılsız çoğul → dişil tekil · mansûb · belirli", "Aynı kural."], ["المَنَاظِرَ", "الطَّبِيعِيَّةَ", "akılsız çoğul → dişil tekil · mansûb · belirli", "Aynı kural."], ["السَّاحِلَ", "الطَّوِيلَ", "müzekker · tekil · mansûb · belirli", "Tekil müzekker: sıfat da öyle."], ["المَضِيقَ", "الجَمِيلَ", "müzekker · tekil · mansûb · belirli", "Tekil müzekker."]],
    yok: "Bu cümlede harf-i cer yok.",
    n: "Altı sıfat tamlaması, hepsi mef’ûl olduğu için mansûb ve belirli. Dört çoğulun sıfatı dişil tekil, iki tekil müzekkerinki müzekker." },
  { m: 2, p: 3, k: "هَذِهِ|bu · المَدِينَةُ|şehir · مَرْكَزُ|merkezi · التِّجَارَةِ|ticaret · وَالسِّيَاحَةِ،|ve turizm · وَمَرْكَزُ|ve merkezi · العِلْمِ|ilim · وَالفَنِّ|ve sanat · وَالثَّقَافَةِ.|ve kültür",
    tr: "Bu şehir ticaretin ve turizmin merkezi, ilmin, sanatın ve kültürün merkezidir.", y: "Bu şehir yalnız ticaret merkezidir.",
    cer: [], sif: [],
    yok: "مَرْكَزُ التِّجَارَةِ sıfat tamlaması değil, izafettir: ilk kelime ال ve tenvin almaz, ikincisi mecrûr olur. Türkçede “ticaret merkezi” diye çevrilir. Bu cümlede harf-i cer de yok; التِّجَارَةِ’nin esresi izafetten.",
    n: "Esre yalnız harf-i cerden gelmez: muzâfun ileyh de mecrûrdur (التِّجَارَةِ, العِلْمِ)." },
  { m: 2, p: 4, k: "يَحْضُرُ|gelir · إِلَى|-e|hc · إِسْطَنْبُولَ|İstanbul|mj · فِي|-de|hc · فَصْلِ|mevsimi|mj · الصَّيْفِ|yaz · سُيَّاحٌ|turistler||mv · كَثِيرُونَ|çok||sf · مِنْ|-den|hc · أُورُوبَّا|Avrupa|mj · وَأَمْرِيكَا|ve Amerika|mt · وَآسْيَا.|ve Asya|mt",
    tr: "Yaz mevsiminde İstanbul’a Avrupa’dan, Amerika’dan ve Asya’dan birçok turist gelir.", y: "Kış mevsiminde İstanbul’a az turist gelir.",
    cer: [["إِلَى", "إِسْطَنْبُولَ", "üstün (özel isim; ileride)", "حَضَرَ إِلَى “…-e geldi”."], ["فِي", "فَصْلِ", "esre", "فَصْلِ الصَّيْفِ izafet: “yaz mevsimi”."], ["مِنْ", "أُورُوبَّا", "görünmez (elifle biten isim)", "Elifle biten isimlerde hareke görünmez; أَمْرِيكَا ve آسْيَا da و ile ona bağlı, onlar da mecrûr."]],
    sif: [["سُيَّاحٌ", "كَثِيرُونَ", "akıllı çoğul → çoğul · merfû · belirsiz", "Turistler insandır: sıfat çoğul ـُونَ (كَثِيرَةٌ değil)."]],
    n: "Fâil (سُيَّاحٌ) câr-mecrûrlardan sonra gelmiş; fiil başta tekil. سُيَّاحٌ كَثِيرُونَ “birçok turist” (Türkçede isim tekil kalır)." },
  { m: 2, p: 4, k: "يَزُورُ|ziyaret eder · السُّيَّاحُ|turistler · مِنْطَقَةَ|semtini · سُلْطَانِ أَحْمَدَ|Sultanahmet · وَبَايَزِيدَ|ve Beyazıt · وَبُرْجَ|ve kulesi||mv · غَلَطَةَ|Galata · المَشْهُورَ.|meşhur||sf",
    tr: "Turistler Sultanahmet ve Beyazıt semtini ve meşhur Galata Kulesi’ni ziyaret eder.", y: "Turistler yalnız Kapalıçarşı’yı ziyaret eder.",
    cer: [],
    sif: [["بُرْجَ", "المَشْهُورَ", "müzekker · tekil · mansûb · belirli", "İzafetin sıfatı en sona gelir: بُرْجَ غَلَطَةَ المَشْهُورَ. Sıfat بُرْجَ’a uyar (mansûb), غَلَطَةَ’ye değil."]],
    yok: "Bu cümlede harf-i cer yok.",
    n: "بُرْجُ غَلَطَةَ izafet olduğu için belirlidir; sıfatı ال alır. غَلَطَةَ ve بَايَزِيدَ özel isim: esre almaz (ileride)." },
  { m: 2, p: 5, k: "جَوُّ|havası · إِسْطَنْبُولَ|İstanbul · لَطِيفٌ،|hoştur · هُوَ|o · لَيْسَ|değildir · حَارًّا|sıcak · وَلَا|ne de · بَارِدًا.|soğuk",
    tr: "İstanbul’un havası hoştur; ne sıcak ne soğuktur.", y: "İstanbul’un havası çok sıcaktır.",
    cer: [], sif: [],
    yok: "جَوُّ إِسْطَنْبُولَ izafet, لَطِيفٌ haberdir: cümle. Tamlama olsaydı الجَوُّ اللَّطِيفُ derdik. Harf-i cer de yok.",
    n: "لَيْسَ (değildir) ileride işlenecek; şimdilik anlamını ver: هُوَ لَيْسَ حَارًّا وَلَا بَارِدًا “ne sıcak ne soğuk”." },
  { m: 2, p: 5, k: "يَنْزِلُ|yağar · المَطَرُ|yağmur||mv · الغَزِيرُ|bol||sf · فِي|-de|hc · فَصْلِ|mevsimi|mj · الرَّبِيعِ|ilkbahar · كَثِيرًا.|sık sık",
    tr: "İlkbahar mevsiminde sık sık bol yağmur yağar.", y: "İlkbaharda hiç yağmur yağmaz.",
    cer: [["فِي", "فَصْلِ", "esre", "فَصْلِ الرَّبِيعِ izafet: “ilkbahar mevsimi”."]],
    sif: [["المَطَرُ", "الغَزِيرُ", "müzekker · tekil · merfû · belirli", "Fâil ve sıfatı."]],
    n: "Buradaki كَثِيرًا sıfat değildir: bir isme değil fiile bağlı, “sık sık”. Karşılaştır: أَكَلَ طَعَامًا كَثِيرًا (sıfat: “çok yemek”)." },
  { m: 2, p: 5, k: "نِسْبَةُ|oranı · الرُّطُوبَةِ|nem · فِي|-de|hc · مَوْسِمِ|mevsimi|mj · الصَّيْفِ|yaz · عَالِيَةٌ.|yüksektir",
    tr: "Yaz mevsiminde nem oranı yüksektir.", y: "Yaz mevsiminde nem oranı düşüktür.",
    cer: [["فِي", "مَوْسِمِ", "esre", "مَوْسِمِ الصَّيْفِ izafet: “yaz mevsimi”."]],
    sif: [], yok: "نِسْبَةُ الرُّطُوبَةِ… عَالِيَةٌ tamlama değil cümledir: عَالِيَةٌ belirsiz ve haber. Ayrıca نِسْبَةُ müzekker değil, dişil; haber de dişil.",
    n: "Cümlenin arasına câr-mecrûr girmiş: نِسْبَةُ الرُّطُوبَةِ [فِي مَوْسِمِ الصَّيْفِ] عَالِيَةٌ." },
  { m: 2, p: 5, k: "لَا|-maz · يَنْزِلُ|yağar · الثَّلْجُ|kar · كَثِيرًا|çok · فِي|-de|hc · الشِّتَاءِ.|kış|mj",
    tr: "Kışın çok kar yağmaz.", y: "Kışın çok kar yağar.",
    cer: [["فِي", "الشِّتَاءِ", "esre", "فِي الشِّتَاءِ “kışın, kış mevsiminde”."]],
    sif: [], yok: "Bu cümlede sıfat tamlaması yok; كَثِيرًا fiile bağlı (“çok, sıkça”).",
    n: "لَا يَنْزِلُ: muzâriyi لَا olumsuz yapar." },
  { m: 2, p: 5, k: "وَيَشْعُرُ|ve hisseder · سَاكِنُ|sakini · إِسْطَنْبُولَ|İstanbul · بِ|(-i)|hc · +أَنَّهُ|kendisinin|mj · مَحْظُوظٌ|şanslı (olduğunu) · دَائِمًا.|her zaman",
    tr: "İstanbul’da yaşayan kişi her zaman kendini şanslı hisseder.", y: "İstanbul’da yaşayan kişi kendini yalnız hisseder.",
    cer: [["بِـ", "أَنَّهُ…", "görünmez (cümlecik; ileride)", "يَشْعُرُ بِـ “…-i hisseder”; 1. cümledeki شَعَرَ بِأَلَمٍ ile aynı kalıp."]],
    sif: [], yok: "سَاكِنُ إِسْطَنْبُولَ izafettir (“İstanbul sakini”), sıfat tamlaması değil.",
    n: "شَعَرَ بِـ kalıbı iki metinde de geçti. أَنَّ ileride işlenecek; şimdilik “…olduğunu” diye çevir." }
];
// Kelime kartları: [Arapça, Türkçe, çoğul ya da muzâri, zıt]
var KELIME = [
  ["طِفْلٌ", "çocuk", "أَطْفَالٌ", ""], ["مَرِيضٌ", "hasta", "مَرْضَى", "سَلِيمٌ"], ["صَغِيرٌ", "küçük", "صِغَارٌ", "كَبِيرٌ"], ["شَعَرَ بِـ", "-i hissetti", "يَشْعُرُ", ""],
  ["أَلَمٌ", "ağrı, acı", "آلَامٌ", ""], ["شَدِيدٌ", "şiddetli", "", "خَفِيفٌ"], ["مَعِدَةٌ", "mide", "", ""], ["أُمٌّ", "anne", "أُمَّهَاتٌ", "أَبٌ"],
  ["طَبِيبٌ", "doktor", "أَطِبَّاءُ", ""], ["مُنَاوِبٌ", "nöbetçi", "", ""], ["فَحَصَ", "muayene etti", "يَفْحَصُ", ""], ["سَأَلَ", "sordu", "يَسْأَلُ", "أَجَابَ"],
  ["وَلَدٌ", "çocuk, oğul", "أَوْلَادٌ", "بِنْتٌ"], ["طَعَامٌ", "yemek", "أَطْعِمَةٌ", ""], ["بَارِدٌ", "soğuk", "", "حَارٌّ"], ["ضَرُورِيٌّ", "gerekli, zorunlu", "", ""],
  ["حَيَاةٌ", "hayat", "", "مَوْتٌ"], ["ضَرَرٌ", "zarar", "أَضْرَارٌ", "نَفْعٌ"], ["صِحَّةٌ", "sağlık", "", "مَرَضٌ"], ["نَصَحَ بِـ", "-i tavsiye etti", "يَنْصَحُ", ""],
  ["دَافِئٌ", "ılık", "", ""], ["مَاهِرٌ", "usta, mahir", "مَاهِرُونَ", ""], ["عِلَاجٌ", "ilaç, tedavi", "", ""], ["قَوِيٌّ", "güçlü", "أَقْوِيَاءُ", "ضَعِيفٌ"],
  ["صَيْدَلِيَّةٌ", "eczane", "صَيْدَلِيَّاتٌ", ""], ["رَجَعَ", "döndü", "يَرْجِعُ", "ذَهَبَ"], ["يَوْمٌ", "gün", "أَيَّامٌ", "لَيْلَةٌ"], ["مُنْتَظِمٌ", "düzenli", "", ""],
  ["نَشِيطٌ", "canlı, çalışkan", "نَشِيطُونَ", "كَسْلَانُ"], ["مَدِينَةٌ", "şehir", "مُدُنٌ", "قَرْيَةٌ"], ["قَدِيمٌ", "eski", "", "حَدِيثٌ"], ["تَارِيخٌ", "tarih", "تَوَارِيخُ", ""],
  ["مَبْنًى", "bina", "مَبَانٍ", ""], ["جَنْبًا إِلَى جَنْبٍ", "yan yana", "", ""], ["شَاهَدَ", "seyretti", "يُشَاهِدُ", ""], ["مَسْجِدٌ", "cami", "مَسَاجِدُ", ""],
  ["تَارِيخِيٌّ", "tarihî", "", ""], ["سُوقٌ", "çarşı, pazar", "أَسْوَاقٌ", ""], ["عُثْمَانِيٌّ", "Osmanlı", "", ""], ["سُورٌ", "sur", "أَسْوَارٌ", ""],
  ["عَالٍ", "yüksek", "", "مُنْخَفِضٌ"], ["مَنْظَرٌ", "manzara", "مَنَاظِرُ", ""], ["طَبِيعِيٌّ", "doğal", "", ""], ["سَاحِلٌ", "sahil", "سَوَاحِلُ", ""],
  ["طَوِيلٌ", "uzun", "", "قَصِيرٌ"], ["مَضِيقٌ", "boğaz", "مَضَايِقُ", ""], ["جَمِيلٌ", "güzel", "", "قَبِيحٌ"], ["مَرْكَزٌ", "merkez", "مَرَاكِزُ", ""],
  ["تِجَارَةٌ", "ticaret", "", ""], ["سِيَاحَةٌ", "turizm", "", ""], ["عِلْمٌ", "ilim, bilim", "عُلُومٌ", "جَهْلٌ"], ["فَنٌّ", "sanat", "فُنُونٌ", ""],
  ["ثَقَافَةٌ", "kültür", "", ""], ["فَصْلٌ", "mevsim", "فُصُولٌ", ""], ["صَيْفٌ", "yaz", "", "شِتَاءٌ"], ["سَائِحٌ", "turist", "سُيَّاحٌ", ""],
  ["زَارَ", "ziyaret etti", "يَزُورُ", ""], ["بُرْجٌ", "kule", "أَبْرَاجٌ", ""], ["مَشْهُورٌ", "meşhur", "", ""], ["جَوٌّ", "hava", "", ""],
  ["لَطِيفٌ", "hoş, latif", "", ""], ["نَزَلَ", "indi, yağdı", "يَنْزِلُ", "صَعِدَ"], ["مَطَرٌ", "yağmur", "أَمْطَارٌ", ""], ["غَزِيرٌ", "bol", "", "قَلِيلٌ"],
  ["رَبِيعٌ", "ilkbahar", "", "خَرِيفٌ"], ["نِسْبَةٌ", "oran", "", ""], ["رُطُوبَةٌ", "nem", "", ""], ["مَوْسِمٌ", "mevsim", "مَوَاسِمُ", ""],
  ["ثَلْجٌ", "kar", "ثُلُوجٌ", ""], ["سَاكِنٌ", "sakin, oturan", "سُكَّانٌ", ""], ["مَحْظُوظٌ", "şanslı", "", ""], ["دَائِمًا", "her zaman", "", "أَحْيَانًا"]
];
// Harf-i cer kartları: [harf, anlam, örnek, örneğin Türkçesi]
var HARFLER = [
  ["فِي", "-de, içinde", "فِي مَعِدَتِهِ", "midesinde"], ["إِلَى", "-e, -e doğru", "إِلَى الطَّبِيبِ", "doktora"],
  ["مِنْ", "-den", "مِنْ أُورُوبَّا", "Avrupa’dan"], ["عَلَى", "üzerinde, -e", "عَلَى السَّاحِلِ", "sahilde, sahilin üstünde"],
  ["عَنْ", "-den, hakkında", "سَأَلَ عَنِ الطِّفْلِ", "çocuğu sordu"], ["بِـ", "ile, -le; fiile göre -i", "بِأَلَمٍ · بِالقَلَمِ", "ağrıyı (hissetti) · kalemle"],
  ["لِـ", "için, -in", "لِلْحَيَاةِ", "hayat için"], ["كَـ", "gibi", "كَالأَسَدِ", "aslan gibi"]
];
// Kaide kartları
var KAIDE = [
  ["Harf-i cerler", "<span class=\"ar\">فِي · إِلَى · مِنْ · عَلَى · عَنْ · بِـ · لِـ · كَـ</span>. Ardından gelen isim <b>mecrûr</b> olur: <span class=\"ar\"><b class=\"c-hc\">إِلَى</b> <b class=\"c-mj\">البَيْتِ</b></span>. Harf ile isim birlikte “câr-mecrûr”dur."],
  ["Mecrûrun alameti", "<table class=\"mini\"><tr><td>Müfred, cem-i teksîr</td><td class=\"ar\">ـِ / ـٍ</td><td class=\"ar\">إِلَى البَيْتِ · بِأَلَمٍ</td></tr><tr><td>İkil</td><td class=\"ar\">ـَيْنِ</td><td class=\"ar\">فِي يَوْمَيْنِ</td></tr><tr><td>C. müzekker sâlim</td><td class=\"ar\">ـِينَ</td><td class=\"ar\">مِنَ المُسْلِمِينَ</td></tr><tr><td>C. müennes sâlim</td><td class=\"ar\">ـَاتِ</td><td class=\"ar\">إِلَى الطَّالِبَاتِ</td></tr></table>Elifle biten isimde hareke görünmez: <span class=\"ar\">مِنْ أُورُوبَّا</span>. Bazı özel isimler esre almaz: <span class=\"ar\">فِي إِسْطَنْبُولَ</span> (ileride)."],
  ["Bitişik harfler", "<span class=\"ar\">بِـ · لِـ · كَـ</span> tek harftir, kelimeye bitişik yazılır. لِـ ile ال birleşince ال’nin elifi düşer.<table class=\"mini\"><tr><td class=\"ar\">بِـ + أَلَمٍ</td><td>→</td><td class=\"ar\">بِأَلَمٍ</td></tr><tr><td class=\"ar\">بِـ + المَاءِ</td><td>→</td><td class=\"ar\">بِالمَاءِ</td></tr><tr><td class=\"ar\">لِـ + صِحَّةِ</td><td>→</td><td class=\"ar\">لِصِحَّةِ</td></tr><tr><td class=\"ar\">لِـ + الحَيَاةِ</td><td>→</td><td class=\"ar\">لِلْحَيَاةِ</td></tr></table>"],
  ["Okunuşta değişen harfler", "Sonu sakin harf ال’ye kavuşunca harekelenir; فِي ve إِلَى’nın sonu ال’den önce uzatılmaz.<table class=\"mini\"><tr><td class=\"ar\">مِنْ + الكُلِّيَّةِ</td><td>→</td><td class=\"ar\">مِنَ الكُلِّيَّةِ</td></tr><tr><td class=\"ar\">عَنْ + الطِّفْلِ</td><td>→</td><td class=\"ar\">عَنِ الطِّفْلِ</td></tr><tr><td class=\"ar\">فِي البَيْتِ</td><td>okunuş</td><td>fil-beyti</td></tr><tr><td class=\"ar\">إِلَى البَيْتِ</td><td>okunuş</td><td>ilel-beyti</td></tr></table>"],
  ["Fiil + harf kalıpları", "Türkçedeki hâl eki farklı olabilir; kalıbı fiille birlikte ezberle.<table class=\"mini\"><tr><td class=\"ar\">شَعَرَ بِـ</td><td>-i hissetti</td></tr><tr><td class=\"ar\">نَصَحَ بِـ</td><td>-i tavsiye etti</td></tr><tr><td class=\"ar\">أَخَذَ… إِلَى</td><td>-e götürdü</td></tr><tr><td class=\"ar\">ذَهَبَ / رَجَعَ / حَضَرَ إِلَى</td><td>-e gitti / döndü / geldi</td></tr><tr><td class=\"ar\">سَأَلَ عَنْ</td><td>-i sordu</td></tr></table>"],
  ["Esre yalnız harften gelmez", "Muzâfun ileyh de mecrûrdur: <span class=\"ar\">مَرْكَزُ التِّجَارَةِ · فَصْلِ الصَّيْفِ</span>. Harf-i cer + izafette harf yalnız ilk kelimeyi mecrûr yapar: <span class=\"ar\">فِي <b class=\"c-mj\">فَصْلِ</b> الصَّيْفِ</span>."],
  ["Sıfat tamlaması", "Önce nitelenen isim (<b class=\"c-mv\">mevsuf</b>), sonra <b class=\"c-sf\">sıfat</b>: <span class=\"ar\"><b class=\"c-mv\">الطِّفْلُ</b> <b class=\"c-sf\">الصَّغِيرُ</b></span> “küçük çocuk”. Türkçede sıra terstir."],
  ["Dört uyum", "Sıfat mevsufuna uyar: <b>cinsiyet</b> <span class=\"ar\">طَبِيبٌ مَاهِرٌ · مَدِينَةٌ قَدِيمَةٌ</span>; <b>sayı</b> <span class=\"ar\">يَوْمَيْنِ مُنْتَظِمَيْنِ · سُيَّاحٌ كَثِيرُونَ</span>; <b>hâl</b> <span class=\"ar\">بِأَلَمٍ شَدِيدٍ</span>; <b>belirlilik</b> <span class=\"ar\">الطَّبِيبُ المَاهِرُ · عِلَاجًا قَوِيًّا</span>."],
  ["Akılsız çoğulun sıfatı", "İnsan olmayan çoğulun sıfatı <b>dişil tekil</b> olur: <span class=\"ar\">المَسَاجِدَ التَّارِيخِيَّةَ · الأَسْوَاقَ العُثْمَانِيَّةَ · المَبَانِيَ القَدِيمَةَ</span>. İnsan çoğulunda sıfat çoğul: <span class=\"ar\">سُيَّاحٌ كَثِيرُونَ</span>."],
  ["Tamlama mı, cümle mi, izafet mi?", "<span class=\"ar\">المَاءُ البَارِدُ</span>: ikisi belirli → <b>sıfat tamlaması</b> “soğuk su”. <span class=\"ar\">المَاءُ ضَرُورِيٌّ</span>: belirli + belirsiz → <b>cümle</b> “su gereklidir”. <span class=\"ar\">مَرْكَزُ التِّجَارَةِ</span>: ilk kelime ال almaz, ikincisi mecrûr → <b>izafet</b> “ticaret merkezi”."],
  ["Birden çok sıfat · izafetin sıfatı", "Bir isme birkaç sıfat gelebilir: <span class=\"ar\">مَدِينَةٌ قَدِيمَةٌ وَحَدِيثَةٌ</span>. İzafetin sıfatı en sona gelir ve muzâfa uyar: <span class=\"ar\"><b class=\"c-mv\">بُرْجَ</b> غَلَطَةَ <b class=\"c-sf\">المَشْهُورَ</b></span>."],
  ["Harf-i cer + sıfat tamlaması", "Harf yalnız mevsufu mecrûr yapar; sıfat ona uyduğu için o da mecrûr olur: <span class=\"ar\"><b class=\"c-hc\">إِلَى</b> <b class=\"c-mj\">الطَّبِيبِ</b> <b class=\"c-sf\">المُنَاوِبِ</b> · <b class=\"c-hc\">بِـ</b><b class=\"c-mj\">المَاءِ</b> <b class=\"c-sf\">الدَّافِئِ</b></span>. Her <span class=\"ar\">كَثِيرًا</span> sıfat değildir: <span class=\"ar\">طَعَامًا كَثِيرًا</span> sıfat, <span class=\"ar\">يَنْزِلُ… كَثِيرًا</span> “sık sık”."]
];
// Alıştırmalar: [soru, doğru, yanlış1, yanlış2, açıklama]
var HARF = [
  ["شَعَرَ الطِّفْلُ ___ أَلَمٍ شَدِيدٍ.", "بِـ", "فِي", "إِلَى", "شَعَرَ بِـ “…-i hissetti”: بِأَلَمٍ."],
  ["أَخَذَتْهُ أُمُّهُ ___ الطَّبِيبِ المُنَاوِبِ.", "إِلَى", "مِنْ", "فِي", "Yön: “doktora” → إِلَى."],
  ["ذَهَبَتِ الأُمُّ ___ الصَّيْدَلِيَّةِ.", "إِلَى", "عَلَى", "عَنْ", "ذَهَبَ إِلَى “…-e gitti”."],
  ["شَعَرَ بِأَلَمٍ ___ مَعِدَتِهِ.", "فِي", "إِلَى", "مِنْ", "Yer: “midesinde” → فِي."],
  ["أَنْصَحُكِ ___ المَاءِ الدَّافِئِ.", "بِـ", "إِلَى", "عَلَى", "نَصَحَ بِـ “…-i tavsiye etti”."],
  ["يَحْضُرُ السُّيَّاحُ ___ أُورُوبَّا.", "مِنْ", "إِلَى", "فِي", "Nereden? → مِنْ “Avrupa’dan”."],
  ["يَنْزِلُ المَطَرُ ___ فَصْلِ الرَّبِيعِ.", "فِي", "مِنْ", "عَلَى", "Zaman: “ilkbahar mevsiminde” → فِي."],
  ["يَشْعُرُ سَاكِنُ إِسْطَنْبُولَ ___ أَنَّهُ مَحْظُوظٌ.", "بِـ", "فِي", "إِلَى", "يَشْعُرُ بِـ: 1. cümledeki kalıp."],
  ["جَاءَ مَسْؤُولٌ ___ الكُلِّيَّةِ.", "مِنَ", "مِنْ", "مِنِ", "مِنْ + ال → مِنَ."],
  ["سَأَلَ الطَّبِيبُ ___ الطِّفْلِ.", "عَنِ", "عَنْ", "عَنَ", "عَنْ + ال → عَنِ; سَأَلَ عَنْ “…-i sordu”."],
  ["وَضَعْتُ الكِتَابَ ___ المَكْتَبِ.", "عَلَى", "إِلَى", "مِنْ", "“Masanın üstüne” → عَلَى."],
  ["المَاءُ ضَرُورِيٌّ ___ .", "لِلْحَيَاةِ", "لِالحَيَاةِ", "لِلْحَيَاةُ", "لِـ + ال → لِلْ; mecrûr: esre."],
  ["رَجَعَتِ الأُمُّ ___ البَيْتِ.", "إِلَى", "فِي", "عَنْ", "رَجَعَ إِلَى “…-e döndü”."],
  ["كَتَبْتُ الدَّرْسَ ___ القَلَمِ.", "بِـ", "إِلَى", "عَنْ", "Araç: “kalemle” → بِـ: بِالقَلَمِ."]
];
var BICIM = [
  ["شَعَرَ الطِّفْلُ ___ بِأَلَمٍ.", "الصَّغِيرُ", "الصَّغِيرَ", "صَغِيرٌ", "Mevsuf belirli ve merfû → sıfat da."],
  ["شَعَرَ بِأَلَمٍ ___ .", "شَدِيدٍ", "شَدِيدٌ", "الشَّدِيدِ", "Mevsuf belirsiz ve mecrûr → شَدِيدٍ."],
  ["أَخَذَتْهُ إِلَى الطَّبِيبِ ___ .", "المُنَاوِبِ", "المُنَاوِبُ", "مُنَاوِبٍ", "Belirli ve mecrûr."],
  ["كَتَبَ الطَّبِيبُ عِلَاجًا ___ .", "قَوِيًّا", "قَوِيٌّ", "القَوِيَّ", "Belirsiz ve mansûb."],
  ["شَرِبَ الطِّفْلُ مَاءً ___ .", "بَارِدًا", "بَارِدَةً", "البَارِدَ", "مَاءٌ müzekker; belirsiz, mansûb."],
  ["شَرِبَ العِلَاجَ يَوْمَيْنِ ___ .", "مُنْتَظِمَيْنِ", "مُنْتَظِمَانِ", "مُنْتَظِمًا", "Mevsuf ikil ve mansûb → ـَيْنِ."],
  ["إِسْطَنْبُولُ مَدِينَةٌ ___ .", "قَدِيمَةٌ", "قَدِيمٌ", "القَدِيمَةُ", "مَدِينَةٌ dişil ve belirsiz."],
  ["يُشَاهِدُ الإِنْسَانُ المَسَاجِدَ ___ .", "التَّارِيخِيَّةَ", "التَّارِيخِيِّينَ", "تَارِيخِيَّةً", "Akılsız çoğul → dişil tekil; belirli."],
  ["يَحْضُرُ إِلَى إِسْطَنْبُولَ سُيَّاحٌ ___ .", "كَثِيرُونَ", "كَثِيرَةٌ", "كَثِيرِينَ", "İnsan çoğulu → çoğul ـُونَ; merfû."],
  ["يَزُورُ السُّيَّاحُ بُرْجَ غَلَطَةَ ___ .", "المَشْهُورَ", "المَشْهُورِ", "مَشْهُورًا", "İzafetten sonra gelir ama بُرْجَ’a uyar: mansûb, belirli."],
  ["يَنْزِلُ المَطَرُ ___ فِي الرَّبِيعِ.", "الغَزِيرُ", "غَزِيرٌ", "الغَزِيرَةُ", "Belirli, müzekker, merfû."],
  ["أَنْصَحُكِ بِالمَاءِ ___ .", "الدَّافِئِ", "الدَّافِئُ", "دَافِئٍ", "Belirli ve mecrûr."],
  ["يَرَى الإِنْسَانُ المَبَانِيَ ___ .", "القَدِيمَةَ", "القَدِيمِينَ", "القَدِيمُ", "Akılsız çoğul → dişil tekil; mansûb."],
  ["أَصْبَحَ الطِّفْلُ طِفْلًا ___ .", "نَشِيطًا", "نَشِيطٌ", "النَّشِيطَ", "Belirsiz ve mansûb."]
];
var MECRUR = [
  ["ذَهَبْتُ إِلَى ___ .", "البَيْتِ", "البَيْتُ", "البَيْتَ", "إِلَى’dan sonra esre."],
  ["رَجَعَتِ الأُمُّ مِنَ ___ .", "الصَّيْدَلِيَّةِ", "الصَّيْدَلِيَّةُ", "الصَّيْدَلِيَّةَ", "مِنَ’den sonra esre."],
  ["سَلَّمْتُ عَلَى ___ .", "المُعَلِّمِينَ", "المُعَلِّمُونَ", "المُعَلِّمَانِ", "Cem-i müzekker sâlim mecrûr: ـِينَ."],
  ["نَظَرْتُ إِلَى ___ .", "الطَّالِبَاتِ", "الطَّالِبَاتُ", "الطَّالِبَاتَ", "Cem-i müennes sâlim mecrûr: esre."],
  ["شَرِبَ العِلَاجَ فِي ___ .", "يَوْمَيْنِ", "يَوْمَانِ", "يَوْمَيْنُ", "İkil mecrûr: ـَيْنِ."],
  ["سَأَلْتُ عَنِ ___ .", "الأَطْفَالِ", "الأَطْفَالُ", "الأَطْفَالَ", "Cem-i teksîr müfred gibi: esre."],
  ["أَخَذَتْهُ إِلَى ___ .", "الطَّبِيبِ المُنَاوِبِ", "الطَّبِيبُ المُنَاوِبُ", "الطَّبِيبِ المُنَاوِبُ", "Mevsuf mecrûr; sıfat da mecrûr."],
  ["جَلَسْنَا فِي ___ .", "مَطْعَمٍ جَمِيلٍ", "مَطْعَمٌ جَمِيلٌ", "مَطْعَمٍ جَمِيلٌ", "Belirsiz mecrûr: ikisi de ـٍ."],
  ["يَحْضُرُ سُيَّاحٌ مِنْ ___ .", "مُدُنٍ كَثِيرَةٍ", "مُدُنٌ كَثِيرَةٌ", "مُدُنٍ كَثِيرِينَ", "Akılsız çoğul: sıfat dişil tekil; ikisi de mecrûr."],
  ["سَكَنْتُ فِي ___ .", "المَدِينَةِ القَدِيمَةِ", "المَدِينَةَ القَدِيمَةَ", "المَدِينَةِ القَدِيمَةُ", "فِي’den sonra mevsuf ve sıfat esre."],
  ["أَنْصَحُكَ بِـ___ .", "العِلَاجِ القَوِيِّ", "العِلَاجُ القَوِيُّ", "العِلَاجِ القَوِيُّ", "بِـ’den sonra mecrûr; sıfat uyar."],
  ["سَافَرْتُ إِلَى ___ .", "إِسْطَنْبُولَ", "إِسْطَنْبُولِ", "إِسْطَنْبُولٍ", "Bu özel isim esre ve tenvin almaz (ileride)."]
];
// Tamlama mı, cümle mi, izafet mi? [ifade, tür (st sıfat tamlaması, iz izafet, cm cümle), açıklama]
var TERKIP = [
  ["المَاءُ البَارِدُ", "st", "İkisi belirli ve aynı hâlde: “soğuk su”."], ["المَاءُ ضَرُورِيٌّ", "cm", "Belirli + belirsiz: “su gereklidir”."],
  ["مَرْكَزُ التِّجَارَةِ", "iz", "İlk kelime ال almaz, ikincisi mecrûr: “ticaret merkezi”."], ["الطَّبِيبُ المَاهِرُ", "st", "“Usta doktor”."],
  ["جَوُّ إِسْطَنْبُولَ", "iz", "“İstanbul’un havası”."], ["جَوُّ إِسْطَنْبُولَ لَطِيفٌ", "cm", "İzafet + haber: “İstanbul’un havası hoştur”."],
  ["مَدِينَةٌ قَدِيمَةٌ", "st", "İkisi belirsiz: “eski bir şehir”."], ["المَدِينَةُ قَدِيمَةٌ", "cm", "Belirli + belirsiz: “şehir eskidir”."],
  ["فَصْلُ الصَّيْفِ", "iz", "“Yaz mevsimi”."], ["السَّاحِلُ الطَّوِيلُ", "st", "“Uzun sahil”."], ["السَّاحِلُ طَوِيلٌ", "cm", "“Sahil uzundur”."],
  ["سَاكِنُ إِسْطَنْبُولَ", "iz", "“İstanbul sakini”."], ["عِلَاجٌ قَوِيٌّ", "st", "“Güçlü bir ilaç”."], ["العِلَاجُ قَوِيٌّ", "cm", "“İlaç güçlüdür”."],
  ["نِسْبَةُ الرُّطُوبَةِ", "iz", "“Nem oranı”."], ["المَسَاجِدُ التَّارِيخِيَّةُ", "st", "“Tarihî camiler” (akılsız çoğul → dişil tekil sıfat)."]
];
var TERKIP_AD = { st: "Sıfat tamlaması", iz: "İzafet", cm: "İsim cümlesi" };
var DONUSTUR = [
  ["الطَّبِيبُ المَاهِرُ ← إِلَى ile", "إِلَى الطَّبِيبِ المَاهِرِ", "إِلَى الطَّبِيبِ المَاهِرُ", "إِلَى الطَّبِيبُ المَاهِرُ", "Harf mevsufu mecrûr yapar, sıfat uyar: ikisi de esre."],
  ["أَلَمٌ شَدِيدٌ ← بِـ ile", "بِأَلَمٍ شَدِيدٍ", "بِأَلَمٌ شَدِيدٌ", "بِأَلَمٍ شَدِيدٌ", "Belirsiz mecrûr: ـٍ ـٍ."],
  ["الحَيَاةُ ← لِـ ile", "لِلْحَيَاةِ", "لِالحَيَاةِ", "لِلْحَيَاةُ", "لِـ + ال → لِلْ."],
  ["الكُلِّيَّةُ ← مِنْ ile", "مِنَ الكُلِّيَّةِ", "مِنِ الكُلِّيَّةِ", "مِنَ الكُلِّيَّةُ", "مِنْ + ال → مِنَ; mecrûr esre."],
  ["مَدِينَةٌ قَدِيمَةٌ ← belirli", "المَدِينَةُ القَدِيمَةُ", "المَدِينَةُ قَدِيمَةٌ", "مَدِينَةٌ القَدِيمَةُ", "Belirlilikte de uyum: ikisi ال alır. المَدِينَةُ قَدِيمَةٌ cümle olur."],
  ["طِفْلٌ نَشِيطٌ ← ikil", "طِفْلَانِ نَشِيطَانِ", "طِفْلَانِ نَشِيطٌ", "طِفْلَانِ نَشِيطُونَ", "Sayıda uyum: ikisi de ikil."],
  ["مُعَلِّمٌ مَاهِرٌ ← çoğul", "مُعَلِّمُونَ مَاهِرُونَ", "مُعَلِّمُونَ مَاهِرَةٌ", "مُعَلِّمُونَ مَاهِرٌ", "İnsan çoğulu: sıfat da çoğul."],
  ["مَسْجِدٌ تَارِيخِيٌّ ← çoğul", "مَسَاجِدُ تَارِيخِيَّةٌ", "مَسَاجِدُ تَارِيخِيُّونَ", "مَسَاجِدُ تَارِيخِيٌّ", "Akılsız çoğul → dişil tekil sıfat."],
  ["السُّوقُ العُثْمَانِيُّ ← çoğul", "الأَسْوَاقُ العُثْمَانِيَّةُ", "الأَسْوَاقُ العُثْمَانِيُّونَ", "الأَسْوَاقُ العُثْمَانِيُّ", "Akılsız çoğul → dişil tekil sıfat."],
  ["شَرِبَهُ يَوْمًا مُنْتَظِمًا ← ikil", "شَرِبَهُ يَوْمَيْنِ مُنْتَظِمَيْنِ", "شَرِبَهُ يَوْمَانِ مُنْتَظِمَانِ", "شَرِبَهُ يَوْمَيْنِ مُنْتَظِمًا", "Mansûb ikil: ـَيْنِ, sıfat da."],
  ["البَيْتُ الجَمِيلُ ← فِي ile", "فِي البَيْتِ الجَمِيلِ", "فِي البَيْتِ الجَمِيلُ", "فِي البَيْتَ الجَمِيلَ", "İkisi de esre."]
];
var DY = [
  ["شَعَرَ الطِّفْلُ بِأَلَمٍ فِي رَأْسِهِ.", false, "فِي مَعِدَتِهِ"], ["أَخَذَتْهُ أُمُّهُ إِلَى الطَّبِيبِ المُنَاوِبِ.", true, "Metinde geçer."],
  ["أَخَذَهُ أَبُوهُ إِلَى المُسْتَشْفَى.", false, "أَخَذَتْهُ أُمُّهُ إِلَى الطَّبِيبِ"], ["شَرِبَ الطِّفْلُ مَاءً بَارِدًا.", true, "Metinde geçer."],
  ["نَصَحَ الطَّبِيبُ بِالمَاءِ البَارِدِ.", false, "بِالمَاءِ الدَّافِئِ"], ["ذَهَبَتِ الأُمُّ إِلَى الصَّيْدَلِيَّةِ.", true, "Metinde geçer."],
  ["شَرِبَ الطِّفْلُ العِلَاجَ أُسْبُوعًا.", false, "يَوْمَيْنِ مُنْتَظِمَيْنِ"], ["إِسْطَنْبُولُ مَدِينَةٌ قَدِيمَةٌ وَحَدِيثَةٌ.", true, "Metinde geçer."],
  ["يَحْضُرُ السُّيَّاحُ إِلَى إِسْطَنْبُولَ فِي فَصْلِ الشِّتَاءِ.", false, "فِي فَصْلِ الصَّيْفِ"], ["جَوُّ إِسْطَنْبُولَ حَارٌّ جِدًّا.", false, "لَيْسَ حَارًّا وَلَا بَارِدًا"],
  ["يَنْزِلُ الثَّلْجُ كَثِيرًا فِي الشِّتَاءِ.", false, "لَا يَنْزِلُ الثَّلْجُ كَثِيرًا"], ["يَزُورُ السُّيَّاحُ بُرْجَ غَلَطَةَ المَشْهُورَ.", true, "Metinde geçer."],
  ["نِسْبَةُ الرُّطُوبَةِ فِي مَوْسِمِ الصَّيْفِ عَالِيَةٌ.", true, "Metinde geçer."]
];
var SORU = [
  ["بِمَاذَا شَعَرَ الطِّفْلُ الصَّغِيرُ؟", "شَعَرَ بِأَلَمٍ شَدِيدٍ فِي مَعِدَتِهِ.", "Küçük çocuk ne hissetti?"],
  ["إِلَى مَنْ أَخَذَتْهُ أُمُّهُ؟", "أَخَذَتْهُ إِلَى الطَّبِيبِ المُنَاوِبِ.", "Annesi onu kime götürdü?"],
  ["مَاذَا أَكَلَ الطِّفْلُ؟ وَمَاذَا شَرِبَ؟", "أَكَلَ طَعَامًا كَثِيرًا وَشَرِبَ مَاءً بَارِدًا.", "Çocuk ne yedi, ne içti?"],
  ["بِمَاذَا نَصَحَ الطَّبِيبُ؟", "نَصَحَ بِالمَاءِ الدَّافِئِ.", "Doktor neyi tavsiye etti?"],
  ["إِلَى أَيْنَ ذَهَبَتِ الأُمُّ؟", "ذَهَبَتْ إِلَى الصَّيْدَلِيَّةِ.", "Anne nereye gitti?"],
  ["كَيْفَ أَصْبَحَ الطِّفْلُ؟", "أَصْبَحَ طِفْلًا نَشِيطًا.", "Çocuk nasıl oldu?"],
  ["مَاذَا يَرَى الإِنْسَانُ فِي إِسْطَنْبُولَ؟", "يَرَى المَبَانِيَ القَدِيمَةَ وَالمَبَانِيَ الحَدِيثَةَ.", "İnsan İstanbul’da ne görür?"],
  ["مِنْ أَيْنَ يَحْضُرُ السُّيَّاحُ؟", "يَحْضُرُونَ مِنْ أُورُوبَّا وَأَمْرِيكَا وَآسْيَا.", "Turistler nereden gelir?"],
  ["مَتَى يَحْضُرُ السُّيَّاحُ إِلَى إِسْطَنْبُولَ؟", "يَحْضُرُونَ فِي فَصْلِ الصَّيْفِ.", "Turistler İstanbul’a ne zaman gelir?"],
  ["كَيْفَ جَوُّ إِسْطَنْبُولَ؟", "جَوُّ إِسْطَنْبُولَ لَطِيفٌ.", "İstanbul’un havası nasıldır?"],
  ["مَتَى يَنْزِلُ المَطَرُ الغَزِيرُ؟", "يَنْزِلُ فِي فَصْلِ الرَّبِيعِ.", "Bol yağmur ne zaman yağar?"]
];
// Türkçeden Arapçaya: [Türkçe, Arapça, ipucu]
var TRANSFER = [
  ["Küçük çocuk eve döndü.", "رَجَعَ الطِّفْلُ الصَّغِيرُ إِلَى البَيْتِ.", "رَجَعَ إِلَى; sıfat belirli ve merfû"],
  ["Çocuğu nöbetçi doktora götürdüm.", "أَخَذْتُ الطِّفْلَ إِلَى الطَّبِيبِ المُنَاوِبِ.", "إِلَى + tamlama: ikisi de esre"],
  ["Ilık su içtim.", "شَرِبْتُ مَاءً دَافِئًا.", "Belirsiz mansûb tamlama"],
  ["Usta doktor eczaneden geldi.", "حَضَرَ الطَّبِيبُ المَاهِرُ مِنَ الصَّيْدَلِيَّةِ.", "مِنْ + ال → مِنَ"],
  ["Eski bir şehirde oturuyorum.", "أَسْكُنُ فِي مَدِينَةٍ قَدِيمَةٍ.", "فِي + belirsiz tamlama: ـٍ ـٍ"],
  ["Tarihî camileri seyrettik.", "شَاهَدْنَا المَسَاجِدَ التَّارِيخِيَّةَ.", "Akılsız çoğul → dişil tekil sıfat"],
  ["Asya’dan birçok turist gelir.", "يَحْضُرُ سُيَّاحٌ كَثِيرُونَ مِنْ آسْيَا.", "İnsan çoğulu: كَثِيرُونَ"],
  ["Uzun sahilde oturduk.", "جَلَسْنَا عَلَى السَّاحِلِ الطَّوِيلِ.", "عَلَى + tamlama"],
  ["Meşhur kuleye baktım.", "نَظَرْتُ إِلَى البُرْجِ المَشْهُورِ.", "إِلَى + belirli tamlama"],
  ["Yazın Osmanlı çarşılarına gittim.", "ذَهَبْتُ إِلَى الأَسْوَاقِ العُثْمَانِيَّةِ فِي الصَّيْفِ.", "Akılsız çoğul; iki harf-i cer"],
  ["Su hayat için gereklidir.", "المَاءُ ضَرُورِيٌّ لِلْحَيَاةِ.", "لِـ + ال → لِلْ"],
  ["Dersi kalemle yazdım.", "كَتَبْتُ الدَّرْسَ بِالقَلَمِ.", "Araç: بِـ"]
];
// Sıfat makinesi ve kurucu: isimler {a: belirsiz gövde, d: belirli gövde, k: ek türü (t, f, i, fi, cz, cn), g: m/f, s: t/i/c, ins: insan mı, tr: [yalın, -i, -e, -de, -den], sf: uygun sıfatlar}
var NOUN = {
  tfl: { a: "طِفْل", d: "الطِّفْل", k: "t", g: "m", s: "t", ins: true, tr: ["çocuk", "çocuğu", "çocuğa", "çocukta", "çocuktan"], sf: ["sgr", "nst", "mrd"] },
  bnt: { a: "بِنْت", d: "البِنْت", k: "t", g: "f", s: "t", ins: true, tr: ["kız", "kızı", "kıza", "kızda", "kızdan"], sf: ["sgr", "nst", "jml"] },
  mdn: { a: "مَدِين", d: "المَدِين", k: "f", g: "f", s: "t", ins: false, tr: ["şehir", "şehri", "şehre", "şehirde", "şehirden"], sf: ["qdm", "hds", "jml", "kbr", "msh"] },
  byt: { a: "بَيْت", d: "البَيْت", k: "t", g: "m", s: "t", ins: false, tr: ["ev", "evi", "eve", "evde", "evden"], sf: ["qdm", "jdd", "kbr", "jml"] },
  tbb2: { a: "طَبِيب", d: "الطَّبِيب", k: "i", g: "m", s: "i", ins: true, tr: ["doktor", "doktoru", "doktora", "doktorda", "doktordan"], sf: ["mhr", "mnw", "msh"] },
  mdn2: { a: "مَدِين", d: "المَدِين", k: "fi", g: "f", s: "i", ins: false, tr: ["şehir", "şehri", "şehre", "şehirde", "şehirden"], sf: ["qdm", "hds", "kbr", "jml"] },
  mlm: { a: "مُعَلِّم", d: "المُعَلِّم", k: "cz", g: "m", s: "c", ins: true, tr: ["öğretmenler", "öğretmenleri", "öğretmenlere", "öğretmenlerde", "öğretmenlerden"], sf: ["nst", "mhr", "mnw"] },
  tlb: { a: "طَالِب", d: "الطَّالِب", k: "cn", g: "f", s: "c", ins: true, tr: ["kız öğrenciler", "kız öğrencileri", "kız öğrencilere", "kız öğrencilerde", "kız öğrencilerden"], sf: ["nst", "jdd", "mhr"] },
  swq: { a: "أَسْوَاق", d: "الأَسْوَاق", k: "t", g: "m", s: "c", ins: false, tr: ["çarşılar", "çarşıları", "çarşılara", "çarşılarda", "çarşılardan"], sf: ["qdm", "osm", "kbr", "trh", "msh"] },
  byt3: { a: "بُيُوت", d: "البُيُوت", k: "t", g: "m", s: "c", ins: false, tr: ["evler", "evleri", "evlere", "evlerde", "evlerden"], sf: ["qdm", "jdd", "kbr", "jml"] }
};
// sıfatlar: [belirsiz gövde, belirli gövde, Türkçe]
var ADJ = {
  sgr: ["صَغِير", "الصَّغِير", "küçük"], kbr: ["كَبِير", "الكَبِير", "büyük"], qdm: ["قَدِيم", "القَدِيم", "eski"], hds: ["حَدِيث", "الحَدِيث", "modern"],
  jdd: ["جَدِيد", "الجَدِيد", "yeni"], jml: ["جَمِيل", "الجَمِيل", "güzel"], nst: ["نَشِيط", "النَّشِيط", "çalışkan"], mrd: ["مَرِيض", "المَرِيض", "hasta"],
  mhr: ["مَاهِر", "المَاهِر", "usta"], msh: ["مَشْهُور", "المَشْهُور", "meşhur"], trh: ["تَارِيخِيّ", "التَّارِيخِيّ", "tarihî"], osm: ["عُثْمَانِيّ", "العُثْمَانِيّ", "Osmanlı tarzı"],
  mnw: ["مُنَاوِب", "المُنَاوِب", "nöbetçi"]
};
// Kurucu: harf-i cerler ve çerçeve fiilleri: ins (insan) / yer: [fiil, Türkçe hâl (0 yalın … 4 -den), son ek, Türkçe fiil]
var KURHARF = {
  fi: { ar: "فِي", ins: ["فَكَّرْتُ", 1, "", "düşündüm"], yer: ["جَلَسْتُ", 3, "", "oturdum"] },
  ila: { ar: "إِلَى", ins: ["نَظَرْتُ", 2, "", "baktım"], yer: ["نَظَرْتُ", 2, "", "baktım"] },
  min: { ar: "مِنْ", ins: ["تَعَلَّمْتُ", 4, "", "öğrendim"], yer: ["خَرَجْتُ", 4, "", "çıktım"] },
  ala: { ar: "عَلَى", ins: ["سَلَّمْتُ", 2, "", "selam verdim"], yer: ["تَعَرَّفْتُ", 1, "", "tanıdım"] },
  bi: { ar: "بِـ", ins: ["اِهْتَمَمْتُ", 0, " ile", "ilgilendim"], yer: ["اِهْتَمَمْتُ", 0, " ile", "ilgilendim"] },
  li: { ar: "لِـ", ins: ["اِشْتَرَيْتُ هَدِيَّةً", 0, " için", "hediye aldım"], yer: ["اِشْتَرَيْتُ هَدِيَّةً", 0, " için", "hediye aldım"] }
};
// Ders akışı: [sekme, başlık, dakika, ne yapılır]
var AKIS = [
  ["kelime", "Isınma: kelimeler", 8, "Kelime kartlarını çevir; sıfatların zıddını, isimlerin çoğulunu söylet: صَغِيرٌ × ?"],
  ["metin", "Metinleri dinle ve oku", 10, "Önce dinlet, sonra sesli okut. “Harf-i cer renkli” ve “Sıfat tamlaması renkli” ile metni göster."],
  ["ceviri", "Cümle cümle çeviri", 18, "Her cümlede önce öğrenciler çevirsin; sonra kelime kelime ve doğal çeviriyi aç, nottaki tuzağı konuş."],
  ["isim", "Kaide ve analiz", 14, "Harf-i cer kartları ve kaideleri anlat; sıfat tablosunu gizleyip doldurt; cümlelerde harf-mecrûr ve mevsuf-sıfat işaretlet."],
  ["alistirma", "Alıştırmalar", 14, "Sıfat makinesi, harfi seç, mecrûr biçimi, sıfatın biçimi, tamlama mı cümle mi, dönüştür."],
  ["ceviri", "Türkçeden Arapçaya", 8, "Çeviri sekmesinde “Türkçe → Arapça” ve “Yeni cümleler” modlarını kullan."],
  ["yaris", "Takım yarışması", 10, "Takımlar sırayla cevaplasın: çeviri, harf, sıfat, mecrûr, tamlama, doğru–yanlış."],
  ["uret", "Üretim: şehrini anlat", 8, "Kurucu ile harf + tamlama kurdur; sonra her öğrenci şehrini harf-i cer ve sıfatlarla anlatsın."]
];
