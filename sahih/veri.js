// ================= VERİ: Sahih ve Mu’tel Fiil (الفِعْلُ الصَّحِيحُ وَالمُعْتَلُّ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "mi.أَجْوَفُ" gibi yazılırsa etikete not eklenir.
var ROLES = {
  tks: { ar: "صَحِيحٌ", tr: "Sahih" }, sf: { ar: "مُعْتَلٌّ", tr: "Mu’tel" },
  mz: { ar: "سَالِمٌ", tr: "Sâlim" }, nasb: { ar: "مَهْمُوزٌ", tr: "Mehmûz" }, mus: { ar: "مُضَعَّفٌ", tr: "Muzâaf" },
  cerr: { ar: "مِثَالٌ", tr: "Misâl" }, mi: { ar: "أَجْوَفُ", tr: "Ecvef" }, ref: { ar: "نَاقِصٌ", tr: "Nâkıs" }, mun: { ar: "لَفِيفٌ", tr: "Lefîf" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
// Yedi tür: [Türkçe, Arapça, renk, grup (s: sahih, m: mu’tel), kısa tarif]
var TYP = {
  sl: ["Sâlim", "سَالِمٌ", "mz", "s", "illet, hemze, tekrar yok"],
  mh: ["Mehmûz", "مَهْمُوزٌ", "nasb", "s", "kökte hemze var"],
  md: ["Muzâaf", "مُضَعَّفٌ", "mus", "s", "2. ve 3. harf aynı"],
  ms: ["Misâl", "مِثَالٌ", "cerr", "m", "1. harf illet"],
  ec: ["Ecvef", "أَجْوَفُ", "mi", "m", "2. harf illet"],
  nk: ["Nâkıs", "نَاقِصٌ", "ref", "m", "3. harf illet"],
  lf: ["Lefîf", "لَفِيفٌ", "mun", "m", "iki illet harfi"]
};
var TKEYS = ["sl", "mh", "md", "ms", "ec", "nk", "lf"];
var GRP = { s: ["Sahih", "صَحِيحٌ", "tks"], m: ["Mu’tel", "مُعْتَلٌّ", "sf"] };
var SM_OPTS = [["s", "Sahih", "صَحِيحٌ", "tks"], ["m", "Mu’tel", "مُعْتَلٌّ", "sf"]];
function topt(k) { return [k, TYP[k][0], TYP[k][1], TYP[k][2]]; }
var SAH_OPTS = ["sl", "mh", "md"].map(topt);
var MUT_OPTS = ["ms", "ec", "nk", "lf"].map(topt);
var ALL_OPTS = TKEYS.map(topt);
// "صَحِيحٌ سَالِمٌ" gibi tam ad
function TA(k) { return (TYP[k][3] === "s" ? "صَحِيحٌ " : "مُعْتَلٌّ ") + TYP[k][1]; }

function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }

// Kökten türü bul
function kokTur(r) {
  var il = r.map(function (h) { return h === "و" || h === "ي"; }), n = il.filter(Boolean).length;
  if (n === 2) return "lf";
  if (n === 1) return ["ms", "ec", "nk"][il.indexOf(true)];
  if (r.indexOf("ء") >= 0) return "mh";
  if (r[1] === r[2]) return "md";
  return "sl";
}
// Fiiller: [mâzi, muzâri, kök, Türkçe, not]
var VB = [
  ["نَصَرَ", "يَنْصُرُ", "ن ص ر", "yardım etti"], ["كَتَبَ", "يَكْتُبُ", "ك ت ب", "yazdı"], ["فَتَحَ", "يَفْتَحُ", "ف ت ح", "açtı"], ["خَرَجَ", "يَخْرُجُ", "خ ر ج", "çıktı"],
  ["حَمَلَ", "يَحْمِلُ", "ح م ل", "taşıdı"], ["جَلَسَ", "يَجْلِسُ", "ج ل س", "oturdu"], ["ذَهَبَ", "يَذْهَبُ", "ذ ه ب", "gitti"], ["شَرِبَ", "يَشْرَبُ", "ش ر ب", "içti"],
  ["جَمَعَ", "يَجْمَعُ", "ج م ع", "topladı"], ["ضَحِكَ", "يَضْحَكُ", "ض ح ك", "güldü"], ["غَسَلَ", "يَغْسِلُ", "غ س ل", "yıkadı"], ["سَمِعَ", "يَسْمَعُ", "س م ع", "duydu"],
  ["نَجَحَ", "يَنْجَحُ", "ن ج ح", "başardı"], ["عَجِبَ", "يَعْجَبُ", "ع ج ب", "şaştı"], ["غَضِبَ", "يَغْضَبُ", "غ ض ب", "kızdı"], ["قَدِمَ", "يَقْدَمُ", "ق د م", "geldi"],
  ["قَرَأَ", "يَقْرَأُ", "ق ر ء", "okudu", "hemze sonda"], ["أَكَلَ", "يَأْكُلُ", "ء ك ل", "yedi", "hemze başta"], ["سَأَلَ", "يَسْأَلُ", "س ء ل", "sordu", "hemze ortada"],
  ["أَخَذَ", "يَأْخُذُ", "ء خ ذ", "aldı", "hemze başta"], ["أَمَرَ", "يَأْمُرُ", "ء م ر", "emretti", "hemze başta"], ["بَدَأَ", "يَبْدَأُ", "ب د ء", "başladı", "hemze sonda"],
  ["مَدَّ", "يَمُدُّ", "م د د", "uzattı", "şedde iki د"], ["رَدَّ", "يَرُدُّ", "ر د د", "cevap verdi", "şedde iki د"], ["شَدَّ", "يَشُدُّ", "ش د د", "çekti", "şedde iki د"],
  ["عَدَّ", "يَعُدُّ", "ع د د", "saydı", "şedde iki د"], ["ظَنَّ", "يَظُنُّ", "ظ ن ن", "sandı", "şedde iki ن"], ["ضَرَّ", "يَضُرُّ", "ض ر ر", "zarar verdi", "şedde iki ر"], ["دَلَّ", "يَدُلُّ", "د ل ل", "yol gösterdi", "şedde iki ل"],
  ["وَقَفَ", "يَقِفُ", "و ق ف", "durdu", "muzâride و düşer"], ["وَجَدَ", "يَجِدُ", "و ج د", "buldu", "muzâride و düşer"], ["وَصَلَ", "يَصِلُ", "و ص ل", "vardı", "muzâride و düşer"],
  ["وَعَدَ", "يَعِدُ", "و ع د", "söz verdi", "muzâride و düşer"], ["وَضَعَ", "يَضَعُ", "و ض ع", "koydu", "muzâride و düşer"], ["وَزَنَ", "يَزِنُ", "و ز ن", "tarttı", "muzâride و düşer"], ["يَئِسَ", "يَيْأَسُ", "ي ء س", "ümitsizliğe düştü", "baştaki ي illet"],
  ["قَالَ", "يَقُولُ", "ق و ل", "dedi", "elifin aslı و"], ["بَاعَ", "يَبِيعُ", "ب ي ع", "sattı", "elifin aslı ي"], ["نَامَ", "يَنَامُ", "ن و م", "uyudu", "elifin aslı و (نَوْمٌ)"],
  ["قَامَ", "يَقُومُ", "ق و م", "kalktı", "elifin aslı و"], ["عَادَ", "يَعُودُ", "ع و د", "döndü", "elifin aslı و"], ["طَارَ", "يَطِيرُ", "ط ي ر", "uçtu", "elifin aslı ي"],
  ["مَاتَ", "يَمُوتُ", "م و ت", "öldü", "elifin aslı و"], ["فَازَ", "يَفُوزُ", "ف و ز", "kazandı", "elifin aslı و"], ["نَالَ", "يَنَالُ", "ن ي ل", "elde etti", "elifin aslı ي (نَيْلٌ)"],
  ["غَابَ", "يَغِيبُ", "غ ي ب", "kayboldu", "elifin aslı ي"], ["عَاشَ", "يَعِيشُ", "ع ي ش", "yaşadı", "elifin aslı ي"], ["صَاحَ", "يَصِيحُ", "ص ي ح", "bağırdı", "elifin aslı ي"],
  ["كَانَ", "يَكُونُ", "ك و ن", "oldu", "elifin aslı و"], ["زَارَ", "يَزُورُ", "ز و ر", "ziyaret etti", "elifin aslı و"], ["جَاءَ", "يَجِيءُ", "ج ي ء", "geldi", "hemzeli ama ortası illet"],
  ["رَمَى", "يَرْمِي", "ر م ي", "attı", "sondaki ى'nin aslı ي"], ["دَعَا", "يَدْعُو", "د ع و", "çağırdı, dua etti", "sondaki elifin aslı و"], ["نَسِيَ", "يَنْسَى", "ن س ي", "unuttu", "son harf ي"],
  ["جَرَى", "يَجْرِي", "ج ر ي", "koştu, aktı", "sondaki ى'nin aslı ي"], ["بَكَى", "يَبْكِي", "ب ك ي", "ağladı", "sondaki ى'nin aslı ي"], ["مَشَى", "يَمْشِي", "م ش ي", "yürüdü", "sondaki ى'nin aslı ي"],
  ["حَكَى", "يَحْكِي", "ح ك ي", "anlattı", "sondaki ى'nin aslı ي"], ["نَجَا", "يَنْجُو", "ن ج و", "kurtuldu", "sondaki elifin aslı و"], ["قَضَى", "يَقْضِي", "ق ض ي", "hükmetti", "sondaki ى'nin aslı ي"],
  ["هَدَى", "يَهْدِي", "ه د ي", "doğru yolu gösterdi", "sondaki ى'nin aslı ي"], ["بَقِيَ", "يَبْقَى", "ب ق ي", "kaldı", "son harf ي"], ["رَأَى", "يَرَى", "ر ء ي", "gördü", "hemzeli ama sonu illet"], ["أَتَى", "يَأْتِي", "ء ت ي", "geldi", "hemzeli ama sonu illet"],
  ["نَوَى", "يَنْوِي", "ن و ي", "niyet etti", "و ve ي yan yana (makrûn)"], ["طَوَى", "يَطْوِي", "ط و ي", "katladı", "و ve ي yan yana (makrûn)"], ["كَوَى", "يَكْوِي", "ك و ي", "ütüledi", "و ve ي yan yana (makrûn)"],
  ["رَوَى", "يَرْوِي", "ر و ي", "rivayet etti", "و ve ي yan yana (makrûn)"], ["وَفَى", "يَفِي", "و ف ي", "sözünü tuttu", "و ile ي ayrı (mefrûk)"], ["وَعَى", "يَعِي", "و ع ي", "kavradı", "و ile ي ayrı (mefrûk)"], ["وَقَى", "يَقِي", "و ق ي", "korudu", "و ile ي ayrı (mefrûk)"]
].map(function (v) { var r = v[2].split(" "); return { m: v[0], u: v[1], r: r, tr: v[3], not: v[4] || "", t: kokTur(r) }; });
var VB_BY = {}; VB.forEach(function (v) { VB_BY[v.m] = v; });
// Kök makinesi için seçilen fiiller
var MAK_V = ["نَصَرَ", "قَرَأَ", "أَكَلَ", "سَأَلَ", "مَدَّ", "وَقَفَ", "يَئِسَ", "قَالَ", "بَاعَ", "رَمَى", "دَعَا", "نَسِيَ", "نَوَى", "وَفَى"];
// Türün gerekçesi (kısa)
function kokWhy(v) {
  var r = v.r, t = v.t, pos = ["1. harf (fâ)", "2. harf (ayn)", "3. harf (lâm)"];
  if (t === "lf") return "iki illet harfi var";
  if (t === "ms" || t === "ec" || t === "nk") { var i = r.map(function (h) { return h === "و" || h === "ي"; }).indexOf(true); return pos[i] + " " + r[i]; }
  if (t === "mh") return "illet yok, hemze " + ["başta", "ortada", "sonda"][r.indexOf("ء")];
  if (t === "md") return "illet yok, 2. ve 3. harf aynı (" + r[1] + ")";
  return "illet, hemze ve tekrar yok";
}
function kokStr(v) { return v.r.join(" "); }
// "قَالَ: ق و ل, mu’tel ecvef (2. harf (ayn) و)"
function vWhy(m) { var v = VB_BY[m]; return '<span class="ar">' + v.m + '</span>: kök <span class="ar">' + kokStr(v) + '</span>, ' + GRP[TYP[v.t][3]][0].toLowerCase() + ' ' + TYP[v.t][0].toLowerCase() + ' (' + kokWhy(v) + ').'; }

var UNITS = [
// ---------------------------------------------------------------- 1 · SAHİH VE MU’TEL
{
  id: "u1", no: 1, ar: "الصَّحِيحُ وَالمُعْتَلُّ", tr: "Sahih ve Mu’tel", short: "Sahih · mu’tel", col: "tks", legend: ["tks", "sf"],
  goals: ["Harf-i illeti tanımak: ا، و، ي", "Fiilin kök harflerinde illet harfi olup olmadığına bakmak", "Bir fiilin sahih mi, mu’tel mi olduğunu söylemek"],
  examples: [
    { s: "وَقَفَ:sf.مِثَالٌ / المُهَنْدِسُ أَمَامَ الشَّرِكَةِ:-", tr: "Mühendis şirketin önünde durdu.", pair: "يَخْرُجُ:tks.سَالِمٌ / المُدِيرُ مِنَ المَدْرَسَةِ:-", pairTr: "Müdür okuldan çıkıyor." },
    { s: "قَامَ:sf.أَجْوَفُ / الوَلَدُ مِنَ النَّوْمِ مُبَكِّرًا:-", tr: "Çocuk uykudan erken kalktı.", pair: "يَقْرَأُ:tks.مَهْمُوزٌ / الإِمَامُ سُورَةَ الفَتْحِ:-", pairTr: "İmam Fetih sûresini okuyor." },
    { s: "جَرَى:sf.نَاقِصٌ / اللَّاعِبُ فِي المَلْعَبِ:-", tr: "Oyuncu sahada koştu.", pair: "يَشُدُّ:tks.مُضَعَّفٌ / العَامِلُ الحَبْلَ بِقُوَّةٍ:-", pairTr: "İşçi ipi kuvvetle çekiyor." }
  ],
  rules: [
    { tr: "Fiil, kök harflerine göre ikiye ayrılır: <b class=\"r-tks\">sahih</b> (<span class=\"ar\">صَحِيحٌ</span>) ve <b class=\"r-sf\">mu’tel</b> (<span class=\"ar\">مُعْتَلٌّ</span>)." },
    { tr: "<b>Harf-i illet</b> (<span class=\"ar\">حُرُوفُ العِلَّةِ</span>) üçtür: elif, vav, yâ.", ex: ["ا", "و", "ي"] },
    { tr: "<b class=\"r-tks\">Sahih</b> fiilin kök harfleri arasında illet harfi yoktur.", ex: ["فَتَحَ", "قَرَأَ", "مَدَّ"] },
    { tr: "<b class=\"r-sf\">Mu’tel</b> fiilin kök harfleri arasında bir ya da iki illet harfi vardır.", ex: ["وَجَدَ", "قَالَ", "رَمَى", "نَوَى"] },
    { tr: "Elif kökte asıl harf olmaz; aslı vav ya da yâdır. Muzâriye bak: <span class=\"ar\">قَالَ ← يَقُولُ</span> (و), <span class=\"ar\">بَاعَ ← يَبِيعُ</span> (ي). Elifli fiil bu yüzden mu’teldir." },
    { tr: "Kök harflerini bulmak için ekleri at: <span class=\"ar\">قَرَأْتُ ← قَرَأَ</span>, <span class=\"ar\">يَخْرُجُ ← خَرَجَ</span>, <span class=\"ar\">غَابَتْ ← غَابَ</span>." }
  ],
  kaide: [
    "الفِعْلُ نَوْعَانِ: ١ ـ صَحِيحٌ: لَا يُوجَدُ بَيْنَ حُرُوفِهِ الأَصْلِيَّةِ حَرْفٌ مِنْ حُرُوفِ العِلَّةِ، مِثْلُ: فَتَحَ ـ قَرَأَ ـ مَدَّ.",
    "٢ ـ مُعْتَلٌّ: يَكُونُ بَيْنَ حُرُوفِهِ الأَصْلِيَّةِ حَرْفٌ أَوْ حَرْفَانِ مِنْ حُرُوفِ العِلَّةِ، مِثْلُ: وَجَدَ ـ قَالَ ـ رَمَى ـ نَوَى.",
    "حُرُوفُ العِلَّةِ: (ا) الأَلِفُ ـ (و) الوَاوُ ـ (ي) اليَاءُ."
  ],
  ex: [
    { type: "classify", num: "١", opts: SM_OPTS, ar: "بَيِّنْ نَوْعَ الفِعْلِ الَّذِي تَحْتَهُ خَطٌّ (صَحِيحًا أَمْ مُعْتَلًّا)", tr: "Altı çizili fiil sahih mi, mu’tel mi?", exHtml: "<span class=\"ar\">بَاعَ الرَّجُلُ السَّيَّارَةَ ← مُعْتَلٌّ · نَجَحَ حُسَيْنٌ فِي الامْتِحَانِ ← صَحِيحٌ</span>", items: [
      { s: HL("خَرَجَ الأُسْتَاذُ مِنَ الصَّفِّ.", "خَرَجَ"), a: "s", why: vWhy("خَرَجَ"), tr: "Hoca sınıftan çıktı." },
      { s: HL("مَدَّ الغَنِيُّ يَدَ العَوْنِ إِلَى الفُقَرَاءِ.", "مَدَّ"), a: "s", why: vWhy("مَدَّ") + " Şedde iki harfi gösterir; illet yok.", tr: "Zengin, fakirlere yardım elini uzattı." },
      { s: HL("وَعَدَ اللهُ المُؤْمِنِينَ بِالجَنَّةِ.", "وَعَدَ"), a: "m", why: vWhy("وَعَدَ"), tr: "Allah müminlere cenneti vadetti." },
      { s: HL("نَامَ الطِّفْلُ فِي فِرَاشِهِ.", "نَامَ"), a: "m", why: vWhy("نَامَ"), tr: "Çocuk yatağında uyudu." },
      { s: HL("قَرَأْتُ الكِتَابَ فِي لَيْلَةٍ وَاحِدَةٍ.", "قَرَأْتُ"), a: "s", why: "Ek atılınca <span class=\"ar\">قَرَأَ</span>: " + vWhy("قَرَأَ") + " Hemze illet harfi değildir.", tr: "Kitabı bir gecede okudum." },
      { s: HL("حَمَلَ الأُسْتَاذُ الكُتُبَ إِلَى البَيْتِ.", "حَمَلَ"), a: "s", why: vWhy("حَمَلَ"), tr: "Hoca kitapları eve taşıdı." },
      { s: HL("وَصَلَ كَرِيمٌ مِنْ إِسْطَنْبُولَ.", "وَصَلَ"), a: "m", why: vWhy("وَصَلَ"), tr: "Kerîm İstanbul’dan geldi." },
      { s: HL("بَكَى المَرِيضُ مِنَ الأَلَمِ.", "بَكَى"), a: "m", why: vWhy("بَكَى"), tr: "Hasta acıdan ağladı." }
    ]},
    { type: "pick", extra: true, ar: "أَيُّ الأَفْعَالِ مُعْتَلٌّ؟", tr: "Üç fiilden hangisi mu’tel? Kökte و ya da ي ara; elif de illettir.", items: [
      { q: "", o: ["كَتَبَ", "قَالَ", "سَأَلَ"], a: 1, why: vWhy("قَالَ") + " سَأَلَ hemzeli ama sahihtir.", tr: "" },
      { q: "", o: ["مَدَّ", "أَكَلَ", "وَجَدَ"], a: 2, why: vWhy("وَجَدَ"), tr: "" },
      { q: "", o: ["رَمَى", "فَتَحَ", "شَدَّ"], a: 0, why: vWhy("رَمَى"), tr: "" },
      { q: "", o: ["قَرَأَ", "نَامَ", "جَلَسَ"], a: 1, why: vWhy("نَامَ"), tr: "" },
      { q: "", o: ["عَدَّ", "خَرَجَ", "نَوَى"], a: 2, why: vWhy("نَوَى"), tr: "" },
      { q: "", o: ["بَكَى", "أَخَذَ", "حَمَلَ"], a: 0, why: vWhy("بَكَى"), tr: "" }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · SAHİHİN KISIMLARI
{
  id: "u2", no: 2, ar: "أَقْسَامُ الصَّحِيحِ", tr: "Sahihin Kısımları", short: "Sahih", col: "nasb", legend: ["mz", "nasb", "mus"],
  goals: ["Sahih fiilin üç kısmını bilmek: sâlim, mehmûz, muzâaf", "Hemzenin illet harfi olmadığını, mehmûzun sahih sayıldığını görmek", "Şeddeyi açıp muzâafı tanımak: مَدَّ = م د د"],
  examples: [
    { s: "يَخْرُجُ:mz / المُدِيرُ مِنَ المَدْرَسَةِ:-", tr: "Müdür okuldan çıkıyor.", why: "خ ر ج: illet yok, hemze yok, tekrar yok." },
    { s: "يَقْرَأُ:nasb / الإِمَامُ سُورَةَ الفَتْحِ:-", tr: "İmam Fetih sûresini okuyor.", why: "ق ر ء: son kök harfi hemze." },
    { s: "يَشُدُّ:mus / العَامِلُ الحَبْلَ بِقُوَّةٍ:-", tr: "İşçi ipi kuvvetle çekiyor.", why: "ش د د: 2. ve 3. harf aynı." },
    { s: "سَأَلَ:nasb / الشُّرْطِيُّ السَّائِقَ:-", tr: "Polis şoföre sordu.", why: "س ء ل: hemze ortada." }
  ],
  rules: [
    { tr: "Sahih fiil üç kısımdır: <b class=\"r-mz\">sâlim</b>, <b class=\"r-nasb\">mehmûz</b>, <b class=\"r-mus\">muzâaf</b>." },
    { tr: "<b class=\"r-mz\">Sâlim</b> (<span class=\"ar\">سَالِمٌ</span>): kök harflerinde illet harfi, hemze ve aynı cinsten iki harf yoktur.", ex: ["نَصَرَ", "كَتَبَ", "فَتَحَ"] },
    { tr: "<b class=\"r-nasb\">Mehmûz</b> (<span class=\"ar\">مَهْمُوزٌ</span>): kök harflerinden biri hemzedir. Hemze başta, ortada ya da sonda olabilir.", ex: ["أَكَلَ", "سَأَلَ", "قَرَأَ"] },
    { tr: "<b class=\"r-mus\">Muzâaf</b> (<span class=\"ar\">مُضَعَّفٌ</span>): 2. ve 3. kök harfi aynı cinstendir. Şedde iki harfi tek yazar; zamir tâsı gelince açılır: <span class=\"ar\">مَدَدْتُ، ظَنَنْتُ</span>.", ex: ["مَدَّ", "رَدَّ", "شَدَّ"] },
    { tr: "Dikkat: hemzeli olup illet harfi de taşıyan fiil sahih değildir: <span class=\"ar\">رَأَى، أَتَى، جَاءَ</span> mu’teldir." }
  ],
  kaide: [
    "وَالصَّحِيحُ ثَلَاثَةُ أَقْسَامٍ: أ ـ السَّالِمُ: مَا لَا يُوجَدُ بَيْنَ حُرُوفِهِ الأَصْلِيَّةِ حَرْفٌ مِنْ حُرُوفِ العِلَّةِ وَلَا هَمْزَةٌ، وَلَا حَرْفَانِ مِنْ جِنْسٍ وَاحِدٍ، مِثْلُ: نَصَرَ، كَتَبَ، فَتَحَ.",
    "ب ـ المَهْمُوزُ: هُوَ مَا كَانَ أَحَدُ حُرُوفِهِ الأَصْلِيَّةِ هَمْزَةً، مِثْلُ: أَكَلَ، سَأَلَ، قَرَأَ.",
    "ج ـ المُضَعَّفُ: هُوَ مَا كَانَ الحَرْفَانِ (الثَّانِي وَالثَّالِثُ) مِنْ حُرُوفِهِ الأَصْلِيَّةِ مِنْ جِنْسٍ وَاحِدٍ، مِثْلُ: مَدَّ، رَدَّ، شَدَّ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ صَحِيحٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki iki fiilden sahih olanı boşluğa koy.", items: [
      { q: "___ التَّاجِرُ النُّقُودَ.", o: ["عَدَّ", "أَلْقَى"], a: 0, tr: "Tüccar paraları saydı.", why: vWhy("عَدَّ") + " أَلْقَى'nın kökü ل ق ي: mu’tel." },
      { q: "___ مَحْمُودٌ إِلَى المَطَارِ.", o: ["وَصَلَ", "ذَهَبَ"], a: 1, tr: "Mahmûd havaalanına gitti.", why: vWhy("ذَهَبَ") + " وَصَلَ misâldir." },
      { q: "___ المُهَنْدِسُ مِنَ الشَّرِكَةِ.", o: ["قَدِمَ", "أَتَى"], a: 0, tr: "Mühendis şirketten geldi.", why: vWhy("قَدِمَ") + " أَتَى hemzeli ama sonu illet: mu’tel." },
      { q: "___ المُؤْمِنُ رَبَّهُ.", o: ["يَدْعُو", "يَعْبُدُ"], a: 1, tr: "Mümin Rabbine ibadet ediyor.", why: "يَعْبُدُ: kök ع ب د, sahih sâlim. يَدْعُو'nun kökü د ع و: mu’tel." },
      { q: "___ المُدِيرُ المُوَظَّفِينَ.", o: ["رَأَى", "نَصَحَ"], a: 1, tr: "Müdür memurlara nasihat etti.", why: "نَصَحَ: kök ن ص ح, sahih sâlim. رَأَى'nın kökü ر ء ي: mu’tel." },
      { q: "___ الطِّفْلُ فِي الغُرْفَةِ.", o: ["أَكَلَ", "نَامَ"], a: 0, tr: "Çocuk odada yemek yedi.", why: vWhy("أَكَلَ") },
      { q: "___ المَاءُ فِي النَّهْرِ.", o: ["جَرَى", "كَثُرَ"], a: 1, tr: "Nehirde su çoğaldı.", why: "كَثُرَ: kök ك ث ر, sahih sâlim. جَرَى nâkıstır." },
      { q: "___ شَرِيفٌ الجَرَائِدَ.", o: ["جَمَعَ", "بَاعَ"], a: 0, tr: "Şerîf gazeteleri topladı.", why: vWhy("جَمَعَ") + " بَاعَ ecveftir." }
    ]},
    { type: "pick", fill: true, num: "٤", ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ صَحِيحٍ", tr: "Boşluğa uyan sahih fiili seç. Kitapta bu alıştırma serbest; burada üç seçenek var, öznenin erkek ya da kadın olmasına da bak.", items: [
      { q: "___ الأُسْتَاذُ كَلَامَ الطَّالِبَيْنِ.", o: ["وَعَى", "سَمِعَ", "رَوَى"], a: 1, tr: "Hoca iki öğrencinin sözünü dinledi.", why: "سَمِعَ: kök س م ع, sâlim. وَعَى lefîf, رَوَى lefîf: mu’tel. Başka cevap: فَهِمَ." },
      { q: "___ زَيْنَبُ الصَّحِيفَةَ الجَدِيدَةَ.", o: ["قَرَأَتْ", "رَأَتْ", "قَرَأَ"], a: 0, tr: "Zeynep yeni gazeteyi okudu.", why: "قَرَأَتْ: kök ق ر ء, mehmûz (sahih). Özne kadın olduğu için ـتْ gerekir; رَأَتْ mu’tel. Başka cevap: أَخَذَتْ." },
      { q: "___ خَدِيجَةُ عَصِيرَ البُرْتُقَالِ.", o: ["شَرِبَ", "وَجَدَتْ", "شَرِبَتْ"], a: 2, tr: "Hadîce portakal suyu içti.", why: "شَرِبَتْ: kök ش ر ب, sâlim; özne kadın: ـتْ. وَجَدَتْ misâl. Başka cevap: طَلَبَتْ." },
      { q: "___ العُمَّالُ مِنَ المَصْنَعِ.", o: ["عَادَ", "خَرَجَ", "جَاءَ"], a: 1, tr: "İşçiler fabrikadan çıktı.", why: "خَرَجَ: sâlim. Fiil önde olduğu için tekil. عَادَ ve جَاءَ ecvef. Başka cevap: رَجَعَ." },
      { q: "___ الطَّبِيبُ المَرِيضَ عَنْ بَلَدِهِ.", o: ["سَأَلَ", "دَعَا", "نَهَى"], a: 0, tr: "Doktor hastaya memleketini sordu.", why: vWhy("سَأَلَ") + " دَعَا ve نَهَى nâkıs." },
      { q: "___ المُمَرِّضَةُ بَابَ الغُرْفَةِ.", o: ["دَعَتِ", "فَتَحَ", "فَتَحَتِ"], a: 2, tr: "Hemşire odanın kapısını açtı.", why: "فَتَحَتِ: sâlim; özne kadın. Sakin tâ ال'den önce kesre alır. Başka cevap: أَغْلَقَتِ (kapattı)." },
      { q: "___ يُوسُفُ القَامُوسَ مِنَ الأُسْتَاذِ.", o: ["نَالَ", "وَجَدَ", "أَخَذَ"], a: 2, tr: "Yûsuf sözlüğü hocadan aldı.", why: vWhy("أَخَذَ") + " Başka cevap: طَلَبَ." },
      { q: "___ المُدِيرُ التَّقْرِيرَ.", o: ["كَتَبَ", "رَوَى", "وَضَعَ"], a: 0, tr: "Müdür raporu yazdı.", why: vWhy("كَتَبَ") + " Başka cevap: قَرَأَ." }
    ]},
    { type: "classify", extra: true, opts: SAH_OPTS, ar: "بَيِّنْ قِسْمَ الفِعْلِ الصَّحِيحِ", tr: "Bu sahih fiil sâlim mi, mehmûz mu, muzâaf mı?", items: [
      { s: HL("أَكَلَ الضَّيْفُ الطَّعَامَ.", "أَكَلَ"), a: "mh", why: "ء ك ل: hemze başta.", tr: "Misafir yemeği yedi." },
      { s: HL("مَدَّ الغَنِيُّ يَدَ العَوْنِ.", "مَدَّ"), a: "md", why: "م د د: şedde iki د.", tr: "Zengin yardım elini uzattı." },
      { s: HL("فَتَحَ الطَّالِبُ البَابَ.", "فَتَحَ"), a: "sl", why: "ف ت ح: illet, hemze, tekrar yok.", tr: "Öğrenci kapıyı açtı." },
      { s: HL("سَأَلَ المُعَلِّمُ سُؤَالًا.", "سَأَلَ"), a: "mh", why: "س ء ل: hemze ortada.", tr: "Öğretmen bir soru sordu." },
      { s: HL("رَدَّ الطَّالِبُ عَلَى السُّؤَالِ.", "رَدَّ"), a: "md", why: "ر د د.", tr: "Öğrenci soruya cevap verdi." },
      { s: HL("كَتَبَ عَلِيٌّ الدَّرْسَ.", "كَتَبَ"), a: "sl", why: "ك ت ب.", tr: "Ali dersi yazdı." },
      { s: HL("قَرَأْتُ الكِتَابَ فِي لَيْلَةٍ وَاحِدَةٍ.", "قَرَأْتُ"), a: "mh", why: "قَرَأَ: ق ر ء, hemze sonda.", tr: "Kitabı bir gecede okudum." },
      { s: HL("ظَنَنْتُ أَنَّ لَكَ ضُيُوفًا.", "ظَنَنْتُ"), a: "md", why: "ظَنَّ: ظ ن ن. ـتُ gelince şedde açıldı: ظَنَنْتُ.", tr: "Misafirlerin var sandım." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · MU’TELİN KISIMLARI
{
  id: "u3", no: 3, ar: "أَقْسَامُ المُعْتَلِّ", tr: "Mu’telin Kısımları", short: "Mu’tel", col: "ref", legend: ["cerr", "mi", "ref", "mun"],
  goals: ["Mu’tel fiilin dört kısmını bilmek: misâl, ecvef, nâkıs, lefîf", "İllet harfinin yerine bakmak: başta, ortada, sonda, iki tane", "Elifin aslını muzâriden bulmak: قَالَ ← يَقُولُ"],
  examples: [
    { s: "وَقَفَ:cerr / المُهَنْدِسُ أَمَامَ الشَّرِكَةِ:-", tr: "Mühendis şirketin önünde durdu.", why: "و ق ف: illet başta." },
    { s: "قَامَ:mi / الوَلَدُ مِنَ النَّوْمِ مُبَكِّرًا:-", tr: "Çocuk uykudan erken kalktı.", why: "ق و م: illet ortada (يَقُومُ)." },
    { s: "جَرَى:ref / اللَّاعِبُ فِي المَلْعَبِ:-", tr: "Oyuncu sahada koştu.", why: "ج ر ي: illet sonda (يَجْرِي)." },
    { s: "نَوَى:mun / الصَّائِمُ الصِّيَامَ:-", tr: "Oruçlu oruca niyet etti.", why: "ن و ي: iki illet harfi." }
  ],
  rules: [
    { tr: "Mu’tel fiil dört kısımdır: <b class=\"r-cerr\">misâl</b>, <b class=\"r-mi\">ecvef</b>, <b class=\"r-ref\">nâkıs</b>, <b class=\"r-mun\">lefîf</b>." },
    { tr: "<b class=\"r-cerr\">Misâl</b> (<span class=\"ar\">مِثَالٌ</span>): ilk kök harfi vav ya da yâdır. Vav çoğu zaman muzâride düşer: <span class=\"ar\">وَقَفَ ← يَقِفُ</span>.", ex: ["وَقَفَ", "وَجَدَ", "يَئِسَ"] },
    { tr: "<b class=\"r-mi\">Ecvef</b> (<span class=\"ar\">أَجْوَفُ</span>, içi boş): ortadaki kök harfi illettir. Mâzide elif görünür; aslını muzâri gösterir: <span class=\"ar\">قَالَ ← يَقُولُ</span> (و), <span class=\"ar\">بَاعَ ← يَبِيعُ</span> (ي).", ex: ["قَالَ", "بَاعَ"] },
    { tr: "<b class=\"r-ref\">Nâkıs</b> (<span class=\"ar\">نَاقِصٌ</span>): son kök harfi illettir. Sonu <span class=\"ar\">ى</span> ise aslı çoğunlukla yâ, <span class=\"ar\">ا</span> ise vavdır: <span class=\"ar\">رَمَى يَرْمِي، دَعَا يَدْعُو</span>.", ex: ["رَمَى", "دَعَا", "نَسِيَ"] },
    { tr: "<b class=\"r-mun\">Lefîf</b> (<span class=\"ar\">لَفِيفٌ</span>): iki illet harfi vardır. Yan yanaysa <i>lefîf-i makrûn</i> (<span class=\"ar\">نَوَى</span>: ن و ي), arada harf varsa <i>lefîf-i mefrûk</i> (<span class=\"ar\">وَفَى</span>: و ف ي).", ex: ["نَوَى", "وَفَى"] }
  ],
  kaide: [
    "وَالمُعْتَلُّ أَرْبَعَةُ أَقْسَامٍ: أ ـ المِثَالُ: هُوَ مَا كَانَ أَوَّلُ حُرُوفِهِ الأَصْلِيَّةِ (الوَاوَ) أَوْ (اليَاءَ)، مِثْلُ: وَقَفَ، وَجَدَ، يَئِسَ.",
    "ب ـ الأَجْوَفُ: هُوَ مَا كَانَ وَسَطُهُ حَرْفَ عِلَّةٍ، مِثْلُ: قَالَ، بَاعَ.",
    "ج ـ النَّاقِصُ: هُوَ مَا كَانَ آخِرُهُ حَرْفَ عِلَّةٍ، نَحْوُ: رَمَى، دَعَا، نَسِيَ.",
    "د ـ اللَّفِيفُ: هُوَ مَا كَانَ فِيهِ حَرْفَا عِلَّةٍ، نَحْوُ: نَوَى، وَفَى."
  ],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ مُعْتَلٍّ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki iki fiilden mu’tel olanı boşluğa koy.", items: [
      { q: "___ النُّجُومُ فِي السَّمَاءِ.", o: ["لَمَعَتِ", "غَابَتِ"], a: 1, tr: "Yıldızlar gökte kayboldu.", why: "غَابَتْ ← غَابَ: kök غ ي ب (يَغِيبُ), ecvef. لَمَعَ sâlim." },
      { q: "___ المُوَظَّفُ الجَائِزَةَ.", o: ["حَصَلَ", "نَالَ"], a: 1, tr: "Memur ödülü aldı.", why: vWhy("نَالَ") + " Ayrıca حَصَلَ, عَلَى ister: حَصَلَ عَلَى الجَائِزَةِ." },
      { q: "___ العُصْفُورُ فِي الجَوِّ.", o: ["طَارَ", "اِرْتَفَعَ"], a: 0, tr: "Serçe havada uçtu.", why: vWhy("طَارَ") + " اِرْتَفَعَ'ın kökü ر ف ع: sahih." },
      { q: "___ الرَّجُلُ بَعْدَ عُمْرٍ طَوِيلٍ.", o: ["مَرِضَ", "مَاتَ"], a: 1, tr: "Adam uzun bir ömürden sonra öldü.", why: vWhy("مَاتَ") },
      { q: "___ حُسَيْنٌ بِجَائِزَةِ الكُلِّيَّةِ.", o: ["فَازَ", "حَصَلَ"], a: 0, tr: "Hüseyin fakültenin ödülünü kazandı.", why: vWhy("فَازَ") + " فَازَ بِـ doğru kullanımdır." },
      { q: "___ الطَّالِبُ الثِّيَابَ.", o: ["غَسَلَ", "طَوَى"], a: 1, tr: "Öğrenci elbiseleri katladı.", why: vWhy("طَوَى") },
      { q: "___ أَحْمَدُ القَلَمَ المَفْقُودَ.", o: ["وَجَدَ", "أَخَذَ"], a: 0, tr: "Ahmed kayıp kalemi buldu.", why: vWhy("وَجَدَ") + " أَخَذَ mehmûz: sahih." },
      { q: "___ السَّمَكُ فِي المَاءِ.", o: ["يَكْثُرُ", "يَعِيشُ"], a: 1, tr: "Balık suda yaşar.", why: "يَعِيشُ: kök ع ي ش, ecvef. يَكْثُرُ sâlim." }
    ]},
    { type: "pick", extra: true, ar: "اسْتَخْرِجِ الحُرُوفَ الأَصْلِيَّةَ", tr: "Kök harfleri hangisi? İpucu: muzâri ve masdar elifin aslını gösterir.", items: [
      { q: "قَالَ · يَقُولُ", o: ["ق ا ل", "ق و ل", "ق ي ل"], a: 1, why: "يَقُولُ (ve masdar قَوْلٌ) vavı gösterir: ecvef.", tr: "dedi" },
      { q: "بَاعَ · يَبِيعُ", o: ["ب و ع", "ب ا ع", "ب ي ع"], a: 2, why: "يَبِيعُ (ve masdar بَيْعٌ) yâyı gösterir: ecvef.", tr: "sattı" },
      { q: "دَعَا · يَدْعُو", o: ["د ع و", "د ع ا", "د ع ي"], a: 0, why: "Sondaki elifin aslı vav: يَدْعُو. Nâkıs.", tr: "çağırdı, dua etti" },
      { q: "رَمَى · يَرْمِي", o: ["ر م ا", "ر م و", "ر م ي"], a: 2, why: "Sondaki ى'nin aslı yâ: يَرْمِي. Nâkıs.", tr: "attı" },
      { q: "نَامَ · يَنَامُ", o: ["ن و م", "ن ي م", "ن ا م"], a: 0, why: "Muzâride de elif kaldı; masdara bak: نَوْمٌ. Kök ن و م: ecvef.", tr: "uyudu" },
      { q: "وَقَفَ · يَقِفُ", o: ["ي ق ف", "و ق ف", "ق و ف"], a: 1, why: "Muzâride vav düştü ama masdar وُقُوفٌ'ta duruyor. Misâl.", tr: "durdu" }
    ]},
    { type: "classify", extra: true, opts: MUT_OPTS, ar: "بَيِّنْ قِسْمَ الفِعْلِ المُعْتَلِّ", tr: "Bu mu’tel fiil misâl mi, ecvef mi, nâkıs mı, lefîf mi?", items: [
      { s: HL("وَعَدَ اللهُ المُؤْمِنِينَ بِالجَنَّةِ.", "وَعَدَ"), a: "ms", why: "و ع د: illet başta.", tr: "Allah müminlere cenneti vadetti." },
      { s: HL("نَامَ الطِّفْلُ فِي فِرَاشِهِ.", "نَامَ"), a: "ec", why: "ن و م: illet ortada.", tr: "Çocuk yatağında uyudu." },
      { s: HL("بَكَى المَرِيضُ مِنَ الأَلَمِ.", "بَكَى"), a: "nk", why: "ب ك ي: illet sonda.", tr: "Hasta acıdan ağladı." },
      { s: HL("طَوَى الطَّالِبُ الثِّيَابَ.", "طَوَى"), a: "lf", why: "ط و ي: iki illet, yan yana.", tr: "Öğrenci elbiseleri katladı." },
      { s: HL("بَاعَ الرَّجُلُ السَّيَّارَةَ.", "بَاعَ"), a: "ec", why: "ب ي ع: illet ortada.", tr: "Adam arabayı sattı." },
      { s: HL("دَعَا المُؤْمِنُ رَبَّهُ.", "دَعَا"), a: "nk", why: "د ع و: illet sonda.", tr: "Mümin Rabbine dua etti." },
      { s: HL("وَصَلَ كَرِيمٌ مِنْ إِسْطَنْبُولَ.", "وَصَلَ"), a: "ms", why: "و ص ل: illet başta.", tr: "Kerîm İstanbul’dan geldi." },
      { s: HL("وَفَى الرَّجُلُ بِوَعْدِهِ.", "وَفَى"), a: "lf", why: "و ف ي: iki illet, arada ف var.", tr: "Adam sözünü tuttu." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · YEDİ TÜR
{
  id: "u4", no: 4, ar: "أَنْوَاعُ الفِعْلِ السَّبْعَةُ", tr: "Yedi Türü Ayırt Etme", short: "Yedi tür", col: "mi", legend: ["mz", "nasb", "mus", "cerr", "mi", "ref", "mun"],
  goals: ["Bir fiilin yedi türden hangisi olduğunu adım adım bulmak", "Boşluğa fiil koyup türünü söylemek", "Mu’tel fiilin yerine sahih bir fiil koyup cümleyi düzeltmek"],
  examples: [
    { s: "وَقَفَ:cerr / المُهَنْدِسُ:-", tr: "Mühendis durdu.", pair: "يَخْرُجُ:mz / المُدِيرُ:-", pairTr: "Müdür çıkıyor." },
    { s: "قَامَ:mi / الوَلَدُ:-", tr: "Çocuk kalktı.", pair: "يَقْرَأُ:nasb / الإِمَامُ:-", pairTr: "İmam okuyor." },
    { s: "جَرَى:ref / اللَّاعِبُ:-", tr: "Oyuncu koştu.", pair: "يَشُدُّ:mus / العَامِلُ:-", pairTr: "İşçi çekiyor." },
    { s: "نَوَى:mun / الصَّائِمُ:-", tr: "Oruçlu niyet etti.", pair: "نَصَرَ:mz / اللهُ:-", pairTr: "Allah yardım etti." }
  ],
  rules: [
    { tr: "<b>1. adım:</b> kök harflerini bul. Ekleri at, şeddeyi aç, elifin aslını muzâriden ya da masdardan öğren.", ex: ["قَرَأْتُ ← ق ر ء", "مَدَّ ← م د د", "قَالَ ← ق و ل"] },
    { tr: "<b>2. adım:</b> kökte <span class=\"ar\">و</span> ya da <span class=\"ar\">ي</span> var mı? Varsa <b class=\"r-sf\">mu’tel</b>: 1. harfte <b class=\"r-cerr\">misâl</b>, 2. harfte <b class=\"r-mi\">ecvef</b>, 3. harfte <b class=\"r-ref\">nâkıs</b>, iki tane ise <b class=\"r-mun\">lefîf</b>." },
    { tr: "<b>3. adım:</b> illet yoksa <b class=\"r-tks\">sahih</b>: hemze varsa <b class=\"r-nasb\">mehmûz</b>, 2. ve 3. harf aynıysa <b class=\"r-mus\">muzâaf</b>, hiçbiri yoksa <b class=\"r-mz\">sâlim</b>." },
    { tr: "Hem hemze hem illet varsa illet öne geçer: <span class=\"ar\">رَأَى</span> (ر ء ي) nâkıs, <span class=\"ar\">يَئِسَ</span> (ي ء س) misâl." }
  ],
  kaide: [
    "الفِعْلُ: صَحِيحٌ (سَالِمٌ ـ مَهْمُوزٌ ـ مُضَعَّفٌ) وَمُعْتَلٌّ (مِثَالٌ ـ أَجْوَفُ ـ نَاقِصٌ ـ لَفِيفٌ).",
    "نَصَرَ: سَالِمٌ ـ قَرَأَ: مَهْمُوزٌ ـ مَدَّ: مُضَعَّفٌ ـ وَصَلَ: مِثَالٌ ـ قَالَ: أَجْوَفُ ـ رَمَى: نَاقِصٌ ـ نَوَى: لَفِيفٌ."
  ],
  ex: [
    { type: "combo", num: "٥", ar: "امْلَأِ الفَرَاغَ بِفِعْلٍ مُنَاسِبٍ، ثُمَّ بَيِّنْ نَوْعَهُ (صَحِيحًا أَمْ مُعْتَلًّا)", tr: "Kutulara dokunarak önce uyan bir fiil, sonra onun türünü seç. Uyan iki fiil var; hangisini seçersen türünü ona göre ver.", exHtml: "<span class=\"ar\">يَقْرَأُ الإِمَامُ القُرْآنَ الكَرِيمَ فِي المَسْجِدِ ← صَحِيحٌ مَهْمُوزٌ</span>", items: [
      CB("", [["يَذْهَبُ", "يَهْدِي", "يَرْزُقُ"], "اللهُ مَنْ يَشَاءُ.", "←", [TA("sl"), TA("ec"), TA("nk")]], [[1, 2], [2, 0]], ["Allah dilediğine hidayet verir.", "Allah dilediğini rızıklandırır."], "يَهْدِي: ه د ي, nâkıs · يَرْزُقُ: ر ز ق, sâlim."),
      CB("", [["ذَهَبَ", "أَكَلَ", "وَصَلَ"], "الحُجَّاجُ إِلَى مَكَّةَ.", "←", [TA("mh"), TA("ms"), TA("sl")]], [[0, 2], [2, 1]], ["Hacılar Mekke’ye gitti.", "Hacılar Mekke’ye vardı."], "ذَهَبَ: sâlim · وَصَلَ: و ص ل, misâl."),
      CB("", [["نَامَ", "حَمَلَ", "وَزَنَ"], "مُوَظَّفُ البَرِيدِ الطَّرْدَ.", "←", [TA("ec"), TA("ms"), TA("sl")]], [[1, 2], [2, 1]], ["Postacı koliyi taşıdı.", "Postacı koliyi tarttı."], "حَمَلَ: sâlim · وَزَنَ: و ز ن, misâl."),
      CB("", [["قَرَأَ", "جَلَسَ", "كَتَبَ"], "الأَبُ الرِّسَالَةَ.", "←", [TA("nk"), TA("sl"), TA("mh")]], [[0, 2], [2, 1]], ["Baba mektubu okudu.", "Baba mektubu yazdı."], "قَرَأَ: ق ر ء, mehmûz · كَتَبَ: sâlim."),
      CB("", [["شَرِبَ", "رَجَعَ", "عَادَ"], "السُّيَّاحُ إِلَى بِلَادِهِمْ.", "←", [TA("md"), TA("ec"), TA("sl")]], [[1, 2], [2, 1]], ["Turistler ülkelerine döndü.", "Turistler ülkelerine döndü."], "رَجَعَ: sâlim · عَادَ: ع و د (يَعُودُ), ecvef."),
      CB("", [["رَمَى", "قَالَ", "قَذَفَ"], "الشَّابُّ الحَجَرَ فِي النَّهْرِ.", "←", [TA("lf"), TA("sl"), TA("nk")]], [[0, 2], [2, 1]], ["Genç taşı nehre attı.", "Genç taşı nehre fırlattı."], "رَمَى: ر م ي, nâkıs · قَذَفَ: sâlim."),
      CB("", [["وَجَدَ", "حَكَمَ", "قَضَى"], "القَاضِي بَيْنَ النَّاسِ بِالعَدْلِ.", "←", [TA("nk"), TA("ms"), TA("sl")]], [[1, 2], [2, 0]], ["Hâkim insanlar arasında adaletle hükmetti.", "Hâkim insanlar arasında adaletle hükmetti."], "حَكَمَ: sâlim · قَضَى: ق ض ي, nâkıs."),
      CB("", [["خَرَجَ", "نَامَ", "وَصَلَ"], "القِطَارُ قَبْلَ سَاعَتَيْنِ.", "←", [TA("ec"), TA("sl"), TA("ms")]], [[0, 1], [2, 2]], ["Tren iki saat önce çıktı.", "Tren iki saat önce vardı."], "خَرَجَ: sâlim · وَصَلَ: misâl.")
    ]},
    { type: "combo", num: "٦", ar: "اسْتَبْدِلْ بِمَا تَحْتَهُ خَطٌّ فِعْلًا صَحِيحًا", tr: "Altı çizili mu’tel fiil yerine sahih bir fiil seç. Kutuya dokundukça seçenek değişir.", exHtml: "<span class=\"ar\">وَصَلَ الإِمَامُ إِلَى المَسْجِدِ ← تَرَكَ الإِمَامُ المَسْجِدَ</span> <small class=\"muted\">(fiil değişince harf-i cer de değişebilir)</small>", items: [
      CB(HL("عَادَ الطُّلَّابُ مِنْ بِلَادِهِمْ إِلَى إِسْطَنْبُولَ.", "عَادَ"), [["جَاءَ", "رَجَعَ", "سَارَ"], "الطُّلَّابُ مِنْ بِلَادِهِمْ إِلَى إِسْطَنْبُولَ."], [1], "Öğrenciler ülkelerinden İstanbul’a döndü.", "رَجَعَ: ر ج ع, sâlim. جَاءَ ve سَارَ ecvef."),
      CB(HL("بَكَى الوَلَدُ فِي حَدِيقَةِ الحَيَوَانَاتِ.", "بَكَى"), [["جَرَى", "ضَحِكَ", "نَامَ", "لَعِبَ"], "الوَلَدُ فِي حَدِيقَةِ الحَيَوَانَاتِ."], [[1], [3]], ["Çocuk hayvanat bahçesinde güldü.", "Çocuk hayvanat bahçesinde oynadı."], "ضَحِكَ ve لَعِبَ sâlim; جَرَى nâkıs, نَامَ ecvef."),
      CB(HL("نَامَ الرَّجُلُ فِي الغَابَةِ.", "نَامَ"), [["مَشَى", "بَقِيَ", "جَلَسَ"], "الرَّجُلُ فِي الغَابَةِ."], [2], "Adam ormanda oturdu.", "جَلَسَ: sâlim. مَشَى ve بَقِيَ nâkıs."),
      CB(HL("نَجَا السَّائِقُ مِنْ حَادِثِ المُرُورِ.", "نَجَا"), [["عَاشَ", "سَلِمَ", "بَقِيَ"], "السَّائِقُ مِنْ حَادِثِ المُرُورِ."], [1], "Şoför trafik kazasından sağ çıktı.", "سَلِمَ: س ل م, sâlim. نَجَا'nın kökü ن ج و: nâkıs."),
      CB(HL("كَوَى الطَّالِبُ المَلَابِسَ.", "كَوَى"), [["طَوَى", "غَسَلَ", "رَمَى", "جَمَعَ"], "الطَّالِبُ المَلَابِسَ."], [[1], [3]], ["Öğrenci elbiseleri yıkadı.", "Öğrenci elbiseleri topladı."], "غَسَلَ ve جَمَعَ sâlim. Tuzak: طَوَى da كَوَى gibi lefîftir.")
    ]},
    { type: "classify", extra: true, opts: ALL_OPTS, ar: "بَيِّنْ نَوْعَ الفِعْلِ", tr: "Kitabın giriş cümleleri: altı çizili fiil yedi türden hangisi?", items: [
      { s: HL("وَقَفَ المُهَنْدِسُ أَمَامَ الشَّرِكَةِ.", "وَقَفَ"), a: "ms", why: "و ق ف: illet başta.", tr: "Mühendis şirketin önünde durdu." },
      { s: HL("يَخْرُجُ المُدِيرُ مِنَ المَدْرَسَةِ.", "يَخْرُجُ"), a: "sl", why: "خ ر ج.", tr: "Müdür okuldan çıkıyor." },
      { s: HL("قَامَ الوَلَدُ مِنَ النَّوْمِ مُبَكِّرًا.", "قَامَ"), a: "ec", why: "ق و م (يَقُومُ).", tr: "Çocuk uykudan erken kalktı." },
      { s: HL("يَقْرَأُ الإِمَامُ سُورَةَ الفَتْحِ.", "يَقْرَأُ"), a: "mh", why: "ق ر ء.", tr: "İmam Fetih sûresini okuyor." },
      { s: HL("جَرَى اللَّاعِبُ فِي المَلْعَبِ.", "جَرَى"), a: "nk", why: "ج ر ي (يَجْرِي).", tr: "Oyuncu sahada koştu." },
      { s: HL("يَشُدُّ العَامِلُ الحَبْلَ بِقُوَّةٍ.", "يَشُدُّ"), a: "md", why: "ش د د.", tr: "İşçi ipi kuvvetle çekiyor." },
      { s: HL("نَوَى الصَّائِمُ الصِّيَامَ.", "نَوَى"), a: "lf", why: "ن و ي.", tr: "Oruçlu oruca niyet etti." },
      { s: HL("رَأَى الرَّجُلُ صَحْنًا.", "رَأَى"), a: "nk", why: "ر ء ي: hemze de var ama illet öne geçer.", tr: "Adam bir tabak gördü." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: البَخِيلُ وَالخَادِمُ الأَحْمَقُ", tr: "Okuma: Cimri ve Ahmak Hizmetçi", short: "Okuma", col: "muz", legend: ["tks", "sf"],
  goals: ["Hikâyedeki fiilleri bulup sahih mi, mu’tel mi olduğunu söylemek", "Muzâri ve ekli şekillerden köke inmek: يَرْمِي ← رَمَى، ظَنَنْتُ ← ظَنَّ", "Hikâyedeki ism-i fâil, ism-i mef’ûl ve sıfat-ı müşebbeheyi tanımak"],
  examples: [
    { s: "حَكَى:sf.نَاقِصٌ / بَعْضُ النَّاسِ:-", tr: "İnsanlardan biri anlattı.", pair: "غَضِبَ:tks.سَالِمٌ / لِهَذَا الإِسْرَافِ:-", pairTr: "Bu israfa kızdı." },
    { s: "يَصِيحُ:sf.أَجْوَفُ / عَلَى الخَادِمِ:-", tr: "Hizmetçiye bağırıyor.", pair: "فَرَدَّ:tks.مُضَعَّفٌ / الخَادِمُ:-", pairTr: "Hizmetçi cevap verdi." }
  ],
  rules: [
    { tr: "Hikâyede fiil bulurken önce baştaki <span class=\"ar\">فَـ، وَ</span> bağlaçlarını ve sondaki zamirleri ayır: <span class=\"ar\">وَرَمَاهُ ← رَمَى</span>." },
    { tr: "Muzâriyi mâziye çevir: <span class=\"ar\">يَضُرُّ ← ضَرَّ</span> (muzâaf), <span class=\"ar\">يَصِيحُ ← صَاحَ</span> (ecvef)." },
    { tr: "Mezîd fiilde de kök harflerine bakılır: <span class=\"ar\">يُرِيدُونَ، أَرَدْتُ</span> (ر و د) ecvef, <span class=\"ar\">أُسَاعِدَ</span> (س ع د) sâlim." },
    { tr: "İsimlerde kalıba bak: <span class=\"ar\">خَادِمٌ</span> (fâil), <span class=\"ar\">مَمْلُوءٌ، مَعْرُوفٌ</span> (mef’ûl), <span class=\"ar\">بَخِيلٌ، سَرِيعٌ، أَحْمَقُ</span> (sıfat-ı müşebbehe)." }
  ],
  kaide: ["اقْرَأِ القِطْعَةَ التَّالِيَةَ، ثُمَّ اسْتَخْرِجْ مِنْهَا الأَفْعَالَ الصَّحِيحَةَ وَالمُعْتَلَّةَ، وَاسْمَ الفَاعِلِ، وَاسْمَ المَفْعُولِ، وَالصِّفَةَ المُشَبَّهَةَ."],
  ex: [
    { type: "reading", num: "٧", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ اسْتَخْرِجِ الأَفْعَالَ الصَّحِيحَةَ وَالمُعْتَلَّةَ", tr: "Hikâyeyi oku; sonra fiilleri ve isimleri ayır.", title: "البَخِيلُ وَالخَادِمُ الأَحْمَقُ",
      text: "حَكَى بَعْضُ النَّاسِ فَقَالَ: كَانَ هُنَاكَ رَجُلٌ بَخِيلٌ، وَكَانَ سَرِيعَ الغَضَبِ، وَإِذَا غَضِبَ كَانَ يَضُرُّ مَا حَوْلَهُ بِيَدَيْهِ وَلِسَانِهِ. وَذَاتَ يَوْمٍ رَأَى صَحْنًا مَمْلُوءًا بِالطَّعَامِ، فَغَضِبَ لِهَذَا الإِسْرَافِ، فَأَخَذَ الصَّحْنَ وَرَمَاهُ مِنَ النَّافِذَةِ. فَرَآهُ خَادِمُهُ، وَكَانَ هَذَا الخَادِمُ مَعْرُوفًا بِشِدَّةِ الحَمَاقَةِ، فَأَخَذَ يَرْمِي الصُّحُونَ مِثْلَهُ. عَجِبَ الرَّجُلُ البَخِيلُ مِنْ هَذَا المَنْظَرِ، وَوَضَعَ يَدَهُ عَلَى قَلْبِهِ، وَأَخَذَ يَصِيحُ عَلَى الخَادِمِ: مَاذَا تَفْعَلُ أَيُّهَا الأَحْمَقُ؟ فَرَدَّ الخَادِمُ: ظَنَنْتُ أَنَّ لَكَ ضُيُوفًا فِي الحَدِيقَةِ يُرِيدُونَ الطَّعَامَ، فَأَرَدْتُ أَنْ أُسَاعِدَكَ فِي نَقْلِ الطَّعَامِ إِلَيْهِمْ.",
      textTr: "Cimri ve Ahmak Hizmetçi. İnsanlardan biri şöyle anlattı: Cimri bir adam vardı, çabuk öfkelenirdi. Öfkelenince elleriyle ve diliyle etrafındakilere zarar verirdi. Bir gün yemekle dolu bir tabak gördü, bu israfa kızdı, tabağı alıp pencereden attı. Hizmetçisi onu gördü; bu hizmetçi ahmaklığıyla tanınırdı. O da onun gibi tabakları atmaya başladı. Cimri adam bu manzaraya şaştı, elini kalbine koydu ve hizmetçiye bağırmaya başladı: \"Ne yapıyorsun ey ahmak?\" Hizmetçi cevap verdi: \"Bahçede yemek isteyen misafirlerin var sandım, yemeği onlara taşımada sana yardım etmek istedim.\"",
      qa: [
        { q: "لِمَاذَا رَمَى الرَّجُلُ الصَّحْنَ مِنَ النَّافِذَةِ؟", a: "لِأَنَّهُ غَضِبَ لِلْإِسْرَافِ.", tr: "Adam tabağı pencereden neden attı? İsrafa kızdığı için." },
        { q: "مَاذَا فَعَلَ الخَادِمُ؟", a: "أَخَذَ يَرْمِي الصُّحُونَ مِثْلَهُ.", tr: "Hizmetçi ne yaptı? Onun gibi tabakları atmaya başladı." },
        { q: "مَاذَا ظَنَّ الخَادِمُ؟", a: "ظَنَّ أَنَّ لِلرَّجُلِ ضُيُوفًا فِي الحَدِيقَةِ يُرِيدُونَ الطَّعَامَ.", tr: "Hizmetçi ne sandı? Adamın bahçede yemek isteyen misafirleri olduğunu." }
      ],
      cls: { opts: SM_OPTS, ar: "الأَفْعَالُ الصَّحِيحَةُ وَالمُعْتَلَّةُ", tr: "Hikâyedeki fiil sahih mi, mu’tel mi? (Tekrar eden fiiller bir kez soruldu.)", items: [
        { s: HL("حَكَى بَعْضُ النَّاسِ", "حَكَى"), a: "m", why: "ح ك ي (يَحْكِي): nâkıs." },
        { s: HL("فَقَالَ: كَانَ هُنَاكَ رَجُلٌ", "قَالَ"), a: "m", why: "ق و ل (يَقُولُ): ecvef." },
        { s: HL("كَانَ هُنَاكَ رَجُلٌ بَخِيلٌ", "كَانَ"), a: "m", why: "ك و ن (يَكُونُ): ecvef." },
        { s: HL("وَإِذَا غَضِبَ", "غَضِبَ"), a: "s", why: "غ ض ب: sâlim." },
        { s: HL("كَانَ يَضُرُّ مَا حَوْلَهُ", "يَضُرُّ"), a: "s", why: "ضَرَّ: ض ر ر, muzâaf." },
        { s: HL("رَأَى صَحْنًا مَمْلُوءًا", "رَأَى"), a: "m", why: "ر ء ي: hemzeli ama sonu illet: nâkıs." },
        { s: HL("فَأَخَذَ الصَّحْنَ", "أَخَذَ"), a: "s", why: "ء خ ذ: mehmûz." },
        { s: HL("وَرَمَاهُ مِنَ النَّافِذَةِ", "رَمَاهُ"), a: "m", why: "رَمَى + هُ: ر م ي, nâkıs." },
        { s: HL("فَأَخَذَ يَرْمِي الصُّحُونَ", "يَرْمِي"), a: "m", why: "يَرْمِي ← رَمَى: nâkıs; muzâride ي görünüyor." },
        { s: HL("عَجِبَ الرَّجُلُ البَخِيلُ", "عَجِبَ"), a: "s", why: "ع ج ب: sâlim." },
        { s: HL("وَوَضَعَ يَدَهُ عَلَى قَلْبِهِ", "وَضَعَ"), a: "m", why: "و ض ع: misâl (baştaki ilk و bağlaç)." },
        { s: HL("وَأَخَذَ يَصِيحُ عَلَى الخَادِمِ", "يَصِيحُ"), a: "m", why: "صَاحَ: ص ي ح, ecvef." },
        { s: HL("مَاذَا تَفْعَلُ أَيُّهَا الأَحْمَقُ؟", "تَفْعَلُ"), a: "s", why: "ف ع ل: sâlim." },
        { s: HL("فَرَدَّ الخَادِمُ", "رَدَّ"), a: "s", why: "ر د د: muzâaf." },
        { s: HL("ظَنَنْتُ أَنَّ لَكَ ضُيُوفًا", "ظَنَنْتُ"), a: "s", why: "ظَنَّ: ظ ن ن, muzâaf; ـتُ gelince şedde açıldı." },
        { s: HL("ضُيُوفًا يُرِيدُونَ الطَّعَامَ", "يُرِيدُونَ"), a: "m", why: "أَرَادَ (mezîd): kök ر و د, ecvef. أَرَدْتُ de öyle." },
        { s: HL("أَنْ أُسَاعِدَكَ", "أُسَاعِدَ"), a: "s", why: "سَاعَدَ (mezîd): kök س ع د, sâlim." }
      ]},
      cls2: { opts: [["f", "İsm-i fâil", "اسْمُ فَاعِلٍ", "mz"], ["m", "İsm-i mef’ûl", "اسْمُ مَفْعُولٍ", "nasb"], ["s", "Sıfat-ı müşebbehe", "صِفَةٌ مُشَبَّهَةٌ", "mi"]], ar: "اسْمُ الفَاعِلِ وَاسْمُ المَفْعُولِ وَالصِّفَةُ المُشَبَّهَةُ", tr: "Hikâyedeki bu isim ism-i fâil mi, ism-i mef’ûl mü, sıfat-ı müşebbehe mi?", items: [
        { s: HL("رَجُلٌ بَخِيلٌ", "بَخِيلٌ"), a: "s", why: "فَعِيلٌ kalıbı, kalıcı sıfat: cimri." },
        { s: HL("وَكَانَ سَرِيعَ الغَضَبِ", "سَرِيعَ"), a: "s", why: "فَعِيلٌ: çabuk." },
        { s: HL("صَحْنًا مَمْلُوءًا بِالطَّعَامِ", "مَمْلُوءًا"), a: "m", why: "مَفْعُولٌ: مَلَأَ ← مَمْلُوءٌ (doldurulmuş)." },
        { s: HL("فَرَآهُ خَادِمُهُ", "خَادِمُهُ"), a: "f", why: "فَاعِلٌ: خَدَمَ ← خَادِمٌ (hizmet eden)." },
        { s: HL("مَعْرُوفًا بِشِدَّةِ الحَمَاقَةِ", "مَعْرُوفًا"), a: "m", why: "مَفْعُولٌ: عَرَفَ ← مَعْرُوفٌ (bilinen)." },
        { s: HL("أَيُّهَا الأَحْمَقُ", "الأَحْمَقُ"), a: "s", why: "أَفْعَلُ kalıbı, kusur bildiren sıfat." },
        { s: HL("وَرَمَاهُ مِنَ النَّافِذَةِ", "النَّافِذَةِ"), a: "f", why: "Kalıp فَاعِلَةٌ (نَفَذَ: geçti). Burada \"pencere\" anlamında isim olmuştur; kalıp olarak ism-i fâildir." }
      ]}
    }
  ]
}
];

// Doğru Fiil oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu, istenen]
var SP_POOL = [
  ["{قَامَ} الوَلَدُ مِنَ النَّوْمِ مُبَكِّرًا.", ["قَامَ", "خَرَجَ", "فَزِعَ"], "ق و م: ecvef", "Çocuk uykudan erken kalktı.", "u1", "Mu’tel fiil"],
  ["{جَرَى} اللَّاعِبُ فِي المَلْعَبِ.", ["جَرَى", "رَكَضَ", "لَعِبَ"], "ج ر ي: nâkıs", "Oyuncu sahada koştu.", "u1", "Mu’tel fiil"],
  ["{يَخْرُجُ} المُدِيرُ مِنَ المَدْرَسَةِ.", ["يَخْرُجُ", "يَعُودُ", "يَمْشِي"], "خ ر ج: sâlim", "Müdür okuldan çıkıyor.", "u1", "Sahih fiil"],
  ["{يَشُدُّ} العَامِلُ الحَبْلَ بِقُوَّةٍ.", ["يَشُدُّ", "يَطْوِي", "يَرْمِي"], "ش د د: muzâaf", "İşçi ipi kuvvetle çekiyor.", "u1", "Sahih fiil"],
  ["{بَاعَ} الرَّجُلُ السَّيَّارَةَ.", ["بَاعَ", "أَخَذَ", "غَسَلَ"], "ب ي ع: ecvef", "Adam arabayı sattı.", "u1", "Mu’tel fiil"],
  ["{نَجَحَ} حُسَيْنٌ فِي الامْتِحَانِ.", ["نَجَحَ", "نَجَا", "فَازَ"], "ن ج ح: sâlim; نَجَا ve فَازَ mu’tel", "Hüseyin sınavda başarılı oldu.", "u1", "Sahih fiil"],
  ["{عَدَّ} التَّاجِرُ النُّقُودَ.", ["عَدَّ", "أَلْقَى", "رَمَى"], "ع د د: muzâaf", "Tüccar paraları saydı.", "u2", "Sahih fiil"],
  ["{ذَهَبَ} مَحْمُودٌ إِلَى المَطَارِ.", ["ذَهَبَ", "وَصَلَ", "جَاءَ"], "ذ ه ب: sâlim", "Mahmûd havaalanına gitti.", "u2", "Sahih fiil"],
  ["{قَدِمَ} المُهَنْدِسُ مِنَ الشَّرِكَةِ.", ["قَدِمَ", "أَتَى", "عَادَ"], "ق د م: sâlim; أَتَى hemzeli ama mu’tel", "Mühendis şirketten geldi.", "u2", "Sahih fiil"],
  ["{يَعْبُدُ} المُؤْمِنُ رَبَّهُ.", ["يَعْبُدُ", "يَدْعُو", "يَرْجُو"], "ع ب د: sâlim", "Mümin Rabbine ibadet ediyor.", "u2", "Sahih fiil"],
  ["{نَصَحَ} المُدِيرُ المُوَظَّفِينَ.", ["نَصَحَ", "رَأَى", "دَعَا"], "ن ص ح: sâlim", "Müdür memurlara nasihat etti.", "u2", "Sahih fiil"],
  ["{أَكَلَ} الطِّفْلُ فِي الغُرْفَةِ.", ["أَكَلَ", "نَامَ", "بَكَى"], "ء ك ل: mehmûz, yani sahih", "Çocuk odada yemek yedi.", "u2", "Sahih fiil"],
  ["{جَمَعَ} شَرِيفٌ الجَرَائِدَ.", ["جَمَعَ", "بَاعَ", "طَوَى"], "ج م ع: sâlim", "Şerîf gazeteleri topladı.", "u2", "Sahih fiil"],
  ["{غَابَتِ} النُّجُومُ فِي السَّمَاءِ.", ["غَابَتِ", "لَمَعَتِ", "ظَهَرَتِ"], "غ ي ب: ecvef", "Yıldızlar gökte kayboldu.", "u3", "Mu’tel fiil"],
  ["{نَالَ} المُوَظَّفُ الجَائِزَةَ.", ["نَالَ", "أَخَذَ", "كَسَبَ"], "ن ي ل: ecvef", "Memur ödülü aldı.", "u3", "Mu’tel fiil"],
  ["{طَارَ} العُصْفُورُ فِي الجَوِّ.", ["طَارَ", "اِرْتَفَعَ", "صَعِدَ"], "ط ي ر: ecvef", "Serçe havada uçtu.", "u3", "Mu’tel fiil"],
  ["{مَاتَ} الرَّجُلُ بَعْدَ عُمْرٍ طَوِيلٍ.", ["مَاتَ", "مَرِضَ", "هَلَكَ"], "م و ت: ecvef", "Adam uzun bir ömürden sonra öldü.", "u3", "Mu’tel fiil"],
  ["{فَازَ} حُسَيْنٌ بِجَائِزَةِ الكُلِّيَّةِ.", ["فَازَ", "حَصَلَ", "ظَفِرَ"], "ف و ز: ecvef", "Hüseyin fakültenin ödülünü kazandı.", "u3", "Mu’tel fiil"],
  ["{طَوَى} الطَّالِبُ الثِّيَابَ.", ["طَوَى", "غَسَلَ", "جَمَعَ"], "ط و ي: lefîf", "Öğrenci elbiseleri katladı.", "u3", "Mu’tel fiil"],
  ["{وَجَدَ} أَحْمَدُ القَلَمَ المَفْقُودَ.", ["وَجَدَ", "أَخَذَ", "طَلَبَ"], "و ج د: misâl", "Ahmed kayıp kalemi buldu.", "u3", "Mu’tel fiil"],
  ["{يَعِيشُ} السَّمَكُ فِي المَاءِ.", ["يَعِيشُ", "يَكْثُرُ", "يَسْبَحُ"], "ع ي ش: ecvef", "Balık suda yaşar.", "u3", "Mu’tel fiil"],
  ["{يَهْدِي} اللهُ مَنْ يَشَاءُ.", ["يَهْدِي", "يَرْزُقُ", "يَغْفِرُ"], "ه د ي: son harf illet", "Allah dilediğine hidayet verir.", "u4", "Nâkıs fiil"],
  ["{وَصَلَ} الحُجَّاجُ إِلَى مَكَّةَ.", ["وَصَلَ", "ذَهَبَ", "رَجَعَ"], "و ص ل: ilk harf illet", "Hacılar Mekke’ye vardı.", "u4", "Misâl fiil"],
  ["{قَرَأَ} الأَبُ الرِّسَالَةَ.", ["قَرَأَ", "كَتَبَ", "فَتَحَ"], "ق ر ء: hemze sonda", "Baba mektubu okudu.", "u4", "Mehmûz fiil"],
  ["{عَادَ} السُّيَّاحُ إِلَى بِلَادِهِمْ.", ["عَادَ", "رَجَعَ", "ذَهَبَ"], "ع و د: orta harf illet", "Turistler ülkelerine döndü.", "u4", "Ecvef fiil"],
  ["{رَمَى} الشَّابُّ الحَجَرَ فِي النَّهْرِ.", ["رَمَى", "قَذَفَ", "وَضَعَ"], "ر م ي: son harf illet; وَضَعَ misâl", "Genç taşı nehre attı.", "u4", "Nâkıs fiil"],
  ["{حَكَمَ} القَاضِي بَيْنَ النَّاسِ بِالعَدْلِ.", ["حَكَمَ", "قَضَى", "وَزَنَ"], "ح ك م: sâlim", "Hâkim insanlar arasında adaletle hükmetti.", "u4", "Sâlim fiil"],
  ["{رَدَّ} الخَادِمُ عَلَى سَيِّدِهِ.", ["رَدَّ", "قَالَ", "صَاحَ"], "ر د د: 2. ve 3. harf aynı", "Hizmetçi efendisine cevap verdi.", "u4", "Muzâaf fiil"],
  ["{نَوَى} الصَّائِمُ الصِّيَامَ.", ["نَوَى", "بَدَأَ", "صَامَ"], "ن و ي: iki illet", "Oruçlu oruca niyet etti.", "u4", "Lefîf fiil"],
  ["{حَكَى} بَعْضُ النَّاسِ فَقَالَ.", ["حَكَى", "ذَكَرَ", "كَتَبَ"], "ح ك ي: nâkıs", "İnsanlardan biri anlattı ve dedi.", "u5", "Mu’tel fiil"],
  ["وَإِذَا {غَضِبَ} كَانَ يَضُرُّ مَا حَوْلَهُ.", ["غَضِبَ", "صَاحَ", "بَكَى"], "غ ض ب: sâlim", "Öfkelenince etrafındakilere zarar verirdi.", "u5", "Sahih fiil"],
  ["فَأَخَذَ الصَّحْنَ وَ{رَمَاهُ} مِنَ النَّافِذَةِ.", ["رَمَاهُ", "قَذَفَهُ", "دَفَعَهُ"], "رَمَى: nâkıs", "Tabağı alıp pencereden attı.", "u5", "Mu’tel fiil"],
  ["{عَجِبَ} الرَّجُلُ مِنْ هَذَا المَنْظَرِ.", ["عَجِبَ", "خَافَ", "بَكَى"], "ع ج ب: sâlim", "Adam bu manzaraya şaştı.", "u5", "Sahih fiil"],
  ["وَأَخَذَ {يَصِيحُ} عَلَى الخَادِمِ.", ["يَصِيحُ", "يَصْرُخُ", "يَغْضَبُ"], "صَاحَ: ص ي ح, ecvef", "Hizmetçiye bağırmaya başladı.", "u5", "Mu’tel fiil"],
  ["فَ{رَدَّ} الخَادِمُ: ظَنَنْتُ...", ["رَدَّ", "قَالَ", "حَكَى"], "ر د د: muzâaf", "Hizmetçi cevap verdi: Sandım ki...", "u5", "Sahih fiil"]
];
var HAFIZA = {
  tur: { name: "Tür ↔ örnek", pairs: [["سَالِمٌ", "نَصَرَ"], ["مَهْمُوزٌ", "قَرَأَ"], ["مُضَعَّفٌ", "مَدَّ"], ["مِثَالٌ", "وَصَلَ"], ["أَجْوَفُ", "قَالَ"], ["نَاقِصٌ", "رَمَى"], ["لَفِيفٌ", "نَوَى"]] },
  kok: { name: "Fiil ↔ kök", pairs: [["قَالَ", "ق و ل"], ["بَاعَ", "ب ي ع"], ["دَعَا", "د ع و"], ["رَمَى", "ر م ي"], ["مَدَّ", "م د د"], ["نَوَى", "ن و ي"], ["وَقَفَ", "و ق ف"], ["قَرَأَ", "ق ر ء"], ["نَامَ", "ن و م"], ["طَارَ", "ط ي ر"], ["وَفَى", "و ف ي"], ["سَأَلَ", "س ء ل"]] },
  tr: { name: "Terim ↔ Türkçe", pairs: [["صَحِيحٌ", "illet harfi yok"], ["مُعْتَلٌّ", "illet harfi var"], ["مَهْمُوزٌ", "kökte hemze"], ["مُضَعَّفٌ", "2. ve 3. harf aynı"], ["مِثَالٌ", "1. harf illet"], ["أَجْوَفُ", "2. harf illet"], ["نَاقِصٌ", "3. harf illet"], ["لَفِيفٌ", "iki illet harfi"], ["سَالِمٌ", "illet, hemze, tekrar yok"], ["حُرُوفُ العِلَّةِ", "elif, vav, yâ"]] }
};
var KARTLAR = [
  ["Fiil kök harflerine göre kaça ayrılır?", "İkiye: sahih (صَحِيحٌ) ve mu’tel (مُعْتَلٌّ)."],
  ["Harf-i illet hangileri?", "Elif, vav, yâ: ا و ي"],
  ["Sahih fiil nedir?", "Kök harflerinde illet harfi olmayan fiil: فَتَحَ، قَرَأَ، مَدَّ"],
  ["Sahihin üç kısmı?", "Sâlim: نَصَرَ · mehmûz: قَرَأَ · muzâaf: مَدَّ"],
  ["Mu’telin dört kısmı?", "Misâl: وَصَلَ · ecvef: قَالَ · nâkıs: رَمَى · lefîf: نَوَى"],
  ["Mehmûz sahih mi?", "Evet. Hemze illet harfi değildir: أَكَلَ، سَأَلَ، قَرَأَ"],
  ["Muzâafı nasıl tanırım?", "Şeddeyi aç: مَدَّ = م د د; ـتُ gelince açılır: مَدَدْتُ"],
  ["قَالَ'deki elifin aslı?", "Vav: يَقُولُ، قَوْلٌ. Kök ق و ل, ecvef."],
  ["بَاعَ'daki elifin aslı?", "Yâ: يَبِيعُ، بَيْعٌ. Kök ب ي ع, ecvef."],
  ["Lefîfin iki çeşidi?", "Makrûn: نَوَى (ن و ي, yan yana) · mefrûk: وَفَى (و ف ي, ayrı)"],
  ["رَأَى hangi tür?", "Hemzeli ama sonu illet (ر ء ي): mu’tel nâkıs."],
  ["Misâlde muzâri?", "Vav çoğu zaman düşer: وَقَفَ ← يَقِفُ، وَجَدَ ← يَجِدُ"]
];
