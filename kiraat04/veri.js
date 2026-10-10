// ================= VERİ: Kıraat 4 — حَوْلَ مَائِدَةِ الطَّعَامِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الوَجْبَةُ", tr: "Öğün" }, nasb: { ar: "الطَّعَامُ", tr: "Yiyecek" }, cerr: { ar: "الوَقْتُ", tr: "Zaman" },
  mi: { ar: "الضَّمِيرُ", tr: "Zamir" }, ref: { ar: "الصِّفَةُ", tr: "Sıfat" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var OGUN = [["h", "Kahvaltı / akşam (hafif)", "الفُطُورُ وَالعَشَاءُ", "nasb"], ["g", "Öğle (doyurucu)", "الغَدَاءُ", "cerr"], ["s", "Yemekten sonra", "بَعْدَ الغَدَاءِ", "mi"]];
var CINS = [["m", "Eril", "مُذَكَّرٌ", "muz"], ["f", "Dişil", "مُؤَنَّثٌ", "mun"]];
var MS = [["f", "Meyve", "فَاكِهَةٌ", "mi"], ["s", "Sebze", "خُضَارٌ", "mz"]];
var KISIM = [["r", "Ana yemekler", "الأَطْبَاقُ الرَّئِيسِيَّةُ", "nasb"], ["c", "Çin yemekleri", "الأَطْبَاقُ الصِّينِيَّةُ", "mi"], ["m", "Izgaralar", "المَشْوِيَّاتُ", "cerr"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", f: "Meyve", s: "Sebze" };

// Zamir makinesi: isim × zamir → bitişik zamirli biçim
var ZAMIR = [["أَنَا", "benim"], ["نَحْنُ", "bizim"], ["أَنْتَ", "senin (e.)"], ["أَنْتِ", "senin (k.)"], ["أَنْتُمْ", "sizin"], ["هُوَ", "onun (e.)"], ["هِيَ", "onun (k.)"], ["هُمْ", "onların"]];
var EKLER = ["ـِي", "ـنَا", "ـكَ", "ـكِ", "ـكُمْ", "ـهُ", "ـهَا", "ـهُمْ"];
var EKH = ["ِي", "ُنَا", "ُكَ", "ُكِ", "ُكُمْ", "ُهُ", "ُهَا", "ُهُمْ"];
// [tekil, gövde, Türkçe biçimler, kitapta verilen hücreler]
var ISIM = [
  ["مَدِينَةٌ", "مَدِينَت", ["şehrim", "şehrimiz", "şehrin", "şehrin", "şehriniz", "şehri", "şehri", "şehirleri"], [0, 6]],
  ["جِنْسِيَّةٌ", "جِنْسِيَّت", ["uyruğum", "uyruğumuz", "uyruğun", "uyruğun", "uyruğunuz", "uyruğu", "uyruğu", "uyrukları"], [2, 4]],
  ["بَيْتٌ", "بَيْت", ["evim", "evimiz", "evin", "evin", "eviniz", "evi", "evi", "evleri"], [1, 7]],
  ["عُنْوَانٌ", "عُنْوَان", ["adresim", "adresimiz", "adresin", "adresin", "adresiniz", "adresi", "adresi", "adresleri"], [3]],
  ["صَفٌّ", "صَفّ", ["sınıfım", "sınıfımız", "sınıfın", "sınıfın", "sınıfınız", "sınıfı", "sınıfı", "sınıfları"], [0, 5]]
];
ISIM.forEach(function (x) { x.push(EKH.map(function (e) { return x[1] + e; })); });   // x[4] = Arapça biçimler

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
// Tablo (9. etkinlik): verilmeyen hücreler
function TABLO(rows) {
  var out = [], n = 0;
  rows.forEach(function (r) {
    var X = ISIM[r], fs = X[4], g = X[3][0];
    ZAMIR.forEach(function (z, p) {
      if (X[3].indexOf(p) >= 0) return;
      var ok = fs[p], ds = [], cand = [p + 1, p - 1, p + 2, p - 2, p + 3, p + 4].map(function (j) { return (j + 8) % 8; });
      cand.forEach(function (j) { if (ds.length < 2 && fs[j] !== ok) ds.push(fs[j]); });
      out.push([fs[g] + " (" + ZAMIR[g][0] + ") ← " + z[0] + ": ___", ok, ds[0], ds[1], z[1] + " " + X[2][p], EKLER[p] + " ← " + z[0]]);
      n++;
    });
  });
  return PL(out);
}

var METIN = "أَنَا فِرَاسٌ، أَنَا مِنْ لُبْنَانَ، أَعِيشُ مَعَ أُسْرَتِي فِي مَدِينَةِ بَيْرُوتَ. تَتَكَوَّنُ أُسْرَتِي مِنْ خَمْسَةِ أَشْخَاصٍ، هُمْ: أَنَا وَأَبِي وَأُمِّي وَأُخْتِي وَأَخِي. المَطْبَخُ اللُّبْنَانِيُّ غَنِيٌّ وَلَذِيذٌ." +
  "<br>نَتَنَاوَلُ ثَلَاثَ وَجَبَاتٍ كُلَّ يَوْمٍ: وَجْبَةَ الفُطُورِ وَوَجْبَةَ الغَدَاءِ وَوَجْبَةَ العَشَاءِ. نَتَنَاوَلُ وَجْبَةَ الفُطُورِ فِي الصَّبَاحِ فِي السَّاعَةِ السَّابِعَةِ قَبْلَ ذَهَابِنَا إِلَى مَدْرَسَتِنَا وَقَبْلَ خُرُوجِ أَبِي مِنَ البَيْتِ إِلَى عَمَلِهِ فِي المُسْتَشْفَى. وَنَتَنَاوَلُ وَجْبَةَ الغَدَاءِ بَعْدَ الظُّهْرِ فِي السَّاعَةِ الثَّانِيَةِ وَالنِّصْفِ تَقْرِيبًا، بَعْدَ عَوْدَتِنَا مِنَ المَدْرَسَةِ، وَبَعْدَ رُجُوعِ أَبِي مِنْ عَمَلِهِ. وَنَتَنَاوَلُ وَجْبَةَ العَشَاءِ بَعْدَ صَلَاةِ المَغْرِبِ فِي السَّاعَةِ الثَّامِنَةِ تَقْرِيبًا." +
  "<br>تُجَهِّزُ أُمِّي وَجَبَاتِ الطَّعَامِ كُلَّ يَوْمٍ وَتُسَاعِدُهَا أُخْتِي فِي تَحْضِيرِ مَائِدَةِ الطَّعَامِ، أُخْتِي تَضَعُ عَلَى المَائِدَةِ طَبَقًا وَمِلْعَقَةً وَشَوْكَةً وَسِكِّينًا لِكُلِّ فَرْدٍ مِنَ العَائِلَةِ." +
  "<br>وَجْبَةُ الفُطُورِ خَفِيفَةٌ عَادَةً. فِي وَجْبَةِ الفُطُورِ نَأْكُلُ الزَّيْتُونَ وَالجُبْنَ وَاللَّبَنَ وَالمُرَبَّى وَالبَيْضَ المَقْلِيَّ أَحْيَانًا، وَالبَيْضَ المَسْلُوقَ أَحْيَانًا أُخْرَى، وَنَشْرَبُ الشَّايَ مَعَ طَعَامِ الفُطُورِ." +
  "<br>وَفِي وَجْبَةِ الغَدَاءِ نَتَنَاوَلُ طَبْخَ أُمِّي، وَهِيَ وَجْبَةٌ دَسِمَةٌ عَادَةً. فَمَرَّةً نَأْكُلُ الأَرُزَّ مَعَ حَسَاءِ العَدَسِ أَوْ حَسَاءِ الفِطْرِ، وَمَرَّةً نَأْكُلُ الدَّجَاجَ مَعَ السَّلَطَةِ. وَبَعْدَ الغَدَاءِ نَشْرَبُ الشَّايَ عَادَةً، وَأَحْيَانًا نَأْكُلُ الفَوَاكِهَ، مِثْلَ البِطِّيخِ وَالبُرْتُقَالِ وَالتُّفَّاحِ." +
  "<br>وَفِي وَجْبَةِ العَشَاءِ نَأْكُلُ مِثْلَ طَعَامِ الفُطُورِ، فَهُوَ طَعَامٌ خَفِيفٌ عَلَى المَعِدَةِ. هَذَا النِّظَامُ الغِذَائِيُّ مُفِيدٌ لِصِحَّتِنَا، وَهُوَ نِظَامٌ جَمِيلٌ، يَجْتَمِعُ أَفْرَادُ العَائِلَةِ فِي أَوْقَاتِ الطَّعَامِ، فَيَتَكَلَّمُونَ وَيَتَحَاوَرُونَ وَيَتَنَاقَشُونَ فِي بَعْضِ المَسَائِلِ العَائِلِيَّةِ.";
var METIN_TR = "Ben Firâs, Lübnanlıyım; ailemle Beyrut şehrinde yaşıyorum. Ailem beş kişiden oluşur: ben, babam, annem, kız kardeşim ve erkek kardeşim. Lübnan mutfağı zengin ve lezzetlidir." +
  "<br>Her gün üç öğün yeriz: kahvaltı, öğle yemeği ve akşam yemeği. Kahvaltıyı sabah saat yedide, okulumuza gitmeden ve babam evden hastanedeki işine çıkmadan önce yaparız. Öğle yemeğini öğleden sonra yaklaşık saat iki buçukta, okuldan döndükten ve babam işinden geldikten sonra yeriz. Akşam yemeğini akşam namazından sonra yaklaşık saat sekizde yeriz." +
  "<br>Annem her gün yemekleri hazırlar, kız kardeşim de sofrayı kurmada ona yardım eder; kız kardeşim sofraya ailenin her ferdi için bir tabak, bir kaşık, bir çatal ve bir bıçak koyar." +
  "<br>Kahvaltı genellikle hafiftir. Kahvaltıda zeytin, peynir, yoğurt, reçel, bazen sahanda yumurta, bazen de haşlanmış yumurta yeriz; kahvaltıyla birlikte çay içeriz." +
  "<br>Öğle yemeğinde annemin yemeğini yeriz; genellikle doyurucu (yağlı) bir öğündür. Bir keresinde mercimek çorbası ya da mantar çorbasıyla pilav, bir keresinde salatayla tavuk yeriz. Öğle yemeğinden sonra genellikle çay içeriz, bazen de karpuz, portakal, elma gibi meyveler yeriz." +
  "<br>Akşam yemeğinde kahvaltıdaki gibi yeriz; bu, mideyi yormayan hafif bir yemektir. Bu beslenme düzeni sağlığımıza faydalıdır; güzel de bir düzendir: aile fertleri yemek vakitlerinde bir araya gelir, konuşur, sohbet eder ve bazı aile meseleleri hakkında görüşürler.";
var SOZLUK = [["تَنَاوَلَ", "yedi, aldı (yemek)"], ["وَجْبَةٌ ج وَجَبَاتٌ", "öğün"], ["الفُطُورُ / الغَدَاءُ / العَشَاءُ", "kahvaltı / öğle yemeği / akşam yemeği"], ["تَقْرِيبًا", "yaklaşık"], ["تُجَهِّزُ", "hazırlar"], ["تَحْضِيرٌ", "hazırlama"], ["مَائِدَةٌ", "sofra"], ["فَرْدٌ ج أَفْرَادٌ", "fert, kişi"], ["خَفِيفَةٌ", "hafif"], ["دَسِمَةٌ", "yağlı, doyurucu"], ["المُرَبَّى", "reçel"], ["البَيْضُ المَقْلِيُّ / المَسْلُوقُ", "sahanda / haşlanmış yumurta"], ["حَسَاءٌ", "çorba"], ["العَدَسُ / الفِطْرُ", "mercimek / mantar"], ["المَعِدَةُ", "mide"], ["النِّظَامُ الغِذَائِيُّ", "beslenme düzeni"], ["يَتَحَاوَرُونَ / يَتَنَاقَشُونَ", "sohbet ederler / tartışırlar, görüşürler"]];

var MENU = "<b>الأَطْبَاقُ الرَّئِيسِيَّةُ:</b> فَاهِيتَا دَجَاجٍ ٥٥ · فَاهِيتَا جَمْبَرِي ٦٠ · كُورْدُون بْلُو دَجَاجٍ ٦٥ · بِيف سْتِيك مَعَ الفِطْرِ ٨٥ · سَلْمُونٌ مَشْوِيٌّ ٧٥ · كَبَابٌ بِاللَّبَنِ ٥٥ · فِيلِيه مَشْوِيٌّ ٥٠ · دَجَاجُ كَارِي ٤٥ · سَمَكٌ بَانِيه ٥٠" +
  "<br><b>الأَطْبَاقُ الصِّينِيَّةُ:</b> سْوِيت آنْد سَاوَر دَجَاجٍ ٥٥ · سْوِيت آنْد سَاوَر جَمْبَرِي ٧٠ · تِرِيَاكِي لَحْمٍ ٦٥ · أَرُزٌّ صِينِيٌّ ٢٥" +
  "<br><b>المَشْوِيَّاتُ:</b> مَشَاوِي مُشَكَّلٌ ٦٥ · شِيش طَاوُوق ٤٥ · كَبَابٌ ٥٠ · أَوْصَالٌ ٦٠ · دَجَاجٌ مُسَحَّبٌ ٤٢ · رِيَشُ غَنَمٍ ٥٨ · جَوَانِحُ مَشْوِيَّةٌ ٤٥";
var MENU_TR = "Ana yemekler: tavuk fajita 55 · karides fajita 60 · tavuk cordon bleu 65 · mantarlı biftek 85 · ızgara somon 75 · yoğurtlu kebap 55 · ızgara fileto 50 · köri soslu tavuk 45 · pane balık 50 · Çin yemekleri: tatlı-ekşi tavuk 55 · tatlı-ekşi karides 70 · teriyaki et 65 · Çin pilavı 25 · Izgaralar: karışık ızgara 65 · şiş tavuk 45 · kebap 50 · kuşbaşı (evsâl) 60 · tavuk tava (müsehhab) 42 · kuzu pirzola 58 · ızgara kanat 45";

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "cerr", "nasb"],
  goals: ["Okumadan önce kendi yemek alışkanlıklarını düşünmek: sabah ne yersin, en sevdiğin yemek ne", "Firâs’ın ailesinin öğünlerini anlatan metni durmadan okumak ve dinlemek", "Öğün, yiyecek ve içecek kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "نَتَنَاوَلُ:- / وَجْبَةَ الفُطُورِ:mz / فِي السَّاعَةِ السَّابِعَةِ.:cerr", tr: "Kahvaltıyı saat yedide yeriz.", pair: "نَتَنَاوَلُ:- / وَجْبَةَ الغَدَاءِ:mz / فِي السَّاعَةِ الثَّانِيَةِ وَالنِّصْفِ.:cerr", pairTr: "Öğle yemeğini saat iki buçukta yeriz." },
    { s: "نَأْكُلُ:- / الزَّيْتُونَ وَالجُبْنَ وَاللَّبَنَ:nasb / وَنَشْرَبُ:- / الشَّايَ.:nasb", tr: "Zeytin, peynir, yoğurt yeriz ve çay içeriz." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> Beyrutlu Firâs’ın beş kişilik ailesi günde üç öğün yer: <span class=\"ar\">الفُطُورُ</span> (sabah 7), <span class=\"ar\">الغَدَاءُ</span> (yaklaşık 14.30), <span class=\"ar\">العَشَاءُ</span> (akşam namazından sonra, yaklaşık 8). Annesi yemekleri hazırlar, kız kardeşi sofrayı kurar." },
    { tr: "<b>Kalıplar:</b><br>• <span class=\"ar\">نَتَنَاوَلُ وَجْبَةَ…</span> … öğününü yeriz · <span class=\"ar\">فِي السَّاعَةِ السَّابِعَةِ</span> saat yedide<br>• <span class=\"ar\">قَبْلَ ذَهَابِنَا · بَعْدَ عَوْدَتِنَا</span> gitmemizden önce · dönmemizden sonra<br>• <span class=\"ar\">أَحْيَانًا… وَأَحْيَانًا أُخْرَى…</span> bazen… bazen de… · <span class=\"ar\">مَرَّةً… وَمَرَّةً…</span> bir keresinde… bir keresinde…" },
    { tr: "<b>Okuma yolu:</b> Kitap metni “<span class=\"ar\">دُونَ تَوَقُّفٍ</span>” (durmadan) okumanı istiyor. Önce okuma öncesi soruları kendin için cevapla, sonra metni dinle ve durmadan oku." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَاذَا تَأْكُلُ / تَأْكُلِينَ فِي الصَّبَاحِ؟ مَاذَا تُحِبُّ / تُحِبِّينَ مِنَ الفَوَاكِهِ؟ مَا طَعَامُكَ المُفَضَّلُ؟ مَاذَا تُحِبُّ / تُحِبِّينَ مِنَ المَشْرُوبَاتِ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "حَوْلَ مَائِدَةِ الطَّعَامِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَاذَا تَأْكُلُ / تَأْكُلِينَ فِي الصَّبَاحِ؟", a: "آكُلُ الجُبْنَ وَالزَّيْتُونَ وَالبَيْضَ، وَأَشْرَبُ الشَّايَ.", tr: "Sabah ne yersin? (Örnek cevap) Peynir, zeytin, yumurta yerim, çay içerim." },
        { q: "مَاذَا تُحِبُّ / تُحِبِّينَ مِنَ الفَوَاكِهِ؟", a: "أُحِبُّ التُّفَّاحَ وَالعِنَبَ.", tr: "Meyvelerden neyi seversin? Elmayı ve üzümü severim." },
        { q: "مَا طَعَامُكَ المُفَضَّلُ؟", a: "طَعَامِي المُفَضَّلُ المَحْشِيُّ.", tr: "En sevdiğin yemek ne? En sevdiğim yemek dolma." },
        { q: "مَاذَا تُحِبُّ / تُحِبِّينَ مِنَ المَشْرُوبَاتِ؟", a: "أُحِبُّ الشَّايَ وَالعَصِيرَ.", tr: "İçeceklerden neyi seversin? Çayı ve meyve suyunu severim." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "فِرَاسٌ مِنْ سُورِيَةَ.", a: "y", why: "Lübnanlı: أَنَا مِنْ لُبْنَانَ." },
        { s: "تَتَكَوَّنُ أُسْرَةُ فِرَاسٍ مِنْ خَمْسَةِ أَشْخَاصٍ.", a: "d", why: "أَنَا وَأَبِي وَأُمِّي وَأُخْتِي وَأَخِي." },
        { s: "المَطْبَخُ اللُّبْنَانِيُّ غَنِيٌّ وَلَذِيذٌ.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَعْمَلُ أَبُو فِرَاسٍ فِي المَدْرَسَةِ.", a: "y", why: "Hastanede çalışıyor: إِلَى عَمَلِهِ فِي المُسْتَشْفَى." },
        { s: "تَتَنَاوَلُ العَائِلَةُ الفُطُورَ فِي السَّاعَةِ السَّابِعَةِ.", a: "d", why: "فِي السَّاعَةِ السَّابِعَةِ." },
        { s: "تَتَنَاوَلُ العَائِلَةُ العَشَاءَ قَبْلَ صَلَاةِ المَغْرِبِ.", a: "y", why: "Akşam namazından sonra: بَعْدَ صَلَاةِ المَغْرِبِ." },
        { s: "أُخْتُ فِرَاسٍ تَضَعُ عَلَى المَائِدَةِ طَبَقًا وَمِلْعَقَةً.", a: "d", why: "…طَبَقًا وَمِلْعَقَةً وَشَوْكَةً وَسِكِّينًا." },
        { s: "وَجْبَةُ الفُطُورِ دَسِمَةٌ.", a: "y", why: "Kahvaltı hafiftir: خَفِيفَةٌ; doyurucu olan öğle yemeği." },
        { s: "يَشْرَبُونَ الشَّايَ مَعَ الفُطُورِ.", a: "d", why: "وَنَشْرَبُ الشَّايَ مَعَ طَعَامِ الفُطُورِ." },
        { s: "فِي الغَدَاءِ يَأْكُلُونَ الأَرُزَّ مَعَ حَسَاءِ العَدَسِ مَرَّةً.", a: "d", why: "فَمَرَّةً نَأْكُلُ الأَرُزَّ مَعَ حَسَاءِ العَدَسِ." },
        { s: "طَعَامُ العَشَاءِ ثَقِيلٌ عَلَى المَعِدَةِ.", a: "y", why: "خَفِيفٌ عَلَى المَعِدَةِ: mideyi yormaz." },
        { s: "يَتَكَلَّمُ أَفْرَادُ العَائِلَةِ فِي أَوْقَاتِ الطَّعَامِ.", a: "d", why: "فَيَتَكَلَّمُونَ وَيَتَحَاوَرُونَ وَيَتَنَاقَشُونَ." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("نَتَنَاوَلُ ثَلَاثَ وَجَبَاتٍ", "وَجَبَاتٍ"), "öğün", "tabak", "saat", "Üç öğün yeriz.", "Tekili: وَجْبَةٌ."],
      [HL("نَتَنَاوَلُ وَجْبَةَ الفُطُورِ", "نَتَنَاوَلُ"), "yeriz", "pişiririz", "satarız", "Kahvaltıyı yaparız.", "تَنَاوَلَ = أَكَلَ."],
      [HL("فِي السَّاعَةِ الثَّانِيَةِ وَالنِّصْفِ تَقْرِيبًا", "تَقْرِيبًا"), "yaklaşık", "tam", "hemen", "Yaklaşık iki buçukta.", ""],
      [HL("تُجَهِّزُ أُمِّي وَجَبَاتِ الطَّعَامِ", "تُجَهِّزُ"), "hazırlar", "yer", "yıkar", "Annem yemekleri hazırlar.", "= تُحَضِّرُ"],
      [HL("فِي تَحْضِيرِ مَائِدَةِ الطَّعَامِ", "مَائِدَةِ"), "sofra", "mutfak", "tabak", "Sofrayı hazırlamada.", ""],
      [HL("لِكُلِّ فَرْدٍ مِنَ العَائِلَةِ", "فَرْدٍ"), "fert, kişi", "oda", "öğün", "Ailenin her ferdi için.", "Çoğulu: أَفْرَادٌ."],
      [HL("وَجْبَةُ الفُطُورِ خَفِيفَةٌ", "خَفِيفَةٌ"), "hafif", "ağır", "lezzetli", "Kahvaltı hafiftir.", "Zıddı: ثَقِيلَةٌ; burada دَسِمَةٌ."],
      [HL("وَالمُرَبَّى", "وَالمُرَبَّى"), "reçel", "bal", "tereyağı", "Ve reçel.", ""],
      [HL("وَالبَيْضَ المَسْلُوقَ", "المَسْلُوقَ"), "haşlanmış", "kızarmış", "çiğ", "Haşlanmış yumurta.", "المَقْلِيُّ: kızartılmış, sahanda."],
      [HL("وَهِيَ وَجْبَةٌ دَسِمَةٌ", "دَسِمَةٌ"), "yağlı, doyurucu", "hafif", "soğuk", "O doyurucu bir öğündür.", "Zıddı: خَفِيفَةٌ."],
      [HL("مَعَ حَسَاءِ العَدَسِ", "حَسَاءِ"), "çorba", "pilav", "ekmek", "Mercimek çorbasıyla.", "= شُورْبَةٌ"],
      [HL("خَفِيفٌ عَلَى المَعِدَةِ", "المَعِدَةِ"), "mide", "baş", "göz", "Mideye hafif.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama", short: "Anlama", col: "nasb", legend: ["mz", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "Verilen cevaba uygun soruyu sormak", "Öğünlerin saatini ve içeriğini söylemek"],
  examples: [
    { s: "مَتَى:cerr.Soru / تَتَنَاوَلُ العَائِلَةُ:- / وَجْبَةَ الغَدَاءِ؟:mz", tr: "Aile öğle yemeğini ne zaman yer?", pair: "فِي السَّاعَةِ:- / الثَّانِيَةِ وَالنِّصْفِ:cerr / تَقْرِيبًا.:-", pairTr: "Yaklaşık saat iki buçukta." },
    { s: "مِمَّنْ:cerr.Soru / تَتَكَوَّنُ أُسْرَةُ فِرَاسٍ؟:-", tr: "Firâs’ın ailesi kimlerden oluşur?", pair: "مِنْ:- / أَبِيهِ وَأُمِّهِ وَأُخْتِهِ وَأَخِيهِ.:nasb", pairTr: "Babası, annesi, kız ve erkek kardeşinden." }
  ],
  rules: [
    { tr: "<b>Soru kelimeleri:</b> <span class=\"ar\">مِمَّنْ = مِنْ + مَنْ</span> kimlerden? · <span class=\"ar\">مِمَّ = مِنْ + مَا</span> neden? · <span class=\"ar\">كَمْ</span> kaç? · <span class=\"ar\">مَاذَا</span> ne? · <span class=\"ar\">مَتَى</span> ne zaman? · <span class=\"ar\">مَنْ</span> kim? · <span class=\"ar\">مَا</span> (isimden önce) ne?" },
    { tr: "<b>Cevaba uygun soru:</b> cevapta zaman varsa <span class=\"ar\">مَتَى</span>, sayı varsa <span class=\"ar\">كَمْ</span>, kişi varsa <span class=\"ar\">مَنْ</span>, nesne varsa <span class=\"ar\">مَاذَا</span>. Fiil muhataba çevrilir: <span class=\"ar\">نَتَنَاوَلُ ← تَتَنَاوَلُونَ · أَتَنَاوَلُ ← تَتَنَاوَلُ</span>." },
    { tr: "<b>Zaman ifadeleri:</b> <span class=\"ar\">قَبْلَ</span> önce ≠ <span class=\"ar\">بَعْدَ</span> sonra · <span class=\"ar\">فِي الصَّبَاحِ</span> sabahleyin · <span class=\"ar\">بَعْدَ الظُّهْرِ</span> öğleden sonra · <span class=\"ar\">السَّاعَةُ الثَّانِيَةُ وَالنِّصْفُ</span> saat iki buçuk." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مِمَّنْ تَتَكَوَّنُ أُسْرَةُ فِرَاسٍ؟ كَمْ وَجْبَةً تَتَنَاوَلُ عَائِلَةُ فِرَاسٍ فِي اليَوْمِ؟ مَاذَا تَتَنَاوَلُ عَائِلَةُ فِرَاسٍ فِي وَجْبَةِ الفُطُورِ؟ مَتَى تَتَنَاوَلُ عَائِلَةُ فِرَاسٍ وَجْبَةَ الغَدَاءِ؟ مَاذَا تَأْكُلُ الأُسْرَةُ فِي وَجْبَةِ العَشَاءِ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ العِبَارَاتِ الآتِيَةِ. ٣ ـ اكْتُبْ أَسْئِلَةً مُنَاسِبَةً لِلْإِجَابَاتِ الآتِيَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مِمَّنْ تَتَكَوَّنُ أُسْرَةُ فِرَاسٍ؟", "مِنْ فِرَاسٍ وَأَبِيهِ وَأُمِّهِ وَأُخْتِهِ وَأَخِيهِ.", "مِنْ فِرَاسٍ وَأَبِيهِ وَأُمِّهِ فَقَطْ.", "مِنْ فِرَاسٍ وَأَخَوَيْهِ وَجَدِّهِ.", "Firâs’ın ailesi kimlerden oluşur? Kendisi, babası, annesi, kız ve erkek kardeşi.", "خَمْسَةُ أَشْخَاصٍ."],
      ["كَمْ وَجْبَةً تَتَنَاوَلُ عَائِلَةُ فِرَاسٍ فِي اليَوْمِ؟", "ثَلَاثَ وَجَبَاتٍ.", "وَجْبَتَيْنِ.", "خَمْسَ وَجَبَاتٍ.", "Günde kaç öğün? Üç.", "الفُطُورُ وَالغَدَاءُ وَالعَشَاءُ. Beş, aile fertlerinin sayısı."],
      ["مَاذَا تَتَنَاوَلُ عَائِلَةُ فِرَاسٍ فِي وَجْبَةِ الفُطُورِ؟", "الزَّيْتُونَ وَالجُبْنَ وَاللَّبَنَ وَالمُرَبَّى وَالبَيْضَ، وَالشَّايَ.", "الأَرُزَّ مَعَ حَسَاءِ العَدَسِ.", "الدَّجَاجَ مَعَ السَّلَطَةِ.", "Kahvaltıda ne yerler? Zeytin, peynir, yoğurt, reçel, yumurta; çay.", "Diğerleri öğle yemeği."],
      ["مَتَى تَتَنَاوَلُ عَائِلَةُ فِرَاسٍ وَجْبَةَ الغَدَاءِ؟", "بَعْدَ الظُّهْرِ فِي السَّاعَةِ الثَّانِيَةِ وَالنِّصْفِ تَقْرِيبًا.", "فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا.", "بَعْدَ صَلَاةِ المَغْرِبِ.", "Öğle yemeğini ne zaman yerler? Öğleden sonra yaklaşık 14.30’da.", "Okuldan ve babanın işten dönüşünden sonra."],
      ["مَاذَا تَأْكُلُ الأُسْرَةُ فِي وَجْبَةِ العَشَاءِ؟", "تَأْكُلُ مِثْلَ طَعَامِ الفُطُورِ.", "تَأْكُلُ طَبْخَ الأُمِّ الدَّسِمَ.", "تَأْكُلُ الفَوَاكِهَ فَقَطْ.", "Akşam ne yerler? Kahvaltıdaki gibi (hafif).", "فَهُوَ طَعَامٌ خَفِيفٌ عَلَى المَعِدَةِ."]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ العِبَارَاتِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)? Düzeltmeleri bir sonraki alıştırmada.", items: CL([
      ["يَتَنَاوَلُ فِرَاسٌ وَجْبَةَ الفُطُورِ بَعْدَ عَوْدَتِهِ مِنَ المَدْرَسَةِ.", "y", "Kahvaltı okula gitmeden önce: قَبْلَ ذَهَابِنَا إِلَى مَدْرَسَتِنَا."],
      ["وَجْبَةُ الغَدَاءِ خَفِيفَةٌ، وَتَتَنَاوَلُهَا العَائِلَةُ السَّاعَةَ الثَّانِيَةَ ظُهْرًا.", "y", "Öğle yemeği doyurucudur (دَسِمَةٌ), saati yaklaşık 14.30."],
      ["تَتَنَاوَلُ العَائِلَةُ الفَوَاكِهَ قَبْلَ وَجْبَةِ الغَدَاءِ.", "y", "Meyveyi öğle yemeğinden sonra yerler: وَبَعْدَ الغَدَاءِ…"],
      ["يُسَاعِدُ فِرَاسٌ أُمَّهُ فِي تَحْضِيرِ الطَّعَامِ.", "y", "Annesine yardım eden kız kardeşi: وَتُسَاعِدُهَا أُخْتِي."],
      ["الأُمُّ تُجَهِّزُ وَجْبَةَ الغَدَاءِ فَقَطْ.", "y", "Bütün öğünleri hazırlar: تُجَهِّزُ أُمِّي وَجَبَاتِ الطَّعَامِ كُلَّ يَوْمٍ."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç. Kitaptaki beş cümlenin hepsi yanlış.", items: PL([
      ["يَتَنَاوَلُ فِرَاسٌ الفُطُورَ بَعْدَ عَوْدَتِهِ مِنَ المَدْرَسَةِ. ✗", "يَتَنَاوَلُ فِرَاسٌ الفُطُورَ قَبْلَ ذَهَابِهِ إِلَى المَدْرَسَةِ.", "يَتَنَاوَلُ فِرَاسٌ الفُطُورَ فِي المَدْرَسَةِ.", "لَا يَتَنَاوَلُ فِرَاسٌ الفُطُورَ.", "Firâs kahvaltıyı okula gitmeden önce yapar.", "بَعْدَ ← قَبْلَ"],
      ["وَجْبَةُ الغَدَاءِ خَفِيفَةٌ. ✗", "وَجْبَةُ الغَدَاءِ دَسِمَةٌ.", "وَجْبَةُ الغَدَاءِ صَغِيرَةٌ.", "وَجْبَةُ الغَدَاءِ بَارِدَةٌ.", "Öğle yemeği doyurucudur.", "خَفِيفَةٌ ≠ دَسِمَةٌ"],
      ["تَتَنَاوَلُ العَائِلَةُ الفَوَاكِهَ قَبْلَ الغَدَاءِ. ✗", "تَتَنَاوَلُ العَائِلَةُ الفَوَاكِهَ بَعْدَ الغَدَاءِ أَحْيَانًا.", "تَتَنَاوَلُ العَائِلَةُ الفَوَاكِهَ فِي الفُطُورِ.", "لَا تَأْكُلُ العَائِلَةُ الفَوَاكِهَ.", "Aile meyveyi bazen öğle yemeğinden sonra yer.", "قَبْلَ ← بَعْدَ"],
      ["يُسَاعِدُ فِرَاسٌ أُمَّهُ فِي تَحْضِيرِ الطَّعَامِ. ✗", "تُسَاعِدُ أُخْتُ فِرَاسٍ أُمَّهَا فِي تَحْضِيرِ المَائِدَةِ.", "يُسَاعِدُ أَبُو فِرَاسٍ الأُمَّ.", "لَا يُسَاعِدُ أَحَدٌ الأُمَّ.", "Annesine kız kardeşi yardım eder.", "تُسَاعِدُهَا أُخْتِي."],
      ["الأُمُّ تُجَهِّزُ وَجْبَةَ الغَدَاءِ فَقَطْ. ✗", "الأُمُّ تُجَهِّزُ وَجَبَاتِ الطَّعَامِ كُلَّ يَوْمٍ.", "الأُمُّ تُجَهِّزُ وَجْبَةَ الفُطُورِ فَقَطْ.", "الأُخْتُ تُجَهِّزُ وَجْبَةَ الغَدَاءِ.", "Anne her gün bütün öğünleri hazırlar.", "فَقَطْ: sadece."]
    ])},
    { type: "pick", fill: true, num: "٣", ar: "اكْتُبْ أَسْئِلَةً مُنَاسِبَةً لِلْإِجَابَاتِ الآتِيَةِ", tr: "Cevaba uygun soruyu seç.", items: PL([
      ["___ ← نَتَنَاوَلُ وَجْبَةَ الإِفْطَارِ فِي الصَّبَاحِ.", "مَتَى تَتَنَاوَلُونَ وَجْبَةَ الإِفْطَارِ؟", "كَمْ وَجْبَةً تَتَنَاوَلُونَ؟", "مَاذَا تَشْرَبُونَ؟", "Kahvaltıyı ne zaman yaparsınız? — Sabah.", "Zaman: مَتَى; نَتَنَاوَلُ ← تَتَنَاوَلُونَ."],
      ["___ ← نَتَنَاوَلُ ثَلَاثَ وَجَبَاتٍ فِي اليَوْمِ.", "كَمْ وَجْبَةً تَتَنَاوَلُونَ فِي اليَوْمِ؟", "مَتَى تَتَنَاوَلُونَ الغَدَاءَ؟", "مَنْ يُجَهِّزُ الطَّعَامَ؟", "Günde kaç öğün yersiniz? — Üç.", "Sayı: كَمْ + tekil mansûb (وَجْبَةً)."],
      ["___ ← طَعَامِي المُفَضَّلُ المَحْشِيُّ.", "مَا طَعَامُكَ المُفَضَّلُ؟", "مَتَى تَأْكُلُ؟", "كَمْ طَعَامًا تُحِبُّ؟", "En sevdiğin yemek ne? — Dolma.", "طَعَامِي ← طَعَامُكَ"],
      ["___ ← أُخْتِي تُسَاعِدُ أُمِّي فِي تَحْضِيرِ المَائِدَةِ.", "مَنْ تُسَاعِدُ أُمَّكَ فِي تَحْضِيرِ المَائِدَةِ؟", "مَاذَا تُحَضِّرُ أُمُّكَ؟", "أَيْنَ المَائِدَةُ؟", "Annene sofrayı hazırlamada kim yardım ediyor? — Kız kardeşim.", "Kişi: مَنْ."],
      ["___ ← يَجْتَمِعُ أَفْرَادُ العَائِلَةِ فِي أَوْقَاتِ الطَّعَامِ.", "مَتَى يَجْتَمِعُ أَفْرَادُ العَائِلَةِ؟", "كَمْ فَرْدًا فِي العَائِلَةِ؟", "مَاذَا يَأْكُلُ أَفْرَادُ العَائِلَةِ؟", "Aile fertleri ne zaman bir araya gelir? — Yemek vakitlerinde.", "Zaman: مَتَى."],
      ["___ ← أَتَنَاوَلُ فِي وَجْبَةِ الإِفْطَارِ طَعَامًا خَفِيفًا.", "مَاذَا تَتَنَاوَلُ فِي وَجْبَةِ الإِفْطَارِ؟", "مَتَى تَتَنَاوَلُ الإِفْطَارَ؟", "كَمْ وَجْبَةً تَتَنَاوَلُ؟", "Kahvaltıda ne yersin? — Hafif bir yemek.", "Nesne: مَاذَا; أَتَنَاوَلُ ← تَتَنَاوَلُ."]
    ])},
    { type: "pick", extra: true, ar: "مَتَى؟ كَمِ السَّاعَةُ؟", tr: "Metne göre öğünlerin vaktini seç.", items: PL([
      ["وَجْبَةُ الفُطُورِ", "فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا.", "فِي السَّاعَةِ الثَّامِنَةِ مَسَاءً.", "فِي السَّاعَةِ الثَّانِيَةِ وَالنِّصْفِ.", "Kahvaltı: sabah saat 7.", "قَبْلَ ذَهَابِنَا إِلَى المَدْرَسَةِ."],
      ["وَجْبَةُ الغَدَاءِ", "فِي السَّاعَةِ الثَّانِيَةِ وَالنِّصْفِ تَقْرِيبًا.", "فِي السَّاعَةِ السَّابِعَةِ.", "بَعْدَ صَلَاةِ المَغْرِبِ.", "Öğle yemeği: yaklaşık 14.30.", "بَعْدَ عَوْدَتِنَا مِنَ المَدْرَسَةِ."],
      ["وَجْبَةُ العَشَاءِ", "بَعْدَ صَلَاةِ المَغْرِبِ فِي السَّاعَةِ الثَّامِنَةِ تَقْرِيبًا.", "قَبْلَ صَلَاةِ المَغْرِبِ.", "فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا.", "Akşam yemeği: akşam namazından sonra, yaklaşık 20.00.", ""],
      ["خُرُوجُ الأَبِ إِلَى عَمَلِهِ", "بَعْدَ الفُطُورِ.", "بَعْدَ الغَدَاءِ.", "بَعْدَ العَشَاءِ.", "Babanın işe çıkışı: kahvaltıdan sonra.", "وَقَبْلَ خُرُوجِ أَبِي مِنَ البَيْتِ إِلَى عَمَلِهِ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Çoğul, Eş ve Zıt Anlam, Cümle", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Kelimenin çoğulunu, eş ve zıt anlamlısını, tekilini seçmek", "Yeni kelimeleri anlamlı cümlede kullanmak", "Öğün ve yemek kelimelerini pekiştirmek", "Zaman zarflarını doğru kullanmak: قَبْلَ، بَعْدَ، أَثْنَاءَ"],
  examples: [
    { s: "الطَّعَامُ:mz.Tekil / ← الأَطْعِمَةُ:nasb.Çoğul", tr: "yemek → yemekler", pair: "أَحْيَانًا:mz.Kelime / ← حِينٌ:nasb.Tekil", pairTr: "bazen ← an, vakit" },
    { s: "أَثْنَاءَ:mz.Kelime / = خِلَالَ:nasb.Eş", tr: "sırasında = esnasında", pair: "تَتَحَدَّثُ:mz.Kelime / ≠ تَسْكُتُ:cerr.Zıt", pairTr: "konuşur ≠ susar" }
  ],
  rules: [
    { tr: "<b>Kitaptaki kelime ilişkileri:</b> <span class=\"ar\">الطَّعَامُ ← الأَطْعِمَةُ</span> (çoğul, أَفْعِلَةٌ kalıbı) · <span class=\"ar\">أَثْنَاءَ = خِلَالَ</span> (eş) · <span class=\"ar\">تَتَحَدَّثُ ≠ تَسْكُتُ</span> (zıt) · <span class=\"ar\">أَحْيَانًا ← حِينٌ</span> (tekil)." },
    { tr: "<b>Metindeki diğer zıtlar:</b> <span class=\"ar\">خَفِيفَةٌ ≠ دَسِمَةٌ · قَبْلَ ≠ بَعْدَ · ذَهَابٌ ≠ عَوْدَةٌ / رُجُوعٌ · خُرُوجٌ ≠ دُخُولٌ · الصَّبَاحُ ≠ المَسَاءُ</span>. <b>Eşler:</b> <span class=\"ar\">تَنَاوَلَ = أَكَلَ · تُجَهِّزُ = تُحَضِّرُ · طَبَقٌ = صَحْنٌ · عَوْدَةٌ = رُجُوعٌ</span>." },
    { tr: "<b>Cümleye katma:</b> <span class=\"ar\">مَطْعَمٌ</span> lokanta (yer: <span class=\"ar\">نَأْكُلُ فِي المَطْعَمِ</span>) · <span class=\"ar\">وَجْبَةٌ</span> öğün · <span class=\"ar\">قَهْوَةٌ</span> kahve (içilir: <span class=\"ar\">أَشْرَبُ القَهْوَةَ</span>) · <span class=\"ar\">أَكَلَ</span> yedi · <span class=\"ar\">تَنَاوَلَ</span> yedi, aldı." }
  ],
  kaide: ["٥ ـ تَخَيَّرِ الإِجَابَةَ الصَّحِيحَةَ مِمَّا بَيْنَ قَوْسَيْنِ: جَمْعُ (الطَّعَامِ)، مُرَادِفُ (أَثْنَاءَ)، ضِدُّ (تَتَحَدَّثُ)، مُفْرَدُ (أَحْيَانًا).", "٦ ـ أَدْخِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ مُفِيدَةٍ: مَطْعَمٌ، وَجْبَةٌ، قَهْوَةٌ، أَكَلَ، تَنَاوَلَ."],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "تَخَيَّرِ الإِجَابَةَ الصَّحِيحَةَ مِمَّا بَيْنَ قَوْسَيْنِ", tr: "Kitaptaki seçeneklerden doğrusunu seç.", items: PL([
      ["جَمْعُ (الطَّعَامِ): ___", "الأَطْعِمَةُ", "الطَّعْمُ", "الطُّعُومُ", "yemek → yemekler", "أَفْعِلَةٌ kalıbı. الطُّعُومُ, طَعْمٌ (tat) kelimesinin çoğuludur."],
      ["مُرَادِفُ (أَثْنَاءَ): ___", "خِلَالَ", "بَعْدَ", "قَبْلَ", "sırasında = esnasında", "أَثْنَاءَ الطَّعَامِ = خِلَالَ الطَّعَامِ."],
      ["ضِدُّ (تَتَحَدَّثُ): ___", "تَسْكُتُ", "تَضْحَكُ", "تَتَكَلَّمُ", "konuşur ≠ susar", "تَتَكَلَّمُ eş anlamlıdır, zıt değil."],
      ["مُفْرَدُ (أَحْيَانًا): ___", "حِينٌ", "حَيٌّ", "حَنَانٌ", "bazen ← an, vakit", "أَحْيَانٌ, حِينٌ’in çoğuludur."]
    ])},
    { type: "pick", extra: true, ar: "هَاتِ المَطْلُوبَ", tr: "Metindeki kelimenin istenen karşılığını seç.", items: PL([
      ["ضِدُّ (خَفِيفَةٌ): ___", "دَسِمَةٌ", "لَذِيذَةٌ", "صَغِيرَةٌ", "hafif ≠ doyurucu (yağlı)", "Metinde: الفُطُورُ خَفِيفٌ، الغَدَاءُ دَسِمٌ."],
      ["ضِدُّ (قَبْلَ): ___", "بَعْدَ", "أَثْنَاءَ", "مَعَ", "önce ≠ sonra", ""],
      ["ضِدُّ (ذَهَابٌ): ___", "عَوْدَةٌ", "خُرُوجٌ", "عَمَلٌ", "gidiş ≠ dönüş", "رُجُوعٌ da olur."],
      ["مُرَادِفُ (تُجَهِّزُ): ___", "تُحَضِّرُ", "تَأْكُلُ", "تُسَاعِدُ", "hazırlar = hazırlar", ""],
      ["مُرَادِفُ (طَبَقٌ): ___", "صَحْنٌ", "كُوبٌ", "مَائِدَةٌ", "tabak = tabak", ""],
      ["مُرَادِفُ (نَتَنَاوَلُ الطَّعَامَ): ___", "نَأْكُلُ الطَّعَامَ", "نَطْبُخُ الطَّعَامَ", "نَشْتَرِي الطَّعَامَ", "yemeği yeriz", "تَنَاوَلَ = أَكَلَ"],
      ["جَمْعُ (وَجْبَةٌ): ___", "وَجَبَاتٌ", "أَوْجَابٌ", "وُجُوبٌ", "öğün → öğünler", "Cem-i müennes sâlim."],
      ["جَمْعُ (فَرْدٌ): ___", "أَفْرَادٌ", "فُرُودٌ", "فَرَائِدُ", "fert → fertler", "أَفْعَالٌ kalıbı."],
      ["جَمْعُ (مَسْأَلَةٌ): ___", "مَسَائِلُ", "أَسْآلٌ", "أَسْئِلَةٌ", "mesele → meseleler", "مَفَاعِلُ kalıbı; أَسْئِلَةٌ, سُؤَالٌ’in çoğulu."],
      ["مُفْرَدُ (فَوَاكِهُ): ___", "فَاكِهَةٌ", "فَكِهٌ", "فَوْكٌ", "meyveler ← meyve", "فَوَاعِلُ kalıbı."]
    ])},
    { type: "pick", num: "٦", ar: "أَدْخِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ مُفِيدَةٍ", tr: "Kelimeyi doğru ve anlamlı kullanan cümleyi seç; sonra defterine kendi cümleni yaz.", items: PL([
      ["مَطْعَمٌ", "تَنَاوَلْنَا الغَدَاءَ فِي مَطْعَمٍ قَرِيبٍ مِنَ البَحْرِ.", "شَرِبْتُ مَطْعَمًا بَارِدًا.", "المَطْعَمُ يَأْكُلُ الخُبْزَ.", "Öğle yemeğini denize yakın bir lokantada yedik.", "مَطْعَمٌ bir yerdir; içilmez, yemek yemez."],
      ["وَجْبَةٌ", "الفُطُورُ أَهَمُّ وَجْبَةٍ فِي اليَوْمِ.", "أَسْكُنُ فِي وَجْبَةٍ كَبِيرَةٍ.", "قَرَأْتُ وَجْبَةً جَمِيلَةً.", "Kahvaltı günün en önemli öğünüdür.", "وَجْبَةٌ: öğün."],
      ["قَهْوَةٌ", "يَشْرَبُ أَبِي القَهْوَةَ بَعْدَ الغَدَاءِ.", "أَكَلْتُ القَهْوَةَ بِالمِلْعَقَةِ.", "القَهْوَةُ تَسْكُنُ فِي بَيْرُوتَ.", "Babam öğle yemeğinden sonra kahve içer.", "Kahve içilir: شَرِبَ."],
      ["أَكَلَ", "أَكَلَ فِرَاسٌ تُفَّاحَةً بَعْدَ الغَدَاءِ.", "أَكَلَ فِرَاسٌ الشَّايَ.", "أَكَلَتِ المَائِدَةُ الطَّعَامَ.", "Firâs öğle yemeğinden sonra bir elma yedi.", "Çay içilir, yenmez."],
      ["تَنَاوَلَ", "تَنَاوَلَتِ العَائِلَةُ العَشَاءَ بَعْدَ صَلَاةِ المَغْرِبِ.", "تَنَاوَلَ البَيْتُ فِي المَدِينَةِ.", "تَنَاوَلْتُ إِلَى المَدْرَسَةِ.", "Aile akşam yemeğini akşam namazından sonra yedi.", "تَنَاوَلَ + yemek."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · YİYECEKLER
{
  id: "u4", no: 4, ar: "الوَجَبَاتُ وَالفَوَاكِهُ وَالخُضْرَوَاتُ", tr: "Öğünler, Meyveler, Sebzeler ve Menü", short: "Yiyecekler", col: "ref", legend: ["mz", "nasb"],
  goals: ["Kendi öğünlerinde ne yediğini anlatmak", "Meyvelerin Arapça adlarını söylemek", "Sebzelerin Arapça adlarını söylemek", "Lokanta menüsünü okuyup yemek seçmek"],
  examples: [
    { s: "فِي الفُطُورِ:mz / آكُلُ:- / الجُبْنَ وَالزَّيْتُونَ.:nasb", tr: "Kahvaltıda peynir ve zeytin yerim.", pair: "فِي الغَدَاءِ:mz / آكُلُ:- / الأَرُزَّ وَالدَّجَاجَ.:nasb", pairTr: "Öğle yemeğinde pilav ve tavuk yerim." },
    { s: "أُحِبُّ:- / البُرْتُقَالَ:nasb.Meyve / وَ:- / الجَزَرَ:nasb.Sebze", tr: "Portakalı ve havucu severim." }
  ],
  rules: [
    { tr: "<b>Meyveler</b> (<span class=\"ar\">الفَوَاكِهُ</span>): <span class=\"ar\">بِطِّيخٌ، مَوْزٌ، تُفَّاحٌ، كُمَّثْرَى، بُرْتُقَالٌ، فَرَاوِلَةٌ، عِنَبٌ، أَنَانَاسٌ، مَانْجُو، شَمَّامٌ، كَرَزٌ، خَوْخٌ</span>" },
    { tr: "<b>Sebzeler</b> (<span class=\"ar\">الخُضْرَوَاتُ</span>): <span class=\"ar\">فَاصُولْيَاءُ، فُلْفُلٌ، مَلْفُوفٌ، بَطَاطِسُ، خَسٌّ، جَزَرٌ، خِيَارٌ، ذُرَةٌ، بَصَلٌ، بَقْدُونِسُ، طَمَاطِمُ، فِطْرٌ، قَرْعٌ، قَرْنَبِيطٌ، كُرَّاثٌ</span>" },
    { tr: "Cins isimlerin çoğu tekil anlamda <span class=\"ar\">ـةٌ</span> alır: <span class=\"ar\">تُفَّاحٌ ← تُفَّاحَةٌ</span> bir elma · <span class=\"ar\">بَيْضٌ ← بَيْضَةٌ</span> bir yumurta · <span class=\"ar\">مَوْزٌ ← مَوْزَةٌ</span> bir muz." },
    { tr: "<b>Lokantada:</b> <span class=\"ar\">قَائِمَةُ الطَّعَامِ</span> menü · <span class=\"ar\">أُرِيدُ… مِنْ فَضْلِكَ</span> … istiyorum lütfen · <span class=\"ar\">كَمِ الثَّمَنُ؟</span> fiyatı ne? · <span class=\"ar\">مَشْوِيٌّ</span> ızgara · <span class=\"ar\">طَبَقٌ رَئِيسِيٌّ</span> ana yemek." }
  ],
  kaide: ["٤ ـ مَاذَا تَتَنَاوَلُ فِي الوَجَبَاتِ الآتِيَةِ؟ الفُطُورِ، الغَدَاءِ، العَشَاءِ. ٧ ـ اكْتُبِ اسْمَ الفَوَاكِهِ فِي الفَرَاغَاتِ. ٨ ـ اكْتُبْ أَسْمَاءَ الخُضْرَوَاتِ فِي الفَرَاغَاتِ.", "١١ ـ اقْرَأْ قَائِمَةَ الأَطْعِمَةِ الآتِيَةِ وَاخْتَرْ طَعَامَكَ وَشَرَابَكَ المُفَضَّلَ."],
  ex: [
    { type: "reading", num: "٤", ar: "مَاذَا تَتَنَاوَلُ فِي الوَجَبَاتِ الآتِيَةِ؟", tr: "Örnek metni oku; kendi öğünlerini defterine yaz, sonra Firâs’ın ailesinin yiyeceği hangi öğünde yediğini seç.", title: "وَجَبَاتِي (نَمُوذَجٌ)", speak: true,
      text: "الفُطُورُ: أَتَنَاوَلُ الخُبْزَ وَالجُبْنَ وَالزَّيْتُونَ وَالبَيْضَ المَسْلُوقَ، وَأَشْرَبُ الشَّايَ.<br>الغَدَاءُ: آكُلُ الأَرُزَّ مَعَ الدَّجَاجِ وَالسَّلَطَةِ، وَأَشْرَبُ اللَّبَنَ.<br>العَشَاءُ: آكُلُ طَعَامًا خَفِيفًا: الحَسَاءَ وَالخُبْزَ وَالفَوَاكِهَ.",
      textTr: "Kahvaltı: ekmek, peynir, zeytin ve haşlanmış yumurta yerim, çay içerim. · Öğle: tavuk ve salatayla pilav yerim, ayran/yoğurt içerim. · Akşam: hafif bir yemek yerim: çorba, ekmek ve meyve.",
      qa: [
        { q: "الفُطُورُ: …", a: "فِي الفُطُورِ آكُلُ… وَأَشْرَبُ…", tr: "Kahvaltıda ne yersin, ne içersin?" },
        { q: "الغَدَاءُ: …", a: "فِي الغَدَاءِ آكُلُ…", tr: "Öğle yemeğinde ne yersin?" },
        { q: "العَشَاءُ: …", a: "فِي العَشَاءِ آكُلُ…", tr: "Akşam yemeğinde ne yersin?" }
      ],
      cls: { opts: OGUN, ar: "فِي أَيِّ وَجْبَةٍ يَأْكُلُونَهُ؟ (فِي النَّصِّ)", tr: "Metne göre Firâs’ın ailesi bunu hangi öğünde yer / içer?", items: [
        { s: "الزَّيْتُونُ وَالجُبْنُ", a: "h", why: "Kahvaltıda (akşam da kahvaltı gibi yerler)." },
        { s: "المُرَبَّى", a: "h", why: "Kahvaltı." },
        { s: "البَيْضُ المَقْلِيُّ", a: "h", why: "Kahvaltıda, bazen." },
        { s: "اللَّبَنُ", a: "h", why: "Kahvaltı." },
        { s: "الأَرُزُّ مَعَ حَسَاءِ العَدَسِ", a: "g", why: "Öğle yemeğinde, annenin yemeği." },
        { s: "حَسَاءُ الفِطْرِ", a: "g", why: "Öğle yemeği." },
        { s: "الدَّجَاجُ مَعَ السَّلَطَةِ", a: "g", why: "Öğle yemeği." },
        { s: "البِطِّيخُ وَالبُرْتُقَالُ وَالتُّفَّاحُ", a: "s", why: "Öğle yemeğinden sonra, bazen." },
        { s: "الشَّايُ (عَادَةً)", a: "s", why: "Öğle yemeğinden sonra genellikle çay; kahvaltıda da içerler." }
      ]}
    },
    { type: "pick", fill: true, num: "٧", ar: "اكْتُبِ اسْمَ الفَوَاكِهِ فِي الفَرَاغَاتِ", tr: "Resimdeki meyvenin Arapça adını seç.", items: PL([
      ["🍉 ← ___", "بِطِّيخٌ", "شَمَّامٌ", "تُفَّاحٌ", "karpuz", "Metinde: البِطِّيخُ."],
      ["🍌 ← ___", "مَوْزٌ", "أَنَانَاسٌ", "كُمَّثْرَى", "muz", ""],
      ["🍎 ← ___", "تُفَّاحٌ", "خَوْخٌ", "كَرَزٌ", "elma", "Bir elma: تُفَّاحَةٌ."],
      ["🍐 ← ___", "كُمَّثْرَى", "تُفَّاحٌ", "مَوْزٌ", "armut", "إِجَّاصٌ da denir."],
      ["🍊 ← ___", "بُرْتُقَالٌ", "مَانْجُو", "فَرَاوِلَةٌ", "portakal", "Metinde: البُرْتُقَالُ."],
      ["🍓 ← ___", "فَرَاوِلَةٌ", "كَرَزٌ", "عِنَبٌ", "çilek", ""],
      ["🍇 ← ___", "عِنَبٌ", "خَوْخٌ", "بِطِّيخٌ", "üzüm", ""],
      ["🍍 ← ___", "أَنَانَاسٌ", "شَمَّامٌ", "مَوْزٌ", "ananas", ""],
      ["🥭 ← ___", "مَانْجُو", "بُرْتُقَالٌ", "كُمَّثْرَى", "mango", ""],
      ["🍈 ← ___", "شَمَّامٌ", "بِطِّيخٌ", "أَنَانَاسٌ", "kavun", ""],
      ["🍒 ← ___", "كَرَزٌ", "فَرَاوِلَةٌ", "عِنَبٌ", "kiraz", ""],
      ["🍑 ← ___", "خَوْخٌ", "تُفَّاحٌ", "مَانْجُو", "şeftali", ""]
    ])},
    { type: "pick", fill: true, num: "٨", ar: "اكْتُبْ أَسْمَاءَ الخُضْرَوَاتِ فِي الفَرَاغَاتِ", tr: "Kitaptaki resimlerdeki 15 sebzenin Arapça adını seç.", items: PL([
      ["🫛 taze fasulye ← ___", "فَاصُولْيَاءُ خَضْرَاءُ", "بَازِلَّاءُ", "خِيَارٌ", "taze fasulye", ""],
      ["🫑 biber ← ___", "فُلْفُلٌ", "طَمَاطِمُ", "بَصَلٌ", "biber", ""],
      ["🥬 lahana ← ___", "مَلْفُوفٌ", "خَسٌّ", "قَرْنَبِيطٌ", "lahana", "كُرُنْبٌ da denir."],
      ["🥔 patates ← ___", "بَطَاطِسُ", "بَصَلٌ", "قَرْعٌ", "patates", "بَطَاطَا da denir."],
      ["🥗 marul ← ___", "خَسٌّ", "مَلْفُوفٌ", "بَقْدُونِسُ", "marul", ""],
      ["🥕 havuç ← ___", "جَزَرٌ", "فُلْفُلٌ", "ذُرَةٌ", "havuç", ""],
      ["🥒 salatalık ← ___", "خِيَارٌ", "كُرَّاثٌ", "فَاصُولْيَاءُ", "salatalık", ""],
      ["🌽 mısır ← ___", "ذُرَةٌ", "جَزَرٌ", "قَرْعٌ", "mısır", ""],
      ["🧅 soğan ← ___", "بَصَلٌ", "ثُومٌ", "فِطْرٌ", "soğan", "ثُومٌ: sarımsak."],
      ["🌿 maydanoz ← ___", "بَقْدُونِسُ", "خَسٌّ", "كُرَّاثٌ", "maydanoz", ""],
      ["🍅 domates ← ___", "طَمَاطِمُ", "فُلْفُلٌ", "بُرْتُقَالٌ", "domates", "بَنَدُورَةٌ da denir (Şam, Lübnan)."],
      ["🍄 mantar ← ___", "فِطْرٌ", "بَصَلٌ", "بَطَاطِسُ", "mantar", "Metinde: حَسَاءُ الفِطْرِ."],
      ["🎃 kabak ← ___", "قَرْعٌ", "بِطِّيخٌ", "شَمَّامٌ", "bal kabağı", "يَقْطِينٌ da denir."],
      ["🥦 karnabahar ← ___", "قَرْنَبِيطٌ", "مَلْفُوفٌ", "خَسٌّ", "karnabahar", "Emoji brokoli; resimdeki karnabahar."],
      ["🧄 pırasa ← ___", "كُرَّاثٌ", "ثُومٌ", "بَصَلٌ", "pırasa", "Pırasa emojisi olmadığından yakın bir emoji kullanıldı."]
    ])},
    { type: "reading", num: "١١", ar: "اقْرَأْ قَائِمَةَ الأَطْعِمَةِ الآتِيَةِ وَاخْتَرْ طَعَامَكَ وَشَرَابَكَ المُفَضَّلَ", tr: "Kitaptaki menüyü oku; garsona siparişini söyle (örnek cevaplar), sonra yemeğin menünün hangi bölümünde olduğunu seç.", title: "قَائِمَةُ الطَّعَامِ", speak: true, text: MENU, textTr: MENU_TR,
      qa: [
        { q: "مَاذَا تُرِيدُ أَنْ تَأْكُلَ؟", a: "أُرِيدُ شِيش طَاوُوق مِنْ فَضْلِكَ.", tr: "Ne yemek istersin? — Şiş tavuk istiyorum lütfen." },
        { q: "وَمَاذَا تُرِيدُ أَنْ تَشْرَبَ؟", a: "أُرِيدُ عَصِيرَ بُرْتُقَالٍ.", tr: "Ne içmek istersin? — Portakal suyu istiyorum." },
        { q: "كَمْ ثَمَنُ السَّلْمُونِ المَشْوِيِّ؟", a: "ثَمَنُهُ خَمْسَةٌ وَسَبْعُونَ.", tr: "Izgara somon kaç para? — 75." },
        { q: "مَا أَرْخَصُ طَبَقٍ فِي القَائِمَةِ؟", a: "الأَرُزُّ الصِّينِيُّ، ثَمَنُهُ خَمْسَةٌ وَعِشْرُونَ.", tr: "Menüdeki en ucuz yemek ne? — Çin pilavı, 25." }
      ],
      cls: { opts: KISIM, ar: "فِي أَيِّ قِسْمٍ مِنَ القَائِمَةِ؟", tr: "Bu yemek menünün hangi bölümünde?", items: [
        { s: "فَاهِيتَا دَجَاجٍ", a: "r", why: "Ana yemekler, 55." },
        { s: "سَلْمُونٌ مَشْوِيٌّ", a: "r", why: "Adında مَشْوِيٌّ var ama ana yemeklerde, 75." },
        { s: "دَجَاجُ كَارِي", a: "r", why: "Ana yemekler, 45." },
        { s: "تِرِيَاكِي لَحْمٍ", a: "c", why: "Çin yemekleri, 65." },
        { s: "أَرُزٌّ صِينِيٌّ", a: "c", why: "Çin yemekleri, 25." },
        { s: "سْوِيت آنْد سَاوَر جَمْبَرِي", a: "c", why: "Çin yemekleri, 70." },
        { s: "شِيش طَاوُوق", a: "m", why: "Izgaralar, 45." },
        { s: "رِيَشُ غَنَمٍ", a: "m", why: "Izgaralar, 58." },
        { s: "مَشَاوِي مُشَكَّلٌ", a: "m", why: "Izgaralar, 65." }
      ]}
    }
  ]
},
// ---------------------------------------------------------------- 5 · ZAMİR VE CİNSİYET
{
  id: "u5", no: 5, ar: "الضَّمَائِرُ المُتَّصِلَةُ وَالمُذَكَّرُ وَالمُؤَنَّثُ", tr: "Bitişik Zamirler, Eril ve Dişil", short: "Zamir", col: "muz", legend: ["nasb", "mi"],
  goals: ["İsme bitişen zamirleri sekiz şahısla kullanmak: ـِي، ـنَا، ـكَ، ـكِ، ـكُمْ، ـهُ، ـهَا، ـهُمْ", "Yuvarlak tânın zamir alınca açık tâya döndüğünü bilmek", "Kelimeleri eril ve dişil diye ayırmak", "Tâsız dişil kelimeleri tanımak"],
  examples: [
    { s: "مَدِينَتِـ:nasb.İsim / ـي:mi.أَنَا", tr: "مَدِينَتِي: benim şehrim", pair: "مَدِينَتُـ:nasb.İsim / ـهَا:mi.هِيَ", pairTr: "مَدِينَتُهَا: onun (k.) şehri" },
    { s: "بَيْتُـ:nasb.İsim / ـنَا:mi.نَحْنُ", tr: "بَيْتُنَا: bizim evimiz", pair: "بَيْتُـ:nasb.İsim / ـهُمْ:mi.هُمْ", pairTr: "بَيْتُهُمْ: onların evi" },
    { s: "جِنْسِيَّتُـ:nasb.İsim / ـكُمْ:mi.أَنْتُمْ", tr: "جِنْسِيَّتُكُمْ: sizin uyruğunuz", pair: "عُنْوَانُـ:nasb.İsim / ـكِ:mi.أَنْتِ", pairTr: "عُنْوَانُكِ: senin (k.) adresin" }
  ],
  rules: [
    { tr: "<b>Bitişik zamirler:</b><br>• <span class=\"ar\">أَنَا ← ـِي</span> · <span class=\"ar\">نَحْنُ ← ـنَا</span><br>• <span class=\"ar\">أَنْتَ ← ـكَ</span> · <span class=\"ar\">أَنْتِ ← ـكِ</span> · <span class=\"ar\">أَنْتُمْ ← ـكُمْ</span><br>• <span class=\"ar\">هُوَ ← ـهُ</span> · <span class=\"ar\">هِيَ ← ـهَا</span> · <span class=\"ar\">هُمْ ← ـهُمْ</span>" },
    { tr: "Yuvarlak tâ (<span class=\"ar\">ـةٌ</span>) zamir alınca açık tâya (<span class=\"ar\">ـت</span>) döner: <span class=\"ar\">مَدِينَةٌ ← مَدِينَتِي · جِنْسِيَّةٌ ← جِنْسِيَّتُكَ</span>. Şeddeli harf şeddesini korur: <span class=\"ar\">صَفٌّ ← صَفِّي، صَفُّهُ</span>." },
    { tr: "<b>Eril – dişil:</b> Kelimelerin çoğu <span class=\"ar\">ـةٌ</span> ile dişil olur: <span class=\"ar\">غُرْفَةٌ، طَاوِلَةٌ، صَحِيفَةٌ، صَغِيرَةٌ</span>. Tâsız eriller: <span class=\"ar\">طَبِيبٌ، مَطْبَخٌ، كُرْسِيٌّ</span>. Bazı kelimeler tâsız dişildir (semâî): <span class=\"ar\">كَأْسٌ، شَمْسٌ، أَرْضٌ، دَارٌ، يَدٌ، عَيْنٌ</span>; ülke ve şehir adları da dişildir: <span class=\"ar\">بَيْرُوتُ، مِصْرُ</span>." }
  ],
  kaide: ["٩ ـ امْلَإِ الجَدْوَلَ الآتِيَ: أَنَا، نَحْنُ، أَنْتَ، أَنْتِ، أَنْتُمْ، هُوَ، هِيَ، هُمْ ← مَدِينَتِي، بَيْتُنَا، جِنْسِيَّتُكَ، عُنْوَانُكِ، جِنْسِيَّتُكُمْ، صَفِّي، صَفُّهُ، مَدِينَتُهَا، بَيْتُهُمْ.", "١٠ ـ صَنِّفِ الكَلِمَاتِ الآتِيَةَ فِي الجَدْوَلِ: (طَبِيبٌ، صَغِيرَةٌ، مَطْبَخٌ، غُرْفَةٌ، طَاوِلَةٌ، كَأْسٌ، صَحِيفَةٌ، كُرْسِيٌّ): مُذَكَّرٌ ـ مُؤَنَّثٌ."],
  ex: [
    { type: "pick", fill: true, num: "٩ (أ)", ar: "امْلَإِ الجَدْوَلَ الآتِيَ: مَدِينَةٌ، جِنْسِيَّةٌ، بَيْتٌ", tr: "Tablonun ilk üç sütunu: verilen biçimden yola çıkarak zamire uygun biçimi seç.", items: TABLO([0, 1, 2]) },
    { type: "pick", fill: true, num: "٩ (ب)", ar: "امْلَإِ الجَدْوَلَ الآتِيَ: عُنْوَانٌ، صَفٌّ", tr: "Tablonun son iki sütunu.", items: TABLO([3, 4]) },
    { type: "classify", num: "١٠", opts: CINS, ar: "صَنِّفِ الكَلِمَاتِ الآتِيَةَ فِي الجَدْوَلِ", tr: "Kelime eril mi (مُذَكَّرٌ), dişil mi (مُؤَنَّثٌ)? İlk sekizi kitaptan.", items: CL([
      ["طَبِيبٌ", "m", "Tâsız: eril. Dişili طَبِيبَةٌ."], ["صَغِيرَةٌ", "f", "ـةٌ: dişil."], ["مَطْبَخٌ", "m", "Eril."], ["غُرْفَةٌ", "f", "ـةٌ: dişil."],
      ["طَاوِلَةٌ", "f", "ـةٌ: dişil."], ["كَأْسٌ", "f", "Tâsız dişil (semâî): هَذِهِ كَأْسٌ. (Bazen eril de kullanılır.)"], ["صَحِيفَةٌ", "f", "ـةٌ: dişil."], ["كُرْسِيٌّ", "m", "Eril."],
      ["مَطْعَمٌ", "m", "Eril."], ["وَجْبَةٌ", "f", "ـةٌ: dişil."], ["مَائِدَةٌ", "f", "ـةٌ: dişil."], ["طَبَقٌ", "m", "Eril."],
      ["شَمْسٌ", "f", "Tâsız dişil (semâî)."], ["بَيْرُوتُ", "f", "Şehir adı: dişil."], ["حَسَاءٌ", "m", "Eril."], ["مُعَلِّمَةٌ", "f", "ـةٌ: dişil."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الكَلِمَةَ بِالضَّمِيرِ المُنَاسِبِ", tr: "Cümleye uygun bitişik zamirli biçimi seç.", items: PL([
      ["أَنَا فِرَاسٌ، ___ بَيْرُوتُ.", "مَدِينَتِي", "مَدِينَتُهُ", "مَدِينَتُكُمْ", "Ben Firâs, şehrim Beyrut.", "أَنَا ← ـِي"],
      ["أُخْتِي تُسَاعِدُ ___.", "أُمَّهَا", "أُمَّهُ", "أُمَّكُمْ", "Kız kardeşim annesine yardım ediyor.", "أُخْتِي = هِيَ ← ـهَا"],
      ["نَحْنُ نَأْكُلُ فِي ___.", "بَيْتِنَا", "بَيْتِهِمْ", "بَيْتِكِ", "Biz evimizde yiyoruz.", "نَحْنُ ← ـنَا"],
      ["يَا طُلَّابُ، مَا ___؟", "جِنْسِيَّتُكُمْ", "جِنْسِيَّتُكَ", "جِنْسِيَّتُهُمْ", "Öğrenciler, uyruğunuz ne?", "أَنْتُمْ ← ـكُمْ"],
      ["يَا مَرْيَمُ، مَا ___؟", "عُنْوَانُكِ", "عُنْوَانُكَ", "عُنْوَانُهَا", "Meryem, adresin ne?", "أَنْتِ ← ـكِ"],
      ["الأَوْلَادُ فِي ___.", "صَفِّهِمْ", "صَفِّهِ", "صَفِّنَا", "Çocuklar sınıflarında.", "هُمْ ← ـهُمْ"]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["أَنَا فِرَاسٌ، أَنَا مِنْ {لُبْنَانَ}.", ["لُبْنَانَ", "مِصْرَ", "سُورِيَةَ"], "metin", "Ben Firâs, Lübnanlıyım.", "u1"],
  ["تَتَكَوَّنُ أُسْرَتِي مِنْ {خَمْسَةِ} أَشْخَاصٍ.", ["خَمْسَةِ", "ثَلَاثَةِ", "سِتَّةِ"], "metin", "Ailem beş kişiden oluşur.", "u1"],
  ["المَطْبَخُ اللُّبْنَانِيُّ غَنِيٌّ وَ{لَذِيذٌ}.", ["لَذِيذٌ", "خَفِيفٌ", "صَغِيرٌ"], "metin", "Lübnan mutfağı zengin ve lezzetlidir.", "u1"],
  ["نَتَنَاوَلُ ثَلَاثَ {وَجَبَاتٍ} كُلَّ يَوْمٍ.", ["وَجَبَاتٍ", "وَجْبَةٍ", "وَجْبَتَيْنِ"], "metin", "Her gün üç öğün yeriz.", "u1"],
  ["نَتَنَاوَلُ الفُطُورَ {قَبْلَ} ذَهَابِنَا إِلَى المَدْرَسَةِ.", ["قَبْلَ", "بَعْدَ", "أَثْنَاءَ"], "metin", "Kahvaltıyı okula gitmeden önce yaparız.", "u1"],
  ["يَعْمَلُ أَبِي فِي {المُسْتَشْفَى}.", ["المُسْتَشْفَى", "المَدْرَسَةِ", "المَطْعَمِ"], "metin", "Babam hastanede çalışıyor.", "u1"],
  ["وَنَتَنَاوَلُ العَشَاءَ بَعْدَ صَلَاةِ {المَغْرِبِ}.", ["المَغْرِبِ", "الفَجْرِ", "الظُّهْرِ"], "anlama", "Akşam yemeğini akşam namazından sonra yeriz.", "u2"],
  ["تُسَاعِدُ {أُخْتِي} أُمِّي فِي تَحْضِيرِ المَائِدَةِ.", ["أُخْتِي", "أَخِي", "أَبِي"], "anlama", "Kız kardeşim sofrayı hazırlamada anneme yardım eder.", "u2"],
  ["وَجْبَةُ الغَدَاءِ {دَسِمَةٌ} عَادَةً.", ["دَسِمَةٌ", "خَفِيفَةٌ", "بَارِدَةٌ"], "anlama", "Öğle yemeği genellikle doyurucudur.", "u2"],
  ["{مَتَى} تَتَنَاوَلُونَ الفُطُورَ؟", ["مَتَى", "كَمْ", "مَنْ"], "soru", "Kahvaltıyı ne zaman yaparsınız?", "u2"],
  ["{كَمْ} وَجْبَةً تَتَنَاوَلُونَ فِي اليَوْمِ؟", ["كَمْ", "مَاذَا", "مَتَى"], "soru", "Günde kaç öğün yersiniz?", "u2"],
  ["جَمْعُ الطَّعَامِ: {الأَطْعِمَةُ}.", ["الأَطْعِمَةُ", "الطُّعُومُ", "الطَّعْمُ"], "çoğul", "Yemeğin çoğulu: et’ime.", "u3"],
  ["أَثْنَاءَ = {خِلَالَ}.", ["خِلَالَ", "قَبْلَ", "بَعْدَ"], "eş anlam", "Esnasında = sırasında.", "u3"],
  ["تَتَحَدَّثُ ≠ {تَسْكُتُ}.", ["تَسْكُتُ", "تَتَكَلَّمُ", "تَضْحَكُ"], "zıt", "Konuşur ≠ susar.", "u3"],
  ["يَشْرَبُ أَبِي {القَهْوَةَ} بَعْدَ الغَدَاءِ.", ["القَهْوَةَ", "الخُبْزَ", "الأَرُزَّ"], "cümle", "Babam öğle yemeğinden sonra kahve içer.", "u3"],
  ["فِي الفُطُورِ نَأْكُلُ الزَّيْتُونَ وَ{الجُبْنَ}.", ["الجُبْنَ", "الدَّجَاجَ", "الأَرُزَّ"], "öğün", "Kahvaltıda zeytin ve peynir yeriz.", "u4"],
  ["الْمَوْزُ وَالتُّفَّاحُ مِنَ {الفَوَاكِهِ}.", ["الفَوَاكِهِ", "الخُضْرَوَاتِ", "المَشْرُوبَاتِ"], "meyve", "Muz ve elma meyvelerdendir.", "u4"],
  ["الجَزَرُ وَالخِيَارُ مِنَ {الخُضْرَوَاتِ}.", ["الخُضْرَوَاتِ", "الفَوَاكِهِ", "المَشْرُوبَاتِ"], "sebze", "Havuç ve salatalık sebzelerdendir.", "u4"],
  ["أُرِيدُ شِيش طَاوُوق مِنْ {فَضْلِكَ}.", ["فَضْلِكَ", "بَيْتِكَ", "عَمَلِكَ"], "lokanta", "Şiş tavuk istiyorum lütfen.", "u4"],
  ["أَنَا: {مَدِينَتِي} بَيْرُوتُ.", ["مَدِينَتِي", "مَدِينَتُهُ", "مَدِينَتُنَا"], "zamir", "Şehrim Beyrut.", "u5"],
  ["هُمْ: {بَيْتُهُمْ} كَبِيرٌ.", ["بَيْتُهُمْ", "بَيْتُهُ", "بَيْتُكُمْ"], "zamir", "Onların evi büyük.", "u5"],
  ["أَنْتُمْ: مَا {جِنْسِيَّتُكُمْ}؟", ["جِنْسِيَّتُكُمْ", "جِنْسِيَّتُكَ", "جِنْسِيَّتُهُمْ"], "zamir", "Uyruğunuz ne?", "u5"],
  ["هُوَ فِي {صَفِّهِ}.", ["صَفِّهِ", "صَفِّهَا", "صَفِّي"], "zamir", "O sınıfında.", "u5"],
  ["{هَذِهِ} كَأْسٌ جَمِيلَةٌ.", ["هَذِهِ", "هَذَا", "هَؤُلَاءِ"], "dişil", "Bu güzel bir bardak.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["وَجْبَةُ الفُطُورِ دَسِمَةٌ ← metne göre düzelt", "وَجْبَةُ الفُطُورِ خَفِيفَةٌ", "وَجْبَةُ الفُطُورِ كَبِيرَةٌ", "وَجْبَةُ الفُطُورِ بَارِدَةٌ", "Kahvaltı hafif, öğle doyurucu.", "u1"],
  ["نَتَنَاوَلُ العَشَاءَ قَبْلَ المَغْرِبِ ← metne göre düzelt", "نَتَنَاوَلُ العَشَاءَ بَعْدَ المَغْرِبِ", "نَتَنَاوَلُ العَشَاءَ فِي الصَّبَاحِ", "نَتَنَاوَلُ العَشَاءَ فِي المَدْرَسَةِ", "بَعْدَ صَلَاةِ المَغْرِبِ.", "u1"],
  ["يُسَاعِدُ فِرَاسٌ أُمَّهُ ← metne göre düzelt", "تُسَاعِدُ أُخْتُ فِرَاسٍ أُمَّهَا", "يُسَاعِدُ أَبُو فِرَاسٍ أُمَّهُ", "يُسَاعِدُ أَخُو فِرَاسٍ أُمَّهُ", "تُسَاعِدُهَا أُخْتِي.", "u2"],
  ["نَتَنَاوَلُ ثَلَاثَ وَجَبَاتٍ ← soruyu yaz", "كَمْ وَجْبَةً تَتَنَاوَلُونَ؟", "مَتَى تَتَنَاوَلُونَ؟", "مَاذَا تَتَنَاوَلُونَ؟", "Sayı: كَمْ.", "u2"],
  ["طَعَامِي المُفَضَّلُ المَحْشِيُّ ← soruyu yaz", "مَا طَعَامُكَ المُفَضَّلُ؟", "مَتَى تَأْكُلُ المَحْشِيَّ؟", "كَمْ طَعَامًا تُحِبُّ؟", "طَعَامِي ← طَعَامُكَ", "u2"],
  ["الطَّعَامُ ← çoğul", "الأَطْعِمَةُ", "الطُّعُومُ", "الطَّعَامَاتُ", "أَفْعِلَةٌ kalıbı.", "u3"],
  ["أَحْيَانًا ← tekil", "حِينٌ", "حَيٌّ", "حَنَانٌ", "أَحْيَانٌ ← حِينٌ", "u3"],
  ["خَفِيفَةٌ ← zıt anlam", "دَسِمَةٌ", "لَذِيذَةٌ", "صَغِيرَةٌ", "hafif ≠ doyurucu", "u3"],
  ["🍉 ← Arapçası", "بِطِّيخٌ", "تُفَّاحٌ", "مَوْزٌ", "karpuz", "u4"],
  ["🥕 ← Arapçası", "جَزَرٌ", "خِيَارٌ", "بَصَلٌ", "havuç", "u4"],
  ["مَدِينَةٌ + أَنَا", "مَدِينَتِي", "مَدِينَةِي", "مَدِينَتُنَا", "Tâ açılır: مَدِينَتِـي.", "u5"],
  ["بَيْتٌ + هُمْ", "بَيْتُهُمْ", "بَيْتُهُ", "بَيْتُكُمْ", "هُمْ ← ـهُمْ", "u5"],
  ["صَفٌّ + هُوَ", "صَفُّهُ", "صَفُّهَا", "صَفِّي", "هُوَ ← ـهُ", "u5"],
  ["كَأْسٌ ← cinsiyet", "مُؤَنَّثٌ", "مُذَكَّرٌ", "مُثَنًّى", "Tâsız dişil (semâî).", "u5"]
];
// Meyve mi sebze mi? hız oyunu
var NOUN_LIST = [
  ["بِطِّيخٌ", "f", "karpuz"], ["مَوْزٌ", "f", "muz"], ["تُفَّاحٌ", "f", "elma"], ["كُمَّثْرَى", "f", "armut"], ["بُرْتُقَالٌ", "f", "portakal"], ["فَرَاوِلَةٌ", "f", "çilek"], ["عِنَبٌ", "f", "üzüm"], ["أَنَانَاسٌ", "f", "ananas"], ["شَمَّامٌ", "f", "kavun"], ["كَرَزٌ", "f", "kiraz"], ["خَوْخٌ", "f", "şeftali"],
  ["فُلْفُلٌ", "s", "biber"], ["مَلْفُوفٌ", "s", "lahana"], ["بَطَاطِسُ", "s", "patates"], ["خَسٌّ", "s", "marul"], ["جَزَرٌ", "s", "havuç"], ["خِيَارٌ", "s", "salatalık"], ["ذُرَةٌ", "s", "mısır"], ["بَصَلٌ", "s", "soğan"], ["بَقْدُونِسُ", "s", "maydanoz"], ["طَمَاطِمُ", "s", "domates"], ["فِطْرٌ", "s", "mantar"], ["قَرْنَبِيطٌ", "s", "karnabahar"], ["كُرَّاثٌ", "s", "pırasa"]
];
var SP_M = MS;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt anlamı", pairs: [["خَفِيفَةٌ", "دَسِمَةٌ"], ["قَبْلَ", "بَعْدَ"], ["الصَّبَاحُ", "المَسَاءُ"], ["تَتَحَدَّثُ", "تَسْكُتُ"], ["ذَهَابٌ", "عَوْدَةٌ"], ["خُرُوجٌ", "دُخُولٌ"], ["مُفِيدٌ", "ضَارٌّ"], ["الفُطُورُ", "العَشَاءُ"]] },
  es: { name: "Kelime ↔ eş anlamı", pairs: [["أَثْنَاءَ", "خِلَالَ"], ["تَنَاوَلَ", "أَكَلَ"], ["تُجَهِّزُ", "تُحَضِّرُ"], ["طَبَقٌ", "صَحْنٌ"], ["عَوْدَةٌ", "رُجُوعٌ"], ["أُسْرَةٌ", "عَائِلَةٌ"], ["حَسَاءٌ", "شُورْبَةٌ"]] },
  zm: { name: "Zamir ↔ bitişik biçim", pairs: [["أَنَا", "بَيْتِي"], ["نَحْنُ", "بَيْتُنَا"], ["أَنْتِ", "بَيْتُكِ"], ["أَنْتُمْ", "بَيْتُكُمْ"], ["هُوَ", "بَيْتُهُ"], ["هِيَ", "بَيْتُهَا"], ["هُمْ", "بَيْتُهُمْ"]] }
};
var KARTLAR = [
  ["Firâs kimdir?", "فِرَاسٌ لُبْنَانِيٌّ، يَعِيشُ فِي بَيْرُوتَ · Ailesi beş kişi: kendisi, babası, annesi, kız ve erkek kardeşi."],
  ["Üç öğün ve saatleri?", "الفُطُورُ: السَّابِعَةُ · الغَدَاءُ: الثَّانِيَةُ وَالنِّصْفُ · العَشَاءُ: بَعْدَ المَغْرِبِ (الثَّامِنَةُ)"],
  ["Kahvaltıda ne yerler?", "الزَّيْتُونُ، الجُبْنُ، اللَّبَنُ، المُرَبَّى، البَيْضُ (مَقْلِيٌّ / مَسْلُوقٌ) + الشَّايُ"],
  ["Öğle yemeğinde ne yerler?", "الأَرُزُّ مَعَ حَسَاءِ العَدَسِ أَوِ الفِطْرِ · الدَّجَاجُ مَعَ السَّلَطَةِ · sonra çay, bazen meyve"],
  ["Akşam yemeği nasıldır?", "مِثْلُ طَعَامِ الفُطُورِ، خَفِيفٌ عَلَى المَعِدَةِ"],
  ["Kim ne yapar?", "الأُمُّ تُجَهِّزُ الوَجَبَاتِ · الأُخْتُ تُحَضِّرُ المَائِدَةَ · الأَبُ يَعْمَلُ فِي المُسْتَشْفَى"],
  ["Kitaptaki kelime ilişkileri?", "الطَّعَامُ ← الأَطْعِمَةُ · أَثْنَاءَ = خِلَالَ · تَتَحَدَّثُ ≠ تَسْكُتُ · أَحْيَانًا ← حِينٌ"],
  ["Soru kelimeleri?", "مِمَّنْ (kimlerden) · كَمْ (kaç) · مَاذَا (ne) · مَتَى (ne zaman) · مَنْ (kim)"],
  ["Beş meyve?", "بِطِّيخٌ، مَوْزٌ، تُفَّاحٌ، بُرْتُقَالٌ، عِنَبٌ"],
  ["Beş sebze?", "جَزَرٌ، خِيَارٌ، بَصَلٌ، طَمَاطِمُ، بَطَاطِسُ"],
  ["Bitişik zamirler?", "ـِي، ـنَا، ـكَ، ـكِ، ـكُمْ، ـهُ، ـهَا، ـهُمْ · مَدِينَةٌ ← مَدِينَتِي"],
  ["Eril mi dişil mi?", "طَبِيبٌ، مَطْبَخٌ، كُرْسِيٌّ: مُذَكَّرٌ · غُرْفَةٌ، طَاوِلَةٌ، صَحِيفَةٌ، كَأْسٌ: مُؤَنَّثٌ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat04";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("طَعَامٌ", "i", "yemek, yiyecek", "أَطْعِمَةٌ", "efile", "أَكْلٌ", "", "تُجَهِّزُ أُمِّي وَجَبَاتِ الطَّعَامِ كُلَّ يَوْمٍ.", "الطَّعَامِ", "Annem her gün yemekleri hazırlar."),
  KW("وَجْبَةٌ", "i", "öğün", "وَجَبَاتٌ", "at", "", "", "نَتَنَاوَلُ ثَلَاثَ وَجَبَاتٍ كُلَّ يَوْمٍ.", "وَجَبَاتٍ", "Her gün üç öğün yeriz."),
  KW("مَائِدَةٌ", "i", "sofra", "مَوَائِدُ", "fevail", "", "", "وَتُسَاعِدُهَا أُخْتِي فِي تَحْضِيرِ مَائِدَةِ الطَّعَامِ.", "مَائِدَةِ", "Kız kardeşim sofrayı hazırlamada ona yardım eder."),
  KW("فَرْدٌ", "i", "fert, kişi", "أَفْرَادٌ", "efal", "شَخْصٌ", "", "يَجْتَمِعُ أَفْرَادُ العَائِلَةِ فِي أَوْقَاتِ الطَّعَامِ.", "أَفْرَادُ", "Aile fertleri yemek vakitlerinde bir araya gelir."),
  KW("شَخْصٌ", "i", "kişi", "أَشْخَاصٌ", "efal", "فَرْدٌ", "", "تَتَكَوَّنُ أُسْرَتِي مِنْ خَمْسَةِ أَشْخَاصٍ.", "أَشْخَاصٍ", "Ailem beş kişiden oluşur."),
  KW("وَقْتٌ", "i", "vakit", "أَوْقَاتٌ", "efal", "حِينٌ", "", "يَجْتَمِعُ أَفْرَادُ العَائِلَةِ فِي أَوْقَاتِ الطَّعَامِ.", "أَوْقَاتِ", "Aile fertleri yemek vakitlerinde toplanır."),
  KW("حِينٌ", "i", "an, vakit", "أَحْيَانٌ", "efal", "وَقْتٌ", "", "وَأَحْيَانًا نَأْكُلُ الفَوَاكِهَ.", "وَأَحْيَانًا", "Bazen de meyve yeriz."),
  KW("طَبَقٌ", "i", "tabak", "أَطْبَاقٌ", "efal", "صَحْنٌ", "", "أُخْتِي تَضَعُ عَلَى المَائِدَةِ طَبَقًا وَمِلْعَقَةً.", "طَبَقًا", "Kız kardeşim sofraya bir tabak ve bir kaşık koyar."),
  KW("مِلْعَقَةٌ", "i", "kaşık", "مَلَاعِقُ", "mefail", "", "", "أُخْتِي تَضَعُ عَلَى المَائِدَةِ طَبَقًا وَمِلْعَقَةً.", "وَمِلْعَقَةً", "Kız kardeşim sofraya bir tabak ve bir kaşık koyar."),
  KW("سِكِّينٌ", "i", "bıçak", "سَكَاكِينُ", "fealil", "", "", "وَشَوْكَةً وَسِكِّينًا لِكُلِّ فَرْدٍ.", "وَسِكِّينًا", "Ve her fert için bir çatal ve bir bıçak."),
  KW("جُبْنٌ", "i", "peynir", "أَجْبَانٌ", "efal", "", "", "نَأْكُلُ الزَّيْتُونَ وَالجُبْنَ وَاللَّبَنَ.", "وَالجُبْنَ", "Zeytin, peynir ve yoğurt yeriz."),
  KW("بَيْضٌ", "i", "yumurta", "بُيُوضٌ", "fuul", "", "", "وَالبَيْضَ المَقْلِيَّ أَحْيَانًا.", "وَالبَيْضَ", "Ve bazen sahanda yumurta."),
  KW("حَسَاءٌ", "i", "çorba", "أَحْسِيَةٌ", "efile", "شُورْبَةٌ", "", "نَأْكُلُ الأَرُزَّ مَعَ حَسَاءِ العَدَسِ.", "حَسَاءِ", "Mercimek çorbasıyla pilav yeriz."),
  KW("فَاكِهَةٌ", "i", "meyve", "فَوَاكِهُ", "fevail", "", "", "وَأَحْيَانًا نَأْكُلُ الفَوَاكِهَ، مِثْلَ البِطِّيخِ.", "الفَوَاكِهَ", "Bazen karpuz gibi meyveler yeriz."),
  KW("مَسْأَلَةٌ", "i", "mesele, konu", "مَسَائِلُ", "mefail", "قَضِيَّةٌ", "", "وَيَتَنَاقَشُونَ فِي بَعْضِ المَسَائِلِ العَائِلِيَّةِ.", "المَسَائِلِ", "Bazı aile meseleleri hakkında görüşürler."),
  KW("نِظَامٌ", "i", "düzen, sistem", "أَنْظِمَةٌ", "efile", "", "", "هَذَا النِّظَامُ الغِذَائِيُّ مُفِيدٌ لِصِحَّتِنَا.", "النِّظَامُ", "Bu beslenme düzeni sağlığımıza faydalıdır."),
  KW("مَطْعَمٌ", "i", "lokanta", "مَطَاعِمُ", "mefail", "", "", "تَنَاوَلْنَا الغَدَاءَ فِي مَطْعَمٍ قَرِيبٍ.", "مَطْعَمٍ", "Öğle yemeğini yakın bir lokantada yedik."),
  KW("مُسْتَشْفًى", "i", "hastane", "مُسْتَشْفَيَاتٌ", "at", "", "", "قَبْلَ خُرُوجِ أَبِي إِلَى عَمَلِهِ فِي المُسْتَشْفَى.", "المُسْتَشْفَى", "Babam hastanedeki işine çıkmadan önce."),
  KW("صَلَاةٌ", "i", "namaz", "صَلَوَاتٌ", "at", "", "", "وَنَتَنَاوَلُ وَجْبَةَ العَشَاءِ بَعْدَ صَلَاةِ المَغْرِبِ.", "صَلَاةِ", "Akşam yemeğini akşam namazından sonra yeriz."),
  KW("خَفِيفٌ", "s", "hafif", "خِفَافٌ", "fial", "", "دَسِمٌ", "وَجْبَةُ الفُطُورِ خَفِيفَةٌ عَادَةً.", "خَفِيفَةٌ", "Kahvaltı genellikle hafiftir."),
  KW("دَسِمٌ", "s", "yağlı, doyurucu", "", "", "", "خَفِيفٌ", "وَهِيَ وَجْبَةٌ دَسِمَةٌ عَادَةً.", "دَسِمَةٌ", "O genellikle doyurucu bir öğündür."),
  KW("لَذِيذٌ", "s", "lezzetli", "", "", "", "", "المَطْبَخُ اللُّبْنَانِيُّ غَنِيٌّ وَلَذِيذٌ.", "وَلَذِيذٌ", "Lübnan mutfağı zengin ve lezzetlidir."),
  KW("غَنِيٌّ", "s", "zengin", "أَغْنِيَاءُ", "efila", "", "فَقِيرٌ", "المَطْبَخُ اللُّبْنَانِيُّ غَنِيٌّ وَلَذِيذٌ.", "غَنِيٌّ", "Lübnan mutfağı zengin ve lezzetlidir."),
  KW("مُفِيدٌ", "s", "faydalı", "", "", "نَافِعٌ", "ضَارٌّ", "هَذَا النِّظَامُ الغِذَائِيُّ مُفِيدٌ لِصِحَّتِنَا.", "مُفِيدٌ", "Bu beslenme düzeni sağlığımıza faydalıdır."),
  KW("مُفَضَّلٌ", "s", "en sevilen, gözde", "", "", "", "", "طَعَامِي المُفَضَّلُ المَحْشِيُّ.", "المُفَضَّلُ", "En sevdiğim yemek dolma."),
  KW("قَبْلَ", "s", "önce", "", "", "", "بَعْدَ", "نَتَنَاوَلُ وَجْبَةَ الفُطُورِ قَبْلَ ذَهَابِنَا إِلَى مَدْرَسَتِنَا.", "قَبْلَ", "Kahvaltıyı okulumuza gitmeden önce yaparız."),
  KW("أَثْنَاءَ", "s", "sırasında", "", "", "خِلَالَ", "", "نَتَكَلَّمُ أَثْنَاءَ الطَّعَامِ.", "أَثْنَاءَ", "Yemek sırasında konuşuruz."),
  KW("تَنَاوَلَ", "f", "yedi, aldı", "", "", "أَكَلَ", "", "نَتَنَاوَلُ ثَلَاثَ وَجَبَاتٍ كُلَّ يَوْمٍ.", "نَتَنَاوَلُ", "Her gün üç öğün yeriz."),
  KW("جَهَّزَ", "f", "hazırladı", "", "", "حَضَّرَ", "", "تُجَهِّزُ أُمِّي وَجَبَاتِ الطَّعَامِ كُلَّ يَوْمٍ.", "تُجَهِّزُ", "Annem her gün yemekleri hazırlar."),
  KW("سَاعَدَ", "f", "yardım etti", "", "", "", "", "وَتُسَاعِدُهَا أُخْتِي فِي تَحْضِيرِ مَائِدَةِ الطَّعَامِ.", "وَتُسَاعِدُهَا", "Kız kardeşim ona sofrayı hazırlamada yardım eder."),
  KW("وَضَعَ", "f", "koydu", "", "", "", "رَفَعَ", "أُخْتِي تَضَعُ عَلَى المَائِدَةِ طَبَقًا.", "تَضَعُ", "Kız kardeşim sofraya bir tabak koyar."),
  KW("اجْتَمَعَ", "f", "bir araya geldi", "", "", "", "تَفَرَّقَ", "يَجْتَمِعُ أَفْرَادُ العَائِلَةِ فِي أَوْقَاتِ الطَّعَامِ.", "يَجْتَمِعُ", "Aile fertleri yemek vakitlerinde bir araya gelir."),
  KW("تَحَدَّثَ", "f", "konuştu", "", "", "تَكَلَّمَ", "سَكَتَ", "فَيَتَكَلَّمُونَ وَيَتَحَاوَرُونَ.", "فَيَتَكَلَّمُونَ", "Konuşur ve sohbet ederler.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","قُلُوبٌ، بُيُوضٌ"],"efal":["أَفْعَالٌ","ef’âl","أَقْلَامٌ، أَطْبَاقٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، خِفَافٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","غُرَفٌ، صُوَرٌ"],"fuala":["فُعَلَاءُ","fu’alâ","وُزَرَاءُ، فُقَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَغْنِيَاءُ"],"fevail":["فَوَاعِلُ","fevâil","فَوَاكِهُ، مَوَائِدُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَطَاعِمُ، مَسَائِلُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","سَكَاكِينُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","تُجَّارٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","مُعَلِّمُونَ، مُسَافِرُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","وَجَبَاتٌ، صَلَوَاتٌ"],"diger":["…","başka kalıplar","إِخْوَةٌ، كُسَالَى"]};
