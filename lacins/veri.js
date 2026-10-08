// ================= VERİ: Cinsini Nefy Eden Lâ (لَا النَّافِيَةُ لِلْجِنْسِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "لَا النَّافِيَةُ لِلْجِنْسِ", tr: "Cinsi nefy eden لَا" }, nasb: { ar: "اسْمُ لَا", tr: "İsmi" }, cerr: { ar: "خَبَرُ لَا", tr: "Haberi" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var IB = [["f", "Mebnî: fetha üzere", "مَبْنِيٌّ عَلَى الفَتْحِ", "nasb"], ["y", "Mebnî: yâ üzere", "مَبْنِيٌّ عَلَى اليَاءِ", "cerr"], ["k", "Mebnî: kesre üzere", "مَبْنِيٌّ عَلَى الكَسْرِ", "mi"], ["m", "Mansûb: muzâf", "مَنْصُوبٌ لِأَنَّهُ مُضَافٌ", "ref"], ["s", "Mansûb: şibh-i muzâf", "مَنْصُوبٌ لِأَنَّهُ شَبِيهٌ بِالمُضَافِ", "mz"]];
var SB = [["a", "İsim ma’rife", "لِأَنَّ الاسْمَ مَعْرِفَةٌ", "nasb"], ["f", "Araya fâsıl girdi", "لِأَنَّهُ فُصِلَ بَيْنَهَا وَبَيْنَ اسْمِهَا", "cerr"], ["j", "Harf-i cer girdi", "لِأَنَّهُ دَخَلَ عَلَيْهَا حَرْفُ جَرٍّ", "mi"]];
var RD = [["c", "Cinsi nefy eden لَا (amel eder)", "نَافِيَةٌ لِلْجِنْسِ عَامِلَةٌ", "mz"], ["i", "Amelsiz: ma’rife ya da fâsıl", "مُهْمَلَةٌ (مَعْرِفَةٌ أَوْ فَاصِلٌ)", "nasb"], ["j", "بِلَا: harf-i cerden sonra", "بِلَا", "cerr"], ["n", "Başka لَا (fiil, sıfat…)", "لَا أُخْرَى", "x"]];
var TUR_TR = { f: "Fetha üzere mebnî", y: "Yâ üzere mebnî", k: "Kesre üzere mebnî", m: "Muzâf: mansûb", s: "Şibh-i muzâf: mansûb", a: "İsim ma’rife", j: "Harf-i cer", c: "Amel eder", i: "Amelsiz", n: "Başka" };
// Makine: [cins hâli, ال’lı merfû, nekre merfû, mecrûr, tür notu, Türkçe]
var LI = [
  ["طَالِبَ", "الطَّالِبُ", "طَالِبٌ", "طَالِبٍ", "müfred: fetha üzere mebnî", "öğrenci"],
  ["طَالِبَيْنِ", "الطَّالِبَانِ", "طَالِبَانِ", "طَالِبَيْنِ", "müsennâ: yâ üzere mebnî", "iki öğrenci"],
  ["مُعَلِّمِينَ", "المُعَلِّمُونَ", "مُعَلِّمُونَ", "مُعَلِّمِينَ", "cem-i müzekker sâlim: yâ üzere mebnî", "öğretmenler"],
  ["طَالِبَاتِ", "الطَّالِبَاتُ", "طَالِبَاتٌ", "طَالِبَاتٍ", "cem-i müennes sâlim: kesre üzere mebnî (tenvinsiz)", "kız öğrenciler"],
  ["طَالِبَ عِلْمٍ", "طَالِبُ العِلْمِ", "طَالِبُ عِلْمٍ", "طَالِبِ عِلْمٍ", "muzâf: mansûb (tenvinsiz fetha)", "ilim talebesi"],
  ["طَالِبًا عِلْمًا", "الطَّالِبُ عِلْمًا", "طَالِبٌ عِلْمًا", "طَالِبٍ عِلْمًا", "şibh-i muzâf: mansûb (tenvinli)", "ilim arayan biri"]
];
var LD = ["Amel eder", "İsim ال’lı", "Araya fâsıl", "Harf-i cer (بِلَا)"];

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
// Lâ türü + ismi: [cümle, tür (c/h), [isim ×3], Türkçe, açıklama]
var LT = { c: ["نَافِيَةٌ لِلْجِنْسِ", "حَرْفُ نَفْيٍ غَيْرُ عَامِلٍ", "زَائِدَةٌ"], h: ["حَرْفُ نَفْيٍ غَيْرُ عَامِلٍ", "نَافِيَةٌ لِلْجِنْسِ", "زَائِدَةٌ"] };
function LN(x, i) { return CBP([x[0] + " ← «لَا»:", LT[x[1]], "· اسْمُهَا:", x[2]], i, x[3], x[4]); }
// İsim + haber: [cümle, [isim ×3], [haber ×3], Türkçe, açıklama]
function IH(x, i) { return CBP([x[0] + " ← الاسْمُ:", x[1], "· الخَبَرُ:", x[2]], i, x[3], x[4]); }

var UNITS = [
// ---------------------------------------------------------------- 1 · TANIM
{
  id: "u1", no: 1, ar: "لَا النَّافِيَةُ لِلْجِنْسِ", tr: "Cinsini Nefy Eden Lâ ve Ameli", short: "Tanım", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Cinsini nefy eden لَا’nın isim cümlesine girip إِنَّ gibi amel ettiğini bilmek", "Haberi cinsin bütün fertlerinden nefyettiğini bilmek", "Bu لَا’yı fiile giren, atıf yapan ve harf-i cerden sonra gelen لَا’dan ayırmak"],
  examples: [
    { s: "لَا:mz / كَاذِبَ:nasb / مَمْدُوحٌ.:cerr", tr: "Hiçbir yalancı övülmez." },
    { s: "لَا:mz / إِكْرَاهَ:nasb / فِي الدِّينِ.:cerr", tr: "Dinde zorlama yoktur. (Bakara 256)", pair: "لَا يَحِلُّ الكَسْبُ الحَرَامُ.:-", pairTr: "Haram kazanç helal olmaz. (fiile giren لَا: amelsiz)" }
  ],
  rules: [
    { tr: "<b>Cinsini nefy eden لَا</b> (<span class=\"ar\">لَا النَّافِيَةُ لِلْجِنْسِ</span>) isim cümlesine girer, <b>إِنَّ gibi</b> amel eder: mübtedâyı nasbeder (ismi olur), haber merfû kalır (haberi olur):", ex: ["لَا كَاذِبَ مَمْدُوحٌ"] },
    { tr: "Haberi, ismin cinsinin <b>bütün fertlerinden</b> kesin olarak nefyeder: “Hiçbir yalancı övülmez.”" },
    { tr: "Fiile giren (<span class=\"ar\">لَا يَحِلُّ، لَا صَلَّى</span>), atıf yapan (<span class=\"ar\">سَافَرَ أَحْمَدُ لَا مُصْطَفَى</span>) ya da harf-i cerden sonra gelen (<span class=\"ar\">بِلَا أَمْنٍ</span>) لَا bu amelleri yapmaz." }
  ],
  kaide: ["«لَا» النَّافِيَةُ لِلْجِنْسِ تَدْخُلُ عَلَى الجُمْلَةِ الاسْمِيَّةِ وَتَعْمَلُ عَمَلَ «إِنَّ وَأَخَوَاتِهَا»، فَتَنْصِبُ المُبْتَدَأَ وَيُسَمَّى اسْمَهَا، وَيَبْقَى الخَبَرُ مَرْفُوعًا وَيُسَمَّى خَبَرَهَا، وَهِيَ تَنْفِي الخَبَرَ عَنْ جَمِيعِ أَفْرَادِ الاسْمِ، مِثْلُ: لَا كَاذِبَ مَمْدُوحٌ."],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنْ «لَا» النَّافِيَةَ لِلْجِنْسِ وَاسْمَهَا فِي الجُمَلِ التَّالِيَةِ", tr: "لَا’nın türünü ve (varsa) ismini seç.", exHtml: "<span class=\"ar\">لَا مُحْسِنَ مَذْمُومٌ ← نَافِيَةٌ لِلْجِنْسِ، اسْمُهَا: مُحْسِنَ · لَا يَحِلُّ الكَسْبُ الحَرَامُ ← حَرْفُ نَفْيٍ</span>", items: [
      ["لَا سَارِقَ أَمِينٌ.", "c", ["سَارِقَ", "أَمِينٌ", "لَا اسْمَ لَهَا"], "Hiçbir hırsız güvenilir değildir.", "Nekre, bitişik: amel eder."],
      ["لَا عَاصِيًا وَالِدَيْهِ مَمْدُوحٌ.", "c", ["عَاصِيًا", "وَالِدَيْهِ", "مَمْدُوحٌ"], "Anne babasına isyan eden hiç kimse övülmez.", "Şibh-i muzâf: mansûb."],
      ["سَافَرَ أَحْمَدُ لَا مُصْطَفَى.", "h", ["لَا اسْمَ لَهَا", "مُصْطَفَى", "أَحْمَدُ"], "Ahmed yolculuk etti, Mustafa değil.", "Atıf لَا’sı."],
      ["لَا صَلَّى المُنَافِقُ وَلَا صَامَ.", "h", ["لَا اسْمَ لَهَا", "المُنَافِقُ", "صَلَّى"], "Münafık ne namaz kıldı ne oruç tuttu.", "Fiile giren لَا."],
      ["لَا شَجَرَةَ تُفَّاحٍ فِي البُسْتَانِ.", "c", ["شَجَرَةَ تُفَّاحٍ", "تُفَّاحٍ", "البُسْتَانِ"], "Bahçede hiç elma ağacı yok.", "Muzâf: mansûb."],
      ["لَا خَيْرَ فِي مَالٍ لَا يَنْفَعُ صَاحِبَهُ.", "c", ["خَيْرَ", "مَالٍ", "صَاحِبَهُ"], "Sahibine fayda vermeyen malda hiç hayır yoktur.", "İlk لَا cinsi nefy eder; ikincisi fiile girer."],
      ["كُلُّ المُوَاطِنِينَ يَعِيشُونَ بِلَا أَمْنٍ.", "h", ["لَا اسْمَ لَهَا", "أَمْنٍ", "المُوَاطِنِينَ"], "Bütün vatandaşlar güvenliksiz yaşıyor.", "Harf-i cerden sonra: amelsiz; أَمْنٍ mecrûr."],
      ["لَا إِكْرَاهَ فِي الدِّينِ.", "c", ["إِكْرَاهَ", "الدِّينِ", "لَا اسْمَ لَهَا"], "Dinde zorlama yoktur. (Bakara 256)", "Müfred: fetha üzere mebnî."]
    ].map(LN) },
    { type: "tag", extra: true, roles: ["mz", "nasb", "cerr", "x"], ar: "عَيِّنْ «لَا» وَاسْمَهَا وَخَبَرَهَا", tr: "لَا’yı, ismini ve haberini etiketle.", items: [
      T("لَا:mz / كَاذِبَ:nasb / مَمْدُوحٌ.:cerr", "Hiçbir yalancı övülmez.", "Fetha üzere mebnî."),
      T("لَا:mz / مُصَلِّيَيْنِ:nasb / فِي المَسْجِدِ الآنَ.:cerr", "Şu an mescitte namaz kılan (iki kişi) yok.", "Yâ üzere mebnî."),
      T("لَا:mz / طَالِبَاتِ:nasb / فِي الحَدِيقَةِ الآنَ.:cerr", "Şu an bahçede hiç kız öğrenci yok.", "Kesre üzere mebnî."),
      T("لَا:mz / فَاعِلَ شَرٍّ:nasb / سَعِيدٌ.:cerr", "Kötülük yapan hiç kimse mutlu olmaz.", "Muzâf."),
      T("لَا:mz / فَاعِلًا شَرًّا:nasb / سَعِيدٌ.:cerr", "Kötülük yapan hiç kimse mutlu olmaz.", "Şibh-i muzâf."),
      T("لَا:mz / خَيْرَ:nasb / فِي الحَاكِمِ الظَّالِمِ.:cerr", "Zalim yöneticide hiç hayır yoktur.", "Haber şibh-i cümle.")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · İSMİNİN İ’RABI
{
  id: "u2", no: 2, ar: "إِعْرَابُ اسْمِ «لَا»", tr: "İsminin İ’rabı: Mebnî ya da Mansûb", short: "İsmi", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Müfred ismin nasb alâmeti üzere mebnî olduğunu bilmek", "Muzâf ve şibh-i muzâf ismin mansûb olduğunu bilmek", "İsmi doğru harekelemek"],
  examples: [
    { s: "لَا:mz / مُصَلِّيَيْنِ:nasb / فِي المَسْجِدِ الآنَ.:cerr", tr: "Şu an mescitte namaz kılan (iki kişi) yok. (yâ üzere mebnî)" },
    { s: "لَا:mz / فَاعِلَ شَرٍّ:nasb / سَعِيدٌ.:cerr", tr: "Kötülük yapan hiç kimse mutlu olmaz. (muzâf)", pair: "لَا:mz / فَاعِلًا شَرًّا:nasb / سَعِيدٌ.:cerr", pairTr: "Aynı anlam. (şibh-i muzâf)" }
  ],
  rules: [
    { tr: "İsmi <b>muzâf</b> ise mansûb olur: <span class=\"ar\">لَا فَاعِلَ شَرٍّ سَعِيدٌ</span>. <b>Şibh-i muzâf</b> ise (anlamı kendisine bağlı bir kelimeyle tamamlanırsa) mansûb ve tenvinli olur: <span class=\"ar\">لَا فَاعِلًا شَرًّا سَعِيدٌ</span>." },
    { tr: "<b>Müfred</b> ise (muzâf da şibh-i muzâf da değilse) nasbedildiği alâmet üzere <b>mebnî</b> olur:", ex: ["لَا كَاذِبَ مَمْدُوحٌ (فَتْحٌ) · لَا مُصَلِّيَيْنِ فِي المَسْجِدِ (يَاءٌ)", "لَا مُعَلِّمِينَ غَائِبُونَ (يَاءٌ) · لَا طَالِبَاتِ فِي الحَدِيقَةِ (كَسْرٌ)"] },
    { tr: "Mebnî isim tenvin almaz: <span class=\"ar\">لَا طَالِبَاتِ</span>. Kitabın kaidesindeki <span class=\"ar\">طَالِبَاتٍ</span> yazımı tenvinlidir; doğrusu tenvinsizdir (fethalı <span class=\"ar\">طَالِبَاتَ</span> da câizdir)." },
    { tr: "Şibh-i muzâf: ism-i fâil + mef’ûl (<span class=\"ar\">غَافِرًا الذُّنُوبَ · مُهْمِلَيْنِ وَاجِبَهُمَا</span>) ya da + câr-mecrûr (<span class=\"ar\">مُتَعَاوِنِينَ عَلَى الخَيْرِ</span>)." }
  ],
  kaide: ["إِعْرَابُ اسْمِ «لَا» النَّافِيَةِ لِلْجِنْسِ: ١ ـ يُنْصَبُ إِذَا كَانَ مُضَافًا، مِثْلُ: لَا فَاعِلَ شَرٍّ سَعِيدٌ، أَوْ شَبِيهًا بِالمُضَافِ، مِثْلُ: لَا فَاعِلًا شَرًّا سَعِيدٌ. ٢ ـ وَيُبْنَى عَلَى الحَالَةِ الَّتِي يُنْصَبُ بِهَا إِذَا كَانَ مُفْرَدًا (أَيْ لَيْسَ مُضَافًا وَلَا شَبِيهًا بِالمُضَافِ)، مِثْلُ: لَا كَاذِبَ مَمْدُوحٌ (مَبْنِيٌّ عَلَى الفَتْحِ)، لَا مُصَلِّيَيْنِ فِي المَسْجِدِ الآنَ (مَبْنِيٌّ عَلَى اليَاءِ)، لَا طَالِبَاتِ فِي الحَدِيقَةِ الآنَ (مَبْنِيٌّ عَلَى الكَسْرِ)."],
  ex: [
    { type: "classify", num: "٣", opts: IB, ar: "اضْبِطِ اسْمَ «لَا» وَبَيِّنْ سَبَبَ الضَّبْطِ", tr: "Koyu isim mebnî mi (hangi alâmet üzere), mansûb mu (niçin)?", exHtml: "<span class=\"ar\">لَا كَارِهًا الذَّنْبَ مَذْمُومٌ: مَنْصُوبٌ لِأَنَّهُ شَبِيهٌ بِالمُضَافِ · لَا أَحَدَ يُوَافِقُكَ: مَبْنِيٌّ عَلَى الفَتْحِ</span>", items: CL([
      [HL("لَا طَاعَةَ لِمَخْلُوقٍ فِي مَعْصِيَةِ الخَالِقِ", "طَاعَةَ"), "f", "Müfred."],
      [HL("لَا غَافِرًا الذُّنُوبَ إِلَّا اللهُ", "غَافِرًا"), "s", "Mef’ûl alıyor: şibh-i muzâf."],
      [HL("لَا مُهَنْدِسِينَ سُورِيِّينَ مُشَارِكُونَ فِي المَشْرُوعِ", "مُهَنْدِسِينَ"), "y", "Cem-i müz.: yâ üzere mebnî; sıfatı mansûb."],
      [HL("لَا دِينَ لِمَنْ لَا أَمَانَةَ لَهُ", "دِينَ"), "f", "Müfred (أَمَانَةَ de)."],
      [HL("وَلَا عَهْدَ لِمَنْ لَا وَفَاءَ لَهُ", "عَهْدَ"), "f", "Müfred."],
      [HL("لَا شَكَّ فِي وُجُودِ اللهِ", "شَكَّ"), "f", "Müfred."],
      [HL("لَا ثَرْوَةَ أَعْظَمُ مِنَ الصِّحَّةِ", "ثَرْوَةَ"), "f", "Müfred; haber أَعْظَمُ."],
      [HL("لَا مُهْمِلَيْنِ وَاجِبَهُمَا نَاجِحَانِ", "مُهْمِلَيْنِ"), "s", "Mef’ûl alıyor: şibh-i muzâf (müsennâ, yâ ile mansûb)."],
      [HL("لَا كَاذِبَ مَمْدُوحٌ", "كَاذِبَ"), "f", "Müfred."],
      [HL("لَا مُصَلِّيَيْنِ فِي المَسْجِدِ", "مُصَلِّيَيْنِ"), "y", "Müsennâ."],
      [HL("لَا طَالِبَاتِ فِي الحَدِيقَةِ", "طَالِبَاتِ"), "k", "Cem-i müen. sâlim."],
      [HL("لَا فَاعِلَ شَرٍّ سَعِيدٌ", "فَاعِلَ"), "m", "Muzâf."],
      [HL("لَا فَاعِلًا شَرًّا سَعِيدٌ", "فَاعِلًا"), "s", "Şibh-i muzâf."],
      [HL("لَا غَنِيَّ نَفْسٍ فَقِيرٌ", "غَنِيَّ"), "m", "Muzâf."],
      [HL("لَا شَجَرَةَ تُفَّاحٍ فِي البُسْتَانِ", "شَجَرَةَ"), "m", "Muzâf."],
      [HL("لَا مُسْلِمَاتِ غَائِبَاتٌ", "مُسْلِمَاتِ"), "k", "Cem-i müen. sâlim."],
      [HL("لَا رَجُلَيْنِ فِي البَيْتِ", "رَجُلَيْنِ"), "y", "Müsennâ."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "اضْبِطِ اسْمَ «لَا»", tr: "Boşluğa ismin doğru biçimini seç.", items: PL([
      ["لَا ___ مَمْدُوحٌ. (كَاذِب)", "كَاذِبَ", "كَاذِبًا", "كَاذِبٌ", "Hiçbir yalancı övülmez.", "Müfred: tenvinsiz fetha."],
      ["لَا ___ فِي المَسْجِدِ الآنَ. (مُصَلِّيَانِ)", "مُصَلِّيَيْنِ", "مُصَلِّيَانِ", "مُصَلِّيًا", "Şu an mescitte namaz kılan yok.", "Müsennâ: yâ üzere."],
      ["لَا ___ فِي الحَدِيقَةِ الآنَ. (طَالِبَات)", "طَالِبَاتِ", "طَالِبَاتٍ", "طَالِبَاتُ", "Şu an bahçede kız öğrenci yok.", "Kesre üzere, tenvinsiz."],
      ["لَا ___ شَرٍّ سَعِيدٌ. (فَاعِل)", "فَاعِلَ", "فَاعِلًا", "فَاعِلُ", "Kötülük yapan mutlu olmaz.", "Muzâf: tenvinsiz."],
      ["لَا ___ شَرًّا سَعِيدٌ. (فَاعِل)", "فَاعِلًا", "فَاعِلَ", "فَاعِلٌ", "Kötülük yapan mutlu olmaz.", "Şibh-i muzâf: tenvinli."],
      ["لَا ___ نَادِمُونَ. (مُجْتَهِدُونَ)", "مُجْتَهِدِينَ", "مُجْتَهِدُونَ", "المُجْتَهِدِينَ", "Çalışkanlar pişman olmaz.", "Cem-i müz.: yâ üzere; ال olmaz."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · İSMİ VE HABERİ
{
  id: "u3", no: 3, ar: "اسْمُ «لَا» وَخَبَرُهَا", tr: "İsmi ve Haberi", short: "İsim · haber", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["İsmi ve haberi ayırmak", "Haberin merfû olduğunu ve şibh-i cümle de olabildiğini bilmek", "“هَلْ…؟” sorusuna cinsi nefy eden لَا ile cevap vermek"],
  examples: [
    { s: "لَا:mz / غَنِيَّ نَفْسٍ:nasb / فَقِيرٌ.:cerr", tr: "Gönlü zengin olan fakir değildir." },
    { s: "هَلْ عِنْدَكُمْ طَعَامٌ؟ لَا،:- / لَا:mz / طَعَامَ:nasb / عِنْدَنَا:cerr / اليَوْمَ.:-", tr: "Bugün yemeğiniz var mı? Hayır, bugün hiç yemeğimiz yok." }
  ],
  rules: [
    { tr: "Haber merfûdur; müfred (<span class=\"ar\">مَمْدُوحٌ، سِيَّانِ، نَادِمُونَ</span>) ya da şibh-i cümle (<span class=\"ar\">فِي الصَّفِّ، لِلْخَيَالِ</span>) olabilir." },
    { tr: "Ismin ve haberin sayısına dikkat: <span class=\"ar\">لَا أَخَوَيْنِ سِيَّانِ · لَا ضِدَّيْنِ مُجْتَمِعَانِ</span>." },
    { tr: "“<span class=\"ar\">هَلْ…؟</span>” sorusuna cevapta ma’rife isim nekreye çevrilir; <span class=\"ar\">هَلْ مِنْ…؟</span> sorusunda <span class=\"ar\">مِنْ</span> düşer:", ex: ["هَلِ المُهَنْدِسَانِ مُشَارِكَانِ؟ ← لَا مُهَنْدِسَيْنِ مُشَارِكَانِ", "هَلْ مِنْ مَالٍ أَعَزُّ مِنَ العَقْلِ؟ ← لَا مَالَ أَعَزُّ مِنَ العَقْلِ"] },
    { tr: "İsmin sıfatı da mansûb olur: <span class=\"ar\">لَا كَسْبَ حَرَامًا مُفِيدٌ</span>." }
  ],
  kaide: ["يَبْقَى خَبَرُ «لَا» النَّافِيَةِ لِلْجِنْسِ مَرْفُوعًا، مِثْلُ: لَا غَنِيَّ نَفْسٍ فَقِيرٌ، لَا طَعَامَ عِنْدَنَا اليَوْمَ."],
  ex: [
    { type: "combo", num: "٢", ar: "عَيِّنِ اسْمَ وَخَبَرَ «لَا» النَّافِيَةِ لِلْجِنْسِ", tr: "İsmi ve haberi seç.", exHtml: "<span class=\"ar\">لَا غَنِيَّ نَفْسٍ فَقِيرٌ ← الاسْمُ: غَنِيَّ نَفْسٍ · الخَبَرُ: فَقِيرٌ</span>", items: [
      ["لَا مُحِبًّا وَطَنَهُ مَنْسِيٌّ.", ["مُحِبًّا وَطَنَهُ", "وَطَنَهُ", "مَنْسِيٌّ"], ["مَنْسِيٌّ", "وَطَنَهُ", "مُحِبًّا"], "Vatanını seven hiç kimse unutulmaz.", "Şibh-i muzâf isim."],
      ["لَا نِهَايَةَ لِلْخَيَالِ.", ["نِهَايَةَ", "الخَيَالِ", "لِلْخَيَالِ"], ["لِلْخَيَالِ", "نِهَايَةَ", "مَحْذُوفٌ"], "Hayalin sonu yoktur.", "Haber şibh-i cümle."],
      ["لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ.", ["حَوْلَ / قُوَّةَ", "بِاللهِ", "اللهِ"], ["مَحْذُوفٌ (مَوْجُودٌ)", "بِاللهِ", "قُوَّةَ"], "Güç ve kuvvet ancak Allah’ladır.", "Kitaba göre haber hazfedilmiş."],
      ["لَا أَخَوَيْنِ سِيَّانِ.", ["أَخَوَيْنِ", "سِيَّانِ", "لَا اسْمَ لَهَا"], ["سِيَّانِ", "أَخَوَيْنِ", "مَحْذُوفٌ"], "Hiçbir iki kardeş birbirinin aynı değildir.", "Müsennâ isim, müsennâ haber."],
      ["لَا فَضْلَ لِعَرَبِيٍّ عَلَى أَعْجَمِيٍّ إِلَّا بِالتَّقْوَى.", ["فَضْلَ", "عَرَبِيٍّ", "التَّقْوَى"], ["لِعَرَبِيٍّ", "عَلَى أَعْجَمِيٍّ", "فَضْلَ"], "Arap’ın Arap olmayana takvâ dışında üstünlüğü yoktur. (Hadis)", "Haber şibh-i cümle."],
      ["لَا مُتَعَاوِنِينَ عَلَى الخَيْرِ نَادِمُونَ.", ["مُتَعَاوِنِينَ عَلَى الخَيْرِ", "الخَيْرِ", "نَادِمُونَ"], ["نَادِمُونَ", "الخَيْرِ", "مُتَعَاوِنِينَ"], "İyilikte yardımlaşanlar hiç pişman olmaz.", "Şibh-i muzâf."],
      ["لَا ضِدَّيْنِ مُجْتَمِعَانِ.", ["ضِدَّيْنِ", "مُجْتَمِعَانِ", "لَا اسْمَ لَهَا"], ["مُجْتَمِعَانِ", "ضِدَّيْنِ", "مَحْذُوفٌ"], "Hiçbir iki zıt bir araya gelmez.", "Müsennâ."],
      ["لَا ضَرَرَ وَلَا ضِرَارَ.", ["ضَرَرَ / ضِرَارَ", "لَا اسْمَ لَهَا", "ضِرَارَ وَحْدَهُ"], ["مَحْذُوفٌ", "ضِرَارَ", "ضَرَرَ"], "Zarar vermek de zarara zararla karşılık vermek de yoktur. (Hadis)", "İki لَا, iki isim; haber hazfedilmiş."]
    ].map(IH) },
    { type: "pick", num: "٤", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِأُسْلُوبِ «لَا» النَّافِيَةِ لِلْجِنْسِ مَعَ ضَبْطِ الاسْمِ وَالخَبَرِ", tr: "Soruya cinsi nefy eden لَا ile verilen doğru cevabı seç.", exHtml: "<span class=\"ar\">هَلْ عِنْدَكُمْ طَعَامٌ اليَوْمَ؟ ← لَا، لَا طَعَامَ عِنْدَنَا اليَوْمَ. · هَلْ سَائِقُ السَّيَّارَةِ مُسْرِعٌ؟ ← لَا، لَا سَائِقَ سَيَّارَةٍ مُسْرِعٌ.</span>", items: PL([
      ["هَلْ عِنْدَكَ مَوْعِدٌ غَدًا؟", "لَا، لَا مَوْعِدَ عِنْدِي غَدًا.", "لَا، لَا مَوْعِدٌ عِنْدِي غَدًا.", "لَا، لَا مَوْعِدًا عِنْدِي غَدًا.", "Hayır, yarın hiç randevum yok.", "Müfred: fetha üzere mebnî."],
      ["هَلِ المُهَنْدِسَانِ مُشَارِكَانِ فِي المَشْرُوعِ؟", "لَا، لَا مُهَنْدِسَيْنِ مُشَارِكَانِ فِي المَشْرُوعِ.", "لَا، لَا مُهَنْدِسَانِ مُشَارِكَانِ فِي المَشْرُوعِ.", "لَا، لَا المُهَنْدِسَيْنِ مُشَارِكَانِ فِي المَشْرُوعِ.", "Hayır, projeye katılan iki mühendis yok.", "Nekre müsennâ: yâ üzere mebnî."],
      ["هَلْ مِنْ طَالِبٍ فَاهِمٍ هَذَا السُّؤَالَ؟", "لَا، لَا طَالِبَ فَاهِمٌ هَذَا السُّؤَالَ.", "لَا، لَا طَالِبٌ فَاهِمٌ هَذَا السُّؤَالَ.", "لَا، لَا طَالِبًا فَاهِمٌ هَذَا السُّؤَالَ.", "Hayır, bu soruyu anlayan hiç öğrenci yok.", "مِنْ düşer; isim mebnî, haber merfû."],
      ["هَلِ الظَّالِمُ النَّاسَ مَحْبُوبٌ؟", "لَا، لَا ظَالِمًا النَّاسَ مَحْبُوبٌ.", "لَا، لَا ظَالِمَ النَّاسَ مَحْبُوبٌ.", "لَا، لَا ظَالِمٌ النَّاسَ مَحْبُوبٌ.", "Hayır, insanlara zulmeden hiç kimse sevilmez.", "Mef’ûl alıyor: şibh-i muzâf, tenvinli."],
      ["هَلِ المُتَّقُونَ قَانِطُونَ مِنْ رَحْمَةِ اللهِ؟", "لَا، لَا مُتَّقِينَ قَانِطُونَ مِنْ رَحْمَةِ اللهِ.", "لَا، لَا مُتَّقُونَ قَانِطُونَ مِنْ رَحْمَةِ اللهِ.", "لَا، لَا مُتَّقِينَ قَانِطِينَ مِنْ رَحْمَةِ اللهِ.", "Hayır, takvâ sahipleri Allah’ın rahmetinden ümit kesmez.", "İsim yâ üzere, haber merfû."],
      ["هَلِ الكَسْبُ الحَرَامُ مُفِيدٌ؟", "لَا، لَا كَسْبَ حَرَامًا مُفِيدٌ.", "لَا، لَا كَسْبٌ حَرَامٌ مُفِيدٌ.", "لَا، لَا الكَسْبَ الحَرَامَ مُفِيدٌ.", "Hayır, hiçbir haram kazanç faydalı değildir.", "Sıfat mansûb."],
      ["هَلِ المُقَصِّرُونَ نَاجِحُونَ؟", "لَا، لَا مُقَصِّرِينَ نَاجِحُونَ.", "لَا، لَا مُقَصِّرُونَ نَاجِحُونَ.", "لَا، لَا مُقَصِّرِينَ نَاجِحِينَ.", "Hayır, ihmalkârlar başarılı olmaz.", "İsim yâ üzere, haber merfû."],
      ["هَلْ مِنْ مَالٍ أَعَزُّ مِنَ العَقْلِ؟", "لَا، لَا مَالَ أَعَزُّ مِنَ العَقْلِ.", "لَا، لَا مَالٌ أَعَزُّ مِنَ العَقْلِ.", "لَا، لَا مَالَ أَعَزَّ مِنَ العَقْلِ.", "Hayır, akıldan daha değerli hiçbir mal yoktur.", "Haber merfû."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · ŞARTLAR VE İPTAL
{
  id: "u4", no: 4, ar: "شُرُوطُ عَمَلِ «لَا» وَحَذْفُ خَبَرِهَا", tr: "Amel Şartları, İptal ve Haberin Hazfı", short: "Şartlar", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Üç şartı bilmek: isim nekre, bitişik, لَا’ya harf-i cer girmemiş", "Amelin bâtıl olduğu yerleri ve tekrar gerekliliğini bilmek", "Hazfedilmiş haberi ve kalıp sözleri tanımak"],
  examples: [
    { s: "لَا:x / الكَاذِبُ:- / مَمْدُوحٌ:- / وَلَا السَّارِقُ مَقْبُولٌ.:-", tr: "Ne yalancı övülür ne hırsız kabul görür. (ma’rife: amelsiz)" },
    { s: "يُعَامِلُونَهُمْ:- / بِلَا رَحْمَةٍ.:x", tr: "Onlara merhametsizce davranıyorlar. (harf-i cer: amelsiz)", pair: "لَا:mz / إِلَهَ:nasb / إِلَّا اللهُ.:-", pairTr: "Allah’tan başka ilah yoktur. (haber hazfedilmiş)" }
  ],
  rules: [
    { tr: "Amel şartları: ismi <b>nekre</b> olmalı, لَا’ya <b>bitişik</b> olmalı (araya bir şey girmemeli), لَا’ya <b>harf-i cer girmemeli</b>: <span class=\"ar\">لَا خَيْرَ فِي الحَاكِمِ الظَّالِمِ</span>." },
    { tr: "İlk iki şarttan biri eksikse amel bâtıl olur ve لَا <b>tekrarlanır</b>; isim mübtedâ olarak merfûdur:", ex: ["لَا الكَاذِبُ مَمْدُوحٌ وَلَا السَّارِقُ مَقْبُولٌ", "لَا فِي الصَّفِّ طَالِبٌ وَلَا مُعَلِّمٌ"] },
    { tr: "Harf-i cer girerse yalnız amel bâtıl olur (tekrar gerekmez); isim harf-i cerle mecrûrdur: <span class=\"ar\">يُعَامِلُونَهُمْ بِلَا رَحْمَةٍ</span>." },
    { tr: "Haber anlaşılınca hazfedilir: <span class=\"ar\">لَا إِلَهَ (مَوْجُودٌ) إِلَّا اللهُ · لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ</span>. Kalıp sözler: <span class=\"ar\">لَا شَكَّ، لَا رَيْبَ، لَا جَرَمَ، لَا بُدَّ، لَا بَأْسَ، لَا مَحَالَةَ، لَا ضَيْرَ، لَا حَاجَةَ، لَا مَنَاصَ، لَا عَجَبَ، لَا غَرْوَ</span>." }
  ],
  kaide: ["يُشْتَرَطُ فِي عَمَلِ «لَا» النَّافِيَةِ لِلْجِنْسِ ثَلَاثَةُ شُرُوطٍ: أ ـ أَنْ يَكُونَ اسْمُهَا نَكِرَةً، فَإِذَا جَاءَ مَعْرِفَةً لَا تَعْمَلُ: لَا الكَاذِبُ مَمْدُوحٌ وَلَا السَّارِقُ مَقْبُولٌ. ب ـ أَنْ يَكُونَ اسْمُهَا مُتَّصِلًا بِهَا، فَإِذَا فُصِلَ بَيْنَهُمَا لَا تَعْمَلُ: لَا فِي الصَّفِّ طَالِبٌ وَلَا مُعَلِّمٌ. جـ ـ أَلَّا يَدْخُلَ عَلَيْهَا حَرْفُ جَرٍّ: يَكْرَهُ المُوَاطِنُونَ الحُكَّامَ الَّذِينَ يُعَامِلُونَهُمْ بِلَا رَحْمَةٍ.", "وَإِذَا فُقِدَ شَرْطٌ مِنَ الشَّرْطَيْنِ الأَوَّلَيْنِ بَطَلَ عَمَلُ «لَا» وَوَجَبَ تَكْرَارُهَا، وَإِنْ فُقِدَ الشَّرْطُ الأَخِيرُ بَطَلَ عَمَلُهَا فَقَطْ. وَقَدْ يُحْذَفُ خَبَرُ «لَا» النَّافِيَةِ لِلْجِنْسِ إِذَا فُهِمَ مِنَ السِّيَاقِ: لَا إِلَهَ إِلَّا اللهُ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ."],
  ex: [
    { type: "classify", num: "٥", opts: SB, ar: "عَيِّنْ سَبَبَ إِبْطَالِ عَمَلِ «لَا»", tr: "لَا niçin amel etmiyor?", exHtml: "<span class=\"ar\">لَا المُدِيرُ مَوْجُودٌ وَلَا مُسَاعِدُهُ ← لِأَنَّ الاسْمَ بَعْدَ «لَا» مُعَرَّفٌ بِـ«ال»</span>", items: CL([
      ["لَا فِي الكُلِّيَّةِ طَالِبٌ وَلَا أُسْتَاذٌ", "f", "Araya فِي الكُلِّيَّةِ girdi."],
      ["لَا السَّمَكَ آكُلُ وَلَا الدَّجَاجَ", "a", "İsim ma’rife (mef’ûl öne alınmış)."],
      ["لَا فِي البَيْتِ خُبْزٌ وَلَا مِلْحٌ", "f", "Fâsıl."],
      ["يَضِلُّ مَنْ يَسِيرُ بِلَا وَعْيٍ", "j", "بِـ girdi."],
      ["لَا الطُّلَّابُ شَارَكُوا فِي النَّدْوَةِ وَلَا المُعَلِّمُونَ", "a", "Ma’rife."],
      ["لَا مَعَنَا ذَهَبٌ وَلَا فِضَّةٌ", "f", "Araya مَعَنَا girdi."],
      ["لَا المُحَاسِبُ قَدَّمَ تَقْرِيرًا وَلَا نَائِبُهُ", "a", "Ma’rife."],
      ["يَمْدَحُ اللهُ مَنْ يُنْفِقُ فِي سَبِيلِهِ بِلَا حِسَابٍ", "j", "Harf-i cer."],
      ["لَا الكَاذِبُ مَمْدُوحٌ وَلَا السَّارِقُ مَقْبُولٌ", "a", "Ma’rife."],
      ["لَا فِي الصَّفِّ طَالِبٌ وَلَا مُعَلِّمٌ", "f", "Fâsıl."],
      ["يُعَامِلُونَهُمْ بِلَا رَحْمَةٍ", "j", "Harf-i cer."],
      ["لَا المُدِيرُ مَوْجُودٌ وَلَا مُسَاعِدُهُ", "a", "Ma’rife."],
      ["جِئْتُ بِلَا زَادٍ", "j", "Harf-i cer."],
      ["لَا عِنْدَنَا طَعَامٌ وَلَا شَرَابٌ", "f", "Araya عِنْدَنَا girdi."]
    ]) },
    { type: "pick", extra: true, ar: "اخْتَرِ الصَّوَابَ", tr: "Amelsiz لَا ve hazfedilmiş haber: doğru seçeneği bul.", items: PL([
      ["(الكَاذِبُ / السَّارِقُ) ile cümle", "لَا الكَاذِبُ مَمْدُوحٌ وَلَا السَّارِقُ مَقْبُولٌ.", "لَا الكَاذِبَ مَمْدُوحٌ وَلَا السَّارِقَ مَقْبُولٌ.", "لَا الكَاذِبُ مَمْدُوحٌ.", "Ne yalancı övülür ne hırsız kabul görür.", "Ma’rife: merfû ve لَا tekrarlanır."],
      ["(فِي الصَّفِّ araya girsin)", "لَا فِي الصَّفِّ طَالِبٌ وَلَا مُعَلِّمٌ.", "لَا فِي الصَّفِّ طَالِبَ وَلَا مُعَلِّمَ.", "لَا فِي الصَّفِّ طَالِبٌ.", "Sınıfta ne öğrenci var ne öğretmen.", "Fâsıl: merfû ve tekrar."],
      ["(بِـ girsin) يُعَامِلُونَهُمْ … رَحْمَة", "يُعَامِلُونَهُمْ بِلَا رَحْمَةٍ.", "يُعَامِلُونَهُمْ بِلَا رَحْمَةَ.", "يُعَامِلُونَهُمْ بِلَا رَحْمَةً.", "Onlara merhametsizce davranıyorlar.", "Harf-i cer: mecrûr."],
      ["Kalıp söz: “sakıncası yok”", "لَا بَأْسَ.", "لَا بَأْسٌ.", "لَا بَأْسًا.", "Sakıncası yok.", "Haber hazfedilmiş; isim fetha üzere mebnî."],
      ["Kalıp söz: “şüphesiz”", "لَا شَكَّ.", "لَا شَكٌّ.", "لَا شَكًّا.", "Şüphe yok.", "Fetha üzere mebnî."],
      ["لَا إِلَهَ إِلَّا اللهُ ← haberi nedir?", "مَحْذُوفٌ تَقْدِيرُهُ: مَوْجُودٌ", "إِلَّا اللهُ", "إِلَهَ", "Allah’tan başka ilah yoktur.", "Haber anlaşıldığı için hazfedilmiş."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMA
{
  id: "u5", no: 5, ar: "فِي الآيَاتِ وَالقِرَاءَةِ", tr: "Âyetlerde ve Okumada", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Âyetlerde cinsi nefy eden لَا’yı, ismini ve haberini bulmak", "Amelsiz لَا’yı ayırmak", "“Sevdiğim şehir” metninde لَا’nın türlerini bulmak"],
  examples: [
    { s: "ذَلِكَ الكِتَابُ:- / لَا:mz / رَيْبَ:nasb / فِيهِ:cerr", tr: "Bu, kendisinde şüphe olmayan kitaptır. (Bakara 2)" },
    { s: "لَا:mz / أُمِّيَّ:nasb / فِيهَا.:cerr", tr: "Orada hiç okuma yazma bilmeyen yok." }
  ],
  rules: [
    { tr: "Âyetlerde haber çoğu zaman şibh-i cümledir: <span class=\"ar\">لَا رَيْبَ فِيهِ · لَا خَلَاقَ لَهُمْ · لَا تَثْرِيبَ عَلَيْكُمُ · فَلَا مَرَدَّ لَهُ</span>." },
    { tr: "<span class=\"ar\">لَا فِيهَا غَوْلٌ وَلَا هُمْ عَنْهَا يُنْزَفُونَ</span>: araya şibh-i cümle girdiği için amel yok, لَا tekrarlanmış." },
    { tr: "<span class=\"ar\">لَا جَرَمَ أَنَّ…</span>: <span class=\"ar\">جَرَمَ</span> ismi, haberi gizlidir (“elbette, şüphesiz”)." }
  ],
  kaide: ["عَيِّنْ «لَا» النَّافِيَةَ لِلْجِنْسِ مَعَ اسْمِهَا وَخَبَرِهَا فِي الآيَاتِ القُرْآنِيَّةِ وَفِي النَّصِّ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "٦", ar: "عَيِّنْ «لَا» النَّافِيَةَ لِلْجِنْسِ وَاسْمَهَا وَخَبَرَهَا فِي الآيَاتِ القُرْآنِيَّةِ التَّالِيَةِ", tr: "Cinsi nefy eden لَا’yı, ismini ve haberini etiketle; kalanlar Başka.", items: [
      T("لَا:mz / خَيْرَ:nasb / فِي كَثِيرٍ مِنْ نَجْوَاهُمْ:cerr / إِلَّا مَنْ أَمَرَ بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ:x", "Onların gizli konuşmalarının çoğunda hayır yoktur; ancak sadakayı, iyiliği ya da insanların arasını düzeltmeyi emredenler başka. (Nisâ 114)", "Haber şibh-i cümle."),
      T("لَا:mz / جَرَمَ:nasb / أَنَّ اللهَ يَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ:x", "Şüphesiz Allah onların gizlediklerini de açığa vurduklarını da bilir. (Nahl 23)", "Haber gizli; أَنَّ… cümlesi haber değildir."),
      T("يُطَافُ عَلَيْهِمْ بِكَأْسٍ مِنْ مَعِينٍ بَيْضَاءَ لَذَّةٍ لِلشَّارِبِينَ:x / لَا فِيهَا غَوْلٌ وَلَا هُمْ عَنْهَا يُنْزَفُونَ:x", "Onlara pınardan doldurulmuş, içenlere lezzet veren bembeyaz kadehler dolaştırılır; onda ne baş ağrısı vardır ne de onunla sarhoş olurlar. (Sâffât 45-47)", "Araya فِيهَا girdi: لَا amelsiz, tekrarlanmış."),
      T("ذَلِكَ الكِتَابُ:x / لَا:mz / رَيْبَ:nasb / فِيهِ:cerr / هُدًى لِلْمُتَّقِينَ:x", "Bu, kendisinde şüphe olmayan kitaptır; takvâ sahipleri için yol göstericidir. (Bakara 2)", "Fetha üzere mebnî."),
      T("أُولَئِكَ:x / لَا:mz / خَلَاقَ:nasb / لَهُمْ:cerr / فِي الآخِرَةِ وَلَا يُكَلِّمُهُمُ اللهُ:x", "İşte onların ahirette hiçbir nasibi yoktur ve Allah onlarla konuşmaz. (Âl-i İmrân 77)", "İkinci لَا fiile girer. (Kitapta âyetin yeri yazılmamış.)"),
      T("قَالَ:x / لَا:mz / تَثْرِيبَ:nasb / عَلَيْكُمُ:cerr / اليَوْمَ يَغْفِرُ اللهُ لَكُمْ:x", "“Bugün size kınama yok; Allah sizi bağışlar” dedi. (Yûsuf 92)", "Haber şibh-i cümle."),
      T("وَإِذَا أَرَادَ اللهُ بِقَوْمٍ سُوءًا:x / فَلَا:mz / مَرَدَّ:nasb / لَهُ:cerr / وَمَا لَهُمْ مِنْ دُونِهِ مِنْ وَالٍ:x", "Allah bir topluma kötülük dilediğinde onun geri çevrilmesi yoktur. (Ra’d 11)", "Fetha üzere mebnî.")
    ]},
    { type: "reading", num: "٧", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ عَيِّنْ «لَا» النَّافِيَةَ لِلْجِنْسِ مَعَ اسْمِهَا وَخَبَرِهَا", tr: "Metni oku, soruları cevapla; sonra koyu لَا’nın türünü seç.", title: "مَدِينَتِي المُفَضَّلَةُ",
      text: "فَكَّرْتُ أَنْ أَعِيشَ فِي هَذِهِ المَدِينَةِ الَّتِي أُعْجِبْتُ بِهَا إِعْجَابًا شَدِيدًا. وَهِيَ مَدِينَةٌ لَا كَبِيرَةٌ وَلَا صَغِيرَةٌ، مَدِينَةٌ مَعْمُورَةٌ، مُحَاطَةٌ بِالغَابَاتِ مِنْ كُلِّ الجِهَاتِ، وَمُشْتَمِلَةٌ عَلَى حَدَائِقَ عَامَّةٍ وَاسِعَةٍ، فِيهَا حِيَاضٌ وَاسِعَةٌ وَفَوَّارَاتٌ تَرْتَفِعُ إِلَى السَّمَاءِ، وَفِيهَا أَزْهَارٌ مُخْتَلِفَةُ الأَلْوَانِ. وَأَهْلُ هَذِهِ المَدِينَةِ يَسْكُنُونَ فِي بُيُوتٍ ذَاتِ طَابِقَيْنِ، وَأَمَامَهَا حَدَائِقُ خَاصَّةٌ تُشْرِفُ عَلَى شَوَارِعَ وَاسِعَةٍ مُجَهَّزَةٍ بِأَحْدَثِ نِظَامٍ لِلْمُرُورِ، لَا مُشْكِلَةَ مُرُورٍ فِيهَا، وَهِيَ نَظِيفَةٌ جِدًّا، لَا الوَسَخُ فِيهَا مَوْجُودٌ وَلَا الغُبَارُ.<br>وَفِي هَذِهِ المَدِينَةِ مَدَارِسُ وَجَامِعَاتٌ مَرْمُوقَةٌ، كُلُّ النَّاسِ مُثَقَّفُونَ، لَا أُمِّيَّ فِيهَا. أَهْلُ المَدِينَةِ أَفَاضِلُ يَحْتَرِمُ بَعْضُهُمْ بَعْضًا، وَيَتَحَابُّونَ لِلَّهِ، وَيَتَعَاوَنُونَ بَيْنَهُمْ عَلَى البِرِّ وَالتَّقْوَى، فَهُمْ آمِنُونَ مِنْ كُلِّ شَرٍّ، يَعِيشُونَ فِي أَمْنٍ وَسِلْمٍ، بِلَا خَوْفٍ وَلَا قَلَقٍ، لَا فِيهَا حَاجَةٌ إِلَى سِجْنٍ وَلَا إِلَى مَحْكَمَةٍ. الخَيْرُ لَا حُدُودَ لَهُ فِي هَذِهِ المَدِينَةِ، وَالشَّرُّ لَا مَقَرَّ لَهُ فِيهَا.<br>وَفِي الحَقِيقَةِ، أَيْنَمَا يَكُنِ الإِنْسَانُ يَكُنْ مَعَهُ الخَيْرُ وَالشَّرُّ، وَهُمَا شَيْئَانِ ضِدَّانِ، وَلَا ضِدَّيْنِ مُجْتَمِعَانِ. وَوَظِيفَةُ الفَاضِلِينَ فِي المُجْتَمَعِ السَّعْيُ فِي نَشْرِ الخَيْرِ وَالقَضَاءُ عَلَى الشَّرِّ بِقَدْرِ الإِمْكَانِ؛ لَا سَاعِينَ فِي الخَيْرِ فَاشِلُونَ، وَلَا سَاعِيَاتٍ فِي البِرِّ فَاشِلَاتٌ، وَاللهُ لَا يُضِيعُ أَجْرَ المُحْسِنِينَ.",
      textTr: "Çok beğendiğim bu şehirde yaşamayı düşündüm. Ne büyük ne küçük, bayındır bir şehir; her yanı ormanlarla çevrili, geniş parkları var; parklarda geniş havuzlar, göğe yükselen fıskiyeler ve rengârenk çiçekler var. Halkı iki katlı evlerde oturur; evlerin önünde, en modern trafik düzeniyle donatılmış geniş caddelere bakan bahçeler vardır. Orada hiç trafik sorunu yoktur; şehir çok temizdir, ne kir vardır ne toz.<br>Şehirde seçkin okullar ve üniversiteler var; herkes kültürlüdür, okuma yazma bilmeyen hiç kimse yoktur. Halkı faziletlidir; birbirine saygı gösterir, Allah için sever, iyilik ve takvâda yardımlaşır. Her kötülükten güvendedirler; korkusuz ve kaygısız, güven ve barış içinde yaşarlar; orada ne hapishaneye ne mahkemeye ihtiyaç vardır. Bu şehirde iyiliğin sınırı yoktur, kötülüğün de yeri yoktur.<br>Gerçekte insan nerede olursa iyilik ve kötülük onunla beraberdir; bunlar iki zıttır ve hiçbir iki zıt bir araya gelmez. Toplumdaki faziletli insanların görevi iyiliği yaymaya çalışmak ve kötülüğü elden geldiğince ortadan kaldırmaktır. İyilik için çalışan erkekler de kadınlar da başarısız olmaz; Allah iyilik yapanların ecrini zayi etmez.",
      qa: [
        { q: "كَيْفَ هَذِهِ المَدِينَةُ مِنْ حَيْثُ الحَجْمُ؟", a: "هِيَ مَدِينَةٌ لَا كَبِيرَةٌ وَلَا صَغِيرَةٌ.", tr: "Şehir büyüklük bakımından nasıl? Ne büyük ne küçük." },
        { q: "هَلْ فِيهَا مُشْكِلَةُ مُرُورٍ؟", a: "لَا، لَا مُشْكِلَةَ مُرُورٍ فِيهَا.", tr: "Orada trafik sorunu var mı? Hayır, hiç yok." },
        { q: "هَلْ فِي المَدِينَةِ أُمِّيٌّ؟", a: "لَا، لَا أُمِّيَّ فِيهَا؛ كُلُّ النَّاسِ مُثَقَّفُونَ.", tr: "Şehirde okuma yazma bilmeyen var mı? Hayır, herkes kültürlü." },
        { q: "كَيْفَ يَعِيشُ أَهْلُهَا؟", a: "يَعِيشُونَ فِي أَمْنٍ وَسِلْمٍ بِلَا خَوْفٍ وَلَا قَلَقٍ.", tr: "Halkı nasıl yaşıyor? Korkusuz ve kaygısız, güven ve barış içinde." },
        { q: "مَا وَظِيفَةُ الفَاضِلِينَ فِي المُجْتَمَعِ؟", a: "السَّعْيُ فِي نَشْرِ الخَيْرِ وَالقَضَاءُ عَلَى الشَّرِّ.", tr: "Faziletlilerin toplumdaki görevi ne? İyiliği yaymak ve kötülüğü ortadan kaldırmak." }
      ],
      cls: { opts: RD, ar: "مَا نَوْعُ «لَا»؟", tr: "Koyu لَا cinsi nefy edip amel ediyor mu?", items: [
        { s: HL("مَدِينَةٌ لَا كَبِيرَةٌ وَلَا صَغِيرَةٌ", "لَا كَبِيرَةٌ"), a: "n", why: "Sıfatlara giren tekrarlı لَا: cins nefyi değil." },
        { s: HL("لَا مُشْكِلَةَ مُرُورٍ فِيهَا", "لَا مُشْكِلَةَ"), a: "c", why: "İsim muzâf, mansûb; haber فِيهَا." },
        { s: HL("لَا الوَسَخُ فِيهَا مَوْجُودٌ وَلَا الغُبَارُ", "لَا الوَسَخُ"), a: "i", why: "İsim ma’rife: amelsiz, tekrarlanmış." },
        { s: HL("لَا أُمِّيَّ فِيهَا", "لَا أُمِّيَّ"), a: "c", why: "Fetha üzere mebnî." },
        { s: HL("بِلَا خَوْفٍ وَلَا قَلَقٍ", "بِلَا خَوْفٍ"), a: "j", why: "Harf-i cerden sonra: amelsiz." },
        { s: HL("لَا فِيهَا حَاجَةٌ إِلَى سِجْنٍ", "لَا فِيهَا"), a: "i", why: "Araya فِيهَا girdi: amelsiz." },
        { s: HL("الخَيْرُ لَا حُدُودَ لَهُ", "لَا حُدُودَ"), a: "c", why: "Fetha üzere mebnî; haber لَهُ." },
        { s: HL("وَالشَّرُّ لَا مَقَرَّ لَهُ فِيهَا", "لَا مَقَرَّ"), a: "c", why: "Fetha üzere mebnî." },
        { s: HL("وَلَا ضِدَّيْنِ مُجْتَمِعَانِ", "وَلَا ضِدَّيْنِ"), a: "c", why: "Yâ üzere mebnî; haber مُجْتَمِعَانِ." },
        { s: HL("لَا سَاعِينَ فِي الخَيْرِ فَاشِلُونَ", "لَا سَاعِينَ"), a: "c", why: "Şibh-i muzâf: mansûb." },
        { s: HL("وَلَا سَاعِيَاتٍ فِي البِرِّ فَاشِلَاتٌ", "وَلَا سَاعِيَاتٍ"), a: "c", why: "Şibh-i muzâf: kesre ile mansûb, tenvinli." },
        { s: HL("وَاللهُ لَا يُضِيعُ أَجْرَ المُحْسِنِينَ", "لَا يُضِيعُ"), a: "n", why: "Fiile giren لَا." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["لَا {كَاذِبَ} مَمْدُوحٌ.", ["كَاذِبَ", "كَاذِبٌ", "كَاذِبًا"], "müfred: fetha üzere mebnî", "Hiçbir yalancı övülmez.", "u1"],
  ["لَا كَاذِبَ {مَمْدُوحٌ}.", ["مَمْدُوحٌ", "مَمْدُوحًا", "مَمْدُوحَ"], "haber merfû", "Hiçbir yalancı övülmez.", "u1"],
  ["لَا {إِكْرَاهَ} فِي الدِّينِ.", ["إِكْرَاهَ", "إِكْرَاهٌ", "إِكْرَاهًا"], "fetha üzere mebnî", "Dinde zorlama yoktur.", "u1"],
  ["{لَا} سَارِقَ أَمِينٌ.", ["لَا", "لَمْ", "لَنْ"], "isim cümlesine: لَا", "Hiçbir hırsız güvenilir değildir.", "u1"],
  ["لَا {خَيْرَ} فِي مَالٍ لَا يَنْفَعُ صَاحِبَهُ.", ["خَيْرَ", "خَيْرٌ", "خَيْرًا"], "fetha üzere mebnî", "Fayda vermeyen malda hayır yoktur.", "u1"],
  ["لَا {مُصَلِّيَيْنِ} فِي المَسْجِدِ الآنَ.", ["مُصَلِّيَيْنِ", "مُصَلِّيَانِ", "مُصَلِّيًا"], "müsennâ: yâ üzere", "Şu an mescitte namaz kılan yok.", "u2"],
  ["لَا {طَالِبَاتِ} فِي الحَدِيقَةِ الآنَ.", ["طَالِبَاتِ", "طَالِبَاتٍ", "طَالِبَاتُ"], "kesre üzere, tenvinsiz", "Şu an bahçede kız öğrenci yok.", "u2"],
  ["لَا {فَاعِلَ} شَرٍّ سَعِيدٌ.", ["فَاعِلَ", "فَاعِلًا", "فَاعِلُ"], "muzâf: mansûb", "Kötülük yapan mutlu olmaz.", "u2"],
  ["لَا {فَاعِلًا} شَرًّا سَعِيدٌ.", ["فَاعِلًا", "فَاعِلَ", "فَاعِلٌ"], "şibh-i muzâf: tenvinli", "Kötülük yapan mutlu olmaz.", "u2"],
  ["لَا {غَافِرًا} الذُّنُوبَ إِلَّا اللهُ.", ["غَافِرًا", "غَافِرَ", "غَافِرٌ"], "şibh-i muzâf", "Günahları Allah’tan başka bağışlayan yoktur.", "u2"],
  ["لَا {مُهَنْدِسِينَ} مُشَارِكُونَ فِي المَشْرُوعِ.", ["مُهَنْدِسِينَ", "مُهَنْدِسُونَ", "مُهَنْدِسًا"], "cem-i müz.: yâ üzere", "Projeye katılan mühendis yok.", "u2"],
  ["لَا {أَحَدَ} يُوَافِقُكَ عَلَى هَذَا الرَّأْيِ.", ["أَحَدَ", "أَحَدٌ", "أَحَدًا"], "fetha üzere mebnî", "Bu görüşte sana katılan kimse yok.", "u2"],
  ["لَا غَنِيَّ نَفْسٍ {فَقِيرٌ}.", ["فَقِيرٌ", "فَقِيرًا", "فَقِيرَ"], "haber merfû", "Gönlü zengin olan fakir değildir.", "u3"],
  ["لَا أَخَوَيْنِ {سِيَّانِ}.", ["سِيَّانِ", "سِيَّيْنِ", "سِيًّا"], "haber müsennâ merfû", "Hiçbir iki kardeş aynı değildir.", "u3"],
  ["لَا ضِدَّيْنِ {مُجْتَمِعَانِ}.", ["مُجْتَمِعَانِ", "مُجْتَمِعَيْنِ", "مُجْتَمِعٌ"], "haber merfû", "Hiçbir iki zıt bir araya gelmez.", "u3"],
  ["لَا مُتَعَاوِنِينَ عَلَى الخَيْرِ {نَادِمُونَ}.", ["نَادِمُونَ", "نَادِمِينَ", "نَادِمٌ"], "haber merfû", "İyilikte yardımlaşanlar pişman olmaz.", "u3"],
  ["لَا، لَا {مَوْعِدَ} عِنْدِي غَدًا.", ["مَوْعِدَ", "مَوْعِدٌ", "مَوْعِدًا"], "fetha üzere mebnî", "Hayır, yarın randevum yok.", "u3"],
  ["لَا {مَالَ} أَعَزُّ مِنَ العَقْلِ.", ["مَالَ", "مَالٌ", "مَالًا"], "fetha üzere mebnî", "Akıldan değerli mal yoktur.", "u3"],
  ["لَا {الكَاذِبُ} مَمْدُوحٌ وَلَا السَّارِقُ مَقْبُولٌ.", ["الكَاذِبُ", "الكَاذِبَ", "كَاذِبَ"], "ma’rife: amelsiz, merfû", "Ne yalancı övülür ne hırsız kabul görür.", "u4"],
  ["لَا فِي الصَّفِّ {طَالِبٌ} وَلَا مُعَلِّمٌ.", ["طَالِبٌ", "طَالِبَ", "طَالِبًا"], "fâsıl: amelsiz", "Sınıfta ne öğrenci var ne öğretmen.", "u4"],
  ["يُعَامِلُونَهُمْ بِلَا {رَحْمَةٍ}.", ["رَحْمَةٍ", "رَحْمَةَ", "رَحْمَةً"], "harf-i cerle mecrûr", "Onlara merhametsizce davranıyorlar.", "u4"],
  ["لَا {بَأْسَ}.", ["بَأْسَ", "بَأْسٌ", "بَأْسًا"], "haber hazfedilmiş", "Sakıncası yok.", "u4"],
  ["لَا حَوْلَ وَلَا {قُوَّةَ} إِلَّا بِاللهِ.", ["قُوَّةَ", "قُوَّةٌ", "قُوَّةً"], "fetha üzere mebnî", "Güç ve kuvvet ancak Allah’ladır.", "u4"],
  ["ذَلِكَ الكِتَابُ لَا {رَيْبَ} فِيهِ.", ["رَيْبَ", "رَيْبٌ", "رَيْبًا"], "fetha üzere mebnî", "Bu kitapta şüphe yoktur.", "u5"],
  ["قَالَ لَا {تَثْرِيبَ} عَلَيْكُمُ اليَوْمَ.", ["تَثْرِيبَ", "تَثْرِيبٌ", "تَثْرِيبًا"], "fetha üzere mebnî", "Bugün size kınama yok.", "u5"],
  ["لَا {أُمِّيَّ} فِيهَا.", ["أُمِّيَّ", "أُمِّيٌّ", "أُمِّيًّا"], "fetha üzere mebnî", "Orada okuma yazma bilmeyen yok.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["طَالِبٌ فِي الصَّفِّ ← لَا ile", "لَا طَالِبَ فِي الصَّفِّ", "لَا طَالِبٌ فِي الصَّفِّ", "لَا طَالِبًا فِي الصَّفِّ", "Müfred: fetha üzere mebnî.", "u1"],
  ["مُصَلِّيَانِ فِي المَسْجِدِ ← لَا ile", "لَا مُصَلِّيَيْنِ فِي المَسْجِدِ", "لَا مُصَلِّيَانِ فِي المَسْجِدِ", "لَا مُصَلِّيًا فِي المَسْجِدِ", "Müsennâ: yâ üzere mebnî.", "u2"],
  ["طَالِبَاتٌ فِي الحَدِيقَةِ ← لَا ile", "لَا طَالِبَاتِ فِي الحَدِيقَةِ", "لَا طَالِبَاتٌ فِي الحَدِيقَةِ", "لَا طَالِبَاتٍ فِي الحَدِيقَةِ", "Kesre üzere mebnî, tenvinsiz.", "u2"],
  ["مُعَلِّمُونَ غَائِبُونَ ← لَا ile", "لَا مُعَلِّمِينَ غَائِبُونَ", "لَا مُعَلِّمُونَ غَائِبُونَ", "لَا مُعَلِّمِينَ غَائِبِينَ", "İsim yâ üzere, haber merfû.", "u2"],
  ["فَاعِلُ شَرٍّ سَعِيدٌ ← لَا ile", "لَا فَاعِلَ شَرٍّ سَعِيدٌ", "لَا فَاعِلُ شَرٍّ سَعِيدٌ", "لَا فَاعِلًا شَرٍّ سَعِيدٌ", "Muzâf: mansûb, tenvinsiz.", "u2"],
  ["فَاعِلٌ شَرًّا سَعِيدٌ ← لَا ile", "لَا فَاعِلًا شَرًّا سَعِيدٌ", "لَا فَاعِلَ شَرًّا سَعِيدٌ", "لَا فَاعِلٌ شَرًّا سَعِيدٌ", "Şibh-i muzâf: mansûb, tenvinli.", "u2"],
  ["هَلْ عِنْدَكُمْ طَعَامٌ؟ ← لَا ile cevapla", "لَا طَعَامَ عِنْدَنَا", "لَا طَعَامٌ عِنْدَنَا", "لَا طَعَامًا عِنْدَنَا", "Fetha üzere mebnî.", "u3"],
  ["هَلِ المُقَصِّرُونَ نَاجِحُونَ؟ ← لَا ile", "لَا مُقَصِّرِينَ نَاجِحُونَ", "لَا مُقَصِّرُونَ نَاجِحُونَ", "لَا المُقَصِّرِينَ نَاجِحُونَ", "Nekreye çevrilir; yâ üzere mebnî.", "u3"],
  ["هَلِ الظَّالِمُ النَّاسَ مَحْبُوبٌ؟ ← لَا ile", "لَا ظَالِمًا النَّاسَ مَحْبُوبٌ", "لَا ظَالِمَ النَّاسَ مَحْبُوبٌ", "لَا الظَّالِمَ النَّاسَ مَحْبُوبٌ", "Şibh-i muzâf: tenvinli.", "u3"],
  ["لَا كَاذِبَ مَمْدُوحٌ ← الكَاذِبُ ile", "لَا الكَاذِبُ مَمْدُوحٌ وَلَا السَّارِقُ", "لَا الكَاذِبَ مَمْدُوحٌ", "لَا الكَاذِبُ مَمْدُوحًا", "Ma’rife: amelsiz, tekrar gerekir.", "u4"],
  ["لَا طَالِبَ فِي الصَّفِّ ← araya فِي الصَّفِّ", "لَا فِي الصَّفِّ طَالِبٌ وَلَا مُعَلِّمٌ", "لَا فِي الصَّفِّ طَالِبَ", "لَا فِي الصَّفِّ طَالِبًا وَلَا مُعَلِّمًا", "Fâsıl: amelsiz, tekrar gerekir.", "u4"],
  ["لَا رَحْمَةَ ← بِـ ile", "بِلَا رَحْمَةٍ", "بِلَا رَحْمَةَ", "بِلَا رَحْمَةٌ", "Harf-i cer: isim mecrûr.", "u4"],
  ["إِلَهٌ مَوْجُودٌ إِلَّا اللهُ ← لَا ile, haberi at", "لَا إِلَهَ إِلَّا اللهُ", "لَا إِلَهٌ إِلَّا اللهُ", "لَا إِلَهًا إِلَّا اللهُ", "Haber anlaşılınca hazfedilir.", "u4"],
  ["ضِدَّانِ مُجْتَمِعَانِ ← لَا ile", "لَا ضِدَّيْنِ مُجْتَمِعَانِ", "لَا ضِدَّانِ مُجْتَمِعَانِ", "لَا ضِدَّيْنِ مُجْتَمِعَيْنِ", "İsim yâ üzere, haber merfû.", "u5"]
];
// İsmin hükmü hız oyunu
var NOUN_LIST = UNITS[1].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = IB;
// İptal sebebi hız oyunu
var MM_OPTS = SB;
var MM_LIST = UNITS[3].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  hk: { name: "Örnek ↔ hüküm", pairs: [["لَا كَاذِبَ", "müfred: fetha üzere mebnî"], ["لَا مُصَلِّيَيْنِ", "müsennâ: yâ üzere mebnî"], ["لَا طَالِبَاتِ", "cem-i müen.: kesre üzere"], ["لَا فَاعِلَ شَرٍّ", "muzâf: mansûb"], ["لَا فَاعِلًا شَرًّا", "şibh-i muzâf: mansûb"], ["لَا الكَاذِبُ… وَلَا…", "ma’rife: amelsiz"], ["لَا فِي الصَّفِّ طَالِبٌ", "fâsıl: amelsiz"], ["بِلَا رَحْمَةٍ", "harf-i cer: amelsiz"]] },
  kb: { name: "Kalıp sözler", pairs: [["لَا شَكَّ", "şüphesiz"], ["لَا رَيْبَ", "kuşkusuz"], ["لَا جَرَمَ", "elbette"], ["لَا بُدَّ", "mutlaka"], ["لَا بَأْسَ", "sakıncası yok"], ["لَا مَحَالَةَ", "kaçınılmaz"], ["لَا ضَيْرَ", "zararı yok"], ["لَا غَرْوَ", "şaşılacak bir şey yok"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["لَا إِلَهَ إِلَّا اللهُ", "Allah’tan başka ilah yoktur"], ["لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", "güç ve kuvvet ancak Allah’ladır"], ["لَا إِكْرَاهَ فِي الدِّينِ", "dinde zorlama yoktur"], ["لَا ضَرَرَ وَلَا ضِرَارَ", "zarar vermek de karşılık vermek de yok"], ["لَا كَاذِبَ مَمْدُوحٌ", "hiçbir yalancı övülmez"], ["لَا تَثْرِيبَ عَلَيْكُمُ اليَوْمَ", "bugün size kınama yok"], ["لَا رَيْبَ فِيهِ", "onda şüphe yok"], ["لَا نِهَايَةَ لِلْخَيَالِ", "hayalin sonu yoktur"]] }
};
var KARTLAR = [
  ["Cinsini nefy eden لَا nasıl amel eder?", "إِنَّ gibi: ismi mansûb (ya da mebnî), haberi merfû."],
  ["Neyi nefyeder?", "Haberi, ismin cinsinin bütün fertlerinden: لَا كَاذِبَ مَمْدُوحٌ"],
  ["Müfred isim?", "Nasb alâmeti üzere mebnî: كَاذِبَ، مُصَلِّيَيْنِ، طَالِبَاتِ"],
  ["Muzâf isim?", "Mansûb: لَا فَاعِلَ شَرٍّ سَعِيدٌ"],
  ["Şibh-i muzâf?", "Mansûb, tenvinli: لَا فَاعِلًا شَرًّا سَعِيدٌ"],
  ["Üç şart?", "İsim nekre · bitişik · لَا’ya harf-i cer girmemiş"],
  ["İsim ma’rife olursa?", "Amel yok, لَا tekrarlanır: لَا الكَاذِبُ… وَلَا السَّارِقُ…"],
  ["Araya fâsıl girerse?", "Amel yok, tekrar: لَا فِي الصَّفِّ طَالِبٌ وَلَا مُعَلِّمٌ"],
  ["بِلَا رَحْمَةٍ?", "Harf-i cer: amel yok, isim mecrûr; tekrar gerekmez."],
  ["Haber ne zaman hazfedilir?", "Anlaşılınca: لَا إِلَهَ إِلَّا اللهُ"],
  ["Kalıp sözler?", "لَا شَكَّ، لَا رَيْبَ، لَا بُدَّ، لَا بَأْسَ، لَا جَرَمَ…"],
  ["لَا طَالِبَاتٍ mı لَا طَالِبَاتِ mı?", "Mebnî isim tenvin almaz: لَا طَالِبَاتِ."]
];
