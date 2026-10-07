// ================= VERİ: Olumsuzluk (النَّفْيُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "أَدَاةُ النَّفْيِ", tr: "Nefy edatı" }, nasb: { ar: "المَنْفِيُّ", tr: "Menfî" }, cerr: { ar: "", tr: "İsim" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var ZMN = [["i", "İsim cümlesi", "الجُمْلَةُ الاسْمِيَّةُ", "cerr"], ["m", "Geçmiş", "المَاضِي", "nasb"], ["s", "Şimdiye kadar (henüz)", "الاسْتِغْرَاقُ", "mi"], ["h", "Şimdiki / geniş", "الحَاضِرُ", "ref"], ["g", "Gelecek", "المُسْتَقْبَلُ", "mz"]];
var IRB3 = [["r", "Merfû (مَا، لَا)", "مَرْفُوعٌ", "cerr"], ["c", "Meczûm (لَمْ، لَمَّا)", "مَجْزُومٌ", "mi"], ["n", "Mansûb (لَنْ)", "مَنْصُوبٌ", "nasb"]];
var NF = [["n", "Nefy", "نَافِيَةٌ", "mz"], ["d", "Nefy değil", "غَيْرُ نَافِيَةٍ", "x"]];
var RL3 = [["e", "Nefy edatı", "أَدَاةُ نَفْيٍ", "mz"], ["n", "Menfî", "المَنْفِيُّ", "nasb"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];
var TUR_TR = { i: "İsim cümlesi", m: "Geçmiş", s: "Şimdiye kadar", h: "Şimdiki / geniş", g: "Gelecek", n: "Nefy", d: "Nefy değil" };
// Nefy makinesi
var NE = ["مَا", "لَيْسَ", "لَمْ", "لَمَّا", "لَا", "لَنْ"];
// [olumlu cümle, tür, Türkçe, {edat: [bâsız, bâlı|null, Türkçe olumsuz]}]
var NS = [
  ["عَدْنَانُ مُدَرِّسٌ", "i", "Adnan öğretmen.", { 0: ["مَا عَدْنَانُ مُدَرِّسًا", "مَا عَدْنَانُ بِمُدَرِّسٍ", "Adnan öğretmen değil."], 1: ["لَيْسَ عَدْنَانُ مُدَرِّسًا", "لَيْسَ عَدْنَانُ بِمُدَرِّسٍ", "Adnan öğretmen değil."] }],
  ["الطَّالِبَةُ مُجْتَهِدَةٌ", "i", "Öğrenci (kız) çalışkan.", { 0: ["مَا الطَّالِبَةُ مُجْتَهِدَةً", "مَا الطَّالِبَةُ بِمُجْتَهِدَةٍ", "Öğrenci çalışkan değil."], 1: ["لَيْسَتِ الطَّالِبَةُ مُجْتَهِدَةً", "لَيْسَتِ الطَّالِبَةُ بِمُجْتَهِدَةٍ", "Öğrenci çalışkan değil."] }],
  ["نَحْنُ مُتْعَبُونَ", "i", "Yorgunuz.", { 0: ["مَا نَحْنُ مُتْعَبِينَ", "مَا نَحْنُ بِمُتْعَبِينَ", "Yorgun değiliz."], 1: ["لَسْنَا مُتْعَبِينَ", "لَسْنَا بِمُتْعَبِينَ", "Yorgun değiliz."] }],
  ["قَدِمَ حُسَيْنٌ مِنَ العِرَاقِ", "m", "Hüseyin Irak’tan geldi.", { 0: ["مَا قَدِمَ حُسَيْنٌ مِنَ العِرَاقِ", null, "Hüseyin Irak’tan gelmedi."], 2: ["لَمْ يَقْدَمْ حُسَيْنٌ مِنَ العِرَاقِ", null, "Hüseyin Irak’tan gelmedi."], 3: ["لَمَّا يَقْدَمْ حُسَيْنٌ مِنَ العِرَاقِ", null, "Hüseyin Irak’tan henüz gelmedi."] }],
  ["يَأْكُلُ الرَّجُلُ اللَّحْمَ", "h", "Adam et yiyor.", { 0: ["مَا يَأْكُلُ الرَّجُلُ اللَّحْمَ", null, "Adam (şu an) et yemiyor."], 2: ["لَمْ يَأْكُلِ الرَّجُلُ اللَّحْمَ", null, "Adam et yemedi."], 3: ["لَمَّا يَأْكُلِ الرَّجُلُ اللَّحْمَ", null, "Adam henüz et yemedi."], 4: ["لَا يَأْكُلُ الرَّجُلُ اللَّحْمَ", null, "Adam et yemez / yemiyor."], 5: ["لَنْ يَأْكُلَ الرَّجُلُ اللَّحْمَ", null, "Adam et yemeyecek."] }],
  ["سَنُسَافِرُ يَوْمَ الأَحَدِ", "g", "Pazar günü yolculuk yapacağız.", { 5: ["لَنْ نُسَافِرَ يَوْمَ الأَحَدِ", null, "Pazar günü yolculuk yapmayacağız."] }]
];
var NBAD = { i: "İsim cümlesi yalnız لَيْسَ ya da مَا ile olumsuzlanır.", m: "Mâzî fiil مَا ile olumsuzlanır; لَمْ / لَمَّا için muzâriye çevrilir.", h: "لَيْسَ fiil cümlesine girmez.", g: "Gelecek لَنْ ile olumsuzlanır (سَـ düşer)." };
var NWHY = [
  "مَا: isim cümlesinde haberi nasb eder (Hicaz lehçesi); mâzîyi ve muzâriyi (şimdi) olumsuzlar.",
  "لَيْسَ: isim cümlesine girer, haberi nasb eder; fâil gibi çekilir.",
  "لَمْ: muzâriyi cezmeder, anlamı geçmişe çevirir.",
  "لَمَّا: muzâriyi cezmeder; “henüz …medi” (konuşma ânına kadar).",
  "لَا: muzâriyi olumsuzlar, fiil merfû kalır.",
  "لَنْ: muzâriyi nasbeder, gelecekte olumsuzlar."
];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var UNITS = [
// ---------------------------------------------------------------- 1 · EDATLAR VE İSİM CÜMLESİ
{
  id: "u1", no: 1, ar: "أَدَوَاتُ النَّفْيِ وَنَفْيُ الجُمْلَةِ الاسْمِيَّةِ", tr: "Nefy Edatları ve İsim Cümlesi", short: "İsim c.", col: "mz", legend: ["mz", "nasb"],
  goals: ["Nefy edatlarını saymak: مَا، لَيْسَ، لَمْ، لَمَّا، لَا، لَنْ", "İsim cümlesini لَيْسَ ve مَا ile olumsuzlamak; haberi mansûb yazmak", "Zâid bâyı tanımak ve لَيْسَ’i çekmek"],
  examples: [
    { s: "عَدْنَانُ مُدَرِّسٌ.:-", tr: "Adnan öğretmen.", pair: "لَيْسَ:mz / عَدْنَانُ:- / مُدَرِّسًا / بِمُدَرِّسٍ.:nasb", pairTr: "Adnan öğretmen değil." },
    { s: "مَا:mz / عَدْنَانُ:- / مُدَرِّسًا / بِمُدَرِّسٍ.:nasb", tr: "Adnan öğretmen değil. (مَا ile)" },
    { s: "لَسْتَ:mz / عَلَيْهِمْ:- / بِمُسَيْطِرٍ:nasb", tr: "Sen onların üzerinde bir zorba değilsin. (Gâşiye 22)" }
  ],
  rules: [
    { tr: "Nefy edatları: <span class=\"ar\">مَا، لَيْسَ، لَمْ، لَا، لَنْ</span> (ve <span class=\"ar\">لَمَّا</span>). Her biri belli bir cümle türüne ve zamana girer." },
    { tr: "<span class=\"ar\">لَيْسَ</span> ve <span class=\"ar\">مَا</span> isim cümlesine girer, haberi olumsuzlar; haber <b class=\"r-nasb\">mansûb</b> olur:", ex: ["عَدْنَانُ مُدَرِّسٌ ← لَيْسَ عَدْنَانُ مُدَرِّسًا · مَا عَدْنَانُ مُدَرِّسًا"] },
    { tr: "Habere te’kîd için <b>zâid bâ</b> gelebilir; haber lafzen mecrûr, mahallen mansûb olur: <span class=\"ar\">لَيْسَ عَدْنَانُ بِمُدَرِّسٍ · وَمَا هُمْ بِمُؤْمِنِينَ</span>." },
    { tr: "<span class=\"ar\">لَيْسَ</span> câmid bir fiildir; yalnız mâzî biçimi vardır ama zamirlerle çekilir:", ex: ["لَيْسَ · لَيْسَا · لَيْسُوا · لَيْسَتْ · لَيْسَتَا · لَسْنَ", "لَسْتَ · لَسْتُمَا · لَسْتُمْ · لَسْتِ · لَسْتُنَّ · لَسْتُ · لَسْنَا"] }
  ],
  kaide: [
    "١ ـ أَدَوَاتُ النَّفْيِ: مَا، لَيْسَ، لَمْ، لَا، لَنْ.",
    "٢ ـ «لَيْسَ» وَ«مَا» تَدْخُلَانِ عَلَى الجُمْلَةِ الاسْمِيَّةِ وَتَنْفِيَانِ الخَبَرَ، فَيَكُونُ الخَبَرُ مَنْصُوبًا: لَيْسَ عَدْنَانُ مُدَرِّسًا، مَا عَدْنَانُ مُدَرِّسًا. وَقَدْ يَدْخُلُ حَرْفُ الجَرِّ «البَاءُ» زَائِدًا عَلَى خَبَرِ «لَيْسَ» وَ«مَا»، وَيُفِيدُ التَّأْكِيدَ فِي النَّفْيِ: لَيْسَ عَدْنَانُ بِمُدَرِّسٍ، مَا عَدْنَانُ بِمُدَرِّسٍ."
  ],
  ex: [
    { type: "tag", roles: ["mz", "x"], num: "١", ar: "عَيِّنْ أَدَاةَ النَّفْيِ فِيمَا يَأْتِي", tr: "Nefy edatına dokunup işaretle. Dikkat: her مَا olumsuzluk değildir!", items: [
      T("قُلْ:x / لَنْ:mz / يُصِيبَنَا إِلَّا مَا كَتَبَ اللهُ لَنَا:x", "De ki: Allah’ın bizim için yazdığından başkası bize asla erişmez. (Tevbe 51)", "لَنْ nefy; مَا كَتَبَ’deki مَا ism-i mevsûl."),
      T("لَسْتَ:mz / عَلَيْهِمْ بِمُسَيْطِرٍ:x", "Sen onların üzerinde zorba değilsin. (Gâşiye 22)", "لَسْتَ = لَيْسَ + تَ; haberde zâid bâ."),
      T("وَمَا:x / تِلْكَ بِيَمِينِكَ يَا مُوسَى:x", "Sağ elindeki nedir ey Mûsâ? (Tâhâ 17)", "Bu مَا soru edatıdır (istifhâm), nefy değil!"),
      T("وَمِنَ النَّاسِ مَنْ يَقُولُ آمَنَّا بِاللهِ وَبِاليَوْمِ الآخِرِ:x / وَمَا:mz / هُمْ بِمُؤْمِنِينَ:x", "İnsanlardan “Allah’a ve âhiret gününe inandık” diyenler vardır; oysa onlar mü’min değildir. (Bakara 8)", "مَا nefy; haberde zâid bâ."),
      T("قُلْ:x / مَا:x / عِنْدَ اللهِ خَيْرٌ مِنَ اللَّهْوِ وَمِنَ التِّجَارَةِ:x", "De ki: Allah katında olan, eğlenceden ve ticaretten daha hayırlıdır. (Cum’a 11)", "Bu مَا ism-i mevsûldür (“olan şey”), nefy değil!"),
      T("إِنَّ الَّذِينَ كَفَرُوا:x / لَنْ:mz / تُغْنِيَ عَنْهُمْ أَمْوَالُهُمْ:x / وَلَا:mz / أَوْلَادُهُمْ:x", "İnkâr edenlere ne malları ne de evlatları fayda verir. (Âl-i İmrân 10)", "لَنْ nefy; وَلَا nefyi pekiştirir."),
      T("لَا:mz / يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ:x", "Sizden biri, kendisi için istediğini kardeşi için de istemedikçe (kâmil) iman etmiş olmaz. (Hadis)", "لَا nefy."),
      T("إِنَّ اللهَ:x / لَا:mz / يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ:x", "Allah suretlerinize ve mallarınıza bakmaz, kalplerinize bakar. (Hadis)", "لَا nefy; لَكِنْ istidrâk.")
    ]},
    { type: "pick", fill: true, extra: true, ar: "صَرِّفْ «لَيْسَ» مَعَ الضَّمِيرِ", tr: "Parantezdeki zamire göre لَيْسَ’in doğru çekimini seç.", items: PL([
      ["___ مُدَرِّسًا. (أَنَا)", "لَسْتُ", "لَيْسَ أَنَا", "لَيْسْتُ", "Öğretmen değilim.", "لَيْسَ + تُ → لَسْتُ (yâ düşer)."],
      ["___ مُتْعَبِينَ. (نَحْنُ)", "لَسْنَا", "لَيْسْنَا", "لَسْنَ", "Yorgun değiliz.", "نَحْنُ → لَسْنَا."],
      ["___ طُلَّابًا. (هُمْ)", "لَيْسُوا", "لَسْتُمْ", "لَيْسَ هُمْ", "Onlar öğrenci değil.", "هُمْ → لَيْسُوا."],
      ["___ مُعَلِّمَاتٍ. (هُنَّ)", "لَسْنَ", "لَسْنَا", "لَيْسُوا", "Onlar (kadın) öğretmen değil.", "هُنَّ → لَسْنَ."],
      ["___ غَائِبَيْنِ. (أَنْتُمَا)", "لَسْتُمَا", "لَيْسَا", "لَسْتُمْ", "Siz ikiniz yok değilsiniz.", "أَنْتُمَا → لَسْتُمَا."],
      ["___ مَرِيضَةً. (أَنْتِ)", "لَسْتِ", "لَسْتَ", "لَيْسَتْ", "Sen (kadın) hasta değilsin.", "أَنْتِ → لَسْتِ."],
      ["___ صَعْبَةً. (هِيَ)", "لَيْسَتْ", "لَسْتِ", "لَيْسَ", "O (dişil) zor değil.", "هِيَ → لَيْسَتْ."],
      ["___ مُهَنْدِسَيْنِ. (هُمَا)", "لَيْسَا", "لَسْتُمَا", "لَيْسُوا", "O ikisi mühendis değil.", "هُمَا (müz.) → لَيْسَا."]
    ])},
    { type: "pick", num: "٥", ar: "انْفِ الجُمَلَ الاسْمِيَّةَ التَّالِيَةَ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "İsim cümlesini doğru olumsuzlayan, doğru harekeli cümleyi seç.", items: PL([
      ["صَدِيقِي أَحْمَدُ مَرِيضٌ بِالسُّكَّرِ.", "لَيْسَ صَدِيقِي أَحْمَدُ مَرِيضًا بِالسُّكَّرِ.", "لَيْسَ صَدِيقِي أَحْمَدُ مَرِيضٌ بِالسُّكَّرِ.", "لَمْ صَدِيقِي أَحْمَدُ مَرِيضًا بِالسُّكَّرِ.", "Arkadaşım Ahmed şeker hastası değil.", "لَيْسَ: haber mansûb."],
      ["إِنَّ الحَيَاةَ فِي المَدِينَةِ هَادِئَةٌ.", "لَيْسَتِ الحَيَاةُ فِي المَدِينَةِ هَادِئَةً.", "لَيْسَ إِنَّ الحَيَاةَ فِي المَدِينَةِ هَادِئَةٌ.", "لَيْسَتِ الحَيَاةَ فِي المَدِينَةِ هَادِئَةٌ.", "Şehirde hayat sakin değil.", "إِنَّ düşer; ism merfû, haber mansûb; müennes: لَيْسَتْ."],
      ["الطَّالِبَاتُ مُقَصِّرَاتٌ فِي وَاجِبَاتِهِنَّ.", "لَيْسَتِ الطَّالِبَاتُ مُقَصِّرَاتٍ فِي وَاجِبَاتِهِنَّ.", "لَيْسَتِ الطَّالِبَاتُ مُقَصِّرَاتٌ فِي وَاجِبَاتِهِنَّ.", "لَسْنَ الطَّالِبَاتُ مُقَصِّرَاتٍ فِي وَاجِبَاتِهِنَّ.", "Kız öğrenciler ödevlerinde kusurlu değil.", "Cem-i müennes haber: esreyle mansûb; fiil önde tekil."],
      ["الطَّعَامُ الصِّينِيُّ مُنْتَشِرٌ فِي تُرْكِيَا.", "مَا الطَّعَامُ الصِّينِيُّ مُنْتَشِرًا فِي تُرْكِيَا.", "مَا الطَّعَامَ الصِّينِيَّ مُنْتَشِرٌ فِي تُرْكِيَا.", "لَنِ الطَّعَامُ الصِّينِيُّ مُنْتَشِرًا فِي تُرْكِيَا.", "Çin yemeği Türkiye’de yaygın değil.", "مَا: haber mansûb."],
      ["أَسْعَارُ النِّفْطِ مُنْخَفِضَةٌ هَذِهِ السَّنَةَ.", "لَيْسَتْ أَسْعَارُ النِّفْطِ مُنْخَفِضَةً هَذِهِ السَّنَةَ.", "لَيْسَتْ أَسْعَارُ النِّفْطِ مُنْخَفِضَةٌ هَذِهِ السَّنَةَ.", "لَيْسَتْ أَسْعَارَ النِّفْطِ مُنْخَفِضَةٌ هَذِهِ السَّنَةَ.", "Bu yıl petrol fiyatları düşük değil.", "Akılsız çoğul: لَيْسَتْ; haber mansûb."],
      ["هُوَ قَادِرٌ عَلَى الحَدِيثِ بِاللُّغَةِ العَرَبِيَّةِ بِسُهُولَةٍ.", "لَيْسَ قَادِرًا عَلَى الحَدِيثِ بِاللُّغَةِ العَرَبِيَّةِ بِسُهُولَةٍ.", "لَيْسَ هُوَ قَادِرٌ عَلَى الحَدِيثِ بِاللُّغَةِ العَرَبِيَّةِ بِسُهُولَةٍ.", "لَسْتُ قَادِرًا عَلَى الحَدِيثِ بِاللُّغَةِ العَرَبِيَّةِ بِسُهُولَةٍ.", "O Arapçayı kolayca konuşabilecek durumda değil.", "هُوَ, لَيْسَ’in içinde gizli; haber mansûb."],
      ["الطَّبِيبَانِ مَوْجُودَانِ فِي العِيَادَةِ الآنَ.", "لَيْسَ الطَّبِيبَانِ مَوْجُودَيْنِ فِي العِيَادَةِ الآنَ.", "لَيْسَ الطَّبِيبَانِ مَوْجُودَانِ فِي العِيَادَةِ الآنَ.", "لَيْسَا الطَّبِيبَانِ مَوْجُودَيْنِ فِي العِيَادَةِ الآنَ.", "İki doktor şu an muayenehanede değil.", "Fiil önde tekil; müsennâ haber yâ ile mansûb."],
      ["العُمَّالُ غَائِبُونَ بِسَبَبِ الإِضْرَابِ عَنِ العَمَلِ.", "مَا العُمَّالُ بِغَائِبِينَ بِسَبَبِ الإِضْرَابِ عَنِ العَمَلِ.", "مَا العُمَّالُ بِغَائِبُونَ بِسَبَبِ الإِضْرَابِ عَنِ العَمَلِ.", "لَيْسُوا العُمَّالُ غَائِبِينَ بِسَبَبِ الإِضْرَابِ عَنِ العَمَلِ.", "İşçiler grev yüzünden yok değil.", "Zâid bâ: haber lafzen mecrûr (yâ)."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · FİİL NEFYİ VE İ’RAB
{
  id: "u2", no: 2, ar: "نَفْيُ الفِعْلِ وَإِعْرَابُهُ", tr: "Fiilin Nefyi ve İ’rabı", short: "Fiil", col: "nasb", legend: ["mz", "nasb"],
  goals: ["Mâzîyi مَا ile, muzâriyi مَا، لَا، لَمْ، لَمَّا، لَنْ ile olumsuzlamak", "Edattan sonra fiilin i’rabını bilmek: merfû, meczûm, mansûb", "Cümlede olumsuzlanan kısmı (menfî) bulmak"],
  examples: [
    { s: "مَا:mz / قَدِمَ:nasb / حُسَيْنٌ مِنَ العِرَاقِ.:-", tr: "Hüseyin Irak’tan gelmedi. (mâzî)" },
    { s: "لَمْ:mz / يَأْكُلِ:nasb / الرَّجُلُ اللَّحْمَ.:-", tr: "Adam et yemedi. (meczûm, anlam geçmiş)", pair: "لَمَّا:mz / يَأْكُلِ:nasb / الرَّجُلُ اللَّحْمَ.:-", pairTr: "Adam henüz et yemedi." },
    { s: "لَا:mz / يَأْكُلُ:nasb / الرَّجُلُ اللَّحْمَ.:-", tr: "Adam et yemez. (merfû)", pair: "لَنْ:mz / نُسَافِرَ:nasb / يَوْمَ الأَحَدِ.:-", pairTr: "Pazar günü yolculuk yapmayacağız. (mansûb)" }
  ],
  rules: [
    { tr: "<span class=\"ar\">مَا</span> + mâzî: <span class=\"ar\">مَا قَدِمَ حُسَيْنٌ</span>." },
    { tr: "<span class=\"ar\">لَمْ</span> + muzâri: fiil <b>meczûm</b>, anlam geçmiş: <span class=\"ar\">لَمْ يَأْكُلْ = مَا أَكَلَ</span>." },
    { tr: "<span class=\"ar\">لَمَّا</span> + muzâri: fiil <b>meczûm</b>; geçmişten konuşma ânına kadar olmadığını (istiğrak) bildirir: “henüz …medi”." },
    { tr: "<span class=\"ar\">مَا</span> ve <span class=\"ar\">لَا</span> + muzâri: fiil <b>merfû</b> kalır; şimdiki / geniş zamanı olumsuzlar." },
    { tr: "<span class=\"ar\">لَنْ</span> + muzâri: fiil <b>mansûb</b>; geleceği olumsuzlar: <span class=\"ar\">سَنُسَافِرُ ← لَنْ نُسَافِرَ</span> (سَـ düşer)." },
    { tr: "Meczûm fiilden sonra “ال” gelirse iki sâkin buluşmasın diye esre alır: <span class=\"ar\">لَمْ يَأْكُلِ الرَّجُلُ</span>. Beş fiilde nûn düşer: <span class=\"ar\">لَمْ يَكْتُبُوا · لَنْ يَنْجَحُوا</span>." }
  ],
  kaide: [
    "٣ ـ تَدْخُلُ «مَا» عَلَى الفِعْلِ المَاضِي فَتَنْفِيهِ: مَا قَدِمَ حُسَيْنٌ.",
    "٤ ـ أ) تَدْخُلُ «لَمْ» عَلَى الفِعْلِ المُضَارِعِ فَتَنْفِيهِ بِمَعْنَى المَاضِي، فَيَكُونُ مَجْزُومًا: لَمْ يَأْكُلِ الرَّجُلُ اللَّحْمَ. ب) تَدْخُلُ «لَمَّا» عَلَى المُضَارِعِ فَتَنْفِيهِ بِمَعْنَى المَاضِي بِالاسْتِغْرَاقِ، أَيْ تَنْفِي حُصُولَ الفِعْلِ فِي المَاضِي حَتَّى زَمَنِ التَّكَلُّمِ، فَيَكُونُ مَجْزُومًا: لَمَّا يَأْكُلِ الرَّجُلُ اللَّحْمَ. جـ) تَدْخُلُ «مَا» عَلَى المُضَارِعِ فَتَنْفِيهِ فِي الحَاضِرِ: مَا يَأْكُلُ الرَّجُلُ اللَّحْمَ. د) تَدْخُلُ «لَا» عَلَى المُضَارِعِ فَتَنْفِيهِ أَيْضًا: لَا يَأْكُلُ الرَّجُلُ اللَّحْمَ. هـ) تَدْخُلُ «لَنْ» عَلَى المُضَارِعِ فَتَنْفِيهِ فِي المُسْتَقْبَلِ، فَيَكُونُ مَنْصُوبًا: لَنْ نُسَافِرَ يَوْمَ الأَحَدِ."
  ],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "x"], num: "٢", ar: "عَيِّنِ المَنْفِيَّ فِي الجُمَلِ التَّالِيَةِ", tr: "Nefy edatını ve olumsuzlanan kelimeyi (menfî) işaretle. Bir cümlede olumsuzluk yok!", items: [
      T("مَا:mz / تَنَاوَلَ:nasb / المَرِيضُ دَوَاءَهُ هَذَا اليَوْمَ.:x", "Hasta bugün ilacını almadı.", "Menfî mâzî fiil تَنَاوَلَ."),
      T("كَانَ النَّبِيُّ ﷺ:x / لَا:mz / يَظْلِمُ:nasb / أَحَدًا.:x", "Peygamber kimseye zulmetmezdi.", "Menfî يَظْلِمُ (merfû)."),
      T("لَنْ:mz / أُهْمِلَ:nasb / وَاجِبَاتِي نَحْوَ أُسْرَتِي أَبَدًا.:x", "Aileme karşı görevlerimi asla ihmal etmeyeceğim.", "لَنْ + mansûb."),
      T("لَمْ:mz / يَكُنْ:nasb / إِبْلِيسُ مِنَ السَّاجِدِينَ لِآدَمَ.:x", "İblis Âdem’e secde edenlerden olmadı.", "لَمْ + meczûm يَكُنْ."),
      T("لَيْسَتِ:mz / اللُّغَةُ العَرَبِيَّةُ:x / صَعْبَةً:nasb / كَمَا يَظُنُّ بَعْضُ النَّاسِ.:x", "Arapça bazı insanların sandığı gibi zor değil.", "Menfî haber صَعْبَةً."),
      T("يَجِبُ أَنْ يَتَّبِعَ الرَّجُلُ السَّمِينُ الحِمْيَةَ:x / كَمَا يَنْصَحُهُ الطَّبِيبُ.:x", "Şişman adamın, doktorun tavsiye ettiği gibi diyete uyması gerekir.", "Bu cümlede nefy edatı yok!"),
      T("لَنْ:mz / تَكْفِيَكَ:nasb / مُتَابَعَةُ الدُّرُوسِ فِي الكُلِّيَّةِ، بَلْ يَجِبُ التَّكْرَارُ فِي البَيْتِ.:x", "Fakültede dersleri takip etmek sana yetmez; evde de tekrar gerekir.", "لَنْ + mansûb تَكْفِيَ."),
      T("مَنْ:x / لَا:mz / يَرْحَمْ:nasb / لَا:mz / يُرْحَمْ:nasb", "Merhamet etmeyene merhamet edilmez. (Hadis)", "İki fiil de meczûm; onları مَنْ şartı cezmetti, لَا değil.")
    ]},
    { type: "classify", extra: true, opts: IRB3, ar: "مَا إِعْرَابُ الفِعْلِ بَعْدَ أَدَاةِ النَّفْيِ؟", tr: "Edattan sonraki koyu fiil merfû mu, meczûm mu, mansûb mu?", items: CL([
      [HL("مَا يَأْكُلُ الرَّجُلُ اللَّحْمَ", "يَأْكُلُ"), "r", "مَا fiile amel etmez."],
      [HL("لَا يَأْكُلُ الرَّجُلُ اللَّحْمَ", "يَأْكُلُ"), "r", "Nefy lâsı amel etmez."],
      [HL("لَمْ يَأْكُلِ الرَّجُلُ اللَّحْمَ", "يَأْكُلِ"), "c", "لَمْ cezmeder (esre iltika için)."],
      [HL("لَمَّا يَأْكُلِ الرَّجُلُ اللَّحْمَ", "يَأْكُلِ"), "c", "لَمَّا cezmeder."],
      [HL("لَنْ نُسَافِرَ يَوْمَ الأَحَدِ", "نُسَافِرَ"), "n", "لَنْ nasbeder."],
      [HL("لَنْ تُغْنِيَ عَنْهُمْ أَمْوَالُهُمْ", "تُغْنِيَ"), "n", "لَنْ nasbeder."],
      [HL("لَمْ يَكُنْ إِبْلِيسُ مِنَ السَّاجِدِينَ", "يَكُنْ"), "c", "Ecvef: illet harfi düştü."],
      [HL("كَانَ النَّبِيُّ ﷺ لَا يَظْلِمُ أَحَدًا", "يَظْلِمُ"), "r", "لَا amel etmez."],
      [HL("لَنْ أُهْمِلَ وَاجِبَاتِي", "أُهْمِلَ"), "n", "لَنْ nasbeder."],
      [HL("مَنْ لَا يَرْحَمْ لَا يُرْحَمْ", "يَرْحَمْ"), "c", "Meczûm ama sebebi مَنْ şartı, لَا değil."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الصِّيغَةَ الصَّحِيحَةَ لِلْفِعْلِ", tr: "Edattan sonra fiilin doğru biçimini seç (parantezde fiilin merfû hâli).", items: PL([
      ["لَمْ ___ الرَّجُلُ اللَّحْمَ. (يَأْكُلُ)", "يَأْكُلِ", "يَأْكُلُ", "يَأْكُلَ", "Adam et yemedi.", "Meczûm; ال’den önce esre."],
      ["لَمْ ___ إِبْلِيسُ مِنَ السَّاجِدِينَ. (يَكُونُ)", "يَكُنْ", "يَكُونُ", "يَكُونَ", "İblis secde edenlerden olmadı.", "Ecvef meczûm: vâv düşer."],
      ["لَمَّا ___ الضُّيُوفُ. (يَصِلُ)", "يَصِلِ", "يَصِلُ", "يَصِلَ", "Misafirler henüz gelmedi.", "Meczûm; ال’den önce esre."],
      ["لَمْ ___ الوَاجِبَ يَا طُلَّابُ. (تَكْتُبُونَ)", "تَكْتُبُوا", "تَكْتُبُونَ", "تَكْتُبُونَا", "Öğrenciler, ödevi yazmadınız.", "Beş fiil: nûn düşer."],
      ["لَنْ ___ يَوْمَ الأَحَدِ. (نُسَافِرُ)", "نُسَافِرَ", "نُسَافِرُ", "نُسَافِرْ", "Pazar günü yolculuk yapmayacağız.", "لَنْ: mansûb."],
      ["لَنْ ___ إِلَّا بِالجِدِّ. (يَنْجَحُونَ)", "يَنْجَحُوا", "يَنْجَحُونَ", "يَنْجَحُ", "Çalışmadan başaramayacaklar.", "Beş fiil mansûb: nûn düşer."],
      ["لَمْ ___ فِي هَذِهِ المَدِينَةِ. (أَسْكُنُ)", "أَسْكُنْ", "أَسْكُنُ", "أَسْكُنَ", "Bu şehirde oturmadım.", "Meczûm: sükûn."],
      ["لَمَّا ___ الطِّفْلَةُ. (تَنَامُ)", "تَنَمِ", "تَنَامُ", "تَنَامْ", "Kız çocuk henüz uyumadı.", "Ecvef meczûm: elif düşer; ال’den önce esre."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · DOĞRU EDATI SEÇ
{
  id: "u3", no: 3, ar: "اخْتِيَارُ أَدَاةِ النَّفْيِ", tr: "Doğru Nefy Edatını Seçmek", short: "Edat seç", col: "mi", legend: ["mz", "nasb"],
  goals: ["Cümlenin türüne ve zamanına göre uygun edatı seçmek", "Her edatın hangi zamanı olumsuzladığını bilmek", "Edattan sonra gerekli hareke değişikliğini yapmak"],
  examples: [
    { s: "لَيْسَ:mz / المُدِيرُ:- / مَوْجُودًا:nasb / فِي مَكْتَبِهِ.:-", tr: "Müdür odasında değil. (isim cümlesi)" },
    { s: "لَنْ:mz / يَزُورَ:nasb / أَخِي الطَّبِيبَ غَدًا.:-", tr: "Kardeşim yarın doktora gitmeyecek. (gelecek)" }
  ],
  rules: [
    { tr: "Seçim tablosu:", ex: ["İsim cümlesi → لَيْسَ ya da مَا (haber mansûb)", "Mâzî → مَا + mâzî · ya da لَمْ + meczûm muzâri", "“Henüz değil” → لَمَّا + meczûm muzâri", "Şimdiki / geniş → لَا ya da مَا + merfû muzâri", "Gelecek (سَـ / سَوْفَ) → لَنْ + mansûb muzâri"] },
    { tr: "<span class=\"ar\">لَمْ</span> ve <span class=\"ar\">لَنْ</span> mâzî fiile girmez; <span class=\"ar\">لَيْسَ</span> fiil cümlesine girmez." }
  ],
  kaide: ["أَدَوَاتُ النَّفْيِ: لَيْسَ وَمَا لِلْجُمْلَةِ الاسْمِيَّةِ، مَا لِلْمَاضِي، لَمْ وَلَمَّا لِلْمُضَارِعِ بِمَعْنَى المَاضِي، مَا وَلَا لِلْحَاضِرِ، لَنْ لِلْمُسْتَقْبَلِ."],
  ex: [
    { type: "pick", num: "٣", ar: "اخْتَرِ الأَدَاةَ المُنَاسِبَةَ لِنَفْيِ الجُمَلِ الآتِيَةِ", tr: "Cümleyi olumsuzlamaya uygun edatı seç.", items: PL([
      ["تَعِبَ مُحَمَّدٌ فِي الشَّرِكَةِ اليَوْمَ. (مَا – لَمْ – لَنْ)", "مَا", "لَمْ", "لَنْ", "Muhammed bugün şirkette yorulmadı.", "Mâzî: مَا تَعِبَ (لَمْ için لَمْ يَتْعَبْ olurdu)."],
      ["الشَّارِعُ مُزْدَحِمٌ بِالسَّيَّارَاتِ. (لَا – لَنْ – لَيْسَ)", "لَيْسَ", "لَا", "لَنْ", "Cadde arabalarla dolu değil.", "İsim cümlesi: لَيْسَ الشَّارِعُ مُزْدَحِمًا."],
      ["سَتَجْتَمِعُ لَجْنَةُ التَّحْقِيقِ غَدًا صَبَاحًا. (لَنْ – مَا – لَمْ)", "لَنْ", "مَا", "لَمْ", "Soruşturma komisyonu yarın sabah toplanmayacak.", "Gelecek: لَنْ تَجْتَمِعَ."],
      ["يُعَدُّ مُحَمَّدُ عَاكِفٍ مِنْ أَكْبَرِ الشُّعَرَاءِ الأَتْرَاكِ. (لَا – لَيْسَ – لَنْ)", "لَا", "لَيْسَ", "لَنْ", "Mehmed Âkif en büyük Türk şairlerinden sayılmaz.", "Geniş zaman: لَا يُعَدُّ."],
      ["قَوَاعِدُ اللُّغَةِ العَرَبِيَّةِ صَعْبَةٌ جِدًّا. (لَمْ – مَا – لَا)", "مَا", "لَمْ", "لَا", "Arapçanın kuralları çok zor değil.", "İsim cümlesi: مَا قَوَاعِدُ… صَعْبَةً."],
      ["سَيَرْجِعُ المُغْتَرِبُونَ إِلَى بِلَادِهِمْ. (لَيْسَ – لَنْ – لَمْ)", "لَنْ", "لَيْسَ", "لَمْ", "Gurbetçiler ülkelerine dönmeyecek.", "Gelecek: لَنْ يَرْجِعَ."],
      ["يَهْتَمُّ كَثِيرٌ مِنَ النَّاسِ بِصِحَّتِهِمْ. (لَمْ – مَا – لَا)", "لَا ya da مَا", "لَمْ", "yalnız مَا", "İnsanların çoğu sağlıklarına önem vermez.", "Şimdiki / geniş: لَا ve مَا ikisi de olur; لَمْ geçmiş yapar."]
    ])},
    { type: "pick", fill: true, num: "٤", ar: "امْلَإِ الفَرَاغَ بِأَدَاةِ النَّفْيِ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "Boşluğa fiilin ve haberin harekesine uyan edatı seç.", exHtml: "<span class=\"ar\">لَنْ يَزُورَ أَخِي الطَّبِيبَ غَدًا. · لَيْسَ المُدِيرُ مَوْجُودًا فِي مَكْتَبِهِ.</span>", items: PL([
      ["___ أُدَخِّنُ بَعْدَ اليَوْمِ أَبَدًا.", "لَا", "لَنْ", "لَمْ", "Bugünden sonra asla sigara içmem.", "أُدَخِّنُ merfû: لَا (لَنْ olsaydı أُدَخِّنَ)."],
      ["أَسْعَارُ الغَازِ ___ مُنْخَفِضَةً فِي تُرْكِيَا.", "لَيْسَتْ", "لَيْسَ", "لَمْ", "Türkiye’de gaz fiyatları düşük değil.", "Haber mansûb; akılsız çoğul: لَيْسَتْ."],
      ["___ يَشْتَرِكِ الطُّلَّابُ فِي المُحَاضَرَةِ أَمْسِ.", "لَمْ", "لَنْ", "لَا", "Öğrenciler dün konferansa katılmadı.", "Meczûm fiil + أَمْسِ: لَمْ."],
      ["___ أَنَا ذَاهِبًا إِلَى البَيْتِ هَذَا المَسَاءَ.", "مَا", "لَيْسَ", "لَمْ", "Bu akşam eve gitmiyorum.", "أَنَا açık: مَا (yoksa لَسْتُ ذَاهِبًا)."],
      ["فَرَّ اللِّصُّ وَ___ تَرَكَ وَرَاءَهُ شَيْئًا.", "مَا", "لَمْ", "لَنْ", "Hırsız kaçtı ve arkasında bir şey bırakmadı.", "Mâzî: مَا."],
      ["___ يَخَافُ مِنَ اللهِ إِلَّا الصَّالِحُونَ.", "لَا ya da مَا", "لَمْ", "لَنْ", "Allah’tan ancak sâlihler korkar.", "Merfû muzâri: لَا ya da مَا."],
      ["___ الطَّقْسُ مُعْتَدِلًا هَذِهِ السَّنَةَ.", "لَيْسَ ya da مَا", "لَمْ", "لَا", "Bu yıl hava ılıman değil.", "İsim cümlesi, haber mansûb."],
      ["___ نَجَحَ مِنَ الطُّلَّابِ إِلَّا قَلِيلٌ مِنْهُمْ.", "مَا", "لَمْ", "لَنْ", "Öğrencilerden azı dışında kimse kazanmadı.", "Mâzî: مَا; nâkıs istisnâ: قَلِيلٌ fâil."]
    ])},
    { type: "classify", extra: true, opts: ZMN, ar: "مَاذَا تَنْفِي الأَدَاةُ؟", tr: "Koyu edat neyi / hangi zamanı olumsuzluyor?", items: CL([
      [HL("لَيْسَ عَدْنَانُ مُدَرِّسًا", "لَيْسَ"), "i", "İsim cümlesi."],
      [HL("مَا عَدْنَانُ بِمُدَرِّسٍ", "مَا"), "i", "İsim cümlesi (zâid bâ)."],
      [HL("مَا قَدِمَ حُسَيْنٌ", "مَا"), "m", "Mâzî."],
      [HL("لَمْ يَأْكُلِ الرَّجُلُ اللَّحْمَ", "لَمْ"), "m", "Anlam: مَا أَكَلَ."],
      [HL("لَمَّا يَأْكُلِ الرَّجُلُ اللَّحْمَ", "لَمَّا"), "s", "Henüz yemedi."],
      [HL("مَا يَأْكُلُ الرَّجُلُ اللَّحْمَ", "مَا"), "h", "Şu an yemiyor."],
      [HL("لَا يَأْكُلُ الرَّجُلُ اللَّحْمَ", "لَا"), "h", "Yemez / yemiyor."],
      [HL("لَنْ نُسَافِرَ يَوْمَ الأَحَدِ", "لَنْ"), "g", "Gelecek."],
      [HL("لَمْ يَكُنْ إِبْلِيسُ مِنَ السَّاجِدِينَ", "لَمْ"), "m", "Geçmiş."],
      [HL("لَنْ أُهْمِلَ وَاجِبَاتِي أَبَدًا", "لَنْ"), "g", "Gelecek."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · OLUMLU ⇄ OLUMSUZ
{
  id: "u4", no: 4, ar: "الإِثْبَاتُ وَالنَّفْيُ", tr: "Olumlu ⇄ Olumsuz", short: "İspat", col: "ref", legend: ["mz", "nasb"],
  goals: ["Olumsuz cümleyi olumluya çevirmek: لَمْ أَسْكُنْ ← سَكَنْتُ", "Olumlu cümleyi verilen edatla olumsuzlamak", "Zaman ve i’rabı değiştirirken anlamı korumak"],
  examples: [
    { s: "لَمْ:mz / أَسْكُنْ:nasb / فِي هَذِهِ المَدِينَةِ شَهْرًا كَامِلًا.:-", tr: "Bu şehirde tam bir ay oturmadım.", pair: "سَكَنْتُ فِي هَذِهِ المَدِينَةِ شَهْرًا كَامِلًا.:-", pairTr: "Bu şehirde tam bir ay oturdum." }
  ],
  rules: [
    { tr: "İspat (olumluya çevirme):", ex: ["لَمْ / لَمَّا + muzâri → mâzî: لَمْ أَسْكُنْ ← سَكَنْتُ", "لَنْ + muzâri → سَـ + merfû muzâri: لَنْ أُمَارِسَ ← سَأُمَارِسُ", "لَا / مَا + muzâri → merfû muzâri: لَا يَقْرَأُ ← يَقْرَأُ", "مَا + mâzî → mâzî: مَا قَابَلْتُ ← قَابَلْتُ", "لَيْسَ / مَا + isim cümlesi → haber merfû: لَيْسَ الأَدَبُ مُتْعَةً ← الأَدَبُ مُتْعَةٌ"] },
    { tr: "Nefy (olumsuzlama): mâzî → <span class=\"ar\">مَا قَدِمَ</span> ya da <span class=\"ar\">لَمْ يَقْدَمْ</span>; gelecek → <span class=\"ar\">لَنْ</span>, سَـ düşer; isim cümlesi → <span class=\"ar\">لَيْسَ</span>, zamir varsa fiile bitişir: <span class=\"ar\">أَنَا مَشْغُولٌ ← لَسْتُ مَشْغُولًا</span>." }
  ],
  kaide: ["الإِثْبَاتُ عَكْسُ النَّفْيِ: لَمْ أَسْكُنْ فِي هَذِهِ المَدِينَةِ شَهْرًا كَامِلًا ← سَكَنْتُ فِي هَذِهِ المَدِينَةِ شَهْرًا كَامِلًا."],
  ex: [
    { type: "pick", num: "٦", ar: "أَثْبِتِ الجُمَلَ التَّالِيَةَ", tr: "Olumsuz cümlenin doğru olumlu karşılığını seç.", exHtml: "<span class=\"ar\">لَمْ أَسْكُنْ فِي هَذِهِ المَدِينَةِ شَهْرًا كَامِلًا. ← سَكَنْتُ فِي هَذِهِ المَدِينَةِ شَهْرًا كَامِلًا.</span>", items: PL([
      ["لَنْ أُمَارِسَ الرِّيَاضَةَ مُدَّةً طَوِيلَةً.", "سَأُمَارِسُ الرِّيَاضَةَ مُدَّةً طَوِيلَةً.", "مَارَسْتُ الرِّيَاضَةَ مُدَّةً طَوِيلَةً.", "سَأُمَارِسَ الرِّيَاضَةَ مُدَّةً طَوِيلَةً.", "Uzun süre spor yapacağım.", "لَنْ → سَـ + merfû."],
      ["لَا يَقْرَأُ النَّاسُ الرِّوَايَاتِ لِقَضَاءِ وَقْتِ الفَرَاغِ.", "يَقْرَأُ النَّاسُ الرِّوَايَاتِ لِقَضَاءِ وَقْتِ الفَرَاغِ.", "قَرَأَ النَّاسُ الرِّوَايَاتِ لِقَضَاءِ وَقْتِ الفَرَاغِ.", "يَقْرَأَ النَّاسُ الرِّوَايَاتِ لِقَضَاءِ وَقْتِ الفَرَاغِ.", "İnsanlar boş vakitlerini geçirmek için roman okur.", "لَا düşer, zaman aynı."],
      ["لَيْسَ الأَدَبُ مُتْعَةً فَحَسْبُ، بَلْ لَهُ فَوَائِدُ أُخْرَى.", "الأَدَبُ مُتْعَةٌ، وَلَهُ فَوَائِدُ أُخْرَى.", "الأَدَبُ مُتْعَةً، وَلَهُ فَوَائِدُ أُخْرَى.", "كَانَ الأَدَبُ مُتْعَةٌ، وَلَهُ فَوَائِدُ أُخْرَى.", "Edebiyat bir zevktir ve başka faydaları da vardır.", "لَيْسَ düşer: haber merfû (فَحَسْبُ / بَلْ anlam gereği düşer)."],
      ["لَمْ يُوَاجِهِ المُهَاجِرُونَ صُعُوبَةً فِي بِلَادِ الاغْتِرَابِ.", "وَاجَهَ المُهَاجِرُونَ صُعُوبَةً فِي بِلَادِ الاغْتِرَابِ.", "يُوَاجِهِ المُهَاجِرُونَ صُعُوبَةً فِي بِلَادِ الاغْتِرَابِ.", "وَاجَهُوا المُهَاجِرُونَ صُعُوبَةً فِي بِلَادِ الاغْتِرَابِ.", "Göçmenler gurbet ellerde zorlukla karşılaştı.", "لَمْ → mâzî; fiil önde tekil."],
      ["مَا يُرَاجِعُ حَسَنٌ دُرُوسَهُ فِي غُرْفَتِهِ.", "يُرَاجِعُ حَسَنٌ دُرُوسَهُ فِي غُرْفَتِهِ.", "رَاجَعَ حَسَنٌ دُرُوسَهُ فِي غُرْفَتِهِ.", "يُرَاجِعْ حَسَنٌ دُرُوسَهُ فِي غُرْفَتِهِ.", "Hasan derslerini odasında tekrar ediyor.", "مَا + muzâri (şimdiki) → muzâri."],
      ["مَا كُنْتُ أَعْرِفُ هَذِهِ الحَقِيقَةَ مِنْ قَبْلُ.", "كُنْتُ أَعْرِفُ هَذِهِ الحَقِيقَةَ مِنْ قَبْلُ.", "أَكُونُ أَعْرِفُ هَذِهِ الحَقِيقَةَ مِنْ قَبْلُ.", "كُنْتُ أَعْرِفَ هَذِهِ الحَقِيقَةَ مِنْ قَبْلُ.", "Bu gerçeği daha önce biliyordum.", "مَا düşer."],
      ["لَا تَكْفِي القِرَاءَةُ فَقَطْ لِتَعَلُّمِ اللُّغَةِ.", "تَكْفِي القِرَاءَةُ فَقَطْ لِتَعَلُّمِ اللُّغَةِ.", "تَكْفِ القِرَاءَةُ فَقَطْ لِتَعَلُّمِ اللُّغَةِ.", "كَفَتِ القِرَاءَةُ فَقَطْ لِتَعَلُّمِ اللُّغَةِ.", "Dil öğrenmek için yalnız okumak yeter.", "لَا düşer; nâkıs fiil تَكْفِي aynı kalır."],
      ["مَا قَابَلْتُ هَذَا الرَّجُلَ فِي حَيَاتِي.", "قَابَلْتُ هَذَا الرَّجُلَ فِي حَيَاتِي.", "أُقَابِلُ هَذَا الرَّجُلَ فِي حَيَاتِي.", "قَابَلْتَ هَذَا الرَّجُلَ فِي حَيَاتِي.", "Hayatımda bu adamla karşılaştım.", "مَا + mâzî → mâzî."]
    ])},
    { type: "pick", extra: true, ar: "انْفِ الجُمْلَةَ بِالأَدَاةِ الَّتِي بَيْنَ القَوْسَيْنِ", tr: "Cümleyi parantezdeki edatla doğru olumsuzlayan seçeneği bul.", items: PL([
      ["قَدِمَ حُسَيْنٌ مِنَ العِرَاقِ. (لَمْ)", "لَمْ يَقْدَمْ حُسَيْنٌ مِنَ العِرَاقِ.", "لَمْ قَدِمَ حُسَيْنٌ مِنَ العِرَاقِ.", "لَمْ يَقْدَمُ حُسَيْنٌ مِنَ العِرَاقِ.", "Hüseyin Irak’tan gelmedi.", "لَمْ mâzîye girmez: muzâri + cezm."],
      ["سَنُسَافِرُ يَوْمَ الأَحَدِ. (لَنْ)", "لَنْ نُسَافِرَ يَوْمَ الأَحَدِ.", "لَنْ سَنُسَافِرُ يَوْمَ الأَحَدِ.", "لَنْ نُسَافِرُ يَوْمَ الأَحَدِ.", "Pazar günü yolculuk yapmayacağız.", "سَـ düşer; fiil mansûb."],
      ["يَأْكُلُ الرَّجُلُ اللَّحْمَ. (لَمَّا)", "لَمَّا يَأْكُلِ الرَّجُلُ اللَّحْمَ.", "لَمَّا يَأْكُلُ الرَّجُلُ اللَّحْمَ.", "لَمَّا أَكَلَ الرَّجُلُ اللَّحْمَ.", "Adam henüz et yemedi.", "لَمَّا + meczûm muzâri (لَمَّا أَكَلَ “yiyince” olur)."],
      ["عَدْنَانُ مُدَرِّسٌ. (مَا + بِـ)", "مَا عَدْنَانُ بِمُدَرِّسٍ.", "مَا عَدْنَانُ بِمُدَرِّسًا.", "مَا عَدْنَانَ بِمُدَرِّسٍ.", "Adnan öğretmen değil.", "Zâid bâ: haber lafzen mecrûr."],
      ["أَنَا مَشْغُولٌ. (لَيْسَ)", "لَسْتُ مَشْغُولًا.", "لَيْسَ أَنَا مَشْغُولًا.", "لَسْتُ مَشْغُولٌ.", "Meşgul değilim.", "Zamir fiile bitişir; haber mansûb."],
      ["كَتَبَتِ الطَّالِبَاتُ الوَاجِبَ. (لَمْ)", "لَمْ تَكْتُبِ الطَّالِبَاتُ الوَاجِبَ.", "لَمْ تَكْتُبْنَ الطَّالِبَاتُ الوَاجِبَ.", "لَمْ كَتَبَتِ الطَّالِبَاتُ الوَاجِبَ.", "Kız öğrenciler ödevi yazmadı.", "Fiil önde tekil, meczûm; ال’den önce esre."],
      ["سَيَرْجِعُ المُغْتَرِبُونَ. (لَنْ)", "لَنْ يَرْجِعَ المُغْتَرِبُونَ.", "لَنْ يَرْجِعُوا المُغْتَرِبُونَ.", "لَنْ يَرْجِعُ المُغْتَرِبُونَ.", "Gurbetçiler dönmeyecek.", "Fiil önde tekil, mansûb."],
      ["هُمْ طُلَّابٌ. (لَيْسَ)", "لَيْسُوا طُلَّابًا.", "لَيْسَ هُمْ طُلَّابًا.", "لَيْسُوا طُلَّابٌ.", "Onlar öğrenci değil.", "هُمْ → لَيْسُوا; haber mansûb."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "النَّفْيُ فِي النُّصُوصِ", tr: "Metinde Nefy", short: "Okuma", col: "muz", legend: ["mz", "nasb"],
  goals: ["Nefy olan مَا / لَا / لَمَّا ile olmayanları ayırmak", "Metinde nefy edatlarını ve olumsuzlanan kelimeyi bulmak", "“Okuma bilmeyen öğretmen” hikâyesini okuyup anlamak"],
  examples: [
    { s: "كَانَ رَجُلٌ:- / لَا:mz / يَعْرِفُ:nasb / القِرَاءَةَ وَالكِتَابَةَ.:-", tr: "Okuma yazma bilmeyen bir adam vardı." },
    { s: "وَلَمَّا:- / لَمْ:mz / يَجِدْ:nasb / عَمَلًا…:-", tr: "İş bulamayınca… (buradaki لَمَّا “-ınca” demek; nefy değil)" }
  ],
  rules: [
    { tr: "Her <span class=\"ar\">مَا</span> nefy değildir: <span class=\"ar\">وَمَا تِلْكَ بِيَمِينِكَ؟</span> (soru), <span class=\"ar\">مَا عِنْدَ اللهِ خَيْرٌ</span> (ism-i mevsûl: “olan şey”)." },
    { tr: "<span class=\"ar\">لَمَّا</span> + mâzî “-ınca, -dığı zaman” demektir (zarf): <span class=\"ar\">لَمَّا رَأَيْتُكِ تَبْكِينَ</span>. Nefy olan <span class=\"ar\">لَمَّا</span> muzâriyi cezmeder: <span class=\"ar\">لَمَّا يَأْكُلْ</span>." },
    { tr: "<span class=\"ar\">لَا</span> + meczûm muzâri yasaktır (nehy): <span class=\"ar\">لَا تُسَافِرْ</span>. Nefy lâsından sonra fiil merfû kalır: <span class=\"ar\">لَا يُسَافِرُ</span>." }
  ],
  kaide: ["اقْرَأِ القِطْعَةَ التَّالِيَةَ، ثُمَّ عَيِّنْ أَدَوَاتِ النَّفْيِ وَالمَنْفِيَّ فِيهَا."],
  ex: [
    { type: "classify", extra: true, opts: NF, ar: "هَلِ الأَدَاةُ لِلنَّفْيِ؟", tr: "Koyu kelime nefy (olumsuzluk) edatı mı?", items: CL([
      [HL("وَمَا تِلْكَ بِيَمِينِكَ يَا مُوسَى", "مَا"), "d", "Soru edatı (istifhâm)."],
      [HL("قُلْ مَا عِنْدَ اللهِ خَيْرٌ", "مَا"), "d", "İsm-i mevsûl: “Allah katında olan”."],
      [HL("وَمَا هُمْ بِمُؤْمِنِينَ", "مَا"), "n", "Nefy; zâid bâ."],
      [HL("لَمَّا رَأَيْتُكِ تَبْكِينَ", "لَمَّا"), "d", "Zarf: “-ınca”."],
      [HL("لَمَّا يَأْكُلِ الرَّجُلُ اللَّحْمَ", "لَمَّا"), "n", "Nefy: “henüz”."],
      [HL("لَا تُسَافِرْ إِلَى العِرَاقِ", "لَا"), "d", "Nehy (yasak) lâsı: fiil meczûm."],
      [HL("لَا يُؤْمِنُ أَحَدُكُمْ", "لَا"), "n", "Nefy: fiil merfû."],
      [HL("لَنْ يُصِيبَنَا إِلَّا مَا كَتَبَ اللهُ لَنَا", "مَا"), "d", "İsm-i mevsûl."],
      [HL("مَا قَدِمَ حُسَيْنٌ", "مَا"), "n", "Nefy + mâzî."],
      [HL("مَاذَا تَأْكُلُ؟", "مَاذَا"), "d", "Soru."]
    ]) },
    { type: "reading", num: "٧", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ", tr: "Metni oku, soruları cevapla; sonra koyu kelime nefy edatı mı, olumsuzlanan mı, başka mı?", title: "المُعَلِّمُ الَّذِي لَا يَقْرَأُ",
      text: "كَانَ رَجُلٌ لَا يَعْرِفُ القِرَاءَةَ وَالكِتَابَةَ، وَلَمَّا لَمْ يَجِدْ عَمَلًا يَكْسِبُ مِنْهُ المَالَ الكَافِيَ فَتَحَ مَدْرَسَةً لِتَعْلِيمِ الصِّبْيَانِ، وَكَانَ يَنْصَحُ النَّاسَ بِتَعْلِيمِ أَوْلَادِهِمْ. ذَاتَ يَوْمٍ وَصَلَتْ إِلَى امْرَأَةٍ رِسَالَةٌ مِنْ زَوْجِهَا، فَأَخَذَتْهَا إِلَى المُعَلِّمِ حَتَّى يَقْرَأَهَا لَهَا. أَمْسَكَ الرَّجُلُ الرِّسَالَةَ وَبَدَأَ يَقْرَؤُهَا دُونَ أَنْ يَرْفَعَ صَوْتَهُ، فَظَنَّتِ المَرْأَةُ أَنَّ زَوْجَهَا قَدْ مَاتَ، فَقَالَتْ لِلْمُعَلِّمِ: «أَخْبِرْنِي يَا سَيِّدِي الحَقِيقَةَ كَامِلَةً». فَأَجَابَ الرَّجُلُ قَائِلًا: «أَنَا لَا أُرِيدُ يَا سَيِّدَتِي أَنْ أُسْمِعَكِ خَبَرًا سَيِّئًا». فَخَرَجَتِ المَرْأَةُ بَاكِيَةً.<br>وَكَانَ زَوْجُ المَرْأَةِ قَدْ أَرْسَلَ إِلَى أَخِيهِ بِأَنَّهُ سَيَصِلُ إِلَى البَلَدِ بَعْدَ أَيَّامٍ. عِنْدَمَا سَمِعَ أَخُوهُ بِمَا حَدَثَ بَيْنَ المَرْأَةِ وَالمُعَلِّمِ تَعَجَّبَ، وَذَهَبَ إِلَيْهَا وَأَخَذَ الرِّسَالَةَ، وَلَمَّا بَدَأَ يَقْرَؤُهَا ضَحِكَ، وَقَالَ لَهَا إِنَّ الرِّسَالَةَ لَيْسَ فِيهَا شَيْءٌ مِنْ مَوْتِ زَوْجِهَا، وَإِنَّهُ سَيَكُونُ عِنْدَهُمْ بَعْدَ أَيَّامٍ. فَذَهَبَتِ المَرْأَةُ مَعَ أَخِي زَوْجِهَا إِلَى المُعَلِّمِ الَّذِي لَا يَعْرِفُ القِرَاءَةَ وَالكِتَابَةَ فِي الحَقِيقَةِ، وَعِنْدَمَا وَصَلَتْ إِلَيْهِ سَأَلَتْهُ عَنْ سَبَبِ تَصَرُّفِهِ، فَأَجَابَ قَائِلًا: «لَمَّا رَأَيْتُكِ تَبْكِينَ ظَنَنْتُ أَنَّ زَوْجَكِ قَدْ مَاتَ».",
      textTr: "Okuma yazma bilmeyen bir adam vardı. Yeterli para kazanacağı bir iş bulamayınca çocuklara ders vermek için bir okul açtı ve insanlara çocuklarını okutmalarını öğütlerdi. Bir gün bir kadına kocasından mektup geldi; kadın mektubu kendisine okusun diye öğretmene götürdü. Adam mektubu aldı ve sesini yükseltmeden okumaya başladı. Kadın kocasının öldüğünü sandı ve öğretmene: “Efendim, bana gerçeği tamamen söyle” dedi. Adam: “Hanımefendi, size kötü bir haber duyurmak istemiyorum” diye cevap verdi. Kadın ağlayarak çıktı. Kadının kocası, kardeşine birkaç gün sonra memlekete varacağını yazmıştı. Kardeşi kadınla öğretmen arasında olanı duyunca şaşırdı; kadına gidip mektubu aldı. Okumaya başlayınca güldü ve ona, mektupta kocasının ölümüyle ilgili hiçbir şey olmadığını, birkaç gün sonra yanlarında olacağını söyledi. Kadın kocasının kardeşiyle birlikte, aslında okuma yazma bilmeyen öğretmene gitti ve ona davranışının sebebini sordu. Öğretmen: “Ağladığınızı görünce kocanızın öldüğünü sandım” diye cevap verdi.",
      qa: [
        { q: "لِمَاذَا فَتَحَ الرَّجُلُ مَدْرَسَةً؟", a: "لِأَنَّهُ لَمْ يَجِدْ عَمَلًا يَكْسِبُ مِنْهُ المَالَ الكَافِيَ.", tr: "Adam neden okul açtı? Yeterli para kazanacağı bir iş bulamadığı için." },
        { q: "لِمَاذَا أَخَذَتِ المَرْأَةُ الرِّسَالَةَ إِلَى المُعَلِّمِ؟", a: "لِيَقْرَأَهَا لَهَا.", tr: "Kadın mektubu neden öğretmene götürdü? Ona okusun diye." },
        { q: "لِمَاذَا ظَنَّتِ المَرْأَةُ أَنَّ زَوْجَهَا قَدْ مَاتَ؟", a: "لِأَنَّ المُعَلِّمَ قَرَأَ دُونَ أَنْ يَرْفَعَ صَوْتَهُ، وَقَالَ: لَا أُرِيدُ أَنْ أُسْمِعَكِ خَبَرًا سَيِّئًا.", tr: "Kadın neden kocasının öldüğünü sandı? Öğretmen sessizce okuyup kötü haber vermek istemediğini söylediği için." },
        { q: "مَاذَا كَانَ فِي الرِّسَالَةِ حَقِيقَةً؟", a: "أَنَّ زَوْجَهَا سَيَصِلُ بَعْدَ أَيَّامٍ.", tr: "Mektupta aslında ne vardı? Kocasının birkaç gün sonra geleceği." },
        { q: "بِمَاذَا أَجَابَ المُعَلِّمُ فِي النِّهَايَةِ؟", a: "لَمَّا رَأَيْتُكِ تَبْكِينَ ظَنَنْتُ أَنَّ زَوْجَكِ قَدْ مَاتَ.", tr: "Öğretmen sonunda ne cevap verdi? “Ağladığını görünce kocanın öldüğünü sandım.”" }
      ],
      cls: { opts: RL3, ar: "عَيِّنْ أَدَوَاتِ النَّفْيِ وَالمَنْفِيَّ", tr: "Koyu kelime ne?", items: [
        { s: HL("كَانَ رَجُلٌ لَا يَعْرِفُ القِرَاءَةَ", "لَا"), a: "e", why: "Nefy lâsı." },
        { s: HL("كَانَ رَجُلٌ لَا يَعْرِفُ القِرَاءَةَ", "يَعْرِفُ"), a: "n", why: "Olumsuzlanan fiil (merfû)." },
        { s: HL("وَلَمَّا لَمْ يَجِدْ عَمَلًا", "لَمَّا"), a: "x", why: "Zarf “-ınca”; nefy değil." },
        { s: HL("وَلَمَّا لَمْ يَجِدْ عَمَلًا", "لَمْ"), a: "e", why: "Nefy, cezm." },
        { s: HL("وَلَمَّا لَمْ يَجِدْ عَمَلًا", "يَجِدْ"), a: "n", why: "Meczûm muzâri." },
        { s: HL("أَنَا لَا أُرِيدُ يَا سَيِّدَتِي", "أُرِيدُ"), a: "n", why: "Olumsuzlanan fiil." },
        { s: HL("الرِّسَالَةَ لَيْسَ فِيهَا شَيْءٌ", "لَيْسَ"), a: "e", why: "لَيْسَ: haber öne geçmiş (فِيهَا)." },
        { s: HL("لَمَّا رَأَيْتُكِ تَبْكِينَ", "لَمَّا"), a: "x", why: "Zarf + mâzî: “görünce”." },
        { s: HL("بَدَأَ يَقْرَؤُهَا دُونَ أَنْ يَرْفَعَ صَوْتَهُ", "دُونَ"), a: "x", why: "Anlamı olumsuz ama nefy edatı değil (zarf)." },
        { s: HL("عِنْدَمَا سَمِعَ أَخُوهُ بِمَا حَدَثَ", "بِمَا"), a: "x", why: "مَا ism-i mevsûl." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["لَيْسَ عَدْنَانُ {مُدَرِّسًا}.", ["مُدَرِّسًا", "مُدَرِّسٌ", "مُدَرِّسٍ"], "لَيْسَ: haber mansûb", "Adnan öğretmen değil.", "u1"],
  ["مَا عَدْنَانُ {بِمُدَرِّسٍ}.", ["بِمُدَرِّسٍ", "بِمُدَرِّسًا", "بِمُدَرِّسٌ"], "zâid bâ: lafzen mecrûr", "Adnan öğretmen değil.", "u1"],
  ["{لَسْتُ} مَشْغُولًا.", ["لَسْتُ", "لَيْسَ", "لَسْتَ"], "أَنَا → لَسْتُ", "Meşgul değilim.", "u1"],
  ["{لَيْسُوا} طُلَّابًا.", ["لَيْسُوا", "لَيْسَ", "لَسْنَ"], "هُمْ → لَيْسُوا", "Onlar öğrenci değil.", "u1"],
  ["لَيْسَتِ اللُّغَةُ العَرَبِيَّةُ {صَعْبَةً}.", ["صَعْبَةً", "صَعْبَةٌ", "صَعْبَةٍ"], "haber mansûb", "Arapça zor değil.", "u1"],
  ["وَمَا هُمْ {بِمُؤْمِنِينَ}.", ["بِمُؤْمِنِينَ", "بِمُؤْمِنُونَ", "مُؤْمِنُونَ"], "zâid bâ: yâ ile", "Onlar mü’min değil.", "u1"],
  ["لَمْ {يَأْكُلِ} الرَّجُلُ اللَّحْمَ.", ["يَأْكُلِ", "يَأْكُلُ", "يَأْكُلَ"], "لَمْ: meczûm (esre iltika)", "Adam et yemedi.", "u2"],
  ["لَنْ {نُسَافِرَ} يَوْمَ الأَحَدِ.", ["نُسَافِرَ", "نُسَافِرُ", "نُسَافِرْ"], "لَنْ: mansûb", "Pazar yolculuk yapmayacağız.", "u2"],
  ["لَا {يَأْكُلُ} الرَّجُلُ اللَّحْمَ.", ["يَأْكُلُ", "يَأْكُلْ", "يَأْكُلَ"], "لَا: merfû", "Adam et yemez.", "u2"],
  ["لَمْ {يَكُنْ} إِبْلِيسُ مِنَ السَّاجِدِينَ.", ["يَكُنْ", "يَكُونُ", "يَكُونَ"], "ecvef meczûm", "İblis secde edenlerden olmadı.", "u2"],
  ["لَنْ {تُغْنِيَ} عَنْهُمْ أَمْوَالُهُمْ.", ["تُغْنِيَ", "تُغْنِي", "تُغْنِ"], "nâkıs mansûb: yâ fethalı", "Malları onlara fayda vermez.", "u2"],
  ["لَمَّا {تَنَمِ} الطِّفْلَةُ.", ["تَنَمِ", "تَنَامُ", "تَنَامَ"], "ecvef meczûm", "Kız çocuk henüz uyumadı.", "u2"],
  ["لَمْ {تَكْتُبُوا} الوَاجِبَ.", ["تَكْتُبُوا", "تَكْتُبُونَ", "تَكْتُبُونَا"], "beş fiil: nûn düşer", "Ödevi yazmadınız.", "u2"],
  ["{مَا} تَعِبَ مُحَمَّدٌ اليَوْمَ.", ["مَا", "لَمْ", "لَنْ"], "mâzî: مَا", "Muhammed bugün yorulmadı.", "u3"],
  ["{لَيْسَ} الشَّارِعُ مُزْدَحِمًا.", ["لَيْسَ", "لَا", "لَنْ"], "isim cümlesi: لَيْسَ", "Cadde kalabalık değil.", "u3"],
  ["{لَنْ} تَجْتَمِعَ اللَّجْنَةُ غَدًا.", ["لَنْ", "لَمْ", "مَا"], "gelecek + mansûb: لَنْ", "Komisyon yarın toplanmayacak.", "u3"],
  ["{لَمْ} يَشْتَرِكِ الطُّلَّابُ أَمْسِ.", ["لَمْ", "لَنْ", "لَا"], "meczûm + geçmiş: لَمْ", "Öğrenciler dün katılmadı.", "u3"],
  ["أَسْعَارُ الغَازِ {لَيْسَتْ} مُنْخَفِضَةً.", ["لَيْسَتْ", "لَيْسَ", "لَمْ"], "akılsız çoğul: لَيْسَتْ", "Gaz fiyatları düşük değil.", "u3"],
  ["لَنْ أُمَارِسَ ← {سَأُمَارِسُ} الرِّيَاضَةَ.", ["سَأُمَارِسُ", "سَأُمَارِسَ", "مَارَسْتُ"], "ispat: سَـ + merfû", "Spor yapacağım.", "u4"],
  ["لَمْ أَسْكُنْ ← {سَكَنْتُ} فِي هَذِهِ المَدِينَةِ.", ["سَكَنْتُ", "أَسْكُنُ", "سَأَسْكُنُ"], "ispat: mâzî", "Bu şehirde oturdum.", "u4"],
  ["لَيْسَ الأَدَبُ مُتْعَةً ← الأَدَبُ {مُتْعَةٌ}.", ["مُتْعَةٌ", "مُتْعَةً", "مُتْعَةٍ"], "ispat: haber merfû", "Edebiyat bir zevktir.", "u4"],
  ["قَدِمَ حُسَيْنٌ ← لَمْ {يَقْدَمْ} حُسَيْنٌ.", ["يَقْدَمْ", "قَدِمَ", "يَقْدَمُ"], "لَمْ + meczûm muzâri", "Hüseyin gelmedi.", "u4"],
  ["كَانَ رَجُلٌ {لَا} يَعْرِفُ القِرَاءَةَ.", ["لَا", "لَمْ", "لَنْ"], "merfû fiil: لَا", "Okuma bilmeyen bir adam vardı.", "u5"],
  ["وَلَمَّا لَمْ {يَجِدْ} عَمَلًا.", ["يَجِدْ", "يَجِدُ", "يَجِدَ"], "لَمْ: meczûm", "İş bulamayınca.", "u5"],
  ["الرِّسَالَةُ {لَيْسَ} فِيهَا شَيْءٌ.", ["لَيْسَ", "لَمْ", "لَنْ"], "haber öne geçmiş", "Mektupta hiçbir şey yok.", "u5"],
  ["أَنَا {لَا} أُرِيدُ أَنْ أُسْمِعَكِ خَبَرًا سَيِّئًا.", ["لَا", "لَنْ", "لَمْ"], "merfû fiil: لَا", "Sana kötü haber duyurmak istemiyorum.", "u5"]
];
// Olumsuzla / olumla: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["عَدْنَانُ مُدَرِّسٌ ← لَيْسَ", "لَيْسَ عَدْنَانُ مُدَرِّسًا", "لَيْسَ عَدْنَانُ مُدَرِّسٌ", "لَيْسَ عَدْنَانَ مُدَرِّسًا", "haber mansûb", "u1"],
  ["عَدْنَانُ مُدَرِّسٌ ← مَا + بِـ", "مَا عَدْنَانُ بِمُدَرِّسٍ", "مَا عَدْنَانُ بِمُدَرِّسًا", "مَا عَدْنَانُ مُدَرِّسٌ", "zâid bâ: mecrûr", "u1"],
  ["أَنَا مَشْغُولٌ ← لَيْسَ", "لَسْتُ مَشْغُولًا", "لَيْسَ أَنَا مَشْغُولًا", "لَسْتُ مَشْغُولٌ", "zamir fiile bitişir", "u1"],
  ["نَحْنُ مُتْعَبُونَ ← لَيْسَ", "لَسْنَا مُتْعَبِينَ", "لَسْنَا مُتْعَبُونَ", "لَيْسَ نَحْنُ مُتْعَبِينَ", "haber yâ ile mansûb", "u1"],
  ["قَدِمَ حُسَيْنٌ ← لَمْ", "لَمْ يَقْدَمْ حُسَيْنٌ", "لَمْ قَدِمَ حُسَيْنٌ", "لَمْ يَقْدَمُ حُسَيْنٌ", "muzâri + cezm", "u2"],
  ["يَأْكُلُ الرَّجُلُ اللَّحْمَ ← لَنْ", "لَنْ يَأْكُلَ الرَّجُلُ اللَّحْمَ", "لَنْ يَأْكُلُ الرَّجُلُ اللَّحْمَ", "لَنْ يَأْكُلْ الرَّجُلُ اللَّحْمَ", "لَنْ: mansûb", "u2"],
  ["يَأْكُلُ الرَّجُلُ اللَّحْمَ ← لَمَّا", "لَمَّا يَأْكُلِ الرَّجُلُ اللَّحْمَ", "لَمَّا يَأْكُلُ الرَّجُلُ اللَّحْمَ", "لَمَّا أَكَلَ الرَّجُلُ اللَّحْمَ", "لَمَّا: meczûm", "u2"],
  ["يَكْتُبُونَ الوَاجِبَ ← لَمْ", "لَمْ يَكْتُبُوا الوَاجِبَ", "لَمْ يَكْتُبُونَ الوَاجِبَ", "لَمْ كَتَبُوا الوَاجِبَ", "beş fiil: nûn düşer", "u2"],
  ["سَنُسَافِرُ يَوْمَ الأَحَدِ ← nefy", "لَنْ نُسَافِرَ يَوْمَ الأَحَدِ", "لَمْ نُسَافِرْ يَوْمَ الأَحَدِ", "لَنْ سَنُسَافِرُ يَوْمَ الأَحَدِ", "gelecek: لَنْ", "u3"],
  ["الشَّارِعُ مُزْدَحِمٌ ← nefy", "لَيْسَ الشَّارِعُ مُزْدَحِمًا", "لَا الشَّارِعُ مُزْدَحِمٌ", "لَمْ الشَّارِعُ مُزْدَحِمًا", "isim cümlesi: لَيْسَ", "u3"],
  ["تَعِبَ مُحَمَّدٌ ← nefy", "مَا تَعِبَ مُحَمَّدٌ", "لَنْ تَعِبَ مُحَمَّدٌ", "لَمْ تَعِبَ مُحَمَّدٌ", "mâzî: مَا", "u3"],
  ["لَنْ أُمَارِسَ الرِّيَاضَةَ ← ispat", "سَأُمَارِسُ الرِّيَاضَةَ", "سَأُمَارِسَ الرِّيَاضَةَ", "مَارَسْتُ الرِّيَاضَةَ", "سَـ + merfû", "u4"],
  ["لَمْ يُوَاجِهِ المُهَاجِرُونَ صُعُوبَةً ← ispat", "وَاجَهَ المُهَاجِرُونَ صُعُوبَةً", "يُوَاجِهِ المُهَاجِرُونَ صُعُوبَةً", "وَاجَهُوا المُهَاجِرُونَ صُعُوبَةً", "لَمْ → mâzî", "u4"],
  ["لَيْسَتِ الحَيَاةُ هَادِئَةً ← ispat", "الحَيَاةُ هَادِئَةٌ", "الحَيَاةُ هَادِئَةً", "الحَيَاةَ هَادِئَةٌ", "haber merfû", "u4"],
  ["مَا قَابَلْتُ هَذَا الرَّجُلَ ← ispat", "قَابَلْتُ هَذَا الرَّجُلَ", "أُقَابِلُ هَذَا الرَّجُلَ", "قَابَلْتَ هَذَا الرَّجُلَ", "مَا düşer", "u4"]
];
// Hangi zaman? hız oyunu
var NOUN_LIST = UNITS[2].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
[[HL("لَمْ يَشْتَرِكِ الطُّلَّابُ أَمْسِ", "لَمْ"), "m", "Geçmiş."], [HL("لَيْسَتِ اللُّغَةُ صَعْبَةً", "لَيْسَتِ"), "i", "İsim cümlesi."], [HL("لَنْ تَجْتَمِعَ اللَّجْنَةُ غَدًا", "لَنْ"), "g", "Gelecek."],
 [HL("لَا يُؤْمِنُ أَحَدُكُمْ", "لَا"), "h", "Geniş zaman."], [HL("مَا تَنَاوَلَ المَرِيضُ دَوَاءَهُ", "مَا"), "m", "Mâzî."], [HL("لَمَّا يَصِلِ الضُّيُوفُ", "لَمَّا"), "s", "Henüz gelmediler."],
 [HL("وَمَا هُمْ بِمُؤْمِنِينَ", "مَا"), "i", "İsim cümlesi."], [HL("مَا يُرَاجِعُ حَسَنٌ دُرُوسَهُ", "مَا"), "h", "Şimdiki zaman."]
].forEach(function (x) { NOUN_LIST.push(x); });
var SP_M = ZMN;
// Nefy mi değil mi? hız oyunu
var MM_OPTS = NF;
var MM_LIST = UNITS[4].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
[[HL("لَسْتَ عَلَيْهِمْ بِمُسَيْطِرٍ", "لَسْتَ"), "n", "لَيْسَ + تَ."], [HL("لَا تَقْرَبُوا الصَّلَاةَ", "لَا"), "d", "Nehy: fiil meczûm."], [HL("لَنْ أُهْمِلَ وَاجِبَاتِي", "لَنْ"), "n", "Nefy."],
 [HL("بِمَا حَدَثَ بَيْنَهُمَا", "مَا"), "d", "İsm-i mevsûl."], [HL("لَمَّا بَدَأَ يَقْرَؤُهَا ضَحِكَ", "لَمَّا"), "d", "Zarf: “başlayınca”."], [HL("لَمْ يَكُنْ إِبْلِيسُ مِنَ السَّاجِدِينَ", "لَمْ"), "n", "Nefy."]
].forEach(function (x) { MM_LIST.push(x); });
var HAFIZA = {
  ls: { name: "Zamir ↔ لَيْسَ", pairs: [["أَنَا", "لَسْتُ"], ["نَحْنُ", "لَسْنَا"], ["أَنْتَ", "لَسْتَ"], ["أَنْتِ", "لَسْتِ"], ["أَنْتُمْ", "لَسْتُمْ"], ["هِيَ", "لَيْسَتْ"], ["هُمْ", "لَيْسُوا"], ["هُنَّ", "لَسْنَ"]] },
  ed: { name: "Edat ↔ etkisi", pairs: [["لَيْسَ", "isim cümlesi · haber mansûb"], ["مَا + mâzî", "geçmiş"], ["لَمْ", "meczûm · geçmiş"], ["لَمَّا", "meczûm · henüz"], ["لَا", "merfû · geniş zaman"], ["لَنْ", "mansûb · gelecek"], ["بِـ zâide", "nefyi pekiştirir"]] },
  ng: { name: "Olumlu ↔ olumsuz", pairs: [["عَدْنَانُ مُدَرِّسٌ", "لَيْسَ عَدْنَانُ مُدَرِّسًا"], ["قَدِمَ حُسَيْنٌ", "مَا قَدِمَ حُسَيْنٌ"], ["أَكَلَ الرَّجُلُ", "لَمْ يَأْكُلِ الرَّجُلُ"], ["سَنُسَافِرُ", "لَنْ نُسَافِرَ"], ["يَقْرَأُ النَّاسُ", "لَا يَقْرَأُ النَّاسُ"], ["أَنَا مَشْغُولٌ", "لَسْتُ مَشْغُولًا"], ["سَكَنْتُ", "لَمْ أَسْكُنْ"]] }
};
var KARTLAR = [
  ["Nefy edatları?", "مَا، لَيْسَ، لَمْ، لَمَّا، لَا، لَنْ"],
  ["İsim cümlesi nasıl olumsuzlanır?", "لَيْسَ ya da مَا; haber mansûb: لَيْسَ عَدْنَانُ مُدَرِّسًا"],
  ["Zâid bâ?", "لَيْسَ / مَا haberine gelir, nefyi pekiştirir: مَا عَدْنَانُ بِمُدَرِّسٍ"],
  ["لَيْسَ + أَنَا?", "لَسْتُ · نَحْنُ → لَسْنَا · هُمْ → لَيْسُوا"],
  ["Mâzî nasıl olumsuzlanır?", "مَا قَدِمَ ya da لَمْ يَقْدَمْ"],
  ["لَمْ?", "Muzâriyi cezmeder, anlam geçmiş: لَمْ يَأْكُلْ = مَا أَكَلَ"],
  ["لَمَّا?", "Meczûm; “henüz …medi”: لَمَّا يَأْكُلْ"],
  ["لَا ve مَا + muzâri?", "Fiil merfû; şimdiki / geniş zaman."],
  ["لَنْ?", "Muzâriyi nasbeder, geleceği olumsuzlar: لَنْ نُسَافِرَ"],
  ["لَمْ يَأْكُلْ الرَّجُلُ doğru mu?", "Hayır: iki sâkin → لَمْ يَأْكُلِ الرَّجُلُ"],
  ["وَمَا تِلْكَ بِيَمِينِكَ?", "Bu مَا soru edatı, nefy değil."],
  ["لَمَّا رَأَيْتُكِ?", "لَمَّا + mâzî: “görünce” (zarf), nefy değil."]
];
