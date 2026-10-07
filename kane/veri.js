// ================= VERİ: Kâne ve Kardeşleri (كَانَ وَأَخَوَاتُهَا) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "الفِعْلُ النَّاسِخُ", tr: "Kâne / kardeşi" }, cerr: { ar: "اسْمُ كَانَ", tr: "İsmi (merfû)" }, nasb: { ar: "خَبَرُ كَانَ", tr: "Haberi (mansûb)" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
// Anlam grupları
var ANL = [["z", "Vakit / geçmiş", "الزَّمَنُ", "mz"], ["d", "Dönüşme (oldu)", "التَّحَوُّلُ", "cerr"], ["n", "Olumsuzluk (değil)", "النَّفْيُ", "nasb"], ["s", "Süreklilik (hâlâ, sürece)", "الاسْتِمْرَارُ", "mi"]];
// Haber türleri
var HTUR = [["m", "Müfred", "مُفْرَدٌ", "cerr"], ["i", "İsim cümlesi", "جُمْلَةٌ اسْمِيَّةٌ", "nasb"], ["f", "Fiil cümlesi", "جُمْلَةٌ فِعْلِيَّةٌ", "mi"], ["s", "Şibh-i cümle", "شِبْهُ جُمْلَةٍ", "mz"]];
var TUR_TR = { m: "Müfred", i: "İsim cümlesi", f: "Fiil cümlesi", s: "Şibh-i cümle" };
// Kardeşler: [fiil, anlam, örnek, renk]
var KARDES = [
  ["كَانَ", "geçmişte …idi", "كَانَ الجَوُّ بَارِدًا أَمْسِ", "mz"],
  ["أَصْبَحَ", "sabahleyin oldu · oldu", "أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً", "cerr"],
  ["أَضْحَى", "kuşluk vakti oldu · oldu", "أَضْحَى الطَّالِبُ نَشِيطًا", "cerr"],
  ["ظَلَّ", "gün boyu …di · sürekli kaldı", "ظَلَّ عَلِيٌّ غَنِيًّا", "mi"],
  ["أَمْسَى", "akşamleyin oldu · oldu", "أَمْسَى العَامِلُ مُتْعَبًا", "cerr"],
  ["صَارَ", "oldu, dönüştü", "صَارَ مُحَمَّدٌ مُدَرِّسًا", "cerr"],
  ["لَيْسَ", "değil", "لَيْسَ البَابُ مَفْتُوحًا", "nasb"],
  ["مَا زَالَ", "hâlâ …", "مَا زَالَ الطَّبِيبُ فِي المُسْتَشْفَى", "mi"],
  ["مَا دَامَ", "…dığı sürece", "تَتَقَدَّمُ البِلَادُ مَا دَامَ العِلْمُ مُنْتَشِرًا فِيهَا", "mi"]
];
// Kâne makinesi: cümleler [isim, haber merfû, haber mansûb, müennes mi, Türkçe]
var MS = [
  ["الجَوُّ", "بَارِدٌ", "بَارِدًا", false, "hava soğuk"],
  ["العَالَمُ", "قَرْيَةٌ صَغِيرَةٌ", "قَرْيَةً صَغِيرَةً", false, "dünya küçük bir köy"],
  ["مُحَمَّدٌ", "مُدَرِّسٌ", "مُدَرِّسًا", false, "Muhammed öğretmen"],
  ["البَابُ", "مَفْتُوحٌ", "مَفْتُوحًا", false, "kapı açık"],
  ["البِنْتُ", "بَاكِيَةٌ", "بَاكِيَةً", true, "kız ağlıyor"],
  ["المُعَلِّمُونَ", "مُخْلِصُونَ", "مُخْلِصِينَ", false, "öğretmenler ihlaslı"],
  ["الطَّالِبَاتُ", "مُجْتَهِدَاتٌ", "مُجْتَهِدَاتٍ", true, "kız öğrenciler çalışkan"]
];
// Nâsihler: [ad, mâzî müz., mâzî müen., muzâri müz., muzâri müen., anlam]
var MN = [
  ["Yok", "", "", "", "", "isim cümlesi: mübtedâ ve haber merfû"],
  ["كَانَ", "كَانَ", "كَانَتْ", "يَكُونُ", "تَكُونُ", "…idi / olur"],
  ["أَصْبَحَ", "أَصْبَحَ", "أَصْبَحَتْ", "يُصْبِحُ", "تُصْبِحُ", "sabahleyin oldu · oldu"],
  ["أَضْحَى", "أَضْحَى", "أَضْحَتْ", "يُضْحِي", "تُضْحِي", "kuşluk vakti oldu · oldu"],
  ["ظَلَّ", "ظَلَّ", "ظَلَّتْ", "يَظَلُّ", "تَظَلُّ", "gün boyu kaldı · sürekli"],
  ["أَمْسَى", "أَمْسَى", "أَمْسَتْ", "يُمْسِي", "تُمْسِي", "akşamleyin oldu · oldu"],
  ["صَارَ", "صَارَ", "صَارَتْ", "يَصِيرُ", "تَصِيرُ", "oldu, dönüştü"],
  ["لَيْسَ", "لَيْسَ", "لَيْسَتْ", "", "", "olumsuzluk: …değil"],
  ["مَا زَالَ", "مَا زَالَ", "مَا زَالَتْ", "لَا يَزَالُ", "لَا تَزَالُ", "süreklilik: hâlâ"],
  ["مَا دَامَ", "… مَا دَامَ", "… مَا دَامَتْ", "", "", "müddet: …dığı sürece"]
];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CBP(parts, i, tr, why) {
  var p = [], ok = [], si = 0;
  parts.forEach(function (x) { if (typeof x === "string") p.push(x); else { var r = ROT(x, i + si++); p.push(r); ok.push(r.a); } });
  return { q: "", p: p, ok: [ok], tr: tr, why: why };
}
var GRUP = [["i", "İnne grubu", "إِنَّ وَأَخَوَاتُهَا", "mz"], ["k", "Kâne grubu", "كَانَ وَأَخَوَاتُهَا", "ref"]];
var ROL3 = [["h", "Kâne / kardeşi", "فِعْلٌ نَاسِخٌ", "mz"], ["i", "İsmi", "اسْمُهَا", "cerr"], ["b", "Haberi", "خَبَرُهَا", "nasb"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · KÂNE VE KARDEŞLERİ
{
  id: "u1", no: 1, ar: "كَانَ وَأَخَوَاتُهَا", tr: "Kâne ve Kardeşleri", short: "Dokuz fiil", col: "mz", legend: ["mz", "cerr", "nasb"],
  goals: ["Kâne ve kardeşlerini saymak: كَانَ، أَصْبَحَ، أَضْحَى، ظَلَّ، أَمْسَى، صَارَ، لَيْسَ، مَا زَالَ، مَا دَامَ", "İsim cümlesine girince mübtedâyı ref’, haberi nasb ettiğini bilmek", "Cümlede kâne’yi, ismini ve haberini bulmak"],
  examples: [
    { s: "الجَوُّ:cerr / بَارِدٌ:nasb / اليَوْمَ.:-", tr: "Bugün hava soğuk.", pair: "كَانَ:mz / الجَوُّ:cerr / بَارِدًا:nasb / أَمْسِ.:-", pairTr: "Dün hava soğuktu." },
    { s: "العَالَمُ:cerr / قَرْيَةٌ صَغِيرَةٌ.:nasb", tr: "Dünya küçük bir köy.", pair: "أَصْبَحَ:mz / العَالَمُ:cerr / قَرْيَةً صَغِيرَةً.:nasb", pairTr: "Dünya küçük bir köy oldu." },
    { s: "مُحَمَّدٌ:cerr / مُدَرِّسٌ.:nasb", tr: "Muhammed öğretmen.", pair: "صَارَ:mz / مُحَمَّدٌ:cerr / مُدَرِّسًا.:nasb", pairTr: "Muhammed öğretmen oldu." },
    { s: "العِلْمُ:cerr / مُنْتَشِرٌ.:nasb", tr: "İlim yaygın.", pair: "تَتَقَدَّمُ البِلَادُ:- / مَا دَامَ:mz / العِلْمُ:cerr / مُنْتَشِرًا:nasb / فِيهَا.:-", pairTr: "İlim yaygın olduğu sürece ülke ilerler." },
    { s: "البَابُ:cerr / مَفْتُوحٌ.:nasb", tr: "Kapı açık.", pair: "لَيْسَ:mz / البَابُ:cerr / مَفْتُوحًا.:nasb", pairTr: "Kapı açık değil." }
  ],
  rules: [
    { tr: "<b class=\"r-mz\">Kâne ve kardeşleri</b> (<span class=\"ar\">كَانَ وَأَخَوَاتُهَا</span>) <b>nâsih fiillerdir</b>: isim cümlesine girer, onun i’rabını değiştirir. Mübtedâyı <b>ref’</b> eder, adı <b class=\"r-cerr\">kâne’nin ismi</b> olur; haberi <b>nasb</b> eder, adı <b class=\"r-nasb\">kâne’nin haberi</b> olur:", ex: ["الجَوُّ بَارِدٌ ← كَانَ الجَوُّ بَارِدًا"] },
    { tr: "Kardeşleri ve anlamları:", ex: ["كَانَ: geçmişte …idi · صَارَ: oldu, dönüştü", "أَصْبَحَ / أَضْحَى / أَمْسَى: sabah / kuşluk / akşam vakti oldu; çoğu zaman sadece “oldu”", "ظَلَّ: gün boyu …di, sürekli kaldı · لَيْسَ: …değil", "مَا زَالَ: hâlâ … · مَا دَامَ: …dığı sürece (önünde bir cümle ister)"] },
    { tr: "Bunlar fiildir; fâil almazlar, isim ve haber alırlar. İsim cümlesindeki anlam (dünya = küçük köy) korunur, fiil ona zaman ya da anlam ekler." },
    { tr: "Not: Kitap sekiz kardeş sayar. Klasik listede ayrıca <span class=\"ar\">بَاتَ، مَا بَرِحَ، مَا فَتِئَ، مَا انْفَكَّ</span> da vardır." },
    { tr: "İnne’nin tam tersi: inne ismi <b>mansûb</b>, haberi <b>merfû</b> yapar; kâne ismi <b>merfû</b>, haberi <b>mansûb</b> yapar." }
  ],
  kaide: [
    "١ ـ كَانَ وَأَخَوَاتُهَا أَفْعَالٌ نَاسِخَةٌ؛ يَعْنِي تَدْخُلُ عَلَى الجُمْلَةِ الاسْمِيَّةِ، فَتَرْفَعُ المُبْتَدَأَ اسْمًا لَهَا، وَتَنْصِبُ الخَبَرَ خَبَرًا لَهَا.",
    "٢ ـ مِنْ أَخَوَاتِ كَانَ: أَصْبَحَ، أَضْحَى، ظَلَّ، أَمْسَى، صَارَ، لَيْسَ، مَا زَالَ، مَا دَامَ."
  ],
  ex: [
    { type: "tag", roles: ["mz", "cerr", "nasb", "x"], num: "١", ar: "ضَعْ خَطًّا تَحْتَ «كَانَ وَأَخَوَاتِهَا» ثُمَّ بَيِّنِ اسْمَهَا وَخَبَرَهَا", tr: "Parçalara dokunarak Kâne / kardeşi, İsmi, Haberi ya da Başka diye etiketle.", exHtml: "<span class=\"ar\">كَانَ المَرِيضُ مُتَأَلِّمًا ← الاسْمُ: المَرِيضُ · الخَبَرُ: مُتَأَلِّمًا</span>", items: [
      T("ظَلَّ:mz / عَلِيٌّ:cerr / غَنِيًّا.:nasb", "Ali zengin kaldı.", "İsim عَلِيٌّ merfû, haber غَنِيًّا mansûb."),
      T("أَضْحَى:mz / الطَّالِبُ:cerr / نَشِيطًا.:nasb", "Öğrenci (kuşluk vakti) dinç oldu.", "İsim الطَّالِبُ, haber نَشِيطًا."),
      T("أَمْسَى:mz / العَامِلُ:cerr / مُتْعَبًا.:nasb", "İşçi akşam yorgun düştü.", "İsim العَامِلُ, haber مُتْعَبًا."),
      T("مَا زَالَ:mz / شَرِيفٌ:cerr / بَاكِيًا.:nasb", "Şerif hâlâ ağlıyor.", "مَا زَالَ tek nâsihtir; isim شَرِيفٌ, haber بَاكِيًا."),
      T("أَنَا سَعِيدٌ:x / مَا دَامَ:mz / وَلَدِي:cerr / نَاجِحًا.:nasb", "Oğlum başarılı olduğu sürece mutluyum.", "أَنَا سَعِيدٌ ayrı isim cümlesi; isim وَلَدِي (takdîren merfû), haber نَاجِحًا."),
      T("لَيْسَ:mz / المُدِيرُ:cerr / مَشْغُولًا.:nasb", "Müdür meşgul değil.", "İsim المُدِيرُ, haber مَشْغُولًا."),
      T("أَصْبَحَتِ:mz / العَرَبِيَّةُ:cerr / مُنْتَشِرَةً.:nasb", "Arapça yaygın hale geldi.", "İsim müennes: أَصْبَحَتْ."),
      T("صَارَ:mz / الأَمْرُ:cerr / صَعْبًا.:nasb", "İş zorlaştı.", "İsim الأَمْرُ, haber صَعْبًا.")
    ]},
    { type: "classify", extra: true, opts: ANL, ar: "مَاذَا يُفِيدُ الفِعْلُ النَّاسِخُ؟", tr: "Koyu fiil cümleye hangi anlamı katıyor?", items: CL([
      [HL("كَانَ الجَوُّ بَارِدًا أَمْسِ", "كَانَ"), "z", "كَانَ: geçmişte öyleydi."],
      [HL("صَارَ مُحَمَّدٌ مُدَرِّسًا", "صَارَ"), "d", "صَارَ: bir halden başka hale geçti."],
      [HL("أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً", "أَصْبَحَ"), "d", "أَصْبَحَ burada “oldu” (صَارَ) anlamında."],
      [HL("لَيْسَ البَابُ مَفْتُوحًا", "لَيْسَ"), "n", "لَيْسَ: olumsuzluk."],
      [HL("مَا زَالَ الطَّبِيبُ فِي المُسْتَشْفَى", "مَا زَالَ"), "s", "مَا زَالَ: hâlâ, devam ediyor."],
      [HL("تَتَقَدَّمُ البِلَادُ مَا دَامَ العِلْمُ مُنْتَشِرًا فِيهَا", "مَا دَامَ"), "s", "مَا دَامَ: …dığı sürece (müddet)."],
      [HL("ظَلَّ العَالَمُ الإِسْلَامِيُّ تَحْتَ ظُلْمِ الاسْتِعْمَارِ سِنِينَ طَوِيلَةً", "ظَلَّ"), "s", "ظَلَّ: yıllarca öyle kaldı (devam)."],
      [HL("أَمْسَى العَامِلُ مُتْعَبًا بَعْدَ عَمَلِ النَّهَارِ", "أَمْسَى"), "z", "أَمْسَى: akşam vakti öyle oldu."],
      [HL("كُنْتُ فَقِيرًا فَأَصْبَحْتُ غَنِيًّا", "كُنْتُ"), "z", "كُنْتُ: geçmişte fakirdim."],
      [HL("لَسْتُ أَدْرِي حَقِيقَةَ هَذَا الأَمْرِ", "لَسْتُ"), "n", "لَسْتُ = لَيْسَ + ـتُ: olumsuzluk."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · İSİM MERFÛ, HABER MANSÛB
{
  id: "u2", no: 2, ar: "اسْمُ كَانَ وَخَبَرُهَا", tr: "İsmi Merfû, Haberi Mansûb", short: "İsim · haber", col: "cerr", legend: ["mz", "cerr", "nasb"],
  goals: ["Kâne’nin ismini merfû, haberini mansûb okumak: كَانَ المُهَنْدِسُونَ عَامِلِينَ", "Müennes isimle كَانَتْ, çoğul isimle de tekil fiil kullanmak", "İsim zamir olunca fiili çekmek: كُنْتُ، كُنْتُمْ، لَيْسُوا، لَسْتُ"],
  examples: [
    { s: "كُنْ:mz / تُ:cerr / فَقِيرًا:nasb / فَأَصْبَحْ:mz / تُ:cerr / غَنِيًّا.:nasb", tr: "Fakirdim, zengin oldum." },
    { s: "كُنْ:mz / تُمْ:cerr / خَيْرَ أُمَّةٍ.:nasb", tr: "Siz en hayırlı ümmetsiniz. (Âl-i İmrân 110)", pair: "لَيْسُ:mz / وا:cerr / ذَاهِبِينَ:nasb / إِلَى المَدْرَسَةِ.:-", pairTr: "Okula gitmiyorlar." },
    { s: "كَانَتِ:mz / الطَّبِيبَاتُ:cerr / مُجْتَمِعَاتٍ:nasb / حَوْلَ المَرِيضِ.:-", tr: "Kadın doktorlar hastanın etrafında toplanmıştı. (cem-i müennes: esre)" }
  ],
  rules: [
    { tr: "Kâne’nin ismi <b class=\"r-cerr\">merfû</b>dur: damme, cem-i müzekkerde vâv (<span class=\"ar\">المُهَنْدِسُونَ</span>), müsennâda elif (<span class=\"ar\">المَرْأَتَانِ</span>)." },
    { tr: "Kâne’nin haberi <b class=\"r-nasb\">mansûb</b>dur; alâmetine dikkat:", ex: ["Fetha: بَارِدًا، مُدَرِّسًا · gayr-i munsarif: خَدِيجَةَ (tenvinsiz)", "Yâ: عَامِلِينَ، ذَاهِبِينَ (cem-i müz.) · مُتْعَبَيْنِ (müsennâ)", "Esre: مُجْتَمِعَاتٍ، مُطَالِبَاتٍ (cem-i müennes sâlim)"] },
    { tr: "Fiil, ismine cinsiyette uyar ama önde olduğu için <b>tekil</b> kalır:", ex: ["كَانَتِ البِنْتُ · صَارَتِ المُعَلِّمَةُ · لَيْسَتْ نَتِيجَةُ الامْتِحَانِ", "كَانَ المُسْلِمُونَ (كَانُوا المُسْلِمُونَ değil)"] },
    { tr: "İsim zamir olunca fiile <b>bitişik fâil zamiri</b> gibi eklenir; ayrık zamir gelmez:", ex: ["أَنَا → كُنْتُ · نَحْنُ → كُنَّا · أَنْتُمْ → كُنْتُمْ · هُمْ → كَانُوا · هُنَّ → كُنَّ", "لَيْسَ: لَسْتُ، لَسْنَا، لَسْتَ، لَيْسُوا، لَسْنَ · أَمْسَى: أَمْسَيْتُ"] },
    { tr: "<span class=\"ar\">كَانَ</span> ecvef fiildir: zamir gelince illet harfi düşer (<span class=\"ar\">كُنْتُ</span>), bkz. Ecvef fiil konusu." }
  ],
  kaide: ["٣ ـ اسْمُ «كَانَ وَأَخَوَاتِهَا» قَدْ يَأْتِي ضَمِيرًا مُتَّصِلًا، مِثْلُ: كُنْتُ فَقِيرًا فَأَصْبَحْتُ غَنِيًّا. كُنْتُمْ خَيْرَ أُمَّةٍ. لَيْسُوا ذَاهِبِينَ إِلَى المَدْرَسَةِ."],
  ex: [
    { type: "pick", num: "٢", ar: "أَعِدِ الجُمَلَ التَّالِيَةَ مُسْتَعْمِلًا مَا بَيْنَ القَوْسَيْنِ مِنْ كَانَ وَأَخَوَاتِهَا", tr: "Cümleyi parantezdeki fiille yeniden yazan doğru seçeneği bul.", exHtml: "<span class=\"ar\">الرَّجُلُ طَبِيبٌ. (أَصْبَحَ) ← أَصْبَحَ الرَّجُلُ طَبِيبًا. · أَنَا ذَاهِبٌ إِلَى العَمَلِ. (كَانَ) ← كُنْتُ ذَاهِبًا إِلَى العَمَلِ.</span>", items: PL([
      ["أَحْمَدُ طَالِبٌ فِي الجَامِعَةِ. (مَا زَالَ)", "مَا زَالَ أَحْمَدُ طَالِبًا فِي الجَامِعَةِ.", "مَا زَالَ أَحْمَدَ طَالِبٌ فِي الجَامِعَةِ.", "مَا زَالَ أَحْمَدُ طَالِبٌ فِي الجَامِعَةِ.", "Ahmed hâlâ üniversitede öğrenci.", "İsim merfû kalır, haber mansûb olur."],
      ["السَّفَرُ بَيْنَ البَلَدَيْنِ طَوِيلٌ. (لَيْسَ)", "لَيْسَ السَّفَرُ بَيْنَ البَلَدَيْنِ طَوِيلًا.", "لَيْسَ السَّفَرَ بَيْنَ البَلَدَيْنِ طَوِيلٌ.", "لَيْسَ السَّفَرُ بَيْنَ البَلَدَيْنِ طَوِيلٌ.", "İki ülke arasındaki yolculuk uzun değil.", "لَيْسَ: haber mansûb."],
      ["أَنْتُمْ خَيْرُ أُمَّةٍ. (كَانَ)", "كُنْتُمْ خَيْرَ أُمَّةٍ.", "كَانَ أَنْتُمْ خَيْرَ أُمَّةٍ.", "كُنْتُمْ خَيْرُ أُمَّةٍ.", "Siz en hayırlı ümmetsiniz. (Âl-i İmrân 110)", "أَنْتُمْ → كُنْتُمْ; haber خَيْرَ mansûb."],
      ["الطَّائِرَةُ وَسِيلَةُ النَّقْلِ. (ظَلَّ)", "ظَلَّتِ الطَّائِرَةُ وَسِيلَةَ النَّقْلِ.", "ظَلَّ الطَّائِرَةَ وَسِيلَةُ النَّقْلِ.", "ظَلَّتِ الطَّائِرَةُ وَسِيلَةُ النَّقْلِ.", "Uçak (başlıca) ulaşım aracı olmaya devam etti.", "İsim müennes: ظَلَّتْ; haber وَسِيلَةَ mansûb."],
      ["أَنْتُمْ بِنِعْمَةِ اللهِ إِخْوَانٌ. (أَصْبَحَ)", "أَصْبَحْتُمْ بِنِعْمَةِ اللهِ إِخْوَانًا.", "أَصْبَحَ أَنْتُمْ بِنِعْمَةِ اللهِ إِخْوَانًا.", "أَصْبَحْتُمْ بِنِعْمَةِ اللهِ إِخْوَانٌ.", "Allah’ın nimetiyle kardeş oldunuz. (Âl-i İmrân 103)", "أَنْتُمْ → أَصْبَحْتُمْ."],
      ["المُعَلِّمَةُ مُخْلِصَةٌ فِي عَمَلِهَا. (صَارَ)", "صَارَتِ المُعَلِّمَةُ مُخْلِصَةً فِي عَمَلِهَا.", "صَارَ المُعَلِّمَةَ مُخْلِصَةٌ فِي عَمَلِهَا.", "صَارَتِ المُعَلِّمَةُ مُخْلِصَةٌ فِي عَمَلِهَا.", "Öğretmen (kadın) işinde ihlaslı oldu.", "Müennes: صَارَتْ; haber mansûb."],
      ["أَنَا مُتْعَبٌ اليَوْمَ. (أَمْسَى)", "أَمْسَيْتُ مُتْعَبًا اليَوْمَ.", "أَمْسَى أَنَا مُتْعَبًا اليَوْمَ.", "أَمْسَيْتُ مُتْعَبٌ اليَوْمَ.", "Bugün akşam yorgun düştüm.", "أَنَا → أَمْسَيْتُ (elif yâya döner)."],
      ["نَتِيجَةُ الامْتِحَانِ جَيِّدَةٌ. (لَيْسَ)", "لَيْسَتْ نَتِيجَةُ الامْتِحَانِ جَيِّدَةً.", "لَيْسَتْ نَتِيجَةَ الامْتِحَانِ جَيِّدَةٌ.", "لَيْسَتْ نَتِيجَةُ الامْتِحَانِ جَيِّدَةٌ.", "Sınavın sonucu iyi değil.", "İsim müennes: لَيْسَتْ; haber mansûb."]
    ])},
    { type: "pick", fill: true, num: "٦", ar: "ضَعِ الأَسْمَاءَ الَّتِي بَيْنَ القَوْسَيْنِ فِي صُورَتِهَا الصَّحِيحَةِ", tr: "Parantezdeki kelimenin doğru biçimini seç: sayı, cinsiyet ve i’rab.", exHtml: "<span class=\"ar\">لَيْسَ الطُّلَّابُ (جَالِس) فِي الصَّفِّ. ← لَيْسَ الطُّلَّابُ جَالِسِينَ فِي الصَّفِّ.</span>", items: PL([
      ["كَانَتِ الطَّبِيبَاتُ ___ حَوْلَ المَرِيضِ. (مُجْتَمِعَة)", "مُجْتَمِعَاتٍ", "مُجْتَمِعَاتٌ", "مُجْتَمِعَةً", "Kadın doktorlar hastanın etrafında toplanmıştı.", "Haber cem-i müennes: esreyle mansûb."],
      ["مَا زَالَ الأَوْلَادُ ___ فِي الحَدِيقَةِ. (لَاعِب)", "لَاعِبِينَ", "لَاعِبُونَ", "لَاعِبًا", "Çocuklar hâlâ bahçede oynuyor.", "Haber cem-i müzekker: yâ ile mansûb."],
      ["ظَلَّ ___ يَعْمَلُونَ فِي المَزْرَعَةِ. (الفَلَّاح)", "الفَلَّاحُونَ", "الفَلَّاحِينَ", "الفَلَّاحُ", "Çiftçiler tarlada çalışmaya devam etti.", "İsim: vâv ile merfû; يَعْمَلُونَ çoğul ister."],
      ["أَصْبَحَتِ النِّسَاءُ ___ حُقُوقَهُنَّ. (مُطَالِبَة)", "مُطَالِبَاتٍ", "مُطَالِبَاتٌ", "مُطَالِبِينَ", "Kadınlar haklarını ister oldu.", "Cem-i müennes haber: esreyle mansûb."],
      ["لَيْسَ ___ مَوْجُودِينَ فِي الاجْتِمَاعِ. (الصَّحَفِيّ)", "الصَّحَفِيُّونَ", "الصَّحَفِيِّينَ", "الصَّحَفِيُّ", "Gazeteciler toplantıda değil.", "İsim merfû (vâv); haber مَوْجُودِينَ çoğul."],
      ["كَانَ المُسْلِمُونَ ___ نَحْوَ بَيْتِ المَقْدِسِ فِي صَلَاتِهِمْ. (يَتَوَجَّه)", "يَتَوَجَّهُونَ", "يَتَوَجَّهُ", "يَتَوَجَّهْنَ", "Müslümanlar namazda Beytü’l-Makdis’e yönelirdi.", "Haber fiil cümlesi; fiil, ismine (المُسْلِمُونَ) uyar."],
      ["أَصْبَحَتِ المَرْأَتَانِ ___ الرِّيَاضَةَ. (يُمَارِس)", "تُمَارِسَانِ", "تُمَارِسُ", "يُمَارِسَانِ", "İki kadın spor yapar oldu.", "Müsennâ müennes: تُمَارِسَانِ."],
      ["كَانَ المُهَنْدِسُونَ ___ عَلَى المَشْرُوعِ. (عَامِل)", "عَامِلِينَ", "عَامِلُونَ", "عَامِلًا", "Mühendisler proje üzerinde çalışıyordu.", "Haber cem-i müzekker: yâ ile mansûb."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الصُّورَةَ الصَّحِيحَةَ لِلْفِعْلِ مَعَ الضَّمِيرِ", tr: "Parantezdeki zamire göre fiilin doğru çekimini seç.", items: PL([
      ["___ فَقِيرًا فَأَصْبَحْتُ غَنِيًّا. (أَنَا)", "كُنْتُ", "كَانَ أَنَا", "كَانَتْ", "Fakirdim, zengin oldum.", "أَنَا → كُنْتُ."],
      ["___ طُلَّابًا فِي هَذِهِ المَدْرَسَةِ. (نَحْنُ)", "كُنَّا", "كَانَ نَحْنُ", "كُنَّ", "Bu okulda öğrenciydik.", "نَحْنُ → كُنَّا."],
      ["___ ذَاهِبِينَ إِلَى المَدْرَسَةِ. (هُمْ)", "لَيْسُوا", "لَيْسَ هُمْ", "لَسْنَ", "Okula gitmiyorlar.", "هُمْ → لَيْسُوا."],
      ["___ أَدْرِي حَقِيقَةَ هَذَا الأَمْرِ. (أَنَا)", "لَسْتُ", "لَيْسَ أَنَا", "لَيْسَنِي", "Bu işin aslını bilmiyorum.", "لَيْسَ + تُ → لَسْتُ (yâ düşer)."],
      ["___ مُعَلِّمَاتٍ مُخْلِصَاتٍ. (هُنَّ)", "كُنَّ", "كَانُوا", "كُنَّا", "Onlar (kadın) ihlaslı öğretmenlerdi.", "هُنَّ → كُنَّ."],
      ["___ مُتْعَبًا بَعْدَ العَمَلِ. (أَنْتَ)", "أَمْسَيْتَ", "أَمْسَيْتِ", "أَمْسَى أَنْتَ", "İşten sonra akşam yorgun düştün.", "أَنْتَ → أَمْسَيْتَ."],
      ["___ طَالِبَةً نَشِيطَةً. (أَنْتِ)", "كُنْتِ", "كُنْتَ", "كَانَ أَنْتِ", "Çalışkan bir kız öğrenciydin.", "أَنْتِ → كُنْتِ."],
      ["___ مَشْغُولِينَ اليَوْمَ. (أَنْتُمْ)", "لَسْتُمْ", "لَيْسُوا", "لَيْسَ أَنْتُمْ", "Bugün meşgul değilsiniz.", "أَنْتُمْ → لَسْتُمْ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · HABERİN TÜRLERİ
{
  id: "u3", no: 3, ar: "أَنْوَاعُ خَبَرِ كَانَ", tr: "Haberin Türleri ve İ’rab", short: "Haber türü", col: "nasb", legend: ["mz", "cerr", "nasb"],
  goals: ["Kâne’nin haberinin müfred, cümle ya da şibh-i cümle olabildiğini bilmek", "Cümle ve şibh-i cümle haberin “mahallen mansûb” olduğunu bilmek", "İsim ve haberi harekeleyip i’rabını söylemek"],
  examples: [
    { s: "مَا زَالَ:mz / شَرِيفٌ:cerr / مُتْعَبًا.:nasb", tr: "Şerif hâlâ yorgun. (müfred)" },
    { s: "كَانَتِ:mz / البِنْتُ:cerr / تَبْكِي مِنَ الأَلَمِ.:nasb", tr: "Kız acıdan ağlıyordu. (fiil cümlesi)", pair: "لَيْسَ:mz / المَرِيضُ:cerr / حَالَتُهُ خَطِيرَةٌ.:nasb", pairTr: "Hastanın durumu ağır değil. (isim cümlesi)" },
    { s: "مَا زَالَ:mz / الطَّبِيبُ:cerr / فِي المُسْتَشْفَى.:nasb", tr: "Doktor hâlâ hastanede. (câr-mecrûr)", pair: "ظَلَّ:mz / العَالَمُ الإِسْلَامِيُّ:cerr / تَحْتَ ظُلْمِ الاسْتِعْمَارِ:nasb / سِنِينَ طَوِيلَةً.:-", pairTr: "İslam dünyası uzun yıllar sömürgeciliğin zulmü altında kaldı. (zarf)" }
  ],
  rules: [
    { tr: "Kâne’nin haberi üç türlü gelir:", ex: ["Müfred: مَا زَالَ شَرِيفٌ مُتْعَبًا", "Cümle: كَانَتِ البِنْتُ تَبْكِي (fiil) · لَيْسَ المَرِيضُ حَالَتُهُ خَطِيرَةٌ (isim)", "Şibh-i cümle: مَا زَالَ الطَّبِيبُ فِي المُسْتَشْفَى (câr-mecrûr) · ظَلَّ العَالَمُ تَحْتَ ظُلْمِ… (zarf)"] },
    { tr: "Haber cümle ya da şibh-i cümle ise kendi harekesi değişmez; bütünü <b>mahallen mansûb</b>dur. Cümle haberde isme dönen bir zamir (râbıt) bulunur: <span class=\"ar\">تَبْكِي</span> (gizli هِيَ), <span class=\"ar\">حَالَتُهُ</span> (ـهُ)." },
    { tr: "Dikkat: isim cümlesi haberin içindeki haber <b>merfû</b> kalır: <span class=\"ar\">لَيْسَ المَرِيضُ حَالَتُهُ خَطِيرَةٌ</span>." },
    { tr: "İ’rab örneği: <span class=\"ar\">مَا زَالَتْ: فِعْلٌ مَاضٍ نَاقِصٌ · زَيْنَبُ: اسْمُ مَا زَالَ مَرْفُوعٌ · جَالِسَةً: خَبَرُ مَا زَالَ مَنْصُوبٌ</span>." }
  ],
  kaide: ["٤ ـ خَبَرُ «كَانَ وَأَخَوَاتِهَا» قَدْ يَأْتِي: أ ـ مُفْرَدًا، مِثْلُ: مَا زَالَ شَرِيفٌ مُتْعَبًا. ب ـ جُمْلَةً فِعْلِيَّةً، مِثْلُ: كَانَتِ البِنْتُ تَبْكِي مِنَ الأَلَمِ، أَوِ اسْمِيَّةً، مِثْلُ: لَيْسَ المَرِيضُ حَالَتُهُ خَطِيرَةٌ. جـ ـ شِبْهَ جُمْلَةٍ، جَارًّا وَمَجْرُورًا، مِثْلُ: مَا زَالَ الطَّبِيبُ فِي المُسْتَشْفَى، أَوْ ظَرْفًا، مِثْلُ: ظَلَّ العَالَمُ الإِسْلَامِيُّ تَحْتَ ظُلْمِ الاسْتِعْمَارِ سِنِينَ طَوِيلَةً."],
  ex: [
    { type: "classify", extra: true, opts: HTUR, ar: "مَا نَوْعُ خَبَرِ كَانَ؟", tr: "Koyu haber hangi türden?", items: CL([
      [HL("مَا زَالَ شَرِيفٌ مُتْعَبًا", "مُتْعَبًا"), "m", "Tek kelime."],
      [HL("كَانَتِ البِنْتُ تَبْكِي مِنَ الأَلَمِ", "تَبْكِي مِنَ الأَلَمِ"), "f", "Fiil cümlesi (gizli هِيَ)."],
      [HL("لَيْسَ المَرِيضُ حَالَتُهُ خَطِيرَةٌ", "حَالَتُهُ خَطِيرَةٌ"), "i", "İsim cümlesi (râbıt ـهُ)."],
      [HL("مَا زَالَ الطَّبِيبُ فِي المُسْتَشْفَى", "فِي المُسْتَشْفَى"), "s", "Câr-mecrûr."],
      [HL("ظَلَّ العَالَمُ الإِسْلَامِيُّ تَحْتَ ظُلْمِ الاسْتِعْمَارِ", "تَحْتَ ظُلْمِ الاسْتِعْمَارِ"), "s", "Zarf."],
      [HL("كَانَ عُمَرُ يَسِيرُ فِي المَدِينَةِ", "يَسِيرُ فِي المَدِينَةِ"), "f", "Fiil cümlesi."],
      [HL("مَا دَامَتِ النَّارُ تَحْتَ القِدْرِ", "تَحْتَ القِدْرِ"), "s", "Zarf."],
      [HL("كَانَ ثَوْبِي عَلَى الحَبْلِ", "عَلَى الحَبْلِ"), "s", "Câr-mecrûr."],
      [HL("أَصْبَحَ المَرِيضُ صِحَّتُهُ جَيِّدَةٌ", "صِحَّتُهُ جَيِّدَةٌ"), "i", "İsim cümlesi."],
      [HL("صَارَ الأَمْرُ صَعْبًا", "صَعْبًا"), "m", "Müfred."],
      [HL("كَانَ المُسْلِمُونَ يَتَوَجَّهُونَ نَحْوَ بَيْتِ المَقْدِسِ", "يَتَوَجَّهُونَ نَحْوَ بَيْتِ المَقْدِسِ"), "f", "Fiil cümlesi."]
    ]) },
    { type: "pick", fill: true, num: "٤", ar: "أَكْمِلِ الجُمَلَ التَّالِيَةَ بِوَضْعِ الخَبَرِ مَعَ الضَّبْطِ بِالشَّكْلِ", tr: "Boşluğa doğru harekeli haberi seç.", items: PL([
      ["كُنْتُ ___ فِي طَرِيقِي إِلَى العَمَلِ.", "مُسْرِعًا", "مُسْرِعٌ", "مُسْرِعٍ", "İşe giderken acele ediyordum.", "Haber mansûb; isim ـتُ."],
      ["لَيْسَ هَؤُلَاءِ الطُّلَّابُ ___.", "غَائِبِينَ", "غَائِبُونَ", "غَائِبًا", "Bu öğrenciler yok değil (buradalar).", "Cem-i müzekker haber: yâ ile."],
      ["أَضْحَتْ حَدِيقَةُ الجَامِعَةِ ___.", "جَمِيلَةً", "جَمِيلَةٌ", "جَمِيلًا", "Üniversitenin bahçesi güzel oldu.", "Haber müennes ve mansûb."],
      ["صَارَتْ غُرْفَةُ عَائِشَةَ ___ بِالكُتُبِ.", "مَلِيئَةً", "مَلِيئَةٌ", "مَلِيئًا", "Âişe’nin odası kitaplarla doldu.", "Haber müennes ve mansûb."],
      ["كَانَتْ أَوَّلُ زَوْجَاتِ الرَّسُولِ ﷺ ___.", "خَدِيجَةَ", "خَدِيجَةُ", "خَدِيجَةً", "Resûlullah’ın ilk hanımı Hadîce idi.", "Gayr-i munsarif: tenvinsiz fetha ile mansûb."],
      ["أَمْسَى الأَطْفَالُ ___.", "نَائِمِينَ", "نَائِمُونَ", "نَائِمًا", "Çocuklar akşam uyudular.", "Cem-i müzekker haber: yâ ile."],
      ["اِلْبَسْ مِعْطَفَكَ مَا دَامَ الطَّقْسُ ___.", "بَارِدًا", "بَارِدٌ", "بَارِدٍ", "Hava soğuk olduğu sürece paltonu giy.", "مَا دَامَ: haber mansûb."],
      ["مَا زَالَ الوَضْعُ الاقْتِصَادِيُّ ___ فِي البَلَدِ.", "صَعْبًا", "صَعْبٌ", "صَعْبٍ", "Ülkede ekonomik durum hâlâ zor.", "Haber mansûb."]
    ])},
    { type: "combo", num: "٥", ar: "اضْبِطْ بِالشَّكْلِ الكَلِمَةَ الَّتِي تَحْتَهَا خَطٌّ وَبَيِّنْ سَبَبَ الضَّبْطِ", tr: "Her kutuya dokunup doğru harekeyi seç: isim merfû, haber mansûb.", exHtml: "<span class=\"ar\">مَا زَالَتْ زَيْنَبُ جَالِسَةً فِي المَكْتَبَةِ ← زَيْنَبُ: اسْمُ مَا زَالَ مَرْفُوعٌ</span>", items: [
      CBP(["ظَلَّتْ", ["أَبْوَابُ", "أَبْوَابَ", "أَبْوَابِ"], "المَصَانِعِ", ["مُغْلَقَةً", "مُغْلَقَةٌ", "مُغْلَقَةٍ"]], 0, "Fabrikaların kapıları kapalı kaldı.", "أَبْوَابُ: اسْمُ ظَلَّ مَرْفُوعٌ · مُغْلَقَةً: خَبَرُ ظَلَّ مَنْصُوبٌ"),
      CBP(["كَانَ", ["الرَّجُلُ", "الرَّجُلَ", "الرَّجُلِ"], ["مُتَّجِهًا", "مُتَّجِهٌ", "مُتَّجِهٍ"], "إِلَى اليَمِينِ"], 1, "Adam sağa yönelmişti.", "الرَّجُلُ: اسْمُ كَانَ مَرْفُوعٌ · مُتَّجِهًا: خَبَرُ كَانَ مَنْصُوبٌ"),
      CBP(["ظَلَّتْ", ["رَوَاتِبُ", "رَوَاتِبَ", "رَوَاتِبِ"], "العُمَّالِ", ["مُنْخَفِضَةً", "مُنْخَفِضَةٌ", "مُنْخَفِضَةٍ"]], 2, "İşçilerin maaşları düşük kaldı.", "رَوَاتِبُ: اسْمُ ظَلَّ مَرْفُوعٌ · مُنْخَفِضَةً: خَبَرُ ظَلَّ مَنْصُوبٌ"),
      CBP(["أَصْبَحَتْ", ["نَتَائِجُ", "نَتَائِجَ", "نَتَائِجِ"], "الحَرْبِ", ["كَارِثَةً", "كَارِثَةٌ", "كَارِثَةٍ"]], 3, "Savaşın sonuçları felaket oldu.", "نَتَائِجُ: اسْمُ أَصْبَحَ مَرْفُوعٌ · كَارِثَةً: خَبَرُ أَصْبَحَ مَنْصُوبٌ"),
      CBP(["صَارَ هَذَا", ["الوَضْعُ", "الوَضْعَ", "الوَضْعِ"], "بِالنِّسْبَةِ لِي", ["مُفَاجَأَةً", "مُفَاجَأَةٌ", "مُفَاجَأَةٍ"]], 4, "Bu durum benim için sürpriz oldu.", "هَذَا: اسْمُ صَارَ (mahallen merfû) · الوَضْعُ: بَدَلٌ مَرْفُوعٌ · مُفَاجَأَةً: خَبَرُ صَارَ مَنْصُوبٌ"),
      CBP(["أَمْسَتِ", ["الإِنْتَاجَاتُ", "الإِنْتَاجَاتِ", "الإِنْتَاجَاتَ"], "الزِّرَاعِيَّةُ", ["مُتَزَايِدَةً", "مُتَزَايِدَةٌ", "مُتَزَايِدَةٍ"]], 5, "Tarım ürünleri artar oldu.", "الإِنْتَاجَاتُ: اسْمُ أَمْسَى مَرْفُوعٌ · مُتَزَايِدَةً: خَبَرُ أَمْسَى مَنْصُوبٌ"),
      CBP(["لَيْسَ", ["الأَمْرُ", "الأَمْرَ", "الأَمْرِ"], "فِي هَذِهِ البَسَاطَةِ كَمَا تَظُنُّ"], 6, "Mesele sandığın kadar basit değil.", "الأَمْرُ: اسْمُ لَيْسَ مَرْفُوعٌ · فِي هَذِهِ البَسَاطَةِ: haber (şibh-i cümle)"),
      CBP(["أَتَعَبَّدُ رَبِّي مَا دُمْتُ", ["حَيًّا", "حَيٌّ", "حَيٍّ"]], 7, "Yaşadığım sürece Rabbime kulluk ederim.", "تُ: اسْمُ مَا دَامَ (mahallen merfû) · حَيًّا: خَبَرُ مَا دَامَ مَنْصُوبٌ")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · ÇEKİM VE DÖNÜŞÜM
{
  id: "u4", no: 4, ar: "تَصْرِيفُ كَانَ وَالاسْتِبْدَالُ", tr: "Kâne’nin Çekimi ve Dönüşüm", short: "Çekim", col: "ref", legend: ["mz", "cerr", "nasb"],
  goals: ["Kâne’yi mâzî, muzâri ve emir olarak kullanmak: كُنْتُ، سَأَكُونُ، كُنْ", "Bir kelime değişince cümledeki her şeyi ona uydurmak", "Kâne grubu ile inne grubunu ayırmak"],
  examples: [
    { s: "كُنْ:mz / تُ:cerr / طَالِبًا.:nasb", tr: "Öğrenciydim. (mâzî)", pair: "سَأَكُونُ:mz / مُدَرِّسًا.:nasb", pairTr: "Öğretmen olacağım. (muzâri, isim gizli أَنَا)" },
    { s: "كُنْ:mz / عَالِمًا:nasb / أَوْ مُتَعَلِّمًا.:-", tr: "Ya âlim ol ya öğrenci. (emir, isim gizli أَنْتَ)" },
    { s: "وَلَمْ:- / يَكُنِ:mz / الرَّاعِي:cerr / كَاذِبًا.:nasb", tr: "Çoban (bu sefer) yalancı değildi." }
  ],
  rules: [
    { tr: "<span class=\"ar\">كَانَ</span> tam çekilen bir fiildir:", ex: ["Mâzî: كُنْتُ طَالِبًا", "Muzâri: سَأَكُونُ مُدَرِّسًا · لَمْ يَكُنْ (meczûm)", "Emir: كُنْ عَالِمًا · كُونِي · كُونُوا"] },
    { tr: "Kardeşleri de çekilir: <span class=\"ar\">يُصْبِحُ، يَظَلُّ، يُمْسِي، يَصِيرُ، لَا يَزَالُ</span>. Ama <span class=\"ar\">لَيْسَ</span> ve <span class=\"ar\">مَا دَامَ</span> câmiddir; yalnız mâzî biçimiyle kullanılır (<span class=\"ar\">لَيْسَ</span> şimdiki zamanı olumsuzlar)." },
    { tr: "Bir kelime değişince <b>zincirleme</b> değişir: isim müennes olunca fiil <span class=\"ar\">ـتْ</span> alır, haber de müennes olur: <span class=\"ar\">مَا زَالَ الرَّجُلُ مَرِيضًا ← مَا زَالَتِ البِنْتُ مَرِيضَةً</span>." },
    { tr: "Kâne grubu (fiil): ismi merfû, haberi mansûb · İnne grubu (harf): ismi mansûb, haberi merfû." }
  ],
  kaide: ["٥ ـ «كَانَ» تُسْتَعْمَلُ مَاضِيًا، مِثْلُ: كُنْتُ طَالِبًا، وَمُضَارِعًا، مِثْلُ: سَأَكُونُ مُدَرِّسًا، وَأَمْرًا، مِثْلُ: كُنْ عَالِمًا أَوْ مُتَعَلِّمًا."],
  ex: [
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ الصِّيغَةَ الصَّحِيحَةَ لِـ«كَانَ»", tr: "Kâne’nin doğru biçimini seç: mâzî, muzâri ya da emir.", items: PL([
      ["___ مُدَرِّسًا بَعْدَ سَنَتَيْنِ. (أَنَا، gelecek)", "سَأَكُونُ", "سَأَكُنْ", "سَيَكُونُ", "İki yıl sonra öğretmen olacağım.", "Muzâri + سَـ: سَأَكُونُ."],
      ["___ عَالِمًا أَوْ مُتَعَلِّمًا. (أَنْتَ، emir)", "كُنْ", "كُونُ", "كَانَ", "Ya âlim ol ya öğrenci.", "Emir: كُنْ (vâv düşer)."],
      ["___ صَادِقِينَ. (أَنْتُمْ، emir)", "كُونُوا", "كُنْتُمْ", "كُنْ", "Doğru olun.", "Emir çoğul: كُونُوا."],
      ["___ مُؤَدَّبَةً يَا بِنْتِي. (أَنْتِ، emir)", "كُونِي", "كُنْتِ", "كُنْ", "Edepli ol kızım.", "Emir müennes: كُونِي."],
      ["وَلَمْ ___ الرَّاعِي كَاذِبًا.", "يَكُنِ", "يَكُونُ", "يَكُونَ", "Çoban yalancı değildi.", "لَمْ muzâriyi cezmeder: يَكُنْ (sonraki sâkin için esre)."],
      ["يَجِبُ أَنْ ___ نَشِيطًا. (أَنْتَ)", "تَكُونَ", "تَكُونُ", "تَكُنْ", "Çalışkan olman gerekir.", "أَنْ muzâriyi nasbeder: تَكُونَ."],
      ["لَا ___ كَسُولًا. (أَنْتَ)", "تَكُنْ", "تَكُونُ", "كُنْ", "Tembel olma.", "Nehy lâ’sı cezmeder: لَا تَكُنْ."],
      ["لَا ___ الطَّبِيبُ فِي المُسْتَشْفَى.", "يَزَالُ", "يَزُولُ", "زَالَ", "Doktor hâlâ hastanede.", "مَا زَالَ’in muzârisi: لَا يَزَالُ."]
    ])},
    { type: "pick", num: "٣", ar: "اسْتَبْدِلْ بِمَا بَيْنَ القَوْسَيْنِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Zincir: her adımda bir önceki cümleyi parantezdeki kelimeye göre değiştir.", exHtml: "<span class=\"ar\">أَصْبَحَ الرَّجُلُ مَرِيضًا.</span>", items: PL([
      ["(مَا زَالَ)", "مَا زَالَ الرَّجُلُ مَرِيضًا.", "مَا زَالَ الرَّجُلَ مَرِيضٌ.", "مَا زَالَ الرَّجُلُ مَرِيضٌ.", "Adam hâlâ hasta.", "Yalnız fiil değişir."],
      ["(البِنْتُ)", "مَا زَالَتِ البِنْتُ مَرِيضَةً.", "مَا زَالَ البِنْتُ مَرِيضًا.", "مَا زَالَتِ البِنْتُ مَرِيضًا.", "Kız hâlâ hasta.", "Fiil ve haber müennes olur."],
      ["(بَاكِيَةٌ)", "مَا زَالَتِ البِنْتُ بَاكِيَةً.", "مَا زَالَتِ البِنْتُ بَاكِيَةٌ.", "مَا زَالَتِ البِنْتَ بَاكِيَةٌ.", "Kız hâlâ ağlıyor.", "Haber mansûb: بَاكِيَةً."],
      ["(ظَلَّتْ)", "ظَلَّتِ البِنْتُ بَاكِيَةً.", "ظَلَّتِ البِنْتَ بَاكِيَةٌ.", "ظَلَّ البِنْتُ بَاكِيًا.", "Kız ağlayıp durdu.", "Yalnız fiil değişir."],
      ["(الوَلَدُ)", "ظَلَّ الوَلَدُ بَاكِيًا.", "ظَلَّتِ الوَلَدُ بَاكِيَةً.", "ظَلَّ الوَلَدُ بَاكِيَةً.", "Çocuk ağlayıp durdu.", "Fiil ve haber müzekker olur."],
      ["(وَاقِفٌ)", "ظَلَّ الوَلَدُ وَاقِفًا.", "ظَلَّ الوَلَدُ وَاقِفٌ.", "ظَلَّ الوَلَدَ وَاقِفًا.", "Çocuk ayakta kaldı.", "Haber mansûb: وَاقِفًا."],
      ["(كَانَ)", "كَانَ الوَلَدُ وَاقِفًا.", "كَانَ الوَلَدُ وَاقِفٌ.", "كَانَتِ الوَلَدُ وَاقِفًا.", "Çocuk ayaktaydı.", "Yalnız fiil değişir."],
      ["(المُدِيرَةُ)", "كَانَتِ المُدِيرَةُ وَاقِفَةً.", "كَانَ المُدِيرَةُ وَاقِفًا.", "كَانَتِ المُدِيرَةُ وَاقِفًا.", "Müdire ayaktaydı.", "Fiil ve haber müennes olur."]
    ])},
    { type: "classify", extra: true, opts: GRUP, ar: "مِنْ أَخَوَاتِ كَانَ أَمْ مِنْ أَخَوَاتِ إِنَّ؟", tr: "Boşluğa gelen nâsih hangi gruptan? Harekelere bak.", items: CL([
      ["…… الشَّارِعُ وَاسِعًا", "k", "İsim merfû, haber mansûb: kâne grubu."], ["…… الشَّارِعَ وَاسِعٌ", "i", "İsim mansûb, haber merfû: inne grubu."],
      ["…… المُسْلِمُونَ جَسَدًا وَاحِدًا", "k", "جَسَدًا mansûb."], ["…… المُسْلِمِينَ جَسَدٌ وَاحِدٌ", "i", "المُسْلِمِينَ mansûb."],
      ["…… الطَّالِبَتَانِ غَائِبَتَيْنِ", "k", "Haber yâ ile mansûb."], ["…… الطَّالِبَتَيْنِ غَائِبَتَانِ", "i", "İsim yâ ile mansûb."],
      ["…… المُعَلِّمَاتُ مُخْلِصَاتٍ", "k", "Haber esreyle mansûb."], ["…… المُعَلِّمَاتِ مُخْلِصَاتٌ", "i", "Cem-i müennes isim esreyle mansûb."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMALAR
{
  id: "u5", no: 5, ar: "آيَاتٌ وَقِرَاءَاتٌ", tr: "Âyetler ve Okumalar", short: "Okumalar", col: "muz", legend: ["mz", "cerr", "nasb"],
  goals: ["Âyetlerde kâne ve kardeşlerinin ismini ve haberini bulmak", "Öne geçmiş haberi ve harf-i cerli haberi tanımak: لَيْسَ كَمِثْلِهِ شَيْءٌ", "Hz. Ömer’in ve Nasreddin Hoca’nın (Cuhâ) hikâyelerini okuyup anlamak"],
  examples: [
    { s: "وَكَانَ:mz / اللهُ:cerr / عَلِيمًا حَكِيمًا:nasb", tr: "Allah her şeyi bilendir, hüküm ve hikmet sahibidir. (Nisâ 17)" },
    { s: "لَيْسَ:mz / كَمِثْلِهِ:nasb / شَيْءٌ:cerr", tr: "O’nun benzeri hiçbir şey yoktur. (Şûrâ 11) · haber öne geçmiş" }
  ],
  rules: [
    { tr: "Haber şibh-i cümle ise isimden önce gelebilir; isim yine merfûdur: <span class=\"ar\">لَيْسَ كَمِثْلِهِ شَيْءٌ</span>." },
    { tr: "<span class=\"ar\">لَيْسَ</span>’in haberine zâid <span class=\"ar\">بِـ</span> gelebilir; haber lafzen mecrûr, mahallen mansûb olur: <span class=\"ar\">أَلَيْسَ اللهُ بِأَحْكَمِ الحَاكِمِينَ</span>." },
    { tr: "Habere atfedilen kelime de mansûbdur: <span class=\"ar\">مَا كَانَ إِبْرَاهِيمُ يَهُودِيًّا وَلَا نَصْرَانِيًّا</span>." },
    { tr: "Her “mansûb” kelime haber değildir: <span class=\"ar\">عَادَ… مَرِيضًا</span>’da <span class=\"ar\">عَادَ</span> nâsih değil, <span class=\"ar\">مَرِيضًا</span> hâldir." }
  ],
  kaide: ["عَيِّنِ الاسْمَ وَالخَبَرَ لِكُلٍّ مِنْ «كَانَ وَأَخَوَاتِهَا» وَاضْبِطْهُمَا."],
  ex: [
    { type: "tag", roles: ["mz", "cerr", "nasb", "x"], num: "٨", ar: "عَيِّنِ الاسْمَ وَالخَبَرَ لِكُلٍّ مِنْ «كَانَ وَأَخَوَاتِهَا» فِيمَا يَلِي", tr: "Âyetlerde Kâne / kardeşi, İsmi, Haberi ve Başka parçaları etiketle.", exHtml: "<span class=\"ar\">﴿وَكَانَ اللهُ عَلِيمًا حَكِيمًا﴾ ← الاسْمُ: اللهُ · الخَبَرُ: عَلِيمًا حَكِيمًا</span>", items: [
      T("وَكَانَتِ:mz / امْرَأَتِي:cerr / عَاقِرًا:nasb", "Karım da kısırdı. (Meryem 5)", "İsim امْرَأَتِي (takdîren merfû), haber عَاقِرًا mansûb."),
      T("وَأَوْصَانِي بِالصَّلَاةِ وَالزَّكَاةِ:x / مَا دُمْ:mz / تُ:cerr / حَيًّا:nasb", "Yaşadığım sürece bana namazı ve zekâtı emretti. (Meryem 31)", "İsim ـتُ (mahallen merfû), haber حَيًّا."),
      T("ظَلَّ:mz / وَجْهُهُ:cerr / مُسْوَدًّا:nasb", "Yüzü kapkara kesilir. (Nahl 58)", "İsim وَجْهُهُ, haber مُسْوَدًّا."),
      T("فَأَصْبَحْ:mz / تُمْ:cerr / بِنِعْمَتِهِ:x / إِخْوَانًا:nasb", "O’nun nimetiyle kardeşler oldunuz. (Âl-i İmrân 103)", "İsim ـتُمْ, haber إِخْوَانًا; بِنِعْمَتِهِ habere bağlı."),
      T("لَيْسَ:mz / كَمِثْلِهِ:nasb / شَيْءٌ:cerr", "O’nun benzeri hiçbir şey yoktur. (Şûrâ 11)", "Haber كَمِثْلِهِ öne geçmiş (şibh-i cümle); isim شَيْءٌ merfû."),
      T("مَا:x / كَانَ:mz / إِبْرَاهِيمُ:cerr / يَهُودِيًّا:nasb / وَلَا نَصْرَانِيًّا:x", "İbrahim ne Yahudi ne Hristiyandı. (Âl-i İmrân 67)", "Haber يَهُودِيًّا; نَصْرَانِيًّا ona atfedilmiş (o da mansûb)."),
      T("وَأَصْبَحَ:mz / فُؤَادُ أُمِّ مُوسَى:cerr / فَارِغًا:nasb", "Mûsâ’nın annesinin yüreği bomboş oldu. (Kasas 10)", "İsim فُؤَادُ (muzâf), haber فَارِغًا."),
      T("أَ:x / لَيْسَ:mz / اللهُ:cerr / بِأَحْكَمِ الحَاكِمِينَ:nasb", "Allah hâkimlerin en hâkimi değil midir? (Tîn 8)", "Haber بِأَحْكَمِ: zâid bâ ile lafzen mecrûr, mahallen mansûb.")
    ]},
    { type: "reading", num: "٧", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ أَجِبْ", tr: "Metni oku, soruları cevapla; sonra koyu kelimenin görevini seç.", title: "عُمَرُ وَالمَرْأَةُ وَالأَطْفَالُ",
      text: "كَانَ عُمَرُ بْنُ الخَطَّابِ يَسِيرُ فِي المَدِينَةِ المُنَوَّرَةِ فِي لَيْلَةٍ، فَرَأَى نَارًا مِنْ بَعِيدٍ. فَسَارَ إِلَيْهَا حَتَّى أَصْبَحَ قَرِيبًا مِنْهَا، فَإِذَا بِامْرَأَةٍ أَمَامَهَا قِدْرٌ عَلَى النَّارِ، وَحَوْلَهَا أَطْفَالٌ يَبْكُونَ. ظَلَّ عُمَرُ وَاقِفًا، ثُمَّ تَقَدَّمَ مِنَ المَرْأَةِ فَبَدَأَ يَتَكَلَّمُ مَعَهَا، وَعَلِمَ أَنَّ المَرْأَةَ قَدْ أَوْقَدَتِ النَّارَ تَحْتَ القِدْرِ كَيْ يَحْسَبَ الأَطْفَالُ أَنَّ فِي القِدْرِ طَعَامًا، فَيَتَوَقَّفُوا عَنِ البُكَاءِ مَا دَامَتِ النَّارُ تَحْتَ القِدْرِ. فَاتَّجَهَ عُمَرُ إِلَى بَيْتِ المَالِ، فَرَجَعَ إِلَى المَرْأَةِ بِالطَّعَامِ. وَمَا زَالَ عُمَرُ مَعَ المَرْأَةِ وَالأَطْفَالِ حَتَّى ظَهَرَ الابْتِسَامُ عَلَى وُجُوهِهِمْ. ثُمَّ تَرَكَهُمْ وَانْصَرَفَ.",
      textTr: "Ömer b. Hattâb bir gece Medîne-i Münevvere’de yürüyordu; uzaktan bir ateş gördü. Ona doğru yürüdü, yaklaşınca bir de baktı ki önünde ateşin üstünde bir tencere olan bir kadın, etrafında da ağlayan çocuklar var. Ömer bir süre ayakta durdu, sonra kadına yaklaşıp onunla konuşmaya başladı. Kadının, çocuklar tencerede yemek var sansınlar ve tencerenin altında ateş olduğu sürece ağlamayı bıraksınlar diye ateşi yaktığını öğrendi. Ömer hemen beytülmâle gitti ve kadına yiyecekle döndü. Yüzlerinde tebessüm belirinceye kadar kadın ve çocuklarla kaldı. Sonra onları bırakıp gitti.",
      qa: [
        { q: "أَيْنَ كَانَ عُمَرُ يَسِيرُ؟", a: "كَانَ يَسِيرُ فِي المَدِينَةِ المُنَوَّرَةِ.", tr: "Ömer nerede yürüyordu? Medîne-i Münevvere’de." },
        { q: "لِمَاذَا كَانَ الأَطْفَالُ يَبْكُونَ؟", a: "كَانُوا جَائِعِينَ؛ لَمْ يَكُنْ فِي القِدْرِ طَعَامٌ.", tr: "Çocuklar neden ağlıyordu? Açtılar; tencerede yemek yoktu." },
        { q: "مَاذَا أَحْضَرَ عُمَرُ لِلْمَرْأَةِ وَالأَطْفَالِ؟", a: "أَحْضَرَ لَهُمْ طَعَامًا مِنْ بَيْتِ المَالِ.", tr: "Ömer onlara ne getirdi? Beytülmâlden yiyecek." }
      ],
      cls: { opts: ROL3, ar: "عَيِّنْ فِي القِطْعَةِ كَانَ وَأَخَوَاتِهَا ثُمَّ بَيِّنِ اسْمَهَا وَخَبَرَهَا", tr: "Koyu kelimenin görevi ne?", items: [
        { s: HL("كَانَ عُمَرُ بْنُ الخَطَّابِ يَسِيرُ", "كَانَ"), a: "h", why: "فِعْلٌ مَاضٍ نَاقِصٌ." },
        { s: HL("كَانَ عُمَرُ بْنُ الخَطَّابِ يَسِيرُ", "عُمَرُ"), a: "i", why: "اسْمُ كَانَ مَرْفُوعٌ (gayr-i munsarif)." },
        { s: HL("كَانَ عُمَرُ بْنُ الخَطَّابِ يَسِيرُ فِي المَدِينَةِ", "يَسِيرُ فِي المَدِينَةِ"), a: "b", why: "Haber fiil cümlesi: mahallen mansûb." },
        { s: HL("حَتَّى أَصْبَحَ قَرِيبًا مِنْهَا", "قَرِيبًا"), a: "b", why: "خَبَرُ أَصْبَحَ مَنْصُوبٌ; isim gizli هُوَ." },
        { s: HL("ظَلَّ عُمَرُ وَاقِفًا", "ظَلَّ"), a: "h", why: "Nâsih fiil." },
        { s: HL("ظَلَّ عُمَرُ وَاقِفًا", "وَاقِفًا"), a: "b", why: "خَبَرُ ظَلَّ مَنْصُوبٌ." },
        { s: HL("مَا دَامَتِ النَّارُ تَحْتَ القِدْرِ", "النَّارُ"), a: "i", why: "اسْمُ مَا دَامَ مَرْفُوعٌ." },
        { s: HL("مَا دَامَتِ النَّارُ تَحْتَ القِدْرِ", "تَحْتَ القِدْرِ"), a: "b", why: "Haber zarf (şibh-i cümle)." },
        { s: HL("وَمَا زَالَ عُمَرُ مَعَ المَرْأَةِ", "مَا زَالَ"), a: "h", why: "Nâsih fiil." },
        { s: HL("وَمَا زَالَ عُمَرُ مَعَ المَرْأَةِ", "مَعَ المَرْأَةِ"), a: "b", why: "Haber zarf." },
        { s: HL("فَرَأَى نَارًا مِنْ بَعِيدٍ", "نَارًا"), a: "x", why: "Mef’ûlün bih: kâne’nin haberi değil." },
        { s: HL("وَعَلِمَ أَنَّ المَرْأَةَ قَدْ أَوْقَدَتِ النَّارَ", "المَرْأَةَ"), a: "x", why: "أَنَّ’nin ismi: inne grubu, kâne değil." }
      ]}
    },
    { type: "reading", ar: "قِرَاءَةٌ حُرَّةٌ: مِنْ حِكَايَاتِ جُحَا", tr: "Hikâyeleri oku, soruları cevapla ve koyu kelimenin görevini seç.", title: "مِنْ حِكَايَاتِ جُحَا",
      text: "كَانَ جُحَا يَتَحَدَّثُ مَعَ امْرَأَتِهِ ذَاتَ لَيْلَةٍ فَقَالَ لَهَا: سَأَذْهَبُ صَبَاحَ غَدٍ لِأَقْطَعَ بَعْضَ الخَشَبِ مِنَ الغَابَةِ، وَإِذَا كَانَ الجَوُّ جَمِيلًا فَسَوْفَ أَرُوحُ إِلَى الحَقْلِ. فَقَالَتِ امْرَأَتُهُ: قُلْ إِنْ شَاءَ اللهُ. فَأَجَابَهَا: وَلِمَاذَا يَلْزَمُ ذَلِكَ؟ لَا تَخْلُو المَسْأَلَةُ مِنْ شَيْئَيْنِ: إِمَّا أَنْ أَجْمَعَ الخَشَبَ وَإِمَّا أَنْ أَذْهَبَ إِلَى أَحَدِ الحُقُولِ. وَفِي الصَّبَاحِ خَرَجَ مِنَ البَلْدَةِ فَصَادَفَ جَمَاعَةً مِنَ الرِّجَالِ فَنَادَوْهُ: يَا عَمُّ، مِنْ أَيْنَ الطَّرِيقُ إِلَى القَرْيَةِ؟ فَأَجَابَهُمْ جُحَا بِدُونِ اهْتِمَامٍ: لَا أَعْلَمُ. فَثَارُوا، وَشَدُّوهُ مِنْ ذِرَاعِهِ، وَأَخَذُوا يَضْرِبُونَهُ بِعَصًا قَائِلِينَ لَهُ: امْشِ أَمَامَنَا وَخُذْنَا إِلَى القَرْيَةِ. وَفِي الطَّرِيقِ نَزَلَ المَطَرُ بِكَثْرَةٍ وَسَالَ مِنْ رَأْسِهِ إِلَى قَدَمَيْهِ، فَأُصِيبَ بِالبَرْدِ، وَعَادَ فِي مُنْتَصَفِ اللَّيْلِ مَرِيضًا. وَطَرَقَ بَابَ الدَّارِ فَقَالَتِ امْرَأَتُهُ: مَنْ بِالبَابِ؟ فَأَجَابَهَا: أَنَا يَا عَزِيزَتِي، افْتَحِي البَابَ إِنْ شَاءَ اللهُ.<br><span class=\"muted\">✦ ✦ ✦</span><br>أَهْدَى فَلَّاحٌ إِلَى جُحَا دِيكًا، فَشَكَرَهُ عَلَى هَدِيَّتِهِ. ثُمَّ زَارَهُ الرَّجُلُ مَرَّةً فَأَحْسَنَ جُحَا اسْتِقْبَالَهُ، وَقَدَّمَ لَهُ طَعَامًا وَشَرَابًا. وَبَعْدَ بِضْعَةِ أَيَّامٍ جَاءَهُ جَمَاعَةٌ مِنَ الفَلَّاحِينَ وَقَالُوا لَهُ: نَحْنُ جِيرَانُ صَاحِبِ الدِّيكِ. فَرَحَّبَ بِهِمْ كَمَا رَحَّبَ بِالزَّائِرِ الأَوَّلِ. وَفِي المَرَّةِ الثَّالِثَةِ زَارَهُ جَمَاعَةٌ آخَرُونَ وَقَالُوا لَهُ: نَحْنُ جِيرَانُ جِيرَانِ صَاحِبِ الدِّيكِ. فَغَضِبَ جُحَا مِنْهُمْ وَأَحْضَرَ لَهُمْ خُبْزًا فِي مَاءٍ وَقَالَ: تَفَضَّلُوا. فَقَالُوا لَهُ: مَا هَذَا يَا جُحَا؟ قَالَ لَهُمْ: هَذَا مَرَقُ مَرَقِ الدِّيكِ يَا جِيرَانَ جِيرَانِ صَاحِبِ الدِّيكِ.<br><span class=\"muted\">✦ ✦ ✦</span><br>اشْتَرَى جُحَا عَشَرَةَ حَمِيرٍ وَرَكِبَ وَاحِدًا مِنْهَا وَسَارَ بِهَا. وَأَثْنَاءَ الطَّرِيقِ عَدَّهَا فَوَجَدَهَا تِسْعَةً، فَاضْطَرَبَ عَقْلُهُ خَوْفًا عَلَى الحِمَارِ العَاشِرِ. وَصَاحَ بِالحَمِيرِ كُلِّهَا فَوَقَفَتْ، وَنَزَلَ عَنْ حِمَارِهِ وَعَدَّهَا ثَانِيَةً فَوَجَدَهَا عَشَرَةً. فَسَاقَ الحَمِيرَ أَمَامَهُ وَقَالَ: أَمْشِي وَأَكْسِبُ خَيْرٌ مِنْ أَنْ أَرْكَبَ وَأَفْقِدَ حِمَارًا.<br><span class=\"muted\">✦ ✦ ✦</span><br>قَالَ جُحَا يَوْمًا لِجَارِهِ: هَلْ سَمِعْتَنِي وَأَنَا أَصْرُخُ اللَّيْلَةَ المَاضِيَةَ؟ قَالَ الجَارُ: نَعَمْ، وَلَكِنْ لِمَاذَا كُنْتَ تَصْرُخُ؟ قَالَ جُحَا: كَانَ ثَوْبِي عَلَى الحَبْلِ، فَهَبَّتِ الرِّيحُ وَسَقَطَ ثَوْبِي مِنْ فَوْقِ السَّطْحِ عَلَى الأَرْضِ. فَقَالَ الجَارُ: وَمَا الخَطَرُ فِي ذَلِكَ؟ قَالَ جُحَا: عَجَبًا! لَوْ كُنْتُ فِي الثَّوْبِ، أَمَا كُنْتُ أَقَعُ وَأَمُوتُ!",
      textTr: "Bir gece Cuhâ karısıyla konuşuyordu; ona: “Yarın sabah ormandan biraz odun kesmeye gideceğim, hava güzel olursa tarlaya giderim” dedi. Karısı: “İnşallah de” dedi. O da: “Buna ne gerek var? İş iki şeyden hâli değil: ya odun toplarım ya da tarlalardan birine giderim” diye cevap verdi. Sabah kasabadan çıktı, bir grup adama rastladı. “Amca, köyün yolu ne taraftan?” diye seslendiler. Cuhâ umursamadan “Bilmiyorum” dedi. Adamlar kızdılar, onu kolundan tutup bir sopayla dövmeye başladılar: “Önümüzden yürü, bizi köye götür!” Yolda bardaktan boşanırcasına yağmur yağdı, başından ayağına kadar ıslandı, üşüttü ve gece yarısı hasta olarak döndü. Evin kapısını çaldı; karısı “Kim o?” dedi. “Benim hanım, inşallah kapıyı aç!” dedi. ✦ Bir çiftçi Cuhâ’ya bir horoz hediye etti, Cuhâ da teşekkür etti. Sonra adam bir kez onu ziyaret etti; Cuhâ onu iyi ağırladı, yiyecek ve içecek ikram etti. Birkaç gün sonra bir grup çiftçi geldi: “Biz horoz sahibinin komşularıyız” dediler. Onları da ilk misafir gibi ağırladı. Üçüncü sefer başka bir grup geldi: “Biz horoz sahibinin komşularının komşularıyız” dediler. Cuhâ kızdı, onlara suya batırılmış ekmek getirip “Buyurun” dedi. “Bu ne Cuhâ?” dediler. “Bu, horozun suyunun suyu, ey horoz sahibinin komşularının komşuları!” dedi. ✦ Cuhâ on eşek aldı, birine binip yola koyuldu. Yolda saydı, dokuz buldu; onuncu eşek için aklı karıştı. Eşeklere seslenip durdurdu, eşeğinden indi, yeniden saydı: on! Eşekleri önüne katıp: “Yürüyüp kazanmak, binip bir eşek kaybetmekten iyidir” dedi. ✦ Cuhâ bir gün komşusuna: “Dün gece bağırdığımı duydun mu?” dedi. Komşu: “Evet, ama neden bağırıyordun?” dedi. Cuhâ: “Gömleğim ipteydi; rüzgâr esti, gömleğim damdan yere düştü” dedi. Komşu: “Bunda ne tehlike var?” dedi. Cuhâ: “Hayret! Ya gömleğin içinde ben olsaydım, düşüp ölmez miydim!” dedi.",
      qa: [
        { q: "مَاذَا قَالَتِ امْرَأَةُ جُحَا لَهُ؟", a: "قَالَتْ: قُلْ إِنْ شَاءَ اللهُ.", tr: "Cuhâ’nın karısı ona ne dedi? “İnşallah de.”" },
        { q: "لِمَاذَا ضَرَبَهُ الرِّجَالُ؟", a: "لِأَنَّهُ أَجَابَهُمْ بِدُونِ اهْتِمَامٍ: لَا أَعْلَمُ.", tr: "Adamlar onu neden dövdü? Umursamadan “bilmiyorum” dediği için." },
        { q: "كَيْفَ عَادَ جُحَا إِلَى البَيْتِ؟", a: "عَادَ فِي مُنْتَصَفِ اللَّيْلِ مَرِيضًا.", tr: "Cuhâ eve nasıl döndü? Gece yarısı, hasta olarak." },
        { q: "مَاذَا قَدَّمَ جُحَا لِجِيرَانِ جِيرَانِ صَاحِبِ الدِّيكِ؟", a: "قَدَّمَ لَهُمْ خُبْزًا فِي مَاءٍ، وَقَالَ: هَذَا مَرَقُ مَرَقِ الدِّيكِ.", tr: "Komşuların komşularına ne ikram etti? Suya batırılmış ekmek." },
        { q: "لِمَاذَا وَجَدَ جُحَا الحَمِيرَ تِسْعَةً؟", a: "لِأَنَّهُ لَمْ يَعُدَّ الحِمَارَ الَّذِي كَانَ رَاكِبًا عَلَيْهِ.", tr: "Eşekleri neden dokuz buldu? Bindiği eşeği saymadığı için." },
        { q: "لِمَاذَا كَانَ جُحَا يَصْرُخُ؟", a: "لِأَنَّ ثَوْبَهُ سَقَطَ مِنَ السَّطْحِ، فَخَافَ: لَوْ كَانَ فِي الثَّوْبِ لَوَقَعَ وَمَاتَ.", tr: "Cuhâ neden bağırıyordu? Gömleği damdan düşmüştü." }
      ],
      cls: { opts: ROL3, ar: "بَيِّنْ كَانَ وَاسْمَهَا وَخَبَرَهَا فِي الحِكَايَاتِ", tr: "Koyu kelimenin görevi ne?", items: [
        { s: HL("كَانَ جُحَا يَتَحَدَّثُ مَعَ امْرَأَتِهِ", "جُحَا"), a: "i", why: "اسْمُ كَانَ (takdîren merfû)." },
        { s: HL("كَانَ جُحَا يَتَحَدَّثُ مَعَ امْرَأَتِهِ", "يَتَحَدَّثُ مَعَ امْرَأَتِهِ"), a: "b", why: "Haber fiil cümlesi." },
        { s: HL("وَإِذَا كَانَ الجَوُّ جَمِيلًا", "كَانَ"), a: "h", why: "Nâsih fiil." },
        { s: HL("وَإِذَا كَانَ الجَوُّ جَمِيلًا", "جَمِيلًا"), a: "b", why: "خَبَرُ كَانَ مَنْصُوبٌ." },
        { s: HL("وَعَادَ فِي مُنْتَصَفِ اللَّيْلِ مَرِيضًا", "مَرِيضًا"), a: "x", why: "Hâl: عَادَ nâsih fiil değil." },
        { s: HL("لِمَاذَا كُنْتَ تَصْرُخُ؟", "تَصْرُخُ"), a: "b", why: "Haber fiil cümlesi; isim ـتَ." },
        { s: HL("كَانَ ثَوْبِي عَلَى الحَبْلِ", "ثَوْبِي"), a: "i", why: "اسْمُ كَانَ (takdîren merfû)." },
        { s: HL("كَانَ ثَوْبِي عَلَى الحَبْلِ", "عَلَى الحَبْلِ"), a: "b", why: "Haber câr-mecrûr." },
        { s: HL("لَوْ كُنْتُ فِي الثَّوْبِ", "فِي الثَّوْبِ"), a: "b", why: "Haber câr-mecrûr; isim ـتُ." },
        { s: HL("أَمَا كُنْتُ أَقَعُ وَأَمُوتُ", "أَقَعُ وَأَمُوتُ"), a: "b", why: "Haber fiil cümlesi." },
        { s: HL("عَدَّهَا ثَانِيَةً فَوَجَدَهَا عَشَرَةً", "عَشَرَةً"), a: "x", why: "وَجَدَ’nin ikinci mef’ûlü." },
        { s: HL("اشْتَرَى جُحَا عَشَرَةَ حَمِيرٍ", "جُحَا"), a: "x", why: "Fâil: اشْتَرَى nâsih değil." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["كَانَ الجَوُّ {بَارِدًا} أَمْسِ.", ["بَارِدًا", "بَارِدٌ", "بَارِدٍ"], "kâne’nin haberi: mansûb", "Dün hava soğuktu.", "u1"],
  ["صَارَ {مُحَمَّدٌ} مُدَرِّسًا.", ["مُحَمَّدٌ", "مُحَمَّدًا", "مُحَمَّدٍ"], "kâne’nin ismi: merfû", "Muhammed öğretmen oldu.", "u1"],
  ["لَيْسَ البَابُ {مَفْتُوحًا}.", ["مَفْتُوحًا", "مَفْتُوحٌ", "مَفْتُوحٍ"], "لَيْسَ’in haberi: mansûb", "Kapı açık değil.", "u1"],
  ["أَصْبَحَ العَالَمُ قَرْيَةً {صَغِيرَةً}.", ["صَغِيرَةً", "صَغِيرَةٌ", "صَغِيرَةٍ"], "haberin sıfatı da mansûb", "Dünya küçük bir köy oldu.", "u1"],
  ["{كَانَتِ} البِنْتُ تَبْكِي مِنَ الأَلَمِ.", ["كَانَتِ", "كَانَ", "كَانُوا"], "isim müennes: كَانَتْ", "Kız acıdan ağlıyordu.", "u2"],
  ["{كُنْتُ} فَقِيرًا فَأَصْبَحْتُ غَنِيًّا.", ["كُنْتُ", "كُنَّا", "كَانَتْ"], "isim zamir: ـتُ", "Fakirdim, zengin oldum.", "u2"],
  ["لَيْسُوا {ذَاهِبِينَ} إِلَى المَدْرَسَةِ.", ["ذَاهِبِينَ", "ذَاهِبُونَ", "ذَاهِبًا"], "cem-i müzekker haber: yâ", "Okula gitmiyorlar.", "u2"],
  ["كَانَ المُهَنْدِسُونَ {عَامِلِينَ} عَلَى المَشْرُوعِ.", ["عَامِلِينَ", "عَامِلُونَ", "عَامِلًا"], "cem-i müzekker haber: yâ", "Mühendisler projede çalışıyordu.", "u2"],
  ["كَانَتِ الطَّبِيبَاتُ {مُجْتَمِعَاتٍ} حَوْلَ المَرِيضِ.", ["مُجْتَمِعَاتٍ", "مُجْتَمِعَاتٌ", "مُجْتَمِعَةً"], "cem-i müennes haber: esre", "Kadın doktorlar toplanmıştı.", "u2"],
  ["ظَلَّ {الفَلَّاحُونَ} يَعْمَلُونَ فِي المَزْرَعَةِ.", ["الفَلَّاحُونَ", "الفَلَّاحِينَ", "الفَلَّاحَيْنِ"], "kâne’nin ismi: vâv ile merfû", "Çiftçiler çalışmaya devam etti.", "u2"],
  ["مَا زَالَ شَرِيفٌ {مُتْعَبًا}.", ["مُتْعَبًا", "مُتْعَبٌ", "مُتْعَبٍ"], "müfred haber: mansûb", "Şerif hâlâ yorgun.", "u3"],
  ["كَانَتِ البِنْتُ {تَبْكِي} مِنَ الأَلَمِ.", ["تَبْكِي", "يَبْكِي", "تَبْكِينَ"], "fiil cümlesi haber; fiil isme uyar", "Kız acıdan ağlıyordu.", "u3"],
  ["لَيْسَ المَرِيضُ حَالَتُهُ {خَطِيرَةٌ}.", ["خَطِيرَةٌ", "خَطِيرَةً", "خَطِيرَةٍ"], "isim cümlesi haber: içteki haber merfû", "Hastanın durumu ağır değil.", "u3"],
  ["صَارَتْ غُرْفَةُ عَائِشَةَ {مَلِيئَةً} بِالكُتُبِ.", ["مَلِيئَةً", "مَلِيئَةٌ", "مَلِيئَةٍ"], "haber mansûb", "Âişe’nin odası kitaplarla doldu.", "u3"],
  ["كَانَتْ أَوَّلُ زَوْجَاتِ الرَّسُولِ ﷺ {خَدِيجَةَ}.", ["خَدِيجَةَ", "خَدِيجَةُ", "خَدِيجَةً"], "gayr-i munsarif: tenvinsiz fetha", "Resûlullah’ın ilk hanımı Hadîce idi.", "u3"],
  ["أَتَعَبَّدُ رَبِّي مَا دُمْتُ {حَيًّا}.", ["حَيًّا", "حَيٌّ", "حَيٍّ"], "مَا دَامَ’in haberi", "Yaşadığım sürece Rabbime kulluk ederim.", "u3"],
  ["{سَأَكُونُ} مُدَرِّسًا.", ["سَأَكُونُ", "سَأَكُنْ", "سَيَكُونُ"], "muzâri, birinci şahıs", "Öğretmen olacağım.", "u4"],
  ["{كُنْ} عَالِمًا أَوْ مُتَعَلِّمًا.", ["كُنْ", "كُونُ", "كَانَ"], "emir: كُنْ", "Ya âlim ol ya öğrenci.", "u4"],
  ["وَلَمْ {يَكُنِ} الرَّاعِي كَاذِبًا.", ["يَكُنِ", "يَكُونُ", "يَكُونَ"], "لَمْ: meczûm", "Çoban yalancı değildi.", "u4"],
  ["مَا زَالَتِ {البِنْتُ} بَاكِيَةً.", ["البِنْتُ", "البِنْتَ", "البِنْتِ"], "isim merfû", "Kız hâlâ ağlıyor.", "u4"],
  ["كَانَتِ المُدِيرَةُ {وَاقِفَةً}.", ["وَاقِفَةً", "وَاقِفًا", "وَاقِفَةٌ"], "haber müennes ve mansûb", "Müdire ayaktaydı.", "u4"],
  ["وَكَانَ اللهُ عَلِيمًا {حَكِيمًا}.", ["حَكِيمًا", "حَكِيمٌ", "حَكِيمٍ"], "ikinci haber de mansûb", "Allah bilendir, hikmet sahibidir.", "u5"],
  ["ظَلَّ وَجْهُهُ {مُسْوَدًّا}.", ["مُسْوَدًّا", "مُسْوَدٌّ", "مُسْوَدٍّ"], "خَبَرُ ظَلَّ", "Yüzü kapkara kesilir.", "u5"],
  ["فَأَصْبَحْتُمْ بِنِعْمَتِهِ {إِخْوَانًا}.", ["إِخْوَانًا", "إِخْوَانٌ", "إِخْوَانٍ"], "خَبَرُ أَصْبَحَ", "O’nun nimetiyle kardeş oldunuz.", "u5"],
  ["لَيْسَ كَمِثْلِهِ {شَيْءٌ}.", ["شَيْءٌ", "شَيْئًا", "شَيْءٍ"], "geri kalmış isim: merfû", "O’nun benzeri hiçbir şey yoktur.", "u5"],
  ["وَأَصْبَحَ فُؤَادُ أُمِّ مُوسَى {فَارِغًا}.", ["فَارِغًا", "فَارِغٌ", "فَارِغٍ"], "خَبَرُ أَصْبَحَ", "Mûsâ’nın annesinin yüreği bomboş oldu.", "u5"]
];
// Cümleyi Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["الجَوُّ بَارِدٌ ← كَانَ", "كَانَ الجَوُّ بَارِدًا", "كَانَ الجَوَّ بَارِدٌ", "كَانَ الجَوُّ بَارِدٌ", "haber mansûb olur", "u1"],
  ["مُحَمَّدٌ مُدَرِّسٌ ← صَارَ", "صَارَ مُحَمَّدٌ مُدَرِّسًا", "صَارَ مُحَمَّدًا مُدَرِّسٌ", "صَارَ مُحَمَّدًا مُدَرِّسًا", "isim merfû kalır", "u1"],
  ["البَابُ مَفْتُوحٌ ← لَيْسَ", "لَيْسَ البَابُ مَفْتُوحًا", "لَيْسَ البَابَ مَفْتُوحٌ", "لَيْسَ البَابُ مَفْتُوحٌ", "لَيْسَ: haber mansûb", "u1"],
  ["البِنْتُ بَاكِيَةٌ ← أَصْبَحَ", "أَصْبَحَتِ البِنْتُ بَاكِيَةً", "أَصْبَحَ البِنْتُ بَاكِيَةً", "أَصْبَحَتِ البِنْتُ بَاكِيَةٌ", "müennes isim: أَصْبَحَتْ", "u2"],
  ["أَنَا مُتْعَبٌ ← أَمْسَى", "أَمْسَيْتُ مُتْعَبًا", "أَمْسَى أَنَا مُتْعَبًا", "أَمْسَيْتُ مُتْعَبٌ", "zamir fiile bitişir", "u2"],
  ["نَحْنُ طُلَّابٌ ← كَانَ", "كُنَّا طُلَّابًا", "كَانَ نَحْنُ طُلَّابًا", "كُنَّا طُلَّابٌ", "نَحْنُ → كُنَّا", "u2"],
  ["هُمْ ذَاهِبُونَ ← لَيْسَ", "لَيْسُوا ذَاهِبِينَ", "لَيْسَ هُمْ ذَاهِبُونَ", "لَيْسُوا ذَاهِبُونَ", "هُمْ → لَيْسُوا; haber yâ ile", "u2"],
  ["المُعَلِّمُونَ مُخْلِصُونَ ← كَانَ", "كَانَ المُعَلِّمُونَ مُخْلِصِينَ", "كَانُوا المُعَلِّمُونَ مُخْلِصِينَ", "كَانَ المُعَلِّمِينَ مُخْلِصُونَ", "fiil tekil kalır, haber yâ ile", "u2"],
  ["الطَّالِبَاتُ مُجْتَهِدَاتٌ ← ظَلَّ", "ظَلَّتِ الطَّالِبَاتُ مُجْتَهِدَاتٍ", "ظَلَّتِ الطَّالِبَاتِ مُجْتَهِدَاتٌ", "ظَلَّ الطَّالِبَاتُ مُجْتَهِدِينَ", "cem-i müennes haber esreyle mansûb", "u2"],
  ["كَانَ الرَّجُلُ مَرِيضًا ← kâne’yi at", "الرَّجُلُ مَرِيضٌ", "الرَّجُلُ مَرِيضًا", "الرَّجُلَ مَرِيضٌ", "nâsih gidince haber merfû", "u4"],
  ["كُنْتُمْ خَيْرَ أُمَّةٍ ← kâne’yi at", "أَنْتُمْ خَيْرُ أُمَّةٍ", "أَنْتُمْ خَيْرَ أُمَّةٍ", "أَنْتُمَا خَيْرُ أُمَّةٍ", "ـتُمْ → أَنْتُمْ; haber merfû", "u4"],
  ["أَصْبَحَ الرَّجُلُ مَرِيضًا ← البِنْتُ", "أَصْبَحَتِ البِنْتُ مَرِيضَةً", "أَصْبَحَ البِنْتُ مَرِيضًا", "أَصْبَحَتِ البِنْتُ مَرِيضًا", "fiil ve haber müennes", "u4"],
  ["كَانَ الجَوُّ بَارِدًا ← إِنَّ", "إِنَّ الجَوَّ بَارِدٌ", "إِنَّ الجَوُّ بَارِدًا", "إِنَّ الجَوَّ بَارِدًا", "inne: ismi mansûb, haberi merfû", "u4"],
  ["كُنْتُ طَالِبًا ← gelecek (سَـ)", "سَأَكُونُ طَالِبًا", "سَأَكُونُ طَالِبٌ", "سَيَكُونُ طَالِبًا", "muzâri: سَأَكُونُ", "u4"],
  ["تَكُونُ عَالِمًا ← emir", "كُنْ عَالِمًا", "كُونُ عَالِمًا", "كُنْ عَالِمٌ", "emir: كُنْ", "u4"]
];
// Haber türü? hız oyunu
var NOUN_LIST = [];
UNITS.forEach(function (u) { u.ex.forEach(function (ex) {
  if (ex.type === "classify" && ex.opts === HTUR) ex.items.forEach(function (it) { NOUN_LIST.push([it.s, it.a, it.why]); });
}); });
[["كَانَ الرَّجُلُ مُتَّجِهًا إِلَى اليَمِينِ", "مُتَّجِهًا", "m", "Müfred."], ["كَانَ ثَوْبِي عَلَى الحَبْلِ", "عَلَى الحَبْلِ", "s", "Câr-mecrûr."], ["لِمَاذَا كُنْتَ تَصْرُخُ", "تَصْرُخُ", "f", "Fiil cümlesi."],
 ["صَارَ الطِّفْلُ شَعْرُهُ طَوِيلٌ", "شَعْرُهُ طَوِيلٌ", "i", "İsim cümlesi (râbıt ـهُ)."], ["مَا زَالَ عُمَرُ مَعَ المَرْأَةِ", "مَعَ المَرْأَةِ", "s", "Zarf."], ["أَصْبَحَتِ المَرْأَتَانِ تُمَارِسَانِ الرِّيَاضَةَ", "تُمَارِسَانِ الرِّيَاضَةَ", "f", "Fiil cümlesi."],
 ["لَيْسَ كَمِثْلِهِ شَيْءٌ", "كَمِثْلِهِ", "s", "Öne geçmiş câr-mecrûr."], ["ظَلَّ عَلِيٌّ غَنِيًّا", "غَنِيًّا", "m", "Müfred."]
].forEach(function (x) { NOUN_LIST.push([HL(x[0], x[1]), x[2], x[3]]); });
var SP_M = HTUR;
// Kâne mi İnne mi? hız oyunu
var MM_OPTS = [["i", "İnne grubu", "إِنَّ", "mz"], ["k", "Kâne grubu", "كَانَ", "ref"]];
var MM_LIST = UNITS[3].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
["إِنَّ", "أَنَّ", "كَأَنَّ", "لَكِنَّ", "لَيْتَ", "لَعَلَّ"].forEach(function (w) { MM_LIST.push([w, "i", "Harf: ismi nasb, haberi ref’ eder."]); });
["كَانَ", "أَصْبَحَ", "أَضْحَى", "ظَلَّ", "أَمْسَى", "صَارَ", "لَيْسَ", "مَا زَالَ", "مَا دَامَ"].forEach(function (w) { MM_LIST.push([w, "k", "Fiil: ismi ref’, haberi nasb eder."]); });
var HAFIZA = {
  an: { name: "Fiil ↔ anlamı", pairs: [["كَانَ", "…idi"], ["صَارَ", "oldu, dönüştü"], ["أَصْبَحَ", "sabahleyin oldu"], ["أَمْسَى", "akşamleyin oldu"], ["أَضْحَى", "kuşluk vakti oldu"], ["ظَلَّ", "gün boyu kaldı"], ["لَيْسَ", "değil"], ["مَا زَالَ", "hâlâ"]] },
  dn: { name: "İsim cümlesi ↔ kâneli", pairs: [["الجَوُّ بَارِدٌ", "كَانَ الجَوُّ بَارِدًا"], ["العَالَمُ قَرْيَةٌ صَغِيرَةٌ", "أَصْبَحَ العَالَمُ قَرْيَةً صَغِيرَةً"], ["مُحَمَّدٌ مُدَرِّسٌ", "صَارَ مُحَمَّدٌ مُدَرِّسًا"], ["البَابُ مَفْتُوحٌ", "لَيْسَ البَابُ مَفْتُوحًا"], ["أَنَا مُتْعَبٌ", "أَمْسَيْتُ مُتْعَبًا"], ["أَنْتُمْ خَيْرُ أُمَّةٍ", "كُنْتُمْ خَيْرَ أُمَّةٍ"], ["عَلِيٌّ غَنِيٌّ", "ظَلَّ عَلِيٌّ غَنِيًّا"]] },
  zm: { name: "Zamir ↔ كَانَ", pairs: [["أَنَا", "كُنْتُ"], ["نَحْنُ", "كُنَّا"], ["أَنْتَ", "كُنْتَ"], ["أَنْتِ", "كُنْتِ"], ["أَنْتُمْ", "كُنْتُمْ"], ["هِيَ", "كَانَتْ"], ["هُمْ", "كَانُوا"], ["هُنَّ", "كُنَّ"]] }
};
var KARTLAR = [
  ["Kâne ve kardeşleri nedir?", "İsim cümlesine giren nâsih fiiller: ismi ref’, haberi nasb ederler."],
  ["Kardeşleri?", "أَصْبَحَ، أَضْحَى، ظَلَّ، أَمْسَى، صَارَ، لَيْسَ، مَا زَالَ، مَا دَامَ"],
  ["الجَوُّ بَارِدٌ + كَانَ?", "كَانَ الجَوُّ بَارِدًا"],
  ["İsim zamir olunca?", "Fiile bitişir: كُنْتُ، كُنْتُمْ، لَيْسُوا، لَسْتُ"],
  ["Haber cem-i müzekker?", "Yâ ile mansûb: كَانَ المُهَنْدِسُونَ عَامِلِينَ"],
  ["Haber cem-i müennes?", "Esreyle mansûb: كَانَتِ الطَّبِيبَاتُ مُجْتَمِعَاتٍ"],
  ["Haberin türleri?", "Müfred · cümle (fiil / isim) · şibh-i cümle (câr-mecrûr / zarf)"],
  ["Cümle haberin i’rabı?", "Mahallen mansûb: كَانَتِ البِنْتُ تَبْكِي"],
  ["Kâne’nin muzârisi ve emri?", "سَأَكُونُ مُدَرِّسًا · كُنْ عَالِمًا"],
  ["Câmid olanlar?", "لَيْسَ ve مَا دَامَ: yalnız mâzî biçimi"],
  ["مَا زَالَ’in muzârisi?", "لَا يَزَالُ"],
  ["Kâne mi inne mi?", "Kâne: ismi merfû, haberi mansûb · İnne: ismi mansûb, haberi merfû"]
];
