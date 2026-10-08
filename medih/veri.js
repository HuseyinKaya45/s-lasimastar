// ================= VERİ: Medih ve Zemm Fiilleri (أَفْعَالُ المَدْحِ وَالذَّمِّ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "فِعْلُ المَدْحِ أَوِ الذَّمِّ", tr: "Medih / zemm fiili" }, nasb: { ar: "الفَاعِلُ", tr: "Fâil" }, cerr: { ar: "المَخْصُوصُ", tr: "Mahsûs" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var MZ = [["m", "Medih (övgü)", "مَدْحٌ", "nasb"], ["z", "Zemm (yergi)", "ذَمٌّ", "cerr"]];
var FIL = [["n", "نِعْمَ (fâilli övgü)", "نِعْمَ", "nasb"], ["b", "بِئْسَ (fâilli yergi)", "بِئْسَ", "cerr"], ["h", "حَبَّذَا (fâilsiz övgü)", "حَبَّذَا", "mi"], ["l", "لَا حَبَّذَا (fâilsiz yergi)", "لَا حَبَّذَا", "ref"]];
var TA = [["t", "نِعْمَ da نِعْمَتِ de câiz", "يَجُوزُ التَّأْنِيثُ", "mi"], ["e", "Yalnız نِعْمَ / بِئْسَ", "لَا تَلْحَقُهُ التَّاءُ", "nasb"]];
var RD3 = [["m", "Medih fiili", "فِعْلُ مَدْحٍ", "nasb"], ["z", "Zemm fiili", "فِعْلُ ذَمٍّ", "cerr"], ["x", "Medih / zemm fiili değil", "لَيْسَ فِعْلَ مَدْحٍ أَوْ ذَمٍّ", "x"]];
var FR = [["a", "Fâil (ال’lı, merfû)", "فَاعِلٌ مَرْفُوعٌ", "nasb"], ["d", "حَبَّذَا: fiil حَبَّ + fâil ذَا", "حَبَّ: فِعْلٌ، ذَا: فَاعِلٌ", "mz"], ["s", "Mahsûs (merfû)", "المَخْصُوصُ مَرْفُوعٌ", "cerr"]];
var TUR_TR = { n: "نِعْمَ", b: "بِئْسَ", h: "حَبَّذَا", l: "لَا حَبَّذَا", m: "Medih", z: "Zemm", x: "Değil", t: "Tâ câiz", e: "Tâ yok", a: "Fâil", d: "حَبَّ + ذَا", s: "Mahsûs" };
// Makine: [etiket, öğrenci fâili, isimler, ihmalci fâili, isimler, müennes?, Türkçe çoğul, isimler TR, isimler2 TR, حَبَّذَا mahsûsu]
var MS = [
  ["Müfred müz.", "الطَّالِبُ", "خَالِدٌ", "المُهْمِلُ", "سَمِيرٌ", 0, "öğrenci", "Hâlid", "Semîr", "الطَّالِبُ المُجْتَهِدُ"],
  ["Müsennâ müz.", "الطَّالِبَانِ", "خَالِدٌ وَعَلِيٌّ", "المُهْمِلَانِ", "سَمِيرٌ وَكَرِيمٌ", 0, "iki öğrenci", "Hâlid ile Ali", "Semîr ile Kerîm", "الطَّالِبَانِ المُجْتَهِدَانِ"],
  ["Cem müz.", "الطُّلَّابُ", "خَالِدٌ وَعَلِيٌّ وَعُمَرُ", "المُهْمِلُونَ", "سَمِيرٌ وَكَرِيمٌ وَسَعِيدٌ", 0, "öğrenciler", "Hâlid, Ali ve Ömer", "Semîr, Kerîm ve Saîd", "الطُّلَّابُ المُجْتَهِدُونَ"],
  ["Müfred müen.", "الطَّالِبَةُ", "زَيْنَبُ", "المُهْمِلَةُ", "سَلْمَى", 1, "kız öğrenci", "Zeyneb", "Selmâ", "الطَّالِبَةُ المُجْتَهِدَةُ"],
  ["Müsennâ müen.", "الطَّالِبَتَانِ", "زَيْنَبُ وَفَاطِمَةُ", "المُهْمِلَتَانِ", "سَلْمَى وَهِنْدٌ", 1, "iki kız öğrenci", "Zeyneb ile Fâtıma", "Selmâ ile Hind", "الطَّالِبَتَانِ المُجْتَهِدَتَانِ"],
  ["Cem müen.", "الطَّالِبَاتُ", "زَيْنَبُ وَفَاطِمَةُ وَأَمِينَةُ", "المُهْمِلَاتُ", "سَلْمَى وَهِنْدٌ وَلَيْلَى", 1, "kız öğrenciler", "Zeyneb, Fâtıma ve Emîne", "Selmâ, Hind ve Leylâ", "الطَّالِبَاتُ المُجْتَهِدَاتُ"]
];
var MV4 = ["نِعْمَ", "بِئْسَ", "حَبَّذَا", "لَا حَبَّذَا"];

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
// Fiil + fâil + mahsûs: [cümle, [fiil ×3], [fâil ×3], [mahsûs ×3], Türkçe, açıklama]
function FF(x, i) { return CBP([x[0] + "<br>الفِعْلُ:", x[1], "· الفَاعِلُ:", x[2], "· المَخْصُوصُ:", x[3]], i, x[4], x[5]); }

var UNITS = [
// ---------------------------------------------------------------- 1 · نِعْمَ VE بِئْسَ
{
  id: "u1", no: 1, ar: "نِعْمَ وَبِئْسَ: فِعْلٌ وَفَاعِلٌ وَمَخْصُوصٌ", tr: "نِعْمَ ve بِئْسَ: Cümlenin Öğeleri", short: "Öğeler", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["نِعْمَ ve حَبَّذَا’nın övgü, بِئْسَ ve لَا حَبَّذَا’nın yergi bildirdiğini bilmek", "Bu fiillerin câmid olduğunu (muzâri ve emirleri olmadığını) bilmek", "نِعْمَ / بِئْسَ cümlesinde fiili, fâili ve mahsûsu ayırmak"],
  examples: [
    { s: "نِعْمَ:mz / الثَّوَابُ:nasb / الجَنَّةُ.:cerr", tr: "Cennet ne güzel bir mükâfattır!", pair: "بِئْسَ:mz / العِقَابُ:nasb / جَهَنَّمُ.:cerr", pairTr: "Cehennem ne kötü bir cezadır!" },
    { s: "حَبَّذَا:mz / العَدْلُ.:cerr", tr: "Adalet ne hoştur!", pair: "لَا حَبَّذَا:mz / الظُّلْمُ.:cerr", pairTr: "Zulüm hiç hoş değildir!" }
  ],
  rules: [
    { tr: "<b>Medih</b> (övgü) fiilleri <span class=\"ar\">نِعْمَ</span> ve <span class=\"ar\">حَبَّذَا</span>; <b>zemm</b> (yergi) fiilleri <span class=\"ar\">بِئْسَ</span> ve <span class=\"ar\">لَا حَبَّذَا</span>’dır. Hepsi <b>câmid</b> mâzî fiildir: muzârileri ve emirleri yoktur." },
    { tr: "<span class=\"ar\">نِعْمَ</span> / <span class=\"ar\">بِئْسَ</span> cümlesi üç öğeden kurulur:", ex: ["نِعْمَ ← فِعْلُ المَدْحِ (مَاضٍ جَامِدٌ)", "الثَّوَابُ ← الفَاعِلُ (مَرْفُوعٌ)", "الجَنَّةُ ← المَخْصُوصُ بِالمَدْحِ (مَرْفُوعٌ)"] },
    { tr: "Mahsûs, övülen ya da yerilen asıl kişidir/şeydir; daima <b>merfûdur</b>. Anlaşılıyorsa hazfedilir: <span class=\"ar\">حَسْبُنَا اللهُ وَنِعْمَ الوَكِيلُ</span> (yani: O)." },
    { tr: "<span class=\"ar\">حَبَّذَا</span> = <span class=\"ar\">حَبَّ</span> (fiil) + <span class=\"ar\">ذَا</span> (fâil). Bu yüzden ardından ayrıca fâil gelmez, doğrudan mahsûs gelir: <span class=\"ar\">حَبَّذَا الإِسْلَامُ</span>." }
  ],
  kaide: ["١ ـ «نِعْمَ» وَ«حَبَّذَا» فِعْلَانِ يُسْتَعْمَلَانِ لِلْمَدْحِ، وَهُمَا فِعْلَانِ جَامِدَانِ لَا يَأْتِي مِنْهُمَا مُضَارِعٌ وَلَا أَمْرٌ، مِثْلُ: نِعْمَ الثَّوَابُ الجَنَّةُ، حَبَّذَا العَدْلُ.", "٢ ـ وَ«بِئْسَ» وَ«لَا حَبَّذَا» فِعْلَانِ يُسْتَعْمَلَانِ لِلذَّمِّ، وَهُمَا أَيْضًا فِعْلَانِ جَامِدَانِ لَا يَأْتِي مِنْهُمَا مُضَارِعٌ وَلَا أَمْرٌ، مِثْلُ: بِئْسَ العِقَابُ جَهَنَّمُ، لَا حَبَّذَا الظُّلْمُ.", "٣ ـ «نِعْمَ» وَ«بِئْسَ»: تَتَكَوَّنُ جُمْلَةُ المَدْحِ أَوِ الذَّمِّ مِنْ فِعْلٍ يُرَادُ بِهِ الدَّلَالَةُ عَلَى المَدْحِ أَوِ الذَّمِّ، وَيَكُونُ دَائِمًا فِعْلًا مَاضِيًا، وَيَلِي هَذَا الفِعْلَ فَاعِلٌ، ثُمَّ يَأْتِي بَعْدَهُ الاسْمُ المَخْصُوصُ بِالمَدْحِ أَوِ الذَّمِّ وَيَكُونُ دَائِمًا مَرْفُوعًا."],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنْ أَفْعَالَ المَدْحِ وَالذَّمِّ وَفَاعِلَهَا فِي الجُمَلِ الآتِيَةِ", tr: "Fiili, fâili ve mahsûsu seç.", exHtml: "<span class=\"ar\">نِعْمَ الثَّوَابُ الجَنَّةُ ← الفِعْلُ: نِعْمَ · الفَاعِلُ: الثَّوَابُ · المَخْصُوصُ: الجَنَّةُ</span>", items: [
      ["﴿وَقَالُوا حَسْبُنَا اللهُ وَنِعْمَ الوَكِيلُ﴾", ["نِعْمَ", "حَسْبُنَا", "قَالُوا"], ["الوَكِيلُ", "اللهُ", "حَسْبُ"], ["مَحْذُوفٌ (هُوَ)", "الوَكِيلُ", "حَسْبُنَا"], "“Allah bize yeter, O ne güzel vekildir” dediler. (Âl-i İmrân 173)", "Mahsûs anlaşıldığı için hazfedilmiş."],
      ["نِعْمَ العَادِلُ عُمَرُ بْنُ عَبْدِ العَزِيزِ.", ["نِعْمَ", "العَادِلُ", "عُمَرُ"], ["العَادِلُ", "عُمَرُ", "عَبْدِ العَزِيزِ"], ["عُمَرُ بْنُ عَبْدِ العَزِيزِ", "العَادِلُ", "عَبْدِ العَزِيزِ"], "Ömer b. Abdülazîz ne güzel bir âdil!", "Fâil ال’lı, mahsûs merfû."],
      ["نِعْمَ القَاضِي عَلِيُّ بْنُ أَبِي طَالِبٍ.", ["نِعْمَ", "القَاضِي", "عَلِيُّ"], ["القَاضِي", "عَلِيُّ", "أَبِي طَالِبٍ"], ["عَلِيُّ بْنُ أَبِي طَالِبٍ", "القَاضِي", "أَبِي طَالِبٍ"], "Ali b. Ebî Tâlib ne güzel bir hâkim!", "القَاضِي takdiren merfû."],
      ["نِعْمَ الكِتَابُ القُرْآنُ.", ["نِعْمَ", "الكِتَابُ", "القُرْآنُ"], ["الكِتَابُ", "القُرْآنُ", "نِعْمَ"], ["القُرْآنُ", "الكِتَابُ", "نِعْمَ"], "Kur’an ne güzel kitap!", "Fâil الكِتَابُ."],
      ["بِئْسَ العِقَابُ السِّجْنُ.", ["بِئْسَ", "العِقَابُ", "السِّجْنُ"], ["العِقَابُ", "السِّجْنُ", "بِئْسَ"], ["السِّجْنُ", "العِقَابُ", "بِئْسَ"], "Hapis ne kötü bir ceza!", "Zemm."],
      ["حَبَّذَا الإِسْلَامُ.", ["حَبَّ", "حَبَّذَا الإِسْلَامُ", "الإِسْلَامُ"], ["ذَا", "الإِسْلَامُ", "حَبَّ"], ["الإِسْلَامُ", "ذَا", "مَحْذُوفٌ"], "İslam ne güzel!", "حَبَّ fiil, ذَا fâil, الإِسْلَامُ mahsûs."],
      ["بِئْسَ الخُلُقُ الكَذِبُ.", ["بِئْسَ", "الخُلُقُ", "الكَذِبُ"], ["الخُلُقُ", "الكَذِبُ", "بِئْسَ"], ["الكَذِبُ", "الخُلُقُ", "بِئْسَ"], "Yalan ne kötü bir huy!", "Zemm."],
      ["لَا حَبَّذَا السُّرْعَةُ.", ["حَبَّ", "لَا", "السُّرْعَةُ"], ["ذَا", "السُّرْعَةُ", "لَا"], ["السُّرْعَةُ", "ذَا", "لَا"], "Sürat (aşırı hız) hiç hoş değil!", "لَا nefy; حَبَّ fiil, ذَا fâil."]
    ].map(FF) },
    { type: "classify", extra: true, opts: MZ, ar: "مَدْحٌ أَمْ ذَمٌّ؟", tr: "Cümle övgü mü, yergi mi?", items: CL([
      [HL("نِعْمَ الثَّوَابُ الجَنَّةُ", "نِعْمَ"), "m", "نِعْمَ: medih."],
      [HL("بِئْسَ العِقَابُ جَهَنَّمُ", "بِئْسَ"), "z", "بِئْسَ: zemm."],
      [HL("حَبَّذَا العَدْلُ", "حَبَّذَا"), "m", "حَبَّذَا: medih."],
      [HL("لَا حَبَّذَا الظُّلْمُ", "لَا حَبَّذَا"), "z", "لَا حَبَّذَا: zemm."],
      [HL("نِعْمَتِ الصِّفَةُ الأَمَانَةُ", "نِعْمَتِ"), "m", "Müennes fâille نِعْمَتِ."],
      [HL("بِئْسَتِ العَادَةُ التَّدْخِينُ", "بِئْسَتِ"), "z", "بِئْسَتِ."],
      [HL("حَبَّذَا الصِّدْقُ", "حَبَّذَا"), "m", "Medih."],
      [HL("لَا حَبَّذَا الكَذِبُ", "لَا حَبَّذَا"), "z", "Zemm."],
      [HL("بِئْسَ الصَّدِيقُ الخَائِنُ", "بِئْسَ"), "z", "Zemm."],
      [HL("نِعْمَ الرَّفِيقُ الكِتَابُ", "نِعْمَ"), "m", "Medih."],
      [HL("نِعْمَ المَوْلَى وَنِعْمَ النَّصِيرُ", "نِعْمَ"), "m", "Medih (Enfâl 40)."],
      [HL("وَمَأْوَاهُمْ جَهَنَّمُ وَبِئْسَ المَصِيرُ", "بِئْسَ"), "z", "Zemm (Tevbe 73)."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · UYUM VE TÂ
{
  id: "u2", no: 2, ar: "مُطَابَقَةُ الفَاعِلِ لِلْمَخْصُوصِ وَتَاءُ التَّأْنِيثِ", tr: "Fâil–Mahsûs Uyumu ve Te’nîs Tâsı", short: "Uyum", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Fâilin sayıca ve cinsiyetçe mahsûsa uyduğunu bilmek", "Fâil müennes isim ise نِعْمَتِ / بِئْسَتِ de denebileceğini bilmek", "Mahsûsa uygun fâili seçmek"],
  examples: [
    { s: "نِعْمَ:mz / القَائِدَانِ:nasb / خَالِدٌ وَصَلَاحُ الدِّينِ.:cerr", tr: "Hâlid ile Selâhaddin ne güzel iki komutan!", pair: "نِعْمَ:mz / القَادَةُ:nasb / خَالِدٌ وَصَلَاحُ الدِّينِ وَالفَاتِحُ.:cerr", pairTr: "Hâlid, Selâhaddin ve Fâtih ne güzel komutanlar!" },
    { s: "نِعْمَتِ:mz / المُعَلِّمَةُ:nasb / نَجْلَاءُ.:cerr", tr: "Neclâ ne güzel öğretmen!", pair: "نِعْمَتِ:mz / المُعَلِّمَاتُ:nasb / نَجْلَاءُ وَفَاطِمَةُ وَأَمِينَةُ.:cerr", pairTr: "Neclâ, Fâtıma ve Emîne ne güzel öğretmenler!" }
  ],
  rules: [
    { tr: "<span class=\"ar\">نِعْمَ</span> / <span class=\"ar\">بِئْسَ</span>’in fâili, <b>mahsûsa</b> sayıca (tekil, ikil, çoğul) ve cinsiyetçe uyar; fiilin kendisi değişmez:", ex: ["نِعْمَ القَائِدُ خَالِدٌ · نِعْمَ القَائِدَانِ خَالِدٌ وَصَلَاحُ الدِّينِ · نِعْمَ القَادَةُ خَالِدٌ وَصَلَاحُ الدِّينِ وَالفَاتِحُ"] },
    { tr: "Fâil <b>müennes ism-i zâhir</b> ise fiile te’nîs tâsı eklenebilir (câizdir, şart değildir): <span class=\"ar\">نِعْمَتِ المُعَلِّمَةُ نَجْلَاءُ = نِعْمَ المُعَلِّمَةُ نَجْلَاءُ</span>." },
    { tr: "Sâkin tâdan sonra ال gelince tâ kesre alır: <span class=\"ar\">نِعْمَتِ المُعَلِّمَةُ · بِئْسَتِ العَادَةُ</span>." },
    { tr: "Fâil genellikle <b>ال’lı</b> isimdir ya da ال’lı isme <b>muzâftır</b>: <span class=\"ar\">نِعْمَ أَجْرُ العَامِلِينَ · وَلَنِعْمَ دَارُ المُتَّقِينَ</span>." }
  ],
  kaide: ["وَيُطَابِقُ فَاعِلُ «نِعْمَ» وَ«بِئْسَ» المَخْصُوصَ بِالمَدْحِ أَوِ الذَّمِّ، مِثْلُ: نِعْمَ القَائِدُ خَالِدُ بْنُ الوَلِيدِ. نِعْمَ القَائِدَانِ خَالِدُ بْنُ الوَلِيدِ وَصَلَاحُ الدِّينِ الأَيُّوبِيُّ. نِعْمَ القَادَةُ خَالِدُ بْنُ الوَلِيدِ وَالسُّلْطَانُ مُحَمَّدٌ الفَاتِحُ وَصَلَاحُ الدِّينِ الأَيُّوبِيُّ.", "يَجُوزُ أَنْ تَلْحَقَ تَاءُ التَّأْنِيثِ «نِعْمَ» وَ«بِئْسَ» إِذَا كَانَ الفَاعِلُ اسْمًا ظَاهِرًا مُؤَنَّثًا، مِثْلُ: نِعْمَتِ المُعَلِّمَةُ نَجْلَاءُ."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "ضَعْ خَطًّا أَمَامَ التَّكْمِلَةِ الصَّحِيحَةِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Mahsûsa uyan fâili seç.", exHtml: "<span class=\"ar\">نِعْمَ ___ صَلَاحُ الدِّينِ وَالفَاتِحُ (القَائِدَانِ، القَائِدُ، القَادَةُ) ← القَائِدَانِ</span>", items: PL([
      ["بِئْسَ ___ أَبُو جَهْلٍ وَأَبُو لَهَبٍ وَأُمَيَّةُ.", "المُشْرِكُونَ", "المُشْرِكَانِ", "المُشْرِكُ", "Ebû Cehil, Ebû Leheb ve Ümeyye ne kötü müşrikler!", "Üç kişi: çoğul fâil."],
      ["بِئْسَتِ ___ زَوْجَةُ أَبِي لَهَبٍ.", "المَرْأَةُ", "المَرْأَتَانِ", "النِّسَاءُ", "Ebû Leheb’in karısı ne kötü kadın!", "Tek kişi: tekil müennes."],
      ["نِعْمَ ___ ابْنُ سِينَا.", "العَالِمُ", "العَالِمَانِ", "العُلَمَاءُ", "İbn Sînâ ne büyük âlim!", "Tekil."],
      ["نِعْمَتِ ___ زَيْنَبُ.", "الصَّدِيقَةُ", "الصَّدِيقَاتُ", "الصَّدِيقَتَانِ", "Zeyneb ne iyi arkadaş!", "Tekil müennes."],
      ["نِعْمَ ___ أَبُو بَكْرٍ الصِّدِّيقُ.", "الخَلِيفَةُ", "الخُلَفَاءُ", "الخَلِيفَتَانِ", "Ebû Bekir es-Sıddîk ne güzel halife!", "Tekil."],
      ["بِئْسَ ___ سَمِيحٌ وَإِبْرَاهِيمُ وَعَلِيٌّ.", "اللَّاعِبُونَ", "اللَّاعِبَانِ", "اللَّاعِبُ", "Semîh, İbrâhim ve Ali ne kötü oyuncular!", "Üç kişi: çoğul."],
      ["نِعْمَتِ ___ شَوَّالُ وَمَرْوَةُ وَنِهَالُ.", "الطَّالِبَاتُ", "الطَّالِبَتَانِ", "الطَّالِبَةُ", "Şevval, Merve ve Nihal ne iyi öğrenciler!", "Üç kız: cem-i müennes."],
      ["بِئْسَتِ ___ آمِنَةُ.", "العَامِلَةُ", "العَامِلَتَانِ", "العَامِلَاتُ", "Âmine ne kötü işçi!", "Tekil müennes."]
    ])},
    { type: "classify", extra: true, opts: TA, ar: "هَلْ يَجُوزُ: نِعْمَتْ / بِئْسَتْ؟", tr: "Fiile te’nîs tâsı eklenebilir mi?", items: CL([
      ["نِعْمَ(تِ) المُعَلِّمَةُ نَجْلَاءُ", "t", "Fâil müennes: ikisi de câiz."],
      ["نِعْمَ(تِ) القَائِدُ خَالِدٌ", "e", "Fâil müzekker: tâ eklenmez."],
      ["بِئْسَ(تِ) العَادَةُ الكَذِبُ", "t", "Fâil العَادَةُ müennes."],
      ["نِعْمَ(تِ) الخُلُقُ الصِّدْقُ", "e", "Fâil الخُلُقُ müzekker."],
      ["بِئْسَ(تِ) المَرْأَةُ زَوْجَةُ أَبِي لَهَبٍ", "t", "Müennes fâil."],
      ["نِعْمَ(تِ) الكِتَابُ القُرْآنُ", "e", "Müzekker."],
      ["نِعْمَ(تِ) الطَّالِبَاتُ زَيْنَبُ وَفَاطِمَةُ وَأَمِينَةُ", "t", "Müennes çoğul."],
      ["بِئْسَ(تِ) اللَّاعِبُونَ سَمِيحٌ وَعَلِيٌّ وَإِبْرَاهِيمُ", "e", "Müzekker çoğul."],
      ["نِعْمَ(تِ) الفَضِيلَةُ الصَّبْرُ", "t", "Fâil الفَضِيلَةُ müennes (mahsûs müzekker olsa da)."],
      ["بِئْسَ(تِ) العِقَابُ السِّجْنُ", "e", "Müzekker."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · حَبَّذَا VE لَا حَبَّذَا
{
  id: "u3", no: 3, ar: "حَبَّذَا وَلَا حَبَّذَا", tr: "حَبَّذَا ve لَا حَبَّذَا", short: "حَبَّذَا", col: "mi", legend: ["mz", "cerr"],
  goals: ["حَبَّذَا ve لَا حَبَّذَا’nın hiç değişmediğini bilmek", "ذَا’nın fâil olduğunu, ardından mahsûsun merfû geldiğini bilmek", "Cümleye uygun medih / zemm fiilini koymak"],
  examples: [
    { s: "حَبَّذَا:mz / الطَّالِبُ،:cerr / حَبَّذَا:mz / الطَّالِبَانِ،:cerr / حَبَّذَا:mz / الطُّلَّابُ.:cerr", tr: "Öğrenci / iki öğrenci / öğrenciler ne hoş!" },
    { s: "حَبَّذَا:mz / الطَّالِبَةُ،:cerr / حَبَّذَا:mz / الطَّالِبَتَانِ،:cerr / حَبَّذَا:mz / الطَّالِبَاتُ.:cerr", tr: "Kız öğrenci / iki kız öğrenci / kız öğrenciler ne hoş!" }
  ],
  rules: [
    { tr: "<span class=\"ar\">حَبَّذَا</span> ve <span class=\"ar\">لَا حَبَّذَا</span> tekil, ikil, çoğul, müzekker, müennes her isimle <b>aynı biçimde</b> kalır: <span class=\"ar\">حَبَّذَا الطَّالِبَاتُ</span> (<span class=\"ar\">حَبَّتَا، حَبَّذِهِ</span> denmez)." },
    { tr: "<span class=\"ar\">ذَا</span>, <span class=\"ar\">حَبَّ</span>’nin fâilidir; ardından gelen isim <b>mahsûstur</b> ve merfûdur." },
    { tr: "Uygun fiili seçerken: cümlede ال’lı bir fâil + mahsûs varsa <span class=\"ar\">نِعْمَ / بِئْسَ</span>; yalnız mahsûs varsa <span class=\"ar\">حَبَّذَا / لَا حَبَّذَا</span>. Sonra anlama bak: övgü mü, yergi mi?", ex: ["… الخُلُقُ البُخْلُ ← بِئْسَ الخُلُقُ البُخْلُ", "… الفَشَلُ فِي الاخْتِبَارِ ← لَا حَبَّذَا الفَشَلُ"] }
  ],
  kaide: ["٤ ـ «حَبَّذَا» وَ«لَا حَبَّذَا» تَأْتِيَانِ عَلَى صُورَةٍ وَاحِدَةٍ مَعَ المُفْرَدِ وَالمُثَنَّى وَالجَمْعِ، وَمَعَ المُذَكَّرِ وَالمُؤَنَّثِ، وَ«ذَا» تُعْرَبُ فَاعِلًا لِـ«حَبَّ»، ثُمَّ يَأْتِي بَعْدَهَا الاسْمُ المَخْصُوصُ بِالمَدْحِ أَوِ الذَّمِّ وَيَكُونُ دَائِمًا مَرْفُوعًا، مِثْلُ: حَبَّذَا الطَّالِبُ، حَبَّذَا الطَّالِبَانِ، حَبَّذَا الطُّلَّابُ، حَبَّذَا الطَّالِبَةُ، حَبَّذَا الطَّالِبَتَانِ، حَبَّذَا الطَّالِبَاتُ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "ضَعْ فِعْلًا مُنَاسِبًا مِنْ أَفْعَالِ المَدْحِ أَوِ الذَّمِّ فِي الجُمَلِ التَّالِيَةِ", tr: "Boşluğa uygun medih / zemm fiilini seç.", items: PL([
      ["___ الخُلُقُ البُخْلُ.", "بِئْسَ", "نِعْمَ", "لَا حَبَّذَا", "Cimrilik ne kötü huy!", "Fâil var, anlam yergi."],
      ["___ المَصِيرُ جَهَنَّمُ.", "بِئْسَ", "نِعْمَ", "حَبَّذَا", "Cehennem ne kötü varış yeri!", "Yergi."],
      ["___ المُكَافَأَةُ الجَنَّةُ.", "نِعْمَتِ", "بِئْسَتِ", "حَبَّذَا", "Cennet ne güzel mükâfat!", "Övgü; نِعْمَ da câiz."],
      ["___ الصِّفَةُ الكَسَلُ.", "بِئْسَتِ", "نِعْمَتِ", "حَبَّذَا", "Tembellik ne kötü sıfat!", "Yergi; بِئْسَ da câiz."],
      ["___ الفَشَلُ فِي الاخْتِبَارِ.", "لَا حَبَّذَا", "بِئْسَ", "نِعْمَ", "Sınavda başarısızlık hiç hoş değil!", "Fâil yok, yalnız mahsûs: لَا حَبَّذَا."],
      ["___ اللَّحْمُ السَّمَكُ.", "نِعْمَ", "بِئْسَ", "لَا حَبَّذَا", "Balık ne güzel et!", "Övgü."],
      ["___ الفَاكِهَةُ الرُّمَّانُ.", "نِعْمَتِ", "بِئْسَتِ", "حَبَّذَا", "Nar ne güzel meyve!", "Övgü; fâil müennes."],
      ["___ الشَّرَابُ الخَمْرُ.", "بِئْسَ", "نِعْمَ", "لَا حَبَّذَا", "Şarap ne kötü içecek!", "Yergi."]
    ])},
    { type: "classify", extra: true, opts: FIL, ar: "أَيُّ فِعْلٍ يُنَاسِبُ؟", tr: "Boşluğa hangi fiil gelir? (Fâil var mı, anlam övgü mü yergi mi?)", items: CL([
      ["… الخُلُقُ الصِّدْقُ", "n", "Fâil var, övgü."],
      ["… الرَّفِيقُ الكِتَابُ", "n", "Fâil var, övgü."],
      ["… الثَّوَابُ الجَنَّةُ", "n", "Fâil var, övgü."],
      ["… الشَّرَابُ اللَّبَنُ", "n", "Fâil var, övgü."],
      ["… العِقَابُ جَهَنَّمُ", "b", "Fâil var, yergi."],
      ["… الخُلُقُ الكَذِبُ", "b", "Fâil var, yergi."],
      ["… الصَّدِيقُ الخَائِنُ", "b", "Fâil var, yergi."],
      ["… الجَارُ المُؤْذِي", "b", "Fâil var, yergi."],
      ["… العَدْلُ", "h", "Yalnız mahsûs, övgü."],
      ["… الإِسْلَامُ", "h", "Yalnız mahsûs, övgü."],
      ["… الطُّلَّابُ المُجْتَهِدُونَ", "h", "Yalnız mahsûs, övgü."],
      ["… الصَّبْرُ", "h", "Yalnız mahsûs, övgü."],
      ["… الظُّلْمُ", "l", "Yalnız mahsûs, yergi."],
      ["… السُّرْعَةُ", "l", "Yalnız mahsûs, yergi."],
      ["… الكَسَلُ", "l", "Yalnız mahsûs, yergi."],
      ["… الغَدْرُ", "l", "Yalnız mahsûs, yergi."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · MAHSÛS VE FÂİL
{
  id: "u4", no: 4, ar: "المَخْصُوصُ وَالفَاعِلُ", tr: "Mahsûsu ve Fâili Tamamlamak", short: "Tamamla", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Uygun mahsûsu seçip merfû okumak", "Uygun fâili ال’lı ve merfû olarak seçmek", "Gayr-i munsarif mahsûsu doğru okumak"],
  examples: [
    { s: "نِعْمَ:mz / الخُضَارُ:nasb / الطَّمَاطِمُ.:cerr", tr: "Domates ne güzel sebze!", pair: "نِعْمَ:mz / النَّشَاطُ الحُرُّ:nasb / الرِّيَاضَةُ.:cerr", pairTr: "Spor ne güzel serbest etkinlik!" },
    { s: "نِعْمَ:mz / المُدَرِّبُ:nasb / أَحْمَدُ.:cerr", tr: "Ahmed ne iyi antrenör! (أَحْمَدُ gayr-i munsarif)" }
  ],
  rules: [
    { tr: "<b>Mahsûs</b> daima merfûdur; anlamca fâile uygun olmalıdır: <span class=\"ar\">بِئْسَ الخُلُقُ <b>الحَسَدُ</b></span> (huy → kıskançlık)." },
    { tr: "<b>Fâil</b> nekre olmaz; ال’lı ya da ال’lıya muzâf gelir: <span class=\"ar\">نِعْمَ الرِّزْقُ · بِئْسَ مَثَلُ القَوْمِ</span>. (<span class=\"ar\">نِعْمَ رِزْقٌ</span> denmez.)" },
    { tr: "Klasik gramerde fâil gizli zamir de olabilir; o zaman ardından mansûb temyiz gelir: <span class=\"ar\">نِعْمَ رَجُلًا خَالِدٌ</span>. Kitap bu kullanıma girmez." },
    { tr: "Mahsûs i’rabda iki türlü açıklanır: ya önündeki cümlenin haberi olan muahhar mübtedâ, ya da gizli mübtedânın (<span class=\"ar\">هُوَ</span>) haberi." }
  ],
  kaide: ["ثُمَّ يَأْتِي بَعْدَ الفَاعِلِ الاسْمُ المَخْصُوصُ بِالمَدْحِ أَوِ الذَّمِّ وَيَكُونُ دَائِمًا مَرْفُوعًا: نِعْمَ الخُضَارُ الطَّمَاطِمُ، نِعْمَ النَّشَاطُ الحُرُّ الرِّيَاضَةُ."],
  ex: [
    { type: "pick", fill: true, num: "٤", ar: "أَكْمِلِ الفَرَاغَ بِوَضْعِ المَخْصُوصِ بِالمَدْحِ أَوِ الذَّمِّ مَعَ ضَبْطِهِ بِالشَّكْلِ", tr: "Anlamca uygun ve doğru harekeli mahsûsu seç.", exHtml: "<span class=\"ar\">نِعْمَ الخُضَارُ ← الطَّمَاطِمُ</span>", items: PL([
      ["نِعْمَ الإِدَامُ ___.", "الزَّيْتُ", "الزَّيْتَ", "الكَذِبُ", "Zeytinyağı ne güzel katık!", "Anlamca uygun, merfû."],
      ["بِئْسَ الخُلُقُ ___.", "الحَسَدُ", "الحَسَدَ", "الكَرَمُ", "Kıskançlık ne kötü huy!", "Yergiye uygun, merfû."],
      ["نِعْمَ المُدَرِّبُ ___.", "أَحْمَدُ", "أَحْمَدَ", "أَحْمَدٍ", "Ahmed ne iyi antrenör!", "Gayr-i munsarif: tenvinsiz merfû."],
      ["بِئْسَتِ العَادَةُ ___.", "التَّدْخِينُ", "التَّدْخِينَ", "الرِّيَاضَةُ", "Sigara içmek ne kötü alışkanlık!", "Merfû."],
      ["حَبَّذَا ___.", "الصِّدْقُ", "الصِّدْقَ", "الكَذِبُ", "Doğruluk ne hoş!", "Övgüye uygun, merfû."],
      ["نِعْمَتِ الفَضِيلَةُ ___.", "الصَّبْرُ", "الصَّبْرَ", "البُخْلُ", "Sabır ne güzel fazilet!", "Merfû."],
      ["لَا حَبَّذَا ___.", "الكَسَلُ", "الكَسَلَ", "العِلْمُ", "Tembellik hiç hoş değil!", "Yergiye uygun, merfû."],
      ["نِعْمَ الكِتَابُ ___.", "القُرْآنُ", "القُرْآنَ", "القُرْآنِ", "Kur’an ne güzel kitap!", "Merfû."]
    ])},
    { type: "pick", fill: true, num: "٥", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ فَاعِلٍ مُنَاسِبٍ", tr: "Anlamca uygun, ال’lı ve merfû fâili seç.", exHtml: "<span class=\"ar\">نِعْمَ ___ الرِّيَاضَةُ ← نِعْمَ النَّشَاطُ الحُرُّ الرِّيَاضَةُ</span>", items: PL([
      ["نِعْمَ ___ الكَسْبُ مِنْ عَمَلِ اليَدِ.", "الرِّزْقُ", "الرِّزْقَ", "رِزْقٌ", "El emeğiyle kazanç ne güzel rızık!", "Fâil ال’lı, merfû."],
      ["بِئْسَ ___ الغَدْرُ.", "الخُلُقُ", "الخُلُقَ", "خُلُقٌ", "Hıyanet ne kötü huy!", "Nekre fâil olmaz."],
      ["نِعْمَ ___ الجَنَّةُ.", "الجَزَاءُ", "الجَزَاءَ", "جَزَاءٌ", "Cennet ne güzel karşılık!", "Merfû."],
      ["بِئْسَتِ ___ شَهَادَةُ الزُّورِ.", "الجَرِيمَةُ", "الجَرِيمَةَ", "الجَرَائِمُ", "Yalancı şahitlik ne kötü suç!", "Tekil mahsûsa tekil fâil."],
      ["نِعْمَ ___ الصَّبْرُ عِنْدَ المُصِيبَةِ.", "الخُلُقُ", "الخُلُقِ", "الأَخْلَاقُ", "Musibette sabır ne güzel huy!", "Tekil, merfû."],
      ["نِعْمَتِ ___ الصَّلَاةُ.", "العِبَادَةُ", "العِبَادَةَ", "العِبَادَاتُ", "Namaz ne güzel ibadet!", "Müennes tekil."],
      ["بِئْسَ ___ الرُّسُوبُ فِي الامْتِحَانِ.", "الأَمْرُ", "الأَمْرَ", "أَمْرٌ", "Sınavda kalmak ne kötü şey!", "Fâil ال’lı."],
      ["نِعْمَ ___ عَبْدُ الحَمِيدِ الثَّانِي.", "السُّلْطَانُ", "السُّلْطَانَ", "السَّلَاطِينُ", "II. Abdülhamid ne güzel sultan!", "Tekil, merfû."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMA
{
  id: "u5", no: 5, ar: "فِي الآيَاتِ وَالقِرَاءَةِ", tr: "Âyetlerde ve Okumada", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Âyetlerde medih / zemm fiilini ve fâilini bulmak", "Hazfedilmiş mahsûsu ve muzâf fâili tanımak", "“الصِّدْقُ” metninde fiilleri, fâilleri ve mahsûsları ayırmak"],
  examples: [
    { s: "هُوَ مَوْلَاكُمْ:x / فَنِعْمَ:mz / المَوْلَى:nasb / وَنِعْمَ:mz / النَّصِيرُ:nasb", tr: "O sizin mevlânızdır; ne güzel mevlâ, ne güzel yardımcı! (Hac 78)" },
    { s: "بِئْسَ:mz / الاسْمُ:nasb / الفُسُوقُ:cerr / بَعْدَ الإِيمَانِ:x", tr: "İmandan sonra fâsıklık ne kötü bir isimdir! (Hucurât 11)" }
  ],
  rules: [
    { tr: "Âyetlerde mahsûs çoğu zaman anlaşıldığı için <b>hazfedilir</b>: <span class=\"ar\">وَبِئْسَ المِهَادُ</span> (yani cehennem), <span class=\"ar\">نِعْمَ المَوْلَى</span> (yani Allah)." },
    { tr: "Fâil ال’lı isme <b>muzâf</b> olabilir: <span class=\"ar\">وَنِعْمَ أَجْرُ العَامِلِينَ · وَلَنِعْمَ دَارُ المُتَّقِينَ · بِئْسَ مَثَلُ القَوْمِ</span>." },
    { tr: "<span class=\"ar\">لَنِعْمَ</span>’deki <span class=\"ar\">لَـ</span> tekit (kasem cevabı) lâmıdır; fiil yine <span class=\"ar\">نِعْمَ</span>’dir." }
  ],
  kaide: ["عَيِّنْ أَفْعَالَ المَدْحِ وَالذَّمِّ وَفَاعِلَهَا فِي الآيَاتِ القُرْآنِيَّةِ وَفِي القِطْعَةِ، وَاضْبِطْ آخِرَهُمَا."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "٦", ar: "عَيِّنْ أَفْعَالَ المَدْحِ وَالذَّمِّ وَفَاعِلَهَا فِي الآيَاتِ القُرْآنِيَّةِ التَّالِيَةِ", tr: "Fiili, fâili ve (varsa) mahsûsu etiketle; kalanlar Başka.", items: [
      T("قُلْ لِلَّذِينَ كَفَرُوا سَتُغْلَبُونَ وَتُحْشَرُونَ إِلَى جَهَنَّمَ:x / وَبِئْسَ:mz / المِهَادُ:nasb", "İnkâr edenlere de ki: Yenileceksiniz ve cehenneme toplanacaksınız; o ne kötü döşektir! (Âl-i İmrân 12)", "Mahsûs hazfedilmiş (cehennem)."),
      T("يَا أَيُّهَا النَّبِيُّ جَاهِدِ الكُفَّارَ وَالمُنَافِقِينَ وَاغْلُظْ عَلَيْهِمْ وَمَأْوَاهُمْ جَهَنَّمُ:x / وَبِئْسَ:mz / المَصِيرُ:nasb", "Ey Peygamber! Kâfirlerle ve münafıklarla cihad et, onlara karşı sert ol; varacakları yer cehennemdir, o ne kötü varış yeridir! (Tevbe 73)", "Mahsûs hazfedilmiş."),
      T("… وَلَا تَلْمِزُوا أَنْفُسَكُمْ وَلَا تَنَابَزُوا بِالأَلْقَابِ:x / بِئْسَ:mz / الاسْمُ:nasb / الفُسُوقُ:cerr / بَعْدَ الإِيمَانِ وَمَنْ لَمْ يَتُبْ فَأُولَئِكَ هُمُ الظَّالِمُونَ:x", "… Birbirinizi ayıplamayın, kötü lakaplarla çağırmayın; imandan sonra fâsıklık ne kötü isimdir! Tövbe etmeyenler zalimlerin ta kendileridir. (Hucurât 11)", "Mahsûs الفُسُوقُ."),
      T("مَثَلُ الَّذِينَ حُمِّلُوا التَّوْرَاةَ ثُمَّ لَمْ يَحْمِلُوهَا كَمَثَلِ الحِمَارِ يَحْمِلُ أَسْفَارًا:x / بِئْسَ:mz / مَثَلُ القَوْمِ:nasb / الَّذِينَ كَذَّبُوا بِآيَاتِ اللهِ وَاللهُ لَا يَهْدِي القَوْمَ الظَّالِمِينَ:x", "Tevrat yükletilip de onu taşımayanların durumu, ciltlerce kitap taşıyan eşeğin durumu gibidir. Allah’ın âyetlerini yalanlayan toplumun durumu ne kötü! (Cuma 5)", "Fâil مَثَلُ (ال’lıya muzâf); الَّذِينَ… القَوْمِ’in sıfatı, mahsûs hazfedilmiş."),
      T("أُولَئِكَ جَزَاؤُهُمْ مَغْفِرَةٌ مِنْ رَبِّهِمْ وَجَنَّاتٌ تَجْرِي مِنْ تَحْتِهَا الأَنْهَارُ خَالِدِينَ فِيهَا:x / وَنِعْمَ:mz / أَجْرُ العَامِلِينَ:nasb", "Onların mükâfatı Rablerinden bir mağfiret ve içinden ırmaklar akan, ebedî kalacakları cennetlerdir; (iyi) amel edenlerin ecri ne güzel! (Âl-i İmrân 136)", "Fâil muzâf: أَجْرُ."),
      T("وَإِنْ تَوَلَّوْا فَاعْلَمُوا أَنَّ اللهَ مَوْلَاكُمْ:x / نِعْمَ:mz / المَوْلَى:nasb / وَنِعْمَ:mz / النَّصِيرُ:nasb", "Yüz çevirirlerse bilin ki Allah sizin mevlânızdır; ne güzel mevlâ, ne güzel yardımcı! (Enfâl 40)", "İki medih cümlesi; mahsûs hazfedilmiş."),
      T("وَقِيلَ لِلَّذِينَ اتَّقَوْا مَاذَا أَنْزَلَ رَبُّكُمْ قَالُوا خَيْرًا لِلَّذِينَ أَحْسَنُوا فِي هَذِهِ الدُّنْيَا حَسَنَةٌ وَلَدَارُ الآخِرَةِ خَيْرٌ:x / وَلَنِعْمَ:mz / دَارُ المُتَّقِينَ:nasb", "Takvâ sahiplerine “Rabbiniz ne indirdi?” denildi; “Hayır” dediler. Bu dünyada iyilik edenlere iyilik vardır; ahiret yurdu ise daha hayırlıdır. Takvâ sahiplerinin yurdu ne güzeldir! (Nahl 30)", "Fâil muzâf: دَارُ."),
      T("… فَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَاعْتَصِمُوا بِاللهِ هُوَ مَوْلَاكُمْ:x / فَنِعْمَ:mz / المَوْلَى:nasb / وَنِعْمَ:mz / النَّصِيرُ:nasb", "… Namazı kılın, zekâtı verin ve Allah’a sımsıkı sarılın; O sizin mevlânızdır. Ne güzel mevlâ, ne güzel yardımcı! (Hac 78)", "İki medih cümlesi.")
    ]},
    { type: "reading", num: "٧", ar: "اقْرَإِ القِطْعَةَ ثُمَّ عَيِّنْ أَفْعَالَ المَدْحِ وَالذَّمِّ وَفَاعِلَهَا وَاضْبِطْ آخِرَهُمَا", tr: "Metni oku, soruları cevapla; sonra koyu kelimelerin türünü seç.", title: "الصِّدْقُ",
      text: "نِعْمَ الخُلُقُ الصِّدْقُ؛ فَإِنَّهُ يَرْفَعُ مَكَانَةَ الفَرْدِ فِي مُجْتَمَعِهِ، وَيَجْعَلُهُ مَحْبُوبًا بَيْنَ النَّاسِ، يَثِقُونَ بِحَدِيثِهِ وَيُقَدِّمُونَ رَأْيَهُ. وَبِئْسَ الخُلُقُ الكَذِبُ؛ فَهُوَ صِفَةٌ سَيِّئَةٌ فِي الإِنْسَانِ تُفَرِّقُ الأَصْدِقَاءَ وَتُبَاعِدُ بَيْنَ الأَحْبَابِ.<br>وَحَبَّذَا الرَّجُلُ الصَّادِقُ، وَلَا حَبَّذَا الرَّجُلُ الكَاذِبُ؛ فَإِنَّ الإِسْلَامَ يَحُثُّ عَلَى الصِّدْقِ لِأَنَّهُ يَهْدِي إِلَى الخَيْرِ، وَيُحَرِّمُ الكَذِبَ لِخُطُورَتِهِ عَلَى المُجْتَمَعِ الإِسْلَامِيِّ. قَالَ رَسُولُ اللهِ ﷺ: «إِنَّ الصِّدْقَ يَهْدِي إِلَى البِرِّ، وَإِنَّ البِرَّ يَهْدِي إِلَى الجَنَّةِ، وَإِنَّ الرَّجُلَ لَيَصْدُقُ حَتَّى يُكْتَبَ عِنْدَ اللهِ صِدِّيقًا، وَإِنَّ الكَذِبَ يَهْدِي إِلَى الفُجُورِ، وَإِنَّ الفُجُورَ يَهْدِي إِلَى النَّارِ، وَإِنَّ الرَّجُلَ لَيَكْذِبُ حَتَّى يُكْتَبَ عِنْدَ اللهِ كَذَّابًا».",
      textTr: "Doğruluk ne güzel huydur! Kişinin toplumdaki değerini yükseltir, onu insanlar arasında sevilen biri yapar; insanlar sözüne güvenir, görüşünü öne alır. Yalan ne kötü huydur! İnsanda kötü bir sıfattır; dostları ayırır, sevenleri birbirinden uzaklaştırır.<br>Doğru sözlü adam ne hoş, yalancı adam hiç hoş değil! İslam doğruluğa teşvik eder, çünkü o hayra götürür; yalanı ise İslam toplumuna verdiği zarar yüzünden haram kılar. Resûlullah ﷺ buyurdu: “Doğruluk iyiliğe, iyilik de cennete götürür. Kişi doğru söyleye söyleye Allah katında sıddîk diye yazılır. Yalan kötülüğe, kötülük de cehenneme götürür. Kişi yalan söyleye söyleye Allah katında yalancı diye yazılır.”",
      qa: [
        { q: "لِمَاذَا يُمْدَحُ الصِّدْقُ؟", a: "لِأَنَّهُ يَرْفَعُ مَكَانَةَ الفَرْدِ وَيَجْعَلُهُ مَحْبُوبًا بَيْنَ النَّاسِ.", tr: "Doğruluk niçin övülür? Kişinin değerini yükseltir ve onu sevilen biri yapar." },
        { q: "مَاذَا يَفْعَلُ الكَذِبُ بَيْنَ النَّاسِ؟", a: "يُفَرِّقُ الأَصْدِقَاءَ وَيُبَاعِدُ بَيْنَ الأَحْبَابِ.", tr: "Yalan insanlar arasında ne yapar? Dostları ayırır, sevenleri uzaklaştırır." },
        { q: "لِمَاذَا يَحُثُّ الإِسْلَامُ عَلَى الصِّدْقِ؟", a: "لِأَنَّهُ يَهْدِي إِلَى الخَيْرِ.", tr: "İslam niçin doğruluğa teşvik eder? Çünkü hayra götürür." },
        { q: "إِلَى أَيْنَ يَهْدِي البِرُّ؟", a: "يَهْدِي البِرُّ إِلَى الجَنَّةِ.", tr: "İyilik nereye götürür? Cennete." },
        { q: "إِلَى أَيْنَ يَهْدِي الفُجُورُ؟", a: "يَهْدِي الفُجُورُ إِلَى النَّارِ.", tr: "Kötülük nereye götürür? Cehenneme." }
      ],
      cls: { opts: RD3, ar: "هَلْ هُوَ فِعْلُ مَدْحٍ أَوْ ذَمٍّ؟", tr: "Koyu fiil medih fiili mi, zemm fiili mi, yoksa ikisi de değil mi?", items: [
        { s: HL("نِعْمَ الخُلُقُ الصِّدْقُ", "نِعْمَ"), a: "m", why: "Medih fiili." },
        { s: HL("وَبِئْسَ الخُلُقُ الكَذِبُ", "بِئْسَ"), a: "z", why: "Zemm fiili." },
        { s: HL("وَحَبَّذَا الرَّجُلُ الصَّادِقُ", "حَبَّذَا"), a: "m", why: "Medih." },
        { s: HL("وَلَا حَبَّذَا الرَّجُلُ الكَاذِبُ", "لَا حَبَّذَا"), a: "z", why: "Zemm." },
        { s: HL("فَإِنَّهُ يَرْفَعُ مَكَانَةَ الفَرْدِ", "يَرْفَعُ"), a: "x", why: "Mutasarrıf fiil." },
        { s: HL("فَإِنَّ الإِسْلَامَ يَحُثُّ عَلَى الصِّدْقِ", "يَحُثُّ"), a: "x", why: "Mutasarrıf fiil." },
        { s: HL("وَيُحَرِّمُ الكَذِبَ", "يُحَرِّمُ"), a: "x", why: "Mutasarrıf fiil." },
        { s: HL("إِنَّ الصِّدْقَ يَهْدِي إِلَى البِرِّ", "يَهْدِي"), a: "x", why: "Mutasarrıf fiil." },
        { s: HL("وَيَجْعَلُهُ مَحْبُوبًا بَيْنَ النَّاسِ", "مَحْبُوبًا"), a: "x", why: "İsm-i mef’ûl." }
      ]},
      cls2: { opts: FR, ar: "مَا وَظِيفَةُ الكَلِمَةِ؟", tr: "Koyu kelime fâil mi, mahsûs mu?", items: [
        { s: HL("نِعْمَ الخُلُقُ الصِّدْقُ", "الخُلُقُ"), a: "a", why: "Fâil: الخُلُقُ (ال’lı, merfû)." },
        { s: HL("نِعْمَ الخُلُقُ الصِّدْقُ", "الصِّدْقُ"), a: "s", why: "Mahsûs: الصِّدْقُ (merfû)." },
        { s: HL("وَبِئْسَ الخُلُقُ الكَذِبُ", "الخُلُقُ"), a: "a", why: "Fâil." },
        { s: HL("وَبِئْسَ الخُلُقُ الكَذِبُ", "الكَذِبُ"), a: "s", why: "Mahsûs." },
        { s: HL("وَحَبَّذَا الرَّجُلُ الصَّادِقُ", "حَبَّذَا"), a: "d", why: "حَبَّ fiil, ذَا fâil." },
        { s: HL("وَحَبَّذَا الرَّجُلُ الصَّادِقُ", "الرَّجُلُ الصَّادِقُ"), a: "s", why: "Mahsûs (sıfatıyla)." },
        { s: HL("وَلَا حَبَّذَا الرَّجُلُ الكَاذِبُ", "حَبَّذَا"), a: "d", why: "ذَا fâil." },
        { s: HL("وَلَا حَبَّذَا الرَّجُلُ الكَاذِبُ", "الرَّجُلُ الكَاذِبُ"), a: "s", why: "Mahsûs." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["{نِعْمَ} الثَّوَابُ الجَنَّةُ.", ["نِعْمَ", "بِئْسَ", "حَبَّذَا"], "fâilli övgü", "Cennet ne güzel mükâfat!", "u1"],
  ["نِعْمَ {الثَّوَابُ} الجَنَّةُ.", ["الثَّوَابُ", "الثَّوَابَ", "ثَوَابٌ"], "fâil ال’lı, merfû", "Cennet ne güzel mükâfat!", "u1"],
  ["بِئْسَ العِقَابُ {جَهَنَّمُ}.", ["جَهَنَّمُ", "جَهَنَّمَ", "جَهَنَّمٍ"], "mahsûs merfû", "Cehennem ne kötü ceza!", "u1"],
  ["نِعْمَ الكِتَابُ {القُرْآنُ}.", ["القُرْآنُ", "القُرْآنَ", "القُرْآنِ"], "mahsûs merfû", "Kur’an ne güzel kitap!", "u1"],
  ["{بِئْسَ} الخُلُقُ الكَذِبُ.", ["بِئْسَ", "نِعْمَ", "حَبَّذَا"], "fâilli yergi", "Yalan ne kötü huy!", "u1"],
  ["نِعْمَ {القَائِدَانِ} خَالِدٌ وَصَلَاحُ الدِّينِ.", ["القَائِدَانِ", "القَائِدُ", "القَادَةُ"], "iki mahsûs: ikil fâil", "Ne güzel iki komutan!", "u2"],
  ["نِعْمَ {القَادَةُ} خَالِدٌ وَصَلَاحُ الدِّينِ وَالفَاتِحُ.", ["القَادَةُ", "القَائِدَانِ", "القَائِدُ"], "üç mahsûs: çoğul fâil", "Ne güzel komutanlar!", "u2"],
  ["{نِعْمَتِ} المُعَلِّمَةُ نَجْلَاءُ.", ["نِعْمَتِ", "نَعِمَتْ", "نِعْمَةُ"], "müennes fâil: tâ câiz", "Neclâ ne güzel öğretmen!", "u2"],
  ["بِئْسَ {المُشْرِكُونَ} أَبُو جَهْلٍ وَأَبُو لَهَبٍ وَأُمَيَّةُ.", ["المُشْرِكُونَ", "المُشْرِكَانِ", "المُشْرِكُ"], "çoğul fâil", "Ne kötü müşrikler!", "u2"],
  ["نِعْمَ {العَالِمُ} ابْنُ سِينَا.", ["العَالِمُ", "العُلَمَاءُ", "العَالِمَانِ"], "tekil fâil", "İbn Sînâ ne büyük âlim!", "u2"],
  ["نِعْمَتِ {الطَّالِبَاتُ} شَوَّالُ وَمَرْوَةُ وَنِهَالُ.", ["الطَّالِبَاتُ", "الطَّالِبَةُ", "الطَّالِبَتَانِ"], "cem-i müennes fâil", "Ne iyi öğrenciler!", "u2"],
  ["{حَبَّذَا} العَدْلُ.", ["حَبَّذَا", "نِعْمَ", "بِئْسَ"], "fâilsiz övgü", "Adalet ne hoş!", "u3"],
  ["{لَا حَبَّذَا} الظُّلْمُ.", ["لَا حَبَّذَا", "بِئْسَ", "نِعْمَ"], "fâilsiz yergi", "Zulüm hiç hoş değil!", "u3"],
  ["حَبَّذَا {الطَّالِبَاتُ}.", ["الطَّالِبَاتُ", "الطَّالِبَاتِ", "الطَّالِبَاتَ"], "mahsûs merfû", "Kız öğrenciler ne hoş!", "u3"],
  ["{حَبَّذَا} الطَّالِبَتَانِ.", ["حَبَّذَا", "حَبَّتَا", "حَبَّذَانِ"], "hiç değişmez", "İki kız öğrenci ne hoş!", "u3"],
  ["{بِئْسَتِ} الصِّفَةُ الكَسَلُ.", ["بِئْسَتِ", "لَا حَبَّذَا", "حَبَّذَا"], "fâil var, yergi", "Tembellik ne kötü sıfat!", "u3"],
  ["نِعْمَ المُدَرِّبُ {أَحْمَدُ}.", ["أَحْمَدُ", "أَحْمَدَ", "أَحْمَدٍ"], "gayr-i munsarif, merfû", "Ahmed ne iyi antrenör!", "u4"],
  ["بِئْسَتِ العَادَةُ {التَّدْخِينُ}.", ["التَّدْخِينُ", "التَّدْخِينَ", "التَّدْخِينِ"], "mahsûs merfû", "Sigara ne kötü alışkanlık!", "u4"],
  ["لَا حَبَّذَا {الكَسَلُ}.", ["الكَسَلُ", "الكَسَلَ", "الكَسَلِ"], "mahsûs merfû", "Tembellik hiç hoş değil!", "u4"],
  ["نِعْمَ {الجَزَاءُ} الجَنَّةُ.", ["الجَزَاءُ", "جَزَاءٌ", "الجَزَاءَ"], "fâil ال’lı", "Cennet ne güzel karşılık!", "u4"],
  ["بِئْسَ {الخُلُقُ} الغَدْرُ.", ["الخُلُقُ", "خُلُقٌ", "الخُلُقَ"], "fâil nekre olmaz", "Hıyanet ne kötü huy!", "u4"],
  ["حَسْبُنَا اللهُ وَنِعْمَ {الوَكِيلُ}.", ["الوَكِيلُ", "الوَكِيلَ", "وَكِيلٌ"], "fâil merfû", "Allah bize yeter, O ne güzel vekil!", "u5"],
  ["وَمَأْوَاهُمْ جَهَنَّمُ وَبِئْسَ {المَصِيرُ}.", ["المَصِيرُ", "المَصِيرَ", "المَصِيرِ"], "fâil merfû", "Ne kötü varış yeri!", "u5"],
  ["وَلَنِعْمَ {دَارُ} المُتَّقِينَ.", ["دَارُ", "دَارَ", "دَارِ"], "fâil muzâf, merfû", "Takvâ sahiplerinin yurdu ne güzel!", "u5"],
  ["{نِعْمَ} الخُلُقُ الصِّدْقُ.", ["نِعْمَ", "بِئْسَ", "لَا حَبَّذَا"], "övgü", "Doğruluk ne güzel huy!", "u5"],
  ["بِئْسَ {الاسْمُ} الفُسُوقُ بَعْدَ الإِيمَانِ.", ["الاسْمُ", "الاسْمَ", "اسْمٌ"], "fâil ال’lı, merfû", "İmandan sonra fâsıklık ne kötü isim!", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["الجَنَّةُ ثَوَابٌ حَسَنٌ ← نِعْمَ (fâil: الثَّوَابُ)", "نِعْمَ الثَّوَابُ الجَنَّةُ", "نِعْمَ الثَّوَابَ الجَنَّةَ", "نِعْمَ ثَوَابٌ الجَنَّةُ", "Fâil ال’lı merfû, mahsûs merfû.", "u1"],
  ["جَهَنَّمُ عِقَابٌ سَيِّئٌ ← بِئْسَ (fâil: العِقَابُ)", "بِئْسَ العِقَابُ جَهَنَّمُ", "بِئْسَ العِقَابَ جَهَنَّمَ", "بِئْسَ عِقَابٌ جَهَنَّمُ", "Fâil nekre olmaz.", "u1"],
  ["الكَذِبُ خُلُقٌ قَبِيحٌ ← yergi", "بِئْسَ الخُلُقُ الكَذِبُ", "نِعْمَ الخُلُقُ الكَذِبُ", "بِئْسَ الخُلُقَ الكَذِبَ", "Yergi: بِئْسَ.", "u1"],
  ["نِعْمَ القَائِدُ خَالِدٌ ← mahsûs: خَالِدٌ وَصَلَاحُ الدِّينِ", "نِعْمَ القَائِدَانِ خَالِدٌ وَصَلَاحُ الدِّينِ", "نِعْمَ القَائِدُ خَالِدٌ وَصَلَاحُ الدِّينِ", "نِعْمَ القَادَةُ خَالِدٌ وَصَلَاحُ الدِّينِ", "İki kişi: ikil fâil.", "u2"],
  ["نِعْمَ المُعَلِّمُ أَحْمَدُ ← mahsûs: نَجْلَاءُ", "نِعْمَتِ المُعَلِّمَةُ نَجْلَاءُ", "نِعْمَ المُعَلِّمُ نَجْلَاءُ", "نِعْمَتِ المُعَلِّمُ نَجْلَاءُ", "Fâil müennes olur; tâ câiz.", "u2"],
  ["نِعْمَتِ الطَّالِبَةُ زَيْنَبُ ← mahsûs: زَيْنَبُ وَفَاطِمَةُ وَأَمِينَةُ", "نِعْمَتِ الطَّالِبَاتُ زَيْنَبُ وَفَاطِمَةُ وَأَمِينَةُ", "نِعْمَتِ الطَّالِبَةُ زَيْنَبُ وَفَاطِمَةُ وَأَمِينَةُ", "نِعْمَتِ الطَّالِبَتَانِ زَيْنَبُ وَفَاطِمَةُ وَأَمِينَةُ", "Üç kız: cem-i müennes.", "u2"],
  ["بِئْسَ المُهْمِلُ سَمِيرٌ ← mahsûs: سَمِيرٌ وَكَرِيمٌ", "بِئْسَ المُهْمِلَانِ سَمِيرٌ وَكَرِيمٌ", "بِئْسَ المُهْمِلُ سَمِيرٌ وَكَرِيمٌ", "بِئْسَ المُهْمِلُونَ سَمِيرٌ وَكَرِيمٌ", "İki kişi: ikil.", "u2"],
  ["العَدْلُ مَحْبُوبٌ ← حَبَّذَا", "حَبَّذَا العَدْلُ", "حَبَّذَا العَدْلَ", "حَبَّ العَدْلُ", "Mahsûs merfû.", "u3"],
  ["الظُّلْمُ مَكْرُوهٌ ← لَا حَبَّذَا", "لَا حَبَّذَا الظُّلْمُ", "لَا حَبَّذَا الظُّلْمَ", "لَا حَبَّذِهِ الظُّلْمُ", "Hiç değişmez.", "u3"],
  ["حَبَّذَا الطَّالِبُ ← mahsûs: الطَّالِبَاتُ", "حَبَّذَا الطَّالِبَاتُ", "حَبَّتَا الطَّالِبَاتُ", "حَبَّذِهِ الطَّالِبَاتُ", "حَبَّذَا her isimle aynı.", "u3"],
  ["نِعْمَ الإِدَامُ … ← mahsûs: الزَّيْت", "نِعْمَ الإِدَامُ الزَّيْتُ", "نِعْمَ الإِدَامُ الزَّيْتَ", "نِعْمَ الإِدَامُ الزَّيْتِ", "Mahsûs merfû.", "u4"],
  ["… الكَسْبُ مِنْ عَمَلِ اليَدِ ← نِعْمَ + fâil (رِزْق)", "نِعْمَ الرِّزْقُ الكَسْبُ مِنْ عَمَلِ اليَدِ", "نِعْمَ رِزْقٌ الكَسْبُ مِنْ عَمَلِ اليَدِ", "نِعْمَ الرِّزْقَ الكَسْبُ مِنْ عَمَلِ اليَدِ", "Fâil ال’lı, merfû.", "u4"],
  ["اللهُ مَوْلَاكُمْ ← övgü", "نِعْمَ المَوْلَى اللهُ", "بِئْسَ المَوْلَى اللهُ", "نِعْمَ المَوْلَى اللهَ", "Medih, mahsûs merfû.", "u5"],
  ["جَهَنَّمُ مَصِيرٌ سَيِّئٌ ← yergi", "بِئْسَ المَصِيرُ جَهَنَّمُ", "بِئْسَتِ المَصِيرُ جَهَنَّمُ", "بِئْسَ المَصِيرَ جَهَنَّمُ", "Fâil müzekker: tâ yok.", "u5"]
];
// Hangi fiil hız oyunu
var NOUN_LIST = UNITS[2].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = FIL;
// Medih mi zemm mi hız oyunu
var MM_OPTS = MZ;
var MM_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  md: { name: "Fiil ↔ görev", pairs: [["نِعْمَ", "fâilli övgü"], ["بِئْسَ", "fâilli yergi"], ["حَبَّذَا", "fâilsiz övgü"], ["لَا حَبَّذَا", "fâilsiz yergi"], ["نِعْمَتِ", "müennes fâille"], ["ذَا", "حَبَّ’nin fâili"], ["المَخْصُوصُ", "övülen / yerilen, merfû"], ["جَامِدٌ", "muzârisi ve emri yok"]] },
  uy: { name: "Mahsûs ↔ fâil", pairs: [["خَالِدٌ وَصَلَاحُ الدِّينِ", "القَائِدَانِ"], ["أَبُو جَهْلٍ وَأَبُو لَهَبٍ وَأُمَيَّةُ", "المُشْرِكُونَ"], ["زَوْجَةُ أَبِي لَهَبٍ", "المَرْأَةُ"], ["ابْنُ سِينَا", "العَالِمُ"], ["شَوَّالُ وَمَرْوَةُ وَنِهَالُ", "الطَّالِبَاتُ"], ["نَجْلَاءُ وَفَاطِمَةُ", "المُعَلِّمَتَانِ"], ["أَبُو بَكْرٍ الصِّدِّيقُ", "الخَلِيفَةُ"], ["سَمِيحٌ وَإِبْرَاهِيمُ وَعَلِيٌّ", "اللَّاعِبُونَ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["حَسْبُنَا اللهُ وَنِعْمَ الوَكِيلُ", "Allah bize yeter, O ne güzel vekil"], ["نِعْمَ المَوْلَى وَنِعْمَ النَّصِيرُ", "ne güzel mevlâ, ne güzel yardımcı"], ["وَبِئْسَ المَصِيرُ", "ne kötü varış yeri"], ["وَبِئْسَ المِهَادُ", "ne kötü döşek"], ["وَنِعْمَ أَجْرُ العَامِلِينَ", "çalışanların ecri ne güzel"], ["وَلَنِعْمَ دَارُ المُتَّقِينَ", "takvâ ehlinin yurdu ne güzel"], ["بِئْسَ الاسْمُ الفُسُوقُ", "fâsıklık ne kötü isim"], ["حَبَّذَا العَدْلُ", "adalet ne hoş"]] }
};
var KARTLAR = [
  ["Medih fiilleri?", "نِعْمَ ve حَبَّذَا: نِعْمَ الثَّوَابُ الجَنَّةُ · حَبَّذَا العَدْلُ"],
  ["Zemm fiilleri?", "بِئْسَ ve لَا حَبَّذَا: بِئْسَ العِقَابُ جَهَنَّمُ · لَا حَبَّذَا الظُّلْمُ"],
  ["Bu fiiller mutasarrıf mı?", "Hayır, câmid mâzî: muzârileri ve emirleri yok."],
  ["نِعْمَ cümlesinin öğeleri?", "Fiil + fâil (merfû) + mahsûs (merfû): نِعْمَ الكِتَابُ القُرْآنُ"],
  ["Mahsûs nedir?", "Övülen ya da yerilen asıl kişi/şey; daima merfû."],
  ["Fâil mahsûsa uyar mı?", "Evet: نِعْمَ القَائِدَانِ خَالِدٌ وَصَلَاحُ الدِّينِ"],
  ["نِعْمَتْ ne zaman?", "Fâil müennes ism-i zâhir ise câiz: نِعْمَتِ المُعَلِّمَةُ نَجْلَاءُ"],
  ["حَبَّذَا’nın yapısı?", "حَبَّ (fiil) + ذَا (fâil); ardından mahsûs."],
  ["حَبَّذَا değişir mi?", "Hayır: حَبَّذَا الطَّالِبُ / الطَّالِبَانِ / الطَّالِبَاتُ"],
  ["Fâil nekre olur mu?", "Hayır; ال’lı ya da ال’lıya muzâf: نِعْمَ أَجْرُ العَامِلِينَ"],
  ["Mahsûs hazfedilir mi?", "Anlaşılınca: حَسْبُنَا اللهُ وَنِعْمَ الوَكِيلُ"],
  ["لَنِعْمَ’deki lâm?", "Tekit lâmı: وَلَنِعْمَ دَارُ المُتَّقِينَ"]
];
