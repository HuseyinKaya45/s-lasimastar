// ================= Kıraat 19 — مَدِينَتَانِ مُقَدَّسَتَانِ =================
// Renk rolleri: mz Mekke, nasb Medine, cerr olay, mi kalıp, ref fiil
var ROLES = {
  mz: { ar: "مَكَّةُ المُكَرَّمَةُ", tr: "Mekke" }, nasb: { ar: "المَدِينَةُ المُنَوَّرَةُ", tr: "Medine" }, cerr: { ar: "الحَدَثُ", tr: "Olay" },
  mi: { ar: "التَّرْكِيبُ", tr: "Kalıp" }, ref: { ar: "الفِعْلُ", tr: "Fiil" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var SEHIR = [["m", "Mekke", "مَكَّةُ المُكَرَّمَةُ", "mz"], ["n", "Medine", "المَدِينَةُ المُنَوَّرَةُ", "nasb"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", m: "Mekke", n: "Medine" };

// Karşılaştırma makinesi: [konu, Mekke’de…, Medine’de…, Türkçe Mekke, Türkçe Medine]
var KONU = [
  ["🕌 Mescit", "المَسْجِدُ الحَرَامُ", "المَسْجِدُ النَّبَوِيُّ الشَّرِيفُ", "Mescid-i Haram vardır", "Mescid-i Nebevî vardır"],
  ["👶 Peygamber ﷺ", "وُلِدَ النَّبِيُّ ﷺ", "تُوُفِّيَ النَّبِيُّ ﷺ وَدُفِنَ", "Peygamber (s.a.v.) doğdu", "Peygamber (s.a.v.) vefat etti ve defnedildi"],
  ["🕋 Kutsal yapı", "الكَعْبَةُ المُشَرَّفَةُ قِبْلَةُ المُسْلِمِينَ", "حُجْرَةُ النَّبِيِّ ﷺ الكَرِيمَةُ", "Müslümanların kıblesi Kâbe vardır", "Peygamberin (s.a.v.) mübarek odası vardır"],
  ["⛰️ Kutsal yerler", "المَشَاعِرُ المُقَدَّسَةُ: عَرَفَاتٌ وَمُزْدَلِفَةُ وَمِنًى", "بُقْعَةُ البَقِيعِ", "Arafat, Müzdelife ve Mina vardır", "Bakî‘ kabristanı vardır"],
  ["💧 Su ve dağ", "بِئْرُ مَاءِ زَمْزَمَ", "جَبَلُ أُحُدٍ", "Zemzem kuyusu vardır", "Uhud Dağı vardır"],
  ["📜 Tarih", "بَدَأَتِ الدَّعْوَةُ إِلَى الإِسْلَامِ", "قَامَتِ الدَّوْلَةُ الإِسْلَامِيَّةُ", "İslam daveti başladı", "İslam devleti kuruldu"]
];
var ZK = [["Mekke", "فِي مَكَّةَ…"], ["Medine", "فِي المَدِينَةِ…"], ["Karşılaştır", "أَمَّا… فَـ…"]];
// Hicret şiiri
var SIIR = [["طَلَعَ البَدْرُ عَلَيْنَا", "مِنْ ثَنِيَّاتِ الوَدَاعِ", "Dolunay doğdu üzerimize, Veda tepelerinden."], ["وَجَبَ الشُّكْرُ عَلَيْنَا", "مَا دَعَا لِلَّهِ دَاعِ", "Şükür borcumuz oldu, Allah’a dua eden dua ettikçe."], ["أَيُّهَا المَبْعُوثُ فِينَا", "جِئْتَ بِالأَمْرِ المُطَاعِ", "Ey aramıza gönderilen, uyulacak bir emirle geldin."], ["جِئْتَ شَرَّفْتَ المَدِينَةَ", "مَرْحَبًا يَا خَيْرَ دَاعِ", "Geldin, şereflendirdin Medine’yi; hoş geldin ey davet edenlerin en hayırlısı."]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "مَكَّةُ المُكَرَّمَةُ وَالمَدِينَةُ المُنَوَّرَةُ مَدِينَتَانِ مُقَدَّسَتَانِ عِنْدَ المُسْلِمِينَ. مَكَّةُ المُكَرَّمَةُ هِيَ أَقْدَسُ مَدِينَةٍ فِي الإِسْلَامِ، وُلِدَ فِيهَا الرَّسُولُ مُحَمَّدٌ ﷺ، وَمِنْهَا بَدَأَتِ الدَّعْوَةُ إِلَى الإِسْلَامِ." +
  "<br>مِنْ أَهَمِّ مَعَالِمِهَا المَسْجِدُ الحَرَامُ، وَهُوَ أَوَّلُ بَيْتٍ وُضِعَ لِلنَّاسِ عَلَى الأَرْضِ لِعِبَادَةِ اللهِ، يَتَوَجَّهُ إِلَيْهِ المُسْلِمُونَ لِلْعُمْرَةِ وَأَدَاءِ فَرِيضَةِ الحَجِّ. وَالكَعْبَةُ المُشَرَّفَةُ، وَهِيَ بَيْتُ اللهِ الحَرَامُ وَقِبْلَةُ المُسْلِمِينَ، سُمِّيَتْ بِهَذَا الاسْمِ لِأَنَّهَا بِنَاءٌ مُكَعَّبُ الشَّكْلِ، وَهِيَ أَقْدَسُ مَكَانٍ عَلَى وَجْهِ الأَرْضِ. وَبِئْرُ مَاءِ زَمْزَمَ، وَالمَشَاعِرُ المُقَدَّسَةُ: «عَرَفَاتٌ، وَمُزْدَلِفَةُ، وَمِنًى، وَالصَّفَا وَالمَرْوَةُ»، كُلُّهَا تَقَعُ فِي حُدُودِ مَكَّةَ المُكَرَّمَةِ." +
  "<br>أَمَّا المَدِينَةُ المُنَوَّرَةُ فَهِيَ المَدِينَةُ المُبَارَكَةُ الَّتِي هَاجَرَ إِلَيْهَا النَّبِيُّ مُحَمَّدٌ ﷺ وَبَنَى فِيهَا مَسْجِدَهُ الشَّرِيفَ، وَفِي المَدِينَةِ بُقْعَةٌ يُقَالُ لَهَا «البَقِيعُ»، وَفِيهَا قُبُورُ شُهَدَاءِ غَزْوَةِ أُحُدٍ، وَزَوْجَاتِ النَّبِيِّ مُحَمَّدٍ ﷺ وَبَنَاتِهِ وَكَثِيرٍ مِنَ الصَّحَابَةِ وَالتَّابِعِينَ، رَحِمَهُمُ اللهُ جَمِيعًا. وَفِي المَدِينَةِ تُوُفِّيَ النَّبِيُّ مُحَمَّدٌ ﷺ وَدُفِنَ فِي حُجْرَتِهِ الكَرِيمَةِ." +
  "<br>هَاجَرَ الرَّسُولُ ﷺ إِلَى المَدِينَةِ المُنَوَّرَةِ عِنْدَمَا لَقِيَ هُوَ وَالمُسْلِمُونَ الأَوَائِلُ العَذَابَ الشَّدِيدَ مِنْ مُشْرِكِي مَكَّةَ. وَعِنْدَمَا دَخَلَ النَّبِيُّ مُحَمَّدٌ ﷺ المَدِينَةَ اسْتَقْبَلَهُ أَهْلُهَا بِالأَبْيَاتِ الشِّعْرِيَّةِ المَشْهُورَةِ:" +
  "<br>طَلَعَ البَدْرُ عَلَيْنَا ✦ مِنْ ثَنِيَّاتِ الوَدَاعِ<br>وَجَبَ الشُّكْرُ عَلَيْنَا ✦ مَا دَعَا لِلَّهِ دَاعِ<br>أَيُّهَا المَبْعُوثُ فِينَا ✦ جِئْتَ بِالأَمْرِ المُطَاعِ<br>جِئْتَ شَرَّفْتَ المَدِينَةَ ✦ مَرْحَبًا يَا خَيْرَ دَاعِ" +
  "<br>وَمُنْذُ ذَلِكَ الوَقْتِ أَصْبَحَتِ المَدِينَةُ المُنَوَّرَةُ عَاصِمَةً لِلدَّوْلَةِ الإِسْلَامِيَّةِ طَوَالَ حَيَاةِ النَّبِيِّ مُحَمَّدٍ ﷺ ثُمَّ خُلَفَائِهِ «أَبِي بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيٍّ» رَضِيَ اللهُ عَنْهُمْ أَجْمَعِينَ. وَكَانَتِ المَدِينَةُ قَبْلَ الهِجْرَةِ تُسَمَّى «يَثْرِبَ»، ثُمَّ سُمِّيَتْ بِاسْمِهَا الحَالِيِّ.";
var METIN_TR = "Mekke-i Mükerreme ve Medine-i Münevvere Müslümanlar için iki kutsal şehirdir. Mekke İslam’ın en kutsal şehridir; Resûlullah (s.a.v.) orada doğdu ve İslam daveti oradan başladı." +
  "<br>En önemli yerlerinden biri Mescid-i Haram’dır; Allah’a ibadet için yeryüzünde insanlar için kurulan ilk evdir. Müslümanlar umre ve hac farîzası için oraya yönelir. Bir diğeri Kâbe-i Müşerrefe’dir: Allah’ın Beytü’l-Haram’ı ve Müslümanların kıblesidir; küp biçiminde bir yapı olduğu için bu adı almıştır ve yeryüzünün en kutsal yeridir. Zemzem kuyusu ve kutsal hac mekânları (Arafat, Müzdelife, Mina, Safa ve Merve) de Mekke sınırları içindedir." +
  "<br>Medine-i Münevvere ise Peygamber’in (s.a.v.) hicret ettiği ve mescidini inşa ettiği mübarek şehirdir. Medine’de “Bakî‘” denen bir yer vardır; (kitaba göre) orada Uhud şehitlerinin, Peygamber’in eşlerinin, kızlarının ve birçok sahabe ile tâbiînin kabirleri bulunur; Allah hepsine rahmet etsin. Peygamber (s.a.v.) Medine’de vefat etti ve mübarek odasına defnedildi." +
  "<br>Resûlullah (s.a.v.), kendisi ve ilk Müslümanlar Mekke müşriklerinden ağır eziyet görünce Medine’ye hicret etti. Medine’ye girdiğinde halkı onu şu meşhur beyitlerle karşıladı:" +
  "<br>“Dolunay doğdu üzerimize, Veda tepelerinden; şükür borcumuz oldu, Allah’a dua eden dua ettikçe. Ey aramıza gönderilen, uyulacak bir emirle geldin; geldin, şereflendirdin Medine’yi, hoş geldin ey davet edenlerin en hayırlısı.”" +
  "<br>O zamandan beri Medine, Peygamber’in (s.a.v.) hayatı boyunca, sonra halifeleri Ebû Bekir, Ömer, Osman ve Ali (r.a.) döneminde İslam devletinin başkenti oldu. Medine hicretten önce “Yesrib” diye anılırdı; sonra bugünkü adını aldı.";
var SOZLUK = [["مُقَدَّسَةٌ", "kutsal"], ["أَقْدَسُ", "en kutsal"], ["الدَّعْوَةُ", "davet, tebliğ"], ["مَعَالِمُ", "önemli yerler, eserler"], ["وُضِعَ", "konuldu, kuruldu"], ["يَتَوَجَّهُ إِلَيْهِ", "ona yönelir"], ["العُمْرَةُ", "umre"], ["المُشَرَّفَةُ", "şereflendirilmiş"], ["قِبْلَةٌ", "kıble"], ["مُكَعَّبُ الشَّكْلِ", "küp biçimli"], ["بِئْرٌ", "kuyu"], ["المَشَاعِرُ المُقَدَّسَةُ", "kutsal hac mekânları"], ["حُدُودٌ", "sınırlar"], ["هَاجَرَ إِلَى", "…e hicret etti"], ["بُقْعَةٌ", "yer, toprak parçası"], ["قُبُورٌ", "kabirler"], ["شُهَدَاءُ", "şehitler"], ["غَزْوَةُ أُحُدٍ", "Uhud Savaşı"], ["التَّابِعُونَ", "tâbiîn"], ["حُجْرَةٌ", "oda"], ["لَقِيَ", "karşılaştı, gördü"], ["العَذَابُ", "eziyet, işkence"], ["مُشْرِكُو مَكَّةَ", "Mekke müşrikleri"], ["اسْتَقْبَلَهُ", "onu karşıladı"], ["الأَبْيَاتُ الشِّعْرِيَّةُ", "şiir beyitleri"], ["طَلَعَ البَدْرُ", "dolunay doğdu"], ["ثَنِيَّاتُ الوَدَاعِ", "Veda tepeleri"], ["المَبْعُوثُ", "gönderilen (peygamber)"], ["عَاصِمَةٌ", "başkent"], ["خُلَفَاؤُهُ", "halifeleri"], ["الحَالِيُّ", "şimdiki"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce düşünmek: Müslümanlar için en kutsal şehir hangisi, başka kutsal şehir biliyor musun, kutsal bir şehre gittin mi", "Mekke ve Medine’yi anlatan metni durmadan okumak ve dinlemek", "Kutsal yer kelimelerini öğrenmek: المَسْجِدُ الحَرَامُ، الكَعْبَةُ، زَمْزَمُ، المَشَاعِرُ، البَقِيعُ", "Hicret şiirini (طَلَعَ البَدْرُ عَلَيْنَا) okumak"],
  examples: [
    { s: "مَكَّةُ المُكَرَّمَةُ:mz / هِيَ أَقْدَسُ مَدِينَةٍ فِي الإِسْلَامِ.:mi.Tafdîl", tr: "Mekke İslam’ın en kutsal şehridir." },
    { s: "أَمَّا المَدِينَةُ المُنَوَّرَةُ:nasb / فَهِيَ المَدِينَةُ الَّتِي هَاجَرَ إِلَيْهَا النَّبِيُّ ﷺ.:cerr.Hicret", tr: "Medine ise Peygamber’in (s.a.v.) hicret ettiği şehirdir." }
  ],
  rules: [
    { tr: "<b>Mekke-i Mükerreme:</b> İslam’ın en kutsal şehri; Peygamber (s.a.v.) orada doğdu, davet oradan başladı. Orada: <span class=\"ar\">المَسْجِدُ الحَرَامُ</span> (ilk ibadet evi), <span class=\"ar\">الكَعْبَةُ المُشَرَّفَةُ</span> (kıble; küp biçimli olduğu için “Kâbe”), <span class=\"ar\">بِئْرُ زَمْزَمَ</span> ve <span class=\"ar\">المَشَاعِرُ المُقَدَّسَةُ</span>: Arafat, Müzdelife, Mina, Safa ve Merve." },
    { tr: "<b>Medine-i Münevvere:</b> hicret şehri; Peygamberin mescidi (<span class=\"ar\">المَسْجِدُ النَّبَوِيُّ</span>) ve kabri (<span class=\"ar\">حُجْرَتُهُ الكَرِيمَةُ</span>), Bakî‘ kabristanı. Eski adı <span class=\"ar\">يَثْرِبُ</span>. Peygamber ve dört halife döneminde İslam devletinin başkentiydi." },
    { tr: "<b>Kitapla ilgili not:</b> metin Uhud şehitlerinin Bakî‘de gömülü olduğunu söylüyor (3. etkinlik de böyle eşleştiriyor). Oysa Uhud şehitleri, Hz. Hamza başta olmak üzere, Uhud Dağı’nın eteğindeki şehitlikte yatar. Ayrıca Hz. Ali başkenti Kûfe’ye taşımıştır; metin “dört halife boyunca başkent Medine’ydi” der." },
    { tr: "<b>Hicret şiiri:</b> <span class=\"ar\">طَلَعَ البَدْرُ عَلَيْنَا</span> Medineliler’in Peygamberi karşıladığı meşhur beyitlerdir. Metindeki şiire Özet sekmesinde de bakabilirsin." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَا أَقْدَسُ مَدِينَةٍ عِنْدَ المُسْلِمِينَ؟ لِمَاذَا؟ هَلْ تَعْرِفُ مَدِينَةً مُقَدَّسَةً أُخْرَى؟ هَلْ سَافَرْتَ إِلَى مَدِينَةٍ مُقَدَّسَةٍ؟ مَاذَا فِيهَا؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "مَدِينَتَانِ مُقَدَّسَتَانِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَا أَقْدَسُ مَدِينَةٍ عِنْدَ المُسْلِمِينَ؟ لِمَاذَا؟", a: "مَكَّةُ المُكَرَّمَةُ، لِأَنَّ فِيهَا الكَعْبَةَ المُشَرَّفَةَ وَالمَسْجِدَ الحَرَامَ.", tr: "En kutsal şehir hangisi, neden? Mekke; çünkü Kâbe ve Mescid-i Haram oradadır." },
        { q: "هَلْ تَعْرِفُ مَدِينَةً مُقَدَّسَةً أُخْرَى؟", a: "نَعَمْ، المَدِينَةُ المُنَوَّرَةُ وَالقُدْسُ.", tr: "Başka kutsal şehir biliyor musun? Evet, Medine ve Kudüs." },
        { q: "هَلْ سَافَرْتَ إِلَى مَدِينَةٍ مُقَدَّسَةٍ؟ مَاذَا فِيهَا؟", a: "نَعَمْ، سَافَرْتُ إِلَى مَكَّةَ لِلْعُمْرَةِ، وَفِيهَا المَسْجِدُ الحَرَامُ.", tr: "Kutsal bir şehre gittin mi? (Örnek) Umre için Mekke’ye gittim." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "مَكَّةُ المُكَرَّمَةُ أَقْدَسُ مَدِينَةٍ فِي الإِسْلَامِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "وُلِدَ الرَّسُولُ ﷺ فِي المَدِينَةِ المُنَوَّرَةِ.", a: "y", why: "Mekke’de doğdu." },
        { s: "يَتَوَجَّهُ المُسْلِمُونَ إِلَى المَسْجِدِ الحَرَامِ لِلْعُمْرَةِ وَالحَجِّ.", a: "d", why: "Metinde aynen geçer." },
        { s: "سُمِّيَتِ الكَعْبَةُ بِهَذَا الاسْمِ لِأَنَّهَا بِنَاءٌ مُكَعَّبُ الشَّكْلِ.", a: "d", why: "Küp biçimli." },
        { s: "عَرَفَاتٌ وَمِنًى تَقَعَانِ فِي حُدُودِ المَدِينَةِ المُنَوَّرَةِ.", a: "y", why: "Mekke sınırları içinde." },
        { s: "بَنَى النَّبِيُّ ﷺ مَسْجِدَهُ فِي المَدِينَةِ المُنَوَّرَةِ.", a: "d", why: "وَبَنَى فِيهَا مَسْجِدَهُ الشَّرِيفَ." },
        { s: "دُفِنَ النَّبِيُّ ﷺ فِي مَكَّةَ المُكَرَّمَةِ.", a: "y", why: "Medine’de, mübarek odasında." },
        { s: "هَاجَرَ النَّبِيُّ ﷺ لِأَنَّهُ لَقِيَ العَذَابَ مِنْ مُشْرِكِي مَكَّةَ.", a: "d", why: "عِنْدَمَا لَقِيَ… العَذَابَ الشَّدِيدَ." },
        { s: "اسْتَقْبَلَ أَهْلُ المَدِينَةِ النَّبِيَّ ﷺ بِالأَبْيَاتِ الشِّعْرِيَّةِ.", a: "d", why: "طَلَعَ البَدْرُ عَلَيْنَا…" },
        { s: "أَصْبَحَتْ مَكَّةُ عَاصِمَةً لِلدَّوْلَةِ الإِسْلَامِيَّةِ بَعْدَ الهِجْرَةِ.", a: "y", why: "Başkent Medine oldu." },
        { s: "كَانَتِ المَدِينَةُ تُسَمَّى قَبْلَ الهِجْرَةِ «يَثْرِبَ».", a: "d", why: "Metnin son cümlesi." },
        { s: "أَبُو بَكْرٍ وَعُمَرُ وَعُثْمَانُ وَعَلِيٌّ مِنْ خُلَفَاءِ النَّبِيِّ ﷺ.", a: "d", why: "خُلَفَائِهِ." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("مَدِينَتَانِ مُقَدَّسَتَانِ عِنْدَ المُسْلِمِينَ", "مُقَدَّسَتَانِ"), "iki kutsal", "iki büyük", "iki eski", "Müslümanlar için iki kutsal şehir.", "قُدْسٌ: kutsallık."],
      [HL("وَمِنْهَا بَدَأَتِ الدَّعْوَةُ إِلَى الإِسْلَامِ", "الدَّعْوَةُ"), "davet, tebliğ", "dua", "savaş", "İslam daveti oradan başladı.", ""],
      [HL("أَوَّلُ بَيْتٍ وُضِعَ لِلنَّاسِ", "وُضِعَ"), "kuruldu, konuldu", "yıkıldı", "satıldı", "İnsanlar için kurulan ilk ev.", "Âl-i İmrân 96."],
      [HL("وَالكَعْبَةُ المُشَرَّفَةُ", "المُشَرَّفَةُ"), "şereflendirilmiş", "yüksek", "yeni", "Şerefli Kâbe.", "شَرَفٌ: şeref."],
      [HL("لِأَنَّهَا بِنَاءٌ مُكَعَّبُ الشَّكْلِ", "مُكَعَّبُ"), "küp", "yuvarlak", "üçgen", "Küp biçimli bir yapı.", "كَعْبٌ → الكَعْبَةُ"],
      [HL("وَبِئْرُ مَاءِ زَمْزَمَ", "وَبِئْرُ"), "ve kuyu", "ve nehir", "ve deniz", "Zemzem suyu kuyusu.", "Çoğulu: آبَارٌ."],
      [HL("كُلُّهَا تَقَعُ فِي حُدُودِ مَكَّةَ", "حُدُودِ"), "sınırlar", "sokaklar", "dağlar", "Hepsi Mekke sınırları içindedir.", "Tekili: حَدٌّ."],
      [HL("وَفِي المَدِينَةِ بُقْعَةٌ يُقَالُ لَهَا البَقِيعُ", "بُقْعَةٌ"), "yer, toprak parçası", "çeşme", "pazar", "Bakî‘ denen bir yer.", "Çoğulu: بِقَاعٌ."],
      [HL("وَفِيهَا قُبُورُ شُهَدَاءِ غَزْوَةِ أُحُدٍ", "شُهَدَاءِ"), "şehitler", "âlimler", "tüccarlar", "Uhud şehitleri.", "Tekili: شَهِيدٌ."],
      [HL("وَدُفِنَ فِي حُجْرَتِهِ الكَرِيمَةِ", "حُجْرَتِهِ"), "odası", "evi", "mescidi", "Mübarek odasına defnedildi.", "= غُرْفَةٌ"],
      [HL("عِنْدَمَا لَقِيَ… العَذَابَ الشَّدِيدَ", "العَذَابَ"), "eziyet, işkence", "sevgi", "hediye", "Ağır eziyet gördü.", ""],
      [HL("أَصْبَحَتِ المَدِينَةُ المُنَوَّرَةُ عَاصِمَةً", "عَاصِمَةً"), "başkent", "köy", "liman", "Medine başkent oldu.", "Çoğulu: عَوَاصِمُ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama: Mekke ve Medine", short: "Anlama", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak", "A sütunundaki cümleyi B sütunundaki devamıyla eşleştirmek", "Bilgiyi Mekke’ye ya da Medine’ye ait diye ayırmak"],
  examples: [
    { s: "فِي مَكَّةَ:mz / وُلِدَ الرَّسُولُ ﷺ:cerr", tr: "Peygamber (s.a.v.) Mekke’de doğdu.", pair: "فِي المَدِينَةِ:nasb / تُوُفِّيَ وَدُفِنَ ﷺ:cerr", pairTr: "Medine’de vefat etti ve defnedildi." }
  ],
  rules: [
    { tr: "<b>2. etkinlik:</b> Davet Yesrib’de (Medine) değil Mekke’de başladı · Mekke’nin en önemli eseri Mescid-i Nebevî değil Mescid-i Haram’dır · Zemzem Medine’de değil Mekke’dedir. Doğru olan tek cümle: Mescid-i Haram insanlar için kurulan ilk mescittir." },
    { tr: "<b>Dikkat:</b> metin <span class=\"ar\">أَوَّلُ بَيْتٍ</span> (ilk ev) der; kitabın 2. etkinliği <span class=\"ar\">أَوَّلُ مَسْجِدٍ</span> (ilk mescit) der. Anlam aynıdır: <span class=\"ar\">﴿إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا﴾</span> (Âl-i İmrân 96)." },
    { tr: "<b>3. etkinlik:</b> kitap “Uhud şehitlerinin kabirleri ← Bakî‘de bulunur” diye eşleştirir; metne göre öyle seçildi. Gerçekte Uhud şehitleri Uhud Dağı eteğindedir." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَا المَدِينَتَانِ المُقَدَّسَتَانِ اللَّتَانِ يَتَحَدَّثُ عَنْهُمَا النَّصُّ؟ أَيْنَ تَقَعَانِ؟ اذْكُرِ الأَمَاكِنَ المُقَدَّسَةَ المَذْكُورَةَ دَاخِلَ حُدُودِ مَكَّةَ المُكَرَّمَةِ. أَيْنَ وُلِدَ الرَّسُولُ ﷺ؟ وَأَيْنَ تُوُفِّيَ؟ وَأَيْنَ دُفِنَ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ. ٣ ـ صِلْ بَيْنَ الجُمَلِ فِي «أ» مَعَ مَا يُنَاسِبُهَا مِنَ الجُمَلِ فِي «ب»."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مَا المَدِينَتَانِ المُقَدَّسَتَانِ اللَّتَانِ يَتَحَدَّثُ عَنْهُمَا النَّصُّ؟", "مَكَّةُ المُكَرَّمَةُ وَالمَدِينَةُ المُنَوَّرَةُ.", "القُدْسُ وَدِمَشْقُ.", "إِسْطَنْبُولُ وَبُورْصَةُ.", "Metnin anlattığı iki kutsal şehir.", ""],
      ["أَيْنَ تَقَعَانِ؟", "تَقَعَانِ فِي المَمْلَكَةِ العَرَبِيَّةِ السُّعُودِيَّةِ.", "تَقَعَانِ فِي مِصْرَ.", "تَقَعَانِ فِي تُرْكِيَا.", "Nerededirler? Suudi Arabistan’da.", "Metinde açıkça yazmaz; 9. etkinlikte geçer."],
      ["اذْكُرِ الأَمَاكِنَ المُقَدَّسَةَ المَذْكُورَةَ دَاخِلَ حُدُودِ مَكَّةَ المُكَرَّمَةِ.", "المَسْجِدُ الحَرَامُ، الكَعْبَةُ، بِئْرُ زَمْزَمَ، عَرَفَاتٌ، مُزْدَلِفَةُ، مِنًى، الصَّفَا وَالمَرْوَةُ.", "المَسْجِدُ النَّبَوِيُّ وَالبَقِيعُ.", "جَبَلُ أُحُدٍ وَحُجْرَةُ النَّبِيِّ ﷺ.", "Mekke sınırlarındaki kutsal yerler.", ""],
      ["أَيْنَ وُلِدَ الرَّسُولُ ﷺ؟ وَأَيْنَ تُوُفِّيَ؟ وَأَيْنَ دُفِنَ؟", "وُلِدَ فِي مَكَّةَ، وَتُوُفِّيَ فِي المَدِينَةِ، وَدُفِنَ فِي حُجْرَتِهِ الكَرِيمَةِ.", "وُلِدَ فِي المَدِينَةِ، وَتُوُفِّيَ فِي مَكَّةَ.", "وُلِدَ وَتُوُفِّيَ فِي مَكَّةَ.", "Nerede doğdu, vefat etti, defnedildi?", ""]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["المَسْجِدُ الحَرَامُ أَوَّلُ مَسْجِدٍ وُضِعَ لِلنَّاسِ لِعِبَادَةِ اللهِ.", "d", "أَوَّلُ بَيْتٍ وُضِعَ لِلنَّاسِ."],
      ["بَدَأَتِ الدَّعْوَةُ إِلَى الإِسْلَامِ فِي يَثْرِبَ.", "y", "Mekke’de: وَمِنْهَا بَدَأَتِ الدَّعْوَةُ."],
      ["أَهَمُّ مَعَالِمِ مَكَّةَ المُكَرَّمَةِ مَسْجِدُ النَّبِيِّ مُحَمَّدٍ ﷺ.", "y", "المَسْجِدُ الحَرَامُ"],
      ["بِئْرُ مَاءِ زَمْزَمَ مَوْجُودٌ فِي المَدِينَةِ المُنَوَّرَةِ.", "y", "Mekke sınırları içinde."]
    ]) },
    { type: "bank", num: "٣", ar: "صِلْ بَيْنَ الجُمَلِ فِي «أ» مَعَ مَا يُنَاسِبُهَا مِنَ الجُمَلِ فِي «ب»", tr: "Önce aşağıdan B sütunundaki parçayı seç, sonra A sütunundaki cümlenin kutusuna dokun.", bank: ["لِأَنَّهَا بِنَاءٌ مُكَعَّبُ الشَّكْلِ.", "حَيْثُ مَاتَ وَدُفِنَ هُنَاكَ.", "لِأَدَاءِ العُمْرَةِ وَفَرِيضَةِ الحَجِّ.", "مَوْجُودَةٌ فِي مِنْطَقَةِ «البَقِيعِ»."], items: [
      { pre: "يَتَوَجَّهُ المُسْلِمُونَ إِلَى مَكَّةَ", a: [2], tr: "Müslümanlar umre ve hac farzı için Mekke’ye yönelir." },
      { pre: "قُبُورُ شُهَدَاءِ غَزْوَةِ أُحُدٍ", a: [3], tr: "Uhud şehitlerinin kabirleri Bakî‘ bölgesindedir (kitaba göre)." },
      { pre: "سُمِّيَتِ الكَعْبَةُ بِهَذَا الاسْمِ", a: [0], tr: "Kâbe bu adı aldı; çünkü küp biçimli bir yapıdır." },
      { pre: "هَاجَرَ النَّبِيُّ مُحَمَّدٌ ﷺ إِلَى المَدِينَةِ المُنَوَّرَةِ", a: [1], tr: "Peygamber (s.a.v.) Medine’ye hicret etti; orada vefat etti ve defnedildi." }
    ]},
    { type: "classify", extra: true, opts: SEHIR, ar: "مَكَّةُ أَمِ المَدِينَةُ؟", tr: "Metne göre bu bilgi Mekke’ye mi, Medine’ye mi ait?", items: CL([
      ["وُلِدَ فِيهَا الرَّسُولُ ﷺ.", "m", "Mekke."], ["فِيهَا الكَعْبَةُ المُشَرَّفَةُ.", "m", "Mekke."], ["فِيهَا بِئْرُ زَمْزَمَ.", "m", "Mekke."], ["مِنْهَا بَدَأَتِ الدَّعْوَةُ.", "m", "Mekke."], ["فِي حُدُودِهَا عَرَفَاتٌ وَمِنًى.", "m", "Mekke."],
      ["هَاجَرَ إِلَيْهَا النَّبِيُّ ﷺ.", "n", "Medine."], ["فِيهَا بُقْعَةُ البَقِيعِ.", "n", "Medine."], ["كَانَتْ تُسَمَّى يَثْرِبَ.", "n", "Medine."], ["أَصْبَحَتْ عَاصِمَةَ الدَّوْلَةِ الإِسْلَامِيَّةِ.", "n", "Medine."], ["دُفِنَ فِيهَا النَّبِيُّ ﷺ.", "n", "Medine."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Boşluk, Eş, Zıt", short: "Kelimeler", col: "mi", legend: ["mz", "cerr"],
  goals: ["Mescid-i Aksâ paragrafında boşlukları doldurmak", "Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek"],
  examples: [
    { s: "بَعَثَ:mz.Kelime / = أَرْسَلَ:nasb.Eş", tr: "gönderdi", pair: "اسْتَقْبَلَ:mz.Kelime / ≠ وَدَّعَ:cerr.Zıt", pairTr: "karşıladı ≠ uğurladı" }
  ],
  rules: [
    { tr: "<b>4. etkinlik:</b> Mescid-i Aksâ Kudüs’tedir; üç din için kutsaldır. Bankadaki yedi kelimeden beşi kullanılır; <span class=\"ar\">هَاجَرُوا</span> ve <span class=\"ar\">بُقْعَةٌ</span> artar. Not: kitapta <span class=\"ar\">الدِّيَانَاتِ الثَّلَاثَةِ</span> yazılmış; sayılan şey dişil olduğu için doğrusu <span class=\"ar\">الثَّلَاثِ</span>’tir." },
    { tr: "<b>Eş anlam (5. etkinlik):</b> <span class=\"ar\">حُجْرَةٌ = غُرْفَةٌ · بَعَثَ = أَرْسَلَ · بَيْتٌ = دَارٌ · هَاجَرَ إِلَى = ذَهَبَ · طَلَعَ = ظَهَرَ</span>. <span class=\"ar\">هَاجَرَ</span> aslında “yurdunu bırakıp göç etti” demektir; <span class=\"ar\">ذَهَبَ</span> yakın anlamlıdır." },
    { tr: "<b>Zıt anlam (6. etkinlik):</b> <span class=\"ar\">وُلِدَ ≠ مَاتَ · أَوَّلُ ≠ آخِرُ · بُنِيَ ≠ هُدِمَ · اسْتَقْبَلَ ≠ وَدَّعَ · دَاخِلٌ ≠ خَارِجٌ</span>." }
  ],
  kaide: ["٤ ـ امْلَإِ الفَرَاغَاتِ بِالكَلِمَاتِ المُنَاسِبَةِ مِمَّا يَأْتِي: (المَعَالِمِ، أَدَاءِ، يَقَعُ، هَاجَرُوا، مُقَدَّسَةٌ، بُقْعَةٌ، يَتَوَجَّهُ).", "٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي. ٦ ـ صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا فِيمَا يَأْتِي."],
  ex: [
    { type: "bank", num: "٤", ar: "امْلَإِ الفَرَاغَاتِ بِالكَلِمَاتِ المُنَاسِبَةِ مِمَّا يَأْتِي", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. İki kelime artar.", bank: ["المَعَالِمِ", "أَدَاءِ", "يَقَعُ", "هَاجَرُوا", "مُقَدَّسَةٌ", "بُقْعَةٌ", "يَتَوَجَّهُ"],
      tr2: "Mescid-i Aksâ Kudüs şehrindedir; Kudüs üç din için kutsaldır. Mescid-i Aksâ meşhur İslamî tarihî eserlerdendir; çok sayıda namaz kılan, cuma namazını kılmak için mescide yönelir.",
      parts: [{ a: [2] }, "المَسْجِدُ الأَقْصَى فِي مَدِينَةِ القُدْسِ، وَهِيَ", { a: [4] }, "عِنْدَ الدِّيَانَاتِ الثَّلَاثِ، وَالمَسْجِدُ الأَقْصَى مِنَ", { a: [0] }, "التَّارِيخِيَّةِ الإِسْلَامِيَّةِ المَشْهُورَةِ،", { a: [6] }, "عَدَدٌ كَبِيرٌ مِنَ المُصَلِّينَ إِلَى المَسْجِدِ لِـ", { a: [1] }, "صَلَاةِ الجُمُعَةِ."] },
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["دَارٌ", "ظَهَرَ", "ذَهَبَ", "أَرْسَلَ", "غُرْفَةٌ"], items: [
      { pre: "حُجْرَةٌ =", a: [4], tr: "oda" }, { pre: "بَعَثَ =", a: [3], tr: "gönderdi" }, { pre: "بَيْتٌ =", a: [0], tr: "ev" }, { pre: "هَاجَرَ إِلَى =", a: [2], tr: "göç etti ≈ gitti" }, { pre: "طَلَعَ =", a: [1], tr: "doğdu, göründü" }
    ]},
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ الكَلِمَةِ وَعَكْسِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["آخِرُ", "مَاتَ", "وَدَّعَ", "خَارِجٌ", "هُدِمَ"], items: [
      { pre: "وُلِدَ ≠", a: [1], tr: "doğdu ≠ öldü" }, { pre: "أَوَّلُ ≠", a: [0], tr: "ilk ≠ son" }, { pre: "بُنِيَ ≠", a: [4], tr: "inşa edildi ≠ yıkıldı" }, { pre: "اسْتَقْبَلَ ≠", a: [2], tr: "karşıladı ≠ uğurladı" }, { pre: "دَاخِلٌ ≠", a: [3], tr: "iç ≠ dış" }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · ÇOĞUL VE CÜMLE TAMAMLAMA
{
  id: "u4", no: 4, ar: "الجَمْعُ وَتَتِمَّةُ الجُمَلِ", tr: "Çoğul ve Cümle Tamamlama", short: "Çoğul · tamamla", col: "ref", legend: ["mz", "nasb"],
  goals: ["Kelimelerin çoğulunu bulmak", "Cümleyi uygun devamıyla tamamlamak", "Hicret şiirinin kelimelerini tanımak"],
  examples: [
    { s: "بِئْرٌ:mz.Tekil / ← آبَارٌ:nasb.Çoğul", tr: "kuyu → kuyular", pair: "بُقْعَةٌ:mz.Tekil / ← بِقَاعٌ:nasb.Çoğul", pairTr: "yer → yerler" }
  ],
  rules: [
    { tr: "<b>Çoğullar (7. etkinlik):</b> <span class=\"ar\">مُكَعَّبٌ ← مُكَعَّبَاتٌ · بِئْرٌ ← آبَارٌ · مَعْلَمٌ ← مَعَالِمُ · مُقَدَّسٌ ← مُقَدَّسَاتٌ · بُقْعَةٌ ← بِقَاعٌ</span>. <span class=\"ar\">آبَارٌ</span> aslında <span class=\"ar\">أَأْبَارٌ</span>’dır (<span class=\"ar\">أَفْعَالٌ</span>); iki hemze birleşip <span class=\"ar\">آ</span> olur." },
    { tr: "<b>8. etkinlik:</b> <span class=\"ar\">يُؤَدِّي</span> “yerine getirir, eda eder”: <span class=\"ar\">يُؤَدِّي فَرِيضَةَ الحَجِّ، يُؤَدِّي وَاجِبَاتِهِ</span>. Selâhaddîn Eyyûbî Şam’da (<span class=\"ar\">دِمَشْقُ</span>) gömülüdür." },
    { tr: "<b>Hicret şiiri:</b> <span class=\"ar\">البَدْرُ</span> dolunay (Peygamber) · <span class=\"ar\">ثَنِيَّاتُ الوَدَاعِ</span> Medine girişindeki Veda tepeleri · <span class=\"ar\">المَبْعُوثُ</span> gönderilen · <span class=\"ar\">المُطَاعُ</span> itaat edilen · <span class=\"ar\">دَاعِ</span> = <span class=\"ar\">دَاعٍ</span> (davet eden; kafiye için böyle okunur)." }
  ],
  kaide: ["٧ ـ هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ.", "٨ ـ صِلْ بَيْنَ الجُمْلَةِ وَالتَّتِمَّةِ المُنَاسِبَةِ لَهَا فِيمَا يَأْتِي."],
  ex: [
    { type: "bank", num: "٧", ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Önce aşağıdan çoğulu seç, sonra kelimenin kutusuna dokun.", bank: ["مُكَعَّبَاتٌ", "آبَارٌ", "مَعَالِمُ", "مُقَدَّسَاتٌ", "بِقَاعٌ"], items: [
      { pre: "مُكَعَّبٌ ←", a: [0], tr: "küp" }, { pre: "بِئْرٌ ←", a: [1], tr: "kuyu" }, { pre: "مَعْلَمٌ ←", a: [2], tr: "eser, simge yer" }, { pre: "مُقَدَّسٌ ←", a: [3], tr: "kutsal (şey)" }, { pre: "بُقْعَةٌ ←", a: [4], tr: "yer, toprak parçası" }
    ]},
    { type: "bank", num: "٨", ar: "صِلْ بَيْنَ الجُمْلَةِ وَالتَّتِمَّةِ المُنَاسِبَةِ لَهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan cümlenin devamını seç, sonra cümlenin kutusuna dokun.", bank: ["فِي مَدِينَةِ دِمَشْقَ.", "مِنَ المَشَاعِرِ المُقَدَّسَةِ.", "فَرِيضَةَ الحَجِّ مَرَّةً فِي السَّنَةِ.", "وَاجِبَاتِهِ فِي الصَّفِّ وَالبَيْتِ.", "مِنْ مَعَالِمِ إِسْطَنْبُولَ المَشْهُورَةِ."], items: [
      { pre: "يُؤَدِّي المُسْلِمُونَ", a: [2], tr: "Müslümanlar hac farzını yılda bir kez (hac mevsiminde) eda eder." },
      { pre: "يُؤَدِّي الطَّالِبُ", a: [3], tr: "Öğrenci sınıfta ve evde ödevlerini yapar." },
      { pre: "دُفِنَ صَلَاحُ الدِّينِ الأَيُّوبِيُّ", a: [0], tr: "Selâhaddîn Eyyûbî Şam şehrinde defnedildi." },
      { pre: "جَامِعُ السُّلْطَانِ أَحْمَدَ، وَبُرْجُ البِنْتِ", a: [4], tr: "Sultanahmet Camii ve Kız Kulesi İstanbul’un meşhur eserlerindendir." },
      { pre: "مِنًى، وَالصَّفَا، وَالمَرْوَةُ", a: [1], tr: "Mina, Safa ve Merve kutsal hac mekânlarındandır." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "أَكْمِلِ الأَبْيَاتَ", tr: "Hicret şiirinde boşluğa gelen kelimeyi seç.", items: PL([
      ["طَلَعَ ___ عَلَيْنَا ✦ مِنْ ثَنِيَّاتِ الوَدَاعِ", "البَدْرُ", "الشَّمْسُ", "النَّجْمُ", "Dolunay doğdu üzerimize.", "بَدْرٌ: dolunay."],
      ["طَلَعَ البَدْرُ عَلَيْنَا ✦ مِنْ ثَنِيَّاتِ ___", "الوَدَاعِ", "اللِّقَاءِ", "السَّلَامِ", "Veda tepelerinden.", ""],
      ["وَجَبَ ___ عَلَيْنَا ✦ مَا دَعَا لِلَّهِ دَاعِ", "الشُّكْرُ", "الصَّبْرُ", "السَّفَرُ", "Şükür borcumuz oldu.", ""],
      ["أَيُّهَا ___ فِينَا ✦ جِئْتَ بِالأَمْرِ المُطَاعِ", "المَبْعُوثُ", "المُسَافِرُ", "الضَّيْفُ", "Ey aramıza gönderilen.", "بَعَثَ = أَرْسَلَ"],
      ["جِئْتَ ___ المَدِينَةَ ✦ مَرْحَبًا يَا خَيْرَ دَاعِ", "شَرَّفْتَ", "سَكَنْتَ", "تَرَكْتَ", "Geldin, Medine’yi şereflendirdin.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · CÜMLE VE KALIPLAR
{
  id: "u5", no: 5, ar: "تَرْتِيبُ الجُمَلِ وَالتَّرَاكِيبُ", tr: "Cümle Dizme ve Kalıplar", short: "Kalıplar", col: "muz", legend: ["mi", "ref"],
  goals: ["Karışık kelimelerden anlamlı cümle kurmak", "مِنْ أَهَمِّ مَعَالِمِ…، أَمَّا… فَـ…، مُنْذُ ذَلِكَ الوَقْتِ kalıplarını kullanmak", "أَصْبَحَ ve كَانَ’den sonra haberin mansûb olduğunu görmek"],
  examples: [
    { s: "مِنْ أَهَمِّ مَعَالِمِ:mi / مَكَّةَ المُكَرَّمَةِ:- / المَسْجِدُ الحَرَامُ.:-", tr: "Mekke’nin en önemli eserlerinden biri Mescid-i Haram’dır." },
    { s: "مُنْذُ ذَلِكَ الوَقْتِ:mi / أَصْبَحَتِ المَدِينَةُ:ref / عَاصِمَةً.:mi.Haber (mansûb)", tr: "O zamandan beri Medine başkent oldu." }
  ],
  rules: [
    { tr: "<b>مِنْ أَهَمِّ + çoğul + izafet</b> “…in en önemli …lerinden biri”: <span class=\"ar\">مِنْ أَهَمِّ مَعَالِمِ مَكَّةَ المَسْجِدُ الحَرَامُ</span>. Câr-mecrûr öne geçmiş haberdir; asıl mübteda sondadır." },
    { tr: "<b>أَمَّا… فَـ…</b> “…e gelince / …ise”: <span class=\"ar\">أَمَّا المَدِينَةُ المُنَوَّرَةُ فَهِيَ المَدِينَةُ المُبَارَكَةُ</span>. Haberin başına mutlaka <span class=\"ar\">فَـ</span> gelir. İki şeyi karşılaştırmak için kullanılır." },
    { tr: "<b>مُنْذُ ذَلِكَ الوَقْتِ</b> “o zamandan beri”: <span class=\"ar\">مُنْذُ ذَلِكَ الوَقْتِ أَصْبَحَتِ المَدِينَةُ عَاصِمَةً</span>. <b>أَصْبَحَ / كَانَ</b>’dan sonra haber mansûb olur: <span class=\"ar\">عَاصِمَةً</span>." },
    { tr: "<b>Cümle dizme (9. etkinlik):</b> <span class=\"ar\">تَقَعُ مَكَّةُ المُكَرَّمَةُ فِي المَمْلَكَةِ العَرَبِيَّةِ السُّعُودِيَّةِ · يَأْتِي النَّاسُ إِلَى مَكَّةَ لِأَدَاءِ فَرِيضَةِ الحَجِّ · هَاجَرَ النَّبِيُّ مُحَمَّدٌ ﷺ إِلَى المَدِينَةِ المُنَوَّرَةِ · أَصْبَحَتِ المَدِينَةُ المُنَوَّرَةُ عَاصِمَةً لِلدَّوْلَةِ الإِسْلَامِيَّةِ</span>." }
  ],
  kaide: ["٩ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً.", "١٠ ـ لَاحِظِ التَّرَاكِيبَ الَّتِي تَحْتَهَا خَطٌّ فِي الجُمَلِ الآتِيَةِ، وَاكْتُبْ مِثَالَيْنِ لِكُلِّ تَرْكِيبٍ: ١. مِنْ أَهَمِّ مَعَالِمِ مَكَّةَ المُكَرَّمَةِ المَسْجِدُ الحَرَامُ. ٢. أَمَّا المَدِينَةُ المُنَوَّرَةُ فَهِيَ المَدِينَةُ المُبَارَكَةُ الَّتِي هَاجَرَ إِلَيْهَا النَّبِيُّ مُحَمَّدٌ ﷺ. ٣. مُنْذُ ذَلِكَ الوَقْتِ أَصْبَحَتِ المَدِينَةُ عَاصِمَةً لِلدَّوْلَةِ الإِسْلَامِيَّةِ."],
  ex: [
    { type: "pick", num: "٩", ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Karışık kelimelerden kurulan doğru cümleyi seç.", items: PL([
      ["السُّعُودِيَّةِ، مَكَّةُ المُكَرَّمَةُ، تَقَعُ، العَرَبِيَّةِ، فِي، المَمْلَكَةِ", "تَقَعُ مَكَّةُ المُكَرَّمَةُ فِي المَمْلَكَةِ العَرَبِيَّةِ السُّعُودِيَّةِ.", "تَقَعُ المَمْلَكَةُ فِي مَكَّةَ المُكَرَّمَةِ العَرَبِيَّةِ السُّعُودِيَّةِ.", "فِي السُّعُودِيَّةِ تَقَعُ المَمْلَكَةُ مَكَّةُ العَرَبِيَّةِ.", "Mekke Suudi Arabistan Krallığı’ndadır.", ""],
      ["لِأَدَاءِ، النَّاسُ، يَأْتِي، الحَجِّ، فَرِيضَةِ، مَكَّةَ، إِلَى", "يَأْتِي النَّاسُ إِلَى مَكَّةَ لِأَدَاءِ فَرِيضَةِ الحَجِّ.", "يَأْتِي الحَجُّ إِلَى النَّاسِ لِأَدَاءِ فَرِيضَةِ مَكَّةَ.", "إِلَى النَّاسُ يَأْتِي مَكَّةَ فَرِيضَةِ لِأَدَاءِ الحَجِّ.", "İnsanlar hac farzını eda etmek için Mekke’ye gelir.", "لِـ + mastar: amaç."],
      ["إِلَى، النَّبِيُّ ﷺ، المَدِينَةِ، مُحَمَّدٌ، هَاجَرَ، المُنَوَّرَةِ", "هَاجَرَ النَّبِيُّ مُحَمَّدٌ ﷺ إِلَى المَدِينَةِ المُنَوَّرَةِ.", "هَاجَرَتِ المَدِينَةُ إِلَى النَّبِيِّ مُحَمَّدٍ ﷺ.", "المُنَوَّرَةِ هَاجَرَ إِلَى النَّبِيُّ المَدِينَةِ.", "Peygamber Muhammed (s.a.v.) Medine’ye hicret etti.", ""],
      ["عَاصِمَةً، المَدِينَةُ، لِلدَّوْلَةِ، أَصْبَحَتْ، الإِسْلَامِيَّةِ، المُنَوَّرَةُ", "أَصْبَحَتِ المَدِينَةُ المُنَوَّرَةُ عَاصِمَةً لِلدَّوْلَةِ الإِسْلَامِيَّةِ.", "أَصْبَحَتِ الدَّوْلَةُ عَاصِمَةً لِلْمَدِينَةِ المُنَوَّرَةِ.", "أَصْبَحَتِ المَدِينَةُ المُنَوَّرَةُ عَاصِمَةٌ لِلدَّوْلَةِ.", "Medine İslam devletinin başkenti oldu.", "أَصْبَحَ + isim (merfû) + haber (mansûb)."]
    ])},
    { type: "pick", fill: true, num: "١٠", ar: "لَاحِظِ التَّرَاكِيبَ، وَاكْتُبْ مِثَالَيْنِ لِكُلِّ تَرْكِيبٍ", tr: "Boşluğa kalıba uyan doğru biçimi seç; sonra defterine her kalıpla iki örnek yaz.", items: PL([
      ["مِنْ أَهَمِّ ___ إِسْطَنْبُولَ آيَا صُوفْيَا.", "مَعَالِمِ", "مَعْلَمِ", "مَعَالِمُ", "İstanbul’un en önemli eserlerinden biri Ayasofya’dır.", "مِنْ أَهَمِّ + çoğul (mecrûr)"],
      ["مِنْ ___ مَعَالِمِ المَدِينَةِ المَسْجِدُ النَّبَوِيُّ.", "أَهَمِّ", "مُهِمِّ", "أَهَمُّ", "Medine’nin en önemli eserlerinden biri Mescid-i Nebevî’dir.", ""],
      ["أَمَّا أَخِي ___ طَبِيبٌ.", "فَهُوَ", "وَهُوَ", "هُوَ", "Kardeşime gelince, o doktordur.", "أَمَّا… فَـ…"],
      ["أَحْمَدُ يُحِبُّ الكُتُبَ، أَمَّا عَلِيٌّ ___ الرِّيَاضَةَ.", "فَيُحِبُّ", "يُحِبُّ", "ثُمَّ يُحِبُّ", "Ahmed kitapları sever; Ali ise sporu sever.", "Karşılaştırma: أَمَّا… فَـ"],
      ["___ ذَلِكَ الوَقْتِ وَأَنَا أَدْرُسُ العَرَبِيَّةَ.", "مُنْذُ", "مِنْ أَهَمِّ", "أَمَّا", "O zamandan beri Arapça okuyorum.", "مُنْذُ: …den beri"],
      ["أَصْبَحَتِ المَدِينَةُ ___ لِلدَّوْلَةِ.", "عَاصِمَةً", "عَاصِمَةٌ", "عَاصِمَةٍ", "Medine devletin başkenti oldu.", "أَصْبَحَ’in haberi mansûb."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "كَانَ وَأَصْبَحَ", tr: "كَانَ / أَصْبَحَ cümlesinde doğru biçimi seç.", items: PL([
      ["كَانَتِ المَدِينَةُ ___ يَثْرِبَ.", "تُسَمَّى", "سُمِّيَتْ", "تُسَمِّي", "Medine’ye Yesrib denirdi.", "كَانَ + muzâri: geçmişte süreklilik."],
      ["أَصْبَحَ الجَوُّ ___ .", "بَارِدًا", "بَارِدٌ", "بَارِدٍ", "Hava soğuk oldu.", "Haber mansûb."],
      ["كَانَ المُسْلِمُونَ الأَوَائِلُ ___ .", "قَلِيلِينَ", "قَلِيلُونَ", "قَلِيلٌ", "İlk Müslümanlar azdı.", "Cem-i müzekker mansûb: ـِينَ"],
      ["أَصْبَحَ المَسْجِدُ ___ بِالمُصَلِّينَ.", "مُزْدَحِمًا", "مُزْدَحِمٌ", "مُزْدَحِمٍ", "Mescit namaz kılanlarla doldu.", ""],
      ["كَانَتْ مَكَّةُ ___ الدَّعْوَةِ.", "بِدَايَةَ", "بِدَايَةُ", "بِدَايَةٍ", "Mekke davetin başlangıcıydı.", "كَانَ’in haberi mansûb."]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["مَكَّةُ المُكَرَّمَةُ هِيَ {أَقْدَسُ} مَدِينَةٍ فِي الإِسْلَامِ.", ["أَقْدَسُ", "أَكْبَرُ", "أَقْدَمُ"], "metin", "En kutsal şehir.", "u1"],
  ["وَمِنْهَا بَدَأَتِ {الدَّعْوَةُ} إِلَى الإِسْلَامِ.", ["الدَّعْوَةُ", "الهِجْرَةُ", "الدَّوْلَةُ"], "metin", "Davet oradan başladı.", "u1"],
  ["أَوَّلُ بَيْتٍ {وُضِعَ} لِلنَّاسِ.", ["وُضِعَ", "هُدِمَ", "بِيعَ"], "metin", "İnsanlar için kurulan ilk ev.", "u1"],
  ["سُمِّيَتْ بِهَذَا الاسْمِ لِأَنَّهَا بِنَاءٌ {مُكَعَّبُ} الشَّكْلِ.", ["مُكَعَّبُ", "مُدَوَّرُ", "مُثَلَّثُ"], "metin", "Küp biçimli.", "u1"],
  ["وَبِئْرُ مَاءِ {زَمْزَمَ}.", ["زَمْزَمَ", "البَقِيعِ", "أُحُدٍ"], "metin", "Zemzem kuyusu.", "u1"],
  ["وَدُفِنَ فِي {حُجْرَتِهِ} الكَرِيمَةِ.", ["حُجْرَتِهِ", "مَسْجِدِهِ", "مَدِينَتِهِ"], "metin", "Mübarek odasına.", "u1"],
  ["طَلَعَ البَدْرُ {عَلَيْنَا}.", ["عَلَيْنَا", "إِلَيْنَا", "مِنَّا"], "metin", "Dolunay doğdu üzerimize.", "u1"],
  ["بَدَأَتِ الدَّعْوَةُ إِلَى الإِسْلَامِ فِي {مَكَّةَ}.", ["مَكَّةَ", "يَثْرِبَ", "القُدْسِ"], "anlama", "Mekke’de.", "u2"],
  ["كَانَتِ المَدِينَةُ تُسَمَّى {يَثْرِبَ}.", ["يَثْرِبَ", "بَكَّةَ", "الطَّائِفَ"], "anlama", "Yesrib.", "u2"],
  ["يَتَوَجَّهُ المُسْلِمُونَ إِلَى مَكَّةَ لِأَدَاءِ {العُمْرَةِ} وَالحَجِّ.", ["العُمْرَةِ", "الهِجْرَةِ", "التِّجَارَةِ"], "anlama", "Umre ve hac.", "u2"],
  ["{يَقَعُ} المَسْجِدُ الأَقْصَى فِي مَدِينَةِ القُدْسِ.", ["يَقَعُ", "يَتَوَجَّهُ", "هَاجَرُوا"], "boşluk", "Kudüs’tedir.", "u3"],
  ["القُدْسُ {مُقَدَّسَةٌ} عِنْدَ الدِّيَانَاتِ الثَّلَاثِ.", ["مُقَدَّسَةٌ", "بُقْعَةٌ", "مَعَالِمُ"], "boşluk", "Üç din için kutsal.", "u3"],
  ["حُجْرَةٌ = {غُرْفَةٌ}.", ["غُرْفَةٌ", "حَجَرٌ", "دَارٌ"], "eş anlam", "oda", "u3"],
  ["بَعَثَ = {أَرْسَلَ}.", ["أَرْسَلَ", "ظَهَرَ", "ذَهَبَ"], "eş anlam", "gönderdi", "u3"],
  ["أَوَّلُ ≠ {آخِرُ}.", ["آخِرُ", "خَارِجٌ", "ثَانٍ"], "zıt", "ilk ≠ son", "u3"],
  ["بُنِيَ ≠ {هُدِمَ}.", ["هُدِمَ", "وُلِدَ", "دُفِنَ"], "zıt", "inşa edildi ≠ yıkıldı", "u3"],
  ["بِئْرٌ ← {آبَارٌ}.", ["آبَارٌ", "بُؤُورٌ", "بِئْرَاتٌ"], "çoğul", "kuyu → kuyular", "u4"],
  ["بُقْعَةٌ ← {بِقَاعٌ}.", ["بِقَاعٌ", "بُقُوعٌ", "أَبْقَاعٌ"], "çoğul", "yer → yerler", "u4"],
  ["دُفِنَ صَلَاحُ الدِّينِ فِي مَدِينَةِ {دِمَشْقَ}.", ["دِمَشْقَ", "القَاهِرَةِ", "بَغْدَادَ"], "tamamla", "Şam’da.", "u4"],
  ["يُؤَدِّي الطَّالِبُ {وَاجِبَاتِهِ} فِي الصَّفِّ وَالبَيْتِ.", ["وَاجِبَاتِهِ", "فَرِيضَةَ الحَجِّ", "مَعَالِمَهُ"], "tamamla", "Ödevlerini yapar.", "u4"],
  ["مِنْ أَهَمِّ {مَعَالِمِ} مَكَّةَ المَسْجِدُ الحَرَامُ.", ["مَعَالِمِ", "مَعْلَمِ", "مَعَالِمُ"], "kalıp", "En önemli eserlerinden.", "u5"],
  ["أَمَّا المَدِينَةُ المُنَوَّرَةُ {فَهِيَ} المَدِينَةُ المُبَارَكَةُ.", ["فَهِيَ", "وَهِيَ", "ثُمَّ هِيَ"], "kalıp", "Medine ise…", "u5"],
  ["{مُنْذُ} ذَلِكَ الوَقْتِ أَصْبَحَتِ المَدِينَةُ عَاصِمَةً.", ["مُنْذُ", "أَمَّا", "عِنْدَ"], "kalıp", "O zamandan beri.", "u5"],
  ["أَصْبَحَتِ المَدِينَةُ {عَاصِمَةً} لِلدَّوْلَةِ.", ["عَاصِمَةً", "عَاصِمَةٌ", "عَاصِمَةٍ"], "kalıp", "Başkent oldu.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["بَدَأَتِ الدَّعْوَةُ فِي يَثْرِبَ ← metne göre düzelt", "بَدَأَتِ الدَّعْوَةُ فِي مَكَّةَ", "بَدَأَتِ الدَّعْوَةُ فِي القُدْسِ", "لَمْ تَبْدَإِ الدَّعْوَةُ", "Davet Mekke’de başladı.", "u2"],
  ["بِئْرُ زَمْزَمَ فِي المَدِينَةِ ← düzelt", "بِئْرُ زَمْزَمَ فِي مَكَّةَ", "بِئْرُ زَمْزَمَ فِي البَقِيعِ", "لَيْسَ هُنَاكَ بِئْرُ زَمْزَمَ", "Mekke sınırları içinde.", "u2"],
  ["وُلِدَ النَّبِيُّ ﷺ فِي المَدِينَةِ ← düzelt", "وُلِدَ النَّبِيُّ ﷺ فِي مَكَّةَ", "وُلِدَ النَّبِيُّ ﷺ فِي يَثْرِبَ", "تُوُفِّيَ النَّبِيُّ ﷺ فِي مَكَّةَ", "Mekke’de doğdu.", "u1"],
  ["طَلَعَ ← eş anlam", "ظَهَرَ", "نَزَلَ", "غَابَ", "doğdu, göründü", "u3"],
  ["بَيْتٌ ← eş anlam", "دَارٌ", "بِئْرٌ", "قَبْرٌ", "ev", "u3"],
  ["اسْتَقْبَلَ ← zıt anlam", "وَدَّعَ", "رَحَّبَ", "هَاجَرَ", "karşıladı ≠ uğurladı", "u3"],
  ["دَاخِلٌ ← zıt anlam", "خَارِجٌ", "أَوَّلُ", "قَرِيبٌ", "iç ≠ dış", "u3"],
  ["مَعْلَمٌ ← çoğul", "مَعَالِمُ", "مَعْلَمَاتٌ", "عُلُومٌ", "eser → eserler", "u4"],
  ["مُقَدَّسٌ ← çoğul", "مُقَدَّسَاتٌ", "مَقَادِسُ", "قُدُوسٌ", "kutsal → kutsallar", "u4"],
  ["مُكَعَّبٌ ← çoğul", "مُكَعَّبَاتٌ", "كِعَابٌ", "مَكَاعِبُ", "küp → küpler", "u4"],
  ["المَسْجِدُ الحَرَامُ أَهَمُّ مَعَالِمِ مَكَّةَ ← مِنْ أَهَمِّ ile", "مِنْ أَهَمِّ مَعَالِمِ مَكَّةَ المَسْجِدُ الحَرَامُ", "مِنْ أَهَمُّ مَعَالِمُ مَكَّةَ المَسْجِدُ الحَرَامُ", "أَهَمُّ مِنْ مَعَالِمِ مَكَّةَ المَسْجِدُ", "مِنْ أَهَمِّ + izafet", "u5"],
  ["المَدِينَةُ المُبَارَكَةُ ← أَمَّا ile", "أَمَّا المَدِينَةُ فَهِيَ المُبَارَكَةُ", "أَمَّا المَدِينَةُ هِيَ المُبَارَكَةُ", "أَمَّا فَالمَدِينَةُ مُبَارَكَةٌ", "أَمَّا… فَـ…", "u5"],
  ["المَدِينَةُ عَاصِمَةٌ ← أَصْبَحَتْ ile", "أَصْبَحَتِ المَدِينَةُ عَاصِمَةً", "أَصْبَحَتِ المَدِينَةَ عَاصِمَةٌ", "أَصْبَحَتِ المَدِينَةُ عَاصِمَةٌ", "Haber mansûb.", "u5"],
  ["المَدِينَةُ تُسَمَّى يَثْرِبَ ← كَانَتْ ile", "كَانَتِ المَدِينَةُ تُسَمَّى يَثْرِبَ", "كَانَتِ المَدِينَةَ تُسَمَّى يَثْرِبُ", "كَانَ المَدِينَةُ سُمِّيَتْ يَثْرِبَ", "كَانَ + muzâri", "u5"]
];
// Mekke mi, Medine mi? hız oyunu
var NOUN_LIST = [
  ["المَسْجِدُ الحَرَامُ 🕋", "m", "Mekke"], ["الكَعْبَةُ المُشَرَّفَةُ", "m", "Mekke"], ["بِئْرُ زَمْزَمَ 💧", "m", "Mekke"], ["عَرَفَاتٌ", "m", "Mekke sınırları"], ["مُزْدَلِفَةُ", "m", "Mekke sınırları"], ["مِنًى", "m", "Mekke sınırları"], ["الصَّفَا وَالمَرْوَةُ", "m", "Mekke"], ["مَوْلِدُ النَّبِيِّ ﷺ", "m", "Mekke’de doğdu"], ["بِدَايَةُ الدَّعْوَةِ", "m", "Mekke"],
  ["المَسْجِدُ النَّبَوِيُّ 🕌", "n", "Medine"], ["البَقِيعُ", "n", "Medine"], ["جَبَلُ أُحُدٍ ⛰️", "n", "Medine"], ["يَثْرِبُ", "n", "Medine’nin eski adı"], ["ثَنِيَّاتُ الوَدَاعِ", "n", "Medine girişi"], ["عَاصِمَةُ الدَّوْلَةِ الإِسْلَامِيَّةِ", "n", "Medine"], ["قَبْرُ النَّبِيِّ ﷺ", "n", "Medine"]
];
var SP_M = SEHIR;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; }).concat(UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; }));
var HAFIZA = {
  es: { name: "Kelime ↔ eş anlamlısı", pairs: [["حُجْرَةٌ", "غُرْفَةٌ"], ["بَعَثَ", "أَرْسَلَ"], ["بَيْتٌ", "دَارٌ"], ["هَاجَرَ إِلَى", "ذَهَبَ"], ["طَلَعَ", "ظَهَرَ"], ["عَاصِمَةٌ", "حَاضِرَةٌ"]] },
  zd: { name: "Kelime ↔ zıt anlamlısı", pairs: [["وُلِدَ", "مَاتَ"], ["أَوَّلُ", "آخِرُ"], ["بُنِيَ", "هُدِمَ"], ["اسْتَقْبَلَ", "وَدَّعَ"], ["دَاخِلٌ", "خَارِجٌ"], ["مُقَدَّسٌ", "مُدَنَّسٌ"]] },
  cm: { name: "Tekil ↔ çoğul", pairs: [["مُكَعَّبٌ", "مُكَعَّبَاتٌ"], ["بِئْرٌ", "آبَارٌ"], ["مَعْلَمٌ", "مَعَالِمُ"], ["مُقَدَّسٌ", "مُقَدَّسَاتٌ"], ["بُقْعَةٌ", "بِقَاعٌ"], ["قَبْرٌ", "قُبُورٌ"], ["شَهِيدٌ", "شُهَدَاءُ"]] }
};
var KARTLAR = [
  ["İki kutsal şehir?", "مَكَّةُ المُكَرَّمَةُ · المَدِينَةُ المُنَوَّرَةُ"],
  ["Mekke neden en kutsal?", "وُلِدَ فِيهَا الرَّسُولُ ﷺ · مِنْهَا بَدَأَتِ الدَّعْوَةُ · فِيهَا الكَعْبَةُ"],
  ["Mescid-i Haram?", "أَوَّلُ بَيْتٍ وُضِعَ لِلنَّاسِ لِعِبَادَةِ اللهِ · لِلْعُمْرَةِ وَالحَجِّ"],
  ["Kâbe adı neden?", "لِأَنَّهَا بِنَاءٌ مُكَعَّبُ الشَّكْلِ · قِبْلَةُ المُسْلِمِينَ"],
  ["Mekke sınırlarındaki kutsal yerler?", "زَمْزَمُ · عَرَفَاتٌ · مُزْدَلِفَةُ · مِنًى · الصَّفَا وَالمَرْوَةُ"],
  ["Medine?", "هَاجَرَ إِلَيْهَا النَّبِيُّ ﷺ · بَنَى فِيهَا مَسْجِدَهُ · البَقِيعُ · دُفِنَ فِي حُجْرَتِهِ"],
  ["Neden hicret?", "لَقِيَ هُوَ وَالمُسْلِمُونَ الأَوَائِلُ العَذَابَ الشَّدِيدَ مِنْ مُشْرِكِي مَكَّةَ"],
  ["Hicret şiiri?", "طَلَعَ البَدْرُ عَلَيْنَا · مِنْ ثَنِيَّاتِ الوَدَاعِ"],
  ["Medine’nin eski adı, başkentlik?", "يَثْرِبُ · عَاصِمَةُ الدَّوْلَةِ الإِسْلَامِيَّةِ"],
  ["Eş ve zıt?", "حُجْرَةٌ = غُرْفَةٌ · بَعَثَ = أَرْسَلَ · طَلَعَ = ظَهَرَ · اسْتَقْبَلَ ≠ وَدَّعَ · أَوَّلُ ≠ آخِرُ"],
  ["Çoğullar?", "مُكَعَّبَاتٌ · آبَارٌ · مَعَالِمُ · مُقَدَّسَاتٌ · بِقَاعٌ"],
  ["Kalıplar?", "مِنْ أَهَمِّ مَعَالِمِ… · أَمَّا… فَـ… · مُنْذُ ذَلِكَ الوَقْتِ · أَصْبَحَ + mansûb"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat19";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("مُقَدَّسٌ", "s", "kutsal", "مُقَدَّسَاتٌ", "at", "", "", "مَدِينَتَانِ مُقَدَّسَتَانِ عِنْدَ المُسْلِمِينَ.", "مُقَدَّسَتَانِ", "Müslümanlar için iki kutsal şehir."),
  KW("أَقْدَسُ", "s", "en kutsal", "", "", "", "", "مَكَّةُ المُكَرَّمَةُ هِيَ أَقْدَسُ مَدِينَةٍ فِي الإِسْلَامِ.", "أَقْدَسُ", "Mekke İslam’ın en kutsal şehridir."),
  KW("دَعْوَةٌ", "i", "davet, tebliğ", "دَعَوَاتٌ", "at", "", "", "وَمِنْهَا بَدَأَتِ الدَّعْوَةُ إِلَى الإِسْلَامِ.", "الدَّعْوَةُ", "İslam daveti oradan başladı."),
  KW("مَعْلَمٌ", "i", "eser, simge yer", "مَعَالِمُ", "mefail", "", "", "مِنْ أَهَمِّ مَعَالِمِهَا المَسْجِدُ الحَرَامُ.", "مَعَالِمِهَا", "En önemli eserlerinden biri Mescid-i Haram’dır."),
  KW("وُضِعَ", "f", "konuldu, kuruldu", "", "", "", "", "وَهُوَ أَوَّلُ بَيْتٍ وُضِعَ لِلنَّاسِ.", "وُضِعَ", "İnsanlar için kurulan ilk evdir."),
  KW("عِبَادَةٌ", "i", "ibadet", "عِبَادَاتٌ", "at", "", "", "أَوَّلُ بَيْتٍ وُضِعَ لِلنَّاسِ لِعِبَادَةِ اللهِ.", "لِعِبَادَةِ", "Allah’a ibadet için kurulan ilk ev."),
  KW("تَوَجَّهَ", "f", "yöneldi (إِلَى)", "", "", "ذَهَبَ", "", "يَتَوَجَّهُ إِلَيْهِ المُسْلِمُونَ لِلْعُمْرَةِ.", "يَتَوَجَّهُ", "Müslümanlar umre için ona yönelir."),
  KW("عُمْرَةٌ", "i", "umre", "عُمَرٌ", "fual", "", "", "يَتَوَجَّهُ إِلَيْهِ المُسْلِمُونَ لِلْعُمْرَةِ.", "لِلْعُمْرَةِ", "Müslümanlar umre için ona yönelir."),
  KW("قِبْلَةٌ", "i", "kıble", "", "", "", "", "وَهِيَ بَيْتُ اللهِ الحَرَامُ وَقِبْلَةُ المُسْلِمِينَ.", "وَقِبْلَةُ", "Allah’ın Beytü’l-Haram’ı ve Müslümanların kıblesidir."),
  KW("مُكَعَّبٌ", "s", "küp (biçimli)", "مُكَعَّبَاتٌ", "at", "", "", "لِأَنَّهَا بِنَاءٌ مُكَعَّبُ الشَّكْلِ.", "مُكَعَّبُ", "Çünkü küp biçimli bir yapıdır."),
  KW("بِنَاءٌ", "i", "yapı, bina", "أَبْنِيَةٌ", "efile", "", "", "لِأَنَّهَا بِنَاءٌ مُكَعَّبُ الشَّكْلِ.", "بِنَاءٌ", "Çünkü küp biçimli bir yapıdır."),
  KW("بِئْرٌ", "i", "kuyu", "آبَارٌ", "efal", "", "", "وَبِئْرُ مَاءِ زَمْزَمَ.", "وَبِئْرُ", "Ve Zemzem kuyusu."),
  KW("مَشْعَرٌ", "i", "hac menâsik yeri", "مَشَاعِرُ", "mefail", "", "", "وَالمَشَاعِرُ المُقَدَّسَةُ: عَرَفَاتٌ وَمُزْدَلِفَةُ.", "وَالمَشَاعِرُ", "Kutsal hac mekânları: Arafat ve Müzdelife."),
  KW("حَدٌّ", "i", "sınır", "حُدُودٌ", "fuul", "", "", "كُلُّهَا تَقَعُ فِي حُدُودِ مَكَّةَ المُكَرَّمَةِ.", "حُدُودِ", "Hepsi Mekke sınırları içindedir."),
  KW("هَاجَرَ", "f", "hicret etti, göç etti", "", "", "ذَهَبَ", "", "المَدِينَةُ الَّتِي هَاجَرَ إِلَيْهَا النَّبِيُّ ﷺ.", "هَاجَرَ", "Peygamberin hicret ettiği şehir."),
  KW("هِجْرَةٌ", "i", "hicret, göç", "", "", "", "", "وَكَانَتِ المَدِينَةُ قَبْلَ الهِجْرَةِ تُسَمَّى يَثْرِبَ.", "الهِجْرَةِ", "Medine hicretten önce Yesrib diye anılırdı."),
  KW("بُقْعَةٌ", "i", "yer, toprak parçası", "بِقَاعٌ", "fial", "", "", "وَفِي المَدِينَةِ بُقْعَةٌ يُقَالُ لَهَا البَقِيعُ.", "بُقْعَةٌ", "Medine’de Bakî‘ denen bir yer vardır."),
  KW("قَبْرٌ", "i", "kabir", "قُبُورٌ", "fuul", "", "", "وَفِيهَا قُبُورُ شُهَدَاءِ غَزْوَةِ أُحُدٍ.", "قُبُورُ", "Orada Uhud şehitlerinin kabirleri vardır."),
  KW("شَهِيدٌ", "i", "şehit", "شُهَدَاءُ", "fuela", "", "", "وَفِيهَا قُبُورُ شُهَدَاءِ غَزْوَةِ أُحُدٍ.", "شُهَدَاءِ", "Uhud şehitlerinin kabirleri."),
  KW("غَزْوَةٌ", "i", "gazve, savaş", "غَزَوَاتٌ", "at", "", "", "وَفِيهَا قُبُورُ شُهَدَاءِ غَزْوَةِ أُحُدٍ.", "غَزْوَةِ", "Uhud gazvesinin şehitleri."),
  KW("زَوْجَةٌ", "i", "eş (kadın)", "زَوْجَاتٌ", "at", "", "زَوْجٌ", "وَزَوْجَاتِ النَّبِيِّ مُحَمَّدٍ ﷺ وَبَنَاتِهِ.", "وَزَوْجَاتِ", "Peygamberin eşleri ve kızları."),
  KW("حُجْرَةٌ", "i", "oda", "حُجُرَاتٌ", "at", "غُرْفَةٌ", "", "وَدُفِنَ فِي حُجْرَتِهِ الكَرِيمَةِ.", "حُجْرَتِهِ", "Mübarek odasına defnedildi."),
  KW("لَقِيَ", "f", "karşılaştı, gördü", "", "", "", "", "عِنْدَمَا لَقِيَ هُوَ وَالمُسْلِمُونَ العَذَابَ.", "لَقِيَ", "O ve Müslümanlar eziyet görünce."),
  KW("عَذَابٌ", "i", "eziyet, azap", "", "", "", "رَاحَةٌ", "لَقِيَ… العَذَابَ الشَّدِيدَ مِنْ مُشْرِكِي مَكَّةَ.", "العَذَابَ", "Mekke müşriklerinden ağır eziyet gördü."),
  KW("مُشْرِكٌ", "i", "müşrik", "مُشْرِكُونَ", "un", "", "مُؤْمِنٌ", "العَذَابَ الشَّدِيدَ مِنْ مُشْرِكِي مَكَّةَ.", "مُشْرِكِي", "Mekke müşriklerinden ağır eziyet."),
  KW("اسْتَقْبَلَ", "f", "karşıladı", "", "", "", "وَدَّعَ", "اسْتَقْبَلَهُ أَهْلُهَا بِالأَبْيَاتِ الشِّعْرِيَّةِ.", "اسْتَقْبَلَهُ", "Halkı onu şiir beyitleriyle karşıladı."),
  KW("بَيْتٌ", "i", "ev; beyit", "أَبْيَاتٌ / بُيُوتٌ", "efal", "دَارٌ", "", "اسْتَقْبَلَهُ أَهْلُهَا بِالأَبْيَاتِ الشِّعْرِيَّةِ.", "بِالأَبْيَاتِ", "Halkı onu beyitlerle karşıladı."),
  KW("طَلَعَ", "f", "doğdu (ay, güneş)", "", "", "ظَهَرَ", "غَرَبَ", "طَلَعَ البَدْرُ عَلَيْنَا.", "طَلَعَ", "Dolunay doğdu üzerimize."),
  KW("بَدْرٌ", "i", "dolunay", "بُدُورٌ", "fuul", "", "", "طَلَعَ البَدْرُ عَلَيْنَا.", "البَدْرُ", "Dolunay doğdu üzerimize."),
  KW("بَعَثَ", "f", "gönderdi", "", "", "أَرْسَلَ", "", "أَيُّهَا المَبْعُوثُ فِينَا.", "المَبْعُوثُ", "Ey aramıza gönderilen."),
  KW("شَرَّفَ", "f", "şereflendirdi", "", "", "", "", "جِئْتَ شَرَّفْتَ المَدِينَةَ.", "شَرَّفْتَ", "Geldin, Medine’yi şereflendirdin."),
  KW("أَصْبَحَ", "f", "oldu; sabahladı", "", "", "صَارَ", "", "أَصْبَحَتِ المَدِينَةُ عَاصِمَةً لِلدَّوْلَةِ.", "أَصْبَحَتِ", "Medine devletin başkenti oldu."),
  KW("عَاصِمَةٌ", "i", "başkent", "عَوَاصِمُ", "fevail", "", "", "أَصْبَحَتِ المَدِينَةُ عَاصِمَةً لِلدَّوْلَةِ.", "عَاصِمَةً", "Medine devletin başkenti oldu."),
  KW("دَوْلَةٌ", "i", "devlet", "دُوَلٌ", "fual", "", "", "عَاصِمَةً لِلدَّوْلَةِ الإِسْلَامِيَّةِ.", "لِلدَّوْلَةِ", "İslam devletinin başkenti."),
  KW("خَلِيفَةٌ", "i", "halife", "خُلَفَاءُ", "fuela", "", "", "ثُمَّ خُلَفَائِهِ أَبِي بَكْرٍ وَعُمَرَ.", "خُلَفَائِهِ", "Sonra halifeleri Ebû Bekir ve Ömer."),
  KW("حَالِيٌّ", "s", "şimdiki", "", "", "", "سَابِقٌ", "ثُمَّ سُمِّيَتْ بِاسْمِهَا الحَالِيِّ.", "الحَالِيِّ", "Sonra bugünkü adını aldı."),
  KW("أَدَّى", "f", "eda etti, yerine getirdi", "", "", "", "", "يُؤَدِّي الطَّالِبُ وَاجِبَاتِهِ فِي الصَّفِّ.", "يُؤَدِّي", "Öğrenci sınıfta ödevlerini yapar.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"at":["ـَاتٌ","cem-i müennes sâlim","مُقَدَّسَاتٌ، غَزَوَاتٌ"],"mefail":["مَفَاعِلُ","mefâil","مَعَالِمُ، مَشَاعِرُ"],"fual":["فُعَلٌ","fu’al","دُوَلٌ، عُمَرٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَبْنِيَةٌ"],"efal":["أَفْعَالٌ","ef’âl","آبَارٌ، أَبْيَاتٌ"],"fuul":["فُعُولٌ","fuûl","حُدُودٌ، قُبُورٌ"],"fial":["فِعَالٌ","fiâl","بِقَاعٌ، جِبَالٌ"],"fuela":["فُعَلَاءُ","fuelâ","شُهَدَاءُ، خُلَفَاءُ"],"un":["ـُونَ","cem-i müzekker sâlim","مُشْرِكُونَ، مُسْلِمُونَ"],"fevail":["فَوَاعِلُ","fevâil","عَوَاصِمُ، شَوَارِعُ"]};
