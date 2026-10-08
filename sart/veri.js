// ================= VERİ: Şart ve Şart Edatları (الشَّرْطُ وَأَدَوَاتُهُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "أَدَاةُ الشَّرْطِ", tr: "Şart edatı" }, nasb: { ar: "فِعْلُ الشَّرْطِ", tr: "Şart fiili" }, cerr: { ar: "جَوَابُ الشَّرْطِ", tr: "Cevap" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var MN = [["k", "Kişi (kim)", "لِلْعَاقِلِ", "nasb"], ["s", "Şey (ne)", "لِغَيْرِ العَاقِلِ", "cerr"], ["z", "Zaman (ne zaman)", "لِلزَّمَانِ", "mi"], ["m", "Mekân (nerede)", "لِلْمَكَانِ", "ref"], ["h", "Diğer (eğer, nasıl)", "مَعْنًى آخَرُ", "x"]];
var JZ = [["j", "Câzim (iki fiili cezmeder)", "أَدَاةٌ جَازِمَةٌ", "nasb"], ["g", "Câzim değil", "أَدَاةٌ غَيْرُ جَازِمَةٍ", "cerr"]];
var SP = [["e", "Şart edatı", "أَدَاةُ الشَّرْطِ", "mz"], ["f", "Şart fiili", "فِعْلُ الشَّرْطِ", "nasb"], ["c", "Cevap", "جَوَابُ الشَّرْطِ", "cerr"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];
var TUR_TR = { k: "Kişi", s: "Şey", z: "Zaman", m: "Mekân", h: "Diğer", j: "Câzim", g: "Câzim değil", e: "Şart edatı", f: "Şart fiili", c: "Cevap", x: "Başka" };
// Makine: edatlar [edat, j/g, Türkçe baş] · fiil çiftleri [şart merfû, şart meczûm, cevap merfû, cevap meczûm, şart mâzî, cevap mâzî, ek1, ek2, alâmet1, alâmet2, Tr şart, Tr cevap, Tr şart geçmiş, Tr cevap geçmiş, Tr -dığında]
var ED = [["إِنْ", "j", "Eğer"], ["مَتَى", "j", "Ne zaman"], ["أَيَّانَ", "j", "Ne zaman"], ["أَيْنَمَا", "j", "Nerede"], ["حَيْثُمَا", "j", "Her nerede"], ["مَهْمَا", "j", "Ne kadar"], ["إِذَا", "g", ""], ["لَوْ", "g", "Eğer"]];
var FP = [
  ["يَدْرُسُ", "يَدْرُسْ", "يَنْجَحُ", "يَنْجَحْ", "دَرَسَ", "نَجَحَ", "", "", "sükûn", "sükûn", "çalışırsa", "başarır", "çalışsaydı", "başarırdı", "çalıştığında"],
  ["يَسْعَى", "يَسْعَ", "يَصِلُ", "يَصِلْ", "سَعَى", "وَصَلَ", "", "إِلَى هَدَفِهِ", "illet harfi (elif) düşer", "sükûn", "gayret ederse", "hedefine ulaşır", "gayret etseydi", "hedefine ulaşırdı", "gayret ettiğinde"],
  ["يَدْعُو", "يَدْعُ", "يَجِدُ", "يَجِدْ", "دَعَا", "وَجَدَ", "رَبَّهُ", "إِجَابَةً", "illet harfi (vâv) düşer", "sükûn", "Rabbine dua ederse", "karşılık bulur", "Rabbine dua etseydi", "karşılık bulurdu", "Rabbine dua ettiğinde"],
  ["يَمْشِي", "يَمْشِ", "يَتْعَبُ", "يَتْعَبْ", "مَشَى", "تَعِبَ", "كَثِيرًا", "", "illet harfi (yâ) düşer", "sükûn", "çok yürürse", "yorulur", "çok yürüseydi", "yorulurdu", "çok yürüdüğünde"],
  ["يَجْتَهِدُونَ", "يَجْتَهِدُوا", "يَنْجَحُونَ", "يَنْجَحُوا", "اجْتَهَدُوا", "نَجَحُوا", "", "", "nûn düşer", "nûn düşer", "çalışırlarsa", "başarırlar", "çalışsalardı", "başarırlardı", "çalıştıklarında"],
  ["يَنَامُ", "يَنَمْ", "يَسْتَيْقِظُ", "يَسْتَيْقِظْ", "نَامَ", "اسْتَيْقَظَ", "مُبَكِّرًا", "مُبَكِّرًا", "sükûn (ecvef: elif düşer)", "sükûn", "erken yatarsa", "erken kalkar", "erken yatsaydı", "erken kalkardı", "erken yattığında"]
];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CBP(parts, i, tr, why) {
  var p = [], ok = [], si = 0;
  parts.forEach(function (x) { if (typeof x === "string") p.push(x); else { var r = ROT(x, i + si++); p.push(r); ok.push(r.a); } });
  return { q: "", p: p, ok: [ok], tr: tr, why: why };
}
// Cezm alâmeti: [cümle, şart alâmeti, cevap alâmeti, Türkçe, açıklama]
var AL = { s: ["السُّكُونُ", "حَذْفُ حَرْفِ العِلَّةِ", "حَذْفُ النُّونِ"], h: ["حَذْفُ حَرْفِ العِلَّةِ", "السُّكُونُ", "حَذْفُ النُّونِ"], n: ["حَذْفُ النُّونِ", "السُّكُونُ", "حَذْفُ حَرْفِ العِلَّةِ"] };
function CA(x, i) { return CBP([x[0] + " ← الشَّرْطُ:", AL[x[1]], "· الجَوَابُ:", AL[x[2]]], i, x[3], x[4]); }

var UNITS = [
// ---------------------------------------------------------------- 1 · ŞART ÜSLUBU
{
  id: "u1", no: 1, ar: "أُسْلُوبُ الشَّرْطِ", tr: "Şart Üslubu ve Öğeleri", short: "Öğeler", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Şart üslubunun edat, şart fiili ve cevaptan oluştuğunu bilmek", "Birinci cümlenin ikincinin sebebi olduğunu bilmek", "Cümlede edatı, şart fiilini ve cevabı bulmak"],
  examples: [
    { s: "مَنْ:mz / يَزْرَعْ:nasb / يَحْصُدْ.:cerr", tr: "Kim ekerse biçer." },
    { s: "إِنْ:mz / تَنَمْ مُبَكِّرًا:nasb / تَسْتَيْقِظْ مُبَكِّرًا.:cerr", tr: "Erken yatarsan erken kalkarsın." }
  ],
  rules: [
    { tr: "<b>Şart üslubu</b> üç öğeden oluşur: <b>şart edatı</b> + <b>şart cümlesi</b> (fiili) + <b>cevap</b>. Birinci cümle ikincisinin sebebidir:", ex: ["مَنْ يَجْتَهِدْ يَنْجَحْ = أَدَاةُ الشَّرْطِ + فِعْلُ الشَّرْطِ + جَوَابُ الشَّرْطِ"] },
    { tr: "Türkçede “-se/-sa … -r” kalıbıyla çevrilir: <span class=\"ar\">مَنْ يَزْرَعْ يَحْصُدْ</span> “Kim ekerse biçer”." },
    { tr: "Edat câzimse iki muzâri de meczûm olur: <span class=\"ar\">إِنْ تَنَمْ مُبَكِّرًا تَسْتَيْقِظْ مُبَكِّرًا</span>." },
    { tr: "Meczûm fiilden sonra ال gelirse sükûn kesreye döner: <span class=\"ar\">مَنْ يُرِدِ اللهُ · مَنْ يَشْكُرِ اللهَ</span>." }
  ],
  kaide: ["الشَّرْطُ أُسْلُوبٌ يَتَأَلَّفُ مِنْ أَدَاةِ شَرْطٍ تَرْبِطُ بَيْنَ جُمْلَتَيْنِ أُولَاهُمَا شَرْطٌ وَسَبَبٌ لِحُدُوثِ الثَّانِيَةِ. تُسَمَّى الجُمْلَةُ الأُولَى «جُمْلَةَ الشَّرْطِ»، وَتُسَمَّى الجُمْلَةُ الثَّانِيَةُ «جَوَابَ الشَّرْطِ». إِذَنْ أُسْلُوبُ الشَّرْطِ يَتَكَوَّنُ مِنْ ثَلَاثَةِ عَنَاصِرَ: أَدَاةِ الشَّرْطِ + جُمْلَةِ الشَّرْطِ + جَوَابِ الشَّرْطِ: مَنْ يَجْتَهِدْ يَنْجَحْ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "١", ar: "عَيِّنْ فِيمَا يَأْتِي أَدَاةَ الشَّرْطِ وَفِعْلَ الشَّرْطِ وَجَوَابَ الشَّرْطِ", tr: "Edatı, şart fiilini ve cevabı etiketle; kalanlar Başka.", exHtml: "<span class=\"ar\">مَنْ يَعْمَلْ صَالِحًا يُجْزَ بِهِ ← الأَدَاةُ: مَنْ · فِعْلُهُ: يَعْمَلْ · جَوَابُهُ: يُجْزَ</span>", items: [
      T("مَنْ:mz / يُفَكِّرْ:nasb / جَيِّدًا:x / يَجِدْ:cerr / حِيلَةً.:x", "Kim iyi düşünürse bir çare bulur.", "İki fiil de sükûnla meczûm."),
      T("مَا:mz / أَفْعَلْهُ:nasb / مِنَ الوَاجِبِ فِي النَّهَارِ:x / يُسَاعِدْنِي:cerr / فِي اللَّيْلِ.:x", "Gündüz ödevden ne yaparsam gece bana yardımcı olur.", "مَا: “ne şey”."),
      T("مَنْ:mz / يُرِدِ:nasb / اللهُ بِهِ خَيْرًا:x / يُفَقِّهْهُ:cerr / فِي الدِّينِ.:x", "Allah kimin hayrını dilerse onu dinde anlayışlı kılar. (Hadis)", "يُرِدْ: ecvef, orta harf düştü; ال önünde kesre."),
      T("إِنْ:mz / تَجْرِ:nasb / يَجْرِ:cerr / الكَلْبُ خَلْفَكَ،:x / وَإِنْ:mz / تَقِفْ:nasb / يَقِفْ.:cerr", "Koşarsan köpek arkandan koşar, durursan durur.", "تَجْرِ / يَجْرِ: yâ düştü."),
      T("مَنْ:mz / يَكْسَلْ:nasb / يَفْشَلْ.:cerr", "Kim tembellik ederse başarısız olur.", "Sükûn."),
      T("مَتَى:mz / تَسْتَجِبْ:nasb / لِنُصْحِ وَالِدَيْكَ:x / تَسْعَدْ.:cerr", "Anne babanın öğüdüne uyduğunda mutlu olursun.", "تَسْتَجِيبُ → تَسْتَجِبْ (ecvef)."),
      T("مَنْ:mz / يَشْكُرِ:nasb / اللهَ عَلَى نِعَمِهِ،:x / يَزِدْهُ:cerr / اللهُ.:x", "Kim nimetlerine karşı Allah’a şükrederse Allah onu artırır.", "يَزِيدُ → يَزِدْ."),
      T("مَنْ:mz / يَعْرِفْ:nasb / حَقِيقَةَ نَفْسِهِ،:x / يُدْرِكْ:cerr / حَقِيقَةَ الكَوْنِ.:x", "Kim kendi gerçeğini bilirse evrenin gerçeğini kavrar.", "Sükûn.")
    ]},
    { type: "pick", extra: true, ar: "مَا جَوَابُ الشَّرْطِ؟", tr: "Şart cümlesinin cevabını seç.", items: PL([
      ["مَنْ جَدَّ وَجَدَ.", "وَجَدَ", "جَدَّ", "مَنْ", "Çalışan bulur.", "Mâzî cevap."],
      ["إِذَا جَاءَ القَدَرُ عَمِيَ البَصَرُ.", "عَمِيَ البَصَرُ", "جَاءَ القَدَرُ", "إِذَا", "Kader gelince göz kör olur.", "إِذَا câzim değil."],
      ["مَتَى تُسَاعِدِ المُحْتَاجَ يَشْكُرْكَ النَّاسُ.", "يَشْكُرْكَ النَّاسُ", "تُسَاعِدِ المُحْتَاجَ", "المُحْتَاجَ", "Muhtaca yardım ettiğinde insanlar sana teşekkür eder.", "Cevap meczûm."],
      ["أَيْنَ تُسَافِرْ أُسَافِرْ مَعَكَ.", "أُسَافِرْ مَعَكَ", "تُسَافِرْ", "أَيْنَ", "Nereye yolculuk edersen seninle gelirim.", "Mekân."],
      ["كَيْفَمَا تُعَامِلْ صَدِيقَكَ يُعَامِلْكَ.", "يُعَامِلْكَ", "تُعَامِلْ صَدِيقَكَ", "كَيْفَمَا", "Arkadaşına nasıl davranırsan o da sana öyle davranır.", "Hâl."],
      ["حَيْثُمَا يَظْفَرِ المُسْلِمُ بِالعِلْمِ يَأْخُذْهُ.", "يَأْخُذْهُ", "يَظْفَرِ المُسْلِمُ", "بِالعِلْمِ", "Müslüman ilmi nerede bulursa onu alır.", "ال önünde kesre: يَظْفَرِ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · CÂZİM EDATLAR VE CEZM ALÂMETİ
{
  id: "u2", no: 2, ar: "أَدَوَاتُ الشَّرْطِ الجَازِمَةُ", tr: "Câzim Edatlar ve Cezm Alâmeti", short: "Câzim", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["İki fiili cezmeden edatları ve anlamlarını bilmek", "Cezm alâmetini söylemek: sükûn, illet harfinin düşmesi, nûnun düşmesi", "Şart fiilini ve cevabı doğru biçimde yazmak"],
  examples: [
    { s: "إِذْمَا:mz / تَحْتَرِمِ:nasb / الكِبَارَ:- / يَحْتَرِمْكَ:cerr / الصِّغَارُ.:-", tr: "Büyüklere saygı gösterirsen küçükler de sana saygı gösterir." },
    { s: "مَهْمَا:mz / تَقْرَأْ:nasb / تَزِدْ:cerr / مَعْرِفَتُكَ.:-", tr: "Ne okursan bilgin artar. (تَزِدْ: ecvef, orta harf düştü)", pair: "أَيْنَمَا:mz / تَكُونُوا:nasb / يُدْرِكْكُمُ:cerr / المَوْتُ.:-", pairTr: "Nerede olursanız olun ölüm size yetişir. (Nisâ 78)" }
  ],
  rules: [
    { tr: "İki fiili cezmeden edatlar: <span class=\"ar\">إِنْ، إِذْمَا، مَنْ، مَا، مَهْمَا، مَتَى، أَيَّانَ، أَيْنَ، أَيْنَمَا، أَنَّى، أَيُّ، حَيْثُمَا، كَيْفَمَا</span>. Kitap <span class=\"ar\">إِذَا مَا</span>’yı da sayar; nahivcilerin çoğuna göre onunla cezm şiire özgüdür." },
    { tr: "Anlamları: <span class=\"ar\">مَنْ</span> kim · <span class=\"ar\">مَا، مَهْمَا</span> ne · <span class=\"ar\">مَتَى، أَيَّانَ</span> ne zaman · <span class=\"ar\">أَيْنَ، أَيْنَمَا، أَنَّى، حَيْثُمَا</span> nerede · <span class=\"ar\">كَيْفَمَا</span> nasıl · <span class=\"ar\">أَيُّ</span> hangi · <span class=\"ar\">إِنْ، إِذْمَا</span> eğer." },
    { tr: "Cezm alâmeti: sahih sonlu fiilde <b>sükûn</b> (<span class=\"ar\">يَنْجَحْ</span>), illetli sonda <b>illet harfinin düşmesi</b> (<span class=\"ar\">يَسْعَ، يَدْعُ، يَمْشِ</span>), beş fiilde <b>nûnun düşmesi</b> (<span class=\"ar\">تَكُونِي، يَجْتَهِدُوا</span>):", ex: ["إِنْ تَزُرْنِي أَزُرْكَ · مَنْ يُخْطِئْ نَعْفُ عَنْهُ · إِنْ تَكُونِي حَاسِدَةً تَكُونِي خَاسِرَةً"] },
    { tr: "Ecvef fiilde sükûn gelince orta harf düşer: <span class=\"ar\">يَقُومُ ← يَقُمْ · يَنَامُ ← يَنَمْ · يَزُورُ ← يَزُرْ</span>; alâmet yine sükûndur." }
  ],
  kaide: ["أَدَوَاتٌ تَجْزِمُ فِعْلَيْنِ، وَهِيَ: إِنْ، إِذْمَا، إِذَا مَا، مَنْ، مَا، مَهْمَا، مَتَى، أَيَّانَ، أَيْنَ، أَيْنَمَا، أَنَّى، أَيُّ، حَيْثُمَا، كَيْفَمَا. هَذِهِ الأَدَوَاتُ تَجْزِمُ الفِعْلَيْنِ المُضَارِعَيْنِ اللَّذَيْنِ يَأْتِيَانِ بَعْدَهَا فِي جُمْلَتَيِ الشَّرْطِ وَالجَوَابِ، مِثْلُ: مَنْ يَزْرَعْ يَحْصُدْ، إِنْ تَنَمْ مُبَكِّرًا تَسْتَيْقِظْ مُبَكِّرًا، مَتَى تُسَاعِدِ المُحْتَاجَ يَشْكُرْكَ النَّاسُ، أَيُّ شَخْصٍ يَتَكَبَّرْ يُبْغِضْهُ اللهُ."],
  ex: [
    { type: "classify", extra: true, opts: MN, ar: "مَا مَعْنَى أَدَاةِ الشَّرْطِ؟", tr: "Edat kişi mi, şey mi, zaman mı, mekân mı, başka mı bildirir?", items: CL([
      ["مَنْ", "k", "Kim."], ["مَا", "s", "Ne."], ["مَهْمَا", "s", "Ne … ise."], ["مَتَى", "z", "Ne zaman."], ["أَيَّانَ", "z", "Ne zaman."], ["إِذَا", "z", "-dığı zaman (câzim değil)."],
      ["أَيْنَ", "m", "Nerede."], ["أَيْنَمَا", "m", "Nerede."], ["أَنَّى", "m", "Nerede (nasıl anlamı da var)."], ["حَيْثُمَا", "m", "Her nerede."],
      ["إِنْ", "h", "Eğer."], ["إِذْمَا", "h", "Eğer."], ["كَيْفَمَا", "h", "Nasıl."], ["لَوْ", "h", "Eğer (farazî)."]
    ]) },
    { type: "combo", num: "٢", ar: "شَكِّلِ الجُمَلَ التَّالِيَةَ وَبَيِّنْ عَلَامَةَ جَزْمِ فِعْلِ الشَّرْطِ وَفِعْلِ الجَوَابِ", tr: "Şart fiilinin ve cevabın cezm alâmetini seç.", exHtml: "<span class=\"ar\">إِنْ تَكُنْ نَاصِحًا تُقَدِّرْكَ بِيئَتُكَ ← السُّكُونُ / السُّكُونُ</span>", items: [
      ["مَتَى يُعْلِنِ المُذْنِبُ نَدَمَهُ نَقْبَلْ تَوْبَتَهُ.", "s", "s", "Günahkâr pişmanlığını açıkladığında tövbesini kabul ederiz.", "يُعْلِنِ: ال önünde kesre, alâmet sükûn."],
      ["مَنْ يُخْطِئْ نَعْفُ عَنْ خَطَئِهِ.", "s", "h", "Kim hata ederse hatasını bağışlarız.", "نَعْفُو → نَعْفُ: vâv düştü."],
      ["إِنْ تُقْلِعْ عَنِ المَعْصِيَةِ نُخَلِّ سَبِيلَكَ.", "s", "h", "Günahı bırakırsan yolunu serbest bırakırız.", "نُخَلِّي → نُخَلِّ: yâ düştü."],
      ["مَهْمَا تَنْصَحْ –يَا أُسْتَاذُ– نَعْمَلْ بِنُصْحِكَ.", "s", "s", "Ne öğüt verirsen ver hocam, öğüdünle amel ederiz.", "Sükûn / sükûn."],
      ["إِنْ تَكُونِي حَاسِدَةً تَكُونِي خَاسِرَةً.", "n", "n", "Kıskanç olursan kaybeden olursun.", "تَكُونِينَ → تَكُونِي: nûn düştü."],
      ["إِنْ تَزُرْنِي أَزُرْكَ.", "s", "s", "Beni ziyaret edersen seni ziyaret ederim.", "Ecvef: vâv düştü, alâmet sükûn."],
      ["أَيُّهُمْ يَقُمْ أَقُمْ مَعَهُ.", "s", "s", "Onlardan hangisi kalkarsa onunla kalkarım.", "Ecvef: sükûn."],
      ["أَيَّ يَوْمٍ تَصُمْ أَصُمْ.", "s", "s", "Hangi gün oruç tutarsan ben de tutarım.", "Ecvef: sükûn."]
    ].map(CA) },
    { type: "pick", fill: true, num: "٤", ar: "امْلَإِ الفَرَاغَ بِمَا بَيْنَ القَوْسَيْنِ مَعَ تَغْيِيرِ مَا يَلْزَمُ", tr: "Parantezdeki fiilin şart fiili olarak doğru biçimini seç.", exHtml: "<span class=\"ar\">إِنْ تُمَارِسِ اللُّغَةَ كَثِيرًا تُتْقِنْهَا. (مَارَسَ)</span>", items: PL([
      ["مَنْ ___ عَدُوَّهُ يَنْجُ مِنْ أَذَاهُ. (حَذِرَ)", "يَحْذَرْ", "يَحْذَرُ", "يَحْذَرَ", "Kim düşmanından sakınırsa onun eziyetinden kurtulur.", "Şart fiili meczûm."],
      ["إِنْ ___ نَهَارًا يَسْتَرِحْ لَيْلًا. (تَعِبَ)", "يَتْعَبْ", "يَتْعَبُ", "يَتْعَبَ", "Gündüz yorulursa gece dinlenir.", "Meczûm."],
      ["مَنْ ___ فِي الصَّيْفِ يَعْمَلْ فِي الشِّتَاءِ. (نَامَ)", "يَنَمْ", "يَنَامْ", "يَنَامُ", "Kim yazın uyursa kışın çalışır.", "Ecvef: elif düşer."],
      ["مَا ___ مِنْ خَيْرٍ تَجِدْهُ عِنْدَ اللهِ. (فَعَلَ)", "تَفْعَلْ", "تَفْعَلُ", "يَفْعَلُ", "Ne hayır yaparsan onu Allah katında bulursun.", "Cevap 2. şahıs: تَفْعَلْ."],
      ["مَهْمَا ___ مِنْ سِرٍّ يَعْلَمْهُ اللهُ. (كَتَمَ)", "تَكْتُمْ", "تَكْتُمُ", "تَكْتُمَ", "Hangi sırrı saklarsan Allah onu bilir.", "Meczûm."],
      ["إِذَا ___ العُطْلَةُ فَرِحَ الطُّلَّابُ. (أَتَى)", "أَتَتِ", "تَأْتِ", "أَتَى", "Tatil geldiğinde öğrenciler sevinir.", "إِذَا câzim değil, mâzî; fâil müennes."],
      ["أَنَّى ___ البَرِيدَ الإِلِكْتُرُونِيَّ يَسْتَلِمْهُ صَدِيقُكَ حَالًا. (أَرْسَلَ)", "تُرْسِلِ", "تُرْسِلُ", "تُرْسِلَ", "E-postayı nereye gönderirsen arkadaşın hemen alır.", "Sükûn ال önünde kesreye döner."],
      ["مَتَى ___ الهِلَالُ يَبْدَأْ شَهْرُ رَمَضَانَ. (ظَهَرَ)", "يَظْهَرِ", "يَظْهَرُ", "يَظْهَرَ", "Hilal göründüğünde Ramazan ayı başlar.", "Sükûn → kesre."]
    ])},
    { type: "pick", fill: true, num: "٥", ar: "امْلَإِ الفَرَاغَ بِمَا بَيْنَ القَوْسَيْنِ مَعَ تَغْيِيرِ مَا يَلْزَمُ", tr: "Parantezdeki fiilin cevap olarak doğru biçimini seç.", exHtml: "<span class=\"ar\">إِنْ تُهْمِلْ وَاجِبَكَ تَفْشَلْ فِي حَيَاتِكَ. (فَشِلَ)</span>", items: PL([
      ["مَتَى تَنْتَبِهْ إِلَى شَرْحِ المُعَلِّمِ ___ الدَّرْسَ. (فَهِمَ)", "تَفْهَمِ", "تَفْهَمُ", "تَفْهَمَ", "Öğretmenin anlatımına dikkat ettiğinde dersi anlarsın.", "Sükûn ال önünde kesre."],
      ["إِنْ تُحَافِظْ عَلَى صِحَّتِكَ ___ مِنَ المَرَضِ. (سَلِمَ)", "تَسْلَمْ", "تَسْلَمُ", "سَالِمًا", "Sağlığını korursan hastalıktan korunursun.", "Meczûm."],
      ["مَهْمَا تَقْرَأْ مِنْ كِتَابٍ ___ فِي حَيَاتِكَ. (أَفَادَ)", "يُفِدْكَ", "يُفِيدُكَ", "يُفِيدْكَ", "Hangi kitabı okursan hayatında sana fayda verir.", "Ecvef: yâ düşer."],
      ["إِنْ تُسْرِعْ فِي مَشْيِكَ ___ بِالحَافِلَةِ. (لَحِقَ)", "تَلْحَقْ", "تَلْحَقُ", "تَلْحَقَ", "Hızlı yürürsen otobüse yetişirsin.", "Meczûm."],
      ["أَيَّ عَمَلٍ يَعْمَلِ الوَالِدُ ___ وَلَدُهُ. (قَلَّدَ)", "يُقَلِّدْهُ", "يُقَلِّدُهُ", "يُقَلِّدَهُ", "Baba hangi işi yaparsa oğlu onu taklit eder.", "Meczûm."],
      ["مَنْ يَزْرَعْ شَرًّا ___ شَرًّا. (حَصَدَ)", "يَحْصُدْ", "يَحْصُدُ", "يَحْصُدَ", "Kim kötülük ekerse kötülük biçer.", "Meczûm."],
      ["مَا تَتَعَلَّمْ فِي الصِّغَرِ ___ فِي الكِبَرِ. (نَفَعَ)", "يَنْفَعْكَ", "يَنْفَعُكَ", "يَنْفَعَكَ", "Küçükken ne öğrenirsen büyüyünce sana fayda verir.", "Meczûm."],
      ["مَتَى يَرْتَفِعْ مُسْتَوَى التَّعْلِيمِ ___ الحَضَارَةُ. (زَهَرَ)", "تَزْهَرِ", "تَزْهَرُ", "يَزْهَرُ", "Eğitim seviyesi yükseldiğinde medeniyet parlar.", "Fâil müennes; ال önünde kesre. (تَزْدَهِرِ daha yaygın.)"]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · CÂZİM OLMAYANLAR VE MÂZÎ
{
  id: "u3", no: 3, ar: "الأَدَوَاتُ غَيْرُ الجَازِمَةِ وَالمَاضِي فِي الشَّرْطِ", tr: "Câzim Olmayanlar ve Mâzî ile Şart", short: "إِذَا · لَوْ", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["إِذَا ve لَوْ’nın fiilleri cezmetmediğini bilmek", "Şart fiilinin, cevabın ya da ikisinin mâzî gelebildiğini bilmek", "Cümleleri uygun edatla bağlamak"],
  examples: [
    { s: "إِذَا:mz / هَبَطَتِ:nasb / الطَّائِرَةُ:- / لَجَأَتِ:cerr / الطُّيُورُ إِلَى الشَّجَرِ.:-", tr: "Uçak indiğinde kuşlar ağaçlara sığındı. (câzim değil)" },
    { s: "مَنْ:mz / جَدَّ:nasb / وَجَدَ،:cerr / وَمَنْ:mz / زَرَعَ:nasb / حَصَدَ.:cerr", tr: "Çalışan bulur, eken biçer. (mâzî + mâzî)" }
  ],
  rules: [
    { tr: "<span class=\"ar\">إِذَا</span> ve <span class=\"ar\">لَوْ</span> fiilleri <b>cezmetmez</b>:", ex: ["إِذَا هَبَطَتِ الطَّائِرَةُ لَجَأَتِ الطُّيُورُ إِلَى الشَّجَرِ", "لَوْ يُعَالَجُ المَرِيضُ لَيَسْتَرِيحُ"] },
    { tr: "<span class=\"ar\">إِذَا</span> olması beklenen, <span class=\"ar\">لَوْ</span> gerçekleşmemiş (farazî) şart bildirir. <span class=\"ar\">لَوْ</span>’nın mâzî cevabına çoğunlukla lâm gelir: <span class=\"ar\">لَوْ وَاصَلْتَ سَيْرَكَ لَوَصَلْتَ مُبَكِّرًا</span>." },
    { tr: "Şart fiili, cevap ya da ikisi <b>mâzî</b> olabilir; mâzî fiil mebnîdir, mahallen meczûm sayılır:", ex: ["مَنْ أَرَادَ أَنْ يَنْجَحَ يَجْتَهِدْ · مَنْ يَقُمْ لَيْلَةَ القَدْرِ… غُفِرَ لَهُ", "إِنْ عُدْتُمْ عُدْنَا · مَنْ طَلَبَ العُلَى سَهِرَ اللَّيَالِيَ"] },
    { tr: "Cevap emir, nehy ya da isim cümlesi gibi şart fiili olamayacak bir şeyse başına <span class=\"ar\">فَـ</span> gelir: <span class=\"ar\">مَهْمَا تَكُنْ مِهْنَتُكَ فَتَجَنَّبِ الحَرَامَ</span>." }
  ],
  kaide: ["أَدَوَاتٌ لَا تَجْزِمُ، وَهِيَ: لَوْ، إِذَا. هَذِهِ الأَدَوَاتُ لَا تَجْزِمُ الفِعْلَيْنِ المُضَارِعَيْنِ اللَّذَيْنِ يَأْتِيَانِ بَعْدَهُمَا، مِثْلُ: إِذَا هَبَطَتِ الطَّائِرَةُ لَجَأَتِ الطُّيُورُ إِلَى أَغْصَانِ الشَّجَرِ، لَوْ يُعَالَجُ المَرِيضُ لَيَسْتَرِيحُ.", "وَيَجُوزُ أَنْ يَأْتِيَ فِعْلُ الشَّرْطِ أَوْ جَوَابُهُ أَوْ كِلَاهُمَا بِصِيغَةِ المَاضِي، مِثْلُ: مَنْ أَرَادَ أَنْ يَنْجَحَ يَجْتَهِدِ اللَّيْلَ وَالنَّهَارَ، مَنْ يَقُمْ لَيْلَةَ القَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ، ﴿إِنْ عُدْتُمْ عُدْنَا﴾، مَنْ طَلَبَ العُلَى سَهِرَ اللَّيَالِيَ."],
  ex: [
    { type: "classify", num: "٣", opts: JZ, ar: "عَيِّنْ أَدَاةَ الشَّرْطِ وَبَيِّنِ الجَازِمَ مِنْهَا وَغَيْرَ الجَازِمِ", tr: "Koyu şart edatı câzim mi, değil mi?", exHtml: "<span class=\"ar\">إِنْ تُحْسِنْ إِلَى الفَقِيرِ تَنَلْ رِضَا اللهِ: جَازِمَةٌ · إِذَا جَاءَ القَدَرُ عَمِيَ البَصَرُ: غَيْرُ جَازِمَةٍ</span>", items: CL([
      [HL("مَنْ جَالَ نَالَ", "مَنْ"), "j", "Câzim; fiiller mâzî, mahallen meczûm."],
      [HL("مَا تَدَّخِرْ فِي السَّعَةِ تَجِدْهُ يَوْمَ الشِّدَّةِ", "مَا"), "j", "Câzim."],
      [HL("مَهْمَا تَكُنْ مِهْنَتُكَ فَتَجَنَّبِ الحَرَامَ", "مَهْمَا"), "j", "Câzim. (Kitapta cevapta فَـ yok; emir cevaba فَـ gerekir.)"],
      [HL("حَيْثُمَا تُسَافِرْ تَزْدَدْ ثَقَافَتُكَ", "حَيْثُمَا"), "j", "Câzim."],
      [HL("لَوْ وَاصَلْتَ سَيْرَكَ لَوَصَلْتَ مُبَكِّرًا", "لَوْ"), "g", "Câzim değil."],
      [HL("مَتَى يَصْدُقْ قَوْلُكَ يَكْثُرْ أَصْدِقَاؤُكَ", "مَتَى"), "j", "Câzim."],
      [HL("أَيَّانَ تُنَادِ أُلَبِّ نِدَاءَكَ وَأُجِبْ دَعْوَتَكَ", "أَيَّانَ"), "j", "Câzim: تُنَادِ، أُلَبِّ (yâ düştü)."],
      [HL("أَيَّ بَيْتِنَا تَدْخُلْ تَجِدِ السَّعَةَ وَالرَّاحَةَ", "أَيَّ"), "j", "Câzim."],
      [HL("إِنْ تُحْسِنْ إِلَى الفَقِيرِ تَنَلْ رِضَا اللهِ", "إِنْ"), "j", "Câzim."],
      [HL("إِذَا جَاءَ القَدَرُ عَمِيَ البَصَرُ", "إِذَا"), "g", "Câzim değil."],
      [HL("إِذَا هَبَطَتِ الطَّائِرَةُ لَجَأَتِ الطُّيُورُ إِلَى الشَّجَرِ", "إِذَا"), "g", "Câzim değil."],
      [HL("لَوْ يُعَالَجُ المَرِيضُ لَيَسْتَرِيحُ", "لَوْ"), "g", "Muzâri merfû kaldı."],
      [HL("إِذْمَا تَحْتَرِمِ الكِبَارَ يَحْتَرِمْكَ الصِّغَارُ", "إِذْمَا"), "j", "Câzim."],
      [HL("أَنَّى تَتَجَوَّلْ فِي تُرْكِيَا يُعْجِبْكَ", "أَنَّى"), "j", "Câzim."]
    ]) },
    { type: "pick", extra: true, ar: "مَا صِيغَةُ فِعْلِ الشَّرْطِ وَجَوَابِهِ؟", tr: "Şart fiili ve cevap hangi kalıpta?", items: PL([
      ["مَنْ أَرَادَ أَنْ يَنْجَحَ يَجْتَهِدْ.", "mâzî + muzâri", "muzâri + muzâri", "mâzî + mâzî", "Başarmak isteyen çalışsın.", "أَرَادَ mâzî, يَجْتَهِدْ meczûm muzâri."],
      ["مَنْ يَقُمْ لَيْلَةَ القَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ.", "muzâri + mâzî", "mâzî + mâzî", "muzâri + muzâri", "Kadir gecesini inanarak ve sevabını umarak ihya edenin günahları bağışlanır. (Hadis)", "يَقُمْ muzâri, غُفِرَ mâzî."],
      ["إِنْ عُدْتُمْ عُدْنَا.", "mâzî + mâzî", "muzâri + mâzî", "muzâri + muzâri", "Dönerseniz biz de döneriz. (İsrâ 8)", "İkisi de mâzî."],
      ["مَنْ طَلَبَ العُلَى سَهِرَ اللَّيَالِيَ.", "mâzî + mâzî", "mâzî + muzâri", "muzâri + muzâri", "Yüceliği isteyen gecelerce uykusuz kalır.", "İkisi de mâzî."],
      ["مَنْ جَدَّ وَجَدَ.", "mâzî + mâzî", "muzâri + mâzî", "mâzî + muzâri", "Çalışan bulur.", "İkisi de mâzî."],
      ["إِنْ تَنَمْ مُبَكِّرًا تَسْتَيْقِظْ مُبَكِّرًا.", "muzâri + muzâri", "mâzî + mâzî", "mâzî + muzâri", "Erken yatarsan erken kalkarsın.", "İkisi de meczûm muzâri."]
    ])},
    { type: "pick", num: "٨", ar: "ارْبِطِ الجُمَلَ بِأَدَاةِ شَرْطٍ مُنَاسِبَةٍ مَعَ تَغْيِيرِ مَا يَلْزَمُ", tr: "İki cümleyi uygun edatla bağlayan doğru şart cümlesini seç.", exHtml: "<span class=\"ar\">تَعِيشُونَ عَلَى الطَّاعَةِ / تَمُوتُونَ عَلَى الطَّاعَةِ ← إِنْ تَعِيشُوا عَلَى الطَّاعَةِ تَمُوتُوا عَلَى الطَّاعَةِ</span>", items: PL([
      ["تُوَاصِلُونَ كِفَاحَكُمْ / تَغْلِبُونَ أَعْدَاءَكُمْ", "إِنْ تُوَاصِلُوا كِفَاحَكُمْ تَغْلِبُوا أَعْدَاءَكُمْ.", "إِنْ تُوَاصِلُونَ كِفَاحَكُمْ تَغْلِبُونَ أَعْدَاءَكُمْ.", "إِذَا تُوَاصِلُوا كِفَاحَكُمْ تَغْلِبُوا أَعْدَاءَكُمْ.", "Mücadelenizi sürdürürseniz düşmanlarınızı yenersiniz.", "Beş fiil: nûn düşer; إِذَا cezmetmez."],
      ["نَجَحَ ابْنُهُ فِي الِامْتِحَانِ / امْتَلَأَ قَلْبُهُ سُرُورًا", "إِذَا نَجَحَ ابْنُهُ فِي الِامْتِحَانِ امْتَلَأَ قَلْبُهُ سُرُورًا.", "إِذَا يَنْجَحْ ابْنُهُ فِي الِامْتِحَانِ يَمْتَلِئْ قَلْبُهُ سُرُورًا.", "إِذَا نَجَحَ ابْنُهُ فِي الِامْتِحَانِ يَمْتَلِئْ قَلْبُهُ سُرُورًا.", "Oğlu sınavı kazandığında kalbi sevinçle dolar.", "إِذَا + mâzî; cezm yok."],
      ["تَزْرَعُ الشَّرَّ / تَحْصُدُ النَّدَمَ", "إِنْ تَزْرَعِ الشَّرَّ تَحْصُدِ النَّدَمَ.", "إِنْ تَزْرَعُ الشَّرَّ تَحْصُدُ النَّدَمَ.", "إِنْ تَزْرَعْ الشَّرَّ تَحْصُدْ النَّدَمَ.", "Kötülük ekersen pişmanlık biçersin.", "ال önünde sükûn kesreye döner."],
      ["تَزُورُونَ البَيْتَ الحَرَامَ / تَشْعُرُونَ بِخَشْيَةِ اللهِ", "مَتَى تَزُورُوا البَيْتَ الحَرَامَ تَشْعُرُوا بِخَشْيَةِ اللهِ.", "مَتَى تَزُورُونَ البَيْتَ الحَرَامَ تَشْعُرُونَ بِخَشْيَةِ اللهِ.", "مَتَى تَزُورُوا البَيْتَ الحَرَامَ تَشْعُرُونَ بِخَشْيَةِ اللهِ.", "Beytullah’ı ziyaret ettiğinizde Allah korkusunu hissedersiniz.", "İki fiilde de nûn düşer."],
      ["يَتَّقِي اللهَ / يَفُوزُ بِرِضَائِهِ", "مَنْ يَتَّقِ اللهَ يَفُزْ بِرِضَائِهِ.", "مَنْ يَتَّقِي اللهَ يَفُوزُ بِرِضَائِهِ.", "مَنْ يَتَّقِ اللهَ يَفُوزْ بِرِضَائِهِ.", "Kim Allah’tan korkarsa O’nun rızasını kazanır.", "يَتَّقِ: yâ düşer; يَفُزْ: ecvef."],
      ["تُشْرِقُ الشَّمْسُ / يَنْتَشِرُ الدِّفْءُ", "إِذَا أَشْرَقَتِ الشَّمْسُ انْتَشَرَ الدِّفْءُ.", "إِذَا تُشْرِقْ الشَّمْسُ يَنْتَشِرْ الدِّفْءُ.", "إِنْ تُشْرِقُ الشَّمْسُ يَنْتَشِرُ الدِّفْءُ.", "Güneş doğduğunda sıcaklık yayılır.", "Kesin olacak iş: إِذَا + mâzî."],
      ["نَزَلَ المَطَرُ / عَمَّ الرَّخَاءُ", "إِذَا نَزَلَ المَطَرُ عَمَّ الرَّخَاءُ.", "إِذَا يَنْزِلِ المَطَرُ يَعُمَّ الرَّخَاءُ.", "إِذَا نَزَلَ المَطَرُ لَعَمَّ الرَّخَاءُ.", "Yağmur yağdığında bolluk her yeri kaplar.", "Lâm لَوْ’nın cevabına gelir."],
      ["يَتَّحِدُ المُسْلِمُونَ / يُخِيفُونَ أَعْدَاءَهُمْ", "إِنْ يَتَّحِدِ المُسْلِمُونَ يُخِيفُوا أَعْدَاءَهُمْ.", "إِنْ يَتَّحِدُ المُسْلِمُونَ يُخِيفُونَ أَعْدَاءَهُمْ.", "إِنْ يَتَّحِدْ المُسْلِمُونَ يُخِيفُونَ أَعْدَاءَهُمْ.", "Müslümanlar birleşirse düşmanlarını korkuturlar.", "يَتَّحِدِ: kesre; يُخِيفُوا: nûn düşer."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE KURMA VE TALEP CEVABI
{
  id: "u4", no: 4, ar: "تَكْوِينُ الجُمَلِ الشَّرْطِيَّةِ وَجَوَابُ الطَّلَبِ", tr: "Şart Cümlesi Kurmak ve Talep Cevabı", short: "Cümle kur", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Düz cümleleri şart cümlesine çevirmek", "Edata göre fiillerin doğru biçimini seçmek", "Emir, nehy ve istifhamın cevabında muzâriyi cezmetmek"],
  examples: [
    { s: "مَتَى:mz / تُوَاصِلُوا:nasb / جُهُودَكُمْ:- / تُحَقِّقُوا:cerr / أَهْدَافَكُمْ.:-", tr: "Çabalarınızı sürdürdüğünüzde hedeflerinize ulaşırsınız." },
    { s: "ابْتَسِمْ:- / تَبْتَسِمْ:cerr / لَكَ الحَيَاةُ.:-", tr: "Gülümse, hayat da sana gülümsesin. (emrin cevabı)", pair: "لَا تَقْتَرِبْ مِنَ الأَسَدِ:- / تَسْلَمْ.:cerr", pairTr: "Aslana yaklaşma, selamette kalırsın. (nehyin cevabı)" }
  ],
  rules: [
    { tr: "Cümleyi şarta çevirirken muzâri meczûm olur (<span class=\"ar\">تُوَاصِلُونَ ← تُوَاصِلُوا</span>), illet harfi düşer (<span class=\"ar\">يُطِيعُ ← يُطِعْ</span>), ال’den önce sükûn kesre olur (<span class=\"ar\">يُطِعِ الإِنْسَانُ</span>)." },
    { tr: "Nûn-ı nisve ile biten muzâri mebnîdir, değişmez: <span class=\"ar\">مَتَى تُحَافِظْنَ … تَعِشْنَ</span>." },
    { tr: "<b>Talep cevabı</b>: emir, nehy ya da istifhamdan sonra gelen muzâri meczûm olabilir (gizli bir <span class=\"ar\">إِنْ</span> takdir edilir):", ex: ["ابْتَسِمْ تَبْتَسِمْ لَكَ الحَيَاةُ · صُومُوا تَصِحُّوا · سَلْ تُجَبْ", "لَا تَقْتَرِبْ مِنَ الأَسَدِ تَسْلَمْ · مَا اسْمُكَ أَعْرِفْكَ؟"] }
  ],
  kaide: ["يَجُوزُ جَزْمُ الفِعْلِ المُضَارِعِ فِي جَوَابِ الطَّلَبِ إِذَا سُبِقَ بِأَمْرٍ، مِثْلُ: ابْتَسِمْ تَبْتَسِمْ لَكَ الحَيَاةُ، صُومُوا تَصِحُّوا، احْتَرِمِ النَّاسَ يَحْتَرِمُوكَ، سَلْ تُجَبْ، قُلْ نَسْمَعْ قَوْلَكَ؛ أَوْ نَهْيٍ، مِثْلُ: لَا تَقْتَرِبْ مِنَ الأَسَدِ تَسْلَمْ، لَا تُكْثِرِ العِتَابَ يَكْثُرْ أَصْدِقَاؤُكَ؛ أَوِ اسْتِفْهَامٍ، مِثْلُ: مَا اسْمُكَ أَعْرِفْكَ؟ أَيْنَ الحَدِيقَةُ نَذْهَبْ إِلَيْهَا؟"],
  ex: [
    { type: "pick", num: "٧", ar: "حَوِّلِ الجُمَلَ التَّالِيَةَ إِلَى جُمَلٍ شَرْطِيَّةٍ مُسْتَعِينًا بِمَا بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki edatla kurulan doğru şart cümlesini seç.", exHtml: "<span class=\"ar\">تُوَاصِلُونَ جُهُودَكُمْ. تُحَقِّقُونَ أَهْدَافَكُمْ. (مَتَى) ← مَتَى تُوَاصِلُوا جُهُودَكُمْ تُحَقِّقُوا أَهْدَافَكُمْ.</span>", items: PL([
      ["تُغِيثُ المَلْهُوفَ. تَنَالُ ثَوَابًا جَزِيلًا. (مَنْ)", "مَنْ يُغِثِ المَلْهُوفَ يَنَلْ ثَوَابًا جَزِيلًا.", "مَنْ يُغِيثُ المَلْهُوفَ يَنَالُ ثَوَابًا جَزِيلًا.", "مَنْ يُغِيثْ المَلْهُوفَ يَنَالْ ثَوَابًا جَزِيلًا.", "Kim çaresize yardım ederse büyük sevap kazanır.", "مَنْ 3. şahısla: ecvef fiiller kısalır."],
      ["تُرَاعِي حُقُوقَ الآخَرِينَ. تَحْفَظُ حُقُوقَكَ أَيْضًا. (إِذَا)", "إِذَا رَاعَيْتَ حُقُوقَ الآخَرِينَ حَفِظْتَ حُقُوقَكَ أَيْضًا.", "إِذَا تُرَاعِ حُقُوقَ الآخَرِينَ تَحْفَظْ حُقُوقَكَ أَيْضًا.", "إِذَا رَاعَيْتَ حُقُوقَ الآخَرِينَ تَحْفَظْ حُقُوقَكَ أَيْضًا.", "Başkalarının haklarını gözettiğinde kendi hakkını da korumuş olursun.", "إِذَا cezmetmez; çoğunlukla mâzî."],
      ["تَقْرَئِينَ مِنْ كُتُبِ الرِّوَايَةِ. يَزْدَادُ مُسْتَوَاكِ اللُّغَوِيُّ. (مَهْمَا)", "مَهْمَا تَقْرَئِي مِنْ كُتُبِ الرِّوَايَةِ يَزْدَدْ مُسْتَوَاكِ اللُّغَوِيُّ.", "مَهْمَا تَقْرَئِينَ مِنْ كُتُبِ الرِّوَايَةِ يَزْدَادُ مُسْتَوَاكِ اللُّغَوِيُّ.", "مَهْمَا تَقْرَئِي مِنْ كُتُبِ الرِّوَايَةِ يَزْدَادْ مُسْتَوَاكِ اللُّغَوِيُّ.", "Romanlardan ne okursan dil seviyen artar.", "تَقْرَئِي: nûn düşer; يَزْدَدْ: elif düşer."],
      ["تَقُودُ سَيَّارَتَكَ فِي هُدُوءٍ. تَسِيرُ فِي طَرِيقِكَ بِأَمَانٍ. (إِنْ)", "إِنْ تَقُدْ سَيَّارَتَكَ فِي هُدُوءٍ تَسِرْ فِي طَرِيقِكَ بِأَمَانٍ.", "إِنْ تَقُودْ سَيَّارَتَكَ فِي هُدُوءٍ تَسِيرْ فِي طَرِيقِكَ بِأَمَانٍ.", "إِنْ تَقُودُ سَيَّارَتَكَ فِي هُدُوءٍ تَسِيرُ فِي طَرِيقِكَ بِأَمَانٍ.", "Arabanı sakin kullanırsan yolunda güvenle gidersin.", "Ecvef: orta harf düşer."],
      ["يَنْتَشِرُ الأَمْنُ. تَعِيشُونَ فِي اطْمِئْنَانٍ وَسَلَامٍ. (أَيْنَمَا)", "أَيْنَمَا يَنْتَشِرِ الأَمْنُ تَعِيشُوا فِي اطْمِئْنَانٍ وَسَلَامٍ.", "أَيْنَمَا يَنْتَشِرُ الأَمْنُ تَعِيشُونَ فِي اطْمِئْنَانٍ وَسَلَامٍ.", "أَيْنَمَا يَنْتَشِرْ الأَمْنُ تَعِيشُونَ فِي اطْمِئْنَانٍ وَسَلَامٍ.", "Güvenlik nerede yayılırsa orada huzur ve barış içinde yaşarsınız.", "يَنْتَشِرِ: kesre; تَعِيشُوا: nûn düşer."],
      ["أَيَّتُهَا الفَتَيَاتُ! تُحَافِظْنَ عَلَى نَظَافَةِ البِيئَةِ. تَعِشْنَ فِي صِحَّةٍ. (مَتَى)", "أَيَّتُهَا الفَتَيَاتُ! مَتَى تُحَافِظْنَ عَلَى نَظَافَةِ البِيئَةِ تَعِشْنَ فِي صِحَّةٍ.", "أَيَّتُهَا الفَتَيَاتُ! مَتَى تُحَافِظُوا عَلَى نَظَافَةِ البِيئَةِ تَعِيشُوا فِي صِحَّةٍ.", "أَيَّتُهَا الفَتَيَاتُ! مَتَى تُحَافِظْ عَلَى نَظَافَةِ البِيئَةِ تَعِشْ فِي صِحَّةٍ.", "Kızlar! Çevre temizliğini koruduğunuzda sağlıklı yaşarsınız.", "Nûn-ı nisve: mebnî, mahallen meczûm."],
      ["يُطِيعُ الإِنْسَانُ وَالِدَيْهِ. يَنَالُ رِضَاهُمَا. (إِنْ)", "إِنْ يُطِعِ الإِنْسَانُ وَالِدَيْهِ يَنَلْ رِضَاهُمَا.", "إِنْ يُطِيعُ الإِنْسَانُ وَالِدَيْهِ يَنَالُ رِضَاهُمَا.", "إِنْ يُطِيعْ الإِنْسَانُ وَالِدَيْهِ يَنَالْ رِضَاهُمَا.", "İnsan anne babasına itaat ederse onların rızasını kazanır.", "Ecvef + ال önünde kesre."],
      ["تَشْهَدَانِ لِلَّهِ. يَنْتَصِرُ الحَقُّ. (مَتَى)", "مَتَى تَشْهَدَا لِلَّهِ يَنْتَصِرِ الحَقُّ.", "مَتَى تَشْهَدَانِ لِلَّهِ يَنْتَصِرُ الحَقُّ.", "مَتَى تَشْهَدَا لِلَّهِ يَنْتَصِرْ الحَقُّ.", "Allah için şahitlik ettiğinizde hak galip gelir.", "تَشْهَدَا: nûn düşer; يَنْتَصِرِ: kesre."]
    ])},
    { type: "pick", num: "٩", ar: "امْلَإِ الفَرَاغَ بِجُمَلٍ شَرْطِيَّةٍ مَبْدُوءَةٍ بِالأَدَوَاتِ التَّالِيَةِ مَعَ ضَبْطِهَا", tr: "Edatla doğru kurulmuş ve harekelenmiş şart cümlesini seç.", exHtml: "<span class=\"ar\">إِنْ تَخْدُمْ شَعْبَكَ تُؤَدِّ وَاجِبَكَ نَحْوَهُ.</span>", items: PL([
      ["(مَنْ)", "مَنْ يَصْبِرْ يَظْفَرْ.", "مَنْ يَصْبِرُ يَظْفَرُ.", "مَنْ يَصْبِرْ يَظْفَرُ.", "Sabreden zafere ulaşır.", "İki fiil de meczûm."],
      ["(إِنْ)", "إِنْ تَجْتَهِدْ تَنْجَحْ.", "إِنْ تَجْتَهِدُ تَنْجَحُ.", "إِنْ تَجْتَهِدْ تَنْجَحُ.", "Çalışırsan başarırsın.", "İki fiil de meczûm."],
      ["(أَيَّانَ)", "أَيَّانَ تَأْتِنَا نُكْرِمْكَ.", "أَيَّانَ تَأْتِينَا نُكْرِمُكَ.", "أَيَّانَ تَأْتِنَا نُكْرِمُكَ.", "Ne zaman bize gelirsen sana ikram ederiz.", "تَأْتِي → تَأْتِ."],
      ["(مَا)", "مَا تُقَدِّمْ مِنْ خَيْرٍ تَجِدْهُ.", "مَا تُقَدِّمُ مِنْ خَيْرٍ تَجِدُهُ.", "مَا تُقَدِّمْ مِنْ خَيْرٍ تَجِدُهُ.", "Ne hayır gönderirsen onu bulursun.", "İki fiil de meczûm."],
      ["(مَهْمَا)", "مَهْمَا تَتَعَلَّمْ تَزْدَدْ عِلْمًا.", "مَهْمَا تَتَعَلَّمُ تَزْدَادُ عِلْمًا.", "مَهْمَا تَتَعَلَّمْ تَزْدَادْ عِلْمًا.", "Ne öğrenirsen ilmin artar.", "تَزْدَادُ → تَزْدَدْ."],
      ["(إِذَا)", "إِذَا جَاءَ الرَّبِيعُ تَفَتَّحَتِ الأَزْهَارُ.", "إِذَا يَجِئِ الرَّبِيعُ تَتَفَتَّحِ الأَزْهَارُ.", "إِذَا جَاءَ الرَّبِيعُ لَتَفَتَّحَتِ الأَزْهَارُ.", "Bahar gelince çiçekler açar.", "إِذَا: mâzî, cezm yok, lâm yok."],
      ["(لَوْ)", "لَوْ دَرَسْتَ لَنَجَحْتَ.", "لَوْ تَدْرُسْ تَنْجَحْ.", "لَوْ دَرَسْتَ فَنَجَحْتَ.", "Çalışsaydın başarırdın.", "لَوْ: mâzî + lâm."],
      ["(مَتَى)", "مَتَى تَصْدُقْ تُحْتَرَمْ.", "مَتَى تَصْدُقُ تُحْتَرَمُ.", "مَتَى تَصْدُقْ تُحْتَرَمُ.", "Doğru söylediğinde saygı görürsün.", "İki fiil de meczûm."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "جَوَابُ الطَّلَبِ", tr: "Emir, nehy ya da sorunun cevabındaki muzâriyi doğru biçimde seç.", items: PL([
      ["ابْتَسِمْ ___ لَكَ الحَيَاةُ.", "تَبْتَسِمْ", "تَبْتَسِمُ", "تَبْتَسِمَ", "Gülümse, hayat da sana gülümsesin.", "Emrin cevabı: meczûm."],
      ["صُومُوا ___.", "تَصِحُّوا", "تَصِحُّونَ", "تَصِحُّ", "Oruç tutun, sağlıklı olun.", "Beş fiil: nûn düşer."],
      ["احْتَرِمِ النَّاسَ ___.", "يَحْتَرِمُوكَ", "يَحْتَرِمُونَكَ", "يَحْتَرِمُكَ", "İnsanlara saygı göster, sana saygı göstersinler.", "Nûn düşer."],
      ["سَلْ ___.", "تُجَبْ", "تُجَابُ", "تُجَابْ", "Sor, cevap alırsın.", "Ecvef meçhul: elif düşer."],
      ["لَا تَقْتَرِبْ مِنَ الأَسَدِ ___.", "تَسْلَمْ", "تَسْلَمُ", "تَسْلَمَ", "Aslana yaklaşma, selamette kalırsın.", "Nehyin cevabı."],
      ["مَا اسْمُكَ ___؟", "أَعْرِفْكَ", "أَعْرِفُكَ", "أَعْرِفَكَ", "Adın ne, seni tanıyayım.", "İstifhamın cevabı."],
      ["أَيْنَ الحَدِيقَةُ ___ إِلَيْهَا؟", "نَذْهَبْ", "نَذْهَبُ", "نَذْهَبَ", "Bahçe nerede, oraya gidelim.", "İstifhamın cevabı."],
      ["لَا تُكْثِرِ العِتَابَ ___ أَصْدِقَاؤُكَ.", "يَكْثُرْ", "يَكْثُرُ", "يَكْثُرَ", "Fazla sitem etme, arkadaşların çoğalır.", "Nehyin cevabı."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMA
{
  id: "u5", no: 5, ar: "الشَّرْطُ فِي الآيَاتِ وَالنُّصُوصِ", tr: "Âyetlerde ve Metinlerde Şart", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Âyetlerde edatı, şart fiilini ve cevabı bulmak", "“Bir kızın zekâsı” ve “Hile” metinlerinde şart cümlelerini çıkarmak", "Şart edatına benzeyen kelimeleri (لَوْ vasliyye, zâid إِنْ) ayırmak"],
  examples: [
    { s: "فَمَنْ:mz / يَعْمَلْ:nasb / مِثْقَالَ ذَرَّةٍ خَيْرًا:- / يَرَهُ.:cerr", tr: "Kim zerre ağırlığınca hayır işlerse onu görür. (Zilzâl 7)" },
    { s: "إِنْ:mz / أَقِفْ:nasb / يَصِلْ:cerr / إِلَيَّ الأَسَدُ.:-", tr: "Durursam aslan bana ulaşır." }
  ],
  rules: [
    { tr: "Âyetlerde cevap çoğu zaman illetli fiildir: <span class=\"ar\">يَرَهُ</span> (يَرَى’dan, elif düştü), <span class=\"ar\">نُؤْتِهِ، يُؤْتِكُمْ</span> (yâ düştü), <span class=\"ar\">يُجْزَ، يُوَفَّ</span> (elif düştü)." },
    { tr: "Cevaba atfedilen fiil de meczûmdur: <span class=\"ar\">يُؤْتِكُمْ خَيْرًا… وَيَغْفِرْ لَكُمْ</span>." },
    { tr: "<span class=\"ar\">وَلَوْ كُنْتُمْ فِي بُرُوجٍ</span>’daki <span class=\"ar\">لَوْ</span> “-se bile” anlamındadır; <span class=\"ar\">وَمَا إِنْ حَزَّ … حَتَّى</span>’deki <span class=\"ar\">إِنْ</span> zâiddir, şart edatı değildir." }
  ],
  kaide: ["عَيِّنْ أَدَاةَ الشَّرْطِ وَفِعْلَ الشَّرْطِ وَجَوَابَ الشَّرْطِ فِي الآيَاتِ القُرْآنِيَّةِ وَفِي النُّصُوصِ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "١٠", ar: "عَيِّنْ فِي الآيَاتِ القُرْآنِيَّةِ التَّالِيَةِ أَدَاةَ الشَّرْطِ وَفِعْلَ الشَّرْطِ وَجَوَابَ الشَّرْطِ", tr: "Edatı, şart fiilini ve cevabı etiketle; kalanlar Başka.", items: [
      T("فَمَنْ:mz / يَعْمَلْ:nasb / مِثْقَالَ ذَرَّةٍ خَيْرًا:x / يَرَهُ:cerr / وَمَنْ:mz / يَعْمَلْ:nasb / مِثْقَالَ ذَرَّةٍ شَرًّا:x / يَرَهُ:cerr", "Kim zerre ağırlığınca hayır işlerse onu görür; kim zerre ağırlığınca şer işlerse onu görür. (Zilzâl 7-8)", "يَرَى → يَرَ + هُ: elif düştü."),
      T("مَنْ:mz / كَانَ:nasb / يُرِيدُ حَرْثَ الآخِرَةِ:x / نَزِدْ:cerr / لَهُ فِي حَرْثِهِ:x / وَمَنْ:mz / كَانَ:nasb / يُرِيدُ حَرْثَ الدُّنْيَا:x / نُؤْتِهِ:cerr / مِنْهَا:x", "Kim ahiret kazancını isterse kazancını artırırız; kim dünya kazancını isterse ondan veririz. (Şûrâ 20)", "Şart fiili mâzî (كَانَ); نَزِدْ ecvef, نُؤْتِ yâ düştü. (Kitapta مِنَهَا yazılmış.)"),
      T("أَيْنَمَا:mz / تَكُونُوا:nasb / يُدْرِكْكُمُ:cerr / المَوْتُ وَلَوْ كُنْتُمْ فِي بُرُوجٍ مُشَيَّدَةٍ:x / وَإِنْ:mz / تُصِبْهُمْ:nasb / حَسَنَةٌ:x / يَقُولُوا:cerr / هَذِهِ مِنْ عِنْدِ اللهِ:x", "Nerede olursanız olun, sağlam kaleler içinde bile olsanız ölüm size yetişir. Onlara bir iyilik dokunursa “Bu Allah’tandır” derler. (Nisâ 78)", "Kitapta kaynak Bakara 197 yazılmış; doğrusu Nisâ 78. لَوْ burada “-se bile” anlamında."),
      T("إِنْ:mz / يَعْلَمِ:nasb / اللهُ فِي قُلُوبِكُمْ خَيْرًا:x / يُؤْتِكُمْ:cerr / خَيْرًا مِمَّا أُخِذَ مِنْكُمْ:x / وَيَغْفِرْ:cerr / لَكُمْ:x", "Allah kalplerinizde bir hayır bilirse sizden alınandan daha hayırlısını verir ve sizi bağışlar. (Enfâl 70)", "يُؤْتِ: yâ düştü; يَغْفِرْ cevaba atıf."),
      T("وَمَا:mz / تَفْعَلُوا:nasb / مِنْ خَيْرٍ:x / يَعْلَمْهُ:cerr / اللهُ:x", "Ne hayır yaparsanız Allah onu bilir. (Bakara 197)", "تَفْعَلُوا: nûn düştü."),
      T("مَنْ:mz / يَعْمَلْ:nasb / سُوءًا:x / يُجْزَ:cerr / بِهِ:x", "Kim kötülük yaparsa onunla cezalandırılır. (Nisâ 123)", "يُجْزَى → يُجْزَ."),
      T("مَنْ:mz / يَشَإِ:nasb / اللهُ:x / يُضْلِلْهُ:cerr / وَمَنْ:mz / يَشَأْ:nasb / يَجْعَلْهُ:cerr / عَلَى صِرَاطٍ مُسْتَقِيمٍ:x", "Allah kimi dilerse saptırır, kimi dilerse dosdoğru yol üzerine koyar. (En’âm 39)", "يَشَاءُ → يَشَأْ; ال önünde kesre."),
      T("وَمَا:mz / تُنْفِقُوا:nasb / مِنْ شَيْءٍ فِي سَبِيلِ اللهِ:x / يُوَفَّ:cerr / إِلَيْكُمْ وَأَنْتُمْ لَا تُظْلَمُونَ:x", "Allah yolunda ne harcarsanız size tam olarak ödenir ve haksızlığa uğratılmazsınız. (Enfâl 60)", "يُوَفَّى → يُوَفَّ.")
    ]},
    { type: "reading", num: "٦", ar: "اقْرَأِ النَّصَّ الآتِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ الجُمَلَ الشَّرْطِيَّةَ وَعَيِّنْ فِعْلَهَا وَجَوَابَهَا", tr: "Metni oku, soruları cevapla; sonra koyu kelimeyi sınıflandır.", title: "ذَكَاءُ فَتَاةٍ",
      text: "اشْتَدَّ العَطَشُ بِأَعْرَابِيٍّ فِي الصَّحْرَاءِ، وَأَحَسَّ بِأَنَّهُ إِذَا تَقَدَّمَ خُطْوَةً أُخْرَى هَلَكَ، وَنَظَرَ فَرَأَى خَيْمَةً قَرِيبَةً مِنْهُ، فَاتَّجَهَ إِلَيْهَا وَطَلَبَ مَاءً، فَقَدَّمَتْ لَهُ فَتَاةٌ كُوبَ مَاءٍ بَارِدٍ، وَلَكِنَّهَا وَضَعَتْ عَلَيْهِ بَعْضَ العُشْبِ الجَافِّ. فَأَخَذَ الرَّجُلُ يُبْعِدُ العُشْبَ وَيَشْرَبُ المَاءَ فِي هُدُوءٍ، ثُمَّ قَالَ لَهَا: مَنْ يُقَدِّمْ خَيْرًا يَجْعَلْهُ نَقِيًّا، فَلِمَ وَضَعْتِ العُشْبَ فِي المَاءِ؟<br>قَالَتْ: رَأَيْتُكَ ظَمْآنَ، وَلَوْ وَجَدْتَ المَاءَ نَقِيًّا لَشَرِبْتَهُ دَفْعَةً وَاحِدَةً فَتُصَابَ بِسُوءٍ. فَلَمَّا سَمِعَ الأَعْرَابِيُّ كَلَامَهَا حَيَّاهَا، وَشَكَرَ لَهَا حُسْنَ صَنِيعِهَا.",
      textTr: "Çölde bir bedevînin susuzluğu arttı; bir adım daha atarsa öleceğini hissetti. Baktı, yakınında bir çadır gördü; oraya yöneldi ve su istedi. Bir kız ona bir bardak soğuk su verdi, ama üzerine biraz kuru ot koydu. Adam otları kenara iterek suyu yavaş yavaş içti, sonra kıza: “İyilik yapan onu katıksız yapar; suya niçin ot koydun?” dedi. Kız: “Seni susamış gördüm; suyu temiz bulsaydın bir dikişte içerdin de başına bir kötülük gelirdi” dedi. Bedevî onun sözünü duyunca ona selam verdi ve güzel davranışı için teşekkür etti.",
      qa: [
        { q: "مَاذَا أَحَسَّ الأَعْرَابِيُّ فِي الصَّحْرَاءِ؟", a: "أَحَسَّ بِأَنَّهُ إِذَا تَقَدَّمَ خُطْوَةً أُخْرَى هَلَكَ.", tr: "Bedevî çölde ne hissetti? Bir adım daha atarsa öleceğini." },
        { q: "مَاذَا قَدَّمَتْ لَهُ الفَتَاةُ؟", a: "كُوبَ مَاءٍ بَارِدٍ وَضَعَتْ عَلَيْهِ بَعْضَ العُشْبِ الجَافِّ.", tr: "Kız ona ne verdi? Üzerine kuru ot koyduğu bir bardak soğuk su." },
        { q: "لِمَاذَا وَضَعَتِ العُشْبَ فِي المَاءِ؟", a: "لِأَنَّهُ لَوْ وَجَدَ المَاءَ نَقِيًّا لَشَرِبَهُ دَفْعَةً وَاحِدَةً فَأُصِيبَ بِسُوءٍ.", tr: "Suya niçin ot koydu? Suyu temiz bulsa bir dikişte içip zarar göreceği için." },
        { q: "مَاذَا فَعَلَ الأَعْرَابِيُّ بَعْدَ أَنْ سَمِعَ كَلَامَهَا؟", a: "حَيَّاهَا وَشَكَرَ لَهَا حُسْنَ صَنِيعِهَا.", tr: "Bedevî onun sözünü duyunca ne yaptı? Selam verip teşekkür etti." }
      ],
      cls: { opts: SP, ar: "اسْتَخْرِجِ الجُمَلَ الشَّرْطِيَّةَ", tr: "Koyu kelime şart edatı mı, şart fiili mi, cevap mı, başka mı?", items: [
        { s: HL("وَأَحَسَّ بِأَنَّهُ إِذَا تَقَدَّمَ خُطْوَةً", "إِذَا"), a: "e", why: "Câzim olmayan edat." },
        { s: HL("إِذَا تَقَدَّمَ خُطْوَةً أُخْرَى هَلَكَ", "تَقَدَّمَ"), a: "f", why: "Mâzî şart fiili." },
        { s: HL("إِذَا تَقَدَّمَ خُطْوَةً أُخْرَى هَلَكَ", "هَلَكَ"), a: "c", why: "Mâzî cevap." },
        { s: HL("مَنْ يُقَدِّمْ خَيْرًا يَجْعَلْهُ نَقِيًّا", "مَنْ"), a: "e", why: "Câzim edat." },
        { s: HL("مَنْ يُقَدِّمْ خَيْرًا يَجْعَلْهُ نَقِيًّا", "يُقَدِّمْ"), a: "f", why: "Meczûm şart fiili." },
        { s: HL("مَنْ يُقَدِّمْ خَيْرًا يَجْعَلْهُ نَقِيًّا", "يَجْعَلْهُ"), a: "c", why: "Meczûm cevap." },
        { s: HL("وَلَوْ وَجَدْتَ المَاءَ نَقِيًّا", "وَلَوْ"), a: "e", why: "لَوْ: câzim değil." },
        { s: HL("وَلَوْ وَجَدْتَ المَاءَ نَقِيًّا", "وَجَدْتَ"), a: "f", why: "Şart fiili." },
        { s: HL("لَشَرِبْتَهُ دَفْعَةً وَاحِدَةً", "لَشَرِبْتَهُ"), a: "c", why: "لَوْ’nın cevabı, lâmlı." },
        { s: HL("دَفْعَةً وَاحِدَةً فَتُصَابَ بِسُوءٍ", "فَتُصَابَ"), a: "x", why: "Cevaba bağlı fiil." },
        { s: HL("فَأَخَذَ الرَّجُلُ يُبْعِدُ العُشْبَ", "فَأَخَذَ"), a: "x", why: "Şurû’ fiili." }
      ]}
    },
    { type: "reading", num: "١١", ar: "عَيِّنْ فِي النَّصِّ التَّالِي أَدَاةَ الشَّرْطِ وَفِعْلَهُ وَجَوَابَهُ", tr: "Metni oku, soruları cevapla; sonra koyu kelimeyi sınıflandır.", title: "الحِيلَةُ",
      text: "مَشَى رَجُلٌ فِي غَابَةٍ، فَرَأَى أَسَدًا يَتَّجِهُ نَحْوَهُ، فَقَالَ الرَّجُلُ فِي نَفْسِهِ: إِنْ أَقِفْ يَصِلْ إِلَيَّ الأَسَدُ وَيَأْكُلْنِي، وَإِنْ أَجْرِ بِسُرْعَةٍ يَعْدُ الأَسَدُ بِسُرْعَةٍ وَيَهْجُمْ عَلَيَّ. ثُمَّ قَالَ: مَنْ يُفَكِّرْ جَيِّدًا يَجِدْ حِيلَةً نَافِعَةً. فَوَجَدَ أَمَامَهُ شَجَرَةً عَالِيَةً فَتَسَلَّقَهَا. جَاءَ الأَسَدُ وَجَلَسَ تَحْتَ الشَّجَرَةِ، فَقَالَ الرَّجُلُ فِي نَفْسِهِ: مَهْمَا يُحَاوِلْ ذَلِكَ الأَسَدُ أَنْ يَتَسَلَّقَ الشَّجَرَةَ يَسْقُطْ، وَلَنْ يَسْتَطِيعَ أَنْ يَأْكُلَنِي.<br>فَكَّرَ الرَّجُلُ مَرَّةً ثَانِيَةً وَقَالَ: مَتَى يَأْتِ اللَّيْلُ أَشْعُرْ بِالنَّوْمِ، وَأَخْشَى أَنْ أَنَامَ فَأَسْقُطَ عَلَى الأَرْضِ، وَمَا أَفْعَلْهُ قَبْلَ أَنْ يَحُلَّ الظَّلَامُ يُسَاعِدْ عَلَى نَجَاتِي.<br>رَأَى الرَّجُلُ فَوْقَ الشَّجَرَةِ دُبًّا فَقَالَ: لَقَدْ وَجَدْتُهَا! وَأَخْرَجَ مِنْ جَيْبِهِ آلَةً تُشْبِهُ المِنْشَارَ، وَأَخَذَ يَحُزُّ غُصْنَ الشَّجَرَةِ الَّذِي يَقِفُ الدُّبُّ عَلَيْهِ، وَمَا إِنْ حَزَّ نِصْفَهُ حَتَّى انْكَسَرَ الغُصْنُ وَسَقَطَ الدُّبُّ أَمَامَ الأَسَدِ. وَدَارَتْ بَيْنَ الأَسَدِ وَالدُّبِّ مَعْرَكَةٌ عَنِيفَةٌ فَرَّ الدُّبُّ بَعْدَهَا جَرِيحًا، وَاسْتَلْقَى الأَسَدُ عَلَى الأَرْضِ مُتْعَبًا مُرْهَقًا مُغْمَضَ العَيْنَيْنِ.<br>نَزَلَ الرَّجُلُ مِنَ الشَّجَرَةِ بِسُرْعَةٍ، وَنَظَرَ إِلَى الأَسَدِ وَقَالَ لَهُ: الحَمْدُ لِلَّهِ! أَيْنَمَا أَذْهَبِ الآنَ أَنْجُ مِنْ شَرِّكَ.",
      textTr: "Bir adam ormanda yürürken kendisine doğru gelen bir aslan gördü ve içinden: “Durursam aslan bana ulaşıp beni yer; hızla koşarsam aslan da hızla koşup üzerime saldırır” dedi. Sonra: “İyi düşünen faydalı bir çare bulur” dedi. Önünde yüksek bir ağaç gördü ve ona tırmandı. Aslan gelip ağacın altına oturdu. Adam içinden: “O aslan ağaca tırmanmayı ne kadar denerse düşer; beni yiyemez” dedi. Sonra yine düşündü: “Gece gelince uykum gelir, uyuyup yere düşmekten korkarım; karanlık çökmeden ne yaparsam kurtuluşuma yardım eder.” Ağacın üstünde bir ayı gördü: “Buldum!” dedi. Cebinden testereye benzer bir alet çıkardı, ayının durduğu dalı kesmeye başladı; yarısını keser kesmez dal kırıldı ve ayı aslanın önüne düştü. Aslanla ayı arasında şiddetli bir kavga oldu; ayı yaralı kaçtı, aslan da yorgun, bitkin, gözleri kapalı yere uzandı. Adam hızla ağaçtan indi, aslana bakıp: “Allah’a hamd olsun! Artık nereye gidersem senin şerrinden kurtulurum” dedi.",
      qa: [
        { q: "مَاذَا رَأَى الرَّجُلُ فِي الغَابَةِ؟", a: "رَأَى أَسَدًا يَتَّجِهُ نَحْوَهُ.", tr: "Adam ormanda ne gördü? Kendisine doğru gelen bir aslan." },
        { q: "لِمَاذَا لَمْ يَقِفْ وَلَمْ يَجْرِ؟", a: "لِأَنَّهُ إِنْ يَقِفْ يَصِلْ إِلَيْهِ الأَسَدُ، وَإِنْ يَجْرِ يَعْدُ الأَسَدُ وَيَهْجُمْ عَلَيْهِ.", tr: "Niçin ne durdu ne koştu? Durursa aslan ona ulaşacak, koşarsa aslan da koşup saldıracaktı." },
        { q: "أَيْنَ اخْتَبَأَ الرَّجُلُ؟", a: "تَسَلَّقَ شَجَرَةً عَالِيَةً.", tr: "Adam nereye saklandı? Yüksek bir ağaca tırmandı." },
        { q: "كَيْفَ نَجَا الرَّجُلُ مِنَ الأَسَدِ؟", a: "حَزَّ الغُصْنَ فَسَقَطَ الدُّبُّ أَمَامَ الأَسَدِ، فَتَعَارَكَا حَتَّى تَعِبَ الأَسَدُ.", tr: "Adam aslandan nasıl kurtuldu? Dalı kesti, ayı aslanın önüne düştü; kavga ettiler ve aslan yoruldu." }
      ],
      cls: { opts: SP, ar: "عَيِّنْ أَدَاةَ الشَّرْطِ وَفِعْلَهُ وَجَوَابَهُ", tr: "Koyu kelime şart edatı mı, şart fiili mi, cevap mı, başka mı?", items: [
        { s: HL("إِنْ أَقِفْ يَصِلْ إِلَيَّ الأَسَدُ", "أَقِفْ"), a: "f", why: "Meczûm şart fiili (ecvef)." },
        { s: HL("إِنْ أَقِفْ يَصِلْ إِلَيَّ الأَسَدُ", "يَصِلْ"), a: "c", why: "Meczûm cevap." },
        { s: HL("وَإِنْ أَجْرِ بِسُرْعَةٍ يَعْدُ الأَسَدُ", "أَجْرِ"), a: "f", why: "Yâ düştü." },
        { s: HL("وَإِنْ أَجْرِ بِسُرْعَةٍ يَعْدُ الأَسَدُ", "يَعْدُ"), a: "c", why: "Vâv düştü." },
        { s: HL("مَنْ يُفَكِّرْ جَيِّدًا يَجِدْ حِيلَةً", "مَنْ"), a: "e", why: "Câzim edat." },
        { s: HL("مَهْمَا يُحَاوِلْ ذَلِكَ الأَسَدُ", "مَهْمَا"), a: "e", why: "Câzim edat." },
        { s: HL("أَنْ يَتَسَلَّقَ الشَّجَرَةَ يَسْقُطْ", "يَسْقُطْ"), a: "c", why: "مَهْمَا’nın cevabı." },
        { s: HL("مَتَى يَأْتِ اللَّيْلُ أَشْعُرْ بِالنَّوْمِ", "يَأْتِ"), a: "f", why: "Yâ düştü." },
        { s: HL("مَتَى يَأْتِ اللَّيْلُ أَشْعُرْ بِالنَّوْمِ", "أَشْعُرْ"), a: "c", why: "Meczûm cevap." },
        { s: HL("وَمَا أَفْعَلْهُ قَبْلَ أَنْ يَحُلَّ الظَّلَامُ", "أَفْعَلْهُ"), a: "f", why: "مَا’nın şart fiili." },
        { s: HL("أَيْنَمَا أَذْهَبِ الآنَ أَنْجُ مِنْ شَرِّكَ", "أَيْنَمَا"), a: "e", why: "Câzim edat." },
        { s: HL("أَيْنَمَا أَذْهَبِ الآنَ أَنْجُ مِنْ شَرِّكَ", "أَنْجُ"), a: "c", why: "أَنْجُو → أَنْجُ." },
        { s: HL("وَمَا إِنْ حَزَّ نِصْفَهُ حَتَّى انْكَسَرَ", "إِنْ"), a: "x", why: "Zâid إِنْ: şart değil." },
        { s: HL("أَنْ أَنَامَ فَأَسْقُطَ عَلَى الأَرْضِ", "فَأَسْقُطَ"), a: "x", why: "أَنْ’e atıf, mansûb." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["مَنْ يَزْرَعْ {يَحْصُدْ}.", ["يَحْصُدْ", "يَحْصُدُ", "يَحْصُدَ"], "cevap meczûm", "Kim ekerse biçer.", "u1"],
  ["مَنْ يَكْسَلْ {يَفْشَلْ}.", ["يَفْشَلْ", "يَفْشَلُ", "فَاشِلٌ"], "cevap meczûm", "Tembellik eden başarısız olur.", "u1"],
  ["مَنْ يُرِدِ اللهُ بِهِ خَيْرًا {يُفَقِّهْهُ} فِي الدِّينِ.", ["يُفَقِّهْهُ", "يُفَقِّهُهُ", "يُفَقِّهَهُ"], "cevap meczûm", "Allah kimin hayrını dilerse onu dinde anlayışlı kılar.", "u1"],
  ["{مَتَى} تَسْتَجِبْ لِنُصْحِ وَالِدَيْكَ تَسْعَدْ.", ["مَتَى", "إِذَا", "لَوْ"], "câzim edat", "Anne babanın öğüdüne uyduğunda mutlu olursun.", "u1"],
  ["مَنْ {يَشْكُرِ} اللهَ يَزِدْهُ.", ["يَشْكُرِ", "يَشْكُرُ", "يَشْكُرْ"], "sükûn → kesre (ال önünde)", "Allah’a şükredeni Allah artırır.", "u1"],
  ["إِنْ تَزُرْنِي {أَزُرْكَ}.", ["أَزُرْكَ", "أَزُورُكَ", "أَزُورْكَ"], "ecvef: vâv düşer", "Beni ziyaret edersen seni ziyaret ederim.", "u2"],
  ["إِنْ تَكُونِي حَاسِدَةً {تَكُونِي} خَاسِرَةً.", ["تَكُونِي", "تَكُونِينَ", "تَكُونِ"], "nûn düşer", "Kıskanç olursan kaybedersin.", "u2"],
  ["مَنْ يُخْطِئْ {نَعْفُ} عَنْ خَطَئِهِ.", ["نَعْفُ", "نَعْفُو", "نَعْفُوْ"], "illet harfi düşer", "Hata edeni bağışlarız.", "u2"],
  ["إِنْ تُقْلِعْ عَنِ المَعْصِيَةِ {نُخَلِّ} سَبِيلَكَ.", ["نُخَلِّ", "نُخَلِّي", "نُخَلِّيْ"], "yâ düşer", "Günahı bırakırsan yolunu açarız.", "u2"],
  ["مَهْمَا تَقْرَأْ {تَزِدْ} مَعْرِفَتُكَ.", ["تَزِدْ", "تَزِيدُ", "تَزِيدْ"], "ecvef: yâ düşer", "Ne okursan bilgin artar.", "u2"],
  ["أَيَّ يَوْمٍ {تَصُمْ} أَصُمْ.", ["تَصُمْ", "تَصُومُ", "تَصُومْ"], "ecvef: vâv düşer", "Hangi gün oruç tutarsan ben de tutarım.", "u2"],
  ["{إِذَا} جَاءَ القَدَرُ عَمِيَ البَصَرُ.", ["إِذَا", "لَوْ", "أَيْنَمَا"], "câzim olmayan", "Kader gelince göz kör olur.", "u3"],
  ["لَوْ وَاصَلْتَ سَيْرَكَ {لَوَصَلْتَ} مُبَكِّرًا.", ["لَوَصَلْتَ", "تَصِلْ", "فَتَصِلْ"], "لَوْ: lâmlı mâzî", "Yürümeye devam etseydin erken varırdın.", "u3"],
  ["إِذَا نَزَلَ المَطَرُ {عَمَّ} الرَّخَاءُ.", ["عَمَّ", "يَعُمَّ", "لَعَمَّ"], "إِذَا: mâzî", "Yağmur yağınca bolluk olur.", "u3"],
  ["مَنْ يَقُمْ لَيْلَةَ القَدْرِ إِيمَانًا وَاحْتِسَابًا {غُفِرَ} لَهُ.", ["غُفِرَ", "يُغْفَرُ", "يُغْفَرَ"], "mâzî cevap", "Kadir gecesini ihya edenin günahları bağışlanır.", "u3"],
  ["مَهْمَا تَكُنْ مِهْنَتُكَ {فَتَجَنَّبِ} الحَرَامَ.", ["فَتَجَنَّبِ", "تَتَجَنَّبُ", "تَجَنَّبُ"], "emir cevap: فَـ ile", "Mesleğin ne olursa olsun haramdan sakın.", "u3"],
  ["ابْتَسِمْ {تَبْتَسِمْ} لَكَ الحَيَاةُ.", ["تَبْتَسِمْ", "تَبْتَسِمُ", "تَبْتَسِمَ"], "emrin cevabı", "Gülümse, hayat sana gülümsesin.", "u4"],
  ["صُومُوا {تَصِحُّوا}.", ["تَصِحُّوا", "تَصِحُّونَ", "تَصِحُّ"], "nûn düşer", "Oruç tutun, sağlıklı olun.", "u4"],
  ["سَلْ {تُجَبْ}.", ["تُجَبْ", "تُجَابُ", "تُجَابْ"], "elif düşer", "Sor, cevap alırsın.", "u4"],
  ["مَنْ {يَتَّقِ} اللهَ يَفُزْ بِرِضَائِهِ.", ["يَتَّقِ", "يَتَّقِي", "يَتَّقِيْ"], "yâ düşer", "Allah’tan korkan O’nun rızasını kazanır.", "u4"],
  ["إِنْ يُطِعِ الإِنْسَانُ وَالِدَيْهِ {يَنَلْ} رِضَاهُمَا.", ["يَنَلْ", "يَنَالُ", "يَنَالْ"], "ecvef: elif düşer", "Anne babasına itaat eden rızalarını kazanır.", "u4"],
  ["فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا {يَرَهُ}.", ["يَرَهُ", "يَرَاهُ", "يَرْهُ"], "elif düşer", "Zerre kadar hayır işleyen onu görür.", "u5"],
  ["أَيْنَمَا تَكُونُوا {يُدْرِكْكُمُ} المَوْتُ.", ["يُدْرِكْكُمُ", "يُدْرِكُكُمُ", "يُدْرِكَكُمُ"], "sükûn", "Nerede olursanız ölüm size yetişir.", "u5"],
  ["مَنْ يَشَإِ اللهُ {يُضْلِلْهُ}.", ["يُضْلِلْهُ", "يُضِلُّهُ", "يُضْلِلُهُ"], "fekk ile cezm", "Allah kimi dilerse saptırır.", "u5"],
  ["إِنْ {أَقِفْ} يَصِلْ إِلَيَّ الأَسَدُ.", ["أَقِفْ", "أَقِفُ", "أَوْقِفْ"], "şart fiili meczûm", "Durursam aslan bana ulaşır.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["يَزْرَعُ / يَحْصُدُ ← مَنْ ile", "مَنْ يَزْرَعْ يَحْصُدْ", "مَنْ يَزْرَعُ يَحْصُدُ", "مَنْ يَزْرَعْ يَحْصُدُ", "İki fiil de meczûm.", "u1"],
  ["تَنَامُ مُبَكِّرًا / تَسْتَيْقِظُ مُبَكِّرًا ← إِنْ ile", "إِنْ تَنَمْ مُبَكِّرًا تَسْتَيْقِظْ مُبَكِّرًا", "إِنْ تَنَامْ مُبَكِّرًا تَسْتَيْقِظْ مُبَكِّرًا", "إِنْ تَنَامُ مُبَكِّرًا تَسْتَيْقِظُ مُبَكِّرًا", "Ecvef: orta harf düşer.", "u2"],
  ["تَزُورُنِي / أَزُورُكَ ← إِنْ ile", "إِنْ تَزُرْنِي أَزُرْكَ", "إِنْ تَزُورْنِي أَزُورْكَ", "إِنْ تَزُورُنِي أَزُورُكَ", "Ecvef: vâv düşer.", "u2"],
  ["يَسْعَى / يَصِلُ ← مَنْ ile", "مَنْ يَسْعَ يَصِلْ", "مَنْ يَسْعَى يَصِلُ", "مَنْ يَسْعَى يَصِلْ", "Nâkıs: elif düşer.", "u2"],
  ["تَدْعُو رَبَّكَ / يُجِيبُكَ ← مَتَى ile", "مَتَى تَدْعُ رَبَّكَ يُجِبْكَ", "مَتَى تَدْعُو رَبَّكَ يُجِيبُكَ", "مَتَى تَدْعُ رَبَّكَ يُجِيبْكَ", "Vâv ve yâ düşer.", "u2"],
  ["تَكُونِينَ صَادِقَةً / تَكُونِينَ مَحْبُوبَةً ← إِنْ ile", "إِنْ تَكُونِي صَادِقَةً تَكُونِي مَحْبُوبَةً", "إِنْ تَكُونِينَ صَادِقَةً تَكُونِينَ مَحْبُوبَةً", "إِنْ تَكُونْ صَادِقَةً تَكُونْ مَحْبُوبَةً", "Beş fiil: nûn düşer.", "u2"],
  ["نَزَلَ المَطَرُ / عَمَّ الرَّخَاءُ ← إِذَا ile", "إِذَا نَزَلَ المَطَرُ عَمَّ الرَّخَاءُ", "إِذَا يَنْزِلِ المَطَرُ يَعُمَّ الرَّخَاءُ", "إِذَا نَزَلَ المَطَرُ لَعَمَّ الرَّخَاءُ", "إِذَا cezmetmez; mâzî.", "u3"],
  ["وَاصَلْتَ سَيْرَكَ / وَصَلْتَ ← لَوْ ile", "لَوْ وَاصَلْتَ سَيْرَكَ لَوَصَلْتَ", "لَوْ تُوَاصِلْ سَيْرَكَ تَصِلْ", "لَوْ وَاصَلْتَ سَيْرَكَ فَوَصَلْتَ", "لَوْ: cevaba lâm.", "u3"],
  ["تُوَاصِلُونَ / تُحَقِّقُونَ ← مَتَى ile", "مَتَى تُوَاصِلُوا تُحَقِّقُوا", "مَتَى تُوَاصِلُونَ تُحَقِّقُونَ", "مَتَى تُوَاصِلُوا تُحَقِّقُونَ", "İki fiilde de nûn düşer.", "u4"],
  ["يَتَّقِي اللهَ / يَفُوزُ ← مَنْ ile", "مَنْ يَتَّقِ اللهَ يَفُزْ", "مَنْ يَتَّقِي اللهَ يَفُوزُ", "مَنْ يَتَّقِ اللهَ يَفُوزْ", "Yâ düşer; ecvef kısalır.", "u4"],
  ["يَتَّحِدُ المُسْلِمُونَ / يُخِيفُونَ أَعْدَاءَهُمْ ← إِنْ ile", "إِنْ يَتَّحِدِ المُسْلِمُونَ يُخِيفُوا أَعْدَاءَهُمْ", "إِنْ يَتَّحِدْ المُسْلِمُونَ يُخِيفُونَ أَعْدَاءَهُمْ", "إِنْ يَتَّحِدُ المُسْلِمُونَ يُخِيفُوا أَعْدَاءَهُمْ", "ال önünde sükûn kesreye döner.", "u4"],
  ["تَبْتَسِمُ لَكَ الحَيَاةُ ← ابْتَسِمْ ile", "ابْتَسِمْ تَبْتَسِمْ لَكَ الحَيَاةُ", "ابْتَسِمْ تَبْتَسِمُ لَكَ الحَيَاةُ", "ابْتَسِمُ تَبْتَسِمْ لَكَ الحَيَاةُ", "Emrin cevabı meczûm.", "u4"],
  ["تَسْلَمُ ← لَا تَقْتَرِبْ مِنَ الأَسَدِ ile", "لَا تَقْتَرِبْ مِنَ الأَسَدِ تَسْلَمْ", "لَا تَقْتَرِبْ مِنَ الأَسَدِ تَسْلَمُ", "لَا تَقْتَرِبُ مِنَ الأَسَدِ تَسْلَمْ", "Nehyin cevabı meczûm.", "u4"],
  ["أَذْهَبُ / أَنْجُو ← أَيْنَمَا ile", "أَيْنَمَا أَذْهَبْ أَنْجُ", "أَيْنَمَا أَذْهَبُ أَنْجُو", "أَيْنَمَا أَذْهَبْ أَنْجُو", "Nâkıs vâvî: vâv düşer.", "u5"]
];
// Edat anlamı hız oyunu
var NOUN_LIST = UNITS[1].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = MN;
// Câzim mi hız oyunu
var MM_OPTS = JZ;
var MM_LIST = UNITS[2].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  ed: { name: "Edat ↔ anlam", pairs: [["مَنْ", "kim"], ["مَا", "ne"], ["مَتَى", "ne zaman"], ["أَيْنَمَا", "nerede"], ["كَيْفَمَا", "nasıl"], ["إِنْ", "eğer"], ["مَهْمَا", "ne … ise"], ["لَوْ", "-seydi (farazî)"]] },
  cz: { name: "Merfû ↔ meczûm", pairs: [["يَحْصُدُ", "يَحْصُدْ"], ["يَسْعَى", "يَسْعَ"], ["يَدْعُو", "يَدْعُ"], ["يَمْشِي", "يَمْشِ"], ["تَكُونِينَ", "تَكُونِي"], ["يَجْتَهِدُونَ", "يَجْتَهِدُوا"], ["يَقُومُ", "يَقُمْ"], ["يَرَى", "يَرَ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["مَنْ يَزْرَعْ يَحْصُدْ", "kim ekerse biçer"], ["مَنْ جَدَّ وَجَدَ", "çalışan bulur"], ["إِنْ تَزُرْنِي أَزُرْكَ", "beni ziyaret edersen seni ziyaret ederim"], ["سَلْ تُجَبْ", "sor, cevap alırsın"], ["صُومُوا تَصِحُّوا", "oruç tutun, sağlıklı olun"], ["إِنْ عُدْتُمْ عُدْنَا", "dönerseniz döneriz"], ["أَيْنَمَا تَكُونُوا يُدْرِكْكُمُ المَوْتُ", "nerede olursanız ölüm size yetişir"], ["لَوْ دَرَسْتَ لَنَجَحْتَ", "çalışsaydın başarırdın"]] }
};
var KARTLAR = [
  ["Şart üslubunun öğeleri?", "Şart edatı + şart fiili + cevap: مَنْ يَجْتَهِدْ يَنْجَحْ"],
  ["Câzim edatlar?", "إِنْ، إِذْمَا، مَنْ، مَا، مَهْمَا، مَتَى، أَيَّانَ، أَيْنَ، أَيْنَمَا، أَنَّى، أَيُّ، حَيْثُمَا، كَيْفَمَا"],
  ["Câzim olmayanlar?", "إِذَا، لَوْ"],
  ["Cezm alâmetleri?", "Sükûn · illet harfinin düşmesi · nûnun düşmesi"],
  ["يَقُومُ meczûm?", "يَقُمْ (ecvef: orta harf düşer, alâmet sükûn)"],
  ["يَدْعُو، يَسْعَى، يَمْشِي meczûm?", "يَدْعُ، يَسْعَ، يَمْشِ (illet harfi düşer)"],
  ["Mâzî ile şart?", "Şart, cevap ya da ikisi mâzî olabilir: مَنْ جَدَّ وَجَدَ"],
  ["لَوْ’nın cevabı?", "Çoğunlukla lâmlı mâzî: لَوْ دَرَسْتَ لَنَجَحْتَ"],
  ["Cevaba ne zaman فَـ gelir?", "Emir, nehy, isim cümlesi gibi şart fiili olamayan cevapta."],
  ["Talep cevabı?", "Emir / nehy / istifhamdan sonra muzâri meczûm: سَلْ تُجَبْ"],
  ["Meczûm fiil + ال?", "Sükûn kesreye döner: مَنْ يُرِدِ اللهُ"],
  ["وَمَا إِنْ حَزَّ … حَتَّى?", "إِنْ zâiddir, şart edatı değildir."]
];
