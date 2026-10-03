// ================= VERİ: Muzâri Fiilin Nasbı (نَصْبُ الفِعْلِ المُضَارِعِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "nasb.fetha" gibi yazılırsa etikete not eklenir.
var ROLES = {
  mz: { ar: "أَدَاةُ نَصْبٍ", tr: "Nasb edatı" }, mi: { ar: "فَاءُ السَّبَبِيَّةِ", tr: "Fâ-i sebebiyye" },
  nasb: { ar: "مَنْصُوبٌ", tr: "Mansûb fiil" }, ref: { ar: "مَرْفُوعٌ", tr: "Merfû fiil" }, sf: { ar: "نَفْيٌ / طَلَبٌ", tr: "Nefy / talep" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cerr", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var SEBEP_OPTS = [["edat", "Nasb edatından sonra", "بَعْدَ أَدَاةِ نَصْبٍ", "mz"], ["yok", "Önünde nasb edatı yok", "لَا نَاصِبَ", "ref"], ["cer", "Harf-i cer / muzâf", "بَعْدَ جَارٍّ", "cerr"], ["mef", "Mef'ûl bih", "مَفْعُولٌ بِهِ", "nasb"]];
var TUR_OPTS = SEBEP_OPTS;
var NM_OPTS = [["nasb", "Mansûb (fetha)", "مَنْصُوبٌ", "nasb"], ["ref", "Merfû (damme)", "مَرْفُوعٌ", "ref"]];
var TALEP_OPTS = [["nefy", "Nefy", "نَفْيٌ", "x"], ["emir", "Emir", "أَمْرٌ", "x"], ["nehy", "Nehy", "نَهْيٌ", "x"], ["soru", "Soru", "اسْتِفْهَامٌ", "x"], ["temenni", "Temenni", "تَمَنٍّ", "x"]];
var E6 = ["أَنْ", "لَنْ", "كَيْ", "لِكَيْ", "حَتَّى", "لِـ"];
// amaç edatlarının hepsi (كَيْ، لِكَيْ، حَتَّى، لِـ) doğru sayılır
function AM(pre, post) { return [2, 3, 4, 5].map(function (x) { return pre.concat([x]).concat(post || []); }); }

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
// ---------------------------------------------------------------- 1 · أَنْ VE لَنْ
{
  id: "u1", no: 1, ar: "أَدَوَاتُ النَّصْبِ: أَنْ وَلَنْ", tr: "Nasb Edatları: أَنْ ve لَنْ", short: "أَنْ · لَنْ", col: "mz", legend: ["mz", "nasb"],
  goals: ["Muzârinin normalde merfû (sonu damme) olduğunu, nasb edatı gelince mansûb (sonu fetha) olduğunu görmek", "Altı nasb edatını ezberlemek", "أَنْ'in \"-mek / -mesi\", لَنْ'in \"asla …meyecek\" anlamı kattığını bilmek"],
  examples: [
    { s: "أُرِيدُ:- / أَنْ:mz / أَشْرَبَ:nasb / قَهْوَةً:-", tr: "Kahve içmek istiyorum.", why: "أَشْرَبُ ← أَنْ أَشْرَبَ: damme fethaya döndü." },
    { s: "يَجِبُ:- / أَنْ:mz / تُمَارِسَ:nasb / الرِّيَاضَةَ:-", tr: "Spor yapman gerekir.", why: "أَنْ'den sonra mansûb." },
    { s: "أَتَمَنَّى:- / أَنْ:mz / تَنْجَحَ:nasb / فِي:- / الامْتِحَانِ:-", tr: "Sınavda başarılı olmanı dilerim.", why: "أَنْ'den sonra mansûb." },
    { s: "لَنْ:mz / أَنَامَ:nasb / مُتَأَخِّرًا:-", tr: "Asla geç uyumayacağım.", why: "أَنَامُ ← لَنْ أَنَامَ." },
    { s: "لَنْ:mz / أَتَنَاوَلَ:nasb / مِنَ:- / الطَّعَامِ:- / كَثِيرًا:-", tr: "Yemekten çok yemeyeceğim.", why: "لَنْ'den sonra mansûb." },
    { s: "لَنْ:mz / أَكْذِبَ:nasb / أَبَدًا:-", tr: "Asla yalan söylemeyeceğim.", why: "لَنْ geleceği kesin olarak olumsuz yapar." }
  ],
  rules: [
    { tr: "Muzâri fiil normalde <b class=\"r-ref\">merfû</b>dur; sonu dammelidir. Başına bir <b class=\"r-mz\">nasb edatı</b> gelince <b class=\"r-nasb\">mansûb</b> olur; sonu fethalanır.", ex: ["أَشْرَبُ ← أُرِيدُ أَنْ أَشْرَبَ", "أَنَامُ ← لَنْ أَنَامَ"] },
    { tr: "Nasb edatları: <span class=\"ar\">أَنْ</span>، <span class=\"ar\">لَنْ</span>، <span class=\"ar\">كَيْ</span>، <span class=\"ar\">لِكَيْ</span>، <span class=\"ar\">لِـ</span> (lâm-ı ta'lîl)، <span class=\"ar\">حَتَّى</span>." },
    { tr: "<span class=\"ar\">أَنْ</span> fiile \"-mek, -mesi\" anlamı katar. Çoğunlukla <span class=\"ar\">أُرِيدُ، يَجِبُ، أَتَمَنَّى، قَرَّرَ، يَنْبَغِي</span> gibi fiillerden sonra gelir.", ex: ["قَرَّرَتْ أَنْ تَعْتَمِرَ", "يَجِبُ أَنْ تَسْتَمِعَ"] },
    { tr: "<span class=\"ar\">لَنْ</span> geleceği kesin olarak olumsuz yapar: \"asla …meyeceğim\". <span class=\"ar\">سَـ</span> düşer.", ex: ["سَأَتَأَخَّرُ ← لَنْ أَتَأَخَّرَ"] },
    { tr: "İpucu: sonu <span class=\"ar\">ي</span> olan fiilde fetha görünür: <span class=\"ar\">أُصَلِّيَ، يَأْتِيَ، يَقْضِيَ</span>. Sonu <span class=\"ar\">ا / ى</span> olanda görünmez: <span class=\"ar\">لَنْ يَبْقَى</span>." },
    { tr: "İpucu: <span class=\"ar\">يَفْعَلُونَ، تَفْعَلِينَ، يَفْعَلَانِ</span> gibi sonu nun olan beş fiilde nasbın alameti <b>nunun düşmesi</b>dir.", ex: ["يَذْهَبُونَ ← لَنْ يَذْهَبُوا", "يَمُوتُونَ ← فَيَمُوتُوا"] }
  ],
  kaide: [
    "١ ـ مِنْ أَدَوَاتِ النَّصْبِ لِلْفِعْلِ المُضَارِعِ: أَنْ – لَنْ – كَيْ – لِكَيْ – لَامُ التَّعْلِيلِ (لِـ) – حَتَّى.",
    "٢ ـ يَكُونُ الفِعْلُ المُضَارِعُ مَنْصُوبًا إِذَا دَخَلَتْ عَلَيْهِ أَدَاةٌ مِنْ هَذِهِ الأَدَوَاتِ.",
    "أَشْرَبُ قَهْوَةً (مَرْفُوعٌ بِالضَّمَّةِ) ← أُرِيدُ أَنْ أَشْرَبَ قَهْوَةً (مَنْصُوبٌ بِالفَتْحَةِ).",
    "أَنَامُ مُتَأَخِّرًا (مَرْفُوعٌ بِالضَّمَّةِ) ← لَنْ أَنَامَ مُتَأَخِّرًا (مَنْصُوبٌ بِالفَتْحَةِ)."
  ],
  ex: [
    { type: "find", target: "y", num: "١ (أ)", ar: "عَيِّنْ أَدَاةَ النَّصْبِ", tr: "Her cümlede nasb edatına dokun, sonra Kontrol et. Dikkat: إِلَى ve فِي harf-i cerdir, nasb edatı değil.",
      exHtml: "<span class=\"ar\">سَافَرَ مُحَمَّدٌ إِلَى العِرَاقِ <b>لِـ</b>يَعْمَلَ فِي شَرِكَةٍ تِجَارِيَّةٍ.</span>", items: [
      W("قَرَّرَتْ فَاطِمَةُ [أَنْ] تَعْتَمِرَ فِي السَّنَةِ القَادِمَةِ.", "Fâtıma gelecek yıl umre yapmaya karar verdi.", "أَنْ: -mek."),
      W("يَجِبُ [أَنْ] تَسْتَمِعَ إِلَى الأُسْتَاذِ جَيِّدًا.", "Hocayı iyi dinlemen gerekir.", "أَنْ; إِلَى harf-i cerdir."),
      W("يَحْضُرُ الأُسْتَاذُ غَدًا إِلَى المُحَاضَرَةِ [حَتَّى] يُنَاقِشَ القَضِيَّةَ مَعَ الآخَرِينَ.", "Hoca meseleyi diğerleriyle tartışmak için yarın derse gelecek.", "حَتَّى: -sın diye."),
      W("[لَنْ] أَتَأَخَّرَ عَنِ الدَّرْسِ بَعْدَ اليَوْمِ.", "Bugünden sonra derse asla geç kalmayacağım.", "لَنْ: olumsuz gelecek."),
      W("سَأَكْتُبُ رِسَالَةً إِلَى أَبِي [حَتَّى] أَبْعَثَهَا غَدًا.", "Yarın göndermek için babama bir mektup yazacağım.", "سَأَكْتُبُ merfûdur: önünde edat yok."),
      W("ذَهَبْتُ أَمْسِ إِلَى المَكْتَبَةِ [لِكَيْ] أُشَاهِدَ الكُتُبَ الجَدِيدَةَ.", "Dün yeni kitapları görmek için kütüphaneye gittim.", "لِكَيْ: -mek için."),
      W("قُلْ [لَنْ] يُصِيبَنَا إِلَّا مَا كَتَبَ اللهُ لَنَا.", "De ki: Allah'ın bizim için yazdığından başkası bize asla isabet etmez. (Tevbe 51)", "لَنْ."),
      W("أَتَمَنَّى [أَنْ] تَكُونَ فِي صِحَّةٍ وَعَافِيَةٍ.", "Sağlık ve afiyet içinde olmanı dilerim.", "أَنْ.")
    ]},
    { type: "combo", num: "١ (ب)", ar: "اضْبِطْ بِالشَّكْلِ الفِعْلَ الَّذِي بَعْدَ أَدَاةِ النَّصْبِ", tr: "Aynı cümleler: şimdi edattan sonraki fiilin sonunu harekele.", items: [
      CB("قررت فاطمة أن تعتمر في السنة القادمة.", ["قَرَّرَتْ فَاطِمَةُ أَنْ", ["تَعْتَمِرُ", "تَعْتَمِرَ", "تَعْتَمِرْ"], "فِي السَّنَةِ القَادِمَةِ."], [1], "Fâtıma gelecek yıl umre yapmaya karar verdi.", "أَنْ'den sonra mansûb: fetha."),
      CB("يجب أن تستمع إلى الأستاذ جيدا.", ["يَجِبُ أَنْ", ["تَسْتَمِعُ", "تَسْتَمِعَ", "تَسْتَمِعْ"], "إِلَى الأُسْتَاذِ جَيِّدًا."], [1], "Hocayı iyi dinlemen gerekir.", "أَنْ'den sonra mansûb."),
      CB("يحضر الأستاذ غدا إلى المحاضرة حتى يناقش القضية.", ["يَحْضُرُ الأُسْتَاذُ غَدًا إِلَى المُحَاضَرَةِ حَتَّى", ["يُنَاقِشُ", "يُنَاقِشَ", "يُنَاقِشْ"], "القَضِيَّةَ مَعَ الآخَرِينَ."], [1], "Hoca meseleyi tartışmak için yarın derse gelecek.", "حَتَّى'dan sonra mansûb. (يَحْضُرُ merfû kalır.)"),
      CB("لن أتأخر عن الدرس بعد اليوم.", ["لَنْ", ["أَتَأَخَّرُ", "أَتَأَخَّرَ", "أَتَأَخَّرْ"], "عَنِ الدَّرْسِ بَعْدَ اليَوْمِ."], [1], "Bugünden sonra derse asla geç kalmayacağım.", "لَنْ'den sonra mansûb."),
      CB("سأكتب رسالة إلى أبي حتى أبعثها غدا.", ["سَأَكْتُبُ رِسَالَةً إِلَى أَبِي حَتَّى", ["أَبْعَثُهَا", "أَبْعَثَهَا", "أَبْعَثْهَا"], "غَدًا."], [1], "Yarın göndermek için babama mektup yazacağım.", "Zamir bitişse de fetha fiilin son harfindedir: أَبْعَثَهَا."),
      CB("ذهبت أمس إلى المكتبة لكي أشاهد الكتب الجديدة.", ["ذَهَبْتُ أَمْسِ إِلَى المَكْتَبَةِ لِكَيْ", ["أُشَاهِدُ", "أُشَاهِدَ", "أُشَاهِدْ"], "الكُتُبَ الجَدِيدَةَ."], [1], "Dün yeni kitapları görmek için kütüphaneye gittim.", "لِكَيْ'den sonra mansûb."),
      CB("قل لن يصيبنا إلا ما كتب الله لنا.", ["قُلْ لَنْ", ["يُصِيبُنَا", "يُصِيبَنَا", "يُصِبْنَا"], "إِلَّا مَا كَتَبَ اللهُ لَنَا."], [1], "De ki: Allah'ın yazdığından başkası bize asla isabet etmez.", "لَنْ'den sonra mansûb: يُصِيبَنَا."),
      CB("أتمنى أن تكون في صحة وعافية.", ["أَتَمَنَّى أَنْ", ["تَكُونُ", "تَكُونَ", "تَكُنْ"], "فِي صِحَّةٍ وَعَافِيَةٍ."], [1], "Sağlık ve afiyet içinde olmanı dilerim.", "أَنْ'den sonra mansûb.")
    ]},
    { type: "combo", num: "٤", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِجُمَلٍ تَشْتَمِلُ عَلَى فِعْلٍ مُضَارِعٍ مَنْصُوبٍ", tr: "Örnek cevaplarda doğru edatı ve doğru harekeyi seç. (Kitapta cevap serbest; burada örnek cevaplar var.)",
      exHtml: "<span class=\"ar\">هَلْ سَتَزُورُ أُسْرَتَكَ هَذِهِ العُطْلَةَ؟ ← لَا، لَنْ أَزُورَهَا هَذِهِ العُطْلَةَ.</span>", items: [
      CB("لِمَاذَا اشْتَرَيْتَ هَذِهِ الأَقْلَامَ المُلَوَّنَةَ؟", ["اشْتَرَيْتُهَا", ["لِأَرْسُمَ", "لِأَرْسُمُ", "لَنْ أَرْسُمَ"], "بِهَا."], [0], "Onlarla resim yapmak için aldım.", "Sebep sorusu → lâm-ı ta'lîl + mansûb."),
      CB("هَلْ سَتَكُونُ هُنَا الشَّهْرَ القَادِمَ؟", ["لَا،", ["لَنْ أَكُونَ", "لَنْ أَكُونُ", "سَأَكُونُ"], "هُنَا الشَّهْرَ القَادِمَ."], [0], "Hayır, gelecek ay burada olmayacağım.", "Olumsuz gelecek → لَنْ + mansûb."),
      CB("مَاذَا تُرِيدُ مِنِّي؟", ["أُرِيدُ", ["أَنْ تُسَاعِدَنِي", "أَنْ تُسَاعِدُنِي", "لَنْ تُسَاعِدَنِي"], "."], [0], "Bana yardım etmeni istiyorum.", "أُرِيدُ + أَنْ + mansûb."),
      CB("لِمَاذَا دَخَلَتِ الأُمُّ المَطْبَخَ؟", ["دَخَلَتِ المَطْبَخَ", ["لِتَطْبُخَ", "لِتَطْبُخُ", "أَنْ تَطْبُخُ"], "الطَّعَامَ."], [0], "Yemek pişirmek için mutfağa girdi.", "Sebep → لِـ + mansûb."),
      CB("هَلْ سَتَشْتَرِكُ فِي الجَوْلَةِ غَدًا؟", ["لَا،", ["لَنْ أَشْتَرِكَ", "لَنْ أَشْتَرِكُ", "سَأَشْتَرِكُ"], "فِيهَا غَدًا."], [0], "Hayır, yarın geziye katılmayacağım.", "لَنْ + mansûb."),
      CB("لِمَاذَا تَأْكُلُ قَلِيلًا؟", ["آكُلُ قَلِيلًا", ["حَتَّى أُحَافِظَ", "حَتَّى أُحَافِظُ", "لَنْ أُحَافِظَ"], "عَلَى صِحَّتِي."], [0], "Sağlığımı korumak için az yerim.", "حَتَّى + mansûb."),
      CB("مَاذَا يَجِبُ لِلصِّحَّةِ؟", ["يَجِبُ", ["أَنْ نَأْكُلَ", "أَنْ نَأْكُلُ", "لَنْ نَأْكُلَ"], "طَعَامًا صِحِّيًّا."], [0], "Sağlıklı yemek yememiz gerekir.", "يَجِبُ + أَنْ + mansûb."),
      CB("هَلْ سَيُسَافِرُ رَئِيسُ الوُزَرَاءِ إِلَى بَارِيسَ؟", ["لَا،", ["لَنْ يُسَافِرَ", "لَنْ يُسَافِرُ", "سَيُسَافِرُ"], "إِلَى بَارِيسَ."], [0], "Hayır, başbakan Paris'e gitmeyecek.", "لَنْ + mansûb.")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · AMAÇ EDATLARI
{
  id: "u2", no: 2, ar: "أَدَوَاتُ التَّعْلِيلِ: كَيْ، لِكَيْ، لِـ، حَتَّى", tr: "Amaç Edatları", short: "كَيْ · لِـ · حَتَّى", col: "nasb", legend: ["mz", "nasb"],
  goals: ["كَيْ، لِكَيْ، لِـ ve حَتَّى'nın \"-mek için\" anlamı kattığını görmek", "Anlama göre doğru edatı seçip fiili harekelemek", "حَتَّى ve لِـ isimden önce gelince harf-i cer olduğunu ayırmak"],
  examples: [
    { s: "جِئْتُ:- / إِلَى:- / مَكَّةَ:- / كَيْ:mz / أَحُجَّ:nasb", tr: "Hacca gitmek için Mekke'ye geldim.", why: "كَيْ: -mek için." },
    { s: "دَخَلْتُ:- / المَسْجِدَ:- / لِكَيْ:mz / أُصَلِّيَ:nasb / الظُّهْرَ:-", tr: "Öğle namazını kılmak için mescide girdim.", why: "Sonu ي olduğu için fetha görünür: أُصَلِّيَ." },
    { s: "سَأُسَافِرُ:- / إِلَى:- / القَاهِرَةِ:- / لِـ:mz / أُشَاهِدَ:nasb / الأَهْرَامَ:-", tr: "Piramitleri görmek için Kahire'ye gideceğim.", why: "Lâm-ı ta'lîl fiile bitişik yazılır: لِأُشَاهِدَ." },
    { s: "افْتَحِ:- / النَّافِذَةَ:- / حَتَّى:mz / يَدْخُلَ:nasb / الهَوَاءُ:- / النَّقِيُّ:-", tr: "Temiz hava girsin diye pencereyi aç.", why: "حَتَّى: -sın diye." },
    { s: "لَنْ:mz / أَتَكَلَّمَ:nasb / مَعَكَ:- / حَتَّى:mz / تَعْتَذِرَ:nasb / مِنِّي:-", tr: "Benden özür dileyinceye kadar seninle konuşmayacağım.", why: "حَتَّى burada \"-ıncaya kadar\"." }
  ],
  rules: [
    { tr: "<span class=\"ar\">كَيْ</span> ve <span class=\"ar\">لِكَيْ</span>: \"-mek için\".", ex: ["جِئْتُ إِلَى مَكَّةَ كَيْ أَحُجَّ", "دَخَلْتُ المَسْجِدَ لِكَيْ أُصَلِّيَ"] },
    { tr: "<span class=\"ar\">لِـ</span> (lâm-ı ta'lîl): \"-mek için\". Fiile bitişik yazılır.", ex: ["لِأُشَاهِدَ", "لِيَعْمَلَ"] },
    { tr: "<span class=\"ar\">حَتَّى</span>: \"-sın diye\" ya da \"-ıncaya kadar\".", ex: ["حَتَّى يَدْخُلَ الهَوَاءُ", "حَتَّى تَعْتَذِرَ مِنِّي"] },
    { tr: "Dikkat: <span class=\"ar\">حَتَّى</span> ve <span class=\"ar\">لِـ</span> bir <b>isimden</b> önce gelirse harf-i cer olur ve ismi mecrûr yapar. Fiilden önce gelirse fiili nasb eder.", ex: ["حَتَّى الظُّهْرِ (isim: mecrûr)", "حَتَّى يَدْخُلَ (fiil: mansûb)"] },
    { tr: "Olumsuz amaç: <span class=\"ar\">كَيْ لَا</span>, <span class=\"ar\">لِكَيْلَا</span>: \"-mesin diye\". Fiil yine mansûbdur.", ex: ["كَيْ لَا يَكُونَ دُولَةً"] }
  ],
  kaide: [
    "١ ـ مِنْ أَدَوَاتِ النَّصْبِ: كَيْ – لِكَيْ – لَامُ التَّعْلِيلِ (لِـ) – حَتَّى.",
    "جِئْتُ إِلَى مَكَّةَ كَيْ أَحُجَّ. دَخَلْتُ المَسْجِدَ لِكَيْ أُصَلِّيَ الظُّهْرَ. سَأُسَافِرُ إِلَى القَاهِرَةِ لِأُشَاهِدَ الأَهْرَامَ.",
    "افْتَحِ النَّافِذَةَ حَتَّى يَدْخُلَ الهَوَاءُ النَّقِيُّ. لَنْ أَتَكَلَّمَ مَعَكَ حَتَّى تَعْتَذِرَ مِنِّي."
  ],
  ex: [
    { type: "combo", num: "٢", ar: "امْلَأِ الفَرَاغَ بِاخْتِيَارِ أَدَاةِ النَّصْبِ المُنَاسِبَةِ مَعَ ضَبْطِ مَا بَعْدَهَا", tr: "Önce edat kutusuna dokunarak anlama uyan edatı bul, sonra fiilin harekesini seç. Amaç anlamında كَيْ، لِكَيْ، لِـ ve حَتَّى'nın hepsi doğru sayılır.",
      exHtml: "<span class=\"ar\">ذَاكِرْ دَرْسَكَ حَتَّى تَنْجَحَ فِي الامْتِحَانِ.</span>", items: [
      CB("وصلت زينب إلى البيت مبكرة ... تساعد أمها.", ["وَصَلَتْ زَيْنَبُ إِلَى البَيْتِ مُبَكِّرَةً", E6, ["تُسَاعِدُ", "تُسَاعِدَ"], "أُمَّهَا."], AM([], [1]), "Zeynep annesine yardım etmek için eve erken geldi.", "Amaç → كَيْ / لِكَيْ / لِـ / حَتَّى + mansûb."),
      CB("لن تنال البر ... تنفق مما تحب.", ["لَنْ تَنَالَ البِرَّ", E6, ["تُنْفِقُ", "تُنْفِقَ"], "مِمَّا تُحِبُّ."], [[4, 1]], "Sevdiğin şeylerden infak etmedikçe iyiliğe asla erişemezsin. (Âl-i İmrân 92'den)", "حَتَّى: -ıncaya kadar. Âyette: لَنْ تَنَالُوا البِرَّ حَتَّى تُنْفِقُوا مِمَّا تُحِبُّونَ."),
      CB("اتخذ صديقا عربيا ... تتقن العربية.", ["اتَّخِذْ صَدِيقًا عَرَبِيًّا", E6, ["تُتْقِنُ", "تُتْقِنَ"], "العَرَبِيَّةَ."], AM([], [1]), "Arapçayı iyi öğrenmek için Arap bir arkadaş edin.", "Amaç edatı + mansûb."),
      CB("خرج علي إلى السوق ... يشتري حذاء.", ["خَرَجَ عَلِيٌّ إِلَى السُّوقِ", E6, ["يَشْتَرِي", "يَشْتَرِيَ"], "حِذَاءً."], AM([], [1]), "Ali ayakkabı almak için çarşıya çıktı.", "Sonu ي: fetha görünür: يَشْتَرِيَ."),
      CB("يجب ... تحذر السرعة ... تسلم من الحادث.", ["يَجِبُ", E6, ["تَحْذَرُ", "تَحْذَرَ"], "السُّرْعَةَ", E6, ["تَسْلَمُ", "تَسْلَمَ"], "مِنَ الحَادِثِ."], AM([0, 1], [1]), "Kazadan kurtulmak için hızdan sakınman gerekir.", "يَجِبُ أَنْ…, sonra amaç edatı."),
      CB("... أكون كسلان ... أنجح في الحياة.", [E6, ["أَكُونُ", "أَكُونَ"], "كَسْلَانَ", E6, ["أَنْجَحُ", "أَنْجَحَ"], "فِي الحَيَاةِ."], AM([1, 1], [1]), "Hayatta başarılı olmak için asla tembel olmayacağım.", "لَنْ أَكُونَ…, sonra amaç edatı."),
      CB("ينبغي ... تحفظ من الشعر العربي ... تصل إلى مرحلة التذوق.", ["يَنْبَغِي", E6, ["تَحْفَظُ", "تَحْفَظَ"], "مِنَ الشِّعْرِ العَرَبِيِّ", E6, ["تَصِلُ", "تَصِلَ"], "إِلَى مَرْحَلَةِ التَّذَوُّقِ."], AM([0, 1], [1]), "Zevk alma aşamasına ulaşmak için Arap şiirinden ezberlemen gerekir.", "يَنْبَغِي أَنْ…, sonra amaç edatı."),
      CB("لا تكون مؤمنا ... تحب لأخيك ما تحب لنفسك.", ["لَا تَكُونُ مُؤْمِنًا", E6, ["تُحِبُّ", "تُحِبَّ"], "لِأَخِيكَ مَا تُحِبُّ لِنَفْسِكَ."], [[4, 1]], "Kendin için sevdiğini kardeşin için de sevmedikçe mümin olamazsın.", "حَتَّى: -ıncaya kadar. (مَا تُحِبُّ lâfzındaki ikinci fiil merfû kalır.)")
    ]},
    { type: "combo", num: "٣", ar: "أَجِبْ عَنِ الأَسْئِلَةِ مُسْتَعْمِلًا الأَدَاةَ الَّتِي بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki edatla cevap ver; fiilin doğru şeklini seç. (Kitapta cevap serbest; burada örnek cevaplar var.)",
      exHtml: "<span class=\"ar\">لِمَاذَا سَافَرْتَ إِلَى دِمَشْقَ؟ (لِـ) ← سَافَرْتُ إِلَى دِمَشْقَ لِأَزُورَ أَقَارِبِي هُنَاكَ.</span>", items: [
      CB("لِمَاذَا دَخَلَتْ عَائِشَةُ إِلَى المَكْتَبَةِ؟ <span class=\"muted\">(كَيْ)</span>", ["دَخَلَتْ عَائِشَةُ إِلَى المَكْتَبَةِ كَيْ", ["تَقْرَأُ", "تَقْرَأَ", "تَقْرَأْ"], "كِتَابًا."], [1], "Âişe kitap okumak için kütüphaneye girdi.", "كَيْ + mansûb."),
      CB("لِمَاذَا ذَهَبَ مُرَادٌ إِلَى المُسْتَشْفَى أَمْسِ؟ <span class=\"muted\">(حَتَّى)</span>", ["ذَهَبَ مُرَادٌ إِلَى المُسْتَشْفَى حَتَّى", ["يَزُورُ", "يَزُورَ", "يَزُرْ"], "صَدِيقَهُ المَرِيضَ."], [1], "Murad hasta arkadaşını ziyaret etmek için hastaneye gitti.", "حَتَّى + mansûb."),
      CB("مَاذَا قَرَّرْتَ أَخِيرًا؟ <span class=\"muted\">(أَنْ)</span>", ["قَرَّرْتُ أَنْ", ["أَتَعَلَّمُ", "أَتَعَلَّمَ", "أَتَعَلَّمْ"], "اللُّغَةَ العَرَبِيَّةَ."], [1], "Arapça öğrenmeye karar verdim.", "أَنْ + mansûb."),
      CB("لِمَاذَا اسْتَيْقَظْتَ مُبَكِّرًا؟ <span class=\"muted\">(لِـ)</span>", ["اسْتَيْقَظْتُ مُبَكِّرًا", ["لِأُصَلِّي", "لِأُصَلِّيَ", "لِأُصَلِّ"], "الفَجْرَ."], [1], "Sabah namazını kılmak için erken kalktım.", "Sonu ي: fetha görünür: لِأُصَلِّيَ."),
      CB("لِمَاذَا تَرْكَبُ الحَافِلَةَ؟ <span class=\"muted\">(لِكَيْ)</span>", ["أَرْكَبُ الحَافِلَةَ لِكَيْ", ["أَصِلُ", "أَصِلَ", "أَصِلْ"], "إِلَى الكُلِّيَّةِ."], [1], "Fakülteye ulaşmak için otobüse binerim.", "لِكَيْ + mansûb."),
      CB("لِمَاذَا فَتَحَ حَسَنٌ النَّافِذَةَ؟ <span class=\"muted\">(حَتَّى)</span>", ["فَتَحَ حَسَنٌ النَّافِذَةَ حَتَّى", ["يَدْخُلُ", "يَدْخُلَ", "يَدْخُلْ"], "الهَوَاءُ النَّقِيُّ."], [1], "Hasan temiz hava girsin diye pencereyi açtı.", "حَتَّى + mansûb."),
      CB("مَاذَا يَجِبُ عَلَيَّ لِأَكُونَ سَعِيدًا؟ <span class=\"muted\">(أَنْ)</span>", ["يَجِبُ عَلَيْكَ أَنْ", ["تَشْكُرُ", "تَشْكُرَ", "تَشْكُرْ"], "اللهَ دَائِمًا."], [1], "Allah'a daima şükretmen gerekir.", "أَنْ + mansûb. (Sorudaki لِأَكُونَ de mansûbdur.)"),
      CB("لِمَاذَا تَدْرُسُ فِي كُلِّيَّةِ الإِلَهِيَّاتِ؟ <span class=\"muted\">(لِـ)</span>", ["أَدْرُسُ فِي كُلِّيَّةِ الإِلَهِيَّاتِ", ["لِأَتَعَلَّمُ", "لِأَتَعَلَّمَ", "لِأَتَعَلَّمْ"], "دِينِي."], [1], "Dinimi öğrenmek için İlahiyat Fakültesinde okuyorum.", "لِـ + mansûb.")
    ]},
    { type: "irab", num: "٥", tlist: SEBEP_OPTS, tlbl: "Sebebi", ar: "اضْبِطْ بِالشَّكْلِ مَا تَحْتَهُ خَطٌّ وَبَيِّنْ سَبَبَ الضَّبْطِ", tr: "Altı çizili kelimenin sonu harekesiz verildi. Önce sebebini, sonra halini seç. Dikkat: her altı çizili kelime fiil değil.", items: [
      IR("قَرَّرَ سَلِيمٌ أَنْ [يَقْرَأ] هَذَا الكِتَابَ الجَدِيدَ.", "edat", "nasb", "أَنْ'den sonra mansûb: يَقْرَأَ.", "Selim bu yeni kitabı okumaya karar verdi."),
      IR("[يَجِب] أَنْ تَسْتَمِعَ إِلَى المُدَرِّسِ.", "yok", "ref", "Önünde nasb edatı yok: يَجِبُ (merfû).", "Öğretmeni dinlemen gerekir."),
      IR("يَجِبُ أَنْ تَسْتَمِعَ إِلَى المُدَرِّسِ [لِتَفْهَم] الدَّرْسَ.", "edat", "nasb", "Lâm-ı ta'lîlden sonra mansûb: لِتَفْهَمَ.", "Dersi anlamak için öğretmeni dinlemen gerekir."),
      IR("رَكِبَ الطَّالِبُ السَّيَّارَةَ حَتَّى [يَصِل] إِلَى المَدْرَسَةِ مُبَكِّرًا.", "edat", "nasb", "حَتَّى'dan sonra mansûb: يَصِلَ.", "Öğrenci okula erken varmak için arabaya bindi."),
      IR("وَقَفَ الطَّالِبُ أَمَامَ السَّبُّورَةِ أَمَامَ [أَصْدِقَائِه].", "cer", "cerr", "Fiil değil isim. أَمَامَ'dan sonra muzâfun ileyh → mecrûr: أَصْدِقَائِهِ. (Kitapta «أصدقاءه» yazılmış; mecrûrken hemze yâ üzerinde yazılır.)", "Öğrenci arkadaşlarının önünde, tahtanın önünde durdu."),
      IR("زَارَتِ التَّاجِرَةُ المَعْرِضَ لِكَيْ [تُشَاهِد] الإِنْتَاجَاتِ الجَدِيدَةَ.", "edat", "nasb", "لِكَيْ'den sonra mansûb: تُشَاهِدَ.", "Kadın tüccar yeni ürünleri görmek için fuarı gezdi."),
      IR("جَمَعَ الجَدُّ أَحْفَادَهُ كَيْ [يَقُصّ] عَلَيْهِمْ قِصَّةً عَجِيبَةً.", "edat", "nasb", "كَيْ'den sonra mansûb: يَقُصَّ.", "Dede, onlara ilginç bir hikâye anlatmak için torunlarını topladı."),
      IR("سَافَرَ جَمِيلٌ إِلَى السُّعُودِيَّةِ [لِيَلْتَحِق] بِجَامِعَةِ المَدِينَةِ.", "edat", "nasb", "Lâm-ı ta'lîlden sonra mansûb: لِيَلْتَحِقَ.", "Cemil Medine Üniversitesine girmek için Suudi Arabistan'a gitti."),
      IR("أَخَذَتْ أُمُّ كُلْثُومٍ [كِيلا] لَحْمًا حَتَّى تَطْبُخَ العَشَاءَ.", "mef", "nasb", "Tuzak! كِيلًا \"bir kilo\" demektir: isim, mef'ûl bih → mansûb (كِيلًا). كَيْ لَا ile karıştırma.", "Ümmü Gülsüm akşam yemeğini pişirmek için bir kilo et aldı."),
      IR("أَخَذَتْ أُمُّ كُلْثُومٍ كِيلًا لَحْمًا حَتَّى [تَطْبُخ] العَشَاءَ.", "edat", "nasb", "حَتَّى'dan sonra mansûb: تَطْبُخَ.", "Ümmü Gülsüm akşam yemeğini pişirmek için bir kilo et aldı.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · FÂ-İ SEBEBİYYE
{
  id: "u3", no: 3, ar: "فَاءُ السَّبَبِيَّةِ", tr: "Fâ-i Sebebiyye", short: "Fâ-i sebebiyye", col: "mi", legend: ["sf", "mi", "nasb"],
  goals: ["Sebep bildiren فَـ'dan sonra muzârinin mansûb olduğunu görmek", "Bunun için فَـ'dan önce nefy ya da talep (emir, nehy, soru, temenni) bulunması gerektiğini bilmek", "Talep olmayan cümlede فَـ'dan sonraki fiilin merfû kaldığını ayırmak"],
  examples: [
    { s: "لَمْ:sf.nefy / يَجْتَهِدْ:- / فَـ:mi / يَنْجَحَ:nasb", tr: "Çalışmadı ki başarsın.", why: "Önce nefy (لَمْ), sonra فَـ: يَنْجَحَ mansûb." },
    { s: "اصْنَعِ:sf.emir / المَعْرُوفَ:- / فَـ:mi / تَنَالَ:nasb / الشُّكْرَ:-", tr: "İyilik yap ki teşekkür alasın.", why: "Önce emir." },
    { s: "لَا:sf.nehy / تُفْشِ:- / سِرَّ:- / أَخِيكَ:- / فَـ:mi / يَأْمَنَكَ:nasb", tr: "Kardeşinin sırrını ifşa etme ki sana güvensin.", why: "Önce nehy (لَا تَفْعَلْ)." },
    { s: "هَلْ:sf.soru / لَكَ:- / صَدِيقٌ:- / فَـ:mi / تَرْكَنَ:nasb / إِلَيْهِ:-", tr: "Güvenip dayanacağın bir dostun var mı?", why: "Önce soru." },
    { s: "يَا:- / لَيْتَنِي:sf.temenni / كُنْتُ:- / مَعَهُمْ:- / فَـ:mi / أَفُوزَ:nasb / فَوْزًا:- / عَظِيمًا:-", tr: "Keşke onlarla beraber olsaydım da büyük bir başarıya ulaşsaydım! (Nisâ 73)", why: "Önce temenni (لَيْتَ)." }
  ],
  rules: [
    { tr: "Sebep bildiren <b class=\"r-mi\">فَـ</b>'dan sonra muzâri <b class=\"r-nasb\">mansûb</b> olur; ama yalnız önünde <b class=\"r-sf\">nefy</b> ya da <b class=\"r-sf\">talep</b> varsa." },
    { tr: "<b>Nefy</b> (olumsuzluk) örnekleri:", ex: ["لَمْ يَجْتَهِدْ فَيَنْجَحَ", "لَا يُقْضَى عَلَيْهِمْ فَيَمُوتُوا"] },
    { tr: "<b>Talep</b>: emir, nehy, soru, temenni.", ex: ["كُنْ لَيِّنَ الجَانِبِ فَتُحَبَّ", "لَا تَكُنْ رَطْبًا فَتُعْصَرَ وَلَا يَابِسًا فَتُكْسَرَ", "وَلَا تَطْغَوْا فِيهِ فَيَحِلَّ عَلَيْكُمْ غَضَبِي", "هَلْ لَكَ صَدِيقٌ فَتَرْكَنَ إِلَيْهِ؟"] },
    { tr: "Önünde nefy ya da talep yoksa فَـ sadece bağlaçtır; fiil <b class=\"r-ref\">merfû</b> kalır.", ex: ["يَدْرُسُ أَحْمَدُ فَيَنْجَحُ", "أَنَا أَعْمَلُ فَأَكْسِبُ"] },
    { tr: "Beş fiilde nasbın alameti nunun düşmesidir: <span class=\"ar\">يَمُوتُونَ ← فَيَمُوتُوا</span>." }
  ],
  kaide: [
    "مُلَاحَظَةٌ: يُنْصَبُ الفِعْلُ المُضَارِعُ بَعْدَ الفَاءِ السَّبَبِيَّةِ المَسْبُوقَةِ بِنَفْيٍ أَوْ طَلَبٍ (كَالأَمْرِ وَالنَّهْيِ وَالسُّؤَالِ وَالتَّمَنِّي…).",
    "١) نَصْبُهُ بَعْدَ النَّفْيِ: لَمْ يَجْتَهِدْ فَيَنْجَحَ. ﴿لَا يُقْضَى عَلَيْهِمْ فَيَمُوتُوا﴾",
    "٢) نَصْبُهُ بَعْدَ الطَّلَبِ: كُنْ لَيِّنَ الجَانِبِ فَتُحَبَّ. اصْنَعِ المَعْرُوفَ فَتَنَالَ الشُّكْرَ. لَا تُفْشِ سِرَّ أَخِيكَ فَيَأْمَنَكَ. لَا تَكُنْ رَطْبًا فَتُعْصَرَ وَلَا يَابِسًا فَتُكْسَرَ. ﴿وَلَا تَطْغَوْا فِيهِ فَيَحِلَّ عَلَيْكُمْ غَضَبِي﴾ ﴿لَا تَجْعَلْ مَعَ اللَّهِ إِلَهًا آخَرَ فَتَقْعُدَ مَذْمُومًا مَخْذُولًا﴾ هَلْ لَكَ صَدِيقٌ فَتَرْكَنَ إِلَيْهِ؟ ﴿يَا لَيْتَنِي كُنْتُ مَعَهُمْ فَأَفُوزَ فَوْزًا عَظِيمًا﴾"
  ],
  ex: [
    { type: "classify", num: "+", extra: true, opts: TALEP_OPTS, ar: "مَا الَّذِي سَبَقَ الفَاءَ؟", tr: "Ek alıştırma (kitaptaki örneklerle): فَـ'dan önce ne var? Nefy mi, emir mi, nehy mi, soru mu, temenni mi?", items: [
      { s: "لَمْ يَجْتَهِدْ <b class=\"hl\">فَيَنْجَحَ</b>", a: "nefy", why: "لَمْ: olumsuzluk.", tr: "Çalışmadı ki başarsın." },
      { s: "لَا يُقْضَى عَلَيْهِمْ <b class=\"hl\">فَيَمُوتُوا</b>", a: "nefy", why: "لَا يُقْضَى: olumsuz haber (nehy değil). Nasbda nun düştü.", tr: "Haklarında ölüm hükmü verilmez ki ölsünler. (Fâtır 36)" },
      { s: "كُنْ لَيِّنَ الجَانِبِ <b class=\"hl\">فَتُحَبَّ</b>", a: "emir", why: "كُنْ: emir.", tr: "Yumuşak huylu ol ki sevilesin." },
      { s: "اصْنَعِ المَعْرُوفَ <b class=\"hl\">فَتَنَالَ</b> الشُّكْرَ", a: "emir", why: "اصْنَعْ: emir.", tr: "İyilik yap ki teşekkür alasın." },
      { s: "لَا تُفْشِ سِرَّ أَخِيكَ <b class=\"hl\">فَيَأْمَنَكَ</b>", a: "nehy", why: "لَا تُفْشِ: olumsuz emir (nehy).", tr: "Kardeşinin sırrını ifşa etme ki sana güvensin." },
      { s: "لَا تَكُنْ رَطْبًا <b class=\"hl\">فَتُعْصَرَ</b>", a: "nehy", why: "لَا تَكُنْ: nehy.", tr: "Yaş olma ki sıkılasın." },
      { s: "وَلَا تَطْغَوْا فِيهِ <b class=\"hl\">فَيَحِلَّ</b> عَلَيْكُمْ غَضَبِي", a: "nehy", why: "لَا تَطْغَوْا: nehy.", tr: "Bunda azgınlık etmeyin, yoksa gazabım üzerinize iner. (Tâhâ 81)" },
      { s: "لَا تَجْعَلْ مَعَ اللهِ إِلَهًا آخَرَ <b class=\"hl\">فَتَقْعُدَ</b> مَذْمُومًا مَخْذُولًا", a: "nehy", why: "لَا تَجْعَلْ: nehy.", tr: "Allah ile beraber başka ilah edinme; sonra kınanmış ve yardımsız kalırsın. (İsrâ 22)" },
      { s: "هَلْ لَكَ صَدِيقٌ <b class=\"hl\">فَتَرْكَنَ</b> إِلَيْهِ؟", a: "soru", why: "هَلْ: soru.", tr: "Dayanacağın bir dostun var mı?" },
      { s: "يَا لَيْتَنِي كُنْتُ مَعَهُمْ <b class=\"hl\">فَأَفُوزَ</b> فَوْزًا عَظِيمًا", a: "temenni", why: "لَيْتَ: temenni.", tr: "Keşke onlarla olsaydım da büyük başarıya ulaşsaydım!" }
    ]},
    { type: "classify", num: "+", extra: true, opts: NM_OPTS, ar: "مَنْصُوبٌ أَمْ مَرْفُوعٌ؟", tr: "Ek alıştırma: فَـ'dan sonraki fiil mansûb mu, merfû mu? Önünde nefy ya da talep var mı, bak. (Fiilin son harekesi verilmedi.)", items: [
      { s: "ادْرُسْ <b class=\"hl\">فَتَنْجَح</b>", a: "nasb", why: "Önce emir → فَتَنْجَحَ.", tr: "Ders çalış ki başarasın." },
      { s: "يَدْرُسُ أَحْمَدُ <b class=\"hl\">فَيَنْجَح</b>", a: "ref", why: "Önce nefy ya da talep yok → فَيَنْجَحُ.", tr: "Ahmed ders çalışır ve başarır." },
      { s: "لَا تَكْسَلْ <b class=\"hl\">فَتَنْدَم</b>", a: "nasb", why: "Önce nehy → فَتَنْدَمَ.", tr: "Tembellik etme, yoksa pişman olursun." },
      { s: "أَنَا أَعْمَلُ <b class=\"hl\">فَأَكْسِب</b>", a: "ref", why: "Talep yok → فَأَكْسِبُ.", tr: "Ben çalışırım ve kazanırım." },
      { s: "هَلْ تَزُورُنَا <b class=\"hl\">فَنُكْرِمك</b>؟", a: "nasb", why: "Önce soru → فَنُكْرِمَكَ.", tr: "Bizi ziyaret eder misin ki sana ikram edelim?" },
      { s: "لَيْتَ لِي مَالًا <b class=\"hl\">فَأَتَصَدَّق</b>", a: "nasb", why: "Önce temenni → فَأَتَصَدَّقَ.", tr: "Keşke malım olsa da sadaka versem." },
      { s: "المُسْلِمُ يَصْدُقُ <b class=\"hl\">فَيُحِبّه</b> النَّاسُ", a: "ref", why: "Talep yok → فَيُحِبُّهُ.", tr: "Müslüman doğru söyler, insanlar da onu sever." },
      { s: "مَا تَأْتِينَا <b class=\"hl\">فَتُحَدِّثنا</b>", a: "nasb", why: "Önce nefy (مَا) → فَتُحَدِّثَنَا.", tr: "Bize gelmiyorsun ki bizimle konuşasın." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · KUR'AN'DA NASB
{
  id: "u4", no: 4, ar: "النَّصْبُ فِي القُرْآنِ الكَرِيمِ", tr: "Kur'an'da Nasb", short: "Kur'an'da", col: "ref", legend: ["mz", "nasb"],
  goals: ["Âyetlerde nasb edatlarını bulmak", "إِنْ، إِنَّ، أَنَّ gibi benzer kelimeleri أَنْ'den ayırmak", "Edatsız fiilin merfû kaldığını görmek"],
  examples: [
    { s: "لِمَنْ:- / أَرَادَ:- / أَنْ:mz / يُتِمَّ:nasb / الرَّضَاعَةَ:-", tr: "…emzirmeyi tamamlamak isteyenler için. (Bakara 233)", why: "أَنْ + mansûb. لِمَنْ'deki lâm harf-i cerdir." },
    { s: "كَيْ:mz / تَقَرَّ:nasb / عَيْنُهَا:- / وَلَا:- / تَحْزَنَ:nasb", tr: "…gözü aydın olsun ve üzülmesin diye. (Kasas 13)", why: "تَحْزَنَ, تَقَرَّ'ya atfedildiği için o da mansûb." },
    { s: "حَتَّى:mz / يَتَبَيَّنَ:nasb / لَهُمْ:- / أَنَّهُ:- / الحَقُّ:-", tr: "…onun hak olduğu onlara açıkça belli oluncaya kadar. (Fussilet 53)", why: "أَنَّهُ (şeddeli) nasb edatı değildir." }
  ],
  rules: [
    { tr: "<span class=\"ar\">أَنْ</span> (sakin nun) nasb edatıdır. <span class=\"ar\">إِنْ</span> (şart), <span class=\"ar\">إِنَّ</span> ve <span class=\"ar\">أَنَّ</span> (şeddeli) fiili nasb etmez.", ex: ["أَنْ يُتِمَّ", "إِنْ كُنْتُمْ", "أَنَّ وَعْدَ اللَّهِ"] },
    { tr: "<span class=\"ar\">لَنْ</span> başına <span class=\"ar\">فَـ</span> ya da <span class=\"ar\">وَ</span> alabilir: <span class=\"ar\">فَلَنْ تَجِدَ</span>، <span class=\"ar\">وَلَنْ تَجِدَ</span>." },
    { tr: "İsimden önceki <span class=\"ar\">لِـ</span> harf-i cerdir: <span class=\"ar\">لِمَنْ، فَلِلَّهِ، لِلرَّسُولِ</span>. Fiilden önceki <span class=\"ar\">لِـ</span> lâm-ı ta'lîldir: <span class=\"ar\">وَلِتَعْلَمَ</span>." },
    { tr: "Mansûb fiile <span class=\"ar\">وَ</span> ile bağlanan fiil de mansûb olur: <span class=\"ar\">كَيْ تَقَرَّ عَيْنُهَا وَلَا تَحْزَنَ</span>." }
  ],
  kaide: ["مِنْ أَدَوَاتِ النَّصْبِ لِلْفِعْلِ المُضَارِعِ: أَنْ – لَنْ – كَيْ – لِكَيْ – لَامُ التَّعْلِيلِ – حَتَّى."],
  ex: [
    { type: "find", target: "y", num: "٦", ar: "عَيِّنْ أَدَوَاتِ النَّصْبِ لِلْفِعْلِ المُضَارِعِ فِي الآيَاتِ التَّالِيَةِ", tr: "Âyetlerde nasb edatlarına dokun. Benzerlerine dikkat: إِنْ، إِنَّ، أَنَّ، harf-i cer olan لِـ.", items: [
      W("وَالْوَالِدَاتُ يُرْضِعْنَ أَوْلَادَهُنَّ حَوْلَيْنِ كَامِلَيْنِ لِمَنْ أَرَادَ [أَنْ] يُتِمَّ الرَّضَاعَةَ", "Anneler, emzirmeyi tamamlamak isteyenler için çocuklarını tam iki yıl emzirirler. (Bakara 233)", "أَنْ يُتِمَّ. لِمَنْ'deki lâm harf-i cerdir."),
      W("وَقَالَ لَهُمْ نَبِيُّهُمْ إِنَّ آيَةَ مُلْكِهِ [أَنْ] يَأْتِيَكُمُ التَّابُوتُ فِيهِ سَكِينَةٌ مِنْ رَبِّكُمْ {…} إِنْ كُنْتُمْ مُؤْمِنِينَ", "Peygamberleri onlara dedi ki: Onun hükümdarlığının alameti, içinde Rabbinizden bir sükûnet bulunan sandığın size gelmesidir… eğer mü'minseniz. (Bakara 248)", "أَنْ يَأْتِيَكُمُ (fetha yâ üzerinde). إِنَّ ve إِنْ nasb edatı değil."),
      W("أُولَئِكَ الَّذِينَ لَعَنَهُمُ اللَّهُ وَمَنْ يَلْعَنِ اللَّهُ [فَلَنْ] تَجِدَ لَهُ نَصِيرًا", "Onlar Allah'ın lanetlediği kimselerdir; Allah kimi lanetlerse artık ona asla bir yardımcı bulamazsın. (Nisâ 52)", "فَلَنْ تَجِدَ."),
      W("إِنَّ الْمُنَافِقِينَ فِي الدَّرْكِ الْأَسْفَلِ مِنَ النَّارِ [وَلَنْ] تَجِدَ لَهُمْ نَصِيرًا", "Münafıklar ateşin en alt tabakasındadır; onlara asla bir yardımcı bulamazsın. (Nisâ 145)", "وَلَنْ تَجِدَ."),
      W("{…} وَالْمَسَاكِينِ وَابْنِ السَّبِيلِ [كَيْ] لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنْكُمْ", "…yoksullara ve yolda kalmışlara aittir; ta ki o mal içinizdeki zenginler arasında dönüp dolaşan bir şey olmasın. (Haşr 7)", "كَيْ لَا يَكُونَ: olumsuz amaç; fiil mansûb."),
      W("فَرَدَدْنَاهُ إِلَى أُمِّهِ [كَيْ] تَقَرَّ عَيْنُهَا وَلَا تَحْزَنَ [وَلِتَعْلَمَ] أَنَّ وَعْدَ اللَّهِ حَقٌّ", "Böylece onu, gözü aydın olsun, üzülmesin ve Allah'ın vaadinin hak olduğunu bilsin diye annesine geri verdik. (Kasas 13)", "كَيْ ve وَلِتَعْلَمَ'deki lâm-ı ta'lîl. أَنَّ nasb edatı değil."),
      W("وَمَا كَانَ رَبُّكَ مُهْلِكَ الْقُرَى [حَتَّى] يَبْعَثَ فِي أُمِّهَا رَسُولًا يَتْلُو عَلَيْهِمْ آيَاتِنَا", "Rabbin, merkezlerine âyetlerimizi okuyan bir peygamber göndermedikçe ülkeleri helâk edici değildir. (Kasas 59)", "حَتَّى يَبْعَثَ. يَتْلُو merfûdur: önünde edat yok."),
      W("سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنْفُسِهِمْ [حَتَّى] يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ", "Onun hak olduğu onlara iyice belli oluncaya kadar âyetlerimizi onlara hem ufuklarda hem kendi nefislerinde göstereceğiz. (Fussilet 53)", "حَتَّى يَتَبَيَّنَ. أَنَّهُ nasb edatı değil.")
    ]},
    { type: "classify", num: "+", extra: true, opts: NM_OPTS, ar: "مَنْصُوبٌ أَمْ مَرْفُوعٌ؟", tr: "Ek alıştırma: âyetlerdeki altı çizili fiil mansûb mu, merfû mu?", items: [
      { s: "لِمَنْ أَرَادَ أَنْ <b class=\"hl\">يُتِمَّ</b> الرَّضَاعَةَ", a: "nasb", why: "أَنْ'den sonra." },
      { s: "أَنْ <b class=\"hl\">يَأْتِيَكُمُ</b> التَّابُوتُ", a: "nasb", why: "أَنْ'den sonra; fetha yâ üzerinde." },
      { s: "فَلَنْ <b class=\"hl\">تَجِدَ</b> لَهُ نَصِيرًا", a: "nasb", why: "لَنْ'den sonra." },
      { s: "كَيْ لَا <b class=\"hl\">يَكُونَ</b> دُولَةً", a: "nasb", why: "كَيْ'den sonra (araya giren لَا nasbı bozmaz)." },
      { s: "كَيْ تَقَرَّ عَيْنُهَا وَلَا <b class=\"hl\">تَحْزَنَ</b>", a: "nasb", why: "Mansûb تَقَرَّ'ya atfedilmiş." },
      { s: "وَلَكِنَّ أَكْثَرَهُمْ لَا <b class=\"hl\">يَعْلَمُونَ</b>", a: "ref", why: "Önünde nasb edatı yok; لَا olumsuzluk. Nun duruyor." },
      { s: "رَسُولًا <b class=\"hl\">يَتْلُو</b> عَلَيْهِمْ آيَاتِنَا", a: "ref", why: "Önünde nasb edatı yok." },
      { s: "حَتَّى <b class=\"hl\">يَتَبَيَّنَ</b> لَهُمْ", a: "nasb", why: "حَتَّى'dan sonra." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: ذَكَاءُ الأَطْفَالِ", tr: "Okuma: Çocukların Zekâsı", short: "Okuma", col: "nasb", legend: ["mz", "nasb", "ref"],
  goals: ["Bir hikâyede mansûb muzârileri bulmak", "Edatla gelen mansûb fiili, edatsız merfû fiilden ayırmak", "لَمْ'den sonraki (meczûm) fiili mansûb sanmamak"],
  examples: [
    { s: "لَمْ:- / أَعْمَلْ:- / سُوءًا:- / حَتَّى:mz / أَخَافَكَ:nasb", tr: "Kötü bir şey yapmadım ki senden korkayım.", why: "أَعْمَلْ cezm (لَمْ) almış; أَخَافَكَ mansûb (حَتَّى)." },
    { s: "اتْرُكْهُ:- / حَتَّى:mz / يَبْرُدَ:nasb", tr: "Soğuyuncaya kadar bırak onu.", why: "حَتَّى: -ıncaya kadar." },
    { s: "أَخَافُ:ref / أَنْ:mz / يَقْضِيَ:nasb / حُمْقِي:- / عَلَى:- / مَالِي:-", tr: "Ahmaklığımın malımı tüketmesinden korkarım.", why: "أَخَافُ merfû (edatsız); يَقْضِيَ mansûb (أَنْ)." }
  ],
  rules: [
    { tr: "Nasb edatından sonra muzâri mansûb: <span class=\"ar\">حَتَّى أَخَافَكَ، أَنْ يَكُونَ، حَتَّى يَبْرُدَ</span>." },
    { tr: "Edatsız muzâri merfû: <span class=\"ar\">يَمْشِي، يَلْعَبُونَ، أَخَافُ، لَا تَتْرُكُونَهُ</span>." },
    { tr: "<span class=\"ar\">لَمْ</span>'den sonraki fiil mansûb değil, <b>meczûm</b>dur (sonu sakin ya da harf düşer): <span class=\"ar\">لَمْ أَعْمَلْ، لَمْ تَجْرِ</span>. Bu konu ileride gelecek." },
    { tr: "Mansûba <span class=\"ar\">وَ</span> ile bağlanan fiil de mansûbdur; sonu <span class=\"ar\">ى</span> ise hareke görünmez: <span class=\"ar\">أَنْ يَقْضِيَ … وَيَبْقَى</span>." }
  ],
  kaide: ["يَكُونُ الفِعْلُ المُضَارِعُ مَنْصُوبًا إِذَا دَخَلَتْ عَلَيْهِ أَدَاةٌ مِنْ أَدَوَاتِ النَّصْبِ."],
  ex: [
    { type: "reading", num: "٨", ar: "اقْرَإِ القِطْعَةَ التَّالِيَةَ", tr: "Hikâyeleri oku, soruların örnek cevaplarına bak, sonra fiilleri sınıflandır.", title: "ذَكَاءُ الأَطْفَالِ",
      text: "ذَكَرَ الإِمَامُ ابْنُ الجَوْزِيِّ فِي كِتَابِهِ «الأَذْكِيَاءُ» بَعْضَ القِصَصِ الَّتِي تَدُلُّ عَلَى ذَكَاءِ الأَطْفَالِ، وَمِنْ بَيْنِهَا:<br>كَانَ الخَلِيفَةُ عُمَرُ بْنُ الخَطَّابِ رَضِيَ اللهُ عَنْهُ يَمْشِي فِي طَرِيقٍ، فَمَرَّ بِأَطْفَالٍ يَلْعَبُونَ. وَلَمَّا رَآهُ الأَطْفَالُ جَرَوْا بَعِيدًا إِلَّا طِفْلًا وَاحِدًا وَقَفَ فِي مَكَانِهِ. فَقَالَ لَهُ عُمَرُ: لِمَاذَا لَمْ تَجْرِ مَعَ أَصْحَابِكَ؟ أَجَابَ الطِّفْلُ: يَا أَمِيرَ المُؤْمِنِينَ، لَمْ أَعْمَلْ سُوءًا حَتَّى أَخَافَكَ، وَلَيْسَتِ الطَّرِيقُ ضَيِّقَةً حَتَّى أَتْرُكَهَا لَكَ! فَأُعْجِبَ الخَلِيفَةُ بِذَكَاءِ الطِّفْلِ. إِنَّ هَذَا الطِّفْلَ قَدْ أَصْبَحَ فِيمَا بَعْدُ قَائِدًا عَظِيمًا وَعَالِمًا كَبِيرًا، وَهُوَ عَبْدُ اللهِ بْنُ الزُّبَيْرِ رَضِيَ اللهُ عَنْهُ.<br>* * *<br>جَلَسَ طِفْلٌ مَعَ بَعْضِ الرِّجَالِ وَهُمْ يَأْكُلُونَ فَبَكَى. قَالُوا: لِمَاذَا تَبْكِي؟ قَالَ: الطَّعَامُ حَارٌّ! قَالُوا: اتْرُكْهُ حَتَّى يَبْرُدَ! قَالَ: إِذَا أَنَا تَرَكْتُهُ فَأَنْتُمْ لَا تَتْرُكُونَهُ!<br>* * *<br>قَالَ الأَصْمَعِيُّ: قُلْتُ لِغُلَامٍ صَغِيرٍ مِنْ أَبْنَاءِ العَرَبِ: أَيَسُرُّكَ أَنْ يَكُونَ لَكَ مِئَةُ أَلْفِ دِرْهَمٍ وَأَنْتَ أَحْمَقُ؟ قَالَ: لَا وَاللهِ! قُلْتُ لَهُ: وَلِمَاذَا؟ قَالَ: أَخَافُ أَنْ يَقْضِيَ حُمْقِي عَلَى مَالِي وَيَبْقَى حُمْقِي.",
      textTr: "Çocukların Zekâsı. İmam İbnü'l-Cevzî \"el-Ezkiyâ\" adlı kitabında çocukların zekâsını gösteren bazı kıssalar anlatır: Halife Ömer bin Hattâb bir yolda yürürken oynayan çocukların yanından geçti. Çocuklar onu görünce uzağa koştular; yalnız bir çocuk yerinde durdu. Ömer ona: \"Neden arkadaşlarınla koşmadın?\" dedi. Çocuk: \"Ey müminlerin emiri, senden korkacak kötü bir şey yapmadım; yol da dar değil ki onu sana bırakayım!\" dedi. Halife çocuğun zekâsına hayran kaldı. Bu çocuk sonradan büyük bir komutan ve büyük bir âlim oldu: Abdullah bin Zübeyr. — Bir çocuk yemek yiyen bazı adamlarla oturdu ve ağladı. \"Neden ağlıyorsun?\" dediler. \"Yemek sıcak!\" dedi. \"Soğuyuncaya kadar bırak!\" dediler. \"Ben bırakırsam siz bırakmazsınız ki!\" dedi. — Esmaî der ki: Arapların çocuklarından küçük bir oğlana sordum: \"Ahmak olduğun hâlde yüz bin dirhemin olması seni sevindirir mi?\" \"Hayır, vallahi!\" dedi. \"Neden?\" dedim. \"Ahmaklığımın malımı bitirip ahmaklığımın kalmasından korkarım\" dedi.",
      qa: [
        { q: "لِمَاذَا لَمْ يَجْرِ الطِّفْلُ مَعَ أَصْحَابِهِ؟", a: "لِأَنَّهُ لَمْ يَعْمَلْ سُوءًا حَتَّى يَخَافَ، وَلَيْسَتِ الطَّرِيقُ ضَيِّقَةً حَتَّى يَتْرُكَهَا.", tr: "Çocuk neden arkadaşlarıyla koşmadı? Korkacak bir kötülük yapmadığı ve yol dar olmadığı için." },
        { q: "مَنْ أَصْبَحَ هَذَا الطِّفْلُ فِيمَا بَعْدُ؟", a: "أَصْبَحَ قَائِدًا عَظِيمًا وَعَالِمًا كَبِيرًا: عَبْدَ اللهِ بْنَ الزُّبَيْرِ.", tr: "Bu çocuk sonradan kim oldu? Abdullah bin Zübeyr." },
        { q: "لِمَاذَا لَمْ يَتْرُكِ الطِّفْلُ الطَّعَامَ حَتَّى يَبْرُدَ؟", a: "لِأَنَّ الرِّجَالَ لَنْ يَتْرُكُوهُ لَهُ.", tr: "Çocuk yemeği neden soğumaya bırakmadı? Çünkü adamlar onu ona bırakmayacaktı." },
        { q: "لِمَاذَا لَا يُرِيدُ الغُلَامُ المَالَ مَعَ الحُمْقِ؟", a: "يَخَافُ أَنْ يَقْضِيَ حُمْقُهُ عَلَى مَالِهِ وَيَبْقَى حُمْقُهُ.", tr: "Oğlan neden ahmaklıkla birlikte malı istemiyor? Ahmaklığının malını bitirip kendisinin kalmasından korkuyor." }
      ],
      cls: { opts: NM_OPTS, ar: "صَنِّفِ الأَفْعَالَ المُضَارِعَةَ", tr: "Parçadaki altı çizili muzâri mansûb mu, merfû mu?", items: [
        { s: "لَمْ أَعْمَلْ سُوءًا حَتَّى <b class=\"hl\">أَخَافَكَ</b>", a: "nasb", why: "حَتَّى'dan sonra." },
        { s: "فَمَرَّ بِأَطْفَالٍ <b class=\"hl\">يَلْعَبُونَ</b>", a: "ref", why: "Edat yok; nun duruyor." },
        { s: "اتْرُكْهُ حَتَّى <b class=\"hl\">يَبْرُدَ</b>", a: "nasb", why: "حَتَّى'dan sonra." },
        { s: "فَأَنْتُمْ لَا <b class=\"hl\">تَتْرُكُونَهُ</b>", a: "ref", why: "لَا nasb etmez; nun duruyor." },
        { s: "أَيَسُرُّكَ أَنْ <b class=\"hl\">يَكُونَ</b> لَكَ مِئَةُ أَلْفِ دِرْهَمٍ", a: "nasb", why: "أَنْ'den sonra." },
        { s: "<b class=\"hl\">أَخَافُ</b> أَنْ يَقْضِيَ حُمْقِي", a: "ref", why: "Önünde edat yok." },
        { s: "أَخَافُ أَنْ <b class=\"hl\">يَقْضِيَ</b> حُمْقِي عَلَى مَالِي", a: "nasb", why: "أَنْ'den sonra; fetha yâ üzerinde." },
        { s: "كَانَ الخَلِيفَةُ <b class=\"hl\">يَمْشِي</b> فِي طَرِيقٍ", a: "ref", why: "Edat yok; ي sakin." }
      ]}
    },
    { type: "find", target: "y", num: "+", extra: true, ar: "عَيِّنِ الفِعْلَ المُضَارِعَ المَنْصُوبَ", tr: "Ek alıştırma: parçadan alınan cümlelerde yalnız mansûb muzârilere dokun. Bazı cümlelerde hiç yok!", items: [
      W("لَمْ أَعْمَلْ سُوءًا حَتَّى [أَخَافَكَ]، وَلَيْسَتِ الطَّرِيقُ ضَيِّقَةً حَتَّى [أَتْرُكَهَا] لَكَ!", "Korkacak bir kötülük yapmadım; yol da dar değil ki onu sana bırakayım!", "أَعْمَلْ meczûmdur (لَمْ), mansûb değil."),
      W("فَقَالَ لَهُ عُمَرُ: لِمَاذَا لَمْ تَجْرِ مَعَ أَصْحَابِكَ؟", "Ömer ona: Neden arkadaşlarınla koşmadın? dedi.", "Mansûb fiil yok: تَجْرِ meczûmdur (لَمْ)."),
      W("قَالُوا: اتْرُكْهُ حَتَّى [يَبْرُدَ]!", "Soğuyuncaya kadar bırak, dediler.", "حَتَّى يَبْرُدَ."),
      W("قَالَ: إِذَا أَنَا تَرَكْتُهُ فَأَنْتُمْ لَا تَتْرُكُونَهُ!", "Ben bırakırsam siz bırakmazsınız, dedi.", "Mansûb fiil yok: تَتْرُكُونَهُ merfû."),
      W("أَيَسُرُّكَ أَنْ [يَكُونَ] لَكَ مِئَةُ أَلْفِ دِرْهَمٍ وَأَنْتَ أَحْمَقُ؟", "Ahmak olduğun hâlde yüz bin dirhemin olması seni sevindirir mi?", "أَنْ يَكُونَ. أَيَسُرُّكَ merfû."),
      W("أَخَافُ أَنْ [يَقْضِيَ] حُمْقِي عَلَى مَالِي [وَيَبْقَى] حُمْقِي.", "Ahmaklığımın malımı bitirip ahmaklığımın kalmasından korkarım.", "وَيَبْقَى, يَقْضِيَ'ye atfedildiği için mansûb; elif-i maksûrede fetha görünmez."),
      W("كَانَ الخَلِيفَةُ يَمْشِي فِي طَرِيقٍ، فَمَرَّ بِأَطْفَالٍ يَلْعَبُونَ.", "Halife bir yolda yürüyordu, oynayan çocukların yanından geçti.", "Mansûb fiil yok.")
    ]}
  ]
}
];

// Nasb makinesi: fiiller (merfû, mansûb, Türkçe anlamlar: yalın, أَنْ, لَنْ, amaç, حَتَّى)
var MAKINE = [
  ["أَشْرَبُ", "أَشْرَبَ", ["içerim", "içmem(ek)", "asla içmeyeceğim", "içmek için", "içeyim diye"]],
  ["أَنَامُ", "أَنَامَ", ["uyurum", "uyumam(ak)", "asla uyumayacağım", "uyumak için", "uyuyayım diye"]],
  ["يَذْهَبُ", "يَذْهَبَ", ["gider", "gitmesi", "asla gitmeyecek", "gitmesi için", "gitsin diye"]],
  ["تَنْجَحُ", "تَنْجَحَ", ["başarırsın", "başarman", "asla başaramayacaksın", "başarman için", "başarasın diye"]],
  ["أُصَلِّي", "أُصَلِّيَ", ["namaz kılarım", "namaz kılmam", "asla namaz kılmayacağım (!)", "namaz kılmak için", "namaz kılayım diye"]],
  ["يَدْخُلُ", "يَدْخُلَ", ["girer", "girmesi", "asla girmeyecek", "girmesi için", "girsin diye"]],
  ["يَكْتُبُونَ", "يَكْتُبُوا", ["yazarlar", "yazmaları", "asla yazmayacaklar", "yazmaları için", "yazsınlar diye"]]
];
var MAKINE_E = [["", "edat yok"], ["أَنْ", "أَنْ"], ["لَنْ", "لَنْ"], ["كَيْ", "كَيْ"], ["لِكَيْ", "لِكَيْ"], ["لِ", "لِـ"], ["حَتَّى", "حَتَّى"]];

// Oyun havuzu: [cümle {fiil}, seçenekler (ilki doğru), hal, açıklama, Türkçe, konu]
var NS_POOL = [
  ["أُرِيدُ أَنْ {أَشْرَبَ} قَهْوَةً.", ["أَشْرَبَ", "أَشْرَبُ", "أَشْرَبْ"], "nasb", "أَنْ'den sonra mansûb", "Kahve içmek istiyorum.", "u1"],
  ["{أَشْرَبُ} قَهْوَةً كُلَّ صَبَاحٍ.", ["أَشْرَبُ", "أَشْرَبَ", "أَشْرَبْ"], "ref", "edat yok: merfû", "Her sabah kahve içerim.", "u1"],
  ["لَنْ {أَنَامَ} مُتَأَخِّرًا.", ["أَنَامَ", "أَنَامُ", "أَنَمْ"], "nasb", "لَنْ'den sonra mansûb", "Asla geç uyumayacağım.", "u1"],
  ["{أَنَامُ} مُبَكِّرًا.", ["أَنَامُ", "أَنَامَ", "أَنَمْ"], "ref", "edat yok: merfû", "Erken uyurum.", "u1"],
  ["يَجِبُ أَنْ {تُمَارِسَ} الرِّيَاضَةَ.", ["تُمَارِسَ", "تُمَارِسُ", "تُمَارِسْ"], "nasb", "أَنْ'den sonra mansûb", "Spor yapman gerekir.", "u1"],
  ["لَنْ {أَكْذِبَ} أَبَدًا.", ["أَكْذِبَ", "أَكْذِبُ", "أَكْذِبْ"], "nasb", "لَنْ'den sonra mansûb", "Asla yalan söylemeyeceğim.", "u1"],
  ["قَرَّرَتْ فَاطِمَةُ أَنْ {تَعْتَمِرَ}.", ["تَعْتَمِرَ", "تَعْتَمِرُ", "تَعْتَمِرْ"], "nasb", "أَنْ'den sonra mansûb", "Fâtıma umre yapmaya karar verdi.", "u1"],
  ["{يَحْضُرُ} الأُسْتَاذُ غَدًا.", ["يَحْضُرُ", "يَحْضُرَ", "يَحْضُرْ"], "ref", "edat yok: merfû", "Hoca yarın gelir.", "u1"],
  ["لَنْ {يَذْهَبُوا} إِلَى السُّوقِ.", ["يَذْهَبُوا", "يَذْهَبُونَ", "يَذْهَبُونَا"], "nasb", "لَنْ'den sonra; beş fiilde nun düşer", "Asla çarşıya gitmeyecekler.", "u1"],
  ["{يَذْهَبُونَ} إِلَى السُّوقِ.", ["يَذْهَبُونَ", "يَذْهَبُوا", "يَذْهَبَ"], "ref", "edat yok: nun durur", "Çarşıya giderler.", "u1"],
  ["جِئْتُ إِلَى مَكَّةَ كَيْ {أَحُجَّ}.", ["أَحُجَّ", "أَحُجُّ", "أَحُجْ"], "nasb", "كَيْ'den sonra mansûb", "Hacca gitmek için Mekke'ye geldim.", "u2"],
  ["دَخَلْتُ المَسْجِدَ لِكَيْ {أُصَلِّيَ} الظُّهْرَ.", ["أُصَلِّيَ", "أُصَلِّي", "أُصَلِّ"], "nasb", "لِكَيْ'den sonra; fetha yâ üzerinde görünür", "Öğle namazını kılmak için mescide girdim.", "u2"],
  ["سَأُسَافِرُ إِلَى القَاهِرَةِ لِـ{أُشَاهِدَ} الأَهْرَامَ.", ["أُشَاهِدَ", "أُشَاهِدُ", "أُشَاهِدْ"], "nasb", "lâm-ı ta'lîlden sonra mansûb", "Piramitleri görmek için Kahire'ye gideceğim.", "u2"],
  ["افْتَحِ النَّافِذَةَ حَتَّى {يَدْخُلَ} الهَوَاءُ.", ["يَدْخُلَ", "يَدْخُلُ", "يَدْخُلْ"], "nasb", "حَتَّى'dan sonra mansûb", "Hava girsin diye pencereyi aç.", "u2"],
  ["لَنْ أَتَكَلَّمَ مَعَكَ حَتَّى {تَعْتَذِرَ} مِنِّي.", ["تَعْتَذِرَ", "تَعْتَذِرُ", "تَعْتَذِرْ"], "nasb", "حَتَّى'dan sonra mansûb", "Özür dileyinceye kadar seninle konuşmayacağım.", "u2"],
  ["خَرَجَ عَلِيٌّ إِلَى السُّوقِ لِـ{يَشْتَرِيَ} حِذَاءً.", ["يَشْتَرِيَ", "يَشْتَرِي", "يَشْتَرِ"], "nasb", "lâm-ı ta'lîlden sonra; fetha yâ üzerinde", "Ali ayakkabı almak için çarşıya çıktı.", "u2"],
  ["رَكِبَ الطَّالِبُ السَّيَّارَةَ حَتَّى {يَصِلَ} مُبَكِّرًا.", ["يَصِلَ", "يَصِلُ", "يَصِلْ"], "nasb", "حَتَّى'dan sonra mansûb", "Öğrenci erken varmak için arabaya bindi.", "u2"],
  ["جَمَعَ الجَدُّ أَحْفَادَهُ كَيْ {يَقُصَّ} عَلَيْهِمْ قِصَّةً.", ["يَقُصَّ", "يَقُصُّ", "يَقُصْ"], "nasb", "كَيْ'den sonra mansûb", "Dede hikâye anlatmak için torunlarını topladı.", "u2"],
  ["{يَدْرُسُ} عَلِيٌّ فِي المَدْرَسَةِ.", ["يَدْرُسُ", "يَدْرُسَ", "يَدْرُسْ"], "ref", "edat yok: merfû", "Ali okulda okur.", "u2"],
  ["لَمْ يَجْتَهِدْ فَـ{يَنْجَحَ}.", ["يَنْجَحَ", "يَنْجَحُ", "يَنْجَحْ"], "nasb", "nefyden sonraki fâ-i sebebiyye", "Çalışmadı ki başarsın.", "u3"],
  ["اصْنَعِ المَعْرُوفَ فَـ{تَنَالَ} الشُّكْرَ.", ["تَنَالَ", "تَنَالُ", "تَنَلْ"], "nasb", "emirden sonraki fâ-i sebebiyye", "İyilik yap ki teşekkür alasın.", "u3"],
  ["كُنْ لَيِّنَ الجَانِبِ فَـ{تُحَبَّ}.", ["تُحَبَّ", "تُحَبُّ", "تُحَبْ"], "nasb", "emirden sonraki fâ-i sebebiyye", "Yumuşak huylu ol ki sevilesin.", "u3"],
  ["هَلْ لَكَ صَدِيقٌ فَـ{تَرْكَنَ} إِلَيْهِ؟", ["تَرْكَنَ", "تَرْكَنُ", "تَرْكَنْ"], "nasb", "sorudan sonraki fâ-i sebebiyye", "Dayanacağın bir dostun var mı?", "u3"],
  ["يَدْرُسُ أَحْمَدُ فَـ{يَنْجَحُ}.", ["يَنْجَحُ", "يَنْجَحَ", "يَنْجَحْ"], "ref", "önünde nefy ya da talep yok: merfû", "Ahmed çalışır ve başarır.", "u3"],
  ["لَا تَكْسَلْ فَـ{تَنْدَمَ}.", ["تَنْدَمَ", "تَنْدَمُ", "تَنْدَمْ"], "nasb", "nehyden sonraki fâ-i sebebiyye", "Tembellik etme, yoksa pişman olursun.", "u3"],
  ["فَلَنْ {تَجِدَ} لَهُ نَصِيرًا", ["تَجِدَ", "تَجِدُ", "تَجِدْ"], "nasb", "لَنْ'den sonra mansûb", "Ona asla bir yardımcı bulamazsın.", "u4"],
  ["كَيْ لَا {يَكُونَ} دُولَةً بَيْنَ الأَغْنِيَاءِ", ["يَكُونَ", "يَكُونُ", "يَكُنْ"], "nasb", "كَيْ (لَا) sonrası mansûb", "Zenginler arasında dolaşan bir şey olmasın diye.", "u4"],
  ["وَلَكِنَّ أَكْثَرَهُمْ لَا {يَعْلَمُونَ}", ["يَعْلَمُونَ", "يَعْلَمُوا", "يَعْلَمَ"], "ref", "edat yok: nun durur", "Fakat çoğu bilmez.", "u4"],
  ["حَتَّى {يَتَبَيَّنَ} لَهُمْ أَنَّهُ الحَقُّ", ["يَتَبَيَّنَ", "يَتَبَيَّنُ", "يَتَبَيَّنْ"], "nasb", "حَتَّى'dan sonra mansûb", "Onun hak olduğu belli oluncaya kadar.", "u4"],
  ["لِمَنْ أَرَادَ أَنْ {يُتِمَّ} الرَّضَاعَةَ", ["يُتِمَّ", "يُتِمُّ", "يُتِمْ"], "nasb", "أَنْ'den sonra mansûb", "Emzirmeyi tamamlamak isteyenler için.", "u4"],
  ["اتْرُكْهُ حَتَّى {يَبْرُدَ}!", ["يَبْرُدَ", "يَبْرُدُ", "يَبْرُدْ"], "nasb", "حَتَّى'dan sonra mansûb", "Soğuyuncaya kadar bırak!", "u5"],
  ["أَيَسُرُّكَ أَنْ {يَكُونَ} لَكَ مَالٌ؟", ["يَكُونَ", "يَكُونُ", "يَكُنْ"], "nasb", "أَنْ'den sonra mansûb", "Malın olması seni sevindirir mi?", "u5"],
  ["{أَخَافُ} أَنْ يَقْضِيَ حُمْقِي عَلَى مَالِي.", ["أَخَافُ", "أَخَافَ", "أَخَفْ"], "ref", "edat yok: merfû", "Ahmaklığımın malımı bitirmesinden korkarım.", "u5"],
  ["فَمَرَّ بِأَطْفَالٍ {يَلْعَبُونَ}.", ["يَلْعَبُونَ", "يَلْعَبُوا", "يَلْعَبَ"], "ref", "edat yok: nun durur", "Oynayan çocukların yanından geçti.", "u5"]
];
// Edat avcısı: [cümle (boşluk ___), doğru grup: an / lan / amac, Türkçe]
var EDAT_POOL = [
  ["أُرِيدُ ___ أَشْرَبَ قَهْوَةً.", "an", "Kahve içmek istiyorum."], ["___ أَنَامَ مُتَأَخِّرًا.", "lan", "Asla geç uyumayacağım."], ["جِئْتُ إِلَى مَكَّةَ ___ أَحُجَّ.", "amac", "Hacca gitmek için Mekke'ye geldim."],
  ["يَجِبُ ___ تُمَارِسَ الرِّيَاضَةَ.", "an", "Spor yapman gerekir."], ["___ أَكْذِبَ أَبَدًا.", "lan", "Asla yalan söylemeyeceğim."], ["دَخَلْتُ المَسْجِدَ ___ أُصَلِّيَ.", "amac", "Namaz kılmak için mescide girdim."],
  ["أَتَمَنَّى ___ تَنْجَحَ فِي الامْتِحَانِ.", "an", "Sınavda başarılı olmanı dilerim."], ["___ أَتَأَخَّرَ عَنِ الدَّرْسِ.", "lan", "Derse asla geç kalmayacağım."], ["افْتَحِ النَّافِذَةَ ___ يَدْخُلَ الهَوَاءُ.", "amac", "Hava girsin diye pencereyi aç."],
  ["قَرَّرْتُ ___ أَتَعَلَّمَ العَرَبِيَّةَ.", "an", "Arapça öğrenmeye karar verdim."], ["___ يُسَافِرَ رَئِيسُ الوُزَرَاءِ.", "lan", "Başbakan asla gitmeyecek."], ["ذَهَبْتُ إِلَى المَكْتَبَةِ ___ أَقْرَأَ.", "amac", "Okumak için kütüphaneye gittim."],
  ["يَنْبَغِي ___ تَحْفَظَ الشِّعْرَ.", "an", "Şiir ezberlemen gerekir."], ["قُلْ ___ يُصِيبَنَا إِلَّا مَا كَتَبَ اللهُ لَنَا.", "lan", "Allah'ın yazdığından başkası bize asla isabet etmez."], ["اتَّخِذْ صَدِيقًا عَرَبِيًّا ___ تُتْقِنَ العَرَبِيَّةَ.", "amac", "Arapçayı iyi öğrenmek için Arap bir arkadaş edin."],
  ["أُحِبُّ ___ أَزُورَ إِسْطَنْبُولَ.", "an", "İstanbul'u ziyaret etmeyi severim."], ["___ أَكُونَ كَسْلَانَ.", "lan", "Asla tembel olmayacağım."], ["اسْتَيْقَظْتُ مُبَكِّرًا ___ أُصَلِّيَ الفَجْرَ.", "amac", "Sabah namazını kılmak için erken kalktım."]
];
// Fâ testi: [cümle (fiil harekesiz), mansûb mu, açıklama]
var FA_POOL = [
  ["ادْرُسْ فَتَنْجَح", true, "Emirden sonra: فَتَنْجَحَ."], ["لَا تَكْسَلْ فَتَنْدَم", true, "Nehyden sonra: فَتَنْدَمَ."], ["هَلْ تَزُورُنَا فَنُكْرِمَكَ؟", true, "Sorudan sonra: فَنُكْرِمَكَ."], ["لَيْتَ لِي مَالًا فَأَتَصَدَّق", true, "Temenniden sonra: فَأَتَصَدَّقَ."],
  ["لَمْ يَجْتَهِدْ فَيَنْجَح", true, "Nefyden sonra: فَيَنْجَحَ."], ["مَا تَأْتِينَا فَتُحَدِّثَنَا", true, "Nefyden sonra: فَتُحَدِّثَنَا."], ["كُنْ لَيِّنًا فَتُحَبّ", true, "Emirden sonra: فَتُحَبَّ."], ["اصْنَعِ المَعْرُوفَ فَتَنَال الشُّكْرَ", true, "Emirden sonra: فَتَنَالَ."],
  ["يَدْرُسُ أَحْمَدُ فَيَنْجَح", false, "Talep yok: فَيَنْجَحُ (merfû)."], ["أَنَا أَعْمَلُ فَأَكْسِب", false, "Talep yok: فَأَكْسِبُ."], ["المُسْلِمُ يَصْدُقُ فَيُحِبُّهُ النَّاسُ", false, "Talep yok: merfû."], ["يَطْلُعُ الفَجْرُ فَنُصَلِّي", false, "Talep yok: فَنُصَلِّي (merfû)."],
  ["تَمْطُرُ السَّمَاءُ فَتَخْضَرّ الأَرْضُ", false, "Talep yok: فَتَخْضَرُّ."], ["يَقْرَأُ عَلِيٌّ فَيَفْهَم", false, "Talep yok: فَيَفْهَمُ."]
];
var HAFIZA = {
  anlam: { name: "Edat ↔ anlam", pairs: [["أَنْ", "-mek / -mesi"], ["لَنْ", "asla …meyecek"], ["كَيْ", "-mek için"], ["حَتَّى", "-sın diye / -ıncaya kadar"], ["لِـ", "-mek için (lâm-ı ta'lîl)"], ["فَـ", "…ki böylece (talepten sonra)"], ["لِكَيْ", "-mek için (لِ + كَيْ)"], ["كَيْ لَا", "-mesin diye"]] },
  hal: { name: "Merfû ↔ mansûb", pairs: [["أَشْرَبُ", "أَنْ أَشْرَبَ"], ["أَنَامُ", "لَنْ أَنَامَ"], ["أَحُجُّ", "كَيْ أَحُجَّ"], ["أُصَلِّي", "لِكَيْ أُصَلِّيَ"], ["أُشَاهِدُ", "لِأُشَاهِدَ"], ["يَدْخُلُ", "حَتَّى يَدْخُلَ"], ["يَذْهَبُونَ", "لَنْ يَذْهَبُوا"], ["أَكْذِبُ", "لَنْ أَكْذِبَ"]] }
};
var KARTLAR = [
  ["Muzâri fiil normalde hangi haldedir?", "Merfû; sonu damme: أَشْرَبُ، يَذْهَبُ"],
  ["Nasb edatları hangileri?", "أَنْ، لَنْ، كَيْ، لِكَيْ، لِـ، حَتَّى"],
  ["Mansûb muzârinin alameti?", "Fetha: أَشْرَبُ ← أَنْ أَشْرَبَ · أَنَامُ ← لَنْ أَنَامَ"],
  ["أَنْ hangi anlamı katar?", "-mek / -mesi: أُرِيدُ أَنْ أَشْرَبَ (içmek istiyorum)"],
  ["لَنْ hangi anlamı katar?", "Kesin olumsuz gelecek: لَنْ أَكْذِبَ أَبَدًا (asla yalan söylemeyeceğim)"],
  ["كَيْ، لِكَيْ ve لِـ ne demek?", "-mek için: جِئْتُ كَيْ أَحُجَّ · لِأُشَاهِدَ"],
  ["حَتَّى ne demek?", "-sın diye / -ıncaya kadar: حَتَّى يَدْخُلَ الهَوَاءُ"],
  ["حَتَّى isimden önce gelirse?", "Harf-i cer olur, ismi mecrûr yapar: حَتَّى الظُّهْرِ"],
  ["Sonu ي olan fiilde nasb nasıl görünür?", "Fetha yâ üzerinde görünür: أُصَلِّيَ، يَأْتِيَ"],
  ["يَذْهَبُونَ nasb edilince?", "Nun düşer: لَنْ يَذْهَبُوا"],
  ["Fâ-i sebebiyyeden sonra fiil ne zaman mansûb olur?", "Önünde nefy ya da talep (emir, nehy, soru, temenni) varsa: ادْرُسْ فَتَنْجَحَ"],
  ["يَدْرُسُ فَيَنْجَحُ neden merfû?", "فَـ'dan önce nefy ya da talep yok."],
  ["كِيلًا nasb edatı mı?", "Hayır! \"bir kilo\" demek, isimdir. Edat olan: كَيْ لَا"],
  ["أَنْ ile أَنَّ farkı?", "أَنْ (sakin) fiili nasb eder: أَنْ يُتِمَّ. أَنَّ (şeddeli) isme gelir: أَنَّهُ الحَقُّ"]
];
