// ================= VERİ: İsm-i Fâil ve İsm-i Mef'ûl (اسْمُ الفَاعِلِ وَاسْمُ المَفْعُولِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "mz.قَدِمَ" gibi yazılırsa etikete not eklenir.
var ROLES = {
  mz: { ar: "اسْمُ فَاعِلٍ", tr: "İsm-i fâil" }, nasb: { ar: "اسْمُ مَفْعُولٍ", tr: "İsm-i mef'ûl" }, cerr: { ar: "فِعْلٌ", tr: "Fiil" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
var FM_OPTS = [["f", "İsm-i fâil", "اسْمُ فَاعِلٍ", "mz"], ["m", "İsm-i mef'ûl", "اسْمُ مَفْعُولٍ", "nasb"], ["n", "İkisi de değil", "لَيْسَ مِنْهُمَا", "x"]];
var FM_TR = { f: "İsm-i fâil", m: "İsm-i mef'ûl", n: "İkisi de değil" };
var SG_OPTS = [["s", "Sülâsîden ism-i fâil", "مِنَ الثُّلَاثِيِّ", "mz"], ["g", "Gayr-i sülâsîden ism-i fâil", "مِنْ غَيْرِ الثُّلَاثِيِّ", "mi"], ["n", "İsm-i fâil değil", "لَيْسَ اسْمَ فَاعِلٍ", "x"]];

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
// seçenekli madde: ilk seçenek doğru, karıştırılmış sırayla
function PK(q, o, tr, why, k) { var r = o.slice(), a = (k || 0) % o.length; var c = r.splice(0, 1)[0]; r.splice(a, 0, c); return { q: q, o: r, a: a, tr: tr, why: why }; }

// Fiiller: [mâzi, muzâri, ism-i fâil, ism-i mef'ûl (yoksa null), Türkçe fiil, Türkçe fâil, Türkçe mef'ûl, s = sülâsî / g = gayr-i sülâsî]
var MV = [
  ["كَتَبَ", "يَكْتُبُ", "كَاتِبٌ", "مَكْتُوبٌ", "yazdı", "yazan", "yazılmış", "s"],
  ["فَتَحَ", "يَفْتَحُ", "فَاتِحٌ", "مَفْتُوحٌ", "açtı", "açan", "açık (açılmış)", "s"],
  ["حَفِظَ", "يَحْفَظُ", "حَافِظٌ", "مَحْفُوظٌ", "korudu", "koruyan", "korunmuş", "s"],
  ["عَلِمَ", "يَعْلَمُ", "عَالِمٌ", "مَعْلُومٌ", "bildi", "bilen", "bilinen", "s"],
  ["ظَلَمَ", "يَظْلِمُ", "ظَالِمٌ", "مَظْلُومٌ", "zulmetti", "zalim", "mazlum", "s"],
  ["شَكَرَ", "يَشْكُرُ", "شَاكِرٌ", "مَشْكُورٌ", "teşekkür etti", "teşekkür eden", "teşekkür edilen", "s"],
  ["قَتَلَ", "يَقْتُلُ", "قَاتِلٌ", "مَقْتُولٌ", "öldürdü", "katil", "öldürülmüş", "s"],
  ["سَأَلَ", "يَسْأَلُ", "سَائِلٌ", "مَسْؤُولٌ", "sordu", "soran", "sorumlu (sorulan)", "s"],
  ["حَمِدَ", "يَحْمَدُ", "حَامِدٌ", "مَحْمُودٌ", "övdü", "öven", "övülmüş", "s"],
  ["عَبَدَ", "يَعْبُدُ", "عَابِدٌ", "مَعْبُودٌ", "ibadet etti", "âbid", "mâbud", "s"],
  ["ذَكَرَ", "يَذْكُرُ", "ذَاكِرٌ", "مَذْكُورٌ", "andı", "anan", "anılan", "s"],
  ["شَرِبَ", "يَشْرَبُ", "شَارِبٌ", "مَشْرُوبٌ", "içti", "içen", "içilen", "s"],
  ["رَحِمَ", "يَرْحَمُ", "رَاحِمٌ", "مَرْحُومٌ", "merhamet etti", "merhamet eden", "merhum", "s"],
  ["غَلَبَ", "يَغْلِبُ", "غَالِبٌ", "مَغْلُوبٌ", "yendi", "galip", "mağlup", "s"],
  ["قَبِلَ", "يَقْبَلُ", "قَابِلٌ", "مَقْبُولٌ", "kabul etti", "kabul eden", "makbul", "s"],
  ["جَلَسَ", "يَجْلِسُ", "جَالِسٌ", null, "oturdu", "oturan", "", "s"],
  ["ذَهَبَ", "يَذْهَبُ", "ذَاهِبٌ", null, "gitti", "giden", "", "s"],
  ["عَلَّمَ", "يُعَلِّمُ", "مُعَلِّمٌ", "مُعَلَّمٌ", "öğretti", "öğretmen", "öğretilmiş", "g"],
  ["أَكْرَمَ", "يُكْرِمُ", "مُكْرِمٌ", "مُكْرَمٌ", "ikram etti", "ikram eden", "ikram edilen", "g"],
  ["أَرْسَلَ", "يُرْسِلُ", "مُرْسِلٌ", "مُرْسَلٌ", "gönderdi", "gönderen", "gönderilen", "g"],
  ["دَرَّسَ", "يُدَرِّسُ", "مُدَرِّسٌ", "مُدَرَّسٌ", "ders verdi", "ders veren", "okutulan", "g"],
  ["خَاطَبَ", "يُخَاطِبُ", "مُخَاطِبٌ", "مُخَاطَبٌ", "hitap etti", "hitap eden", "muhatap", "g"],
  ["أَغْلَقَ", "يُغْلِقُ", "مُغْلِقٌ", "مُغْلَقٌ", "kapattı", "kapatan", "kapalı", "g"],
  ["كَسَّرَ", "يُكَسِّرُ", "مُكَسِّرٌ", "مُكَسَّرٌ", "kırdı", "kıran", "kırık", "g"],
  ["هَذَّبَ", "يُهَذِّبُ", "مُهَذِّبٌ", "مُهَذَّبٌ", "terbiye etti", "terbiye eden", "terbiyeli", "g"],
  ["طَالَبَ", "يُطَالِبُ", "مُطَالِبٌ", "مُطَالَبٌ", "talep etti", "talep eden", "talep edilen", "g"],
  ["تَعَلَّمَ", "يَتَعَلَّمُ", "مُتَعَلِّمٌ", "مُتَعَلَّمٌ", "öğrendi", "öğrenen", "öğrenilen", "g"],
  ["أَحْسَنَ", "يُحْسِنُ", "مُحْسِنٌ", null, "iyilik etti", "iyilik eden", "", "g"],
  ["سَافَرَ", "يُسَافِرُ", "مُسَافِرٌ", null, "yolculuk etti", "yolcu", "", "g"],
  ["جَاهَدَ", "يُجَاهِدُ", "مُجَاهِدٌ", null, "cihad etti", "mücahit", "", "g"],
  ["اسْتَمَعَ", "يَسْتَمِعُ", "مُسْتَمِعٌ", null, "dinledi", "dinleyen", "", "g"]
];
var MAK_V = [0, 1, 3, 4, 7, 15, 17, 18, 19, 23, 26, 28];
// harflere ayır (harf + harekeleri)
function harfler(w) { return w.match(/[^ً-ْٰ][ً-ْٰ]*/g) || []; }
// kalıp harflerini renklendir: fs = فَاعِل, ms = مَفْعُول, g = مُـ ... (sondan önceki harf)
function kalipHtml(w, kind, col) {
  var h = harfler(w), on = {};
  if (kind === "fs") { for (var i = 0; i < h.length; i++) if (/^[اآ]/.test(h[i])) { on[i] = 1; on[i + 1] = 1; break; } }
  else if (kind === "ms") { on[0] = 1; for (var j = h.length - 2; j > 0; j--) if (/^و/.test(h[j])) { on[j] = 1; break; } }
  else { on[0] = 1; on[h.length - 2] = 1; }
  return h.map(function (x, i) { return on[i] ? '<b style="color:var(--' + col + ')">' + x + '</b>' : x; }).join("");
}
function fHtml(v) { return kalipHtml(v[2], v[7] === "s" ? "fs" : "g", "mz"); }
function mHtml(v) { return v[3] ? kalipHtml(v[3], v[7] === "s" ? "ms" : "g", "nasb") : ""; }
// tasrif: [müz. tekil, ikil, çoğul, müe. tekil, ikil, çoğul]
function tasrif(w) { var s = w.replace(/ٌ$/, ""); return [s + "ٌ", s + "َانِ", s + "ُونَ", s + "َةٌ", s + "َتَانِ", s + "َاتٌ"]; }
var TS_LBL = ["Müzekker tekil", "Müzekker ikil", "Müzekker çoğul", "Müennes tekil", "Müennes ikil", "Müennes çoğul"];

var UNITS = [
// ---------------------------------------------------------------- 1 · SÜLÂSÎDEN İSM-İ FÂİL
{
  id: "u1", no: 1, ar: "اسْمُ الفَاعِلِ مِنَ الثُّلَاثِيِّ", tr: "Sülâsîden İsm-i Fâil", short: "Fâil (sülâsî)", col: "mz", legend: ["mz"],
  goals: ["İsm-i fâilin işi yapanı gösterdiğini bilmek", "Üç harfli fiilden فَاعِل kalıbıyla ism-i fâil yapmak: كَتَبَ ← كَاتِبٌ", "Ortası elif olan (قَالَ ← قَائِلٌ) ve şeddeli (ضَلَّ ← ضَالٌّ) fiilleri doğru çevirmek"],
  examples: [
    { s: "أَحْمَدُ:- / قَادِمٌ:mz.قَدِمَ / مِنَ المَدِينَةِ المُنَوَّرَةِ:-", tr: "Ahmed Medine-i Münevvere'den geliyor." },
    { s: "الأُسْتَاذُ:- / عَائِدٌ:mz.عَادَ / بِالطَّائِرَةِ الآنَ:-", tr: "Hoca şimdi uçakla dönüyor." },
    { s: "كَتَبَ:cerr / ←:- / كَاتِبٌ:mz", tr: "yazdı → yazan" },
    { s: "حَفِظَ:cerr / ←:- / حَافِظٌ:mz", tr: "ezberledi, korudu → hâfız, koruyan" }
  ],
  rules: [
    { tr: "<b class=\"r-mz\">İsm-i fâil</b>, işi yapanı gösteren kıyâsî (kurala bağlı) bir kalıptır: <span class=\"ar\">كَاتِبٌ</span> yazan." },
    { tr: "Üç harfli (sülâsî) fiilden <span class=\"ar\">فَاعِل</span> kalıbıyla yapılır: birinci harften sonra <b>elif</b>, ikinci harf <b>kesre</b>.", ex: ["كَتَبَ ← كَاتِبٌ", "ذَهَبَ ← ذَاهِبٌ", "جَلَسَ ← جَالِسٌ", "فَتَحَ ← فَاتِحٌ", "حَفِظَ ← حَافِظٌ"] },
    { tr: "Hemzeli fiiller: <span class=\"ar\">سَأَلَ ← سَائِلٌ</span>, <span class=\"ar\">قَرَأَ ← قَارِئٌ</span>; baştaki hemze elifle birleşir: <span class=\"ar\">أَمَرَ ← آمِرٌ</span>." },
    { tr: "Ortası elif olan fiillerde elif hemzeye döner: <b>ـائِـ</b>.", ex: ["قَالَ ← قَائِلٌ", "بَاعَ ← بَائِعٌ", "عَادَ ← عَائِدٌ", "زَارَ ← زَائِرٌ"] },
    { tr: "Şeddeli (iki harfi aynı) fiillerde şedde korunur.", ex: ["سَرَّ ← سَارٌّ", "ضَلَّ ← ضَالٌّ", "دَلَّ ← دَالٌّ"] },
    { tr: "Not: İsim <b>câmid</b> (başka kelimeden alınmamış: <span class=\"ar\">الإِنْسَانُ، الرَّجُلُ، القَلَمُ</span>) ya da <b>müştak</b> (başka kelimeden alınmış: <span class=\"ar\">كَاتِبٌ، عَالِمٌ، مَعْلُومٌ</span>) olur. İsm-i fâil müştaktır." },
    { tr: "Tasrif: <span class=\"ar\">كَاتِبٌ، كَاتِبَانِ، كَاتِبُونَ (كُتَّابٌ) · كَاتِبَةٌ، كَاتِبَتَانِ، كَاتِبَاتٌ</span>." }
  ],
  kaide: [
    "اسْمُ الفَاعِلِ: صِيغَةٌ قِيَاسِيَّةٌ تَدُلُّ عَلَى مَنْ فَعَلَ الفِعْلَ.",
    "يَأْتِي اسْمُ الفَاعِلِ مِنَ الفِعْلِ الثُّلَاثِيِّ عَلَى وَزْنِ: فَاعِل، نَحْوُ: كَتَبَ – كَاتِبٌ، ذَهَبَ – ذَاهِبٌ، ضَرَبَ – ضَارِبٌ، جَلَسَ – جَالِسٌ، فَتَحَ – فَاتِحٌ، حَفِظَ – حَافِظٌ، سَأَلَ – سَائِلٌ، أَمَرَ – آمِرٌ، قَرَأَ – قَارِئٌ، وَقَفَ – وَاقِفٌ، قَالَ – قَائِلٌ، بَاعَ – بَائِعٌ، عَادَ – عَائِدٌ، سَرَّ – سَارٌّ، ضَلَّ – ضَالٌّ.",
    "مُلَاحَظَةٌ: الاسْمُ يَنْقَسِمُ إِلَى قِسْمَيْنِ: جَامِدٌ وَمُشْتَقٌّ. الجَامِدُ: اسْمٌ لَمْ يُؤْخَذْ مِنْ لَفْظٍ آخَرَ، مِثْلُ: الإِنْسَانِ، الرَّجُلِ، القَلَمِ، الأَمَانَةِ، العَدْلِ. المُشْتَقُّ: اسْمٌ أُخِذَ مِنْ لَفْظٍ آخَرَ، مِثْلُ: كَاتِبٍ، عَالِمٍ، مَعْلُومٍ، جَمِيلٍ، مِفْتَاحٍ.",
    "تَصْرِيفُ اسْمِ الفَاعِلِ: المُذَكَّرُ: كَاتِبٌ، كَاتِبَانِ، كَاتِبُونَ – كُتَّابٌ. المُؤَنَّثُ: كَاتِبَةٌ، كَاتِبَتَانِ، كَاتِبَاتٌ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنِ اسْمَ الفَاعِلِ فِيمَا يَلِي ثُمَّ اذْكُرْ فِعْلَهُ", tr: "İsm-i fâile dokun; \"Kontrol et\"ten sonra açıklamada fiilini gör. Gayr-i sülâsîden olanlar da hedef.", items: [
      W("﴿[مَالِكِ] يَوْمِ الدِّينِ﴾", "Din gününün sahibi. (Fâtiha 1/4)", "مَالِكٌ ← مَلَكَ (sahip oldu)."),
      W("﴿وَاللهُ [غَالِبٌ] عَلَى أَمْرِهِ﴾", "Allah işinde galiptir. (Yûsuf 12/21)", "غَالِبٌ ← غَلَبَ."),
      W("﴿ذَلِكَ [عَالِمُ] الغَيْبِ وَالشَّهَادَةِ﴾", "O, görüleni ve görülmeyeni bilendir. (Secde 32/6)", "عَالِمٌ ← عَلِمَ."),
      W("﴿[التَّائِبُونَ] [العَابِدُونَ] [الحَامِدُونَ] [السَّائِحُونَ] [الرَّاكِعُونَ] [السَّاجِدُونَ] [الآمِرُونَ] بِالمَعْرُوفِ [وَالنَّاهُونَ] عَنِ المُنْكَرِ [وَالحَافِظُونَ] لِحُدُودِ اللهِ وَبَشِّرِ [المُؤْمِنِينَ]﴾", "Tövbe edenler, ibadet edenler, hamd edenler, oruç tutanlar (yolculuk edenler), rükû edenler, secde edenler, iyiliği emredenler, kötülükten alıkoyanlar ve Allah'ın sınırlarını koruyanlar... Müminleri müjdele. (Tevbe 9/112)", "تَابَ، عَبَدَ، حَمِدَ، سَاحَ، رَكَعَ، سَجَدَ، أَمَرَ، نَهَى، حَفِظَ (sülâsî) · المُؤْمِنِينَ ← آمَنَ (gayr-i sülâsî). المَعْرُوفِ ise ism-i mef'ûldür."),
      W("قَالَ النَّبِيُّ ﷺ: [الدَّالُّ] عَلَى الخَيْرِ [كَفَاعِلِهِ].", "Hayra yol gösteren, onu yapan gibidir.", "دَالٌّ ← دَلَّ (şedde korunur); فَاعِلٌ ← فَعَلَ. النَّبِيُّ ism-i fâil değildir (فَعِيل)."),
      W("[الحَاكِمُ] يَرْكَبُ السَّيَّارَةَ.", "Hâkim (yönetici) arabaya biniyor.", "حَاكِمٌ ← حَكَمَ."),
      W("أَحْمَدُ [مُسَافِرٌ] إِلَى إِسْطَنْبُولَ.", "Ahmed İstanbul'a yolculuk ediyor.", "مُسَافِرٌ ← سَافَرَ (gayr-i sülâsî: مُـ + kesre)."),
      W("قَالَ أَبُو الدَّرْدَاءِ رَضِيَ اللهُ عَنْهُ: كُنْ [عَالِمًا] أَوْ [مُتَعَلِّمًا] أَوْ [مُسْتَمِعًا] وَلَا تَكُنِ الرَّابِعَ فَتَهْلِكَ.", "Ebü'd-Derdâ (r.a.): \"Âlim ol ya da öğrenen ya da dinleyen ol; dördüncüsü olma, helâk olursun.\"", "عَالِمٌ ← عَلِمَ; مُتَعَلِّمٌ ← تَعَلَّمَ; مُسْتَمِعٌ ← اسْتَمَعَ. الرَّابِعَ \"dördüncü\" sıra sayısıdır; burada iş yapan anlamı yok.")
    ]},
    { type: "pick", num: "٢", ar: "صُغِ اسْمَ الفَاعِلِ مِنَ الأَفْعَالِ التَّالِيَةِ", tr: "Fiilden ism-i fâil yap: فَاعِل kalıbı.", items: [
      PK("شَكَرَ ←", ["شَاكِرٌ", "مَشْكُورٌ", "شُكْرٌ"], "teşekkür eden", "فَاعِل: شَاكِرٌ. مَشْكُورٌ ism-i mef'ûl, شُكْرٌ masdardır.", 1),
      PK("حَكَمَ ←", ["حَاكِمٌ", "مَحْكُومٌ", "حُكْمٌ"], "hükmeden, hâkim", "حَاكِمٌ.", 0),
      PK("عَدَلَ ←", ["عَادِلٌ", "مَعْدُولٌ", "عَدْلٌ"], "adaletli", "عَادِلٌ.", 2),
      PK("لَعِبَ ←", ["لَاعِبٌ", "مَلْعُوبٌ", "لُعْبَةٌ"], "oyuncu", "لَاعِبٌ.", 1),
      PK("غَلَبَ ←", ["غَالِبٌ", "مَغْلُوبٌ", "غَلَبَةٌ"], "galip", "غَالِبٌ.", 0)
    ]},
    { type: "pick", num: "٤", ar: "امْلَأِ الفَرَاغَ كَمَا فِي الأَمْثِلَةِ", tr: "\"Fiil yaptı, o hâlde o ___ dır.\" Ortası elif olanlarda ـائِـ, şeddelilerde şedde.", exHtml: "<span class=\"ar\">نَجَحَ فَهُوَ نَاجِحٌ · كَتَبَ فَهُوَ كَاتِبٌ · قَامَ فَهُوَ قَائِمٌ · دَامَ فَهُوَ دَائِمٌ</span>", items: [
      PK("زَارَ فَهُوَ ___", ["زَائِرٌ", "زَاوِرٌ", "مَزُورٌ"], "ziyaret eden", "Ortası elif: زَائِرٌ.", 0),
      PK("نَزَلَ فَهُوَ ___", ["نَازِلٌ", "مَنْزُولٌ", "نَزِيلٌ"], "inen", "نَازِلٌ.", 1),
      PK("طَلَبَ فَهُوَ ___", ["طَالِبٌ", "مَطْلُوبٌ", "طَلَبٌ"], "isteyen, öğrenci", "طَالِبٌ.", 2),
      PK("فَازَ فَهُوَ ___", ["فَائِزٌ", "فَاوِزٌ", "فَوْزٌ"], "kazanan", "Ortası elif: فَائِزٌ.", 1),
      PK("شَكَّ فَهُوَ ___", ["شَاكٌّ", "شَاكِكٌ", "مَشْكُوكٌ"], "şüphe eden", "Şeddeli: şedde korunur → شَاكٌّ.", 0),
      PK("عَلِمَ فَهُوَ ___", ["عَالِمٌ", "مَعْلُومٌ", "عِلْمٌ"], "bilen", "عَالِمٌ.", 2),
      PK("تَابَ فَهُوَ ___", ["تَائِبٌ", "تَاوِبٌ", "تَوْبَةٌ"], "tövbe eden", "تَائِبٌ.", 1),
      PK("رَدَّ فَهُوَ ___", ["رَادٌّ", "رَادِدٌ", "مَرْدُودٌ"], "geri çeviren", "Şeddeli: رَادٌّ.", 0),
      PK("سَمِعَ فَهُوَ ___", ["سَامِعٌ", "مَسْمُوعٌ", "سَمْعٌ"], "işiten", "سَامِعٌ.", 2),
      PK("نَامَ فَهُوَ ___", ["نَائِمٌ", "نَاوِمٌ", "نَوْمٌ"], "uyuyan", "نَائِمٌ.", 0),
      PK("حَلَّ فَهُوَ ___", ["حَالٌّ", "حَالِلٌ", "مَحْلُولٌ"], "çözen, konan", "Şeddeli: حَالٌّ.", 1),
      PK("عَبَدَ فَهُوَ ___", ["عَابِدٌ", "مَعْبُودٌ", "عِبَادَةٌ"], "ibadet eden", "عَابِدٌ.", 2),
      PK("صَامَ فَهُوَ ___", ["صَائِمٌ", "صَاوِمٌ", "صَوْمٌ"], "oruçlu", "صَائِمٌ.", 0),
      PK("وَصَلَ فَهُوَ ___", ["وَاصِلٌ", "مَوْصُولٌ", "صِلَةٌ"], "ulaşan", "Baştaki و kalır: وَاصِلٌ.", 1),
      PK("نَظَرَ فَهُوَ ___", ["نَاظِرٌ", "مَنْظُورٌ", "نَظَرٌ"], "bakan", "نَاظِرٌ.", 2),
      PK("بَاعَ فَهُوَ ___", ["بَائِعٌ", "بَايِعٌ", "مَبِيعٌ"], "satıcı", "بَائِعٌ.", 0),
      PK("وَقَفَ فَهُوَ ___", ["وَاقِفٌ", "مَوْقُوفٌ", "وَقْفٌ"], "duran", "وَاقِفٌ.", 1),
      PK("قَدِمَ فَهُوَ ___", ["قَادِمٌ", "قَدِيمٌ", "مَقْدُومٌ"], "gelen", "قَادِمٌ. قَدِيمٌ \"eski\" demektir.", 2),
      PK("طَارَ فَهُوَ ___", ["طَائِرٌ", "طَاوِرٌ", "مَطَارٌ"], "uçan, kuş", "طَائِرٌ. مَطَارٌ havaalanı (yer ismi).", 0),
      PK("وَعَظَ فَهُوَ ___", ["وَاعِظٌ", "مَوْعُوظٌ", "مَوْعِظَةٌ"], "vaaz eden", "وَاعِظٌ.", 1),
      PK("جَلَسَ فَهُوَ ___", ["جَالِسٌ", "مَجْلِسٌ", "جُلُوسٌ"], "oturan", "جَالِسٌ. مَجْلِسٌ oturulan yer.", 2)
    ]},
    { type: "bank", num: "٥", ar: "اسْتَعْمِلِ اسْمَ الفَاعِلِ مِنَ الأَفْعَالِ التَّالِيَةِ فِي الفَرَاغَاتِ", tr: "(عَلِمَ – قَامَ – قَدِمَ – قَرَأَ – وَقَفَ – نَجَحَ) fiillerinden yapılmış ism-i fâili seç, sonra uygun boşluğa dokun.",
      bank: ["عَالِمٌ", "قَائِمٌ", "قَادِمٌ", "قَارِئٌ", "وَاقِفٌ", "نَاجِحٍ"], items: [
      { pre: "الحَارِسُ", h: "أَمَامَ المَرْمَى.", a: [4, 1], tr: "Kaleci kalenin önünde duruyor." },
      { pre: "نَحْنُ بِحَاجَةٍ إِلَى طَالِبٍ", h: ".", a: [5], tr: "Başarılı bir öğrenciye ihtiyacımız var." },
      { pre: "هَلْ أَنْتَ", h: "بِالخَبَرِ يَا مُحَمَّدُ؟", a: [0], tr: "Haberi biliyor musun Muhammed?" },
      { pre: "أَحْمَدُ", h: "الكِتَابَ فِي المَكْتَبَةِ.", a: [3], tr: "Ahmed kütüphanede kitabı okuyor." },
      { pre: "مَحْمُودٌ", h: "مِنْ أَنْقَرَةَ.", a: [2], tr: "Mahmud Ankara'dan geliyor." },
      { pre: "هَذَا رَجُلٌ", h: "عَلَى طَاعَةِ اللهِ.", a: [1, 4], tr: "Bu, Allah'a itaatte duran (sebat eden) bir adamdır." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · GAYR-İ SÜLÂSÎDEN İSM-İ FÂİL
{
  id: "u2", no: 2, ar: "اسْمُ الفَاعِلِ مِنْ غَيْرِ الثُّلَاثِيِّ", tr: "Gayr-i Sülâsîden İsm-i Fâil", short: "Fâil (gayr-i sülâsî)", col: "mi", legend: ["mz", "cerr"],
  goals: ["Üç harften fazla fiilden ism-i fâil yapmak: يُعَلِّمُ ← مُعَلِّمٌ", "Muzâri harfini damme alan مُـ ile değiştirmek, sondan önceki harfe kesre vermek", "Bir cümlede fiil yerine ism-i fâil kullanmak"],
  examples: [
    { s: "أَنَا:- / مُسَافِرٌ:mz.سَافَرَ / إِلَى الجَزَائِرِ:-", tr: "Ben Cezayir'e yolculuk ediyorum." },
    { s: "هُوَ:- / مُدَرِّسٌ:mz.دَرَّسَ / فِي الكُلِّيَّةِ:-", tr: "O fakültede öğretmendir." },
    { s: "يُعَلِّمُ:cerr / ←:- / مُعَلِّمٌ:mz", tr: "öğretiyor → öğreten" },
    { s: "يَتَعَلَّمُ:cerr / ←:- / مُتَعَلِّمٌ:mz", tr: "öğreniyor → öğrenen" }
  ],
  rules: [
    { tr: "Üç harften fazla (gayr-i sülâsî) fiilin ism-i fâili <b>muzâriden</b> yapılır: muzâri harfi yerine <b>dammeli mim</b> (<span class=\"ar\">مُـ</span>) gelir, <b>sondan önceki harf kesre</b> alır." },
    { tr: "Örnekler:", ex: ["أَحْسَنَ – يُحْسِنُ – مُحْسِنٌ", "أَكْرَمَ – يُكْرِمُ – مُكْرِمٌ", "عَلَّمَ – يُعَلِّمُ – مُعَلِّمٌ", "دَرَّسَ – يُدَرِّسُ – مُدَرِّسٌ", "جَاهَدَ – يُجَاهِدُ – مُجَاهِدٌ", "سَافَرَ – يُسَافِرُ – مُسَافِرٌ"] },
    { tr: "<span class=\"ar\">تَـ</span> ile başlayan fiillerde muzâride fetha olan harf kesreye döner.", ex: ["تَعَلَّمَ – يَتَعَلَّمُ – مُتَعَلِّمٌ", "تَقَدَّمَ – يَتَقَدَّمُ – مُتَقَدِّمٌ"] },
    { tr: "Kolay yol: muzâriyi söyle, baş harfi <span class=\"ar\">مُ</span> yap, sondan önceki harfe esre koy." },
    { tr: "Cümlede fiil yerine ism-i fâil gelebilir: <span class=\"ar\">يَذْهَبُ الطَّالِبُ ← الطَّالِبُ ذَاهِبٌ</span>." }
  ],
  kaide: ["يُشْتَقُّ اسْمُ الفَاعِلِ مِنْ غَيْرِ الثُّلَاثِيِّ عَلَى صُورَةِ الفِعْلِ المُضَارِعِ، بِإِبْدَالِ حَرْفِ المُضَارَعَةِ مِيمًا مَضْمُومَةً، وَكَسْرِ مَا قَبْلَ الآخِرِ، نَحْوُ: أَحْسَنَ – يُحْسِنُ – مُحْسِنٌ، أَكْرَمَ – يُكْرِمُ – مُكْرِمٌ، عَلَّمَ – يُعَلِّمُ – مُعَلِّمٌ، دَرَّسَ – يُدَرِّسُ – مُدَرِّسٌ، جَاهَدَ – يُجَاهِدُ – مُجَاهِدٌ، سَافَرَ – يُسَافِرُ – مُسَافِرٌ، تَعَلَّمَ – يَتَعَلَّمُ – مُتَعَلِّمٌ، تَقَدَّمَ – يَتَقَدَّمُ – مُتَقَدِّمٌ."],
  ex: [
    { type: "pick", extra: true, ar: "صُغِ اسْمَ الفَاعِلِ مِنْ غَيْرِ الثُّلَاثِيِّ", tr: "Muzâriden ism-i fâil yap: مُـ + sondan önceki harfte kesre.", items: [
      PK("أَحْسَنَ – يُحْسِنُ ←", ["مُحْسِنٌ", "مُحْسَنٌ", "حَاسِنٌ"], "iyilik eden", "مُـ + kesre: مُحْسِنٌ. مُحْسَنٌ (fetha) ism-i mef'ûl kalıbıdır.", 0),
      PK("عَلَّمَ – يُعَلِّمُ ←", ["مُعَلِّمٌ", "مُعَلَّمٌ", "عَالِمٌ"], "öğreten, öğretmen", "مُعَلِّمٌ. عَالِمٌ başka fiilden (عَلِمَ).", 1),
      PK("جَاهَدَ – يُجَاهِدُ ←", ["مُجَاهِدٌ", "مُجَاهَدٌ", "جَاهِدٌ"], "mücahit", "مُجَاهِدٌ.", 2),
      PK("تَقَدَّمَ – يَتَقَدَّمُ ←", ["مُتَقَدِّمٌ", "مُتَقَدَّمٌ", "مُقَدِّمٌ"], "ilerleyen", "تَـ kalır; dal kesre alır: مُتَقَدِّمٌ.", 0),
      PK("اسْتَمَعَ – يَسْتَمِعُ ←", ["مُسْتَمِعٌ", "مُسْتَمَعٌ", "سَامِعٌ"], "dinleyen", "مُسْتَمِعٌ.", 1),
      PK("أَرْسَلَ – يُرْسِلُ ←", ["مُرْسِلٌ", "مُرْسَلٌ", "رَاسِلٌ"], "gönderen", "مُرْسِلٌ.", 2)
    ]},
    { type: "pick", num: "٣", ar: "اذْكُرْ فِعْلَ كُلِّ اسْمِ فَاعِلٍ مِمَّا يَأْتِي", tr: "İsm-i fâil hangi fiilden?", items: [
      PK("ظَالِمٌ ←", ["ظَلَمَ", "أَظْلَمَ", "ظُلْمٌ"], "zalim", "فَاعِل kalıbı: sülâsî ظَلَمَ.", 0),
      PK("قَاتِلٌ ←", ["قَتَلَ", "قَاتَلَ", "قَتْلٌ"], "katil", "قَاتِلٌ sülâsî قَتَلَ'den. (قَاتَلَ'in ism-i fâili مُقَاتِلٌ olur.)", 1),
      PK("مُنَافِقٌ ←", ["نَافَقَ", "نَفَقَ", "أَنْفَقَ"], "münafık", "مُـ + kesre: نَافَقَ – يُنَافِقُ – مُنَافِقٌ.", 2),
      PK("مُحَاسِبٌ ←", ["حَاسَبَ", "حَسِبَ", "أَحْسَبَ"], "muhasebeci", "حَاسَبَ – يُحَاسِبُ – مُحَاسِبٌ.", 0),
      PK("مُحَافِظٌ ←", ["حَافَظَ", "حَفِظَ", "أَحْفَظَ"], "koruyan, vali", "حَافَظَ – يُحَافِظُ – مُحَافِظٌ. (حَفِظَ'den حَافِظٌ olur.)", 1)
    ]},
    { type: "combo", num: "٦", ar: "اسْتَبْدِلِ الفِعْلَ بِاسْمِ فَاعِلٍ فِي الجُمَلِ التَّالِيَةِ", tr: "İsmi başa al, fiil yerine ism-i fâil koy.", exHtml: "<span class=\"ar\">يَذْهَبُ الطَّالِبُ إِلَى المَدْرَسَةِ ← الطَّالِبُ ذَاهِبٌ إِلَى المَدْرَسَةِ.</span>", items: [
      CB("سَرَقَ اللِّصُّ أَمْوَالَ النَّاسِ.", ["اللِّصُّ", ["مَسْرُوقٌ", "سَارِقٌ", "سَرِقَةٌ"], "أَمْوَالَ النَّاسِ."], [1], "Hırsız insanların mallarını çalan biridir.", "سَرَقَ ← سَارِقٌ."),
      CB("غَرَسَ البُسْتَانِيُّ الشَّجَرَ.", ["البُسْتَانِيُّ", ["غَارِسٌ", "مَغْرُوسٌ", "غَرْسٌ"], "الشَّجَرَ."], [0], "Bahçıvan ağacı dikiyor.", "غَرَسَ ← غَارِسٌ."),
      CB("يُكْرِمُ الرَّجُلُ جِيرَانَهُ.", ["الرَّجُلُ", ["مُكْرَمٌ", "كَارِمٌ", "مُكْرِمٌ"], "جِيرَانَهُ."], [2], "Adam komşularına ikram ediyor.", "يُكْرِمُ ← مُكْرِمٌ (kesre). مُكْرَمٌ \"ikram edilen\" olur."),
      CB("قَدِمَ السَّائِحُ مِنَ الكُوَيْتِ.", ["السَّائِحُ", ["قَادِمٌ", "مَقْدُومٌ", "قَدِيمٌ"], "مِنَ الكُوَيْتِ."], [0], "Turist Kuveyt'ten geliyor.", "قَدِمَ ← قَادِمٌ."),
      CB("يَأْمُرُ المُسْلِمُ بِالمَعْرُوفِ.", ["المُسْلِمُ", ["مَأْمُورٌ", "آمِرٌ", "أَامِرٌ"], "بِالمَعْرُوفِ."], [1], "Müslüman iyiliği emreder.", "أَمَرَ ← آمِرٌ (hemze + elif = آ)."),
      CB("يَتْرُكُ المُؤْمِنُ الجَدَلَ.", ["المُؤْمِنُ", ["تَارِكٌ", "مَتْرُوكٌ", "مُتْرِكٌ"], "الجَدَلَ."], [0], "Mümin tartışmayı bırakır.", "تَرَكَ ← تَارِكٌ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · SÜLÂSÎDEN İSM-İ MEF'ÛL
{
  id: "u3", no: 3, ar: "اسْمُ المَفْعُولِ مِنَ الثُّلَاثِيِّ", tr: "Sülâsîden İsm-i Mef'ûl", short: "Mef'ûl (sülâsî)", col: "nasb", legend: ["nasb"],
  goals: ["İsm-i mef'ûlün işin üzerine düştüğü kişiyi ya da şeyi gösterdiğini bilmek", "Üç harfli fiilden مَفْعُول kalıbıyla ism-i mef'ûl yapmak: كَتَبَ ← مَكْتُوبٌ", "Cümlede ism-i mef'ûlü özneye uydurmak: البَابُ مَفْتُوحٌ، النَّوَافِذُ مُغْلَقَةٌ"],
  examples: [
    { s: "العُنْوَانُ:- / مَكْتُوبٌ:nasb.كَتَبَ / عَلَى الرِّسَالَةِ:-", tr: "Adres mektubun üzerine yazılmış." },
    { s: "الحَقِيبَةُ:- / مَحْفُوظَةٌ:nasb.حَفِظَ / عِنْدَنَا:-", tr: "Çanta bizde saklanıyor (korunuyor)." },
    { s: "كَتَبَ:cerr / ←:- / كَاتِبٌ:mz / مَكْتُوبٌ:nasb", tr: "yazdı → yazan · yazılmış" },
    { s: "عَلِمَ:cerr / ←:- / عَالِمٌ:mz / مَعْلُومٌ:nasb", tr: "bildi → bilen · bilinen" }
  ],
  rules: [
    { tr: "<b class=\"r-nasb\">İsm-i mef'ûl</b>, işin üzerine düştüğü kişiyi ya da şeyi gösterir: <span class=\"ar\">مَكْتُوبٌ</span> yazılmış (şey)." },
    { tr: "Üç harfli fiilden <span class=\"ar\">مَفْعُول</span> kalıbıyla yapılır: başa <b>مَـ</b>, birinci harf sakin, ikinci harf <b>damme</b> ve ardından <b>و</b>.", ex: ["كَتَبَ ← مَكْتُوبٌ", "عَلِمَ ← مَعْلُومٌ", "عَصَمَ ← مَعْصُومٌ", "فَتَحَ ← مَفْتُوحٌ", "حَفِظَ ← مَحْفُوظٌ"] },
    { tr: "Hemzeli ve şeddeli fiiller:", ex: ["سَأَلَ ← مَسْؤُولٌ", "أَمَرَ ← مَأْمُورٌ", "قَرَأَ ← مَقْرُوءٌ", "سَرَّ ← مَسْرُورٌ", "وَعَدَ ← مَوْعُودٌ"] },
    { tr: "Haber olan ism-i mef'ûl mübtedâya uyar. İnsan dışı çoğul (<span class=\"ar\">النَّوَافِذُ، الأَبْوَابُ</span>) müennes tekil haber alır.", ex: ["البَابُ مَفْتُوحٌ", "الأَبْوَابُ مَفْتُوحَةٌ"] },
    { tr: "Tasrif: <span class=\"ar\">مَكْتُوبٌ، مَكْتُوبَانِ، مَكْتُوبُونَ · مَكْتُوبَةٌ، مَكْتُوبَتَانِ، مَكْتُوبَاتٌ</span>." }
  ],
  kaide: [
    "اسْمُ المَفْعُولِ: اسْمٌ مَصُوغٌ لِلدَّلَالَةِ عَلَى مَنْ وَقَعَ عَلَيْهِ الفِعْلُ.",
    "وَيَأْتِي اسْمُ المَفْعُولِ مِنَ الفِعْلِ الثُّلَاثِيِّ عَلَى وَزْنِ: مَفْعُول، نَحْوُ: كَتَبَ – مَكْتُوبٌ، عَلِمَ – مَعْلُومٌ، عَصَمَ – مَعْصُومٌ، فَتَحَ – مَفْتُوحٌ، حَفِظَ – مَحْفُوظٌ، سَأَلَ – مَسْؤُولٌ، أَمَرَ – مَأْمُورٌ، قَرَأَ – مَقْرُوءٌ، سَرَّ – مَسْرُورٌ، وَعَدَ – مَوْعُودٌ.",
    "تَصْرِيفُ اسْمِ المَفْعُولِ: المُذَكَّرُ: مَكْتُوبٌ، مَكْتُوبَانِ، مَكْتُوبُونَ. المُؤَنَّثُ: مَكْتُوبَةٌ، مَكْتُوبَتَانِ، مَكْتُوبَاتٌ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنِ اسْمَ المَفْعُولِ فِيمَا يَلِي ثُمَّ اذْكُرْ فِعْلَهُ", tr: "İsm-i mef'ûle dokun; açıklamada fiilini gör. Dikkat: ism-i fâiller (القَاضِي، رَاعٍ) ve مَـ ile başlayan başka isimler (مَغْفِرَةٌ، المَحْكَمَةِ) tuzak.", items: [
      W("﴿قَوْلٌ [مَعْرُوفٌ] وَمَغْفِرَةٌ خَيْرٌ مِنْ صَدَقَةٍ يَتْبَعُهَا أَذًى﴾", "Güzel bir söz ve bağışlama, arkasından eziyet gelen sadakadan hayırlıdır. (Bakara 2/263)", "مَعْرُوفٌ ← عَرَفَ. مَغْفِرَةٌ masdardır (مَفْعِلَة), ism-i mef'ûl değil."),
      W("﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى المُؤْمِنِينَ كِتَابًا [مَوْقُوتًا]﴾", "Namaz müminler üzerine vakitleri belirlenmiş bir farzdır. (Nisâ 4/103)", "مَوْقُوتٌ ← وَقَتَ. المُؤْمِنِينَ ism-i fâildir."),
      W("هَذَا الحَدِيثُ [مَشْهُورٌ] عِنْدَ العُلَمَاءِ.", "Bu hadis âlimler katında meşhurdur.", "مَشْهُورٌ ← شَهَرَ."),
      W("[المَظْلُومُ] فِي المَحْكَمَةِ.", "Mazlum mahkemededir.", "مَظْلُومٌ ← ظَلَمَ. المَحْكَمَةُ yer ismidir."),
      W("الطَّالِبُ [مُهَذَّبٌ].", "Öğrenci terbiyelidir.", "مُهَذَّبٌ ← هَذَّبَ (gayr-i sülâsî: مُـ + fetha). الطَّالِبُ ism-i fâildir."),
      W("حُكْمُ القَاضِي [مَقْبُولٌ].", "Hâkimin hükmü kabul edilmiştir.", "مَقْبُولٌ ← قَبِلَ. القَاضِي ism-i fâildir."),
      W("الفَرِيقُ [مَهْزُومٌ].", "Takım yenilmiş.", "مَهْزُومٌ ← هَزَمَ."),
      W("البَابُ [مُغْلَقٌ].", "Kapı kapalı.", "مُغْلَقٌ ← أَغْلَقَ (gayr-i sülâsî)."),
      W("العُذْرُ عِنْدَ كِرَامِ النَّاسِ [مَقْبُولٌ].", "Özür, cömert insanlar katında kabul edilir.", "مَقْبُولٌ ← قَبِلَ."),
      W("قَالَ ﷺ: كُلُّكُمْ رَاعٍ وَكُلُّكُمْ [مَسْؤُولٌ] عَنْ رَعِيَّتِهِ.", "Hepiniz çobansınız ve hepiniz sürünüzden sorumlusunuz.", "مَسْؤُولٌ ← سَأَلَ. رَاعٍ ism-i fâildir (رَعَى).")
    ]},
    { type: "pick", num: "٢", ar: "ضَعِ اسْمَ المَفْعُولِ مِنَ الأَفْعَالِ التَّالِيَةِ", tr: "Fiilden ism-i mef'ûl yap: مَفْعُول kalıbı.", items: [
      PK("حَمِدَ ←", ["مَحْمُودٌ", "حَامِدٌ", "حَمْدٌ"], "övülmüş", "مَفْعُول: مَحْمُودٌ.", 2),
      PK("حَكَمَ ←", ["مَحْكُومٌ", "حَاكِمٌ", "مَحْكَمَةٌ"], "hükmedilen", "مَحْكُومٌ.", 0),
      PK("رَحِمَ ←", ["مَرْحُومٌ", "رَاحِمٌ", "رَحْمَةٌ"], "merhum", "مَرْحُومٌ.", 1),
      PK("شَغَلَ ←", ["مَشْغُولٌ", "شَاغِلٌ", "شُغْلٌ"], "meşgul", "مَشْغُولٌ.", 2),
      PK("غَلَبَ ←", ["مَغْلُوبٌ", "غَالِبٌ", "غَلَبَةٌ"], "mağlup", "مَغْلُوبٌ.", 0)
    ]},
    { type: "pick", num: "٣", ar: "اذْكُرْ فِعْلَ كُلِّ اسْمِ مَفْعُولٍ مِمَّا يَأْتِي", tr: "İsm-i mef'ûl hangi fiilden? مَـ ve و'yu çıkar, kalan üç harfe bak.", items: [
      PK("مَجْهُولٌ ←", ["جَهِلَ", "جَهْلٌ", "أَجْهَلَ"], "bilinmeyen", "جَ هِ لَ.", 1),
      PK("مَقْتُولٌ ←", ["قَتَلَ", "قَاتَلَ", "قَتْلٌ"], "öldürülmüş", "قَتَلَ.", 0),
      PK("مَعْبُودٌ ←", ["عَبَدَ", "عِبَادَةٌ", "عَبْدٌ"], "ibadet edilen", "عَبَدَ.", 2),
      PK("مَذْكُورٌ ←", ["ذَكَرَ", "ذِكْرٌ", "ذَاكَرَ"], "anılan", "ذَكَرَ.", 1),
      PK("مَشْرُوبٌ ←", ["شَرِبَ", "شُرْبٌ", "شَارِبٌ"], "içecek", "شَرِبَ.", 0)
    ]},
    { type: "combo", num: "٤", ar: "امْلَأِ الفَرَاغَ كَمَا فِي المِثَالِ", tr: "Cümleyi ism-i mef'ûlle yeniden kur. Haber mübtedâya uysun: insan dışı çoğul → müennes tekil.", exHtml: "<span class=\"ar\">فَتَحْتُ البَابَ ← البَابُ مَفْتُوحٌ.</span>", items: [
      CB("شَرِبْتُ الحَلِيبَ.", ["الحَلِيبُ", ["شَارِبٌ", "مَشْرُوبٌ", "مَشْرُوبَةٌ"]], [1], "Süt içildi.", "الحَلِيبُ müzekker: مَشْرُوبٌ. شَارِبٌ \"içen\" olur."),
      CB("فَقَدْتُ النُّقُودَ.", ["النُّقُودُ", ["مَفْقُودَةٌ", "مَفْقُودٌ", "فَاقِدَةٌ"]], [0], "Paralar kayıp.", "İnsan dışı çoğul: مَفْقُودَةٌ."),
      CB("فَهِمْتُ الكَلَامَ.", ["الكَلَامُ", ["فَاهِمٌ", "مَفْهُومَةٌ", "مَفْهُومٌ"]], [2], "Söz anlaşıldı.", "مَفْهُومٌ."),
      CB("سَمِعْتُ الصَّوْتَ.", ["الصَّوْتُ", ["مَسْمُوعٌ", "سَامِعٌ", "مَسْمُوعَةٌ"]], [0], "Ses duyuldu.", "مَسْمُوعٌ."),
      CB("كَسَرْتُ الطَّاوِلَةَ.", ["الطَّاوِلَةُ", ["مَكْسُورٌ", "مَكْسُورَةٌ", "كَاسِرَةٌ"]], [1], "Masa kırık.", "الطَّاوِلَةُ müennes: مَكْسُورَةٌ."),
      CB("فَتَحْتُ الأَبْوَابَ.", ["الأَبْوَابُ", ["مَفْتُوحُونَ", "مَفْتُوحٌ", "مَفْتُوحَةٌ"]], [2], "Kapılar açık.", "İnsan dışı çoğul: مَفْتُوحَةٌ. مَفْتُوحُونَ yalnız insanlar için."),
      CB("أَغْلَقْتُ النَّوَافِذَ.", ["النَّوَافِذُ", ["مُغْلَقَةٌ", "مَغْلُوقَةٌ", "مُغْلِقَةٌ"]], [0], "Pencereler kapalı.", "أَغْلَقَ gayr-i sülâsî: مُـ + fetha → مُغْلَقَةٌ. مُغْلِقَةٌ (kesre) \"kapatan\" olur."),
      CB("مَدَحْتُ الأُسْتَاذَ.", ["الأُسْتَاذُ", ["مَادِحٌ", "مَمْدُوحٌ", "مَمْدُوحَةٌ"]], [1], "Hoca övüldü.", "مَمْدُوحٌ."),
      CB("أَكَلْتُ التُّفَّاحَةَ.", ["التُّفَّاحَةُ", ["مَأْكُولٌ", "آكِلَةٌ", "مَأْكُولَةٌ"]], [2], "Elma yenmiş.", "Müennes: مَأْكُولَةٌ."),
      CB("كَنَسْتُ الغُرَفَ.", ["الغُرَفُ", ["مَكْنُوسَةٌ", "مَكْنُوسُونَ", "كَانِسَةٌ"]], [0], "Odalar süpürülmüş.", "İnsan dışı çoğul: مَكْنُوسَةٌ."),
      CB("كَسَرْتُ الزُّجَاجَ.", ["الزُّجَاجُ", ["مَكْسُورَةٌ", "مَكْسُورٌ", "كَاسِرٌ"]], [1], "Cam kırık.", "الزُّجَاجُ müzekker: مَكْسُورٌ."),
      CB("فَهِمْتُ المَسْأَلَةَ.", ["المَسْأَلَةُ", ["مَفْهُومٌ", "فَاهِمَةٌ", "مَفْهُومَةٌ"]], [2], "Mesele anlaşıldı.", "Müennes: مَفْهُومَةٌ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · GAYR-İ SÜLÂSÎDEN İSM-İ MEF'ÛL VE FARK
{
  id: "u4", no: 4, ar: "اسْمُ المَفْعُولِ مِنْ غَيْرِ الثُّلَاثِيِّ", tr: "Gayr-i Sülâsîden İsm-i Mef'ûl", short: "Mef'ûl (gayr-i sülâsî)", col: "cerr", legend: ["mz", "nasb"],
  goals: ["Üç harften fazla fiilden ism-i mef'ûl yapmak: يُرْسِلُ ← مُرْسَلٌ", "مُعَلِّمٌ (öğreten) ile مُعَلَّمٌ (öğretilen) farkını sondan önceki harekeden görmek", "İsm-i fâil ve ism-i mef'ûlü tekil, ikil ve çoğul çekmek"],
  examples: [
    { s: "الأَقْلَامُ:- / مُكَسَّرَةٌ:nasb.كَسَّرَ", tr: "Kalemler kırık." },
    { s: "البَابُ:- / مُغْلَقٌ:nasb.أَغْلَقَ", tr: "Kapı kapalı." },
    { s: "مُعَلِّمٌ:mz.öğreten", tr: "Kesre: işi yapan.", pair: "مُعَلَّمٌ:nasb.öğretilen", pairTr: "Fetha: işe uğrayan." },
    { s: "مُرْسِلٌ:mz.gönderen", tr: "Mektubu gönderen.", pair: "مُرْسَلٌ:nasb.gönderilen", pairTr: "Gönderilen (resul)." }
  ],
  rules: [
    { tr: "Gayr-i sülâsîden ism-i mef'ûl de muzâriden yapılır: muzâri harfi yerine <b>مُـ</b>, ama sondan önceki harf <b>fetha</b> alır." },
    { tr: "Örnekler:", ex: ["أَرْسَلَ – يُرْسِلُ – مُرْسَلٌ", "أَكْرَمَ – يُكْرِمُ – مُكْرَمٌ", "عَلَّمَ – يُعَلِّمُ – مُعَلَّمٌ", "دَرَّسَ – يُدَرِّسُ – مُدَرَّسٌ", "خَاطَبَ – يُخَاطِبُ – مُخَاطَبٌ", "طَالَبَ – يُطَالِبُ – مُطَالَبٌ"] },
    { tr: "İsm-i fâil ile ism-i mef'ûlün farkı <b>tek harekedir</b>: kesre <b class=\"r-mz\">fâil</b>, fetha <b class=\"r-nasb\">mef'ûl</b>.", ex: ["مُكْرِمٌ ↔ مُكْرَمٌ", "مُخَاطِبٌ ↔ مُخَاطَبٌ"] },
    { tr: "Geçişsiz fiillerin ism-i mef'ûlü genelde kullanılmaz: <span class=\"ar\">جَالِسٌ، ذَاهِبٌ، مُسَافِرٌ</span> var; \"oturulmuş\" yok." }
  ],
  kaide: ["يُشْتَقُّ اسْمُ المَفْعُولِ مِنْ غَيْرِ الثُّلَاثِيِّ عَلَى صُورَةِ الفِعْلِ المُضَارِعِ، بِإِبْدَالِ حَرْفِ المُضَارَعَةِ مِيمًا مَضْمُومَةً، وَفَتْحِ مَا قَبْلَ الآخِرِ، نَحْوُ: أَرْسَلَ – يُرْسِلُ – مُرْسَلٌ، أَكْرَمَ – يُكْرِمُ – مُكْرَمٌ، عَلَّمَ – يُعَلِّمُ – مُعَلَّمٌ، دَرَّسَ – يُدَرِّسُ – مُدَرَّسٌ، خَاطَبَ – يُخَاطِبُ – مُخَاطَبٌ، طَالَبَ – يُطَالِبُ – مُطَالَبٌ."],
  ex: [
    { type: "pick", extra: true, ar: "صُغِ اسْمَ المَفْعُولِ مِنْ غَيْرِ الثُّلَاثِيِّ", tr: "Muzâriden ism-i mef'ûl yap: مُـ + sondan önceki harfte fetha.", items: [
      PK("أَرْسَلَ – يُرْسِلُ ←", ["مُرْسَلٌ", "مُرْسِلٌ", "مَرْسُولٌ"], "gönderilen", "مُـ + fetha: مُرْسَلٌ.", 1),
      PK("أَكْرَمَ – يُكْرِمُ ←", ["مُكْرَمٌ", "مُكْرِمٌ", "مَكْرُومٌ"], "ikram edilen", "مُكْرَمٌ.", 0),
      PK("دَرَّسَ – يُدَرِّسُ ←", ["مُدَرَّسٌ", "مُدَرِّسٌ", "مَدْرُوسٌ"], "okutulan", "مُدَرَّسٌ. (مَدْرُوسٌ sülâsî دَرَسَ'ten.)", 2),
      PK("خَاطَبَ – يُخَاطِبُ ←", ["مُخَاطَبٌ", "مُخَاطِبٌ", "مَخْطُوبٌ"], "muhatap", "مُخَاطَبٌ.", 0),
      PK("هَذَّبَ – يُهَذِّبُ ←", ["مُهَذَّبٌ", "مُهَذِّبٌ", "مَهْذُوبٌ"], "terbiyeli", "مُهَذَّبٌ.", 1),
      PK("كَسَّرَ – يُكَسِّرُ ←", ["مُكَسَّرٌ", "مُكَسِّرٌ", "مَكْسُورٌ"], "paramparça", "مُكَسَّرٌ. (مَكْسُورٌ sülâsî كَسَرَ'den.)", 2)
    ]},
    { type: "classify", extra: true, opts: FM_OPTS, ar: "اسْمُ فَاعِلٍ أَمِ اسْمُ مَفْعُولٍ؟", tr: "Kelime ism-i fâil mi, ism-i mef'ûl mü? Sondan önceki harfe bak: kesre mi, fetha mı?", items: [
      { s: "مُعَلِّمٌ", a: "f", why: "Kesre: öğreten." },
      { s: "مُعَلَّمٌ", a: "m", why: "Fetha: öğretilmiş." },
      { s: "مُرْسَلٌ", a: "m", why: "Fetha: gönderilen." },
      { s: "مُكْرِمٌ", a: "f", why: "Kesre: ikram eden." },
      { s: "مَحْفُوظٌ", a: "m", why: "مَفْعُول kalıbı." },
      { s: "سَائِلٌ", a: "f", why: "فَاعِل kalıbı (سَأَلَ)." },
      { s: "مُخَاطَبٌ", a: "m", why: "Fetha." },
      { s: "مُسْتَمِعٌ", a: "f", why: "Kesre." },
      { s: "مَدْرَسَةٌ", a: "n", why: "Yer ismi (okul); مَفْعُول kalıbında değil, و yok." },
      { s: "مُتَعَلِّمٌ", a: "f", why: "Kesre." },
      { s: "كِتَابٌ", a: "n", why: "Ne فَاعِل ne مَفْعُول kalıbında." },
      { s: "مُطَالَبٌ", a: "m", why: "Fetha." }
    ]},
    { type: "pick", extra: true, ar: "صَرِّفْ اسْمَ الفَاعِلِ وَاسْمَ المَفْعُولِ", tr: "Tasrif: istenen şekli seç.", items: [
      PK("كَاتِبٌ ← müennes çoğul", ["كَاتِبَاتٌ", "كَاتِبُونَ", "كَاتِبَتَانِ"], "yazan kadınlar", "ـَاتٌ.", 0),
      PK("مُعَلِّمٌ ← müzekker çoğul", ["مُعَلِّمُونَ", "مُعَلِّمَاتٌ", "مُعَلِّمَانِ"], "öğretmenler", "ـُونَ.", 1),
      PK("مَكْتُوبٌ ← müennes ikil", ["مَكْتُوبَتَانِ", "مَكْتُوبَانِ", "مَكْتُوبَاتٌ"], "yazılmış iki (şey)", "ـَتَانِ.", 2),
      PK("مُسَافِرٌ ← müzekker ikil", ["مُسَافِرَانِ", "مُسَافِرُونَ", "مُسَافِرَتَانِ"], "iki yolcu", "ـَانِ.", 0),
      PK("مَحْفُوظٌ ← müennes tekil", ["مَحْفُوظَةٌ", "مَحْفُوظَاتٌ", "حَافِظَةٌ"], "korunmuş (kadın/şey)", "ـَةٌ.", 1),
      PK("مُرْسَلٌ ← müzekker çoğul", ["مُرْسَلُونَ", "مُرْسِلُونَ", "مُرْسَلَاتٌ"], "gönderilenler (resuller)", "Fetha korunur: مُرْسَلُونَ. مُرْسِلُونَ \"gönderenler\" olur.", 2)
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: المِهَنُ · خَالِدٌ وَأَصْدِقَاؤُهُ", tr: "Okuma: Meslekler ve Hâlid", short: "Okuma", col: "muz", legend: ["mz", "nasb"],
  goals: ["Bir metindeki ism-i fâilleri bulup sülâsî ve gayr-i sülâsî diye ayırmak", "Bir metindeki ism-i mef'ûlleri bulmak", "مَـ ile başlayan her kelimenin ism-i mef'ûl olmadığını görmek: مَطْعَمٌ، مَقْهًى"],
  examples: [
    { s: "الكَاتِبُ:mz.كَتَبَ / وَالتَّاجِرُ:mz.تَجَرَ / وَالسَّائِقُ:mz.سَاقَ", tr: "Yazar, tüccar ve şoför." },
    { s: "المُدَرِّسُ:mz.دَرَّسَ / وَالمُحَاسِبُ:mz.حَاسَبَ / وَالمُتَرْجِمُ:mz.تَرْجَمَ", tr: "Öğretmen, muhasebeci ve tercüman." },
    { s: "الدَّجَاجَ:- / المَسْلُوقَ:nasb.سَلَقَ / وَاللَّحْمَ:- / المَشْوِيَّ:nasb.شَوَى", tr: "Haşlanmış tavuk ve kızarmış et." }
  ],
  rules: [
    { tr: "Meslek adlarının çoğu ism-i fâildir: <span class=\"ar\">كَاتِبٌ، تَاجِرٌ، عَامِلٌ</span> (sülâsî); <span class=\"ar\">مُدَرِّسٌ، مُحَاسِبٌ، مُهَنْدِسٌ</span> (gayr-i sülâsî)." },
    { tr: "Ama hepsi değil: <span class=\"ar\">طَبِيبٌ</span> (فَعِيل), <span class=\"ar\">بَقَّالٌ</span> (فَعَّال), <span class=\"ar\">شُرْطِيٌّ</span> (nisbe) ism-i fâil kalıbında değildir." },
    { tr: "Yiyecek ve içecekler çoğu zaman ism-i mef'ûldür: <span class=\"ar\">مَأْكُولَاتٌ</span> (yenilenler), <span class=\"ar\">مَشْرُوبَاتٌ</span> (içilenler), <span class=\"ar\">مَسْلُوقٌ</span> (haşlanmış)." },
    { tr: "<span class=\"ar\">مَطْعَمٌ، مَقْهًى</span> yer isimleridir; <span class=\"ar\">مُمْتِعٌ</span> (eğlendiren) ism-i fâildir. Kalıba bak: مَفْعُول ya da مُـ + fetha." }
  ],
  kaide: ["اسْتَخْرِجْ مِنَ النَّصِّ اسْمَ الفَاعِلِ مِنَ الفِعْلِ الثُّلَاثِيِّ وَغَيْرِهِ، وَاسْمَ المَفْعُولِ."],
  ex: [
    { type: "reading", num: "٧", ar: "اقْرَأِ النَّصَّ التَّالِيَ وَاسْتَخْرِجْ مِنْهُ اسْمَ الفَاعِلِ مِنَ الفِعْلِ الثُّلَاثِيِّ وَغَيْرِهِ", tr: "Metni oku, sonra aşağıdaki kelimeleri sınıflandır.", title: "المِهَنُ",
      text: "المِهَنُ مُخْتَلِفَةٌ وَمُتَنَوِّعَةٌ، كُلُّهَا مُحْتَرَمَةٌ، وَكُلُّهَا تَأْتِي نَتِيجَةَ احْتِيَاجَاتِ الحَيَاةِ. المُهَنْدِسُ لَهُ وَظِيفَةٌ، وَالمُدَرِّسُ لَهُ وَظِيفَةٌ، وَالمُحَامِي لَهُ وَظِيفَةٌ فِي المُجْتَمَعِ، وَكَذَلِكَ الطَّبِيبُ وَالمُمَرِّضَةُ وَالكَاتِبُ، وَالتَّاجِرُ، وَالنَّاشِرُ، وَالعَامِلُ، وَالسَّائِقُ، وَالمُحَاسِبُ، وَالبَقَّالُ، وَالشُّرْطِيُّ، وَالمُزَارِعُ، وَالمُصَوِّرُ، وَالمُحَلِّلُ السِّيَاسِيُّ، وَمُخَطِّطُ المُدُنِ، وَالمُتَرْجِمُ، وَمُطَوِّرُ المَوَاقِعِ الإِلِكْتِرُونِيَّةِ، وَمُطَوِّرُ بَرَامِجِ الحَاسُوبِ... إِلَخْ، كُلُّهُمْ مُتَعَاوِنُونَ عَلَى تَسْهِيلِ حَيَاةِ الإِنْسَانِ. وَأَشَارَ القُرْآنُ الكَرِيمُ إِلَى هَذِهِ الحَقِيقَةِ قَائِلًا: ﴿أَهُمْ يَقْسِمُونَ رَحْمَتَ رَبِّكَ نَحْنُ قَسَمْنَا بَيْنَهُمْ مَعِيشَتَهُمْ فِي الحَيَاةِ الدُّنْيَا وَرَفَعْنَا بَعْضَهُمْ فَوْقَ بَعْضٍ دَرَجَاتٍ لِيَتَّخِذَ بَعْضُهُمْ بَعْضًا سُخْرِيًّا وَرَحْمَتُ رَبِّكَ خَيْرٌ مِمَّا يَجْمَعُونَ﴾ (الزخرف 43/32).",
      textTr: "Meslekler. Meslekler farklı ve çeşitlidir; hepsi saygındır ve hepsi hayatın ihtiyaçlarının sonucu olarak ortaya çıkar. Mühendisin bir görevi vardır, öğretmenin bir görevi vardır, avukatın toplumda bir görevi vardır; doktor, hemşire, yazar, tüccar, yayıncı, işçi, şoför, muhasebeci, bakkal, polis, çiftçi, fotoğrafçı, siyasi analist, şehir plancısı, tercüman, web sitesi geliştiricisi, bilgisayar programı geliştiricisi de öyle... Hepsi insan hayatını kolaylaştırmak için yardımlaşır. Kur'an-ı Kerim bu gerçeğe şöyle işaret eder: \"Rabbinin rahmetini onlar mı paylaştırıyor? Dünya hayatında geçimliklerini aralarında biz paylaştırdık ve birbirlerini çalıştırsınlar diye kimini kimine derecelerle üstün kıldık. Rabbinin rahmeti onların topladıklarından daha hayırlıdır.\" (Zuhruf 43/32)",
      qa: [
        { q: "هَلِ المِهَنُ مُخْتَلِفَةٌ؟", a: "نَعَمْ، المِهَنُ مُخْتَلِفَةٌ وَمُتَنَوِّعَةٌ، وَكُلُّهَا مُحْتَرَمَةٌ.", tr: "Meslekler farklı mıdır? Evet, farklı ve çeşitlidir; hepsi saygındır." },
        { q: "عَلَى مَاذَا يَتَعَاوَنُ أَصْحَابُ المِهَنِ؟", a: "يَتَعَاوَنُونَ عَلَى تَسْهِيلِ حَيَاةِ الإِنْسَانِ.", tr: "Meslek sahipleri ne için yardımlaşır? İnsan hayatını kolaylaştırmak için." }
      ],
      cls: { opts: SG_OPTS, ar: "اسْمُ الفَاعِلِ مِنَ الثُّلَاثِيِّ وَغَيْرِهِ", tr: "Bu kelime sülâsîden mi, gayr-i sülâsîden mi ism-i fâil? Yoksa ism-i fâil değil mi?", items: [
        { s: "الكَاتِبُ", a: "s", why: "فَاعِل: كَتَبَ." },
        { s: "التَّاجِرُ", a: "s", why: "فَاعِل: تَجَرَ." },
        { s: "النَّاشِرُ", a: "s", why: "فَاعِل: نَشَرَ." },
        { s: "العَامِلُ", a: "s", why: "فَاعِل: عَمِلَ." },
        { s: "السَّائِقُ", a: "s", why: "فَاعِل: سَاقَ (ortası elif → ـائِـ)." },
        { s: "قَائِلًا", a: "s", why: "فَاعِل: قَالَ." },
        { s: "المُدَرِّسُ", a: "g", why: "مُـ + kesre: دَرَّسَ." },
        { s: "المُهَنْدِسُ", a: "g", why: "مُـ + kesre: هَنْدَسَ (dört harfli)." },
        { s: "المُحَامِي", a: "g", why: "مُـ + kesre: حَامَى." },
        { s: "المُمَرِّضَةُ", a: "g", why: "مُـ + kesre: مَرَّضَ." },
        { s: "المُحَاسِبُ", a: "g", why: "حَاسَبَ." },
        { s: "المُتَرْجِمُ", a: "g", why: "تَرْجَمَ." },
        { s: "مُتَعَاوِنُونَ", a: "g", why: "تَعَاوَنَ – يَتَعَاوَنُ – مُتَعَاوِنٌ." },
        { s: "مُخْتَلِفَةٌ", a: "g", why: "اخْتَلَفَ – يَخْتَلِفُ – مُخْتَلِفٌ." },
        { s: "مُحْتَرَمَةٌ", a: "n", why: "Fetha: ism-i mef'ûl (saygı gösterilen)." },
        { s: "الطَّبِيبُ", a: "n", why: "فَعِيل kalıbı." },
        { s: "البَقَّالُ", a: "n", why: "فَعَّال kalıbı (meslek)." },
        { s: "الشُّرْطِيُّ", a: "n", why: "Nisbe ismi." }
      ]}
    },
    { type: "reading", num: "٨", ar: "اقْرَأِ النَّصَّ التَّالِيَ", tr: "Metni oku; sorulara bak. Ardından ism-i mef'ûlleri bul.", title: "خَالِدٌ وَأَصْدِقَاؤُهُ",
      text: "خَرَجَ خَالِدٌ فِي صَبَاحِ يَوْمِ الجُمُعَةِ لِيَشْتَرِيَ لِوَالِدَتِهِ لَوَازِمَ البَيْتِ. ذَهَبَ أَوَّلًا إِلَى سُوقِ العَطَّارِينَ فِي شَارِعِ الجَامِعَةِ، قَابَلَ هُنَاكَ أَصْدِقَاءَهُ وَذَهَبُوا جَمِيعًا إِلَى مَقْهَى الصَّدَاقَةِ. هُنَاكَ اتَّصَلَ بِوَالِدَتِهِ وَأَخْبَرَهَا بِأَنَّهُ سَيَجْلِسُ مَعَ أَصْدِقَائِهِ بَعْضَ الوَقْتِ. تَحَدَّثَ الأَصْدِقَاءُ طَوِيلًا وَشَرِبُوا القَهْوَةَ التُّرْكِيَّةَ. ثُمَّ ذَهَبُوا إِلَى مَطْعَمٍ قَرِيبٍ لِيَتَنَاوَلُوا مَعًا طَعَامَ الغَدَاءِ. طَلَبُوا بَعْضَ المَأْكُولَاتِ وَالمَشْرُوبَاتِ التَّقْلِيدِيَّةِ. أَكَلُوا الدَّجَاجَ المَسْلُوقَ وَاللَّحْمَ المَشْوِيَّ مَعَ البَطَاطِسِ المَقْلِيَّةِ، وَبَعْدَ الطَّعَامِ شَرِبُوا المُرَطِّبَاتِ اللَّذِيذَةَ المَعْمُولَةَ مِنْ عَصِيرِ اللَّيْمُونِ وَالبُرْتُقَالِ. قَضَى الأَصْدِقَاءُ وَقْتًا مُمْتِعًا ثُمَّ رَجَعَ خَالِدٌ إِلَى السُّوقِ وَاشْتَرَى الأَشْيَاءَ الَّتِي طَلَبَتْهَا مِنْهُ وَالِدَتُهُ.",
      textTr: "Hâlid ve Arkadaşları. Hâlid cuma sabahı annesine ev ihtiyaçlarını almak için çıktı. Önce Üniversite Caddesi'ndeki Aktarlar Çarşısı'na gitti; orada arkadaşlarıyla karşılaştı ve hep birlikte Dostluk Kahvesi'ne gittiler. Orada annesini aradı ve bir süre arkadaşlarıyla oturacağını haber verdi. Arkadaşlar uzun uzun sohbet edip Türk kahvesi içtiler. Sonra öğle yemeğini birlikte yemek için yakındaki bir lokantaya gittiler. Bazı geleneksel yiyecek ve içecekler istediler. Haşlanmış tavuk, kızarmış et ve kızarmış patates yediler; yemekten sonra limon ve portakal suyundan yapılmış lezzetli serinletici içecekler içtiler. Arkadaşlar keyifli bir vakit geçirdi; sonra Hâlid çarşıya döndü ve annesinin ondan istediği şeyleri aldı.",
      qa: [
        { q: "إِلَى أَيْنَ ذَهَبَ خَالِدٌ أَوَّلًا؟", a: "ذَهَبَ إِلَى سُوقِ العَطَّارِينَ فِي شَارِعِ الجَامِعَةِ.", tr: "Hâlid önce nereye gitti? Üniversite Caddesi'ndeki Aktarlar Çarşısı'na." },
        { q: "مَاذَا أَكَلَ الأَصْدِقَاءُ؟", a: "أَكَلُوا الدَّجَاجَ المَسْلُوقَ وَاللَّحْمَ المَشْوِيَّ مَعَ البَطَاطِسِ المَقْلِيَّةِ.", tr: "Arkadaşlar ne yedi? Haşlanmış tavuk, kızarmış et ve kızarmış patates." }
      ]
    },
    { type: "find", target: "y", num: "٨", ar: "اسْتَخْرِجْ مِنَ النَّصِّ اسْمَ المَفْعُولِ", tr: "İsm-i mef'ûllere dokun. Tuzaklar: مَقْهًى ve مَطْعَمٌ yer ismi; مُمْتِعًا ve المُرَطِّبَاتِ (kesre) ism-i fâil; الجَامِعَةِ ve العَطَّارِينَ başka kalıplar.", items: [
      W("ذَهَبَ أَوَّلًا إِلَى سُوقِ العَطَّارِينَ فِي شَارِعِ الجَامِعَةِ، قَابَلَ هُنَاكَ أَصْدِقَاءَهُ وَذَهَبُوا جَمِيعًا إِلَى مَقْهَى الصَّدَاقَةِ.", "Önce Aktarlar Çarşısı'na gitti; arkadaşlarıyla karşılaşıp Dostluk Kahvesi'ne gittiler.", "Bu cümlede ism-i mef'ûl yok."),
      W("ثُمَّ ذَهَبُوا إِلَى مَطْعَمٍ قَرِيبٍ لِيَتَنَاوَلُوا مَعًا طَعَامَ الغَدَاءِ.", "Sonra öğle yemeği için yakın bir lokantaya gittiler.", "Yok: مَطْعَمٌ yer ismidir."),
      W("طَلَبُوا بَعْضَ [المَأْكُولَاتِ] [وَالمَشْرُوبَاتِ] التَّقْلِيدِيَّةِ.", "Bazı geleneksel yiyecek ve içecekler istediler.", "مَأْكُولَاتٌ ← أَكَلَ; مَشْرُوبَاتٌ ← شَرِبَ (çoğul ism-i mef'ûl)."),
      W("أَكَلُوا الدَّجَاجَ [المَسْلُوقَ] وَاللَّحْمَ [المَشْوِيَّ] مَعَ البَطَاطِسِ [المَقْلِيَّةِ]،", "Haşlanmış tavuk, kızarmış et ve kızarmış patates yediler.", "مَسْلُوقٌ ← سَلَقَ; مَشْوِيٌّ ← شَوَى; مَقْلِيٌّ ← قَلَى (sonu ي olan fiillerde مَفْعُول → مَفْعِيّ)."),
      W("وَبَعْدَ الطَّعَامِ شَرِبُوا المُرَطِّبَاتِ اللَّذِيذَةَ [المَعْمُولَةَ] مِنْ عَصِيرِ اللَّيْمُونِ وَالبُرْتُقَالِ.", "Yemekten sonra limon ve portakal suyundan yapılmış lezzetli serinletici içecekler içtiler.", "مَعْمُولَةٌ ← عَمِلَ. المُرَطِّبَاتُ (kesre) \"serinletenler\": ism-i fâil."),
      W("قَضَى الأَصْدِقَاءُ وَقْتًا مُمْتِعًا ثُمَّ رَجَعَ خَالِدٌ إِلَى السُّوقِ.", "Arkadaşlar keyifli bir vakit geçirdi, sonra Hâlid çarşıya döndü.", "Yok: مُمْتِعٌ (kesre) ism-i fâildir (أَمْتَعَ).")
    ]}
  ]
}
];

// Doğru Kalıp oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var FM_POOL = [
  ["أَحْمَدُ {قَادِمٌ} مِنَ المَدِينَةِ.", ["قَادِمٌ", "مَقْدُومٌ", "قَدِيمٌ"], "gelen → فَاعِل", "Ahmed Medine'den geliyor.", "u1"],
  ["الأُسْتَاذُ {عَائِدٌ} بِالطَّائِرَةِ الآنَ.", ["عَائِدٌ", "عَاوِدٌ", "مَعُودٌ"], "ortası elif → ـائِـ", "Hoca şimdi uçakla dönüyor.", "u1"],
  ["زَيْدٌ {صَائِمٌ} اليَوْمَ.", ["صَائِمٌ", "صَاوِمٌ", "مَصُومٌ"], "صَامَ → صَائِمٌ", "Zeyd bugün oruçlu.", "u1"],
  ["الحَارِسُ {وَاقِفٌ} أَمَامَ البَابِ.", ["وَاقِفٌ", "مَوْقُوفٌ", "وَقِيفٌ"], "duran → فَاعِل", "Bekçi kapının önünde duruyor.", "u1"],
  ["﴿وَاللهُ {غَالِبٌ} عَلَى أَمْرِهِ﴾", ["غَالِبٌ", "مَغْلُوبٌ", "غَلَّابٌ"], "galip → فَاعِل", "Allah işinde galiptir.", "u1"],
  ["الدَّالُّ عَلَى الخَيْرِ {كَفَاعِلِهِ}.", ["كَفَاعِلِهِ", "كَمَفْعُولِهِ", "كَفِعْلِهِ"], "yapan → فَاعِل", "Hayra yol gösteren onu yapan gibidir.", "u1"],
  ["أَنَا {مُسَافِرٌ} إِلَى الجَزَائِرِ.", ["مُسَافِرٌ", "مُسَافَرٌ", "سَافِرٌ"], "مُـ + kesre", "Cezayir'e yolculuk ediyorum.", "u2"],
  ["هُوَ {مُدَرِّسٌ} فِي الكُلِّيَّةِ.", ["مُدَرِّسٌ", "مُدَرَّسٌ", "دَارِسٌ"], "ders veren → kesre", "O fakültede öğretmendir.", "u2"],
  ["كُنْ عَالِمًا أَوْ {مُتَعَلِّمًا}.", ["مُتَعَلِّمًا", "مُتَعَلَّمًا", "مُعَلَّمًا"], "öğrenen → kesre", "Âlim ol ya da öğrenen ol.", "u2"],
  ["الرَّجُلُ {مُكْرِمٌ} جِيرَانَهُ.", ["مُكْرِمٌ", "مُكْرَمٌ", "كَارِمٌ"], "ikram eden → kesre", "Adam komşularına ikram ediyor.", "u2"],
  ["﴿وَبَشِّرِ {المُؤْمِنِينَ}﴾", ["المُؤْمِنِينَ", "المُؤْمَنِينَ", "الآمِنِينَ"], "آمَنَ → مُؤْمِنٌ (kesre)", "Müminleri müjdele.", "u2"],
  ["العُنْوَانُ {مَكْتُوبٌ} عَلَى الرِّسَالَةِ.", ["مَكْتُوبٌ", "كَاتِبٌ", "مَكْتَبٌ"], "yazılmış → مَفْعُول", "Adres mektubun üzerine yazılmış.", "u3"],
  ["الحَقِيبَةُ {مَحْفُوظَةٌ} عِنْدَنَا.", ["مَحْفُوظَةٌ", "مَحْفُوظٌ", "حَافِظَةٌ"], "müennes mübtedâ → ـَةٌ", "Çanta bizde saklanıyor.", "u3"],
  ["الأَبْوَابُ {مَفْتُوحَةٌ}.", ["مَفْتُوحَةٌ", "مَفْتُوحُونَ", "فَاتِحَةٌ"], "insan dışı çoğul → müennes tekil", "Kapılar açık.", "u3"],
  ["هَذَا الحَدِيثُ {مَشْهُورٌ}.", ["مَشْهُورٌ", "شَاهِرٌ", "مَشْهَرٌ"], "bilinen → مَفْعُول", "Bu hadis meşhurdur.", "u3"],
  ["كُلُّكُمْ {مَسْؤُولٌ} عَنْ رَعِيَّتِهِ.", ["مَسْؤُولٌ", "سَائِلٌ", "مَسْأَلَةٌ"], "sorumlu → مَفْعُول (سَأَلَ)", "Hepiniz sürünüzden sorumlusunuz.", "u3"],
  ["الصَّوْتُ {مَسْمُوعٌ}.", ["مَسْمُوعٌ", "سَامِعٌ", "مَسْمُوعَةٌ"], "duyulan; الصَّوْتُ müzekker", "Ses duyuluyor.", "u3"],
  ["البَابُ {مُغْلَقٌ}.", ["مُغْلَقٌ", "مُغْلِقٌ", "مَغْلُوقٌ"], "kapalı → مُـ + fetha", "Kapı kapalı.", "u4"],
  ["الأَقْلَامُ {مُكَسَّرَةٌ}.", ["مُكَسَّرَةٌ", "مُكَسِّرَةٌ", "مُكَسَّرُونَ"], "kırılmış; insan dışı çoğul", "Kalemler kırık.", "u4"],
  ["الطَّالِبُ {مُهَذَّبٌ}.", ["مُهَذَّبٌ", "مُهَذِّبٌ", "مَهْذُوبٌ"], "terbiye edilmiş → fetha", "Öğrenci terbiyelidir.", "u4"],
  ["مُحَمَّدٌ ﷺ {مُرْسَلٌ} مِنْ عِنْدِ اللهِ.", ["مُرْسَلٌ", "مُرْسِلٌ", "رَاسِلٌ"], "gönderilen → fetha", "Muhammed (s.a.v.) Allah katından gönderilmiştir.", "u4"],
  ["الضَّيْفُ {مُكْرَمٌ} فِي بَيْتِنَا.", ["مُكْرَمٌ", "مُكْرِمٌ", "كَرِيمٌ"], "ikram edilen → fetha", "Misafir evimizde ağırlanır.", "u4"],
  ["طَلَبُوا بَعْضَ {المَأْكُولَاتِ}.", ["المَأْكُولَاتِ", "الآكِلَاتِ", "المَآكِلِ"], "yenilenler → مَفْعُول", "Bazı yiyecekler istediler.", "u5"],
  ["أَكَلُوا الدَّجَاجَ {المَسْلُوقَ}.", ["المَسْلُوقَ", "السَّالِقَ", "المَسْلَقَ"], "haşlanmış → مَفْعُول", "Haşlanmış tavuk yediler.", "u5"],
  ["قَضَوْا وَقْتًا {مُمْتِعًا}.", ["مُمْتِعًا", "مُمْتَعًا", "مَمْتُوعًا"], "eğlendiren → kesre (fâil)", "Keyifli bir vakit geçirdiler.", "u5"],
  ["المُهَنْدِسُ وَ{المُدَرِّسُ} لَهُمَا وَظِيفَةٌ.", ["المُدَرِّسُ", "المُدَرَّسُ", "الدَّارِسُ"], "meslek → ism-i fâil", "Mühendisin ve öğretmenin bir görevi var.", "u5"]
];
var HAFIZA = {
  fa: { name: "Fiil ↔ ism-i fâil", pairs: MV.filter(function (v) { return v[7] === "s"; }).slice(0, 12).map(function (v) { return [v[0], v[2]]; }) },
  me: { name: "Fiil ↔ ism-i mef'ûl", pairs: MV.filter(function (v) { return v[3]; }).slice(0, 12).map(function (v) { return [v[0], v[3]]; }) },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["كَاتِبٌ", "yazan"], ["مَكْتُوبٌ", "yazılmış"], ["مُعَلِّمٌ", "öğreten"], ["مُعَلَّمٌ", "öğretilmiş"], ["ظَالِمٌ", "zalim"], ["مَظْلُومٌ", "mazlum"], ["مُرْسِلٌ", "gönderen"], ["مُرْسَلٌ", "gönderilen"], ["غَالِبٌ", "galip"], ["مَغْلُوبٌ", "mağlup"], ["مُكْرِمٌ", "ikram eden"], ["مُكْرَمٌ", "ikram edilen"]] }
};
var KARTLAR = [
  ["İsm-i fâil neyi gösterir?", "İşi yapanı: كَاتِبٌ (yazan)."],
  ["İsm-i mef'ûl neyi gösterir?", "İşin üzerine düştüğünü: مَكْتُوبٌ (yazılmış)."],
  ["Sülâsîden ism-i fâil kalıbı?", "فَاعِل: كَتَبَ ← كَاتِبٌ"],
  ["Sülâsîden ism-i mef'ûl kalıbı?", "مَفْعُول: كَتَبَ ← مَكْتُوبٌ"],
  ["Gayr-i sülâsîden ism-i fâil?", "Muzâri harfi ← مُـ, sondan önceki harf kesre: يُعَلِّمُ ← مُعَلِّمٌ"],
  ["Gayr-i sülâsîden ism-i mef'ûl?", "Muzâri harfi ← مُـ, sondan önceki harf fetha: يُرْسِلُ ← مُرْسَلٌ"],
  ["مُعَلِّمٌ ile مُعَلَّمٌ farkı?", "Kesre: öğreten (fâil). Fetha: öğretilen (mef'ûl)."],
  ["قَالَ fiilinin ism-i fâili?", "قَائِلٌ: ortadaki elif hemzeye döner."],
  ["ضَلَّ fiilinin ism-i fâili?", "ضَالٌّ: şedde korunur."],
  ["Câmid ve müştak isim?", "Câmid başka kelimeden alınmamış (رَجُلٌ). Müştak alınmış (كَاتِبٌ، مَعْلُومٌ)."],
  ["İnsan dışı çoğulun haberi?", "Müennes tekil: الأَبْوَابُ مَفْتُوحَةٌ"],
  ["مَطْعَمٌ ism-i mef'ûl mü?", "Hayır, yer ismi. مَفْعُول kalıbında و vardır: مَطْعُومٌ olurdu."]
];
