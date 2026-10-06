// ================= VERİ: Haber Çeşitleri (أَنْوَاعُ الخَبَرِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "المُبْتَدَأُ", tr: "Mübtedâ" }, nasb: { ar: "الخَبَرُ", tr: "Haber" }, mz: { ar: "الرَّابِطُ", tr: "Râbıt zamir" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// Haber türleri
var TUR4 = [["m", "Müfred", "مُفْرَدٌ", "cerr"], ["i", "İsim cümlesi", "جُمْلَةٌ اسْمِيَّةٌ", "nasb"], ["f", "Fiil cümlesi", "جُمْلَةٌ فِعْلِيَّةٌ", "mi"], ["s", "Şibh-i cümle", "شِبْهُ جُمْلَةٍ", "mz"]];
var TUR_TR = { m: "Müfred", i: "İsim cümlesi", f: "Fiil cümlesi", s: "Şibh-i cümle" };
// Haber makinesi: mübtedâ, Türkçesi, [müfred, isim cümlesi, fiil cümlesi, câr-mecrûr, zarf] → [haber, râbıt / alâmet, Türkçe]
var HM = [
  ["الطِّفْلُ", "çocuk", [["سَعِيدٌ", "Alâmet: damme (müfred)", "Çocuk mutludur."], ["وَجْهُهُ مُبْتَسِمٌ", "Râbıt: هُ (وَجْهُهُ)", "Çocuğun yüzü gülümsüyor."], ["يَلْعَبُ فِي الحَدِيقَةِ", "Râbıt: fiildeki gizli zamir (هُوَ)", "Çocuk bahçede oynuyor."], ["فِي الحَدِيقَةِ", "Câr ve mecrûr", "Çocuk bahçede."], ["أَمَامَ البَيْتِ", "Zarf", "Çocuk evin önünde."]]],
  ["الطَّالِبَانِ", "iki öğrenci", [["طَوِيلَانِ", "Alâmet: elif (müsennâ)", "İki öğrenci uzun boylu."], ["قَامَتُهُمَا طَوِيلَةٌ", "Râbıt: هُمَا (قَامَتُهُمَا)", "İki öğrencinin boyu uzun."], ["يَدْرُسَانِ فِي المَكْتَبَةِ", "Râbıt: elif (يَدْرُسَانِ)", "İki öğrenci kütüphanede ders çalışıyor."], ["فِي المَكْتَبَةِ", "Câr ve mecrûr", "İki öğrenci kütüphanede."], ["عِنْدَ الأُسْتَاذِ", "Zarf", "İki öğrenci hocanın yanında."]]],
  ["المُهَنْدِسُونَ", "mühendisler", [["نَشِيطُونَ", "Alâmet: vâv (cem-i müzekker sâlim)", "Mühendisler çalışkan."], ["عَمَلُهُمْ دَقِيقٌ", "Râbıt: هُمْ (عَمَلُهُمْ)", "Mühendislerin işi titiz."], ["يَبْنُونَ الجِسْرَ", "Râbıt: vâv (يَبْنُونَ)", "Mühendisler köprüyü inşa ediyor."], ["فِي المَصْنَعِ", "Câr ve mecrûr", "Mühendisler fabrikada."], ["فَوْقَ الجِسْرِ", "Zarf", "Mühendisler köprünün üstünde."]]],
  ["المُعَلِّمَاتُ", "kadın öğretmenler", [["غَائِبَاتٌ", "Alâmet: damme (cem-i müennes sâlim)", "Öğretmenler (kadın) yok."], ["دُرُوسُهُنَّ مُفِيدَةٌ", "Râbıt: هُنَّ (دُرُوسُهُنَّ)", "Öğretmenlerin dersleri faydalı."], ["يُجَهِّزْنَ الدُّرُوسَ", "Râbıt: nûn (يُجَهِّزْنَ)", "Öğretmenler dersleri hazırlıyor."], ["فِي الفَصْلِ", "Câr ve mecrûr", "Öğretmenler sınıfta."], ["بَيْنَ الطَّالِبَاتِ", "Zarf", "Öğretmenler kız öğrencilerin arasında."]]],
  ["القَرْيَةُ", "köy", [["جَمِيلَةٌ", "Alâmet: damme (müfred)", "Köy güzel."], ["هَوَاؤُهَا نَقِيٌّ", "Râbıt: هَا (هَوَاؤُهَا)", "Köyün havası temiz."], ["تَقَعُ قُرْبَ البَحْرِ", "Râbıt: fiildeki gizli zamir (هِيَ)", "Köy denizin yakınında bulunuyor."], ["عَلَى الجَبَلِ", "Câr ve mecrûr", "Köy dağın üstünde."], ["وَرَاءَ النَّهْرِ", "Zarf", "Köy nehrin ötesinde."]]],
  ["العِلْمُ", "ilim", [["نُورٌ", "Alâmet: damme (müfred)", "İlim nurdur."], ["نَتَائِجُهُ مُفِيدَةٌ", "Râbıt: هُ (نَتَائِجُهُ)", "İlmin sonuçları faydalıdır."], ["يَرْفَعُ صَاحِبَهُ", "Râbıt: fiildeki gizli zamir (هُوَ)", "İlim sahibini yükseltir."], ["فِي الصُّدُورِ", "Câr ve mecrûr", "İlim göğüslerdedir."], ["عِنْدَ العُلَمَاءِ", "Zarf", "İlim âlimlerin yanındadır."]]]
];
var HM_T = [["Müfred", "مُفْرَدٌ", "m"], ["İsim cümlesi", "جُمْلَةٌ اسْمِيَّةٌ", "i"], ["Fiil cümlesi", "جُمْلَةٌ فِعْلِيَّةٌ", "f"], ["Câr-mecrûr", "جَارٌّ وَمَجْرُورٌ", "s"], ["Zarf", "ظَرْفٌ", "s"]];

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CBP(parts, i, tr, why) {
  var p = [], ok = [], si = 0;
  parts.forEach(function (x) { if (typeof x === "string") p.push(x); else { var r = ROT(x, i + si++); p.push(r); ok.push(r.a); } });
  return { q: "", p: p, ok: [ok], tr: tr, why: why };
}
// Haberi ve türünü seç: [cümle, doğru haber, y1, y2, tür, Türkçe, açıklama]
function TB(x, n) {
  var others = ["m", "i", "f", "s"].filter(function (k) { return k !== x[4]; }), w = [others[n % 3], others[(n + 1) % 3]];
  return CBP([x[0] + " ← Haber:", [x[1], x[2], x[3]], "· Türü:", [TUR_TR[x[4]], TUR_TR[w[0]], TUR_TR[w[1]]]], n, x[5], x[6]);
}

var UNITS = [
// ---------------------------------------------------------------- 1 · MÜBTEDÂ VE HABER
{
  id: "u1", no: 1, ar: "المُبْتَدَأُ وَالخَبَرُ", tr: "Mübtedâ, Haber ve Haberin Türleri", short: "Türler", col: "cerr", legend: ["cerr", "nasb"],
  goals: ["İsim cümlesinin iki temel öğesini hatırlamak: mübtedâ ve haber, ikisi de merfû", "Haberin üç türünü tanımak: müfred, cümle (isim / fiil), şibh-i cümle", "Haberi bulup türünü söylemek: النِّيَّةُ مَحَلُّهَا القَلْبُ ← isim cümlesi"],
  examples: [
    { s: "المُعَلِّمُ:cerr / رَحِيمٌ.:nasb", tr: "Öğretmen merhametlidir. (müfred haber)" },
    { s: "العِلْمُ:cerr / نَتَائِجُهُ مُفِيدَةٌ.:nasb", tr: "İlmin sonuçları faydalıdır. (isim cümlesi)", pair: "الطِّفْلُ:cerr / يَلْعَبُ فِي الحَدِيقَةِ.:nasb", pairTr: "Çocuk bahçede oynuyor. (fiil cümlesi)" },
    { s: "هَلَاكُ المَرْءِ:cerr / فِي الكِبْرِ.:nasb", tr: "Kişinin helâki kibirdedir. (câr-mecrûr)", pair: "الأَزْهَارُ:cerr / فَوْقَ المِنْضَدَةِ.:nasb", pairTr: "Çiçekler masanın üstünde. (zarf)" }
  ],
  rules: [
    { tr: "İsim cümlesi iki temel öğeden kurulur: <b class=\"r-cerr\">mübtedâ</b> (<span class=\"ar\">المُبْتَدَأُ</span>) ve <b class=\"r-nasb\">haber</b> (<span class=\"ar\">الخَبَرُ</span>). İkisi de <b>merfû</b>dur: <span class=\"ar\">المُعَلِّمُ رَحِيمٌ</span>." },
    { tr: "Haber üç türlü gelir:", ex: ["Müfred (مُفْرَدٌ): المُعَلِّمُ رَحِيمٌ", "Cümle (جُمْلَةٌ): isim cümlesi العِلْمُ نَتَائِجُهُ مُفِيدَةٌ · fiil cümlesi الطِّفْلُ يَلْعَبُ", "Şibh-i cümle (شِبْهُ جُمْلَةٍ): câr-mecrûr هَلَاكُ المَرْءِ فِي الكِبْرِ · zarf الأَزْهَارُ فَوْقَ المِنْضَدَةِ"] },
    { tr: "Haberi bulmak için mübtedâdan sonra “ne?” diye sor; haber bazen tek kelime, bazen bütün bir cümledir: <span class=\"ar\">النِّيَّةُ <b>مَحَلُّهَا القَلْبُ</b></span>." },
    { tr: "Haberden sonra gelen sıfat ya da câr-mecrûr haberin parçası değil, ona bağlı tamamlayıcıdır: <span class=\"ar\">الطُّلَّابُ <b>نَشِيطُونَ</b> فِي الجَامِعَةِ</span>." }
  ],
  kaide: [
    "مُلَاحَظَةٌ: الجُمْلَةُ الاسْمِيَّةُ تَتَكَوَّنُ مِنْ رُكْنَيْنِ أَسَاسِيَّيْنِ هُمَا: «المُبْتَدَأُ وَالخَبَرُ»، وَالمُبْتَدَأُ وَالخَبَرُ دَائِمًا مَرْفُوعَانِ، وَعَلَامَةُ الرَّفْعِ فِي الاسْمِ المُفْرَدِ «الضَّمَّةُ»، مِثْلُ: المُعَلِّمُ رَحِيمٌ.",
    "١ ـ الخَبَرُ ثَلَاثَةُ أَنْوَاعٍ: أ ـ مُفْرَدٌ. ب ـ جُمْلَةٌ (اسْمِيَّةٌ أَوْ فِعْلِيَّةٌ). جـ ـ شِبْهُ جُمْلَةٍ (جَارٌّ وَمَجْرُورٌ أَوْ ظَرْفٌ)."
  ],
  ex: [
    { type: "tag", roles: ["cerr", "nasb", "x"], num: "١", ar: "عَيِّنِ المُبْتَدَأَ وَالخَبَرَ فِي الجُمَلِ التَّالِيَةِ", tr: "Kelime gruplarına dokunarak Mübtedâ, Haber ya da Başka diye etiketle.", items: [
      T("شَوَّالٌ:cerr / شَهْرٌ:nasb / يَأْتِي بَعْدَ رَمَضَانَ.:x", "Şevval, Ramazan’dan sonra gelen bir aydır.", "Haber: شَهْرٌ (müfred); يَأْتِي بَعْدَ رَمَضَانَ onun sıfatıdır."),
      T("المَطَرُ:cerr / مَاؤُهُ نَظِيفٌ.:nasb", "Yağmurun suyu temizdir.", "Haber isim cümlesi: مَاؤُهُ نَظِيفٌ (râbıt: هُ)."),
      T("المَوْزُ:cerr / فَاكِهَةٌ:nasb / طَعْمُهَا لَذِيذٌ.:x", "Muz, tadı lezzetli bir meyvedir.", "Haber: فَاكِهَةٌ (müfred); طَعْمُهَا لَذِيذٌ onun sıfatı."),
      T("الحَمَامَةُ:cerr / عَلَى الغُصْنِ.:nasb", "Güvercin dalın üstünde.", "Haber şibh-i cümle (câr-mecrûr)."),
      T("الشُّرْطَةُ:cerr / تُحَافِظُ عَلَى الأَمْنِ.:nasb", "Polis güvenliği korur.", "Haber fiil cümlesi (râbıt: gizli هِيَ)."),
      T("القِطَارُ:cerr / سُرْعَتُهُ عَالِيَةٌ.:nasb", "Trenin hızı yüksektir.", "Haber isim cümlesi (râbıt: هُ)."),
      T("الطُّلَّابُ:cerr / نَشِيطُونَ:nasb / فِي الجَامِعَةِ.:x", "Öğrenciler üniversitede çalışkandır.", "Haber: نَشِيطُونَ (müfred, vâvla merfû)."),
      T("المَطَرُ:cerr / غَزِيرٌ:nasb / فِي إِسْطَنْبُولَ.:x", "İstanbul’da yağmur boldur.", "Haber: غَزِيرٌ (müfred).")
    ]},
    { type: "combo", num: "٢", ar: "عَيِّنِ الخَبَرَ ثُمَّ بَيِّنْ نَوْعَهُ", tr: "Önce haberi, sonra türünü seç.", exHtml: "<span class=\"ar\">الحَاسُوبُ فَوَائِدُهُ أَكْثَرُ مِنْ أَضْرَارِهِ ← فَوَائِدُهُ أَكْثَرُ مِنْ أَضْرَارِهِ: جُمْلَةٌ اسْمِيَّةٌ</span>", items: [
      ["النِّيَّةُ مَحَلُّهَا القَلْبُ.", "مَحَلُّهَا القَلْبُ", "القَلْبُ", "مَحَلُّهَا", "i", "Niyetin yeri kalptir.", "Haber isim cümlesi: مَحَلُّهَا القَلْبُ (râbıt: هَا)."],
      ["الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ.", "تَحْتَ أَقْدَامِ الأُمَّهَاتِ", "أَقْدَامِ الأُمَّهَاتِ", "الأُمَّهَاتِ", "s", "Cennet annelerin ayakları altındadır.", "Şibh-i cümle: zarf (تَحْتَ)."],
      ["الصَّبْرُ عِنْدَ الصَّدْمَةِ الأُولَى.", "عِنْدَ الصَّدْمَةِ الأُولَى", "الصَّدْمَةِ الأُولَى", "الأُولَى", "s", "Sabır, ilk sarsıntı anındadır. (Hadis)", "Şibh-i cümle: zarf (عِنْدَ)."],
      ["الجَهْلُ عَاقِبَتُهُ وَخِيمَةٌ.", "عَاقِبَتُهُ وَخِيمَةٌ", "وَخِيمَةٌ", "عَاقِبَتُهُ", "i", "Cehaletin sonu kötüdür.", "İsim cümlesi (râbıt: هُ)."],
      ["المُؤْمِنُ يَتَوَكَّلُ عَلَى اللهِ.", "يَتَوَكَّلُ عَلَى اللهِ", "عَلَى اللهِ", "اللهِ", "f", "Mü’min Allah’a tevekkül eder.", "Fiil cümlesi (râbıt: gizli هُوَ)."],
      ["المُصَلُّونَ جَالِسُونَ فِي المَسْجِدِ.", "جَالِسُونَ", "فِي المَسْجِدِ", "المَسْجِدِ", "m", "Namaz kılanlar camide oturuyor.", "Müfred haber: جَالِسُونَ (vâvla merfû); فِي المَسْجِدِ ona bağlı."],
      ["السُّيَّاحُ يَنْتَظِرُونَ أَمَامَ المَتْحَفِ.", "يَنْتَظِرُونَ أَمَامَ المَتْحَفِ", "أَمَامَ المَتْحَفِ", "المَتْحَفِ", "f", "Turistler müzenin önünde bekliyor.", "Fiil cümlesi (râbıt: vâv)."],
      ["الطَّائِرَةُ سُرْعَتُهَا عَالِيَةٌ.", "سُرْعَتُهَا عَالِيَةٌ", "عَالِيَةٌ", "سُرْعَتُهَا", "i", "Uçağın hızı yüksektir.", "İsim cümlesi (râbıt: هَا)."]
    ].map(TB) },
    { type: "classify", extra: true, opts: TUR4, ar: "مَا نَوْعُ الخَبَرِ؟", tr: "Koyu yazılan haber hangi türden?", items: [
      [HL("المُعَلِّمُ رَحِيمٌ", "رَحِيمٌ"), "m", "Tek kelime: müfred."], [HL("القَرْيَةُ هَوَاؤُهَا نَقِيٌّ", "هَوَاؤُهَا نَقِيٌّ"), "i", "Mübtedâ + haber: isim cümlesi."],
      [HL("الطَّالِبَاتُ يُجَهِّزْنَ حَقَائِبَهُنَّ", "يُجَهِّزْنَ حَقَائِبَهُنَّ"), "f", "Fiille başlıyor: fiil cümlesi."], [HL("هَلَاكُ المَرْءِ فِي الكِبْرِ", "فِي الكِبْرِ"), "s", "Câr-mecrûr: şibh-i cümle."],
      [HL("الأَزْهَارُ فَوْقَ المِنْضَدَةِ", "فَوْقَ المِنْضَدَةِ"), "s", "Zarf: şibh-i cümle."], [HL("الطَّالِبَانِ طَوِيلَانِ", "طَوِيلَانِ"), "m", "Müsennâ ama tek kelime: müfred."],
      [HL("المُهَنْدِسُونَ نَشِيطُونَ", "نَشِيطُونَ"), "m", "Cemi ama tek kelime: müfred."], [HL("العِلْمُ نَتَائِجُهُ مُفِيدَةٌ", "نَتَائِجُهُ مُفِيدَةٌ"), "i", "İsim cümlesi."],
      [HL("الطِّفْلُ يَلْعَبُ فِي الحَدِيقَةِ", "يَلْعَبُ فِي الحَدِيقَةِ"), "f", "Fiil cümlesi."], [HL("المُعَلِّمَاتُ غَائِبَاتٌ", "غَائِبَاتٌ"), "m", "Müfred."]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }) }
  ]
},
// ---------------------------------------------------------------- 2 · MÜFRED HABER
{
  id: "u2", no: 2, ar: "الخَبَرُ المُفْرَدُ", tr: "Müfred Haber", short: "Müfred", col: "nasb", legend: ["cerr", "nasb"],
  goals: ["“Müfred haber”in tekil demek olmadığını bilmek: cümle ve şibh-i cümle olmayan haber", "Alâmet-i ref’i bilmek: damme (müfred, cem-i müennes), elif (müsennâ), vâv (cem-i müzekker)", "Haberi mübtedâya sayı ve cinsiyette uydurmak; cümle haberi müfrede çevirmek"],
  examples: [
    { s: "الطَّالِبَانِ:cerr / طَوِيلَانِ.:nasb", tr: "İki öğrenci uzun boylu. (elif)", pair: "المُهَنْدِسُونَ:cerr / نَشِيطُونَ.:nasb", pairTr: "Mühendisler çalışkan. (vâv)" },
    { s: "المُعَلِّمَاتُ:cerr / غَائِبَاتٌ.:nasb", tr: "Kadın öğretmenler yok. (damme)" }
  ],
  rules: [
    { tr: "Buradaki <b>müfred</b>, “tekil” değil, <b>cümle ya da şibh-i cümle olmayan</b> haber demektir. <span class=\"ar\">طَوِيلَانِ، نَشِيطُونَ، غَائِبَاتٌ</span> hepsi müfred haberdir." },
    { tr: "Müfred haber <b>lafzan merfû</b>dur; alâmeti sonunda görünür:", ex: ["Damme: المُعَلِّمُ رَحِيمٌ · المُعَلِّمَاتُ غَائِبَاتٌ", "Elif: الطَّالِبَانِ طَوِيلَانِ (müsennâ)", "Vâv: المُهَنْدِسُونَ نَشِيطُونَ (cem-i müzekker sâlim)"] },
    { tr: "Müfred haber mübtedâya sayı ve cinsiyette uyar; akılsız çoğulun haberi müfred müennes olur: <span class=\"ar\">الكُتُبُ مُفِيدَةٌ</span>." },
    { tr: "Cümle haber müfrede çevrilince fiil ism-i fâile döner: <span class=\"ar\">السَّائِقُ يُسْرِعُ ← السَّائِقُ مُسْرِعٌ</span>; isim cümlesi izafete döner: <span class=\"ar\">الحَقِيبَةُ وَزْنُهَا ثَقِيلٌ ← الحَقِيبَةُ ثَقِيلَةُ الوَزْنِ</span>." }
  ],
  kaide: ["أ ـ مُفْرَدٌ: وَمَعْنَى «المُفْرَدِ» هُنَا أَلَّا يَكُونَ الخَبَرُ جُمْلَةً أَوْ شِبْهَ جُمْلَةٍ. وَيَكُونُ مَرْفُوعًا فِي الاسْمِ المُفْرَدِ وَجَمْعِ المُؤَنَّثِ السَّالِمِ بِـ«الضَّمَّةِ»، وَفِي التَّثْنِيَةِ بِـ«الأَلِفِ»، وَفِي جَمْعِ المُذَكَّرِ السَّالِمِ بِـ«الوَاوِ». وَيَكُونُ مَرْفُوعًا «لَفْظًا»."],
  ex: [
    { type: "pick", fill: true, num: "٤", ar: "حَوِّلِ «الخَبَرَ الجُمْلَةَ» إِلَى «خَبَرٍ مُفْرَدٍ»", tr: "Cümle haberi müfred habere çevir: fiil ism-i fâile, isim cümlesi izafete döner.", exHtml: "<span class=\"ar\">السَّائِقُ يُسْرِعُ فِي سَيْرِهِ ← السَّائِقُ مُسْرِعٌ فِي سَيْرِهِ.</span>", items: PL([
      ["السَّفِينَةُ تَنْتَظِرُ الرُّكَّابَ عَلَى الشَّاطِئِ. ← السَّفِينَةُ ___ الرُّكَّابَ عَلَى الشَّاطِئِ.", "مُنْتَظِرَةٌ", "مُنْتَظِرٌ", "مُنْتَظَرَةٌ", "Gemi sahilde yolcuları bekliyor.", "تَنْتَظِرُ ← ism-i fâil مُنْتَظِرَةٌ (müennes)."],
      ["الفُنْدُقُ يَقَعُ عَلَى شَاطِئِ البَحْرِ. ← الفُنْدُقُ ___ عَلَى شَاطِئِ البَحْرِ.", "وَاقِعٌ", "وَاقِعَةٌ", "مَوْقُوعٌ", "Otel deniz kıyısında bulunuyor.", "يَقَعُ ← وَاقِعٌ."],
      ["السَّعَادَةُ تَنْبُعُ مِنْ رُوحِ الإِنْسَانِ. ← السَّعَادَةُ ___ مِنْ رُوحِ الإِنْسَانِ.", "نَابِعَةٌ", "نَابِعٌ", "مَنْبُوعَةٌ", "Mutluluk insanın ruhundan kaynaklanır.", "تَنْبُعُ ← نَابِعَةٌ."],
      ["المُسْلِمُ يُحِبُّ اللهَ وَرَسُولَهُ. ← المُسْلِمُ ___ لِلهِ وَرَسُولِهِ.", "مُحِبٌّ", "مَحْبُوبٌ", "مُحِبَّةٌ", "Müslüman Allah’ı ve Resûlünü sever.", "يُحِبُّ ← ism-i fâil مُحِبٌّ (sevilen değil, seven)."],
      ["الشَّبَابُ يَسْبَحُونَ فِي مَسْبَحِ الجَامِعَةِ. ← الشَّبَابُ ___ فِي مَسْبَحِ الجَامِعَةِ.", "سَابِحُونَ", "سَابِحٌ", "سَابِحِينَ", "Gençler üniversitenin havuzunda yüzüyor.", "Akıllı çoğul: سَابِحُونَ (vâvla merfû)."],
      ["الكُلِّيَّةُ عَمِيدُهَا عَادِلٌ فِي كُلِّ الأُمُورِ. ← الكُلِّيَّةُ ___ عَمِيدُهَا فِي كُلِّ الأُمُورِ.", "عَادِلٌ", "عَادِلَةٌ", "عَادِلًا", "Fakültenin dekanı her işte adildir.", "Haber عَادِلٌ; arkasındaki عَمِيدُهَا onun fâili olduğu için haber müzekker kalır."],
      ["السَّيَّارَةُ أَبْوَابُهَا مُغْلَقَةٌ. ← السَّيَّارَةُ ___.", "مُغْلَقَةُ الأَبْوَابِ", "مُغْلَقُ الأَبْوَابِ", "مُغْلَقَةٌ الأَبْوَابَ", "Arabanın kapıları kapalı.", "İsim cümlesi → izafet: مُغْلَقَةُ الأَبْوَابِ (mübtedâya uyar: müennes)."],
      ["الحَقِيبَةُ وَزْنُهَا ثَقِيلٌ. ← الحَقِيبَةُ ___.", "ثَقِيلَةُ الوَزْنِ", "ثَقِيلُ الوَزْنِ", "ثَقِيلَةٌ الوَزْنَ", "Çantanın ağırlığı fazla.", "İzafet: ثَقِيلَةُ الوَزْنِ."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الخَبَرَ المُنَاسِبَ لِلْمُبْتَدَإِ", tr: "Haber mübtedâya sayı ve cinsiyette uyar; hep merfûdur.", items: PL([
      ["الطَّالِبَانِ ___.", "طَوِيلَانِ", "طَوِيلٌ", "طَوِيلَيْنِ", "İki öğrenci uzun boylu.", "Müsennâ: elifle merfû."],
      ["المُعَلِّمَاتُ ___.", "غَائِبَاتٌ", "غَائِبَاتٍ", "غَائِبَةٌ", "Kadın öğretmenler yok.", "Cem-i müennes sâlim: damme."],
      ["المُهَنْدِسُونَ ___.", "نَشِيطُونَ", "نَشِيطِينَ", "نَشِيطٌ", "Mühendisler çalışkan.", "Cem-i müzekker sâlim: vâv."],
      ["المُعَلِّمُ ___.", "رَحِيمٌ", "رَحِيمًا", "رَحِيمَةٌ", "Öğretmen merhametli.", "Müfred: damme."],
      ["البِنْتَانِ ___.", "مُجْتَهِدَتَانِ", "مُجْتَهِدَتَيْنِ", "مُجْتَهِدَانِ", "İki kız çalışkan.", "Müsennâ müennes: elif."],
      ["الكُتُبُ ___.", "مُفِيدَةٌ", "مُفِيدُونَ", "مُفِيدَانِ", "Kitaplar faydalı.", "Akılsız çoğul: müfred müennes haber."],
      ["المُسْلِمَاتُ ___.", "صَادِقَاتٌ", "صَادِقُونَ", "صَادِقَاتٍ", "Müslüman kadınlar dürüst.", "Cem-i müennes: damme (esre mansûb/mecrûr içindir)."],
      ["الفَلَّاحُونَ ___.", "مَسْرُورُونَ", "مَسْرُورِينَ", "مَسْرُورَانِ", "Çiftçiler sevinçli.", "Cem-i müzekker: vâv."]
    ])},
    { type: "classify", extra: true, opts: [["d", "Damme", "الضَّمَّةُ", "cerr"], ["e", "Elif", "الأَلِفُ", "nasb"], ["w", "Vâv", "الوَاوُ", "mz"]], ar: "مَا عَلَامَةُ رَفْعِ الخَبَرِ؟", tr: "Koyu haber hangi alâmetle merfû?", items: [
      [HL("المُعَلِّمُ رَحِيمٌ", "رَحِيمٌ"), "d", "Müfred."], [HL("الطَّالِبَانِ طَوِيلَانِ", "طَوِيلَانِ"), "e", "Müsennâ."], [HL("المُهَنْدِسُونَ نَشِيطُونَ", "نَشِيطُونَ"), "w", "Cem-i müzekker sâlim."],
      [HL("المُعَلِّمَاتُ غَائِبَاتٌ", "غَائِبَاتٌ"), "d", "Cem-i müennes sâlim: damme."], [HL("الكُتُبُ مُفِيدَةٌ", "مُفِيدَةٌ"), "d", "Müfred müennes."], [HL("الأَطِبَّاءُ مُسْتَعِدُّونَ", "مُسْتَعِدُّونَ"), "w", "Cem-i müzekker."],
      [HL("السَّيَّارَتَانِ جَدِيدَتَانِ", "جَدِيدَتَانِ"), "e", "Müsennâ müennes."], [HL("الرِّجَالُ أَقْوِيَاءُ", "أَقْوِيَاءُ"), "d", "Cem-i teksîr: damme."], [HL("المُصَلُّونَ جَالِسُونَ", "جَالِسُونَ"), "w", "Cem-i müzekker."]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }) }
  ]
},
// ---------------------------------------------------------------- 3 · CÜMLE HABER
{
  id: "u3", no: 3, ar: "الخَبَرُ الجُمْلَةُ", tr: "Cümle Haber", short: "Cümle", col: "mi", legend: ["cerr", "nasb"],
  goals: ["Haberin isim cümlesi ya da fiil cümlesi olabildiğini bilmek", "Haber cümlesinde mübtedâya dönen râbıt zamiri bulmak: نَتَائِجُهُ، هَوَاؤُهَا، يُجَهِّزْنَ", "Müfred haberi cümle habere çevirmek; cümle haberin “mahallen merfû” olduğunu bilmek"],
  examples: [
    { s: "العِلْمُ:cerr / نَتَائِجُهُ مُفِيدَةٌ.:nasb", tr: "İlmin sonuçları faydalıdır. (isim cümlesi; râbıt هُ)", pair: "القَرْيَةُ:cerr / هَوَاؤُهَا نَقِيٌّ.:nasb", pairTr: "Köyün havası temizdir. (râbıt هَا)" },
    { s: "الطَّالِبَاتُ:cerr / يُجَهِّزْنَ حَقَائِبَهُنَّ.:nasb", tr: "Kız öğrenciler çantalarını hazırlıyor. (fiil cümlesi; râbıt نَ)", pair: "الطِّفْلُ:cerr / يَلْعَبُ فِي الحَدِيقَةِ.:nasb", pairTr: "Çocuk bahçede oynuyor. (râbıt: gizli هُوَ)" }
  ],
  rules: [
    { tr: "Haber bir <b>isim cümlesi</b> (<span class=\"ar\">العِلْمُ نَتَائِجُهُ مُفِيدَةٌ</span>) ya da <b>fiil cümlesi</b> (<span class=\"ar\">الطِّفْلُ يَلْعَبُ فِي الحَدِيقَةِ</span>) olabilir." },
    { tr: "Haber cümlesinde mübtedâya dönen bir <b class=\"r-mz\">râbıt zamir</b> bulunmalıdır; zamir açık ya da gizli olabilir:", ex: ["Açık: نَتَائِجُهُ (هُ)، هَوَاؤُهَا (هَا)، يُجَهِّزْنَ (نَ)", "Gizli (müstetir): الطِّفْلُ يَلْعَبُ (هُوَ)"] },
    { tr: "Zamir mübtedâya sayı ve cinsiyette uymalı: <span class=\"ar\">القَرْيَةُ هَوَاؤُهَا</span> doğru, <span class=\"ar\">هَوَاؤُهُ</span> yanlış. Zamir yoksa cümle haber olamaz: <span class=\"ar\">القَمِيصُ ثَمَنُ رَخِيصٌ</span> ✗." },
    { tr: "Cümle haberin kendisi i’rab harekesi taşımaz; <b>mahallen merfû</b>dur: <span class=\"ar\">جُمْلَةُ «يَلْعَبُ…» فِي مَحَلِّ رَفْعٍ خَبَرٌ</span>." }
  ],
  kaide: ["ب ـ جُمْلَةٌ: وَيَأْتِي الخَبَرُ هُنَا عَلَى صُورَةِ جُمْلَةٍ اسْمِيَّةٍ أَوْ فِعْلِيَّةٍ، وَفِي هَذِهِ الحَالَةِ لَا بُدَّ أَنْ تَشْتَمِلَ جُمْلَةُ الخَبَرِ عَلَى ضَمِيرٍ ظَاهِرٍ أَوْ مُسْتَتِرٍ يَرْبِطُهَا بِالمُبْتَدَإِ: العِلْمُ نَتَائِجُهُ مُفِيدَةٌ، القَرْيَةُ هَوَاؤُهَا نَقِيٌّ، الطِّفْلُ يَلْعَبُ فِي الحَدِيقَةِ، الطَّالِبَاتُ يُجَهِّزْنَ حَقَائِبَهُنَّ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "حَوِّلِ «الخَبَرَ المُفْرَدَ» إِلَى «خَبَرٍ جُمْلَةٍ»", tr: "Müfred haberi cümle habere çevir: ism-i fâil fiile döner; zamir mübtedâya uymalı.", exHtml: "<span class=\"ar\">الطَّالِبُ مُجْتَهِدٌ فِي دُرُوسِهِ ← الطَّالِبُ يَجْتَهِدُ فِي دُرُوسِهِ. · الشَّجَرَةُ كَثِيرَةُ الأَغْصَانِ ← الشَّجَرَةُ أَغْصَانُهَا كَثِيرَةٌ.</span>", items: PL([
      ["الأَطِبَّاءُ مُسْتَعِدُّونَ لِلْقِيَامِ بِالعَمَلِيَّةِ الجِرَاحِيَّةِ. ← الأَطِبَّاءُ ___ لِلْقِيَامِ بِالعَمَلِيَّةِ الجِرَاحِيَّةِ.", "يَسْتَعِدُّونَ", "يَسْتَعِدُّ", "تَسْتَعِدُّونَ", "Doktorlar ameliyata hazırlanıyor.", "Râbıt: vâv (هُمْ)."],
      ["الجُنُودُ عَائِدُونَ مِنْ أَرْضِ المَعْرَكَةِ. ← الجُنُودُ ___ مِنْ أَرْضِ المَعْرَكَةِ.", "يَعُودُونَ", "يَعُودُ", "يَعُودَانِ", "Askerler savaş meydanından dönüyor.", "Râbıt: vâv."],
      ["المُؤْمِنُ مُتَوَكِّلٌ عَلَى اللهِ فِي السِّرِّ وَالعَلَنِ. ← المُؤْمِنُ ___ عَلَى اللهِ فِي السِّرِّ وَالعَلَنِ.", "يَتَوَكَّلُ", "تَتَوَكَّلُ", "يَتَوَكَّلُونَ", "Mü’min gizlide ve açıkta Allah’a tevekkül eder.", "Râbıt: gizli هُوَ."],
      ["القَمِيصُ رَخِيصُ الثَّمَنِ. ← القَمِيصُ ___.", "ثَمَنُهُ رَخِيصٌ", "ثَمَنُهَا رَخِيصٌ", "ثَمَنٌ رَخِيصٌ", "Gömleğin fiyatı ucuz.", "İzafet → isim cümlesi; râbıt هُ (القَمِيصُ müzekker)."],
      ["المُسَافِرُونَ مُنْتَظِرُونَ فِي صَالَةِ المَطَارِ. ← المُسَافِرُونَ ___ فِي صَالَةِ المَطَارِ.", "يَنْتَظِرُونَ", "يَنْتَظِرُ", "يَنْتَظِرَانِ", "Yolcular havalimanı salonunda bekliyor.", "Râbıt: vâv."],
      ["مُحَمَّدٌ رَاجِعٌ اليَوْمَ مِنَ القَرْيَةِ. ← مُحَمَّدٌ ___ اليَوْمَ مِنَ القَرْيَةِ.", "يَرْجِعُ", "تَرْجِعُ", "يَرْجِعُونَ", "Muhammed bugün köyden dönüyor.", "Râbıt: gizli هُوَ."],
      ["حُسَيْنٌ مُسَافِرٌ إِلَى بَلَدِهِ بَعْدَ أُسْبُوعٍ. ← حُسَيْنٌ ___ إِلَى بَلَدِهِ بَعْدَ أُسْبُوعٍ.", "يُسَافِرُ", "تُسَافِرُ", "يُسَافِرَانِ", "Hüseyin bir hafta sonra memleketine gidiyor.", "Râbıt: gizli هُوَ."],
      ["الحَرَارَةُ مُرْتَفِعَةٌ هَذِهِ الأَيَّامَ. ← الحَرَارَةُ ___ هَذِهِ الأَيَّامَ.", "تَرْتَفِعُ", "يَرْتَفِعُ", "تَرْتَفِعِينَ", "Bu günlerde sıcaklık yükseliyor.", "Râbıt: gizli هِيَ (müennes: تَ)."]
    ])},
    { type: "classify", extra: true, opts: [["y", "Doğru", "صَحِيحٌ", "mz"], ["n", "Yanlış", "خَطَأٌ", "x"]], ar: "هَلْ فِي جُمْلَةِ الخَبَرِ رَابِطٌ صَحِيحٌ؟", tr: "Haber cümlesinde mübtedâya uyan bir râbıt zamir var mı?", items: [
      ["العِلْمُ نَتَائِجُهُ مُفِيدَةٌ", "y", "Râbıt هُ ilme döner."], ["العِلْمُ نَتَائِجُ مُفِيدَةٌ", "n", "Râbıt yok: نَتَائِجُهُ olmalı."],
      ["القَرْيَةُ هَوَاؤُهَا نَقِيٌّ", "y", "هَا, القَرْيَةُ'ye uyar."], ["القَرْيَةُ هَوَاؤُهُ نَقِيٌّ", "n", "Müennes mübtedâ: هَوَاؤُهَا olmalı."],
      ["الطِّفْلُ يَلْعَبُ فِي الحَدِيقَةِ", "y", "Gizli هُوَ."], ["الطَّالِبَاتُ يُجَهِّزُ حَقَائِبَهُنَّ", "n", "Fiil uymuyor: يُجَهِّزْنَ olmalı."],
      ["الشَّجَرَةُ أَغْصَانُهَا كَثِيرَةٌ", "y", "Râbıt هَا."], ["البَيْتُ البَابُ وَاسِعٌ", "n", "Râbıt yok: بَابُهُ وَاسِعٌ olmalı."],
      ["الطُّلَّابُ يَدْرُسُونَ فِي المَكْتَبَةِ", "y", "Râbıt vâv."], ["الأُمَّهَاتُ قُلُوبُهُمْ رَحِيمَةٌ", "n", "Müennes çoğul: قُلُوبُهُنَّ olmalı."]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }) },
    { type: "classify", extra: true, opts: [["i", "İsim cümlesi", "جُمْلَةٌ اسْمِيَّةٌ", "nasb"], ["f", "Fiil cümlesi", "جُمْلَةٌ فِعْلِيَّةٌ", "mi"]], ar: "جُمْلَةٌ اسْمِيَّةٌ أَمْ فِعْلِيَّةٌ؟", tr: "Koyu haber cümlesi isim cümlesi mi, fiil cümlesi mi?", items: [
      [HL("المَطَرُ مَاؤُهُ نَظِيفٌ", "مَاؤُهُ نَظِيفٌ"), "i"], [HL("الشُّرْطَةُ تُحَافِظُ عَلَى الأَمْنِ", "تُحَافِظُ عَلَى الأَمْنِ"), "f"], [HL("القِطَارُ سُرْعَتُهُ عَالِيَةٌ", "سُرْعَتُهُ عَالِيَةٌ"), "i"],
      [HL("الجَهْلُ عَاقِبَتُهُ وَخِيمَةٌ", "عَاقِبَتُهُ وَخِيمَةٌ"), "i"], [HL("المُؤْمِنُ يَتَوَكَّلُ عَلَى اللهِ", "يَتَوَكَّلُ عَلَى اللهِ"), "f"], [HL("السُّيَّاحُ يَنْتَظِرُونَ أَمَامَ المَتْحَفِ", "يَنْتَظِرُونَ أَمَامَ المَتْحَفِ"), "f"],
      [HL("الحَاسُوبُ فَوَائِدُهُ كَثِيرَةٌ", "فَوَائِدُهُ كَثِيرَةٌ"), "i"], [HL("الأَطِبَّاءُ يَسْتَعِدُّونَ لِلْعَمَلِيَّةِ", "يَسْتَعِدُّونَ لِلْعَمَلِيَّةِ"), "f"]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[1] === "i" ? "İsimle başlıyor: isim cümlesi." : "Fiille başlıyor: fiil cümlesi." }; }) }
  ]
},
// ---------------------------------------------------------------- 4 · ŞİBH-İ CÜMLE HABER
{
  id: "u4", no: 4, ar: "الخَبَرُ شِبْهُ الجُمْلَةِ", tr: "Şibh-i Cümle Haber", short: "Şibh-i cümle", col: "ref", legend: ["cerr", "nasb"],
  goals: ["Haberin câr-mecrûr (فِي الكِبْرِ) ya da zarf (فَوْقَ المِنْضَدَةِ) olabildiğini bilmek", "Cümle ve şibh-i cümle haberin mahallen, müfred haberin lafzan merfû olduğunu ayırmak", "Soruya haberi cümle ya da şibh-i cümle olan bir isim cümlesiyle cevap vermek"],
  examples: [
    { s: "هَلَاكُ المَرْءِ:cerr / فِي الكِبْرِ.:nasb", tr: "Kişinin helâki kibirdedir. (câr-mecrûr)" },
    { s: "الأَزْهَارُ:cerr / فَوْقَ المِنْضَدَةِ.:nasb", tr: "Çiçekler masanın üstünde. (zarf)" },
    { s: "وَالِدِي:cerr / فِي الدَّارِ.:nasb", tr: "Babam evde. (أَيْنَ وَالِدُكَ؟)" }
  ],
  rules: [
    { tr: "<b>Şibh-i cümle</b> (yarım cümle) iki türlüdür:", ex: ["Câr ve mecrûr: فِي الكِبْرِ، عَلَى الغُصْنِ، كَالحِجَارَةِ", "Zarf (+ muzâfun ileyh): فَوْقَ المِنْضَدَةِ، تَحْتَ أَقْدَامِ الأُمَّهَاتِ، عِنْدَ الصَّدْمَةِ، أَمَامَ، خَلْفَ، مُقَابِلَ"] },
    { tr: "Zarf kendi başına <b>mansûb</b> okunur (<span class=\"ar\">فَوْقَ، أَسْفَلَ</span>); haber olarak bütün şibh-i cümle <b>mahallen merfû</b>dur." },
    { tr: "Özet: müfred haber <b>lafzan</b> merfû (sonunda damme / elif / vâv görünür); cümle ve şibh-i cümle haber <b>mahallen</b> merfûdur (<span class=\"ar\">فِي مَحَلِّ رَفْعٍ</span>)." },
    { tr: "“Nerede?” sorusunun cevabı çoğu zaman şibh-i cümle haberdir: <span class=\"ar\">أَيْنَ الحَقِيبَةُ؟ ← الحَقِيبَةُ فِي المَكْتَبِ</span>." }
  ],
  kaide: ["جـ ـ شِبْهُ جُمْلَةٍ: وَهِيَ إِمَّا أَنْ تَكُونَ جَارًّا وَمَجْرُورًا أَوْ ظَرْفًا: هَلَاكُ المَرْءِ فِي الكِبْرِ، الأَزْهَارُ فَوْقَ المِنْضَدَةِ. وَفِي كُلِّ ذَلِكَ الَّذِي يَأْتِي فِيهِ الخَبَرُ عَلَى صُورَةِ الجُمْلَةِ (اسْمِيَّةٍ أَوْ فِعْلِيَّةٍ) أَوْ شِبْهِ جُمْلَةٍ يُعْرَبُ «مَحَلًّا مَرْفُوعًا»."],
  ex: [
    { type: "pick", num: "٦", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِجُمَلٍ اسْمِيَّةٍ خَبَرُهَا «جُمْلَةٌ» أَوْ «شِبْهُ جُمْلَةٍ»", tr: "Soruya, haberi cümle ya da şibh-i cümle olan bir isim cümlesiyle cevap ver. Tuzak: fiille başlayan cümle isim cümlesi değildir.", exHtml: "<span class=\"ar\">أَيْنَ يُقِيمُ المُهَنْدِسُ؟ (حَيُّ الشُّهَدَاءِ) ← المُهَنْدِسُ يُقِيمُ فِي حَيِّ الشُّهَدَاءِ. · أَيْنَ وَالِدُكَ؟ (الدَّارُ) ← وَالِدِي فِي الدَّارِ.</span>", items: PL([
      ["أَيْنَ يَدْرُسُ صَالِحٌ؟ (جَامِعَةُ الأُرْدُنِّ)", "صَالِحٌ يَدْرُسُ فِي جَامِعَةِ الأُرْدُنِّ.", "يَدْرُسُ صَالِحٌ فِي جَامِعَةِ الأُرْدُنِّ.", "صَالِحٌ يَدْرُسُ جَامِعَةُ الأُرْدُنِّ.", "Salih Ürdün Üniversitesinde okuyor.", "Mübtedâ صَالِحٌ, haber fiil cümlesi."],
      ["أَيْنَ الحَقِيبَةُ؟ (المَكْتَبُ)", "الحَقِيبَةُ فِي المَكْتَبِ.", "الحَقِيبَةُ المَكْتَبُ.", "الحَقِيبَةَ فِي المَكْتَبِ.", "Çanta masada / büroda.", "Haber câr-mecrûr; mübtedâ merfû."],
      ["مَا رَأْيُكَ فِي إِسْطَنْبُولَ؟ (شَوَارِعُ نَظِيفَةٌ)", "إِسْطَنْبُولُ شَوَارِعُهَا نَظِيفَةٌ.", "إِسْطَنْبُولُ شَوَارِعُ نَظِيفَةٌ.", "إِسْطَنْبُولُ شَوَارِعُهُ نَظِيفَةٌ.", "İstanbul’un sokakları temiz.", "Haber isim cümlesi; râbıt هَا (şehir müennes)."],
      ["مَتَى يَحْصُدُ الفَلَّاحُ الزَّرْعَ؟ (فَصْلُ الصَّيْفِ)", "الفَلَّاحُ يَحْصُدُ الزَّرْعَ فِي فَصْلِ الصَّيْفِ.", "يَحْصُدُ الفَلَّاحُ الزَّرْعَ فِي فَصْلِ الصَّيْفِ.", "الفَلَّاحُ يَحْصُدُ الزَّرْعَ فَصْلُ الصَّيْفِ.", "Çiftçi ekini yaz mevsiminde biçer.", "Haber fiil cümlesi."],
      ["أَيْنَ الأَرِيكَةُ؟ (خَلْفَ المَكْتَبِ)", "الأَرِيكَةُ خَلْفَ المَكْتَبِ.", "الأَرِيكَةُ خَلْفُ المَكْتَبِ.", "الأَرِيكَةَ خَلْفَ المَكْتَبِ.", "Kanepe masanın arkasında.", "Haber zarf: خَلْفَ (mansûb), mahallen merfû."],
      ["مَا رَأْيُكَ فِي الذَّهَبِ؟ (سِعْرٌ مُرْتَفِعٌ)", "الذَّهَبُ سِعْرُهُ مُرْتَفِعٌ.", "الذَّهَبُ سِعْرُهَا مُرْتَفِعٌ.", "الذَّهَبُ سِعْرٌ مُرْتَفِعٌ.", "Altının fiyatı yüksek.", "Haber isim cümlesi; râbıt هُ."],
      ["أَيْنَ السُّيَّاحُ؟ (المَطَارُ)", "السُّيَّاحُ فِي المَطَارِ.", "السُّيَّاحُ فِي المَطَارُ.", "السُّيَّاحُ المَطَارِ.", "Turistler havalimanında.", "Câr-mecrûr: فِي المَطَارِ."],
      ["مَتَى تَتَفَتَّحُ الأَزْهَارُ؟ (الرَّبِيعُ)", "الأَزْهَارُ تَتَفَتَّحُ فِي الرَّبِيعِ.", "تَتَفَتَّحُ الأَزْهَارُ فِي الرَّبِيعِ.", "الأَزْهَارُ يَتَفَتَّحُونَ فِي الرَّبِيعِ.", "Çiçekler baharda açar.", "Haber fiil cümlesi; akılsız çoğul: تَتَفَتَّحُ."]
    ])},
    { type: "bank", num: "٥", ar: "ضَعْ فِي الفَرَاغِ الخَبَرَ المُنَاسِبَ: (تَقَعُ – يَقْتَدِي – مُقَابِلَ – مَقَاسُهُمَا – سَاعَتُهُ – فَوَائِدُهُ – حَالَتُهَا – يَجْرُونَ)", tr: "Önce aşağıdan bir kelime seç, sonra uygun boşluğa dokun. Râbıt zamire dikkat.",
      bank: ["تَقَعُ", "يَقْتَدِي", "مُقَابِلَ", "مَقَاسُهُمَا", "سَاعَتُهُ", "فَوَائِدُهُ", "حَالَتُهَا", "يَجْرُونَ"], items: [
      { pre: "أَخِي", h: "ذَهَبِيَّةٌ.", a: [4], tr: "Kardeşimin saati altın.", why: "İsim cümlesi: سَاعَتُهُ ذَهَبِيَّةٌ (râbıt هُ)." },
      { pre: "وِزَارَةُ التَّرْبِيَةِ", h: "وِزَارَةِ الخَارِجِيَّةِ.", a: [2], tr: "Eğitim Bakanlığı Dışişleri Bakanlığının karşısında.", why: "Zarf: مُقَابِلَ." },
      { pre: "المَاءُ", h: "كَثِيرَةٌ.", a: [5], tr: "Suyun faydaları çoktur.", why: "فَوَائِدُهُ كَثِيرَةٌ (râbıt هُ)." },
      { pre: "القَمِيصَانِ", h: "مُنَاسِبٌ لِي.", a: [3], tr: "İki gömleğin bedeni bana uygun.", why: "مَقَاسُهُمَا (râbıt هُمَا)." },
      { pre: "المُسْلِمُ", h: "بِالرَّسُولِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ.", a: [1], tr: "Müslüman Resûlullah’a uyar.", why: "Fiil cümlesi: يَقْتَدِي (gizli هُوَ)." },
      { pre: "المَرِيضَةُ", h: "خَطِيرَةٌ.", a: [6], tr: "Hastanın durumu ağır.", why: "حَالَتُهَا خَطِيرَةٌ (râbıt هَا)." },
      { pre: "إِخْوَتِي الصِّغَارُ", h: "فِي الحَدِيقَةِ.", a: [7], tr: "Küçük kardeşlerim bahçede koşuyor.", why: "يَجْرُونَ (râbıt vâv)." },
      { pre: "كُلِّيَّتُنَا", h: "فِي مِنْطَقَةٍ هَادِئَةٍ.", a: [0], tr: "Fakültemiz sakin bir bölgede bulunuyor.", why: "تَقَعُ (gizli هِيَ)." }
    ]},
    { type: "classify", extra: true, opts: [["c", "Câr-mecrûr", "جَارٌّ وَمَجْرُورٌ", "cerr"], ["z", "Zarf", "ظَرْفٌ", "nasb"]], ar: "جَارٌّ وَمَجْرُورٌ أَمْ ظَرْفٌ؟", tr: "Koyu şibh-i cümle haber câr-mecrûr mu, zarf mı?", items: [
      [HL("الطِّفْلُ فِي الحَدِيقَةِ", "فِي الحَدِيقَةِ"), "c"], [HL("الأَزْهَارُ فَوْقَ المِنْضَدَةِ", "فَوْقَ المِنْضَدَةِ"), "z"], [HL("الحَمَامَةُ عَلَى الغُصْنِ", "عَلَى الغُصْنِ"), "c"],
      [HL("الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ", "تَحْتَ أَقْدَامِ الأُمَّهَاتِ"), "z"], [HL("الصَّبْرُ عِنْدَ الصَّدْمَةِ الأُولَى", "عِنْدَ الصَّدْمَةِ الأُولَى"), "z"], [HL("هَلَاكُ المَرْءِ فِي الكِبْرِ", "فِي الكِبْرِ"), "c"],
      [HL("الأَرِيكَةُ خَلْفَ المَكْتَبِ", "خَلْفَ المَكْتَبِ"), "z"], [HL("فَهِيَ كَالحِجَارَةِ", "كَالحِجَارَةِ"), "c"], [HL("وَالرَّكْبُ أَسْفَلَ مِنْكُمْ", "أَسْفَلَ"), "z"], [HL("الحَمْدُ لِلهِ", "لِلهِ"), "c"]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[1] === "c" ? "Harf-i cer + mecrûr isim." : "Mekân / zaman zarfı (mansûb) + muzâfun ileyh." }; }) },
    { type: "classify", extra: true, opts: [["l", "Lafzan merfû", "مَرْفُوعٌ لَفْظًا", "cerr"], ["m", "Mahallen merfû", "فِي مَحَلِّ رَفْعٍ", "nasb"]], ar: "مَرْفُوعٌ لَفْظًا أَمْ مَحَلًّا؟", tr: "Koyu haber lafzan mı, mahallen mi merfû?", items: [
      [HL("المُعَلِّمُ رَحِيمٌ", "رَحِيمٌ"), "l"], [HL("الطَّالِبَانِ طَوِيلَانِ", "طَوِيلَانِ"), "l"], [HL("الطِّفْلُ يَلْعَبُ فِي الحَدِيقَةِ", "يَلْعَبُ فِي الحَدِيقَةِ"), "m"],
      [HL("العِلْمُ نَتَائِجُهُ مُفِيدَةٌ", "نَتَائِجُهُ مُفِيدَةٌ"), "m"], [HL("هَلَاكُ المَرْءِ فِي الكِبْرِ", "فِي الكِبْرِ"), "m"], [HL("المُهَنْدِسُونَ نَشِيطُونَ", "نَشِيطُونَ"), "l"],
      [HL("الأَزْهَارُ فَوْقَ المِنْضَدَةِ", "فَوْقَ المِنْضَدَةِ"), "m"], [HL("المُعَلِّمَاتُ غَائِبَاتٌ", "غَائِبَاتٌ"), "l"], [HL("القَرْيَةُ هَوَاؤُهَا نَقِيٌّ", "هَوَاؤُهَا نَقِيٌّ"), "m"], [HL("الحَقِيبَةُ ثَقِيلَةُ الوَزْنِ", "ثَقِيلَةُ"), "l"]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[1] === "l" ? "Müfred haber: alâmet sonunda görünür." : "Cümle / şibh-i cümle: i’rabı mahallîdir." }; }) }
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMALAR
{
  id: "u5", no: 5, ar: "آيَاتٌ وَقِرَاءَاتٌ", tr: "Âyetler ve Okumalar", short: "Okumalar", col: "muz", legend: ["cerr", "nasb"],
  goals: ["Âyetlerde haberi bulup türünü söylemek", "“Uyku” metninde mübtedâ ve haberi belirlemek, sonlarını harekelemek", "“Elma bahçesi” hikâyesini okuyup anlamak"],
  examples: [
    { s: "وَاللهُ:cerr / يُحِبُّ المُحْسِنِينَ:nasb", tr: "Allah iyilik edenleri sever. (fiil cümlesi)" },
    { s: "وَالرَّكْبُ:cerr / أَسْفَلَ مِنْكُمْ:nasb", tr: "Kervan sizden aşağıdaydı. (zarf)" }
  ],
  rules: [
    { tr: "Âyetlerde mübtedâ zamir de olabilir: <span class=\"ar\">نَحْنُ نَرْزُقُكُمْ، فَهِيَ كَالحِجَارَةِ، وَهُمْ بِالعُدْوَةِ القُصْوَى</span>." },
    { tr: "Haber bazen mübtedâdan önce gelir: <span class=\"ar\">وَإِلَيْهِ النُّشُورُ</span> (mübtedâ النُّشُورُ, haber إِلَيْهِ)." }
  ],
  kaide: ["عَيِّنِ الخَبَرَ ثُمَّ بَيِّنْ نَوْعَهُ · عَيِّنِ المُبْتَدَأَ وَالخَبَرَ وَاضْبِطْ آخِرَهُمَا."],
  ex: [
    { type: "combo", num: "٧", ar: "عَيِّنِ الخَبَرَ ثُمَّ بَيِّنْ نَوْعَهُ فِي الآيَاتِ التَّالِيَةِ", tr: "Önce haberi, sonra türünü seç.", items: [
      ["﴿وَاللهُ يُحِبُّ المُحْسِنِينَ﴾ (آل عمران 134)", "يُحِبُّ المُحْسِنِينَ", "المُحْسِنِينَ", "اللهُ", "f", "Allah iyilik edenleri sever.", "Mübtedâ اللهُ, haber fiil cümlesi (gizli هُوَ)."],
      ["﴿وَالوَالِدَاتُ يُرْضِعْنَ أَوْلَادَهُنَّ حَوْلَيْنِ كَامِلَيْنِ﴾ (البقرة 233)", "يُرْضِعْنَ أَوْلَادَهُنَّ", "أَوْلَادَهُنَّ", "حَوْلَيْنِ كَامِلَيْنِ", "f", "Anneler çocuklarını tam iki yıl emzirirler.", "Fiil cümlesi; râbıt: nûn."],
      ["﴿نَحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ﴾ (الأنعام 151)", "نَرْزُقُكُمْ وَإِيَّاهُمْ", "إِيَّاهُمْ", "نَحْنُ", "f", "Sizi de onları da biz rızıklandırırız.", "Mübtedâ zamir نَحْنُ; haber fiil cümlesi."],
      ["﴿البَلَدُ الطَّيِّبُ يَخْرُجُ نَبَاتُهُ بِإِذْنِ رَبِّهِ﴾ (الأعراف 58)", "يَخْرُجُ نَبَاتُهُ", "الطَّيِّبُ", "نَبَاتُهُ", "f", "Güzel toprağın bitkisi Rabbinin izniyle çıkar.", "الطَّيِّبُ sıfat; haber fiil cümlesi, râbıt نَبَاتُهُ'deki هُ."],
      ["﴿إِذْ أَنْتُمْ بِالعُدْوَةِ الدُّنْيَا﴾ (الأنفال 42)", "بِالعُدْوَةِ الدُّنْيَا", "الدُّنْيَا", "أَنْتُمْ", "s", "Hani siz vadinin yakın kıyısındaydınız.", "Câr-mecrûr: şibh-i cümle."],
      ["﴿وَالرَّكْبُ أَسْفَلَ مِنْكُمْ﴾ (الأنفال 42)", "أَسْفَلَ مِنْكُمْ", "مِنْكُمْ", "الرَّكْبُ", "s", "Kervan ise sizden aşağıdaydı.", "Zarf أَسْفَلَ (mansûb): şibh-i cümle."],
      ["﴿فَهِيَ كَالحِجَارَةِ أَوْ أَشَدُّ قَسْوَةً﴾ (البقرة 74)", "كَالحِجَارَةِ", "قَسْوَةً", "هِيَ", "s", "Kalpleriniz taş gibi, hatta daha katıdır.", "Mübtedâ هِيَ, haber câr-mecrûr كَالحِجَارَةِ."],
      ["﴿أُولَئِكَ جَزَاؤُهُمْ مَغْفِرَةٌ مِنْ رَبِّهِمْ﴾ (آل عمران 136)", "جَزَاؤُهُمْ مَغْفِرَةٌ", "مَغْفِرَةٌ", "مِنْ رَبِّهِمْ", "i", "Onların mükâfatı Rablerinden bir mağfirettir.", "Mübtedâ أُولَئِكَ; haber isim cümlesi (râbıt هُمْ)."],
      ["﴿وَاللهُ يُحِبُّ المُحْسِنِينَ﴾ (آل عمران 148)", "يُحِبُّ المُحْسِنِينَ", "المُحْسِنِينَ", "يُحِبُّ", "f", "Allah iyilik edenleri sever.", "Kitapta 1. maddeyle aynı: haber fiil cümlesi."]
    ].map(TB) },
    { type: "reading", num: "٨", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ وَعَيِّنِ المُبْتَدَأَ وَالخَبَرَ", tr: "Metni oku, soruları cevapla; sonra koyu haberin türünü seç.", title: "النَّوْمُ",
      text: "النَّوْمُ ضَرُورَةٌ لِكُلِّ الكَائِنَاتِ الحَيَّةِ؛ فَالقِطَطُ تَلْتَفُّ كَالكُرَةِ وَتَنَامُ، وَالطُّيُورُ تَنَامُ عِنْدَمَا يَأْتِي اللَّيْلُ. وَالنَّوْمُ لِلْإِنْسَانِ ضَرُورَةٌ حَيَاتِيَّةٌ. اللهُ تَعَالَى نَفَى عَنْ نَفْسِهِ صِفَةَ النَّوْمِ، فَهُوَ لَا يَحْتَاجُ إِلَيْهِ. قَالَ تَعَالَى: «اللهُ لَا إِلَهَ إِلَّا هُوَ الحَيُّ القَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ». حِرْمَانُ الجَسَدِ مِنَ النَّوْمِ قَدْ يُسَبِّبُ لَهُ كَثِيرًا مِنَ الأَخْطَارِ، حَتَّى إِنَّ الكَثِيرِينَ يَتَمَنَّوْنَ النَّوْمَ المُرِيحَ لَكِنَّهُمْ لَا يَحْصُلُونَ عَلَيْهِ. فَالنَّوْمُ يُعْطِي لِلْجَسَدِ فُرْصَةً لِلرَّاحَةِ بَعْدَ التَّعَبِ؛ فَعِنْدَمَا يَنَامُ الشَّخْصُ تَسْتَرِيحُ كُلُّ عَضَلَاتِهِ، وَالجِهَازُ العَصَبِيُّ يَعُودُ لَهُ نَشَاطُهُ بَعْدَ النَّوْمِ. النَّائِمُ يَفْقِدُ فِي الغَالِبِ التَّحَكُّمَ فِي إِرَادَتِهِ؛ حَقًّا إِنَّ النَّوْمَ نَوْعٌ مِنَ الوَفَاةِ، كَمَا قَالَ تَعَالَى: ﴿وَهُوَ الَّذِي يَتَوَفَّاكُمْ بِاللَّيْلِ﴾. وَإِذَا اسْتَيْقَظَ الإِنْسَانُ حَمِدَ اللهَ تَعَالَى عَلَى الحَيَاةِ مِنْ جَدِيدٍ، كَمَا أَرْشَدَ الرَّسُولُ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: «الحَمْدُ لِلهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ».",
      textTr: "Uyku. Uyku bütün canlılar için bir zorunluluktur: kediler top gibi kıvrılıp uyur, kuşlar gece gelince uyur. Uyku insan için de hayati bir ihtiyaçtır. Allah Teâlâ uyku sıfatını kendinden nefyetmiştir; O’nun uykuya ihtiyacı yoktur: “Allah, O’ndan başka ilah yoktur; diridir, kayyûmdur; O’nu ne uyuklama ne de uyku tutar.” Bedenin uykudan mahrum kalması ona birçok tehlike getirebilir; hatta birçok kişi rahat bir uyku ister ama bulamaz. Uyku, yorgunluktan sonra bedene dinlenme fırsatı verir: insan uyuyunca bütün kasları dinlenir, sinir sistemi de uykudan sonra canlılığını geri kazanır. Uyuyan kişi çoğu zaman iradesinin kontrolünü kaybeder; gerçekten uyku bir tür ölümdür. Allah şöyle buyurur: “Geceleyin sizi öldüren (canınızı alan) O’dur.” İnsan uyanınca yeniden hayat bulduğu için Allah’a hamd eder; Resûlullah’ın öğrettiği gibi: “Bizi öldürdükten sonra dirilten Allah’a hamd olsun; dönüş O’nadır.”",
      qa: [
        { q: "مَاذَا تَفْعَلُ القِطَطُ عِنْدَمَا تَنَامُ؟", a: "تَلْتَفُّ كَالكُرَةِ وَتَنَامُ.", tr: "Kediler uyurken ne yapar? Top gibi kıvrılıp uyur." },
        { q: "مَاذَا يُعْطِي النَّوْمُ لِلْجَسَدِ؟", a: "يُعْطِي لِلْجَسَدِ فُرْصَةً لِلرَّاحَةِ بَعْدَ التَّعَبِ.", tr: "Uyku bedene ne verir? Yorgunluktan sonra dinlenme fırsatı." },
        { q: "مَاذَا يَقُولُ المُسْلِمُ إِذَا اسْتَيْقَظَ؟", a: "الحَمْدُ لِلهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.", tr: "Müslüman uyanınca ne der? “Bizi öldürdükten sonra dirilten Allah’a hamd olsun…”" }
      ],
      cls: { opts: TUR4, ar: "مَا نَوْعُ الخَبَرِ؟", tr: "Koyu haber hangi türden?", items: [
        { s: HL("النَّوْمُ ضَرُورَةٌ لِكُلِّ الكَائِنَاتِ", "ضَرُورَةٌ"), a: "m", why: "Müfred haber (lafzan merfû); لِكُلِّ… ona bağlı." },
        { s: HL("فَالقِطَطُ تَلْتَفُّ كَالكُرَةِ وَتَنَامُ", "تَلْتَفُّ كَالكُرَةِ وَتَنَامُ"), a: "f", why: "Fiil cümlesi (gizli هِيَ)." },
        { s: HL("وَالطُّيُورُ تَنَامُ عِنْدَمَا يَأْتِي اللَّيْلُ", "تَنَامُ"), a: "f", why: "Fiil cümlesi." },
        { s: HL("اللهُ لَا إِلَهَ إِلَّا هُوَ", "لَا إِلَهَ إِلَّا هُوَ"), a: "i", why: "Haber isim cümlesi; râbıt هُوَ." },
        { s: HL("فَهُوَ لَا يَحْتَاجُ إِلَيْهِ", "لَا يَحْتَاجُ إِلَيْهِ"), a: "f", why: "Mübtedâ هُوَ; haber fiil cümlesi." },
        { s: HL("حِرْمَانُ الجَسَدِ مِنَ النَّوْمِ قَدْ يُسَبِّبُ لَهُ", "قَدْ يُسَبِّبُ لَهُ"), a: "f", why: "Fiil cümlesi." },
        { s: HL("وَالجِهَازُ العَصَبِيُّ يَعُودُ لَهُ نَشَاطُهُ", "يَعُودُ لَهُ نَشَاطُهُ"), a: "f", why: "Fiil cümlesi; râbıt لَهُ / نَشَاطُهُ." },
        { s: HL("وَهُوَ الَّذِي يَتَوَفَّاكُمْ بِاللَّيْلِ", "الَّذِي"), a: "m", why: "Haber ism-i mevsul الَّذِي (tek kelime: müfred); يَتَوَفَّاكُمْ sıladır." },
        { s: HL("الحَمْدُ لِلهِ", "لِلهِ"), a: "s", why: "Câr-mecrûr: şibh-i cümle." },
        { s: HL("وَإِلَيْهِ النُّشُورُ", "إِلَيْهِ"), a: "s", why: "Haber öne geçmiş câr-mecrûr; mübtedâ النُّشُورُ." }
      ]}
    },
    { type: "tag", roles: ["cerr", "nasb", "x"], ar: "عَيِّنِ المُبْتَدَأَ وَالخَبَرَ فِي جُمَلِ القِطْعَةِ", tr: "“Uyku” metninden cümleler: Mübtedâ, Haber ya da Başka diye etiketle. Haberin sonuna dikkat: müfredse damme.", items: [
      T("النَّوْمُ:cerr / ضَرُورَةٌ:nasb / لِكُلِّ الكَائِنَاتِ الحَيَّةِ:x", "Uyku bütün canlılar için zorunluluktur.", "النَّوْمُ (damme) mübtedâ, ضَرُورَةٌ (damme) haber."),
      T("فَـ:- / القِطَطُ:cerr / تَلْتَفُّ كَالكُرَةِ وَتَنَامُ:nasb", "Kediler top gibi kıvrılıp uyur.", "Haber fiil cümlesi."),
      T("وَ:- / النَّوْمُ:cerr / لِلْإِنْسَانِ:x / ضَرُورَةٌ:nasb / حَيَاتِيَّةٌ:x", "Uyku insan için hayati bir ihtiyaçtır.", "Haber ضَرُورَةٌ; حَيَاتِيَّةٌ sıfat."),
      T("فَـ:- / هُوَ:cerr / لَا يَحْتَاجُ إِلَيْهِ:nasb", "O’nun ona ihtiyacı yoktur.", "Mübtedâ zamir هُوَ."),
      T("فَـ:- / النَّوْمُ:cerr / يُعْطِي لِلْجَسَدِ فُرْصَةً لِلرَّاحَةِ:nasb", "Uyku bedene dinlenme fırsatı verir.", "Haber fiil cümlesi."),
      T("وَ:- / الجِهَازُ:cerr / العَصَبِيُّ:x / يَعُودُ لَهُ نَشَاطُهُ:nasb", "Sinir sistemi canlılığını geri kazanır.", "العَصَبِيُّ sıfat; haber fiil cümlesi."),
      T("النَّائِمُ:cerr / يَفْقِدُ فِي الغَالِبِ التَّحَكُّمَ فِي إِرَادَتِهِ:nasb", "Uyuyan çoğu zaman iradesinin kontrolünü kaybeder.", "Haber fiil cümlesi."),
      T("وَ:- / هُوَ:cerr / الَّذِي:nasb / يَتَوَفَّاكُمْ بِاللَّيْلِ:x", "Geceleyin canınızı alan O’dur.", "Haber الَّذِي (mebnî, mahallen merfû); sıla ona bağlı.")
    ]},
    { type: "reading", ar: "قِرَاءَةٌ حُرَّةٌ: مَزْرَعَةُ التُّفَّاحِ", tr: "Hikâyeyi oku, soruları cevapla ve koyu haberin türünü seç.", title: "مَزْرَعَةُ التُّفَّاحِ",
      text: "كَانَ لِرَجُلٍ مَزْرَعَةٌ كَبِيرَةٌ يَزْرَعُ فِيهَا أَشْجَارَ التُّفَّاحِ، وَكَانَ لَهُ وَلَدَانِ: حَسَنٌ وَعَبْدُ العَزِيزِ. وَكَانَ الوَلَدَانِ يَذْهَبَانِ إِلَى المَدْرَسَةِ، أَمَّا الأَبُ فَكَانَ يَعْمَلُ فِي المَزْرَعَةِ. وَكَانَ تُفَّاحُ هَذِهِ المَزْرَعَةِ كَبِيرًا وَلَذِيذًا، يَأْخُذُهُ الأَبُ إِلَى السُّوقِ وَيَبِيعُهُ لِلتُّجَّارِ وَيَرْجِعُ بِنُقُودٍ كَثِيرَةٍ. وَكَانَ حَسَنٌ وَعَبْدُ العَزِيزِ لَا يَهْتَمَّانِ بِالمَزْرَعَةِ وَلَا يَعْرِفَانِ عَنْهَا شَيْئًا، وَكَانَا يَقُولَانِ: إِنَّنَا لَا نُحِبُّ العَمَلَ فِي المَزْرَعَةِ. وَفِي يَوْمٍ مِنَ الأَيَّامِ مَرِضَ الأَبُ، فَنَادَى وَلَدَيْهِ وَقَالَ: «يَا حَسَنُ، وَيَا عَبْدَ العَزِيزِ، اسْتَمِعَا جَيِّدًا إِلَى مَا سَأَقُولُ: إِنَّنِي الآنَ مَرِيضٌ جِدًّا، وَأَشْعُرُ أَنِّي سَأَمُوتُ… سَوْفَ تَجِدَانِ مَالًا كَثِيرًا بَيْنَ شَجَرَتَيْنِ فِي المَزْرَعَةِ. لَنْ أَقُولَ لَكُمَا عَنْ مَكَانِهِ، وَإِنَّمَا عَلَيْكُمَا أَنْ تَحْفِرَا فِي أَرْضِ المَزْرَعَةِ، وَسَوْفَ تَجِدَانِهِ إِنْ شَاءَ اللهُ». ثُمَّ مَاتَ الأَبُ. وَفِي اليَوْمِ التَّالِي ذَهَبَ حَسَنٌ وَعَبْدُ العَزِيزِ إِلَى المَزْرَعَةِ وَهُمَا يُفَكِّرَانِ فِي كَلَامِ أَبِيهِمَا، ثُمَّ أَخَذَا يَحْفِرَانِ الأَرْضَ بَيْنَ كُلِّ شَجَرَتَيْنِ فِي نَشَاطٍ دُونَ أَنْ يَجِدَا النُّقُودَ… وَبَعْدَ شَهْرٍ كَامِلٍ مِنَ العَمَلِ المُسْتَمِرِّ جَلَسَا يَسْتَرِيحَانِ، وَقَالَا: «إِنَّ أَبَانَا لَا يَكْذِبُ عَلَيْنَا، وَلَكِنْ أَيْنَ المَالُ؟» نَظَرَ أَحَدُهُمَا إِلَى الشَّجَرِ فَوَجَدَ التُّفَّاحَ كَبِيرًا وَأَحْمَرَ، فَقَالَ لِأَخِيهِ: «انْظُرْ! هَذَا نَتِيجَةُ تَعَبِنَا وَحَفْرِنَا الأَرْضَ. هَيَّا نَجْمَعِ التُّفَّاحَ وَنَبِعْهُ فِي السُّوقِ». فَحَمَلَا التُّفَّاحَ إِلَى السُّوقِ، فَقَالَ التُّجَّارُ: «هَذَا أَكْبَرُ وَأَلَذُّ تُفَّاحٍ فِي السُّوقِ كُلِّهِ»، وَاشْتَرَوُا التُّفَّاحَ وَدَفَعُوا لَهُمَا مَبْلَغًا كَبِيرًا. ثُمَّ جَلَسَا وَهُمَا سَعِيدَانِ، وَنَظَرَ كُلٌّ مِنْهُمَا إِلَى الآخَرِ وَابْتَسَمَا وَقَالَا: «الآنَ عَرَفْنَا مَا قَالَهُ لَنَا أَبُونَا».",
      textTr: "Bir adamın elma ağaçları yetiştirdiği büyük bir çiftliği ve Hasan ile Abdülaziz adlı iki oğlu vardı. Oğullar okula gider, baba çiftlikte çalışırdı. Bu çiftliğin elmaları iri ve lezzetliydi; baba onları pazara götürüp tüccarlara satar, çok parayla dönerdi. Hasan ile Abdülaziz çiftlikle ilgilenmez, onun hakkında bir şey bilmezdi; “Çiftlikte çalışmayı sevmiyoruz” derlerdi. Bir gün baba hastalandı, oğullarını çağırıp dedi ki: “Ey Hasan, ey Abdülaziz! Söyleyeceklerimi iyi dinleyin: Şu an çok hastayım, öleceğimi hissediyorum… Çiftlikte iki ağaç arasında çok mal bulacaksınız. Yerini söylemeyeceğim; çiftliğin toprağını kazmanız gerek, inşallah onu bulacaksınız.” Sonra baba öldü. Ertesi gün iki kardeş babalarının sözünü düşünerek çiftliğe gittiler ve her iki ağaç arasını gayretle kazmaya başladılar ama parayı bulamadılar… Tam bir aylık çalışmadan sonra dinlenmek için oturdular: “Babamız bize yalan söylemez; ama mal nerede?” Biri ağaçlara baktı, elmaları iri ve kırmızı gördü ve kardeşine dedi ki: “Bak! Bu, yorgunluğumuzun ve toprağı kazmamızın sonucudur. Haydi elmaları toplayıp pazarda satalım.” Elmaları pazara götürdüler; tüccarlar: “Bu, bütün pazardaki en iri ve en lezzetli elma” dediler, elmaları satın alıp onlara büyük bir para ödediler. Sonra iki kardeş mutlu oturdular, birbirlerine bakıp gülümsediler ve: “Babamızın bize ne dediğini şimdi anladık” dediler.",
      qa: [
        { q: "مَاذَا كَانَ الأَبُ يَزْرَعُ فِي مَزْرَعَتِهِ؟", a: "كَانَ يَزْرَعُ أَشْجَارَ التُّفَّاحِ.", tr: "Baba çiftliğinde ne yetiştirirdi? Elma ağaçları." },
        { q: "هَلْ كَانَ الوَلَدَانِ يُحِبَّانِ العَمَلَ فِي المَزْرَعَةِ؟", a: "لَا، كَانَا لَا يُحِبَّانِ العَمَلَ فِيهَا.", tr: "Oğullar çiftlikte çalışmayı sever miydi? Hayır." },
        { q: "أَيْنَ قَالَ الأَبُ إِنَّ المَالَ مَوْجُودٌ؟", a: "بَيْنَ شَجَرَتَيْنِ فِي المَزْرَعَةِ.", tr: "Baba malın nerede olduğunu söyledi? Çiftlikte iki ağaç arasında." },
        { q: "مَا المَالُ الَّذِي وَجَدَهُ الوَلَدَانِ؟", a: "ثَمَنُ التُّفَّاحِ الكَبِيرِ الَّذِي نَتَجَ عَنْ تَعَبِهِمَا وَحَفْرِهِمَا الأَرْضَ.", tr: "Oğulların bulduğu mal neydi? Toprağı kazmalarıyla iri olan elmaların parası." }
      ],
      cls: { opts: TUR4, ar: "مَا نَوْعُ الخَبَرِ؟", tr: "Koyu haber hangi türden?", items: [
        { s: HL("وَهُمَا يُفَكِّرَانِ فِي كَلَامِ أَبِيهِمَا", "يُفَكِّرَانِ فِي كَلَامِ أَبِيهِمَا"), a: "f", why: "Mübtedâ هُمَا; haber fiil cümlesi (râbıt: elif)." },
        { s: HL("هَذَا نَتِيجَةُ تَعَبِنَا", "نَتِيجَةُ"), a: "m", why: "Mübtedâ هَذَا; haber نَتِيجَةُ (müfred, muzâf)." },
        { s: HL("هَذَا أَكْبَرُ وَأَلَذُّ تُفَّاحٍ فِي السُّوقِ", "أَكْبَرُ"), a: "m", why: "Haber أَكْبَرُ (müfred, ism-i tafdîl)." },
        { s: HL("ثُمَّ جَلَسَا وَهُمَا سَعِيدَانِ", "سَعِيدَانِ"), a: "m", why: "Müfred haber; müsennâ, elifle merfû." },
        { s: HL("عَلَيْكُمَا أَنْ تَحْفِرَا", "عَلَيْكُمَا"), a: "s", why: "Öne geçmiş haber (câr-mecrûr); mübtedâ أَنْ تَحْفِرَا (= حَفْرُكُمَا)." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
// Doğru Haber oyunu: [cümle {haber}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var MV_POOL = [
  ["الطَّالِبَانِ {طَوِيلَانِ}.", ["طَوِيلَانِ", "طَوِيلٌ", "طَوِيلَيْنِ"], "müsennâ: elifle merfû", "İki öğrenci uzun boylu.", "u2"],
  ["المُهَنْدِسُونَ {نَشِيطُونَ}.", ["نَشِيطُونَ", "نَشِيطِينَ", "نَشِيطٌ"], "cem-i müzekker: vâvla merfû", "Mühendisler çalışkan.", "u2"],
  ["المُعَلِّمَاتُ {غَائِبَاتٌ}.", ["غَائِبَاتٌ", "غَائِبَاتٍ", "غَائِبُونَ"], "cem-i müennes: damme", "Kadın öğretmenler yok.", "u2"],
  ["الكُتُبُ {مُفِيدَةٌ}.", ["مُفِيدَةٌ", "مُفِيدُونَ", "مُفِيدَةً"], "akılsız çoğul: müfred müennes", "Kitaplar faydalı.", "u2"],
  ["البِنْتَانِ {مُجْتَهِدَتَانِ}.", ["مُجْتَهِدَتَانِ", "مُجْتَهِدَتَيْنِ", "مُجْتَهِدَانِ"], "müsennâ müennes", "İki kız çalışkan.", "u2"],
  ["المُعَلِّمُ {رَحِيمٌ}.", ["رَحِيمٌ", "رَحِيمًا", "رَحِيمٍ"], "müfred: damme", "Öğretmen merhametli.", "u2"],
  ["السَّائِقُ {مُسْرِعٌ} فِي سَيْرِهِ.", ["مُسْرِعٌ", "مُسْرِعًا", "مُسْرَعٌ"], "يُسْرِعُ ← ism-i fâil", "Şoför hızlı gidiyor.", "u2"],
  ["الحَقِيبَةُ {ثَقِيلَةُ} الوَزْنِ.", ["ثَقِيلَةُ", "ثَقِيلَةٌ", "ثَقِيلُ"], "izafet: tenvinsiz, müennes", "Çantanın ağırlığı fazla.", "u2"],
  ["العِلْمُ {نَتَائِجُهُ} مُفِيدَةٌ.", ["نَتَائِجُهُ", "نَتَائِجُهَا", "نَتَائِجُ"], "râbıt هُ: ilme döner", "İlmin sonuçları faydalı.", "u3"],
  ["القَرْيَةُ {هَوَاؤُهَا} نَقِيٌّ.", ["هَوَاؤُهَا", "هَوَاؤُهُ", "هَوَاءٌ"], "râbıt هَا: köy müennes", "Köyün havası temiz.", "u3"],
  ["الطَّالِبَاتُ {يُجَهِّزْنَ} حَقَائِبَهُنَّ.", ["يُجَهِّزْنَ", "يُجَهِّزُونَ", "تُجَهِّزُ"], "râbıt nûn-ı nisve", "Kız öğrenciler çantalarını hazırlıyor.", "u3"],
  ["الطِّفْلُ {يَلْعَبُ} فِي الحَدِيقَةِ.", ["يَلْعَبُ", "تَلْعَبُ", "يَلْعَبُونَ"], "gizli هُوَ", "Çocuk bahçede oynuyor.", "u3"],
  ["القَمِيصُ {ثَمَنُهُ} رَخِيصٌ.", ["ثَمَنُهُ", "ثَمَنُهَا", "ثَمَنٌ"], "râbıt هُ", "Gömleğin fiyatı ucuz.", "u3"],
  ["الحَرَارَةُ {تَرْتَفِعُ} هَذِهِ الأَيَّامَ.", ["تَرْتَفِعُ", "يَرْتَفِعُ", "تَرْتَفِعُونَ"], "gizli هِيَ", "Sıcaklık yükseliyor.", "u3"],
  ["الجُنُودُ {يَعُودُونَ} مِنَ المَعْرَكَةِ.", ["يَعُودُونَ", "يَعُودُ", "تَعُودُ"], "râbıt vâv", "Askerler savaştan dönüyor.", "u3"],
  ["المَرِيضَةُ {حَالَتُهَا} خَطِيرَةٌ.", ["حَالَتُهَا", "حَالَتُهُ", "حَالَةٌ"], "râbıt هَا", "Hastanın durumu ağır.", "u3"],
  ["الأَزْهَارُ {فَوْقَ} المِنْضَدَةِ.", ["فَوْقَ", "فَوْقُ", "فَوْقِ"], "zarf: mansûb (fetha)", "Çiçekler masanın üstünde.", "u4"],
  ["الحَقِيبَةُ {فِي} المَكْتَبِ.", ["فِي", "عَنْ", "مِنْ"], "câr-mecrûr: yer bildirir", "Çanta büroda.", "u4"],
  ["الأَرِيكَةُ خَلْفَ {المَكْتَبِ}.", ["المَكْتَبِ", "المَكْتَبُ", "المَكْتَبَ"], "zarftan sonra muzâfun ileyh: mecrûr", "Kanepe masanın arkasında.", "u4"],
  ["هَلَاكُ المَرْءِ فِي {الكِبْرِ}.", ["الكِبْرِ", "الكِبْرُ", "الكِبْرَ"], "harf-i cerden sonra mecrûr", "Kişinin helâki kibirdedir.", "u4"],
  ["الجَنَّةُ {تَحْتَ} أَقْدَامِ الأُمَّهَاتِ.", ["تَحْتَ", "تَحْتُ", "تَحْتِ"], "zarf: mansûb", "Cennet annelerin ayakları altında.", "u4"],
  ["وِزَارَةُ التَّرْبِيَةِ {مُقَابِلَ} وِزَارَةِ الخَارِجِيَّةِ.", ["مُقَابِلَ", "مُقَابِلُ", "مُقَابِلٌ"], "zarf: mansûb", "Bakanlık karşıda.", "u4"],
  ["السُّيَّاحُ فِي {المَطَارِ}.", ["المَطَارِ", "المَطَارُ", "المَطَارَ"], "mecrûr", "Turistler havalimanında.", "u4"],
  ["الصَّبْرُ {عِنْدَ} الصَّدْمَةِ الأُولَى.", ["عِنْدَ", "عِنْدُ", "عِنْدِ"], "zarf: mansûb", "Sabır ilk sarsıntı anındadır.", "u4"]
];
// Haberi Dönüştür: [verilen, doğru, y1, y2, açıklama]
var DON = [
  ["الطَّالِبُ مُجْتَهِدٌ فِي دُرُوسِهِ ← cümle", "الطَّالِبُ يَجْتَهِدُ فِي دُرُوسِهِ", "الطَّالِبُ تَجْتَهِدُ فِي دُرُوسِهِ", "يَجْتَهِدُ الطَّالِبُ فِي دُرُوسِهِ", "ism-i fâil → fiil; isim cümlesi kalmalı"],
  ["الشَّجَرَةُ كَثِيرَةُ الأَغْصَانِ ← cümle", "الشَّجَرَةُ أَغْصَانُهَا كَثِيرَةٌ", "الشَّجَرَةُ أَغْصَانُهُ كَثِيرَةٌ", "الشَّجَرَةُ أَغْصَانٌ كَثِيرَةٌ", "izafet → isim cümlesi; râbıt هَا"],
  ["الأَطِبَّاءُ مُسْتَعِدُّونَ ← cümle", "الأَطِبَّاءُ يَسْتَعِدُّونَ", "الأَطِبَّاءُ يَسْتَعِدُّ", "الأَطِبَّاءُ تَسْتَعِدُّ", "râbıt vâv"],
  ["القَمِيصُ رَخِيصُ الثَّمَنِ ← cümle", "القَمِيصُ ثَمَنُهُ رَخِيصٌ", "القَمِيصُ ثَمَنُهَا رَخِيصٌ", "القَمِيصُ ثَمَنٌ رَخِيصٌ", "râbıt هُ"],
  ["المُسَافِرُونَ مُنْتَظِرُونَ ← cümle", "المُسَافِرُونَ يَنْتَظِرُونَ", "المُسَافِرُونَ يَنْتَظِرُ", "المُسَافِرُونَ تَنْتَظِرُونَ", "râbıt vâv"],
  ["الحَرَارَةُ مُرْتَفِعَةٌ ← cümle", "الحَرَارَةُ تَرْتَفِعُ", "الحَرَارَةُ يَرْتَفِعُ", "الحَرَارَةُ تَرْتَفِعِينَ", "gizli هِيَ"],
  ["السَّائِقُ يُسْرِعُ ← müfred", "السَّائِقُ مُسْرِعٌ", "السَّائِقُ مُسْرَعٌ", "السَّائِقُ مُسْرِعًا", "fiil → ism-i fâil, merfû"],
  ["السَّفِينَةُ تَنْتَظِرُ ← müfred", "السَّفِينَةُ مُنْتَظِرَةٌ", "السَّفِينَةُ مُنْتَظِرٌ", "السَّفِينَةُ مُنْتَظَرَةٌ", "müennes ism-i fâil"],
  ["الفُنْدُقُ يَقَعُ عَلَى الشَّاطِئِ ← müfred", "الفُنْدُقُ وَاقِعٌ عَلَى الشَّاطِئِ", "الفُنْدُقُ وَاقِعَةٌ عَلَى الشَّاطِئِ", "الفُنْدُقُ مَوْقُوعٌ عَلَى الشَّاطِئِ", "يَقَعُ → وَاقِعٌ"],
  ["الشَّبَابُ يَسْبَحُونَ ← müfred", "الشَّبَابُ سَابِحُونَ", "الشَّبَابُ سَابِحِينَ", "الشَّبَابُ سَابِحٌ", "cem-i müzekker: vâv"],
  ["السَّيَّارَةُ أَبْوَابُهَا مُغْلَقَةٌ ← müfred", "السَّيَّارَةُ مُغْلَقَةُ الأَبْوَابِ", "السَّيَّارَةُ مُغْلَقُ الأَبْوَابِ", "السَّيَّارَةُ مُغْلَقَةٌ الأَبْوَابَ", "isim cümlesi → izafet"],
  ["الحَقِيبَةُ وَزْنُهَا ثَقِيلٌ ← müfred", "الحَقِيبَةُ ثَقِيلَةُ الوَزْنِ", "الحَقِيبَةُ ثَقِيلُ الوَزْنِ", "الحَقِيبَةُ ثَقِيلَةٌ الوَزْنَ", "isim cümlesi → izafet"],
  ["المُسْلِمُ يُحِبُّ اللهَ ← müfred", "المُسْلِمُ مُحِبٌّ لِلهِ", "المُسْلِمُ مَحْبُوبٌ لِلهِ", "المُسْلِمُ مُحِبَّةٌ لِلهِ", "يُحِبُّ → مُحِبٌّ"],
  ["السَّعَادَةُ تَنْبُعُ مِنَ الرُّوحِ ← müfred", "السَّعَادَةُ نَابِعَةٌ مِنَ الرُّوحِ", "السَّعَادَةُ نَابِعٌ مِنَ الرُّوحِ", "السَّعَادَةُ مَنْبُوعَةٌ مِنَ الرُّوحِ", "müennes ism-i fâil"]
];
// Haberin Türü? hız oyunu: [cümle (haber koyu), tür, açıklama]
var NOUN_LIST = [];
UNITS.forEach(function (u) { u.ex.forEach(function (ex) { if (ex.type === "classify" && ex.opts === TUR4) ex.items.forEach(function (it) { NOUN_LIST.push([it.s, it.a, it.why]); }); if (ex.cls && ex.cls.opts === TUR4) ex.cls.items.forEach(function (it) { NOUN_LIST.push([it.s, it.a, it.why]); }); }); });
HM.forEach(function (h) { h[2].forEach(function (c, k) { NOUN_LIST.push([h[0] + ' <b class="hl">' + c[0] + '</b>', HM_T[k][2], HM_T[k][0]]); }); });
var SP_M = TUR4;
// Lafzan mı mahallen mi? hız oyunu
var MM_OPTS = [["l", "Lafzan", "لَفْظًا", "cerr"], ["m", "Mahallen", "مَحَلًّا", "nasb"]];
var MM_LIST = NOUN_LIST.map(function (x) { return [x[0], x[1] === "m" ? "l" : "m", x[1] === "m" ? "Müfred haber: lafzan merfû." : TUR_TR[x[1]] + ": mahallen merfû."]; });
var HAFIZA = {
  mf: { name: "Müfred ↔ cümle", pairs: [["مُجْتَهِدٌ", "يَجْتَهِدُ"], ["مُسْرِعٌ", "يُسْرِعُ"], ["مُنْتَظِرَةٌ", "تَنْتَظِرُ"], ["وَاقِعٌ", "يَقَعُ"], ["كَثِيرَةُ الأَغْصَانِ", "أَغْصَانُهَا كَثِيرَةٌ"], ["رَخِيصُ الثَّمَنِ", "ثَمَنُهُ رَخِيصٌ"], ["ثَقِيلَةُ الوَزْنِ", "وَزْنُهَا ثَقِيلٌ"]] },
  sc: { name: "Soru ↔ cevap", pairs: [["أَيْنَ الحَقِيبَةُ؟", "الحَقِيبَةُ فِي المَكْتَبِ"], ["أَيْنَ الأَرِيكَةُ؟", "الأَرِيكَةُ خَلْفَ المَكْتَبِ"], ["أَيْنَ السُّيَّاحُ؟", "السُّيَّاحُ فِي المَطَارِ"], ["أَيْنَ وَالِدُكَ؟", "وَالِدِي فِي الدَّارِ"], ["مَا رَأْيُكَ فِي الذَّهَبِ؟", "الذَّهَبُ سِعْرُهُ مُرْتَفِعٌ"], ["مَتَى تَتَفَتَّحُ الأَزْهَارُ؟", "الأَزْهَارُ تَتَفَتَّحُ فِي الرَّبِيعِ"], ["أَيْنَ يَدْرُسُ صَالِحٌ؟", "صَالِحٌ يَدْرُسُ فِي الجَامِعَةِ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["المُعَلِّمُ رَحِيمٌ", "Öğretmen merhametli."], ["العِلْمُ نَتَائِجُهُ مُفِيدَةٌ", "İlmin sonuçları faydalı."], ["الطِّفْلُ يَلْعَبُ", "Çocuk oynuyor."], ["الأَزْهَارُ فَوْقَ المِنْضَدَةِ", "Çiçekler masanın üstünde."], ["القَرْيَةُ هَوَاؤُهَا نَقِيٌّ", "Köyün havası temiz."], ["الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ", "Cennet annelerin ayakları altında."], ["النِّيَّةُ مَحَلُّهَا القَلْبُ", "Niyetin yeri kalptir."]] }
};
var KARTLAR = [
  ["İsim cümlesinin iki öğesi?", "Mübtedâ ve haber; ikisi de merfû: المُعَلِّمُ رَحِيمٌ"],
  ["Haberin türleri?", "Müfred · cümle (isim / fiil) · şibh-i cümle (câr-mecrûr / zarf)"],
  ["“Müfred haber” ne demek?", "Cümle ya da şibh-i cümle olmayan haber: طَوِيلَانِ، نَشِيطُونَ de müfreddir."],
  ["Müfred haberin alâmetleri?", "Damme (رَحِيمٌ، غَائِبَاتٌ) · elif (طَوِيلَانِ) · vâv (نَشِيطُونَ)"],
  ["İsim cümlesi haber?", "العِلْمُ نَتَائِجُهُ مُفِيدَةٌ"],
  ["Fiil cümlesi haber?", "الطِّفْلُ يَلْعَبُ فِي الحَدِيقَةِ"],
  ["Râbıt zamir nedir?", "Haber cümlesinde mübtedâya dönen zamir: نَتَائِجُهُ، هَوَاؤُهَا، gizli هُوَ"],
  ["Şibh-i cümle haber?", "Câr-mecrûr: فِي الكِبْرِ · zarf: فَوْقَ المِنْضَدَةِ"],
  ["Lafzan mı mahallen mi?", "Müfred: lafzan · cümle ve şibh-i cümle: mahallen merfû"],
  ["يُسْرِعُ → müfred?", "مُسْرِعٌ: السَّائِقُ مُسْرِعٌ فِي سَيْرِهِ"],
  ["كَثِيرَةُ الأَغْصَانِ → cümle?", "أَغْصَانُهَا كَثِيرَةٌ"],
  ["وَإِلَيْهِ النُّشُورُ: haber?", "إِلَيْهِ (öne geçmiş câr-mecrûr); mübtedâ النُّشُورُ"]
];
