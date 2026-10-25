// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ٣ (الوَحْدَتانِ ٥ - ٦) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "5–6", ar: "اخْتَبِرْ نَفْسَكَ ٣", tr: "Kendini sına 3 · 5. ve 6. üniteler", pfx: "k2s3:", sinavYok: true, sonuc: true,
  giris: "Kitabın 5. ve 6. üniteden sonraki öz değerlendirme sınavı: okuma, yapılar ve kurallar, kelimeler, yazı. Her bölümü çöz; cevabın hemen kontrol edilir, toplam sonucun bu sayfanın altında görünür." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Okuma", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Okuma", ozet: "Dört kısa metin; 15 soru", bloklar: [
 { t: "metin", baslik: "Birinci metin", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["«كُنّا في الماضي لا نَطْلُبُ أَجْرًا عَلى عَمَلِنا، أَمَّا اليَوْمَ، فَإِنَّ بَعْضَ التَّلاميذِ يَأْخُذونَ بَعْضَ المالِ وَهُمْ يَتَعَلَّمونَ».", "“Eskiden işimize karşılık ücret istemezdik; bugün ise bazı öğrenciler okurken biraz para alıyor.”"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["المُتَحَدِّثُ …", "مُعَلِّمٌ", ["مُهَنْدِسٌ", "طَبيبٌ"], "Konuşan kişi …"],
  ["هذا الشَّخْصُ الآنَ …", "يَأْخُذُ راتِبًا", ["لا يَأْخُذُ راتِبًا", "لا يَطْلُبُ أَجْرًا"], "Bu kişi şimdi …", "«كُنّا في الماضي لا نَطْلُبُ أَجْرًا»: ücret istememek geçmişte kaldı."],
  ["مَنْ يَأْخُذُ بَعْضَ المالِ الآنَ؟", "قَليلٌ مِنَ الطُّلّابِ", ["كُلُّ الطُّلّابِ", "كَثيرٌ مِنَ الطُّلّابِ"], "Şimdi kim biraz para alıyor?", "«بَعْضُ التَّلاميذِ»"]] },
 { t: "metin", baslik: "İkinci metin", ar: "اقْرَأْ", paragraf: [[
  ["لَيْسَتْ هُناكَ مُشْكِلَةٌ في الدِّراسَةِ الجامِعِيَّةِ مِثْلَ الماضي؛ فَالجامِعاتُ كَثيرَةٌ، وَهِيَ في كُلِّ مَكانٍ، وَلكِنَّ المُشْكِلَةَ هِيَ: ماذا يَعْمَلُ الشّابُّ بَعْدَ التَّخَرُّجِ؟", "Üniversite öğreniminde eskisi gibi bir sorun yok; üniversiteler çok ve her yerde. Ama sorun şu: Genç mezun olduktan sonra ne iş yapacak?"],
  ["كانَ الشّابُّ في الماضي يَتَخَرَّجُ؛ فَيَجِدُ العَمَلَ، أَمَّا الآنَ فَلَيْسَ هُناكَ فُرَصٌ كَثيرَةٌ لِلْعَمَلِ.", "Eskiden genç mezun olur ve hemen iş bulurdu; şimdi ise çok iş fırsatı yok."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["مَوْضوعُ هذِهِ الفِقْرَةِ هُوَ …", "مُشْكِلَةُ البَطالَةِ", ["مُشْكِلَةُ الدِّراسَةِ", "مُشْكِلَةُ التَّخَرُّجِ"], "Bu paragrafın konusu …"],
  ["في الماضي …", "الجامِعاتُ قَليلَةٌ وَالعَمَلُ كَثيرٌ", ["العَمَلُ كَثيرٌ وَالجامِعاتُ كَثيرَةٌ", "الجامِعاتُ قَليلَةٌ وَالعَمَلُ قَليلٌ"], "Geçmişte …"],
  ["مَنْ يَجِدُ عَمَلًا سَريعًا؟", "شَبابُ الماضي", ["شَبابُ اليَوْمِ", "لا أَحَدَ"], "Kim çabuk iş bulur(du)?"],
  ["شَبابُ الماضي كانَتْ لَدَيْهِمْ مُشْكِلَةٌ …", "في الدِّراسَةِ الجامِعِيَّةِ", ["بَعْدَ التَّخَرُّجِ", "في العَمَلِ"], "Geçmişin gençlerinin … bir sorunu vardı."]] },
 { t: "metin", baslik: "Üçüncü metin", ar: "اقْرَأْ", paragraf: [[
  ["لَدَيَّ مُشْكِلَةٌ؛ أُريدُ أَنْ أَخْتارَ مِهْنَتي وَحْدي. أَبي يُحِبُّ أَنْ أَكونَ طَبيبًا مِثْلَهُ، أَوْ طَيّارًا مِثْلَ أَخي عَبْدِ اللهِ، لكِنَّ أُمّي تُريدُ أَنْ أَكونَ مُهَنْدِسًا مِثْلَ خالي.", "Bir sorunum var: Mesleğimi kendim seçmek istiyorum. Babam kendisi gibi doktor ya da ağabeyim Abdullah gibi pilot olmamı istiyor; annem ise dayım gibi mühendis olmamı istiyor."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["المُتَحَدِّثُ …", "لا يَعْمَلُ", ["يَعْمَلُ الآنَ طَبيبًا", "يَعْمَلُ مُهَنْدِسًا"], "Konuşan kişi …", "Henüz mesleğini seçmedi."],
  ["والِدُ المُتَحَدِّثِ …", "طَبيبٌ", ["طَيّارٌ", "مُهَنْدِسٌ"], "Konuşanın babası …"],
  ["الجَدُّ يَعْمَلُ …", "مُهَنْدِسًا", ["مُدَرِّسًا", "طَبيبًا"], "Dede … olarak çalışıyor.", "Metinde dede geçmiyor; mühendis olan, konuşanın dayısıdır (خالي). Kitaptaki soru büyük ihtimalle «الخالُ» olmalı."],
  ["يُريدُ المُتَحَدِّثُ أَنْ يَكونَ …", "مُدَرِّسًا", ["مُهَنْدِسًا", "طَيّارًا"], "Konuşan … olmak istiyor.", "Metinde açıkça söylenmiyor; mühendisliği annesi, pilotluğu babası istiyor; o ise mesleğini kendisi seçmek istiyor. Geriye kalan şık “öğretmen”dir."],
  ["عَبْدُ اللهِ يَعْمَلُ في مَجالِ …", "الطَّيَرانِ", ["الطِّبِّ", "التَّعْليمِ"], "Abdullah … alanında çalışıyor."]] },
 { t: "metin", baslik: "Dördüncü metin", ar: "اقْرَأْ", paragraf: [[
  ["يَسْكُنُ كَثيرٌ مِنْ طُلّابِ كُلِّيَّةِ الطِّبِّ خارِجَ الجامِعَةِ، وَبَعْضُ الطُّلّابِ مِنْ كُلِّيَّةِ الصَّيْدَلَةِ يَسْكُنونَ قَريبًا مِنْهُمْ.", "Tıp fakültesi öğrencilerinin çoğu üniversitenin dışında oturuyor; eczacılık fakültesinden bazı öğrenciler de onlara yakın oturuyor."],
  ["وَلكِنَّ الجَميعَ يَحْضُرونَ إِلى الجامِعَةِ بِحافِلَةٍ واحِدَةٍ السّاعَةَ السّابِعَةَ وَالنِّصْفَ؛ قَبْلَ الدِّراسَةِ بِنِصْفِ ساعَةٍ.", "Ama hepsi üniversiteye saat yedi buçukta tek bir otobüsle geliyor; derslerden yarım saat önce."],
  ["طُلّابُ كُلِّيَّةِ الهَنْدَسَةِ الَّذينَ يَسْكُنونَ في بُيوتِ الجامِعَةِ، يَأْتونَ إِلى الدِّراسَةِ مُتَأَخِّرينَ دائِمًا.", "Üniversitenin yurtlarında oturan mühendislik fakültesi öğrencileri ise derse hep geç geliyor."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["يَسْكُنُ … طُلّابِ الطِّبِّ خارِجَ الجامِعَةِ.", "مُعْظَمُ", ["كُلُّ", "بَعْضُ"], "Tıp öğrencilerinin … üniversite dışında oturuyor.", "«كَثيرٌ مِنْ طُلّابِ كُلِّيَّةِ الطِّبِّ»"],
  ["تَبْدَأُ الدِّراسَةُ في كُلِّيَّةِ الطِّبِّ وَكُلِّيَّةِ الصَّيْدَلَةِ السّاعَةَ …", "الثّامِنَةَ", ["السّابِعَةَ وَالنِّصْفَ", "الثّامِنَةَ وَالنِّصْفَ"], "Tıp ve eczacılık fakültelerinde dersler saat … başlıyor.", "Yedi buçuk + yarım saat = sekiz."],
  ["مَنْ يَأْتي بَعْدَ بِدايَةِ الدِّراسَةِ؟", "طُلّابُ كُلِّيَّةِ الهَنْدَسَةِ", ["طُلّابُ كُلِّيَّةِ الصَّيْدَلَةِ", "طُلّابُ كُلِّيَّةِ الطِّبِّ"], "Derslerin başlamasından sonra kim geliyor?"]] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Yapılar ve kurallar", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Yapılar ve kurallar", ozet: "Doğru cümle, hata düzeltme, tekil-ikil-çoğul", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الخَطَإِ", aciklama: "Her çiftte doğru cümleyi seç.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "لَمْ يَنْقُصْ وَزْنُهُ.", ["لَمْ يَنْقُصُ وَزْنُهُ."], "Hangisi doğru?", "لَمْ muzâriyi cezmeder: sükûn."],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "أُريدُ كِتابَ القِراءَةِ.", ["أُريدُ الكِتابَ القِراءَةِ."], "Hangisi doğru?", "Muzâf ال almaz."],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "المُهَنْدِسانِ حَضَرا.", ["المُهَنْدِسانِ حَضَروا."], "Hangisi doğru?", "İkil için elif-i isneyn: حَضَرا."]] },
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Altı çizili kelimenin doğrusunu seç.", ogeler: [
  ["(٤) يا مُحَمَّدُ، لا [[تُسافِرُ]] اليَوْمَ.", "تُسافِرْ", ["تُسافِرَ", "سافَرَ"], "Muhammed, bugün yolculuk etme.", "Nehiy لا’sı cezmeder."],
  ["(٥) انْظُرْ [[هذا]] سَيّارَةٌ.", "هذِهِ", ["هذانِ", "هؤُلاءِ"], "Bak, bu bir araba.", "سَيّارَةٌ dişildir."],
  ["(٦) [[لَمْ]] جاءَ الطَّبيبُ.", "ما", ["لَنْ", "لا"], "Doktor gelmedi.", "Mâzî fiil ما ile olumsuz yapılır: ما جاءَ (ya da لَمْ يَجِئْ)."]] },
 { t: "siniflandir", ar: "ضَعْ كُلَّ كَلِمَةٍ في مَكانِها المُناسِبِ في الجَدْوَلِ", soru: "Tekil mi, ikil mi, çoğul mu?", gruplar: ["مُفْرَدٌ", "مُثَنًّى", "جَمْعٌ"], ogeler: [
  ["بَلَدٌ", 0], ["الشَّهاداتُ", 2], ["يَوْمانِ", 1], ["المَدْرَسَةُ", 0], ["حُكوماتٌ", 2], ["المُسْلِمُ", 0], ["خِبْراتٌ", 2], ["جامِعاتٌ", 2],
  ["القَلَمانِ", 1], ["كُلِّيَّةٌ", 0], ["المُساعَداتُ", 2], ["جامِعَتانِ", 1], ["مُشْكِلَةٌ", 0], ["طالِبانِ", 1], ["كَلِمَتانِ", 1]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Kelimeler", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Kelimeler", ozet: "Boşluk doldurma, tanımlar, birlikte kullanılan kelimeler", bloklar: [
 { t: "bosluk", ar: "امْلَأِ الفَراغَ بِكَلِمَةٍ مِنَ الكَلِماتِ التّالِيَةِ", kutu: ["تُحِبُّ", "تَكْتُبُ", "يَدْرُسُ", "انْتَشَرَ", "تَأْكُلْ", "الدِّراسَةِ", "تَتْرُكْ", "سافَرَ"], ogeler: [
  ["أَرْغَبُ في ___ بِالجامِعَةِ.", "الدِّراسَةِ", null, "Üniversitede okumak istiyorum."], ["مُحَمَّدٌ ___ الطِّبَّ.", "يَدْرُسُ", null, "Muhammed tıp okuyor."], ["___ التَّعْليمُ في كُلِّ مَكانٍ.", "انْتَشَرَ", null, "Eğitim her yere yayıldı."], ["لَمْ ___ زَيْنَبُ وَجْبَةَ الغَداءِ اليَوْمَ.", "تَأْكُلْ", null, "Zeyneb bugün öğle yemeğini yemedi."],
  ["لا ___ الدَّواءَ يا سَعيدُ.", "تَتْرُكْ", null, "İlacı bırakma Saîd."], ["___ بِهذا القَلَمِ.", "تَكْتُبُ", null, "Bu kalemle yazıyorsun."], ["___ أَحْمَدُ لِطَلَبِ العِلْمِ.", "سافَرَ", null, "Ahmed ilim tahsili için yolculuk etti."], ["أَ___ عَمَلَكَ؟", "تُحِبُّ", null, "İşini seviyor musun?"]] },
 { t: "esle", ar: "صِلْ بَيْنَ الكَلِمَةِ وَتَعْريفِها (شَرْحِها)", ciftler: [
  ["الجامِعَةُ", "المَرْحَلَةُ الَّتي تَأْتي بَعْدَ المَرْحَلَةِ الثّانَوِيَّةِ.", "üniversite"], ["جَدَّتي", "والِدَةُ أُمّي أَوْ أَبي.", "ninem"], ["الاغْتِرابُ", "السَّفَرُ إِلى خارِجِ الوَطَنِ لِلْعَمَلِ.", "gurbete gitme"],
  ["التَّلاميذُ", "الأَطْفالُ الَّذينَ يَدْرُسونَ في المَرْحَلَةِ الابْتِدائِيَّةِ.", "öğrenciler"], ["الطَّبيبُ", "الشَّخْصُ الَّذي يُعالِجُ النّاسَ.", "doktor"], ["الحَديقَةُ", "مَكانٌ يَذْهَبُ إِلَيْهِ النّاسُ لِلتَّرْويحِ عَنِ النَّفْسِ.", "bahçe, park"]] },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ تَأْتِيانِ مَعًا", ciftler: [
  ["تُعِدُّ", "الطَّعامَ", "yemek hazırlar"], ["اتَّبِعْ", "الحِمْيَةَ", "perhize uy"], ["يَسْتَيْقِظُ", "مُتَأَخِّرًا", "geç uyanır"], ["يَخْرُجُ", "إِلى البَرِّ", "kıra çıkar"], ["قَرَأَ", "الدَّرْسَ", "dersi okudu"], ["يُهاجِرُ", "لِلْعَمَلِ", "çalışmak için göç eder"]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Yazı", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Yazı", ozet: "İmlâ hatalarını düzelt", bloklar: [
 { t: "secim", ar: "الكَلِماتُ الَّتي تَحْتَها خَطٌّ كُتِبَتْ خَطَأً، صَحِّحْها", aciklama: "Doğru yazılmış şekli seç.", ogeler: [
  ["(١) العالِمُ [[بْنُ]] المُبارَكِ مِنْ عُلَماءِ الإِسْلامِ.", "ابْنُ", ["بْنُ"], "Âlim İbnü’l-Mübârek İslâm âlimlerindendir.", "İki özel isim arasında değil: elif yazılır."],
  ["(٢) تَزَوَّجَ عَلِيُّ [[ابْنُ]] أَبي طالِبٍ فاطِمَةَ بِنْتَ مُحَمَّدٍ ﷺ.", "بْنُ", ["ابْنُ"], "Ali b. Ebî Tâlib, Muhammed’in (s.a.v.) kızı Fâtıma ile evlendi.", "İki özel isim arasında: elif yazılmaz."],
  ["(٣) [[هاذا]] كِتابُ المُسْلِمينَ الأَوَّلُ.", "هذا", ["هاذا"], "Bu Müslümanların ilk kitabıdır."],
  ["(٤) [[ذالِكَ]] كِتابُ القِراءَةِ.", "ذلِكَ", ["ذالِكَ"], "Şu okuma kitabıdır."],
  ["(٥) جاءَ الطُّلّابُ، [[لاكِنْ]] لَمْ يَحْضُرِ الأُسْتاذُ.", "لكِنْ", ["لاكِنْ"], "Öğrenciler geldi, ama hoca gelmedi."],
  ["(٦) [[هاكَذا]] قالَ المُديرُ.", "هكَذا", ["هاكَذا"], "Müdür böyle dedi."],
  ["(٧) ما [[إِسْمُكَ]]؟", "اسْمُكَ", ["إِسْمُكَ"], "Adın ne?", "Vasl hemzesi: hemzesiz elif."],
  ["(٨) أَسْلَمَ [[عَمْرُ]] بْنُ العاصِ مَعَ خالِدِ بْنِ الوَليدِ.", "عَمْرُو", ["عَمْرُ"], "Amr b. Âs, Hâlid b. Velîd ile birlikte müslüman oldu.", "عَمْرو sonunda okunmayan bir vav ile yazılır (عُمَر’dan ayırmak için)."]] }
]}
];
var KELIME = [];
