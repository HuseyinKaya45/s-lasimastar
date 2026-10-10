// ================= VERİ: Kıraat 7 — اليَوْمُ فِي حَيَاةِ المُسْلِمِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الوَقْتُ", tr: "Zaman" }, nasb: { ar: "العَمَلُ", tr: "İş" }, cerr: { ar: "المَكَانُ", tr: "Yer" },
  mi: { ar: "الفِعْلُ", tr: "Fiil" }, ref: { ar: "الضَّمِيرُ", tr: "Zamir" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var VAKIT = [["s", "Sabah", "صَبَاحًا", "nasb"], ["z", "Öğle", "ظُهْرًا", "cerr"], ["m", "Akşam", "مَسَاءً", "mi"]];
var NS = [["e", "Metinde var", "فِي النَّصِّ", "mz"], ["h", "Metinde yok", "لَيْسَ فِي النَّصِّ", "cerr"]];
var ZM = [["m", "Mâzî", "المَاضِي", "nasb"], ["d", "Muzâri", "المُضَارِعُ", "mi"]];
var TUR_TR = { d: "Muzâri", y: "Yanlış", m: "Mâzî" };

// Çekim makinesi: fiil × zamir × zaman
var ZAMIR = [["أَنَا", "ben"], ["نَحْنُ", "biz"], ["أَنْتَ", "sen (e.)"], ["أَنْتِ", "sen (k.)"], ["هُوَ", "o (e.)"], ["هِيَ", "o (k.)"]];
// [mâzî (هو), anlam, mâzî çekimi, muzâri çekimi, Türkçe mâzî, Türkçe muzâri, kitapta verilen [zaman, zamir]]
var FIIL = [
  ["أَكَلَ", "yemek", ["أَكَلْتُ", "أَكَلْنَا", "أَكَلْتَ", "أَكَلْتِ", "أَكَلَ", "أَكَلَتْ"], ["آكُلُ", "نَأْكُلُ", "تَأْكُلُ", "تَأْكُلِينَ", "يَأْكُلُ", "تَأْكُلُ"], ["yedim", "yedik", "yedin", "yedin", "yedi", "yedi"], ["yiyorum", "yiyoruz", "yiyorsun", "yiyorsun", "yiyor", "yiyor"], [0, 0]],
  ["شَرِبَ", "içmek", ["شَرِبْتُ", "شَرِبْنَا", "شَرِبْتَ", "شَرِبْتِ", "شَرِبَ", "شَرِبَتْ"], ["أَشْرَبُ", "نَشْرَبُ", "تَشْرَبُ", "تَشْرَبِينَ", "يَشْرَبُ", "تَشْرَبُ"], ["içtim", "içtik", "içtin", "içtin", "içti", "içti"], ["içiyorum", "içiyoruz", "içiyorsun", "içiyorsun", "içiyor", "içiyor"], [0, 1]],
  ["جَلَسَ", "oturmak", ["جَلَسْتُ", "جَلَسْنَا", "جَلَسْتَ", "جَلَسْتِ", "جَلَسَ", "جَلَسَتْ"], ["أَجْلِسُ", "نَجْلِسُ", "تَجْلِسُ", "تَجْلِسِينَ", "يَجْلِسُ", "تَجْلِسُ"], ["oturdum", "oturduk", "oturdun", "oturdun", "oturdu", "oturdu"], ["oturuyorum", "oturuyoruz", "oturuyorsun", "oturuyorsun", "oturuyor", "oturuyor"], [1, 2]],
  ["قَرَأَ", "okumak", ["قَرَأْتُ", "قَرَأْنَا", "قَرَأْتَ", "قَرَأْتِ", "قَرَأَ", "قَرَأَتْ"], ["أَقْرَأُ", "نَقْرَأُ", "تَقْرَأُ", "تَقْرَئِينَ", "يَقْرَأُ", "تَقْرَأُ"], ["okudum", "okuduk", "okudun", "okudun", "okudu", "okudu"], ["okuyorum", "okuyoruz", "okuyorsun", "okuyorsun", "okuyor", "okuyor"], [0, 3]],
  ["صَلَّى", "namaz kılmak", ["صَلَّيْتُ", "صَلَّيْنَا", "صَلَّيْتَ", "صَلَّيْتِ", "صَلَّى", "صَلَّتْ"], ["أُصَلِّي", "نُصَلِّي", "تُصَلِّي", "تُصَلِّينَ", "يُصَلِّي", "تُصَلِّي"], ["kıldım", "kıldık", "kıldın", "kıldın", "kıldı", "kıldı"], ["kılıyorum", "kılıyoruz", "kılıyorsun", "kılıyorsun", "kılıyor", "kılıyor"], [0, 4]],
  ["سَافَرَ", "yolculuk etmek", ["سَافَرْتُ", "سَافَرْنَا", "سَافَرْتَ", "سَافَرْتِ", "سَافَرَ", "سَافَرَتْ"], ["أُسَافِرُ", "نُسَافِرُ", "تُسَافِرُ", "تُسَافِرِينَ", "يُسَافِرُ", "تُسَافِرُ"], ["yolculuk ettim", "yolculuk ettik", "yolculuk ettin", "yolculuk ettin", "yolculuk etti", "yolculuk etti"], ["yolculuk ediyorum", "yolculuk ediyoruz", "yolculuk ediyorsun", "yolculuk ediyorsun", "yolculuk ediyor", "yolculuk ediyor"], [0, 5]]
];
var EK_M = ["ـْتُ", "ـْنَا", "ـْتَ", "ـْتِ", "ـَ", "ـَتْ"], EK_D = ["أَـ", "نَـ", "تَـ", "تَـ … ـِينَ", "يَـ", "تَـ"];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
// Tablo: kitapta verilen hücrenin zamanında satırı doldur
function TABLO(rows) {
  var out = [];
  rows.forEach(function (r) {
    var F = FIIL[r], t = F[6][0], g = F[6][1], fs = t ? F[3] : F[2], trs = t ? F[5] : F[4], ek = t ? EK_D : EK_M;
    ZAMIR.forEach(function (z, p) {
      if (p === g) return;
      var ok = fs[p], ds = [];
      [g, 0, 1, 2, 3, 4, 5].forEach(function (j) { var f = fs[j]; if (f !== ok && ds.indexOf(f) < 0 && ds.length < 2) ds.push(f); });
      out.push([fs[g] + " (" + ZAMIR[g][0] + ") ← " + z[0] + ": ___", ok, ds[0], ds[1], z[1] + ": " + trs[p], (t ? "Muzâri: " : "Mâzî: ") + ek[p] + " ← " + z[0]]);
    });
  });
  return PL(out);
}

var METIN = "الوَقْتُ مُهِمٌّ فِي حَيَاةِ الإِنْسَانِ، وَلِذَلِكَ أَقْسَمَ اللهُ تَعَالَى فِي القُرْآنِ بِالوَقْتِ، قَالَ تَعَالَى: ﴿وَالعَصْرِ، إِنَّ الإِنْسَانَ لَفِي خُسْرٍ، إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالحَقِّ وَتَوَاصَوْا بِالصَّبْرِ﴾." +
  "<br>المُسْلِمُ الحَقُّ يَقْضِي حَيَاتَهُ فِي الأَعْمَالِ المُفِيدَةِ. يَنَامُ مُبَكِّرًا لِيَسْتَرِيحَ جِسْمُهُ، وَيَسْتَيْقِظُ مَعَ طُلُوعِ الفَجْرِ. يَبْدَأُ يَوْمَهُ بِأَذْكَارِ الاسْتِيقَاظِ ثُمَّ يَتَوَضَّأُ وَيَتَجَهَّزُ لِصَلَاةِ الفَجْرِ، وَعِنْدَمَا يُؤَذِّنُ المُؤَذِّنُ يُرَدِّدُ مَا يَقُولُهُ، وَبَعْدَ نِهَايَةِ الأَذَانِ يَدْعُو بِهَذَا الدُّعَاءِ: «اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ القَائِمَةِ، آتِ مُحَمَّدًا الوَسِيلَةَ وَالفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ». ثُمَّ يَخْرُجُ مِنَ البَيْتِ وَيَذْهَبُ إِلَى المَسْجِدِ، وَعِنْدَمَا يَصِلُ إِلَى المَسْجِدِ، يُصَلِّي رَكْعَتَيْنِ سُنَّةَ الفَجْرِ، ثُمَّ يَنْتَظِرُ إِقَامَةَ صَلَاةِ الفَجْرِ، وَبَعْدَ انْتِهَاءِ الصَّلَاةِ يَخْرُجُ مِنَ المَسْجِدِ." +
  "<br>وَيُمْكِنُ أَنْ يَقُومَ المُسْلِمُ بِبَعْضِ الأَعْمَالِ التَّالِيَةِ خِلَالَ اليَوْمِ: يَقْرَأُ جُزْءًا مِنَ القُرْآنِ الكَرِيمِ. يَزُورُ أَحَدَ الأَقَارِبِ أَوِ الأَصْدِقَاءِ. يَتَوَاصَلُ مَعَ أَصْدِقَائِهِ بِاسْتِخْدَامِ الهَاتِفِ الجَوَّالِ أَوِ البَرِيدِ الإِلِكْتِرُونِيِّ أَوْ وَسِيلَةٍ مِنْ وَسَائِلِ التَّوَاصُلِ الاجْتِمَاعِيِّ، مِثْلَ: تْوِيتَر أَوْ فِيسْبُوك. يَزُورُ مَرِيضًا أَحْيَانًا. يَتَصَدَّقُ بِصَدَقَةٍ عَلَى الفُقَرَاءِ وَالمُحْتَاجِينَ." +
  "<br>وَفِي نِهَايَةِ اليَوْمِ يَرْجِعُ إِلَى بَيْتِهِ لِيَتَنَاوَلَ طَعَامَ العَشَاءِ وَيُصَلِّيَ المَغْرِبَ ثُمَّ صَلَاةَ العِشَاءِ، وَيَنَامُ مُبَكِّرًا لِيَسْتَعِدَّ لِأَعْمَالِ اليَوْمِ التَّالِي.";
var METIN_TR = "Vakit insan hayatında önemlidir; bu yüzden Allah Teâlâ Kur’an’da vakte yemin etmiştir: “Asra andolsun ki insan gerçekten ziyandadır; ancak iman edip salih ameller işleyen, birbirine hakkı ve sabrı tavsiye edenler müstesnadır.”" +
  "<br>Gerçek Müslüman hayatını faydalı işlerle geçirir. Bedeni dinlensin diye erken yatar, fecrin doğuşuyla uyanır. Gününe uyanma zikirleriyle başlar, sonra abdest alır ve sabah namazına hazırlanır. Müezzin ezan okuyunca onun söylediklerini tekrarlar; ezan bitince şu duayı okur: “Allah’ım! Bu eksiksiz davetin ve kılınacak namazın Rabbi! Muhammed’e vesileyi ve fazileti ver, onu vadettiğin makâm-ı mahmûda ulaştır.” Sonra evden çıkıp camiye gider; camiye varınca sabah namazının iki rekât sünnetini kılar, sonra sabah namazının kametini bekler; namaz bitince camiden çıkar." +
  "<br>Müslüman gün içinde şu işlerden bazılarını yapabilir: Kur’an’dan bir cüz okur; akrabalarından ya da arkadaşlarından birini ziyaret eder; cep telefonu, e-posta ya da Twitter, Facebook gibi bir sosyal medya aracıyla arkadaşlarıyla iletişim kurar; bazen bir hastayı ziyaret eder; fakirlere ve muhtaçlara sadaka verir." +
  "<br>Günün sonunda akşam yemeğini yemek, akşam ve ardından yatsı namazını kılmak için evine döner; ertesi günün işlerine hazırlanmak için erken yatar.";
var SOZLUK = [["أَقْسَمَ بِـ", "-e yemin etti"], ["خُسْرٌ", "ziyan"], ["الصَّالِحَاتُ", "salih ameller"], ["تَوَاصَوْا", "birbirine tavsiye ettiler"], ["يَسْتَرِيحُ", "dinlenir"], ["طُلُوعُ الفَجْرِ", "fecrin doğuşu"], ["أَذْكَارُ الاسْتِيقَاظِ", "uyanma zikirleri"], ["يَتَوَضَّأُ", "abdest alır"], ["يُؤَذِّنُ المُؤَذِّنُ", "müezzin ezan okur"], ["يُرَدِّدُ", "tekrarlar"], ["إِقَامَةُ الصَّلَاةِ", "kamet"], ["جُزْءٌ", "cüz"], ["الأَقَارِبُ", "akrabalar"], ["يَتَوَاصَلُ", "iletişim kurar"], ["وَسَائِلُ التَّوَاصُلِ الاجْتِمَاعِيِّ", "sosyal medya"], ["يَتَصَدَّقُ", "sadaka verir"], ["المُحْتَاجُونَ", "muhtaçlar"], ["يَسْتَعِدُّ", "hazırlanır"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendi gününü düşünmek: ne zaman uyanırsın, yatarsın, okula gidersin", "Müslümanın bir gününü anlatan metni durmadan okumak ve dinlemek", "Günlük hayat ve ibadet kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "يَنَامُ:nasb / مُبَكِّرًا:mz / لِيَسْتَرِيحَ جِسْمُهُ،:- / وَيَسْتَيْقِظُ:nasb / مَعَ طُلُوعِ الفَجْرِ.:mz", tr: "Bedeni dinlensin diye erken yatar, fecrin doğuşuyla uyanır." },
    { s: "يَخْرُجُ مِنَ البَيْتِ:- / وَيَذْهَبُ:nasb / إِلَى المَسْجِدِ.:cerr", tr: "Evden çıkar ve camiye gider." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> Vaktin değeri (Asr sûresi) ve gerçek Müslümanın bir günü: erken yatıp fecirde uyanmak, abdest, ezan ve ezan duası, camide sabah namazı, gün içindeki faydalı işler, akşam eve dönüş." },
    { tr: "<b>Zaman bağlaçları:</b> <span class=\"ar\">ثُمَّ</span> sonra · <span class=\"ar\">عِنْدَمَا</span> …-dığında · <span class=\"ar\">بَعْدَ</span> …-den sonra · <span class=\"ar\">خِلَالَ اليَوْمِ</span> gün boyunca · <span class=\"ar\">فِي نِهَايَةِ اليَوْمِ</span> günün sonunda." },
    { tr: "<b>Amaç bildiren لِـ:</b> <span class=\"ar\">لِيَسْتَرِيحَ</span> dinlensin diye · <span class=\"ar\">لِيَتَنَاوَلَ</span> yemek için · <span class=\"ar\">لِيَسْتَعِدَّ</span> hazırlanmak için. لِـ’den sonra muzâri <b>mansûb</b> olur (sonu üstün)." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَتَى تَسْتَيْقِظُ / تَسْتَيْقِظِينَ صَبَاحًا؟ وَمَتَى تَنَامُ / تَنَامِينَ؟ مَتَى تَذْهَبُ / تَذْهَبِينَ إِلَى العَمَلِ أَوِ الجَامِعَةِ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "اليَوْمُ فِي حَيَاةِ المُسْلِمِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَتَى تَسْتَيْقِظُ / تَسْتَيْقِظِينَ صَبَاحًا؟", a: "أَسْتَيْقِظُ قَبْلَ صَلَاةِ الفَجْرِ.", tr: "Sabah ne zaman uyanırsın? (Örnek cevap) Sabah namazından önce uyanırım." },
        { q: "وَمَتَى تَنَامُ / تَنَامِينَ؟", a: "أَنَامُ السَّاعَةَ العَاشِرَةَ مَسَاءً.", tr: "Ne zaman yatarsın? Akşam saat onda yatarım." },
        { q: "مَتَى تَذْهَبُ / تَذْهَبِينَ إِلَى العَمَلِ أَوِ الجَامِعَةِ؟", a: "أَذْهَبُ إِلَى الجَامِعَةِ السَّاعَةَ الثَّامِنَةَ.", tr: "İşe ya da üniversiteye ne zaman gidersin? Saat sekizde üniversiteye giderim." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "أَقْسَمَ اللهُ تَعَالَى بِالوَقْتِ فِي القُرْآنِ.", a: "d", why: "وَالعَصْرِ: Asr’a yemin." },
        { s: "يَنَامُ المُسْلِمُ مُتَأَخِّرًا.", a: "y", why: "Erken yatar: يَنَامُ مُبَكِّرًا." },
        { s: "يَسْتَيْقِظُ المُسْلِمُ مَعَ طُلُوعِ الفَجْرِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَبْدَأُ المُسْلِمُ يَوْمَهُ بِأَذْكَارِ الاسْتِيقَاظِ.", a: "d", why: "يَبْدَأُ يَوْمَهُ بِأَذْكَارِ الاسْتِيقَاظِ." },
        { s: "يَسْكُتُ المُسْلِمُ عِنْدَمَا يُؤَذِّنُ المُؤَذِّنُ.", a: "y", why: "Müezzinin söylediğini tekrarlar: يُرَدِّدُ مَا يَقُولُهُ." },
        { s: "يُصَلِّي المُسْلِمُ سُنَّةَ الفَجْرِ فِي البَيْتِ.", a: "y", why: "Metne göre camiye varınca kılar." },
        { s: "سُنَّةُ الفَجْرِ رَكْعَتَانِ.", a: "d", why: "يُصَلِّي رَكْعَتَيْنِ سُنَّةَ الفَجْرِ." },
        { s: "يَقْرَأُ المُسْلِمُ جُزْءًا مِنَ القُرْآنِ خِلَالَ اليَوْمِ.", a: "d", why: "Gün içindeki işlerden biri." },
        { s: "يَتَوَاصَلُ المُسْلِمُ مَعَ أَصْدِقَائِهِ بِالرَّسَائِلِ الوَرَقِيَّةِ فَقَطْ.", a: "y", why: "Telefon, e-posta, sosyal medya ile." },
        { s: "يَتَصَدَّقُ المُسْلِمُ عَلَى الفُقَرَاءِ وَالمُحْتَاجِينَ.", a: "d", why: "يَتَصَدَّقُ بِصَدَقَةٍ عَلَى الفُقَرَاءِ." },
        { s: "فِي نِهَايَةِ اليَوْمِ يَذْهَبُ المُسْلِمُ إِلَى السُّوقِ.", a: "y", why: "Evine döner: يَرْجِعُ إِلَى بَيْتِهِ." },
        { s: "يَنَامُ المُسْلِمُ مُبَكِّرًا لِيَسْتَعِدَّ لِأَعْمَالِ اليَوْمِ التَّالِي.", a: "d", why: "Metnin son cümlesi." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("أَقْسَمَ اللهُ تَعَالَى بِالوَقْتِ", "أَقْسَمَ"), "yemin etti", "yarattı", "bölüştürdü", "Allah vakte yemin etti.", "= حَلَفَ"],
      [HL("إِنَّ الإِنْسَانَ لَفِي خُسْرٍ", "خُسْرٍ"), "ziyan", "kazanç", "sevinç", "İnsan ziyandadır.", "Zıddı: رِبْحٌ."],
      [HL("لِيَسْتَرِيحَ جِسْمُهُ", "لِيَسْتَرِيحَ"), "dinlensin diye", "çalışsın diye", "uyansın diye", "Bedeni dinlensin diye.", "رَاحَةٌ: dinlenme."],
      [HL("مَعَ طُلُوعِ الفَجْرِ", "طُلُوعِ"), "doğuş", "batış", "son", "Fecrin doğuşuyla.", "Zıddı: غُرُوبٌ."],
      [HL("ثُمَّ يَتَوَضَّأُ", "يَتَوَضَّأُ"), "abdest alır", "yıkanır", "giyinir", "Sonra abdest alır.", "وُضُوءٌ: abdest."],
      [HL("يُرَدِّدُ مَا يَقُولُهُ", "يُرَدِّدُ"), "tekrarlar", "dinler", "yazar", "Söylediğini tekrarlar.", "= يُكَرِّرُ"],
      [HL("يَنْتَظِرُ إِقَامَةَ صَلَاةِ الفَجْرِ", "يَنْتَظِرُ"), "bekler", "kılar", "okur", "Kameti bekler.", ""],
      [HL("يَزُورُ أَحَدَ الأَقَارِبِ", "الأَقَارِبِ"), "akrabalar", "komşular", "hocalar", "Akrabalardan birini ziyaret eder.", "Tekili: قَرِيبٌ."],
      [HL("يَتَوَاصَلُ مَعَ أَصْدِقَائِهِ", "يَتَوَاصَلُ"), "iletişim kurar", "kavga eder", "ayrılır", "Arkadaşlarıyla iletişim kurar.", ""],
      [HL("يَزُورُ مَرِيضًا أَحْيَانًا", "مَرِيضًا"), "hasta", "misafir", "fakir", "Bazen bir hastayı ziyaret eder.", ""],
      [HL("يَتَصَدَّقُ بِصَدَقَةٍ", "يَتَصَدَّقُ"), "sadaka verir", "borç alır", "satın alır", "Sadaka verir.", "صَدَقَةٌ: sadaka."],
      [HL("لِيَسْتَعِدَّ لِأَعْمَالِ اليَوْمِ التَّالِي", "لِيَسْتَعِدَّ"), "hazırlanmak için", "dinlenmek için", "yemek için", "Ertesi günün işlerine hazırlanmak için.", "اسْتِعْدَادٌ: hazırlık."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama ve Günlük Düzen", short: "Anlama", col: "nasb", legend: ["mi", "mz"],
  goals: ["Metinle ilgili soruları cevaplamak", "Müslümanın gün içindeki faaliyetlerini saymak", "Fiili uygun tümleciyle eşleştirmek", "Günlük alışkanlıkları sıraya koymak"],
  examples: [
    { s: "أَسْتَيْقِظُ:mi / صَبَاحًا،:mz / وَأَتَنَاوَلُ:mi / الفُطُورَ.:nasb", tr: "Sabah uyanırım ve kahvaltı yaparım.", pair: "أَذْهَبُ:mi / إِلَى الجَامِعَةِ.:cerr", pairTr: "Üniversiteye giderim." }
  ],
  rules: [
    { tr: "<b>Günün sırası (metne göre):</b> erken yatmak → fecirde uyanmak → uyanma zikirleri → abdest → ezanı tekrarlamak ve ezan duası → camiye gitmek → iki rekât sünnet → kameti beklemek → farz → gün içindeki işler → eve dönüş, akşam yemeği → akşam ve yatsı namazı → erken yatmak." },
    { tr: "<b>Gün içinde yapılabilecek beş iş:</b> Kur’an’dan bir cüz okumak · akraba ya da arkadaş ziyareti · telefon, e-posta, sosyal medya ile iletişim · hasta ziyareti · sadaka vermek." },
    { tr: "<b>Sıralama:</b> 3. etkinlikte bazı adımların yeri değişebilir (dişleri fırçalamak ile giyinmek; öğle yemeği ile ikindi namazı). Sayfa bu adımlarda iki sırayı da doğru kabul eder." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: كَيْفَ يَقْضِي المُسْلِمُ حَيَاتَهُ؟ مَتَى يَسْتَيْقِظُ المُسْلِمُ؟ مَا الدُّعَاءُ الَّذِي يَقُولُهُ المُسْلِمُ بَعْدَ الانْتِهَاءِ مِنَ الأَذَانِ؟ مَاذَا يُصَلِّي قَبْلَ إِقَامَةِ الصَّلَاةِ؟ اذْكُرْ خَمْسَةً مِنَ الأَنْشِطَةِ الَّتِي يُمَارِسُهَا المُسْلِمُ فِي يَوْمِهِ.", "٢ ـ صِلْ بَيْنَ الفِعْلِ وَمَا يُنَاسِبُهُ فِيمَا يَأْتِي. ٣ ـ رَتِّبِ العَادَاتِ اليَوْمِيَّةَ الآتِيَةَ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["كَيْفَ يَقْضِي المُسْلِمُ حَيَاتَهُ؟", "يَقْضِي حَيَاتَهُ فِي الأَعْمَالِ المُفِيدَةِ.", "يَقْضِي حَيَاتَهُ فِي النَّوْمِ.", "يَقْضِي حَيَاتَهُ فِي اللَّعِبِ.", "Müslüman hayatını nasıl geçirir? Faydalı işlerle.", ""],
      ["مَتَى يَسْتَيْقِظُ المُسْلِمُ؟", "مَعَ طُلُوعِ الفَجْرِ.", "بَعْدَ طُلُوعِ الشَّمْسِ.", "فِي الظُّهْرِ.", "Ne zaman uyanır? Fecrin doğuşuyla.", ""],
      ["مَا الدُّعَاءُ الَّذِي يَقُولُهُ المُسْلِمُ بَعْدَ الانْتِهَاءِ مِنَ الأَذَانِ؟", "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ القَائِمَةِ…", "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ.", "الحَمْدُ لِلَّهِ رَبِّ العَالَمِينَ.", "Ezandan sonra hangi duayı okur? Ezan duasını.", "…آتِ مُحَمَّدًا الوَسِيلَةَ وَالفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ."],
      ["مَاذَا يُصَلِّي قَبْلَ إِقَامَةِ الصَّلَاةِ؟", "رَكْعَتَيْنِ سُنَّةَ الفَجْرِ.", "أَرْبَعَ رَكَعَاتٍ.", "صَلَاةَ العِشَاءِ.", "Kametten önce ne kılar? Sabahın iki rekât sünnetini.", ""],
      ["مَاذَا يَفْعَلُ المُسْلِمُ فِي نِهَايَةِ اليَوْمِ؟", "يَرْجِعُ إِلَى بَيْتِهِ وَيَتَنَاوَلُ العَشَاءَ وَيُصَلِّي المَغْرِبَ وَالعِشَاءَ.", "يَذْهَبُ إِلَى الجَامِعَةِ.", "يُسَافِرُ إِلَى بَلَدٍ بَعِيدٍ.", "Günün sonunda ne yapar? Eve döner, yemek yer, akşam ve yatsıyı kılar.", "Kitaptan değil; metinden."]
    ])},
    { type: "classify", num: "١ (٥)", opts: NS, ar: "اذْكُرْ خَمْسَةً مِنَ الأَنْشِطَةِ الَّتِي يُمَارِسُهَا المُسْلِمُ فِي يَوْمِهِ", tr: "Bu faaliyet metinde Müslümanın gün içindeki işleri arasında geçiyor mu?", items: CL([
      ["يَقْرَأُ جُزْءًا مِنَ القُرْآنِ الكَرِيمِ.", "e", "Metinde: 1. iş."], ["يَزُورُ أَحَدَ الأَقَارِبِ أَوِ الأَصْدِقَاءِ.", "e", "2. iş."], ["يَتَوَاصَلُ مَعَ أَصْدِقَائِهِ بِالهَاتِفِ أَوِ البَرِيدِ الإِلِكْتِرُونِيِّ.", "e", "3. iş."], ["يَزُورُ مَرِيضًا أَحْيَانًا.", "e", "4. iş."], ["يَتَصَدَّقُ عَلَى الفُقَرَاءِ وَالمُحْتَاجِينَ.", "e", "5. iş."],
      ["يَلْعَبُ كُرَةَ القَدَمِ.", "h", "Metinde yok."], ["يُسَافِرُ إِلَى بَلَدٍ آخَرَ.", "h", "Metinde yok."], ["يَنَامُ بَعْدَ صَلَاةِ الفَجْرِ.", "h", "Metinde yok; erken yatar, fecirde uyanır."]
    ]) },
    { type: "bank", num: "٢", reuse: true, ar: "صِلْ بَيْنَ الفِعْلِ وَمَا يُنَاسِبُهُ فِيمَا يَأْتِي", tr: "Önce aşağıdan uygun tümleci seç, sonra fiilin kutusuna dokun.", bank: ["مُبَكِّرًا", "إِلَى الجَامِعَةِ", "صَبَاحًا", "الفُطُورَ", "فِي المَسْجِدِ", "دُرُوسِي"], items: [
      { pre: "أَتَنَاوَلُ", a: [3], tr: "Kahvaltı yaparım." }, { pre: "أَسْتَيْقِظُ", a: [2, 0], tr: "Sabah (erken) uyanırım." }, { pre: "أَنَامُ", a: [0], tr: "Erken yatarım." }, { pre: "أَذْهَبُ", a: [1], tr: "Üniversiteye giderim." }, { pre: "أَدْرُسُ", a: [5], tr: "Derslerime çalışırım." }, { pre: "أُصَلِّي", a: [4], tr: "Camide namaz kılarım." }
    ]},
    { type: "bank", num: "٣", ar: "رَتِّبِ العَادَاتِ اليَوْمِيَّةَ الآتِيَةَ", tr: "Önce aşağıdan alışkanlığı seç, sonra sıradaki kutuya dokun (1 = günün ilk işi).", bank: ["أَتَنَاوَلُ عَشَائِي.", "أَرْجِعُ إِلَى غُرْفَتِي وَأُحَضِّرُ طَعَامَ الفُطُورِ.", "أَرْجِعُ إِلَى السَّكَنِ وَأَكْتُبُ وَاجِبَاتِي.", "أُنَظِّفُ أَسْنَانِي.", "أَذْهَبُ إِلَى الجَامِعَةِ.", "أُصَلِّي صَلَاةَ العَصْرِ.", "أَتَنَاوَلُ طَعَامَ الغَدَاءِ فِي الجَامِعَةِ.", "أَلْبَسُ مَلَابِسِي.", "أَتَوَضَّأُ وَأُصَلِّي صَلَاةَ الفَجْرِ فِي المَسْجِدِ.", "أَسْتَيْقِظُ صَبَاحًا."], items: [
      { pre: "١", a: [9], tr: "Sabah uyanırım." }, { pre: "٢", a: [8], tr: "Abdest alır, sabah namazını camide kılarım." }, { pre: "٣", a: [1], tr: "Odama döner, kahvaltı hazırlarım." }, { pre: "٤", a: [3, 7], tr: "Dişlerimi fırçalarım / giyinirim." }, { pre: "٥", a: [3, 7], tr: "Giyinirim / dişlerimi fırçalarım." },
      { pre: "٦", a: [4], tr: "Üniversiteye giderim." }, { pre: "٧", a: [6, 5], tr: "Üniversitede öğle yemeği yerim / ikindiyi kılarım." }, { pre: "٨", a: [5, 6], tr: "İkindi namazını kılarım / öğle yemeği yerim." }, { pre: "٩", a: [2], tr: "Yurda döner, ödevlerimi yazarım." }, { pre: "١٠", a: [0], tr: "Akşam yemeğimi yerim." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ", tr: "Kelimeler: Eş, Zıt Anlam ve Vakitler", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Kelimeleri eş anlamlılarıyla eşleştirmek", "Kelimeleri zıt anlamlılarıyla eşleştirmek", "Günlük işleri vakitlerine göre ayırmak: صَبَاحًا، ظُهْرًا، مَسَاءً", "Metindeki kelimelerin çoğullarını tanımak"],
  examples: [
    { s: "يَقْضِي:mz.Kelime / = يُمْضِي:nasb.Eş", tr: "geçirir = geçirir", pair: "أَقْسَمَ:mz.Kelime / = حَلَفَ:nasb.Eş", pairTr: "yemin etti = yemin etti" },
    { s: "الصَّالِحَةُ:mz.Kelime / ≠ الطَّالِحَةُ:cerr.Zıt", tr: "iyi ≠ kötü", pair: "فَقِيرٌ:mz.Kelime / ≠ غَنِيٌّ:cerr.Zıt", pairTr: "fakir ≠ zengin" }
  ],
  rules: [
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">يَقْضِي = يُمْضِي · الوَقْتُ = الزَّمَنُ · أُرَدِّدُ = أُكَرِّرُ · أَرْجِعُ = أَعُودُ · جَهَّزَ = حَضَّرَ · أَقْسَمَ = حَلَفَ</span>" },
    { tr: "<b>Zıt anlam:</b> <span class=\"ar\">مُبَكِّرٌ ≠ مُتَأَخِّرٌ · الصَّالِحَةُ ≠ الطَّالِحَةُ · اسْتَيْقَظَ ≠ نَامَ · نِهَايَةٌ ≠ بِدَايَةٌ · فَقِيرٌ ≠ غَنِيٌّ</span>" },
    { tr: "<b>Vakitler:</b> <span class=\"ar\">صَبَاحًا</span> sabahleyin · <span class=\"ar\">ظُهْرًا</span> öğleyin · <span class=\"ar\">مَسَاءً</span> akşamleyin. Beş vakit: <span class=\"ar\">الفَجْرُ، الظُّهْرُ، العَصْرُ، المَغْرِبُ، العِشَاءُ</span>." }
  ],
  kaide: ["٤ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي. ٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي.", "٦ ـ صَنِّفِ الأَفْعَالَ كَمَا تَفْعَلُهَا أَنْتَ حَسَبَ الأَوْقَاتِ الآتِيَةِ: صَبَاحًا، ظُهْرًا، مَسَاءً."],
  ex: [
    { type: "bank", num: "٤", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["أُكَرِّرُ", "أَعُودُ", "يُمْضِي", "حَضَّرَ", "حَلَفَ", "الزَّمَنُ"], items: [
      { pre: "يَقْضِي =", a: [2], tr: "geçirir = geçirir" }, { pre: "الوَقْتُ =", a: [5], tr: "vakit = zaman" }, { pre: "أُرَدِّدُ =", a: [0], tr: "tekrarlarım = tekrarlarım" }, { pre: "أَرْجِعُ =", a: [1], tr: "dönerim = dönerim" }, { pre: "جَهَّزَ =", a: [3], tr: "hazırladı = hazırladı" }, { pre: "أَقْسَمَ =", a: [4], tr: "yemin etti = yemin etti" }
    ]},
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["غَنِيٌّ", "بِدَايَةٌ", "مُتَأَخِّرٌ", "نَامَ", "الطَّالِحَةُ"], items: [
      { pre: "مُبَكِّرٌ ≠", a: [2], tr: "erken ≠ geç" }, { pre: "الصَّالِحَةُ ≠", a: [4], tr: "iyi, salih ≠ kötü" }, { pre: "اسْتَيْقَظَ ≠", a: [3], tr: "uyandı ≠ uyudu" }, { pre: "نِهَايَةٌ ≠", a: [1], tr: "son ≠ başlangıç" }, { pre: "فَقِيرٌ ≠", a: [0], tr: "fakir ≠ zengin" }
    ]},
    { type: "classify", num: "٦", opts: VAKIT, ar: "صَنِّفِ الأَفْعَالَ كَمَا تَفْعَلُهَا أَنْتَ حَسَبَ الأَوْقَاتِ", tr: "Bu işi genellikle ne zaman yaparsın? (Kitap kendi gününe göre doldurmanı istiyor; burada genel cevaplar var, sonra defterine kendi tabloyu yaz.)", items: CL([
      ["أَسْتَيْقِظُ", "s", "Sabah."], ["أُصَلِّي الفَجْرَ", "s", "Sabah."], ["أَتَنَاوَلُ الفُطُورَ", "s", "Sabah."], ["أَذْهَبُ إِلَى الجَامِعَةِ", "s", "Genellikle sabah."], ["أَلْبَسُ مَلَابِسِي", "s", "Sabah."],
      ["أَتَنَاوَلُ الغَدَاءَ", "z", "Öğle."], ["أُصَلِّي الظُّهْرَ", "z", "Öğle."],
      ["أَتَنَاوَلُ العَشَاءَ", "m", "Akşam."], ["أُصَلِّي المَغْرِبَ وَالعِشَاءَ", "m", "Akşam."], ["أَكْتُبُ وَاجِبَاتِي", "m", "Genellikle akşam."], ["أَنَامُ", "m", "Akşam (erken)."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ مِنَ النَّصِّ", tr: "Metindeki kelimenin çoğulunu seç.", items: PL([
      ["عَمَلٌ ← ___", "أَعْمَالٌ", "عُمُولٌ", "عَمَلَاتٌ", "iş → işler", "الأَعْمَالُ المُفِيدَةُ."],
      ["ذِكْرٌ ← ___", "أَذْكَارٌ", "ذُكُورٌ", "ذِكْرَيَاتٌ", "zikir → zikirler", "ذُكُورٌ: erkekler."],
      ["صَدِيقٌ ← ___", "أَصْدِقَاءُ", "صُدُوقٌ", "صَدَائِقُ", "arkadaş → arkadaşlar", "أَفْعِلَاءُ kalıbı."],
      ["قَرِيبٌ ← ___", "أَقَارِبُ", "قُرُوبٌ", "قِرَابٌ", "akraba → akrabalar", "أَفَاعِلُ kalıbı (الأَقَارِبُ)."],
      ["فَقِيرٌ ← ___", "فُقَرَاءُ", "فُقُورٌ", "أَفْقِرَةٌ", "fakir → fakirler", "فُعَلَاءُ kalıbı."],
      ["وَسِيلَةٌ ← ___", "وَسَائِلُ", "وَسِيلَاتٌ", "أَوْسَالٌ", "araç → araçlar", "فَعَائِلُ kalıbı."],
      ["رَكْعَةٌ ← ___", "رَكَعَاتٌ", "رُكُوعٌ", "رِكَاعٌ", "rekât → rekâtlar", ""],
      ["جُزْءٌ ← ___", "أَجْزَاءٌ", "جُزُوءٌ", "جَزَائِئُ", "cüz → cüzler", "أَفْعَالٌ kalıbı."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · FİİL VE CÜMLE
{
  id: "u4", no: 4, ar: "الأَفْعَالُ اليَوْمِيَّةُ وَتَرْتِيبُ الجُمَلِ", tr: "Günlük Fiiller ve Cümle Kurma", short: "Fiiller", col: "ref", legend: ["mi", "nasb", "mz"],
  goals: ["Resme (işe) uygun fiili seçmek ve özneye uydurmak", "Karışık kelimelerden anlamlı cümle kurmak", "Soru cümlesi kurmak: هَلْ، مَتَى", "Amaç bildiren لِـ ile mansûb fiili tanımak"],
  examples: [
    { s: "يَسْتَيْقِظُ:mi / هِشَامٌ:ref.Özne / عَادَةً السَّابِعَةَ صَبَاحًا.:mz", tr: "Hişâm genellikle sabah yedide uyanır.", pair: "تَذْهَبُ:mi / مَرْيَمُ:ref.Özne / إِلَى الجَامِعَةِ.:-", pairTr: "Meryem üniversiteye gider." }
  ],
  rules: [
    { tr: "<b>Fiil özneye uyar:</b> eril özne <span class=\"ar\">يَـ</span> (<span class=\"ar\">يَسْتَيْقِظُ هِشَامٌ</span>), dişil özne <span class=\"ar\">تَـ</span> (<span class=\"ar\">تَذْهَبُ مَرْيَمُ · تَتَنَاوَلُ العَائِلَةُ</span>), ben <span class=\"ar\">أَـ</span> (<span class=\"ar\">أَنَا أَطْبُخُ</span>). Fiil başta olunca özne çoğul da olsa fiil tekil kalır: <span class=\"ar\">يُنَظِّفُ الطُّلَّابُ</span>." },
    { tr: "<b>Günlük fiiller:</b> <span class=\"ar\">يَسْتَيْقِظُ</span> uyanır · <span class=\"ar\">يَغْسِلُ</span> yıkar · <span class=\"ar\">يَذْهَبُ</span> gider · <span class=\"ar\">يُمَارِسُ الرِّيَاضَةَ</span> spor yapar · <span class=\"ar\">يَسْتَحِمُّ</span> duş alır · <span class=\"ar\">يَطْبُخُ</span> pişirir · <span class=\"ar\">يَتَنَاوَلُ</span> yer · <span class=\"ar\">يُصَلِّي</span> namaz kılar · <span class=\"ar\">يُنَظِّفُ</span> temizler." },
    { tr: "<b>Soru:</b> <span class=\"ar\">هَلْ</span> evet–hayır sorusu (<span class=\"ar\">هَلْ تَسْكُنُ…؟</span>) · <span class=\"ar\">مَتَى</span> ne zaman (<span class=\"ar\">مَتَى يَنَامُ الطِّفْلُ؟</span>). Soru kelimesi cümlenin başına gelir." }
  ],
  kaide: ["٧ ـ اكْتُبِ الفِعْلَ المُنَاسِبَ لِلصُّورَةِ فِي كُلِّ فَرَاغٍ مِنَ الآتِي.", "٨ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً."],
  ex: [
    { type: "pick", fill: true, num: "٧", ar: "اكْتُبِ الفِعْلَ المُنَاسِبَ لِلصُّورَةِ فِي كُلِّ فَرَاغٍ", tr: "Resimdeki işe ve özneye uygun fiili seç.", items: PL([
      ["🙆‍♂️ ___ هِشَامٌ عَادَةً السَّابِعَةَ صَبَاحًا.", "يَسْتَيْقِظُ", "تَسْتَيْقِظُ", "يَنَامُ", "Hişâm genellikle sabah yedide uyanır.", "Resim: gerinen adam. Eril özne ← يَـ"],
      ["🧺 ___ مَلَابِسَهُ فِي العُطْلَةِ.", "يَغْسِلُ", "تَغْسِلُ", "يَلْبَسُ", "Tatilde elbiselerini yıkar.", "Resim: çamaşır yıkayan adam (مَلَابِسَهُ: kendi elbiseleri)."],
      ["🎓 ___ مَرْيَمُ إِلَى الجَامِعَةِ كُلَّ يَوْمٍ.", "تَذْهَبُ", "يَذْهَبُ", "تَرْجِعُ", "Meryem her gün üniversiteye gider.", "Dişil özne ← تَـ"],
      ["🏋️ ___ عَبْدُ اللهِ الرِّيَاضَةَ ظُهْرًا.", "يُمَارِسُ", "يَطْبُخُ", "تُمَارِسُ", "Abdullah öğleyin spor yapar.", "مَارَسَ الرِّيَاضَةَ: spor yaptı."],
      ["🚿 …ثُمَّ ___ .", "يَسْتَحِمُّ", "يَسْتَيْقِظُ", "تَسْتَحِمُّ", "…sonra duş alır.", "Resim: duş."],
      ["🍳 أَنَا ___ الطَّعَامَ ظُهْرًا.", "أَطْبُخُ", "يَطْبُخُ", "تَطْبُخُ", "Ben öğleyin yemek pişiririm.", "أَنَا ← أَـ"],
      ["🍽️ ___ العَائِلَةُ الغَدَاءَ مَعًا كُلَّ يَوْمٍ.", "تَتَنَاوَلُ", "يَتَنَاوَلُ", "تَطْبُخُ", "Aile her gün birlikte öğle yemeği yer.", "العَائِلَةُ dişil ← تَـ"],
      ["🕌 ___ أَبِي فِي المَسْجِدِ دَائِمًا.", "يُصَلِّي", "تُصَلِّي", "يَنَامُ", "Babam her zaman camide namaz kılar.", ""]
    ])},
    { type: "bank", num: "٨", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا مُفِيدَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["الطُّلَّابُ", "غُرَفَهُمْ", "فِي", "العُطْلَةِ", "رَبَّةُ", "المَنْزِلِ", "مُبَكِّرًا", "مَعَ", "العَائِلَةِ", "إِلَى", "السُّوقِ", "تَسْكُنُ", "مَكَانٍ", "قَرِيبٍ", "مِنَ", "الجَامِعَةِ", "يَنَامُ", "الطِّفْلُ", "مَسَاءً"],
      tr2: "1) Öğrenciler tatilde odalarını temizler. 2) Ev hanımı erken uyanır. 3) Aileyle çarşıya gideriz. 4) Üniversiteye yakın bir yerde mi oturuyorsun? 5) Çocuk akşam ne zaman uyur?",
      parts: ["١ ـ يُنَظِّفُ", { a: [0] }, { a: [1] }, { a: [2] }, { a: [3] }, ".<br>٢ ـ تَسْتَيْقِظُ", { a: [4] }, { a: [5] }, { a: [6] }, ".<br>٣ ـ نَذْهَبُ", { a: [7] }, { a: [8] }, { a: [9] }, { a: [10] }, ".<br>٤ ـ هَلْ", { a: [11] }, { a: [2] }, { a: [12] }, { a: [13] }, { a: [14] }, { a: [15] }, "؟<br>٥ ـ مَتَى", { a: [16] }, { a: [17] }, { a: [18] }, "؟"] },
    { type: "pick", fill: true, extra: true, ar: "لِـ + الفِعْلِ المُضَارِعِ (لِلتَّعْلِيلِ)", tr: "Amaç bildiren لِـ’den sonra fiilin doğru biçimini seç.", items: PL([
      ["يَنَامُ مُبَكِّرًا لِـ___ جِسْمُهُ.", "يَسْتَرِيحَ", "يَسْتَرِيحُ", "اسْتَرَاحَ", "Bedeni dinlensin diye erken yatar.", "لِـ + mansûb: sonu üstün."],
      ["يَرْجِعُ إِلَى بَيْتِهِ لِـ___ طَعَامَ العَشَاءِ.", "يَتَنَاوَلَ", "يَتَنَاوَلُ", "تَنَاوَلَ", "Akşam yemeği yemek için evine döner.", ""],
      ["يَنَامُ مُبَكِّرًا لِـ___ لِأَعْمَالِ اليَوْمِ التَّالِي.", "يَسْتَعِدَّ", "يَسْتَعِدُّ", "اسْتَعَدَّ", "Ertesi günün işlerine hazırlanmak için.", "Şeddeli fiilde de sonu üstün: يَسْتَعِدَّ."],
      ["أَذْهَبُ إِلَى المَسْجِدِ لِـ___ الفَجْرَ.", "أُصَلِّيَ", "أُصَلِّي", "صَلَّيْتُ", "Sabah namazını kılmak için camiye giderim.", "Yâ ile biten fiilde de üstün görünür: أُصَلِّيَ."],
      ["تَذْهَبُ مَرْيَمُ إِلَى الجَامِعَةِ لِـ___ .", "تَدْرُسَ", "تَدْرُسُ", "دَرَسَتْ", "Meryem okumak için üniversiteye gider.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · ÇEKİM
{
  id: "u5", no: 5, ar: "تَدْرِيبٌ عَامٌّ: الفِعْلُ المَاضِي وَالمُضَارِعُ", tr: "Genel Alıştırma: Mâzî ve Muzâri Çekim", short: "Çekim", col: "muz", legend: ["ref", "mi"],
  goals: ["Mâzî fiili altı zamirle çekmek: ـْتُ، ـْنَا، ـْتَ، ـْتِ، ـَ، ـَتْ", "Muzâri fiili altı zamirle çekmek: أَـ، نَـ، تَـ، تَـ…ـِينَ، يَـ، تَـ", "Verilen biçimden fiilin zamanını ve öznesini bulmak", "Kitaptaki çekim tablosunu doldurmak"],
  examples: [
    { s: "أَنَا:ref / أَكَلْتُ:mi.Mâzî", tr: "Ben yedim.", pair: "أَنَا:ref / آكُلُ:mi.Muzâri", pairTr: "Ben yiyorum." },
    { s: "هِيَ:ref / سَافَرَتْ:mi.Mâzî", tr: "O (k.) yolculuk etti.", pair: "هِيَ:ref / تُسَافِرُ:mi.Muzâri", pairTr: "O (k.) yolculuk ediyor." }
  ],
  rules: [
    { tr: "<b>Mâzî ekleri</b> (fiilin sonuna): <span class=\"ar\">أَنَا ← أَكَلْتُ · نَحْنُ ← أَكَلْنَا · أَنْتَ ← أَكَلْتَ · أَنْتِ ← أَكَلْتِ · هُوَ ← أَكَلَ · هِيَ ← أَكَلَتْ</span>." },
    { tr: "<b>Muzâri ekleri</b> (fiilin başına): <span class=\"ar\">أَنَا ← آكُلُ · نَحْنُ ← نَأْكُلُ · أَنْتَ ← تَأْكُلُ · أَنْتِ ← تَأْكُلِينَ · هُوَ ← يَأْكُلُ · هِيَ ← تَأْكُلُ</span>." },
    { tr: "<b>Dikkat:</b> <span class=\"ar\">صَلَّى</span> illetli fiildir: <span class=\"ar\">صَلَّيْتُ، صَلَّيْنَا، صَلَّتْ</span>; muzârisi <span class=\"ar\">أُصَلِّي، تُصَلِّينَ</span>. <span class=\"ar\">سَافَرَ</span> dört harfli olduğu için muzâri ön eki ötrelidir: <span class=\"ar\">أُسَافِرُ</span>. <span class=\"ar\">أَكَلَ</span>’de <span class=\"ar\">أَ + أْكُلُ ← آكُلُ</span>." },
    { tr: "<b>Kitaptaki tablo:</b> her satırda bir hücre verilmiş; satırı o hücrenin zamanında doldur. Satırlar mâzî (<span class=\"ar\">أَكَلْتُ، شَرِبْنَا، قَرَأْتِ، صَلَّى، سَافَرَتْ</span>), yalnız <span class=\"ar\">تَجْلِسُ</span> satırı muzâridir." }
  ],
  kaide: ["تَدْرِيبٌ عَامٌّ: امْلَإِ الجَدْوَلَ الآتِيَ: أَنَا، نَحْنُ، أَنْتَ، أَنْتِ، هُوَ، هِيَ ← أَكَلْتُ، شَرِبْنَا، تَجْلِسُ، قَرَأْتِ، صَلَّى، سَافَرَتْ."],
  ex: [
    { type: "pick", fill: true, num: "تَدْرِيبٌ (أ)", ar: "امْلَإِ الجَدْوَلَ: أَكَلْتُ، شَرِبْنَا، تَجْلِسُ", tr: "Tablonun ilk üç satırı: verilen biçimin zamanında, zamire uygun biçimi seç.", items: TABLO([0, 1, 2]) },
    { type: "pick", fill: true, num: "تَدْرِيبٌ (ب)", ar: "امْلَإِ الجَدْوَلَ: قَرَأْتِ، صَلَّى، سَافَرَتْ", tr: "Tablonun son üç satırı.", items: TABLO([3, 4, 5]) },
    { type: "classify", extra: true, opts: ZM, ar: "مَاضٍ أَمْ مُضَارِعٌ؟", tr: "Fiil mâzî mi, muzâri mi?", items: CL([
      ["أَكَلْتُ", "m", "Sonunda ـْتُ: mâzî."], ["نَشْرَبُ", "d", "Başında نَـ: muzâri."], ["تَجْلِسِينَ", "d", "تَـ…ـِينَ: muzâri."], ["قَرَأَتْ", "m", "Sonunda ـَتْ: mâzî."], ["يُصَلِّي", "d", "Başında يُـ: muzâri."], ["سَافَرْنَا", "m", "Sonunda ـْنَا: mâzî."],
      ["يَسْتَيْقِظُ", "d", "Muzâri."], ["تَوَضَّأَ", "m", "Mâzî."], ["أَذْهَبُ", "d", "Muzâri."], ["رَجَعْتِ", "m", "Mâzî."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "حَوِّلْ إِلَى المَاضِي", tr: "Muzâri cümleyi mâzîye çevir.", items: PL([
      ["أَنَا آكُلُ الفُطُورَ. ← أَنَا ___ الفُطُورَ.", "أَكَلْتُ", "أَكَلَ", "أَكَلْنَا", "Kahvaltı yedim.", ""],
      ["نَحْنُ نُصَلِّي الفَجْرَ. ← نَحْنُ ___ الفَجْرَ.", "صَلَّيْنَا", "صَلَّيْتُ", "صَلَّى", "Sabah namazını kıldık.", ""],
      ["هِيَ تَقْرَأُ القُرْآنَ. ← هِيَ ___ القُرْآنَ.", "قَرَأَتْ", "قَرَأْتِ", "قَرَأَ", "Kur’an okudu.", "هِيَ ← ـَتْ; أَنْتِ ← ـْتِ."],
      ["أَنْتَ تَشْرَبُ الشَّايَ. ← أَنْتَ ___ الشَّايَ.", "شَرِبْتَ", "شَرِبْتِ", "شَرِبَتْ", "Çay içtin.", ""],
      ["هُوَ يُسَافِرُ إِلَى تُرْكِيَا. ← هُوَ ___ إِلَى تُرْكِيَا.", "سَافَرَ", "سَافَرَتْ", "سَافَرْتُ", "Türkiye’ye yolculuk etti.", ""]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["الوَقْتُ {مُهِمٌّ} فِي حَيَاةِ الإِنْسَانِ.", ["مُهِمٌّ", "قَلِيلٌ", "رَخِيصٌ"], "metin", "Vakit insan hayatında önemlidir.", "u1"],
  ["أَقْسَمَ اللهُ تَعَالَى فِي القُرْآنِ بِ{الوَقْتِ}.", ["الوَقْتِ", "البَحْرِ", "المَالِ"], "metin", "Allah Kur’an’da vakte yemin etti.", "u1"],
  ["وَالعَصْرِ، إِنَّ الإِنْسَانَ لَفِي {خُسْرٍ}.", ["خُسْرٍ", "رِبْحٍ", "بَيْتٍ"], "Asr", "Asra andolsun, insan ziyandadır.", "u1"],
  ["يَنَامُ {مُبَكِّرًا} لِيَسْتَرِيحَ جِسْمُهُ.", ["مُبَكِّرًا", "مُتَأَخِّرًا", "قَلِيلًا"], "metin", "Bedeni dinlensin diye erken yatar.", "u1"],
  ["وَيَسْتَيْقِظُ مَعَ طُلُوعِ {الفَجْرِ}.", ["الفَجْرِ", "الشَّمْسِ", "القَمَرِ"], "metin", "Fecrin doğuşuyla uyanır.", "u1"],
  ["عِنْدَمَا يُؤَذِّنُ المُؤَذِّنُ {يُرَدِّدُ} مَا يَقُولُهُ.", ["يُرَدِّدُ", "يَكْتُبُ", "يَنْسَى"], "metin", "Müezzin okuyunca söylediğini tekrarlar.", "u1"],
  ["يُصَلِّي رَكْعَتَيْنِ {سُنَّةَ} الفَجْرِ.", ["سُنَّةَ", "فَرْضَ", "صَلَاةَ"], "anlama", "Sabahın iki rekât sünnetini kılar.", "u2"],
  ["يَقْرَأُ {جُزْءًا} مِنَ القُرْآنِ الكَرِيمِ.", ["جُزْءًا", "كِتَابًا", "دَرْسًا"], "anlama", "Kur’an’dan bir cüz okur.", "u2"],
  ["يَتَصَدَّقُ بِصَدَقَةٍ عَلَى {الفُقَرَاءِ}.", ["الفُقَرَاءِ", "الأَغْنِيَاءِ", "الطُّلَّابِ"], "anlama", "Fakirlere sadaka verir.", "u2"],
  ["أَتَنَاوَلُ {الفُطُورَ} صَبَاحًا.", ["الفُطُورَ", "العَشَاءَ", "المَسْجِدَ"], "eşleştirme", "Sabah kahvaltı yaparım.", "u2"],
  ["يَقْضِي = {يُمْضِي}.", ["يُمْضِي", "يَرْجِعُ", "يَحْلِفُ"], "eş anlam", "Geçirir = geçirir.", "u3"],
  ["أَقْسَمَ = {حَلَفَ}.", ["حَلَفَ", "حَضَّرَ", "عَادَ"], "eş anlam", "Yemin etti.", "u3"],
  ["الصَّالِحَةُ ≠ {الطَّالِحَةُ}.", ["الطَّالِحَةُ", "الغَنِيَّةُ", "المُبَكِّرَةُ"], "zıt", "İyi ≠ kötü.", "u3"],
  ["نِهَايَةٌ ≠ {بِدَايَةٌ}.", ["بِدَايَةٌ", "وَقْتٌ", "زَمَنٌ"], "zıt", "Son ≠ başlangıç.", "u3"],
  ["{يَسْتَيْقِظُ} هِشَامٌ عَادَةً السَّابِعَةَ صَبَاحًا.", ["يَسْتَيْقِظُ", "تَسْتَيْقِظُ", "يَنَامُ"], "fiil", "Hişâm sabah yedide uyanır.", "u4"],
  ["{تَتَنَاوَلُ} العَائِلَةُ الغَدَاءَ مَعًا.", ["تَتَنَاوَلُ", "يَتَنَاوَلُ", "نَتَنَاوَلُ"], "fiil", "Aile öğle yemeğini birlikte yer.", "u4"],
  ["أَنَا {أَطْبُخُ} الطَّعَامَ ظُهْرًا.", ["أَطْبُخُ", "يَطْبُخُ", "تَطْبُخُ"], "fiil", "Öğleyin yemek pişiririm.", "u4"],
  ["{هَلْ} تَسْكُنُ فِي مَكَانٍ قَرِيبٍ مِنَ الجَامِعَةِ؟", ["هَلْ", "مَتَى", "مَاذَا"], "soru", "Üniversiteye yakın bir yerde mi oturuyorsun?", "u4"],
  ["يَنَامُ مُبَكِّرًا لِـ{يَسْتَرِيحَ}.", ["يَسْتَرِيحَ", "يَسْتَرِيحُ", "اسْتَرَاحَ"], "لِـ", "Dinlenmek için erken yatar.", "u4"],
  ["أَنَا {أَكَلْتُ} الفُطُورَ.", ["أَكَلْتُ", "أَكَلَتْ", "أَكَلْنَا"], "mâzî", "Kahvaltı yedim.", "u5"],
  ["نَحْنُ {شَرِبْنَا} الشَّايَ.", ["شَرِبْنَا", "شَرِبْتُ", "شَرِبُوا"], "mâzî", "Çay içtik.", "u5"],
  ["أَنْتِ {تَجْلِسِينَ} عَلَى الكُرْسِيِّ.", ["تَجْلِسِينَ", "تَجْلِسُ", "يَجْلِسُ"], "muzâri", "Sen (k.) sandalyede oturuyorsun.", "u5"],
  ["هِيَ {سَافَرَتْ} إِلَى إِسْطَنْبُولَ.", ["سَافَرَتْ", "سَافَرْتِ", "سَافَرَ"], "mâzî", "O (k.) İstanbul’a gitti.", "u5"],
  ["هُوَ {صَلَّى} فِي المَسْجِدِ.", ["صَلَّى", "صَلَّتْ", "صَلَّيْتُ"], "mâzî", "O camide namaz kıldı.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["يَنَامُ المُسْلِمُ مُتَأَخِّرًا ← metne göre düzelt", "يَنَامُ المُسْلِمُ مُبَكِّرًا", "يَنَامُ المُسْلِمُ ظُهْرًا", "لَا يَنَامُ المُسْلِمُ", "يَنَامُ مُبَكِّرًا لِيَسْتَرِيحَ جِسْمُهُ.", "u1"],
  ["يُصَلِّي سُنَّةَ الفَجْرِ أَرْبَعَ رَكَعَاتٍ ← metne göre düzelt", "يُصَلِّي سُنَّةَ الفَجْرِ رَكْعَتَيْنِ", "يُصَلِّي سُنَّةَ الفَجْرِ ثَلَاثَ رَكَعَاتٍ", "لَا يُصَلِّي سُنَّةَ الفَجْرِ", "رَكْعَتَيْنِ سُنَّةَ الفَجْرِ.", "u2"],
  ["أَتَنَاوَلُ … ← tümleç", "أَتَنَاوَلُ الفُطُورَ", "أَتَنَاوَلُ إِلَى الجَامِعَةِ", "أَتَنَاوَلُ فِي المَسْجِدِ", "تَنَاوَلَ + yemek.", "u2"],
  ["أَرْجِعُ ← eş anlam", "أَعُودُ", "أُكَرِّرُ", "أَحْلِفُ", "dönerim", "u3"],
  ["الوَقْتُ ← eş anlam", "الزَّمَنُ", "الصَّبَاحُ", "النِّهَايَةُ", "vakit = zaman", "u3"],
  ["فَقِيرٌ ← zıt anlam", "غَنِيٌّ", "مُتَأَخِّرٌ", "طَالِحٌ", "fakir ≠ zengin", "u3"],
  ["اسْتَيْقَظَ ← zıt anlam", "نَامَ", "صَلَّى", "رَجَعَ", "uyandı ≠ uyudu", "u3"],
  ["… مَرْيَمُ إِلَى الجَامِعَةِ ← fiil", "تَذْهَبُ مَرْيَمُ إِلَى الجَامِعَةِ", "يَذْهَبُ مَرْيَمُ إِلَى الجَامِعَةِ", "أَذْهَبُ مَرْيَمُ إِلَى الجَامِعَةِ", "Dişil özne ← تَـ", "u4"],
  ["الطِّفْلُ، يَنَامُ، مَتَى، مَسَاءً ← sırala", "مَتَى يَنَامُ الطِّفْلُ مَسَاءً؟", "الطِّفْلُ مَتَى مَسَاءً يَنَامُ؟", "يَنَامُ مَسَاءً مَتَى الطِّفْلُ؟", "Kitaptaki 8. etkinlik.", "u4"],
  ["أَكَلَ ← أَنَا (mâzî)", "أَكَلْتُ", "آكُلُ", "أَكَلَتْ", "ـْتُ", "u5"],
  ["سَافَرَ ← هِيَ (mâzî)", "سَافَرَتْ", "سَافَرْتِ", "تُسَافِرُ", "ـَتْ", "u5"],
  ["قَرَأَ ← أَنْتِ (muzâri)", "تَقْرَئِينَ", "قَرَأْتِ", "تَقْرَأُ", "تَـ…ـِينَ; hemze ئـ", "u5"],
  ["جَلَسَ ← نَحْنُ (muzâri)", "نَجْلِسُ", "جَلَسْنَا", "يَجْلِسُ", "نَـ", "u5"],
  ["صَلَّى ← أَنَا (mâzî)", "صَلَّيْتُ", "صَلَّتْ", "أُصَلِّي", "ى → يـ: صَلَّيْتُ", "u5"]
];
// Mâzî mi muzâri mi? hız oyunu
var NOUN_LIST = [];
FIIL.forEach(function (F) { [0, 2, 3, 5].forEach(function (p) { NOUN_LIST.push([F[2][p], "m", F[4][p]]); }); [1, 3, 4].forEach(function (p) { NOUN_LIST.push([F[3][p], "d", F[5][p]]); }); });
var SP_M = ZM;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt / eş", pairs: [["مُبَكِّرٌ", "مُتَأَخِّرٌ"], ["الصَّالِحَةُ", "الطَّالِحَةُ"], ["اسْتَيْقَظَ", "نَامَ"], ["نِهَايَةٌ", "بِدَايَةٌ"], ["فَقِيرٌ", "غَنِيٌّ"], ["يَقْضِي", "يُمْضِي"], ["أَقْسَمَ", "حَلَفَ"], ["أَرْجِعُ", "أَعُودُ"]] },
  fi: { name: "Fiil ↔ tümleç", pairs: [["أَتَنَاوَلُ", "الفُطُورَ"], ["أَذْهَبُ", "إِلَى الجَامِعَةِ"], ["أَدْرُسُ", "دُرُوسِي"], ["أُصَلِّي", "فِي المَسْجِدِ"], ["أَلْبَسُ", "مَلَابِسِي"], ["أُنَظِّفُ", "أَسْنَانِي"], ["أَكْتُبُ", "وَاجِبَاتِي"]] },
  ck: { name: "Mâzî ↔ muzâri", pairs: [["أَكَلْتُ", "آكُلُ"], ["شَرِبْنَا", "نَشْرَبُ"], ["جَلَسْتَ", "تَجْلِسُ"], ["قَرَأْتِ", "تَقْرَئِينَ"], ["صَلَّى", "يُصَلِّي"], ["سَافَرَتْ", "تُسَافِرُ"]] }
};
var KARTLAR = [
  ["Vaktin önemi?", "أَقْسَمَ اللهُ بِالوَقْتِ: ﴿وَالعَصْرِ، إِنَّ الإِنْسَانَ لَفِي خُسْرٍ…﴾"],
  ["Müslüman ne zaman yatar ve uyanır?", "يَنَامُ مُبَكِّرًا لِيَسْتَرِيحَ جِسْمُهُ، وَيَسْتَيْقِظُ مَعَ طُلُوعِ الفَجْرِ"],
  ["Sabahın sırası?", "أَذْكَارُ الاسْتِيقَاظِ ← الوُضُوءُ ← يُرَدِّدُ الأَذَانَ ← الدُّعَاءُ ← المَسْجِدُ ← سُنَّةُ الفَجْرِ ← الإِقَامَةُ"],
  ["Ezan duası?", "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ القَائِمَةِ، آتِ مُحَمَّدًا الوَسِيلَةَ وَالفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ"],
  ["Gün içindeki beş iş?", "يَقْرَأُ جُزْءًا · يَزُورُ الأَقَارِبَ · يَتَوَاصَلُ مَعَ أَصْدِقَائِهِ · يَزُورُ مَرِيضًا · يَتَصَدَّقُ"],
  ["Günün sonu?", "يَرْجِعُ إِلَى بَيْتِهِ، يَتَنَاوَلُ العَشَاءَ، يُصَلِّي المَغْرِبَ وَالعِشَاءَ، يَنَامُ مُبَكِّرًا"],
  ["Eş anlamlar?", "يَقْضِي = يُمْضِي · الوَقْتُ = الزَّمَنُ · أُرَدِّدُ = أُكَرِّرُ · أَرْجِعُ = أَعُودُ · جَهَّزَ = حَضَّرَ · أَقْسَمَ = حَلَفَ"],
  ["Zıt anlamlar?", "مُبَكِّرٌ ≠ مُتَأَخِّرٌ · الصَّالِحَةُ ≠ الطَّالِحَةُ · اسْتَيْقَظَ ≠ نَامَ · نِهَايَةٌ ≠ بِدَايَةٌ · فَقِيرٌ ≠ غَنِيٌّ"],
  ["Amaç bildiren لِـ?", "لِـ + mansûb muzâri: لِيَسْتَرِيحَ، لِيَتَنَاوَلَ، لِيَسْتَعِدَّ"],
  ["Mâzî ekleri?", "ـْتُ، ـْنَا، ـْتَ، ـْتِ، ـَ، ـَتْ · أَكَلْتُ… أَكَلَتْ"],
  ["Muzâri ekleri?", "أَـ، نَـ، تَـ، تَـ…ـِينَ، يَـ، تَـ · آكُلُ… تَأْكُلُ"],
  ["صَلَّى nasıl çekilir?", "صَلَّيْتُ، صَلَّيْنَا، صَلَّيْتَ، صَلَّيْتِ، صَلَّى، صَلَّتْ · أُصَلِّي، تُصَلِّينَ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat07";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("وَقْتٌ", "i", "vakit", "أَوْقَاتٌ", "efal", "زَمَنٌ", "", "الوَقْتُ مُهِمٌّ فِي حَيَاةِ الإِنْسَانِ.", "الوَقْتُ", "Vakit insan hayatında önemlidir."),
  KW("حَيَاةٌ", "i", "hayat", "", "", "", "مَوْتٌ", "المُسْلِمُ الحَقُّ يَقْضِي حَيَاتَهُ فِي الأَعْمَالِ المُفِيدَةِ.", "حَيَاتَهُ", "Gerçek Müslüman hayatını faydalı işlerle geçirir."),
  KW("عَمَلٌ", "i", "iş, amel", "أَعْمَالٌ", "efal", "", "", "يَقْضِي حَيَاتَهُ فِي الأَعْمَالِ المُفِيدَةِ.", "الأَعْمَالِ", "Hayatını faydalı işlerle geçirir."),
  KW("جِسْمٌ", "i", "beden", "أَجْسَامٌ", "efal", "بَدَنٌ", "", "يَنَامُ مُبَكِّرًا لِيَسْتَرِيحَ جِسْمُهُ.", "جِسْمُهُ", "Bedeni dinlensin diye erken yatar."),
  KW("ذِكْرٌ", "i", "zikir", "أَذْكَارٌ", "efal", "", "", "يَبْدَأُ يَوْمَهُ بِأَذْكَارِ الاسْتِيقَاظِ.", "بِأَذْكَارِ", "Gününe uyanma zikirleriyle başlar."),
  KW("أَذَانٌ", "i", "ezan", "", "", "", "", "وَبَعْدَ نِهَايَةِ الأَذَانِ يَدْعُو بِهَذَا الدُّعَاءِ.", "الأَذَانِ", "Ezan bitince bu duayı okur."),
  KW("دُعَاءٌ", "i", "dua", "أَدْعِيَةٌ", "efile", "", "", "وَبَعْدَ نِهَايَةِ الأَذَانِ يَدْعُو بِهَذَا الدُّعَاءِ.", "الدُّعَاءِ", "Ezan bitince bu duayı okur."),
  KW("رَكْعَةٌ", "i", "rekât", "رَكَعَاتٌ", "at", "", "", "يُصَلِّي رَكْعَتَيْنِ سُنَّةَ الفَجْرِ.", "رَكْعَتَيْنِ", "Sabahın iki rekât sünnetini kılar."),
  KW("جُزْءٌ", "i", "cüz, parça", "أَجْزَاءٌ", "efal", "", "كُلٌّ", "يَقْرَأُ جُزْءًا مِنَ القُرْآنِ الكَرِيمِ.", "جُزْءًا", "Kur’an’dan bir cüz okur."),
  KW("قَرِيبٌ", "i", "akraba; yakın", "أَقَارِبُ", "diger", "", "بَعِيدٌ", "يَزُورُ أَحَدَ الأَقَارِبِ أَوِ الأَصْدِقَاءِ.", "الأَقَارِبِ", "Akrabalardan ya da arkadaşlardan birini ziyaret eder."),
  KW("صَدِيقٌ", "i", "arkadaş", "أَصْدِقَاءُ", "efila", "", "عَدُوٌّ", "يَتَوَاصَلُ مَعَ أَصْدِقَائِهِ.", "أَصْدِقَائِهِ", "Arkadaşlarıyla iletişim kurar."),
  KW("وَسِيلَةٌ", "i", "araç, vasıta", "وَسَائِلُ", "feail", "", "", "أَوْ وَسِيلَةٍ مِنْ وَسَائِلِ التَّوَاصُلِ الاجْتِمَاعِيِّ.", "وَسِيلَةٍ", "Ya da bir sosyal medya aracıyla."),
  KW("مَرِيضٌ", "i", "hasta", "مَرْضَى", "diger", "", "صَحِيحٌ", "يَزُورُ مَرِيضًا أَحْيَانًا.", "مَرِيضًا", "Bazen bir hastayı ziyaret eder."),
  KW("صَدَقَةٌ", "i", "sadaka", "صَدَقَاتٌ", "at", "", "", "يَتَصَدَّقُ بِصَدَقَةٍ عَلَى الفُقَرَاءِ.", "بِصَدَقَةٍ", "Fakirlere sadaka verir."),
  KW("فَقِيرٌ", "s", "fakir", "فُقَرَاءُ", "fuala", "مُحْتَاجٌ", "غَنِيٌّ", "يَتَصَدَّقُ بِصَدَقَةٍ عَلَى الفُقَرَاءِ وَالمُحْتَاجِينَ.", "الفُقَرَاءِ", "Fakirlere ve muhtaçlara sadaka verir."),
  KW("نِهَايَةٌ", "i", "son", "نِهَايَاتٌ", "at", "", "بِدَايَةٌ", "وَفِي نِهَايَةِ اليَوْمِ يَرْجِعُ إِلَى بَيْتِهِ.", "نِهَايَةِ", "Günün sonunda evine döner."),
  KW("مُبَكِّرٌ", "s", "erken", "", "", "", "مُتَأَخِّرٌ", "يَنَامُ مُبَكِّرًا لِيَسْتَرِيحَ جِسْمُهُ.", "مُبَكِّرًا", "Bedeni dinlensin diye erken yatar."),
  KW("مُفِيدٌ", "s", "faydalı", "", "", "نَافِعٌ", "ضَارٌّ", "يَقْضِي حَيَاتَهُ فِي الأَعْمَالِ المُفِيدَةِ.", "المُفِيدَةِ", "Hayatını faydalı işlerle geçirir."),
  KW("صَالِحٌ", "s", "salih, iyi", "صَالِحُونَ", "un", "", "طَالِحٌ", "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ.", "الصَّالِحَاتِ", "İman edip salih ameller işleyenler hariç."),
  KW("تَالٍ", "s", "sonraki", "", "", "", "سَابِقٌ", "لِيَسْتَعِدَّ لِأَعْمَالِ اليَوْمِ التَّالِي.", "التَّالِي", "Ertesi günün işlerine hazırlanmak için."),
  KW("أَقْسَمَ", "f", "yemin etti", "", "", "حَلَفَ", "", "أَقْسَمَ اللهُ تَعَالَى فِي القُرْآنِ بِالوَقْتِ.", "أَقْسَمَ", "Allah Kur’an’da vakte yemin etti."),
  KW("قَضَى", "f", "geçirdi", "", "", "أَمْضَى", "", "المُسْلِمُ الحَقُّ يَقْضِي حَيَاتَهُ فِي الأَعْمَالِ المُفِيدَةِ.", "يَقْضِي", "Gerçek Müslüman hayatını faydalı işlerle geçirir."),
  KW("اسْتَيْقَظَ", "f", "uyandı", "", "", "", "نَامَ", "وَيَسْتَيْقِظُ مَعَ طُلُوعِ الفَجْرِ.", "وَيَسْتَيْقِظُ", "Fecrin doğuşuyla uyanır."),
  KW("نَامَ", "f", "uyudu, yattı", "", "", "رَقَدَ", "اسْتَيْقَظَ", "يَنَامُ مُبَكِّرًا لِيَسْتَرِيحَ جِسْمُهُ.", "يَنَامُ", "Erken yatar."),
  KW("تَوَضَّأَ", "f", "abdest aldı", "", "", "", "", "ثُمَّ يَتَوَضَّأُ وَيَتَجَهَّزُ لِصَلَاةِ الفَجْرِ.", "يَتَوَضَّأُ", "Sonra abdest alır ve sabah namazına hazırlanır."),
  KW("رَدَّدَ", "f", "tekrarladı", "", "", "كَرَّرَ", "", "عِنْدَمَا يُؤَذِّنُ المُؤَذِّنُ يُرَدِّدُ مَا يَقُولُهُ.", "يُرَدِّدُ", "Müezzin okuyunca söylediğini tekrarlar."),
  KW("انْتَظَرَ", "f", "bekledi", "", "", "", "", "ثُمَّ يَنْتَظِرُ إِقَامَةَ صَلَاةِ الفَجْرِ.", "يَنْتَظِرُ", "Sonra kameti bekler."),
  KW("زَارَ", "f", "ziyaret etti", "", "", "", "", "يَزُورُ مَرِيضًا أَحْيَانًا.", "يَزُورُ", "Bazen bir hastayı ziyaret eder."),
  KW("رَجَعَ", "f", "döndü", "", "", "عَادَ", "ذَهَبَ", "وَفِي نِهَايَةِ اليَوْمِ يَرْجِعُ إِلَى بَيْتِهِ.", "يَرْجِعُ", "Günün sonunda evine döner."),
  KW("جَهَّزَ", "f", "hazırladı", "", "", "حَضَّرَ", "", "ثُمَّ يَتَوَضَّأُ وَيَتَجَهَّزُ لِصَلَاةِ الفَجْرِ.", "وَيَتَجَهَّزُ", "Sabah namazına hazırlanır."),
  KW("اسْتَعَدَّ", "f", "hazırlandı", "", "", "تَجَهَّزَ", "", "لِيَسْتَعِدَّ لِأَعْمَالِ اليَوْمِ التَّالِي.", "لِيَسْتَعِدَّ", "Ertesi günün işlerine hazırlanmak için."),
  KW("طَبَخَ", "f", "pişirdi", "", "", "", "", "أَنَا أَطْبُخُ الطَّعَامَ ظُهْرًا.", "أَطْبُخُ", "Öğleyin yemek pişiririm."),
  KW("غَسَلَ", "f", "yıkadı", "", "", "", "", "يَغْسِلُ مَلَابِسَهُ فِي العُطْلَةِ.", "يَغْسِلُ", "Tatilde elbiselerini yıkar.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","قُلُوبٌ، دُرُوسٌ"],"efal":["أَفْعَالٌ","ef’âl","أَوْقَاتٌ، أَعْمَالٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَدْعِيَةٌ، أَطْعِمَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، رِجَالٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","غُرَفٌ، صُوَرٌ"],"fuala":["فُعَلَاءُ","fu’alâ","فُقَرَاءُ، وُزَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَغْنِيَاءُ"],"fevail":["فَوَاعِلُ","fevâil","شَوَارِعُ، نَوَافِذُ"],"feail":["فَعَائِلُ","feâil","وَسَائِلُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَسَاجِدُ، مَكَاتِبُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","عَصَافِيرُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","طُلَّابٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","صَالِحُونَ، مُحْتَاجُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","رَكَعَاتٌ، صَدَقَاتٌ"],"diger":["…","başka kalıplar","أَقَارِبُ، مَرْضَى"]};
