// ================= VERİ: Kıraat 12 — الهِوَايَاتُ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الهِوَايَةُ", tr: "Hobi" }, nasb: { ar: "الفَائِدَةُ", tr: "Fayda" }, cerr: { ar: "النَّوْعُ", tr: "Tür" },
  mi: { ar: "حَرْفُ الجَرِّ", tr: "Harf-i cer" }, ref: { ar: "الفِعْلُ", tr: "Fiil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
// Metindeki hobi türleri
var TURLER = [["fn", "Sanat", "هِوَايَاتٌ فَنِّيَّةٌ", "mz"], ["mn", "Ev", "هِوَايَاتٌ مَنْزِلِيَّةٌ", "nasb"], ["fk", "Fikrî spor", "رِيَاضَةٌ فِكْرِيَّةٌ", "mi"], ["cs", "Bedensel spor", "رِيَاضَةٌ جِسْمِيَّةٌ", "cerr"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", fn: "Sanat hobisi", mn: "Ev hobisi", fk: "Fikrî spor", cs: "Bedensel spor" };

// Hobi makinesi: [mecrûr / muzâfun ileyh biçimi, yalın biçim, Türkçe, emoji, tür]
var HOBI = [
  ["الرَّسْمِ", "الرَّسْمُ", "resim", "🎨", "fn"], ["التَّصْوِيرِ", "التَّصْوِيرُ", "fotoğrafçılık", "📷", "fn"], ["التَّمْثِيلِ المَسْرَحِيِّ", "التَّمْثِيلُ المَسْرَحِيُّ", "tiyatro oyunculuğu", "🎭", "fn"], ["صِنَاعَةِ الأَلْعَابِ", "صِنَاعَةُ الأَلْعَابِ", "oyuncak yapımı", "🧸", "fn"],
  ["الطَّبْخِ", "الطَّبْخُ", "yemek pişirme", "🍳", "mn"], ["الخِيَاطَةِ", "الخِيَاطَةُ", "dikiş", "🧵", "mn"], ["التَّطْرِيزِ", "التَّطْرِيزُ", "nakış", "🪡", "mn"], ["البَسْتَنَةِ", "البَسْتَنَةُ", "bahçecilik", "🌱", "mn"], ["تَرْبِيَةِ الحَيَوَانَاتِ", "تَرْبِيَةُ الحَيَوَانَاتِ", "hayvan besleme", "🐈", "mn"],
  ["الشِّطْرَنْجِ", "الشِّطْرَنْجُ", "satranç", "♟️", "fk"],
  ["السِّبَاحَةِ", "السِّبَاحَةُ", "yüzme", "🏊", "cs"], ["كُرَةِ القَدَمِ", "كُرَةُ القَدَمِ", "futbol", "⚽", "cs"], ["رُكُوبِ الدَّرَّاجَةِ", "رُكُوبُ الدَّرَّاجَةِ", "bisiklet sürme", "🚴", "cs"], ["التَّزَلُّجِ", "التَّزَلُّجُ", "kayak", "⛷️", "cs"], ["تَسَلُّقِ الجِبَالِ", "تَسَلُّقُ الجِبَالِ", "dağcılık", "🧗", "cs"], ["المَشْيِ", "المَشْيُ", "yürüyüş", "🚶", "cs"]
];
// Kalıp: [önek (mecrûrdan önce), Türkçe kalıp ("X" yerine hobi)]
var KALIP = [["أُمَارِسُ هِوَايَةَ ", "X hobisiyle uğraşırım."], ["أَرْغَبُ فِي ", "X konusunda istekliyim."], ["أَهْتَمُّ بِ", "X ile ilgilenirim."], ["يُشَجِّعُنِي أَبِي عَلَى ", "Babam beni X konusunda teşvik ediyor."], ["اشْتُهِرَ صَدِيقِي بِ", "Arkadaşım X ile tanınır."]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "الهِوَايَةُ نَشَاطٌ يُحِبُّهُ الإِنْسَانُ وَيُمَارِسُهُ فِي أَوْقَاتِ فَرَاغِهِ لِلْمُتْعَةِ وَالرَّاحَةِ. وَالإِنْسَانُ الَّذِي لَا يُمَارِسُ الهِوَايَاتِ يَشْعُرُ بِالمَلَلِ؛ فَالهِوَايَاتُ تُعْطِي الإِنْسَانَ الرَّاحَةَ بَعْدَ عَنَاءِ العَمَلِ أَوِ الدِّرَاسَةِ، وَتَزِيدُ نَشَاطَهُ وَتُقَوِّي فِكْرَهُ وَجِسْمَهُ وَتُسَاعِدُهُ عَلَى الشِّفَاءِ مِنْ بَعْضِ الأَمْرَاضِ النَّفْسِيَّةِ. وَكُلُّ إِنْسَانٍ، غَنِيٍّ أَوْ فَقِيرٍ، كَبِيرٍ فِي السِّنِّ أَوْ صَغِيرٍ، مَرِيضٍ أَوْ صَحِيحٍ، يُمْكِنُهُ أَنْ يُمَارِسَ هِوَايَةً مِنَ الهِوَايَاتِ." +
  "<br>وَهُنَاكَ أَنْوَاعٌ كَثِيرَةٌ لِلْهِوَايَاتِ، وَيُمْكِنُ أَنْ نَقْسِمَهَا إِلَى الأَنْوَاعِ الآتِيَةِ:" +
  "<br>• هِوَايَاتٌ فَنِّيَّةٌ، مِثْلُ: التَّمْثِيلِ المَسْرَحِيِّ، وَالتَّصْوِيرِ، وَصِنَاعَةِ الأَلْعَابِ، وَغَيْرِهَا." +
  "<br>• هِوَايَاتٌ مَنْزِلِيَّةٌ، مِثْلُ: الطَّبْخِ وَالخِيَاطَةِ وَالتَّطْرِيزِ وَالبَسْتَنَةِ وَتَرْبِيَةِ الحَيَوَانَاتِ." +
  "<br>• هِوَايَاتٌ رِيَاضِيَّةٌ، وَهِيَ أَهَمُّ أَنْوَاعِ الهِوَايَاتِ، لِأَنَّهَا ضَرُورِيَّةٌ لِصِحَّةِ الإِنْسَانِ، وَتَنْقَسِمُ إِلَى قِسْمَيْنِ: فِكْرِيَّةٍ وَجِسْمِيَّةٍ. فَالرِّيَاضَةُ الفِكْرِيَّةُ مِثْلُ الشِّطْرَنْجِ، وَالرِّيَاضَةُ الجِسْمِيَّةُ مِثْلُ السِّبَاحَةِ وَكُرَةِ القَدَمِ وَكُرَةِ السَّلَّةِ وَكُرَةِ الطَّاوِلَةِ وَالمَشْيِ وَرُكُوبِ الدَّرَّاجَةِ وَالتَّزَلُّجِ وَتَسَلُّقِ الجِبَالِ وَالصَّيْدِ وَغَيْرِهَا." +
  "<br>وَقَدْ رَغَّبَ الإِسْلَامُ فِي مُمَارَسَةِ الأَنْشِطَةِ الرِّيَاضِيَّةِ المُفِيدَةِ، فَقَدْ شَجَّعَ النَّبِيُّ ﷺ عَلَيْهَا، قَالَ: «المُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللهِ مِنَ المُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ» (صَحِيحُ مُسْلِمٍ). وَمِنَ الرِّيَاضَاتِ المَعْرُوفَةِ فِي عَهْدِ النَّبِيِّ ﷺ: الجَرْيُ، وَالرَّمْيُ، وَالفُرُوسِيَّةُ، وَالسِّبَاحَةُ، وَالمُصَارَعَةُ، وَالسَّيْفُ، وَالمَشْيُ." +
  "<br>وَقَدِ اهْتَمَّ المُسْلِمُونَ بِمُمَارَسَةِ الأَنْشِطَةِ المُفِيدَةِ فِي كُلِّ العُصُورِ، وَقَوْلُ عُمَرَ بْنِ الخَطَّابِ رَضِيَ اللهُ عَنْهُ مَشْهُورٌ فِي هَذَا السِّيَاقِ: «عَلِّمُوا أَوْلَادَكُمُ الرِّمَايَةَ وَالسِّبَاحَةَ وَرُكُوبَ الخَيْلِ». وَكَذَلِكَ اهْتَمَّ السَّلَاطِينُ العُثْمَانِيُّونَ بِمُمَارَسَةِ بَعْضِ الهِوَايَاتِ، فَالسُّلْطَانُ مُحَمَّدٌ الفَاتِحُ، فَاتِحُ القُسْطَنْطِينِيَّةِ، اشْتُهِرَ بِهِوَايَةِ جَمْعِ الكُتُبِ القَدِيمَةِ وَالقِرَاءَةِ الكَثِيرَةِ. وَالسُّلْطَانُ سُلَيْمَانُ القَانُونِيُّ، السُّلْطَانُ العُثْمَانِيُّ العَاشِرُ، مَارَسَ هِوَايَةَ صِيَاغَةِ الذَّهَبِ وَصِنَاعَةِ الأَشْكَالِ الجَمِيلَةِ، وَالسُّلْطَانُ عَبْدُ الحَمِيدِ الثَّانِي، السُّلْطَانُ الرَّابِعُ وَالثَّلَاثُونَ، مَارَسَ هِوَايَةَ النِّجَارَةِ وَصِنَاعَةِ المُجَسَّمَاتِ الخَشَبِيَّةِ.";
var METIN_TR = "Hobi, insanın sevdiği ve boş vakitlerinde zevk ve dinlenme için yaptığı bir uğraştır. Hobisi olmayan insan sıkılır; hobiler insana iş ya da okul yorgunluğundan sonra dinlenme verir, enerjisini artırır, zihnini ve bedenini güçlendirir ve bazı ruhsal hastalıklardan iyileşmesine yardım eder. Zengin ya da fakir, yaşlı ya da genç, hasta ya da sağlıklı her insan bir hobiyle uğraşabilir." +
  "<br>Hobilerin birçok türü vardır; onları şu türlere ayırabiliriz:" +
  "<br>• Sanat hobileri: tiyatro oyunculuğu, fotoğrafçılık, oyuncak yapımı vb." +
  "<br>• Ev hobileri: yemek pişirme, dikiş, nakış, bahçecilik ve hayvan besleme." +
  "<br>• Spor hobileri: hobilerin en önemlisidir, çünkü insan sağlığı için gereklidir. İki kısma ayrılır: fikrî ve bedensel. Fikrî spor satranç gibi; bedensel spor yüzme, futbol, basketbol, masa tenisi, yürüyüş, bisiklet, kayak, dağcılık, avcılık vb." +
  "<br>İslam faydalı spor etkinliklerini teşvik etmiştir; Peygamber ﷺ bunlara teşvik etmiş ve şöyle buyurmuştur: “Güçlü mümin, Allah katında zayıf müminden daha hayırlı ve daha sevimlidir; ama hepsinde hayır vardır.” (Müslim). Peygamber ﷺ döneminde bilinen sporlar: koşu, atıcılık, binicilik, yüzme, güreş, kılıç ve yürüyüş." +
  "<br>Müslümanlar her çağda faydalı etkinliklere önem verdiler. Ömer b. Hattâb’ın (r.a.) bu konudaki sözü meşhurdur: “Çocuklarınıza atıcılığı, yüzmeyi ve ata binmeyi öğretin.” Osmanlı sultanları da bazı hobilerle uğraştılar: İstanbul’un fatihi Sultan II. Mehmed eski kitap toplama ve çok okuma hobisiyle tanındı; onuncu Osmanlı sultanı Kanuni Sultan Süleyman kuyumculuk ve güzel süs eşyaları yapımıyla uğraştı; otuz dördüncü sultan II. Abdülhamid marangozluk ve ahşap maket yapımıyla uğraştı.";
var SOZLUK = [["هِوَايَةٌ ج هِوَايَاتٌ", "hobi"], ["نَشَاطٌ ج أَنْشِطَةٌ", "etkinlik, uğraş; enerji"], ["يُمَارِسُ", "yapar, uğraşır"], ["أَوْقَاتُ الفَرَاغِ", "boş vakitler"], ["المُتْعَةُ", "zevk"], ["المَلَلُ", "sıkıntı, bıkkınlık"], ["عَنَاءٌ", "yorgunluk, zahmet"], ["تُقَوِّي", "güçlendirir"], ["الأَمْرَاضُ النَّفْسِيَّةُ", "ruhsal hastalıklar"], ["فَنِّيَّةٌ", "sanatsal"], ["التَّمْثِيلُ المَسْرَحِيُّ", "tiyatro oyunculuğu"], ["التَّطْرِيزُ", "nakış"], ["البَسْتَنَةُ", "bahçecilik"], ["ضَرُورِيَّةٌ", "gerekli, zorunlu"], ["فِكْرِيَّةٌ / جِسْمِيَّةٌ", "zihinsel / bedensel"], ["التَّزَلُّجُ", "kayak, kayma"], ["تَسَلُّقُ الجِبَالِ", "dağcılık"], ["رَغَّبَ فِي", "…e özendirdi, teşvik etti"], ["شَجَّعَ عَلَى", "…e cesaretlendirdi"], ["الفُرُوسِيَّةُ", "binicilik"], ["المُصَارَعَةُ", "güreş"], ["اهْتَمَّ بِـ", "…e önem verdi"], ["السِّيَاقُ", "bağlam, konu"], ["الرِّمَايَةُ", "atıcılık"], ["اشْتُهِرَ بِـ", "…ile tanındı"], ["صِيَاغَةُ الذَّهَبِ", "kuyumculuk"], ["النِّجَارَةُ", "marangozluk"], ["المُجَسَّمَاتُ الخَشَبِيَّةُ", "ahşap maketler"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendi boş vaktini düşünmek: ne yaparsın, hangi sporu seversin, hobin var mı", "Hobileri anlatan metni durmadan okumak ve dinlemek", "Hobi, spor ve fayda kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "الهِوَايَةُ:mz / نَشَاطٌ يُحِبُّهُ الإِنْسَانُ وَيُمَارِسُهُ:- / فِي أَوْقَاتِ فَرَاغِهِ:- / لِلْمُتْعَةِ وَالرَّاحَةِ.:nasb", tr: "Hobi, insanın sevdiği ve boş vakitlerinde zevk ve dinlenme için yaptığı bir uğraştır." },
    { s: "الهِوَايَاتُ الرِّيَاضِيَّةُ:cerr / أَهَمُّ أَنْوَاعِ الهِوَايَاتِ،:- / لِأَنَّهَا ضَرُورِيَّةٌ لِصِحَّةِ الإِنْسَانِ.:nasb", tr: "Spor hobileri hobilerin en önemlisidir, çünkü sağlık için gereklidir." }
  ],
  rules: [
    { tr: "<b>Hobinin faydaları:</b> <span class=\"ar\">تُعْطِي الرَّاحَةَ</span> dinlendirir · <span class=\"ar\">تَزِيدُ النَّشَاطَ</span> enerjiyi artırır · <span class=\"ar\">تُقَوِّي الفِكْرَ وَالجِسْمَ</span> zihni ve bedeni güçlendirir · <span class=\"ar\">تُسَاعِدُ عَلَى الشِّفَاءِ</span> iyileşmeye yardım eder. Hobisi olmayan: <span class=\"ar\">يَشْعُرُ بِالمَلَلِ</span> sıkılır." },
    { tr: "<b>Hadis ve söz:</b> <span class=\"ar\">«المُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللهِ مِنَ المُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ»</span> (Müslim) · Hz. Ömer: <span class=\"ar\">«عَلِّمُوا أَوْلَادَكُمُ الرِّمَايَةَ وَالسِّبَاحَةَ وَرُكُوبَ الخَيْلِ»</span>." },
    { tr: "<b>Osmanlı sultanlarının hobileri:</b> Fatih Sultan Mehmed: <span class=\"ar\">جَمْعُ الكُتُبِ القَدِيمَةِ وَالقِرَاءَةُ</span> · Kanuni Sultan Süleyman: <span class=\"ar\">صِيَاغَةُ الذَّهَبِ</span> · II. Abdülhamid: <span class=\"ar\">النِّجَارَةُ وَصِنَاعَةُ المُجَسَّمَاتِ الخَشَبِيَّةِ</span>." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَاذَا تَفْعَلُ / تَفْعَلِينَ فِي وَقْتِ فَرَاغِكَ؟ مَا أَكْثَرُ الرِّيَاضَاتِ الَّتِي تُحِبُّهَا وَتُمَارِسُهَا؟ هَلْ تُمَارِسُ / تُمَارِسِينَ هِوَايَاتٍ فِي وَقْتِ فَرَاغِكَ؟ مَا هِيَ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "الهِوَايَاتُ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَاذَا تَفْعَلُ فِي وَقْتِ فَرَاغِكَ؟", a: "أَقْرَأُ الكُتُبَ وَأَلْعَبُ كُرَةَ القَدَمِ مَعَ أَصْدِقَائِي.", tr: "Boş vaktinde ne yaparsın? (Örnek) Kitap okur, arkadaşlarımla futbol oynarım." },
        { q: "مَا أَكْثَرُ الرِّيَاضَاتِ الَّتِي تُحِبُّهَا وَتُمَارِسُهَا؟", a: "أُحِبُّ السِّبَاحَةَ وَأُمَارِسُهَا كُلَّ أُسْبُوعٍ.", tr: "En çok hangi sporu sever ve yaparsın? Yüzmeyi; her hafta yaparım." },
        { q: "هَلْ تُمَارِسُ هِوَايَاتٍ فِي وَقْتِ فَرَاغِكَ؟ مَا هِيَ؟", a: "نَعَمْ، أُمَارِسُ هِوَايَةَ الرَّسْمِ وَالتَّصْوِيرِ.", tr: "Boş vaktinde hobilerin var mı? Evet, resim ve fotoğrafçılık." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "يُمَارِسُ الإِنْسَانُ الهِوَايَةَ فِي أَوْقَاتِ فَرَاغِهِ.", a: "d", why: "Metnin ilk cümlesi." },
        { s: "الهِوَايَاتُ تُعْطِي الإِنْسَانَ الرَّاحَةَ بَعْدَ عَنَاءِ العَمَلِ.", a: "d", why: "…بَعْدَ عَنَاءِ العَمَلِ أَوِ الدِّرَاسَةِ." },
        { s: "الهِوَايَاتُ تُضْعِفُ فِكْرَ الإِنْسَانِ.", a: "y", why: "وَتُقَوِّي فِكْرَهُ وَجِسْمَهُ." },
        { s: "الغَنِيُّ فَقَطْ يُمْكِنُهُ أَنْ يُمَارِسَ الهِوَايَاتِ.", a: "y", why: "وَكُلُّ إِنْسَانٍ، غَنِيٍّ أَوْ فَقِيرٍ…" },
        { s: "التَّصْوِيرُ مِنَ الهِوَايَاتِ الفَنِّيَّةِ.", a: "d", why: "هِوَايَاتٌ فَنِّيَّةٌ، مِثْلُ… التَّصْوِيرِ." },
        { s: "الطَّبْخُ مِنَ الهِوَايَاتِ الرِّيَاضِيَّةِ.", a: "y", why: "الطَّبْخُ هِوَايَةٌ مَنْزِلِيَّةٌ." },
        { s: "الشِّطْرَنْجُ رِيَاضَةٌ فِكْرِيَّةٌ.", a: "d", why: "فَالرِّيَاضَةُ الفِكْرِيَّةُ مِثْلُ الشِّطْرَنْجِ." },
        { s: "تَنْقَسِمُ الهِوَايَاتُ الرِّيَاضِيَّةُ إِلَى ثَلَاثَةِ أَقْسَامٍ.", a: "y", why: "إِلَى قِسْمَيْنِ: فِكْرِيَّةٍ وَجِسْمِيَّةٍ." },
        { s: "شَجَّعَ النَّبِيُّ ﷺ عَلَى الأَنْشِطَةِ الرِّيَاضِيَّةِ المُفِيدَةِ.", a: "d", why: "فَقَدْ شَجَّعَ النَّبِيُّ ﷺ عَلَيْهَا." },
        { s: "قَالَ عُمَرُ: عَلِّمُوا أَوْلَادَكُمُ الرِّمَايَةَ وَالسِّبَاحَةَ وَرُكُوبَ الخَيْلِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "اشْتُهِرَ السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ بِجَمْعِ الكُتُبِ القَدِيمَةِ.", a: "d", why: "…وَالقِرَاءَةِ الكَثِيرَةِ." },
        { s: "مَارَسَ السُّلْطَانُ عَبْدُ الحَمِيدِ الثَّانِي هِوَايَةَ صِيَاغَةِ الذَّهَبِ.", a: "y", why: "Kuyumculuk Kanuni’nin hobisi; II. Abdülhamid marangozluk yaptı." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("نَشَاطٌ يُحِبُّهُ الإِنْسَانُ وَيُمَارِسُهُ", "وَيُمَارِسُهُ"), "ve onunla uğraşır", "ve onu satar", "ve ondan kaçar", "İnsanın sevdiği ve yaptığı uğraş.", "مُمَارَسَةٌ: uygulama, yapma."],
      [HL("فِي أَوْقَاتِ فَرَاغِهِ", "فَرَاغِهِ"), "boş vakti", "işi", "uykusu", "Boş vakitlerinde.", ""],
      [HL("يَشْعُرُ بِالمَلَلِ", "بِالمَلَلِ"), "sıkıntı, bıkkınlık", "sevinç", "açlık", "Sıkılır.", "≠ مُتْعَةٌ"],
      [HL("بَعْدَ عَنَاءِ العَمَلِ", "عَنَاءِ"), "yorgunluk, zahmet", "son", "başlangıç", "İş yorgunluğundan sonra.", "= تَعَبٌ"],
      [HL("وَتُقَوِّي فِكْرَهُ وَجِسْمَهُ", "وَتُقَوِّي"), "güçlendirir", "zayıflatır", "değiştirir", "Zihnini ve bedenini güçlendirir.", "قَوِيٌّ: güçlü."],
      [HL("مِنْ بَعْضِ الأَمْرَاضِ النَّفْسِيَّةِ", "النَّفْسِيَّةِ"), "ruhsal", "bedensel", "bulaşıcı", "Bazı ruhsal hastalıklardan.", "نَفْسٌ: ruh, can."],
      [HL("لِأَنَّهَا ضَرُورِيَّةٌ لِصِحَّةِ الإِنْسَانِ", "ضَرُورِيَّةٌ"), "gerekli, zorunlu", "zararlı", "pahalı", "Sağlık için gereklidir.", ""],
      [HL("وَالتَّزَلُّجِ وَتَسَلُّقِ الجِبَالِ", "وَتَسَلُّقِ"), "tırmanma", "inme", "seyretme", "Dağa tırmanma (dağcılık).", ""],
      [HL("وَقَدْ رَغَّبَ الإِسْلَامُ فِي مُمَارَسَةِ الأَنْشِطَةِ", "رَغَّبَ"), "özendirdi, teşvik etti", "yasakladı", "unuttu", "İslam faydalı etkinlikleri teşvik etti.", "= شَوَّقَ"],
      [HL("وَالفُرُوسِيَّةُ، وَالسِّبَاحَةُ، وَالمُصَارَعَةُ", "وَالمُصَارَعَةُ"), "güreş", "koşu", "okçuluk", "Güreş.", ""],
      [HL("اشْتُهِرَ بِهِوَايَةِ جَمْعِ الكُتُبِ", "اشْتُهِرَ"), "tanındı, meşhur oldu", "yasaklandı", "unutuldu", "Kitap toplama hobisiyle tanındı.", "مَشْهُورٌ: meşhur."],
      [HL("مَارَسَ هِوَايَةَ النِّجَارَةِ", "النِّجَارَةِ"), "marangozluk", "kuyumculuk", "terzilik", "Marangozluk hobisiyle uğraştı.", "نَجَّارٌ: marangoz."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "Peygamber ﷺ dönemindeki sporları bilmek", "Osmanlı sultanlarını hobileriyle eşleştirmek"],
  examples: [
    { s: "السُّلْطَانُ سُلَيْمَانُ القَانُونِيُّ:mz / مَارَسَ هِوَايَةَ:- / صِيَاغَةِ الذَّهَبِ.:cerr", tr: "Kanuni Sultan Süleyman kuyumculuk hobisiyle uğraştı." }
  ],
  rules: [
    { tr: "<b>Peygamber ﷺ dönemindeki sporlar:</b> <span class=\"ar\">الجَرْيُ</span> koşu · <span class=\"ar\">الرَّمْيُ</span> atıcılık · <span class=\"ar\">الفُرُوسِيَّةُ</span> binicilik · <span class=\"ar\">السِّبَاحَةُ</span> yüzme · <span class=\"ar\">المُصَارَعَةُ</span> güreş · <span class=\"ar\">السَّيْفُ</span> kılıç · <span class=\"ar\">المَشْيُ</span> yürüyüş." },
    { tr: "<b>Kitaptaki 2. etkinlik, 5. madde:</b> “Fatih ahşap maket yaptı” yanlıştır; ahşap maketleri II. Abdülhamid yaptı, Fatih eski kitap toplardı ve çok okurdu." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَا الهِوَايَةُ؟ لِمَاذَا يُمَارِسُ الإِنْسَانُ الهِوَايَاتِ؟ اذْكُرْ خَمْسَ هِوَايَاتٍ قَرَأْتَهَا فِي النَّصِّ. مَا الرِّيَاضَاتُ المَشْهُورَةُ فِي عَهْدِ الرَّسُولِ ﷺ؟ كَيْفَ كَانَ اهْتِمَامُ المُسْلِمِينَ بِمُمَارَسَةِ الأَنْشِطَةِ وَالهِوَايَاتِ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مَا الهِوَايَةُ؟", "نَشَاطٌ يُحِبُّهُ الإِنْسَانُ وَيُمَارِسُهُ فِي أَوْقَاتِ فَرَاغِهِ لِلْمُتْعَةِ وَالرَّاحَةِ.", "عَمَلٌ يَعْمَلُهُ الإِنْسَانُ لِيَأْخُذَ المَالَ.", "دَرْسٌ يَدْرُسُهُ الطَّالِبُ فِي الجَامِعَةِ.", "Hobi nedir? İnsanın sevdiği, boş vaktinde zevk ve dinlenme için yaptığı uğraş.", ""],
      ["لِمَاذَا يُمَارِسُ الإِنْسَانُ الهِوَايَاتِ؟", "لِأَنَّهَا تُعْطِيهِ الرَّاحَةَ، وَتَزِيدُ نَشَاطَهُ، وَتُقَوِّي فِكْرَهُ وَجِسْمَهُ.", "لِأَنَّهَا تُعْطِيهِ المَالَ الكَثِيرَ.", "لِأَنَّهُ يَشْعُرُ بِالمَلَلِ مِنْهَا.", "Neden? Dinlendirir, enerji verir, zihni ve bedeni güçlendirir.", ""],
      ["اذْكُرْ خَمْسَ هِوَايَاتٍ قَرَأْتَهَا فِي النَّصِّ.", "التَّصْوِيرُ، وَالطَّبْخُ، وَالخِيَاطَةُ، وَالشِّطْرَنْجُ، وَالسِّبَاحَةُ.", "التِّجَارَةُ، وَالطِّبُّ، وَالهَنْدَسَةُ، وَالتَّعْلِيمُ، وَالمُحَامَاةُ.", "النَّوْمُ، وَالأَكْلُ، وَالشُّرْبُ، وَالمَرَضُ، وَالبُكَاءُ.", "Metindeki beş hobi.", "İkinci seçenek meslekler."],
      ["مَا الرِّيَاضَاتُ المَشْهُورَةُ فِي عَهْدِ الرَّسُولِ ﷺ؟", "الجَرْيُ، وَالرَّمْيُ، وَالفُرُوسِيَّةُ، وَالسِّبَاحَةُ، وَالمُصَارَعَةُ، وَالسَّيْفُ، وَالمَشْيُ.", "كُرَةُ القَدَمِ، وَكُرَةُ السَّلَّةِ، وَالتَّزَلُّجُ.", "الشِّطْرَنْجُ وَالتَّصْوِيرُ وَصِنَاعَةُ الأَلْعَابِ.", "Peygamber ﷺ dönemindeki sporlar.", ""],
      ["كَيْفَ كَانَ اهْتِمَامُ المُسْلِمِينَ بِمُمَارَسَةِ الأَنْشِطَةِ وَالهِوَايَاتِ؟", "اهْتَمُّوا بِهَا فِي كُلِّ العُصُورِ؛ وَمَارَسَ السَّلَاطِينُ العُثْمَانِيُّونَ بَعْضَ الهِوَايَاتِ.", "لَمْ يَهْتَمُّوا بِهَا أَبَدًا.", "اهْتَمُّوا بِهَا فِي عَهْدِ النَّبِيِّ ﷺ فَقَطْ.", "Müslümanlar her çağda önem verdi; Osmanlı sultanları da hobilerle uğraştı.", ""]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["الإِنْسَانُ الَّذِي لَا يُمَارِسُ هِوَايَةً يَشْعُرُ بِالمُتْعَةِ.", "y", "يَشْعُرُ بِالمَلَلِ."],
      ["الإِنْسَانُ الصَّحِيحُ فَقَطْ يَسْتَطِيعُ مُمَارَسَةَ الهِوَايَاتِ.", "y", "مَرِيضٍ أَوْ صَحِيحٍ: herkes yapabilir."],
      ["الرِّيَاضَةُ هِيَ أَهَمُّ أَنْوَاعِ الهِوَايَاتِ.", "d", "وَهِيَ أَهَمُّ أَنْوَاعِ الهِوَايَاتِ."],
      ["السَّلَاطِينُ العُثْمَانِيُّونَ مَارَسُوا هِوَايَاتِ الصَّيْدِ وَالقِرَاءَةِ فَقَطْ.", "y", "Kitap toplama, okuma, kuyumculuk, marangozluk, maket…"],
      ["السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ مَارَسَ صِنَاعَةَ المُجَسَّمَاتِ الخَشَبِيَّةِ.", "y", "Maketleri II. Abdülhamid yaptı; Fatih kitap toplardı."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["الإِنْسَانُ الَّذِي لَا يُمَارِسُ هِوَايَةً يَشْعُرُ بِالمُتْعَةِ. ✗", "الإِنْسَانُ الَّذِي لَا يُمَارِسُ هِوَايَةً يَشْعُرُ بِالمَلَلِ.", "الإِنْسَانُ الَّذِي يُمَارِسُ هِوَايَةً يَشْعُرُ بِالمَلَلِ.", "الإِنْسَانُ الَّذِي لَا يُمَارِسُ هِوَايَةً يَشْعُرُ بِالقُوَّةِ.", "Hobisi olmayan insan sıkılır.", ""],
      ["الإِنْسَانُ الصَّحِيحُ فَقَطْ يَسْتَطِيعُ مُمَارَسَةَ الهِوَايَاتِ. ✗", "كُلُّ إِنْسَانٍ، مَرِيضٍ أَوْ صَحِيحٍ، يُمْكِنُهُ أَنْ يُمَارِسَ هِوَايَةً.", "الإِنْسَانُ المَرِيضُ فَقَطْ يَسْتَطِيعُ مُمَارَسَةَ الهِوَايَاتِ.", "لَا أَحَدَ يَسْتَطِيعُ مُمَارَسَةَ الهِوَايَاتِ.", "Hasta ya da sağlıklı herkes bir hobiyle uğraşabilir.", ""],
      ["السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ مَارَسَ صِنَاعَةَ المُجَسَّمَاتِ الخَشَبِيَّةِ. ✗", "السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ اشْتُهِرَ بِجَمْعِ الكُتُبِ القَدِيمَةِ وَالقِرَاءَةِ.", "السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ مَارَسَ صِيَاغَةَ الذَّهَبِ.", "السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ مَارَسَ النِّجَارَةَ.", "Fatih eski kitap toplama ve çok okumayla tanındı.", ""]
    ])},
    { type: "pick", extra: true, ar: "مَنْ مَارَسَ هَذِهِ الهِوَايَةَ؟", tr: "Hobiyi metne göre sultanla eşleştir.", items: PL([
      ["جَمْعُ الكُتُبِ القَدِيمَةِ وَالقِرَاءَةُ الكَثِيرَةُ", "السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ", "السُّلْطَانُ سُلَيْمَانُ القَانُونِيُّ", "السُّلْطَانُ عَبْدُ الحَمِيدِ الثَّانِي", "Eski kitap toplama ve çok okuma: Fatih.", ""],
      ["صِيَاغَةُ الذَّهَبِ وَصِنَاعَةُ الأَشْكَالِ الجَمِيلَةِ", "السُّلْطَانُ سُلَيْمَانُ القَانُونِيُّ", "السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ", "السُّلْطَانُ عَبْدُ الحَمِيدِ الثَّانِي", "Kuyumculuk: Kanuni (onuncu sultan).", ""],
      ["النِّجَارَةُ وَصِنَاعَةُ المُجَسَّمَاتِ الخَشَبِيَّةِ", "السُّلْطَانُ عَبْدُ الحَمِيدِ الثَّانِي", "السُّلْطَانُ سُلَيْمَانُ القَانُونِيُّ", "السُّلْطَانُ مُحَمَّدٌ الفَاتِحُ", "Marangozluk ve ahşap maket: II. Abdülhamid (otuz dördüncü sultan).", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Eş, Zıt, Çoğul", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek", "Kelimelerin çoğulunu bulmak", "Hobi kelimelerini cümlede tanımak"],
  examples: [
    { s: "عَنَاءٌ:mz.Kelime / = تَعَبٌ:nasb.Eş", tr: "zahmet = yorgunluk", pair: "مُتْعَةٌ:mz.Kelime / ≠ مَلَلٌ:cerr.Zıt", pairTr: "zevk ≠ sıkıntı" }
  ],
  rules: [
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">عَنَاءٌ = تَعَبٌ · رَغَّبَ = شَوَّقَ · جِسْمِيَّةٌ = بَدَنِيَّةٌ · طَاوِلَةٌ = مِنْضَدَةٌ · اهْتَمَّ = اعْتَنَى · مَعْرُوفٌ = مَعْلُومٌ</span>" },
    { tr: "<b>Zıt anlam:</b> <span class=\"ar\">مُتْعَةٌ ≠ مَلَلٌ · رَاحَةٌ ≠ تَعَبٌ · يُحِبُّ ≠ يَكْرَهُ · زِيَادَةٌ ≠ نَقْصٌ · اسْتِرَاحَةٌ ≠ عَمَلٌ · مَرِيضٌ ≠ صَحِيحٌ</span>" },
    { tr: "<b>Çoğullar:</b> <span class=\"ar\">هِوَايَةٌ ← هِوَايَاتٌ · وَقْتٌ ← أَوْقَاتٌ · عَمَلٌ ← أَعْمَالٌ · نَوْعٌ ← أَنْوَاعٌ · مُمَارَسَةٌ ← مُمَارَسَاتٌ</span>. <span class=\"ar\">أَفْعَالٌ</span> kalıbı üç harfli isimlerde çok yaygındır. Dikkat: <span class=\"ar\">عُمَّالٌ</span> “işçiler” (<span class=\"ar\">عَامِلٌ</span>’in çoğulu), <span class=\"ar\">أَعْمَالٌ</span> “işler”." }
  ],
  kaide: ["٤ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي. ٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا فِيمَا يَأْتِي.", "٦ ـ هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ: هِوَايَةٌ، وَقْتٌ، عَمَلٌ، نَوْعٌ، مُمَارَسَةٌ."],
  ex: [
    { type: "bank", num: "٤", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["مَعْلُومٌ", "بَدَنِيَّةٌ", "تَعَبٌ", "اعْتَنَى", "مِنْضَدَةٌ", "شَوَّقَ"], items: [
      { pre: "عَنَاءٌ =", a: [2], tr: "zahmet = yorgunluk" }, { pre: "رَغَّبَ =", a: [5], tr: "özendirdi = heveslendirdi" }, { pre: "جِسْمِيَّةٌ =", a: [1], tr: "bedensel" }, { pre: "طَاوِلَةٌ =", a: [4], tr: "masa" }, { pre: "اهْتَمَّ =", a: [3], tr: "önem verdi = ilgilendi" }, { pre: "مَعْرُوفٌ =", a: [0], tr: "bilinen" }
    ]},
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["صَحِيحٌ", "تَعَبٌ", "مَلَلٌ", "عَمَلٌ", "نَقْصٌ", "يَكْرَهُ"], items: [
      { pre: "مُتْعَةٌ ≠", a: [2], tr: "zevk ≠ sıkıntı" }, { pre: "رَاحَةٌ ≠", a: [1], tr: "dinlenme ≠ yorgunluk" }, { pre: "يُحِبُّ ≠", a: [5], tr: "sever ≠ sevmez" }, { pre: "زِيَادَةٌ ≠", a: [4], tr: "artış ≠ eksilme" }, { pre: "اسْتِرَاحَةٌ ≠", a: [3], tr: "mola ≠ iş" }, { pre: "مَرِيضٌ ≠", a: [0], tr: "hasta ≠ sağlıklı" }
    ]},
    { type: "pick", fill: true, num: "٦", ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Kelimenin doğru çoğulunu seç.", items: PL([
      ["هِوَايَةٌ ← ___", "هِوَايَاتٌ", "هِوَايُونَ", "هَوَائِبُ", "hobi → hobiler", "Cem-i müennes sâlim: ـَاتٌ"],
      ["وَقْتٌ ← ___", "أَوْقَاتٌ", "وُقُوتَاءُ", "وَقَائِتُ", "vakit → vakitler", "أَفْعَالٌ kalıbı."],
      ["عَمَلٌ ← ___", "أَعْمَالٌ", "عُمَّالٌ", "عَمَلَاتٌ", "iş → işler", "عُمَّالٌ: işçiler (عَامِلٌ’in çoğulu); عَمَلَاتٌ: para birimleri (عُمْلَةٌ)."],
      ["نَوْعٌ ← ___", "أَنْوَاعٌ", "نُوَّاعٌ", "نَوَائِعُ", "tür → türler", "أَفْعَالٌ kalıbı."],
      ["مُمَارَسَةٌ ← ___", "مُمَارَسَاتٌ", "مُمَارِسُونَ", "مَمَارِسُ", "uygulama → uygulamalar", "مُمَارِسُونَ: uygulayıcılar (kişiler)."],
      ["نَشَاطٌ ← ___", "أَنْشِطَةٌ", "نُشُوطٌ", "نَشَائِطُ", "etkinlik → etkinlikler", "Ek madde: أَفْعِلَةٌ kalıbı."],
      ["سُلْطَانٌ ← ___", "سَلَاطِينُ", "سُلْطَانَاتٌ", "أَسْلِطَةٌ", "sultan → sultanlar", "Ek madde: فَعَالِيلُ kalıbı."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE
{
  id: "u4", no: 4, ar: "الجُمْلَةُ", tr: "Cümle Tamamlama, Cümle Kurma, Kelime Kullanma", short: "Cümle", col: "ref", legend: ["mz", "nasb"],
  goals: ["Cümleyi uygun tamamlayıcısıyla eşleştirmek", "Karışık kelimelerden anlamlı cümle kurmak", "Yeni kelimeleri doğru cümlede kullanmak", "Kendi cümlelerini kurmak"],
  examples: [
    { s: "تُشَجِّعُ الأُمُّ:mz / ابْنَهَا عَلَى مُمَارَسَةِ هِوَايَاتٍ مُفِيدَةٍ.:nasb", tr: "Anne oğlunu faydalı hobilerle uğraşmaya teşvik eder." },
    { s: "رِيَاضَةُ المَشْيِ:mz / تُخَفِّفُ القَلَقَ.:nasb", tr: "Yürüyüş sporu kaygıyı azaltır." }
  ],
  rules: [
    { tr: "<b>Cümle sırası:</b> isim cümlesinde mübtedâ + haber: <span class=\"ar\">الهِوَايَاتُ الرِّيَاضِيَّةُ ضَرُورِيَّةٌ</span>; sıfat isimden sonra gelir ve ona uyar (<span class=\"ar\">أَنْوَاعٌ كَثِيرَةٌ · الكُتُبِ القَدِيمَةِ</span>)." },
    { tr: "<b>هُنَاكَ</b> “vardır”: <span class=\"ar\">هُنَاكَ أَنْوَاعٌ كَثِيرَةٌ لِلْهِوَايَاتِ</span>. Ardından gelen isim merfûdur." },
    { tr: "<b>8. etkinlik:</b> kitap kelimeleri kendi cümlende kullanmanı istiyor. Burada kelimeyi doğru cümleye yerleştir; sonra defterine her kelimeyle bir cümle yaz." }
  ],
  kaide: ["٣ ـ صِلْ بَيْنَ الجُمْلَةِ وَالتَّتِمَّةِ المُنَاسِبَةِ لَهَا فِيمَا يَأْتِي. ٧ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً.", "٨ ـ اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ: رَغِبَ فِي، اهْتَمَّ بِـ، يُمَارِسُ، وَقْتُ الفَرَاغِ، شَجَّعَ عَلَى، عَنَاءٌ، تُسَاعِدُ عَلَى."],
  ex: [
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ الجُمْلَةِ وَالتَّتِمَّةِ المُنَاسِبَةِ لَهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan tamamlayıcıyı seç, sonra cümlenin kutusuna dokun.", bank: ["تُخَفِّفُ القَلَقَ.", "قَبْلَ الامْتِحَانِ.", "ابْنَهَا عَلَى مُمَارَسَةِ هِوَايَاتٍ مُفِيدَةٍ.", "مِنْ خِلَالِ مُمَارَسَةِ بَعْضِ الأَنْشِطَةِ.", "التَّزَلُّجُ، وَالسِّبَاحَةُ، وَرُكُوبُ الدَّرَّاجَةِ."], items: [
      { pre: "١ ـ مِنَ الهِوَايَاتِ الرِّيَاضِيَّةِ", a: [4], tr: "Spor hobilerinden: kayak, yüzme ve bisiklet." },
      { pre: "٢ ـ يَجِبُ أَنْ نَسْتَرِيحَ", a: [3], tr: "Bazı etkinlikler yaparak dinlenmeliyiz." },
      { pre: "٣ ـ أَشْعُرُ بِالقَلَقِ دَائِمًا", a: [1], tr: "Sınavdan önce hep kaygı duyarım." },
      { pre: "٤ ـ تُشَجِّعُ الأُمُّ", a: [2], tr: "Anne oğlunu faydalı hobilere teşvik eder." },
      { pre: "٥ ـ رِيَاضَةُ المَشْيِ", a: [0], tr: "Yürüyüş kaygıyı azaltır." }
    ]},
    { type: "bank", num: "٧", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["نَشَاطٌ", "يُمَارِسُهُ", "الإِنْسَانُ", "خِلَالَ", "أَوْقَاتِ", "فَرَاغِهِ", "أَنْوَاعٌ", "كَثِيرَةٌ", "لِلْهِوَايَاتِ", "الرِّيَاضِيَّةُ", "ضَرُورِيَّةٌ", "لِصِحَّةِ", "الإِنْسَانِ", "صَدِيقِي", "جَمْعُ", "الكُتُبِ", "القَدِيمَةِ"],
      tr2: "1) Hobi, insanın boş vakitlerinde yaptığı bir uğraştır. 2) Hobilerin birçok türü vardır. 3) Spor hobileri insan sağlığı için gereklidir. 4) Arkadaşımın hobisi eski kitap toplamaktır.",
      parts: ["١ ـ الهِوَايَةُ", { a: [0] }, { a: [1] }, { a: [2] }, { a: [3] }, { a: [4] }, { a: [5] }, ".<br>٢ ـ هُنَاكَ", { a: [6] }, { a: [7] }, { a: [8] }, ".<br>٣ ـ الهِوَايَاتُ", { a: [9] }, { a: [10] }, { a: [11] }, { a: [12] }, ".<br>٤ ـ هِوَايَةُ", { a: [13] }, { a: [14] }, { a: [15] }, { a: [16] }, "."] },
    { type: "pick", fill: true, num: "٨", ar: "اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ", tr: "Boşluğa uyan kelimeyi seç; sonra defterine bu kelimelerle kendi cümlelerini yaz.", items: PL([
      ["رَغِبَ أَخِي ___ تَعَلُّمِ السِّبَاحَةِ.", "فِي", "عَلَى", "مِنْ", "Kardeşim yüzme öğrenmeyi istedi.", "رَغِبَ فِي: istedi (رَغِبَ عَنْ: yüz çevirdi)."],
      ["اهْتَمَّ السُّلْطَانُ ___ الكُتُبِ القَدِيمَةِ.", "بِجَمْعِ", "فِي جَمْعِ", "عَلَى جَمْعِ", "Sultan eski kitap toplamaya önem verdi.", "اهْتَمَّ بِـ"],
      ["أُمَارِسُ ___ كُلَّ صَبَاحٍ.", "الرِّيَاضَةَ", "الفَرَاغَ", "العَنَاءَ", "Her sabah spor yaparım.", "يُمَارِسُ"],
      ["أَقْرَأُ الكُتُبَ فِي ___ .", "وَقْتِ الفَرَاغِ", "وَقْتِ العَنَاءِ", "وَقْتِ المَرَضِ", "Boş vaktimde kitap okurum.", "وَقْتُ الفَرَاغِ"],
      ["شَجَّعَنِي أَبِي ___ مُمَارَسَةِ الرِّيَاضَةِ.", "عَلَى", "فِي", "عَنْ", "Babam beni spor yapmaya teşvik etti.", "شَجَّعَ عَلَى"],
      ["تُعْطِي الهِوَايَاتُ الرَّاحَةَ بَعْدَ ___ العَمَلِ.", "عَنَاءِ", "رَاحَةِ", "مُتْعَةِ", "Hobiler iş yorgunluğundan sonra dinlendirir.", "عَنَاءٌ = تَعَبٌ"],
      ["الرِّيَاضَةُ تُسَاعِدُ ___ الشِّفَاءِ مِنْ بَعْضِ الأَمْرَاضِ.", "عَلَى", "فِي", "مِنْ", "Spor bazı hastalıklardan iyileşmeye yardım eder.", "تُسَاعِدُ عَلَى"]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · HOBİLER VE KALIPLAR
{
  id: "u5", no: 5, ar: "الهِوَايَاتُ وَالأَفْعَالُ مَعَ حُرُوفِ الجَرِّ", tr: "Hobi Adları, Türleri ve Harf-i Cerli Fiiller", short: "Hobiler", col: "muz", legend: ["ref", "mi"],
  goals: ["Resimdeki hobinin adını söylemek (9. etkinlik)", "Hobileri metindeki türlerine ayırmak: sanat, ev, fikrî spor, bedensel spor", "Fiili doğru harf-i cerle kullanmak: رَغِبَ فِي، اهْتَمَّ بِـ، شَجَّعَ عَلَى", "يُمْكِنُ أَنْ / يُمْكِنُهُ أَنْ kalıbını kullanmak"],
  examples: [
    { s: "اهْتَمَّ:ref / بِـ:mi / مُمَارَسَةِ الأَنْشِطَةِ.:-", tr: "Etkinliklere önem verdi.", pair: "شَجَّعَ:ref / عَلَى:mi / الرِّيَاضَةِ.:-", pairTr: "Spora teşvik etti." },
    { s: "يُمْكِنُهُ:ref.Mümkündür / أَنْ يُمَارِسَ:mi.Mansûb / هِوَايَةً.:-", tr: "Bir hobiyle uğraşabilir." }
  ],
  rules: [
    { tr: "<b>Harf-i cerle gelen fiiller:</b> <span class=\"ar\">رَغِبَ فِي</span> istedi · <span class=\"ar\">رَغَّبَ فِي</span> özendirdi · <span class=\"ar\">اهْتَمَّ بِـ</span> önem verdi · <span class=\"ar\">اشْتُهِرَ بِـ</span> …ile tanındı · <span class=\"ar\">شَعَرَ بِـ</span> hissetti · <span class=\"ar\">شَجَّعَ عَلَى</span> teşvik etti · <span class=\"ar\">سَاعَدَ عَلَى</span> yardım etti · <span class=\"ar\">انْقَسَمَ إِلَى</span> ayrıldı. Harften sonraki isim mecrûrdur." },
    { tr: "<b>يُمْكِنُ أَنْ + muzâri mansûb</b> “…ebilir”: <span class=\"ar\">يُمْكِنُ أَنْ نَقْسِمَهَا</span> onları ayırabiliriz · zamirle <span class=\"ar\">يُمْكِنُهُ أَنْ يُمَارِسَ</span> o uğraşabilir · <span class=\"ar\">يُمْكِنُنِي أَنْ أَسْبَحَ</span> yüzebilirim." },
    { tr: "<b>Hobi türleri (metne göre):</b> sanat <span class=\"ar\">فَنِّيَّةٌ</span>: tiyatro, fotoğraf, oyuncak yapımı · ev <span class=\"ar\">مَنْزِلِيَّةٌ</span>: yemek, dikiş, nakış, bahçecilik, hayvan besleme · fikrî spor <span class=\"ar\">فِكْرِيَّةٌ</span>: satranç · bedensel spor <span class=\"ar\">جِسْمِيَّةٌ</span>: yüzme, futbol, basketbol, masa tenisi, yürüyüş, bisiklet, kayak, dağcılık, avcılık. Resim yapmayı metin saymıyor; burada sanat hobisi kabul edildi." }
  ],
  kaide: ["٩ ـ اكْتُبِ الكَلِمَةَ المُنَاسِبَةَ لِكُلِّ هِوَايَةٍ تَحْتَ كُلِّ صُورَةٍ مِنَ الصُّوَرِ الآتِيَةِ.", "هِوَايَاتٌ فَنِّيَّةٌ · هِوَايَاتٌ مَنْزِلِيَّةٌ · هِوَايَاتٌ رِيَاضِيَّةٌ: فِكْرِيَّةٌ وَجِسْمِيَّةٌ."],
  ex: [
    { type: "pick", num: "٩", ar: "اكْتُبِ الكَلِمَةَ المُنَاسِبَةَ لِكُلِّ هِوَايَةٍ تَحْتَ كُلِّ صُورَةٍ", tr: "Kitaptaki resmin anlatımına bak ve hobinin adını seç.", items: PL([
      ["♟️ Satranç tahtası ve taşlar", "الشِّطْرَنْجُ", "التَّصْوِيرُ", "الخِيَاطَةُ", "Satranç.", "رِيَاضَةٌ فِكْرِيَّةٌ"],
      ["🚴 Çayırda bisiklet süren gençler", "رُكُوبُ الدَّرَّاجَةِ", "تَسَلُّقُ الجِبَالِ", "المَشْيُ", "Bisiklet sürme.", ""],
      ["🚲🌸 Bisiklet biçiminde çiçekli süs eşyası", "صِنَاعَةُ الأَشْكَالِ الجَمِيلَةِ", "رُكُوبُ الدَّرَّاجَةِ", "الطَّبْخُ", "Süs eşyası yapımı.", "Resim bir el işini gösteriyor; bisiklete binmeyi değil."],
      ["🌿 Duvardaki sarmaşıkla ilgilenen adam", "البَسْتَنَةُ", "التَّطْرِيزُ", "الصَّيْدُ", "Bahçecilik.", ""],
      ["🏂 Karlı yamaçta kayan kayakçılar", "التَّزَلُّجُ", "السِّبَاحَةُ", "الجَرْيُ", "Kayak.", ""],
      ["🧵 Renkli çiçek desenli nakışlı yaka", "التَّطْرِيزُ", "الرَّسْمُ", "النِّجَارَةُ", "Nakış.", ""],
      ["🏇 Çölde at süren adam", "رُكُوبُ الخَيْلِ", "رُكُوبُ الدَّرَّاجَةِ", "المُصَارَعَةُ", "Binicilik (الفُرُوسِيَّةُ).", ""],
      ["📷 Fotoğraf makinesiyle çekim yapan adam", "التَّصْوِيرُ", "الرَّسْمُ", "القِرَاءَةُ", "Fotoğrafçılık.", "هِوَايَةٌ فَنِّيَّةٌ"],
      ["🎨 Boya kalemleriyle resim yapan çocuk", "الرَّسْمُ", "الخِيَاطَةُ", "الطَّبْخُ", "Resim.", ""],
      ["🧗 Kayalıkta tırmanan dağcılar", "تَسَلُّقُ الجِبَالِ", "التَّزَلُّجُ", "المَشْيُ", "Dağcılık.", ""],
      ["🎸 Gitar çalan el", "العَزْفُ عَلَى الغِيتَارِ", "التَّمْثِيلُ", "الرَّسْمُ", "Gitar çalma (müzik).", ""],
      ["📖 Kitap okuyan çocuk", "القِرَاءَةُ", "الكِتَابَةُ", "التَّصْوِيرُ", "Okuma.", ""],
      ["🕋 Ahşap Kâbe maketi", "صِنَاعَةُ المُجَسَّمَاتِ", "صِيَاغَةُ الذَّهَبِ", "البَسْتَنَةُ", "Maket yapımı.", "II. Abdülhamid’in hobisi."],
      ["⛷️ Karda kayak yapan çocuk", "التَّزَلُّجُ", "تَسَلُّقُ الجِبَالِ", "السِّبَاحَةُ", "Kayak.", ""],
      ["💍 Altın işleyen eller", "صِيَاغَةُ الذَّهَبِ", "النِّجَارَةُ", "الطَّبْخُ", "Kuyumculuk.", "Kanuni’nin hobisi."],
      ["🏊 Havuzda yarışan yüzücüler", "السِّبَاحَةُ", "التَّزَلُّجُ", "الصَّيْدُ", "Yüzme.", ""]
    ])},
    { type: "classify", extra: true, opts: TURLER, ar: "صَنِّفِ الهِوَايَاتِ حَسَبَ النَّصِّ", tr: "Hobi metne göre hangi türde?", items: CL([
      ["التَّمْثِيلُ المَسْرَحِيُّ 🎭", "fn", "هِوَايَاتٌ فَنِّيَّةٌ"], ["التَّصْوِيرُ 📷", "fn", "هِوَايَاتٌ فَنِّيَّةٌ"], ["صِنَاعَةُ الأَلْعَابِ 🧸", "fn", "هِوَايَاتٌ فَنِّيَّةٌ"],
      ["الطَّبْخُ 🍳", "mn", "هِوَايَاتٌ مَنْزِلِيَّةٌ"], ["الخِيَاطَةُ 🧵", "mn", "هِوَايَاتٌ مَنْزِلِيَّةٌ"], ["التَّطْرِيزُ 🪡", "mn", "هِوَايَاتٌ مَنْزِلِيَّةٌ"], ["البَسْتَنَةُ 🌱", "mn", "هِوَايَاتٌ مَنْزِلِيَّةٌ"], ["تَرْبِيَةُ الحَيَوَانَاتِ 🐈", "mn", "هِوَايَاتٌ مَنْزِلِيَّةٌ"],
      ["الشِّطْرَنْجُ ♟️", "fk", "رِيَاضَةٌ فِكْرِيَّةٌ"],
      ["السِّبَاحَةُ 🏊", "cs", "رِيَاضَةٌ جِسْمِيَّةٌ"], ["كُرَةُ القَدَمِ ⚽", "cs", "رِيَاضَةٌ جِسْمِيَّةٌ"], ["كُرَةُ السَّلَّةِ 🏀", "cs", "رِيَاضَةٌ جِسْمِيَّةٌ"], ["كُرَةُ الطَّاوِلَةِ 🏓", "cs", "رِيَاضَةٌ جِسْمِيَّةٌ"], ["التَّزَلُّجُ ⛷️", "cs", "رِيَاضَةٌ جِسْمِيَّةٌ"], ["تَسَلُّقُ الجِبَالِ 🧗", "cs", "رِيَاضَةٌ جِسْمِيَّةٌ"], ["الصَّيْدُ 🎣", "cs", "رِيَاضَةٌ جِسْمِيَّةٌ"]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "اخْتَرْ حَرْفَ الجَرِّ المُنَاسِبَ", tr: "Fiile uyan harf-i ceri seç.", items: PL([
      ["اشْتُهِرَ السُّلْطَانُ ___ جَمْعِ الكُتُبِ.", "بِـ", "فِي", "عَلَى", "Sultan kitap toplamayla tanındı.", "اشْتُهِرَ بِـ"],
      ["رَغَّبَ الإِسْلَامُ ___ مُمَارَسَةِ الرِّيَاضَةِ.", "فِي", "عَنْ", "إِلَى", "İslam spor yapmayı teşvik etti.", "رَغَّبَ فِي"],
      ["تَنْقَسِمُ الرِّيَاضَةُ ___ قِسْمَيْنِ.", "إِلَى", "عَلَى", "فِي", "Spor iki kısma ayrılır.", "انْقَسَمَ إِلَى"],
      ["الإِنْسَانُ الَّذِي لَا يُمَارِسُ الهِوَايَاتِ يَشْعُرُ ___ المَلَلِ.", "بِـ", "عَلَى", "مِنْ", "Hobisi olmayan sıkılır.", "شَعَرَ بِـ"],
      ["___ أَنْ يُمَارِسَ كُلُّ إِنْسَانٍ هِوَايَةً.", "يُمْكِنُ", "يَجِبُ عَلَى", "لَا", "Her insan bir hobiyle uğraşabilir.", "يُمْكِنُ أَنْ + mansûb"],
      ["يُمْكِنُنِي أَنْ ___ فِي البَحْرِ.", "أَسْبَحَ", "أَسْبَحُ", "سِبَاحَةٌ", "Denizde yüzebilirim.", "أَنْ’den sonra mansûb."]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["الهِوَايَةُ {نَشَاطٌ} يُحِبُّهُ الإِنْسَانُ.", ["نَشَاطٌ", "مَرَضٌ", "عَنَاءٌ"], "metin", "Hobi insanın sevdiği bir uğraştır.", "u1"],
  ["يُمَارِسُهُ فِي أَوْقَاتِ {فَرَاغِهِ}.", ["فَرَاغِهِ", "عَمَلِهِ", "نَوْمِهِ"], "metin", "Boş vakitlerinde yapar.", "u1"],
  ["الإِنْسَانُ الَّذِي لَا يُمَارِسُ الهِوَايَاتِ يَشْعُرُ بِ{المَلَلِ}.", ["المَلَلِ", "المُتْعَةِ", "الرَّاحَةِ"], "metin", "Hobisi olmayan sıkılır.", "u1"],
  ["تُعْطِي الإِنْسَانَ الرَّاحَةَ بَعْدَ {عَنَاءِ} العَمَلِ.", ["عَنَاءِ", "مُتْعَةِ", "رَاحَةِ"], "metin", "İş yorgunluğundan sonra dinlendirir.", "u1"],
  ["وَتُقَوِّي {فِكْرَهُ} وَجِسْمَهُ.", ["فِكْرَهُ", "مَلَلَهُ", "مَرَضَهُ"], "metin", "Zihnini ve bedenini güçlendirir.", "u1"],
  ["الهِوَايَاتُ الرِّيَاضِيَّةُ {ضَرُورِيَّةٌ} لِصِحَّةِ الإِنْسَانِ.", ["ضَرُورِيَّةٌ", "ضَارَّةٌ", "قَدِيمَةٌ"], "metin", "Spor hobileri sağlık için gereklidir.", "u1"],
  ["فَالرِّيَاضَةُ الفِكْرِيَّةُ مِثْلُ {الشِّطْرَنْجِ}.", ["الشِّطْرَنْجِ", "السِّبَاحَةِ", "الطَّبْخِ"], "metin", "Fikrî spor satranç gibidir.", "u1"],
  ["المُؤْمِنُ {القَوِيُّ} خَيْرٌ وَأَحَبُّ إِلَى اللهِ.", ["القَوِيُّ", "الغَنِيُّ", "الكَبِيرُ"], "hadis", "Güçlü mümin daha hayırlıdır.", "u1"],
  ["عَلِّمُوا أَوْلَادَكُمُ الرِّمَايَةَ وَ{السِّبَاحَةَ} وَرُكُوبَ الخَيْلِ.", ["السِّبَاحَةَ", "التِّجَارَةَ", "الطَّبْخَ"], "söz", "Çocuklarınıza yüzmeyi öğretin.", "u2"],
  ["اشْتُهِرَ الفَاتِحُ بِجَمْعِ {الكُتُبِ} القَدِيمَةِ.", ["الكُتُبِ", "الذَّهَبِ", "الأَلْعَابِ"], "sultanlar", "Fatih eski kitap toplamayla tanındı.", "u2"],
  ["مَارَسَ سُلَيْمَانُ القَانُونِيُّ هِوَايَةَ صِيَاغَةِ {الذَّهَبِ}.", ["الذَّهَبِ", "الخَشَبِ", "الكُتُبِ"], "sultanlar", "Kanuni kuyumculuk yaptı.", "u2"],
  ["مَارَسَ عَبْدُ الحَمِيدِ الثَّانِي هِوَايَةَ {النِّجَارَةِ}.", ["النِّجَارَةِ", "الصِّيَاغَةِ", "القِرَاءَةِ"], "sultanlar", "II. Abdülhamid marangozluk yaptı.", "u2"],
  ["عَنَاءٌ = {تَعَبٌ}.", ["تَعَبٌ", "مَلَلٌ", "نَقْصٌ"], "eş anlam", "Zahmet = yorgunluk.", "u3"],
  ["طَاوِلَةٌ = {مِنْضَدَةٌ}.", ["مِنْضَدَةٌ", "مِقْعَدٌ", "مِرْآةٌ"], "eş anlam", "Masa = masa.", "u3"],
  ["مُتْعَةٌ ≠ {مَلَلٌ}.", ["مَلَلٌ", "رَاحَةٌ", "زِيَادَةٌ"], "zıt", "Zevk ≠ sıkıntı.", "u3"],
  ["زِيَادَةٌ ≠ {نَقْصٌ}.", ["نَقْصٌ", "كَثْرَةٌ", "عَمَلٌ"], "zıt", "Artış ≠ eksilme.", "u3"],
  ["نَوْعٌ ← {أَنْوَاعٌ}.", ["أَنْوَاعٌ", "نُوَّاعٌ", "نَوَائِعُ"], "çoğul", "Tür → türler.", "u3"],
  ["تُشَجِّعُ الأُمُّ ابْنَهَا {عَلَى} مُمَارَسَةِ هِوَايَاتٍ مُفِيدَةٍ.", ["عَلَى", "فِي", "مِنْ"], "cümle", "Anne oğlunu teşvik eder.", "u4"],
  ["رِيَاضَةُ المَشْيِ تُخَفِّفُ {القَلَقَ}.", ["القَلَقَ", "النَّشَاطَ", "الصِّحَّةَ"], "cümle", "Yürüyüş kaygıyı azaltır.", "u4"],
  ["هُنَاكَ أَنْوَاعٌ {كَثِيرَةٌ} لِلْهِوَايَاتِ.", ["كَثِيرَةٌ", "كَثِيرًا", "كَثِيرٍ"], "cümle", "Hobilerin birçok türü vardır.", "u4"],
  ["اهْتَمَّ المُسْلِمُونَ {بِمُمَارَسَةِ} الأَنْشِطَةِ المُفِيدَةِ.", ["بِمُمَارَسَةِ", "فِي مُمَارَسَةِ", "عَلَى مُمَارَسَةِ"], "harf-i cer", "Müslümanlar faydalı etkinliklere önem verdi.", "u5"],
  ["رَغَّبَ الإِسْلَامُ {فِي} مُمَارَسَةِ الأَنْشِطَةِ.", ["فِي", "عَلَى", "بِـ"], "harf-i cer", "İslam etkinlikleri teşvik etti.", "u5"],
  ["وَتَنْقَسِمُ {إِلَى} قِسْمَيْنِ.", ["إِلَى", "مِنْ", "عَلَى"], "harf-i cer", "İki kısma ayrılır.", "u5"],
  ["يُمْكِنُهُ أَنْ {يُمَارِسَ} هِوَايَةً.", ["يُمَارِسَ", "يُمَارِسُ", "مُمَارَسَةٌ"], "kalıp", "Bir hobiyle uğraşabilir.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["الهِوَايَاتُ تُضْعِفُ الفِكْرَ ← metne göre düzelt", "الهِوَايَاتُ تُقَوِّي الفِكْرَ وَالجِسْمَ", "الهِوَايَاتُ تُتْعِبُ الفِكْرَ", "الهِوَايَاتُ لَا تُفِيدُ", "وَتُقَوِّي فِكْرَهُ وَجِسْمَهُ.", "u1"],
  ["الطَّبْخُ رِيَاضَةٌ جِسْمِيَّةٌ ← metne göre düzelt", "الطَّبْخُ هِوَايَةٌ مَنْزِلِيَّةٌ", "الطَّبْخُ رِيَاضَةٌ فِكْرِيَّةٌ", "الطَّبْخُ هِوَايَةٌ فَنِّيَّةٌ", "Ev hobisi.", "u2"],
  ["الفَاتِحُ مَارَسَ النِّجَارَةَ ← metne göre düzelt", "عَبْدُ الحَمِيدِ الثَّانِي مَارَسَ النِّجَارَةَ", "سُلَيْمَانُ القَانُونِيُّ مَارَسَ النِّجَارَةَ", "لَمْ يُمَارِسْ أَحَدٌ النِّجَارَةَ", "II. Abdülhamid.", "u2"],
  ["عَنَاءٌ ← eş anlam", "تَعَبٌ", "رَاحَةٌ", "مُتْعَةٌ", "zahmet = yorgunluk", "u3"],
  ["اهْتَمَّ ← eş anlam", "اعْتَنَى", "أَهْمَلَ", "شَوَّقَ", "önem verdi = ilgilendi", "u3"],
  ["رَاحَةٌ ← zıt anlam", "تَعَبٌ", "اسْتِرَاحَةٌ", "مُتْعَةٌ", "dinlenme ≠ yorgunluk", "u3"],
  ["اسْتِرَاحَةٌ ← zıt anlam", "عَمَلٌ", "رَاحَةٌ", "نَوْمٌ", "mola ≠ iş", "u3"],
  ["عَمَلٌ ← çoğul", "أَعْمَالٌ", "عُمَّالٌ", "عَوَامِلُ", "iş → işler", "u3"],
  ["مُمَارَسَةٌ ← çoğul", "مُمَارَسَاتٌ", "مُمَارِسُونَ", "مَمَارِسُ", "uygulama → uygulamalar", "u3"],
  ["أَنْوَاعٌ، لِلْهِوَايَاتِ، هُنَاكَ، كَثِيرَةٌ ← sırala", "هُنَاكَ أَنْوَاعٌ كَثِيرَةٌ لِلْهِوَايَاتِ", "أَنْوَاعٌ هُنَاكَ لِلْهِوَايَاتِ كَثِيرَةٌ", "كَثِيرَةٌ لِلْهِوَايَاتِ أَنْوَاعٌ هُنَاكَ", "Kitaptaki 7. etkinlik.", "u4"],
  ["رِيَاضَةُ المَشْيِ ← tamamla", "رِيَاضَةُ المَشْيِ تُخَفِّفُ القَلَقَ", "رِيَاضَةُ المَشْيِ قَبْلَ الامْتِحَانِ", "رِيَاضَةُ المَشْيِ ابْنَهَا", "Kitaptaki 3. etkinlik.", "u4"],
  ["اهْتَمَّ + القِرَاءَةُ ← harf-i cer", "اهْتَمَّ بِالقِرَاءَةِ", "اهْتَمَّ فِي القِرَاءَةِ", "اهْتَمَّ القِرَاءَةَ", "اهْتَمَّ بِـ + mecrûr", "u5"],
  ["شَجَّعَ + الرِّيَاضَةُ ← harf-i cer", "شَجَّعَ عَلَى الرِّيَاضَةِ", "شَجَّعَ بِالرِّيَاضَةِ", "شَجَّعَ عَلَى الرِّيَاضَةُ", "شَجَّعَ عَلَى + mecrûr", "u5"],
  ["أَسْبَحُ ← يُمْكِنُنِي أَنْ", "يُمْكِنُنِي أَنْ أَسْبَحَ", "يُمْكِنُنِي أَنْ أَسْبَحُ", "يُمْكِنُنِي أَسْبَحَ", "أَنْ + mansûb", "u5"]
];
// Hangi tür? hız oyunu
var NOUN_LIST = UNITS[4].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; }).concat([
  ["صِنَاعَةُ المُجَسَّمَاتِ الخَشَبِيَّةِ 🕋", "fn", "Sanat (el işi)."], ["الرَّسْمُ 🎨", "fn", "Sanat."], ["المَشْيُ 🚶", "cs", "Bedensel spor."], ["رُكُوبُ الدَّرَّاجَةِ 🚴", "cs", "Bedensel spor."]
]);
var SP_M = TURLER;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; }).concat(UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; }));
var HAFIZA = {
  es: { name: "Kelime ↔ eş anlamlısı", pairs: [["عَنَاءٌ", "تَعَبٌ"], ["رَغَّبَ", "شَوَّقَ"], ["جِسْمِيَّةٌ", "بَدَنِيَّةٌ"], ["طَاوِلَةٌ", "مِنْضَدَةٌ"], ["اهْتَمَّ", "اعْتَنَى"], ["مَعْرُوفٌ", "مَعْلُومٌ"]] },
  zd: { name: "Kelime ↔ zıt anlamlısı", pairs: [["مُتْعَةٌ", "مَلَلٌ"], ["رَاحَةٌ", "تَعَبٌ"], ["يُحِبُّ", "يَكْرَهُ"], ["زِيَادَةٌ", "نَقْصٌ"], ["اسْتِرَاحَةٌ", "عَمَلٌ"], ["مَرِيضٌ", "صَحِيحٌ"], ["قَوِيٌّ", "ضَعِيفٌ"]] },
  cm: { name: "Tekil ↔ çoğul", pairs: [["هِوَايَةٌ", "هِوَايَاتٌ"], ["وَقْتٌ", "أَوْقَاتٌ"], ["عَمَلٌ", "أَعْمَالٌ"], ["نَوْعٌ", "أَنْوَاعٌ"], ["مُمَارَسَةٌ", "مُمَارَسَاتٌ"], ["نَشَاطٌ", "أَنْشِطَةٌ"], ["سُلْطَانٌ", "سَلَاطِينُ"], ["عَصْرٌ", "عُصُورٌ"]] }
};
var KARTLAR = [
  ["Hobi nedir?", "نَشَاطٌ يُحِبُّهُ الإِنْسَانُ وَيُمَارِسُهُ فِي أَوْقَاتِ فَرَاغِهِ لِلْمُتْعَةِ وَالرَّاحَةِ"],
  ["Hobinin faydaları?", "تُعْطِي الرَّاحَةَ · تَزِيدُ النَّشَاطَ · تُقَوِّي الفِكْرَ وَالجِسْمَ · تُسَاعِدُ عَلَى الشِّفَاءِ"],
  ["Sanat hobileri?", "التَّمْثِيلُ المَسْرَحِيُّ · التَّصْوِيرُ · صِنَاعَةُ الأَلْعَابِ"],
  ["Ev hobileri?", "الطَّبْخُ · الخِيَاطَةُ · التَّطْرِيزُ · البَسْتَنَةُ · تَرْبِيَةُ الحَيَوَانَاتِ"],
  ["Spor hobileri?", "أَهَمُّ الأَنْوَاعِ · فِكْرِيَّةٌ: الشِّطْرَنْجُ · جِسْمِيَّةٌ: السِّبَاحَةُ، كُرَةُ القَدَمِ، المَشْيُ، التَّزَلُّجُ…"],
  ["Peygamber ﷺ dönemindeki sporlar?", "الجَرْيُ · الرَّمْيُ · الفُرُوسِيَّةُ · السِّبَاحَةُ · المُصَارَعَةُ · السَّيْفُ · المَشْيُ"],
  ["Hadis?", "المُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللهِ مِنَ المُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ"],
  ["Osmanlı sultanlarının hobileri?", "الفَاتِحُ: جَمْعُ الكُتُبِ · سُلَيْمَانُ القَانُونِيُّ: صِيَاغَةُ الذَّهَبِ · عَبْدُ الحَمِيدِ الثَّانِي: النِّجَارَةُ"],
  ["Eş anlamlar?", "عَنَاءٌ = تَعَبٌ · رَغَّبَ = شَوَّقَ · جِسْمِيَّةٌ = بَدَنِيَّةٌ · طَاوِلَةٌ = مِنْضَدَةٌ · اهْتَمَّ = اعْتَنَى · مَعْرُوفٌ = مَعْلُومٌ"],
  ["Zıt anlamlar?", "مُتْعَةٌ ≠ مَلَلٌ · رَاحَةٌ ≠ تَعَبٌ · يُحِبُّ ≠ يَكْرَهُ · زِيَادَةٌ ≠ نَقْصٌ · اسْتِرَاحَةٌ ≠ عَمَلٌ · مَرِيضٌ ≠ صَحِيحٌ"],
  ["Harf-i cerli fiiller?", "رَغِبَ فِي · اهْتَمَّ بِـ · اشْتُهِرَ بِـ · شَجَّعَ عَلَى · سَاعَدَ عَلَى · انْقَسَمَ إِلَى"],
  ["يُمْكِنُ أَنْ?", "“…ebilir” + mansûb: يُمْكِنُهُ أَنْ يُمَارِسَ هِوَايَةً"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat12";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("هِوَايَةٌ", "i", "hobi", "هِوَايَاتٌ", "at", "", "", "الهِوَايَةُ نَشَاطٌ يُحِبُّهُ الإِنْسَانُ.", "الهِوَايَةُ", "Hobi, insanın sevdiği bir uğraştır."),
  KW("نَشَاطٌ", "i", "etkinlik, uğraş; enerji", "أَنْشِطَةٌ", "efile", "", "كَسَلٌ", "الهِوَايَةُ نَشَاطٌ يُحِبُّهُ الإِنْسَانُ.", "نَشَاطٌ", "Hobi sevilen bir uğraştır."),
  KW("فَرَاغٌ", "i", "boşluk, boş vakit", "", "", "", "", "وَيُمَارِسُهُ فِي أَوْقَاتِ فَرَاغِهِ.", "فَرَاغِهِ", "Boş vakitlerinde yapar."),
  KW("وَقْتٌ", "i", "vakit, zaman", "أَوْقَاتٌ", "efal", "زَمَنٌ", "", "وَيُمَارِسُهُ فِي أَوْقَاتِ فَرَاغِهِ.", "أَوْقَاتِ", "Boş vakitlerinde yapar."),
  KW("مُتْعَةٌ", "i", "zevk, keyif", "", "", "", "مَلَلٌ", "وَيُمَارِسُهُ… لِلْمُتْعَةِ وَالرَّاحَةِ.", "لِلْمُتْعَةِ", "Zevk ve dinlenme için."),
  KW("مَلَلٌ", "i", "sıkıntı, bıkkınlık", "", "", "", "مُتْعَةٌ", "الإِنْسَانُ الَّذِي لَا يُمَارِسُ الهِوَايَاتِ يَشْعُرُ بِالمَلَلِ.", "بِالمَلَلِ", "Hobisi olmayan sıkılır."),
  KW("رَاحَةٌ", "i", "dinlenme, rahatlık", "", "", "", "تَعَبٌ", "فَالهِوَايَاتُ تُعْطِي الإِنْسَانَ الرَّاحَةَ.", "الرَّاحَةَ", "Hobiler insanı dinlendirir."),
  KW("عَنَاءٌ", "i", "zahmet, yorgunluk", "", "", "تَعَبٌ", "رَاحَةٌ", "بَعْدَ عَنَاءِ العَمَلِ أَوِ الدِّرَاسَةِ.", "عَنَاءِ", "İş ya da okul yorgunluğundan sonra."),
  KW("عَمَلٌ", "i", "iş", "أَعْمَالٌ", "efal", "شُغْلٌ", "اسْتِرَاحَةٌ", "بَعْدَ عَنَاءِ العَمَلِ أَوِ الدِّرَاسَةِ.", "العَمَلِ", "İş yorgunluğundan sonra."),
  KW("فِكْرٌ", "i", "düşünce, zihin", "أَفْكَارٌ", "efal", "", "", "وَتُقَوِّي فِكْرَهُ وَجِسْمَهُ.", "فِكْرَهُ", "Zihnini ve bedenini güçlendirir."),
  KW("مَرَضٌ", "i", "hastalık", "أَمْرَاضٌ", "efal", "", "صِحَّةٌ", "مِنْ بَعْضِ الأَمْرَاضِ النَّفْسِيَّةِ.", "الأَمْرَاضِ", "Bazı ruhsal hastalıklardan."),
  KW("نَوْعٌ", "i", "tür, çeşit", "أَنْوَاعٌ", "efal", "صِنْفٌ", "", "وَهُنَاكَ أَنْوَاعٌ كَثِيرَةٌ لِلْهِوَايَاتِ.", "أَنْوَاعٌ", "Hobilerin birçok türü vardır."),
  KW("مُمَارَسَةٌ", "i", "uygulama, yapma", "مُمَارَسَاتٌ", "at", "", "", "وَقَدْ رَغَّبَ الإِسْلَامُ فِي مُمَارَسَةِ الأَنْشِطَةِ.", "مُمَارَسَةِ", "İslam etkinlikleri yapmayı teşvik etti."),
  KW("صِحَّةٌ", "i", "sağlık", "", "", "", "مَرَضٌ", "لِأَنَّهَا ضَرُورِيَّةٌ لِصِحَّةِ الإِنْسَانِ.", "لِصِحَّةِ", "Çünkü sağlık için gereklidir."),
  KW("لُعْبَةٌ", "i", "oyun, oyuncak", "أَلْعَابٌ", "efal", "", "", "مِثْلُ… وَصِنَاعَةِ الأَلْعَابِ.", "الأَلْعَابِ", "Oyuncak yapımı gibi."),
  KW("حَيَوَانٌ", "i", "hayvan", "حَيَوَانَاتٌ", "at", "", "", "وَالبَسْتَنَةِ وَتَرْبِيَةِ الحَيَوَانَاتِ.", "الحَيَوَانَاتِ", "Bahçecilik ve hayvan besleme."),
  KW("طَاوِلَةٌ", "i", "masa", "طَاوِلَاتٌ", "at", "مِنْضَدَةٌ", "", "وَكُرَةِ السَّلَّةِ وَكُرَةِ الطَّاوِلَةِ.", "الطَّاوِلَةِ", "Basketbol ve masa tenisi."),
  KW("جَبَلٌ", "i", "dağ", "جِبَالٌ", "fial", "", "سَهْلٌ", "وَالتَّزَلُّجِ وَتَسَلُّقِ الجِبَالِ.", "الجِبَالِ", "Kayak ve dağcılık."),
  KW("عَصْرٌ", "i", "çağ, devir; ikindi", "عُصُورٌ", "fuul", "", "", "فِي كُلِّ العُصُورِ.", "العُصُورِ", "Her çağda."),
  KW("سُلْطَانٌ", "i", "sultan", "سَلَاطِينُ", "fealil", "", "", "وَكَذَلِكَ اهْتَمَّ السَّلَاطِينُ العُثْمَانِيُّونَ.", "السَّلَاطِينُ", "Osmanlı sultanları da önem verdi."),
  KW("ذَهَبٌ", "i", "altın", "", "", "", "", "مَارَسَ هِوَايَةَ صِيَاغَةِ الذَّهَبِ.", "الذَّهَبِ", "Kuyumculukla uğraştı."),
  KW("جِسْمِيٌّ", "s", "bedensel", "", "", "بَدَنِيٌّ", "فِكْرِيٌّ", "وَتَنْقَسِمُ إِلَى قِسْمَيْنِ: فِكْرِيَّةٍ وَجِسْمِيَّةٍ.", "وَجِسْمِيَّةٍ", "Fikrî ve bedensel olarak ikiye ayrılır."),
  KW("ضَرُورِيٌّ", "s", "gerekli, zorunlu", "", "", "لَازِمٌ", "", "لِأَنَّهَا ضَرُورِيَّةٌ لِصِحَّةِ الإِنْسَانِ.", "ضَرُورِيَّةٌ", "Sağlık için gereklidir."),
  KW("مُفِيدٌ", "s", "faydalı", "", "", "نَافِعٌ", "ضَارٌّ", "فِي مُمَارَسَةِ الأَنْشِطَةِ الرِّيَاضِيَّةِ المُفِيدَةِ.", "المُفِيدَةِ", "Faydalı spor etkinlikleri."),
  KW("مَعْرُوفٌ", "s", "bilinen, tanınan", "", "", "مَعْلُومٌ", "مَجْهُولٌ", "وَمِنَ الرِّيَاضَاتِ المَعْرُوفَةِ فِي عَهْدِ النَّبِيِّ ﷺ.", "المَعْرُوفَةِ", "Peygamber döneminde bilinen sporlardan."),
  KW("قَوِيٌّ", "s", "güçlü", "أَقْوِيَاءُ", "efila", "", "ضَعِيفٌ", "المُؤْمِنُ القَوِيُّ خَيْرٌ.", "القَوِيُّ", "Güçlü mümin daha hayırlıdır."),
  KW("ضَعِيفٌ", "s", "zayıf, güçsüz", "ضُعَفَاءُ", "fuala", "", "قَوِيٌّ", "…مِنَ المُؤْمِنِ الضَّعِيفِ.", "الضَّعِيفِ", "…zayıf müminden."),
  KW("صَحِيحٌ", "s", "sağlıklı; doğru", "أَصِحَّاءُ", "efila", "سَلِيمٌ", "مَرِيضٌ", "مَرِيضٍ أَوْ صَحِيحٍ، يُمْكِنُهُ أَنْ يُمَارِسَ هِوَايَةً.", "صَحِيحٍ", "Hasta ya da sağlıklı, herkes bir hobi yapabilir."),
  KW("مَارَسَ", "f", "yaptı, uğraştı", "", "", "", "", "الإِنْسَانُ الَّذِي لَا يُمَارِسُ الهِوَايَاتِ.", "يُمَارِسُ", "Hobi yapmayan insan."),
  KW("قَوَّى", "f", "güçlendirdi", "", "", "", "أَضْعَفَ", "وَتُقَوِّي فِكْرَهُ وَجِسْمَهُ.", "وَتُقَوِّي", "Zihnini ve bedenini güçlendirir."),
  KW("رَغَّبَ", "f", "özendirdi, teşvik etti (فِي)", "", "", "شَوَّقَ", "", "وَقَدْ رَغَّبَ الإِسْلَامُ فِي مُمَارَسَةِ الأَنْشِطَةِ.", "رَغَّبَ", "İslam etkinlikleri teşvik etti."),
  KW("شَجَّعَ", "f", "cesaretlendirdi (عَلَى)", "", "", "", "", "فَقَدْ شَجَّعَ النَّبِيُّ ﷺ عَلَيْهَا.", "شَجَّعَ", "Peygamber ﷺ onlara teşvik etti."),
  KW("اهْتَمَّ", "f", "önem verdi (بِـ)", "", "", "اعْتَنَى", "أَهْمَلَ", "وَقَدِ اهْتَمَّ المُسْلِمُونَ بِمُمَارَسَةِ الأَنْشِطَةِ.", "اهْتَمَّ", "Müslümanlar etkinliklere önem verdi."),
  KW("اشْتُهِرَ", "f", "tanındı, meşhur oldu (بِـ)", "", "", "", "", "اشْتُهِرَ بِهِوَايَةِ جَمْعِ الكُتُبِ القَدِيمَةِ.", "اشْتُهِرَ", "Eski kitap toplama hobisiyle tanındı."),
  KW("انْقَسَمَ", "f", "bölündü, ayrıldı (إِلَى)", "", "", "", "", "وَتَنْقَسِمُ إِلَى قِسْمَيْنِ.", "وَتَنْقَسِمُ", "İki kısma ayrılır."),
  KW("أَمْكَنَ", "f", "mümkün oldu (يُمْكِنُ أَنْ)", "", "", "", "", "يُمْكِنُهُ أَنْ يُمَارِسَ هِوَايَةً مِنَ الهِوَايَاتِ.", "يُمْكِنُهُ", "Bir hobiyle uğraşabilir.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","عُصُورٌ، قُلُوبٌ"],"efal":["أَفْعَالٌ","ef’âl","أَوْقَاتٌ، أَنْوَاعٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَنْشِطَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، رِجَالٌ"],"fuala":["فُعَلَاءُ","fu’alâ","ضُعَفَاءُ، فُقَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَقْوِيَاءُ، أَصِحَّاءُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","سَلَاطِينُ، فَنَادِقُ"],"at":["ـَاتٌ","cem-i müennes sâlim","هِوَايَاتٌ، مُمَارَسَاتٌ"],"diger":["…","başka kalıplar","أَشْيَاءُ"]};
