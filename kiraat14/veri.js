// ================= VERİ: Kıraat 14 — أَوْقَاتُ الفَرَاغِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "النَّشَاطُ النَّافِعُ", tr: "Faydalı" }, nasb: { ar: "الرِّيَاضَةُ", tr: "Spor" }, cerr: { ar: "العَادَةُ السَّيِّئَةُ", tr: "Zararlı" },
  mi: { ar: "التَّرْكِيبُ", tr: "Kalıp" }, ref: { ar: "الفِعْلُ", tr: "Fiil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var FZ = [["f", "Faydalı", "نَشَاطٌ نَافِعٌ", "mz"], ["z", "Zararlı olabilir", "قَدْ يَكُونُ سَيِّئًا", "cerr"]];
var KAT = [["din", "Kur’an", "تَحْفِيظُ القُرْآنِ", "mi"], ["rf", "Bireysel spor", "رِيَاضَةٌ فَرْدِيَّةٌ", "nasb"], ["rc", "Takım oyunu", "أَلْعَابٌ جَمَاعِيَّةٌ", "ref"], ["fk", "Fikrî etkinlik", "نَشَاطٌ فِكْرِيٌّ", "mz"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", f: "Faydalı", z: "Zararlı olabilir", din: "Kur’an", rf: "Bireysel spor", rc: "Takım oyunu", fk: "Fikrî etkinlik" };

// Boş vakit makinesi: [mecrûr biçim, Türkçe, emoji, faydalı mı, kategori]
var ACT = [
  ["دَوْرَاتِ تَحْفِيظِ القُرْآنِ الكَرِيمِ", "Kur’an kursları", "📖", true, "din"],
  ["المَشْيِ", "yürüyüş", "🚶", true, "rf"], ["الجَرْيِ", "koşu", "🏃", true, "rf"], ["السِّبَاحَةِ", "yüzme", "🏊", true, "rf"], ["رُكُوبِ الدَّرَّاجَةِ", "bisiklete binme", "🚴", true, "rf"], ["قَفْزِ الحَبْلِ", "ip atlama", "🪢", true, "rf"],
  ["كُرَةِ القَدَمِ", "futbol", "⚽", true, "rc"], ["كُرَةِ اليَدِ", "hentbol", "🤾", true, "rc"], ["الكُرَةِ الطَّائِرَةِ", "voleybol", "🏐", true, "rc"], ["كُرَةِ السَّلَّةِ", "basketbol", "🏀", true, "rc"],
  ["قِرَاءَةِ الكُتُبِ", "kitap okuma", "📚", true, "fk"], ["تَعَلُّمِ اللُّغَاتِ الأَجْنَبِيَّةِ", "yabancı dil öğrenme", "🗣️", true, "fk"],
  ["التَّدْخِينِ", "sigara içme", "🚬", false, ""], ["التَّحَدُّثِ عَلَى الهَاتِفِ", "telefonda konuşma", "📱", false, ""], ["وَسَائِلِ التَّوَاصُلِ الاجْتِمَاعِيِّ", "sosyal medya", "💻", false, ""], ["التَّجَوُّلِ فِي الشَّوَارِعِ", "sokaklarda dolaşma", "🛣️", false, ""], ["الجُلُوسِ فِي المَقَاهِي", "kahvehanelerde oturma", "☕", false, ""]
];
// Kişi: [olumlu fiil, olumsuz fiil, وَقْتَ + zamir, Türkçe olumlu, Türkçe olumsuz]
var KISI = [
  ["أَقْضِي", "لَا أَقْضِي", "فَرَاغِي", "Boş vaktimi {A} ile geçiririm; çünkü bu faydalıdır.", "Boş vaktimin çoğunu {A} ile geçirmem; çünkü bu zararlı olabilir.", "أَنَا"],
  ["يَقْضِي الشَّبَابُ", "لَا يَقْضِي الشَّبَابُ", "فَرَاغِهِمْ", "Gençler boş vakitlerini {A} ile geçirir; çünkü bu faydalıdır.", "Gençler boş vakitlerinin çoğunu {A} ile geçirmemeli; çünkü bu zararlı olabilir.", "الشَّبَابُ"],
  ["يَقْضِي أَخِي", "لَا يَقْضِي أَخِي", "فَرَاغِهِ", "Erkek kardeşim boş vaktini {A} ile geçirir; çünkü bu faydalıdır.", "Erkek kardeşim boş vaktinin çoğunu {A} ile geçirmez; çünkü bu zararlı olabilir.", "أَخِي"],
  ["تَقْضِي أُخْتِي", "لَا تَقْضِي أُخْتِي", "فَرَاغِهَا", "Kız kardeşim boş vaktini {A} ile geçirir; çünkü bu faydalıdır.", "Kız kardeşim boş vaktinin çoğunu {A} ile geçirmez; çünkü bu zararlı olabilir.", "أُخْتِي"]
];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "يَقْضِي الشَّبَابُ رُبُعَ عَامِهِمُ الدِّرَاسِيِّ فِي عُطْلَةٍ طَوِيلَةٍ، هِيَ عُطْلَةُ الصَّيْفِ، وَقَدْ تَكُونُ هَذِهِ العُطْلَةُ مُمِلَّةً لِبَعْضِهِمْ بِسَبَبِ الفَرَاغِ. وَلِهَذَا نَجِدُ بَعْضَ الشَّبَابِ يُكَرِّرُ عِبَارَاتٍ، مِثْلَ: مَاذَا أَفْعَلُ؟ أَيْنَ أَذْهَبُ؟ أَشْعُرُ بِالمَلَلِ!" +
  "<br>وَإِنَّ بَعْضَ مَا يَفْعَلُهُ الشَّبَابُ فِي تِلْكَ الأَوْقَاتِ قَدْ يَكُونُ سَيِّئًا أَحْيَانًا، مِثْلَ التَّدْخِينِ، أَوِ التَّحَدُّثِ عَلَى الهَاتِفِ لِوَقْتٍ طَوِيلٍ، أَوْ قَضَاءِ الوَقْتِ الكَثِيرِ عَلَى وَسَائِلِ التَّوَاصُلِ الاجْتِمَاعِيِّ، إِضَافَةً إِلَى التَّجَوُّلِ فِي الشَّوَارِعِ وَالأَسْوَاقِ وَالجُلُوسِ فِي المَقَاهِي." +
  "<br>أَمَّا بَعْضُهُمُ الآخَرُ فَيُحَاوِلُ قَضَاءَ هَذِهِ الأَوْقَاتِ بِشَيْءٍ نَافِعٍ، مِثْلَ المُطَالَعَةِ الَّتِي تُقَوِّي ثَقَافَتَهُ، أَوْ مُمَارَسَةِ بَعْضِ النَّشَاطَاتِ الأُخْرَى المُمْتِعَةِ وَالمُفِيدَةِ، وَمِنْ هَذِهِ النَّشَاطَاتِ:" +
  "<br>• دَوْرَاتُ تَحْفِيظِ القُرْآنِ الكَرِيمِ: فَكَثِيرٌ مِنَ المَرَاكِزِ وَالأَوْقَافِ تَفْتَحُ دَوْرَاتٍ لِتَحْفِيظِ القُرْآنِ الكَرِيمِ، وَهَذَا يَكُونُ مُفِيدًا لِلْأَطْفَالِ وَالشَّبَابِ حَتَّى يَحْفَظُوا كِتَابَ اللهِ سُبْحَانَهُ وَتَعَالَى وَيُطَبِّقُوا أَوَامِرَهُ." +
  "<br>• الرِّيَاضَةُ: «إِنَّ العَقْلَ السَّلِيمَ فِي الجِسْمِ السَّلِيمِ»، فَجِسْمُ الإِنْسَانِ يَحْتَاجُ دَائِمًا إِلَى الرِّيَاضَةِ وَالحَرَكَةِ الَّتِي تَحْفَظُ لِلْإِنْسَانِ صِحَّتَهُ، لِذَلِكَ فَإِنَّ النَّشَاطَ الرِّيَاضِيَّ أَمْرٌ مُهِمٌّ لِلشَّبَابِ، مِثْلَ المَشْيِ وَالجَرْيِ وَالتَّمْرِينَاتِ الصَّبَاحِيَّةِ." +
  "<br>وَمِنَ الرِّيَاضَاتِ المَشْهُورَةِ: السِّبَاحَةُ وَرُكُوبُ الدَّرَّاجَةِ وَقَفْزُ الحَبْلِ، وَهِيَ رِيَاضَاتٌ فَرْدِيَّةٌ. وَهُنَاكَ أَلْعَابٌ جَمَاعِيَّةٌ لَهَا أَهَمِّيَّةٌ كَبِيرَةٌ، مِثْلُ كُرَةِ القَدَمِ وَكُرَةِ اليَدِ وَالطَّائِرَةِ وَالسَّلَّةِ الَّتِي تُقَوِّي المَحَبَّةَ بَيْنَ الشَّبَابِ بِشَكْلٍ عَامٍّ، وَبَيْنَ الأَصْدِقَاءِ بِشَكْلٍ خَاصٍّ، وَهِيَ تَحْتَاجُ إِلَى فَرِيقَيْنِ." +
  "<br>• النَّشَاطَاتُ الفِكْرِيَّةُ: وَهِيَ مِنْ أَهَمِّ النَّشَاطَاتِ الَّتِي يَقُومُ بِهَا الإِنْسَانُ فِي أَوْقَاتِ فَرَاغِهِ، مِثْلُ قِرَاءَةِ الكُتُبِ بِكُلِّ أَنْوَاعِهَا، وَالاهْتِمَامِ بِتَعَلُّمِ اللُّغَاتِ الأَجْنَبِيَّةِ، فَكَمَا يَقُولُ المَثَلُ: «لِسَانٌ وَاحِدٌ إِنْسَانٌ وَاحِدٌ»." +
  "<br>قَالَ عُمَرُ رَضِيَ اللهُ عَنْهُ: «عَلِّمُوا أَوْلَادَكُمُ السِّبَاحَةَ وَالرِّمَايَةَ وَرُكُوبَ الخَيْلِ».";
var METIN_TR = "Gençler okul yıllarının dörtte birini uzun bir tatilde, yaz tatilinde geçirirler. Bu tatil bazıları için boşluk yüzünden sıkıcı olabilir. Bu yüzden bazı gençlerin “Ne yapsam? Nereye gitsem? Canım sıkılıyor!” gibi sözleri tekrarladığını görürüz." +
  "<br>Gençlerin bu vakitlerde yaptıklarının bir kısmı bazen kötü olabilir: sigara içmek, telefonda uzun süre konuşmak ya da sosyal medyada çok vakit geçirmek; ayrıca sokaklarda ve çarşılarda dolaşmak ve kahvehanelerde oturmak." +
  "<br>Diğerleri ise bu vakitleri faydalı bir şeyle geçirmeye çalışır: kültürünü güçlendiren okuma ya da başka zevkli ve faydalı etkinlikler. Bu etkinliklerden bazıları:" +
  "<br>• Kur’an kursları: Birçok merkez ve vakıf Kur’an-ı Kerîm ezberleme kursları açar. Bu, çocuklar ve gençler Allah’ın kitabını ezberlesinler ve emirlerini uygulasınlar diye faydalıdır." +
  "<br>• Spor: “Sağlam kafa sağlam vücutta bulunur.” İnsan bedeni sağlığını koruyan spora ve harekete her zaman ihtiyaç duyar; bu yüzden spor gençler için önemlidir: yürüyüş, koşu, sabah egzersizleri gibi." +
  "<br>Meşhur sporlardan yüzme, bisiklet ve ip atlama bireysel sporlardır. Bir de büyük önemi olan takım oyunları vardır: futbol, hentbol, voleybol ve basketbol; bunlar genel olarak gençler arasında, özel olarak da arkadaşlar arasında sevgiyi güçlendirir ve iki takım gerektirir." +
  "<br>• Fikrî etkinlikler: İnsanın boş vakitlerinde yaptığı en önemli etkinliklerdendir: her türden kitap okumak ve yabancı dil öğrenmeye önem vermek. Atasözünün dediği gibi: “Bir lisan bir insan.”" +
  "<br>Hz. Ömer (r.a.) şöyle dedi: “Çocuklarınıza yüzmeyi, atıcılığı ve ata binmeyi öğretin.”";
var SOZLUK = [["أَوْقَاتُ الفَرَاغِ", "boş vakitler"], ["رُبُعٌ", "dörtte bir"], ["مُمِلٌّ", "sıkıcı"], ["يُكَرِّرُ", "tekrarlar"], ["عِبَارَاتٌ", "ifadeler, sözler"], ["سَيِّئٌ", "kötü"], ["التَّدْخِينُ", "sigara içme"], ["وَسَائِلُ التَّوَاصُلِ الاجْتِمَاعِيِّ", "sosyal medya"], ["إِضَافَةً إِلَى", "…e ek olarak"], ["التَّجَوُّلُ", "dolaşma"], ["المَقَاهِي", "kahvehaneler"], ["نَافِعٌ", "faydalı"], ["المُطَالَعَةُ", "okuma"], ["ثَقَافَةٌ", "kültür"], ["دَوْرَاتٌ", "kurslar"], ["تَحْفِيظٌ", "ezberletme"], ["المَرَاكِزُ / الأَوْقَافُ", "merkezler / vakıflar"], ["يُطَبِّقُوا", "uygulasınlar"], ["الحَرَكَةُ", "hareket"], ["التَّمْرِينَاتُ الصَّبَاحِيَّةُ", "sabah egzersizleri"], ["قَفْزُ الحَبْلِ", "ip atlama"], ["فَرْدِيَّةٌ / جَمَاعِيَّةٌ", "bireysel / takım hâlinde"], ["المَحَبَّةُ", "sevgi"], ["بِشَكْلٍ عَامٍّ / خَاصٍّ", "genel olarak / özellikle"], ["فَرِيقٌ", "takım"], ["الأَجْنَبِيَّةُ", "yabancı"], ["المَثَلُ", "atasözü"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendini düşünmek: boş vaktin var mı, nasıl geçirirsin, faydalı mı zararlı mı", "Boş vakitleri anlatan metni durmadan okumak ve dinlemek", "Faydalı ve zararlı alışkanlık kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "بَعْضُ مَا يَفْعَلُهُ الشَّبَابُ:- / قَدْ يَكُونُ سَيِّئًا:cerr / مِثْلَ التَّدْخِينِ.:cerr", tr: "Gençlerin yaptıklarının bir kısmı kötü olabilir; sigara içmek gibi." },
    { s: "أَمَّا بَعْضُهُمُ الآخَرُ:- / فَيُحَاوِلُ قَضَاءَ هَذِهِ الأَوْقَاتِ:- / بِشَيْءٍ نَافِعٍ.:mz", tr: "Diğerleri ise bu vakitleri faydalı bir şeyle geçirmeye çalışır." }
  ],
  rules: [
    { tr: "<b>Kötü olabilecek alışkanlıklar:</b> <span class=\"ar\">التَّدْخِينُ</span> sigara · <span class=\"ar\">التَّحَدُّثُ عَلَى الهَاتِفِ لِوَقْتٍ طَوِيلٍ</span> telefonda uzun konuşma · <span class=\"ar\">قَضَاءُ الوَقْتِ الكَثِيرِ عَلَى وَسَائِلِ التَّوَاصُلِ</span> sosyal medyada çok vakit · <span class=\"ar\">التَّجَوُّلُ فِي الشَّوَارِعِ</span> sokaklarda dolaşma · <span class=\"ar\">الجُلُوسُ فِي المَقَاهِي</span> kahvehanede oturma." },
    { tr: "<b>Faydalı etkinlikler:</b> <span class=\"ar\">المُطَالَعَةُ</span> okuma · <span class=\"ar\">دَوْرَاتُ تَحْفِيظِ القُرْآنِ</span> Kur’an kursları · <span class=\"ar\">الرِّيَاضَةُ</span> spor · <span class=\"ar\">النَّشَاطَاتُ الفِكْرِيَّةُ</span> fikrî etkinlikler: kitap okuma, yabancı dil." },
    { tr: "<b>Sözler:</b> <span class=\"ar\">«العَقْلُ السَّلِيمُ فِي الجِسْمِ السَّلِيمِ»</span> Sağlam kafa sağlam vücutta · <span class=\"ar\">«لِسَانٌ وَاحِدٌ إِنْسَانٌ وَاحِدٌ»</span> Bir lisan bir insan · Hz. Ömer: <span class=\"ar\">«عَلِّمُوا أَوْلَادَكُمُ السِّبَاحَةَ وَالرِّمَايَةَ وَرُكُوبَ الخَيْلِ»</span>." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: هَلْ عِنْدَكَ وَقْتُ فَرَاغٍ؟ كَيْفَ تَقْضِي / تَقْضِينَ وَقْتَكَ؟ هَلْ تَقْضِيهِ / تَقْضِينَهُ فِي شَيْءٍ مُفِيدٍ أَوْ ضَارٍّ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "أَوْقَاتُ الفَرَاغِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "هَلْ عِنْدَكَ وَقْتُ فَرَاغٍ؟", a: "نَعَمْ، عِنْدِي وَقْتُ فَرَاغٍ فِي المَسَاءِ وَفِي عُطْلَةِ الأُسْبُوعِ.", tr: "Boş vaktin var mı? (Örnek) Evet, akşamları ve hafta sonları." },
        { q: "كَيْفَ تَقْضِي وَقْتَكَ؟", a: "أَقْرَأُ الكُتُبَ، وَأَلْعَبُ كُرَةَ القَدَمِ مَعَ أَصْدِقَائِي.", tr: "Vaktini nasıl geçirirsin? Kitap okur, arkadaşlarımla futbol oynarım." },
        { q: "هَلْ تَقْضِيهِ فِي شَيْءٍ مُفِيدٍ أَوْ ضَارٍّ؟", a: "أُحَاوِلُ أَنْ أَقْضِيَهُ فِي شَيْءٍ مُفِيدٍ.", tr: "Onu faydalı mı zararlı bir şeyde mi geçirirsin? Faydalı bir şeyde geçirmeye çalışırım." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "يَقْضِي الشَّبَابُ رُبُعَ عَامِهِمُ الدِّرَاسِيِّ فِي عُطْلَةِ الصَّيْفِ.", a: "d", why: "Metnin ilk cümlesi." },
        { s: "عُطْلَةُ الصَّيْفِ قَصِيرَةٌ.", a: "y", why: "عُطْلَةٍ طَوِيلَةٍ." },
        { s: "يُكَرِّرُ بَعْضُ الشَّبَابِ: أَشْعُرُ بِالمَلَلِ!", a: "d", why: "Metinde aynen geçer." },
        { s: "التَّدْخِينُ مِنَ النَّشَاطَاتِ المُفِيدَةِ.", a: "y", why: "قَدْ يَكُونُ سَيِّئًا: kötü alışkanlıklardan." },
        { s: "المُطَالَعَةُ تُقَوِّي ثَقَافَةَ الإِنْسَانِ.", a: "d", why: "المُطَالَعَةِ الَّتِي تُقَوِّي ثَقَافَتَهُ." },
        { s: "تَفْتَحُ المَرَاكِزُ وَالأَوْقَافُ دَوْرَاتٍ لِتَحْفِيظِ القُرْآنِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "جِسْمُ الإِنْسَانِ لَا يَحْتَاجُ إِلَى الحَرَكَةِ.", a: "y", why: "يَحْتَاجُ دَائِمًا إِلَى الرِّيَاضَةِ وَالحَرَكَةِ." },
        { s: "السِّبَاحَةُ رِيَاضَةٌ فَرْدِيَّةٌ.", a: "d", why: "…وَهِيَ رِيَاضَاتٌ فَرْدِيَّةٌ." },
        { s: "كُرَةُ القَدَمِ رِيَاضَةٌ فَرْدِيَّةٌ.", a: "y", why: "Takım oyunu (أَلْعَابٌ جَمَاعِيَّةٌ)." },
        { s: "الأَلْعَابُ الجَمَاعِيَّةُ تَحْتَاجُ إِلَى فَرِيقَيْنِ.", a: "d", why: "وَهِيَ تَحْتَاجُ إِلَى فَرِيقَيْنِ." },
        { s: "تَعَلُّمُ اللُّغَاتِ الأَجْنَبِيَّةِ مِنَ النَّشَاطَاتِ الفِكْرِيَّةِ.", a: "d", why: "…وَالاهْتِمَامِ بِتَعَلُّمِ اللُّغَاتِ الأَجْنَبِيَّةِ." },
        { s: "قَالَ عُمَرُ: عَلِّمُوا أَوْلَادَكُمُ التِّجَارَةَ وَالطَّبْخَ.", a: "y", why: "السِّبَاحَةَ وَالرِّمَايَةَ وَرُكُوبَ الخَيْلِ." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("يَقْضِي الشَّبَابُ رُبُعَ عَامِهِمُ الدِّرَاسِيِّ", "رُبُعَ"), "dörtte biri", "yarısı", "tamamı", "Okul yılının dörtte biri.", "نِصْفٌ: yarım."],
      [HL("قَدْ تَكُونُ هَذِهِ العُطْلَةُ مُمِلَّةً", "مُمِلَّةً"), "sıkıcı", "zevkli", "kısa", "Bu tatil sıkıcı olabilir.", "≠ مُمْتِعَةٌ"],
      [HL("بَعْضَ الشَّبَابِ يُكَرِّرُ عِبَارَاتٍ", "يُكَرِّرُ"), "tekrarlar", "unutur", "yazar", "Bazı gençler sözleri tekrarlar.", "= يُرَدِّدُ"],
      [HL("قَدْ يَكُونُ سَيِّئًا أَحْيَانًا", "سَيِّئًا"), "kötü", "güzel", "faydalı", "Bazen kötü olabilir.", "≠ حَسَنٌ"],
      [HL("مِثْلَ التَّدْخِينِ", "التَّدْخِينِ"), "sigara içme", "spor yapma", "kitap okuma", "Sigara içmek gibi.", "دُخَانٌ: duman."],
      [HL("إِضَافَةً إِلَى التَّجَوُّلِ فِي الشَّوَارِعِ", "إِضَافَةً إِلَى"), "…e ek olarak", "…den önce", "…e rağmen", "Sokaklarda dolaşmaya ek olarak.", ""],
      [HL("مِثْلَ المُطَالَعَةِ الَّتِي تُقَوِّي ثَقَافَتَهُ", "المُطَالَعَةِ"), "okuma", "uyku", "yemek", "Kültürünü güçlendiren okuma.", "= القِرَاءَةُ"],
      [HL("تَفْتَحُ دَوْرَاتٍ لِتَحْفِيظِ القُرْآنِ", "دَوْرَاتٍ"), "kurslar", "evler", "kitaplar", "Kur’an kursları açar.", "Tekili: دَوْرَةٌ."],
      [HL("حَتَّى يَحْفَظُوا كِتَابَ اللهِ وَيُطَبِّقُوا أَوَامِرَهُ", "وَيُطَبِّقُوا"), "ve uygulasınlar", "ve okusunlar", "ve satsınlar", "Emirlerini uygulasınlar diye.", ""],
      [HL("وَالتَّمْرِينَاتِ الصَّبَاحِيَّةِ", "وَالتَّمْرِينَاتِ"), "egzersizler, idmanlar", "kahvaltılar", "dersler", "Sabah egzersizleri.", ""],
      [HL("الَّتِي تُقَوِّي المَحَبَّةَ بَيْنَ الشَّبَابِ", "المَحَبَّةَ"), "sevgi", "kavga", "yorgunluk", "Gençler arasında sevgiyi güçlendirir.", ""],
      [HL("وَهِيَ تَحْتَاجُ إِلَى فَرِيقَيْنِ", "فَرِيقَيْنِ"), "iki takım", "iki top", "iki saat", "İki takım gerektirir.", "Tekili: فَرِيقٌ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama: Faydalı ve Zararlı", short: "Anlama", col: "nasb", legend: ["mz", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "Boş vakit etkinliklerini faydalı ve zararlı olarak ayırmak", "Takım oyunlarının önemini söylemek"],
  examples: [
    { s: "الأَلْعَابُ الجَمَاعِيَّةُ:nasb / تُقَوِّي المَحَبَّةَ:mz / بَيْنَ الشَّبَابِ بِشَكْلٍ عَامٍّ:- / وَبَيْنَ الأَصْدِقَاءِ بِشَكْلٍ خَاصٍّ.:-", tr: "Takım oyunları genel olarak gençler, özel olarak arkadaşlar arasında sevgiyi güçlendirir." }
  ],
  rules: [
    { tr: "<b>Kitaptaki 2. etkinlik:</b> beş cümlenin hepsi yanlıştır; her birindeki küçük kelime anlamı değiştiriyor: <span class=\"ar\">دَائِمًا</span> (metinde <span class=\"ar\">قَدْ تَكُونُ</span>) · <span class=\"ar\">أَحْيَانًا</span> (metinde <span class=\"ar\">دَائِمًا</span>) · <span class=\"ar\">فَقَطْ</span> (metinde “genel olarak gençler, özel olarak arkadaşlar”)." },
    { tr: "<b>3. madde (التَّسْلِيَةُ المُعْتَدِلَةُ):</b> “ölçülü eğlence” metinde geçmiyor; metin kötü alışkanlıkların bile ancak <span class=\"ar\">أَحْيَانًا</span> (bazen) kötü olabileceğini söylüyor. Ölçülü eğlence olumsuz bir etkinlik değildir; bu yüzden yanlış kabul edildi." },
    { tr: "<b>Kitaptaki 5. etkinlik:</b> <span class=\"ar\">طُرُقٌ خَاطِئَةٌ وَأَسَالِيبُ ضَارَّةٌ</span> (yanlış yollar ve zararlı yöntemler) ifadesi kitaptaki metinde yok; kelimeleri (طُرُقٌ، أَسَالِيبُ) yine de çalışıyoruz." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَا العَادَاتُ السَّيِّئَةُ الَّتِي يَقْضِي الشَّبَابُ بِهَا وَقْتَ فَرَاغِهِمْ؟ مَا الأَنْشِطَةُ المُفِيدَةُ فِي وَقْتِ الفَرَاغِ؟ مَا أَنْوَاعُ الرِّيَاضَةِ؟ مَا أَهَمِّيَّةُ الأَلْعَابِ الجَمَاعِيَّةِ؟", "٢ ـ ضَعْ إِشَارَةَ صَحٍّ (✓) أَوْ خَطَإٍ (✗) بِجَانِبِ العِبَارَاتِ الآتِيَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مَا العَادَاتُ السَّيِّئَةُ الَّتِي يَقْضِي الشَّبَابُ بِهَا وَقْتَ فَرَاغِهِمْ؟", "التَّدْخِينُ، وَالتَّحَدُّثُ عَلَى الهَاتِفِ لِوَقْتٍ طَوِيلٍ، وَالتَّجَوُّلُ فِي الشَّوَارِعِ، وَالجُلُوسُ فِي المَقَاهِي.", "المُطَالَعَةُ، وَالسِّبَاحَةُ، وَتَعَلُّمُ اللُّغَاتِ.", "دَوْرَاتُ تَحْفِيظِ القُرْآنِ وَالتَّمْرِينَاتُ الصَّبَاحِيَّةُ.", "Kötü alışkanlıklar: sigara, uzun telefon konuşması, sokakta dolaşma, kahvehane.", "Sosyal medyada çok vakit geçirmek de bunlardandır."],
      ["مَا الأَنْشِطَةُ المُفِيدَةُ فِي وَقْتِ الفَرَاغِ؟", "المُطَالَعَةُ، وَدَوْرَاتُ تَحْفِيظِ القُرْآنِ، وَالرِّيَاضَةُ، وَالنَّشَاطَاتُ الفِكْرِيَّةُ.", "التَّدْخِينُ وَالجُلُوسُ فِي المَقَاهِي.", "النَّوْمُ طَوَالَ اليَوْمِ.", "Faydalı etkinlikler: okuma, Kur’an kursu, spor, fikrî etkinlikler.", ""],
      ["مَا أَنْوَاعُ الرِّيَاضَةِ؟", "رِيَاضَاتٌ فَرْدِيَّةٌ كَالسِّبَاحَةِ، وَأَلْعَابٌ جَمَاعِيَّةٌ كَكُرَةِ القَدَمِ.", "رِيَاضَاتٌ صَيْفِيَّةٌ وَرِيَاضَاتٌ شَتَوِيَّةٌ.", "رِيَاضَاتٌ قَدِيمَةٌ وَرِيَاضَاتٌ حَدِيثَةٌ.", "Spor türleri: bireysel ve takım.", ""],
      ["مَا أَهَمِّيَّةُ الأَلْعَابِ الجَمَاعِيَّةِ؟", "تُقَوِّي المَحَبَّةَ بَيْنَ الشَّبَابِ بِشَكْلٍ عَامٍّ، وَبَيْنَ الأَصْدِقَاءِ بِشَكْلٍ خَاصٍّ.", "تُعْطِي الشَّبَابَ مَالًا كَثِيرًا.", "تُقَوِّي الكَرَاهِيَةَ بَيْنَ الفَرِيقَيْنِ.", "Takım oyunları sevgiyi güçlendirir.", ""]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ صَحٍّ (✓) أَوْ خَطَإٍ (✗) بِجَانِبِ العِبَارَاتِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)? Küçük kelimelere dikkat!", items: CL([
      ["عُطْلَةُ الصَّيْفِ مُمِلَّةٌ دَائِمًا لِبَعْضِ الشَّبَابِ بِسَبَبِ الفَرَاغِ.", "y", "Metinde: قَدْ تَكُونُ مُمِلَّةً (sıkıcı olabilir), “her zaman” değil."],
      ["يَحْتَاجُ جِسْمُ الإِنْسَانِ أَحْيَانًا إِلَى الرِّيَاضَةِ وَالحَرَكَةِ.", "y", "Metinde: يَحْتَاجُ دَائِمًا (her zaman)."],
      ["التَّسْلِيَةُ المُعْتَدِلَةُ نَشَاطٌ سَلْبِيٌّ.", "y", "Ölçülü eğlence olumsuz değildir; metin ancak aşırısını kötü sayıyor."],
      ["الرِّيَاضَةُ الفَرْدِيَّةُ تُشَجِّعُ عَلَى التَّعَاوُنِ.", "y", "Sevgiyi ve birlikteliği güçlendiren takım oyunlarıdır."],
      ["الأَلْعَابُ الجَمَاعِيَّةُ تُقَوِّي العَلَاقَاتِ بَيْنَ الأَصْدِقَاءِ فَقَطْ.", "y", "بَيْنَ الشَّبَابِ بِشَكْلٍ عَامٍّ، وَبَيْنَ الأَصْدِقَاءِ بِشَكْلٍ خَاصٍّ."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["عُطْلَةُ الصَّيْفِ مُمِلَّةٌ دَائِمًا. ✗", "قَدْ تَكُونُ عُطْلَةُ الصَّيْفِ مُمِلَّةً لِبَعْضِ الشَّبَابِ.", "عُطْلَةُ الصَّيْفِ مُمِلَّةٌ لِكُلِّ النَّاسِ.", "لَيْسَ هُنَاكَ عُطْلَةٌ فِي الصَّيْفِ.", "Yaz tatili bazı gençler için sıkıcı olabilir.", "قَدْ + muzâri: olabilir."],
      ["يَحْتَاجُ الجِسْمُ أَحْيَانًا إِلَى الرِّيَاضَةِ. ✗", "يَحْتَاجُ الجِسْمُ دَائِمًا إِلَى الرِّيَاضَةِ وَالحَرَكَةِ.", "لَا يَحْتَاجُ الجِسْمُ إِلَى الرِّيَاضَةِ.", "يَحْتَاجُ الجِسْمُ إِلَى الرِّيَاضَةِ فِي الصَّيْفِ فَقَطْ.", "Beden her zaman spora ve harekete ihtiyaç duyar.", ""],
      ["الأَلْعَابُ الجَمَاعِيَّةُ تُقَوِّي العَلَاقَاتِ بَيْنَ الأَصْدِقَاءِ فَقَطْ. ✗", "تُقَوِّي المَحَبَّةَ بَيْنَ الشَّبَابِ عَامَّةً وَبَيْنَ الأَصْدِقَاءِ خَاصَّةً.", "تُقَوِّي المَحَبَّةَ بَيْنَ الأَطْفَالِ فَقَطْ.", "لَا تُقَوِّي المَحَبَّةَ أَبَدًا.", "Genel olarak gençler, özel olarak arkadaşlar arasında.", ""]
    ])},
    { type: "classify", extra: true, opts: FZ, ar: "نَشَاطٌ نَافِعٌ أَمْ عَادَةٌ قَدْ تَكُونُ سَيِّئَةً؟", tr: "Metne göre bu etkinlik faydalı mı, yoksa kötü olabilecek bir alışkanlık mı?", items: CL([
      ["المُطَالَعَةُ 📚", "f", "Kültürü güçlendirir."], ["التَّدْخِينُ 🚬", "z", "Kötü alışkanlıklardan."], ["دَوْرَاتُ تَحْفِيظِ القُرْآنِ 📖", "f", "Faydalı etkinlik."], ["الجُلُوسُ فِي المَقَاهِي ☕", "z", "Kötü olabilir."],
      ["التَّمْرِينَاتُ الصَّبَاحِيَّةُ 🤸", "f", "Spor."], ["التَّحَدُّثُ عَلَى الهَاتِفِ لِوَقْتٍ طَوِيلٍ 📱", "z", "Kötü olabilir."], ["تَعَلُّمُ اللُّغَاتِ الأَجْنَبِيَّةِ 🗣️", "f", "Fikrî etkinlik."], ["التَّجَوُّلُ فِي الشَّوَارِعِ وَالأَسْوَاقِ 🛣️", "z", "Kötü olabilir."],
      ["كُرَةُ القَدَمِ ⚽", "f", "Takım oyunu."], ["قَضَاءُ الوَقْتِ الكَثِيرِ عَلَى وَسَائِلِ التَّوَاصُلِ 💻", "z", "Kötü olabilir."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Tekil, Eş, Zıt", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Metindeki çoğulların tekilini bulmak", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek", "Kırık çoğul kalıplarını tanımak"],
  examples: [
    { s: "مَقَاهٍ:mz.Çoğul / ← مَقْهًى:nasb.Tekil", tr: "kahvehaneler → kahvehane", pair: "جَمَاعِيَّةٌ:mz.Kelime / ≠ فَرْدِيَّةٌ:cerr.Zıt", pairTr: "takım hâlinde ≠ bireysel" }
  ],
  rules: [
    { tr: "<b>Tekiller (5. etkinlik):</b> <span class=\"ar\">المَقَاهِي ← مَقْهًى · أَلْعَابٌ ← لُعْبَةٌ · الأَوْقَاتُ ← وَقْتٌ · عَادَاتٌ ← عَادَةٌ · وَسَائِلُ ← وَسِيلَةٌ · طُرُقٌ ← طَرِيقٌ · أَسَالِيبُ ← أُسْلُوبٌ · النَّشَاطَاتُ ← نَشَاطٌ · المَرَاكِزُ ← مَرْكَزٌ · الأَوْقَافُ ← وَقْفٌ</span>" },
    { tr: "<b>Eş anlam (6. etkinlik):</b> <span class=\"ar\">عَامٌ = سَنَةٌ · تَحَدَّثَ = تَكَلَّمَ · قَضَى = أَمْضَى · مَشَى = سَارَ · يَنْفَعُ = يُفِيدُ · جَرَى = رَكَضَ · السَّلِيمُ = الصَّحِيحُ · وَقْتٌ = زَمَنٌ · الشَّوَارِعُ = الطُّرُقُ</span>" },
    { tr: "<b>Zıt anlam (7. etkinlik):</b> <span class=\"ar\">مُفِيدَةٌ ≠ ضَارَّةٌ · مُمْتِعَةٌ ≠ مُمِلَّةٌ · ارْتَفَعَ ≠ انْخَفَضَ · حَفِظَ ≠ نَسِيَ · مُخْتَلِفَةٌ ≠ مُتَشَابِهَةٌ · جَمَاعِيَّةٌ ≠ فَرْدِيَّةٌ</span>" }
  ],
  kaide: ["٥ ـ اكْتُبِ المُفْرَدَ الصَّحِيحَ لِكُلٍّ مِنَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ.", "٦ ـ صِلْ بَيْنَ المُرَادِفَاتِ مِنَ الكَلِمَاتِ الآتِيَةِ. ٧ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا."],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "اكْتُبِ المُفْرَدَ الصَّحِيحَ لِكُلٍّ مِنَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ", tr: "Altı çizili çoğulun tekilini seç.", items: PL([
      ["فِي المَطَاعِمِ وَ<u>المَقَاهِي</u> ← ___", "مَقْهًى", "قَهْوَةٌ", "مَقْهَاةٌ", "kahvehaneler → kahvehane", "قَهْوَةٌ: kahve (içecek)."],
      ["هُنَاكَ <u>أَلْعَابٌ</u> جَمَاعِيَّةٌ ← ___", "لُعْبَةٌ", "لَاعِبٌ", "مَلْعَبٌ", "oyunlar → oyun", "لَاعِبٌ: oyuncu; مَلْعَبٌ: stadyum."],
      ["فِي تِلْكَ <u>الأَوْقَاتِ</u> ← ___", "وَقْتٌ", "مَوْقِتٌ", "تَوْقِيتٌ", "vakitler → vakit", ""],
      ["مِنْ <u>عَادَاتٍ</u> ← ___", "عَادَةٌ", "عَوْدَةٌ", "عِيدٌ", "alışkanlıklar → alışkanlık", "عَوْدَةٌ: dönüş; عِيدٌ: bayram."],
      ["عَلَى <u>وَسَائِلِ</u> التَّوَاصُلِ ← ___", "وَسِيلَةٌ", "وَسَطٌ", "مُتَوَسِّلٌ", "araçlar → araç", "فَعَائِلُ kalıbı."],
      ["كُلُّهَا <u>طُرُقٌ</u> خَاطِئَةٌ ← ___", "طَرِيقٌ", "طَارِقٌ", "طُرْقَةٌ", "yollar → yol", "فُعُلٌ kalıbı."],
      ["وَ<u>أَسَالِيبُ</u> ضَارَّةٌ ← ___", "أُسْلُوبٌ", "سَلْبٌ", "سَالِبٌ", "yöntemler → yöntem", "أَفَاعِيلُ kalıbı."],
      ["وَمِنْ هَذِهِ <u>النَّشَاطَاتِ</u> ← ___", "نَشَاطٌ", "نَشِيطٌ", "نَاشِطٌ", "etkinlikler → etkinlik", "نَشِيطٌ: çalışkan (sıfat)."],
      ["كَثِيرٌ مِنَ <u>المَرَاكِزِ</u> ← ___", "مَرْكَزٌ", "رَكِيزَةٌ", "مُرَكَّزٌ", "merkezler → merkez", "مَفَاعِلُ kalıbı."],
      ["وَ<u>الأَوْقَافِ</u> ← ___", "وَقْفٌ", "وُقُوفٌ", "مَوْقِفٌ", "vakıflar → vakıf", "مَوْقِفٌ: durak; وُقُوفٌ: durma."]
    ])},
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ المُرَادِفَاتِ مِنَ الكَلِمَاتِ الآتِيَةِ", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["سَارَ", "رَكَضَ", "يُفِيدُ", "تَكَلَّمَ", "سَنَةٌ", "أَمْضَى", "زَمَنٌ", "الطُّرُقُ", "الصَّحِيحُ"], items: [
      { pre: "عَامٌ =", a: [4], tr: "yıl" }, { pre: "تَحَدَّثَ =", a: [3], tr: "konuştu" }, { pre: "قَضَى =", a: [5], tr: "geçirdi" }, { pre: "مَشَى =", a: [0], tr: "yürüdü" }, { pre: "يَنْفَعُ =", a: [2], tr: "fayda verir" }, { pre: "جَرَى =", a: [1], tr: "koştu" }, { pre: "السَّلِيمُ =", a: [8], tr: "sağlam" }, { pre: "وَقْتٌ =", a: [6], tr: "zaman" }, { pre: "الشَّوَارِعُ =", a: [7], tr: "caddeler = yollar" }
    ]},
    { type: "bank", num: "٧", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["نَسِيَ", "مُتَشَابِهَةٌ", "فَرْدِيَّةٌ", "مُمِلَّةٌ", "انْخَفَضَ", "ضَارَّةٌ"], items: [
      { pre: "مُفِيدَةٌ ≠", a: [5], tr: "faydalı ≠ zararlı" }, { pre: "مُمْتِعَةٌ ≠", a: [3], tr: "zevkli ≠ sıkıcı" }, { pre: "ارْتَفَعَ ≠", a: [4], tr: "yükseldi ≠ alçaldı" }, { pre: "حَفِظَ ≠", a: [0], tr: "ezberledi ≠ unuttu" }, { pre: "مُخْتَلِفَةٌ ≠", a: [1], tr: "farklı ≠ benzer" }, { pre: "جَمَاعِيَّةٌ ≠", a: [2], tr: "takım hâlinde ≠ bireysel" }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE
{
  id: "u4", no: 4, ar: "الجُمْلَةُ", tr: "Cümle Eşleştirme, Boşluk Doldurma, Kelime Kullanma", short: "Cümle", col: "ref", legend: ["mz", "mi"],
  goals: ["Cümlenin başını uygun sonuyla eşleştirmek", "Hikâyedeki boşlukları doldurmak (أَمَّا… فَـ…)", "Yeni kelimeleri doğru cümlede kullanmak", "Kendi cümlelerini kurmak"],
  examples: [
    { s: "العَقْلُ السَّلِيمُ:mz / فِي الجِسْمِ السَّلِيمِ.:-", tr: "Sağlam kafa sağlam vücutta bulunur.", pair: "المُطَالَعَةُ:mz / تُقَوِّي الثَّقَافَةَ.:-", pairTr: "Okuma kültürü güçlendirir." },
    { s: "أَمَّا سُعَادُ:mi.أَمَّا / فَـ:mi.فَـ / تَدْرُسُ الصَّحَافَةَ.:-", tr: "Suad ise gazetecilik okuyor." }
  ],
  rules: [
    { tr: "<b>أَمَّا… فَـ…</b> “… ise”: 4. etkinlikteki hikâyede üç kez geçiyor: <span class=\"ar\">أَمَّا سَامِرٌ فَهُوَ يُفَضِّلُ العَمَلَ · أَمَّا سُعَادُ فَتَدْرُسُ الصَّحَافَةَ · أَمَّا حَنَانُ فَهِيَ تَدْرُسُ التَّارِيخَ</span>." },
    { tr: "<b>8. etkinliğin kelimeleri:</b> <span class=\"ar\">قَضَى</span> geçirdi · <span class=\"ar\">إِضَافَةً إِلَى</span> …e ek olarak · <span class=\"ar\">خَاصَّةً</span> özellikle · <span class=\"ar\">بِسَبَبِ</span> …yüzünden · <span class=\"ar\">التَّجَوُّلُ</span> dolaşma · <span class=\"ar\">تُقَوِّي</span> güçlendirir. Burada kelimeyi doğru cümleye yerleştir; sonra defterine kendi cümlelerini yaz." }
  ],
  kaide: ["٣ ـ صِلْ بَيْنَ الجُمَلِ فِي «أ» وَمَا يُنَاسِبُهَا فِي «ب». ٤ ـ ضَعِ الكَلِمَاتِ الآتِيَةَ فِي الفَرَاغِ المُنَاسِبِ: (التَّارِيخِيَّةَ، العُطْلَةِ، يَتَحَدَّثُونَ، الجَامِعَةِ، المُدُنِ، يَحْتَاجُ، يُفَضِّلُ، الأَصْدِقَاءُ).", "٨ ـ ضَعِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ مُنَاسِبَةٍ: قَضَى، إِضَافَةً إِلَى، خَاصَّةً، بِسَبَبِ، التَّجَوُّلُ، تُقَوِّي."],
  ex: [
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ الجُمَلِ فِي «أ» وَمَا يُنَاسِبُهَا فِي «ب»", tr: "Önce aşağıdan cümlenin devamını seç, sonra başının kutusuna dokun.", bank: ["أَوْقَاتَهُمْ فِي عَادَاتٍ قَدْ تَكُونُ سَيِّئَةً.", "تَحْتَاجُ إِلَى فَرِيقَيْنِ عَادَةً.", "تَفْتَحُ دَوْرَاتٍ لِتَحْفِيظِ القُرْآنِ الكَرِيمِ.", "فِي الجِسْمِ السَّلِيمِ.", "تُقَدِّمُ المُتْعَةَ وَالفَائِدَةَ.", "تُقَوِّي الثَّقَافَةَ."], items: [
      { pre: "العَقْلُ السَّلِيمُ", a: [3], tr: "Sağlam kafa sağlam vücutta." }, { pre: "الكَثِيرُ مِنَ الأَوْقَافِ", a: [2], tr: "Birçok vakıf Kur’an kursu açar." }, { pre: "يَقْضِي بَعْضُ الشَّبَابِ", a: [0], tr: "Bazı gençler vakitlerini kötü olabilecek alışkanlıklarla geçirir." }, { pre: "الأَلْعَابُ الجَمَاعِيَّةُ", a: [1], tr: "Takım oyunları genellikle iki takım gerektirir." }, { pre: "المُطَالَعَةُ", a: [5], tr: "Okuma kültürü güçlendirir." }, { pre: "الهِوَايَاتُ", a: [4], tr: "Hobiler zevk ve fayda verir." }
    ]},
    { type: "bank", num: "٤", ar: "ضَعِ الكَلِمَاتِ الآتِيَةَ فِي الفَرَاغِ المُنَاسِبِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Her kelime bir kez kullanılır.", bank: ["التَّارِيخِيَّةَ", "العُطْلَةِ", "يَتَحَدَّثُونَ", "الجَامِعَةِ", "المُدُنِ", "يَحْتَاجُ", "يُفَضِّلُ", "الأَصْدِقَاءُ"],
      tr2: "Arkadaşlar her yıl yaz tatilinin sonunda üniversiteye yakın bir lokantada toplanır ve tatilden, okuldan konuşurlar. Hâlid yolculuk ettiği ülkeleri anlattı; yolculuğu çok sever, tatilde birçok güzel şehir gezdi. Sâmir ise tatilde çalışmayı tercih eder, çünkü üniversitede okumak için paraya ihtiyacı var. Suâd ağabeyi Sâmir’le aynı üniversitede gazetecilik okuyor; okumayı çok sever. Hanân ise tarih okuyor ve eski tarihî yerleri sever.",
      parts: ["يَجْتَمِعُ", { a: [7] }, "فِي كُلِّ عَامٍ بِنِهَايَةِ", { a: [1] }, "الصَّيْفِيَّةِ فِي مَطْعَمٍ قَرِيبٍ مِنَ الجَامِعَةِ، وَ", { a: [2] }, "عَنِ العُطْلَةِ وَالدِّرَاسَةِ، تَحَدَّثَ خَالِدٌ عَنِ البِلَادِ الَّتِي سَافَرَ إِلَيْهَا، فَهُوَ يُحِبُّ السَّفَرَ كَثِيرًا، وَقَدْ زَارَ فِي العُطْلَةِ كَثِيرًا مِنَ", { a: [4] }, "الجَمِيلَةِ، أَمَّا سَامِرٌ فَهُوَ", { a: [6] }, "العَمَلَ فِي العُطْلَةِ، لِأَنَّهُ", { a: [5] }, "إِلَى النُّقُودِ لِلدِّرَاسَةِ فِي الجَامِعَةِ.<br>أَمَّا سُعَادُ فَتَدْرُسُ الصَّحَافَةَ مَعَ أَخِيهَا سَامِرٍ فِي", { a: [3] }, "نَفْسِهَا، وَهِيَ تُحِبُّ القِرَاءَةَ كَثِيرًا، أَمَّا حَنَانُ فَهِيَ تَدْرُسُ التَّارِيخَ وَتُحِبُّ الأَمَاكِنَ", { a: [0] }, "القَدِيمَةَ."] },
    { type: "pick", fill: true, num: "٨", ar: "ضَعِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ مُنَاسِبَةٍ", tr: "Boşluğa uyan kelimeyi seç; sonra defterine bu kelimelerle kendi cümlelerini yaz.", items: PL([
      ["___ أَخِي العُطْلَةَ فِي قَرْيَةِ جَدِّي.", "قَضَى", "التَّجَوُّلُ", "بِسَبَبِ", "Kardeşim tatili dedemin köyünde geçirdi.", "قَضَى = أَمْضَى"],
      ["أَقْرَأُ الكُتُبَ، ___ تَعَلُّمِ اللُّغَةِ الإِنْجِلِيزِيَّةِ.", "إِضَافَةً إِلَى", "بِسَبَبِ", "خَاصَّةً", "Kitap okurum; ayrıca İngilizce öğrenirim.", "إِضَافَةً إِلَى + mecrûr"],
      ["أُحِبُّ الرِّيَاضَةَ، ___ كُرَةَ القَدَمِ.", "خَاصَّةً", "بِسَبَبِ", "قَضَى", "Sporu, özellikle futbolu severim.", "خَاصَّةً: özellikle"],
      ["لَمْ أَخْرُجْ مِنَ البَيْتِ ___ المَطَرِ.", "بِسَبَبِ", "خَاصَّةً", "إِضَافَةً إِلَى", "Yağmur yüzünden evden çıkmadım.", "بِسَبَبِ + mecrûr"],
      ["___ فِي الشَّوَارِعِ لِوَقْتٍ طَوِيلٍ لَيْسَ مُفِيدًا.", "التَّجَوُّلُ", "تُقَوِّي", "قَضَى", "Sokaklarda uzun süre dolaşmak faydalı değildir.", "Mastar mübtedâ olur."],
      ["المُطَالَعَةُ ___ ثَقَافَةَ الإِنْسَانِ.", "تُقَوِّي", "قَضَى", "التَّجَوُّلُ", "Okuma insanın kültürünü güçlendirir.", "تُقَوِّي (dişil özne)"]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · SPOR VE KALIPLAR
{
  id: "u5", no: 5, ar: "أَنْوَاعُ النَّشَاطَاتِ وَالتَّرَاكِيبُ", tr: "Etkinlik Türleri ve Kalıplar: قَدْ، حَتَّى، يَحْتَاجُ إِلَى، بِشَكْلٍ عَامٍّ", short: "Kalıplar", col: "muz", legend: ["mi", "ref", "nasb"],
  goals: ["Etkinlikleri türüne ayırmak: Kur’an, bireysel spor, takım oyunu, fikrî", "قَدْ + muzâri (“…bilir, bazen”) kalıbını kullanmak", "حَتَّى + muzâri mansûb (“…sın diye”) kalıbını kullanmak", "يَحْتَاجُ إِلَى، بِشَكْلٍ عَامٍّ / خَاصٍّ، إِضَافَةً إِلَى kalıplarını kullanmak"],
  examples: [
    { s: "قَدْ:mi.Olasılık / تَكُونُ:ref.Muzâri / هَذِهِ العُطْلَةُ مُمِلَّةً.:-", tr: "Bu tatil sıkıcı olabilir.", pair: "حَتَّى:mi.Amaç / يَحْفَظُوا:ref.Mansûb / كِتَابَ اللهِ.:-", pairTr: "Allah’ın kitabını ezberlesinler diye." },
    { s: "الجِسْمُ:- / يَحْتَاجُ إِلَى:mi / الرِّيَاضَةِ.:nasb", tr: "Beden spora ihtiyaç duyar." }
  ],
  rules: [
    { tr: "<b>قَدْ + muzâri</b> “…bilir, bazen …”: olasılık ve azlık bildirir: <span class=\"ar\">قَدْ تَكُونُ العُطْلَةُ مُمِلَّةً</span> tatil sıkıcı olabilir · <span class=\"ar\">قَدْ يَكُونُ سَيِّئًا</span> kötü olabilir. (<span class=\"ar\">قَدْ + mâzî</span> ise “…mıştır, gerçekten” anlamı verir: <span class=\"ar\">قَدْ زَارَ</span>.)" },
    { tr: "<b>حَتَّى + muzâri mansûb</b> “…sın diye, …mek için”: <span class=\"ar\">حَتَّى يَحْفَظُوا كِتَابَ اللهِ وَيُطَبِّقُوا أَوَامِرَهُ</span>. Çoğul fiilde sondaki <span class=\"ar\">ن</span> düşer: <span class=\"ar\">يَحْفَظُونَ ← حَتَّى يَحْفَظُوا</span>." },
    { tr: "<b>يَحْتَاجُ إِلَى</b> …e ihtiyaç duyar · <b>بِشَكْلٍ عَامٍّ / بِشَكْلٍ خَاصٍّ</b> genel olarak / özel olarak · <b>إِضَافَةً إِلَى</b> …e ek olarak. Hepsinden sonra gelen isim mecrûrdur." },
    { tr: "<b>Etkinlik türleri:</b> Kur’an kursları · bireysel sporlar <span class=\"ar\">رِيَاضَاتٌ فَرْدِيَّةٌ</span>: yüzme, bisiklet, ip atlama (metin yürüyüş ve koşuyu da spor örneği veriyor) · takım oyunları <span class=\"ar\">أَلْعَابٌ جَمَاعِيَّةٌ</span>: futbol, hentbol, voleybol, basketbol · fikrî etkinlikler: kitap okuma, yabancı dil." }
  ],
  kaide: ["قَدْ تَكُونُ هَذِهِ العُطْلَةُ مُمِلَّةً لِبَعْضِهِمْ بِسَبَبِ الفَرَاغِ. · حَتَّى يَحْفَظُوا كِتَابَ اللهِ وَيُطَبِّقُوا أَوَامِرَهُ.", "فَجِسْمُ الإِنْسَانِ يَحْتَاجُ دَائِمًا إِلَى الرِّيَاضَةِ. · تُقَوِّي المَحَبَّةَ بَيْنَ الشَّبَابِ بِشَكْلٍ عَامٍّ، وَبَيْنَ الأَصْدِقَاءِ بِشَكْلٍ خَاصٍّ."],
  ex: [
    { type: "classify", extra: true, opts: KAT, ar: "صَنِّفِ النَّشَاطَاتِ النَّافِعَةَ", tr: "Metne göre bu faydalı etkinlik hangi türde?", items: CL([
      ["دَوْرَاتُ تَحْفِيظِ القُرْآنِ 📖", "din", "Kur’an kursları."],
      ["السِّبَاحَةُ 🏊", "rf", "رِيَاضَةٌ فَرْدِيَّةٌ"], ["رُكُوبُ الدَّرَّاجَةِ 🚴", "rf", "رِيَاضَةٌ فَرْدِيَّةٌ"], ["قَفْزُ الحَبْلِ 🪢", "rf", "رِيَاضَةٌ فَرْدِيَّةٌ"], ["الجَرْيُ 🏃", "rf", "Tek başına yapılır (metinde genel spor örneği)."],
      ["كُرَةُ القَدَمِ ⚽", "rc", "لُعْبَةٌ جَمَاعِيَّةٌ"], ["كُرَةُ اليَدِ 🤾", "rc", "لُعْبَةٌ جَمَاعِيَّةٌ"], ["الكُرَةُ الطَّائِرَةُ 🏐", "rc", "لُعْبَةٌ جَمَاعِيَّةٌ"], ["كُرَةُ السَّلَّةِ 🏀", "rc", "لُعْبَةٌ جَمَاعِيَّةٌ"],
      ["قِرَاءَةُ الكُتُبِ 📚", "fk", "نَشَاطٌ فِكْرِيٌّ"], ["تَعَلُّمُ اللُّغَاتِ الأَجْنَبِيَّةِ 🗣️", "fk", "نَشَاطٌ فِكْرِيٌّ"]
    ]) },
    { type: "pick", fill: true, ar: "اخْتَرِ التَّرْكِيبَ المُنَاسِبَ", tr: "Boşluğa kalıba uyan doğru biçimi seç.", items: PL([
      ["___ تَكُونُ العُطْلَةُ مُمِلَّةً بِسَبَبِ الفَرَاغِ.", "قَدْ", "لَنْ", "لَمْ", "Tatil boşluk yüzünden sıkıcı olabilir.", "قَدْ + muzâri: olasılık."],
      ["يَذْهَبُ الأَطْفَالُ إِلَى الدَّوْرَةِ حَتَّى ___ القُرْآنَ.", "يَحْفَظُوا", "يَحْفَظُونَ", "حَفِظُوا", "Çocuklar Kur’an’ı ezberlesinler diye kursa gider.", "حَتَّى + mansûb: ن düşer."],
      ["جِسْمُ الإِنْسَانِ يَحْتَاجُ ___ الرِّيَاضَةِ.", "إِلَى", "عَلَى", "مِنْ", "İnsan bedeni spora ihtiyaç duyar.", "يَحْتَاجُ إِلَى"],
      ["أُحِبُّ الرِّيَاضَةَ بِشَكْلٍ عَامٍّ، وَكُرَةَ القَدَمِ ___ .", "بِشَكْلٍ خَاصٍّ", "بِشَكْلٍ عَامٍّ", "بِسَبَبٍ", "Sporu genel olarak, futbolu özellikle severim.", "عَامٌّ ≠ خَاصٌّ"],
      ["أَقْرَأُ الكُتُبَ ___ مُمَارَسَةِ الرِّيَاضَةِ.", "إِضَافَةً إِلَى", "بِسَبَبِ", "حَتَّى", "Spor yapmanın yanında kitap da okurum.", "إِضَافَةً إِلَى + mecrûr"],
      ["أَمَّا بَعْضُهُمُ الآخَرُ ___ قَضَاءَ وَقْتِهِ بِشَيْءٍ نَافِعٍ.", "فَيُحَاوِلُ", "يُحَاوِلُ", "وَيُحَاوِلُ", "Diğerleri ise vaktini faydalı bir şeyle geçirmeye çalışır.", "أَمَّا… فَـ…"]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["يَقْضِي الشَّبَابُ {رُبُعَ} عَامِهِمُ الدِّرَاسِيِّ فِي عُطْلَةٍ طَوِيلَةٍ.", ["رُبُعَ", "نِصْفَ", "كُلَّ"], "metin", "Okul yılının dörtte biri.", "u1"],
  ["قَدْ تَكُونُ هَذِهِ العُطْلَةُ {مُمِلَّةً} لِبَعْضِهِمْ.", ["مُمِلَّةً", "مُمْتِعَةً", "قَصِيرَةً"], "metin", "Tatil sıkıcı olabilir.", "u1"],
  ["مَاذَا أَفْعَلُ؟ أَيْنَ أَذْهَبُ؟ أَشْعُرُ بِ{المَلَلِ}!", ["المَلَلِ", "الفَرَحِ", "الجُوعِ"], "metin", "Canım sıkılıyor!", "u1"],
  ["قَدْ يَكُونُ سَيِّئًا أَحْيَانًا، مِثْلَ {التَّدْخِينِ}.", ["التَّدْخِينِ", "المُطَالَعَةِ", "السِّبَاحَةِ"], "metin", "Sigara içmek gibi.", "u1"],
  ["إِضَافَةً إِلَى التَّجَوُّلِ فِي الشَّوَارِعِ وَالجُلُوسِ فِي {المَقَاهِي}.", ["المَقَاهِي", "المَسَاجِدِ", "المَكْتَبَاتِ"], "metin", "Kahvehanelerde oturmak.", "u1"],
  ["مِثْلَ المُطَالَعَةِ الَّتِي تُقَوِّي {ثَقَافَتَهُ}.", ["ثَقَافَتَهُ", "مَلَلَهُ", "تَعَبَهُ"], "metin", "Kültürünü güçlendiren okuma.", "u1"],
  ["تَفْتَحُ دَوْرَاتٍ لِتَحْفِيظِ {القُرْآنِ} الكَرِيمِ.", ["القُرْآنِ", "الشِّعْرِ", "التَّارِيخِ"], "metin", "Kur’an kursları açar.", "u1"],
  ["إِنَّ العَقْلَ السَّلِيمَ فِي {الجِسْمِ} السَّلِيمِ.", ["الجِسْمِ", "البَيْتِ", "الكِتَابِ"], "söz", "Sağlam kafa sağlam vücutta.", "u1"],
  ["السِّبَاحَةُ وَقَفْزُ الحَبْلِ رِيَاضَاتٌ {فَرْدِيَّةٌ}.", ["فَرْدِيَّةٌ", "جَمَاعِيَّةٌ", "فِكْرِيَّةٌ"], "anlama", "Bireysel sporlar.", "u2"],
  ["الأَلْعَابُ الجَمَاعِيَّةُ تَحْتَاجُ إِلَى {فَرِيقَيْنِ}.", ["فَرِيقَيْنِ", "كِتَابَيْنِ", "سَاعَتَيْنِ"], "anlama", "İki takım gerektirir.", "u2"],
  ["لِسَانٌ وَاحِدٌ {إِنْسَانٌ} وَاحِدٌ.", ["إِنْسَانٌ", "كِتَابٌ", "بَيْتٌ"], "atasözü", "Bir lisan bir insan.", "u2"],
  ["المَقَاهِي ← {مَقْهًى}.", ["مَقْهًى", "قَهْوَةٌ", "مَقْهَاةٌ"], "tekil", "Kahvehaneler → kahvehane.", "u3"],
  ["أَسَالِيبُ ← {أُسْلُوبٌ}.", ["أُسْلُوبٌ", "سَلْبٌ", "سَالِبٌ"], "tekil", "Yöntemler → yöntem.", "u3"],
  ["مَشَى = {سَارَ}.", ["سَارَ", "رَكَضَ", "قَضَى"], "eş anlam", "Yürüdü.", "u3"],
  ["جَرَى = {رَكَضَ}.", ["رَكَضَ", "سَارَ", "تَكَلَّمَ"], "eş anlam", "Koştu.", "u3"],
  ["حَفِظَ ≠ {نَسِيَ}.", ["نَسِيَ", "قَرَأَ", "تَعَلَّمَ"], "zıt", "Ezberledi ≠ unuttu.", "u3"],
  ["جَمَاعِيَّةٌ ≠ {فَرْدِيَّةٌ}.", ["فَرْدِيَّةٌ", "مُمِلَّةٌ", "مُخْتَلِفَةٌ"], "zıt", "Takım ≠ bireysel.", "u3"],
  ["الأَلْعَابُ الجَمَاعِيَّةُ تَحْتَاجُ إِلَى فَرِيقَيْنِ {عَادَةً}.", ["عَادَةً", "أَبَدًا", "نَادِرًا"], "eşleştirme", "Genellikle iki takım gerektirir.", "u4"],
  ["أَمَّا سَامِرٌ فَهُوَ {يُفَضِّلُ} العَمَلَ فِي العُطْلَةِ.", ["يُفَضِّلُ", "يَتَحَدَّثُونَ", "يَحْتَاجُ"], "boşluk", "Sâmir çalışmayı tercih eder.", "u4"],
  ["لَمْ أَخْرُجْ {بِسَبَبِ} المَطَرِ.", ["بِسَبَبِ", "خَاصَّةً", "إِضَافَةً"], "kelime", "Yağmur yüzünden çıkmadım.", "u4"],
  ["{قَدْ} يَكُونُ سَيِّئًا أَحْيَانًا.", ["قَدْ", "لَنْ", "لَمْ"], "kalıp", "Bazen kötü olabilir.", "u5"],
  ["حَتَّى {يَحْفَظُوا} كِتَابَ اللهِ.", ["يَحْفَظُوا", "يَحْفَظُونَ", "حَفِظُوا"], "kalıp", "Ezberlesinler diye.", "u5"],
  ["جِسْمُ الإِنْسَانِ يَحْتَاجُ {إِلَى} الرِّيَاضَةِ.", ["إِلَى", "عَلَى", "مِنْ"], "kalıp", "Spora ihtiyaç duyar.", "u5"],
  ["بَيْنَ الشَّبَابِ بِشَكْلٍ عَامٍّ، وَبَيْنَ الأَصْدِقَاءِ بِشَكْلٍ {خَاصٍّ}.", ["خَاصٍّ", "عَامٍّ", "كَبِيرٍ"], "kalıp", "Özellikle arkadaşlar arasında.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["عُطْلَةُ الصَّيْفِ قَصِيرَةٌ ← metne göre düzelt", "عُطْلَةُ الصَّيْفِ طَوِيلَةٌ", "عُطْلَةُ الصَّيْفِ مُمْتِعَةٌ دَائِمًا", "لَيْسَ فِي الصَّيْفِ عُطْلَةٌ", "Uzun bir tatil.", "u1"],
  ["كُرَةُ القَدَمِ رِيَاضَةٌ فَرْدِيَّةٌ ← düzelt", "كُرَةُ القَدَمِ لُعْبَةٌ جَمَاعِيَّةٌ", "كُرَةُ القَدَمِ نَشَاطٌ فِكْرِيٌّ", "كُرَةُ القَدَمِ عَادَةٌ سَيِّئَةٌ", "Takım oyunu.", "u2"],
  ["يَحْتَاجُ الجِسْمُ أَحْيَانًا إِلَى الرِّيَاضَةِ ← düzelt", "يَحْتَاجُ الجِسْمُ دَائِمًا إِلَى الرِّيَاضَةِ", "لَا يَحْتَاجُ الجِسْمُ إِلَى الرِّيَاضَةِ", "يَحْتَاجُ الجِسْمُ إِلَى النَّوْمِ فَقَطْ", "Her zaman.", "u2"],
  ["وَسَائِلُ ← tekil", "وَسِيلَةٌ", "وَسَطٌ", "وَسِيلٌ", "araçlar → araç", "u3"],
  ["المَرَاكِزُ ← tekil", "مَرْكَزٌ", "رَكِيزَةٌ", "مُرَكَّزٌ", "merkezler → merkez", "u3"],
  ["قَضَى ← eş anlam", "أَمْضَى", "نَسِيَ", "سَارَ", "geçirdi", "u3"],
  ["يَنْفَعُ ← eş anlam", "يُفِيدُ", "يَضُرُّ", "يَحْفَظُ", "fayda verir", "u3"],
  ["ارْتَفَعَ ← zıt anlam", "انْخَفَضَ", "ارْتَقَى", "رَفَعَ", "yükseldi ≠ alçaldı", "u3"],
  ["مُخْتَلِفَةٌ ← zıt anlam", "مُتَشَابِهَةٌ", "مُتَنَوِّعَةٌ", "كَثِيرَةٌ", "farklı ≠ benzer", "u3"],
  ["المُطَالَعَةُ ← tamamla", "المُطَالَعَةُ تُقَوِّي الثَّقَافَةَ", "المُطَالَعَةُ تَحْتَاجُ إِلَى فَرِيقَيْنِ", "المُطَالَعَةُ فِي الجِسْمِ السَّلِيمِ", "Kitaptaki 3. etkinlik.", "u4"],
  ["سَامِرٌ يُفَضِّلُ العَمَلَ ← أَمَّا… فَـ", "أَمَّا سَامِرٌ فَهُوَ يُفَضِّلُ العَمَلَ", "أَمَّا سَامِرٌ هُوَ يُفَضِّلُ العَمَلَ", "فَأَمَّا سَامِرٌ يُفَضِّلُ العَمَلَ", "Cevap فَـ ile başlar.", "u4"],
  ["تَكُونُ العُطْلَةُ مُمِلَّةً ← olasılık", "قَدْ تَكُونُ العُطْلَةُ مُمِلَّةً", "لَنْ تَكُونَ العُطْلَةُ مُمِلَّةً", "كَانَتِ العُطْلَةُ مُمِلَّةً", "قَدْ + muzâri", "u5"],
  ["يَحْفَظُونَ القُرْآنَ ← حَتَّى", "حَتَّى يَحْفَظُوا القُرْآنَ", "حَتَّى يَحْفَظُونَ القُرْآنَ", "حَتَّى حَفِظُوا القُرْآنَ", "Mansûb: ن düşer.", "u5"],
  ["الجِسْمُ + الحَرَكَةُ ← يَحْتَاجُ", "يَحْتَاجُ الجِسْمُ إِلَى الحَرَكَةِ", "يَحْتَاجُ الجِسْمُ الحَرَكَةُ", "يَحْتَاجُ الجِسْمُ عَلَى الحَرَكَةِ", "يَحْتَاجُ إِلَى + mecrûr", "u5"]
];
// Faydalı mı, zararlı mı? hız oyunu
var NOUN_LIST = ACT.map(function (a) { return [a[2] + " يَقْضِي وَقْتَهُ فِي " + a[0] + ".", a[3] ? "f" : "z", a[3] ? "Faydalı." : "Aşırısı kötü olabilir."]; });
var SP_M = FZ;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; }).concat(UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; }));
var HAFIZA = {
  es: { name: "Kelime ↔ eş anlamlısı", pairs: [["عَامٌ", "سَنَةٌ"], ["تَحَدَّثَ", "تَكَلَّمَ"], ["قَضَى", "أَمْضَى"], ["مَشَى", "سَارَ"], ["يَنْفَعُ", "يُفِيدُ"], ["جَرَى", "رَكَضَ"], ["وَقْتٌ", "زَمَنٌ"], ["الشَّوَارِعُ", "الطُّرُقُ"]] },
  zd: { name: "Kelime ↔ zıt anlamlısı", pairs: [["مُفِيدَةٌ", "ضَارَّةٌ"], ["مُمْتِعَةٌ", "مُمِلَّةٌ"], ["ارْتَفَعَ", "انْخَفَضَ"], ["حَفِظَ", "نَسِيَ"], ["مُخْتَلِفَةٌ", "مُتَشَابِهَةٌ"], ["جَمَاعِيَّةٌ", "فَرْدِيَّةٌ"]] },
  cm: { name: "Çoğul ↔ tekil", pairs: [["المَقَاهِي", "مَقْهًى"], ["أَلْعَابٌ", "لُعْبَةٌ"], ["عَادَاتٌ", "عَادَةٌ"], ["وَسَائِلُ", "وَسِيلَةٌ"], ["طُرُقٌ", "طَرِيقٌ"], ["أَسَالِيبُ", "أُسْلُوبٌ"], ["المَرَاكِزُ", "مَرْكَزٌ"], ["الأَوْقَافُ", "وَقْفٌ"]] }
};
var KARTLAR = [
  ["Yaz tatili ne kadar?", "رُبُعُ العَامِ الدِّرَاسِيِّ · قَدْ تَكُونُ مُمِلَّةً بِسَبَبِ الفَرَاغِ"],
  ["Kötü olabilecek alışkanlıklar?", "التَّدْخِينُ · التَّحَدُّثُ عَلَى الهَاتِفِ طَوِيلًا · وَسَائِلُ التَّوَاصُلِ · التَّجَوُّلُ فِي الشَّوَارِعِ · الجُلُوسُ فِي المَقَاهِي"],
  ["Faydalı etkinlikler?", "المُطَالَعَةُ · دَوْرَاتُ تَحْفِيظِ القُرْآنِ · الرِّيَاضَةُ · النَّشَاطَاتُ الفِكْرِيَّةُ"],
  ["Bireysel sporlar?", "السِّبَاحَةُ · رُكُوبُ الدَّرَّاجَةِ · قَفْزُ الحَبْلِ (ve المَشْيُ، الجَرْيُ)"],
  ["Takım oyunları?", "كُرَةُ القَدَمِ · كُرَةُ اليَدِ · الطَّائِرَةُ · السَّلَّةُ · تُقَوِّي المَحَبَّةَ · تَحْتَاجُ إِلَى فَرِيقَيْنِ"],
  ["Fikrî etkinlikler?", "قِرَاءَةُ الكُتُبِ · تَعَلُّمُ اللُّغَاتِ الأَجْنَبِيَّةِ · «لِسَانٌ وَاحِدٌ إِنْسَانٌ وَاحِدٌ»"],
  ["Sözler?", "العَقْلُ السَّلِيمُ فِي الجِسْمِ السَّلِيمِ · عَلِّمُوا أَوْلَادَكُمُ السِّبَاحَةَ وَالرِّمَايَةَ وَرُكُوبَ الخَيْلِ"],
  ["Tekiller?", "مَقَاهٍ ← مَقْهًى · وَسَائِلُ ← وَسِيلَةٌ · أَسَالِيبُ ← أُسْلُوبٌ · مَرَاكِزُ ← مَرْكَزٌ · أَوْقَافٌ ← وَقْفٌ"],
  ["Eş anlamlar?", "عَامٌ = سَنَةٌ · قَضَى = أَمْضَى · مَشَى = سَارَ · جَرَى = رَكَضَ · يَنْفَعُ = يُفِيدُ · وَقْتٌ = زَمَنٌ"],
  ["Zıt anlamlar?", "مُفِيدَةٌ ≠ ضَارَّةٌ · مُمْتِعَةٌ ≠ مُمِلَّةٌ · ارْتَفَعَ ≠ انْخَفَضَ · حَفِظَ ≠ نَسِيَ · جَمَاعِيَّةٌ ≠ فَرْدِيَّةٌ"],
  ["قَدْ + muzâri?", "“…bilir, bazen”: قَدْ تَكُونُ العُطْلَةُ مُمِلَّةً"],
  ["حَتَّى + muzâri?", "“…sın diye” + mansûb: حَتَّى يَحْفَظُوا (ن düşer)"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat14";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("فَرَاغٌ", "i", "boşluk, boş vakit", "", "", "", "", "قَدْ تَكُونُ هَذِهِ العُطْلَةُ مُمِلَّةً بِسَبَبِ الفَرَاغِ.", "الفَرَاغِ", "Tatil boşluk yüzünden sıkıcı olabilir."),
  KW("عُطْلَةٌ", "i", "tatil", "عُطَلٌ", "fual_f", "إِجَازَةٌ", "", "فِي عُطْلَةٍ طَوِيلَةٍ، هِيَ عُطْلَةُ الصَّيْفِ.", "عُطْلَةُ", "Uzun bir tatilde: yaz tatili."),
  KW("عَامٌ", "i", "yıl", "أَعْوَامٌ", "efal", "سَنَةٌ", "", "يَقْضِي الشَّبَابُ رُبُعَ عَامِهِمُ الدِّرَاسِيِّ.", "عَامِهِمُ", "Okul yıllarının dörtte biri."),
  KW("عِبَارَةٌ", "i", "ifade, söz", "عِبَارَاتٌ", "at", "", "", "نَجِدُ بَعْضَ الشَّبَابِ يُكَرِّرُ عِبَارَاتٍ.", "عِبَارَاتٍ", "Bazı gençler sözleri tekrarlar."),
  KW("عَادَةٌ", "i", "alışkanlık, âdet", "عَادَاتٌ", "at", "", "", "يَقْضِي بَعْضُ الشَّبَابِ أَوْقَاتَهُمْ فِي عَادَاتٍ قَدْ تَكُونُ سَيِّئَةً.", "عَادَاتٍ", "Kötü olabilecek alışkanlıklarda."),
  KW("مَقْهًى", "i", "kahvehane", "مَقَاهٍ", "mefail", "", "", "وَالجُلُوسِ فِي المَقَاهِي.", "المَقَاهِي", "Kahvehanelerde oturmak."),
  KW("وَسِيلَةٌ", "i", "araç, vasıta", "وَسَائِلُ", "feail", "", "", "عَلَى وَسَائِلِ التَّوَاصُلِ الاجْتِمَاعِيِّ.", "وَسَائِلِ", "Sosyal medyada."),
  KW("طَرِيقٌ", "i", "yol", "طُرُقٌ", "fuul_k", "شَارِعٌ", "", "كُلُّهَا طُرُقٌ خَاطِئَةٌ وَأَسَالِيبُ ضَارَّةٌ.", "طُرُقٌ", "Hepsi yanlış yollar ve zararlı yöntemler."),
  KW("أُسْلُوبٌ", "i", "yöntem, üslup", "أَسَالِيبُ", "efail", "طَرِيقَةٌ", "", "كُلُّهَا طُرُقٌ خَاطِئَةٌ وَأَسَالِيبُ ضَارَّةٌ.", "وَأَسَالِيبُ", "Zararlı yöntemler."),
  KW("نَشَاطٌ", "i", "etkinlik", "نَشَاطَاتٌ / أَنْشِطَةٌ", "at", "", "كَسَلٌ", "وَمِنْ هَذِهِ النَّشَاطَاتِ.", "النَّشَاطَاتِ", "Bu etkinliklerden."),
  KW("مَرْكَزٌ", "i", "merkez", "مَرَاكِزُ", "mefail", "", "", "فَكَثِيرٌ مِنَ المَرَاكِزِ وَالأَوْقَافِ.", "المَرَاكِزِ", "Birçok merkez ve vakıf."),
  KW("وَقْفٌ", "i", "vakıf", "أَوْقَافٌ", "efal", "", "", "فَكَثِيرٌ مِنَ المَرَاكِزِ وَالأَوْقَافِ.", "وَالأَوْقَافِ", "Merkezler ve vakıflar."),
  KW("دَوْرَةٌ", "i", "kurs", "دَوْرَاتٌ", "at", "", "", "تَفْتَحُ دَوْرَاتٍ لِتَحْفِيظِ القُرْآنِ الكَرِيمِ.", "دَوْرَاتٍ", "Kur’an kursları açar."),
  KW("ثَقَافَةٌ", "i", "kültür", "ثَقَافَاتٌ", "at", "", "", "مِثْلَ المُطَالَعَةِ الَّتِي تُقَوِّي ثَقَافَتَهُ.", "ثَقَافَتَهُ", "Kültürünü güçlendiren okuma."),
  KW("حَرَكَةٌ", "i", "hareket", "حَرَكَاتٌ", "at", "", "سُكُونٌ", "يَحْتَاجُ دَائِمًا إِلَى الرِّيَاضَةِ وَالحَرَكَةِ.", "وَالحَرَكَةِ", "Spora ve harekete ihtiyaç duyar."),
  KW("فَرِيقٌ", "i", "takım", "فِرَقٌ", "fial_f", "", "", "وَهِيَ تَحْتَاجُ إِلَى فَرِيقَيْنِ.", "فَرِيقَيْنِ", "İki takım gerektirir."),
  KW("مَحَبَّةٌ", "i", "sevgi", "", "", "حُبٌّ", "كَرَاهِيَةٌ", "تُقَوِّي المَحَبَّةَ بَيْنَ الشَّبَابِ.", "المَحَبَّةَ", "Gençler arasında sevgiyi güçlendirir."),
  KW("لِسَانٌ", "i", "dil, lisan", "أَلْسِنَةٌ", "efile", "لُغَةٌ", "", "لِسَانٌ وَاحِدٌ إِنْسَانٌ وَاحِدٌ.", "لِسَانٌ", "Bir lisan bir insan."),
  KW("مُمِلٌّ", "s", "sıkıcı", "", "", "", "مُمْتِعٌ", "قَدْ تَكُونُ هَذِهِ العُطْلَةُ مُمِلَّةً.", "مُمِلَّةً", "Bu tatil sıkıcı olabilir."),
  KW("سَيِّئٌ", "s", "kötü", "", "", "", "حَسَنٌ", "قَدْ يَكُونُ سَيِّئًا أَحْيَانًا.", "سَيِّئًا", "Bazen kötü olabilir."),
  KW("نَافِعٌ", "s", "faydalı", "", "", "مُفِيدٌ", "ضَارٌّ", "فَيُحَاوِلُ قَضَاءَ هَذِهِ الأَوْقَاتِ بِشَيْءٍ نَافِعٍ.", "نَافِعٍ", "Faydalı bir şeyle geçirmeye çalışır."),
  KW("ضَارٌّ", "s", "zararlı", "", "", "", "مُفِيدٌ", "كُلُّهَا طُرُقٌ خَاطِئَةٌ وَأَسَالِيبُ ضَارَّةٌ.", "ضَارَّةٌ", "Zararlı yöntemler."),
  KW("فَرْدِيٌّ", "s", "bireysel", "", "", "", "جَمَاعِيٌّ", "وَهِيَ رِيَاضَاتٌ فَرْدِيَّةٌ.", "فَرْدِيَّةٌ", "Bunlar bireysel sporlardır."),
  KW("جَمَاعِيٌّ", "s", "toplu, takım hâlinde", "", "", "", "فَرْدِيٌّ", "وَهُنَاكَ أَلْعَابٌ جَمَاعِيَّةٌ.", "جَمَاعِيَّةٌ", "Takım oyunları da vardır."),
  KW("أَجْنَبِيٌّ", "s", "yabancı", "أَجَانِبُ", "efail", "", "وَطَنِيٌّ", "وَالاهْتِمَامِ بِتَعَلُّمِ اللُّغَاتِ الأَجْنَبِيَّةِ.", "الأَجْنَبِيَّةِ", "Yabancı dil öğrenmeye önem vermek."),
  KW("مُخْتَلِفٌ", "s", "farklı", "", "", "", "مُتَشَابِهٌ", "مُخْتَلِفَةٌ ≠ مُتَشَابِهَةٌ", "مُخْتَلِفَةٌ", "farklı ≠ benzer"),
  KW("قَضَى", "f", "geçirdi", "", "", "أَمْضَى", "", "يَقْضِي الشَّبَابُ رُبُعَ عَامِهِمُ الدِّرَاسِيِّ فِي عُطْلَةٍ.", "يَقْضِي", "Gençler okul yılının dörtte birini tatilde geçirir."),
  KW("كَرَّرَ", "f", "tekrarladı", "", "", "رَدَّدَ", "", "نَجِدُ بَعْضَ الشَّبَابِ يُكَرِّرُ عِبَارَاتٍ.", "يُكَرِّرُ", "Bazı gençler sözleri tekrarlar."),
  KW("حَاوَلَ", "f", "çalıştı, denedi", "", "", "", "", "أَمَّا بَعْضُهُمُ الآخَرُ فَيُحَاوِلُ قَضَاءَ هَذِهِ الأَوْقَاتِ.", "فَيُحَاوِلُ", "Diğerleri ise geçirmeye çalışır."),
  KW("قَوَّى", "f", "güçlendirdi", "", "", "", "أَضْعَفَ", "مِثْلَ المُطَالَعَةِ الَّتِي تُقَوِّي ثَقَافَتَهُ.", "تُقَوِّي", "Kültürünü güçlendiren okuma."),
  KW("حَفِظَ", "f", "ezberledi; korudu", "", "", "", "نَسِيَ", "حَتَّى يَحْفَظُوا كِتَابَ اللهِ.", "يَحْفَظُوا", "Allah’ın kitabını ezberlesinler diye."),
  KW("طَبَّقَ", "f", "uyguladı", "", "", "", "", "وَيُطَبِّقُوا أَوَامِرَهُ.", "وَيُطَبِّقُوا", "Emirlerini uygulasınlar diye."),
  KW("مَشَى", "f", "yürüdü", "", "", "سَارَ", "", "مِثْلَ المَشْيِ وَالجَرْيِ.", "المَشْيِ", "Yürüyüş ve koşu gibi."),
  KW("جَرَى", "f", "koştu", "", "", "رَكَضَ", "", "مِثْلَ المَشْيِ وَالجَرْيِ.", "وَالجَرْيِ", "Yürüyüş ve koşu gibi."),
  KW("تَحَدَّثَ", "f", "konuştu", "", "", "تَكَلَّمَ", "سَكَتَ", "أَوِ التَّحَدُّثِ عَلَى الهَاتِفِ لِوَقْتٍ طَوِيلٍ.", "التَّحَدُّثِ", "Ya da telefonda uzun konuşmak."),
  KW("نَفَعَ", "f", "fayda verdi", "", "", "أَفَادَ", "ضَرَّ", "يَنْفَعُ = يُفِيدُ", "يَنْفَعُ", "fayda verir"),
  KW("ارْتَفَعَ", "f", "yükseldi", "", "", "", "انْخَفَضَ", "ارْتَفَعَ ≠ انْخَفَضَ", "ارْتَفَعَ", "yükseldi ≠ alçaldı")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"efal":["أَفْعَالٌ","ef’âl","أَعْوَامٌ، أَوْقَافٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَلْسِنَةٌ، أَنْشِطَةٌ"],"fuul_k":["فُعُلٌ","fu’ul","طُرُقٌ، كُتُبٌ"],"fial_f":["فِعَلٌ","fi’al","فِرَقٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","عُطَلٌ، غُرَفٌ"],"feail":["فَعَائِلُ","feâil","وَسَائِلُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَرَاكِزُ، مَقَاهٍ"],"efail":["أَفَاعِلُ / أَفَاعِيلُ","efâil · efâîl","أَجَانِبُ، أَسَالِيبُ"],"at":["ـَاتٌ","cem-i müennes sâlim","عَادَاتٌ، دَوْرَاتٌ"],"diger":["…","başka kalıplar","أَشْيَاءُ"]};
