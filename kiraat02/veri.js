// ================= VERİ: Kıraat 2 — عَائِلَةُ النَّبِيِّ مُحَمَّدٍ ﷺ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الشَّخْصُ", tr: "Kişi" }, nasb: { ar: "المَعْلُومَةُ", tr: "Bilgi" }, cerr: { ar: "القَرَابَةُ", tr: "Akrabalık" },
  mi: { ar: "الفِعْلُ", tr: "Fiil" }, ref: { ar: "الضَّمِيرُ", tr: "Zamir" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "cerr"]];
// Peygamberimizin nesi?
var AKRABA = [["z", "Zevcesi", "زَوْجَتُهُ", "mi"], ["o", "Oğlu", "ابْنُهُ", "nasb"], ["k", "Kızı", "بِنْتُهُ", "mun"], ["t", "Torunu", "حَفِيدُهُ", "mz"], ["a", "Amcası", "عَمُّهُ", "cerr"], ["h", "Halası", "عَمَّتُهُ", "ref"]];
// Akrabalık adları
var YAKIN = [["am", "Amca", "عَمٌّ", "cerr"], ["ah", "Hala", "عَمَّةٌ", "ref"], ["hl", "Dayı", "خَالٌ", "nasb"], ["ht", "Teyze", "خَالَةٌ", "mi"], ["cd", "Dede", "جَدٌّ", "mz"], ["cn", "Nine", "جَدَّةٌ", "muz"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", z: "Zevcesi", o: "Oğlu", k: "Kızı", t: "Torunu", a: "Amcası", h: "Halası" };

// Çekim makinesi: fiil × zamir → muzâri
var ZAMIR = [["أَنَا", "ben"], ["نَحْنُ", "biz"], ["أَنْتَ", "sen (e.)"], ["أَنْتِ", "sen (k.)"], ["هُوَ", "o (e.)"], ["هِيَ", "o (k.)"]];
var ZEK = ["um", "uz", "sun", "sun", "", ""];
// [mâzî, Türkçe kök (3. tekil), çekim: أنا نحن أنتَ أنتِ هو هي, kitaptaki verilen hücre]
var FIIL = [
  ["أَحَبَّ", "seviyor", ["أُحِبُّ", "نُحِبُّ", "تُحِبُّ", "تُحِبِّينَ", "يُحِبُّ", "تُحِبُّ"], 0],
  ["دَرَسَ", "ders çalışıyor", ["أَدْرُسُ", "نَدْرُسُ", "تَدْرُسُ", "تَدْرُسِينَ", "يَدْرُسُ", "تَدْرُسُ"], 1],
  ["عَمِلَ", "çalışıyor", ["أَعْمَلُ", "نَعْمَلُ", "تَعْمَلُ", "تَعْمَلِينَ", "يَعْمَلُ", "تَعْمَلُ"], 2],
  ["سَكَنَ", "oturuyor", ["أَسْكُنُ", "نَسْكُنُ", "تَسْكُنُ", "تَسْكُنِينَ", "يَسْكُنُ", "تَسْكُنُ"], 3],
  ["كَتَبَ", "yazıyor", ["أَكْتُبُ", "نَكْتُبُ", "تَكْتُبُ", "تَكْتُبِينَ", "يَكْتُبُ", "تَكْتُبُ"], 4],
  ["قَرَأَ", "okuyor", ["أَقْرَأُ", "نَقْرَأُ", "تَقْرَأُ", "تَقْرَئِينَ", "يَقْرَأُ", "تَقْرَأُ"], 5]
];
var EKLER = ["أَـ", "نَـ", "تَـ", "تَـ … ـِينَ", "يَـ", "تَـ"];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
// Tablo (10. etkinlik): verilen hücreden diğer beş zamirin biçimi
function TABLO(rows) {
  var out = [];
  rows.forEach(function (r) {
    var F = FIIL[r], g = F[3], fs = F[2];
    ZAMIR.forEach(function (z, p) {
      if (p === g) return;
      var ok = fs[p], ds = [];
      [g, 0, 1, 2, 3, 4, 5].forEach(function (j) { var f = fs[j]; if (f !== ok && ds.indexOf(f) < 0 && ds.length < 2) ds.push(f); });
      out.push([fs[g] + " (" + ZAMIR[g][0] + ") ← " + z[0] + ": ___", ok, ds[0], ds[1], z[1] + ": " + F[1] + ZEK[p], EKLER[p] + " ← " + z[0]]);
    });
  });
  return PL(out);
}

var S = "ﷺ";
var METIN = "رَسُولُنَا صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ اسْمُهُ مُحَمَّدٌ، اسْمُ وَالِدِهِ عَبْدُ اللهِ بْنُ عَبْدِ المُطَّلِبِ، وَاسْمُ أُمِّهِ آمِنَةُ بِنْتُ وَهْبٍ، اسْمُ جَدِّهِ عَبْدُ المُطَّلِبِ، وَاسْمُ جَدَّتِهِ فَاطِمَةُ. رَسُولُنَا مُحَمَّدٌ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ مِنْ قَبِيلَةِ قُرَيْشٍ، وَهِيَ قَبِيلَةٌ عَرَبِيَّةٌ مَشْهُورَةٌ. وُلِدَ " + S + " بِمَكَّةَ المُكَرَّمَةِ. عَمِلَ فِي الرَّعْيِ ثُمَّ فِي التِّجَارَةِ. مَاتَ نَبِيُّنَا مُحَمَّدٌ " + S + " فِي المَدِينَةِ المُنَوَّرَةِ، كَانَ سِنُّهُ ثَلَاثًا وَسِتِّينَ عَامًا، دُفِنَ فِي المَدِينَةِ المُنَوَّرَةِ." +
  "<br>عَائِلَةُ النَّبِيِّ مُحَمَّدٍ " + S + " كَبِيرَةٌ، تَتَكَوَّنُ مِنْ ثَلَاثَةِ أَوْلَادٍ وَأَرْبَعِ بَنَاتٍ." +
  "<br>زَوْجَاتُهُ هُنَّ: خَدِيجَةُ، وَسَوْدَةُ، وَعَائِشَةُ، وَحَفْصَةُ، وَزَيْنَبُ، وَهِنْدُ، وَجُوَيْرِيَةُ، وَصَفِيَّةُ، وَرَمْلَةُ، وَمَيْمُونَةُ، وَمَارِيَةُ." +
  "<br>وَلَهُ ثَلَاثَةُ أَوْلَادٍ، هُمُ: القَاسِمُ، وَعَبْدُ اللهِ، وَإِبْرَاهِيمُ. وَبَنَاتُهُ هُنَّ: زَيْنَبُ، وَرُقَيَّةُ، وَأُمُّ كُلْثُومٍ، وَفَاطِمَةُ." +
  "<br>وَلِلنَّبِيِّ مُحَمَّدٍ " + S + " ثَمَانِيَةُ أَحْفَادٍ، هُمْ: عَلِيٌّ وَأُمَامَةُ، وَهُمَا ابْنَا زَيْنَبَ؛ وَعَبْدُ اللهِ هُوَ ابْنُ رُقَيَّةَ؛ وَالحَسَنُ وَالحُسَيْنُ وَمُحْسِنٌ وَأُمُّ كُلْثُومٍ وَزَيْنَبُ، هُمْ أَبْنَاءُ فَاطِمَةَ." +
  "<br>وَلَهُ " + S + " أَحَدَ عَشَرَ عَمًّا، وَسِتُّ عَمَّاتٍ. مِنْ أَعْمَامِهِ: حَمْزَةُ، وَالعَبَّاسُ، وَأَبُو طَالِبٍ، وَأَبُو لَهَبٍ. وَلِلنَّبِيِّ " + S + " خَالٌ وَاحِدٌ، اسْمُهُ عَبْدُ يَغُوثَ بْنُ وَهْبٍ، وَخَالَتَانِ هُمَا: فَاخِتَةُ وَفُرَيْعَةُ.";
var METIN_TR = "Peygamberimizin (s.a.v.) adı Muhammed’dir. Babasının adı Abdülmuttalib oğlu Abdullah, annesinin adı Vehb kızı Âmine’dir. Dedesinin adı Abdülmuttalib, ninesinin adı Fâtıma’dır. Peygamberimiz Muhammed (s.a.v.) Kureyş kabilesindendir; bu, meşhur bir Arap kabilesidir. Mekke-i Mükerreme’de doğdu. Önce çobanlık, sonra ticaret yaptı. Peygamberimiz Muhammed (s.a.v.) Medine-i Münevvere’de vefat etti; altmış üç yaşındaydı. Medine-i Münevvere’de defnedildi." +
  "<br>Peygamberimizin ailesi büyüktür: üç oğul ve dört kızdan oluşur." +
  "<br>Zevceleri: Hatice, Sevde, Âişe, Hafsa, Zeyneb, Hind, Cüveyriye, Safiyye, Remle, Meymûne ve Mâriye." +
  "<br>Üç oğlu vardır: Kâsım, Abdullah ve İbrâhim. Kızları: Zeyneb, Rukiyye, Ümmü Külsûm ve Fâtıma." +
  "<br>Peygamberimizin sekiz torunu vardır: Ali ve Ümâme Zeyneb’in çocuklarıdır; Abdullah Rukiyye’nin oğludur; Hasan, Hüseyin, Muhsin, Ümmü Külsûm ve Zeyneb Fâtıma’nın çocuklarıdır." +
  "<br>On bir amcası ve altı halası vardır. Amcalarından bazıları: Hamza, Abbas, Ebû Tâlib ve Ebû Leheb. Tek bir dayısı vardır, adı Vehb oğlu Abdüyeğûs’tur; iki teyzesi vardır: Fâhite ve Füreyâ.";
var SOZLUK = [["عَائِلَةٌ", "aile"], ["وَالِدٌ", "baba"], ["جَدٌّ / جَدَّةٌ", "dede / nine"], ["قَبِيلَةٌ", "kabile"], ["مَشْهُورَةٌ", "meşhur, ünlü"], ["الرَّعْيُ", "çobanlık"], ["التِّجَارَةُ", "ticaret"], ["سِنٌّ", "yaş"], ["دُفِنَ", "defnedildi"], ["تَتَكَوَّنُ مِنْ", "…-den oluşur"], ["زَوْجَةٌ ج زَوْجَاتٌ", "eş, zevce"], ["وَلَدٌ ج أَوْلَادٌ", "oğul, çocuk"], ["حَفِيدٌ ج أَحْفَادٌ", "torun"], ["عَمٌّ / عَمَّةٌ", "amca / hala"], ["خَالٌ / خَالَةٌ", "dayı / teyze"], ["أُمٌّ مِنَ الرَّضَاعَةِ", "sütanne"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb"],
  goals: ["Okumadan önce kendi aileni düşünmek: nerede yaşıyor, kaç kişi, baban ne iş yapıyor", "Peygamberimizin ailesini anlatan metni okumak ve dinlemek", "Aile ve akrabalık kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "اسْمُ:- / وَالِدِهِ:cerr / عَبْدُ اللهِ،:mz / وَاسْمُ:- / أُمِّهِ:cerr / آمِنَةُ.:mz", tr: "Babasının adı Abdullah, annesinin adı Âmine.", pair: "اسْمُ:- / جَدِّهِ:cerr / عَبْدُ المُطَّلِبِ.:mz", pairTr: "Dedesinin adı Abdülmuttalib." },
    { s: "وُلِدَ ﷺ:- / بِمَكَّةَ المُكَرَّمَةِ.:nasb / عَمِلَ فِي:- / الرَّعْيِ:nasb / ثُمَّ فِي:- / التِّجَارَةِ.:nasb", tr: "Mekke’de doğdu. Önce çobanlık, sonra ticaret yaptı." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> Peygamberimizin (s.a.v.) ailesi: babası, annesi, dedesi, ninesi, kabilesi, doğduğu ve vefat ettiği yer, işi, zevceleri, çocukları, torunları, amcaları, halaları, dayısı ve teyzeleri." },
    { tr: "<b>Aileyi anlatma kalıpları:</b><br>• <span class=\"ar\">اسْمُ وَالِدِهِ…</span> babasının adı… · <span class=\"ar\">اسْمُ أُمِّهِ…</span> annesinin adı…<br>• <span class=\"ar\">تَتَكَوَّنُ العَائِلَةُ مِنْ…</span> aile …-den oluşur<br>• <span class=\"ar\">لَهُ ثَلَاثَةُ أَوْلَادٍ</span> üç oğlu var · <span class=\"ar\">لِلنَّبِيِّ خَالٌ وَاحِدٌ</span> Peygamberin bir dayısı var<br>• <span class=\"ar\">وُلِدَ بِـ… · مَاتَ فِي… · دُفِنَ فِي…</span> …-de doğdu · öldü · defnedildi" },
    { tr: "<b>ﷺ</b> = <span class=\"ar\">صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ</span>: Peygamberimizin adı anıldığında söylenir (s.a.v.)." },
    { tr: "<b>Okuma yolu:</b> Önce okuma öncesi soruları kendi ailen için cevapla, sonra metni oku ya da “Metni dinle” düğmesiyle dinle. Aile ağacına bak; bilmediğin kelimeyi sözlükte bul." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: أَيْنَ تَعِيشُ عَائِلَتُكَ؟ كَمْ شَخْصًا فِي عَائِلَتِكَ؟ مَاذَا يَعْمَلُ وَالِدُكَ؟ كَمْ أَخًا / أُخْتًا لَكَ؟", "اقْرَإِ النَّصَّ الآتِيَ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendi ailen için cevapla, metni oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "عَائِلَةُ النَّبِيِّ مُحَمَّدٍ ﷺ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "أَيْنَ تَعِيشُ عَائِلَتُكَ؟", a: "تَعِيشُ عَائِلَتِي فِي مَدِينَةِ إِسْطَنْبُولَ.", tr: "Ailen nerede yaşıyor? (Örnek cevap) Ailem İstanbul şehrinde yaşıyor." },
        { q: "كَمْ شَخْصًا فِي عَائِلَتِكَ؟", a: "فِي عَائِلَتِي خَمْسَةُ أَشْخَاصٍ.", tr: "Ailende kaç kişi var? Ailemde beş kişi var." },
        { q: "مَاذَا يَعْمَلُ وَالِدُكَ؟", a: "وَالِدِي مُعَلِّمٌ، يَعْمَلُ فِي مَدْرَسَةٍ.", tr: "Baban ne iş yapıyor? Babam öğretmen, bir okulda çalışıyor." },
        { q: "كَمْ أَخًا / أُخْتًا لَكَ؟", a: "لِي أَخٌ وَاحِدٌ وَأُخْتَانِ.", tr: "Kaç erkek / kız kardeşin var? Bir erkek kardeşim ve iki kız kardeşim var." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "اسْمُ وَالِدِ النَّبِيِّ ﷺ عَبْدُ اللهِ.", a: "d", why: "اسْمُ وَالِدِهِ عَبْدُ اللهِ بْنُ عَبْدِ المُطَّلِبِ." },
        { s: "اسْمُ أُمِّ النَّبِيِّ ﷺ فَاطِمَةُ.", a: "y", why: "Annesi Âmine (آمِنَةُ); Fâtıma ninesinin adı." },
        { s: "جَدُّ النَّبِيِّ ﷺ عَبْدُ المُطَّلِبِ.", a: "d", why: "اسْمُ جَدِّهِ عَبْدُ المُطَّلِبِ." },
        { s: "قُرَيْشٌ قَبِيلَةٌ عَرَبِيَّةٌ مَشْهُورَةٌ.", a: "d", why: "وَهِيَ قَبِيلَةٌ عَرَبِيَّةٌ مَشْهُورَةٌ." },
        { s: "وُلِدَ النَّبِيُّ ﷺ فِي المَدِينَةِ المُنَوَّرَةِ.", a: "y", why: "Mekke’de doğdu: وُلِدَ بِمَكَّةَ المُكَرَّمَةِ." },
        { s: "عَمِلَ النَّبِيُّ ﷺ فِي الرَّعْيِ ثُمَّ فِي التِّجَارَةِ.", a: "d", why: "Önce çobanlık, sonra ticaret." },
        { s: "دُفِنَ النَّبِيُّ ﷺ فِي مَكَّةَ المُكَرَّمَةِ.", a: "y", why: "Medine’de defnedildi: دُفِنَ فِي المَدِينَةِ المُنَوَّرَةِ." },
        { s: "مَاتَ النَّبِيُّ ﷺ وَسِنُّهُ ثَلَاثٌ وَسِتُّونَ سَنَةً.", a: "d", why: "كَانَ سِنُّهُ ثَلَاثًا وَسِتِّينَ عَامًا." },
        { s: "لِلنَّبِيِّ ﷺ أَرْبَعُ بَنَاتٍ.", a: "d", why: "زَيْنَبُ، وَرُقَيَّةُ، وَأُمُّ كُلْثُومٍ، وَفَاطِمَةُ." },
        { s: "الحَسَنُ وَالحُسَيْنُ ابْنَا زَيْنَبَ.", a: "y", why: "Hasan ve Hüseyin Fâtıma’nın oğulları; Zeyneb’in çocukları Ali ve Ümâme." },
        { s: "حَمْزَةُ وَالعَبَّاسُ مِنْ أَعْمَامِ النَّبِيِّ ﷺ.", a: "d", why: "مِنْ أَعْمَامِهِ: حَمْزَةُ، وَالعَبَّاسُ…" },
        { s: "لِلنَّبِيِّ ﷺ خَالَانِ.", a: "y", why: "Bir dayısı (خَالٌ وَاحِدٌ) ve iki teyzesi (خَالَتَانِ) var." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("اسْمُ جَدِّهِ عَبْدُ المُطَّلِبِ", "جَدِّهِ"), "dedesi", "amcası", "babası", "Dedesinin adı Abdülmuttalib.", "جَدٌّ: dede; جَدَّةٌ: nine."],
      [HL("مِنْ قَبِيلَةِ قُرَيْشٍ", "قَبِيلَةِ"), "kabile", "şehir", "ülke", "Kureyş kabilesinden.", "Çoğulu: قَبَائِلُ."],
      [HL("قَبِيلَةٌ عَرَبِيَّةٌ مَشْهُورَةٌ", "مَشْهُورَةٌ"), "meşhur, ünlü", "küçük", "uzak", "Meşhur bir Arap kabilesi.", "شُهْرَةٌ: ün."],
      [HL("عَمِلَ فِي الرَّعْيِ", "الرَّعْيِ"), "çobanlık", "ticaret", "tarım", "Çobanlık yaptı.", "رَاعٍ: çoban."],
      [HL("ثُمَّ فِي التِّجَارَةِ", "التِّجَارَةِ"), "ticaret", "yazı", "savaş", "Sonra ticaret.", "تَاجِرٌ: tüccar."],
      [HL("كَانَ سِنُّهُ ثَلَاثًا وَسِتِّينَ عَامًا", "سِنُّهُ"), "yaşı", "ailesi", "işi", "Altmış üç yaşındaydı.", "سِنٌّ = عُمْرٌ."],
      [HL("دُفِنَ فِي المَدِينَةِ المُنَوَّرَةِ", "دُفِنَ"), "defnedildi", "doğdu", "yaşadı", "Medine’de defnedildi.", "دَفَنَ: gömdü; meçhul: دُفِنَ."],
      [HL("تَتَكَوَّنُ مِنْ ثَلَاثَةِ أَوْلَادٍ", "تَتَكَوَّنُ"), "oluşur", "yaşar", "çalışır", "Üç oğuldan oluşur.", "تَكَوَّنَ مِنْ: …-den oluştu."],
      [HL("زَوْجَاتُهُ هُنَّ: خَدِيجَةُ…", "زَوْجَاتُهُ"), "zevceleri, eşleri", "kızları", "halaları", "Zevceleri: Hatice…", "Tekili: زَوْجَةٌ."],
      [HL("ثَمَانِيَةُ أَحْفَادٍ", "أَحْفَادٍ"), "torun", "amca", "kardeş", "Sekiz torun.", "Tekili: حَفِيدٌ."],
      [HL("أَحَدَ عَشَرَ عَمًّا، وَسِتُّ عَمَّاتٍ", "عَمَّاتٍ"), "hala", "teyze", "nine", "On bir amca ve altı hala.", "عَمَّةٌ: babanın kız kardeşi."],
      [HL("وَخَالَتَانِ هُمَا: فَاخِتَةُ وَفُرَيْعَةُ", "وَخَالَتَانِ"), "iki teyze", "iki hala", "iki kız", "İki teyzesi: Fâhite ve Füreyâ.", "خَالَةٌ: annenin kız kardeşi; ـتَانِ: ikil (müsennâ)."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama ve Aile Ağacı", short: "Anlama", col: "nasb", legend: ["cerr", "nasb"],
  goals: ["Metinle ilgili soruları cevaplamak", "Aile ağacındaki kişilerin Peygamberimizin nesi olduğunu bulmak", "Aile ağacından bilgi okumak: sütanneler, damatlar", "Soru kelimelerini doğru kullanmak: مَنْ، مَا، كَمْ، أَيْنَ"],
  examples: [
    { s: "كَمْ:cerr.Soru / عَمًّا لِلنَّبِيِّ ﷺ؟:-", tr: "Peygamberimizin kaç amcası var?", pair: "لَهُ:- / أَحَدَ عَشَرَ عَمًّا.:nasb", pairTr: "On bir amcası var." },
    { s: "أَيْنَ:cerr.Soru / مَاتَ النَّبِيُّ ﷺ؟:-", tr: "Peygamberimiz nerede vefat etti?", pair: "مَاتَ:- / فِي المَدِينَةِ المُنَوَّرَةِ.:nasb", pairTr: "Medine-i Münevvere’de vefat etti." }
  ],
  rules: [
    { tr: "Soru kelimesi cevabın türünü belirler:<br>• <span class=\"ar\">مَنْ</span> kim? · <span class=\"ar\">مَا اسْمُ…؟</span> …-in adı ne?<br>• <span class=\"ar\">أَيْنَ</span> nerede? · <span class=\"ar\">كَمْ</span> kaç? (ardından tekil mansûb isim: <span class=\"ar\">كَمْ عَمًّا؟ كَمْ شَخْصًا؟</span>)" },
    { tr: "<b>Aile ağacı:</b> Babası <span class=\"ar\">عَبْدُ اللهِ</span>, annesi <span class=\"ar\">آمِنَةُ</span>; sütanneleri (<span class=\"ar\">أُمَّهَاتُهُ مِنَ الرَّضَاعَةِ</span>) <span class=\"ar\">ثُوَيْبَةُ</span> ve <span class=\"ar\">حَلِيمَةُ السَّعْدِيَّةُ</span>. Oğulları <span class=\"ar\">القَاسِمُ، عَبْدُ اللهِ، إِبْرَاهِيمُ</span>; kızları <span class=\"ar\">زَيْنَبُ، رُقَيَّةُ، أُمُّ كُلْثُومٍ، فَاطِمَةُ</span>." },
    { tr: "<b>Damatlar:</b> <span class=\"ar\">زَيْنَبُ</span> ← <span class=\"ar\">أَبُو العَاصِ بْنُ الرَّبِيعِ</span> · <span class=\"ar\">رُقَيَّةُ</span> ← <span class=\"ar\">عُثْمَانُ بْنُ عَفَّانَ</span>, onun vefatından sonra <span class=\"ar\">أُمُّ كُلْثُومٍ</span> da Osman’la evlendi · <span class=\"ar\">فَاطِمَةُ</span> ← <span class=\"ar\">عَلِيُّ بْنُ أَبِي طَالِبٍ</span>." },
    { tr: "<b>Dikkat:</b> Bazı adlar ailede birden çok kez geçer: <span class=\"ar\">زَيْنَبُ</span> hem zevcesi, hem kızı, hem torunu; <span class=\"ar\">عَبْدُ اللهِ</span> hem babası, hem oğlu, hem torunu. Hangisi olduğunu cümleden anla." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَنْ نَبِيُّنَا ﷺ؟ مَا اسْمُ جَدِّ رَسُولِنَا ﷺ؟ كَمْ عَدَدُ أَبْنَاءِ نَبِيِّنَا مُحَمَّدٍ ﷺ وَبَنَاتِهِ؟ كَمْ عَدَدُ أَحْفَادِ مُحَمَّدٍ ﷺ؟ أَيْنَ مَاتَ النَّبِيُّ مُحَمَّدٌ ﷺ وَأَيْنَ دُفِنَ؟ كَمْ عَمًّا لِلنَّبِيِّ مُحَمَّدٍ ﷺ؟"],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مَنْ نَبِيُّنَا ﷺ؟", "نَبِيُّنَا مُحَمَّدٌ ﷺ.", "نَبِيُّنَا عَبْدُ اللهِ.", "نَبِيُّنَا عَبْدُ المُطَّلِبِ.", "Peygamberimiz kimdir? Muhammed (s.a.v.).", "رَسُولُنَا ﷺ اسْمُهُ مُحَمَّدٌ. Abdullah babası, Abdülmuttalib dedesi."],
      ["مَا اسْمُ جَدِّ رَسُولِنَا ﷺ؟", "اسْمُ جَدِّهِ عَبْدُ المُطَّلِبِ.", "اسْمُ جَدِّهِ وَهْبٌ.", "اسْمُ جَدِّهِ أَبُو طَالِبٍ.", "Dedesinin adı ne? Abdülmuttalib.", "Vehb annesinin babası; Ebû Tâlib amcası."],
      ["كَمْ عَدَدُ أَبْنَاءِ نَبِيِّنَا مُحَمَّدٍ ﷺ وَبَنَاتِهِ؟", "ثَلَاثَةُ أَبْنَاءٍ وَأَرْبَعُ بَنَاتٍ.", "أَرْبَعَةُ أَبْنَاءٍ وَثَلَاثُ بَنَاتٍ.", "ثَمَانِيَةُ أَبْنَاءٍ.", "Kaç oğlu ve kızı var? Üç oğul, dört kız.", "تَتَكَوَّنُ مِنْ ثَلَاثَةِ أَوْلَادٍ وَأَرْبَعِ بَنَاتٍ. Sekiz, torunlarının sayısı."],
      ["كَمْ عَدَدُ أَحْفَادِ مُحَمَّدٍ ﷺ؟", "ثَمَانِيَةُ أَحْفَادٍ.", "أَحَدَ عَشَرَ حَفِيدًا.", "سِتَّةُ أَحْفَادٍ.", "Kaç torunu var? Sekiz.", "Zeyneb’den 2, Rukiyye’den 1, Fâtıma’dan 5 = 8."],
      ["أَيْنَ مَاتَ النَّبِيُّ مُحَمَّدٌ ﷺ وَأَيْنَ دُفِنَ؟", "مَاتَ وَدُفِنَ فِي المَدِينَةِ المُنَوَّرَةِ.", "مَاتَ فِي مَكَّةَ وَدُفِنَ فِي المَدِينَةِ.", "مَاتَ وَدُفِنَ فِي مَكَّةَ المُكَرَّمَةِ.", "Nerede vefat etti ve nereye defnedildi? Medine’de.", "Mekke doğduğu yer."],
      ["كَمْ عَمًّا لِلنَّبِيِّ مُحَمَّدٍ ﷺ؟", "أَحَدَ عَشَرَ عَمًّا.", "سِتَّةُ أَعْمَامٍ.", "أَرْبَعَةُ أَعْمَامٍ.", "Kaç amcası var? On bir.", "Altı, halalarının sayısı; dördünün adı metinde geçer."]
    ])},
    { type: "classify", extra: true, opts: AKRABA, ar: "مَنْ هُوَ / مَنْ هِيَ؟", tr: "Bu kişi Peygamberimizin nesi: zevcesi, oğlu, kızı, torunu, amcası, halası?", items: CL([
      ["خَدِيجَةُ", "z", "İlk zevcesi."], ["عَائِشَةُ", "z", "Zevcesi."], ["حَفْصَةُ", "z", "Zevcesi."], ["سَوْدَةُ", "z", "Zevcesi."], ["مَيْمُونَةُ", "z", "Zevcesi."], ["جُوَيْرِيَةُ", "z", "Zevcesi."],
      ["القَاسِمُ", "o", "Üç oğlundan biri."], ["إِبْرَاهِيمُ", "o", "Üç oğlundan biri."],
      ["رُقَيَّةُ", "k", "Dört kızından biri."], ["فَاطِمَةُ (زَوْجَةُ عَلِيٍّ)", "k", "Kızı; Ali’nin eşi."],
      ["الحَسَنُ", "t", "Fâtıma’nın oğlu."], ["الحُسَيْنُ", "t", "Fâtıma’nın oğlu."], ["أُمَامَةُ", "t", "Zeyneb’in kızı."], ["مُحْسِنٌ", "t", "Fâtıma’nın oğlu."],
      ["حَمْزَةُ", "a", "Amcası."], ["العَبَّاسُ", "a", "Amcası."], ["أَبُو طَالِبٍ", "a", "Amcası; Ali’nin babası."], ["أَبُو لَهَبٍ", "a", "Amcası."],
      ["عَاتِكَةُ", "h", "Halası."], ["أَرْوَى", "h", "Halası."], ["أُمَيْمَةُ", "h", "Halası."], ["بَرَّةُ", "h", "Halası."]
    ]) },
    { type: "pick", extra: true, ar: "أَجِبْ مِنْ شَجَرَةِ العَائِلَةِ", tr: "Metindeki ve aile ağacındaki bilgiye göre doğru cevabı seç.", items: PL([
      ["مَا اسْمُ أُمِّ النَّبِيِّ ﷺ؟", "آمِنَةُ بِنْتُ وَهْبٍ.", "فَاطِمَةُ.", "حَلِيمَةُ السَّعْدِيَّةُ.", "Annesinin adı? Vehb kızı Âmine.", "Fâtıma ninesi; Halîme sütannesi."],
      ["مَنْ أُمَّهَاتُهُ مِنَ الرَّضَاعَةِ؟", "ثُوَيْبَةُ وَحَلِيمَةُ السَّعْدِيَّةُ.", "آمِنَةُ وَفَاطِمَةُ.", "خَدِيجَةُ وَسَوْدَةُ.", "Sütanneleri kimler? Süveybe ve Halîme es-Sa’diyye.", "Aile ağacında: أُمَّهَاتُهُ مِنَ الرَّضَاعَةِ."],
      ["مَنْ زَوْجُ فَاطِمَةَ؟", "عَلِيُّ بْنُ أَبِي طَالِبٍ.", "عُثْمَانُ بْنُ عَفَّانَ.", "أَبُو العَاصِ بْنُ الرَّبِيعِ.", "Fâtıma’nın eşi kim? Ali b. Ebî Tâlib.", "Hasan ve Hüseyin’in babası."],
      ["مَنْ زَوْجُ رُقَيَّةَ؟", "عُثْمَانُ بْنُ عَفَّانَ.", "عَلِيُّ بْنُ أَبِي طَالِبٍ.", "حَمْزَةُ.", "Rukiyye’nin eşi kim? Osman b. Affân.", "Rukiyye’nin vefatından sonra Ümmü Külsûm’le evlendi."],
      ["مَنْ زَوْجُ زَيْنَبَ بِنْتِ النَّبِيِّ ﷺ؟", "أَبُو العَاصِ بْنُ الرَّبِيعِ.", "عُثْمَانُ بْنُ عَفَّانَ.", "العَبَّاسُ.", "Zeyneb’in eşi kim? Ebü’l-Âs b. Rebî’.", "Ali ve Ümâme’nin babası."],
      ["كَمْ عَمَّةً لِلنَّبِيِّ ﷺ؟", "سِتُّ عَمَّاتٍ.", "أَحَدَ عَشَرَ عَمَّةً.", "عَمَّتَانِ.", "Kaç halası var? Altı.", "صَفِيَّةُ، عَاتِكَةُ، أَرْوَى، أُمَيْمَةُ، بَرَّةُ، أُمُّ حَكِيمٍ."],
      ["مَنْ خَالُ النَّبِيِّ ﷺ؟", "عَبْدُ يَغُوثَ بْنُ وَهْبٍ.", "أَبُو لَهَبٍ.", "عَبْدُ المُطَّلِبِ.", "Dayısı kim? Vehb oğlu Abdüyeğûs.", "Annesi Âmine’nin kardeşi; خَالٌ: annenin erkek kardeşi."],
      ["مَنْ عَبْدُ اللهِ بْنُ رُقَيَّةَ؟", "حَفِيدُ النَّبِيِّ ﷺ.", "وَالِدُ النَّبِيِّ ﷺ.", "عَمُّ النَّبِيِّ ﷺ.", "Rukiyye’nin oğlu Abdullah kim? Torunu.", "Babası Abdullah b. Abdülmuttalib’dir; ad aynı, kişi başka."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Zıt ve Eş Anlam", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Uygun kelimeyi metindeki boşluğa yerleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Akrabalık kelimelerinin çoğullarını tanımak"],
  examples: [
    { s: "كَبِيرَةٌ:mz.Kelime / ≠ صَغِيرَةٌ:cerr.Zıt", tr: "büyük ≠ küçük (zıt: ضِدٌّ / عَكْسٌ)", pair: "وُلِدَ:mz.Kelime / ≠ مَاتَ:cerr.Zıt", pairTr: "doğdu ≠ öldü" },
    { s: "أُسْرَةٌ:mz.Kelime / = عَائِلَةٌ:nasb.Eş", tr: "aile = aile (eş: مُرَادِفٌ)", pair: "تُوُفِّيَ:mz.Kelime / = مَاتَ:nasb.Eş", pairTr: "vefat etti = öldü" }
  ],
  rules: [
    { tr: "<b>Zıt anlam</b> (<span class=\"ar\">العَكْسُ</span>): <span class=\"ar\">كَبِيرَةٌ ≠ صَغِيرَةٌ · وُلِدَ ≠ مَاتَ · نَشِيطٌ ≠ كَسُولٌ · مُتَزَوِّجٌ ≠ أَعْزَبُ</span>." },
    { tr: "<b>Eş anlam</b> (<span class=\"ar\">المُرَادِفُ</span>): <span class=\"ar\">أُسْرَةٌ = عَائِلَةٌ · عُمْرٌ = سِنٌّ · عَامٌ = سَنَةٌ · أَبٌ = وَالِدٌ · أُمٌّ = وَالِدَةٌ · تُوُفِّيَ = مَاتَ</span>." },
    { tr: "Boşluk doldururken cümlenin anlamına ve kelimenin biçimine bak: kadın için <span class=\"ar\">هِيَ، عُمْرُهَا</span>; <span class=\"ar\">يَعْمَلُ</span> fiilinden sonra mansûb: <span class=\"ar\">يَعْمَلُ طَبِيبًا</span>; tamlamada <span class=\"ar\">أَيَّامِ العُطْلَةِ</span>." },
    { tr: "Kelimelerin çoğullarını, eş ve zıt anlamlılarını “Kelime Hazinesi” sekmesinde aralıklı tekrarla ve oyunlarla ezberleyebilirsin." }
  ],
  kaide: ["٢ ـ امْلَإِ الفَرَاغَاتِ مُسْتَخْدِمًا الكَلِمَاتِ الآتِيَةَ: (كَبِيرَةٌ، عَائِلَةُ، هِيَ، أُمٍّ، وَالِدُ، تَسْكُنُ، عَمَلِهِ، طَبِيبًا، عُمْرُهَا، العُطْلَةِ، أُخْتَانِ).", "٤ ـ صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا فِي الجَدْوَلِ الآتِي. ٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِي الجَدْوَلِ الآتِي."],
  ex: [
    { type: "bank", num: "٢", ar: "امْلَإِ الفَرَاغَاتِ مُسْتَخْدِمًا الكَلِمَاتِ الآتِيَةَ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Her kelime bir kez kullanılır.", bank: ["كَبِيرَةٌ", "عَائِلَةُ", "هِيَ", "أُمٍّ", "وَالِدُ", "تَسْكُنُ", "عَمَلِهِ", "طَبِيبًا", "عُمْرُهَا", "العُطْلَةِ", "أُخْتَانِ"],
      tr2: "1) Hâlid’in ailesi Ürdün’de yaşıyor; büyük bir ailedir: bir baba, bir anne, üç oğul ve iki kızdan oluşur. Aile başkent Amman’da oturuyor. 2) Hâlid’in babası altmış yaşında, doktor olarak çalışıyor, işinde çalışkandır. 3) Hâlid’in annesinin adı Meryem, elli beş yaşında, Ürdün Üniversitesinde öğretmen. 4) Hâlid’in iki erkek ve iki kız kardeşi var; tatil günlerinde onlarla oynuyor.",
      parts: ["١ ـ تَعِيشُ", { a: [1] }, "خَالِدٍ فِي الأُرْدُنِّ، وَهِيَ عَائِلَةٌ", { a: [0] }, "، تَتَكَوَّنُ مِنْ أَبٍ وَ", { a: [3] }, "وَثَلَاثَةِ أَوْلَادٍ وَبِنْتَيْنِ.", { a: [5] }, "العَائِلَةُ فِي العَاصِمَةِ عَمَّانَ.<br>٢ ـ", { a: [4] }, "خَالِدٍ عُمْرُهُ سِتُّونَ سَنَةً، هُوَ يَعْمَلُ", { a: [7] }, "، هُوَ نَشِيطٌ فِي", { a: [6] }, ".<br>٣ ـ وَالِدَةُ خَالِدٍ اسْمُهَا مَرْيَمُ،", { a: [8] }, "خَمْسٌ وَخَمْسُونَ سَنَةً،", { a: [2] }, "مُعَلِّمَةٌ فِي الجَامِعَةِ الأُرْدُنِّيَّةِ.<br>٤ ـ لِخَالِدٍ أَخَوَانِ وَ", { a: [10] }, "، يَلْعَبُ خَالِدٌ مَعَهُمَا فِي أَيَّامِ", { a: [9] }, "."] },
    { type: "bank", num: "٤", ar: "صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا فِي الجَدْوَلِ الآتِي", tr: "Önce aşağıdan (ب sütunu) zıt anlamlıyı seç, sonra kelimenin (أ sütunu) kutusuna dokun.", bank: ["كَسُولٌ", "أَعْزَبُ", "صَغِيرَةٌ", "مَاتَ"], items: [
      { pre: "كَبِيرَةٌ ≠", a: [2], tr: "büyük ≠ küçük" }, { pre: "وُلِدَ ≠", a: [3], tr: "doğdu ≠ öldü" }, { pre: "نَشِيطٌ ≠", a: [0], tr: "çalışkan ≠ tembel" }, { pre: "مُتَزَوِّجٌ ≠", a: [1], tr: "evli ≠ bekâr" }
    ]},
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِي الجَدْوَلِ الآتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["سِنٌّ", "عَائِلَةٌ", "مَاتَ", "وَالِدَةٌ", "وَالِدٌ", "سَنَةٌ"], items: [
      { pre: "أُسْرَةٌ =", a: [1], tr: "aile = aile" }, { pre: "عُمْرٌ =", a: [0], tr: "yaş = yaş" }, { pre: "عَامٌ =", a: [5], tr: "yıl = sene" }, { pre: "أَبٌ =", a: [4], tr: "baba = baba (vâlid)" }, { pre: "أُمٌّ =", a: [3], tr: "anne = anne (vâlide)" }, { pre: "تُوُفِّيَ =", a: [2], tr: "vefat etti = öldü" }
    ]},
    { type: "pick", fill: true, extra: true, ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Metindeki kelimenin çoğulunu seç.", items: PL([
      ["عَمٌّ ← ___", "أَعْمَامٌ", "عَمَّاتٌ", "عُمُومٌ", "amca → amcalar", "أَفْعَالٌ kalıbı. عَمَّاتٌ halaların çoğulu."],
      ["عَمَّةٌ ← ___", "عَمَّاتٌ", "أَعْمَامٌ", "عَمَائِمُ", "hala → halalar", "Cem-i müennes sâlim."],
      ["خَالٌ ← ___", "أَخْوَالٌ", "خَالَاتٌ", "خُيُولٌ", "dayı → dayılar", "أَفْعَالٌ kalıbı."],
      ["حَفِيدٌ ← ___", "أَحْفَادٌ", "حُفَدَاءُ", "حَفِيدَاتٌ", "torun → torunlar", "أَفْعَالٌ kalıbı."],
      ["زَوْجَةٌ ← ___", "زَوْجَاتٌ", "أَزْوَاجٌ", "زَوَائِجُ", "zevce → zevceler", "Cem-i müennes sâlim; أَزْوَاجٌ, زَوْجٌ’un çoğulu."],
      ["بِنْتٌ ← ___", "بَنَاتٌ", "أَبْنَاءٌ", "بِنْتَاتٌ", "kız → kızlar", "أَبْنَاءٌ, ابْنٌ’in çoğulu."],
      ["وَلَدٌ ← ___", "أَوْلَادٌ", "وِلَادَاتٌ", "وُلُودٌ", "oğul → oğullar, çocuklar", "أَفْعَالٌ kalıbı."],
      ["قَبِيلَةٌ ← ___", "قَبَائِلُ", "قَبِيلَاتٌ", "قُبُولٌ", "kabile → kabileler", "فَعَائِلُ kalıbı."],
      ["جَدٌّ ← ___", "أَجْدَادٌ", "جَدَّاتٌ", "جِدَّانٌ", "dede → dedeler", "أَفْعَالٌ kalıbı. جَدَّاتٌ, جَدَّةٌ’nin çoğulu."],
      ["ابْنٌ ← ___", "أَبْنَاءٌ", "بَنَاتٌ", "ابْنَاتٌ", "oğul → oğullar", "أَفْعَالٌ kalıbı."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · AKRABALIK VE CÜMLE
{
  id: "u4", no: 4, ar: "القَرَابَةُ وَتَكْوِينُ الجُمَلِ", tr: "Akrabalık Adları ve Cümle Kurma", short: "Akrabalık", col: "ref", legend: [],
  goals: ["Akrabalık adlarını tanımlamak: amca, hala, dayı, teyze, dede, nine, torun", "Karışık kelimelerden anlamlı cümle kurmak", "Kendi aileni Arapça tanıtmak", "Erkek ve kadın için doğru zamiri kullanmak: هُوَ / هِيَ، عُمْرُهُ / عُمْرُهَا"],
  examples: [
    { s: "وَالِدُ:mz.Kişi / أَبِي:cerr.Babam / هُوَ:- / جَدِّي:nasb.Dedem", tr: "Babamın babası dedemdir.", pair: "وَالِدَةُ:mz.Kişi / أُمِّي:cerr.Annem / هِيَ:- / جَدَّتِي:nasb.Ninem", pairTr: "Annemin annesi ninemdir." },
    { s: "عَمِّي:nasb.Amcam / هُوَ:- / أَخُو:mz.Kardeşi / أَبِي:cerr.Babam", tr: "Amcam babamın erkek kardeşidir.", pair: "خَالَتِي:nasb.Teyzem / هِيَ:- / أُخْتُ:mz.Kardeşi / أُمِّي:cerr.Annem", pairTr: "Teyzem annemin kız kardeşidir." }
  ],
  rules: [
    { tr: "<b>Baba tarafı</b>: <span class=\"ar\">عَمٌّ</span> amca (babanın erkek kardeşi) · <span class=\"ar\">عَمَّةٌ</span> hala (babanın kız kardeşi).<br><b>Anne tarafı</b>: <span class=\"ar\">خَالٌ</span> dayı (annenin erkek kardeşi) · <span class=\"ar\">خَالَةٌ</span> teyze (annenin kız kardeşi)." },
    { tr: "<span class=\"ar\">جَدٌّ</span> dede · <span class=\"ar\">جَدَّةٌ</span> nine · <span class=\"ar\">حَفِيدٌ / حَفِيدَةٌ</span> erkek / kız torun (oğlunun ya da kızının çocuğu)." },
    { tr: "<b>Erkek – kadın uyumu:</b> erkek için <span class=\"ar\">هُوَ، عُمْرُهُ، يَسْكُنُ</span>; kadın için <span class=\"ar\">هِيَ، عُمْرُهَا، تَسْكُنُ</span>. <span class=\"ar\">أَخُو أَبِي</span> ama <span class=\"ar\">أُخْتُ أَبِي</span>." },
    { tr: "<b>Cümle kurarken:</b> Fiil cümlesi fiille başlar (<span class=\"ar\">عَمِلَ النَّبِيُّ…</span>); tamlamada muzâf ile muzâfun ileyh ayrılmaz: <span class=\"ar\">عَائِلَةُ النَّبِيِّ، مَكَّةَ المُكَرَّمَةِ</span>. Haber önce gelebilir: <span class=\"ar\">لِخَالِي بِنْتٌ وَوَلَدٌ</span>." }
  ],
  kaide: ["٣ ـ امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ كَمَا فِي المِثَالِ: وَالِدُ أَبِي هُوَ جَدِّي، وَالِدَةُ أُمِّي هِيَ جَدَّتِي.", "٦ ـ كَوِّنْ جُمَلًا مِنَ الكَلِمَاتِ الآتِيَةِ. ٧ ـ امْلَإِ الفَرَاغَ كَمَا فِي المِثَالِ: وَالِدِي … أَحْمَدُ، هُوَ … مُعَلِّمٌ، عُمْرُهُ … ثَلَاثُونَ سَنَةً، يَسْكُنُ فِي … إِسْطَنْبُولَ."],
  ex: [
    { type: "bank", num: "٣", reuse: true, ar: "امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ كَمَا فِي المِثَالِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Bir kelime birden çok kez kullanılabilir.", exHtml: '<span class="ar">وَالِدُ أَبِي هُوَ جَدِّي، وَالِدَةُ أُمِّي هِيَ جَدَّتِي.</span>', bank: ["أُمِّي", "أَبِي", "ابْنِي / بِنْتِي"], items: [
      { pre: "خَالِي هُوَ أَخُو", a: [0], tr: "Dayım annemin erkek kardeşidir." }, { pre: "عَمِّي هُوَ أَخُو", a: [1], tr: "Amcam babamın erkek kardeşidir." }, { pre: "خَالَتِي هِيَ أُخْتُ", a: [0], tr: "Teyzem annemin kız kardeşidir." }, { pre: "عَمَّتِي هِيَ أُخْتُ", a: [1], tr: "Halam babamın kız kardeşidir." }, { pre: "حَفِيدِي هُوَ ابْنُ", a: [2], tr: "Torunum oğlumun ya da kızımın oğludur." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "مَنْ هُوَ؟ مَنْ هِيَ؟", tr: "Tanıma uygun akrabalık adını seç.", items: PL([
      ["أَبُو أُمِّي هُوَ ___.", "جَدِّي", "عَمِّي", "خَالِي", "Annemin babası dedemdir.", "Annenin de babanın da babası: جَدٌّ."],
      ["أُمُّ أَبِي هِيَ ___.", "جَدَّتِي", "عَمَّتِي", "خَالَتِي", "Babamın annesi ninemdir.", "جَدَّةٌ"],
      ["أُخْتُ أَبِي هِيَ ___.", "عَمَّتِي", "خَالَتِي", "أُخْتِي", "Babamın kız kardeşi halamdır.", "Baba tarafı: عَمٌّ / عَمَّةٌ."],
      ["أَخُو أُمِّي هُوَ ___.", "خَالِي", "عَمِّي", "أَخِي", "Annemin erkek kardeşi dayımdır.", "Anne tarafı: خَالٌ / خَالَةٌ."],
      ["بِنْتُ ابْنِي هِيَ ___.", "حَفِيدَتِي", "بِنْتِي", "أُخْتِي", "Oğlumun kızı torunumdur.", "حَفِيدَةٌ: kız torun."],
      ["ابْنُ أَبِي وَأُمِّي هُوَ ___.", "أَخِي", "عَمِّي", "ابْنِي", "Babamın ve annemin oğlu kardeşimdir.", "أَخٌ"],
      ["عَبْدُ المُطَّلِبِ ___ النَّبِيِّ ﷺ.", "جَدُّ", "عَمُّ", "خَالُ", "Abdülmuttalib Peygamberimizin dedesidir.", "Babası Abdullah’ın babası."],
      ["فَاخِتَةُ ___ النَّبِيِّ ﷺ.", "خَالَةُ", "عَمَّةُ", "جَدَّةُ", "Fâhite Peygamberimizin teyzesidir.", "Annesi Âmine’nin kız kardeşi."]
    ])},
    { type: "bank", num: "٦", reuse: true, ar: "كَوِّنْ جُمَلًا مِنَ الكَلِمَاتِ الآتِيَةِ", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["النَّبِيُّ", "مُحَمَّدٌ ﷺ", "فِي", "التِّجَارَةِ", "وَالرَّعْيِ", "عَائِلَةُ", "النَّبِيِّ", "مُحَمَّدٍ ﷺ", "مِنِ", "اثْنَيْ عَشَرَ", "شَخْصًا", "نَبِيُّنَا ﷺ", "مَكَّةَ المُكَرَّمَةِ", "وَدُفِنَ", "المَدِينَةِ المُنَوَّرَةِ", "سُلَيْمَانَ", "بِنْتٌ", "وَوَلَدٌ"],
      tr2: "1) Peygamber Muhammed (s.a.v.) ticarette ve çobanlıkta çalıştı. 2) Peygamber Muhammed’in (s.a.v.) ailesi on iki kişiden oluşur. 3) Peygamberimiz (s.a.v.) Mekke-i Mükerreme’de doğdu ve Medine-i Münevvere’ye defnedildi. 4) Dayım Süleyman’ın bir kızı ve bir oğlu var.",
      parts: ["١ ـ عَمِلَ", { a: [0] }, { a: [1] }, { a: [2] }, { a: [3] }, { a: [4] }, ".<br>٢ ـ تَتَكَوَّنُ", { a: [5] }, { a: [6] }, { a: [7] }, { a: [8] }, { a: [9] }, { a: [10] }, ".<br>٣ ـ وُلِدَ", { a: [11] }, { a: [2] }, { a: [12] }, { a: [13] }, { a: [2] }, { a: [14] }, ".<br>٤ ـ لِخَالِي", { a: [15] }, { a: [16] }, { a: [17] }, "."] },
    { type: "reading", num: "٧", ar: "امْلَإِ الفَرَاغَ كَمَا فِي المِثَالِ", tr: "Örnek metni oku; yönlendirici kalıplarla kendi aileni defterine yaz, sonra akrabanın kim olduğunu seç.", title: "عَائِلَتِي (نَمُوذَجٌ)", speak: true,
      text: "وَالِدِي أَحْمَدُ، هُوَ مُعَلِّمٌ، عُمْرُهُ ثَلَاثُونَ سَنَةً، يَسْكُنُ فِي إِسْطَنْبُولَ.<br>وَالِدَتِي مَرْيَمُ، هِيَ طَبِيبَةٌ، عُمْرُهَا سَبْعٌ وَعِشْرُونَ سَنَةً، تَسْكُنُ فِي إِسْطَنْبُولَ.<br>جَدِّي يُوسُفُ، هُوَ تَاجِرٌ، عُمْرُهُ سَبْعُونَ سَنَةً، يَسْكُنُ فِي قُونِيَةَ.<br>عَمِّي عُمَرُ، هُوَ مُهَنْدِسٌ، عُمْرُهُ أَرْبَعُونَ سَنَةً، يَسْكُنُ فِي أَنْقَرَةَ.<br>خَالَتِي فَاطِمَةُ، هِيَ مُعَلِّمَةٌ، عُمْرُهَا خَمْسٌ وَثَلَاثُونَ سَنَةً، تَسْكُنُ فِي بُورْصَةَ.",
      textTr: "Babam Ahmed, öğretmen, otuz yaşında, İstanbul’da oturuyor. · Annem Meryem, doktor, yirmi yedi yaşında, İstanbul’da oturuyor. · Dedem Yusuf, tüccar, yetmiş yaşında, Konya’da oturuyor. · Amcam Ömer, mühendis, kırk yaşında, Ankara’da oturuyor. · Teyzem Fâtıma, öğretmen, otuz beş yaşında, Bursa’da oturuyor.",
      qa: [
        { q: "وَالِدِي … ، هُوَ … ، عُمْرُهُ … ، يَسْكُنُ فِي …", a: "وَالِدِي مُصْطَفَى، هُوَ مُوَظَّفٌ، عُمْرُهُ خَمْسُونَ سَنَةً، يَسْكُنُ فِي إِزْمِيرَ.", tr: "Babanı yaz. (Örnek: Babam Mustafa, memur, elli yaşında, İzmir’de oturuyor.)" },
        { q: "وَالِدَتِي … ، هِيَ … ، عُمْرُهَا … ، تَسْكُنُ فِي …", a: "وَالِدَتِي عَائِشَةُ، هِيَ رَبَّةُ بَيْتٍ، عُمْرُهَا خَمْسٌ وَأَرْبَعُونَ سَنَةً، تَسْكُنُ فِي إِزْمِيرَ.", tr: "Anneni yaz. (Örnek: Annem Âişe, ev hanımı, kırk beş yaşında.) Kadın için هِيَ، عُمْرُهَا، تَسْكُنُ." },
        { q: "أَخِي / أُخْتِي … ، جَدِّي / جَدَّتِي …", a: "أُخْتِي زَيْنَبُ، هِيَ طَالِبَةٌ، عُمْرُهَا عِشْرُونَ سَنَةً، تَسْكُنُ فِي أَنْقَرَةَ.", tr: "Kardeşini, dedeni ya da nineni yaz." },
        { q: "عَمِّي / عَمَّتِي / خَالِي / خَالَتِي …", a: "خَالِي عَلِيٌّ، هُوَ طَبِيبٌ، عُمْرُهُ أَرْبَعُونَ سَنَةً، يَسْكُنُ فِي سَامْسُونَ.", tr: "Amcanı, halanı, dayını ya da teyzeni yaz." }
      ],
      cls: { opts: YAKIN, ar: "مَنْ هُوَ؟ مَنْ هِيَ؟", tr: "Tanıma uygun akrabalık adını seç: amca, hala, dayı, teyze, dede, nine?", items: [
        { s: "أَخُو أَبِي", a: "am", why: "Babanın erkek kardeşi: عَمٌّ." },
        { s: "أُخْتُ أُمِّي", a: "ht", why: "Annenin kız kardeşi: خَالَةٌ." },
        { s: "أَبُو أَبِي", a: "cd", why: "Babanın babası: جَدٌّ." },
        { s: "أُمُّ أُمِّي", a: "cn", why: "Annenin annesi: جَدَّةٌ." },
        { s: "أُخْتُ أَبِي", a: "ah", why: "Babanın kız kardeşi: عَمَّةٌ." },
        { s: "أَخُو أُمِّي", a: "hl", why: "Annenin erkek kardeşi: خَالٌ." },
        { s: "وَالِدُ أُمِّي", a: "cd", why: "Annenin babası da جَدٌّ." },
        { s: "حَمْزَةُ لِلنَّبِيِّ ﷺ", a: "am", why: "Hamza, Peygamberimizin amcası." },
        { s: "صَفِيَّةُ بِنْتُ عَبْدِ المُطَّلِبِ لِلنَّبِيِّ ﷺ", a: "ah", why: "Babası Abdullah’ın kız kardeşi: halası." },
        { s: "عَبْدُ يَغُوثَ بْنُ وَهْبٍ لِلنَّبِيِّ ﷺ", a: "hl", why: "Annesi Âmine’nin erkek kardeşi: dayısı." }
      ]}
    },
    { type: "pick", fill: true, extra: true, ar: "هُوَ أَمْ هِيَ؟", tr: "Erkek mi kadın mı? Uygun biçimi seç.", items: PL([
      ["خَالَتِي فَاطِمَةُ، ___ مُعَلِّمَةٌ.", "هِيَ", "هُوَ", "أَنَا", "Teyzem Fâtıma öğretmendir.", "Kadın: هِيَ."],
      ["عَمِّي عُمَرُ، ___ أَرْبَعُونَ سَنَةً.", "عُمْرُهُ", "عُمْرُهَا", "عُمْرِي", "Amcam Ömer kırk yaşında.", "Erkek: ـهُ."],
      ["جَدَّتِي ___ فِي قَرْيَةٍ صَغِيرَةٍ.", "تَسْكُنُ", "يَسْكُنُ", "أَسْكُنُ", "Ninem küçük bir köyde oturuyor.", "Kadın (هِيَ): تَـ."],
      ["جَدِّي ___ فِي التِّجَارَةِ.", "يَعْمَلُ", "تَعْمَلُ", "نَعْمَلُ", "Dedem ticarette çalışıyor.", "Erkek (هُوَ): يَـ."],
      ["عَمَّتِي زَيْنَبُ، ___ خَمْسُونَ سَنَةً.", "عُمْرُهَا", "عُمْرُهُ", "عُمْرُكَ", "Halam Zeyneb elli yaşında.", "Kadın: ـهَا."],
      ["خَالِي ___ طَبِيبٌ.", "هُوَ", "هِيَ", "نَحْنُ", "Dayım doktordur.", "Erkek: هُوَ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · MUZÂRİ FİİL
{
  id: "u5", no: 5, ar: "الفِعْلُ المُضَارِعُ مَعَ الضَّمَائِرِ", tr: "Muzâri Fiil ve Zamirler", short: "Fiil", col: "muz", legend: ["ref", "mi"],
  goals: ["Muzâri fiilin başındaki harften öznesini tanımak: أَـ، نَـ، تَـ، يَـ", "Kadına hitapta ـِينَ ekini kullanmak: تَسْكُنِينَ", "Cümleye uygun fiili seçmek", "Fiil tablosunu altı zamirle doldurmak"],
  examples: [
    { s: "أَنَا:ref / أَدْرُسُ:mi", tr: "Ben ders çalışıyorum.", pair: "نَحْنُ:ref / نَدْرُسُ:mi", pairTr: "Biz ders çalışıyoruz." },
    { s: "أَنْتَ:ref / تَدْرُسُ:mi", tr: "Sen (erkek) ders çalışıyorsun.", pair: "أَنْتِ:ref / تَدْرُسِينَ:mi", pairTr: "Sen (kadın) ders çalışıyorsun." },
    { s: "هُوَ:ref / يَدْرُسُ:mi", tr: "O (erkek) ders çalışıyor.", pair: "هِيَ:ref / تَدْرُسُ:mi", pairTr: "O (kadın) ders çalışıyor." }
  ],
  rules: [
    { tr: "<b>Muzâri fiilin baş harfi özneyi gösterir:</b><br>• <span class=\"ar\">أَنَا ← أَـ</span>: <span class=\"ar\">أَسْكُنُ</span> · <span class=\"ar\">نَحْنُ ← نَـ</span>: <span class=\"ar\">نَسْكُنُ</span><br>• <span class=\"ar\">أَنْتَ ← تَـ</span>: <span class=\"ar\">تَسْكُنُ</span> · <span class=\"ar\">أَنْتِ ← تَـ … ـِينَ</span>: <span class=\"ar\">تَسْكُنِينَ</span><br>• <span class=\"ar\">هُوَ ← يَـ</span>: <span class=\"ar\">يَسْكُنُ</span> · <span class=\"ar\">هِيَ ← تَـ</span>: <span class=\"ar\">تَسْكُنُ</span>" },
    { tr: "<span class=\"ar\">أَنْتَ</span> ile <span class=\"ar\">هِيَ</span> aynı biçimi alır (<span class=\"ar\">تَسْكُنُ</span>); hangisi olduğunu cümleden anlarsın: <span class=\"ar\">هَلْ تُحِبُّ عَمَلَكَ يَا خَلِيلُ؟ · سُمَيَّةُ تَأْكُلُ تُفَّاحَةً.</span>" },
    { tr: "Dört harfli <span class=\"ar\">أَحَبَّ</span> fiilinde ön ek ötreli okunur: <span class=\"ar\">أُحِبُّ، نُحِبُّ، تُحِبُّ، تُحِبِّينَ، يُحِبُّ</span>. <span class=\"ar\">قَرَأَ</span>’da hemze ـِينَ’den önce <span class=\"ar\">ئـ</span> yazılır: <span class=\"ar\">تَقْرَئِينَ</span>." },
    { tr: "Özne “ben ve arkadaşım” gibi birden çok kişiyse ve ben içindeysem <span class=\"ar\">نَحْنُ</span> sayılır: <span class=\"ar\">أَنَا وَصَدِيقِي نَدْرُسُ</span>." }
  ],
  kaide: ["٨ ـ امْلَإِ الفَرَاغَاتِ بِالفِعْلِ المُنَاسِبِ مِمَّا يَلِي: (أَعِيشُ، نَدْرُسُ، تَسْكُنُ، يُقِيمُ، تَتَكَوَّنُ).", "٩ ـ اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ وَضَعْ خَطًّا تَحْتَهَا. ١٠ ـ امْلَإِ الجَدْوَلَ الآتِيَ: أَنَا، نَحْنُ، أَنْتَ، أَنْتِ، هُوَ، هِيَ ← أُحِبُّ، نَدْرُسُ، تَعْمَلُ، تَسْكُنِينَ، يَكْتُبُ، تَقْرَأُ."],
  ex: [
    { type: "bank", num: "٨", ar: "امْلَإِ الفَرَاغَاتِ بِالفِعْلِ المُنَاسِبِ مِمَّا يَلِي", tr: "Önce aşağıdan fiili seç, sonra boşluğa dokun. Her fiil bir kez kullanılır.", bank: ["أَعِيشُ", "نَدْرُسُ", "تَسْكُنُ", "يُقِيمُ", "تَتَكَوَّنُ"],
      tr2: "1) Ahmed’in ailesi on bir kişiden oluşur. 2) Leylâ yeni bir evde oturuyor. 3) Ailemle küçük bir şehirde yaşıyorum. 4) Ben ve arkadaşlarım Marmara Üniversitesinde Arapça okuyoruz. 5) Babam Halep şehrinde ikamet ediyor.",
      parts: ["١ ـ", { a: [4] }, "عَائِلَةُ أَحْمَدَ مِنْ أَحَدَ عَشَرَ شَخْصًا.<br>٢ ـ", { a: [2] }, "لَيْلَى فِي بَيْتٍ جَدِيدٍ.<br>٣ ـ", { a: [0] }, "مَعَ أُسْرَتِي فِي مَدِينَةٍ صَغِيرَةٍ.<br>٤ ـ أَنَا وَأَصْدِقَائِي", { a: [1] }, "اللُّغَةَ العَرَبِيَّةَ فِي جَامِعَةِ مَرْمَرَةَ.<br>٥ ـ", { a: [3] }, "وَالِدِي بِمَدِينَةِ حَلَبَ."] },
    { type: "pick", fill: true, num: "٩", ar: "اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ وَضَعْ خَطًّا تَحْتَهَا", tr: "Cümleye uygun fiili seç. İlk altısı kitaptan.", items: PL([
      ["أَنَا وَصَدِيقِي ___ فِي تُرْكِيَا.", "نَدْرُسُ", "أَدْرُسُ", "يَدْرُسُ", "Ben ve arkadaşım Türkiye’de okuyoruz.", "أَنَا وَصَدِيقِي = نَحْنُ ← نَـ"],
      ["هَلْ ___ عَمَلَكَ يَا «خَلِيلُ»؟", "تُحِبُّ", "نُحِبُّ", "يُحِبُّ", "Halil, işini seviyor musun?", "Erkeğe hitap (أَنْتَ) ← تَـ; عَمَلَكَ’deki ـكَ de bunu gösterir."],
      ["«سُمَيَّةُ» ___ تُفَّاحَةً.", "تَأْكُلُ", "يَأْكُلُ", "تَأْكُلِينَ", "Sümeyye bir elma yiyor.", "هِيَ ← تَـ; ـِينَ yalnız أَنْتِ içindir."],
      ["هُوَ ___ الشَّايَ بِالنَّعْنَاعِ.", "يَشْرَبُ", "تَشْرَبُ", "أَشْرَبُ", "O naneli çay içiyor.", "هُوَ ← يَـ"],
      ["هَلْ ___ أُسْتَاذَةً يَا «زَهْرَاءُ»؟", "تَعْمَلِينَ", "أَعْمَلُ", "تَعْمَلُ", "Zehrâ, hoca olarak mı çalışıyorsun?", "Kadına hitap (أَنْتِ) ← تَـ … ـِينَ"],
      ["صَدِيقِي ___ فِي مَنْطِقَةِ الفَاتِحِ.", "يَسْكُنُ", "تَسْكُنُ", "تَسْكُنِينَ", "Arkadaşım Fatih semtinde oturuyor.", "صَدِيقِي = هُوَ ← يَـ"],
      ["أَنْتِ ___ القُرْآنَ كُلَّ يَوْمٍ.", "تَقْرَئِينَ", "تَقْرَأُ", "يَقْرَأُ", "Sen (kadın) her gün Kur’an okuyorsun.", "أَنْتِ ← تَقْرَئِينَ (hemze ئـ)."],
      ["نَحْنُ ___ الدَّرْسَ فِي الدَّفْتَرِ.", "نَكْتُبُ", "أَكْتُبُ", "يَكْتُبُ", "Biz dersi deftere yazıyoruz.", "نَحْنُ ← نَـ"],
      ["أَنَا ___ عَائِلَتِي كَثِيرًا.", "أُحِبُّ", "نُحِبُّ", "تُحِبِّينَ", "Ben ailemi çok seviyorum.", "أَنَا ← أُـ (dört harfli fiil: ötre)."],
      ["أُخْتِي ___ فِي مُسْتَشْفًى.", "تَعْمَلُ", "يَعْمَلُ", "تَعْمَلِينَ", "Kız kardeşim bir hastanede çalışıyor.", "أُخْتِي = هِيَ ← تَـ"]
    ])},
    { type: "pick", fill: true, num: "١٠ (أ)", ar: "امْلَإِ الجَدْوَلَ الآتِيَ: أُحِبُّ، نَدْرُسُ، تَعْمَلُ", tr: "Tablonun ilk üç satırı: verilen biçimden yola çıkarak zamire uygun biçimi seç.", items: TABLO([0, 1, 2]) },
    { type: "pick", fill: true, num: "١٠ (ب)", ar: "امْلَإِ الجَدْوَلَ الآتِيَ: تَسْكُنِينَ، يَكْتُبُ، تَقْرَأُ", tr: "Tablonun son üç satırı.", items: TABLO([3, 4, 5]) }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["رَسُولُنَا ﷺ اسْمُهُ {مُحَمَّدٌ}.", ["مُحَمَّدٌ", "عَبْدُ اللهِ", "أَحْمَدُ"], "Peygamberimiz", "Peygamberimizin adı Muhammed’dir.", "u1"],
  ["اسْمُ وَالِدِهِ {عَبْدُ اللهِ} بْنُ عَبْدِ المُطَّلِبِ.", ["عَبْدُ اللهِ", "حَمْزَةُ", "العَبَّاسُ"], "babası", "Babasının adı Abdullah.", "u1"],
  ["اسْمُ أُمِّهِ {آمِنَةُ} بِنْتُ وَهْبٍ.", ["آمِنَةُ", "فَاطِمَةُ", "خَدِيجَةُ"], "annesi", "Annesinin adı Âmine.", "u1"],
  ["اسْمُ {جَدِّهِ} عَبْدُ المُطَّلِبِ.", ["جَدِّهِ", "عَمِّهِ", "خَالِهِ"], "dedesi", "Dedesinin adı Abdülmuttalib.", "u1"],
  ["مِنْ قَبِيلَةِ {قُرَيْشٍ}.", ["قُرَيْشٍ", "تَمِيمٍ", "هُذَيْلٍ"], "kabilesi", "Kureyş kabilesinden.", "u1"],
  ["وُلِدَ ﷺ بِمَكَّةَ {المُكَرَّمَةِ}.", ["المُكَرَّمَةِ", "المُنَوَّرَةِ", "الكَبِيرَةِ"], "doğum", "Mekke-i Mükerreme’de doğdu.", "u1"],
  ["عَمِلَ فِي الرَّعْيِ ثُمَّ فِي {التِّجَارَةِ}.", ["التِّجَارَةِ", "الزِّرَاعَةِ", "الطِّبِّ"], "iş", "Önce çobanlık, sonra ticaret yaptı.", "u1"],
  ["{دُفِنَ} فِي المَدِينَةِ المُنَوَّرَةِ.", ["دُفِنَ", "وُلِدَ", "عَمِلَ"], "vefat", "Medine’de defnedildi.", "u1"],
  ["تَتَكَوَّنُ مِنْ ثَلَاثَةِ {أَوْلَادٍ} وَأَرْبَعِ بَنَاتٍ.", ["أَوْلَادٍ", "أَحْفَادٍ", "أَعْمَامٍ"], "aile", "Üç oğul ve dört kızdan oluşur.", "u2"],
  ["وَلِلنَّبِيِّ ﷺ {ثَمَانِيَةُ} أَحْفَادٍ.", ["ثَمَانِيَةُ", "ثَلَاثَةُ", "سِتَّةُ"], "torunlar", "Peygamberimizin sekiz torunu var.", "u2"],
  ["وَالحَسَنُ وَالحُسَيْنُ هُمْ أَبْنَاءُ {فَاطِمَةَ}.", ["فَاطِمَةَ", "زَيْنَبَ", "رُقَيَّةَ"], "torunlar", "Hasan ve Hüseyin Fâtıma’nın oğullarıdır.", "u2"],
  ["وَلَهُ ﷺ أَحَدَ عَشَرَ عَمًّا، وَسِتُّ {عَمَّاتٍ}.", ["عَمَّاتٍ", "خَالَاتٍ", "بَنَاتٍ"], "akraba", "On bir amcası ve altı halası var.", "u2"],
  ["وَلِلنَّبِيِّ ﷺ {خَالٌ} وَاحِدٌ.", ["خَالٌ", "عَمٌّ", "جَدٌّ"], "akraba", "Peygamberimizin bir dayısı var.", "u2"],
  ["تَعِيشُ عَائِلَةُ خَالِدٍ فِي الأُرْدُنِّ، وَهِيَ عَائِلَةٌ {كَبِيرَةٌ}.", ["كَبِيرَةٌ", "كَبِيرٌ", "كَبِيرَةً"], "boşluk", "Büyük bir ailedir.", "u3"],
  ["وَالِدُ خَالِدٍ يَعْمَلُ {طَبِيبًا}.", ["طَبِيبًا", "طَبِيبٌ", "طَبِيبَةٌ"], "boşluk", "Hâlid’in babası doktor olarak çalışıyor.", "u3"],
  ["يَلْعَبُ خَالِدٌ مَعَهُمَا فِي أَيَّامِ {العُطْلَةِ}.", ["العُطْلَةِ", "العَمَلِ", "الدِّرَاسَةِ"], "boşluk", "Tatil günlerinde onlarla oynuyor.", "u3"],
  ["النَّشِيطُ عَكْسُ {الكَسُولِ}.", ["الكَسُولِ", "الكَبِيرِ", "الأَعْزَبِ"], "zıt", "Çalışkan tembelin zıddıdır.", "u3"],
  ["العُمْرُ يَعْنِي {السِّنَّ}.", ["السِّنَّ", "العَامَ", "الأُسْرَةَ"], "eş anlam", "Ömür yaş demektir.", "u3"],
  ["خَالِي هُوَ أَخُو {أُمِّي}.", ["أُمِّي", "أَبِي", "جَدِّي"], "akrabalık", "Dayım annemin erkek kardeşidir.", "u4"],
  ["عَمَّتِي هِيَ أُخْتُ {أَبِي}.", ["أَبِي", "أُمِّي", "خَالِي"], "akrabalık", "Halam babamın kız kardeşidir.", "u4"],
  ["وَالِدَةُ أُمِّي هِيَ {جَدَّتِي}.", ["جَدَّتِي", "خَالَتِي", "عَمَّتِي"], "akrabalık", "Annemin annesi ninemdir.", "u4"],
  ["خَالَتِي فَاطِمَةُ، {هِيَ} مُعَلِّمَةٌ.", ["هِيَ", "هُوَ", "أَنْتَ"], "uyum", "Teyzem Fâtıma öğretmendir.", "u4"],
  ["{تَتَكَوَّنُ} عَائِلَةُ أَحْمَدَ مِنْ أَحَدَ عَشَرَ شَخْصًا.", ["تَتَكَوَّنُ", "تَسْكُنُ", "يُقِيمُ"], "fiil", "Ahmed’in ailesi on bir kişiden oluşur.", "u5"],
  ["أَنَا وَأَصْدِقَائِي {نَدْرُسُ} اللُّغَةَ العَرَبِيَّةَ.", ["نَدْرُسُ", "أَدْرُسُ", "يَدْرُسُ"], "fiil", "Ben ve arkadaşlarım Arapça okuyoruz.", "u5"],
  ["هَلْ {تَعْمَلِينَ} أُسْتَاذَةً يَا زَهْرَاءُ؟", ["تَعْمَلِينَ", "تَعْمَلُ", "يَعْمَلُ"], "fiil", "Zehrâ, hoca olarak mı çalışıyorsun?", "u5"],
  ["هِيَ {تَقْرَأُ} الكِتَابَ.", ["تَقْرَأُ", "تَقْرَئِينَ", "يَقْرَأُ"], "fiil", "O (kadın) kitabı okuyor.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["اسْمُ أُمِّ النَّبِيِّ ﷺ فَاطِمَةُ ← metne göre düzelt", "اسْمُ أُمِّ النَّبِيِّ ﷺ آمِنَةُ", "اسْمُ أُمِّ النَّبِيِّ ﷺ خَدِيجَةُ", "اسْمُ أُمِّ النَّبِيِّ ﷺ حَلِيمَةُ", "Fâtıma ninesi; annesi Âmine.", "u1"],
  ["وُلِدَ النَّبِيُّ ﷺ فِي المَدِينَةِ ← metne göre düzelt", "وُلِدَ النَّبِيُّ ﷺ فِي مَكَّةَ", "وُلِدَ النَّبِيُّ ﷺ فِي الطَّائِفِ", "وُلِدَ النَّبِيُّ ﷺ فِي الشَّامِ", "وُلِدَ بِمَكَّةَ المُكَرَّمَةِ.", "u1"],
  ["الحَسَنُ ابْنُ زَيْنَبَ ← metne göre düzelt", "الحَسَنُ ابْنُ فَاطِمَةَ", "الحَسَنُ ابْنُ رُقَيَّةَ", "الحَسَنُ ابْنُ خَدِيجَةَ", "Hasan Fâtıma’nın oğlu.", "u2"],
  ["لِلنَّبِيِّ ﷺ خَالَانِ ← metne göre düzelt", "لِلنَّبِيِّ ﷺ خَالٌ وَاحِدٌ", "لِلنَّبِيِّ ﷺ ثَلَاثَةُ أَخْوَالٍ", "لِلنَّبِيِّ ﷺ أَحَدَ عَشَرَ خَالًا", "خَالٌ وَاحِدٌ وَخَالَتَانِ.", "u2"],
  ["كَبِيرَةٌ ← zıt anlam", "صَغِيرَةٌ", "كَسُولٌ", "أَعْزَبُ", "büyük ≠ küçük", "u3"],
  ["وُلِدَ ← zıt anlam", "مَاتَ", "عَمِلَ", "سَكَنَ", "doğdu ≠ öldü", "u3"],
  ["عَامٌ ← eş anlam", "سَنَةٌ", "سِنٌّ", "عَائِلَةٌ", "yıl = sene", "u3"],
  ["تُوُفِّيَ ← eş anlam", "مَاتَ", "وُلِدَ", "دُفِنَ", "vefat etti = öldü", "u3"],
  ["أَخُو أَبِي ← akrabalık adı", "عَمِّي", "خَالِي", "جَدِّي", "Babanın erkek kardeşi.", "u4"],
  ["أُخْتُ أُمِّي ← akrabalık adı", "خَالَتِي", "عَمَّتِي", "جَدَّتِي", "Annenin kız kardeşi.", "u4"],
  ["سُلَيْمَانَ، بِنْتٌ، لِخَالِي، وَوَلَدٌ ← sırala", "لِخَالِي سُلَيْمَانَ بِنْتٌ وَوَلَدٌ", "سُلَيْمَانَ بِنْتٌ لِخَالِي وَوَلَدٌ", "بِنْتٌ وَوَلَدٌ سُلَيْمَانَ لِخَالِي", "Kitaptaki 6. etkinlik.", "u4"],
  ["هُوَ يَسْكُنُ ← أَنْتِ", "أَنْتِ تَسْكُنِينَ", "أَنْتِ تَسْكُنُ", "أَنْتِ يَسْكُنُ", "أَنْتِ ← تَـ … ـِينَ", "u5"],
  ["أَنَا أَكْتُبُ ← نَحْنُ", "نَحْنُ نَكْتُبُ", "نَحْنُ أَكْتُبُ", "نَحْنُ يَكْتُبُ", "نَحْنُ ← نَـ", "u5"],
  ["أَنْتِ تَقْرَئِينَ ← هِيَ", "هِيَ تَقْرَأُ", "هِيَ تَقْرَئِينَ", "هِيَ يَقْرَأُ", "هِيَ ← تَـ (ـِينَ almaz)", "u5"]
];
// Kim kimdir? hız oyunu
var NOUN_LIST = UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = AKRABA;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt anlamı", pairs: [["كَبِيرَةٌ", "صَغِيرَةٌ"], ["وُلِدَ", "مَاتَ"], ["نَشِيطٌ", "كَسُولٌ"], ["مُتَزَوِّجٌ", "أَعْزَبُ"], ["ابْنٌ", "بِنْتٌ"], ["أَبٌ", "أُمٌّ"], ["جَدٌّ", "جَدَّةٌ"], ["أَخٌ", "أُخْتٌ"]] },
  es: { name: "Kelime ↔ eş anlamı", pairs: [["أُسْرَةٌ", "عَائِلَةٌ"], ["عُمْرٌ", "سِنٌّ"], ["عَامٌ", "سَنَةٌ"], ["أَبٌ", "وَالِدٌ"], ["أُمٌّ", "وَالِدَةٌ"], ["تُوُفِّيَ", "مَاتَ"], ["سَكَنَ", "أَقَامَ"]] },
  ak: { name: "Akraba ↔ tanımı", pairs: [["عَمِّي", "أَخُو أَبِي"], ["عَمَّتِي", "أُخْتُ أَبِي"], ["خَالِي", "أَخُو أُمِّي"], ["خَالَتِي", "أُخْتُ أُمِّي"], ["جَدِّي", "وَالِدُ أَبِي"], ["جَدَّتِي", "وَالِدَةُ أُمِّي"], ["حَفِيدِي", "ابْنُ ابْنِي"]] }
};
var KARTLAR = [
  ["Peygamberimizin anne ve babası?", "وَالِدُهُ عَبْدُ اللهِ بْنُ عَبْدِ المُطَّلِبِ · أُمُّهُ آمِنَةُ بِنْتُ وَهْبٍ"],
  ["Dedesi ve ninesi?", "جَدُّهُ عَبْدُ المُطَّلِبِ · جَدَّتُهُ فَاطِمَةُ"],
  ["Kabilesi, doğduğu ve vefat ettiği yer?", "قُرَيْشٌ · وُلِدَ بِمَكَّةَ · مَاتَ وَدُفِنَ فِي المَدِينَةِ (٦٣ عَامًا)"],
  ["İşi neydi?", "عَمِلَ فِي الرَّعْيِ ثُمَّ فِي التِّجَارَةِ: önce çobanlık, sonra ticaret."],
  ["Oğulları?", "القَاسِمُ، عَبْدُ اللهِ، إِبْرَاهِيمُ (٣)"],
  ["Kızları?", "زَيْنَبُ، رُقَيَّةُ، أُمُّ كُلْثُومٍ، فَاطِمَةُ (٤)"],
  ["Torunları?", "عَلِيٌّ، أُمَامَةُ (زَيْنَبُ) · عَبْدُ اللهِ (رُقَيَّةُ) · الحَسَنُ، الحُسَيْنُ، مُحْسِنٌ، أُمُّ كُلْثُومٍ، زَيْنَبُ (فَاطِمَةُ) = ٨"],
  ["Amca, hala, dayı, teyze sayısı?", "أَحَدَ عَشَرَ عَمًّا · سِتُّ عَمَّاتٍ · خَالٌ وَاحِدٌ · خَالَتَانِ"],
  ["Amca / hala, dayı / teyze farkı?", "عَمٌّ / عَمَّةٌ = babanın kardeşleri · خَالٌ / خَالَةٌ = annenin kardeşleri"],
  ["Zıt anlamlar?", "كَبِيرَةٌ ≠ صَغِيرَةٌ · وُلِدَ ≠ مَاتَ · نَشِيطٌ ≠ كَسُولٌ · مُتَزَوِّجٌ ≠ أَعْزَبُ"],
  ["Eş anlamlar?", "أُسْرَةٌ = عَائِلَةٌ · عُمْرٌ = سِنٌّ · عَامٌ = سَنَةٌ · تُوُفِّيَ = مَاتَ"],
  ["Muzâri ön ekleri?", "أَنَا أَـ · نَحْنُ نَـ · أَنْتَ تَـ · أَنْتِ تَـ…ـِينَ · هُوَ يَـ · هِيَ تَـ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat02";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("عَائِلَةٌ", "i", "aile", "عَائِلَاتٌ", "at", "أُسْرَةٌ", "", "عَائِلَةُ النَّبِيِّ مُحَمَّدٍ ﷺ كَبِيرَةٌ.", "عَائِلَةُ", "Peygamberimizin ailesi büyüktür."),
  KW("أَبٌ", "i", "baba", "آبَاءٌ", "efal", "وَالِدٌ", "أُمٌّ", "اسْمُ أَبِي مُحَمَّدٌ.", "أَبِي", "Babamın adı Muhammed."),
  KW("أُمٌّ", "i", "anne", "أُمَّهَاتٌ", "at", "وَالِدَةٌ", "أَبٌ", "وَاسْمُ أُمِّهِ آمِنَةُ بِنْتُ وَهْبٍ.", "أُمِّهِ", "Annesinin adı Vehb kızı Âmine."),
  KW("جَدٌّ", "i", "dede", "أَجْدَادٌ", "efal", "", "جَدَّةٌ", "اسْمُ جَدِّهِ عَبْدُ المُطَّلِبِ.", "جَدِّهِ", "Dedesinin adı Abdülmuttalib."),
  KW("جَدَّةٌ", "i", "nine", "جَدَّاتٌ", "at", "", "جَدٌّ", "وَاسْمُ جَدَّتِهِ فَاطِمَةُ.", "جَدَّتِهِ", "Ninesinin adı Fâtıma."),
  KW("عَمٌّ", "i", "amca", "أَعْمَامٌ", "efal", "", "", "مِنْ أَعْمَامِهِ: حَمْزَةُ، وَالعَبَّاسُ.", "أَعْمَامِهِ", "Amcalarından: Hamza ve Abbas."),
  KW("عَمَّةٌ", "i", "hala", "عَمَّاتٌ", "at", "", "", "وَلَهُ ﷺ أَحَدَ عَشَرَ عَمًّا، وَسِتُّ عَمَّاتٍ.", "عَمَّاتٍ", "On bir amcası ve altı halası var."),
  KW("خَالٌ", "i", "dayı", "أَخْوَالٌ", "efal", "", "", "وَلِلنَّبِيِّ ﷺ خَالٌ وَاحِدٌ.", "خَالٌ", "Peygamberimizin bir dayısı var."),
  KW("خَالَةٌ", "i", "teyze", "خَالَاتٌ", "at", "", "", "وَخَالَتَانِ هُمَا: فَاخِتَةُ وَفُرَيْعَةُ.", "وَخَالَتَانِ", "İki teyzesi: Fâhite ve Füreyâ."),
  KW("حَفِيدٌ", "i", "torun", "أَحْفَادٌ", "efal", "", "", "وَلِلنَّبِيِّ مُحَمَّدٍ ﷺ ثَمَانِيَةُ أَحْفَادٍ.", "أَحْفَادٍ", "Peygamberimizin sekiz torunu var."),
  KW("زَوْجَةٌ", "i", "eş (kadın), zevce", "زَوْجَاتٌ", "at", "", "", "زَوْجَاتُهُ هُنَّ: خَدِيجَةُ، وَسَوْدَةُ، وَعَائِشَةُ.", "زَوْجَاتُهُ", "Zevceleri: Hatice, Sevde, Âişe."),
  KW("ابْنٌ", "i", "oğul", "أَبْنَاءٌ", "efal", "وَلَدٌ", "بِنْتٌ", "وَالحَسَنُ وَالحُسَيْنُ هُمْ أَبْنَاءُ فَاطِمَةَ.", "أَبْنَاءُ", "Hasan ve Hüseyin Fâtıma’nın oğullarıdır."),
  KW("بِنْتٌ", "i", "kız", "بَنَاتٌ", "at", "", "ابْنٌ", "تَتَكَوَّنُ مِنْ ثَلَاثَةِ أَوْلَادٍ وَأَرْبَعِ بَنَاتٍ.", "بَنَاتٍ", "Üç oğul ve dört kızdan oluşur."),
  KW("وَلَدٌ", "i", "oğul, çocuk", "أَوْلَادٌ", "efal", "ابْنٌ", "", "وَلَهُ ثَلَاثَةُ أَوْلَادٍ.", "أَوْلَادٍ", "Üç oğlu var."),
  KW("أَخٌ", "i", "erkek kardeş", "إِخْوَةٌ / إِخْوَانٌ", "diger", "", "أُخْتٌ", "لِخَالِدٍ أَخَوَانِ وَأُخْتَانِ.", "أَخَوَانِ", "Hâlid’in iki erkek ve iki kız kardeşi var."),
  KW("أُخْتٌ", "i", "kız kardeş", "أَخَوَاتٌ", "at", "", "أَخٌ", "لِخَالِدٍ أَخَوَانِ وَأُخْتَانِ.", "أُخْتَانِ", "Hâlid’in iki erkek ve iki kız kardeşi var."),
  KW("قَبِيلَةٌ", "i", "kabile", "قَبَائِلُ", "feail", "", "", "وَهِيَ قَبِيلَةٌ عَرَبِيَّةٌ مَشْهُورَةٌ.", "قَبِيلَةٌ", "Meşhur bir Arap kabilesidir."),
  KW("عُمْرٌ", "i", "yaş, ömür", "أَعْمَارٌ", "efal", "سِنٌّ", "", "وَالِدُ خَالِدٍ عُمْرُهُ سِتُّونَ سَنَةً.", "عُمْرُهُ", "Hâlid’in babası altmış yaşında."),
  KW("سِنٌّ", "i", "yaş", "", "", "عُمْرٌ", "", "كَانَ سِنُّهُ ثَلَاثًا وَسِتِّينَ عَامًا.", "سِنُّهُ", "Altmış üç yaşındaydı."),
  KW("عَامٌ", "i", "yıl", "أَعْوَامٌ", "efal", "سَنَةٌ", "", "كَانَ سِنُّهُ ثَلَاثًا وَسِتِّينَ عَامًا.", "عَامًا", "Altmış üç yaşındaydı."),
  KW("عُطْلَةٌ", "i", "tatil", "عُطَلٌ", "fual_f", "", "", "يَلْعَبُ خَالِدٌ مَعَهُمَا فِي أَيَّامِ العُطْلَةِ.", "العُطْلَةِ", "Hâlid tatil günlerinde onlarla oynuyor."),
  KW("طَبِيبٌ", "i", "doktor", "أَطِبَّاءُ", "efila", "", "", "هُوَ يَعْمَلُ طَبِيبًا.", "طَبِيبًا", "Doktor olarak çalışıyor."),
  KW("صَدِيقٌ", "i", "arkadaş", "أَصْدِقَاءُ", "efila", "", "", "أَنَا وَأَصْدِقَائِي نَدْرُسُ اللُّغَةَ العَرَبِيَّةَ.", "وَأَصْدِقَائِي", "Ben ve arkadaşlarım Arapça okuyoruz."),
  KW("مَدِينَةٌ", "i", "şehir", "مُدُنٌ", "fuul_k", "", "قَرْيَةٌ", "أَعِيشُ مَعَ أُسْرَتِي فِي مَدِينَةٍ صَغِيرَةٍ.", "مَدِينَةٍ", "Ailemle küçük bir şehirde yaşıyorum."),
  KW("كَبِيرٌ", "s", "büyük", "كِبَارٌ", "fial", "", "صَغِيرٌ", "وَهِيَ عَائِلَةٌ كَبِيرَةٌ.", "كَبِيرَةٌ", "Ve o büyük bir ailedir."),
  KW("نَشِيطٌ", "s", "çalışkan, hareketli", "نُشَطَاءُ", "fuala", "", "كَسُولٌ", "هُوَ نَشِيطٌ فِي عَمَلِهِ.", "نَشِيطٌ", "İşinde çalışkandır."),
  KW("كَسُولٌ", "s", "tembel", "كُسَالَى", "diger", "", "نَشِيطٌ", "", "", ""),
  KW("مَشْهُورٌ", "s", "meşhur, ünlü", "", "", "", "", "وَهِيَ قَبِيلَةٌ عَرَبِيَّةٌ مَشْهُورَةٌ.", "مَشْهُورَةٌ", "Meşhur bir Arap kabilesidir."),
  KW("مُتَزَوِّجٌ", "s", "evli", "مُتَزَوِّجُونَ", "un", "", "أَعْزَبُ", "", "", ""),
  KW("وُلِدَ", "f", "doğdu", "", "", "", "مَاتَ", "وُلِدَ ﷺ بِمَكَّةَ المُكَرَّمَةِ.", "وُلِدَ", "Mekke-i Mükerreme’de doğdu."),
  KW("مَاتَ", "f", "öldü, vefat etti", "", "", "تُوُفِّيَ", "وُلِدَ", "مَاتَ نَبِيُّنَا مُحَمَّدٌ ﷺ فِي المَدِينَةِ المُنَوَّرَةِ.", "مَاتَ", "Peygamberimiz Medine’de vefat etti."),
  KW("دُفِنَ", "f", "defnedildi", "", "", "", "", "دُفِنَ فِي المَدِينَةِ المُنَوَّرَةِ.", "دُفِنَ", "Medine’de defnedildi."),
  KW("عَاشَ", "f", "yaşadı", "", "", "سَكَنَ", "", "تَعِيشُ عَائِلَةُ خَالِدٍ فِي الأُرْدُنِّ.", "تَعِيشُ", "Hâlid’in ailesi Ürdün’de yaşıyor."),
  KW("تَكَوَّنَ", "f", "oluştu (… -den: مِنْ)", "", "", "", "", "تَتَكَوَّنُ مِنْ ثَلَاثَةِ أَوْلَادٍ وَأَرْبَعِ بَنَاتٍ.", "تَتَكَوَّنُ", "Üç oğul ve dört kızdan oluşur."),
  KW("أَقَامَ", "f", "ikamet etti, oturdu", "", "", "سَكَنَ", "", "يُقِيمُ وَالِدِي بِمَدِينَةِ حَلَبَ.", "يُقِيمُ", "Babam Halep şehrinde ikamet ediyor.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","قُلُوبٌ، دُرُوسٌ"],"efal":["أَفْعَالٌ","ef’âl","أَقْلَامٌ، أَبْوَابٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، رِجَالٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","غُرَفٌ، صُوَرٌ"],"fuala":["فُعَلَاءُ","fu’alâ","وُزَرَاءُ، فُقَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَغْنِيَاءُ"],"fevail":["فَوَاعِلُ","fevâil","شَوَارِعُ، نَوَافِذُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَسَاجِدُ، مَكَاتِبُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","عَصَافِيرُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","تُجَّارٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","مُعَلِّمُونَ، مُسَافِرُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","سَيَّارَاتٌ، لُغَاتٌ"],"diger":["…","başka kalıplar","إِخْوَةٌ، كُسَالَى"]};
