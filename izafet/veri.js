// ================= VERİ: İzafet ve İ'rabı (kitaptaki ders) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "ref.mübtedâ" gibi yazılırsa etikete görev eklenir.
var ROLES = {
  mz: { ar: "مُضَافٌ", tr: "Muzâf" }, mi: { ar: "مُضَافٌ إِلَيْهِ", tr: "Muzâfun ileyh" },
  ref: { ar: "مَرْفُوعٌ", tr: "Merfû" }, nasb: { ar: "مَنْصُوبٌ", tr: "Mansûb" }, cerr: { ar: "مَجْرُورٌ", tr: "Mecrûr" },
  mus: { ar: "مُثَنًّى", tr: "Müsennâ" }, mzs: { ar: "جَمْعُ مُذَكَّرٍ سَالِمٌ", tr: "Cem-i müz. sâlim" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cerr", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var YER_OPTS = [["mz", "Muzâf", "مُضَافٌ", "mz"], ["mi", "Muzâfun ileyh", "مُضَافٌ إِلَيْهِ", "mi"]];
var TUR_OPTS = [["mus", "Müsennâ", "مُثَنًّى", "mus"], ["mzs", "Cem-i müz. sâlim", "جَمْعُ مُذَكَّرٍ سَالِمٌ", "mzs"]];
var DY_OPTS = [["d", "Doğru", "صَحِيحٌ", "good"], ["y", "Yanlış", "خَطَأٌ", "bad"]];

// W: okuma cümlesi. [kelime] hedef, {kelime} seçilemeyen düz metin, _ iki kelimeyi tek parça yapar.
function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^\[(.*)\](.*)$/.exec(w), p = /^\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
// önce müsennâ, sonra cem: aynı kutular, farklı doğru
function P2(q, parts, okM, okC, trM, trC, whyM, whyC) {
  return [CB(q + " <b class=\"r-mus\">→ müsennâ</b>", parts, okM, trM, whyM), CB(q + " <b class=\"r-mzs\">→ cem</b>", parts, okC, trC, whyC)];
}
function IR(s, t, c, why, tr) { return { s: s, t: t, c: c, why: why, tr: tr }; }

var UNITS = [
// ---------------------------------------------------------------- 1 · İZAFET TERKİBİ
{
  id: "u1", no: 1, ar: "تَرْكِيبُ الإِضَافَةِ", tr: "İzafet Terkibi", short: "İzafet", col: "mz", legend: ["mz", "mi"],
  goals: ["İki ismin yan yana gelip izafet kurduğunu görmek", "Muzâfın ال ve tenvin almadığını oturtmak", "Muzâfun ileyhin daima mecrûr olduğunu bilmek", "Soru cevaplarken izafet kurabilmek"],
  examples: [
    { s: "كِتَابُ:mz / مُحَمَّدٍ:mi", tr: "Muhammed'in kitabı", why: "كِتَابُ muzâf (ال yok, tenvin yok); مُحَمَّدٍ muzâfun ileyh (mecrûr)." },
    { s: "مَكْتَبُ:mz / التَّاجِرِ:mi", tr: "tüccarın ofisi", why: "مَكْتَبٌ + التَّاجِرُ ← مَكْتَبُ التَّاجِرِ: muzâfın tenvini gitti, muzâfun ileyh kesre aldı." },
    { s: "قَهْوَةُ:mz / الضَّيْفِ:mi / جَاهِزَةٌ:-", tr: "Misafirin kahvesi hazır.", why: "Türkçede önce sahip gelir (misafirin kahvesi); Arapçada önce sahip olunan (قَهْوَةُ الضَّيْفِ)." }
  ],
  rules: [
    { tr: "İki isim birleşip tek bir anlam kurarsa buna <b>izafet</b> denir. Birinci isim <b class=\"r-mz\">muzâf</b>, ikinci isim <b class=\"r-mi\">muzâfun ileyh</b>tir.", ex: ["كِتَابُ مُحَمَّدٍ", "بَابُ البَيْتِ"] },
    { tr: "<b class=\"r-mz\">Muzâf</b> ال almaz ve tenvin almaz.", ex: ["مَكْتَبٌ ← مَكْتَبُ التَّاجِرِ", "الكِتَابُ ← كِتَابُ مُحَمَّدٍ"] },
    { tr: "<b class=\"r-mi\">Muzâfun ileyh</b> daima mecrûrdur; müfred isimde alameti kesredir.", ex: ["التَّاجِرُ ← مَكْتَبُ التَّاجِرِ"] },
    { tr: "Muzâfun ileyh ال'siz bir isimse tenvin alabilir: <span class=\"ar\">مُحَمَّدٍ، عَلِيٍّ، طَالِبٍ</span>. Tenvin yasağı yalnız muzâf içindir.", ex: ["نَظَّارَةُ عَلِيٍّ", "حَقِيبَةُ طَالِبٍ"] },
    { tr: "Türkçeyle karşılaştır: Türkçede sahip önce gelir (<i>tüccarın ofisi</i>), Arapçada sahip olunan önce gelir (<span class=\"ar\">مَكْتَبُ التَّاجِرِ</span>)." }
  ],
  kaide: [
    "١ ـ إِذَا اجْتَمَعَ اسْمَانِ فَالتَّرْكِيبُ يَكُونُ «إِضَافَةً»، فَالاسْمُ الأَوَّلُ «مُضَافٌ»، وَالاسْمُ الثَّانِي «مُضَافٌ إِلَيْهِ». مِثَالٌ: كِتَابُ مُحَمَّدٍ.",
    "٢ ـ لَا يَقْبَلُ المُضَافُ «ال» التَّعْرِيفِ، وَلَا يَقْبَلُ أَيْضًا التَّنْوِينَ. مِثَالٌ: مَكْتَبٌ، التَّاجِرُ ← مَكْتَبُ التَّاجِرِ.",
    "٤ ـ المُضَافُ إِلَيْهِ مَجْرُورٌ، وَعَلَامَةُ الجَرِّ لِلاسْمِ المُفْرَدِ الكَسْرَةُ. مِثَالٌ: مَكْتَبٌ، التَّاجِرُ ← مَكْتَبُ التَّاجِرِ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "اخْتَرْ لِلْفَرَاغِ مُضَافًا إِلَيْهِ مُنَاسِبًا ثُمَّ اضْبِطْ آخِرَهُ", tr: "Anlama uyan muzâfun ileyhi seç. Dikkat: doğru kelimenin doğru harekesini seçmelisin.", items: [
      { q: "حَضَرَ سَائِقُ ___ إِلَى المَحَطَّةِ.", o: ["الطَّرِيقِ", "السَّيَّارَةُ", "السَّيَّارَةِ", "السَّيَّارَةَ", "الشَّجَرَةِ"], a: 2, tr: "Arabanın şoförü istasyona geldi.", why: "Anlam: arabanın şoförü. Muzâfun ileyh mecrûr → kesre." },
      { q: "شَرِبَ الضَّيْفُ عَصِيرَ ___.", o: ["البُرْتُقَالُ", "البُرْتُقَالِ", "السَّمَكِ", "الزَّهْرَةِ", "البُرْتُقَالَ"], a: 1, tr: "Misafir portakal suyu içti.", why: "Anlam: portakal suyu. Muzâfun ileyh → kesre." },
      { q: "فَهِمْتُ دَرْسَ ___.", o: ["المَلْعَبِ", "المَاءِ", "القَوَاعِدَ", "القَوَاعِدِ", "القَوَاعِدُ"], a: 3, tr: "Gramer (kurallar) dersini anladım.", why: "Anlam: kurallar dersi. Muzâfun ileyh → kesre." },
      { q: "تَعَلَّمَتِ الطَّالِبَةُ كِتَابَةَ ___.", o: ["الحُرُوفِ", "الحُرُوفُ", "الحُرُوفَ", "الطَّعَامِ", "الشَّرَابِ"], a: 0, tr: "Kız öğrenci harflerin yazılışını öğrendi.", why: "Anlam: harflerin yazılışı. Muzâfun ileyh → kesre." },
      { q: "حَمَلَتْ خَدِيجَةُ حَقِيبَةَ ___.", o: ["الكُرْسِيِّ", "الجُمْلَةِ", "المَدْرَسَةُ", "المَدْرَسَةَ", "المَدْرَسَةِ"], a: 4, tr: "Hatice okul çantasını taşıdı.", why: "Anlam: okul çantası. Muzâfun ileyh → kesre." },
      { q: "يُنَظِّفُ سَلِيمٌ غُرْفَةَ ___.", o: ["القَلَمِ", "الجُلُوسَ", "الفُلُوسِ", "الجُلُوسِ", "الجُلُوسُ"], a: 3, tr: "Selim oturma odasını temizliyor.", why: "غُرْفَةُ الجُلُوسِ: oturma odası. Muzâfun ileyh → kesre." },
      { q: "يَسْكُنُ حَسَنٌ فِي حَيِّ ___.", o: ["المَطَارِ", "المَطَارُ", "الطَّائِرَةِ", "الطَّائِرَاتِ", "المَطَارَ"], a: 0, tr: "Hasan havalimanı mahallesinde oturuyor.", why: "حَيُّ المَطَارِ: havalimanı mahallesi. Muzâfun ileyh → kesre." },
      { q: "يَقْرَأُ مُحَمَّدٌ قِصَّةَ ___.", o: ["الشَّجَرِ", "البَطَلُ", "البَطَلَ", "البَطَلِ", "الحِكَايَةِ"], a: 3, tr: "Muhammed kahramanın hikâyesini okuyor.", why: "Anlam: kahramanın hikâyesi. (قِصَّةُ الحِكَايَةِ anlamsızdır.) Muzâfun ileyh → kesre." }
    ]},
    { type: "combo", num: "٣", ar: "أَجِبْ عَنِ الأَسْئِلَةِ كَمَا فِي المِثَالِ", tr: "Parantezdeki iki kelimeyle izafet kurarak cevap ver. Muzâftan ال ve tenvini at, muzâfun ileyhi mecrûr yap.",
      exHtml: "<span class=\"ar\">أَيْنَ جَلَسَتْ نِهَالُ؟ (الغُرْفَة، المُدِير) ← جَلَسَتْ نِهَالُ فِي غُرْفَةِ المُدِيرِ.</span>", items: [
      CB("أَيْنَ يَعْمَلُ خَلِيلٌ؟ <span class=\"muted\">(المَصْنَع، المَلَابِس)</span>", ["يَعْمَلُ خَلِيلٌ فِي", ["المَصْنَعِ", "مَصْنَعِ", "مَصْنَعٍ", "مَصْنَعُ"], ["المَلَابِسُ", "المَلَابِسَ", "المَلَابِسِ"]], [1, 2], "Halil konfeksiyon (elbise) fabrikasında çalışır.", "فِي'den sonra muzâf mecrûr; ال ve tenvin yok. Muzâfun ileyh de mecrûr."),
      CB("إِلَى أَيْنَ يَنْظُرُ عَلِيٌّ؟ <span class=\"muted\">(الصُّورَة، الغَابَة)</span>", ["يَنْظُرُ عَلِيٌّ إِلَى", ["الصُّورَةِ", "صُورَةِ", "صُورَةٍ", "صُورَةُ"], ["الغَابَةُ", "الغَابَةَ", "الغَابَةِ"]], [1, 2], "Ali ormanın resmine bakıyor.", "إِلَى'dan sonra muzâf mecrûr; muzâfun ileyh mecrûr."),
      CB("لِمَنْ كَتَبَتْ بُشْرَى الرِّسَالَةَ؟ <span class=\"muted\">(الوَالِدَة، مُحَمَّد)</span>", ["كَتَبَتْ بُشْرَى الرِّسَالَةَ", ["لِلْوَالِدَةِ", "لِوَالِدَةِ", "لِوَالِدَةٍ"], ["مُحَمَّدٌ", "مُحَمَّدًا", "مُحَمَّدٍ"]], [1, 2], "Büşra mektubu Muhammed'in annesine yazdı.", "لِـ'den sonra muzâf mecrûr. مُحَمَّدٍ özel isim: muzâfun ileyh olarak tenvinli kesre alır."),
      CB("مِنْ أَيْنَ رَجَعَتْ بَتُولُ؟ <span class=\"muted\">(الزِّيَارَة، المَرِيض)</span>", ["رَجَعَتْ بَتُولُ مِنْ", ["الزِّيَارَةِ", "زِيَارَةِ", "زِيَارَةٍ", "زِيَارَةُ"], ["المَرِيضُ", "المَرِيضَ", "المَرِيضِ"]], [1, 2], "Betül hasta ziyaretinden döndü.", "مِنْ'den sonra muzâf mecrûr; muzâfun ileyh mecrûr."),
      CB("عَنْ أَيِّ شَيْءٍ تَسْأَلُ البِنْتُ؟ <span class=\"muted\">(المَصْرُوف، الجَيْب)</span>", ["تَسْأَلُ البِنْتُ عَنْ", ["المَصْرُوفِ", "مَصْرُوفِ", "مَصْرُوفٍ", "مَصْرُوفُ"], ["الجَيْبُ", "الجَيْبَ", "الجَيْبِ"]], [1, 2], "Kız harçlığı soruyor.", "مَصْرُوفُ الجَيْبِ: cep harçlığı. عَنْ'dan sonra mecrûr."),
      CB("مُنْذُ مَتَى يَبْكِي الطِّفْلُ؟ <span class=\"muted\">(الوَقْت، الظُّهْر)</span>", ["يَبْكِي الطِّفْلُ مُنْذُ", ["الوَقْتِ", "وَقْتِ", "وَقْتٍ", "وَقْتُ"], ["الظُّهْرُ", "الظُّهْرَ", "الظُّهْرِ"]], [1, 2], "Çocuk öğle vaktinden beri ağlıyor.", "مُنْذُ burada harf-i cer gibidir: muzâf mecrûr; muzâfun ileyh mecrûr."),
      CB("مَاذَا أَكَلَ الوَلَدُ؟ <span class=\"muted\">(كُنَافَة، أَنْطَاكْيَا)</span>", ["أَكَلَ الوَلَدُ", ["كُنَافَةً", "كُنَافَةَ", "كُنَافَةِ", "الكُنَافَةَ"], "أَنْطَاكْيَا."], [1], "Çocuk Antakya künefesi yedi.", "Muzâf mef'ûl → mansûb, tenvinsiz: كُنَافَةَ. أَنْطَاكْيَا elif ile bittiği için harekesi görünmez."),
      CB("أَيْنَ أَسْرَعَتِ السَّيَّارَةُ؟ <span class=\"muted\">(الطَّرِيق، إِسْطَنْبُول)</span>", ["أَسْرَعَتِ السَّيَّارَةُ فِي", ["الطَّرِيقِ", "طَرِيقِ", "طَرِيقٍ", "طَرِيقُ"], ["إِسْطَنْبُولُ", "إِسْطَنْبُولَ", "إِسْطَنْبُولِ"]], [[1, 1], [1, 2]], "Araba İstanbul yolunda hızlandı.", "فِي'den sonra muzâf mecrûr. إِسْطَنْبُولَ yabancı özel isim (gayr-i munsarif): mecrûrken kesre yerine fetha alır; bu seviyede kesreli okuyuş da kabul edildi.")
    ]},
    { type: "classify", num: "+", extra: true, opts: DY_OPTS, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Ek alıştırma: izafet doğru kurulmuş mu? Muzâfta ال ya da tenvin var mı, muzâfun ileyh mecrûr mu?", items: [
      { s: "كِتَابُ مُحَمَّدٍ", a: "d", why: "Muzâf yalın, muzâfun ileyh mecrûr.", tr: "Muhammed'in kitabı" },
      { s: "الكِتَابُ مُحَمَّدٍ", a: "y", why: "Muzâf ال almaz: كِتَابُ مُحَمَّدٍ." },
      { s: "كِتَابٌ مُحَمَّدٍ", a: "y", why: "Muzâf tenvin almaz: كِتَابُ مُحَمَّدٍ." },
      { s: "مَكْتَبُ التَّاجِرُ", a: "y", why: "Muzâfun ileyh mecrûr olmalı: مَكْتَبُ التَّاجِرِ." },
      { s: "بَابُ البَيْتِ", a: "d", why: "Doğru.", tr: "evin kapısı" },
      { s: "البَابُ البَيْتِ", a: "y", why: "Muzâf ال almaz: بَابُ البَيْتِ." },
      { s: "حَقِيبَةُ طَالِبٍ", a: "d", why: "Muzâfun ileyh ال'siz olduğu için tenvin alabilir.", tr: "bir öğrencinin çantası" },
      { s: "غُرْفَةُ المُدِيرَ", a: "y", why: "Muzâfun ileyh fetha almaz; mecrûrdur: غُرْفَةُ المُدِيرِ." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · MUZÂFIN İ'RABI
{
  id: "u2", no: 2, ar: "إِعْرَابُ المُضَافِ", tr: "Muzâfın İ'rabı", short: "Muzâfın i'rabı", col: "ref", legend: ["ref", "nasb", "cerr"],
  goals: ["Muzâfın halinin cümledeki görevine göre değiştiğini görmek", "Mübtedâ, haber, fâil olan muzâfın merfû; mef'ûl olanın mansûb; harf-i cerden sonra ya da muzâfun ileyh olanın mecrûr olduğunu bilmek", "Muzâfun ileyhin her zaman mecrûr kaldığını görmek"],
  examples: [
    { s: "خَطُّ:ref.mübtedâ / الأُسْتَاذِ:cerr.muzâfun ileyh / جَمِيلٌ:-", tr: "Hocanın yazısı güzeldir.", why: "Muzâf mübtedâ → merfû." },
    { s: "البُرْتُقَالُ:- / فَاكِهَةُ:ref.haber / الشِّتَاءِ:cerr.muzâfun ileyh", tr: "Portakal kışın meyvesidir.", why: "Muzâf haber → merfû." },
    { s: "حَضَرَ:- / طُلَّابُ:ref.fâil / الجَامِعَةِ:cerr.muzâfun ileyh / إِلَى:- / إِسْطَنْبُولَ:-", tr: "Üniversitenin öğrencileri İstanbul'a geldi.", why: "Muzâf fâil → merfû." },
    { s: "شَاهَدْتُ:- / أَخْبَارَ:nasb.mef'ûl / الجَزِيرَةِ:cerr.muzâfun ileyh / أَمْسِ:-", tr: "Dün El-Cezire'nin haberlerini izledim.", why: "Muzâf mef'ûl bih → mansûb." },
    { s: "سَافَرْنَا:- / إِلَى:- / عَاصِمَةِ:cerr.harf-i cer / العِرَاقِ:cerr.muzâfun ileyh", tr: "Irak'ın başkentine yolculuk ettik.", why: "Muzâf harf-i cerden sonra → mecrûr." },
    { s: "رَافَقْتُ:- / طُلَّابَ:nasb.mef'ûl / كُلِّيَّةِ:cerr.muzâfun ileyh / الإِلَهِيَّاتِ:cerr.muzâfun ileyh", tr: "İlahiyat Fakültesinin öğrencilerine eşlik ettim.", why: "Zincir izafet: كُلِّيَّةِ hem طُلَّابَ'nin muzâfun ileyhi (mecrûr) hem الإِلَهِيَّاتِ'in muzâfı." }
  ],
  rules: [
    { tr: "Muzâfın i'rabı cümledeki yerine göredir. <b class=\"r-ref\">Merfû</b> olur: mübtedâ, haber ya da fâil ise.", ex: ["خَطُّ الأُسْتَاذِ جَمِيلٌ", "البُرْتُقَالُ فَاكِهَةُ الشِّتَاءِ", "حَضَرَ طُلَّابُ الجَامِعَةِ"] },
    { tr: "<b class=\"r-nasb\">Mansûb</b> olur: mef'ûl bih ise. Tenvin almadığı için yalnız fetha: <span class=\"ar\">أَخْبَارَ</span> (<span class=\"ar\">أَخْبَارًا</span> değil).", ex: ["شَاهَدْتُ أَخْبَارَ الجَزِيرَةِ"] },
    { tr: "<b class=\"r-cerr\">Mecrûr</b> olur: harf-i cerden sonra gelirse ya da kendisi başka bir ismin muzâfun ileyhi ise.", ex: ["سَافَرْنَا إِلَى عَاصِمَةِ العِرَاقِ", "رَافَقْتُ طُلَّابَ كُلِّيَّةِ الإِلَهِيَّاتِ"] },
    { tr: "Muzâfun ileyh ise hep aynıdır: <b class=\"r-cerr\">mecrûr</b>. Muzâf değişir, muzâfun ileyh değişmez." }
  ],
  kaide: [
    "٣ ـ إِعْرَابُ المُضَافِ يَكُونُ بِحَسَبِ مَوْقِعِهِ فِي الجُمْلَةِ؛ يَكُونُ مَرْفُوعًا إِذَا كَانَ مُبْتَدَأً أَوْ خَبَرًا أَوْ فَاعِلًا، وَيَكُونُ مَنْصُوبًا إِذَا كَانَ مَفْعُولًا بِهِ، وَيَكُونُ مَجْرُورًا بِحَرْفِ جَرٍّ أَوْ إِذَا وَقَعَ مُضَافًا إِلَيْهِ.",
    "مِثَالٌ: خَطُّ الأُسْتَاذِ جَمِيلٌ (مُبْتَدَأٌ). البُرْتُقَالُ فَاكِهَةُ الشِّتَاءِ (خَبَرٌ). حَضَرَ طُلَّابُ الجَامِعَةِ إِلَى إِسْطَنْبُولَ (فَاعِلٌ). شَاهَدْتُ أَخْبَارَ الجَزِيرَةِ أَمْسِ (مَفْعُولٌ بِهِ). سَافَرْنَا إِلَى عَاصِمَةِ العِرَاقِ (مَجْرُورٌ). رَافَقْتُ طُلَّابَ كُلِّيَّةِ الإِلَهِيَّاتِ (مَجْرُورٌ بِالإِضَافَةِ)."
  ],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنِ المُضَافَ وَالمُضَافَ إِلَيْهِ فِي الجُمَلِ التَّالِيَةِ وَاضْبِطْ آخِرَهُمَا", tr: "Muzâfı ve muzâfun ileyhi bul, kutulara dokunarak sonlarını harekele. Muzâfın harekesi görevine, muzâfun ileyhinki hep kesreye bağlı.", items: [
      CB("قهوة الضيف جاهزة.", [["قَهْوَةُ", "قَهْوَةَ", "قَهْوَةِ", "قَهْوَةٌ"], ["الضَّيْفُ", "الضَّيْفَ", "الضَّيْفِ"], "جَاهِزَةٌ."], [0, 2], "Misafirin kahvesi hazır.", "Muzâf قَهْوَةُ mübtedâ → merfû; muzâfun ileyh الضَّيْفِ → mecrûr."),
      CB("نظارة علي رائعة.", [["نَظَّارَةُ", "نَظَّارَةَ", "نَظَّارَةِ", "نَظَّارَةٌ"], ["عَلِيٌّ", "عَلِيًّا", "عَلِيٍّ"], "رَائِعَةٌ."], [0, 2], "Ali'nin gözlüğü harika.", "Muzâf mübtedâ → merfû. عَلِيٍّ özel isim, ال'si yok: tenvinli kesre."),
      CB("رد الطلب صعب.", [["رَدُّ", "رَدَّ", "رَدِّ", "رَدٌّ"], ["الطَّلَبُ", "الطَّلَبَ", "الطَّلَبِ"], "صَعْبٌ."], [0, 2], "Talebi geri çevirmek zordur.", "Muzâf mübtedâ → merfû; muzâfun ileyh mecrûr."),
      CB("لعبنا كرة السلة في الحديقة حتى الظهر.", ["لَعِبْنَا", ["كُرَةُ", "كُرَةَ", "كُرَةِ", "كُرَةً"], ["السَّلَّةُ", "السَّلَّةَ", "السَّلَّةِ"], "فِي الحَدِيقَةِ حَتَّى الظُّهْرِ."], [1, 2], "Öğlene kadar bahçede basketbol oynadık.", "Muzâf mef'ûl → mansûb, tenvinsiz fetha: كُرَةَ (كُرَةً değil)."),
      CB("شربت الأخت حليب الطفل.", ["شَرِبَتِ الأُخْتُ", ["حَلِيبُ", "حَلِيبَ", "حَلِيبِ", "حَلِيبًا"], ["الطِّفْلُ", "الطِّفْلَ", "الطِّفْلِ"]], [1, 2], "Kız kardeş bebeğin sütünü içti.", "Muzâf mef'ûl → mansûb; muzâfun ileyh mecrûr."),
      CB("سألت البنت عن مسؤول المدرسة، لكن ما وجدت.", ["سَأَلَتِ البِنْتُ عَنْ", ["مَسْؤُولُ", "مَسْؤُولَ", "مَسْؤُولِ", "مَسْؤُولٍ"], ["المَدْرَسَةُ", "المَدْرَسَةَ", "المَدْرَسَةِ"], "لَكِنْ مَا وَجَدَتْ."], [2, 2], "Kız okulun yetkilisini sordu ama bulamadı.", "Muzâf عَنْ'dan sonra → mecrûr; muzâfun ileyh mecrûr."),
      CB("زار رئيس الجمهور كلية الإلهيات في السنة الماضية.", ["زَارَ", ["رَئِيسُ", "رَئِيسَ", "رَئِيسِ", "رَئِيسٌ"], ["الجُمْهُورُ", "الجُمْهُورَ", "الجُمْهُورِ"], ["كُلِّيَّةُ", "كُلِّيَّةَ", "كُلِّيَّةِ", "كُلِّيَّةً"], ["الإِلَهِيَّاتُ", "الإِلَهِيَّاتِ"], "فِي السَّنَةِ المَاضِيَةِ."], [0, 2, 1, 1], "Cumhurbaşkanı geçen yıl İlahiyat Fakültesini ziyaret etti.", "İki izafet: رَئِيسُ الجُمْهُورِ fâil (merfû), كُلِّيَّةَ الإِلَهِيَّاتِ mef'ûl (mansûb). الإِلَهِيَّاتِ cem-i müennes sâlim: mecrûrken kesre. (Yaygın kullanım: رَئِيسُ الجُمْهُورِيَّةِ.)"),
      CB("وضعت خديجة ماء الشاي في الإبريق.", ["وَضَعَتْ خَدِيجَةُ", ["مَاءُ", "مَاءَ", "مَاءِ", "مَاءً"], ["الشَّايُ", "الشَّايَ", "الشَّايِ"], "فِي الإِبْرِيقِ."], [1, 2], "Hatice çayın suyunu demliğe koydu.", "Muzâf mef'ûl → mansûb (مَاءَ); muzâfun ileyh mecrûr.")
    ]},
    { type: "irab", num: "+", extra: true, tlist: YER_OPTS, tlbl: "Terkipteki yeri", ar: "أَعْرِبِ الكَلِمَةَ الَّتِي تَحْتَهَا خَطٌّ", tr: "Ek alıştırma: altı çizili kelime muzâf mı, muzâfun ileyh mi? Hali ne?", items: [
      IR("[خَطُّ] الأُسْتَاذِ جَمِيلٌ.", "mz", "ref", "Muzâf; mübtedâ olduğu için merfû.", "Hocanın yazısı güzeldir."),
      IR("البُرْتُقَالُ [فَاكِهَةُ] الشِّتَاءِ.", "mz", "ref", "Muzâf; haber olduğu için merfû.", "Portakal kışın meyvesidir."),
      IR("حَضَرَ [طُلَّابُ] الجَامِعَةِ إِلَى إِسْطَنْبُولَ.", "mz", "ref", "Muzâf; fâil olduğu için merfû.", "Üniversitenin öğrencileri İstanbul'a geldi."),
      IR("شَاهَدْتُ [أَخْبَارَ] الجَزِيرَةِ أَمْسِ.", "mz", "nasb", "Muzâf; mef'ûl bih olduğu için mansûb.", "Dün El-Cezire'nin haberlerini izledim."),
      IR("شَاهَدْتُ أَخْبَارَ [الجَزِيرَةِ] أَمْسِ.", "mi", "cerr", "Muzâfun ileyh: daima mecrûr.", "Dün El-Cezire'nin haberlerini izledim."),
      IR("سَافَرْنَا إِلَى [عَاصِمَةِ] العِرَاقِ.", "mz", "cerr", "Muzâf; إِلَى harf-i cerrinden sonra mecrûr.", "Irak'ın başkentine yolculuk ettik."),
      IR("رَافَقْتُ طُلَّابَ [كُلِّيَّةِ] الإِلَهِيَّاتِ.", "mi", "cerr", "طُلَّابَ'nin muzâfun ileyhi olduğu için mecrûr (aynı zamanda الإِلَهِيَّاتِ'in muzâfı).", "İlahiyat Fakültesinin öğrencilerine eşlik ettim."),
      IR("وَضَعَتْ خَدِيجَةُ [مَاءَ] الشَّايِ فِي الإِبْرِيقِ.", "mz", "nasb", "Muzâf; mef'ûl bih olduğu için mansûb.", "Hatice çayın suyunu demliğe koydu.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · MÜSENNÂ VE CEM MUZÂF OLUNCA
{
  id: "u3", no: 3, ar: "حَذْفُ النُّونِ فِي الإِضَافَةِ", tr: "Müsennâ ve Cem Muzâf Olunca", short: "Nun düşer", col: "mus", legend: ["mz", "mi"],
  goals: ["Müsennâ ve cem-i müzekker sâlim muzâf olunca nunun düştüğünü görmek", "Düşen nundan sonra kalan eki hale göre seçmek: ـَا / ـَيْ, ـُو / ـِي", "İzafette olmayan müsennâ ve cemde nunun kaldığını ayırmak"],
  examples: [
    { s: "مَكْتَبَا:mz.müsennâ, nun düştü / التَّاجِرِ:mi / وَاسِعَانِ:-", tr: "Tüccarın iki ofisi geniştir.", why: "مَكْتَبَانِ + التَّاجِرِ ← مَكْتَبَا التَّاجِرِ. Haber وَاسِعَانِ muzâf değil: nunu kalır." },
    { s: "عَامِلُو:mz.cem, nun düştü / المَصْنَعِ:mi / مَشْغُولُونَ:-", tr: "Fabrikanın işçileri meşguldür.", why: "عَامِلُونَ + المَصْنَعِ ← عَامِلُو المَصْنَعِ." },
    { s: "قَابَلْتُ:- / مُدِيرَيِ:mz.müsennâ, mansûb / البَنْكِ:mi", tr: "Bankanın iki müdürüyle görüştüm.", why: "مُدِيرَيْنِ ← مُدِيرَيْ. Yazıda ـَيْ, okurken sonraki ال yüzünden ـَيِ." },
    { s: "شَاهَدَ:- / أَحْمَدُ:- / لَاعِبِي:mz.cem, mansûb / الفَرِيقِ:mi", tr: "Ahmed takımın oyuncularını gördü.", why: "لَاعِبِينَ ← لَاعِبِي." }
  ],
  rules: [
    { tr: "Müsennâ ve cem-i müzekker sâlim <b class=\"r-mz\">muzâf</b> olunca sondaki <b>nun düşer</b>.", ex: ["مَكْتَبَانِ ← مَكْتَبَا التَّاجِرِ", "عَامِلُونَ ← عَامِلُو المَصْنَعِ"] },
    { tr: "Nun düşünce hal eki kalır: müsennâ merfû <span class=\"ar\">ـَا</span>, mansûb ve mecrûr <span class=\"ar\">ـَيْ</span>; cem merfû <span class=\"ar\">ـُو</span>, mansûb ve mecrûr <span class=\"ar\">ـِي</span>.", ex: ["مُدِيرَا الشَّرِكَةِ", "مُدِيرَيِ الشَّرِكَةِ", "مُدِيرُو الشَّرِكَةِ", "مُدِيرِي الشَّرِكَةِ"] },
    { tr: "Nun yalnız muzâfta düşer. Haber, sıfat ya da muzâfun ileyh olan müsennâ ve cemde nun kalır.", ex: ["مَكْتَبَا التَّاجِرِ وَاسِعَانِ", "بِسَيَّارَةِ المُدِيرَيْنِ", "تُسَاعِدُ الدَّوْلَةُ المُوَظَّفِينَ"] },
    { tr: "Fiil sonra gelirse özneye uyar: <span class=\"ar\">مُدِيرَا المَدْرَسَةِ يَبْحَثَانِ · مُدِيرُو المَدْرَسَةِ يَبْحَثُونَ</span>. Fiil önce gelirse tekil kalır: <span class=\"ar\">بَنَى مُهَنْدِسُو الشَّرِكَةِ</span>." },
    { tr: "Okuma notu: <span class=\"ar\">ـَيْ</span> ve <span class=\"ar\">ـِي</span>'den sonra ال gelince, <span class=\"ar\">ـَيْ</span> kesreyle bağlanır (<span class=\"ar\">مُدِيرَيِ البَنْكِ</span>); <span class=\"ar\">ـِي</span> ve <span class=\"ar\">ـُو</span> okunuşta kısalır." }
  ],
  kaide: [
    "٥ ـ إِذَا وَقَعَ الاسْمُ المُثَنَّى وَجَمْعُ المُذَكَّرِ السَّالِمُ مُضَافًا، حُذِفَ مِنْهُمَا حَرْفُ النُّونِ «ـانِ، ـونَ».",
    "مِثَالٌ: مَكْتَبَا التَّاجِرِ وَاسِعَانِ. عَامِلُو المَصْنَعِ مَشْغُولُونَ."
  ],
  ex: [
    { type: "find", target: "y", num: "٤", ar: "عَيِّنِ المُثَنَّى وَجَمْعَ المُذَكَّرِ السَّالِمِ فِي الجُمَلِ التَّالِيَةِ", tr: "Cümledeki müsennâ ve cem-i müzekker sâlimlere dokun, sonra Kontrol et. Nunu düşmüş olanlar da dahil.", items: [
      W("طَالَعَ القَارِئُ [جَرِيدَتَيِ] الشَّفَقِ وَالزَّمَانِ.", "Okuyucu Şafak ve Zaman gazetelerini okudu.", "جَرِيدَتَيِ: müsennâ, mef'ûl (mansûb), muzâf; nun düştü."),
      W("بَنَى [مُهَنْدِسُو] الشَّرِكَةِ بِنَاءً عَالِيًا.", "Şirketin mühendisleri yüksek bir bina yaptı.", "مُهَنْدِسُو: cem, fâil (merfû), muzâf."),
      W("قَابَلْتُ [مُدِيرَيِ] البَنْكِ فِي الأُسْبُوعِ المَاضِي.", "Geçen hafta bankanın iki müdürüyle görüştüm.", "مُدِيرَيِ: müsennâ, mef'ûl (mansûb), muzâf."),
      W("[مُعَلِّمُو] الكُلِّيَّةِ [حَرِيصُونَ] عَلَى تَعْلِيمِ الطُّلَّابِ.", "Fakültenin öğretmenleri öğrencileri eğitmeye düşkündür.", "مُعَلِّمُو: muzâf, nun düştü. حَرِيصُونَ: haber, muzâf değil, nun kaldı."),
      W("سَأَتَنَاوَلُ الغَدَاءَ اليَوْمَ مَعَ [صَاحِبَيِ] المَصْنَعِ.", "Bugün öğle yemeğini fabrikanın iki sahibiyle yiyeceğim.", "صَاحِبَيِ: müsennâ, مَعَ'den sonra mecrûr, muzâf."),
      W("اسْتَقْبَلَ [مُزَارِعُو] القَرْيَةِ رَئِيسَ الجُمْهُورِيَّةِ فِي قَرْيَتِهِمْ.", "Köyün çiftçileri cumhurbaşkanını köylerinde karşıladı.", "مُزَارِعُو: cem, fâil, muzâf."),
      W("[مَسْؤُولُو] الوِزَارَةِ [مُجْتَمِعُونَ] فِي الصَّالَةِ الكَبِيرَةِ.", "Bakanlığın yetkilileri büyük salonda toplanmış durumda.", "مَسْؤُولُو: muzâf; مُجْتَمِعُونَ: haber, nun kaldı."),
      W("[طَالِبَا] العِلْمِ [جَاهِزَانِ] لِلسَّفَرِ.", "İki ilim talebesi yolculuğa hazır.", "طَالِبَا: müsennâ, mübtedâ, muzâf; جَاهِزَانِ haber.")
    ]},
    { type: "pick", fill: true, num: "٥", ar: "عَيِّنِ المُثَنَّى وَجَمْعَ المُذَكَّرِ السَّالِمِ المُنَاسِبَ ثُمَّ ضَعْهُ فِي الفَرَاغِ", tr: "Doğru şekli seç. Önce sor: arkasında muzâfun ileyh var mı (nun düşer mi)? Sonra: hali ne?", items: [
      { q: "يَكْثُرُ السُّكَّانُ فِي ___ إِسْطَنْبُولَ وَأَنْقَرَةَ.", o: ["مَدِينَتَانِ", "مَدِينَتَا", "مَدِينَتَيْ", "مَدِينَتَيْنِ"], a: 2, tr: "İstanbul ve Ankara şehirlerinde nüfus çoktur.", why: "Muzâf (nun düşer), فِي'den sonra mecrûr → ـَيْ." },
      { q: "تُسَاعِدُ الدَّوْلَةُ ___.", o: ["المُوَظَّفِينَ", "المُوَظَّفُونَ", "المُوَظَّفِي", "المُوَظَّفَانِ"], a: 0, tr: "Devlet memurlara yardım eder.", why: "Arkasında muzâfun ileyh yok: nun kalır. Mef'ûl → ـِينَ." },
      { q: "شَاهَدَ أَحْمَدُ ___ الفَرِيقِ فِي المَلْعَبِ.", o: ["لَاعِبَا", "لَاعِبِي", "لَاعِبُو", "لَاعِبِينَ"], a: 1, tr: "Ahmed sahada takımın oyuncularını gördü.", why: "Muzâf (nun düşer), mef'ûl → ـِي." },
      { q: "___ الدَّاخِلِيَّةِ فَحَصَا مُحَمَّدًا.", o: ["طَبِيبِي", "طَبِيبَا", "طَبِيبَيْ", "طَبِيبَتَا"], a: 1, tr: "İki dahiliye doktoru Muhammed'i muayene etti.", why: "Fiil فَحَصَا müzekker ikil: iki erkek doktor. Mübtedâ muzâf → ـَا." },
      { q: "___ النِّعْمَةِ مَحْبُوبُونَ عِنْدَ اللهِ.", o: ["شَاكِرِي", "شَاكِرُو", "شَاكِرُونَ", "شَاكِرِينَ"], a: 1, tr: "Nimete şükredenler Allah katında sevilir.", why: "Mübtedâ muzâf → merfû, nun düşer: ـُو." },
      { q: "تَابَعْتُ ___ المَرْمَى مِنَ التِّلْفَازِ.", o: ["حَارِسَانِ", "حَارِسَا", "حَارِسَيْنِ", "حَارِسَيْ"], a: 3, tr: "İki kaleciyi televizyondan izledim.", why: "حَارِسُ المَرْمَى: kaleci. Mef'ûl muzâf → ـَيْ." },
      { q: "___ الفَصْلِ مِصْرِيَّتَانِ.", o: ["مُدَرِّسَتَانِ", "مُدَرِّسَتَا", "مُدَرِّسَتَيْ", "مُدَرِّسَةُ"], a: 1, tr: "Sınıfın iki kadın öğretmeni Mısırlıdır.", why: "Haber ikil, öyleyse mübtedâ da ikil. Muzâf, merfû → ـَا." },
      { q: "___ آمِنُونَ.", o: ["مُوَاطِنُو", "المُوَاطِنُونَ", "مُوَاطِنِي", "مُوَاطِنِينَ"], a: 1, tr: "Vatandaşlar güvendedir.", why: "Arkasında muzâfun ileyh yok: nun kalır. Mübtedâ → ـُونَ." }
    ]},
    { type: "combo", num: "٦", ar: "حَوِّلْ مَا تَحْتَهُ خَطٌّ إِلَى المُثَنَّى", tr: "Altı çizili kelimeyi müsennâya çevir. Muzâfsa nun düşer; değilse kalır.",
      exHtml: "<span class=\"ar\">حَضَرَ مُحَاسِبُ الشَّرِكَةِ ← حَضَرَ مُحَاسِبَا الشَّرِكَةِ</span><br><span class=\"ar\">شَاهَدَ إِبْرَاهِيمُ طَبِيبَ المُسْتَشْفَى ← شَاهَدَ إِبْرَاهِيمُ طَبِيبَيِ المُسْتَشْفَى</span>", items: [
      CB("رَجَعَ سَلِيمٌ إِلَى الكُلِّيَّةِ بِسَيَّارَةِ <span class=\"ul\">المُدِيرِ</span>.", ["رَجَعَ سَلِيمٌ إِلَى الكُلِّيَّةِ بِسَيَّارَةِ", ["المُدِيرِ", "المُدِيرَانِ", "المُدِيرَيْنِ", "المُدِيرَيِ"]], [2], "Selim fakülteye iki müdürün arabasıyla döndü.", "Burada müsennâ olan kelime muzâfun ileyh: mecrûr → ـَيْنِ. Muzâf değil, nun düşmez."),
      CB("بَنَى <span class=\"ul\">مُهَنْدِسُ</span> الشَّرِكَةِ بِنَاءً عَالِيًا.", ["بَنَى", ["مُهَنْدِسُ", "مُهَنْدِسَانِ", "مُهَنْدِسَا", "مُهَنْدِسَيِ"], "الشَّرِكَةِ بِنَاءً عَالِيًا."], [2], "Şirketin iki mühendisi yüksek bir bina yaptı.", "Fâil muzâf → merfû ـَا, nun düştü."),
      CB("قَابَلْتُ <span class=\"ul\">مُوَظَّفَ</span> البَنْكِ فِي الأُسْبُوعِ المَاضِي.", ["قَابَلْتُ", ["مُوَظَّفَ", "مُوَظَّفَيْنِ", "مُوَظَّفَا", "مُوَظَّفَيِ"], "البَنْكِ فِي الأُسْبُوعِ المَاضِي."], [3], "Geçen hafta bankanın iki memuruyla görüştüm.", "Mef'ûl muzâf → ـَيْ (ال'den önce ـَيِ okunur)."),
      CB("<span class=\"ul\">مُعَلِّمُ</span> الكُلِّيَّةِ مُخْلِصٌ فِي عَمَلِهِ.", [["مُعَلِّمُ", "مُعَلِّمَانِ", "مُعَلِّمَا", "مُعَلِّمَيِ"], "الكُلِّيَّةِ", ["مُخْلِصٌ", "مُخْلِصَانِ", "مُخْلِصَا"], "فِي", ["عَمَلِهِ", "عَمَلِهِمَا"]], [2, 1, 1], "Fakültenin iki öğretmeni işlerinde ihlaslıdır.", "Mübtedâ muzâf → ـَا. Haber muzâf değil, nun kalır: مُخْلِصَانِ. Zamir: ـهِمَا."),
      CB("<span class=\"ul\">صَاحِبُ</span> المَصْنَعِ مُحْسِنٌ.", [["صَاحِبُ", "صَاحِبَانِ", "صَاحِبَا", "صَاحِبَيِ"], "المَصْنَعِ", ["مُحْسِنٌ", "مُحْسِنَانِ", "مُحْسِنَا"]], [2, 1], "Fabrikanın iki sahibi iyiliksever.", "Mübtedâ muzâf → ـَا; haber → ـَانِ."),
      CB("سَاعَدَ <span class=\"ul\">فَلَّاحُ</span> القَرْيَةِ الفُقَرَاءَ.", ["سَاعَدَ", ["فَلَّاحُ", "فَلَّاحَانِ", "فَلَّاحَا", "فَلَّاحَيِ"], "القَرْيَةِ الفُقَرَاءَ."], [2], "Köyün iki çiftçisi fakirlere yardım etti.", "Fâil muzâf → ـَا."),
      CB("اسْتَقْبَلَ <span class=\"ul\">مَسْؤُولُ</span> الوِزَارَةِ الضُّيُوفَ.", ["اسْتَقْبَلَ", ["مَسْؤُولُ", "مَسْؤُولَانِ", "مَسْؤُولَا", "مَسْؤُولَيِ"], "الوِزَارَةِ الضُّيُوفَ."], [2], "Bakanlığın iki yetkilisi misafirleri karşıladı.", "Fâil muzâf → ـَا."),
      CB("يُحِبُّ اللهُ <span class=\"ul\">طَالِبَ</span> العِلْمِ.", ["يُحِبُّ اللهُ", ["طَالِبَ", "طَالِبَيْنِ", "طَالِبَا", "طَالِبَيِ"], "العِلْمِ."], [3], "Allah ilmin iki talebesini sever.", "Mef'ûl muzâf → ـَيْ.")
    ]},
    { type: "combo", num: "٧", ar: "حَوِّلْ مَا تَحْتَهُ خَطٌّ إِلَى جَمْعِ المُذَكَّرِ السَّالِمِ", tr: "Altı çizili kelimeyi cem-i müzekker sâlime çevir. Muzâfsa nun düşer.",
      exHtml: "<span class=\"ar\">جَاءَ مُحَاسِبُ الشَّرِكَةِ ← جَاءَ مُحَاسِبُو الشَّرِكَةِ</span><br><span class=\"ar\">شَاهَدَ مُدِيرُ المَصْنَعِ العَامِلِينَ ← شَاهَدَ مُدِيرُو المَصْنَعِ العَامِلِينَ</span>", items: [
      CB("سَافَرَ سَلِيمٌ مَعَ <span class=\"ul\">مُدَرِّبِ</span> الفَرِيقِ إِلَى مِصْرَ.", ["سَافَرَ سَلِيمٌ مَعَ", ["مُدَرِّبِ", "مُدَرِّبُو", "مُدَرِّبِي", "مُدَرِّبِينَ"], "الفَرِيقِ إِلَى مِصْرَ."], [2], "Selim takımın antrenörleriyle Mısır'a gitti.", "مَعَ'den sonra mecrûr, muzâf → ـِي."),
      CB("تَسَلَّمَ مُوسَى الرَّاتِبَ مِنْ <span class=\"ul\">مُحَاسِبِ</span> الشَّرِكَةِ.", ["تَسَلَّمَ مُوسَى الرَّاتِبَ مِنْ", ["مُحَاسِبِ", "مُحَاسِبُو", "مُحَاسِبِي", "مُحَاسِبِينَ"], "الشَّرِكَةِ."], [2], "Musa maaşı şirketin muhasebecilerinden aldı.", "مِنْ'den sonra mecrûr, muzâf → ـِي."),
      CB("وَاجَهَ <span class=\"ul\">مُوَظَّفُ</span> البَنْكِ المُدِيرَ العَامَّ.", ["وَاجَهَ", ["مُوَظَّفُ", "مُوَظَّفُو", "مُوَظَّفِي", "مُوَظَّفُونَ"], "البَنْكِ المُدِيرَ العَامَّ."], [1], "Bankanın memurları genel müdürle yüzleşti.", "Fâil muzâf → ـُو; fiil tekil kalır."),
      CB("<span class=\"ul\">طَالِبُ</span> الكُلِّيَّةِ مُجْتَهِدٌ.", [["طَالِبُ", "طَالِبُو", "طَالِبِي", "طَالِبُونَ"], "الكُلِّيَّةِ", ["مُجْتَهِدٌ", "مُجْتَهِدُونَ", "مُجْتَهِدُو"]], [1, 1], "Fakültenin öğrencileri çalışkandır.", "Mübtedâ muzâf → ـُو; haber → ـُونَ. (Günlük dilde طُلَّابُ الكُلِّيَّةِ teksîri daha yaygındır.)"),
      CB("<span class=\"ul\">لَاعِبُ</span> الفَرِيقِ سَرِيعٌ جِدًّا.", [["لَاعِبُ", "لَاعِبُو", "لَاعِبِي", "لَاعِبُونَ"], "الفَرِيقِ", ["سَرِيعٌ", "سَرِيعُونَ", "سَرِيعُو"], "جِدًّا."], [1, 1], "Takımın oyuncuları çok hızlıdır.", "Mübtedâ muzâf → ـُو; haber → ـُونَ."),
      CB("سَاعَدَ <span class=\"ul\">فَلَّاحُ</span> القَرْيَةِ الفُقَرَاءَ.", ["سَاعَدَ", ["فَلَّاحُ", "فَلَّاحُو", "فَلَّاحِي", "فَلَّاحُونَ"], "القَرْيَةِ الفُقَرَاءَ."], [1], "Köyün çiftçileri fakirlere yardım etti.", "Fâil muzâf → ـُو."),
      CB("اسْتَقْبَلَ <span class=\"ul\">وَزِيرُ</span> الخَارِجِيَّةِ ضُيُوفَهُ.", ["اسْتَقْبَلَ", ["وَزِيرُ", "وُزَرَاءُ", "وَزِيرِي", "وَزِيرُونَ"], "الخَارِجِيَّةِ", ["ضُيُوفَهُ", "ضُيُوفَهُمْ"]], [1, 1], "Dışişleri bakanları misafirlerini karşıladı.", "Dikkat: وَزِيرٌ cem-i müzekker sâlimle çoğul yapılmaz; kırık çoğulu وُزَرَاءُ'dur. Teksîrde nun olmadığı için normal muzâf gibidir: وُزَرَاءُ الخَارِجِيَّةِ. Zamir: ـهُمْ."),
      CB("يُكْرِمُ اللهُ <span class=\"ul\">طَالِبَ</span> العِلْمِ.", ["يُكْرِمُ اللهُ", ["طَالِبَ", "طَالِبُو", "طَالِبِي", "طَالِبِينَ"], "العِلْمِ."], [2], "Allah ilim talebelerine ikram eder.", "Mef'ûl muzâf → ـِي.")
    ]},
    { type: "combo", num: "٨", ar: "حَوِّلِ المُضَافَ إِلَى المُثَنَّى ثُمَّ إِلَى الجَمْعِ", tr: "Her cümleyi önce müsennâya, sonra cem-i müzekker sâlime çevir. Arkadan gelen fiil ve haber de uyar.",
      exHtml: "<span class=\"ar\">مُسَاعِدُ المُدِيرِ جَاهِزٌ ← مُسَاعِدَا المُدِيرِ جَاهِزَانِ ← مُسَاعِدُو المُدِيرِ جَاهِزُونَ</span><br><span class=\"ar\">قَابَلَتْ نِهَالُ مُدِيرَ الشَّرِكَةِ ← مُدِيرَيِ الشَّرِكَةِ ← مُدِيرِي الشَّرِكَةِ</span>", items: [].concat(
      P2("يَنْظُرُ عَلِيٌّ إِلَى مُعَلِّمِ اللُّغَةِ العَرَبِيَّةِ.", ["يَنْظُرُ عَلِيٌّ إِلَى", ["مُعَلِّمِ", "مُعَلِّمَيِ", "مُعَلِّمَا", "مُعَلِّمِي"], "اللُّغَةِ العَرَبِيَّةِ."], [1], [3], "Ali Arapçanın iki öğretmenine bakıyor.", "Ali Arapçanın öğretmenlerine bakıyor.", "إِلَى'dan sonra mecrûr müsennâ muzâf → ـَيْ.", "Mecrûr cem muzâf → ـِي."),
      P2("كَتَبَتْ بُشْرَى عَامِلَ المَصْنَعِ فِي القَائِمَةِ.", ["كَتَبَتْ بُشْرَى", ["عَامِلَ", "عَامِلَيِ", "عَامِلَا", "عَامِلِي", "عَامِلُو"], "المَصْنَعِ فِي القَائِمَةِ."], [1], [3], "Büşra fabrikanın iki işçisini listeye yazdı.", "Büşra fabrikanın işçilerini listeye yazdı.", "Mef'ûl müsennâ muzâf → ـَيْ.", "Mef'ûl cem muzâf → ـِي (ـُو değil)."),
      P2("جَاءَتْ بَتُولُ إِلَى مَسْؤُولِ المُسْتَشْفَى.", ["جَاءَتْ بَتُولُ إِلَى", ["مَسْؤُولِ", "مَسْؤُولَيِ", "مَسْؤُولَا", "مَسْؤُولِي"], "المُسْتَشْفَى."], [1], [3], "Betül hastanenin iki yetkilisine geldi.", "Betül hastanenin yetkililerine geldi.", "Mecrûr müsennâ muzâf → ـَيْ.", "Mecrûr cem muzâf → ـِي."),
      P2("تَسْأَلُ السَّيِّدَةُ عَنْ مُوَظَّفِ البَنْكِ.", ["تَسْأَلُ السَّيِّدَةُ عَنْ", ["مُوَظَّفِ", "مُوَظَّفَيِ", "مُوَظَّفَا", "مُوَظَّفِي"], "البَنْكِ."], [1], [3], "Hanımefendi bankanın iki memurunu soruyor.", "Hanımefendi bankanın memurlarını soruyor.", "Mecrûr müsennâ muzâf → ـَيْ.", "Mecrûr cem muzâf → ـِي."),
      P2("مُدِيرُ المَدْرَسَةِ يَبْحَثُ عَنِ الطَّالِبِ.", [["مُدِيرُ", "مُدِيرَا", "مُدِيرُو", "مُدِيرَيِ"], "المَدْرَسَةِ", ["يَبْحَثُ", "يَبْحَثَانِ", "يَبْحَثُونَ"], "عَنِ الطَّالِبِ."], [1, 1], [2, 2], "Okulun iki müdürü öğrenciyi arıyor.", "Okulun müdürleri öğrenciyi arıyor.", "Mübtedâ muzâf → ـَا. Fiil sonra geldiği için uyar: يَبْحَثَانِ.", "Mübtedâ muzâf → ـُو. Fiil uyar: يَبْحَثُونَ."),
      P2("بَائِعُ الدُّكَّانِ كَرِيمٌ.", [["بَائِعُ", "بَائِعَا", "بَائِعُو", "بَائِعِي"], "الدُّكَّانِ", ["كَرِيمٌ", "كَرِيمَانِ", "كَرِيمُونَ", "كِرَامٌ"]], [1, 1], [[2, 2], [2, 3]], "Dükkânın iki satıcısı cömerttir.", "Dükkânın satıcıları cömerttir.", "Mübtedâ muzâf → ـَا; haber → ـَانِ.", "Mübtedâ muzâf → ـُو; haber كَرِيمُونَ ya da kırık çoğul كِرَامٌ."),
      P2("عَامِلُ المَصْنَعِ مَشْغُولٌ.", [["عَامِلُ", "عَامِلَا", "عَامِلُو", "عَامِلِي"], "المَصْنَعِ", ["مَشْغُولٌ", "مَشْغُولَانِ", "مَشْغُولُونَ"]], [1, 1], [2, 2], "Fabrikanın iki işçisi meşguldür.", "Fabrikanın işçileri meşguldür.", "Mübtedâ muzâf → ـَا; haber → ـَانِ.", "Mübtedâ muzâf → ـُو; haber → ـُونَ."),
      P2("شَاكِرُ النِّعْمَةِ مَحْبُوبٌ.", [["شَاكِرُ", "شَاكِرَا", "شَاكِرُو", "شَاكِرِي"], "النِّعْمَةِ", ["مَحْبُوبٌ", "مَحْبُوبَانِ", "مَحْبُوبُونَ"]], [1, 1], [2, 2], "Nimete şükreden iki kişi sevilir.", "Nimete şükredenler sevilir.", "Mübtedâ muzâf → ـَا; haber → ـَانِ.", "Mübtedâ muzâf → ـُو; haber → ـُونَ.")
    )}
  ]
},
// ---------------------------------------------------------------- 4 · OKUMA
{
  id: "u4", no: 4, ar: "قِرَاءَةٌ: وَالِدُ مَحْمُودٍ", tr: "Okuma: Mahmud'un Babası", short: "Okuma", col: "mi", legend: ["mz", "mi"],
  goals: ["Bir metindeki bütün izafet terkiplerini bulmak", "Her muzâfın halini cümledeki görevinden çıkarmak", "Zincir izafeti, sayı izafetini ve nunu düşmüş müsennâ ve cemi tanımak"],
  examples: [
    { s: "وَالِدُ:mz / مَحْمُودٍ:mi / تَاجِرٌ:- / كَبِيرٌ:-", tr: "Mahmud'un babası büyük bir tüccardır.", why: "Muzâf mübtedâ → merfû; özel isim muzâfun ileyh tenvinli: مَحْمُودٍ." },
    { s: "مُدِيرَا:mz / المَصْنَعِ:mi / يُرَاقِبَانِ:- / العُمَّالَ:-", tr: "Fabrikanın iki müdürü işçileri denetler.", why: "مُدِيرَانِ ← مُدِيرَا: nun düştü." },
    { s: "عَشَرَةُ:mz / أَشْخَاصٍ:mi / يَعْمَلُونَ:- / فِي:- / إِدَارَةِ:mz / المَصْنَعِ:mi", tr: "On kişi fabrikanın yönetiminde çalışır.", why: "Sayı da izafet kurar: عَشَرَةُ أَشْخَاصٍ." }
  ],
  rules: [
    { tr: "İzafet iki isimden olur: <b class=\"r-mz\">muzâf</b> + <b class=\"r-mi\">muzâfun ileyh</b>.", ex: ["مَحَلُّ مُرَادٍ", "قِسْمُ الإِنْتَاجِ"] },
    { tr: "Muzâf ال ve tenvin almaz; hali cümledeki görevine göredir.", ex: ["يَصْنَعُ وَالِدُ مَحْمُودٍ", "يُسَاعِدُ مُحْتَاجِي المَدِينَةِ"] },
    { tr: "Muzâfun ileyh daima mecrûrdur; ال'siz özel isimse tenvinli olur.", ex: ["وَالِدُ مَحْمُودٍ", "فِي عُطْلَةِ الصَّيْفِ"] },
    { tr: "Müsennâ ve cem-i müzekker sâlim muzâf olunca nun düşer.", ex: ["مُدِيرَا المَصْنَعِ", "مُوَظَّفُو المَصْنَعِ", "أَلْفَيْ لِيرَةٍ"] },
    { tr: "Zincir izafet: ortadaki isim hem muzâfun ileyh hem muzâftır.", ex: ["فِي مَصْنَعِ الأَحْذِيَةِ", "طُلَّابُ كُلِّيَّةِ الإِلَهِيَّاتِ"] }
  ],
  kaide: [
    "١ ـ إِذَا اجْتَمَعَ اسْمَانِ فَالتَّرْكِيبُ يَكُونُ «إِضَافَةً»: الأَوَّلُ مُضَافٌ وَالثَّانِي مُضَافٌ إِلَيْهِ.",
    "٢ ـ لَا يَقْبَلُ المُضَافُ «ال» وَلَا التَّنْوِينَ.",
    "٣ ـ إِعْرَابُ المُضَافِ بِحَسَبِ مَوْقِعِهِ فِي الجُمْلَةِ.",
    "٤ ـ المُضَافُ إِلَيْهِ مَجْرُورٌ.",
    "٥ ـ إِذَا وَقَعَ المُثَنَّى وَجَمْعُ المُذَكَّرِ السَّالِمُ مُضَافًا حُذِفَتِ النُّونُ."
  ],
  ex: [
    { type: "find", target: "y", reading: true, num: "٩ (أ)", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ عَيِّنْ تَرَاكِيبَ الإِضَافَةِ", tr: "Parçayı oku. Her cümlede izafet terkibine giren iki kelimeye de (muzâf ve muzâfun ileyh) dokun, sonra Kontrol et. Gri kelimeler zamirli olduğu için seçilemez.",
      title: "وَالِدُ مَحْمُودٍ",
      text: "وَالِدُ مَحْمُودٍ تَاجِرٌ كَبِيرٌ. اسْمُهُ مُرَادٌ. مَحَلُّ مُرَادٍ فِي مِنْطَقَةِ سُلْطَانِ أَحْمَدَ السِّيَاحِيَّةِ. يَصْنَعُ وَالِدُ مَحْمُودٍ أَحْذِيَةً جِلْدِيَّةً فِي مَصْنَعِهِ فِي مِنْطَقَةِ مَحْمُود بَاشَا. يَعْمَلُ فِي مَصْنَعِ الأَحْذِيَةِ سِتُّونَ شَخْصًا تَقْرِيبًا. عَشَرَةُ أَشْخَاصٍ يَعْمَلُونَ فِي إِدَارَةِ المَصْنَعِ، وَخَمْسُونَ شَخْصًا يَعْمَلُونَ فِي قِسْمِ الإِنْتَاجِ. عُمَّالُ المَصْنَعِ يَعْمَلُونَ تِسْعَ سَاعَاتٍ فِي اليَوْمِ، وَيَأْخُذُونَ أَلْفَيْ لِيرَةٍ شَهْرِيًّا.<br>فِي المَصْنَعِ مُدِيرَانِ. مُدِيرَا المَصْنَعِ دَائِمًا يُرَاقِبَانِ العُمَّالَ وَالمُوَظَّفِينَ. مُوَظَّفُو المَصْنَعِ مَسْؤُولُونَ عَنِ الأَعْمَالِ الرَّسْمِيَّةِ فَقَطْ.<br>يَبِيعُ وَالِدُ مَحْمُودٍ الأَحْذِيَةَ الجِلْدِيَّةَ لِلسُّيَّاحِ القَادِمِينَ مِنْ أُورُبَّا وَأَمْرِيكَا. يَكْسِبُ وَالِدُ مَحْمُودٍ نُقُودًا كَثِيرَةً وَيُسَاعِدُ مُحْتَاجِي المَدِينَةِ وَالفُقَرَاءَ.<br>فِي عُطْلَةِ الصَّيْفِ يَذْهَبُ مَحْمُودٌ إِلَى المَصْنَعِ، وَيُسَاعِدُ العُمَّالَ هُنَاكَ.",
      textTr: "Mahmud'un babası büyük bir tüccardır; adı Murad. Murad'ın dükkânı turistik Sultanahmet bölgesindedir. Mahmud'un babası Mahmutpaşa'daki fabrikasında deri ayakkabı yapar. Ayakkabı fabrikasında yaklaşık altmış kişi çalışır: on kişi fabrikanın yönetiminde, elli kişi üretim bölümünde. Fabrikanın işçileri günde dokuz saat çalışır ve ayda iki bin lira alır. Fabrikada iki müdür var; fabrikanın iki müdürü işçileri ve memurları sürekli denetler. Fabrikanın memurları yalnızca resmî işlerden sorumludur. Mahmud'un babası deri ayakkabıları Avrupa ve Amerika'dan gelen turistlere satar. Çok para kazanır ve şehrin muhtaçlarına ve fakirlere yardım eder. Yaz tatilinde Mahmud fabrikaya gider ve oradaki işçilere yardım eder.",
      items: [
      W("[وَالِدُ] [مَحْمُودٍ] تَاجِرٌ كَبِيرٌ. {اسْمُهُ} مُرَادٌ.", "Mahmud'un babası büyük bir tüccardır. Adı Murad.", "وَالِدُ مَحْمُودٍ: muzâf + muzâfun ileyh. اسْمُهُ'de zamirle izafet var; burada iki isimli terkipleri arıyoruz."),
      W("[مَحَلُّ] [مُرَادٍ] فِي [مِنْطَقَةِ] [سُلْطَانِ_أَحْمَدَ] السِّيَاحِيَّةِ.", "Murad'ın dükkânı turistik Sultanahmet bölgesindedir.", "İki izafet: مَحَلُّ مُرَادٍ ve مِنْطَقَةِ سُلْطَانِ أَحْمَدَ. السِّيَاحِيَّةِ sıfattır."),
      W("يَصْنَعُ [وَالِدُ] [مَحْمُودٍ] أَحْذِيَةً جِلْدِيَّةً فِي {مَصْنَعِهِ} فِي [مِنْطَقَةِ] [مَحْمُود_بَاشَا].", "Mahmud'un babası Mahmutpaşa'daki fabrikasında deri ayakkabı yapar.", "أَحْذِيَةً جِلْدِيَّةً sıfat terkibidir, izafet değil."),
      W("يَعْمَلُ فِي [مَصْنَعِ] [الأَحْذِيَةِ] سِتُّونَ شَخْصًا تَقْرِيبًا.", "Ayakkabı fabrikasında yaklaşık altmış kişi çalışır.", "سِتُّونَ شَخْصًا temyizdir, izafet değil."),
      W("[عَشَرَةُ] [أَشْخَاصٍ] يَعْمَلُونَ فِي [إِدَارَةِ] [المَصْنَعِ]، وَخَمْسُونَ شَخْصًا يَعْمَلُونَ فِي [قِسْمِ] [الإِنْتَاجِ].", "On kişi fabrikanın yönetiminde, elli kişi üretim bölümünde çalışır.", "عَشَرَةُ أَشْخَاصٍ: 3-10 arası sayılar sayılanla izafet kurar."),
      W("[عُمَّالُ] [المَصْنَعِ] يَعْمَلُونَ [تِسْعَ] [سَاعَاتٍ] فِي اليَوْمِ، وَيَأْخُذُونَ [أَلْفَيْ] [لِيرَةٍ] شَهْرِيًّا.", "Fabrikanın işçileri günde dokuz saat çalışır ve ayda iki bin lira alır.", "أَلْفَيْ لِيرَةٍ: müsennâ muzâf, nun düştü. (Kitapta أَلْفَيْنِ yazılmış; izafette doğrusu أَلْفَيْ.)"),
      W("فِي المَصْنَعِ مُدِيرَانِ. [مُدِيرَا] [المَصْنَعِ] دَائِمًا يُرَاقِبَانِ العُمَّالَ وَالمُوَظَّفِينَ.", "Fabrikada iki müdür var. Fabrikanın iki müdürü işçileri ve memurları sürekli denetler.", "مُدِيرَانِ muzâf değil (nun var); مُدِيرَا المَصْنَعِ izafet (nun düştü)."),
      W("[مُوَظَّفُو] [المَصْنَعِ] مَسْؤُولُونَ عَنِ الأَعْمَالِ الرَّسْمِيَّةِ فَقَطْ.", "Fabrikanın memurları yalnızca resmî işlerden sorumludur.", "مُوَظَّفُو: cem muzâf, nun düştü."),
      W("يَكْسِبُ [وَالِدُ] [مَحْمُودٍ] نُقُودًا كَثِيرَةً وَيُسَاعِدُ [مُحْتَاجِي] [المَدِينَةِ] وَالفُقَرَاءَ.", "Mahmud'un babası çok para kazanır, şehrin muhtaçlarına ve fakirlere yardım eder.", "مُحْتَاجِي: mef'ûl cem muzâf → ـِي."),
      W("فِي [عُطْلَةِ] [الصَّيْفِ] يَذْهَبُ مَحْمُودٌ إِلَى المَصْنَعِ، وَيُسَاعِدُ العُمَّالَ هُنَاكَ.", "Yaz tatilinde Mahmud fabrikaya gider ve oradaki işçilere yardım eder.", "عُطْلَةِ الصَّيْفِ: yaz tatili.")
    ]},
    { type: "irab", num: "٩ (ب)", tlist: YER_OPTS, tlbl: "Terkipteki yeri", ar: "أَعْرِبْ تَرَاكِيبَ الإِضَافَةِ", tr: "Altı çizili kelime muzâf mı, muzâfun ileyh mi? Hali ne?", items: [
      IR("[وَالِدُ] مَحْمُودٍ تَاجِرٌ كَبِيرٌ.", "mz", "ref", "Muzâf; mübtedâ → merfû (damme).", "Mahmud'un babası büyük bir tüccardır."),
      IR("وَالِدُ [مَحْمُودٍ] تَاجِرٌ كَبِيرٌ.", "mi", "cerr", "Muzâfun ileyh → mecrûr (tenvinli kesre).", "Mahmud'un babası büyük bir tüccardır."),
      IR("[مَحَلُّ] مُرَادٍ فِي مِنْطَقَةِ سُلْطَانِ أَحْمَدَ.", "mz", "ref", "Muzâf; mübtedâ → merfû.", "Murad'ın dükkânı Sultanahmet bölgesindedir."),
      IR("مَحَلُّ مُرَادٍ فِي [مِنْطَقَةِ] سُلْطَانِ أَحْمَدَ.", "mz", "cerr", "Muzâf; فِي'den sonra → mecrûr.", "Murad'ın dükkânı Sultanahmet bölgesindedir."),
      IR("يَصْنَعُ [وَالِدُ] مَحْمُودٍ أَحْذِيَةً جِلْدِيَّةً.", "mz", "ref", "Muzâf; fâil → merfû.", "Mahmud'un babası deri ayakkabı yapar."),
      IR("يَعْمَلُ فِي مَصْنَعِ [الأَحْذِيَةِ] سِتُّونَ شَخْصًا.", "mi", "cerr", "Muzâfun ileyh → mecrûr.", "Ayakkabı fabrikasında altmış kişi çalışır."),
      IR("[عُمَّالُ] المَصْنَعِ يَعْمَلُونَ تِسْعَ سَاعَاتٍ.", "mz", "ref", "Muzâf; mübtedâ → merfû.", "Fabrikanın işçileri dokuz saat çalışır."),
      IR("وَيَأْخُذُونَ [أَلْفَيْ] لِيرَةٍ شَهْرِيًّا.", "mz", "nasb", "Muzâf; mef'ûl → mansûb, müsennâ: yâ. Nun düştü.", "Ayda iki bin lira alırlar."),
      IR("[مُدِيرَا] المَصْنَعِ دَائِمًا يُرَاقِبَانِ العُمَّالَ.", "mz", "ref", "Muzâf; mübtedâ → merfû, müsennâ: elif. Nun düştü.", "Fabrikanın iki müdürü işçileri sürekli denetler."),
      IR("[مُوَظَّفُو] المَصْنَعِ مَسْؤُولُونَ.", "mz", "ref", "Muzâf; mübtedâ → merfû, cem: vav. Nun düştü.", "Fabrikanın memurları sorumludur."),
      IR("يُسَاعِدُ [مُحْتَاجِي] المَدِينَةِ وَالفُقَرَاءَ.", "mz", "nasb", "Muzâf; mef'ûl → mansûb, cem: yâ. Nun düştü.", "Şehrin muhtaçlarına ve fakirlere yardım eder."),
      IR("فِي [عُطْلَةِ] الصَّيْفِ يَذْهَبُ مَحْمُودٌ إِلَى المَصْنَعِ.", "mz", "cerr", "Muzâf; فِي'den sonra → mecrûr.", "Yaz tatilinde Mahmud fabrikaya gider."),
      IR("فِي عُطْلَةِ [الصَّيْفِ] يَذْهَبُ مَحْمُودٌ إِلَى المَصْنَعِ.", "mi", "cerr", "Muzâfun ileyh → mecrûr.", "Yaz tatilinde Mahmud fabrikaya gider.")
    ]}
  ]
}
];

// Oyun havuzu: [cümle {hedef}, seçenekler (ilki doğru), hal, görev, Türkçe]
var IZ_POOL = [
  ["حَضَرَ {مُحَاسِبُ} الشَّرِكَةِ.", ["مُحَاسِبُ", "المُحَاسِبُ", "مُحَاسِبٌ", "مُحَاسِبَ"], "ref", "fâil (muzâf)", "Şirketin muhasebecisi geldi."],
  ["شَاهَدَ إِبْرَاهِيمُ {طَبِيبَ} المُسْتَشْفَى.", ["طَبِيبَ", "الطَّبِيبَ", "طَبِيبًا", "طَبِيبُ"], "nasb", "mef'ûl (muzâf)", "İbrahim hastanenin doktorunu gördü."],
  ["{خَطُّ} الأُسْتَاذِ جَمِيلٌ.", ["خَطُّ", "الخَطُّ", "خَطٌّ", "خَطَّ"], "ref", "mübtedâ (muzâf)", "Hocanın yazısı güzeldir."],
  ["البُرْتُقَالُ {فَاكِهَةُ} الشِّتَاءِ.", ["فَاكِهَةُ", "الفَاكِهَةُ", "فَاكِهَةٌ", "فَاكِهَةَ"], "ref", "haber (muzâf)", "Portakal kışın meyvesidir."],
  ["حَضَرَ {طُلَّابُ} الجَامِعَةِ إِلَى إِسْطَنْبُولَ.", ["طُلَّابُ", "الطُّلَّابُ", "طُلَّابٌ", "طُلَّابَ"], "ref", "fâil (muzâf)", "Üniversitenin öğrencileri İstanbul'a geldi."],
  ["شَاهَدْتُ {أَخْبَارَ} الجَزِيرَةِ أَمْسِ.", ["أَخْبَارَ", "الأَخْبَارَ", "أَخْبَارًا", "أَخْبَارُ"], "nasb", "mef'ûl (muzâf)", "Dün El-Cezire'nin haberlerini izledim."],
  ["سَافَرْنَا إِلَى {عَاصِمَةِ} العِرَاقِ.", ["عَاصِمَةِ", "العَاصِمَةِ", "عَاصِمَةٍ", "عَاصِمَةَ"], "cerr", "harf-i cerden sonra (muzâf)", "Irak'ın başkentine yolculuk ettik."],
  ["رَافَقْتُ طُلَّابَ {كُلِّيَّةِ} الإِلَهِيَّاتِ.", ["كُلِّيَّةِ", "الكُلِّيَّةِ", "كُلِّيَّةٍ", "كُلِّيَّةَ"], "cerr", "muzâfun ileyh (aynı zamanda muzâf)", "İlahiyat Fakültesinin öğrencilerine eşlik ettim."],
  ["{قَهْوَةُ} الضَّيْفِ جَاهِزَةٌ.", ["قَهْوَةُ", "القَهْوَةُ", "قَهْوَةٌ", "قَهْوَةَ"], "ref", "mübtedâ (muzâf)", "Misafirin kahvesi hazır."],
  ["لَعِبْنَا {كُرَةَ} السَّلَّةِ فِي الحَدِيقَةِ.", ["كُرَةَ", "الكُرَةَ", "كُرَةً", "كُرَةُ"], "nasb", "mef'ûl (muzâf)", "Bahçede basketbol oynadık."],
  ["شَرِبَتِ الأُخْتُ {حَلِيبَ} الطِّفْلِ.", ["حَلِيبَ", "الحَلِيبَ", "حَلِيبًا", "حَلِيبِ"], "nasb", "mef'ûl (muzâf)", "Kız kardeş bebeğin sütünü içti."],
  ["سَأَلَتِ البِنْتُ عَنْ {مَسْؤُولِ} المَدْرَسَةِ.", ["مَسْؤُولِ", "المَسْؤُولِ", "مَسْؤُولٍ", "مَسْؤُولُ"], "cerr", "harf-i cerden sonra (muzâf)", "Kız okulun yetkilisini sordu."],
  ["زَارَ {رَئِيسُ} الجُمْهُورِ الكُلِّيَّةَ.", ["رَئِيسُ", "الرَّئِيسُ", "رَئِيسٌ", "رَئِيسَ"], "ref", "fâil (muzâf)", "Cumhurbaşkanı fakülteyi ziyaret etti."],
  ["وَضَعَتْ خَدِيجَةُ {مَاءَ} الشَّايِ فِي الإِبْرِيقِ.", ["مَاءَ", "المَاءَ", "مَاءً", "مَاءُ"], "nasb", "mef'ûl (muzâf)", "Hatice çayın suyunu demliğe koydu."],
  ["حَضَرَ سَائِقُ {السَّيَّارَةِ} إِلَى المَحَطَّةِ.", ["السَّيَّارَةِ", "السَّيَّارَةُ", "السَّيَّارَةَ", "سَيَّارَةُ"], "cerr", "muzâfun ileyh", "Arabanın şoförü istasyona geldi."],
  ["فَهِمْتُ دَرْسَ {القَوَاعِدِ}.", ["القَوَاعِدِ", "القَوَاعِدُ", "القَوَاعِدَ", "قَوَاعِدَ"], "cerr", "muzâfun ileyh", "Gramer dersini anladım."],
  ["نَظَّارَةُ {عَلِيٍّ} رَائِعَةٌ.", ["عَلِيٍّ", "عَلِيٌّ", "عَلِيًّا", "العَلِيِّ"], "cerr", "muzâfun ileyh", "Ali'nin gözlüğü harika."],
  ["{مَكْتَبَا} التَّاجِرِ وَاسِعَانِ.", ["مَكْتَبَا", "مَكْتَبَانِ", "مَكْتَبَيِ", "المَكْتَبَانِ"], "ref", "mübtedâ (müsennâ muzâf)", "Tüccarın iki ofisi geniştir."],
  ["{عَامِلُو} المَصْنَعِ مَشْغُولُونَ.", ["عَامِلُو", "عَامِلُونَ", "عَامِلِي", "العَامِلُونَ"], "ref", "mübtedâ (cem muzâf)", "Fabrikanın işçileri meşguldür."],
  ["بَنَى {مُهَنْدِسُو} الشَّرِكَةِ بِنَاءً عَالِيًا.", ["مُهَنْدِسُو", "مُهَنْدِسُونَ", "مُهَنْدِسِي", "مُهَنْدِسِينَ"], "ref", "fâil (cem muzâf)", "Şirketin mühendisleri yüksek bir bina yaptı."],
  ["قَابَلْتُ {مُدِيرَيِ} البَنْكِ.", ["مُدِيرَيِ", "مُدِيرَيْنِ", "مُدِيرَا", "المُدِيرَيْنِ"], "nasb", "mef'ûl (müsennâ muzâf)", "Bankanın iki müdürüyle görüştüm."],
  ["سَأَتَنَاوَلُ الغَدَاءَ مَعَ {صَاحِبَيِ} المَصْنَعِ.", ["صَاحِبَيِ", "صَاحِبَيْنِ", "صَاحِبَا", "الصَّاحِبَيْنِ"], "cerr", "مَعَ'den sonra (müsennâ muzâf)", "Öğle yemeğini fabrikanın iki sahibiyle yiyeceğim."],
  ["{مُعَلِّمُو} الكُلِّيَّةِ حَرِيصُونَ.", ["مُعَلِّمُو", "مُعَلِّمُونَ", "مُعَلِّمِي", "المُعَلِّمُونَ"], "ref", "mübtedâ (cem muzâf)", "Fakültenin öğretmenleri düşkündür."],
  ["{طَالِبَا} العِلْمِ جَاهِزَانِ لِلسَّفَرِ.", ["طَالِبَا", "طَالِبَانِ", "طَالِبَيِ", "الطَّالِبَانِ"], "ref", "mübtedâ (müsennâ muzâf)", "İki ilim talebesi yolculuğa hazır."],
  ["يَكْثُرُ السُّكَّانُ فِي {مَدِينَتَيْ} إِسْطَنْبُولَ وَأَنْقَرَةَ.", ["مَدِينَتَيْ", "مَدِينَتَيْنِ", "مَدِينَتَا", "مَدِينَتَانِ"], "cerr", "harf-i cerden sonra (müsennâ muzâf)", "İstanbul ve Ankara şehirlerinde nüfus çoktur."],
  ["شَاهَدَ أَحْمَدُ {لَاعِبِي} الفَرِيقِ.", ["لَاعِبِي", "لَاعِبِينَ", "لَاعِبُو", "لَاعِبُونَ"], "nasb", "mef'ûl (cem muzâf)", "Ahmed takımın oyuncularını gördü."],
  ["{شَاكِرُو} النِّعْمَةِ مَحْبُوبُونَ.", ["شَاكِرُو", "شَاكِرُونَ", "شَاكِرِي", "شَاكِرِينَ"], "ref", "mübtedâ (cem muzâf)", "Nimete şükredenler sevilir."],
  ["يُسَاعِدُ وَالِدُ مَحْمُودٍ {مُحْتَاجِي} المَدِينَةِ.", ["مُحْتَاجِي", "مُحْتَاجِينَ", "مُحْتَاجُو", "مُحْتَاجُونَ"], "nasb", "mef'ûl (cem muzâf)", "Mahmud'un babası şehrin muhtaçlarına yardım eder."],
  ["سَافَرَ سَلِيمٌ مَعَ {مُدَرِّبِي} الفَرِيقِ.", ["مُدَرِّبِي", "مُدَرِّبِينَ", "مُدَرِّبُو", "المُدَرِّبِينَ"], "cerr", "مَعَ'den sonra (cem muzâf)", "Selim takımın antrenörleriyle yolculuk etti."],
  ["{مُوَظَّفُو} المَصْنَعِ مَسْؤُولُونَ.", ["مُوَظَّفُو", "مُوَظَّفُونَ", "مُوَظَّفِي", "المُوَظَّفُونَ"], "ref", "mübtedâ (cem muzâf)", "Fabrikanın memurları sorumludur."],
  ["تَابَعْتُ {حَارِسَيِ} المَرْمَى.", ["حَارِسَيِ", "حَارِسَيْنِ", "حَارِسَا", "حَارِسَانِ"], "nasb", "mef'ûl (müsennâ muzâf)", "İki kaleciyi izledim."]
];
// Doğru mu yanlış mı: [ifade, doğru mu, açıklama]
var DY_POOL = [
  ["كِتَابُ مُحَمَّدٍ", true, "Muzâf yalın, muzâfun ileyh mecrûr."], ["مَكْتَبُ التَّاجِرِ", true, "Doğru izafet."], ["مُعَلِّمُو المَدْرَسَةِ", true, "Nun düşmüş: doğru."], ["مُدِيرَا الشَّرِكَةِ", true, "Müsennâ muzâf, nun düşmüş."],
  ["بَابُ البَيْتِ", true, "Doğru izafet."], ["سَيَّارَةُ المُدِيرِ", true, "Doğru izafet."], ["فِي غُرْفَةِ المُدِيرِ", true, "Harf-i cerden sonra muzâf mecrûr."], ["مَعَ صَاحِبَيِ المَصْنَعِ", true, "Mecrûr müsennâ muzâf: ـَيْ."],
  ["رَأَيْتُ مُهَنْدِسِي الشَّرِكَةِ", true, "Mansûb cem muzâf: ـِي."], ["حَقِيبَةُ طَالِبٍ", true, "Muzâfun ileyh ال'siz: tenvin alabilir."], ["عَاصِمَةُ العِرَاقِ", true, "Doğru izafet."], ["شَرِبْتُ عَصِيرَ البُرْتُقَالِ", true, "Mansûb muzâf: fetha, tenvinsiz."],
  ["الكِتَابُ مُحَمَّدٍ", false, "Muzâf ال almaz: كِتَابُ مُحَمَّدٍ."], ["كِتَابٌ مُحَمَّدٍ", false, "Muzâf tenvin almaz: كِتَابُ مُحَمَّدٍ."], ["مَكْتَبُ التَّاجِرُ", false, "Muzâfun ileyh mecrûr olmalı: التَّاجِرِ."], ["مُعَلِّمُونَ المَدْرَسَةِ", false, "Muzâfta nun düşer: مُعَلِّمُو المَدْرَسَةِ."],
  ["مُدِيرَانِ الشَّرِكَةِ", false, "Muzâfta nun düşer: مُدِيرَا الشَّرِكَةِ."], ["البَابُ البَيْتِ", false, "Muzâf ال almaz: بَابُ البَيْتِ."], ["سَيَّارَةٌ المُدِيرِ", false, "Muzâf tenvin almaz."], ["فِي غُرْفَةُ المُدِيرِ", false, "فِي'den sonra muzâf mecrûr: غُرْفَةِ."],
  ["رَأَيْتُ مُهَنْدِسُو الشَّرِكَةِ", false, "Mef'ûl: ـِي olmalı: مُهَنْدِسِي."], ["مَعَ صَاحِبَا المَصْنَعِ", false, "مَعَ'den sonra mecrûr: صَاحِبَيِ."], ["طُلَّابُ الجَامِعَةَ", false, "Muzâfun ileyh fetha almaz: الجَامِعَةِ."], ["شَرِبْتُ عَصِيرًا البُرْتُقَالِ", false, "Muzâf tenvin almaz: عَصِيرَ البُرْتُقَالِ."]
];
// İzafet kur: [tekil-tenvin, ال'li, muzâf şekli, muzâfun ileyh doğru, muzâfun ileyh yanlış (merfû), Türkçe]
var KUR_POOL = [
  ["سَيَّارَةٌ", "السَّيَّارَةُ", "سَيَّارَةُ", "المُدِيرِ", "المُدِيرُ", "müdürün arabası"],
  ["بَابٌ", "البَابُ", "بَابُ", "البَيْتِ", "البَيْتُ", "evin kapısı"],
  ["مُدِيرٌ", "المُدِيرُ", "مُدِيرُ", "المَدْرَسَةِ", "المَدْرَسَةُ", "okulun müdürü"],
  ["عَصِيرٌ", "العَصِيرُ", "عَصِيرُ", "البُرْتُقَالِ", "البُرْتُقَالُ", "portakal suyu"],
  ["حَقِيبَةٌ", "الحَقِيبَةُ", "حَقِيبَةُ", "الطَّالِبَةِ", "الطَّالِبَةُ", "kız öğrencinin çantası"],
  ["غُرْفَةٌ", "الغُرْفَةُ", "غُرْفَةُ", "الجُلُوسِ", "الجُلُوسُ", "oturma odası"],
  ["عَاصِمَةٌ", "العَاصِمَةُ", "عَاصِمَةُ", "العِرَاقِ", "العِرَاقُ", "Irak'ın başkenti"],
  ["قِسْمٌ", "القِسْمُ", "قِسْمُ", "الإِنْتَاجِ", "الإِنْتَاجُ", "üretim bölümü"],
  ["عُطْلَةٌ", "العُطْلَةُ", "عُطْلَةُ", "الصَّيْفِ", "الصَّيْفُ", "yaz tatili"],
  ["كُرَةٌ", "الكُرَةُ", "كُرَةُ", "القَدَمِ", "القَدَمُ", "futbol (ayak topu)"],
  ["مَاءٌ", "المَاءُ", "مَاءُ", "الشَّايِ", "الشَّايُ", "çayın suyu"],
  ["قَهْوَةٌ", "القَهْوَةُ", "قَهْوَةُ", "الضَّيْفِ", "الضَّيْفُ", "misafirin kahvesi"],
  ["مَحَلٌّ", "المَحَلُّ", "مَحَلُّ", "التَّاجِرِ", "التَّاجِرُ", "tüccarın dükkânı"],
  ["دَرْسٌ", "الدَّرْسُ", "دَرْسُ", "القَوَاعِدِ", "القَوَاعِدُ", "gramer dersi"]
];
var HAFIZA = {
  tr: { name: "Türkçe ↔ izafet", pairs: [["okul müdürü", "مُدِيرُ المَدْرَسَةِ"], ["evin kapısı", "بَابُ البَيْتِ"], ["Irak'ın başkenti", "عَاصِمَةُ العِرَاقِ"], ["portakal suyu", "عَصِيرُ البُرْتُقَالِ"], ["basketbol", "كُرَةُ السَّلَّةِ"], ["okul çantası", "حَقِيبَةُ المَدْرَسَةِ"], ["oturma odası", "غُرْفَةُ الجُلُوسِ"], ["kaleci", "حَارِسُ المَرْمَى"], ["ilim talebesi", "طَالِبُ العِلْمِ"], ["yaz tatili", "عُطْلَةُ الصَّيْفِ"], ["cep harçlığı", "مَصْرُوفُ الجَيْبِ"], ["Antakya künefesi", "كُنَافَةُ أَنْطَاكْيَا"]] },
  nun: { name: "Nun düşer", pairs: [["مُعَلِّمَانِ", "مُعَلِّمَا الصَّفِّ"], ["مُهَنْدِسُونَ", "مُهَنْدِسُو الشَّرِكَةِ"], ["مُدِيرَيْنِ", "مُدِيرَيِ البَنْكِ"], ["مُوَظَّفِينَ", "مُوَظَّفِي البَنْكِ"], ["مَكْتَبَانِ", "مَكْتَبَا التَّاجِرِ"], ["عَامِلُونَ", "عَامِلُو المَصْنَعِ"], ["طَالِبَانِ", "طَالِبَا العِلْمِ"], ["لَاعِبِينَ", "لَاعِبِي الفَرِيقِ"]] }
};
var KARTLAR = [
  ["İzafet nedir?", "İki ismin birleşip tek anlam kurması: كِتَابُ مُحَمَّدٍ. Birincisi muzâf, ikincisi muzâfun ileyh."],
  ["Muzâf neleri almaz?", "ال ve tenvin almaz: مَكْتَبٌ ← مَكْتَبُ التَّاجِرِ"],
  ["Muzâfun ileyhin hali nedir?", "Daima mecrûr: مَكْتَبُ التَّاجِرِ"],
  ["Muzâfun ileyh tenvin alabilir mi?", "Evet, ال'siz ise: كِتَابُ مُحَمَّدٍ · حَقِيبَةُ طَالِبٍ"],
  ["Muzâf ne zaman merfû olur?", "Mübtedâ, haber ya da fâil ise: خَطُّ الأُسْتَاذِ جَمِيلٌ"],
  ["Muzâf ne zaman mansûb olur?", "Mef'ûl bih ise; tenvinsiz fetha: شَاهَدْتُ أَخْبَارَ الجَزِيرَةِ"],
  ["Muzâf ne zaman mecrûr olur?", "Harf-i cerden sonra ya da muzâfun ileyh ise: إِلَى عَاصِمَةِ العِرَاقِ"],
  ["Müsennâ muzâf olunca ne olur?", "Nun düşer: مَكْتَبَانِ ← مَكْتَبَا التَّاجِرِ · مُدِيرَيْنِ ← مُدِيرَيِ البَنْكِ"],
  ["Cem-i müzekker sâlim muzâf olunca?", "Nun düşer: عَامِلُونَ ← عَامِلُو المَصْنَعِ · لَاعِبِينَ ← لَاعِبِي الفَرِيقِ"],
  ["مُدِيرَانِ الشَّرِكَةِ neden yanlış?", "Muzâfta nun kalmaz: مُدِيرَا الشَّرِكَةِ"],
  ["Haberde nun düşer mi?", "Hayır, haber muzâf değil: مَكْتَبَا التَّاجِرِ وَاسِعَانِ"],
  ["Zincir izafet nedir?", "Ortadaki isim hem muzâfun ileyh hem muzâf: طُلَّابُ كُلِّيَّةِ الإِلَهِيَّاتِ"],
  ["Türkçe ile sıra farkı?", "Türkçe: tüccarın ofisi (sahip önce). Arapça: مَكْتَبُ التَّاجِرِ (sahip olunan önce)."]
];
