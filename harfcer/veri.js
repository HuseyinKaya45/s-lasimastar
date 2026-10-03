// ================= VERİ: Harf-i Cerler (حُرُوفُ الجَرِّ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mi: { ar: "حَرْفُ جَرٍّ", tr: "Harf-i cer" }, cerr: { ar: "اسْمٌ مَجْرُورٌ", tr: "Mecrûr" },
  ref: { ar: "مَرْفُوعٌ", tr: "Merfû" }, nasb: { ar: "مَنْصُوبٌ", tr: "Mansûb" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cer", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var HAL_TR = { ref: "Merfû", nasb: "Mansûb", cer: "Mecrûr" };
var TUR_OPTS = HAL_OPTS;
// Hal sebebi (4. alıştırma)
var SEBEP = [["fa", "Fâil", "فَاعِلٌ"], ["mf", "Mef’ûl bih", "مَفْعُولٌ بِهِ"], ["hc", "Harf-i cerden sonra", "مَجْرُورٌ بِالحَرْفِ"], ["mi", "Muzâfun ileyh", "مُضَافٌ إِلَيْهِ"], ["zf", "Zarf", "ظَرْفٌ"], ["sf", "Sıfat", "نَعْتٌ"]];
var SEBEP_TR = {}; SEBEP.forEach(function (s) { SEBEP_TR[s[0]] = s[1]; });

// On harf-i cer: h yazılış, al: ال'den önce, b: bitişik yazılan, tr anlam, time: yalnız zamanla
var HARF = [
  { h: "مِنْ", al: "مِنَ", tr: "-den, -dan", note: "مِنْ, ال'den önce مِنَ olur: iki sakin yan yana gelmesin diye nûn fetha alır." },
  { h: "إِلَى", al: "إِلَى", tr: "-e, -a (doğru)" },
  { h: "عَلَى", al: "عَلَى", tr: "üzerinde, -e" },
  { h: "فِي", al: "فِي", tr: "içinde, -de" },
  { h: "بِـ", b: "بِ", tr: "ile, -le", note: "بِـ bitişik yazılır: بِالقَلَمِ." },
  { h: "لِـ", b: "لِ", tr: "için, -e (ait)", note: "لِـ ile ال birleşince elif yazılmaz: لِلْبَيْتِ." },
  { h: "عَنْ", al: "عَنِ", tr: "hakkında, -den (uzak)", note: "عَنْ, ال'den önce عَنِ olur: nûn kesre alır." },
  { h: "كَـ", b: "كَ", tr: "gibi", note: "كَـ bitişik yazılır: كَالأَسَدِ." },
  { h: "حَتَّى", al: "حَتَّى", tr: "-e kadar" },
  { h: "مُنْذُ", al: "مُنْذُ", tr: "-den beri", time: true, note: "مُنْذُ zaman bildiren isimle kullanılır." }
];
var NOUNS = [
  { d: "البَيْت", n: "بَيْت", tr: "ev" }, { d: "المَدْرَسَة", n: "مَدْرَسَة", tr: "okul" }, { d: "السُّوق", n: "سُوق", tr: "çarşı" },
  { d: "القَلَم", n: "قَلَم", tr: "kalem" }, { d: "الصَّدِيق", n: "صَدِيق", tr: "arkadaş" }, { d: "الصَّبَاح", n: "صَبَاح", tr: "sabah", time: true }, { d: "المَسَاء", n: "مَسَاء", tr: "akşam", time: true }
];
function isSun(d) { return /ّ/.test(d.slice(3, 5)); }
// harf + isim → mecrûr şekil
function cerForm(h, nn, def) {
  var w = def ? nn.d : nn.n, end = def ? "ِ" : "ٍ";
  if (h.b) {
    if (def && h.b === "لِ") { var rest = nn.d.slice(2); return "لِل" + (isSun(nn.d) ? "" : "ْ") + rest + end; }
    return h.b + w + end;
  }
  return (def ? h.al : h.h) + " " + w + end;
}
function tenvinNasb(w) { return /(ة|اء)$/.test(w) ? w + "ً" : w + "ًا"; }
function merfu(nn, def) { return def ? nn.d + "ُ" : nn.n + "ٌ"; }

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function IR(s, w, t, c, why, tr) { return { s: s.replace(w, "[" + w + "]"), t: t, c: c, why: why, tr: tr }; }

var UNITS = [
// ---------------------------------------------------------------- 1 · HARF-İ CER VE MECRÛR
{
  id: "u1", no: 1, ar: "حُرُوفُ الجَرِّ", tr: "Harf-i Cer ve Mecrûr İsim", short: "Harf-i cer", col: "mi", legend: ["mi", "cerr"],
  goals: ["On harf-i ceri tanımak: مِنْ، إِلَى، عَلَى، فِي، بِـ، لِـ، عَنْ، كَـ، حَتَّى، مُنْذُ", "Harf-i cerin yalnız isme geldiğini, sonraki ismin mecrûr olduğunu bilmek", "Mecrûr ismin son harekesini doğru koymak: البَيْتِ، بَيْتٍ"],
  examples: [
    { s: "وَضَعَ الطَّالِبُ الكِتَابَ:- / فِي:mi / الحَقِيبَةِ:cerr", tr: "Öğrenci kitabı çantaya koydu." },
    { s: "شَرَحَ المُعَلِّمُ الدَّرْسَ:- / عَلَى:mi / السَّبُّورَةِ:cerr", tr: "Öğretmen dersi tahtada anlattı." },
    { s: "أَكَلَ الوَلَدُ الطَّعَامَ:- / بِـ:mi / المِلْعَقَةِ:cerr", tr: "Çocuk yemeği kaşıkla yedi.", why: "بِـ bitişik yazılır: بِالمِلْعَقَةِ." }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">Harf-i cer</b> (<span class=\"ar\">حَرْفُ الجَرِّ</span>) yalnız isimlerin başına gelir.", ex: ["فِي الحَقِيبَةِ"] },
    { tr: "Harf-i cerden sonraki isim <b class=\"r-cerr\">mecrûr</b> olur: ال'li isim kesre, tenvinli isim iki kesre alır.", ex: ["عَلَى السَّبُّورَةِ", "بِأَدَبٍ"] },
    { tr: "Başlıca harf-i cerler on tanedir.", ex: ["مِنْ", "إِلَى", "عَلَى", "فِي", "بِـ", "لِـ", "عَنْ", "كَـ", "حَتَّى", "مُنْذُ"] },
    { tr: "<span class=\"ar\">بِـ، لِـ، كَـ</span> tek harftir, isme bitişik yazılır.", ex: ["بِالمِلْعَقَةِ", "لِصَدِيقِهِ", "كَالشَّايِ"] },
    { tr: "ال'den önce üç harf değişir: مِنْ nûnu fetha, عَنْ nûnu kesre alır; لِـ ile ال birleşince elif yazılmaz.", ex: ["مِنَ النَّافِذَةِ", "عَنِ الدَّرْسِ", "لِلْبَيْتِ"] },
    { tr: "Dikkat: <span class=\"ar\">مَعَ</span> harf-i cer değil, zarftır; ama sonraki isim yine mecrûrdur (muzâfun ileyh): <span class=\"ar\">مَعَ الأَصْدِقَاءِ</span>." }
  ],
  kaide: [
    "١ ـ حُرُوفُ الجَرِّ تَدْخُلُ عَلَى الأَسْمَاءِ. مِثَالٌ: وَضَعَ الطَّالِبُ الكِتَابَ فِي الحَقِيبَةِ.",
    "٢ ـ يَكُونُ الاسْمُ بَعْدَ حَرْفِ الجَرِّ مَجْرُورًا. مِثَالٌ: شَرَحَ المُعَلِّمُ الدَّرْسَ عَلَى السَّبُّورَةِ، أَكَلَ الوَلَدُ الطَّعَامَ بِالمِلْعَقَةِ.",
    "٣ ـ مِنْ حُرُوفِ الجَرِّ: مِنْ، عَلَى، فِي، بِـ، إِلَى، لِـ، عَنْ، كَـ، حَتَّى، مُنْذُ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنْ حُرُوفَ الجَرِّ فِي الجُمَلِ التَّالِيَةِ", tr: "Harf-i cere dokun. Bitişik olanlarda (بِـ، لِـ، كَـ) bütün kelimeye dokun. Bazı cümlelerde iki harf-i cer var.", items: [
      W("قَدَّمَ الطَّالِبُ القَهْوَةَ [لِصَدِيقِهِ].", "Öğrenci kahveyi arkadaşına ikram etti.", "لِـ bitişik: لِصَدِيقِهِ (arkadaşına)."),
      W("نَظَرَتْ زَيْنَبُ [مِنَ] النَّافِذَةِ.", "Zeynep pencereden baktı.", "مِنْ, ال'den önce مِنَ olur."),
      W("رَدَّ الجَدُّ الطَّلَبَ [بِأَدَبٍ].", "Dede isteği nezaketle geri çevirdi.", "بِـ bitişik: بِأَدَبٍ (edeple)."),
      W("لَعِبَ الوَلَدُ [فِي] الحَدِيقَةِ مَعَ الأَصْدِقَاءِ [حَتَّى] الظُّهْرِ.", "Çocuk bahçede arkadaşlarıyla öğlene kadar oynadı.", "فِي ve حَتَّى. مَعَ harf-i cer değil, zarftır."),
      W("يَشْرَبُ الطِّفْلُ الحَلِيبَ وَهُوَ [عَلَى] الكُرْسِيِّ.", "Çocuk sandalyedeyken süt içiyor.", "عَلَى (üzerinde)."),
      W("تَسْأَلُ البِنْتُ [عَنْ] أُمِّهَا.", "Kız annesini soruyor.", "عَنْ (hakkında)."),
      W("يَدْرُسُ الأَخُ [فِي] الجَامِعَةِ [مُنْذُ] السَّنَةِ المَاضِيَةِ.", "Kardeş geçen yıldan beri üniversitede okuyor.", "فِي ve مُنْذُ."),
      W("لَا يَشْرَبُ أَحْمَدُ المَاءَ [كَالشَّايِ].", "Ahmed suyu çay gibi içmez.", "كَـ bitişik: كَالشَّايِ (çay gibi).")
    ]},
    { type: "combo", num: "١", ar: "وَاضْبِطْ آخِرَ الكَلِمَةِ", tr: "Aynı cümlelerde harf-i cerden sonraki kelimenin son harekesini seç. Kutuya dokundukça hareke değişir.", items: [
      CB("", ["قَدَّمَ الطَّالِبُ القَهْوَةَ", ["لِصَدِيقُهُ", "لِصَدِيقَهُ", "لِصَدِيقِهِ"], "."], [2], "Öğrenci kahveyi arkadaşına ikram etti.", "لِـ'den sonra mecrûr: صَدِيقِ."),
      CB("", ["نَظَرَتْ زَيْنَبُ مِنَ", ["النَّافِذَةُ", "النَّافِذَةِ", "النَّافِذَةَ"], "."], [1], "Zeynep pencereden baktı.", "ال'li isim: tek kesre."),
      CB("", ["رَدَّ الجَدُّ الطَّلَبَ", ["بِأَدَبٍ", "بِأَدَبٌ", "بِأَدَبًا"], "."], [0], "Dede isteği nezaketle geri çevirdi.", "Tenvinli isim: iki kesre (أَدَبٍ)."),
      CB("", ["لَعِبَ الوَلَدُ فِي", ["الحَدِيقَةَ", "الحَدِيقَةُ", "الحَدِيقَةِ"], "مَعَ الأَصْدِقَاءِ حَتَّى", ["الظُّهْرِ", "الظُّهْرَ", "الظُّهْرُ"], "."], [2, 0], "Çocuk bahçede arkadaşlarıyla öğlene kadar oynadı.", "İkisi de harf-i cerden sonra: kesre."),
      CB("", ["يَشْرَبُ الطِّفْلُ الحَلِيبَ وَهُوَ عَلَى", ["الكُرْسِيُّ", "الكُرْسِيِّ", "الكُرْسِيَّ"], "."], [1], "Çocuk sandalyedeyken süt içiyor.", "الكُرْسِيِّ: şeddeli yâ kesre alır."),
      CB("", ["تَسْأَلُ البِنْتُ عَنْ", ["أُمَّهَا", "أُمُّهَا", "أُمِّهَا"], "."], [2], "Kız annesini soruyor.", "أُمِّ + هَا: kesre zamirden önceki harfte."),
      CB("", ["يَدْرُسُ الأَخُ فِي", ["الجَامِعَةِ", "الجَامِعَةُ", "الجَامِعَةَ"], "مُنْذُ", ["السَّنَةَ", "السَّنَةِ", "السَّنَةُ"], "المَاضِيَةِ."], [0, 1], "Kardeş geçen yıldan beri üniversitede okuyor.", "الجَامِعَةِ ve السَّنَةِ mecrûr; المَاضِيَةِ sıfat olarak ona uyar."),
      CB("", ["لَا يَشْرَبُ أَحْمَدُ المَاءَ", ["كَالشَّايُ", "كَالشَّايَ", "كَالشَّايِ"], "."], [2], "Ahmed suyu çay gibi içmez.", "كَـ'den sonra mecrûr: الشَّايِ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMLAR
{
  id: "u2", no: 2, ar: "مَعَانِي حُرُوفِ الجَرِّ", tr: "Harf-i Cerlerin Anlamları", short: "Anlamlar", col: "nasb", legend: ["mi", "cerr"],
  goals: ["Her harf-i cerin Türkçe karşılığını bilmek", "Cümlenin anlamına uyan harf-i ceri seçmek", "Fiille birlikte gelen harf-i ceri tanımak: قَرِيبٌ مِنْ، بَعِيدٌ عَنْ"],
  examples: [
    { s: "جَاءَ:- / مِنَ:mi / السُّوقِ:cerr", tr: "Çarşıdan geldi.", pair: "ذَهَبَ:- / إِلَى:mi / السُّوقِ:cerr", pairTr: "Çarşıya gitti." },
    { s: "الكِتَابُ:- / عَلَى:mi / المَكْتَبِ:cerr", tr: "Kitap masanın üstünde.", pair: "الكِتَابُ:- / فِي:mi / الحَقِيبَةِ:cerr", pairTr: "Kitap çantanın içinde." },
    { s: "كَتَبَ:- / بِـ:mi / القَلَمِ:cerr", tr: "Kalemle yazdı.", pair: "الهَدِيَّةُ:- / لِـ:mi / أُمِّي:cerr", pairTr: "Hediye annem için." },
    { s: "نَامَ:- / حَتَّى:mi / الظُّهْرِ:cerr", tr: "Öğlene kadar uyudu.", pair: "يَبْكِي:- / مُنْذُ:mi / الصَّبَاحِ:cerr", pairTr: "Sabahtan beri ağlıyor." }
  ],
  rules: [
    { tr: "<span class=\"ar\">مِنْ</span>: -den (başlangıç) · <span class=\"ar\">إِلَى</span>: -e (yön, varış)." },
    { tr: "<span class=\"ar\">فِي</span>: içinde, -de · <span class=\"ar\">عَلَى</span>: üzerinde." },
    { tr: "<span class=\"ar\">بِـ</span>: ile (alet, araç) · <span class=\"ar\">لِـ</span>: için, -e, -in (ait olma)." },
    { tr: "<span class=\"ar\">عَنْ</span>: hakkında, -den (uzaklaşma) · <span class=\"ar\">كَـ</span>: gibi." },
    { tr: "<span class=\"ar\">حَتَّى</span>: -e kadar (bitiş) · <span class=\"ar\">مُنْذُ</span>: -den beri (zaman başlangıcı)." },
    { tr: "Bazı kelimeler belli bir harf-i cerle kullanılır: <span class=\"ar\">قَرِيبٌ مِنْ</span> (-e yakın), <span class=\"ar\">بَعِيدٌ عَنْ</span> (-den uzak), <span class=\"ar\">سَأَلَ عَنْ</span> (-i sordu), <span class=\"ar\">نَظَرَ إِلَى</span> (-e baktı)." }
  ],
  kaide: ["مِنْ حُرُوفِ الجَرِّ: مِنْ، عَلَى، فِي، بِـ، إِلَى، لِـ، عَنْ، كَـ، حَتَّى، مُنْذُ."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "اخْتَرْ لِلْفَرَاغِ حَرْفَ جَرٍّ مُنَاسِبًا ثُمَّ اضْبِطْ آخِرَ الكَلِمَةِ", tr: "Boşluğa uyan harf-i ceri seç. Sonraki kelime zaten mecrûr yazıldı; harekesine bak.", items: [
      { q: "رَكِبَ السَّائِقُ ___ السَّيَّارَةِ.", o: ["فِي", "عَنْ", "مِنْ"], a: 0, tr: "Şoför arabaya bindi (arabanın içinde).", why: "فِي: içinde. (رَكِبَ السَّيَّارَةَ diye harfsiz de kullanılır.)" },
      { q: "شَرِبَ الطِّفْلُ العَصِيرَ ___الكَأْسِ.", o: ["عَلَى", "بِـ", "لِـ"], a: 1, tr: "Çocuk meyve suyunu bardakla içti.", why: "بِـ: ile (araç) → بِالكَأْسِ." },
      { q: "زَارَتِ المَجْمُوعَةُ الأَمَاكِنَ التَّارِيخِيَّةَ ___ المَدِينَةِ المُجَاوِرَةِ.", o: ["عَلَى", "عَنْ", "فِي"], a: 2, tr: "Grup komşu şehirdeki tarihî yerleri gezdi.", why: "فِي: -deki." },
      { q: "تَعَلَّمَتِ الطَّالِبَةُ الكِتَابَةَ ___القَلَمِ.", o: ["بِـ", "لِـ", "عَلَى"], a: 0, tr: "Kız öğrenci yazmayı kalemle öğrendi.", why: "بِـ: ile → بِالقَلَمِ." },
      { q: "تَرَكَتْ خَدِيجَةُ حَقِيبَتَهَا فِي المَدْرَسَةِ ___ يَوْمِ الجُمُعَةِ.", o: ["حَتَّى", "عَنْ", "عَلَى"], a: 0, tr: "Hadîce çantasını cuma gününe kadar okulda bıraktı.", why: "حَتَّى: -e kadar." },
      { q: "يُنَظِّفُ سَلِيمٌ الغُرْفَةَ ___ الصَّبَاحِ.", o: ["بِـ", "عَنْ", "مُنْذُ"], a: 2, tr: "Selîm sabahtan beri odayı temizliyor.", why: "مُنْذُ: -den beri (zaman)." },
      { q: "يَسْكُنُ حَسَنٌ قَرِيبًا ___ السُّوقِ.", o: ["مِنَ", "عَلَى", "عَنِ"], a: 0, tr: "Hasan çarşıya yakın oturuyor.", why: "قَرِيبٌ مِنْ: -e yakın. ال'den önce مِنَ." },
      { q: "يَجْلِسُ مُحَمَّدٌ بَعِيدًا ___ الأُسْتَاذِ.", o: ["عَلَى", "مِنَ", "عَنِ"], a: 2, tr: "Muhammed hocadan uzak oturuyor.", why: "بَعِيدٌ عَنْ: -den uzak. ال'den önce عَنِ. (بَعِيدٌ مِنْ da duyulur ama yaygın olan عَنْ.)" }
    ]},
    { type: "pick", extra: true, ar: "مَا مَعْنَى الجُمْلَةِ؟", tr: "Harf-i cerin anlamına bak: Türkçesi hangisi?", items: [
      { q: "جَاءَ مِنَ السُّوقِ.", o: ["Çarşıya geldi.", "Çarşıdan geldi.", "Çarşıda kaldı."], a: 1, why: "مِنْ: -den.", tr: "" },
      { q: "ذَهَبَ إِلَى المَسْجِدِ.", o: ["Mescide gitti.", "Mescitten çıktı.", "Mescitte oturdu."], a: 0, why: "إِلَى: -e.", tr: "" },
      { q: "الكِتَابُ عَلَى المَكْتَبِ.", o: ["Kitap masanın içinde.", "Kitap masadan düştü.", "Kitap masanın üstünde."], a: 2, why: "عَلَى: üzerinde.", tr: "" },
      { q: "سَأَلَ عَنِ الدَّرْسِ.", o: ["Dersten çıktı.", "Dersi sordu.", "Derse gitti."], a: 1, why: "سَأَلَ عَنْ: -i sordu (hakkında).", tr: "" },
      { q: "كَتَبَ بِالقَلَمِ.", o: ["Kalemle yazdı.", "Kalem için yazdı.", "Kalem gibi yazdı."], a: 0, why: "بِـ: ile.", tr: "" },
      { q: "نَامَ حَتَّى الظُّهْرِ.", o: ["Öğleden beri uyuyor.", "Öğlende uyudu.", "Öğlene kadar uyudu."], a: 2, why: "حَتَّى: -e kadar.", tr: "" },
      { q: "يَبْكِي مُنْذُ الصَّبَاحِ.", o: ["Sabaha kadar ağladı.", "Sabahtan beri ağlıyor.", "Sabah ağladı."], a: 1, why: "مُنْذُ: -den beri.", tr: "" },
      { q: "هُوَ كَالأَسَدِ.", o: ["O aslan gibi.", "O aslanla.", "O aslan için."], a: 0, why: "كَـ: gibi.", tr: "" },
      { q: "الهَدِيَّةُ لِأُمِّي.", o: ["Hediye annemden.", "Hediye annemle.", "Hediye annem için."], a: 2, why: "لِـ: için.", tr: "" },
      { q: "الوَلَدُ فِي البَيْتِ.", o: ["Çocuk evde.", "Çocuk eve gitti.", "Çocuk evden çıktı."], a: 0, why: "فِي: -de.", tr: "" }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · SORU-CEVAP
{
  id: "u3", no: 3, ar: "الإِجَابَةُ بِحَرْفِ جَرٍّ", tr: "Soruya Harf-i Cerle Cevap", short: "Soru-cevap", col: "mz", legend: ["mi", "cerr"],
  goals: ["Soru kelimesinden doğru harf-i ceri bulmak: أَيْنَ ← فِي، مِنْ أَيْنَ ← مِنْ", "Parantezdeki ismi mecrûr yapıp cevaba koymak", "Cevapta zamiri değiştirmek: لِمَنْ كَتَبَتْ؟ ← لِوَالِدَتِهَا"],
  examples: [
    { s: "جَلَسَ مُرَادٌ:- / عَلَى:mi / الكُرْسِيِّ:cerr", tr: "Murâd sandalyeye oturdu.", why: "Soru: أَيْنَ جَلَسَ مُرَادٌ؟ (الكُرْسِيّ)" },
    { s: "جَاءَتْ بَتُولُ:- / مِنَ:mi / العَمَلِ:cerr", tr: "Betûl işten geldi.", why: "Soru: مِنْ أَيْنَ جَاءَتْ بَتُولُ؟" },
    { s: "يَبْكِي الطِّفْلُ:- / مُنْذُ:mi / الصَّبَاحِ:cerr", tr: "Çocuk sabahtan beri ağlıyor.", why: "Soru: مُنْذُ مَتَى يَبْكِي الطِّفْلُ؟" }
  ],
  rules: [
    { tr: "Soru kelimesi çoğu zaman harf-i ceri söyler: <span class=\"ar\">إِلَى أَيْنَ؟ ← إِلَى</span>, <span class=\"ar\">مِنْ أَيْنَ؟ ← مِنْ</span>, <span class=\"ar\">لِمَنْ؟ ← لِـ</span>, <span class=\"ar\">عَنْ أَيِّ شَيْءٍ؟ ← عَنْ</span>, <span class=\"ar\">مُنْذُ مَتَى؟ ← مُنْذُ</span>." },
    { tr: "<span class=\"ar\">أَيْنَ؟</span> (nerede) yer sorar: <span class=\"ar\">فِي</span> ya da <span class=\"ar\">عَلَى</span> ile cevap verilir." },
    { tr: "<span class=\"ar\">كَيْفَ؟</span> (nasıl) alet ya da araç soruyorsa <span class=\"ar\">بِـ</span> ile cevap verilir: <span class=\"ar\">بِالشَّوْكَةِ، بِالسَّيَّارَةِ</span>." },
    { tr: "Parantezdeki isim cevapta mecrûr olur: <span class=\"ar\">(القَرْيَة) ← فِي القَرْيَةِ</span>." }
  ],
  kaide: ["أَجِبْ عَنِ الأَسْئِلَةِ بِحَرْفِ جَرٍّ مُنَاسِبٍ مَعَ ضَبْطِ آخِرِ كُلِّ كَلِمَةٍ. مِثَالٌ: أَيْنَ جَلَسَ مُرَادٌ؟ (الكُرْسِيّ) ← جَلَسَ مُرَادٌ عَلَى الكُرْسِيِّ."],
  ex: [
    { type: "combo", num: "٣", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِحَرْفِ جَرٍّ مُنَاسِبٍ مَعَ ضَبْطِ آخِرِ كُلِّ كَلِمَةٍ", tr: "Cevabı kur: kutulara dokunarak harf-i ceri ve ismin doğru harekesini seç.", exHtml: "<span class=\"ar\">أَيْنَ جَلَسَ مُرَادٌ؟ (الكُرْسِيّ) ← جَلَسَ مُرَادٌ عَلَى الكُرْسِيِّ.</span>", items: [
      CB("أَيْنَ عَاشَ خَلِيلٌ؟ <span class=\"muted\">(القَرْيَة)</span>", ["عَاشَ خَلِيلٌ", ["إِلَى", "فِي", "عَنْ"], ["القَرْيَةَ", "القَرْيَةُ", "القَرْيَةِ"], "."], [1, 2], "Halîl köyde yaşadı.", "أَيْنَ → فِي; isim mecrûr."),
      CB("إِلَى أَيْنَ نَظَرَ عَلِيٌّ؟ <span class=\"muted\">(الصُّورَة)</span>", ["نَظَرَ عَلِيٌّ", ["إِلَى", "مِنَ", "عَنِ"], ["الصُّورَةُ", "الصُّورَةِ", "الصُّورَةَ"], "."], [0, 1], "Ali resme baktı.", "Soru إِلَى ile soruyor; cevap da إِلَى."),
      CB("لِمَنْ كَتَبَتْ بُشْرَى الرِّسَالَةَ؟ <span class=\"muted\">(وَالِدَة)</span>", ["كَتَبَتْ بُشْرَى الرِّسَالَةَ", ["لِوَالِدَتُهَا", "عَلَى وَالِدَتِهَا", "لِوَالِدَتِهَا"], "."], [2], "Büşra mektubu annesine yazdı.", "لِمَنْ → لِـ; \"onun annesi\" için هَا zamiri eklendi: لِوَالِدَتِهَا."),
      CB("مِنْ أَيْنَ جَاءَتْ بَتُولُ؟ <span class=\"muted\">(العَمَل)</span>", ["جَاءَتْ بَتُولُ", ["عَلَى", "إِلَى", "مِنَ"], ["العَمَلِ", "العَمَلُ", "العَمَلَ"], "."], [2, 0], "Betûl işten geldi.", "مِنْ + ال → مِنَ العَمَلِ."),
      CB("عَنْ أَيِّ شَيْءٍ تَسْأَلُ البِنْتُ؟ <span class=\"muted\">(النُّقُود)</span>", ["تَسْأَلُ البِنْتُ", ["فِي", "عَنِ", "مُنْذُ"], ["النُّقُودِ", "النُّقُودَ", "النُّقُودُ"], "."], [1, 0], "Kız parayı soruyor.", "عَنْ + ال → عَنِ النُّقُودِ."),
      CB("مُنْذُ مَتَى يَبْكِي الطِّفْلُ؟ <span class=\"muted\">(الصَّبَاح)</span>", ["يَبْكِي الطِّفْلُ", ["حَتَّى", "مُنْذُ", "عَلَى"], ["الصَّبَاحَ", "الصَّبَاحُ", "الصَّبَاحِ"], "."], [1, 2], "Çocuk sabahtan beri ağlıyor.", "مُنْذُ مَتَى → مُنْذُ."),
      CB("كَيْفَ أَكَلَ الوَلَدُ الكَبَابَ؟ <span class=\"muted\">(الشَّوْكَة)</span>", ["أَكَلَ الوَلَدُ الكَبَابَ", ["كَالشَّوْكَةِ", "بِالشَّوْكَةِ", "بِالشَّوْكَةُ"], "."], [1], "Çocuk kebabı çatalla yedi.", "Alet → بِـ: بِالشَّوْكَةِ."),
      CB("كَيْفَ حَضَرَ الأُسْتَاذُ إِلَى الكُلِّيَّةِ؟ <span class=\"muted\">(السَّيَّارَة)</span>", ["حَضَرَ الأُسْتَاذُ إِلَى الكُلِّيَّةِ", ["لِلسَّيَّارَةِ", "بِالسَّيَّارَةَ", "بِالسَّيَّارَةِ"], "."], [2], "Hoca fakülteye arabayla geldi.", "Araç → بِـ: بِالسَّيَّارَةِ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · HAL VE SEBEBİ
{
  id: "u4", no: 4, ar: "ضَبْطُ آخِرِ الكَلِمَةِ وَسَبَبُهُ", tr: "Son Hareke ve Sebebi", short: "Hal ve sebep", col: "cerr", legend: ["ref", "nasb", "mi", "cerr"],
  goals: ["Cümledeki her ismin halini (merfû, mansûb, mecrûr) söylemek", "Halin sebebini söylemek: fâil, mef’ûl, harf-i cer, muzâfun ileyh", "Harf-i cerden sonraki ismi diğer mecrûrlardan ayırmak"],
  examples: [
    { s: "يَنْتَظِرُ:- / الحَارِسُ:ref / المَصْنَعَ:nasb / حَتَّى:mi / الصَّبَاحِ:cerr", tr: "Bekçi fabrikayı sabaha kadar bekliyor." },
    { s: "وَضَعَتِ:- / الأُمُّ:ref / سَاعَتَهَا:nasb / عَلَى:mi / المَكْتَبِ:cerr", tr: "Anne saatini masanın üstüne koydu." },
    { s: "زَادَتْ:- / أَسْعَارُ:ref / النِّفْطِ:cerr / عَنِ:mi / العَامِ:cerr / المَاضِي:-", tr: "Petrol fiyatları geçen yıla göre arttı.", why: "النِّفْطِ muzâfun ileyh olduğu için, العَامِ harf-i cerden sonra geldiği için mecrûr." }
  ],
  rules: [
    { tr: "<b class=\"r-ref\">Merfû</b>: fâil (<span class=\"ar\">الحَارِسُ</span>), mübtedâ, haber. Ötre ya da iki ötre." },
    { tr: "<b class=\"r-nasb\">Mansûb</b>: mef’ûl bih (<span class=\"ar\">المَصْنَعَ</span>), zarf (<span class=\"ar\">كُلَّ شَهْرٍ</span>). Üstün ya da iki üstün." },
    { tr: "<b class=\"r-cerr\">Mecrûr</b>: harf-i cerden sonra (<span class=\"ar\">حَتَّى الصَّبَاحِ</span>) ya da muzâfun ileyh (<span class=\"ar\">أَسْعَارُ النِّفْطِ</span>). Esre ya da iki esre." },
    { tr: "Sıfat, nitelediği isme halde uyar: <span class=\"ar\">فِي السَّنَةِ المَاضِيَةِ</span>." },
    { tr: "Zamir alan isimde hareke zamirden önceki harftedir: <span class=\"ar\">سَاعَتَهَا، صَدِيقَتِهَا</span>." }
  ],
  kaide: ["اضْبِطْ آخِرَ كُلِّ كَلِمَةٍ وَبَيِّنِ السَّبَبَ: الفَاعِلُ مَرْفُوعٌ، وَالمَفْعُولُ بِهِ مَنْصُوبٌ، وَالاسْمُ بَعْدَ حَرْفِ الجَرِّ مَجْرُورٌ، وَالمُضَافُ إِلَيْهِ مَجْرُورٌ."],
  ex: [
    { type: "irab", num: "٤", tlist: SEBEP, tlbl: "Sebebi", ar: "اضْبِطْ آخِرَ كُلِّ كَلِمَةٍ وَبَيِّنِ السَّبَبَ", tr: "Koyu kelimenin halini ve sebebini seç, sonra kontrol et. Kitaptaki sekiz cümlenin önemli kelimeleri sırayla soruluyor.", items: [
      IR("يَنْتَظِرُ الحَارِسُ المَصْنَعَ حَتَّى الصَّبَاحِ.", "الحَارِسُ", "fa", "ref", "Bekleyen o: fâil.", "Bekçi fabrikayı sabaha kadar bekliyor."),
      IR("يَنْتَظِرُ الحَارِسُ المَصْنَعَ حَتَّى الصَّبَاحِ.", "المَصْنَعَ", "mf", "nasb", "Beklenen: mef’ûl bih.", "Bekçi fabrikayı sabaha kadar bekliyor."),
      IR("يَنْتَظِرُ الحَارِسُ المَصْنَعَ حَتَّى الصَّبَاحِ.", "الصَّبَاحِ", "hc", "cer", "حَتَّى'dan sonra.", "Bekçi fabrikayı sabaha kadar bekliyor."),
      IR("يُسَافِرُ المُعَلِّمُ إِلَى بَلَدِهِ مِنَ الصَّبَاحِ حَتَّى المَسَاءِ.", "المُعَلِّمُ", "fa", "ref", "Yolculuk eden: fâil.", "Öğretmen sabahtan akşama kadar memleketine yolculuk ediyor."),
      IR("يُسَافِرُ المُعَلِّمُ إِلَى بَلَدِهِ مِنَ الصَّبَاحِ حَتَّى المَسَاءِ.", "بَلَدِهِ", "hc", "cer", "إِلَى'dan sonra; hareke zamirden önce: بَلَدِ + هِ.", "Öğretmen sabahtan akşama kadar memleketine yolculuk ediyor."),
      IR("يُسَافِرُ المُعَلِّمُ إِلَى بَلَدِهِ مِنَ الصَّبَاحِ حَتَّى المَسَاءِ.", "المَسَاءِ", "hc", "cer", "حَتَّى'dan sonra.", "Öğretmen sabahtan akşama kadar memleketine yolculuk ediyor."),
      IR("يُقَابِلُ الفَقِيرُ المُدِيرَ وَيَطْلُبُ مِنْهُ المُسَاعَدَةَ.", "الفَقِيرُ", "fa", "ref", "Görüşen: fâil.", "Fakir müdürle görüşüyor ve ondan yardım istiyor."),
      IR("يُقَابِلُ الفَقِيرُ المُدِيرَ وَيَطْلُبُ مِنْهُ المُسَاعَدَةَ.", "المُدِيرَ", "mf", "nasb", "Görüşülen: mef’ûl bih.", "Fakir müdürle görüşüyor ve ondan yardım istiyor."),
      IR("يُقَابِلُ الفَقِيرُ المُدِيرَ وَيَطْلُبُ مِنْهُ المُسَاعَدَةَ.", "المُسَاعَدَةَ", "mf", "nasb", "İstenen: mef’ûl bih. مِنْهُ'daki هُ zamiri mebnîdir.", "Fakir müdürle görüşüyor ve ondan yardım istiyor."),
      IR("زَادَتْ أَسْعَارُ النِّفْطِ عَنِ العَامِ المَاضِي.", "أَسْعَارُ", "fa", "ref", "Artan: fâil.", "Petrol fiyatları geçen yıla göre arttı."),
      IR("زَادَتْ أَسْعَارُ النِّفْطِ عَنِ العَامِ المَاضِي.", "النِّفْطِ", "mi", "cer", "أَسْعَارُ النِّفْطِ: izafet; ikinci isim mecrûr.", "Petrol fiyatları geçen yıla göre arttı."),
      IR("زَادَتْ أَسْعَارُ النِّفْطِ عَنِ العَامِ المَاضِي.", "العَامِ", "hc", "cer", "عَنْ'dan sonra (ال'den önce عَنِ).", "Petrol fiyatları geçen yıla göre arttı."),
      IR("تَأْخُذُ زَيْنَبُ مِنْ صَدِيقَتِهَا كِتَابًا كُلَّ شَهْرٍ.", "زَيْنَبُ", "fa", "ref", "Alan: fâil (gayr-i munsarif: tenvin almaz).", "Zeynep her ay arkadaşından bir kitap alıyor."),
      IR("تَأْخُذُ زَيْنَبُ مِنْ صَدِيقَتِهَا كِتَابًا كُلَّ شَهْرٍ.", "صَدِيقَتِهَا", "hc", "cer", "مِنْ'den sonra.", "Zeynep her ay arkadaşından bir kitap alıyor."),
      IR("تَأْخُذُ زَيْنَبُ مِنْ صَدِيقَتِهَا كِتَابًا كُلَّ شَهْرٍ.", "كِتَابًا", "mf", "nasb", "Alınan: mef’ûl bih.", "Zeynep her ay arkadaşından bir kitap alıyor."),
      IR("تَأْخُذُ زَيْنَبُ مِنْ صَدِيقَتِهَا كِتَابًا كُلَّ شَهْرٍ.", "كُلَّ", "zf", "nasb", "Zaman bildiriyor (her ay): zarf.", "Zeynep her ay arkadaşından bir kitap alıyor."),
      IR("تَأْخُذُ زَيْنَبُ مِنْ صَدِيقَتِهَا كِتَابًا كُلَّ شَهْرٍ.", "شَهْرٍ", "mi", "cer", "كُلَّ شَهْرٍ: izafet.", "Zeynep her ay arkadaşından bir kitap alıyor."),
      IR("وَضَعَتِ الأُمُّ سَاعَتَهَا عَلَى المَكْتَبِ.", "الأُمُّ", "fa", "ref", "Koyan: fâil.", "Anne saatini masanın üstüne koydu."),
      IR("وَضَعَتِ الأُمُّ سَاعَتَهَا عَلَى المَكْتَبِ.", "سَاعَتَهَا", "mf", "nasb", "Konan: mef’ûl bih.", "Anne saatini masanın üstüne koydu."),
      IR("وَضَعَتِ الأُمُّ سَاعَتَهَا عَلَى المَكْتَبِ.", "المَكْتَبِ", "hc", "cer", "عَلَى'dan sonra.", "Anne saatini masanın üstüne koydu."),
      IR("يَحْرِصُ المُسْلِمُ عَلَى الإِخْلَاصِ فِي العِبَادَةِ.", "المُسْلِمُ", "fa", "ref", "Özen gösteren: fâil.", "Müslüman ibadette ihlâsa özen gösterir."),
      IR("يَحْرِصُ المُسْلِمُ عَلَى الإِخْلَاصِ فِي العِبَادَةِ.", "الإِخْلَاصِ", "hc", "cer", "عَلَى'dan sonra (حَرَصَ عَلَى: -e özen gösterdi).", "Müslüman ibadette ihlâsa özen gösterir."),
      IR("يَحْرِصُ المُسْلِمُ عَلَى الإِخْلَاصِ فِي العِبَادَةِ.", "العِبَادَةِ", "hc", "cer", "فِي'den sonra.", "Müslüman ibadette ihlâsa özen gösterir."),
      IR("زَارَتْ عَائِشَةُ عَاصِمَةَ تُرْكِيَا فِي السَّنَةِ المَاضِيَةِ.", "عَائِشَةُ", "fa", "ref", "Ziyaret eden: fâil.", "Âişe geçen yıl Türkiye’nin başkentini ziyaret etti."),
      IR("زَارَتْ عَائِشَةُ عَاصِمَةَ تُرْكِيَا فِي السَّنَةِ المَاضِيَةِ.", "عَاصِمَةَ", "mf", "nasb", "Ziyaret edilen: mef’ûl bih (تُرْكِيَا muzâfun ileyh).", "Âişe geçen yıl Türkiye’nin başkentini ziyaret etti."),
      IR("زَارَتْ عَائِشَةُ عَاصِمَةَ تُرْكِيَا فِي السَّنَةِ المَاضِيَةِ.", "السَّنَةِ", "hc", "cer", "فِي'den sonra.", "Âişe geçen yıl Türkiye’nin başkentini ziyaret etti."),
      IR("زَارَتْ عَائِشَةُ عَاصِمَةَ تُرْكِيَا فِي السَّنَةِ المَاضِيَةِ.", "المَاضِيَةِ", "sf", "cer", "السَّنَةِ'nin sıfatı: ona uyar.", "Âişe geçen yıl Türkiye’nin başkentini ziyaret etti.")
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · METİN
{
  id: "u5", no: 5, ar: "حُرُوفُ الجَرِّ فِي النَّصِّ", tr: "Metinde Harf-i Cer", short: "Metin", col: "muz", legend: ["mi", "cerr"],
  goals: ["Bir metindeki boşluklara anlama uyan harf-i ceri koymak", "Aynı harf-i cerin bir metinde defalarca kullanıldığını görmek", "Harf-i cerden sonraki kelimenin son harekesini koymak"],
  examples: [
    { s: "جَاءَ صَادِقٌ:- / مِنْ:mi / مَدِينَةِ:cerr / إِزْمِيرَ:-", tr: "Sâdık İzmir şehrinden geldi." },
    { s: "يَذْهَبُ:- / إِلَى:mi / المَسْجِدِ:cerr", tr: "Mescide gidiyor.", pair: "يَخْرُجُ:- / مِنَ:mi / الشَّقَّةِ:cerr", pairTr: "Daireden çıkıyor." },
    { s: "يَسْتَمِعُ صَادِقٌ:- / إِلَى:mi / أُسْتَاذِهِ:cerr", tr: "Sâdık hocasını dinliyor.", pair: "بِـ:mi / دِقَّةٍ:cerr", pairTr: "dikkatle" }
  ],
  rules: [
    { tr: "Yer: <span class=\"ar\">فِي شَقَّةٍ، فِي السَّنَةِ التَّمْهِيدِيَّةِ</span>. Yön: <span class=\"ar\">مِنَ البَيْتِ إِلَى الجَامِعَةِ</span>." },
    { tr: "Zaman: <span class=\"ar\">مُنْذُ سَنَتَيْنِ</span> (iki yıldan beri / iki yıl önce)." },
    { tr: "Kalıp ifadeler: <span class=\"ar\">قَرِيبَةٌ مِنَ الجَامِعَةِ، يَسْتَمِعُ إِلَى، نَظَرَ إِلَى، طَلَبَ مِنْ</span>." },
    { tr: "<span class=\"ar\">لِيُصَلِّيَ</span>: buradaki <span class=\"ar\">لِـ</span> fiile gelmiş gibi görünür; \"kılmak için\" anlamı verir (lâm-ı ta’lîl)." },
    { tr: "<span class=\"ar\">لِـ + البَائِعِ ← لِلْبَائِعِ</span>; <span class=\"ar\">دَفَعَ إِلَى البَائِعِ</span> de olur." }
  ],
  kaide: ["امْلَأِ الفَرَاغَ بِوَضْعِ حَرْفِ جَرٍّ مُنَاسِبٍ مِنَ القَائِمَةِ: (مِنْ، مُنْذُ، عَنْ، بِـ، فِي، لِـ، عَلَى، إِلَى)."],
  ex: [
    { type: "bank", reuse: true, num: "٥", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ حَرْفِ جَرٍّ مُنَاسِبٍ مِنَ القَائِمَةِ", tr: "Önce bir harf-i cer seç, sonra boşluğa dokun. Bir harf birden çok kez kullanılabilir.",
      bank: ["مِنْ", "مُنْذُ", "عَنْ", "بِـ", "فِي", "لِـ", "عَلَى", "إِلَى"],
      tr2: "Sâdık liseyi iki yıl önce bitirdi. Şimdi Marmara Üniversitesi Arap Dili bölümünde hazırlık sınıfında öğrenci. Sâdık İzmir şehrinden geldi. Arkadaşlarıyla üniversiteye yakın bir dairede oturuyor. Erkenden kalkıp abdest alıyor, sonra daireden çıkıp sabah namazını kılmak için mescide gidiyor. Kahvaltıyı arkadaşlarıyla yapıyor; kahvaltıda ekmek, zeytin, peynir ve yumurta yiyip çay içiyor. Sâdık evden üniversiteye yaklaşık beş dakika yürüyor. Ders saat dokuzda başlıyor; Sâdık hocasını dikkatle dinliyor.",
      parts: ["صَادِقٌ أَكْمَلَ الدِّرَاسَةَ الثَّانَوِيَّةَ", { a: [1] }, "سَنَتَيْنِ. هُوَ الآنَ طَالِبٌ", { a: [4] }, "السَّنَةِ التَّمْهِيدِيَّةِ", { a: [4, 3] }, "قِسْمِ اللُّغَةِ العَرَبِيَّةِ", { a: [3, 4] }, "جَامِعَةِ مَرْمَرَة. جَاءَ صَادِقٌ", { a: [0] }, "مَدِينَةِ إِزْمِيرَ. هُوَ يَسْكُنُ مَعَ أَصْدِقَائِهِ", { a: [4] }, "شَقَّةٍ قَرِيبَةٍ", { a: [0] }, "الجَامِعَةِ. يَسْتَيْقِظُ صَادِقٌ مُبَكِّرًا وَيَتَوَضَّأُ ثُمَّ يَخْرُجُ", { a: [0] }, "الشَّقَّةِ وَيَذْهَبُ", { a: [7] }, "المَسْجِدِ", { a: [5] }, "يُصَلِّيَ صَلَاةَ الفَجْرِ. صَادِقٌ يَتَنَاوَلُ الفَطُورَ مَعَ أَصْدِقَائِهِ، يَأْكُلُ", { a: [4] }, "الفَطُورِ الخُبْزَ وَالزَّيْتُونَ وَالجُبْنَ وَالبَيْضَ وَيَشْرَبُ الشَّايَ. يَمْشِي صَادِقٌ", { a: [0] }, "البَيْتِ", { a: [7] }, "الجَامِعَةِ خَمْسَ دَقَائِقَ تَقْرِيبًا. يَبْدَأُ الدَّرْسُ السَّاعَةَ التَّاسِعَةَ، يَسْتَمِعُ صَادِقٌ", { a: [7] }, "أُسْتَاذِهِ", { a: [3] }, "دِقَّةٍ."] },
    { type: "bank", reuse: true, num: "٦", ar: "أَكْمِلِ القِصَّةَ التَّالِيَةَ بِوَضْعِ حَرْفِ جَرٍّ مُنَاسِبٍ لِلْمَعْنَى", tr: "Hikâyeyi anlama uyan harf-i cerle tamamla. Kelimelerin son harekeleri yazıldı: hepsi harf-i cerden sonra esreli.",
      bank: ["مِنْ", "إِلَى", "فِي", "لِـ", "عَلَى", "عَنْ"],
      tr2: "Murâd evden çıktı, sonra arabasına binip çarşıya gitti. Arabayı kaldırıma yakın park etti. Çarşıda dolaştı ve sergilenen mallara baktı. Çarşıda güzel bir saat hoşuna gitti. Saatin fiyatı yüz lira. Dükkâna girdi ve satıcıdan saati istedi. Saat çok iyi. Saatin parasını satıcıya ödedi ve onu aldı, sonra arabasına binip evine döndü.",
      parts: ["خَرَجَ مُرَادٌ", { a: [0] }, "البَيْتِ ثُمَّ رَكِبَ سَيَّارَتَهُ وَذَهَبَ", { a: [1] }, "السُّوقِ. أَوْقَفَ السَّيَّارَةَ قَرِيبًا", { a: [0] }, "الرَّصِيفِ. تَجَوَّلَ", { a: [2] }, "السُّوقِ، وَنَظَرَ", { a: [1] }, "المَعْرُوضَاتِ.", { a: [2] }, "السُّوقِ أَعْجَبَتْهُ سَاعَةٌ جَمِيلَةٌ. ثَمَنُ السَّاعَةِ مِئَةُ لِيرَةٍ. دَخَلَ الدُّكَّانَ وَطَلَبَ السَّاعَةَ", { a: [0] }, "البَائِعِ. السَّاعَةُ جَيِّدَةٌ جِدًّا. دَفَعَ ثَمَنَ السَّاعَةِ", { a: [1, 3] }, "البَائِعِ وَأَخَذَهَا، ثُمَّ رَكِبَ سَيَّارَتَهُ وَرَجَعَ", { a: [1] }, "بَيْتِهِ."] },
    { type: "pick", extra: true, ar: "اضْبِطْ آخِرَ الكَلِمَةِ", tr: "Hikâyeden: harf-i cerden sonraki kelimenin doğru yazılışı hangisi?", items: [
      { q: "خَرَجَ مُرَادٌ مِنَ ……", o: ["البَيْتُ", "البَيْتِ", "البَيْتَ"], a: 1, why: "مِنَ'den sonra mecrûr.", tr: "Murâd evden çıktı." },
      { q: "وَذَهَبَ إِلَى ……", o: ["السُّوقِ", "السُّوقَ", "السُّوقُ"], a: 0, why: "إِلَى'dan sonra mecrûr.", tr: "Çarşıya gitti." },
      { q: "يَسْكُنُ فِي ……", o: ["شَقَّةٌ", "شَقَّةً", "شَقَّةٍ"], a: 2, why: "Tenvinli isim: iki esre.", tr: "Bir dairede oturuyor." },
      { q: "دَفَعَ ثَمَنَ السَّاعَةِ ……", o: ["لِلْبَائِعِ", "لِالبَائِعِ", "لِلْبَائِعُ"], a: 0, why: "لِـ + ال → لِلْـ, elif yazılmaz; isim mecrûr.", tr: "Saatin parasını satıcıya ödedi." },
      { q: "يَسْتَمِعُ إِلَى ……", o: ["أُسْتَاذُهُ", "أُسْتَاذِهِ", "أُسْتَاذَهُ"], a: 1, why: "Hareke zamirden önceki harfte: أُسْتَاذِ + هِ.", tr: "Hocasını dinliyor." },
      { q: "أَكْمَلَ الدِّرَاسَةَ مُنْذُ ……", o: ["سَنَتَيْنِ", "سَنَتَانِ", "سَنَتَيْنَ"], a: 0, why: "Müsennâ mecrûrda ـَيْنِ olur.", tr: "Okulu iki yıl önce bitirdi." }
    ]}
  ]
}
];

// Doğru Harf oyunu: [cümle {harf}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var HC_POOL = [
  ["وَضَعَ الطَّالِبُ الكِتَابَ {فِي} الحَقِيبَةِ.", ["فِي", "عَنْ", "مُنْذُ"], "içine: فِي", "Öğrenci kitabı çantaya koydu.", "u1"],
  ["شَرَحَ المُعَلِّمُ الدَّرْسَ {عَلَى} السَّبُّورَةِ.", ["عَلَى", "مُنْذُ", "عَنْ"], "tahtanın üstünde: عَلَى", "Öğretmen dersi tahtada anlattı.", "u1"],
  ["نَظَرَتْ زَيْنَبُ {مِنَ} النَّافِذَةِ.", ["مِنَ", "مُنْذُ", "حَتَّى"], "pencereden: مِنْ (ال'den önce مِنَ)", "Zeynep pencereden baktı.", "u1"],
  ["تَسْأَلُ البِنْتُ {عَنْ} أُمِّهَا.", ["عَنْ", "فِي", "مُنْذُ"], "سَأَلَ عَنْ: -i sordu", "Kız annesini soruyor.", "u1"],
  ["لَعِبَ الوَلَدُ فِي الحَدِيقَةِ {حَتَّى} الظُّهْرِ.", ["حَتَّى", "عَنِ", "عَلَى"], "öğlene kadar: حَتَّى", "Çocuk bahçede öğlene kadar oynadı.", "u1"],
  ["رَكِبَ السَّائِقُ {فِي} السَّيَّارَةِ.", ["فِي", "عَنِ", "مِنَ"], "arabanın içinde: فِي", "Şoför arabaya bindi.", "u2"],
  ["زَارَتِ المَجْمُوعَةُ الأَمَاكِنَ التَّارِيخِيَّةَ {فِي} المَدِينَةِ.", ["فِي", "عَلَى", "عَنِ"], "şehirdeki: فِي", "Grup şehirdeki tarihî yerleri gezdi.", "u2"],
  ["تَرَكَتْ خَدِيجَةُ حَقِيبَتَهَا {حَتَّى} يَوْمِ الجُمُعَةِ.", ["حَتَّى", "عَنْ", "عَلَى"], "cumaya kadar: حَتَّى", "Hadîce çantasını cumaya kadar bıraktı.", "u2"],
  ["يُنَظِّفُ سَلِيمٌ الغُرْفَةَ {مُنْذُ} الصَّبَاحِ.", ["مُنْذُ", "عَنِ", "عَلَى"], "sabahtan beri: مُنْذُ", "Selîm sabahtan beri odayı temizliyor.", "u2"],
  ["يَسْكُنُ حَسَنٌ قَرِيبًا {مِنَ} السُّوقِ.", ["مِنَ", "عَلَى", "حَتَّى"], "قَرِيبٌ مِنْ", "Hasan çarşıya yakın oturuyor.", "u2"],
  ["يَجْلِسُ مُحَمَّدٌ بَعِيدًا {عَنِ} الأُسْتَاذِ.", ["عَنِ", "عَلَى", "فِي"], "بَعِيدٌ عَنْ", "Muhammed hocadan uzak oturuyor.", "u2"],
  ["عَاشَ خَلِيلٌ {فِي} القَرْيَةِ.", ["فِي", "إِلَى", "عَنِ"], "أَيْنَ → فِي", "Halîl köyde yaşadı.", "u3"],
  ["نَظَرَ عَلِيٌّ {إِلَى} الصُّورَةِ.", ["إِلَى", "مُنْذُ", "عَنِ"], "نَظَرَ إِلَى", "Ali resme baktı.", "u3"],
  ["جَاءَتْ بَتُولُ {مِنَ} العَمَلِ.", ["مِنَ", "إِلَى", "عَلَى"], "مِنْ أَيْنَ → مِنْ", "Betûl işten geldi.", "u3"],
  ["تَسْأَلُ البِنْتُ {عَنِ} النُّقُودِ.", ["عَنِ", "فِي", "مُنْذُ"], "عَنْ أَيِّ شَيْءٍ → عَنْ", "Kız parayı soruyor.", "u3"],
  ["يَبْكِي الطِّفْلُ {مُنْذُ} الصَّبَاحِ.", ["مُنْذُ", "حَتَّى", "عَلَى"], "مُنْذُ مَتَى → مُنْذُ", "Çocuk sabahtan beri ağlıyor.", "u3"],
  ["جَلَسَ مُرَادٌ {عَلَى} الكُرْسِيِّ.", ["عَلَى", "مُنْذُ", "عَنِ"], "sandalyenin üstüne: عَلَى", "Murâd sandalyeye oturdu.", "u3"],
  ["يَنْتَظِرُ الحَارِسُ المَصْنَعَ {حَتَّى} الصَّبَاحِ.", ["حَتَّى", "عَنِ", "فِي"], "sabaha kadar: حَتَّى", "Bekçi fabrikayı sabaha kadar bekliyor.", "u4"],
  ["يُسَافِرُ المُعَلِّمُ {مِنَ} الصَّبَاحِ حَتَّى المَسَاءِ.", ["مِنَ", "عَلَى", "عَنِ"], "مِنْ … حَتَّى: -den -e kadar", "Öğretmen sabahtan akşama kadar yolculuk ediyor.", "u4"],
  ["زَادَتْ أَسْعَارُ النِّفْطِ {عَنِ} العَامِ المَاضِي.", ["عَنِ", "فِي", "حَتَّى"], "-e göre (aşma): عَنْ", "Petrol fiyatları geçen yıla göre arttı.", "u4"],
  ["وَضَعَتِ الأُمُّ سَاعَتَهَا {عَلَى} المَكْتَبِ.", ["عَلَى", "مُنْذُ", "عَنِ"], "masanın üstüne: عَلَى", "Anne saatini masanın üstüne koydu.", "u4"],
  ["يَحْرِصُ المُسْلِمُ {عَلَى} الإِخْلَاصِ.", ["عَلَى", "مُنْذُ", "حَتَّى"], "حَرَصَ عَلَى: -e özen gösterdi", "Müslüman ihlâsa özen gösterir.", "u4"],
  ["أَكْمَلَ صَادِقٌ الدِّرَاسَةَ {مُنْذُ} سَنَتَيْنِ.", ["مُنْذُ", "عَلَى", "عَنْ"], "zaman: مُنْذُ", "Sâdık okulu iki yıl önce bitirdi.", "u5"],
  ["جَاءَ صَادِقٌ {مِنْ} مَدِينَةِ إِزْمِيرَ.", ["مِنْ", "عَلَى", "مُنْذُ"], "nereden: مِنْ", "Sâdık İzmir şehrinden geldi.", "u5"],
  ["يَذْهَبُ صَادِقٌ {إِلَى} المَسْجِدِ.", ["إِلَى", "عَنِ", "مُنْذُ"], "nereye: إِلَى", "Sâdık mescide gidiyor.", "u5"],
  ["يَسْتَمِعُ صَادِقٌ {إِلَى} أُسْتَاذِهِ.", ["إِلَى", "عَلَى", "مُنْذُ"], "اسْتَمَعَ إِلَى: dinledi", "Sâdık hocasını dinliyor.", "u5"],
  ["خَرَجَ مُرَادٌ {مِنَ} البَيْتِ.", ["مِنَ", "عَلَى", "حَتَّى"], "evden: مِنْ", "Murâd evden çıktı.", "u5"],
  ["نَظَرَ مُرَادٌ {إِلَى} المَعْرُوضَاتِ.", ["إِلَى", "مُنْذُ", "عَنِ"], "نَظَرَ إِلَى", "Murâd sergilenen mallara baktı.", "u5"],
  ["رَجَعَ مُرَادٌ {إِلَى} بَيْتِهِ.", ["إِلَى", "عَنْ", "مُنْذُ"], "nereye: إِلَى", "Murâd evine döndü.", "u5"]
];
// Harf mi? oyunu: [kelime, tür, Türkçe]
var HM_LIST = [
  ["مِنْ", "h", "-den"], ["إِلَى", "h", "-e"], ["عَلَى", "h", "üzerinde"], ["فِي", "h", "içinde"], ["عَنْ", "h", "hakkında"], ["حَتَّى", "h", "-e kadar"], ["مُنْذُ", "h", "-den beri"], ["بِـ", "h", "ile"], ["لِـ", "h", "için"], ["كَـ", "h", "gibi"],
  ["مَعَ", "i", "ile (zarf, isim)"], ["عِنْدَ", "i", "yanında (zarf)"], ["قَبْلَ", "i", "önce (zarf)"], ["بَعْدَ", "i", "sonra (zarf)"], ["فَوْقَ", "i", "üstünde (zarf)"], ["تَحْتَ", "i", "altında (zarf)"], ["أَمَامَ", "i", "önünde (zarf)"],
  ["بَيْتٌ", "i", "ev"], ["مَدْرَسَةٌ", "i", "okul"], ["الصَّبَاحُ", "i", "sabah"], ["قَلَمٌ", "i", "kalem"],
  ["ذَهَبَ", "f", "gitti"], ["جَلَسَ", "f", "oturdu"], ["يَكْتُبُ", "f", "yazıyor"], ["اُدْخُلْ", "f", "gir!"], ["رَجَعَ", "f", "döndü"], ["نَظَرَ", "f", "baktı"], ["سَأَلَ", "f", "sordu"]
];
var HAFIZA = {
  an: { name: "Harf ↔ anlam", pairs: HARF.map(function (h) { return [h.h, h.tr]; }) },
  soru: { name: "Soru ↔ harf", pairs: [["أَيْنَ؟", "فِي"], ["إِلَى أَيْنَ؟", "إِلَى"], ["مِنْ أَيْنَ؟", "مِنْ"], ["لِمَنْ؟", "لِـ"], ["عَنْ أَيِّ شَيْءٍ؟", "عَنْ"], ["مُنْذُ مَتَى؟", "مُنْذُ"], ["كَيْفَ؟ (alet)", "بِـ"], ["إِلَى مَتَى؟", "حَتَّى"]] },
  hal: { name: "Merfû ↔ mecrûr", pairs: [["البَيْتُ", "فِي البَيْتِ"], ["بَيْتٌ", "فِي بَيْتٍ"], ["القَلَمُ", "بِالقَلَمِ"], ["الصَّبَاحُ", "مُنْذُ الصَّبَاحِ"], ["السُّوقُ", "إِلَى السُّوقِ"], ["الأَسَدُ", "كَالأَسَدِ"], ["البَائِعُ", "لِلْبَائِعِ"], ["الدَّرْسُ", "عَنِ الدَّرْسِ"]] }
};
var KARTLAR = [
  ["Harf-i cer hangi kelimeye gelir?", "Yalnız isme: فِي الحَقِيبَةِ"],
  ["Harf-i cerden sonraki isim hangi halde?", "Mecrûr: البَيْتِ (esre), بَيْتٍ (iki esre)"],
  ["On harf-i cer?", "مِنْ، إِلَى، عَلَى، فِي، بِـ، لِـ، عَنْ، كَـ، حَتَّى، مُنْذُ"],
  ["Bitişik yazılan harf-i cerler?", "بِـ، لِـ، كَـ: بِالقَلَمِ، لِصَدِيقِهِ، كَالشَّايِ"],
  ["مِنْ + ال nasıl okunur?", "مِنَ: مِنَ النَّافِذَةِ"],
  ["عَنْ + ال nasıl okunur?", "عَنِ: عَنِ الدَّرْسِ"],
  ["لِـ + ال nasıl yazılır?", "لِلْـ: لِلْبَائِعِ (elif düşer)"],
  ["مُنْذُ ve حَتَّى farkı?", "مُنْذُ: -den beri (başlangıç) · حَتَّى: -e kadar (bitiş)"],
  ["مَعَ harf-i cer mi?", "Hayır, zarftır; ama sonraki isim yine mecrûr: مَعَ الأَصْدِقَاءِ"],
  ["كَيْفَ (alet) sorusunun cevabı?", "بِـ ile: بِالشَّوْكَةِ، بِالسَّيَّارَةِ"],
  ["قَرِيبٌ ve بَعِيدٌ hangi harfle?", "قَرِيبٌ مِنْ · بَعِيدٌ عَنْ"],
  ["İki mecrûr sebebi?", "Harf-i cerden sonra gelmek (فِي البَيْتِ) ve muzâfun ileyh olmak (بَابُ البَيْتِ)"]
];
