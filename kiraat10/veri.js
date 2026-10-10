// ================= VERİ: Kıraat 10 — يَوْمُ التَّسَوُّقِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "السُّوقُ", tr: "Pazar" }, nasb: { ar: "البِضَاعَةُ", tr: "Mal" }, cerr: { ar: "النَّاسُ", tr: "İnsanlar" },
  mi: { ar: "الأَدَاةُ", tr: "Bağlaç / edat" }, ref: { ar: "الكَمِّيَّةُ", tr: "Miktar" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
// Pazar reyonları (12. etkinlik); ilk dördü hız oyununda
var REYON = [["kh", "Sebze", "الخَضْرَاوَاتُ", "mz"], ["fw", "Meyve", "الفَوَاكِهُ", "nasb"], ["lh", "Et", "اللُّحُومُ", "cerr"], ["lb", "Süt ürünleri", "الأَلْبَانُ وَالأَجْبَانُ", "muz"], ["ml", "Giyim", "الأَلْبِسَةُ وَالأَحْذِيَةُ", "ref"], ["ad", "Ev eşyası", "الأَدَوَاتُ المَنْزِلِيَّةُ", "mi"]];
// Haftalık ihtiyaç miktarları (2. etkinlik)
var MIKTAR = [["q2", "2 kilo", "كِيلَانِ", "mz"], ["q15", "1,5 kilo", "كِيلٌ وَنِصْفٌ", "nasb"], ["q1", "1 kilo", "كِيلٌ", "ref"], ["q05", "Yarım kilo", "نِصْفُ كِيلٍ", "muz"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", kh: "Sebze", fw: "Meyve", lh: "Et", lb: "Süt ürünleri", ml: "Giyim", ad: "Ev eşyası", q2: "2 kilo", q15: "1,5 kilo", q1: "1 kilo", q05: "Yarım kilo" };

// Alışveriş makinesi: ürün [Arapça (مِنْ’den sonra), Türkçe, emoji, haftalık miktar (MK sırası; -1 = metinde yok)]
var URUN = [
  ["اللَّحْمِ الأَحْمَرِ", "kırmızı et", "🥩", 3], ["لَحْمِ الدَّجَاجِ", "tavuk eti", "🍗", 1], ["البَطَاطَا", "patates", "🥔", 2], ["الطَّمَاطِمِ", "domates", "🍅", 1],
  ["الخِيَارِ", "salatalık", "🥒", 0], ["الأَرُزِّ", "pirinç", "🍚", 1], ["البُرْغُلِ", "bulgur", "🌾", 1], ["التُّفَّاحِ", "elma", "🍎", -1], ["العِنَبِ", "üzüm", "🍇", -1]
];
// Miktar: [أُرِيدُ’den sonra (mansûb), إِلَى’dan sonra (mecrûr), Türkçe, sayı]
var MK = [["نِصْفَ كِيلٍ", "نِصْفِ كِيلٍ", "yarım kilo", "½"], ["كِيلًا", "كِيلٍ", "bir kilo", "1"], ["كِيلًا وَنِصْفًا", "كِيلٍ وَنِصْفٍ", "bir buçuk kilo", "1½"], ["كِيلَيْنِ", "كِيلَيْنِ", "iki kilo", "2"]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "يَقُولُ يَزَنُ: يَوْمُ التَّسَوُّقِ هُوَ يَوْمٌ مُمْتِعٌ بِالنِّسْبَةِ لِي وَلِعَائِلَتِي، نَحْنُ نُحِبُّ التَّسَوُّقَ كَثِيرًا، لَكِنْ لَا نَتَسَوَّقُ كُلَّ يَوْمٍ. نَسْكُنُ فِي إِسْطَنْبُولَ فِي مِنْطَقَةٍ مَشْهُورَةٍ، اسْمُهَا «الفَاتِحُ»، هِيَ مَرْكَزُ المَدِينَةِ القَدِيمَةِ، فِيهَا أَسْوَاقٌ وَمَحَلَّاتٌ كَثِيرَةٌ، وَفِي المِنْطَقَةِ سُوقٌ يَفْتَحُ يَوْمًا وَاحِدًا فِي الأُسْبُوعِ فَقَطْ، اسْمُ السُّوقِ «سُوقُ الأَرْبِعَاءِ»، وَهُوَ كَبِيرٌ جِدًّا وَوَاسِعٌ وَمُزْدَحِمٌ بِالنَّاسِ، لِأَنَّ النَّاسَ يَحْضُرُونَ إِلَيْهِ مِنْ كُلِّ مَنَاطِقِ إِسْطَنْبُولَ لِشِرَاءِ احْتِيَاجَاتِهِمْ، فَأَسْعَارُهُ رَخِيصَةٌ جِدًّا، وَفِيهِ كُلُّ شَيْءٍ تَقْرِيبًا." +
  "<br>يَفْتَحُ السُّوقُ مِنَ الصَّبَاحِ البَاكِرِ إِلَى المَسَاءِ. يَبِيعُ البَائِعُونَ فِي السُّوقِ الخَضْرَاوَاتِ وَالفَوَاكِهَ وَالأَجْبَانَ وَالأَلْبَانَ وَالأَلْبِسَةَ وَالأَحْذِيَةَ وَاللُّحُومَ وَالأَدَوَاتِ المَنْزِلِيَّةَ الصَّغِيرَةَ أَيْضًا." +
  "<br>البَائِعُونَ فِي السُّوقِ يَعْرِضُونَ بَضَائِعَهُمْ بِشَكْلٍ جَمِيلٍ يَجْذِبُ الزَّبَائِنَ، وَيَكْتُبُونَ أَسْعَارَ بَضَائِعِهِمْ عَلَى وَرَقَةٍ صَغِيرَةٍ وَيَضَعُونَهَا عَلَى البِضَاعَةِ. مُعْظَمُ البَائِعِينَ لَطِيفُونَ مَعَ زَبَائِنِهِمْ." +
  "<br>أَنَا أَذْهَبُ مَعَ أُمِّي إِلَى السُّوقِ مُبَكِّرًا، لِأَنَّ الخَضْرَاوَاتِ وَالفَوَاكِهَ تَكُونُ طَازَجَةً، نَشْتَرِي عَادَةً مِنَ السُّوقِ لَوَازِمَ البَيْتِ الأُسْبُوعِيَّةَ، نَحْتَاجُ كُلَّ أُسْبُوعٍ إِلَى كِيلَيْنِ مِنَ اللَّحْمِ الأَحْمَرِ وَكِيلٍ مِنْ لَحْمِ الدَّجَاجِ، أَمَّا الخَضْرَاوَاتُ فَنَحْتَاجُ إِلَى كِيلٍ وَنِصْفٍ مِنَ البَطَاطَا وَكِيلٍ مِنَ الطَّمَاطِمِ وَنِصْفِ كِيلٍ مِنَ الخِيَارِ، وَنَشْتَرِي كِيلًا مِنَ الأَرُزِّ وَكِيلًا مِنَ البُرْغُلِ، وَنَشْتَرِي أَيْضًا نَوْعَيْنِ مِنَ الفَوَاكِهِ، مِثْلَ التُّفَّاحِ وَالعِنَبِ.";
var METIN_TR = "Yezen anlatıyor: Alışveriş günü benim ve ailem için zevkli bir gündür. Alışverişi çok severiz ama her gün alışveriş yapmayız. İstanbul’da meşhur bir semtte oturuyoruz, adı “Fatih”; eski şehrin merkezidir. Orada birçok çarşı ve dükkân var. Semtte haftada yalnızca bir gün kurulan bir pazar var; adı “Çarşamba Pazarı”. Çok büyük, geniş ve insanlarla kalabalıktır; çünkü insanlar ihtiyaçlarını almak için İstanbul’un her semtinden oraya gelir; fiyatları çok ucuzdur ve orada hemen hemen her şey vardır." +
  "<br>Pazar sabahın erken saatinden akşama kadar açıktır. Satıcılar pazarda sebze, meyve, peynir, süt ürünleri, giysi, ayakkabı, et ve küçük ev eşyaları da satarlar." +
  "<br>Pazardaki satıcılar mallarını müşterileri çeken güzel bir şekilde sergilerler; mallarının fiyatlarını küçük bir kâğıda yazıp malın üstüne koyarlar. Satıcıların çoğu müşterilerine karşı naziktir." +
  "<br>Ben annemle pazara erken giderim; çünkü sebze ve meyveler taze olur. Pazardan genellikle evin haftalık ihtiyaçlarını alırız. Her hafta iki kilo kırmızı ete ve bir kilo tavuk etine ihtiyacımız var; sebzelere gelince bir buçuk kilo patatese, bir kilo domatese ve yarım kilo salatalığa ihtiyacımız var. Bir kilo pirinç ve bir kilo bulgur alırız; ayrıca elma ve üzüm gibi iki çeşit meyve alırız.";
var SOZLUK = [["التَّسَوُّقُ", "alışveriş"], ["مُمْتِعٌ", "zevkli, eğlenceli"], ["بِالنِّسْبَةِ لِي", "benim için"], ["مِنْطَقَةٌ ج مَنَاطِقُ", "bölge, semt"], ["مَحَلٌّ ج مَحَلَّاتٌ", "dükkân"], ["وَاسِعٌ", "geniş"], ["مُزْدَحِمٌ", "kalabalık"], ["يَحْضُرُونَ", "gelirler"], ["احْتِيَاجَاتٌ", "ihtiyaçlar"], ["سِعْرٌ ج أَسْعَارٌ", "fiyat"], ["رَخِيصٌ", "ucuz"], ["تَقْرِيبًا", "hemen hemen"], ["الصَّبَاحُ البَاكِرُ", "sabahın erken saati"], ["الأَلْبَانُ / الأَجْبَانُ", "süt ürünleri / peynirler"], ["الأَلْبِسَةُ / الأَحْذِيَةُ", "giysiler / ayakkabılar"], ["الأَدَوَاتُ المَنْزِلِيَّةُ", "ev eşyaları"], ["يَعْرِضُونَ", "sergilerler"], ["بَضَائِعُ", "mallar"], ["يَجْذِبُ", "çeker"], ["الزَّبَائِنُ", "müşteriler"], ["مُعْظَمُ", "çoğu"], ["طَازَجٌ", "taze"], ["لَوَازِمُ البَيْتِ", "evin ihtiyaçları"], ["كِيلٌ / كِيلَانِ", "bir kilo / iki kilo"], ["البُرْغُلُ", "bulgur"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendi pazarını düşünmek: semtinde pazar var mı, ne zaman gidersin, ne alırsın", "Alışveriş gününü anlatan metni durmadan okumak ve dinlemek", "Pazar, mal ve fiyat kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "فِي المِنْطَقَةِ سُوقٌ:mz / يَفْتَحُ يَوْمًا وَاحِدًا:- / فِي الأُسْبُوعِ فَقَطْ.:ref.Zaman", tr: "Semtte haftada yalnızca bir gün kurulan bir pazar var." },
    { s: "يَبِيعُ البَائِعُونَ:cerr / فِي السُّوقِ:mz / الخَضْرَاوَاتِ وَالفَوَاكِهَ.:nasb", tr: "Satıcılar pazarda sebze ve meyve satar." }
  ],
  rules: [
    { tr: "<b>Pazar kelimeleri:</b> <span class=\"ar\">السُّوقُ</span> pazar · <span class=\"ar\">البَائِعُ</span> satıcı · <span class=\"ar\">الزَّبُونُ = المُشْتَرِي</span> müşteri · <span class=\"ar\">البِضَاعَةُ</span> mal · <span class=\"ar\">السِّعْرُ = الثَّمَنُ</span> fiyat · <span class=\"ar\">رَخِيصٌ ≠ غَالٍ</span> ucuz ≠ pahalı · <span class=\"ar\">طَازَجٌ ≠ بَائِتٌ</span> taze ≠ bayat." },
    { tr: "<b>بَاعَ / اشْتَرَى:</b> satıcı satar (<span class=\"ar\">يَبِيعُ</span>), müşteri alır (<span class=\"ar\">يَشْتَرِي</span>). <span class=\"ar\">تَسَوَّقَ – يَتَسَوَّقُ – التَّسَوُّقُ</span> alışveriş yapmak." },
    { tr: "<b>بِالنِّسْبَةِ لِي</b> “benim için, bana göre”: <span class=\"ar\">يَوْمُ التَّسَوُّقِ يَوْمٌ مُمْتِعٌ بِالنِّسْبَةِ لِي</span>." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: هَلْ فِي مِنْطَقَتِكَ سُوقٌ؟ مَاذَا فِي السُّوقِ؟ مَتَى تَذْهَبُ / تَذْهَبِينَ إِلَيْهِ؟ مَاذَا تَشْتَرِي / تَشْتَرِينَ مِنْهُ عَادَةً؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "يَوْمُ التَّسَوُّقِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "هَلْ فِي مِنْطَقَتِكَ سُوقٌ؟", a: "نَعَمْ، فِي مِنْطَقَتِي سُوقٌ كَبِيرٌ يَفْتَحُ يَوْمَ السَّبْتِ.", tr: "Semtinde pazar var mı? (Örnek) Evet, cumartesi kurulan büyük bir pazar var." },
        { q: "مَاذَا فِي السُّوقِ؟", a: "فِي السُّوقِ خَضْرَاوَاتٌ وَفَوَاكِهُ وَأَجْبَانٌ وَأَلْبِسَةٌ.", tr: "Pazarda ne var? Sebze, meyve, peynir, giysi." },
        { q: "مَتَى تَذْهَبُ إِلَيْهِ؟", a: "أَذْهَبُ إِلَيْهِ صَبَاحًا مَعَ أُمِّي.", tr: "Oraya ne zaman gidersin? Sabahleyin annemle." },
        { q: "مَاذَا تَشْتَرِي مِنْهُ عَادَةً؟", a: "أَشْتَرِي عَادَةً الطَّمَاطِمَ وَالخِيَارَ وَالتُّفَّاحَ.", tr: "Oradan genellikle ne alırsın? Domates, salatalık, elma." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "يَسْكُنُ يَزَنُ فِي مِنْطَقَةِ الفَاتِحِ.", a: "d", why: "نَسْكُنُ فِي إِسْطَنْبُولَ فِي مِنْطَقَةٍ… اسْمُهَا «الفَاتِحُ»." },
        { s: "الفَاتِحُ مَرْكَزُ المَدِينَةِ الجَدِيدَةِ.", a: "y", why: "هِيَ مَرْكَزُ المَدِينَةِ القَدِيمَةِ." },
        { s: "يَفْتَحُ سُوقُ الأَرْبِعَاءِ كُلَّ يَوْمٍ.", a: "y", why: "يَفْتَحُ يَوْمًا وَاحِدًا فِي الأُسْبُوعِ فَقَطْ." },
        { s: "سُوقُ الأَرْبِعَاءِ صَغِيرٌ وَهَادِئٌ.", a: "y", why: "كَبِيرٌ جِدًّا وَوَاسِعٌ وَمُزْدَحِمٌ بِالنَّاسِ." },
        { s: "أَسْعَارُ سُوقِ الأَرْبِعَاءِ رَخِيصَةٌ جِدًّا.", a: "d", why: "فَأَسْعَارُهُ رَخِيصَةٌ جِدًّا." },
        { s: "فِي السُّوقِ كُلُّ شَيْءٍ تَقْرِيبًا.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَبِيعُ البَائِعُونَ الأَدَوَاتِ المَنْزِلِيَّةَ الكَبِيرَةَ.", a: "y", why: "الأَدَوَاتِ المَنْزِلِيَّةَ الصَّغِيرَةَ." },
        { s: "يَعْرِضُ البَائِعُونَ بَضَائِعَهُمْ بِشَكْلٍ جَمِيلٍ.", a: "d", why: "…بِشَكْلٍ جَمِيلٍ يَجْذِبُ الزَّبَائِنَ." },
        { s: "يَذْهَبُ يَزَنُ مَعَ أَبِيهِ إِلَى السُّوقِ.", a: "y", why: "أَنَا أَذْهَبُ مَعَ أُمِّي." },
        { s: "تَحْتَاجُ العَائِلَةُ كُلَّ أُسْبُوعٍ إِلَى كِيلَيْنِ مِنَ اللَّحْمِ الأَحْمَرِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "تَشْتَرِي العَائِلَةُ نِصْفَ كِيلٍ مِنَ البَطَاطَا.", a: "y", why: "كِيلٌ وَنِصْفٌ مِنَ البَطَاطَا؛ yarım kilo salatalık." },
        { s: "تَشْتَرِي العَائِلَةُ نَوْعَيْنِ مِنَ الفَوَاكِهِ.", a: "d", why: "مِثْلَ التُّفَّاحِ وَالعِنَبِ." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("يَوْمُ التَّسَوُّقِ هُوَ يَوْمٌ مُمْتِعٌ", "مُمْتِعٌ"), "zevkli", "yorucu", "sıkıcı", "Alışveriş günü zevkli bir gündür.", "= مُسَلٍّ · ≠ مُمِلٌّ"],
      [HL("وَمُزْدَحِمٌ بِالنَّاسِ", "وَمُزْدَحِمٌ"), "kalabalık", "boş", "sessiz", "İnsanlarla kalabalık.", "زِحَامٌ: kalabalık."],
      [HL("لِشِرَاءِ احْتِيَاجَاتِهِمْ", "احْتِيَاجَاتِهِمْ"), "ihtiyaçları", "hediyeleri", "evleri", "İhtiyaçlarını almak için.", "احْتَاجَ إِلَى: ihtiyaç duydu."],
      [HL("فَأَسْعَارُهُ رَخِيصَةٌ جِدًّا", "رَخِيصَةٌ"), "ucuz", "pahalı", "eski", "Fiyatları çok ucuz.", "≠ غَالِيَةٌ"],
      [HL("وَفِيهِ كُلُّ شَيْءٍ تَقْرِيبًا", "تَقْرِيبًا"), "hemen hemen", "asla", "yalnızca", "Orada hemen hemen her şey var.", ""],
      [HL("مِنَ الصَّبَاحِ البَاكِرِ", "البَاكِرِ"), "erken", "geç", "soğuk", "Sabahın erken saatinden.", "= مُبَكِّرٌ"],
      [HL("وَالأَلْبِسَةَ وَالأَحْذِيَةَ", "وَالأَحْذِيَةَ"), "ayakkabılar", "şapkalar", "çantalar", "Giysiler ve ayakkabılar.", "Tekili: حِذَاءٌ."],
      [HL("يَعْرِضُونَ بَضَائِعَهُمْ", "يَعْرِضُونَ"), "sergilerler", "saklarlar", "taşırlar", "Mallarını sergilerler.", "= يُقَدِّمُونَ"],
      [HL("بِشَكْلٍ جَمِيلٍ يَجْذِبُ الزَّبَائِنَ", "يَجْذِبُ"), "çeker", "kaçırır", "kızdırır", "Müşterileri çeker.", ""],
      [HL("مُعْظَمُ البَائِعِينَ لَطِيفُونَ", "مُعْظَمُ"), "çoğu", "hiçbiri", "biri", "Satıcıların çoğu nazik.", ""],
      [HL("تَكُونُ طَازَجَةً", "طَازَجَةً"), "taze", "bayat", "pahalı", "Taze olur.", "≠ بَائِتَةٌ"],
      [HL("لَوَازِمَ البَيْتِ الأُسْبُوعِيَّةَ", "لَوَازِمَ"), "ihtiyaçlar", "anahtarlar", "odalar", "Evin haftalık ihtiyaçları.", "Tekili: لَازِمٌ / لَازِمَةٌ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama ve Haftalık Liste", short: "Anlama", col: "nasb", legend: ["nasb", "ref"],
  goals: ["Metinle ilgili soruları cevaplamak", "Ailenin haftalık ihtiyaç tablosunu metinden doldurmak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "Miktarları söylemek: kilo, yarım kilo, bir buçuk kilo, iki kilo"],
  examples: [
    { s: "نَحْتَاجُ إِلَى:- / كِيلَيْنِ:ref.2 kilo / مِنَ اللَّحْمِ الأَحْمَرِ:nasb", tr: "İki kilo kırmızı ete ihtiyacımız var.", pair: "وَ:- / نِصْفِ كِيلٍ:ref.Yarım kilo / مِنَ الخِيَارِ:nasb", pairTr: "ve yarım kilo salatalığa." }
  ],
  rules: [
    { tr: "<b>Miktar + مِنْ + mal:</b> <span class=\"ar\">كِيلٌ مِنَ الطَّمَاطِمِ</span> bir kilo domates · <span class=\"ar\">نِصْفُ كِيلٍ مِنَ الخِيَارِ</span> yarım kilo salatalık · <span class=\"ar\">كِيلٌ وَنِصْفٌ مِنَ البَطَاطَا</span> bir buçuk kilo patates · <span class=\"ar\">كِيلَانِ مِنَ اللَّحْمِ</span> iki kilo et." },
    { tr: "<b>İkil (müsennâ):</b> “iki” için sayı söylenmez, isme <span class=\"ar\">ـَانِ</span> (merfû) ya da <span class=\"ar\">ـَيْنِ</span> (mansûb / mecrûr) eklenir: <span class=\"ar\">عِنْدِي كِيلَانِ · نَحْتَاجُ إِلَى كِيلَيْنِ · نَشْتَرِي نَوْعَيْنِ</span>." },
    { tr: "<b>Kitaptaki tablo:</b> 2. etkinliğin tablosunda “1,5 kilo” ikinci sütuna, “patates” üçüncü sütuna yazılmış; metne göre bir buçuk kilo patatesindir, tavuk eti bir kilodur. Burada metne göre eşleştiriyoruz." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: أَيْنَ يَسْكُنُ يَزَنُ؟ وَمَا اسْمُ مِنْطَقَتِهِ؟ مَتَى يَفْتَحُ السُّوقُ؟ مَاذَا يَشْتَرِي يَزَنُ وَأُمُّهُ مِنَ السُّوقِ عَادَةً؟ كَيْفَ يَعْرِفُ المُشْتَرِي الأَسْعَارَ؟", "٢ ـ امْلَإِ الجَدْوَلَ الآتِيَ بِالمُنَاسِبِ مِنَ النَّصِّ: اللَّوَازِمُ الأُسْبُوعِيَّةُ لِأُسْرَةِ يَزَنَ. ٣ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["أَيْنَ يَسْكُنُ يَزَنُ؟ وَمَا اسْمُ مِنْطَقَتِهِ؟", "يَسْكُنُ فِي إِسْطَنْبُولَ، وَاسْمُ مِنْطَقَتِهِ «الفَاتِحُ».", "يَسْكُنُ فِي أَنْقَرَةَ، وَاسْمُ مِنْطَقَتِهِ «الفَاتِحُ».", "يَسْكُنُ فِي إِسْطَنْبُولَ، وَاسْمُ مِنْطَقَتِهِ «الأَرْبِعَاءُ».", "Nerede oturuyor, semtinin adı ne? İstanbul, Fatih.", "«الأَرْبِعَاءُ» pazarın adıdır."],
      ["مَتَى يَفْتَحُ السُّوقُ؟", "يَفْتَحُ يَوْمًا وَاحِدًا فِي الأُسْبُوعِ، مِنَ الصَّبَاحِ البَاكِرِ إِلَى المَسَاءِ.", "يَفْتَحُ كُلَّ يَوْمٍ مِنَ الظُّهْرِ إِلَى اللَّيْلِ.", "يَفْتَحُ يَوْمَ الجُمُعَةِ فِي المَسَاءِ فَقَطْ.", "Pazar ne zaman açık? Haftada bir gün (çarşamba), sabah erkenden akşama kadar.", ""],
      ["مَاذَا يَشْتَرِي يَزَنُ وَأُمُّهُ مِنَ السُّوقِ عَادَةً؟", "لَوَازِمَ البَيْتِ الأُسْبُوعِيَّةَ: اللَّحْمَ وَالخَضْرَاوَاتِ وَالأَرُزَّ وَالبُرْغُلَ وَالفَوَاكِهَ.", "الأَلْبِسَةَ وَالأَحْذِيَةَ فَقَطْ.", "الأَدَوَاتِ المَنْزِلِيَّةَ الكَبِيرَةَ.", "Genellikle ne alırlar? Evin haftalık ihtiyaçlarını.", ""],
      ["كَيْفَ يَعْرِفُ المُشْتَرِي الأَسْعَارَ؟", "يَكْتُبُ البَائِعُونَ الأَسْعَارَ عَلَى وَرَقَةٍ صَغِيرَةٍ وَيَضَعُونَهَا عَلَى البِضَاعَةِ.", "يَسْأَلُ المُشْتَرِي أُمَّهُ عَنِ الأَسْعَارِ.", "يَقْرَأُ المُشْتَرِي الأَسْعَارَ فِي الجَرِيدَةِ.", "Müşteri fiyatları nasıl öğrenir? Satıcılar küçük kâğıtlara yazıp malın üstüne koyar.", ""]
    ])},
    { type: "classify", num: "٢", opts: MIKTAR, ar: "امْلَإِ الجَدْوَلَ الآتِيَ بِالمُنَاسِبِ مِنَ النَّصِّ: اللَّوَازِمُ الأُسْبُوعِيَّةُ لِأُسْرَةِ يَزَنَ", tr: "Ailenin her hafta bu maldan ne kadar aldığını seç (metne göre).", items: CL([
      ["اللَّحْمُ الأَحْمَرُ 🥩", "q2", "كِيلَيْنِ مِنَ اللَّحْمِ الأَحْمَرِ"],
      ["لَحْمُ الدَّجَاجِ 🍗", "q1", "وَكِيلٍ مِنْ لَحْمِ الدَّجَاجِ"],
      ["البَطَاطَا 🥔", "q15", "كِيلٍ وَنِصْفٍ مِنَ البَطَاطَا"],
      ["الطَّمَاطِمُ 🍅", "q1", "وَكِيلٍ مِنَ الطَّمَاطِمِ"],
      ["الخِيَارُ 🥒", "q05", "وَنِصْفِ كِيلٍ مِنَ الخِيَارِ"],
      ["الأَرُزُّ 🍚", "q1", "كِيلًا مِنَ الأَرُزِّ"],
      ["البُرْغُلُ 🌾", "q1", "وَكِيلًا مِنَ البُرْغُلِ"]
    ]) },
    { type: "classify", num: "٣", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["يَتَسَوَّقُ يَزَنُ كُلَّ يَوْمٍ.", "y", "لَكِنْ لَا نَتَسَوَّقُ كُلَّ يَوْمٍ."],
      ["يَذْهَبُ يَزَنُ إِلَى السُّوقِ مَعَ أُمِّهِ عَادَةً.", "d", "أَنَا أَذْهَبُ مَعَ أُمِّي إِلَى السُّوقِ."],
      ["يَأْتِي الزَّبَائِنُ إِلَى سُوقِ الأَرْبِعَاءِ مِنْ كُلِّ تُرْكِيَا.", "y", "مِنْ كُلِّ مَنَاطِقِ إِسْطَنْبُولَ."],
      ["يَذْهَبُ يَزَنُ إِلَى السُّوقِ مُبَكِّرًا عَادَةً لِأَنَّ البِضَاعَةَ تَكُونُ بَائِتَةً.", "y", "لِأَنَّهَا تَكُونُ طَازَجَةً (بَائِتٌ: bayat)."],
      ["سِعْرُ البِضَاعَةِ مَكْتُوبٌ عَلَى أَوْرَاقٍ صَغِيرَةٍ.", "d", "وَيَكْتُبُونَ أَسْعَارَ بَضَائِعِهِمْ عَلَى وَرَقَةٍ صَغِيرَةٍ."],
      ["البَائِعُونَ لَطِيفُونَ مَعَ الزَّبَائِنِ.", "d", "مُعْظَمُ البَائِعِينَ لَطِيفُونَ مَعَ زَبَائِنِهِمْ."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["يَتَسَوَّقُ يَزَنُ كُلَّ يَوْمٍ. ✗", "لَا يَتَسَوَّقُ يَزَنُ كُلَّ يَوْمٍ.", "يَتَسَوَّقُ يَزَنُ كُلَّ سَاعَةٍ.", "لَا يُحِبُّ يَزَنُ التَّسَوُّقَ.", "Yezen her gün alışveriş yapmaz.", "Alışverişi sever ama her gün yapmaz."],
      ["يَأْتِي الزَّبَائِنُ مِنْ كُلِّ تُرْكِيَا. ✗", "يَأْتِي الزَّبَائِنُ مِنْ كُلِّ مَنَاطِقِ إِسْطَنْبُولَ.", "يَأْتِي الزَّبَائِنُ مِنْ مِنْطَقَةِ الفَاتِحِ فَقَطْ.", "لَا يَأْتِي الزَّبَائِنُ إِلَى السُّوقِ.", "Müşteriler İstanbul’un her semtinden gelir.", ""],
      ["البِضَاعَةُ تَكُونُ بَائِتَةً فِي الصَّبَاحِ. ✗", "الخَضْرَاوَاتُ وَالفَوَاكِهُ تَكُونُ طَازَجَةً فِي الصَّبَاحِ.", "البِضَاعَةُ تَكُونُ غَالِيَةً فِي الصَّبَاحِ.", "لَا بِضَاعَةَ فِي الصَّبَاحِ.", "Sabah sebze ve meyve tazedir.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Eş, Zıt, Çoğul", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Pazar kelimeleriyle boşluk doldurmak", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Altı çizili kelimenin zıddını bulmak", "Tekil ile çoğulu eşleştirmek"],
  examples: [
    { s: "الزَّبُونُ:mz.Kelime / = المُشْتَرِي:nasb.Eş", tr: "müşteri = alıcı", pair: "رَخِيصٌ:mz.Kelime / ≠ غَالٍ:cerr.Zıt", pairTr: "ucuz ≠ pahalı" }
  ],
  rules: [
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">مُمْتِعٌ = مُسَلٍّ · سِعْرٌ = ثَمَنٌ · الزَّبُونُ = المُشْتَرِي · عَادَةً = عُمُومًا · يَعْرِضُ = يُقَدِّمُ</span>" },
    { tr: "<b>Zıt anlam:</b> <span class=\"ar\">مُمِلٌّ ≠ مُمْتِعٌ · جَدِيدٌ ≠ قَدِيمٌ · صَغِيرٌ ≠ كَبِيرٌ · غَالٍ ≠ رَخِيصٌ · مُتَأَخِّرٌ ≠ مُبَكِّرٌ · البَائِعُ ≠ الزَّبُونُ · يَبِيعُ ≠ يَشْتَرِي</span>" },
    { tr: "<b>Çoğullar:</b> <span class=\"ar\">مِنْطَقَةٌ ← مَنَاطِقُ · بَائِعٌ ← بَاعَةٌ / بَائِعُونَ · زَبُونٌ ← زَبَائِنُ · فَاكِهَةٌ ← فَوَاكِهُ · بِضَاعَةٌ ← بَضَائِعُ</span>. Not: <span class=\"ar\">مَفَاعِلُ</span>, <span class=\"ar\">فَعَائِلُ</span> ve <span class=\"ar\">فَوَاعِلُ</span> kalıpları tenvin almaz." }
  ],
  kaide: ["٤ ـ امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِالكَلِمَةِ المُنَاسِبَةِ لِكُلٍّ مِنْهَا: (رَخِيصَةٌ، يَفْتَحُ، يَحْتَاجُ، السُّوقِ، أَتَسَوَّقَ، الجَيِّدَةَ، الزَّبُونُ، لَوَازِمَ البَيْتِ).", "٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا. ٦ ـ خَمِّنْ عَكْسَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ مِنَ المُفْرَدَاتِ الآتِيَةِ: (مُبَكِّرٌ، يَشْتَرِي، الزَّبُونُ، كَبِيرٌ، مُمْتِعًا، قَدِيمٌ، رَخِيصٌ). ٧ ـ صِلْ بَيْنَ الكَلِمَةِ وَجَمْعِهَا."],
  ex: [
    { type: "bank", num: "٤", ar: "امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِالكَلِمَةِ المُنَاسِبَةِ لِكُلٍّ مِنْهَا", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. İki kelime artar (يَفْتَحُ، السُّوقِ).", bank: ["رَخِيصَةٌ", "يَفْتَحُ", "يَحْتَاجُ", "السُّوقِ", "أَتَسَوَّقَ", "الجَيِّدَةَ", "الزَّبُونُ", "لَوَازِمَ البَيْتِ"],
      tr2: "1) Tatil gününde alışveriş yapmayı severim. 2) Büyük pazarda mallar ucuzdur, bu yüzden evin ihtiyaçlarını hep büyük pazarlardan alırız. 3) Çocukların her zaman taze meyveye ihtiyacı vardır. 4) Müşteri ucuz ve kaliteli malı sever.",
      parts: ["١ ـ أُحِبُّ أَنْ", { a: [4] }, "فِي يَوْمِ العُطْلَةِ.<br>٢ ـ البِضَاعَةُ فِي السُّوقِ الكَبِيرِ", { a: [0] }, "، فَنَحْنُ نَشْتَرِي", { a: [7] }, "مِنَ الأَسْوَاقِ الكَبِيرَةِ دَائِمًا.<br>٣ ـ", { a: [2] }, "الأَطْفَالُ إِلَى الفَوَاكِهِ الطَّازَجَةِ دَائِمًا.<br>٤ ـ يُحِبُّ", { a: [6] }, "البِضَاعَةَ الرَّخِيصَةَ وَ", { a: [5] }, "."] },
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["يُقَدِّمُ", "المُشْتَرِي", "عُمُومًا", "ثَمَنٌ", "مُسَلٍّ"], items: [
      { pre: "مُمْتِعٌ =", a: [4], tr: "zevkli = eğlenceli" }, { pre: "سِعْرٌ =", a: [3], tr: "fiyat = bedel" }, { pre: "الزَّبُونُ =", a: [1], tr: "müşteri = alıcı" }, { pre: "عَادَةً =", a: [2], tr: "genellikle = genel olarak" }, { pre: "يَعْرِضُ =", a: [0], tr: "sergiler = sunar" }
    ]},
    { type: "bank", num: "٦", ar: "خَمِّنْ عَكْسَ الكَلِمَاتِ الَّتِي تَحْتَهَا خَطٌّ مِنَ المُفْرَدَاتِ الآتِيَةِ", tr: "Altı çizili kelimenin zıddını seç, sonra kutusuna dokun.", bank: ["مُبَكِّرٌ", "يَشْتَرِي", "الزَّبُونُ", "كَبِيرٌ", "مُمْتِعًا", "قَدِيمٍ", "رَخِيصًا"], items: [
      { pre: "١ ـ شَاهَدْتُ فِيلْمًا <u>مُمِلًّا</u> أَمْسِ، فَمَا أَحْبَبْتُ هَذَا الفِيلْمَ. ≠", a: [4], tr: "Dün sıkıcı bir film izledim. sıkıcı ≠ zevkli" },
      { pre: "٢ ـ أَسْكُنُ فِي بِنَاءٍ <u>جَدِيدٍ</u> وَجَمِيلٍ فِي مَرْكَزِ المَدِينَةِ. ≠", a: [5], tr: "Yeni bir binada oturuyorum. yeni ≠ eski" },
      { pre: "٣ ـ بَيْتِي <u>صَغِيرٌ</u>، فِيهِ غُرْفَتَانِ صَغِيرَتَانِ فَقَطْ. ≠", a: [3], tr: "Evim küçük. küçük ≠ büyük" },
      { pre: "٤ ـ اشْتَرَيْتُ مَوْزًا <u>غَالِيًا</u> مِنَ السُّوقِ، بِسَبْعِ لِيرَاتٍ. ≠", a: [6], tr: "Pazardan pahalı muz aldım. pahalı ≠ ucuz" },
      { pre: "٥ ـ أَسْتَيْقِظُ السَّاعَةَ 11 صَبَاحًا، أَنَا <u>مُتَأَخِّرٌ</u> دَائِمًا. ≠", a: [0], tr: "Saat 11’de kalkarım, hep geç kalırım. geç ≠ erken" },
      { pre: "٦ ـ <u>البَائِعُ</u> يَبِيعُ الخُضَارَ وَالفَوَاكِهَ وَالمَلَابِسَ. (١) ≠", a: [2], tr: "Satıcı sebze, meyve ve giysi satar. satıcı ≠ müşteri" },
      { pre: "٦ ـ البَائِعُ <u>يَبِيعُ</u> الخُضَارَ وَالفَوَاكِهَ وَالمَلَابِسَ. (٢) ≠", a: [1], tr: "satar ≠ alır" }
    ]},
    { type: "bank", num: "٧", ar: "صِلْ بَيْنَ الكَلِمَةِ وَجَمْعِهَا فِي الآتِي", tr: "Önce aşağıdan çoğulu seç, sonra tekilin kutusuna dokun.", bank: ["زَبَائِنُ", "مَنَاطِقُ", "فَوَاكِهُ", "بَضَائِعُ", "بَاعَةٌ"], items: [
      { pre: "مِنْطَقَةٌ ←", a: [1], tr: "semt → semtler" }, { pre: "بَائِعٌ ←", a: [4], tr: "satıcı → satıcılar" }, { pre: "زَبُونٌ ←", a: [0], tr: "müşteri → müşteriler" }, { pre: "فَاكِهَةٌ ←", a: [2], tr: "meyve → meyveler" }, { pre: "بِضَاعَةٌ ←", a: [3], tr: "mal → mallar" }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE
{
  id: "u4", no: 4, ar: "الأَسْئِلَةُ وَتَرْتِيبُ الكَلِمَاتِ", tr: "Soru Kurma, Cümle Kurma, Kelime Kullanma", short: "Cümle", col: "ref", legend: ["mi", "mz"],
  goals: ["Verilen cevaba uygun soruyu yazmak: مَتَى، مَاذَا، لِمَاذَا", "Karışık kelimelerden anlamlı cümle kurmak", "Yeni kelimeleri doğru cümlede kullanmak", "Kendi cümlelerini kurmak"],
  examples: [
    { s: "مَتَى:mi.Soru / يَفْتَحُ السُّوقُ؟:mz / ← يَفْتَحُ فِي الصَّبَاحِ البَاكِرِ.:-", tr: "Pazar ne zaman açılır? Sabah erkenden.", pair: "لِمَاذَا:mi.Soru / يَأْتِي النَّاسُ؟:mz / ← لِأَنَّ أَسْعَارَهُ رَخِيصَةٌ.:-", pairTr: "İnsanlar neden gelir? Çünkü fiyatları ucuz." }
  ],
  rules: [
    { tr: "<b>Soruyu cevaptan bul:</b> zaman → <span class=\"ar\">مَتَى</span> · şey → <span class=\"ar\">مَاذَا</span> (fiille) / <span class=\"ar\">مَا</span> (isimle) · sebep (<span class=\"ar\">لِأَنَّ</span>) → <span class=\"ar\">لِمَاذَا</span> · yer → <span class=\"ar\">أَيْنَ</span> · kişi → <span class=\"ar\">مَنْ</span> · miktar → <span class=\"ar\">كَمْ</span>." },
    { tr: "<b>Fiil cümlesi sırası:</b> fiil + fâil + meful + yer/zaman: <span class=\"ar\">يَبِيعُ البَائِعُونَ الخَضْرَاوَاتِ فِي السُّوقِ</span>. Fiil başta olunca çoğul fâile rağmen fiil tekil kalır (<span class=\"ar\">يَبِيعُ البَائِعُونَ</span>)." },
    { tr: "<b>11. etkinlik:</b> kitap kelimeleri kendi cümlende kullanmanı istiyor. Burada kelimeyi doğru cümleye yerleştir; sonra defterine her kelimeyle bir cümle yaz." }
  ],
  kaide: ["٨ ـ اكْتُبْ أَسْئِلَةً لِلْجُمَلِ الآتِيَةِ. ٩ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً.", "١١ ـ اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ: مُمْتِعٌ، بَضَائِعُ، عَادَةً، طَازَجَةٌ، زَبُونٌ، تَسَوَّقَ، بَائِتٌ."],
  ex: [
    { type: "pick", fill: true, num: "٨", ar: "اكْتُبْ أَسْئِلَةً لِلْجُمَلِ الآتِيَةِ", tr: "Cevaba uyan soruyu seç.", items: PL([
      ["___؟ يَفْتَحُ السُّوقُ فِي الصَّبَاحِ البَاكِرِ.", "مَتَى يَفْتَحُ السُّوقُ", "أَيْنَ يَفْتَحُ السُّوقُ", "لِمَاذَا يَفْتَحُ السُّوقُ", "Pazar ne zaman açılır? Sabah erkenden.", "Zaman → مَتَى"],
      ["___؟ فِي السُّوقِ أَشْيَاءُ كَثِيرَةٌ.", "مَاذَا فِي السُّوقِ", "مَنْ فِي السُّوقِ", "مَتَى السُّوقُ", "Pazarda ne var? Birçok şey.", "Şey → مَاذَا / مَا"],
      ["___؟ لِأَنَّ أَسْعَارَهُ رَخِيصَةٌ.", "لِمَاذَا يَأْتِي النَّاسُ إِلَى السُّوقِ", "مَتَى يَأْتِي النَّاسُ إِلَى السُّوقِ", "كَيْفَ يَأْتِي النَّاسُ إِلَى السُّوقِ", "İnsanlar pazara neden gelir? Çünkü fiyatları ucuz.", "لِأَنَّ → لِمَاذَا"],
      ["___؟ يَبِيعُ البَائِعُونَ الخَضْرَاوَاتِ وَالفَوَاكِهَ.", "مَاذَا يَبِيعُ البَائِعُونَ", "أَيْنَ يَبِيعُ البَائِعُونَ", "مَتَى يَبِيعُ البَائِعُونَ", "Satıcılar ne satar? Sebze ve meyve.", "Fiille şey → مَاذَا"],
      ["___؟ أَذْهَبُ إِلَى السُّوقِ مَعَ أُمِّي.", "مَعَ مَنْ تَذْهَبُ إِلَى السُّوقِ", "مَاذَا تَذْهَبُ إِلَى السُّوقِ", "كَمْ تَذْهَبُ إِلَى السُّوقِ", "Pazara kiminle gidersin? Annemle.", "Ek soru: kişi → مَنْ"],
      ["___؟ نَحْتَاجُ إِلَى كِيلَيْنِ مِنَ اللَّحْمِ.", "كَمْ كِيلًا مِنَ اللَّحْمِ تَحْتَاجُونَ", "لِمَاذَا تَحْتَاجُونَ اللَّحْمَ", "مَنْ يَحْتَاجُ اللَّحْمَ", "Kaç kilo ete ihtiyacınız var? İki kilo.", "Ek soru: miktar → كَمْ + tekil mansûb."]
    ])},
    { type: "bank", num: "٩", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["السُّوقُ", "يَوْمًا", "وَاحِدًا", "فِي", "الأُسْبُوعِ", "مِنَ", "الصَّبَاحِ", "البَاكِرِ", "إِلَى", "المَسَاءِ", "البَائِعُونَ", "الخَضْرَاوَاتِ", "السُّوقِ", "مَعَ", "أُمِّي", "مُبَكِّرًا"],
      tr2: "1) Pazar haftada bir gün açılır. 2) Pazar sabah erkenden akşama kadar açıktır. 3) Satıcılar pazarda sebze satar. 4) Annemle pazara erkenden giderim.",
      parts: ["١ ـ يَفْتَحُ", { a: [0] }, { a: [1] }, { a: [2] }, { a: [3] }, { a: [4] }, ".<br>٢ ـ يَفْتَحُ", { a: [0] }, { a: [5] }, { a: [6] }, { a: [7] }, { a: [8] }, { a: [9] }, ".<br>٣ ـ يَبِيعُ", { a: [10] }, { a: [11] }, { a: [3] }, { a: [12] }, ".<br>٤ ـ أَذْهَبُ", { a: [13] }, { a: [14] }, { a: [8] }, { a: [12] }, { a: [15] }, "."] },
    { type: "pick", fill: true, num: "١١", ar: "اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ", tr: "Boşluğa uyan kelimeyi seç; sonra defterine bu kelimelerle kendi cümlelerini yaz.", items: PL([
      ["قَضَيْنَا يَوْمًا ___ فِي السُّوقِ.", "مُمْتِعًا", "بَائِتًا", "زَبُونًا", "Pazarda zevkli bir gün geçirdik.", "مُمْتِعٌ"],
      ["يَعْرِضُ البَائِعُونَ ___ بِشَكْلٍ جَمِيلٍ.", "بَضَائِعَهُمْ", "زَبُونَهُمْ", "عَادَتَهُمْ", "Satıcılar mallarını güzelce sergiler.", "بَضَائِعُ"],
      ["أَذْهَبُ ___ إِلَى السُّوقِ يَوْمَ الأَرْبِعَاءِ.", "عَادَةً", "طَازَجَةً", "بَضَائِعَ", "Genellikle çarşamba pazara giderim.", "عَادَةً"],
      ["الفَوَاكِهُ فِي الصَّبَاحِ ___ .", "طَازَجَةٌ", "زَبُونٌ", "عَادَةٌ", "Sabah meyveler tazedir.", "طَازَجَةٌ"],
      ["___ يَشْتَرِي الخَضْرَاوَاتِ مِنَ البَائِعِ.", "الزَّبُونُ", "التَّسَوُّقُ", "المُمْتِعُ", "Müşteri satıcıdan sebze alır.", "زَبُونٌ"],
      ["___ مَعَ أُمِّي يَوْمَ العُطْلَةِ.", "تَسَوَّقْتُ", "بَائِتٌ", "زَبَائِنُ", "Tatil günü annemle alışveriş yaptım.", "تَسَوَّقَ"],
      ["لَا أُحِبُّ الخُبْزَ ___ ، أُحِبُّ الخُبْزَ الطَّازَجَ.", "البَائِتَ", "المُمْتِعَ", "الزَّبُونَ", "Bayat ekmeği sevmem, taze ekmeği severim.", "بَائِتٌ ≠ طَازَجٌ"]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · KALIPLAR VE PAZAR
{
  id: "u5", no: 5, ar: "التَّرَاكِيبُ وَأَصْنَافُ السُّوقِ", tr: "Kalıplar, Miktar ve Reyonlar", short: "Kalıplar", col: "muz", legend: ["mi", "ref"],
  goals: ["“Ama”, “çünkü” ve “…den …e kadar” kalıplarını kullanmak: لَكِنْ، لِأَنَّ، مِنْ… إِلَى", "Pazarda satılan şeyleri reyonlarına göre ayırmak", "Miktarı doğru söylemek: كِيلًا، نِصْفَ كِيلٍ، كِيلَيْنِ", "Alışveriş cümlesi kurmak: أُرِيدُ كِيلًا مِنَ…"],
  examples: [
    { s: "نُحِبُّ التَّسَوُّقَ كَثِيرًا،:- / لَكِنْ:mi.Ama / لَا نَتَسَوَّقُ كُلَّ يَوْمٍ.:-", tr: "Alışverişi çok severiz ama her gün yapmayız." },
    { s: "يَأْتِي النَّاسُ:- / إِلَى:mi.Yön / السُّوقِ؛:mz / لِأَنَّ:mi.Çünkü / أَسْعَارَهُ رَخِيصَةٌ.:-", tr: "İnsanlar pazara gelir; çünkü fiyatları ucuz.", pair: "يَفْتَحُ السُّوقُ:mz / مِنَ:mi.Başlangıç / الصَّبَاحِ البَاكِرِ:- / إِلَى:mi.Bitiş / المَسَاءِ.:-", pairTr: "Pazar sabah erkenden akşama kadar açıktır." }
  ],
  rules: [
    { tr: "<b>لَكِنْ / لَكِنَّ</b> “ama”: önceki bilgiyi sınırlar. <span class=\"ar\">لَكِنْ</span> (sakin) ardından fiil gelir: <span class=\"ar\">لَكِنْ لَا نَتَسَوَّقُ</span>; <span class=\"ar\">لَكِنَّ</span> (şeddeli) ardından mansûb isim gelir: <span class=\"ar\">لَكِنَّ السُّوقَ بَعِيدٌ</span>." },
    { tr: "<b>لِأَنَّ</b> “çünkü”: sebep bildirir; ardından isim mansûb, haberi merfû: <span class=\"ar\">لِأَنَّ أَسْعَارَهُ رَخِيصَةٌ</span>. Zamirle: <span class=\"ar\">لِأَنَّهُ · لِأَنَّهَا · لِأَنَّنِي</span>. Sorusu <span class=\"ar\">لِمَاذَا؟</span>" },
    { tr: "<b>Başlangıç ve bitiş</b> (“…den …e kadar”): <span class=\"ar\">مِنَ الصَّبَاحِ إِلَى المَسَاءِ</span> sabahtan akşama · <span class=\"ar\">مِنْ إِسْطَنْبُولَ إِلَى أَنْقَرَةَ</span> İstanbul’dan Ankara’ya. Ardından gelen isim mecrûrdur. Tek başına <span class=\"ar\">إِلَى</span> yön bildirir: <span class=\"ar\">يَأْتِي النَّاسُ إِلَى السُّوقِ</span>." },
    { tr: "<b>Miktar:</b> fiilden sonra mansûb: <span class=\"ar\">نَشْتَرِي كِيلًا مِنَ الأَرُزِّ</span> · <span class=\"ar\">أُرِيدُ نِصْفَ كِيلٍ</span>. <span class=\"ar\">إِلَى</span>’dan sonra mecrûr: <span class=\"ar\">نَحْتَاجُ إِلَى كِيلٍ وَنِصْفٍ</span>. Kitap metninde bir yerde <span class=\"ar\">إِلَى كِيلَيْنِ… وَكِيلًا</span> yazılmış; doğrusu <span class=\"ar\">وَكِيلٍ</span> (burada düzeltildi)." }
  ],
  kaide: ["١٠ ـ اقْرَأْ وَلَاحِظْ مَا تَحْتَهُ خَطٌّ فِي الجُمَلِ الآتِيَةِ، ثُمَّ اكْتُبْ مِثَالَيْنِ لِكُلٍّ مِنْهَا: ١. نُحِبُّ التَّسَوُّقَ كَثِيرًا، لَكِنْ لَا نَتَسَوَّقُ كُلَّ يَوْمٍ. ٢. يَأْتِي النَّاسُ إِلَى السُّوقِ مِنْ كُلِّ مَنَاطِقِ إِسْطَنْبُولَ؛ لِأَنَّ أَسْعَارَهُ رَخِيصَةٌ جِدًّا. ٣. يَفْتَحُ السُّوقُ مِنَ الصَّبَاحِ البَاكِرِ إِلَى المَسَاءِ.", "١٢ ـ اكْتُبْ أَسْمَاءَ الأَشْيَاءِ الَّتِي تُبَاعُ فِي السُّوقِ الشَّعْبِيِّ الأُسْبُوعِيِّ وَصَنِّفْهَا فِي الجَدْوَلِ الآتِي."],
  ex: [
    { type: "pick", fill: true, num: "١٠", ar: "اقْرَأْ وَلَاحِظْ مَا تَحْتَهُ خَطٌّ، ثُمَّ اكْتُبْ مِثَالَيْنِ لِكُلٍّ مِنْهَا", tr: "Boşluğa uyan kalıbı seç; sonra defterine her kalıp için iki örnek yaz.", items: PL([
      ["نُحِبُّ التَّسَوُّقَ كَثِيرًا، ___ لَا نَتَسَوَّقُ كُلَّ يَوْمٍ.", "لَكِنْ", "لِأَنَّ", "إِلَى", "Alışverişi çok severiz ama her gün yapmayız.", "Kısıtlama → لَكِنْ"],
      ["أُحِبُّ الفَوَاكِهَ، ___ لَا أُحِبُّ الخِيَارَ.", "لَكِنْ", "مِنْ", "لِأَنَّ", "Meyveyi severim ama salatalığı sevmem.", ""],
      ["يَأْتِي النَّاسُ إِلَى السُّوقِ؛ ___ أَسْعَارَهُ رَخِيصَةٌ.", "لِأَنَّ", "لَكِنْ", "مِنْ", "İnsanlar pazara gelir, çünkü fiyatları ucuz.", "Sebep → لِأَنَّ"],
      ["أَذْهَبُ إِلَى السُّوقِ مُبَكِّرًا ___ الفَوَاكِهَ تَكُونُ طَازَجَةً.", "لِأَنَّ", "إِلَى", "لَكِنْ", "Pazara erken giderim, çünkü meyveler taze olur.", ""],
      ["يَفْتَحُ السُّوقُ ___ الصَّبَاحِ البَاكِرِ إِلَى المَسَاءِ.", "مِنَ", "إِلَى", "لِأَنَّ", "Pazar sabah erkenden akşama kadar açıktır.", "Başlangıç → مِنْ"],
      ["أَدْرُسُ مِنَ السَّاعَةِ الثَّامِنَةِ ___ السَّاعَةِ الثَّانِيَةِ.", "إِلَى", "مِنَ", "لَكِنْ", "Saat sekizden ikiye kadar ders çalışırım.", "Bitiş → إِلَى"],
      ["يَأْتِي النَّاسُ ___ السُّوقِ مِنْ كُلِّ المَنَاطِقِ.", "إِلَى", "لِأَنَّ", "لَكِنْ", "İnsanlar her semtten pazara gelir.", "Yön → إِلَى"],
      ["لِأَنَّ أَسْعَارَهُ ___ جِدًّا.", "رَخِيصَةٌ", "رَخِيصَةً", "رَخِيصَةٍ", "Çünkü fiyatları çok ucuz.", "أَنَّ’nin haberi merfû."]
    ])},
    { type: "classify", num: "١٢", opts: REYON, ar: "اكْتُبْ أَسْمَاءَ الأَشْيَاءِ الَّتِي تُبَاعُ فِي السُّوقِ الشَّعْبِيِّ الأُسْبُوعِيِّ وَصَنِّفْهَا", tr: "Bu şey pazarda hangi reyonda satılır? (Kitaptaki boş tabloyu bu reyonlarla doldurabilirsin.)", items: CL([
      ["الطَّمَاطِمُ 🍅", "kh", "Sebze."], ["البَطَاطَا 🥔", "kh", "Sebze."], ["الخِيَارُ 🥒", "kh", "Sebze."], ["الجَزَرُ 🥕", "kh", "Sebze."],
      ["التُّفَّاحُ 🍎", "fw", "Meyve."], ["العِنَبُ 🍇", "fw", "Meyve."], ["المَوْزُ 🍌", "fw", "Meyve."], ["البُرْتُقَالُ 🍊", "fw", "Meyve."],
      ["لَحْمُ الدَّجَاجِ 🍗", "lh", "Et."], ["اللَّحْمُ الأَحْمَرُ 🥩", "lh", "Et."],
      ["الجُبْنُ 🧀", "lb", "Süt ürünü."], ["الحَلِيبُ 🥛", "lb", "Süt ürünü."],
      ["القَمِيصُ 👕", "ml", "Giyim."], ["الحِذَاءُ 👞", "ml", "Giyim (ayakkabı)."], ["الفُسْتَانُ 👗", "ml", "Giyim."],
      ["المِلْعَقَةُ 🥄", "ad", "Ev eşyası."], ["الصَّحْنُ 🍽️", "ad", "Ev eşyası."], ["المِكْنَسَةُ 🧹", "ad", "Ev eşyası."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الكَمِّيَّةَ الصَّحِيحَةَ", tr: "Parantezdeki miktarın doğru yazılışını seç (ikil ve i’râba dikkat).", items: PL([
      ["نَحْتَاجُ إِلَى ___ مِنَ اللَّحْمِ الأَحْمَرِ. (2 kg)", "كِيلَيْنِ", "كِيلَانِ", "كِيلٌ", "İki kilo kırmızı ete ihtiyacımız var.", "إِلَى’dan sonra mecrûr ikil: ـَيْنِ"],
      ["عِنْدِي ___ مِنَ الأَرُزِّ. (2 kg)", "كِيلَانِ", "كِيلَيْنِ", "كِيلًا", "Bende iki kilo pirinç var.", "Mübtedâ merfû ikil: ـَانِ"],
      ["أَشْتَرِي ___ مِنَ الخِيَارِ. (½ kg)", "نِصْفَ كِيلٍ", "نِصْفُ كِيلٍ", "كِيلَيْنِ", "Yarım kilo salatalık alırım.", "Meful mansûb: نِصْفَ"],
      ["نَشْتَرِي ___ مِنَ البُرْغُلِ. (1 kg)", "كِيلًا", "كِيلٌ", "كِيلٍ", "Bir kilo bulgur alırız.", "Meful mansûb: كِيلًا"],
      ["نَحْتَاجُ إِلَى ___ مِنَ البَطَاطَا. (1½ kg)", "كِيلٍ وَنِصْفٍ", "كِيلًا وَنِصْفًا", "كِيلَانِ وَنِصْفٌ", "Bir buçuk kilo patatese ihtiyacımız var.", "إِلَى’dan sonra mecrûr."],
      ["نَشْتَرِي أَيْضًا ___ مِنَ الفَوَاكِهِ. (2 çeşit)", "نَوْعَيْنِ", "نَوْعَانِ", "نَوْعًا", "Ayrıca iki çeşit meyve alırız.", "Meful mansûb ikil: ـَيْنِ"]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["يَوْمُ التَّسَوُّقِ يَوْمٌ {مُمْتِعٌ} بِالنِّسْبَةِ لِي.", ["مُمْتِعٌ", "مُمِلٌّ", "بَائِتٌ"], "metin", "Alışveriş günü benim için zevkli bir gündür.", "u1"],
  ["نَسْكُنُ فِي إِسْطَنْبُولَ فِي مِنْطَقَةِ {الفَاتِحِ}.", ["الفَاتِحِ", "الأَرْبِعَاءِ", "أَنْقَرَةَ"], "metin", "İstanbul’da Fatih’te oturuyoruz.", "u1"],
  ["الفَاتِحُ مَرْكَزُ المَدِينَةِ {القَدِيمَةِ}.", ["القَدِيمَةِ", "الجَدِيدَةِ", "الصَّغِيرَةِ"], "metin", "Fatih eski şehrin merkezidir.", "u1"],
  ["يَفْتَحُ السُّوقُ يَوْمًا {وَاحِدًا} فِي الأُسْبُوعِ.", ["وَاحِدًا", "كُلَّ", "سَبْعَةً"], "metin", "Pazar haftada bir gün açılır.", "u1"],
  ["السُّوقُ كَبِيرٌ وَوَاسِعٌ وَ{مُزْدَحِمٌ} بِالنَّاسِ.", ["مُزْدَحِمٌ", "هَادِئٌ", "فَارِغٌ"], "metin", "Pazar insanlarla kalabalıktır.", "u1"],
  ["فَأَسْعَارُهُ {رَخِيصَةٌ} جِدًّا.", ["رَخِيصَةٌ", "غَالِيَةٌ", "قَدِيمَةٌ"], "metin", "Fiyatları çok ucuz.", "u1"],
  ["يَعْرِضُونَ بَضَائِعَهُمْ بِشَكْلٍ جَمِيلٍ يَجْذِبُ {الزَّبَائِنَ}.", ["الزَّبَائِنَ", "البَاعَةَ", "الأَسْعَارَ"], "metin", "Müşterileri çeken güzel bir şekilde sergilerler.", "u1"],
  ["مُعْظَمُ البَائِعِينَ {لَطِيفُونَ} مَعَ زَبَائِنِهِمْ.", ["لَطِيفُونَ", "غَاضِبُونَ", "مُتَأَخِّرُونَ"], "metin", "Satıcıların çoğu nazik.", "u1"],
  ["أَذْهَبُ مَعَ {أُمِّي} إِلَى السُّوقِ مُبَكِّرًا.", ["أُمِّي", "أَبِي", "أَخِي"], "anlama", "Annemle pazara erken giderim.", "u2"],
  ["لِأَنَّ الخَضْرَاوَاتِ تَكُونُ {طَازَجَةً}.", ["طَازَجَةً", "بَائِتَةً", "غَالِيَةً"], "anlama", "Çünkü sebzeler taze olur.", "u2"],
  ["نَحْتَاجُ إِلَى كِيلَيْنِ مِنَ {اللَّحْمِ} الأَحْمَرِ.", ["اللَّحْمِ", "العِنَبِ", "الخِيَارِ"], "tablo", "İki kilo kırmızı ete ihtiyacımız var.", "u2"],
  ["وَنِصْفِ كِيلٍ مِنَ {الخِيَارِ}.", ["الخِيَارِ", "البَطَاطَا", "الأَرُزِّ"], "tablo", "Yarım kilo salatalık.", "u2"],
  ["يُحِبُّ الزَّبُونُ البِضَاعَةَ الرَّخِيصَةَ وَ{الجَيِّدَةَ}.", ["الجَيِّدَةَ", "البَائِتَةَ", "الغَالِيَةَ"], "boşluk", "Müşteri ucuz ve kaliteli malı sever.", "u3"],
  ["سِعْرٌ = {ثَمَنٌ}.", ["ثَمَنٌ", "سُوقٌ", "زَبُونٌ"], "eş anlam", "Fiyat = bedel.", "u3"],
  ["الزَّبُونُ = {المُشْتَرِي}.", ["المُشْتَرِي", "البَائِعُ", "التَّاجِرُ"], "eş anlam", "Müşteri = alıcı.", "u3"],
  ["غَالٍ ≠ {رَخِيصٌ}.", ["رَخِيصٌ", "كَبِيرٌ", "طَازَجٌ"], "zıt", "Pahalı ≠ ucuz.", "u3"],
  ["مُتَأَخِّرٌ ≠ {مُبَكِّرٌ}.", ["مُبَكِّرٌ", "قَدِيمٌ", "مُمْتِعٌ"], "zıt", "Geç ≠ erken.", "u3"],
  ["زَبُونٌ ← {زَبَائِنُ}.", ["زَبَائِنُ", "زُبُنٌ", "زَبُونَاتٌ"], "çoğul", "Müşteri → müşteriler.", "u3"],
  ["{مَتَى} يَفْتَحُ السُّوقُ؟ فِي الصَّبَاحِ البَاكِرِ.", ["مَتَى", "أَيْنَ", "مَاذَا"], "soru", "Pazar ne zaman açılır?", "u4"],
  ["{لِمَاذَا} يَأْتِي النَّاسُ إِلَى السُّوقِ؟ لِأَنَّ أَسْعَارَهُ رَخِيصَةٌ.", ["لِمَاذَا", "مَتَى", "كَيْفَ"], "soru", "İnsanlar pazara neden gelir?", "u4"],
  ["نُحِبُّ التَّسَوُّقَ، {لَكِنْ} لَا نَتَسَوَّقُ كُلَّ يَوْمٍ.", ["لَكِنْ", "لِأَنَّ", "إِلَى"], "kalıp", "Alışverişi severiz ama her gün yapmayız.", "u5"],
  ["يَأْتِي النَّاسُ إِلَى السُّوقِ؛ {لِأَنَّ} أَسْعَارَهُ رَخِيصَةٌ.", ["لِأَنَّ", "لَكِنْ", "مِنْ"], "kalıp", "Çünkü fiyatları ucuz.", "u5"],
  ["يَفْتَحُ السُّوقُ مِنَ الصَّبَاحِ {إِلَى} المَسَاءِ.", ["إِلَى", "مِنَ", "عَلَى"], "kalıp", "Sabahtan akşama kadar.", "u5"],
  ["نَحْتَاجُ إِلَى {كِيلَيْنِ} مِنَ اللَّحْمِ.", ["كِيلَيْنِ", "كِيلَانِ", "كِيلٌ"], "miktar", "İki kilo ete ihtiyacımız var.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["يَفْتَحُ السُّوقُ كُلَّ يَوْمٍ ← metne göre düzelt", "يَفْتَحُ السُّوقُ يَوْمًا وَاحِدًا فِي الأُسْبُوعِ", "يَفْتَحُ السُّوقُ يَوْمَيْنِ فِي الأُسْبُوعِ", "لَا يَفْتَحُ السُّوقُ أَبَدًا", "Çarşamba pazarı.", "u1"],
  ["الأَسْعَارُ فِي السُّوقِ غَالِيَةٌ ← metne göre düzelt", "الأَسْعَارُ فِي السُّوقِ رَخِيصَةٌ", "الأَسْعَارُ فِي السُّوقِ قَدِيمَةٌ", "لَا أَسْعَارَ فِي السُّوقِ", "فَأَسْعَارُهُ رَخِيصَةٌ جِدًّا.", "u1"],
  ["تَكُونُ البِضَاعَةُ بَائِتَةً صَبَاحًا ← düzelt", "تَكُونُ البِضَاعَةُ طَازَجَةً صَبَاحًا", "تَكُونُ البِضَاعَةُ غَالِيَةً صَبَاحًا", "تَكُونُ البِضَاعَةُ قَلِيلَةً صَبَاحًا", "Erken gidince mallar tazedir.", "u2"],
  ["نِصْفُ كِيلٍ مِنَ البَطَاطَا ← metne göre düzelt", "كِيلٌ وَنِصْفٌ مِنَ البَطَاطَا", "كِيلَانِ مِنَ البَطَاطَا", "كِيلٌ مِنَ البَطَاطَا", "Yarım kilo salatalıktır.", "u2"],
  ["عَادَةً ← eş anlam", "عُمُومًا", "دَائِمًا", "أَبَدًا", "genellikle = genel olarak", "u3"],
  ["يَعْرِضُ ← eş anlam", "يُقَدِّمُ", "يَشْتَرِي", "يَكْتُبُ", "sergiler = sunar", "u3"],
  ["يَبِيعُ ← zıt anlam", "يَشْتَرِي", "يَعْرِضُ", "يَفْتَحُ", "satar ≠ alır", "u3"],
  ["جَدِيدٌ ← zıt anlam", "قَدِيمٌ", "كَبِيرٌ", "رَخِيصٌ", "yeni ≠ eski", "u3"],
  ["بِضَاعَةٌ ← çoğul", "بَضَائِعُ", "بِضَاعَاتٌ", "أَبْضِعَةٌ", "mal → mallar", "u3"],
  ["لِأَنَّ أَسْعَارَهُ رَخِيصَةٌ ← soru", "لِمَاذَا يَأْتِي النَّاسُ إِلَى السُّوقِ؟", "مَتَى يَأْتِي النَّاسُ إِلَى السُّوقِ؟", "أَيْنَ يَأْتِي النَّاسُ؟", "لِأَنَّ → لِمَاذَا", "u4"],
  ["أُمِّي، إِلَى، أَذْهَبُ، السُّوقِ، مَعَ ← sırala", "أَذْهَبُ مَعَ أُمِّي إِلَى السُّوقِ", "السُّوقِ أَذْهَبُ مَعَ إِلَى أُمِّي", "مَعَ أَذْهَبُ السُّوقِ أُمِّي إِلَى", "Kitaptaki 9. etkinlik.", "u4"],
  ["نُحِبُّ السُّوقَ + لَا نَذْهَبُ كُلَّ يَوْمٍ ← لَكِنْ", "نُحِبُّ السُّوقَ، لَكِنْ لَا نَذْهَبُ كُلَّ يَوْمٍ", "نُحِبُّ السُّوقَ، لِأَنَّ لَا نَذْهَبُ كُلَّ يَوْمٍ", "لَكِنْ نُحِبُّ السُّوقَ لَا نَذْهَبُ", "لَكِنْ: ama", "u5"],
  ["الصَّبَاحُ / المَسَاءُ ← مِنْ… إِلَى", "مِنَ الصَّبَاحِ إِلَى المَسَاءِ", "مِنَ الصَّبَاحُ إِلَى المَسَاءُ", "إِلَى الصَّبَاحِ مِنَ المَسَاءِ", "Ardından mecrûr.", "u5"],
  ["كِيلٌ + كِيلٌ ← ikil (نَحْتَاجُ إِلَى …)", "نَحْتَاجُ إِلَى كِيلَيْنِ", "نَحْتَاجُ إِلَى كِيلَانِ", "نَحْتَاجُ إِلَى كِيلَاتٍ", "Mecrûr ikil ـَيْنِ", "u5"]
];
// Hangi reyon? hız oyunu (ilk dört reyon)
var NOUN_LIST = UNITS[4].ex[1].items.filter(function (it) { return ["kh", "fw", "lh", "lb"].indexOf(it.a) >= 0; }).map(function (it) { return [it.s, it.a, it.why]; }).concat([
  ["البَصَلُ 🧅", "kh", "Sebze."], ["الفُلْفُلُ 🫑", "kh", "Sebze."], ["الكَرَزُ 🍒", "fw", "Meyve."], ["التِّينُ", "fw", "Meyve."], ["البِطِّيخُ 🍉", "fw", "Meyve."],
  ["لَحْمُ الغَنَمِ", "lh", "Et."], ["اللَّحْمُ المَفْرُومُ", "lh", "Et (kıyma)."], ["اللَّبَنُ", "lb", "Süt ürünü (yoğurt)."], ["الزُّبْدَةُ 🧈", "lb", "Süt ürünü."], ["الجُبْنُ الأَبْيَضُ", "lb", "Süt ürünü."]
]);
var SP_M = REYON.slice(0, 4);
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; }).concat(UNITS[1].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; }));
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt / eş", pairs: [["يَبِيعُ", "يَشْتَرِي"], ["رَخِيصٌ", "غَالٍ"], ["مُبَكِّرٌ", "مُتَأَخِّرٌ"], ["طَازَجٌ", "بَائِتٌ"], ["قَدِيمٌ", "جَدِيدٌ"], ["سِعْرٌ", "ثَمَنٌ"], ["الزَّبُونُ", "المُشْتَرِي"], ["مُمْتِعٌ", "مُسَلٍّ"]] },
  cm: { name: "Tekil ↔ çoğul", pairs: [["مِنْطَقَةٌ", "مَنَاطِقُ"], ["بَائِعٌ", "بَاعَةٌ"], ["زَبُونٌ", "زَبَائِنُ"], ["فَاكِهَةٌ", "فَوَاكِهُ"], ["بِضَاعَةٌ", "بَضَائِعُ"], ["سُوقٌ", "أَسْوَاقٌ"], ["سِعْرٌ", "أَسْعَارٌ"], ["حِذَاءٌ", "أَحْذِيَةٌ"]] },
  sc: { name: "Soru ↔ cevap", pairs: [["أَيْنَ يَسْكُنُ يَزَنُ؟", "فِي الفَاتِحِ"], ["مَتَى يَفْتَحُ السُّوقُ؟", "يَوْمَ الأَرْبِعَاءِ"], ["لِمَاذَا يَأْتِي النَّاسُ؟", "لِأَنَّ الأَسْعَارَ رَخِيصَةٌ"], ["مَاذَا يَبِيعُ البَائِعُونَ؟", "الخَضْرَاوَاتِ وَالفَوَاكِهَ"], ["مَعَ مَنْ يَذْهَبُ يَزَنُ؟", "مَعَ أُمِّهِ"], ["كَمْ كِيلًا مِنَ اللَّحْمِ؟", "كِيلَيْنِ"]] }
};
var KARTLAR = [
  ["Sûku’l-Erbiâ nerede, ne zaman?", "فِي مِنْطَقَةِ الفَاتِحِ بِإِسْطَنْبُولَ · يَوْمًا وَاحِدًا فِي الأُسْبُوعِ · مِنَ الصَّبَاحِ البَاكِرِ إِلَى المَسَاءِ"],
  ["Pazar nasıl bir yer?", "كَبِيرٌ جِدًّا وَوَاسِعٌ وَمُزْدَحِمٌ بِالنَّاسِ · أَسْعَارُهُ رَخِيصَةٌ · فِيهِ كُلُّ شَيْءٍ تَقْرِيبًا"],
  ["Pazarda ne satılır?", "الخَضْرَاوَاتُ، الفَوَاكِهُ، الأَجْبَانُ، الأَلْبَانُ، الأَلْبِسَةُ، الأَحْذِيَةُ، اللُّحُومُ، الأَدَوَاتُ المَنْزِلِيَّةُ الصَّغِيرَةُ"],
  ["Satıcılar ne yapar?", "يَعْرِضُونَ بَضَائِعَهُمْ بِشَكْلٍ جَمِيلٍ · يَكْتُبُونَ الأَسْعَارَ عَلَى وَرَقَةٍ صَغِيرَةٍ · لَطِيفُونَ مَعَ الزَّبَائِنِ"],
  ["Yezen neden erken gider?", "لِأَنَّ الخَضْرَاوَاتِ وَالفَوَاكِهَ تَكُونُ طَازَجَةً"],
  ["Haftalık liste?", "كِيلَانِ لَحْمٌ أَحْمَرُ · كِيلُ دَجَاجٍ · كِيلٌ وَنِصْفٌ بَطَاطَا · كِيلُ طَمَاطِمَ · نِصْفُ كِيلِ خِيَارٍ · كِيلُ أَرُزٍّ · كِيلُ بُرْغُلٍ · تُفَّاحٌ وَعِنَبٌ"],
  ["Eş anlamlar?", "مُمْتِعٌ = مُسَلٍّ · سِعْرٌ = ثَمَنٌ · الزَّبُونُ = المُشْتَرِي · عَادَةً = عُمُومًا · يَعْرِضُ = يُقَدِّمُ"],
  ["Zıt anlamlar?", "مُمِلٌّ ≠ مُمْتِعٌ · جَدِيدٌ ≠ قَدِيمٌ · غَالٍ ≠ رَخِيصٌ · مُتَأَخِّرٌ ≠ مُبَكِّرٌ · البَائِعُ ≠ الزَّبُونُ · يَبِيعُ ≠ يَشْتَرِي"],
  ["Çoğullar?", "مَنَاطِقُ · بَاعَةٌ · زَبَائِنُ · فَوَاكِهُ · بَضَائِعُ"],
  ["لَكِنْ / لِأَنَّ?", "لَكِنْ: ama (لَكِنْ لَا نَتَسَوَّقُ) · لِأَنَّ: çünkü (لِأَنَّ أَسْعَارَهُ رَخِيصَةٌ)"],
  ["مِنْ… إِلَى…?", "“…den …e kadar”: مِنَ الصَّبَاحِ البَاكِرِ إِلَى المَسَاءِ · ardından mecrûr"],
  ["İki kilo nasıl söylenir?", "كِيلَانِ (merfû) · كِيلَيْنِ (mansûb / mecrûr): نَحْتَاجُ إِلَى كِيلَيْنِ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat10";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("سُوقٌ", "i", "pazar, çarşı", "أَسْوَاقٌ", "efal", "", "", "وَفِي المِنْطَقَةِ سُوقٌ يَفْتَحُ يَوْمًا وَاحِدًا.", "سُوقٌ", "Semtte haftada bir gün açılan bir pazar var."),
  KW("مِنْطَقَةٌ", "i", "bölge, semt", "مَنَاطِقُ", "mefail", "", "", "مِنْ كُلِّ مَنَاطِقِ إِسْطَنْبُولَ.", "مَنَاطِقِ", "İstanbul’un her semtinden."),
  KW("مَحَلٌّ", "i", "dükkân", "مَحَلَّاتٌ", "at", "دُكَّانٌ", "", "فِيهَا أَسْوَاقٌ وَمَحَلَّاتٌ كَثِيرَةٌ.", "وَمَحَلَّاتٌ", "Orada birçok çarşı ve dükkân var."),
  KW("سِعْرٌ", "i", "fiyat", "أَسْعَارٌ", "efal", "ثَمَنٌ", "", "فَأَسْعَارُهُ رَخِيصَةٌ جِدًّا.", "فَأَسْعَارُهُ", "Fiyatları çok ucuz."),
  KW("بَائِعٌ", "i", "satıcı", "بَاعَةٌ / بَائِعُونَ", "feale", "", "زَبُونٌ", "يَبِيعُ البَائِعُونَ فِي السُّوقِ الخَضْرَاوَاتِ.", "البَائِعُونَ", "Satıcılar pazarda sebze satar."),
  KW("زَبُونٌ", "i", "müşteri", "زَبَائِنُ", "feail", "مُشْتَرٍ", "بَائِعٌ", "بِشَكْلٍ جَمِيلٍ يَجْذِبُ الزَّبَائِنَ.", "الزَّبَائِنَ", "Müşterileri çeken güzel bir şekilde."),
  KW("بِضَاعَةٌ", "i", "mal, ürün", "بَضَائِعُ", "feail", "", "", "يَعْرِضُونَ بَضَائِعَهُمْ بِشَكْلٍ جَمِيلٍ.", "بَضَائِعَهُمْ", "Mallarını güzelce sergilerler."),
  KW("فَاكِهَةٌ", "i", "meyve", "فَوَاكِهُ", "fevail", "", "", "نَشْتَرِي أَيْضًا نَوْعَيْنِ مِنَ الفَوَاكِهِ.", "الفَوَاكِهِ", "Ayrıca iki çeşit meyve alırız."),
  KW("خُضْرَةٌ", "i", "sebze", "خَضْرَاوَاتٌ", "at", "", "", "لِأَنَّ الخَضْرَاوَاتِ وَالفَوَاكِهَ تَكُونُ طَازَجَةً.", "الخَضْرَاوَاتِ", "Çünkü sebze ve meyveler taze olur."),
  KW("لَحْمٌ", "i", "et", "لُحُومٌ", "fuul", "", "", "يَبِيعُ البَائِعُونَ… وَاللُّحُومَ.", "وَاللُّحُومَ", "Satıcılar et de satar."),
  KW("جُبْنٌ", "i", "peynir", "أَجْبَانٌ", "efal", "", "", "وَالأَجْبَانَ وَالأَلْبَانَ.", "وَالأَجْبَانَ", "Peynir ve süt ürünleri."),
  KW("لِبَاسٌ", "i", "giysi", "أَلْبِسَةٌ", "efile", "ثَوْبٌ", "", "وَالأَلْبِسَةَ وَالأَحْذِيَةَ.", "وَالأَلْبِسَةَ", "Giysi ve ayakkabılar."),
  KW("حِذَاءٌ", "i", "ayakkabı", "أَحْذِيَةٌ", "efile", "", "", "وَالأَلْبِسَةَ وَالأَحْذِيَةَ.", "وَالأَحْذِيَةَ", "Giysi ve ayakkabılar."),
  KW("أَدَاةٌ", "i", "alet, eşya", "أَدَوَاتٌ", "at", "", "", "وَالأَدَوَاتِ المَنْزِلِيَّةَ الصَّغِيرَةَ.", "وَالأَدَوَاتِ", "Küçük ev eşyaları."),
  KW("شَكْلٌ", "i", "şekil", "أَشْكَالٌ", "efal", "", "", "يَعْرِضُونَ بَضَائِعَهُمْ بِشَكْلٍ جَمِيلٍ.", "بِشَكْلٍ", "Güzel bir şekilde sergilerler."),
  KW("وَرَقَةٌ", "i", "kâğıt; yaprak", "أَوْرَاقٌ", "efal", "", "", "وَيَكْتُبُونَ أَسْعَارَ بَضَائِعِهِمْ عَلَى وَرَقَةٍ صَغِيرَةٍ.", "وَرَقَةٍ", "Fiyatları küçük bir kâğıda yazarlar."),
  KW("أُسْبُوعٌ", "i", "hafta", "أَسَابِيعُ", "fealil", "", "", "يَفْتَحُ يَوْمًا وَاحِدًا فِي الأُسْبُوعِ فَقَطْ.", "الأُسْبُوعِ", "Haftada yalnızca bir gün açılır."),
  KW("نَوْعٌ", "i", "çeşit, tür", "أَنْوَاعٌ", "efal", "صِنْفٌ", "", "وَنَشْتَرِي أَيْضًا نَوْعَيْنِ مِنَ الفَوَاكِهِ.", "نَوْعَيْنِ", "İki çeşit meyve alırız."),
  KW("كِيلٌ", "i", "kilo", "", "", "كِيلُوغْرَامٌ", "", "نَحْتَاجُ كُلَّ أُسْبُوعٍ إِلَى كِيلَيْنِ مِنَ اللَّحْمِ الأَحْمَرِ.", "كِيلَيْنِ", "Her hafta iki kilo kırmızı ete ihtiyacımız var."),
  KW("مُمْتِعٌ", "s", "zevkli, eğlenceli", "", "", "مُسَلٍّ", "مُمِلٌّ", "يَوْمُ التَّسَوُّقِ هُوَ يَوْمٌ مُمْتِعٌ.", "مُمْتِعٌ", "Alışveriş günü zevkli bir gündür."),
  KW("مُزْدَحِمٌ", "s", "kalabalık", "", "", "", "فَارِغٌ", "وَهُوَ كَبِيرٌ جِدًّا وَوَاسِعٌ وَمُزْدَحِمٌ بِالنَّاسِ.", "وَمُزْدَحِمٌ", "Çok büyük, geniş ve kalabalıktır."),
  KW("وَاسِعٌ", "s", "geniş", "", "", "", "ضَيِّقٌ", "وَهُوَ كَبِيرٌ جِدًّا وَوَاسِعٌ.", "وَوَاسِعٌ", "Çok büyük ve geniştir."),
  KW("رَخِيصٌ", "s", "ucuz", "رِخَاصٌ", "fial", "", "غَالٍ", "فَأَسْعَارُهُ رَخِيصَةٌ جِدًّا.", "رَخِيصَةٌ", "Fiyatları çok ucuz."),
  KW("طَازَجٌ", "s", "taze", "", "", "", "بَائِتٌ", "لِأَنَّ الخَضْرَاوَاتِ وَالفَوَاكِهَ تَكُونُ طَازَجَةً.", "طَازَجَةً", "Çünkü sebze ve meyveler taze olur."),
  KW("مُبَكِّرٌ", "s", "erken", "", "", "بَاكِرٌ", "مُتَأَخِّرٌ", "أَنَا أَذْهَبُ مَعَ أُمِّي إِلَى السُّوقِ مُبَكِّرًا.", "مُبَكِّرًا", "Annemle pazara erken giderim."),
  KW("قَدِيمٌ", "s", "eski", "قُدَمَاءُ", "fuala", "", "جَدِيدٌ", "هِيَ مَرْكَزُ المَدِينَةِ القَدِيمَةِ.", "القَدِيمَةِ", "Eski şehrin merkezidir."),
  KW("لَطِيفٌ", "s", "nazik, kibar", "لُطَفَاءُ", "fuala", "", "", "مُعْظَمُ البَائِعِينَ لَطِيفُونَ مَعَ زَبَائِنِهِمْ.", "لَطِيفُونَ", "Satıcıların çoğu nazik."),
  KW("تَسَوَّقَ", "f", "alışveriş yaptı", "", "", "", "", "لَكِنْ لَا نَتَسَوَّقُ كُلَّ يَوْمٍ.", "نَتَسَوَّقُ", "Ama her gün alışveriş yapmayız."),
  KW("بَاعَ", "f", "sattı", "", "", "", "اشْتَرَى", "يَبِيعُ البَائِعُونَ فِي السُّوقِ الخَضْرَاوَاتِ.", "يَبِيعُ", "Satıcılar pazarda sebze satar."),
  KW("اشْتَرَى", "f", "satın aldı", "", "", "", "بَاعَ", "نَشْتَرِي عَادَةً مِنَ السُّوقِ لَوَازِمَ البَيْتِ.", "نَشْتَرِي", "Genellikle pazardan evin ihtiyaçlarını alırız."),
  KW("عَرَضَ", "f", "sergiledi", "", "", "قَدَّمَ", "", "البَائِعُونَ فِي السُّوقِ يَعْرِضُونَ بَضَائِعَهُمْ.", "يَعْرِضُونَ", "Satıcılar mallarını sergiler."),
  KW("جَذَبَ", "f", "çekti", "", "", "", "", "بِشَكْلٍ جَمِيلٍ يَجْذِبُ الزَّبَائِنَ.", "يَجْذِبُ", "Müşterileri çeken güzel bir şekilde."),
  KW("احْتَاجَ", "f", "ihtiyaç duydu", "", "", "", "", "نَحْتَاجُ كُلَّ أُسْبُوعٍ إِلَى كِيلَيْنِ مِنَ اللَّحْمِ.", "نَحْتَاجُ", "Her hafta iki kilo ete ihtiyacımız var."),
  KW("حَضَرَ", "f", "geldi, hazır bulundu", "", "", "جَاءَ", "غَابَ", "لِأَنَّ النَّاسَ يَحْضُرُونَ إِلَيْهِ مِنْ كُلِّ مَنَاطِقِ إِسْطَنْبُولَ.", "يَحْضُرُونَ", "Çünkü insanlar her semtten oraya gelir."),
  KW("فَتَحَ", "f", "açtı, açıldı", "", "", "", "أَغْلَقَ", "يَفْتَحُ السُّوقُ مِنَ الصَّبَاحِ البَاكِرِ إِلَى المَسَاءِ.", "يَفْتَحُ", "Pazar sabah erkenden akşama kadar açıktır.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","لُحُومٌ، أَسْوَاقٌ"],"efal":["أَفْعَالٌ","ef’âl","أَسْعَارٌ، أَنْوَاعٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَلْبِسَةٌ، أَحْذِيَةٌ"],"fial":["فِعَالٌ","fiâl","رِخَاصٌ، جِبَالٌ"],"feale":["فَعَلَةٌ","fa’ale","بَاعَةٌ، طَلَبَةٌ"],"fuala":["فُعَلَاءُ","fu’alâ","قُدَمَاءُ، لُطَفَاءُ"],"fevail":["فَوَاعِلُ","fevâil","فَوَاكِهُ، شَوَارِعُ"],"feail":["فَعَائِلُ","feâil","زَبَائِنُ، بَضَائِعُ"],"mefail":["مَفَاعِلُ","mefâil","مَنَاطِقُ، مَحَالُّ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","أَسَابِيعُ، فَنَادِقُ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","بَائِعُونَ، فَلَّاحُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","مَحَلَّاتٌ، أَدَوَاتٌ"],"diger":["…","başka kalıplar","أَشْيَاءُ"]};
