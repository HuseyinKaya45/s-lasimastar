// ================= VERİ: Kıraat 20 — بَيْنَ الرِّيفِ وَالمَدِينَةِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "القَرْيَةُ", tr: "Köy" }, nasb: { ar: "المَدِينَةُ", tr: "Şehir" }, cerr: { ar: "عُمَرُ", tr: "Ömer" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var KS = [["k", "Köy", "القَرْيَةُ", "mz"], ["s", "Şehir", "المَدِينَةُ", "nasb"]];
var TF = [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "cerr"]];
var RS = [["k", "Köy resmi", "صُورَةُ القَرْيَةِ", "mz"], ["s", "Şehir resmi", "صُورَةُ المَدِينَةِ", "nasb"]];
var GY = [["p", "Köyün olumlu yönü", "إِيجَابِيَّاتُ القَرْيَةِ", "mz"], ["q", "Köyün olumsuz yönü", "سَلْبِيَّاتُ القَرْيَةِ", "ref"], ["r", "Şehrin olumlu yönü", "إِيجَابِيَّاتُ المَدِينَةِ", "nasb"], ["w", "Şehrin olumsuz yönü", "سَلْبِيَّاتُ المَدِينَةِ", "cerr"]];
var TUR_TR = { k: "Köy", s: "Şehir", d: "Doğru", y: "Yanlış", p: "Köy +", q: "Köy −", r: "Şehir +", w: "Şehir −" };

// Resimler (kitaptaki fotoğrafların yerine)
var SVG_KOY = '<svg viewBox="0 0 320 180" role="img" aria-label="Köy manzarası" style="width:100%;max-width:320px;border-radius:14px;display:block">' +
  '<rect width="320" height="180" fill="#bfe3f5"/><circle cx="262" cy="38" r="20" fill="#ffd34d"/>' +
  '<path d="M0 110 L60 50 L120 105 L170 60 L230 110 L280 70 L320 100 L320 180 L0 180Z" fill="#6aa368"/>' +
  '<path d="M0 125 Q80 100 160 122 T320 118 L320 180 L0 180Z" fill="#8fcf6b"/>' +
  '<path d="M120 180 Q150 150 190 140 T250 125 L262 128 Q215 140 205 155 T150 180Z" fill="#5bb0de"/>' +
  '<rect x="40" y="118" width="34" height="24" fill="#f2e2c4"/><path d="M36 120 L57 102 L78 120Z" fill="#c0503a"/><rect x="53" y="128" width="9" height="14" fill="#7a4b2a"/>' +
  '<rect x="250" y="135" width="30" height="22" fill="#f2e2c4"/><path d="M246 137 L265 120 L284 137Z" fill="#c0503a"/>' +
  '<circle cx="100" cy="125" r="11" fill="#2f7d3a"/><rect x="98" y="134" width="4" height="10" fill="#6b4226"/>' +
  '<circle cx="225" cy="120" r="9" fill="#2f7d3a"/><rect x="223" y="128" width="4" height="9" fill="#6b4226"/>' +
  '<ellipse cx="95" cy="160" rx="9" ry="5" fill="#fff"/><circle cx="104" cy="157" r="3" fill="#fff"/></svg>';
var SVG_SEHIR = '<svg viewBox="0 0 320 180" role="img" aria-label="Şehir manzarası" style="width:100%;max-width:320px;border-radius:14px;display:block">' +
  '<rect width="320" height="180" fill="#d7dbe0"/><rect y="0" width="320" height="60" fill="#c4c9cf" opacity=".7"/>' +
  '<rect x="10" y="70" width="40" height="110" fill="#7d8794"/><rect x="55" y="40" width="34" height="140" fill="#5f6b7a"/>' +
  '<rect x="95" y="85" width="45" height="95" fill="#8e98a5"/><path d="M150 180 L150 30 L160 8 L170 30 L170 180Z" fill="#4c5867"/>' +
  '<rect x="178" y="55" width="40" height="125" fill="#6d7887"/><rect x="224" y="90" width="38" height="90" fill="#97a1ad"/><rect x="268" y="60" width="44" height="120" fill="#5c6878"/>' +
  '<g fill="#f6e7a1" opacity=".85"><rect x="18" y="80" width="6" height="6"/><rect x="34" y="96" width="6" height="6"/><rect x="62" y="52" width="6" height="6"/><rect x="76" y="70" width="6" height="6"/><rect x="104" y="98" width="6" height="6"/><rect x="186" y="66" width="6" height="6"/><rect x="200" y="90" width="6" height="6"/><rect x="276" y="74" width="6" height="6"/><rect x="292" y="104" width="6" height="6"/></g>' +
  '<rect y="160" width="320" height="20" fill="#3c4148"/><rect x="40" y="166" width="22" height="9" rx="3" fill="#d9534f"/><rect x="120" y="166" width="22" height="9" rx="3" fill="#f0ad4e"/><rect x="230" y="166" width="22" height="9" rx="3" fill="#5bc0de"/>' +
  '<ellipse cx="100" cy="28" rx="60" ry="10" fill="#a9afb6" opacity=".7"/><ellipse cx="240" cy="40" rx="55" ry="9" fill="#a9afb6" opacity=".6"/></svg>';

// Makine: [konu (ar), konu (tr), köy cümlesi, şehir cümlesi, karşılaştırma, tartışma sorusu, [tr ×4]]
var CMP = [
  ["المَبَانِي", "Binalar", "بُيُوتُ القَرْيَةِ بَسِيطَةٌ وَمُتَبَاعِدَةٌ.", "أَبْنِيَةُ المَدِينَةِ عَالِيَةٌ وَمُتَلَاصِقَةٌ.", "المَبَانِي فِي المَدِينَةِ أَعْلَى مِنْهَا فِي القَرْيَةِ.", "أَيُّ البُيُوتِ تُحِبُّ أَنْ تَسْكُنَ فِيهَا؟ وَلِمَاذَا؟", ["Köyün evleri sade ve birbirinden uzaktır.", "Şehrin binaları yüksek ve bitişiktir.", "Şehirdeki binalar köydekilerden daha yüksektir.", "Hangi evlerde oturmak istersin? Niçin?"]],
  ["الطُّرُقُ", "Yollar", "طُرُقُ القَرْيَةِ ضَيِّقَةٌ وَهَادِئَةٌ.", "شَوَارِعُ المَدِينَةِ وَاسِعَةٌ وَمُزْدَحِمَةٌ.", "الازْدِحَامُ فِي شَوَارِعِ المَدِينَةِ أَكْثَرُ.", "هَلْ تُحِبُّ المَشْيَ فِي الشَّوَارِعِ المُزْدَحِمَةِ؟", ["Köyün yolları dar ve sakindir.", "Şehrin caddeleri geniş ve kalabalıktır.", "Şehrin caddelerinde kalabalık daha fazladır.", "Kalabalık caddelerde yürümeyi sever misin?"]],
  ["الهَوَاءُ", "Hava", "هَوَاءُ القَرْيَةِ نَقِيٌّ عَلِيلٌ.", "جَوُّ المَدِينَةِ مُلَوَّثٌ بِالدُّخَانِ.", "هَوَاءُ القَرْيَةِ أَنْظَفُ مِنْ هَوَاءِ المَدِينَةِ.", "كَيْفَ نُقَلِّلُ التَّلَوُّثَ فِي المَدِينَةِ؟", ["Köyün havası temiz ve serindir.", "Şehrin havası dumanla kirlenmiştir.", "Köyün havası şehrinkinden daha temizdir.", "Şehirde kirliliği nasıl azaltırız?"]],
  ["السُّكَّانُ", "Nüfus", "عَدَدُ سُكَّانِ القَرْيَةِ قَلِيلٌ.", "عَدَدُ سُكَّانِ المَدِينَةِ كَثِيرٌ.", "يَزِيدُ عَدَدُ السُّكَّانِ فِي المَدِينَةِ بِسَبَبِ الهِجْرَةِ.", "لِمَاذَا يُهَاجِرُ النَّاسُ مِنَ الرِّيفِ؟", ["Köyün nüfusu azdır.", "Şehrin nüfusu çoktur.", "Göç yüzünden şehrin nüfusu artar.", "İnsanlar kırsaldan niçin göç eder?"]],
  ["الأَعْمَالُ", "İşler", "يَعْمَلُ أَهْلُ القَرْيَةِ بِالزِّرَاعَةِ وَالرَّعْيِ وَصَيْدِ السَّمَكِ.", "يَعْمَلُ أَهْلُ المَدِينَةِ فِي التِّجَارَةِ وَالصِّنَاعَةِ وَالخَدَمَاتِ.", "فُرَصُ العَمَلِ فِي المَدِينَةِ أَكْثَرُ.", "أَيُّ عَمَلٍ تُحِبُّ أَنْ تَعْمَلَ فِيهِ؟", ["Köy halkı tarım, çobanlık ve balıkçılıkla geçinir.", "Şehir halkı ticaret, sanayi ve hizmetlerde çalışır.", "Şehirde iş fırsatı daha çoktur.", "Hangi işte çalışmak istersin?"]],
  ["العَلَاقَاتُ", "İlişkiler", "الرَّوَابِطُ الاجْتِمَاعِيَّةُ فِي القَرْيَةِ قَوِيَّةٌ.", "العَلَاقَاتُ بَيْنَ أَهْلِ المَدِينَةِ ضَعِيفَةٌ.", "النَّاسُ فِي القَرْيَةِ أَقْرَبُ بَعْضُهُمْ إِلَى بَعْضٍ.", "هَلْ تَعْرِفُ جِيرَانَكَ جَيِّدًا؟", ["Köyde sosyal bağlar güçlüdür.", "Şehir halkı arasındaki ilişkiler zayıftır.", "Köyde insanlar birbirine daha yakındır.", "Komşularını iyi tanır mısın?"]]
];
var CMH = ["القَرْيَةُ · Köy", "المَدِينَةُ · Şehir", "مُقَارَنَةٌ · Karşılaştır", "سُؤَالٌ · Tartış"];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "سَمِعَ عُمَرُ عَنِ المَدِينَةِ، وَعَنِ الخَدَمَاتِ المُتَوَفِّرَةِ فِيهَا، فَقَرَّرَ السَّفَرَ إِلَيْهَا وَالبَحْثَ عَنْ عَمَلٍ فِيهَا. وَفِي الصَّبَاحِ البَاكِرِ انْطَلَقَ نَحْوَ المَدِينَةِ، وَقَدْ وَصَلَ إِلَيْهَا عِنْدَ المَسَاءِ، فَقَضَى لَيْلَتَهُ الأُولَى فِي حَيٍّ قَدِيمٍ فِي مَرْكَزِ المَدِينَةِ، وَفِي صَبَاحِ اليَوْمِ التَّالِي خَرَجَ لِيَتَجَوَّلَ فِي شَوَارِعِهَا الوَاسِعَةِ، وَيُشَاهِدَ أَبْنِيَتَهَا العَالِيَةَ وَمَحَلَّاتِهَا التِّجَارِيَّةَ، وَيَبْحَثَ عَنْ عَمَلٍ فِي الوَقْتِ نَفْسِهِ، لَكِنَّهُ لَمْ يَجِدْ." +
  "<br>وَيَوْمًا بَعْدَ يَوْمٍ بَدَأَ يَشْعُرُ بِالقَلَقِ وَالحُزْنِ، وَأَصْبَحَ لَا يَسْتَطِيعُ النَّوْمَ، وَبَدَأَ يَشْعُرُ بِالضِّيقِ بِسَبَبِ الضَّوْضَاءِ وَالدُّخَانِ الكَثِيرِ وَالازْدِحَامِ وَضَجِيجِ السَّيَّارَاتِ." +
  "<br>بَدَأَ عُمَرُ يُفَكِّرُ فِي العَوْدَةِ إِلَى أُسْرَتِهِ، وَإِلَى قَرْيَتِهِ الهَادِئَةِ، وَهَوَائِهَا العَلِيلِ، وَمَنَاظِرِهَا الجَمِيلَةِ، فَقَرَّرَ العَوْدَةَ. فَرِحَتِ العَائِلَةُ بِعَوْدَةِ عُمَرَ، وَحَضَرَ أَهْلُ القَرْيَةِ لِيَقُولُوا لَهُ: «الحَمْدُ لِلَّهِ عَلَى السَّلَامَةِ»، وَسَأَلُوهُ عَنِ الفَرْقِ بَيْنَ قَرْيَتِهِ وَالمَدِينَةِ، فَقَالَ لَهُمْ:" +
  "<br>«المَدِينَةُ تَخْتَلِفُ عَنِ القَرْيَةِ فِي حَيَاةِ النَّاسِ وَأَعْمَالِهِمْ؛ فَسُكَّانُ القَرْيَةِ يَعْمَلُونَ بِالزِّرَاعَةِ وَالرَّعْيِ وَصَيْدِ السَّمَكِ غَالِبًا، بِالإِضَافَةِ إِلَى بَعْضِ الحِرَفِ اليَدَوِيَّةِ، أَمَّا سُكَّانُ المَدِينَةِ فَيَعْمَلُونَ فِي التِّجَارَةِ وَالصِّنَاعَةِ وَقِطَاعَيِ الخَدَمَاتِ وَالتَّعْلِيمِ. وَهَذِهِ الأَعْمَالُ فِي القَرْيَةِ وَالمَدِينَةِ تُؤَثِّرُ فِي حَيَاةِ النَّاسِ؛ فَمَثَلًا الرَّوَابِطُ الاجْتِمَاعِيَّةُ فِي القَرْيَةِ قَوِيَّةٌ مُقَارَنَةً بِالعَلَاقَاتِ الاجْتِمَاعِيَّةِ بَيْنَ أَهْلِ المَدِينَةِ، فَالعَلَاقَاتُ بَيْنَ أَهْلِ المَدِينَةِ ضَعِيفَةٌ بِسَبَبِ صُعُوبَةِ الحَيَاةِ وَالغَلَاءِ وَطُولِ أَوْقَاتِ العَمَلِ وَغَيْرِهَا. وَبِالنِّسْبَةِ لِلْجَوِّ، فَالمَدِينَةُ جَوُّهَا مُلَوَّثٌ، وَالقَرْيَةُ جَوُّهَا نَظِيفٌ." +
  "<br>وَأَخِيرًا، لِكُلٍّ مِنَ المَدِينَةِ وَالقَرْيَةِ إِيجَابِيَّاتٌ وَسَلْبِيَّاتٌ، وَهَذَا الأَمْرُ يَعُودُ إِلَى الشَّخْصِ نَفْسِهِ وَإِلَى طَبِيعَةِ الحَيَاةِ الَّتِي يُحِبُّ أَنْ يَعِيشَهَا.»";
var METIN_TR = "Ömer şehri ve oradaki hizmetleri duydu; oraya gidip iş aramaya karar verdi. Sabah erkenden şehre doğru yola çıktı ve akşam oraya vardı. İlk gecesini şehir merkezindeki eski bir mahallede geçirdi. Ertesi sabah geniş caddelerinde dolaşmak, yüksek binalarını ve dükkânlarını görmek ve aynı zamanda iş aramak için dışarı çıktı; ama iş bulamadı." +
  "<br>Gün geçtikçe kaygı ve hüzün duymaya başladı; uyuyamaz oldu. Gürültü, yoğun duman, kalabalık ve araba uğultusu yüzünden bunalmaya başladı." +
  "<br>Ömer ailesine, sakin köyüne, onun serin havasına ve güzel manzaralarına dönmeyi düşünmeye başladı ve dönmeye karar verdi. Ailesi Ömer’in dönüşüne sevindi; köy halkı “Geçmiş olsun, Allah’a hamdolsun sağ salim döndün” demeye geldi. Ona köyüyle şehir arasındaki farkı sordular, o da şöyle dedi:" +
  "<br>“Şehir, insanların hayatı ve işleri bakımından köyden farklıdır. Köy halkı çoğunlukla tarım, hayvancılık ve balıkçılıkla, ayrıca bazı el sanatlarıyla uğraşır; şehir halkı ise ticaret, sanayi, hizmet ve eğitim sektörlerinde çalışır. Köydeki ve şehirdeki bu işler insanların hayatını etkiler: Örneğin köydeki sosyal bağlar, şehir halkı arasındaki ilişkilere göre güçlüdür; şehir halkı arasındaki ilişkiler hayatın zorluğu, pahalılık, uzun çalışma saatleri gibi sebeplerle zayıftır. Havaya gelince, şehrin havası kirli, köyün havası temizdir." +
  "<br>Son olarak, şehrin de köyün de olumlu ve olumsuz yönleri vardır; bu da kişinin kendisine ve yaşamayı sevdiği hayatın tabiatına bağlıdır.”";
var SOZLUK = [["المُتَوَفِّرَةُ", "mevcut, bulunan"], ["البَاكِرُ", "erken"], ["انْطَلَقَ", "yola çıktı"], ["يَتَجَوَّلُ", "dolaşır, gezer"], ["القَلَقُ", "kaygı, endişe"], ["الضِّيقُ", "sıkıntı, bunalma"], ["الضَّوْضَاءُ", "gürültü"], ["ضَجِيجٌ", "uğultu, patırtı"], ["العَلِيلُ (الهَوَاءُ)", "serin, hafif (meltem)"], ["الرَّعْيُ", "hayvan otlatma"], ["الحِرَفُ اليَدَوِيَّةُ", "el sanatları"], ["الرَّوَابِطُ", "bağlar"], ["الغَلَاءُ", "pahalılık"], ["مُلَوَّثٌ", "kirli"], ["إِيجَابِيَّاتٌ / سَلْبِيَّاتٌ", "olumlu / olumsuz yönler"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["cerr", "nasb", "mz"],
  goals: ["Okumadan önce konuyu düşünmek: köyde mi şehirde mi yaşıyorsun?", "Metni durmadan baştan sona okumak ve dinlemek", "Yeni kelimeleri anlamlarıyla öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "سَمِعَ:- / عُمَرُ:cerr / عَنِ:- / المَدِينَةِ،:nasb / فَقَرَّرَ السَّفَرَ إِلَيْهَا.:-", tr: "Ömer şehri duydu ve oraya gitmeye karar verdi.", pair: "بَدَأَ:- / عُمَرُ:cerr / يُفَكِّرُ فِي العَوْدَةِ إِلَى:- / قَرْيَتِهِ الهَادِئَةِ.:mz", pairTr: "Ömer sakin köyüne dönmeyi düşünmeye başladı." },
    { s: "فَالمَدِينَةُ جَوُّهَا مُلَوَّثٌ،:nasb / وَالقَرْيَةُ جَوُّهَا نَظِيفٌ.:mz", tr: "Şehrin havası kirli, köyün havası temizdir." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> Köyden şehre iş aramaya giden Ömer, şehirde iş bulamaz; gürültü, duman ve kalabalıktan bunalıp köyüne döner ve köyle şehrin farklarını anlatır." },
    { tr: "<b>Olayların sırası:</b>", ex: ["سَمِعَ عَنِ المَدِينَةِ ← قَرَّرَ السَّفَرَ ← انْطَلَقَ صَبَاحًا ← وَصَلَ مَسَاءً", "تَجَوَّلَ وَبَحَثَ عَنْ عَمَلٍ ← لَمْ يَجِدْ ← شَعَرَ بِالقَلَقِ ← عَادَ إِلَى قَرْيَتِهِ"] },
    { tr: "<b>Okuma yolu:</b> Kitap “<span class=\"ar\">اقْرَأِ النَّصَّ دُونَ تَوَقُّفٍ</span>” der: önce metni bir kez durmadan oku (ya da “Dinle” düğmesiyle dinle), sonra soruları cevapla. Bilmediğin kelimeyi sözlükten bul." },
    { tr: "<b>Ana fikir:</b> <span class=\"ar\">لِكُلٍّ مِنَ المَدِينَةِ وَالقَرْيَةِ إِيجَابِيَّاتٌ وَسَلْبِيَّاتٌ</span> — her ikisinin de iyi ve kötü yanları vardır; tercih kişiye bağlıdır." }
  ],
  kaide: [METIN.split("<br>")[0], METIN.split("<br>")[1], METIN.split("<br>")[2], METIN.split("<br>")[3], METIN.split("<br>")[4]],
  ex: [
    { type: "reading", ar: "اقْرَأِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Metni durmadan oku ya da dinle; önce okuma öncesi sorularını düşün, sonra doğru / yanlış etkinliğini yap.", title: "بَيْنَ الرِّيفِ وَالمَدِينَةِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "هَلْ تَسْكُنُ فِي قَرْيَةٍ أَمْ فِي مَدِينَةٍ؟", a: "أَسْكُنُ فِي مَدِينَةٍ كَبِيرَةٍ، وَلِجَدِّي بَيْتٌ فِي قَرْيَةٍ.", tr: "Köyde mi şehirde mi oturuyorsun? (Örnek cevap) Büyük bir şehirde oturuyorum; dedemin köyde bir evi var." },
        { q: "أَيُّهُمَا تُفَضِّلُ: المَدِينَةَ أَوِ القَرْيَةَ؟ وَلِمَاذَا؟", a: "أُفَضِّلُ القَرْيَةَ لِأَنَّ هَوَاءَهَا نَقِيٌّ وَحَيَاتَهَا هَادِئَةٌ.", tr: "Hangisini tercih edersin, niçin? Köyü; çünkü havası temiz, hayatı sakin." },
        { q: "مَا الإِيجَابِيَّاتُ وَالسَّلْبِيَّاتُ لِلْمَدِينَةِ وَالقَرْيَةِ؟", a: "فِي المَدِينَةِ عَمَلٌ وَخَدَمَاتٌ، لَكِنْ فِيهَا ضَوْضَاءُ وَتَلَوُّثٌ؛ وَفِي القَرْيَةِ هُدُوءٌ وَهَوَاءٌ نَقِيٌّ، لَكِنَّ فُرَصَ العَمَلِ قَلِيلَةٌ.", tr: "Olumlu ve olumsuz yönler: Şehirde iş ve hizmet var ama gürültü ve kirlilik de var; köyde huzur ve temiz hava var ama iş fırsatı az." },
        { q: "لِمَاذَا عَادَ عُمَرُ إِلَى قَرْيَتِهِ؟", a: "لِأَنَّهُ لَمْ يَجِدْ عَمَلًا، وَشَعَرَ بِالقَلَقِ وَالضِّيقِ مِنَ الضَّوْضَاءِ وَالدُّخَانِ وَالازْدِحَامِ.", tr: "Ömer köyüne niçin döndü? İş bulamadı; gürültü, duman ve kalabalıktan bunaldı." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "سَمِعَ عُمَرُ عَنِ المَدِينَةِ فَقَرَّرَ السَّفَرَ إِلَيْهَا.", a: "d", why: "İlk cümle." },
        { s: "وَصَلَ عُمَرُ إِلَى المَدِينَةِ فِي الصَّبَاحِ.", a: "y", why: "Sabah yola çıktı, akşam vardı: عِنْدَ المَسَاءِ." },
        { s: "قَضَى عُمَرُ لَيْلَتَهُ الأُولَى فِي حَيٍّ جَدِيدٍ.", a: "y", why: "Eski bir mahallede: حَيٍّ قَدِيمٍ." },
        { s: "وَجَدَ عُمَرُ عَمَلًا فِي اليَوْمِ التَّالِي.", a: "y", why: "لَكِنَّهُ لَمْ يَجِدْ." },
        { s: "شَعَرَ عُمَرُ بِالقَلَقِ وَالحُزْنِ.", a: "d", why: "يَوْمًا بَعْدَ يَوْمٍ بَدَأَ يَشْعُرُ بِالقَلَقِ وَالحُزْنِ." },
        { s: "كَانَ عُمَرُ يَنَامُ جَيِّدًا فِي المَدِينَةِ.", a: "y", why: "أَصْبَحَ لَا يَسْتَطِيعُ النَّوْمَ." },
        { s: "فَرِحَتِ العَائِلَةُ بِعَوْدَةِ عُمَرَ.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَعْمَلُ سُكَّانُ القَرْيَةِ غَالِبًا فِي التِّجَارَةِ وَالصِّنَاعَةِ.", a: "y", why: "Köy: tarım, hayvancılık, balıkçılık; ticaret ve sanayi şehirde." },
        { s: "الرَّوَابِطُ الاجْتِمَاعِيَّةُ فِي القَرْيَةِ قَوِيَّةٌ.", a: "d", why: "Şehirdekine göre güçlü." },
        { s: "جَوُّ المَدِينَةِ نَظِيفٌ.", a: "y", why: "المَدِينَةُ جَوُّهَا مُلَوَّثٌ." },
        { s: "العَلَاقَاتُ بَيْنَ أَهْلِ المَدِينَةِ ضَعِيفَةٌ بِسَبَبِ الغَلَاءِ وَطُولِ أَوْقَاتِ العَمَلِ.", a: "d", why: "Metinde sayılan sebepler." },
        { s: "لِلْقَرْيَةِ إِيجَابِيَّاتٌ فَقَطْ.", a: "y", why: "Her ikisinin de olumlu ve olumsuz yönleri var." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("وَعَنِ الخَدَمَاتِ المُتَوَفِّرَةِ فِيهَا", "المُتَوَفِّرَةِ"), "mevcut, bulunan", "eksik", "pahalı", "…ve orada bulunan hizmetleri.", "تَوَفَّرَ: bol bol bulunmak."],
      [HL("وَفِي الصَّبَاحِ البَاكِرِ", "البَاكِرِ"), "erken", "geç", "sıcak", "Sabah erkenden.", "بَاكِرٌ = erken."],
      [HL("انْطَلَقَ نَحْوَ المَدِينَةِ", "انْطَلَقَ"), "yola çıktı", "geri döndü", "uyudu", "Şehre doğru yola çıktı.", "Eş anlamlısı: ذَهَبَ."],
      [HL("خَرَجَ لِيَتَجَوَّلَ فِي شَوَارِعِهَا", "لِيَتَجَوَّلَ"), "dolaşmak için", "çalışmak için", "beklemek için", "Caddelerinde dolaşmak için çıktı.", "تَجَوَّلَ: gezmek, dolaşmak."],
      [HL("بَدَأَ يَشْعُرُ بِالقَلَقِ وَالحُزْنِ", "بِالقَلَقِ"), "kaygı, endişe", "sevinç", "yorgunluk", "Kaygı ve hüzün duymaya başladı.", "قَلَقٌ: huzursuzluk, endişe."],
      [HL("بِسَبَبِ الضَّوْضَاءِ وَالدُّخَانِ", "الضَّوْضَاءِ"), "gürültü", "sessizlik", "ışık", "Gürültü ve duman yüzünden.", "Zıddı: الهُدُوءُ."],
      [HL("وَضَجِيجِ السَّيَّارَاتِ", "ضَجِيجِ"), "uğultu, patırtı", "koku", "hız", "Arabaların uğultusu.", "ضَجِيجٌ: yüksek ve karışık ses."],
      [HL("وَهَوَائِهَا العَلِيلِ", "العَلِيلِ"), "serin, hafif (meltem)", "kirli", "sıcak", "Serin havası.", "هَوَاءٌ عَلِيلٌ: tatlı esinti. (Tek başına عَلِيلٌ “hasta” demektir.)"],
      [HL("يَعْمَلُونَ بِالزِّرَاعَةِ وَالرَّعْيِ", "وَالرَّعْيِ"), "hayvan otlatma", "avcılık", "ticaret", "Tarım ve hayvan otlatmayla uğraşırlar.", "رَعَى: otlatmak; رَاعٍ: çoban."],
      [HL("بَعْضِ الحِرَفِ اليَدَوِيَّةِ", "الحِرَفِ اليَدَوِيَّةِ"), "el sanatları", "tarla işleri", "fabrika işleri", "Bazı el sanatları.", "حِرْفَةٌ: zanaat; يَدَوِيٌّ: elle yapılan."],
      [HL("الرَّوَابِطُ الاجْتِمَاعِيَّةُ فِي القَرْيَةِ قَوِيَّةٌ", "الرَّوَابِطُ"), "bağlar", "yollar", "kurallar", "Köydeki sosyal bağlar güçlüdür.", "رَابِطَةٌ: bağ."],
      [HL("بِسَبَبِ صُعُوبَةِ الحَيَاةِ وَالغَلَاءِ", "وَالغَلَاءِ"), "pahalılık", "ucuzluk", "yağmur", "Hayatın zorluğu ve pahalılık yüzünden.", "غَالٍ: pahalı."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama", short: "Anlama", col: "nasb", legend: ["cerr", "nasb", "mz"],
  goals: ["Metinle ilgili soruları cevaplamak", "Olayları metindeki sıraya koymak", "Bilgine göre doğru seçeneği bulmak"],
  examples: [
    { s: "مَا:- / سَبَبُ الهِجْرَةِ:cerr / مِنَ الرِّيفِ؟:mz", tr: "Kırsaldan göçün sebebi nedir?", pair: "البَحْثُ عَنْ عَمَلٍ:nasb / وَالخَدَمَاتِ المُتَوَفِّرَةِ فِي المَدِينَةِ.:nasb", pairTr: "Şehirde iş ve mevcut hizmetleri aramak." }
  ],
  rules: [
    { tr: "Soru kelimesine dikkat et; cevabın türünü o belirler:", ex: ["مَا ← şey / tanım · لِمَاذَا ← sebep (لِأَنَّ…)", "مَتَى ← zaman · أَيْنَ ← yer · كَيْفَ ← durum"] },
    { tr: "Cevabı önce metinde bul, sonra kendi cümlenle yaz. Sorudaki kelimeleri cevapta kullanmak işini kolaylaştırır: <span class=\"ar\">مَا مُشْكِلَاتُ المَدِينَةِ؟ ← مُشْكِلَاتُ المَدِينَةِ: الضَّوْضَاءُ…</span>" },
    { tr: "Sıralama yaparken zaman bildiren kelimeleri izle: <span class=\"ar\">فِي الصَّبَاحِ البَاكِرِ، عِنْدَ المَسَاءِ، فِي صَبَاحِ اليَوْمِ التَّالِي، يَوْمًا بَعْدَ يَوْمٍ</span>." }
  ],
  kaide: ["أَجِبْ عَنِ الأَسْئِلَةِ: ١ ـ مَا سَبَبُ الهِجْرَةِ مِنَ الرِّيفِ؟ ٢ ـ مَا مُشْكِلَاتُ المَدِينَةِ الَّتِي وَجَدَهَا عُمَرُ؟ ٣ ـ مَا الفَرْقُ بَيْنَ الرِّيفِ وَالمَدِينَةِ مِنَ النَّاحِيَةِ الاجْتِمَاعِيَّةِ؟ ٤ ـ مَا إِيجَابِيَّاتُ القَرْيَةِ؟ ٥ ـ مَا سَلْبِيَّاتُ المَدِينَةِ؟"],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre en doğru cevabı seç.", items: PL([
      ["مَا سَبَبُ الهِجْرَةِ مِنَ الرِّيفِ؟", "البَحْثُ عَنْ عَمَلٍ وَعَنِ الخَدَمَاتِ المُتَوَفِّرَةِ فِي المَدِينَةِ.", "الهُرُوبُ مِنَ الضَّوْضَاءِ وَالازْدِحَامِ.", "زِيَارَةُ الأَقَارِبِ فِي العُطْلَةِ.", "Kırsaldan göçün sebebi nedir? İş ve hizmet aramak.", "Ömer şehrin hizmetlerini duydu ve iş aramaya gitti."],
      ["مَا مُشْكِلَاتُ المَدِينَةِ الَّتِي وَجَدَهَا عُمَرُ؟", "الضَّوْضَاءُ وَالدُّخَانُ الكَثِيرُ وَالازْدِحَامُ وَضَجِيجُ السَّيَّارَاتِ.", "الهَوَاءُ العَلِيلُ وَالمَنَاظِرُ الجَمِيلَةُ.", "الحَيَوَانَاتُ وَالحُقُولُ الوَاسِعَةُ.", "Ömer’in şehirde bulduğu sorunlar nelerdir?", "Ayrıca iş bulamadı."],
      ["مَا الفَرْقُ بَيْنَ الرِّيفِ وَالمَدِينَةِ مِنَ النَّاحِيَةِ الاجْتِمَاعِيَّةِ؟", "الرَّوَابِطُ فِي القَرْيَةِ قَوِيَّةٌ، وَالعَلَاقَاتُ فِي المَدِينَةِ ضَعِيفَةٌ.", "العَلَاقَاتُ فِي المَدِينَةِ أَقْوَى مِنْهَا فِي القَرْيَةِ.", "لَا فَرْقَ بَيْنَهُمَا.", "Sosyal bakımdan fark nedir?", "Şehirde hayatın zorluğu, pahalılık ve uzun çalışma saatleri ilişkileri zayıflatır."],
      ["مَا إِيجَابِيَّاتُ القَرْيَةِ؟", "الهُدُوءُ وَالهَوَاءُ النَّقِيُّ وَالمَنَاظِرُ الجَمِيلَةُ وَقُوَّةُ الرَّوَابِطِ.", "كَثْرَةُ المَحَلَّاتِ التِّجَارِيَّةِ وَالأَبْنِيَةِ العَالِيَةِ.", "كَثْرَةُ فُرَصِ العَمَلِ فِي الصِّنَاعَةِ.", "Köyün olumlu yönleri nelerdir?", "قَرْيَتُهُ الهَادِئَةُ، هَوَاؤُهَا العَلِيلُ، مَنَاظِرُهَا الجَمِيلَةُ."],
      ["مَا سَلْبِيَّاتُ المَدِينَةِ؟", "التَّلَوُّثُ وَالضَّوْضَاءُ وَالازْدِحَامُ وَضَعْفُ العَلَاقَاتِ وَالغَلَاءُ.", "الهُدُوءُ وَالبَسَاطَةُ.", "قِلَّةُ السُّكَّانِ وَالسَّيَّارَاتِ.", "Şehrin olumsuz yönleri nelerdir?", "Metnin ikinci ve dördüncü paragrafları."],
      ["مَتَى وَصَلَ عُمَرُ إِلَى المَدِينَةِ؟", "وَصَلَ عِنْدَ المَسَاءِ.", "وَصَلَ فِي الصَّبَاحِ البَاكِرِ.", "وَصَلَ بَعْدَ أُسْبُوعٍ.", "Ömer şehre ne zaman vardı? Akşam.", "Sabah yola çıktı, akşam vardı."],
      ["أَيْنَ قَضَى عُمَرُ لَيْلَتَهُ الأُولَى؟", "فِي حَيٍّ قَدِيمٍ فِي مَرْكَزِ المَدِينَةِ.", "فِي فُنْدُقٍ جَدِيدٍ.", "فِي بَيْتِ صَدِيقِهِ.", "İlk gecesini nerede geçirdi?", "حَيٌّ قَدِيمٌ: eski mahalle."],
      ["مَاذَا قَالَ أَهْلُ القَرْيَةِ لِعُمَرَ؟", "الحَمْدُ لِلَّهِ عَلَى السَّلَامَةِ.", "مَعَ السَّلَامَةِ.", "أَهْلًا وَسَهْلًا بِكَ فِي المَدِينَةِ.", "Köy halkı Ömer’e ne dedi?", "Sağ salim dönen kişiye söylenir."]
    ])},
    { type: "bank", num: "٢", ar: "رَتِّبِ الجُمَلَ حَسَبَ وُرُودِهَا فِي النَّصِّ", tr: "Önce aşağıdan bir sıra numarası seç, sonra cümlenin kutusuna dokun. Olayları metindeki sıraya koy.", bank: ["١", "٢", "٣", "٤", "٥"], items: [
      { pre: "وُصُولُ عُمَرَ إِلَى المَدِينَةِ عِنْدَ المَسَاءِ.", a: [1], tr: "Ömer’in akşam şehre varması." },
      { pre: "ضَجِيجُ السَّيَّارَاتِ لَا يَتَوَقَّفُ فِي المَدِينَةِ.", a: [3], tr: "Şehirde araba uğultusu durmuyor." },
      { pre: "قَرَارُ عُمَرَ السَّفَرَ إِلَى المَدِينَةِ وَتَرْكَ قَرْيَتِهِ.", a: [0], tr: "Ömer’in şehre gitme kararı." },
      { pre: "اشْتِغَالُ النَّاسِ بِالحِرَفِ اليَدَوِيَّةِ.", a: [4], tr: "İnsanların el sanatlarıyla uğraşması." },
      { pre: "بَحْثُ عُمَرَ عَنْ عَمَلٍ لَكِنَّهُ لَمْ يَجِدْ.", a: [2], tr: "Ömer’in iş araması ama bulamaması." }
    ]},
    { type: "pick", fill: true, num: "٣", ar: "اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ حَسَبَ مَعْلُومَاتِكَ", tr: "Boşluğa uygun seçeneği yerleştir.", items: PL([
      ["مَا الشَّيْءُ الَّذِي لَا يُوجَدُ فِي القَرْيَةِ؟ ___", "التَّلَوُّثُ", "الهُدُوءُ", "الحَيَوَانَاتُ", "Köyde bulunmayan nedir? Kirlilik.", "Köyün havası temizdir."],
      ["مُشْكِلَاتُ المَدِينَةِ ___.", "كَثِيرَةٌ", "نَاقِصَةٌ", "قَلِيلَةٌ", "Şehrin sorunları çoktur.", "Gürültü, duman, kalabalık, pahalılık…"],
      ["يُهَاجِرُ أَهْلُ القَرْيَةِ إِلَى المَدِينَةِ بِسَبَبِ ___.", "العَمَلِ", "الاسْتِرَاحَةِ", "العُطْلَةِ", "Köylüler iş yüzünden şehre göçer.", "Ömer de iş aramaya gitti."],
      ["مِنْ سَلْبِيَّاتِ المَدِينَةِ: ___.", "التَّفَكُّكُ الاجْتِمَاعِيُّ", "العَمَلُ المُتَوَفِّرُ", "كَثْرَةُ الإِمْكَانِيَّاتِ", "Şehrin olumsuz yönlerinden biri: toplumsal çözülme.", "Diğer ikisi olumlu yönlerdir."],
      ["مِنْ إِيجَابِيَّاتِ القَرْيَةِ: ___.", "البَسَاطَةُ", "التَّلَوُّثُ", "الضَّوْضَاءُ", "Köyün olumlu yönlerinden biri: sadelik.", "Diğer ikisi şehrin olumsuz yönleri."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİME HAZİNESİ
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelime Hazinesi: Zıt, Eş, Çoğul", short: "Kelimeler", col: "mi", legend: ["mz", "nasb"],
  goals: ["Kelimeleri zıt anlamlılarıyla eşleştirmek", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Metindeki kelimelerin çoğullarını bilmek"],
  examples: [
    { s: "اللَّيْلُ:mz / ≠ النَّهَارُ:nasb", tr: "gece ≠ gündüz (zıt: ضِدٌّ)", pair: "العَوْدَةُ:mz / = الرُّجُوعُ:nasb", pairTr: "dönüş = geri gelme (eş: مُرَادِفٌ)" },
    { s: "مَدِينَةٌ:mz / ← مُدُنٌ:nasb", tr: "şehir → şehirler (cem-i teksîr)", pair: "عَلَاقَةٌ:mz / ← عَلَاقَاتٌ:nasb", pairTr: "ilişki → ilişkiler (cem-i müennes sâlim)" }
  ],
  rules: [
    { tr: "<b>Zıt anlam</b> (<span class=\"ar\">الضِّدُّ</span>): anlamı karşıt kelime: <span class=\"ar\">اللَّيْلُ ≠ النَّهَارُ · المَدِينَةُ ≠ الرِّيفُ · الضِّيقُ ≠ الفَرَجُ</span>." },
    { tr: "<b>Eş anlam</b> (<span class=\"ar\">المُرَادِفُ</span>): anlamı aynı ya da çok yakın kelime: <span class=\"ar\">انْطَلَقَ = ذَهَبَ · العَوْدَةُ = الرُّجُوعُ · الفَرْقُ = الاخْتِلَافُ</span>." },
    { tr: "<b>Çoğul</b> (<span class=\"ar\">الجَمْعُ</span>): çoğu kelime kalıp değiştirir (cem-i teksîr): <span class=\"ar\">مَدِينَةٌ ← مُدُنٌ · شَارِعٌ ← شَوَارِعُ · لَيْلَةٌ ← لَيَالٍ</span>; bazıları <span class=\"ar\">ـَاتٌ</span> alır: <span class=\"ar\">عَلَاقَةٌ ← عَلَاقَاتٌ · إِيجَابِيَّةٌ ← إِيجَابِيَّاتٌ</span>." },
    { tr: "Bazı kelimelerin iki çoğulu vardır: <span class=\"ar\">قَرِيبٌ ← أَقْرِبَاءُ / أَقَارِبُ · مَحَلٌّ ← مَحَلَّاتٌ / مَحَالُّ</span>." }
  ],
  kaide: ["صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا، وَبَيْنَ الكَلِمَةِ وَمُرَادِفِهَا، ثُمَّ هَاتِ جَمْعَ الكَلِمَاتِ: مَدِينَةٌ، عَمَلٌ، قَرِيبٌ، لَيْلَةٌ، شَارِعٌ، مَنْظَرٌ، مَحَلٌّ، أُسْرَةٌ، عَلَاقَةٌ، إِيجَابِيَّةٌ."],
  ex: [
    { type: "bank", num: "٤", ar: "صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["الاسْتِيقَاظُ", "الفَرَجُ", "تَتَّفِقُ", "الرِّيفُ", "النَّهَارُ"], items: [
      { pre: "اللَّيْلُ ≠", a: [4], tr: "gece ≠ gündüz" },
      { pre: "المَدِينَةُ ≠", a: [3], tr: "şehir ≠ kırsal" },
      { pre: "النَّوْمُ ≠", a: [0], tr: "uyku ≠ uyanma" },
      { pre: "الضِّيقُ ≠", a: [1], tr: "sıkıntı ≠ ferahlık" },
      { pre: "تَخْتَلِفُ ≠", a: [2], tr: "farklıdır ≠ uyuşur" }
    ]},
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["الزِّرَاعَةُ", "بَيْنَمَا", "قَوِيٌّ", "ذَهَبَ", "مُقَارَنَةٌ", "الاخْتِلَافُ", "الخَوْفُ", "الرُّجُوعُ"], items: [
      { pre: "فِي حِينِ =", a: [1], tr: "-iken = -iken" },
      { pre: "الفِلَاحَةُ =", a: [0], tr: "çiftçilik = tarım" },
      { pre: "قِيَاسٌ =", a: [4], tr: "kıyas = karşılaştırma" },
      { pre: "وَثِيقٌ =", a: [2], tr: "sağlam = güçlü" },
      { pre: "انْطَلَقَ =", a: [3], tr: "yola çıktı = gitti" },
      { pre: "القَلَقُ =", a: [6], tr: "kaygı = korku (yakın anlam)" },
      { pre: "العَوْدَةُ =", a: [7], tr: "dönüş = geri gelme" },
      { pre: "الفَرْقُ =", a: [5], tr: "fark = ayrılık, farklılık" }
    ]},
    { type: "pick", fill: true, num: "٦", ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Kelimenin çoğulunu seç.", items: PL([
      ["مَدِينَةٌ ← ___", "مُدُنٌ", "مَدِينَاتٌ", "مَدِينُونَ", "şehir → şehirler", "Cem-i teksîr (مَدَائِنُ da kullanılır)."],
      ["عَمَلٌ ← ___", "أَعْمَالٌ", "عُمَّالٌ", "عَمَلَاتٌ", "iş → işler", "عُمَّالٌ, عَامِلٌ’ın çoğuludur (işçiler)."],
      ["قَرِيبٌ ← ___", "أَقْرِبَاءُ / أَقَارِبُ", "قُرًى", "قَرِيبَاتٌ", "akraba → akrabalar", "قُرًى, قَرْيَةٌ’nın çoğuludur."],
      ["لَيْلَةٌ ← ___", "لَيَالٍ", "لُيُولٌ", "أَلْيَالٌ", "gece → geceler", "لَيَالٍ (اللَّيَالِي)."],
      ["شَارِعٌ ← ___", "شَوَارِعُ", "شُرُوعٌ", "شَارِعُونَ", "cadde → caddeler", "فَوَاعِلُ kalıbı."],
      ["مَنْظَرٌ ← ___", "مَنَاظِرُ", "نُظَّارٌ", "مَنْظُورَاتٌ", "manzara → manzaralar", "مَفَاعِلُ kalıbı."],
      ["مَحَلٌّ ← ___", "مَحَلَّاتٌ / مَحَالُّ", "أَحْلَالٌ", "مُحَلُّونَ", "dükkân → dükkânlar", "İki çoğulu da kullanılır."],
      ["أُسْرَةٌ ← ___", "أُسَرٌ", "أَسْرَى", "أُسُورٌ", "aile → aileler", "أَسْرَى: esirler (أَسِيرٌ’in çoğulu)."],
      ["عَلَاقَةٌ ← ___", "عَلَاقَاتٌ", "عُلُوقٌ", "عَلَاقُونَ", "ilişki → ilişkiler", "Cem-i müennes sâlim."],
      ["إِيجَابِيَّةٌ ← ___", "إِيجَابِيَّاتٌ", "إِيجَابِيُّونَ", "أَيَاجِيبُ", "olumlu yön → olumlu yönler", "Cem-i müennes sâlim."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · KÖY Mİ ŞEHİR Mİ?
{
  id: "u4", no: 4, ar: "القَرْيَةُ أَمِ المَدِينَةُ؟", tr: "Köy mü, Şehir mi? Karşılaştırma", short: "Karşılaştır", col: "ref", legend: ["mz", "nasb"],
  goals: ["Kelimeleri köy ya da şehir alanına yerleştirmek", "İki resmi dikkatle inceleyip karşılaştırmak", "Binalar, yollar, hava, nüfus ve işler bakımından köyü şehirle karşılaştırmak"],
  examples: [
    { s: "الهُدُوءُ:mz / ، الهَوَاءُ النَّقِيُّ:mz / ، البَسَاطَةُ:mz", tr: "Huzur, temiz hava, sadelik: köy." },
    { s: "الضَّوْضَاءُ:nasb / ، الازْدِحَامُ:nasb / ، التَّلَوُّثُ:nasb", tr: "Gürültü, kalabalık, kirlilik: şehir." }
  ],
  rules: [
    { tr: "Karşılaştırma kalıpları:", ex: ["… أَكْثَرُ / أَقَلُّ / أَعْلَى مِنْ … (daha çok / az / yüksek)", "مُقَارَنَةً بِـ … (…-e göre)", "أَمَّا … فَـ … (… ise …)", "بَيْنَمَا / فِي حِينِ (-iken)"] },
    { tr: "Örnek: <span class=\"ar\">المَبَانِي فِي المَدِينَةِ عَالِيَةٌ، بَيْنَمَا بُيُوتُ القَرْيَةِ بَسِيطَةٌ</span>. <span class=\"ar\">أَمَّا هَوَاءُ القَرْيَةِ فَنَقِيٌّ</span>." },
    { tr: "Resmi anlatırken “<span class=\"ar\">أَرَى…</span>” (görüyorum), “<span class=\"ar\">فِي الصُّورَةِ…</span>” (resimde), “<span class=\"ar\">يَبْدُو…</span>” (görünüyor) kalıplarını kullan." }
  ],
  kaide: ["ضَعْ كُلَّ كَلِمَةٍ فِي الحَقْلِ المُنَاسِبِ لَهَا. تَأَمَّلِ الصُّورَتَيْنِ بِدِقَّةٍ ثُمَّ قَارِنْ بَيْنَهُمَا. قَارِنْ بَيْنَ المَدِينَةِ وَالقَرْيَةِ: المَبَانِي / الأَبْنِيَةُ، الطُّرُقُ، الهَوَاءُ، عَدَدُ السُّكَّانِ، الأَعْمَالُ."],
  ex: [
    { type: "classify", num: "٧", opts: KS, ar: "ضَعْ كُلَّ كَلِمَةٍ فِي الحَقْلِ المُنَاسِبِ لَهَا", tr: "Kelime köye mi, şehre mi ait?", items: CL([
      ["الحَوَادِثُ", "s", "Trafik kazaları şehirde çoktur."],
      ["الحَيَوَانَاتُ", "k", "Hayvancılık köyde yapılır."],
      ["التَّلَوُّثُ", "s", "Şehrin havası kirli."],
      ["الهُدُوءُ", "k", "Köy sakindir."],
      ["الضَّجِيجُ", "s", "Araba uğultusu."],
      ["الازْدِحَامُ", "s", "Kalabalık."],
      ["الضَّوْضَاءُ", "s", "Gürültü."],
      ["الهَوَاءُ النَّقِيُّ", "k", "Temiz hava."],
      ["السَّيَّارَاتُ الكَثِيرَةُ", "s", "Çok araba."],
      ["البَسَاطَةُ", "k", "Sadelik."],
      ["التَّفَكُّكُ الاجْتِمَاعِيُّ", "s", "İlişkiler zayıf."],
      ["الارْتِبَاطُ بِالأَرْضِ", "k", "Tarım: toprağa bağlılık."],
      ["المَحَلَّاتُ التِّجَارِيَّةُ", "s", "Ticaret şehirde."],
      ["صَيْدُ السَّمَكِ", "k", "Köy halkının işi."],
      ["الأَبْنِيَةُ العَالِيَةُ", "s", "Yüksek binalar."],
      ["الرَّعْيُ", "k", "Hayvan otlatma."]
    ]) },
    { type: "classify", num: "٨", opts: RS, ar: "تَأَمَّلِ الصُّورَتَيْنِ بِدِقَّةٍ ثُمَّ قَارِنْ بَيْنَهُمَا", tr: "Resimlere bak: cümle hangi resmi anlatıyor?", exHtml: '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;direction:rtl"><figure style="margin:0">' + SVG_KOY + '<figcaption class="ar" style="text-align:center">القَرْيَةُ</figcaption></figure><figure style="margin:0">' + SVG_SEHIR + '<figcaption class="ar" style="text-align:center">المَدِينَةُ</figcaption></figure></div>', items: CL([
      ["أَرَى حُقُولًا خَضْرَاءَ وَجِبَالًا.", "k", "Yeşil tarlalar ve dağlar."],
      ["أَرَى أَبْنِيَةً عَالِيَةً مُتَلَاصِقَةً.", "s", "Yüksek, bitişik binalar."],
      ["يَجْرِي نَهْرٌ صَغِيرٌ بَيْنَ البُيُوتِ.", "k", "Dere."],
      ["السَّمَاءُ صَافِيَةٌ وَالشَّمْسُ مُشْرِقَةٌ.", "k", "Temiz hava."],
      ["يَبْدُو الجَوُّ رَمَادِيًّا مُلَوَّثًا.", "s", "Gri, kirli hava."],
      ["فِي الشَّارِعِ سَيَّارَاتٌ كَثِيرَةٌ.", "s", "Trafik."],
      ["البُيُوتُ قَلِيلَةٌ وَمُتَبَاعِدَةٌ.", "k", "Az ve dağınık evler."],
      ["لَا أَرَى أَشْجَارًا.", "s", "Şehir resminde ağaç yok."]
    ]) },
    { type: "bank", num: "٩", ar: "قَارِنْ بَيْنَ المَدِينَةِ وَالقَرْيَةِ", tr: "Önce aşağıdan bir ifade seç, sonra tablodaki uygun kutuya dokun. Her ifade bir kez kullanılır.", bank: ["عَالِيَةٌ وَمُتَلَاصِقَةٌ", "بَسِيطَةٌ وَمُتَبَاعِدَةٌ", "وَاسِعَةٌ وَمُزْدَحِمَةٌ", "ضَيِّقَةٌ وَهَادِئَةٌ", "مُلَوَّثٌ", "نَقِيٌّ عَلِيلٌ", "كَثِيرٌ", "قَلِيلٌ", "التِّجَارَةُ وَالصِّنَاعَةُ وَالخَدَمَاتُ", "الزِّرَاعَةُ وَالرَّعْيُ وَصَيْدُ السَّمَكِ"], items: [
      { pre: "المَبَانِي / الأَبْنِيَةُ فِي المَدِينَةِ:", a: [0], tr: "Şehirde binalar: yüksek ve bitişik." },
      { pre: "المَبَانِي / الأَبْنِيَةُ فِي القَرْيَةِ:", a: [1], tr: "Köyde binalar: sade ve dağınık." },
      { pre: "الطُّرُقُ فِي المَدِينَةِ:", a: [2], tr: "Şehirde yollar: geniş ve kalabalık." },
      { pre: "الطُّرُقُ فِي القَرْيَةِ:", a: [3], tr: "Köyde yollar: dar ve sakin." },
      { pre: "الهَوَاءُ فِي المَدِينَةِ:", a: [4], tr: "Şehirde hava: kirli." },
      { pre: "الهَوَاءُ فِي القَرْيَةِ:", a: [5], tr: "Köyde hava: temiz ve serin." },
      { pre: "عَدَدُ السُّكَّانِ فِي المَدِينَةِ:", a: [6], tr: "Şehirde nüfus: çok." },
      { pre: "عَدَدُ السُّكَّانِ فِي القَرْيَةِ:", a: [7], tr: "Köyde nüfus: az." },
      { pre: "الأَعْمَالُ فِي المَدِينَةِ:", a: [8], tr: "Şehirde işler: ticaret, sanayi, hizmet." },
      { pre: "الأَعْمَالُ فِي القَرْيَةِ:", a: [9], tr: "Köyde işler: tarım, hayvancılık, balıkçılık." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · YAZMA
{
  id: "u5", no: 5, ar: "التَّعْبِيرُ: رَأْيِي فِي الرِّيفِ وَالمَدِينَةِ", tr: "Yazma: Köy ve Şehir Hakkında Görüşüm", short: "Yazma", col: "muz", legend: ["mz", "nasb"],
  goals: ["Bağlaçlarla düzenli bir görüş paragrafı kurmak", "Doğru Arapça cümleyi seçerek yazma becerisini geliştirmek", "Bir örnek yazıda olumlu ve olumsuz yönleri ayırmak", "Köy ve şehir hakkında kendi görüşünü yazmak"],
  examples: [
    { s: "أُفَضِّلُ الحَيَاةَ فِي:- / القَرْيَةِ:mz / لِأَنَّ هَوَاءَهَا نَقِيٌّ،:mz / أَمَّا:- / المَدِينَةُ:nasb / فَفِيهَا فُرَصُ عَمَلٍ كَثِيرَةٌ.:nasb", tr: "Köyde yaşamayı tercih ederim, çünkü havası temiz; şehirde ise çok iş fırsatı var." }
  ],
  rules: [
    { tr: "Görüş yazısının planı: <b>1)</b> Tercihini söyle (<span class=\"ar\">أُفَضِّلُ…</span>), <b>2)</b> sebebini ver (<span class=\"ar\">لِأَنَّ…</span>), <b>3)</b> öbür tarafı da an (<span class=\"ar\">أَمَّا… فَـ…</span>), <b>4)</b> sonuca bağla (<span class=\"ar\">وَأَخِيرًا…</span>)." },
    { tr: "İşine yarayacak kalıplar:", ex: ["فِي رَأْيِي… · أَرَى أَنَّ… · أُفَضِّلُ… لِأَنَّ…", "مِنْ إِيجَابِيَّاتِ… · مِنْ سَلْبِيَّاتِ…", "بَيْنَمَا · لَكِنَّ · بِالإِضَافَةِ إِلَى · وَأَخِيرًا"] },
    { tr: "Kendi yazını defterine 6–8 satır olarak yaz; aşağıdaki örnek yazı ve cümle alıştırmaları sana model olsun." }
  ],
  kaide: ["اكْتُبْ عَنْ رَأْيِكَ الخَاصِّ فِي الرِّيفِ وَالمَدِينَةِ."],
  ex: [
    { type: "bank", extra: true, ar: "أَكْمِلِ الفِقْرَةَ بِالكَلِمَاتِ المُنَاسِبَةِ", tr: "Görüş paragrafını bağlaçlarla tamamla: önce kelimeyi seç, sonra boşluğa dokun.", bank: ["فِي رَأْيِي", "لِأَنَّ", "أَمَّا", "بِالإِضَافَةِ إِلَى", "لَكِنَّ", "وَأَخِيرًا"], tr2: "Bence köydeki hayat şehirdekinden daha güzel; çünkü köyün havası temiz, manzaraları güzel. Buna ek olarak köydeki sosyal bağlar güçlüdür. Şehre gelince, orada iş fırsatı ve hizmet çok; ama gürültü ve kirlilik de var. Son olarak, her ikisinin de olumlu ve olumsuz yönleri vardır.",
      parts: [{ a: [0] }, "الحَيَاةُ فِي القَرْيَةِ أَجْمَلُ مِنَ الحَيَاةِ فِي المَدِينَةِ؛", { a: [1] }, "هَوَاءَهَا نَقِيٌّ وَمَنَاظِرَهَا جَمِيلَةٌ،", { a: [3] }, "قُوَّةِ الرَّوَابِطِ الاجْتِمَاعِيَّةِ فِيهَا.", { a: [2] }, "المَدِينَةُ فَفِيهَا فُرَصُ عَمَلٍ وَخَدَمَاتٌ كَثِيرَةٌ،", { a: [4] }, "فِيهَا ضَوْضَاءَ وَتَلَوُّثًا.", { a: [5] }, "، لِكُلٍّ مِنْهُمَا إِيجَابِيَّاتٌ وَسَلْبِيَّاتٌ."] },
    { type: "pick", extra: true, ar: "اخْتَرِ الجُمْلَةَ الصَّحِيحَةَ", tr: "Türkçe cümlenin doğru Arapçasını seç.", items: PL([
      ["Köyün havası temizdir.", "هَوَاءُ القَرْيَةِ نَقِيٌّ.", "هَوَاءُ القَرْيَةِ نَقِيًّا.", "هَوَاءَ القَرْيَةُ نَقِيٌّ.", "", "Mübtedâ ve haber merfû."],
      ["Şehirde binalar yüksektir.", "الأَبْنِيَةُ فِي المَدِينَةِ عَالِيَةٌ.", "الأَبْنِيَةُ فِي المَدِينَةِ عَالٍ.", "الأَبْنِيَةَ فِي المَدِينَةِ عَالِيَةً.", "", "İnsan dışı çoğul: haber müfred müennes."],
      ["Köyde yaşamayı tercih ederim.", "أُفَضِّلُ الحَيَاةَ فِي القَرْيَةِ.", "أُفَضِّلُ الحَيَاةُ فِي القَرْيَةِ.", "يُفَضِّلُ الحَيَاةَ فِي القَرْيَةِ.", "", "Mef’ûl mansûb; “ben”: أُ."],
      ["Çünkü köyde hayat sakindir.", "لِأَنَّ الحَيَاةَ فِي القَرْيَةِ هَادِئَةٌ.", "لِأَنَّ الحَيَاةُ فِي القَرْيَةِ هَادِئَةٌ.", "لِأَنَّ الحَيَاةَ فِي القَرْيَةِ هَادِئَةً.", "", "أَنَّ ismini nasbeder, haber merfû kalır."],
      ["Şehirde iş fırsatları çoktur.", "فُرَصُ العَمَلِ فِي المَدِينَةِ كَثِيرَةٌ.", "فُرَصُ العَمَلِ فِي المَدِينَةِ كَثِيرُونَ.", "فُرْصَةُ العَمَلِ فِي المَدِينَةِ كَثِيرَةٌ.", "", "فُرَصٌ: insan dışı çoğul."],
      ["Şehrin olumsuz yönlerinden biri gürültüdür.", "مِنْ سَلْبِيَّاتِ المَدِينَةِ الضَّوْضَاءُ.", "مِنْ سَلْبِيَّاتُ المَدِينَةِ الضَّوْضَاءَ.", "مِنْ إِيجَابِيَّاتِ المَدِينَةِ الضَّوْضَاءُ.", "", "Haber öne geçmiş şibh-i cümle."],
      ["Köydeki bağlar şehirdekilere göre güçlüdür.", "الرَّوَابِطُ فِي القَرْيَةِ قَوِيَّةٌ مُقَارَنَةً بِالمَدِينَةِ.", "الرَّوَابِطُ فِي القَرْيَةِ ضَعِيفَةٌ مُقَارَنَةً بِالمَدِينَةِ.", "الرَّوَابِطُ فِي القَرْيَةِ قَوِيَّةً مُقَارَنَةٌ بِالمَدِينَةِ.", "", "مُقَارَنَةً: mansûb."],
      ["Her ikisinin de olumlu ve olumsuz yönleri vardır.", "لِكُلٍّ مِنْهُمَا إِيجَابِيَّاتٌ وَسَلْبِيَّاتٌ.", "لِكُلٍّ مِنْهُمَا إِيجَابِيَّاتٍ وَسَلْبِيَّاتٍ.", "كُلُّهُمَا إِيجَابِيَّاتٌ فَقَطْ.", "", "Muahhar mübtedâ merfû."]
    ])},
    { type: "reading", ar: "اقْرَأْ نَمُوذَجًا ثُمَّ اكْتُبْ عَنْ رَأْيِكَ الخَاصِّ فِي الرِّيفِ وَالمَدِينَةِ", tr: "Örnek yazıyı oku; yönlendirici sorulara cevap ver, sonra cümlelerin hangi yönü anlattığını seç.", title: "رَأْيِي فِي الرِّيفِ وَالمَدِينَةِ (نَمُوذَجٌ)", speak: true,
      text: "وُلِدْتُ فِي مَدِينَةٍ كَبِيرَةٍ، وَأَزُورُ قَرْيَةَ جَدِّي فِي العُطْلَةِ. فِي المَدِينَةِ مَدَارِسُ جَيِّدَةٌ وَمُسْتَشْفَيَاتٌ وَفُرَصُ عَمَلٍ كَثِيرَةٌ، لَكِنَّ الزِّحَامَ شَدِيدٌ وَالهَوَاءَ مُلَوَّثٌ، وَالجِيرَانُ لَا يَعْرِفُ بَعْضُهُمْ بَعْضًا.<br>أَمَّا القَرْيَةُ فَهَادِئَةٌ وَهَوَاؤُهَا نَقِيٌّ، وَالنَّاسُ فِيهَا مُتَعَاوِنُونَ، لَكِنَّ الطُّرُقَ قَلِيلَةٌ وَالمُسْتَشْفَى بَعِيدٌ، وَفُرَصُ العَمَلِ قَلِيلَةٌ.<br>فِي رَأْيِي، أَجْمَلُ حَيَاةٍ أَنْ أَعْمَلَ فِي المَدِينَةِ وَأَقْضِيَ العُطَلَ فِي القَرْيَةِ.",
      textTr: "Büyük bir şehirde doğdum; tatilde dedemin köyünü ziyaret ederim. Şehirde iyi okullar, hastaneler ve çok iş fırsatı var; ama kalabalık çok, hava kirli, komşular birbirini tanımıyor.<br>Köy ise sakin, havası temiz, insanları yardımlaşıyor; ama yollar az, hastane uzak, iş fırsatı az.<br>Bence en güzel hayat, şehirde çalışıp tatilleri köyde geçirmek.",
      qa: [
        { q: "أَيْنَ تَسْكُنُ؟ وَأَيْنَ تَقْضِي العُطْلَةَ؟", a: "أَسْكُنُ فِي … وَأَقْضِي العُطْلَةَ فِي …", tr: "Nerede oturuyorsun, tatili nerede geçiriyorsun? (Kendi cevabını yaz.)" },
        { q: "مَا أَهَمُّ إِيجَابِيَّتَيْنِ لِلْقَرْيَةِ فِي رَأْيِكَ؟", a: "مِنْ إِيجَابِيَّاتِ القَرْيَةِ الهُدُوءُ وَالهَوَاءُ النَّقِيُّ.", tr: "Sence köyün en önemli iki olumlu yönü?" },
        { q: "مَا أَهَمُّ سَلْبِيَّتَيْنِ لِلْمَدِينَةِ؟", a: "مِنْ سَلْبِيَّاتِ المَدِينَةِ الازْدِحَامُ وَالتَّلَوُّثُ.", tr: "Şehrin en önemli iki olumsuz yönü?" },
        { q: "أَيُّهُمَا تُفَضِّلُ؟ وَلِمَاذَا؟", a: "أُفَضِّلُ … لِأَنَّ …", tr: "Hangisini tercih edersin, niçin? (Kendi cevabını yaz.)" }
      ],
      cls: { opts: GY, ar: "أَيُّ جَانِبٍ تَصِفُ الجُمْلَةُ؟", tr: "Koyu ifade hangi yönü anlatıyor?", items: [
        { s: HL("فِي المَدِينَةِ مَدَارِسُ جَيِّدَةٌ وَمُسْتَشْفَيَاتٌ", "مَدَارِسُ جَيِّدَةٌ وَمُسْتَشْفَيَاتٌ"), a: "r", why: "Şehrin olumlu yönü." },
        { s: HL("وَفُرَصُ عَمَلٍ كَثِيرَةٌ", "فُرَصُ عَمَلٍ كَثِيرَةٌ"), a: "r", why: "Şehrin olumlu yönü." },
        { s: HL("لَكِنَّ الزِّحَامَ شَدِيدٌ وَالهَوَاءَ مُلَوَّثٌ", "الزِّحَامَ شَدِيدٌ وَالهَوَاءَ مُلَوَّثٌ"), a: "w", why: "Şehrin olumsuz yönü." },
        { s: HL("وَالجِيرَانُ لَا يَعْرِفُ بَعْضُهُمْ بَعْضًا", "لَا يَعْرِفُ بَعْضُهُمْ بَعْضًا"), a: "w", why: "Zayıf ilişkiler." },
        { s: HL("أَمَّا القَرْيَةُ فَهَادِئَةٌ وَهَوَاؤُهَا نَقِيٌّ", "فَهَادِئَةٌ وَهَوَاؤُهَا نَقِيٌّ"), a: "p", why: "Köyün olumlu yönü." },
        { s: HL("وَالنَّاسُ فِيهَا مُتَعَاوِنُونَ", "مُتَعَاوِنُونَ"), a: "p", why: "Güçlü bağlar." },
        { s: HL("لَكِنَّ الطُّرُقَ قَلِيلَةٌ وَالمُسْتَشْفَى بَعِيدٌ", "الطُّرُقَ قَلِيلَةٌ وَالمُسْتَشْفَى بَعِيدٌ"), a: "q", why: "Köyün olumsuz yönü." },
        { s: HL("وَفُرَصُ العَمَلِ قَلِيلَةٌ", "فُرَصُ العَمَلِ قَلِيلَةٌ"), a: "q", why: "Köyün olumsuz yönü." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["سَمِعَ عُمَرُ عَنِ {المَدِينَةِ} وَعَنِ الخَدَمَاتِ المُتَوَفِّرَةِ فِيهَا.", ["المَدِينَةِ", "القَرْيَةِ", "المَدْرَسَةِ"], "metinden", "Ömer şehri ve oradaki hizmetleri duydu.", "u1"],
  ["وَفِي الصَّبَاحِ {البَاكِرِ} انْطَلَقَ نَحْوَ المَدِينَةِ.", ["البَاكِرِ", "المُتَأَخِّرِ", "البَارِدِ"], "erken", "Sabah erkenden yola çıktı.", "u1"],
  ["وَقَدْ وَصَلَ إِلَيْهَا عِنْدَ {المَسَاءِ}.", ["المَسَاءِ", "الصَّبَاحِ", "الظُّهْرِ"], "akşam", "Akşam vardı.", "u1"],
  ["فَقَضَى لَيْلَتَهُ الأُولَى فِي حَيٍّ {قَدِيمٍ}.", ["قَدِيمٍ", "جَدِيدٍ", "بَعِيدٍ"], "eski", "İlk gecesini eski bir mahallede geçirdi.", "u1"],
  ["وَيَبْحَثَ عَنْ عَمَلٍ فِي الوَقْتِ نَفْسِهِ، لَكِنَّهُ لَمْ {يَجِدْ}.", ["يَجِدْ", "يَذْهَبْ", "يَنَمْ"], "bulamadı", "Ama bulamadı.", "u1"],
  ["وَيَوْمًا بَعْدَ يَوْمٍ بَدَأَ يَشْعُرُ {بِالقَلَقِ} وَالحُزْنِ.", ["بِالقَلَقِ", "بِالفَرَحِ", "بِالرَّاحَةِ"], "kaygı", "Kaygı ve hüzün duymaya başladı.", "u2"],
  ["وَأَصْبَحَ لَا يَسْتَطِيعُ {النَّوْمَ}.", ["النَّوْمَ", "الأَكْلَ", "المَشْيَ"], "uyku", "Uyuyamaz oldu.", "u2"],
  ["بِسَبَبِ الضَّوْضَاءِ وَ{الدُّخَانِ} الكَثِيرِ.", ["الدُّخَانِ", "المَطَرِ", "الهُدُوءِ"], "duman", "Gürültü ve yoğun duman yüzünden.", "u2"],
  ["فَرِحَتِ {العَائِلَةُ} بِعَوْدَةِ عُمَرَ.", ["العَائِلَةُ", "المَدِينَةُ", "الشَّرِكَةُ"], "aile", "Ailesi sevindi.", "u2"],
  ["الحَمْدُ لِلَّهِ عَلَى {السَّلَامَةِ}.", ["السَّلَامَةِ", "العَمَلِ", "السَّفَرِ"], "kalıp söz", "Geçmiş olsun, sağ salim döndün.", "u2"],
  ["اللَّيْلُ عَكْسُ {النَّهَارِ}.", ["النَّهَارِ", "المَسَاءِ", "اللَّيْلَةِ"], "zıt", "Gece gündüzün zıddıdır.", "u3"],
  ["النَّوْمُ عَكْسُ {الاسْتِيقَاظِ}.", ["الاسْتِيقَاظِ", "الرَّاحَةِ", "الحُلْمِ"], "zıt", "Uyku uyanmanın zıddıdır.", "u3"],
  ["العَوْدَةُ تَعْنِي {الرُّجُوعَ}.", ["الرُّجُوعَ", "الذَّهَابَ", "الوُصُولَ"], "eş anlam", "Dönüş geri gelmek demektir.", "u3"],
  ["جَمْعُ مَدِينَةٍ: {مُدُنٌ}.", ["مُدُنٌ", "مَدِينَاتٌ", "مُدُونٌ"], "çoğul", "Şehir → şehirler.", "u3"],
  ["جَمْعُ أُسْرَةٍ: {أُسَرٌ}.", ["أُسَرٌ", "أَسْرَى", "أُسُورٌ"], "çoğul", "Aile → aileler.", "u3"],
  ["جَمْعُ شَارِعٍ: {شَوَارِعُ}.", ["شَوَارِعُ", "شُرُوعٌ", "شَارِعَاتٌ"], "çoğul", "Cadde → caddeler.", "u3"],
  ["فَالمَدِينَةُ جَوُّهَا {مُلَوَّثٌ}.", ["مُلَوَّثٌ", "نَظِيفٌ", "عَلِيلٌ"], "şehir", "Şehrin havası kirli.", "u4"],
  ["وَالقَرْيَةُ جَوُّهَا {نَظِيفٌ}.", ["نَظِيفٌ", "مُلَوَّثٌ", "مُزْدَحِمٌ"], "köy", "Köyün havası temiz.", "u4"],
  ["يَعْمَلُ سُكَّانُ القَرْيَةِ بِـ{الزِّرَاعَةِ} وَالرَّعْيِ.", ["الزِّرَاعَةِ", "التِّجَارَةِ", "الصِّنَاعَةِ"], "köy işi", "Köylüler tarımla uğraşır.", "u4"],
  ["يَعْمَلُ سُكَّانُ المَدِينَةِ فِي {التِّجَارَةِ} وَالصِّنَاعَةِ.", ["التِّجَارَةِ", "الرَّعْيِ", "صَيْدِ السَّمَكِ"], "şehir işi", "Şehirliler ticarette çalışır.", "u4"],
  ["الرَّوَابِطُ الاجْتِمَاعِيَّةُ فِي القَرْيَةِ {قَوِيَّةٌ}.", ["قَوِيَّةٌ", "ضَعِيفَةٌ", "مُلَوَّثَةٌ"], "köy", "Köyde bağlar güçlü.", "u4"],
  ["أُفَضِّلُ القَرْيَةَ {لِأَنَّ} هَوَاءَهَا نَقِيٌّ.", ["لِأَنَّ", "لَكِنَّ", "أَمَّا"], "sebep", "Köyü tercih ederim çünkü havası temiz.", "u5"],
  ["{أَمَّا} المَدِينَةُ فَفِيهَا فُرَصُ عَمَلٍ كَثِيرَةٌ.", ["أَمَّا", "لِأَنَّ", "بَيْنَمَا"], "أَمَّا… فَـ", "Şehre gelince, orada çok iş fırsatı var.", "u5"],
  ["{وَأَخِيرًا}، لِكُلٍّ مِنْهُمَا إِيجَابِيَّاتٌ وَسَلْبِيَّاتٌ.", ["وَأَخِيرًا", "لِأَنَّ", "لَكِنَّ"], "sonuç", "Son olarak, her ikisinin de olumlu ve olumsuz yönleri var.", "u5"],
  ["هَوَاءُ القَرْيَةِ {نَقِيٌّ}.", ["نَقِيٌّ", "نَقِيًّا", "نَقِيٍّ"], "haber merfû", "Köyün havası temiz.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["وَصَلَ عُمَرُ فِي الصَّبَاحِ ← metne göre düzelt", "وَصَلَ عُمَرُ عِنْدَ المَسَاءِ", "وَصَلَ عُمَرُ فِي الظُّهْرِ", "وَصَلَ عُمَرُ فِي اللَّيْلِ", "Sabah yola çıktı, akşam vardı.", "u1"],
  ["وَجَدَ عُمَرُ عَمَلًا ← metne göre düzelt", "لَمْ يَجِدْ عُمَرُ عَمَلًا", "وَجَدَ عُمَرُ عَمَلَيْنِ", "وَجَدَ عُمَرُ عَمَلًا فِي القَرْيَةِ", "لَكِنَّهُ لَمْ يَجِدْ.", "u1"],
  ["حَيٌّ جَدِيدٌ ← metne göre düzelt", "حَيٌّ قَدِيمٌ", "حَيٌّ بَعِيدٌ", "حَيٌّ هَادِئٌ", "فِي حَيٍّ قَدِيمٍ فِي مَرْكَزِ المَدِينَةِ.", "u1"],
  ["شَعَرَ عُمَرُ بِالفَرَحِ ← metne göre düzelt", "شَعَرَ عُمَرُ بِالقَلَقِ وَالحُزْنِ", "شَعَرَ عُمَرُ بِالرَّاحَةِ", "شَعَرَ عُمَرُ بِالجُوعِ", "Gün geçtikçe kaygılandı.", "u2"],
  ["سُكَّانُ القَرْيَةِ يَعْمَلُونَ فِي التِّجَارَةِ ← metne göre düzelt", "سُكَّانُ القَرْيَةِ يَعْمَلُونَ بِالزِّرَاعَةِ وَالرَّعْيِ", "سُكَّانُ القَرْيَةِ يَعْمَلُونَ فِي الصِّنَاعَةِ", "سُكَّانُ القَرْيَةِ لَا يَعْمَلُونَ", "Ticaret şehirde.", "u2"],
  ["الضِّيقُ ← zıt anlam", "الفَرَجُ", "القَلَقُ", "الحُزْنُ", "Sıkıntı ≠ ferahlık.", "u3"],
  ["تَخْتَلِفُ ← zıt anlam", "تَتَّفِقُ", "تَتَغَيَّرُ", "تَبْتَعِدُ", "Farklıdır ≠ uyuşur.", "u3"],
  ["الفَرْقُ ← eş anlam", "الاخْتِلَافُ", "الاتِّفَاقُ", "القُرْبُ", "Fark = farklılık.", "u3"],
  ["عَلَاقَةٌ ← çoğul", "عَلَاقَاتٌ", "عُلُوقٌ", "عَلَاقُونَ", "Cem-i müennes sâlim.", "u3"],
  ["الهَوَاءُ فِي المَدِينَةِ مُلَوَّثٌ ← köy için yaz", "الهَوَاءُ فِي القَرْيَةِ نَقِيٌّ", "الهَوَاءُ فِي القَرْيَةِ مُلَوَّثٌ", "الهَوَاءُ فِي القَرْيَةِ مُزْدَحِمٌ", "Köyün havası temiz.", "u4"],
  ["الأَبْنِيَةُ فِي المَدِينَةِ عَالِيَةٌ ← köy için yaz", "البُيُوتُ فِي القَرْيَةِ بَسِيطَةٌ", "البُيُوتُ فِي القَرْيَةِ عَالِيَةٌ", "البُيُوتُ فِي القَرْيَةِ مُلَوَّثَةٌ", "Köy evleri sade.", "u4"],
  ["عَدَدُ السُّكَّانِ فِي القَرْيَةِ قَلِيلٌ ← şehir için yaz", "عَدَدُ السُّكَّانِ فِي المَدِينَةِ كَثِيرٌ", "عَدَدُ السُّكَّانِ فِي المَدِينَةِ قَلِيلٌ", "عَدَدُ السُّكَّانِ فِي المَدِينَةِ نَقِيٌّ", "Şehrin nüfusu çok.", "u4"],
  ["أُفَضِّلُ القَرْيَةَ. هَوَاؤُهَا نَقِيٌّ. ← لِأَنَّ ile birleştir", "أُفَضِّلُ القَرْيَةَ لِأَنَّ هَوَاءَهَا نَقِيٌّ", "أُفَضِّلُ القَرْيَةَ لِأَنَّ هَوَاؤُهَا نَقِيٌّ", "أُفَضِّلُ القَرْيَةَ لِأَنَّ هَوَاءَهَا نَقِيًّا", "لِأَنَّ ismini nasbeder.", "u5"],
  ["فِي المَدِينَةِ عَمَلٌ. فِيهَا ضَوْضَاءُ. ← لَكِنَّ ile birleştir", "فِي المَدِينَةِ عَمَلٌ لَكِنَّ فِيهَا ضَوْضَاءَ", "فِي المَدِينَةِ عَمَلٌ لَكِنَّ فِيهَا ضَوْضَاءُ", "فِي المَدِينَةِ عَمَلٌ لِأَنَّ فِيهَا ضَوْضَاءَ", "لَكِنَّ’nin ismi mansûb.", "u5"]
];
// Köy mü şehir mi hız oyunu
var NOUN_LIST = UNITS[3].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = KS;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt anlamı", pairs: [["اللَّيْلُ", "النَّهَارُ"], ["المَدِينَةُ", "الرِّيفُ"], ["النَّوْمُ", "الاسْتِيقَاظُ"], ["الضِّيقُ", "الفَرَجُ"], ["تَخْتَلِفُ", "تَتَّفِقُ"], ["قَوِيٌّ", "ضَعِيفٌ"], ["مُلَوَّثٌ", "نَظِيفٌ"], ["قَدِيمٌ", "جَدِيدٌ"]] },
  es: { name: "Kelime ↔ eş anlamı", pairs: [["فِي حِينِ", "بَيْنَمَا"], ["الفِلَاحَةُ", "الزِّرَاعَةُ"], ["قِيَاسٌ", "مُقَارَنَةٌ"], ["وَثِيقٌ", "قَوِيٌّ"], ["انْطَلَقَ", "ذَهَبَ"], ["القَلَقُ", "الخَوْفُ"], ["العَوْدَةُ", "الرُّجُوعُ"], ["الفَرْقُ", "الاخْتِلَافُ"]] },
  co: { name: "Tekil ↔ çoğul", pairs: [["مَدِينَةٌ", "مُدُنٌ"], ["عَمَلٌ", "أَعْمَالٌ"], ["لَيْلَةٌ", "لَيَالٍ"], ["شَارِعٌ", "شَوَارِعُ"], ["مَنْظَرٌ", "مَنَاظِرُ"], ["أُسْرَةٌ", "أُسَرٌ"], ["عَلَاقَةٌ", "عَلَاقَاتٌ"], ["قَرِيبٌ", "أَقْرِبَاءُ"]] }
};
var KARTLAR = [
  ["Metnin kahramanı kim?", "عُمَرُ — köyden şehre iş aramaya giden genç."],
  ["Ömer niçin şehre gitti?", "Şehrin hizmetlerini duydu, iş aramak istedi: البَحْثُ عَنْ عَمَلٍ"],
  ["Şehirde ne oldu?", "İş bulamadı; gürültü, duman ve kalabalıktan bunaldı: الضَّوْضَاءُ وَالدُّخَانُ وَالازْدِحَامُ"],
  ["Ömer niçin döndü?", "Sakin köyünü, serin havasını ve güzel manzaralarını özledi."],
  ["Köy halkı ne dedi?", "الحَمْدُ لِلَّهِ عَلَى السَّلَامَةِ — Sağ salim döndüğüne şükür."],
  ["Köyde işler?", "الزِّرَاعَةُ، الرَّعْيُ، صَيْدُ السَّمَكِ، الحِرَفُ اليَدَوِيَّةُ"],
  ["Şehirde işler?", "التِّجَارَةُ، الصِّنَاعَةُ، الخَدَمَاتُ، التَّعْلِيمُ"],
  ["Sosyal bağlar?", "Köyde güçlü, şehirde zayıf (pahalılık, uzun mesai)."],
  ["Hava?", "المَدِينَةُ جَوُّهَا مُلَوَّثٌ، وَالقَرْيَةُ جَوُّهَا نَظِيفٌ"],
  ["Ana fikir?", "لِكُلٍّ مِنَ المَدِينَةِ وَالقَرْيَةِ إِيجَابِيَّاتٌ وَسَلْبِيَّاتٌ — tercih kişiye bağlı."],
  ["Zıt: الضِّيقُ / Eş: العَوْدَةُ?", "الفَرَجُ · الرُّجُوعُ"],
  ["Görüş yazısı kalıpları?", "فِي رَأْيِي… · أُفَضِّلُ… لِأَنَّ… · أَمَّا… فَـ… · وَأَخِيرًا…"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat20";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("خِدْمَةٌ", "i", "hizmet", "خَدَمَاتٌ", "at", "", "", "سَمِعَ عُمَرُ عَنِ الخَدَمَاتِ المُتَوَفِّرَةِ فِيهَا.", "الخَدَمَاتِ", "Ömer oradaki hizmetleri duydu."),
  KW("مُتَوَفِّرٌ", "s", "mevcut, bulunan", "", "", "مَوْجُودٌ", "", "عَنِ الخَدَمَاتِ المُتَوَفِّرَةِ فِيهَا.", "المُتَوَفِّرَةِ", "Oradaki mevcut hizmetler."),
  KW("بَحَثَ", "f", "aradı (عَنْ)", "", "", "فَتَّشَ", "", "فَقَرَّرَ السَّفَرَ إِلَيْهَا وَالبَحْثَ عَنْ عَمَلٍ فِيهَا.", "وَالبَحْثَ", "Oraya gidip iş aramaya karar verdi."),
  KW("بَاكِرٌ", "s", "erken", "", "", "مُبَكِّرٌ", "مُتَأَخِّرٌ", "وَفِي الصَّبَاحِ البَاكِرِ انْطَلَقَ نَحْوَ المَدِينَةِ.", "البَاكِرِ", "Sabah erkenden şehre doğru yola çıktı."),
  KW("انْطَلَقَ", "f", "yola çıktı", "", "", "ذَهَبَ", "", "وَفِي الصَّبَاحِ البَاكِرِ انْطَلَقَ نَحْوَ المَدِينَةِ.", "انْطَلَقَ", "Sabah erkenden şehre doğru yola çıktı."),
  KW("لَيْلَةٌ", "i", "gece", "لَيَالٍ", "diger", "", "نَهَارٌ", "فَقَضَى لَيْلَتَهُ الأُولَى فِي حَيٍّ قَدِيمٍ.", "لَيْلَتَهُ", "İlk gecesini eski bir mahallede geçirdi."),
  KW("حَيٌّ", "i", "mahalle", "أَحْيَاءٌ", "efal", "", "", "فَقَضَى لَيْلَتَهُ الأُولَى فِي حَيٍّ قَدِيمٍ.", "حَيٍّ", "İlk gecesini eski bir mahallede geçirdi."),
  KW("تَجَوَّلَ", "f", "dolaştı, gezdi", "", "", "", "", "خَرَجَ لِيَتَجَوَّلَ فِي شَوَارِعِهَا الوَاسِعَةِ.", "لِيَتَجَوَّلَ", "Geniş caddelerinde dolaşmak için çıktı."),
  KW("شَارِعٌ", "i", "cadde, sokak", "شَوَارِعُ", "fevail", "", "", "خَرَجَ لِيَتَجَوَّلَ فِي شَوَارِعِهَا الوَاسِعَةِ.", "شَوَارِعِهَا", "Geniş caddelerinde dolaşmak için çıktı."),
  KW("وَاسِعٌ", "s", "geniş", "", "", "عَرِيضٌ", "ضَيِّقٌ", "خَرَجَ لِيَتَجَوَّلَ فِي شَوَارِعِهَا الوَاسِعَةِ.", "الوَاسِعَةِ", "Geniş caddelerinde dolaşmak için çıktı."),
  KW("بِنَاءٌ", "i", "bina, yapı", "أَبْنِيَةٌ", "efile", "مَبْنًى", "", "وَيُشَاهِدَ أَبْنِيَتَهَا العَالِيَةَ.", "أَبْنِيَتَهَا", "Yüksek binalarını görmek için."),
  KW("عَالٍ", "s", "yüksek", "", "", "مُرْتَفِعٌ", "مُنْخَفِضٌ", "وَيُشَاهِدَ أَبْنِيَتَهَا العَالِيَةَ.", "العَالِيَةَ", "Yüksek binalarını görmek için."),
  KW("مَحَلٌّ", "i", "dükkân", "مَحَلَّاتٌ", "at", "دُكَّانٌ", "", "وَمَحَلَّاتِهَا التِّجَارِيَّةَ.", "وَمَحَلَّاتِهَا", "Ve ticari dükkânlarını."),
  KW("شَعَرَ", "f", "hissetti (بِـ)", "", "", "أَحَسَّ", "", "بَدَأَ يَشْعُرُ بِالقَلَقِ وَالحُزْنِ.", "يَشْعُرُ", "Kaygı ve hüzün hissetmeye başladı."),
  KW("قَلَقٌ", "i", "kaygı, endişe", "", "", "خَوْفٌ", "اطْمِئْنَانٌ", "بَدَأَ يَشْعُرُ بِالقَلَقِ وَالحُزْنِ.", "بِالقَلَقِ", "Kaygı ve hüzün hissetmeye başladı."),
  KW("حُزْنٌ", "i", "hüzün", "أَحْزَانٌ", "efal", "", "فَرَحٌ", "بَدَأَ يَشْعُرُ بِالقَلَقِ وَالحُزْنِ.", "وَالحُزْنِ", "Kaygı ve hüzün hissetmeye başladı."),
  KW("ضِيقٌ", "i", "sıkıntı, bunalma", "", "", "", "فَرَجٌ", "وَبَدَأَ يَشْعُرُ بِالضِّيقِ بِسَبَبِ الضَّوْضَاءِ.", "بِالضِّيقِ", "Gürültü yüzünden bunalmaya başladı."),
  KW("ضَوْضَاءُ", "i", "gürültü", "", "", "ضَجِيجٌ", "هُدُوءٌ", "بِسَبَبِ الضَّوْضَاءِ وَالدُّخَانِ الكَثِيرِ.", "الضَّوْضَاءِ", "Gürültü ve çok duman yüzünden."),
  KW("دُخَانٌ", "i", "duman", "أَدْخِنَةٌ", "efile", "", "", "بِسَبَبِ الضَّوْضَاءِ وَالدُّخَانِ الكَثِيرِ.", "وَالدُّخَانِ", "Gürültü ve çok duman yüzünden."),
  KW("ازْدِحَامٌ", "i", "kalabalık", "", "", "زِحَامٌ", "", "وَالازْدِحَامِ وَضَجِيجِ السَّيَّارَاتِ.", "وَالازْدِحَامِ", "Kalabalık ve araba uğultusu."),
  KW("ضَجِيجٌ", "i", "uğultu, patırtı", "", "", "ضَوْضَاءُ", "هُدُوءٌ", "وَالازْدِحَامِ وَضَجِيجِ السَّيَّارَاتِ.", "وَضَجِيجِ", "Kalabalık ve araba uğultusu."),
  KW("فَكَّرَ", "f", "düşündü (فِي)", "", "", "", "", "بَدَأَ عُمَرُ يُفَكِّرُ فِي العَوْدَةِ إِلَى أُسْرَتِهِ.", "يُفَكِّرُ", "Ömer ailesine dönmeyi düşünmeye başladı."),
  KW("عَوْدَةٌ", "i", "dönüş", "", "", "رُجُوعٌ", "ذَهَابٌ", "بَدَأَ عُمَرُ يُفَكِّرُ فِي العَوْدَةِ إِلَى أُسْرَتِهِ.", "العَوْدَةِ", "Ömer ailesine dönmeyi düşünmeye başladı."),
  KW("هَادِئٌ", "s", "sakin, sessiz", "", "", "سَاكِنٌ", "صَاخِبٌ", "وَإِلَى قَرْيَتِهِ الهَادِئَةِ.", "الهَادِئَةِ", "Ve sakin köyüne."),
  KW("عَلِيلٌ", "s", "serin, hafif (hava)", "", "", "", "", "وَهَوَائِهَا العَلِيلِ.", "العَلِيلِ", "Ve serin havasına."),
  KW("مَنْظَرٌ", "i", "manzara", "مَنَاظِرُ", "mefail", "", "", "وَمَنَاظِرِهَا الجَمِيلَةِ.", "وَمَنَاظِرِهَا", "Ve güzel manzaralarına."),
  KW("فَرْقٌ", "i", "fark", "فُرُوقٌ", "fuul", "اخْتِلَافٌ", "", "وَسَأَلُوهُ عَنِ الفَرْقِ بَيْنَ قَرْيَتِهِ وَالمَدِينَةِ.", "الفَرْقِ", "Ona köyüyle şehir arasındaki farkı sordular."),
  KW("اخْتَلَفَ", "f", "farklı oldu (عَنْ)", "", "", "", "اتَّفَقَ", "المَدِينَةُ تَخْتَلِفُ عَنِ القَرْيَةِ.", "تَخْتَلِفُ", "Şehir köyden farklıdır."),
  KW("سَاكِنٌ", "i", "sakin, oturan", "سُكَّانٌ", "fual2", "", "", "فَسُكَّانُ القَرْيَةِ يَعْمَلُونَ بِالزِّرَاعَةِ.", "فَسُكَّانُ", "Köy halkı tarımla uğraşır."),
  KW("زِرَاعَةٌ", "i", "tarım", "", "", "فِلَاحَةٌ", "", "فَسُكَّانُ القَرْيَةِ يَعْمَلُونَ بِالزِّرَاعَةِ.", "بِالزِّرَاعَةِ", "Köy halkı tarımla uğraşır."),
  KW("رَعْيٌ", "i", "hayvan otlatma", "", "", "", "", "يَعْمَلُونَ بِالزِّرَاعَةِ وَالرَّعْيِ وَصَيْدِ السَّمَكِ.", "وَالرَّعْيِ", "Tarım, hayvancılık ve balıkçılıkla uğraşırlar."),
  KW("حِرْفَةٌ", "i", "zanaat, meslek", "حِرَفٌ", "fiel", "", "", "بِالإِضَافَةِ إِلَى بَعْضِ الحِرَفِ اليَدَوِيَّةِ.", "الحِرَفِ", "Bazı el sanatlarına ek olarak."),
  KW("أَثَّرَ", "f", "etkiledi (فِي)", "", "", "", "", "وَهَذِهِ الأَعْمَالُ تُؤَثِّرُ فِي حَيَاةِ النَّاسِ.", "تُؤَثِّرُ", "Bu işler insanların hayatını etkiler."),
  KW("رَابِطَةٌ", "i", "bağ", "رَوَابِطُ", "fevail", "عَلَاقَةٌ", "", "الرَّوَابِطُ الاجْتِمَاعِيَّةُ فِي القَرْيَةِ قَوِيَّةٌ.", "الرَّوَابِطُ", "Köyde sosyal bağlar güçlüdür."),
  KW("عَلَاقَةٌ", "i", "ilişki", "عَلَاقَاتٌ", "at", "رَابِطَةٌ", "", "فَالعَلَاقَاتُ بَيْنَ أَهْلِ المَدِينَةِ ضَعِيفَةٌ.", "فَالعَلَاقَاتُ", "Şehir halkı arasındaki ilişkiler zayıftır."),
  KW("ضَعِيفٌ", "s", "zayıf", "", "", "", "قَوِيٌّ", "فَالعَلَاقَاتُ بَيْنَ أَهْلِ المَدِينَةِ ضَعِيفَةٌ.", "ضَعِيفَةٌ", "Şehir halkı arasındaki ilişkiler zayıftır."),
  KW("غَلَاءٌ", "i", "pahalılık", "", "", "", "رُخْصٌ", "بِسَبَبِ صُعُوبَةِ الحَيَاةِ وَالغَلَاءِ.", "وَالغَلَاءِ", "Hayatın zorluğu ve pahalılık yüzünden."),
  KW("مُلَوَّثٌ", "s", "kirli, kirlenmiş", "", "", "", "نَظِيفٌ", "فَالمَدِينَةُ جَوُّهَا مُلَوَّثٌ.", "مُلَوَّثٌ", "Şehrin havası kirlidir."),
  KW("إِيجَابِيَّةٌ", "i", "olumlu yön", "إِيجَابِيَّاتٌ", "at", "", "سَلْبِيَّةٌ", "لِكُلٍّ مِنَ المَدِينَةِ وَالقَرْيَةِ إِيجَابِيَّاتٌ وَسَلْبِيَّاتٌ.", "إِيجَابِيَّاتٌ", "Şehrin de köyün de olumlu ve olumsuz yönleri vardır."),
  KW("قَرِيبٌ", "i", "akraba; yakın", "أَقَارِبُ", "efail", "", "بَعِيدٌ", "يَزُورُ أَهْلُ القَرْيَةِ أَقَارِبَهُمْ كَثِيرًا.", "أَقَارِبَهُمْ", "Köylüler akrabalarını sık ziyaret eder.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"at":["ـَاتٌ","cem-i müennes sâlim","خَدَمَاتٌ، مَحَلَّاتٌ، عَلَاقَاتٌ"],"efal":["أَفْعَالٌ","ef’âl","أَحْيَاءٌ، أَحْزَانٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَبْنِيَةٌ، أَدْخِنَةٌ"],"fevail":["فَوَاعِلُ","fevâil","شَوَارِعُ، رَوَابِطُ"],"mefail":["مَفَاعِلُ","mefâil","مَنَاظِرُ، مَدَارِسُ"],"fuul":["فُعُولٌ","fuûl","فُرُوقٌ، بُيُوتٌ"],"fual2":["فُعَّالٌ","fu’’âl","سُكَّانٌ، عُمَّالٌ"],"fiel":["فِعَلٌ","fi’al","حِرَفٌ، قِطَعٌ"],"efail":["أَفَاعِلُ","efâil","أَقَارِبُ، أَصَابِعُ"],"diger":["…","başka kalıplar","لَيَالٍ"]};
