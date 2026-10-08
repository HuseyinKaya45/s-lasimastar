// ================= VERİ: Mukârabe, Recâ ve Şurû’ Fiilleri (أَفْعَالُ المُقَارَبَةِ وَالرَّجَاءِ وَالشُّرُوعِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "الفِعْلُ", tr: "Fiil (kâde ve kardeşleri)" }, nasb: { ar: "الاسْمُ", tr: "İsmi (merfû)" }, cerr: { ar: "الخَبَرُ", tr: "Haberi (muzâri cümle)" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var GRP = [["m", "Mukârabe (yakınlık)", "أَفْعَالُ المُقَارَبَةِ", "cerr"], ["r", "Recâ (umut)", "أَفْعَالُ الرَّجَاءِ", "mi"], ["s", "Şurû’ (başlama)", "أَفْعَالُ الشُّرُوعِ", "ref"]];
var AN = [["g", "Haberde أَنْ çoğunlukla var", "تَدْخُلُ «أَنْ» غَالِبًا", "nasb"], ["n", "Haberde أَنْ nadiren", "تَدْخُلُ «أَنْ» نَادِرًا", "cerr"], ["y", "Haberde أَنْ asla yok", "لَا تَدْخُلُ «أَنْ»", "mi"]];
var TN = [["t", "Tam fiil", "فِعْلٌ تَامٌّ", "x"], ["m", "Mukârabe", "مِنْ أَفْعَالِ المُقَارَبَةِ", "cerr"], ["r", "Recâ", "مِنْ أَفْعَالِ الرَّجَاءِ", "mi"], ["s", "Şurû’", "مِنْ أَفْعَالِ الشُّرُوعِ", "ref"]];
var RD = [["m", "Mukârabe", "مُقَارَبَةٌ", "cerr"], ["r", "Recâ", "رَجَاءٌ", "mi"], ["s", "Şurû’", "شُرُوعٌ", "ref"], ["x", "Başka (haber ya da tam fiil)", "غَيْرُ ذَلِكَ", "x"]];
var TUR_TR = { m: "Mukârabe", r: "Recâ", s: "Şurû’", t: "Tam fiil", g: "أَنْ çoğunlukla", n: "أَنْ nadiren", y: "أَنْ asla", x: "Başka" };
// Makine: fiiller [müzekker, müennes, grup, haberde أَنْ (1/0)] · isimler [isim, müennes?, haber merfû, haber mansûb, Türkçe]
var KV = [["كَادَ", "كَادَتِ", "m", 0], ["أَوْشَكَ", "أَوْشَكَتِ", "m", 1], ["عَسَى", "عَسَتِ", "r", 1], ["شَرَعَ", "شَرَعَتِ", "s", 0], ["أَخَذَ", "أَخَذَتِ", "s", 0], ["جَعَلَ", "جَعَلَتِ", "s", 0], ["بَدَأَ", "بَدَأَتِ", "s", 0], ["طَفِقَ", "طَفِقَتِ", "s", 0]];
var KS = [["الطَّالِبُ", 0, "يَكْتُبُ", "يَكْتُبَ", "Öğrenci"], ["الطَّالِبَةُ", 1, "تَكْتُبُ", "تَكْتُبَ", "Kız öğrenci"], ["الطَّالِبَانِ", 0, "يَكْتُبَانِ", "يَكْتُبَا", "İki öğrenci"],
  ["الطَّالِبَتَانِ", 1, "تَكْتُبَانِ", "تَكْتُبَا", "İki kız öğrenci"], ["الطُّلَّابُ", 0, "يَكْتُبُونَ", "يَكْتُبُوا", "Öğrenciler"], ["الطَّالِبَاتُ", 1, "يَكْتُبْنَ", "يَكْتُبْنَ", "Kız öğrenciler"]];

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
// Fiil + tür: [[fiil ×3], kalan, tür, Türkçe, açıklama]
var TY = { m: ["أَفْعَالُ المُقَارَبَةِ", "أَفْعَالُ الرَّجَاءِ", "أَفْعَالُ الشُّرُوعِ"], r: ["أَفْعَالُ الرَّجَاءِ", "أَفْعَالُ المُقَارَبَةِ", "أَفْعَالُ الشُّرُوعِ"], s: ["أَفْعَالُ الشُّرُوعِ", "أَفْعَالُ المُقَارَبَةِ", "أَفْعَالُ الرَّجَاءِ"] };
function FT(x, i) { return CBP([x[0], x[1] + " ← نَوْعُهُ:", TY[x[2]]], i, x[3], x[4]); }

var UNITS = [
// ---------------------------------------------------------------- 1 · GENEL
{
  id: "u1", no: 1, ar: "أَفْعَالٌ تَعْمَلُ عَمَلَ «كَانَ»", tr: "Kâne Gibi Amel Eden Fiiller", short: "Genel", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Bu fiillerin كَانَ gibi amel ettiğini bilmek", "Haberlerinin muzâri ile başlayan fiil cümlesi olduğunu bilmek", "Fiili, ismini ve haberini âyet ve hadislerde bulmak"],
  examples: [
    { s: "كَادَ:mz / أَحْمَدُ:nasb / يَفُوزُ فِي المُسَابَقَةِ.:cerr", tr: "Ahmed neredeyse yarışmayı kazanıyordu. (mukârabe)" },
    { s: "عَسَى:mz / الوَلَدُ:nasb / أَنْ يَمْشِيَ.:cerr", tr: "Umulur ki çocuk yürür. (recâ)", pair: "شَرَعَ:mz / الطَّالِبُ:nasb / يَقْرَأُ القُرْآنَ.:cerr", pairTr: "Öğrenci Kur’an okumaya başladı. (şurû’)" }
  ],
  rules: [
    { tr: "<b>Mukârabe, recâ ve şurû’ fiilleri</b> (<span class=\"ar\">كَادَ وَأَخَوَاتُهَا</span>) <b>كَانَ gibi amel eder</b>: isimlerini merfû yapar, haberleri mahallen mansûbdur:", ex: ["كَادَ أَحْمَدُ يَفُوزُ فِي المُسَابَقَةِ"] },
    { tr: "Haberleri <b>muzâri ile başlayan fiil cümlesidir</b>; muzâri, zamiriyle isme uyar: <span class=\"ar\">كَادَتِ الطِّفْلَةُ تَسْقُطُ · بَدَأَتِ الطَّالِبَاتُ يَدْخُلْنَ</span>." },
    { tr: "Üç grup: <b>mukârabe</b> (haber yakında olacak: <span class=\"ar\">كَادَ، أَوْشَكَ</span>), <b>recâ</b> (haberin olması umulur: <span class=\"ar\">عَسَى، حَرَى، اخْلَوْلَقَ</span>), <b>şurû’</b> (habere başlandı: <span class=\"ar\">شَرَعَ، أَخَذَ، جَعَلَ، بَدَأَ، طَفِقَ، هَبَّ، أَنْشَأَ</span>)." },
    { tr: "İsim, fiile bitişik zamir de olabilir: <span class=\"ar\">وَمَا كَادُوا يَفْعَلُونَ</span> (ismi vâv), <span class=\"ar\">وَطَفِقَا يَخْصِفَانِ</span> (ismi elif)." }
  ],
  kaide: ["أَفْعَالُ المُقَارَبَةِ وَالشُّرُوعِ وَالرَّجَاءِ مِنَ الأَفْعَالِ الَّتِي تَعْمَلُ عَمَلَ «كَانَ»، وَيَكُونُ خَبَرُهَا جُمْلَةً فِعْلِيَّةً فِعْلُهَا مُضَارِعٌ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "١", ar: "عَيِّنِ الأَفْعَالَ الَّتِي تَعْمَلُ عَمَلَ «كَانَ» فِي الآيَاتِ التَّالِيَةِ وَالحَدِيثَيْنِ الشَّرِيفَيْنِ", tr: "Fiili, ismini ve haberini etiketle; kalanlar Başka.", items: [
      T("عَسَى:mz / رَبُّكُمْ:nasb / أَنْ يَرْحَمَكُمْ:cerr", "Umulur ki Rabbiniz size merhamet eder. (İsrâ 8)", "Recâ; haberde أَنْ."),
      T("يَكَادُ:mz / زَيْتُهَا:nasb / يُضِيءُ:cerr / وَلَوْ لَمْ تَمْسَسْهُ نَارٌ:x", "Ona ateş dokunmasa bile yağı neredeyse ışık verecek. (Nûr 35)", "Mukârabe; أَنْ yok."),
      T("قَالُوا الآنَ جِئْتَ بِالحَقِّ فَذَبَحُوهَا وَمَا:x / كَادُوا:mz / يَفْعَلُونَ:cerr", "“İşte şimdi gerçeği getirdin” dediler ve onu kestiler; az kalsın bunu yapmayacaklardı. (Bakara 71)", "İsmi كَادُوا’daki vâv zamiri."),
      T("عَسَى:mz / اللهُ:nasb / أَنْ يَتُوبَ عَلَيْهِمْ:cerr", "Umulur ki Allah tövbelerini kabul eder. (Tevbe 102)", "Recâ."),
      T("وَطَفِقَا:mz / يَخْصِفَانِ عَلَيْهِمَا مِنْ وَرَقِ الجَنَّةِ:cerr", "Üzerlerini cennet yapraklarıyla örtmeye başladılar. (A’râf 22)", "Şurû’; ismi elif zamiri."),
      T("يَكَادُ:mz / البَرْقُ:nasb / يَخْطَفُ أَبْصَارَهُمْ:cerr", "Şimşek neredeyse gözlerini kapıverecek. (Bakara 20)", "Mukârabe."),
      T("أَحْبِبْ حَبِيبَكَ هَوْنًا مَا:x / عَسَى:mz / أَنْ يَكُونَ بَغِيضَكَ يَوْمًا مَا:x / وَأَبْغِضْ بَغِيضَكَ هَوْنًا مَا:x / عَسَى:mz / أَنْ يَكُونَ حَبِيبَكَ يَوْمًا مَا:x", "Sevdiğini ölçülü sev; olur ki bir gün sevmediğin olur. Sevmediğine ölçülü buğz et; olur ki bir gün sevdiğin olur. (Hadis)", "Burada عَسَى ardından doğrudan أَنْ + fiil geldiği için tamdır: «أَنْ يَكُونَ…» onun fâilidir; ismi ve haberi yoktur."),
      T("كَالرَّاعِي يَرْعَى حَوْلَ الحِمَى:x / يُوشِكُ:mz / أَنْ يَقَعَ فِيهِ:cerr", "Korunan alanın çevresinde hayvan otlatan çoban gibi ki neredeyse içine düşecek. (Hadis)", "Mukârabe; ismi gizli zamir (هُوَ = الرَّاعِي).")
    ]},
    { type: "pick", num: "٢", ar: "عَيِّنْ خَبَرَ كُلِّ فِعْلٍ مِنَ الأَفْعَالِ الَّتِي تَعْمَلُ عَمَلَ «كَانَ» فِي التَّمْرِينِ السَّابِقِ", tr: "Fiilin haberini seç.", exHtml: "<span class=\"ar\">عَسَى رَبُّكُمْ أَنْ يَرْحَمَكُمْ ← الخَبَرُ: أَنْ يَرْحَمَكُمْ</span>", items: PL([
      ["عَسَى رَبُّكُمْ أَنْ يَرْحَمَكُمْ", "أَنْ يَرْحَمَكُمْ", "رَبُّكُمْ", "عَسَى", "Umulur ki Rabbiniz size merhamet eder.", "رَبُّكُمْ ismidir."],
      ["يَكَادُ زَيْتُهَا يُضِيءُ", "يُضِيءُ", "زَيْتُهَا", "نَارٌ", "Yağı neredeyse ışık verecek.", "Muzâri cümle: haber."],
      ["وَمَا كَادُوا يَفْعَلُونَ", "يَفْعَلُونَ", "وَاوُ الجَمَاعَةِ فِي «كَادُوا»", "مَا", "Az kalsın yapmayacaklardı.", "Vâv ismidir."],
      ["عَسَى اللهُ أَنْ يَتُوبَ عَلَيْهِمْ", "أَنْ يَتُوبَ عَلَيْهِمْ", "اللهُ", "عَلَيْهِمْ", "Umulur ki Allah tövbelerini kabul eder.", "أَنْ + muzâri."],
      ["وَطَفِقَا يَخْصِفَانِ عَلَيْهِمَا مِنْ وَرَقِ الجَنَّةِ", "يَخْصِفَانِ عَلَيْهِمَا مِنْ وَرَقِ الجَنَّةِ", "أَلِفُ الاثْنَيْنِ فِي «طَفِقَا»", "وَرَقِ الجَنَّةِ", "Üzerlerini yapraklarla örtmeye başladılar.", "Elif ismidir."],
      ["يَكَادُ البَرْقُ يَخْطَفُ أَبْصَارَهُمْ", "يَخْطَفُ أَبْصَارَهُمْ", "البَرْقُ", "أَبْصَارَهُمْ", "Şimşek neredeyse gözlerini kapacak.", "البَرْقُ ismidir."],
      ["عَسَى أَنْ يَكُونَ بَغِيضَكَ يَوْمًا مَا", "لَا خَبَرَ لَهَا: «عَسَى» تَامَّةٌ وَ«أَنْ يَكُونَ» فَاعِلُهَا", "أَنْ يَكُونَ بَغِيضَكَ", "بَغِيضَكَ", "Olur ki bir gün sevmediğin olur.", "Doğrudan أَنْ + fiil: عَسَى tam. بَغِيضَكَ يَكُونَ’nin haberidir."],
      ["يُوشِكُ أَنْ يَقَعَ فِيهِ", "أَنْ يَقَعَ فِيهِ", "الحِمَى", "الرَّاعِي", "Neredeyse içine düşecek.", "İsmi gizli zamir; haber أَنْ يَقَعَ."]
    ])},
    { type: "classify", extra: true, opts: GRP, ar: "مِنْ أَيِّ مَجْمُوعَةٍ هَذَا الفِعْلُ؟", tr: "Fiil mukârabe mi, recâ mı, şurû’ mu?", items: CL([
      ["كَادَ", "m", "Yakınlık."], ["أَوْشَكَ", "m", "Yakınlık."], ["يَكَادُ", "m", "كَادَ’in muzârisi."], ["يُوشِكُ", "m", "أَوْشَكَ’in muzârisi."],
      ["عَسَى", "r", "Umut."], ["حَرَى", "r", "Umut."], ["اخْلَوْلَقَ", "r", "Umut."],
      ["شَرَعَ", "s", "Başlama."], ["أَخَذَ", "s", "Başlama (muzâri haberle)."], ["جَعَلَ", "s", "Başlama (muzâri haberle)."], ["بَدَأَ", "s", "Başlama."], ["طَفِقَ", "s", "Başlama."], ["هَبَّ", "s", "Başlama."], ["أَنْشَأَ", "s", "Başlama: أَنْشَأَتِ السَّمَاءُ تُمْطِرُ."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · MUKÂRABE
{
  id: "u2", no: 2, ar: "أَفْعَالُ المُقَارَبَةِ", tr: "Mukârabe Fiilleri: كَادَ، أَوْشَكَ", short: "Mukârabe", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["كَادَ ve أَوْشَكَ’in haberin yakın olduğunu bildirdiğini bilmek", "كَادَ’de أَنْ’in nadir, أَوْشَكَ’te çoğunlukla geldiğini bilmek", "Cümleyi bu fiillerle yeniden kurmak"],
  examples: [
    { s: "كَادَتِ:mz / الطِّفْلَةُ:nasb / تَسْقُطُ مِنَ الجِدَارِ.:cerr", tr: "Kız çocuğu neredeyse duvardan düşecekti. (müennes: كَادَتْ)" },
    { s: "أَوْشَكَ:mz / الطَّالِبُ:nasb / أَنْ يَخْرُجَ مِنَ الصَّفِّ.:cerr", tr: "Öğrenci sınıftan çıkmak üzere." }
  ],
  rules: [
    { tr: "<b>Mukârabe fiilleri</b> haberin olmasının yakın olduğunu bildirir: <span class=\"ar\">كَادَ / يَكَادُ، أَوْشَكَ / يُوشِكُ</span>." },
    { tr: "<span class=\"ar\">كَادَ</span>’in haberine <span class=\"ar\">أَنْ</span> <b>nadiren</b> girer; <span class=\"ar\">أَوْشَكَ</span>’in haberine <b>çoğunlukla</b> girer:", ex: ["كَادَ الوَلَدُ يَسْقُطُ", "أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ مِنَ الصَّفِّ"] },
    { tr: "<span class=\"ar\">أَنْ</span> gelince muzâri mansûb olur: <span class=\"ar\">أَنْ يَخْرُجَ</span>; beş fiilde nûn düşer: <span class=\"ar\">أَنْ يَنْتَهُوا</span>." },
    { tr: "İsim müennesse fiile tâ gelir: <span class=\"ar\">كَادَتِ الطِّفْلَةُ تَسْقُطُ · تُوشِكُ المُسْلِمَاتُ أَنْ يَخْرُجْنَ</span>." }
  ],
  kaide: ["أَفْعَالُ المُقَارَبَةِ تَدُلُّ عَلَى قُرْبِ وُقُوعِ الخَبَرِ، مِنْهَا: كَادَ، أَوْشَكَ. وَتَدْخُلُ «أَنْ» عَلَى خَبَرِ «كَادَ» نَادِرًا، وَعَلَى خَبَرِ «أَوْشَكَ» غَالِبًا، مِثْلُ: كَادَ الوَلَدُ يَسْقُطُ، أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ مِنَ الصَّفِّ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ فِعْلٍ مِنْ أَفْعَالِ المُقَارَبَةِ", tr: "Boşluğa uyan mukârabe fiilini seç (أَنْ kuralına ve cinsiyete dikkat).", exHtml: "<span class=\"ar\">يَكَادُ المُدَرِّسُونَ يَدْخُلُونَ الكُلِّيَّةَ.</span>", items: PL([
      ["___ الامْتِحَانُ يَبْدَأُ.", "كَادَ", "كَادَتِ", "عَسَى", "Sınav neredeyse başlıyordu.", "أَنْ yok: كَادَ; isim müzekker."],
      ["___ الجَيْشُ أَنْ يَنْتَصِرَ.", "أَوْشَكَ", "أَوْشَكَتِ", "شَرَعَ", "Ordu zafer kazanmak üzere.", "أَنْ var: أَوْشَكَ; şurû’ fiiline أَنْ girmez."],
      ["___ الوَزِيرُ يُغَادِرُ قَاعَةَ المُؤْتَمَرِ.", "كَادَ", "كَادَتِ", "أَوْشَكَتِ", "Bakan neredeyse konferans salonundan ayrılıyordu.", "Müzekker isim, أَنْ’siz haber."],
      ["___ المَنْزِلُ يَتِمُّ بِنَاؤُهُ.", "كَادَ", "كَادَتِ", "عَسَى", "Evin yapımı neredeyse bitiyordu.", "أَنْ’siz haber: كَادَ."],
      ["___ حَسَنٌ أَنْ يَفُوزَ بِالجَائِزَةِ.", "أَوْشَكَ", "أَوْشَكَتْ", "بَدَأَ", "Hasan ödülü kazanmak üzere.", "أَنْ’li haber: أَوْشَكَ."]
    ])},
    { type: "classify", extra: true, opts: AN, ar: "هَلْ تَدْخُلُ «أَنْ» عَلَى خَبَرِ هَذَا الفِعْلِ؟", tr: "Koyu fiilin haberine أَنْ çoğunlukla mı, nadiren mi girer, yoksa hiç girmez mi?", items: CL([
      [HL("أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ", "أَوْشَكَ"), "g", "Çoğunlukla أَنْ."],
      [HL("عَسَى الضَّيْفُ أَنْ يَحْضُرَ", "عَسَى"), "g", "Çoğunlukla أَنْ."],
      [HL("كَادَ الوَلَدُ يَسْقُطُ", "كَادَ"), "n", "Nadiren أَنْ."],
      [HL("شَرَعَ الطَّالِبُ يَقْرَأُ", "شَرَعَ"), "y", "Şurû’: asla."],
      [HL("أَخَذَ المُسَافِرُونَ يَنْزِلُونَ", "أَخَذَ"), "y", "Şurû’."],
      [HL("جَعَلَ الطُّلَّابُ يُفَكِّرُونَ", "جَعَلَ"), "y", "Şurû’."],
      [HL("بَدَأَتِ الطَّالِبَاتُ يَدْخُلْنَ", "بَدَأَتِ"), "y", "Şurû’."],
      [HL("وَطَفِقَا يَخْصِفَانِ", "وَطَفِقَا"), "y", "Şurû’."],
      [HL("يُوشِكُ أَنْ يَقَعَ فِيهِ", "يُوشِكُ"), "g", "Çoğunlukla أَنْ."],
      [HL("يَكَادُ البَرْقُ يَخْطَفُ", "يَكَادُ"), "n", "Nadiren."]
    ]) },
    { type: "pick", num: "١٠", ar: "أَعِدِ الجُمَلَ التَّالِيَةَ مُبْتَدِئًا بِمَا بَيْنَ القَوْسَيْنِ", tr: "Cümleyi parantezdeki fiille yeniden kur: doğru biçimi seç.", exHtml: "<span class=\"ar\">صَحِيحُ مُسْلِمٍ يُقَارِبُ صَحِيحَ البُخَارِيِّ (كَادَ) ← كَادَ صَحِيحُ مُسْلِمٍ يُقَارِبُ صَحِيحَ البُخَارِيِّ فِي القَبُولِ وَالرُّتْبَةِ.</span>", items: PL([
      ["يَفُوزُ أَصْدِقَاؤُنَا فِي المُسَابَقَةِ. ← (كَادَ)", "كَادَ أَصْدِقَاؤُنَا يَفُوزُونَ فِي المُسَابَقَةِ.", "كَادَ أَصْدِقَاؤُنَا يَفُوزُ فِي المُسَابَقَةِ.", "كَادَ أَصْدِقَاءَنَا يَفُوزُونَ فِي المُسَابَقَةِ.", "Arkadaşlarımız neredeyse yarışmayı kazanıyordu.", "Haber isimden sonra: يَفُوزُونَ; isim merfû."],
      ["يَنْتَهِي العُمَّالُ مِنْ بِنَاءِ المَسْجِدِ. ← (يُوشِكُ)", "يُوشِكُ العُمَّالُ أَنْ يَنْتَهُوا مِنْ بِنَاءِ المَسْجِدِ.", "يُوشِكُ العُمَّالُ أَنْ يَنْتَهُونَ مِنْ بِنَاءِ المَسْجِدِ.", "يُوشِكُ العُمَّالَ أَنْ يَنْتَهُوا مِنْ بِنَاءِ المَسْجِدِ.", "İşçiler mescidin yapımını bitirmek üzere.", "أَنْ + beş fiil: nûn düşer."],
      ["يَكْتُبُ الأُسْتَاذُ كِتَابًا جَدِيدًا. ← (جَعَلَ)", "جَعَلَ الأُسْتَاذُ يَكْتُبُ كِتَابًا جَدِيدًا.", "جَعَلَ الأُسْتَاذُ أَنْ يَكْتُبَ كِتَابًا جَدِيدًا.", "جَعَلَ الأُسْتَاذَ يَكْتُبُ كِتَابًا جَدِيدًا.", "Hoca yeni bir kitap yazmaya başladı.", "Şurû’: أَنْ girmez."],
      ["اللهُ يَرْحَمُنَا. ← (عَسَى)", "عَسَى اللهُ أَنْ يَرْحَمَنَا.", "عَسَى اللهُ أَنْ يَرْحَمُنَا.", "عَسَى اللهَ أَنْ يَرْحَمَنَا.", "Umulur ki Allah bize merhamet eder.", "أَنْ: muzâri mansûb."],
      ["يَتَخَرَّجُ الطُّلَّابُ مِنْ كُلِّيَّةِ الإِلَهِيَّاتِ. ← (يُوشِكُ)", "يُوشِكُ الطُّلَّابُ أَنْ يَتَخَرَّجُوا مِنْ كُلِّيَّةِ الإِلَهِيَّاتِ.", "يُوشِكُ الطُّلَّابُ أَنْ يَتَخَرَّجُونَ مِنْ كُلِّيَّةِ الإِلَهِيَّاتِ.", "يُوشِكُ الطُّلَّابَ أَنْ يَتَخَرَّجُوا مِنْ كُلِّيَّةِ الإِلَهِيَّاتِ.", "Öğrenciler İlahiyat Fakültesinden mezun olmak üzere.", "Nûn düşer."],
      ["يُصْبِحُ الطَّالِبُ مُدَرِّسًا. ← (عَسَى)", "عَسَى الطَّالِبُ أَنْ يُصْبِحَ مُدَرِّسًا.", "عَسَى الطَّالِبُ أَنْ يُصْبِحُ مُدَرِّسًا.", "عَسَى الطَّالِبُ أَنْ يُصْبِحَ مُدَرِّسٌ.", "Umulur ki öğrenci öğretmen olur.", "يُصْبِحُ’in haberi مُدَرِّسًا mansûb kalır."],
      ["يَسْقُطُ الطِّفْلُ مِنَ الشُّرْفَةِ. ← (يَكَادُ)", "يَكَادُ الطِّفْلُ يَسْقُطُ مِنَ الشُّرْفَةِ.", "يَكَادُ الطِّفْلَ يَسْقُطُ مِنَ الشُّرْفَةِ.", "يَكَادُ الطِّفْلُ سَقَطَ مِنَ الشُّرْفَةِ.", "Çocuk neredeyse balkondan düşecek.", "Haber muzâri olmalı."],
      ["كَانَتْ أَسْئِلَةُ الِاخْتِبَارِ سَهْلَةً. ← (عَسَى)", "عَسَى أَسْئِلَةُ الِاخْتِبَارِ أَنْ تَكُونَ سَهْلَةً.", "عَسَى أَسْئِلَةُ الِاخْتِبَارِ أَنْ تَكُونَ سَهْلَةٌ.", "عَسَى أَسْئِلَةَ الِاخْتِبَارِ أَنْ تَكُونَ سَهْلَةً.", "Umulur ki sınav soruları kolay olur.", "كَانَتْ → أَنْ تَكُونَ; haberi mansûb kalır."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · RECÂ
{
  id: "u3", no: 3, ar: "أَفْعَالُ الرَّجَاءِ", tr: "Recâ Fiili: عَسَى", short: "Recâ", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["عَسَى’nın haberin olmasının umulduğunu bildirdiğini bilmek", "Haberine أَنْ’in çoğunlukla girdiğini bilmek", "عَسَى’nın tam kullanımını (أَنْ + fiil fâil) tanımak"],
  examples: [
    { s: "عَسَى:mz / الضَّيْفُ:nasb / أَنْ يَحْضُرَ بَعْدَ قَلِيلٍ.:cerr", tr: "Umulur ki misafir birazdan gelir." },
    { s: "عَسَى:mz / أَنْ يَحْضُرَ الأُسْتَاذُ.:x", tr: "Umulur ki hoca gelir. (tam: أَنْ يَحْضُرَ fâildir)" }
  ],
  rules: [
    { tr: "<b>Recâ fiilleri</b> haberin olmasının umulduğunu bildirir: <span class=\"ar\">عَسَى</span> (ayrıca <span class=\"ar\">حَرَى، اخْلَوْلَقَ</span>). Haberine <span class=\"ar\">أَنْ</span> <b>çoğunlukla</b> girer:", ex: ["عَسَى الضَّيْفُ أَنْ يَحْضُرَ بَعْدَ قَلِيلٍ"] },
    { tr: "<b>Tam kullanım</b>: <span class=\"ar\">عَسَى</span> (ve <span class=\"ar\">أَوْشَكَ</span>) ardından araya bir şey girmeden doğrudan <span class=\"ar\">أَنْ + fiil</span> gelirse, bu masdar-ı müevvel onun <b>fâili</b> olur; ismi ve haberi yoktur: <span class=\"ar\">عَسَى أَنْ يَحْضُرَ الأُسْتَاذُ</span>." },
    { tr: "<span class=\"ar\">عَسَى</span> câmid bir fiildir: muzârisi ve emri yoktur. Müennes isimle <span class=\"ar\">عَسَتْ</span> de denebilir." },
    { tr: "Hadiste: <span class=\"ar\">عَسَى أَنْ يَكُونَ بَغِيضَكَ يَوْمًا مَا</span>. Burada <span class=\"ar\">عَسَى</span> tamdır, <span class=\"ar\">أَنْ يَكُونَ</span> onun fâilidir." }
  ],
  kaide: ["أَفْعَالُ الرَّجَاءِ تَدُلُّ عَلَى رَجَاءِ وُقُوعِ الخَبَرِ، وَمِنْهَا: عَسَى، وَتَدْخُلُ «أَنْ» عَلَى خَبَرِهَا غَالِبًا، مِثْلُ: عَسَى الضَّيْفُ أَنْ يَحْضُرَ بَعْدَ قَلِيلٍ. وَتَأْتِي هَذِهِ الأَفْعَالُ تَامَّةً حَيْثُ تَكْتَفِي بِفَاعِلِهَا وَهُوَ المَصْدَرُ المُؤَوَّلُ (أَنْ وَالفِعْلُ)، بِشَرْطِ أَلَّا يَفْصِلَ بَيْنَهَا وَبَيْنَ المَصْدَرِ فَاصِلٌ، مِثْلُ: عَسَى أَنْ يَحْضُرَ الأُسْتَاذُ."],
  ex: [
    { type: "pick", fill: true, num: "٤", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ فِعْلٍ لِلرَّجَاءِ", tr: "Boşluğa recâ fiilini doğru biçimiyle koy.", exHtml: "<span class=\"ar\">عَسَى اللهُ أَنْ يَنْفَعَنَا بِهَذَا الكِتَابِ.</span>", items: PL([
      ["___ الامْتِحَانُ أَنْ يَكُونَ سَهْلًا.", "عَسَى", "عَسَتِ", "شَرَعَ", "Umulur ki sınav kolay olur.", "Müzekker isim: عَسَى."],
      ["___ الجَيْشُ أَنْ يَنْتَصِرَ.", "عَسَى", "عَسَتِ", "أَخَذَ", "Umulur ki ordu zafer kazanır.", "Şurû’ fiiline أَنْ girmez."],
      ["___ اللهُ أَنْ يَغْفِرَ لَكُمْ.", "عَسَى", "بَدَأَ", "كَادَتْ", "Umulur ki Allah sizi bağışlar.", "Recâ."],
      ["___ اللهُ أَنْ يُوَفِّقَنَا فِي الدُّنْيَا وَالآخِرَةِ.", "عَسَى", "جَعَلَ", "عَسَتِ", "Umulur ki Allah bizi dünyada ve ahirette başarılı kılar.", "Recâ; isim müzekker."],
      ["___ حَسَنٌ أَنْ يَفُوزَ بِالجَائِزَةِ.", "عَسَى", "عَسَتْ", "طَفِقَ", "Umulur ki Hasan ödülü kazanır.", "Recâ."]
    ])},
    { type: "pick", extra: true, ar: "عَسَى التَّامَّةُ وَالنَّاقِصَةُ", tr: "Tam ve nâkıs عَسَى: doğru seçeneği bul.", items: PL([
      ["عَسَى الضَّيْفُ أَنْ يَحْضُرَ. ← tam yap", "عَسَى أَنْ يَحْضُرَ الضَّيْفُ.", "عَسَى أَنْ يَحْضُرُ الضَّيْفُ.", "عَسَى الضَّيْفَ أَنْ يَحْضُرَ.", "Umulur ki misafir gelir.", "أَنْ + fiil doğrudan gelir; الضَّيْفُ يَحْضُرَ’nin fâili olur."],
      ["عَسَى أَنْ يَحْضُرَ الأُسْتَاذُ. ← «أَنْ يَحْضُرَ» nedir?", "فَاعِلُ «عَسَى» (مَصْدَرٌ مُؤَوَّلٌ)", "خَبَرُ «عَسَى»", "اسْمُ «عَسَى»", "Umulur ki hoca gelir.", "Tam: masdar-ı müevvel fâildir."],
      ["عَسَى الأُسْتَاذُ أَنْ يَحْضُرَ. ← «أَنْ يَحْضُرَ» nedir?", "خَبَرُ «عَسَى»", "فَاعِلُ «عَسَى»", "اسْمُ «عَسَى»", "Umulur ki hoca gelir.", "Araya isim girdi: nâkıs; الأُسْتَاذُ ismi."],
      ["عَسَى أَنْ يَعْتَدِلَ الهَوَاءُ. ← «عَسَى» nasıl?", "تَامَّةٌ", "نَاقِصَةٌ تَعْمَلُ عَمَلَ «كَانَ»", "حَرْفٌ", "Umulur ki hava düzelir.", "Doğrudan أَنْ + fiil."],
      ["عَسَى المُسَافِرُ أَنْ يَصِلَ إِلَى المَطَارِ. ← tam yap", "عَسَى أَنْ يَصِلَ المُسَافِرُ إِلَى المَطَارِ.", "عَسَى أَنْ يَصِلُ المُسَافِرُ إِلَى المَطَارِ.", "عَسَى أَنْ يَصِلَ المُسَافِرَ إِلَى المَطَارِ.", "Umulur ki yolcu havaalanına varır.", "Fâil merfû."],
      ["أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ. ← tam yap", "أَوْشَكَ أَنْ يَخْرُجَ الطَّالِبُ.", "أَوْشَكَ أَنْ يَخْرُجُ الطَّالِبُ.", "أَوْشَكَ الطَّالِبَ أَنْ يَخْرُجَ.", "Öğrenci çıkmak üzere.", "أَوْشَكَ da tam kullanılabilir."]
    ])},
    { type: "combo", num: "٩", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ فِعْلٍ مُنَاسِبٍ مِنَ الأَفْعَالِ الَّتِي تَعْمَلُ عَمَلَ «كَانَ» وَبَيِّنْ نَوْعَهُ", tr: "Boşluğa uyan fiili ve grubunu seç.", exHtml: "<span class=\"ar\">أَخَذَ الحُجَّاجُ يَرْجِعُونَ إِلَى بِلَادِهِمْ ← مِنْ أَفْعَالِ الشُّرُوعِ</span>", items: [
      [["أَوْشَكَتِ", "شَرَعَتِ", "أَخَذَ"], "الأَزْمَةُ أَنْ تَنْتَهِيَ.", "m", "Kriz bitmek üzere.", "أَنْ’li haber, müennes isim: أَوْشَكَتْ."],
      [["عَسَى", "بَدَأَ", "جَعَلَ"], "الطُّلَّابُ أَنْ يُحِبُّوا اللُّغَةَ العَرَبِيَّةَ.", "r", "Umulur ki öğrenciler Arapçayı sever.", "Şurû’ fiillerine أَنْ girmez."],
      [["أَخَذَتِ", "عَسَى", "أَوْشَكَ"], "الطِّفْلَةُ تَجْرِي فِي الحَدِيقَةِ.", "s", "Kız çocuk bahçede koşmaya başladı.", "أَنْ’siz haber, müennes: أَخَذَتْ."],
      [["شَرَعَ", "عَسَى", "أَوْشَكَتْ"], "الإِمَامُ يَتْلُو آخِرَ سُورَةِ الحَشْرِ بَعْدَ الصَّلَاةِ.", "s", "İmam namazdan sonra Haşr sûresinin sonunu okumaya başladı.", "Şurû’."],
      [["أَوْشَكَ", "بَدَأَ", "جَعَلَتْ"], "البَرْنَامَجُ أَنْ يَنْتَهِيَ بَعْدَ قَلِيلٍ.", "m", "Program birazdan bitmek üzere.", "Mukârabe."],
      [["عَسَى", "طَفِقَ", "أَخَذَ"], "المُذْنِبُونَ أَنْ يَتُوبُوا.", "r", "Umulur ki günahkârlar tövbe eder.", "Recâ."],
      [["عَسَى", "شَرَعَ", "جَعَلَ"], "العُمَّالُ أَنْ يَفْرَحُوا بِهَذَا الخَبَرِ.", "r", "Umulur ki işçiler bu habere sevinir.", "Recâ."],
      [["كَادَ", "عَسَى", "أَوْشَكَتْ"], "الوَلَدُ يَبْكِي.", "m", "Çocuk neredeyse ağlayacaktı.", "أَنْ’siz, müzekker: كَادَ."]
    ].map(FT) }
  ]
},
// ---------------------------------------------------------------- 4 · ŞURÛ’
{
  id: "u4", no: 4, ar: "أَفْعَالُ الشُّرُوعِ", tr: "Şurû’ Fiilleri ve Tam Kullanım", short: "Şurû’", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Şurû’ fiillerini tanımak: بَدَأَ، شَرَعَ، أَخَذَ، جَعَلَ، طَفِقَ، هَبَّ، أَنْشَأَ", "Haberlerine أَنْ’in hiç girmediğini bilmek", "Bu fiillerin tam kullanımını ayırmak"],
  examples: [
    { s: "أَخَذَ:mz / المُسَافِرُونَ:nasb / يَنْزِلُونَ مِنَ الطَّائِرَةِ.:cerr", tr: "Yolcular uçaktan inmeye başladı." },
    { s: "بَدَأَتِ:mz / الطَّالِبَاتُ:nasb / يَدْخُلْنَ قَاعَةَ الِامْتِحَانِ.:cerr", tr: "Kız öğrenciler sınav salonuna girmeye başladı.", pair: "أَخَذَ:x / الطَّالِبُ الكِتَابَ.:-", pairTr: "Öğrenci kitabı aldı. (tam fiil)" }
  ],
  rules: [
    { tr: "<b>Şurû’ fiilleri</b> habere başlandığını bildirir: <span class=\"ar\">بَدَأَ، شَرَعَ، أَخَذَ، جَعَلَ، هَبَّ، طَفِقَ، أَنْشَأَ</span>. Haberlerine <span class=\"ar\">أَنْ</span> <b>asla</b> girmez:", ex: ["شَرَعَ الطَّالِبُ يَقْرَأُ القُرْآنَ"] },
    { tr: "Ardından muzâri gelmezse bu fiiller <b>tam fiil</b>dir, kendi anlamlarıyla kullanılır: <span class=\"ar\">أَخَذَ الطَّالِبُ الكِتَابَ · بَدَأَ مُصْطَفَى قِرَاءَةَ الكِتَابِ</span>." },
    { tr: "<span class=\"ar\">بَدَأَ الطُّلَّابُ أَنْ يَعْمَلُوا الوَاجِبَ</span> cümlesinde <span class=\"ar\">أَنْ</span> geldiği için <span class=\"ar\">بَدَأَ</span> şurû’ fiili gibi değil, tam fiil gibi kullanılmıştır (<span class=\"ar\">أَنْ يَعْمَلُوا</span> = mef’ûl). Doğrusu: <span class=\"ar\">بَدَأَ الطُّلَّابُ يَعْمَلُونَ</span>." }
  ],
  kaide: ["أَفْعَالُ الشُّرُوعِ تَدُلُّ عَلَى الشُّرُوعِ وَالبَدْءِ فِي الخَبَرِ، وَهِيَ كَثِيرَةٌ، مِنْهَا: بَدَأَ، شَرَعَ، أَخَذَ، جَعَلَ، هَبَّ، طَفِقَ، وَلَا تَدْخُلُ «أَنْ» عَلَى خَبَرِهَا، مِثْلُ: شَرَعَ الطَّالِبُ يَقْرَأُ القُرْآنَ.", "تَأْتِي بَعْضُ هَذِهِ الأَفْعَالِ تَامَّةً فَلَا يَأْتِي بَعْدَهَا فِعْلٌ مُضَارِعٌ، مِثْلُ: أَخَذَ الطَّالِبُ الكِتَابَ."],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ فِعْلٍ مِنْ أَفْعَالِ الشُّرُوعِ", tr: "Boşluğa şurû’ fiilini doğru biçimiyle koy.", exHtml: "<span class=\"ar\">بَدَأَ المُدَرِّسُونَ يَدْخُلُونَ الكُلِّيَّةَ.</span>", items: PL([
      ["___ المُهَنْدِسُ يُصْلِحُ السَّيَّارَةَ.", "شَرَعَ", "شَرَعَتِ", "عَسَى", "Mühendis arabayı tamir etmeye başladı.", "Müzekker isim; عَسَى’nın haberinde çoğunlukla أَنْ olur."],
      ["___ حُسَيْنٌ يَبْنِي بَيْتَهُ.", "بَدَأَ", "بَدَأَتْ", "عَسَى", "Hüseyin evini yapmaya başladı.", "Şurû’."],
      ["___ أَحْمَدُ يَكْتُبُ قِصَّةً جَدِيدَةً.", "أَخَذَ", "أَخَذَتْ", "عَسَى", "Ahmed yeni bir hikâye yazmaya başladı.", "Şurû’."],
      ["___ البَنَاتُ يَمْشِينَ فِي الشَّارِعِ.", "جَعَلَتِ", "جَعَلْنَ", "عَسَتِ", "Kızlar sokakta yürümeye başladı.", "Fiil isimden önce tekil kalır: جَعَلَتْ."],
      ["___ الطَّالِبَاتُ يَزُرْنَ المَكْتَبَةَ.", "بَدَأَتِ", "بَدَأْنَ", "عَسَتِ", "Kız öğrenciler kütüphaneyi ziyaret etmeye başladı.", "Fiil tekil, müennes."]
    ])},
    { type: "pick", fill: true, num: "٦", ar: "امْلَإِ الفَرَاغَ بِفِعْلٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ: (كَادَ – بَدَأَ – أَوْشَكَ – جَعَلَ – عَسَى)", tr: "Metindeki boşluklara uyan fiili seç (her fiil bir kez).", items: PL([
      ["___ العَامُ الدِّرَاسِيُّ أَنْ يَنْتَهِيَ،", "أَوْشَكَ", "كَادَ", "جَعَلَ", "Öğretim yılı bitmek üzere,", "أَنْ’li haber ve “yakında” anlamı: أَوْشَكَ."],
      ["وَ___ التَّلَامِيذُ يُوَدِّعُونَ أَسَاتِذَتَهُمْ وَأُسْتَاذَاتِهِمْ.", "بَدَأَ", "أَوْشَكَ", "عَسَى", "öğrenciler hocalarıyla vedalaşmaya başladı.", "Şurû’ (جَعَلَ de olurdu; o aşağıda kullanılıyor)."],
      ["___ التَّعَبُ يَزُولُ، غَدًا تُغْلَقُ الدَّفَاتِرُ وَالكُتُبُ.", "كَادَ", "عَسَى", "كَادَتْ", "Yorgunluk neredeyse geçti; yarın defterler ve kitaplar kapanacak.", "أَنْ’siz haber, müzekker isim: كَادَ."],
      ["___ أَيَّامُ الصَّيْفِ أَنْ تَمْضِيَ بِرَاحَةٍ وَهُدُوءٍ.", "عَسَى", "جَعَلَ", "بَدَأَ", "Umulur ki yaz günleri rahat ve sakin geçer.", "Umut: عَسَى."],
      ["___ الطُّلَّابُ يُفَكِّرُونَ فِي أَيَّامِ العُطْلَةِ، كَيْفَ يَقْضُونَهَا.", "جَعَلَ", "عَسَى", "أَوْشَكَتْ", "Öğrenciler tatil günlerini nasıl geçireceklerini düşünmeye başladı.", "Şurû’."]
    ])},
    { type: "classify", num: "١١", opts: TN, ar: "عَيِّنِ الفِعْلَ التَّامَّ وَالفِعْلَ الَّذِي يَعْمَلُ عَمَلَ «كَانَ»", tr: "Koyu fiil tam mı, yoksa kâne gibi mi (hangi grup)?", exHtml: "<span class=\"ar\">بَدَأَ مُصْطَفَى قِرَاءَةَ الكِتَابِ: فِعْلٌ تَامٌّ · بَدَأَ مُصْطَفَى يَقْرَأُ الكِتَابَ: مِنْ أَفْعَالِ الشُّرُوعِ</span>", items: CL([
      [HL("أَنْشَأَتِ السَّمَاءُ تُمْطِرُ", "أَنْشَأَتِ"), "s", "Ardından muzâri: şurû’."],
      [HL("عَسَى الضِّيقُ أَنْ يَنْفَرِجَ", "عَسَى"), "r", "Arada isim var: nâkıs, recâ."],
      [HL("كَادَتِ الشَّمْسُ تَطْلُعُ", "كَادَتِ"), "m", "Mukârabe."],
      [HL("عَسَى أَنْ يَعْتَدِلَ الهَوَاءُ", "عَسَى"), "t", "Doğrudan أَنْ + fiil: tam."],
      [HL("أَخَذَ العُمَّالُ يَتَنَافَسُونَ فِي العَمَلِ", "أَخَذَ"), "s", "Şurû’."],
      [HL("بَدَأَ الطُّلَّابُ أَنْ يَعْمَلُوا الوَاجِبَ", "بَدَأَ"), "t", "أَنْ’li: şurû’ fiili olamaz; tam (أَنْ يَعْمَلُوا mef’ûl)."],
      [HL("يَكَادُ وَقُودُ السَّيَّارَةِ يَنْفَدُ", "يَكَادُ"), "m", "Mukârabe."],
      [HL("أَخَذْتُ الكِتَابَ مِنَ الأُسْتَاذِ ثُمَّ قَرَأْتُهُ", "أَخَذْتُ"), "t", "Muzâri haber yok: tam."],
      [HL("بَدَأَ مُصْطَفَى قِرَاءَةَ الكِتَابِ", "بَدَأَ"), "t", "Masdar mef’ûl: tam."],
      [HL("بَدَأَ مُصْطَفَى يَقْرَأُ الكِتَابَ", "بَدَأَ"), "s", "Şurû’."],
      [HL("شَرَعَ الطَّالِبُ يَقْرَأُ القُرْآنَ", "شَرَعَ"), "s", "Şurû’."],
      [HL("أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ", "أَوْشَكَ"), "m", "Mukârabe."],
      [HL("عَسَى رَبُّكُمْ أَنْ يَرْحَمَكُمْ", "عَسَى"), "r", "Recâ."],
      [HL("جَعَلَ اللهُ الأَرْضَ مِهَادًا", "جَعَلَ"), "t", "Muzâri yok: tam (iki mef’ûllü)."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · CÜMLE KURMA VE OKUMA
{
  id: "u5", no: 5, ar: "تَكْوِينُ الجُمَلِ وَالقِرَاءَةُ", tr: "Cümle Kurma ve Okuma", short: "Uygulama", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["İsim ya da fiil değişince uyumu ve أَنْ kuralını uygulamak", "Bu fiillere uygun haber koymak", "“Ebû Bekir es-Sıddîk” metninde bu fiilleri bulmak"],
  examples: [
    { s: "كَادَتِ:mz / الفِتْنَةُ:nasb / تَنْتَشِرُ.:cerr", tr: "Fitne neredeyse yayılacaktı." },
    { s: "وَأَخَذَ:mz / يُرْسِلُ إِلَيْهِمُ الرُّسُلَ.:cerr", tr: "Onlara elçiler göndermeye başladı. (ismi gizli zamir)" }
  ],
  rules: [
    { tr: "İsim değişince fiil cinsiyette, haber şahıs ve sayıda uyar: <span class=\"ar\">أَخَذَتِ المُسْلِمَاتُ يَخْرُجْنَ ← شَرَعَ الطُّلَّابُ يَخْرُجُونَ</span>." },
    { tr: "Fiil değişince <span class=\"ar\">أَنْ</span> kuralı da değişir: <span class=\"ar\">تُوشِكُ المُسْلِمَاتُ أَنْ يَخْرُجْنَ ← كَادَتِ المُسْلِمَاتُ يَخْرُجْنَ</span>." },
    { tr: "Haber yalnız muzâri ile başlar: <span class=\"ar\">يَكَادُ المُسَافِرُونَ يَصِلُونَ</span> (<span class=\"ar\">وَصَلُوا</span> değil)." }
  ],
  kaide: ["اسْتَخْرِجْ مِنَ النَّصِّ أَفْعَالَ المُقَارَبَةِ وَالرَّجَاءِ وَالشُّرُوعِ."],
  ex: [
    { type: "pick", num: "٧", ar: "اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِالكَلِمَاتِ المُنَاسِبَةِ", tr: "Önceki cümleye parantezdekini uygula: doğru yeni cümleyi seç.", exHtml: "<span class=\"ar\">يُوشِكُ المُسْلِمُونَ أَنْ يَخْرُجُوا مِنَ المَسْجِدِ. (تُوشِكُ) ← تُوشِكُ المُسْلِمَاتُ أَنْ يَخْرُجْنَ مِنَ المَسْجِدِ. (كَادَ)</span>", items: PL([
      ["تُوشِكُ المُسْلِمَاتُ أَنْ يَخْرُجْنَ مِنَ المَسْجِدِ. ← (كَادَ)", "كَادَتِ المُسْلِمَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ.", "كَادَتِ المُسْلِمَاتُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "تَكَادُ المُسْلِمَاتُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "Müslüman kadınlar neredeyse mescitten çıkıyordu.", "كَادَ: أَنْ düşer; müennes isim: كَادَتْ."],
      ["كَادَتِ المُسْلِمَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ. ← (أَخَذَ)", "أَخَذَتِ المُسْلِمَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ.", "أَخَذَتِ المُسْلِمَاتُ أَنْ يَخْرُجْنَ مِنَ المَسْجِدِ.", "أَخَذَتِ المُسْلِمَاتُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "Müslüman kadınlar mescitten çıkmaya başladı.", "Şurû’: أَنْ yok."],
      ["أَخَذَتِ المُسْلِمَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ. ← (شَرَعَ)", "شَرَعَتِ المُسْلِمَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ.", "شَرَعَتِ المُسْلِمَاتُ أَنْ يَخْرُجْنَ مِنَ المَسْجِدِ.", "شَرَعَتِ المُسْلِمَاتُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "Müslüman kadınlar mescitten çıkmaya başladı.", "Şurû’."],
      ["شَرَعَتِ المُسْلِمَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ. ← (الطُّلَّابُ)", "شَرَعَ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "شَرَعَ الطُّلَّابُ يَخْرُجْنَ مِنَ المَسْجِدِ.", "شَرَعَ الطُّلَّابُ أَنْ يَخْرُجُوا مِنَ المَسْجِدِ.", "Öğrenciler mescitten çıkmaya başladı.", "Haber müzekker çoğula uyar."],
      ["شَرَعَ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ. ← (جَعَلَ)", "جَعَلَ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "جَعَلَ الطُّلَّابُ أَنْ يَخْرُجُوا مِنَ المَسْجِدِ.", "جَعَلَ الطُّلَّابُ يَخْرُجُوا مِنَ المَسْجِدِ.", "Öğrenciler mescitten çıkmaya başladı.", "Şurû’; muzâri merfû."],
      ["جَعَلَ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ. ← (تَكَادُ)", "تَكَادُ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "تَكَادُ الطُّلَّابُ يَخْرُجْنَ مِنَ المَسْجِدِ.", "تَكَادُ الطُّلَّابُ يَخْرُجُوا مِنَ المَسْجِدِ.", "Öğrenciler neredeyse mescitten çıkıyor.", "Cem-i teksîrle fiil müennes olabilir; haber müzekker çoğul kalır. (يَكَادُ daha yaygın.)"],
      ["تَكَادُ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ. ← (بَدَأَ)", "بَدَأَ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "بَدَأَ الطُّلَّابُ أَنْ يَخْرُجُوا مِنَ المَسْجِدِ.", "بَدَأَ الطُّلَّابُ يَخْرُجَانِ مِنَ المَسْجِدِ.", "Öğrenciler mescitten çıkmaya başladı.", "Şurû’."],
      ["بَدَأَ الطُّلَّابُ يَخْرُجُونَ مِنَ المَسْجِدِ. ← (الطَّالِبَاتُ)", "بَدَأَتِ الطَّالِبَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ.", "بَدَأَتِ الطَّالِبَاتُ يَخْرُجُونَ مِنَ المَسْجِدِ.", "بَدَأَتِ الطَّالِبَاتُ تَخْرُجُ مِنَ المَسْجِدِ.", "Kız öğrenciler mescitten çıkmaya başladı.", "Fiil müennes, haber يَخْرُجْنَ."],
      ["بَدَأَتِ الطَّالِبَاتُ يَخْرُجْنَ مِنَ المَسْجِدِ. ← (عَسَى)", "عَسَى الطَّالِبَاتُ أَنْ يَخْرُجْنَ مِنَ المَسْجِدِ.", "عَسَى الطَّالِبَاتُ أَنْ يَخْرُجُوا مِنَ المَسْجِدِ.", "عَسَى الطَّالِبَاتِ أَنْ يَخْرُجْنَ مِنَ المَسْجِدِ.", "Umulur ki kız öğrenciler mescitten çıkar.", "Recâ: أَنْ gelir; يَخْرُجْنَ’de nûn-ı nisve kalır."]
    ])},
    { type: "pick", fill: true, num: "٨", ar: "أَكْمِلْ بِوَضْعِ خَبَرٍ مُنَاسِبٍ لِلأَفْعَالِ التَّالِيَةِ", tr: "Fiile uyan haberi seç.", exHtml: "<span class=\"ar\">كَادَ الفَتَى يَفُوزُ فِي مُسَابَقَةِ القِرَاءَةِ.</span>", items: PL([
      ["يُوشِكُ المَسْجِدُ ___", "أَنْ يَمْتَلِئَ بِالمُصَلِّينَ.", "أَنْ تَمْتَلِئَ بِالمُصَلِّينَ.", "امْتَلَأَ بِالمُصَلِّينَ.", "Mescit namaz kılanlarla dolmak üzere.", "أَوْشَكَ: أَنْ + müzekker muzâri."],
      ["جَعَلَ الطُّلَّابُ ___", "يَكْتُبُونَ الوَاجِبَ.", "أَنْ يَكْتُبُوا الوَاجِبَ.", "يَكْتُبُ الوَاجِبَ.", "Öğrenciler ödevi yazmaya başladı.", "Şurû’: أَنْ yok; çoğul haber."],
      ["يَكَادُ المُسَافِرُونَ ___", "يَصِلُونَ إِلَى المَطَارِ.", "يَصِلُ إِلَى المَطَارِ.", "وَصَلُوا إِلَى المَطَارِ.", "Yolcular neredeyse havaalanına varıyor.", "Haber muzâri, çoğul."],
      ["بَدَأَ الرُّكَّابُ ___", "يَنْزِلُونَ مِنَ الحَافِلَةِ.", "أَنْ يَنْزِلُوا مِنَ الحَافِلَةِ.", "نَزَلُوا مِنَ الحَافِلَةِ.", "Yolcular otobüsten inmeye başladı.", "Şurû’."],
      ["عَسَى عُمَرُ ___ سُورَةَ المُلْكِ.", "أَنْ يَحْفَظَ", "أَنْ يَحْفَظُ", "حَفِظَ", "Umulur ki Ömer Mülk sûresini ezberler.", "أَنْ: mansûb."],
      ["تُوشِكُ الطَّبِيبَاتُ ___", "أَنْ يَنْتَهِينَ مِنْ عَمَلِهِنَّ.", "أَنْ يَنْتَهُوا مِنْ عَمَلِهِنَّ.", "انْتَهَيْنَ مِنْ عَمَلِهِنَّ.", "Kadın doktorlar işlerini bitirmek üzere.", "Müennes çoğul: يَنْتَهِينَ."],
      ["عَسَى اللهُ ___", "أَنْ يَرْحَمَنَا.", "أَنْ يَرْحَمُنَا.", "رَحِمَنَا.", "Umulur ki Allah bize merhamet eder.", "أَنْ + mansûb."],
      ["شَرَعَتِ المُدَرِّسَةُ ___", "تَشْرَحُ الدَّرْسَ.", "أَنْ تَشْرَحَ الدَّرْسَ.", "يَشْرَحُ الدَّرْسَ.", "Öğretmen hanım dersi anlatmaya başladı.", "Müennes haber, أَنْ yok."]
    ])},
    { type: "reading", num: "١٢", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ أَفْعَالَ المُقَارَبَةِ وَالرَّجَاءِ وَالشُّرُوعِ", tr: "Metni oku, soruları cevapla; sonra koyu fiili sınıflandır.", title: "أَبُو بَكْرٍ الصِّدِّيقُ رَضِيَ اللهُ عَنْهُ",
      text: "كَادَتِ الفِتْنَةُ تَنْتَشِرُ بَعْدَ وَفَاةِ الرَّسُولِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَأَوْشَكَ المُرْتَدُّونَ أَنْ يَتَكَاثَرُوا، فَبَدَأَ أَبُو بَكْرٍ رَضِيَ اللهُ عَنْهُ يَدْعُوهُمْ إِلَى الإِسْلَامِ ثَانِيَةً، وَأَخَذَ يُرْسِلُ إِلَيْهِمُ الرُّسُلَ، عَسَى أَنْ يَرْجِعُوا إِلَى اللهِ وَيَتُوبُوا. فَلَمَّا لَمْ يَسْتَجِيبُوا لِدَعْوَتِهِ، وَلَمْ يُفَضِّلُوا طَرِيقَ الخَيْرِ عَلَى الشَّرِّ، شَرَعَ يُؤَدِّبُهُمْ بِجُنُودِ الإِسْلَامِ، وَجَعَلَ يَدْعُو اللهَ أَنْ يَهْدِيَهُمْ إِلَى الصَّوَابِ، حَتَّى نَصَرَهُ اللهُ عَلَيْهِمْ وَقَضَى عَلَى تِلْكَ الفِتْنَةِ تَمَامًا، وَكَتَبَ اللهُ لِلدَّعْوَةِ الإِسْلَامِيَّةِ البَقَاءَ عَلَى وَجْهِ الأَرْضِ وَالِانْتِشَارَ إِلَى يَوْمِ القِيَامَةِ.",
      textTr: "Resûlullah’ın vefatından sonra fitne neredeyse yayılacaktı; dinden dönenler çoğalmak üzereydi. Ebû Bekir onları yeniden İslam’a çağırmaya başladı, Allah’a dönüp tövbe ederler umuduyla onlara elçiler göndermeye koyuldu. Davetine uymayıp hayır yolunu şerre tercih etmeyince onları İslam ordularıyla yola getirmeye girişti ve Allah’ın onlara doğru yolu göstermesi için dua etmeye başladı. Sonunda Allah onu onlara karşı galip getirdi, o fitneyi tamamen ortadan kaldırdı ve İslam davetine yeryüzünde kalıcılığı ve kıyamete kadar yayılmayı yazdı.",
      qa: [
        { q: "مَتَى كَادَتِ الفِتْنَةُ تَنْتَشِرُ؟", a: "بَعْدَ وَفَاةِ الرَّسُولِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ.", tr: "Fitne ne zaman yayılmak üzereydi? Resûlullah’ın vefatından sonra." },
        { q: "مَاذَا فَعَلَ أَبُو بَكْرٍ أَوَّلًا؟", a: "بَدَأَ يَدْعُوهُمْ إِلَى الإِسْلَامِ ثَانِيَةً، وَأَخَذَ يُرْسِلُ إِلَيْهِمُ الرُّسُلَ.", tr: "Ebû Bekir önce ne yaptı? Onları yeniden İslam’a çağırdı ve elçiler gönderdi." },
        { q: "لِمَاذَا أَرْسَلَ إِلَيْهِمُ الرُّسُلَ؟", a: "عَسَى أَنْ يَرْجِعُوا إِلَى اللهِ وَيَتُوبُوا.", tr: "Niçin elçiler gönderdi? Allah’a dönüp tövbe ederler umuduyla." },
        { q: "مَاذَا فَعَلَ لَمَّا لَمْ يَسْتَجِيبُوا؟", a: "شَرَعَ يُؤَدِّبُهُمْ بِجُنُودِ الإِسْلَامِ.", tr: "Uymayınca ne yaptı? Onları İslam ordularıyla yola getirmeye girişti." },
        { q: "كَيْفَ انْتَهَتِ الفِتْنَةُ؟", a: "نَصَرَهُ اللهُ عَلَيْهِمْ وَقَضَى عَلَيْهَا تَمَامًا.", tr: "Fitne nasıl sona erdi? Allah onu galip getirdi ve fitneyi tamamen bitirdi." }
      ],
      cls: { opts: RD, ar: "اسْتَخْرِجْ مِنَ النَّصِّ", tr: "Koyu fiil mukârabe mi, recâ mı, şurû’ mu, başka mı?", items: [
        { s: HL("كَادَتِ الفِتْنَةُ تَنْتَشِرُ", "كَادَتِ"), a: "m", why: "Mukârabe: ismi الفِتْنَةُ, haberi تَنْتَشِرُ." },
        { s: HL("وَأَوْشَكَ المُرْتَدُّونَ أَنْ يَتَكَاثَرُوا", "وَأَوْشَكَ"), a: "m", why: "Mukârabe; haberde أَنْ." },
        { s: HL("فَبَدَأَ أَبُو بَكْرٍ يَدْعُوهُمْ", "فَبَدَأَ"), a: "s", why: "Şurû’." },
        { s: HL("وَأَخَذَ يُرْسِلُ إِلَيْهِمُ الرُّسُلَ", "وَأَخَذَ"), a: "s", why: "Şurû’; ismi gizli zamir." },
        { s: HL("عَسَى أَنْ يَرْجِعُوا إِلَى اللهِ", "عَسَى"), a: "r", why: "Recâ fiili; burada tam (أَنْ يَرْجِعُوا fâil)." },
        { s: HL("شَرَعَ يُؤَدِّبُهُمْ بِجُنُودِ الإِسْلَامِ", "شَرَعَ"), a: "s", why: "Şurû’." },
        { s: HL("وَجَعَلَ يَدْعُو اللهَ", "وَجَعَلَ"), a: "s", why: "Şurû’." },
        { s: HL("كَادَتِ الفِتْنَةُ تَنْتَشِرُ", "تَنْتَشِرُ"), a: "x", why: "Haberin fiili." },
        { s: HL("فَبَدَأَ أَبُو بَكْرٍ يَدْعُوهُمْ", "يَدْعُوهُمْ"), a: "x", why: "Haber." },
        { s: HL("حَتَّى نَصَرَهُ اللهُ عَلَيْهِمْ", "نَصَرَهُ"), a: "x", why: "Tam fiil." },
        { s: HL("وَقَضَى عَلَى تِلْكَ الفِتْنَةِ", "وَقَضَى"), a: "x", why: "Tam fiil." },
        { s: HL("وَكَتَبَ اللهُ لِلدَّعْوَةِ الإِسْلَامِيَّةِ البَقَاءَ", "وَكَتَبَ"), a: "x", why: "Tam fiil." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["عَسَى رَبُّكُمْ أَنْ {يَرْحَمَكُمْ}.", ["يَرْحَمَكُمْ", "يَرْحَمُكُمْ", "رَحِمَكُمْ"], "أَنْ + mansûb", "Umulur ki Rabbiniz size merhamet eder.", "u1"],
  ["يَكَادُ زَيْتُهَا {يُضِيءُ}.", ["يُضِيءُ", "أَضَاءَ", "يُضِيءَ"], "haber: merfû muzâri", "Yağı neredeyse ışık verecek.", "u1"],
  ["يَكَادُ {البَرْقُ} يَخْطَفُ أَبْصَارَهُمْ.", ["البَرْقُ", "البَرْقَ", "البَرْقِ"], "ismi merfû", "Şimşek neredeyse gözlerini kapacak.", "u1"],
  ["وَطَفِقَا {يَخْصِفَانِ} عَلَيْهِمَا.", ["يَخْصِفَانِ", "يَخْصِفُ", "أَنْ يَخْصِفَا"], "şurû’: أَنْ yok", "Üzerlerini örtmeye başladılar.", "u1"],
  ["عَسَى {اللهُ} أَنْ يَتُوبَ عَلَيْهِمْ.", ["اللهُ", "اللهَ", "اللهِ"], "ismi merfû", "Umulur ki Allah tövbelerini kabul eder.", "u1"],
  ["كَادَ أَحْمَدُ {يَفُوزُ} فِي المُسَابَقَةِ.", ["يَفُوزُ", "فَازَ", "يَفُوزَ"], "كَادَ: أَنْ’siz merfû", "Ahmed neredeyse kazanıyordu.", "u2"],
  ["{كَادَتِ} الطِّفْلَةُ تَسْقُطُ مِنَ الجِدَارِ.", ["كَادَتِ", "كَادَ", "كَادُوا"], "müennes isim", "Kız neredeyse duvardan düşecekti.", "u2"],
  ["أَوْشَكَ الطَّالِبُ {أَنْ يَخْرُجَ} مِنَ الصَّفِّ.", ["أَنْ يَخْرُجَ", "أَنْ يَخْرُجُ", "خَرَجَ"], "أَوْشَكَ: أَنْ + mansûb", "Öğrenci sınıftan çıkmak üzere.", "u2"],
  ["يُوشِكُ العُمَّالُ أَنْ {يَنْتَهُوا} مِنَ البِنَاءِ.", ["يَنْتَهُوا", "يَنْتَهُونَ", "يَنْتَهِي"], "أَنْ: nûn düşer", "İşçiler inşaatı bitirmek üzere.", "u2"],
  ["كَادَ {أَصْدِقَاؤُنَا} يَفُوزُونَ.", ["أَصْدِقَاؤُنَا", "أَصْدِقَاءَنَا", "أَصْدِقَائِنَا"], "ismi merfû", "Arkadaşlarımız neredeyse kazanıyordu.", "u2"],
  ["يَكَادُ وَقُودُ السَّيَّارَةِ {يَنْفَدُ}.", ["يَنْفَدُ", "نَفِدَ", "يَنْفَدَ"], "haber: muzâri", "Arabanın yakıtı neredeyse bitiyor.", "u2"],
  ["عَسَى الضَّيْفُ أَنْ {يَحْضُرَ} بَعْدَ قَلِيلٍ.", ["يَحْضُرَ", "يَحْضُرُ", "حَضَرَ"], "أَنْ + mansûb", "Umulur ki misafir birazdan gelir.", "u3"],
  ["عَسَى الوَلَدُ أَنْ {يَمْشِيَ}.", ["يَمْشِيَ", "يَمْشِي", "يَمْشِ"], "mansûb: fetha zâhir", "Umulur ki çocuk yürür.", "u3"],
  ["عَسَى أَنْ يَحْضُرَ {الأُسْتَاذُ}.", ["الأُسْتَاذُ", "الأُسْتَاذَ", "الأُسْتَاذِ"], "يَحْضُرَ’nin fâili", "Umulur ki hoca gelir.", "u3"],
  ["عَسَى الطَّالِبُ أَنْ يُصْبِحَ {مُدَرِّسًا}.", ["مُدَرِّسًا", "مُدَرِّسٌ", "مُدَرِّسٍ"], "أَصْبَحَ’in haberi", "Umulur ki öğrenci öğretmen olur.", "u3"],
  ["عَسَى أَسْئِلَةُ الِاخْتِبَارِ أَنْ {تَكُونَ} سَهْلَةً.", ["تَكُونَ", "تَكُونُ", "يَكُونَ"], "أَنْ + mansûb, müennes", "Umulur ki sorular kolay olur.", "u3"],
  ["شَرَعَ الطَّالِبُ {يَقْرَأُ} القُرْآنَ.", ["يَقْرَأُ", "أَنْ يَقْرَأَ", "قَرَأَ"], "şurû’: أَنْ yok", "Öğrenci Kur’an okumaya başladı.", "u4"],
  ["أَخَذَ المُسَافِرُونَ {يَنْزِلُونَ} مِنَ الطَّائِرَةِ.", ["يَنْزِلُونَ", "أَنْ يَنْزِلُوا", "يَنْزِلُ"], "çoğul haber", "Yolcular uçaktan inmeye başladı.", "u4"],
  ["بَدَأَتِ الطَّالِبَاتُ {يَدْخُلْنَ} قَاعَةَ الِامْتِحَانِ.", ["يَدْخُلْنَ", "يَدْخُلُونَ", "تَدْخُلُ"], "nûn-ı nisve", "Kız öğrenciler salona girmeye başladı.", "u4"],
  ["{جَعَلَ} الطُّلَّابُ يُفَكِّرُونَ فِي العُطْلَةِ.", ["جَعَلَ", "جَعَلُوا", "عَسَى"], "fiil önce: tekil", "Öğrenciler tatili düşünmeye başladı.", "u4"],
  ["أَنْشَأَتِ السَّمَاءُ {تُمْطِرُ}.", ["تُمْطِرُ", "أَنْ تُمْطِرَ", "أَمْطَرَتْ"], "şurû’", "Gök yağmur yağdırmaya başladı.", "u4"],
  ["أَخَذْتُ {الكِتَابَ} مِنَ الأُسْتَاذِ.", ["الكِتَابَ", "الكِتَابُ", "الكِتَابِ"], "tam fiil: mef’ûl", "Kitabı hocadan aldım.", "u4"],
  ["كَادَتِ الفِتْنَةُ {تَنْتَشِرُ}.", ["تَنْتَشِرُ", "انْتَشَرَتْ", "أَنْ تَنْتَشِرُ"], "كَادَ: أَنْ’siz", "Fitne neredeyse yayılacaktı.", "u5"],
  ["وَأَوْشَكَ المُرْتَدُّونَ أَنْ {يَتَكَاثَرُوا}.", ["يَتَكَاثَرُوا", "يَتَكَاثَرُونَ", "يَتَكَاثَرَ"], "أَنْ: nûn düşer", "Dinden dönenler çoğalmak üzereydi.", "u5"],
  ["فَبَدَأَ أَبُو بَكْرٍ {يَدْعُوهُمْ} إِلَى الإِسْلَامِ.", ["يَدْعُوهُمْ", "أَنْ يَدْعُوَهُمْ", "دَعَاهُمْ"], "şurû’: muzâri", "Ebû Bekir onları İslam’a çağırmaya başladı.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["يَفُوزُ أَحْمَدُ ← كَادَ ile", "كَادَ أَحْمَدُ يَفُوزُ", "كَادَ أَحْمَدُ أَنْ يَفُوزُ", "كَادَ أَحْمَدَ يَفُوزُ", "كَادَ: haber أَنْ’siz muzâri.", "u2"],
  ["يَخْرُجُ الطَّالِبُ ← أَوْشَكَ ile", "أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ", "أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجُ", "أَوْشَكَ الطَّالِبَ أَنْ يَخْرُجَ", "أَوْشَكَ: أَنْ + mansûb.", "u2"],
  ["تَسْقُطُ الطِّفْلَةُ ← كَادَ ile", "كَادَتِ الطِّفْلَةُ تَسْقُطُ", "كَادَ الطِّفْلَةُ تَسْقُطُ", "كَادَتِ الطِّفْلَةُ يَسْقُطُ", "Müennes isim: كَادَتْ, haber تَسْقُطُ.", "u2"],
  ["يَحْضُرُ الضَّيْفُ ← عَسَى ile", "عَسَى الضَّيْفُ أَنْ يَحْضُرَ", "عَسَى الضَّيْفَ أَنْ يَحْضُرَ", "عَسَى الضَّيْفُ أَنْ يَحْضُرُ", "Recâ: أَنْ + mansûb.", "u3"],
  ["عَسَى الضَّيْفُ أَنْ يَحْضُرَ ← tam", "عَسَى أَنْ يَحْضُرَ الضَّيْفُ", "عَسَى أَنْ يَحْضُرُ الضَّيْفُ", "عَسَى أَنْ يَحْضُرَ الضَّيْفَ", "أَنْ + fiil fâil olur.", "u3"],
  ["الطَّالِبُ يُصْبِحُ مُدَرِّسًا ← عَسَى ile", "عَسَى الطَّالِبُ أَنْ يُصْبِحَ مُدَرِّسًا", "عَسَى الطَّالِبُ أَنْ يُصْبِحُ مُدَرِّسًا", "عَسَى الطَّالِبَ أَنْ يُصْبِحَ مُدَرِّسًا", "أَنْ: mansûb.", "u3"],
  ["اللهُ يَغْفِرُ لَنَا ← عَسَى ile", "عَسَى اللهُ أَنْ يَغْفِرَ لَنَا", "عَسَى اللهُ أَنْ يَغْفِرُ لَنَا", "عَسَى اللهَ أَنْ يَغْفِرَ لَنَا", "İsim merfû, haber أَنْ + mansûb.", "u3"],
  ["يَقْرَأُ الطَّالِبُ ← شَرَعَ ile", "شَرَعَ الطَّالِبُ يَقْرَأُ", "شَرَعَ الطَّالِبُ أَنْ يَقْرَأَ", "شَرَعَ الطَّالِبَ يَقْرَأُ", "Şurû’: أَنْ asla gelmez.", "u4"],
  ["تَدْخُلُ الطَّالِبَاتُ ← بَدَأَ ile", "بَدَأَتِ الطَّالِبَاتُ يَدْخُلْنَ", "بَدَأَتِ الطَّالِبَاتُ تَدْخُلُ", "بَدَأَتِ الطَّالِبَاتُ أَنْ يَدْخُلْنَ", "Haber isme uyar: يَدْخُلْنَ.", "u4"],
  ["يَنْزِلُ المُسَافِرُونَ ← أَخَذَ ile", "أَخَذَ المُسَافِرُونَ يَنْزِلُونَ", "أَخَذَ المُسَافِرُونَ يَنْزِلُ", "أَخَذَ المُسَافِرُونَ أَنْ يَنْزِلُوا", "Haber çoğul.", "u4"],
  ["يَكْتُبُ أَحْمَدُ قِصَّةً ← جَعَلَ ile", "جَعَلَ أَحْمَدُ يَكْتُبُ قِصَّةً", "جَعَلَ أَحْمَدُ أَنْ يَكْتُبَ قِصَّةً", "جَعَلَ أَحْمَدُ كَتَبَ قِصَّةً", "Şurû’: muzâri, أَنْ’siz.", "u4"],
  ["بَدَأَ مُصْطَفَى يَقْرَأُ الكِتَابَ ← tam (masdar)", "بَدَأَ مُصْطَفَى قِرَاءَةَ الكِتَابِ", "بَدَأَ مُصْطَفَى قِرَاءَةُ الكِتَابِ", "بَدَأَ مُصْطَفَى قِرَاءَةِ الكِتَابِ", "Tam fiil: masdar mef’ûlün bih, mansûb.", "u4"],
  ["تَنْتَشِرُ الفِتْنَةُ ← كَادَ ile", "كَادَتِ الفِتْنَةُ تَنْتَشِرُ", "كَادَ الفِتْنَةُ تَنْتَشِرُ", "كَادَتِ الفِتْنَةُ أَنْ تَنْتَشِرُ", "Müennes isim; أَنْ’siz merfû haber.", "u5"],
  ["يَتَكَاثَرُ المُرْتَدُّونَ ← أَوْشَكَ ile", "أَوْشَكَ المُرْتَدُّونَ أَنْ يَتَكَاثَرُوا", "أَوْشَكَ المُرْتَدُّونَ أَنْ يَتَكَاثَرُونَ", "أَوْشَكَ المُرْتَدِّينَ أَنْ يَتَكَاثَرُوا", "أَنْ: nûn düşer; isim merfû.", "u5"]
];
// Grup hız oyunu
var NOUN_LIST = UNITS[0].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = GRP;
// Tam mı / grup hız oyunu
var MM_OPTS = TN;
var MM_LIST = UNITS[3].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  gr: { name: "Fiil ↔ özelliği", pairs: [["كَادَ", "yakınlık · أَنْ nadir"], ["أَوْشَكَ", "yakınlık · أَنْ çoğunlukla"], ["عَسَى", "umut · أَنْ çoğunlukla"], ["شَرَعَ", "başlama · أَنْ yok"], ["طَفِقَا يَخْصِفَانِ", "başladılar (A’râf 22)"], ["أَنْشَأَتِ السَّمَاءُ تُمْطِرُ", "gök yağmaya başladı"], ["أَخَذَ الكِتَابَ", "tam fiil"], ["عَسَى أَنْ يَحْضُرَ", "tam عَسَى"]] },
  tm: { name: "Cümle ↔ dönüşüm", pairs: [["يَفُوزُ أَحْمَدُ", "كَادَ أَحْمَدُ يَفُوزُ"], ["يَخْرُجُ الطَّالِبُ", "أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ"], ["يَحْضُرُ الضَّيْفُ", "عَسَى الضَّيْفُ أَنْ يَحْضُرَ"], ["يَقْرَأُ الطَّالِبُ", "شَرَعَ الطَّالِبُ يَقْرَأُ"], ["تَسْقُطُ الطِّفْلَةُ", "كَادَتِ الطِّفْلَةُ تَسْقُطُ"], ["يَنْزِلُ المُسَافِرُونَ", "أَخَذَ المُسَافِرُونَ يَنْزِلُونَ"], ["تَدْخُلُ الطَّالِبَاتُ", "بَدَأَتِ الطَّالِبَاتُ يَدْخُلْنَ"], ["تُمْطِرُ السَّمَاءُ", "أَنْشَأَتِ السَّمَاءُ تُمْطِرُ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["كَادَ", "az kaldı, -mak üzereydi"], ["أَوْشَكَ", "yakında -mak üzere"], ["عَسَى", "umulur ki"], ["شَرَعَ", "girişti, başladı"], ["أَخَذَ", "koyuldu"], ["جَعَلَ", "-maya başladı"], ["طَفِقَ", "başlayıverdi"], ["هَبَّ", "-maya kalkıştı"]] }
};
var KARTLAR = [
  ["Bu fiiller nasıl amel eder?", "كَانَ gibi: ismi merfû, haberi mahallen mansûb."],
  ["Haberleri nedir?", "Muzâri ile başlayan fiil cümlesi."],
  ["Mukârabe fiilleri?", "كَادَ، أَوْشَكَ: haber yakında olacak."],
  ["Recâ fiilleri?", "عَسَى (ayrıca حَرَى، اخْلَوْلَقَ): haber umulur."],
  ["Şurû’ fiilleri?", "بَدَأَ، شَرَعَ، أَخَذَ، جَعَلَ، طَفِقَ، هَبَّ، أَنْشَأَ"],
  ["كَادَ ve أَنْ?", "Nadiren: كَادَ الوَلَدُ يَسْقُطُ"],
  ["أَوْشَكَ ve أَنْ?", "Çoğunlukla: أَوْشَكَ الطَّالِبُ أَنْ يَخْرُجَ"],
  ["Şurû’ ve أَنْ?", "Asla: شَرَعَ الطَّالِبُ يَقْرَأُ"],
  ["Tam عَسَى?", "Doğrudan أَنْ + fiil: عَسَى أَنْ يَحْضُرَ الأُسْتَاذُ (fâil)."],
  ["أَخَذَ الطَّالِبُ الكِتَابَ?", "Muzâri haber yok: tam fiil “aldı”."],
  ["وَمَا كَادُوا يَفْعَلُونَ?", "İsmi vâv zamiri, haberi يَفْعَلُونَ."],
  ["Müennes isim?", "Fiile tâ: كَادَتِ الطِّفْلَةُ تَسْقُطُ"]
];
