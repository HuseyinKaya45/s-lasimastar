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

/* ---- hazır kökler: r kök, b bâb, ms masdar (semâîdir), m2 diğer yaygın masdarlar, tr anlam, lz lâzım (geçişsiz), sf sıfat (Kerume) ---- */
const ROOTS = [
 /* 1. bâb: نَصَرَ يَنْصُرُ */
 {r:"نصر", b:1, ms:"نَصْرًا", tr:"yardım etmek"},
 {r:"كتب", b:1, ms:"كِتَابَةً", m2:"كَتْبًا", tr:"yazmak"},
 {r:"قتل", b:1, ms:"قَتْلًا", tr:"öldürmek"},
 {r:"شكر", b:1, ms:"شُكْرًا", m2:"شُكُورًا", tr:"şükretmek"},
 {r:"طلب", b:1, ms:"طَلَبًا", tr:"istemek"},
 {r:"ترك", b:1, ms:"تَرْكًا", tr:"terk etmek"},
 {r:"خرج", b:1, ms:"خُرُوجًا", tr:"çıkmak", lz:true},
 {r:"سجد", b:1, ms:"سُجُودًا", tr:"secde etmek", lz:true},
 {r:"دخل", b:1, ms:"دُخُولًا", tr:"girmek"},
 {r:"قعد", b:1, ms:"قُعُودًا", tr:"oturmak", lz:true},
 {r:"كفر", b:1, ms:"كُفْرًا", m2:"كُفْرَانًا", tr:"inkâr etmek, nankörlük etmek"},
 {r:"نظر", b:1, ms:"نَظَرًا", tr:"bakmak", lz:true},
 {r:"ذكر", b:1, ms:"ذِكْرًا", tr:"anmak, zikretmek"},
 {r:"خلق", b:1, ms:"خَلْقًا", tr:"yaratmak"},
 {r:"عبد", b:1, ms:"عِبَادَةً", tr:"kulluk etmek, ibadet etmek"},
 {r:"حكم", b:1, ms:"حُكْمًا", tr:"hükmetmek"},
 {r:"نشر", b:1, ms:"نَشْرًا", tr:"yaymak"},
 {r:"هرب", b:1, ms:"هُرُوبًا", m2:"هَرَبًا", tr:"kaçmak", lz:true},
 {r:"حشر", b:1, ms:"حَشْرًا", tr:"toplamak, haşretmek"},
 {r:"سكن", b:1, ms:"سُكُونًا", m2:"سُكْنَى", tr:"sakin olmak, oturmak", lz:true},
 {r:"رزق", b:1, ms:"رِزْقًا", tr:"rızık vermek"},
 {r:"خلد", b:1, ms:"خُلُودًا", tr:"ebedî kalmak", lz:true},
 {r:"طلع", b:1, ms:"طُلُوعًا", tr:"doğmak, yükselmek", lz:true},
 {r:"حضر", b:1, ms:"حُضُورًا", tr:"hazır bulunmak", lz:true},
 {r:"سقط", b:1, ms:"سُقُوطًا", tr:"düşmek", lz:true},
 {r:"درس", b:1, ms:"دَرْسًا", m2:"دِرَاسَةً", tr:"okumak, ders çalışmak"},
 /* 2. bâb: ضَرَبَ يَضْرِبُ */
 {r:"ضرب", b:2, ms:"ضَرْبًا", tr:"vurmak"},
 {r:"غفر", b:2, ms:"مَغْفِرَةً", m2:"غُفْرَانًا", tr:"bağışlamak"},
 {r:"حمل", b:2, ms:"حَمْلًا", tr:"taşımak"},
 {r:"كسب", b:2, ms:"كَسْبًا", tr:"kazanmak"},
 {r:"عرف", b:2, ms:"مَعْرِفَةً", m2:"عِرْفَانًا", tr:"tanımak"},
 {r:"جلس", b:2, ms:"جُلُوسًا", tr:"oturmak", lz:true},
 {r:"نزل", b:2, ms:"نُزُولًا", tr:"inmek", lz:true},
 {r:"كسر", b:2, ms:"كَسْرًا", tr:"kırmak"},
 {r:"سرق", b:2, ms:"سَرِقَةً", m2:"سَرَقًا", tr:"çalmak"},
 {r:"رجع", b:2, ms:"رُجُوعًا", m2:"رَجْعًا", tr:"dönmek", lz:true},
 {r:"عدل", b:2, ms:"عَدْلًا", tr:"adaletli olmak", lz:true},
 {r:"فصل", b:2, ms:"فَصْلًا", tr:"ayırmak"},
 {r:"صرف", b:2, ms:"صَرْفًا", tr:"çevirmek, harcamak"},
 {r:"هدم", b:2, ms:"هَدْمًا", tr:"yıkmak"},
 {r:"حبس", b:2, ms:"حَبْسًا", tr:"hapsetmek"},
 {r:"غلب", b:2, ms:"غَلَبًا", m2:"غَلَبَةً", tr:"galip gelmek"},
 {r:"ملك", b:2, ms:"مِلْكًا", m2:"مُلْكًا", tr:"sahip olmak"},
 {r:"خلط", b:2, ms:"خَلْطًا", tr:"karıştırmak"},
 {r:"قصد", b:2, ms:"قَصْدًا", tr:"kastetmek, yönelmek"},
 {r:"كشف", b:2, ms:"كَشْفًا", tr:"açığa çıkarmak"},
 {r:"قبض", b:2, ms:"قَبْضًا", tr:"tutmak, almak"},
 {r:"ظلم", b:2, ms:"ظُلْمًا", tr:"zulmetmek"},
 {r:"صبر", b:2, ms:"صَبْرًا", tr:"sabretmek", lz:true},
 {r:"نطق", b:2, ms:"نُطْقًا", tr:"konuşmak", lz:true},
 {r:"عقد", b:2, ms:"عَقْدًا", tr:"bağlamak, akdetmek"},
 {r:"دفن", b:2, ms:"دَفْنًا", tr:"gömmek"},
 {r:"فرض", b:2, ms:"فَرْضًا", tr:"farz kılmak"},
 {r:"جلب", b:2, ms:"جَلْبًا", tr:"getirmek"},
 {r:"سبق", b:2, ms:"سَبْقًا", tr:"geçmek, öne geçmek"},
 {r:"ختم", b:2, ms:"خَتْمًا", tr:"mühürlemek, bitirmek"},
 {r:"جلد", b:2, ms:"جَلْدًا", tr:"kamçılamak"},
 /* 3. bâb: فَتَحَ يَفْتَحُ */
 {r:"فتح", b:3, ms:"فَتْحًا", tr:"açmak"},
 {r:"جمع", b:3, ms:"جَمْعًا", tr:"toplamak"},
 {r:"منع", b:3, ms:"مَنْعًا", tr:"engellemek"},
 {r:"نفع", b:3, ms:"نَفْعًا", tr:"fayda vermek"},
 {r:"شرح", b:3, ms:"شَرْحًا", tr:"açıklamak"},
 {r:"رفع", b:3, ms:"رَفْعًا", tr:"yükseltmek"},
 {r:"ذهب", b:3, ms:"ذَهَابًا", m2:"ذُهُوبًا", tr:"gitmek", lz:true},
 {r:"قطع", b:3, ms:"قَطْعًا", tr:"kesmek"},
 {r:"جرح", b:3, ms:"جَرْحًا", tr:"yaralamak"},
 {r:"ظهر", b:3, ms:"ظُهُورًا", tr:"görünmek, ortaya çıkmak", lz:true},
 {r:"ركع", b:3, ms:"رُكُوعًا", tr:"rükû etmek", lz:true},
 {r:"لعن", b:3, ms:"لَعْنًا", tr:"lanetlemek"},
 {r:"صنع", b:3, ms:"صُنْعًا", tr:"yapmak, imal etmek"},
 {r:"فعل", b:3, ms:"فِعْلًا", tr:"işlemek, yapmak"},
 {r:"نصح", b:3, ms:"نُصْحًا", tr:"nasihat etmek"},
 {r:"بحث", b:3, ms:"بَحْثًا", tr:"araştırmak"},
 {r:"فحص", b:3, ms:"فَحْصًا", tr:"muayene etmek, incelemek"},
 {r:"ذبح", b:3, ms:"ذَبْحًا", tr:"kesmek (boğazlamak)"},
 {r:"شغل", b:3, ms:"شُغْلًا", tr:"meşgul etmek"},
 {r:"مدح", b:3, ms:"مَدْحًا", tr:"övmek"},
 {r:"سبح", b:3, ms:"سَبْحًا", m2:"سِبَاحَةً", tr:"yüzmek", lz:true},
 /* 4. bâb: عَلِمَ يَعْلَمُ */
 {r:"علم", b:4, ms:"عِلْمًا", tr:"bilmek"},
 {r:"شرب", b:4, ms:"شُرْبًا", tr:"içmek"},
 {r:"حفظ", b:4, ms:"حِفْظًا", tr:"ezberlemek, korumak"},
 {r:"فهم", b:4, ms:"فَهْمًا", tr:"anlamak"},
 {r:"عمل", b:4, ms:"عَمَلًا", tr:"çalışmak, yapmak"},
 {r:"ركب", b:4, ms:"رُكُوبًا", tr:"binmek"},
 {r:"فرح", b:4, ms:"فَرَحًا", tr:"sevinmek", lz:true},
 {r:"لعب", b:4, ms:"لَعِبًا", tr:"oynamak", lz:true},
 {r:"سمع", b:4, ms:"سَمْعًا", m2:"سَمَاعًا", tr:"işitmek"},
 {r:"لبس", b:4, ms:"لُبْسًا", tr:"giymek"},
 {r:"حزن", b:4, ms:"حُزْنًا", m2:"حَزَنًا", tr:"üzülmek", lz:true},
 {r:"ندم", b:4, ms:"نَدَمًا", tr:"pişman olmak", lz:true},
 {r:"شهد", b:4, ms:"شَهَادَةً", m2:"شُهُودًا", tr:"şahitlik etmek, tanık olmak"},
 {r:"خسر", b:4, ms:"خُسْرًا", m2:"خُسْرَانًا", tr:"zarar etmek, kaybetmek"},
 {r:"بخل", b:4, ms:"بُخْلًا", tr:"cimrilik etmek", lz:true},
 {r:"مرض", b:4, ms:"مَرَضًا", tr:"hastalanmak", lz:true},
 {r:"سلم", b:4, ms:"سَلَامَةً", tr:"sağ salim olmak", lz:true},
 {r:"تعب", b:4, ms:"تَعَبًا", tr:"yorulmak", lz:true},
 {r:"عطش", b:4, ms:"عَطَشًا", tr:"susamak", lz:true},
 {r:"جهل", b:4, ms:"جَهْلًا", tr:"bilmemek, cahillik etmek"},
 {r:"كره", b:4, ms:"كُرْهًا", m2:"كَرَاهَةً", tr:"hoşlanmamak, nefret etmek"},
 {r:"غضب", b:4, ms:"غَضَبًا", tr:"öfkelenmek", lz:true},
 {r:"قبل", b:4, ms:"قَبُولًا", tr:"kabul etmek"},
 {r:"سعد", b:4, ms:"سَعَادَةً", tr:"mutlu olmak", lz:true},
 {r:"نشط", b:4, ms:"نَشَاطًا", tr:"canlanmak, zinde olmak", lz:true},
 {r:"ضحك", b:4, ms:"ضَحِكًا", m2:"ضَحْكًا", tr:"gülmek", lz:true},
 {r:"حذر", b:4, ms:"حَذَرًا", tr:"sakınmak"},
 {r:"كسل", b:4, ms:"كَسَلًا", tr:"tembellik etmek", lz:true},
 {r:"عجب", b:4, ms:"عَجَبًا", tr:"şaşırmak", lz:true},
 {r:"طمع", b:4, ms:"طَمَعًا", tr:"tamah etmek"},
 {r:"غرق", b:4, ms:"غَرَقًا", tr:"boğulmak", lz:true},
 /* 5. bâb: حَسِبَ يَحْسِبُ */
 {r:"حسب", b:5, ms:"حِسْبَانًا", m2:"حُسْبَانًا", tr:"sanmak"},
 {r:"نعم", b:5, ms:"نَعِيمًا", m2:"نِعْمَةً", tr:"bolluk içinde olmak", lz:true},
 /* 6. bâb: كَرُمَ يَكْرُمُ */
 {r:"كرم", b:6, ms:"كَرَمًا", tr:"cömert olmak", lz:true, sf:"كَرِيمٌ"},
 {r:"حسن", b:6, ms:"حُسْنًا", tr:"güzel olmak", lz:true, sf:"حَسَنٌ"},
 {r:"شرف", b:6, ms:"شَرَفًا", tr:"şerefli olmak", lz:true, sf:"شَرِيفٌ"},
 {r:"صغر", b:6, ms:"صِغَرًا", tr:"küçük olmak", lz:true, sf:"صَغِيرٌ"},
 {r:"كبر", b:6, ms:"كِبَرًا", tr:"büyük olmak", lz:true, sf:"كَبِيرٌ"},
 {r:"بعد", b:6, ms:"بُعْدًا", tr:"uzak olmak", lz:true, sf:"بَعِيدٌ"},
 {r:"قرب", b:6, ms:"قُرْبًا", tr:"yakın olmak", lz:true, sf:"قَرِيبٌ"},
 {r:"ضعف", b:6, ms:"ضَعْفًا", m2:"ضُعْفًا", tr:"zayıf olmak", lz:true, sf:"ضَعِيفٌ"},
 {r:"شجع", b:6, ms:"شَجَاعَةً", tr:"cesur olmak", lz:true, sf:"شُجَاعٌ"},
 {r:"قبح", b:6, ms:"قُبْحًا", tr:"çirkin olmak", lz:true, sf:"قَبِيحٌ"},
 {r:"كثر", b:6, ms:"كَثْرَةً", tr:"çok olmak", lz:true, sf:"كَثِيرٌ"},
 {r:"طهر", b:6, ms:"طَهَارَةً", tr:"temiz olmak", lz:true, sf:"طَاهِرٌ"},
 {r:"صعب", b:6, ms:"صُعُوبَةً", tr:"zor olmak", lz:true, sf:"صَعْبٌ"},
 {r:"سهل", b:6, ms:"سُهُولَةً", tr:"kolay olmak", lz:true, sf:"سَهْلٌ"},
 {r:"ثقل", b:6, ms:"ثِقَلًا", tr:"ağır olmak", lz:true, sf:"ثَقِيلٌ"},
 {r:"عظم", b:6, ms:"عِظَمًا", m2:"عَظَمَةً", tr:"büyük/azametli olmak", lz:true, sf:"عَظِيمٌ"},
 {r:"لطف", b:6, ms:"لُطْفًا", tr:"zarif/lütufkâr olmak", lz:true, sf:"لَطِيفٌ"},
 {r:"جمل", b:6, ms:"جَمَالًا", tr:"güzel olmak (yüz/görünüş)", lz:true, sf:"جَمِيلٌ"},
 {r:"نظف", b:6, ms:"نَظَافَةً", tr:"temiz olmak", lz:true, sf:"نَظِيفٌ"},
 {r:"حلم", b:6, ms:"حِلْمًا", tr:"yumuşak huylu olmak", lz:true, sf:"حَلِيمٌ"},
 {r:"خبث", b:6, ms:"خُبْثًا", tr:"habis olmak", lz:true, sf:"خَبِيثٌ"},
 {r:"فصح", b:6, ms:"فَصَاحَةً", tr:"fasih olmak", lz:true, sf:"فَصِيحٌ"}
];
/* Masdar semâîdir: hazır köklerde kayıtlı masdar(lar) gösterilir; özel kökte bâbın en yaygın üç kalıbı "olası" diye önerilir. */
const MASDAR_KALIP = {1:["FَAْLًا","FُAُوLًا","FِAَاLَةً"], 2:["FَAْLًا","FُAُوLًا","FِAَاLَةً"], 3:["FَAْLًا","FُAُوLًا","FَAَاLًا"], 4:["FَAَLًا","FِAْLًا","FَAَاLَةً"], 5:["FِAْLًا","FِAْLَانًا","FُAْLًا"], 6:["FَAَاLَةً","FُAُوLَةً","FُAْLًا"]};
/* Bu lâzım fiillerde (çoğu hâl/duygu bildirir) ism-i fâil yerine sıfat-ı müşebbehe kullanılır; kıyâsî فَاعِلٌ kalıbı bu köklerde kullanılmaz ya da pek kullanılmaz. Elle girilmiştir; sözlükten doğrulanmalıdır. */
const SIFAT = {"مرض":"مَرِيضٌ", "عطش":"عَطْشَانُ", "سعد":"سَعِيدٌ", "حزن":"حَزِينٌ", "غضب":"غَضْبَانُ", "كسل":"كَسْلَانُ", "بخل":"بَخِيلٌ", "نشط":"نَشِيطٌ", "فرح":"فَرِحٌ", "تعب":"تَعِبٌ", "غرق":"غَرِيقٌ"};
ROOTS.forEach(d => { if (SIFAT[d.r]) d.sf = SIFAT[d.r]; });
/* Lâzım fiillerde ism-i mef'ûl yalnız harf-i cerle kullanılır; bunlar için kullanım örneği (programa elle girilmiştir, sözlükten doğrulanmalıdır). Listede olmayan lâzım fiillerde ism-i mef'ûl kullanılmaz ya da pek kullanılmaz. */
const MEF_CER = {"جلس":"عَلَيْهِ", "خرج":"مِنْهُ", "ذهب":"إِلَيْهِ", "سجد":"لَهُ", "نظر":"إِلَيْهِ", "رجع":"إِلَيْهِ", "سكن":"فِيهِ", "هرب":"مِنْهُ", "صبر":"عَلَيْهِ", "نطق":"بِهِ", "عدل":"عَنْهُ", "ضحك":"مِنْهُ"};
ROOTS.forEach(d => { if (d.lz && MEF_CER[d.r]) d.mc = MEF_CER[d.r]; });
const masdarOf = d => d ? [d.ms].concat(d.m2 ? [d.m2] : []) : null;
const masdarGuess = rt => (MASDAR_KALIP[rt.b.id] || []).map(t => fill(t, rt.r));


/* ---- Türkçe karşılıklar: kökün Türkçe mastarından (tk) 24 kalıbın karşılığı üretilir ---- */
const TK_ELLE = {"كره":"nefret etmek", "جهل":"cahillik etmek"};
const trTemiz = d => TK_ELLE[d.r] || d.tr.split(",")[0].replace(/\s*\([^)]*\)/g,"").replace(/(\S+)\/(\S+)/g,"$1").trim();
const TR_V = "aeıioöuü", TR_SESSIZ = "çfhkpsşt", TR_ISTISNA = ["al","bil","bul","dur","gel","gör","kal","ol","öl","san","var","ver","vur"];
const trSes = w => Array.from(w).filter(c => TR_V.includes(c));
const trSon = w => trSes(w).slice(-1)[0] || "a";
const trH2 = v => "aıou".includes(v) ? "a" : "e";
const trH4 = v => ({a:"ı", "ı":"ı", o:"u", u:"u", e:"i", i:"i", "ö":"ü", "ü":"ü"})[v];
function trCek(tk){
  const kel = tk.split(" "), son = kel.pop(), on = kel.length ? kel.join(" ") + " " : "";
  const s0 = son.replace(/m[ae]k$/, ""), unlu = TR_V.includes(s0.slice(-1));
  const yum = /et$/.test(s0) || s0 === "git";            /* et- ve git- yumuşar: eden, edecek, gidecek */
  const sy = yum ? s0.slice(0,-1) + "d" : s0;
  const ng = s0 + "m" + trH2(trSon(s0));                  /* olumsuzluk: yazma-, gelme- */
  const ar = unlu ? s0 + "r" : yum && /et$/.test(s0) ? sy + "er" : s0 === "git" ? sy + "er"
    : (trSes(s0).length === 1 && !TR_ISTISNA.includes(s0)) ? s0 + trH2(trSon(s0)) + "r" : s0 + trH4(trSon(s0)) + "r";
  const yor = unlu ? (/[ae]$/.test(s0) ? (() => { const b = s0.slice(0,-1); return b + trH4(trSes(b).slice(-1)[0] || "i") + "yor"; })() : s0 + "yor") : sy + trH4(trSon(s0)) + "yor";
  const gel = (unlu ? s0 + "y" : sy) + (trH2(trSon(s0)) === "a" ? "acak" : "ecek");
  const gec = s0 + (TR_SESSIZ.includes(s0.slice(-1)) ? "t" : "d") + trH4(trSon(s0));
  const ngGec = ng + "d" + trH4(trSon(ng)), ngYor = s0 + "m" + trH4(trSon(s0)) + "yor", ngGel = ng + (trH2(trSon(ng)) === "a" ? "yacak" : "yecek");
  const fail = (unlu ? s0 + "y" : sy) + (trH2(trSon(s0)) === "a" ? "an" : "en");
  const ps = /l$/.test(s0) ? sy + trH4(trSon(s0)) + "n" : unlu ? s0 + "n" : sy + trH4(trSon(s0)) + "l";   /* l ile biten kök: -ın (bilinen); ünlüyle biten: -n (okunan); diğerleri: -ıl (yazılan) */
  const mef = ps + (trH2(trSon(ps)) === "a" ? "an" : "en");
  const ys = (unlu ? s0 + "y" : sy) + trH4(trSon(s0)) + "ş";
  const nm = ng + (/[ae]$/.test(ng) ? "y" : "") + trH2(trSon(ng));
  const b = x => x.charAt(0).toLocaleUpperCase("tr") + x.slice(1);
  return {
    mazi: b(on + gec), muz: b(on + ar + " / " + on + yor + " / " + on + gel), masdar: b(tk), fail: b(on + fail), mef: b(on + mef),
    lem: b(on + ngGec), lemma: b("henüz " + on + ngGec), nhal: b(on + ngYor), nist: b(on + ngGel), len: b("asla " + on + ngGel),
    gaib: b(on + s0 + "s" + trH4(trSon(s0)) + "n"), nehyG: b(on + ng + "s" + trH4(trSon(ng)) + "n"), emr: b(on + s0), nehyH: b(on + ng),
    zarf: b(on + ng + " zamanı · " + on + ng + " yeri"), alet: b(on + ng + " aleti"), merre: b("bir kere " + on + tk.split(" ").pop()),
    nev: b("bir tür " + on + ys), tasgir: b("küçük bir " + on + ys), mensub: b(on + nm + " mensup"),
    mubalaga: b("çok " + on + fail), tafdil: b("en çok " + on + fail), tac1: b("acayip " + on + gec), tac2: b("ne acayip " + on + gec)
  };
}
ROOTS.forEach(d => { d.tk = trTemiz(d); });

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
/* İdğam: lâm harfi, kendisiyle aynı harfle başlayan ekin önüne gelince (ör. lâmı ن olan kökte "نْنَا") iki harf tek şeddeli harfe dönüşür: سَكَنْنَا değil سَكَنَّا. */
function fill(t, r){
  const w = t.replace(/F/g, r[0]).replace(/A/g, r[1]).replace(/L/g, r[2]);
  return w.split(r[2] + "ْ" + r[2]).join(r[2] + "ّ");
}
function clusters(t){ const out = []; for (const ch of t){ if (MARKS.test(ch) && out.length) out[out.length-1].s += ch; else out.push({s:ch}); } return out; }
function paint(t, r){
  const cl = clusters(t);
  for (let i = 0; i < cl.length - 1; i++){  /* idğam: lâm + sükûn, ardından aynı harf → tek şeddeli lâm */
    if (cl[i].s === "L" + "ْ" && cl[i+1].s[0] === r[2]){ cl[i] = {s:"L" + "ّ" + cl[i+1].s.slice(1)}; cl.splice(i+1, 1); }
  }
  return cl.map(c => {
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
