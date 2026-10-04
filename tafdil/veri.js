// ================= VERİ: İsm-i Tafdîl (اسْمُ التَّفْضِيلِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mi: { ar: "اسْمُ التَّفْضِيلِ", tr: "İsm-i tafdîl" }, cerr: { ar: "المُفَضَّلُ عَلَيْهِ", tr: "Kıyaslanan / muzâfun ileyh" },
  nasb: { ar: "التَّمْيِيزُ", tr: "Temyiz" }, mz: { ar: "الصِّفَةُ", tr: "Sıfat / mevsuf" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// Dört kullanım
var KU = [["m", "1. Nekre + min", "نَكِرَةٌ + مِنْ", "mz"], ["n", "2. Nekreye muzâf", "مُضَافٌ إِلَى نَكِرَةٍ", "cerr"], ["e", "3. Marifeye muzâf", "مُضَافٌ إِلَى مَعْرِفَةٍ", "nasb"], ["l", "4. Elif-lâmlı", "مُعَرَّفٌ بِأَلْ", "mi"]];
var KU_TR = { m: "1. Nekre + min", n: "2. Nekreye muzâf", e: "3. Marifeye muzâf", l: "4. Elif-lâmlı" };
var KU_UY = { m: ["SABİT", "Daima أَفْعَلُ: müennes, müsennâ ve cemi için de değişmez.", "ref"], n: ["SABİT", "أَفْعَلُ değişmez; sonraki nekre isim özneye uyar.", "ref"], e: ["İKİ YOL", "Ya sabit kalır ya da uyar: أَفْضَلُ / أَفَاضِلُ، فُضْلَى / فُضْلَيَاتُ.", "nasb"], l: ["UYUM ŞART", "Mevsufuna cinsiyet ve sayıda uyar: الأَفْضَلُ، الفُضْلَى، الأَفَاضِلُ.", "mi"] };
var DY = [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "ref"]];
// Makine sıfatları: [sıfat, tafdîl (müzekker), tafdîl (müennes), Türkçe]
var TF = [
  ["كَبِيرٌ", "أَكْبَرُ", "كُبْرَى", "büyük"], ["صَغِيرٌ", "أَصْغَرُ", "صُغْرَى", "küçük"], ["فَاضِلٌ", "أَفْضَلُ", "فُضْلَى", "faziletli"], ["حَسَنٌ", "أَحْسَنُ", "حُسْنَى", "güzel"],
  ["طَوِيلٌ", "أَطْوَلُ", "طُولَى", "uzun"], ["عَظِيمٌ", "أَعْظَمُ", "عُظْمَى", "yüce"], ["عَالٍ", "أَعْلَى", "عُلْيَا", "yüksek"], ["قَرِيبٌ", "أَقْرَبُ", "قُرْبَى", "yakın"]
];
// Tafdîl yapma: [sıfat, tafdîl, yanlış 1, yanlış 2, Türkçe, not]
var TY = [
  ["صَغِيرٌ", "أَصْغَرُ", "صُغْرَى", "أُصَيْغِرُ", "küçük → daha küçük", ""], ["قَصِيرٌ", "أَقْصَرُ", "قُصْرَى", "أَقَاصِرُ", "kısa → daha kısa", ""],
  ["حَسَنٌ", "أَحْسَنُ", "حُسْنَى", "إِحْسَانٌ", "güzel → daha güzel", ""], ["عَظِيمٌ", "أَعْظَمُ", "عُظْمَى", "عِظَامٌ", "büyük → daha büyük", ""],
  ["وَاسِعٌ", "أَوْسَعُ", "وُسْعَى", "مُوَسَّعٌ", "geniş → daha geniş", ""], ["سَهْلٌ", "أَسْهَلُ", "سُهْلَى", "مُسَهَّلٌ", "kolay → daha kolay", ""],
  ["طَوِيلٌ", "أَطْوَلُ", "طُولَى", "أَطْيَلُ", "uzun → daha uzun", ""], ["صَعْبٌ", "أَصْعَبُ", "صُعْبَى", "مُصَعَّبٌ", "zor → daha zor", ""],
  ["عَالِمٌ", "أَعْلَمُ", "عُلْمَى", "عَلِيمٌ", "bilgin → daha bilgin", ""], ["كَرِيمٌ", "أَكْرَمُ", "كُرْمَى", "إِكْرَامٌ", "cömert → daha cömert", ""],
  ["شَدِيدٌ", "أَشَدُّ", "أَشْدَدُ", "شِدَادٌ", "şiddetli → daha şiddetli", "Muzâaf: أَشْدَدُ → أَشَدُّ (idğam)."], ["قَلِيلٌ", "أَقَلُّ", "أَقْلَلُ", "قِلَّةٌ", "az → daha az", "Muzâaf: أَقْلَلُ → أَقَلُّ (idğam)."],
  ["حُلْوٌ", "أَحْلَى", "أَحْلَوُ", "حَلْوَى", "tatlı → daha tatlı", "Nâkıs: son harf elif-i maksûre olur."], ["قَوِيٌّ", "أَقْوَى", "أَقْوَيُ", "قُوَّةٌ", "güçlü → daha güçlü", "Nâkıs: son harf elif-i maksûre olur."],
  ["غَنِيٌّ", "أَغْنَى", "أَغْنَيُ", "غِنًى", "zengin → daha zengin", "Nâkıs: son harf elif-i maksûre olur."]
];

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function SUR(s) { return ' <small class="muted">(' + s + ')</small>'; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}

var UNITS = [
// ---------------------------------------------------------------- 1 · NEDİR
{
  id: "u1", no: 1, ar: "مَا اسْمُ التَّفْضِيلِ؟", tr: "İsm-i Tafdîl Nedir?", short: "Nedir?", col: "mi", legend: ["mi", "cerr"],
  goals: ["İsm-i tafdîlin iki şeyin ortak bir sıfatta birinin üstün geldiğini bildirdiğini bilmek: \"daha …, en …\"", "Sülâsî sıfattan أَفْعَلُ kalıbıyla yapmak; خَيْرٌ ve شَرٌّ hemzesizdir", "Muzâaf (أَشَدُّ) ve nâkıs (أَعْلَى) şekilleri tanımak; renk sıfatı أَحْمَرُ ile ve fiil أَعْلَمُ ile karıştırmamak"],
  examples: [
    { s: "حَسَنٌ:- / أَفْضَلُ:mi / مِنْ جَمَالٍ.:cerr", tr: "Hasan Cemal’den daha faziletlidir.", pair: "فَاطِمَةُ:- / أَفْضَلُ:mi / مِنْ زَيْنَبَ.:cerr", pairTr: "Fâtıma Zeyneb’den daha faziletlidir." },
    { s: "اليَدُ العُلْيَا:- / خَيْرٌ:mi / مِنَ اليَدِ السُّفْلَى.:cerr", tr: "Veren el alan elden daha hayırlıdır. (hadis)" }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">İsm-i tafdîl</b> (<span class=\"ar\">اسْمُ التَّفْضِيلِ</span>): iki şey bir sıfatta ortaktır, biri o sıfatta ötekinden <b>daha fazladır</b>. Türkçede \"daha …\" ya da \"en …\" ile karşılanır." },
    { tr: "Vezni <b class=\"ar\">أَفْعَلُ</b>; gayr-ı munsariftir (tenvin almaz):", ex: ["كَبِيرٌ ← أَكْبَرُ", "صَغِيرٌ ← أَصْغَرُ", "عَالِمٌ ← أَعْلَمُ", "وَاسِعٌ ← أَوْسَعُ"] },
    { tr: "İki kelime <b>hemzesiz</b> meşhur olmuştur: <span class=\"ar\">خَيْرٌ</span> (daha hayırlı) ve <span class=\"ar\">شَرٌّ</span> (daha kötü). Aslı أَخْيَرُ، أَشَرُّ." },
    { tr: "Muzâafta idğam olur: <span class=\"ar\">أَشْدَدُ ← أَشَدُّ، أَقْلَلُ ← أَقَلُّ</span>. Nâkısta son harf elif-i maksûre olur: <span class=\"ar\">أَعْلَى، أَقْوَى، أَحْلَى، أَغْنَى</span>." },
    { tr: "Karıştırma: renk ve ayıp sıfatları da أَفْعَلُ kalıbındadır ama tafdîl değildir (<span class=\"ar\">أَحْمَرُ – حَمْرَاءُ، أَعْرَجُ</span>). <span class=\"ar\">أَعْلَمُ ذَلِكَ</span> \"bunu bilirim\" muzâri fiildir." }
  ],
  kaide: [
    "اسْمُ التَّفْضِيلِ: اسْمٌ مُشْتَقٌّ يَدُلُّ عَلَى زِيَادَةٍ فِي صِفَةٍ، اشْتَرَكَ فِيهَا اثْنَانِ، وَزَادَ أَحَدُهُمَا فِيهَا عَلَى الآخَرِ.",
    "وَزْنُهُ: أَفْعَلُ.",
    "هُنَاكَ صِيغَتَانِ فِي اسْمِ التَّفْضِيلِ اشْتَهَرَتَا بِحَذْفِ الهَمْزَةِ: خَيْرٌ – شَرٌّ."
  ],
  ex: [
    { type: "pick", fill: true, num: "١", ar: "امْلَأِ الفَرَاغَ بِاسْمِ تَفْضِيلٍ مُنَاسِبٍ مِنَ الكَلِمَاتِ التَّالِيَةِ", tr: "Sıfattan ism-i tafdîli seç: أَفْعَلُ. Muzâafta idğam, nâkısta elif-i maksûre.", exHtml: "<span class=\"ar\">كَبِيرٌ ← أَكْبَرُ</span>",
      items: TY.map(function (v, i) { return P(v[0] + " ← ___", v[1], v[2], v[3], i, v[4], v[5] || "أَفْعَلُ: " + v[1] + "."); }) },
    { type: "classify", extra: true, opts: [["t", "İsm-i tafdîl", "اسْمُ تَفْضِيلٍ", "mi"], ["x", "Değil", "لَيْسَ تَفْضِيلًا", "x"]], ar: "اسْمُ تَفْضِيلٍ أَمْ لَا؟", tr: "أَفْعَلُ kalıbındaki her kelime tafdîl değildir. Koyu kelime tafdîl mi?", items: [
      { s: HL("هُوَ أَكْبَرُ مِنْ أَخِيهِ", "أَكْبَرُ"), a: "t", why: "Kardeşinden daha büyük." },
      { s: HL("لَبِسْتُ ثَوْبًا أَحْمَرَ", "أَحْمَرَ"), a: "x", why: "Renk sıfatı: أَحْمَرُ – حَمْرَاءُ." },
      { s: HL("هُوَ أَعْلَمُ مِنِّي", "أَعْلَمُ"), a: "t", why: "Benden daha bilgili." },
      { s: HL("أَنَا أَعْلَمُ ذَلِكَ", "أَعْلَمُ"), a: "x", why: "Muzâri fiil: \"bilirim\"." },
      { s: HL("رَأَيْتُ رَجُلًا أَعْرَجَ", "أَعْرَجَ"), a: "x", why: "Ayıp sıfatı (topal): أَعْرَجُ – عَرْجَاءُ." },
      { s: HL("الصِّدْقُ أَحْسَنُ الأَخْلَاقِ", "أَحْسَنُ"), a: "t", why: "Ahlâkın en güzeli." },
      { s: HL("أَكْرَمَ الرَّجُلُ ضَيْفَهُ", "أَكْرَمَ"), a: "x", why: "Mâzi fiil: ikram etti." },
      { s: HL("إِنَّ أَكْرَمَكُمْ عِنْدَ اللهِ أَتْقَاكُمْ", "أَكْرَمَكُمْ"), a: "t", why: "En değerliniz (Hucurât 13)." },
      { s: HL("الثَّلْجُ أَبْيَضُ", "أَبْيَضُ"), a: "x", why: "Renk sıfatı: beyaz." },
      { s: HL("هُوَ خَيْرٌ مِنْكَ", "خَيْرٌ"), a: "t", why: "Hemzesiz tafdîl: senden daha hayırlı." },
      { s: HL("أَكْتُبُ الدَّرْسَ", "أَكْتُبُ"), a: "x", why: "Muzâri fiil: yazıyorum." },
      { s: HL("القِطَارُ أَسْرَعُ مِنَ السَّيَّارَةِ", "أَسْرَعُ"), a: "t", why: "Arabadan daha hızlı." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · DÖRT KULLANIM
{
  id: "u2", no: 2, ar: "اسْتِعْمَالَاتُ اسْمِ التَّفْضِيلِ", tr: "Dört Kullanım ve Uyum", short: "4 kullanım", col: "cerr", legend: ["mi", "cerr", "mz"],
  goals: ["Tafdîlin dört kullanımını tanımak: nekre + مِنْ, nekreye muzâf, marifeye muzâf, elif-lâmlı", "Hangi kullanımda sabit kaldığını, hangisinde uyduğunu bilmek: SABİT · SABİT · İKİ YOL · UYUM ŞART", "Doğru biçimi seçmek: أَفْضَلُ مِنْ زَيْنَبَ ama الطَّالِبَةُ الفُضْلَى"],
  examples: [
    { s: "حَسَنٌ:- / أَفْضَلُ:mi / مِنْ جَمَالٍ.:cerr", tr: "1 · Hasan Cemal’den daha faziletli.", pair: "فَاطِمَةُ:- / أَفْضَلُ:mi / مِنْ زَيْنَبَ.:cerr", pairTr: "1 · Fâtıma Zeyneb’den daha faziletli. (müennes ama أَفْضَلُ)" },
    { s: "حَسَنٌ:- / أَفْضَلُ:mi / طَالِبٍ:cerr / فِي الصَّفِّ.:-", tr: "2 · Hasan sınıftaki en faziletli öğrenci.", pair: "فَاطِمَةُ:- / أَفْضَلُ:mi / طَالِبَةٍ:cerr / فِي الصَّفِّ.:-", pairTr: "2 · Fâtıma sınıftaki en faziletli öğrenci. (أَفْضَلُ sabit, طَالِبَةٍ uydu)" },
    { s: "حَسَنٌ:- / أَفْضَلُ:mi / الطُّلَّابِ.:cerr", tr: "3 · Hasan öğrencilerin en faziletlisi.", pair: "فَاطِمَةُ:- / أَفْضَلُ:mi / الطَّالِبَاتِ.:cerr", pairTr: "3 · Fâtıma öğrencilerin en faziletlisi. (فُضْلَى da olur)" },
    { s: "أَحْمَدُ الطَّالِبُ:mz / الأَفْضَلُ:mi / خُلُقًا.:-", tr: "4 · Ahmed ahlâkça en faziletli öğrenci.", pair: "فَاطِمَةُ الطَّالِبَةُ:mz / الفُضْلَى:mi / خُلُقًا.:-", pairTr: "4 · Fâtıma ahlâkça en faziletli öğrenci. (uyum şart: الفُضْلَى)" }
  ],
  rules: [
    { tr: "<b>1. Nekre + مِنْ</b>: tafdîl daima <b>أَفْعَلُ</b>, hiç değişmez. \"…den daha …\"", ex: ["حَسَنٌ أَفْضَلُ مِنْ جَمَالٍ", "فَاطِمَةُ أَفْضَلُ مِنْ زَيْنَبَ"] },
    { tr: "<b>2. Nekreye muzâf</b>: tafdîl <b>sabit</b>; arkasındaki nekre isim özneye uyar. \"en … bir …\"", ex: ["حَسَنٌ أَفْضَلُ طَالِبٍ", "فَاطِمَةُ أَفْضَلُ طَالِبَةٍ", "هُمْ أَفْضَلُ رِجَالٍ", "هُنَّ أَفْضَلُ نِسَاءٍ"] },
    { tr: "<b>3. Marifeye muzâf</b>: <b>iki yol</b> var; sabit kalabilir ya da uyabilir. \"…lerin en …i\"", ex: ["حَسَنٌ أَفْضَلُ الطُّلَّابِ", "فَاطِمَةُ أَفْضَلُ الطَّالِبَاتِ", "هُمْ أَفْضَلُ / أَفَاضِلُ الرِّجَالِ", "هُنَّ أَفْضَلُ / فُضْلَيَاتُ النِّسَاءِ"] },
    { tr: "<b>4. Elif-lâmlı</b>: <b>uyum şart</b>; tafdîl sıfat gibi mevsufuna cinsiyet ve sayıda uyar, مِنْ almaz.", ex: ["أَحْمَدُ الطَّالِبُ الأَفْضَلُ خُلُقًا", "فَاطِمَةُ الطَّالِبَةُ الفُضْلَى خُلُقًا", "الأَسْمَاءُ الحُسْنَى", "اليَدُ العُلْيَا"] },
    { tr: "Kısa yol: <b>Arkasında مِنْ ya da nekre varsa dokunma; ال aldıysa uydur; marifeye muzâfsa ikisi de olur.</b>" }
  ],
  kaide: [
    "لِاسْمِ التَّفْضِيلِ اسْتِعْمَالَاتٌ أَرْبَعَةٌ:",
    "١ ـ أَنْ يَكُونَ نَكِرَةً وَبَعْدَهُ «مِنْ»: حَسَنٌ أَفْضَلُ مِنْ جَمَالٍ، فَاطِمَةُ أَفْضَلُ مِنْ زَيْنَبَ.",
    "٢ ـ أَنْ يَكُونَ نَكِرَةً مُضَافًا إِلَى نَكِرَةٍ: حَسَنٌ أَفْضَلُ طَالِبٍ فِي الصَّفِّ، فَاطِمَةُ أَفْضَلُ طَالِبَةٍ فِي الصَّفِّ، هُمْ أَفْضَلُ رِجَالٍ، هُنَّ أَفْضَلُ نِسَاءٍ.",
    "٣ ـ أَنْ يَكُونَ مُضَافًا إِلَى مَعْرِفَةٍ: حَسَنٌ أَفْضَلُ الطُّلَّابِ، فَاطِمَةُ أَفْضَلُ الطَّالِبَاتِ، هُمْ أَفْضَلُ (أَفَاضِلُ) الرِّجَالِ، هُنَّ أَفْضَلُ (فُضْلَيَاتُ) النِّسَاءِ.",
    "٤ ـ أَنْ يَكُونَ مَعْرِفَةً: أَحْمَدُ الطَّالِبُ الأَفْضَلُ خُلُقًا، فَاطِمَةُ الطَّالِبَةُ الفُضْلَى خُلُقًا."
  ],
  ex: [
    { type: "classify", extra: true, opts: KU, ar: "مَا اسْتِعْمَالُ اسْمِ التَّفْضِيلِ؟", tr: "Kitabın örneklerinde tafdîl hangi kullanımda? Arkasına bak: مِنْ mi, nekre mi, marife mi, kendisi ال mı aldı?", items: [
      { s: HL("حَسَنٌ أَفْضَلُ مِنْ جَمَالٍ", "أَفْضَلُ"), a: "m", why: "Arkasında مِنْ." },
      { s: HL("فَاطِمَةُ أَفْضَلُ مِنْ زَيْنَبَ", "أَفْضَلُ"), a: "m", why: "مِنْ: müennese de أَفْضَلُ." },
      { s: HL("حَسَنٌ أَفْضَلُ طَالِبٍ فِي الصَّفِّ", "أَفْضَلُ"), a: "n", why: "طَالِبٍ nekre." },
      { s: HL("فَاطِمَةُ أَفْضَلُ طَالِبَةٍ فِي الصَّفِّ", "أَفْضَلُ"), a: "n", why: "طَالِبَةٍ nekre." },
      { s: HL("هُمْ أَفْضَلُ رِجَالٍ", "أَفْضَلُ"), a: "n", why: "رِجَالٍ nekre." },
      { s: HL("حَسَنٌ أَفْضَلُ الطُّلَّابِ", "أَفْضَلُ"), a: "e", why: "الطُّلَّابِ marife." },
      { s: HL("هُنَّ فُضْلَيَاتُ النِّسَاءِ", "فُضْلَيَاتُ"), a: "e", why: "Marifeye muzâf, uyan yol seçilmiş." },
      { s: HL("هُمْ أَفَاضِلُ الرِّجَالِ", "أَفَاضِلُ"), a: "e", why: "Marifeye muzâf, uyan yol." },
      { s: HL("أَحْمَدُ الطَّالِبُ الأَفْضَلُ خُلُقًا", "الأَفْضَلُ"), a: "l", why: "Kendisi ال almış." },
      { s: HL("فَاطِمَةُ الطَّالِبَةُ الفُضْلَى خُلُقًا", "الفُضْلَى"), a: "l", why: "ال almış, müennese uymuş." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الصِّيغَةَ الصَّحِيحَةَ", tr: "Doğru biçimi seç. Önce kullanımı bul: SABİT mi, İKİ YOL mu, UYUM ŞART mı?", items: [
      P("فَاطِمَةُ ___ مِنْ زَيْنَبَ.", "أَفْضَلُ", "فُضْلَى", "الفُضْلَى", 0, "Fâtıma Zeyneb’den daha faziletli.", "1. kullanım (مِنْ): sabit أَفْضَلُ."),
      P("الطَّالِبَتَانِ ___ مِنْ أُخْتِهِمَا.", "أَفْضَلُ", "فُضْلَيَانِ", "أَفْضَلَانِ", 1, "İki öğrenci kız kardeşlerinden daha faziletli.", "مِنْ: müsennâda da أَفْضَلُ."),
      P("هُمْ ___ رِجَالٍ.", "أَفْضَلُ", "أَفَاضِلُ", "أَفْضَلُونَ", 2, "Onlar en faziletli adamlardır.", "2. kullanım (nekreye muzâf): sabit."),
      P("مَكَّةُ ___ مَدِينَةٍ.", "أَفْضَلُ", "فُضْلَى", "الفُضْلَى", 3, "Mekke en faziletli şehirdir.", "Nekreye muzâf: sabit; مَدِينَةٍ özneye uydu."),
      P("فَاطِمَةُ الطَّالِبَةُ ___ خُلُقًا.", "الفُضْلَى", "الأَفْضَلُ", "أَفْضَلُ", 4, "Fâtıma ahlâkça en faziletli öğrenci.", "4. kullanım (ال): uyum şart."),
      P("أَحْمَدُ الطَّالِبُ ___ خُلُقًا.", "الأَفْضَلُ", "الفُضْلَى", "أَفْضَلُ", 5, "Ahmed ahlâkça en faziletli öğrenci.", "ال: müzekker mevsufa uyar."),
      P("الطُّلَّابُ ___ يَجْلِسُونَ فِي الأَمَامِ.", "الأَفَاضِلُ", "الأَفْضَلُ", "أَفْضَلُ", 0, "En faziletli öğrenciler önde oturur.", "ال: çoğula uyar (الأَفْضَلُونَ da olur)."),
      P("الجَامِعَةُ ___ فِي المَدِينَةِ.", "الكُبْرَى", "الأَكْبَرُ", "أَكْبَرُ", 1, "Şehirdeki en büyük üniversite.", "ال: müennese uyar."),
      P("هُنَّ ___ النِّسَاءِ.", "أَفْضَلُ", "الفُضْلَى", "فُضْلَيَاتٍ", 2, "Onlar kadınların en faziletlileri.", "3. kullanım: أَفْضَلُ ya da فُضْلَيَاتُ; ikisi de doğru."),
      P("زَيْنَبُ ___ أَخَوَاتِهَا.", "أَكْبَرُ", "الكُبْرَى", "أَكْبَرَ", 3, "Zeyneb kız kardeşlerinin en büyüğü.", "Marifeye muzâf: أَكْبَرُ ya da كُبْرَى olur."),
      P("وَلِلهِ الأَسْمَاءُ ___.", "الحُسْنَى", "الأَحْسَنُ", "أَحْسَنُ", 4, "En güzel isimler Allah’ındır. (A’râf 180)", "ال: akılsız çoğul → tekil müennes: الحُسْنَى."),
      P("اليَدُ ___ خَيْرٌ مِنَ اليَدِ السُّفْلَى.", "العُلْيَا", "الأَعْلَى", "أَعْلَى", 5, "Üstteki el alttaki elden hayırlıdır.", "ال: اليَدُ müennes → العُلْيَا.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · YARDIMCI VE TESRİF
{
  id: "u3", no: 3, ar: "التَّفْضِيلُ المُسَاعِدُ وَالتَّصْرِيفُ", tr: "Yardımcı Tafdîl ve Tesrif", short: "Yardımcı · tesrif", col: "nasb", legend: ["mi", "nasb"],
  goals: ["Mezîd fiilde ve renk-ayıp sıfatında tafdîli yardımcı kelimeyle kurmak: أَكْثَرُ، أَشَدُّ، أَعْظَمُ + mansûb masdar", "Tafdîlin müennes, müsennâ ve cemisini söylemek: أَكْبَرُ – كُبْرَى – أَكَابِرُ – كُبَرُ"],
  examples: [
    { s: "المُؤْمِنُ:- / أَكْثَرُ:mi / إِنْفَاقًا.:nasb", tr: "Mümin daha çok infak eder. (أَنْفَقَ mezîd: أَنْفَقُ denmez)", pair: "السَّمَاءُ:- / أَشَدُّ:mi / زُرْقَةً:nasb / اليَوْمَ.:-", pairTr: "Gökyüzü bugün daha mavi. (renk: أَزْرَقُ tafdîl olmaz)" },
    { s: "هُوَ:- / أَكْثَرُ:mi / مِنْكَ:cerr / مَالًا.:nasb", tr: "O senden daha çok mal sahibi." }
  ],
  rules: [
    { tr: "Fiil <b>sülâsî değilse</b> ya da sıfat <b>renk</b> bildiriyorsa (bazı kitaplarda ayıp da) tafdîl doğrudan yapılmaz; <b>yardımcı tafdîl</b> kullanılır: <span class=\"ar\">أَكْثَرُ، أَشَدُّ، أَعْظَمُ، أَحْسَنُ…</span>" },
    { tr: "Yardımcı tafdîlden sonra fiilin <b>masdarı mansûb</b> gelir (temyiz):", ex: ["المُؤْمِنُ أَكْثَرُ إِنْفَاقًا", "السَّمَاءُ أَشَدُّ زُرْقَةً", "هُوَ أَكْثَرُ مِنْكَ مَالًا", "أَكْثَرُكُمْ عَلَيَّ صَلَاةً"] },
    { tr: "Tesrif:", ex: ["müzekker: أَكْبَرُ – أَكْبَرَانِ – أَكْبَرُونَ / أَكَابِرُ", "müennes: كُبْرَى – كُبْرَيَانِ – كُبْرَيَاتٌ / كُبَرُ"] },
    { tr: "Müennes kalıbı <b class=\"ar\">فُعْلَى</b>: <span class=\"ar\">أَفْضَلُ – فُضْلَى، أَصْغَرُ – صُغْرَى، أَحْسَنُ – حُسْنَى، أَعْلَى – عُلْيَا</span>." }
  ],
  kaide: [
    "إِذَا كَانَ الفِعْلُ غَيْرَ الثُّلَاثِيِّ أَوْ إِذَا كَانَ يَدُلُّ عَلَى لَوْنٍ يَأْتِي اسْمُ التَّفْضِيلِ بِاسْتِعْمَالِ اسْمِ التَّفْضِيلِ المُسَاعِدِ، مِثْلُ: أَكْثَرُ، وَأَعْظَمُ، وَأَشَدُّ: المُؤْمِنُ أَكْثَرُ إِنْفَاقًا، السَّمَاءُ أَشَدُّ زُرْقَةً اليَوْمَ، هُوَ أَكْثَرُ مِنْكَ مَالًا.",
    "تَصْرِيفُ اسْمِ التَّفْضِيلِ: المُذَكَّرُ: أَكْبَرُ – أَكْبَرَانِ – أَكْبَرُونَ / أَكَابِرُ. المُؤَنَّثُ: كُبْرَى – كُبْرَيَانِ – كُبْرَيَاتٌ / كُبَرُ."
  ],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "اسْتَعْمِلِ اسْمَ التَّفْضِيلِ المُسَاعِدَ", tr: "Fiil mezîd ya da sıfat renk ise yardımcı tafdîl + mansûb masdar. Doğrusunu seç.", items: [
      P("المُؤْمِنُ ___ إِنْفَاقًا.", "أَكْثَرُ", "أَنْفَقُ", "مُنْفِقٌ", 0, "Mümin daha çok infak eder.", "أَنْفَقَ mezîd: أَكْثَرُ + إِنْفَاقًا."),
      P("السَّمَاءُ ___ زُرْقَةً اليَوْمَ.", "أَشَدُّ", "أَزْرَقُ", "زَرْقَاءُ", 1, "Gökyüzü bugün daha mavi.", "Renk: أَزْرَقُ tafdîl değil; أَشَدُّ زُرْقَةً."),
      P("هُوَ ___ مِنْكَ مَالًا.", "أَكْثَرُ", "أَمْوَلُ", "كَثِيرٌ", 2, "O senden daha çok mal sahibi.", "أَكْثَرُ + temyiz مَالًا."),
      P("أَخِي ___ اجْتِهَادًا مِنِّي.", "أَكْثَرُ", "أَجْهَدُ", "مُجْتَهِدٌ", 3, "Kardeşim benden daha çalışkan.", "اجْتَهَدَ mezîd: أَكْثَرُ اجْتِهَادًا."),
      P("الثَّلْجُ ___ بَيَاضًا مِنَ القُطْنِ.", "أَشَدُّ", "أَبْيَضُ", "بَيْضَاءُ", 4, "Kar pamuktan daha beyaz.", "Renk: أَشَدُّ بَيَاضًا."),
      P("هَذَا الطَّرِيقُ ___ اسْتِقَامَةً.", "أَكْثَرُ", "أَسْتَقْوَمُ", "مُسْتَقِيمٌ", 5, "Bu yol daha düz.", "اسْتَقَامَ mezîd: أَكْثَرُ اسْتِقَامَةً."),
      P("تَكُونُ الشَّمْسُ ___ حُمْرَةً عِنْدَ الغُرُوبِ.", "أَشَدَّ", "أَحْمَرَ", "حَمْرَاءَ", 0, "Güneş batarken daha kızıl olur.", "Renk: أَشَدَّ حُمْرَةً (كَانَ'nin haberi: mansûb).")
    ]},
    { type: "pick", fill: true, extra: true, ar: "صَرِّفِ اسْمَ التَّفْضِيلِ", tr: "Tafdîlin müennesini, müsennâsını ya da cemisini seç.", items: [
      P("أَكْبَرُ ← müennes: ___", "كُبْرَى", "أَكْبَرَةٌ", "كَبِيرَةٌ", 0, "", "فُعْلَى: كُبْرَى."),
      P("أَكْبَرُ ← müsennâ: ___", "أَكْبَرَانِ", "كُبْرَيَانِ", "أَكْبَرَتَانِ", 1, "", "أَكْبَرَانِ."),
      P("أَكْبَرُ ← cemi: ___", "أَكَابِرُ", "كُبَرُ", "أَكْبَرَاتٌ", 2, "", "أَكَابِرُ ya da أَكْبَرُونَ."),
      P("كُبْرَى ← müsennâ: ___", "كُبْرَيَانِ", "كُبْرَتَانِ", "أَكْبَرَانِ", 3, "", "Elif yâya döner: كُبْرَيَانِ."),
      P("كُبْرَى ← cemi: ___", "كُبَرُ", "أَكَابِرُ", "كُبْرَاتٌ", 4, "", "كُبَرُ ya da كُبْرَيَاتٌ."),
      P("أَفْضَلُ ← müennes: ___", "فُضْلَى", "أَفْضَلَةٌ", "فَاضِلَةٌ", 5, "", "فُعْلَى: فُضْلَى."),
      P("أَصْغَرُ ← müennes: ___", "صُغْرَى", "أَصْغَرَةٌ", "صَغِيرَةٌ", 0, "", "صُغْرَى."),
      P("أَعْلَى ← müennes: ___", "عُلْيَا", "أَعْلَاةٌ", "عَالِيَةٌ", 1, "", "عُلْيَا: اليَدُ العُلْيَا."),
      P("أَحْسَنُ ← müennes: ___", "حُسْنَى", "أَحْسَنَةٌ", "حَسَنَةٌ", 2, "", "حُسْنَى: الأَسْمَاءُ الحُسْنَى."),
      P("أَفْضَلُ ← cemi: ___", "أَفَاضِلُ", "فُضَلَاءُ", "أَفْضَلَاتٌ", 3, "", "أَفَاضِلُ ya da أَفْضَلُونَ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · ÂYET, HADİS, CÜMLE
{
  id: "u4", no: 4, ar: "فِي الآيَاتِ وَالأَحَادِيثِ وَالجُمَلِ", tr: "Âyet, Hadis ve Cümlelerde", short: "Âyet · hadis", col: "ref", legend: ["mi", "cerr"],
  goals: ["Âyet ve hadislerde ism-i tafdîli bulmak", "Her birinin kullanımını söylemek", "Boşluğa anlama uygun tafdîli koymak"],
  examples: [
    { s: "إِنَّ:- / أَكْرَمَكُمْ:mi / عِنْدَ اللهِ:- / أَتْقَاكُمْ:mi", tr: "Allah katında en değerliniz, en takvalınızdır. (Hucurât 13)" },
    { s: "خَيْرُ:mi / النَّاسِ:cerr / أَنْفَعُهُمْ:mi / لِلنَّاسِ:-", tr: "İnsanların en hayırlısı, insanlara en faydalı olanıdır. (hadis)" }
  ],
  rules: [
    { tr: "Âyet ve hadislerde en sık görülen kullanım <b>marifeye muzâf</b>tır: <span class=\"ar\">أَكْرَمَكُمْ، أَتْقَاكُمْ، خَيْرُ النَّاسِ، أَحَبُّ الأَعْمَالِ</span>." },
    { tr: "Elif-lâmlı tafdîl uyar: <span class=\"ar\">الأَسْمَاءُ الحُسْنَى، اليَدُ العُلْيَا، اليَدِ السُّفْلَى</span>." },
    { tr: "Marifeye muzâf tafdîl uyan yolu da seçebilir: <span class=\"ar\">أَحَاسِنُكُمْ خُلُقًا</span> (أَحْسَنُ'ün çoğulu)." },
    { tr: "<span class=\"ar\">أَكْثَرُكُمْ عَلَيَّ صَلَاةً</span>: yardımcı tafdîl + temyiz." }
  ],
  kaide: ["ضَعْ خَطًّا تَحْتَ اسْمِ التَّفْضِيلِ.", "امْلَأِ الفَرَاغَ بِاسْمِ تَفْضِيلٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ: (أَعْدَلُ – أَسْعَدُ – أَشَدُّ – أَسْرَعُ – أَقْوَى – أَسْوَأُ – أَفْضَلُ – أَطْوَلُ)."],
  ex: [
    { type: "find", target: "y", num: "٢", ar: "ضَعْ خَطًّا تَحْتَ اسْمِ التَّفْضِيلِ", tr: "İsm-i tafdîle dokun. Çoğu cümlede iki tane var.", items: [
      W("إِنَّ [أَكْرَمَكُمْ] عِنْدَ اللهِ [أَتْقَاكُمْ]", "Allah katında en değerliniz, en takvalınızdır. (Hucurât 13)", "أَكْرَمَكُمْ، أَتْقَاكُمْ."),
      W("وَلِلهِ الأَسْمَاءُ [الحُسْنَى] فَادْعُوهُ بِهَا", "En güzel isimler Allah’ındır; O’na onlarla dua edin. (A’râf 180)", "الحُسْنَى: أَحْسَنُ'ün müennesi."),
      W("أَدْخِلُوا آلَ فِرْعَوْنَ [أَشَدَّ] العَذَابِ", "Firavun ailesini azabın en çetinine sokun. (Mü’min 46)", "أَشَدَّ."),
      W("اليَدُ [العُلْيَا] [خَيْرٌ] مِنَ اليَدِ [السُّفْلَى].", "Üstteki (veren) el, alttaki (alan) elden hayırlıdır. (Buhârî)", "العُلْيَا، خَيْرٌ، السُّفْلَى."),
      W("[خَيْرُ] النَّاسِ [أَنْفَعُهُمْ] لِلنَّاسِ.", "İnsanların en hayırlısı insanlara en faydalı olanıdır.", "خَيْرُ، أَنْفَعُهُمْ."),
      W("[أَقْرَبُكُمْ] إِلَيَّ يَوْمَ القِيَامَةِ [أَحَاسِنُكُمْ] خُلُقًا.", "Kıyamet günü bana en yakın olanınız ahlâkı en güzel olanınızdır.", "أَقْرَبُكُمْ، أَحَاسِنُكُمْ."),
      W("[أَقْرَبُكُمْ] إِلَيَّ يَوْمَ القِيَامَةِ [أَكْثَرُكُمْ] عَلَيَّ صَلَاةً.", "Kıyamet günü bana en yakın olanınız bana en çok salavat getireninizdir. (Tirmizî)", "أَقْرَبُكُمْ، أَكْثَرُكُمْ."),
      W("[أَحَبُّ] الأَعْمَالِ إِلَى اللهِ [أَدْوَمُهَا] وَإِنْ قَلَّ.", "Allah’a en sevimli amel, az da olsa devamlı olanıdır. (Buhârî, Müslim)", "أَحَبُّ، أَدْوَمُهَا.")
    ]},
    { type: "classify", num: "٢", opts: KU, ar: "مَا اسْتِعْمَالُهُ؟", tr: "Bulduğun tafdîlin kullanımı ne?", items: [
      { s: HL("إِنَّ أَكْرَمَكُمْ عِنْدَ اللهِ", "أَكْرَمَكُمْ") + SUR("Hucurât 13"), a: "e", why: "كُمْ zamirine muzâf: marife." },
      { s: HL("عِنْدَ اللهِ أَتْقَاكُمْ", "أَتْقَاكُمْ"), a: "e", why: "كُمْ zamirine muzâf." },
      { s: HL("وَلِلهِ الأَسْمَاءُ الحُسْنَى", "الحُسْنَى") + SUR("A’râf 180"), a: "l", why: "ال almış, uymuş." },
      { s: HL("أَشَدَّ العَذَابِ", "أَشَدَّ") + SUR("Mü’min 46"), a: "e", why: "العَذَابِ marife." },
      { s: HL("اليَدُ العُلْيَا", "العُلْيَا"), a: "l", why: "ال, müennes." },
      { s: HL("خَيْرٌ مِنَ اليَدِ السُّفْلَى", "خَيْرٌ"), a: "m", why: "Arkasında مِنْ." },
      { s: HL("مِنَ اليَدِ السُّفْلَى", "السُّفْلَى"), a: "l", why: "ال, müennes." },
      { s: HL("خَيْرُ النَّاسِ", "خَيْرُ"), a: "e", why: "النَّاسِ marife." },
      { s: HL("أَنْفَعُهُمْ لِلنَّاسِ", "أَنْفَعُهُمْ"), a: "e", why: "هُمْ zamirine muzâf." },
      { s: HL("أَحَاسِنُكُمْ خُلُقًا", "أَحَاسِنُكُمْ"), a: "e", why: "Marifeye muzâf; uyan yol (çoğul)." },
      { s: HL("أَكْثَرُكُمْ عَلَيَّ صَلَاةً", "أَكْثَرُكُمْ"), a: "e", why: "Marifeye muzâf + temyiz." },
      { s: HL("أَحَبُّ الأَعْمَالِ إِلَى اللهِ", "أَحَبُّ"), a: "e", why: "الأَعْمَالِ marife." }
    ]},
    { type: "bank", num: "٣", ar: "امْلَأِ الفَرَاغَ بِاسْمِ تَفْضِيلٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Önce aşağıdan bir tafdîl seç, sonra uygun boşluğa dokun. Her kelime bir kez kullanılır.",
      bank: ["أَعْدَلُ", "أَسْعَدُ", "أَشَدَّ", "أَسْرَعُ", "أَقْوَى", "أَسْوَأُ", "أَفْضَلُ", "أَطْوَلُ"], items: [
      { pre: "الطَّالِبُ المُجْتَهِدُ", h: "مِنَ الطَّالِبِ الكَسُولِ.", a: [1, 6], tr: "Çalışkan öğrenci tembel öğrenciden daha mutludur." },
      { pre: "القِطَارُ", h: "مِنَ السَّيَّارَةِ.", a: [3], tr: "Tren arabadan daha hızlıdır." },
      { pre: "الأَسَدُ", h: "الحَيَوَانَاتِ.", a: [4], tr: "Aslan hayvanların en güçlüsüdür." },
      { pre: "قِيزِلْ إِرْمَاقْ", h: "نَهْرٍ فِي تُرْكِيَا.", a: [7], tr: "Kızılırmak Türkiye’nin en uzun nehridir." },
      { pre: "تَكُونُ الشَّمْسُ", h: "حُمْرَةً عِنْدَ الغُرُوبِ.", a: [2], tr: "Güneş batarken daha kızıl olur." },
      { pre: "عُمَرُ", h: "الأُمَرَاءِ.", a: [0], tr: "Ömer emirlerin en âdilidir." },
      { pre: "الطَّالِبُ النَّاجِحُ", h: "طَالِبٍ فِي الصَّفِّ.", a: [6, 1], tr: "Başarılı öğrenci sınıfın en iyi öğrencisidir." },
      { pre: "الكَذِبُ", h: "طَبْعٍ.", a: [5], tr: "Yalan en kötü huydur." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: العُطْلَةُ الصَّيْفِيَّةُ", tr: "Okuma: Yaz Tatili", short: "Okuma", col: "muz", legend: ["mi", "cerr"],
  goals: ["Metinde ism-i tafdîli bulup kullanımını söylemek", "Tafdîli ism-i mekândan, mübalağadan, sıfat-ı müşebbeheden ve tasğirden ayırmak"],
  examples: [
    { s: "جَوُّ القَرْيَةِ:- / أَجْمَلُ:mi / مِنْ جَوِّ المَدِينَةِ.:cerr", tr: "Köyün havası şehrin havasından daha güzeldir." },
    { s: "وَهِيَ:- / أَوْسَعُ:mi / حَدِيقَةٍ:cerr / فِي القَرْيَةِ.:-", tr: "O, köydeki en geniş bahçedir." }
  ],
  rules: [
    { tr: "Tafdîl: <span class=\"ar\">أَجْمَلُ مِنْ، أَعْذَبُ مِنْ</span> (1), <span class=\"ar\">أَوْسَعُ حَدِيقَةٍ</span> (2), <span class=\"ar\">أَكْبَرِ المَنَازِلِ</span> (3)." },
    { tr: "İsm-i mekân: <span class=\"ar\">مَنْزِلِ، مَصَانِعِهَا</span>. Mübalağa: <span class=\"ar\">الجَذَّابِ</span>. Sıfat-ı müşebbehe: <span class=\"ar\">بَعِيدًا، الصَّغِيرِ، كَبِيرٌ</span>. Tasğir: <span class=\"ar\">نُهَيْرٌ</span>." }
  ],
  kaide: ["اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ: اسْمَ التَّفْضِيلِ، اسْمَ المَكَانِ، صِيغَةَ المُبَالَغَةِ، الصِّفَةَ المُشَبَّهَةَ، اسْمَ التَّصْغِيرِ."],
  ex: [
    { type: "reading", num: "٤", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ", tr: "Metni oku; sonra koyu kelimenin ne olduğunu ve tafdîlin kullanımını seç.", title: "العُطْلَةُ الصَّيْفِيَّةُ",
      text: "فِي كُلِّ عُطْلَةٍ صَيْفِيَّةٍ أُسَافِرُ مَعَ أُسْرَتِي إِلَى مَنْزِلِ جَدِّي فِي القَرْيَةِ؛ لِأَنَّ جَوَّ القَرْيَةِ أَجْمَلُ مِنْ جَوِّ المَدِينَةِ، وَمَاؤُهَا أَعْذَبُ مِنْ مِيَاهِ المَدِينَةِ. الإِنْسَانُ يَعِيشُ فِي القَرْيَةِ بَعِيدًا عَنْ ضَوْضَاءِ المَدِينَةِ وَضَجِيجِ مَصَانِعِهَا، وَكَذَلِكَ يَتَمَتَّعُ الإِنْسَانُ فِي القَرْيَةِ بِجَمَالِ الطَّبِيعَةِ الجَذَّابِ. هَذِهِ القَرْيَةُ عَلَى مَسَافَةِ مِئَةِ كِيلُومِتْرٍ مِنَ المَدِينَةِ، وَبِجَانِبِهَا غَابَةٌ وَاسِعَةٌ، وَيَجْرِي نُهَيْرٌ فِي وَادِيهَا الصَّغِيرِ. مَنْزِلُ جَدِّي كَبِيرٌ وَفِيهِ سَبْعُ غُرَفٍ، وَهُوَ مِنْ أَكْبَرِ المَنَازِلِ فِي القَرْيَةِ، وَحَوْلَ المَنْزِلِ حَدِيقَةٌ وَاسِعَةٌ، وَهِيَ أَوْسَعُ حَدِيقَةٍ فِي القَرْيَةِ. وَنَقْضِي فِي القَرْيَةِ عِشْرِينَ يَوْمًا ثُمَّ نَرْجِعُ إِلَى مَنْزِلِنَا فِي المَدِينَةِ.",
      textTr: "Yaz Tatili. Her yaz tatilinde ailemle birlikte köydeki dedemin evine giderim; çünkü köyün havası şehrin havasından daha güzel, suyu da şehrin sularından daha tatlıdır. İnsan köyde şehrin gürültüsünden ve fabrikalarının patırtısından uzak yaşar; ayrıca köyde tabiatın çekici güzelliğinin tadını çıkarır. Bu köy şehirden yüz kilometre uzaklıktadır; yanında geniş bir orman var, küçük vadisinde de bir dere akar. Dedemin evi büyüktür, yedi odası var; köyün en büyük evlerindendir. Evin etrafında geniş bir bahçe var; o da köyün en geniş bahçesidir. Köyde yirmi gün geçirip sonra şehirdeki evimize döneriz.",
      qa: [
        { q: "إِلَى أَيْنَ يُسَافِرُ الكَاتِبُ فِي العُطْلَةِ الصَّيْفِيَّةِ؟", a: "يُسَافِرُ إِلَى مَنْزِلِ جَدِّهِ فِي القَرْيَةِ.", tr: "Yazar yaz tatilinde nereye gider? Köydeki dedesinin evine." },
        { q: "لِمَاذَا يُفَضِّلُ القَرْيَةَ عَلَى المَدِينَةِ؟", a: "لِأَنَّ جَوَّهَا أَجْمَلُ مِنْ جَوِّ المَدِينَةِ، وَمَاءَهَا أَعْذَبُ.", tr: "Köyü neden şehre tercih ediyor? Havası daha güzel, suyu daha tatlı olduğu için." },
        { q: "كَمْ يَوْمًا يَقْضُونَ فِي القَرْيَةِ؟", a: "يَقْضُونَ عِشْرِينَ يَوْمًا.", tr: "Köyde kaç gün geçiriyorlar? Yirmi gün." }
      ],
      cls: { opts: [["t", "İsm-i tafdîl", "اسْمُ تَفْضِيلٍ", "mi"], ["m", "İsm-i mekân", "اسْمُ مَكَانٍ", "cerr"], ["b", "Mübalağa", "صِيغَةُ مُبَالَغَةٍ", "nasb"], ["s", "Sıfat-ı müşebbehe", "صِفَةٌ مُشَبَّهَةٌ", "mz"], ["z", "Tasğir", "اسْمُ تَصْغِيرٍ", "mun"], ["x", "Hiçbiri", "لَيْسَ مِنْهَا", "x"]], ar: "اسْتَخْرِجْ مِنَ النَّصِّ", tr: "Koyu kelime ne?", items: [
        { s: HL("أُسَافِرُ مَعَ أُسْرَتِي إِلَى مَنْزِلِ جَدِّي", "مَنْزِلِ"), a: "m", why: "نَزَلَ – يَنْزِلُ → مَنْزِلٌ." },
        { s: HL("جَوَّ القَرْيَةِ أَجْمَلُ مِنْ جَوِّ المَدِينَةِ", "أَجْمَلُ"), a: "t", why: "جَمِيلٌ → أَجْمَلُ." },
        { s: HL("وَمَاؤُهَا أَعْذَبُ مِنْ مِيَاهِ المَدِينَةِ", "أَعْذَبُ"), a: "t", why: "عَذْبٌ → أَعْذَبُ." },
        { s: HL("يَعِيشُ فِي القَرْيَةِ بَعِيدًا", "بَعِيدًا"), a: "s", why: "بَعُدَ → بَعِيدٌ: فَعِيلٌ." },
        { s: HL("وَضَجِيجِ مَصَانِعِهَا", "مَصَانِعِهَا"), a: "m", why: "مَصْنَعٌ'ün çoğulu." },
        { s: HL("بِجَمَالِ الطَّبِيعَةِ الجَذَّابِ", "الجَذَّابِ"), a: "b", why: "جَذَبَ → جَذَّابٌ: فَعَّالٌ." },
        { s: HL("فِي كُلِّ عُطْلَةٍ صَيْفِيَّةٍ", "صَيْفِيَّةٍ"), a: "x", why: "İsm-i mensûb." },
        { s: HL("وَيَجْرِي نُهَيْرٌ فِي وَادِيهَا", "نُهَيْرٌ"), a: "z", why: "نَهْرٌ → نُهَيْرٌ." },
        { s: HL("فِي وَادِيهَا الصَّغِيرِ", "الصَّغِيرِ"), a: "s", why: "صَغُرَ → صَغِيرٌ." },
        { s: HL("مَنْزِلُ جَدِّي كَبِيرٌ", "كَبِيرٌ"), a: "s", why: "كَبُرَ → كَبِيرٌ." },
        { s: HL("وَهُوَ مِنْ أَكْبَرِ المَنَازِلِ", "أَكْبَرِ"), a: "t", why: "كَبِيرٌ → أَكْبَرُ." },
        { s: HL("وَهِيَ أَوْسَعُ حَدِيقَةٍ فِي القَرْيَةِ", "أَوْسَعُ"), a: "t", why: "وَاسِعٌ → أَوْسَعُ." }
      ]},
      cls2: { opts: KU, ar: "مَا اسْتِعْمَالُ اسْمِ التَّفْضِيلِ؟", tr: "Metindeki tafdîlin kullanımı ne?", items: [
        { s: HL("أَجْمَلُ مِنْ جَوِّ المَدِينَةِ", "أَجْمَلُ"), a: "m", why: "Arkasında مِنْ." },
        { s: HL("أَعْذَبُ مِنْ مِيَاهِ المَدِينَةِ", "أَعْذَبُ"), a: "m", why: "Arkasında مِنْ." },
        { s: HL("مِنْ أَكْبَرِ المَنَازِلِ", "أَكْبَرِ"), a: "e", why: "المَنَازِلِ marife." },
        { s: HL("أَوْسَعُ حَدِيقَةٍ فِي القَرْيَةِ", "أَوْسَعُ"), a: "n", why: "حَدِيقَةٍ nekre; أَوْسَعُ sabit (müennes حَدِيقَةٌ için de)." }
      ]}
    }
  ]
}
];

// Doğru Biçim oyunu: [cümle {kelime}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var TF_POOL = [
  ["الوَلَدُ {أَكْبَرُ} مِنْ أَخِيهِ.", ["أَكْبَرُ", "كُبْرَى", "كَبِيرٌ"], "nekre + مِنْ", "Çocuk kardeşinden daha büyük.", "u1"],
  ["هَذَا الدَّرْسُ {أَسْهَلُ} مِنْ ذَلِكَ.", ["أَسْهَلُ", "سَهْلٌ", "سُهْلَى"], "أَفْعَلُ", "Bu ders ötekinden daha kolay.", "u1"],
  ["الحَدِيدُ {أَشَدُّ} مِنَ الخَشَبِ.", ["أَشَدُّ", "أَشْدَدُ", "شَدِيدٌ"], "muzâaf: idğam", "Demir tahtadan daha sert.", "u1"],
  ["العَسَلُ {أَحْلَى} مِنَ السُّكَّرِ.", ["أَحْلَى", "أَحْلَوُ", "حُلْوٌ"], "nâkıs: elif-i maksûre", "Bal şekerden daha tatlı.", "u1"],
  ["هُوَ {خَيْرٌ} مِنْكَ.", ["خَيْرٌ", "أَخْيَرُ", "خَيِّرٌ"], "hemzesiz tafdîl", "O senden daha hayırlı.", "u1"],
  ["فَاطِمَةُ {أَفْضَلُ} مِنْ زَيْنَبَ.", ["أَفْضَلُ", "فُضْلَى", "الفُضْلَى"], "1: sabit", "Fâtıma Zeyneb’den daha faziletli.", "u2"],
  ["فَاطِمَةُ {أَفْضَلُ} طَالِبَةٍ فِي الصَّفِّ.", ["أَفْضَلُ", "فُضْلَى", "الفُضْلَى"], "2: sabit", "Fâtıma sınıfın en faziletli öğrencisi.", "u2"],
  ["هُمْ {أَفْضَلُ} رِجَالٍ.", ["أَفْضَلُ", "أَفَاضِلُ", "أَفْضَلُونَ"], "2: sabit", "Onlar en faziletli adamlar.", "u2"],
  ["فَاطِمَةُ الطَّالِبَةُ {الفُضْلَى} خُلُقًا.", ["الفُضْلَى", "الأَفْضَلُ", "أَفْضَلُ"], "4: uyum şart", "Fâtıma ahlâkça en faziletli öğrenci.", "u2"],
  ["أَحْمَدُ الطَّالِبُ {الأَفْضَلُ} خُلُقًا.", ["الأَفْضَلُ", "الفُضْلَى", "أَفْضَلُ"], "4: uyum şart", "Ahmed ahlâkça en faziletli öğrenci.", "u2"],
  ["المُؤْمِنُ {أَكْثَرُ} إِنْفَاقًا.", ["أَكْثَرُ", "أَنْفَقُ", "مُنْفِقٌ"], "mezîd: yardımcı", "Mümin daha çok infak eder.", "u3"],
  ["السَّمَاءُ {أَشَدُّ} زُرْقَةً اليَوْمَ.", ["أَشَدُّ", "أَزْرَقُ", "زَرْقَاءُ"], "renk: yardımcı", "Gökyüzü bugün daha mavi.", "u3"],
  ["هِيَ {الكُبْرَى} فِي أَخَوَاتِهَا.", ["الكُبْرَى", "الأَكْبَرُ", "أَكْبَرُ"], "ال: müennes", "O, kız kardeşlerinin en büyüğü.", "u3"],
  ["هُمْ {أَكَابِرُ} القَوْمِ.", ["أَكَابِرُ", "كُبَرُ", "كُبْرَى"], "marifeye muzâf, uyan yol", "Onlar kavmin ileri gelenleri.", "u3"],
  ["إِنَّ {أَكْرَمَكُمْ} عِنْدَ اللهِ أَتْقَاكُمْ", ["أَكْرَمَكُمْ", "كَرِيمَكُمْ", "أَكْرَمُكُمْ"], "Hucurât 13: إِنَّ'nin ismi", "Allah katında en değerliniz…", "u4"],
  ["وَلِلهِ الأَسْمَاءُ {الحُسْنَى}", ["الحُسْنَى", "الأَحْسَنُ", "الحَسَنَةُ"], "A’râf 180", "En güzel isimler Allah’ındır.", "u4"],
  ["اليَدُ {العُلْيَا} خَيْرٌ مِنَ اليَدِ السُّفْلَى.", ["العُلْيَا", "الأَعْلَى", "العَالِيَةُ"], "ال: müennes", "Veren el alan elden hayırlıdır.", "u4"],
  ["القِطَارُ {أَسْرَعُ} مِنَ السَّيَّارَةِ.", ["أَسْرَعُ", "سَرِيعٌ", "سُرْعَى"], "1: sabit", "Tren arabadan daha hızlı.", "u4"],
  ["الكَذِبُ {أَسْوَأُ} طَبْعٍ.", ["أَسْوَأُ", "سَيِّئٌ", "سُوأَى"], "2: sabit", "Yalan en kötü huy.", "u4"],
  ["جَوُّ القَرْيَةِ {أَجْمَلُ} مِنْ جَوِّ المَدِينَةِ.", ["أَجْمَلُ", "جَمِيلٌ", "جُمْلَى"], "1", "Köyün havası şehrinkinden güzel.", "u5"],
  ["مَاؤُهَا {أَعْذَبُ} مِنْ مِيَاهِ المَدِينَةِ.", ["أَعْذَبُ", "عَذْبٌ", "عُذْبَى"], "1", "Suyu şehrin sularından tatlı.", "u5"],
  ["هِيَ {أَوْسَعُ} حَدِيقَةٍ فِي القَرْيَةِ.", ["أَوْسَعُ", "وُسْعَى", "الوُسْعَى"], "2: sabit", "Köyün en geniş bahçesi.", "u5"],
  ["هُوَ مِنْ {أَكْبَرِ} المَنَازِلِ.", ["أَكْبَرِ", "أَكْبَرَ", "كَبِيرِ"], "3: mecrûr", "Evlerin en büyüklerinden.", "u5"]
];
// Hangi kullanım? [ifade, kullanım, açıklama]
var KU_LIST = [
  [HL("أَحْمَدُ أَطْوَلُ مِنْ خَالِدٍ", "أَطْوَلُ"), "m", "مِنْ"], [HL("القِطَارُ أَسْرَعُ مِنَ السَّيَّارَةِ", "أَسْرَعُ"), "m", "مِنْ"], [HL("هُوَ خَيْرٌ مِنْكَ", "خَيْرٌ"), "m", "مِنْ"], [HL("العَسَلُ أَحْلَى مِنَ السُّكَّرِ", "أَحْلَى"), "m", "مِنْ"],
  [HL("الكَذِبُ أَسْوَأُ طَبْعٍ", "أَسْوَأُ"), "n", "nekre"], [HL("هِيَ أَوْسَعُ حَدِيقَةٍ", "أَوْسَعُ"), "n", "nekre"], [HL("مَكَّةُ أَفْضَلُ مَدِينَةٍ", "أَفْضَلُ"), "n", "nekre"], [HL("هُنَّ أَفْضَلُ نِسَاءٍ", "أَفْضَلُ"), "n", "nekre"],
  [HL("عُمَرُ أَعْدَلُ الأُمَرَاءِ", "أَعْدَلُ"), "e", "marife"], [HL("خَيْرُ النَّاسِ", "خَيْرُ"), "e", "marife"], [HL("إِنَّ أَكْرَمَكُمْ", "أَكْرَمَكُمْ"), "e", "zamir: marife"], [HL("أَحَبُّ الأَعْمَالِ", "أَحَبُّ"), "e", "marife"], [HL("أَشَدَّ العَذَابِ", "أَشَدَّ"), "e", "marife"],
  [HL("الأَسْمَاءُ الحُسْنَى", "الحُسْنَى"), "l", "ال"], [HL("اليَدُ العُلْيَا", "العُلْيَا"), "l", "ال"], [HL("الطَّالِبُ الأَفْضَلُ", "الأَفْضَلُ"), "l", "ال"], [HL("الجَامِعَةُ الكُبْرَى", "الكُبْرَى"), "l", "ال"], [HL("المَسْجِدُ الأَقْصَى", "الأَقْصَى"), "l", "ال"]
];
// Doğru mu yanlış mı? [ifade, d/y, açıklama]
var DY_LIST = [
  ["فَاطِمَةُ أَفْضَلُ مِنْ زَيْنَبَ", "d", "مِنْ: sabit"], ["فَاطِمَةُ فُضْلَى مِنْ زَيْنَبَ", "y", "مِنْ ile daima أَفْضَلُ"], ["الطَّالِبَةُ الفُضْلَى", "d", "ال: uyum"], ["الطَّالِبَةُ الأَفْضَلُ", "y", "ال: müennes → الفُضْلَى"],
  ["هُمْ أَفْضَلُ رِجَالٍ", "d", "nekreye muzâf: sabit"], ["هُمْ أَفَاضِلُ رِجَالٍ", "y", "nekreye muzâf: sabit kalmalı"], ["هُنَّ فُضْلَيَاتُ النِّسَاءِ", "d", "marifeye muzâf: uyan yol"], ["هُنَّ أَفْضَلُ النِّسَاءِ", "d", "marifeye muzâf: sabit yol"],
  ["السَّمَاءُ أَزْرَقُ مِنَ البَحْرِ", "y", "renk: أَشَدُّ زُرْقَةً"], ["السَّمَاءُ أَشَدُّ زُرْقَةً", "d", "yardımcı tafdîl"], ["المُؤْمِنُ أَنْفَقُ مِنْ غَيْرِهِ", "y", "mezîd: أَكْثَرُ إِنْفَاقًا"], ["المُؤْمِنُ أَكْثَرُ إِنْفَاقًا", "d", "yardımcı tafdîl"],
  ["الطُّلَّابُ الأَفَاضِلُ", "d", "ال: çoğula uyum"], ["الطُّلَّابُ الأَفْضَلُ", "y", "ال: الأَفَاضِلُ olmalı"], ["الأَسْمَاءُ الحُسْنَى", "d", "akılsız çoğul: tekil müennes"], ["الأَسْمَاءُ الأَحْسَنُ", "y", "ال: الحُسْنَى olmalı"],
  ["هُوَ خَيْرٌ مِنْكَ", "d", "hemzesiz tafdîl"], ["هُوَ أَخْيَرُ مِنْكَ", "y", "خَيْرٌ hemzesiz kullanılır"], ["اليَدُ العُلْيَا", "d", "ال: müennes"], ["اليَدُ الأَعْلَى", "y", "ال: العُلْيَا olmalı"],
  ["زَيْنَبُ أَكْبَرُ أَخَوَاتِهَا", "d", "marifeye muzâf: sabit yol"], ["زَيْنَبُ كُبْرَى مِنْ أُخْتِهَا", "y", "مِنْ ile daima أَكْبَرُ"], ["هُوَ أَشْدَدُ مِنْكَ", "y", "muzâaf: أَشَدُّ"], ["هُوَ أَشَدُّ مِنْكَ", "d", "idğam"],
  ["فَاطِمَةُ أَفْضَلُ طَالِبَةٍ", "d", "nekreye muzâf: sabit"], ["فَاطِمَةُ فُضْلَى طَالِبَةٍ", "y", "nekreye muzâf: sabit kalmalı"]
];
var HAFIZA = {
  st: { name: "Sıfat ↔ tafdîl", pairs: [["كَبِيرٌ", "أَكْبَرُ"], ["شَدِيدٌ", "أَشَدُّ"], ["قَوِيٌّ", "أَقْوَى"], ["قَلِيلٌ", "أَقَلُّ"], ["وَاسِعٌ", "أَوْسَعُ"], ["حُلْوٌ", "أَحْلَى"], ["عَالِمٌ", "أَعْلَمُ"]] },
  mm: { name: "Müzekker ↔ müennes", pairs: [["أَكْبَرُ", "كُبْرَى"], ["أَفْضَلُ", "فُضْلَى"], ["أَصْغَرُ", "صُغْرَى"], ["أَحْسَنُ", "حُسْنَى"], ["أَعْلَى", "عُلْيَا"], ["أَسْفَلُ", "سُفْلَى"], ["أَعْظَمُ", "عُظْمَى"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["أَكْبَرُ مِنْ", "-den daha büyük"], ["أَفْضَلُ طَالِبٍ", "en iyi öğrenci"], ["أَفْضَلُ الطُّلَّابِ", "öğrencilerin en iyisi"], ["الأَسْمَاءُ الحُسْنَى", "en güzel isimler"], ["أَشَدُّ زُرْقَةً", "daha mavi"], ["أَكْثَرُ إِنْفَاقًا", "daha çok infak eden"], ["خَيْرٌ مِنْ", "-den daha hayırlı"]] }
};
var KARTLAR = [
  ["İsm-i tafdîl nedir?", "Ortak bir sıfatta birinin ötekinden üstün olduğunu bildiren isim: \"daha …, en …\""],
  ["Vezni?", "أَفْعَلُ (gayr-ı munsarif): أَكْبَرُ، أَصْغَرُ"],
  ["Hemzesiz iki tafdîl?", "خَيْرٌ ve شَرٌّ"],
  ["Muzâaf ve nâkısta?", "أَشَدُّ، أَقَلُّ (idğam) · أَعْلَى، أَقْوَى (elif-i maksûre)"],
  ["1. kullanım: nekre + مِنْ", "SABİT: فَاطِمَةُ أَفْضَلُ مِنْ زَيْنَبَ"],
  ["2. kullanım: nekreye muzâf", "SABİT: فَاطِمَةُ أَفْضَلُ طَالِبَةٍ"],
  ["3. kullanım: marifeye muzâf", "İKİ YOL: هُنَّ أَفْضَلُ / فُضْلَيَاتُ النِّسَاءِ"],
  ["4. kullanım: elif-lâmlı", "UYUM ŞART: الطَّالِبَةُ الفُضْلَى"],
  ["Mezîd fiil ve renkte?", "Yardımcı tafdîl + mansûb masdar: أَكْثَرُ إِنْفَاقًا، أَشَدُّ زُرْقَةً"],
  ["أَكْبَرُ'ün tesrifi?", "أَكْبَرُ – أَكْبَرَانِ – أَكْبَرُونَ / أَكَابِرُ"],
  ["كُبْرَى'nın tesrifi?", "كُبْرَى – كُبْرَيَانِ – كُبْرَيَاتٌ / كُبَرُ"],
  ["أَحْمَرُ tafdîl mi?", "Hayır: renk sıfatı (أَحْمَرُ – حَمْرَاءُ). \"Daha kırmızı\": أَشَدُّ حُمْرَةً"]
];
