// ================= VERİ: Mef’ûlün Maah (المَفْعُولُ مَعَهُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "النَّاصِبُ", tr: "Nâsıb (âmil)" }, nasb: { ar: "المَفْعُولُ مَعَهُ", tr: "Mef’ûlün maah" }, cerr: { ar: "المَعْطُوفُ", tr: "Ma’tûf (atıf)" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var VT = [["m", "Maiyyet (مَعَ)", "وَاوُ المَعِيَّةِ", "nasb"], ["a", "Atıf (ortaklık)", "وَاوُ العَطْفِ", "cerr"], ["h", "Hâl", "وَاوُ الحَالِ", "mi"]];
var SR = [["e", "Mef’ûlün maah olur", "يَصِحُّ مَفْعُولًا مَعَهُ", "nasb"], ["a", "Olmaz: vâv ortaklık bildirir", "الوَاوُ لِلْعَطْفِ", "cerr"], ["h", "Olmaz: hâl vâvı", "الوَاوُ لِلْحَالِ", "mi"], ["c", "Olmaz: öncesi cümle değil", "لَيْسَ قَبْلَهُ جُمْلَةٌ", "ref"]];
var HK = [["m", "Mef’ûlün maah (vâcib)", "يَجِبُ نَصْبُهُ مَفْعُولًا مَعَهُ", "nasb"], ["a", "Ma’tûf (vâcib)", "يَجِبُ عَطْفُهُ", "cerr"], ["c", "İkisi de câiz", "يَجُوزُ الوَجْهَانِ", "mi"]];
var NS = [["f", "Fiil", "فِعْلٌ", "nasb"], ["a", "İsm-i fâil", "اسْمُ فَاعِلٍ", "cerr"], ["o", "İsm-i mef’ûl", "اسْمُ مَفْعُولٍ", "mi"], ["s", "Masdar", "مَصْدَرٌ", "ref"], ["i", "İsm-i fiil", "اسْمُ فِعْلٍ", "mz"], ["x", "İsim değil: fiil mansûb", "فِعْلٌ مَنْصُوبٌ", "x"]];
var RV = [["m", "Vâv-ı maiyyet", "وَاوُ المَعِيَّةِ", "nasb"], ["a", "Atıf vâvı", "وَاوُ العَطْفِ", "cerr"], ["h", "Hâl vâvı", "وَاوُ الحَالِ", "mi"], ["q", "Kasem vâvı", "وَاوُ القَسَمِ", "ref"], ["i", "Başlangıç (isti’nâf) vâvı", "وَاوُ الاسْتِئْنَافِ", "x"]];
var TUR_TR = { m: "Maiyyet", a: "Atıf", h: "Hâl", f: "Fiil", o: "İsm-i mef’ûl", s: "Masdar", i: "İsm-i fiil", x: "Fiil mansûb", e: "Olur", c: "Öncesi cümle değil" };
// Makine: [vâva kadar, mansûb, merfû, hüküm (m maah vâcib / a atıf vâcib / c câiz), Türkçe (maah), Türkçe (atıf), gerekçe]
var MV = [
  ["اسْتَيْقَظْتُ وَ", "طُلُوعَ الفَجْرِ", "طُلُوعُ الفَجْرِ", "m", "Tan ağarırken uyandım.", "", "Tan ağarması uyanmaz: ortaklık olmaz, yalnız “ile birlikte”."],
  ["تَحَاوَرَ النَّائِبُ وَ", "الوَزِيرَ", "الوَزِيرُ", "a", "", "Milletvekili ile bakan karşılıklı konuştu.", "تَفَاعَلَ fiili iki taraf ister: ortaklık zorunlu, atıf vâcib."],
  ["حَضَرَ الجُنْدُ وَ", "الأَمِيرَ", "الأَمِيرُ", "c", "Askerler emirle birlikte geldi.", "Askerler ve emir geldi.", "Emir de gelebilir: iki anlam da doğru, ikisi de câiz."],
  ["سِرْتُ وَ", "الشَّاطِئَ", "الشَّاطِئُ", "m", "Sahil boyunca yürüdüm.", "", "Sahil yürümez: yalnız maiyyet."],
  ["اشْتَرَكَ إِبْرَاهِيمُ وَ", "مَاجِدًا", "مَاجِدٌ", "a", "", "İbrahim ile Mâcid ortak oldu.", "اشْتَرَكَ ortaklık ister: atıf vâcib."],
  ["جِئْتُ أَنَا وَ", "صَالِحًا", "صَالِحٌ", "c", "Ben Salih’le birlikte geldim.", "Ben ve Salih geldik.", "Zamir أَنَا ile pekiştirildiği için atıf da güzel olur: ikisi câiz."]
];
var MW = [["Mansûb · maiyyet", "nasb"], ["Merfû · atıf", "cerr"]];

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
// Vâv kalıbı: [vâva kadar, [isim ×3], arkası, [etiket ×3], Türkçe, açıklama, öteki doğru cevaplar [[isim, etiket]]]
function VW(lbl) {
  return function (x, i) {
    var r = CBP([x[0], x[1], x[2] + " ← " + lbl, x[3]], i, x[4], x[5]), sl = r.p.filter(function (y) { return typeof y !== "string"; });
    (x[6] || []).forEach(function (av) { r.ok.push(av.map(function (v, k) { return sl[k].o.indexOf(v); })); });
    return r;
  };
}
var TM = ["بِمَعْنَى «مَعَ»", "لِلْعَطْفِ", "لِلْحَالِ"], TA = ["لِلْعَطْفِ", "بِمَعْنَى «مَعَ»", "لِلْحَالِ"], TH = ["لِلْحَالِ", "بِمَعْنَى «مَعَ»", "لِلْعَطْفِ"];
var GM = ["مَفْعُولٌ مَعَهُ", "اسْمٌ مَعْطُوفٌ", "يَجُوزُ الوَجْهَانِ"], GA = ["اسْمٌ مَعْطُوفٌ", "مَفْعُولٌ مَعَهُ", "يَجُوزُ الوَجْهَانِ"], GC = ["يَجُوزُ الوَجْهَانِ", "مَفْعُولٌ مَعَهُ", "اسْمٌ مَعْطُوفٌ"],
    GH = ["وَاوُ الحَالِ: مُبْتَدَأٌ", "مَفْعُولٌ مَعَهُ", "اسْمٌ مَعْطُوفٌ"], GF = ["مُضَارِعٌ مَنْصُوبٌ بَعْدَ وَاوِ المَعِيَّةِ", "مَفْعُولٌ مَعَهُ", "اسْمٌ مَعْطُوفٌ"];
var SM = ["لِأَنَّهُ وَاوُ المَعِيَّةِ", "لِأَنَّهُ وَاوُ العَطْفِ", "لِأَنَّهُ وَاوُ الحَالِ"], SA = ["لِأَنَّهُ وَاوُ العَطْفِ", "لِأَنَّهُ وَاوُ المَعِيَّةِ", "لِأَنَّهُ وَاوُ الحَالِ"], SH = ["لِأَنَّهُ وَاوُ الحَالِ", "لِأَنَّهُ وَاوُ المَعِيَّةِ", "لِأَنَّهُ وَاوُ العَطْفِ"];

var UNITS = [
// ---------------------------------------------------------------- 1 · TANIM VE VÂVIN TÜRÜ
{
  id: "u1", no: 1, ar: "المَفْعُولُ مَعَهُ وَوَاوُ المَعِيَّةِ", tr: "Mef’ûlün Maah ve Vâvın Türü", short: "Tanım", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Mef’ûlün maahın “مَعَ” anlamındaki vâvdan sonra gelen mansûb isim olduğunu bilmek", "Vâvın maiyyet mi, atıf mı, hâl mi olduğunu ayırmak", "Vâvdan sonraki ismi doğru harekelemek"],
  examples: [
    { s: "اسْتَيْقَظْتُ:mz / وَطُلُوعَ الفَجْرِ.:nasb", tr: "Tan ağarırken (tan ağarmasıyla birlikte) uyandım.", pair: "تَحَاوَرَ:- / النَّائِبُ:- / وَالوَزِيرُ.:cerr", pairTr: "Milletvekili ile bakan karşılıklı konuştu. (atıf)" },
    { s: "مَشَيْتُ:mz / وَشَاطِئَ البَحْرِ.:nasb", tr: "Deniz kıyısı boyunca yürüdüm. (مَعَ شَاطِئِ البَحْرِ)" }
  ],
  rules: [
    { tr: "<b>Mef’ûlün maah</b> (<span class=\"ar\">المَفْعُولُ مَعَهُ</span>): “<span class=\"ar\">مَعَ</span>” anlamındaki vâvdan sonra gelip fiilin <b>kiminle / neyle birlikte</b> olduğunu bildiren <b>mansûb isimdir</b>. Bu vâva <b>vâv-ı maiyyet</b> denir:", ex: ["مَشَيْتُ وَشَاطِئَ البَحْرِ = مَشَيْتُ مَعَ شَاطِئِ البَحْرِ"] },
    { tr: "Vâvın üç türü: <b>maiyyet</b> (<span class=\"ar\">اسْتَيْقَظْتُ وَطُلُوعَ الفَجْرِ</span>: isim mansûb), <b>atıf</b> (<span class=\"ar\">تَحَاوَرَ النَّائِبُ وَالوَزِيرُ</span>: isim öncekine uyar), <b>hâl</b> (<span class=\"ar\">قَدَّمْنَا عَرْضَنَا وَالجُمْهُورُ يُشَاهِدُونَنَا</span>: ardından isim cümlesi gelir)." },
    { tr: "Ayırt etme yolu: vâv yerine <span class=\"ar\">مَعَ</span> koy. Anlam bozulmuyor ve vâvdan sonraki isim fiili yapmıyorsa maiyyettir. Tan ağarması “uyanmaz”, sahil “yürümez”." },
    { tr: "Vâvdan sonra muzâri gelirse (<span class=\"ar\">لَا تَنْظُرْ إِلَى عُيُوبِ النَّاسِ وَتُهْمِلَ عُيُوبَ نَفْسِكَ</span>) vâv yine “مَعَ” anlamındadır. Ancak fiil, gizli <span class=\"ar\">أَنْ</span> ile mansûb olur; bu bir mef’ûlün maah değildir." }
  ],
  kaide: ["المَفْعُولُ مَعَهُ: اسْمٌ مَنْصُوبٌ يَأْتِي بَعْدَ وَاوٍ بِمَعْنَى «مَعَ» لِبَيَانِ مَنْ وَقَعَ الفِعْلُ بِصُحْبَتِهِ أَوْ مَعِيَّتِهِ، وَتُسَمَّى هَذِهِ الوَاوُ وَاوَ المَعِيَّةِ، مِثْلُ: مَشَيْتُ وَشَاطِئَ البَحْرِ (أَيْ: مَعَ شَاطِئِ البَحْرِ)."],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنْ نَوْعَ الوَاوِ فِي الجُمَلِ الآتِيَةِ وَاضْبِطِ الاسْمَ بَعْدَهُ", tr: "Vâvdan sonraki ismin harekesini ve vâvın türünü seç.", exHtml: "<span class=\"ar\">صَحَا يَحْيَى وَطُلُوعَ الشَّمْسِ: بِمَعْنَى «مَعَ» · تَحَاوَرَ رَئِيسُ الجُمْهُورِيَّةِ وَالوَزِيرُ: لِلْعَطْفِ · سَبَحْنَا وَالمُشْرِفُ يُرَاقِبُنَا: لِلْحَالِ</span>", items: [
      ["وَصَلَ مُحَمَّدٌ إِلَى دَارِهِ وَ", ["غُرُوبَ", "غُرُوبُ", "غُرُوبِ"], "الشَّمْسِ.", TM, "Muhammed güneş batarken evine vardı.", "Güneşin batışı varmaz: maiyyet, mansûb."],
      ["سَافَرْتُ وَ", ["صَالِحًا", "صَالِحٌ", "صَالِحٍ"], "إِلَى إِسْطَنْبُولَ.", TM, "Salih’le birlikte İstanbul’a yolculuk ettim.", "Bitişik merfû zamire (تُ) pekiştirmesiz atıf zayıftır: maiyyet."],
      ["لَعِبْنَا وَ", ["فَرِيقَ", "فَرِيقُ", "فَرِيقِ"], "كُلِّيَّتِنَا فِي النَّادِي الرِّيَاضِيِّ.", TM, "Spor kulübünde fakültemizin takımıyla oynadık.", "Zamire (نَا) atıf zayıf: maiyyet."],
      ["سِرْنَا وَ", ["مَضِيقَ", "مَضِيقُ", "مَضِيقِ"], "البُوسْفُورِ فِي جَوْلَةٍ بَحْرِيَّةٍ.", TM, "Bir deniz gezisinde Boğaz boyunca ilerledik.", "Boğaz yürümez: maiyyet."],
      ["جَلَسْنَا وَ", ["أُسْتَاذُنَا", "أُسْتَاذَنَا", "أُسْتَاذِنَا"], "يَعِظُنَا.", TH, "Hocamız bize öğüt verirken oturduk.", "Ardından isim cümlesi (أُسْتَاذُنَا يَعِظُنَا): hâl vâvı, mübtedâ merfû."],
      ["قَرَأَتْ نَجْلَاءُ وَ", ["أَخُوهَا", "أَخَاهَا", "أَخِيهَا"], "الصَّغِيرُ قِصَّةً مُسَلِّيَةً.", TA, "Necla ile küçük kardeşi eğlenceli bir hikâye okudu.", "Sıfat الصَّغِيرُ merfû: atıf (ikisi de okudu)."],
      ["لَا تَنْظُرْ إِلَى عُيُوبِ النَّاسِ وَ", ["تُهْمِلَ", "تُهْمِلُ", "تُهْمِلْ"], "عُيُوبَ نَفْسِكَ.", TM, "Kendi kusurlarını ihmal ederek insanların kusurlarına bakma.", "Vâv “مَعَ” anlamında, ardından fiil: gizli أَنْ ile mansûb (تُهْمِلَ)."],
      ["يَجِبُ أَنْ تَسِيرَ وَ", ["المَحَلَّاتِ", "المَحَلَّاتُ", "المَحَلَّاتَ"], "التِّجَارِيَّةَ.", TM, "Mağazalar boyunca yürümelisin.", "Maiyyet; cem-i müennes sâlim kesreyle mansûb."]
    ].map(VW("نَوْعُ الوَاوِ:")) },
    { type: "classify", extra: true, opts: VT, ar: "مَا نَوْعُ الوَاوِ؟", tr: "Koyu vâv maiyyet mi, atıf mı, hâl mi?", items: CL([
      [HL("اسْتَيْقَظْتُ وَطُلُوعَ الفَجْرِ", "وَطُلُوعَ"), "m", "مَعَ طُلُوعِ الفَجْرِ."],
      [HL("تَحَاوَرَ النَّائِبُ وَالوَزِيرُ", "وَالوَزِيرُ"), "a", "İkisi de konuştu."],
      [HL("قَدَّمْنَا عَرْضَنَا وَالجُمْهُورُ يُشَاهِدُونَنَا", "وَالجُمْهُورُ"), "h", "Ardından isim cümlesi."],
      [HL("صَحَا يَحْيَى وَطُلُوعَ الشَّمْسِ", "وَطُلُوعَ"), "m", "Güneşin doğuşuyla birlikte."],
      [HL("سَبَحْنَا وَالمُشْرِفُ يُرَاقِبُنَا", "وَالمُشْرِفُ"), "h", "Gözetmen bizi izlerken."],
      [HL("سَافَرَ أَحْمَدُ وَأَبُوهُ بِالقِطَارِ", "وَأَبُوهُ"), "a", "İkisi de yolculuk etti."],
      [HL("مَشَيْتُ وَشَاطِئَ البَحْرِ", "وَشَاطِئَ"), "m", "Kıyı boyunca."],
      [HL("جَلَسْنَا وَأُسْتَاذُنَا يَعِظُنَا", "وَأُسْتَاذُنَا"), "h", "Hâl cümlesi."],
      [HL("اشْتَرَكَ إِبْرَاهِيمُ وَمَاجِدٌ", "وَمَاجِدٌ"), "a", "Ortaklık fiili."],
      [HL("سِرْ وَالطَّرِيقَ تَصِلْ إِلَى المَسْجِدِ", "وَالطَّرِيقَ"), "m", "Yol boyunca yürü."],
      [HL("نَزَلَ المَطَرُ وَالمِظَلَّةُ عَلَى رَأْسِي", "وَالمِظَلَّةُ"), "h", "Şemsiye başımdayken."],
      [HL("تَحَاوَرَ رَئِيسُ الجُمْهُورِيَّةِ وَالوَزِيرُ", "وَالوَزِيرُ"), "a", "Karşılıklı konuşma."]
    ]) },
    { type: "tag", extra: true, roles: ["mz", "nasb", "cerr", "x"], ar: "عَيِّنِ النَّاصِبَ وَالمَفْعُولَ مَعَهُ", tr: "Nâsıbı (âmili), mef’ûlün maahı ve ma’tûfu etiketle.", items: [
      T("اسْتَيْقَظْتُ:mz / وَطُلُوعَ الفَجْرِ:nasb", "Tan ağarırken uyandım.", "Nâsıb: fiil."),
      T("سِرْ:mz / وَالطَّرِيقَ:nasb / تَصِلْ إِلَى المَسْجِدِ:x", "Yol boyunca yürü, mescide varırsın.", "Nâsıb: emir fiili."),
      T("تَحَاوَرَ:x / النَّائِبُ:x / وَالوَزِيرُ:cerr", "Milletvekili ile bakan karşılıklı konuştu.", "Atıf: الوَزِيرُ fâile uyar."),
      T("الظِّلُّ:x / مَائِلٌ:mz / وَالشَّجَرَ:nasb", "Gölge ağaçla birlikte eğik.", "Nâsıb: ism-i fâil."),
      T("يَسُرُّنِي:x / حُضُورُكَ:mz / وَالأُسْرَةَ:nasb", "Ailenle birlikte gelişin beni sevindirir.", "Nâsıb: masdar."),
      T("رُوَيْدَكَ:mz / وَالإِبِلَ:nasb", "Develerle yavaş ol (onlara yumuşak davran).", "Nâsıb: ism-i fiil."),
      T("سَافَرَ:x / أَحْمَدُ:x / وَأَبُوهُ:cerr / بِالقِطَارِ السَّرِيعِ:x", "Ahmed ile babası hızlı trenle yolculuk etti.", "Atıf: merfû."),
      T("الحَدِيقَةُ:x / مَخْدُومَةٌ:mz / وَشَجَرَهَا:nasb", "Bahçe ağaçlarıyla birlikte bakımlı.", "Nâsıb: ism-i mef’ûl.")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · ŞARTLAR
{
  id: "u2", no: 2, ar: "شُرُوطُ المَفْعُولِ مَعَهُ", tr: "Mef’ûlün Maahın Şartları", short: "Şartlar", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Vâvın “مَعَ” anlamında olması gerektiğini bilmek", "Vâvdan önce bir cümle bulunması gerektiğini bilmek", "Mef’ûlün maahın fazla (atılabilir) olduğunu bilmek"],
  examples: [
    { s: "وَصَلَ:mz / مُحَمَّدٌ:- / وَغُرُوبَ الشَّمْسِ.:nasb", tr: "Muhammed güneş batarken vardı. (öncesi tam cümle)" },
    { s: "سِرْ:mz / وَالطَّرِيقَ:nasb / تَصِلْ إِلَى المَسْجِدِ.:-", tr: "Yol boyunca yürü, mescide varırsın. (وَالطَّرِيقَ atılsa da cümle tamam)" }
  ],
  rules: [
    { tr: "<b>1. şart</b>: vâv “<span class=\"ar\">مَعَ</span>” anlamında olmalı; atıf (ortaklık) ya da hâl vâvı olmamalı:", ex: ["اسْتَيْقَظْتُ وَطُلُوعَ الفَجْرِ (مَعَ)", "تَحَاوَرَ النَّائِبُ وَالوَزِيرُ (عَطْفٌ) · قَدَّمْنَا عَرْضَنَا وَالجُمْهُورُ يُشَاهِدُونَنَا (حَالٌ)"] },
    { tr: "<b>2. şart</b>: vâvdan önce bir <b>cümle</b> bulunmalı: <span class=\"ar\">وَصَلَ مُحَمَّدٌ وَغُرُوبَ الشَّمْسِ</span>. Öncesi cümle değilse vâv atıftır: <span class=\"ar\">كُلُّ رَجُلٍ وَضَيْعَتُهُ · أَنْتَ وَشَأْنُكَ</span> (haber gizli)." },
    { tr: "<b>3. şart</b>: <b>fazla</b> olmalı, yani cümlenin temel öğesi olmamalı; atılınca cümle yine tam ve anlaşılır kalmalı: <span class=\"ar\">سِرْ وَالطَّرِيقَ تَصِلْ إِلَى المَسْجِدِ</span>." }
  ],
  kaide: ["وَيُشْتَرَطُ فِي المَفْعُولِ مَعَهُ: أ ـ أَنْ تَكُونَ وَاوُهُ بِمَعْنَى «مَعَ» لَا بِمَعْنَى العَطْفِ أَوِ الحَالِ. ب ـ أَنْ يَكُونَ مَا قَبْلَهُ جُمْلَةً، مِثْلُ: وَصَلَ مُحَمَّدٌ وَغُرُوبَ الشَّمْسِ. جـ ـ أَنْ يَكُونَ فَضْلَةً، أَيْ لَيْسَ عُنْصُرًا أَسَاسِيًّا فِي الجُمْلَةِ، وَيُمْكِنُ الاسْتِغْنَاءُ عَنْهُ، مِثْلُ: سِرْ وَالطَّرِيقَ تَصِلْ إِلَى المَسْجِدِ."],
  ex: [
    { type: "classify", extra: true, opts: SR, ar: "هَلْ يَصِحُّ مَا بَعْدَ الوَاوِ مَفْعُولًا مَعَهُ؟", tr: "Vâvdan sonraki isim mef’ûlün maah olabilir mi? Olamazsa hangi şart eksik?", items: CL([
      [HL("سِرْتُ وَالنَّهْرَ", "وَالنَّهْرَ"), "e", "Nehir boyunca: şartlar tamam."],
      [HL("تَحَاوَرَ النَّائِبُ وَالوَزِيرُ", "وَالوَزِيرُ"), "a", "Ortaklık zorunlu."],
      [HL("قَدَّمْنَا عَرْضَنَا وَالجُمْهُورُ يُشَاهِدُونَنَا", "وَالجُمْهُورُ"), "h", "Ardından isim cümlesi: hâl."],
      [HL("كُلُّ رَجُلٍ وَضَيْعَتُهُ", "وَضَيْعَتُهُ"), "c", "Öncesi cümle değil (كُلُّ رَجُلٍ)."],
      [HL("اشْتَرَكَ إِبْرَاهِيمُ وَمَاجِدٌ", "وَمَاجِدٌ"), "a", "Ortaklık fiili."],
      [HL("مَشَيْتُ وَشَاطِئَ البَحْرِ", "وَشَاطِئَ"), "e", "Tamam."],
      [HL("سَبَحْنَا وَالمُشْرِفُ يُرَاقِبُنَا", "وَالمُشْرِفُ"), "h", "Hâl."],
      [HL("أَنْتَ وَشَأْنُكَ", "وَشَأْنُكَ"), "c", "Öncesi yalnız أَنْتَ: cümle değil."],
      [HL("اسْتَيْقَظْتُ وَطُلُوعَ الفَجْرِ", "وَطُلُوعَ"), "e", "Tamam."],
      [HL("جَلَسْنَا وَأُسْتَاذُنَا يَعِظُنَا", "وَأُسْتَاذُنَا"), "h", "Hâl."],
      [HL("تَخَاصَمَ زَيْدٌ وَعَمْرٌو", "وَعَمْرٌو"), "a", "تَفَاعَلَ: ortaklık."],
      [HL("وَصَلَ مُحَمَّدٌ وَغُرُوبَ الشَّمْسِ", "وَغُرُوبَ"), "e", "Tamam."]
    ]) },
    { type: "pick", extra: true, ar: "أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مَعَهُ؟", tr: "Mef’ûlün maah bulunan cümleyi seç.", items: PL([
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مَعَهُ؟ (١)", "سِرْتُ وَالنَّهْرَ.", "سِرْتُ وَالنَّاسُ نِيَامٌ.", "سِرْتُ أَنَا وَأَخِي.", "Nehir boyunca yürüdüm.", "النَّاسُ نِيَامٌ hâl cümlesi; أَنَا وَأَخِي atıf."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مَعَهُ؟ (٢)", "خَرَجْنَا مِنَ الجَامِعَةِ وَأَذَانَ العِشَاءِ.", "خَرَجْنَا مِنَ الجَامِعَةِ وَالأَذَانُ يُرْفَعُ.", "خَرَجَ الطُّلَّابُ وَالأَسَاتِذَةُ مِنَ الجَامِعَةِ.", "Yatsı ezanıyla birlikte üniversiteden çıktık.", "Ezan “çıkmaz”: maiyyet."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مَعَهُ؟ (٣)", "عَادَ المُسَافِرُ وَاللَّيْلَ.", "عَادَ المُسَافِرُ وَصَدِيقُهُ.", "عَادَ المُسَافِرُ وَاللَّيْلُ مُظْلِمٌ.", "Yolcu geceyle birlikte döndü.", "Gece dönmez: maiyyet."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مَعَهُ؟ (٤)", "الظِّلُّ مَائِلٌ وَالشَّجَرَ.", "الظِّلُّ وَالشَّجَرُ مَائِلَانِ.", "مَالَ الظِّلُّ وَالشَّمْسُ غَارِبَةٌ.", "Gölge ağaçla birlikte eğik.", "Nâsıb ism-i fâil مَائِلٌ."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مَعَهُ؟ (٥)", "كَيْفَ أَنْتَ وَالبَرْدَ؟", "كَيْفَ أَنْتَ وَأَخُوكَ؟", "كَيْفَ حَالُكَ وَالجَوُّ بَارِدٌ؟", "Soğukla aran nasıl?", "كَيْفَ’ten sonra işitilmiş mansûb."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مَعَهُ؟ (٦)", "صَحَا يَحْيَى وَطُلُوعَ الشَّمْسِ.", "صَحَا يَحْيَى وَأُخْتُهُ.", "صَحَا يَحْيَى وَالشَّمْسُ طَالِعَةٌ.", "Yahya güneş doğarken uyandı.", "Güneşin doğuşu uyanmaz."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · HÜKÜMLER
{
  id: "u3", no: 3, ar: "أَحْكَامُ الاسْمِ بَعْدَ الوَاوِ", tr: "Vâvdan Sonraki İsmin Hükümleri", short: "Hükümler", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["Mef’ûlün maah olmanın vâcib olduğu yerleri bilmek", "Atfın vâcib olduğu yerleri bilmek", "İkisinin de câiz olduğu yerleri bilmek"],
  examples: [
    { s: "حَضَرْتُ:mz / إِلَى بَلَدِي:- / وَطُلُوعَ الشَّمْسِ.:nasb", tr: "Güneş doğarken memleketime vardım. (maah vâcib)" },
    { s: "سَافَرَ:- / أَحْمَدُ:- / وَأَبُوهُ:cerr / بِالقِطَارِ السَّرِيعِ.:-", tr: "Ahmed ile babası hızlı trenle yolculuk etti. (kitaba göre atıf)", pair: "حَضَرَ:mz / الجُنْدُ:- / وَالأَمِيرُ / وَالأَمِيرَ.:nasb", pairTr: "Askerler ve emir geldi / askerler emirle birlikte geldi. (ikisi de câiz)" }
  ],
  rules: [
    { tr: "<b>Mef’ûlün maah vâcib</b>: vâvdan sonraki isim fiile ortak olamıyorsa: <span class=\"ar\">حَضَرْتُ إِلَى بَلَدِي وَطُلُوعَ الشَّمْسِ · سِرْتُ وَالشَّاطِئَ · عَادَ المُسَافِرُ وَاللَّيْلَ</span>. Bitişik merfû zamire pekiştirmesiz atıf da zayıftır: <span class=\"ar\">سَافَرْتُ وَصَالِحًا</span>." },
    { tr: "<b>Atıf vâcib</b>: fiil iki tarafı gerektiriyorsa (<span class=\"ar\">تَحَاوَرَ، اشْتَرَكَ، تَخَاصَمَ</span>) ya da öncesi cümle değilse. İsim öncekine uyar: <span class=\"ar\">تَحَاوَرَ النَّائِبُ وَالوَزِيرُ</span>." },
    { tr: "<b>İkisi de câiz</b>: ortaklık da birliktelik de anlamlıysa: <span class=\"ar\">حَضَرَ الجُنْدُ وَالأَمِيرُ / وَالأَمِيرَ · سَبَحَتْ فَاطِمَةُ وَأَخُوهَا / وَأَخَاهَا</span>. Nahivcilerin çoğu burada atfı daha güzel bulur." },
    { tr: "Vâvdan sonra isim cümlesi geliyorsa vâv hâl vâvıdır; isim mübtedâ olarak merfû okunur: <span class=\"ar\">نَزَلَ الثَّلْجُ وَالشَّمْسُ طَالِعَةٌ</span>." }
  ],
  kaide: ["هُنَاكَ ثَلَاثَةُ أَحْكَامٍ لِمَا بَعْدَ الوَاوِ: أ ـ يَجِبُ إِعْرَابُهُ مَفْعُولًا مَعَهُ فَيُنْصَبُ، مِثْلُ: حَضَرْتُ إِلَى بَلَدِي وَطُلُوعَ الشَّمْسِ، سِرْتُ وَالشَّاطِئَ. ب ـ يَجِبُ إِعْرَابُهُ اسْمًا مَعْطُوفًا فَيَتْبَعُ مَا قَبْلَهُ فِي إِعْرَابِهِ، مِثْلُ: تَحَاوَرَ النَّائِبُ وَالوَزِيرُ، سَافَرَ أَحْمَدُ وَأَبُوهُ بِالقِطَارِ السَّرِيعِ. جـ ـ يَجُوزُ إِعْرَابُهُ مَفْعُولًا مَعَهُ أَوِ اسْمًا مَعْطُوفًا، مِثْلُ: حَضَرَ الجُنْدُ وَالأَمِيرُ / وَالأَمِيرَ."],
  ex: [
    { type: "classify", extra: true, opts: HK, ar: "مَا حُكْمُ الاسْمِ بَعْدَ الوَاوِ؟", tr: "Vâvdan sonraki isim mef’ûlün maah mı olmalı, ma’tûf mu, yoksa ikisi de câiz mi?", items: CL([
      [HL("حَضَرْتُ إِلَى بَلَدِي وَطُلُوعَ الشَّمْسِ", "وَطُلُوعَ"), "m", "Güneşin doğuşu “gelmez”."],
      [HL("سِرْتُ وَالشَّاطِئَ", "وَالشَّاطِئَ"), "m", "Sahil yürümez."],
      [HL("تَحَاوَرَ النَّائِبُ وَالوَزِيرُ", "وَالوَزِيرُ"), "a", "Karşılıklı fiil."],
      [HL("حَضَرَ الجُنْدُ وَالأَمِيرُ", "وَالأَمِيرُ"), "c", "Emir de gelebilir."],
      [HL("اشْتَرَكَ إِبْرَاهِيمُ وَمَاجِدٌ", "وَمَاجِدٌ"), "a", "Ortaklık fiili."],
      [HL("خَرَجْنَا مِنَ الجَامِعَةِ وَأَذَانَ العِشَاءِ", "وَأَذَانَ"), "m", "Ezan çıkmaz."],
      [HL("تَنَاوَبَ المُدِيرُ وَمُسَاعِدُهُ يَوْمَ العُطْلَةِ", "وَمُسَاعِدُهُ"), "a", "Nöbetleşme iki taraf ister."],
      [HL("حَضَرَ المُشْرِفُ وَمُسَاعِدُوهُ", "وَمُسَاعِدُوهُ"), "c", "İkisi de câiz: وَمُسَاعِدِيهِ da olur."],
      [HL("سَبَحَتْ فَاطِمَةُ وَأَخُوهَا فِي النَّهْرِ", "وَأَخُوهَا"), "c", "Kardeş de yüzebilir."],
      [HL("عَادَ المُسَافِرُ وَاللَّيْلَ", "وَاللَّيْلَ"), "m", "Gece dönmez."],
      [HL("تَخَاصَمَ زَيْدٌ وَعَمْرٌو", "وَعَمْرٌو"), "a", "Çekişme iki taraf ister."],
      [HL("مَشَيْتُ وَشَاطِئَ البَحْرِ", "وَشَاطِئَ"), "m", "Kıyı yürümez."]
    ]) },
    { type: "combo", num: "٢", ar: "عَيِّنْ حُكْمَ إِعْرَابِ الاسْمِ بَعْدَ الوَاوِ وَاضْبِطْ آخِرَهُ", tr: "Vâvdan sonraki kelimenin harekesini ve hükmünü seç.", exHtml: "<span class=\"ar\">خَرَجْنَا مِنَ الجَامِعَةِ وَأَذَانَ العِشَاءِ: مَفْعُولٌ مَعَهُ · تَنَاوَبَ المُدِيرُ وَمُسَاعِدُهُ: اسْمٌ مَعْطُوفٌ · حَضَرَ المُشْرِفُ وَمُسَاعِدُوهُ / وَمُسَاعِدِيهِ: يَجُوزُ الوَجْهَانِ</span>", items: [
      ["لَا تَأْمُرْ بِالصِّدْقِ وَ", ["تَكْذِبَ", "تَكْذِبُ", "تَكْذِبْ"], ".", GF, "Doğruluğu emredip de yalan söyleme.", "Vâv “مَعَ” anlamında, ardından fiil: gizli أَنْ ile mansûb. Bu bir mef’ûlün maah değildir."],
      ["غَادَرْنَا وَ", ["سَالِمًا", "سَالِمٌ", "سَالِمٍ"], "إِسْطَنْبُولَ مَسَاءً.", GM, "Salim’le birlikte akşam İstanbul’dan ayrıldık.", "Bitişik zamire (نَا) atıf zayıf: mef’ûlün maah."],
      ["لَعِبْنَا وَ", ["فَرِيقَ", "فَرِيقُ", "فَرِيقِ"], "كُلِّيَّتِنَا فِي النَّادِي الرِّيَاضِيِّ.", GM, "Kulüpte fakültemizin takımıyla oynadık.", "Zamire atıf zayıf: mef’ûlün maah."],
      ["سِرْنَا وَ", ["مَضِيقَ", "مَضِيقُ", "مَضِيقِ"], "البُوسْفُورِ فِي جَوْلَةٍ بَحْرِيَّةٍ.", GM, "Bir deniz gezisinde Boğaz boyunca ilerledik.", "Boğaz yürümez: vâcib."],
      ["جَرَيْنَا وَ", ["النَّاسُ", "النَّاسَ", "النَّاسِ"], "حَوْلَنَا.", GH, "İnsanlar etrafımızdayken koştuk.", "النَّاسُ حَوْلَنَا isim cümlesi: hâl vâvı."],
      ["سَبَحَتْ فَاطِمَةُ وَ", ["أَخَاهَا", "أَخِيهَا", "أَخُوهَا"], "فِي النَّهْرِ.", GC, "Fatma kardeşiyle (birlikte) nehirde yüzdü.", "Kardeş de yüzebilir: أَخَاهَا (maah) da أَخُوهَا (atıf) da doğru.", [["أَخُوهَا", "يَجُوزُ الوَجْهَانِ"]]],
      ["تَنَاوَلْتُ وَ", ["مُدَرِّبَ", "مُدَرِّبُ", "مُدَرِّبِ"], "الفَرِيقِ قَهْوَةً تُرْكِيَّةً.", GM, "Takımın antrenörüyle Türk kahvesi içtim.", "Zamire (تُ) atıf zayıf: mef’ûlün maah."],
      ["كَيْفَ أَنْتَ وَ", ["الحَلْوَيَاتِ", "الحَلْوَيَاتَ", "حَلْوَيَاتٍ"], "؟", GM, "Tatlılarla aran nasıl?", "كَيْفَ’ten sonra işitilmiş kullanım: mansûb (cem-i müennes kesreyle). Merfû (الحَلْوَيَاتُ) okuyanlar da vardır."]
    ].map(VW("الحُكْمُ:")) },
    { type: "combo", num: "٤", ar: "اضْبِطِ الكَلِمَاتِ الَّتِي بَعْدَ الوَاوِ وَبَيِّنِ السَّبَبَ", tr: "Vâvdan sonraki kelimenin harekesini ve sebebini seç.", exHtml: "<span class=\"ar\">اشْتَرَكَ إِبْرَاهِيمُ وَمَاجِدٌ: لِأَنَّهُ وَاوُ عَطْفٍ · الضَّيْفُ مَخْدُومٌ وَعَائِلَتَهُ: لِأَنَّهُ وَاوُ المَعِيَّةِ</span>", items: [
      ["نَزَلَ الثَّلْجُ وَ", ["الشَّمْسُ", "الشَّمْسَ", "الشَّمْسِ"], "طَالِعَةٌ.", SH, "Güneş doğmuşken kar yağdı.", "الشَّمْسُ طَالِعَةٌ isim cümlesi: hâl vâvı."],
      ["حَاوَلَ الوَالِدُ وَ", ["وَلَدُهُ", "وَلَدَهُ", "وَلَدِهِ"], "إِنْقَاذَ الغَرِيقِ.", SA, "Baba ile oğlu boğulmakta olanı kurtarmaya çalıştı.", "İkisi de çalıştı: atıf daha güzel; وَلَدَهُ (maiyyet) de câizdir.", [["وَلَدَهُ", "لِأَنَّهُ وَاوُ المَعِيَّةِ"]]],
      ["الحَدِيقَةُ مَخْدُومَةٌ وَ", ["شَجَرَهَا", "شَجَرُهَا", "شَجَرِهَا"], ".", SM, "Bahçe ağaçlarıyla birlikte bakımlı.", "Nâsıb ism-i mef’ûl: kitabın kaidesindeki örnek."],
      ["عَادَ المُسَافِرُ وَ", ["اللَّيْلَ", "اللَّيْلُ", "اللَّيْلِ"], ".", SM, "Yolcu geceyle birlikte döndü.", "Gece dönmez. (Kitapta واليل yazılmış; doğrusu وَاللَّيْلَ.)"],
      ["كَيْفَ أَنْتَ وَ", ["أُسْتَاذَكَ", "أُسْتَاذِكَ", "أُسْتَاذُكَ"], "؟", SM, "Hocanla aran nasıl?", "كَيْفَ’ten sonra işitilmiş mansûb; أُسْتَاذُكَ (atıf) da işitilmiştir.", [["أُسْتَاذُكَ", "لِأَنَّهُ وَاوُ العَطْفِ"]]],
      ["السَّمَكَةُ مَشْوِيَّةٌ وَ", ["رَأْسَهَا", "رَأْسُهَا", "رَأْسِهَا"], ".", SM, "Balık başıyla birlikte kızartılmış.", "Nâsıb ism-i mef’ûl. (Kitapta السمكمة yazılmış.)"],
      ["نَزَلَ المَطَرُ وَ", ["المِظَلَّةُ", "المِظَلَّةَ", "المِظَلَّةِ"], "عَلَى رَأْسِي.", SH, "Şemsiye başımdayken yağmur yağdı.", "İsim cümlesi: hâl."],
      ["يُسْعِدُنِي حُضُورُكَ وَ", ["المُدِيرَ", "المُدِيرُ", "المُدِيرِ"], ".", SM, "Müdürle birlikte gelişin beni mutlu eder.", "Nâsıb masdar حُضُورُ."]
    ].map(VW("السَّبَبُ:")) }
  ]
},
// ---------------------------------------------------------------- 4 · NÂSIB
{
  id: "u4", no: 4, ar: "نَاصِبُ المَفْعُولِ مَعَهُ", tr: "Mef’ûlün Maahı Nasbeden", short: "Nâsıb", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Nâsıbın fiil, ism-i fâil, ism-i mef’ûl, masdar ya da ism-i fiil olabildiğini bilmek", "مَا ve كَيْفَ’ten sonra nâsıbsız işitilen kullanımı tanımak", "Vâvdan sonra gelen mansûb muzâriyi ayırmak"],
  examples: [
    { s: "سَارَ:mz / الرَّجُلُ:- / وَالنَّهْرَ.:nasb", tr: "Adam nehir boyunca yürüdü. (fiil)" },
    { s: "الظِّلُّ:- / مَائِلٌ:mz / وَالشَّجَرَ.:nasb", tr: "Gölge ağaçla birlikte eğik. (ism-i fâil)", pair: "رُوَيْدَكَ:mz / وَالإِبِلَ.:nasb", pairTr: "Develerle yavaş ol. (ism-i fiil)" },
    { s: "مَا أَنْتَ:- / وَإِبْرَاهِيمَ؟:nasb", tr: "İbrahim’le senin ne işin var? (nâsıbsız, işitilmiş)" }
  ],
  rules: [
    { tr: "Mef’ûlün maahı vâvdan önceki <b>fiil</b> ya da fiil gibi işleyen kelime nasbeder:", ex: ["سَارَ الرَّجُلُ وَالنَّهْرَ (فِعْلٌ) · الظِّلُّ مَائِلٌ وَالشَّجَرَ (اسْمُ فَاعِلٍ)", "الحَدِيقَةُ مَخْدُومَةٌ وَشَجَرَهَا (اسْمُ مَفْعُولٍ) · يَسُرُّنِي حُضُورُكَ وَالأُسْرَةَ (مَصْدَرٌ) · رُوَيْدَكَ وَالإِبِلَ (اسْمُ فِعْلٍ)"] },
    { tr: "Araplardan, soru bildiren <span class=\"ar\">مَا</span> ve <span class=\"ar\">كَيْفَ</span>’ten sonra nâsıbsız (fiil olmadan) mansûb kullanım işitilmiştir: <span class=\"ar\">مَا أَنْتَ وَإِبْرَاهِيمَ؟ · كَيْفَ أَنْتَ وَالبَرْدَ؟ · كَيْفَ أَنْتَ وَقَصْعَةً مِنْ ثَرِيدٍ؟</span> Nahivciler burada gizli bir fiil (<span class=\"ar\">تَكُونُ / تَصْنَعُ</span>) takdir eder." },
    { tr: "<span class=\"ar\">لَا تَفْعَلِ الخَيْرَ وَتَنْدَمَ</span> gibi cümlelerde vâvdan sonra isim değil fiil gelir; fiil gizli <span class=\"ar\">أَنْ</span> ile mansûbdur. Burada mef’ûlün maah yoktur." }
  ],
  kaide: ["وَنَاصِبُ الاسْمِ بَعْدَ وَاوِ المَعِيَّةِ يَكُونُ إِمَّا: فِعْلًا: سَارَ الرَّجُلُ وَالنَّهْرَ. اسْمَ فَاعِلٍ: الظِّلُّ مَائِلٌ وَالشَّجَرَ. اسْمَ مَفْعُولٍ: الحَدِيقَةُ مَخْدُومَةٌ وَشَجَرَهَا. مَصْدَرًا: يَسُرُّنِي حُضُورُكَ وَالأُسْرَةَ. اسْمَ فِعْلٍ: رُوَيْدَكَ وَالإِبِلَ.", "وَقَدْ وَرَدَتْ تَرَاكِيبُ مَسْمُوعَةٌ مِنَ العَرَبِ دُونَ نَاصِبٍ بَعْدَ «مَا» وَ«كَيْفَ» الاسْتِفْهَامِيَّتَيْنِ، مِثْلُ: مَا أَنْتَ وَإِبْرَاهِيمَ؟ كَيْفَ أَنْتَ وَالبَرْدَ؟ كَيْفَ أَنْتَ وَقَصْعَةً مِنْ ثَرِيدٍ؟"],
  ex: [
    { type: "classify", num: "٣", opts: NS, ar: "عَيِّنْ نَوْعَ النَّاصِبِ لِمَا بَعْدَ الوَاوِ", tr: "Vâvdan sonraki ismi nasbeden kelime hangi türden?", exHtml: "<span class=\"ar\">سَارَ الجُنْدِيُّ وَالعَلَمَ: فِعْلٌ · الثِّمَارُ مَسْلُوبَةٌ وَأَغْصَانَهَا: اسْمُ مَفْعُولٍ</span>", items: CL([
      [HL("خَرَجْنَا إِلَى الحَدِيقَةِ وَطُلُوعَ القَمَرِ", "خَرَجْنَا"), "f", "Fiil. (Kitapta ووطلوع yazılmış.)"],
      [HL("اتْرُكِ الأَوْلَادَ وَلُعْبَتَهُمْ", "اتْرُكِ"), "f", "Emir fiili."],
      [HL("المُشْكِلَةُ مَدْرُوسَةٌ وَتَفَاصِيلَهَا", "مَدْرُوسَةٌ"), "o", "İsm-i mef’ûl."],
      [HL("لَا تَفْعَلِ الخَيْرَ وَتَنْدَمَ", "وَتَنْدَمَ"), "x", "Vâvdan sonra fiil: gizli أَنْ ile mansûb; isim yok."],
      [HL("زَيْدٌ سَائِرٌ وَالطَّرِيقَ", "سَائِرٌ"), "a", "İsm-i fâil."],
      [HL("السَّمَكَةُ مَشْوِيَّةٌ وَرَأْسَهَا", "مَشْوِيَّةٌ"), "o", "İsm-i mef’ûl."],
      [HL("رُوَيْدَكَ وَالغَاضِبَ", "رُوَيْدَكَ"), "i", "İsm-i fiil (أَمْهِلْ)."],
      [HL("يَسُرُّنِي حُضُورُكَ وَالأُسْرَةَ", "حُضُورُكَ"), "s", "Masdar."],
      [HL("سَارَ الرَّجُلُ وَالنَّهْرَ", "سَارَ"), "f", "Fiil."],
      [HL("الظِّلُّ مَائِلٌ وَالشَّجَرَ", "مَائِلٌ"), "a", "İsm-i fâil."],
      [HL("الحَدِيقَةُ مَخْدُومَةٌ وَشَجَرَهَا", "مَخْدُومَةٌ"), "o", "İsm-i mef’ûl."],
      [HL("رُوَيْدَكَ وَالإِبِلَ", "رُوَيْدَكَ"), "i", "İsm-i fiil."],
      [HL("أَعْجَبَنِي سَيْرُكَ وَالنَّهْرَ", "سَيْرُكَ"), "s", "Masdar."],
      [HL("أَنَا مَاشٍ وَالشَّاطِئَ", "مَاشٍ"), "a", "İsm-i fâil."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "اضْبِطِ الاسْمَ بَعْدَ وَاوِ المَعِيَّةِ", tr: "Vâv-ı maiyyetten sonraki ismin doğru biçimini seç.", items: PL([
      ["مَا أَنْتَ وَ___؟", "إِبْرَاهِيمَ", "إِبْرَاهِيمٍ", "إِبْرَاهِيمِ", "İbrahim’le senin ne işin var?", "Gayr-i munsarif: fethayla mansûb, tenvinsiz."],
      ["كَيْفَ أَنْتَ وَ___؟", "البَرْدَ", "البَرْدِ", "بَرْدٍ", "Soğukla aran nasıl?", "كَيْفَ’ten sonra mansûb."],
      ["كَيْفَ أَنْتَ وَ___ مِنْ ثَرِيدٍ؟", "قَصْعَةً", "قَصْعَةٍ", "قَصْعَتِي", "Bir kâse tiritle aran nasıl?", "Nekre, tenvinli mansûb."],
      ["الظِّلُّ مَائِلٌ وَ___.", "الشَّجَرَ", "الشَّجَرِ", "شَجَرٍ", "Gölge ağaçla birlikte eğik.", "Nâsıb ism-i fâil."],
      ["رُوَيْدَكَ وَ___.", "الإِبِلَ", "الإِبِلِ", "إِبِلٍ", "Develerle yavaş ol.", "Nâsıb ism-i fiil."],
      ["يَسُرُّنِي حُضُورُكَ وَ___.", "الأُسْرَةَ", "الأُسْرَةِ", "أُسْرَةٍ", "Ailenle gelişin beni sevindirir.", "Nâsıb masdar."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: مَبْدَأُ الشُّورَى فِي الإِسْلَامِ", tr: "Okuma: İslam’da Şûrâ İlkesi", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Metindeki her vâvın türünü ayırmak", "Vâvdan sonraki kelimeyi doğru harekelemek", "Hz. Ömer’in şûrâ anlayışını anlatan metni okuyup anlamak"],
  examples: [
    { s: "كَيْفَ أَنْتَ:- / وَالخِلَافَةَ؟:nasb", tr: "Halifelikle aran nasıl?" },
    { s: "فَقَالَ:- / سَلْمَانُ:- / وَعَيْنَاهُ تَسْكُبَانِ دُمُوعَ الفَرَحِ.:x", tr: "Selmân, gözlerinden sevinç gözyaşları dökülürken dedi ki… (hâl vâvı)" }
  ],
  rules: [
    { tr: "Metinde vâv çoğu zaman <b>atıf</b> vâvıdır; isim ya da fiil öncekine uyar: <span class=\"ar\">الشُّورَى وَالمُعَارَضَةُ · نَسْمَعْ وَنُطِعْ</span>." },
    { tr: "<b>Kasem vâvı</b> ismi cerreder: <span class=\"ar\">وَاللهِ</span>. <b>Hâl vâvından</b> sonra cümle gelir: <span class=\"ar\">وَعَيْنَاهُ تَسْكُبَانِ</span>. <b>Başlangıç vâvı</b> yeni bir söz başlatır: <span class=\"ar\">وَلِمَ يَا سَلْمَانُ؟</span>" },
    { tr: "<b>Vâv-ı maiyyet</b>: <span class=\"ar\">كَيْفَ أَنْتَ وَالخِلَافَةَ؟</span>." }
  ],
  kaide: ["مَيِّزْ بَيْنَ كُلِّ وَاوٍ وَرَدَ فِي النَّصِّ، وَاضْبِطْ آخِرَ مَا بَعْدَهُ بِالشَّكْلِ الصَّحِيحِ، وَبَيِّنِ السَّبَبَ."],
  ex: [
    { type: "reading", num: "٥", ar: "مَيِّزْ بَيْنَ كُلِّ وَاوٍ وَرَدَ فِي النَّصِّ التَّالِي وَاضْبِطْ آخِرَهُ وَبَيِّنِ السَّبَبَ", tr: "Metni oku, soruları cevapla; sonra koyu vâvın türünü seç.", title: "مَبْدَأُ الشُّورَى فِي الإِسْلَامِ",
      text: "كَانَتِ الشُّورَى وَالمُعَارَضَةُ عِنْدَ أَمِيرِ المُؤْمِنِينَ عُمَرَ بْنِ الخَطَّابِ رَضِيَ اللهُ عَنْهُ أَسَاسَ الحُكْمِ الصَّالِحِ. مِنْ أَجْلِ هَذَا لَمْ يَكَدْ يَلِي الخِلَافَةَ وَيَسْمَعُ كَلَامَ النَّاسِ عَنْ شِدَّتِهِ حَتَّى خَلَا بِنَفْسِهِ مُفَكِّرًا. وَدَخَلَ عَلَيْهِ حُذَيْفَةُ –وَكَانَ مِنْ أَصْحَابِهِ– فَوَجَدَهُ حَزِينًا بَاكِيَ العَيْنِ، فَسَأَلَهُ: «مَاذَا يَا أَمِيرَ المُؤْمِنِينَ؟ كَيْفَ أَنْتَ وَالخِلَافَةَ؟» فَأَجَابَ عُمَرُ: «إِنِّي أَخَافُ أَنْ أُخْطِئَ فَلَا يَرُدَّنِي أَحَدٌ مِنْكُمْ تَعْظِيمًا لِي.» فَقَالَ حُذَيْفَةُ: «وَاللهِ لَوْ رَأَيْنَاكَ خَرَجْتَ عَلَى الحَقِّ لَرَدَدْنَاكَ إِلَيْهِ.» فَفَرِحَ عُمَرُ وَقَالَ: «الحَمْدُ لِلَّهِ الَّذِي جَعَلَ لِي أَصْحَابًا يُقَوِّمُونَنِي إِذَا اعْوَجَجْتُ.»<br>صَعِدَ عُمَرُ رَضِيَ اللهُ عَنْهُ المِنْبَرَ ذَاتَ يَوْمٍ لِيُحَدِّثَ المُسْلِمِينَ فِي أَمْرٍ مُهِمٍّ، فَبَدَأَ خُطْبَتَهُ بَعْدَ حَمْدِ اللهِ قَائِلًا: «اسْمَعُوا يَرْحَمُكُمُ اللهُ.» وَلَكِنَّ أَحَدَ المُسْلِمِينَ نَهَضَ قَائِلًا: «وَاللهِ لَا نَسْمَعُ.. وَاللهِ لَا نَسْمَعُ.» فَسَأَلَهُ عُمَرُ فِي هُدُوءٍ: «وَلِمَ يَا سَلْمَانُ؟» فَأَجَابَ سَلْمَانُ: «مَيَّزْتَ نَفْسَكَ عَلَيْنَا فِي الدُّنْيَا: أَعْطَيْتَ كُلًّا مِنَّا ثَوْبًا وَاحِدًا وَأَخَذْتَ أَنْتَ ثَوْبَيْنِ.» فَنَظَرَ الخَلِيفَةُ فِي صُفُوفِ النَّاسِ ثُمَّ قَالَ: «أَيْنَ عَبْدُ اللهِ بْنُ عُمَرَ؟» فَنَهَضَ ابْنُهُ عَبْدُ اللهِ: «هَا أَنَذَا يَا أَمِيرَ المُؤْمِنِينَ!» فَسَأَلَهُ عُمَرُ: «مَنْ صَاحِبُ الثَّوْبِ الثَّانِي؟» فَأَجَابَ عَبْدُ اللهِ: «أَنَا يَا أَمِيرَ المُؤْمِنِينَ!» وَخَاطَبَ عُمَرُ سَلْمَانَ وَالنَّاسَ مَعَهُ فَقَالَ: «إِنَّنِي كَمَا تَعْلَمُونَ رَجُلٌ طَوِيلٌ، وَلَقَدْ جَاءَ ثَوْبِي قَصِيرًا، فَأَعْطَانِي عَبْدُ اللهِ ثَوْبَهُ فَأَطَلْتُ بِهِ ثَوْبِي.» فَقَالَ سَلْمَانُ وَعَيْنَاهُ تَسْكُبَانِ دُمُوعَ الفَرَحِ: «الحَمْدُ لِلَّهِ... وَالآنَ قُلْ نَسْمَعْ وَنُطِعْ يَا أَمِيرَ المُؤْمِنِينَ.»<br>وَلَقِيَ العَبَّاسَ يَوْمًا فَقَالَ لَهُ: «لَقَدْ سَمِعْتُ رَسُولَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَبْلَ مَوْتِهِ يُرِيدُ أَنْ يَزِيدَ فِي المَسْجِدِ، وَإِنَّ دَارَكَ قَرِيبَةٌ مِنَ المَسْجِدِ، فَأَعْطِنَا دَارَكَ نَزِدْهَا فِيهِ، وَأُعْطِيكَ أَوْسَعَ مِنْهَا.» فَأَجَابَهُ العَبَّاسُ: «لَنْ أَفْعَلَ.» فَقَالَ عُمَرُ: «إِذَنْ أَغْلِبَكَ عَلَيْهَا!» فَأَجَابَهُ العَبَّاسُ: «لَيْسَ هَذَا لَكَ! فَاجْعَلْ بَيْنِي وَبَيْنَكَ مَنْ يَحْكُمُ بِالحَقِّ.» قَالَ أَمِيرُ المُؤْمِنِينَ: «مَنْ تَخْتَارُ؟» قَالَ العَبَّاسُ: «حُذَيْفَةَ بْنَ اليَمَانِ.» فَذَهَبَ عُمَرُ وَالعَبَّاسُ إِلَى حُذَيْفَةَ، وَجَلَسَا أَمَامَهُ يَقُصَّانِ عَلَيْهِ الخِلَافَ الَّذِي بَيْنَهُمَا، وَيَطْلُبَانِ مِنْهُ الحُكْمَ.<br>فَقَالَ حُذَيْفَةُ: «سَمِعْتُ أَنَّ نَبِيَّ اللهِ دَاوُدَ عَلَيْهِ السَّلَامُ وَبَعْضَ أَصْحَابِهِ أَرَادُوا أَنْ يَزِيدُوا فِي بَيْتِ المَقْدِسِ، فَوَجَدُوا بَيْتًا قَرِيبًا مِنَ المَسْجِدِ، وَكَانَ هَذَا البَيْتُ لِيَتِيمٍ، فَطَلَبُوهُ مِنْهُ فَرَفَضَ، فَأَرَادَ دَاوُدُ أَنْ يَأْخُذَهُ بِالقُوَّةِ، فَأَوْحَى اللهُ إِلَيْهِ: إِنَّ أَبْعَدَ البُيُوتِ عَنِ الظُّلْمِ لَهُوَ بَيْتِي. فَرَجَعَ دَاوُدُ عَنْ طَلَبِهِ وَتَرَكَ البَيْتَ وَصَاحِبَهُ.» فَنَظَرَ العَبَّاسُ إِلَى عُمَرَ وَقَالَ: «أَلَا تَزَالُ تُرِيدُ أَنْ تَغْلِبَنِي عَلَى دَارِي؟» فَقَالَ عُمَرُ: «لَا.» قَالَ العَبَّاسُ: «وَمَعَ هَذَا فَقَدْ أَعْطَيْتُكَ الدَّارَ حَتَّى تَزِيدَهَا فِي مَسْجِدِ رَسُولِ اللهِ.»",
      textTr: "Müminlerin emiri Ömer b. Hattâb’a göre şûrâ ve muhalefet iyi yönetimin temeliydi. Bu yüzden halifeliğe geçip insanların onun sertliği hakkındaki sözlerini duyar duymaz düşünmek için yalnız kaldı. Arkadaşlarından Huzeyfe yanına girdi, onu üzgün ve gözü yaşlı buldu: “Ne oldu ey müminlerin emiri? Halifelikle aran nasıl?” diye sordu. Ömer: “Hata yapıp da bana duyduğunuz saygıdan ötürü kimsenin beni düzeltmemesinden korkuyorum” dedi. Huzeyfe: “Allah’a yemin olsun, seni haktan saptığını görsek geri döndürürüz” dedi. Ömer sevindi: “Eğrildiğimde beni düzeltecek arkadaşlar veren Allah’a hamd olsun” dedi.<br>Bir gün Ömer minbere çıktı, hamdden sonra “Dinleyin, Allah size rahmet etsin” dedi. Müslümanlardan biri kalktı: “Vallahi dinlemeyiz” dedi. Ömer sakince “Niçin ey Selmân?” diye sordu. Selmân: “Kendini bizden üstün tuttun: her birimize birer elbise verdin, sen iki elbise aldın” dedi. Halife saflara baktı, “Abdullah b. Ömer nerede?” dedi. Oğlu Abdullah kalktı: “Buradayım.” “İkinci elbisenin sahibi kim?” “Benim.” Ömer, Selmân’a ve insanlara: “Bildiğiniz gibi uzun boyluyum, elbisem kısa geldi; Abdullah elbisesini bana verdi, onunla elbisemi uzattım” dedi. Selmân sevinç gözyaşları dökerek: “Allah’a hamd olsun… Şimdi söyle, dinleriz ve itaat ederiz” dedi.<br>Bir gün Ömer, Abbâs’a rastladı: “Resûlullah’ın vefatından önce mescidi genişletmek istediğini duydum. Senin evin mescide yakın; evini bize ver, onu mescide katalım, sana daha genişini vereyim” dedi. Abbâs: “Vermem” dedi. Ömer: “O hâlde onu zorla alırım!” Abbâs: “Bu senin hakkın değil; aramıza hakkaniyetle hükmedecek birini koy.” “Kimi seçersin?” “Huzeyfe b. Yemân’ı.” Ömer ve Abbâs Huzeyfe’ye gidip anlaşmazlıklarını anlattılar.<br>Huzeyfe: “Duydum ki Allah’ın peygamberi Dâvûd ve bazı arkadaşları Beytülmakdis’i genişletmek istediler; mescide yakın bir ev buldular. Ev bir yetimindi; istediler, vermedi. Dâvûd onu zorla almak istedi; Allah ona ‘Zulümden en uzak ev benim evimdir’ diye vahyetti. Dâvûd isteğinden vazgeçti, evi ve sahibini bıraktı” dedi. Abbâs Ömer’e baktı: “Hâlâ evimi zorla almak istiyor musun?” “Hayır.” Abbâs: “Bununla birlikte evi sana verdim; Resûlullah’ın mescidine katasın diye” dedi.",
      qa: [
        { q: "مَاذَا كَانَ أَسَاسَ الحُكْمِ الصَّالِحِ عِنْدَ عُمَرَ؟", a: "الشُّورَى وَالمُعَارَضَةُ.", tr: "Ömer’e göre iyi yönetimin temeli neydi? Şûrâ ve muhalefet." },
        { q: "لِمَاذَا كَانَ عُمَرُ حَزِينًا؟", a: "لِأَنَّهُ خَافَ أَنْ يُخْطِئَ فَلَا يَرُدَّهُ أَحَدٌ تَعْظِيمًا لَهُ.", tr: "Ömer niçin üzgündü? Hata yapıp da saygıdan ötürü kimsenin onu düzeltmemesinden korktuğu için." },
        { q: "لِمَاذَا قَالَ سَلْمَانُ: لَا نَسْمَعُ؟", a: "لِأَنَّهُ ظَنَّ أَنَّ عُمَرَ أَخَذَ ثَوْبَيْنِ وَأَعْطَى كُلًّا مِنْهُمْ ثَوْبًا وَاحِدًا.", tr: "Selmân niçin “dinlemeyiz” dedi? Ömer’in iki elbise aldığını sandığı için." },
        { q: "مَنْ أَعْطَى عُمَرَ الثَّوْبَ الثَّانِيَ؟", a: "ابْنُهُ عَبْدُ اللهِ.", tr: "Ömer’e ikinci elbiseyi kim verdi? Oğlu Abdullah." },
        { q: "مَنِ اخْتَارَ العَبَّاسُ حَكَمًا؟", a: "حُذَيْفَةَ بْنَ اليَمَانِ.", tr: "Abbâs kimi hakem seçti? Huzeyfe b. Yemân’ı." },
        { q: "مَاذَا فَعَلَ العَبَّاسُ فِي النِّهَايَةِ؟", a: "أَعْطَى دَارَهُ لِيُزَادَ بِهَا مَسْجِدُ رَسُولِ اللهِ.", tr: "Abbâs sonunda ne yaptı? Mescide katılsın diye evini verdi." }
      ],
      cls: { opts: RV, ar: "مَا نَوْعُ الوَاوِ؟", tr: "Koyu vâv maiyyet mi, atıf mı, hâl mi, kasem mi, başlangıç mı?", items: [
        { s: HL("كَيْفَ أَنْتَ وَالخِلَافَةَ؟", "وَالخِلَافَةَ"), a: "m", why: "كَيْفَ’ten sonra: vâv-ı maiyyet, mansûb." },
        { s: HL("كَانَتِ الشُّورَى وَالمُعَارَضَةُ", "وَالمُعَارَضَةُ"), a: "a", why: "الشُّورَى’ya atıf, merfû." },
        { s: HL("وَاللهِ لَوْ رَأَيْنَاكَ", "وَاللهِ"), a: "q", why: "Yemin: lafzatullah mecrûr." },
        { s: HL("فَقَالَ سَلْمَانُ وَعَيْنَاهُ تَسْكُبَانِ", "وَعَيْنَاهُ"), a: "h", why: "Ardından isim cümlesi: hâl." },
        { s: HL("وَدَخَلَ عَلَيْهِ حُذَيْفَةُ –وَكَانَ مِنْ أَصْحَابِهِ–", "وَكَانَ"), a: "h", why: "Hâl (ara) cümlesi." },
        { s: HL("وَلِمَ يَا سَلْمَانُ؟", "وَلِمَ"), a: "i", why: "Yeni söz başlatır." },
        { s: HL("وَخَاطَبَ عُمَرُ سَلْمَانَ وَالنَّاسَ مَعَهُ", "وَالنَّاسَ"), a: "a", why: "سَلْمَانَ’a atıf: mansûb (mef’ûlün bihe uyar)." },
        { s: HL("فَذَهَبَ عُمَرُ وَالعَبَّاسُ إِلَى حُذَيْفَةَ", "وَالعَبَّاسُ"), a: "a", why: "Fâile atıf, merfû; ardından جَلَسَا ikisinin birlikte gittiğini gösterir." },
        { s: HL("أَنَّ نَبِيَّ اللهِ دَاوُدَ وَبَعْضَ أَصْحَابِهِ", "وَبَعْضَ"), a: "a", why: "أَنَّ’nin ismine atıf: mansûb." },
        { s: HL("وَتَرَكَ البَيْتَ وَصَاحِبَهُ", "وَصَاحِبَهُ"), a: "a", why: "البَيْتَ’e atıf (mansûb); maiyyet de denebilir." },
        { s: HL("قُلْ نَسْمَعْ وَنُطِعْ", "وَنُطِعْ"), a: "a", why: "Meczûm fiile atıf: meczûm." },
        { s: HL("وَاللهِ لَا نَسْمَعُ", "وَاللهِ"), a: "q", why: "Kasem." },
        { s: HL("وَمَعَ هَذَا فَقَدْ أَعْطَيْتُكَ الدَّارَ", "وَمَعَ"), a: "i", why: "Başlangıç vâvı." },
        { s: HL("نَزِدْهَا فِيهِ وَأُعْطِيكَ أَوْسَعَ مِنْهَا", "وَأُعْطِيكَ"), a: "a", why: "Fiil cümlesine atıf." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["اسْتَيْقَظْتُ وَ{طُلُوعَ} الفَجْرِ.", ["طُلُوعَ", "طُلُوعُ", "طُلُوعِ"], "maah: mansûb", "Tan ağarırken uyandım.", "u1"],
  ["وَصَلَ مُحَمَّدٌ وَ{غُرُوبَ} الشَّمْسِ.", ["غُرُوبَ", "غُرُوبُ", "غُرُوبِ"], "maah: mansûb", "Muhammed güneş batarken vardı.", "u1"],
  ["مَشَيْتُ وَ{شَاطِئَ} البَحْرِ.", ["شَاطِئَ", "شَاطِئُ", "شَاطِئِ"], "maah: mansûb", "Deniz kıyısı boyunca yürüdüm.", "u1"],
  ["سِرْ وَ{الطَّرِيقَ} تَصِلْ إِلَى المَسْجِدِ.", ["الطَّرِيقَ", "الطَّرِيقُ", "الطَّرِيقِ"], "maah: mansûb", "Yol boyunca yürü, mescide varırsın.", "u1"],
  ["صَحَا يَحْيَى وَ{طُلُوعَ} الشَّمْسِ.", ["طُلُوعَ", "طُلُوعُ", "طُلُوعِ"], "maah: mansûb", "Yahya güneş doğarken uyandı.", "u1"],
  ["تَحَاوَرَ النَّائِبُ وَ{الوَزِيرُ}.", ["الوَزِيرُ", "الوَزِيرَ", "الوَزِيرِ"], "atıf: merfû", "Vekil ile bakan konuştu.", "u2"],
  ["اشْتَرَكَ إِبْرَاهِيمُ وَ{مَاجِدٌ}.", ["مَاجِدٌ", "مَاجِدًا", "مَاجِدٍ"], "atıf: merfû", "İbrahim ile Mâcid ortak oldu.", "u2"],
  ["سَبَحْنَا وَ{المُشْرِفُ} يُرَاقِبُنَا.", ["المُشْرِفُ", "المُشْرِفَ", "المُشْرِفِ"], "hâl: mübtedâ", "Gözetmen bizi izlerken yüzdük.", "u2"],
  ["جَلَسْنَا وَ{أُسْتَاذُنَا} يَعِظُنَا.", ["أُسْتَاذُنَا", "أُسْتَاذَنَا", "أُسْتَاذِنَا"], "hâl: mübtedâ", "Hocamız öğüt verirken oturduk.", "u2"],
  ["قَدَّمْنَا عَرْضَنَا وَ{الجُمْهُورُ} يُشَاهِدُونَنَا.", ["الجُمْهُورُ", "الجُمْهُورَ", "الجُمْهُورِ"], "hâl: mübtedâ", "Seyirciler bizi izlerken gösterimizi sunduk.", "u2"],
  ["تَخَاصَمَ زَيْدٌ وَ{عَمْرٌو}.", ["عَمْرٌو", "عَمْرًا", "عَمْرٍو"], "atıf vâcib", "Zeyd ile Amr çekişti.", "u3"],
  ["عَادَ المُسَافِرُ وَ{اللَّيْلَ}.", ["اللَّيْلَ", "اللَّيْلُ", "اللَّيْلِ"], "maah vâcib", "Yolcu geceyle döndü.", "u3"],
  ["خَرَجْنَا مِنَ الجَامِعَةِ وَ{أَذَانَ} العِشَاءِ.", ["أَذَانَ", "أَذَانُ", "أَذَانِ"], "maah vâcib", "Yatsı ezanıyla çıktık.", "u3"],
  ["سِرْنَا وَ{مَضِيقَ} البُوسْفُورِ.", ["مَضِيقَ", "مَضِيقُ", "مَضِيقِ"], "maah vâcib", "Boğaz boyunca ilerledik.", "u3"],
  ["نَزَلَ الثَّلْجُ وَ{الشَّمْسُ} طَالِعَةٌ.", ["الشَّمْسُ", "الشَّمْسَ", "الشَّمْسِ"], "hâl: mübtedâ", "Güneş doğmuşken kar yağdı.", "u3"],
  ["الظِّلُّ مَائِلٌ وَ{الشَّجَرَ}.", ["الشَّجَرَ", "الشَّجَرُ", "الشَّجَرِ"], "nâsıb ism-i fâil", "Gölge ağaçla birlikte eğik.", "u4"],
  ["الحَدِيقَةُ مَخْدُومَةٌ وَ{شَجَرَهَا}.", ["شَجَرَهَا", "شَجَرُهَا", "شَجَرِهَا"], "nâsıb ism-i mef’ûl", "Bahçe ağaçlarıyla bakımlı.", "u4"],
  ["يَسُرُّنِي حُضُورُكَ وَ{الأُسْرَةَ}.", ["الأُسْرَةَ", "الأُسْرَةُ", "الأُسْرَةِ"], "nâsıb masdar", "Ailenle gelişin beni sevindirir.", "u4"],
  ["رُوَيْدَكَ وَ{الإِبِلَ}.", ["الإِبِلَ", "الإِبِلُ", "الإِبِلِ"], "nâsıb ism-i fiil", "Develerle yavaş ol.", "u4"],
  ["مَا أَنْتَ وَ{إِبْرَاهِيمَ}؟", ["إِبْرَاهِيمَ", "إِبْرَاهِيمٍ", "إِبْرَاهِيمِ"], "gayr-i munsarif mansûb", "İbrahim’le ne işin var?", "u4"],
  ["كَيْفَ أَنْتَ وَ{قَصْعَةً} مِنْ ثَرِيدٍ؟", ["قَصْعَةً", "قَصْعَةٍ", "قَصْعَتِي"], "nekre mansûb", "Bir kâse tiritle aran nasıl?", "u4"],
  ["كَيْفَ أَنْتَ وَ{الخِلَافَةَ}؟", ["الخِلَافَةَ", "الخِلَافَةِ", "خِلَافَةٍ"], "maah: mansûb", "Halifelikle aran nasıl?", "u5"],
  ["فَقَالَ سَلْمَانُ وَ{عَيْنَاهُ} تَسْكُبَانِ دُمُوعَ الفَرَحِ.", ["عَيْنَاهُ", "عَيْنَيْهِ", "عَيْنُهُ"], "hâl: müsennâ merfû", "Selmân gözleri yaşlı dedi.", "u5"],
  ["فَذَهَبَ عُمَرُ وَ{العَبَّاسُ} إِلَى حُذَيْفَةَ.", ["العَبَّاسُ", "العَبَّاسِ", "عَبَّاسٍ"], "atıf: merfû", "Ömer ve Abbâs Huzeyfe’ye gitti.", "u5"],
  ["وَتَرَكَ البَيْتَ وَ{صَاحِبَهُ}.", ["صَاحِبَهُ", "صَاحِبُهُ", "صَاحِبِهِ"], "mansûba atıf", "Evi ve sahibini bıraktı.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["اسْتَيْقَظْتُ مَعَ طُلُوعِ الفَجْرِ ← vâv ile", "اسْتَيْقَظْتُ وَطُلُوعَ الفَجْرِ", "اسْتَيْقَظْتُ وَطُلُوعُ الفَجْرِ", "اسْتَيْقَظْتُ وَطُلُوعِ الفَجْرِ", "مَعَ yerine vâv: isim mansûb.", "u1"],
  ["مَشَيْتُ مَعَ شَاطِئِ البَحْرِ ← vâv ile", "مَشَيْتُ وَشَاطِئَ البَحْرِ", "مَشَيْتُ وَشَاطِئُ البَحْرِ", "مَشَيْتُ وَشَاطِئِ البَحْرِ", "Vâv-ı maiyyet: mansûb.", "u1"],
  ["وَصَلَ مُحَمَّدٌ مَعَ غُرُوبِ الشَّمْسِ ← vâv ile", "وَصَلَ مُحَمَّدٌ وَغُرُوبَ الشَّمْسِ", "وَصَلَ مُحَمَّدٌ وَغُرُوبُ الشَّمْسِ", "وَصَلَ مُحَمَّدٌ وَغُرُوبِ الشَّمْسِ", "Vâv-ı maiyyet: mansûb.", "u1"],
  ["سِرْتُ مَعَ النَّهْرِ ← vâv ile", "سِرْتُ وَالنَّهْرَ", "سِرْتُ وَالنَّهْرُ", "سِرْتُ وَالنَّهْرِ", "Nehir yürümez: mansûb.", "u1"],
  ["جَلَسْنَا مَعَ أُسْتَاذِنَا ← vâv ile", "جَلَسْنَا وَأُسْتَاذَنَا", "جَلَسْنَا وَأُسْتَاذُنَا", "جَلَسْنَا وَأُسْتَاذِنَا", "Zamire pekiştirmesiz atıf zayıf: maah.", "u2"],
  ["تَحَاوَرَ النَّائِبُ مَعَ الوَزِيرِ ← vâv ile", "تَحَاوَرَ النَّائِبُ وَالوَزِيرُ", "تَحَاوَرَ النَّائِبُ وَالوَزِيرَ", "تَحَاوَرَ النَّائِبُ وَالوَزِيرِ", "Ortaklık fiili: atıf vâcib, merfû.", "u3"],
  ["اشْتَرَكَ إِبْرَاهِيمُ مَعَ مَاجِدٍ ← vâv ile", "اشْتَرَكَ إِبْرَاهِيمُ وَمَاجِدٌ", "اشْتَرَكَ إِبْرَاهِيمُ وَمَاجِدًا", "اشْتَرَكَ إِبْرَاهِيمُ وَمَاجِدٍ", "Ortaklık fiili: atıf vâcib.", "u3"],
  ["عَادَ المُسَافِرُ مَعَ اللَّيْلِ ← vâv ile", "عَادَ المُسَافِرُ وَاللَّيْلَ", "عَادَ المُسَافِرُ وَاللَّيْلُ", "عَادَ المُسَافِرُ وَاللَّيْلِ", "Gece dönmez: maah vâcib.", "u3"],
  ["حَضَرَ الجُنْدُ مَعَ الأَمِيرِ ← vâv + maah", "حَضَرَ الجُنْدُ وَالأَمِيرَ", "حَضَرَ الجُنْدُ وَالأَمِيرِ", "حَضَرَ الجُنْدُ وَأَمِيرٍ", "Câiz; maah seçilince mansûb.", "u3"],
  ["حَضَرَ الجُنْدُ مَعَ الأَمِيرِ ← vâv + atıf", "حَضَرَ الجُنْدُ وَالأَمِيرُ", "حَضَرَ الجُنْدُ وَالأَمِيرَ", "حَضَرَ الجُنْدُ وَالأَمِيرِ", "Câiz; atıf seçilince fâile uyar, merfû.", "u3"],
  ["الظِّلُّ مَائِلٌ مَعَ الشَّجَرِ ← vâv ile", "الظِّلُّ مَائِلٌ وَالشَّجَرَ", "الظِّلُّ مَائِلٌ وَالشَّجَرُ", "الظِّلُّ مَائِلٌ وَالشَّجَرِ", "Nâsıb ism-i fâil.", "u4"],
  ["يَسُرُّنِي حُضُورُكَ مَعَ الأُسْرَةِ ← vâv ile", "يَسُرُّنِي حُضُورُكَ وَالأُسْرَةَ", "يَسُرُّنِي حُضُورُكَ وَالأُسْرَةُ", "يَسُرُّنِي حُضُورُكَ وَالأُسْرَةِ", "Nâsıb masdar.", "u4"],
  ["الحَدِيقَةُ مَخْدُومَةٌ مَعَ شَجَرِهَا ← vâv ile", "الحَدِيقَةُ مَخْدُومَةٌ وَشَجَرَهَا", "الحَدِيقَةُ مَخْدُومَةٌ وَشَجَرُهَا", "الحَدِيقَةُ مَخْدُومَةٌ وَشَجَرِهَا", "Nâsıb ism-i mef’ûl.", "u4"],
  ["كَيْفَ أَنْتَ مَعَ البَرْدِ؟ ← vâv ile", "كَيْفَ أَنْتَ وَالبَرْدَ؟", "كَيْفَ أَنْتَ وَالبَرْدِ؟", "كَيْفَ أَنْتَ وَبَرْدٍ؟", "كَيْفَ’ten sonra işitilmiş: mansûb.", "u4"]
];
// Vâv türü hız oyunu
var NOUN_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = VT;
// Nâsıb hız oyunu
var MM_OPTS = NS;
var MM_LIST = UNITS[3].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  mv: { name: "مَعَ ↔ vâv", pairs: [["مَعَ طُلُوعِ الفَجْرِ", "وَطُلُوعَ الفَجْرِ"], ["مَعَ غُرُوبِ الشَّمْسِ", "وَغُرُوبَ الشَّمْسِ"], ["مَعَ شَاطِئِ البَحْرِ", "وَشَاطِئَ البَحْرِ"], ["مَعَ النَّهْرِ", "وَالنَّهْرَ"], ["مَعَ الأُسْرَةِ", "وَالأُسْرَةَ"], ["مَعَ اللَّيْلِ", "وَاللَّيْلَ"], ["مَعَ الطَّرِيقِ", "وَالطَّرِيقَ"], ["مَعَ الإِبِلِ", "وَالإِبِلَ"]] },
  ns: { name: "Cümle ↔ hüküm", pairs: [["سَارَ الرَّجُلُ وَالنَّهْرَ", "nâsıb: fiil"], ["الظِّلُّ مَائِلٌ وَالشَّجَرَ", "nâsıb: ism-i fâil"], ["الحَدِيقَةُ مَخْدُومَةٌ وَشَجَرَهَا", "nâsıb: ism-i mef’ûl"], ["يَسُرُّنِي حُضُورُكَ وَالأُسْرَةَ", "nâsıb: masdar"], ["رُوَيْدَكَ وَالإِبِلَ", "nâsıb: ism-i fiil"], ["كَيْفَ أَنْتَ وَالبَرْدَ؟", "nâsıbsız, işitilmiş"], ["تَحَاوَرَ النَّائِبُ وَالوَزِيرُ", "atıf vâcib"], ["سَبَحْنَا وَالمُشْرِفُ يُرَاقِبُنَا", "hâl vâvı"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["اسْتَيْقَظْتُ وَطُلُوعَ الفَجْرِ", "tan ağarırken uyandım"], ["مَشَيْتُ وَشَاطِئَ البَحْرِ", "kıyı boyunca yürüdüm"], ["سِرْتُ وَالنَّهْرَ", "nehir boyunca yürüdüm"], ["عَادَ المُسَافِرُ وَاللَّيْلَ", "yolcu geceyle döndü"], ["تَحَاوَرَ النَّائِبُ وَالوَزِيرُ", "vekil ile bakan konuştu"], ["رُوَيْدَكَ وَالإِبِلَ", "develerle yavaş ol"], ["كَيْفَ أَنْتَ وَالبَرْدَ؟", "soğukla aran nasıl?"], ["مَا أَنْتَ وَإِبْرَاهِيمَ؟", "İbrahim’le ne işin var?"]] }
};
var KARTLAR = [
  ["Mef’ûlün maah nedir?", "“مَعَ” anlamındaki vâvdan sonra gelen mansûb isim: مَشَيْتُ وَشَاطِئَ البَحْرِ"],
  ["Bu vâvın adı?", "Vâv-ı maiyyet (وَاوُ المَعِيَّةِ)"],
  ["Nasıl ayırt ederim?", "Vâv yerine مَعَ koy; isim fiile ortak olamıyorsa maiyyettir."],
  ["Üç şartı?", "Vâv “مَعَ” anlamında · öncesi cümle · fazla (atılabilir)"],
  ["Ne zaman maah vâcib?", "Ortaklık olmazsa: حَضَرْتُ وَطُلُوعَ الشَّمْسِ · سِرْتُ وَالشَّاطِئَ"],
  ["Ne zaman atıf vâcib?", "Fiil iki taraf isterse: تَحَاوَرَ النَّائِبُ وَالوَزِيرُ"],
  ["Ne zaman ikisi câiz?", "İki anlam da doğruysa: حَضَرَ الجُنْدُ وَالأَمِيرُ / وَالأَمِيرَ"],
  ["Nâsıbı neler olur?", "Fiil, ism-i fâil, ism-i mef’ûl, masdar, ism-i fiil"],
  ["رُوَيْدَكَ وَالإِبِلَ?", "Nâsıb ism-i fiil رُوَيْدَ."],
  ["كَيْفَ أَنْتَ وَالبَرْدَ؟", "مَا / كَيْفَ’ten sonra nâsıbsız işitilmiş mansûb."],
  ["وَالجُمْهُورُ يُشَاهِدُونَنَا?", "Ardından isim cümlesi: hâl vâvı, mübtedâ merfû."],
  ["لَا تَأْمُرْ بِالصِّدْقِ وَتَكْذِبَ?", "Vâv “مَعَ” anlamında, ardından fiil: gizli أَنْ ile mansûb; mef’ûlün maah değil."]
];
