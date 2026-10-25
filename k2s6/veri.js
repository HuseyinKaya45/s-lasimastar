// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ٦ (الوَحْدَتانِ ١١ - ١٢) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "11–12", ar: "اخْتَبِرْ نَفْسَكَ ٦", tr: "Kendini sına 6 · 11. ve 12. üniteler", pfx: "k2s6:", sinavYok: true, sonuc: true,
  giris: "Kitabın 11. ve 12. üniteden sonraki öz değerlendirme sınavı: okuma, yapılar ve kurallar, kelimeler, yazı. Her bölümü çöz; cevabın hemen kontrol edilir, toplam sonucun bu sayfanın altında görünür." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Okuma", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Okuma", ozet: "Üç metin; 15 soru", bloklar: [
 { t: "metin", baslik: "Birinci metin", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["«لا تَنْسَ أَنَّ ابْنَنا الآنَ في مَرْحَلَةِ المُراهَقَةِ، وَلا بُدَّ أَنْ تُعامِلَهُ بِحِكْمَةٍ، وَلا تَنْسَ أَنَّ أَخي مُحَمَّدًا نَصَحَكَ بِأَنْ تَتَحاوَرَ مَعَ عَدْنانَ، وَأَنْ تَحْتَرِمَ آراءَهُ».", "“Oğlumuzun şimdi ergenlik döneminde olduğunu unutma; ona hikmetle davranmalısın. Kardeşim Muhammed’in de sana Adnân’la konuşup tartışmanı ve görüşlerine saygı duymanı öğütlediğini unutma.”"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["المُتَحَدِّثُ …", "زَوْجَةٌ", ["زَوْجٌ", "صَديقٌ"], "Konuşan kişi … .", "“Oğlumuz” ve “kardeşim Muhammed sana öğüt verdi” diyen, babaya konuşan annedir."],
  ["الابْنُ عُمْرُهُ …", "سِتَّ عَشْرَةَ سَنَةً", ["ثَلاثونَ سَنَةً", "عَشْرُ سَنَواتٍ"], "Oğlun yaşı … .", "Ergenlik çağı."],
  ["مَنْ نَصَحَ الأَبَ بِأَنْ يَتَحاوَرَ مَعَ وَلَدِهِ؟", "الخالُ", ["الزَّوْجَةُ", "عَدْنانُ"], "Babaya oğluyla konuşmasını kim öğütledi?", "Annenin kardeşi, çocuğun dayısıdır (خال)."]] },
 { t: "metin", baslik: "İkinci metin", ar: "اقْرَأْ", paragraf: [[
  ["انْقادَتِ الشُّعوبُ إِلى هذا الدّينِ؛ لِأَنَّهُ يَدْعو إِلى رَفْعِ الظُّلْمِ عَنِ الأَفْرادِ وَالمُجْتَمَعاتِ، وَدَخَلوا فيهِ رَغْبَةً لا رَهْبَةً، فَوَجَدوا فيهِ المُساواةَ بَيْنَ النّاسِ جَميعًا، وَإِنِ اخْتَلَفَتْ أَلْوانُهُمْ وَلُغاتُهُمْ وَبيئاتُهُمْ.", "Halklar bu dine boyun eğdi; çünkü o, bireylerden ve toplumlardan zulmün kaldırılmasına çağırır. Ona korkuyla değil isteyerek girdiler ve renkleri, dilleri ve çevreleri farklı da olsa onda bütün insanlar arasında eşitlik buldular."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["يَدْعو هذا الدّينُ إِلى مُحارَبَةِ …", "الظُّلْمِ", ["العَدْلِ", "المُساواةِ"], "Bu din … ile mücadeleye çağırır."],
  ["دَخَلَ النّاسُ في هذا الدّينِ …", "حُبًّا فيهِ", ["خَوْفًا مِنْهُ", "رَهْبَةً مِنْهُ"], "İnsanlar bu dine … girdi.", "رَغْبَةً لا رَهْبَةً: isteyerek, korkuyla değil."],
  ["أَهْلُ هذا الدّينِ تَخْتَلِفُ …", "أَلْوانُهُمْ وَلُغاتُهُمْ وَأَماكِنُهُمْ", ["لُغاتُهُمْ وَبيئاتُهُمْ وَرِسالاتُهُمْ", "أَلْوانُهُمْ وَلُغاتُهُمْ وَتَعْليمُهُمْ"], "Bu dinin mensuplarının … farklıdır.", "Metindeki بيئاتُهُمْ (çevreleri) burada أَماكِنُهُمْ (yerleri) ile ifade edilmiş."],
  ["في هذا الدّينِ مُساواةٌ بَيْنَ …", "الإِنْسانِ وَالإِنْسانِ", ["السُّكّانِ وَالشُّعوبِ", "الأَصْحابِ وَالأَصْدِقاءِ"], "Bu dinde … arasında eşitlik vardır."]] },
 { t: "metin", baslik: "Üçüncü metin", ar: "اقْرَأْ ما يَلي، ثُمَّ ضَعْ عَلامَةَ (✓) أَوْ (✗)", paragraf: [
  [["في العَصْرِ الحَديثِ، زادَ عَدَدُ المَراكِزِ الإِسْلامِيَّةِ وَالمَساجِدِ في المُدُنِ الأوروبِّيَّةِ؛ فَقَدْ زادَ عَدَدُ المُسْلِمينَ، وَرَجَعوا إِلى دينِهِمْ مَرَّةً أُخْرى، بَعْدَ أَنْ هَجَروهُ زَمانًا طَويلًا. احْتاجَ المُسْلِمونَ في كَثيرٍ مِنَ الدُّوَلِ، إِلى أَنْ يَعْرِفوا كَثيرًا عَنْ دينِهِمْ، وَأَنْ يَفْهَموهُ فَهْمًا صَحيحًا. وَلِيَفْهَموا القُرْآنَ جَيِّدًا، رَغِبوا في تَعَلُّمِ لُغَةِ القُرْآنِ.", "Modern çağda Avrupa şehirlerinde İslâm merkezlerinin ve camilerin sayısı arttı; çünkü müslümanların sayısı arttı ve uzun zaman terk ettikten sonra yeniden dinlerine döndüler. Birçok ülkedeki müslümanlar dinlerini daha çok tanımaya ve doğru anlamaya ihtiyaç duydu. Kur’ân’ı iyi anlamak için de Kur’ân’ın dilini öğrenmek istediler."]],
  [["في مَدينَةِ لَنْدَنَ مَرْكَزٌ إِسْلامِيٌّ، فيهِ مَسْجِدٌ كَبيرٌ، وَفيهِ أَيْضًا مَكْتَبَةٌ كَبيرَةٌ يَزورُها كُلُّ مَنْ يَرْغَبُ مِنَ المُسْلِمينَ وَغَيْرِ المُسْلِمينَ. وَيَقومُ هذا المَرْكَزُ بِتَعْليمِ اللُّغَةِ العَرَبِيَّةِ لِأَبْناءِ المُسْلِمينَ مِنَ المُواطِنينَ وَالمُهاجِرينَ.", "Londra şehrinde bir İslâm merkezi var; içinde büyük bir cami ve müslüman olsun olmasın isteyen herkesin ziyaret ettiği büyük bir kütüphane de var. Bu merkez, yerli ve göçmen müslümanların çocuklarına Arapça öğretir."]],
  [["في هذِهِ المَراكِزِ، يَجْتَمِعُ المُسْلِمونَ في أَيّامِ الجُمَعِ، وَفي عيدِ الفِطْرِ، وَعيدِ الأَضْحى وَيَتَعارَفونَ، وَيَتَحَدَّثونَ في أُمورِ الحَياةِ وَالدّينِ، وَالأَحْوالِ العامَّةِ وَالخاصَّةِ، وَيَسْتَمِعونَ إِلى المُحاضَراتِ وَالنَّدَواتِ.", "Bu merkezlerde müslümanlar cuma günleri, Ramazan ve Kurban bayramlarında toplanır, tanışır; hayat ve din işleri, genel ve özel durumlar hakkında konuşur; konferans ve seminerler dinler."]]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗)", ogeler: [
  ["زادَ عَدَدُ المُسْلِمينَ في أوروبّا.", true, "", "Avrupa’da müslümanların sayısı arttı."],
  ["تَرَكَ المُسْلِمونَ دينَهُمْ مُدَّةً مِنَ الزَّمانِ.", true, "", "Müslümanlar bir süre dinlerini terk etti."],
  ["رَغِبَ المُسْلِمونَ في تَعَلُّمِ اللُّغاتِ لِيَفْهَموا القُرْآنَ.", false, "رَغِبَ المُسْلِمونَ في تَعَلُّمِ لُغَةِ القُرْآنِ لِيَفْهَموهُ.", "Müslümanlar Kur’ân’ı anlamak için dilleri öğrenmek istedi."],
  ["لا يُمْنَعُ غَيْرُ المُسْلِمينَ مِنْ دُخولِ مَكْتَبَةِ المَرْكَزِ.", true, "", "Müslüman olmayanlar merkezin kütüphanesine girmekten men edilmez."],
  ["يَتَحَدَّثُ المُسْلِمونَ في أُمورِ السِّياسَةِ في العيدِ.", false, "يَتَحَدَّثُ المُسْلِمونَ في أُمورِ الحَياةِ وَالدّينِ في العيدِ.", "Müslümanlar bayramda siyaset konuşur."],
  ["هُناكَ نَدَواتٌ في المَراكِزِ في أَيّامِ العيدِ.", true, "", "Bayram günlerinde merkezlerde seminerler olur."],
  ["في مَسْجِدِ لَنْدَنَ مَرْكَزٌ إِسْلامِيٌّ كَبيرٌ.", false, "في مَرْكَزِ لَنْدَنَ الإِسْلامِيِّ مَسْجِدٌ كَبيرٌ.", "Londra camisinde büyük bir İslâm merkezi var."],
  ["في مَرْكَزِ لَنْدَنَ الإِسْلامِيِّ يَتَعَلَّمُ الطُّلّابُ اللُّغَةَ العَرَبِيَّةَ.", true, "", "Londra İslâm merkezinde öğrenciler Arapça öğrenir."]] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Yapılar ve kurallar", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Yapılar ve kurallar", ozet: "Doğru cümle, hata düzeltme, bitişik mansûb zamirler", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الجُمْلَةِ الَّتي فيها خَطَأٌ", aciklama: "Her çiftte doğru cümleyi seç.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "سَأُقيمُ هُنا ثَلاثَةَ أَشْهُرٍ.", ["سَأُقيمُ هُنا ثَلاثَةَ شَهْرٍ."], "Hangisi doğru?", "3-10 sayılarının temyizi çoğul ve mecrûrdur."],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "الطّالِباتُ ناجِحاتٌ، إِنْ شاءَ اللهُ.", ["الطّالِباتُ ناجِحَةٌ، إِنْ شاءَ اللهُ."], "Hangisi doğru?", "Haber mübtedaya sayıda uyar."],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "لي ثَلاثَةُ أَبْناءٍ.", ["لي ثَلاثُ أَبْناءٍ."], "Hangisi doğru?", "Sayı (3-10) temyizin tekiline cinsiyette zıt olur: اِبْنٌ müzekker ← ثَلاثَةُ."],
  ["(٤) أَيُّهُما صَحيحَةٌ؟", "لَمْ أُصَلِّ في البَيْتِ.", ["لَمْ أُصَلّي في البَيْتِ."], "Hangisi doğru?", "Sonu illetli fiil cezmedilince illet harfi düşer."]] },
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Altı çizili kelimenin doğrusunu seç.", ogeler: [
  ["(١) إِنَّ [[مُحَمَّدٌ]] طالِبٌ جَديدٌ.", "مُحَمَّدًا", ["مُحَمَّدٍ", "مُحَمَّدُ"], "Muhammed yeni bir öğrencidir.", "إِنَّ isminin mansûb olmasını gerektirir."],
  ["(٢) هذا شابٌّ [[القَوِيُّ]].", "قَوِيٌّ", ["القَوِيَّ", "قَوِيًّا"], "Bu güçlü bir genç.", "Nekre men‘ût nekre na‘t alır."],
  ["(٣) عِنْدَكُما ما [[تُريدونَ]].", "تُريدانِ", ["تُريدينَ", "تُريدُ"], "İstediğiniz (ikiniz) yanınızda.", "كُما: ikil."],
  ["(٤) يا زَيْنَبُ هَلْ [[فَحَصَتْكُما]] الطَّبيبَةُ؟", "فَحَصَتْكِ", ["فَحَصَتْكَ", "فَحَصَتْكُنَّ"], "Zeyneb, doktor seni muayene etti mi?", "Tek kadına hitap: كِ."]] },
 { t: "siniflandir", ar: "ضَعْ ضَميرَ النَّصْبِ المُتَّصِلَ في مَكانِهِ المُناسِبِ مِنَ الجَدْوَلِ", soru: "Bitişik mansûb zamir hangisi?", gruplar: ["ضَميرُ المُتَكَلِّمِ", "ضَميرُ المُخاطَبِ", "ضَميرُ الغائِبِ"], ogeler: [
  ["فَحَصَني", 0], ["أَخَذَكَ", 1], ["أَعارَها", 2], ["أَسْعَدَنا", 0], ["أَعَدَّهُنَّ", 2], ["أَفْسَدَكُما", 1], ["أَنْشَأَهُما", 2], ["اتَّبَعَني", 0], ["احْتَرَمَكُنَّ", 1],
  ["اسْتَعْمَلَهُمْ", 2], ["بَعَثَني", 0], ["حَمَلَنا", 0], ["حارَبَكَ", 1], ["حاوَرَهُ", 2], ["جَزاكِ", 1], ["قابَلَني", 0], ["تَرَكْتُها", 2], ["زادَكُمْ", 1]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Kelimeler", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Kelimeler", ozet: "Tekil-çoğul, eş anlamlılar, zıt anlamlılar", bloklar: [
 { t: "esle", ar: "صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", ciftler: [
  ["حاسوبٌ", "حَواسيبُ", "bilgisayar"], ["دَوْلَةٌ", "دُوَلٌ", "devlet"], ["رِسالَةٌ", "رَسائِلُ", "mektup, mesaj"], ["شابٌّ", "شَبابٌ", "genç"], ["سَبَبٌ", "أَسْبابٌ", "sebep"], ["فائِدَةٌ", "فَوائِدُ", "fayda"], ["بيئَةٌ", "بيئاتٌ", "çevre"], ["مَزْرَعَةٌ", "مَزارِعُ", "çiftlik"]] },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ لَهُما مَعْنًى واحِدٌ", ciftler: [
  ["النّاسُ", "البَشَرُ", "insanlar"], ["الرُّسُلُ", "المُرْسَلونَ", "elçiler"], ["بَعَثَ", "أَرْسَلَ", "gönderdi"], ["أَبي", "والِدي", "babam"], ["تَلاميذُ", "طُلّابٌ", "öğrenciler"], ["أَصْحابٌ", "أَصْدِقاءُ", "arkadaşlar"]] },
 { t: "bosluk", ar: "أَكْمِلْ بِوَضْعِ المُقابِلِ (المُضادِّ) لِلْكَلِمَةِ الَّتي تَحْتَها خَطٌّ", ogeler: [
  ["[[وَجَدْتُ]] الحَقيبَةَ، وَ___ المِفْتاحَ.", "أَضَعْتُ", ["أَخَذْتُ", "فَتَحْتُ"], "Çantayı buldum, anahtarı kaybettim."],
  ["___ أَخي قَبْلَ أَنْ [[يَخْرُجَ]] صَديقي.", "دَخَلَ", ["نامَ", "جَلَسَ"], "Arkadaşım çıkmadan önce kardeşim girdi."],
  ["لَدَيَّ [[أَكْثَرُ]] مِنْ خَمْسينَ رِيالًا، وَلَدَيْكَ ___ مِنْ ثَلاثينَ دينارًا.", "أَقَلُّ", ["أَكْبَرُ", "أَحْسَنُ"], "Bende elli riyalden fazla, sende otuz dinardan az var."],
  ["قَرَأْتُ الصُّحُفَ [[الأَجْنَبِيَّةَ]]، وَالصُّحُفَ ___.", "العَرَبِيَّةَ", ["اليَوْمِيَّةَ", "الكَثيرَةَ"], "Yabancı gazeteleri ve Arapça gazeteleri okudum.", "Yerli gazeteler (المَحَلِّيَّةَ) de doğru kabul edilebilir."],
  ["الإِسْلامُ يَدْعو إِلى [[العَدْلِ]]، وَلا يَدْعو إِلى ___.", "الظُّلْمِ", ["المُساواةِ", "الحَقِّ"], "İslâm adalete çağırır, zulme çağırmaz."],
  ["أَنا [[سَمينٌ]] جِدًّا، وَأُريدُ أَنْ أَكونَ ___.", "نَحيفًا", ["طَويلًا", "قَوِيًّا"], "Ben çok şişmanım, zayıf olmak istiyorum."]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Yazı", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Yazı", ozet: "İmlâ hataları ve soru cümlesi kurma", bloklar: [
 { t: "secim", ar: "الكَلِماتُ الَّتي تَحْتَها خَطٌّ كُتِبَتْ خَطَأً، فَاكْتُبْها صَحيحَةً", aciklama: "Doğru yazılışı seç.", ogeler: [
  ["(١) أُريدُ [[ماءًا]].", "ماءً", ["ماءًا", "ماآ"], "Su istiyorum.", "Hemzeyle biten kelimede mansûb tenvinin elifi yazılmaz."],
  ["(٢) المُسْلِمونَ [[صَلّو]] صَلاةَ العيدِ.", "صَلَّوْا", ["صَلّو", "صَلّوا"], "Müslümanlar bayram namazını kıldı.", "Cemaat vavından sonra elif yazılır."],
  ["(٣) الإِسْلامُ [[يَدْعوا]] إِلى الحَقِّ.", "يَدْعو", ["يَدْعوا", "يَدْعُ"], "İslâm hakka çağırır.", "Fiilin aslındaki vavdan sonra elif yazılmaz."],
  ["(٤) [[هاذا]] كِتابٌ جَديدٌ في الهَنْدَسَةِ.", "هذا", ["هاذا", "هَاذَى"], "Bu mühendislik hakkında yeni bir kitap.", "Okunup yazılmayan elif."],
  ["(٥) المُسافِرونَ لَمْ [[يَرْجِعو]].", "يَرْجِعوا", ["يَرْجِعو", "يَرْجِعونَ"], "Yolcular dönmedi.", "Cemaat vavından sonra elif yazılır."],
  ["(٦) [[يَشْكوا]] الشَّبابُ مِنَ المُجْتَمَعِ.", "يَشْكو", ["يَشْكوا", "يَشْكُ"], "Gençler toplumdan şikâyet ediyor.", "Fiilin aslındaki vavdan sonra elif yazılmaz."],
  ["(٧) غَيِّرْ أُسْلوبَكَ مَعَ [[اِينِكَ]].", "ابْنِكَ", ["اِينِكَ", "إِبْنِكَ"], "Oğluna karşı tutumunu değiştir.", "اِبْن: vasl hemzesi, nokta altta tek (ب)."],
  ["(٨) هذِهِ [[سَيّاراةٌ]] يابانِيَّةٌ.", "سَيّارَةٌ", ["سَيّاراةٌ", "سَيّارَتٌ"], "Bu bir Japon arabası."]] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ، لِتُصْبِحَ جُمَلًا اسْتِفْهامِيَّةً", aciklama: "(١) أَفْهَمُ - كَيْفَ - الإِسْلامَ - صَحيحًا - فَهْمًا", ogeler: ["كَيْفَ", "أَفْهَمُ", "الإِسْلامَ", "فَهْمًا", "صَحيحًا؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٢) الإِسْلامُ - دينُ - هَلْ - وَحْدَهُمْ - العَرَبِ", ogeler: ["هَلْ", "الإِسْلامُ", "دينُ", "العَرَبِ", "وَحْدَهُمْ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٣) النَّبَوِيَّةَ - الأَحاديثِ - بَعْضَ - قَرَأْتَ - هَلْ", ogeler: ["هَلْ", "قَرَأْتَ", "بَعْضَ", "الأَحاديثِ", "النَّبَوِيَّةِ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤) الشُّعوبُ - وَجَدَتْ - ماذا - الإِسْلامِ - في", ogeler: ["ماذا", "وَجَدَتِ", "الشُّعوبُ", "في", "الإِسْلامِ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٥) البَيْتِ - يا مُحَمَّدُ - تَخْرُجُ - مِنَ - مَتى", ogeler: ["مَتى", "تَخْرُجُ", "مِنَ", "البَيْتِ", "يا مُحَمَّدُ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٦) المُجْتَمَعُ - يَحْتاجُ - شَيْءٍ - أَيِّ - إِلى", ogeler: ["إِلى", "أَيِّ", "شَيْءٍ", "يَحْتاجُ", "المُجْتَمَعُ؟"] }
]}
];
var KELIME = [];
