// ================= VERİ: Mübalağa Sîgası (صِيغَةُ المُبَالَغَةِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "ref.فَعَّال" gibi yazılırsa etikete not eklenir.
var ROLES = {
  ref: { ar: "صِيغَةُ مُبَالَغَةٍ", tr: "Mübalağa sîgası" }, mz: { ar: "اسْمُ فَاعِلٍ", tr: "İsm-i fâil" }, cerr: { ar: "فِعْلٌ", tr: "Fiil" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
// beş vezin: [anahtar, vezin, Türkçe, renk]
var VZ = [["i", "فَعِيلٌ", "fa'îl", "cerr"], ["u", "فَعُولٌ", "fa'ûl", "mz"], ["a", "فَعَّالٌ", "fa''âl", "ref"], ["e", "فَعِلٌ", "fa'il", "mi"], ["m", "مِفْعَالٌ", "mif'âl", "nasb"]];
var VZ_BY = {}; VZ.forEach(function (v) { VZ_BY[v[0]] = v; });
var VZ_OPTS = VZ.map(function (v) { return [v[0], v[2], v[1], "x"]; });
var FB_OPTS = [["f", "İsm-i fâil", "اسْمُ فَاعِلٍ", "mz"], ["b", "Mübalağa sîgası", "صِيغَةُ مُبَالَغَةٍ", "ref"], ["n", "İkisi de değil", "لَيْسَ مِنْهُمَا", "x"]];
var FB_TR = { f: "İsm-i fâil", b: "Mübalağa sîgası", m: "İsm-i mef'ûl", n: "İkisi de değil" };

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^\[(.*)\](.*)$/.exec(w), p = /^\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function PK(q, o, tr, why, k) { var r = o.slice(), a = (k || 0) % o.length; var c = r.splice(0, 1)[0]; r.splice(a, 0, c); return { q: q, o: r, a: a, tr: tr, why: why }; }
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function harfler(w) { return w.match(/[^ً-ْٰ][ً-ْٰ]*/g) || []; }
// sülâsî kökten vezin üret (oyun ve seçenekler için)
function vezinYap(kok, k) {
  var f = kok[0], a = kok[1], l = kok[2];
  return { i: f + "َ" + a + "ِي" + l + "ٌ", u: f + "َ" + a + "ُو" + l + "ٌ", a: f + "َ" + a + "َّا" + l + "ٌ", e: f + "َ" + a + "ِ" + l + "ٌ", m: "مِ" + f + "ْ" + a + "َا" + l + "ٌ" }[k];
}

// Fiiller: [fiil, Türkçe, ism-i fâil, Türkçe fâil, {vezin: [mübalağa, Türkçe]}, kök (sülâsî ise)]
var MB = [
  ["غَفَرَ", "bağışladı", "غَافِرٌ", "bağışlayan", { u: ["غَفُورٌ", "çok bağışlayan"], a: ["غَفَّارٌ", "durmadan bağışlayan"] }, "غفر"],
  ["رَحِمَ", "merhamet etti", "رَاحِمٌ", "merhamet eden", { i: ["رَحِيمٌ", "çok merhametli"] }, "رحم"],
  ["صَبَرَ", "sabretti", "صَابِرٌ", "sabreden", { u: ["صَبُورٌ", "çok sabırlı"], a: ["صَبَّارٌ", "çok sabırlı"] }, "صبر"],
  ["شَكَرَ", "şükretti", "شَاكِرٌ", "şükreden", { u: ["شَكُورٌ", "çok şükreden"] }, "شكر"],
  ["عَلِمَ", "bildi", "عَالِمٌ", "bilen", { i: ["عَلِيمٌ", "her şeyi bilen"], a: ["عَلَّامٌ", "çok bilgili"] }, "علم"],
  ["سَمِعَ", "işitti", "سَامِعٌ", "işiten", { i: ["سَمِيعٌ", "her şeyi işiten"], a: ["سَمَّاعٌ", "çok dinleyen"] }, "سمع"],
  ["حَذِرَ", "sakındı", "حَاذِرٌ", "sakınan", { e: ["حَذِرٌ", "çok dikkatli"] }, "حذر"],
  ["فَطِنَ", "sezdi, anladı", "فَاطِنٌ", "sezen", { e: ["فَطِنٌ", "çok zeki"] }, "فطن"],
  ["تَابَ", "tövbe etti", "تَائِبٌ", "tövbe eden", { a: ["تَوَّابٌ", "çok tövbe eden; tövbeleri çokça kabul eden"] }, "توب"],
  ["أَكَلَ", "yedi", "آكِلٌ", "yiyen", { u: ["أَكُولٌ", "obur"], a: ["أَكَّالٌ", "çok yiyen"] }, "أكل"],
  ["كَذَبَ", "yalan söyledi", "كَاذِبٌ", "yalancı", { u: ["كَذُوبٌ", "çok yalancı"], a: ["كَذَّابٌ", "çok yalancı"] }, "كذب"],
  ["صَدَقَ", "doğru söyledi", "صَادِقٌ", "doğru sözlü", { u: ["صَدُوقٌ", "her zaman doğru sözlü"] }, "صدق"],
  ["رَزَقَ", "rızık verdi", "رَازِقٌ", "rızık veren", { a: ["رَزَّاقٌ", "bol rızık veren"] }, "رزق"],
  ["فَتَحَ", "açtı", "فَاتِحٌ", "açan", { a: ["فَتَّاحٌ", "çokça açan, hükmeden"] }, "فتح"],
  ["ظَلَمَ", "zulmetti", "ظَالِمٌ", "zalim", { u: ["ظَلُومٌ", "çok zalim"] }, "ظلم"],
  ["كَتَمَ", "gizledi", "كَاتِمٌ", "gizleyen", { u: ["كَتُومٌ", "sır saklayan"] }, "كتم"],
  ["تَرَكَ", "bıraktı", "تَارِكٌ", "bırakan", { a: ["تَرَّاكٌ", "hep terk eden"] }, "ترك"],
  ["بَصُرَ", "gördü", "بَاصِرٌ", "gören", { i: ["بَصِيرٌ", "her şeyi gören"] }, "بصر"],
  ["أَقْدَمَ", "atıldı, cesaret etti", "مُقْدِمٌ", "atılan", { m: ["مِقْدَامٌ", "çok cesur"] }, null],
  ["أَكْثَرَ", "çok yaptı", "مُكْثِرٌ", "çok yapan", { m: ["مِكْثَارٌ", "çok konuşan"] }, null],
  ["أَعْطَى", "verdi", "مُعْطٍ", "veren", { m: ["مِعْطَاءٌ", "çok cömert"] }, null]
];
var MAK_V = [0, 1, 2, 4, 5, 6, 8, 10, 13, 18, 19, 20];
var MESLEK = [["قَصَّابٌ", "kasap"], ["جَزَّارٌ", "kasap"], ["لَحَّامٌ", "kasap (et satan)"], ["خَبَّازٌ", "fırıncı"], ["فَلَّاحٌ", "çiftçi"], ["نَجَّارٌ", "marangoz"], ["حَدَّادٌ", "demirci"], ["نَقَّاشٌ", "nakkaş, boyacı"], ["بَقَّالٌ", "bakkal"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · ANLAM
{
  id: "u1", no: 1, ar: "صِيغَةُ المُبَالَغَةِ", tr: "Mübalağa Sîgası Nedir?", short: "Anlam", col: "ref", legend: ["ref", "mz"],
  goals: ["Mübalağa sîgasının ism-i fâilin anlamını güçlendirdiğini bilmek: غَافِرٌ ← غَفُورٌ", "Mübalağanın çoğunlukla üç harfli fiilden yapıldığını bilmek", "Bir cümlede mübalağa sîgasını ism-i fâilden ayırmak"],
  examples: [
    { s: "اللهُ:- / غَفَّارٌ:ref.فَعَّال / لِلتَّائِبِ:mz", tr: "Allah tövbe edeni çokça bağışlar.", why: "غَفَّارٌ mübalağa; التَّائِبُ ism-i fâil." },
    { s: "النَّبِيُّ:- / رَحِيمٌ:ref.فَعِيل / بِالمُؤْمِنِينَ:-", tr: "Peygamber müminlere karşı çok merhametlidir." },
    { s: "أَحْمَدُ:- / رَجُلٌ:- / صَبُورٌ:ref.فَعُول", tr: "Ahmed çok sabırlı bir adamdır." },
    { s: "هَذَا:- / وَلَدٌ:- / حَذِرٌ:ref.فَعِل", tr: "Bu çok dikkatli bir çocuktur." }
  ],
  rules: [
    { tr: "<b class=\"r-ref\">Mübalağa sîgası</b>, ism-i fâilin anlamını <b>çokluk ve süreklilik</b> katarak güçlendiren müştak bir isimdir." },
    { tr: "İsm-i fâil işi yapanı söyler; mübalağa onu <b>çok</b> ya da <b>hep</b> yapanı söyler.", ex: ["غَافِرٌ: bağışlayan", "غَفُورٌ: çok bağışlayan", "غَفَّارٌ: durmadan bağışlayan"] },
    { tr: "Çoğunlukla <b>üç harfli</b> fiillerden yapılır; üç harften fazla fiilden nadiren: <span class=\"ar\">أَقْدَمَ ← مِقْدَامٌ</span>." },
    { tr: "Allah'ın isimlerinin çoğu mübalağa kalıbındadır: <span class=\"ar\">الغَفُورُ، الرَّحِيمُ، العَلِيمُ، التَّوَّابُ، الرَّزَّاقُ، الفَتَّاحُ</span>." },
    { tr: "İsm-i fâil gibi mef'ûl alabilir: <span class=\"ar\">اللهُ رَزَّاقٌ عِبَادَهُ</span>, ya da لِـ ile: <span class=\"ar\">سَمَّاعٌ لِلْقُرْآنِ</span>." }
  ],
  kaide: ["صِيغَةُ المُبَالَغَةِ: اسْمٌ يُشْتَقُّ مِنَ الأَفْعَالِ لِلدَّلَالَةِ عَلَى مَعْنَى اسْمِ الفَاعِلِ بِقَصْدِ المُبَالَغَةِ. تَأْتِي صِيغَةُ المُبَالَغَةِ مِنَ الأَفْعَالِ الثُّلَاثِيَّةِ، وَنَادِرًا مَا تَأْتِي مِنَ الأَفْعَالِ غَيْرِ الثُّلَاثِيَّةِ، مِثْلُ: أَقْدَمَ – مِقْدَامٌ."],
  ex: [
    { type: "pick", extra: true, ar: "أَيُّهَا أَقْوَى مَعْنًى؟", tr: "Hangisi \"çok, hep\" anlamı taşıyor? (Mübalağa sîgası)", items: [
      PK("bağışlamak", ["غَفُورٌ", "غَافِرٌ", "مَغْفُورٌ"], "çok bağışlayan", "غَافِرٌ ism-i fâil, مَغْفُورٌ ism-i mef'ûl.", 1),
      PK("bilmek", ["عَلِيمٌ", "عَالِمٌ", "مَعْلُومٌ"], "her şeyi bilen", "فَعِيل: عَلِيمٌ.", 2),
      PK("sabretmek", ["صَبُورٌ", "صَابِرٌ", "صَبْرٌ"], "çok sabırlı", "فَعُول: صَبُورٌ. صَبْرٌ masdar.", 0),
      PK("yalan söylemek", ["كَذَّابٌ", "كَاذِبٌ", "كَذِبٌ"], "çok yalancı", "فَعَّال: كَذَّابٌ.", 1),
      PK("dikkat etmek, sakınmak", ["حَذِرٌ", "حَاذِرٌ", "حَذَرٌ"], "çok dikkatli", "فَعِل: حَذِرٌ (ayn kesreli). حَذَرٌ masdar.", 2),
      PK("vermek", ["مِعْطَاءٌ", "مُعْطٍ", "عَطَاءٌ"], "çok cömert", "مِفْعَال: مِعْطَاءٌ (أَعْطَى'dan, nadir).", 0)
    ]},
    { type: "combo", extra: true, ar: "حَوِّلِ اسْمَ الفَاعِلِ إِلَى صِيغَةِ المُبَالَغَةِ", tr: "Cümledeki ism-i fâili parantezdeki vezinle mübalağaya çevir.", exHtml: "<span class=\"ar\">اللهُ غَافِرٌ لِلذُّنُوبِ (فَعَّال) ← اللهُ غَفَّارٌ لِلذُّنُوبِ</span>", items: [
      CB("المُؤْمِنُ صَابِرٌ. <span class=\"muted\">(فَعُول)</span>", ["المُؤْمِنُ", ["صَبُورٌ", "صَبِيرٌ", "صَبَّارٌ"], "."], [0], "Mümin çok sabırlıdır.", "فَعُول: صَبُورٌ."),
      CB("اللهُ عَالِمٌ بِكُلِّ شَيْءٍ. <span class=\"muted\">(فَعِيل)</span>", ["اللهُ", ["عَلُومٌ", "عَلِيمٌ", "مِعْلَامٌ"], "بِكُلِّ شَيْءٍ."], [1], "Allah her şeyi bilendir.", "فَعِيل: عَلِيمٌ."),
      CB("اللهُ رَازِقٌ عِبَادَهُ. <span class=\"muted\">(فَعَّال)</span>", ["اللهُ", ["رَزُوقٌ", "رَزِيقٌ", "رَزَّاقٌ"], "عِبَادَهُ."], [2], "Allah kullarına bol rızık verendir.", "فَعَّال: رَزَّاقٌ."),
      CB("الحَارِسُ حَاذِرٌ. <span class=\"muted\">(فَعِل)</span>", ["الحَارِسُ", ["حَذِرٌ", "حَذِيرٌ", "حَذُورٌ"], "."], [0], "Bekçi çok dikkatlidir.", "فَعِل: حَذِرٌ."),
      CB("هُوَ شَاكِرٌ لِرَبِّهِ. <span class=\"muted\">(فَعُول)</span>", ["هُوَ", ["شَكَّارٌ", "شَكُورٌ", "شَكِيرٌ"], "لِرَبِّهِ."], [1], "O Rabbine çok şükredendir.", "فَعُول: شَكُورٌ."),
      CB("اللهُ تَائِبٌ عَلَى عِبَادِهِ. <span class=\"muted\">(فَعَّال)</span>", ["اللهُ", ["تَئُوبٌ", "تَوِيبٌ", "تَوَّابٌ"], "عَلَى عِبَادِهِ."], [2], "Allah kullarının tövbesini çokça kabul edendir.", "فَعَّال: تَوَّابٌ (ortadaki و şeddeli).")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · BEŞ VEZİN
{
  id: "u2", no: 2, ar: "أَوْزَانُ صِيغَةِ المُبَالَغَةِ", tr: "Beş Vezin", short: "Vezinler", col: "cerr", legend: ["ref"],
  goals: ["Beş vezni ezberlemek: فَعِيل، فَعُول، فَعَّال، فَعِل، مِفْعَال", "Bir kelimenin hangi vezinde olduğunu söylemek", "Bazı meslek adlarının فَعَّال vezninde olduğunu bilmek"],
  examples: [
    { s: "رَحِيمٌ:ref.فَعِيل / عَلِيمٌ:ref.فَعِيل", tr: "çok merhametli · her şeyi bilen" },
    { s: "غَفُورٌ:ref.فَعُول / شَكُورٌ:ref.فَعُول", tr: "çok bağışlayan · çok şükreden" },
    { s: "تَوَّابٌ:ref.فَعَّال / غَفَّارٌ:ref.فَعَّال", tr: "tövbeleri çok kabul eden · durmadan bağışlayan" },
    { s: "حَذِرٌ:ref.فَعِل / فَطِنٌ:ref.فَعِل", tr: "çok dikkatli · çok zeki" },
    { s: "مِكْثَارٌ:ref.مِفْعَال / مِقْدَامٌ:ref.مِفْعَال", tr: "çok konuşan · çok cesur" }
  ],
  rules: [
    { tr: "<b>فَعِيل</b>: ikinci harften sonra <span class=\"ar\">ي</span>.", ex: ["رَحِيمٌ", "عَلِيمٌ", "سَمِيعٌ", "بَصِيرٌ"] },
    { tr: "<b>فَعُول</b>: ikinci harften sonra <span class=\"ar\">و</span>.", ex: ["غَفُورٌ", "شَكُورٌ", "صَبُورٌ", "ظَلُومٌ"] },
    { tr: "<b>فَعَّال</b>: ikinci harf <b>şeddeli</b>, ardından elif.", ex: ["تَوَّابٌ", "غَفَّارٌ", "رَزَّاقٌ", "فَتَّاحٌ"] },
    { tr: "<b>فَعِل</b>: ikinci harf <b>kesreli</b>, uzatma yok.", ex: ["حَذِرٌ", "فَطِنٌ"] },
    { tr: "<b>مِفْعَال</b>: başa kesreli <span class=\"ar\">مِـ</span>, ikinci harften sonra elif.", ex: ["مِكْثَارٌ", "مِقْدَامٌ", "مِعْطَاءٌ"] },
    { tr: "Not: Bazı meslek ve zanaat adları <span class=\"ar\">فَعَّال</span> veznindedir: <span class=\"ar\">قَصَّابٌ (جَزَّارٌ، لَحَّامٌ)، خَبَّازٌ، فَلَّاحٌ، نَجَّارٌ، حَدَّادٌ، نَقَّاشٌ، بَقَّالٌ</span>." },
    { tr: "Dikkat: <span class=\"ar\">مِفْتَاحٌ</span> (anahtar) de مِفْعَال veznindedir ama alet ismidir, mübalağa değil. Anlama bak." }
  ],
  kaide: [
    "أَوْزَانُ صِيغَةِ المُبَالَغَةِ: ١ ـ فَعِيلٌ: رَحِيمٌ، عَلِيمٌ. ٢ ـ فَعُولٌ: غَفُورٌ، شَكُورٌ. ٣ ـ فَعَّالٌ: تَوَّابٌ، غَفَّارٌ. ٤ ـ فَعِلٌ: حَذِرٌ، فَطِنٌ. ٥ ـ مِفْعَالٌ: مِكْثَارٌ، مِقْدَامٌ.",
    "مُلَاحَظَةٌ: بَعْضُ أَسْمَاءِ المِهَنِ وَالحِرَفِ تَأْتِي عَلَى وَزْنِ صِيغَةِ المُبَالَغَةِ: قَصَّابٌ (جَزَّارٌ – لَحَّامٌ)، خَبَّازٌ، فَلَّاحٌ، نَجَّارٌ، حَدَّادٌ، نَقَّاشٌ، بَقَّالٌ."
  ],
  ex: [
    { type: "classify", extra: true, opts: VZ_OPTS, ar: "عَلَى أَيِّ وَزْنٍ؟", tr: "Kelime hangi vezinde?", items: [
      { s: "رَحِيمٌ", a: "i", why: "رَ حِ يـ مٌ: فَعِيل." }, { s: "شَكُورٌ", a: "u", why: "فَعُول." }, { s: "غَفَّارٌ", a: "a", why: "فَعَّال (şedde)." },
      { s: "حَذِرٌ", a: "e", why: "فَعِل." }, { s: "مِقْدَامٌ", a: "m", why: "مِفْعَال." }, { s: "سَمِيعٌ", a: "i", why: "فَعِيل." },
      { s: "ظَلُومٌ", a: "u", why: "فَعُول." }, { s: "رَزَّاقٌ", a: "a", why: "فَعَّال." }, { s: "فَطِنٌ", a: "e", why: "فَعِل." },
      { s: "مِعْطَاءٌ", a: "m", why: "مِفْعَال." }, { s: "بَصِيرٌ", a: "i", why: "فَعِيل." }, { s: "كَتُومٌ", a: "u", why: "فَعُول." },
      { s: "خَبَّازٌ", a: "a", why: "فَعَّال (meslek)." }, { s: "صَدُوقٌ", a: "u", why: "فَعُول." }, { s: "مِكْثَارٌ", a: "m", why: "مِفْعَال." }
    ]},
    { type: "pick", extra: true, ar: "أَسْمَاءُ المِهَنِ عَلَى وَزْنِ فَعَّالٍ", tr: "Mesleğin Arapçası hangisi? (فَعَّال vezni)", items: [
      PK("ekmek yapan (fırıncı)", ["خَبَّازٌ", "خَابِزٌ", "مَخْبَزٌ"], "fırıncı", "خَبَزَ ← خَبَّازٌ. مَخْبَزٌ fırın (yer).", 0),
      PK("marangoz", ["نَجَّارٌ", "نَاجِرٌ", "مِنْجَرٌ"], "marangoz", "نَجَّارٌ.", 1),
      PK("demirci", ["حَدَّادٌ", "حَدِيدٌ", "حَادٌّ"], "demirci", "حَدَّادٌ. حَدِيدٌ demir.", 2),
      PK("çiftçi", ["فَلَّاحٌ", "فَالِحٌ", "فَلَاحٌ"], "çiftçi", "فَلَّاحٌ. فَلَاحٌ kurtuluş.", 0),
      PK("kasap", ["قَصَّابٌ", "قَاصِبٌ", "قَصَبٌ"], "kasap", "قَصَّابٌ (جَزَّارٌ، لَحَّامٌ da olur).", 1),
      PK("bakkal", ["بَقَّالٌ", "بَاقِلٌ", "بَقْلٌ"], "bakkal", "بَقَّالٌ.", 2)
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · ÂYET VE CÜMLELER
{
  id: "u3", no: 3, ar: "عَيِّنْ صِيغَةَ المُبَالَغَةِ", tr: "Âyetlerde ve Cümlelerde", short: "Bulma", col: "mz", legend: ["ref", "mz"],
  goals: ["Âyet ve hadislerde mübalağa sîgasını bulmak", "Çoğul mübalağaları tanımak: سَمَّاعُونَ، خَطَّاؤُونَ", "İsm-i fâil (فَاطِرُ، الحَارِسُ) ve ism-i mef'ûl (مَحْبُوبٌ) tuzaklarına düşmemek"],
  examples: [
    { s: "﴿سَمَّاعُونَ:ref.فَعَّال / لِلْكَذِبِ:- / أَكَّالُونَ:ref.فَعَّال / لِلسُّحْتِ﴾:-", tr: "Yalana çok kulak verenler, haramı çok yiyenler." },
    { s: "﴿فَاطِرُ:mz / السَّمَاوَاتِ:- / ...:- / وَهُوَ:- / السَّمِيعُ:ref.فَعِيل / البَصِيرُ﴾:ref.فَعِيل", tr: "Gökleri yaratan... O her şeyi işiten, her şeyi görendir." },
    { s: "كُلُّكُمْ:- / خَطَّاؤُونَ:ref.فَعَّال", tr: "Hepiniz çok hata edersiniz." }
  ],
  rules: [
    { tr: "Mübalağa sîgası da çoğul olabilir: <span class=\"ar\">سَمَّاعُونَ، أَكَّالُونَ، خَطَّاؤُونَ، التَّوَّابُونَ</span>." },
    { tr: "Başına ال gelebilir ya da tenvinli olabilir: <span class=\"ar\">الغَفُورُ · غَفَّارًا</span>." },
    { tr: "Tuzaklar: <span class=\"ar\">فَاطِرُ، العَاقِلُ، الحَارِسُ، التَّاجِرُ</span> ism-i fâil; <span class=\"ar\">مَحْبُوبٌ</span> ism-i mef'ûl." }
  ],
  kaide: ["عَيِّنْ صِيغَةَ المُبَالَغَةِ فِي الآيَاتِ وَالأَحَادِيثِ وَالجُمَلِ."],
  ex: [
    { type: "find", target: "y", num: "١ (أ)", ar: "عَيِّنْ صِيغَةَ المُبَالَغَةِ فِيمَا يَلِي", tr: "Âyet ve hadislerde mübalağa sîgasına dokun. Bazılarında birden fazla var.", items: [
      W("﴿[سَمَّاعُونَ] لِلْكَذِبِ [أَكَّالُونَ] لِلسُّحْتِ﴾", "Yalana çok kulak verenler, haramı çok yiyenler. (Mâide 5/42)", "سَمَّاعٌ ← سَمِعَ; أَكَّالٌ ← أَكَلَ (فَعَّال, çoğul)."),
      W("﴿فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ [غَفَّارًا]﴾", "Dedim ki: Rabbinizden bağışlanma dileyin, çünkü O çok bağışlayandır. (Nûh 71/10)", "غَفَّارٌ: فَعَّال."),
      W("﴿وَرَبُّكَ [الغَفُورُ] ذُو الرَّحْمَةِ﴾", "Rabbin çok bağışlayandır, rahmet sahibidir. (Kehf 18/58)", "غَفُورٌ: فَعُول. الرَّحْمَةُ masdar."),
      W("﴿فَاطِرُ السَّمَاوَاتِ وَالأَرْضِ جَعَلَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا وَمِنَ الأَنْعَامِ أَزْوَاجًا يَذْرَؤُكُمْ فِيهِ لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ [السَّمِيعُ] [البَصِيرُ]﴾", "Gökleri ve yeri yaratandır; size kendinizden eşler, hayvanlardan da eşler yarattı; sizi bununla çoğaltır. O'nun benzeri hiçbir şey yoktur; O her şeyi işitendir, görendir. (Şûrâ 42/11)", "سَمِيعٌ، بَصِيرٌ: فَعِيل. فَاطِرُ ism-i fâildir."),
      W("﴿قُلْ يَجْمَعُ بَيْنَنَا رَبُّنَا ثُمَّ يَفْتَحُ بَيْنَنَا بِالحَقِّ وَهُوَ [الفَتَّاحُ] [العَلِيمُ]﴾", "De ki: Rabbimiz bizi bir araya getirecek, sonra aramızda hak ile hükmedecek. O, hakkıyla hükmeden ve her şeyi bilendir. (Sebe' 34/26)", "فَتَّاحٌ: فَعَّال; عَلِيمٌ: فَعِيل."),
      W("قَالَ النَّبِيُّ ﷺ: كُلُّكُمْ [خَطَّاؤُونَ]، وَخَيْرُ [الخَطَّائِينَ] [التَّوَّابُونَ].", "Hepiniz çok hata edersiniz; çok hata edenlerin en hayırlısı çok tövbe edenlerdir.", "خَطَّاءٌ ← خَطِئَ; تَوَّابٌ ← تَابَ (فَعَّال, çoğul).")
    ]},
    { type: "find", target: "y", num: "١ (ب)", ar: "عَيِّنْ صِيغَةَ المُبَالَغَةِ فِيمَا يَلِي", tr: "Cümlelerde mübalağa sîgasına dokun. İsm-i fâil ve ism-i mef'ûl hedef değil.", items: [
      W("خَالِدٌ [رَحِيمٌ] بِالضُّعَفَاءِ.", "Hâlid zayıflara karşı çok merhametlidir.", "رَحِيمٌ: فَعِيل."),
      W("العَاقِلُ [تَرَّاكٌ] لِلسُّوءِ.", "Akıllı kişi kötülüğü hep terk eder.", "تَرَّاكٌ: فَعَّال. العَاقِلُ ism-i fâildir."),
      W("المُؤْمِنُ [صَبُورٌ] عِنْدَ الشَّدَائِدِ.", "Mümin sıkıntılarda çok sabırlıdır.", "صَبُورٌ: فَعُول."),
      W("اللهُ [رَزَّاقٌ] عِبَادَهُ.", "Allah kullarına bol rızık verendir.", "رَزَّاقٌ: فَعَّال; عِبَادَهُ onun mef'ûlü."),
      W("مُصْطَفَى [عَلِيمٌ] بِالمَسْأَلَةِ.", "Mustafa meseleyi çok iyi bilir.", "عَلِيمٌ: فَعِيل."),
      W("المُؤْمِنُ [تَوَّابٌ] إِلَى رَبِّهِ.", "Mümin Rabbine çokça tövbe eder.", "تَوَّابٌ: فَعَّال."),
      W("الإِنْسَانُ [ظَلُومٌ] نَفْسَهُ.", "İnsan kendine çok zulmeder.", "ظَلُومٌ: فَعُول."),
      W("هَذَا الإِنْسَانُ [أَكُولٌ].", "Bu insan oburdur.", "أَكُولٌ: فَعُول."),
      W("حَسَنٌ [سَمَّاعٌ] لِلْقُرْآنِ الكَرِيمِ.", "Hasan Kur'an'ı çok dinler.", "سَمَّاعٌ: فَعَّال. الكَرِيمُ فَعِيل kalıbında ama sıfat-ı müşebbehedir."),
      W("جَمَالٌ رَجُلٌ [كَتُومٌ] لِلسِّرِّ.", "Cemal sır saklayan bir adamdır.", "كَتُومٌ: فَعُول."),
      W("المُؤْمِنُ [شَكُورٌ] عِنْدَ النِّعْمَةِ [وَصَبُورٌ] عِنْدَ البَلَاءِ.", "Mümin nimette çok şükreder, belada çok sabreder.", "شَكُورٌ، صَبُورٌ: فَعُول."),
      W("التَّاجِرُ [الصَّدُوقُ] مَحْبُوبٌ مِنَ النَّاسِ.", "Doğru sözlü tüccar insanlarca sevilir.", "صَدُوقٌ: فَعُول. التَّاجِرُ ism-i fâil, مَحْبُوبٌ ism-i mef'ûl."),
      W("حَارِسُ المَصْنَعِ رَجُلٌ [حَذِرٌ].", "Fabrikanın bekçisi çok dikkatli bir adamdır.", "حَذِرٌ: فَعِل. حَارِسٌ ism-i fâildir."),
      W("أَحْمَدُ رَجُلٌ [فَطِنٌ] [وَمِعْطَاءٌ].", "Ahmed çok zeki ve çok cömert bir adamdır.", "فَطِنٌ: فَعِل; مِعْطَاءٌ: مِفْعَال.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ: الصَّبْرُ", tr: "Okuma: Sabır", short: "Okuma", col: "mi", legend: ["ref", "mz"],
  goals: ["Bir metinde ism-i fâil ile mübalağa sîgasını ayırmak", "صَابِرٌ (sabreden) ile صَبُورٌ (çok sabırlı) farkını anlamak", "مِفْتَاحٌ gibi مِفْعَال vezninde ama mübalağa olmayan kelimeyi fark etmek"],
  examples: [
    { s: "فَالمُؤْمِنُ:mz / صَبُورٌ:ref.فَعُول / شَكُورٌ:ref.فَعُول / لِرَبِّهِ:-", tr: "Mümin çok sabırlı, Rabbine çok şükredendir." },
    { s: "المُسْلِمُ:mz / الصَّابِرُ:mz / يَشْعُرُ:- / بِأَنَّ:- / اللهَ:- / مَعَهُ:-", tr: "Sabreden Müslüman Allah'ın kendisiyle olduğunu hisseder." },
    { s: "الصَّبْرُ:- / مِفْتَاحُ:- / الفَرَجِ:-", tr: "Sabır ferahlığın anahtarıdır.", why: "مِفْتَاحٌ alet ismidir, mübalağa değil." }
  ],
  rules: [
    { tr: "<span class=\"ar\">صَابِرٌ</span>: sabreden (ism-i fâil). <span class=\"ar\">صَبُورٌ</span>: çok, her zaman sabreden (mübalağa)." },
    { tr: "<span class=\"ar\">المُؤْمِنُ، المُسْلِمُ</span>: gayr-i sülâsî fiillerden ism-i fâil (آمَنَ، أَسْلَمَ)." },
    { tr: "<span class=\"ar\">مِفْتَاحٌ</span> مِفْعَال veznindedir ama \"açmaya yarayan alet\" demektir; mübalağa sayılmaz." }
  ],
  kaide: ["اسْتَخْرِجْ مِنَ النَّصِّ: اسْمَ الفَاعِلِ وَصِيغَةَ المُبَالَغَةِ."],
  ex: [
    { type: "reading", num: "٢", ar: "اقْرَأِ النَّصَّ التَّالِيَ", tr: "Metni oku; sonra kelimeleri sınıflandır.", title: "الصَّبْرُ",
      text: "الصَّبْرُ حَبْسُ اللِّسَانِ وَالقَلْبِ وَالنَّفْسِ وَالجَوَارِحِ عَنِ الشَّكْوَى وَالغَضَبِ، وَهُوَ أَنْوَاعٌ كَثِيرَةٌ، مِنْهَا: الصَّبْرُ عَلَى الطَّاعَةِ، وَالصَّبْرُ عَنِ المَعْصِيَةِ، وَالصَّبْرُ عَلَى المَرَضِ، وَالصَّبْرُ عَلَى المُصِيبَةِ، وَالصَّبْرُ عَلَى الفَقْرِ، وَالصَّبْرُ عَلَى أَذَى النَّاسِ... وَالصَّبْرُ مِفْتَاحُ النَّجَاةِ وَالخَلَاصِ مِنْ كُلِّ مُصِيبَةٍ وَبَلَاءٍ، قَالَ عَلَيْهِ الصَّلَاةُ وَالسَّلَامُ: «الصَّبْرُ مِفْتَاحُ الفَرَجِ». وَكَذَلِكَ الصَّبْرُ مِفْتَاحُ الجَنَّةِ. قَالَ الرَّسُولُ ﷺ: «مَنْ صَبَرَ ظَفِرَ». وَالصَّبْرُ المَطْلُوبُ هُوَ الصَّبْرُ فِي بِدَايَةِ المُصِيبَةِ؛ لِأَنَّ النَّبِيَّ ﷺ قَالَ: «الصَّبْرُ عِنْدَ الصَّدْمَةِ الأُولَى». فَالمُؤْمِنُ صَبُورٌ، شَكُورٌ لِرَبِّهِ. وَالصَّبْرُ يَدُلُّ عَلَى إِيمَانِ العَبْدِ بِالقَضَاءِ وَالقَدَرِ. المُسْلِمُ الصَّابِرُ يَشْعُرُ بِأَنَّ اللهَ مَعَهُ. قَالَ اللهُ تَعَالَى: ﴿وَاصْبِرُوا إِنَّ اللهَ مَعَ الصَّابِرِينَ﴾ (الأنفال 8/46).",
      textTr: "Sabır. Sabır; dili, kalbi, nefsi ve organları şikâyetten ve öfkeden alıkoymaktır. Birçok çeşidi vardır: itaatte sabır, günahtan uzak durmada sabır, hastalığa sabır, musibete sabır, fakirliğe sabır, insanların eziyetine sabır... Sabır her musibetten ve beladan kurtuluşun anahtarıdır. Peygamber (s.a.v.): \"Sabır ferahlığın anahtarıdır\" buyurdu. Sabır aynı zamanda cennetin anahtarıdır. Resûlullah (s.a.v.): \"Sabreden zafere ulaşır\" buyurdu. İstenen sabır, musibetin başındaki sabırdır; çünkü Peygamber (s.a.v.): \"Sabır, ilk sarsıntı anındadır\" buyurdu. Mümin çok sabırlı, Rabbine çok şükredendir. Sabır, kulun kazâ ve kadere imanını gösterir. Sabreden Müslüman Allah'ın kendisiyle beraber olduğunu hisseder. Allah Teâlâ: \"Sabredin, şüphesiz Allah sabredenlerle beraberdir\" buyurur. (Enfâl 8/46)",
      qa: [
        { q: "مَا الصَّبْرُ؟", a: "الصَّبْرُ حَبْسُ اللِّسَانِ وَالقَلْبِ وَالنَّفْسِ وَالجَوَارِحِ عَنِ الشَّكْوَى وَالغَضَبِ.", tr: "Sabır nedir? Dili, kalbi, nefsi ve organları şikâyet ve öfkeden alıkoymaktır." },
        { q: "مَتَى يَكُونُ الصَّبْرُ المَطْلُوبُ؟", a: "يَكُونُ فِي بِدَايَةِ المُصِيبَةِ، عِنْدَ الصَّدْمَةِ الأُولَى.", tr: "İstenen sabır ne zamandır? Musibetin başında, ilk sarsıntı anında." },
        { q: "مَعَ مَنْ يَكُونُ اللهُ؟", a: "إِنَّ اللهَ مَعَ الصَّابِرِينَ.", tr: "Allah kimlerle beraberdir? Sabredenlerle." }
      ],
      cls: { opts: FB_OPTS, ar: "اسْتَخْرِجْ مِنَ النَّصِّ: اسْمَ الفَاعِلِ وَصِيغَةَ المُبَالَغَةِ", tr: "Bu kelime ism-i fâil mi, mübalağa sîgası mı, yoksa ikisi de değil mi?", items: [
        { s: "صَبُورٌ", a: "b", why: "فَعُول: çok sabırlı." },
        { s: "شَكُورٌ", a: "b", why: "فَعُول: çok şükreden." },
        { s: "الصَّابِرُ", a: "f", why: "فَاعِل: sabreden." },
        { s: "الصَّابِرِينَ", a: "f", why: "صَابِرٌ'ın çoğulu: ism-i fâil." },
        { s: "المُؤْمِنُ", a: "f", why: "آمَنَ – يُؤْمِنُ – مُؤْمِنٌ: gayr-i sülâsîden ism-i fâil." },
        { s: "المُسْلِمُ", a: "f", why: "أَسْلَمَ – يُسْلِمُ – مُسْلِمٌ." },
        { s: "مِفْتَاحُ", a: "n", why: "مِفْعَال vezninde ama alet ismi (anahtar)." },
        { s: "المَطْلُوبُ", a: "n", why: "İsm-i mef'ûl (طَلَبَ)." },
        { s: "الصَّبْرُ", a: "n", why: "Masdar." },
        { s: "الغَضَبِ", a: "n", why: "Masdar." },
        { s: "كَثِيرَةٌ", a: "n", why: "فَعِيل kalıbında ama sıfat-ı müşebbehe; \"çok yapan\" anlamı yok." },
        { s: "الرَّسُولُ", a: "n", why: "فَعُول kalıbında ama \"gönderilen\" anlamında; mübalağa değil." }
      ]}
    }
  ]
}
];

// Doğru Sîga oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var MB_POOL = [
  ["اللهُ {غَفَّارٌ} لِلتَّائِبِ.", ["غَفَّارٌ", "غَافِرٌ", "مَغْفُورٌ"], "durmadan bağışlayan → فَعَّال", "Allah tövbe edeni çokça bağışlar.", "u1"],
  ["النَّبِيُّ {رَحِيمٌ} بِالمُؤْمِنِينَ.", ["رَحِيمٌ", "رَاحِمٌ", "مَرْحُومٌ"], "çok merhametli → فَعِيل", "Peygamber müminlere çok merhametlidir.", "u1"],
  ["أَحْمَدُ رَجُلٌ {صَبُورٌ}.", ["صَبُورٌ", "صَابِرٌ", "صَبْرٌ"], "çok sabırlı → فَعُول", "Ahmed çok sabırlı bir adamdır.", "u1"],
  ["هَذَا وَلَدٌ {حَذِرٌ}.", ["حَذِرٌ", "حَذَرٌ", "مَحْذُورٌ"], "çok dikkatli → فَعِل", "Bu çok dikkatli bir çocuktur.", "u1"],
  ["خَالِدٌ رَجُلٌ {مِقْدَامٌ}.", ["مِقْدَامٌ", "مُقْدِمٌ", "قَدِيمٌ"], "çok cesur → مِفْعَال", "Hâlid çok cesur bir adamdır.", "u1"],
  ["﴿وَهُوَ {السَّمِيعُ} البَصِيرُ﴾", ["السَّمِيعُ", "السَّامِعُ", "المَسْمُوعُ"], "her şeyi işiten → فَعِيل", "O her şeyi işiten, görendir.", "u2"],
  ["﴿وَرَبُّكَ {الغَفُورُ} ذُو الرَّحْمَةِ﴾", ["الغَفُورُ", "الغَافِرُ", "المَغْفُورُ"], "فَعُول", "Rabbin çok bağışlayandır.", "u2"],
  ["﴿وَهُوَ {الفَتَّاحُ} العَلِيمُ﴾", ["الفَتَّاحُ", "الفَاتِحُ", "المِفْتَاحُ"], "فَعَّال; مِفْتَاحٌ alet ismi", "O hakkıyla hükmeden, bilendir.", "u2"],
  ["أَحْمَدُ رَجُلٌ {فَطِنٌ}.", ["فَطِنٌ", "فَطِينٌ", "فَاطِنٌ"], "çok zeki → فَعِل", "Ahmed çok zeki bir adamdır.", "u2"],
  ["هُوَ رَجُلٌ {مِعْطَاءٌ}.", ["مِعْطَاءٌ", "مُعْطٍ", "عَطَاءٌ"], "çok cömert → مِفْعَال", "O çok cömert bir adamdır.", "u2"],
  ["يَعْمَلُ {الخَبَّازُ} الخُبْزَ.", ["الخَبَّازُ", "الخَابِزُ", "المَخْبَزُ"], "meslek → فَعَّال", "Fırıncı ekmek yapar.", "u2"],
  ["﴿{سَمَّاعُونَ} لِلْكَذِبِ﴾", ["سَمَّاعُونَ", "سَامِعُونَ", "مَسْمُوعُونَ"], "çok dinleyenler → فَعَّال (çoğul)", "Yalana çok kulak verenler.", "u3"],
  ["﴿إِنَّهُ كَانَ {غَفَّارًا}﴾", ["غَفَّارًا", "غَافِرًا", "مَغْفُورًا"], "durmadan bağışlayan", "Çünkü O çok bağışlayandır.", "u3"],
  ["كُلُّكُمْ {خَطَّاؤُونَ}.", ["خَطَّاؤُونَ", "خَاطِئُونَ", "مُخْطِئُونَ"], "çok hata edenler → فَعَّال", "Hepiniz çok hata edersiniz.", "u3"],
  ["العَاقِلُ {تَرَّاكٌ} لِلسُّوءِ.", ["تَرَّاكٌ", "تَارِكٌ", "مَتْرُوكٌ"], "hep terk eden → فَعَّال", "Akıllı kötülüğü hep terk eder.", "u3"],
  ["الإِنْسَانُ {ظَلُومٌ} نَفْسَهُ.", ["ظَلُومٌ", "ظَالِمٌ", "مَظْلُومٌ"], "çok zalim → فَعُول", "İnsan kendine çok zulmeder.", "u3"],
  ["جَمَالٌ رَجُلٌ {كَتُومٌ} لِلسِّرِّ.", ["كَتُومٌ", "كَاتِمٌ", "مَكْتُومٌ"], "sır saklayan → فَعُول", "Cemal sır saklayan bir adamdır.", "u3"],
  ["التَّاجِرُ {الصَّدُوقُ} مَحْبُوبٌ.", ["الصَّدُوقُ", "الصَّادِقُ", "المَصْدُوقُ"], "her zaman doğru sözlü → فَعُول", "Doğru sözlü tüccar sevilir.", "u3"],
  ["اللهُ {رَزَّاقٌ} عِبَادَهُ.", ["رَزَّاقٌ", "رَازِقٌ", "مَرْزُوقٌ"], "bol rızık veren → فَعَّال", "Allah kullarına bol rızık verir.", "u3"],
  ["فَالمُؤْمِنُ {صَبُورٌ}، شَكُورٌ لِرَبِّهِ.", ["صَبُورٌ", "صَابِرٌ", "مَصْبُورٌ"], "çok sabırlı → فَعُول", "Mümin çok sabırlıdır.", "u4"],
  ["فَالمُؤْمِنُ صَبُورٌ، {شَكُورٌ} لِرَبِّهِ.", ["شَكُورٌ", "شَاكِرٌ", "مَشْكُورٌ"], "çok şükreden → فَعُول", "Mümin Rabbine çok şükreder.", "u4"],
  ["المُسْلِمُ {الصَّابِرُ} يَشْعُرُ بِأَنَّ اللهَ مَعَهُ.", ["الصَّابِرُ", "الصَّبْرُ", "المَصْبُورُ"], "sabreden → ism-i fâil", "Sabreden Müslüman Allah'ın kendisiyle olduğunu hisseder.", "u4"],
  ["﴿إِنَّ اللهَ مَعَ {الصَّابِرِينَ}﴾", ["الصَّابِرِينَ", "الصَّبُورِينَ", "المَصْبُورِينَ"], "âyette ism-i fâil çoğulu", "Allah sabredenlerle beraberdir.", "u4"],
  ["الصَّبْرُ {مِفْتَاحُ} الفَرَجِ.", ["مِفْتَاحُ", "فَاتِحُ", "مَفْتُوحُ"], "anahtar → alet ismi", "Sabır ferahlığın anahtarıdır.", "u4"]
];
var HAFIZA = {
  fb: { name: "Fâil ↔ mübalağa", pairs: [["غَافِرٌ", "غَفُورٌ"], ["رَاحِمٌ", "رَحِيمٌ"], ["صَابِرٌ", "صَبُورٌ"], ["عَالِمٌ", "عَلِيمٌ"], ["تَائِبٌ", "تَوَّابٌ"], ["رَازِقٌ", "رَزَّاقٌ"], ["فَاتِحٌ", "فَتَّاحٌ"], ["ظَالِمٌ", "ظَلُومٌ"], ["حَاذِرٌ", "حَذِرٌ"], ["كَاتِمٌ", "كَتُومٌ"], ["مُقْدِمٌ", "مِقْدَامٌ"], ["صَادِقٌ", "صَدُوقٌ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["غَفُورٌ", "çok bağışlayan"], ["رَحِيمٌ", "çok merhametli"], ["عَلِيمٌ", "her şeyi bilen"], ["سَمِيعٌ", "her şeyi işiten"], ["صَبُورٌ", "çok sabırlı"], ["شَكُورٌ", "çok şükreden"], ["حَذِرٌ", "çok dikkatli"], ["فَطِنٌ", "çok zeki"], ["مِقْدَامٌ", "çok cesur"], ["مِعْطَاءٌ", "çok cömert"], ["أَكُولٌ", "obur"], ["كَتُومٌ", "sır saklayan"]] },
  me: { name: "Meslekler", pairs: MESLEK.filter(function (m, i) { return i !== 1 && i !== 2; }).map(function (m) { return [m[0], m[1]]; }) }
};
var KARTLAR = [
  ["Mübalağa sîgası nedir?", "İsm-i fâilin anlamını çokluk ve süreklilikle güçlendiren müştak isim: غَافِرٌ ← غَفُورٌ"],
  ["Beş vezin?", "فَعِيلٌ · فَعُولٌ · فَعَّالٌ · فَعِلٌ · مِفْعَالٌ"],
  ["فَعِيل örnekleri?", "رَحِيمٌ، عَلِيمٌ، سَمِيعٌ، بَصِيرٌ"],
  ["فَعُول örnekleri?", "غَفُورٌ، شَكُورٌ، صَبُورٌ، ظَلُومٌ"],
  ["فَعَّال örnekleri?", "تَوَّابٌ، غَفَّارٌ، رَزَّاقٌ، فَتَّاحٌ"],
  ["فَعِل örnekleri?", "حَذِرٌ، فَطِنٌ"],
  ["مِفْعَال örnekleri?", "مِكْثَارٌ، مِقْدَامٌ، مِعْطَاءٌ"],
  ["Hangi fiillerden yapılır?", "Çoğunlukla üç harfli; nadiren daha uzun: أَقْدَمَ ← مِقْدَامٌ"],
  ["Meslek adları?", "Çoğu فَعَّال: خَبَّازٌ، نَجَّارٌ، حَدَّادٌ، فَلَّاحٌ، بَقَّالٌ، قَصَّابٌ"],
  ["صَابِرٌ ile صَبُورٌ farkı?", "صَابِرٌ sabreden (fâil); صَبُورٌ çok, her zaman sabreden (mübalağa)."],
  ["مِفْتَاحٌ mübalağa mı?", "Hayır. Vezni مِفْعَال ama anlamı \"anahtar\": alet ismi."],
  ["Mübalağa mef'ûl alır mı?", "Evet: اللهُ رَزَّاقٌ عِبَادَهُ · سَمَّاعٌ لِلْقُرْآنِ"]
];
