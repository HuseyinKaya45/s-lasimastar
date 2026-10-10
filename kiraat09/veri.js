// ================= VERİ: Kıraat 9 — فُصُولُ السَّنَةِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الفَصْلُ", tr: "Mevsim" }, nasb: { ar: "الجَوُّ", tr: "Hava" }, cerr: { ar: "النَّاسُ", tr: "İnsanlar" },
  mi: { ar: "حَرْفُ النَّفْيِ", tr: "Olumsuzluk" }, ref: { ar: "الفِعْلُ", tr: "Fiil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var FASL = [["r", "İlkbahar", "الرَّبِيعُ", "mz"], ["s", "Yaz", "الصَّيْفُ", "nasb"], ["h", "Sonbahar", "الخَرِيفُ", "ref"], ["k", "Kış", "الشِّتَاءُ", "muz"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", r: "İlkbahar", s: "Yaz", h: "Sonbahar", k: "Kış" };

// Olumsuzluk makinesi: [olumlu mâzî, olumlu muzâri, olumlu isim cümlesi, ما, لم, لا, لن, ليس, Türkçe olumlu, Türkçe olumsuzlar]
var NEFY = [
  ["فَهِمْتُ الدَّرْسَ", "أَفْهَمُ الدَّرْسَ", "الدَّرْسُ مَفْهُومٌ", "مَا فَهِمْتُ الدَّرْسَ", "لَمْ أَفْهَمِ الدَّرْسَ", "لَا أَفْهَمُ الدَّرْسَ", "لَنْ أَفْهَمَ الدَّرْسَ", "الدَّرْسُ لَيْسَ مَفْهُومًا", "dersi anlamak", ["Dersi anlamadım.", "Dersi anlamadım (hiç).", "Dersi anlamıyorum.", "Dersi asla anlamayacağım.", "Ders anlaşılır değil."]],
  ["ذَهَبْتُ إِلَى الحَدِيقَةِ", "أَذْهَبُ إِلَى الحَدِيقَةِ", "الحَدِيقَةُ قَرِيبَةٌ", "مَا ذَهَبْتُ إِلَى الحَدِيقَةِ", "لَمْ أَذْهَبْ إِلَى الحَدِيقَةِ", "لَا أَذْهَبُ إِلَى الحَدِيقَةِ", "لَنْ أَذْهَبَ إِلَى الحَدِيقَةِ", "الحَدِيقَةُ لَيْسَتْ قَرِيبَةً", "parka gitmek", ["Parka gitmedim.", "Parka gitmedim.", "Parka gitmiyorum.", "Parka gitmeyeceğim.", "Park yakın değil."]],
  ["لَبِسْتُ المِعْطَفَ", "أَلْبَسُ المِعْطَفَ", "المِعْطَفُ ثَقِيلٌ", "مَا لَبِسْتُ المِعْطَفَ", "لَمْ أَلْبَسِ المِعْطَفَ", "لَا أَلْبَسُ المِعْطَفَ", "لَنْ أَلْبَسَ المِعْطَفَ", "المِعْطَفُ لَيْسَ ثَقِيلًا", "palto giymek", ["Paltoyu giymedim.", "Paltoyu giymedim.", "Paltoyu giymiyorum.", "Paltoyu giymeyeceğim.", "Palto ağır değil."]],
  ["خَرَجْتُ مِنَ البَيْتِ", "أَخْرُجُ مِنَ البَيْتِ", "البَيْتُ بَارِدٌ", "مَا خَرَجْتُ مِنَ البَيْتِ", "لَمْ أَخْرُجْ مِنَ البَيْتِ", "لَا أَخْرُجُ مِنَ البَيْتِ", "لَنْ أَخْرُجَ مِنَ البَيْتِ", "البَيْتُ لَيْسَ بَارِدًا", "evden çıkmak", ["Evden çıkmadım.", "Evden çıkmadım.", "Evden çıkmıyorum.", "Evden çıkmayacağım.", "Ev soğuk değil."]],
  ["هَطَلَ المَطَرُ", "يَهْطِلُ المَطَرُ", "الجَوُّ مُمْطِرٌ", "مَا هَطَلَ المَطَرُ", "لَمْ يَهْطِلِ المَطَرُ", "لَا يَهْطِلُ المَطَرُ", "لَنْ يَهْطِلَ المَطَرُ", "الجَوُّ لَيْسَ مُمْطِرًا", "yağmur yağmak", ["Yağmur yağmadı.", "Yağmur yağmadı.", "Yağmur yağmıyor.", "Yağmur yağmayacak.", "Hava yağmurlu değil."]]
];
var EDAT = [["مَا", "+ mâzî", "geçmişi olumsuz yapar", 0], ["لَمْ", "+ muzâri (meczûm)", "geçmişi olumsuz yapar; fiil cezm olur", 1], ["لَا", "+ muzâri", "şimdiki–geniş zamanı olumsuz yapar", 1], ["لَنْ", "+ muzâri (mansûb)", "geleceği olumsuz yapar; fiil nasb olur", 1], ["لَيْسَ", "+ isim cümlesi", "isim cümlesini olumsuz yapar; haber mansûb", 2]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "فِي السَّنَةِ أَرْبَعَةُ فُصُولٍ، هِيَ: الصَّيْفُ، وَالخَرِيفُ، وَالشِّتَاءُ، وَالرَّبِيعُ. فَصْلُ الرَّبِيعِ مِنْ أَجْمَلِ الفُصُولِ وَأَفْضَلِهَا عِنْدَ النَّاسِ، لِأَنَّهُ فَصْلُ الجَمَالِ وَالحَيَاةِ، فِيهِ تَتَفَتَّحُ أَزْهَارُ الأَشْجَارِ وَتَنْمُو الأَزْهَارُ بِأَنْوَاعِهَا المُخْتَلِفَةِ، كَالقَرَنْفُلِ وَاليَاسَمِينِ وَالجُورِيِّ، وَتَلْبَسُ الأَرْضُ فِي هَذَا الفَصْلِ ثَوْبَهَا الأَخْضَرَ. وَيَكُونُ الجَوُّ مُعْتَدِلًا، وَالشَّمْسُ عَادَةً لَيْسَتْ قَوِيَّةً. فِي هَذَا الفَصْلِ يَخْلَعُ النَّاسُ لِبَاسَهُمُ الثَّقِيلَ، وَيَلْبَسُونَ المَلَابِسَ الخَفِيفَةَ، وَيَخْرُجُونَ إِلَى الحَدَائِقِ الجَمِيلَةِ وَالغَابَاتِ لِلِاسْتِمْتَاعِ بِجَمَالِ الطَّبِيعَةِ وَالتَّرْوِيحِ عَنْ أَنْفُسِهِمْ." +
  "<br>أَمَّا فَصْلُ الصَّيْفِ فَيَذْهَبُ النَّاسُ فِيهِ إِلَى المَصَايِفِ وَالمَسَابِحِ وَالمُتَنَزَّهَاتِ، لِأَنَّهُ وَقْتُ عُطْلَةِ الطُّلَّابِ فِي المَدَارِسِ وَالجَامِعَاتِ. وَتَكْثُرُ فِيهِ الخَضْرَاوَاتُ وَالفَوَاكِهُ كَالعِنَبِ وَالتِّينِ وَالكَرَزِ، وَيَكُونُ الجَوُّ حَارًّا، لِذَلِكَ يَلْبَسُ فِيهِ النَّاسُ المَلَابِسَ الخَفِيفَةَ." +
  "<br>أَمَّا فَصْلُ الخَرِيفِ فَهُوَ فَصْلٌ جَمِيلٌ أَيْضًا، يُعِدُّ الفَلَّاحُونَ أَرْضَهُمْ لِلزِّرَاعَةِ. وَتَبْدَأُ أَوْرَاقُ الأَشْجَارِ بِالتَّسَاقُطِ. الجَوُّ فِي فَصْلِ الخَرِيفِ يَمِيلُ إِلَى البُرُودَةِ، لَكِنَّهُ جَمِيلٌ، وَتَكْثُرُ فِيهِ الغُيُومُ، وَتَهُبُّ الرِّيَاحُ الخَفِيفَةُ، وَتَهْطِلُ أَمْطَارٌ خَفِيفَةٌ وَأَحْيَانًا غَزِيرَةٌ، وَتَصْفَرُّ فِيهِ أَوْرَاقُ الأَشْجَارِ." +
  "<br>فِي فَصْلِ الشِّتَاءِ يَكُونُ الجَوُّ بَارِدًا وَتَهْطِلُ أَمْطَارٌ غَزِيرَةٌ وَثُلُوجٌ كَثِيرَةٌ فَوْقَ الجِبَالِ. يَجْلِسُ النَّاسُ فِي بُيُوتِهِمْ حَوْلَ المِدْفَأَةِ، وَيَرْتَدُونَ المَلَابِسَ الصُّوفِيَّةَ الثَّقِيلَةَ، وَيَحْمِلُونَ المِظَلَّاتِ فِي الشَّوَارِعِ لِتَحْمِيَهُمْ مِنَ المَطَرِ.";
var METIN_TR = "Yılda dört mevsim vardır: yaz, sonbahar, kış ve ilkbahar. İlkbahar insanların gözünde en güzel ve en iyi mevsimlerdendir; çünkü güzellik ve hayat mevsimidir. Bu mevsimde ağaçların çiçekleri açar; karanfil, yasemin ve gül (cûrî) gibi çeşit çeşit çiçekler büyür; toprak yeşil elbisesini giyer. Hava ılıman, güneş genellikle güçlü değildir. Bu mevsimde insanlar kalın giysilerini çıkarır, ince giysiler giyer; tabiatın güzelliğinin tadını çıkarmak ve dinlenmek için güzel bahçelere ve ormanlara çıkarlar." +
  "<br>Yaz mevsiminde ise insanlar yazlıklara, havuzlara ve mesire yerlerine giderler; çünkü okullarda ve üniversitelerde öğrencilerin tatil vaktidir. Bu mevsimde üzüm, incir ve kiraz gibi sebze ve meyveler çoğalır; hava sıcaktır, bu yüzden insanlar ince giysiler giyer." +
  "<br>Sonbahar da güzel bir mevsimdir; çiftçiler topraklarını ekime hazırlar. Ağaçların yaprakları dökülmeye başlar. Sonbaharda hava serinlemeye meyleder ama güzeldir; bulutlar çoğalır, hafif rüzgârlar eser, hafif bazen de bol yağmurlar yağar, ağaçların yaprakları sararır." +
  "<br>Kış mevsiminde hava soğuktur; bol yağmur yağar, dağların üstüne çok kar düşer. İnsanlar evlerinde sobanın etrafında oturur, kalın yün giysiler giyer, sokaklarda kendilerini yağmurdan korusun diye şemsiye taşırlar.";
var SOZLUK = [["فَصْلٌ ج فُصُولٌ", "mevsim"], ["تَتَفَتَّحُ", "açar (çiçek)"], ["تَنْمُو", "büyür"], ["القَرَنْفُلُ / اليَاسَمِينُ / الجُورِيُّ", "karanfil / yasemin / gül (Şam gülü)"], ["مُعْتَدِلٌ", "ılıman"], ["يَخْلَعُ", "çıkarır (giysi)"], ["الاسْتِمْتَاعُ", "zevk almak"], ["التَّرْوِيحُ عَنِ النَّفْسِ", "dinlenip eğlenmek"], ["المَصَايِفُ", "yazlıklar"], ["المَسَابِحُ", "yüzme havuzları"], ["المُتَنَزَّهَاتُ", "mesire yerleri"], ["يُعِدُّ", "hazırlar"], ["الفَلَّاحُونَ", "çiftçiler"], ["التَّسَاقُطُ", "dökülme"], ["يَمِيلُ إِلَى البُرُودَةِ", "serinlemeye meyleder"], ["الغُيُومُ", "bulutlar"], ["تَهُبُّ الرِّيَاحُ", "rüzgârlar eser"], ["غَزِيرَةٌ", "bol"], ["تَصْفَرُّ", "sararır"], ["يَرْتَدُونَ", "giyerler"], ["صُوفِيَّةٌ", "yünlü"], ["المِظَلَّاتُ", "şemsiyeler"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendi mevsimini düşünmek: en sevdiğin mevsim, ülkende kar ne zaman yağar", "Dört mevsimi anlatan metni durmadan okumak ve dinlemek", "Hava, doğa ve giysi kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "فِي فَصْلِ الرَّبِيعِ:mz / يَكُونُ الجَوُّ مُعْتَدِلًا،:nasb / وَيَلْبَسُ النَّاسُ المَلَابِسَ الخَفِيفَةَ.:cerr", tr: "İlkbaharda hava ılımandır; insanlar ince giysiler giyer." },
    { s: "فِي فَصْلِ الشِّتَاءِ:mz / يَكُونُ الجَوُّ بَارِدًا،:nasb / وَيَرْتَدِي النَّاسُ المَلَابِسَ الصُّوفِيَّةَ.:cerr", tr: "Kışın hava soğuktur; insanlar yün giysiler giyer." }
  ],
  rules: [
    { tr: "<b>Dört mevsim:</b> <span class=\"ar\">الرَّبِيعُ</span> ilkbahar (çiçekler, ılıman hava, yeşil toprak) · <span class=\"ar\">الصَّيْفُ</span> yaz (sıcak, tatil, meyve) · <span class=\"ar\">الخَرِيفُ</span> sonbahar (yaprak dökümü, bulut, rüzgâr, ekim hazırlığı) · <span class=\"ar\">الشِّتَاءُ</span> kış (soğuk, bol yağmur, kar, soba, şemsiye)." },
    { tr: "<b>Hava kalıpları:</b> <span class=\"ar\">يَكُونُ الجَوُّ حَارًّا / بَارِدًا / مُعْتَدِلًا</span> hava sıcak / soğuk / ılıman olur · <span class=\"ar\">يَمِيلُ إِلَى البُرُودَةِ</span> serinlemeye meyleder · <span class=\"ar\">تَهْطِلُ الأَمْطَارُ</span> yağmur yağar · <span class=\"ar\">تَهُبُّ الرِّيَاحُ</span> rüzgâr eser. (<span class=\"ar\">يَكُونُ</span>’dan sonra sıfat mansûb.)" },
    { tr: "<b>أَمَّا… فَـ…</b> “… ise …”: <span class=\"ar\">أَمَّا فَصْلُ الصَّيْفِ فَيَذْهَبُ النَّاسُ فِيهِ إِلَى المَصَايِفِ</span>. Cevap kısmı mutlaka <span class=\"ar\">فَـ</span> ile başlar." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَا فَصْلُكَ المُفَضَّلُ، وَلِمَاذَا؟ مَتَى يَهْطِلُ الثَّلْجُ فِي بَلَدِكَ؟ مَاذَا يَلْبَسُ النَّاسُ فِي فَصْلِ الشِّتَاءِ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "فُصُولُ السَّنَةِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَا فَصْلُكَ المُفَضَّلُ، وَلِمَاذَا؟", a: "فَصْلِي المُفَضَّلُ الرَّبِيعُ، لِأَنَّ الجَوَّ فِيهِ مُعْتَدِلٌ وَالأَزْهَارَ تَتَفَتَّحُ.", tr: "En sevdiğin mevsim hangisi, neden? (Örnek) İlkbahar; çünkü hava ılıman ve çiçekler açıyor." },
        { q: "مَتَى يَهْطِلُ الثَّلْجُ فِي بَلَدِكَ؟", a: "يَهْطِلُ الثَّلْجُ فِي فَصْلِ الشِّتَاءِ، فِي كَانُونَ الثَّانِي وَشُبَاطَ.", tr: "Ülkende kar ne zaman yağar? Kışın, ocak ve şubatta." },
        { q: "مَاذَا يَلْبَسُ النَّاسُ فِي فَصْلِ الشِّتَاءِ؟", a: "يَلْبَسُونَ المَلَابِسَ الصُّوفِيَّةَ الثَّقِيلَةَ.", tr: "Kışın insanlar ne giyer? Kalın yün giysiler." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "فِي السَّنَةِ أَرْبَعَةُ فُصُولٍ.", a: "d", why: "الصَّيْفُ، وَالخَرِيفُ، وَالشِّتَاءُ، وَالرَّبِيعُ." },
        { s: "فَصْلُ الرَّبِيعِ فَصْلُ الجَمَالِ وَالحَيَاةِ.", a: "d", why: "لِأَنَّهُ فَصْلُ الجَمَالِ وَالحَيَاةِ." },
        { s: "الشَّمْسُ فِي الرَّبِيعِ قَوِيَّةٌ جِدًّا.", a: "y", why: "وَالشَّمْسُ عَادَةً لَيْسَتْ قَوِيَّةً." },
        { s: "يَذْهَبُ النَّاسُ فِي الصَّيْفِ إِلَى المَصَايِفِ وَالمَسَابِحِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "الصَّيْفُ وَقْتُ عُطْلَةِ الطُّلَّابِ.", a: "d", why: "لِأَنَّهُ وَقْتُ عُطْلَةِ الطُّلَّابِ." },
        { s: "يَكْثُرُ العِنَبُ وَالتِّينُ فِي الشِّتَاءِ.", a: "y", why: "Yazın çoğalır: وَتَكْثُرُ فِيهِ… كَالعِنَبِ وَالتِّينِ." },
        { s: "يُعِدُّ الفَلَّاحُونَ أَرْضَهُمْ لِلزِّرَاعَةِ فِي الخَرِيفِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "تَتَفَتَّحُ أَوْرَاقُ الأَشْجَارِ فِي الخَرِيفِ.", a: "y", why: "Sonbaharda yapraklar dökülür ve sararır." },
        { s: "تَكْثُرُ الغُيُومُ فِي الخَرِيفِ.", a: "d", why: "وَتَكْثُرُ فِيهِ الغُيُومُ." },
        { s: "تَهْطِلُ الثُّلُوجُ فَوْقَ الجِبَالِ فِي الشِّتَاءِ.", a: "d", why: "وَثُلُوجٌ كَثِيرَةٌ فَوْقَ الجِبَالِ." },
        { s: "يَجْلِسُ النَّاسُ فِي الشِّتَاءِ فِي الحَدَائِقِ.", a: "y", why: "Evlerinde sobanın etrafında otururlar." },
        { s: "يَحْمِلُ النَّاسُ المِظَلَّاتِ لِتَحْمِيَهُمْ مِنَ المَطَرِ.", a: "d", why: "Metnin son cümlesi." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("فِيهِ تَتَفَتَّحُ أَزْهَارُ الأَشْجَارِ", "تَتَفَتَّحُ"), "açar", "solar", "düşer", "Ağaçların çiçekleri açar.", "فَتَحَ: açtı."],
      [HL("وَيَكُونُ الجَوُّ مُعْتَدِلًا", "مُعْتَدِلًا"), "ılıman", "çok sıcak", "çok soğuk", "Hava ılıman olur.", "= دَافِئٌ (kitapta)."],
      [HL("يَخْلَعُ النَّاسُ لِبَاسَهُمُ الثَّقِيلَ", "يَخْلَعُ"), "çıkarır", "giyer", "yıkar", "Kalın giysilerini çıkarırlar.", "Zıddı: لَبِسَ."],
      [HL("لِلِاسْتِمْتَاعِ بِجَمَالِ الطَّبِيعَةِ", "الطَّبِيعَةِ"), "tabiat, doğa", "şehir", "ev", "Tabiatın güzelliğinin tadını çıkarmak için.", ""],
      [HL("إِلَى المَصَايِفِ وَالمَسَابِحِ", "وَالمَسَابِحِ"), "yüzme havuzları", "camiler", "okullar", "Yazlıklara ve havuzlara.", "سَبَحَ: yüzdü."],
      [HL("يُعِدُّ الفَلَّاحُونَ أَرْضَهُمْ", "الفَلَّاحُونَ"), "çiftçiler", "öğrenciler", "tüccarlar", "Çiftçiler topraklarını hazırlar.", "فِلَاحَةٌ: çiftçilik."],
      [HL("وَتَبْدَأُ أَوْرَاقُ الأَشْجَارِ بِالتَّسَاقُطِ", "بِالتَّسَاقُطِ"), "dökülme", "büyüme", "açma", "Yapraklar dökülmeye başlar.", ""],
      [HL("وَتَكْثُرُ فِيهِ الغُيُومُ", "الغُيُومُ"), "bulutlar", "yıldızlar", "kuşlar", "Bulutlar çoğalır.", "Tekili: غَيْمٌ / غَيْمَةٌ = سَحَابَةٌ."],
      [HL("وَتَهُبُّ الرِّيَاحُ الخَفِيفَةُ", "تَهُبُّ"), "eser", "yağar", "durur", "Hafif rüzgârlar eser.", ""],
      [HL("وَأَحْيَانًا غَزِيرَةٌ", "غَزِيرَةٌ"), "bol", "az", "sıcak", "Bazen de bol (yağmur).", ""],
      [HL("وَيَرْتَدُونَ المَلَابِسَ الصُّوفِيَّةَ", "الصُّوفِيَّةَ"), "yünlü", "ipek", "pamuklu", "Yün giysiler giyerler.", "صُوفٌ: yün."],
      [HL("وَيَحْمِلُونَ المِظَلَّاتِ", "المِظَلَّاتِ"), "şemsiyeler", "çantalar", "kitaplar", "Şemsiye taşırlar.", "ظِلٌّ: gölge."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama ve Mevsimler", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "Anlatılan özelliğin hangi mevsime ait olduğunu bulmak", "Mevsimleri hava, doğa ve giysiyle anlatmak"],
  examples: [
    { s: "تَتَسَاقَطُ فِيهِ:- / أَوْرَاقُ الأَشْجَارِ،:nasb / إِنَّهُ فَصْلُ:- / الخَرِيفِ.:mz", tr: "Ağaçların yaprakları dökülür; o sonbahardır." }
  ],
  rules: [
    { tr: "<b>إِنَّهُ فَصْلُ…</b> “o … mevsimidir”: <span class=\"ar\">إِنَّ</span> + bitişik zamir (<span class=\"ar\">ـهُ</span>) + haber. Kitaptaki 6. etkinlikte bu kalıp kullanılıyor." },
    { tr: "<b>Kitaptaki iki “belirsiz” madde:</b> <span class=\"ar\">تَنْضَجُ الثِّمَارُ</span> (meyveler olgunlaşır) metne göre yazdır; bazı meyveler sonbaharda da olgunlaşır. <span class=\"ar\">تَشْتَدُّ الرِّيَاحُ</span> (rüzgâr şiddetlenir) burada sonbahar kabul edildi; kışın da şiddetli rüzgâr olur." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَاذَا يَلْبَسُ النَّاسُ فِي فَصْلَيِ الشِّتَاءِ وَالصَّيْفِ؟ مَتَى يَخْلَعُ النَّاسُ مَلَابِسَهُمُ الثَّقِيلَةَ؟ مَتَى يَرْتَدِي النَّاسُ المَلَابِسَ الصُّوفِيَّةَ؟ مَا أَنْوَاعُ الأَزْهَارِ الَّتِي قَرَأْتَهَا فِي النَّصِّ؟ مَا فَصْلُكَ المُفَضَّلُ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ. ٦ ـ اكْتُبِ اسْمَ الفَصْلِ الَّذِي تُشِيرُ إِلَيْهِ الجُمَلُ الآتِيَةُ. ٧ ـ امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç. (5. soru “En sevdiğin mevsim?” kişiseldir; 1. bölümdeki örnek cevaba bak.)", items: PL([
      ["مَاذَا يَلْبَسُ النَّاسُ فِي فَصْلَيِ الشِّتَاءِ وَالصَّيْفِ؟", "فِي الشِّتَاءِ المَلَابِسَ الصُّوفِيَّةَ الثَّقِيلَةَ، وَفِي الصَّيْفِ المَلَابِسَ الخَفِيفَةَ.", "فِي الشِّتَاءِ المَلَابِسَ الخَفِيفَةَ، وَفِي الصَّيْفِ الصُّوفِيَّةَ.", "يَلْبَسُونَ المَلَابِسَ الثَّقِيلَةَ فِي الفَصْلَيْنِ.", "Kışın ve yazın ne giyerler? Kışın kalın yün, yazın ince giysiler.", ""],
      ["مَتَى يَخْلَعُ النَّاسُ مَلَابِسَهُمُ الثَّقِيلَةَ؟", "فِي فَصْلِ الرَّبِيعِ.", "فِي فَصْلِ الشِّتَاءِ.", "فِي فَصْلِ الخَرِيفِ.", "Kalın giysilerini ne zaman çıkarırlar? İlkbaharda.", "فِي هَذَا الفَصْلِ يَخْلَعُ النَّاسُ لِبَاسَهُمُ الثَّقِيلَ."],
      ["مَتَى يَرْتَدِي النَّاسُ المَلَابِسَ الصُّوفِيَّةَ؟", "فِي فَصْلِ الشِّتَاءِ.", "فِي فَصْلِ الصَّيْفِ.", "فِي فَصْلِ الرَّبِيعِ.", "Yün giysileri ne zaman giyerler? Kışın.", ""],
      ["مَا أَنْوَاعُ الأَزْهَارِ الَّتِي قَرَأْتَهَا فِي النَّصِّ؟", "القَرَنْفُلُ وَاليَاسَمِينُ وَالجُورِيُّ.", "العِنَبُ وَالتِّينُ وَالكَرَزُ.", "التُّولِيبُ وَالنَّرْجِسُ.", "Metinde hangi çiçekler geçiyor? Karanfil, yasemin, gül.", "İkinci seçenek meyveler; lale (التُّولِيبُ) 3. etkinlikte geçer."]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["فِي فَصْلِ الخَرِيفِ تَلْبَسُ الأَرْضُ لِبَاسَهَا الأَخْضَرَ.", "y", "Toprak yeşil elbisesini ilkbaharda giyer."],
      ["الجَوُّ فِي فَصْلِ الرَّبِيعِ مُعْتَدِلٌ عَادَةً.", "d", "وَيَكُونُ الجَوُّ مُعْتَدِلًا."],
      ["يُفَضِّلُ بَعْضُ النَّاسِ فَصْلَ الصَّيْفِ لِأَنَّهُمْ يَذْهَبُونَ إِلَى شَاطِئِ البَحْرِ.", "d", "Yazın yazlıklara ve havuzlara giderler."],
      ["يَتَجَوَّلُ النَّاسُ فِي الحَدَائِقِ الخَضْرَاءِ لِيَشُمُّوا الهَوَاءَ النَّظِيفَ.", "d", "İlkbaharda bahçelere çıkarlar (metinde: tabiatın tadını çıkarmak ve dinlenmek için)."],
      ["يَحْمِلُ النَّاسُ المِظَلَّاتِ فِي الشِّتَاءِ لِتَحْمِيَهُمْ مِنَ البَرْدِ.", "y", "Yağmurdan korusun diye: لِتَحْمِيَهُمْ مِنَ المَطَرِ."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["فِي فَصْلِ الخَرِيفِ تَلْبَسُ الأَرْضُ لِبَاسَهَا الأَخْضَرَ. ✗", "فِي فَصْلِ الرَّبِيعِ تَلْبَسُ الأَرْضُ ثَوْبَهَا الأَخْضَرَ.", "فِي فَصْلِ الشِّتَاءِ تَلْبَسُ الأَرْضُ ثَوْبَهَا الأَخْضَرَ.", "لَا تَلْبَسُ الأَرْضُ ثَوْبًا أَخْضَرَ أَبَدًا.", "İlkbaharda toprak yeşil elbisesini giyer.", ""],
      ["يَحْمِلُ النَّاسُ المِظَلَّاتِ لِتَحْمِيَهُمْ مِنَ البَرْدِ. ✗", "يَحْمِلُ النَّاسُ المِظَلَّاتِ لِتَحْمِيَهُمْ مِنَ المَطَرِ.", "يَحْمِلُ النَّاسُ المِظَلَّاتِ لِتَحْمِيَهُمْ مِنَ الرِّيَاحِ.", "يَحْمِلُ النَّاسُ المَدَافِئَ فِي الشَّوَارِعِ.", "İnsanlar şemsiyeyi yağmurdan korunmak için taşır.", ""]
    ])},
    { type: "classify", num: "٦", opts: FASL, ar: "اكْتُبِ اسْمَ الفَصْلِ الَّذِي تُشِيرُ إِلَيْهِ الجُمَلُ الآتِيَةُ", tr: "Cümle hangi mevsimi anlatıyor? (إِنَّهُ فَصْلُ …)", items: CL([
      ["بَارِدٌ جِدًّا تَتَسَاقَطُ فِيهِ الأَمْطَارُ، إِنَّهُ فَصْلُ …", "k", "إِنَّهُ فَصْلُ الشِّتَاءِ."],
      ["حَارٌّ وَمُشْمِسٌ وَتَنْشَطُ فِيهِ السِّيَاحَةُ، إِنَّهُ فَصْلُ …", "s", "إِنَّهُ فَصْلُ الصَّيْفِ."],
      ["تَتَسَاقَطُ فِيهِ أَوْرَاقُ الأَشْجَارِ، إِنَّهُ فَصْلُ …", "h", "إِنَّهُ فَصْلُ الخَرِيفِ."],
      ["تَتَفَتَّحُ فِيهِ الأَزْهَارُ وَيَعْتَدِلُ الجَوُّ، إِنَّهُ فَصْلُ …", "r", "إِنَّهُ فَصْلُ الرَّبِيعِ."]
    ]) },
    { type: "classify", num: "٧", opts: FASL, ar: "امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ (اسْمِ الفَصْلِ)", tr: "Boşluğa hangi mevsim gelir? (Kitaptaki sekiz cümle.)", items: CL([
      ["تَنْضَجُ الثِّمَارُ فِي فَصْلِ …", "s", "Yaz: meyveler çoğalır (bazıları sonbaharda da olgunlaşır)."],
      ["تَشْتَدُّ الرِّيَاحُ فِي فَصْلِ …", "h", "Sonbahar (kışın da olabilir)."],
      ["تُثْمِرُ الأَشْجَارُ فِي فَصْلِ …", "s", "Yaz: ağaçlar meyve verir."],
      ["يَشْتَدُّ الحَرُّ فِي فَصْلِ …", "s", "Yaz: sıcak artar."],
      ["تَسْقُطُ الأَمْطَارُ فِي فَصْلِ …", "k", "Kış: bol yağmur."],
      ["نَلْبَسُ مَلَابِسَ صُوفِيَّةً فِي فَصْلِ …", "k", "Kış."],
      ["تَسْقُطُ أَوْرَاقُ الأَشْجَارِ فِي فَصْلِ …", "h", "Sonbahar."],
      ["تُصْبِحُ الأَرْضُ خَضْرَاءَ فِي فَصْلِ …", "r", "İlkbahar."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Eş, Zıt, Çoğul", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Hava ve çiçek kelimeleriyle boşluk doldurmak", "Kelimeleri eş ve zıt anlamlılarıyla eşleştirmek", "Metinden çoğul isimleri bulup tekillerini yazmak", "Hava durumunu anlatmak"],
  examples: [
    { s: "غَيْمَةٌ:mz.Kelime / = سَحَابَةٌ:nasb.Eş", tr: "bulut = bulut", pair: "غُرُوبٌ:mz.Kelime / ≠ شُرُوقٌ:cerr.Zıt", pairTr: "gün batımı ≠ gün doğumu" }
  ],
  rules: [
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">غَيْمَةٌ = سَحَابَةٌ · هَطَلَ = نَزَلَ · ثَوْبٌ = لِبَاسٌ · مُعْتَدِلٌ = دَافِئٌ · يَتَغَيَّرُ = يَتَبَدَّلُ</span>" },
    { tr: "<b>Zıt anlam:</b> <span class=\"ar\">أُحِبُّ ≠ أَكْرَهُ · غُرُوبٌ ≠ شُرُوقٌ · سَعَادَةٌ ≠ حُزْنٌ · جَمِيلٌ ≠ قَبِيحٌ · خَلَعَ ≠ لَبِسَ · تَكْثُرُ ≠ تَقِلُّ</span>" },
    { tr: "<b>Metindeki çoğullar:</b> <span class=\"ar\">فُصُولٌ ← فَصْلٌ · أَزْهَارٌ ← زَهْرَةٌ · أَشْجَارٌ ← شَجَرَةٌ · حَدَائِقُ ← حَدِيقَةٌ · غَابَاتٌ ← غَابَةٌ · فَوَاكِهُ ← فَاكِهَةٌ · أَوْرَاقٌ ← وَرَقَةٌ · غُيُومٌ ← غَيْمٌ · رِيَاحٌ ← رِيحٌ · أَمْطَارٌ ← مَطَرٌ · ثُلُوجٌ ← ثَلْجٌ · جِبَالٌ ← جَبَلٌ · بُيُوتٌ ← بَيْتٌ · مِظَلَّاتٌ ← مِظَلَّةٌ</span>" }
  ],
  kaide: ["٣ ـ امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِالكَلِمَاتِ المُنَاسِبَةِ: (مُعْتَدِلٌ، التُّولِيبِ، حَارٌّ، الجُورِيِّ، المَنَاظِرَ، زَهْرَةِ، قَوِيَّةٌ).", "٤ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا. ٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا. ١١ ـ اسْتَخْرِجْ مِنْ نَصِّ القِرَاءَةِ خَمْسَةَ أَسْمَاءٍ بِصِيغَةِ الجَمْعِ، ثُمَّ اكْتُبْ مُفْرَدَ كُلٍّ مِنْهَا."],
  ex: [
    { type: "bank", num: "٣", ar: "امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِالكَلِمَاتِ المُنَاسِبَةِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Her kelime bir kez kullanılır.", bank: ["مُعْتَدِلٌ", "التُّولِيبِ", "حَارٌّ", "الجُورِيِّ", "المَنَاظِرَ", "زَهْرَةِ", "قَوِيَّةٌ"],
      tr2: "1) Yazın hava sıcak, güneş güçlüdür; ilkbaharda ise hava ılımandır. 2) Lale İstanbul’da çok meşhurdur. 3) Şam Şam gülüyle ve yasemin çiçeğiyle meşhurdur. 4) Yüksek dağdan muhteşem manzaraları ve güzel tabiatı seyrederiz.",
      parts: ["١ ـ الجَوُّ فِي فَصْلِ الصَّيْفِ", { a: [2] }, "، وَالشَّمْسُ", { a: [6] }, "، أَمَّا فِي فَصْلِ الرَّبِيعِ فَالطَّقْسُ", { a: [0] }, ".<br>٢ ـ زَهْرَةُ", { a: [1] }, "مَشْهُورَةٌ جِدًّا فِي إِسْطَنْبُولَ.<br>٣ ـ دِمَشْقُ مَشْهُورَةٌ بِالوَرْدِ", { a: [3] }, "، وَ", { a: [5] }, "اليَاسَمِينِ.<br>٤ ـ نُشَاهِدُ", { a: [4] }, "الرَّائِعَةَ، وَالطَّبِيعَةَ الجَمِيلَةَ مِنَ الجَبَلِ المُرْتَفِعِ."] },
    { type: "bank", num: "٤", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["نَزَلَ", "سَحَابَةٌ", "دَافِئٌ", "لِبَاسٌ", "يَتَبَدَّلُ"], items: [
      { pre: "غَيْمَةٌ =", a: [1], tr: "bulut = bulut" }, { pre: "هَطَلَ =", a: [0], tr: "yağdı = indi" }, { pre: "ثَوْبٌ =", a: [3], tr: "elbise = giysi" }, { pre: "مُعْتَدِلٌ =", a: [2], tr: "ılıman = ılık" }, { pre: "يَتَغَيَّرُ =", a: [4], tr: "değişir = değişir" }
    ]},
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["شُرُوقٌ", "حُزْنٌ", "أَكْرَهُ", "لَبِسَ", "تَقِلُّ", "قَبِيحٌ"], items: [
      { pre: "أُحِبُّ ≠", a: [2], tr: "severim ≠ sevmem" }, { pre: "غُرُوبٌ ≠", a: [0], tr: "gün batımı ≠ gün doğumu" }, { pre: "سَعَادَةٌ ≠", a: [1], tr: "mutluluk ≠ hüzün" }, { pre: "جَمِيلٌ ≠", a: [5], tr: "güzel ≠ çirkin" }, { pre: "خَلَعَ ≠", a: [3], tr: "çıkardı ≠ giydi" }, { pre: "تَكْثُرُ ≠", a: [4], tr: "çoğalır ≠ azalır" }
    ]},
    { type: "pick", fill: true, num: "١١", ar: "اسْتَخْرِجْ مِنْ نَصِّ القِرَاءَةِ أَسْمَاءً بِصِيغَةِ الجَمْعِ، ثُمَّ اكْتُبْ مُفْرَدَهَا", tr: "Metindeki çoğulun tekilini seç (kitap beşini istiyor; burada on tane var).", items: PL([
      ["فُصُولٌ ← ___", "فَصْلٌ", "فَصِيلٌ", "فَاصِلٌ", "mevsimler → mevsim", "فُعُولٌ kalıbı."],
      ["أَزْهَارٌ ← ___", "زَهْرَةٌ", "زُهُورٌ", "زَاهِرٌ", "çiçekler → çiçek", "زُهُورٌ da çoğuldur."],
      ["أَشْجَارٌ ← ___", "شَجَرَةٌ", "شُجَيْرَةٌ", "شَاجِرٌ", "ağaçlar → ağaç", ""],
      ["حَدَائِقُ ← ___", "حَدِيقَةٌ", "حَدَقَةٌ", "حَدَّاقٌ", "bahçeler → bahçe", "فَعَائِلُ kalıbı."],
      ["أَوْرَاقٌ ← ___", "وَرَقَةٌ", "وَرِقٌ", "وَارِقٌ", "yapraklar → yaprak", ""],
      ["رِيَاحٌ ← ___", "رِيحٌ", "رَوْحٌ", "رَائِحَةٌ", "rüzgârlar → rüzgâr", "رَائِحَةٌ: koku."],
      ["أَمْطَارٌ ← ___", "مَطَرٌ", "مُمْطِرٌ", "مَطْرَةٌ", "yağmurlar → yağmur", ""],
      ["ثُلُوجٌ ← ___", "ثَلْجٌ", "ثَلَّاجَةٌ", "ثُلُثٌ", "karlar → kar", "ثَلَّاجَةٌ: buzdolabı."],
      ["جِبَالٌ ← ___", "جَبَلٌ", "جُبْلٌ", "جَبَالَةٌ", "dağlar → dağ", "فِعَالٌ kalıbı."],
      ["مِظَلَّاتٌ ← ___", "مِظَلَّةٌ", "ظِلٌّ", "مَظْلُولٌ", "şemsiyeler → şemsiye", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE
{
  id: "u4", no: 4, ar: "تَرْتِيبُ الجُمَلِ وَالتَّرَاكِيبُ", tr: "Cümle ve Paragraf Kurma, Kalıplar", short: "Cümle", col: "ref", legend: ["mz", "cerr"],
  goals: ["Cümleleri sıralayıp anlamlı bir paragraf kurmak", "Karışık kelimelerden anlamlı cümle kurmak", "أَمَّا… فَـ… kalıbını kullanmak", "كَثِيرًا مِنَ / قَلِيلًا مِنَ + çoğul isim kalıbını kullanmak"],
  examples: [
    { s: "فَصْلُ الرَّبِيعِ فَصْلِي المُفَضَّلُ،:mz / أَمَّا:cerr.أَمَّا / الفَصْلُ الثَّانِي الَّذِي أُحِبُّهُ:- / فَهُوَ:cerr.فَـ / فَصْلُ الصَّيْفِ.:mz", tr: "İlkbahar en sevdiğim mevsim; sevdiğim ikinci mevsim ise yazdır." },
    { s: "شَاهَدْتُ:- / كَثِيرًا مِنَ:cerr / الأَزْهَارِ:mz.Çoğul / وَقَلِيلًا مِنَ:cerr / الحَيَوَانَاتِ.:mz.Çoğul", tr: "Bahçede birçok çiçek ve az sayıda hayvan gördüm." }
  ],
  rules: [
    { tr: "<b>أَمَّا… فَـ…</b> (“… ise”): bir önceki bilgiden sonra yeni bir konuya geçmek ya da karşılaştırmak için. <span class=\"ar\">أَمَّا</span>’dan sonraki isim mübtedâdır, cevap <span class=\"ar\">فَـ</span> ile başlar: <span class=\"ar\">أَمَّا الخَرِيفُ فَهُوَ فَصْلٌ جَمِيلٌ</span>." },
    { tr: "<b>كَثِيرًا مِنَ / قَلِيلًا مِنَ + çoğul</b>: “birçok / az sayıda …”: <span class=\"ar\">قَرَأْتُ كَثِيرًا مِنَ الكُتُبِ · أَكَلْتُ قَلِيلًا مِنَ الفَوَاكِهِ</span>. Ardından gelen isim belirli ve çoğuldur." },
    { tr: "<b>Paragraf sırası:</b> zaman ve yer (<span class=\"ar\">ذَهَبْتُ… فِي الخَرِيفِ</span>) → amaç (<span class=\"ar\">لِمُشَاهَدَةِ…</span>) → olay (<span class=\"ar\">فَرَأَيْتُ…</span>) → ayrıntı (<span class=\"ar\">لَيْسَ لَهَا أَوْرَاقٌ</span>) → soru → cevap. <span class=\"ar\">فَـ</span> “ve hemen ardından” anlamı verir." }
  ],
  kaide: ["٨ ـ رَتِّبِ الجُمَلَ، لِتَحْصُلَ عَلَى فِقْرَةٍ صَحِيحَةٍ. ٩ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً.", "١٠ ـ لَاحِظِ التَّرْكِيبَ الَّذِي تَحْتَهُ خَطٌّ فِيمَا يَأْتِي، ثُمَّ اكْتُبْ مِثَالَيْنِ لِكُلِّ تَرْكِيبٍ: فَصْلُ الرَّبِيعِ فَصْلِي المُفَضَّلُ، أَمَّا الفَصْلُ الثَّانِي الَّذِي أُحِبُّهُ فَهُوَ فَصْلُ الصَّيْفِ. شَاهَدْتُ كَثِيرًا مِنَ الأَزْهَارِ فِي الحَدِيقَةِ، وَقَلِيلًا مِنَ الحَيَوَانَاتِ."],
  ex: [
    { type: "bank", num: "٨", ar: "رَتِّبِ الجُمَلَ، لِتَحْصُلَ عَلَى فِقْرَةٍ صَحِيحَةٍ", tr: "Önce aşağıdan cümleyi seç, sonra sıradaki kutuya dokun (1 = paragrafın ilk cümlesi).", bank: ["لَيْسَ لَهَا أَوْرَاقٌ.", "فَقَالَ: إِنَّهَا شَجَرَةُ التِّينِ.", "فَرَأَيْتُ شَجَرَةً كَبِيرَةً", "فَسَأَلْتُ أَبِي عَنْهَا", "لِمُشَاهَدَةِ بُسْتَانِ عَمِّي", "ذَهَبْتُ مَعَ أَبِي فِي الخَرِيفِ"], items: [
      { pre: "١", a: [5], tr: "Sonbaharda babamla gittim" }, { pre: "٢", a: [4], tr: "amcamın bostanını görmek için." }, { pre: "٣", a: [2], tr: "Büyük bir ağaç gördüm," }, { pre: "٤", a: [0], tr: "yaprakları yoktu." }, { pre: "٥", a: [3], tr: "Babama onu sordum," }, { pre: "٦", a: [1], tr: "“O bir incir ağacı” dedi." }
    ]},
    { type: "bank", num: "٩", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["الأَزْهَارُ", "فِي", "فَصْلِ", "الرَّبِيعِ", "دَائِمًا", "الحَدَائِقِ", "الخَضْرَاءِ", "بِالمَنَاظِرِ", "الجَمِيلَةِ", "الحَدِيقَةِ", "المَلَابِسَ", "الخَفِيفَةَ", "الصَّيْفِ", "الجَوُّ", "الخَرِيفِ", "إِلَى", "البُرُودَةِ"],
      tr2: "1) İlkbaharda çiçekler açar. 2) Hep yeşil bahçelerde gezinirim. 3) Bahçedeki güzel manzaraların tadını çıkarırım. 4) Yazın ince giysiler giyerim. 5) Sonbaharda hava serinlemeye meyleder.",
      parts: ["١ ـ تَتَفَتَّحُ", { a: [0] }, { a: [1] }, { a: [2] }, { a: [3] }, ".<br>٢ ـ أَتَجَوَّلُ", { a: [4] }, { a: [1] }, { a: [5] }, { a: [6] }, ".<br>٣ ـ أَسْتَمْتِعُ", { a: [7] }, { a: [8] }, { a: [1] }, { a: [9] }, ".<br>٤ ـ أَرْتَدِي", { a: [10] }, { a: [11] }, { a: [1] }, { a: [2] }, { a: [12] }, ".<br>٥ ـ يَمِيلُ", { a: [13] }, { a: [1] }, { a: [2] }, { a: [14] }, { a: [15] }, { a: [16] }, "."] },
    { type: "pick", num: "١٠", ar: "لَاحِظِ التَّرْكِيبَ، ثُمَّ اكْتُبْ مِثَالَيْنِ لِكُلِّ تَرْكِيبٍ", tr: "Kalıbı doğru kullanan cümleyi seç; sonra defterine her kalıp için iki örnek yaz.", items: PL([
      ["أَمَّا… فَـ…", "أُحِبُّ الشِّتَاءَ، أَمَّا أَخِي فَيُحِبُّ الصَّيْفَ.", "أُحِبُّ الشِّتَاءَ، أَمَّا أَخِي يُحِبُّ الصَّيْفَ.", "أُحِبُّ الشِّتَاءَ، فَأَمَّا أَخِي الصَّيْفَ.", "Ben kışı severim, kardeşim ise yazı sever.", "Cevap فَـ ile başlamalı."],
      ["أَمَّا… فَـ…", "الصَّيْفُ حَارٌّ، أَمَّا الشِّتَاءُ فَبَارِدٌ.", "الصَّيْفُ حَارٌّ، أَمَّا الشِّتَاءُ بَارِدٌ.", "أَمَّا الصَّيْفُ حَارٌّ فَالشِّتَاءُ.", "Yaz sıcaktır, kış ise soğuktur.", ""],
      ["كَثِيرًا مِنَ + çoğul", "قَرَأْتُ كَثِيرًا مِنَ الكُتُبِ فِي العُطْلَةِ.", "قَرَأْتُ كَثِيرًا مِنَ الكِتَابِ.", "قَرَأْتُ كَثِيرٌ الكُتُبُ.", "Tatilde birçok kitap okudum.", "Ardından belirli çoğul: الكُتُبِ."],
      ["قَلِيلًا مِنَ + çoğul", "رَأَيْتُ قَلِيلًا مِنَ الطُّيُورِ فِي الشِّتَاءِ.", "رَأَيْتُ قَلِيلًا مِنْ طَيْرٍ.", "رَأَيْتُ قَلِيلٌ الطُّيُورَ.", "Kışın az sayıda kuş gördüm.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · NEFY
{
  id: "u5", no: 5, ar: "حُرُوفُ النَّفْيِ", tr: "Olumsuzluk Edatları: مَا، لَمْ، لَا، لَنْ، لَيْسَ", short: "Nefy", col: "muz", legend: ["mi", "ref"],
  goals: ["Beş olumsuzluk edatını ve hangi cümleyle geldiğini bilmek", "لَمْ’dan sonra fiilin meczûm, لَنْ’den sonra mansûb olduğunu bilmek", "لَيْسَ ile isim cümlesini olumsuz yapmak", "Olumlu cümleyi uygun edatla olumsuz yapmak"],
  examples: [
    { s: "فَهِمْتُ الدَّرْسَ:ref.Mâzî / ← مَا:mi / فَهِمْتُ الدَّرْسَ:ref", tr: "Dersi anladım → Dersi anlamadım.", pair: "فَهِمْتُ الدَّرْسَ:ref / ← لَمْ:mi / أَفْهَمِ الدَّرْسَ:ref.Meczûm", pairTr: "Dersi anladım → Dersi anlamadım." },
    { s: "أَفْهَمُ الدَّرْسَ:ref.Muzâri / ← لَا:mi / أَفْهَمُ الدَّرْسَ:ref", tr: "Dersi anlıyorum → Dersi anlamıyorum.", pair: "سَأَفْهَمُ الدَّرْسَ:ref / ← لَنْ:mi / أَفْهَمَ الدَّرْسَ:ref.Mansûb", pairTr: "Dersi anlayacağım → Dersi anlamayacağım." },
    { s: "الدَّرْسُ مَفْهُومٌ:ref.İsim cümlesi / ← الدَّرْسُ:- / لَيْسَ:mi / مَفْهُومًا:ref.Mansûb", tr: "Ders anlaşılır → Ders anlaşılır değil." }
  ],
  rules: [
    { tr: "<b>Dikkat et (لَاحِظْ): olumsuzluk edatları</b><br>1. <span class=\"ar\">مَا + mâzî</span>: <span class=\"ar\">فَهِمْتُ الدَّرْسَ ← مَا فَهِمْتُ الدَّرْسَ</span><br>2. <span class=\"ar\">لَمْ + muzâri meczûm</span>: <span class=\"ar\">فَهِمْتُ الدَّرْسَ ← لَمْ أَفْهَمِ الدَّرْسَ</span> (anlam geçmiş)<br>3. <span class=\"ar\">لَا + muzâri</span>: <span class=\"ar\">يَفْهَمُ الدَّرْسَ ← لَا يَفْهَمُ الدَّرْسَ</span><br>4. <span class=\"ar\">لَنْ + muzâri mansûb</span>: <span class=\"ar\">يَفْهَمُ الدَّرْسَ ← لَنْ أَفْهَمَ الدَّرْسَ</span> (gelecek)<br>5. <span class=\"ar\">لَيْسَ + isim cümlesi</span>: <span class=\"ar\">الدَّرْسُ مَفْهُومٌ ← الدَّرْسُ لَيْسَ مَفْهُومًا</span>" },
    { tr: "<b>Cezm ve nasb:</b> <span class=\"ar\">لَمْ</span> sondaki ötreyi sükûn yapar (<span class=\"ar\">أَذْهَبُ ← لَمْ أَذْهَبْ</span>); sükûnlu harften sonra <span class=\"ar\">ال</span> gelirse esre okunur (<span class=\"ar\">لَمْ أَفْهَمِ الدَّرْسَ</span>). <span class=\"ar\">لَنْ</span> ötreyi üstün yapar (<span class=\"ar\">لَنْ أَذْهَبَ</span>)." },
    { tr: "<b>لَيْسَ çekimi:</b> <span class=\"ar\">لَيْسَ</span> (o, e.) · <span class=\"ar\">لَيْسَتْ</span> (o, k.) · <span class=\"ar\">لَسْتُ</span> (ben) · <span class=\"ar\">لَسْنَا</span> (biz). Metinde: <span class=\"ar\">الشَّمْسُ لَيْسَتْ قَوِيَّةً</span>. Haberi mansûb: <span class=\"ar\">قَوِيَّةً</span>." }
  ],
  kaide: ["لَاحِظْ: حُرُوفُ النَّفْيِ: ١. مَا … فِعْلٌ مَاضٍ: فَهِمْتُ الدَّرْسَ ← مَا فَهِمْتُ الدَّرْسَ. ٢. لَمْ … فِعْلٌ مُضَارِعٌ مَجْزُومٌ: فَهِمْتُ الدَّرْسَ ← لَمْ أَفْهَمِ الدَّرْسَ.", "٣. لَا … فِعْلٌ مُضَارِعٌ: يَفْهَمُ الدَّرْسَ ← لَا يَفْهَمُ الدَّرْسَ. ٤. لَنْ … فِعْلٌ مُضَارِعٌ مَنْصُوبٌ: يَفْهَمُ الدَّرْسَ ← لَنْ أَفْهَمَ الدَّرْسَ. ٥. لَيْسَ … الجُمْلَةُ الاسْمِيَّةُ: الدَّرْسُ مَفْهُومٌ ← الدَّرْسُ لَيْسَ مَفْهُومًا."],
  ex: [
    { type: "pick", fill: true, ar: "انْفِ الجُمَلَ الآتِيَةَ بِحَرْفِ النَّفْيِ المُنَاسِبِ", tr: "Cümleye uygun olumsuzluk edatını seç.", items: PL([
      ["___ ذَهَبْتُ إِلَى المَدْرَسَةِ أَمْسِ.", "مَا", "لَا", "لَنْ", "Dün okula gitmedim.", "Mâzî fiil ← مَا"],
      ["___ يَهْطِلُ المَطَرُ فِي الصَّيْفِ كَثِيرًا.", "لَا", "مَا", "لَمْ", "Yazın çok yağmur yağmaz.", "Muzâri (merfû) ← لَا"],
      ["___ أَلْبَسَ المِعْطَفَ غَدًا.", "لَنْ", "لَمْ", "مَا", "Yarın paltoyu giymeyeceğim.", "Mansûb fiil + gelecek ← لَنْ"],
      ["___ أَخْرُجْ مِنَ البَيْتِ أَمْسِ.", "لَمْ", "لَنْ", "لَا", "Dün evden çıkmadım.", "Meczûm fiil ← لَمْ"],
      ["الجَوُّ ___ بَارِدًا اليَوْمَ.", "لَيْسَ", "لَا", "لَمْ", "Bugün hava soğuk değil.", "İsim cümlesi ← لَيْسَ"],
      ["الشَّمْسُ ___ قَوِيَّةً فِي الرَّبِيعِ.", "لَيْسَتْ", "لَيْسَ", "لَا", "İlkbaharda güneş güçlü değildir.", "Dişil özne ← لَيْسَتْ (metinden)."],
      ["___ تَتَسَاقَطُ الأَوْرَاقُ فِي الرَّبِيعِ.", "لَا", "مَا", "لَيْسَ", "İlkbaharda yapraklar dökülmez.", ""],
      ["___ يَخْلَعَ النَّاسُ مَلَابِسَهُمُ الصُّوفِيَّةَ فِي الشِّتَاءِ.", "لَنْ", "لَمْ", "مَا", "İnsanlar kışın yün giysilerini çıkarmayacak.", "Mansûb fiil (يَخْلَعَ) ← لَنْ"]
    ])},
    { type: "pick", fill: true, ar: "اخْتَرِ الصِّيغَةَ الصَّحِيحَةَ لِلْفِعْلِ بَعْدَ حَرْفِ النَّفْيِ", tr: "Olumsuzluk edatından sonra fiilin doğru biçimini seç.", items: PL([
      ["لَمْ ___ إِلَى الحَدِيقَةِ.", "أَذْهَبْ", "أَذْهَبُ", "ذَهَبْتُ", "Parka gitmedim.", "لَمْ + meczûm: sükûn."],
      ["لَنْ ___ إِلَى الحَدِيقَةِ.", "أَذْهَبَ", "أَذْهَبْ", "أَذْهَبُ", "Parka gitmeyeceğim.", "لَنْ + mansûb: üstün."],
      ["لَا ___ إِلَى الحَدِيقَةِ.", "أَذْهَبُ", "أَذْهَبَ", "ذَهَبْتُ", "Parka gitmiyorum.", "لَا + merfû: ötre değişmez."],
      ["مَا ___ إِلَى الحَدِيقَةِ.", "ذَهَبْتُ", "أَذْهَبْ", "أَذْهَبَ", "Parka gitmedim.", "مَا + mâzî."],
      ["لَمْ ___ المَطَرُ.", "يَهْطِلِ", "يَهْطِلُ", "يَهْطِلَ", "Yağmur yağmadı.", "Meczûm + ال: sükûn esreye döner."],
      ["الحَدِيقَةُ لَيْسَتْ ___ .", "قَرِيبَةً", "قَرِيبَةٌ", "قَرِيبَةٍ", "Park yakın değil.", "لَيْسَ’in haberi mansûb."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "حَوِّلِ الجُمْلَةَ إِلَى النَّفْيِ", tr: "Olumlu cümlenin istenen edatla olumsuz hâlini seç.", items: PL([
      ["فَهِمْتُ الدَّرْسَ. (لَمْ) ← ___", "لَمْ أَفْهَمِ الدَّرْسَ.", "لَمْ فَهِمْتُ الدَّرْسَ.", "لَمْ أَفْهَمُ الدَّرْسَ.", "Dersi anlamadım.", "لَمْ + muzâri meczûm."],
      ["الجَوُّ حَارٌّ. (لَيْسَ) ← ___", "الجَوُّ لَيْسَ حَارًّا.", "الجَوُّ لَيْسَ حَارٌّ.", "لَيْسَ الجَوُّ حَارٌّ.", "Hava sıcak değil.", ""],
      ["يَلْبَسُ النَّاسُ المَلَابِسَ الخَفِيفَةَ. (لَا) ← ___", "لَا يَلْبَسُ النَّاسُ المَلَابِسَ الخَفِيفَةَ.", "لَا لَبِسَ النَّاسُ المَلَابِسَ الخَفِيفَةَ.", "لَا يَلْبَسِ النَّاسُ المَلَابِسَ الخَفِيفَةَ.", "İnsanlar ince giysiler giymiyor.", ""],
      ["أَذْهَبُ إِلَى المَصَايِفِ. (لَنْ) ← ___", "لَنْ أَذْهَبَ إِلَى المَصَايِفِ.", "لَنْ أَذْهَبُ إِلَى المَصَايِفِ.", "لَنْ ذَهَبْتُ إِلَى المَصَايِفِ.", "Yazlıklara gitmeyeceğim.", ""],
      ["هَطَلَ الثَّلْجُ. (مَا) ← ___", "مَا هَطَلَ الثَّلْجُ.", "مَا يَهْطِلَ الثَّلْجُ.", "مَا هَطَلَتِ الثَّلْجُ.", "Kar yağmadı.", ""]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["فِي السَّنَةِ {أَرْبَعَةُ} فُصُولٍ.", ["أَرْبَعَةُ", "ثَلَاثَةُ", "خَمْسَةُ"], "metin", "Yılda dört mevsim vardır.", "u1"],
  ["فَصْلُ الرَّبِيعِ فَصْلُ الجَمَالِ وَ{الحَيَاةِ}.", ["الحَيَاةِ", "البُرُودَةِ", "الحُزْنِ"], "metin", "İlkbahar güzellik ve hayat mevsimidir.", "u1"],
  ["فِيهِ {تَتَفَتَّحُ} أَزْهَارُ الأَشْجَارِ.", ["تَتَفَتَّحُ", "تَتَسَاقَطُ", "تَصْفَرُّ"], "metin", "Ağaçların çiçekleri açar.", "u1"],
  ["وَتَلْبَسُ الأَرْضُ ثَوْبَهَا {الأَخْضَرَ}.", ["الأَخْضَرَ", "الأَبْيَضَ", "الأَصْفَرَ"], "metin", "Toprak yeşil elbisesini giyer.", "u1"],
  ["وَيَكُونُ الجَوُّ {مُعْتَدِلًا}.", ["مُعْتَدِلًا", "حَارًّا", "بَارِدًا"], "metin", "Hava ılıman olur.", "u1"],
  ["يَذْهَبُ النَّاسُ إِلَى المَصَايِفِ وَ{المَسَابِحِ}.", ["المَسَابِحِ", "المَدَافِئِ", "المِظَلَّاتِ"], "metin", "Yazlıklara ve havuzlara giderler.", "u1"],
  ["يُعِدُّ {الفَلَّاحُونَ} أَرْضَهُمْ لِلزِّرَاعَةِ.", ["الفَلَّاحُونَ", "الطُّلَّابُ", "المُعَلِّمُونَ"], "anlama", "Çiftçiler topraklarını ekime hazırlar.", "u2"],
  ["وَتَبْدَأُ أَوْرَاقُ الأَشْجَارِ بِ{التَّسَاقُطِ}.", ["التَّسَاقُطِ", "التَّفَتُّحِ", "النُّمُوِّ"], "anlama", "Yapraklar dökülmeye başlar.", "u2"],
  ["يَجْلِسُ النَّاسُ حَوْلَ {المِدْفَأَةِ}.", ["المِدْفَأَةِ", "المَسْبَحِ", "الشَّاطِئِ"], "anlama", "İnsanlar sobanın etrafında oturur.", "u2"],
  ["تَتَسَاقَطُ فِيهِ أَوْرَاقُ الأَشْجَارِ، إِنَّهُ فَصْلُ {الخَرِيفِ}.", ["الخَرِيفِ", "الرَّبِيعِ", "الصَّيْفِ"], "mevsim", "O sonbahardır.", "u2"],
  ["زَهْرَةُ {التُّولِيبِ} مَشْهُورَةٌ فِي إِسْطَنْبُولَ.", ["التُّولِيبِ", "الجُورِيِّ", "القَرَنْفُلِ"], "boşluk", "Lale İstanbul’da meşhurdur.", "u3"],
  ["غَيْمَةٌ = {سَحَابَةٌ}.", ["سَحَابَةٌ", "شَجَرَةٌ", "ثَلْجَةٌ"], "eş anlam", "Bulut = bulut.", "u3"],
  ["غُرُوبٌ ≠ {شُرُوقٌ}.", ["شُرُوقٌ", "حُزْنٌ", "مَطَرٌ"], "zıt", "Gün batımı ≠ gün doğumu.", "u3"],
  ["خَلَعَ ≠ {لَبِسَ}.", ["لَبِسَ", "حَمَلَ", "جَلَسَ"], "zıt", "Çıkardı ≠ giydi.", "u3"],
  ["أَوْرَاقٌ ← {وَرَقَةٌ}.", ["وَرَقَةٌ", "وَرِقٌ", "رِيقٌ"], "tekil", "Yapraklar → yaprak.", "u3"],
  ["أَمَّا فَصْلُ الصَّيْفِ {فَـ}يَذْهَبُ النَّاسُ فِيهِ إِلَى المَصَايِفِ.", ["فَـ", "وَ", "ثُمَّ"], "أَمَّا", "Yaz mevsiminde ise insanlar yazlıklara gider.", "u4"],
  ["شَاهَدْتُ كَثِيرًا {مِنَ} الأَزْهَارِ.", ["مِنَ", "عَلَى", "إِلَى"], "kalıp", "Birçok çiçek gördüm.", "u4"],
  ["ذَهَبْتُ مَعَ أَبِي فِي {الخَرِيفِ}.", ["الخَرِيفِ", "المَطَرِ", "التِّينِ"], "paragraf", "Sonbaharda babamla gittim.", "u4"],
  ["{مَا} فَهِمْتُ الدَّرْسَ.", ["مَا", "لَنْ", "لَا"], "nefy", "Dersi anlamadım.", "u5"],
  ["لَمْ {أَفْهَمِ} الدَّرْسَ.", ["أَفْهَمِ", "أَفْهَمُ", "فَهِمْتُ"], "nefy", "Dersi anlamadım.", "u5"],
  ["لَنْ {أَفْهَمَ} الدَّرْسَ.", ["أَفْهَمَ", "أَفْهَمْ", "أَفْهَمُ"], "nefy", "Dersi anlamayacağım.", "u5"],
  ["الدَّرْسُ لَيْسَ {مَفْهُومًا}.", ["مَفْهُومًا", "مَفْهُومٌ", "مَفْهُومٍ"], "nefy", "Ders anlaşılır değil.", "u5"],
  ["الشَّمْسُ {لَيْسَتْ} قَوِيَّةً.", ["لَيْسَتْ", "لَيْسَ", "لَمْ"], "nefy", "Güneş güçlü değil.", "u5"],
  ["{لَا} يَفْهَمُ الدَّرْسَ.", ["لَا", "لَمْ", "لَنْ"], "nefy", "Dersi anlamıyor.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["الشَّمْسُ فِي الرَّبِيعِ قَوِيَّةٌ ← metne göre düzelt", "الشَّمْسُ فِي الرَّبِيعِ لَيْسَتْ قَوِيَّةً", "الشَّمْسُ فِي الرَّبِيعِ حَارَّةٌ جِدًّا", "لَا شَمْسَ فِي الرَّبِيعِ", "وَالشَّمْسُ عَادَةً لَيْسَتْ قَوِيَّةً.", "u1"],
  ["تَتَسَاقَطُ الأَوْرَاقُ فِي الرَّبِيعِ ← metne göre düzelt", "تَتَسَاقَطُ الأَوْرَاقُ فِي الخَرِيفِ", "تَتَسَاقَطُ الأَوْرَاقُ فِي الصَّيْفِ", "لَا تَتَسَاقَطُ الأَوْرَاقُ", "Sonbahar.", "u2"],
  ["يَحْمِلُونَ المِظَلَّاتِ لِتَحْمِيَهُمْ مِنَ البَرْدِ ← düzelt", "يَحْمِلُونَ المِظَلَّاتِ لِتَحْمِيَهُمْ مِنَ المَطَرِ", "يَحْمِلُونَ المَدَافِئَ لِتَحْمِيَهُمْ مِنَ البَرْدِ", "يَحْمِلُونَ المِظَلَّاتِ لِتَحْمِيَهُمْ مِنَ الشَّمْسِ", "Yağmurdan.", "u2"],
  ["هَطَلَ ← eş anlam", "نَزَلَ", "سَقَطَ", "خَلَعَ", "yağdı = indi", "u3"],
  ["يَتَغَيَّرُ ← eş anlam", "يَتَبَدَّلُ", "يَتَفَتَّحُ", "يَتَجَوَّلُ", "değişir", "u3"],
  ["سَعَادَةٌ ← zıt anlam", "حُزْنٌ", "جَمَالٌ", "حَيَاةٌ", "mutluluk ≠ hüzün", "u3"],
  ["تَكْثُرُ ← zıt anlam", "تَقِلُّ", "تَهْطِلُ", "تَنْمُو", "çoğalır ≠ azalır", "u3"],
  ["حَدَائِقُ ← tekil", "حَدِيقَةٌ", "حَدَقَةٌ", "حِدَادٌ", "bahçeler → bahçe", "u3"],
  ["… الخَرِيفُ فَهُوَ فَصْلٌ جَمِيلٌ ← kalıp", "أَمَّا الخَرِيفُ فَهُوَ فَصْلٌ جَمِيلٌ", "لَكِنَّ الخَرِيفُ فَهُوَ فَصْلٌ جَمِيلٌ", "هَلِ الخَرِيفُ فَهُوَ فَصْلٌ جَمِيلٌ", "أَمَّا… فَـ…", "u4"],
  ["الخَضْرَاءِ، أَتَجَوَّلُ، الحَدَائِقِ، دَائِمًا، فِي ← sırala", "أَتَجَوَّلُ دَائِمًا فِي الحَدَائِقِ الخَضْرَاءِ", "الحَدَائِقِ أَتَجَوَّلُ فِي دَائِمًا الخَضْرَاءِ", "دَائِمًا الخَضْرَاءِ فِي أَتَجَوَّلُ الحَدَائِقِ", "Kitaptaki 9. etkinlik.", "u4"],
  ["فَهِمْتُ الدَّرْسَ ← لَمْ", "لَمْ أَفْهَمِ الدَّرْسَ", "لَمْ فَهِمْتُ الدَّرْسَ", "لَمْ أَفْهَمُ الدَّرْسَ", "لَمْ + meczûm", "u5"],
  ["يَفْهَمُ الدَّرْسَ ← لَنْ", "لَنْ يَفْهَمَ الدَّرْسَ", "لَنْ يَفْهَمْ الدَّرْسَ", "لَنْ فَهِمَ الدَّرْسَ", "لَنْ + mansûb", "u5"],
  ["الجَوُّ بَارِدٌ ← لَيْسَ", "الجَوُّ لَيْسَ بَارِدًا", "الجَوُّ لَيْسَ بَارِدٌ", "الجَوُّ لَا بَارِدٌ", "Haber mansûb.", "u5"],
  ["خَرَجْتُ مِنَ البَيْتِ ← مَا", "مَا خَرَجْتُ مِنَ البَيْتِ", "مَا أَخْرُجَ مِنَ البَيْتِ", "مَا أَخْرُجْ مِنَ البَيْتِ", "مَا + mâzî", "u5"]
];
// Hangi mevsim? hız oyunu
var NOUN_LIST = [].concat(UNITS[1].ex[3].items, UNITS[1].ex[4].items).map(function (it) { return [it.s, it.a, it.why]; }).concat([
  ["تَتَفَتَّحُ الأَزْهَارُ وَتَلْبَسُ الأَرْضُ ثَوْبَهَا الأَخْضَرَ.", "r", "İlkbahar."], ["يَذْهَبُ النَّاسُ إِلَى المَصَايِفِ وَالمَسَابِحِ.", "s", "Yaz."], ["يُعِدُّ الفَلَّاحُونَ أَرْضَهُمْ لِلزِّرَاعَةِ.", "h", "Sonbahar."], ["تَهْطِلُ ثُلُوجٌ كَثِيرَةٌ فَوْقَ الجِبَالِ.", "k", "Kış."],
  ["يَجْلِسُ النَّاسُ حَوْلَ المِدْفَأَةِ.", "k", "Kış."], ["تَصْفَرُّ أَوْرَاقُ الأَشْجَارِ.", "h", "Sonbahar."], ["يَكْثُرُ العِنَبُ وَالتِّينُ وَالكَرَزُ.", "s", "Yaz."], ["يَخْلَعُ النَّاسُ لِبَاسَهُمُ الثَّقِيلَ.", "r", "İlkbahar."]
]);
var SP_M = FASL;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt / eş", pairs: [["غُرُوبٌ", "شُرُوقٌ"], ["سَعَادَةٌ", "حُزْنٌ"], ["جَمِيلٌ", "قَبِيحٌ"], ["خَلَعَ", "لَبِسَ"], ["تَكْثُرُ", "تَقِلُّ"], ["غَيْمَةٌ", "سَحَابَةٌ"], ["هَطَلَ", "نَزَلَ"], ["ثَوْبٌ", "لِبَاسٌ"]] },
  ft: { name: "Mevsim ↔ özelliği", pairs: [["الرَّبِيعُ", "تَتَفَتَّحُ الأَزْهَارُ"], ["الصَّيْفُ", "يَشْتَدُّ الحَرُّ"], ["الخَرِيفُ", "تَتَسَاقَطُ الأَوْرَاقُ"], ["الشِّتَاءُ", "تَهْطِلُ الثُّلُوجُ"], ["المِظَلَّةُ", "المَطَرُ"], ["المِدْفَأَةُ", "البَرْدُ"]] },
  nf: { name: "Edat ↔ fiil biçimi", pairs: [["مَا", "فَهِمْتُ"], ["لَمْ", "أَفْهَمْ"], ["لَا", "أَفْهَمُ"], ["لَنْ", "أَفْهَمَ"], ["لَيْسَ", "مَفْهُومًا"], ["لَيْسَتْ", "قَوِيَّةً"]] }
};
var KARTLAR = [
  ["Dört mevsim?", "الرَّبِيعُ (ilkbahar) · الصَّيْفُ (yaz) · الخَرِيفُ (sonbahar) · الشِّتَاءُ (kış)"],
  ["İlkbahar nasıldır?", "فَصْلُ الجَمَالِ وَالحَيَاةِ · تَتَفَتَّحُ الأَزْهَارُ · الجَوُّ مُعْتَدِلٌ · الشَّمْسُ لَيْسَتْ قَوِيَّةً · المَلَابِسُ الخَفِيفَةُ"],
  ["Yaz nasıldır?", "المَصَايِفُ وَالمَسَابِحُ · عُطْلَةُ الطُّلَّابِ · العِنَبُ وَالتِّينُ وَالكَرَزُ · الجَوُّ حَارٌّ"],
  ["Sonbahar nasıldır?", "الفَلَّاحُونَ يُعِدُّونَ الأَرْضَ · تَتَسَاقَطُ الأَوْرَاقُ وَتَصْفَرُّ · الغُيُومُ وَالرِّيَاحُ · يَمِيلُ إِلَى البُرُودَةِ"],
  ["Kış nasıldır?", "الجَوُّ بَارِدٌ · أَمْطَارٌ غَزِيرَةٌ وَثُلُوجٌ · المِدْفَأَةُ · المَلَابِسُ الصُّوفِيَّةُ · المِظَلَّاتُ"],
  ["Metindeki çiçekler?", "القَرَنْفُلُ (karanfil) · اليَاسَمِينُ (yasemin) · الجُورِيُّ (Şam gülü) · ayrıca التُّولِيبُ (lale)"],
  ["Eş anlamlar?", "غَيْمَةٌ = سَحَابَةٌ · هَطَلَ = نَزَلَ · ثَوْبٌ = لِبَاسٌ · مُعْتَدِلٌ = دَافِئٌ · يَتَغَيَّرُ = يَتَبَدَّلُ"],
  ["Zıt anlamlar?", "غُرُوبٌ ≠ شُرُوقٌ · سَعَادَةٌ ≠ حُزْنٌ · جَمِيلٌ ≠ قَبِيحٌ · خَلَعَ ≠ لَبِسَ · تَكْثُرُ ≠ تَقِلُّ"],
  ["أَمَّا… فَـ…?", "“… ise”: أَمَّا الصَّيْفُ فَحَارٌّ · cevap فَـ ile başlar"],
  ["كَثِيرًا مِنَ / قَلِيلًا مِنَ?", "+ belirli çoğul: كَثِيرًا مِنَ الأَزْهَارِ · قَلِيلًا مِنَ الحَيَوَانَاتِ"],
  ["Olumsuzluk edatları?", "مَا + mâzî · لَمْ + meczûm · لَا + muzâri · لَنْ + mansûb · لَيْسَ + isim cümlesi"],
  ["لَمْ / لَنْ farkı?", "لَمْ أَذْهَبْ: gitmedim (geçmiş, sükûn) · لَنْ أَذْهَبَ: gitmeyeceğim (gelecek, üstün)"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat09";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("فَصْلٌ", "i", "mevsim", "فُصُولٌ", "fuul", "", "", "فِي السَّنَةِ أَرْبَعَةُ فُصُولٍ.", "فُصُولٍ", "Yılda dört mevsim vardır."),
  KW("رَبِيعٌ", "i", "ilkbahar", "", "", "", "خَرِيفٌ", "فَصْلُ الرَّبِيعِ مِنْ أَجْمَلِ الفُصُولِ.", "الرَّبِيعِ", "İlkbahar en güzel mevsimlerdendir."),
  KW("صَيْفٌ", "i", "yaz", "أَصْيَافٌ", "efal", "", "شِتَاءٌ", "أَمَّا فَصْلُ الصَّيْفِ فَيَذْهَبُ النَّاسُ فِيهِ إِلَى المَصَايِفِ.", "الصَّيْفِ", "Yazın ise insanlar yazlıklara gider."),
  KW("شِتَاءٌ", "i", "kış", "", "", "", "صَيْفٌ", "فِي فَصْلِ الشِّتَاءِ يَكُونُ الجَوُّ بَارِدًا.", "الشِّتَاءِ", "Kışın hava soğuktur."),
  KW("زَهْرَةٌ", "i", "çiçek", "أَزْهَارٌ / زُهُورٌ", "efal", "وَرْدَةٌ", "", "فِيهِ تَتَفَتَّحُ أَزْهَارُ الأَشْجَارِ.", "أَزْهَارُ", "Ağaçların çiçekleri açar."),
  KW("جَوٌّ", "i", "hava (iklim)", "أَجْوَاءٌ", "efal", "طَقْسٌ", "", "وَيَكُونُ الجَوُّ مُعْتَدِلًا.", "الجَوُّ", "Hava ılıman olur."),
  KW("شَمْسٌ", "i", "güneş", "شُمُوسٌ", "fuul", "", "قَمَرٌ", "وَالشَّمْسُ عَادَةً لَيْسَتْ قَوِيَّةً.", "وَالشَّمْسُ", "Güneş genellikle güçlü değildir."),
  KW("طَبِيعَةٌ", "i", "tabiat, doğa", "", "", "", "", "لِلِاسْتِمْتَاعِ بِجَمَالِ الطَّبِيعَةِ.", "الطَّبِيعَةِ", "Tabiatın güzelliğinin tadını çıkarmak için."),
  KW("غَابَةٌ", "i", "orman", "غَابَاتٌ", "at", "", "", "وَيَخْرُجُونَ إِلَى الحَدَائِقِ الجَمِيلَةِ وَالغَابَاتِ.", "وَالغَابَاتِ", "Güzel bahçelere ve ormanlara çıkarlar."),
  KW("مَصِيفٌ", "i", "yazlık", "مَصَايِفُ", "mefail", "", "مَشْتًى", "فَيَذْهَبُ النَّاسُ فِيهِ إِلَى المَصَايِفِ.", "المَصَايِفِ", "İnsanlar yazlıklara gider."),
  KW("فَلَّاحٌ", "i", "çiftçi", "فَلَّاحُونَ", "un", "مُزَارِعٌ", "", "يُعِدُّ الفَلَّاحُونَ أَرْضَهُمْ لِلزِّرَاعَةِ.", "الفَلَّاحُونَ", "Çiftçiler topraklarını ekime hazırlar."),
  KW("وَرَقَةٌ", "i", "yaprak; kâğıt", "أَوْرَاقٌ", "efal", "", "", "وَتَبْدَأُ أَوْرَاقُ الأَشْجَارِ بِالتَّسَاقُطِ.", "أَوْرَاقُ", "Ağaçların yaprakları dökülmeye başlar."),
  KW("غَيْمَةٌ", "i", "bulut", "غُيُومٌ", "fuul", "سَحَابَةٌ", "", "وَتَكْثُرُ فِيهِ الغُيُومُ.", "الغُيُومُ", "Bulutlar çoğalır."),
  KW("رِيحٌ", "i", "rüzgâr", "رِيَاحٌ", "fial", "", "", "وَتَهُبُّ الرِّيَاحُ الخَفِيفَةُ.", "الرِّيَاحُ", "Hafif rüzgârlar eser."),
  KW("مَطَرٌ", "i", "yağmur", "أَمْطَارٌ", "efal", "", "", "وَتَهْطِلُ أَمْطَارٌ غَزِيرَةٌ.", "أَمْطَارٌ", "Bol yağmur yağar."),
  KW("ثَلْجٌ", "i", "kar", "ثُلُوجٌ", "fuul", "", "", "وَثُلُوجٌ كَثِيرَةٌ فَوْقَ الجِبَالِ.", "وَثُلُوجٌ", "Dağların üstüne çok kar."),
  KW("جَبَلٌ", "i", "dağ", "جِبَالٌ", "fial", "", "سَهْلٌ", "وَثُلُوجٌ كَثِيرَةٌ فَوْقَ الجِبَالِ.", "الجِبَالِ", "Dağların üstüne çok kar."),
  KW("مِدْفَأَةٌ", "i", "soba, şömine", "مَدَافِئُ", "mefail", "", "", "يَجْلِسُ النَّاسُ فِي بُيُوتِهِمْ حَوْلَ المِدْفَأَةِ.", "المِدْفَأَةِ", "İnsanlar sobanın etrafında oturur."),
  KW("مِظَلَّةٌ", "i", "şemsiye", "مِظَلَّاتٌ", "at", "", "", "وَيَحْمِلُونَ المِظَلَّاتِ فِي الشَّوَارِعِ.", "المِظَلَّاتِ", "Sokaklarda şemsiye taşırlar."),
  KW("ثَوْبٌ", "i", "elbise", "ثِيَابٌ", "fial", "لِبَاسٌ", "", "وَتَلْبَسُ الأَرْضُ ثَوْبَهَا الأَخْضَرَ.", "ثَوْبَهَا", "Toprak yeşil elbisesini giyer."),
  KW("مُعْتَدِلٌ", "s", "ılıman", "", "", "دَافِئٌ", "", "وَيَكُونُ الجَوُّ مُعْتَدِلًا.", "مُعْتَدِلًا", "Hava ılıman olur."),
  KW("حَارٌّ", "s", "sıcak", "", "", "", "بَارِدٌ", "وَيَكُونُ الجَوُّ حَارًّا.", "حَارًّا", "Hava sıcak olur."),
  KW("بَارِدٌ", "s", "soğuk", "", "", "", "حَارٌّ", "فِي فَصْلِ الشِّتَاءِ يَكُونُ الجَوُّ بَارِدًا.", "بَارِدًا", "Kışın hava soğuktur."),
  KW("ثَقِيلٌ", "s", "ağır, kalın", "ثِقَالٌ", "fial", "", "خَفِيفٌ", "يَخْلَعُ النَّاسُ لِبَاسَهُمُ الثَّقِيلَ.", "الثَّقِيلَ", "İnsanlar kalın giysilerini çıkarır."),
  KW("غَزِيرٌ", "s", "bol", "غِزَارٌ", "fial", "كَثِيرٌ", "قَلِيلٌ", "وَتَهْطِلُ أَمْطَارٌ غَزِيرَةٌ.", "غَزِيرَةٌ", "Bol yağmur yağar."),
  KW("جَمِيلٌ", "s", "güzel", "", "", "", "قَبِيحٌ", "أَمَّا فَصْلُ الخَرِيفِ فَهُوَ فَصْلٌ جَمِيلٌ أَيْضًا.", "جَمِيلٌ", "Sonbahar da güzel bir mevsimdir."),
  KW("تَفَتَّحَ", "f", "açtı (çiçek)", "", "", "", "ذَبُلَ", "فِيهِ تَتَفَتَّحُ أَزْهَارُ الأَشْجَارِ.", "تَتَفَتَّحُ", "Ağaçların çiçekleri açar."),
  KW("خَلَعَ", "f", "çıkardı (giysi)", "", "", "نَزَعَ", "لَبِسَ", "يَخْلَعُ النَّاسُ لِبَاسَهُمُ الثَّقِيلَ.", "يَخْلَعُ", "İnsanlar kalın giysilerini çıkarır."),
  KW("هَطَلَ", "f", "yağdı", "", "", "نَزَلَ", "", "وَتَهْطِلُ أَمْطَارٌ خَفِيفَةٌ.", "وَتَهْطِلُ", "Hafif yağmurlar yağar."),
  KW("هَبَّ", "f", "esti", "", "", "", "", "وَتَهُبُّ الرِّيَاحُ الخَفِيفَةُ.", "وَتَهُبُّ", "Hafif rüzgârlar eser."),
  KW("ارْتَدَى", "f", "giydi", "", "", "لَبِسَ", "خَلَعَ", "وَيَرْتَدُونَ المَلَابِسَ الصُّوفِيَّةَ الثَّقِيلَةَ.", "وَيَرْتَدُونَ", "Kalın yün giysiler giyerler."),
  KW("كَثُرَ", "f", "çoğaldı", "", "", "", "قَلَّ", "وَتَكْثُرُ فِيهِ الخَضْرَاوَاتُ وَالفَوَاكِهُ.", "وَتَكْثُرُ", "Sebze ve meyveler çoğalır."),
  KW("حَمَى", "f", "korudu", "", "", "", "", "لِتَحْمِيَهُمْ مِنَ المَطَرِ.", "لِتَحْمِيَهُمْ", "Onları yağmurdan korusun diye."),
  KW("أَعَدَّ", "f", "hazırladı", "", "", "جَهَّزَ", "", "يُعِدُّ الفَلَّاحُونَ أَرْضَهُمْ لِلزِّرَاعَةِ.", "يُعِدُّ", "Çiftçiler topraklarını ekime hazırlar.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","فُصُولٌ، ثُلُوجٌ"],"efal":["أَفْعَالٌ","ef’âl","أَزْهَارٌ، أَمْطَارٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، رِيَاحٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","غُرَفٌ، صُوَرٌ"],"fuala":["فُعَلَاءُ","fu’alâ","فُقَرَاءُ، وُزَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَغْنِيَاءُ"],"fevail":["فَوَاعِلُ","fevâil","شَوَارِعُ، نَوَافِذُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَصَايِفُ، مَدَافِئُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","عَصَافِيرُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","طُلَّابٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","فَلَّاحُونَ، مُعَلِّمُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","غَابَاتٌ، مِظَلَّاتٌ"],"diger":["…","başka kalıplar","ثِيَابٌ، مَرْضَى"]};
