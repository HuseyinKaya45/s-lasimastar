// ================= VERİ: İsm-i İşaret (أَسْمَاءُ الإِشَارَةِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "mi.mübtedâ" gibi yazılırsa etikete not eklenir.
var ROLES = {
  mi: { ar: "اسْمُ إِشَارَةٍ", tr: "İsm-i işaret" }, cerr: { ar: "المُشَارُ إِلَيْهِ", tr: "Müşârun ileyh" },
  mz: { ar: "خَبَرٌ", tr: "Haber" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cer", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var HAL_TR = { ref: "Merfû", nasb: "Mansûb", cer: "Mecrûr" };
var TUR_OPTS = HAL_OPTS;
var GOREV = [["mb", "Mübtedâ", "مُبْتَدَأٌ"], ["hb", "Haber", "خَبَرٌ"], ["bd", "Bedel", "بَدَلٌ"], ["fa", "Fâil", "فَاعِلٌ"], ["mf", "Mef’ûl bih", "مَفْعُولٌ بِهِ"], ["mi", "Muzâfun ileyh", "مُضَافٌ إِلَيْهِ"], ["mc", "Harf-i cerden sonra", "مَجْرُورٌ بِالحَرْفِ"], ["sf", "Sıfat", "نَعْتٌ"]];
var GOREV_TR = {}; GOREV.forEach(function (g) { GOREV_TR[g[0]] = g[1]; });

// İşaret isimleri: kategori → [yakın, uzak]; müsennâda [merfû, mansûb/mecrûr]
var CAT = {
  ms: { tr: "Müfred müzekker", q: ["هَذَا"], b: ["ذَلِكَ"] },
  fs: { tr: "Müfred müennes", q: ["هَذِهِ"], b: ["تِلْكَ"] },
  md: { tr: "Müsennâ müzekker", q: ["هَذَانِ", "هَذَيْنِ"], b: ["ذَانِكَ", "ذَيْنِكَ"] },
  fd: { tr: "Müsennâ müennes", q: ["هَاتَانِ", "هَاتَيْنِ"], b: ["تَانِكَ", "تَيْنِكَ"] },
  pl: { tr: "Cemi (akıllı)", q: ["هَؤُلَاءِ"], b: ["أُولَئِكَ"] },
  ga: { tr: "Akılsız çoğul", q: ["هَذِهِ"], b: ["تِلْكَ"] }
};
var CKEYS = ["ms", "fs", "md", "fd", "pl", "ga"];
// işaret ismi: kategori, uzaklık (q/b), hal (0 merfû, 1 mansûb, 2 mecrûr)
function isr(cat, d, h) { var a = CAT[cat][d]; return a.length > 1 && h > 0 ? a[1] : a[0]; }
// İsimler: [merfû, mansûb, mecrûr], kategori, Türkçe
var NOUNS = [
  [["الكِتَابُ", "الكِتَابَ", "الكِتَابِ"], "ms", "kitap"], [["الطَّالِبُ", "الطَّالِبَ", "الطَّالِبِ"], "ms", "öğrenci"],
  [["المَجَلَّةُ", "المَجَلَّةَ", "المَجَلَّةِ"], "fs", "dergi"], [["الطَّالِبَةُ", "الطَّالِبَةَ", "الطَّالِبَةِ"], "fs", "kız öğrenci"],
  [["الكِتَابَانِ", "الكِتَابَيْنِ", "الكِتَابَيْنِ"], "md", "iki kitap"], [["الطَّالِبَتَانِ", "الطَّالِبَتَيْنِ", "الطَّالِبَتَيْنِ"], "fd", "iki kız öğrenci"],
  [["المُسْلِمُونَ", "المُسْلِمِينَ", "المُسْلِمِينَ"], "pl", "Müslümanlar"], [["المُسْلِمَاتُ", "المُسْلِمَاتِ", "المُسْلِمَاتِ"], "pl", "Müslüman kadınlar"],
  [["المَبَانِي", "المَبَانِيَ", "المَبَانِي"], "ga", "binalar"], [["الكُتُبُ", "الكُتُبَ", "الكُتُبِ"], "ga", "kitaplar"]
];
// Hız oyunları için isimler (merfû): [isim, kategori, Türkçe]
var NOUN_LIST = [
  ["الكِتَابُ", "ms", "kitap"], ["الطَّالِبُ", "ms", "öğrenci"], ["القَلَمُ", "ms", "kalem"], ["المَسْجِدُ", "ms", "mescit"], ["الرَّجُلُ", "ms", "adam"], ["الأَسَدُ", "ms", "aslan"],
  ["المَجَلَّةُ", "fs", "dergi"], ["الحَقِيبَةُ", "fs", "çanta"], ["المَدِينَةُ", "fs", "şehir"], ["الطَّالِبَةُ", "fs", "kız öğrenci"], ["الغَابَةُ", "fs", "orman"], ["السَّيَّارَةُ", "fs", "araba"],
  ["الكِتَابَانِ", "md", "iki kitap"], ["القَلَمَانِ", "md", "iki kalem"], ["الطِّفْلَانِ", "md", "iki çocuk"], ["الثَّوْرَانِ", "md", "iki öküz"], ["المُهَنْدِسَانِ", "md", "iki mühendis"],
  ["النَّظَّارَتَانِ", "fd", "iki gözlük"], ["التِّلْمِيذَتَانِ", "fd", "iki kız öğrenci"], ["السَّيَّارَتَانِ", "fd", "iki araba"], ["المُعَلِّمَتَانِ", "fd", "iki kadın öğretmen"],
  ["المُسْلِمُونَ", "pl", "Müslümanlar"], ["المُسْلِمَاتُ", "pl", "Müslüman kadınlar"], ["البَنَاتُ", "pl", "kızlar"], ["الزُّمَلَاءُ", "pl", "arkadaşlar"], ["الطَّبَّاخُونَ", "pl", "aşçılar"], ["المُهَنْدِسَاتُ", "pl", "kadın mühendisler"],
  ["المَبَانِي", "ga", "binalar"], ["المَيَادِينُ", "ga", "meydanlar"], ["الكُتُبُ", "ga", "kitaplar"], ["الصُّحُفُ", "ga", "gazeteler"], ["النَّتَائِجُ", "ga", "sonuçlar"], ["المَعَاجِمُ", "ga", "sözlükler"], ["الأَيَّامُ", "ga", "günler"]
];
var SP_Q = [["ms", "Müfred müz.", "هَذَا", "cerr"], ["fs", "Müfred müen.", "هَذِهِ", "mun"], ["md", "Müsennâ müz.", "هَذَانِ", "mz"], ["fd", "Müsennâ müen.", "هَاتَانِ", "nasb"], ["pl", "Cemi", "هَؤُلَاءِ", "ref"]];
var SP_B = [["ms", "Müfred müz.", "ذَلِكَ", "cerr"], ["fs", "Müfred müen.", "تِلْكَ", "mun"], ["md", "Müsennâ müz.", "ذَانِكَ", "mz"], ["fd", "Müsennâ müen.", "تَانِكَ", "nasb"], ["pl", "Cemi", "أُولَئِكَ", "ref"]];

function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function IR(s, w, t, c, why, tr) { return { s: s.replace(w, "[" + w + "]"), t: t, c: c, why: why, tr: tr }; }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
var Q_ALL = ["هَذَا", "هَذِهِ", "هَذَانِ", "هَذَيْنِ", "هَاتَانِ", "هَاتَيْنِ", "هَؤُلَاءِ"];
var B_ALL = ["ذَلِكَ", "تِلْكَ", "ذَانِكَ", "ذَيْنِكَ", "تَانِكَ", "تَيْنِكَ", "أُولَئِكَ"];

var UNITS = [
// ---------------------------------------------------------------- 1 · İSM-İ İŞARET
{
  id: "u1", no: 1, ar: "أَسْمَاءُ الإِشَارَةِ لِلْقَرِيبِ وَالبَعِيدِ", tr: "İsm-i İşaret: Yakın ve Uzak", short: "Yakın · uzak", col: "mi", legend: ["mi", "cerr"],
  goals: ["İsm-i işaretin belli bir şeyi ya da kişiyi gösterdiğini bilmek", "Yakın için on dört, uzak için ayrı işaret isimlerini tabloda yerleştirmek", "Cümlede işaret ismini ve işaret edilen şeyi (müşârun ileyh) bulmak"],
  examples: [
    { s: "هَذَا:mi / كِتَابٌ:cerr", tr: "Bu bir kitap.", pair: "ذَلِكَ:mi / كِتَابٌ:cerr", pairTr: "Şu bir kitap." },
    { s: "هَذِهِ:mi / مَجَلَّةٌ:cerr", tr: "Bu bir dergi.", pair: "تِلْكَ:mi / مَجَلَّةٌ:cerr", pairTr: "Şu bir dergi." },
    { s: "هَذَانِ:mi / كِتَابَانِ:cerr", tr: "Bunlar iki kitap.", pair: "ذَانِكَ:mi / قَلَمَانِ:cerr", pairTr: "Şunlar iki kalem." },
    { s: "هَاتَانِ:mi / نَظَّارَتَانِ:cerr", tr: "Bunlar iki gözlük.", pair: "تَانِكَ:mi / تِلْمِيذَتَانِ:cerr", pairTr: "Şunlar iki kız öğrenci." },
    { s: "هَؤُلَاءِ:mi / المُسْلِمُونَ:cerr / يُصَلُّونَ:-", tr: "Bu Müslümanlar namaz kılıyor.", pair: "أُولَئِكَ:mi / المُسْلِمَاتُ:cerr / يُصَلِّينَ:-", pairTr: "Şu Müslüman kadınlar namaz kılıyor." }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">İsm-i işaret</b> (<span class=\"ar\">اسْمُ الإِشَارَةِ</span>), belli bir şeyi ya da kişiyi göstererek belirten mebnî bir isimdir. Gösterilen şeye <b class=\"r-cerr\">müşârun ileyh</b> (<span class=\"ar\">المُشَارُ إِلَيْهِ</span>) denir." },
    { tr: "Yakın için: <span class=\"ar\">هَذَا</span> (müfred müzekker), <span class=\"ar\">هَذِهِ</span> (müfred müennes), <span class=\"ar\">هَذَانِ / هَذَيْنِ</span> (müsennâ müzekker), <span class=\"ar\">هَاتَانِ / هَاتَيْنِ</span> (müsennâ müennes), <span class=\"ar\">هَؤُلَاءِ</span> (cemi, ikisi için)." },
    { tr: "Uzak için: <span class=\"ar\">ذَلِكَ</span>, <span class=\"ar\">تِلْكَ</span>, <span class=\"ar\">ذَانِكَ / ذَيْنِكَ</span>, <span class=\"ar\">تَانِكَ / تَيْنِكَ</span>, <span class=\"ar\">أُولَئِكَ</span>." },
    { tr: "Yakını uzağa çevirmenin ipucu: <span class=\"ar\">هَا</span> düşer, sona <span class=\"ar\">ـكَ</span> gelir: <span class=\"ar\">هَذَانِ ← ذَانِكَ</span>, <span class=\"ar\">هَاتَانِ ← تَانِكَ</span>. (<span class=\"ar\">هَذَا ← ذَلِكَ</span>'te araya ل girer; <span class=\"ar\">هَذِهِ ← تِلْكَ</span> ve <span class=\"ar\">هَؤُلَاءِ ← أُولَئِكَ</span> ezberlenir.)" },
    { tr: "Yazımda dikkat: <span class=\"ar\">هَذَا، هَذِهِ، ذَلِكَ، هَؤُلَاءِ، أُولَئِكَ</span> kelimelerinde okunan bir elif yazılmaz; <span class=\"ar\">أُولَئِكَ</span>'teki و okunmaz." }
  ],
  kaide: [
    "١ ـ اسْمُ الإِشَارَةِ اسْمٌ مَبْنِيٌّ يَدُلُّ عَلَى شَيْءٍ أَوْ شَخْصٍ مُعَيَّنٍ بِالإِشَارَةِ إِلَيْهِ، مِثْلُ: هَذَا كِتَابٌ، هَاتَانِ التِّلْمِيذَتَانِ، هَؤُلَاءِ المُسْلِمُونَ يُصَلُّونَ، أُولَئِكَ المُسْلِمَاتُ يُصَلِّينَ.",
    "٢ ـ أَسْمَاءُ الإِشَارَةِ فِي اللُّغَةِ العَرَبِيَّةِ كَثِيرَةٌ، وَتَكُونُ لِلْقَرِيبِ وَالبَعِيدِ: أ ـ لِلْقَرِيبِ: هَذَا، هَذَانِ ـ هَذَيْنِ، هَذِهِ، هَاتَانِ ـ هَاتَيْنِ، هَؤُلَاءِ. ب ـ لِلْبَعِيدِ: ذَلِكَ، ذَانِكَ ـ ذَيْنِكَ، تِلْكَ، تَانِكَ ـ تَيْنِكَ، أُولَئِكَ."
  ],
  ex: [
    { type: "tag", num: "١", roles: ["mi", "cerr", "x"], ar: "عَيِّنْ أَسْمَاءَ الإِشَارَةِ وَالمُشَارَ إِلَيْهِ فِي الجُمَلِ التَّالِيَةِ", tr: "Kelimelere dokunarak etiketle: İsm-i işaret, Müşârun ileyh ya da Başka. Sonra kontrol et.", items: [
      T("هَذَا:mi / الطَّالِبُ:cerr / قَدَّمَ لِصَدِيقِهِ:- / قَهْوَةً:x / تُرْكِيَّةً.:-", "Bu öğrenci arkadaşına Türk kahvesi ikram etti.", "هَذَا (müfred müzekker, yakın) → الطَّالِبُ."),
      T("شَاهَدَتْ:- / زَيْنَبُ:x / هَذِهِ:mi / الحَمَامَةَ:cerr / مِنَ النَّافِذَةِ.:-", "Zeynep bu güvercini pencereden seyretti.", "هَذِهِ → الحَمَامَةَ."),
      T("رَفَضَ:- / الأَبُ:x / ذَلِكَ:mi / الطَّلَبَ:cerr / بِأَدَبٍ.:-", "Baba o isteği nezaketle reddetti.", "ذَلِكَ (uzak) → الطَّلَبَ."),
      T("لَعِبَ:- / الوَلَدُ:x / بِهَاتَيْنِ:mi / الكُرَتَيْنِ.:cerr", "Çocuk bu iki topla oynadı.", "بِـ + هَاتَيْنِ: harf-i cerden sonra müsennâ müennes, ي ile."),
      T("هَذَانِ:mi / هُمَا:- / الكَأْسَانِ:cerr / اللَّذَانِ يَشْرَبُ:- / الطِّفْلُ:x / بِهِمَا الحَلِيبَ.:-", "Bunlar, çocuğun süt içtiği iki bardaktır.", "هَذَانِ → الكَأْسَانِ (burada haber olarak gelmiş)."),
      T("تَلْعَبُ:- / أُولَئِكَ:mi / البَنَاتُ:cerr / كُرَةَ السَّلَّةِ فِي:- / تِلْكَ:mi / الصَّالَةِ.:cerr", "Şu kızlar şu salonda basketbol oynuyor.", "İki işaret: أُولَئِكَ → البَنَاتُ, تِلْكَ → الصَّالَةِ."),
      T("يَدْرُسُ:- / هَؤُلَاءِ:mi / الزُّمَلَاءُ:cerr / الجَامِعَةَ:x / فِي:- / هَذِهِ:mi / المَدِينَةِ.:cerr", "Bu arkadaşlar bu şehirde üniversite okuyor.", "هَؤُلَاءِ → الزُّمَلَاءُ, هَذِهِ → المَدِينَةِ."),
      T("يَا:- / أَحْمَدُ:x / اشْرَبْ:- / هَذَا:mi / المَاءَ:cerr / العَذْبَ.:-", "Ey Ahmed, bu tatlı suyu iç.", "هَذَا → المَاءَ; العَذْبَ sıfattır.")
    ]},
    { type: "pick", fill: true, num: "٣", ar: "اسْتَبْدِلْ بِالضَّمِيرِ اسْمَ الإِشَارَةِ المُنَاسِبَ", tr: "Zamirin yerine yakın için uygun işaret ismini koy. Sayıya ve cinsiyete bak.", exHtml: "<span class=\"ar\">هُوَ شَاعِرٌ آذَرْبَيْجَانِيٌّ ← هَذَا شَاعِرٌ آذَرْبَيْجَانِيٌّ</span>", items: [
      { q: "هُنَّ تَاجِرَاتٌ مِنْ تُرْكِيَا ← ___ تَاجِرَاتٌ مِنْ تُرْكِيَا.", o: ["هَذِهِ", "هَؤُلَاءِ", "هَاتَانِ"], a: 1, tr: "Bunlar Türkiye’den tüccar kadınlar.", why: "هُنَّ: akıllı dişil çoğul → هَؤُلَاءِ." },
      { q: "هُمْ أَعْضَاءٌ فِي الجَمْعِيَّةِ الخَيْرِيَّةِ ← ___ أَعْضَاءٌ فِي الجَمْعِيَّةِ الخَيْرِيَّةِ.", o: ["هَؤُلَاءِ", "هَذَا", "هَذَانِ"], a: 0, tr: "Bunlar hayır derneğinin üyeleri.", why: "هُمْ: akıllı çoğul → هَؤُلَاءِ." },
      { q: "هُمَا مَسْئُولَانِ فِي إِدَارَةِ الشَّرِكَةِ ← ___ مَسْئُولَانِ فِي إِدَارَةِ الشَّرِكَةِ.", o: ["هَاتَانِ", "هَذَيْنِ", "هَذَانِ"], a: 2, tr: "Bu ikisi şirket yönetiminde sorumlu.", why: "مَسْئُولَانِ müzekker müsennâ, merfû (mübtedâ) → هَذَانِ." },
      { q: "هِيَ مَنْسُوبَةٌ إِلَى حَضَارَةٍ أَصِيلَةٍ ← ___ مَنْسُوبَةٌ إِلَى حَضَارَةٍ أَصِيلَةٍ.", o: ["هَذَا", "هَذِهِ", "تِلْكَ"], a: 1, tr: "Bu, köklü bir medeniyete aittir.", why: "هِيَ: müfred müennes, yakın → هَذِهِ." },
      { q: "هُمَا يَحْمِلَانِ شَهَادَةً جَامِعِيَّةً ← ___ يَحْمِلَانِ شَهَادَةً جَامِعِيَّةً.", o: ["هَذَانِ", "هَاتَانِ", "هَؤُلَاءِ"], a: 0, tr: "Bu ikisi üniversite diploması taşıyor.", why: "يَحْمِلَانِ (يَـ ile): müzekker müsennâ → هَذَانِ." },
      { q: "هُنَّ يُتَرْجِمْنَ لِوَزِيرِ الصِّحَّةِ ← ___ يُتَرْجِمْنَ لِوَزِيرِ الصِّحَّةِ.", o: ["هَذِهِ", "هَاتَانِ", "هَؤُلَاءِ"], a: 2, tr: "Bunlar sağlık bakanına tercümanlık yapıyor.", why: "Akıllı dişil çoğul → هَؤُلَاءِ." },
      { q: "هُمْ مُتَفَائِلُونَ فِي الأَمْرِ ← ___ مُتَفَائِلُونَ فِي الأَمْرِ.", o: ["هَذَانِ", "هَؤُلَاءِ", "أُولَئِكَ"], a: 1, tr: "Bunlar bu işte iyimser.", why: "Yakın, akıllı çoğul → هَؤُلَاءِ. (أُولَئِكَ uzak içindir.)" },
      { q: "هُمَا يَتَوَضَّآنِ لِكُلِّ صَلَاةٍ ← ___ يَتَوَضَّآنِ لِكُلِّ صَلَاةٍ.", o: ["هَاتَانِ", "هَذَانِ", "هَذَيْنِ"], a: 1, tr: "Bu ikisi her namaz için abdest alıyor.", why: "يَتَوَضَّآنِ (يَـ ile): müzekker → هَذَانِ." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · UYGUN İŞARET
{
  id: "u2", no: 2, ar: "اخْتِيَارُ اسْمِ الإِشَارَةِ المُنَاسِبِ", tr: "Uygun İşaret İsmi: Sayı, Cinsiyet, Akılsız Çoğul", short: "Uygun işaret", col: "cerr", legend: ["mi", "cerr"],
  goals: ["İşaret ismini müşârun ileyhe sayıda ve cinsiyette uydurmak", "Akılsız çoğula هَذِهِ / تِلْكَ ile işaret etmek: هَذِهِ المَبَانِي", "Aynı cümleye hem yakın hem uzak işareti koyabilmek"],
  examples: [
    { s: "هَذِهِ:mi / المَبَانِي:cerr / عَالِيَةٌ:-", tr: "Bu binalar yüksek.", pair: "تِلْكَ:mi / المَيَادِينُ:cerr / فَسِيحَةٌ:-", pairTr: "Şu meydanlar geniş." },
    { s: "هَؤُلَاءِ:mi / المُسْلِمُونَ:cerr", tr: "Bu Müslümanlar (akıllı çoğul).", pair: "هَذِهِ:mi / الكُتُبُ:cerr", pairTr: "Bu kitaplar (akılsız çoğul)." },
    { s: "قَرَأَ:- / هَذَا:mi / الطَّالِبُ:cerr / القِصَّةَ.:-", tr: "Bu öğrenci hikâyeyi okudu.", pair: "قَرَأَ:- / ذَلِكَ:mi / الطَّالِبُ:cerr / القِصَّةَ.:-", pairTr: "Şu öğrenci hikâyeyi okudu." }
  ],
  rules: [
    { tr: "İşaret ismi, işaret ettiği şeye <b>sayıda</b> (tekil, ikil, çoğul) ve <b>cinsiyette</b> (müzekker, müennes) uyar." },
    { tr: "<b>Akılsız çoğula</b> (eşya, hayvan, kavram) müfred müennes işaretle işaret edilir: <span class=\"ar\">هَذِهِ المَبَانِي عَالِيَةٌ، تِلْكَ المَيَادِينُ فَسِيحَةٌ</span>.", ex: ["هَذِهِ الكُتُبُ", "تِلْكَ الأَيَّامُ", "هَذِهِ النَّتَائِجُ"] },
    { tr: "<span class=\"ar\">هَؤُلَاءِ / أُولَئِكَ</span> akıllı çoğul içindir; erkek de kadın da olabilir: <span class=\"ar\">هَؤُلَاءِ المُسْلِمُونَ، هَؤُلَاءِ المُسْلِمَاتُ</span>." },
    { tr: "Müsennâ işaret, müşârun ileyhin haline uyar: merfûda <span class=\"ar\">هَذَانِ / هَاتَانِ</span>, mansûb ve mecrûrda <span class=\"ar\">هَذَيْنِ / هَاتَيْنِ</span>: <span class=\"ar\">يُشَاهِدُ هَذَيْنِ البَرْنَامَجَيْنِ</span>." },
    { tr: "Not: Klasik Arapçada akılsız çoğula <span class=\"ar\">أُولَئِكَ</span> ile işaret de görülür: <span class=\"ar\">إِنَّ السَّمْعَ وَالبَصَرَ وَالفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا</span> (İsrâ 36). Ders kuralı ise هَذِهِ / تِلْكَ'dir." }
  ],
  kaide: ["٤ ـ يُشَارُ إِلَى الجَمْعِ غَيْرِ العَاقِلِ بِاسْمِ الإِشَارَةِ لِلْمُفْرَدَةِ المُؤَنَّثَةِ «هَذِهِ» أَوْ «تِلْكَ»، مِثْلُ: هَذِهِ المَبَانِي عَالِيَةٌ، تِلْكَ المَيَادِينُ فَسِيحَةٌ."],
  ex: [
    { type: "combo", num: "٥", ar: "امْلَأِ الفَرَاغَ بِاسْمِ إِشَارَةٍ مُنَاسِبٍ لِلْقَرِيبِ وَالبَعِيدِ فِي نَفْسِ الوَقْتِ", tr: "İki kutu var: sağdaki yakın, soldaki uzak için. İkisini de müşârun ileyhe uydur.", exHtml: "<span class=\"ar\">قَرَأَ هَذَا / ذَلِكَ الطَّالِبُ القِصَّةَ · أَنْشَأَتْ هَذِهِ / تِلْكَ المُهَنْدِسَةُ بِنَاءً</span>", items: [
      CB("", ["شَاهَدَتْ", ["هَذَانِ", "هَاتَانِ", "هَاتَيْنِ"], "/", ["تَانِكَ", "تَيْنِكَ", "ذَانِكَ"], "المُعَلِّمَتَانِ الزَّرَافَةَ."], [1, 0], "Bu / şu iki kadın öğretmen zürafayı seyretti.", "المُعَلِّمَتَانِ: müennes müsennâ, fâil (merfû) → هَاتَانِ / تَانِكَ."),
      CB("", ["شَرِبَ", ["هَذَيْنِ", "هَذَانِ", "هَاتَانِ"], "/", ["ذَانِكَ", "ذَيْنِكَ", "أُولَئِكَ"], "الطِّفْلَانِ عَصِيرَ الأَنَانَاسِ."], [1, 0], "Bu / şu iki çocuk ananas suyu içti.", "الطِّفْلَانِ: müzekker müsennâ, fâil → هَذَانِ / ذَانِكَ."),
      CB("", ["أَحْضَرَتْ عَائِشَةُ", ["هَاتَيْنِ", "هَاتَانِ", "هَذَيْنِ"], "/", ["تَانِكَ", "ذَيْنِكَ", "تَيْنِكَ"], "السَّيَّارَتَيْنِ."], [0, 2], "Âişe bu / şu iki arabayı getirdi.", "السَّيَّارَتَيْنِ: müennes müsennâ, mef’ûl (mansûb) → هَاتَيْنِ / تَيْنِكَ."),
      CB("", ["زَارَ يَحْيَى", ["هَذَانِ", "هَاتَيْنِ", "هَذَيْنِ"], "/", ["ذَيْنِكَ", "ذَانِكَ", "تَيْنِكَ"], "القَصْرَيْنِ."], [2, 0], "Yahyâ bu / şu iki sarayı ziyaret etti.", "القَصْرَيْنِ: müzekker müsennâ, mansûb → هَذَيْنِ / ذَيْنِكَ."),
      CB("", ["يُتَابِعُ", ["هَذِهِ", "هَؤُلَاءِ", "هَذَا"], "/", ["أُولَئِكَ", "تِلْكَ", "ذَلِكَ"], "النَّاسُ كُلَّ البَرَامِجِ."], [1, 0], "Bu / şu insanlar bütün programları takip ediyor.", "النَّاسُ: akıllı çoğul → هَؤُلَاءِ / أُولَئِكَ."),
      CB("", ["مَا رَأَيْتُ أَمْهَرَ مِنْ", ["هَذَيْنِ", "هَؤُلَاءِ", "هَذِهِ"], "/", ["تِلْكَ", "ذَيْنِكَ", "أُولَئِكَ"], "الطَّبَّاخِينَ فِي حَيَاتِي."], [1, 2], "Hayatımda bu / şu aşçılardan daha mahirini görmedim.", "الطَّبَّاخِينَ: akıllı cemi (ين ile; mecrûr) → هَؤُلَاءِ / أُولَئِكَ. Mebnî oldukları için harekeleri değişmez."),
      CB("", [["هَؤُلَاءِ", "هَذِهِ", "هَاتَانِ"], "/", ["تِلْكَ", "أُولَئِكَ", "تَانِكَ"], "البَنَاتُ يَحْفَظْنَ القُرْآنَ."], [0, 1], "Bu / şu kızlar Kur’an’ı ezberliyor.", "البَنَاتُ: akıllı çoğul → هَؤُلَاءِ / أُولَئِكَ (هَذِهِ akılsız çoğul içindir)."),
      CB("", ["أَكَلَ الأَسَدُ", ["هَذَانِ", "هَذَيْنِ", "هَؤُلَاءِ"], "/", ["ذَيْنِكَ", "ذَانِكَ", "أُولَئِكَ"], "الخَرُوفَيْنِ."], [1, 0], "Aslan bu / şu iki koyunu yedi.", "الخَرُوفَيْنِ: müzekker müsennâ, mansûb → هَذَيْنِ / ذَيْنِكَ.")
    ]},
    { type: "combo", num: "٢", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِمَفْعُولٍ بِهِ ثُمَّ أَدْخِلْ عَلَيْهِ اسْمَ الإِشَارَةِ المُنَاسِبَ بِنَوْعَيْهِ", tr: "Parantezdeki kelimeyle cevap ver; önüne yakın ve uzak işareti koy. Kelime mef’ûl bih olduğu için mansûbdur.", exHtml: "<span class=\"ar\">مَاذَا يَقْرَأُ مُحَمَّدٌ؟ (القُرْآن) ← يَقْرَأُ مُحَمَّدٌ هَذَا / ذَلِكَ القُرْآنَ.</span>", items: [
      CB("مَاذَا يَطْبُخُ الطَّبَّاخُ؟ <span class=\"muted\">(العَدَس)</span>", ["يَطْبُخُ الطَّبَّاخُ", ["هَذَا", "هَذِهِ", "هَؤُلَاءِ"], "/", ["تِلْكَ", "ذَلِكَ", "أُولَئِكَ"], "العَدَسَ."], [0, 1], "Aşçı bu / şu mercimeği pişiriyor.", "العَدَسُ: müfred müzekker."),
      CB("مَاذَا يَشْرَبُ المُعَلِّمُ؟ <span class=\"muted\">(القَهْوَة)</span>", ["يَشْرَبُ المُعَلِّمُ", ["هَذَا", "هَذِهِ", "هَاتَيْنِ"], "/", ["تِلْكَ", "ذَلِكَ", "تَيْنِكَ"], "القَهْوَةَ."], [1, 0], "Öğretmen bu / şu kahveyi içiyor.", "القَهْوَةُ: müfred müennes."),
      CB("مَاذَا يُشَاهِدُ الأَوْلَادُ؟ <span class=\"muted\">(البَرْنَامَجَانِ)</span>", ["يُشَاهِدُ الأَوْلَادُ", ["هَذَانِ", "هَذَيْنِ", "هَاتَيْنِ"], "/", ["ذَانِكَ", "تَيْنِكَ", "ذَيْنِكَ"], ["البَرْنَامَجَانِ.", "البَرْنَامَجَيْنِ."]], [1, 2, 1], "Çocuklar bu / şu iki programı seyrediyor.", "Mef’ûl olduğu için müsennâ ي ile: هَذَيْنِ / ذَيْنِكَ البَرْنَامَجَيْنِ."),
      CB("مَاذَا يَلْعَبُ الرِّيَاضِيُّ؟ <span class=\"muted\">(اللُّعْبَة الجَدِيدَة)</span>", ["يَلْعَبُ الرِّيَاضِيُّ", ["هَذَا", "هَذِهِ", "هَؤُلَاءِ"], "/", ["ذَلِكَ", "أُولَئِكَ", "تِلْكَ"], "اللُّعْبَةَ الجَدِيدَةَ."], [1, 2], "Sporcu bu / şu yeni oyunu oynuyor.", "اللُّعْبَةُ: müfred müennes."),
      CB("مَاذَا تَقْرَأُ زَيْنَبُ؟ <span class=\"muted\">(الصُّحُف التُّرْكِيَّة)</span>", ["تَقْرَأُ زَيْنَبُ", ["هَؤُلَاءِ", "هَذِهِ", "هَذَا"], "/", ["أُولَئِكَ", "ذَلِكَ", "تِلْكَ"], "الصُّحُفَ التُّرْكِيَّةَ."], [1, 2], "Zeynep bu / şu Türk gazetelerini okuyor.", "Tuzak: الصُّحُفُ akılsız çoğul → هَذِهِ / تِلْكَ."),
      CB("مَاذَا أَحْضَرَتِ الأُمُّ؟ <span class=\"muted\">(الطَّعَامَانِ)</span>", ["أَحْضَرَتِ الأُمُّ", ["هَذَيْنِ", "هَذَانِ", "هَاتَيْنِ"], "/", ["ذَانِكَ", "ذَيْنِكَ", "تَيْنِكَ"], ["الطَّعَامَانِ.", "الطَّعَامَيْنِ."]], [0, 1, 1], "Anne bu / şu iki yemeği getirdi.", "Mansûb müsennâ: هَذَيْنِ / ذَيْنِكَ الطَّعَامَيْنِ."),
      CB("مَاذَا أَعْلَنَتِ الجَامِعَةُ؟ <span class=\"muted\">(النَّتَائِج)</span>", ["أَعْلَنَتِ الجَامِعَةُ", ["هَذِهِ", "هَؤُلَاءِ", "هَاتَانِ"], "/", ["أُولَئِكَ", "تِلْكَ", "تَانِكَ"], "النَّتَائِجَ."], [0, 1], "Üniversite bu / şu sonuçları ilan etti.", "Tuzak: النَّتَائِجُ akılsız çoğul → هَذِهِ / تِلْكَ."),
      CB("مَاذَا سَأَلَتْ عَائِشَةُ؟ <span class=\"muted\">(السُّؤَال)</span>", ["سَأَلَتْ عَائِشَةُ", ["هَذِهِ", "هَذَا", "هَذَانِ"], "/", ["ذَلِكَ", "تِلْكَ", "ذَانِكَ"], "السُّؤَالَ."], [1, 0], "Âişe bu / şu soruyu sordu.", "السُّؤَالُ: müfred müzekker.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · İ'RAB
{
  id: "u3", no: 3, ar: "إِعْرَابُ اسْمِ الإِشَارَةِ", tr: "İsm-i İşaretin İ’rabı", short: "İ’rab", col: "nasb", legend: ["mi", "cerr", "mz"],
  goals: ["İşaret isimlerinin mebnî olduğunu, cümledeki yerine göre mahallen i’rab aldığını bilmek", "Müsennâ işaretin müsennâ gibi i’rab aldığını görmek: هَذَانِ / هَذَيْنِ", "İşaret isminden sonra gelen ال'li ismin bedel olduğunu söylemek"],
  examples: [
    { s: "هَذَا:mi.mübtedâ / الطَّالِبُ:cerr.bedel / مُجْتَهِدٌ:mz", tr: "Bu öğrenci çalışkandır." },
    { s: "هَذَانِ:mi.merfû / العَصِيرَانِ:cerr / لَذِيذَانِ:mz", tr: "Bu iki meyve suyu lezzetli.", pair: "شَرِبْتُ:- / هَذَيْنِ:mi.mansûb / العَصِيرَيْنِ:cerr", pairTr: "Bu iki meyve suyunu içtim." },
    { s: "أَمْسَكْتُ:- / بِـ:- / هَذَيْنِ:mi.mecrûr / العَصِيرَيْنِ:cerr", tr: "Bu iki meyve suyunu tuttum." }
  ],
  rules: [
    { tr: "İşaret isimleri <b>mebnîdir</b>: harekeleri değişmez. Cümledeki yerine göre <b>mahallen</b> merfû, mansûb ya da mecrûr sayılır: <span class=\"ar\">هَذَا: اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ</span>." },
    { tr: "İstisna: <b>müsennâ işaretler</b> müsennâ gibi i’rab alır: merfûda elif (<span class=\"ar\">هَذَانِ، هَاتَانِ، ذَانِكَ، تَانِكَ</span>), mansûb ve mecrûrda yâ (<span class=\"ar\">هَذَيْنِ، هَاتَيْنِ، ذَيْنِكَ، تَيْنِكَ</span>)." },
    { tr: "İşaret isminden sonra ال'li bir isim gelirse o isim işaret isminin <b>bedeli</b> olur ve onun halini alır: <span class=\"ar\">هَذَا الطَّالِبُ مُجْتَهِدٌ</span> → هَذَا: mübtedâ, الطَّالِبُ: bedel, مُجْتَهِدٌ: haber." },
    { tr: "ال'siz isim gelirse haber olur: <span class=\"ar\">هَذَا طَالِبٌ</span> (bu bir öğrencidir) ↔ <span class=\"ar\">هَذَا الطَّالِبُ…</span> (bu öğrenci…)." },
    { tr: "İ’rab örneği: <span class=\"ar\">قَرَأْتُ هَاتَيْنِ القِصَّتَيْنِ</span> → هَاتَيْنِ: mef’ûl bih, yâ ile mansûb (müsennâ); القِصَّتَيْنِ: bedel, yâ ile mansûb." }
  ],
  kaide: [
    "٣ ـ أَسْمَاءُ الإِشَارَةِ أَسْمَاءٌ مَبْنِيَّةٌ تُعْرَبُ عَلَى أَنَّهَا مَبْنِيَّةٌ فِي مَحَلِّ رَفْعٍ أَوْ نَصْبٍ أَوْ جَرٍّ بِحَسَبِ مَوْقِعِهَا فِي الجُمْلَةِ. يُسْتَثْنَى مِنْ ذَلِكَ أَسْمَاءُ الإِشَارَةِ لِلْمُثَنَّى، فَإِنَّهَا تُعْرَبُ إِعْرَابَ المُثَنَّى: تُرْفَعُ بِالأَلِفِ، وَتُنْصَبُ وَتُجَرُّ بِاليَاءِ، مِثْلُ: هَذَانِ العَصِيرَانِ لَذِيذَانِ، شَرِبْتُ هَذَيْنِ العَصِيرَيْنِ، أَمْسَكْتُ بِهَذَيْنِ العَصِيرَيْنِ.",
    "إِذَا وَقَعَ بَعْدَ اسْمِ الإِشَارَةِ اسْمٌ اقْتَرَنَ بِـ«ال» أُعْرِبَ الاسْمُ المُقْتَرِنُ بِـ«ال» عَلَى أَنَّهُ بَدَلٌ لِاسْمِ الإِشَارَةِ، مِثْلُ: هَذَا الطَّالِبُ مُجْتَهِدٌ. هَذَا: اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ. الطَّالِبُ: بَدَلٌ لِاسْمِ الإِشَارَةِ مَرْفُوعٌ بِالضَّمَّةِ. مُجْتَهِدٌ: خَبَرُ المُبْتَدَإِ مَرْفُوعٌ بِالضَّمَّةِ."
  ],
  ex: [
    { type: "combo", num: "٤", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِمَفْعُولٍ بِهِ مَعَ اسْمِ الإِشَارَةِ لِلْقَرِيبِ المُنَاسِبِ", tr: "Evde olmayanı satın alacağız: yakın işaret + mef’ûl bih. Mef’ûl mansûb olduğu için müsennâ ي alır.", exHtml: "<span class=\"ar\">لَيْسَتْ فِي بَيْتِنَا سَاعَةٌ ← سَنَشْتَرِي هَذِهِ السَّاعَةَ.</span>", items: [
      CB("لَيْسَ فِي سَيَّارَتِنَا عَجَلَةٌ احْتِيَاطِيَّةٌ.", ["سَنَشْتَرِي", ["هَذَا", "هَذِهِ", "هَاتَيْنِ"], "العَجَلَةَ الاحْتِيَاطِيَّةَ."], [1], "Bu yedek tekerleği alacağız.", "Müfred müennes: هَذِهِ."),
      CB("لَيْسَ فِي مَكْتَبِنَا تَقْوِيمَانِ.", ["سَنَشْتَرِي", ["هَذَانِ", "هَذَيْنِ", "هَاتَيْنِ"], ["التَّقْوِيمَانِ.", "التَّقْوِيمَيْنِ."]], [1, 1], "Bu iki takvimi alacağız.", "Mef’ûl, müzekker müsennâ: هَذَيْنِ التَّقْوِيمَيْنِ."),
      CB("لَيْسَ فِي غُرْفَتِنَا مَعَاجِمُ.", ["سَنَشْتَرِي", ["هَؤُلَاءِ", "هَذِهِ", "هَذَا"], "المَعَاجِمَ."], [1], "Bu sözlükleri alacağız.", "Akılsız çoğul: هَذِهِ."),
      CB("لَيْسَ فِي مَكْتَبَتِنَا قَامُوسَانِ.", ["سَنَشْتَرِي", ["هَذَيْنِ", "هَذَانِ", "هَاتَيْنِ"], ["القَامُوسَيْنِ.", "القَامُوسَانِ."]], [0, 0], "Bu iki sözlüğü alacağız.", "هَذَيْنِ القَامُوسَيْنِ (mansûb)."),
      CB("لَيْسَ فِي عِيَادَتِنَا مِرْآةٌ.", ["سَنَشْتَرِي", ["هَذَا", "هَاتَيْنِ", "هَذِهِ"], "المِرْآةَ."], [2], "Bu aynayı alacağız.", "Müfred müennes: هَذِهِ."),
      CB("لَيْسَ فِي حَقِيبَتِنَا كُتُبٌ.", ["سَنَشْتَرِي", ["هَذِهِ", "هَؤُلَاءِ", "هَذَا"], "الكُتُبَ."], [0], "Bu kitapları alacağız.", "Akılsız çoğul: هَذِهِ."),
      CB("لَيْسَ فِي مَطْبَخِنَا بَصَلٌ.", ["سَنَشْتَرِي", ["هَذِهِ", "هَذَا", "هَؤُلَاءِ"], "البَصَلَ."], [1], "Bu soğanı alacağız.", "بَصَلٌ cins ismi, müzekker: هَذَا."),
      CB("لَيْسَ فِي بَيْتِنَا ثَلَّاجَةٌ.", ["سَنَشْتَرِي", ["هَاتَيْنِ", "هَذَا", "هَذِهِ"], "الثَّلَّاجَةَ."], [2], "Bu buzdolabını alacağız.", "Müfred müennes: هَذِهِ.")
    ]},
    { type: "irab", num: "٧", tlist: GOREV, tlbl: "Görevi", ar: "أَعْرِبِ الجُمَلَ التَّالِيَةَ", tr: "Koyu kelimenin görevini ve halini seç. İşaret isimlerinde hal mahallen; müsennâ işaret ise elif / yâ ile.", exHtml: "<span class=\"ar\">هَذَا الرَّسَّامُ مَاهِرٌ: هَذَا مُبْتَدَأٌ، الرَّسَّامُ بَدَلٌ، مَاهِرٌ خَبَرٌ · قَرَأْتُ هَاتَيْنِ القِصَّتَيْنِ: هَاتَيْنِ مَفْعُولٌ بِهِ، القِصَّتَيْنِ بَدَلٌ</span>", items: [
      IR("هَذِهِ مَدْرَسَةُ اللُّغَةِ العَرَبِيَّةِ.", "هَذِهِ", "mb", "ref", "İsm-i işaret, mebnî, mahallen merfû: mübtedâ.", "Bu, Arap dili okuludur."),
      IR("هَذِهِ مَدْرَسَةُ اللُّغَةِ العَرَبِيَّةِ.", "مَدْرَسَةُ", "hb", "ref", "ال'siz: bedel değil, haber.", "Bu, Arap dili okuludur."),
      IR("هَذِهِ مَدْرَسَةُ اللُّغَةِ العَرَبِيَّةِ.", "اللُّغَةِ", "mi", "cer", "مَدْرَسَةُ اللُّغَةِ: izafet.", "Bu, Arap dili okuludur."),
      IR("شَرِبَ هَذَانِ العِجْلَانِ مَاءَ البِئْرِ.", "هَذَانِ", "fa", "ref", "Müsennâ işaret: elif ile merfû, fâil.", "Bu iki buzağı kuyu suyunu içti."),
      IR("شَرِبَ هَذَانِ العِجْلَانِ مَاءَ البِئْرِ.", "العِجْلَانِ", "bd", "ref", "Bedel: elif ile merfû.", "Bu iki buzağı kuyu suyunu içti."),
      IR("شَرِبَ هَذَانِ العِجْلَانِ مَاءَ البِئْرِ.", "مَاءَ", "mf", "nasb", "İçilen: mef’ûl bih.", "Bu iki buzağı kuyu suyunu içti."),
      IR("أَحْضَرَتِ السَّائِقَةُ هَاتَيْنِ السَّيَّارَتَيْنِ.", "هَاتَيْنِ", "mf", "nasb", "Müsennâ işaret: yâ ile mansûb, mef’ûl bih.", "Kadın şoför bu iki arabayı getirdi."),
      IR("أَحْضَرَتِ السَّائِقَةُ هَاتَيْنِ السَّيَّارَتَيْنِ.", "السَّيَّارَتَيْنِ", "bd", "nasb", "Bedel: yâ ile mansûb.", "Kadın şoför bu iki arabayı getirdi."),
      IR("زَارَ يَحْيَى تِلْكَ القُصُورَ.", "تِلْكَ", "mf", "nasb", "Mebnî, mahallen mansûb: mef’ûl bih. (Akılsız çoğul → تِلْكَ.)", "Yahyâ şu sarayları ziyaret etti."),
      IR("زَارَ يَحْيَى تِلْكَ القُصُورَ.", "القُصُورَ", "bd", "nasb", "Bedel: fetha ile mansûb.", "Yahyâ şu sarayları ziyaret etti."),
      IR("هَذَانِ المُشَاهِدَانِ يُتَابِعَانِ جَمِيعَ البَرَامِجِ التِّلْفِزْيُونِيَّةِ.", "هَذَانِ", "mb", "ref", "Mübtedâ, elif ile merfû (müsennâ).", "Bu iki izleyici bütün televizyon programlarını takip ediyor."),
      IR("هَذَانِ المُشَاهِدَانِ يُتَابِعَانِ جَمِيعَ البَرَامِجِ التِّلْفِزْيُونِيَّةِ.", "المُشَاهِدَانِ", "bd", "ref", "Bedel: elif ile merfû. Haber: يُتَابِعَانِ… fiil cümlesi.", "Bu iki izleyici bütün televizyon programlarını takip ediyor."),
      IR("هَذَانِ المُشَاهِدَانِ يُتَابِعَانِ جَمِيعَ البَرَامِجِ التِّلْفِزْيُونِيَّةِ.", "جَمِيعَ", "mf", "nasb", "Takip edilen: mef’ûl bih.", "Bu iki izleyici bütün televizyon programlarını takip ediyor."),
      IR("مَا أَكَلْتُ فِي حَيَاتِي أَلَذَّ مِنْ هَذَيْنِ الطَّعَامَيْنِ.", "أَلَذَّ", "mf", "nasb", "Yenilen: mef’ûl bih (gayr-i munsarif: tek fetha).", "Hayatımda bu iki yemekten daha lezzetlisini yemedim."),
      IR("مَا أَكَلْتُ فِي حَيَاتِي أَلَذَّ مِنْ هَذَيْنِ الطَّعَامَيْنِ.", "هَذَيْنِ", "mc", "cer", "مِنْ'den sonra: yâ ile mecrûr (müsennâ).", "Hayatımda bu iki yemekten daha lezzetlisini yemedim."),
      IR("مَا أَكَلْتُ فِي حَيَاتِي أَلَذَّ مِنْ هَذَيْنِ الطَّعَامَيْنِ.", "الطَّعَامَيْنِ", "bd", "cer", "Bedel: yâ ile mecrûr.", "Hayatımda bu iki yemekten daha lezzetlisini yemedim."),
      IR("هَؤُلَاءِ البَنَاتُ يَحْفَظْنَ كِتَابَ اللهِ.", "هَؤُلَاءِ", "mb", "ref", "Mebnî (kesre üzere), mahallen merfû: mübtedâ.", "Bu kızlar Allah’ın kitabını ezberliyor."),
      IR("هَؤُلَاءِ البَنَاتُ يَحْفَظْنَ كِتَابَ اللهِ.", "البَنَاتُ", "bd", "ref", "Bedel: damme ile merfû.", "Bu kızlar Allah’ın kitabını ezberliyor."),
      IR("هَؤُلَاءِ البَنَاتُ يَحْفَظْنَ كِتَابَ اللهِ.", "كِتَابَ", "mf", "nasb", "Ezberlenen: mef’ûl bih.", "Bu kızlar Allah’ın kitabını ezberliyor."),
      IR("أَكَلَ ذَلِكَ الأَسَدُ الخَرُوفَيْنِ الجَرِيحَيْنِ.", "ذَلِكَ", "fa", "ref", "Mebnî (fetha üzere), mahallen merfû: fâil.", "Şu aslan yaralı iki koyunu yedi."),
      IR("أَكَلَ ذَلِكَ الأَسَدُ الخَرُوفَيْنِ الجَرِيحَيْنِ.", "الأَسَدُ", "bd", "ref", "Bedel: damme ile merfû.", "Şu aslan yaralı iki koyunu yedi."),
      IR("أَكَلَ ذَلِكَ الأَسَدُ الخَرُوفَيْنِ الجَرِيحَيْنِ.", "الخَرُوفَيْنِ", "mf", "nasb", "Yenilen: mef’ûl bih, yâ ile mansûb.", "Şu aslan yaralı iki koyunu yedi."),
      IR("أَكَلَ ذَلِكَ الأَسَدُ الخَرُوفَيْنِ الجَرِيحَيْنِ.", "الجَرِيحَيْنِ", "sf", "nasb", "الخَرُوفَيْنِ'nin sıfatı: ona uyar.", "Şu aslan yaralı iki koyunu yedi.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · DÖNÜŞTÜRME
{
  id: "u4", no: 4, ar: "تَحْوِيلُ الجُمْلَةِ", tr: "Cümleyi Dönüştürme", short: "Dönüştürme", col: "mz", legend: ["mi", "cerr"],
  goals: ["Özne değişince işaret ismini, fiili ve zamiri birlikte değiştirmek", "Müsennâ ve cemide fiil çekimini işaret ismiyle uyumlu yapmak: هَذَانِ… يَبْنِيَانِ… لِيُنْقِذَا", "Akıllı çoğulda هَؤُلَاءِ ile çoğul fiil kullanmak: هَؤُلَاءِ العُمَّالُ يَبْنُونَ"],
  examples: [
    { s: "هَذَا:mi / المُهَنْدِسُ:cerr / يَبْنِي عِمَارَاتٍ… لِيُنْقِذَ:-", tr: "Bu mühendis… kurtarmak için bina yapıyor." },
    { s: "هَذِهِ:mi / المُهَنْدِسَةُ:cerr / تَبْنِي عِمَارَاتٍ… لِتُنْقِذَ:-", tr: "Bu kadın mühendis… kurtarmak için bina yapıyor." },
    { s: "هَؤُلَاءِ:mi / المُهَنْدِسُونَ:cerr / يَبْنُونَ عِمَارَاتٍ… لِيُنْقِذُوا:-", tr: "Bu mühendisler… kurtarmak için bina yapıyor." }
  ],
  rules: [
    { tr: "Özne değişince üç şey birlikte değişir: <b>işaret ismi</b>, <b>fiil</b> ve <span class=\"ar\">لِـ</span>'li <b>amaç fiili</b>." },
    { tr: "Mübtedâ önde olduğu için fiil sayıda da uyar: <span class=\"ar\">هَذَانِ… يَبْنِيَانِ</span>, <span class=\"ar\">هَؤُلَاءِ… يَبْنُونَ</span>, <span class=\"ar\">هَؤُلَاءِ المُهَنْدِسَاتُ يَبْنِينَ</span>." },
    { tr: "<span class=\"ar\">لِـ</span>'den sonra muzâri mansûb olur; müsennâ ve cemide nûn düşer: <span class=\"ar\">لِيُنْقِذَا، لِيُنْقِذُوا</span>; dişil çoğulda nûn kalır: <span class=\"ar\">لِيُنْقِذْنَ</span>." },
    { tr: "Dişil müsennâda fiil تَـ ile başlar: <span class=\"ar\">هَاتَانِ المُهَنْدِسَتَانِ تَبْنِيَانِ… لِتُنْقِذَا</span>." }
  ],
  kaide: ["اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِالكَلِمَاتِ المُنَاسِبَةِ وَغَيِّرْ مَا يَلْزَمُ، مِثْلُ: هَذَا المُهَنْدِسُ يَبْنِي عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ لِيُنْقِذَ أَرْوَاحَ النَّاسِ (المُهَنْدِسَة) ← هَذِهِ المُهَنْدِسَةُ تَبْنِي عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ لِتُنْقِذَ أَرْوَاحَ النَّاسِ."],
  ex: [
    { type: "combo", num: "٦", ar: "اسْتَبْدِلْ مَا بَيْنَ القَوْسَيْنِ بِالكَلِمَاتِ المُنَاسِبَةِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Parantezdeki özneye göre işaret ismini, fiili ve amaç fiilini seç.", exHtml: "<span class=\"ar\">هَذَا المُهَنْدِسُ يَبْنِي عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ لِيُنْقِذَ أَرْوَاحَ النَّاسِ.</span>", items: [
      CB("(المُهَنْدِسَة)", [["هَذَا", "هَذِهِ", "هَاتَانِ"], "المُهَنْدِسَةُ", ["يَبْنِي", "تَبْنِي", "تَبْنِيَانِ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِيُنْقِذَ", "لِتُنْقِذَا", "لِتُنْقِذَ"], "أَرْوَاحَ النَّاسِ."], [1, 1, 2], "Bu kadın mühendis insanların hayatını kurtarmak için depreme dayanıklı binalar yapıyor.", "Müfred müennes: هَذِهِ… تَبْنِي… لِتُنْقِذَ."),
      CB("(المُهَنْدِسَتَانِ)", [["هَذَانِ", "هَاتَانِ", "هَؤُلَاءِ"], "المُهَنْدِسَتَانِ", ["تَبْنِيَانِ", "يَبْنِيَانِ", "يَبْنِينَ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِتُنْقِذَا", "لِيُنْقِذَا", "لِتُنْقِذَ"], "أَرْوَاحَ النَّاسِ."], [1, 0, 0], "Bu iki kadın mühendis… kurtarmak için… yapıyor.", "Dişil müsennâ: هَاتَانِ… تَبْنِيَانِ… لِتُنْقِذَا."),
      CB("(المُهَنْدِسَانِ)", [["هَذَيْنِ", "هَاتَانِ", "هَذَانِ"], "المُهَنْدِسَانِ", ["يَبْنُونَ", "يَبْنِيَانِ", "تَبْنِيَانِ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِيُنْقِذَا", "لِيُنْقِذُوا", "لِتُنْقِذَا"], "أَرْوَاحَ النَّاسِ."], [2, 1, 0], "Bu iki mühendis… kurtarmak için… yapıyor.", "Eril müsennâ, merfû: هَذَانِ… يَبْنِيَانِ… لِيُنْقِذَا."),
      CB("(المُهَنْدِسُونَ)", [["هَؤُلَاءِ", "هَذِهِ", "هَذَانِ"], "المُهَنْدِسُونَ", ["يَبْنِي", "يَبْنُونَ", "يَبْنِينَ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِيُنْقِذُونَ", "لِيُنْقِذْنَ", "لِيُنْقِذُوا"], "أَرْوَاحَ النَّاسِ."], [0, 1, 2], "Bu mühendisler… kurtarmak için… yapıyor.", "Akıllı eril çoğul: هَؤُلَاءِ… يَبْنُونَ… لِيُنْقِذُوا (nûn düştü)."),
      CB("(المُهَنْدِسَاتُ)", [["هَذِهِ", "هَؤُلَاءِ", "هَاتَانِ"], "المُهَنْدِسَاتُ", ["يَبْنِينَ", "تَبْنِي", "يَبْنُونَ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِيُنْقِذُوا", "لِتُنْقِذَ", "لِيُنْقِذْنَ"], "أَرْوَاحَ النَّاسِ."], [1, 0, 2], "Bu kadın mühendisler… kurtarmak için… yapıyor.", "Akıllı dişil çoğul: هَؤُلَاءِ… يَبْنِينَ… لِيُنْقِذْنَ (nûn kalır)."),
      CB("(المِعْمَار)", [["هَذِهِ", "هَذَا", "هَؤُلَاءِ"], "المِعْمَارُ", ["يَبْنِي", "تَبْنِي", "يَبْنُونَ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِتُنْقِذَ", "لِيُنْقِذُوا", "لِيُنْقِذَ"], "أَرْوَاحَ النَّاسِ."], [1, 0, 2], "Bu mimar… kurtarmak için… yapıyor.", "Müfred müzekker: هَذَا… يَبْنِي… لِيُنْقِذَ."),
      CB("(العُمَّال)", [["هَذِهِ", "هَؤُلَاءِ", "هَذَانِ"], "العُمَّالُ", ["يَبْنُونَ", "تَبْنِي", "يَبْنِيَانِ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِيُنْقِذَا", "لِيُنْقِذُوا", "لِتُنْقِذَ"], "أَرْوَاحَ النَّاسِ."], [1, 0, 1], "Bu işçiler… kurtarmak için… yapıyor.", "العُمَّالُ akıllı kırık çoğul: هَؤُلَاءِ (هَذِهِ değil)… يَبْنُونَ… لِيُنْقِذُوا."),
      CB("(العَامِلَانِ)", [["هَذَانِ", "هَذَيْنِ", "هَؤُلَاءِ"], "العَامِلَانِ", ["يَبْنُونَ", "يَبْنِيَانِ", "تَبْنِيَانِ"], "عِمَارَاتٍ مُقَاوِمَةً لِلزِّلْزَالِ", ["لِيُنْقِذَا", "لِيُنْقِذَ", "لِتُنْقِذَا"], "أَرْوَاحَ النَّاسِ."], [0, 1, 0], "Bu iki işçi… kurtarmak için… yapıyor.", "Eril müsennâ: هَذَانِ… يَبْنِيَانِ… لِيُنْقِذَا.")
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: الثَّوْرُ الأَبْيَضُ", tr: "Okuma: Beyaz Öküz", short: "Okuma", col: "muz", legend: ["mi", "cerr"],
  goals: ["Bir hikâyede işaret isimlerini ve işaret ettikleri şeyi bulmak", "Müşârun ileyhin işaretten sonra da önce de gelebildiğini görmek: لَوْنِي هَذَا", "Akılsız çoğula işareti metinde tanımak: تِلْكَ الأَيَّامَ"],
  examples: [
    { s: "وَكَانَ فِي:- / هَذِهِ:mi / الغَابَةِ:cerr / أَسَدٌ.:-", tr: "Bu ormanda bir aslan vardı." },
    { s: "صَادَفَ:- / هَذَيْنِ:mi / الثَّوْرَيْنِ:cerr", tr: "Bu iki öküze rastladı.", pair: "فَقَالَ:- / هَذَانِ:mi / الثَّوْرَانِ:cerr", pairTr: "Bu iki öküz dedi." },
    { s: "إِنَّ:- / لَوْنِي:cerr / هَذَا:mi / مِثْلُ لَوْنِكَ:-", tr: "Benim bu rengim senin rengin gibi.", why: "Burada müşârun ileyh işaretten önce gelmiş." }
  ],
  rules: [
    { tr: "Hikâyede aynı varlık yakın ve uzak işaretle anılabilir: <span class=\"ar\">هَذِهِ الغَابَةِ / تِلْكَ الغَابَةِ</span>." },
    { tr: "Müsennâ işaret hale göre değişir: <span class=\"ar\">صَادَفَ هَذَيْنِ الثَّوْرَيْنِ</span> (mansûb), <span class=\"ar\">قَالَ هَذَانِ الثَّوْرَانِ</span> (merfû), <span class=\"ar\">قَالَ لِهَذَيْنِ</span> (mecrûr)." },
    { tr: "İşaret ismi zamirli isimden sonra da gelebilir: <span class=\"ar\">لَوْنِي هَذَا</span> (bu rengim)." },
    { tr: "Not: Metindeki <span class=\"ar\">هَؤُلَاءِ الثِّيرَانِ</span>'de akılsız çoğula هَؤُلَاءِ ile işaret edilmiş. Ders kuralına göre <span class=\"ar\">هَذِهِ الثِّيرَانُ</span> beklenir; klasik dilde iki kullanım da görülür." }
  ],
  kaide: ["اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ عَيِّنِ اسْمَ الإِشَارَةِ وَالمُشَارَ إِلَيْهِ."],
  ex: [
    { type: "reading", num: "٨", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ", tr: "Hikâyeyi oku; sonra işaret isimlerinin neye işaret ettiğini seç.", title: "الثَّوْرُ الأَبْيَضُ",
      text: "يُحْكَى أَنَّ ثَلَاثَةَ ثِيرَانٍ كَانَتْ فِي غَابَةٍ، وَكَانَ وَاحِدٌ مِنْهَا أَبْيَضَ، وَالآخَرُ أَسْوَدَ، وَالثَّالِثُ أَحْمَرَ. وَكَانَ فِي هَذِهِ الغَابَةِ أَسَدٌ، وَكَانَ هَذَا الأَسَدُ لَا يَقْدِرُ عَلَى هَؤُلَاءِ الثِّيرَانِ، لِأَنَّهَا كَانَتْ تَجْتَمِعُ عَلَيْهِ وَتُدَافِعُ عَنْ أَنْفُسِهَا، فَأَخَذَ هَذَا الأَسَدُ يُفَكِّرُ فِي طَرِيقَةٍ يَتَغَلَّبُ بِهَا عَلَى هَذِهِ الوَحْدَةِ. وَذَاتَ يَوْمٍ، عِنْدَمَا كَانَ يَتَجَوَّلُ هَذَا الأَسَدُ فِي تِلْكَ الغَابَةِ يَبْحَثُ عَنْ شَيْءٍ يَسُدُّ جُوعَهُ، صَادَفَ هَذَيْنِ الثَّوْرَيْنِ الأَحْمَرَ وَالأَسْوَدَ، فَفَكَّرَ فِي حِيلَةٍ لِلْحُصُولِ عَلَى وَاحِدٍ مِنْ هَؤُلَاءِ الثَّلَاثَةِ، فَقَالَ لِهَذَيْنِ الثَّوْرَيْنِ: «إِنَّ وُجُودَ هَذَا الثَّوْرِ الأَبْيَضِ بَيْنَنَا خَطَرٌ عَلَيْنَا بِبَيَاضِهِ، لِأَنَّهُ يَدُلُّ الصَّيَّادِينَ عَلَيْنَا، أَمَّا أَنَا وَأَنْتُمَا فَأَلْوَانُنَا مُتَمَاثِلَةٌ، فَهَلْ تَسْمَحَانِ لِي بِأَنْ آكُلَهُ؟» فَقَالَ هَذَانِ الثَّوْرَانِ: «دُونَكَ فَكُلْهُ»، فَأَكَلَهُ. وَمَضَتِ الأَيَّامُ، وَشَعَرَ الأَسَدُ بِجُوعٍ شَدِيدٍ، فَجَاءَ هَذِهِ المَرَّةَ إِلَى الثَّوْرِ الأَحْمَرِ وَقَالَ لَهُ: «إِنَّ لَوْنِي هَذَا مِثْلُ لَوْنِكَ، فَدَعْنِي آكُلِ الثَّوْرَ الأَسْوَدَ». فَقَالَ الثَّوْرُ الأَحْمَرُ: «أَمَامَكَ، كُلْهُ»، فَأَكَلَهُ. وَلَمْ يَبْقَ فِي تِلْكَ الغَابَةِ إِلَّا الأَسَدُ وَالثَّوْرُ الأَحْمَرُ. ثُمَّ قَالَ الأَسَدُ لِلثَّوْرِ الأَحْمَرِ: «أَنَا الآنَ آكُلُكَ لَا مَحَالَةَ». تَلَفَّتَ الثَّوْرُ الأَحْمَرُ حَوْلَهُ فَوَجَدَ نَفْسَهُ وَحِيدًا فِي مُوَاجَهَةِ ذَلِكَ الأَسَدِ، فَتَذَكَّرَ المَاضِيَ وَتِلْكَ الأَيَّامَ الَّتِي كَانَ يَقِفُ فِيهَا فِي حِمَايَةِ هَذَيْنِ الزَّمِيلَيْنِ، فَقَالَ هَذِهِ العِبَارَةَ الَّتِي أَصْبَحَتْ قَوْلًا مَشْهُورًا فِي اللُّغَةِ العَرَبِيَّةِ: «لَقَدْ أُكِلْتُ يَوْمَ أُكِلَ الثَّوْرُ الأَبْيَضُ».",
      textTr: "Beyaz Öküz. Anlatılır ki bir ormanda üç öküz vardı: biri beyaz, biri siyah, üçüncüsü kırmızıydı. Bu ormanda bir aslan vardı ve bu aslan bu öküzlere güç yetiremiyordu; çünkü onlar ona karşı birleşip kendilerini savunuyorlardı. Bu aslan, bu birliği yenmenin bir yolunu düşünmeye başladı. Bir gün o ormanda açlığını giderecek bir şey ararken kırmızı ve siyah öküze rastladı ve bu üçünden birini ele geçirmek için bir hile düşündü. Bu iki öküze: \"Aramızdaki bu beyaz öküz, beyazlığıyla bizim için bir tehlike; çünkü avcılara yerimizi gösteriyor. Ben ve siz ise aynı renkteyiz. Onu yememe izin verir misiniz?\" dedi. Bu iki öküz \"Al, ye onu\" dediler; o da yedi. Günler geçti, aslan çok acıktı ve bu sefer kırmızı öküze gelip \"Benim bu rengim senin rengin gibi; bırak siyah öküzü yiyeyim\" dedi. Kırmızı öküz \"Önünde, ye onu\" dedi; o da yedi. O ormanda aslanla kırmızı öküzden başkası kalmadı. Sonra aslan kırmızı öküze \"Şimdi seni kesinlikle yiyeceğim\" dedi. Kırmızı öküz etrafına bakındı, o aslanın karşısında yapayalnız olduğunu gördü; geçmişi ve bu iki arkadaşının korumasında durduğu o günleri hatırladı ve Arapçada meşhur bir söz olan şu cümleyi söyledi: \"Ben, beyaz öküzün yendiği gün yendim.\"",
      qa: [
        { q: "لِمَاذَا كَانَ الأَسَدُ لَا يَقْدِرُ عَلَى الثِّيرَانِ؟", a: "لِأَنَّهَا كَانَتْ تَجْتَمِعُ عَلَيْهِ وَتُدَافِعُ عَنْ أَنْفُسِهَا.", tr: "Aslan öküzlere neden güç yetiremiyordu? Birleşip kendilerini savundukları için." },
        { q: "مَاذَا قَالَ الأَسَدُ لِلثَّوْرَيْنِ عَنِ الثَّوْرِ الأَبْيَضِ؟", a: "قَالَ: إِنَّ وُجُودَهُ بَيْنَنَا خَطَرٌ عَلَيْنَا بِبَيَاضِهِ.", tr: "Aslan iki öküze beyaz öküz hakkında ne dedi? \"Beyazlığıyla aramızda olması bizim için tehlike.\"" },
        { q: "مَا العِبْرَةُ مِنَ القِصَّةِ؟", a: "الوَحْدَةُ قُوَّةٌ، وَمَنْ تَرَكَ أَخَاهُ لِعَدُوِّهِ هَلَكَ بَعْدَهُ.", tr: "Hikâyenin dersi ne? Birlik kuvvettir; kardeşini düşmana bırakan ondan sonra helak olur." }
      ],
      cls: { opts: [["ms", "Müfred müzekker", "مُفْرَدٌ مُذَكَّرٌ", "cerr"], ["fs", "Müfred müennes", "مُفْرَدٌ مُؤَنَّثٌ", "mun"], ["md", "Müsennâ", "مُثَنًّى", "mz"], ["pl", "Akıllı çoğul", "جَمْعُ العَاقِلِ", "ref"], ["ga", "Akılsız çoğul", "جَمْعُ غَيْرِ العَاقِلِ", "nasb"]], ar: "عَيِّنِ المُشَارَ إِلَيْهِ", tr: "Koyu işaret isminin işaret ettiği şey (müşârun ileyh) ne?", items: [
        { s: HL("وَكَانَ فِي هَذِهِ الغَابَةِ أَسَدٌ", "هَذِهِ") , a: "fs", why: "هَذِهِ → الغَابَةِ." },
        { s: HL("وَكَانَ هَذَا الأَسَدُ لَا يَقْدِرُ", "هَذَا"), a: "ms", why: "هَذَا → الأَسَدُ." },
        { s: HL("لَا يَقْدِرُ عَلَى هَؤُلَاءِ الثِّيرَانِ", "هَؤُلَاءِ"), a: "ga", why: "هَؤُلَاءِ → الثِّيرَانِ: akılsız çoğul. Ders kuralına göre هَذِهِ beklenirdi." },
        { s: HL("يَتَغَلَّبُ بِهَا عَلَى هَذِهِ الوَحْدَةِ", "هَذِهِ"), a: "fs", why: "هَذِهِ → الوَحْدَةِ." },
        { s: HL("يَتَجَوَّلُ فِي تِلْكَ الغَابَةِ", "تِلْكَ"), a: "fs", why: "تِلْكَ (uzak) → الغَابَةِ." },
        { s: HL("صَادَفَ هَذَيْنِ الثَّوْرَيْنِ", "هَذَيْنِ"), a: "md", why: "هَذَيْنِ (mansûb) → الثَّوْرَيْنِ." },
        { s: HL("إِنَّ وُجُودَ هَذَا الثَّوْرِ الأَبْيَضِ", "هَذَا"), a: "ms", why: "هَذَا → الثَّوْرِ (mecrûr ama mebnî)." },
        { s: HL("فَقَالَ هَذَانِ الثَّوْرَانِ", "هَذَانِ"), a: "md", why: "هَذَانِ (merfû) → الثَّوْرَانِ." },
        { s: HL("فَجَاءَ هَذِهِ المَرَّةَ", "هَذِهِ"), a: "fs", why: "هَذِهِ → المَرَّةَ." },
        { s: HL("إِنَّ لَوْنِي هَذَا مِثْلُ لَوْنِكَ", "هَذَا"), a: "ms", why: "هَذَا → لَوْنِي (önce gelmiş)." },
        { s: HL("فِي مُوَاجَهَةِ ذَلِكَ الأَسَدِ", "ذَلِكَ"), a: "ms", why: "ذَلِكَ (uzak) → الأَسَدِ." },
        { s: HL("وَتِلْكَ الأَيَّامَ الَّتِي كَانَ يَقِفُ فِيهَا", "تِلْكَ"), a: "ga", why: "تِلْكَ → الأَيَّامَ: akılsız çoğul, kurala uygun." },
        { s: HL("فِي حِمَايَةِ هَذَيْنِ الزَّمِيلَيْنِ", "هَذَيْنِ"), a: "md", why: "هَذَيْنِ (mecrûr, muzâfun ileyh) → الزَّمِيلَيْنِ." },
        { s: HL("فَقَالَ هَذِهِ العِبَارَةَ", "هَذِهِ"), a: "fs", why: "هَذِهِ → العِبَارَةَ." }
      ]}
    },
    { type: "tag", roles: ["mi", "cerr", "x"], ar: "عَيِّنِ اسْمَ الإِشَارَةِ وَالمُشَارَ إِلَيْهِ", tr: "Hikâyeden cümleler: kelimelere dokunarak İsm-i işaret, Müşârun ileyh ya da Başka diye etiketle.", items: [
      T("وَكَانَ فِي:- / هَذِهِ:mi / الغَابَةِ:cerr / أَسَدٌ.:x", "Bu ormanda bir aslan vardı.", "هَذِهِ → الغَابَةِ; أَسَدٌ ال'siz, kânın ismi."),
      T("وَكَانَ:- / هَذَا:mi / الأَسَدُ:cerr / لَا يَقْدِرُ عَلَى:- / هَؤُلَاءِ:mi / الثِّيرَانِ:cerr", "Bu aslan bu öküzlere güç yetiremiyordu.", "İki işaret: هَذَا → الأَسَدُ, هَؤُلَاءِ → الثِّيرَانِ."),
      T("صَادَفَ:- / هَذَيْنِ:mi / الثَّوْرَيْنِ:cerr / الأَحْمَرَ:x / وَالأَسْوَدَ.:x", "Kırmızı ve siyah olan bu iki öküze rastladı.", "الأَحْمَرَ ve الأَسْوَدَ öküzlerin açıklaması (bedel), müşârun ileyh değil."),
      T("إِنَّ وُجُودَ:- / هَذَا:mi / الثَّوْرِ:cerr / الأَبْيَضِ:x / بَيْنَنَا خَطَرٌ عَلَيْنَا.:-", "Aramızdaki bu beyaz öküz bizim için tehlike.", "الأَبْيَضِ sıfat."),
      T("فَقَالَ:- / هَذَانِ:mi / الثَّوْرَانِ:cerr / : دُونَكَ فَكُلْهُ.:-", "Bu iki öküz: Al, ye onu, dedi.", "هَذَانِ → الثَّوْرَانِ (fâil, merfû)."),
      T("إِنَّ:- / لَوْنِي:cerr / هَذَا:mi / مِثْلُ:x / لَوْنِكَ.:-", "Benim bu rengim senin rengin gibi.", "Müşârun ileyh önce: لَوْنِي هَذَا."),
      T("وَلَمْ يَبْقَ فِي:- / تِلْكَ:mi / الغَابَةِ:cerr / إِلَّا:- / الأَسَدُ:x / وَالثَّوْرُ الأَحْمَرُ.:-", "O ormanda aslanla kırmızı öküzden başkası kalmadı.", "تِلْكَ → الغَابَةِ; الأَسَدُ burada işaretsiz."),
      T("فَتَذَكَّرَ:- / المَاضِيَ:x / وَ:- / تِلْكَ:mi / الأَيَّامَ:cerr / الَّتِي كَانَ يَقِفُ فِيهَا.:-", "Geçmişi ve o günleri hatırladı.", "تِلْكَ الأَيَّامَ: akılsız çoğul."),
      T("فَقَالَ:- / هَذِهِ:mi / العِبَارَةَ:cerr / الَّتِي أَصْبَحَتْ قَوْلًا مَشْهُورًا.:-", "Meşhur bir söz olan bu cümleyi söyledi.", "هَذِهِ → العِبَارَةَ (mef’ûl).")
    ]}
  ]
}
];

// Doğru İşaret oyunu: [cümle {işaret}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var IS_POOL = [
  ["{هَذَا} كِتَابٌ.", ["هَذَا", "هَذِهِ", "هَؤُلَاءِ"], "müfred müzekker, yakın", "Bu bir kitap.", "u1"],
  ["{هَذِهِ} مَجَلَّةٌ.", ["هَذِهِ", "هَذَا", "هَاتَانِ"], "müfred müennes, yakın", "Bu bir dergi.", "u1"],
  ["{ذَلِكَ} طَالِبٌ.", ["ذَلِكَ", "تِلْكَ", "أُولَئِكَ"], "müfred müzekker, uzak", "Şu bir öğrenci.", "u1"],
  ["{تِلْكَ} زَيْنَبُ.", ["تِلْكَ", "ذَلِكَ", "تَانِكَ"], "müfred müennes, uzak", "Şu Zeynep.", "u1"],
  ["{ذَانِكَ} قَلَمَانِ.", ["ذَانِكَ", "ذَيْنِكَ", "تَانِكَ"], "müsennâ müzekker, uzak, merfû", "Şunlar iki kalem.", "u1"],
  ["{تَانِكَ} تِلْمِيذَتَانِ.", ["تَانِكَ", "ذَانِكَ", "تَيْنِكَ"], "müsennâ müennes, uzak, merfû", "Şunlar iki kız öğrenci.", "u1"],
  ["{أُولَئِكَ} المُسْلِمُونَ يُصَلُّونَ.", ["أُولَئِكَ", "تِلْكَ", "ذَلِكَ"], "akıllı çoğul, uzak", "Şu Müslümanlar namaz kılıyor.", "u1"],
  ["{هَذِهِ} المَبَانِي عَالِيَةٌ.", ["هَذِهِ", "هَؤُلَاءِ", "هَذَا"], "akılsız çoğul → هَذِهِ", "Bu binalar yüksek.", "u2"],
  ["{تِلْكَ} المَيَادِينُ فَسِيحَةٌ.", ["تِلْكَ", "أُولَئِكَ", "ذَلِكَ"], "akılsız çoğul → تِلْكَ", "Şu meydanlar geniş.", "u2"],
  ["تَقْرَأُ زَيْنَبُ {هَذِهِ} الصُّحُفَ.", ["هَذِهِ", "هَؤُلَاءِ", "هَذَا"], "akılsız çoğul", "Zeynep bu gazeteleri okuyor.", "u2"],
  ["أَعْلَنَتِ الجَامِعَةُ {تِلْكَ} النَّتَائِجَ.", ["تِلْكَ", "أُولَئِكَ", "تَيْنِكَ"], "akılsız çoğul, uzak", "Üniversite şu sonuçları ilan etti.", "u2"],
  ["{هَؤُلَاءِ} البَنَاتُ يَحْفَظْنَ القُرْآنَ.", ["هَؤُلَاءِ", "هَذِهِ", "هَاتَانِ"], "akıllı çoğul", "Bu kızlar Kur’an’ı ezberliyor.", "u2"],
  ["شَاهَدَتْ {هَاتَانِ} المُعَلِّمَتَانِ الزَّرَافَةَ.", ["هَاتَانِ", "هَاتَيْنِ", "هَذَانِ"], "müennes müsennâ, fâil", "Bu iki kadın öğretmen zürafayı seyretti.", "u2"],
  ["زَارَ يَحْيَى {ذَيْنِكَ} القَصْرَيْنِ.", ["ذَيْنِكَ", "ذَانِكَ", "تَيْنِكَ"], "müzekker müsennâ, mansûb, uzak", "Yahyâ şu iki sarayı ziyaret etti.", "u2"],
  ["يُشَاهِدُ الأَوْلَادُ {هَذَيْنِ} البَرْنَامَجَيْنِ.", ["هَذَيْنِ", "هَذَانِ", "هَاتَيْنِ"], "mef’ûl, müsennâ: yâ ile", "Çocuklar bu iki programı seyrediyor.", "u2"],
  ["{هَذَانِ} العَصِيرَانِ لَذِيذَانِ.", ["هَذَانِ", "هَذَيْنِ", "هَاتَانِ"], "mübtedâ: elif ile", "Bu iki meyve suyu lezzetli.", "u3"],
  ["شَرِبْتُ {هَذَيْنِ} العَصِيرَيْنِ.", ["هَذَيْنِ", "هَذَانِ", "هَاتَيْنِ"], "mef’ûl: yâ ile", "Bu iki meyve suyunu içtim.", "u3"],
  ["أَمْسَكْتُ بِـ{هَذَيْنِ} العَصِيرَيْنِ.", ["هَذَيْنِ", "هَذَانِ", "هَؤُلَاءِ"], "mecrûr: yâ ile", "Bu iki meyve suyunu tuttum.", "u3"],
  ["قَرَأْتُ {هَاتَيْنِ} القِصَّتَيْنِ.", ["هَاتَيْنِ", "هَاتَانِ", "هَذَيْنِ"], "müennes müsennâ, mef’ûl", "Bu iki hikâyeyi okudum.", "u3"],
  ["سَنَشْتَرِي {هَذِهِ} المَعَاجِمَ.", ["هَذِهِ", "هَؤُلَاءِ", "هَذَيْنِ"], "akılsız çoğul", "Bu sözlükleri alacağız.", "u3"],
  ["سَنَشْتَرِي {هَذَيْنِ} القَامُوسَيْنِ.", ["هَذَيْنِ", "هَذَانِ", "هَذَا"], "mef’ûl, müzekker müsennâ", "Bu iki sözlüğü alacağız.", "u3"],
  ["{هَذَا} المُهَنْدِسُ يَبْنِي عِمَارَاتٍ.", ["هَذَا", "هَذِهِ", "هَؤُلَاءِ"], "müfred müzekker", "Bu mühendis bina yapıyor.", "u4"],
  ["{هَاتَانِ} المُهَنْدِسَتَانِ تَبْنِيَانِ عِمَارَاتٍ.", ["هَاتَانِ", "هَذَانِ", "هَاتَيْنِ"], "müennes müsennâ, merfû", "Bu iki kadın mühendis bina yapıyor.", "u4"],
  ["{هَؤُلَاءِ} العُمَّالُ يَبْنُونَ عِمَارَاتٍ.", ["هَؤُلَاءِ", "هَذِهِ", "هَذَانِ"], "akıllı kırık çoğul", "Bu işçiler bina yapıyor.", "u4"],
  ["{هَذَانِ} العَامِلَانِ يَبْنِيَانِ عِمَارَاتٍ.", ["هَذَانِ", "هَذَيْنِ", "هَؤُلَاءِ"], "müzekker müsennâ, merfû", "Bu iki işçi bina yapıyor.", "u4"],
  ["وَكَانَ فِي {هَذِهِ} الغَابَةِ أَسَدٌ.", ["هَذِهِ", "هَذَا", "هَاتَيْنِ"], "müfred müennes", "Bu ormanda bir aslan vardı.", "u5"],
  ["صَادَفَ {هَذَيْنِ} الثَّوْرَيْنِ.", ["هَذَيْنِ", "هَذَانِ", "هَؤُلَاءِ"], "mansûb müsennâ", "Bu iki öküze rastladı.", "u5"],
  ["فَقَالَ {هَذَانِ} الثَّوْرَانِ: دُونَكَ فَكُلْهُ.", ["هَذَانِ", "هَذَيْنِ", "هَاتَانِ"], "merfû müsennâ", "Bu iki öküz: Al ye onu, dedi.", "u5"],
  ["فِي مُوَاجَهَةِ {ذَلِكَ} الأَسَدِ.", ["ذَلِكَ", "تِلْكَ", "ذَيْنِكَ"], "müfred müzekker, uzak", "O aslanın karşısında.", "u5"],
  ["وَتَذَكَّرَ {تِلْكَ} الأَيَّامَ.", ["تِلْكَ", "أُولَئِكَ", "ذَلِكَ"], "akılsız çoğul, uzak", "O günleri hatırladı.", "u5"]
];
var HAFIZA = {
  qb: { name: "Yakın ↔ uzak", pairs: [["هَذَا", "ذَلِكَ"], ["هَذِهِ", "تِلْكَ"], ["هَذَانِ", "ذَانِكَ"], ["هَذَيْنِ", "ذَيْنِكَ"], ["هَاتَانِ", "تَانِكَ"], ["هَاتَيْنِ", "تَيْنِكَ"], ["هَؤُلَاءِ", "أُولَئِكَ"]] },
  kt: { name: "İsim ↔ işaret", pairs: [["الكِتَابُ", "هَذَا"], ["المَجَلَّةُ", "هَذِهِ"], ["الكِتَابَانِ", "هَذَانِ"], ["النَّظَّارَتَانِ", "هَاتَانِ"], ["المُسْلِمُونَ", "هَؤُلَاءِ"], ["المَبَانِي", "تِلْكَ"], ["الطَّالِبَيْنِ", "ذَيْنِكَ"], ["التِّلْمِيذَتَيْنِ", "هَاتَيْنِ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["هَذَا كِتَابٌ", "Bu bir kitap."], ["هَذَا الكِتَابُ", "bu kitap"], ["ذَلِكَ الطَّالِبُ", "şu öğrenci"], ["هَذِهِ المَبَانِي", "bu binalar"], ["هَؤُلَاءِ الطُّلَّابُ", "bu öğrenciler"], ["تَانِكَ البِنْتَانِ", "şu iki kız"], ["لَوْنِي هَذَا", "bu rengim"], ["تِلْكَ الأَيَّامُ", "o günler"]] }
};
var KARTLAR = [
  ["İsm-i işaret nedir?", "Belli bir şeyi ya da kişiyi göstererek belirten mebnî isim: هَذَا، تِلْكَ…"],
  ["Müşârun ileyh nedir?", "İşaret edilen şey: هَذَا الكِتَابُ'ta الكِتَابُ."],
  ["Yakın için işaretler?", "هَذَا، هَذِهِ، هَذَانِ/هَذَيْنِ، هَاتَانِ/هَاتَيْنِ، هَؤُلَاءِ"],
  ["Uzak için işaretler?", "ذَلِكَ، تِلْكَ، ذَانِكَ/ذَيْنِكَ، تَانِكَ/تَيْنِكَ، أُولَئِكَ"],
  ["Akılsız çoğula hangi işaret?", "Müfred müennes: هَذِهِ المَبَانِي، تِلْكَ المَيَادِينُ"],
  ["هَؤُلَاءِ kimin için?", "Akıllı çoğul; erkek de kadın da: هَؤُلَاءِ المُسْلِمُونَ / المُسْلِمَاتُ"],
  ["Hangi işaretler i’rab alır?", "Müsennâ olanlar: merfûda elif (هَذَانِ), mansûb ve mecrûrda yâ (هَذَيْنِ)."],
  ["Diğer işaretlerin i’rabı?", "Mebnî; cümledeki yerine göre mahallen merfû, mansûb ya da mecrûr."],
  ["هَذَا الطَّالِبُ مُجْتَهِدٌ: الطَّالِبُ ne?", "Bedel. هَذَا mübtedâ, مُجْتَهِدٌ haber."],
  ["هَذَا طَالِبٌ ile هَذَا الطَّالِبُ farkı?", "ال'siz: haber (bu bir öğrencidir). ال'li: bedel (bu öğrenci…)."],
  ["Yakını uzağa çevirme ipucu?", "هَا düşer, ـكَ gelir: هَذَانِ ← ذَانِكَ، هَاتَيْنِ ← تَيْنِكَ"],
  ["لَوْنِي هَذَا ne demek?", "Bu rengim: müşârun ileyh işaretten önce gelmiş."]
];
