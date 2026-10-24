/* ===== Laboratuvar ve oyun verileri ===== */
/* Kelime: [yazı, vazife, âmil(indeks | 'M' ibtidâ | 'V' vukû‘ | null), i‘râb(r n j z | b mebnî), alâmet, tür(l lafzî | t takdîrî | m mahallî), ek{pre, note, ar, na}] */
const RO={
 fiil:['Fiil (mâzi)','فِعْلٌ مَاضٍ'],harf:['Harf','حَرْفٌ'],ismFiil:['İsm-i fiil','اسْمُ فِعْلٍ'],
 fail:['Fâil','فَاعِلٌ'],naib:['Nâib-i fâil','نَائِبُ فَاعِلٍ'],mubteda:['Mübtedâ','مُبْتَدَأٌ'],haber:['Haber','خَبَرٌ'],
 mefbih:['Mef‘ûl bih','مَفْعُولٌ بِهِ'],mefmut:['Mef‘ûl mutlak','مَفْعُولٌ مُطْلَقٌ'],meffih:['Mef‘ûl fîh','مَفْعُولٌ فِيهِ'],mefleh:['Mef‘ûl leh','مَفْعُولٌ لَهُ'],mefmaah:['Mef‘ûl maah','مَفْعُولٌ مَعَهُ'],
 hal:['Hâl','حَالٌ'],temyiz:['Temyiz','تَمْيِيزٌ'],mustesna:['Müstesnâ','مُسْتَثْنًى'],
 nakIsm:['Kâne ve benzerinin ismi','اسْمُ كَانَ'],nakHaber:['Kâne ve benzerinin haberi','خَبَرُ كَانَ'],
 inIsm:['İnne’nin ismi','اسْمُ إِنَّ'],inHaber:['İnne’nin haberi','خَبَرُ إِنَّ'],laIsm:['Lâ-yı nefy-i cinsin ismi','اسْمُ لَا'],laHaber:['Lâ-yı nefy-i cinsin haberi','خَبَرُ لَا'],
 maIsm:['Mâ’nın ismi','اسْمُ مَا'],maHaber:['Mâ’nın haberi','خَبَرُ مَا'],
 mecrur:['Harf-i cerle mecrûr','اسْمٌ'],mudIleyh:['Muzâfun ileyh','مُضَافٌ إِلَيْهِ'],
 sifat:['Sıfat','صِفَةٌ'],atf:['Ma‘tûf','مَعْطُوفٌ'],tekid:['Te’kîd','تَأْكِيدٌ'],bedel:['Bedel','بَدَلٌ'],beyan:['Atf-ı beyân','عَطْفُ بَيَانٍ'],
 munada:['Münâdâ','مُنَادًى'],mudari:['Muzâri fiil','فِعْلٌ مُضَارِعٌ'],sart:['Fiil-i şart','فِعْلُ الشَّرْطِ'],cevap:['Cevâb-ı şart','جَوَابُ الشَّرْطِ']
};
const IR={r:['Merfû','مَرْفُوعٌ','رَفْعِهِ','رَفْعٍ'],n:['Mansûb','مَنْصُوبٌ','نَصْبِهِ','نَصْبٍ'],j:['Mecrûr','مَجْرُورٌ','جَرِّهِ','جَرٍّ'],z:['Meczûm','مَجْزُومٌ','جَزْمِهِ','جَزْمٍ'],b:['Mebnî','مَبْنِيٌّ']};
const AL={d:['damme','الضَّمَّةُ',1],f:['fetha','الْفَتْحَةُ',1],k:['kesre','الْكَسْرَةُ',1],s:['sükûn (hareke hazfi)','السُّكُونُ',1],w:['vav','الْوَاوُ'],a:['elif','الْأَلِفُ'],y:['yâ','الْيَاءُ'],n:['nun','ثُبُوتُ النُّونِ'],h:['son harfin hazfi','حَذْفُ حَرْفِ الْعِلَّةِ'],hn:['nun hazfi','حَذْفُ النُّونِ'],
 md:['damme üzerine bina','الضَّمِّ'],mf:['fetha üzerine bina','الْفَتْحِ'],mk:['kesre üzerine bina','الْكَسْرِ'],ms:['sükûn üzerine bina','السُّكُونِ']};
const KIND={l:'Lafzî',t:'Takdîrî',m:'Mahallî'};
const W=(w,r,a,i,al,k,x)=>Object.assign({w,r,a,i,al,k:k||(i==='b'?'':'l')},x||{});
const LAB=[
 {s:[W('ضَرَبَ','fiil',null,'b','mf'),W('زَيْدٌ','fail',0,'r','d'),W('غُلَامَ','mefbih',0,'n','f'),W('عَمْرٍو','mudIleyh',2,'j','k',0,{note:'Âmili muzâf olan غُلَامَ’dir (kıyâsî âmil: ism-i muzâf).'})],tr:'Zeyd Amr’ın kölesini dövdü.',p:50},
 {s:[W('لَنْ','harf',null,'b','ms'),W('يَضْرِبَ','mudari',0,'n','f'),W('زَيْدٌ','fail',1,'r','d'),W('عَمْرًا','mefbih',1,'n','f')],tr:'Zeyd Amr’ı asla dövmeyecek.',p:51},
 {s:[W('مَرَرْتُ','fiil',null,'b','ms',0,{note:'Fâili bitişik zamir تُ; fiil sükûn üzerine mebnî.'}),W('بِـ','harf',null,'b','mk',0,{pre:1}),W('زَيْدٍ','mecrur',1,'j','k',0,{note:'Mahallen mansûb: gayr-i sarîh mef‘ûl bih; müteallakı مَرَرْتُ (zarf-ı lağv).'})],tr:'Zeyd’in yanından geçtim.',p:55},
 {s:[W('زَيْدٌ','mubteda','M','r','d'),W('قَائِمٌ','haber','M','r','d',0,{note:'Mübtedâ ve haberin âmili ma‘nevîdir: lafzî âmillerden tecrîd (ibtidâ).'})],tr:'Zeyd ayaktadır.',p:84},
 {s:[W('إِنَّ','harf',null,'b','mf'),W('زَيْدًا','inIsm',0,'n','f'),W('قَائِمٌ','inHaber',0,'r','d')],tr:'Şüphesiz Zeyd ayaktadır.',p:60},
 {s:[W('كَانَ','fiil',null,'b','mf',0,{ar:'فِعْلٌ مَاضٍ نَاقِصٌ'}),W('زَيْدٌ','nakIsm',0,'r','d'),W('عَالِمًا','nakHaber',0,'n','f')],tr:'Zeyd âlim idi.',p:108},
 {s:[W('أَعْلَمَ','fiil',null,'b','mf'),W('زَيْدٌ','fail',0,'r','d'),W('عَمْرًا','mefbih',0,'n','f',0,{ar:'مَفْعُولٌ بِهِ أَوَّلُ'}),W('بَكْرًا','mefbih',0,'n','f',0,{ar:'مَفْعُولٌ بِهِ ثَانٍ'}),W('فَاضِلًا','mefbih',0,'n','f',0,{ar:'مَفْعُولٌ بِهِ ثَالِثٌ'})],tr:'Zeyd, Amr’a Bekir’in faziletli olduğunu bildirdi.',p:73},
 {s:[W('أَعْطَيْتُ','fiil',null,'b','ms'),W('زَيْدًا','mefbih',0,'n','f',0,{ar:'مَفْعُولٌ بِهِ أَوَّلُ'}),W('دِرْهَمًا','mefbih',0,'n','f',0,{ar:'مَفْعُولٌ بِهِ ثَانٍ'})],tr:'Zeyd’e bir dirhem verdim.',p:70},
 {s:[W('مَا','harf',null,'b','ms',0,{ar:'حَرْفُ نَفْيٍ مُشَبَّهٌ بِلَيْسَ'}),W('زَيْدٌ','maIsm',0,'r','d'),W('قَائِمًا','maHaber',0,'n','f')],tr:'Zeyd ayakta değildir.',p:66},
 {s:[W('لَا','harf',null,'b','ms',0,{ar:'حَرْفُ نَفْيٍ لِلْجِنْسِ'}),W('غُلَامَ','laIsm',0,'n','f'),W('رَجُلٍ','mudIleyh',1,'j','k'),W('جَالِسٌ','laHaber',0,'r','d'),W('عِنْدَنَا','meffih',3,'n','f',0,{note:'Zarf; âmili جَالِسٌ. (نَا muzâfun ileyh)'})],tr:'Yanımızda oturan hiçbir adam kölesi yoktur.',p:65},
 {s:[W('جَاءَنِي','fiil',null,'b','mf',0,{note:'نِي: mef‘ûl bih olan bitişik zamir.'}),W('الْقَوْمُ','fail',0,'r','d'),W('إِلَّا','harf',null,'b','ms',0,{ar:'حَرْفُ اسْتِثْنَاءٍ'}),W('زَيْدًا','mustesna',2,'n','f',0,{na:1,note:'Müsbet-tam sözde إِلَّا’dan sonra nasb vâcib. (Âmilinde ihtilaf vardır.)'})],tr:'Zeyd hariç kavim bana geldi.',p:107},
 {s:[W('لَمْ','harf',null,'b','ms'),W('يَضْرِبْ','mudari',0,'z','s'),W('زَيْدٌ','fail',1,'r','d')],tr:'Zeyd dövmedi.',p:67},
 {s:[W('إِنْ','harf',null,'b','ms',0,{ar:'حَرْفُ شَرْطٍ جَازِمٌ'}),W('تُكْرِمْنِي','sart',0,'z','s',0,{note:'Fâili gizli أَنْتَ; نِي mef‘ûl bih.'}),W('أُكْرِمْكَ','cevap',0,'z','s',0,{note:'Fâili gizli أَنَا; كَ mef‘ûl bih.'})],tr:'Bana ikram edersen sana ikram ederim.',p:67},
 {s:[W('ضَرَبْتُ','fiil',null,'b','ms'),W('زَيْدًا','mefbih',0,'n','f'),W('تَأْدِيبًا','mefleh',0,'n','f')],tr:'Zeyd’i terbiye için dövdüm.',p:58},
 {s:[W('جِئْتُ','fiil',null,'b','ms'),W('وَ','harf',null,'b','mf',0,{pre:1,ar:'وَاوُ الْمَعِيَّةِ'}),W('زَيْدًا','mefmaah',0,'n','f')],tr:'Zeyd ile birlikte geldim.',p:105},
 {s:[W('ضَرَبْتُ','fiil',null,'b','ms'),W('ضَرْبًا','mefmut',0,'n','f')],tr:'(Gerçekten) dövdüm.',p:103},
 {s:[W('صُمْتُ','fiil',null,'b','ms'),W('شَهْرًا','meffih',0,'n','f',0,{note:'Zaman zarfından فِي kıyâsen hazfedildi.'})],tr:'Bir ay oruç tuttum.',p:56},
 {s:[W('ضَرَبْتُ','fiil',null,'b','ms'),W('زَيْدًا','mefbih',0,'n','f'),W('قَائِمًا','hal',0,'n','f')],tr:'Zeyd’i ayakta iken dövdüm.',p:105},
 {s:[W('طَابَ','fiil',null,'b','mf'),W('زَيْدٌ','fail',0,'r','d'),W('نَفْسًا','temyiz',0,'n','f',0,{note:'Cümlede takdir edilen zâtın temyizi: طَابَ شَيْءُ زَيْدٍ.'})],tr:'Zeyd’in gönlü hoş oldu.',p:107},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('أَحَدَ عَشَرَ','fail',0,'r','mf','m',{note:'Mürekkeb sayı: iki cüzü de fetha üzerine mebnî.'}),W('رَجُلًا','temyiz',1,'n','f',0,{note:'Âmili ism-i mübhem-i tâm أَحَدَ عَشَرَ (takdîrî tenvînle tamam).'})],tr:'Bana on bir adam geldi.',p:80},
 {s:[W('نِعْمَ','fiil',null,'b','mf',0,{ar:'فِعْلُ مَدْحٍ'}),W('الرَّجُلُ','fail',0,'r','d'),W('زَيْدٌ','mubteda','M','r','d',0,{note:'Mahsûs; mübtedâdır, نِعْمَ الرَّجُلُ haberi (mukaddem).'})],tr:'Ne güzel adamdır Zeyd!',p:70},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('رَجُلٌ','fail',0,'r','d'),W('عَالِمٌ','sifat',0,'r','d',0,{note:'Tâbiin âmili metbûunun âmilidir.'})],tr:'Bana âlim bir adam geldi.',p:113},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('زَيْدٌ','fail',0,'r','d'),W('أَخُوكَ','bedel',0,'r','w',0,{ar:'بَدَلُ كُلٍّ مِنْ كُلٍّ',note:'Esmâ-i sitte: ref‘ vav ile.'})],tr:'Bana Zeyd, kardeşin geldi.',p:119},
 {s:[W('ضَرَبْتُ','fiil',null,'b','ms'),W('زَيْدًا','mefbih',0,'n','f'),W('رَأْسَهُ','bedel',0,'n','f',0,{ar:'بَدَلُ بَعْضٍ مِنْ كُلٍّ'})],tr:'Zeyd’i, başını dövdüm.',p:119},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('زَيْدٌ','fail',0,'r','d'),W('نَفْسُهُ','tekid',0,'r','d',0,{ar:'تَأْكِيدٌ مَعْنَوِيٌّ'})],tr:'Bana Zeyd’in kendisi geldi.',p:119},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('زَيْدٌ','fail',0,'r','d'),W('وَ','harf',null,'b','mf',0,{pre:1,ar:'حَرْفُ عَطْفٍ'}),W('عَمْرٌو','atf',0,'r','d')],tr:'Bana Zeyd ve Amr geldi.',p:117},
 {s:[W('رَأَيْتُ','fiil',null,'b','ms'),W('مُسْلِمِينَ','mefbih',0,'n','y',0,{note:'Sâlim müzekker cemi: nasb yâ ile.'})],tr:'Müslümanlar gördüm.',p:124},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('مُسْلِمَانِ','fail',0,'r','a',0,{note:'Müsennâ: ref‘ elif ile.'})],tr:'Bana iki Müslüman geldi.',p:124},
 {s:[W('رَأَيْتُ','fiil',null,'b','ms'),W('مُسْلِمَاتٍ','mefbih',0,'n','k',0,{note:'Sâlim müennes cemi: nasb kesre ile.'})],tr:'Müslüman kadınlar gördüm.',p:124},
 {s:[W('مَرَرْتُ','fiil',null,'b','ms'),W('بِـ','harf',null,'b','mk',0,{pre:1}),W('أَحْمَدَ','mecrur',1,'j','f',0,{note:'Gayr-i munsarif: cer fetha ile (fiil vezninde alem).'})],tr:'Ahmed’in yanından geçtim.',p:124},
 {s:[W('الزَّيْدَانِ','mubteda','M','r','a'),W('يَضْرِبَانِ','mudari','V','r','n',0,{note:'Fiil ile fâili (elif) mübtedânın haberi olan cümledir: mahallen merfû.'})],tr:'İki Zeyd dövüyorlar.',p:125},
 {s:[W('لَمْ','harf',null,'b','ms'),W('يَغْزُ','mudari',0,'z','h'),W('زَيْدٌ','fail',1,'r','d')],tr:'Zeyd gazveye çıkmadı.',p:125},
 {s:[W('جَاءَ','fiil',null,'b','mf'),W('الْقَاضِي','fail',0,'r','d','t',{note:'Menkûs: ref‘ yâ üzerinde takdîrî.'})],tr:'Kadı geldi.',p:130},
 {s:[W('رَأَيْتُ','fiil',null,'b','ms'),W('الْعَصَا','mefbih',0,'n','f','t',{note:'Maksûr: elif üzerinde takdîrî.'})],tr:'Asâyı gördüm.',p:128},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('غُلَامِي','fail',0,'r','d','t',{note:'Yâ-yı mütekellime muzâf: i‘râb takdîrî. (ي muzâfun ileyh)'})],tr:'Kölem bana geldi.',p:128},
 {s:[W('يَا','harf',null,'b','ms',0,{ar:'حَرْفُ نِدَاءٍ'}),W('زَيْدُ','munada',0,'n','md','m',{note:'Müfred ma‘rife münâdâ: damme üzerine mebnî, mahallen mansûb (mukadder أَدْعُو ile).'})],tr:'Ey Zeyd!',p:135},
 {s:[W('لَا','harf',null,'b','ms',0,{ar:'حَرْفُ نَفْيٍ لِلْجِنْسِ'}),W('رَجُلَ','laIsm',0,'n','mf','m',{note:'Müfred nekre: fetha üzerine mebnî, mahallen mansûb.'}),W('فِي','harf',null,'b','ms'),W('الدَّارِ','mecrur',2,'j','k',0,{note:'Câr-mecrûr lâ’nın haberidir (zarf-ı müstekar).'})],tr:'Evde hiçbir adam yoktur.',p:136},
 {s:[W('زَيْدٌ','mubteda','M','r','d'),W('فِي','harf',null,'b','ms'),W('الدَّارِ','mecrur',1,'j','k',0,{note:'Zarf-ı müstekar (حَصَلَ takdiriyle) haber yerindedir.'})],tr:'Zeyd evdedir.',p:55},
 {s:[W('أَ','harf',null,'b','mf',0,{pre:1,ar:'حَرْفُ اسْتِفْهَامٍ'}),W('قَائِمٌ','mubteda','M','r','d',0,{note:'İstifhâmdan sonra zâhiri ref‘ eden sıfat: haberi yok.'}),W('الزَّيْدَانِ','fail',1,'r','a',0,{note:'قَائِمٌ’un fâili; haberin yerini tuttu (سَادٌّ مَسَدَّ الْخَبَرِ).'})],tr:'İki Zeyd ayakta mı?',p:100},
 {s:[W('هَيْهَاتَ','ismFiil',null,'b','mf',0,{note:'Mâzi mânâsında ism-i fiil (بَعُدَ); ma‘nâ-yı fiil olarak amel eder.'}),W('زَيْدٌ','fail',0,'r','d')],tr:'Zeyd ne uzak!',p:94},
 {s:[W('عَسَى','fiil',null,'b','mf',0,{ar:'فِعْلُ مُقَارَبَةٍ'}),W('زَيْدٌ','nakIsm',0,'r','d',0,{ar:'اسْمُ عَسَى'}),W('أَنْ','harf',null,'b','ms',0,{ar:'حَرْفُ مَصْدَرٍ وَنَصْبٍ'}),W('يَخْرُجَ','mudari',2,'n','f',0,{note:'أَنْ يَخْرُجَ mahallen mansûb: عَسَى’nın haberi.'})],tr:'Umulur ki Zeyd çıkar.',p:74},
 {s:[W('كَادَ','fiil',null,'b','mf',0,{ar:'فِعْلُ مُقَارَبَةٍ'}),W('زَيْدٌ','nakIsm',0,'r','d',0,{ar:'اسْمُ كَادَ'}),W('يَخْرُجُ','mudari','V','r','d',0,{note:'Cümle كَادَ’ın haberi: mahallen mansûb.'})],tr:'Zeyd neredeyse çıkıyordu.',p:74},
 {s:[W('زَيْدٌ','mubteda','M','r','d'),W('حَسَنٌ','haber','M','r','d'),W('وَجْهُهُ','fail',1,'r','d',0,{note:'Sıfat-ı müşebbehe حَسَنٌ’ün fâili.'})],tr:'Zeyd’in yüzü güzeldir.',p:76},
 {s:[W('جَاءَنِي','fiil',null,'b','mf'),W('زَيْدٌ','fail',0,'r','d'),W('رَاكِبًا','hal',0,'n','f'),W('غُلَامُهُ','fail',2,'r','d',0,{note:'İsm-i fâil رَاكِبًا, zü’l-hâle dayanarak ref‘ etti.'})],tr:'Zeyd bana, kölesi binmiş olarak geldi.',p:75},
 {s:[W('أَعْجَبَنِي','fiil',null,'b','mf'),W('ضَرْبُ','fail',0,'r','d'),W('زَيْدٍ','mudIleyh',1,'j','k',0,{note:'Lafzen mecrûr, mânen masdarın fâili.'}),W('عَمْرًا','mefbih',1,'n','f',0,{note:'Âmili masdar ضَرْبُ.'})],tr:'Zeyd’in Amr’ı dövmesi hoşuma gitti.',p:77},
 {s:[W('جَاءَ','fiil',null,'b','mf'),W('هٰؤُلَاءِ','fail',0,'r','mk','m',{note:'İşaret ismi: kesre üzerine mebnî, mahallen merfû.'})],tr:'Bunlar geldi.',p:132},
 {s:[W('لَنْ','harf',null,'b','ms'),W('يَضْرِبُوا','mudari',0,'n','hn',0,{note:'Ef‘âl-i hamse: nasb nun hazfiyle; vav fâil.'})],tr:'Asla dövmeyecekler.',p:125},
 {s:[W('ضُرِبَ','fiil',null,'b','mf',0,{ar:'فِعْلٌ مَاضٍ مَبْنِيٌّ لِلْمَجْهُولِ'}),W('زَيْدٌ','naib',0,'r','d')],tr:'Zeyd dövüldü.',p:94}
];
/* ---- Oyun: إِنَّ mi أَنَّ mi ---- [cümle, k|f|b, kural, sayfa] */
const INNE=[
 ['___ زَيْدًا قَائِمٌ','k','Başta (ibtidâ)',60],['وَاللّٰهِ ___ زَيْدًا قَائِمٌ','k','Kasem cevabı',60],['﴿وَآتَيْنَاهُ مِنَ الْكُنُوزِ مَا ___ مَفَاتِحَهُ لَتَنُوءُ﴾','k','Sıla',60],
 ['زَيْدٌ ___هُ قَائِمٌ','k','İsm-i ayn hakkında haber',60],['عَلِمْتُ ___ زَيْدًا لَقَائِمٌ','k','Haberinde lâm-ı ibtidâ',61],['قُلْ ___ اللّٰهَ تَعَالَى وَاحِدٌ','k','Zandan âri kavilden sonra',61],
 ['أَتَقُولُ ذٰلِكَ؟ حَتَّى ___ زَيْدًا يَقُولُهُ','k','İbtidâiyye حَتَّى’dan sonra',61],['نَعَمْ؛ ___ زَيْدًا قَائِمٌ','k','Tasdik harfinden sonra',61],['أَلَا ___ زَيْدًا قَائِمٌ','k','İftitah harfinden sonra',61],
 ['﴿وَ___ فَرِيقًا مِنَ الْمُؤْمِنِينَ لَكَارِهُونَ﴾','k','Hâl vav’ından sonra',61],
 ['بَلَغَنِي ___كَ قَائِمٌ','f','Fâil',61],['عَلِمْتُ ___ زَيْدًا قَائِمٌ','f','Mef‘ûl',61],['عِنْدِي ___كَ قَائِمٌ','f','Mübtedâ',61],['اِجْلِسْ حَيْثُ ___ زَيْدًا جَالِسٌ','f','Muzâfun ileyh (metindeki tercih; kesre de nakledilir)',61],
 ['لَوْ ___كَ قَائِمٌ لَكَانَ كَذَا','f','لَوْ’dan sonra: fâil (لَوْ ثَبَتَ قِيَامُكَ)',62],['لَوْلَا ___كَ ذَاهِبٌ لَكَانَ كَذَا','f','لَوْلَا’dan sonra: mübtedâ',62],
 ['اِجْلِسْ مَا ___ زَيْدًا قَائِمٌ','f','Tevkîtî مَا’dan sonra',62],['عَجِبْتُ مِنْ ___كَ قَائِمٌ','f','Harf-i cerden sonra',62],['عَرَفْتُ أُمُورَكَ حَتَّى ___كَ صَالِحٌ','f','Müfrede atfeden حَتَّى’dan sonra',62],
 ['مَا رَأَيْتُهُ مُذْ ___كَ قَائِمٌ','f','مُذْ ve مُنْذُ’dan sonra',62],['مَنْ يُكْرِمْنِي فَ___ي أُكْرِمُهُ','b','Cezâ fâ’sından sonra: iki takdir de câiz',62]
];
/* ---- Oyun: munsarif ---- [kelime, m munsarif | g gayr-i munsarif | c ikisi câiz, sebep] */
const MUNS=[
 ['زَيْدٌ','m','Cer ve tenvîn alır.'],['رَجُلٌ','m','Cer ve tenvîn alır.'],['كِتَابٌ','m','Engel yok.'],['رِجَالٌ','m','Mükesser cemi ama مَفَاعِل vezninde değil.'],['شَجَرَةٌ','m','Tâlı ama alem değil.'],['قَلَمٌ','m','Engel yok.'],
 ['أَحْمَدُ','g','Fiil vezninde alem.'],['شَمَّرُ','g','Fiile mahsus vezinde alem.'],['يَزِيدُ','g','Başında muzâri harfi olan alem.'],['يَشْكُرُ','g','Başında muzâri harfi olan alem.'],['أَفْضَلُ','g','Tafdîl: أَفْعَلُ.'],['أَبْيَضُ','g','Vasıf: أَفْعَلُ.'],
 ['إِبْرَاهِيمُ','g','Acemî alem, üçten fazla harf.'],['حُبْلَى','g','Maksûre elifle müennes.'],['حَمْرَاءُ','g','Memdûde elifle müennes.'],['فَاطِمَةُ','g','Tâ-yı te’nîsli alem.'],['حَمْزَةُ','g','Tâlı alem (müzekker de olsa).'],
 ['زَيْنَبُ','g','Takdîrî tâlı, üçten fazla harfli müennes alem.'],['بَعْلَبَكُّ','g','Mürekkeb alem.'],['حَضْرَمَوْتُ','g','Mürekkeb alem.'],['عِمْرَانُ','g','Zâid elif-nun (alem).'],['سَكْرَانُ','g','Zâid elif-nun (vasıf, tâ almaz).'],
 ['مَسَاجِدُ','g','Cemi: فَعَالِلُ vezni.'],['مَصَابِيحُ','g','Cemi: فَعَالِيلُ vezni.'],['مَثْنَى','g','Semâî: adl kalıbı.'],['أُخَرُ','g','Semâî: sıfat (adl).'],['عُمَرُ','g','Semâî alem.'],['زُحَلُ','g','Semâî alem.'],['جُمَعُ','g','Semâî: te’kîd cemi.'],
 ['هِنْدٌ','c','Üç harfli, ortası sâkin müennes alem: sarf ve men‘ câiz.'],['بِالْأَحْمَرِ','m','Lâm-ı ta‘rîf alınca munsarif olur.'],['بِأَحْمَرِنَا','m','İzâfet alınca munsarif olur.']
];
/* ---- Oyun: cevâb-ı şartta fâ ---- [şart, cevap (fâsız), v vâcib | y giremez | c câiz, kural] */
const FAA=[
 ['إِنْ ضَرَبْتَ','ضَرَبْتُ','y','Cevap mutasarrıf mâzi (muzâri mânâsında).'],['إِنْ ضَرَبْتَ','لَمْ أَضْرِبْ','y','لَمْ ile menfî muzâri.'],['إِنْ ضَرَبْتَ','أَنْتَ مَضْرُوبٌ','v','Cevap isim cümlesi.'],
 ['﴿وَمَنْ يَفْعَلْ ذٰلِكَ','لَيْسَ مِنَ اللّٰهِ فِي شَيْءٍ﴾','v','Gayr-i mutasarrıf mâzi (لَيْسَ).'],['﴿فَإِنْ كَرِهْتُمُوهُنَّ','عَسَى أَنْ تَكْرَهُوا شَيْئًا﴾','v','Gayr-i mutasarrıf mâzi (عَسَى).'],
 ['﴿إِنْ كَانَ قَمِيصُهُ قُدَّ مِنْ قُبُلٍ','صَدَقَتْ﴾','v','Mâzi mânâsında mâzi: قَدْ mukadder.'],['﴿وَإِنْ تَعَاسَرْتُمْ','سَتُرْضِعُ لَهُ أُخْرَى﴾','v','سَ ile muzâri.'],
 ['﴿وَمَنْ يَبْتَغِ غَيْرَ الْإِسْلَامِ دِينًا','لَنْ يُقْبَلَ مِنْهُ﴾','v','لَنْ ile muzâri.'],['إِنْ ضَرَبَكَ زَيْدٌ','اضْرِبْهُ','v','İnşâî: emir.'],['إِنْ ضَرَبَكَ زَيْدٌ','لَا تَضْرِبْهُ','v','İnşâî: nehy.'],
 ['إِنْ ضَرَبَكَ زَيْدٌ','هَلْ تَضْرِبُهُ','v','İnşâî: istifhâm.'],['إِنْ أَكْرَمْتَنِي','يَرْحَمُكَ اللّٰهُ','v','İnşâî: duâ.'],['إِنْ تَضْرِبْ','أَضْرِبْ','c','Müsbet muzâri: fâsız cezm, fâ ile ref‘ (فَأَضْرِبُ).'],
 ['إِنْ تَضْرِبْ','لَا أَضْرِبْ','c','لَا ile menfî muzâri: ikisi de câiz.'],['إِنْ تُكْرِمْنِي','أُكْرِمْكَ','c','Müsbet muzâri.']
];
/* ---- Oyun: lafzî / takdîrî / mahallî ---- [cümle, hedef, l|t|m, açıklama] */
const KINDQ=[
 ['جَاءَنِي زَيْدٌ','زَيْدٌ','l','Damme görünür.'],['جَاءَ الْقَاضِي','الْقَاضِي','t','Menkûs: ref‘ takdîrî.'],['رَأَيْتُ الْقَاضِيَ','الْقَاضِيَ','l','Menkûsun nasbı lafzîdir.'],
 ['مَرَرْتُ بِالْقَاضِي','الْقَاضِي','t','Menkûsun cerri takdîrî.'],['جَاءَتِ الْعَصَا','الْعَصَا','t','Maksûr isim: üç hâlde takdîrî.'],['زَيْدٌ يَخْشَى','يَخْشَى','t','Elifle biten fiil: ref‘ takdîrî.'],
 ['لَمْ يَخْشَ','يَخْشَ','l','Cezm lafzî: son harf hazfi.'],['زَيْدٌ يَرْمِي','يَرْمِي','t','Ref‘ takdîrî.'],['لَنْ يَرْمِيَ','يَرْمِيَ','l','Nasb lafzî.'],['زَيْدٌ يَغْزُو','يَغْزُو','t','Ref‘ takdîrî.'],
 ['جَاءَنِي غُلَامِي','غُلَامِي','t','Yâ-yı mütekellime muzâf.'],['جَاءَنِي أَبُو الْقَاسِمِ','أَبُو','t','Harfle mu‘reb isim sâkine kavuştu (vav telaffuzda düşer).'],
 ['جَاءَنِي ضَارِبُو الْقَوْمِ','ضَارِبُو','t','Vav telaffuzda düştü → takdîrî.'],['جَاءَنِي مُصْطَفَوُ الْقَوْمِ','مُصْطَفَوُ','l','Öncesi fethalı: vav harekelendi → lafzî.'],
 ['جَاءَ هٰذَا','هٰذَا','m','İşaret ismi mebnî: mahallen merfû.'],['جَاءَ الَّذِي ضَرَبَكَ','الَّذِي','m','Mevsûl mebnî: mahallen merfû.'],['جَاءَنِي أَحَدَ عَشَرَ رَجُلًا','أَحَدَ عَشَرَ','m','Mürekkeb sayı mebnî.'],
 ['جَاءَ تَأَبَّطَ شَرًّا','تَأَبَّطَ شَرًّا','t','Alem olmuş cümle: hikâye → takdîrî.'],['يَا زَيْدُ','زَيْدُ','m','Mebnî münâdâ: mahallen mansûb.'],['هُوَ قَائِمٌ','هُوَ','m','Zamir mebnî: mahallen merfû.'],
 ['مَرَرْتُ بِزَيْدٍ','زَيْدٍ','l','Lafzen mecrûr (mahallen de mansûb); sorulan cer i‘râbı lafzîdir.']
];
/* ---- Oyun: zamir ---- [kelime, v vâciben müstetir | c câizen müstetir | b bâriz, zamir/açıklama, ipucu] */
const ZAM=[
 ['أَضْرِبُ','v','أَنَا — mütekellim',''],['نَضْرِبُ','v','نَحْنُ — mütekellim ma‘a’l-gayr',''],['تَضْرِبُ','v','أَنْتَ — muhâtab müfred müzekker (gayr-i mâzi)','sen'],['اضْرِبْ','v','أَنْتَ — emir',''],
 ['صَهْ','v','İsm-i fiil (emir mânâsında)',''],['زَيْدٌ أَفْضَلُ مِنْ عَمْرٍو','v','Tafdîlde (Kuhl meselesi dışında)','أَفْضَلُ'],['رَجُلَانِ ضَارِبَانِ','v','İsm-i fâilin tesniyesi','ضَارِبَانِ'],
 ['جَاءَنِي الْقَوْمُ عَدَا زَيْدًا','v','Fiil olan عَدَا','عَدَا'],['لَيْسَ زَيْدًا (istisnâda)','v','İstisnâ bâbında لَيْسَ',''],['زَيْدٌ ضَرَبَ','c','هُوَ — gâib müfred','ضَرَبَ'],['هِنْدٌ تَضْرِبُ','c','هِيَ — gâibe müfrede','تَضْرِبُ'],
 ['زَيْدٌ ضَارِبٌ','c','هُوَ — şibh-i fiil, amel şartı var','ضَارِبٌ'],['زَيْدٌ فِي الدَّارِ','c','Müteallaktan zarfa intikal eden zamir','فِي الدَّارِ'],['ضَرَبَا','b','Elif (tesniye)',''],['ضَرَبُوا','b','Vav (müzekker cemi)',''],
 ['ضَرَبْنَ','b','Nun (müennes cemi)',''],['ضَرَبْتُ','b','Tâ (mütekellim, mâzi)',''],['ضَرَبْنَا','b','نَا (mütekellim ma‘a’l-gayr, mâzi)',''],['تَضْرِبِينَ','b','Yâ (muhâtabe)',''],['يَضْرِبَانِ','b','Elif',''],['ضَرَبْتُمْ','b','تُمْ (aslı ضَرَبْتُمُو)','']
];
/* ---- 60 âmil ---- [arapça, grup, mânâ/not] */
const AG={cer:['Harf-i cer','حُرُوفُ الْجَرِّ',20],muse:['Hurûf-u müşebbehe','الْحُرُوفُ الْمُشَبَّهَةُ بِالْفِعْلِ',6],ill:['Munkatı‘ إِلَّا','إِلَّا فِي الْمُنْقَطِعِ',1],lnc:['Lâ-yı nefy-i cins','لَا لِنَفْيِ الْجِنْسِ',1],mala:['Leyse’ye benzeyen','مَا وَلَا الْمُشَبَّهَتَانِ بِلَيْسَ',2],nasb:['Nâsıb','النَّوَاصِبُ',4],cazm:['Câzim','الْجَوَازِمُ',15],kiy:['Kıyâsî âmil','الْعَوَامِلُ الْقِيَاسِيَّةُ',9],man:['Ma‘nevî âmil','الْعَامِلَانِ الْمَعْنَوِيَّانِ',2]};
const AMILS=[
 ['الْبَاءُ','cer','لِلْإِلْصَاقِ','ilsâk (bitişme)'],['مِنْ','cer','لِلِابْتِدَاءِ','ibtidâ (başlangıç)'],['إِلَى','cer','لِلِانْتِهَاءِ','intihâ (bitiş)'],['عَنْ','cer','لِلْبُعْدِ وَالْمُجَاوَزَةِ','uzaklık, geçme'],['عَلَى','cer','لِلِاسْتِعْلَاءِ','isti‘lâ (üstünlük)'],
 ['اللَّامُ','cer','لِلتَّعْلِيلِ أَوِ التَّخْصِيصِ','ta‘lîl, tahsîs'],['فِي','cer','لِلظَّرْفِ','zarfiyyet'],['الْكَافُ','cer','لِلتَّشْبِيهِ','teşbîh'],['حَتَّى','cer','لِلْغَايَةِ','gâye'],['رُبَّ','cer','لِلتَّقْلِيلِ','taklîl'],
 ['وَاوُ الْقَسَمِ','cer','لِلْقَسَمِ','kasem'],['تَاءُ الْقَسَمِ','cer','لِلْقَسَمِ','kasem'],['حَاشَا','cer','لِلِاسْتِثْنَاءِ','istisnâ'],['مُذْ','cer','لِلِابْتِدَاءِ فِي الزَّمَانِ الْمَاضِي','geçmiş zamanda başlangıç'],['مُنْذُ','cer','لِلِابْتِدَاءِ فِي الزَّمَانِ الْمَاضِي','geçmiş zamanda başlangıç'],
 ['خَلَا','cer','لِلِاسْتِثْنَاءِ','istisnâ (çoğu zaman fiil)'],['عَدَا','cer','لِلِاسْتِثْنَاءِ','istisnâ (çoğu zaman fiil)'],['لَوْلَا','cer','لِامْتِنَاعِ شَيْءٍ لِوُجُودِ غَيْرِهِ','zamirle: imtinâ‘'],['كَيْ','cer','لِلتَّعْلِيلِ','istifhâm مَا ile: ta‘lîl'],['لَعَلَّ','cer','لِلتَّرَجِّي','Ukayl lehçesinde cer'],
 ['إِنَّ','muse','لِلتَّحْقِيقِ','tahkîk'],['أَنَّ','muse','لِلتَّحْقِيقِ','tahkîk'],['كَأَنَّ','muse','لِلتَّشْبِيهِ','teşbîh'],['لٰكِنَّ','muse','لِلِاسْتِدْرَاكِ','istidrâk'],['لَيْتَ','muse','لِلتَّمَنِّي','temennî'],['لَعَلَّ','muse','لِلتَّرَجِّي','terecci'],
 ['إِلَّا','ill','بِمَعْنَى لٰكِنَّ','munkatı‘ istisnâda “lâkinne” mânâsı'],['لَا','lnc','لِنَفْيِ الْجِنْسِ','cinsi nefy'],['مَا','mala','لِلنَّفْيِ','leyse gibi'],['لَا','mala','لِلنَّفْيِ','leyse gibi (ismi nekre)'],
 ['أَنْ','nasb','لِلْمَصْدَرِيَّةِ','masdariyye'],['لَنْ','nasb','لِلنَّفْيِ الْمُؤَكَّدِ فِي الِاسْتِقْبَالِ','te’kîdli nefy'],['كَيْ','nasb','لِلسَّبَبِيَّةِ','sebebiyye'],['إِذَنْ','nasb','لِلشَّرْطِ وَالْجَزَاءِ','şart-cezâ'],
 ['لَمْ','cazm','لِنَفْيِ الْمَاضِي','tek fiil'],['لَمَّا','cazm','لِنَفْيِ الْمَاضِي','tek fiil'],['لَامُ الْأَمْرِ','cazm','لِلطَّلَبِ','tek fiil'],['لَا النَّهْيِ','cazm','لِلطَّلَبِ','tek fiil'],['إِنْ','cazm','لِلشَّرْطِ وَالْجَزَاءِ','iki fiil'],
 ['حَيْثُمَا','cazm','لِلْمَكَانِ','iki fiil'],['أَيْنَ','cazm','لِلْمَكَانِ','iki fiil'],['أَنَّى','cazm','لِلْمَكَانِ','iki fiil'],['إِذْمَا','cazm','لِلزَّمَانِ','iki fiil'],['إِذَا مَا','cazm','لِلزَّمَانِ','iki fiil'],['مَتَى','cazm','لِلزَّمَانِ','iki fiil'],
 ['مَهْمَا','cazm','—','iki fiil'],['مَا','cazm','—','iki fiil'],['مَنْ','cazm','—','iki fiil'],['أَيٌّ','cazm','—','iki fiil'],
 ['الْفِعْلُ','kiy','مُطْلَقًا','lâzım ve müteaddî'],['اسْمُ الْفَاعِلِ','kiy','عَمَلَ فِعْلِهِ الْمَعْلُومِ','malûm fiili gibi'],['اسْمُ الْمَفْعُولِ','kiy','عَمَلَ فِعْلِهِ الْمَجْهُولِ','meçhul fiili gibi'],['الصِّفَةُ الْمُشَبَّهَةُ','kiy','عَمَلَ فِعْلِهَا','fiili gibi'],['اسْمُ التَّفْضِيلِ','kiy','مَسْأَلَةُ الْكُحْلِ','zâhir fâili ancak Kuhl meselesinde'],
 ['الْمَصْدَرُ','kiy','عَمَلَ فِعْلِهِ','fiili gibi'],['الِاسْمُ الْمُضَافُ','kiy','الْجَرَّ','cer'],['الِاسْمُ الْمُبْهَمُ التَّامُّ','kiy','نَصْبَ التَّمْيِيزِ','temyizi nasb'],['مَعْنَى الْفِعْلِ','kiy','أَسْمَاءُ الْأَفْعَالِ وَغَيْرُهَا','esmâ-i ef‘âl, zarf-ı müstekar…'],
 ['التَّجْرِيدُ','man','رَافِعُ الْمُبْتَدَإِ وَالْخَبَرِ','mübtedâ ve haberi ref‘ eder'],['وُقُوعُ الْمُضَارِعِ مَوْقِعَ الِاسْمِ','man','رَافِعُ الْمُضَارِعِ','muzâriyi ref‘ eder']
];
/* ---- 30 ma‘mûl ---- [türkçe, arapça, grup, ders] */
const MG={raf:['Merfûlar','الْمَرْفُوعَاتُ',9],nasb:['Mansûblar','الْمَنْصُوبَاتُ',13],jarr:['Mecrûrlar','الْمَجْرُورَاتُ',2],jazm:['Meczûm','الْمَجْزُومُ',1],tabi:['Tâbiler','التَّوَابِعُ',5]};
const MAMULS=[
 ['Fâil','الْفَاعِلُ','raf','l24'],['Nâib-i fâil','نَائِبُ الْفَاعِلِ','raf','l24'],['Mübtedâ','الْمُبْتَدَأُ','raf','l26'],['Mübtedânın haberi','خَبَرُ الْمُبْتَدَإِ','raf','l26'],['Kâne bâbının ismi','اسْمُ بَابِ كَانَ','raf','l26'],
 ['İnne bâbının haberi','خَبَرُ بَابِ إِنَّ','raf','l26'],['Lâ-yı nefy-i cinsin haberi','خَبَرُ لَا لِنَفْيِ الْجِنْسِ','raf','l26'],['Mâ ve lâ’nın ismi','اسْمُ مَا وَلَا','raf','l26'],['Merfû muzâri','الْمُضَارِعُ الْخَالِي عَنِ النَّوَاصِبِ وَالْجَوَازِمِ','raf','l26'],
 ['Mef‘ûl mutlak','الْمَفْعُولُ الْمُطْلَقُ','nasb','l27'],['Mef‘ûl bih','الْمَفْعُولُ بِهِ','nasb','l27'],['Mef‘ûl fîh','الْمَفْعُولُ فِيهِ','nasb','l27'],['Mef‘ûl leh','الْمَفْعُولُ لَهُ','nasb','l27'],['Mef‘ûl maah','الْمَفْعُولُ مَعَهُ','nasb','l27'],
 ['Hâl','الْحَالُ','nasb','l28'],['Temyiz','التَّمْيِيزُ','nasb','l28'],['Müstesnâ','الْمُسْتَثْنَى','nasb','l28'],['Kâne bâbının haberi','خَبَرُ بَابِ كَانَ','nasb','l29'],['İnne bâbının ismi','اسْمُ بَابِ إِنَّ','nasb','l29'],
 ['Lâ-yı nefy-i cinsin ismi','اسْمُ لَا لِنَفْيِ الْجِنْسِ','nasb','l29'],['Mâ ve lâ’nın haberi','خَبَرُ مَا وَلَا','nasb','l29'],['Mansûb muzâri','الْمُضَارِعُ الدَّاخِلُ عَلَيْهِ النَّاصِبُ','nasb','l29'],
 ['Harf-i cerle mecrûr','الْمَجْرُورُ بِحَرْفِ الْجَرِّ','jarr','l30'],['İzâfetle mecrûr','الْمَجْرُورُ بِالْإِضَافَةِ','jarr','l30'],['Meczûm muzâri','الْمُضَارِعُ الْمَجْزُومُ','jazm','l30'],
 ['Sıfat','الصِّفَةُ','tabi','l31'],['Harfle atf','الْعَطْفُ بِالْحُرُوفِ','tabi','l31'],['Te’kîd','التَّأْكِيدُ','tabi','l32'],['Bedel','الْبَدَلُ','tabi','l32'],['Atf-ı beyân','عَطْفُ الْبَيَانِ','tabi','l32']
];
/* ---- Ta‘rîfât (kart destesi için) ---- [terim, arapça tarif, türkçe] */
const TERMS=[
 ['الْكَلِمَةُ','اللَّفْظُ الْمَوْضُوعُ لِمَعْنًى مُفْرَدٍ','Tek mânâ için konmuş lafız'],['الْفِعْلُ','مَا دَلَّ بِهَيْئَتِهِ وَضْعًا عَلَى أَحَدِ الْأَزْمِنَةِ الثَّلَاثَةِ','Kalıbıyla üç zamandan birine delâlet eden'],
 ['الِاسْمُ','مَا دَلَّ عَلَى مَعْنًى مُسْتَقِلٍّ بِالْفَهْمِ غَيْرِ مُقْتَرِنٍ فِيهِ بِأَحَدِ الْأَزْمِنَةِ الثَّلَاثَةِ','Kendi başına anlaşılan, zamansız mânâ'],['الْحَرْفُ','مَا دَلَّ عَلَى مَعْنًى غَيْرِ مُسْتَقِلٍّ بِالْفَهْمِ، بَلْ آلَةٌ لِفَهْمِ غَيْرِهِ','Başkasını anlamaya alet olan'],
 ['الْعَامِلُ','مَا أَوْجَبَ بِوَاسِطَةٍ كَوْنَ آخِرِ الْكَلِمَةِ عَلَى وَجْهٍ مَخْصُوصٍ مِنَ الْإِعْرَابِ','Vâsıta ile kelime sonunda belirli i‘râbı gerektiren'],['اللَّفْظِيُّ','مَا يَكُونُ لِلِّسَانِ فِيهِ حَظٌّ','Telaffuzda payı olan âmil'],
 ['الْمَعْنَوِيُّ','مَا لَا يَكُونُ لِلِّسَانِ فِيهِ حَظٌّ، وَإِنَّمَا هُوَ مَعْنًى يُعْرَفُ بِالْقَلْبِ','Kalple bilinen âmil'],['السَّمَاعِيُّ','الَّذِي يَتَوَقَّفُ إِعْمَالُهُ عَلَى السَّمَاعِ','Amel etmesi işitmeye bağlı'],
 ['الْقِيَاسِيُّ','مَا يُمْكِنُ أَنْ يُذْكَرَ فِي عَمَلِهِ قَاعِدَةٌ كُلِّيَّةٌ','Amelinde küllî kaide söylenebilen'],['الْفِعْلُ اللَّازِمُ','مَا يَتِمُّ فَهْمُهُ بِغَيْرِ مَا وَقَعَ عَلَيْهِ الْفِعْلُ','Mef‘ûlsüz anlaşılan fiil'],
 ['الْفِعْلُ الْمُتَعَدِّي','مَا لَا يَتِمُّ فَهْمُهُ بِغَيْرِ مَا وَقَعَ عَلَيْهِ الْفِعْلُ','Mef‘ûlsüz anlaşılmayan fiil'],['الْفَاعِلُ','مَا أُسْنِدَ إِلَيْهِ الْفِعْلُ التَّامُّ الْمَعْلُومُ أَوْ مَا بِمَعْنَاهُ','Tam malûm fiilin isnad edildiği'],
 ['الْمُبْتَدَأُ','الِاسْمُ أَوِ الْمُؤَوَّلُ بِهِ الْمُسْنَدُ إِلَيْهِ الْمُجَرَّدُ عَنِ الْعَوَامِلِ اللَّفْظِيَّةِ','Lafzî âmillerden soyulmuş müsnedün ileyh'],['الْمَفْعُولُ الْمُطْلَقُ','اسْمُ مَا فَعَلَهُ فَاعِلُ عَامِلٍ مَذْكُورٍ','Fâilin yaptığı işin ismi'],
 ['الْمَفْعُولُ بِهِ','اسْمُ مَا وَقَعَ عَلَيْهِ فِعْلُ الْفَاعِلِ','Fiilin üzerine vâki olduğu'],['الْمَفْعُولُ فِيهِ','اسْمُ مَا فُعِلَ فِيهِ مَضْمُونُ عَامِلِهِ مِنْ زَمَانٍ أَوْ مَكَانٍ','İşin yapıldığı zaman/mekân'],
 ['الْمَفْعُولُ لَهُ','اسْمُ مَا فُعِلَ لِأَجْلِهِ مَضْمُونُ عَامِلِهِ','İşin sebebi'],['الْمَفْعُولُ مَعَهُ','الْمَذْكُورُ بَعْدَ الْوَاوِ لِمُصَاحَبَةِ مَعْمُولِ عَامِلٍ','Beraberlik vav’ından sonraki'],
 ['الْحَالُ','مَا يُبَيِّنُ هَيْئَةَ الْفَاعِلِ أَوِ الْمَفْعُولِ بِهِ','Fâil/mef‘ûlün heyetini açıklayan'],['التَّمْيِيزُ','مَا يَرْفَعُ الْإِبْهَامَ عَنْ ذَاتٍ مَذْكُورَةٍ أَوْ مُقَدَّرَةٍ','Belirsizliği gideren'],
 ['الصِّفَةُ','تَابِعٌ يَدُلُّ عَلَى مَعْنًى فِي مَتْبُوعِهِ مُطْلَقًا','Metbûundaki mânâya delâlet eden tâbi'],['الْبَدَلُ','الْمَقْصُودُ بِالنِّسْبَةِ دُونَ مَتْبُوعِهِ','Nispette asıl kastedilen'],
 ['عَطْفُ الْبَيَانِ','تَابِعٌ جِيءَ بِهِ لِإِيضَاحِ مَتْبُوعِهِ وَلَا يَدُلُّ عَلَى مَعْنًى فِيهِ','Metbûunu açıklayan tâbi'],['الْإِعْرَابُ','شَيْءٌ جَاءَ مِنَ الْعَامِلِ يَخْتَلِفُ بِهِ آخِرُ الْمُعْرَبِ','Âmilden gelip sonu değiştiren'],
 ['الْمُنْصَرِفُ','مَا دَخَلَهُ الْجَرُّ وَالتَّنْوِينُ','Cer ve tenvîn alan'],['التَّقْدِيرِيُّ','مَا لَا يَظْهَرُ فِي اللَّفْظِ بَلْ يُقَدَّرُ فِي آخِرِهِ لِمَانِعٍ','Engel yüzünden takdir edilen i‘râb'],
 ['الْمَبْنِيُّ','مَا كَانَ حَرَكَتُهُ وَسُكُونُهُ لَا بِعَامِلٍ','Harekesi âmilden olmayan'],['الْمَعْرِفَةُ','مَا وُضِعَ لِشَيْءٍ بِعَيْنِهِ','Belirli şey için konan'],['النَّكِرَةُ','مَا وُضِعَ لِشَيْءٍ لَا بِعَيْنِهِ','Belirsiz şey için konan']
];
