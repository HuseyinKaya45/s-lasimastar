/* ===================== EMSİLE MOTORU =====================
   Şablonlarda F, A, L kökün fâ, ayn ve lâm harflerinin yeridir. Aynı şablon
   ف ع ل ile doldurulunca kelimenin mîzanı (vezni) çıkar. */
const V = {a:"َ", u:"ُ", i:"ِ", o:"ْ", sh:"ّ", an:"ً", un:"ٌ", in:"ٍ"};
const MARKS = /[ً-ْٰ]/;

/* ---- sülâsî mücerred bâbları: mz = mâzide aynın harekesi, mu = muzâride aynın harekesi ---- */
const BABS = [
 {id:1, mz:"a", mu:"u", ar:"نَصَرَ يَنْصُرُ", tr:"Nasara bâbı", vz:"فَعَلَ يَفْعُلُ", note:"Mâzide aynü'l-fiil üstün, muzâride ötre. En kalabalık bâblardandır."},
 {id:2, mz:"a", mu:"i", ar:"ضَرَبَ يَضْرِبُ", tr:"Daraba bâbı", vz:"فَعَلَ يَفْعِلُ", note:"Mâzide üstün, muzâride esre."},
 {id:3, mz:"a", mu:"a", ar:"فَتَحَ يَفْتَحُ", tr:"Fataha bâbı", vz:"فَعَلَ يَفْعَلُ", note:"İki tarafta da üstün. Ayn veya lâmında çoğunlukla boğaz harfi (ء ه ع ح غ خ) bulunur."},
 {id:4, mz:"i", mu:"a", ar:"عَلِمَ يَعْلَمُ", tr:"Alime bâbı", vz:"فَعِلَ يَفْعَلُ", note:"Mâzide esre, muzâride üstün. Duygu, hâl ve bilgi bildiren fiiller çoktur."},
 {id:5, mz:"i", mu:"i", ar:"حَسِبَ يَحْسِبُ", tr:"Hasibe bâbı", vz:"فَعِلَ يَفْعِلُ", note:"İki tarafta da esre. Sâlim fiili çok azdır."},
 {id:6, mz:"u", mu:"u", ar:"كَرُمَ يَكْرُمُ", tr:"Kerume bâbı", vz:"فَعُلَ يَفْعُلُ", note:"İki tarafta da ötre. Fiilleri hep lâzımdır (geçişsiz); kalıcı vasıf bildirir."}
];

/* ---- hazır kökler: r kök, b bâb, ms masdar (semâîdir), tr anlam, lz lâzım (geçişsiz), sf sıfat (Kerume) ---- */
const ROOTS = [
 {r:"نصر", b:1, ms:"نَصْرًا", tr:"yardım etmek"},
 {r:"كتب", b:1, ms:"كِتَابَةً", tr:"yazmak"},
 {r:"قتل", b:1, ms:"قَتْلًا", tr:"öldürmek"},
 {r:"شكر", b:1, ms:"شُكْرًا", tr:"şükretmek"},
 {r:"طلب", b:1, ms:"طَلَبًا", tr:"istemek"},
 {r:"ترك", b:1, ms:"تَرْكًا", tr:"terk etmek"},
 {r:"خرج", b:1, ms:"خُرُوجًا", tr:"çıkmak", lz:true},
 {r:"سجد", b:1, ms:"سُجُودًا", tr:"secde etmek", lz:true},
 {r:"دخل", b:1, ms:"دُخُولًا", tr:"girmek"},
 {r:"ضرب", b:2, ms:"ضَرْبًا", tr:"vurmak"},
 {r:"غفر", b:2, ms:"مَغْفِرَةً", tr:"bağışlamak"},
 {r:"حمل", b:2, ms:"حَمْلًا", tr:"taşımak"},
 {r:"كسب", b:2, ms:"كَسْبًا", tr:"kazanmak"},
 {r:"عرف", b:2, ms:"مَعْرِفَةً", tr:"tanımak"},
 {r:"جلس", b:2, ms:"جُلُوسًا", tr:"oturmak", lz:true},
 {r:"نزل", b:2, ms:"نُزُولًا", tr:"inmek", lz:true},
 {r:"فتح", b:3, ms:"فَتْحًا", tr:"açmak"},
 {r:"جمع", b:3, ms:"جَمْعًا", tr:"toplamak"},
 {r:"منع", b:3, ms:"مَنْعًا", tr:"engellemek"},
 {r:"نفع", b:3, ms:"نَفْعًا", tr:"fayda vermek"},
 {r:"شرح", b:3, ms:"شَرْحًا", tr:"açıklamak"},
 {r:"رفع", b:3, ms:"رَفْعًا", tr:"yükseltmek"},
 {r:"ذهب", b:3, ms:"ذَهَابًا", tr:"gitmek", lz:true},
 {r:"علم", b:4, ms:"عِلْمًا", tr:"bilmek"},
 {r:"شرب", b:4, ms:"شُرْبًا", tr:"içmek"},
 {r:"حفظ", b:4, ms:"حِفْظًا", tr:"ezberlemek, korumak"},
 {r:"فهم", b:4, ms:"فَهْمًا", tr:"anlamak"},
 {r:"عمل", b:4, ms:"عَمَلًا", tr:"çalışmak, yapmak"},
 {r:"ركب", b:4, ms:"رُكُوبًا", tr:"binmek"},
 {r:"فرح", b:4, ms:"فَرَحًا", tr:"sevinmek", lz:true},
 {r:"لعب", b:4, ms:"لَعِبًا", tr:"oynamak", lz:true},
 {r:"حسب", b:5, ms:"حِسْبَانًا", tr:"sanmak"},
 {r:"نعم", b:5, ms:"نَعِيمًا", tr:"bolluk içinde olmak", lz:true},
 {r:"كرم", b:6, ms:"كَرَمًا", tr:"cömert olmak", lz:true, sf:"كَرِيمٌ"},
 {r:"حسن", b:6, ms:"حُسْنًا", tr:"güzel olmak", lz:true, sf:"حَسَنٌ"},
 {r:"شرف", b:6, ms:"شَرَفًا", tr:"şerefli olmak", lz:true, sf:"شَرِيفٌ"},
 {r:"صغر", b:6, ms:"صِغَرًا", tr:"küçük olmak", lz:true, sf:"صَغِيرٌ"},
 {r:"كبر", b:6, ms:"كِبَرًا", tr:"büyük olmak", lz:true, sf:"كَبِيرٌ"},
 {r:"بعد", b:6, ms:"بُعْدًا", tr:"uzak olmak", lz:true, sf:"بَعِيدٌ"},
 {r:"قرب", b:6, ms:"قُرْبًا", tr:"yakın olmak", lz:true, sf:"قَرِيبٌ"}
];

/* ---- 14 sîga ---- */
const SIGA = [
 {n:1, z:"هُوَ", p:"g", g:"m", c:1, tr:"Müfred müzekker gâib", k:"o (bir erkek)"},
 {n:2, z:"هُمَا", p:"g", g:"m", c:2, tr:"Tesniye müzekker gâib", k:"o ikisi (erkek)"},
 {n:3, z:"هُمْ", p:"g", g:"m", c:3, tr:"Cem' müzekker gâib", k:"onlar (erkekler)"},
 {n:4, z:"هِيَ", p:"g", g:"f", c:1, tr:"Müfred müennes gâibe", k:"o (bir kadın)"},
 {n:5, z:"هُمَا", p:"g", g:"f", c:2, tr:"Tesniye müennes gâibe", k:"o ikisi (kadın)"},
 {n:6, z:"هُنَّ", p:"g", g:"f", c:3, tr:"Cem' müennes gâibe", k:"onlar (kadınlar)"},
 {n:7, z:"أَنْتَ", p:"h", g:"m", c:1, tr:"Müfred müzekker muhatab", k:"sen (erkek)"},
 {n:8, z:"أَنْتُمَا", p:"h", g:"m", c:2, tr:"Tesniye müzekker muhatab", k:"siz ikiniz (erkek)"},
 {n:9, z:"أَنْتُمْ", p:"h", g:"m", c:3, tr:"Cem' müzekker muhatab", k:"siz (erkekler)"},
 {n:10, z:"أَنْتِ", p:"h", g:"f", c:1, tr:"Müfred müennes muhataba", k:"sen (kadın)"},
 {n:11, z:"أَنْتُمَا", p:"h", g:"f", c:2, tr:"Tesniye müennes muhataba", k:"siz ikiniz (kadın)"},
 {n:12, z:"أَنْتُنَّ", p:"h", g:"f", c:3, tr:"Cem' müennes muhataba", k:"siz (kadınlar)"},
 {n:13, z:"أَنَا", p:"m", g:"x", c:1, tr:"Mütekellim vahde", k:"ben"},
 {n:14, z:"نَحْنُ", p:"m", g:"x", c:3, tr:"Mütekellim maa'l-gayr", k:"biz"}
];
const PRE = ["يَ","يَ","يَ","تَ","تَ","يَ","تَ","تَ","تَ","تَ","تَ","تَ","أَ","نَ"];
const SUF = {
 mazi:  ["َ","َا","ُوا","َتْ","َتَا","ْنَ","ْتَ","ْتُمَا","ْتُمْ","ْتِ","ْتُمَا","ْتُنَّ","ْتُ","ْنَا"],
 raf:   ["ُ","َانِ","ُونَ","ُ","َانِ","ْنَ","ُ","َانِ","ُونَ","ِينَ","َانِ","ْنَ","ُ","ُ"],
 nasb:  ["َ","َا","ُوا","َ","َا","ْنَ","َ","َا","ُوا","ِي","َا","ْنَ","َ","َ"],
 jazm:  ["ْ","َا","ُوا","ْ","َا","ْنَ","ْ","َا","ُوا","ِي","َا","ْنَ","ْ","ْ"],
 nun:   ["َنَّ","َانِّ","ُنَّ","َنَّ","َانِّ","ْنَانِّ","َنَّ","َانِّ","ُنَّ","ِنَّ","َانِّ","ْنَانِّ","َنَّ","َنَّ"]
};
const babOf = id => BABS.find(b => b.id === id);
const mzStem = b => "F" + V.a + "A" + V[b.mz] + "L";
const mzStemP = () => "F" + V.u + "A" + V.i + "L";
const muStem = b => "F" + V.o + "A" + V[b.mu] + "L";
const muStemP = () => "F" + V.o + "A" + V.a + "L";
const pP = i => PRE[i].replace(V.a, V.u);
const hamz = b => b.mu === "u" ? "ا" + V.u : "ا" + V.i;

/* ---- Emsile-i Muttaride tabloları ---- */
const TABLES = [
 {id:"mazi", ar:"الْمَاضِي الْمَعْلُومُ", tr:"Mâzi-i ma'lûm", d:"Geçmiş zaman, etken.", f:(b,i)=> mzStem(b) + SUF.mazi[i]},
 {id:"maziP", ar:"الْمَاضِي الْمَجْهُولُ", tr:"Mâzi-i meçhûl", d:"Geçmiş zaman, edilgen: fâ ötre, ayn esre.", pas:true, f:(b,i)=> mzStemP() + SUF.mazi[i]},
 {id:"muz", ar:"الْمُضَارِعُ الْمَعْلُومُ", tr:"Muzâri-i ma'lûm", d:"Şimdiki/gelecek zaman, etken. Başta 'eteyne' (أ ت ي ن) harflerinden biri bulunur.", f:(b,i)=> PRE[i] + muStem(b) + SUF.raf[i]},
 {id:"muzP", ar:"الْمُضَارِعُ الْمَجْهُولُ", tr:"Muzâri-i meçhûl", d:"Muzâri harfi ötre, ayn üstün olur.", pas:true, f:(b,i)=> pP(i) + muStemP() + SUF.raf[i]},
 {id:"len", ar:"الْمَنْصُوبُ بِلَنْ", tr:"Te'kîd-i nefy-i istikbâl (len)", d:"Len muzâriyi nasb eder; nûnlar düşer (cem'-i müennes hariç).", f:(b,i)=> "لَنْ " + PRE[i] + muStem(b) + SUF.nasb[i]},
 {id:"lem", ar:"الْمَجْزُومُ بِلَمْ", tr:"Cahd-ı mutlak (lem)", d:"Lem muzâriyi cezm eder ve manasını geçmişe çevirir.", f:(b,i)=> "لَمْ " + PRE[i] + muStem(b) + SUF.jazm[i]},
 {id:"emr", ar:"الْأَمْرُ الْحَاضِرُ", tr:"Emr-i hâzır", d:"Muhatab muzâriden yapılır: muzâri harfi atılır, sükûnla başlayınca başa vasıl hemzesi gelir.", only:[6,7,8,9,10,11], f:(b,i)=> hamz(b) + muStem(b) + SUF.jazm[i]},
 {id:"gaib", ar:"الْأَمْرُ الْغَائِبُ", tr:"Emr-i gâib", d:"Başına emir lâmı (لِـ) gelir ve cezm eder: o …sın.", only:[0,1,2,3,4,5,12,13], f:(b,i)=> "لِ" + PRE[i] + muStem(b) + SUF.jazm[i]},
 {id:"nehy", ar:"النَّهْيُ", tr:"Nehy", d:"Lâ-yı nâhiye cezm eder: …me!", f:(b,i)=> "لَا " + PRE[i] + muStem(b) + SUF.jazm[i]},
 {id:"nun", ar:"الْمُؤَكَّدُ بِالنُّونِ الثَّقِيلَةِ", tr:"Te'kîd (nûn-ı sakîle)", d:"Başında te'kîd lâmı, sonunda şeddeli nûn: mutlaka …ecek.", f:(b,i)=> "لَ" + PRE[i] + muStem(b) + SUF.nun[i]}
];
const FAIL = ["FَاAِLٌ","FَاAِLَانِ","FَاAِLُونَ","FُAَّLٌ","FُAَّاLٌ","FَAَLَةٌ","FَاAِLَةٌ","FَاAِLَتَانِ","FَاAِLَاتٌ","FَوَاAِLُ"];
const FAIL_TR = ["Müfred müzekker","Tesniye müzekker","Cem'-i müzekker sâlim","Cem'-i teksîr (فُعَّلٌ)","Cem'-i teksîr (فُعَّالٌ)","Cem'-i teksîr (فَعَلَةٌ)","Müfred müennes","Tesniye müennes","Cem'-i müennes sâlim","Cem'-i teksîr (فَوَاعِلُ)"];
const MEF = ["مَFْAُوLٌ","مَFْAُوLَانِ","مَFْAُوLُونَ","مَFَاAِيLُ","مَFْAُوLَةٌ","مَFْAُوLَتَانِ","مَFْAُوLَاتٌ"];
const MEF_TR = ["Müfred müzekker","Tesniye müzekker","Cem'-i müzekker sâlim","Cem'-i teksîr","Müfred müennes","Tesniye müennes","Cem'-i müennes sâlim"];

/* ---- Emsile-i Muhtelife: 24 sîga, ezber sırasıyla (g = genel Türkçe mânâ kalıbı) ---- */
const MUH = [
 {id:"mazi", ar:"الْفِعْلُ الْمَاضِي", tr:"Fiil-i mâzî", g:"Yaptı", d:"Geçmiş zaman fiili.", t:b=> mzStem(b) + V.a, p:()=> mzStemP() + V.a},
 {id:"muz", ar:"الْفِعْلُ الْمُضَارِعُ", tr:"Fiil-i muzâri", g:"Yapar / yapıyor / yapacak", d:"Geniş, şimdiki ve gelecek zaman fiili; başında eteyne (أ ت ي ن) harflerinden biri bulunur.", t:b=> "يَ" + muStem(b) + V.u, p:()=> "يُ" + muStemP() + V.u},
 {id:"masdar", ar:"الْمَصْدَرُ غَيْرُ الْمِيمِيِّ", tr:"Masdar-ı gayr-i mîmî", g:"Yapmak", d:"Fiilin ismi; başında mîm olmayan masdar. Sülâsîde semâîdir, yani kalıbı her fiil için ayrıca öğrenilir.", masdar:true},
 {id:"fail", ar:"اسْمُ الْفَاعِلِ", tr:"İsm-i fâil", g:"Yapan", d:"İşi yapanı bildiren isim: فَاعِلٌ.", t:()=> "FَاAِLٌ"},
 {id:"mef", ar:"اسْمُ الْمَفْعُولِ", tr:"İsm-i mef'ûl", g:"Yapılan", d:"İşin yapıldığı kimseyi/şeyi bildiren isim: مَفْعُولٌ.", t:()=> "مَFْAُوLٌ"},
 {id:"lem", ar:"الْجَحْدُ الْمُطْلَقُ", tr:"Fiil-i muzâri cahd-i mutlak", g:"Yapmadı", d:"Lem, muzâriyi cezm eder ve manasını olumsuz geçmişe çevirir.", t:b=> "لَمْ يَ" + muStem(b) + V.o, p:()=> "لَمْ يُ" + muStemP() + V.o},
 {id:"lemma", ar:"الْجَحْدُ الْمُسْتَغْرَقُ", tr:"Fiil-i muzâri cahd-i müstağrak", g:"Henüz yapmadı", d:"Lemmâ: olumsuzluk konuşma anına kadar uzanır, 'henüz'.", t:b=> "لَمَّا يَ" + muStem(b) + V.o, p:()=> "لَمَّا يُ" + muStemP() + V.o},
 {id:"nhal", ar:"نَفْيُ الْحَالِ", tr:"Fiil-i muzâri nefy-i hâl", g:"Yapmıyor", d:"Mâ + muzâri: şimdiki zamanın olumsuzu.", t:b=> "مَا يَ" + muStem(b) + V.u, p:()=> "مَا يُ" + muStemP() + V.u},
 {id:"nist", ar:"نَفْيُ الِاسْتِقْبَالِ", tr:"Fiil-i muzâri nefy-i istikbâl", g:"Yapmayacak", d:"Lâ + muzâri: geleceğin olumsuzu.", t:b=> "لَا يَ" + muStem(b) + V.u, p:()=> "لَا يُ" + muStemP() + V.u},
 {id:"len", ar:"تَأْكِيدُ نَفْيِ الِاسْتِقْبَالِ", tr:"Fiil-i muzâri te'kîd-i nefy-i istikbâl", g:"Asla yapmayacak", d:"Len muzâriyi nasb eder: geleceğin kesin olumsuzu.", t:b=> "لَنْ يَ" + muStem(b) + V.a, p:()=> "لَنْ يُ" + muStemP() + V.a},
 {id:"gaib", ar:"الْأَمْرُ الْغَائِبُ", tr:"Emr-i gâib", g:"Yapsın", d:"Emir lâmı (لِـ) gâib muzâriyi cezm eder.", t:b=> "لِيَ" + muStem(b) + V.o, p:()=> "لِيُ" + muStemP() + V.o},
 {id:"nehyG", ar:"النَّهْيُ الْغَائِبُ", tr:"Nehy-i gâib", g:"Yapmasın", d:"Lâ-yı nâhiye gâib muzâriyi cezm eder.", t:b=> "لَا يَ" + muStem(b) + V.o, p:()=> "لَا يُ" + muStemP() + V.o},
 {id:"emr", ar:"الْأَمْرُ الْحَاضِرُ", tr:"Emr-i hâzır", g:"Yap", d:"Muhatab muzâriden yapılır: muzâri harfi atılır, başa vasıl hemzesi gelir (ayn ötreliyse اُ, değilse اِ).", t:b=> hamz(b) + muStem(b) + V.o},
 {id:"nehyH", ar:"النَّهْيُ الْحَاضِرُ", tr:"Nehy-i hâzır", g:"Yapma", d:"Lâ-yı nâhiye muhatab muzâriyi cezm eder.", t:b=> "لَا تَ" + muStem(b) + V.o, p:()=> "لَا تُ" + muStemP() + V.o},
 {id:"zarf", ar:"اسْمُ الزَّمَانِ وَالْمَكَانِ وَالْمَصْدَرُ الْمِيمِيُّ", tr:"İsm-i zaman · İsm-i mekân · Masdar-ı mîmî", g:"Yapma zamanı · Yapma mekânı · Yapmak", d:"Aynı kalıp üç mana taşır. Muzâride ayn esre olan bâbda ism-i zaman ve mekân مَفْعِلٌ olur (مَضْرِبٌ), diğerlerinde مَفْعَلٌ.", t:b=> "مَFْA" + (b.mu==="i" ? V.i : V.a) + "Lٌ"},
 {id:"alet", ar:"اسْمُ الْآلَةِ", tr:"İsm-i âlet", g:"Yapma aleti", d:"İşin yapıldığı araç: مِفْعَلٌ.", t:()=> "مِFْAَLٌ"},
 {id:"merre", ar:"الْمَصْدَرُ بِنَاءُ الْمَرَّةِ", tr:"Masdar binâ-i merre", g:"Bir kere yapmak", d:"İşin bir kere yapıldığını bildirir: فَعْلَةً.", t:()=> "FَAْLَةً"},
 {id:"nev", ar:"الْمَصْدَرُ بِنَاءُ النَّوْعِ", tr:"Masdar binâ-i nev'i", g:"Bir nevi yapmak", d:"İşin yapılış tarzını bildirir: فِعْلَةً.", t:()=> "FِAْLَةً"},
 {id:"tasgir", ar:"اسْمُ التَّصْغِيرِ", tr:"İsm-i tasğîr", g:"Küçük bir yapış", d:"Küçültme ismi: فُعَيْلٌ.", t:()=> "FُAَيْLٌ"},
 {id:"mensub", ar:"الِاسْمُ الْمَنْسُوبُ", tr:"İsm-i mensûb", g:"Yapmaya mensup", d:"Nisbet yâsı (ـِيٌّ) ile yapılır: فَعْلِيٌّ.", t:()=> "FَAْLِيٌّ"},
 {id:"mubalaga", ar:"مُبَالَغَةُ اسْمِ الْفَاعِلِ", tr:"Mübâlağa-i ism-i fâil", g:"Çok yapan", d:"İşi çokça yapanı bildirir: فَعَّالٌ.", t:()=> "FَAَّاLٌ"},
 {id:"tafdil", ar:"اسْمُ التَّفْضِيلِ", tr:"İsm-i tafdîl", g:"En (daha) çok yapan", d:"Üstünlük bildiren isim: أَفْعَلُ.", t:()=> "أَFْAَLُ"},
 {id:"tac1", ar:"فِعْلُ التَّعَجُّبِ الْأَوَّلُ", tr:"Fiil-i taaccüb-i evvel", g:"Acaip yaptı", d:"Birinci taaccüb kalıbı: مَا أَفْعَلَهُ.", t:()=> "مَا أَFْAَLَهُ"},
 {id:"tac2", ar:"فِعْلُ التَّعَجُّبِ الثَّانِي", tr:"Fiil-i taaccüb-i sânî", g:"Ne acaip yaptı", d:"İkinci taaccüb kalıbı: أَفْعِلْ بِهِ.", t:()=> "أَFْAِLْ بِهِ"}
];
const NASR_TR = {mazi:"Yardım etti", muz:"Yardım eder / ediyor / edecek", masdar:"Yardım etmek", fail:"Yardım eden", mef:"Yardım edilen", lem:"Yardım etmedi", lemma:"Henüz yardım etmedi", nhal:"Yardım etmiyor", nist:"Yardım etmeyecek", len:"Asla yardım etmeyecek", gaib:"Yardım etsin", nehyG:"Yardım etmesin", emr:"Yardım et", nehyH:"Yardım etme", zarf:"Yardım etme zamanı · Yardım etme mekânı · Yardım etmek", alet:"Yardım etme aleti", merre:"Bir kere yardım etmek", nev:"Bir nevi yardım etmek", tasgir:"Küçük bir yardım", mensub:"Yardım etmeye mensup", mubalaga:"Çok yardım eden", tafdil:"En (/daha) çok yardım eden", tac1:"Acaip yardım etti", tac2:"Ne acaip yardım etti"};

/* ---- mezîd bâblar ---- */
const MAZID = [
 {id:"ifal", ar:"الْإِفْعَالُ", tr:"İf'âl", vz:"أَفْعَلَ يُفْعِلُ إِفْعَالًا", m:"Ta'diye: geçişsiz fiili geçişli yapar (خَرَجَ çıktı → أَخْرَجَ çıkardı).", roots:["كرم","خرج","نزل","سلم"],
  f:{mazi:"أَFْAَLَ", muz:"يُFْAِLُ", masdar:"إِFْAَاLًا", fail:"مُFْAِLٌ", mef:"مُFْAَLٌ", emr:"أَFْAِLْ"}},
 {id:"tafil", ar:"التَّفْعِيلُ", tr:"Tef'îl", vz:"فَعَّلَ يُفَعِّلُ تَفْعِيلًا", m:"Teksîr ve ta'diye: çokluk, tekrar ya da geçişlilik (عَلِمَ bildi → عَلَّمَ öğretti).", roots:["علم","صرف","كسر","قدم"],
  f:{mazi:"FَAَّLَ", muz:"يُFَAِّLُ", masdar:"تَFْAِيLًا", fail:"مُFَAِّLٌ", mef:"مُFَAَّLٌ", emr:"FَAِّLْ"}},
 {id:"mufaala", ar:"الْمُفَاعَلَةُ", tr:"Mufâale", vz:"فَاعَلَ يُفَاعِلُ مُفَاعَلَةً", m:"Müşâreket: iki taraflı iş (قَتَلَ öldürdü → قَاتَلَ savaştı).", roots:["قتل","كتب","سفر","جهد"],
  f:{mazi:"FَاAَLَ", muz:"يُFَاAِLُ", masdar:"مُFَاAَLَةً", fail:"مُFَاAِLٌ", mef:"مُFَاAَLٌ", emr:"FَاAِLْ"}},
 {id:"iftial", ar:"الِافْتِعَالُ", tr:"İftiâl", vz:"اِفْتَعَلَ يَفْتَعِلُ اِفْتِعَالًا", m:"Mutâvaat ve ittihâz: kendisi için yapma, edinme (جَمَعَ topladı → اِجْتَمَعَ toplandı).", roots:["جمع","جنب","كسب","فتح"],
  f:{mazi:"اِFْتَAَLَ", muz:"يَFْتَAِLُ", masdar:"اِFْتِAَاLًا", fail:"مُFْتَAِLٌ", mef:"مُFْتَAَLٌ", emr:"اِFْتَAِLْ"}},
 {id:"infial", ar:"الِانْفِعَالُ", tr:"İnfiâl", vz:"اِنْفَعَلَ يَنْفَعِلُ اِنْفِعَالًا", m:"Mutâvaat: etkiyi kabul etme, edilgenlik (كَسَرَ kırdı → اِنْكَسَرَ kırıldı). Lâzımdır.", roots:["كسر","قطع","فتح","صرف"], lz:true,
  f:{mazi:"اِنْFَAَLَ", muz:"يَنْFَAِLُ", masdar:"اِنْFِAَاLًا", fail:"مُنْFَAِLٌ", emr:"اِنْFَAِLْ"}},
 {id:"tafaul2", ar:"التَّفَعُّلُ", tr:"Tefe''ul", vz:"تَفَعَّلَ يَتَفَعَّلُ تَفَعُّلًا", m:"Tef'îlin mutâvaatı ve tekellüf: zorlanarak yapma (عَلَّمَ öğretti → تَعَلَّمَ öğrendi).", roots:["علم","كلم","كسر","قدم"],
  f:{mazi:"تَFَAَّLَ", muz:"يَتَFَAَّLُ", masdar:"تَFَAُّLًا", fail:"مُتَFَAِّLٌ", mef:"مُتَFَAَّLٌ", emr:"تَFَAَّLْ"}},
 {id:"tafaul", ar:"التَّفَاعُلُ", tr:"Tefâul", vz:"تَفَاعَلَ يَتَفَاعَلُ تَفَاعُلًا", m:"Müşâreket ve tezâhür: karşılıklı yapma ya da yapar gibi görünme (تَبَاعَدَ birbirinden uzaklaştı).", roots:["بعد","قتل","كتب","شرك"],
  f:{mazi:"تَFَاAَLَ", muz:"يَتَFَاAَLُ", masdar:"تَFَاAُLًا", fail:"مُتَFَاAِLٌ", mef:"مُتَFَاAَLٌ", emr:"تَFَاAَLْ"}},
 {id:"istifal", ar:"الِاسْتِفْعَالُ", tr:"İstif'âl", vz:"اِسْتَفْعَلَ يَسْتَفْعِلُ اِسْتِفْعَالًا", m:"Taleb: bir şeyi isteme (غَفَرَ bağışladı → اِسْتَغْفَرَ bağışlanma diledi).", roots:["غفر","خرج","عمل","حسن"],
  f:{mazi:"اِسْتَFْAَLَ", muz:"يَسْتَFْAِLُ", masdar:"اِسْتِFْAَاLًا", fail:"مُسْتَFْAِLٌ", mef:"مُسْتَFْAَLٌ", emr:"اِسْتَFْAِLْ"}},
 {id:"ifilal", ar:"الِافْعِلَالُ", tr:"İf'ilâl", vz:"اِفْعَلَّ يَفْعَلُّ اِفْعِلَالًا", m:"Renk ve ayıp: o renge girme (اِحْمَرَّ kızardı). Lâzımdır.", roots:["حمر","صفر","خضر","زرق"], lz:true,
  f:{mazi:"اِFْAَLَّ", muz:"يَFْAَLُّ", masdar:"اِFْAِLَاLًا", fail:"مُFْAَLٌّ", emr:"اِFْAَLَّ"}}
];
const MZ_TR = {mazi:"Mâzi", muz:"Muzâri", masdar:"Masdar", fail:"İsm-i fâil", mef:"İsm-i mef'ûl", emr:"Emir"};
const MZ_MEAN_BY = {ifal:{كرم:"ikram etti",خرج:"çıkardı",نزل:"indirdi",سلم:"Müslüman oldu"}, tafil:{علم:"öğretti",صرف:"evirip çevirdi",كسر:"paramparça etti",قدم:"öne sürdü"}, mufaala:{قتل:"savaştı",كتب:"yazıştı",سفر:"yolculuk etti",جهد:"cihad etti"}, iftial:{جمع:"toplandı",جنب:"kaçındı",كسب:"elde etti",فتح:"başlattı"}, infial:{كسر:"kırıldı",قطع:"kesildi",فتح:"açıldı",صرف:"ayrılıp gitti"}, tafaul2:{علم:"öğrendi",كلم:"konuştu",كسر:"kırılıp döküldü",قدم:"ilerledi"}, tafaul:{بعد:"birbirinden uzaklaştı",قتل:"birbirini öldürdü",كتب:"mektuplaştı",شرك:"ortak oldu"}, istifal:{غفر:"bağışlanma diledi",خرج:"çıkardı (istihraç etti)",عمل:"kullandı",حسن:"güzel buldu"}, ifilal:{حمر:"kızardı",صفر:"sarardı",خضر:"yeşerdi",زرق:"maviye döndü"}};

/* ---- yardımcılar ---- */
function fill(t, r){ return t.replace(/F/g, r[0]).replace(/A/g, r[1]).replace(/L/g, r[2]); }
function clusters(t){ const out = []; for (const ch of t){ if (MARKS.test(ch) && out.length) out[out.length-1].s += ch; else out.push({s:ch}); } return out; }
function paint(t, r){
  return clusters(t).map(c => {
    const b = c.s[0], rest = c.s.slice(1);
    if (b === "F") return `<span class="rf">${r[0]}${rest}</span>`;
    if (b === "A") return `<span class="ra">${r[1]}${rest}</span>`;
    if (b === "L") return `<span class="rl">${r[2]}${rest}</span>`;
    if (b === " ") return " ";
    return `<span class="zv">${c.s}</span>`;
  }).join("");
}
const MIZAN = ["ف","ع","ل"];
function rootOf(str){ const r = Array.from(str.replace(/[\sً-ْ]/g,"")); return r.length === 3 ? r : null; }
function checkRoot(r){
  if (!r) return "Üç harf gir (ör. ن ص ر).";
  if (r.some(ch => !/[ب-ي]/.test(ch) || /[اويىةءأإآؤئ]/.test(ch))) return "Sâlim bir kök gir: harf-i illet (ا و ي) ve hemze olmasın.";
  if (r[1] === r[2]) return "Ayn ve lâm aynı (mudâaf kök); bu motor sâlim kökleri çeker.";
  return "";
}
