/* ===== Lafız Pusulası — veri ===== */
/* Nass Tahlil Masası: her nass için adım adım tahlil. st: [soru, seçenekler, doğru, açıklama, ayrım] */
const NASS=[
 {ar:'وَالْمُطَلَّقَاتُ يَتَرَبَّصْنَ بِأَنْفُسِهِنَّ ثَلَاثَةَ قُرُوءٍ',ref:'Bakara 2/228',tr:'Boşanmış kadınlar kendi kendilerine üç kur’ beklerler.',l:'l3',
  hl:['ثَلَاثَةَ','قُرُوءٍ','الْمُطَلَّقَاتُ'],
  st:[['“Selâse” (üç) lafzı vaz‘ bakımından nedir?',['Hâss','Âmm','Müşterek','Mücmel'],0,'Sınırlı çokluk bildiren sayı ismi hâsstır; delâleti kat‘îdir.',1],
      ['“Kurû’” lafzı vaz‘ bakımından nedir?',['Müşterek','Hâss','Âmm','Mutlak'],0,'Kur’ hem hayız hem tuhur için ayrı ayrı konmuştur.',1],
      ['“el-Mutallakât” lafzı nedir?',['Âmm (lâmlı cemi)','Hâss','Müşterek','Mukayyed'],0,'İstiğrak lâmıyla belirli cemi umûm ifade eder; Ahzâb 33/49 ile tahsîs edilmiştir.',1],
      ['Hanefîlere göre iddet neyle hesaplanır?',['Üç hayız','Üç tuhur','Üç ay','İki hayız'],0,'“Selâse” hâss olduğundan tam üç ancak hayızla gerçekleşir.',1]]},
 {ar:'وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',ref:'Bakara 2/275',tr:'Allah alım-satımı helâl, ribâyı haram kıldı.',l:'l17',hl:['الْبَيْعَ','الرِّبَا'],
  st:[['“el-Bey‘” lafzı vaz‘ bakımından nedir?',['Âmm (lâmlı tekil)','Hâss','Müşterek','Müteşâbih'],0,'Lâm ile belirli tekil umûm ifade eder.',1],
      ['Alım-satım ile ribânın aynı şey olmadığı hükmüne delâlet açıklık bakımından?',['Nass (sözün asıl sevk sebebi)','Zâhir','Müfesser','Muhkem'],0,'Âyet müşriklerin “alım-satım da ribâ gibidir” sözünü reddetmek için gelmiştir.',3],
      ['Alım-satımın helâl, ribânın haram oluşuna delâlet?',['Zâhir','Nass','Müfesser','Hafî'],0,'Bu hüküm sözün asıl sevk sebebi değildir.',3],
      ['“Ribâ” lafzı açıklık-kapalılık bakımından nedir?',['Mücmel (beyanla müşkile dönüşmüştür)','Muhkem','Zâhir','Hafî'],0,'Altı mal hadisi açıklamış, illet içtihada kalmıştır.',3],
      ['İki hükme delâlet şekli bakımından?',['İbâre (aslî ve tebe‘î)','İşâret','İktizâ','Nassın delâleti'],0,'Biri aslî, diğeri tebe‘î kastedilmiştir.',4]]},
 {ar:'فَانْكِحُوا مَا طَابَ لَكُمْ مِنَ النِّسَاءِ مَثْنَىٰ وَثُلَاثَ وَرُبَاعَ ۖ فَإِنْ خِفْتُمْ أَلَّا تَعْدِلُوا فَوَاحِدَةً',ref:'Nisâ 4/3',tr:'Hoşunuza giden kadınlardan ikişer, üçer, dörder nikâhlayın; adaletsizlikten korkarsanız bir tane.',l:'l23',hl:['فَانْكِحُوا','وَرُبَاعَ','فَوَاحِدَةً'],
  st:[['Evlenmenin mubah oluşu açıklık bakımından?',['Zâhir','Nass','Muhkem','Müfesser'],0,'Sözün asıl sevk sebebi değildir.',3],
      ['Sayının dörtle sınırlanması?',['Nass','Zâhir','Müteşâbih','Mücmel'],0,'Âyet asıl bunun için gelmiştir.',3],
      ['“Fenkihû” emri burada neyi ifade eder?',['İbâha (tebe‘î hüküm)','Vücûb','Te’dîb','İrşâd'],0,'Evlenme izni tebe‘î olarak kastedilmiştir.',1],
      ['Bu üç hükme delâlet şekli?',['İbâre','İşâret','Delâlet','İktizâ'],0,'İbâreyle üç hüküm: ibâha, dörde kadar cevaz, endişede bir.',4]]},
 {ar:'فَلَا تَقُلْ لَهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا',ref:'İsrâ 17/23',tr:'Onlara “öf” bile deme, onları azarlama.',l:'l25',hl:['أُفٍّ','تَقُلْ'],
  st:[['“Lâ tekul” hangi talep türüdür?',['Nehiy','Emir','Haber','Duâ'],0,'“Lâ” ile gelen nehiy kalıbı.',1],
      ['Karîneden mücerret bu nehiy neyi ifade eder?',['Tahrîm','Kerâhe','İrşâd','Duâ'],0,'Cumhurun ve müellifin görüşü.',1],
      ['“Öf” demenin haramlığı hangi delâletle?',['İbâre','İşâret','Nassın delâleti','İktizâ'],0,'Lafzın kendisi bunu ifade eder.',4],
      ['Dövme ve sövmenin haramlığı hangi delâletle?',['Nassın delâleti (evleviyetle)','İşâret','İbâre','İktizâ'],0,'İllet (eziyet) dil bilgisiyle anlaşılır; mefhûm-i muvâfaka.',4]]},
 {ar:'وَعَلَى الْمَوْلُودِ لَهُ رِزْقُهُنَّ وَكِسْوَتُهُنَّ بِالْمَعْرُوفِ',ref:'Bakara 2/233',tr:'Annelerin örfe uygun yiyecek ve giyeceği çocuğun babasına aittir.',l:'l24',hl:['الْمَوْلُودِ','لَهُ'],
  st:[['Annenin nafakasının babaya ait olması hangi delâletle?',['İbâre','İşâret','İktizâ','Nassın delâleti'],0,'Âyetin asıl maksadıdır.',4],
      ['Çocuğun nafakasının yalnız babaya ait olması?',['İşâret','İbâre','İktizâ','Mefhûm-i muhâlif'],0,'“Kendisi için doğurulan” ifadesi nesebin babaya ait olduğunu gösterir; nimet-külfet.',4],
      ['Babası Kureyşli olan çocuğun Kureyşli sayılması?',['İşâret','İbâre','Nassın delâleti','İktizâ'],0,'Nesebin babaya ait olmasının lâzımı.',4]]},
 {ar:'وَحَمْلُهُ وَفِصَالُهُ ثَلَاثُونَ شَهْرًا',ref:'Ahkâf 46/15 + Lokmân 31/14',tr:'Onun (karında) taşınması ve sütten kesilmesi otuz aydır.',l:'l24',hl:['ثَلَاثُونَ','شَهْرًا'],
  st:[['“Selâsûne” (otuz) lafzı nedir?',['Hâss','Âmm','Müşterek','Mutlak'],0,'Sayı ismi.',1],
      ['Lokmân 31/14 ile birlikte en az hamilelik süresinin altı ay olduğu?',['İşâret (kapalı)','İbâre','Nassın delâleti','İktizâ'],0,'Derin inceleme gerektiren işâret; Hz. Ali veya İbn Abbâs fark etmiştir.',4]]},
 {ar:'أُحِلَّ لَكُمْ لَيْلَةَ الصِّيَامِ الرَّفَثُ إِلَىٰ نِسَائِكُمْ… حَتَّىٰ يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ مِنَ الْخَيْطِ الْأَسْوَدِ مِنَ الْفَجْرِ',ref:'Bakara 2/187',tr:'Oruç gecesi kadınlarınıza yaklaşmak size helâl kılındı… fecrin beyaz ipliği ayırt edilinceye kadar.',l:'l24',hl:['حَتَّىٰ','الرَّفَثُ'],
  st:[['Fecre kadar cinsî birleşmenin mubah olması?',['İbâre','İşâret','İktizâ','Nassın delâleti'],0,'Âyetin açık ifadesidir.',4],
      ['Cünüp olarak sabahlayanın orucunun sahih olması?',['İşâret','İbâre','Nassın delâleti','İktizâ'],0,'Son âna kadar mubahlığın lâzımı.',4],
      ['Cumhura göre fecirden sonra yemenin haramlığı (“hattâ”)?',['Mefhûmü’l-gâye','Mefhûmü’ş-şart','Mefhûmü’s-sıfa','Mefhûmü’l-aded'],0,'Gâye kaydının mefhûm-i muhâlifi.',4]]},
 {ar:'فِي سَائِمَةِ الْغَنَمِ الزَّكَاةُ',ref:'Hadis',tr:'Kırda otlayan koyunlarda zekât vardır.',l:'l27',hl:['سَائِمَةِ'],
  st:[['Cumhura göre “sâime” kaydı ne gösterir?',['Mefhûmü’s-sıfa: besi koyununda zekât yok','Mefhûmü’ş-şart','İbâre','Gâye'],0,'Sıfat kaydının mefhûm-i muhâlifi.',4],
      ['Cumhura göre sıfat ile âmmın daraltılması nedir?',['Gayr-ı müstakil muhassısla tahsîs','Nesih','Te’vil değildir','Kasr değildir'],0,'Hanefîler buna “kasr” der.',1],
      ['Hanefîler naslarda mefhûm-i muhâlifi?',['Hüccet saymaz','Hüccet sayar','Yalnız sıfatta kabul eder','Yalnız şartta kabul eder'],0,'Şâri‘in bütün maksatları kuşatılamaz.',4]]},
 {ar:'وَالَّذِينَ يَرْمُونَ الْمُحْصَنَاتِ ثُمَّ لَمْ يَأْتُوا بِأَرْبَعَةِ شُهَدَاءَ فَاجْلِدُوهُمْ ثَمَانِينَ جَلْدَةً',ref:'Nûr 24/4',tr:'İffetli kadınlara zina isnad edip dört şahit getiremeyenlere seksen değnek vurun.',l:'l18',hl:['ثَمَانِينَ','وَالَّذِينَ'],
  st:[['“Semânîn” (seksen) açıklık bakımından?',['Müfesser','Zâhir','Nass','Hafî'],0,'Sayı eksiklik-fazlalığa ihtimal bırakmaz; te’vile kapalıdır.',3],
      ['“Ellezîne” lafzı?',['Âmm (ism-i mevsûl)','Hâss','Müşterek','Mutlak'],0,'İsm-i mevsûl umûm sîgasıdır.',1],
      ['Hanefîlere göre liân âyeti (Nûr 24/6) bu âyeti kocalar hakkında?',['Neshetmiştir','Tahsîs etmiştir','Kasretmiştir','Te’vil etmiştir'],0,'Sonra gelen müstakil delil Hanefîlerde nesihtir.',1]]},
 {ar:'وَمَا كَانَ لَكُمْ أَنْ تُؤْذُوا رَسُولَ اللَّهِ وَلَا أَنْ تَنْكِحُوا أَزْوَاجَهُ مِنْ بَعْدِهِ أَبَدًا',ref:'Ahzâb 33/53',tr:'Allah’ın Resûlüne eziyet etmeniz ve ondan sonra hanımlarıyla asla evlenmeniz olmaz.',l:'l18',hl:['أَبَدًا'],
  st:[['“Ebeden” kaydıyla bu hüküm açıklık bakımından?',['Muhkem','Müfesser','Nass','Zâhir'],0,'Süreklilik kaydı neshe de kapalıdır.',3],
      ['Nisâ 4/24 (“bunların dışındakiler helâl”) ile teâruzunda hangisi tercih edilir?',['Ahzâb 33/53 (muhkem)','Nisâ 4/24 (nass)','İkisi düşer','Kıyasa gidilir'],0,'Muhkem nassa tercih edilir.',3]]},
 {ar:'وَالسَّارِقُ وَالسَّارِقَةُ فَاقْطَعُوا أَيْدِيَهُمَا',ref:'Mâide 5/38',tr:'Hırsız erkek ve kadının ellerini kesin.',l:'l21',hl:['وَالسَّارِقُ','أَيْدِيَهُمَا'],
  st:[['“es-Sârik” lafzı vaz‘ bakımından?',['Âmm (lâmlı tekil)','Hâss','Müşterek','Mukayyed'],0,'Bütün hırsızları kapsar.',1],
      ['“es-Sârik” yankesici ve kefen soyucu için nasıldır?',['Hafî','Müşkil','Mücmel','Müteşâbih'],0,'Kapalılık sîga dışındaki bir sebepten.',3],
      ['“Eydî” (eller) lafzı?',['Mutlak (Sünnet bilekten takyîd eder)','Mukayyed','Müşterek','Muhkem'],0,'Abdest âyetindeki “dirseklere kadar”a hamledilmez: hükümler ve sebepler farklı.',1],
      ['Ebû Hanîfe ve Muhammed’e göre kefen soyucuya?',['Had yok, ta‘zîr var','El kesilir','Hiç ceza yok','Kısas'],0,'Hırz, mal ve mülk şartlarında eksiklik.',3]]},
 {ar:'نِسَاؤُكُمْ حَرْثٌ لَكُمْ فَأْتُوا حَرْثَكُمْ أَنَّىٰ شِئْتُمْ',ref:'Bakara 2/223',tr:'Kadınlarınız sizin tarlanızdır; tarlanıza dilediğiniz şekilde varın.',l:'l21',hl:['أَنَّىٰ','حَرْثٌ'],
  st:[['“Ennâ” lafzı açıklık-kapalılık bakımından?',['Müşkil','Hafî','Mücmel','Müteşâbih'],0,'Kapalılık sîganın kendisinden: “nereden” ve “nasıl”.',3],
      ['Hangi karîne “nasıl” mânâsını tayin eder?',['“Hars” (tarla) kelimesi','Hadis','İcmâ','Örf'],0,'Tarla nesil mahallidir.',3]]},
 {ar:'إِنَّ الْإِنْسَانَ خُلِقَ هَلُوعًا',ref:'Meâric 70/19',tr:'İnsan helû‘ yaratılmıştır.',l:'l22',hl:['هَلُوعًا'],
  st:[['“Helû‘an” lafzı nedir?',['Mücmel (garâbet)','Müşkil','Hafî','Müteşâbih'],0,'Garip bir kelime olduğundan.',3],
      ['Âyetin hemen ardından gelen açıklama ile lafız?',['Müfesser olur','Müşkil kalır','Muhkem olur','Hafî olur'],0,'Tam beyan mücmeli müfessere dönüştürür.',3],
      ['“el-İnsân” lafzı?',['Âmm (lâmlı tekil)','Hâss','Müşterek','Mutlak'],0,'Umûm sîgası.',1]]},
 {ar:'رُفِعَ عَنْ أُمَّتِي الْخَطَأُ وَالنِّسْيَانُ وَمَا اسْتُكْرِهُوا عَلَيْهِ',ref:'Hadis',tr:'Ümmetimden hata, unutma ve zorlandıkları şey kaldırılmıştır.',l:'l25',hl:['رُفِعَ','الْخَطَأُ'],
  st:[['Hata vâki olduğu hâlde sözün doğru olması için ne takdir edilir?',['“Günahı” (ism)','“Kendisi”','“Hükmü”','Hiçbir şey'],0,'Sözün doğruluğu buna bağlıdır.',4],
      ['Bu takdir hangi delâlettir?',['İktizâ','İşâret','İbâre','Nassın delâleti'],0,'İktizâ en zayıf delâlettir.',4]]},
 {ar:'لِلْفُقَرَاءِ الْمُهَاجِرِينَ الَّذِينَ أُخْرِجُوا مِنْ دِيَارِهِمْ وَأَمْوَالِهِمْ',ref:'Haşr 59/8',tr:'(Ganimet) yurtlarından ve mallarından çıkarılmış fakir muhacirler içindir.',l:'l25',hl:['لِلْفُقَرَاءِ'],
  st:[['Hanefîlere göre muhacirlerin Mekke’deki mallarının mülkiyetini kaybetmeleri, müellife göre hangi delâlet?',['İktizâ','İbâre','Nassın delâleti','Mefhûm-i muhâlif'],0,'Malı olan “fakir” olamaz; sözün doğruluğu buna bağlı. Birçok usulcü bunu işâret sayar.',4],
      ['Şâfiîler “fakir” vasfını nasıl anlar?',['Mecâz (mallarından uzak kalmış)','Hakikat','Kinâye','Müşterek'],0,'Onlara göre mülkiyet zâil olmaz.',2]]},
 {ar:'وَلَا تَأْكُلُوا مِمَّا لَمْ يُذْكَرِ اسْمُ اللَّهِ عَلَيْهِ',ref:'En‘âm 6/121',tr:'Üzerine Allah’ın adı anılmayandan yemeyin.',l:'l13',hl:['مِمَّا','تَأْكُلُوا'],
  st:[['“Mimmâ” (mâ) lafzı?',['Âmm (ism-i mevsûl)','Hâss','Mücmel','Müşterek'],0,'Umûm sîgası.',1],
      ['Hanefîlere göre bilerek besmele terk edilen kesim?',['Haram (âmm kat‘î; haber-i vâhidle tahsîs edilmez)','Helâl','Mekruh','Mevkûf'],0,'Kitabın âmmı ilk olarak haber-i vâhidle tahsîs edilemez.',1],
      ['Şâfiîlere göre?',['Helâl (âmm zannî; hadisle tahsîs)','Haram','Mekruh','Fâsid'],0,'Cumhura göre âmmın delâleti zannîdir.',1]]},
 {ar:'فَإِذَا قُضِيَتِ الصَّلَاةُ فَانْتَشِرُوا فِي الْأَرْضِ',ref:'Cum‘a 62/10',tr:'Namaz kılınınca yeryüzüne dağılın.',l:'l8',hl:['فَانْتَشِرُوا'],
  st:[['Bu emir neyin ardından gelmiştir?',['Alış-veriş yasağının (Cum‘a 62/9)','Bir sorunun','Bir şartın','Bir duânın'],0,'Yasaktan sonra gelen emir.',1],
      ['Müellifin tercihine göre hükmü?',['Önceki hükmü (ibâha) geri getirir','Vücûb','Nedb','Kerâhe'],0,'Kemâl b. Hümâm’ın görüşü.',1]]},
 {ar:'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ',ref:'Mâide 5/6',tr:'Ey iman edenler! Namaza kalktığınızda yüzlerinizi yıkayın.',l:'l19',hl:['قُمْتُمْ','فَاغْسِلُوا'],
  st:[['“Kumtum” = “namaza azmettiğinizde” yorumu nasıl bir te’vildir?',['Karîb','Ba‘îd','Bâtıl','Tahsîs'],0,'Hatıra kolayca gelir.',3],
      ['Emir illet olan vasfa bağlı olduğu için?',['Namaz iradesi tekrarlandıkça tekrarlanır','Ömürde bir defadır','Fevrîdir','Mubahtır'],0,'Emir kendiliğinden tekrarı gerektirmez; illet tekrarı gerektirir.',1]]}
];
const AYR=['Giriş','Vaz‘','İsti‘mâl','Açıklık-kapalılık','Delâlet şekli'];
/* --- Oyun havuzları --- */
const VAZ=[ /* [lafız, tür h/a/m, açıklama] */
 ['ثَلَاثَةَ','h','Sayı ismi: hâss.'],['مِائَةَ جَلْدَةٍ','h','Sayı ismi: hâss.'],['رَقَبَةٍ','h','Cins ismi; mutlak hâss.'],['عَشَرَةِ مَسَاكِينَ','h','Sayı ismi.'],['مُحَمَّدٌ','h','Özel isim.'],['الْعِلْمُ','h','Mânâ ismi (lâmsız da hâss).'],
 ['الْمُؤْمِنُونَ','a','İstiğrak lâmlı cemi.'],['كُلُّ نَفْسٍ','a','“Küll” umûm sîgası.'],['أَوْلَادِكُمْ','a','İzâfetle belirli cemi.'],['الَّذِينَ','a','İsm-i mevsûl.'],['مَنْ شَهِدَ','a','Şart ismi.'],['لَا وَصِيَّةَ لِوَارِثٍ','a','Nefiyden sonra nekre.'],['السَّارِقُ','a','Lâmlı tekil.'],['مَيْتَتُهُ','a','İzâfetle belirli tekil.'],['جَمِيعًا','a','“Cemî‘” umûm sîgası.'],['مَتَىٰ','a','Soru ismi.'],
 ['قُرُوءٍ','m','Hayız ve tuhur.'],['عَيْنٌ','m','Göz, pınar, casus, altın.'],['الْمَوْلَى','m','Âzâd eden ve âzâd edilen.'],['أَنَّىٰ','m','Nereden / nasıl.']
];
const UMUM=[ /* [ifade, sîga indeksi] */
 ['كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ',0],['هُوَ الَّذِي خَلَقَ لَكُمْ مَا فِي الْأَرْضِ جَمِيعًا',0],['قَدْ أَفْلَحَ الْمُؤْمِنُونَ',1],['يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ',1],['خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً',1],['إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ',2],['هُوَ الطَّهُورُ مَاؤُهُ الْحِلُّ مَيْتَتُهُ',2],['إِنَّ الَّذِينَ يَأْكُلُونَ أَمْوَالَ الْيَتَامَىٰ ظُلْمًا',3],['وَأُحِلَّ لَكُمْ مَا وَرَاءَ ذَٰلِكُمْ',3],['فَمَنْ شَهِدَ مِنْكُمُ الشَّهْرَ فَلْيَصُمْهُ',4],['وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ',4],['مَتَىٰ نَصْرُ اللَّهِ',5],['لَا وَصِيَّةَ لِوَارِثٍ',6],['وَلَا تُصَلِّ عَلَىٰ أَحَدٍ مِنْهُمْ مَاتَ أَبَدًا',6]
];
const UMUMK=['Küll / cemî‘','Lâmlı veya muzâf cemi','Lâmlı veya muzâf tekil','İsm-i mevsûl','Şart ismi','Soru ismi','Nefiy/nehiyden sonra nekre'];
const EMIR=[ /* [ifade, tür v/n/i/r/t, açıklama] */
 ['وَأَقِيمُوا الصَّلَاةَ','v','Karîneden mücerret emir: vücûb (cumhur).'],['فَمَنْ شَهِدَ مِنْكُمُ الشَّهْرَ فَلْيَصُمْهُ','v','Emir lâmlı muzâri; vücûb.'],['وَلْيُوفُوا نُذُورَهُمْ','v','Hac 22/29: vücûb.'],
 ['وَكُلُوا وَاشْرَبُوا','i','Yeme-içme fıtrî; ibâha.'],['وَإِذَا حَلَلْتُمْ فَاصْطَادُوا','i','Yasaktan önceki hüküm: ibâha.'],['فَانْتَشِرُوا فِي الْأَرْضِ','i','Yasaktan sonra emir: önceki hüküm olan ibâha.'],
 ['فَكَاتِبُوهُمْ إِنْ عَلِمْتُمْ فِيهِمْ خَيْرًا','n','Malik mülkünde serbest: nedb.'],['Kabir ziyareti (“artık ziyaret edin”)','n','Yasaktan önceki hüküm: nedb.'],
 ['إِذَا تَدَايَنْتُمْ بِدَيْنٍ… فَاكْتُبُوهُ','r','“Birbirinize güvenirseniz” karînesi: irşâd (cumhur).'],['وَأَشْهِدُوا إِذَا تَبَايَعْتُمْ','r','Cumhur: irşâd; Zâhirî: vücûb.'],
 ['يَا غُلَامُ سَمِّ اللَّهَ وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ','t','Küçük İbn Abbâs’a: te’dîb.']
];
const EMIRK={v:'Vücûb',n:'Nedb',i:'İbâha',r:'İrşâd',t:'Te’dîb'};
const NEHIY=[ /* [fiil, sonuç b/m/f, açıklama] */
 ['Meyte (ölü hayvan) satışı','b','Mahiyete yönelik nehiy: ittifakla bâtıl.'],['Annesinin karnındaki ceninin satışı','b','Satım konusu yok: bâtıl.'],['Henüz bitmemiş ekinin satışı','b','Ma‘dûmun satışı: bâtıl.'],['Mahrem bir akrabayla nikâh','b','Mahal yok: bâtıl.'],
 ['Gasp edilmiş elbiseyle namaz','m','Amelin icabından olmayan durum: sahih ama mekruh (cumhur).'],['Cuma ezanından sonra alış-veriş','m','Namazdan alıkoyma endişesi: sahih, mekruh.'],['Gasp edilmiş yerde namaz','m','Mücâvir durum: sahih, mekruh.'],
 ['Ribâlı satış (100 kg buğdaya 110 kg)','f','Lâzım vasıf: Hanefî fâsid, cumhur bâtıl.'],['Bayram günü oruç','f','Lâzım vasıf: Hanefîler “fâsid” der; adayan kaza eder.'],['Fâsid şartlı satış','f','Hanefî fâsid; cumhur bâtıl.']
];
const NEHIYK={b:'İttifakla bâtıl',m:'Sahih ama mekruh (çoğunluk)',f:'Hanefî: fâsid · cumhur: bâtıl'};
const ACIK=[ /* [durum, derece 0 zâhir 1 nass 2 müfesser 3 muhkem 4 hafî 5 müşkil 6 mücmel 7 müteşâbih, açıklama] */
 ['Nisâ 4/3’te evliliğin câiz oluşu',0,'Asıl sevk sebebi değil.'],['Bakara 2/275’te alım-satımın helâl oluşu',0,'Tebe‘î; asıl sevk sebebi değil.'],['Nisâ 4/24 “bunların dışındakiler size helâl”',0,'Dörtten fazlası için zâhir; Nisâ 4/3 ile tahsîs.'],
 ['Nisâ 4/3’te sayının dörtle sınırlanması',1,'Sözün asıl sevk sebebi.'],['Bakara 2/275’te alım-satım ile ribânın farklılığı',1,'Müşrikleri red için.'],['Müstehâza: “her namaz için abdest al”',1,'“Vakti” takdirine açık.'],
 ['Nûr 24/4 “seksen değnek”',2,'Sayı te’vile kapalı.'],['Sünnetle açıklanmış “salât” ve “zekât”',2,'Tam beyan: müfesser.'],['Müstehâza: “her namaz vakti için abdest al”',2,'Başka ihtimal yok.'],
 ['Ahzâb 33/53 “…asla evlenmeniz olmaz”',3,'“Ebeden”: neshe kapalı.'],['Tevhid ve iman esasları',3,'Neshe kapalı.'],['“Cihad kıyamete kadar devam eder” hadisi',3,'Süreklilik.'],
 ['“es-Sârik” lafzının yankesiciye delâleti',4,'Sîga dışından kapalılık.'],['“es-Sârik” lafzının kefen soyucuya delâleti',4,'Hafî.'],
 ['Bakara 2/223’teki “ennâ”',5,'Sîganın kendisinden: nereden / nasıl.'],['Altı mal hadisinden sonra “ribâ”',5,'Eksik beyan: müşkil.'],
 ['Henüz açıklanmamış “salât, zekât, hac”',6,'Şer‘î nakil.'],['Meâric 70/19 “helû‘an”',6,'Garâbet.'],['Hanefîlere göre “mevlâlarıma vasiyet ediyorum”',6,'Tercih edilemeyen müşterek.'],
 ['Hurûf-ı mukattaa (Elif Lâm Mîm)',7,'Mânâsı bilinemez.'],['Fetih 48/10 “Allah’ın eli”',7,'Müteşâbih.']
];
const ACIKK=['Zâhir','Nass','Müfesser','Muhkem','Hafî','Müşkil','Mücmel','Müteşâbih'];
const ACIKAR=['الظَّاهِرُ','النَّصُّ','الْمُفَسَّرُ','الْمُحْكَمُ','الْخَفِيُّ','الْمُشْكِلُ','الْمُجْمَلُ','الْمُتَشَابِهُ'];
/* merdiven: [te’vil/tahsîs, nesih (Hz. Peygamber hayatında), kapalılığın kaynağı/giderilmesi, tarif kısa] */
const LADDER=[
 ['Açık','Kapalı (Hz. Peygamber hayatında açık)','—','Mânâsı açık; te’vil ve tahsîse açık; sözün asıl sevk sebebi değil.'],
 ['Açık (zâhirden az)','Açık','—','Mânâsı açık; sözün asıl sevk sebebi; te’vil ve tahsîse açık.'],
 ['Kapalı','Açık','—','Te’vil ve tahsîse kapalı; açıklanmış mücmel.'],
 ['Kapalı','Kapalı','—','Te’vil, tahsîs ve nesih ihtimali yok.'],
 ['—','—','Sîga dışı engel · içtihatla giderilir','Bazı fertlere delâleti kapalı.'],
 ['—','—','Sîganın kendisi · karîne ve içtihatla','Birden çok vaz‘ veya yaygın mecâz.'],
 ['—','—','Sîga · ancak Şâri‘in beyanıyla','Müşterek, şer‘î nakil, garâbet.'],
 ['—','—','Bilinemez · kelâmın konusu','Ahkâm naslarında yoktur.']
];
LADDER[0][1]='Açık (yalnız Hz. Peygamber hayatında)';LADDER[1][1]='Açık (yalnız Hz. Peygamber hayatında)';LADDER[2][1]='Açık (yalnız Hz. Peygamber hayatında)';
const DELALET=[ /* [hüküm, tür 0 ibâre 1 işâret 2 delâlet 3 iktizâ, açıklama] */
 ['Bakara 2/275: alım-satım ile ribâ aynı değildir',0,'Aslî maksat.'],['Nisâ 4/3: adaletsizlik endişesinde bir kadınla yetinmek',0,'Aslî maksat.'],['Bakara 2/233: annenin nafakası babaya aittir',0,'Âyetin ifadesi.'],['Bakara 2/178: kasıtlı öldürmede kısas',0,'İbâre.'],
 ['Bakara 2/233: çocuğun nafakası yalnız babaya aittir',1,'Nesebin babaya aitliğinin lâzımı.'],['Bakara 2/187: cünüp sabahlayanın orucu sahihtir',1,'Fecre kadar mubahlığın lâzımı.'],['Ahkâf 46/15 + Lokmân 31/14: en az hamilelik altı aydır',1,'Kapalı işâret.'],['Nisâ 4/93: kasıtlı öldürmede kefâret yoktur (Hanefî)',1,'Beyan makamında cehennemle yetinme.'],
 ['İsrâ 17/23: anne-babayı dövmek haramdır',2,'Evleviyetle.'],['Nisâ 4/10: yetim malını yakmak haramdır',2,'Eşit derecede.'],['Fesihle ayrılan kadına da iddet gerekir',2,'İllet: rahmin boş olduğunun belirlenmesi.'],['Nisâ 4/92: kasıtlı öldürmede evleviyetle kefâret (Şâfiî)',2,'Mefhûm-i muvâfaka.'],
 ['“Ümmetimden hata kaldırıldı”: günahı kaldırıldı',3,'Sözün doğruluğu için takdir.'],['“Gayrimenkulünü benim adıma tasadduk et”: “önce bana sat”',3,'Şer‘an sağlıklı olması için.'],['Haşr 59/8: muhacirler Mekke’deki mallarının mülkiyetini kaybetti (müellif)',3,'Fakir vasfının doğruluğu için.']
];
const DELK=['İbâre','İşâret','Nassın delâleti','İktizâ'];
const DELAR=['عِبَارَةُ النَّصِّ','إِشَارَةُ النَّصِّ','دَلَالَةُ النَّصِّ','اقْتِضَاءُ النَّصِّ'];
const MEFHUM=[ /* [nass, tür s/r/g/d/x, açıklama] */
 ['فِي سَائِمَةِ الْغَنَمِ الزَّكَاةُ','s','Besi koyununda zekât yok.'],['الشُّفْعَةُ فِي كُلِّ شِرْكٍ لَمْ يُقْسَمْ','s','Taksimden sonra şuf‘a yok.'],['مَطْلُ الْغَنِيِّ ظُلْمٌ','s','Fakirin oyalaması zulüm değil.'],
 ['وَإِنْ كُنَّ أُولَاتِ حَمْلٍ فَأَنْفِقُوا عَلَيْهِنَّ','r','Hamile olmayan bâine nafaka yok.'],['الْوَاهِبُ أَحَقُّ بِهِبَتِهِ مَا لَمْ يُثَبْ مِنْهَا','r','Karşılık almışsa rücû yok.'],
 ['حَتَّىٰ يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ','g','Fecirden sonra yemek haram.'],['ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ','g','Geceden sonra oruç vâcib değil.'],
 ['فَاجْلِدُوا كُلَّ وَاحِدٍ مِنْهُمَا مِائَةَ جَلْدَةٍ','d','Yüzden fazla câiz değil.'],['فِي خَمْسٍ مِنَ الْإِبِلِ شَاةٌ','d','Beşten aza zekât yok.'],
 ['لِتَأْكُلُوا مِنْهُ لَحْمًا طَرِيًّا','x','Kayıt nimeti hatırlatmak için.'],['لَا تَأْكُلُوا الرِّبَا أَضْعَافًا مُضَاعَفَةً','x','Kayıt Câhiliye âdetini kötülemek için.'],['وَرَبَائِبُكُمُ اللَّاتِي فِي حُجُورِكُمْ','x','Kayıt âdete uygun ifade.'],['إِنْ تَسْتَغْفِرْ لَهُمْ سَبْعِينَ مَرَّةً','x','Kayıt mübalağa için.']
];
const MEFK={s:'Mefhûmü’s-sıfa',r:'Mefhûmü’ş-şart',g:'Mefhûmü’l-gâye',d:'Mefhûmü’l-aded',x:'Alınmaz (kaydın başka maksadı var)'};
const HAML=[ /* [durum, sonuç i ittifakla hamledilir / y ittifakla hamledilmez / h ihtilaflı (Hanefî hamletmez), açıklama, sebep, hüküm] */
 ['Mâide 5/3 “kan” ↔ En‘âm 6/145 “akıtılmış kan”','i','Hüküm de sebep de bir.'],['Teyemmüm âyeti “eller” ↔ hadis “dirseklere kadar”','i','Hüküm ve sebep bir (Hanefî-Şâfiî).'],['Yemin kefâreti orucu ↔ İbn Mes‘ûd kıraatı “peş peşe”','i','Hanefîler peş peşe şart koşar.'],
 ['Hırsızlık âyeti “eller” ↔ abdest âyeti “dirseklere kadar”','y','Hükümler ve sebepler farklı.'],['Abdestte “yıkayın” ↔ teyemmümde “meshedin” (dirseklere kadar)','y','Hükümler farklı, sebep bir.'],
 ['Zıhâr kefâreti “rakabe” ↔ hataen öldürme “mümin rakabe”','h','Hüküm bir, sebepler farklı: Hanefî hamletmez, cumhur hamleder.'],['Sadaka-i fıtır “her küçük-büyük” ↔ “müslümanlardan”','h','Sebepte ıtlak-takyîd: Hanefî hamletmez.'],['Şuf‘a: “komşu” ↔ “yolları bir ise”','h','Mütercime göre sebepte ıtlak-takyîdin daha isabetli örneği.']
];
const HAMLK={i:'İttifakla hamledilir',y:'İttifakla hamledilmez',h:'İhtilaflı: Hanefî hamletmez'};
const ISTIMAL=[ /* [ifade, tür h/m/s/k, açıklama] */
 ['“Şems” kelimesinin güneş için kullanılması','h','Lügavî hakikat.'],['“Salât”ın namaz için kullanılması','h','Şer‘î hakikat.'],['“Dâbbe”nin dört ayaklı hayvan için kullanılması','h','Örfî (genel) hakikat.'],['Gramerde “merfû” terimi','h','Örfî (özel) hakikat.'],
 ['“Aslan Mehmet”','m','İstiâre (benzerlik).'],['“Rakabe” ile köle kastedilmesi','m','Mecâz-ı mürsel: cüz’-küll.'],['“Parmaklarını kulaklarına tıkarlar”','m','Parmak uçları; mecâz-ı mürsel.'],['“Bu ağaçtan yedim” (meyvesi)','m','Mecâz; karîne hâlî.'],
 ['“Sattım” – “aldım”','s','Sarîh: niyete bakılmaz.'],['“Seni boşadım”','s','Sarîh talâk.'],['“Köye sor” (köy halkı)','s','Mecâz ama sarîh.'],
 ['“Dilediğin yere git” (talâk niyetiyle)','k','Kinâye: niyet veya hâlin delâleti gerekir.'],['“Ailene dön”','k','Kinâye.']
];
const ISTK={h:'Hakikat',m:'Mecâz',s:'Sarîh',k:'Kinâye'};
const MEZHEP=[ /* [görüş, kim h=Hanefî c=Cumhur/Şâfiî, açıklama] */
 ['Tahsîse uğramamış âmmın delâleti kat‘îdir','h','Hâss gibi.'],['Tahsîse uğramamış âmmın delâleti zannîdir','c','“Tahsîse uğramayan âmm yoktur.”'],['İstisnâ, şart ve sıfat tahsîs değil “kasr”dır','h','Tahsîs yalnız müstakil ve mukarin delille.'],['Âmmdan sonra gelen müstakil delil nesihtir','h','Mukarin olmalıydı.'],
 ['Kitabın âmmı haber-i vâhid ve kıyasla tahsîs edilebilir','c','Zannî zannîyi tahsîs eder.'],['Âmm ile hâss arasında teâruz yoktur','c','Hâss ölçüsünde hâss, ötesinde âmm.'],
 ['Naslarda mefhûm-i muhâlif hüccet değildir','h','Şâri‘in maksatları kuşatılamaz.'],['Naslarda mefhûm-i muhâlif hüccettir','c','Müellif de bunu tercih eder.'],
 ['Hüküm bir, sebepler farklı ise mutlak mukayyede hamledilmez','h','Zıhâr kefâretinde mümin olmayan köle de yeter.'],['Sebepte ıtlak-takyîd olsa da mutlak mukayyede hamledilir','c','Sadaka-i fıtır örneği.'],
 ['Kur’ hayızdır; iddet üç hayızdır','h','Hanbelîler de böyle.'],['Kur’ tuhurdur; iddet üç tuhurdur','c','Şâfiî ve Mâlikî.'],
 ['Ribâlı satış fâsiddir (bâtıl değil)','h','Asıl meşru, vasıf değil.'],['Fâsid ile bâtıl aynıdır','c','“Bizim işimize uygun olmayan iş merduttur.”'],
 ['Delâletler dört nevidir: ibâre, işâret, delâlet, iktizâ','h','Diğerleri bâtıl dayanaklar.'],['Delâlet mantûk ve mefhûm diye ikiye ayrılır','c','Mâlikî, Şâfiî ve diğerleri.']
];
const TERMS=[ /* [terim, arapça, tarif, ayrım] */
 ['Hâss','الْخَاصُّ','Tek mânâyı teker teker göstermek için konmuş lafız; delâleti kat‘î.',1],['Âmm','الْعَامُّ','Tek vaz‘la bütün fertleri sınırsız kapsayan lafız.',1],['Müşterek','الْمُشْتَرَكُ','Her biri ayrı vaz‘la birden çok mânâsı olan lafız.',1],['Mutlak','الْمُطْلَقُ','Gayr-ı muayyen fert(ler)i gösteren, sıfatla kayıtlanmamış lafız.',1],['Mukayyed','الْمُقَيَّدُ','Gayr-ı muayyen fert(ler)i gösteren, bir sıfatla kayıtlanmış lafız.',1],['Emir','الْأَمْرُ','Fiilin yapılması talebine delâlet eden söz.',1],['Nehiy','النَّهْيُ','Fiilden el çekme talebine delâlet eden söz.',1],['Tahsîs','التَّخْصِيصُ','Âmmı bazı fertlerine hasretmek.',1],['Kasr','الْقَصْرُ','Hanefîlerde gayr-ı müstakil delille (istisnâ, şart, sıfat) daraltma.',1],['Fâsid','الْفَاسِدُ','Hanefîlerde aslı meşru, vasfı gayr-ı meşru olan.',1],['Bâtıl','الْبَاطِلُ','Ne aslı ne vasfı meşru olan; hiçbir sonuç doğurmaz.',1],
 ['Hakikat','الْحَقِيقَةُ','Konduğu mânâda kullanılan lafız.',2],['Mecâz','الْمَجَازُ','Alâka ve karîneyle başka mânâda kullanılan lafız.',2],['Sarîh','الصَّرِيحُ','Çok kullanılmaktan ötürü mânâsı açık lafız.',2],['Kinâye','الْكِنَايَةُ','Mânâsı hemen zihne gelmeyen, kapalı lafız.',2],
 ['Zâhir','الظَّاهِرُ','Mânâsı açık, te’vile açık, sözün asıl sevk sebebi olmayan.',3],['Nass','النَّصُّ','Mânâsı açık, sözün asıl sevk sebebi olan, te’vile açık.',3],['Müfesser','الْمُفَسَّرُ','Te’vil ve tahsîse kapalı lafız.',3],['Muhkem','الْمُحْكَمُ','Te’vil, tahsîs ve neshe kapalı lafız.',3],['Hafî','الْخَفِيُّ','Sîga dışı bir engelle bazı fertlere delâleti kapalı.',3],['Müşkil','الْمُشْكِلُ','Sîganın kendisinden kapalı; karîneyle anlaşılır.',3],['Mücmel','الْمُجْمَلُ','Ancak sözün sahibinin beyanıyla anlaşılır.',3],['Müteşâbih','الْمُتَشَابِهُ','Mânâsı bilinemeyecek ölçüde kapalı.',3],['Te’vil','التَّأْوِيلُ','Lafzı delille zâhir mânâsından başka mânâya çekmek.',3],
 ['İbârenin delâleti','عِبَارَةُ النَّصِّ','Aslî veya tebe‘î kastedilen hükme delâlet.',4],['İşâretin delâleti','إِشَارَةُ النَّصِّ','Kastedilmeyen ama asıl mânânın gerektirdiği hükme delâlet.',4],['Nassın delâleti','دَلَالَةُ النَّصِّ','Dil bilgisiyle anlaşılan illet ortaklığıyla meskût anha delâlet.',4],['İktizânın delâleti','اقْتِضَاءُ النَّصِّ','Sözün doğruluğu/sıhhati için takdiri gereken lâzıma delâlet.',4],['Mantûk','الْمَنْطُوقُ','Sözde zikredilenin hükmüne delâlet (cumhur).',4],['Mefhûm-i muvâfaka','مَفْهُومُ الْمُوَافَقَةِ','Meskût anhın hükmünün mantûka uygun olması.',4],['Mefhûm-i muhâlefe','مَفْهُومُ الْمُخَالَفَةِ','Kaydı taşımayan meskût anh için mantûkun hükmünün geçerli olmaması.',4]
];
