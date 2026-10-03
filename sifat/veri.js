// ================= VERİ: Sıfat Tamlaması (الصِّفَةُ وَالمَوْصُوفُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "ref.mevsûf" gibi yazılırsa etikete görev eklenir.
var ROLES = {
  mv: { ar: "مَوْصُوفٌ", tr: "Mevsûf" }, sf: { ar: "صِفَةٌ", tr: "Sıfat" },
  ref: { ar: "مَرْفُوعٌ", tr: "Merfû" }, nasb: { ar: "مَنْصُوبٌ", tr: "Mansûb" }, cerr: { ar: "مَجْرُورٌ", tr: "Mecrûr" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cerr", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var YER_OPTS = [["mv", "Mevsûf", "مَوْصُوفٌ", "mv"], ["sf", "Sıfat", "صِفَةٌ", "sf"]];
var TUR_OPTS = YER_OPTS;

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
function IR(s, t, c, why, tr) { return { s: s, t: t, c: c, why: why, tr: tr }; }

var UNITS = [
// ---------------------------------------------------------------- 1 · SIFAT VE MEVSÛF
{
  id: "u1", no: 1, ar: "الصِّفَةُ وَالمَوْصُوفُ", tr: "Sıfat ve Mevsûf", short: "Sıfat ve mevsûf", col: "sf", legend: ["mv", "sf"],
  goals: ["Sıfatı ve vasfettiği ismi (mevsûf) bulmak", "Sıfatın i'rabda mevsûfa uyduğunu görmek", "Sıfatın marife ve nekirelikte de uyduğunu, bu yüzden الكِتَابُ المُفِيدُ ile الكِتَابُ مُفِيدٌ'un farklı olduğunu kavramak"],
  examples: [
    { s: "الشَّامُ:- / بَلَدٌ:mv / قَدِيمٌ:sf", tr: "Şam eski bir şehirdir.", why: "قَدِيمٌ, kendinden önceki بَلَدٌ'i vasfediyor: nekire, müzekker, müfred, merfû." },
    { s: "زَرَعَتْ:- / سَارَةُ:- / الشَّجَرَةَ:mv / الطَّوِيلَةَ:sf", tr: "Sâra uzun ağacı dikti.", why: "Mevsûf marife, müennes, mansûb; sıfat da öyle." },
    { s: "شَاهَدْتُ:- / بَلَدًا:mv / قَدِيمًا:sf", tr: "Eski bir şehir gördüm.", why: "Mevsûf mansûb → sıfat mansûb." },
    { s: "مَرَرْتُ:- / بِبَلَدٍ:mv / قَدِيمٍ:sf", tr: "Eski bir şehre uğradım.", why: "Mevsûf mecrûr → sıfat mecrûr." }
  ],
  rules: [
    { tr: "<b class=\"r-sf\">Sıfat</b>, kendinden önceki bir ismi vasfeden ve açıklayan isimdir. Vasfedilen isme <b class=\"r-mv\">mevsûf</b> denir. Arapçada sıfat mevsûftan <b>sonra</b> gelir; Türkçede önce gelir (<i>eski şehir</i>).", ex: ["بَلَدٌ قَدِيمٌ", "الشَّجَرَةُ الطَّوِيلَةُ"] },
    { tr: "Sıfat mevsûfa <b>i'rabda</b> uyar: mevsûf merfûsa merfû, mansûbsa mansûb, mecrûrsa mecrûr.", ex: ["بَلَدٌ قَدِيمٌ", "بَلَدًا قَدِيمًا", "بِبَلَدٍ قَدِيمٍ"] },
    { tr: "Sıfat mevsûfa <b>belirlilikte</b> uyar: mevsûf nekireyse sıfat nekire, marifeyse sıfat da ال alır.", ex: ["بَلَدٌ قَدِيمٌ", "الشَّجَرَةَ الطَّوِيلَةَ"] },
    { tr: "Dikkat: biri marife, biri nekire ise tamlama değil cümledir. <span class=\"ar\">الكِتَابُ مُفِيدٌ</span> \"kitap faydalıdır\"; <span class=\"ar\">الكِتَابُ المُفِيدُ</span> \"faydalı kitap\".", ex: ["الجَوَابُ سَهْلٌ ← الجَوَابُ السَّهْلُ قَصِيرٌ"] },
    { tr: "Özel isim ve izafetle marife olan isim de marifedir; sıfatı ال alır.", ex: ["بُرْجَ غَلَطَةَ المَشْهُورَ"] }
  ],
  kaide: [
    "١ ـ الصِّفَةُ اسْمٌ يَصِفُ اسْمًا قَبْلَهُ وَيُوَضِّحُهُ، يُسَمَّى الاسْمُ قَبْلَ الصِّفَةِ «مَوْصُوفًا». مِثَالٌ: الشَّامُ بَلَدٌ (مَوْصُوفٌ) قَدِيمٌ (صِفَةٌ).",
    "٢ ـ الصِّفَةُ وَالمَوْصُوفُ مُتَطَابِقَانِ:",
    "أ) فِي الإِعْرَابِ: الشَّامُ بَلَدٌ قَدِيمٌ / شَاهَدْتُ بَلَدًا قَدِيمًا / مَرَرْتُ بِبَلَدٍ قَدِيمٍ.",
    "ب) فِي التَّعْرِيفِ وَالتَّنْكِيرِ: الشَّامُ بَلَدٌ قَدِيمٌ / زَرَعَتْ سَارَةُ الشَّجَرَةَ الطَّوِيلَةَ."
  ],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنِ الصِّفَةَ وَالمَوْصُوفَ فِي الجُمَلِ التَّالِيَةِ وَشَكِّلِ الصِّفَةَ", tr: "Mevsûfu bul, sonra sıfatı kutuya dokunarak doğru harekele. Sıfat; i'rabda ve belirlilikte mevsûfa uyar.", items: [
      CB("الكتاب صديق مفيد.", ["الكِتَابُ صَدِيقٌ", ["مُفِيدٌ", "مُفِيدًا", "مُفِيدٍ", "المُفِيدُ"]], [0], "Kitap faydalı bir dosttur.", "Mevsûf صَدِيقٌ: nekire, merfû (haber) → مُفِيدٌ."),
      CB("المطر الغزير خطر أحيانا.", ["المَطَرُ", ["الغَزِيرُ", "الغَزِيرَ", "الغَزِيرِ", "غَزِيرٌ"], "خَطَرٌ أَحْيَانًا."], [0], "Şiddetli yağmur bazen tehlikelidir.", "Mevsûf المَطَرُ: marife, merfû (mübtedâ) → الغَزِيرُ."),
      CB("مكة مدينة مقدسة.", ["مَكَّةُ مَدِينَةٌ", ["مُقَدَّسَةٌ", "مُقَدَّسَةً", "مُقَدَّسَةٍ", "المُقَدَّسَةُ"]], [0], "Mekke kutsal bir şehirdir.", "Mevsûf مَدِينَةٌ: nekire, müennes, merfû → مُقَدَّسَةٌ."),
      CB("الرياضة الصحية مفيدة.", ["الرِّيَاضَةُ", ["الصِّحِّيَّةُ", "الصِّحِّيَّةَ", "الصِّحِّيَّةِ", "صِحِّيَّةٌ"], "مُفِيدَةٌ."], [0], "Sağlıklı spor faydalıdır.", "Mevsûf الرِّيَاضَةُ: marife, merfû → الصِّحِّيَّةُ. مُفِيدَةٌ ise haberdir."),
      CB("نسكن في حديقة واسعة.", ["نَسْكُنُ فِي حَدِيقَةٍ", ["وَاسِعَةٌ", "وَاسِعَةً", "وَاسِعَةٍ", "الوَاسِعَةِ"]], [2], "Geniş bir bahçede oturuyoruz.", "Mevsûf حَدِيقَةٍ: nekire, mecrûr (فِي) → وَاسِعَةٍ."),
      CB("تسابقنا في الشارع المزدحم.", ["تَسَابَقْنَا فِي الشَّارِعِ", ["المُزْدَحِمُ", "المُزْدَحِمَ", "المُزْدَحِمِ", "مُزْدَحِمٍ"]], [2], "Kalabalık caddede yarıştık.", "Mevsûf الشَّارِعِ: marife, mecrûr → المُزْدَحِمِ."),
      CB("يدرس علي في المدرسة البعيدة.", ["يَدْرُسُ عَلِيٌّ فِي المَدْرَسَةِ", ["البَعِيدَةُ", "البَعِيدَةَ", "البَعِيدَةِ", "بَعِيدَةٍ"]], [2], "Ali uzaktaki okulda okuyor.", "Mevsûf المَدْرَسَةِ: marife, müennes, mecrûr → البَعِيدَةِ."),
      CB("لعبت مع الطفل الصغير.", ["لَعِبْتُ مَعَ الطِّفْلِ", ["الصَّغِيرُ", "الصَّغِيرَ", "الصَّغِيرِ", "صَغِيرٍ"]], [2], "Küçük çocukla oynadım.", "Mevsûf الطِّفْلِ: marife, mecrûr (مَعَ'den sonra) → الصَّغِيرِ.")
    ]},
    { type: "irab", num: "+", extra: true, tlist: YER_OPTS, tlbl: "Tamlamadaki yeri", ar: "أَعْرِبِ الكَلِمَةَ الَّتِي تَحْتَهَا خَطٌّ", tr: "Ek alıştırma: altı çizili kelime mevsûf mu, sıfat mı? Hali ne?", items: [
      IR("الكِتَابُ صَدِيقٌ [مُفِيدٌ].", "sf", "ref", "Sıfat; mevsûfu صَدِيقٌ merfû olduğu için merfû.", "Kitap faydalı bir dosttur."),
      IR("[المَطَرُ] الغَزِيرُ خَطَرٌ أَحْيَانًا.", "mv", "ref", "Mevsûf; mübtedâ olduğu için merfû.", "Şiddetli yağmur bazen tehlikelidir."),
      IR("نَسْكُنُ فِي [حَدِيقَةٍ] وَاسِعَةٍ.", "mv", "cerr", "Mevsûf; فِي'den sonra mecrûr.", "Geniş bir bahçede oturuyoruz."),
      IR("نَسْكُنُ فِي حَدِيقَةٍ [وَاسِعَةٍ].", "sf", "cerr", "Sıfat; mevsûfu mecrûr olduğu için mecrûr.", "Geniş bir bahçede oturuyoruz."),
      IR("زَرَعَتْ سَارَةُ الشَّجَرَةَ [الطَّوِيلَةَ].", "sf", "nasb", "Sıfat; mevsûfu mef'ûl (mansûb) olduğu için mansûb.", "Sâra uzun ağacı dikti."),
      IR("شَاهَدْتُ [بَلَدًا] قَدِيمًا.", "mv", "nasb", "Mevsûf; mef'ûl olduğu için mansûb.", "Eski bir şehir gördüm."),
      IR("تَسَابَقْنَا فِي الشَّارِعِ [المُزْدَحِمِ].", "sf", "cerr", "Sıfat; mevsûfu mecrûr.", "Kalabalık caddede yarıştık."),
      IR("الرِّيَاضَةُ [الصِّحِّيَّةُ] مُفِيدَةٌ.", "sf", "ref", "Sıfat; mevsûfu mübtedâ (merfû).", "Sağlıklı spor faydalıdır.")
    ]},
    { type: "combo", num: "٧", ar: "حَوِّلِ المُبْتَدَأَ وَالخَبَرَ إِلَى صِفَةٍ وَمَوْصُوفٍ وَضَعْ خَبَرًا مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Cümleyi tamlamaya çevir: eski haber ال alıp sıfat olur. Parantezdeki kelime yeni haber olur ve mübtedâya uyar.",
      exHtml: "<span class=\"ar\">الجَوَابُ سَهْلٌ (قَصِير) ← الجَوَابُ السَّهْلُ قَصِيرٌ</span><br><span class=\"ar\">الرِّحْلَةُ طَوِيلَةٌ (شَاقّ) ← الرِّحْلَةُ الطَّوِيلَةُ شَاقَّةٌ</span>", items: [
      CB("البَيْتُ قَرِيبٌ <span class=\"muted\">(نَظِيف)</span>", ["البَيْتُ", ["قَرِيبٌ", "القَرِيبُ", "القَرِيبَةُ"], ["نَظِيفٌ", "نَظِيفَةٌ", "النَّظِيفُ"]], [1, 0], "Yakındaki ev temizdir.", "Sıfat marife mevsûfa uyar: القَرِيبُ. Haber nekire kalır: نَظِيفٌ."),
      CB("الحَدِيقَةُ جَمِيلَةٌ <span class=\"muted\">(وَاسِع)</span>", ["الحَدِيقَةُ", ["جَمِيلَةٌ", "الجَمِيلَةُ", "الجَمِيلُ"], ["وَاسِعٌ", "وَاسِعَةٌ", "الوَاسِعَةُ"]], [1, 1], "Güzel bahçe geniştir.", "Mevsûf müennes: الجَمِيلَةُ; haber de müennes: وَاسِعَةٌ."),
      CB("الامْتِحَانُ طَوِيلٌ <span class=\"muted\">(صَعْب)</span>", ["الامْتِحَانُ", ["طَوِيلٌ", "الطَّوِيلُ", "الطَّوِيلَةُ"], ["صَعْبٌ", "صَعْبَةٌ", "الصَّعْبُ"]], [1, 0], "Uzun sınav zordur.", "الطَّوِيلُ sıfat; صَعْبٌ haber."),
      CB("الإِجَازَةُ طَوِيلَةٌ <span class=\"muted\">(مُمْتِع)</span>", ["الإِجَازَةُ", ["طَوِيلَةٌ", "الطَّوِيلَةُ", "الطَّوِيلُ"], ["مُمْتِعٌ", "مُمْتِعَةٌ", "المُمْتِعَةُ"]], [1, 1], "Uzun tatil zevklidir.", "Mevsûf müennes: الطَّوِيلَةُ; haber: مُمْتِعَةٌ."),
      CB("السَّيَّارَةُ حَدِيثَةٌ <span class=\"muted\">(سَرِيع)</span>", ["السَّيَّارَةُ", ["حَدِيثَةٌ", "الحَدِيثَةُ", "الحَدِيثُ"], ["سَرِيعٌ", "سَرِيعَةٌ", "السَّرِيعَةُ"]], [1, 1], "Yeni araba hızlıdır.", "الحَدِيثَةُ sıfat; سَرِيعَةٌ haber."),
      CB("الأَسَدُ قَوِيٌّ <span class=\"muted\">(عَجِيب)</span>", ["الأَسَدُ", ["قَوِيٌّ", "القَوِيُّ", "القَوِيَّةُ"], ["عَجِيبٌ", "عَجِيبَةٌ", "العَجِيبُ"]], [1, 0], "Güçlü aslan şaşırtıcıdır.", "القَوِيُّ sıfat; عَجِيبٌ haber."),
      CB("الغُرْفَةُ ضَيِّقَةٌ <span class=\"muted\">(حَارّ)</span>", ["الغُرْفَةُ", ["ضَيِّقَةٌ", "الضَّيِّقَةُ", "الضَّيِّقُ"], ["حَارٌّ", "حَارَّةٌ", "الحَارَّةُ"]], [1, 1], "Dar oda sıcaktır.", "الضَّيِّقَةُ sıfat; حَارَّةٌ haber."),
      CB("الطَّائِرَةُ سَرِيعَةٌ <span class=\"muted\">(حَدِيث)</span>", ["الطَّائِرَةُ", ["سَرِيعَةٌ", "السَّرِيعَةُ", "السَّرِيعُ"], ["حَدِيثٌ", "حَدِيثَةٌ", "الحَدِيثَةُ"]], [1, 1], "Hızlı uçak yenidir.", "السَّرِيعَةُ sıfat; حَدِيثَةٌ haber.")
    ]},
    { type: "combo", num: "٨", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِصِفَةٍ وَمَوْصُوفٍ", tr: "Soruyu sıfat tamlamasıyla cevapla. Mevsûf mef'ûl olduğu için mansûb; sıfat ona uyar.",
      exHtml: "<span class=\"ar\">أَيَّ طِفْلَةٍ شَاهَدْتِ؟ (مَسْرُور) ← شَاهَدْتُ الطِّفْلَةَ المَسْرُورَةَ</span>", items: [
      CB("أَيَّ بَيْتٍ سَكَنْتَ؟ <span class=\"muted\">(بَعِيد)</span>", ["سَكَنْتُ", ["بَيْتًا", "البَيْتَ"], ["البَعِيدَ", "البَعِيدَةَ", "البَعِيدُ", "بَعِيدًا"]], [[1, 0], [0, 3]], "Uzaktaki evde oturdum.", "Mevsûf mansûb ve müzekker: البَيْتَ البَعِيدَ (ya da بَيْتًا بَعِيدًا)."),
      CB("أَيَّ حَدِيقَةٍ نَظَّفْتِ؟ <span class=\"muted\">(الوَسِخ)</span>", ["نَظَّفْتُ", ["حَدِيقَةً", "الحَدِيقَةَ"], ["الوَسِخَةَ", "الوَسِخَ", "الوَسِخَةُ"]], [1, 0], "Kirli bahçeyi temizledim.", "Kelime ال'li verilmiş, mevsûf da marife olur. Müennes: الوَسِخَةَ."),
      CB("أَيَّ امْتِحَانٍ دَخَلْتَ؟ <span class=\"muted\">(طَوِيل)</span>", ["دَخَلْتُ", ["امْتِحَانًا", "الامْتِحَانَ"], ["الطَّوِيلَ", "الطَّوِيلَةَ", "الطَّوِيلُ", "طَوِيلًا"]], [[1, 0], [0, 3]], "Uzun sınava girdim.", "Mansûb, müzekker: الامْتِحَانَ الطَّوِيلَ."),
      CB("أَيَّ إِجَازَةٍ أَخَذْتَ؟ <span class=\"muted\">(قَصِيرَة)</span>", ["أَخَذْتُ", ["إِجَازَةً", "الإِجَازَةَ"], ["القَصِيرَةَ", "القَصِيرَ", "القَصِيرَةُ", "قَصِيرَةً"]], [[1, 0], [0, 3]], "Kısa izni aldım.", "Mansûb, müennes: الإِجَازَةَ القَصِيرَةَ."),
      CB("أَيَّ سَيَّارَةٍ رَكِبْتَ؟ <span class=\"muted\">(قَدِيمَة)</span>", ["رَكِبْتُ", ["سَيَّارَةً", "السَّيَّارَةَ"], ["القَدِيمَةَ", "القَدِيمَ", "القَدِيمَةِ", "قَدِيمَةً"]], [[1, 0], [0, 3]], "Eski arabaya bindim.", "Mansûb, müennes: السَّيَّارَةَ القَدِيمَةَ."),
      CB("أَيَّ أَرْنَبٍ صَوَّرْتَ؟ <span class=\"muted\">(سَرِيع)</span>", ["صَوَّرْتُ", ["أَرْنَبًا", "الأَرْنَبَ"], ["السَّرِيعَ", "السَّرِيعَةَ", "السَّرِيعُ", "سَرِيعًا"]], [[1, 0], [0, 3]], "Hızlı tavşanın fotoğrafını çektim.", "Mansûb, müzekker: الأَرْنَبَ السَّرِيعَ."),
      CB("أَيَّ غُرْفَةٍ مَسَحْتَ؟ <span class=\"muted\">(صَغِيرَة)</span>", ["مَسَحْتُ", ["غُرْفَةً", "الغُرْفَةَ"], ["الصَّغِيرَةَ", "الصَّغِيرَ", "الصَّغِيرَةِ", "صَغِيرَةً"]], [[1, 0], [0, 3]], "Küçük odayı sildim.", "Mansûb, müennes: الغُرْفَةَ الصَّغِيرَةَ."),
      CB("أَيَّ طَائِرَةٍ رَسَمْتَ؟ <span class=\"muted\">(كَبِيرَة)</span>", ["رَسَمْتُ", ["طَائِرَةً", "الطَّائِرَةَ"], ["الكَبِيرَةَ", "الكَبِيرَ", "الكَبِيرَةُ", "كَبِيرَةً"]], [[1, 0], [0, 3]], "Büyük uçağı çizdim.", "Mansûb, müennes: الطَّائِرَةَ الكَبِيرَةَ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · CİNSİYET VE SAYI UYUMU
{
  id: "u2", no: 2, ar: "التَّذْكِيرُ وَالتَّأْنِيثُ وَالعَدَدُ", tr: "Cinsiyet ve Sayı Uyumu", short: "Cinsiyet ve sayı", col: "mun", legend: ["mv", "sf"],
  goals: ["Sıfatın müzekker ve müennes olmada mevsûfa uyduğunu görmek", "Müfred, müsennâ ve cemde de uyduğunu görmek", "Mevsûfu müennese, müsennâya ve akıllı çoğula çevirirken sıfatı da değiştirmek"],
  examples: [
    { s: "هَذَانِ:- / طَالِبَانِ:mv / طَوِيلَانِ:sf", tr: "Bunlar iki uzun boylu öğrencidir.", why: "Müsennâ mevsûf → müsennâ sıfat." },
    { s: "لَعِبْنَا:- / مَعَ:- / الطَّالِبَتَيْنِ:mv / المُؤَدَّبَتَيْنِ:sf", tr: "İki terbiyeli kız öğrenciyle oynadık.", why: "Müennes müsennâ, marife, mecrûr: hepsinde uyum." },
    { s: "حَضَرَتِ:- / الطَّالِبَاتُ:mv / الغَائِبَاتُ:sf", tr: "Gelmeyen kız öğrenciler geldi.", why: "Cem-i müennes sâlim mevsûf → cem-i müennes sâlim sıfat." },
    { s: "شَكَرَ:- / المُعَلِّمُ:- / الطَّالِبَاتِ:mv / النَّشِيطَاتِ:sf", tr: "Öğretmen çalışkan kız öğrencilere teşekkür etti.", why: "Mansûb cem-i müennes sâlim: ikisi de kesreli." },
    { s: "دَرَسَ:- / المُفَكِّرُونَ:mv / المُسْلِمُونَ:sf / المَسْأَلَةَ:-", tr: "Müslüman düşünürler meseleyi inceledi.", why: "Cem-i müzekker sâlim → cem-i müzekker sâlim." },
    { s: "شَاهَدَ:- / عَلِيٌّ:- / اللَّاعِبِينَ:mv / المَاهِرِينَ:sf / فِي:- / المُبَارَاةِ:-", tr: "Ali maçta usta oyuncuları izledi.", why: "Mansûb cem: ikisi de ـِينَ." }
  ],
  rules: [
    { tr: "Sıfat mevsûfa <b>cinsiyette</b> uyar: mevsûf müzekkerse sıfat müzekker, müennesse sıfat müennes.", ex: ["بَلَدٌ قَدِيمٌ", "الشَّجَرَةُ الطَّوِيلَةُ"] },
    { tr: "Sıfat mevsûfa <b>sayıda</b> uyar: müfred, müsennâ ve cem.", ex: ["طَالِبٌ طَوِيلٌ", "طَالِبَانِ طَوِيلَانِ", "الطَّالِبَاتُ الغَائِبَاتُ"] },
    { tr: "Böylece sıfat mevsûfa dört yönden uyar: <b>i'rab</b>, <b>belirlilik</b>, <b>cinsiyet</b>, <b>sayı</b>." },
    { tr: "Mevsûf akıllı bir çoğulsa sıfat da çoğul olur: cem-i müzekker sâlim, cem-i müennes sâlim ya da kırık çoğul.", ex: ["المُدَرِّسُونَ الجَزَائِرِيُّونَ", "المُهَنْدِسَاتُ المَاهِرَاتُ", "الأَطْفَالُ الصِّغَارُ"] },
    { tr: "İpucu: Fiil sonra geliyorsa o da değişir: <span class=\"ar\">المُسْلِمَةُ المُخْلِصَةُ تَعْبُدُ اللهَ</span>; fiil önceyse sadece müennes eki alır: <span class=\"ar\">عَمِلَتِ الطَّالِبَةُ النَّاجِحَةُ</span>." }
  ],
  kaide: [
    "٢ ـ الصِّفَةُ وَالمَوْصُوفُ مُتَطَابِقَانِ:",
    "ج) فِي التَّذْكِيرِ وَالتَّأْنِيثِ: الشَّامُ بَلَدٌ قَدِيمٌ / زَرَعَتْ سَارَةُ الشَّجَرَةَ الطَّوِيلَةَ.",
    "د) فِي الإِفْرَادِ وَالتَّثْنِيَةِ وَالجَمْعِ: الشَّامُ بَلَدٌ قَدِيمٌ / هَذَانِ طَالِبَانِ طَوِيلَانِ / حَضَرَتِ الطَّالِبَاتُ الغَائِبَاتُ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "عَيِّنِ الصِّفَةَ المُنَاسِبَةَ ثُمَّ ضَعْهَا فِي الفَرَاغِ", tr: "Mevsûfa dört yönden uyan sıfatı seç: i'rab, belirlilik, cinsiyet, sayı.", items: [
      { q: "رَكِبَتِ العَائِلَةُ السَّيَّارَةَ ___.", o: ["حَدِيثَةً", "الحَدِيثَةَ", "الحَدِيثَاتِ"], a: 1, tr: "Aile yeni arabaya bindi.", why: "السَّيَّارَةَ: marife, müennes, tekil, mansûb → الحَدِيثَةَ." },
      { q: "الأَشْجَارُ ___ قَصِيرَةٌ.", o: ["القَدِيمَةُ", "قَدِيمَةٌ", "القَدِيمَاتُ"], a: 0, tr: "Eski ağaçlar kısadır.", why: "Akılsız çoğul → sıfat tekil müennes; marife olduğu için ال: القَدِيمَةُ." },
      { q: "إِسْطَنْبُولُ مَدِينَةٌ ___.", o: ["جَمِيلَةٌ", "الجَمِيلَةُ", "جَمِيلٌ"], a: 0, tr: "İstanbul güzel bir şehirdir.", why: "مَدِينَةٌ: nekire, müennes → جَمِيلَةٌ." },
      { q: "قَابَلَ إِسْمَاعِيلُ الوَزِيرَ ___.", o: ["الجَدِيدَةَ", "جَدِيدًا", "الجَدِيدَ"], a: 2, tr: "İsmail yeni bakanla görüştü.", why: "الوَزِيرَ: marife, müzekker, mansûb → الجَدِيدَ." },
      { q: "كَافَأَتِ المُدَرِّسَةُ الطَّالِبَاتِ ___.", o: ["النَّاجِحَانِ", "النَّاجِحَاتِ", "النَّاجِحَةَ"], a: 1, tr: "Kadın öğretmen başarılı kız öğrencileri ödüllendirdi.", why: "Akıllı çoğul → çoğul sıfat. Mansûb cem-i müennes sâlim: kesre." },
      { q: "السَّاعَاتُ ___ عَاطِلَةٌ.", o: ["الكَبِيرَةُ", "الكَبِيرَاتُ", "كَبِيرَةٌ"], a: 0, tr: "Büyük saatler bozuktur.", why: "Akılsız çoğul → tekil müennes, marife: الكَبِيرَةُ." },
      { q: "المُوَظَّفَانِ ___ بَاكِسْتَانِيَّانِ.", o: ["النَّشِيطِينَ", "النَّشِيطَيْنِ", "النَّشِيطَانِ"], a: 2, tr: "Çalışkan iki memur Pakistanlıdır.", why: "Müsennâ, marife, merfû → النَّشِيطَانِ." },
      { q: "العَامِلُونَ ___ سُورِيُّونَ.", o: ["المُخْلِصَانِ", "المُخْلِصُ", "المُخْلِصُونَ"], a: 2, tr: "İhlaslı işçiler Suriyelidir.", why: "Akıllı çoğul, merfû → المُخْلِصُونَ." }
    ]},
    { type: "combo", num: "٣", ar: "حَوِّلِ المَوْصُوفَ إِلَى صِيغَةِ المُؤَنَّثِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Mevsûfu müennes yap; sıfatı ve gerekirse fiili de değiştir.",
      exHtml: "<span class=\"ar\">تَسَلَّمَ المُوَظَّفُ التُّرْكِيُّ العَمَلَ ← تَسَلَّمَتِ المُوَظَّفَةُ التُّرْكِيَّةُ العَمَلَ</span>", items: [
      CB("قَرَأْتُ قِصَّةَ الكَاتِبِ المَشْهُورِ.", ["قَرَأْتُ قِصَّةَ", ["الكَاتِبِ", "الكَاتِبَةِ", "الكَاتِبَةُ"], ["المَشْهُورِ", "المَشْهُورَةِ", "المَشْهُورَةُ"]], [1, 1], "Ünlü kadın yazarın hikâyesini okudum.", "Mecrûr (muzâfun ileyh) müennes: الكَاتِبَةِ المَشْهُورَةِ."),
      CB("ظَهَرَ الحَاكِمُ العَادِلُ فِي التِّلْفَازِ.", [["ظَهَرَ", "ظَهَرَتِ"], ["الحَاكِمُ", "الحَاكِمَةُ", "الحَاكِمَةَ"], ["العَادِلُ", "العَادِلَةُ", "العَادِلَةِ"], "فِي التِّلْفَازِ."], [1, 1, 1], "Adil kadın yönetici televizyonda göründü.", "Fâil müennes olunca fiil de ت alır."),
      CB("لَعِبْتُ مَعَ الطِّفْلِ الصَّغِيرِ.", ["لَعِبْتُ مَعَ", ["الطِّفْلِ", "الطِّفْلَةِ", "الطِّفْلَةَ"], ["الصَّغِيرِ", "الصَّغِيرَةِ", "الصَّغِيرَةُ"]], [1, 1], "Küçük kız çocukla oynadım.", "Mecrûr müennes: الطِّفْلَةِ الصَّغِيرَةِ."),
      CB("المُعَلِّمُ الفِلَسْطِينِيُّ نَشِيطٌ.", [["المُعَلِّمُ", "المُعَلِّمَةُ", "المُعَلِّمَةَ"], ["الفِلَسْطِينِيُّ", "الفِلَسْطِينِيَّةُ", "الفِلَسْطِينِيَّةِ"], ["نَشِيطٌ", "نَشِيطَةٌ"]], [1, 1, 1], "Filistinli kadın öğretmen çalışkandır.", "Mübtedâ, sıfatı ve haber müennes olur."),
      CB("المُسْلِمُ المُخْلِصُ يَعْبُدُ اللهَ.", [["المُسْلِمُ", "المُسْلِمَةُ", "المُسْلِمَةَ"], ["المُخْلِصُ", "المُخْلِصَةُ", "المُخْلِصَةِ"], ["يَعْبُدُ", "تَعْبُدُ"], "اللهَ."], [1, 1, 1], "İhlaslı Müslüman kadın Allah'a ibadet eder.", "Fiil sonra geldiği için müennes olur: تَعْبُدُ."),
      CB("شَاهَدْنَا المُهَنْدِسَ المَاهِرَ.", ["شَاهَدْنَا", ["المُهَنْدِسَ", "المُهَنْدِسَةَ", "المُهَنْدِسَةُ"], ["المَاهِرَ", "المَاهِرَةَ", "المَاهِرَةُ"]], [1, 1], "Usta kadın mühendisi gördük.", "Mansûb müennes: المُهَنْدِسَةَ المَاهِرَةَ."),
      CB("عَمِلَ الطَّالِبُ النَّاجِحُ الوَاجِبَ.", [["عَمِلَ", "عَمِلَتِ"], ["الطَّالِبُ", "الطَّالِبَةُ", "الطَّالِبَةَ"], ["النَّاجِحُ", "النَّاجِحَةُ", "النَّاجِحَةَ"], "الوَاجِبَ."], [1, 1, 1], "Başarılı kız öğrenci ödevi yaptı.", "Fâil müennes → fiil ت alır; sıfat müennes."),
      CB("قَابَلْتُ عَالِمًا مَشْهُورًا.", ["قَابَلْتُ", ["عَالِمًا", "عَالِمَةً", "العَالِمَةَ"], ["مَشْهُورًا", "مَشْهُورَةً", "المَشْهُورَةَ"]], [1, 1], "Ünlü bir kadın âlimle görüştüm.", "Nekire mansûb müennes: عَالِمَةً مَشْهُورَةً.")
    ]},
    { type: "combo", num: "٤", ar: "حَوِّلِ المَوْصُوفَ إِلَى صِيغَةِ المُثَنَّى وَغَيِّرْ مَا يَلْزَمُ", tr: "Mevsûfu müsennâ yap; sıfat (ve gerekirse haber, fiil) da müsennâ olur.",
      exHtml: "<span class=\"ar\">قَابَلَ عَلِيٌّ المُوَظَّفَ العِرَاقِيَّ ← قَابَلَ عَلِيٌّ المُوَظَّفَيْنِ العِرَاقِيَّيْنِ</span><br><span class=\"ar\">تَرَكَتِ المُوَظَّفَةُ السُّورِيَّةُ العَمَلَ ← تَرَكَتِ المُوَظَّفَتَانِ السُّورِيَّتَانِ العَمَلَ</span>", items: [
      CB("خَرَجَ العَامِلُ النَّشِيطُ مِنَ المَصْنَعِ.", ["خَرَجَ", ["العَامِلُ", "العَامِلَانِ", "العَامِلَيْنِ"], ["النَّشِيطُ", "النَّشِيطَانِ", "النَّشِيطَيْنِ"], "مِنَ المَصْنَعِ."], [1, 1], "Çalışkan iki işçi fabrikadan çıktı.", "Fâil merfû → ـانِ; sıfat da ـانِ. Fiil önce olduğu için tekil."),
      CB("شَاهَدْنَا المَلِكَةَ العَادِلَةَ فِي التِّلْفَازِ.", ["شَاهَدْنَا", ["المَلِكَةَ", "المَلِكَتَانِ", "المَلِكَتَيْنِ"], ["العَادِلَةَ", "العَادِلَتَانِ", "العَادِلَتَيْنِ"], "فِي التِّلْفَازِ."], [2, 2], "Adil iki kraliçeyi televizyonda izledik.", "Mef'ûl mansûb → ـَيْنِ; sıfat da."),
      CB("لَعِبْتُ مَعَ الطِّفْلِ الصَّغِيرِ.", ["لَعِبْتُ مَعَ", ["الطِّفْلِ", "الطِّفْلَانِ", "الطِّفْلَيْنِ"], ["الصَّغِيرِ", "الصَّغِيرَانِ", "الصَّغِيرَيْنِ"]], [2, 2], "İki küçük çocukla oynadım.", "Mecrûr → ـَيْنِ."),
      CB("المُعَلِّمَةُ الأَجْنَبِيَّةُ نَشِيطَةٌ.", [["المُعَلِّمَةُ", "المُعَلِّمَتَانِ", "المُعَلِّمَتَيْنِ"], ["الأَجْنَبِيَّةُ", "الأَجْنَبِيَّتَانِ", "الأَجْنَبِيَّتَيْنِ"], ["نَشِيطَةٌ", "نَشِيطَتَانِ", "نَشِيطَتَيْنِ"]], [1, 1, 1], "İki yabancı kadın öğretmen çalışkandır.", "Mübtedâ, sıfatı ve haber merfû müsennâ."),
      CB("المُسْلِمُ المُخْلِصُ يَعْبُدُ اللهَ.", [["المُسْلِمُ", "المُسْلِمَانِ", "المُسْلِمَيْنِ"], ["المُخْلِصُ", "المُخْلِصَانِ", "المُخْلِصَيْنِ"], ["يَعْبُدُ", "يَعْبُدَانِ", "يَعْبُدُونَ"], "اللهَ."], [1, 1, 1], "İhlaslı iki Müslüman Allah'a ibadet eder.", "Fiil sonra geldiği için ikil: يَعْبُدَانِ."),
      CB("جَلَسْنَا مَعَ المُهَنْدِسَةِ المَاهِرَةِ.", ["جَلَسْنَا مَعَ", ["المُهَنْدِسَةِ", "المُهَنْدِسَتَانِ", "المُهَنْدِسَتَيْنِ"], ["المَاهِرَةِ", "المَاهِرَتَانِ", "المَاهِرَتَيْنِ"]], [2, 2], "Usta iki kadın mühendisle oturduk.", "Mecrûr → ـَيْنِ."),
      CB("قَابَلْنَا الكَاتِبَ المَشْهُورَ أَمْسِ.", ["قَابَلْنَا", ["الكَاتِبَ", "الكَاتِبَانِ", "الكَاتِبَيْنِ"], ["المَشْهُورَ", "المَشْهُورَانِ", "المَشْهُورَيْنِ"], "أَمْسِ."], [2, 2], "Dün iki ünlü yazarla görüştük.", "Mansûb → ـَيْنِ."),
      CB("صَحِبْتُ صَدِيقَةً عِرَاقِيَّةً.", ["صَحِبْتُ", ["صَدِيقَةً", "صَدِيقَتَانِ", "صَدِيقَتَيْنِ"], ["عِرَاقِيَّةً", "عِرَاقِيَّتَانِ", "عِرَاقِيَّتَيْنِ"]], [2, 2], "Iraklı iki kız arkadaşla arkadaşlık ettim.", "Mansûb nekire müsennâ: صَدِيقَتَيْنِ عِرَاقِيَّتَيْنِ (müsennâ tenvin almaz).")
    ]},
    { type: "combo", num: "٥", ar: "حَوِّلِ المَوْصُوفَ إِلَى صِيغَةِ الجَمْعِ لِلْعَاقِلِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Mevsûfu akıllı çoğula çevir (cem-i müzekker sâlim, cem-i müennes sâlim ya da kırık çoğul); sıfat da çoğul olur.",
      exHtml: "<span class=\"ar\">جَاءَ المُدَرِّسُ الجَزَائِرِيُّ ← جَاءَ المُدَرِّسُونَ الجَزَائِرِيُّونَ</span><br><span class=\"ar\">حَضَرَتِ المُهَنْدِسَةُ المَاهِرَةُ ← حَضَرَتِ المُهَنْدِسَاتُ المَاهِرَاتُ</span><br><span class=\"ar\">حَمَلْتُ الطِّفْلَ الصَّغِيرَ ← حَمَلْتُ الأَطْفَالَ الصِّغَارَ</span>", items: [
      CB("سَلَّمْتُ عَلَى المُدِيرَةِ الجَدِيدَةِ.", ["سَلَّمْتُ عَلَى", ["المُدِيرَةِ", "المُدِيرَاتِ", "المُدِيرَاتُ"], ["الجَدِيدَةِ", "الجَدِيدَاتِ", "الجَدِيدَاتُ"]], [1, 1], "Yeni kadın müdürlere selam verdim.", "Mecrûr cem-i müennes sâlim: kesre."),
      CB("رَسَمْتُ العَامِلَ النَّشِيطَ فِي المَزْرَعَةِ.", ["رَسَمْتُ", ["العَامِلَ", "العَامِلِينَ", "العَامِلُونَ", "العُمَّالَ"], ["النَّشِيطَ", "النَّشِيطِينَ", "النَّشِيطُونَ", "النُّشَطَاءَ"], "فِي المَزْرَعَةِ."], [[1, 1], [3, 3], [3, 1], [1, 3]], "Tarladaki çalışkan işçilerin resmini yaptım.", "Mansûb çoğul: العَامِلِينَ النَّشِيطِينَ ya da kırık çoğulla العُمَّالَ النُّشَطَاءَ."),
      CB("أَكَلْتُ مَعَ الوَلَدِ الطَّوِيلِ.", ["أَكَلْتُ مَعَ", ["الوَلَدِ", "الأَوْلَادِ", "الوَلَدِينَ"], ["الطَّوِيلِ", "الطِّوَالِ", "الطَّوِيلِينَ", "الطَّوِيلَةِ"]], [[1, 1], [1, 2]], "Uzun boylu çocuklarla yemek yedim.", "وَلَدٌ'in çoğulu kırıktır: الأَوْلَادِ. Sıfat: الطِّوَالِ (الطَّوِيلِينَ da olur)."),
      CB("دَخَلْنَا دَرْسَ المُعَلِّمِ الفِلَسْطِينِيِّ.", ["دَخَلْنَا دَرْسَ", ["المُعَلِّمِ", "المُعَلِّمِينَ", "المُعَلِّمُونَ"], ["الفِلَسْطِينِيِّ", "الفِلَسْطِينِيِّينَ", "الفِلَسْطِينِيُّونَ"]], [1, 1], "Filistinli öğretmenlerin dersine girdik.", "Muzâfun ileyh mecrûr: ـِينَ."),
      CB("سَمِعَتْ فَاطِمَةُ خِطَابَ الرَّئِيسِ الظَّالِمِ.", ["سَمِعَتْ فَاطِمَةُ خِطَابَ", ["الرَّئِيسِ", "الرُّؤَسَاءِ", "الرَّئِيسِينَ"], ["الظَّالِمِ", "الظَّالِمِينَ", "الظَّالِمُونَ", "الظَّلَمَةِ"]], [[1, 1], [1, 3]], "Fâtıma zalim başkanların konuşmasını dinledi.", "رَئِيسٌ'in çoğulu kırık: الرُّؤَسَاءِ. Sıfat: الظَّالِمِينَ ya da الظَّلَمَةِ."),
      CB("شَاهَدْنَا اللَّاعِبَ الفَائِزَ فِي المُسَابَقَةِ.", ["شَاهَدْنَا", ["اللَّاعِبَ", "اللَّاعِبِينَ", "اللَّاعِبُونَ"], ["الفَائِزَ", "الفَائِزِينَ", "الفَائِزُونَ"], "فِي المُسَابَقَةِ."], [1, 1], "Yarışmada kazanan oyuncuları izledik.", "Mansûb → ـِينَ."),
      CB("طَالَعَتِ الطَّالِبَةُ النَّاجِحَةُ الدَّرْسَ الجَدِيدَ.", ["طَالَعَتِ", ["الطَّالِبَةُ", "الطَّالِبَاتُ", "الطَّالِبَاتِ"], ["النَّاجِحَةُ", "النَّاجِحَاتُ", "النَّاجِحَاتِ"], "الدَّرْسَ الجَدِيدَ."], [1, 1], "Başarılı kız öğrenciler yeni dersi çalıştı.", "Fâil merfû cem-i müennes sâlim: ـَاتُ. (الدَّرْسَ الجَدِيدَ tekil kalır.)"),
      CB("قَابَلْتُ رِيَاضِيًّا عَالَمِيًّا.", ["قَابَلْتُ", ["رِيَاضِيًّا", "رِيَاضِيِّينَ", "رِيَاضِيُّونَ"], ["عَالَمِيًّا", "عَالَمِيِّينَ", "عَالَمِيُّونَ"]], [1, 1], "Dünyaca ünlü sporcularla görüştüm.", "Mansûb nekire → ـِينَ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · AKILSIZ ÇOĞUL
{
  id: "u3", no: 3, ar: "صِفَةُ جَمْعِ غَيْرِ العَاقِلِ", tr: "Akılsız Çoğulun Sıfatı", short: "Akılsız çoğul", col: "tks", legend: ["mv", "sf"],
  goals: ["Akıllı (insan) ve akılsız (insan dışı) çoğulu ayırmak", "Akılsız çoğulun sıfatının tekil müennes olduğunu bilmek", "Sıfatın yine i'rabda ve belirlilikte uyduğunu unutmamak"],
  examples: [
    { s: "السَّيَّارَاتُ:mv / السَّرِيعَةُ:sf / خَطَرٌ:- / فِي:- / إِسْطَنْبُولَ:-", tr: "Hızlı arabalar İstanbul'da tehlikedir.", why: "سَيَّارَاتٌ akılsız çoğul → sıfat tekil müennes: السَّرِيعَةُ." },
    { s: "صَوَّرْنَا:- / الأَشْجَارَ:mv / الطَّوِيلَةَ:sf", tr: "Uzun ağaçların fotoğrafını çektik.", why: "أَشْجَارٌ akılsız çoğul → الطَّوِيلَةَ." },
    { s: "كَبُرَتِ:- / البَقَرَاتُ:mv / الصَّغِيرَةُ:sf", tr: "Küçük inekler büyüdü.", why: "Hayvan da akılsızdır → الصَّغِيرَةُ." }
  ],
  rules: [
    { tr: "Mevsûf <b>akılsız</b> (insan dışı) bir çoğulsa sıfat çoğulda ona uymaz; <b>tekil müennes</b> olur.", ex: ["السَّيَّارَاتُ السَّرِيعَةُ", "الأَشْجَارَ الطَّوِيلَةَ", "كَلِمَاتٍ جَدِيدَةً"] },
    { tr: "Bu kural kırık çoğul için de, cem-i müennes sâlim için de aynıdır.", ex: ["أَوْرَاقٍ قَدِيمَةٍ", "بِالسَّاعَاتِ الصَّغِيرَةِ"] },
    { tr: "İ'rab ve belirlilik uyumu devam eder: marifeyse ال, mecrûrsa kesre.", ex: ["سَيَّارَاتٍ أَلْمَانِيَّةً", "النَّظَّارَاتِ القَدِيمَةَ"] },
    { tr: "Karşılaştır: <b>akıllı</b> çoğulda sıfat çoğuldur.", ex: ["الطَّالِبَاتُ الغَائِبَاتُ", "اللَّاعِبِينَ المَاهِرِينَ"] },
    { tr: "Aynı kural haber için de geçerlidir: <span class=\"ar\">الأَدْوِيَةُ مُفِيدَةٌ</span>, <span class=\"ar\">السَّاعَاتُ عَاطِلَةٌ</span>." }
  ],
  kaide: [
    "٣ ـ إِذَا كَانَ المَوْصُوفُ غَيْرَ عَاقِلٍ، لَا يَتَطَابَقُ مَعَ الصِّفَةِ فِي الجَمْعِ.",
    "مِثَالٌ: السَّيَّارَاتُ السَّرِيعَةُ خَطَرٌ فِي إِسْطَنْبُولَ، صَوَّرْنَا الأَشْجَارَ الطَّوِيلَةَ."
  ],
  ex: [
    { type: "combo", num: "٦", ar: "حَوِّلِ المَوْصُوفَ إِلَى صِيغَةِ الجَمْعِ لِغَيْرِ العَاقِلِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Mevsûfu çoğul yap. Akılsız olduğu için sıfat tekil müennes kalır; sadece i'rabına dikkat et.",
      exHtml: "<span class=\"ar\">كَبُرَتِ البَقَرَةُ الصَّغِيرَةُ ← كَبُرَتِ البَقَرَاتُ الصَّغِيرَةُ</span>", items: [
      CB("أَخَذْتُ عَجَلَةً جَدِيدَةً لِلسَّيَّارَةِ.", ["أَخَذْتُ", ["عَجَلَةً", "عَجَلَاتٍ", "عَجَلَاتًا"], ["جَدِيدَةً", "جَدِيدَاتٍ", "جَدِيدًا"], "لِلسَّيَّارَةِ."], [1, 0], "Araba için yeni tekerlekler aldım.", "Nekire mansûb CMeS: ـَاتٍ (ـَاتًا değil). Sıfat tekil müennes: جَدِيدَةً."),
      CB("شَمَمْتُ رَائِحَةً طَيِّبَةً فِي الحَدِيقَةِ.", ["شَمَمْتُ", ["رَائِحَةً", "رَوَائِحَ", "رَوَائِحًا"], ["طَيِّبَةً", "طَيِّبَاتٍ", "طَيِّبًا"], "فِي الحَدِيقَةِ."], [1, 0], "Bahçede güzel kokular kokladım.", "رَوَائِحُ kırık çoğul ve tenvin almaz: رَوَائِحَ. Sıfat: طَيِّبَةً."),
      CB("لَعِبْتُ بِالسَّاعَةِ الصَّغِيرَةِ.", ["لَعِبْتُ", ["بِالسَّاعَةِ", "بِالسَّاعَاتِ"], ["الصَّغِيرَةِ", "الصَّغِيرَاتِ", "الصِّغَارِ"]], [1, 0], "Küçük saatlerle oynadım.", "Mecrûr; sıfat tekil müennes: الصَّغِيرَةِ."),
      CB("رَكِبَ أَحْمَدُ سَيَّارَةً أَلْمَانِيَّةً.", ["رَكِبَ أَحْمَدُ", ["سَيَّارَةً", "سَيَّارَاتٍ", "سَيَّارَاتًا"], ["أَلْمَانِيَّةً", "أَلْمَانِيَّاتٍ", "أَلْمَانِيًّا"]], [1, 0], "Ahmed Alman arabalarına bindi.", "سَيَّارَاتٍ أَلْمَانِيَّةً."),
      CB("كَتَبَتْ سُعَادُ الدَّرْسَ عَلَى وَرَقَةٍ قَدِيمَةٍ.", ["كَتَبَتْ سُعَادُ الدَّرْسَ عَلَى", ["وَرَقَةٍ", "أَوْرَاقٍ", "وَرَقَاتٍ"], ["قَدِيمَةٍ", "قَدِيمَاتٍ", "قَدِيمٍ"]], [[1, 0], [2, 0]], "Suad dersi eski kâğıtlara yazdı.", "Çoğul أَوْرَاقٍ (ya da وَرَقَاتٍ); sıfat: قَدِيمَةٍ."),
      CB("حَفِظْنَا كَلِمَةً جَدِيدَةً اليَوْمَ.", ["حَفِظْنَا", ["كَلِمَةً", "كَلِمَاتٍ", "كَلِمَاتًا"], ["جَدِيدَةً", "جَدِيدَاتٍ", "جَدِيدًا"], "اليَوْمَ."], [1, 0], "Bugün yeni kelimeler ezberledik.", "كَلِمَاتٍ جَدِيدَةً."),
      CB("قَرَأَ سُلَيْمَانُ مَجَلَّةً عَرَبِيَّةً أَمْسِ.", ["قَرَأَ سُلَيْمَانُ", ["مَجَلَّةً", "مَجَلَّاتٍ", "مَجَلَّاتًا"], ["عَرَبِيَّةً", "عَرَبِيَّاتٍ", "عَرَبِيًّا"], "أَمْسِ."], [1, 0], "Süleyman dün Arapça dergiler okudu.", "مَجَلَّاتٍ عَرَبِيَّةً."),
      CB("أَصْلَحْتُ النَّظَّارَةَ القَدِيمَةَ.", ["أَصْلَحْتُ", ["النَّظَّارَةَ", "النَّظَّارَاتِ", "النَّظَّارَاتَ"], ["القَدِيمَةَ", "القَدِيمَاتِ", "القَدِيمَ"]], [1, 0], "Eski gözlükleri tamir ettim.", "Marife mansûb CMeS: النَّظَّارَاتِ (kesre). Sıfat: القَدِيمَةَ.")
    ]},
    { type: "pick", fill: true, num: "+", extra: true, ar: "عَاقِلٌ أَمْ غَيْرُ عَاقِلٍ؟", tr: "Ek alıştırma: çoğul akıllı mı, akılsız mı? Sıfatı ona göre seç.", items: [
      { q: "الطَّالِبَاتُ ___ فِي الصَّفِّ.", o: ["النَّشِيطَاتُ", "النَّشِيطَةُ"], a: 0, tr: "Çalışkan kız öğrenciler sınıfta.", why: "İnsan: akıllı çoğul → çoğul sıfat." },
      { q: "السَّيَّارَاتُ ___ غَالِيَةٌ.", o: ["السَّرِيعَاتُ", "السَّرِيعَةُ"], a: 1, tr: "Hızlı arabalar pahalıdır.", why: "Akılsız çoğul → tekil müennes." },
      { q: "حَضَرَ المُهَنْدِسُونَ ___.", o: ["المَاهِرُونَ", "المَاهِرَةُ"], a: 0, tr: "Usta mühendisler geldi.", why: "Akıllı çoğul → المَاهِرُونَ." },
      { q: "قَرَأْتُ الكُتُبَ ___.", o: ["المُفِيدِينَ", "المُفِيدَةَ"], a: 1, tr: "Faydalı kitapları okudum.", why: "Akılsız çoğul → المُفِيدَةَ." },
      { q: "لَعِبَ الأَطْفَالُ ___ فِي الحَدِيقَةِ.", o: ["الصِّغَارُ", "الصَّغِيرَةُ"], a: 0, tr: "Küçük çocuklar bahçede oynadı.", why: "Akıllı çoğul → kırık çoğul sıfat: الصِّغَارُ." },
      { q: "سَكَنَّا فِي البُيُوتِ ___.", o: ["الوَاسِعِينَ", "الوَاسِعَةِ"], a: 1, tr: "Geniş evlerde oturduk.", why: "Akılsız çoğul → الوَاسِعَةِ." },
      { q: "شَاهَدْنَا اللَّاعِبِينَ ___.", o: ["الفَائِزِينَ", "الفَائِزَةَ"], a: 0, tr: "Kazanan oyuncuları izledik.", why: "Akıllı çoğul → الفَائِزِينَ." },
      { q: "زُرْنَا المَسَاجِدَ ___.", o: ["التَّارِيخِيَّاتِ", "التَّارِيخِيَّةَ"], a: 1, tr: "Tarihî camileri ziyaret ettik.", why: "Akılsız çoğul → التَّارِيخِيَّةَ." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ", tr: "Okuma: İki Parça", short: "Okuma", col: "mv", legend: ["mv", "sf"],
  goals: ["İki metinde bütün sıfat tamlamalarını bulmak", "Sıfatı mevsûfa göre harekelemek", "Cümle (mübtedâ-haber) ile tamlamayı ayırmak"],
  examples: [
    { s: "الطِّفْلُ:mv / المَرِيضُ:sf", tr: "Hasta çocuk", why: "Parçanın başlığı bir sıfat tamlamasıdır." },
    { s: "لَكِنَّ:- / المَاءَ:mv / البَارِدَ:sf / ضَرَرٌ:-", tr: "Ama soğuk su zararlıdır.", why: "المَاءُ ضَرُورِيٌّ ise cümledir: biri marife, biri nekire." },
    { s: "يَزُورُ:- / السُّيَّاحُ:- / بُرْجَ:mv / غَلَطَةَ:- / المَشْهُورَ:sf", tr: "Turistler meşhur Galata Kulesi'ni ziyaret eder.", why: "Sıfat muzâfun ileyhten sonra gelse de muzâfı (بُرْجَ) vasfeder ve ona uyar: mansûb." }
  ],
  rules: [
    { tr: "Sıfat dört yönden mevsûfa uyar: i'rab, belirlilik, cinsiyet, sayı.", ex: ["الطَّبِيبُ المَاهِرُ", "عِلَاجًا قَوِيًّا"] },
    { tr: "Akılsız çoğulun sıfatı tekil müennestir.", ex: ["المَبَانِيَ القَدِيمَةَ", "المَسَاجِدَ التَّارِيخِيَّةَ"] },
    { tr: "Akıllı çoğulun sıfatı çoğuldur.", ex: ["سُيَّاحٌ كَثِيرُونَ"] },
    { tr: "Marife + nekire tamlama değil cümledir.", ex: ["المَاءُ ضَرُورِيٌّ", "جَوُّ إِسْطَنْبُولَ لَطِيفٌ"] }
  ],
  kaide: [
    "١ ـ الصِّفَةُ اسْمٌ يَصِفُ اسْمًا قَبْلَهُ وَيُوَضِّحُهُ.",
    "٢ ـ الصِّفَةُ وَالمَوْصُوفُ مُتَطَابِقَانِ فِي الإِعْرَابِ، وَالتَّعْرِيفِ وَالتَّنْكِيرِ، وَالتَّذْكِيرِ وَالتَّأْنِيثِ، وَالإِفْرَادِ وَالتَّثْنِيَةِ وَالجَمْعِ.",
    "٣ ـ إِذَا كَانَ المَوْصُوفُ غَيْرَ عَاقِلٍ، لَا يَتَطَابَقُ مَعَ الصِّفَةِ فِي الجَمْعِ."
  ],
  ex: [
    { type: "find", target: "y", reading: true, num: "١٠ (أ)", ar: "اقْرَأِ القِطْعَةَ وَعَيِّنِ الصِّفَةَ وَالمَوْصُوفَ", tr: "Birinci parça. Her cümlede sıfat tamlamasına giren iki kelimeye de (mevsûf ve sıfat) dokun, sonra Kontrol et.",
      title: "الطِّفْلُ المَرِيضُ",
      text: "شَعَرَ الطِّفْلُ الصَّغِيرُ بِأَلَمٍ شَدِيدٍ فِي مَعِدَتِهِ. أَخَذَتْهُ أُمُّهُ إِلَى الطَّبِيبِ المُنَاوِبِ. فَحَصَ الطَّبِيبُ الطِّفْلَ ثُمَّ سَأَلَ الأُمَّ: مَاذَا أَكَلَ وَلَدُكِ؟ قَالَتْ: أَكَلَ طَعَامًا كَثِيرًا وَشَرِبَ مَاءً بَارِدًا. قَالَ الطَّبِيبُ: المَاءُ ضَرُورِيٌّ لِلْحَيَاةِ، لَكِنَّ المَاءَ البَارِدَ ضَرَرٌ لِصِحَّةِ الأَوْلَادِ، أَنَا أَنْصَحُكِ بِالمَاءِ الدَّافِئِ.<br>كَتَبَ الطَّبِيبُ المَاهِرُ عِلَاجًا قَوِيًّا. ذَهَبَتِ الأُمُّ إِلَى الصَّيْدَلِيَّةِ وَأَخَذَتِ العِلَاجَ ثُمَّ رَجَعَتْ إِلَى البَيْتِ. شَرِبَ الطِّفْلُ العِلَاجَ يَوْمَيْنِ مُنْتَظِمَيْنِ ثُمَّ أَصْبَحَ طِفْلًا نَشِيطًا كَمَا كَانَ.",
      textTr: "Hasta Çocuk. Küçük çocuk midesinde şiddetli bir ağrı hissetti. Annesi onu nöbetçi doktora götürdü. Doktor çocuğu muayene etti, sonra anneye sordu: Oğlunuz ne yedi? Anne: Çok yemek yedi ve soğuk su içti, dedi. Doktor: Su hayat için gereklidir, ama soğuk su çocukların sağlığına zararlıdır; size ılık su öneririm, dedi. Usta doktor güçlü bir ilaç yazdı. Anne eczaneye gidip ilacı aldı ve eve döndü. Çocuk ilacı iki gün düzenli olarak içti, sonra eskisi gibi hareketli bir çocuk oldu.",
      items: [
      W("شَعَرَ [الطِّفْلُ] [الصَّغِيرُ] [بِأَلَمٍ] [شَدِيدٍ] فِي {مَعِدَتِهِ}.", "Küçük çocuk midesinde şiddetli bir ağrı hissetti.", "İki tamlama: الطِّفْلُ الصَّغِيرُ (marife, merfû) ve أَلَمٍ شَدِيدٍ (nekire, mecrûr)."),
      W("أَخَذَتْهُ أُمُّهُ إِلَى [الطَّبِيبِ] [المُنَاوِبِ].", "Annesi onu nöbetçi doktora götürdü.", "Marife, mecrûr."),
      W("أَكَلَ [طَعَامًا] [كَثِيرًا] وَشَرِبَ [مَاءً] [بَارِدًا].", "Çok yemek yedi ve soğuk su içti.", "İkisi de nekire ve mansûb."),
      W("المَاءُ ضَرُورِيٌّ لِلْحَيَاةِ، لَكِنَّ [المَاءَ] [البَارِدَ] ضَرَرٌ لِصِحَّةِ الأَوْلَادِ.", "Su hayat için gereklidir, ama soğuk su çocukların sağlığına zararlıdır.", "المَاءُ ضَرُورِيٌّ tamlama değil cümle: marife + nekire."),
      W("أَنَا {أَنْصَحُكِ} [بِالمَاءِ] [الدَّافِئِ].", "Size ılık su öneririm.", "Marife, mecrûr."),
      W("كَتَبَ [الطَّبِيبُ] [المَاهِرُ] [عِلَاجًا] [قَوِيًّا].", "Usta doktor güçlü bir ilaç yazdı.", "الطَّبِيبُ المَاهِرُ fâil (merfû); عِلَاجًا قَوِيًّا mef'ûl (mansûb)."),
      W("شَرِبَ الطِّفْلُ العِلَاجَ [يَوْمَيْنِ] [مُنْتَظِمَيْنِ] ثُمَّ أَصْبَحَ [طِفْلًا] [نَشِيطًا] كَمَا كَانَ.", "Çocuk ilacı iki gün düzenli içti, sonra eskisi gibi hareketli bir çocuk oldu.", "يَوْمَيْنِ مُنْتَظِمَيْنِ: müsennâ tamlama.")
    ]},
    { type: "find", target: "y", reading: true, num: "١٠ (ب)", ar: "اقْرَأِ القِطْعَةَ وَعَيِّنِ الصِّفَةَ وَالمَوْصُوفَ", tr: "İkinci parça. Sıfat tamlamalarına dokun. Dikkat: akılsız çoğulların sıfatı tekil müennes.",
      title: "إِسْطَنْبُولُ: المَدِينَةُ القَدِيمَةُ وَالحَدِيثَةُ",
      text: "إِسْطَنْبُولُ مَدِينَةٌ قَدِيمَةٌ وَحَدِيثَةٌ فِي نَفْسِ الوَقْتِ. فِي إِسْطَنْبُولَ تَارِيخٌ قَدِيمٌ وَتَارِيخٌ حَدِيثٌ. يَرَى الإِنْسَانُ فِي هَذِهِ المَدِينَةِ المَبَانِيَ القَدِيمَةَ وَالمَبَانِيَ الحَدِيثَةَ جَنْبًا إِلَى جَنْبٍ. وَيُشَاهِدُ الإِنْسَانُ أَيْضًا المَسَاجِدَ التَّارِيخِيَّةَ وَالأَسْوَاقَ العُثْمَانِيَّةَ وَالأَسْوَارَ العَالِيَةَ وَالمَنَاظِرَ الطَّبِيعِيَّةَ وَالسَّاحِلَ الطَّوِيلَ وَالمَضِيقَ الجَمِيلَ. هَذِهِ المَدِينَةُ مَرْكَزُ التِّجَارَةِ وَالسِّيَاحَةِ، وَمَرْكَزُ العِلْمِ وَالفَنِّ وَالثَّقَافَةِ.<br>يَحْضُرُ إِلَى إِسْطَنْبُولَ فِي فَصْلِ الصَّيْفِ سُيَّاحٌ كَثِيرُونَ مِنْ أُورُبَّا وَأَمْرِيكَا وَآسْيَا. يَزُورُ السُّيَّاحُ مِنْطَقَةَ سُلْطَانِ أَحْمَدَ وَبَايَزِيدَ وَبُرْجَ غَلَطَةَ المَشْهُورَ.<br>جَوُّ إِسْطَنْبُولَ لَطِيفٌ، هُوَ لَيْسَ حَارًّا وَلَا بَارِدًا. يَنْزِلُ المَطَرُ الغَزِيرُ فِي فَصْلِ الرَّبِيعِ كَثِيرًا، وَنِسْبَةُ الرُّطُوبَةِ فِي مَوْسِمِ الصَّيْفِ عَالِيَةٌ. لَا يَنْزِلُ الثَّلْجُ كَثِيرًا فِي الشِّتَاءِ. وَيَشْعُرُ سَاكِنُ إِسْطَنْبُولَ بِأَنَّهُ مَحْظُوظٌ دَائِمًا.",
      textTr: "İstanbul: Eski ve Yeni Şehir. İstanbul aynı anda hem eski hem yeni bir şehirdir. İstanbul'da eski bir tarih de yeni bir tarih de vardır. İnsan bu şehirde eski binaları ve yeni binaları yan yana görür. Tarihî camileri, Osmanlı çarşılarını, yüksek surları, doğal manzaraları, uzun sahili ve güzel boğazı da seyreder. Bu şehir ticaretin ve turizmin, ilmin, sanatın ve kültürün merkezidir. Yaz mevsiminde İstanbul'a Avrupa, Amerika ve Asya'dan pek çok turist gelir. Turistler Sultanahmet ve Beyazıt bölgesini ve meşhur Galata Kulesi'ni ziyaret eder. İstanbul'un havası güzeldir; ne sıcak ne soğuktur. İlkbaharda sık sık şiddetli yağmur yağar, yazın nem oranı yüksektir. Kışın pek kar yağmaz. İstanbul'da oturan kişi kendini hep şanslı hisseder.",
      items: [
      W("إِسْطَنْبُولُ [مَدِينَةٌ] [قَدِيمَةٌ] [وَحَدِيثَةٌ] فِي نَفْسِ الوَقْتِ.", "İstanbul aynı anda hem eski hem yeni bir şehirdir.", "Bir mevsûfun iki sıfatı var: قَدِيمَةٌ وَحَدِيثَةٌ."),
      W("فِي إِسْطَنْبُولَ [تَارِيخٌ] [قَدِيمٌ] [وَتَارِيخٌ] [حَدِيثٌ].", "İstanbul'da eski ve yeni bir tarih vardır.", "İki nekire tamlama."),
      W("يَرَى الإِنْسَانُ فِي هَذِهِ المَدِينَةِ [المَبَانِيَ] [القَدِيمَةَ] [وَالمَبَانِيَ] [الحَدِيثَةَ] جَنْبًا إِلَى جَنْبٍ.", "İnsan bu şehirde eski ve yeni binaları yan yana görür.", "المَبَانِي akılsız çoğul → القَدِيمَةَ, الحَدِيثَةَ. (هَذِهِ المَدِينَةِ ism-i işarettir.)"),
      W("وَيُشَاهِدُ الإِنْسَانُ أَيْضًا [المَسَاجِدَ] [التَّارِيخِيَّةَ] [وَالأَسْوَاقَ] [العُثْمَانِيَّةَ] [وَالأَسْوَارَ] [العَالِيَةَ].", "Tarihî camileri, Osmanlı çarşılarını, yüksek surları da görür.", "Hepsi akılsız çoğul → tekil müennes sıfat."),
      W("{…} [وَالمَنَاظِرَ] [الطَّبِيعِيَّةَ] [وَالسَّاحِلَ] [الطَّوِيلَ] [وَالمَضِيقَ] [الجَمِيلَ].", "…doğal manzaraları, uzun sahili ve güzel boğazı.", "السَّاحِلَ ve المَضِيقَ tekil müzekker → الطَّوِيلَ, الجَمِيلَ."),
      W("يَحْضُرُ إِلَى إِسْطَنْبُولَ فِي فَصْلِ الصَّيْفِ [سُيَّاحٌ] [كَثِيرُونَ] مِنْ أُورُبَّا.", "Yazın İstanbul'a Avrupa'dan pek çok turist gelir.", "Akıllı çoğul → çoğul sıfat: كَثِيرُونَ."),
      W("يَزُورُ السُّيَّاحُ مِنْطَقَةَ سُلْطَانِ_أَحْمَدَ وَ[بُرْجَ] غَلَطَةَ [المَشْهُورَ].", "Turistler Sultanahmet bölgesini ve meşhur Galata Kulesi'ni ziyaret eder.", "المَشْهُورَ, izafetle marife olan بُرْجَ'i vasfeder: mansûb."),
      W("جَوُّ إِسْطَنْبُولَ لَطِيفٌ، هُوَ لَيْسَ حَارًّا وَلَا بَارِدًا.", "İstanbul'un havası güzeldir; ne sıcak ne soğuktur.", "Bu cümlede sıfat tamlaması yok: لَطِيفٌ haberdir (جَوُّ marife, لَطِيفٌ nekire)."),
      W("يَنْزِلُ [المَطَرُ] [الغَزِيرُ] فِي فَصْلِ الرَّبِيعِ كَثِيرًا.", "İlkbaharda sık sık şiddetli yağmur yağar.", "Marife, merfû (fâil).")
    ]},
    { type: "irab", num: "١٠ (ج)", tlist: YER_OPTS, tlbl: "Tamlamadaki yeri", ar: "اضْبِطِ الصِّفَةَ وَالمَوْصُوفَ", tr: "Altı çizili kelime mevsûf mu, sıfat mı? Hali ne?", items: [
      IR("شَعَرَ [الطِّفْلُ] الصَّغِيرُ بِأَلَمٍ شَدِيدٍ.", "mv", "ref", "Mevsûf; fâil → merfû.", "Küçük çocuk şiddetli bir ağrı hissetti."),
      IR("شَعَرَ الطِّفْلُ [الصَّغِيرُ] بِأَلَمٍ شَدِيدٍ.", "sf", "ref", "Sıfat; mevsûfu merfû.", "Küçük çocuk şiddetli bir ağrı hissetti."),
      IR("شَعَرَ الطِّفْلُ الصَّغِيرُ بِأَلَمٍ [شَدِيدٍ].", "sf", "cerr", "Sıfat; mevsûfu بِـ ile mecrûr.", "Küçük çocuk şiddetli bir ağrı hissetti."),
      IR("أَخَذَتْهُ أُمُّهُ إِلَى الطَّبِيبِ [المُنَاوِبِ].", "sf", "cerr", "Sıfat; mevsûfu mecrûr.", "Annesi onu nöbetçi doktora götürdü."),
      IR("وَشَرِبَ مَاءً [بَارِدًا].", "sf", "nasb", "Sıfat; mevsûfu mef'ûl (mansûb).", "Ve soğuk su içti."),
      IR("أَنَا أَنْصَحُكِ بِالمَاءِ [الدَّافِئِ].", "sf", "cerr", "Sıfat; mevsûfu mecrûr.", "Size ılık su öneririm."),
      IR("كَتَبَ الطَّبِيبُ المَاهِرُ [عِلَاجًا] قَوِيًّا.", "mv", "nasb", "Mevsûf; mef'ûl → mansûb.", "Usta doktor güçlü bir ilaç yazdı."),
      IR("ثُمَّ أَصْبَحَ طِفْلًا [نَشِيطًا].", "sf", "nasb", "Sıfat; mevsûfu طِفْلًا mansûb (أَصْبَحَ'nin haberi).", "Sonra hareketli bir çocuk oldu."),
      IR("إِسْطَنْبُولُ مَدِينَةٌ [قَدِيمَةٌ].", "sf", "ref", "Sıfat; mevsûfu haber (merfû).", "İstanbul eski bir şehirdir."),
      IR("يَرَى الإِنْسَانُ المَبَانِيَ [القَدِيمَةَ].", "sf", "nasb", "Sıfat; mevsûfu mef'ûl. Akılsız çoğul → tekil müennes.", "İnsan eski binaları görür."),
      IR("وَيُشَاهِدُ [المَسَاجِدَ] التَّارِيخِيَّةَ.", "mv", "nasb", "Mevsûf; mef'ûl → mansûb.", "Tarihî camileri seyreder."),
      IR("يَحْضُرُ إِلَى إِسْطَنْبُولَ سُيَّاحٌ [كَثِيرُونَ].", "sf", "ref", "Sıfat; mevsûfu fâil. Akıllı çoğul → çoğul sıfat.", "İstanbul'a pek çok turist gelir."),
      IR("يَزُورُ السُّيَّاحُ بُرْجَ غَلَطَةَ [المَشْهُورَ].", "sf", "nasb", "Sıfat; mevsûfu بُرْجَ mef'ûl (mansûb).", "Turistler meşhur Galata Kulesi'ni ziyaret eder."),
      IR("يَنْزِلُ [المَطَرُ] الغَزِيرُ فِي فَصْلِ الرَّبِيعِ.", "mv", "ref", "Mevsûf; fâil → merfû.", "İlkbaharda şiddetli yağmur yağar.")
    ]}
  ]
}
];

// Oyun havuzu: [cümle {sıfat}, seçenekler (ilki doğru), hal, açıklama, Türkçe, konu]
var SF_POOL = [
  ["الكِتَابُ صَدِيقٌ {مُفِيدٌ}.", ["مُفِيدٌ", "المُفِيدُ", "مُفِيدًا", "مُفِيدَةٌ"], "ref", "mevsûf صَدِيقٌ: nekire, müzekker, merfû", "Kitap faydalı bir dosttur.", "u1"],
  ["المَطَرُ {الغَزِيرُ} خَطَرٌ أَحْيَانًا.", ["الغَزِيرُ", "غَزِيرٌ", "الغَزِيرَ", "الغَزِيرَةُ"], "ref", "mevsûf المَطَرُ: marife, müzekker, merfû", "Şiddetli yağmur bazen tehlikelidir.", "u1"],
  ["مَكَّةُ مَدِينَةٌ {مُقَدَّسَةٌ}.", ["مُقَدَّسَةٌ", "مُقَدَّسٌ", "المُقَدَّسَةُ", "مُقَدَّسَةً"], "ref", "mevsûf مَدِينَةٌ: nekire, müennes, merfû", "Mekke kutsal bir şehirdir.", "u1"],
  ["نَسْكُنُ فِي حَدِيقَةٍ {وَاسِعَةٍ}.", ["وَاسِعَةٍ", "وَاسِعَةٌ", "الوَاسِعَةِ", "وَاسِعٍ"], "cerr", "mevsûf حَدِيقَةٍ: nekire, müennes, mecrûr", "Geniş bir bahçede oturuyoruz.", "u1"],
  ["تَسَابَقْنَا فِي الشَّارِعِ {المُزْدَحِمِ}.", ["المُزْدَحِمِ", "مُزْدَحِمٍ", "المُزْدَحِمُ", "المُزْدَحِمَةِ"], "cerr", "mevsûf الشَّارِعِ: marife, müzekker, mecrûr", "Kalabalık caddede yarıştık.", "u1"],
  ["يَدْرُسُ عَلِيٌّ فِي المَدْرَسَةِ {البَعِيدَةِ}.", ["البَعِيدَةِ", "بَعِيدَةٍ", "البَعِيدِ", "البَعِيدَةُ"], "cerr", "mevsûf المَدْرَسَةِ: marife, müennes, mecrûr", "Ali uzaktaki okulda okuyor.", "u1"],
  ["لَعِبْتُ مَعَ الطِّفْلِ {الصَّغِيرِ}.", ["الصَّغِيرِ", "صَغِيرٍ", "الصَّغِيرَةِ", "الصَّغِيرَ"], "cerr", "mevsûf الطِّفْلِ: marife, müzekker, mecrûr", "Küçük çocukla oynadım.", "u1"],
  ["مَرَرْتُ بِبَلَدٍ {قَدِيمٍ}.", ["قَدِيمٍ", "قَدِيمٌ", "القَدِيمِ", "قَدِيمًا"], "cerr", "mevsûf بَلَدٍ: nekire, mecrûr", "Eski bir şehre uğradım.", "u1"],
  ["شَاهَدْتُ بَلَدًا {قَدِيمًا}.", ["قَدِيمًا", "قَدِيمٌ", "القَدِيمَ", "قَدِيمٍ"], "nasb", "mevsûf بَلَدًا: nekire, mansûb", "Eski bir şehir gördüm.", "u1"],
  ["شَرِبَ الطِّفْلُ مَاءً {بَارِدًا}.", ["بَارِدًا", "البَارِدَ", "بَارِدٌ", "بَارِدَةً"], "nasb", "mevsûf مَاءً: nekire, müzekker, mansûb", "Çocuk soğuk su içti.", "u1"],
  ["كَتَبَ الطَّبِيبُ {المَاهِرُ} عِلَاجًا قَوِيًّا.", ["المَاهِرُ", "مَاهِرٌ", "المَاهِرَ", "المَاهِرَةُ"], "ref", "mevsûf الطَّبِيبُ: marife, müzekker, merfû", "Usta doktor güçlü bir ilaç yazdı.", "u1"],
  ["رَكِبَتِ العَائِلَةُ السَّيَّارَةَ {الحَدِيثَةَ}.", ["الحَدِيثَةَ", "حَدِيثَةً", "الحَدِيثَاتِ", "الحَدِيثَ"], "nasb", "mevsûf السَّيَّارَةَ: marife, müennes, mansûb", "Aile yeni arabaya bindi.", "u2"],
  ["إِسْطَنْبُولُ مَدِينَةٌ {جَمِيلَةٌ}.", ["جَمِيلَةٌ", "الجَمِيلَةُ", "جَمِيلٌ", "جَمِيلَةً"], "ref", "mevsûf مَدِينَةٌ: nekire, müennes, merfû", "İstanbul güzel bir şehirdir.", "u2"],
  ["قَابَلَ إِسْمَاعِيلُ الوَزِيرَ {الجَدِيدَ}.", ["الجَدِيدَ", "جَدِيدًا", "الجَدِيدَةَ", "الجَدِيدُ"], "nasb", "mevsûf الوَزِيرَ: marife, müzekker, mansûb", "İsmail yeni bakanla görüştü.", "u2"],
  ["كَافَأَتِ المُدَرِّسَةُ الطَّالِبَاتِ {النَّاجِحَاتِ}.", ["النَّاجِحَاتِ", "النَّاجِحَةَ", "النَّاجِحَاتُ", "نَاجِحَاتٍ"], "nasb", "akıllı çoğul → çoğul sıfat; mansûb CMeS kesre", "Kadın öğretmen başarılı kız öğrencileri ödüllendirdi.", "u2"],
  ["المُوَظَّفَانِ {النَّشِيطَانِ} بَاكِسْتَانِيَّانِ.", ["النَّشِيطَانِ", "النَّشِيطَيْنِ", "نَشِيطَانِ", "النَّشِيطُونَ"], "ref", "mevsûf müsennâ, marife, merfû", "Çalışkan iki memur Pakistanlıdır.", "u2"],
  ["العَامِلُونَ {المُخْلِصُونَ} سُورِيُّونَ.", ["المُخْلِصُونَ", "المُخْلِصِينَ", "المُخْلِصُ", "مُخْلِصُونَ"], "ref", "akıllı çoğul, marife, merfû", "İhlaslı işçiler Suriyelidir.", "u2"],
  ["هَذَانِ طَالِبَانِ {طَوِيلَانِ}.", ["طَوِيلَانِ", "الطَّوِيلَانِ", "طَوِيلَيْنِ", "طَوِيلٌ"], "ref", "mevsûf müsennâ, nekire, merfû", "Bunlar iki uzun boylu öğrencidir.", "u2"],
  ["لَعِبْنَا مَعَ الطَّالِبَتَيْنِ {المُؤَدَّبَتَيْنِ}.", ["المُؤَدَّبَتَيْنِ", "المُؤَدَّبَتَانِ", "مُؤَدَّبَتَيْنِ", "المُؤَدَّبَيْنِ"], "cerr", "mevsûf müennes müsennâ, marife, mecrûr", "İki terbiyeli kız öğrenciyle oynadık.", "u2"],
  ["زَرَعَتْ سَارَةُ الشَّجَرَةَ {الطَّوِيلَةَ}.", ["الطَّوِيلَةَ", "طَوِيلَةً", "الطَّوِيلَ", "الطَّوِيلَةُ"], "nasb", "mevsûf الشَّجَرَةَ: marife, müennes, mansûb", "Sâra uzun ağacı dikti.", "u2"],
  ["حَضَرَتِ الطَّالِبَاتُ {الغَائِبَاتُ}.", ["الغَائِبَاتُ", "الغَائِبَةُ", "الغَائِبَاتِ", "غَائِبَاتٌ"], "ref", "akıllı çoğul, marife, merfû", "Gelmeyen kız öğrenciler geldi.", "u2"],
  ["شَكَرَ المُعَلِّمُ الطَّالِبَاتِ {النَّشِيطَاتِ}.", ["النَّشِيطَاتِ", "النَّشِيطَاتَ", "النَّشِيطَةَ", "نَشِيطَاتٍ"], "nasb", "akıllı çoğul; mansûb CMeS kesre", "Öğretmen çalışkan kız öğrencilere teşekkür etti.", "u2"],
  ["دَرَسَ المُفَكِّرُونَ {المُسْلِمُونَ} المَسْأَلَةَ.", ["المُسْلِمُونَ", "المُسْلِمِينَ", "مُسْلِمُونَ", "المُسْلِمَةُ"], "ref", "akıllı çoğul, marife, merfû", "Müslüman düşünürler meseleyi inceledi.", "u2"],
  ["شَاهَدَ عَلِيٌّ اللَّاعِبِينَ {المَاهِرِينَ}.", ["المَاهِرِينَ", "المَاهِرُونَ", "مَاهِرِينَ", "المَاهِرَةَ"], "nasb", "akıllı çoğul, marife, mansûb", "Ali usta oyuncuları izledi.", "u2"],
  ["الأَشْجَارُ {القَدِيمَةُ} قَصِيرَةٌ.", ["القَدِيمَةُ", "القَدِيمَاتُ", "قَدِيمَةٌ", "القَدِيمُ"], "ref", "akılsız çoğul → tekil müennes, marife", "Eski ağaçlar kısadır.", "u3"],
  ["السَّاعَاتُ {الكَبِيرَةُ} عَاطِلَةٌ.", ["الكَبِيرَةُ", "الكَبِيرَاتُ", "كَبِيرَةٌ", "الكَبِيرُ"], "ref", "akılsız çoğul → tekil müennes", "Büyük saatler bozuktur.", "u3"],
  ["السَّيَّارَاتُ {السَّرِيعَةُ} خَطَرٌ.", ["السَّرِيعَةُ", "السَّرِيعَاتُ", "سَرِيعَةٌ", "السَّرِيعُ"], "ref", "akılsız çoğul → tekil müennes", "Hızlı arabalar tehlikedir.", "u3"],
  ["صَوَّرْنَا الأَشْجَارَ {الطَّوِيلَةَ}.", ["الطَّوِيلَةَ", "الطَّوِيلَاتِ", "طَوِيلَةً", "الطَّوِيلَ"], "nasb", "akılsız çoğul → tekil müennes, mansûb", "Uzun ağaçların fotoğrafını çektik.", "u3"],
  ["كَبُرَتِ البَقَرَاتُ {الصَّغِيرَةُ}.", ["الصَّغِيرَةُ", "الصَّغِيرَاتُ", "الصَّغِيرُ", "صَغِيرَةٌ"], "ref", "akılsız çoğul → tekil müennes", "Küçük inekler büyüdü.", "u3"],
  ["حَفِظْنَا كَلِمَاتٍ {جَدِيدَةً}.", ["جَدِيدَةً", "جَدِيدًا", "الجَدِيدَةَ", "جَدِيدَةٍ"], "nasb", "akılsız çoğul, nekire, mansûb", "Yeni kelimeler ezberledik.", "u3"],
  ["يَرَى الإِنْسَانُ المَبَانِيَ {القَدِيمَةَ}.", ["القَدِيمَةَ", "القَدِيمَاتِ", "قَدِيمَةً", "القَدِيمَ"], "nasb", "akılsız çoğul → tekil müennes, mansûb", "İnsan eski binaları görür.", "u4"],
  ["يَحْضُرُ إِلَى إِسْطَنْبُولَ سُيَّاحٌ {كَثِيرُونَ}.", ["كَثِيرُونَ", "كَثِيرَةٌ", "الكَثِيرُونَ", "كَثِيرِينَ"], "ref", "akıllı çoğul, nekire, merfû", "İstanbul'a pek çok turist gelir.", "u4"],
  ["يَزُورُ السُّيَّاحُ بُرْجَ غَلَطَةَ {المَشْهُورَ}.", ["المَشْهُورَ", "المَشْهُورِ", "مَشْهُورًا", "المَشْهُورَةَ"], "nasb", "mevsûf بُرْجَ (izafetle marife), mansûb", "Turistler meşhur Galata Kulesi'ni ziyaret eder.", "u4"]
];
// Uyum kontrolü: [ifade, doğru mu, açıklama]
var DY_POOL = [
  ["بَلَدٌ قَدِيمٌ", true, "Dört yönden uyumlu."], ["البَلَدُ القَدِيمُ", true, "Marife + marife."], ["فِي بَلَدٍ قَدِيمٍ", true, "İkisi de mecrûr."], ["رَأَيْتُ بَلَدًا قَدِيمًا", true, "İkisi de mansûb."],
  ["الشَّجَرَةُ الطَّوِيلَةُ", true, "Müennes + müennes."], ["طَالِبَانِ طَوِيلَانِ", true, "Müsennâ + müsennâ."], ["الطَّالِبَاتُ الغَائِبَاتُ", true, "Akıllı çoğul → çoğul sıfat."], ["المُهَنْدِسُونَ المَاهِرُونَ", true, "Akıllı çoğul, merfû."],
  ["السَّيَّارَاتُ السَّرِيعَةُ", true, "Akılsız çoğul → tekil müennes."], ["الأَشْجَارُ الطَّوِيلَةُ", true, "Akılsız çoğul → tekil müennes."], ["مَعَ الطِّفْلِ الصَّغِيرِ", true, "Marife, mecrûr."], ["شَكَرْتُ الطَّالِبَاتِ النَّشِيطَاتِ", true, "Mansûb CMeS: kesre."],
  ["بَلَدٌ القَدِيمُ", false, "Belirlilik uymuyor: بَلَدٌ قَدِيمٌ ya da البَلَدُ القَدِيمُ."], ["فِي بَلَدٍ قَدِيمٌ", false, "İ'rab uymuyor: قَدِيمٍ olmalı."], ["رَأَيْتُ بَلَدًا قَدِيمٌ", false, "İ'rab uymuyor: قَدِيمًا olmalı."], ["الشَّجَرَةُ الطَّوِيلُ", false, "Cinsiyet uymuyor: الطَّوِيلَةُ."],
  ["طَالِبَانِ طَوِيلٌ", false, "Sayı uymuyor: طَوِيلَانِ."], ["الطَّالِبَاتُ الغَائِبَةُ", false, "Akıllı çoğulun sıfatı çoğul: الغَائِبَاتُ."], ["المُهَنْدِسُونَ المَاهِرِينَ", false, "İ'rab uymuyor: المَاهِرُونَ."], ["الأَشْجَارُ الطَّوِيلُونَ", false, "Akılsız çoğul → الطَّوِيلَةُ."],
  ["مَعَ الطِّفْلِ صَغِيرٍ", false, "Belirlilik uymuyor: الصَّغِيرِ."], ["شَكَرْتُ الطَّالِبَاتِ النَّشِيطَاتَ", false, "CMeS mansûbken kesre: النَّشِيطَاتِ."], ["المُعَلِّمَةُ النَّشِيطُ", false, "Cinsiyet uymuyor: النَّشِيطَةُ."], ["طَالِبَتَانِ طَوِيلَتَيْنِ", false, "İ'rab uymuyor: طَوِيلَتَانِ."]
];
// Akıllı mı akılsız mı: [çoğul, a/g, örnek tamlama]
var AKIL_POOL = [
  ["الطُّلَّابُ", "a", "الطُّلَّابُ النَّشِيطُونَ"], ["الطَّالِبَاتُ", "a", "الطَّالِبَاتُ الغَائِبَاتُ"], ["المُهَنْدِسُونَ", "a", "المُهَنْدِسُونَ المَاهِرُونَ"], ["الأَطْفَالُ", "a", "الأَطْفَالُ الصِّغَارُ"],
  ["الرِّجَالُ", "a", "الرِّجَالُ الطِّوَالُ"], ["المُعَلِّمَاتُ", "a", "المُعَلِّمَاتُ الجَدِيدَاتُ"], ["اللَّاعِبُونَ", "a", "اللَّاعِبُونَ الفَائِزُونَ"], ["السُّيَّاحُ", "a", "سُيَّاحٌ كَثِيرُونَ"], ["العُمَّالُ", "a", "العُمَّالُ النُّشَطَاءُ"], ["المُفَكِّرُونَ", "a", "المُفَكِّرُونَ المُسْلِمُونَ"],
  ["السَّيَّارَاتُ", "g", "السَّيَّارَاتُ السَّرِيعَةُ"], ["الأَشْجَارُ", "g", "الأَشْجَارُ الطَّوِيلَةُ"], ["الكُتُبُ", "g", "الكُتُبُ المُفِيدَةُ"], ["البُيُوتُ", "g", "البُيُوتُ الوَاسِعَةُ"], ["السَّاعَاتُ", "g", "السَّاعَاتُ الكَبِيرَةُ"],
  ["المَسَاجِدُ", "g", "المَسَاجِدُ التَّارِيخِيَّةُ"], ["الأَسْوَاقُ", "g", "الأَسْوَاقُ العُثْمَانِيَّةُ"], ["البَقَرَاتُ", "g", "البَقَرَاتُ الصَّغِيرَةُ"], ["الكَلِمَاتُ", "g", "الكَلِمَاتُ الجَدِيدَةُ"], ["المَبَانِي", "g", "المَبَانِي القَدِيمَةُ"], ["الأَرَانِبُ", "g", "الأَرَانِبُ السَّرِيعَةُ"], ["المَجَلَّاتُ", "g", "المَجَلَّاتُ العَرَبِيَّةُ"]
];
var HAFIZA = {
  tr: { name: "Türkçe ↔ Arapça", pairs: [["eski bir şehir", "بَلَدٌ قَدِيمٌ"], ["uzun sahil", "السَّاحِلُ الطَّوِيلُ"], ["şiddetli yağmur", "المَطَرُ الغَزِيرُ"], ["tarihî camiler", "المَسَاجِدُ التَّارِيخِيَّةُ"], ["soğuk su", "مَاءٌ بَارِدٌ"], ["usta doktor", "الطَّبِيبُ المَاهِرُ"], ["kalabalık cadde", "الشَّارِعُ المُزْدَحِمُ"], ["kutsal şehir", "مَدِينَةٌ مُقَدَّسَةٌ"], ["Osmanlı çarşıları", "الأَسْوَاقُ العُثْمَانِيَّةُ"], ["ılık su", "المَاءُ الدَّافِئُ"], ["küçük çocuklar", "الأَطْفَالُ الصِّغَارُ"], ["hızlı arabalar", "السَّيَّارَاتُ السَّرِيعَةُ"]] },
  cins: { name: "Müzekker ↔ müennes", pairs: [["المُوَظَّفُ التُّرْكِيُّ", "المُوَظَّفَةُ التُّرْكِيَّةُ"], ["الطِّفْلُ الصَّغِيرُ", "الطِّفْلَةُ الصَّغِيرَةُ"], ["الكَاتِبُ المَشْهُورُ", "الكَاتِبَةُ المَشْهُورَةُ"], ["الحَاكِمُ العَادِلُ", "الحَاكِمَةُ العَادِلَةُ"], ["المُهَنْدِسُ المَاهِرُ", "المُهَنْدِسَةُ المَاهِرَةُ"], ["الطَّالِبُ النَّاجِحُ", "الطَّالِبَةُ النَّاجِحَةُ"], ["عَالِمٌ مَشْهُورٌ", "عَالِمَةٌ مَشْهُورَةٌ"], ["المُسْلِمُ المُخْلِصُ", "المُسْلِمَةُ المُخْلِصَةُ"]] }
};
var KARTLAR = [
  ["Sıfat nedir?", "Kendinden önceki ismi vasfeden isim. Vasfedilen isme mevsûf denir: بَلَدٌ قَدِيمٌ"],
  ["Sıfat mevsûfa kaç yönden uyar?", "Dört: i'rab, belirlilik (marife-nekire), cinsiyet, sayı."],
  ["İ'rab uyumuna örnek?", "بَلَدٌ قَدِيمٌ · بَلَدًا قَدِيمًا · بِبَلَدٍ قَدِيمٍ"],
  ["Belirlilik uyumuna örnek?", "بَلَدٌ قَدِيمٌ (nekire) · الشَّجَرَةُ الطَّوِيلَةُ (marife)"],
  ["الكِتَابُ مُفِيدٌ ile الكِتَابُ المُفِيدُ farkı?", "Birincisi cümle: kitap faydalıdır. İkincisi tamlama: faydalı kitap."],
  ["Müsennâ mevsûfun sıfatı?", "Müsennâ: طَالِبَانِ طَوِيلَانِ · الطَّالِبَتَيْنِ المُؤَدَّبَتَيْنِ"],
  ["Akıllı çoğulun sıfatı?", "Çoğul: الطَّالِبَاتُ الغَائِبَاتُ · اللَّاعِبِينَ المَاهِرِينَ"],
  ["Akılsız çoğulun sıfatı?", "Tekil müennes: السَّيَّارَاتُ السَّرِيعَةُ · الأَشْجَارَ الطَّوِيلَةَ"],
  ["Akılsız ne demek?", "İnsan dışındaki her şey: eşya, bitki, hayvan. كُتُبٌ، أَشْجَارٌ، بَقَرَاتٌ"],
  ["CMeS mevsûf mansûbsa sıfatın harekesi?", "Kesre: شَكَرَ المُعَلِّمُ الطَّالِبَاتِ النَّشِيطَاتِ"],
  ["Türkçe ile sıra farkı?", "Türkçe: eski şehir (sıfat önce). Arapça: بَلَدٌ قَدِيمٌ (sıfat sonra)."],
  ["Muzâfın sıfatı nereye gelir?", "Muzâfun ileyhten sonra: بُرْجَ غَلَطَةَ المَشْهُورَ"]
];
