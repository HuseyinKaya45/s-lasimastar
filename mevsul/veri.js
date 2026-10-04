// ================= VERİ: İsm-i Mevsul (الأَسْمَاءُ المَوْصُولَةُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mi: { ar: "اسْمٌ مَوْصُولٌ", tr: "İsm-i mevsul" }, cerr: { ar: "صِلَةُ المَوْصُولِ", tr: "Sıla" },
  mz: { ar: "عَائِدٌ", tr: "Âid" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cer", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
// Kategoriler: mevsul [merfû, mansûb/mecrûr]
var MC = {
  ms: { tr: "Müfred müzekker", m: ["الَّذِي"] },
  fs: { tr: "Müfred müennes", m: ["الَّتِي"] },
  md: { tr: "Müsennâ müzekker", m: ["اللَّذَانِ", "اللَّذَيْنِ"] },
  fd: { tr: "Müsennâ müennes", m: ["اللَّتَانِ", "اللَّتَيْنِ"] },
  pm: { tr: "Cemi müzekker", m: ["الَّذِينَ"] },
  pf: { tr: "Cemi müennes", m: ["اللَّاتِي"], alt: "اللَّوَاتِي، اللَّائِي" },
  ga: { tr: "Akılsız çoğul", m: ["الَّتِي"] }
};
function mev(cat, h) { var a = MC[cat].m; return a.length > 1 && h > 0 ? a[1] : a[0]; }
var M_ALL = ["الَّذِي", "الَّتِي", "اللَّذَانِ", "اللَّذَيْنِ", "اللَّتَانِ", "اللَّتَيْنِ", "الَّذِينَ", "اللَّاتِي"];
// Makine isimleri: [merfû, mansûb, mecrûr], kategori, sıla, Türkçe
var MNOUNS = [
  [["الطَّالِبُ", "الطَّالِبَ", "الطَّالِبِ"], "ms", "يَجْلِسُ فِي الصَّفِّ", "sınıfta oturan öğrenci"],
  [["الطَّالِبَةُ", "الطَّالِبَةَ", "الطَّالِبَةِ"], "fs", "تَجْلِسُ فِي الصَّفِّ", "sınıfta oturan kız öğrenci"],
  [["الطَّالِبَانِ", "الطَّالِبَيْنِ", "الطَّالِبَيْنِ"], "md", "يَجْلِسَانِ فِي الصَّفِّ", "sınıfta oturan iki öğrenci"],
  [["الطَّالِبَتَانِ", "الطَّالِبَتَيْنِ", "الطَّالِبَتَيْنِ"], "fd", "تَجْلِسَانِ فِي الصَّفِّ", "sınıfta oturan iki kız öğrenci"],
  [["الطُّلَّابُ", "الطُّلَّابَ", "الطُّلَّابِ"], "pm", "يَجْلِسُونَ فِي الصَّفِّ", "sınıfta oturan öğrenciler"],
  [["الطَّالِبَاتُ", "الطَّالِبَاتِ", "الطَّالِبَاتِ"], "pf", "يَجْلِسْنَ فِي الصَّفِّ", "sınıfta oturan kız öğrenciler"],
  [["الكُتُبُ", "الكُتُبَ", "الكُتُبِ"], "ga", "عَلَى الطَّاوِلَةِ", "masadaki kitaplar"]
];
// Hız oyunu: [isim, kategori, Türkçe]
var NOUN_LIST = [
  ["الطَّبِيبُ", "ms", "doktor"], ["الكِتَابُ", "ms", "kitap"], ["الفُنْدُقُ", "ms", "otel"], ["الشَّايُ", "ms", "çay"], ["البُلْبُلُ", "ms", "bülbül"],
  ["الطَّالِبَةُ", "fs", "kız öğrenci"], ["السَّيَّارَةُ", "fs", "araba"], ["الكُلِّيَّةُ", "fs", "fakülte"], ["المَرْأَةُ", "fs", "kadın"], ["الطَّائِرَةُ", "fs", "uçak"],
  ["الطَّالِبَانِ", "md", "iki öğrenci"], ["المُوَظَّفَانِ", "md", "iki memur"], ["الكِتَابَانِ", "md", "iki kitap"],
  ["الزَّهْرَتَانِ", "fd", "iki çiçek"], ["الطَّالِبَتَانِ", "fd", "iki kız öğrenci"], ["السَّيَّارَتَانِ", "fd", "iki araba"],
  ["العُمَّالُ", "pm", "işçiler"], ["الأَطِبَّاءُ", "pm", "doktorlar"], ["المُؤْمِنُونَ", "pm", "müminler"], ["الضُّيُوفُ", "pm", "misafirler"], ["السُّيَّاحُ", "pm", "turistler"],
  ["الفَلَّاحَاتُ", "pf", "çiftçi kadınlar"], ["البَنَاتُ", "pf", "kızlar"], ["الطَّالِبَاتُ", "pf", "kız öğrenciler"], ["المُسْلِمَاتُ", "pf", "Müslüman kadınlar"],
  ["الكُتُبُ", "ga", "kitaplar"], ["الحَقَائِقُ", "ga", "gerçekler"], ["المُؤَسَّسَاتُ", "ga", "kurumlar"], ["الأَيَّامُ", "ga", "günler"], ["الدُّرُوسُ", "ga", "dersler"]
];
var SP_M = [["ms", "Müfred müz.", "الَّذِي", "cerr"], ["fs", "Müfred müen.", "الَّتِي", "mun"], ["md", "Müsennâ müz.", "اللَّذَانِ", "mz"], ["fd", "Müsennâ müen.", "اللَّتَانِ", "nasb"], ["pm", "Cemi müz.", "الَّذِينَ", "ref"], ["pf", "Cemi müen.", "اللَّاتِي", "mi"]];
var MM_OPTS = [["n", "Men (akıllı)", "مَنْ", "cerr"], ["m", "Mâ (akılsız)", "مَا", "mz"]];

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }

var UNITS = [
// ---------------------------------------------------------------- 1 · MEVSUL VE SILA
{
  id: "u1", no: 1, ar: "الاسْمُ المَوْصُولُ وَصِلَتُهُ", tr: "İsm-i Mevsul ve Sıla", short: "Mevsul · sıla", col: "mi", legend: ["mi", "cerr"],
  goals: ["İsm-i mevsulün anlamının ancak bir cümleyle (sıla) tamamlandığını bilmek", "Has mevsulleri (الَّذِي، الَّتِي…) ve müşterek mevsulleri (مَنْ، مَا) tanımak", "Âyet, hadis ve cümlelerde ism-i mevsulü bulmak"],
  examples: [
    { s: "رَجَعَ الطَّالِبُ:- / الَّذِي:mi / سَافَرَ.:cerr", tr: "Yolculuk eden öğrenci döndü.", pair: "عَادَتِ الطَّالِبَةُ:- / الَّتِي:mi / سَافَرَتْ.:cerr", pairTr: "Yolculuk eden kız öğrenci döndü." },
    { s: "شَكَرْتُ الطَّالِبَيْنِ:- / اللَّذَيْنِ:mi / عَمِلَا الوَاجِبَ.:cerr", tr: "Ödevi yapan iki öğrenciye teşekkür ettim.", pair: "رَأَيْتُ الطَّالِبَتَيْنِ:- / اللَّتَيْنِ:mi / تَذْهَبَانِ إِلَى المَكْتَبَةِ.:cerr", pairTr: "Kütüphaneye giden iki kız öğrenciyi gördüm." },
    { s: "قَابَلْتُ المُدَرِّسِينَ:- / الَّذِينَ:mi / يَعْمَلُونَ فِي الثَّانَوِيَّةِ.:cerr", tr: "Lisede çalışan öğretmenlerle görüştüm.", pair: "أُقَدِّرُ الطَّالِبَاتِ:- / اللَّاتِي:mi / يَقْرَأْنَ دُرُوسَهُنَّ.:cerr", pairTr: "Derslerini okuyan kız öğrencileri takdir ederim." },
    { s: "حَضَرَ:- / مَنْ:mi / قَرَأَ القُرْآنَ الكَرِيمَ.:cerr", tr: "Kur’an-ı Kerîm’i okuyan kişi geldi.", pair: "حَكَى الرَّجُلُ:- / مَا:mi / شَاهَدَهُ.:cerr", pairTr: "Adam gördüğünü anlattı." }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">İsm-i mevsul</b> (<span class=\"ar\">الاسْمُ المَوْصُولُ</span>), anlamı ancak kendisine bağlanan bir cümleyle tamamlanan isimdir. Bu cümleye <b class=\"r-cerr\">sıla</b> (<span class=\"ar\">صِلَةُ المَوْصُولِ</span>) denir.", ex: ["الَّذِي سَافَرَ", "مَا شَاهَدَهُ"] },
    { tr: "Türkçede çoğu zaman \"-an / -en, -dığı\" ekiyle karşılanır: <span class=\"ar\">الطَّالِبُ الَّذِي سَافَرَ</span> = yolculuk eden öğrenci; <span class=\"ar\">مَا شَاهَدَهُ</span> = gördüğü şey." },
    { tr: "<b>Has mevsuller</b> sayı ve cinsiyet gösterir: <span class=\"ar\">الَّذِي، الَّتِي، اللَّذَانِ، اللَّتَانِ، الَّذِينَ، اللَّاتِي (اللَّوَاتِي، اللَّائِي)</span>." },
    { tr: "<b>Müşterek mevsuller</b> her sayı ve cinsiyet için aynıdır: <span class=\"ar\">مَنْ</span> akıllı için, <span class=\"ar\">مَا</span> akılsız için." },
    { tr: "Dikkat: her مَنْ ve مَا mevsul değildir. <span class=\"ar\">مَا خَابَ</span>'daki مَا olumsuzluk edatıdır; soru ve şart için de kullanılırlar." }
  ],
  kaide: [
    "الاسْمُ المَوْصُولُ اسْمٌ لَا يَكُونُ مَعْنَاهُ تَامًّا إِلَّا بِجُمْلَةٍ تَتَّصِلُ بِهِ، وَهَذِهِ الجُمْلَةُ تُسَمَّى صِلَةَ المَوْصُولِ.",
    "الأَسْمَاءُ المَوْصُولَةُ: الَّذِي، الَّتِي، اللَّذَانِ، اللَّتَانِ، الَّذِينَ، اللَّاتِي / اللَّوَاتِي / اللَّائِي؛ وَمَنْ لِلْعَاقِلِ، وَمَا لِغَيْرِ العَاقِلِ."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنِ الاسْمَ المَوْصُولَ فِيمَا يَأْتِي", tr: "İsm-i mevsule dokun. Bazı cümlelerde iki mevsul var; birinde olumsuzluk bildiren مَا tuzağı var.", items: [
      W("قَدْ أَفْلَحَ المُؤْمِنُونَ [الَّذِينَ] هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ", "Müminler gerçekten kurtuluşa ermiştir; onlar ki namazlarında huşû içindedirler. (Mü’minûn 1–2)", "الَّذِينَ: akıllı cemi müzekker (المُؤْمِنُونَ)."),
      W("هُوَ [الَّذِي] خَلَقَكُمْ", "Sizi yaratan O’dur. (Teğâbün 2)", "الَّذِي; sıla: خَلَقَكُمْ."),
      W("هَذَا [مَا] وَعَدَنَا اللهُ وَرَسُولُهُ", "Bu, Allah’ın ve Resûlünün bize vaat ettiği şeydir. (Ahzâb 22)", "مَا: akılsız için müşterek mevsul."),
      W("أَعْجَزُ النَّاسِ [مَنْ] عَجَزَ عَنِ الدُّعَاءِ، وَأَبْخَلُ النَّاسِ [مَنْ] بَخِلَ بِالسَّلَامِ", "İnsanların en âcizi duadan âciz kalan, en cimrisi selâmda cimrilik edendir. (Taberânî)", "İki مَنْ: akıllı için mevsul. (Rivayette عَنِ الدُّعَاءِ geçer; kitapta فِي yazılmış.)"),
      W("مَثَلُ المُؤْمِنِ [الَّذِي] يَقْرَأُ القُرْآنَ مَثَلُ الأُتْرُجَّةِ", "Kur’an okuyan müminin misali turunç gibidir. (Buhârî)", "الَّذِي: المُؤْمِنِ'e bağlı."),
      W("{مَا} خَابَ [مَنِ] اسْتَخَارَ، {وَمَا} نَدِمَ [مَنِ] اسْتَشَارَ", "İstihare eden kaybetmez, istişare eden pişman olmaz. (Taberânî)", "İki مَنْ mevsul; مَا خَابَ ve وَمَا نَدِمَ'deki مَا ise olumsuzluk edatıdır."),
      W("الطَّالِبَاتُ [اللَّاتِي] رَأَيْتُهُنَّ مُهَذَّبَاتٌ.", "Gördüğüm kız öğrenciler terbiyelidir.", "اللَّاتِي; sıla: رَأَيْتُهُنَّ (âid: هُنَّ)."),
      W("شَكَرَ العَمِيدُ الأُسْتَاذَ [الَّذِي] يَعْمَلُ بِنَشَاطٍ.", "Dekan, gayretle çalışan hocaya teşekkür etti.", "الَّذِي → الأُسْتَاذَ.")
    ]},
    { type: "pick", fill: true, num: "٣", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ اسْمٍ مَوْصُولٍ", tr: "Boşluğa uygun ism-i mevsulü koy. Önündeki isme bak: sayısı, cinsiyeti, akıllı mı akılsız mı?", exHtml: "<span class=\"ar\">رَجَعَ الطَّالِبُ الَّذِي سَافَرَ إِلَى بَلَدِهِ.</span>", items: [
      { q: "سَافَرْتُ بِالسَّيَّارَةِ ___ فِي الشَّارِعِ.", o: ["الَّذِي", "الَّتِي", "اللَّاتِي"], a: 1, tr: "Sokaktaki arabayla yolculuk ettim.", why: "السَّيَّارَةُ müfred müennes → الَّتِي. Sıla şibh-i cümle: فِي الشَّارِعِ." },
      { q: "زُرْتُ الكُلِّيَّةَ ___ تُدَرِّسُ العُلُومَ الإِسْلَامِيَّةَ.", o: ["الَّتِي", "الَّذِي", "مَنْ"], a: 0, tr: "İslâmî ilimleri okutan fakülteyi ziyaret ettim.", why: "الكُلِّيَّةُ müennes → الَّتِي." },
      { q: "سَأَسْكُنُ فِي الفُنْدُقِ ___ فِي أَقْسَرَايَ.", o: ["الَّتِي", "مَا", "الَّذِي"], a: 2, tr: "Aksaray’daki otelde kalacağım.", why: "الفُنْدُقُ müzekker → الَّذِي." },
      { q: "قَابَلْتُ الأَطِبَّاءَ ___ يَعْمَلُونَ فِي المُسْتَشْفَى.", o: ["الَّذِينَ", "الَّتِي", "اللَّذَيْنِ"], a: 0, tr: "Hastanede çalışan doktorlarla görüştüm.", why: "الأَطِبَّاءُ akıllı cemi müzekker → الَّذِينَ." },
      { q: "دَرَسَتْ خَدِيجَةُ الكُتُبَ ___ فِي مَكْتَبَةِ السُّلَيْمَانِيَّةِ.", o: ["الَّذِينَ", "الَّتِي", "اللَّاتِي"], a: 1, tr: "Hadîce Süleymaniye Kütüphanesi’ndeki kitapları inceledi.", why: "Tuzak: الكُتُبُ akılsız çoğul → müfred müennes gibi: الَّتِي." },
      { q: "شَرِبْتُ الشَّايَ ___ عَلَى المَائِدَةِ.", o: ["الَّذِي", "مَنْ", "الَّتِي"], a: 0, tr: "Sofradaki çayı içtim.", why: "الشَّايُ müzekker → الَّذِي." },
      { q: "شَكَرْتُ البَنَاتِ ___ سَاعَدْنَ الفَقِيرَ.", o: ["الَّتِي", "الَّذِينَ", "اللَّاتِي"], a: 2, tr: "Fakire yardım eden kızlara teşekkür ettim.", why: "البَنَاتُ akıllı cemi müennes → اللَّاتِي (اللَّوَاتِي da olur)." },
      { q: "إِنَّ اللهَ يَفْعَلُ ___ يُرِيدُ.", o: ["مَنْ", "مَا", "الَّذِينَ"], a: 1, tr: "Şüphesiz Allah dilediğini yapar. (Hac 14)", why: "Önünde isim yok, akılsız şey: مَا." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · UYUM
{
  id: "u2", no: 2, ar: "مُطَابَقَةُ المَوْصُولِ وَالصِّلَةِ", tr: "Mevsul, İsim ve Fiil Uyumu", short: "Uyum", col: "cerr", legend: ["mi", "cerr"],
  goals: ["Mevsulü önündeki isme sayıda ve cinsiyette uydurmak", "Sıladaki fiili mevsule uydurmak: الَّذِينَ يَدْرُسُونَ، اللَّاتِي يَدْرُسْنَ", "Müsennâ mevsulün hale göre değiştiğini görmek: اللَّذَانِ / اللَّذَيْنِ"],
  examples: [
    { s: "رَأَيْتُ الطَّالِبَ:- / الَّذِي:mi / يَجْلِسُ فِي الصَّفِّ.:cerr", tr: "Sınıfta oturan öğrenciyi gördüm.", pair: "رَأَيْتُ الطَّالِبَةَ:- / الَّتِي:mi / تَجْلِسُ فِي الصَّفِّ.:cerr", pairTr: "Sınıfta oturan kız öğrenciyi gördüm." },
    { s: "رَأَيْتُ الطَّالِبَيْنِ:- / اللَّذَيْنِ:mi / يَجْلِسَانِ فِي الصَّفِّ.:cerr", tr: "Sınıfta oturan iki öğrenciyi gördüm.", pair: "رَأَيْتُ الطَّالِبَتَيْنِ:- / اللَّتَيْنِ:mi / تَجْلِسَانِ فِي الصَّفِّ.:cerr", pairTr: "Sınıfta oturan iki kız öğrenciyi gördüm." },
    { s: "رَأَيْتُ الطُّلَّابَ:- / الَّذِينَ:mi / يَجْلِسُونَ فِي الصَّفِّ.:cerr", tr: "Sınıfta oturan öğrencileri gördüm.", pair: "رَأَيْتُ الطَّالِبَاتِ:- / اللَّاتِي:mi / يَجْلِسْنَ فِي الصَّفِّ.:cerr", pairTr: "Sınıfta oturan kız öğrencileri gördüm." }
  ],
  rules: [
    { tr: "Mevsul, önündeki isme <b>sayıda</b> ve <b>cinsiyette</b> uyar; sıladaki fiil de mevsule uyar." },
    { tr: "Tablo: müzekker <span class=\"ar\">الَّذِي، اللَّذَانِ / اللَّذَيْنِ، الَّذِينَ</span>; müennes <span class=\"ar\">الَّتِي، اللَّتَانِ / اللَّتَيْنِ، اللَّاتِي (اللَّوَاتِي، اللَّائِي)</span>." },
    { tr: "Mevsuller mebnîdir; yalnız <b>müsennâ</b> olanlar i’rab alır: merfûda <span class=\"ar\">اللَّذَانِ / اللَّتَانِ</span>, mansûb ve mecrûrda <span class=\"ar\">اللَّذَيْنِ / اللَّتَيْنِ</span>." },
    { tr: "<b>Akılsız çoğul</b> müfred müennes gibidir: <span class=\"ar\">الكُتُبُ الَّتِي، المُؤَسَّسَاتُ الَّتِي</span> (tıpkı <span class=\"ar\">هَذِهِ الكُتُبُ</span> gibi)." },
    { tr: "Has mevsul ال'li (belirli) isimden sonra gelir. Belirsiz isimden sonra mevsul gelmez; cümle doğrudan sıfat olur: <span class=\"ar\">رَأَيْتُ طَالِبًا يَقْرَأُ</span>." }
  ],
  kaide: ["وَتَأْتِي الأَفْعَالُ بَعْدَهَا مُطَابِقَةً لَهَا فِي التَّذْكِيرِ وَالتَّأْنِيثِ، وَفِي الإِفْرَادِ وَالتَّثْنِيَةِ وَالجَمْعِ: الَّذِي يَجْلِسُ، الَّتِي تَجْلِسُ، اللَّذَيْنِ يَجْلِسَانِ، اللَّتَيْنِ تَجْلِسَانِ، الَّذِينَ يَجْلِسُونَ، اللَّاتِي يَجْلِسْنَ."],
  ex: [
    { type: "combo", num: "٤", ar: "اسْتَبْدِلِ الاسْمَ المَوْصُولَ فِيمَا يَأْتِي بِمَا بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki mevsule göre cümleyi değiştir: işaret ismi, zamir, isim ve fiil birlikte değişir.", exHtml: "<span class=\"ar\">هَذَا هُوَ الطَّالِبُ الَّذِي يَدْرُسُ فِي كُلِّيَّةِ الإِلَهِيَّاتِ.</span>", items: [
      CB("(الَّتِي)", [["هَذَا", "هَذِهِ", "هَاتَانِ"], ["هُوَ", "هُمَا", "هِيَ"], ["الطَّالِبَةُ", "الطَّالِبُ", "الطَّالِبَاتُ"], "الَّتِي", ["تَدْرُسُ", "يَدْرُسُ", "يَدْرُسْنَ"], "فِي كُلِّيَّةِ الإِلَهِيَّاتِ."], [1, 2, 0, 0], "Bu, İlahiyat Fakültesinde okuyan kız öğrencidir.", "Müfred müennes: هَذِهِ هِيَ الطَّالِبَةُ الَّتِي تَدْرُسُ."),
      CB("(اللَّذَانِ)", [["هَذَيْنِ", "هَذَانِ", "هَؤُلَاءِ"], ["هُمَا", "هُمْ", "هُوَ"], ["الطَّالِبَيْنِ", "الطُّلَّابُ", "الطَّالِبَانِ"], "اللَّذَانِ", ["يَدْرُسُونَ", "يَدْرُسَانِ", "تَدْرُسَانِ"], "فِي كُلِّيَّةِ الإِلَهِيَّاتِ."], [1, 0, 2, 1], "Bunlar, İlahiyat’ta okuyan iki öğrencidir.", "Eril müsennâ, merfû: هَذَانِ هُمَا الطَّالِبَانِ اللَّذَانِ يَدْرُسَانِ."),
      CB("(اللَّتَانِ)", [["هَاتَانِ", "هَذَانِ", "هَذِهِ"], ["هِيَ", "هُمَا", "هُنَّ"], ["الطَّالِبَتَانِ", "الطَّالِبَتَيْنِ", "الطَّالِبَاتُ"], "اللَّتَانِ", ["يَدْرُسَانِ", "تَدْرُسُ", "تَدْرُسَانِ"], "فِي كُلِّيَّةِ الإِلَهِيَّاتِ."], [0, 1, 0, 2], "Bunlar, İlahiyat’ta okuyan iki kız öğrencidir.", "Dişil müsennâ: هَاتَانِ هُمَا الطَّالِبَتَانِ اللَّتَانِ تَدْرُسَانِ."),
      CB("(الَّذِينَ)", [["هَذِهِ", "هَؤُلَاءِ", "هَذَانِ"], ["هُمْ", "هُمَا", "هُنَّ"], ["الطَّالِبَانِ", "الطُّلَّابُ", "الطَّالِبَاتُ"], "الَّذِينَ", ["يَدْرُسُونَ", "يَدْرُسْنَ", "يَدْرُسُ"], "فِي كُلِّيَّةِ الإِلَهِيَّاتِ."], [1, 0, 1, 0], "Bunlar, İlahiyat’ta okuyan öğrencilerdir.", "Eril cemi: هَؤُلَاءِ هُمُ الطُّلَّابُ الَّذِينَ يَدْرُسُونَ."),
      CB("(اللَّاتِي)", [["هَؤُلَاءِ", "هَذِهِ", "هَاتَانِ"], ["هُمْ", "هِيَ", "هُنَّ"], ["الطَّالِبَتَانِ", "الطَّالِبَاتُ", "الطُّلَّابُ"], "اللَّاتِي", ["يَدْرُسُونَ", "تَدْرُسُ", "يَدْرُسْنَ"], "فِي كُلِّيَّةِ الإِلَهِيَّاتِ."], [0, 2, 1, 2], "Bunlar, İlahiyat’ta okuyan kız öğrencilerdir.", "Dişil cemi: هَؤُلَاءِ هُنَّ الطَّالِبَاتُ اللَّاتِي يَدْرُسْنَ (akıllı olduğu için هَذِهِ değil).")
    ]},
    { type: "bank", num: "٢", ar: "اخْتَرْ مِنَ العَمُودِ (ب) التَّكْمِلَةَ المُنَاسِبَةَ لِمَا فِي العَمُودِ (أ)", tr: "Önce aşağıdan bir tamamlayıcı seç, sonra uygun cümlenin kutusuna dokun. Sıladaki fiil mevsule uymalı.",
      bank: ["يَعْمَلُونَ فِي المَصْنَعِ.", "يُخْلِصَانِ فِي عَمَلِهِمَا.", "مَا فَعَلَهُ الطَّالِبُ.", "مَنْ يَنْفَعُ النَّاسَ.", "فَحَصَ المَرِيضَ.", "يَجْلِسْنَ تَحْتَ الشَّجَرَةِ.", "فِي الحَدِيقَةِ.", "قَرَأَتِ الدَّرْسَ."], items: [
      { pre: "هَذَا هُوَ الطَّبِيبُ الَّذِي", a: [4], tr: "Bu, hastayı muayene eden doktordur." },
      { pre: "هَذِهِ هِيَ الطَّالِبَةُ الَّتِي", a: [7], tr: "Bu, dersi okuyan kız öğrencidir." },
      { pre: "سَلَّمْتُ عَلَى العُمَّالِ الَّذِينَ", a: [0], tr: "Fabrikada çalışan işçilere selâm verdim." },
      { pre: "قَدْ تَعِبَتِ الفَلَّاحَاتُ اللَّاتِي", a: [5], tr: "Ağacın altında oturan çiftçi kadınlar yoruldu." },
      { pre: "قَطَفْتُ الزَّهْرَتَيْنِ اللَّتَيْنِ", a: [6], tr: "Bahçedeki iki çiçeği kopardım.", why: "Sıla şibh-i cümle: فِي الحَدِيقَةِ." },
      { pre: "كَافَأَ المُدِيرُ المُوَظَّفَيْنِ اللَّذَيْنِ", a: [1], tr: "Müdür, işinde ihlâslı olan iki memuru ödüllendirdi." },
      { pre: "سَرَّنِي", a: [2], tr: "Öğrencinin yaptığı şey beni sevindirdi.", why: "مَا: akılsız şey (yapılan iş)." },
      { pre: "خَيْرُ النَّاسِ", a: [3], tr: "İnsanların en hayırlısı insanlara faydalı olandır.", why: "مَنْ: akıllı kişi." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · SILA CÜMLESİ
{
  id: "u3", no: 3, ar: "جُمْلَةُ الصِّلَةِ", tr: "Sıla Cümlesi", short: "Sıla", col: "nasb", legend: ["mi", "cerr", "mz"],
  goals: ["Sılanın fiil cümlesi, isim cümlesi ya da şibh-i cümle (zarf, câr-mecrûr) olabildiğini görmek", "Sıladaki âid zamirini bulmak: رَأَيْتُهُنَّ، لَوْنُهَا", "İki cümleyi ism-i mevsulle birleştirmek"],
  examples: [
    { s: "الطَّالِبَةُ:- / الَّتِي:mi / تَحْفَظُ القُرْآنَ:cerr", tr: "Kur’an’ı ezberleyen kız öğrenci (sıla: fiil cümlesi)." },
    { s: "السَّيَّارَةُ:- / الَّتِي:mi / لَوْنُهَا أَبْيَضُ:cerr", tr: "Rengi beyaz olan araba (sıla: isim cümlesi; âid: هَا)." },
    { s: "الطَّعَامُ:- / الَّذِي:mi / عَلَى المَائِدَةِ:cerr", tr: "Sofradaki yemek (sıla: şibh-i cümle)." },
    { s: "الطَّالِبَاتُ:- / اللَّاتِي:mi / رَأَيْتُ:cerr / هُنَّ:mz", tr: "Gördüğüm kız öğrenciler (âid: هُنَّ)." }
  ],
  rules: [
    { tr: "Sıla üç türlü olur: <b>fiil cümlesi</b> (<span class=\"ar\">الَّذِي سَافَرَ</span>), <b>isim cümlesi</b> (<span class=\"ar\">الَّتِي لَوْنُهَا أَبْيَضُ</span>), <b>şibh-i cümle</b> yani zarf ya da câr-mecrûr (<span class=\"ar\">الَّذِي عَلَى المَائِدَةِ</span>)." },
    { tr: "Sılada mevsule dönen bir zamir bulunur; buna <b class=\"r-mz\">âid</b> denir: <span class=\"ar\">رَأَيْتُهُنَّ، لَوْنُهَا، شَاهَدَهُ</span>. Fiilin içindeki gizli zamir de âid olabilir: <span class=\"ar\">الَّذِي سَافَرَ</span> (o)." },
    { tr: "Sılanın i’rabda yeri yoktur (<span class=\"ar\">لَا مَحَلَّ لَهَا مِنَ الإِعْرَابِ</span>); mevsul ise cümledeki yerine göre i’rab alır." },
    { tr: "İki cümleyi birleştirmek: ikinci cümlede tekrarlanan ismi at, yerine uygun mevsulü koy: <span class=\"ar\">هَذَا طَالِبٌ + الطَّالِبُ يُحِبُّ العِلْمَ ← هَذَا هُوَ الطَّالِبُ الَّذِي يُحِبُّ العِلْمَ</span>." },
    { tr: "Mevsul başta da gelebilir; o zaman mübtedâ olur: <span class=\"ar\">الَّذِي وَجَدَ سَاعَتِي حَسَنٌ</span> (saatimi bulan Hasan’dır)." }
  ],
  kaide: ["أَكْمِلِ الفَرَاغَ بِجُمْلَةِ صِلَةِ المَوْصُولِ، مِثْلُ: قَابَلْتُ الطَّالِبَةَ الَّتِي تَحْفَظُ القُرْآنَ. الَّذِي وَجَدَ سَاعَتِي حَسَنٌ.", "ارْبُطِ الجُمَلَ التَّالِيَةَ بِاسْمٍ مَوْصُولٍ مُنَاسِبٍ، مِثْلُ: هَذَا طَالِبٌ ـ الطَّالِبُ يُحِبُّ العِلْمَ ← هَذَا هُوَ الطَّالِبُ الَّذِي يُحِبُّ العِلْمَ."],
  ex: [
    { type: "pick", fill: true, num: "٦", ar: "أَكْمِلِ الفَرَاغَ بِجُمْلَةِ صِلَةِ المَوْصُولِ", tr: "Uygun sılayı seç: fiil mevsulle sayıda ve cinsiyette uyuşmalı. Kitapta serbest; burada üç seçenek var.", exHtml: "<span class=\"ar\">قَابَلْتُ الطَّالِبَةَ الَّتِي تَحْفَظُ القُرْآنَ · الَّذِي وَجَدَ سَاعَتِي حَسَنٌ</span>", items: [
      { q: "سَمِعْتُ تَغْرِيدَ البُلْبُلِ الَّذِي ___.", o: ["تُغَرِّدُ عَلَى الشَّجَرَةِ", "يُغَرِّدُ عَلَى الشَّجَرَةِ", "يُغَرِّدُونَ عَلَى الشَّجَرَةِ"], a: 1, tr: "Ağacın üstünde öten bülbülün ötüşünü duydum.", why: "الَّذِي → müfred müzekker fiil: يُغَرِّدُ." },
      { q: "نَامَ الضُّيُوفُ الَّذِينَ ___.", o: ["جَاءُوا مِنْ أَنْقَرَةَ", "جَاءَ مِنْ أَنْقَرَةَ", "جِئْنَ مِنْ أَنْقَرَةَ"], a: 0, tr: "Ankara’dan gelen misafirler uyudu.", why: "الَّذِينَ → çoğul fiil: جَاءُوا." },
      { q: "اسْتَقْبَلْتُ الصَّدِيقَ الَّذِي ___.", o: ["رَجَعُوا مِنَ الحَجِّ", "رَجَعَتْ مِنَ الحَجِّ", "رَجَعَ مِنَ الحَجِّ"], a: 2, tr: "Hacdan dönen arkadaşımı karşıladım.", why: "الَّذِي → رَجَعَ." },
      { q: "الَّذِي ___ عَلِيٌّ.", o: ["يَجْلِسُ أَمَامَكَ", "تَجْلِسُ أَمَامَكَ", "يَجْلِسَانِ أَمَامَكَ"], a: 0, tr: "Önünde oturan Ali’dir.", why: "Mevsul mübtedâ, عَلِيٌّ haber." },
      { q: "الَّتِي ___ رُقَيَّةُ.", o: ["يَكْتُبْنَ الدَّرْسَ", "تَكْتُبُ الدَّرْسَ", "يَكْتُبُ الدَّرْسَ"], a: 1, tr: "Dersi yazan Rukıyye’dir.", why: "الَّتِي → تَكْتُبُ." },
      { q: "الَّذِينَ ___ سُيَّاحٌ.", o: ["يَزُرْنَ المَسْجِدَ", "يَزُورُ المَسْجِدَ", "يَزُورُونَ المَسْجِدَ"], a: 2, tr: "Mescidi ziyaret edenler turisttir.", why: "الَّذِينَ → يَزُورُونَ." },
      { q: "اللَّاتِي ___ مُسْلِمَاتٌ.", o: ["يُصَلِّينَ فِي المَسْجِدِ", "يُصَلُّونَ فِي المَسْجِدِ", "تُصَلِّي فِي المَسْجِدِ"], a: 0, tr: "Mescitte namaz kılanlar Müslüman kadınlardır.", why: "اللَّاتِي → dişil çoğul: يُصَلِّينَ." },
      { q: "اللَّذَانِ ___ حَسَنٌ وَحُسَيْنٌ.", o: ["جَاءُوا مَعَ عَلِيٍّ", "جَاءَا مَعَ عَلِيٍّ", "جَاءَتَا مَعَ عَلِيٍّ"], a: 1, tr: "Ali ile gelen iki kişi Hasan ve Hüseyin’dir.", why: "اللَّذَانِ → eril müsennâ: جَاءَا." }
    ]},
    { type: "combo", num: "٧", ar: "ارْبُطِ الجُمَلَ التَّالِيَةَ بِاسْمٍ مَوْصُولٍ مُنَاسِبٍ", tr: "İki cümleyi tek cümle yap: tekrar eden isim düşer, yerine uygun mevsul gelir.", exHtml: "<span class=\"ar\">هَذَا طَالِبٌ · الطَّالِبُ يُحِبُّ العِلْمَ ← هَذَا هُوَ الطَّالِبُ الَّذِي يُحِبُّ العِلْمَ.</span>", items: [
      CB("هَذِهِ امْرَأَةٌ · المَرْأَةُ تُحِبُّ دِينَهَا", ["هَذِهِ هِيَ المَرْأَةُ", ["الَّذِي", "الَّتِي", "اللَّاتِي"], "تُحِبُّ دِينَهَا."], [1], "Bu, dinini seven kadındır.", "المَرْأَةُ müfred müennes → الَّتِي."),
      CB("شَكَرْتُ الطَّالِبَةَ · الطَّالِبَةُ تَحْفَظُ دُرُوسَهَا", ["شَكَرْتُ الطَّالِبَةَ", ["اللَّتَيْنِ", "مَنْ", "الَّتِي"], "تَحْفَظُ دُرُوسَهَا."], [2], "Derslerini ezberleyen kız öğrenciye teşekkür ettim.", "الَّتِي; âid: دُرُوسَهَا'daki هَا."),
      CB("سَافَرْتُ بِالطَّائِرَةِ · الطَّائِرَةُ فِي المَطَارِ", ["سَافَرْتُ بِالطَّائِرَةِ", ["الَّتِي", "الَّذِي", "مَا"], "فِي المَطَارِ."], [0], "Havaalanındaki uçakla yolculuk ettim.", "Sıla şibh-i cümle: فِي المَطَارِ."),
      CB("شَاهَدْتُ التِّلْفَازَ · التِّلْفَازُ فِي غُرْفَةِ الجُلُوسِ", ["شَاهَدْتُ التِّلْفَازَ", ["الَّتِي", "الَّذِي", "اللَّذَيْنِ"], "فِي غُرْفَةِ الجُلُوسِ."], [1], "Oturma odasındaki televizyonu seyrettim.", "التِّلْفَازُ müzekker → الَّذِي."),
      CB("أَكَلْتُ الطَّعَامَ · الطَّعَامُ عَلَى المَائِدَةِ", ["أَكَلْتُ الطَّعَامَ", ["مَنْ", "الَّتِي", "الَّذِي"], "عَلَى المَائِدَةِ."], [2], "Sofradaki yemeği yedim.", "الطَّعَامُ müzekker → الَّذِي."),
      CB("اشْتَرَيْتُ السَّيَّارَةَ · السَّيَّارَةُ لَوْنُهَا أَبْيَضُ", ["اشْتَرَيْتُ السَّيَّارَةَ", ["الَّتِي", "الَّذِي", "اللَّاتِي"], "لَوْنُهَا أَبْيَضُ."], [0], "Rengi beyaz olan arabayı satın aldım.", "Sıla isim cümlesi; âid: لَوْنُهَا'daki هَا."),
      CB("أَعْرِفُ الأُسْتَاذَ · الأُسْتَاذُ يُصَلِّي فِي المَسْجِدِ", ["أَعْرِفُ الأُسْتَاذَ", ["الَّذِينَ", "الَّذِي", "الَّتِي"], "يُصَلِّي فِي المَسْجِدِ."], [1], "Mescitte namaz kılan hocayı tanırım.", "الأُسْتَاذُ müzekker → الَّذِي."),
      CB("أَدْعُو اللهَ · اللهُ يُجِيبُ الدَّعَوَاتِ", ["أَدْعُو اللهَ", ["الَّذِي", "مَا", "الَّتِي"], "يُجِيبُ الدَّعَوَاتِ."], [0], "Duaları kabul eden Allah’a dua ederim.", "اللهُ → الَّذِي.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · MEN VE MÂ
{
  id: "u4", no: 4, ar: "المَوْصُولُ المُشْتَرَكُ: مَنْ وَمَا", tr: "Müşterek Mevsul: Men ve Mâ", short: "Men · mâ", col: "mz", legend: ["mi", "cerr"],
  goals: ["مَنْ'in akıllı, مَا'nın akılsız için kullanıldığını bilmek", "مَنْ ve مَا'nın önünde isim olmadan kendi başına geldiğini görmek", "Bir metindeki boşluklara has mevsul koymak"],
  examples: [
    { s: "رَأَيْتُ:- / مَنْ:mi / كَتَبَ هَذَا المَقَالَ.:cerr", tr: "Bu makaleyi yazanı gördüm." },
    { s: "قَرَأْتُ:- / مَا:mi / كَتَبَهُ الكَاتِبُ.:cerr", tr: "Yazarın yazdığını okudum." },
    { s: "تَفْرَحُ أُسْرَتِي بِـ:- / مَنْ:mi / يَأْتِي لِزِيَارَتِهَا.:cerr", tr: "Ailem onu ziyarete gelene sevinir." }
  ],
  rules: [
    { tr: "<span class=\"ar\">مَنْ</span>: <b>akıllı</b> için (\"… olan kişi\"): <span class=\"ar\">رَأَيْتُ مَنْ كَتَبَ هَذَا المَقَالَ</span>." },
    { tr: "<span class=\"ar\">مَا</span>: <b>akılsız</b> için (\"… olan şey\"): <span class=\"ar\">قَرَأْتُ مَا كَتَبَهُ الكَاتِبُ</span>." },
    { tr: "Bunlar tek, iki, çok, erkek, kadın için aynıdır; önlerinde isim bulunmaz. Has mevsul ise ال'li bir ismin arkasından gelir." },
    { tr: "Harf-i cer bitişirse: <span class=\"ar\">بِمَنْ، لِمَا</span>; مِنْ ve عَنْ ile: <span class=\"ar\">مِمَّنْ، مِمَّا، عَمَّنْ، عَمَّا</span>." },
    { tr: "Ayırt etme: <span class=\"ar\">مَا عِنْدَ اللهِ خَيْرٌ</span> (mevsul: Allah katında olan) ↔ <span class=\"ar\">مَا خَابَ</span> (olumsuzluk) ↔ <span class=\"ar\">مَا اسْمُكَ؟</span> (soru)." }
  ],
  kaide: ["٢ ـ مَنْ: لِلْعَاقِلِ، مِثْلُ: رَأَيْتُ مَنْ كَتَبَ هَذَا المَقَالَ. مَا: لِغَيْرِ العَاقِلِ، مِثْلُ: قَرَأْتُ مَا كَتَبَهُ الكَاتِبُ."],
  ex: [
    { type: "classify", num: "٨", opts: MM_OPTS, ar: "امْلَأِ الفَرَاغَ بِـ«مَنْ» أَوْ «مَا»", tr: "Boşluğa مَنْ mı gelir, مَا mı? Kişi mi, şey mi?", exHtml: "<span class=\"ar\">تَفْرَحُ أُسْرَتِي بِمَنْ يَأْتِي لِزِيَارَتِهَا.</span>", items: [
      { s: "…… عِنْدَ اللهِ خَيْرٌ وَأَبْقَى.", a: "m", why: "Allah katındaki şey: مَا (Şûrâ 36).", tr: "Allah katında olan daha hayırlı ve daha kalıcıdır." },
      { s: "حَضَرَ …… فَازَ بِجَائِزَةِ الكُلِّيَّةِ.", a: "n", why: "Ödülü kazanan kişi: مَنْ.", tr: "Fakülte ödülünü kazanan geldi." },
      { s: "…… تَقُولُهُ الآنَ هُوَ الحَقُّ.", a: "m", why: "Söylenen şey: مَا.", tr: "Şimdi söylediğin şey doğrudur." },
      { s: "شَكَرْتُ …… يُحْسِنُ إِلَى الفُقَرَاءِ.", a: "n", why: "İyilik eden kişi: مَنْ.", tr: "Fakirlere iyilik edene teşekkür ettim." },
      { s: "لَقَدْ نَدِمَ …… اشْتَرَى السَّيَّارَةَ القَدِيمَةَ.", a: "n", why: "Satın alan kişi: مَنِ (sakin harfle buluşunca kesre).", tr: "Eski arabayı alan pişman oldu." },
      { s: "أَمْسَكَتِ الشُّرْطَةُ بِـ…… سَرَقَ أَمْوَالَ النَّاسِ.", a: "n", why: "Çalan kişi: بِمَنْ.", tr: "Polis, insanların malını çalanı yakaladı." },
      { s: "سَأُحْضِرُ لَكَ …… تُرِيدُهُ إِنْ شَاءَ اللهُ.", a: "m", why: "İstenen şey: مَا (âid: تُرِيدُهُ'daki هُ).", tr: "İnşallah sana istediğini getireceğim." },
      { s: "تَعَرَّفْتُ عَلَى …… أَلَّفَ هَذِهِ الكُتُبَ الجَدِيدَةَ.", a: "n", why: "Kitapları yazan kişi: مَنْ.", tr: "Bu yeni kitapları yazanla tanıştım." }
    ]},
    { type: "bank", reuse: true, num: "٥", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الاسْمِ المَوْصُولِ المُنَاسِبِ فِي القِطْعَةِ", tr: "Metindeki boşluklara uygun mevsulü koy. Bir mevsul birden çok kez kullanılabilir.",
      bank: ["الَّذِي", "الَّتِي", "اللَّذَانِ", "الَّذِينَ", "اللَّاتِي"],
      tr2: "Öğrenciler, geçen ay Sultan Ahmed Camii’nde düzenlenen Kur’an okuma yarışmasını seyrettiler. Yarışma, çeşitli Kur’an kursu okullarından katılan yarışmacılar arasında yapıldı. Birinciliği kazanan hâfız İstanbullu yarışmacıydı; yarışmayı seyreden insanlar onu övdü.",
      parts: ["شَاهَدَ الطُّلَّابُ مُسَابَقَةَ تِلَاوَةِ القُرْآنِ", { a: [1] }, "أُقِيمَتْ فِي مَسْجِدِ السُّلْطَانِ أَحْمَدَ فِي الشَّهْرِ المَاضِي بَيْنَ المُتَسَابِقِينَ", { a: [3] }, "اشْتَرَكُوا مِنْ مُخْتَلِفِ مَدَارِسِ تَحْفِيظِ القُرْآنِ. وَكَانَ المُتَسَابِقُ الإِسْطَنْبُولِيُّ هُوَ الحَافِظَ", { a: [0] }, "فَازَ بِالمَرْتَبَةِ الأُولَى، وَقَدْ أَثْنَى عَلَيْهِ النَّاسُ", { a: [3] }, "شَاهَدُوا المُسَابَقَةَ."] }
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: دَوْرُ البَيْتِ فِي تَرْبِيَةِ الطِّفْلِ", tr: "Okuma: Çocuk Eğitiminde Evin Rolü", short: "Okuma", col: "muz", legend: ["mi", "cerr"],
  goals: ["Bir metindeki ism-i mevsulleri ve sılalarını bulmak", "Akılsız çoğula الَّتِي ile bağlanıldığını metinde görmek: الحَقَائِقِ الَّتِي", "Sılanın nerede bittiğini söylemek"],
  examples: [
    { s: "المُؤَسَّسَاتُ:- / الَّتِي:mi / تُسْهِمُ فِي تَرْبِيَةِ الطِّفْلِ:cerr", tr: "Çocuğun eğitimine katkıda bulunan kurumlar." },
    { s: "الأَطْفَالُ:- / الَّذِينَ:mi / يَقْرَؤُونَ قِرَاءَاتٍ حُرَّةً:cerr", tr: "Serbest okumalar yapan çocuklar." }
  ],
  rules: [
    { tr: "Metinde mevsulü bulunca hemen arkasındaki cümle sılanın başıdır; sıla, cümlenin asıl yüklemine kadar sürer: <span class=\"ar\">الطِّفْلَ الَّذِي يَنْشَأُ بَعِيدًا عَنِ القِرَاءَةِ فِي صِغَرِهِ | يَظَلُّ بَعِيدًا عَنْهَا</span>." },
    { tr: "<span class=\"ar\">المُؤَسَّسَاتِ الَّتِي، الحَقَائِقِ الَّتِي</span>: akılsız çoğul → الَّتِي." },
    { tr: "<span class=\"ar\">مِنْهَا، مِنْهُ، أَثْبَتَهَا</span> sıladaki âid zamirleridir; mevsule geri döner." }
  ],
  kaide: ["اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ عَيِّنِ الأَسْمَاءَ المَوْصُولَةَ وَجُمَلَ الصِّلَةِ."],
  ex: [
    { type: "reading", num: "٩", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ عَيِّنِ الأَسْمَاءَ المَوْصُولَةَ", tr: "Metni oku; sonra koyu mevsulün hangi isme bağlandığını seç.", title: "دَوْرُ البَيْتِ فِي تَرْبِيَةِ الطِّفْلِ",
      text: "يَأْتِي البَيْتُ فِي مُقَدِّمَةِ المُؤَسَّسَاتِ الاجْتِمَاعِيَّةِ الَّتِي تُسْهِمُ فِي تَرْبِيَةِ الطِّفْلِ؛ إِنَّهُ النَّافِذَةُ الَّتِي يُطِلُّ مِنْهَا الطِّفْلُ عَلَى العَالَمِ، وَالمَنْهَلُ الَّذِي يَتَشَرَّبُ مِنْهُ القِيَمَ، وَالنَّمُوذَجُ الَّذِي يَتَعَلَّمُ مِنْهُ أَنْمَاطَ السُّلُوكِ. وَمِنَ الحَقَائِقِ الَّتِي أَثْبَتَهَا البَحْثُ العِلْمِيُّ وَأَيَّدَتْهَا المُلَاحَظَةُ أَنَّ الطِّفْلَ الَّذِي يَنْشَأُ بَعِيدًا عَنِ القِرَاءَةِ فِي صِغَرِهِ يَظَلُّ بَعِيدًا عَنْهَا، كَارِهًا لَهَا فِي بَاقِي حَيَاتِهِ. إِنَّ لِلْقِرَاءَةِ دَوْرًا مُهِمًّا فِي حَيَاةِ الأَطْفَالِ، وَلَقَدْ ثَبَتَ فِي كَثِيرٍ مِنَ الأَبْحَاثِ وَالدِّرَاسَاتِ أَنَّ الأَطْفَالَ الَّذِينَ يَقْرَؤُونَ قِرَاءَاتٍ حُرَّةً خَاصَّةً بِهِمْ يَأْتُونَ فِي مُقَدِّمَةِ التَّلَامِيذِ تَحْصِيلًا وَذَكَاءً.",
      textTr: "Çocuk Eğitiminde Evin Rolü. Ev, çocuğun eğitimine katkıda bulunan sosyal kurumların başında gelir. O, çocuğun dünyaya baktığı pencere, değerleri içtiği kaynak ve davranış kalıplarını öğrendiği örnektir. Bilimsel araştırmanın ispatladığı ve gözlemin desteklediği gerçeklerden biri şudur: Küçükken okumadan uzak büyüyen çocuk, hayatının geri kalanında da okumaya uzak kalır ve ondan hoşlanmaz. Okumanın çocukların hayatında önemli bir rolü vardır. Pek çok araştırmada, kendilerine ait serbest okumalar yapan çocukların başarı ve zekâ bakımından öğrencilerin önünde geldiği ortaya çıkmıştır.",
      qa: [
        { q: "مَا المُؤَسَّسَةُ الَّتِي تَأْتِي فِي مُقَدِّمَةِ المُؤَسَّسَاتِ الاجْتِمَاعِيَّةِ؟", a: "البَيْتُ.", tr: "Sosyal kurumların başında gelen kurum hangisidir? Ev." },
        { q: "مَاذَا يَحْدُثُ لِلطِّفْلِ الَّذِي يَنْشَأُ بَعِيدًا عَنِ القِرَاءَةِ؟", a: "يَظَلُّ بَعِيدًا عَنْهَا، كَارِهًا لَهَا فِي بَاقِي حَيَاتِهِ.", tr: "Okumadan uzak büyüyen çocuğa ne olur? Hayatının geri kalanında da ondan uzak kalır." },
        { q: "أَيْنَ يَأْتِي الأَطْفَالُ الَّذِينَ يَقْرَؤُونَ قِرَاءَاتٍ حُرَّةً؟", a: "يَأْتُونَ فِي مُقَدِّمَةِ التَّلَامِيذِ تَحْصِيلًا وَذَكَاءً.", tr: "Serbest okuma yapan çocuklar nerede yer alır? Başarı ve zekâda öğrencilerin önünde." }
      ],
      cls: { opts: [["ms", "Müfred müzekker", "مُفْرَدٌ مُذَكَّرٌ", "cerr"], ["fs", "Müfred müennes", "مُفْرَدٌ مُؤَنَّثٌ", "mun"], ["pm", "Akıllı cemi müzekker", "جَمْعُ مُذَكَّرٍ", "ref"], ["ga", "Akılsız çoğul", "جَمْعُ غَيْرِ العَاقِلِ", "nasb"]], ar: "إِلَى أَيِّ اسْمٍ يَعُودُ المَوْصُولُ؟", tr: "Koyu mevsulün bağlandığı isim nasıl bir isim?", items: [
        { s: HL("المُؤَسَّسَاتِ الاجْتِمَاعِيَّةِ الَّتِي تُسْهِمُ", "الَّتِي"), a: "ga", why: "المُؤَسَّسَاتِ: akılsız çoğul → الَّتِي." },
        { s: HL("إِنَّهُ النَّافِذَةُ الَّتِي يُطِلُّ مِنْهَا الطِّفْلُ", "الَّتِي"), a: "fs", why: "النَّافِذَةُ: müfred müennes." },
        { s: HL("وَالمَنْهَلُ الَّذِي يَتَشَرَّبُ مِنْهُ القِيَمَ", "الَّذِي"), a: "ms", why: "المَنْهَلُ: müfred müzekker." },
        { s: HL("وَالنَّمُوذَجُ الَّذِي يَتَعَلَّمُ مِنْهُ", "الَّذِي"), a: "ms", why: "النَّمُوذَجُ: müfred müzekker." },
        { s: HL("وَمِنَ الحَقَائِقِ الَّتِي أَثْبَتَهَا البَحْثُ", "الَّتِي"), a: "ga", why: "الحَقَائِقِ: akılsız çoğul → الَّتِي." },
        { s: HL("أَنَّ الطِّفْلَ الَّذِي يَنْشَأُ بَعِيدًا", "الَّذِي"), a: "ms", why: "الطِّفْلَ: müfred müzekker." },
        { s: HL("أَنَّ الأَطْفَالَ الَّذِينَ يَقْرَؤُونَ", "الَّذِينَ"), a: "pm", why: "الأَطْفَالَ: akıllı cemi → الَّذِينَ." }
      ]}
    },
    { type: "tag", roles: ["mi", "cerr", "x"], ar: "عَيِّنِ الأَسْمَاءَ المَوْصُولَةَ وَجُمَلَ الصِّلَةِ", tr: "Metinden parçalar: kelime gruplarına dokunarak İsm-i mevsul, Sıla ya da Başka diye etiketle.", items: [
      T("يَأْتِي البَيْتُ فِي مُقَدِّمَةِ:- / المُؤَسَّسَاتِ الاجْتِمَاعِيَّةِ:x / الَّتِي:mi / تُسْهِمُ فِي تَرْبِيَةِ الطِّفْلِ:cerr", "Ev, çocuğun eğitimine katkıda bulunan kurumların başında gelir.", "Mevsul الَّتِي; sıla: تُسْهِمُ فِي تَرْبِيَةِ الطِّفْلِ."),
      T("إِنَّهُ:- / النَّافِذَةُ:x / الَّتِي:mi / يُطِلُّ مِنْهَا الطِّفْلُ عَلَى العَالَمِ:cerr", "O, çocuğun dünyaya baktığı penceredir.", "Âid: مِنْهَا."),
      T("وَ:- / المَنْهَلُ:x / الَّذِي:mi / يَتَشَرَّبُ مِنْهُ القِيَمَ:cerr", "Değerleri içtiği kaynak.", "Âid: مِنْهُ."),
      T("وَ:- / النَّمُوذَجُ:x / الَّذِي:mi / يَتَعَلَّمُ مِنْهُ أَنْمَاطَ السُّلُوكِ:cerr", "Davranış kalıplarını öğrendiği örnek.", "Âid: مِنْهُ."),
      T("وَمِنَ:- / الحَقَائِقِ:x / الَّتِي:mi / أَثْبَتَهَا البَحْثُ العِلْمِيُّ وَأَيَّدَتْهَا المُلَاحَظَةُ:cerr", "Araştırmanın ispatladığı ve gözlemin desteklediği gerçekler.", "Sılada iki fiil var; âid: هَا (iki kez)."),
      T("أَنَّ:- / الطِّفْلَ:x / الَّذِي:mi / يَنْشَأُ بَعِيدًا عَنِ القِرَاءَةِ فِي صِغَرِهِ:cerr / يَظَلُّ بَعِيدًا عَنْهَا:x", "Küçükken okumadan uzak büyüyen çocuk ondan uzak kalır.", "Sıla يَظَلُّ'dan önce biter; يَظَلُّ… asıl haberdir."),
      T("أَنَّ:- / الأَطْفَالَ:x / الَّذِينَ:mi / يَقْرَؤُونَ قِرَاءَاتٍ حُرَّةً خَاصَّةً بِهِمْ:cerr / يَأْتُونَ فِي مُقَدِّمَةِ التَّلَامِيذِ:x", "Kendilerine ait serbest okumalar yapan çocuklar öndedir.", "Sıla يَأْتُونَ'dan önce biter.")
    ]}
  ]
}
];

// Doğru Mevsul oyunu: [cümle {mevsul}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var MV_POOL = [
  ["رَجَعَ الطَّالِبُ {الَّذِي} سَافَرَ.", ["الَّذِي", "الَّتِي", "الَّذِينَ"], "müfred müzekker", "Yolculuk eden öğrenci döndü.", "u1"],
  ["عَادَتِ الطَّالِبَةُ {الَّتِي} سَافَرَتْ.", ["الَّتِي", "الَّذِي", "اللَّاتِي"], "müfred müennes", "Yolculuk eden kız öğrenci döndü.", "u1"],
  ["هُوَ {الَّذِي} خَلَقَكُمْ.", ["الَّذِي", "مَا", "الَّتِي"], "Teğâbün 2", "Sizi yaratan O’dur.", "u1"],
  ["هَذَا {مَا} وَعَدَنَا اللهُ وَرَسُولُهُ.", ["مَا", "مَنْ", "الَّذِينَ"], "akılsız: مَا (Ahzâb 22)", "Bu, Allah’ın bize vaat ettiğidir.", "u1"],
  ["سَافَرْتُ بِالسَّيَّارَةِ {الَّتِي} فِي الشَّارِعِ.", ["الَّتِي", "الَّذِي", "مَنْ"], "müfred müennes", "Sokaktaki arabayla yolculuk ettim.", "u1"],
  ["دَرَسَتْ خَدِيجَةُ الكُتُبَ {الَّتِي} فِي المَكْتَبَةِ.", ["الَّتِي", "الَّذِينَ", "اللَّاتِي"], "akılsız çoğul → الَّتِي", "Hadîce kütüphanedeki kitapları inceledi.", "u1"],
  ["شَكَرْتُ الطَّالِبَيْنِ {اللَّذَيْنِ} عَمِلَا الوَاجِبَ.", ["اللَّذَيْنِ", "اللَّذَانِ", "الَّذِينَ"], "mansûb müsennâ: yâ ile", "Ödevi yapan iki öğrenciye teşekkür ettim.", "u2"],
  ["رَأَيْتُ الطَّالِبَتَيْنِ {اللَّتَيْنِ} تَذْهَبَانِ إِلَى المَكْتَبَةِ.", ["اللَّتَيْنِ", "اللَّتَانِ", "اللَّذَيْنِ"], "dişil müsennâ, mansûb", "Kütüphaneye giden iki kız öğrenciyi gördüm.", "u2"],
  ["قَابَلْتُ المُدَرِّسِينَ {الَّذِينَ} يَعْمَلُونَ فِي الثَّانَوِيَّةِ.", ["الَّذِينَ", "الَّذِي", "اللَّاتِي"], "akıllı cemi müzekker", "Lisede çalışan öğretmenlerle görüştüm.", "u2"],
  ["أُقَدِّرُ الطَّالِبَاتِ {اللَّاتِي} يَقْرَأْنَ دُرُوسَهُنَّ.", ["اللَّاتِي", "الَّتِي", "الَّذِينَ"], "akıllı cemi müennes", "Derslerini okuyan kızları takdir ederim.", "u2"],
  ["هَذَانِ هُمَا الطَّالِبَانِ {اللَّذَانِ} يَدْرُسَانِ.", ["اللَّذَانِ", "اللَّذَيْنِ", "اللَّتَانِ"], "merfû müsennâ: elif ile", "Bunlar okuyan iki öğrencidir.", "u2"],
  ["قَطَفْتُ الزَّهْرَتَيْنِ {اللَّتَيْنِ} فِي الحَدِيقَةِ.", ["اللَّتَيْنِ", "اللَّذَيْنِ", "الَّتِي"], "dişil müsennâ, mansûb", "Bahçedeki iki çiçeği kopardım.", "u2"],
  ["سَلَّمْتُ عَلَى العُمَّالِ {الَّذِينَ} يَعْمَلُونَ فِي المَصْنَعِ.", ["الَّذِينَ", "الَّتِي", "اللَّذَيْنِ"], "akıllı cemi", "Fabrikada çalışan işçilere selâm verdim.", "u2"],
  ["قَابَلْتُ الطَّالِبَةَ {الَّتِي} تَحْفَظُ القُرْآنَ.", ["الَّتِي", "الَّذِي", "مَنْ"], "müfred müennes", "Kur’an’ı ezberleyen kız öğrenciyle görüştüm.", "u3"],
  ["{الَّذِي} وَجَدَ سَاعَتِي حَسَنٌ.", ["الَّذِي", "الَّذِينَ", "الَّتِي"], "mübtedâ olarak mevsul", "Saatimi bulan Hasan’dır.", "u3"],
  ["اشْتَرَيْتُ السَّيَّارَةَ {الَّتِي} لَوْنُهَا أَبْيَضُ.", ["الَّتِي", "الَّذِي", "اللَّاتِي"], "âid: لَوْنُهَا", "Rengi beyaz arabayı aldım.", "u3"],
  ["أَدْعُو اللهَ {الَّذِي} يُجِيبُ الدَّعَوَاتِ.", ["الَّذِي", "مَا", "الَّتِي"], "اللهُ → الَّذِي", "Duaları kabul eden Allah’a dua ederim.", "u3"],
  ["{اللَّاتِي} يُصَلِّينَ فِي المَسْجِدِ مُسْلِمَاتٌ.", ["اللَّاتِي", "الَّذِينَ", "الَّتِي"], "dişil çoğul fiil", "Mescitte namaz kılanlar Müslüman kadınlardır.", "u3"],
  ["رَأَيْتُ {مَنْ} كَتَبَ هَذَا المَقَالَ.", ["مَنْ", "مَا", "الَّتِي"], "akıllı: مَنْ", "Bu makaleyi yazanı gördüm.", "u4"],
  ["قَرَأْتُ {مَا} كَتَبَهُ الكَاتِبُ.", ["مَا", "مَنْ", "الَّذِينَ"], "akılsız: مَا", "Yazarın yazdığını okudum.", "u4"],
  ["{مَا} عِنْدَ اللهِ خَيْرٌ وَأَبْقَى.", ["مَا", "مَنْ", "الَّذِي"], "Şûrâ 36", "Allah katındaki daha hayırlıdır.", "u4"],
  ["خَيْرُ النَّاسِ {مَنْ} يَنْفَعُ النَّاسَ.", ["مَنْ", "مَا", "الَّتِي"], "akıllı", "İnsanların hayırlısı insanlara faydalı olandır.", "u4"],
  ["إِنَّ اللهَ يَفْعَلُ {مَا} يُرِيدُ.", ["مَا", "مَنْ", "الَّذِينَ"], "Hac 14", "Allah dilediğini yapar.", "u4"],
  ["أَثْنَى عَلَيْهِ النَّاسُ {الَّذِينَ} شَاهَدُوا المُسَابَقَةَ.", ["الَّذِينَ", "الَّتِي", "مَا"], "akıllı cemi", "Yarışmayı seyredenler onu övdü.", "u4"],
  ["المُؤَسَّسَاتُ {الَّتِي} تُسْهِمُ فِي تَرْبِيَةِ الطِّفْلِ.", ["الَّتِي", "الَّذِينَ", "اللَّاتِي"], "akılsız çoğul", "Çocuğun eğitimine katkıda bulunan kurumlar.", "u5"],
  ["المَنْهَلُ {الَّذِي} يَتَشَرَّبُ مِنْهُ القِيَمَ.", ["الَّذِي", "الَّتِي", "مَا"], "müfred müzekker", "Değerleri içtiği kaynak.", "u5"],
  ["الحَقَائِقُ {الَّتِي} أَثْبَتَهَا البَحْثُ.", ["الَّتِي", "اللَّاتِي", "الَّذِينَ"], "akılsız çoğul", "Araştırmanın ispatladığı gerçekler.", "u5"],
  ["الأَطْفَالُ {الَّذِينَ} يَقْرَؤُونَ قِرَاءَاتٍ حُرَّةً.", ["الَّذِينَ", "الَّتِي", "اللَّذَانِ"], "akıllı cemi", "Serbest okuma yapan çocuklar.", "u5"]
];
// Cümle Birleştir: [1. cümle, 2. cümle, birleşik cümle {M}, doğru mevsul]
var JOIN = [
  ["هَذَا طَالِبٌ.", "الطَّالِبُ يُحِبُّ العِلْمَ.", "هَذَا هُوَ الطَّالِبُ {M} يُحِبُّ العِلْمَ.", "الَّذِي"],
  ["هَذِهِ امْرَأَةٌ.", "المَرْأَةُ تُحِبُّ دِينَهَا.", "هَذِهِ هِيَ المَرْأَةُ {M} تُحِبُّ دِينَهَا.", "الَّتِي"],
  ["أَكَلْتُ الطَّعَامَ.", "الطَّعَامُ عَلَى المَائِدَةِ.", "أَكَلْتُ الطَّعَامَ {M} عَلَى المَائِدَةِ.", "الَّذِي"],
  ["اشْتَرَيْتُ السَّيَّارَةَ.", "السَّيَّارَةُ لَوْنُهَا أَبْيَضُ.", "اشْتَرَيْتُ السَّيَّارَةَ {M} لَوْنُهَا أَبْيَضُ.", "الَّتِي"],
  ["شَكَرْتُ الطَّالِبَيْنِ.", "الطَّالِبَانِ عَمِلَا الوَاجِبَ.", "شَكَرْتُ الطَّالِبَيْنِ {M} عَمِلَا الوَاجِبَ.", "اللَّذَيْنِ"],
  ["رَأَيْتُ الطَّالِبَتَيْنِ.", "الطَّالِبَتَانِ تَذْهَبَانِ إِلَى المَكْتَبَةِ.", "رَأَيْتُ الطَّالِبَتَيْنِ {M} تَذْهَبَانِ إِلَى المَكْتَبَةِ.", "اللَّتَيْنِ"],
  ["قَابَلْتُ المُدَرِّسِينَ.", "المُدَرِّسُونَ يَعْمَلُونَ فِي الثَّانَوِيَّةِ.", "قَابَلْتُ المُدَرِّسِينَ {M} يَعْمَلُونَ فِي الثَّانَوِيَّةِ.", "الَّذِينَ"],
  ["أُقَدِّرُ الطَّالِبَاتِ.", "الطَّالِبَاتُ يَقْرَأْنَ دُرُوسَهُنَّ.", "أُقَدِّرُ الطَّالِبَاتِ {M} يَقْرَأْنَ دُرُوسَهُنَّ.", "اللَّاتِي"],
  ["قَرَأْتُ الكُتُبَ.", "الكُتُبُ فِي المَكْتَبَةِ.", "قَرَأْتُ الكُتُبَ {M} فِي المَكْتَبَةِ.", "الَّتِي"],
  ["حَضَرَ الطَّالِبَانِ.", "الطَّالِبَانِ نَجَحَا.", "حَضَرَ الطَّالِبَانِ {M} نَجَحَا.", "اللَّذَانِ"],
  ["أَعْرِفُ الأُسْتَاذَ.", "الأُسْتَاذُ يُصَلِّي فِي المَسْجِدِ.", "أَعْرِفُ الأُسْتَاذَ {M} يُصَلِّي فِي المَسْجِدِ.", "الَّذِي"],
  ["سَافَرْتُ بِالطَّائِرَةِ.", "الطَّائِرَةُ فِي المَطَارِ.", "سَافَرْتُ بِالطَّائِرَةِ {M} فِي المَطَارِ.", "الَّتِي"]
];
// Men mi mâ mı? oyunu: [cümle (……), doğru]
var MM_LIST = [
  ["رَأَيْتُ …… كَتَبَ هَذَا المَقَالَ.", "n"], ["قَرَأْتُ …… كَتَبَهُ الكَاتِبُ.", "m"], ["…… عِنْدَ اللهِ خَيْرٌ وَأَبْقَى.", "m"], ["حَضَرَ …… فَازَ بِالجَائِزَةِ.", "n"],
  ["…… تَقُولُهُ هُوَ الحَقُّ.", "m"], ["شَكَرْتُ …… يُحْسِنُ إِلَى الفُقَرَاءِ.", "n"], ["نَدِمَ …… اشْتَرَى السَّيَّارَةَ القَدِيمَةَ.", "n"], ["سَأُحْضِرُ لَكَ …… تُرِيدُهُ.", "m"],
  ["تَعَرَّفْتُ عَلَى …… أَلَّفَ الكُتُبَ.", "n"], ["خَيْرُ النَّاسِ …… يَنْفَعُ النَّاسَ.", "n"], ["سَرَّنِي …… فَعَلَهُ الطَّالِبُ.", "m"], ["إِنَّ اللهَ يَفْعَلُ …… يُرِيدُ.", "m"],
  ["هَذَا …… وَعَدَنَا اللهُ.", "m"], ["أَعْجَزُ النَّاسِ …… عَجَزَ عَنِ الدُّعَاءِ.", "n"], ["مَا خَابَ …… اسْتَخَارَ.", "n"], ["حَكَى الرَّجُلُ …… شَاهَدَهُ.", "m"],
  ["حَضَرَ …… قَرَأَ القُرْآنَ.", "n"], ["أَكَلْتُ …… طَبَخَتْهُ أُمِّي.", "m"]
];
var HAFIZA = {
  tb: { name: "İsim ↔ mevsul", pairs: [["الطَّالِبُ", "الَّذِي"], ["الطَّالِبَةُ", "الَّتِي"], ["الطَّالِبَانِ", "اللَّذَانِ"], ["الطَّالِبَتَيْنِ", "اللَّتَيْنِ"], ["الطُّلَّابُ", "الَّذِينَ"], ["الطَّالِبَاتُ", "اللَّاتِي"], ["الكُتُبُ", "الَّتِي"], ["Kişi (akıllı)", "مَنْ"], ["Şey (akılsız)", "مَا"]] },
  is: { name: "İşaret ↔ mevsul", pairs: [["هَذَا", "الَّذِي"], ["هَذِهِ", "الَّتِي"], ["هَذَانِ", "اللَّذَانِ"], ["هَذَيْنِ", "اللَّذَيْنِ"], ["هَاتَانِ", "اللَّتَانِ"], ["هَاتَيْنِ", "اللَّتَيْنِ"], ["هَؤُلَاءِ (erkek)", "الَّذِينَ"], ["هَؤُلَاءِ (kadın)", "اللَّاتِي"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["الَّذِي سَافَرَ", "yolculuk eden"], ["مَا شَاهَدَهُ", "gördüğü şey"], ["مَنْ قَرَأَ", "okuyan kişi"], ["الَّتِي لَوْنُهَا أَبْيَضُ", "rengi beyaz olan"], ["الَّذِينَ يَعْمَلُونَ", "çalışanlar"], ["اللَّاتِي يَقْرَأْنَ", "okuyan kadınlar"], ["الَّذِي عَلَى المَائِدَةِ", "sofradaki"], ["مَا عِنْدَ اللهِ", "Allah katındaki"]] }
};
var KARTLAR = [
  ["İsm-i mevsul nedir?", "Anlamı ancak ona bağlanan bir cümleyle (sıla) tamamlanan isim."],
  ["Sıla nedir?", "Mevsulden sonra gelip onun anlamını tamamlayan cümle: الَّذِي سَافَرَ"],
  ["Has mevsuller?", "الَّذِي، الَّتِي، اللَّذَانِ، اللَّتَانِ، الَّذِينَ، اللَّاتِي (اللَّوَاتِي، اللَّائِي)"],
  ["Müşterek mevsuller?", "مَنْ (akıllı), مَا (akılsız); her sayı ve cinsiyet için aynı."],
  ["Hangi mevsul i’rab alır?", "Müsennâ olanlar: اللَّذَانِ / اللَّذَيْنِ، اللَّتَانِ / اللَّتَيْنِ"],
  ["Akılsız çoğula hangi mevsul?", "الَّتِي: الكُتُبُ الَّتِي، المُؤَسَّسَاتُ الَّتِي"],
  ["Âid nedir?", "Sılada mevsule dönen zamir: رَأَيْتُهُنَّ، لَوْنُهَا، شَاهَدَهُ"],
  ["Sıla kaç türlü olur?", "Fiil cümlesi, isim cümlesi, şibh-i cümle (الَّذِي عَلَى المَائِدَةِ)."],
  ["Sılanın i’rabda yeri?", "Yoktur: لَا مَحَلَّ لَهَا مِنَ الإِعْرَابِ"],
  ["طَالِبًا'dan sonra mevsul gelir mi?", "Hayır. Belirsiz isimden sonra cümle doğrudan sıfat olur: رَأَيْتُ طَالِبًا يَقْرَأُ"],
  ["مَا خَابَ مَنِ اسْتَخَارَ: hangisi mevsul?", "مَنْ mevsul; مَا olumsuzluk edatı."],
  ["İki cümleyi nasıl birleştiririm?", "Tekrar eden ismi at, yerine uygun mevsulü koy."]
];
