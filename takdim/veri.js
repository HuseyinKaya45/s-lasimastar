// ================= VERİ: Haberin Öne Geçmesi (تَقَدُّمُ الخَبَرِ عَلَى المُبْتَدَإِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "المُبْتَدَأُ", tr: "Mübtedâ" }, nasb: { ar: "الخَبَرُ", tr: "Haber" }, mz: { ar: "الضَّمِيرُ", tr: "Zamir" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// Öne geçme sebepleri
var SB5 = [["s", "Soru ismi", "اسْمُ اسْتِفْهَامٍ", "cerr"], ["n", "Nekra mübtedâ", "مُبْتَدَأٌ نَكِرَةٌ", "nasb"], ["z", "Habere dönen zamir", "ضَمِيرٌ يَعُودُ عَلَى الخَبَرِ", "mz"], ["c", "Câiz (zorunlu değil)", "جَائِزٌ", "mi"], ["y", "Öne geçmemiş", "لَمْ يَتَقَدَّمْ", "x"]];
var SB3 = SB5.slice(0, 3);
var TUR_TR = {}; SB5.forEach(function (o) { TUR_TR[o[0]] = o[1]; });
// Sıralama makinesi: [mübtedâ, haber, doğru sıra (h: haber önde, m: mübtedâ önde, b: ikisi de), sebep, Türkçe, noktalama]
var HM = [
  ["مُدِيرُ المَدْرَسَةِ", "أَيْنَ", "h", "s", "Okul müdürü nerede?", "؟"],
  ["الامْتِحَانُ", "مَتَى", "h", "s", "Sınav ne zaman?", "؟"],
  ["كِتَابُكِ", "أَيْنَ", "h", "s", "Kitabın nerede?", "؟"],
  ["طَالِبَةٌ", "فِي الفَصْلِ", "h", "n", "Sınıfta bir kız öğrenci var.", "."],
  ["ضَيْفٌ", "عِنْدَ صَدِيقِي", "h", "n", "Arkadaşımın yanında bir misafir var.", "."],
  ["أَجَلٌ", "لِكُلِّ أُمَّةٍ", "h", "n", "Her ümmetin bir eceli vardır.", "."],
  ["مَشَاكِلُهُ", "لِلْإِنْسَانِ", "h", "z", "İnsanın kendi sorunları vardır.", "."],
  ["ثَوَابُهَا", "لِلصَّائِمَةِ", "h", "z", "Oruçlu kadının sevabı vardır.", "."],
  ["الطَّالِبَةُ", "فِي الفَصْلِ", "b", "c", "Kız öğrenci sınıfta.", "."],
  ["الطِّفْلُ", "يَلْعَبُ", "m", "y", "Çocuk oynuyor.", "."]
];
var HM_NOTE = {
  s: "Soru isimleri cümlenin başında olur (sadâret hakkı). Haber soru ismiyse öne geçmek zorundadır.",
  n: "Mübtedâ nekra, haber şibh-i cümle: haber öne geçmek zorundadır. “طَالِبَةٌ فِي الفَصْلِ” denmez.",
  z: "Mübtedâdaki zamir haberdeki isme döner; zamir, döndüğü isimden önce gelemeyeceği için haber öne geçer.",
  c: "Mübtedâ marife: asıl sıra (mübtedâ önde) doğrudur; haberi öne almak da câizdir (vurgu için).",
  y: "Haber fiil cümlesi: fiil öne alınırsa cümle fiil cümlesine döner (يَلْعَبُ الطِّفْلُ: fâil). Haber önde değil."
};

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
// Sebep seçenekleri: doğru + iki başka
function SBO(k, n) { var o = ["s", "n", "z", "c", "y"].filter(function (x) { return x !== k; }); return [TUR_TR[k], TUR_TR[o[n % 4]], TUR_TR[o[(n + 1) % 4]]]; }
// Haberi ve sebebini seç: [cümle, haber, y1, y2, sebep, Türkçe, açıklama]
function TB(x, n) { return CBP([x[0] + " ← Haber:", [x[1], x[2], x[3]], "· Sebep:", SBO(x[4], n)], n, x[5], x[6]); }
// Mübtedâyı harekele ve sebebini seç: [öncesi, [doğru, y1, y2], sonrası, sebep, Türkçe, açıklama]
function ZB(x, n) { return CBP([x[0], x[1], x[2] + " · Sebep:", SBO(x[3], n)], n, x[4], x[5]); }

var UNITS = [
// ---------------------------------------------------------------- 1 · ASIL SIRA VE ÖNE GEÇME
{
  id: "u1", no: 1, ar: "تَقَدُّمُ الخَبَرِ عَلَى المُبْتَدَإِ", tr: "Asıl Sıra ve Haberin Öne Geçmesi", short: "Üç sebep", col: "cerr", legend: ["cerr", "nasb"],
  goals: ["Asıl sıranın “önce mübtedâ, sonra haber” olduğunu bilmek", "Haberin öne geçmek zorunda olduğu üç durumu tanımak: soru ismi, nekra mübtedâ + şibh-i cümle, mübtedâda habere dönen zamir", "Haber öne geçse de mübtedâyı ve haberi doğru bulmak"],
  examples: [
    { s: "أَيْنَ:nasb / مُدِيرُ المَدْرَسَةِ؟:cerr", tr: "Okul müdürü nerede? (soru ismi)", pair: "مَا:nasb / مِهْنَتُكَ؟:cerr", pairTr: "Mesleğin ne?" },
    { s: "فِي الفَصْلِ:nasb / طَالِبَةٌ.:cerr", tr: "Sınıfta bir kız öğrenci var. (nekra mübtedâ)", pair: "عِنْدَ صَدِيقِي:nasb / ضَيْفٌ.:cerr", pairTr: "Arkadaşımın yanında bir misafir var." },
    { s: "لِلْإِنْسَانِ:nasb / مَشَاكِلُهُ.:cerr", tr: "İnsanın kendine göre sorunları vardır. (zamir habere döner)", pair: "لِلصَّائِمَةِ:nasb / ثَوَابُهَا.:cerr", pairTr: "Oruçlu kadının kendi sevabı vardır." }
  ],
  rules: [
    { tr: "Asıl sıra: önce <b class=\"r-cerr\">mübtedâ</b>, sonra <b class=\"r-nasb\">haber</b>: <span class=\"ar\">المُعَلِّمُ رَحِيمٌ</span>. Ama üç durumda haber mübtedâdan <b>önce gelmek zorundadır</b>:" },
    { tr: "1. Haber, cümlenin başında olma hakkı (<span class=\"ar\">حَقُّ الصَّدَارَةِ</span>) olan bir kelimeyse, yani <b>soru ismi</b>yse:", ex: ["أَيْنَ مُدِيرُ المَدْرَسَةِ؟ · مَتَى الامْتِحَانُ؟ · كَيْفَ الدِّرَاسَةُ؟", "مَا مِهْنَتُكَ؟ · مَنْ رَبُّ السَّمَاوَاتِ وَالأَرْضِ؟ · كَمْ عَدَدُ الطُّلَّابِ؟"] },
    { tr: "2. Haber <b>şibh-i cümle</b> (câr-mecrûr ya da zarf), mübtedâ <b>nekra</b> ise:", ex: ["فِي الفَصْلِ طَالِبَةٌ", "عِنْدَ صَدِيقِي ضَيْفٌ"] },
    { tr: "3. Mübtedâda habere dönen bir <b class=\"r-mz\">zamir</b> varsa:", ex: ["لِلْإِنْسَانِ مَشَاكِلُهُ (هُ → الإِنْسَان)", "لِلصَّائِمَةِ ثَوَابُهَا (هَا → الصَّائِمَة)"] },
    { tr: "Haber öne geçince i’rab değişmez: mübtedâ yine merfûdur; haber (şibh-i cümle ya da soru ismi) mahallen merfûdur ve “öne geçmiş haber” (<span class=\"ar\">خَبَرٌ مُقَدَّمٌ</span>), mübtedâ “geri kalmış mübtedâ” (<span class=\"ar\">مُبْتَدَأٌ مُؤَخَّرٌ</span>) diye i’rab edilir." }
  ],
  kaide: [
    "الأَصْلُ فِي الخَبَرِ أَنْ يَأْتِيَ بَعْدَ المُبْتَدَإِ، لَكِنَّهُ يَتَقَدَّمُ عَلَى المُبْتَدَإِ فِي المَوَاضِعِ التَّالِيَةِ:",
    "١ ـ إِذَا كَانَ الخَبَرُ مِنَ الأَلْفَاظِ الَّتِي لَهَا حَقُّ الصَّدَارَةِ فِي الكَلَامِ كَأَسْمَاءِ الاسْتِفْهَامِ، مِثْلُ: أَيْنَ مُدِيرُ المَدْرَسَةِ؟ مَا مِهْنَتُكَ؟",
    "٢ ـ إِذَا كَانَ الخَبَرُ شِبْهَ جُمْلَةٍ (جَارًّا وَمَجْرُورًا أَوْ ظَرْفًا) وَكَانَ المُبْتَدَأُ نَكِرَةً، مِثْلُ: فِي الفَصْلِ طَالِبَةٌ، عِنْدَ صَدِيقِي ضَيْفٌ.",
    "٣ ـ إِذَا كَانَ فِي المُبْتَدَإِ ضَمِيرٌ يَعُودُ عَلَى الخَبَرِ، مِثْلُ: لِلْإِنْسَانِ مَشَاكِلُهُ، لِلصَّائِمَةِ ثَوَابُهَا."
  ],
  ex: [
    { type: "tag", roles: ["cerr", "nasb", "x"], num: "١", ar: "عَيِّنِ المُبْتَدَأَ وَالخَبَرَ فِي الجُمَلِ الآتِيَةِ", tr: "Kelime gruplarına dokunarak Mübtedâ, Haber ya da Başka diye etiketle. Haber önde!", items: [
      T("يُوصِيكُمُ اللهُ فِي أَوْلَادِكُمْ:- / لِلذَّكَرِ:nasb / مِثْلُ حَظِّ الأُنْثَيَيْنِ:cerr", "Allah size çocuklarınız hakkında, erkeğe iki kızın payı kadar vermenizi emreder. (Nisâ 11)", "مِثْلُ izafetle marife olmaz: nekra mübtedâ, haber öne geçmiş."),
      T("أَيْنَ:nasb / هَدِيَّةُ العِيدِ:cerr / يَا أَوْلَادُ؟:x", "Bayram hediyesi nerede, çocuklar?", "Haber soru ismi أَيْنَ."),
      T("فِي مِينَاءِ إِسْطَنْبُولَ:nasb / سُفُنٌ:cerr / مِنْ جَمِيعِ العَالَمِ.:x", "İstanbul limanında bütün dünyadan gemiler var.", "Nekra mübtedâ سُفُنٌ."),
      T("فِي السُّوقِ:nasb / مَحَلَّاتٌ:cerr / كَثِيرَةٌ.:x", "Çarşıda çok dükkân var.", "Nekra mübtedâ; كَثِيرَةٌ sıfat."),
      T("فِي صَحِيفَةِ «الفَجْرِ»:nasb / أَخْبَارٌ:cerr / رِيَاضِيَّةٌ قَلِيلَةٌ.:x", "“el-Fecr” gazetesinde az spor haberi var.", "Nekra mübtedâ أَخْبَارٌ."),
      T("أَمَامَ عِمَارَتِنَا:nasb / سَيَّارَاتٌ:cerr / كَثِيرَةٌ.:x", "Apartmanımızın önünde çok araba var.", "Haber zarf, mübtedâ nekra."),
      T("لِلزِّرَاعَةِ:nasb / أَهَمِّيَّتُهَا.:cerr", "Tarımın kendine özgü önemi vardır.", "Mübtedâdaki هَا habere (الزِّرَاعَة) döner."),
      T("خَلْفَ هَذَا القَرَارِ:nasb / نِيَّةٌ:cerr / سَيِّئَةٌ.:x", "Bu kararın arkasında kötü bir niyet var.", "Haber zarf, mübtedâ nekra.")
    ]},
    { type: "classify", extra: true, opts: SB3, ar: "لِمَاذَا تَقَدَّمَ الخَبَرُ؟", tr: "Koyu haber neden öne geçmiş?", items: [
      [HL("أَيْنَ مُدِيرُ المَدْرَسَةِ؟", "أَيْنَ"), "s"], [HL("فِي الفَصْلِ طَالِبَةٌ", "فِي الفَصْلِ"), "n"], [HL("لِلْإِنْسَانِ مَشَاكِلُهُ", "لِلْإِنْسَانِ"), "z"],
      [HL("مَتَى الامْتِحَانُ؟", "مَتَى"), "s"], [HL("عِنْدَ صَدِيقِي ضَيْفٌ", "عِنْدَ صَدِيقِي"), "n"], [HL("لِلصَّائِمَةِ ثَوَابُهَا", "لِلصَّائِمَةِ"), "z"],
      [HL("كَيْفَ الدِّرَاسَةُ؟", "كَيْفَ"), "s"], [HL("فِي السُّوقِ مَحَلَّاتٌ كَثِيرَةٌ", "فِي السُّوقِ"), "n"], [HL("لِلزِّرَاعَةِ أَهَمِّيَّتُهَا", "لِلزِّرَاعَةِ"), "z"], [HL("كَمْ عَدَدُ الطُّلَّابِ فِي الصَّفِّ؟", "كَمْ"), "s"]
    ].map(function (x) { return { s: x[0], a: x[1], why: HM_NOTE[x[1]] }; }) }
  ]
},
// ---------------------------------------------------------------- 2 · SORU İSİMLERİ
{
  id: "u2", no: 2, ar: "الخَبَرُ اسْمُ اسْتِفْهَامٍ", tr: "Haber Soru İsmi Olunca", short: "Soru ismi", col: "nasb", legend: ["cerr", "nasb"],
  goals: ["Soru isimlerinin cümlenin başında olma hakkını (sadâret) bilmek", "Soru ismi haber olunca öne geçtiğini görmek: أَيْنَ، مَتَى، كَيْفَ، كَمْ، مَا، مَنْ", "Cevaba göre doğru soru ismini seçmek"],
  examples: [
    { s: "مَتَى:nasb / الامْتِحَانُ؟:cerr", tr: "Sınav ne zaman?", pair: "كَيْفَ:nasb / الدِّرَاسَةُ؟:cerr", pairTr: "Okul / ders nasıl?" },
    { s: "قُلْ:- / مَنْ:nasb / رَبُّ السَّمَاوَاتِ وَالأَرْضِ؟:cerr", tr: "De ki: Göklerin ve yerin Rabbi kimdir? (Ra’d 16)", pair: "كَمْ:nasb / عَدَدُ الطُّلَّابِ فِي الصَّفِّ؟:cerr", pairTr: "Sınıfta kaç öğrenci var?" }
  ],
  rules: [
    { tr: "Soru isimleri (<span class=\"ar\">أَسْمَاءُ الاسْتِفْهَامِ</span>) cümlenin <b>başında</b> bulunur; buna <b>sadâret hakkı</b> denir (<span class=\"ar\">حَقُّ الصَّدَارَةِ</span>).", ex: ["أَيْنَ = nerede · مَتَى = ne zaman · كَيْفَ = nasıl", "كَمْ = kaç · مَا = ne · مَنْ = kim"] },
    { tr: "Soru ismi haber olunca haber öne geçmek zorundadır: <span class=\"ar\">أَيْنَ المُدِيرُ؟</span> doğru, <span class=\"ar\">المُدِيرُ أَيْنَ؟</span> değil." },
    { tr: "Cevapta asıl sıraya dönülür; soru isminin yerine cevap gelir: <span class=\"ar\">أَيْنَ الحَقِيبَةُ؟ ← الحَقِيبَةُ فِي المَكْتَبِ</span>." },
    { tr: "Not: <span class=\"ar\">مَا مِهْنَتُكَ؟ مَنْ رَبُّ…؟</span> cümlelerinde bazı nahivciler مَا / مَنْ'yi mübtedâ sayar; kitap bunları öne geçmiş haber kabul eder." }
  ],
  kaide: ["١ ـ إِذَا كَانَ الخَبَرُ مِنَ الأَلْفَاظِ الَّتِي لَهَا حَقُّ الصَّدَارَةِ فِي الكَلَامِ كَأَسْمَاءِ الاسْتِفْهَامِ: أَيْنَ مُدِيرُ المَدْرَسَةِ؟ مَا مِهْنَتُكَ؟ مَتَى الامْتِحَانُ؟ كَيْفَ الدِّرَاسَةُ؟ كَمْ عَدَدُ الطُّلَّابِ فِي الصَّفِّ؟"],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ اسْمَ الاسْتِفْهَامِ المُنَاسِبَ", tr: "Parantezdeki cevaba uyan soru ismini seç.", items: PL([
      ["___ مُدِيرُ المَدْرَسَةِ؟ (فِي مَكْتَبِهِ)", "أَيْنَ", "مَتَى", "كَمْ", "Okul müdürü nerede? (Odasında.)", "Yer: أَيْنَ."],
      ["___ الامْتِحَانُ؟ (غَدًا)", "مَتَى", "أَيْنَ", "مَنْ", "Sınav ne zaman? (Yarın.)", "Zaman: مَتَى."],
      ["___ الدِّرَاسَةُ؟ (جَمِيلَةٌ)", "كَيْفَ", "كَمْ", "أَيْنَ", "Okul nasıl? (Güzel.)", "Durum: كَيْفَ."],
      ["___ مِهْنَتُكَ؟ (مُدَرِّسٌ)", "مَا", "مَنْ", "مَتَى", "Mesleğin ne? (Öğretmen.)", "Şey: مَا."],
      ["قُلْ ___ رَبُّ السَّمَاوَاتِ وَالأَرْضِ؟ (اللهُ)", "مَنْ", "مَا", "أَيْنَ", "De ki: Göklerin ve yerin Rabbi kim?", "Kişi / akıllı: مَنْ."],
      ["___ عَدَدُ الطُّلَّابِ فِي الصَّفِّ؟ (ثَلَاثُونَ)", "كَمْ", "كَيْفَ", "مَنْ", "Sınıfta kaç öğrenci var? (Otuz.)", "Sayı: كَمْ."],
      ["___ صِحَّتُكِ يَا عَائِشَةُ؟ (بِخَيْرٍ)", "كَيْفَ", "كَمْ", "مَتَى", "Sağlığın nasıl, Âişe? (İyi.)", "Durum: كَيْفَ."],
      ["يَقُولُ الإِنْسَانُ يَوْمَئِذٍ: ___ المَفَرُّ؟", "أَيْنَ", "كَمْ", "مَا", "O gün insan: “Kaçacak yer nerede?” der. (Kıyâme 10)", "Yer: أَيْنَ."]
    ])},
    { type: "classify", extra: true, opts: [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "x"]], ar: "هَلِ التَّرْتِيبُ صَحِيحٌ؟", tr: "Dizilim doğru mu? Soru ismi başta olmalı.", items: [
      ["أَيْنَ المُدِيرُ؟", "d", "Soru ismi başta."], ["المُدِيرُ أَيْنَ؟", "y", "Soru ismi sona kalamaz: أَيْنَ المُدِيرُ؟"], ["مَتَى الامْتِحَانُ؟", "d", "Doğru."],
      ["الامْتِحَانُ مَتَى؟", "y", "مَتَى الامْتِحَانُ؟ olmalı."], ["كَيْفَ الدِّرَاسَةُ؟", "d", "Doğru."], ["مِهْنَتُكَ مَا؟", "y", "مَا مِهْنَتُكَ؟ olmalı."],
      ["كَمْ عَدَدُ الطُّلَّابِ؟", "d", "Doğru."], ["صِحَّتُكِ كَيْفَ؟", "y", "كَيْفَ صِحَّتُكِ؟ olmalı."]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }) }
  ]
},
// ---------------------------------------------------------------- 3 · NEKRA MÜBTEDÂ
{
  id: "u3", no: 3, ar: "المُبْتَدَأُ نَكِرَةٌ وَالخَبَرُ شِبْهُ جُمْلَةٍ", tr: "Nekra Mübtedâ, Şibh-i Cümle Haber", short: "Nekra", col: "mi", legend: ["cerr", "nasb"],
  goals: ["Mübtedâ nekra ve haber şibh-i cümle ise haberin öne geçtiğini bilmek: فِي الفَصْلِ طَالِبَةٌ", "Mübtedâ marife ise asıl sıranın kaldığını görmek: الطَّالِبَةُ فِي الفَصْلِ", "Boşluğa uygun öne geçmiş haberi koymak"],
  examples: [
    { s: "فِي الفَصْلِ:nasb / طَالِبَةٌ.:cerr", tr: "Sınıfta bir kız öğrenci var.", pair: "الطَّالِبَةُ:cerr / فِي الفَصْلِ.:nasb", pairTr: "Kız öğrenci sınıfta. (marife: asıl sıra)" },
    { s: "عِنْدَ صَدِيقِي:nasb / ضَيْفٌ.:cerr", tr: "Arkadaşımın yanında bir misafir var. (zarf)" }
  ],
  rules: [
    { tr: "Mübtedâ <b>nekra</b> (belirsiz: <span class=\"ar\">طَالِبَةٌ، ضَيْفٌ، أَشْجَارٌ</span>), haber <b>şibh-i cümle</b> ise haber öne geçer:", ex: ["فِي الحَدِيقَةِ أَشْجَارٌ (câr-mecrûr)", "عِنْدَ صَدِيقِي ضَيْفٌ (zarf)"] },
    { tr: "Türkçede çoğu zaman “…-de bir … var” diye çevrilir: <span class=\"ar\">فِي الفَصْلِ طَالِبَةٌ</span> = Sınıfta bir kız öğrenci var." },
    { tr: "Mübtedâ <b>marife</b> ise asıl sıra kalır: <span class=\"ar\">الطَّالِبَةُ فِي الفَصْلِ</span> (Kız öğrenci sınıfta)." },
    { tr: "Nekra mübtedâ öne alınmaz: <span class=\"ar\">طَالِبَةٌ فِي الفَصْلِ</span> ✗." }
  ],
  kaide: ["٢ ـ إِذَا كَانَ الخَبَرُ شِبْهَ جُمْلَةٍ (جَارًّا وَمَجْرُورًا أَوْ ظَرْفًا) وَكَانَ المُبْتَدَأُ نَكِرَةً، مِثْلُ: فِي الفَصْلِ طَالِبَةٌ، عِنْدَ صَدِيقِي ضَيْفٌ."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "امْلَإِ الفَرَاغَ فِيمَا يَأْتِي بِخَبَرٍ مُنَاسِبٍ", tr: "Boşluğa öne geçmiş uygun haberi koy.", exHtml: "<span class=\"ar\">…… أَشْجَارٌ ← فِي الحَدِيقَةِ أَشْجَارٌ. · …… العَائِلَةُ؟ ← كَيْفَ العَائِلَةُ؟</span>", items: PL([
      ["___ الأَوْلَادُ؟", "أَيْنَ", "هَلْ", "فِي", "Çocuklar nerede?", "Soru ismi haber: başta."],
      ["___ مَشَاكِلُهُمْ.", "لِلنَّاسِ", "لِلْمَرْأَةِ", "النَّاسُ", "İnsanların kendi sorunları var.", "هُمْ, النَّاس'a döner: zamir habere döndüğü için haber önde."],
      ["___ صُورَةٌ جَمِيلَةٌ.", "فِي الغُرْفَةِ", "الغُرْفَةُ", "أَيْنَ", "Odada güzel bir resim var.", "Nekra mübtedâ + câr-mecrûr."],
      ["___ طُلَّابٌ قَلِيلُونَ.", "فِي الفَصْلِ", "الفَصْلُ", "مَتَى", "Sınıfta az öğrenci var.", "Nekra mübtedâ."],
      ["___ كِتَابُكِ؟", "أَيْنَ", "فِي", "هَلْ", "Kitabın nerede?", "Soru ismi."],
      ["___ أَخْبَارٌ عَالَمِيَّةٌ.", "فِي الجَرِيدَةِ", "الجَرِيدَةُ", "كَيْفَ", "Gazetede dünya haberleri var.", "Nekra mübtedâ."],
      ["___ مَنَافِعُ لِلنَّاسِ.", "فِيهِ", "هُوَ", "مَتَى", "Onda insanlar için faydalar var.", "Nekra mübtedâ (مَنَافِعُ), haber câr-mecrûr."],
      ["___ أَجَلٌ.", "لِكُلِّ أُمَّةٍ", "كُلُّ أُمَّةٍ", "أَيْنَ", "Her ümmetin bir eceli var.", "Nekra mübtedâ."]
    ])},
    { type: "classify", extra: true, opts: [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "x"]], ar: "هَلِ التَّرْتِيبُ صَحِيحٌ؟", tr: "Dizilim doğru mu? Mübtedâ nekra mı, marife mi bak.", items: [
      ["فِي الفَصْلِ طَالِبَةٌ", "d", "Nekra mübtedâ: haber önde."], ["طَالِبَةٌ فِي الفَصْلِ", "y", "Nekra mübtedâ başta olmaz."], ["الطَّالِبَةُ فِي الفَصْلِ", "d", "Marife mübtedâ: asıl sıra."],
      ["عِنْدَ صَدِيقِي ضَيْفٌ", "d", "Nekra mübtedâ: haber (zarf) önde."], ["ضَيْفٌ عِنْدَ صَدِيقِي", "y", "عِنْدَ صَدِيقِي ضَيْفٌ olmalı."], ["الضَّيْفُ عِنْدَ صَدِيقِي", "d", "Marife: asıl sıra."],
      ["فِي السُّوقِ مَحَلَّاتٌ كَثِيرَةٌ", "d", "Doğru."], ["مَحَلَّاتٌ كَثِيرَةٌ فِي السُّوقِ", "y", "Nekra: haber öne geçmeli."]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }) },
    { type: "classify", extra: true, opts: [["n", "Nekra", "نَكِرَةٌ", "nasb"], ["m", "Marife", "مَعْرِفَةٌ", "cerr"]], ar: "المُبْتَدَأُ نَكِرَةٌ أَمْ مَعْرِفَةٌ؟", tr: "Koyu mübtedâ nekra mı, marife mi?", items: [
      [HL("فِي الفَصْلِ طَالِبَةٌ", "طَالِبَةٌ"), "n", "Tenvinli, ال yok."], [HL("الطَّالِبَةُ فِي الفَصْلِ", "الطَّالِبَةُ"), "m", "ال ile marife."],
      [HL("أَيْنَ مُدِيرُ المَدْرَسَةِ؟", "مُدِيرُ المَدْرَسَةِ"), "m", "Marifeye izafetle marife."], [HL("عِنْدَ صَدِيقِي ضَيْفٌ", "ضَيْفٌ"), "n", "Tenvinli."],
      [HL("لِلْإِنْسَانِ مَشَاكِلُهُ", "مَشَاكِلُهُ"), "m", "Zamire izafetle marife."], [HL("فِي مِينَاءِ إِسْطَنْبُولَ سُفُنٌ", "سُفُنٌ"), "n", "Tenvinli."],
      [HL("لِلذَّكَرِ مِثْلُ حَظِّ الأُنْثَيَيْنِ", "مِثْلُ حَظِّ الأُنْثَيَيْنِ"), "n", "مِثْلُ izafetle marife olmaz."], [HL("عِنْدَ جُهَيْنَةَ الخَبَرُ اليَقِينُ", "الخَبَرُ"), "m", "ال ile marife: öne geçme câiz."]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }) }
  ]
},
// ---------------------------------------------------------------- 4 · ZAMİR
{
  id: "u4", no: 4, ar: "فِي المُبْتَدَإِ ضَمِيرٌ يَعُودُ عَلَى الخَبَرِ", tr: "Mübtedâda Habere Dönen Zamir", short: "Zamir", col: "ref", legend: ["cerr", "nasb"],
  goals: ["Mübtedâdaki zamir haberdeki isme dönüyorsa haberin öne geçtiğini bilmek: لِلْإِنْسَانِ مَشَاكِلُهُ", "Zamiri döndüğü isme uydurmak: لِلصَّائِمَةِ ثَوَابُهَا", "Öne geçmiş cümlelerde mübtedâyı harekeleyip sebebi söylemek"],
  examples: [
    { s: "لِلْإِنْسَانِ:nasb / مَشَاكِلُهُ.:cerr", tr: "İnsanın kendi sorunları vardır. (هُ → الإِنْسَان)" },
    { s: "لِلطَّائِرَاتِ:nasb / أَنْظِمَتُهَا وَقَوَانِينُهَا.:cerr", tr: "Uçakların kendi sistemleri ve kanunları vardır. (هَا → الطَّائِرَات)" }
  ],
  rules: [
    { tr: "Mübtedâda bir <b class=\"r-mz\">zamir</b> varsa ve bu zamir haberdeki isme dönüyorsa haber öne geçer: <span class=\"ar\">لِلْإِنْسَانِ مَشَاكِلُ<b>هُ</b></span>." },
    { tr: "Sebep: zamir, döndüğü isimden <b>önce</b> gelemez. <span class=\"ar\">مَشَاكِلُهُ لِلْإِنْسَانِ</span> denirse هُ henüz söylenmemiş bir isme dönmüş olur." },
    { tr: "Zamir döndüğü isme sayı ve cinsiyette uyar; akılsız çoğula هَا döner:", ex: ["لِلصَّائِمَةِ ثَوَابُهَا · لِلْأَوْلَادِ مَشَاكِلُهُمْ", "لِلطَّائِرَاتِ أَنْظِمَتُهَا (akılsız çoğul)"] },
    { tr: "Öne geçmiş cümlede bile mübtedâ <b>merfû</b>dur: <span class=\"ar\">فِي العِمَارَةِ عِيَادَةٌ، كَيْفَ صِحَّتُكِ؟، فِي مَدِينَتِنَا حَدَائِقُ</span> (حَدَائِقُ gayr-i munsarif: tenvin almaz)." }
  ],
  kaide: ["٣ ـ إِذَا كَانَ فِي المُبْتَدَإِ ضَمِيرٌ يَعُودُ عَلَى الخَبَرِ، مِثْلُ: لِلْإِنْسَانِ مَشَاكِلُهُ، لِلصَّائِمَةِ ثَوَابُهَا."],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ المُبْتَدَأَ المُنَاسِبَ", tr: "Mübtedâdaki zamir haberdeki isme uymalı.", items: PL([
      ["لِلْإِنْسَانِ ___.", "مَشَاكِلُهُ", "مَشَاكِلُهَا", "مَشَاكِلُهُمْ", "İnsanın kendi sorunları var.", "هُ → الإِنْسَان (müfred müzekker)."],
      ["لِلصَّائِمَةِ ___.", "ثَوَابُهَا", "ثَوَابُهُ", "ثَوَابُهُمْ", "Oruçlu kadının kendi sevabı var.", "هَا → الصَّائِمَة."],
      ["لِلزِّرَاعَةِ ___.", "أَهَمِّيَّتُهَا", "أَهَمِّيَّتُهُ", "أَهَمِّيَّتُهُنَّ", "Tarımın kendi önemi var.", "هَا → الزِّرَاعَة."],
      ["لِلطَّائِرَاتِ ___ وَقَوَانِينُهَا.", "أَنْظِمَتُهَا", "أَنْظِمَتُهُمْ", "أَنْظِمَتُهُ", "Uçakların sistemleri ve kanunları var.", "Akılsız çoğul: هَا."],
      ["لِلْأَوْلَادِ ___.", "مَشَاكِلُهُمْ", "مَشَاكِلُهُ", "مَشَاكِلُهَا", "Çocukların kendi sorunları var.", "هُمْ → الأَوْلَاد."],
      ["لِلدَّارِ ___.", "صَاحِبُهَا", "صَاحِبُهُ", "صَاحِبُهُمْ", "Evin bir sahibi var.", "الدَّار müennes: هَا."],
      ["لِلْمُسْلِمَيْنِ ___.", "حُقُوقُهُمَا", "حُقُوقُهُمْ", "حُقُوقُهُ", "İki Müslümanın hakları var.", "Müsennâ: هُمَا."],
      ["لِلطَّالِبَاتِ ___.", "كُتُبُهُنَّ", "كُتُبُهُمْ", "كُتُبُهَا", "Kız öğrencilerin kitapları var.", "Akıllı müennes çoğul: هُنَّ."]
    ])},
    { type: "classify", extra: true, opts: [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "x"]], ar: "هَلِ التَّرْتِيبُ صَحِيحٌ؟", tr: "Dizilim doğru mu? Zamir döndüğü isimden önce gelemez.", items: [
      ["لِلْإِنْسَانِ مَشَاكِلُهُ", "d", "Doğru."], ["مَشَاكِلُهُ لِلْإِنْسَانِ", "y", "Zamir, döndüğü isimden önce geldi."], ["لِلصَّائِمَةِ ثَوَابُهَا", "d", "Doğru."],
      ["ثَوَابُهَا لِلصَّائِمَةِ", "y", "Haber öne geçmeli."], ["لِلزِّرَاعَةِ أَهَمِّيَّتُهَا", "d", "Doğru."], ["أَهَمِّيَّتُهَا لِلزِّرَاعَةِ", "y", "Haber öne geçmeli."],
      ["فِي الدَّارِ صَاحِبُهَا", "d", "Doğru."], ["صَاحِبُهَا فِي الدَّارِ", "y", "Zamir döndüğü isimden önce."]
    ].map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }) },
    { type: "combo", num: "٣", ar: "اضْبِطِ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ وَبَيِّنْ سَبَبَ تَقَدُّمِ الخَبَرِ", tr: "Mübtedânın doğru harekesini, sonra haberin öne geçme sebebini seç.", items: [
      ["فِي العِمَارَةِ", ["عِيَادَةٌ", "عِيَادَةً", "عِيَادَةٍ"], "جَدِيدَةٌ.", "n", "Apartmanda yeni bir klinik var.", "Mübtedâ merfû: عِيَادَةٌ; nekra."],
      ["عَلَيْهَا", ["مِعْطَفٌ", "مِعْطَفًا", "مِعْطَفٍ"], "صُوفِيٌّ.", "n", "Üstünde yün bir palto var.", "Nekra mübtedâ."],
      ["أَمَامَ مَيْدَانِ المَدِينَةِ", ["عِمَارَةٌ", "عِمَارَةً", "عِمَارَةٍ"], "طَوِيلَةٌ.", "n", "Şehir meydanının önünde yüksek bir bina var.", "Nekra mübtedâ; haber zarf."],
      ["لِلطَّائِرَاتِ", ["أَنْظِمَتُهَا", "أَنْظِمَتَهَا", "أَنْظِمَتِهَا"], "وَقَوَانِينُهَا.", "z", "Uçakların sistemleri ve kanunları var.", "هَا habere döner."],
      ["كَيْفَ", ["صِحَّتُكِ", "صِحَّتَكِ", "صِحَّتِكِ"], "يَا عَائِشَةُ؟", "s", "Sağlığın nasıl, Âişe?", "Soru ismi."],
      ["فِي مَدِينَتِنَا", ["حَدَائِقُ", "حَدَائِقٌ", "حَدَائِقَ"], "عَامَّةٌ كَثِيرَةٌ.", "n", "Şehrimizde çok park var.", "حَدَائِقُ gayr-i munsarif: tenvin almaz."],
      ["حَوْلَ حَيِّنَا", ["طَرِيقٌ", "طَرِيقًا", "طَرِيقٍ"], "طَوِيلٌ.", "n", "Mahallemizin çevresinde uzun bir yol var.", "Nekra mübtedâ."],
      ["مَتَى", ["الاخْتِبَارُ", "الاخْتِبَارَ", "الاخْتِبَارِ"], "الأَوَّلُ؟", "s", "İlk sınav ne zaman?", "Soru ismi (kitapta “.” yazılı; soru işareti olmalı)."]
    ].map(ZB) }
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER, ATASÖZLERİ, OKUMA
{
  id: "u5", no: 5, ar: "آيَاتٌ وَأَمْثَالٌ وَقِرَاءَةٌ", tr: "Âyetler, Atasözleri ve Okuma", short: "Okumalar", col: "muz", legend: ["cerr", "nasb"],
  goals: ["Âyetlerde öne geçmiş haberi bulup sebebini söylemek", "Atasözlerinde haberin zorunlu, câiz ya da hiç öne geçmediği durumları ayırmak", "“Hâtim et-Tâî” metnini okuyup anlamak"],
  examples: [
    { s: "وَلِكُلِّ أُمَّةٍ:nasb / أَجَلٌ:cerr", tr: "Her ümmetin bir eceli vardır. (A’râf 34)" },
    { s: "عِنْدَ جُهَيْنَةَ:nasb / الخَبَرُ اليَقِينُ:cerr", tr: "Kesin haber Cüheyne’dedir. (marife mübtedâ: öne geçme câiz)" }
  ],
  rules: [
    { tr: "Mübtedâ marife iken haber öne geçmişse bu <b>zorunlu değil, câiz</b>dir; vurgu ve tahsis içindir: <span class=\"ar\">عِنْدَ جُهَيْنَةَ الخَبَرُ اليَقِينُ، بَيْنَهُمْ دَاءُ الضَّرَائِرِ</span>." },
    { tr: "<span class=\"ar\">مِنْ حُسْنِ إِسْلَامِ المَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ</span>: mübtedâ تَرْكُهُ'deki هُ haberdeki المَرْء'e döner; haber öne geçmek zorundadır." }
  ],
  kaide: ["عَيِّنِ الخَبَرَ ثُمَّ بَيِّنْ سَبَبَ تَقَدُّمِهِ."],
  ex: [
    { type: "combo", num: "٤", ar: "عَيِّنِ الخَبَرَ ثُمَّ بَيِّنْ سَبَبَ تَقَدُّمِهِ فِي الآيَاتِ القُرْآنِيَّةِ التَّالِيَةِ", tr: "Önce öne geçmiş haberi, sonra sebebini seç.", items: [
      ["﴿وَعَلَى أَبْصَارِهِمْ غِشَاوَةٌ﴾ (البقرة 7)", "عَلَى أَبْصَارِهِمْ", "غِشَاوَةٌ", "أَبْصَارِهِمْ", "n", "Gözlerinin üzerinde bir perde vardır.", "Nekra mübtedâ غِشَاوَةٌ. Aynı âyette: وَلَهُمْ عَذَابٌ عَظِيمٌ."],
      ["﴿وَلِكُلِّ أُمَّةٍ أَجَلٌ﴾ (الأعراف 34)", "لِكُلِّ أُمَّةٍ", "أَجَلٌ", "أُمَّةٍ", "n", "Her ümmetin bir eceli vardır.", "Nekra mübtedâ أَجَلٌ."],
      ["﴿فِيهَا عَيْنٌ جَارِيَةٌ، فِيهَا سُرُرٌ مَرْفُوعَةٌ﴾ (الغاشية 12-13)", "فِيهَا", "عَيْنٌ", "جَارِيَةٌ", "n", "Orada akan bir pınar, yükseltilmiş tahtlar vardır.", "Nekra mübtedâ."],
      ["﴿يَقُولُ الإِنْسَانُ يَوْمَئِذٍ أَيْنَ المَفَرُّ﴾ (القيامة 10)", "أَيْنَ", "المَفَرُّ", "يَوْمَئِذٍ", "s", "O gün insan “Kaçacak yer nerede?” der.", "Soru ismi."],
      ["﴿مَتَى نَصْرُ اللهِ﴾ (البقرة 214)", "مَتَى", "نَصْرُ اللهِ", "اللهِ", "s", "Allah’ın yardımı ne zaman?", "Soru ismi."],
      ["﴿وَيَقُولُونَ مَتَى هَذَا الوَعْدُ﴾ (يس 48)", "مَتَى", "هَذَا الوَعْدُ", "الوَعْدُ", "s", "“Bu vaat ne zaman?” derler.", "Soru ismi; mübtedâ هَذَا."],
      ["﴿لِلرِّجَالِ نَصِيبٌ مِمَّا تَرَكَ الوَالِدَانِ﴾ (النساء 7)", "لِلرِّجَالِ", "نَصِيبٌ", "مِمَّا تَرَكَ", "n", "Anne babanın bıraktığından erkeklere bir pay vardır.", "Nekra mübtedâ نَصِيبٌ."],
      ["﴿وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ﴾ (النساء 12)", "لَكُمْ", "نِصْفُ", "أَزْوَاجُكُمْ", "z", "Eşlerinizin bıraktığının yarısı sizindir.", "Mübtedâ marife (نِصْفُ مَا…); içindeki كُمْ (أَزْوَاجُكُمْ) haberdeki كُمْ'e döner."]
    ].map(TB) },
    { type: "combo", num: "٥", ar: "اقْرَأِ الأَمْثَالَ التَّالِيَةَ ثُمَّ عَيِّنِ الخَبَرَ مَعَ بَيَانِ سَبَبِ تَقَدُّمِهِ", tr: "Haberi ve öne geçme sebebini seç. Dikkat: bazılarında haber öne geçmemiş, birinde öne geçme câiz.", items: [
      ["لِكُلِّ حَيٍّ أَجَلٌ.", "لِكُلِّ حَيٍّ", "أَجَلٌ", "حَيٍّ", "n", "Her canlının bir eceli vardır.", "Nekra mübtedâ."],
      ["أَيْنَ الثَّرَى مِنَ الثُّرَيَّا!", "أَيْنَ", "الثَّرَى", "مِنَ الثُّرَيَّا", "s", "Toprak nerede, Süreyya yıldızı nerede! (İki şey arasındaki büyük fark için)", "Soru ismi."],
      ["عِنْدَ جُهَيْنَةَ الخَبَرُ اليَقِينُ.", "عِنْدَ جُهَيْنَةَ", "الخَبَرُ", "اليَقِينُ", "c", "Kesin haber Cüheyne’dedir. (İşi iyi bilen için)", "Mübtedâ marife: öne geçme zorunlu değil, câiz."],
      ["لِلْحِيطَانِ آذَانٌ.", "لِلْحِيطَانِ", "آذَانٌ", "الحِيطَانِ", "n", "Duvarların kulağı vardır.", "Nekra mübtedâ."],
      ["الحُرُّ تَكْفِيهِ الإِشَارَةُ.", "تَكْفِيهِ الإِشَارَةُ", "الحُرُّ", "الإِشَارَةُ", "y", "Hür kişiye işaret yeter.", "Mübtedâ الحُرُّ önde; haber fiil cümlesi."],
      ["الحُرُّ عَبْدٌ إِذَا طَمِعَ.", "عَبْدٌ", "الحُرُّ", "طَمِعَ", "y", "Hür, tamah edince köle olur.", "Asıl sıra: haber عَبْدٌ."],
      ["مِنْ حُسْنِ إِسْلَامِ المَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ.", "مِنْ حُسْنِ إِسْلَامِ المَرْءِ", "تَرْكُهُ", "مَا لَا يَعْنِيهِ", "z", "Kişinin Müslümanlığının güzelliğinden biri, kendini ilgilendirmeyeni bırakmasıdır. (Hadis)", "تَرْكُهُ'daki هُ habere (المَرْء) döner."],
      ["بَيْنَهُمْ دَاءُ الضَّرَائِرِ.", "بَيْنَهُمْ", "دَاءُ", "الضَّرَائِرِ", "c", "Aralarında kumaların hastalığı var. (İki kişi arasındaki düşmanlık için)", "Mübtedâ دَاءُ الضَّرَائِرِ marife: öne geçme câiz."]
    ].map(TB) },
    { type: "reading", ar: "قِرَاءَةٌ حُرَّةٌ: حَاتِمٌ الطَّائِيُّ", tr: "Metni oku, soruları cevapla; sonra koyu haberin öne geçip geçmediğini ve sebebini seç.", title: "حَاتِمٌ الطَّائِيُّ",
      text: "لِكُلِّ أُمَّةٍ شَخْصِيَّاتٌ فَرِيدَةٌ تَعْتَزُّ وَتَفْتَخِرُ بِهَا. هَذِهِ الشَّخْصِيَّاتُ تَجْمَعُ الخِصَالَ الحَمِيدَةَ وَالأَخْلَاقَ النَّبِيلَةَ. هَلْ سَمِعْتُمْ بِحَاتِمٍ الطَّائِيِّ؟ إِنَّهُ مِنْ هَذِهِ الشَّخْصِيَّاتِ الفَذَّةِ. هَلْ تَعْرِفُونَ مَنْ حَاتِمٌ الطَّائِيُّ وَأَيْنَ عَاشَ؟ هُوَ أَبُو عَدِيٍّ حَاتِمُ بْنُ عَبْدِ اللهِ بْنِ سَعْدِ بْنِ الحَشْرَجِ الطَّائِيُّ القَحْطَانِيُّ، المُتَوَفَّى سَنَةَ ٥٧٨م، فَارِسٌ شَاعِرٌ جَوَادٌ يُضْرَبُ المَثَلُ بِجُودِهِ. عَاشَ وَمَاتَ فِي الجَاهِلِيَّةِ. تَمَيَّزَ شِعْرُهُ بِالحِكَمِ الجَمِيلَةِ وَالحَثِّ عَلَى الجُودِ وَالكَرَمِ. وَكَانَ ابْنُهُ عَدِيُّ بْنُ حَاتِمٍ الطَّائِيُّ رَضِيَ اللهُ عَنْهُ مِنْ أَصْحَابِ رَسُولِ اللهِ ﷺ. وَلِحَاتِمٍ مَآثِرُ حَمِيدَةٌ وَأُمُورٌ عَجِيبَةٌ وَأَخْبَارٌ مُسْتَغْرَبَةٌ فِي كَرَمِهِ، وَأُمُّهُ أَيْضًا كَانَتْ فِي الجُودِ بِمَنْزِلَةِ حَاتِمٍ. إِذَا أَتَاهُ ضَيْفٌ فَهُوَ يَسْتَقْبِلُهُ أَحْسَنَ اسْتِقْبَالٍ، وَيُقَدِّمُ لَهُ الطَّعَامَ وَالمَاءَ وَالفِرَاشَ، وَيَقُومُ بِخِدْمَةِ ضَيْفِهِ دُونَ أَنْ يَسْأَلَهُ مَاذَا يُرِيدُ. وَحَتَّى اليَوْمِ يُضْرَبُ المَثَلُ بِكَرَمِ حَاتِمٍ، فَيُقَالُ: هَذَا كَرَمٌ حَاتِمِيٌّ، أَوْ يُقَالُ: فُلَانٌ أَكْرَمُ مِنْ حَاتِمٍ. وَكَانَ حَاتِمٌ الطَّائِيُّ يُنْفِقُ عَلَى ضُيُوفِهِ وَأَصْحَابِهِ وَأَبْنَاءِ السَّبِيلِ (أَيِ المُسَافِرِينَ) كُلَّ مَا يَمْلِكُ حَتَّى يَصِيرَ فَقِيرًا لَا يَجِدُ مَا يَأْكُلُهُ هُوَ وَأَوْلَادُهُ، وَكُلَّمَا وَصَلَ إِلَى يَدَيْهِ مَالٌ أَنْفَقَهُ عَلَى غَيْرِهِ. وَلَمْ تَرْضَ زَوْجَتُهُ «مَاوِيَّةُ» عَنْ هَذَا الحَالِ، فَرَدَّ عَلَيْهَا بِقَوْلِهِ: «وَقَائِلَةٍ: أَهْلَكْتَ بِالجُودِ مَالَنَا ** وَنَفْسَكَ حَتَّى ضَرَّ نَفْسَكَ جُودُهَا / فَقُلْتُ: دَعِينِي إِنَّمَا تِلْكَ عَادَتِي ** لِكُلِّ كَرِيمٍ عَادَةٌ يَسْتَعِيدُهَا». وَقَدْ حَاوَلَتْ زَوْجَتُهُ كَثِيرًا أَنْ تُعَلِّمَهُ الاقْتِصَادَ، وَطَلَبَتْ مِنْهُ أَنْ يَحْفَظَ المَالَ مِنْ أَجْلِ أَوْلَادِهِ، لَكِنَّهُ لَمْ يَفْعَلْ، فَطَلَّقَتْهُ حَتَّى يَأْخُذَ دَرْسًا. وَكَانَتِ المَرْأَةُ إِذَا أَرَادَتْ أَنْ تُطَلِّقَ زَوْجَهَا حَوَّلَتْ بَابَ مَنْزِلِهَا؛ فَإِذَا كَانَ البَابُ فِي الشَّرْقِ جَعَلَتْهُ فِي الغَرْبِ، وَإِذَا كَانَ فِي الغَرْبِ جَعَلَتْهُ فِي الشَّرْقِ. وَلَكِنَّ «مَاوِيَّةَ» رَجَعَتْ إِلَى زَوْجِهَا ثَانِيَةً بَعْدَ أَنْ عَرَفَتْ أَنَّ طَبْعَهُ لَنْ يَتَغَيَّرَ.",
      textTr: "Her milletin övündüğü eşsiz şahsiyetleri vardır; bu şahsiyetler güzel huyları ve soylu ahlakı kendilerinde toplar. Hâtim et-Tâî’yi duydunuz mu? O da bu eşsiz şahsiyetlerdendir. Hâtim et-Tâî kimdir, nerede yaşamıştır, biliyor musunuz? O, Ebû Adî Hâtim b. Abdullah b. Sa’d b. el-Haşrec et-Tâî el-Kahtânî’dir; 578’de vefat etmiştir. Cömertliğiyle darb-ı mesel olmuş bir atlı, şair ve cömert kişidir. Câhiliye döneminde yaşayıp ölmüştür. Şiiri güzel hikmetlerle ve cömertliğe teşvikle öne çıkar. Oğlu Adî b. Hâtim, Resûlullah’ın ashabındandı. Hâtim’in cömertliğine dair güzel izleri, şaşırtıcı işleri ve ilginç haberleri vardır; annesi de cömertlikte onun gibiydi. Ona bir misafir gelince onu en güzel şekilde karşılar, yemek, su ve yatak sunar, ne istediğini sormadan hizmet ederdi. Bugün bile onun cömertliği örnek gösterilir: “Bu Hâtim’ce bir cömertlik” ya da “Falanca Hâtim’den cömert” denir. Misafirlerine, dostlarına ve yolculara her şeyini harcar, sonunda kendisinin ve çocuklarının yiyeceğini bulamayacak kadar fakir düşerdi; eline her mal geçtiğinde onu başkalarına harcardı. Karısı Mâviyye bu durumdan razı olmadı; Hâtim ona şiirle cevap verdi: “Bir kadın der ki: Cömertlikle malımızı da kendini de helâk ettin… Dedim ki: Bırak beni, bu benim âdetim; her cömerdin tekrar tekrar döndüğü bir âdeti vardır.” Karısı ona tutumluluğu öğretmeye çok çalıştı, çocukları için malı korumasını istedi; o yapmadı. Ders alsın diye ondan ayrıldı. O zaman kadın kocasından ayrılmak isterse evinin kapısını çevirirdi: kapı doğudaysa batıya, batıdaysa doğuya alırdı. Ama Mâviyye, onun huyunun değişmeyeceğini anlayınca kocasına yeniden döndü.",
      qa: [
        { q: "مَنْ حَاتِمٌ الطَّائِيُّ؟", a: "فَارِسٌ شَاعِرٌ جَوَادٌ عَاشَ وَمَاتَ فِي الجَاهِلِيَّةِ، يُضْرَبُ المَثَلُ بِجُودِهِ.", tr: "Hâtim et-Tâî kimdir? Câhiliyede yaşamış, cömertliğiyle meşhur atlı bir şair." },
        { q: "بِمَ تَمَيَّزَ شِعْرُهُ؟", a: "بِالحِكَمِ الجَمِيلَةِ وَالحَثِّ عَلَى الجُودِ وَالكَرَمِ.", tr: "Şiiri neyle öne çıkar? Güzel hikmetler ve cömertliğe teşvikle." },
        { q: "لِمَاذَا طَلَّقَتْهُ زَوْجَتُهُ؟", a: "حَتَّى يَأْخُذَ دَرْسًا؛ لِأَنَّهُ لَمْ يَحْفَظِ المَالَ مِنْ أَجْلِ أَوْلَادِهِ.", tr: "Karısı neden ondan ayrıldı? Ders alsın diye; malı çocukları için korumadığı için." },
        { q: "لِمَاذَا رَجَعَتْ مَاوِيَّةُ إِلَيْهِ؟", a: "لِأَنَّهَا عَرَفَتْ أَنَّ طَبْعَهُ لَنْ يَتَغَيَّرَ.", tr: "Mâviyye neden döndü? Huyunun değişmeyeceğini anladığı için." }
      ],
      cls: { opts: SB5, ar: "هَلْ تَقَدَّمَ الخَبَرُ؟ وَلِمَاذَا؟", tr: "Koyu haber öne geçmiş mi? Neden?", items: [
        { s: HL("لِكُلِّ أُمَّةٍ شَخْصِيَّاتٌ فَرِيدَةٌ", "لِكُلِّ أُمَّةٍ"), a: "n", why: "Nekra mübtedâ شَخْصِيَّاتٌ." },
        { s: HL("هَذِهِ الشَّخْصِيَّاتُ تَجْمَعُ الخِصَالَ الحَمِيدَةَ", "تَجْمَعُ الخِصَالَ الحَمِيدَةَ"), a: "y", why: "Asıl sıra: mübtedâ هَذِهِ, haber fiil cümlesi." },
        { s: HL("هَلْ تَعْرِفُونَ مَنْ حَاتِمٌ الطَّائِيُّ؟", "مَنْ"), a: "s", why: "Soru ismi مَنْ haber; mübtedâ حَاتِمٌ." },
        { s: HL("وَلِحَاتِمٍ مَآثِرُ حَمِيدَةٌ", "لِحَاتِمٍ"), a: "n", why: "Nekra mübtedâ مَآثِرُ." },
        { s: HL("فَهُوَ يَسْتَقْبِلُهُ أَحْسَنَ اسْتِقْبَالٍ", "يَسْتَقْبِلُهُ"), a: "y", why: "Asıl sıra: mübtedâ هُوَ." },
        { s: HL("هَذَا كَرَمٌ حَاتِمِيٌّ", "كَرَمٌ"), a: "y", why: "Asıl sıra." },
        { s: HL("فُلَانٌ أَكْرَمُ مِنْ حَاتِمٍ", "أَكْرَمُ"), a: "y", why: "Asıl sıra; haber ism-i tafdîl." },
        { s: HL("إِنَّمَا تِلْكَ عَادَتِي", "عَادَتِي"), a: "y", why: "Asıl sıra: mübtedâ تِلْكَ." },
        { s: HL("لِكُلِّ كَرِيمٍ عَادَةٌ يَسْتَعِيدُهَا", "لِكُلِّ كَرِيمٍ"), a: "n", why: "Nekra mübtedâ عَادَةٌ." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
// Doğru Kelime oyunu: [cümle {boşluk}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var MV_POOL = [
  ["{أَيْنَ} مُدِيرُ المَدْرَسَةِ؟", ["أَيْنَ", "مَتَى", "كَمْ"], "yer soran: أَيْنَ", "Müdür nerede?", "u2"],
  ["{مَتَى} الامْتِحَانُ؟", ["مَتَى", "أَيْنَ", "مَنْ"], "zaman soran: مَتَى", "Sınav ne zaman?", "u2"],
  ["{كَيْفَ} الدِّرَاسَةُ؟", ["كَيْفَ", "كَمْ", "مَنْ"], "durum soran: كَيْفَ", "Okul nasıl?", "u2"],
  ["{كَمْ} عَدَدُ الطُّلَّابِ؟", ["كَمْ", "كَيْفَ", "أَيْنَ"], "sayı soran: كَمْ", "Öğrenci sayısı kaç?", "u2"],
  ["{مَا} مِهْنَتُكَ؟", ["مَا", "مَنْ", "مَتَى"], "şey soran: مَا", "Mesleğin ne?", "u2"],
  ["{مَنْ} رَبُّ السَّمَاوَاتِ وَالأَرْضِ؟", ["مَنْ", "مَا", "كَمْ"], "kişi soran: مَنْ", "Göklerin Rabbi kim?", "u2"],
  ["أَيْنَ {الثَّرَى} مِنَ الثُّرَيَّا!", ["الثَّرَى", "الثُّرَيَّا", "ثَرًى"], "mübtedâ: merfû (takdîrî)", "Toprak nerede, Süreyya nerede!", "u2"],
  ["فِي الفَصْلِ {طَالِبَةٌ}.", ["طَالِبَةٌ", "طَالِبَةً", "طَالِبَةٍ"], "mübtedâ merfû", "Sınıfta bir kız öğrenci var.", "u3"],
  ["عِنْدَ صَدِيقِي {ضَيْفٌ}.", ["ضَيْفٌ", "ضَيْفًا", "ضَيْفٍ"], "mübtedâ merfû", "Arkadaşımda bir misafir var.", "u3"],
  ["فِي مَدِينَتِنَا {حَدَائِقُ} كَثِيرَةٌ.", ["حَدَائِقُ", "حَدَائِقٌ", "حَدَائِقَ"], "gayr-i munsarif: tenvinsiz damme", "Şehrimizde çok park var.", "u3"],
  ["{فِي الحَدِيقَةِ} أَشْجَارٌ.", ["فِي الحَدِيقَةِ", "الحَدِيقَةُ", "أَيْنَ"], "nekra mübtedâ: şibh-i cümle haber önde", "Bahçede ağaçlar var.", "u3"],
  ["{لِكُلِّ أُمَّةٍ} أَجَلٌ.", ["لِكُلِّ أُمَّةٍ", "كُلُّ أُمَّةٍ", "لِكُلِّ أُمَّةٌ"], "câr-mecrûr haber", "Her ümmetin eceli var.", "u3"],
  ["لِلْحِيطَانِ {آذَانٌ}.", ["آذَانٌ", "آذَانًا", "آذَانٍ"], "mübtedâ merfû", "Duvarların kulağı var.", "u3"],
  ["عَلَيْهَا {مِعْطَفٌ} صُوفِيٌّ.", ["مِعْطَفٌ", "مِعْطَفًا", "مِعْطَفٍ"], "mübtedâ merfû", "Üstünde yün palto var.", "u3"],
  ["لِلْإِنْسَانِ {مَشَاكِلُهُ}.", ["مَشَاكِلُهُ", "مَشَاكِلُهَا", "مَشَاكِلُهُمْ"], "zamir الإِنْسَان'a uyar", "İnsanın sorunları var.", "u4"],
  ["لِلصَّائِمَةِ {ثَوَابُهَا}.", ["ثَوَابُهَا", "ثَوَابُهُ", "ثَوَابَهَا"], "هَا, merfû", "Oruçlu kadının sevabı var.", "u4"],
  ["لِلزِّرَاعَةِ {أَهَمِّيَّتُهَا}.", ["أَهَمِّيَّتُهَا", "أَهَمِّيَّتُهُ", "أَهَمِّيَّتِهَا"], "هَا, merfû", "Tarımın önemi var.", "u4"],
  ["لِلطَّائِرَاتِ {أَنْظِمَتُهَا}.", ["أَنْظِمَتُهَا", "أَنْظِمَتُهُمْ", "أَنْظِمَتَهَا"], "akılsız çoğul: هَا", "Uçakların sistemleri var.", "u4"],
  ["لِلْأَوْلَادِ {مَشَاكِلُهُمْ}.", ["مَشَاكِلُهُمْ", "مَشَاكِلُهُ", "مَشَاكِلَهُمْ"], "هُمْ, merfû", "Çocukların sorunları var.", "u4"],
  ["كَيْفَ {صِحَّتُكِ} يَا عَائِشَةُ؟", ["صِحَّتُكِ", "صِحَّتَكِ", "صِحَّتِكِ"], "mübtedâ merfû", "Sağlığın nasıl?", "u4"],
  ["مِنْ حُسْنِ إِسْلَامِ المَرْءِ {تَرْكُهُ} مَا لَا يَعْنِيهِ.", ["تَرْكُهُ", "تَرْكَهُ", "تَرْكِهِ"], "mübtedâ merfû", "Kişinin İslâm’ının güzelliği…", "u4"]
];
// Cümleyi Diz: [parçalar ← sıra, doğru, y1, y2, açıklama, konu]
var DON = [
  ["طَالِبَةٌ + فِي الفَصْلِ ← sıra", "فِي الفَصْلِ طَالِبَةٌ.", "طَالِبَةٌ فِي الفَصْلِ.", "فِي الفَصْلِ طَالِبَةً.", "nekra mübtedâ: haber önde", "u3"],
  ["الطَّالِبَةُ + فِي الفَصْلِ ← sıra", "الطَّالِبَةُ فِي الفَصْلِ.", "طَالِبَةٌ فِي الفَصْلِ.", "الطَّالِبَةَ فِي الفَصْلِ.", "marife: asıl sıra", "u3"],
  ["ضَيْفٌ + عِنْدَ صَدِيقِي ← sıra", "عِنْدَ صَدِيقِي ضَيْفٌ.", "ضَيْفٌ عِنْدَ صَدِيقِي.", "عِنْدُ صَدِيقِي ضَيْفٌ.", "nekra: zarf önde", "u3"],
  ["أَشْجَارٌ + فِي الحَدِيقَةِ ← sıra", "فِي الحَدِيقَةِ أَشْجَارٌ.", "أَشْجَارٌ فِي الحَدِيقَةِ.", "فِي الحَدِيقَةِ أَشْجَارًا.", "nekra mübtedâ", "u3"],
  ["سَيَّارَاتٌ + أَمَامَ عِمَارَتِنَا ← sıra", "أَمَامَ عِمَارَتِنَا سَيَّارَاتٌ.", "سَيَّارَاتٌ أَمَامَ عِمَارَتِنَا.", "أَمَامُ عِمَارَتِنَا سَيَّارَاتٌ.", "nekra: zarf önde", "u3"],
  ["مُدِيرُ المَدْرَسَةِ + أَيْنَ ← sıra", "أَيْنَ مُدِيرُ المَدْرَسَةِ؟", "مُدِيرُ المَدْرَسَةِ أَيْنَ؟", "أَيْنَ مُدِيرَ المَدْرَسَةِ؟", "soru ismi başta", "u2"],
  ["الامْتِحَانُ + مَتَى ← sıra", "مَتَى الامْتِحَانُ؟", "الامْتِحَانُ مَتَى؟", "مَتَى الامْتِحَانَ؟", "soru ismi başta", "u2"],
  ["الدِّرَاسَةُ + كَيْفَ ← sıra", "كَيْفَ الدِّرَاسَةُ؟", "الدِّرَاسَةُ كَيْفَ؟", "كَيْفَ الدِّرَاسَةِ؟", "soru ismi başta", "u2"],
  ["مِهْنَتُكَ + مَا ← sıra", "مَا مِهْنَتُكَ؟", "مِهْنَتُكَ مَا؟", "مَا مِهْنَتَكَ؟", "soru ismi başta", "u2"],
  ["مَشَاكِلُهُ + لِلْإِنْسَانِ ← sıra", "لِلْإِنْسَانِ مَشَاكِلُهُ.", "مَشَاكِلُهُ لِلْإِنْسَانِ.", "لِلْإِنْسَانِ مَشَاكِلَهُ.", "zamir habere döner", "u4"],
  ["ثَوَابُهَا + لِلصَّائِمَةِ ← sıra", "لِلصَّائِمَةِ ثَوَابُهَا.", "ثَوَابُهَا لِلصَّائِمَةِ.", "لِلصَّائِمَةِ ثَوَابُهُ.", "zamir habere döner", "u4"],
  ["أَهَمِّيَّتُهَا + لِلزِّرَاعَةِ ← sıra", "لِلزِّرَاعَةِ أَهَمِّيَّتُهَا.", "أَهَمِّيَّتُهَا لِلزِّرَاعَةِ.", "لِلزِّرَاعَةِ أَهَمِّيَّتُهُ.", "zamir habere döner", "u4"],
  ["صَاحِبُهَا + فِي الدَّارِ ← sıra", "فِي الدَّارِ صَاحِبُهَا.", "صَاحِبُهَا فِي الدَّارِ.", "فِي الدَّارِ صَاحِبَهَا.", "zamir habere döner", "u4"],
  ["الطِّفْلُ + يَلْعَبُ ← isim cümlesi", "الطِّفْلُ يَلْعَبُ.", "يَلْعَبُ الطِّفْلُ.", "الطِّفْلَ يَلْعَبُ.", "fiil cümlesi haber öne alınmaz", "u3"]
];
// Neden Öne Geçti? hız oyunu: [cümle (haber koyu), sebep, açıklama]
var NOUN_LIST = [];
UNITS.forEach(function (u) { u.ex.forEach(function (ex) {
  if (ex.type === "classify" && (ex.opts === SB3 || ex.opts === SB5)) ex.items.forEach(function (it) { NOUN_LIST.push([it.s, it.a, it.why]); });
  if (ex.cls && ex.cls.opts === SB5) ex.cls.items.forEach(function (it) { NOUN_LIST.push([it.s, it.a, it.why]); });
}); });
HM.forEach(function (h) { var hf = h[2] !== "m"; NOUN_LIST.push([hf ? '<b class="hl">' + h[1] + '</b> ' + h[0] + h[5] : h[0] + ' <b class="hl">' + h[1] + '</b>' + h[5], h[3], HM_NOTE[h[3]]]); });
var SP_M = SB5;
// Doğru mu yanlış mı? hız oyunu
var MM_OPTS = [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "x"]];
var MM_LIST = [];
UNITS.forEach(function (u) { u.ex.forEach(function (ex) { if (ex.type === "classify" && ex.opts[0][0] === "d") ex.items.forEach(function (it) { MM_LIST.push([it.s, it.a, it.why]); }); }); });
var HAFIZA = {
  sr: { name: "Yanlış ↔ doğru sıra", pairs: [["طَالِبَةٌ فِي الفَصْلِ ✗", "فِي الفَصْلِ طَالِبَةٌ"], ["المُدِيرُ أَيْنَ؟ ✗", "أَيْنَ المُدِيرُ؟"], ["مَشَاكِلُهُ لِلْإِنْسَانِ ✗", "لِلْإِنْسَانِ مَشَاكِلُهُ"], ["ضَيْفٌ عِنْدَ صَدِيقِي ✗", "عِنْدَ صَدِيقِي ضَيْفٌ"], ["الامْتِحَانُ مَتَى؟ ✗", "مَتَى الامْتِحَانُ؟"], ["ثَوَابُهَا لِلصَّائِمَةِ ✗", "لِلصَّائِمَةِ ثَوَابُهَا"], ["آذَانٌ لِلْحِيطَانِ ✗", "لِلْحِيطَانِ آذَانٌ"]] },
  sc: { name: "Soru ismi ↔ anlamı", pairs: [["أَيْنَ", "nerede"], ["مَتَى", "ne zaman"], ["كَيْفَ", "nasıl"], ["كَمْ", "kaç"], ["مَا", "ne"], ["مَنْ", "kim"], ["أَيْنَ المَفَرُّ؟", "Kaçacak yer nerede?"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["لِلْحِيطَانِ آذَانٌ", "Duvarların kulağı var."], ["لِكُلِّ حَيٍّ أَجَلٌ", "Her canlının eceli var."], ["فِي الفَصْلِ طَالِبَةٌ", "Sınıfta bir kız öğrenci var."], ["لِلْإِنْسَانِ مَشَاكِلُهُ", "İnsanın kendi sorunları var."], ["مَتَى نَصْرُ اللهِ", "Allah’ın yardımı ne zaman?"], ["عِنْدَ صَدِيقِي ضَيْفٌ", "Arkadaşımda bir misafir var."], ["كَيْفَ صِحَّتُكِ؟", "Sağlığın nasıl?"]] }
};
var KARTLAR = [
  ["Asıl sıra?", "Önce mübtedâ, sonra haber: المُعَلِّمُ رَحِيمٌ"],
  ["Haber kaç durumda öne geçmek zorundadır?", "Üç: soru ismi · nekra mübtedâ + şibh-i cümle · mübtedâda habere dönen zamir"],
  ["Sadâret hakkı nedir?", "Soru isimlerinin cümlenin başında olma hakkı: أَيْنَ، مَتَى، كَيْفَ، كَمْ، مَا، مَنْ"],
  ["أَيْنَ مُدِيرُ المَدْرَسَةِ؟ mübtedâ?", "مُدِيرُ المَدْرَسَةِ; haber أَيْنَ"],
  ["فِي الفَصْلِ طَالِبَةٌ: neden haber önde?", "Mübtedâ nekra, haber câr-mecrûr."],
  ["الطَّالِبَةُ فِي الفَصْلِ doğru mu?", "Evet: mübtedâ marife, asıl sıra."],
  ["لِلْإِنْسَانِ مَشَاكِلُهُ: neden?", "مَشَاكِلُهُ'deki هُ habere (الإِنْسَان) döner."],
  ["مَشَاكِلُهُ لِلْإِنْسَانِ neden yanlış?", "Zamir, döndüğü isimden önce gelemez."],
  ["Öne geçince i’rab?", "Haber: خَبَرٌ مُقَدَّمٌ · mübtedâ: مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ"],
  ["عِنْدَ جُهَيْنَةَ الخَبَرُ اليَقِينُ?", "Mübtedâ marife: öne geçme zorunlu değil, câiz."],
  ["فِي مَدِينَتِنَا حَدَائِقُ: neden tenvin yok?", "حَدَائِقُ gayr-i munsarif."],
  ["لِلْحِيطَانِ آذَانٌ ne demek?", "Duvarların kulağı var (nekra mübtedâ)."]
];
