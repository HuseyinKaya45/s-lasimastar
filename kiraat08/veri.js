// ================= VERİ: Kıraat 8 — مِنْ أَفْضَلِ الأَشْخَاصِ فِي حَيَاتِي =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الشَّخْصُ", tr: "Kişi" }, nasb: { ar: "الصِّفَةُ الخَلْقِيَّةُ", tr: "Dış görünüş" }, cerr: { ar: "الصِّفَةُ الخُلُقِيَّةُ", tr: "Ahlak" },
  mi: { ar: "اللَّوْنُ", tr: "Renk" }, ref: { ar: "أَدَاةُ الاسْتِفْهَامِ", tr: "Soru edatı" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var KIM = [["r", "Rağad", "رَغَدُ", "mun"], ["m", "Murâd", "مُرَادٌ", "muz"]];
var HK = [["h", "Dış görünüş", "صِفَةٌ خَلْقِيَّةٌ", "nasb"], ["k", "Ahlak", "صِفَةٌ خُلُقِيَّةٌ", "cerr"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", r: "Rağad", m: "Murâd" };

// Renk makinesi: [eril, dişil, Türkçe, renk kodu, eril kalıbı mı (أَفْعَلُ)]
var RENK = [
  ["أَبْيَضُ", "بَيْضَاءُ", "beyaz", "#FFFFFF", 1], ["أَسْوَدُ", "سَوْدَاءُ", "siyah", "#1B1B1B", 1], ["أَحْمَرُ", "حَمْرَاءُ", "kırmızı", "#D7263D", 1], ["أَخْضَرُ", "خَضْرَاءُ", "yeşil", "#2E9E4F", 1],
  ["أَصْفَرُ", "صَفْرَاءُ", "sarı", "#F4C430", 1], ["أَزْرَقُ", "زَرْقَاءُ", "mavi", "#2F6FD6", 1],
  ["بُنِّيٌّ", "بُنِّيَّةٌ", "kahverengi", "#7B4A26", 0], ["رَمَادِيٌّ", "رَمَادِيَّةٌ", "gri", "#8E8E8E", 0], ["فِضِّيٌّ", "فِضِّيَّةٌ", "gümüş rengi", "#C0C0C0", 0], ["ذَهَبِيٌّ", "ذَهَبِيَّةٌ", "altın rengi", "#D4A017", 0],
  ["بُرْتُقَالِيٌّ", "بُرْتُقَالِيَّةٌ", "turuncu", "#F28C28", 0], ["زَهْرِيٌّ / وَرْدِيٌّ", "زَهْرِيَّةٌ / وَرْدِيَّةٌ", "pembe", "#F49AC2", 0], ["كُحْلِيٌّ", "كُحْلِيَّةٌ", "lacivert", "#1F2A55", 0]
];
// Kitaptaki tabloda verilen hücreler: [renk, 0 eril / 1 dişil]
var RENK_VERILEN = [[0, 1], [1, 1], [6, 1], [7, 1]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
// 9. tablo: verilmeyen dişil hücreler
var RENK_YANLIS = { 2: ["أَحْمَرَةٌ", "حَمْرِيَّةٌ"], 3: ["أَخْضَرَةٌ", "خَضْرِيَّةٌ"], 4: ["أَصْفَرَةٌ", "صُفْرِيَّةٌ"], 5: ["أَزْرَقَةٌ", "زُرْقِيَّةٌ"], 8: ["فَضْيَاءُ", "فِضَّةٌ"], 9: ["ذَهْبَاءُ", "ذَهَبٌ"], 10: ["بُرْتُقَالَةٌ", "بَرْتَقَاءُ"], 11: ["زَهْرَاءُ / وَرْدَاءُ", "زَهْرٌ / وَرْدٌ"], 12: ["كَحْلَاءُ", "كُحْلٌ"] };
function RENK_TABLO() {
  var out = [];
  RENK.forEach(function (r, i) {
    var ds = RENK_YANLIS[i]; if (!ds) return;
    out.push(["المُذَكَّرُ: " + r[0] + " ← المُؤَنَّثُ: ___", r[1], ds[0], ds[1], r[2] + " (eril → dişil)", r[4] ? "أَفْعَلُ ← فَعْلَاءُ" : "ـِيٌّ ← ـِيَّةٌ (nispet yâsı + tâ)"]);
  });
  return PL(out);
}

var METIN = "أَنَا كَرِيمٌ، أُرِيدُ أَنْ أُحَدِّثَكُمُ اليَوْمَ عَنْ شَخْصَيْنِ أُحِبُّهُمَا كَثِيرًا، الشَّخْصُ الأَوَّلُ هُوَ أُخْتِي رَغَدُ، هِيَ بِنْتٌ رَائِعَةٌ حَقًّا، عُمْرُهَا خَمْسَ عَشْرَةَ سَنَةً، هِيَ لَيْسَتْ طَوِيلَةً وَلَيْسَتْ قَصِيرَةً، شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ، وَعَيْنَاهَا عَسَلِيَّتَانِ، وَزْنُهَا تَقْرِيبًا خَمْسَةٌ وَسِتُّونَ كِيلُوغْرَامًا." +
  "<br>رَغَدُ فَتَاةٌ لَطِيفَةٌ وَمَحْبُوبَةٌ جِدًّا، وَهِيَ طَالِبَةٌ مُجْتَهِدَةٌ فِي صَفِّهَا وَهَادِئَةٌ. رَغَدُ تُحِبُّ النَّظَافَةَ كَثِيرًا، فَهِيَ مُرَتَّبَةٌ وَمُنَظَّمَةٌ، وَتُحِبُّ أَنْ يَكُونَ بَيْتُهَا نَظِيفًا دَائِمًا، وَهِيَ تُسَاعِدُ أُمَّهَا دَائِمًا عِنْدَمَا تَرْجِعُ مِنَ المَدْرَسَةِ أَوْ فِي أَيَّامِ العُطْلَةِ، وَفِي يَوْمِ العُطْلَةِ تَكْوِي رَغَدُ مَلَابِسَهَا وَتُرَتِّبُ غُرْفَتَهَا أَيْضًا." +
  "<br>وَالشَّخْصُ الثَّانِي الَّذِي سَأَصِفُهُ لَكُمْ هُوَ صَدِيقِي المُفَضَّلُ مُرَادٌ. هُوَ مُهَنْدِسٌ فِي الثَّلَاثِينَ مِنْ عُمُرِهِ، وَهُوَ إِنْسَانٌ مُتَوَاضِعٌ يُحِبُّ الخَيْرَ لِكُلِّ النَّاسِ وَيُسَاعِدُ الفُقَرَاءَ وَالمُحْتَاجِينَ، وَهُوَ ذُو أَخْلَاقٍ طَيِّبَةٍ، وَهُوَ عَادِلٌ وَمُنْصِفٌ، لَا يُحِبُّ الظُّلْمَ وَلَا الظَّالِمِينَ." +
  "<br>مُرَادٌ مُتَوَسِّطُ الطُّولِ، وَهُوَ لَيْسَ سَمِينًا، وَلَيْسَ نَحِيفًا، لَكِنَّهُ مُمْتَلِئٌ، بَشَرَتُهُ سَمْرَاءُ، وَلَهُ عَيْنَانِ بُنِّيَّتَانِ، شَعْرُهُ بُنِّيٌّ أَمْلَسُ، هُوَ لَا يُحِبُّ الشَّعْرَ الطَّوِيلَ أَبَدًا." +
  "<br>يُفَضِّلُ مُرَادٌ الأَسْوَدَ وَالأَبْيَضَ وَالأَزْرَقَ مِنَ الأَلْوَانِ، هُوَ شَابٌّ أَنِيقٌ، يَذْهَبُ إِلَى عَمَلِهِ بِمَلَابِسَ رَسْمِيَّةٍ دَائِمًا، وَعِنْدَمَا نَلْتَقِي بَعْدَ العَمَلِ يَلْبَسُ مَلَابِسَ رِيَاضِيَّةً بَيْضَاءَ وَسَوْدَاءَ، أَوْ مَلَابِسَ وَاسِعَةً.";
var METIN_TR = "Ben Kerîm; bugün size çok sevdiğim iki kişiden bahsetmek istiyorum. Birincisi kız kardeşim Rağad; gerçekten harika bir kız. On beş yaşında; ne uzun ne kısa. Saçı kahverengi ve kıvırcık, gözleri bal rengi, kilosu yaklaşık altmış beş." +
  "<br>Rağad nazik ve çok sevilen bir kızdır; sınıfında çalışkan ve sakin bir öğrencidir. Temizliği çok sever; derli toplu ve düzenlidir, evinin hep temiz olmasını ister. Okuldan dönünce ya da tatil günlerinde annesine hep yardım eder; tatil gününde elbiselerini ütüler ve odasını da toplar." +
  "<br>Size anlatacağım ikinci kişi en sevdiğim arkadaşım Murâd. Otuz yaşında bir mühendis; herkesin iyiliğini isteyen, fakirlere ve muhtaçlara yardım eden alçakgönüllü bir insan. Güzel ahlaklıdır; adil ve hakkaniyetlidir, zulmü ve zalimleri sevmez." +
  "<br>Murâd orta boyludur; ne şişman ne zayıf, ama dolgun yapılı. Teni esmer, gözleri kahverengi, saçı kahverengi ve düz; uzun saçı hiç sevmez." +
  "<br>Renklerden siyahı, beyazı ve maviyi tercih eder; şık bir gençtir. İşine hep resmî kıyafetle gider; iş çıkışı buluştuğumuzda beyaz-siyah spor kıyafetler ya da bol kıyafetler giyer.";
var SOZLUK = [["أُحَدِّثُكُمْ عَنْ", "size … anlatırım"], ["مُجَعَّدٌ", "kıvırcık"], ["عَسَلِيٌّ", "bal rengi"], ["وَزْنٌ", "kilo, ağırlık"], ["مَحْبُوبَةٌ", "sevilen"], ["مُجْتَهِدَةٌ", "çalışkan"], ["مُرَتَّبَةٌ وَمُنَظَّمَةٌ", "derli toplu, düzenli"], ["تَكْوِي", "ütüler"], ["سَأَصِفُهُ", "onu anlatacağım"], ["مُتَوَاضِعٌ", "alçakgönüllü"], ["ذُو أَخْلَاقٍ طَيِّبَةٍ", "güzel ahlak sahibi"], ["عَادِلٌ وَمُنْصِفٌ", "adil ve hakkaniyetli"], ["الظُّلْمُ", "zulüm"], ["مُتَوَسِّطُ الطُّولِ", "orta boylu"], ["نَحِيفٌ / سَمِينٌ / مُمْتَلِئٌ", "zayıf / şişman / dolgun"], ["بَشَرَةٌ سَمْرَاءُ", "esmer ten"], ["أَمْلَسُ", "düz (saç)"], ["أَنِيقٌ", "şık"], ["مَلَابِسُ رَسْمِيَّةٌ", "resmî kıyafet"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendini düşünmek: bugün ne giydin, renkleri ne; uzun musun", "Kerîm’in kız kardeşi Rağad’ı ve arkadaşı Murâd’ı anlattığı metni durmadan okumak", "Kişiyi dış görünüşü ve ahlakıyla anlatan kelimeleri öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "رَغَدُ:mz / شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ،:nasb / وَهِيَ مُجْتَهِدَةٌ وَهَادِئَةٌ.:cerr", tr: "Rağad’ın saçı kahverengi ve kıvırcık; çalışkan ve sakindir.", pair: "مُرَادٌ:mz / مُتَوَسِّطُ الطُّولِ،:nasb / وَهُوَ مُتَوَاضِعٌ.:cerr", pairTr: "Murâd orta boylu ve alçakgönüllüdür." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> Kerîm sevdiği iki kişiyi anlatıyor: 15 yaşındaki kız kardeşi <span class=\"ar\">رَغَدُ</span> ve 30 yaşındaki mühendis arkadaşı <span class=\"ar\">مُرَادٌ</span>; önce dış görünüşleri (<span class=\"ar\">الصِّفَاتُ الخَلْقِيَّةُ</span>), sonra ahlakları (<span class=\"ar\">الصِّفَاتُ الخُلُقِيَّةُ</span>)." },
    { tr: "<b>Kişi tasvir kalıpları:</b><br>• <span class=\"ar\">عُمْرُهَا… سَنَةً · وَزْنُهَا… كِيلُوغْرَامًا</span> yaşı · kilosu<br>• <span class=\"ar\">لَيْسَتْ طَوِيلَةً وَلَيْسَتْ قَصِيرَةً · مُتَوَسِّطُ الطُّولِ</span> ne uzun ne kısa · orta boylu<br>• <span class=\"ar\">شَعْرُهُ… · عَيْنَاهَا… · بَشَرَتُهُ…</span> saçı · gözleri · teni<br>• <span class=\"ar\">هُوَ ذُو أَخْلَاقٍ طَيِّبَةٍ</span> güzel ahlaklıdır" },
    { tr: "<b>خَلْقِيَّةٌ – خُلُقِيَّةٌ:</b> <span class=\"ar\">خَلْقٌ</span> yaratılış, dış görünüş (boy, saç, göz); <span class=\"ar\">خُلُقٌ</span> ahlak, huy (çalışkan, sakin, adil)." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَاذَا تَلْبَسُ / تَلْبَسِينَ اليَوْمَ؟ وَمَا أَلْوَانُ مَلَابِسِكَ؟ هَلْ أَنْتَ سَمِينٌ / سَمِينَةٌ؟ هَلْ أَنْتَ طَوِيلٌ / طَوِيلَةٌ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "مِنْ أَفْضَلِ الأَشْخَاصِ فِي حَيَاتِي", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَاذَا تَلْبَسُ / تَلْبَسِينَ اليَوْمَ؟ وَمَا أَلْوَانُ مَلَابِسِكَ؟", a: "أَلْبَسُ قَمِيصًا أَبْيَضَ وَبِنْطَالًا أَزْرَقَ.", tr: "Bugün ne giydin, kıyafetlerinin rengi ne? (Örnek) Beyaz bir gömlek ve mavi bir pantolon giydim." },
        { q: "هَلْ أَنْتَ سَمِينٌ / سَمِينَةٌ؟", a: "لَا، أَنَا لَسْتُ سَمِينًا، أَنَا نَحِيفٌ.", tr: "Şişman mısın? Hayır, şişman değilim, zayıfım." },
        { q: "هَلْ أَنْتَ طَوِيلٌ / طَوِيلَةٌ؟", a: "أَنَا مُتَوَسِّطُ الطُّولِ.", tr: "Uzun musun? Orta boyluyum." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "رَغَدُ أُخْتُ كَرِيمٍ.", a: "d", why: "الشَّخْصُ الأَوَّلُ هُوَ أُخْتِي رَغَدُ." },
        { s: "عُمْرُ رَغَدَ عِشْرُونَ سَنَةً.", a: "y", why: "On beş: خَمْسَ عَشْرَةَ سَنَةً." },
        { s: "شَعْرُ رَغَدَ بُنِّيٌّ مُجَعَّدٌ.", a: "d", why: "Metinde aynen geçer." },
        { s: "عَيْنَا رَغَدَ زَرْقَاوَانِ.", a: "y", why: "Bal rengi: عَسَلِيَّتَانِ." },
        { s: "تُحِبُّ رَغَدُ النَّظَافَةَ كَثِيرًا.", a: "d", why: "رَغَدُ تُحِبُّ النَّظَافَةَ كَثِيرًا." },
        { s: "تَكْوِي رَغَدُ مَلَابِسَهَا فِي يَوْمِ العُطْلَةِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "مُرَادٌ طَبِيبٌ.", a: "y", why: "Mühendis: هُوَ مُهَنْدِسٌ." },
        { s: "مُرَادٌ فِي الثَّلَاثِينَ مِنْ عُمُرِهِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "مُرَادٌ مُتَكَبِّرٌ.", a: "y", why: "Alçakgönüllü: مُتَوَاضِعٌ." },
        { s: "بَشَرَةُ مُرَادٍ سَمْرَاءُ.", a: "d", why: "بَشَرَتُهُ سَمْرَاءُ." },
        { s: "يُفَضِّلُ مُرَادٌ اللَّوْنَ الأَحْمَرَ.", a: "y", why: "Siyah, beyaz ve maviyi tercih eder." },
        { s: "يَذْهَبُ مُرَادٌ إِلَى عَمَلِهِ بِمَلَابِسَ رِيَاضِيَّةٍ.", a: "y", why: "Resmî kıyafetle gider; spor kıyafeti iş çıkışı giyer." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("أُرِيدُ أَنْ أُحَدِّثَكُمُ اليَوْمَ", "أُحَدِّثَكُمُ"), "size anlatmak", "sizi görmek", "sizi davet etmek", "Bugün size anlatmak istiyorum.", "حَدَّثَ عَنْ: … hakkında anlattı."],
      [HL("شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ", "مُجَعَّدٌ"), "kıvırcık", "düz", "uzun", "Saçı kahverengi ve kıvırcık.", "Zıddı: أَمْلَسُ."],
      [HL("وَعَيْنَاهَا عَسَلِيَّتَانِ", "عَسَلِيَّتَانِ"), "bal rengi", "mavi", "siyah", "Gözleri bal rengi.", "عَسَلٌ: bal."],
      [HL("وَزْنُهَا تَقْرِيبًا خَمْسَةٌ وَسِتُّونَ", "وَزْنُهَا"), "kilosu", "boyu", "yaşı", "Kilosu yaklaşık 65.", ""],
      [HL("فَهِيَ مُرَتَّبَةٌ وَمُنَظَّمَةٌ", "مُرَتَّبَةٌ"), "derli toplu", "dağınık", "yorgun", "Derli toplu ve düzenli.", "= مُنَظَّمَةٌ"],
      [HL("تَكْوِي رَغَدُ مَلَابِسَهَا", "تَكْوِي"), "ütüler", "yıkar", "satın alır", "Rağad elbiselerini ütüler.", "مِكْوَاةٌ: ütü."],
      [HL("هُوَ إِنْسَانٌ مُتَوَاضِعٌ", "مُتَوَاضِعٌ"), "alçakgönüllü", "kibirli", "zengin", "O alçakgönüllü bir insan.", "Zıddı: مُتَكَبِّرٌ."],
      [HL("وَهُوَ عَادِلٌ وَمُنْصِفٌ", "عَادِلٌ"), "adil", "zalim", "cömert", "O adil ve hakkaniyetlidir.", "Zıddı: ظَالِمٌ."],
      [HL("لَا يُحِبُّ الظُّلْمَ", "الظُّلْمَ"), "zulüm", "yalan", "tembellik", "Zulmü sevmez.", "ظَالِمٌ: zalim."],
      [HL("لَكِنَّهُ مُمْتَلِئٌ", "مُمْتَلِئٌ"), "dolgun", "çok zayıf", "uzun", "Ama dolgun yapılı.", "Ne şişman ne zayıf."],
      [HL("بَشَرَتُهُ سَمْرَاءُ", "بَشَرَتُهُ"), "teni", "saçı", "gözü", "Teni esmer.", "سَمْرَاءُ: esmer (dişil); eril: أَسْمَرُ."],
      [HL("هُوَ شَابٌّ أَنِيقٌ", "أَنِيقٌ"), "şık", "yaşlı", "tembel", "O şık bir genç.", "أَنَاقَةٌ: şıklık."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama: Rağad ve Murâd", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "(أ) ile (ب) sütunlarını eşleştirmek", "Bir özelliğin Rağad’a mı Murâd’a mı ait olduğunu bilmek"],
  examples: [
    { s: "مَا صِفَاتُ:- / رَغَدَ:mz / الخُلُقِيَّةُ؟:cerr", tr: "Rağad’ın ahlaki özellikleri neler?", pair: "لَطِيفَةٌ، مَحْبُوبَةٌ، مُجْتَهِدَةٌ، هَادِئَةٌ، مُرَتَّبَةٌ:cerr", pairTr: "Nazik, sevilen, çalışkan, sakin, düzenli." }
  ],
  rules: [
    { tr: "<b>Rağad:</b> 15 yaşında · ne uzun ne kısa · saçı kahverengi kıvırcık · gözleri bal rengi · 65 kilo · nazik, sevilen, çalışkan, sakin, temiz, düzenli · annesine yardım eder, elbiselerini ütüler, odasını toplar." },
    { tr: "<b>Murâd:</b> 30 yaşında mühendis · orta boylu, ne şişman ne zayıf, dolgun · esmer · gözleri kahverengi · saçı kahverengi düz; uzun saçı sevmez · alçakgönüllü, iyiliksever, adil · siyah, beyaz ve maviyi sever · işe resmî, iş çıkışı spor ya da bol kıyafet giyer." },
    { tr: "<b>Dikkat:</b> 3. etkinlikteki <span class=\"ar\">يَذْهَبُ مُرَادٌ إِلَى الحَلَّاقِ كُلَّ أُسْبُوعَيْنِ</span> (iki haftada bir berbere gider) bilgisi metinde yok; ancak uzun saçı sevmemesiyle uyumludur." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: كَمْ عُمْرُ رَغَدَ؟ مَا صِفَاتُ رَغَدَ الخُلُقِيَّةُ؟ مَتَى تُسَاعِدُ رَغَدُ أُمَّهَا؟ مَا صِفَاتُ مُرَادٍ الخُلُقِيَّةُ؟ مَا الأَلْوَانُ المُفَضَّلَةُ عِنْدَ مُرَادٍ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ العِبَارَاتِ الآتِيَةِ. ٣ ـ صِلْ بَيْنَ (أ) وَمَا يُنَاسِبُهَا فِي (ب)."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["كَمْ عُمْرُ رَغَدَ؟", "عُمْرُهَا خَمْسَ عَشْرَةَ سَنَةً.", "عُمْرُهَا ثَلَاثُونَ سَنَةً.", "عُمْرُهَا خَمْسٌ وَسِتُّونَ سَنَةً.", "Rağad kaç yaşında? 15.", "65 kilosu; 30 Murâd’ın yaşı."],
      ["مَا صِفَاتُ رَغَدَ الخُلُقِيَّةُ؟", "لَطِيفَةٌ، مَحْبُوبَةٌ، مُجْتَهِدَةٌ، هَادِئَةٌ، مُرَتَّبَةٌ.", "طَوِيلَةٌ وَسَمِينَةٌ.", "شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ.", "Rağad’ın ahlaki özellikleri? Nazik, sevilen, çalışkan, sakin, düzenli.", "Diğerleri dış görünüş (خَلْقِيَّةٌ)."],
      ["مَتَى تُسَاعِدُ رَغَدُ أُمَّهَا؟", "عِنْدَمَا تَرْجِعُ مِنَ المَدْرَسَةِ أَوْ فِي أَيَّامِ العُطْلَةِ.", "فِي الصَّبَاحِ قَبْلَ المَدْرَسَةِ فَقَطْ.", "لَا تُسَاعِدُ أُمَّهَا.", "Annesine ne zaman yardım eder? Okuldan dönünce ya da tatilde.", ""],
      ["مَا صِفَاتُ مُرَادٍ الخُلُقِيَّةُ؟", "مُتَوَاضِعٌ، يُحِبُّ الخَيْرَ، عَادِلٌ وَمُنْصِفٌ.", "مُتَوَسِّطُ الطُّولِ وَمُمْتَلِئٌ.", "بَشَرَتُهُ سَمْرَاءُ.", "Murâd’ın ahlaki özellikleri? Alçakgönüllü, iyiliksever, adil.", "Diğerleri dış görünüş."],
      ["مَا الأَلْوَانُ المُفَضَّلَةُ عِنْدَ مُرَادٍ؟", "الأَسْوَدُ وَالأَبْيَضُ وَالأَزْرَقُ.", "الأَحْمَرُ وَالأَخْضَرُ.", "البُنِّيُّ وَالرَّمَادِيُّ.", "Murâd’ın sevdiği renkler? Siyah, beyaz, mavi.", ""]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ العِبَارَاتِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["رَغَدُ بِنْتٌ لَطِيفَةٌ وَمَحْبُوبَةٌ.", "d", "رَغَدُ فَتَاةٌ لَطِيفَةٌ وَمَحْبُوبَةٌ جِدًّا."],
      ["رَغَدُ طَالِبَةٌ كَسُولَةٌ.", "y", "Çalışkan: طَالِبَةٌ مُجْتَهِدَةٌ."],
      ["مُرَادٌ شَابٌّ أَسْمَرُ طَوِيلٌ.", "y", "Esmer ama orta boylu: مُتَوَسِّطُ الطُّولِ."],
      ["مُرَادٌ نَحِيفٌ.", "y", "Ne şişman ne zayıf, dolgun: مُمْتَلِئٌ."],
      ["مُرَادٌ يُحِبُّ الشَّعْرَ الطَّوِيلَ.", "y", "Uzun saçı hiç sevmez: لَا يُحِبُّ الشَّعْرَ الطَّوِيلَ أَبَدًا."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["رَغَدُ طَالِبَةٌ كَسُولَةٌ. ✗", "رَغَدُ طَالِبَةٌ مُجْتَهِدَةٌ.", "رَغَدُ طَالِبَةٌ جَدِيدَةٌ.", "رَغَدُ لَيْسَتْ طَالِبَةً.", "Rağad çalışkan bir öğrenci.", "كَسُولَةٌ ≠ مُجْتَهِدَةٌ"],
      ["مُرَادٌ شَابٌّ أَسْمَرُ طَوِيلٌ. ✗", "مُرَادٌ شَابٌّ أَسْمَرُ مُتَوَسِّطُ الطُّولِ.", "مُرَادٌ شَابٌّ أَبْيَضُ قَصِيرٌ.", "مُرَادٌ شَابٌّ أَسْمَرُ قَصِيرٌ جِدًّا.", "Murâd esmer, orta boylu bir genç.", ""],
      ["مُرَادٌ نَحِيفٌ. ✗", "مُرَادٌ مُمْتَلِئٌ، لَيْسَ سَمِينًا وَلَا نَحِيفًا.", "مُرَادٌ سَمِينٌ جِدًّا.", "مُرَادٌ طَوِيلٌ وَنَحِيفٌ.", "Murâd dolgun; ne şişman ne zayıf.", ""],
      ["مُرَادٌ يُحِبُّ الشَّعْرَ الطَّوِيلَ. ✗", "مُرَادٌ لَا يُحِبُّ الشَّعْرَ الطَّوِيلَ أَبَدًا.", "مُرَادٌ يُحِبُّ الشَّعْرَ المُجَعَّدَ.", "مُرَادٌ لَا شَعْرَ لَهُ.", "Murâd uzun saçı hiç sevmez.", ""]
    ])},
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ (أ) وَمَا يُنَاسِبُهَا فِي (ب)", tr: "Önce aşağıdan (ب) devamı seç, sonra (أ) cümle başının kutusuna dokun.", bank: ["مَلَابِسَ رِيَاضِيَّةً بَيْضَاءَ وَسَوْدَاءَ", "كُلَّ أُسْبُوعَيْنِ", "مُسَاعَدَةَ الآخَرِينَ", "بِمَلَابِسَ رَسْمِيَّةٍ دَائِمًا", "بُنِّيٌّ مُجَعَّدٌ", "عِنْدَمَا تَرْجِعُ مِنَ المَدْرَسَةِ"], items: [
      { pre: "شَعْرُ رَغَدَ", a: [4], tr: "Rağad’ın saçı kahverengi ve kıvırcık." }, { pre: "تُحِبُّ رَغَدُ", a: [2], tr: "Rağad başkalarına yardım etmeyi sever." }, { pre: "تُسَاعِدُ رَغَدُ أُمَّهَا دَائِمًا", a: [5], tr: "Rağad okuldan dönünce annesine hep yardım eder." },
      { pre: "يَذْهَبُ مُرَادٌ إِلَى الحَلَّاقِ", a: [1], tr: "Murâd iki haftada bir berbere gider." }, { pre: "يَذْهَبُ مُرَادٌ إِلَى عَمَلِهِ", a: [3], tr: "Murâd işine hep resmî kıyafetle gider." }, { pre: "يَلْبَسُ مُرَادٌ بَعْدَ العَمَلِ", a: [0], tr: "Murâd iş çıkışı beyaz-siyah spor kıyafet giyer." }
    ]},
    { type: "classify", extra: true, opts: KIM, ar: "مَنْ هَذَا؟ رَغَدُ أَمْ مُرَادٌ؟", tr: "Bu özellik Rağad’a mı, Murâd’a mı ait?", items: CL([
      ["عُمْرُهَا خَمْسَ عَشْرَةَ سَنَةً.", "r", "Rağad 15 yaşında."], ["هُوَ مُهَنْدِسٌ.", "m", "Murâd mühendis."], ["شَعْرُهُ بُنِّيٌّ أَمْلَسُ.", "m", "Murâd’ın saçı düz."], ["شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ.", "r", "Rağad’ın saçı kıvırcık."],
      ["عَيْنَاهَا عَسَلِيَّتَانِ.", "r", "Bal rengi gözler Rağad’ın."], ["لَهُ عَيْنَانِ بُنِّيَّتَانِ.", "m", "Kahverengi gözler Murâd’ın."], ["تَكْوِي مَلَابِسَهَا.", "r", "Rağad ütü yapar."], ["يُسَاعِدُ الفُقَرَاءَ وَالمُحْتَاجِينَ.", "m", "Murâd."],
      ["بَشَرَتُهُ سَمْرَاءُ.", "m", "Murâd esmer."], ["تُحِبُّ النَّظَافَةَ كَثِيرًا.", "r", "Rağad."], ["لَا يُحِبُّ الظُّلْمَ.", "m", "Murâd adil."], ["طَالِبَةٌ مُجْتَهِدَةٌ فِي صَفِّهَا.", "r", "Rağad."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ: الصِّفَاتُ", tr: "Kelimeler: Sıfatlar, Eş ve Zıt Anlam", short: "Sıfatlar", col: "mi", legend: ["nasb", "cerr"],
  goals: ["Kelimeleri eş anlamlılarıyla eşleştirmek", "Sıfatları zıt anlamlılarıyla eşleştirmek", "Dış görünüş ile ahlak sıfatlarını ayırmak", "Sıfatları doğru cümlede kullanmak"],
  examples: [
    { s: "طَوِيلٌ:nasb.Kelime / ≠ قَصِيرٌ:cerr.Zıt", tr: "uzun ≠ kısa", pair: "كَرِيمٌ:nasb.Kelime / ≠ بَخِيلٌ:cerr.Zıt", pairTr: "cömert ≠ cimri" },
    { s: "مُنَظَّمٌ:nasb.Kelime / = مُرَتَّبٌ:cerr.Eş", tr: "düzenli = derli toplu", pair: "هَادِئٌ:nasb.Kelime / = سَاكِنٌ:cerr.Eş", pairTr: "sakin = durgun, sakin" }
  ],
  rules: [
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">مُنَظَّمٌ = مُرَتَّبٌ · يَرْجِعُ = يَعُودُ · فَتَاةٌ = شَابَّةٌ · زَمِيلٌ = صَدِيقٌ · أَنِيقٌ = ظَرِيفٌ · هَادِئٌ = سَاكِنٌ</span>" },
    { tr: "<b>Zıt anlam:</b> <span class=\"ar\">طَوِيلٌ ≠ قَصِيرٌ · أُحِبُّ ≠ أَكْرَهُ · ذَكِيٌّ ≠ غَبِيٌّ · سَمِينٌ ≠ نَحِيفٌ · أَمْلَسُ ≠ مُجَعَّدٌ · مُجْتَهِدٌ ≠ كَسُولٌ · كَرِيمٌ ≠ بَخِيلٌ · أَصْغَرُ ≠ أَكْبَرُ</span>" },
    { tr: "<b>Sıfat isme uyar:</b> <span class=\"ar\">وَلَدٌ طَوِيلٌ ← بِنْتٌ طَوِيلَةٌ · طَالِبٌ مُجْتَهِدٌ ← طَالِبَةٌ مُجْتَهِدَةٌ</span>. Olumsuz: <span class=\"ar\">لَيْسَ طَوِيلًا · لَيْسَتْ قَصِيرَةً</span> (لَيْسَ’in haberi mansûb)." }
  ],
  kaide: ["٤ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي. ٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي.", "٧ ـ اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ: هَادِئَةٌ، ذَكِيٌّ، نَحِيفٌ، رَسْمِيَّةٌ."],
  ex: [
    { type: "bank", num: "٤", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["شَابَّةٌ", "صَدِيقٌ", "مُرَتَّبٌ", "ظَرِيفٌ", "سَاكِنٌ", "يَعُودُ"], items: [
      { pre: "مُنَظَّمٌ =", a: [2], tr: "düzenli = derli toplu" }, { pre: "يَرْجِعُ =", a: [5], tr: "döner = döner" }, { pre: "فَتَاةٌ =", a: [0], tr: "genç kız = genç kadın" }, { pre: "زَمِيلٌ =", a: [1], tr: "arkadaş (iş/okul) = arkadaş" }, { pre: "أَنِيقٌ =", a: [3], tr: "şık = zarif" }, { pre: "هَادِئٌ =", a: [4], tr: "sakin = sakin" }
    ]},
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["نَحِيفٌ", "قَصِيرٌ", "مُجَعَّدٌ", "أَكْبَرُ", "كَسُولٌ", "غَبِيٌّ", "أَكْرَهُ", "بَخِيلٌ"], items: [
      { pre: "طَوِيلٌ ≠", a: [1], tr: "uzun ≠ kısa" }, { pre: "أُحِبُّ ≠", a: [6], tr: "severim ≠ sevmem" }, { pre: "ذَكِيٌّ ≠", a: [5], tr: "zeki ≠ aptal" }, { pre: "سَمِينٌ ≠", a: [0], tr: "şişman ≠ zayıf" },
      { pre: "أَمْلَسُ ≠", a: [2], tr: "düz ≠ kıvırcık" }, { pre: "مُجْتَهِدٌ ≠", a: [4], tr: "çalışkan ≠ tembel" }, { pre: "كَرِيمٌ ≠", a: [7], tr: "cömert ≠ cimri" }, { pre: "أَصْغَرُ ≠", a: [3], tr: "daha küçük ≠ daha büyük" }
    ]},
    { type: "classify", extra: true, opts: HK, ar: "صِفَةٌ خَلْقِيَّةٌ أَمْ خُلُقِيَّةٌ؟", tr: "Bu sıfat dış görünüşü mü, ahlakı mı anlatıyor?", items: CL([
      ["طَوِيلٌ", "h", "Boy: dış görünüş."], ["مُجَعَّدُ الشَّعْرِ", "h", "Saç: dış görünüş."], ["أَسْمَرُ", "h", "Ten: dış görünüş."], ["سَمِينٌ", "h", "Kilo: dış görünüş."], ["عَسَلِيُّ العَيْنَيْنِ", "h", "Göz: dış görünüş."], ["أَنِيقٌ", "h", "Giyim: dış görünüş."],
      ["مُتَوَاضِعٌ", "k", "Ahlak."], ["عَادِلٌ", "k", "Ahlak."], ["مُجْتَهِدٌ", "k", "Huy, ahlak."], ["لَطِيفٌ", "k", "Ahlak."], ["كَرِيمٌ", "k", "Ahlak."], ["مُرَتَّبٌ وَمُنَظَّمٌ", "k", "Huy."]
    ]) },
    { type: "pick", num: "٧", ar: "اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ", tr: "Kelimeyi doğru kullanan cümleyi seç; sonra defterine kendi cümleni yaz.", items: PL([
      ["هَادِئَةٌ", "أُخْتِي بِنْتٌ هَادِئَةٌ، لَا تَتَكَلَّمُ كَثِيرًا.", "أَخِي وَلَدٌ هَادِئَةٌ.", "أَكَلْتُ هَادِئَةً لَذِيذَةً.", "Kız kardeşim sakin bir kız, çok konuşmaz.", "Dişil isimle dişil sıfat: بِنْتٌ هَادِئَةٌ."],
      ["ذَكِيٌّ", "صَدِيقِي طَالِبٌ ذَكِيٌّ يَفْهَمُ الدَّرْسَ بِسُرْعَةٍ.", "شَرِبْتُ ذَكِيًّا.", "هَذِهِ بِنْتٌ ذَكِيٌّ.", "Arkadaşım dersi çabuk anlayan zeki bir öğrenci.", "Bint için ذَكِيَّةٌ olur."],
      ["نَحِيفٌ", "أَخِي الصَّغِيرُ نَحِيفٌ، لَا يَأْكُلُ كَثِيرًا.", "البَيْتُ نَحِيفٌ وَأَنِيقٌ.", "قَرَأْتُ كِتَابًا نَحِيفًا عَنِ الظُّلْمِ.", "Küçük kardeşim zayıf, çok yemez.", "نَحِيفٌ insan için kullanılır."],
      ["رَسْمِيَّةٌ", "يَلْبَسُ مُرَادٌ مَلَابِسَ رَسْمِيَّةً فِي العَمَلِ.", "رَغَدُ رَسْمِيَّةٌ فِي صَفِّهَا.", "أَكَلْنَا رَسْمِيَّةً.", "Murâd işte resmî kıyafet giyer.", "مَلَابِسُ رَسْمِيَّةٌ: resmî kıyafet."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · RENKLER
{
  id: "u4", no: 4, ar: "الأَلْوَانُ: المُذَكَّرُ وَالمُؤَنَّثُ", tr: "Renkler: Eril ve Dişil", short: "Renkler", col: "ref", legend: ["mi", "nasb"],
  goals: ["Renklerin eril ve dişil biçimlerini bilmek", "أَفْعَلُ ← فَعْلَاءُ kalıbını tanımak: أَحْمَرُ ← حَمْرَاءُ", "ـِيٌّ ← ـِيَّةٌ kalıbını tanımak: بُنِّيٌّ ← بُنِّيَّةٌ", "Kıyafetin ve kişinin rengini anlatmak"],
  examples: [
    { s: "قَمِيصٌ:nasb.Eril isim / أَحْمَرُ:mi.Eril renk", tr: "kırmızı bir gömlek", pair: "سَيَّارَةٌ:nasb.Dişil isim / حَمْرَاءُ:mi.Dişil renk", pairTr: "kırmızı bir araba" },
    { s: "شَعْرٌ:nasb / بُنِّيٌّ:mi", tr: "kahverengi saç", pair: "عَيْنٌ:nasb / بُنِّيَّةٌ:mi", pairTr: "kahverengi göz" }
  ],
  rules: [
    { tr: "<b>Ana renkler (أَفْعَلُ ← فَعْلَاءُ):</b> <span class=\"ar\">أَبْيَضُ ← بَيْضَاءُ · أَسْوَدُ ← سَوْدَاءُ · أَحْمَرُ ← حَمْرَاءُ · أَخْضَرُ ← خَضْرَاءُ · أَصْفَرُ ← صَفْرَاءُ · أَزْرَقُ ← زَرْقَاءُ</span>. Aynı kalıp: <span class=\"ar\">أَسْمَرُ ← سَمْرَاءُ</span> (esmer). Bunlar gayr-i munsariftir: tenvin almaz." },
    { tr: "<b>Nispet renkleri (ـِيٌّ ← ـِيَّةٌ):</b> <span class=\"ar\">بُنِّيٌّ ← بُنِّيَّةٌ · رَمَادِيٌّ ← رَمَادِيَّةٌ · فِضِّيٌّ ← فِضِّيَّةٌ · ذَهَبِيٌّ ← ذَهَبِيَّةٌ · بُرْتُقَالِيٌّ ← بُرْتُقَالِيَّةٌ · زَهْرِيٌّ / وَرْدِيٌّ ← زَهْرِيَّةٌ / وَرْدِيَّةٌ · كُحْلِيٌّ ← كُحْلِيَّةٌ</span>." },
    { tr: "<b>Renk sıfattır, isme uyar:</b> <span class=\"ar\">قَمِيصٌ أَبْيَضُ · سَيَّارَةٌ بَيْضَاءُ</span>. Akılsız çoğul dişil tekil sayılır: <span class=\"ar\">مَلَابِسُ بَيْضَاءُ وَسَوْدَاءُ</span> (metinde: <span class=\"ar\">مَلَابِسَ رِيَاضِيَّةً بَيْضَاءَ وَسَوْدَاءَ</span>)." },
    { tr: "<b>Kıyafetler:</b> <span class=\"ar\">قَمِيصٌ</span> gömlek · <span class=\"ar\">بِنْطَالٌ</span> pantolon · <span class=\"ar\">فُسْتَانٌ</span> elbise · <span class=\"ar\">حِجَابٌ</span> başörtüsü · <span class=\"ar\">ثَوْبٌ</span> uzun entari · <span class=\"ar\">قُبَّعَةٌ</span> şapka · <span class=\"ar\">حِذَاءٌ</span> ayakkabı · <span class=\"ar\">حَقِيبَةٌ</span> çanta." }
  ],
  kaide: ["٨ ـ انْظُرْ إِلَى الصُّوَرِ الآتِيَةِ، وَصِفْ أَلْوَانَ المَلَابِسِ، وَالأَشْخَاصَ.", "٩ ـ تَدْرِيبٌ عَامٌّ: لَاحِظِ المُؤَنَّثَ مِنَ الأَلْوَانِ كَمَا فِي المِثَالِ، ثُمَّ امْلَإِ الفَرَاغَاتِ بِالتَّأْنِيثِ: أَبْيَضُ ← بَيْضَاءُ، أَسْوَدُ ← سَوْدَاءُ، بُنِّيٌّ ← بُنِّيَّةٌ، رَمَادِيٌّ ← رَمَادِيَّةٌ."],
  ex: [
    { type: "pick", fill: true, num: "٩", ar: "لَاحِظِ المُؤَنَّثَ مِنَ الأَلْوَانِ، ثُمَّ امْلَإِ الفَرَاغَاتِ بِالتَّأْنِيثِ", tr: "Rengin dişil biçimini seç. (بَيْضَاءُ، سَوْدَاءُ، بُنِّيَّةٌ، رَمَادِيَّةٌ kitapta verilmiş.)", exHtml: '<span class="ar">أَبْيَضُ ← بَيْضَاءُ · أَسْوَدُ ← سَوْدَاءُ · بُنِّيٌّ ← بُنِّيَّةٌ · رَمَادِيٌّ ← رَمَادِيَّةٌ</span>', items: RENK_TABLO() },
    { type: "pick", fill: true, num: "٨", ar: "صِفْ أَلْوَانَ المَلَابِسِ وَالأَشْخَاصَ", tr: "Kıyafetin rengini isme uygun (eril / dişil) biçimde seç. (Kitaptaki fotoğraflar yerine renk işaretleri.)", items: PL([
      ["🟦 يَلْبَسُ الشَّابُّ قَمِيصًا ___.", "أَزْرَقَ", "زَرْقَاءَ", "أَزْرَقِيًّا", "Genç mavi bir gömlek giyiyor.", "قَمِيصٌ eril ← أَزْرَقُ (mansûb: أَزْرَقَ, tenvinsiz)."],
      ["⬜ وَبِنْطَالًا ___.", "أَبْيَضَ", "بَيْضَاءَ", "أَبْيَضِيًّا", "Ve beyaz bir pantolon.", "بِنْطَالٌ eril."],
      ["⬛ تَلْبَسُ الأُمُّ عَبَاءَةً ___.", "سَوْدَاءَ", "أَسْوَدَ", "سَوْدَاوِيَّةً", "Anne siyah bir abaya giyiyor.", "عَبَاءَةٌ dişil ← سَوْدَاءُ."],
      ["🟨 وَعَلَى رَأْسِ البِنْتِ حِجَابٌ ___.", "أَصْفَرُ", "صَفْرَاءُ", "صُفْرٌ", "Kızın başında sarı bir başörtüsü var.", "حِجَابٌ eril."],
      ["🟥 تَلْبَسُ أُخْتِي سُتْرَةً ___.", "حَمْرَاءَ", "أَحْمَرَ", "حُمْرًا", "Kız kardeşim kırmızı bir ceket giyiyor.", "سُتْرَةٌ dişil."],
      ["⬜ يَلْبَسُ الرَّجُلُ ثَوْبًا ___ طَوِيلًا.", "أَبْيَضَ", "بَيْضَاءَ", "بِيضًا", "Adam uzun beyaz bir entari giyiyor.", ""],
      ["🟫 حَقِيبَةُ البِنْتِ ___.", "بُنِّيَّةٌ", "بُنِّيٌّ", "بَنَّاءُ", "Kızın çantası kahverengi.", "حَقِيبَةٌ dişil ← بُنِّيَّةٌ."],
      ["🩷 فُسْتَانُ الطِّفْلَةِ ___.", "زَهْرِيٌّ", "زَهْرِيَّةٌ", "زَهْرَاءُ", "Kız çocuğunun elbisesi pembe.", "فُسْتَانٌ eril."],
      ["🩶 قُبَّعَةُ الشَّابِّ ___.", "رَمَادِيَّةٌ", "رَمَادِيٌّ", "رَمْدَاءُ", "Gencin şapkası gri.", "قُبَّعَةٌ dişil."],
      ["🟫 بَشَرَةُ مُرَادٍ ___.", "سَمْرَاءُ", "أَسْمَرُ", "سُمْرٌ", "Murâd’ın teni esmer.", "بَشَرَةٌ dişil ← سَمْرَاءُ; Murâd için: مُرَادٌ أَسْمَرُ."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "أَكْمِلْ بِاللَّوْنِ المُنَاسِبِ", tr: "Doğadaki rengi bul ve isme uydur.", items: PL([
      ["السَّمَاءُ ___ .", "زَرْقَاءُ", "أَزْرَقُ", "خَضْرَاءُ", "Gök mavidir.", "سَمَاءٌ dişil."],
      ["العُشْبُ ___ .", "أَخْضَرُ", "خَضْرَاءُ", "أَصْفَرُ", "Çimen yeşildir.", "عُشْبٌ eril."],
      ["الثَّلْجُ ___ .", "أَبْيَضُ", "بَيْضَاءُ", "أَسْوَدُ", "Kar beyazdır.", ""],
      ["الشَّمْسُ ___ .", "صَفْرَاءُ", "أَصْفَرُ", "زَرْقَاءُ", "Güneş sarıdır.", "شَمْسٌ semâî dişil."],
      ["البُرْتُقَالَةُ ___ .", "بُرْتُقَالِيَّةٌ", "بُرْتُقَالِيٌّ", "حَمْرَاءُ", "Portakal turuncudur.", ""],
      ["الخَاتَمُ ___ .", "ذَهَبِيٌّ", "ذَهَبِيَّةٌ", "زَرْقَاءُ", "Yüzük altın rengidir.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · SORU VE YAPILAR
{
  id: "u5", no: 5, ar: "أَسْمَاءُ الاسْتِفْهَامِ وَالتَّرَاكِيبُ", tr: "Soru Edatları ve Kalıplar", short: "Soru", col: "muz", legend: ["ref", "nasb"],
  goals: ["Soru edatlarını ve ne için kullanıldıklarını bilmek: مَنْ، مَا، مَاذَا، كَيْفَ، مَتَى، أَيْنَ، كَمْ، هَلْ", "Cümleye uygun soru edatını seçmek", "أُرِيدُ أَنْ…، لَا يُحِبُّ…، يُفَضِّلُ… مِنْ… kalıplarını kullanmak", "Kendini ve bir arkadaşını Arapça anlatmak"],
  examples: [
    { s: "أَيْنَ:ref.Mekân / تَقَعُ اليَمَنُ؟:-", tr: "Yemen nerededir?", pair: "مَتَى:ref.Zaman / تَبْدَأُ المُحَاضَرَةُ؟:-", pairTr: "Ders ne zaman başlıyor?" },
    { s: "يُفَضِّلُ مُرَادٌ:- / مِنَ الأَلْوَانِ:nasb / الأَسْوَدَ وَالأَبْيَضَ.:-", tr: "Murâd renklerden siyahı ve beyazı tercih eder." }
  ],
  rules: [
    { tr: "<b>Dikkat et (لَاحِظْ): soru edatları</b><br>• <span class=\"ar\">مَنْ</span> akıllılar için (kim?) · <span class=\"ar\">مَا</span> akılsızlar için (ne?)<br>• <span class=\"ar\">مَاذَا</span> ardından fiil gelir (ne?) · <span class=\"ar\">كَيْفَ</span> hâl için (nasıl?)<br>• <span class=\"ar\">مَتَى</span> zaman (ne zaman?) · <span class=\"ar\">أَيْنَ</span> mekân (nerede?)<br>• <span class=\"ar\">كَمْ</span> sayı (kaç?) · <span class=\"ar\">هَلْ</span> cevabı evet/hayır (<span class=\"ar\">نَعَمْ / لَا</span>)" },
    { tr: "<b>لِمَاذَا</b> (neden?) sebep sorar: <span class=\"ar\">لِمَاذَا لَمْ تَتَنَاوَلْ طَعَامَ الغَدَاءِ؟</span> (Kitaptaki 3. maddede boşluğa gelen budur; boşluktan sonraki <span class=\"ar\">لَمْ</span> olumsuzluk edatıdır.)" },
    { tr: "<b>6. etkinlikteki kalıplar:</b> <span class=\"ar\">أُرِيدُ أَنْ أَصِفَ…</span> anlatmak istiyorum (أَنْ + mansûb) · <span class=\"ar\">لَا يُحِبُّ… أَبَدًا</span> hiç sevmez · <span class=\"ar\">يُفَضِّلُ… مِنَ الأَلْوَانِ…</span> renklerden … tercih eder." }
  ],
  kaide: ["لَاحِظْ: أَسْمَاءُ الاسْتِفْهَامِ: مَنْ لِلْعَاقِلِ، مَا لِغَيْرِ العَاقِلِ، مَاذَا بَعْدَهَا فِعْلٌ، كَيْفَ لِلْحَالِ، مَتَى لِلزَّمَانِ، أَيْنَ لِلْمَكَانِ، كَمْ لِلْعَدَدِ، هَلْ جَوَابُهَا نَعَمْ / لَا. تَدْرِيبٌ: اكْتُبْ أَدَاةَ الاسْتِفْهَامِ المُنَاسِبَةَ فِي الفَرَاغِ.", "٦ ـ اقْرَإِ الجُمَلَ الآتِيَةَ، وَلَاحِظِ التَّرَاكِيبَ الَّتِي تَحْتَهَا خَطٌّ، ثُمَّ اسْتَخْدِمْهَا فِي جُمَلٍ: أُرِيدُ أَنْ أَصِفَ لَكُمْ مُرَادًا. لَا يُحِبُّ سَامِرٌ الشَّعْرَ الطَّوِيلَ أَبَدًا. يُفَضِّلُ مُرَادٌ مِنَ الأَلْوَانِ اللَّوْنَ الأَسْوَدَ وَالأَبْيَضَ وَالأَزْرَقَ."],
  ex: [
    { type: "pick", fill: true, num: "تَدْرِيبٌ", ar: "اكْتُبْ أَدَاةَ الاسْتِفْهَامِ المُنَاسِبَةَ فِي الفَرَاغِ", tr: "Cümleye uygun soru edatını seç.", items: PL([
      ["___ تَقَعُ اليَمَنُ؟", "أَيْنَ", "مَتَى", "كَمْ", "Yemen nerededir?", "Mekân: أَيْنَ."],
      ["___ الهِنْدُ دَوْلَةٌ كَبِيرَةٌ؟", "هَلْ", "مَنْ", "كَيْفَ", "Hindistan büyük bir devlet mi?", "Cevabı evet/hayır: هَلْ."],
      ["___ لَمْ تَتَنَاوَلْ طَعَامَ الغَدَاءِ؟!", "لِمَاذَا", "أَيْنَ", "كَمْ", "Neden öğle yemeğini yemedin?!", "Sebep: لِمَاذَا. (لَمْ: olumsuzluk.)"],
      ["___ بَدَأَتِ الحَرْبُ العَالَمِيَّةُ الأُولَى؟", "مَتَى", "أَيْنَ", "مَنْ", "Birinci Dünya Savaşı ne zaman başladı?", "Zaman: مَتَى (1914)."],
      ["___ البِلَادُ الَّتِي تُحِبُّهَا؟", "مَا", "مَنْ", "هَلْ", "Sevdiğin ülkeler hangileri?", "Akılsız: مَا."],
      ["___ كَتَبْتَ الوَاجِبَ؟", "هَلْ", "كَمْ", "مَا", "Ödevi yazdın mı?", "Evet/hayır: هَلْ. (مَتَى da olabilir.)"],
      ["___ تَبْدَأُ المُحَاضَرَةُ فِي الجَامِعَةِ؟", "مَتَى", "مَنْ", "كَمْ", "Üniversitede ders ne zaman başlıyor?", "Zaman: مَتَى."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اسْأَلْ عَنْ رَغَدَ وَمُرَادٍ", tr: "Cevaba uygun soru edatını seç.", items: PL([
      ["___ عُمْرُ رَغَدَ؟ ← خَمْسَ عَشْرَةَ سَنَةً.", "كَمْ", "مَتَى", "أَيْنَ", "Rağad kaç yaşında?", "Sayı: كَمْ."],
      ["___ صَدِيقُ كَرِيمٍ المُفَضَّلُ؟ ← مُرَادٌ.", "مَنْ", "مَا", "كَيْفَ", "Kerîm’in en sevdiği arkadaşı kim?", "Akıllı: مَنْ."],
      ["___ يَلْبَسُ مُرَادٌ بَعْدَ العَمَلِ؟ ← مَلَابِسَ رِيَاضِيَّةً.", "مَاذَا", "مَنْ", "هَلْ", "Murâd iş çıkışı ne giyer?", "Ardından fiil: مَاذَا."],
      ["___ شَعْرُ رَغَدَ؟ ← بُنِّيٌّ مُجَعَّدٌ.", "كَيْفَ", "كَمْ", "مَتَى", "Rağad’ın saçı nasıl?", "Hâl: كَيْفَ."],
      ["___ تُسَاعِدُ رَغَدُ أُمَّهَا؟ ← عِنْدَمَا تَرْجِعُ مِنَ المَدْرَسَةِ.", "مَتَى", "أَيْنَ", "مَنْ", "Rağad annesine ne zaman yardım eder?", ""],
      ["___ يَعْمَلُ مُرَادٌ مُهَنْدِسًا؟ ← نَعَمْ.", "هَلْ", "مَاذَا", "كَمْ", "Murâd mühendis mi?", ""]
    ])},
    { type: "pick", num: "٦", ar: "لَاحِظِ التَّرَاكِيبَ، ثُمَّ اسْتَخْدِمْهَا فِي جُمَلٍ", tr: "Kalıbı doğru kullanan cümleyi seç; sonra defterine kendi cümleni yaz.", items: PL([
      ["أُرِيدُ أَنْ…", "أُرِيدُ أَنْ أَصِفَ لَكُمْ أُخْتِي.", "أُرِيدُ أَنْ أَصِفُ لَكُمْ أُخْتِي.", "أُرِيدُ أَنْ وَصَفْتُ أُخْتِي.", "Size kız kardeşimi anlatmak istiyorum.", "أَنْ + mansûb: أَصِفَ."],
      ["لَا يُحِبُّ… أَبَدًا", "لَا يُحِبُّ أَخِي الكَذِبَ أَبَدًا.", "لَا يُحِبُّ أَخِي أَبَدًا الكَذِبُ.", "يُحِبُّ لَا أَخِي الكَذِبَ.", "Kardeşim yalanı hiç sevmez.", "أَبَدًا cümle sonunda: “hiç, asla”."],
      ["يُفَضِّلُ… مِنَ الأَلْوَانِ…", "تُفَضِّلُ رَغَدُ مِنَ الأَلْوَانِ اللَّوْنَ الأَخْضَرَ.", "تُفَضِّلُ رَغَدُ الأَلْوَانَ مِنَ الأَخْضَرِ.", "رَغَدُ يُفَضِّلُ مِنَ الأَلْوَانِ.", "Rağad renklerden yeşili tercih eder.", "Dişil özne: تُفَضِّلُ."],
      ["لَيْسَ… وَلَيْسَ…", "أَبِي لَيْسَ طَوِيلًا وَلَيْسَ قَصِيرًا.", "أَبِي لَيْسَ طَوِيلٌ وَلَيْسَ قَصِيرٌ.", "أَبِي لَيْسَتْ طَوِيلَةً.", "Babam ne uzun ne kısa.", "لَيْسَ’in haberi mansûb."]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["أُرِيدُ أَنْ أُحَدِّثَكُمُ اليَوْمَ عَنْ {شَخْصَيْنِ} أُحِبُّهُمَا.", ["شَخْصَيْنِ", "شَخْصٍ", "أَشْخَاصٍ"], "metin", "Bugün sevdiğim iki kişiden bahsetmek istiyorum.", "u1"],
  ["الشَّخْصُ الأَوَّلُ هُوَ {أُخْتِي} رَغَدُ.", ["أُخْتِي", "أُمِّي", "صَدِيقَتِي"], "metin", "Birinci kişi kız kardeşim Rağad.", "u1"],
  ["شَعْرُهَا بُنِّيٌّ {مُجَعَّدٌ}.", ["مُجَعَّدٌ", "أَمْلَسُ", "طَوِيلٌ"], "metin", "Saçı kahverengi ve kıvırcık.", "u1"],
  ["وَعَيْنَاهَا {عَسَلِيَّتَانِ}.", ["عَسَلِيَّتَانِ", "زَرْقَاوَانِ", "سَوْدَاوَانِ"], "metin", "Gözleri bal rengi.", "u1"],
  ["رَغَدُ تُحِبُّ {النَّظَافَةَ} كَثِيرًا.", ["النَّظَافَةَ", "الظُّلْمَ", "الكَسَلَ"], "metin", "Rağad temizliği çok sever.", "u1"],
  ["هُوَ مُهَنْدِسٌ فِي {الثَّلَاثِينَ} مِنْ عُمُرِهِ.", ["الثَّلَاثِينَ", "العِشْرِينَ", "الأَرْبَعِينَ"], "metin", "Otuz yaşında bir mühendis.", "u1"],
  ["هُوَ إِنْسَانٌ {مُتَوَاضِعٌ}.", ["مُتَوَاضِعٌ", "مُتَكَبِّرٌ", "بَخِيلٌ"], "anlama", "Alçakgönüllü bir insan.", "u2"],
  ["مُرَادٌ {مُتَوَسِّطُ} الطُّولِ.", ["مُتَوَسِّطُ", "كَثِيرُ", "قَلِيلُ"], "anlama", "Murâd orta boylu.", "u2"],
  ["بَشَرَتُهُ {سَمْرَاءُ}.", ["سَمْرَاءُ", "أَسْمَرُ", "بَيْضَاءُ"], "anlama", "Teni esmer.", "u2"],
  ["يَذْهَبُ إِلَى عَمَلِهِ بِمَلَابِسَ {رَسْمِيَّةٍ}.", ["رَسْمِيَّةٍ", "رِيَاضِيَّةٍ", "وَاسِعَةٍ"], "anlama", "İşe resmî kıyafetle gider.", "u2"],
  ["طَوِيلٌ ≠ {قَصِيرٌ}.", ["قَصِيرٌ", "نَحِيفٌ", "صَغِيرٌ"], "zıt", "Uzun ≠ kısa.", "u3"],
  ["كَرِيمٌ ≠ {بَخِيلٌ}.", ["بَخِيلٌ", "غَبِيٌّ", "كَسُولٌ"], "zıt", "Cömert ≠ cimri.", "u3"],
  ["أَمْلَسُ ≠ {مُجَعَّدٌ}.", ["مُجَعَّدٌ", "أَكْبَرُ", "نَحِيفٌ"], "zıt", "Düz ≠ kıvırcık.", "u3"],
  ["هَادِئٌ = {سَاكِنٌ}.", ["سَاكِنٌ", "ظَرِيفٌ", "صَدِيقٌ"], "eş anlam", "Sakin = sakin.", "u3"],
  ["أُخْتِي بِنْتٌ {هَادِئَةٌ}.", ["هَادِئَةٌ", "هَادِئٌ", "هَادِئِينَ"], "uyum", "Kız kardeşim sakin bir kız.", "u3"],
  ["سَيَّارَةٌ {حَمْرَاءُ}.", ["حَمْرَاءُ", "أَحْمَرُ", "حَمْرَاوِيَّةٌ"], "renk", "Kırmızı bir araba.", "u4"],
  ["قَمِيصٌ {أَزْرَقُ}.", ["أَزْرَقُ", "زَرْقَاءُ", "أَزْرَقِيٌّ"], "renk", "Mavi bir gömlek.", "u4"],
  ["عَيْنٌ {بُنِّيَّةٌ}.", ["بُنِّيَّةٌ", "بُنِّيٌّ", "بَنَّاءُ"], "renk", "Kahverengi bir göz.", "u4"],
  ["أَخْضَرُ ← {خَضْرَاءُ}.", ["خَضْرَاءُ", "أَخْضَرَةٌ", "خَضِرِيَّةٌ"], "renk", "Yeşil (dişil).", "u4"],
  ["{أَيْنَ} تَقَعُ اليَمَنُ؟", ["أَيْنَ", "مَتَى", "كَمْ"], "soru", "Yemen nerede?", "u5"],
  ["{هَلْ} الهِنْدُ دَوْلَةٌ كَبِيرَةٌ؟", ["هَلْ", "مَنْ", "مَاذَا"], "soru", "Hindistan büyük bir devlet mi?", "u5"],
  ["{لِمَاذَا} لَمْ تَتَنَاوَلْ طَعَامَ الغَدَاءِ؟", ["لِمَاذَا", "أَيْنَ", "كَمْ"], "soru", "Neden öğle yemeğini yemedin?", "u5"],
  ["أُرِيدُ أَنْ {أَصِفَ} لَكُمْ مُرَادًا.", ["أَصِفَ", "أَصِفُ", "وَصَفْتُ"], "kalıp", "Size Murâd’ı anlatmak istiyorum.", "u5"],
  ["يُفَضِّلُ مُرَادٌ {مِنَ} الأَلْوَانِ الأَسْوَدَ.", ["مِنَ", "عَلَى", "إِلَى"], "kalıp", "Murâd renklerden siyahı tercih eder.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["رَغَدُ طَالِبَةٌ كَسُولَةٌ ← metne göre düzelt", "رَغَدُ طَالِبَةٌ مُجْتَهِدَةٌ", "رَغَدُ طَالِبَةٌ طَوِيلَةٌ", "رَغَدُ طَالِبَةٌ سَمِينَةٌ", "مُجْتَهِدَةٌ فِي صَفِّهَا.", "u2"],
  ["مُرَادٌ طَبِيبٌ ← metne göre düzelt", "مُرَادٌ مُهَنْدِسٌ", "مُرَادٌ مُعَلِّمٌ", "مُرَادٌ طَالِبٌ", "هُوَ مُهَنْدِسٌ.", "u1"],
  ["مُرَادٌ نَحِيفٌ ← metne göre düzelt", "مُرَادٌ مُمْتَلِئٌ", "مُرَادٌ سَمِينٌ جِدًّا", "مُرَادٌ طَوِيلٌ", "Ne şişman ne zayıf.", "u2"],
  ["مُنَظَّمٌ ← eş anlam", "مُرَتَّبٌ", "سَاكِنٌ", "ظَرِيفٌ", "düzenli = derli toplu", "u3"],
  ["أَنِيقٌ ← eş anlam", "ظَرِيفٌ", "صَدِيقٌ", "شَابَّةٌ", "şık = zarif", "u3"],
  ["ذَكِيٌّ ← zıt anlam", "غَبِيٌّ", "كَسُولٌ", "بَخِيلٌ", "zeki ≠ aptal", "u3"],
  ["سَمِينٌ ← zıt anlam", "نَحِيفٌ", "قَصِيرٌ", "أَصْغَرُ", "şişman ≠ zayıf", "u3"],
  ["طَالِبٌ مُجْتَهِدٌ ← dişil", "طَالِبَةٌ مُجْتَهِدَةٌ", "طَالِبَةٌ مُجْتَهِدٌ", "طَالِبٌ مُجْتَهِدَةٌ", "Sıfat isme uyar.", "u3"],
  ["أَحْمَرُ ← dişil", "حَمْرَاءُ", "أَحْمَرَةٌ", "حَمْرِيَّةٌ", "أَفْعَلُ ← فَعْلَاءُ", "u4"],
  ["أَصْفَرُ ← dişil", "صَفْرَاءُ", "أَصْفَرَةٌ", "صُفْرٌ", "أَفْعَلُ ← فَعْلَاءُ", "u4"],
  ["ذَهَبِيٌّ ← dişil", "ذَهَبِيَّةٌ", "ذَهْبَاءُ", "أَذْهَبُ", "ـِيٌّ ← ـِيَّةٌ", "u4"],
  ["سَيَّارَةٌ + أَبْيَضُ", "سَيَّارَةٌ بَيْضَاءُ", "سَيَّارَةٌ أَبْيَضُ", "سَيَّارَةٌ أَبْيَضَةٌ", "Dişil isim ← dişil renk.", "u4"],
  ["… تَبْدَأُ المُحَاضَرَةُ؟ ← soru edatı", "مَتَى تَبْدَأُ المُحَاضَرَةُ؟", "مَنْ تَبْدَأُ المُحَاضَرَةُ؟", "كَمْ تَبْدَأُ المُحَاضَرَةُ؟", "Zaman: مَتَى.", "u5"],
  ["أُرِيدُ أَنْ + أَصِفُ", "أُرِيدُ أَنْ أَصِفَ", "أُرِيدُ أَنْ أَصِفُ", "أُرِيدُ أَنْ وَصَفْتُ", "أَنْ + mansûb.", "u5"]
];
// Rağad mı Murâd mı? hız oyunu
var NOUN_LIST = UNITS[1].ex[4].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = KIM;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Sıfat ↔ zıddı", pairs: [["طَوِيلٌ", "قَصِيرٌ"], ["ذَكِيٌّ", "غَبِيٌّ"], ["سَمِينٌ", "نَحِيفٌ"], ["أَمْلَسُ", "مُجَعَّدٌ"], ["مُجْتَهِدٌ", "كَسُولٌ"], ["كَرِيمٌ", "بَخِيلٌ"], ["أَصْغَرُ", "أَكْبَرُ"], ["مُتَوَاضِعٌ", "مُتَكَبِّرٌ"]] },
  rk: { name: "Renk: eril ↔ dişil", pairs: [["أَبْيَضُ", "بَيْضَاءُ"], ["أَسْوَدُ", "سَوْدَاءُ"], ["أَحْمَرُ", "حَمْرَاءُ"], ["أَخْضَرُ", "خَضْرَاءُ"], ["أَصْفَرُ", "صَفْرَاءُ"], ["أَزْرَقُ", "زَرْقَاءُ"], ["بُنِّيٌّ", "بُنِّيَّةٌ"], ["رَمَادِيٌّ", "رَمَادِيَّةٌ"]] },
  sr: { name: "Soru edatı ↔ ne için", pairs: [["مَنْ", "لِلْعَاقِلِ"], ["مَا", "لِغَيْرِ العَاقِلِ"], ["كَيْفَ", "لِلْحَالِ"], ["مَتَى", "لِلزَّمَانِ"], ["أَيْنَ", "لِلْمَكَانِ"], ["كَمْ", "لِلْعَدَدِ"], ["هَلْ", "نَعَمْ / لَا"]] }
};
var KARTLAR = [
  ["Rağad’ın dış görünüşü?", "عُمْرُهَا ١٥ · لَيْسَتْ طَوِيلَةً وَلَا قَصِيرَةً · شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ · عَيْنَاهَا عَسَلِيَّتَانِ · ٦٥ كِيلُوغْرَامًا"],
  ["Rağad’ın ahlakı?", "لَطِيفَةٌ، مَحْبُوبَةٌ، مُجْتَهِدَةٌ، هَادِئَةٌ، مُرَتَّبَةٌ، مُنَظَّمَةٌ · تُسَاعِدُ أُمَّهَا"],
  ["Murâd’ın dış görünüşü?", "مُتَوَسِّطُ الطُّولِ، مُمْتَلِئٌ · بَشَرَتُهُ سَمْرَاءُ · عَيْنَاهُ بُنِّيَّتَانِ · شَعْرُهُ بُنِّيٌّ أَمْلَسُ"],
  ["Murâd’ın ahlakı?", "مُتَوَاضِعٌ، يُحِبُّ الخَيْرَ، يُسَاعِدُ الفُقَرَاءَ، ذُو أَخْلَاقٍ طَيِّبَةٍ، عَادِلٌ وَمُنْصِفٌ"],
  ["Murâd’ın renkleri ve kıyafeti?", "الأَسْوَدُ وَالأَبْيَضُ وَالأَزْرَقُ · العَمَلُ: مَلَابِسُ رَسْمِيَّةٌ · بَعْدَ العَمَلِ: رِيَاضِيَّةٌ أَوْ وَاسِعَةٌ"],
  ["خَلْقِيَّةٌ – خُلُقِيَّةٌ farkı?", "خَلْقٌ: dış görünüş (boy, saç, göz) · خُلُقٌ: ahlak, huy"],
  ["Eş anlamlar?", "مُنَظَّمٌ = مُرَتَّبٌ · يَرْجِعُ = يَعُودُ · فَتَاةٌ = شَابَّةٌ · زَمِيلٌ = صَدِيقٌ · أَنِيقٌ = ظَرِيفٌ · هَادِئٌ = سَاكِنٌ"],
  ["Zıt anlamlar?", "طَوِيلٌ ≠ قَصِيرٌ · ذَكِيٌّ ≠ غَبِيٌّ · سَمِينٌ ≠ نَحِيفٌ · أَمْلَسُ ≠ مُجَعَّدٌ · كَرِيمٌ ≠ بَخِيلٌ"],
  ["Ana renkler (dişil)?", "بَيْضَاءُ، سَوْدَاءُ، حَمْرَاءُ، خَضْرَاءُ، صَفْرَاءُ، زَرْقَاءُ · kalıp: أَفْعَلُ ← فَعْلَاءُ"],
  ["Nispet renkleri?", "بُنِّيٌّ/ـَةٌ، رَمَادِيٌّ، فِضِّيٌّ، ذَهَبِيٌّ، بُرْتُقَالِيٌّ، زَهْرِيٌّ، كُحْلِيٌّ ← ـِيَّةٌ"],
  ["Soru edatları?", "مَنْ (kim) · مَا / مَاذَا (ne) · كَيْفَ (nasıl) · مَتَى (ne zaman) · أَيْنَ (nerede) · كَمْ (kaç) · هَلْ (mi?) · لِمَاذَا (neden)"],
  ["Kalıplar?", "أُرِيدُ أَنْ أَصِفَ · لَا يُحِبُّ… أَبَدًا · يُفَضِّلُ… مِنَ الأَلْوَانِ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat08";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("شَخْصٌ", "i", "kişi", "أَشْخَاصٌ", "efal", "", "", "أُرِيدُ أَنْ أُحَدِّثَكُمْ عَنْ شَخْصَيْنِ أُحِبُّهُمَا.", "شَخْصَيْنِ", "Sevdiğim iki kişiden bahsetmek istiyorum."),
  KW("شَعْرٌ", "i", "saç", "شُعُورٌ", "fuul", "", "", "شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ.", "شَعْرُهَا", "Saçı kahverengi ve kıvırcık."),
  KW("عَيْنٌ", "i", "göz", "عُيُونٌ", "fuul", "", "", "وَعَيْنَاهَا عَسَلِيَّتَانِ.", "وَعَيْنَاهَا", "Gözleri bal rengi."),
  KW("وَزْنٌ", "i", "ağırlık, kilo", "أَوْزَانٌ", "efal", "", "", "وَزْنُهَا تَقْرِيبًا خَمْسَةٌ وَسِتُّونَ كِيلُوغْرَامًا.", "وَزْنُهَا", "Kilosu yaklaşık 65."),
  KW("فَتَاةٌ", "i", "genç kız", "فَتَيَاتٌ", "at", "شَابَّةٌ", "فَتًى", "رَغَدُ فَتَاةٌ لَطِيفَةٌ وَمَحْبُوبَةٌ.", "فَتَاةٌ", "Rağad nazik ve sevilen bir kız."),
  KW("خُلُقٌ", "i", "ahlak, huy", "أَخْلَاقٌ", "efal", "", "", "وَهُوَ ذُو أَخْلَاقٍ طَيِّبَةٍ.", "أَخْلَاقٍ", "Güzel ahlak sahibidir."),
  KW("ظُلْمٌ", "i", "zulüm", "", "", "", "عَدْلٌ", "لَا يُحِبُّ الظُّلْمَ وَلَا الظَّالِمِينَ.", "الظُّلْمَ", "Zulmü ve zalimleri sevmez."),
  KW("بَشَرَةٌ", "i", "ten", "", "", "", "", "بَشَرَتُهُ سَمْرَاءُ.", "بَشَرَتُهُ", "Teni esmer."),
  KW("لَوْنٌ", "i", "renk", "أَلْوَانٌ", "efal", "", "", "يُفَضِّلُ مُرَادٌ الأَسْوَدَ وَالأَبْيَضَ مِنَ الأَلْوَانِ.", "الأَلْوَانِ", "Murâd renklerden siyahı ve beyazı tercih eder."),
  KW("مَلَابِسُ", "i", "elbiseler, kıyafet", "", "", "ثِيَابٌ", "", "يَذْهَبُ إِلَى عَمَلِهِ بِمَلَابِسَ رَسْمِيَّةٍ دَائِمًا.", "بِمَلَابِسَ", "İşine hep resmî kıyafetle gider."),
  KW("زَمِيلٌ", "i", "arkadaş (iş, okul)", "زُمَلَاءُ", "fuala", "صَدِيقٌ", "", "", "", ""),
  KW("طَوِيلٌ", "s", "uzun", "طِوَالٌ", "fial", "", "قَصِيرٌ", "هِيَ لَيْسَتْ طَوِيلَةً وَلَيْسَتْ قَصِيرَةً.", "طَوِيلَةً", "Ne uzun ne kısa."),
  KW("مُجَعَّدٌ", "s", "kıvırcık", "", "", "", "أَمْلَسُ", "شَعْرُهَا بُنِّيٌّ مُجَعَّدٌ.", "مُجَعَّدٌ", "Saçı kahverengi ve kıvırcık."),
  KW("أَمْلَسُ", "s", "düz, pürüzsüz", "مُلْسٌ", "diger", "", "مُجَعَّدٌ", "شَعْرُهُ بُنِّيٌّ أَمْلَسُ.", "أَمْلَسُ", "Saçı kahverengi ve düz."),
  KW("لَطِيفٌ", "s", "nazik, hoş", "لُطَفَاءُ", "fuala", "", "", "رَغَدُ فَتَاةٌ لَطِيفَةٌ وَمَحْبُوبَةٌ.", "لَطِيفَةٌ", "Rağad nazik bir kız."),
  KW("مُجْتَهِدٌ", "s", "çalışkan", "مُجْتَهِدُونَ", "un", "", "كَسُولٌ", "وَهِيَ طَالِبَةٌ مُجْتَهِدَةٌ فِي صَفِّهَا.", "مُجْتَهِدَةٌ", "Sınıfında çalışkan bir öğrenci."),
  KW("هَادِئٌ", "s", "sakin", "", "", "سَاكِنٌ", "", "وَهِيَ طَالِبَةٌ مُجْتَهِدَةٌ فِي صَفِّهَا وَهَادِئَةٌ.", "وَهَادِئَةٌ", "Sınıfında çalışkan ve sakin."),
  KW("مُنَظَّمٌ", "s", "düzenli", "", "", "مُرَتَّبٌ", "", "فَهِيَ مُرَتَّبَةٌ وَمُنَظَّمَةٌ.", "وَمُنَظَّمَةٌ", "O derli toplu ve düzenli."),
  KW("مُتَوَاضِعٌ", "s", "alçakgönüllü", "مُتَوَاضِعُونَ", "un", "", "مُتَكَبِّرٌ", "وَهُوَ إِنْسَانٌ مُتَوَاضِعٌ.", "مُتَوَاضِعٌ", "O alçakgönüllü bir insan."),
  KW("عَادِلٌ", "s", "adil", "عُدُولٌ", "fuul", "مُنْصِفٌ", "ظَالِمٌ", "وَهُوَ عَادِلٌ وَمُنْصِفٌ.", "عَادِلٌ", "O adil ve hakkaniyetli."),
  KW("سَمِينٌ", "s", "şişman", "سِمَانٌ", "fial", "", "نَحِيفٌ", "وَهُوَ لَيْسَ سَمِينًا، وَلَيْسَ نَحِيفًا.", "سَمِينًا", "Ne şişman ne zayıf."),
  KW("نَحِيفٌ", "s", "zayıf", "نِحَافٌ", "fial", "", "سَمِينٌ", "وَهُوَ لَيْسَ سَمِينًا، وَلَيْسَ نَحِيفًا.", "نَحِيفًا", "Ne şişman ne zayıf."),
  KW("أَنِيقٌ", "s", "şık", "", "", "ظَرِيفٌ", "", "هُوَ شَابٌّ أَنِيقٌ.", "أَنِيقٌ", "O şık bir genç."),
  KW("ذَكِيٌّ", "s", "zeki", "أَذْكِيَاءُ", "efila", "", "غَبِيٌّ", "", "", ""),
  KW("كَرِيمٌ", "s", "cömert", "كِرَامٌ", "fial", "", "بَخِيلٌ", "", "", ""),
  KW("أَبْيَضُ", "s", "beyaz", "بِيضٌ", "diger", "", "أَسْوَدُ", "يَلْبَسُ مَلَابِسَ رِيَاضِيَّةً بَيْضَاءَ وَسَوْدَاءَ.", "بَيْضَاءَ", "Beyaz ve siyah spor kıyafet giyer."),
  KW("أَحْمَرُ", "s", "kırmızı", "حُمْرٌ", "diger", "", "", "", "", ""),
  KW("أَزْرَقُ", "s", "mavi", "زُرْقٌ", "diger", "", "", "يُفَضِّلُ مُرَادٌ الأَسْوَدَ وَالأَبْيَضَ وَالأَزْرَقَ.", "وَالأَزْرَقَ", "Murâd siyahı, beyazı ve maviyi tercih eder."),
  KW("بُنِّيٌّ", "s", "kahverengi", "", "", "", "", "وَلَهُ عَيْنَانِ بُنِّيَّتَانِ.", "بُنِّيَّتَانِ", "Kahverengi iki gözü var."),
  KW("حَدَّثَ", "f", "anlattı (… -den: عَنْ)", "", "", "", "", "أُرِيدُ أَنْ أُحَدِّثَكُمُ اليَوْمَ عَنْ شَخْصَيْنِ.", "أُحَدِّثَكُمُ", "Bugün size iki kişiden bahsetmek istiyorum."),
  KW("وَصَفَ", "f", "anlattı, tasvir etti", "", "", "", "", "وَالشَّخْصُ الثَّانِي الَّذِي سَأَصِفُهُ لَكُمْ.", "سَأَصِفُهُ", "Size anlatacağım ikinci kişi."),
  KW("كَوَى", "f", "ütüledi", "", "", "", "", "تَكْوِي رَغَدُ مَلَابِسَهَا.", "تَكْوِي", "Rağad elbiselerini ütüler."),
  KW("رَتَّبَ", "f", "düzenledi, topladı", "", "", "نَظَّمَ", "", "وَتُرَتِّبُ غُرْفَتَهَا أَيْضًا.", "وَتُرَتِّبُ", "Ve odasını da toplar."),
  KW("فَضَّلَ", "f", "tercih etti", "", "", "", "", "يُفَضِّلُ مُرَادٌ الأَسْوَدَ وَالأَبْيَضَ.", "يُفَضِّلُ", "Murâd siyahı ve beyazı tercih eder."),
  KW("الْتَقَى", "f", "buluştu", "", "", "", "افْتَرَقَ", "وَعِنْدَمَا نَلْتَقِي بَعْدَ العَمَلِ.", "نَلْتَقِي", "İş çıkışı buluştuğumuzda.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","شُعُورٌ، عُيُونٌ"],"efal":["أَفْعَالٌ","ef’âl","أَشْخَاصٌ، أَلْوَانٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","طِوَالٌ، كِرَامٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","غُرَفٌ، صُوَرٌ"],"fuala":["فُعَلَاءُ","fu’alâ","لُطَفَاءُ، زُمَلَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَذْكِيَاءُ، أَصْدِقَاءُ"],"fevail":["فَوَاعِلُ","fevâil","شَوَارِعُ، نَوَافِذُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَسَاجِدُ، مَكَاتِبُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","عَصَافِيرُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","طُلَّابٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","مُجْتَهِدُونَ، مُتَوَاضِعُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","فَتَيَاتٌ، سَيَّارَاتٌ"],"diger":["…","başka kalıplar (فُعْلٌ: بِيضٌ، حُمْرٌ)","بِيضٌ، زُرْقٌ"]};
