// ================= VERİ: Bedel (البَدَلُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "", tr: "Fiil" }, nasb: { ar: "المُبْدَلُ مِنْهُ", tr: "Mübdel minh" }, cerr: { ar: "البَدَلُ", tr: "Bedel" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TUR = [["k", "Bedel-i küll (mutâbık)", "بَدَلُ كُلٍّ مِنْ كُلٍّ", "nasb"], ["b", "Bedel-i ba’z", "بَدَلُ بَعْضٍ مِنْ كُلٍّ", "cerr"], ["s", "Bedel-i iştimâl", "بَدَلُ اشْتِمَالٍ", "mi"]];
var TB = [["e", "Bedel", "بَدَلٌ", "cerr"], ["n", "Na’t (sıfat)", "نَعْتٌ", "ref"], ["t", "Te’kîd", "تَأْكِيدٌ", "mz"]];
var RD = TUR.concat([["x", "Bedel değil", "لَيْسَ بَدَلًا", "x"]]);
var IRB = [["r", "Merfû", "مَرْفُوعٌ", "nasb"], ["m", "Mansûb", "مَنْصُوبٌ", "cerr"], ["c", "Mecrûr", "مَجْرُورٌ", "mi"]];
var TUR_TR = { k: "Bedel-i küll", b: "Bedel-i ba’z", s: "Bedel-i iştimâl", x: "Bedel değil", e: "Bedel", n: "Na’t", t: "Te’kîd", r: "Merfû", m: "Mansûb", c: "Mecrûr" };
// Makine: [mübdel minh, [küll, ba’z, iştimâl, bedelsiz], [Türkçe ×4]]
var BX = [
  ["الكِتَابُ", ["قَرَأْتُ:mz / الكِتَابَ:nasb / «الأَيَّامَ».:cerr", "قَرَأْتُ:mz / الكِتَابَ:nasb / نِصْفَهُ.:cerr", "أَعْجَبَنِي:mz / الكِتَابُ:nasb / أُسْلُوبُهُ.:cerr", "قَرَأْتُ:mz / نِصْفَ:cerr / الكِتَابِ.:nasb"], ["“el-Eyyâm” kitabını okudum.", "Kitabın yarısını okudum.", "Kitabın üslubu hoşuma gitti.", "Kitabın yarısını okudum. (bedelsiz)"]],
  ["المَدِينَةُ", ["زُرْتُ:mz / المَدِينَةَ:nasb / إِسْطَنْبُولَ.:cerr", "زُرْتُ:mz / المَدِينَةَ:nasb / نِصْفَهَا.:cerr", "أَعْجَبَتْنِي:mz / المَدِينَةُ:nasb / آثَارُهَا.:cerr", "أَعْجَبَتْنِي:mz / آثَارُ:cerr / المَدِينَةِ.:nasb"], ["İstanbul şehrini ziyaret ettim.", "Şehrin yarısını gezdim.", "Şehrin eserleri hoşuma gitti.", "Şehrin eserleri hoşuma gitti. (bedelsiz)"]],
  ["الأُسْتَاذُ", ["حَضَرَ:mz / الأُسْتَاذُ:nasb / أَحْمَدُ.:cerr", "عَالَجَ الطَّبِيبُ:mz / الأُسْتَاذَ:nasb / عَيْنَهُ.:cerr", "أَعْجَبَنِي:mz / الأُسْتَاذُ:nasb / عِلْمُهُ.:cerr", "أَعْجَبَنِي:mz / عِلْمُ:cerr / الأُسْتَاذِ.:nasb"], ["Ahmed Hoca geldi.", "Doktor hocanın gözünü tedavi etti.", "Hocanın ilmi hoşuma gitti.", "Hocanın ilmi hoşuma gitti. (bedelsiz)"]],
  ["الطُّلَّابُ", ["نَجَحَ:mz / الطُّلَّابُ:nasb / عَلِيٌّ وَخَالِدٌ وَسَعِيدٌ.:cerr", "نَجَحَ:mz / الطُّلَّابُ:nasb / أَكْثَرُهُمْ.:cerr", "أَعْجَبَنِي:mz / الطُّلَّابُ:nasb / نَشَاطُهُمْ.:cerr", "نَجَحَ:mz / أَكْثَرُ:cerr / الطُّلَّابِ.:nasb"], ["Öğrenciler, (yani) Ali, Hâlid ve Saîd başardı.", "Öğrencilerin çoğu başardı.", "Öğrencilerin çalışkanlığı hoşuma gitti.", "Öğrencilerin çoğu başardı. (bedelsiz)"]],
  ["الشَّجَرَةُ", ["رَأَيْتُ:mz / الشَّجَرَةَ:nasb / الزَّيْتُونَةَ.:cerr", "قَطَعْتُ:mz / الشَّجَرَةَ:nasb / أَغْصَانَهَا.:cerr", "أَعْجَبَتْنِي:mz / الشَّجَرَةُ:nasb / ظِلُّهَا.:cerr", "قَطَعْتُ:mz / أَغْصَانَ:cerr / الشَّجَرَةِ.:nasb"], ["Ağacı, (yani) zeytin ağacını gördüm.", "Ağacın dallarını kestim.", "Ağacın gölgesi hoşuma gitti.", "Ağacın dallarını kestim. (bedelsiz)"]],
  ["الشَّهْرُ", ["صُمْتُ:mz / الشَّهْرَ:nasb / رَمَضَانَ.:cerr", "صُمْتُ:mz / الشَّهْرَ:nasb / نِصْفَهُ.:cerr", "أَحْبَبْتُ:mz / الشَّهْرَ:nasb / بَرَكَتَهُ.:cerr", "صُمْتُ:mz / نِصْفَ:cerr / الشَّهْرِ.:nasb"], ["Ramazan ayını oruçla geçirdim.", "Ayın yarısında oruç tuttum.", "Ayın bereketini sevdim.", "Ayın yarısında oruç tuttum. (bedelsiz)"]]
];
var BT = ["بَدَلُ كُلٍّ", "بَدَلُ بَعْضٍ", "بَدَلُ اشْتِمَالٍ", "بِلَا بَدَلٍ (إِضَافَةٌ)"];
var BN = [
  "Bedel-i küll: bedel, mübdel minh’in ta kendisidir; ona dönen zamir almaz.",
  "Bedel-i ba’z: bedel, mübdel minh’in bir parçasıdır ve ona dönen zamiri taşır.",
  "Bedel-i iştimâl: bedel, mübdel minh’in parçası değil, onda bulunan bir özelliktir; zamir taşır.",
  "Bedel kaldırılınca parça ya da özellik isme muzâf olur (izafet); anlam aynı kalır."
];

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
// Bedel + tür: [cümle, [bedel ×3], tür anahtarı, Türkçe, açıklama]
var TRL = { k: "بَدَلُ كُلٍّ", b: "بَدَلُ بَعْضٍ", s: "بَدَلُ اشْتِمَالٍ" };
var TRI = { k: ["k", "b", "s"], b: ["b", "s", "k"], s: ["s", "k", "b"] };
function BD(x, i) { return CBP([x[0] + "<br>البَدَلُ:", x[1], "· نَوْعُهُ:", TRI[x[2]].map(function (k) { return TRL[k]; })], i, x[3], x[4]); }

var METIN = "وَقَفَ أَحَدُ الصَّحَابَةِ أَمَامَ رَسُولِ اللهِ ﷺ وَأَخْبَرَهُ أَنَّ عَمَّهُ العَبَّاسَ رَضِيَ اللهُ عَنْهُ أَخَذَهُ المُسْلِمُونَ ضِمْنَ أَسْرَى المُشْرِكِينَ فِي غَزْوَةِ بَدْرٍ. وَكَانَ العَبَّاسُ وَزَوْجَتُهُ أُمُّ الفَضْلِ قَدْ أَسْلَمَا قَبْلَ بَدْرٍ، لَكِنَّ العَبَّاسَ أَخْفَى إِسْلَامَهُ وَبَقِيَ فِي مَكَّةَ بِأَمْرٍ مِنَ الرَّسُولِ ﷺ لِيَنْقُلَ إِلَى المُسْلِمِينَ أَخْبَارَ المُشْرِكِينَ.<br>سَهِرَ الرَّسُولُ ﷺ فِي بَدْرٍ وَلَمْ يَأْتِهِ نَوْمٌ، وَقَدْ مَضَى اللَّيْلُ نِصْفُهُ، فَقَالَ لَهُ الصَّحَابَةُ: مَا لَكَ يَا رَسُولَ اللهِ لَا تَنَامُ؟ فَقَالَ ﷺ: «سَمِعْتُ العَبَّاسَ أَنِينَهُ فِي وَثَاقِهِ». فَقَامَ الصَّحَابَةُ بَعْضُهُمْ فَخَفَّفُوا مِنْ وَثَاقِهِ. وَلَمَّا عَلِمَ الرَّسُولُ ﷺ أَمَرَهُمْ أَنْ يَفْعَلُوا ذَلِكَ بِالأَسْرَى كُلِّهِمْ.";

var UNITS = [
// ---------------------------------------------------------------- 1 · TANIM
{
  id: "u1", no: 1, ar: "البَدَلُ وَرُكْنَاهُ", tr: "Bedel ve İki Öğesi", short: "Tanım", col: "nasb", legend: ["nasb", "cerr"],
  goals: ["Bedelin hükmün asıl kastedildiği tâbi olduğunu bilmek", "Mübdel minh’i ve bedeli ayırmak", "Bedeli na’t ve te’kîdden ayırmak"],
  examples: [
    { s: "حَضَرَ:- / أَخُوكَ:nasb / حَسَنٌ.:cerr", tr: "Kardeşin Hasan geldi.", pair: "سَلَّمْتُ عَلَى:- / صَدِيقِكَ:nasb / حُسَيْنٍ.:cerr", pairTr: "Arkadaşın Hüseyin’e selam verdim." },
    { s: "قَرَأْتُ:- / الكِتَابَ:nasb / نِصْفَهُ.:cerr", tr: "Kitabın yarısını okudum.", pair: "أَعْجَبَنِي:- / الشَّابُّ:nasb / أَدَبُهُ.:cerr", pairTr: "Gencin edebi hoşuma gitti." }
  ],
  rules: [
    { tr: "<b>Bedel</b> (<span class=\"ar\">البَدَلُ</span>), i’rabda kendinden öncekine uyan bir tâbi’dir. Hükümde <b>asıl kastedilen</b> odur; önceki kelime (<b>mübdel minh</b>) ona zemin hazırlamak için anılır." },
    { tr: "İki öğesi vardır:", ex: ["قَامَ الطُّلَّابُ بَعْضُهُمْ ← الطُّلَّابُ: المُبْدَلُ مِنْهُ · بَعْضُهُمْ: البَدَلُ"] },
    { tr: "“Kardeşin geldi” denince “hangisi?” sorusu kalır; <span class=\"ar\">حَسَنٌ</span> eklenince asıl kastedilen netleşir. Mübdel minh atılsa da cümle kurulabilir: <span class=\"ar\">حَضَرَ حَسَنٌ</span>." },
    { tr: "Bedeli öbür tâbi’lerden ayır: <b>na’t</b> nitelik bildirir (<span class=\"ar\">الصِّرَاطَ المُسْتَقِيمَ</span>), <b>te’kîd</b> pekiştirir (<span class=\"ar\">الكِتَابَ كُلَّهُ</span>), <b>bedel</b> asıl kastedileni söyler (<span class=\"ar\">الكِتَابَ نِصْفَهُ</span>)." }
  ],
  kaide: ["١ ـ البَدَلُ: اسْمٌ تَابِعٌ فِي الإِعْرَابِ لِمَا قَبْلَهُ، وَهُوَ المَقْصُودُ بِالحُكْمِ، وَيُذْكَرُ مَتْبُوعُهُ تَمْهِيدًا لَهُ.", "٤ ـ لِلْبَدَلِ رُكْنَانِ: المُبْدَلُ مِنْهُ وَالبَدَلُ، مِثْلُ: قَامَ الطُّلَّابُ بَعْضُهُمْ. الطُّلَّابُ: المُبْدَلُ مِنْهُ، بَعْضُهُمْ: البَدَلُ."],
  ex: [
    { type: "tag", extra: true, roles: ["nasb", "cerr", "x"], ar: "عَيِّنِ المُبْدَلَ مِنْهُ وَالبَدَلَ", tr: "Mübdel minh’i ve bedeli etiketle; kalanlar Başka.", items: [
      T("حَضَرَ:x / أَخُوكَ:nasb / حَسَنٌ.:cerr", "Kardeşin Hasan geldi.", "Bedel-i küll."),
      T("سَلَّمْتُ عَلَى:x / صَدِيقِكَ:nasb / حُسَيْنٍ.:cerr", "Arkadaşın Hüseyin’e selam verdim.", "Mecrûra uyar."),
      T("قَامَ:x / الطُّلَّابُ:nasb / بَعْضُهُمْ.:cerr", "Öğrencilerin bir kısmı kalktı.", "Bedel-i ba’z."),
      T("قَرَأْتُ:x / الصَّحِيفَةَ:nasb / نِصْفَهَا.:cerr", "Gazetenin yarısını okudum.", "Bedel-i ba’z."),
      T("أَعْجَبَنِي:x / الشَّابُّ:nasb / أَدَبُهُ.:cerr", "Gencin edebi hoşuma gitti.", "Bedel-i iştimâl."),
      T("أَعْجَبَتْنِي:x / الطَّالِبَاتُ:nasb / جُهُودُهُنَّ.:cerr", "Kız öğrencilerin çabaları hoşuma gitti.", "Zamir هُنَّ."),
      T("الخَلِيفَةُ:nasb / أَبُو بَكْرٍ الصِّدِّيقُ:cerr / أَوَّلُ الخُلَفَاءِ الرَّاشِدِينَ.:x", "Halife Ebû Bekir es-Sıddîk, Râşid halifelerin ilkidir.", "Bedel-i küll."),
      T("تُوُفِّيَ:x / الصَّحَابِيُّ:nasb / أَبُو أَيُّوبَ الأَنْصَارِيُّ:cerr / قُرْبَ القُسْطَنْطِينِيَّةِ.:x", "Sahâbî Ebû Eyyûb el-Ensârî Konstantiniyye yakınında vefat etti.", "Bedel-i küll.")
    ]},
    { type: "classify", extra: true, opts: TB, ar: "بَدَلٌ أَمْ نَعْتٌ أَمْ تَأْكِيدٌ؟", tr: "Koyu tâbi’ bedel mi, na’t mı, te’kîd mi?", items: CL([
      [HL("حَضَرَ أَخُوكَ حَسَنٌ", "حَسَنٌ"), "e", "Asıl kastedilen kişi: bedel."],
      [HL("قَرَأْتُ الكِتَابَ نِصْفَهُ", "نِصْفَهُ"), "e", "Parça: bedel-i ba’z."],
      [HL("أَعْجَبَنِي الشَّابُّ أَدَبُهُ", "أَدَبُهُ"), "e", "Özellik: bedel-i iştimâl."],
      [HL("قَامَ الطُّلَّابُ بَعْضُهُمْ", "بَعْضُهُمْ"), "e", "Bedel-i ba’z."],
      [HL("زُرْتُ صَدِيقِي عَلِيًّا", "عَلِيًّا"), "e", "Bedel-i küll."],
      [HL("سَمِعْتُ العُصْفُورَ صَوْتَهُ", "صَوْتَهُ"), "e", "Bedel-i iştimâl."],
      [HL("حَضَرَ الطَّالِبُ المُجْتَهِدُ", "المُجْتَهِدُ"), "n", "Nitelik: sıfat."],
      [HL("قَرَأْتُ كِتَابًا مُفِيدًا", "مُفِيدًا"), "n", "Sıfat."],
      [HL("رَأَيْتُ الشَّجَرَةَ الطَّوِيلَةَ", "الطَّوِيلَةَ"), "n", "Sıfat."],
      [HL("اهْدِنَا الصِّرَاطَ المُسْتَقِيمَ", "المُسْتَقِيمَ"), "n", "Sıfat (bedel ardından gelen صِرَاطَ’dır)."],
      [HL("سَلَّمْتُ عَلَى الرَّجُلِ الكَرِيمِ", "الكَرِيمِ"), "n", "Sıfat."],
      [HL("قَرَأْتُ الكِتَابَ كُلَّهُ", "كُلَّهُ"), "t", "كُلّ: te’kîd (bütünü pekiştirir)."],
      [HL("حَضَرَ الأُسْتَاذُ نَفْسُهُ", "نَفْسُهُ"), "t", "نَفْس: te’kîd."],
      [HL("جَاءَ الطُّلَّابُ كُلُّهُمْ", "كُلُّهُمْ"), "t", "Te’kîd."],
      [HL("حَضَرَ الوَزِيرَانِ كِلَاهُمَا", "كِلَاهُمَا"), "t", "Te’kîd."],
      [HL("أَمَرَهُمْ أَنْ يَفْعَلُوا ذَلِكَ بِالأَسْرَى كُلِّهِمْ", "كُلِّهِمْ"), "t", "Te’kîd (bedel değil)."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · ÜÇ TÜR
{
  id: "u2", no: 2, ar: "أَنْوَاعُ البَدَلِ", tr: "Bedelin Üç Türü", short: "Türler", col: "cerr", legend: ["nasb", "cerr"],
  goals: ["Bedel-i küll, bedel-i ba’z ve bedel-i iştimâli ayırmak", "Bedelin mübdel minh’in kendisi mi, parçası mı, özelliği mi olduğuna bakmak", "Cümledeki bedeli bulup türünü söylemek"],
  examples: [
    { s: "حَضَرَ:- / أَخُوكَ:nasb / حَسَنٌ.:cerr", tr: "Kardeşin Hasan geldi. (küll: kardeş = Hasan)", pair: "قَرَأْتُ:- / الصَّحِيفَةَ:nasb / نِصْفَهَا.:cerr", pairTr: "Gazetenin yarısını okudum. (ba’z: yarı ⊂ gazete)" },
    { s: "أَعْجَبَنِي:- / الشَّابُّ:nasb / أَدَبُهُ.:cerr", tr: "Gencin edebi hoşuma gitti. (iştimâl: edep gençte bulunan bir özellik)" }
  ],
  rules: [
    { tr: "<b>Bedel-i küll (mutâbık)</b> (<span class=\"ar\">بَدَلُ كُلٍّ مِنْ كُلٍّ</span>): bedel anlamca mübdel minh’in ta kendisidir: <span class=\"ar\">أَخُوكَ = حَسَنٌ · الخَلِيفَةُ = أَبُو بَكْرٍ · الشَّهْرُ = رَمَضَانُ</span>." },
    { tr: "<b>Bedel-i ba’z</b> (<span class=\"ar\">بَدَلُ بَعْضٍ مِنْ كُلٍّ</span>): bedel, mübdel minh’in bir <b>parçasıdır</b>: <span class=\"ar\">نِصْفَهَا، ثُلُثَهُ، بَعْضُهُمْ، أَكْثَرُهُمْ، مُعْظَمُهُمْ، عَيْنَهُ، بَابَهَا</span>." },
    { tr: "<b>Bedel-i iştimâl</b> (<span class=\"ar\">بَدَلُ اشْتِمَالٍ</span>): bedel parça değildir; mübdel minh’in <b>kapsadığı</b> bir özellik, iş ya da şeydir: <span class=\"ar\">أَدَبُهُ، عِلْمُهَا، صَوْتَهُ، آثَارُهَا، أَنِينَهُ</span>." },
    { tr: "Ayırt etme sorusu: “Bu, onun kendisi mi? — küll. Ondan bir parça mı? — ba’z. Parçası değil ama ona ait bir şey mi? — iştimâl.”" }
  ],
  kaide: ["٢ ـ البَدَلُ أَنْوَاعٌ، أَشْهَرُهَا ثَلَاثَةٌ: أ ـ بَدَلٌ مُطَابِقٌ (بَدَلُ كُلٍّ مِنْ كُلٍّ): وَهُوَ المُطَابِقُ لِلْمُبْدَلِ مِنْهُ فِي المَعْنَى، مِثْلُ: حَضَرَ أَخُوكَ حَسَنٌ. ب ـ بَدَلُ بَعْضٍ مِنْ كُلٍّ: يَكُونُ جُزْءًا مِنَ المُبْدَلِ مِنْهُ، مِثْلُ: قَرَأْتُ الصَّحِيفَةَ نِصْفَهَا. جـ ـ بَدَلُ اشْتِمَالٍ: يَكُونُ مِنْ مُشْتَمِلَاتِ المُبْدَلِ مِنْهُ وَلَيْسَ جُزْءًا مِنْهُ، مِثْلُ: أَعْجَبَنِي الشَّابُّ أَدَبُهُ."],
  ex: [
    { type: "combo", num: "٢", ar: "بَيِّنْ نَوْعَ البَدَلِ فِي الجُمَلِ التَّالِيَةِ", tr: "Bedeli ve türünü seç.", exHtml: "<span class=\"ar\">الخَلِيفَةُ أَبُو بَكْرٍ الصِّدِّيقُ أَوَّلُ الخُلَفَاءِ الرَّاشِدِينَ ← البَدَلُ: أَبُو بَكْرٍ · بَدَلُ كُلٍّ</span>", items: [
      ["حَفِظْتُ القُرْآنَ ثُلُثَهُ.", ["ثُلُثَهُ", "القُرْآنَ", "حَفِظْتُ"], "b", "Kur’an’ın üçte birini ezberledim.", "Üçte bir: parça."],
      ["أَعْجَبَتْنِي الطَّالِبَةُ عِلْمُهَا.", ["عِلْمُهَا", "الطَّالِبَةُ", "أَعْجَبَتْنِي"], "s", "Kız öğrencinin ilmi hoşuma gitti.", "İlim parça değil, özellik."],
      ["رَأَيْتُ المُدَرِّسِينَ أَكْثَرَهُمْ.", ["أَكْثَرَهُمْ", "المُدَرِّسِينَ", "رَأَيْتُ"], "b", "Öğretmenlerin çoğunu gördüm.", "Çoğu: parça."],
      ["الإِمَامُ الغَزَالِيُّ مِنْ أَكْبَرِ العُلَمَاءِ فِي القَرْنِ الخَامِسِ.", ["الغَزَالِيُّ", "الإِمَامُ", "أَكْبَرِ"], "k", "İmam Gazzâlî beşinci asrın en büyük âlimlerindendir.", "İmam = Gazzâlî."],
      ["دَخَلَ الأُسْتَاذُ أَحْمَدُ الصَّفَّ قَبْلَ عَشْرِ دَقَائِقَ.", ["أَحْمَدُ", "الأُسْتَاذُ", "الصَّفَّ"], "k", "Ahmed Hoca on dakika önce sınıfa girdi.", "Hoca = Ahmed."],
      ["المُسْلِمُونَ يَصُومُونَ فِي الشَّهْرِ الكَرِيمِ رَمَضَانَ.", ["رَمَضَانَ", "الكَرِيمِ", "الشَّهْرِ"], "k", "Müslümanlar mübarek ay Ramazan’da oruç tutar.", "Ay = Ramazan; الكَرِيمِ sıfat. رَمَضَانَ gayr-i munsarif: fetha ile mecrûr."],
      ["أَعْجَبَتْنَا إِسْطَنْبُولُ آثَارُهَا التَّارِيخِيَّةُ.", ["آثَارُهَا", "إِسْطَنْبُولُ", "التَّارِيخِيَّةُ"], "s", "İstanbul’un tarihî eserleri hoşumuza gitti.", "Eserler şehrin parçası değil, ona ait."],
      ["كَانَ السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ يَحْتَرِمُ العُلَمَاءَ.", ["مُحَمَّدٌ", "السُّلْطَانُ", "العُلَمَاءَ"], "k", "Sultan Fâtih Mehmed âlimlere saygı gösterirdi.", "Sultan = Mehmed; الفَاتِحُ onun sıfatı."]
    ].map(BD) },
    { type: "classify", extra: true, opts: TUR, ar: "مَا نَوْعُ البَدَلِ؟", tr: "Koyu bedelin türünü seç.", items: CL([
      [HL("حَضَرَ أَخُوكَ حَسَنٌ", "حَسَنٌ"), "k", "Kardeş = Hasan."],
      [HL("سَلَّمْتُ عَلَى صَدِيقِكَ حُسَيْنٍ", "حُسَيْنٍ"), "k", "Arkadaş = Hüseyin."],
      [HL("الخَلِيفَةُ أَبُو بَكْرٍ أَوَّلُ الخُلَفَاءِ", "أَبُو بَكْرٍ"), "k", "Halife = Ebû Bekir."],
      [HL("وَإِذْ قَالَ إِبْرَاهِيمُ لِأَبِيهِ آزَرَ", "آزَرَ"), "k", "Babası = Âzer."],
      [HL("آمَنَّا بِرَبِّ العَالَمِينَ رَبِّ مُوسَى وَهَارُونَ", "رَبِّ مُوسَى"), "k", "Âlemlerin Rabbi = Mûsâ ve Hârûn’un Rabbi."],
      [HL("دَخَلَ الأُسْتَاذُ أَحْمَدُ الصَّفَّ", "أَحْمَدُ"), "k", "Hoca = Ahmed."],
      [HL("قَرَأْتُ الصَّحِيفَةَ نِصْفَهَا", "نِصْفَهَا"), "b", "Yarısı: parça."],
      [HL("قَامَ الطُّلَّابُ بَعْضُهُمْ", "بَعْضُهُمْ"), "b", "Bir kısmı: parça."],
      [HL("حَفِظْتُ القُرْآنَ ثُلُثَهُ", "ثُلُثَهُ"), "b", "Üçte biri."],
      [HL("قُمِ اللَّيْلَ إِلَّا قَلِيلًا نِصْفَهُ", "نِصْفَهُ"), "b", "Gecenin yarısı."],
      [HL("أَغْلَقْتُ الغُرْفَةَ بَابَهَا", "بَابَهَا"), "b", "Kapı odanın parçası."],
      [HL("أَعْجَبَنِي الشَّابُّ أَدَبُهُ", "أَدَبُهُ"), "s", "Edep: özellik."],
      [HL("أَعْجَبَتْنِي الطَّالِبَةُ عِلْمُهَا", "عِلْمُهَا"), "s", "İlim: özellik."],
      [HL("سَمِعْتُ العُصْفُورَ صَوْتَهُ", "صَوْتَهُ"), "s", "Ses kuşun parçası değil."],
      [HL("يَسْأَلُونَكَ عَنِ الشَّهْرِ الحَرَامِ قِتَالٍ فِيهِ", "قِتَالٍ فِيهِ"), "s", "Savaş, haram ayın içinde olan bir iş."],
      [HL("أَعْجَبَتْنَا إِسْطَنْبُولُ آثَارُهَا", "آثَارُهَا"), "s", "Eserler: şehre ait."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · ZAMİR VE İ’RAB
{
  id: "u3", no: 3, ar: "ضَمِيرُ البَدَلِ وَإِعْرَابُهُ", tr: "Bedelde Zamir ve İ’rab", short: "İ’rab", col: "mi", legend: ["nasb", "cerr"],
  goals: ["Bedel-i ba’z ve iştimâlde mübdel minh’e dönen uygun zamiri seçmek", "Bedelin mübdel minh’in i’rabını aldığını bilmek", "Cümleye uygun bedel ve mübdel minh koymak"],
  examples: [
    { s: "قَامَ:- / الطُّلَّابُ:nasb / بَعْضُهُمْ.:cerr", tr: "Öğrencilerin bir kısmı kalktı. (هُمْ → الطُّلَّابُ)", pair: "أَعْجَبَتْنِي:- / الطَّالِبَاتُ:nasb / جُهُودُهُنَّ.:cerr", pairTr: "Kız öğrencilerin çabaları hoşuma gitti. (هُنَّ → الطَّالِبَاتُ)" },
    { s: "اسْتَمَعْتُ إِلَى:- / الإِمَامِ:nasb / خُطْبَتِهِ.:cerr", tr: "İmamın hutbesini dinledim. (mecrûr → mecrûr)" }
  ],
  rules: [
    { tr: "Bedel-i ba’z ve bedel-i iştimâl, <b>mübdel minh’e dönen ve ona uyan bir zamir</b> taşır: <span class=\"ar\">الطُّلَّابُ بَعْضُهُمْ · الطَّالِبَاتُ جُهُودُهُنَّ · الحَدِيقَةُ أَشْجَارُهَا · اللَّبَنَ بَعْضَهُ</span>." },
    { tr: "Bedel-i küll zamir almaz: <span class=\"ar\">أَخُوكَ حَسَنٌ</span>." },
    { tr: "Bedel bir tâbi’dir, mübdel minh’in i’rabını alır:", ex: ["قَامَ الطُّلَّابُ بَعْضُهُمْ (مَرْفُوعٌ) · شَرِبَ المَرِيضُ اللَّبَنَ بَعْضَهُ (مَنْصُوبٌ)", "سَلَّمْتُ عَلَى المُهَنْدِسِينَ أَكْثَرِهِمْ (مَجْرُورٌ) · الإِمَامُ أَبُو حَنِيفَةَ (أَسْمَاءُ خَمْسَةٌ: بِالوَاوِ)"] },
    { tr: "Mübdel minh’i seçerken bedeldeki zamire bak: <span class=\"ar\">… أَكْثَرِهِمْ</span> ise mübdel minh akıllı müzekker çoğul olmalı; <span class=\"ar\">… شِرَاعَهَا</span> ise müennes olmalı (<span class=\"ar\">السَّفِينَةَ</span>)." }
  ],
  kaide: ["٣ ـ يَضُمُّ بَدَلُ البَعْضِ وَبَدَلُ الاشْتِمَالِ ضَمِيرًا يَعُودُ عَلَى المُبْدَلِ مِنْهُ وَيُطَابِقُهُ، مِثْلُ: قَامَ الطُّلَّابُ بَعْضُهُمْ. أَعْجَبَتْنِي الطَّالِبَاتُ جُهُودُهُنَّ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "اخْتَرِ الضَّبْطَ الصَّحِيحَ لِلْبَدَلِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Bedelin doğru harekesini seç.", exHtml: "<span class=\"ar\">اشْتَرَكَ المُوَظَّفُونَ ___ فِي الرِّحْلَةِ (نِصْفُهُمْ – نِصْفَهُمْ – نِصْفِهِمْ) ← نِصْفُهُمْ</span>", items: PL([
      ["شَرِبَ المَرِيضُ اللَّبَنَ ___.", "بَعْضَهُ", "بَعْضُهُ", "بَعْضِهِ", "Hasta sütün bir kısmını içti.", "Mef’ûle uyar: mansûb."],
      ["أَعْجَبَنَا بَحْرُ مَرْمَرَةَ ___.", "مَنْظَرُهُ", "مَنْظَرَهُ", "مَنْظَرِهِ", "Marmara Denizi’nin manzarası hoşumuza gitti.", "Fâile uyar: merfû."],
      ["أَعْجَبَتْنِي الحَدِيقَةُ ___.", "أَشْجَارُهَا", "أَشْجَارَهَا", "أَشْجَارِهَا", "Bahçenin ağaçları hoşuma gitti.", "Fâile uyar: merfû."],
      ["سَلَّمْتُ عَلَى المُهَنْدِسِينَ ___.", "أَكْثَرِهِمْ", "أَكْثَرُهُمْ", "أَكْثَرَهُمْ", "Mühendislerin çoğuna selam verdim.", "Mecrûra uyar."],
      ["اسْتَمَعْتُ إِلَى الإِمَامِ ___.", "خُطْبَتِهِ", "خُطْبَتُهُ", "خُطْبَتَهُ", "İmamın hutbesini dinledim.", "Mecrûr."],
      ["قَامَ الطُّلَّابُ ___.", "بَعْضُهُمْ", "بَعْضَهُمْ", "بَعْضِهِمْ", "Öğrencilerin bir kısmı kalktı.", "Merfû."],
      ["قَرَأْتُ القُرْآنَ ___ فِي أُسْبُوعٍ وَاحِدٍ.", "نِصْفَهُ", "نِصْفُهُ", "نِصْفِهِ", "Bir haftada Kur’an’ın yarısını okudum.", "Mansûb."],
      ["الإِمَامُ ___ أَحَدُ أَئِمَّةِ المَذَاهِبِ الأَرْبَعَةِ.", "أَبُو حَنِيفَةَ", "أَبَا حَنِيفَةَ", "أَبِي حَنِيفَةَ", "İmam Ebû Hanîfe dört mezhep imamından biridir.", "Mübtedâya uyar: esmâ-i hamse, vav ile merfû."]
    ])},
    { type: "pick", fill: true, num: "٤", ar: "امْلَإِ الفَرَاغَ فِي الجُمَلِ التَّالِيَةِ بِبَدَلٍ مُنَاسِبٍ", tr: "Anlama ve i’raba uygun bedeli seç.", exHtml: "<span class=\"ar\">تُوُفِّيَ الصَّحَابِيُّ أَبُو أَيُّوبَ الأَنْصَارِيُّ قُرْبَ القُسْطَنْطِينِيَّةِ.</span>", items: PL([
      ["قَرَأْتُ القِصَّةَ ___ فِي لَيْلَةٍ وَاحِدَةٍ.", "نِصْفَهَا", "نِصْفُهَا", "نِصْفَهُ", "Hikâyenin yarısını bir gecede okudum.", "Mansûb, müennes zamir."],
      ["تَجَوَّلَ السُّيَّاحُ فِي القَاهِرَةِ ___.", "شَوَارِعِهَا", "شَوَارِعَهَا", "شَوَارِعِهِمْ", "Turistler Kahire’nin caddelerinde dolaştı.", "Mecrûr; zamir şehre döner."],
      ["أَعْجَبَتْنِي تُونُسُ ___.", "طَبِيعَتُهَا", "طَبِيعَتَهَا", "طَبِيعَتُهُ", "Tunus’un tabiatı hoşuma gitti.", "Merfû, iştimâl."],
      ["دُفِنَ مُؤَذِّنُ الرَّسُولِ ﷺ ___ فِي دِمَشْقَ.", "بِلَالٌ", "بِلَالًا", "بِلَالٍ", "Resûlullah’ın müezzini Bilâl Dımaşk’ta defnedildi.", "Nâib-i fâile uyar: merfû."],
      ["عَاشَ النَّبِيُّ ﷺ فِي بَيْتِ عَمِّهِ ___ بَعْدَ وَفَاةِ جَدِّهِ عَبْدِ المُطَّلِبِ.", "أَبِي طَالِبٍ", "أَبُو طَالِبٍ", "أَبَا طَالِبٍ", "Peygamber ﷺ dedesi Abdülmuttalib’in vefatından sonra amcası Ebû Tâlib’in evinde yaşadı.", "Mecrûra uyar: yâ ile."],
      ["طُبِعَ الكِتَابُ ___.", "نِصْفُهُ", "نِصْفَهُ", "نِصْفِهِ", "Kitabın yarısı basıldı.", "Nâib-i fâil: merfû."],
      ["رَأَيْتُ السَّفِينَةَ التُّرْكِيَّةَ ___.", "شِرَاعَهَا", "شِرَاعُهَا", "شِرَاعَهُ", "Türk gemisinin yelkenini gördüm.", "Mansûb, müennes zamir."],
      ["مَدَحْتُ الصَّدِيقَ ___.", "أَخْلَاقَهُ", "أَخْلَاقُهُ", "أَخْلَاقَهَا", "Arkadaşın ahlakını övdüm.", "Mansûb, iştimâl."]
    ])},
    { type: "pick", fill: true, num: "٥", ar: "امْلَإِ الفَرَاغَ فِي الجُمَلِ التَّالِيَةِ بِمُبْدَلٍ مِنْهُ مُنَاسِبٍ", tr: "Bedele uyan mübdel minh’i seç.", exHtml: "<span class=\"ar\">أَغْلَقْتُ الغُرْفَةَ بَابَهَا.</span>", items: PL([
      ["مَرَرْتُ ___ أَكْثَرِهِمْ.", "بِالطُّلَّابِ", "بِالطَّالِبِ", "بِالطَّالِبَاتِ", "Öğrencilerin çoğuna uğradım.", "هُمْ: akıllı müzekker çoğul."],
      ["سَلَّمْتُ عَلَى ___ إِبْرَاهِيمَ.", "الأُسْتَاذِ", "الأُسْتَاذَةِ", "الأُسْتَاذَيْنِ", "Hoca İbrâhim’e selam verdim.", "Bedel-i küll: tekil müzekker."],
      ["عَالَجَ الطَّبِيبُ ___ عَيْنَهُ.", "المَرِيضَ", "المَرِيضَةَ", "المَرِيضُ", "Doktor hastanın gözünü tedavi etti.", "Mef’ûl, müzekker."],
      ["نَظَرْتُ إِلَى ___ أَمْوَاجِهِ.", "البَحْرِ", "البُحَيْرَةِ", "البَحْرَ", "Denizin dalgalarına baktım.", "Mecrûr, müzekker."],
      ["اسْتَمَعْتُ إِلَى خُطْبَةِ ___ يُوسُفَ.", "الإِمَامِ", "الإِمَامَ", "الإِمَامَةِ", "İmam Yûsuf’un hutbesini dinledim.", "Muzâfun ileyh: mecrûr."],
      ["قَدَّمَتْ ___ زَيْنَبُ الدَّوَاءَ لِلْمَرِيضَةِ.", "المُمَرِّضَةُ", "المُمَرِّضُ", "المُمَرِّضَةَ", "Hemşire Zeynep hastaya ilacı verdi.", "Fâil, müennes."],
      ["شَاهَدْتُ ___ شِرَاعَهَا.", "السَّفِينَةَ", "القِطَارَ", "السَّفِينَةُ", "Geminin yelkenini gördüm.", "هَا: müennes; mansûb."],
      ["رَجَعَ ___ مُعْظَمُهُمْ إِلَى بِلَادِهِمْ.", "الحُجَّاجُ", "الحَاجُّ", "الحُجَّاجَ", "Hacıların çoğu memleketlerine döndü.", "Fâil, çoğul."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · DÖNÜŞTÜRME
{
  id: "u4", no: 4, ar: "تَحْوِيلُ الجُمَلِ", tr: "Bedelli ve Bedelsiz Cümle", short: "Dönüştür", col: "ref", legend: ["nasb", "cerr"],
  goals: ["İzafetli cümleyi bedelli cümleye çevirmek", "Bedelli cümleyi izafetli cümleye çevirmek", "Kelimeleri sıralayıp bedelli cümle kurmak"],
  examples: [
    { s: "قَرَأْتُ:- / نِصْفَ:cerr / الكِتَابِ.:nasb", tr: "Kitabın yarısını okudum. (izafet)", pair: "قَرَأْتُ:- / الكِتَابَ:nasb / نِصْفَهُ.:cerr", pairTr: "Aynı anlam. (bedel)" },
    { s: "أَعْجَبَنِي:- / الطَّالِبُ:nasb / خُلُقُهُ.:cerr", tr: "Öğrencinin ahlakı hoşuma gitti. (bedel)", pair: "أَعْجَبَنِي:- / خُلُقُ:cerr / الطَّالِبِ.:nasb", pairTr: "Aynı anlam. (izafet)" }
  ],
  rules: [
    { tr: "<b>İzafet → bedel:</b> muzâfun ileyhi öne al, cümledeki görevinin i’rabını ver; muzâfı ardından bedel yap ve ona zamir ekle:", ex: ["قَرَأْتُ نِصْفَ الكِتَابِ ← قَرَأْتُ الكِتَابَ نِصْفَهُ", "نَفَعَنَا عِلْمُ الأُسْتَاذِ ← نَفَعَنَا الأُسْتَاذُ عِلْمُهُ"] },
    { tr: "<b>Bedel → izafet:</b> bedeli mübdel minh’in yerine koy, zamiri at, mübdel minh’i ona muzâfun ileyh (mecrûr) yap:", ex: ["أَعْجَبَنِي الطَّالِبُ خُلُقُهُ ← أَعْجَبَنِي خُلُقُ الطَّالِبِ", "صُمْنَا رَمَضَانَ نِصْفَهُ ← صُمْنَا نِصْفَ رَمَضَانَ"] },
    { tr: "Fiil başta ise müzekkerlik / müenneslik yeni fâile göre değişir: <span class=\"ar\">طَابَ هَوَاءُ القَرْيَةِ ← طَابَتِ القَرْيَةُ هَوَاؤُهَا · احْتَرَقَتِ الشُّقَّةُ أَثَاثُهَا ← احْتَرَقَ أَثَاثُ الشُّقَّةِ</span>." },
    { tr: "Sıralamada bedel hep mübdel minh’in <b>hemen ardından</b> gelir: <span class=\"ar\">عَالَجَ الطَّبِيبُ المَرِيضَ أُذُنَهُ</span>." }
  ],
  kaide: ["حَوِّلِ الجُمَلَ إِلَى جُمَلٍ تَشْتَمِلُ عَلَى البَدَلِ: قَرَأْتُ نِصْفَ الكِتَابِ ← قَرَأْتُ الكِتَابَ نِصْفَهُ. وَحَوِّلْهَا إِلَى جُمَلٍ لَا تَشْتَمِلُ عَلَى بَدَلٍ: أَعْجَبَنِي الطَّالِبُ خُلُقُهُ ← أَعْجَبَنِي خُلُقُ الطَّالِبِ."],
  ex: [
    { type: "pick", num: "٦", ar: "حَوِّلِ الجُمَلَ التَّالِيَةَ إِلَى جُمَلٍ تَشْتَمِلُ عَلَى البَدَلِ", tr: "Bedelli doğru biçimi seç.", exHtml: "<span class=\"ar\">قَرَأْتُ نِصْفَ الكِتَابِ ← قَرَأْتُ الكِتَابَ نِصْفَهُ</span>", items: PL([
      ["اشْتَرَيْتُ ثُلُثَ الحَقْلِ.", "اشْتَرَيْتُ الحَقْلَ ثُلُثَهُ.", "اشْتَرَيْتُ الحَقْلَ ثُلُثُهُ.", "اشْتَرَيْتُ الحَقْلِ ثُلُثَهُ.", "Tarlanın üçte birini satın aldım.", "Mef’ûl ve bedeli mansûb."],
      ["عَالَجَ الطَّبِيبُ أَكْثَرَ المَرْضَى.", "عَالَجَ الطَّبِيبُ المَرْضَى أَكْثَرَهُمْ.", "عَالَجَ الطَّبِيبُ المَرْضَى أَكْثَرُهُمْ.", "عَالَجَ الطَّبِيبُ المَرْضَى أَكْثَرَهُ.", "Doktor hastaların çoğunu tedavi etti.", "Zamir هُمْ, mansûb."],
      ["نَفَعَنَا عِلْمُ الأُسْتَاذِ.", "نَفَعَنَا الأُسْتَاذُ عِلْمُهُ.", "نَفَعَنَا الأُسْتَاذَ عِلْمَهُ.", "نَفَعَنَا الأُسْتَاذُ عِلْمَهُ.", "Hocanın ilmi bize fayda verdi.", "Fâil ve bedeli merfû."],
      ["قَطَفْتُ ثَمَرَ الشَّجَرَةِ.", "قَطَفْتُ الشَّجَرَةَ ثَمَرَهَا.", "قَطَفْتُ الشَّجَرَةَ ثَمَرُهَا.", "قَطَفْتُ الشَّجَرَةَ ثَمَرَهُ.", "Ağacın meyvesini topladım.", "Müennes zamir, mansûb."],
      ["ضَعُفَ نُورُ المِصْبَاحِ.", "ضَعُفَ المِصْبَاحُ نُورُهُ.", "ضَعُفَ المِصْبَاحُ نُورَهُ.", "ضَعُفَ المِصْبَاحَ نُورُهُ.", "Lambanın ışığı zayıfladı.", "Fâil ve bedeli merfû."],
      ["أَعْجَبَنِي أُسْلُوبُ الكَاتِبِ.", "أَعْجَبَنِي الكَاتِبُ أُسْلُوبُهُ.", "أَعْجَبَنِي الكَاتِبَ أُسْلُوبَهُ.", "أَعْجَبَنِي الكَاتِبُ أُسْلُوبَهُ.", "Yazarın üslubu hoşuma gitti.", "Fâil: merfû."],
      ["طَابَ هَوَاءُ القَرْيَةِ.", "طَابَتِ القَرْيَةُ هَوَاؤُهَا.", "طَابَ القَرْيَةُ هَوَاؤُهُ.", "طَابَتِ القَرْيَةَ هَوَاءَهَا.", "Köyün havası güzelleşti.", "Fâil müennes olunca fiil طَابَتْ."],
      ["اتَّسَعَتْ شَوَارِعُ المَدِينَةِ.", "اتَّسَعَتِ المَدِينَةُ شَوَارِعُهَا.", "اتَّسَعَتِ المَدِينَةُ شَوَارِعَهَا.", "اتَّسَعَتِ المَدِينَةَ شَوَارِعُهُ.", "Şehrin caddeleri genişledi.", "Merfû, müennes zamir."]
    ])},
    { type: "pick", num: "٧", ar: "حَوِّلِ الجُمَلَ التَّالِيَةَ إِلَى جُمَلٍ لَا تَشْتَمِلُ عَلَى بَدَلٍ", tr: "Bedelsiz (izafetli) doğru biçimi seç.", exHtml: "<span class=\"ar\">أَعْجَبَنِي الطَّالِبُ خُلُقُهُ ← أَعْجَبَنِي خُلُقُ الطَّالِبِ</span>", items: PL([
      ["احْتَرَقَتِ الشُّقَّةُ أَثَاثُهَا.", "احْتَرَقَ أَثَاثُ الشُّقَّةِ.", "احْتَرَقَتْ أَثَاثَ الشُّقَّةِ.", "احْتَرَقَ أَثَاثُ الشُّقَّةُ.", "Dairenin eşyası yandı.", "Yeni fâil أَثَاثُ müzekker: احْتَرَقَ."],
      ["زَارَ السُّيَّاحُ أَكْثَرُهُمُ المَتْحَفَ.", "زَارَ أَكْثَرُ السُّيَّاحِ المَتْحَفَ.", "زَارَ أَكْثَرَ السُّيَّاحِ المَتْحَفُ.", "زَارَ أَكْثَرُ السُّيَّاحُ المَتْحَفَ.", "Turistlerin çoğu müzeyi gezdi.", "Fâil merfû, muzâfun ileyh mecrûr."],
      ["نَظَّفَ العُمَّالُ المَدِينَةَ شَوَارِعَهَا.", "نَظَّفَ العُمَّالُ شَوَارِعَ المَدِينَةِ.", "نَظَّفَ العُمَّالُ شَوَارِعُ المَدِينَةِ.", "نَظَّفَ العُمَّالُ شَوَارِعَ المَدِينَةَ.", "İşçiler şehrin caddelerini temizledi.", "Mef’ûl mansûb."],
      ["قَابَلْتُ الأَصْدِقَاءَ أَحَدَهُمْ.", "قَابَلْتُ أَحَدَ الأَصْدِقَاءِ.", "قَابَلْتُ أَحَدُ الأَصْدِقَاءِ.", "قَابَلْتُ أَحَدَ الأَصْدِقَاءَ.", "Arkadaşlardan biriyle görüştüm.", "Mef’ûl mansûb."],
      ["صُمْنَا رَمَضَانَ نِصْفَهُ.", "صُمْنَا نِصْفَ رَمَضَانَ.", "صُمْنَا نِصْفُ رَمَضَانَ.", "صُمْنَا نِصْفَ رَمَضَانٍ.", "Ramazan’ın yarısını oruçla geçirdik.", "رَمَضَانَ gayr-i munsarif: tenvin almaz."],
      ["تَخَرَّجَ الطُّلَّابُ مُعْظَمُهُمْ.", "تَخَرَّجَ مُعْظَمُ الطُّلَّابِ.", "تَخَرَّجَ مُعْظَمَ الطُّلَّابِ.", "تَخَرَّجَ مُعْظَمُ الطُّلَّابُ.", "Öğrencilerin çoğu mezun oldu.", "Fâil merfû."],
      ["شَرِبَ المَرِيضُ الدَّوَاءَ أَكْثَرَهُ.", "شَرِبَ المَرِيضُ أَكْثَرَ الدَّوَاءِ.", "شَرِبَ المَرِيضُ أَكْثَرُ الدَّوَاءِ.", "شَرِبَ المَرِيضُ أَكْثَرَ الدَّوَاءَ.", "Hasta ilacın çoğunu içti.", "Mef’ûl mansûb."],
      ["أَخَافُ مِنَ الظُّلْمِ عَاقِبَتِهِ.", "أَخَافُ مِنْ عَاقِبَةِ الظُّلْمِ.", "أَخَافُ مِنْ عَاقِبَةُ الظُّلْمِ.", "أَخَافُ مِنْ عَاقِبَةِ الظُّلْمَ.", "Zulmün akıbetinden korkarım.", "Harf-i cerle mecrûr."]
    ])},
    { type: "pick", num: "٨", ar: "رَتِّبِ الكَلِمَاتِ التَّالِيَةَ لِتَكُونَ جُمْلَةً تَشْتَمِلُ عَلَى بَدَلٍ", tr: "Kelimelerin doğru sıralandığı bedelli cümleyi seç.", exHtml: "<span class=\"ar\">(الطَّبِيبُ – المَرِيضَ – عَالَجَ – أُذُنَهُ) ← عَالَجَ الطَّبِيبُ المَرِيضَ أُذُنَهُ.</span>", items: PL([
      ["(الكِتَابُ – جُزْؤُهُ – ظَهَرَ – الأَوَّلُ)", "ظَهَرَ الكِتَابُ جُزْؤُهُ الأَوَّلُ.", "ظَهَرَ جُزْؤُهُ الكِتَابُ الأَوَّلُ.", "الأَوَّلُ ظَهَرَ الكِتَابُ جُزْؤُهُ.", "Kitabın birinci cildi çıktı.", "Bedel-i ba’z mübdel minh’in hemen ardında."],
      ["(المِصْبَاحُ – ضَعُفَ – نُورُهُ)", "ضَعُفَ المِصْبَاحُ نُورُهُ.", "ضَعُفَ نُورُهُ المِصْبَاحُ.", "نُورُهُ ضَعُفَ المِصْبَاحُ.", "Lambanın ışığı zayıfladı.", "İştimâl."],
      ["(الطَّالِبَاتُ – رَجَعَتْ – أَكْثَرُهُنَّ – إِلَى بُيُوتِهِنَّ)", "رَجَعَتِ الطَّالِبَاتُ أَكْثَرُهُنَّ إِلَى بُيُوتِهِنَّ.", "رَجَعَتْ أَكْثَرُهُنَّ الطَّالِبَاتُ إِلَى بُيُوتِهِنَّ.", "إِلَى بُيُوتِهِنَّ الطَّالِبَاتُ رَجَعَتْ أَكْثَرُهُنَّ.", "Kız öğrencilerin çoğu evlerine döndü.", "Ba’z."],
      ["(العُصْفُورَ – سَمِعْتُ – صَوْتَهُ)", "سَمِعْتُ العُصْفُورَ صَوْتَهُ.", "سَمِعْتُ صَوْتَهُ العُصْفُورَ.", "صَوْتَهُ سَمِعْتُ العُصْفُورَ.", "Kuşun sesini duydum.", "İştimâl."],
      ["(إِلَى الكُوَيْتِ – سَافَرَ – أَحْمَدُ – الأُسْتَاذُ)", "سَافَرَ الأُسْتَاذُ أَحْمَدُ إِلَى الكُوَيْتِ.", "إِلَى الكُوَيْتِ الأُسْتَاذُ سَافَرَ أَحْمَدُ.", "سَافَرَ الأُسْتَاذُ إِلَى أَحْمَدُ الكُوَيْتِ.", "Ahmed Hoca Kuveyt’e gitti.", "Küll."],
      ["(قَرَأْتُ – ثُلُثَهَا – فِي لَيْلَةٍ – الرِّوَايَةَ – وَاحِدَةٍ)", "قَرَأْتُ الرِّوَايَةَ ثُلُثَهَا فِي لَيْلَةٍ وَاحِدَةٍ.", "قَرَأْتُ ثُلُثَهَا الرِّوَايَةَ فِي لَيْلَةٍ وَاحِدَةٍ.", "قَرَأْتُ الرِّوَايَةَ فِي ثُلُثَهَا لَيْلَةٍ وَاحِدَةٍ.", "Romanın üçte birini bir gecede okudum.", "Ba’z."],
      ["(عُثْمَانُ – الخَلِيفَةُ – ثَالِثُ – الرَّاشِدِينَ – الخُلَفَاءِ)", "الخَلِيفَةُ عُثْمَانُ ثَالِثُ الخُلَفَاءِ الرَّاشِدِينَ.", "عُثْمَانُ الخُلَفَاءِ ثَالِثُ الخَلِيفَةُ الرَّاشِدِينَ.", "الخَلِيفَةُ الرَّاشِدِينَ ثَالِثُ عُثْمَانُ الخُلَفَاءِ.", "Halife Osman, Râşid halifelerin üçüncüsüdür.", "Küll."],
      ["(أَزْعَجَنِي – بُكَاؤُهُ – الطِّفْلُ)", "أَزْعَجَنِي الطِّفْلُ بُكَاؤُهُ.", "أَزْعَجَنِي بُكَاؤُهُ الطِّفْلُ.", "بُكَاؤُهُ أَزْعَجَنِي الطِّفْلَ.", "Çocuğun ağlaması beni rahatsız etti.", "İştimâl."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · ÂYET, HADİS VE OKUMA
{
  id: "u5", no: 5, ar: "فِي الآيَاتِ وَالحَدِيثِ وَالقِرَاءَةِ", tr: "Âyet, Hadis ve Okuma", short: "Okuma", col: "muz", legend: ["nasb", "cerr"],
  goals: ["Âyet ve hadislerde mübdel minh’i ve bedeli bulmak", "“عَدْلُ الرَّسُولِ ﷺ” metnindeki bedelleri ve türlerini bulmak", "Bedeli te’kîdden ayırmak"],
  examples: [
    { s: "اهْدِنَا:- / الصِّرَاطَ المُسْتَقِيمَ:nasb / صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ:cerr", tr: "Bizi doğru yola ilet; nimet verdiklerinin yoluna. (Fâtiha 6-7)" },
    { s: "يَسْأَلُونَكَ عَنِ:- / الشَّهْرِ الحَرَامِ:nasb / قِتَالٍ فِيهِ:cerr", tr: "Sana haram aydan, onda savaşmaktan soruyorlar. (Bakara 217)" }
  ],
  rules: [
    { tr: "Bedel-i küll âyetlerde çok görülür: <span class=\"ar\">صِرَاطَ الَّذِينَ… · لِأَبِيهِ آزَرَ · أَخَاهُ هَارُونَ · رَبِّ مُوسَى وَهَارُونَ</span>." },
    { tr: "Bedel-i iştimâlde zamir bazen <span class=\"ar\">فِيهِ</span> gibi bir bağlayıcıyla gelir: <span class=\"ar\">قِتَالٍ فِيهِ</span>." },
    { tr: "Bir sayıdan sonra ayrıntı gelirse o da bedel olabilir (bedel-i tafsîl): <span class=\"ar\">أَهْلُ الجَنَّةِ ثَلَاثَةٌ: ذُو سُلْطَانٍ…، وَرَجُلٌ…، وَعَفِيفٌ…</span>." },
    { tr: "<span class=\"ar\">بِالأَسْرَى كُلِّهِمْ</span> gibi <span class=\"ar\">كُلّ</span> ile gelen tâbi’ te’kîddir, bedel değildir." }
  ],
  kaide: ["عَيِّنِ البَدَلَ وَالمُبْدَلَ مِنْهُ فِي الآيَاتِ وَالحَدِيثَيْنِ، ثُمَّ اسْتَخْرِجْ مِنَ النَّصِّ المُبْدَلَ مِنْهُ وَالبَدَلَ وَعَيِّنْ نَوْعَهُ."],
  ex: [
    { type: "tag", roles: ["nasb", "cerr", "x"], num: "١", ar: "عَيِّنِ البَدَلَ وَالمُبْدَلَ مِنْهُ فِي الآيَاتِ التَّالِيَةِ وَالحَدِيثَيْنِ الشَّرِيفَيْنِ", tr: "Mübdel minh’i ve bedeli etiketle; kalanlar Başka.", items: [
      T("اهْدِنَا:x / الصِّرَاطَ المُسْتَقِيمَ:nasb / صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ:cerr", "Bizi doğru yola ilet; nimet verdiklerinin yoluna. (Fâtiha 6-7)", "Bedel-i küll; المُسْتَقِيمَ sıfat."),
      T("يَسْأَلُونَكَ عَنِ:x / الشَّهْرِ الحَرَامِ:nasb / قِتَالٍ فِيهِ:cerr", "Sana haram aydan, onda savaşmaktan soruyorlar. (Bakara 217)", "Bedel-i iştimâl."),
      T("وَإِذْ قَالَ إِبْرَاهِيمُ:x / لِأَبِيهِ:nasb / آزَرَ:cerr / أَتَتَّخِذُ أَصْنَامًا آلِهَةً:x", "Hani İbrâhim babası Âzer’e “Putları ilah mı ediniyorsun?” demişti. (En’âm 74)", "Bedel-i küll; آزَرَ gayr-i munsarif: fetha ile mecrûr."),
      T("قُمِ:x / اللَّيْلَ:nasb / إِلَّا قَلِيلًا:x / نِصْفَهُ:cerr / أَوِ انْقُصْ مِنْهُ قَلِيلًا:x", "Gecenin azı hariç kalk; yarısını ya da ondan biraz eksiltin. (Müzzemmil 2-3)", "Bedel-i ba’z."),
      T("وَوَهَبْنَا لَهُ مِنْ رَحْمَتِنَا:x / أَخَاهُ:nasb / هَارُونَ:cerr / نَبِيًّا:x", "Rahmetimizden ona kardeşi Hârûn’u peygamber olarak bağışladık. (Meryem 53)", "Bedel-i küll; نَبِيًّا hâl."),
      T("قَالُوا آمَنَّا:x / بِرَبِّ العَالَمِينَ:nasb / رَبِّ مُوسَى وَهَارُونَ:cerr", "“Âlemlerin Rabbine, Mûsâ ve Hârûn’un Rabbine iman ettik” dediler. (A’râf 121-122)", "Bedel-i küll."),
      T("مَنْ سَأَلَ:x / النَّاسَ:nasb / أَمْوَالَهُمْ:cerr / تَكَثُّرًا فَإِنَّمَا يَسْأَلُ جَمْرًا، فَلْيَسْتَقِلَّ أَوْ لِيَسْتَكْثِرْ:x", "Kim mal çoğaltmak için insanlardan mallarını isterse ancak kor ateş istemiş olur; artık az istesin ya da çok. (Müslim)", "Bedel-i iştimâl."),
      T("أَهْلُ الجَنَّةِ:x / ثَلَاثَةٌ:nasb / ذُو سُلْطَانٍ مُقْسِطٌ مُوَفَّقٌ، وَرَجُلٌ رَحِيمٌ رَقِيقُ القَلْبِ لِكُلِّ ذِي قُرْبَى وَمُسْلِمٍ، وَعَفِيفٌ مُتَعَفِّفٌ ذُو عِيَالٍ:cerr", "Cennet ehli üç kişidir: adil ve başarılı yönetici; her akrabaya ve Müslümana karşı merhametli, ince kalpli kişi; çoluk çocuk sahibi iffetli, dilenmeyen kişi. (Müslim)", "Bedel-i küll (tafsîl).")
    ]},
    { type: "reading", num: "٩", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجِ المُبْدَلَ مِنْهُ وَالبَدَلَ وَعَيِّنْ نَوْعَهُ", tr: "Metni oku, soruları cevapla; sonra koyu ifadenin bedel olup olmadığını, türünü ve i’rabını seç.", title: "عَدْلُ الرَّسُولِ ﷺ",
      text: METIN,
      textTr: "Sahâbîlerden biri Resûlullah ﷺ’in huzurunda durdu ve ona amcası Abbas’ın (r.a.) Bedir Gazvesi’nde Müslümanlar tarafından müşrik esirleri arasında yakalandığını haber verdi. Abbas ve eşi Ümmü’l-Fadl Bedir’den önce Müslüman olmuşlardı; ama Abbas müşriklerin haberlerini Müslümanlara iletmek için Resûlullah’ın emriyle Müslümanlığını gizleyip Mekke’de kalmıştı.<br>Resûlullah ﷺ Bedir’de uyuyamadı; gecenin yarısı geçmişti. Sahâbîler “Ey Allah’ın Resûlü, niçin uyumuyorsun?” dediler. “Abbas’ın bağları içindeki inlemesini duydum” buyurdu. Sahâbîlerin bir kısmı kalkıp onun bağlarını gevşetti. Resûlullah ﷺ bunu öğrenince, aynısını bütün esirlere yapmalarını emretti.",
      qa: [
        { q: "مَنْ أُخِذَ ضِمْنَ أَسْرَى المُشْرِكِينَ فِي بَدْرٍ؟", a: "العَبَّاسُ عَمُّ الرَّسُولِ ﷺ.", tr: "Bedir’de müşrik esirleri arasında kim yakalandı? Resûlullah’ın amcası Abbas." },
        { q: "لِمَاذَا بَقِيَ العَبَّاسُ فِي مَكَّةَ؟", a: "لِيَنْقُلَ إِلَى المُسْلِمِينَ أَخْبَارَ المُشْرِكِينَ بِأَمْرٍ مِنَ الرَّسُولِ ﷺ.", tr: "Abbas niçin Mekke’de kaldı? Resûlullah’ın emriyle müşriklerin haberlerini iletmek için." },
        { q: "لِمَاذَا لَمْ يَنَمِ الرَّسُولُ ﷺ؟", a: "لِأَنَّهُ سَمِعَ العَبَّاسَ أَنِينَهُ فِي وَثَاقِهِ.", tr: "Resûlullah niçin uyumadı? Abbas’ın bağları içindeki inlemesini duydu." },
        { q: "بِمَ أَمَرَ الرَّسُولُ ﷺ أَصْحَابَهُ؟ وَمَاذَا يَدُلُّ عَلَيْهِ ذَلِكَ؟", a: "أَمَرَهُمْ أَنْ يُخَفِّفُوا وَثَاقَ الأَسْرَى كُلِّهِمْ؛ وَهَذَا يَدُلُّ عَلَى عَدْلِهِ.", tr: "Resûlullah ashabına ne emretti, bu neyi gösterir? Bütün esirlerin bağlarını gevşetmelerini; bu onun adaletini gösterir." }
      ],
      cls: { opts: RD, ar: "مَا نَوْعُ البَدَلِ؟", tr: "Koyu kelime bedel mi? Bedelse türü ne?", items: [
        { s: HL("وَأَخْبَرَهُ أَنَّ عَمَّهُ العَبَّاسَ أَخَذَهُ المُسْلِمُونَ", "العَبَّاسَ"), a: "k", why: "Mübdel minh عَمَّهُ; amca = Abbas." },
        { s: HL("وَكَانَ العَبَّاسُ وَزَوْجَتُهُ أُمُّ الفَضْلِ قَدْ أَسْلَمَا", "أُمُّ الفَضْلِ"), a: "k", why: "Mübdel minh زَوْجَتُهُ." },
        { s: HL("وَقَدْ مَضَى اللَّيْلُ نِصْفُهُ", "نِصْفُهُ"), a: "b", why: "Mübdel minh اللَّيْلُ; yarısı: parça." },
        { s: HL("سَمِعْتُ العَبَّاسَ أَنِينَهُ فِي وَثَاقِهِ", "أَنِينَهُ"), a: "s", why: "Mübdel minh العَبَّاسَ; inleme parça değil." },
        { s: HL("فَقَامَ الصَّحَابَةُ بَعْضُهُمْ", "بَعْضُهُمْ"), a: "b", why: "Mübdel minh الصَّحَابَةُ." },
        { s: HL("أَنْ يَفْعَلُوا ذَلِكَ بِالأَسْرَى كُلِّهِمْ", "كُلِّهِمْ"), a: "x", why: "Te’kîd." },
        { s: HL("وَقَفَ أَحَدُ الصَّحَابَةِ أَمَامَ رَسُولِ اللهِ", "الصَّحَابَةِ"), a: "x", why: "Muzâfun ileyh." },
        { s: HL("ضِمْنَ أَسْرَى المُشْرِكِينَ فِي غَزْوَةِ بَدْرٍ", "بَدْرٍ"), a: "x", why: "Muzâfun ileyh." }
      ]},
      cls2: { opts: IRB, ar: "مَا إِعْرَابُ البَدَلِ؟", tr: "Bedel, mübdel minh’e uyarak merfû mu, mansûb mu, mecrûr mu?", items: [
        { s: HL("أَنَّ عَمَّهُ العَبَّاسَ", "العَبَّاسَ"), a: "m", why: "أَنَّ’nin ismine uyar: mansûb." },
        { s: HL("وَزَوْجَتُهُ أُمُّ الفَضْلِ", "أُمُّ"), a: "r", why: "Merfû العَبَّاسُ’a ma’tûf زَوْجَتُهُ’ye uyar." },
        { s: HL("مَضَى اللَّيْلُ نِصْفُهُ", "نِصْفُهُ"), a: "r", why: "Fâile uyar." },
        { s: HL("سَمِعْتُ العَبَّاسَ أَنِينَهُ", "أَنِينَهُ"), a: "m", why: "Mef’ûle uyar." },
        { s: HL("فَقَامَ الصَّحَابَةُ بَعْضُهُمْ", "بَعْضُهُمْ"), a: "r", why: "Fâile uyar." },
        { s: HL("بِرَبِّ العَالَمِينَ رَبِّ مُوسَى", "رَبِّ مُوسَى"), a: "c", why: "Mecrûra uyar." },
        { s: HL("قَالَ إِبْرَاهِيمُ لِأَبِيهِ آزَرَ", "آزَرَ"), a: "c", why: "Mecrûr; gayr-i munsarif olduğu için fethalı." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["حَضَرَ أَخُوكَ {حَسَنٌ}.", ["حَسَنٌ", "حَسَنًا", "حَسَنٍ"], "merfûa tâbi’", "Kardeşin Hasan geldi.", "u1"],
  ["سَلَّمْتُ عَلَى صَدِيقِكَ {حُسَيْنٍ}.", ["حُسَيْنٍ", "حُسَيْنٌ", "حُسَيْنًا"], "mecrûra tâbi’", "Arkadaşın Hüseyin’e selam verdim.", "u1"],
  ["قَامَ الطُّلَّابُ {بَعْضُهُمْ}.", ["بَعْضُهُمْ", "بَعْضَهُمْ", "بَعْضِهِمْ"], "merfû", "Öğrencilerin bir kısmı kalktı.", "u1"],
  ["قَرَأْتُ الصَّحِيفَةَ {نِصْفَهَا}.", ["نِصْفَهَا", "نِصْفَهُ", "نِصْفُهَا"], "mansûb, هَا", "Gazetenin yarısını okudum.", "u1"],
  ["أَعْجَبَنِي الشَّابُّ {أَدَبُهُ}.", ["أَدَبُهُ", "أَدَبَهُ", "أَدَبُهَا"], "merfû, iştimâl", "Gencin edebi hoşuma gitti.", "u1"],
  ["حَفِظْتُ القُرْآنَ {ثُلُثَهُ}.", ["ثُلُثَهُ", "ثُلُثُهُ", "ثُلُثَهَا"], "ba’z, mansûb", "Kur’an’ın üçte birini ezberledim.", "u2"],
  ["أَعْجَبَتْنِي الطَّالِبَةُ {عِلْمُهَا}.", ["عِلْمُهَا", "عِلْمُهُ", "عِلْمَهَا"], "iştimâl", "Kız öğrencinin ilmi hoşuma gitti.", "u2"],
  ["رَأَيْتُ المُدَرِّسِينَ {أَكْثَرَهُمْ}.", ["أَكْثَرَهُمْ", "أَكْثَرُهُمْ", "أَكْثَرَهُ"], "ba’z", "Öğretmenlerin çoğunu gördüm.", "u2"],
  ["يَصُومُونَ فِي الشَّهْرِ الكَرِيمِ {رَمَضَانَ}.", ["رَمَضَانَ", "رَمَضَانُ", "رَمَضَانٍ"], "küll; gayr-i munsarif mecrûr", "Mübarek ay Ramazan’da oruç tutarlar.", "u2"],
  ["أَعْجَبَتْنَا إِسْطَنْبُولُ {آثَارُهَا}.", ["آثَارُهَا", "آثَارَهَا", "آثَارُهُ"], "iştimâl", "İstanbul’un eserleri hoşumuza gitti.", "u2"],
  ["شَرِبَ المَرِيضُ اللَّبَنَ {بَعْضَهُ}.", ["بَعْضَهُ", "بَعْضُهُ", "بَعْضِهِ"], "mansûb", "Hasta sütün bir kısmını içti.", "u3"],
  ["سَلَّمْتُ عَلَى المُهَنْدِسِينَ {أَكْثَرِهِمْ}.", ["أَكْثَرِهِمْ", "أَكْثَرَهُمْ", "أَكْثَرُهُمْ"], "mecrûr", "Mühendislerin çoğuna selam verdim.", "u3"],
  ["اسْتَمَعْتُ إِلَى الإِمَامِ {خُطْبَتِهِ}.", ["خُطْبَتِهِ", "خُطْبَتَهُ", "خُطْبَتُهُ"], "mecrûr", "İmamın hutbesini dinledim.", "u3"],
  ["الإِمَامُ {أَبُو} حَنِيفَةَ أَحَدُ أَئِمَّةِ المَذَاهِبِ.", ["أَبُو", "أَبَا", "أَبِي"], "esmâ-i hamse, merfû", "İmam Ebû Hanîfe…", "u3"],
  ["عَالَجَ الطَّبِيبُ {المَرِيضَ} عَيْنَهُ.", ["المَرِيضَ", "المَرِيضُ", "المَرِيضَةَ"], "mübdel minh: mef’ûl", "Doktor hastanın gözünü tedavi etti.", "u3"],
  ["رَجَعَ {الحُجَّاجُ} مُعْظَمُهُمْ إِلَى بِلَادِهِمْ.", ["الحُجَّاجُ", "الحَاجُّ", "الحُجَّاجَ"], "mübdel minh: çoğul fâil", "Hacıların çoğu döndü.", "u3"],
  ["اشْتَرَيْتُ الحَقْلَ {ثُلُثَهُ}.", ["ثُلُثَهُ", "ثُلُثُهُ", "ثُلُثَ"], "bedel zamirli", "Tarlanın üçte birini aldım.", "u4"],
  ["ضَعُفَ المِصْبَاحُ {نُورُهُ}.", ["نُورُهُ", "نُورَهُ", "نُورُهَا"], "merfû", "Lambanın ışığı zayıfladı.", "u4"],
  ["احْتَرَقَ {أَثَاثُ} الشُّقَّةِ.", ["أَثَاثُ", "أَثَاثَ", "أَثَاثِ"], "bedelsiz: fâil", "Dairenin eşyası yandı.", "u4"],
  ["صُمْنَا {نِصْفَ} رَمَضَانَ.", ["نِصْفَ", "نِصْفُ", "نِصْفَهُ"], "bedelsiz: mef’ûl", "Ramazan’ın yarısını oruçla geçirdik.", "u4"],
  ["أَزْعَجَنِي الطِّفْلُ {بُكَاؤُهُ}.", ["بُكَاؤُهُ", "بُكَاءَهُ", "بُكَائِهِ"], "merfû", "Çocuğun ağlaması beni rahatsız etti.", "u4"],
  ["اهْدِنَا الصِّرَاطَ المُسْتَقِيمَ {صِرَاطَ} الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ.", ["صِرَاطَ", "صِرَاطُ", "صِرَاطِ"], "mansûb", "Nimet verdiklerinin yoluna.", "u5"],
  ["وَإِذْ قَالَ إِبْرَاهِيمُ لِأَبِيهِ {آزَرَ}.", ["آزَرَ", "آزَرُ", "آزَرٍ"], "gayr-i munsarif mecrûr", "Babası Âzer’e.", "u5"],
  ["قُمِ اللَّيْلَ إِلَّا قَلِيلًا {نِصْفَهُ}.", ["نِصْفَهُ", "نِصْفُهُ", "نِصْفِهِ"], "mansûb", "Gecenin yarısını.", "u5"],
  ["آمَنَّا بِرَبِّ العَالَمِينَ {رَبِّ} مُوسَى وَهَارُونَ.", ["رَبِّ", "رَبَّ", "رَبُّ"], "mecrûr", "Mûsâ ve Hârûn’un Rabbine.", "u5"],
  ["سَمِعْتُ العَبَّاسَ {أَنِينَهُ}.", ["أَنِينَهُ", "أَنِينُهُ", "أَنِينِهِ"], "mansûb, iştimâl", "Abbas’ın inlemesini duydum.", "u5"],
  ["وَقَدْ مَضَى اللَّيْلُ {نِصْفُهُ}.", ["نِصْفُهُ", "نِصْفَهُ", "نِصْفِهِ"], "merfû, ba’z", "Gecenin yarısı geçmişti.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["حَضَرَ أَخُوكَ ← bedel: حَسَن", "حَضَرَ أَخُوكَ حَسَنٌ", "حَضَرَ أَخُوكَ حَسَنًا", "حَضَرَ أَخُوكَ حَسَنَهُ", "Bedel-i küll zamir almaz, merfû.", "u1"],
  ["قَامَ الطُّلَّابُ ← bedel: بَعْض", "قَامَ الطُّلَّابُ بَعْضُهُمْ", "قَامَ الطُّلَّابُ بَعْضُهُ", "قَامَ الطُّلَّابُ بَعْضَهُمْ", "Zamir هُمْ, merfû.", "u1"],
  ["أَعْجَبَنِي الشَّابُّ ← bedel: أَدَب", "أَعْجَبَنِي الشَّابُّ أَدَبُهُ", "أَعْجَبَنِي الشَّابُّ أَدَبَهُ", "أَعْجَبَنِي الشَّابُّ الأَدَبُ", "İştimâl: zamirli, merfû.", "u1"],
  ["قَرَأْتُ نِصْفَ الكِتَابِ ← bedel-i ba’z", "قَرَأْتُ الكِتَابَ نِصْفَهُ", "قَرَأْتُ الكِتَابَ نِصْفُهُ", "قَرَأْتُ الكِتَابُ نِصْفَهُ", "Mef’ûl ve bedeli mansûb.", "u2"],
  ["أَعْجَبَتْنِي جُهُودُ الطَّالِبَاتِ ← bedel-i iştimâl", "أَعْجَبَتْنِي الطَّالِبَاتُ جُهُودُهُنَّ", "أَعْجَبَتْنِي الطَّالِبَاتُ جُهُودُهُمْ", "أَعْجَبَتْنِي الطَّالِبَاتُ جُهُودَهُنَّ", "Zamir هُنَّ, merfû.", "u2"],
  ["الخَلِيفَةُ أَوَّلُ الخُلَفَاءِ ← bedel-i küll: أَبُو بَكْر", "الخَلِيفَةُ أَبُو بَكْرٍ أَوَّلُ الخُلَفَاءِ", "الخَلِيفَةُ أَبَا بَكْرٍ أَوَّلُ الخُلَفَاءِ", "الخَلِيفَةُ أَبِي بَكْرٍ أَوَّلُ الخُلَفَاءِ", "Mübtedâya uyar: vav ile.", "u2"],
  ["سَلَّمْتُ عَلَى المُهَنْدِسِينَ ← bedel: أَكْثَر", "سَلَّمْتُ عَلَى المُهَنْدِسِينَ أَكْثَرِهِمْ", "سَلَّمْتُ عَلَى المُهَنْدِسِينَ أَكْثَرَهُمْ", "سَلَّمْتُ عَلَى المُهَنْدِسِينَ أَكْثَرِهِ", "Mecrûr, هُمْ.", "u3"],
  ["اسْتَمَعْتُ إِلَى الإِمَامِ ← bedel: خُطْبَة", "اسْتَمَعْتُ إِلَى الإِمَامِ خُطْبَتِهِ", "اسْتَمَعْتُ إِلَى الإِمَامِ خُطْبَتَهُ", "اسْتَمَعْتُ إِلَى الإِمَامِ خُطْبَتِهَا", "Mecrûr, هُ.", "u3"],
  ["أَعْجَبَتْنِي الحَدِيقَةُ ← bedel: أَشْجَار", "أَعْجَبَتْنِي الحَدِيقَةُ أَشْجَارُهَا", "أَعْجَبَتْنِي الحَدِيقَةُ أَشْجَارُهُ", "أَعْجَبَتْنِي الحَدِيقَةُ أَشْجَارَهَا", "Merfû, هَا.", "u3"],
  ["عَالَجَ الطَّبِيبُ أَكْثَرَ المَرْضَى ← bedelli", "عَالَجَ الطَّبِيبُ المَرْضَى أَكْثَرَهُمْ", "عَالَجَ الطَّبِيبُ المَرْضَى أَكْثَرُهُمْ", "عَالَجَ الطَّبِيبُ المَرْضَى أَكْثَرَهُ", "Mansûb, هُمْ.", "u4"],
  ["اتَّسَعَتْ شَوَارِعُ المَدِينَةِ ← bedelli", "اتَّسَعَتِ المَدِينَةُ شَوَارِعُهَا", "اتَّسَعَتِ المَدِينَةُ شَوَارِعَهَا", "اتَّسَعَتِ المَدِينَةَ شَوَارِعُهَا", "Fâil ve bedeli merfû.", "u4"],
  ["تَخَرَّجَ الطُّلَّابُ مُعْظَمُهُمْ ← bedelsiz", "تَخَرَّجَ مُعْظَمُ الطُّلَّابِ", "تَخَرَّجَ مُعْظَمَ الطُّلَّابِ", "تَخَرَّجَ مُعْظَمُ الطُّلَّابُ", "Fâil merfû, muzâfun ileyh mecrûr.", "u4"],
  ["مَضَى نِصْفُ اللَّيْلِ ← bedelli", "مَضَى اللَّيْلُ نِصْفُهُ", "مَضَى اللَّيْلُ نِصْفَهُ", "مَضَى اللَّيْلَ نِصْفُهُ", "Fâil ve bedeli merfû.", "u5"],
  ["سَمِعْتُ أَنِينَ العَبَّاسِ ← bedelli", "سَمِعْتُ العَبَّاسَ أَنِينَهُ", "سَمِعْتُ العَبَّاسَ أَنِينُهُ", "سَمِعْتُ العَبَّاسُ أَنِينَهُ", "Mef’ûl ve bedeli mansûb.", "u5"]
];
// Bedel türü hız oyunu
var NOUN_LIST = UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = TUR;
// Bedel mi, na’t mı, te’kîd mi hız oyunu
var MM_OPTS = TB;
var MM_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  tu: { name: "Örnek ↔ tür", pairs: [["حَضَرَ أَخُوكَ حَسَنٌ", "bedel-i küll"], ["قَرَأْتُ الصَّحِيفَةَ نِصْفَهَا", "bedel-i ba’z"], ["أَعْجَبَنِي الشَّابُّ أَدَبُهُ", "bedel-i iştimâl"], ["قَامَ الطُّلَّابُ بَعْضُهُمْ", "ba’z: zamir هُمْ"], ["قِتَالٍ فِيهِ", "iştimâl (Bakara 217)"], ["لِأَبِيهِ آزَرَ", "küll (En’âm 74)"], ["الكِتَابَ كُلَّهُ", "te’kîd, bedel değil"], ["الصِّرَاطَ المُسْتَقِيمَ", "na’t, bedel değil"]] },
  ce: { name: "Bedelli ↔ bedelsiz", pairs: [["قَرَأْتُ الكِتَابَ نِصْفَهُ", "قَرَأْتُ نِصْفَ الكِتَابِ"], ["أَعْجَبَنِي الطَّالِبُ خُلُقُهُ", "أَعْجَبَنِي خُلُقُ الطَّالِبِ"], ["ضَعُفَ المِصْبَاحُ نُورُهُ", "ضَعُفَ نُورُ المِصْبَاحِ"], ["صُمْنَا رَمَضَانَ نِصْفَهُ", "صُمْنَا نِصْفَ رَمَضَانَ"], ["تَخَرَّجَ الطُّلَّابُ مُعْظَمُهُمْ", "تَخَرَّجَ مُعْظَمُ الطُّلَّابِ"], ["قَابَلْتُ الأَصْدِقَاءَ أَحَدَهُمْ", "قَابَلْتُ أَحَدَ الأَصْدِقَاءِ"], ["قَطَفْتُ الشَّجَرَةَ ثَمَرَهَا", "قَطَفْتُ ثَمَرَ الشَّجَرَةِ"], ["اشْتَرَيْتُ الحَقْلَ ثُلُثَهُ", "اشْتَرَيْتُ ثُلُثَ الحَقْلِ"]] },
  ay: { name: "Arapça ↔ Türkçe", pairs: [["اهْدِنَا الصِّرَاطَ المُسْتَقِيمَ", "bizi doğru yola ilet"], ["صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ", "nimet verdiklerinin yoluna"], ["عَنِ الشَّهْرِ الحَرَامِ قِتَالٍ فِيهِ", "haram ayda savaşmaktan"], ["قُمِ اللَّيْلَ إِلَّا قَلِيلًا", "gecenin azı hariç kalk"], ["أَخَاهُ هَارُونَ نَبِيًّا", "kardeşi Hârûn’u peygamber olarak"], ["رَبِّ مُوسَى وَهَارُونَ", "Mûsâ ve Hârûn’un Rabbi"], ["فَإِنَّمَا يَسْأَلُ جَمْرًا", "o ancak kor ateş istiyor"], ["مَضَى اللَّيْلُ نِصْفُهُ", "gecenin yarısı geçti"]] }
};
var KARTLAR = [
  ["Bedel nedir?", "Hükümde asıl kastedilen tâbi; mübdel minh ona zemin hazırlar: حَضَرَ أَخُوكَ حَسَنٌ"],
  ["Bedelin iki öğesi?", "المُبْدَلُ مِنْهُ + البَدَلُ: الطُّلَّابُ + بَعْضُهُمْ"],
  ["Bedel-i küll?", "Bedel mübdel minh’in kendisi: أَخُوكَ حَسَنٌ · الخَلِيفَةُ أَبُو بَكْرٍ"],
  ["Bedel-i ba’z?", "Bir parça: قَرَأْتُ الصَّحِيفَةَ نِصْفَهَا · قَامَ الطُّلَّابُ بَعْضُهُمْ"],
  ["Bedel-i iştimâl?", "Parça değil, ona ait bir özellik: أَعْجَبَنِي الشَّابُّ أَدَبُهُ"],
  ["Hangi bedeller zamir alır?", "Ba’z ve iştimâl; zamir mübdel minh’e uyar: جُهُودُهُنَّ"],
  ["Bedelin i’rabı?", "Mübdel minh’e uyar: عَلَى المُهَنْدِسِينَ أَكْثَرِهِمْ"],
  ["الكِتَابَ نِصْفَهُ ile الكِتَابَ كُلَّهُ farkı?", "نِصْفَهُ bedel-i ba’z; كُلَّهُ te’kîd."],
  ["İzafetten bedele?", "قَرَأْتُ نِصْفَ الكِتَابِ ← قَرَأْتُ الكِتَابَ نِصْفَهُ"],
  ["Bedelden izafete?", "أَعْجَبَنِي الطَّالِبُ خُلُقُهُ ← أَعْجَبَنِي خُلُقُ الطَّالِبِ"],
  ["قِتَالٍ فِيهِ?", "Bedel-i iştimâl (Bakara 217); bağ فِيهِ ile."],
  ["لِأَبِيهِ آزَرَ?", "Bedel-i küll; آزَرَ gayr-i munsarif, fetha ile mecrûr."]
];
