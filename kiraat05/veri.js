// ================= VERİ: Kıraat 5 — الدِّرَاسَةُ فِي الجَامِعَةِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "المَكَانُ", tr: "Yer" }, nasb: { ar: "المَعْلُومَةُ", tr: "Bilgi" }, cerr: { ar: "الوَقْتُ", tr: "Zaman" },
  mi: { ar: "الفِعْلُ", tr: "Fiil" }, ref: { ar: "الصِّفَةُ", tr: "Sıfat" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var GA = [["g", "Gün", "يَوْمٌ", "nasb"], ["a", "Ay", "شَهْرٌ", "mi"]];
var HT = [["d", "Ders günü", "يَوْمُ دِرَاسَةٍ", "mz"], ["t", "Tatil", "عُطْلَةٌ", "cerr"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", g: "Gün", a: "Ay" };

// Ders programı (örnek): gün × ders → ders adı
var DERS = [["القِرَاءَةُ", "okuma"], ["القَوَاعِدُ", "dil bilgisi"], ["المُحَادَثَةُ", "konuşma"], ["الكِتَابَةُ", "yazma"], ["الاسْتِمَاعُ", "dinleme"]];
var GUN = [["الإِثْنَيْنِ", "Pazartesi", "الإِثْنَيْنِ"], ["الثُّلَاثَاءُ", "Salı", "الثُّلَاثَاءِ"], ["الأَرْبِعَاءُ", "Çarşamba", "الأَرْبِعَاءِ"], ["الخَمِيسُ", "Perşembe", "الخَمِيسِ"], ["الجُمُعَةُ", "Cuma", "الجُمُعَةِ"]];
var SAAT = [["المُحَاضَرَةُ الأُولَى", "9.00–10.30"], ["المُحَاضَرَةُ الثَّانِيَةُ", "11.00–12.30"], ["المُحَاضَرَةُ الثَّالِثَةُ", "13.30–15.00"]];
var PROG = [[1, 0, 3], [0, 2, 4], [1, 3, 2], [2, 0, 4], [1, 3, 4]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "خَالِدٌ طَالِبٌ سُورِيٌّ مُتَفَوِّقٌ، هُوَ مِنْ مَدِينَةِ دِمَشْقَ، يَدْرُسُ خَالِدٌ فِي جَامِعَةِ دِمَشْقَ فِي كُلِّيَّةِ الطِّبِّ، هُوَ فِي السَّنَةِ الخَامِسَةِ، هُوَ يُحِبُّ كُلِّيَّتَهُ كَثِيرًا، وَيُرِيدُ أَنْ يُصْبِحَ طَبِيبًا مَاهِرًا فِي المُسْتَقْبَلِ." +
  "<br>يَبْدَأُ العَامُ الدِّرَاسِيُّ فِي الجَامِعَةِ فِي مُنْتَصَفِ شَهْرِ أَيْلُولَ تَقْرِيبًا، وَيَنْتَهِي فِي شَهْرِ حُزَيْرَانَ، وَالعُطْلَةُ الصَّيْفِيَّةُ عُطْلَةٌ طَوِيلَةٌ، مُدَّتُهَا ثَلَاثَةُ أَشْهُرٍ تَقْرِيبًا." +
  "<br>يَدْرُسُ خَالِدٌ خَمْسَةَ أَيَّامٍ فِي الأُسْبُوعِ، وَهِيَ: الأَحَدُ، وَالإِثْنَيْنِ، وَالثُّلَاثَاءُ، وَالأَرْبِعَاءُ، وَالخَمِيسُ، وَالعُطْلَةُ يَوْمَا الجُمُعَةِ وَالسَّبْتِ. يَدْرُسُ خَالِدٌ أَرْبَعَ مُحَاضَرَاتٍ فِي كُلِّ يَوْمٍ، كُلُّ مُحَاضَرَةٍ سَاعَةٌ وَنِصْفٌ تَقْرِيبًا." +
  "<br>يَخْرُجُ خَالِدٌ مِنْ بَيْتِهِ إِلَى الكُلِّيَّةِ كُلَّ يَوْمٍ السَّاعَةَ السَّابِعَةَ صَبَاحًا، لِأَنَّ دُرُوسَهُ تَبْدَأُ السَّاعَةَ التَّاسِعَةَ وَتَنْتَهِي السَّاعَةَ الخَامِسَةَ بَعْدَ الظُّهْرِ. فِي الجَامِعَةِ أَسَاتِذَةٌ مِنْ جِنْسِيَّاتٍ مُخْتَلِفَةٍ؛ سُورِيَّةٍ، وَبِرِيطَانِيَّةٍ، وَلُبْنَانِيَّةٍ. يَتَعَلَّمُ خَالِدٌ كَيْفَ يُعَالِجُ المَرْضَى، وَيَدْرُسُ المَوَادَّ المُخْتَلِفَةَ فِي تَخَصُّصِهِ بِاللُّغَةِ العَرَبِيَّةِ وَاللُّغَةِ الإِنْكِلِيزِيَّةِ." +
  "<br>فِي الكُلِّيَّةِ مَطْعَمٌ كَبِيرٌ، أَسْعَارُ المَطْعَمِ رَخِيصَةٌ وَمُنَاسِبَةٌ لِلطَّلَبَةِ. يَتَنَاوَلُ الطُّلَّابُ وَجْبَةَ الغَدَاءِ فِي اسْتِرَاحَةِ الظُّهْرِ. وَيُقَدِّمُ المَطْعَمُ وَجَبَاتٍ سَرِيعَةً أَيْضًا. وَفِي الكُلِّيَّةِ مَقْصَفٌ صَغِيرٌ، يَشْرَبُ الطُّلَّابُ فِيهِ الشَّايَ وَالمَشْرُوبَاتِ الأُخْرَى، كَالقَهْوَةِ وَأَنْوَاعِ العَصِيرِ المُخْتَلِفَةِ.";
var METIN_TR = "Hâlid başarılı (üstün) Suriyeli bir öğrencidir; Şam şehrindendir. Şam Üniversitesi Tıp Fakültesinde okuyor; beşinci sınıftadır. Fakültesini çok seviyor ve gelecekte usta bir doktor olmak istiyor." +
  "<br>Üniversitede öğretim yılı yaklaşık Eylül ortasında başlar, Haziran’da biter. Yaz tatili uzun bir tatildir; süresi yaklaşık üç aydır." +
  "<br>Hâlid haftada beş gün okur: pazar, pazartesi, salı, çarşamba ve perşembe; tatil cuma ve cumartesi günleridir. Hâlid her gün dört ders (konferans) dinler; her ders yaklaşık bir buçuk saattir." +
  "<br>Hâlid her gün sabah saat yedide evinden fakülteye çıkar; çünkü dersleri saat dokuzda başlar, öğleden sonra saat beşte biter. Üniversitede farklı uyruklardan hocalar var: Suriyeli, İngiliz ve Lübnanlı. Hâlid hastaları nasıl tedavi edeceğini öğreniyor; uzmanlık alanındaki çeşitli dersleri Arapça ve İngilizce okuyor." +
  "<br>Fakültede büyük bir yemekhane var; fiyatları ucuz ve öğrencilere uygundur. Öğrenciler öğle yemeğini öğle arasında yer. Yemekhane ayrıca hazır (fast food) yemekler de sunar. Fakültede küçük bir kantin de var; öğrenciler orada çay ve kahve, çeşitli meyve suları gibi başka içecekler içer.";
var SOZLUK = [["مُتَفَوِّقٌ", "üstün, başarılı"], ["كُلِّيَّةُ الطِّبِّ", "tıp fakültesi"], ["أَصْبَحَ", "oldu"], ["مَاهِرٌ", "usta, becerikli"], ["المُسْتَقْبَلُ", "gelecek"], ["العَامُ الدِّرَاسِيُّ", "öğretim yılı"], ["مُنْتَصَفٌ", "orta"], ["أَيْلُولُ / حُزَيْرَانُ", "Eylül / Haziran"], ["العُطْلَةُ الصَّيْفِيَّةُ", "yaz tatili"], ["مُدَّةٌ", "süre"], ["مُحَاضَرَةٌ", "ders (konferans)"], ["أُسْتَاذٌ ج أَسَاتِذَةٌ", "hoca"], ["يُعَالِجُ المَرْضَى", "hastaları tedavi eder"], ["مَادَّةٌ ج مَوَادُّ", "ders (konu)"], ["تَخَصُّصٌ", "uzmanlık alanı"], ["أَسْعَارٌ رَخِيصَةٌ", "ucuz fiyatlar"], ["اسْتِرَاحَةٌ", "ara, teneffüs"], ["مَقْصَفٌ", "kantin"]];

var PROG_TEXT = "البَرْنَامَجُ الدِّرَاسِيُّ (نَمُوذَجٌ) · السَّنَةُ: التَّحْضِيرِيَّةُ · العَامُ الدِّرَاسِيُّ: <span dir='ltr' style='font-family:var(--f-body)'>2019–2020</span>." +
  "<br>المُحَاضَرَةُ الأُولَى: <span dir='ltr' style='font-family:var(--f-body)'>9.00–10.30</span> · الاسْتِرَاحَةُ: <span dir='ltr' style='font-family:var(--f-body)'>10.30–11.00</span> · المُحَاضَرَةُ الثَّانِيَةُ: <span dir='ltr' style='font-family:var(--f-body)'>11.00–12.30</span> · اسْتِرَاحَةُ الغَدَاءِ: <span dir='ltr' style='font-family:var(--f-body)'>12.30–13.30</span> · المُحَاضَرَةُ الثَّالِثَةُ: <span dir='ltr' style='font-family:var(--f-body)'>13.30–15.00</span>." +
  "<br>" + GUN.map(function (g, i) { return g[0] + ": " + PROG[i].map(function (d) { return DERS[d][0]; }).join("، "); }).join("<br>") +
  "<br>رَئِيسُ قِسْمِ اللُّغَةِ العَرَبِيَّةِ: أ.د خَلِيل إِبْرَاهِيم قَجَّار · مُنَسِّقُ السَّنَةِ التَّحْضِيرِيَّةِ: أ. مَحْمُود سَامِي كَنْبَاش";
var PROG_TR = "Örnek ders programı (hazırlık sınıfı, 2019–2020). 1. ders 9.00–10.30 · ara 10.30–11.00 · 2. ders 11.00–12.30 · öğle arası 12.30–13.30 · 3. ders 13.30–15.00. " +
  GUN.map(function (g, i) { return g[1] + ": " + PROG[i].map(function (d) { return DERS[d][1]; }).join(", "); }).join(" · ") +
  ". Bölüm başkanı: Prof. Dr. Halil İbrahim Kaccar · Hazırlık sınıfı koordinatörü: Mahmud Sami Kenbaş.";

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "cerr", "nasb"],
  goals: ["Okumadan önce kendi okulunu düşünmek: ne okuyorsun, kaç gün, günde kaç ders", "Hâlid’in üniversite hayatını anlatan metni durmadan okumak ve dinlemek", "Üniversite, zaman ve ders kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "يَدْرُسُ خَالِدٌ:- / فِي كُلِّيَّةِ الطِّبِّ،:mz / هُوَ فِي:- / السَّنَةِ الخَامِسَةِ.:nasb", tr: "Hâlid tıp fakültesinde okuyor, beşinci sınıfta.", pair: "يُرِيدُ أَنْ:mi.Fiil / يُصْبِحَ طَبِيبًا مَاهِرًا.:nasb", pairTr: "Usta bir doktor olmak istiyor." },
    { s: "يَبْدَأُ العَامُ الدِّرَاسِيُّ:- / فِي مُنْتَصَفِ أَيْلُولَ:cerr / وَيَنْتَهِي:- / فِي حُزَيْرَانَ.:cerr", tr: "Öğretim yılı Eylül ortasında başlar, Haziran’da biter." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> Şamlı Hâlid tıp fakültesinin 5. sınıfında okuyor. Öğretim yılı (Eylül–Haziran), haftası (5 gün), günü (4 ders, 9.00–17.00), hocaları, öğrendikleri, fakültenin yemekhanesi ve kantini anlatılıyor." },
    { tr: "<b>Kalıplar:</b><br>• <span class=\"ar\">يُرِيدُ أَنْ يُصْبِحَ…</span> … olmak istiyor · <span class=\"ar\">يَتَعَلَّمُ كَيْفَ…</span> nasıl … öğreniyor<br>• <span class=\"ar\">يَبْدَأُ… وَيَنْتَهِي…</span> başlar… ve biter… · <span class=\"ar\">مُدَّتُهَا…</span> süresi…<br>• <span class=\"ar\">لِأَنَّ…</span> çünkü… · <span class=\"ar\">كَـ…</span> … gibi (<span class=\"ar\">كَالقَهْوَةِ</span>)" },
    { tr: "<b>Ay adları:</b> Metindeki <span class=\"ar\">أَيْلُولُ</span> (Eylül) ve <span class=\"ar\">حُزَيْرَانُ</span> (Haziran) Suriye–Irak–Ürdün’de kullanılan Süryanî kökenli ay adlarıdır. Mısır ve Körfez’de <span class=\"ar\">سِبْتَمْبِر، يُونْيُو</span> denir." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَاذَا تَدْرُسُ / تَدْرُسِينَ فِي الجَامِعَةِ؟ كَمْ يَوْمًا تَدْرُسُ / تَدْرُسِينَ فِي الجَامِعَةِ؟ كَمْ مُحَاضَرَةً تَدْرُسُ / تَدْرُسِينَ فِي اليَوْمِ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "الدِّرَاسَةُ فِي الجَامِعَةِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَاذَا تَدْرُسُ / تَدْرُسِينَ فِي الجَامِعَةِ؟", a: "أَدْرُسُ اللُّغَةَ العَرَبِيَّةَ فِي السَّنَةِ التَّحْضِيرِيَّةِ.", tr: "Üniversitede ne okuyorsun? (Örnek cevap) Hazırlık sınıfında Arapça okuyorum." },
        { q: "كَمْ يَوْمًا تَدْرُسُ / تَدْرُسِينَ فِي الجَامِعَةِ؟", a: "أَدْرُسُ خَمْسَةَ أَيَّامٍ فِي الأُسْبُوعِ.", tr: "Üniversitede kaç gün okuyorsun? Haftada beş gün." },
        { q: "كَمْ مُحَاضَرَةً تَدْرُسُ / تَدْرُسِينَ فِي اليَوْمِ؟", a: "أَدْرُسُ ثَلَاثَ مُحَاضَرَاتٍ فِي اليَوْمِ.", tr: "Günde kaç ders görüyorsun? Günde üç ders." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "خَالِدٌ طَالِبٌ لُبْنَانِيٌّ.", a: "y", why: "Suriyeli: طَالِبٌ سُورِيٌّ." },
        { s: "يَدْرُسُ خَالِدٌ فِي كُلِّيَّةِ الطِّبِّ.", a: "d", why: "فِي جَامِعَةِ دِمَشْقَ فِي كُلِّيَّةِ الطِّبِّ." },
        { s: "يُرِيدُ خَالِدٌ أَنْ يُصْبِحَ مُهَنْدِسًا.", a: "y", why: "Doktor olmak istiyor: طَبِيبًا مَاهِرًا." },
        { s: "يَبْدَأُ العَامُ الدِّرَاسِيُّ فِي أَيْلُولَ.", a: "d", why: "فِي مُنْتَصَفِ شَهْرِ أَيْلُولَ تَقْرِيبًا." },
        { s: "العُطْلَةُ الصَّيْفِيَّةُ قَصِيرَةٌ.", a: "y", why: "Uzun: عُطْلَةٌ طَوِيلَةٌ، مُدَّتُهَا ثَلَاثَةُ أَشْهُرٍ." },
        { s: "يَوْمَا العُطْلَةِ الجُمُعَةُ وَالسَّبْتُ.", a: "d", why: "وَالعُطْلَةُ يَوْمَا الجُمُعَةِ وَالسَّبْتِ." },
        { s: "كُلُّ مُحَاضَرَةٍ سَاعَةٌ وَنِصْفٌ تَقْرِيبًا.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَخْرُجُ خَالِدٌ مِنْ بَيْتِهِ السَّاعَةَ التَّاسِعَةَ.", a: "y", why: "Saat yedide çıkar; dersleri dokuzda başlar." },
        { s: "تَنْتَهِي دُرُوسُ خَالِدٍ السَّاعَةَ الخَامِسَةَ بَعْدَ الظُّهْرِ.", a: "d", why: "وَتَنْتَهِي السَّاعَةَ الخَامِسَةَ بَعْدَ الظُّهْرِ." },
        { s: "كُلُّ أَسَاتِذَةِ الجَامِعَةِ سُورِيُّونَ.", a: "y", why: "Farklı uyruklardan: سُورِيَّةٍ، وَبِرِيطَانِيَّةٍ، وَلُبْنَانِيَّةٍ." },
        { s: "أَسْعَارُ المَطْعَمِ غَالِيَةٌ.", a: "y", why: "Ucuz: رَخِيصَةٌ وَمُنَاسِبَةٌ لِلطَّلَبَةِ." },
        { s: "فِي الكُلِّيَّةِ مَقْصَفٌ صَغِيرٌ.", a: "d", why: "وَفِي الكُلِّيَّةِ مَقْصَفٌ صَغِيرٌ." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("خَالِدٌ طَالِبٌ سُورِيٌّ مُتَفَوِّقٌ", "مُتَفَوِّقٌ"), "üstün, başarılı", "tembel", "yeni", "Hâlid başarılı bir öğrenci.", "= مُجْتَهِدٌ; zıddı كَسُولٌ."],
      [HL("يُرِيدُ أَنْ يُصْبِحَ طَبِيبًا", "يُصْبِحَ"), "olmak", "çalışmak", "okumak", "Doktor olmak istiyor.", "أَصْبَحَ: oldu."],
      [HL("طَبِيبًا مَاهِرًا", "مَاهِرًا"), "usta, becerikli", "yaşlı", "zengin", "Usta bir doktor.", "مَهَارَةٌ: beceri."],
      [HL("فِي المُسْتَقْبَلِ", "المُسْتَقْبَلِ"), "gelecek", "geçmiş", "hastane", "Gelecekte.", "Zıddı: المَاضِي."],
      [HL("فِي مُنْتَصَفِ شَهْرِ أَيْلُولَ", "مُنْتَصَفِ"), "ortası", "başı", "sonu", "Eylül ayının ortasında.", "نِصْفٌ: yarım."],
      [HL("مُدَّتُهَا ثَلَاثَةُ أَشْهُرٍ", "مُدَّتُهَا"), "süresi", "fiyatı", "yeri", "Süresi üç ay.", "= وَقْتٌ"],
      [HL("أَرْبَعَ مُحَاضَرَاتٍ", "مُحَاضَرَاتٍ"), "ders, konferans", "sınav", "fakülte", "Dört ders.", "Tekili: مُحَاضَرَةٌ."],
      [HL("كَيْفَ يُعَالِجُ المَرْضَى", "يُعَالِجُ"), "tedavi eder", "ziyaret eder", "sorar", "Hastaları nasıl tedavi eder.", "= يُدَاوِي"],
      [HL("فِي تَخَصُّصِهِ", "تَخَصُّصِهِ"), "uzmanlık alanı", "evi", "sınıfı", "Uzmanlık alanında.", "مُتَخَصِّصٌ: uzman."],
      [HL("أَسْعَارُ المَطْعَمِ رَخِيصَةٌ", "أَسْعَارُ"), "fiyatlar", "yemekler", "masalar", "Yemekhanenin fiyatları ucuz.", "Tekili: سِعْرٌ."],
      [HL("فِي اسْتِرَاحَةِ الظُّهْرِ", "اسْتِرَاحَةِ"), "ara, mola", "namaz", "ders", "Öğle arasında.", "رَاحَةٌ: dinlenme."],
      [HL("وَفِي الكُلِّيَّةِ مَقْصَفٌ", "مَقْصَفٌ"), "kantin", "kütüphane", "bahçe", "Fakültede bir kantin var.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama", short: "Anlama", col: "nasb", legend: ["mz", "cerr", "nasb"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "Cümle başlarını uygun devamlarıyla eşleştirmek", "Verilen cevaba uygun soruyu sormak"],
  examples: [
    { s: "كَمْ:cerr.Soru / يَوْمًا يَدْرُسُ خَالِدٌ فِي الأُسْبُوعِ؟:-", tr: "Hâlid haftada kaç gün okuyor?", pair: "يَدْرُسُ:- / خَمْسَةَ أَيَّامٍ.:nasb", pairTr: "Beş gün okuyor." },
    { s: "كَيْفَ:cerr.Soru / الأَسْعَارُ فِي المَطْعَمِ؟:-", tr: "Yemekhanede fiyatlar nasıl?", pair: "رَخِيصَةٌ:ref / وَمُنَاسِبَةٌ.:ref", pairTr: "Ucuz ve uygun." }
  ],
  rules: [
    { tr: "<b>Soru kelimeleri:</b> <span class=\"ar\">مَاذَا</span> ne? · <span class=\"ar\">مَتَى</span> ne zaman? · <span class=\"ar\">كَمْ</span> kaç? (<span class=\"ar\">كَمْ يَوْمًا، كَمْ طَالِبًا</span>) · <span class=\"ar\">كَيْفَ</span> nasıl? · <span class=\"ar\">أَيْنَ</span> nerede?" },
    { tr: "<b>Cevaba uygun soru:</b> cevaptaki öğeyi soru kelimesine çevir, fiili muhataba göre değiştir: <span class=\"ar\">أَنَا أَدْرُسُ فِي كُلِّيَّةِ الإِلَهِيَّاتِ ← أَيْنَ تَدْرُسُ؟</span> · <span class=\"ar\">هِيَ تَدْرُسُ التَّارِيخَ ← مَاذَا تَدْرُسُ؟</span>" },
    { tr: "<b>Kitapla metin farkı:</b> Kitaptaki 3. etkinlikte <span class=\"ar\">خَمْسَ مُحَاضَرَاتٍ</span> yazıyor; metinde ise Hâlid her gün <span class=\"ar\">أَرْبَعَ مُحَاضَرَاتٍ</span> okuyor. Eşleştirmede kitaptaki ifade kullanıldı." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَاذَا يَدْرُسُ خَالِدٌ؟ مَتَى يَبْدَأُ العَامُ الدِّرَاسِيُّ؟ كَمْ يَوْمًا يَدْرُسُ خَالِدٌ فِي الأُسْبُوعِ؟ مَاذَا يَشْرَبُ الطُّلَّابُ فِي مَقْصَفِ الكُلِّيَّةِ؟ كَيْفَ الأَسْعَارُ فِي مَطْعَمِ الكُلِّيَّةِ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ. ٣ ـ صِلْ بَيْنَ (أ) وَمَا يُنَاسِبُهَا فِي (ب). ٩ ـ اكْتُبْ أَسْئِلَةً لِلْجُمَلِ الآتِيَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مَاذَا يَدْرُسُ خَالِدٌ؟", "يَدْرُسُ الطِّبَّ فِي جَامِعَةِ دِمَشْقَ.", "يَدْرُسُ اللُّغَةَ الإِنْكِلِيزِيَّةَ فَقَطْ.", "يَدْرُسُ الهَنْدَسَةَ.", "Hâlid ne okuyor? Şam Üniversitesinde tıp.", "فِي كُلِّيَّةِ الطِّبِّ."],
      ["مَتَى يَبْدَأُ العَامُ الدِّرَاسِيُّ؟", "فِي مُنْتَصَفِ شَهْرِ أَيْلُولَ تَقْرِيبًا.", "فِي شَهْرِ حُزَيْرَانَ.", "فِي بِدَايَةِ الصَّيْفِ.", "Öğretim yılı ne zaman başlar? Yaklaşık Eylül ortasında.", "Haziran’da biter."],
      ["كَمْ يَوْمًا يَدْرُسُ خَالِدٌ فِي الأُسْبُوعِ؟", "خَمْسَةَ أَيَّامٍ.", "أَرْبَعَةَ أَيَّامٍ.", "سِتَّةَ أَيَّامٍ.", "Haftada kaç gün? Beş.", "Dört, günlük ders sayısı."],
      ["مَاذَا يَشْرَبُ الطُّلَّابُ فِي مَقْصَفِ الكُلِّيَّةِ؟", "الشَّايَ وَالقَهْوَةَ وَأَنْوَاعَ العَصِيرِ.", "اللَّبَنَ فَقَطْ.", "المَاءَ فَقَطْ.", "Kantinde ne içerler? Çay, kahve ve çeşitli meyve suları.", ""],
      ["كَيْفَ الأَسْعَارُ فِي مَطْعَمِ الكُلِّيَّةِ؟", "رَخِيصَةٌ وَمُنَاسِبَةٌ لِلطَّلَبَةِ.", "غَالِيَةٌ جِدًّا.", "غَالِيَةٌ وَغَيْرُ مُنَاسِبَةٍ.", "Yemekhanede fiyatlar nasıl? Ucuz ve uygun.", ""]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)? Düzeltmeleri bir sonraki alıştırmada.", items: CL([
      ["خَالِدٌ فِي السَّنَةِ الرَّابِعَةِ.", "y", "Beşinci sınıfta: فِي السَّنَةِ الخَامِسَةِ."],
      ["تَنْتَهِي السَّنَةُ الدِّرَاسِيَّةُ فِي شَهْرِ حُزَيْرَانَ.", "d", "وَيَنْتَهِي فِي شَهْرِ حُزَيْرَانَ."],
      ["الدِّرَاسَةُ فِي كُلِّيَّةِ خَالِدٍ بِاللُّغَةِ العَرَبِيَّةِ فَقَطْ.", "y", "Arapça ve İngilizce: بِاللُّغَةِ العَرَبِيَّةِ وَاللُّغَةِ الإِنْكِلِيزِيَّةِ."],
      ["يُقَدِّمُ المَقْصَفُ وَجَبَاتٍ سَرِيعَةً لِلطُّلَّابِ.", "y", "Hazır yemekleri yemekhane (المَطْعَمُ) sunar; kantinde içecekler var."],
      ["العُطْلَةُ الصَّيْفِيَّةُ أَرْبَعَةُ أَشْهُرٍ.", "y", "Üç ay: ثَلَاثَةُ أَشْهُرٍ تَقْرِيبًا."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["خَالِدٌ فِي السَّنَةِ الرَّابِعَةِ. ✗", "خَالِدٌ فِي السَّنَةِ الخَامِسَةِ.", "خَالِدٌ فِي السَّنَةِ الأُولَى.", "خَالِدٌ فِي السَّنَةِ الثَّالِثَةِ.", "Hâlid beşinci sınıfta.", ""],
      ["الدِّرَاسَةُ بِاللُّغَةِ العَرَبِيَّةِ فَقَطْ. ✗", "الدِّرَاسَةُ بِاللُّغَةِ العَرَبِيَّةِ وَاللُّغَةِ الإِنْكِلِيزِيَّةِ.", "الدِّرَاسَةُ بِاللُّغَةِ الإِنْكِلِيزِيَّةِ فَقَطْ.", "الدِّرَاسَةُ بِاللُّغَةِ الفَرَنْسِيَّةِ.", "Öğretim Arapça ve İngilizce.", "فَقَطْ: sadece."],
      ["يُقَدِّمُ المَقْصَفُ وَجَبَاتٍ سَرِيعَةً. ✗", "يُقَدِّمُ المَطْعَمُ وَجَبَاتٍ سَرِيعَةً.", "يُقَدِّمُ المَقْصَفُ وَجَبَاتِ الغَدَاءِ.", "لَا يُقَدِّمُ أَحَدٌ وَجَبَاتٍ سَرِيعَةً.", "Hazır yemekleri yemekhane sunar.", "وَيُقَدِّمُ المَطْعَمُ وَجَبَاتٍ سَرِيعَةً أَيْضًا."],
      ["العُطْلَةُ الصَّيْفِيَّةُ أَرْبَعَةُ أَشْهُرٍ. ✗", "العُطْلَةُ الصَّيْفِيَّةُ ثَلَاثَةُ أَشْهُرٍ تَقْرِيبًا.", "العُطْلَةُ الصَّيْفِيَّةُ شَهْرٌ وَاحِدٌ.", "العُطْلَةُ الصَّيْفِيَّةُ أُسْبُوعَانِ.", "Yaz tatili yaklaşık üç ay.", ""]
    ])},
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ (أ) وَمَا يُنَاسِبُهَا فِي (ب)", tr: "Önce aşağıdan (ب) devamı seç, sonra (أ) cümle başının kutusuna dokun.", bank: ["أَنْوَاعَ العَصِيرِ المُخْتَلِفَةِ", "مِنْ جِنْسِيَّاتٍ مُخْتَلِفَةٍ", "يُصْبِحَ طَبِيبًا مَشْهُورًا", "رَخِيصَةٌ وَمُنَاسِبَةٌ لِلطُّلَّابِ", "خَمْسَ مُحَاضَرَاتٍ"], items: [
      { pre: "يُرِيدُ خَالِدٌ أَنْ", a: [2], tr: "Hâlid ünlü bir doktor olmak istiyor." },
      { pre: "أَسْعَارُ المَطْعَمِ", a: [3], tr: "Yemekhanenin fiyatları öğrenciler için ucuz ve uygun." },
      { pre: "الأَسَاتِذَةُ فِي الجَامِعَةِ", a: [1], tr: "Üniversitedeki hocalar farklı uyruklardan." },
      { pre: "يَدْرُسُ خَالِدٌ كُلَّ يَوْمٍ", a: [4], tr: "Hâlid her gün … ders okuyor. (Kitapta beş; metinde dört.)" },
      { pre: "يَشْرَبُ الطُّلَّابُ", a: [0], tr: "Öğrenciler çeşitli meyve suları içer." }
    ]},
    { type: "pick", fill: true, num: "٩", ar: "اكْتُبْ أَسْئِلَةً لِلْجُمَلِ الآتِيَةِ", tr: "Cevaba uygun soruyu seç.", items: PL([
      ["___ ← هِيَ تَدْرُسُ التَّارِيخَ.", "مَاذَا تَدْرُسُ؟", "أَيْنَ تَدْرُسُ؟", "مَتَى تَدْرُسُ؟", "Ne okuyor (kadın)? — Tarih okuyor.", "Nesne: مَاذَا."],
      ["___ ← أَنَا أَدْرُسُ فِي كُلِّيَّةِ الإِلَهِيَّاتِ.", "أَيْنَ تَدْرُسُ؟", "مَاذَا تَدْرُسُ؟", "كَمْ يَوْمًا تَدْرُسُ؟", "Nerede okuyorsun? — İlahiyat fakültesinde.", "Yer: أَيْنَ; أَدْرُسُ ← تَدْرُسُ."],
      ["___ ← فِي صَفِّنَا خَمْسَةَ عَشَرَ طَالِبًا.", "كَمْ طَالِبًا فِي صَفِّكُمْ؟", "أَيْنَ صَفُّكُمْ؟", "مَنْ فِي صَفِّكُمْ؟", "Sınıfınızda kaç öğrenci var? — On beş.", "Sayı: كَمْ + tekil mansûb (طَالِبًا); صَفِّنَا ← صَفِّكُمْ."],
      ["___ ← أَتَنَاوَلُ الغَدَاءَ فِي اسْتِرَاحَةِ الظُّهْرِ.", "مَتَى تَتَنَاوَلُ الغَدَاءَ؟", "مَاذَا تَتَنَاوَلُ؟", "كَيْفَ الغَدَاءُ؟", "Öğle yemeğini ne zaman yersin? — Öğle arasında.", "Zaman: مَتَى."],
      ["___ ← يَشْرَبُ الطُّلَّابُ الشَّايَ فِي المَقْصَفِ.", "مَاذَا يَشْرَبُ الطُّلَّابُ فِي المَقْصَفِ؟", "كَمْ طَالِبًا فِي المَقْصَفِ؟", "مَتَى يَشْرَبُ الطُّلَّابُ؟", "Öğrenciler kantinde ne içer? — Çay.", "أَيْنَ يَشْرَبُ الطُّلَّابُ الشَّايَ؟ sorusu da olur."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Eş, Zıt, Çoğul", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Zaman ifadeleriyle boşluk doldurmak: مُبَكِّرٌ، مُتَأَخِّرٌ، يَبْدَأُ، يَنْتَهِي", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek", "Tekilleri çoğullarıyla eşleştirmek"],
  examples: [
    { s: "مُتَفَوِّقٌ:mz.Kelime / = مُجْتَهِدٌ:nasb.Eş", tr: "başarılı = çalışkan", pair: "يُعَالِجُ:mz.Kelime / = يُدَاوِي:nasb.Eş", pairTr: "tedavi eder = tedavi eder" },
    { s: "تَبْدَأُ:mz.Kelime / ≠ تَنْتَهِي:cerr.Zıt", tr: "başlar ≠ biter", pair: "غَالِيَةٌ:mz.Kelime / ≠ رَخِيصَةٌ:cerr.Zıt", pairTr: "pahalı ≠ ucuz" }
  ],
  rules: [
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">مُتَفَوِّقٌ = مُجْتَهِدٌ · العُطْلَةُ = الإِجَازَةُ · مُدَّةٌ = وَقْتٌ · أُسْتَاذٌ = مُعَلِّمٌ · يُعَالِجُ = يُدَاوِي</span>" },
    { tr: "<b>Zıt anlam:</b> <span class=\"ar\">يُحِبُّ ≠ يَكْرَهُ · مُتَفَوِّقٌ ≠ كَسُولٌ · كَثِيرًا ≠ قَلِيلًا · طَوِيلَةٌ ≠ قَصِيرَةٌ · يَخْرُجُ ≠ يَدْخُلُ · تَبْدَأُ ≠ تَنْتَهِي · مُخْتَلِفَةٌ ≠ مُتَشَابِهَةٌ · كَبِيرٌ ≠ صَغِيرٌ · غَالِيَةٌ ≠ رَخِيصَةٌ</span>" },
    { tr: "<b>Çoğul:</b> <span class=\"ar\">شَهْرٌ ← شُهُورٌ، أَشْهُرٌ · مَرْحَلَةٌ ← مَرَاحِلُ · سَنَةٌ ← سَنَوَاتٌ · طَالِبٌ ← طُلَّابٌ · جَامِعَةٌ ← جَامِعَاتٌ</span>. Metinde ayrıca <span class=\"ar\">طَلَبَةٌ</span> (öğrenciler) ve <span class=\"ar\">أَسَاتِذَةٌ</span> geçer." },
    { tr: "<b>Zaman sözleri:</b> <span class=\"ar\">الوَقْتُ مُبَكِّرٌ</span> vakit erken · <span class=\"ar\">الوَقْتُ مُتَأَخِّرٌ</span> vakit geç · <span class=\"ar\">كَمِ السَّاعَةُ؟</span> saat kaç? · <span class=\"ar\">يَجِبُ أَنْ…</span> …-meli · <span class=\"ar\">نَسْتَيْقِظُ</span> uyanırız." }
  ],
  kaide: ["٤ ـ امْلَإِ الفَرَاغَاتِ بِالكَلِمَاتِ المُنَاسِبَةِ: (مُبَكِّرٌ، مُتَأَخِّرٌ، مَسَاءٌ، نَسْتَيْقِظَ، يَبْدَأُ، يَجِبُ، كَمْ، يَنْتَهِي).", "٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا. ٦ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا. ٧ ـ صِلْ بَيْنَ المُفْرَدِ وَالجَمْعِ المُنَاسِبِ."],
  ex: [
    { type: "bank", num: "٤", ar: "امْلَإِ الفَرَاغَاتِ بِالكَلِمَاتِ المُنَاسِبَةِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Bir kelime artar.", bank: ["مُبَكِّرٌ", "مُتَأَخِّرٌ", "مَسَاءٌ", "نَسْتَيْقِظَ", "يَبْدَأُ", "يَجِبُ", "كَمْ", "يَنْتَهِي"],
      tr2: "1) Saat şimdi sabahın beşi, vakit çok erken. 2) Yarın üniversiteye gideceğiz, erken uyanmalıyız. 3) Ders günü sabah dokuzda başlar ve öğleden sonra üçte biter. 4) Uyuman gerek, vakit geç. 5) Saat kaç? Saat şimdi sekiz.",
      parts: ["١ ـ السَّاعَةُ الآنَ الخَامِسَةُ صَبَاحًا، الوَقْتُ", { a: [0] }, "جِدًّا.<br>٢ ـ سَنَذْهَبُ إِلَى الجَامِعَةِ غَدًا، يَجِبُ أَنْ", { a: [3] }, "مُبَكِّرًا.<br>٣ ـ", { a: [4] }, "اليَوْمُ الدِّرَاسِيُّ السَّاعَةَ التَّاسِعَةَ صَبَاحًا، وَ", { a: [7] }, "السَّاعَةَ الثَّالِثَةَ ظُهْرًا.<br>٤ ـ", { a: [5] }, "أَنْ تَنَامَ، الوَقْتُ", { a: [1] }, ".<br>٥ ـ", { a: [6] }, "السَّاعَةُ؟ السَّاعَةُ الآنَ الثَّامِنَةُ."] },
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["يُدَاوِي", "مُعَلِّمٌ", "مُجْتَهِدٌ", "وَقْتٌ", "الإِجَازَةُ"], items: [
      { pre: "مُتَفَوِّقٌ =", a: [2], tr: "başarılı = çalışkan" }, { pre: "العُطْلَةُ =", a: [4], tr: "tatil = izin, tatil" }, { pre: "مُدَّةٌ =", a: [3], tr: "süre = vakit" }, { pre: "أُسْتَاذٌ =", a: [1], tr: "hoca = öğretmen" }, { pre: "يُعَالِجُ =", a: [0], tr: "tedavi eder = tedavi eder" }
    ]},
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["تَنْتَهِي", "رَخِيصَةٌ", "يَدْخُلُ", "كَسُولٌ", "يَكْرَهُ", "مُتَشَابِهَةٌ", "قَلِيلًا", "قَصِيرَةٌ", "صَغِيرٌ"], items: [
      { pre: "يُحِبُّ ≠", a: [4], tr: "sever ≠ nefret eder" }, { pre: "مُتَفَوِّقٌ ≠", a: [3], tr: "başarılı ≠ tembel" }, { pre: "كَثِيرًا ≠", a: [6], tr: "çok ≠ az" }, { pre: "طَوِيلَةٌ ≠", a: [7], tr: "uzun ≠ kısa" }, { pre: "يَخْرُجُ ≠", a: [2], tr: "çıkar ≠ girer" },
      { pre: "تَبْدَأُ ≠", a: [0], tr: "başlar ≠ biter" }, { pre: "مُخْتَلِفَةٌ ≠", a: [5], tr: "farklı ≠ benzer" }, { pre: "كَبِيرٌ ≠", a: [8], tr: "büyük ≠ küçük" }, { pre: "غَالِيَةٌ ≠", a: [1], tr: "pahalı ≠ ucuz" }
    ]},
    { type: "bank", num: "٧", ar: "صِلْ بَيْنَ المُفْرَدِ وَالجَمْعِ المُنَاسِبِ", tr: "Önce aşağıdan çoğulu seç, sonra tekilin kutusuna dokun.", bank: ["سَنَوَاتٌ", "شُهُورٌ، أَشْهُرٌ", "جَامِعَاتٌ", "مَرَاحِلُ", "طُلَّابٌ"], items: [
      { pre: "شَهْرٌ ←", a: [1], tr: "ay → aylar (فُعُولٌ / أَفْعُلٌ)" }, { pre: "مَرْحَلَةٌ ←", a: [3], tr: "aşama → aşamalar (مَفَاعِلُ)" }, { pre: "سَنَةٌ ←", a: [0], tr: "yıl → yıllar (ـَاتٌ)" }, { pre: "طَالِبٌ ←", a: [4], tr: "öğrenci → öğrenciler (فُعَّالٌ)" }, { pre: "جَامِعَةٌ ←", a: [2], tr: "üniversite → üniversiteler (ـَاتٌ)" }
    ]},
    { type: "pick", fill: true, extra: true, ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ مِنَ النَّصِّ", tr: "Metindeki kelimenin çoğulunu seç.", items: PL([
      ["أُسْتَاذٌ ← ___", "أَسَاتِذَةٌ", "أُسْتَاذُونَ", "أُسُوتٌ", "hoca → hocalar", "Metinde: أَسَاتِذَةٌ."],
      ["مُحَاضَرَةٌ ← ___", "مُحَاضَرَاتٌ", "مَحَاضِرُ", "مُحَاضِرُونَ", "ders → dersler", "مُحَاضِرُونَ: ders veren hocalar."],
      ["يَوْمٌ ← ___", "أَيَّامٌ", "يَوْمَاتٌ", "أَيْوَامٌ", "gün → günler", "خَمْسَةَ أَيَّامٍ."],
      ["مَادَّةٌ ← ___", "مَوَادُّ", "مَادَّاتٌ", "مُدُودٌ", "ders (konu) → dersler", "فَوَاعِلُ kalıbı (مَوَادِدُ → مَوَادُّ)."],
      ["مَرِيضٌ ← ___", "مَرْضَى", "مُرَضَاءُ", "مَرِيضُونَ", "hasta → hastalar", "فَعْلَى kalıbı: يُعَالِجُ المَرْضَى."],
      ["سِعْرٌ ← ___", "أَسْعَارٌ", "سُعُورٌ", "سِعْرَاتٌ", "fiyat → fiyatlar", "أَفْعَالٌ kalıbı."],
      ["دَرْسٌ ← ___", "دُرُوسٌ", "أَدْرَاسٌ", "دَرَسَاتٌ", "ders → dersler", "فُعُولٌ kalıbı."],
      ["جِنْسِيَّةٌ ← ___", "جِنْسِيَّاتٌ", "أَجْنَاسٌ", "جَنَائِسُ", "uyruk → uyruklar", "أَجْنَاسٌ, جِنْسٌ’in çoğulu."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE
{
  id: "u4", no: 4, ar: "حُرُوفُ الجَرِّ وَتَكْوِينُ الجُمَلِ", tr: "Harf-i Cer, Cümle Kurma ve “Ki” (أَنْ)", short: "Cümle", col: "ref", legend: ["mi", "nasb"],
  goals: ["Cümleye uygun harf-i ceri koymak: إِلَى، فِي، مِنْ، عَلَى", "Karışık kelimelerden anlamlı cümle kurmak", "“أُرِيدُ أَنْ… / لَا أُرِيدُ أَنْ…” ile cümle kurmak", "Yeni kelimeleri doğru cümlede kullanmak"],
  examples: [
    { s: "أُرِيدُ:mi.Fiil / أَنْ:- / أَكُونَ:mi.Mansûb / مُهَنْدِسًا.:nasb", tr: "Mühendis olmak istiyorum.", pair: "لَا أُرِيدُ:mi.Fiil / أَنْ:- / أَنَامَ:mi.Mansûb / مُتَأَخِّرًا.:nasb", pairTr: "Geç uyumak istemiyorum." },
    { s: "دَخَلْتُ:mi / إِلَى:- / الصَّفِّ:nasb.Mecrûr", tr: "Sınıfa girdim.", pair: "خَرَجَ المُعَلِّمُ:mi / مِنَ:- / الصَّفِّ:nasb.Mecrûr", pairTr: "Öğretmen sınıftan çıktı." }
  ],
  rules: [
    { tr: "<b>أَنْ + muzâri:</b> <span class=\"ar\">أَنْ</span> (ki, -mek) kendinden sonraki muzâri fiili <b>mansûb</b> yapar: sondaki ötre üstün olur. <span class=\"ar\">أَكُونُ ← أُرِيدُ أَنْ أَكُونَ · يُصْبِحُ ← يُرِيدُ أَنْ يُصْبِحَ · نَسْتَيْقِظُ ← يَجِبُ أَنْ نَسْتَيْقِظَ</span>." },
    { tr: "<b>Kalıplar:</b> <span class=\"ar\">أُرِيدُ أَنْ…</span> …mek istiyorum · <span class=\"ar\">لَا أُرِيدُ أَنْ…</span> …mek istemiyorum · <span class=\"ar\">أُحِبُّ أَنْ…</span> …meyi severim · <span class=\"ar\">يَجِبُ أَنْ…</span> …meli." },
    { tr: "<b>Harf-i cerler:</b> <span class=\"ar\">جَلَسَ عَلَى</span> …-e oturdu · <span class=\"ar\">دَخَلَ إِلَى</span> …-e girdi · <span class=\"ar\">خَرَجَ مِنْ</span> …-den çıktı · <span class=\"ar\">فِي الأُسْبُوعِ</span> haftada · <span class=\"ar\">مِنْ جِنْسِيَّاتٍ</span> … uyruklardan. Sonraki isim mecrûr olur." }
  ],
  kaide: ["٨ ـ امْلَإِ الفَرَاغَاتِ بِحَرْفِ الجَرِّ المُنَاسِبِ: (إِلَى، فِي، مِنْ، عَلَى، مِنْ). ١٠ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً.", "١١ ـ اكْتُبْ أَرْبَعَ جُمَلٍ مُسْتَخْدِمًا “أُرِيدُ أَنْ…” وَ“لَا أُرِيدُ أَنْ…”. ١٢ ـ اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ: اللُّغَةُ، الجَامِعَةُ، المُدَرِّسُ، يَبْدَأُ، يَنْتَهِي."],
  ex: [
    { type: "bank", num: "٨", reuse: true, ar: "امْلَإِ الفَرَاغَاتِ بِحَرْفِ الجَرِّ المُنَاسِبِ", tr: "Önce aşağıdan harf-i ceri seç, sonra boşluğa dokun. مِنْ iki kez kullanılır.", bank: ["إِلَى", "فِي", "مِنْ", "عَلَى"],
      tr2: "1) Öğrenciler sandalyelere oturdu. 2) Sınıfa girdim. 3) Arapça haftada dört ders saati. 4) Öğretmen sınıftan çıktı. 5) Fakültemizde farklı uyruklardan hocalar var.",
      parts: ["١ ـ جَلَسَ الطُّلَّابُ", { a: [3] }, "الكَرَاسِيِّ.<br>٢ ـ دَخَلْتُ", { a: [0] }, "الصَّفِّ.<br>٣ ـ اللُّغَةُ العَرَبِيَّةُ أَرْبَعُ حِصَصٍ", { a: [1] }, "الأُسْبُوعِ.<br>٤ ـ خَرَجَ المُعَلِّمُ", { a: [2] }, "الصَّفِّ.<br>٥ ـ فِي كُلِّيَّتِنَا أَسَاتِذَةٌ", { a: [2] }, "جِنْسِيَّاتٍ مُخْتَلِفَةٍ."] },
    { type: "bank", num: "١٠", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["اللُّغَةَ", "العَرَبِيَّةَ", "فِي", "كُلِّيَّةِ", "الإِلَهِيَّاتِ", "صَفِّي", "عَشَرَةُ", "طُلَّابٍ", "أَنْ", "أَكُونَ", "مُهَنْدِسًا", "طَالِبٌ", "اللُّغَةِ", "العَرَبِيَّةِ"],
      tr2: "1) İlahiyat fakültesinde Arapça okuyorum. 2) Sınıfımda on öğrenci var. 3) Mühendis olmak istiyorum. 4) Ben Arapça fakültesinde öğrenciyim.",
      parts: ["١ ـ أَدْرُسُ", { a: [0] }, { a: [1] }, { a: [2] }, { a: [3] }, { a: [4] }, ".<br>٢ ـ فِي", { a: [5] }, { a: [6] }, { a: [7] }, ".<br>٣ ـ أُرِيدُ", { a: [8] }, { a: [9] }, { a: [10] }, ".<br>٤ ـ أَنَا", { a: [11] }, { a: [2] }, { a: [3] }, { a: [12] }, { a: [13] }, "."] },
    { type: "pick", fill: true, num: "١١", ar: "أُرِيدُ أَنْ… وَلَا أُرِيدُ أَنْ…", tr: "أَنْ’den sonra fiilin doğru (mansûb) biçimini seç; sonra defterine kendi dört cümleni yaz.", items: PL([
      ["أُرِيدُ أَنْ ___ طَبِيبًا.", "أَكُونَ", "أَكُونُ", "يَكُونُ", "Doktor olmak istiyorum.", "أَنْ + أَكُونُ ← أَكُونَ"],
      ["لَا أُرِيدُ أَنْ ___ مُتَأَخِّرًا.", "أَنَامَ", "أَنَامُ", "تَنَامِينَ", "Geç uyumak istemiyorum.", "أَنْ + أَنَامُ ← أَنَامَ"],
      ["أُرِيدُ أَنْ ___ اللُّغَةَ العَرَبِيَّةَ جَيِّدًا.", "أَتَعَلَّمَ", "أَتَعَلَّمُ", "يَتَعَلَّمُ", "Arapçayı iyi öğrenmek istiyorum.", "Sondaki ötre üstün olur."],
      ["لَا أُرِيدُ أَنْ ___ عَنِ الدَّرْسِ.", "أَتَأَخَّرَ", "أَتَأَخَّرُ", "نَتَأَخَّرُ", "Dersten geç kalmak istemiyorum.", ""],
      ["يُرِيدُ خَالِدٌ أَنْ ___ طَبِيبًا مَاهِرًا.", "يُصْبِحَ", "يُصْبِحُ", "أُصْبِحَ", "Hâlid usta bir doktor olmak istiyor.", "Metinden: يُرِيدُ أَنْ يُصْبِحَ."],
      ["يَجِبُ أَنْ ___ مُبَكِّرًا.", "نَسْتَيْقِظَ", "نَسْتَيْقِظُ", "يَسْتَيْقِظُونَ", "Erken uyanmalıyız.", "4. etkinlikten: يَجِبُ أَنْ نَسْتَيْقِظَ."],
      ["أُحِبُّ أَنْ ___ الشَّايَ فِي المَقْصَفِ.", "أَشْرَبَ", "أَشْرَبُ", "تَشْرَبُ", "Kantinde çay içmeyi severim.", ""],
      ["لَا أُرِيدُ أَنْ ___ فِي المَطْعَمِ اليَوْمَ.", "آكُلَ", "آكُلُ", "يَأْكُلُ", "Bugün yemekhanede yemek istemiyorum.", ""]
    ])},
    { type: "pick", num: "١٢", ar: "اسْتَعْمِلِ الكَلِمَاتِ الآتِيَةَ فِي جُمَلٍ صَحِيحَةٍ", tr: "Kelimeyi doğru ve anlamlı kullanan cümleyi seç; sonra defterine kendi cümleni yaz.", items: PL([
      ["اللُّغَةُ", "أَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ فِي السَّنَةِ التَّحْضِيرِيَّةِ.", "أَكَلْتُ اللُّغَةَ فِي المَطْعَمِ.", "اللُّغَةُ تَسْكُنُ فِي الجَامِعَةِ.", "Hazırlık sınıfında Arapça öğreniyorum.", "Dil öğrenilir, konuşulur."],
      ["الجَامِعَةُ", "تَقَعُ الجَامِعَةُ فِي وَسَطِ المَدِينَةِ.", "شَرِبْتُ الجَامِعَةَ بَارِدَةً.", "الجَامِعَةُ تَدْرُسُ الطِّبَّ.", "Üniversite şehrin ortasında.", "Üniversite bir yerdir."],
      ["المُدَرِّسُ", "يَشْرَحُ المُدَرِّسُ الدَّرْسَ لِلطُّلَّابِ.", "المُدَرِّسُ مَفْرُوشٌ بِسَجَّادَةٍ.", "أَكَلَ الطُّلَّابُ المُدَرِّسَ.", "Öğretmen dersi öğrencilere anlatır.", "مُدَرِّسٌ: öğretmen."],
      ["يَبْدَأُ", "يَبْدَأُ الدَّرْسُ السَّاعَةَ التَّاسِعَةَ.", "يَبْدَأُ الطَّعَامُ لَذِيذًا فِي الصَّحْنِ.", "يَبْدَأُ إِلَى البَيْتِ.", "Ders saat dokuzda başlar.", "يَبْدَأُ: başlar."],
      ["يَنْتَهِي", "يَنْتَهِي العَامُ الدِّرَاسِيُّ فِي حُزَيْرَانَ.", "يَنْتَهِي خَالِدٌ الشَّايَ.", "يَنْتَهِي المَقْصَفُ صَغِيرًا.", "Öğretim yılı Haziran’da biter.", "يَنْتَهِي: biter."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · PROGRAM
{
  id: "u5", no: 5, ar: "البَرْنَامَجُ الدِّرَاسِيُّ وَالأَيَّامُ وَالشُّهُورُ", tr: "Ders Programı, Günler ve Aylar", short: "Program", col: "muz", legend: ["cerr", "nasb"],
  goals: ["Haftanın günlerini ve ayları Arapça söylemek", "Ders programını okumak: ders, ara, saat", "Programla ilgili soruları cevaplamak (ek ödev)", "Kendi ders programını Arapça doldurmak"],
  examples: [
    { s: "المُحَاضَرَةُ الأُولَى:nasb / مِنَ السَّاعَةِ التَّاسِعَةِ:cerr / إِلَى العَاشِرَةِ وَالنِّصْفِ.:cerr", tr: "Birinci ders saat dokuzdan on buçuğa.", pair: "يَوْمَ الخَمِيسِ:cerr / نَتَعَلَّمُ:- / المُحَادَثَةَ.:nasb", pairTr: "Perşembe günü konuşma öğreniyoruz." }
  ],
  rules: [
    { tr: "<b>Günler:</b> <span class=\"ar\">الأَحَدُ</span> pazar · <span class=\"ar\">الإِثْنَيْنِ</span> pazartesi · <span class=\"ar\">الثُّلَاثَاءُ</span> salı · <span class=\"ar\">الأَرْبِعَاءُ</span> çarşamba · <span class=\"ar\">الخَمِيسُ</span> perşembe · <span class=\"ar\">الجُمُعَةُ</span> cuma · <span class=\"ar\">السَّبْتُ</span> cumartesi." },
    { tr: "<b>Aylar (Şam–Irak):</b> <span class=\"ar\">كَانُونُ الثَّانِي، شُبَاطُ، آذَارُ، نَيْسَانُ، أَيَّارُ، حُزَيْرَانُ، تَمُّوزُ، آبُ، أَيْلُولُ، تِشْرِينُ الأَوَّلُ، تِشْرِينُ الثَّانِي، كَانُونُ الأَوَّلُ</span> (Ocak → Aralık)." },
    { tr: "<b>Programın dili:</b> <span class=\"ar\">المَوَاعِيدُ</span> saatler · <span class=\"ar\">المُحَاضَرَةُ الأُولَى / الثَّانِيَةُ / الثَّالِثَةُ</span> 1. / 2. / 3. ders · <span class=\"ar\">الاسْتِرَاحَةُ</span> ara · <span class=\"ar\">اسْتِرَاحَةُ الغَدَاءِ</span> öğle arası · <span class=\"ar\">حِصَّةٌ</span> ders saati · <span class=\"ar\">رَئِيسُ القِسْمِ</span> bölüm başkanı · <span class=\"ar\">مُنَسِّقٌ</span> koordinatör." },
    { tr: "<b>Ek ödev:</b> Kitap ders programını kendi programına göre doldurmanı istiyor. Burada bir <b>örnek program</b> var (Özet’teki program makinesi); sorular bu örneğe göre. Kendi programını defterine aynı tabloyla doldur ve soruları kendi programın için de cevapla." }
  ],
  kaide: ["وَاجِبٌ بَيْتِيٌّ إِضَافِيٌّ: امْلَأْ جَدْوَلَ البَرْنَامَجِ الدِّرَاسِيِّ حَسَبَ بَرْنَامَجِكَ فِي هَذِهِ السَّنَةِ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ.", "الأَسْئِلَةُ: كَمْ عَدَدُ الدُّرُوسِ فِي الأُسْبُوعِ؟ كَمْ مَادَّةً تَدْرُسُ فِي الأُسْبُوعِ؟ لِأَيِّ سَنَةٍ هَذَا البَرْنَامَجُ؟ كَمْ حِصَّةً لِكُلِّ مَادَّةٍ؟ مَنْ رَئِيسُ القِسْمِ؟ مَاذَا يَتَعَلَّمُ الطُّلَّابُ فِي الدَّرْسِ الأَوَّلِ يَوْمَ الخَمِيسِ؟ كَمْ يَوْمًا عُطْلَةُ الأُسْبُوعِ؟ كَمِ اسْتِرَاحَةً لَدَيْكَ؟ كَمْ دَقِيقَةً مُدَّةُ الاسْتِرَاحَةِ الثَّانِيَةِ؟ كَمْ مُدَّةُ المُحَاضَرَةِ الوَاحِدَةِ؟"],
  ex: [
    { type: "reading", num: "وَاجِبٌ", ar: "امْلَأْ جَدْوَلَ البَرْنَامَجِ الدِّرَاسِيِّ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Örnek programı oku (tablo hâli Özet’te). Kendi programını defterine doldur; sonra aşağıdaki soruları örnek programa göre cevapla.", title: "البَرْنَامَجُ الدِّرَاسِيُّ (نَمُوذَجٌ)", speak: true, text: PROG_TEXT, textTr: PROG_TR,
      qa: [
        { q: "لِأَيِّ سَنَةٍ هَذَا البَرْنَامَجُ؟", a: "لِلسَّنَةِ التَّحْضِيرِيَّةِ، العَامِ الدِّرَاسِيِّ <span dir='ltr' style='font-family:var(--f-body)'>2019–2020</span>.", tr: "Bu program hangi sınıf için? Hazırlık sınıfı." },
        { q: "مَنْ رَئِيسُ القِسْمِ؟", a: "رَئِيسُ قِسْمِ اللُّغَةِ العَرَبِيَّةِ أ.د خَلِيل إِبْرَاهِيم قَجَّار.", tr: "Bölüm başkanı kim?" },
        { q: "مَا بَرْنَامَجُكَ أَنْتَ؟", a: "يَوْمَ الإِثْنَيْنِ أَدْرُسُ… ، وَيَوْمَ الثُّلَاثَاءِ…", tr: "Senin programın ne? Kendi programını anlat." }
      ]
    },
    { type: "pick", num: "الأَسْئِلَةُ", ar: "أَجِبْ عَنِ الأَسْئِلَةِ (حَسَبَ البَرْنَامَجِ النَّمُوذَجِيِّ)", tr: "Kitaptaki ek ödev soruları; cevaplar Özet’teki örnek programa göre.", items: PL([
      ["كَمْ عَدَدُ الدُّرُوسِ فِي الأُسْبُوعِ؟", "خَمْسَةَ عَشَرَ دَرْسًا.", "عَشَرَةُ دُرُوسٍ.", "عِشْرُونَ دَرْسًا.", "Haftada kaç ders? 15 (5 gün × 3).", ""],
      ["كَمْ مَادَّةً تَدْرُسُ فِي الأُسْبُوعِ؟", "خَمْسَ مَوَادَّ: القِرَاءَةَ وَالقَوَاعِدَ وَالمُحَادَثَةَ وَالكِتَابَةَ وَالاسْتِمَاعَ.", "ثَلَاثَ مَوَادَّ.", "مَادَّةً وَاحِدَةً.", "Haftada kaç ders konusu? Beş.", ""],
      ["لِأَيِّ سَنَةٍ هَذَا البَرْنَامَجُ؟", "لِلسَّنَةِ التَّحْضِيرِيَّةِ.", "لِلسَّنَةِ الخَامِسَةِ.", "لِلسَّنَةِ الأُولَى فِي الطِّبِّ.", "Program hangi sınıf için? Hazırlık.", "السَّنَةُ: التَّحْضِيرِيَّةُ."],
      ["كَمْ حِصَّةً لِكُلِّ مَادَّةٍ فِي الأُسْبُوعِ؟", "ثَلَاثُ حِصَصٍ.", "حِصَّتَانِ.", "خَمْسُ حِصَصٍ.", "Her ders haftada kaç saat? Üç.", "15 ders ÷ 5 konu = 3."],
      ["مَنْ رَئِيسُ القِسْمِ؟", "أ.د خَلِيل إِبْرَاهِيم قَجَّار.", "أ. مَحْمُود سَامِي كَنْبَاش.", "خَالِدٌ.", "Bölüm başkanı kim? Prof. Dr. Halil İbrahim Kaccar.", "Mahmud Sami Kenbaş, hazırlık koordinatörü."],
      ["مَاذَا يَتَعَلَّمُ الطُّلَّابُ فِي الدَّرْسِ الأَوَّلِ يَوْمَ الخَمِيسِ؟", "المُحَادَثَةَ.", "القَوَاعِدَ.", "الكِتَابَةَ.", "Perşembe 1. derste ne öğreniyorlar? Konuşma.", "Örnek programa göre."],
      ["كَمْ يَوْمًا عُطْلَةُ الأُسْبُوعِ؟", "يَوْمَانِ: السَّبْتُ وَالأَحَدُ.", "يَوْمٌ وَاحِدٌ.", "ثَلَاثَةُ أَيَّامٍ.", "Hafta tatili kaç gün? İki: cumartesi ve pazar.", "Programda pazartesi–cuma ders var."],
      ["كَمِ اسْتِرَاحَةً لَدَيْكَ فِي البَرْنَامَجِ كُلَّ يَوْمٍ؟", "اسْتِرَاحَتَانِ.", "اسْتِرَاحَةٌ وَاحِدَةٌ.", "ثَلَاثُ اسْتِرَاحَاتٍ.", "Programda her gün kaç ara var? İki.", "الاسْتِرَاحَةُ + اسْتِرَاحَةُ الغَدَاءِ."],
      ["كَمْ دَقِيقَةً مُدَّةُ الاسْتِرَاحَةِ الثَّانِيَةِ؟", "سِتُّونَ دَقِيقَةً.", "ثَلَاثُونَ دَقِيقَةً.", "تِسْعُونَ دَقِيقَةً.", "İkinci ara kaç dakika? 60 (12.30–13.30).", "Birinci ara 30 dakika."],
      ["كَمْ مُدَّةُ المُحَاضَرَةِ الوَاحِدَةِ؟", "سَاعَةٌ وَنِصْفٌ (تِسْعُونَ دَقِيقَةً).", "سَاعَةٌ وَاحِدَةٌ.", "سَاعَتَانِ.", "Bir ders ne kadar sürer? Bir buçuk saat.", "9.00–10.30."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "أَيَّامُ الأُسْبُوعِ وَالشُّهُورُ", tr: "Günlerin ve ayların sırasını bul.", items: PL([
      ["اليَوْمُ بَعْدَ الأَحَدِ: ___", "الإِثْنَيْنِ", "السَّبْتُ", "الخَمِيسُ", "Pazardan sonraki gün: pazartesi.", ""],
      ["اليَوْمُ بَعْدَ الثُّلَاثَاءِ: ___", "الأَرْبِعَاءُ", "الإِثْنَيْنِ", "الجُمُعَةُ", "Salıdan sonra: çarşamba.", ""],
      ["اليَوْمُ قَبْلَ الجُمُعَةِ: ___", "الخَمِيسُ", "السَّبْتُ", "الأَحَدُ", "Cumadan önce: perşembe.", ""],
      ["اليَوْمُ بَعْدَ الجُمُعَةِ: ___", "السَّبْتُ", "الخَمِيسُ", "الأَحَدُ", "Cumadan sonra: cumartesi.", ""],
      ["يَبْدَأُ العَامُ الدِّرَاسِيُّ فِي ___ (Eylül).", "أَيْلُولَ", "حُزَيْرَانَ", "آذَارَ", "Öğretim yılı Eylül’de başlar.", ""],
      ["يَنْتَهِي العَامُ الدِّرَاسِيُّ فِي ___ (Haziran).", "حُزَيْرَانَ", "أَيْلُولَ", "شُبَاطَ", "Haziran’da biter.", ""],
      ["الشَّهْرُ بَعْدَ آذَارَ: ___", "نَيْسَانُ", "شُبَاطُ", "أَيَّارُ", "Marttan sonra: nisan.", ""],
      ["الشَّهْرُ بَعْدَ تَمُّوزَ: ___", "آبُ", "أَيْلُولُ", "حُزَيْرَانُ", "Temmuzdan sonra: ağustos.", ""]
    ])},
    { type: "classify", extra: true, opts: HT, ar: "يَوْمُ دِرَاسَةٍ أَمْ عُطْلَةٌ؟ (عِنْدَ خَالِدٍ)", tr: "Metne göre bu gün Hâlid için ders günü mü, tatil mi?", items: CL([
      ["الأَحَدُ", "d", "Hâlid pazar günü okur."], ["الإِثْنَيْنِ", "d", "Ders günü."], ["الثُّلَاثَاءُ", "d", "Ders günü."], ["الأَرْبِعَاءُ", "d", "Ders günü."], ["الخَمِيسُ", "d", "Ders günü."], ["الجُمُعَةُ", "t", "Tatil: يَوْمَا الجُمُعَةِ وَالسَّبْتِ."], ["السَّبْتُ", "t", "Tatil."]
    ]) }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["خَالِدٌ طَالِبٌ سُورِيٌّ {مُتَفَوِّقٌ}.", ["مُتَفَوِّقٌ", "كَسُولٌ", "صَغِيرٌ"], "metin", "Hâlid başarılı Suriyeli bir öğrenci.", "u1"],
  ["يَدْرُسُ خَالِدٌ فِي كُلِّيَّةِ {الطِّبِّ}.", ["الطِّبِّ", "الهَنْدَسَةِ", "الإِلَهِيَّاتِ"], "metin", "Hâlid tıp fakültesinde okuyor.", "u1"],
  ["هُوَ فِي السَّنَةِ {الخَامِسَةِ}.", ["الخَامِسَةِ", "الرَّابِعَةِ", "الأُولَى"], "metin", "Beşinci sınıfta.", "u1"],
  ["وَيُرِيدُ أَنْ يُصْبِحَ طَبِيبًا {مَاهِرًا}.", ["مَاهِرًا", "مَرِيضًا", "كَسُولًا"], "metin", "Usta bir doktor olmak istiyor.", "u1"],
  ["يَبْدَأُ العَامُ الدِّرَاسِيُّ فِي مُنْتَصَفِ {أَيْلُولَ}.", ["أَيْلُولَ", "حُزَيْرَانَ", "آذَارَ"], "metin", "Öğretim yılı Eylül ortasında başlar.", "u1"],
  ["العُطْلَةُ الصَّيْفِيَّةُ {طَوِيلَةٌ}.", ["طَوِيلَةٌ", "قَصِيرَةٌ", "رَخِيصَةٌ"], "metin", "Yaz tatili uzundur.", "u1"],
  ["يَدْرُسُ خَالِدٌ {أَرْبَعَ} مُحَاضَرَاتٍ فِي كُلِّ يَوْمٍ.", ["أَرْبَعَ", "خَمْسَ", "ثَلَاثَ"], "anlama", "Her gün dört ders okuyor.", "u2"],
  ["أَسْعَارُ المَطْعَمِ {رَخِيصَةٌ} وَمُنَاسِبَةٌ.", ["رَخِيصَةٌ", "غَالِيَةٌ", "طَوِيلَةٌ"], "anlama", "Yemekhanenin fiyatları ucuz ve uygun.", "u2"],
  ["يَشْرَبُ الطُّلَّابُ الشَّايَ فِي {المَقْصَفِ}.", ["المَقْصَفِ", "المُسْتَشْفَى", "الصَّفِّ"], "anlama", "Öğrenciler kantinde çay içer.", "u2"],
  ["يَتَعَلَّمُ خَالِدٌ كَيْفَ {يُعَالِجُ} المَرْضَى.", ["يُعَالِجُ", "يَأْكُلُ", "يَكْتُبُ"], "anlama", "Hastaları nasıl tedavi edeceğini öğreniyor.", "u2"],
  ["السَّاعَةُ الخَامِسَةُ صَبَاحًا، الوَقْتُ {مُبَكِّرٌ} جِدًّا.", ["مُبَكِّرٌ", "مُتَأَخِّرٌ", "مَسَاءٌ"], "boşluk", "Saat sabahın beşi, vakit çok erken.", "u3"],
  ["مُتَفَوِّقٌ = {مُجْتَهِدٌ}.", ["مُجْتَهِدٌ", "كَسُولٌ", "مَرِيضٌ"], "eş anlam", "Başarılı = çalışkan.", "u3"],
  ["تَبْدَأُ ≠ {تَنْتَهِي}.", ["تَنْتَهِي", "تَخْرُجُ", "تُحِبُّ"], "zıt", "Başlar ≠ biter.", "u3"],
  ["مَرْحَلَةٌ ← {مَرَاحِلُ}.", ["مَرَاحِلُ", "مَرْحَلَاتٌ", "مُرُوحٌ"], "çoğul", "Aşama → aşamalar.", "u3"],
  ["جَلَسَ الطُّلَّابُ {عَلَى} الكَرَاسِيِّ.", ["عَلَى", "مِنْ", "إِلَى"], "harf-i cer", "Öğrenciler sandalyelere oturdu.", "u4"],
  ["خَرَجَ المُعَلِّمُ {مِنَ} الصَّفِّ.", ["مِنَ", "عَلَى", "فِي"], "harf-i cer", "Öğretmen sınıftan çıktı.", "u4"],
  ["أُرِيدُ أَنْ {أَكُونَ} مُهَنْدِسًا.", ["أَكُونَ", "أَكُونُ", "يَكُونُ"], "أَنْ", "Mühendis olmak istiyorum.", "u4"],
  ["لَا أُرِيدُ أَنْ {أَنَامَ} مُتَأَخِّرًا.", ["أَنَامَ", "أَنَامُ", "نَامَ"], "أَنْ", "Geç uyumak istemiyorum.", "u4"],
  ["يَبْدَأُ الدَّرْسُ السَّاعَةَ {التَّاسِعَةَ}.", ["التَّاسِعَةَ", "التِّسْعَةَ", "تِسْعٌ"], "saat", "Ders saat dokuzda başlar.", "u4"],
  ["اليَوْمُ بَعْدَ الأَحَدِ: {الإِثْنَيْنِ}.", ["الإِثْنَيْنِ", "السَّبْتُ", "الخَمِيسُ"], "gün", "Pazardan sonra pazartesi.", "u5"],
  ["العُطْلَةُ عِنْدَ خَالِدٍ يَوْمَا الجُمُعَةِ وَ{السَّبْتِ}.", ["السَّبْتِ", "الأَحَدِ", "الخَمِيسِ"], "gün", "Tatil cuma ve cumartesi.", "u5"],
  ["الشَّهْرُ بَعْدَ آذَارَ: {نَيْسَانُ}.", ["نَيْسَانُ", "شُبَاطُ", "أَيَّارُ"], "ay", "Marttan sonra nisan.", "u5"],
  ["مُدَّةُ المُحَاضَرَةِ سَاعَةٌ وَ{نِصْفٌ}.", ["نِصْفٌ", "رُبْعٌ", "ثُلُثٌ"], "program", "Ders bir buçuk saat sürer.", "u5"],
  ["بَيْنَ المُحَاضَرَتَيْنِ {اسْتِرَاحَةٌ}.", ["اسْتِرَاحَةٌ", "مُحَاضَرَةٌ", "عُطْلَةٌ"], "program", "İki ders arasında bir ara var.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["خَالِدٌ فِي السَّنَةِ الرَّابِعَةِ ← metne göre düzelt", "خَالِدٌ فِي السَّنَةِ الخَامِسَةِ", "خَالِدٌ فِي السَّنَةِ الأُولَى", "خَالِدٌ فِي السَّنَةِ الثَّانِيَةِ", "Beşinci sınıfta.", "u1"],
  ["أَسْعَارُ المَطْعَمِ غَالِيَةٌ ← metne göre düzelt", "أَسْعَارُ المَطْعَمِ رَخِيصَةٌ", "أَسْعَارُ المَطْعَمِ طَوِيلَةٌ", "أَسْعَارُ المَطْعَمِ كَبِيرَةٌ", "رَخِيصَةٌ وَمُنَاسِبَةٌ.", "u1"],
  ["يُقَدِّمُ المَقْصَفُ وَجَبَاتٍ سَرِيعَةً ← metne göre düzelt", "يُقَدِّمُ المَطْعَمُ وَجَبَاتٍ سَرِيعَةً", "يُقَدِّمُ الصَّفُّ وَجَبَاتٍ سَرِيعَةً", "يُقَدِّمُ المُسْتَشْفَى وَجَبَاتٍ سَرِيعَةً", "Yemekhane sunar.", "u2"],
  ["هِيَ تَدْرُسُ التَّارِيخَ ← soruyu yaz", "مَاذَا تَدْرُسُ؟", "أَيْنَ تَدْرُسُ؟", "كَمْ تَدْرُسُ؟", "Nesne: مَاذَا.", "u2"],
  ["أَنَا أَدْرُسُ فِي كُلِّيَّةِ الإِلَهِيَّاتِ ← soruyu yaz", "أَيْنَ تَدْرُسُ؟", "مَاذَا تَدْرُسُ؟", "مَتَى تَدْرُسُ؟", "Yer: أَيْنَ.", "u2"],
  ["غَالِيَةٌ ← zıt anlam", "رَخِيصَةٌ", "طَوِيلَةٌ", "مُخْتَلِفَةٌ", "pahalı ≠ ucuz", "u3"],
  ["يَخْرُجُ ← zıt anlam", "يَدْخُلُ", "يَبْدَأُ", "يُحِبُّ", "çıkar ≠ girer", "u3"],
  ["يُعَالِجُ ← eş anlam", "يُدَاوِي", "يَدْرُسُ", "يَخْرُجُ", "tedavi eder", "u3"],
  ["شَهْرٌ ← çoğul", "شُهُورٌ / أَشْهُرٌ", "شَهْرَاتٌ", "أَشَاهِرُ", "ay → aylar", "u3"],
  ["دَخَلْتُ … الصَّفِّ ← harf-i cer", "دَخَلْتُ إِلَى الصَّفِّ", "دَخَلْتُ عَلَى الصَّفِّ", "دَخَلْتُ مِنَ الصَّفِّ", "دَخَلَ إِلَى", "u4"],
  ["أُرِيدُ أَنْ + أَكُونُ", "أُرِيدُ أَنْ أَكُونَ", "أُرِيدُ أَنْ أَكُونُ", "أُرِيدُ أَنْ كُنْتُ", "أَنْ fiili mansûb yapar.", "u4"],
  ["مُهَنْدِسًا، أُرِيدُ، أَكُونَ، أَنْ ← sırala", "أُرِيدُ أَنْ أَكُونَ مُهَنْدِسًا", "أَنْ أُرِيدُ مُهَنْدِسًا أَكُونَ", "مُهَنْدِسًا أَكُونَ أُرِيدُ أَنْ", "Kitaptaki 10. etkinlik.", "u4"],
  ["الخَمِيسُ ← sonraki gün", "الجُمُعَةُ", "الأَرْبِعَاءُ", "السَّبْتُ", "Perşembe → cuma", "u5"],
  ["أَيْلُولُ ← Türkçesi", "Eylül", "Haziran", "Nisan", "أَيْلُولُ: Eylül", "u5"]
];
// Gün mü ay mı? hız oyunu
var NOUN_LIST = [
  ["الأَحَدُ", "g", "pazar"], ["الإِثْنَيْنِ", "g", "pazartesi"], ["الثُّلَاثَاءُ", "g", "salı"], ["الأَرْبِعَاءُ", "g", "çarşamba"], ["الخَمِيسُ", "g", "perşembe"], ["الجُمُعَةُ", "g", "cuma"], ["السَّبْتُ", "g", "cumartesi"],
  ["كَانُونُ الثَّانِي", "a", "ocak"], ["شُبَاطُ", "a", "şubat"], ["آذَارُ", "a", "mart"], ["نَيْسَانُ", "a", "nisan"], ["أَيَّارُ", "a", "mayıs"], ["حُزَيْرَانُ", "a", "haziran"], ["تَمُّوزُ", "a", "temmuz"], ["آبُ", "a", "ağustos"], ["أَيْلُولُ", "a", "eylül"], ["تِشْرِينُ الأَوَّلُ", "a", "ekim"], ["تِشْرِينُ الثَّانِي", "a", "kasım"], ["كَانُونُ الأَوَّلُ", "a", "aralık"]
];
var SP_M = GA;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt anlamı", pairs: [["يُحِبُّ", "يَكْرَهُ"], ["مُتَفَوِّقٌ", "كَسُولٌ"], ["كَثِيرًا", "قَلِيلًا"], ["طَوِيلَةٌ", "قَصِيرَةٌ"], ["يَخْرُجُ", "يَدْخُلُ"], ["تَبْدَأُ", "تَنْتَهِي"], ["مُخْتَلِفَةٌ", "مُتَشَابِهَةٌ"], ["غَالِيَةٌ", "رَخِيصَةٌ"]] },
  es: { name: "Kelime ↔ eş anlamı", pairs: [["مُتَفَوِّقٌ", "مُجْتَهِدٌ"], ["العُطْلَةُ", "الإِجَازَةُ"], ["مُدَّةٌ", "وَقْتٌ"], ["أُسْتَاذٌ", "مُعَلِّمٌ"], ["يُعَالِجُ", "يُدَاوِي"], ["طُلَّابٌ", "طَلَبَةٌ"]] },
  co: { name: "Tekil ↔ çoğul", pairs: [["شَهْرٌ", "أَشْهُرٌ"], ["مَرْحَلَةٌ", "مَرَاحِلُ"], ["سَنَةٌ", "سَنَوَاتٌ"], ["طَالِبٌ", "طُلَّابٌ"], ["جَامِعَةٌ", "جَامِعَاتٌ"], ["أُسْتَاذٌ", "أَسَاتِذَةٌ"], ["مَادَّةٌ", "مَوَادُّ"], ["مَرِيضٌ", "مَرْضَى"]] }
};
var KARTLAR = [
  ["Hâlid kimdir?", "خَالِدٌ طَالِبٌ سُورِيٌّ مُتَفَوِّقٌ، فِي السَّنَةِ الخَامِسَةِ فِي كُلِّيَّةِ الطِّبِّ بِجَامِعَةِ دِمَشْقَ"],
  ["Ne olmak istiyor?", "يُرِيدُ أَنْ يُصْبِحَ طَبِيبًا مَاهِرًا فِي المُسْتَقْبَلِ"],
  ["Öğretim yılı ve yaz tatili?", "يَبْدَأُ فِي مُنْتَصَفِ أَيْلُولَ، يَنْتَهِي فِي حُزَيْرَانَ · العُطْلَةُ الصَّيْفِيَّةُ ثَلَاثَةُ أَشْهُرٍ"],
  ["Hâlid’in haftası?", "خَمْسَةُ أَيَّامٍ (الأَحَدُ–الخَمِيسُ) · العُطْلَةُ: الجُمُعَةُ وَالسَّبْتُ"],
  ["Hâlid’in günü?", "يَخْرُجُ فِي السَّابِعَةِ · الدُّرُوسُ مِنَ التَّاسِعَةِ إِلَى الخَامِسَةِ · أَرْبَعُ مُحَاضَرَاتٍ، كُلٌّ سَاعَةٌ وَنِصْفٌ"],
  ["Yemekhane ve kantin?", "المَطْعَمُ: أَسْعَارٌ رَخِيصَةٌ، غَدَاءٌ، وَجَبَاتٌ سَرِيعَةٌ · المَقْصَفُ: الشَّايُ، القَهْوَةُ، العَصِيرُ"],
  ["Eş anlamlar?", "مُتَفَوِّقٌ = مُجْتَهِدٌ · العُطْلَةُ = الإِجَازَةُ · مُدَّةٌ = وَقْتٌ · أُسْتَاذٌ = مُعَلِّمٌ · يُعَالِجُ = يُدَاوِي"],
  ["Zıt anlamlar?", "تَبْدَأُ ≠ تَنْتَهِي · يَخْرُجُ ≠ يَدْخُلُ · غَالِيَةٌ ≠ رَخِيصَةٌ · طَوِيلَةٌ ≠ قَصِيرَةٌ"],
  ["Çoğullar?", "شُهُورٌ، أَشْهُرٌ · مَرَاحِلُ · سَنَوَاتٌ · طُلَّابٌ · جَامِعَاتٌ"],
  ["أَنْ’den sonra fiil?", "Mansûb: أُرِيدُ أَنْ أَكُونَ · يُرِيدُ أَنْ يُصْبِحَ · يَجِبُ أَنْ نَسْتَيْقِظَ"],
  ["Haftanın günleri?", "الأَحَدُ، الإِثْنَيْنِ، الثُّلَاثَاءُ، الأَرْبِعَاءُ، الخَمِيسُ، الجُمُعَةُ، السَّبْتُ"],
  ["Ders programı sözleri?", "المُحَاضَرَةُ · الاسْتِرَاحَةُ · اسْتِرَاحَةُ الغَدَاءِ · حِصَّةٌ · رَئِيسُ القِسْمِ · مُنَسِّقٌ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat05";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("طَالِبٌ", "i", "öğrenci", "طُلَّابٌ / طَلَبَةٌ", "fual", "تِلْمِيذٌ", "", "خَالِدٌ طَالِبٌ سُورِيٌّ مُتَفَوِّقٌ.", "طَالِبٌ", "Hâlid başarılı Suriyeli bir öğrenci."),
  KW("جَامِعَةٌ", "i", "üniversite", "جَامِعَاتٌ", "at", "", "", "يَدْرُسُ خَالِدٌ فِي جَامِعَةِ دِمَشْقَ.", "جَامِعَةِ", "Hâlid Şam Üniversitesinde okuyor."),
  KW("كُلِّيَّةٌ", "i", "fakülte", "كُلِّيَّاتٌ", "at", "", "", "هُوَ يُحِبُّ كُلِّيَّتَهُ كَثِيرًا.", "كُلِّيَّتَهُ", "Fakültesini çok seviyor."),
  KW("سَنَةٌ", "i", "yıl, sınıf", "سَنَوَاتٌ", "at", "عَامٌ", "", "هُوَ فِي السَّنَةِ الخَامِسَةِ.", "السَّنَةِ", "Beşinci sınıfta."),
  KW("شَهْرٌ", "i", "ay", "شُهُورٌ / أَشْهُرٌ", "fuul", "", "", "مُدَّتُهَا ثَلَاثَةُ أَشْهُرٍ تَقْرِيبًا.", "أَشْهُرٍ", "Süresi yaklaşık üç ay."),
  KW("أُسْبُوعٌ", "i", "hafta", "أَسَابِيعُ", "fealil", "", "", "يَدْرُسُ خَالِدٌ خَمْسَةَ أَيَّامٍ فِي الأُسْبُوعِ.", "الأُسْبُوعِ", "Hâlid haftada beş gün okuyor."),
  KW("مُحَاضَرَةٌ", "i", "ders, konferans", "مُحَاضَرَاتٌ", "at", "دَرْسٌ", "", "يَدْرُسُ خَالِدٌ أَرْبَعَ مُحَاضَرَاتٍ فِي كُلِّ يَوْمٍ.", "مُحَاضَرَاتٍ", "Hâlid her gün dört ders okuyor."),
  KW("عُطْلَةٌ", "i", "tatil", "عُطَلٌ", "fual_f", "إِجَازَةٌ", "", "وَالعُطْلَةُ الصَّيْفِيَّةُ عُطْلَةٌ طَوِيلَةٌ.", "وَالعُطْلَةُ", "Yaz tatili uzun bir tatildir."),
  KW("مُدَّةٌ", "i", "süre", "مُدَدٌ", "fual_f", "وَقْتٌ", "", "مُدَّتُهَا ثَلَاثَةُ أَشْهُرٍ تَقْرِيبًا.", "مُدَّتُهَا", "Süresi yaklaşık üç ay."),
  KW("أُسْتَاذٌ", "i", "hoca", "أَسَاتِذَةٌ", "diger", "مُعَلِّمٌ", "", "فِي الجَامِعَةِ أَسَاتِذَةٌ مِنْ جِنْسِيَّاتٍ مُخْتَلِفَةٍ.", "أَسَاتِذَةٌ", "Üniversitede farklı uyruklardan hocalar var."),
  KW("مَرِيضٌ", "i", "hasta", "مَرْضَى", "diger", "", "", "يَتَعَلَّمُ خَالِدٌ كَيْفَ يُعَالِجُ المَرْضَى.", "المَرْضَى", "Hâlid hastaları nasıl tedavi edeceğini öğreniyor."),
  KW("مَادَّةٌ", "i", "ders, konu", "مَوَادُّ", "fevail", "", "", "وَيَدْرُسُ المَوَادَّ المُخْتَلِفَةَ فِي تَخَصُّصِهِ.", "المَوَادَّ", "Uzmanlık alanındaki çeşitli dersleri okuyor."),
  KW("سِعْرٌ", "i", "fiyat", "أَسْعَارٌ", "efal", "ثَمَنٌ", "", "أَسْعَارُ المَطْعَمِ رَخِيصَةٌ وَمُنَاسِبَةٌ.", "أَسْعَارُ", "Yemekhanenin fiyatları ucuz ve uygun."),
  KW("مَرْحَلَةٌ", "i", "aşama, kademe", "مَرَاحِلُ", "mefail", "", "", "", "", ""),
  KW("مُسْتَقْبَلٌ", "i", "gelecek", "", "", "", "مَاضٍ", "يُرِيدُ أَنْ يُصْبِحَ طَبِيبًا مَاهِرًا فِي المُسْتَقْبَلِ.", "المُسْتَقْبَلِ", "Gelecekte usta bir doktor olmak istiyor."),
  KW("اسْتِرَاحَةٌ", "i", "ara, mola", "اسْتِرَاحَاتٌ", "at", "", "", "يَتَنَاوَلُ الطُّلَّابُ وَجْبَةَ الغَدَاءِ فِي اسْتِرَاحَةِ الظُّهْرِ.", "اسْتِرَاحَةِ", "Öğrenciler öğle yemeğini öğle arasında yer."),
  KW("مَقْصَفٌ", "i", "kantin", "مَقَاصِفُ", "mefail", "", "", "وَفِي الكُلِّيَّةِ مَقْصَفٌ صَغِيرٌ.", "مَقْصَفٌ", "Fakültede küçük bir kantin var."),
  KW("مُتَفَوِّقٌ", "s", "üstün, başarılı", "مُتَفَوِّقُونَ", "un", "مُجْتَهِدٌ", "كَسُولٌ", "خَالِدٌ طَالِبٌ سُورِيٌّ مُتَفَوِّقٌ.", "مُتَفَوِّقٌ", "Hâlid başarılı Suriyeli bir öğrenci."),
  KW("مَاهِرٌ", "s", "usta, becerikli", "مَهَرَةٌ", "diger", "", "", "وَيُرِيدُ أَنْ يُصْبِحَ طَبِيبًا مَاهِرًا.", "مَاهِرًا", "Usta bir doktor olmak istiyor."),
  KW("طَوِيلٌ", "s", "uzun", "طِوَالٌ", "fial", "", "قَصِيرٌ", "وَالعُطْلَةُ الصَّيْفِيَّةُ عُطْلَةٌ طَوِيلَةٌ.", "طَوِيلَةٌ", "Yaz tatili uzun bir tatildir."),
  KW("مُخْتَلِفٌ", "s", "farklı, çeşitli", "", "", "", "مُتَشَابِهٌ", "أَسَاتِذَةٌ مِنْ جِنْسِيَّاتٍ مُخْتَلِفَةٍ.", "مُخْتَلِفَةٍ", "Farklı uyruklardan hocalar."),
  KW("رَخِيصٌ", "s", "ucuz", "رِخَاصٌ", "fial", "", "غَالٍ", "أَسْعَارُ المَطْعَمِ رَخِيصَةٌ وَمُنَاسِبَةٌ.", "رَخِيصَةٌ", "Yemekhanenin fiyatları ucuz."),
  KW("مُنَاسِبٌ", "s", "uygun", "", "", "", "", "أَسْعَارُ المَطْعَمِ رَخِيصَةٌ وَمُنَاسِبَةٌ لِلطَّلَبَةِ.", "وَمُنَاسِبَةٌ", "Fiyatlar öğrencilere uygun."),
  KW("سَرِيعٌ", "s", "hızlı", "سِرَاعٌ", "fial", "", "بَطِيءٌ", "وَيُقَدِّمُ المَطْعَمُ وَجَبَاتٍ سَرِيعَةً أَيْضًا.", "سَرِيعَةً", "Yemekhane hazır yemek de sunar."),
  KW("مُبَكِّرٌ", "s", "erken", "", "", "", "مُتَأَخِّرٌ", "السَّاعَةُ الآنَ الخَامِسَةُ صَبَاحًا، الوَقْتُ مُبَكِّرٌ جِدًّا.", "مُبَكِّرٌ", "Saat sabahın beşi, vakit çok erken."),
  KW("أَصْبَحَ", "f", "oldu", "", "", "صَارَ", "", "وَيُرِيدُ أَنْ يُصْبِحَ طَبِيبًا مَاهِرًا.", "يُصْبِحَ", "Usta bir doktor olmak istiyor."),
  KW("أَرَادَ", "f", "istedi", "", "", "", "", "وَيُرِيدُ أَنْ يُصْبِحَ طَبِيبًا مَاهِرًا.", "وَيُرِيدُ", "Usta bir doktor olmak istiyor."),
  KW("بَدَأَ", "f", "başladı", "", "", "", "انْتَهَى", "يَبْدَأُ العَامُ الدِّرَاسِيُّ فِي مُنْتَصَفِ شَهْرِ أَيْلُولَ.", "يَبْدَأُ", "Öğretim yılı Eylül ortasında başlar."),
  KW("انْتَهَى", "f", "bitti", "", "", "", "بَدَأَ", "وَيَنْتَهِي فِي شَهْرِ حُزَيْرَانَ.", "وَيَنْتَهِي", "Ve Haziran’da biter."),
  KW("خَرَجَ", "f", "çıktı", "", "", "", "دَخَلَ", "يَخْرُجُ خَالِدٌ مِنْ بَيْتِهِ إِلَى الكُلِّيَّةِ.", "يَخْرُجُ", "Hâlid evinden fakülteye çıkar."),
  KW("عَالَجَ", "f", "tedavi etti", "", "", "دَاوَى", "", "يَتَعَلَّمُ خَالِدٌ كَيْفَ يُعَالِجُ المَرْضَى.", "يُعَالِجُ", "Hastaları nasıl tedavi edeceğini öğreniyor."),
  KW("قَدَّمَ", "f", "sundu, ikram etti", "", "", "", "", "وَيُقَدِّمُ المَطْعَمُ وَجَبَاتٍ سَرِيعَةً.", "وَيُقَدِّمُ", "Yemekhane hazır yemekler sunar."),
  KW("أَحَبَّ", "f", "sevdi", "", "", "", "كَرِهَ", "هُوَ يُحِبُّ كُلِّيَّتَهُ كَثِيرًا.", "يُحِبُّ", "Fakültesini çok seviyor.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","شُهُورٌ، دُرُوسٌ"],"efal":["أَفْعَالٌ","ef’âl","أَسْعَارٌ، أَيَّامٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","طِوَالٌ، رِخَاصٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","عُطَلٌ، مُدَدٌ"],"fuala":["فُعَلَاءُ","fu’alâ","وُزَرَاءُ، فُقَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَطِبَّاءُ"],"fevail":["فَوَاعِلُ","fevâil","مَوَادُّ، شَوَارِعُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَرَاحِلُ، مَقَاصِفُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","أَسَابِيعُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","طُلَّابٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","مُتَفَوِّقُونَ، مُعَلِّمُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","جَامِعَاتٌ، مُحَاضَرَاتٌ"],"diger":["…","başka kalıplar","أَسَاتِذَةٌ، مَرْضَى"]};
