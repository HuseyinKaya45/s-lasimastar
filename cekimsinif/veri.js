// ================= VERİ: Ebvâb-ı Sitte · Zamirlerle Mâzi ve Muzâri Çekimi (sınıf programı) =================
// Altı bâb (ebvab/ programıyla aynı renk ve sıra)
var BAB = {
  n: { no: 1, ad: "Nasara", m: "a", u: "u", col: "cerr", ex: "نَصَرَ", mu: "يَنْصُرُ", k: "فَعَلَ يَفْعُلُ" },
  d: { no: 2, ad: "Daraba", m: "a", u: "i", col: "ref", ex: "ضَرَبَ", mu: "يَضْرِبُ", k: "فَعَلَ يَفْعِلُ" },
  f: { no: 3, ad: "Fetaha", m: "a", u: "a", col: "mz", ex: "فَتَحَ", mu: "يَفْتَحُ", k: "فَعَلَ يَفْعَلُ" },
  a: { no: 4, ad: "Alime", m: "i", u: "a", col: "nasb", ex: "عَلِمَ", mu: "يَعْلَمُ", k: "فَعِلَ يَفْعَلُ" },
  h: { no: 5, ad: "Hasune", m: "u", u: "u", col: "mi", ex: "حَسُنَ", mu: "يَحْسُنُ", k: "فَعُلَ يَفْعُلُ" },
  hs: { no: 6, ad: "Hasibe", m: "i", u: "i", col: "mun", ex: "حَسِبَ", mu: "يَحْسِبُ", k: "فَعِلَ يَفْعِلُ" }
};
var BKEYS = ["n", "d", "f", "a", "h", "hs"];
var HR = { a: "َ", i: "ِ", u: "ُ" };
var HR_KISA = { a: "üstün", i: "esre", u: "ötre" };
var BAB_NOT = {
  n: "Mâzide ayn üstün, muzâride ötre. En kalabalık bâblardan.",
  d: "Mâzide ayn üstün, muzâride esre.",
  f: "Mâzide ve muzâride ayn üstün. Ayn ya da lâm harfi boğaz harfidir: ء ه ع ح غ خ",
  a: "Mâzide ayn esre, muzâride üstün. Duygu ve hâl bildiren fiiller çoğu zaman buradadır.",
  h: "Mâzide ve muzâride ayn ötre. Kalıcı vasıf bildirir; hep lâzımdır.",
  hs: "Mâzide ve muzâride ayn esre. Sâlim fiili çok azdır; fiillerinin çoğu misâldir (وَرِثَ يَرِثُ)."
};

// Sâlim fiiller: [mâzi, muzâri, Türkçe, bâb] (illetli, mehmuz ve muzâaf fiiller çekimi değiştirdiği için alınmadı)
var FIILLER = [
  ["نَصَرَ", "يَنْصُرُ", "yardım etti", "n"], ["كَتَبَ", "يَكْتُبُ", "yazdı", "n"], ["دَخَلَ", "يَدْخُلُ", "girdi", "n"], ["خَرَجَ", "يَخْرُجُ", "çıktı", "n"],
  ["شَكَرَ", "يَشْكُرُ", "şükretti", "n"], ["ذَكَرَ", "يَذْكُرُ", "andı", "n"], ["عَبَدَ", "يَعْبُدُ", "ibadet etti", "n"], ["طَلَبَ", "يَطْلُبُ", "istedi", "n"],
  ["تَرَكَ", "يَتْرُكُ", "bıraktı", "n"], ["حَضَرَ", "يَحْضُرُ", "hazır bulundu", "n"], ["سَجَدَ", "يَسْجُدُ", "secde etti", "n"], ["نَظَرَ", "يَنْظُرُ", "baktı", "n"],
  ["دَرَسَ", "يَدْرُسُ", "ders çalıştı", "n"], ["قَعَدَ", "يَقْعُدُ", "oturdu", "n"], ["حَكَمَ", "يَحْكُمُ", "hükmetti", "n"], ["رَزَقَ", "يَرْزُقُ", "rızık verdi", "n"],
  ["ضَرَبَ", "يَضْرِبُ", "vurdu", "d"], ["جَلَسَ", "يَجْلِسُ", "oturdu", "d"], ["رَجَعَ", "يَرْجِعُ", "döndü", "d"], ["غَسَلَ", "يَغْسِلُ", "yıkadı", "d"],
  ["نَزَلَ", "يَنْزِلُ", "indi", "d"], ["صَبَرَ", "يَصْبِرُ", "sabretti", "d"], ["عَرَفَ", "يَعْرِفُ", "tanıdı", "d"], ["حَمَلَ", "يَحْمِلُ", "taşıdı", "d"],
  ["غَفَرَ", "يَغْفِرُ", "bağışladı", "d"], ["كَسَبَ", "يَكْسِبُ", "kazandı", "d"], ["مَلَكَ", "يَمْلِكُ", "sahip oldu", "d"], ["كَسَرَ", "يَكْسِرُ", "kırdı", "d"], ["هَبَطَ", "يَهْبِطُ", "indi", "d"],
  ["فَتَحَ", "يَفْتَحُ", "açtı", "f"], ["ذَهَبَ", "يَذْهَبُ", "gitti", "f"], ["جَعَلَ", "يَجْعَلُ", "kıldı, yaptı", "f"], ["مَنَعَ", "يَمْنَعُ", "engelledi", "f"],
  ["زَرَعَ", "يَزْرَعُ", "ekti", "f"], ["جَمَعَ", "يَجْمَعُ", "topladı", "f"], ["نَفَعَ", "يَنْفَعُ", "fayda verdi", "f"], ["بَعَثَ", "يَبْعَثُ", "gönderdi", "f"],
  ["نَجَحَ", "يَنْجَحُ", "başardı", "f"], ["ذَبَحَ", "يَذْبَحُ", "kesti", "f"], ["رَكَعَ", "يَرْكَعُ", "rükû etti", "f"], ["دَفَعَ", "يَدْفَعُ", "itti, ödedi", "f"],
  ["طَبَخَ", "يَطْبَخُ", "pişirdi", "f"], ["صَنَعَ", "يَصْنَعُ", "yaptı", "f"], ["شَرَحَ", "يَشْرَحُ", "açıkladı", "f"], ["بَحَثَ", "يَبْحَثُ", "araştırdı", "f"],
  ["عَلِمَ", "يَعْلَمُ", "bildi", "a"], ["فَهِمَ", "يَفْهَمُ", "anladı", "a"], ["شَرِبَ", "يَشْرَبُ", "içti", "a"], ["سَمِعَ", "يَسْمَعُ", "duydu", "a"],
  ["فَرِحَ", "يَفْرَحُ", "sevindi", "a"], ["حَزِنَ", "يَحْزَنُ", "üzüldü", "a"], ["لَعِبَ", "يَلْعَبُ", "oynadı", "a"], ["رَكِبَ", "يَرْكَبُ", "bindi", "a"],
  ["عَمِلَ", "يَعْمَلُ", "çalıştı", "a"], ["حَفِظَ", "يَحْفَظُ", "ezberledi", "a"], ["حَمِدَ", "يَحْمَدُ", "hamdetti", "a"], ["ضَحِكَ", "يَضْحَكُ", "güldü", "a"],
  ["تَعِبَ", "يَتْعَبُ", "yoruldu", "a"], ["غَضِبَ", "يَغْضَبُ", "kızdı", "a"], ["رَحِمَ", "يَرْحَمُ", "merhamet etti", "a"], ["صَعِدَ", "يَصْعَدُ", "yukarı çıktı", "a"], ["قَبِلَ", "يَقْبَلُ", "kabul etti", "a"],
  ["حَسُنَ", "يَحْسُنُ", "güzel oldu", "h"], ["كَرُمَ", "يَكْرُمُ", "cömert oldu", "h"], ["كَبُرَ", "يَكْبُرُ", "büyük oldu", "h"], ["صَغُرَ", "يَصْغُرُ", "küçük oldu", "h"],
  ["كَثُرَ", "يَكْثُرُ", "çoğaldı", "h"], ["قَرُبَ", "يَقْرُبُ", "yakın oldu", "h"], ["بَعُدَ", "يَبْعُدُ", "uzak oldu", "h"], ["شَرُفَ", "يَشْرُفُ", "şerefli oldu", "h"],
  ["عَظُمَ", "يَعْظُمُ", "büyük oldu", "h"], ["سَهُلَ", "يَسْهُلُ", "kolay oldu", "h"], ["صَعُبَ", "يَصْعُبُ", "zor oldu", "h"], ["ثَقُلَ", "يَثْقُلُ", "ağır oldu", "h"], ["شَجُعَ", "يَشْجُعُ", "cesur oldu", "h"],
  ["حَسِبَ", "يَحْسِبُ", "sandı", "hs"], ["نَعِمَ", "يَنْعِمُ", "nimet içinde yaşadı", "hs"]
].map(function (x, i) { return { i: i, m: x[0], u: x[1], tr: x[2], b: x[3], ms: x[0].slice(0, -1), us: x[1].slice(2, -1) }; });
var BAB_ORNEK = { n: 0, d: 16, f: 29, a: 45, h: 62, hs: 75 };

// 14 hücre (geleneksel tasrif sırası): [satır, sütun, etiket, munfasıl zamir, Türkçe]
var CELLS = [
  [0, 0, "Gâib · tekil", "هُوَ", "o (erkek)"], [0, 1, "Gâib · ikil", "هُمَا", "o ikisi (erkek)"], [0, 2, "Gâib · çoğul", "هُمْ", "onlar (erkek)"],
  [1, 0, "Gâibe · tekil", "هِيَ", "o (kadın)"], [1, 1, "Gâibe · ikil", "هُمَا", "o ikisi (kadın)"], [1, 2, "Gâibe · çoğul", "هُنَّ", "onlar (kadın)"],
  [2, 0, "Muhatab · tekil", "أَنْتَ", "sen (erkek)"], [2, 1, "Muhatab · ikil", "أَنْتُمَا", "siz ikiniz (erkek)"], [2, 2, "Muhatab · çoğul", "أَنْتُمْ", "siz (erkek)"],
  [3, 0, "Muhataba · tekil", "أَنْتِ", "sen (kadın)"], [3, 1, "Muhataba · ikil", "أَنْتُمَا", "siz ikiniz (kadın)"], [3, 2, "Muhataba · çoğul", "أَنْتُنَّ", "siz (kadın)"],
  [4, 0, "Mütekellim · tekil", "أَنَا", "ben"], [4, 1, "Mütekellim · ikil ve çoğul", "نَحْنُ", "biz"]
];
var CROWS = [["Gâib", "الغَائِبُ"], ["Gâibe", "الغَائِبَةُ"], ["Muhatab", "المُخَاطَبُ"], ["Muhataba", "المُخَاطَبَةُ"], ["Mütekellim", "المُتَكَلِّمُ"]];
var SAYI = ["tekil", "ikil", "çoğul"];
// ekler · tür: "" gövde sonu, "z" ref zamiri, "t" te'nîs tâsı, "m" muzâri harfi, "n" i'râb nûnu
var MZ_SUF = [
  [["َ", ""]], [["َ", ""], ["ا", "z"]], [["ُ", ""], ["و", "z"], ["ا", ""]],
  [["َ", ""], ["تْ", "t"]], [["َ", ""], ["تَ", "t"], ["ا", "z"]], [["ْ", ""], ["نَ", "z"]],
  [["ْ", ""], ["تَ", "z"]], [["ْ", ""], ["تُ", "z"], ["مَا", ""]], [["ْ", ""], ["تُ", "z"], ["مْ", ""]],
  [["ْ", ""], ["تِ", "z"]], [["ْ", ""], ["تُ", "z"], ["مَا", ""]], [["ْ", ""], ["تُ", "z"], ["نَّ", ""]],
  [["ْ", ""], ["تُ", "z"]], [["ْ", ""], ["نَا", "z"]]
];
var MU_PRE = ["ي", "ي", "ي", "ت", "ت", "ي", "ت", "ت", "ت", "ت", "ت", "ت", "أ", "ن"];
var MU_SUF = [
  [["ُ", ""]], [["َ", ""], ["ا", "z"], ["نِ", "n"]], [["ُ", ""], ["و", "z"], ["نَ", "n"]],
  [["ُ", ""]], [["َ", ""], ["ا", "z"], ["نِ", "n"]], [["ْ", ""], ["نَ", "z"]],
  [["ُ", ""]], [["َ", ""], ["ا", "z"], ["نِ", "n"]], [["ُ", ""], ["و", "z"], ["نَ", "n"]],
  [["ِ", ""], ["ي", "z"], ["نَ", "n"]], [["َ", ""], ["ا", "z"], ["نِ", "n"]], [["ْ", ""], ["نَ", "z"]],
  [["ُ", ""]], [["ُ", ""]]
];
// ref zamirinin adı (hücreye göre)
var ZAMIR = { tu: "Hareke alan tâ", elif: "İkil elifi", vav: "Çoğul vavı", ya: "Muhataba yâsı", nun: "Kadınlar nûnu", na: "Biz nâsı", gizli: "Gizli zamir" };
var MZ_Z = ["gizli", "elif", "vav", "gizli", "elif", "nun", "tu", "tu", "tu", "tu", "tu", "tu", "tu", "na"];
var MU_Z = ["gizli", "elif", "vav", "gizli", "elif", "nun", "gizli", "elif", "vav", "ya", "elif", "nun", "gizli", "gizli"];
// karışan hücreler (seçenek üretmek için)
var DIS = { 0: [3, 2, 6], 1: [2, 4, 7], 2: [1, 5, 8], 3: [0, 6, 4], 4: [1, 5, 10], 5: [2, 13, 11], 6: [12, 9, 3], 7: [1, 8, 4], 8: [2, 11, 7], 9: [6, 3, 12], 10: [4, 11, 1], 11: [5, 8, 13], 12: [6, 3, 13], 13: [5, 2, 12] };

// Harfleri harekeleriyle ayır
function harfler(w) { return w.match(/[^ً-ْ][ً-ْ]*/g) || []; }
// Gövde + ek; ن ya da ت ile biten gövdeye aynı harfle başlayan sâkin ek gelince idğam: حَسُنَّ، حَسُنَّا
function cj(v, mode, i, aynOver) {
  var st = mode === "m" ? v.ms : v.us;
  if (aynOver) { var g = harfler(st); g[1] = g[1].replace(/[َُِ]/, HR[aynOver]); st = g.join(""); }
  var suf = (mode === "m" ? MZ_SUF : MU_SUF)[i].map(function (p) { return p.slice(); });
  var last = st.charAt(st.length - 1);
  if ((last === "ن" || last === "ت") && suf[0][0] === "ْ" && suf[1] && suf[1][0].charAt(0) === last) {
    st = st.slice(0, -1); suf = [[last + "ّ" + suf[1][0].slice(1), suf[1][1]]].concat(suf.slice(2));
  }
  var parts = [[st, "s"]].concat(suf);
  if (mode === "u") parts.unshift([MU_PRE[i] + "َ", "m"]);
  return parts;
}
function cjText(v, mode, i, aynOver) { return cj(v, mode, i, aynOver).map(function (p) { return p[0]; }).join(""); }
function zamirOf(mode, i) { return (mode === "m" ? MZ_Z : MU_Z)[i]; }
