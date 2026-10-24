/* ===== VERİ: Cürcânî, el-Avâmilü'l-Mie — "Tavdîhu metni'l-Avâmili'l-Mie" (1442/2021) esas alınmıştır =====
   Örnek alanları: s = cümle, t = Türkçe, a = âmil (cümlede geçtiği biçim), m = ma'mûl(ler), q = âyet/hadis/şiir etiketi */
const AMEL = {
  jar:  {tr:"Cer eder", short:"Cer", ar:"يَجُرُّ"},
  in:   {tr:"İsmi nasb, haberi ref' eder", short:"İsim nasb · haber ref'", ar:"يَنْصِبُ الِاسْمَ وَيَرْفَعُ الْخَبَرَ"},
  ls:   {tr:"İsmi ref', haberi nasb eder", short:"İsim ref' · haber nasb", ar:"يَرْفَعُ الِاسْمَ وَيَنْصِبُ الْخَبَرَ"},
  ism:  {tr:"Tek bir ismi nasb eder", short:"İsmi nasb", ar:"يَنْصِبُ الِاسْمَ"},
  nasb: {tr:"Muzâriyi nasb eder", short:"Muzâri nasb", ar:"يَنْصِبُ الْمُضَارِعَ"},
  jazm: {tr:"Muzâriyi cezm eder", short:"Muzâri cezm", ar:"يَجْزِمُ الْمُضَارِعَ"},
  tam:  {tr:"Temyîzi nasb eder", short:"Temyîz nasb", ar:"يَنْصِبُ التَّمْيِيزَ"},
  if:   {tr:"Ism-i fiil: ref' veya nasb eder", short:"Ref' / nasb", ar:"يَرْفَعُ أَوْ يَنْصِبُ"},
  md:   {tr:"Elif-lâmlı cins ismini ref' eder", short:"Ref'", ar:"يَرْفَعُ اسْمَ الْجِنْسِ"},
  qul:  {tr:"İki ismi (mübtedâ ve haber) nasb eder", short:"İki mef'ûl nasb", ar:"يَنْصِبُ الِاسْمَيْنِ"},
  rn:   {tr:"Ref' ve nasb eder", short:"Ref' · nasb", ar:"يَرْفَعُ وَيَنْصِبُ"},
  raf:  {tr:"Ref' eder", short:"Ref'", ar:"يَرْفَعُ"}
};

const BOOK = {
 title:"تَوْضِيحُ مَتْنِ الْعَوَامِلِ الْمِئَةِ لِلْجُرْجَانِيِّ",
 author:"الْإِمَامُ عَبْدُ الْقَاهِرِ بْنُ عَبْدِ الرَّحْمَنِ بْنِ مُحَمَّدٍ الْجُرْجَانِيُّ الشَّافِعِيُّ",
 authorTr:"İmam Abdülkâhir b. Abdurrahmân b. Muhammed el-Cürcânî eş-Şâfiî (ö. 471/1078)",
 date:"Şevval 1442 / Haziran 2021",
 khutba:"الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى مُحَمَّدٍ، وَآلِهِ وَصَحْبِهِ أَجْمَعِينَ. أَمَّا بَعْدُ: فَإِنَّ الْعَوَامِلَ فِي النَّحْوِ -عَلَى مَا أَلَّفَهُ الشَّيْخُ الْإِمَامُ عَبْدُ الْقَاهِرِ بْنُ عَبْدِ الرَّحْمَنِ الْجُرْجَانِيُّ، رَحْمَةُ اللهِ تَعَالَى عَلَيْهِ- مِئَةُ عَامِلٍ. وَهِيَ تَنْقَسِمُ إِلَى قِسْمَيْنِ: لَفْظِيَّةٍ، وَمَعْنَوِيَّةٍ، فَاللَّفْظِيَّةُ مِنْهَا: تَنْقَسِمُ إِلَى قِسْمَيْنِ: سَمَاعِيَّةٍ، وَقِيَاسِيَّةٍ، فَالسَّمَاعِيَّةُ مِنْهَا: أَحَدٌ وَتِسْعُونَ عَامِلًا، وَالْقِيَاسِيَّةُ مِنْهَا: سَبْعَةُ عَوَامِلَ، وَالْمَعْنَوِيَّةُ مِنْهَا: عَدَدَانِ، فَالْجُمْلَةُ: مِئَةُ عَامِلٍ.",
 khutbaTr:"Hamd âlemlerin Rabbi Allah'a; salât ve selâm Muhammed'e, âline ve ashabının hepsine olsun. Şeyh İmam Abdülkâhir el-Cürcânî'nin telifine göre nahivdeki âmiller yüz tanedir. İki kısma ayrılır: lafzî ve ma'nevî. Lafzî olanlar da ikiye ayrılır: semâî ve kıyâsî. Semâî olanlar 91, kıyâsî olanlar 7, ma'nevî olanlar 2 âmildir. Toplam yüz âmil eder.",
 intro:"Arapça, Kur'an'ın, ibadetlerin ve İslâmî ilimlerin dilidir; onu bilmek Kur'an, Sünnet ve şer'î ilimleri anlamanın en önemli araçlarındandır. Arapça nahiv, sarf ve belâgattan oluşur; en büyük rüknü nahivdir. Nahivdeki muhtasar metinlerin öne çıkanlarından biri, özellikle mübtedîler için büyük önem taşıyan Cürcânî'nin el-Avâmilü'l-Mie'sidir. Tavdîh'in hazırlayıcısı metni önce ezberi kolaylaşsın diye renkli yazmış, sonra tablolar, şemalar ve bol misalle açıklamıştır."
};

/* ===== İSTASYONLAR (13 semâî nev' + kıyâsî + ma'nevî) ===== */
const STATIONS = [
{id:"s1", kind:"semai", h:352, amel:"jar", ar:"حُرُوفٌ تَجُرُّ الِاسْمَ الْوَاحِدَ", tr:"Cer Harfleri", sub:"Tek bir ismi cerr eden 17 harf",
 matn:"النَّوْعُ الْأَوَّلُ: حُرُوفٌ تَجُرُّ الِاسْمَ فَقَطْ، وَهِيَ سَبْعَةَ عَشَرَ حَرْفًا.",
 trIntro:"Bu harfler yalnızca isme girer ve onu cerr eder: ismin sonu esre (ـِ) ya da tenvinli esre (ـٍ) olur. Her harfin birden fazla manası vardır; bâ'nın sekiz, min'in dört manası gibi.",
 items:[
 {ar:"الْبَاءُ", tr:"Bâ (بِـ)", m:[
  {ar:"لِلْإِلْصَاقِ", tr:"İlsâk: bitişme, temas", ex:[{s:"مَرَرْتُ بِزَيْدٍ", t:"Zeyd'in yanından geçtim.", a:"بِ"},{s:"طُفْتُ بِالْكَعْبَةِ", t:"Kâbe'yi tavaf ettim.", a:"بِ"},{s:"أَمْسَكْتُ بِاللِّصِّ", t:"Hırsızı yakaladım.", a:"بِ"}]},
  {ar:"لِلتَّعْدِيَةِ", tr:"Ta'diye: fiili geçişli yapma", ex:[{s:"ذَهَبْتُ بِزَيْدٍ", t:"Zeyd'i götürdüm.", a:"بِ"},{s:"ذَهَبَ اللهُ بِنُورِهِمْ", q:"Bakara 2/17", t:"Allah onların nurunu giderdi.", a:"بِ"}]},
  {ar:"لِلِاسْتِعَانَةِ", tr:"İsti'âne: araç, vasıta", ex:[{s:"كَتَبْتُ بِالْقَلَمِ", t:"Kalemle yazdım.", a:"بِ"},{s:"قَطَعْتُ بِالسِّكِّينِ", t:"Bıçakla kestim.", a:"بِ"},{s:"فَتَحْتُ الْبَابَ بِالْمِفْتَاحِ", t:"Kapıyı anahtarla açtım.", a:"بِ"}]},
  {ar:"لِلْمُصَاحَبَةِ", tr:"Musâhabe: beraberlik", ex:[{s:"دَخَلْتُ عَلَيْهِ بِثِيَابِ السَّفَرِ", t:"Yanına yol elbisesiyle girdim.", a:"بِ"},{s:"اهْبِطْ بِسَلَامٍ مِنَّا", q:"Hûd 11/48", t:"Bizden bir selâmetle in.", a:"بِ"}]},
  {ar:"لِلْمُقَابَلَةِ", tr:"Mukâbele: karşılık, bedel", ex:[{s:"بِعْتُ هَذَا بِهَذَا", t:"Bunu buna karşılık sattım.", a:"بِ"},{s:"بَاعَ الرَّجُلُ الْبَيْتَ بِالسَّيَّارَةِ", t:"Adam evi arabaya karşılık sattı.", a:"بِ"}]},
  {ar:"لِلزِّيَادَةِ", tr:"Zâide: te'kîd için fazladan", ex:[{s:"وَكَفَى بِاللهِ شَهِيدًا", q:"Nisâ 4/79", t:"Şahit olarak Allah yeter.", a:"بِ"},{s:"هَلْ زَيْدٌ بِقَائِمٍ", t:"Zeyd ayakta mı?", a:"بِ"}]},
  {ar:"لِلظَّرْفِيَّةِ", tr:"Zarfiyet: -de/-da (yer, zaman)", ex:[{s:"صَلَّيْتُ بِالْمَسْجِدِ", t:"Mescitte namaz kıldım.", a:"بِ"},{s:"وَلَقَدْ نَصَرَكُمُ اللهُ بِبَدْرٍ", q:"Âl-i İmrân 3/123", t:"Allah size Bedir'de yardım etti.", a:"بِ"}]},
  {ar:"لِلْقَسَمِ", tr:"Kasem: yemin", ex:[{s:"بِاللهِ لَأَفْعَلَنَّ كَذَا", t:"Allah'a yemin olsun, şunu mutlaka yapacağım.", a:"بِ"},{s:"بِاللهِ لَأُذَاكِرَنَّ", t:"Allah'a yemin olsun, mutlaka ders çalışacağım.", a:"بِ"}]}]},
 {ar:"مِنْ", tr:"Min", m:[
  {ar:"لِابْتِدَاءِ الْغَايَةِ", tr:"Başlangıç: -den/-dan", ex:[{s:"سِرْتُ مِنَ الْبَصْرَةِ إِلَى الْكُوفَةِ", t:"Basra'dan Kûfe'ye yürüdüm.", a:"مِنَ"},{s:"خَرَجَ الطُّلَّابُ مِنَ الْمَدْرَسَةِ", t:"Öğrenciler okuldan çıktı.", a:"مِنَ"}]},
  {ar:"لِلتَّبْعِيضِ", tr:"Teb'îz: bir kısmı", ex:[{s:"أَخَذْتُ مِنَ الْمَالِ", t:"Maldan (bir kısmını) aldım.", a:"مِنَ"},{s:"شَرِبْتُ مِنَ الْمَاءِ", t:"Sudan (biraz) içtim.", a:"مِنَ"}]},
  {ar:"لِلتَّبْيِينِ", tr:"Tebyîn: cinsini açıklama", ex:[{s:"فَاجْتَنِبُوا الرِّجْسَ مِنَ الْأَوْثَانِ", q:"Hac 22/30", t:"Putlardan olan pislikten kaçının.", a:"مِنَ"},{s:"لَهُ سَاعَةٌ مِنْ فِضَّةٍ", t:"Onun gümüşten bir saati var.", a:"مِنْ"}]},
  {ar:"لِلزِّيَادَةِ", tr:"Zâide: te'kîd", ex:[{s:"مَا جَاءَنِي مِنْ أَحَدٍ", t:"Bana hiç kimse gelmedi.", a:"مِنْ"},{s:"هَلْ مِنْ سُؤَالٍ", t:"Hiç soru var mı?", a:"مِنْ"}]}]},
 {ar:"إِلَى", tr:"İlâ", m:[
  {ar:"لِانْتِهَاءِ الْغَايَةِ", tr:"Bitiş: -e kadar", ex:[{s:"سِرْتُ مِنَ الْبَصْرَةِ إِلَى الْكُوفَةِ", t:"Basra'dan Kûfe'ye yürüdüm.", a:"إِلَى"},{s:"ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ", q:"Bakara 2/187", t:"Sonra orucu geceye kadar tamamlayın.", a:"إِلَى"},{s:"ذَهَبَ مُحَمَّدٌ إِلَى الْجَامِعَةِ", t:"Muhammed üniversiteye gitti.", a:"إِلَى"}]},
  {ar:"بِمَعْنَى (مَعَ)", tr:"Beraber (maa) manasında", ex:[{s:"فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ", q:"Mâide 5/6", t:"Yüzlerinizi ve dirseklerinizle birlikte ellerinizi yıkayın.", a:"إِلَى"},{s:"مَنْ أَنْصَارِي إِلَى اللهِ", q:"Âl-i İmrân 3/52", t:"Allah ile beraber yardımcılarım kimdir?", a:"إِلَى"}]}]},
 {ar:"فِي", tr:"Fî", m:[
  {ar:"لِلظَّرْفِيَّةِ الْحَقِيقِيَّةِ", tr:"Gerçek zarfiyet: içinde", ex:[{s:"الْمَالُ فِي الْكِيسِ", t:"Para kesenin içinde.", a:"فِي"},{s:"إِنَّ الْمُتَّقِينَ فِي جَنَّاتٍ وَعُيُونٍ", q:"Zâriyât 51/15", t:"Takvâ sahipleri cennetlerde ve pınarlardadır.", a:"فِي"}]},
  {ar:"لِلظَّرْفِيَّةِ الْمَجَازِيَّةِ", tr:"Mecazî zarfiyet", ex:[{s:"نَظَرْتُ فِي الْكِتَابِ", t:"Kitaba (içeriğine) baktım.", a:"فِي"},{s:"النَّجَاةُ فِي الصِّدْقِ", t:"Kurtuluş doğruluktadır.", a:"فِي"},{s:"الْعِزُّ فِي طَاعَةِ اللهِ", t:"İzzet Allah'a itaattedir.", a:"فِي"}]},
  {ar:"بِمَعْنَى (عَلَى)", tr:"Üzerinde (alâ) manasında", ex:[{s:"وَلَأُصَلِّبَنَّكُمْ فِي جُذُوعِ النَّخْلِ", q:"Tâhâ 20/71", t:"Sizi hurma dallarının üzerine asacağım.", a:"فِي"}]}]},
 {ar:"حَتَّى", tr:"Hattâ", m:[
  {ar:"لِانْتِهَاءِ الْغَايَةِ", tr:"Bitiş: -e kadar, hatta", ex:[{s:"أَكَلْتُ السَّمَكَةَ حَتَّى رَأْسِهَا", t:"Balığı başına kadar yedim.", a:"حَتَّى"},{s:"سَلَامٌ هِيَ حَتَّى مَطْلَعِ الْفَجْرِ", q:"Kadr 97/5", t:"O gece, tan yerinin ağarmasına kadar bir esenliktir.", a:"حَتَّى"},{s:"سِرْتُ حَتَّى غُرُوبِ الشَّمْسِ", t:"Güneş batana kadar yürüdüm.", a:"حَتَّى"}]}]},
 {ar:"اللَّامُ", tr:"Lâm (لِـ)", m:[
  {ar:"لِلتَّمْلِيكِ", tr:"Temlîk: mülkiyet", ex:[{s:"الْمَالُ لِزَيْدٍ", t:"Mal Zeyd'indir.", a:"لِ"},{s:"لِلّٰهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ", q:"Bakara 2/284", t:"Göklerde ve yerde ne varsa Allah'ındır.", a:"لِ"},{s:"السَّيَّارَةُ لِحَامِدٍ", t:"Araba Hâmid'indir.", a:"لِ"}]},
  {ar:"لِلتَّخْصِيصِ", tr:"Tahsîs: aidiyet, özgülük", ex:[{s:"الْجُلُّ لِلْفَرَسِ", t:"Çul ata mahsustur.", a:"لِ"},{s:"الْمِنْبَرُ لِلْخَطِيبِ", t:"Minber hatibe aittir.", a:"لِ"},{s:"الْبَابُ لِلدَّارِ", t:"Kapı evindir.", a:"لِ"}]},
  {ar:"لِلْقَسَمِ", tr:"Kasem: yemin (taaccüple)", ex:[{s:"لِلّٰهِ لَا يُؤَخَّرُ الْأَجَلُ", t:"Allah'a yemin olsun, ecel ertelenmez.", a:"لِ"}]},
  {ar:"لِلزِّيَادَةِ", tr:"Zâide: te'kîd", ex:[{s:"رَدِفَ لَكُمْ بَعْضُ الَّذِي تَسْتَعْجِلُونَ", q:"Neml 27/72", t:"Acele ettiğiniz şeyin bir kısmı size yaklaşmıştır.", a:"لَ"},{s:"إِنْ كُنْتُمْ لِلرُّؤْيَا تَعْبُرُونَ", q:"Yûsuf 12/43", t:"Eğer rüya yoruyorsanız.", a:"لِ"}]}]},
 {ar:"رُبَّ", tr:"Rubbe", m:[
  {ar:"لِلتَّقْلِيلِ", tr:"Teklîl: az, nadir (nice…)", ex:[{s:"رُبَّ رَجُلٍ جَوَادٍ لَقِيتُهُ", t:"Nice cömert adamla karşılaştım.", a:"رُبَّ"},{s:"رُبَّ رَجُلٍ أَبُوهُ عَالِمٌ لَقِيتُهُ", t:"Babası âlim olan nice adamla karşılaştım.", a:"رُبَّ"},{s:"رُبَّ تَاجِرٍ فَقِيرٍ لَقِيتُهُ", t:"Nice fakir tüccarla karşılaştım.", a:"رُبَّ"}]}]},
 {ar:"عَلَى", tr:"Alâ", m:[
  {ar:"لِلِاسْتِعْلَاءِ", tr:"İsti'lâ: üzerinde", ex:[{s:"زَيْدٌ عَلَى السَّطْحِ", t:"Zeyd damın üstünde.", a:"عَلَى"},{s:"عَلَيْهِ دَيْنٌ", t:"Onun üzerinde borç var.", a:"عَلَ"},{s:"الْكِتَابُ عَلَى الْمَكْتَبِ", t:"Kitap masanın üstünde.", a:"عَلَى"}]},
  {ar:"وَقَدْ يَكُونُ فِعْلًا", tr:"Bazen fiil olur (alâ: yükseldi)", ex:[{s:"إِنَّ فِرْعَوْنَ عَلَا فِي الْأَرْضِ", q:"Kasas 28/4", t:"Firavun yeryüzünde büyüklük tasladı.", a:"عَلَا"}]}]},
 {ar:"عَنْ", tr:"An", m:[
  {ar:"لِلْبُعْدِ وَالْمُجَاوَزَةِ", tr:"Uzaklaşma ve aşma: -den", ex:[{s:"رَمَيْتُ السَّهْمَ عَنِ الْقَوْسِ", t:"Oku yaydan attım.", a:"عَنِ"},{s:"وَنَهَى النَّفْسَ عَنِ الْهَوَى", q:"Nâziât 79/40", t:"Nefsini hevâdan alıkoydu.", a:"عَنِ"},{s:"بَلَغَنِي عَنْ زَيْدٍ حَدِيثٌ", t:"Zeyd'den bana bir söz ulaştı.", a:"عَنْ"}]}]},
 {ar:"الْكَافُ", tr:"Kâf (كَـ)", m:[
  {ar:"لِلتَّشْبِيهِ", tr:"Teşbîh: gibi", ex:[{s:"زَيْدٌ كَالْأَسَدِ", t:"Zeyd aslan gibidir.", a:"كَ"},{s:"أُولَئِكَ كَالْأَنْعَامِ", q:"A'râf 7/179", t:"Onlar hayvanlar gibidir.", a:"كَ"},{s:"وَهِيَ تَجْرِي بِهِمْ فِي مَوْجٍ كَالْجِبَالِ", q:"Hûd 11/42", t:"Gemi onları dağlar gibi dalgalar içinde götürüyordu.", a:"كَ"}]}]},
 {ar:"مُذْ", tr:"Muz", m:[
  {ar:"لِابْتِدَاءِ الْغَايَةِ فِي الزَّمَانِ الْمَاضِي", tr:"Geçmiş zamanda başlangıç: -den beri", ex:[{s:"مَا رَأَيْتُهُ مُذْ يَوْمِ الْجُمُعَةِ", t:"Onu cuma gününden beri görmedim.", a:"مُذْ"},{s:"سِرْتُ مُذْ يَوْمِ الْخَمِيسِ", t:"Perşembe gününden beri yürüyorum.", a:"مُذْ"}]}]},
 {ar:"مُنْذُ", tr:"Munzu", m:[
  {ar:"لِابْتِدَاءِ الْغَايَةِ فِي الزَّمَانِ الْمَاضِي", tr:"Geçmiş zamanda başlangıç: -den beri", ex:[{s:"مَا رَأَيْتُهُ مُنْذُ يَوْمِ السَّبْتِ", t:"Onu cumartesiden beri görmedim.", a:"مُنْذُ"},{s:"أَنَا مُسْلِمٌ مُنْذُ مَوْلِدِي", t:"Doğduğumdan beri Müslümanım.", a:"مُنْذُ"}]}]},
 {ar:"وَاوُ الْقَسَمِ", tr:"Kasem vâvı (وَ)", m:[
  {ar:"لِلْقَسَمِ", tr:"Yemin", ex:[{s:"وَاللهِ لَأَفْعَلَنَّ كَذَا", t:"Vallahi şunu mutlaka yapacağım.", a:"وَ"},{s:"وَالْعَصْرِ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ", q:"Asr 103/1-2", t:"Asra yemin olsun ki insan gerçekten ziyandadır.", a:"وَ"},{s:"وَالشَّمْسِ وَضُحَاهَا", q:"Şems 91/1", t:"Güneşe ve kuşluk vaktine yemin olsun.", a:"وَ"}]}]},
 {ar:"تَاءُ الْقَسَمِ", tr:"Kasem tâsı (تَ)", m:[
  {ar:"لِلْقَسَمِ", tr:"Yemin (Allah lafzıyla)", ex:[{s:"تَاللهِ لَأَفْعَلَنَّ كَذَا", t:"Tallahi şunu mutlaka yapacağım.", a:"تَ"},{s:"وَتَاللهِ لَأَكِيدَنَّ أَصْنَامَكُمْ", q:"Enbiyâ 21/57", t:"Allah'a yemin olsun, putlarınıza bir tuzak kuracağım.", a:"تَ"},{s:"تَاللهِ لَأُسَافِرَنَّ إِلَى مَكَّةَ", t:"Allah'a yemin olsun, Mekke'ye mutlaka gideceğim.", a:"تَ"}]}]},
 {ar:"حَاشَا", tr:"Hâşâ", m:[
  {ar:"لِلتَّنْزِيهِ", tr:"Tenzîh: hariç tutma (yüceltme)", ex:[{s:"سَاءَ الْقَوْمُ حَاشَا زَيْدٍ", t:"Zeyd hariç kavim kötü oldu.", a:"حَاشَا"},{s:"ذَهَبَ الْجَيْشُ حَاشَا الْقَائِدِ", t:"Komutan hariç ordu gitti.", a:"حَاشَا"},{s:"الطُّلَّابُ نَاجِحُونَ حَاشَا الْمُهْمِلِ", t:"İhmalkâr hariç öğrenciler başarılı.", a:"حَاشَا"}]}]},
 {ar:"عَدَا", tr:"Adâ", m:[
  {ar:"لِلِاسْتِثْنَاءِ", tr:"İstisnâ: hariç", ex:[{s:"جَاءَنِي الْقَوْمُ عَدَا زَيْدٍ", t:"Zeyd hariç kavim bana geldi.", a:"عَدَا"},{s:"قَرَأْتُ الْكِتَابَ عَدَا صَفْحَةٍ", t:"Bir sayfa hariç kitabı okudum.", a:"عَدَا"}]}]},
 {ar:"خَلَا", tr:"Halâ", m:[
  {ar:"لِلِاسْتِثْنَاءِ", tr:"İstisnâ: hariç", ex:[{s:"جَاءَنِي الْقَوْمُ خَلَا زَيْدٍ", t:"Zeyd hariç kavim bana geldi.", a:"خَلَا"},{s:"زُرْتُ مَسَاجِدَ الْمَدِينَةِ خَلَا وَاحِدٍ", t:"Biri hariç şehrin mescitlerini ziyaret ettim.", a:"خَلَا"},{s:"يُحِبُّ أَحْمَدُ الْفَوَاكِهَ خَلَا الْبُرْتُقَالِ", t:"Ahmed portakal hariç meyveleri sever.", a:"خَلَا"}]}]}
 ]},

{id:"s2", kind:"semai", h:24, amel:"in", ar:"الْحُرُوفُ الْمُشَبَّهَةُ بِالْفِعْلِ", tr:"Fiile Benzeyen Harfler", sub:"İsmi nasb, haberi ref' eden 6 harf",
 matn:"النَّوْعُ الثَّانِي: حُرُوفٌ تَنْصِبُ الِاسْمَ وَتَرْفَعُ الْخَبَرَ، وَهِيَ سِتَّةُ أَحْرُفٍ.",
 trIntro:"Mübtedâ ve habere girerler. Mübtedâ bunların ismi olur ve mansûb (üstün) olur; haber ise merfû' (ötre) kalır. Örnek: الدَّرْسُ سَهْلٌ → إِنَّ الدَّرْسَ سَهْلٌ.",
 items:[
 {ar:"إِنَّ", tr:"İnne", m:[{ar:"لِلتَّحْقِيقِ", tr:"Tahkîk (te'kîd): şüphesiz", ex:[{s:"إِنَّ زَيْدًا قَائِمٌ", t:"Şüphesiz Zeyd ayaktadır.", a:"إِنَّ", m:["زَيْدًا","قَائِمٌ"]},{s:"إِنَّ اللهَ غَفُورٌ رَحِيمٌ", q:"Bakara 2/173", t:"Şüphesiz Allah çok bağışlayan, çok merhamet edendir.", a:"إِنَّ", m:["اللهَ","غَفُورٌ"]},{s:"أَلَا إِنَّ نَصْرَ اللهِ قَرِيبٌ", q:"Bakara 2/214", t:"Dikkat edin, Allah'ın yardımı yakındır.", a:"إِنَّ", m:["نَصْرَ","قَرِيبٌ"]}]}]},
 {ar:"أَنَّ", tr:"Enne", m:[{ar:"لِلتَّحْقِيقِ", tr:"Tahkîk: -dığı (masdar manasıyla)", ex:[{s:"بَلَغَنِي أَنَّكَ عَالِمٌ", t:"Senin âlim olduğun bana ulaştı.", a:"أَنَّ", m:["كَ","عَالِمٌ"]},{s:"أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ", t:"Muhammed'in Allah'ın elçisi olduğuna şahitlik ederim.", a:"أَنَّ", m:["مُحَمَّدًا","رَسُولُ"]}]}]},
 {ar:"كَأَنَّ", tr:"Keenne", m:[{ar:"لِلتَّشْبِيهِ", tr:"Teşbîh: sanki", ex:[{s:"كَأَنَّ زَيْدًا الْأَسَدُ", t:"Zeyd sanki aslandır.", a:"كَأَنَّ", m:["زَيْدًا","الْأَسَدُ"]},{s:"كَأَنَّ الْعِلْمَ نُورٌ", t:"İlim sanki bir nurdur.", a:"كَأَنَّ", m:["الْعِلْمَ","نُورٌ"]},{s:"كَأَنَّهُمْ خُشُبٌ مُسَنَّدَةٌ", q:"Münâfikûn 63/4", t:"Sanki onlar dayatılmış kütüklerdir.", a:"كَأَنَّ"}]}]},
 {ar:"لَكِنَّ", tr:"Lâkinne", m:[{ar:"لِلِاسْتِدْرَاكِ", tr:"İstidrâk: fakat", ex:[{s:"جَاءَنِي زَيْدٌ لَكِنَّ عَمْرًا لَمْ يَجِئْ", t:"Zeyd bana geldi, fakat Amr gelmedi.", a:"لَكِنَّ", m:["عَمْرًا"]},{s:"زَيْدٌ طَوِيلٌ وَلَكِنَّ حَامِدًا قَصِيرٌ", t:"Zeyd uzun, fakat Hâmid kısadır.", a:"لَكِنَّ", m:["حَامِدًا","قَصِيرٌ"]}]}]},
 {ar:"لَيْتَ", tr:"Leyte", m:[{ar:"لِلتَّمَنِّي", tr:"Temennî: keşke", ex:[{s:"لَيْتَ الشَّبَابَ يَعُودُ يَوْمًا", t:"Keşke gençlik bir gün geri dönse.", a:"لَيْتَ", m:["الشَّبَابَ"]},{s:"لَيْتَ الرَّبِيعَ دَائِمٌ", t:"Keşke bahar daim olsa.", a:"لَيْتَ", m:["الرَّبِيعَ","دَائِمٌ"]},{s:"لَيْتَ الْقَمَرَ قَرِيبٌ", t:"Keşke ay yakın olsa.", a:"لَيْتَ", m:["الْقَمَرَ","قَرِيبٌ"]}]}]},
 {ar:"لَعَلَّ", tr:"Lealle", m:[{ar:"لِلتَّرَجِّي", tr:"Tereccî: umulur ki", ex:[{s:"لَعَلَّ زَيْدًا حَاضِرٌ", t:"Umulur ki Zeyd hazırdır.", a:"لَعَلَّ", m:["زَيْدًا","حَاضِرٌ"]},{s:"لَعَلَّ الْحَبِيبَ قَادِمٌ", t:"Umulur ki sevgili geliyordur.", a:"لَعَلَّ", m:["الْحَبِيبَ","قَادِمٌ"]},{s:"لَعَلَّ اللهَ يُحْدِثُ بَعْدَ ذَلِكَ أَمْرًا", q:"Talâk 65/1", t:"Umulur ki Allah bundan sonra yeni bir durum ortaya çıkarır.", a:"لَعَلَّ", m:["اللهَ"]}]}]}
 ]},

{id:"s3", kind:"semai", h:48, amel:"ls", ar:"مَا وَلَا الْمُشَبَّهَتَانِ بِلَيْسَ", tr:"Leyse'ye Benzeyen Mâ ve Lâ", sub:"İsmi ref', haberi nasb eden 2 harf",
 matn:"النَّوْعُ الثَّالِثُ: حَرْفَانِ تَرْفَعَانِ الِاسْمَ وَتَنْصِبَانِ الْخَبَرَ، وَهُمَا: مَا وَلَا الْمُشَبَّهَتَانِ بِلَيْسَ.",
 trIntro:"Leyse gibi çalışırlar: ismi ötreli bırakır, haberi üstünlü yaparlar. Mâ şimdiki zamanı, lâ gelecek zamanı olumsuzlar.",
 items:[
 {ar:"مَا", tr:"Mâ", m:[{ar:"لِنَفْيِ الْحَالِ", tr:"Şimdiki zamanı olumsuzlar", ex:[{s:"مَا زَيْدٌ مُنْطَلِقًا", t:"Zeyd gidiyor değil.", a:"مَا", m:["زَيْدٌ","مُنْطَلِقًا"]},{s:"مَا هَذَا بَشَرًا", q:"Yûsuf 12/31", t:"Bu bir beşer değildir.", a:"مَا", m:["بَشَرًا"]},{s:"مَا أَحْمَدُ نَاجِحًا", t:"Ahmed başarılı değil.", a:"مَا", m:["أَحْمَدُ","نَاجِحًا"]}]}]},
 {ar:"لَا", tr:"Lâ", m:[{ar:"لِنَفْيِ الِاسْتِقْبَالِ", tr:"Gelecek zamanı olumsuzlar", ex:[{s:"لَا رَجُلٌ مُنْطَلِقًا", t:"Hiçbir adam gidici değildir.", a:"لَا", m:["رَجُلٌ","مُنْطَلِقًا"]},{s:"لَا رَجُلٌ حَاضِرًا", t:"Hiçbir adam hazır değildir.", a:"لَا", m:["رَجُلٌ","حَاضِرًا"]}]}]}
 ]},

{id:"s4", kind:"semai", h:96, amel:"ism", ar:"حُرُوفٌ تَنْصِبُ الِاسْمَ الْمُفْرَدَ", tr:"Tek İsmi Nasb Eden Harfler", sub:"Maiyyet vâvı, illâ ve nidâ harfleri (7)",
 matn:"النَّوْعُ الرَّابِعُ: حُرُوفٌ تَنْصِبُ الِاسْمَ فَقَطْ، وَهِيَ سَبْعَةُ أَحْرُفٍ.",
 trIntro:"Bu yedi harf yalnızca bir ismi nasb eder: beraberlik vâvı (mef'ûlün maah), istisnâ edatı illâ (müstesnâ) ve beş nidâ (seslenme) harfi (münâdâ).",
 items:[
 {ar:"الْوَاوُ", tr:"Vâv (maa manasında)", m:[{ar:"بِمَعْنَى مَعَ", tr:"Beraberlik: ile birlikte", ex:[{s:"اسْتَوَى الْمَاءُ وَالْخَشَبَةَ", t:"Su, tahta ile birlikte (aynı) seviyeye geldi.", a:"وَ", m:["الْخَشَبَةَ"]},{s:"سِرْتُ وَالنِّيلَ", t:"Nil ile birlikte (boyunca) yürüdüm.", a:"وَ", m:["النِّيلَ"]},{s:"سَافَرْتُ وَبِلَالًا", t:"Bilâl ile birlikte yolculuk ettim.", a:"وَ", m:["بِلَالًا"]}]}]},
 {ar:"إِلَّا", tr:"İllâ", m:[{ar:"لِلِاسْتِثْنَاءِ", tr:"İstisnâ: hariç", ex:[{s:"جَاءَنِي الْقَوْمُ إِلَّا زَيْدًا", t:"Zeyd hariç kavim bana geldi.", a:"إِلَّا", m:["زَيْدًا"]},{s:"مَا جَاءَنِي الْقَوْمُ إِلَّا حِمَارًا", t:"Kavim bana gelmedi, ancak bir eşek (geldi).", a:"إِلَّا", m:["حِمَارًا"]},{s:"فَشَرِبُوا مِنْهُ إِلَّا قَلِيلًا مِنْهُمْ", q:"Bakara 2/249", t:"İçlerinden azı hariç ondan içtiler.", a:"إِلَّا", m:["قَلِيلًا"]}]}]},
 {ar:"يَا", tr:"Yâ", m:[{ar:"لِنِدَاءِ الْبَعِيدِ", tr:"Uzağa seslenme", ex:[{s:"يَا عَبْدَ اللهِ", t:"Ey Abdullah!", a:"يَا", m:["عَبْدَ"]},{s:"يَا خَيْرًا مِنْ زَيْدٍ", t:"Ey Zeyd'den hayırlı olan!", a:"يَا", m:["خَيْرًا"]},{s:"يَا طَالِبَ الْعِلْمِ", t:"Ey ilim talebesi!", a:"يَا", m:["طَالِبَ"]}]}]},
 {ar:"أَيَا", tr:"Eyâ", m:[{ar:"لِنِدَاءِ الْبَعِيدِ", tr:"Uzağa seslenme", ex:[{s:"أَيَا عَبْدَ اللهِ", t:"Ey Abdullah!", a:"أَيَا", m:["عَبْدَ"]},{s:"أَيَا عَامِلًا فِي الْحَقْلِ اعْمَلْ جَيِّدًا", t:"Ey tarlada çalışan, iyi çalış!", a:"أَيَا", m:["عَامِلًا"]}]}]},
 {ar:"هَيَا", tr:"Heyâ", m:[{ar:"لِنِدَاءِ الْبَعِيدِ", tr:"Uzağa seslenme", ex:[{s:"هَيَا عَبْدَ اللهِ", t:"Hey Abdullah!", a:"هَيَا", m:["عَبْدَ"]},{s:"هَيَا مُتَرَدِّدًا اتَّخِذْ قَرَارَكَ", t:"Ey tereddüt eden, kararını ver!", a:"هَيَا", m:["مُتَرَدِّدًا"]}]}]},
 {ar:"أَيْ", tr:"Ey", m:[{ar:"لِنِدَاءِ الْقَرِيبِ", tr:"Yakına seslenme", ex:[{s:"أَيْ عَبْدَ اللهِ", t:"Ey Abdullah!", a:"أَيْ", m:["عَبْدَ"]},{s:"أَيْ عَبْدَ اللهِ أَطِعِ الْوَالِدَيْكَ", t:"Ey Abdullah, anne babana itaat et!", a:"أَيْ", m:["عَبْدَ"]}]}]},
 {ar:"الْهَمْزَةُ", tr:"Hemze (أَ)", m:[{ar:"لِنِدَاءِ الْقَرِيبِ", tr:"En yakına seslenme", ex:[{s:"أَعَبْدَ اللهِ", t:"Ey Abdullah! (en yakındakine)", a:"أَ", m:["عَبْدَ"]},{s:"أَعَبْدَ الرَّحْمَنِ أَغْلِقِ النَّافِذَةَ", t:"Ey Abdurrahman, pencereyi kapat!", a:"أَ", m:["عَبْدَ"]},{s:"أَقَارِئَ الْكِتَابِ اقْرَأْهُ جَيِّدًا", t:"Ey kitabı okuyan, onu iyi oku!", a:"أَ", m:["قَارِئَ"]}]}]}
 ]},

{id:"s5", kind:"semai", h:150, amel:"nasb", ar:"حُرُوفٌ تَنْصِبُ الْفِعْلَ الْمُضَارِعَ", tr:"Muzâriyi Nasb Edenler", sub:"Nevâsıb: en, len, key, izen (4)",
 matn:"النَّوْعُ الْخَامِسُ: حُرُوفٌ تَنْصِبُ الْفِعْلَ الْمُضَارِعَ وَهِيَ أَرْبَعَةُ أَحْرُفٍ.",
 trIntro:"Muzâri fiile girip sonunu üstünlü yaparlar: يَخْرُجُ → أَنْ يَخْرُجَ.",
 items:[
 {ar:"أَنْ", tr:"En", m:[{ar:"لِلِاسْتِقْبَالِ", tr:"İstikbâl: -mek, -mesi", ex:[{s:"أُرِيدُ أَنْ أَخْرُجَ", t:"Çıkmak istiyorum.", a:"أَنْ", m:["أَخْرُجَ"]},{s:"وَاللهُ يُرِيدُ أَنْ يَتُوبَ عَلَيْكُمْ", q:"Nisâ 4/27", t:"Allah tövbenizi kabul etmek istiyor.", a:"أَنْ", m:["يَتُوبَ"]},{s:"أَرْجُو أَنْ تَشْتَرِيَ لِي هَذَا الْكِتَابَ", t:"Bana bu kitabı almanı umuyorum.", a:"أَنْ", m:["تَشْتَرِيَ"]}]}]},
 {ar:"لَنْ", tr:"Len", m:[{ar:"لِتَأْكِيدِ نَفْيِ الِاسْتِقْبَالِ", tr:"Geleceği kesin olumsuzlama: asla", ex:[{s:"فَلَنْ أَبْرَحَ الْأَرْضَ حَتَّى يَأْذَنَ لِي أَبِي", q:"Yûsuf 12/80", t:"Babam bana izin verinceye kadar bu yerden asla ayrılmayacağım.", a:"لَنْ", m:["أَبْرَحَ"]},{s:"لَنْ تَسْتَطِيعَ مَعِيَ صَبْرًا", q:"Kehf 18/67", t:"Benimle beraberliğe asla sabredemezsin.", a:"لَنْ", m:["تَسْتَطِيعَ"]},{s:"لَنْ أَذْهَبَ إِلَى بَلَدِي فِي عُطْلَةِ الصَّيْفِ", t:"Yaz tatilinde memleketime asla gitmeyeceğim.", a:"لَنْ", m:["أَذْهَبَ"]}]}]},
 {ar:"كَيْ", tr:"Key", m:[{ar:"لِلتَّعْلِيلِ", tr:"Ta'lîl: -mek için", ex:[{s:"جِئْتُكَ كَيْ تُعْطِيَنِي حَقِّي", t:"Hakkımı vermen için sana geldim.", a:"كَيْ", m:["تُعْطِيَ"]},{s:"كَيْ نُسَبِّحَكَ كَثِيرًا", q:"Tâhâ 20/33", t:"Seni çokça tesbih etmemiz için.", a:"كَيْ", m:["نُسَبِّحَ"]},{s:"جِئْتُ كَيْ أَتَعَلَّمَ", t:"Öğrenmek için geldim.", a:"كَيْ", m:["أَتَعَلَّمَ"]}]}]},
 {ar:"إِذَنْ", tr:"İzen", m:[{ar:"جَوَابٌ لِقَوْلِ الْقَائِلِ وَجَزَاءٌ لِفِعْلِ الْفَاعِلِ", tr:"Cevap ve karşılık: öyleyse", ex:[{s:"إِذَنْ أُكْرِمَكَ", t:"(“Sana geleceğim” diyene:) Öyleyse sana ikram ederim.", a:"إِذَنْ", m:["أُكْرِمَ"]},{s:"إِذَنْ لَا يَضِيعَ أَجْرُكَ", t:"(“Yarın seni ziyaret edeceğim” diyene:) Öyleyse ecrin zayi olmaz.", a:"إِذَنْ", m:["يَضِيعَ"]},{s:"إِذَنْ أُكَافِئَكَ", t:"(“Muallakât'ı ezberleyeceğim” diyene:) Öyleyse seni ödüllendiririm.", a:"إِذَنْ", m:["أُكَافِئَ"]}]}]}
 ]},

{id:"s6", kind:"semai", h:178, amel:"jazm", ar:"حُرُوفٌ تَجْزِمُ الْفِعْلَ الْمُضَارِعَ", tr:"Muzâriyi Cezm Eden Harfler", sub:"İn, lem, lemmâ, lâ, emir lâmı (5)",
 matn:"النَّوْعُ السَّادِسُ: حُرُوفٌ تَجْزِمُ الْفِعْلَ الْمُضَارِعَ وَهِيَ خَمْسَةُ أَحْرُفٍ.",
 trIntro:"Muzâri fiile girip sonunu cezmli (sükûnlu) yaparlar: يَخْرُجُ → لَمْ يَخْرُجْ. İn harfi iki fiili (şart ve cezâ) cezm eder.",
 items:[
 {ar:"إِنْ", tr:"İn", m:[{ar:"لِلشَّرْطِ وَالْجَزَاءِ", tr:"Şart ve cezâ: eğer", ex:[{s:"إِنْ تَأْتِنِي أُكْرِمْكَ", t:"Bana gelirsen sana ikram ederim.", a:"إِنْ", m:["تَأْتِ","أُكْرِمْ"]},{s:"إِنْ يَشَأْ يُذْهِبْكُمْ", q:"Nisâ 4/133", t:"Dilerse sizi giderir.", a:"إِنْ", m:["يَشَأْ","يُذْهِبْ"]},{s:"إِنْ تُذَاكِرْ تَنْجَحْ", t:"Ders çalışırsan başarırsın.", a:"إِنْ", m:["تُذَاكِرْ","تَنْجَحْ"]}]}]},
 {ar:"لَمْ", tr:"Lem", m:[{ar:"لِنَفْيِ الْمَاضِي", tr:"Geçmişi olumsuzlar (muzâriyi geçmişe çevirir)", ex:[{s:"لَمْ يَخْرُجْ زَيْدٌ", t:"Zeyd çıkmadı.", a:"لَمْ", m:["يَخْرُجْ"]},{s:"لَمْ يَلِدْ وَلَمْ يُولَدْ", q:"İhlâs 112/3", t:"Doğurmadı ve doğurulmadı.", a:"لَمْ", m:["يَلِدْ","يُولَدْ"]},{s:"لَمْ نَفْهَمْ هَذَا الدَّرْسَ جَيِّدًا", t:"Bu dersi iyi anlamadık.", a:"لَمْ", m:["نَفْهَمْ"]}]}]},
 {ar:"لَمَّا", tr:"Lemmâ", m:[{ar:"لِنَفْيِ الْمَاضِي مَعَ التَّوَقُّعِ", tr:"Henüz …medi (beklenti var)", ex:[{s:"لَمَّا يَخْرُجِ الْأَمِيرُ", t:"Emir henüz çıkmadı.", a:"لَمَّا", m:["يَخْرُجِ"]},{s:"وَلَمَّا يَدْخُلِ الْإِيمَانُ فِي قُلُوبِكُمْ", q:"Hucurât 49/14", t:"İman henüz kalplerinize girmedi.", a:"لَمَّا", m:["يَدْخُلِ"]},{s:"خَرَجَ زَيْدٌ وَلَمَّا يَرْجِعْ", t:"Zeyd çıktı ve henüz dönmedi.", a:"لَمَّا", m:["يَرْجِعْ"]}]}]},
 {ar:"لَا", tr:"Lâ (nehy)", m:[{ar:"لِلنَّهْيِ", tr:"Nehy: yapma!", ex:[{s:"لَا تَفْعَلْ", t:"Yapma!", a:"لَا", m:["تَفْعَلْ"]},{s:"لَا تُشْرِكْ بِاللهِ", q:"Lokmân 31/13", t:"Allah'a ortak koşma!", a:"لَا", m:["تُشْرِكْ"]},{s:"رَبَّنَا لَا تُزِغْ قُلُوبَنَا", q:"Âl-i İmrân 3/8", t:"Rabbimiz, kalplerimizi kaydırma!", a:"لَا", m:["تُزِغْ"]}]}]},
 {ar:"لَامُ الْأَمْرِ", tr:"Emir lâmı (لِـ)", m:[{ar:"لِلْأَمْرِ", tr:"Emir: …sın", ex:[{s:"لِيَفْعَلْ زَيْدٌ", t:"Zeyd yapsın.", a:"لِ", m:["يَفْعَلْ"]},{s:"لِيُنْفِقْ ذُو سَعَةٍ مِنْ سَعَتِهِ", q:"Talâk 65/7", t:"Varlıklı olan varlığından harcasın.", a:"لِ", m:["يُنْفِقْ"]},{s:"فَمَنْ شَهِدَ مِنْكُمُ الشَّهْرَ فَلْيَصُمْهُ", q:"Bakara 2/185", t:"Sizden kim bu aya erişirse onda oruç tutsun.", a:"لْ", m:["يَصُمْ"]}]}]}
 ]},

{id:"s7", kind:"semai", h:200, amel:"jazm", ar:"أَسْمَاءٌ تَجْزِمُ الْأَفْعَالَ", tr:"Cezm Eden Şart İsimleri", sub:"İn manasında iki fiili cezm eden 9 isim",
 matn:"النَّوْعُ السَّابِعُ: أَسْمَاءٌ تَجْزِمُ الْفِعْلَ الْمُضَارِعَ عَلَى مَعْنَى إِنْ، وَهِيَ تِسْعَةُ أَسْمَاءٍ.",
 trIntro:"Bunlar harf değil isimdir; 'in' (eğer) manasını taşıdıkları için iki muzâriyi birden cezm ederler: birincisi şart, ikincisi cezâ (cevap).",
 items:[
 {ar:"مَنْ", tr:"Men", m:[{ar:"لِلْعَاقِلِ", tr:"Her kim", ex:[{s:"مَنْ تَضْرِبْ أَضْرِبْ", t:"Sen kimi döversen ben de onu döverim.", a:"مَنْ", m:["تَضْرِبْ","أَضْرِبْ"]},{s:"وَمَنْ يَتَّقِ اللهَ يَجْعَلْ لَهُ مَخْرَجًا", q:"Talâk 65/2", t:"Kim Allah'tan sakınırsa Allah ona bir çıkış yolu açar.", a:"مَنْ", m:["يَتَّقِ","يَجْعَلْ"]},{s:"مَنْ يُرِدِ اللهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ", q:"Hadis", t:"Allah kimin hayrını dilerse onu dinde fakih kılar.", a:"مَنْ", m:["يُرِدِ","يُفَقِّهْ"]}]}]},
 {ar:"أَيٌّ", tr:"Eyyun", m:[{ar:"لِلْعُمُومِ", tr:"Hangisi", ex:[{s:"أَيَّهُمْ تَضْرِبْ أَضْرِبْ", t:"Hangisini döversen ben de onu döverim.", a:"أَيَّ", m:["تَضْرِبْ","أَضْرِبْ"]},{s:"أَيَّ يَوْمٍ تَصُمْ أَصُمْ", t:"Hangi gün oruç tutarsan ben de tutarım.", a:"أَيَّ", m:["تَصُمْ","أَصُمْ"]},{s:"أَيَّ مَكَانٍ تَجْلِسْ أَجْلِسْ", t:"Hangi yere oturursan ben de otururum.", a:"أَيَّ", m:["تَجْلِسْ","أَجْلِسْ"]}]}]},
 {ar:"مَا", tr:"Mâ", m:[{ar:"لِغَيْرِ الْعَاقِلِ", tr:"Her ne", ex:[{s:"مَا تَصْنَعْ أَصْنَعْ", t:"Ne yaparsan ben de onu yaparım.", a:"مَا", m:["تَصْنَعْ","أَصْنَعْ"]},{s:"وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللهُ", q:"Bakara 2/197", t:"Hayırdan ne yaparsanız Allah onu bilir.", a:"مَا", m:["تَفْعَلُوا","يَعْلَمْ"]},{s:"مَا تَزْرَعْ تَحْصُدْ", t:"Ne ekersen onu biçersin.", a:"مَا", m:["تَزْرَعْ","تَحْصُدْ"]}]}]},
 {ar:"مَتَى", tr:"Metâ", m:[{ar:"لِلزَّمَانِ", tr:"Ne zaman", ex:[{s:"مَتَى تُكْرِمْنِي أُكْرِمْكَ", t:"Ne zaman bana ikram edersen sana ikram ederim.", a:"مَتَى", m:["تُكْرِمْ","أُكْرِمْ"]},{s:"مَتَى تُسَافِرْ أُسَافِرْ", t:"Ne zaman yolculuk edersen ben de ederim.", a:"مَتَى", m:["تُسَافِرْ","أُسَافِرْ"]},{s:"مَتَى تَأْتِ نَأْتِ", t:"Ne zaman gelirsen biz de geliriz.", a:"مَتَى", m:["تَأْتِ","نَأْتِ"]}]}]},
 {ar:"مَهْمَا", tr:"Mehmâ", m:[{ar:"لِغَيْرِ الْعَاقِلِ", tr:"Her ne", ex:[{s:"مَهْمَا تَفْعَلْ أَفْعَلْ", t:"Her ne yaparsan ben de yaparım.", a:"مَهْمَا", m:["تَفْعَلْ","أَفْعَلْ"]},{s:"مَهْمَا تَقْرَأْ أَقْرَأْ", t:"Her ne okursan ben de okurum.", a:"مَهْمَا", m:["تَقْرَأْ","أَقْرَأْ"]},{s:"مَهْمَا تَقُلْ نُصَدِّقْكَ", t:"Her ne söylersen seni tasdik ederiz.", a:"مَهْمَا", m:["تَقُلْ","نُصَدِّقْ"]}]}]},
 {ar:"أَيْنَ", tr:"Eyne", m:[{ar:"لِلْمَكَانِ", tr:"Nerede", ex:[{s:"أَيْنَ تَكُنْ أَكُنْ", t:"Nerede olursan ben de orada olurum.", a:"أَيْنَ", m:["تَكُنْ","أَكُنْ"]},{s:"أَيْنَ تَسْكُنْ أَسْكُنْ", t:"Nerede oturursan ben de orada otururum.", a:"أَيْنَ", m:["تَسْكُنْ","أَسْكُنْ"]},{s:"أَيْنَ تَذْهَبْ تَجِدْ أَثَرَ الْعِلْمِ", t:"Nereye gidersen ilmin izini bulursun.", a:"أَيْنَ", m:["تَذْهَبْ","تَجِدْ"]}]}]},
 {ar:"حَيْثُمَا", tr:"Haysumâ", m:[{ar:"لِلْمَكَانِ", tr:"Her nerede", ex:[{s:"حَيْثُمَا تَجْلِسْ أَجْلِسْ", t:"Her nereye oturursan ben de otururum.", a:"حَيْثُمَا", m:["تَجْلِسْ","أَجْلِسْ"]},{s:"حَيْثُمَا يَذْهَبْ يَجِدْ صَدِيقًا", t:"Her nereye giderse bir dost bulur.", a:"حَيْثُمَا", m:["يَذْهَبْ","يَجِدْ"]},{s:"حَيْثُمَا تَكُنْ أَزُرْكَ", t:"Her nerede olursan seni ziyaret ederim.", a:"حَيْثُمَا", m:["تَكُنْ","أَزُرْ"]}]}]},
 {ar:"إِذْمَا", tr:"İzmâ", m:[{ar:"لِلزَّمَانِ", tr:"Ne zaman", ex:[{s:"إِذْمَا تَفْعَلْ أَفْعَلْ", t:"Ne zaman yaparsan ben de yaparım.", a:"إِذْمَا", m:["تَفْعَلْ","أَفْعَلْ"]},{s:"إِذْمَا تَقُمْ أَقُمْ", t:"Ne zaman kalkarsan ben de kalkarım.", a:"إِذْمَا", m:["تَقُمْ","أَقُمْ"]},{s:"إِذْمَا تَدْرُسْ أَدْرُسْ", t:"Ne zaman ders çalışırsan ben de çalışırım.", a:"إِذْمَا", m:["تَدْرُسْ","أَدْرُسْ"]}]}]},
 {ar:"أَنَّى", tr:"Ennâ", m:[{ar:"لِلْمَكَانِ", tr:"Nereden/nereye", ex:[{s:"أَنَّى تَفْعَلْ أَفْعَلْ", t:"Nerede yaparsan ben de yaparım.", a:"أَنَّى", m:["تَفْعَلْ","أَفْعَلْ"]},{s:"أَنَّى تَسْعَ تَجِدْ خَيْرًا", t:"Nereye koşarsan hayır bulursun.", a:"أَنَّى", m:["تَسْعَ","تَجِدْ"]}]}]}
 ]},

{id:"s8", kind:"semai", h:222, amel:"tam", ar:"الْأَسْمَاءُ الَّتِي تَنْصِبُ عَلَى التَّمْيِيزِ", tr:"Temyîzi Nasb Eden İsimler", sub:"Aşere, kem, keeyyin, kezâ (4)",
 matn:"النَّوْعُ الثَّامِنُ: أَسْمَاءٌ تَنْصِبُ أَسْمَاءً نَكِرَاتٍ عَلَى التَّمْيِيزِ، وَهِيَ أَرْبَعَةُ أَسْمَاءٍ.",
 trIntro:"Bu isimler belirsiz bir sayı/miktar bildirir; ardından gelen nekre isim (temyîz) bu belirsizliği giderir ve mansûb olur: عِنْدِي أَحَدَ عَشَرَ رَجُلًا.",
 items:[
 {ar:"عَشَرَ", tr:"Aşere (11–19'da)", m:[{ar:"إِذَا رُكِّبَتْ مَعَ أَحَدٍ أَوِ اثْنَيْنِ إِلَى تِسْعَةٍ", tr:"Ahad/isnân…tis'a ile birleşince", ex:[{s:"عِنْدِي أَحَدَ عَشَرَ رَجُلًا", t:"Yanımda on bir adam var.", a:"عَشَرَ", m:["رَجُلًا"]},{s:"إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا", q:"Yûsuf 12/4", t:"Ben on bir yıldız gördüm.", a:"عَشَرَ", m:["كَوْكَبًا"]},{s:"حَضَرَ خَمْسَةَ عَشَرَ طَالِبًا", t:"On beş öğrenci hazır bulundu.", a:"عَشَرَ", m:["طَالِبًا"]}]}]},
 {ar:"كَمْ", tr:"Kem", m:[{ar:"لِلِاسْتِفْهَامِ", tr:"Soru: kaç?", ex:[{s:"كَمْ رَجُلًا عِنْدَكَ", t:"Yanında kaç adam var?", a:"كَمْ", m:["رَجُلًا"]},{s:"كَمْ طَالِبًا غَابَ الْيَوْمَ", t:"Bugün kaç öğrenci gelmedi?", a:"كَمْ", m:["طَالِبًا"]},{s:"كَمْ سَاعَةً نِمْتَ", t:"Kaç saat uyudun?", a:"كَمْ", m:["سَاعَةً"]}]}]},
 {ar:"كَأَيٍّ", tr:"Keeyyin", m:[{ar:"لِلتَّكْثِيرِ", tr:"Nice, birçok", ex:[{s:"كَأَيٍّ رَجُلًا عِنْدِي", t:"Yanımda nice adam var.", a:"كَأَيٍّ", m:["رَجُلًا"]},{s:"كَأَيٍّ رَجُلًا لَقِيتُ", t:"Nice adamla karşılaştım.", a:"كَأَيٍّ", m:["رَجُلًا"]},{s:"كَأَيٍّ بَلَدًا زُرْتَ", t:"Nice beldeyi ziyaret ettin.", a:"كَأَيٍّ", m:["بَلَدًا"]}]}]},
 {ar:"كَذَا", tr:"Kezâ", m:[{ar:"كِنَايَةٌ عَنِ الْعَدَدِ", tr:"Sayıdan kinaye: şu kadar", ex:[{s:"عِنْدِي كَذَا دِرْهَمًا", t:"Yanımda şu kadar dirhem var.", a:"كَذَا", m:["دِرْهَمًا"]},{s:"قَرَأْتُ كَذَا سَاعَةً", t:"Şu kadar saat okudum.", a:"كَذَا", m:["سَاعَةً"]},{s:"سِرْتُ كَذَا مِيلًا", t:"Şu kadar mil yürüdüm.", a:"كَذَا", m:["مِيلًا"]}]}]}
 ]},

{id:"s9", kind:"semai", h:262, amel:"if", ar:"أَسْمَاءُ الْأَفْعَالِ", tr:"İsm-i Fiiller", sub:"6'sı nasb, 3'ü ref' eden 9 kelime",
 matn:"النَّوْعُ التَّاسِعُ: كَلِمَاتٌ تُسَمَّى أَسْمَاءَ الْأَفْعَالِ بَعْضُهَا تَرْفَعُ وَبَعْضُهَا تَنْصِبُ، وَهِيَ تِسْعُ كَلِمَاتٍ: النَّاصِبَةُ مِنْهَا سِتُّ كَلِمَاتٍ، وَالرَّافِعَةُ مِنْهَا ثَلَاثُ كَلِمَاتٍ.",
 trIntro:"Fiil manası taşıyan ama fiil kalıbında olmayan kelimelerdir. Emir manasındaki altısı mef'ûlü nasb eder; mâzi manasındaki üçü (heyhâte, ser'âne, şettâne) fâili ref' eder.",
 items:[
 {ar:"رُوَيْدَ", tr:"Ruveyde", sub:"n", m:[{ar:"بِمَعْنَى أَمْهِلْ", tr:"Mühlet ver", ex:[{s:"رُوَيْدَ زَيْدًا", t:"Zeyd'e mühlet ver.", a:"رُوَيْدَ", m:["زَيْدًا"]},{s:"رُوَيْدَ الرَّجُلَ", t:"Adama mühlet ver.", a:"رُوَيْدَ", m:["الرَّجُلَ"]}]}]},
 {ar:"بَلْهَ", tr:"Belhe", sub:"n", m:[{ar:"بِمَعْنَى دَعْ", tr:"Bırak", ex:[{s:"بَلْهَ زَيْدًا", t:"Zeyd'i bırak.", a:"بَلْهَ", m:["زَيْدًا"]},{s:"بَلْهَ هَذَا الْأَمْرَ", t:"Bu işi bırak.", a:"بَلْهَ", m:["الْأَمْرَ"]}]}]},
 {ar:"دُونَكَ", tr:"Dûneke", sub:"n", m:[{ar:"بِمَعْنَى خُذْ", tr:"Al", ex:[{s:"دُونَكَ زَيْدًا", t:"Zeyd'i al (yakala).", a:"دُونَكَ", m:["زَيْدًا"]},{s:"دُونَكَ الْكِتَابَ", t:"Kitabı al.", a:"دُونَكَ", m:["الْكِتَابَ"]}]}]},
 {ar:"عَلَيْكَ", tr:"Aleyke", sub:"n", m:[{ar:"بِمَعْنَى الْزَمْ", tr:"Sarıl, bırakma", ex:[{s:"عَلَيْكَ زَيْدًا", t:"Zeyd'e sarıl (bırakma).", a:"عَلَيْكَ", m:["زَيْدًا"]},{s:"يَا أَيُّهَا الَّذِينَ آمَنُوا عَلَيْكُمْ أَنْفُسَكُمْ", q:"Mâide 5/105", t:"Ey iman edenler, siz kendinize bakın.", a:"عَلَيْكُمْ", m:["أَنْفُسَ"]},{s:"عَلَيْكَ نَفْسَكَ فَهَذِّبْهَا", t:"Nefsine sarıl ve onu terbiye et.", a:"عَلَيْكَ", m:["نَفْسَ"]}]}]},
 {ar:"هَا", tr:"Hâ", sub:"n", m:[{ar:"بِمَعْنَى خُذْ", tr:"Al", ex:[{s:"هَا زَيْدًا", t:"Al Zeyd'i.", a:"هَا", m:["زَيْدًا"]},{s:"هَا الْبُرْهَانَ عَلَى قَوْلِي", t:"Al sözümün delilini.", a:"هَا", m:["الْبُرْهَانَ"]}]}]},
 {ar:"حَيَّهَلَ", tr:"Hayyehele", sub:"n", m:[{ar:"بِمَعْنَى ائْتِ", tr:"Gel, haydi", ex:[{s:"حَيَّهَلَ الثَّرِيدَ", t:"Haydi tiride gel.", a:"حَيَّهَلَ", m:["الثَّرِيدَ"]},{s:"حَيَّهَلَ الصَّلَاةَ", t:"Haydi namaza!", a:"حَيَّهَلَ", m:["الصَّلَاةَ"]}]}]},
 {ar:"هَيْهَاتَ", tr:"Heyhâte", sub:"r", m:[{ar:"بِمَعْنَى بَعُدَ", tr:"Uzaklaştı, ne uzak!", ex:[{s:"هَيْهَاتَ زَيْدٌ", t:"Zeyd ne kadar uzak!", a:"هَيْهَاتَ", m:["زَيْدٌ"]},{s:"هَيْهَاتَ هَيْهَاتَ لِمَا تُوعَدُونَ", q:"Mü'minûn 23/36", t:"Size vaad edilen ne kadar uzak, ne kadar uzak!", a:"هَيْهَاتَ"},{s:"هَيْهَاتَ نَجَاحُ الْكَسُولِ", t:"Tembelin başarısı ne kadar uzak!", a:"هَيْهَاتَ", m:["نَجَاحُ"]}]}]},
 {ar:"سَرْعَانَ", tr:"Ser'âne", sub:"r", m:[{ar:"بِمَعْنَى سَرُعَ", tr:"Çabuk oldu", ex:[{s:"سَرْعَانَ ذَا إِهَالَةً", t:"Bu ne çabuk yağ oldu!", a:"سَرْعَانَ", m:["ذَا"]},{s:"سَرْعَانَ الْجَيْشُ فِي الرَّحِيلِ", t:"Ordu ne çabuk yola koyuldu!", a:"سَرْعَانَ", m:["الْجَيْشُ"]}]}]},
 {ar:"شَتَّانَ", tr:"Şettâne", sub:"r", m:[{ar:"بِمَعْنَى افْتَرَقَ", tr:"Ayrıldı, ne kadar farklı!", ex:[{s:"شَتَّانَ زَيْدٌ وَعَمْرٌو", t:"Zeyd ile Amr ne kadar farklı!", a:"شَتَّانَ", m:["زَيْدٌ"]},{s:"شَتَّانَ الْجِدُّ وَالْإِهْمَالُ", t:"Ciddiyetle ihmal ne kadar farklı!", a:"شَتَّانَ", m:["الْجِدُّ"]}]}]}
 ]},

{id:"s10", kind:"semai", h:285, amel:"ls", ar:"الْأَفْعَالُ النَّاقِصَةُ", tr:"Nâkıs Fiiller", sub:"Kâne ve kardeşleri (13)",
 matn:"النَّوْعُ الْعَاشِرُ: الْأَفْعَالُ النَّاقِصَةُ تَرْفَعُ الِاسْمَ وَتَنْصِبُ الْخَبَرَ، وَهِيَ ثَلَاثَةَ عَشَرَ فِعْلًا.",
 trIntro:"Mübtedâ ve habere girerler: mübtedâ fiilin ismi olur ve merfû' kalır; haber, fiilin haberi olur ve mansûb olur. Örnek: الدَّرْسُ سَهْلٌ → كَانَ الدَّرْسُ سَهْلًا.",
 items:[
 {ar:"كَانَ", tr:"Kâne", m:[{ar:"نَاقِصَةٌ، وَتَكُونُ تَامَّةً وَزَائِدَةً", tr:"İdi; bazen tâm (oldu, var oldu) ve zâid olur", ex:[{s:"كَانَ زَيْدٌ قَائِمًا", t:"Zeyd ayaktaydı.", a:"كَانَ", m:["زَيْدٌ","قَائِمًا"]},{s:"كَانَ النَّاسُ أُمَّةً وَاحِدَةً", q:"Bakara 2/213", t:"İnsanlar tek bir ümmetti.", a:"كَانَ", m:["النَّاسُ","أُمَّةً"]},{s:"كَانَ الْمَاءُ بَارِدًا", t:"Su soğuktu.", a:"كَانَ", m:["الْمَاءُ","بَارِدًا"]}]}]},
 {ar:"صَارَ", tr:"Sâra", m:[{ar:"لِلِانْتِقَالِ", tr:"İntikal: oldu, dönüştü", ex:[{s:"صَارَ زَيْدٌ غَنِيًّا", t:"Zeyd zengin oldu.", a:"صَارَ", m:["زَيْدٌ","غَنِيًّا"]},{s:"صَارَ الطِّينُ حَجَرًا", t:"Çamur taş oldu.", a:"صَارَ", m:["الطِّينُ","حَجَرًا"]},{s:"صَارَ الْجَوُّ صَحْوًا", t:"Hava açık oldu.", a:"صَارَ", m:["الْجَوُّ","صَحْوًا"]}]}]},
 {ar:"أَصْبَحَ", tr:"Asbaha", m:[{ar:"لِلدُّخُولِ فِي الصَّبَاحِ، وَبِمَعْنَى صَارَ", tr:"Sabahleyin …oldu; oldu", ex:[{s:"أَصْبَحَ زَيْدٌ فَقِيرًا", t:"Zeyd sabahleyin fakir oldu.", a:"أَصْبَحَ", m:["زَيْدٌ","فَقِيرًا"]},{s:"فَأَصْبَحْتُمْ بِنِعْمَتِهِ إِخْوَانًا", q:"Âl-i İmrân 3/103", t:"O'nun nimetiyle kardeşler oldunuz.", a:"أَصْبَحْ", m:["إِخْوَانًا"]},{s:"أَصْبَحَ الرَّجُلُ قَوِيًّا", t:"Adam güçlü oldu.", a:"أَصْبَحَ", m:["الرَّجُلُ","قَوِيًّا"]}]}]},
 {ar:"أَمْسَى", tr:"Emsâ", m:[{ar:"مِثْلُ أَصْبَحَ (فِي الْمَسَاءِ)", tr:"Akşamleyin …oldu", ex:[{s:"أَمْسَى زَيْدٌ فَقِيرًا", t:"Zeyd akşamleyin fakir oldu.", a:"أَمْسَى", m:["زَيْدٌ","فَقِيرًا"]},{s:"أَمْسَى السَّحَابُ مُمْطِرًا", t:"Bulut akşamleyin yağmurlu oldu.", a:"أَمْسَى", m:["السَّحَابُ","مُمْطِرًا"]},{s:"أَمْسَى الطِّفْلُ نَائِمًا", t:"Çocuk akşam uyur hâle geldi.", a:"أَمْسَى", m:["الطِّفْلُ","نَائِمًا"]}]}]},
 {ar:"أَضْحَى", tr:"Edhâ", m:[{ar:"مِثْلُ أَصْبَحَ (فِي الضُّحَى)", tr:"Kuşluk vakti …oldu", ex:[{s:"أَضْحَى زَيْدٌ آكِلًا", t:"Zeyd kuşluk vakti yemek yer oldu.", a:"أَضْحَى", m:["زَيْدٌ","آكِلًا"]},{s:"أَضْحَى الْقَوْمُ مُسَافِرِينَ", t:"Kavim kuşlukta yolcu oldu.", a:"أَضْحَى", m:["الْقَوْمُ","مُسَافِرِينَ"]},{s:"أَضْحَى الصَّائِمُ مُصَلِّيًا", t:"Oruçlu kuşlukta namaz kılar oldu.", a:"أَضْحَى", m:["الصَّائِمُ","مُصَلِّيًا"]}]}]},
 {ar:"ظَلَّ", tr:"Zalle", m:[{ar:"مِثْلُ أَصْبَحَ (طُولَ النَّهَارِ)، وَبِمَعْنَى صَارَ", tr:"Gün boyu …kaldı; oldu", ex:[{s:"ظَلَّ زَيْدٌ قَائِمًا", t:"Zeyd gün boyu ayakta kaldı.", a:"ظَلَّ", m:["زَيْدٌ","قَائِمًا"]},{s:"ظَلَّ وَجْهُهُ مُسْوَدًّا", q:"Nahl 16/58", t:"Yüzü kapkara kesildi.", a:"ظَلَّ", m:["وَجْهُ","مُسْوَدًّا"]}]}]},
 {ar:"بَاتَ", tr:"Bâte", m:[{ar:"مِثْلُ أَصْبَحَ (فِي اللَّيْلِ)، وَبِمَعْنَى صَارَ", tr:"Gece …olarak geçirdi; oldu", ex:[{s:"بَاتَ زَيْدٌ قَائِمًا", t:"Zeyd geceyi ayakta geçirdi.", a:"بَاتَ", m:["زَيْدٌ","قَائِمًا"]},{s:"بَاتَ الضَّيْفُ شَبْعَانَ", t:"Misafir geceyi tok geçirdi.", a:"بَاتَ", m:["الضَّيْفُ","شَبْعَانَ"]},{s:"بَاتَ النَّجْمُ لَامِعًا", t:"Yıldız gece boyu parladı.", a:"بَاتَ", m:["النَّجْمُ","لَامِعًا"]}]}]},
 {ar:"مَا زَالَ", tr:"Mâ zâle", m:[{ar:"لِلِاسْتِمْرَارِ", tr:"Hâlâ, devamlı …dır", ex:[{s:"مَا زَالَ زَيْدٌ كَرِيمًا", t:"Zeyd hâlâ cömerttir.", a:"زَالَ", m:["زَيْدٌ","كَرِيمًا"]},{s:"مَا زَالَ أَحْمَدُ مَرِيضًا", t:"Ahmed hâlâ hasta.", a:"زَالَ", m:["أَحْمَدُ","مَرِيضًا"]},{s:"مَا زَالَتِ الْمَكْتَبَةُ مُغْلَقَةً", t:"Kütüphane hâlâ kapalı.", a:"زَالَتِ", m:["الْمَكْتَبَةُ","مُغْلَقَةً"]}]}]},
 {ar:"مَا بَرِحَ", tr:"Mâ beriha", m:[{ar:"بِمَعْنَى مَا زَالَ", tr:"Hâlâ (mâ zâle manasında)", ex:[{s:"مَا بَرِحَ الْحَقُّ مُنْتَصِرًا", t:"Hak hep galip olmaya devam etti.", a:"بَرِحَ", m:["الْحَقُّ","مُنْتَصِرًا"]},{s:"مَا بَرِحَ زَيْدٌ غَنِيًّا", t:"Zeyd hâlâ zengin.", a:"بَرِحَ", m:["زَيْدٌ","غَنِيًّا"]}]}]},
 {ar:"مَا فَتِئَ", tr:"Mâ feti'e", m:[{ar:"بِمَعْنَى مَا زَالَ", tr:"Hâlâ (mâ zâle manasında)", ex:[{s:"مَا فَتِئَ الْمُحَارِبُ يَحْلُمُ بِنَصْرٍ", t:"Savaşçı zafer hayal etmeye devam etti.", a:"فَتِئَ", m:["الْمُحَارِبُ"]},{s:"مَا فَتِئَ زَيْدٌ قَائِمًا", t:"Zeyd hâlâ ayakta.", a:"فَتِئَ", m:["زَيْدٌ","قَائِمًا"]}]}]},
 {ar:"مَا انْفَكَّ", tr:"Mâ infekke", m:[{ar:"بِمَعْنَى مَا زَالَ", tr:"Hâlâ (mâ zâle manasında)", ex:[{s:"مَا انْفَكَّ الْعَمَلُ مُسْتَمِرًّا", t:"İş devam etmekte.", a:"انْفَكَّ", m:["الْعَمَلُ","مُسْتَمِرًّا"]},{s:"مَا انْفَكَّ الرَّجُلُ نَادِمًا", t:"Adam hâlâ pişman.", a:"انْفَكَّ", m:["الرَّجُلُ","نَادِمًا"]}]}]},
 {ar:"مَا دَامَ", tr:"Mâ dâme", m:[{ar:"لِلتَّوْقِيتِ", tr:"…dığı sürece", ex:[{s:"اجْلِسْ مَا دَامَ زَيْدٌ جَالِسًا", t:"Zeyd oturduğu sürece otur.", a:"دَامَ", m:["زَيْدٌ","جَالِسًا"]},{s:"لَا أَذْهَبُ مَا دَامَ حَامِدٌ حَاضِرًا", t:"Hâmid burada olduğu sürece gitmem.", a:"دَامَ", m:["حَامِدٌ","حَاضِرًا"]},{s:"لَا أَخْرُجُ مِنَ الْبَيْتِ مَا دَامَ الْمَطَرُ نَازِلًا", t:"Yağmur yağdığı sürece evden çıkmam.", a:"دَامَ", m:["الْمَطَرُ","نَازِلًا"]}]}]},
 {ar:"لَيْسَ", tr:"Leyse", m:[{ar:"لِنَفْيِ الْحَالِ", tr:"Şimdiki zamanı olumsuzlar: değildir", ex:[{s:"لَيْسَ زَيْدٌ قَائِمًا", t:"Zeyd ayakta değil.", a:"لَيْسَ", m:["زَيْدٌ","قَائِمًا"]},{s:"لَيْسَ الْمَسْجِدُ قَرِيبًا", t:"Mescit yakın değil.", a:"لَيْسَ", m:["الْمَسْجِدُ","قَرِيبًا"]},{s:"لَيْسَتْ آمِنَةُ طَبِيبَةً", t:"Âmine doktor değil.", a:"لَيْسَتْ", m:["آمِنَةُ","طَبِيبَةً"]}]}]}
 ]},

{id:"s11", kind:"semai", h:305, amel:"ls", ar:"أَفْعَالُ الْمُقَارَبَةِ", tr:"Mukârebe Fiilleri", sub:"Asâ, kâde, kerebe, evşeke (4)",
 matn:"النَّوْعُ الْحَادِيَ عَشَرَ: أَفْعَالٌ تُسَمَّى أَفْعَالَ الْمُقَارَبَةِ تَرْفَعُ الِاسْمَ وَتَنْصِبُ الْخَبَرَ، وَهِيَ أَرْبَعَةُ أَفْعَالٍ.",
 trIntro:"Haberin gerçekleşmesinin yakın olduğunu bildirirler. Haberleri muzâri fiilli bir cümledir; cümle mahallen mansûbdur.",
 items:[
 {ar:"عَسَى", tr:"Asâ", m:[{ar:"لِلرَّجَاءِ، وَتَكُونُ تَامَّةً", tr:"Umulur ki; bazen tâm olur", ex:[{s:"عَسَى زَيْدٌ أَنْ يَخْرُجَ", t:"Umulur ki Zeyd çıkar.", a:"عَسَى", m:["زَيْدٌ"]},{s:"عَسَى أَنْ يَخْرُجَ زَيْدٌ", t:"Zeyd'in çıkması umulur (tâm).", a:"عَسَى"},{s:"عَسَى اللهُ أَنْ يَأْتِيَنِي بِهِمْ جَمِيعًا", q:"Yûsuf 12/83", t:"Umulur ki Allah onların hepsini bana getirir.", a:"عَسَى", m:["اللهُ"]}]}]},
 {ar:"كَادَ", tr:"Kâde", m:[{ar:"لِلْمُقَارَبَةِ", tr:"Neredeyse …ecekti", ex:[{s:"كَادَ زَيْدٌ يَخْرُجُ", t:"Zeyd neredeyse çıkacaktı.", a:"كَادَ", m:["زَيْدٌ"]},{s:"كَادَ الرَّجُلُ يَقَعُ", t:"Adam neredeyse düşecekti.", a:"كَادَ", m:["الرَّجُلُ"]},{s:"كَادَتِ الشَّمْسُ تَغِيبُ", t:"Güneş neredeyse batacaktı.", a:"كَادَتِ", m:["الشَّمْسُ"]}]}]},
 {ar:"كَرَبَ", tr:"Kerebe", m:[{ar:"لِلْمُقَارَبَةِ", tr:"Yaklaştı, neredeyse", ex:[{s:"كَرَبَ زَيْدٌ يَخْرُجُ", t:"Zeyd çıkmaya yaklaştı.", a:"كَرَبَ", m:["زَيْدٌ"]},{s:"كَرَبَ الْجَهْلُ يَزُولُ", t:"Cehalet yok olmaya yüz tuttu.", a:"كَرَبَ", m:["الْجَهْلُ"]},{s:"كَرَبَتِ الشَّمْسُ تُشْرِقُ", t:"Güneş doğmak üzere.", a:"كَرَبَتِ", m:["الشَّمْسُ"]}]}]},
 {ar:"أَوْشَكَ", tr:"Evşeke", m:[{ar:"لِلْمُقَارَبَةِ", tr:"Yaklaştı, üzere", ex:[{s:"أَوْشَكَ زَيْدٌ أَنْ يَخْرُجَ", t:"Zeyd çıkmak üzere.", a:"أَوْشَكَ", m:["زَيْدٌ"]},{s:"أَوْشَكَ الْمَوْزُ أَنْ يَنْضَجَ", t:"Muz olgunlaşmak üzere.", a:"أَوْشَكَ", m:["الْمَوْزُ"]},{s:"أَوْشَكَ الْقِطَارُ أَنْ يَصِلَ", t:"Tren varmak üzere.", a:"أَوْشَكَ", m:["الْقِطَارُ"]}]}]}
 ]},

{id:"s12", kind:"semai", h:330, amel:"md", ar:"أَفْعَالُ الْمَدْحِ وَالذَّمِّ", tr:"Medih ve Zem Fiilleri", sub:"Ni'me, bi'se, habbezâ, sâe (4)",
 matn:"النَّوْعُ الثَّانِيَ عَشَرَ: أَفْعَالُ الْمَدْحِ وَالذَّمِّ تَرْفَعُ الِاسْمَ الْجِنْسَ الْمُعَرَّفَ بِاللَّامِ، وَهِيَ أَرْبَعَةُ أَفْعَالٍ.",
 trIntro:"Övgü (medih) veya yergi (zem) bildirirler. Fâilleri elif-lâmlı cins ismidir (الرَّجُلُ); ardından övülen/yerilen kişi (mahsûs) gelir: نِعْمَ الرَّجُلُ زَيْدٌ.",
 items:[
 {ar:"نِعْمَ", tr:"Ni'me", m:[{ar:"لِلْمَدْحِ", tr:"Medih: ne güzel!", ex:[{s:"نِعْمَ الرَّجُلُ زَيْدٌ", t:"Zeyd ne güzel adam!", a:"نِعْمَ", m:["الرَّجُلُ"]},{s:"نِعْمَ الرَّجُلُ الْمُجْتَهِدُ", t:"Çalışkan ne güzel adam!", a:"نِعْمَ", m:["الرَّجُلُ"]},{s:"نِعْمَ دَارُ الْمُتَّقِينَ الْجَنَّةُ", t:"Takvâ sahiplerinin yurdu cennet ne güzeldir!", a:"نِعْمَ", m:["دَارُ"]}]}]},
 {ar:"بِئْسَ", tr:"Bi'se", m:[{ar:"لِلذَّمِّ", tr:"Zem: ne kötü!", ex:[{s:"بِئْسَ الرَّجُلُ زَيْدٌ", t:"Zeyd ne kötü adam!", a:"بِئْسَ", m:["الرَّجُلُ"]},{s:"بِئْسَ الرَّجُلُ الْكَسُولُ", t:"Tembel ne kötü adam!", a:"بِئْسَ", m:["الرَّجُلُ"]},{s:"بِئْسَ مَصِيرُ الْكَافِرِينَ النَّارُ", t:"Kâfirlerin varacağı yer ateş, ne kötüdür!", a:"بِئْسَ", m:["مَصِيرُ"]}]}]},
 {ar:"حَبَّذَا", tr:"Habbezâ", m:[{ar:"لِلْمَدْحِ", tr:"Medih: ne hoş!", ex:[{s:"حَبَّذَا الرَّجُلُ زَيْدٌ", t:"Zeyd ne hoş adam!", a:"حَبَّذَا"},{s:"حَبَّذَا الصِّدْقُ", t:"Doğruluk ne hoş!", a:"حَبَّذَا"},{s:"حَبَّذَا الْأَمَانَةُ", t:"Emanet ne hoş!", a:"حَبَّذَا"}]}]},
 {ar:"سَاءَ", tr:"Sâe", m:[{ar:"لِلذَّمِّ", tr:"Zem: ne kötü!", ex:[{s:"سَاءَ الرَّجُلُ زَيْدٌ", t:"Zeyd ne kötü adam!", a:"سَاءَ", m:["الرَّجُلُ"]},{s:"سَاءَ الرَّجُلُ أَبُو جَهْلٍ", t:"Ebû Cehil ne kötü adam!", a:"سَاءَ", m:["الرَّجُلُ"]},{s:"سَاءَ حَطَبُ النَّارِ أَبُو لَهَبٍ", t:"Ateşin odunu Ebû Leheb ne kötü!", a:"سَاءَ", m:["حَطَبُ"]}]}]}
 ]},

{id:"s13", kind:"semai", h:205, amel:"qul", ar:"أَفْعَالُ الشَّكِّ وَالْيَقِينِ", tr:"Şek ve Yakîn Fiilleri", sub:"Ef'âl-i kulûb: iki ismi nasb eden 7 fiil",
 matn:"النَّوْعُ الثَّالِثَ عَشَرَ: أَفْعَالُ الشَّكِّ وَالْيَقِينِ تَدْخُلُ عَلَى اسْمَيْنِ ثَانِيهِمَا عِبَارَةٌ عَنِ الْأَوَّلِ وَتَنْصِبُهُمَا جَمِيعًا، وَهِيَ سَبْعَةُ أَفْعَالٍ.",
 trIntro:"Kalp fiilleridir (zan ve bilgi). Mübtedâ ve habere girip ikisini de mef'ûl yaparak nasb ederler: زَيْدٌ كَرِيمٌ → ظَنَنْتُ زَيْدًا كَرِيمًا. Başka manaya gelince (ittehemtu, araftu, ebsartu…) tek mef'ûl alırlar.",
 items:[
 {ar:"ظَنَنْتُ", tr:"Zanentu", m:[{ar:"لِلشَّكِّ، وَبِمَعْنَى اتَّهَمْتُ يَكْتَفِي بِمَفْعُولٍ", tr:"Sandım; 'itham ettim' manasında tek mef'ûl", ex:[{s:"ظَنَنْتُ زَيْدًا كَرِيمًا", t:"Zeyd'i cömert sandım.", a:"ظَنَنْتُ", m:["زَيْدًا","كَرِيمًا"]},{s:"وَمَا أَظُنُّ السَّاعَةَ قَائِمَةً", q:"Kehf 18/36", t:"Kıyametin kopacağını sanmıyorum.", a:"أَظُنُّ", m:["السَّاعَةَ","قَائِمَةً"]},{s:"ظَنَنْتُ حَامِدًا مَرِيضًا", t:"Hâmid'i hasta sandım.", a:"ظَنَنْتُ", m:["حَامِدًا","مَرِيضًا"]}]}]},
 {ar:"حَسِبْتُ", tr:"Hasibtu", m:[{ar:"لِلشَّكِّ", tr:"Sandım", ex:[{s:"حَسِبْتُ أَخَاكَ كَرِيمًا", t:"Kardeşini cömert sandım.", a:"حَسِبْتُ", m:["أَخَا","كَرِيمًا"]},{s:"وَتَحْسَبُهُمْ أَيْقَاظًا وَهُمْ رُقُودٌ", q:"Kehf 18/18", t:"Onlar uyuyor oldukları hâlde sen onları uyanık sanırsın.", a:"تَحْسَبُ", m:["أَيْقَاظًا"]},{s:"حَسِبَ النَّاسُ الْأَمَانَةَ خُلُقًا كَرِيمًا", t:"İnsanlar emaneti değerli bir ahlâk saydılar.", a:"حَسِبَ", m:["الْأَمَانَةَ","خُلُقًا"]}]}]},
 {ar:"خِلْتُ", tr:"Hiltu", m:[{ar:"لِلشَّكِّ", tr:"Sandım, zannettim", ex:[{s:"خِلْتُ زَيْدًا عَاقِلًا", t:"Zeyd'i akıllı sandım.", a:"خِلْتُ", m:["زَيْدًا","عَاقِلًا"]},{s:"خِلْتُ الْبُسْتَانَ مُثْمِرًا", t:"Bahçeyi meyveli sandım.", a:"خِلْتُ", m:["الْبُسْتَانَ","مُثْمِرًا"]},{s:"خَالَ الْكَسُولُ النَّجَاحَ سَهْلًا", t:"Tembel başarıyı kolay sandı.", a:"خَالَ", m:["النَّجَاحَ","سَهْلًا"]}]}]},
 {ar:"عَلِمْتُ", tr:"Alimtu", m:[{ar:"لِلْيَقِينِ، وَبِمَعْنَى عَرَفْتُ يَكْتَفِي بِمَفْعُولٍ", tr:"Bildim; 'tanıdım' manasında tek mef'ûl", ex:[{s:"عَلِمْتُ زَيْدًا فَاضِلًا", t:"Zeyd'in faziletli olduğunu bildim.", a:"عَلِمْتُ", m:["زَيْدًا","فَاضِلًا"]},{s:"عَلِمْتُ الصِّدْقَ فِي الْقَوْلِ مَنْجَاةً لِلْجَمِيعِ", t:"Sözde doğruluğu herkes için kurtuluş bildim.", a:"عَلِمْتُ", m:["الصِّدْقَ","مَنْجَاةً"]},{s:"عَلِمَ الصَّحَفِيُّ الْخَبَرَ صَحِيحًا", t:"Gazeteci haberin doğru olduğunu bildi.", a:"عَلِمَ", m:["الْخَبَرَ","صَحِيحًا"]}]}]},
 {ar:"رَأَيْتُ", tr:"Raeytu", m:[{ar:"لِلْيَقِينِ، وَبِمَعْنَى أَبْصَرْتُ يَكْتَفِي بِمَفْعُولٍ", tr:"Kanaat ettim; 'gördüm' manasında tek mef'ûl", ex:[{s:"رَأَيْتُ زَيْدًا قَائِمًا", t:"Zeyd'i ayakta (olarak) bildim.", a:"رَأَيْتُ", m:["زَيْدًا","قَائِمًا"]},{s:"رَأَيْتُ الْحَقِيقَةَ وَاضِحَةً", t:"Hakikati açık gördüm.", a:"رَأَيْتُ", m:["الْحَقِيقَةَ","وَاضِحَةً"]},{s:"رَأَيْتُ الْعِلْمَ النَّافِعَ مُفِيدًا لِصَاحِبِهِ", t:"Faydalı ilmi sahibine yararlı gördüm.", a:"رَأَيْتُ", m:["الْعِلْمَ","مُفِيدًا"]}]}]},
 {ar:"وَجَدْتُ", tr:"Vecedtu", m:[{ar:"لِلْيَقِينِ، وَبِمَعْنَى أَصَبْتُ يَكْتَفِي بِمَفْعُولٍ", tr:"Buldum (bildim); 'ele geçirdim' manasında tek mef'ûl", ex:[{s:"وَجَدْتُ زَيْدًا جَوَادًا", t:"Zeyd'i cömert buldum.", a:"وَجَدْتُ", m:["زَيْدًا","جَوَادًا"]},{s:"وَجَدْتُ أَخَاكَ جَالِسًا", t:"Kardeşini oturur buldum.", a:"وَجَدْتُ", m:["أَخَا","جَالِسًا"]},{s:"وَجَدَ الطَّالِبُ التَّعَامُلَ سَهْلًا", t:"Öğrenci muameleyi kolay buldu.", a:"وَجَدَ", m:["التَّعَامُلَ","سَهْلًا"]}]}]},
 {ar:"زَعَمْتُ", tr:"Zeamtu", m:[{ar:"لِلشَّكِّ، وَبِمَعْنَى قُلْتُ يَكْتَفِي بِمَفْعُولٍ", tr:"İddia ettim; 'dedim' manasında tek mef'ûl", ex:[{s:"زَعَمْتُ زَيْدًا فَاضِلًا", t:"Zeyd'i faziletli iddia ettim.", a:"زَعَمْتُ", m:["زَيْدًا","فَاضِلًا"]},{s:"زَعَمَ الطَّالِبُ الِامْتِحَانَ سَهْلًا", t:"Öğrenci sınavı kolay iddia etti.", a:"زَعَمَ", m:["الِامْتِحَانَ","سَهْلًا"]},{s:"زَعَمَ الْمُجْرِمُ السَّرِقَةَ مَقْبُولَةً", t:"Suçlu hırsızlığı kabul edilebilir iddia etti.", a:"زَعَمَ", m:["السَّرِقَةَ","مَقْبُولَةً"]}]}]}
 ]},

{id:"s14", kind:"qiyasi", h:120, amel:"rn", ar:"الْعَوَامِلُ الْقِيَاسِيَّةُ", tr:"Kıyâsî Âmiller", sub:"Bir kurala bağlı 7 âmil",
 matn:"وَالْقِيَاسِيَّةُ مِنْهَا سَبْعَةُ عَوَامِلَ.",
 trIntro:"Tek tek sayılmaz; bir kurala bağlıdır: her fiil, her masdar, her ism-i fâil… kendi kuralıyla amel eder. Bu yüzden 'kıyâsî' denir.",
 items:[
 {ar:"الْفِعْلُ", tr:"Fiil (mutlak)", m:[{ar:"عَلَى الْإِطْلَاقِ", tr:"Her fiil fâili ref', mef'ûlü nasb eder", ex:[{s:"ضَرَبَ زَيْدٌ عَمْرًا", t:"Zeyd Amr'ı dövdü.", a:"ضَرَبَ", m:["زَيْدٌ","عَمْرًا"]},{s:"كَتَبَ أَحْمَدُ الدَّرْسَ", t:"Ahmed dersi yazdı.", a:"كَتَبَ", m:["أَحْمَدُ","الدَّرْسَ"]},{s:"سَأَلَ الطُّلَّابُ الْمُدَرِّسَ أَسْئِلَةً كَثِيرَةً", t:"Öğrenciler öğretmene çok soru sordu.", a:"سَأَلَ", m:["الطُّلَّابُ","الْمُدَرِّسَ"]}]}]},
 {ar:"الْمَصْدَرُ", tr:"Masdar", m:[{ar:"يَعْمَلُ عَمَلَ فِعْلِهِ", tr:"Fiili gibi amel eder", ex:[{s:"أَعْجَبَنِي ضَرْبُ زَيْدٍ عَمْرًا", t:"Zeyd'in Amr'ı dövmesi hoşuma gitti.", a:"ضَرْبُ", m:["عَمْرًا"]},{s:"أُحِبُّ رُكُوبَ الْخَيْلِ", t:"Ata binmeyi severim.", a:"رُكُوبَ", m:["الْخَيْلِ"]}]}]},
 {ar:"اسْمُ الْفَاعِلِ", tr:"İsm-i fâil", m:[{ar:"يَعْمَلُ عَمَلَ فِعْلِهِ الْمَعْلُومِ", tr:"Ma'lûm fiili gibi amel eder", ex:[{s:"زَيْدٌ ضَارِبٌ غُلَامُهُ عَمْرًا", t:"Zeyd'in kölesi Amr'ı dövücüdür.", a:"ضَارِبٌ", m:["غُلَامُ","عَمْرًا"]},{s:"الْمَجُوسِيُّ عَابِدُ النَّارِ", t:"Mecûsî ateşe tapandır.", a:"عَابِدُ", m:["النَّارِ"]}]}]},
 {ar:"اسْمُ الْمَفْعُولِ", tr:"İsm-i mef'ûl", m:[{ar:"يَعْمَلُ عَمَلَ فِعْلِهِ الْمَجْهُولِ", tr:"Meçhul fiili gibi amel eder", ex:[{s:"زَيْدٌ مُعْطًى غُلَامُهُ دِرْهَمًا", t:"Zeyd'in kölesine bir dirhem verilmiştir.", a:"مُعْطًى", m:["غُلَامُ","دِرْهَمًا"]},{s:"لَا طَاعَةَ لِمَخْلُوقٍ فِي مَعْصِيَةِ الْخَالِقِ", q:"Hadis", t:"Yaratana isyanda yaratılmışa itaat yoktur.", a:"لِ"}]}]},
 {ar:"الصِّفَةُ الْمُشَبَّهَةُ", tr:"Sıfat-ı müşebbehe", m:[{ar:"تَعْمَلُ عَمَلَ فِعْلِهَا", tr:"Fiili gibi amel eder", ex:[{s:"جَاءَنِي رَجُلٌ حَسَنٌ وَجْهُهُ", t:"Bana yüzü güzel bir adam geldi.", a:"حَسَنٌ", m:["وَجْهُ"]},{s:"خَالِدٌ جَمِيلُ الْوَجْهِ", t:"Hâlid yüzü güzel biridir.", a:"جَمِيلُ", m:["الْوَجْهِ"]},{s:"زَيْدٌ شُجَاعٌ قَوْلًا", t:"Zeyd söz bakımından cesurdur.", a:"شُجَاعٌ", m:["قَوْلًا"]}]}]},
 {ar:"الْمُضَافُ", tr:"Muzâf", m:[{ar:"كُلُّ اسْمٍ أُضِيفَ إِلَى اسْمٍ آخَرَ", tr:"Başka isme izâfe edilen her isim (cerr eder)", ex:[{s:"غُلَامُ زَيْدٍ", t:"Zeyd'in kölesi.", a:"غُلَامُ", m:["زَيْدٍ"]},{s:"خَاتَمُ فِضَّةٍ", t:"Gümüş yüzük.", a:"خَاتَمُ", m:["فِضَّةٍ"]},{s:"إِنَّ اللهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ", q:"Tevbe 9/120", t:"Allah iyilik yapanların ecrini zayi etmez.", a:"أَجْرَ", m:["الْمُحْسِنِينَ"]}]}]},
 {ar:"الِاسْمُ التَّامُّ", tr:"İsm-i tâm", m:[{ar:"كُلُّ اسْمٍ اسْتَغْنَى عَنِ الْإِضَافَةِ", tr:"İzâfetten müstağni her isim (temyîzi nasb eder)", ex:[{s:"عِنْدِي رَاقُودٌ خَلًّا", t:"Yanımda bir küp sirke var.", a:"رَاقُودٌ", m:["خَلًّا"]},{s:"عِنْدِي مَنَوَانِ سَمْنًا", t:"Yanımda iki men tereyağı var.", a:"مَنَوَانِ", m:["سَمْنًا"]},{s:"عِنْدِي عِشْرُونَ دِرْهَمًا", t:"Yanımda yirmi dirhem var.", a:"عِشْرُونَ", m:["دِرْهَمًا"]}]}]}
 ]},

{id:"s15", kind:"manawi", h:265, amel:"raf", ar:"الْعَوَامِلُ الْمَعْنَوِيَّةُ", tr:"Ma'nevî Âmiller", sub:"Görünmeyen, anlamdan doğan 2 âmil",
 matn:"وَالْمَعْنَوِيَّةُ مِنْهَا عَدَدَانِ.",
 trIntro:"Telaffuz edilen bir kelime değildir; bir durumun kendisi âmildir. Mübtedâ ile haberi, başta bulunmaları (ibtidâ) ref' eder; muzâriyi de ismin yerine geçmesi ref' eder.",
 items:[
 {ar:"الْعَامِلُ فِي الْمُبْتَدَإِ وَالْخَبَرِ", tr:"İbtidâ (mübtedâ ve haberin âmili)", m:[{ar:"وَهُوَ كَوْنُهُ مُبْتَدَأً وَخَبَرًا", tr:"Mübtedâ ve haber olmaları", ex:[{s:"زَيْدٌ مُنْطَلِقٌ", t:"Zeyd gidicidir.", m:["زَيْدٌ","مُنْطَلِقٌ"]},{s:"الْكِتَابُ جَدِيدٌ", t:"Kitap yenidir.", m:["الْكِتَابُ","جَدِيدٌ"]},{s:"الْقُرْآنُ كِتَابُ اللهِ", t:"Kur'an Allah'ın kitabıdır.", m:["الْقُرْآنُ","كِتَابُ"]},{s:"مِفْتَاحُ الْجَنَّةِ الصَّلَاةُ", t:"Cennetin anahtarı namazdır.", m:["مِفْتَاحُ","الصَّلَاةُ"]}]}]},
 {ar:"الْعَامِلُ فِي الْفِعْلِ الْمُضَارِعِ", tr:"Muzâriyi ref' eden âmil", m:[{ar:"وَهُوَ وُقُوعُهُ مَوْقِعَ الِاسْمِ", tr:"İsmin yerine geçmesi", ex:[{s:"زَيْدٌ يَضْرِبُ", t:"Zeyd dövüyor. (يَضْرِبُ, ضَارِبٌ'ın yerinde)", m:["يَضْرِبُ"]},{s:"يَشْرَحُ زَيْدٌ الدَّرْسَ", t:"Zeyd dersi anlatıyor.", m:["يَشْرَحُ"]},{s:"وَالْوَالِدَاتُ يُرْضِعْنَ", q:"Bakara 2/233", t:"Anneler emzirirler.", m:["يُرْضِعْنَ"]}]}]}
 ]}
];

/* ===== KİTABIN ETKİNLİKLERİ ===== */
const ACTIVITIES = [
 {id:"e1", st:"s1", type:"choose", title:"Doğru şekli seç", ar:"اخْتَرِ الصِّيغَةَ الصَّحِيحَةَ", tr:"Bâ'dan sonra isim mecrûr olur. Boşluğa uyan doğru şekli seç.", page:19,
  q:[{s:"نَنَامُ ____", o:["بِاللَّيْلَ","بِاللَّيْلُ","بِاللَّيْلِ"], a:2, t:"Geceleyin uyuruz."},
     {s:"أَتَعَلَّمُ ____", o:["بِالْمَدْرَسَةِ","بِالْمَدْرَسَةَ","بِالْمَدْرَسَةُ"], a:0, t:"Okulda öğrenirim."},
     {s:"مَرَرْتُ ____", o:["بِمُحَمَّدٌ","بِمُحَمَّدًا","بِمُحَمَّدٍ"], a:2, t:"Muhammed'in yanından geçtim."},
     {s:"نَتَسَابَقُ ____", o:["بِالدَّرَّاجَةُ","بِالدَّرَّاجَةِ","بِالدَّرَّاجَةَ"], a:1, t:"Bisikletle yarışırız."}]},
 {id:"e2", st:"s1", type:"choose", title:"Bâ'nın manasını bul", ar:"اخْتَرْ مَعْنَى الْبَاءِ", tr:"Renkli kelimedeki bâ hangi manadadır?", page:19,
  q:[{s:"وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", w:"بِالصَّبْرِ", o:["لِلْإِلْصَاقِ","لِلِاسْتِعَانَةِ","زَائِدَةٌ"], a:1, t:"Sabır ve namazla yardım dileyin."},
     {s:"بَاعَ الرَّجُلُ مَنْزِلَهُ بِأَثَاثِهِ", w:"بِأَثَاثِهِ", o:["لِلْمُقَابَلَةِ","لِلِاسْتِعَانَةِ","لِلْمُصَاحَبَةِ"], a:2, t:"Adam evini eşyasıyla birlikte sattı."},
     {s:"أَنَامُ بِسَرِيرِي", w:"بِسَرِيرِي", o:["زَائِدَةٌ","لِلظَّرْفِيَّةِ","لِلتَّعْدِيَةِ"], a:1, t:"Yatağımda uyurum."},
     {s:"أَتَعَلَّمُ بِالْمَدْرَسَةِ", w:"بِالْمَدْرَسَةِ", o:["لِلظَّرْفِيَّةِ","لِلِاسْتِعَانَةِ","لِلْمُصَاحَبَةِ"], a:0, t:"Okulda öğrenirim."},
     {s:"نَنَامُ بِاللَّيْلِ", w:"بِاللَّيْلِ", o:["زَائِدَةٌ","لِلظَّرْفِيَّةِ","لِلتَّعْدِيَةِ"], a:1, t:"Geceleyin uyuruz."},
     {s:"نَتَسَابَقُ بِالدَّرَّاجَةِ", w:"بِالدَّرَّاجَةِ", o:["لِلْمُقَابَلَةِ","لِلِاسْتِعَانَةِ","لِلْمُصَاحَبَةِ"], a:1, t:"Bisikletle yarışırız."},
     {s:"نَذْهَبُ إِلَى الْمَدْرَسَةِ بِالسَّيَّارَةِ", w:"بِالسَّيَّارَةِ", o:["لِلْإِلْصَاقِ","لِلِاسْتِعَانَةِ","زَائِدَةٌ"], a:1, t:"Okula arabayla gideriz."},
     {s:"أَتَنَاوَلُ طَعَامِي بِالْمِلْعَقَةِ", w:"بِالْمِلْعَقَةِ", o:["لِلتَّعْدِيَةِ","لِلظَّرْفِيَّةِ","لِلِاسْتِعَانَةِ"], a:2, t:"Yemeğimi kaşıkla yerim."},
     {s:"مَرَرْتُ بِمُحَمَّدٍ", w:"بِمُحَمَّدٍ", o:["لِلْإِلْصَاقِ","لِلِاسْتِعَانَةِ","زَائِدَةٌ"], a:0, t:"Muhammed'in yanından geçtim."},
     {s:"سُبْحَانَ الَّذِي أَسْرَى بِعَبْدِهِ لَيْلًا", w:"بِعَبْدِهِ", o:["لِلتَّعْدِيَةِ","لِلظَّرْفِيَّةِ","لِلِاسْتِعَانَةِ"], a:0, t:"Kulunu geceleyin yürüten (Allah) münezzehtir."},
     {s:"الْحُرُّ بِالْحُرِّ وَالْعَبْدُ بِالْعَبْدِ", w:"بِالْحُرِّ", o:["لِلْمُقَابَلَةِ","لِلِاسْتِعَانَةِ","لِلْمُصَاحَبَةِ"], a:0, t:"Hüre karşılık hür, köleye karşılık köle."},
     {s:"وَكَفَى بِاللهِ حَسِيبًا", w:"بِاللهِ", o:["زَائِدَةٌ","لِلظَّرْفِيَّةِ","لِلتَّعْدِيَةِ"], a:0, t:"Hesap görücü olarak Allah yeter."}]},
 {id:"e3", st:"s1", type:"choose", title:"Min'in manasını bul", ar:"اخْتَرْ مَعْنَى مِنْ", tr:"Renkli kelimedeki min hangi manadadır?", page:21,
  q:[{s:"سُبْحَانَ الَّذِي أَسْرَى بِعَبْدِهِ لَيْلًا مِنَ الْمَسْجِدِ الْحَرَامِ", w:"مِنَ", o:["لِابْتِدَاءِ الْغَايَةِ","لِلتَّبْيِينِ","لِلتَّبْعِيضِ"], a:0, t:"…Mescid-i Haram'dan."},
     {s:"وَيَلْبَسُونَ ثِيَابًا خُضْرًا مِنْ سُنْدُسٍ وَإِسْتَبْرَقٍ", w:"مِنْ", o:["لِابْتِدَاءِ الْغَايَةِ","لِلتَّبْيِينِ","زَائِدَةٌ"], a:1, t:"İnce ve kalın ipekten yeşil elbiseler giyerler."},
     {s:"فَأَنْزَلْنَا مِنَ السَّمَاءِ مَاءً", w:"مِنَ", o:["لِلتَّبْعِيضِ","زَائِدَةٌ","لِابْتِدَاءِ الْغَايَةِ"], a:2, t:"Gökten su indirdik."},
     {s:"وَمِنَ النَّاسِ مَنْ يَقُولُ آمَنَّا بِاللهِ", w:"مِنَ", o:["لِابْتِدَاءِ الْغَايَةِ","لِلتَّبْيِينِ","لِلتَّبْعِيضِ"], a:2, t:"İnsanlardan bazısı 'Allah'a iman ettik' der."},
     {s:"هَلْ مِنْ جَدِيدٍ", w:"مِنْ", o:["لِابْتِدَاءِ الْغَايَةِ","لِلتَّبْيِينِ","زَائِدَةٌ"], a:2, t:"Yeni bir şey var mı?"},
     {s:"هَلْ مِنْ مَزِيدٍ", w:"مِنْ", o:["لِلتَّبْعِيضِ","زَائِدَةٌ","لِابْتِدَاءِ الْغَايَةِ"], a:1, t:"Daha fazlası var mı?"}]},
 {id:"e4", st:"s2", type:"transform", amil:"in", title:"İnne'yi cümleye sok", ar:"أَدْخِلْ (إِنَّ) عَلَى الْجُمَلِ الْآتِيَةِ", tr:"İnne gelince mübtedâ üstün (mansûb) olur, haber ötre kalır.", page:29,
  q:[["الدَّرْسُ سَهْلٌ","إِنَّ الدَّرْسَ سَهْلٌ"],["السَّيَّارَةُ جَمِيلَةٌ","إِنَّ السَّيَّارَةَ جَمِيلَةٌ"],["اللُّغَةُ الْعَرَبِيَّةُ سَهْلَةٌ","إِنَّ اللُّغَةَ الْعَرَبِيَّةَ سَهْلَةٌ"],["الْقُرْآنُ كِتَابُ اللهِ","إِنَّ الْقُرْآنَ كِتَابُ اللهِ"],["حَامِدٌ مُتَزَوِّجٌ","إِنَّ حَامِدًا مُتَزَوِّجٌ"],["نَحْنُ مُسْلِمُونَ","إِنَّنَا مُسْلِمُونَ"]],
  wrong:[["إِنَّ الدَّرْسُ سَهْلٌ","إِنَّ الدَّرْسَ سَهْلًا"],["إِنَّ السَّيَّارَةُ جَمِيلَةٌ","إِنَّ السَّيَّارَةَ جَمِيلَةً"],["إِنَّ اللُّغَةُ الْعَرَبِيَّةُ سَهْلَةٌ","إِنَّ اللُّغَةَ الْعَرَبِيَّةَ سَهْلَةً"],["إِنَّ الْقُرْآنُ كِتَابُ اللهِ","إِنَّ الْقُرْآنَ كِتَابَ اللهِ"],["إِنَّ حَامِدٌ مُتَزَوِّجٌ","إِنَّ حَامِدًا مُتَزَوِّجًا"],["إِنَّ نَحْنُ مُسْلِمُونَ","إِنَّنَا مُسْلِمِينَ"]]},
 {id:"e5", st:"s10", type:"transform", amil:"ls", title:"Kâne'yi cümleye sok", ar:"أَدْخِلْ (كَانَ) عَلَى الْجُمَلِ الْآتِيَةِ", tr:"Kâne gelince mübtedâ ötre kalır, haber üstün (mansûb) olur.", page:43,
  q:[["الدَّرْسُ سَهْلٌ","كَانَ الدَّرْسُ سَهْلًا"],["زَيْنَبُ طَالِبَةٌ","كَانَتْ زَيْنَبُ طَالِبَةً"],["زَيْدٌ مَرِيضٌ الْآنَ","كَانَ زَيْدٌ مَرِيضًا الْآنَ"],["الْمُدِيرُ جَالِسٌ فِي غُرْفَتِهِ","كَانَ الْمُدِيرُ جَالِسًا فِي غُرْفَتِهِ"],["هَاشِمٌ مُدَرِّسٌ","كَانَ هَاشِمٌ مُدَرِّسًا"],["الْجَوُّ بَارِدٌ","كَانَ الْجَوُّ بَارِدًا"]],
  wrong:[["كَانَ الدَّرْسَ سَهْلٌ","كَانَ الدَّرْسُ سَهْلٌ"],["كَانَتْ زَيْنَبَ طَالِبَةٌ","كَانَتْ زَيْنَبُ طَالِبَةٌ"],["كَانَ زَيْدًا مَرِيضٌ الْآنَ","كَانَ زَيْدٌ مَرِيضٌ الْآنَ"],["كَانَ الْمُدِيرَ جَالِسٌ فِي غُرْفَتِهِ","كَانَ الْمُدِيرُ جَالِسٌ فِي غُرْفَتِهِ"],["كَانَ هَاشِمًا مُدَرِّسٌ","كَانَ هَاشِمٌ مُدَرِّسٌ"],["كَانَ الْجَوَّ بَارِدٌ","كَانَ الْجَوُّ بَارِدٌ"]]},
 {id:"e6", st:"s14", type:"choose", title:"İsm-i fâil kur", ar:"صُغْ أَسْمَاءَ الْفَاعِلِينَ مِنَ الْأَفْعَالِ الْآتِيَةِ", tr:"Sülâsî fiilden ism-i fâil فَاعِلٌ kalıbındadır: رَكَعَ → رَاكِعٌ.", page:52,
  bank:"سَارِقٌ – قَاتِلٌ – جَاهِلٌ – ذَاهِبٌ – عَاقِلٌ – عَافٍ – زَانٍ – حَاجٌّ – قَائِلٌ – بَائِعٌ",
  q:[{s:"رَكَعَ يَرْكَعُ", o:["رَاكِعٌ","مَرْكُوعٌ","رَكِيعٌ"], a:0},{s:"سَجَدَ يَسْجُدُ", o:["مَسْجُودٌ","سَاجِدٌ","سُجُودٌ"], a:1},{s:"عَلِمَ يَعْلَمُ", o:["عَالِمٌ","مَعْلُومٌ","عِلْمٌ"], a:0},{s:"جَلَسَ يَجْلِسُ", o:["مَجْلِسٌ","جُلُوسٌ","جَالِسٌ"], a:2},{s:"نَامَ يَنَامُ", o:["نَائِمٌ","مَنُومٌ","نَوْمٌ"], a:0},{s:"شَهِدَ يَشْهَدُ", o:["مَشْهُودٌ","شَاهِدٌ","شَهِيدٌ"], a:1},
     {s:"سَأَلَ يَسْأَلُ", o:["مَسْؤُولٌ","سُؤَالٌ","سَائِلٌ"], a:2},{s:"بَكَى يَبْكِي", o:["بَاكٍ","مَبْكِيٌّ","بُكَاءٌ"], a:0},{s:"نَجَا يَنْجُو", o:["مَنْجُوٌّ","نَاجٍ","نَجَاةٌ"], a:1},{s:"كَتَبَ يَكْتُبُ", o:["كَاتِبٌ","مَكْتُوبٌ","كِتَابٌ"], a:0},{s:"خَرَجَ يَخْرُجُ", o:["مَخْرُوجٌ","خُرُوجٌ","خَارِجٌ"], a:2},{s:"دَخَلَ يَدْخُلُ", o:["دَاخِلٌ","مَدْخُولٌ","مَدْخَلٌ"], a:0}]},
 {id:"e7", st:"s14", type:"choose", title:"İsm-i mef'ûl kur", ar:"صُغْ أَسْمَاءَ الْمَفْعُولِينَ مِنَ الْأَفْعَالِ الْآتِيَةِ", tr:"Sülâsî fiilden ism-i mef'ûl مَفْعُولٌ kalıbındadır: عَلِمَ → مَعْلُومٌ.", page:53,
  bank:"مَفْصُولٌ – مَخْلُوقٌ – مَسْمُوحٌ – مَمْنُوعٌ – مَنْصُورٌ – مَقُولٌ – مَبِيعٌ – مَدْعُوٌّ – مَبْنِيٌّ",
  q:[{s:"عَلِمَ يَعْلَمُ", o:["مَعْلُومٌ","عَالِمٌ","عَلِيمٌ"], a:0},{s:"سَأَلَ يَسْأَلُ", o:["سَائِلٌ","مَسْؤُولٌ","سُؤَالٌ"], a:1},{s:"كَتَبَ يَكْتُبُ", o:["كَاتِبٌ","كِتَابٌ","مَكْتُوبٌ"], a:2},{s:"كَرِهَ يَكْرَهُ", o:["مَكْرُوهٌ","كَارِهٌ","كَرِيهٌ"], a:0},{s:"أَكَلَ يَأْكُلُ", o:["آكِلٌ","مَأْكُولٌ","أَكُولٌ"], a:1},{s:"قَتَلَ يَقْتُلُ", o:["قَاتِلٌ","قَتِيلٌ","مَقْتُولٌ"], a:2},
     {s:"زَارَ يَزُورُ", o:["مَزُورٌ","زَائِرٌ","زِيَارَةٌ"], a:0},{s:"كَالَ يَكِيلُ", o:["كَائِلٌ","مَكِيلٌ","كَيْلٌ"], a:1},{s:"زَادَ يَزِيدُ", o:["زَائِدٌ","زِيَادَةٌ","مَزِيدٌ"], a:2},{s:"تَلَا يَتْلُو", o:["مَتْلُوٌّ","تَالٍ","تِلَاوَةٌ"], a:0},{s:"رَجَا يَرْجُو", o:["رَاجٍ","مَرْجُوٌّ","رَجَاءٌ"], a:1},{s:"كَوَى يَكْوِي", o:["كَاوٍ","كَيٌّ","مَكْوِيٌّ"], a:2}]}
];

/* ===== DÖNÜŞTÜRÜCÜ (Âmil Laboratuvarı) =====
   Kelime: [kök (son hareke hariç), tip]  tip: d=belirli (ال/izâfet/özel isim, ُ/َ/ِ), n=nekre (ٌ/ًا/ٍ), nt=nekre tâ-i merbûta (ٌ/ً/ٍ), dg=gayr-i munsarif belirli (ُ/َ) */
const LAB_SENTENCES = [
 {mb:["الدَّرْس","d"], kh:["سَهْل","n"], t:"Ders kolaydır."},
 {mb:["السَّيَّارَة","d"], kh:["جَمِيلَة","nt"], t:"Araba güzeldir."},
 {mb:["زَيْد","n"], kh:["مَرِيض","n"], t:"Zeyd hastadır."},
 {mb:["الْجَوّ","d"], kh:["بَارِد","n"], t:"Hava soğuktur."},
 {mb:["الْعِلْم","d"], kh:["نُور","n"], t:"İlim nurdur."},
 {mb:["هَاشِم","n"], kh:["مُدَرِّس","n"], t:"Hâşim öğretmendir."},
 {mb:["الطَّالِب","d"], kh:["مُجْتَهِد","n"], t:"Öğrenci çalışkandır."},
 {mb:["زَيْنَب","dg", "f"], kh:["طَالِبَة","nt"], t:"Zeyneb öğrencidir."}
];
const LAB_AMILS = [
 {ar:"", tr:"(âmil yok – ibtidâ)", mb:"raf", kh:"raf", note:"Ma'nevî âmil ibtidâ ikisini de ref' eder: mübtedâ ve haber ötreli."},
 {ar:"إِنَّ", tr:"İnne – te'kîd", mb:"nasb", kh:"raf", note:"Hurûf-u müşebbehe: ismi (mübtedâ) nasb, haberi ref'."},
 {ar:"كَأَنَّ", tr:"Keenne – sanki", mb:"nasb", kh:"raf", note:"Teşbîh harfi: ismi nasb, haberi ref'."},
 {ar:"لَيْتَ", tr:"Leyte – keşke", mb:"nasb", kh:"raf", note:"Temennî harfi: ismi nasb, haberi ref'."},
 {ar:"لَعَلَّ", tr:"Lealle – umulur ki", mb:"nasb", kh:"raf", note:"Tereccî harfi: ismi nasb, haberi ref'."},
 {ar:"كَانَ", tr:"Kâne – idi", mb:"raf", kh:"nasb", fem:"كَانَتْ", note:"Nâkıs fiil: ismi ref', haberi nasb."},
 {ar:"صَارَ", tr:"Sâra – oldu", mb:"raf", kh:"nasb", fem:"صَارَتْ", note:"Nâkıs fiil: ismi ref', haberi nasb."},
 {ar:"لَيْسَ", tr:"Leyse – değil", mb:"raf", kh:"nasb", fem:"لَيْسَتْ", note:"Nâkıs fiil: ismi ref', haberi nasb."},
 {ar:"مَا", tr:"Mâ (leyse gibi)", mb:"raf", kh:"nasb", note:"Leyse'ye benzeyen mâ: ismi ref', haberi nasb."},
 {ar:"ظَنَنْتُ", tr:"Zanentu – sandım", mb:"nasb", kh:"nasb", note:"Kalp fiili: ikisini de mef'ûl yaparak nasb eder."},
 {ar:"عَلِمْتُ", tr:"Alimtu – bildim", mb:"nasb", kh:"nasb", note:"Kalp fiili: ikisini de nasb eder."}
];

/* ===== HAREKE OYUNU MADDELERİ: s cümle, w hedef kelime (doğru biçimiyle), why açıklama ===== */
const HAREKE = [
 {s:"مَرَرْتُ بِزَيْدٍ", w:"زَيْدٍ", why:"Bâ cer harfi → mecrûr (tenvinli esre)."},
 {s:"كَتَبْتُ بِالْقَلَمِ", w:"الْقَلَمِ", why:"Bâ cer harfi → mecrûr (esre)."},
 {s:"سِرْتُ مِنَ الْبَصْرَةِ إِلَى الْكُوفَةِ", w:"الْكُوفَةِ", why:"İlâ cer harfi → mecrûr."},
 {s:"الْمَالُ فِي الْكِيسِ", w:"الْكِيسِ", why:"Fî cer harfi → mecrûr."},
 {s:"زَيْدٌ كَالْأَسَدِ", w:"الْأَسَدِ", why:"Kâf cer harfi → mecrûr."},
 {s:"رَمَيْتُ السَّهْمَ عَنِ الْقَوْسِ", w:"الْقَوْسِ", why:"An cer harfi → mecrûr."},
 {s:"الْكِتَابُ عَلَى الْمَكْتَبِ", w:"الْمَكْتَبِ", why:"Alâ cer harfi → mecrûr."},
 {s:"الْمَالُ لِزَيْدٍ", w:"زَيْدٍ", why:"Lâm cer harfi → mecrûr."},
 {s:"إِنَّ زَيْدًا قَائِمٌ", w:"زَيْدًا", why:"İnne'nin ismi → mansûb (tenvinli üstün)."},
 {s:"إِنَّ زَيْدًا قَائِمٌ", w:"قَائِمٌ", why:"İnne'nin haberi → merfû'."},
 {s:"كَأَنَّ الْعِلْمَ نُورٌ", w:"الْعِلْمَ", why:"Keenne'nin ismi → mansûb."},
 {s:"لَيْتَ الرَّبِيعَ دَائِمٌ", w:"الرَّبِيعَ", why:"Leyte'nin ismi → mansûb."},
 {s:"لَعَلَّ الْحَبِيبَ قَادِمٌ", w:"قَادِمٌ", why:"Lealle'nin haberi → merfû'."},
 {s:"مَا زَيْدٌ مُنْطَلِقًا", w:"مُنْطَلِقًا", why:"Leyse'ye benzeyen mâ'nın haberi → mansûb."},
 {s:"جَاءَنِي الْقَوْمُ إِلَّا زَيْدًا", w:"زَيْدًا", why:"İllâ ile müstesnâ → mansûb."},
 {s:"يَا عَبْدَ اللهِ", w:"عَبْدَ", why:"Muzâf münâdâ → mansûb."},
 {s:"أُرِيدُ أَنْ أَخْرُجَ", w:"أَخْرُجَ", why:"En nâsıbı → muzâri mansûb (üstün)."},
 {s:"لَنْ أَذْهَبَ إِلَى بَلَدِي", w:"أَذْهَبَ", why:"Len nâsıbı → muzâri mansûb."},
 {s:"جِئْتُ كَيْ أَتَعَلَّمَ", w:"أَتَعَلَّمَ", why:"Key nâsıbı → muzâri mansûb."},
 {s:"لَمْ يَخْرُجْ زَيْدٌ", w:"يَخْرُجْ", why:"Lem câzimi → muzâri meczûm (sükûn)."},
 {s:"لَا تَفْعَلْ", w:"تَفْعَلْ", why:"Nehy lâsı → muzâri meczûm."},
 {s:"إِنْ تُذَاكِرْ تَنْجَحْ", w:"تَنْجَحْ", why:"İn şartın cevabını da cezm eder."},
 {s:"مَنْ تَضْرِبْ أَضْرِبْ", w:"تَضْرِبْ", why:"Men şart ismi → şart fiili meczûm."},
 {s:"مَتَى تُسَافِرْ أُسَافِرْ", w:"أُسَافِرْ", why:"Metâ → cevap fiili meczûm."},
 {s:"عِنْدِي أَحَدَ عَشَرَ رَجُلًا", w:"رَجُلًا", why:"Aşere'nin temyîzi → mansûb."},
 {s:"كَمْ طَالِبًا غَابَ الْيَوْمَ", w:"طَالِبًا", why:"Kem'in temyîzi → mansûb."},
 {s:"كَانَ زَيْدٌ قَائِمًا", w:"زَيْدٌ", why:"Kâne'nin ismi → merfû'."},
 {s:"كَانَ زَيْدٌ قَائِمًا", w:"قَائِمًا", why:"Kâne'nin haberi → mansûb."},
 {s:"صَارَ الطِّينُ حَجَرًا", w:"حَجَرًا", why:"Sâra'nın haberi → mansûb."},
 {s:"لَيْسَ الْمَسْجِدُ قَرِيبًا", w:"قَرِيبًا", why:"Leyse'nin haberi → mansûb."},
 {s:"أَصْبَحَ الرَّجُلُ قَوِيًّا", w:"الرَّجُلُ", why:"Asbaha'nın ismi → merfû'."},
 {s:"نِعْمَ الرَّجُلُ زَيْدٌ", w:"الرَّجُلُ", why:"Ni'me'nin fâili → merfû'."},
 {s:"ظَنَنْتُ زَيْدًا كَرِيمًا", w:"كَرِيمًا", why:"Zanentu ikinci mef'ûlü de nasb eder."},
 {s:"عَلِمْتُ زَيْدًا فَاضِلًا", w:"زَيْدًا", why:"Alimtu birinci mef'ûlü nasb eder."},
 {s:"ضَرَبَ زَيْدٌ عَمْرًا", w:"عَمْرًا", why:"Fiil mef'ûlünü nasb eder."},
 {s:"ضَرَبَ زَيْدٌ عَمْرًا", w:"زَيْدٌ", why:"Fiil fâilini ref' eder."},
 {s:"غُلَامُ زَيْدٍ", w:"زَيْدٍ", why:"Muzâf, muzâfun ileyhi cerr eder."},
 {s:"عِنْدِي عِشْرُونَ دِرْهَمًا", w:"دِرْهَمًا", why:"İsm-i tâm temyîzi nasb eder."},
 {s:"زَيْدٌ مُنْطَلِقٌ", w:"مُنْطَلِقٌ", why:"İbtidâ haberi ref' eder."},
 {s:"زَيْدٌ يَضْرِبُ", w:"يَضْرِبُ", why:"İsmin yerine geçmesi muzâriyi ref' eder."},
 {s:"سِرْتُ وَالنِّيلَ", w:"النِّيلَ", why:"Maiyyet vâvından sonra mef'ûlün maah → mansûb."},
 {s:"رُبَّ رَجُلٍ جَوَادٍ لَقِيتُهُ", w:"رَجُلٍ", why:"Rubbe cer harfi → mecrûr."}
];
