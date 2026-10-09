// ================= VERİ: Kıraat 1 — التَّحِيَّاتُ وَالتَّعَارُفُ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الشَّخْصُ", tr: "Kim" }, nasb: { ar: "المَعْلُومَةُ", tr: "Bilgi" }, cerr: { ar: "السُّؤَالُ", tr: "Soru" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru", "صَحِيحٌ", "mz"], ["y", "Yanlış", "خَطَأٌ", "cerr"]];
var KISI = [["h", "Hüsam", "حُسَامٌ", "cerr"], ["o", "Ömer", "عُمَرُ", "nasb"], ["a", "Ahmed", "أَحْمَدُ", "mz"], ["m", "Muâz", "مُعَاذٌ", "mi"]];
var ALAN = [["b", "Babanın adı ve künyesi", "اسْمُ الأَبِ وَكُنْيَتُهُ", "cerr"], ["n", "Annenin adı ve künyesi", "اسْمُ الأُمِّ وَكُنْيَتُهَا", "mi"], ["t", "Doğum tarihi", "تَارِيخُ المِيلَادِ", "nasb"], ["y", "Doğum yeri", "مَكَانُ الوِلَادَةِ", "mz"], ["m", "Meslek", "المِهْنَةُ", "ref"], ["s", "Medeni hâl", "الحَالَةُ الاجْتِمَاعِيَّةُ", "muz"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", h: "Hüsam", o: "Ömer", a: "Ahmed", m: "Muâz" };

// Tanışma makinesi: kişi × soru → cevap (metinde yoksa null)
var SORU = [["مَا اسْمُكَ؟", "Adın ne?"], ["مَا لَقَبُكَ؟", "Lakabın (soyadın) ne?"], ["مِنْ أَيْنَ أَنْتَ؟", "Nerelisin?"], ["كَمْ عُمْرُكَ؟", "Kaç yaşındasın?"], ["مَا مِهْنَتُكَ؟", "Mesleğin ne?"], ["أَيْنَ تَسْكُنُ؟", "Nerede oturuyorsun?"], ["مَا هِوَايَاتُكَ؟", "Hobilerin neler?"], ["مَنْ فِي أُسْرَتِكَ؟", "Ailende kimler var?"]];
var CEVAP = [
  [["اسْمِي حُسَامٌ.", "Adım Hüsam."], ["لَقَبِي العَفِيفِيُّ.", "Lakabım el-Afîfî."], ["أَنَا مِنْ مِصْرَ.", "Mısırlıyım."], ["عُمْرِي تِسْعَ عَشْرَةَ سَنَةً.", "On dokuz yaşındayım."], ["أَنَا طَالِبٌ فِي الجَامِعَةِ.", "Üniversitede öğrenciyim."], ["أَسْكُنُ فِي مَدِينَةِ القَاهِرَةِ.", "Kahire şehrinde oturuyorum."], ["هِوَايَاتِي القِرَاءَةُ وَالرَّسْمُ وَرُكُوبُ الدَّرَّاجَةِ.", "Hobilerim okuma, resim ve bisiklete binmek."], ["وَالِدِي مُهَنْدِسٌ، وَأُمِّي مُعَلِّمَةٌ، لِي أَخٌ كَبِيرٌ وَأُخْتٌ صَغِيرَةٌ.", "Babam mühendis, annem öğretmen; bir ağabeyim ve küçük bir kız kardeşim var."]],
  [["اسْمِي عُمَرُ.", "Adım Ömer."], ["لَقَبِي البُخَارِيُّ.", "Lakabım el-Buhârî."], ["أَنَا مِنْ سُورِيَةَ.", "Suriyeliyim."], ["عُمْرِي عِشْرُونَ سَنَةً.", "Yirmi yaşındayım."], ["أَنَا طَالِبٌ فِي جَامِعَةِ دِمَشْقَ.", "Şam Üniversitesinde öğrenciyim."], ["أَسْكُنُ فِي حَيِّ المَيْدَانِ فِي شَارِعِ المَنْصُورِ.", "Meydan mahallesinde, Mansûr caddesinde oturuyorum."], ["هِوَايَاتِي السَّفَرُ وَالتَّصْوِيرُ وَالشِّطْرَنْجُ.", "Hobilerim seyahat, fotoğraf ve satranç."], ["اسْمُ أَبِي مُحَمَّدٌ، هُوَ صَيْدَلَانِيٌّ.", "Babamın adı Muhammed, eczacıdır."]],
  [["اسْمِي أَحْمَدُ.", "Adım Ahmed."], ["لَقَبِي الحُسَيْنُ.", "Lakabım el-Hüseyn."], ["أَنَا مِنَ العِرَاقِ، مِنْ مَدِينَةِ بَغْدَادَ.", "Iraklıyım, Bağdat şehrindenim."], ["عُمْرِي خَمْسٌ وَثَلَاثُونَ سَنَةً.", "Otuz beş yaşındayım."], ["أَنَا طَبِيبٌ.", "Doktorum."], ["أَسْكُنُ مَعَ أُسْرَتِي.", "Ailemle oturuyorum. (Yer söylenmiyor.)"], ["هِوَايَاتِي المُوسِيقَى وَالسِّبَاحَةُ وَالسَّفَرُ.", "Hobilerim müzik, yüzme ve seyahat."], ["أَنَا مُتَزَوِّجٌ، عِنْدِي وَلَدٌ وَبِنْتٌ.", "Evliyim; bir oğlum ve bir kızım var."]],
  [["اسْمِي مُعَاذٌ.", "Adım Muâz."], ["لَقَبِي الهِنْدِيُّ.", "Lakabım el-Hindî."], ["أَنَا يَمَنِيٌّ.", "Yemenliyim."], null, ["أَنَا مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ فِي جَامِعَةِ مَرْمَرَةَ.", "Marmara Üniversitesinde Arapça öğretmeniyim."], ["أَسْكُنُ مَعَ عَائِلَتِي فِي أُوسْكُدَار.", "Ailemle Üsküdar’da oturuyorum."], null, ["عِنْدِي وَلَدَانِ وَبِنْتَانِ.", "İki oğlum ve iki kızım var."]]
];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
function LTR(s) { return '<span dir="ltr" style="font-family:var(--f-body)">' + s + '</span>'; }

var MT = [
  ["حُسَامٌ", "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، اسْمِي حُسَامٌ، لَقَبِي العَفِيفِيُّ، أَنَا مِنْ مِصْرَ، أَسْكُنُ فِي مَدِينَةِ القَاهِرَةِ، عُمْرِي تِسْعَ عَشْرَةَ سَنَةً، أَنَا طَالِبٌ فِي الجَامِعَةِ، وَالِدِي مُهَنْدِسٌ، أُمِّي مُعَلِّمَةٌ، لِي أَخٌ كَبِيرٌ، اسْمُهُ قُصَيٌّ، وَأُخْتٌ صَغِيرَةٌ، اسْمُهَا مُنَى، هِوَايَاتِي القِرَاءَةُ وَالرَّسْمُ وَرُكُوبُ الدَّرَّاجَةِ."],
  ["عُمَرُ", "مَرْحَبًا، اسْمِي عُمَرُ، لَقَبِي البُخَارِيُّ، أَنَا مِنْ سُورِيَةَ، عُمْرِي عِشْرُونَ سَنَةً، أَنَا طَالِبٌ فِي جَامِعَةِ دِمَشْقَ، اسْمُ أَبِي مُحَمَّدٌ، هُوَ صَيْدَلَانِيٌّ، أَعِيشُ فِي مَدِينَةِ دِمَشْقَ، وَأَسْكُنُ فِي حَيِّ المَيْدَانِ فِي شَارِعِ المَنْصُورِ، أَتَكَلَّمُ اللُّغَةَ العَرَبِيَّةَ وَاللُّغَةَ الإِنْكِلِيزِيَّةَ وَقَلِيلًا مِنَ الفَرَنْسِيَّةِ. هِوَايَاتِي السَّفَرُ وَالتَّصْوِيرُ وَالشِّطْرَنْجُ."],
  ["أَحْمَدُ", "مَرْحَبًا، أَنَا أَحْمَدُ الحُسَيْنُ، أَنَا مِنَ العِرَاقِ، مِنْ مَدِينَةِ بَغْدَادَ، جِنْسِيَّتِي عِرَاقِيَّةٌ، عُمْرِي خَمْسٌ وَثَلَاثُونَ سَنَةً، أَنَا طَبِيبٌ، أَنَا مُتَزَوِّجٌ، أَسْكُنُ مَعَ أُسْرَتِي، عِنْدِي وَلَدٌ وَبِنْتٌ، هِوَايَاتِي: المُوسِيقَى وَالسِّبَاحَةُ وَالسَّفَرُ. وَهَذَا عُنْوَانُ بَرِيدِي الإِلِكْتِرُونِيِّ: " + LTR("mmh23@yahoo.com")],
  ["مُعَاذٌ", "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ، اسْمِي مُعَاذٌ، لَقَبِي الهِنْدِيُّ، أَنَا يَمَنِيٌّ، اسْمُ أَبِي مُحَمَّدٌ، أَنَا مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ فِي جَامِعَةِ مَرْمَرَةَ فِي السَّنَةِ التَّحْضِيرِيَّةِ، أَسْكُنُ مَعَ عَائِلَتِي فِي أُوسْكُدَار. عِنْدِي وَلَدَانِ وَبِنْتَانِ. وَهَذَا رَقْمُ جَوَّالِي: " + LTR("0543 452 24 56")]
];
var METIN = MT.map(function (m) { return m[1]; }).join("<br>");
var METIN_TR = "<b>Hüsam:</b> Esselâmu aleykum ve rahmetullâhi ve berekâtuh. Adım Hüsam, lakabım el-Afîfî. Mısırlıyım, Kahire şehrinde oturuyorum. On dokuz yaşındayım, üniversitede öğrenciyim. Babam mühendis, annem öğretmen. Kusay adında bir ağabeyim ve Müne adında küçük bir kız kardeşim var. Hobilerim okuma, resim ve bisiklete binmek." +
  "<br><b>Ömer:</b> Merhaba, adım Ömer, lakabım el-Buhârî. Suriyeliyim, yirmi yaşındayım, Şam Üniversitesinde öğrenciyim. Babamın adı Muhammed, eczacıdır. Şam şehrinde yaşıyorum; Meydan mahallesinde, Mansûr caddesinde oturuyorum. Arapça, İngilizce ve biraz Fransızca konuşuyorum. Hobilerim seyahat, fotoğraf ve satranç." +
  "<br><b>Ahmed:</b> Merhaba, ben Ahmed el-Hüseyn. Iraklıyım, Bağdat şehrindenim; uyruğum Irak. Otuz beş yaşındayım, doktorum. Evliyim, ailemle oturuyorum; bir oğlum ve bir kızım var. Hobilerim müzik, yüzme ve seyahat. Bu da e-posta adresim: mmh23@yahoo.com" +
  "<br><b>Muâz:</b> Esselâmu aleykum ve rahmetullâh. Adım Muâz, lakabım el-Hindî. Yemenliyim, babamın adı Muhammed. Marmara Üniversitesinde hazırlık sınıfında Arapça öğretmeniyim. Ailemle Üsküdar’da oturuyorum. İki oğlum ve iki kızım var. Bu da cep telefonu numaram: 0543 452 24 56";
var SOZLUK = [["لَقَبٌ", "lakap, aile adı"], ["عُمْرٌ", "yaş, ömür"], ["مِهْنَةٌ", "meslek"], ["هِوَايَةٌ", "hobi"], ["جِنْسِيَّةٌ", "uyruk, vatandaşlık"], ["صَيْدَلَانِيٌّ", "eczacı"], ["مُهَنْدِسٌ", "mühendis"], ["حَيٌّ", "mahalle"], ["الرَّسْمُ", "resim yapmak"], ["رُكُوبُ الدَّرَّاجَةِ", "bisiklete binmek"], ["التَّصْوِيرُ", "fotoğrafçılık"], ["الشِّطْرَنْجُ", "satranç"], ["مُتَزَوِّجٌ", "evli"], ["البَرِيدُ الإِلِكْتِرُونِيُّ", "e-posta"], ["السَّنَةُ التَّحْضِيرِيَّةُ", "hazırlık sınıfı"], ["جَوَّالٌ", "cep telefonu"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنُّصُوصُ", tr: "Okumaya Hazırlık ve Metinler", short: "Metin", col: "mz", legend: ["mz", "nasb"],
  goals: ["Okumadan önce kendini tanıtmayı düşünmek: adın, nerelisin, mesleğin, hobilerin", "Dört kişinin kendini tanıttığı metinleri okumak ve dinlemek", "Tanışmada kullanılan yeni kelimeleri öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "اسْمِي:- / حُسَامٌ،:mz / لَقَبِي:- / العَفِيفِيُّ،:mz / أَنَا مِنْ:- / مِصْرَ.:nasb", tr: "Adım Hüsam, lakabım el-Afîfî, Mısırlıyım.", pair: "عُمْرِي:- / عِشْرُونَ سَنَةً،:nasb / أَنَا:- / طَالِبٌ.:nasb", pairTr: "Yirmi yaşındayım, öğrenciyim." },
    { s: "هِوَايَاتِي:- / المُوسِيقَى وَالسِّبَاحَةُ وَالسَّفَرُ.:nasb", tr: "Hobilerim müzik, yüzme ve seyahat." }
  ],
  rules: [
    { tr: "<b>Metinlerin konusu:</b> Dört kişi (Hüsam, Ömer, Ahmed, Muâz) kendini tanıtıyor: adı, lakabı, nereli olduğu, yaşı, mesleği, oturduğu yer, ailesi ve hobileri." },
    { tr: "<b>Kendini tanıtma kalıpları:</b><br>• <span class=\"ar\">اسْمِي…</span> adım… · <span class=\"ar\">لَقَبِي…</span> lakabım…<br>• <span class=\"ar\">أَنَا مِنْ…</span> …-liyim · <span class=\"ar\">عُمْرِي… سَنَةً</span> … yaşındayım<br>• <span class=\"ar\">أَنَا طَالِبٌ / طَبِيبٌ</span> öğrenciyim / doktorum · <span class=\"ar\">أَسْكُنُ فِي…</span> …-de oturuyorum<br>• <span class=\"ar\">هِوَايَاتِي…</span> hobilerim… · <span class=\"ar\">عِنْدِي…</span> …-im var" },
    { tr: "<b>Okuma yolu:</b> Önce okuma öncesi soruları kendin için cevapla, sonra metinleri oku ya da “Metni dinle” düğmesiyle dinle. Bilmediğin kelimeyi sözlükte bul." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَا اسْمُكَ / اسْمُكِ؟ مِنْ أَيْنَ أَنْتَ / أَنْتِ؟ مَا مِهْنَتُكَ / مِهْنَتُكِ؟ مَا هِوَايَاتُكَ / هِوَايَاتُكِ؟", "اقْرَإِ النُّصُوصَ الآتِيَةَ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النُّصُوصَ الآتِيَةَ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metinleri oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "التَّحِيَّاتُ وَالتَّعَارُفُ", dialog: MT, text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَا اسْمُكَ؟ / مَا اسْمُكِ؟", a: "اسْمِي يُوسُفُ، لَقَبِي أَوْزْتُورْك.", tr: "Adın ne? (Örnek cevap) Adım Yusuf, lakabım Öztürk." },
        { q: "مِنْ أَيْنَ أَنْتَ؟ / مِنْ أَيْنَ أَنْتِ؟", a: "أَنَا مِنْ تُرْكِيَا، مِنْ مَدِينَةِ قُونِيَةَ.", tr: "Nerelisin? Türkiye’denim, Konya şehrindenim." },
        { q: "مَا مِهْنَتُكَ؟ / مَا مِهْنَتُكِ؟", a: "أَنَا طَالِبٌ فِي كُلِّيَّةِ الإِلَهِيَّاتِ.", tr: "Mesleğin ne? İlahiyat fakültesinde öğrenciyim." },
        { q: "مَا هِوَايَاتُكَ؟ / مَا هِوَايَاتُكِ؟", a: "هِوَايَاتِي القِرَاءَةُ وَالسِّبَاحَةُ.", tr: "Hobilerin neler? Hobilerim okuma ve yüzme." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "يَسْكُنُ حُسَامٌ فِي مَدِينَةِ القَاهِرَةِ.", a: "d", why: "أَسْكُنُ فِي مَدِينَةِ القَاهِرَةِ." },
        { s: "عُمْرُ حُسَامٍ عِشْرُونَ سَنَةً.", a: "y", why: "Hüsam on dokuz yaşında; yirmi yaşında olan Ömer." },
        { s: "وَالِدُ حُسَامٍ طَبِيبٌ.", a: "y", why: "وَالِدِي مُهَنْدِسٌ: babası mühendis." },
        { s: "لِحُسَامٍ أُخْتٌ صَغِيرَةٌ اسْمُهَا مُنَى.", a: "d", why: "Metinde aynen geçer." },
        { s: "عُمَرُ مِنْ سُورِيَةَ.", a: "d", why: "أَنَا مِنْ سُورِيَةَ." },
        { s: "أَبُو عُمَرَ صَيْدَلَانِيٌّ.", a: "d", why: "اسْمُ أَبِي مُحَمَّدٌ، هُوَ صَيْدَلَانِيٌّ." },
        { s: "يَتَكَلَّمُ عُمَرُ اللُّغَةَ الفَرَنْسِيَّةَ جَيِّدًا.", a: "y", why: "Biraz konuşur: قَلِيلًا مِنَ الفَرَنْسِيَّةِ." },
        { s: "أَحْمَدُ أَعْزَبُ.", a: "y", why: "أَنَا مُتَزَوِّجٌ: evli." },
        { s: "عِنْدَ أَحْمَدَ وَلَدٌ وَبِنْتٌ.", a: "d", why: "عِنْدِي وَلَدٌ وَبِنْتٌ." },
        { s: "مُعَاذٌ مِنَ اليَمَنِ.", a: "d", why: "أَنَا يَمَنِيٌّ." },
        { s: "يُعَلِّمُ مُعَاذٌ اللُّغَةَ الإِنْكِلِيزِيَّةَ.", a: "y", why: "Arapça öğretmeni: مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ." },
        { s: "يَسْكُنُ مُعَاذٌ مَعَ عَائِلَتِهِ فِي أُوسْكُدَار.", a: "d", why: "أَسْكُنُ مَعَ عَائِلَتِي فِي أُوسْكُدَار." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("لَقَبِي العَفِيفِيُّ", "لَقَبِي"), "lakabım, aile adım", "adresim", "mesleğim", "Lakabım el-Afîfî.", "لَقَبٌ: aile adı, soyadı gibi kullanılır."],
      [HL("عُمْرِي تِسْعَ عَشْرَةَ سَنَةً", "عُمْرِي"), "yaşım", "adım", "evim", "On dokuz yaşındayım.", "عُمْرٌ: yaş, ömür."],
      [HL("وَالِدِي مُهَنْدِسٌ", "مُهَنْدِسٌ"), "mühendis", "öğretmen", "eczacı", "Babam mühendis.", "Çoğulu: مُهَنْدِسُونَ."],
      [HL("هُوَ صَيْدَلَانِيٌّ", "صَيْدَلَانِيٌّ"), "eczacı", "doktor", "tüccar", "O eczacıdır.", "صَيْدَلِيَّةٌ: eczane."],
      [HL("جِنْسِيَّتِي عِرَاقِيَّةٌ", "جِنْسِيَّتِي"), "uyruğum", "mesleğim", "şehrim", "Uyruğum Irak.", "جِنْسِيَّةٌ: vatandaşlık."],
      [HL("أَنَا مُتَزَوِّجٌ", "مُتَزَوِّجٌ"), "evli", "bekâr", "yorgun", "Evliyim.", "Zıddı: أَعْزَبُ."],
      [HL("وَرُكُوبُ الدَّرَّاجَةِ", "الدَّرَّاجَةِ"), "bisiklet", "araba", "uçak", "Bisiklete binmek.", "رُكُوبٌ: binmek."],
      [HL("هِوَايَاتِي السَّفَرُ وَالتَّصْوِيرُ", "وَالتَّصْوِيرُ"), "fotoğrafçılık", "resim yapma", "okuma", "Hobilerim seyahat ve fotoğrafçılık.", "صُورَةٌ: resim, fotoğraf."],
      [HL("أَسْكُنُ فِي حَيِّ المَيْدَانِ", "حَيِّ"), "mahalle", "cadde", "köy", "Meydan mahallesinde oturuyorum.", "Çoğulu: أَحْيَاءٌ."],
      [HL("فِي السَّنَةِ التَّحْضِيرِيَّةِ", "التَّحْضِيرِيَّةِ"), "hazırlık", "son", "yaz", "Hazırlık sınıfında.", "حَضَّرَ: hazırladı."],
      [HL("عُنْوَانُ بَرِيدِي الإِلِكْتِرُونِيِّ", "بَرِيدِي الإِلِكْتِرُونِيِّ"), "e-postam", "telefonum", "evim", "E-posta adresim.", "بَرِيدٌ: posta."],
      [HL("وَهَذَا رَقْمُ جَوَّالِي", "جَوَّالِي"), "cep telefonum", "kimlik kartım", "adresim", "Bu da cep telefonu numaram.", "رَقْمٌ: numara."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama", short: "Anlama", col: "nasb", legend: ["cerr", "nasb"],
  goals: ["Metinlerle ilgili soruları cevaplamak", "Dört kişinin bilgilerini tabloya yerleştirmek", "Verilen cevaba uygun soruyu sormak", "Cümleyi kimin söylediğini bulmak"],
  examples: [
    { s: "أَيْنَ:cerr / يَسْكُنُ عُمَرُ؟:-", tr: "Ömer nerede oturuyor?", pair: "يَسْكُنُ:- / فِي مَدِينَةِ دِمَشْقَ.:nasb", pairTr: "Şam şehrinde oturuyor." },
    { s: "كَمْ:cerr / عُمْرُكَ يَا عُمَرُ؟:-", tr: "Kaç yaşındasın Ömer?", pair: "عُمْرِي:- / عِشْرُونَ سَنَةً.:nasb", pairTr: "Yirmi yaşındayım." }
  ],
  rules: [
    { tr: "Soru kelimesi cevabın türünü belirler:<br>• <span class=\"ar\">مَا</span> ne? (ad, meslek, uyruk) · <span class=\"ar\">مَنْ</span> kim?<br>• <span class=\"ar\">أَيْنَ</span> nerede? · <span class=\"ar\">مِنْ أَيْنَ</span> nereden, nereli?<br>• <span class=\"ar\">كَمْ</span> kaç? (yaş, sayı; ardından tekil mansûb isim: <span class=\"ar\">كَمْ لُغَةً</span>)" },
    { tr: "Başkası hakkında soru sorarken zamir değişir: <span class=\"ar\">مَا اسْمُكَ؟ ← مَا اسْمُهُ؟ · أَيْنَ تَسْكُنُ؟ ← أَيْنَ يَسْكُنُ؟</span>" },
    { tr: "Metinde olmayan bilgi için “<span class=\"ar\">لَمْ يُذْكَرْ</span>” (söylenmemiş) yazılır; tabloda bunu da kullanacaksın." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: أَيْنَ يَسْكُنُ عُمَرُ؟ مَا جِنْسِيَّةُ مُعَاذٍ؟ كَمْ لُغَةً يَعْرِفُ عُمَرُ؟ أَيْنَ يَعْمَلُ مُعَاذٌ؟ مَا مِهْنَةُ أَحْمَدَ؟ مَنْ أُمُّهُ مُعَلِّمَةٌ؟", "٢ ـ امْلَإِ الجَدْوَلَ الآتِيَ بِالمَعْلُومَاتِ المُنَاسِبَةِ. ٣ ـ اكْتُبْ أَسْئِلَةً مُنَاسِبَةً عَنْ عُمَرَ، كَمَا فِي المِثَالِ. ٤ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["أَيْنَ يَسْكُنُ عُمَرُ؟", "فِي مَدِينَةِ دِمَشْقَ، فِي حَيِّ المَيْدَانِ.", "فِي مَدِينَةِ القَاهِرَةِ.", "فِي أُوسْكُدَار.", "Ömer nerede oturuyor? Şam’da, Meydan mahallesinde.", "Kahire Hüsam’ın, Üsküdar Muâz’ın şehri."],
      ["مَا جِنْسِيَّةُ مُعَاذٍ؟", "يَمَنِيٌّ.", "عِرَاقِيٌّ.", "سُورِيٌّ.", "Muâz’ın uyruğu nedir? Yemenli.", "أَنَا يَمَنِيٌّ."],
      ["كَمْ لُغَةً يَعْرِفُ عُمَرُ؟", "يَعْرِفُ ثَلَاثَ لُغَاتٍ.", "يَعْرِفُ لُغَتَيْنِ.", "يَعْرِفُ لُغَةً وَاحِدَةً.", "Ömer kaç dil biliyor? Üç dil.", "Arapça, İngilizce ve biraz Fransızca."],
      ["أَيْنَ يَعْمَلُ مُعَاذٌ؟", "فِي جَامِعَةِ مَرْمَرَةَ.", "فِي جَامِعَةِ دِمَشْقَ.", "فِي مُسْتَشْفًى فِي بَغْدَادَ.", "Muâz nerede çalışıyor? Marmara Üniversitesinde.", "Hazırlık sınıfında Arapça öğretmeni."],
      ["مَا مِهْنَةُ أَحْمَدَ؟", "طَبِيبٌ.", "مُهَنْدِسٌ.", "مُعَلِّمٌ.", "Ahmed’in mesleği nedir? Doktor.", "أَنَا طَبِيبٌ. (Kitapta “أحمد علي” yazıyor; metindeki ad أحمد الحسين.)"],
      ["مَنْ أُمُّهُ مُعَلِّمَةٌ؟", "حُسَامٌ.", "عُمَرُ.", "مُعَاذٌ.", "Kimin annesi öğretmen? Hüsam’ın.", "أُمِّي مُعَلِّمَةٌ."]
    ])},
    { type: "bank", num: "٢ (أ)", reuse: true, ar: "امْلَإِ الجَدْوَلَ الآتِيَ بِالمَعْلُومَاتِ المُنَاسِبَةِ: اللَّقَبُ، العُمْرُ، البَلَدُ", tr: "Tablonun ilk üç sütunu: önce aşağıdan bilgiyi seç, sonra uygun kutuya dokun. Bir bilgi birden çok kez kullanılabilir; metinde yoksa “لَمْ يُذْكَرْ”.", bank: ["العَفِيفِيُّ", "البُخَارِيُّ", "الحُسَيْنُ", "الهِنْدِيُّ", "تِسْعَ عَشْرَةَ سَنَةً", "عِشْرُونَ سَنَةً", "خَمْسٌ وَثَلَاثُونَ سَنَةً", "مِصْرُ", "سُورِيَةُ", "العِرَاقُ", "اليَمَنُ", "لَمْ يُذْكَرْ"], items: [
      { pre: "حُسَامٌ · اللَّقَبُ:", a: [0], tr: "Hüsam · lakap: el-Afîfî" }, { pre: "حُسَامٌ · العُمْرُ:", a: [4], tr: "Hüsam · yaş: 19" }, { pre: "حُسَامٌ · البَلَدُ:", a: [7], tr: "Hüsam · ülke: Mısır" },
      { pre: "أَحْمَدُ · اللَّقَبُ:", a: [2], tr: "Ahmed · lakap: el-Hüseyn" }, { pre: "أَحْمَدُ · العُمْرُ:", a: [6], tr: "Ahmed · yaş: 35" }, { pre: "أَحْمَدُ · البَلَدُ:", a: [9], tr: "Ahmed · ülke: Irak" },
      { pre: "مُعَاذٌ · اللَّقَبُ:", a: [3], tr: "Muâz · lakap: el-Hindî" }, { pre: "مُعَاذٌ · العُمْرُ:", a: [11], tr: "Muâz · yaş: metinde yok" }, { pre: "مُعَاذٌ · البَلَدُ:", a: [10], tr: "Muâz · ülke: Yemen" },
      { pre: "عُمَرُ · اللَّقَبُ:", a: [1], tr: "Ömer · lakap: el-Buhârî" }, { pre: "عُمَرُ · العُمْرُ:", a: [5], tr: "Ömer · yaş: 20" }, { pre: "عُمَرُ · البَلَدُ:", a: [8], tr: "Ömer · ülke: Suriye" }
    ]},
    { type: "bank", num: "٢ (ب)", reuse: true, ar: "امْلَإِ الجَدْوَلَ: اللُّغَةُ، المِهْنَةُ، الهِوَايَةُ", tr: "Tablonun son üç sütunu. Dil söylenmemişse “لَمْ يُذْكَرْ” de, Arapça da kabul edilir (hepsi Arap).", bank: ["العَرَبِيَّةُ وَالإِنْكِلِيزِيَّةُ وَالفَرَنْسِيَّةُ", "العَرَبِيَّةُ", "طَالِبٌ", "طَبِيبٌ", "مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ", "القِرَاءَةُ وَالرَّسْمُ وَرُكُوبُ الدَّرَّاجَةِ", "المُوسِيقَى وَالسِّبَاحَةُ وَالسَّفَرُ", "السَّفَرُ وَالتَّصْوِيرُ وَالشِّطْرَنْجُ", "لَمْ يُذْكَرْ"], items: [
      { pre: "حُسَامٌ · اللُّغَةُ:", a: [8, 1], tr: "Hüsam · dil: söylenmemiş" }, { pre: "حُسَامٌ · المِهْنَةُ:", a: [2], tr: "Hüsam · meslek: öğrenci" }, { pre: "حُسَامٌ · الهِوَايَةُ:", a: [5], tr: "Hüsam · hobi: okuma, resim, bisiklet" },
      { pre: "أَحْمَدُ · اللُّغَةُ:", a: [8, 1], tr: "Ahmed · dil: söylenmemiş" }, { pre: "أَحْمَدُ · المِهْنَةُ:", a: [3], tr: "Ahmed · meslek: doktor" }, { pre: "أَحْمَدُ · الهِوَايَةُ:", a: [6], tr: "Ahmed · hobi: müzik, yüzme, seyahat" },
      { pre: "مُعَاذٌ · اللُّغَةُ:", a: [1, 8], tr: "Muâz · dil: Arapça (öğretmeni)" }, { pre: "مُعَاذٌ · المِهْنَةُ:", a: [4], tr: "Muâz · meslek: Arapça öğretmeni" }, { pre: "مُعَاذٌ · الهِوَايَةُ:", a: [8], tr: "Muâz · hobi: söylenmemiş" },
      { pre: "عُمَرُ · اللُّغَةُ:", a: [0], tr: "Ömer · dil: Arapça, İngilizce, Fransızca" }, { pre: "عُمَرُ · المِهْنَةُ:", a: [2], tr: "Ömer · meslek: öğrenci" }, { pre: "عُمَرُ · الهِوَايَةُ:", a: [7], tr: "Ömer · hobi: seyahat, fotoğraf, satranç" }
    ]},
    { type: "pick", fill: true, num: "٣", ar: "اكْتُبْ أَسْئِلَةً مُنَاسِبَةً عَنْ عُمَرَ، كَمَا فِي المِثَالِ", tr: "Ömer’in cevabına uygun soruyu seç.", exHtml: '<span class="ar">مِنْ أَيْنَ أَنْتَ يَا عُمَرُ؟ ← أَنَا مِنْ سُورِيَةَ.</span>', items: PL([
      ["___ ← عُمْرِي عِشْرُونَ سَنَةً.", "كَمْ عُمْرُكَ يَا عُمَرُ؟", "مَا اسْمُكَ يَا عُمَرُ؟", "أَيْنَ تَسْكُنُ يَا عُمَرُ؟", "Kaç yaşındasın Ömer? — Yirmi yaşındayım.", "Yaş: كَمْ."],
      ["___ ← أَدْرُسُ فِي جَامِعَةِ دِمَشْقَ.", "أَيْنَ تَدْرُسُ يَا عُمَرُ؟", "كَمْ لُغَةً تَعْرِفُ؟", "مَا اسْمُ أَبِيكَ؟", "Nerede okuyorsun? — Şam Üniversitesinde.", "Yer: أَيْنَ."],
      ["___ ← اسْمُ مَدِينَتِي دِمَشْقُ.", "مَا اسْمُ مَدِينَتِكَ؟", "مَا اسْمُكَ؟", "مِنْ أَيْنَ أَبُوكَ؟", "Şehrinin adı ne? — Şehrimin adı Şam.", "Cevaptaki مَدِينَتِي → soruda مَدِينَتِكَ."],
      ["___ ← أَسْكُنُ فِي حَيِّ المَيْدَانِ.", "أَيْنَ تَسْكُنُ يَا عُمَرُ؟", "مَعَ مَنْ تَسْكُنُ؟", "كَمْ سَنَةً سَكَنْتَ هُنَاكَ؟", "Nerede oturuyorsun? — Meydan mahallesinde.", "أَسْكُنُ → تَسْكُنُ."],
      ["___ ← أَتَكَلَّمُ العَرَبِيَّةَ وَقَلِيلًا مِنَ الفَرَنْسِيَّةِ.", "مَا اللُّغَاتُ الَّتِي تَتَكَلَّمُهَا؟", "مَا هِوَايَاتُكَ؟", "مِنْ أَيْنَ أَنْتَ؟", "Hangi dilleri konuşuyorsun?", "أَتَكَلَّمُ → تَتَكَلَّمُ."]
    ])},
    { type: "pick", num: "٤", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Muâz, Hüsam ve Ahmed hakkındaki sorulara doğru cevabı seç.", items: PL([
      ["مُعَاذٌ: مَا لَقَبُهُ؟", "لَقَبُهُ الهِنْدِيُّ.", "لَقَبُهُ البُخَارِيُّ.", "لَقَبُهُ الحُسَيْنُ.", "Muâz’ın lakabı ne? el-Hindî.", "لَقَبِي الهِنْدِيُّ."],
      ["مُعَاذٌ: مَا جِنْسِيَّتُهُ؟", "هُوَ يَمَنِيٌّ.", "هُوَ تُرْكِيٌّ.", "هُوَ هِنْدِيٌّ.", "Uyruğu ne? Yemenli.", "Lakabı el-Hindî olsa da Yemenlidir."],
      ["مُعَاذٌ: مَا مِهْنَتُهُ؟", "هُوَ مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ.", "هُوَ طَالِبٌ.", "هُوَ صَيْدَلَانِيٌّ.", "Mesleği ne? Arapça öğretmeni.", "Marmara Üniversitesi hazırlık sınıfında."],
      ["حُسَامٌ: كَمْ عُمْرُهُ؟", "عُمْرُهُ تِسْعَ عَشْرَةَ سَنَةً.", "عُمْرُهُ عِشْرُونَ سَنَةً.", "عُمْرُهُ خَمْسٌ وَثَلَاثُونَ سَنَةً.", "Hüsam kaç yaşında? On dokuz.", "تِسْعَ عَشْرَةَ سَنَةً."],
      ["حُسَامٌ: مَا هِوَايَاتُهُ؟", "القِرَاءَةُ وَالرَّسْمُ وَرُكُوبُ الدَّرَّاجَةِ.", "السَّفَرُ وَالتَّصْوِيرُ وَالشِّطْرَنْجُ.", "المُوسِيقَى وَالسِّبَاحَةُ.", "Hobileri ne? Okuma, resim, bisiklet.", "İkinci seçenek Ömer’in hobileri."],
      ["حُسَامٌ: أَيْنَ يَسْكُنُ؟", "يَسْكُنُ فِي مَدِينَةِ القَاهِرَةِ.", "يَسْكُنُ فِي مَدِينَةِ بَغْدَادَ.", "يَسْكُنُ فِي حَيِّ المَيْدَانِ.", "Nerede oturuyor? Kahire’de.", "أَسْكُنُ فِي مَدِينَةِ القَاهِرَةِ."],
      ["أَحْمَدُ: مِنْ أَيْنَ هُوَ؟", "هُوَ مِنَ العِرَاقِ، مِنْ مَدِينَةِ بَغْدَادَ.", "هُوَ مِنْ مِصْرَ.", "هُوَ مِنَ اليَمَنِ.", "Ahmed nereli? Iraklı, Bağdat’tan.", "جِنْسِيَّتِي عِرَاقِيَّةٌ."],
      ["أَحْمَدُ: مَا مِهْنَتُهُ؟", "هُوَ طَبِيبٌ.", "هُوَ مُهَنْدِسٌ.", "هُوَ مُعَلِّمٌ.", "Mesleği ne? Doktor.", "أَنَا طَبِيبٌ."],
      ["أَحْمَدُ: مَا هِوَايَاتُهُ؟", "المُوسِيقَى وَالسِّبَاحَةُ وَالسَّفَرُ.", "القِرَاءَةُ وَالرَّسْمُ.", "التَّصْوِيرُ وَالشِّطْرَنْجُ.", "Hobileri ne? Müzik, yüzme, seyahat.", ""],
      ["أَحْمَدُ: كَمْ شَخْصًا أُسْرَتُهُ؟", "أَرْبَعَةُ أَشْخَاصٍ: هُوَ وَزَوْجَتُهُ وَوَلَدٌ وَبِنْتٌ.", "ثَلَاثَةُ أَشْخَاصٍ.", "سِتَّةُ أَشْخَاصٍ.", "Ailesi kaç kişi? Dört.", "Evli (مُتَزَوِّجٌ), bir oğlu ve bir kızı var."]
    ])},
    { type: "classify", extra: true, opts: KISI, ar: "مَنْ قَالَ هَذَا؟", tr: "Bu cümleyi kim söyledi: Hüsam, Ömer, Ahmed, Muâz?", items: CL([
      ["لَقَبِي العَفِيفِيُّ.", "h", "Hüsam el-Afîfî."], ["لَقَبِي البُخَارِيُّ.", "o", "Ömer el-Buhârî."], ["أَنَا أَحْمَدُ الحُسَيْنُ.", "a", "Ahmed el-Hüseyn."], ["لَقَبِي الهِنْدِيُّ.", "m", "Muâz el-Hindî."],
      ["أَنَا مِنْ مِصْرَ.", "h", "Mısır."], ["أَنَا مِنْ سُورِيَةَ.", "o", "Suriye."], ["جِنْسِيَّتِي عِرَاقِيَّةٌ.", "a", "Irak."], ["أَنَا يَمَنِيٌّ.", "m", "Yemen."],
      ["وَالِدِي مُهَنْدِسٌ.", "h", "Hüsam’ın babası."], ["اسْمُ أَبِي مُحَمَّدٌ، هُوَ صَيْدَلَانِيٌّ.", "o", "Ömer’in babası."], ["أَنَا طَبِيبٌ.", "a", "Ahmed doktor."], ["أَنَا مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ.", "m", "Muâz öğretmen."],
      ["هِوَايَاتِي القِرَاءَةُ وَالرَّسْمُ.", "h", "Hüsam’ın hobileri."], ["أَتَكَلَّمُ اللُّغَةَ الإِنْكِلِيزِيَّةَ.", "o", "Ömer üç dil konuşur."], ["أَنَا مُتَزَوِّجٌ.", "a", "Ahmed evli."], ["عِنْدِي وَلَدَانِ وَبِنْتَانِ.", "m", "Muâz’ın dört çocuğu var."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Eş ve Zıt Anlam", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Uygun kelimeyi metindeki boşluğa yerleştirmek", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek", "Metindeki kelimelerin çoğullarını tanımak"],
  examples: [
    { s: "أُسْرَةٌ:mz.Kelime / = عَائِلَةٌ:nasb.Eş", tr: "aile = aile (eş: مُرَادِفٌ)", pair: "سَنَةٌ:mz.Kelime / = عَامٌ:nasb.Eş", pairTr: "yıl = sene" },
    { s: "صَغِيرٌ:mz.Kelime / ≠ كَبِيرٌ:cerr.Zıt", tr: "küçük ≠ büyük (zıt: ضِدٌّ)", pair: "أَعْزَبُ:mz.Kelime / ≠ مُتَزَوِّجٌ:cerr.Zıt", pairTr: "bekâr ≠ evli" }
  ],
  rules: [
    { tr: "<b>Eş anlam</b> (<span class=\"ar\">المُرَادِفُ</span>): <span class=\"ar\">أُسْرَةٌ = عَائِلَةٌ · سَنَةٌ = عَامٌ · شَارِعٌ = طَرِيقٌ · لُغَةٌ = لِسَانٌ · أَعِيشُ = أَسْكُنُ</span>." },
    { tr: "<b>Zıt anlam</b> (<span class=\"ar\">الضِّدُّ</span>): <span class=\"ar\">جَيِّدٌ ≠ سَيِّئٌ · قَلِيلٌ ≠ كَثِيرٌ · وَلَدٌ ≠ بِنْتٌ · صَغِيرٌ ≠ كَبِيرٌ · قَرِيبٌ ≠ بَعِيدٌ · أَعْزَبُ ≠ مُتَزَوِّجٌ</span>." },
    { tr: "Boşluk doldururken cümlenin anlamına ve kelimenin biçimine bak: kadın için <span class=\"ar\">صَيْدَلَانِيَّةٌ</span>, <span class=\"ar\">تَعِيشُ</span>; sayıdan sonra çoğul: <span class=\"ar\">ثَلَاثُ لُغَاتٍ</span>." },
    { tr: "Kelimelerin çoğullarını, eş ve zıt anlamlılarını “Kelime Hazinesi” sekmesinde aralıklı tekrarla ve oyunlarla ezberleyebilirsin." }
  ],
  kaide: ["٥ ـ اكْتُبِ الكَلِمَةَ المُنَاسِبَةَ فِي الفَرَاغَاتِ الآتِيَةِ: (هِوَايَاتُهَا، تَعِيشُ، صَيْدَلَانِيَّةٌ، لُغَاتٍ، مَدِينَةِ).", "٦ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا. ٧ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا."],
  ex: [
    { type: "bank", num: "٥", ar: "اكْتُبِ الكَلِمَةَ المُنَاسِبَةَ فِي الفَرَاغَاتِ الآتِيَةِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun.", bank: ["هِوَايَاتُهَا", "تَعِيشُ", "صَيْدَلَانِيَّةٌ", "لُغَاتٍ", "مَدِينَةِ"], tr2: "Zeyneb eczacıdır, Mısır’da İskenderiye şehrindendir. Kocasıyla Lübnan’da yaşıyor ve üç dil konuşuyor: Arapça, İngilizce ve Fransızca. Hobisi yüzmedir.",
      parts: ["زَيْنَبُ", { a: [2] }, "، هِيَ مِنْ", { a: [4] }, "الإِسْكَنْدَرِيَّةِ فِي مِصْرَ.", { a: [1] }, "مَعَ زَوْجِهَا فِي لُبْنَانَ، وَتَتَكَلَّمُ ثَلَاثَ", { a: [3] }, "، هِيَ: العَرَبِيَّةُ وَالإِنْكِلِيزِيَّةُ وَالفَرَنْسِيَّةُ.", { a: [0] }, "السِّبَاحَةُ."] },
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["عَامٌ", "لِسَانٌ", "عَائِلَةٌ", "أَسْكُنُ", "طَرِيقٌ"], items: [
      { pre: "أُسْرَةٌ =", a: [2], tr: "aile = aile" }, { pre: "سَنَةٌ =", a: [0], tr: "yıl = sene" }, { pre: "شَارِعٌ =", a: [4], tr: "cadde = yol" }, { pre: "لُغَةٌ =", a: [1], tr: "dil = dil (lisan)" }, { pre: "أَعِيشُ =", a: [3], tr: "yaşıyorum = oturuyorum" }
    ]},
    { type: "bank", num: "٧", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["كَثِيرٌ", "كَبِيرٌ", "سَيِّئٌ", "بَعِيدٌ", "مُتَزَوِّجٌ", "بِنْتٌ"], items: [
      { pre: "جَيِّدٌ ≠", a: [2], tr: "iyi ≠ kötü" }, { pre: "قَلِيلٌ ≠", a: [0], tr: "az ≠ çok" }, { pre: "وَلَدٌ ≠", a: [5], tr: "oğlan ≠ kız" }, { pre: "صَغِيرٌ ≠", a: [1], tr: "küçük ≠ büyük" }, { pre: "قَرِيبٌ ≠", a: [3], tr: "yakın ≠ uzak" }, { pre: "أَعْزَبُ ≠", a: [4], tr: "bekâr ≠ evli" }
    ]},
    { type: "pick", fill: true, extra: true, ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Metindeki kelimenin çoğulunu seç.", items: PL([
      ["اسْمٌ ← ___", "أَسْمَاءٌ", "سُمُوٌّ", "اسْمَاتٌ", "ad → adlar", "أَفْعَالٌ kalıbı."],
      ["لَقَبٌ ← ___", "أَلْقَابٌ", "لُقُوبٌ", "لَقَبَاتٌ", "lakap → lakaplar", "أَفْعَالٌ kalıbı."],
      ["مَدِينَةٌ ← ___", "مُدُنٌ", "مَدِينَاتٌ", "مُدَنَاءُ", "şehir → şehirler", "فُعُلٌ kalıbı."],
      ["أَخٌ ← ___", "إِخْوَةٌ / إِخْوَانٌ", "أَخَوَاتٌ", "أُخُوخٌ", "erkek kardeş → kardeşler", "أَخَوَاتٌ, أُخْتٌ’un çoğuludur."],
      ["أُخْتٌ ← ___", "أَخَوَاتٌ", "إِخْوَةٌ", "أُخُوتٌ", "kız kardeş → kız kardeşler", "Cem-i müennes sâlim."],
      ["هِوَايَةٌ ← ___", "هِوَايَاتٌ", "هَوَايَا", "هِوَاءٌ", "hobi → hobiler", "Cem-i müennes sâlim."],
      ["شَارِعٌ ← ___", "شَوَارِعُ", "شَارِعَاتٌ", "شُرُوعٌ", "cadde → caddeler", "فَوَاعِلُ kalıbı."],
      ["حَيٌّ ← ___", "أَحْيَاءٌ", "حَيَوَاتٌ", "حُيُوٌّ", "mahalle → mahalleler", "أَفْعَالٌ kalıbı."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE VE ZAMİR
{
  id: "u4", no: 4, ar: "تَرْتِيبُ الجُمَلِ وَالضَّمَائِرُ المُتَّصِلَةُ", tr: "Cümle Kurma ve Bitişik Zamirler", short: "Zamir", col: "ref", legend: [],
  goals: ["Karışık kelimelerden anlamlı cümle kurmak", "İsme bitişen zamirleri tanımak: benim, bizim, senin, onun", "Bitişik zamirden ayrı zamiri bulmak", "Ayrı zamire uygun bitişik biçimi seçmek"],
  examples: [
    { s: "اسْمِـ:mz.İsim / ـي:cerr.أَنَا", tr: "اسْمِي: benim adım", pair: "اسْمُـ:mz.İsim / ـنَا:cerr.نَحْنُ", pairTr: "اسْمُنَا: bizim adımız" },
    { s: "اسْمُـ:mz.İsim / ـكَ:cerr.أَنْتَ", tr: "اسْمُكَ: senin adın (erkek)", pair: "اسْمُـ:mz.İsim / ـكِ:cerr.أَنْتِ", pairTr: "اسْمُكِ: senin adın (kadın)" },
    { s: "اسْمُـ:mz.İsim / ـهُ:cerr.هُوَ", tr: "اسْمُهُ: onun adı (erkek)", pair: "اسْمُـ:mz.İsim / ـهَا:cerr.هِيَ", pairTr: "اسْمُهَا: onun adı (kadın)" }
  ],
  rules: [
    { tr: "<b>Dikkat et (لَاحِظْ):</b> Ayrı zamir ve isme bitişen biçimi:<br>• ben: <span class=\"ar\">أَنَا ← اسْمِي</span> · biz: <span class=\"ar\">نَحْنُ ← اسْمُنَا</span><br>• sen (erkek): <span class=\"ar\">أَنْتَ ← اسْمُكَ</span> · sen (kadın): <span class=\"ar\">أَنْتِ ← اسْمُكِ</span><br>• o (erkek): <span class=\"ar\">هُوَ ← اسْمُهُ</span> · o (kadın): <span class=\"ar\">هِيَ ← اسْمُهَا</span>" },
    { tr: "Kelime sonundaki yuvarlak tâ, zamir alınca açık tâya döner: <span class=\"ar\">مَدْرَسَةٌ ← مَدْرَسَتُهُ · سَيَّارَةٌ ← سَيَّارَتُنَا</span>." },
    { tr: "<b>Cümle kurarken:</b> Fiil cümlesi fiille başlar (<span class=\"ar\">أَعِيشُ فِي مَدِينَةِ دِمَشْقَ</span>); isim cümlesinde önce mübtedâ, sonra haber gelir (<span class=\"ar\">أَنَا مُدَرِّسُ اللُّغَةِ العَرَبِيَّةِ</span>). Tamlamada muzâf ile muzâfun ileyh ayrılmaz: <span class=\"ar\">مَدِينَةِ دِمَشْقَ، جَامِعَةِ مَرْمَرَةَ</span>." }
  ],
  kaide: ["٨ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمْلَةً مُفِيدَةً. مِثَالٌ: حُسَامٌ، عُمْرُ، سَنَةً، سِتَّ عَشْرَةَ ← عُمْرُ حُسَامٍ سِتَّ عَشْرَةَ سَنَةً.", "لَاحِظْ: أَنَا ← اسْمِي، نَحْنُ ← اسْمُنَا، أَنْتَ ← اسْمُكَ، أَنْتِ ← اسْمُكِ، هُوَ ← اسْمُهُ، هِيَ ← اسْمُهَا. اكْتُبِ الضَّمِيرَ المُنَاسِبَ فِي الفَرَاغِ، كَمَا فِي المِثَالِ: هِيَ ← كِتَابُهَا."],
  ex: [
    { type: "bank", num: "٨", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمْلَةً مُفِيدَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", exHtml: '<span class="ar">حُسَامٌ، عُمْرُ، سَنَةً، سِتَّ عَشْرَةَ ← عُمْرُ حُسَامٍ سِتَّ عَشْرَةَ سَنَةً.</span>', bank: ["مَدِينَةِ", "دِمَشْقَ", "فِي", "مُدَرِّسُ", "اللُّغَةِ", "العَرَبِيَّةِ", "جَامِعَةِ", "اللُّغَةَ", "العَرَبِيَّةَ", "مَرْمَرَةَ", "أُسْرَةُ", "أَحْمَدَ", "إِسْطَنْبُولَ"], tr2: "1) Şam şehrinde yaşıyorum. 2) Ben Arapça öğretmeniyim. 3) Marmara Üniversitesinde Arapça öğretiyorum. 4) Ahmed’in ailesi İstanbul şehrinde oturuyor.",
      parts: ["١ ـ أَعِيشُ", { a: [2] }, { a: [0] }, { a: [1] }, ".<br>٢ ـ أَنَا", { a: [3] }, { a: [4] }, { a: [5] }, ".<br>٣ ـ أُعَلِّمُ", { a: [7] }, { a: [8] }, { a: [2] }, { a: [6] }, { a: [9] }, ".<br>٤ ـ تَسْكُنُ", { a: [10] }, { a: [11] }, { a: [2] }, { a: [0] }, { a: [12] }, "."] },
    { type: "pick", fill: true, num: "٩", ar: "اكْتُبِ الضَّمِيرَ المُنَاسِبَ فِي الفَرَاغِ، كَمَا فِي المِثَالِ", tr: "İsme bitişen zamire uygun ayrı zamiri seç. İlk beşi kitaptan.", exHtml: '<span class="ar">هِيَ ← كِتَابُهَا</span>', items: PL([
      ["___ ← مَدْرَسَتُهُ.", "هُوَ", "هِيَ", "أَنْتَ", "onun (erkek) okulu", "ـهُ ← هُوَ"],
      ["___ ← مَدِينَتُكَ.", "أَنْتَ", "أَنْتِ", "أَنَا", "senin (erkek) şehrin", "ـكَ ← أَنْتَ"],
      ["___ ← سَيَّارَتُنَا.", "نَحْنُ", "أَنَا", "هِيَ", "bizim arabamız", "ـنَا ← نَحْنُ"],
      ["___ ← عُنْوَانِي.", "أَنَا", "نَحْنُ", "هُوَ", "benim adresim", "ـِي ← أَنَا"],
      ["___ ← مُعَلِّمُكِ.", "أَنْتِ", "أَنْتَ", "هِيَ", "senin (kadın) öğretmenin", "ـكِ ← أَنْتِ"],
      ["___ ← بَيْتُنَا.", "نَحْنُ", "هُوَ", "أَنْتِ", "bizim evimiz", "ـنَا ← نَحْنُ"],
      ["___ ← قَلَمُكِ.", "أَنْتِ", "أَنْتَ", "أَنَا", "senin (kadın) kalemin", "ـكِ ← أَنْتِ"],
      ["___ ← أُمُّهُ.", "هُوَ", "هِيَ", "نَحْنُ", "onun (erkek) annesi", "ـهُ ← هُوَ"],
      ["___ ← هِوَايَاتُهَا.", "هِيَ", "هُوَ", "أَنْتَ", "onun (kadın) hobileri", "ـهَا ← هِيَ"],
      ["___ ← جَوَّالُكَ.", "أَنْتَ", "أَنْتِ", "نَحْنُ", "senin (erkek) cep telefonun", "ـكَ ← أَنْتَ"],
      ["___ ← لَقَبِي.", "أَنَا", "هِيَ", "أَنْتِ", "benim lakabım", "ـِي ← أَنَا"],
      ["___ ← جَامِعَتُهَا.", "هِيَ", "أَنْتِ", "هُوَ", "onun (kadın) üniversitesi", "ـهَا ← هِيَ"]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الكَلِمَةَ بِالضَّمِيرِ المُنَاسِبِ", tr: "Ayrı zamire uygun bitişik biçimi seç.", items: PL([
      ["أَنَا: ___ عُمَرُ.", "اسْمِي", "اسْمُكَ", "اسْمُهُ", "Benim adım Ömer.", "أَنَا ← ـِي"],
      ["هِيَ: ___ مُنَى.", "اسْمُهَا", "اسْمُهُ", "اسْمُكِ", "Onun adı Müne.", "هِيَ ← ـهَا"],
      ["نَحْنُ: ___ فِي دِمَشْقَ.", "جَامِعَتُنَا", "جَامِعَتِي", "جَامِعَتُهَا", "Üniversitemiz Şam’da.", "نَحْنُ ← ـنَا"],
      ["أَنْتَ: مَا ___؟", "مِهْنَتُكَ", "مِهْنَتُكِ", "مِهْنَتُهُ", "Mesleğin ne? (erkeğe)", "أَنْتَ ← ـكَ"],
      ["أَنْتِ: مَا ___؟", "هِوَايَاتُكِ", "هِوَايَاتُكَ", "هِوَايَاتُهَا", "Hobilerin ne? (kadına)", "أَنْتِ ← ـكِ"],
      ["هُوَ: ___ مُهَنْدِسٌ.", "وَالِدُهُ", "وَالِدُهَا", "وَالِدِي", "Onun babası mühendis.", "هُوَ ← ـهُ"]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · SELAMLAŞMA VE KİMLİK KARTI
{
  id: "u5", no: 5, ar: "التَّحِيَّاتُ وَالبِطَاقَةُ الشَّخْصِيَّةُ", tr: "Selamlaşma ve Kimlik Kartı", short: "Kimlik kartı", col: "muz", legend: [],
  goals: ["Selamlaşma ve tanışma ifadelerini cevaplarıyla bilmek", "Kimlik kartının alanlarını (künye, doğum yeri, medeni hâl…) tanımak", "Kendini Arapça tanıtan kısa bir paragraf yazmak", "Kendi kimlik kartını doldurmak"],
  examples: [
    { s: "السَّلَامُ عَلَيْكُمْ:mz.Selam / ← وَعَلَيْكُمُ السَّلَامُ:nasb.Cevap", tr: "Selâmun aleyküm. — Ve aleyküm selâm." },
    { s: "صَبَاحُ الخَيْرِ:mz.Selam / ← صَبَاحُ النُّورِ:nasb.Cevap", tr: "Günaydın. — Günaydın (nurlu sabah)." }
  ],
  rules: [
    { tr: "<b>Selamlaşma ve cevabı:</b><br>• <span class=\"ar\">السَّلَامُ عَلَيْكُمْ ← وَعَلَيْكُمُ السَّلَامُ</span><br>• <span class=\"ar\">مَرْحَبًا ← مَرْحَبًا بِكَ / أَهْلًا</span> · <span class=\"ar\">أَهْلًا وَسَهْلًا ← أَهْلًا بِكَ</span><br>• <span class=\"ar\">صَبَاحُ الخَيْرِ ← صَبَاحُ النُّورِ</span> · <span class=\"ar\">مَسَاءُ الخَيْرِ ← مَسَاءُ النُّورِ</span><br>• <span class=\"ar\">كَيْفَ حَالُكَ؟ ← بِخَيْرٍ، وَالحَمْدُ لِلَّهِ</span> · <span class=\"ar\">مَعَ السَّلَامَةِ ← فِي أَمَانِ اللهِ</span>" },
    { tr: "<b>Kimlik kartı</b> (<span class=\"ar\">البِطَاقَةُ الشَّخْصِيَّةُ</span>) alanları: <span class=\"ar\">الاسْمُ</span> ad · <span class=\"ar\">اسْمُ الأَبِ وَكُنْيَتُهُ</span> babanın adı ve künyesi · <span class=\"ar\">اسْمُ الأُمِّ وَكُنْيَتُهَا</span> annenin adı ve künyesi · <span class=\"ar\">تَارِيخُ المِيلَادِ</span> doğum tarihi · <span class=\"ar\">مَكَانُ الوِلَادَةِ</span> doğum yeri · <span class=\"ar\">المِهْنَةُ</span> meslek · <span class=\"ar\">الحَالَةُ الاجْتِمَاعِيَّةُ</span> medeni hâl." },
    { tr: "<b>Künye</b> (<span class=\"ar\">الكُنْيَةُ</span>): “… babası / annesi” anlamında <span class=\"ar\">أَبُو</span> ya da <span class=\"ar\">أُمُّ</span> ile kurulan ad: <span class=\"ar\">أَبُو يُوسُفَ، أُمُّ حُسَامٍ</span>." }
  ],
  kaide: ["٩ ـ امْلَإِ البِطَاقَةَ الشَّخْصِيَّةَ: الاسْمُ، اسْمُ الأَبِ وَكُنْيَتُهُ، اسْمُ الأُمِّ وَكُنْيَتُهَا، تَارِيخُ المِيلَادِ، مَكَانُ الوِلَادَةِ، المِهْنَةُ، الحَالَةُ الاجْتِمَاعِيَّةُ."],
  ex: [
    { type: "pick", extra: true, ar: "مَا الرَّدُّ المُنَاسِبُ؟", tr: "Selama ya da soruya uygun cevabı seç.", items: PL([
      ["السَّلَامُ عَلَيْكُمْ.", "وَعَلَيْكُمُ السَّلَامُ.", "صَبَاحُ النُّورِ.", "مَعَ السَّلَامَةِ.", "Selâmun aleyküm. — Ve aleyküm selâm.", "Selamın cevabı."],
      ["صَبَاحُ الخَيْرِ.", "صَبَاحُ النُّورِ.", "مَسَاءُ النُّورِ.", "بِخَيْرٍ.", "Günaydın. — Günaydın.", "صَبَاحٌ: sabah."],
      ["مَسَاءُ الخَيْرِ.", "مَسَاءُ النُّورِ.", "صَبَاحُ النُّورِ.", "فِي أَمَانِ اللهِ.", "İyi akşamlar. — İyi akşamlar.", "مَسَاءٌ: akşam."],
      ["كَيْفَ حَالُكَ؟", "بِخَيْرٍ، وَالحَمْدُ لِلَّهِ.", "اسْمِي حُسَامٌ.", "أَنَا مِنْ مِصْرَ.", "Nasılsın? — İyiyim, Allah’a hamdolsun.", "حَالٌ: durum."],
      ["أَهْلًا وَسَهْلًا.", "أَهْلًا بِكَ.", "عَفْوًا.", "مَعَ السَّلَامَةِ.", "Hoş geldin. — Hoş bulduk.", ""],
      ["مَعَ السَّلَامَةِ.", "فِي أَمَانِ اللهِ.", "وَعَلَيْكُمُ السَّلَامُ.", "صَبَاحُ النُّورِ.", "Güle güle. — Allah’a emanet ol.", "Ayrılırken."],
      ["مَا اسْمُكَ؟", "اسْمِي عُمَرُ.", "أَنَا طَالِبٌ.", "عُمْرِي عِشْرُونَ سَنَةً.", "Adın ne? — Adım Ömer.", ""],
      ["مِنْ أَيْنَ أَنْتِ؟", "أَنَا مِنْ تُرْكِيَا.", "أَنَا طَالِبَةٌ.", "اسْمِي زَيْنَبُ.", "Nerelisin? — Türkiye’denim.", "مِنْ أَيْنَ: nereden."]
    ])},
    { type: "bank", extra: true, ar: "أَكْمِلِ التَّعْرِيفَ بِنَفْسِكَ", tr: "Kendini tanıtma paragrafını tamamla: önce kelimeyi seç, sonra boşluğa dokun.", bank: ["اسْمِي", "أَنَا", "عُمْرِي", "مِنْ", "أَسْكُنُ", "أَتَكَلَّمُ", "هِوَايَاتِي"], tr2: "Selâmun aleyküm. Adım Yusuf, öğrenciyim, on sekiz yaşındayım. Türkiye’denim, İstanbul şehrinde oturuyorum. Türkçe ve Arapça konuşuyorum; hobilerim okuma ve futbol.",
      parts: ["السَّلَامُ عَلَيْكُمْ،", { a: [0] }, "يُوسُفُ،", { a: [1] }, "طَالِبٌ،", { a: [2] }, "ثَمَانِيَ عَشْرَةَ سَنَةً. أَنَا", { a: [3] }, "تُرْكِيَا،", { a: [4] }, "فِي مَدِينَةِ إِسْطَنْبُولَ.", { a: [5] }, "التُّرْكِيَّةَ وَالعَرَبِيَّةَ، وَ", { a: [6] }, "القِرَاءَةُ وَكُرَةُ القَدَمِ."] },
    { type: "reading", num: "٩", ar: "امْلَإِ البِطَاقَةَ الشَّخْصِيَّةَ", tr: "Örnek kimlik kartını oku; yönlendirici sorularla kendi kartını defterine doldur, sonra bilginin hangi alana yazıldığını seç.", title: "البِطَاقَةُ الشَّخْصِيَّةُ (نَمُوذَجٌ)", speak: true,
      text: "الاسْمُ: يُوسُفُ أَحْمَدُ<br>اسْمُ الأَبِ وَكُنْيَتُهُ: أَحْمَدُ، أَبُو يُوسُفَ<br>اسْمُ الأُمِّ وَكُنْيَتُهَا: فَاطِمَةُ، أُمُّ يُوسُفَ<br>تَارِيخُ المِيلَادِ: " + LTR("15/3/2006") + "<br>مَكَانُ الوِلَادَةِ: إِسْطَنْبُولُ<br>المِهْنَةُ: طَالِبٌ<br>الحَالَةُ الاجْتِمَاعِيَّةُ: أَعْزَبُ",
      textTr: "Ad: Yusuf Ahmed · Babanın adı ve künyesi: Ahmed, Ebû Yusuf · Annenin adı ve künyesi: Fâtıma, Ümmü Yusuf · Doğum tarihi: 15/3/2006 · Doğum yeri: İstanbul · Meslek: öğrenci · Medeni hâl: bekâr",
      qa: [
        { q: "مَا اسْمُكَ؟ وَمَا اسْمُ أَبِيكَ وَكُنْيَتُهُ؟", a: "اسْمِي … ، اسْمُ أَبِي … ، وَكُنْيَتُهُ أَبُو …", tr: "Adın ne? Babanın adı ve künyesi? (Kendi cevabını yaz.)" },
        { q: "مَا اسْمُ أُمِّكَ وَكُنْيَتُهَا؟", a: "اسْمُ أُمِّي … ، وَكُنْيَتُهَا أُمُّ …", tr: "Annenin adı ve künyesi?" },
        { q: "مَتَى وُلِدْتَ؟ وَأَيْنَ وُلِدْتَ؟", a: "وُلِدْتُ فِي … ، فِي مَدِينَةِ …", tr: "Ne zaman ve nerede doğdun?" },
        { q: "مَا مِهْنَتُكَ؟ وَمَا حَالَتُكَ الاجْتِمَاعِيَّةُ؟", a: "أَنَا طَالِبٌ، وَأَنَا أَعْزَبُ / مُتَزَوِّجٌ.", tr: "Mesleğin ve medeni hâlin?" }
      ],
      cls: { opts: ALAN, ar: "فِي أَيِّ خَانَةٍ تُكْتَبُ هَذِهِ المَعْلُومَةُ؟", tr: "Bu bilgi kartın hangi alanına yazılır?", items: [
        { s: "أَبُو يُوسُفَ", a: "b", why: "أَبُو + oğlunun adı: babanın künyesi." },
        { s: "أُمُّ حُسَامٍ", a: "n", why: "أُمُّ + oğlunun adı: annenin künyesi." },
        { s: LTR("2/5/1990"), a: "t", why: "Tarih: doğum tarihi." },
        { s: "بَغْدَادُ", a: "y", why: "Şehir: doğum yeri." },
        { s: "طَبِيبٌ", a: "m", why: "Meslek." },
        { s: "مُتَزَوِّجٌ", a: "s", why: "Evli: medeni hâl." },
        { s: "أَبُو مُحَمَّدٍ", a: "b", why: "Babanın künyesi." },
        { s: "مُهَنْدِسَةٌ", a: "m", why: "Meslek (kadın)." },
        { s: "أَعْزَبُ", a: "s", why: "Bekâr: medeni hâl." },
        { s: "دِمَشْقُ", a: "y", why: "Doğum yeri." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ {وَبَرَكَاتُهُ}.", ["وَبَرَكَاتُهُ", "وَمَغْفِرَتُهُ", "وَسَلَامُهُ"], "selam", "Allah’ın selamı, rahmeti ve bereketi üzerinize olsun.", "u1"],
  ["اسْمِي حُسَامٌ، {لَقَبِي} العَفِيفِيُّ.", ["لَقَبِي", "عُمْرِي", "بَلَدِي"], "lakap", "Adım Hüsam, lakabım el-Afîfî.", "u1"],
  ["أَسْكُنُ فِي مَدِينَةِ {القَاهِرَةِ}.", ["القَاهِرَةِ", "دِمَشْقَ", "بَغْدَادَ"], "Hüsam", "Kahire şehrinde oturuyorum.", "u1"],
  ["عُمْرِي تِسْعَ عَشْرَةَ {سَنَةً}.", ["سَنَةً", "سَنَوَاتٍ", "سَنَةٌ"], "yaş", "On dokuz yaşındayım.", "u1"],
  ["وَالِدِي {مُهَنْدِسٌ}، أُمِّي مُعَلِّمَةٌ.", ["مُهَنْدِسٌ", "طَبِيبٌ", "صَيْدَلَانِيٌّ"], "Hüsam", "Babam mühendis, annem öğretmen.", "u1"],
  ["هِوَايَاتِي القِرَاءَةُ وَالرَّسْمُ وَرُكُوبُ {الدَّرَّاجَةِ}.", ["الدَّرَّاجَةِ", "الطَّائِرَةِ", "السَّفِينَةِ"], "hobi", "Hobilerim okuma, resim ve bisiklete binmek.", "u1"],
  ["أَنَا طَالِبٌ فِي جَامِعَةِ {دِمَشْقَ}.", ["دِمَشْقَ", "مَرْمَرَةَ", "القَاهِرَةِ"], "Ömer", "Şam Üniversitesinde öğrenciyim.", "u1"],
  ["اسْمُ أَبِي مُحَمَّدٌ، هُوَ {صَيْدَلَانِيٌّ}.", ["صَيْدَلَانِيٌّ", "مُهَنْدِسٌ", "مُعَلِّمٌ"], "Ömer", "Babamın adı Muhammed, eczacıdır.", "u2"],
  ["أَتَكَلَّمُ اللُّغَةَ العَرَبِيَّةَ وَ{قَلِيلًا} مِنَ الفَرَنْسِيَّةِ.", ["قَلِيلًا", "كَثِيرًا", "جَيِّدًا"], "Ömer", "Arapça ve biraz Fransızca konuşuyorum.", "u2"],
  ["جِنْسِيَّتِي {عِرَاقِيَّةٌ}.", ["عِرَاقِيَّةٌ", "سُورِيَّةٌ", "يَمَنِيَّةٌ"], "Ahmed", "Uyruğum Irak.", "u2"],
  ["أَنَا {مُتَزَوِّجٌ}، أَسْكُنُ مَعَ أُسْرَتِي.", ["مُتَزَوِّجٌ", "أَعْزَبُ", "صَغِيرٌ"], "Ahmed", "Evliyim, ailemle oturuyorum.", "u2"],
  ["أَنَا مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ فِي جَامِعَةِ {مَرْمَرَةَ}.", ["مَرْمَرَةَ", "دِمَشْقَ", "بَغْدَادَ"], "Muâz", "Marmara Üniversitesinde Arapça öğretmeniyim.", "u2"],
  ["عِنْدِي {وَلَدَانِ} وَبِنْتَانِ.", ["وَلَدَانِ", "وَلَدٌ", "أَوْلَادٌ"], "Muâz", "İki oğlum ve iki kızım var.", "u2"],
  ["الأُسْرَةُ تَعْنِي {العَائِلَةَ}.", ["العَائِلَةَ", "الطَّرِيقَ", "اللِّسَانَ"], "eş anlam", "Üsre aile demektir.", "u3"],
  ["السَّنَةُ تَعْنِي {العَامَ}.", ["العَامَ", "اليَوْمَ", "الشَّهْرَ"], "eş anlam", "Sene yıl demektir.", "u3"],
  ["الصَّغِيرُ عَكْسُ {الكَبِيرِ}.", ["الكَبِيرِ", "القَلِيلِ", "القَرِيبِ"], "zıt", "Küçük büyüğün zıddıdır.", "u3"],
  ["الأَعْزَبُ عَكْسُ {المُتَزَوِّجِ}.", ["المُتَزَوِّجِ", "الطَّالِبِ", "الصَّغِيرِ"], "zıt", "Bekâr evlinin zıddıdır.", "u3"],
  ["زَيْنَبُ {صَيْدَلَانِيَّةٌ}، هِيَ مِنَ الإِسْكَنْدَرِيَّةِ.", ["صَيْدَلَانِيَّةٌ", "صَيْدَلَانِيٌّ", "صَيْدَلِيَّةٌ"], "boşluk", "Zeyneb eczacıdır.", "u3"],
  ["أَعِيشُ فِي {مَدِينَةِ} دِمَشْقَ.", ["مَدِينَةِ", "مَدِينَةَ", "المَدِينَةِ"], "cümle", "Şam şehrinde yaşıyorum.", "u4"],
  ["هِيَ: {كِتَابُهَا}.", ["كِتَابُهَا", "كِتَابُهُ", "كِتَابُكِ"], "zamir", "Onun (kadın) kitabı.", "u4"],
  ["نَحْنُ: {سَيَّارَتُنَا}.", ["سَيَّارَتُنَا", "سَيَّارَتِي", "سَيَّارَتُكُمْ"], "zamir", "Bizim arabamız.", "u4"],
  ["أَنْتِ: {مُعَلِّمُكِ}.", ["مُعَلِّمُكِ", "مُعَلِّمُكَ", "مُعَلِّمُهَا"], "zamir", "Senin (kadın) öğretmenin.", "u4"],
  ["صَبَاحُ الخَيْرِ. ← صَبَاحُ {النُّورِ}.", ["النُّورِ", "الخَيْرِ", "السَّلَامِ"], "selam", "Günaydın. — Günaydın.", "u5"],
  ["كَيْفَ حَالُكَ؟ ← {بِخَيْرٍ}، وَالحَمْدُ لِلَّهِ.", ["بِخَيْرٍ", "أَهْلًا", "شُكْرًا"], "selam", "Nasılsın? — İyiyim.", "u5"],
  ["اسْمُ الأَبِ {وَكُنْيَتُهُ}: أَحْمَدُ، أَبُو يُوسُفَ.", ["وَكُنْيَتُهُ", "وَمِهْنَتُهُ", "وَعُمْرُهُ"], "kimlik kartı", "Babanın adı ve künyesi.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["عُمْرُ حُسَامٍ عِشْرُونَ سَنَةً ← metne göre düzelt", "عُمْرُ حُسَامٍ تِسْعَ عَشْرَةَ سَنَةً", "عُمْرُ حُسَامٍ ثَلَاثُونَ سَنَةً", "عُمْرُ حُسَامٍ عَشْرُ سَنَوَاتٍ", "Yirmi yaşında olan Ömer.", "u1"],
  ["أَحْمَدُ أَعْزَبُ ← metne göre düzelt", "أَحْمَدُ مُتَزَوِّجٌ", "أَحْمَدُ صَغِيرٌ", "أَحْمَدُ طَالِبٌ", "أَنَا مُتَزَوِّجٌ.", "u1"],
  ["يُعَلِّمُ مُعَاذٌ الإِنْكِلِيزِيَّةَ ← metne göre düzelt", "يُعَلِّمُ مُعَاذٌ العَرَبِيَّةَ", "يُعَلِّمُ مُعَاذٌ الفَرَنْسِيَّةَ", "يُعَلِّمُ مُعَاذٌ التُّرْكِيَّةَ", "مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ.", "u1"],
  ["عُمْرِي عِشْرُونَ سَنَةً ← soruyu yaz", "كَمْ عُمْرُكَ؟", "مَا اسْمُكَ؟", "أَيْنَ تَسْكُنُ؟", "Yaş: كَمْ.", "u2"],
  ["أَسْكُنُ فِي حَيِّ المَيْدَانِ ← soruyu yaz", "أَيْنَ تَسْكُنُ؟", "كَمْ عُمْرُكَ؟", "مَا مِهْنَتُكَ؟", "Yer: أَيْنَ.", "u2"],
  ["أَنَا مِنْ سُورِيَةَ ← soruyu yaz", "مِنْ أَيْنَ أَنْتَ؟", "مَنْ أَنْتَ؟", "مَا اسْمُكَ؟", "Nereli: مِنْ أَيْنَ.", "u2"],
  ["أُسْرَةٌ ← eş anlam", "عَائِلَةٌ", "طَرِيقٌ", "لِسَانٌ", "aile = aile", "u3"],
  ["شَارِعٌ ← eş anlam", "طَرِيقٌ", "عَامٌ", "عَائِلَةٌ", "cadde = yol", "u3"],
  ["قَرِيبٌ ← zıt anlam", "بَعِيدٌ", "كَبِيرٌ", "كَثِيرٌ", "yakın ≠ uzak", "u3"],
  ["جَيِّدٌ ← zıt anlam", "سَيِّئٌ", "قَلِيلٌ", "صَغِيرٌ", "iyi ≠ kötü", "u3"],
  ["أَنَا + اسْمٌ ← bitişik biçim", "اسْمِي", "اسْمُكَ", "اسْمُنَا", "أَنَا ← ـِي", "u4"],
  ["هِيَ + مَدْرَسَةٌ ← bitişik biçim", "مَدْرَسَتُهَا", "مَدْرَسَتُهُ", "مَدْرَسَةُهَا", "Tâ açılır: مَدْرَسَتُ + هَا.", "u4"],
  ["حُسَامٌ، عُمْرُ، سَنَةً، سِتَّ عَشْرَةَ ← sırala", "عُمْرُ حُسَامٍ سِتَّ عَشْرَةَ سَنَةً", "حُسَامٌ عُمْرُ سَنَةً سِتَّ عَشْرَةَ", "سَنَةً سِتَّ عَشْرَةَ عُمْرُ حُسَامٍ", "Kitaptaki örnek.", "u4"],
  ["السَّلَامُ عَلَيْكُمْ ← cevap ver", "وَعَلَيْكُمُ السَّلَامُ", "صَبَاحُ النُّورِ", "مَعَ السَّلَامَةِ", "Selamın cevabı.", "u5"]
];
// Kim söyledi? hız oyunu
var NOUN_LIST = UNITS[1].ex[5].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = KISI;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt anlamı", pairs: [["جَيِّدٌ", "سَيِّئٌ"], ["قَلِيلٌ", "كَثِيرٌ"], ["وَلَدٌ", "بِنْتٌ"], ["صَغِيرٌ", "كَبِيرٌ"], ["قَرِيبٌ", "بَعِيدٌ"], ["أَعْزَبُ", "مُتَزَوِّجٌ"], ["أَخٌ", "أُخْتٌ"], ["مَدِينَةٌ", "قَرْيَةٌ"]] },
  es: { name: "Selam ↔ cevabı", pairs: [["السَّلَامُ عَلَيْكُمْ", "وَعَلَيْكُمُ السَّلَامُ"], ["صَبَاحُ الخَيْرِ", "صَبَاحُ النُّورِ"], ["مَسَاءُ الخَيْرِ", "مَسَاءُ النُّورِ"], ["كَيْفَ حَالُكَ؟", "بِخَيْرٍ"], ["أَهْلًا وَسَهْلًا", "أَهْلًا بِكَ"], ["مَعَ السَّلَامَةِ", "فِي أَمَانِ اللهِ"], ["أُسْرَةٌ", "عَائِلَةٌ"], ["سَنَةٌ", "عَامٌ"]] },
  co: { name: "Zamir ↔ bitişik biçim", pairs: [["أَنَا", "اسْمِي"], ["نَحْنُ", "اسْمُنَا"], ["أَنْتَ", "اسْمُكَ"], ["أَنْتِ", "اسْمُكِ"], ["هُوَ", "اسْمُهُ"], ["هِيَ", "اسْمُهَا"]] }
};
var KARTLAR = [
  ["Hüsam kimdir?", "حُسَامٌ العَفِيفِيُّ — Mısırlı, 19 yaşında üniversite öğrencisi; Kahire’de oturuyor."],
  ["Ömer kimdir?", "عُمَرُ البُخَارِيُّ — Suriyeli, 20 yaşında, Şam Üniversitesinde öğrenci; üç dil konuşuyor."],
  ["Ahmed kimdir?", "أَحْمَدُ الحُسَيْنُ — Bağdatlı, 35 yaşında doktor; evli, bir oğlu ve bir kızı var."],
  ["Muâz kimdir?", "مُعَاذٌ الهِنْدِيُّ — Yemenli Arapça öğretmeni; Marmara Üniversitesi, Üsküdar."],
  ["Adın ne? / Nerelisin?", "مَا اسْمُكَ؟ ← اسْمِي… · مِنْ أَيْنَ أَنْتَ؟ ← أَنَا مِنْ…"],
  ["Kaç yaşındasın? / Mesleğin?", "كَمْ عُمْرُكَ؟ ← عُمْرِي… سَنَةً · مَا مِهْنَتُكَ؟ ← أَنَا…"],
  ["Hobilerin?", "مَا هِوَايَاتُكَ؟ ← هِوَايَاتِي القِرَاءَةُ وَالسَّفَرُ…"],
  ["Selam ve cevabı?", "السَّلَامُ عَلَيْكُمْ ← وَعَلَيْكُمُ السَّلَامُ · صَبَاحُ الخَيْرِ ← صَبَاحُ النُّورِ"],
  ["Bitişik zamirler?", "اسْمِي، اسْمُنَا، اسْمُكَ، اسْمُكِ، اسْمُهُ، اسْمُهَا"],
  ["Eş anlamlar?", "أُسْرَةٌ = عَائِلَةٌ · سَنَةٌ = عَامٌ · شَارِعٌ = طَرِيقٌ · لُغَةٌ = لِسَانٌ"],
  ["Zıt anlamlar?", "صَغِيرٌ ≠ كَبِيرٌ · قَلِيلٌ ≠ كَثِيرٌ · أَعْزَبُ ≠ مُتَزَوِّجٌ"],
  ["Kimlik kartı alanları?", "الاسْمُ · اسْمُ الأَبِ وَكُنْيَتُهُ · تَارِيخُ المِيلَادِ · مَكَانُ الوِلَادَةِ · المِهْنَةُ · الحَالَةُ الاجْتِمَاعِيَّةُ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat01";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("اسْمٌ", "i", "ad, isim", "أَسْمَاءٌ", "efal", "", "", "اسْمِي حُسَامٌ، لَقَبِي العَفِيفِيُّ.", "اسْمِي", "Adım Hüsam, lakabım el-Afîfî."),
  KW("لَقَبٌ", "i", "lakap, aile adı", "أَلْقَابٌ", "efal", "", "", "مَرْحَبًا، اسْمِي عُمَرُ، لَقَبِي البُخَارِيُّ.", "لَقَبِي", "Merhaba, adım Ömer, lakabım el-Buhârî."),
  KW("مَدِينَةٌ", "i", "şehir", "مُدُنٌ", "fuul_k", "", "قَرْيَةٌ", "أَسْكُنُ فِي مَدِينَةِ القَاهِرَةِ.", "مَدِينَةِ", "Kahire şehrinde oturuyorum."),
  KW("طَالِبٌ", "i", "öğrenci", "طُلَّابٌ", "fual", "تِلْمِيذٌ", "", "أَنَا طَالِبٌ فِي الجَامِعَةِ.", "طَالِبٌ", "Üniversitede öğrenciyim."),
  KW("جَامِعَةٌ", "i", "üniversite", "جَامِعَاتٌ", "at", "", "", "أَنَا طَالِبٌ فِي جَامِعَةِ دِمَشْقَ.", "جَامِعَةِ", "Şam Üniversitesinde öğrenciyim."),
  KW("مُهَنْدِسٌ", "i", "mühendis", "مُهَنْدِسُونَ", "un", "", "", "وَالِدِي مُهَنْدِسٌ، أُمِّي مُعَلِّمَةٌ.", "مُهَنْدِسٌ", "Babam mühendis, annem öğretmen."),
  KW("مُعَلِّمٌ", "i", "öğretmen", "مُعَلِّمُونَ", "un", "مُدَرِّسٌ", "", "أَنَا مُعَلِّمُ اللُّغَةِ العَرَبِيَّةِ فِي جَامِعَةِ مَرْمَرَةَ.", "مُعَلِّمُ", "Marmara Üniversitesinde Arapça öğretmeniyim."),
  KW("أَخٌ", "i", "erkek kardeş", "إِخْوَةٌ / إِخْوَانٌ", "diger", "", "أُخْتٌ", "لِي أَخٌ كَبِيرٌ، اسْمُهُ قُصَيٌّ.", "أَخٌ", "Kusay adında bir ağabeyim var."),
  KW("أُخْتٌ", "i", "kız kardeş", "أَخَوَاتٌ", "at", "", "أَخٌ", "وَأُخْتٌ صَغِيرَةٌ، اسْمُهَا مُنَى.", "أُخْتٌ", "Ve Müne adında küçük bir kız kardeşim."),
  KW("كَبِيرٌ", "s", "büyük", "كِبَارٌ", "fial", "", "صَغِيرٌ", "لِي أَخٌ كَبِيرٌ، اسْمُهُ قُصَيٌّ.", "كَبِيرٌ", "Kusay adında bir ağabeyim var."),
  KW("صَغِيرٌ", "s", "küçük", "صِغَارٌ", "fial", "", "كَبِيرٌ", "وَأُخْتٌ صَغِيرَةٌ، اسْمُهَا مُنَى.", "صَغِيرَةٌ", "Ve Müne adında küçük bir kız kardeşim."),
  KW("هِوَايَةٌ", "i", "hobi", "هِوَايَاتٌ", "at", "", "", "هِوَايَاتِي القِرَاءَةُ وَالرَّسْمُ وَرُكُوبُ الدَّرَّاجَةِ.", "هِوَايَاتِي", "Hobilerim okuma, resim ve bisiklete binmek."),
  KW("شَارِعٌ", "i", "cadde", "شَوَارِعُ", "fevail", "طَرِيقٌ", "", "وَأَسْكُنُ فِي حَيِّ المَيْدَانِ فِي شَارِعِ المَنْصُورِ.", "شَارِعِ", "Meydan mahallesinde, Mansûr caddesinde oturuyorum."),
  KW("حَيٌّ", "i", "mahalle", "أَحْيَاءٌ", "efal", "", "", "وَأَسْكُنُ فِي حَيِّ المَيْدَانِ فِي شَارِعِ المَنْصُورِ.", "حَيِّ", "Meydan mahallesinde, Mansûr caddesinde oturuyorum."),
  KW("لُغَةٌ", "i", "dil", "لُغَاتٌ", "at", "لِسَانٌ", "", "أَتَكَلَّمُ اللُّغَةَ العَرَبِيَّةَ وَاللُّغَةَ الإِنْكِلِيزِيَّةَ.", "اللُّغَةَ", "Arapça ve İngilizce konuşuyorum."),
  KW("سَنَةٌ", "i", "yıl", "سَنَوَاتٌ / سِنُونَ", "at", "عَامٌ", "", "عُمْرِي عِشْرُونَ سَنَةً.", "سَنَةً", "Yirmi yaşındayım."),
  KW("أُسْرَةٌ", "i", "aile", "أُسَرٌ", "fual_f", "عَائِلَةٌ", "", "أَنَا مُتَزَوِّجٌ، أَسْكُنُ مَعَ أُسْرَتِي.", "أُسْرَتِي", "Evliyim, ailemle oturuyorum."),
  KW("طَبِيبٌ", "i", "doktor", "أَطِبَّاءُ", "efila", "", "", "عُمْرِي خَمْسٌ وَثَلَاثُونَ سَنَةً، أَنَا طَبِيبٌ.", "طَبِيبٌ", "Otuz beş yaşındayım, doktorum."),
  KW("مُتَزَوِّجٌ", "s", "evli", "مُتَزَوِّجُونَ", "un", "", "أَعْزَبُ", "أَنَا مُتَزَوِّجٌ، أَسْكُنُ مَعَ أُسْرَتِي.", "مُتَزَوِّجٌ", "Evliyim, ailemle oturuyorum."),
  KW("أَعْزَبُ", "s", "bekâr", "عُزَّابٌ", "fual", "", "مُتَزَوِّجٌ", "", "", ""),
  KW("وَلَدٌ", "i", "oğlan, çocuk", "أَوْلَادٌ", "efal", "", "بِنْتٌ", "عِنْدِي وَلَدٌ وَبِنْتٌ.", "وَلَدٌ", "Bir oğlum ve bir kızım var."),
  KW("بِنْتٌ", "i", "kız", "بَنَاتٌ", "at", "", "وَلَدٌ", "عِنْدِي وَلَدٌ وَبِنْتٌ.", "بِنْتٌ", "Bir oğlum ve bir kızım var."),
  KW("عُنْوَانٌ", "i", "adres", "عَنَاوِينُ", "fealil", "", "", "وَهَذَا عُنْوَانُ بَرِيدِي الإِلِكْتِرُونِيِّ.", "عُنْوَانُ", "Bu da e-posta adresim."),
  KW("مِهْنَةٌ", "i", "meslek", "مِهَنٌ", "fial_f", "حِرْفَةٌ", "", "مَا مِهْنَتُكَ؟ أَنَا طَبِيبٌ.", "مِهْنَتُكَ", "Mesleğin ne? Doktorum."),
  KW("دَرَّاجَةٌ", "i", "bisiklet", "دَرَّاجَاتٌ", "at", "", "", "هِوَايَاتِي القِرَاءَةُ وَالرَّسْمُ وَرُكُوبُ الدَّرَّاجَةِ.", "الدَّرَّاجَةِ", "Hobilerim okuma, resim ve bisiklete binmek."),
  KW("صَيْدَلَانِيٌّ", "i", "eczacı", "صَيَادِلَةٌ", "diger", "", "", "اسْمُ أَبِي مُحَمَّدٌ، هُوَ صَيْدَلَانِيٌّ.", "صَيْدَلَانِيٌّ", "Babamın adı Muhammed, eczacıdır."),
  KW("قَلِيلٌ", "s", "az", "", "", "", "كَثِيرٌ", "أَتَكَلَّمُ اللُّغَةَ العَرَبِيَّةَ وَقَلِيلًا مِنَ الفَرَنْسِيَّةِ.", "قَلِيلًا", "Arapça ve biraz Fransızca konuşuyorum."),
  KW("جَيِّدٌ", "s", "iyi", "جِيَادٌ", "fial", "حَسَنٌ", "سَيِّئٌ", "", "", ""),
  KW("قَرِيبٌ", "s", "yakın", "", "", "", "بَعِيدٌ", "", "", ""),
  KW("سَكَنَ", "f", "oturdu, ikamet etti", "", "", "عَاشَ", "", "أَسْكُنُ فِي مَدِينَةِ القَاهِرَةِ.", "أَسْكُنُ", "Kahire şehrinde oturuyorum.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","قُلُوبٌ، دُرُوسٌ"],"efal":["أَفْعَالٌ","ef’âl","أَقْلَامٌ، أَبْوَابٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، رِجَالٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","غُرَفٌ، صُوَرٌ"],"fuala":["فُعَلَاءُ","fu’alâ","وُزَرَاءُ، فُقَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَغْنِيَاءُ"],"fevail":["فَوَاعِلُ","fevâil","شَوَارِعُ، نَوَافِذُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَسَاجِدُ، مَكَاتِبُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","عَصَافِيرُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","تُجَّارٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","مُعَلِّمُونَ، مُسَافِرُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","سَيَّارَاتٌ، لُغَاتٌ"],"diger":["…","başka kalıplar","إِخْوَةٌ، صَيَادِلَةٌ"]};
