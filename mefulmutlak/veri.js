// ================= VERİ: Mef’ûl-i Mutlak (المَفْعُولُ المُطْلَقُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "العَامِلُ", tr: "Fiil (âmil)" }, nasb: { ar: "المَفْعُولُ المُطْلَقُ", tr: "Mef’ûl-i mutlak (masdar)" }, cerr: { ar: "النَّائِبُ", tr: "Masdarın yerine geçen (nâib)" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var KND = [["m", "Mef’ûl-i mutlak", "مَفْعُولٌ مُطْلَقٌ", "nasb"], ["l", "Mef’ûlün lieclih", "مَفْعُولٌ لِأَجْلِهِ", "cerr"], ["h", "Hâl", "حَالٌ", "mi"], ["b", "Mef’ûlün bih", "مَفْعُولٌ بِهِ", "ref"]];
var NV = [["t", "Te’kîd (pekiştirme)", "تَأْكِيدُ الفِعْلِ", "nasb"], ["n", "Nevi (türünü bildirme)", "بَيَانُ النَّوْعِ", "cerr"], ["a", "Sayı (kaç kez)", "بَيَانُ العَدَدِ", "mi"]];
var NB = [["r", "Eş anlamlısı", "مُرَادِفُهُ", "nasb"], ["s", "Sıfatı", "صِفَتُهُ", "cerr"], ["k", "كُلّ / بَعْض", "كُلّ / بَعْض", "mi"], ["a", "Sayı", "العَدَدُ", "ref"]];
var RD = [["l", "Lâzım fiil", "فِعْلٌ لَازِمٌ", "cerr"], ["m", "Müteaddî fiil", "فِعْلٌ مُتَعَدٍّ", "nasb"], ["t", "Mef’ûl-i mutlak", "مَفْعُولٌ مُطْلَقٌ", "mi"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];
var TUR_TR = { m: "Mef’ûl-i mutlak", l: "Mef’ûlün lieclih", h: "Hâl", b: "Mef’ûlün bih", t: "Te’kîd", n: "Nevi", a: "Sayı" };
// Makine: [cümle başı, [te’kîd, nevi-sıfat, nevi-muzâf, bir kez, üç kez, nâib-sıfat], [Türkçe ×6]]
var MD = [
  ["طَرَقَ الرَّجُلُ البَابَ", ["طَرْقًا", "طَرْقًا خَفِيفًا", "طَرْقَ الضَّيْفِ المُؤَدَّبِ", "طَرْقَةً", "ثَلَاثَ طَرَقَاتٍ", "خَفِيفًا"],
    ["Adam kapıyı çaldı da çaldı (gerçekten çaldı).", "Adam kapıyı hafifçe çaldı.", "Adam kapıyı terbiyeli bir misafir gibi çaldı.", "Adam kapıyı bir kez çaldı.", "Adam kapıyı üç kez çaldı.", "Adam kapıyı hafifçe çaldı."]],
  ["نَظَرَ السَّائِحُ إِلَى المَدِينَةِ", ["نَظَرًا", "نَظَرًا طَوِيلًا", "نَظَرَ المُعْجَبِ", "نَظْرَةً", "ثَلَاثَ نَظَرَاتٍ", "طَوِيلًا"],
    ["Turist şehre baktı (gerçekten baktı).", "Turist şehre uzun uzun baktı.", "Turist şehre hayran biri gibi baktı.", "Turist şehre bir kez baktı.", "Turist şehre üç kez baktı.", "Turist şehre uzun uzun baktı."]],
  ["ضَحِكَ الطِّفْلُ", ["ضَحِكًا", "ضَحِكًا كَثِيرًا", "ضَحِكَ المَسْرُورِ", "ضَحْكَةً", "ثَلَاثَ ضَحَكَاتٍ", "كَثِيرًا"],
    ["Çocuk güldü (gerçekten güldü).", "Çocuk çok güldü.", "Çocuk sevinçli biri gibi güldü.", "Çocuk bir kez güldü.", "Çocuk üç kez güldü.", "Çocuk çok güldü."]],
  ["سَجَدَ المُصَلِّي", ["سُجُودًا", "سُجُودًا طَوِيلًا", "سُجُودَ الخَاشِعِينَ", "سَجْدَةً", "ثَلَاثَ سَجَدَاتٍ", "طَوِيلًا"],
    ["Namaz kılan secde etti (gerçekten).", "Namaz kılan uzun bir secde yaptı.", "Namaz kılan huşu sahipleri gibi secde etti.", "Namaz kılan bir secde yaptı.", "Namaz kılan üç secde yaptı.", "Namaz kılan uzun secde etti."]],
  ["دَارَ اللَّاعِبُ حَوْلَ المَلْعَبِ", ["دَوَرَانًا", "دَوَرَانًا سَرِيعًا", "دَوَرَانَ العَدَّائِينَ", "دَوْرَةً", "ثَلَاثَ دَوْرَاتٍ", "سَرِيعًا"],
    ["Oyuncu sahanın etrafında döndü (gerçekten).", "Oyuncu sahanın etrafında hızla döndü.", "Oyuncu sahanın etrafında koşucular gibi döndü.", "Oyuncu sahanın etrafında bir tur attı.", "Oyuncu sahanın etrafında üç tur attı.", "Oyuncu sahanın etrafında hızla döndü."]],
  ["شَرِبَ المُسَافِرُ المَاءَ", ["شُرْبًا", "شُرْبًا كَثِيرًا", "شُرْبَ العَطْشَانِ", "شَرْبَةً", "ثَلَاثَ شَرَبَاتٍ", "كَثِيرًا"],
    ["Yolcu suyu içti (gerçekten içti).", "Yolcu çok su içti.", "Yolcu suyu susamış biri gibi içti.", "Yolcu bir yudum su içti.", "Yolcu üç yudum su içti.", "Yolcu çok su içti."]]
];
var MK = [["Te’kîd", "nasb"], ["Nevi · sıfat", "cerr"], ["Nevi · muzâf", "cerr"], ["Sayı · bir kez", "mi"], ["Sayı · üç kez", "mi"], ["Nâib · sıfat", "ref"]];

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
// Türü: [cümle, mutlak, y1, y2, tür, Türkçe, açıklama]
var TY = { t: ["تَأْكِيدُ الفِعْلِ", "بَيَانُ النَّوْعِ", "بَيَانُ العَدَدِ"], n: ["بَيَانُ النَّوْعِ", "تَأْكِيدُ الفِعْلِ", "بَيَانُ العَدَدِ"], a: ["بَيَانُ العَدَدِ", "بَيَانُ النَّوْعِ", "تَأْكِيدُ الفِعْلِ"] };
function TP(x, i) { return CBP([x[0] + " ← المَفْعُولُ المُطْلَقُ:", [x[1], x[2], x[3]], "· نَوْعُهُ:", TY[x[4]]], i, x[5], x[6]); }
// Nâib: [cümle, nâib, y1, y2, tür, Türkçe, açıklama]
var NBK = { r: ["مُرَادِفُهُ", "صِفَتُهُ", "كُلّ / بَعْض"], s: ["صِفَتُهُ", "مُرَادِفُهُ", "العَدَدُ"], k: ["كُلّ / بَعْض", "صِفَتُهُ", "العَدَدُ"], a: ["العَدَدُ", "كُلّ / بَعْض", "مُرَادِفُهُ"] };
function NBP(x, i) { return CBP([x[0] + " ← النَّائِبُ:", [x[1], x[2], x[3]], "· نَوْعُهُ:", NBK[x[4]]], i, x[5], x[6]); }

var UNITS = [
// ---------------------------------------------------------------- 1 · TANIM
{
  id: "u1", no: 1, ar: "المَفْعُولُ المُطْلَقُ", tr: "Mef’ûl-i Mutlak Nedir?", short: "Tanım", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Mef’ûl-i mutlakın fiilin kendi lafzından gelen mansûb masdar olduğunu bilmek", "Âyet ve hadislerde onu bulmak", "Mef’ûlün lieclih, hâl ve mef’ûlün bihten ayırmak"],
  examples: [
    { s: "مَزَّقْتُ:mz / الصَّحِيفَةَ:- / تَمْزِيقًا.:nasb", tr: "Gazeteyi paramparça ettim. (te’kîd)" },
    { s: "نِمْتُ:mz / نَوْمًا عَمِيقًا.:nasb", tr: "Derin bir uyku uyudum. (nevi)", pair: "دَارَ:mz / اللَّاعِبُ حَوْلَ المَلْعَبِ:- / دَوْرَةً.:nasb", pairTr: "Oyuncu sahanın etrafında bir tur attı. (sayı)" }
  ],
  rules: [
    { tr: "<b>Mef’ûl-i mutlak</b> (<span class=\"ar\">المَفْعُولُ المُطْلَقُ</span>): fiilin kendi lafzından (aynı kökten) gelen ve fiilden sonra yer alan <b>mansûb masdardır</b>:", ex: ["مَزَّقْتُ الصَّحِيفَةَ تَمْزِيقًا", "وَكَلَّمَ اللهُ مُوسَى تَكْلِيمًا"] },
    { tr: "“Mutlak” denir, çünkü öteki mef’ûller gibi bir harfe bağlanmaz (bih, fîh, leh, maah); fiilin anlattığı işin kendisidir." },
    { tr: "Karıştırma: <b>mef’ûlün lieclih</b> de masdardır ama sebep bildirir ve genellikle başka kökten gelir (<span class=\"ar\">هَرَبَ خَوْفًا</span>). <b>Hâl</b> çoğu zaman ism-i fâildir (<span class=\"ar\">جَاءَ ضَاحِكًا</span>). <b>Mef’ûl-i mutlak</b> ise fiilin kendi masdarıdır (<span class=\"ar\">خَافَ خَوْفًا</span>)." },
    { tr: "Masdarı fiilin babına göre kur: <span class=\"ar\">مَزَّقَ ← تَمْزِيق · كَلَّمَ ← تَكْلِيم · انْتَصَرَ ← انْتِصَار · أَجَابَ ← إِجَابَة</span>." }
  ],
  kaide: ["المَفْعُولُ المُطْلَقُ مَصْدَرٌ مَنْصُوبٌ مِنْ لَفْظِ الفِعْلِ، يَأْتِي بَعْدَهُ: لِتَأْكِيدِهِ، أَوْ لِبَيَانِ نَوْعِهِ، أَوْ لِبَيَانِ عَدَدِهِ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "١", ar: "عَيِّنِ المَفْعُولَ المُطْلَقَ فِي الآيَاتِ التَّالِيَةِ وَالحَدِيثَيْنِ الشَّرِيفَيْنِ", tr: "Fiili (âmil), mef’ûl-i mutlakı ve masdarın yerine geçen kelimeyi (nâib) etiketle.", items: [
      T("وَكَلَّمَ:mz / اللهُ مُوسَى:x / تَكْلِيمًا:nasb", "Allah Mûsâ ile gerçekten konuştu. (Nisâ 164)", "Yalın masdar: te’kîd."),
      T("إِنَّا:x / فَتَحْنَا:mz / لَكَ:x / فَتْحًا مُبِينًا:nasb", "Şüphesiz biz sana apaçık bir fetih verdik. (Fetih 1)", "Sıfatlı: nevi."),
      T("فَاصْبِرْ:mz / صَبْرًا جَمِيلًا:nasb", "Güzel bir sabırla sabret. (Meâric 5)", "Sıfatlı: nevi."),
      T("فَنَظَرَ:mz / نَظْرَةً:nasb / فِي النُّجُومِ:x", "Yıldızlara bir göz attı. (Sâffât 88)", "فَعْلَة: bir kez (sayı)."),
      T("فَأَخَذْنَا:mz / هُمْ:x / أَخْذَ عَزِيزٍ مُقْتَدِرٍ:nasb", "Onları güçlü ve her şeye kadir birinin yakalayışıyla yakaladık. (Kamer 42)", "Muzâf: nevi."),
      T("فَلْيَضْحَكُوا:mz / قَلِيلًا:cerr / وَلْيَبْكُوا:mz / كَثِيرًا:cerr", "Artık az gülsünler, çok ağlasınlar. (Tevbe 82)", "Masdar atılmış, sıfatı yerine geçmiş: ضَحِكًا قَلِيلًا · بُكَاءً كَثِيرًا. Zaman zarfı (az bir süre) diye de i’rab edilir."),
      T("اللَّهُمَّ إِنِّي:x / ظَلَمْتُ:mz / نَفْسِي:x / ظُلْمًا كَثِيرًا:nasb / وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ:x / فَاغْفِرْ:mz / لِي:x / مَغْفِرَةً مِنْ عِنْدِكَ:nasb", "Allah’ım, ben nefsime çok zulmettim; günahları ancak sen bağışlarsın; katından bir bağışla beni bağışla. (Hadis)", "İki mef’ûl-i mutlak: ظُلْمًا كَثِيرًا ve مَغْفِرَةً (غَفَرَ’in masdarı) — ikisi de nevi."),
      T("مَنْ:x / سَنَّ:mz / فِي الإِسْلَامِ:x / سُنَّةً حَسَنَةً:nasb / فَلَهُ أَجْرُهَا وَأَجْرُ مَنْ عَمِلَ بِهَا مِنْ غَيْرِ أَنْ:x / يَنْقُصَ:mz / مِنْ أُجُورِهِمْ:x / شَيْئًا:cerr", "Kim İslam’da güzel bir çığır açarsa onun sevabı ve onunla amel edenlerin sevabı onundur; onların sevabından hiçbir şey eksilmez. (Hadis)", "Kitap aynı kökten olduğu için سُنَّةً’yi mef’ûl-i mutlak sayar; سُنَّة isim olduğundan mef’ûlün bih diyenler de çoktur. شَيْئًا “hiçbir eksilme” anlamında nâibdir.")
    ]},
    { type: "classify", extra: true, opts: KND, ar: "مَا إِعْرَابُ الكَلِمَةِ المُلَوَّنَةِ؟", tr: "Koyu kelime mef’ûl-i mutlak mı, mef’ûlün lieclih mi, hâl mi, mef’ûlün bih mi?", items: CL([
      [HL("نِمْتُ نَوْمًا عَمِيقًا", "نَوْمًا"), "m", "نَامَ’ın kendi masdarı."],
      [HL("هَرَبَ اللِّصُّ خَوْفًا مِنَ الشُّرْطِيِّ", "خَوْفًا"), "l", "Niçin kaçtı? Sebep: lieclih."],
      [HL("جَاءَ الوَلَدُ ضَاحِكًا", "ضَاحِكًا"), "h", "Nasıl geldi? İsm-i fâil: hâl."],
      [HL("قَرَأْتُ كِتَابًا", "كِتَابًا"), "b", "Okunan şey."],
      [HL("خَافَ اللِّصُّ خَوْفًا شَدِيدًا", "خَوْفًا"), "m", "خَافَ’ın kendi masdarı."],
      [HL("قُمْتُ احْتِرَامًا لِلْمُعَلِّمِ", "احْتِرَامًا"), "l", "قَامَ’ın masdarı değil; sebep."],
      [HL("دَخَلَ الطَّالِبُ مُسْرِعًا", "مُسْرِعًا"), "h", "Hâl."],
      [HL("فَهِمْتُ الدَّرْسَ", "الدَّرْسَ"), "b", "Anlaşılan şey."],
      [HL("دَارَ اللَّاعِبُ دَوْرَةً", "دَوْرَةً"), "m", "دَارَ’ın masdarı: sayı."],
      [HL("سَافَرْتُ طَلَبًا لِلْعِلْمِ", "طَلَبًا"), "l", "Sebep."],
      [HL("رَجَعَ الجُنْدِيُّ مُنْتَصِرًا", "مُنْتَصِرًا"), "h", "Hâl."],
      [HL("أَكَلْتُ تُفَّاحَةً", "تُفَّاحَةً"), "b", "Yenen şey."],
      [HL("احْتَرَمْتُ المُعَلِّمَ احْتِرَامًا", "احْتِرَامًا"), "m", "Burada احْتَرَمَ’in kendi masdarı: mutlak."],
      [HL("وَقَفَ الطُّلَّابُ تَحِيَّةً لِلْأُسْتَاذِ", "تَحِيَّةً"), "l", "Sebep."],
      [HL("شَرِبْتُ المَاءَ بَارِدًا", "بَارِدًا"), "h", "Suyun hâli."],
      [HL("زُرْتُ صَدِيقِي", "صَدِيقِي"), "b", "Ziyaret edilen."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · TÜRLERİ
{
  id: "u2", no: 2, ar: "أَنْوَاعُ المَفْعُولِ المُطْلَقِ", tr: "Te’kîd, Nevi ve Sayı", short: "Türleri", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Te’kîd bildiren yalın masdarı tanımak", "Sıfatlı ya da muzâf masdarın nevi bildirdiğini bilmek", "فَعْلَة, müsennâ ve sayıyla adedi bildirmek"],
  examples: [
    { s: "طَرَقَ:mz / الرَّجُلُ البَابَ:- / طَرْقًا.:nasb", tr: "Adam kapıyı çaldı da çaldı. (te’kîd)" },
    { s: "فَأَخَذْنَا:mz / هُمْ:- / أَخْذَ عَزِيزٍ مُقْتَدِرٍ.:nasb", tr: "Onları güçlü ve kudretli birinin yakalayışıyla yakaladık. (nevi, muzâf)", pair: "تَدُورُ:mz / الشُّرْطَةُ فِي الشَّوَارِعِ:- / دَوْرَتَيْنِ:nasb / فِي اليَوْمِ.:-", pairTr: "Polis sokaklarda günde iki tur atar. (sayı, müsennâ)" }
  ],
  rules: [
    { tr: "<b>Te’kîd</b>: yalın masdar fiilin anlamını pekiştirir: <span class=\"ar\">مَزَّقْتُ الصَّحِيفَةَ تَمْزِيقًا</span> (gerçekten yırttım)." },
    { tr: "<b>Nevi</b>: masdar sıfat alır ya da muzâf olur, işin nasıl olduğunu bildirir:", ex: ["نِمْتُ نَوْمًا عَمِيقًا", "فَأَخَذْنَاهُمْ أَخْذَ عَزِيزٍ مُقْتَدِرٍ"] },
    { tr: "<b>Sayı</b>: işin kaç kez yapıldığını bildirir; sülâsîde <span class=\"ar\">فَعْلَة</span> (bir kez), müsennâ ya da çoğul gelir: <span class=\"ar\">دَوْرَةً · دَوْرَتَيْنِ · دَوْرَاتٍ</span>." },
    { tr: "Müsennâ mef’ûl-i mutlak yâ ile mansûb olur (<span class=\"ar\">دَوْرَتَيْنِ</span>); muzâf olunca tenvin düşer (<span class=\"ar\">أَخْذَ عَزِيزٍ</span>)." }
  ],
  kaide: [
    "أ ـ لِتَأْكِيدِ الفِعْلِ، مِثْلُ: مَزَّقْتُ الصَّحِيفَةَ تَمْزِيقًا.",
    "ب ـ لِبَيَانِ نَوْعِهِ، مِثْلُ: نِمْتُ نَوْمًا عَمِيقًا.",
    "جـ ـ لِبَيَانِ عَدَدِهِ، مِثْلُ: دَارَ اللَّاعِبُ حَوْلَ المَلْعَبِ دَوْرَةً."
  ],
  ex: [
    { type: "classify", extra: true, opts: NV, ar: "مَا نَوْعُ المَفْعُولِ المُطْلَقِ؟", tr: "Koyu mef’ûl-i mutlak te’kîd mi, nevi mi, sayı mı bildiriyor?", items: CL([
      [HL("مَزَّقْتُ الصَّحِيفَةَ تَمْزِيقًا", "تَمْزِيقًا"), "t", "Yalın masdar."],
      [HL("نِمْتُ نَوْمًا عَمِيقًا", "نَوْمًا عَمِيقًا"), "n", "Sıfatlı."],
      [HL("دَارَ اللَّاعِبُ دَوْرَةً", "دَوْرَةً"), "a", "Bir tur."],
      [HL("وَكَلَّمَ اللهُ مُوسَى تَكْلِيمًا", "تَكْلِيمًا"), "t", "Yalın masdar."],
      [HL("فَاصْبِرْ صَبْرًا جَمِيلًا", "صَبْرًا جَمِيلًا"), "n", "Sıfatlı."],
      [HL("فَنَظَرَ نَظْرَةً فِي النُّجُومِ", "نَظْرَةً"), "a", "Bir bakış."],
      [HL("فَأَخَذْنَاهُمْ أَخْذَ عَزِيزٍ مُقْتَدِرٍ", "أَخْذَ عَزِيزٍ"), "n", "Muzâf."],
      [HL("ضَرَبْتُهُ ضَرْبَتَيْنِ", "ضَرْبَتَيْنِ"), "a", "İki kez."],
      [HL("فَهِمْتُ الدَّرْسَ فَهْمًا", "فَهْمًا"), "t", "Yalın masdar."],
      [HL("سِرْتُ سَيْرَ العُقَلَاءِ", "سَيْرَ العُقَلَاءِ"), "n", "Muzâf: akıllılar gibi."],
      [HL("قَفَزَ الوَلَدُ قَفْزَتَيْنِ", "قَفْزَتَيْنِ"), "a", "İki sıçrayış."],
      [HL("كَسَرَ الوَلَدُ الزُّجَاجَ كَسْرًا", "كَسْرًا"), "t", "Yalın masdar."]
    ]) },
    { type: "combo", num: "٣", ar: "عَيِّنِ المَفْعُولَ المُطْلَقَ فِي الجُمَلِ التَّالِيَةِ وَبَيِّنْ نَوْعَهُ", tr: "Mef’ûl-i mutlakı ve türünü seç.", exHtml: "<span class=\"ar\">قَرَأْتُ سُورَةَ الوَاقِعَةِ قِرَاءَةً صَحِيحَةً ← قِرَاءَةً: بَيَانُ النَّوْعِ</span>", items: [
      ["يَنَامُ الأَطْفَالُ نَوْمًا عَمِيقًا.", "نَوْمًا", "الأَطْفَالُ", "عَمِيقًا", "n", "Çocuklar derin bir uyku uyur.", "Sıfatlı masdar: nevi."],
      ["نَحْنُ نُؤْمِنُ بِاللهِ إِيمَانًا قَوِيًّا.", "إِيمَانًا", "قَوِيًّا", "نَحْنُ", "n", "Allah’a güçlü bir imanla inanırız.", "Sıfatlı: nevi."],
      ["طَرَقَ الرَّجُلُ بَابَ الشَّقَّةِ طَرْقًا.", "طَرْقًا", "بَابَ", "الشَّقَّةِ", "t", "Adam dairenin kapısını çaldı da çaldı.", "Yalın masdar: te’kîd."],
      ["أَكَلَ الرَّجُلُ الجَائِعُ الطَّعَامَ أَكْلًا.", "أَكْلًا", "الطَّعَامَ", "الجَائِعُ", "t", "Aç adam yemeği gerçekten yedi.", "Yalın masdar: te’kîd."],
      ["خَسِرَ صَاحِبُ المَحَلِّ خُسْرَانًا كَبِيرًا.", "خُسْرَانًا", "كَبِيرًا", "صَاحِبُ", "n", "Dükkân sahibi büyük bir zarara uğradı.", "Sıfatlı: nevi."],
      ["سَجَدَتِ البِنْتُ الصَّغِيرَةُ سَجْدَةً.", "سَجْدَةً", "الصَّغِيرَةُ", "البِنْتُ", "a", "Küçük kız bir secde yaptı.", "فَعْلَة: bir kez."],
      ["انْتَصَرَ الجَيْشُ انْتِصَارًا عَظِيمًا.", "انْتِصَارًا", "عَظِيمًا", "الجَيْشُ", "n", "Ordu büyük bir zafer kazandı.", "Sıfatlı: nevi."],
      ["تَدُورُ الشُّرْطَةُ فِي الشَّوَارِعِ دَوْرَتَيْنِ فِي اليَوْمِ.", "دَوْرَتَيْنِ", "الشَّوَارِعِ", "اليَوْمِ", "a", "Polis sokaklarda günde iki tur atar.", "Müsennâ: sayı; yâ ile mansûb."]
    ].map(TP) },
    { type: "pick", num: "٤", ar: "ضَعْ عَلَامَةَ (✓) أَمَامَ الجُمْلَةِ الَّتِي تَشْتَمِلُ عَلَى مَفْعُولٍ مُطْلَقٍ", tr: "Mef’ûl-i mutlak bulunan cümleyi seç.", exHtml: "<span class=\"ar\">نَذْكُرُ اللهَ دَائِمًا · نَذْكُرُ اللهَ قَارِئِينَ القُرْآنَ · نَذْكُرُ اللهَ ذِكْرًا كَثِيرًا (✓)</span>", items: PL([
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مُطْلَقٌ؟ (١)", "فَازَ أَحْمَدُ فَوْزًا عَظِيمًا.", "فَازَ أَحْمَدُ بِسِلْسِلَةٍ مِنَ الكُتُبِ.", "فَازَ أَحْمَدُ بِالجَائِزَةِ.", "Ahmed büyük bir başarı kazandı.", "فَوْزًا: فَازَ’ın masdarı, nevi."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مُطْلَقٌ؟ (٢)", "عَامِلِ النَّاسَ مُعَامَلَةً طَيِّبَةً.", "عَامِلِ النَّاسَ كَمَا يَجِبُ.", "طَلَبْتُ مِنَ الأُسْتَاذِ كِتَابًا جَدِيدًا.", "İnsanlara güzel davran.", "مُعَامَلَةً: عَامَلَ’in masdarı."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مُطْلَقٌ؟ (٣)", "يَفِرُّ اللِّصُّ مِنَ الشُّرْطِيِّ فِرَارًا.", "فَرَّ اللِّصُّ مِنَ الشُّرْطِيِّ بِسُرْعَةٍ.", "يَفِرُّ اللِّصُّ مُسْرِعًا.", "Hırsız polisten kaçar da kaçar.", "فِرَارًا: te’kîd. مُسْرِعًا hâl."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مُطْلَقٌ؟ (٤)", "اعْتَرَضَ المُتَّهَمُ عَلَى قَرَارِ القَاضِي اعْتِرَاضًا شَدِيدًا.", "اعْتَرَضَ المُتَّهَمُ عَلَى قَرَارِ القَاضِي.", "لَمْ يَعْتَرِضِ المُتَّهَمُ عَلَى قَرَارِ القَاضِي.", "Sanık hâkimin kararına şiddetle itiraz etti.", "اعْتِرَاضًا شَدِيدًا: nevi."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مُطْلَقٌ؟ (٥)", "سَيَنْتَشِرُ هَذَا الخَبَرُ المُهِمُّ بَيْنَ النَّاسِ انْتِشَارًا سَرِيعًا.", "انْتَشَرَ هَذَا الخَبَرُ المُهِمُّ بَيْنَ النَّاسِ هَذَا الأُسْبُوعَ.", "انْتَشَرَ هَذَا الخَبَرُ المُهِمُّ بَيْنَ النَّاسِ جَمِيعًا.", "Bu önemli haber insanlar arasında hızla yayılacak.", "هَذَا الأُسْبُوعَ zarf, جَمِيعًا hâl."],
      ["أَيُّ الجُمَلِ فِيهَا مَفْعُولٌ مُطْلَقٌ؟ (٦)", "أَجَابَ الطَّالِبُ عَنِ الأَسْئِلَةِ إِجَابَةً صَحِيحَةً.", "أَجَابَ الطَّالِبُ عَنِ الأَسْئِلَةِ فَوْرًا.", "أَجَابَ الطَّالِبُ عَنِ الأَسْئِلَةِ كُلِّهَا.", "Öğrenci sorulara doğru cevap verdi.", "إِجَابَةً: أَجَابَ’ın masdarı."]
    ])},
    { type: "pick", fill: true, num: "٥", ar: "امْلَإِ الفَرَاغَ بِمَفْعُولٍ مُطْلَقٍ مُطَابِقٍ لِمَا بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki türe uyan mef’ûl-i mutlakı seç.", exHtml: "<span class=\"ar\">نَظَرَ السَّائِحُ إِلَى يَمِينِهِ نَظْرَةً. (بَيَانُ العَدَدِ)</span>", items: PL([
      ["كَسَرَ الوَلَدُ الزُّجَاجَ ___ (تَأْكِيدُ الفِعْلِ)", "كَسْرًا", "كَسْرَتَيْنِ", "كَسْرًا شَدِيدًا", "Çocuk camı kırdı da kırdı.", "Te’kîd: yalın masdar."],
      ["نَامَ الضُّيُوفُ المُتْعَبُونَ ___ (بَيَانُ النَّوْعِ)", "نَوْمًا عَمِيقًا", "نَوْمًا", "نَوْمَةً", "Yorgun misafirler derin bir uyku uyudu.", "Nevi: sıfatlı."],
      ["تَدُورُ الأَرْضُ ___ كُلَّ يَوْمٍ. (بَيَانُ العَدَدِ)", "دَوْرَةً", "دَوَرَانًا", "دَوَرَانًا سَرِيعًا", "Dünya her gün bir tur döner.", "Sayı: فَعْلَة."],
      ["يَذْهَبُ العَامِلُ إِلَى المَصْنَعِ ___ (تَأْكِيدُ الفِعْلِ)", "ذَهَابًا", "ذَهَابًا مُبَكِّرًا", "ذَاهِبًا", "İşçi fabrikaya gider.", "Te’kîd. ذَاهِبًا hâl olurdu."],
      ["حَقَّقَ المُؤْتَمَرُ الدَّوْلِيُّ السَّلَامَ ___ (تَأْكِيدُ الفِعْلِ)", "تَحْقِيقًا", "تَحْقِيقًا كَامِلًا", "مُحَقِّقًا", "Uluslararası konferans barışı gerçekten sağladı.", "حَقَّقَ → تَحْقِيق."],
      ["يَسْتَعِدُّ الطُّلَّابُ لِلِاخْتِبَارِ ___ (بَيَانُ النَّوْعِ)", "اسْتِعْدَادًا جَيِّدًا", "اسْتِعْدَادًا", "مُسْتَعِدِّينَ", "Öğrenciler sınava iyi hazırlanır.", "Nevi: sıfatlı."],
      ["أَلْقَى الإِمَامُ الخُطْبَةَ ___ (بَيَانُ النَّوْعِ)", "إِلْقَاءً مُؤَثِّرًا", "إِلْقَاءً", "مُلْقِيًا", "İmam hutbeyi etkileyici biçimde okudu.", "أَلْقَى → إِلْقَاء."],
      ["ابْتَعَدْتُ عَنِ الشَّرِّ ___ (تَأْكِيدُ الفِعْلِ)", "ابْتِعَادًا", "ابْتِعَادًا كَبِيرًا", "مُبْتَعِدًا", "Kötülükten iyice uzaklaştım.", "Te’kîd."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · UYGUN MASDAR VE FİİL
{
  id: "u3", no: 3, ar: "المَصْدَرُ المُنَاسِبُ وَالفِعْلُ المُنَاسِبُ", tr: "Uygun Masdar ve Fiil", short: "Masdar · fiil", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["Boşluğa fiilin kendi masdarını koymak", "Masdar verildiğinde uygun fiili seçmek", "“هَلْ…؟” sorusuna mef’ûl-i mutlakla cevap vermek"],
  examples: [
    { s: "تَقَدَّمَ:mz / المُوَظَّفُ فِي عَمَلِهِ:- / تَقَدُّمًا كَبِيرًا.:nasb", tr: "Memur işinde büyük ilerleme kaydetti." },
    { s: "هَلِ انْتَشَرَ المَرَضُ؟ نَعَمْ،:- / انْتَشَرَ:mz / انْتِشَارًا وَاسِعًا.:nasb", tr: "Hastalık yayıldı mı? Evet, geniş çapta yayıldı." }
  ],
  rules: [
    { tr: "Boşluğa <b>fiilin kendi masdarı</b> gelir. İsm-i fâil (<span class=\"ar\">فَارِحًا، صَابِرًا</span>) hâl olur; ism-i mef’ûl (<span class=\"ar\">مَصْبُورًا</span>) burada yanlıştır." },
    { tr: "Sıfatla uyuma bak: <span class=\"ar\">إِجَابَةً صَحِيحَةً</span> (müennes) · <span class=\"ar\">صَبْرًا جَمِيلًا</span> (müzekker)." },
    { tr: "Masdar verildiyse fiili ondan bul; fâil müennesse fiil de müennes olur:", ex: ["هُبُوطًا ← هَبَطَتِ الطَّائِرَةُ", "إِحْسَانًا ← أَحْسَنَ · صَرْخَةً ← صَرَخَ"] },
    { tr: "“<span class=\"ar\">هَلْ…؟</span>” sorusuna aynı fiil ve onun masdarıyla cevap ver: <span class=\"ar\">هَلِ احْتَرَمَ الطُّلَّابُ الأُسْتَاذَ؟ ← نَعَمْ، احْتَرَمُوهُ احْتِرَامًا عَظِيمًا</span>." }
  ],
  kaide: ["المَفْعُولُ المُطْلَقُ مَصْدَرٌ مَنْصُوبٌ مِنْ لَفْظِ الفِعْلِ: تَقَدَّمَ المُوَظَّفُ فِي عَمَلِهِ تَقَدُّمًا كَبِيرًا."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "امْلَإِ الفَرَاغَ بِمَفْعُولٍ مُطْلَقٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa uyan mef’ûl-i mutlakı seç.", items: PL([
      ["فَرِحَ الوَالِدَانِ لِنَجَاحِ أَوْلَادِهِمَا ___ شَدِيدًا.", "فَرَحًا", "فَارِحًا", "فَارِحَةً", "Anne-baba çocuklarının başarısına çok sevindi.", "فَرِحَ → فَرَح."],
      ["أَكَلَ العَامِلُونَ ___ فِي المَصْنَعِ.", "أَكْلَةً", "آكِلًا", "أَكْلَةٌ", "İşçiler fabrikada bir öğün yemek yedi.", "أَكْلَة: bir kez (sayı), mansûb."],
      ["يَجْتَهِدُ الطُّلَّابُ فِي دُرُوسِهِمُ ___.", "اجْتِهَادًا", "جِهَادًا", "جَاهِدًا", "Öğrenciler derslerinde çalıştıkça çalışır.", "اجْتَهَدَ → اجْتِهَاد; جِهَاد جَاهَدَ’in masdarı."],
      ["أَحْتَرِمُ الكِبَارَ ___ عَظِيمًا.", "احْتِرَامًا", "مُحْتَرِمًا", "مُحْتَرِمَةً", "Büyüklere büyük saygı gösteririm.", "احْتَرَمَ → احْتِرَام."],
      ["رَكَعَتِ البِنْتُ ___ رَكَعَاتٍ.", "ثَلَاثَ", "وَاحِدٌ", "اثْنَانِ", "Kız üç rekât kıldı.", "Sayı masdarın yerine geçer, mansûb: ثَلَاثَ رَكَعَاتٍ."],
      ["يَعِيشُ النَّاسُ فِي هَذِهِ القَرْيَةِ ___ الأَغْنِيَاءِ.", "عِيشَةَ", "عِيشَةُ", "حَيَاةً", "Bu köyde insanlar zenginler gibi yaşar.", "عِيشَة (عَاشَ) muzâf: nevi."],
      ["أَجَابَ الطُّلَّابُ عَنِ الأَسْئِلَةِ ___ صَحِيحَةً.", "إِجَابَةً", "جَوَابًا", "مُجِيبَةً", "Öğrenciler sorulara doğru cevap verdi.", "أَجَابَ → إِجَابَة; sıfat müennes."],
      ["يَصْبِرُ المُسْلِمُ عَلَى المَصَائِبِ ___ جَمِيلًا.", "صَبْرًا", "صَابِرًا", "مَصْبُورًا", "Müslüman musibetlere güzelce sabreder.", "صَبَرَ → صَبْر."]
    ])},
    { type: "pick", fill: true, num: "٦", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ الفِعْلِ المُنَاسِبِ", tr: "Masdara uyan fiili seç.", exHtml: "<span class=\"ar\">تَقَدَّمَ المُوَظَّفُ فِي عَمَلِهِ تَقَدُّمًا كَبِيرًا.</span>", items: PL([
      ["___ الدَّرْسَ فَهْمًا صَحِيحًا.", "فَهِمْتُ", "قَرَأْتُ", "كَتَبْتُ", "Dersi doğru anladım.", "فَهْمًا ← فَهِمَ."],
      ["___ الطَّالِبُ جُلُوسَ العُلَمَاءِ.", "جَلَسَ", "قَامَ", "نَامَ", "Öğrenci âlimler gibi oturdu.", "جُلُوس ← جَلَسَ."],
      ["___ صَاحِبُ البَيْتِ ضُيُوفَهُ إِكْرَامًا حَسَنًا.", "أَكْرَمَ", "كَرُمَ", "اسْتَقْبَلَ", "Ev sahibi misafirlerine güzel ikramda bulundu.", "إِكْرَام ← أَكْرَمَ."],
      ["___ الرَّجُلُ الغَنِيُّ إِلَى الفُقَرَاءِ إِحْسَانًا كَثِيرًا.", "أَحْسَنَ", "حَسُنَ", "أَعْطَى", "Zengin adam fakirlere çok iyilik etti.", "إِحْسَان ← أَحْسَنَ."],
      ["___ الطَّائِرَةُ هُبُوطًا مُرِيحًا.", "هَبَطَتِ", "هَبَطَ", "طَارَتِ", "Uçak rahat bir iniş yaptı.", "هُبُوط ← هَبَطَ; fâil müennes."],
      ["___ الطِّفْلُ صَرْخَةً.", "صَرَخَ", "صَرَخَتِ", "بَكَى", "Çocuk bir çığlık attı.", "صَرْخَة ← صَرَخَ; fâil müzekker."],
      ["___ الطَّالِبُ أَسَاتِذَتَهُ احْتِرَامًا عَظِيمًا.", "احْتَرَمَ", "حَرُمَ", "أَحَبَّ", "Öğrenci hocalarına büyük saygı gösterdi.", "احْتِرَام ← احْتَرَمَ."],
      ["___ المَطَرُ هَذَا المَسَاءَ نُزُولًا شَدِيدًا.", "نَزَلَ", "نَزَلَتِ", "أَنْزَلَ", "Bu akşam yağmur şiddetle yağdı.", "نُزُول ← نَزَلَ (أَنْزَلَ’in masdarı إِنْزَال)."]
    ])},
    { type: "pick", num: "٧", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ بِجُمَلٍ تَشْتَمِلُ عَلَى مَفْعُولٍ مُطْلَقٍ", tr: "Mef’ûl-i mutlakla verilen doğru cevabı seç.", exHtml: "<span class=\"ar\">هَلِ انْتَشَرَ المَرَضُ فِي البِلَادِ؟ ← نَعَمْ، انْتَشَرَ انْتِشَارًا وَاسِعًا.</span>", items: PL([
      ["هَلِ انْتَقَمَ المَظْلُومُ مِنَ الظَّالِمِ؟", "نَعَمْ، انْتَقَمَ مِنْهُ انْتِقَامًا شَدِيدًا.", "نَعَمْ، انْتَقَمَ مِنْهُ انْتِقَامٌ شَدِيدٌ.", "نَعَمْ، انْتَقَمَ مِنْهُ مُنْتَقِمًا.", "Evet, ondan şiddetle intikam aldı.", "انْتَقَمَ → انْتِقَام, mansûb."],
      ["هَلِ ابْتَعَدَ الأَطْفَالُ عَنِ الحَرِيقِ؟", "نَعَمْ، ابْتَعَدُوا عَنْهُ ابْتِعَادًا كَبِيرًا.", "نَعَمْ، ابْتَعَدُوا عَنْهُ ابْتِعَادٌ كَبِيرٌ.", "نَعَمْ، ابْتَعَدُوا عَنْهُ مُبْتَعِدِينَ.", "Evet, ondan iyice uzaklaştılar.", "ابْتَعَدَ → ابْتِعَاد."],
      ["هَلِ اسْتَعَدَّ الطُّلَّابُ لِلِاخْتِبَارِ؟", "نَعَمْ، اسْتَعَدُّوا لَهُ اسْتِعْدَادًا جَيِّدًا.", "نَعَمْ، اسْتَعَدُّوا لَهُ اسْتِعْدَادٌ جَيِّدٌ.", "نَعَمْ، اسْتَعَدُّوا لَهُ اسْتِعْدَادًا جَيِّدٌ.", "Evet, ona iyi hazırlandılar.", "Masdar ve sıfatı mansûb."],
      ["هَلِ احْتَرَمَ الطُّلَّابُ الأُسْتَاذَ؟", "نَعَمْ، احْتَرَمُوهُ احْتِرَامًا عَظِيمًا.", "نَعَمْ، احْتَرَمُوهُ احْتِرَامٌ عَظِيمٌ.", "نَعَمْ، احْتَرَمُوهُ مُحْتَرِمِينَ.", "Evet, ona büyük saygı gösterdiler.", "احْتَرَمَ → احْتِرَام."],
      ["هَلْ قَرَأَ الإِمَامُ سُورَةَ يس؟", "نَعَمْ، قَرَأَهَا قِرَاءَةً جَمِيلَةً.", "نَعَمْ، قَرَأَهَا قِرَاءَةٌ جَمِيلَةٌ.", "نَعَمْ، قَرَأَهَا قَارِئًا.", "Evet, onu güzel okudu.", "قَرَأَ → قِرَاءَة."],
      ["هَلِ ازْدَادَتْ حَوَادِثُ المُرُورِ؟", "نَعَمْ، ازْدَادَتِ ازْدِيَادًا كَبِيرًا.", "نَعَمْ، ازْدَادَتِ ازْدِيَادٌ كَبِيرٌ.", "نَعَمْ، ازْدَادَتْ زِيَادَةٌ كَبِيرَةٌ.", "Evet, çok arttı.", "ازْدَادَ → ازْدِيَاد."],
      ["هَلْ حَجَّ مَحْمُودٌ البَيْتَ الحَرَامَ؟", "نَعَمْ، حَجَّهُ حَجًّا مَبْرُورًا.", "نَعَمْ، حَجَّهُ حَجٌّ مَبْرُورٌ.", "نَعَمْ، حَجَّهُ حَاجًّا.", "Evet, makbul bir hac yaptı.", "حَجَّ → حَجّ."],
      ["هَلِ ارْتَفَعَتْ قِيمَةُ الدُّولَارِ فِي السَّنَوَاتِ الأَخِيرَةِ؟", "نَعَمْ، ارْتَفَعَتِ ارْتِفَاعًا كَبِيرًا.", "نَعَمْ، ارْتَفَعَتِ ارْتِفَاعٌ كَبِيرٌ.", "نَعَمْ، ارْتَفَعَتْ مُرْتَفِعَةً.", "Evet, çok yükseldi.", "ارْتَفَعَ → ارْتِفَاع."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · NÂİB
{
  id: "u4", no: 4, ar: "مَا يَنُوبُ عَنِ المَفْعُولِ المُطْلَقِ", tr: "Masdarın Yerine Geçenler (Nâib)", short: "Nâib", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Masdar atılınca yerine eş anlamlısının, sıfatının geçtiğini bilmek", "كُلّ، بَعْض ve sayının nâib olduğunu bilmek", "Nâibi bulup türünü söylemek"],
  examples: [
    { s: "جَلَسْتُ:mz / قُعُودًا.:cerr", tr: "Oturdum. (eş anlamlısı: قُعُود = جُلُوس)" },
    { s: "أَكَلْتُ:mz / قَلِيلًا.:cerr", tr: "Az yedim. (أَكَلْتُ أَكْلًا قَلِيلًا)", pair: "لَا:- / تُسْرِفْ:mz / كُلَّ:cerr / الإِسْرَافِ.:-", pairTr: "Tamamen israf etme." },
    { s: "نَصَحْتُ:mz / الطُّلَّابَ:- / بَعْضَ:cerr / النُّصْحِ.:-", tr: "Öğrencilere biraz nasihat ettim.", pair: "دَارَ:mz / اللَّاعِبُ حَوْلَ المَلْعَبِ:- / ثَلَاثَ:cerr / دَوْرَاتٍ.:-", pairTr: "Oyuncu sahanın etrafında üç tur attı." }
  ],
  rules: [
    { tr: "Masdar (<b>sarîh masdar</b>) atılabilir; yerine geçen kelime (<b>nâib</b>) mef’ûl-i mutlak gibi mansûb olur." },
    { tr: "<b>Eş anlamlısı</b>: <span class=\"ar\">جَلَسْتُ قُعُودًا · قُمْتُ وُقُوفًا</span>. <b>Sıfatı</b>: <span class=\"ar\">أَكَلْتُ قَلِيلًا</span> = <span class=\"ar\">أَكَلْتُ أَكْلًا قَلِيلًا</span>." },
    { tr: "<b>كُلّ / بَعْض</b> masdara muzâf olarak gelir; <b>sayı</b> temyiziyle gelir. Bu kelimeler mansûbdur, ardındaki masdar muzâfun ileyh olup mecrûrdur:", ex: ["لَا تُسْرِفْ كُلَّ الإِسْرَافِ · نَصَحْتُ الطُّلَّابَ بَعْضَ النُّصْحِ", "دَارَ اللَّاعِبُ حَوْلَ المَلْعَبِ ثَلَاثَ دَوْرَاتٍ"] },
    { tr: "Sayıda müzekker-müennes uyumuna dikkat: <span class=\"ar\">طَرْقَة</span> müennes olduğu için <span class=\"ar\">ثَلَاثَ طَرَقَاتٍ</span>." }
  ],
  kaide: ["وَقَدْ يُحْذَفُ المَصْدَرُ الصَّرِيحُ وَيَنُوبُ عَنْهُ: أ ـ مُرَادِفُهُ: جَلَسْتُ قُعُودًا. ب ـ صِفَتُهُ: أَكَلْتُ قَلِيلًا (أَكَلْتُ أَكْلًا قَلِيلًا). جـ ـ أَلْفَاظُ «بَعْض» وَ«كُلّ» وَالأَعْدَادُ: لَا تُسْرِفْ كُلَّ الإِسْرَافِ، نَصَحْتُ الطُّلَّابَ بَعْضَ النُّصْحِ، دَارَ اللَّاعِبُ حَوْلَ المَلْعَبِ ثَلَاثَ دَوْرَاتٍ."],
  ex: [
    { type: "classify", extra: true, opts: NB, ar: "مَا الَّذِي نَابَ عَنِ المَصْدَرِ؟", tr: "Koyu nâib masdarın eş anlamlısı mı, sıfatı mı, كُلّ / بَعْض mı, sayı mı?", items: CL([
      [HL("جَلَسْتُ قُعُودًا", "قُعُودًا"), "r", "قُعُود = جُلُوس."],
      [HL("قُمْتُ وُقُوفًا", "وُقُوفًا"), "r", "وُقُوف ≈ قِيَام."],
      [HL("فَرِحْتُ جَذَلًا", "جَذَلًا"), "r", "جَذَل = فَرَح."],
      [HL("أَكَلْتُ قَلِيلًا", "قَلِيلًا"), "s", "أَكْلًا قَلِيلًا."],
      [HL("نِمْتُ طَوِيلًا", "طَوِيلًا"), "s", "نَوْمًا طَوِيلًا."],
      [HL("ضَحِكُوا كَثِيرًا", "كَثِيرًا"), "s", "ضَحِكًا كَثِيرًا."],
      [HL("لَا تُسْرِفْ كُلَّ الإِسْرَافِ", "كُلَّ"), "k", "كُلَّ + masdar."],
      [HL("نَصَحْتُ الطُّلَّابَ بَعْضَ النُّصْحِ", "بَعْضَ"), "k", "بَعْضَ + masdar."],
      [HL("اجْتَهَدْتُ كُلَّ الِاجْتِهَادِ", "كُلَّ"), "k", "كُلَّ + masdar."],
      [HL("دَارَ اللَّاعِبُ ثَلَاثَ دَوْرَاتٍ", "ثَلَاثَ"), "a", "Sayı."],
      [HL("ضَرَبْتُهُ عَشْرَ ضَرَبَاتٍ", "عَشْرَ"), "a", "Sayı."],
      [HL("طَافَ بِالبَيْتِ سَبْعَةَ أَشْوَاطٍ", "سَبْعَةَ"), "a", "Sayı; شَوْط müzekker → سَبْعَةَ."]
    ]) },
    { type: "combo", num: "٨", ar: "عَيِّنْ فِي الجُمَلِ التَّالِيَةِ مَا يَنُوبُ عَنِ المَفْعُولِ المُطْلَقِ", tr: "Masdarın yerine geçen kelimeyi ve türünü seç.", items: [
      ["اجْتَهَدْتُ كُلَّ اجْتِهَادٍ.", "كُلَّ", "اجْتِهَادٍ", "اجْتَهَدْتُ", "k", "Var gücümle çalıştım.", "كُلَّ nâib, mansûb; اجْتِهَادٍ muzâfun ileyh."],
      ["جَلَسْتُ طَوِيلًا.", "طَوِيلًا", "جَلَسْتُ", "تُ", "s", "Uzun süre oturdum.", "Aslı: جَلَسْتُ جُلُوسًا طَوِيلًا."],
      ["أَحْتَرِمُ الكِبَارَ كُلَّ الِاحْتِرَامِ.", "كُلَّ", "الكِبَارَ", "الِاحْتِرَامِ", "k", "Büyüklere tam saygı gösteririm.", "الكِبَارَ mef’ûlün bih."],
      ["نَفَعَ النُّصْحُ الطِّفْلَ بَعْضَ النَّفْعِ.", "بَعْضَ", "الطِّفْلَ", "النَّفْعِ", "k", "Nasihat çocuğa biraz fayda verdi.", "بَعْضَ nâib."],
      ["سَاعَدْتُ الأُسْتَاذَ بَعْضَ المُسَاعَدَةِ.", "بَعْضَ", "الأُسْتَاذَ", "المُسَاعَدَةِ", "k", "Hocaya biraz yardım ettim.", "بَعْضَ nâib."],
      ["حَاوَلْتُ حَلَّ هَذِهِ المُشْكِلَةِ كُلَّ المُحَاوَلَةِ.", "كُلَّ", "حَلَّ", "المُحَاوَلَةِ", "k", "Bu sorunu çözmek için elimden geleni yaptım.", "حَلَّ mef’ûlün bih."],
      ["لَا تَمْدَحِ الرَّجُلَ كُلَّ المَدْحِ فَتُتَّهَمَ بِالمُدَاهَنَةِ.", "كُلَّ", "الرَّجُلَ", "المَدْحِ", "k", "Adamı aşırı övme, yoksa dalkavuklukla suçlanırsın.", "كُلَّ nâib. (Kitapta لا تَمْدَحْ الرجلَ; vasılda تَمْدَحِ.)"],
      ["طَرَقَ الرَّجُلُ البَابَ ثَلَاثَ طَرَقَاتٍ فَلَمْ يُفْتَحْ لَهُ.", "ثَلَاثَ", "البَابَ", "طَرَقَاتٍ", "a", "Adam kapıyı üç kez çaldı ama ona açılmadı.", "Sayı nâib; طَرَقَاتٍ temyiz (muzâfun ileyh)."]
    ].map(NBP) },
    { type: "pick", extra: true, ar: "احْذِفِ المَصْدَرَ وَأَنِبْ عَنْهُ", tr: "Masdarı at, yerine geçeni doğru yaz.", items: PL([
      ["أَكَلْتُ أَكْلًا قَلِيلًا. ← masdarı at", "أَكَلْتُ قَلِيلًا.", "أَكَلْتُ قَلِيلٌ.", "أَكَلْتُ قَلِيلٍ.", "Az yedim.", "Sıfat mansûb kalır."],
      ["ضَحِكُوا ضَحِكًا كَثِيرًا. ← masdarı at", "ضَحِكُوا كَثِيرًا.", "ضَحِكُوا كَثِيرٌ.", "ضَحِكُوا كَثِيرٍ.", "Çok güldüler.", "Sıfat nâib, mansûb."],
      ["جَلَسْتُ جُلُوسًا طَوِيلًا. ← masdarı at", "جَلَسْتُ طَوِيلًا.", "جَلَسْتُ طَوِيلٌ.", "جَلَسْتُ طَوِيلٍ.", "Uzun süre oturdum.", "Sıfat nâib."],
      ["اجْتَهَدْتُ اجْتِهَادًا تَامًّا. ← كُلّ ile", "اجْتَهَدْتُ كُلَّ الِاجْتِهَادِ.", "اجْتَهَدْتُ كُلُّ الِاجْتِهَادِ.", "اجْتَهَدْتُ كُلَّ الِاجْتِهَادَ.", "Var gücümle çalıştım.", "كُلَّ mansûb, masdar mecrûr."],
      ["نَصَحْتُهُ نُصْحًا قَلِيلًا. ← بَعْض ile", "نَصَحْتُهُ بَعْضَ النُّصْحِ.", "نَصَحْتُهُ بَعْضُ النُّصْحِ.", "نَصَحْتُهُ بَعْضَ النُّصْحَ.", "Ona biraz nasihat ettim.", "بَعْضَ mansûb, النُّصْحِ mecrûr."],
      ["دَارَ اللَّاعِبُ دَوْرَةً. ← üç kez", "دَارَ اللَّاعِبُ ثَلَاثَ دَوْرَاتٍ.", "دَارَ اللَّاعِبُ ثَلَاثَةَ دَوْرَاتٍ.", "دَارَ اللَّاعِبُ ثَلَاثُ دَوْرَاتٍ.", "Oyuncu üç tur attı.", "دَوْرَة müennes → ثَلَاثَ; sayı mansûb."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: مِنَ البُطُولَاتِ الخَالِدَةِ", tr: "Okuma: Ölümsüz Kahramanlıklar", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinde mef’ûl-i mutlakları ve türlerini bulmak", "Lâzım ve müteaddî fiilleri ayırmak", "Yermük Savaşı metnini okuyup anlamak"],
  examples: [
    { s: "وَاتَّحَدَتْ:mz / جُيُوشُ المُسْلِمِينَ:- / اتِّحَادَ الأُخُوَّةِ.:nasb", tr: "Müslüman orduları kardeşler gibi birleşti. (nevi, muzâf)" },
    { s: "وَانْتَصَرَتْ:mz / عَلَى جُيُوشِ الرُّومِ:- / انْتِصَارًا حَاسِمًا.:nasb", tr: "Bizans ordularına karşı kesin bir zafer kazandı. (nevi, sıfatlı)" }
  ],
  rules: [
    { tr: "Metinlerde mef’ûl-i mutlak çoğu zaman sıfatlı ya da muzâftır: <span class=\"ar\">اتِّحَادَ الأُخُوَّةِ · هُجُومَ الوَاثِقِ · انْتِصَارًا حَاسِمًا</span>." },
    { tr: "Lâzım fiil de mef’ûl-i mutlak alır (<span class=\"ar\">انْتَصَرَتْ انْتِصَارًا</span>); bu onu müteaddî yapmaz. Müteaddî fiil mef’ûlün bihini ayrıca alır (<span class=\"ar\">شَهِدَهَا</span>)." },
    { tr: "<span class=\"ar\">أَمَلًا فِي النَّصْرِ</span> başka kökten masdardır ve sebep bildirir: mef’ûlün lieclih, mef’ûl-i mutlak değil." }
  ],
  kaide: ["اسْتَخْرِجْ مِنَ النَّصِّ: فِعْلًا لَازِمًا، فِعْلًا مُتَعَدِّيًا، المَفْعُولَ المُطْلَقَ."],
  ex: [
    { type: "reading", num: "٩", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ: فِعْلًا لَازِمًا، فِعْلًا مُتَعَدِّيًا، المَفْعُولَ المُطْلَقَ", tr: "Metni oku, soruları cevapla; sonra koyu kelimeyi sınıflandır.", title: "مِنَ البُطُولَاتِ الخَالِدَةِ",
      text: "فِي عَهْدِ الخَلِيفَةِ أَبِي بَكْرٍ الصِّدِّيقِ رَضِيَ اللهُ عَنْهُ تَمَّ الإِعْدَادُ لِمَعْرَكَةِ اليَرْمُوكِ، تِلْكَ المَعْرَكَةُ وَقَعَتْ فِي بِلَادِ الشَّامِ بَيْنَ المُسْلِمِينَ بِقِيَادَةِ خَالِدِ بْنِ الوَلِيدِ وَجُيُوشِ الرُّومِ. فَدَفَعَتِ الرُّومُ بِجُيُوشِهَا أَمَلًا فِي النَّصْرِ، وَاتَّحَدَتْ جُيُوشُ المُسْلِمِينَ اتِّحَادَ الأُخُوَّةِ، وَصَمَّمَتْ عَلَى الِانْتِصَارِ تَصْمِيمًا، فَهَجَمَتْ هُجُومَ الوَاثِقِ، وَانْتَصَرَتْ عَلَى جُيُوشِ الرُّومِ انْتِصَارًا حَاسِمًا بَعْدَ مَعْرَكَةٍ طَوِيلَةٍ قَاسِيَةٍ.<br>وَقَدْ تَمَّ هَذَا النَّصْرُ العَظِيمُ لِلْمُسْلِمِينَ فِي عَهْدِ الخَلِيفَةِ عُمَرَ بْنِ الخَطَّابِ رَضِيَ اللهُ عَنْهُ، وَبَقِيَتْ هَذِهِ المَعْرَكَةُ فِي التَّارِيخِ مِنْ مَعَارِكِ الإِسْلَامِ الخَالِدَةِ. وَقَدْ شَهِدَهَا أَلْفُ رَجُلٍ مِنْ أَصْحَابِ رَسُولِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، فِيهِمْ مِمَّنْ شَهِدُوا غَزْوَةَ بَدْرٍ.",
      textTr: "Halife Ebû Bekir es-Sıddîk döneminde Yermük Savaşı’na hazırlık yapıldı. Bu savaş Şam diyarında, Hâlid b. Velîd komutasındaki Müslümanlarla Bizans orduları arasında oldu. Bizans zafer umuduyla ordularını sürdü. Müslüman orduları kardeşler gibi birleşti, zafere kesin olarak karar verdi, kendinden emin birinin saldırışıyla saldırdı ve uzun, çetin bir savaştan sonra Bizans ordularına karşı kesin bir zafer kazandı. Bu büyük zafer Halife Ömer b. Hattâb döneminde gerçekleşti ve bu savaş tarihte İslam’ın ölümsüz savaşlarından biri olarak kaldı. Ona Resûlullah’ın ashabından bin kişi katıldı; aralarında Bedir Gazvesi’ne katılmış olanlar da vardı.",
      qa: [
        { q: "أَيْنَ وَقَعَتْ مَعْرَكَةُ اليَرْمُوكِ؟", a: "فِي بِلَادِ الشَّامِ.", tr: "Yermük Savaşı nerede oldu? Şam diyarında." },
        { q: "مَنْ قَادَ جُيُوشَ المُسْلِمِينَ؟", a: "خَالِدُ بْنُ الوَلِيدِ.", tr: "Müslüman ordularına kim komuta etti? Hâlid b. Velîd." },
        { q: "كَيْفَ هَجَمَتْ جُيُوشُ المُسْلِمِينَ؟", a: "هَجَمَتْ هُجُومَ الوَاثِقِ.", tr: "Müslüman orduları nasıl saldırdı? Kendinden emin birinin saldırışıyla." },
        { q: "فِي عَهْدِ أَيِّ خَلِيفَةٍ تَمَّ النَّصْرُ؟", a: "فِي عَهْدِ عُمَرَ بْنِ الخَطَّابِ رَضِيَ اللهُ عَنْهُ.", tr: "Zafer hangi halife döneminde gerçekleşti? Ömer b. Hattâb döneminde." },
        { q: "كَمْ رَجُلًا مِنَ الصَّحَابَةِ شَهِدَ المَعْرَكَةَ؟", a: "أَلْفُ رَجُلٍ.", tr: "Savaşa ashaptan kaç kişi katıldı? Bin kişi." }
      ],
      cls: { opts: RD, ar: "اسْتَخْرِجْ مِنَ النَّصِّ", tr: "Koyu kelime lâzım fiil mi, müteaddî fiil mi, mef’ûl-i mutlak mı, başka mı?", items: [
        { s: HL("تِلْكَ المَعْرَكَةُ وَقَعَتْ فِي بِلَادِ الشَّامِ", "وَقَعَتْ"), a: "l", why: "Mef’ûl almaz." },
        { s: HL("تَمَّ الإِعْدَادُ لِمَعْرَكَةِ اليَرْمُوكِ", "تَمَّ"), a: "l", why: "Lâzım: fâili الإِعْدَادُ." },
        { s: HL("وَاتَّحَدَتْ جُيُوشُ المُسْلِمِينَ", "وَاتَّحَدَتْ"), a: "l", why: "اِفْتَعَلَ, lâzım." },
        { s: HL("فَهَجَمَتْ هُجُومَ الوَاثِقِ", "فَهَجَمَتْ"), a: "l", why: "Lâzım; هُجُومَ mef’ûl-i mutlak." },
        { s: HL("وَانْتَصَرَتْ عَلَى جُيُوشِ الرُّومِ", "وَانْتَصَرَتْ"), a: "l", why: "عَلَى ile; lâzım." },
        { s: HL("وَقَدْ شَهِدَهَا أَلْفُ رَجُلٍ", "شَهِدَهَا"), a: "m", why: "Mef’ûl ـهَا." },
        { s: HL("مِمَّنْ شَهِدُوا غَزْوَةَ بَدْرٍ", "شَهِدُوا"), a: "m", why: "Mef’ûl غَزْوَةَ." },
        { s: HL("اتِّحَادَ الأُخُوَّةِ", "اتِّحَادَ"), a: "t", why: "Muzâf: nevi." },
        { s: HL("وَصَمَّمَتْ عَلَى الِانْتِصَارِ تَصْمِيمًا", "تَصْمِيمًا"), a: "t", why: "Yalın: te’kîd." },
        { s: HL("فَهَجَمَتْ هُجُومَ الوَاثِقِ", "هُجُومَ"), a: "t", why: "Muzâf: nevi." },
        { s: HL("انْتِصَارًا حَاسِمًا", "انْتِصَارًا"), a: "t", why: "Sıfatlı: nevi." },
        { s: HL("فَدَفَعَتِ الرُّومُ بِجُيُوشِهَا أَمَلًا فِي النَّصْرِ", "أَمَلًا"), a: "x", why: "Mef’ûlün lieclih (sebep)." },
        { s: HL("بَعْدَ مَعْرَكَةٍ طَوِيلَةٍ قَاسِيَةٍ", "بَعْدَ"), a: "x", why: "Zarf-ı zaman." }
      ]}
    },
    { type: "tag", extra: true, roles: ["mz", "nasb", "cerr", "x"], ar: "عَيِّنِ المَفْعُولَ المُطْلَقَ فِي جُمَلِ النَّصِّ", tr: "Metinden cümleler: fiili ve mef’ûl-i mutlakı etiketle.", items: [
      T("وَاتَّحَدَتْ:mz / جُيُوشُ المُسْلِمِينَ:x / اتِّحَادَ الأُخُوَّةِ:nasb", "Müslüman orduları kardeşler gibi birleşti.", "Muzâf: nevi."),
      T("وَصَمَّمَتْ:mz / عَلَى الِانْتِصَارِ:x / تَصْمِيمًا:nasb", "Zafere kesin olarak karar verdi.", "Yalın: te’kîd."),
      T("فَهَجَمَتْ:mz / هُجُومَ الوَاثِقِ:nasb", "Kendinden emin birinin saldırışıyla saldırdı.", "Muzâf: nevi."),
      T("وَانْتَصَرَتْ:mz / عَلَى جُيُوشِ الرُّومِ:x / انْتِصَارًا حَاسِمًا:nasb", "Bizans ordularına karşı kesin bir zafer kazandı.", "Sıfatlı: nevi."),
      T("فَدَفَعَتِ:mz / الرُّومُ بِجُيُوشِهَا:x / أَمَلًا فِي النَّصْرِ:x", "Bizans zafer umuduyla ordularını sürdü.", "أَمَلًا başka kökten, sebep: mef’ûl-i mutlak değil.")
    ]}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["وَكَلَّمَ اللهُ مُوسَى {تَكْلِيمًا}.", ["تَكْلِيمًا", "مُكَلِّمًا", "تَكْلِيمٌ"], "te’kîd", "Allah Mûsâ ile gerçekten konuştu.", "u1"],
  ["فَاصْبِرْ {صَبْرًا} جَمِيلًا.", ["صَبْرًا", "صَابِرًا", "صَبْرٌ"], "nevi", "Güzel bir sabırla sabret.", "u1"],
  ["إِنَّا فَتَحْنَا لَكَ {فَتْحًا} مُبِينًا.", ["فَتْحًا", "فَاتِحًا", "فَتْحٌ"], "nevi", "Sana apaçık bir fetih verdik.", "u1"],
  ["فَنَظَرَ {نَظْرَةً} فِي النُّجُومِ.", ["نَظْرَةً", "نَاظِرًا", "نَظْرَةٌ"], "sayı", "Yıldızlara bir göz attı.", "u1"],
  ["ظَلَمْتُ نَفْسِي {ظُلْمًا} كَثِيرًا.", ["ظُلْمًا", "ظَالِمًا", "ظُلْمٌ"], "nevi", "Nefsime çok zulmettim.", "u1"],
  ["مَزَّقْتُ الصَّحِيفَةَ {تَمْزِيقًا}.", ["تَمْزِيقًا", "مُمَزِّقًا", "تَمْزِيقٌ"], "te’kîd", "Gazeteyi paramparça ettim.", "u2"],
  ["نِمْتُ نَوْمًا {عَمِيقًا}.", ["عَمِيقًا", "عَمِيقٌ", "عَمِيقٍ"], "sıfat da mansûb", "Derin bir uyku uyudum.", "u2"],
  ["دَارَ اللَّاعِبُ حَوْلَ المَلْعَبِ {دَوْرَةً}.", ["دَوْرَةً", "دَائِرًا", "دَوْرَةٌ"], "sayı: فَعْلَة", "Oyuncu bir tur attı.", "u2"],
  ["تَدُورُ الشُّرْطَةُ فِي الشَّوَارِعِ {دَوْرَتَيْنِ}.", ["دَوْرَتَيْنِ", "دَوْرَتَانِ", "دَوْرَتَا"], "müsennâ: yâ", "Polis sokaklarda iki tur atar.", "u2"],
  ["سَجَدَتِ البِنْتُ {سَجْدَةً}.", ["سَجْدَةً", "سَاجِدَةً", "سَجْدَةٌ"], "sayı", "Kız bir secde yaptı.", "u2"],
  ["أَجَابَ الطَّالِبُ عَنِ الأَسْئِلَةِ {إِجَابَةً} صَحِيحَةً.", ["إِجَابَةً", "مُجِيبًا", "إِجَابَةٌ"], "nevi", "Öğrenci sorulara doğru cevap verdi.", "u2"],
  ["فَرِحَ الوَالِدَانِ {فَرَحًا} شَدِيدًا.", ["فَرَحًا", "فَارِحًا", "فَرَحٌ"], "fiilin masdarı", "Anne-baba çok sevindi.", "u3"],
  ["يَجْتَهِدُ الطُّلَّابُ {اجْتِهَادًا}.", ["اجْتِهَادًا", "جِهَادًا", "جَاهِدًا"], "aynı bab", "Öğrenciler çalıştıkça çalışır.", "u3"],
  ["{هَبَطَتِ} الطَّائِرَةُ هُبُوطًا مُرِيحًا.", ["هَبَطَتِ", "طَارَتِ", "هَبَطَ"], "masdara uyan fiil", "Uçak rahat bir iniş yaptı.", "u3"],
  ["{أَكْرَمَ} صَاحِبُ البَيْتِ ضُيُوفَهُ إِكْرَامًا حَسَنًا.", ["أَكْرَمَ", "كَرُمَ", "اسْتَقْبَلَ"], "إِكْرَام ← أَكْرَمَ", "Ev sahibi misafirlerine güzel ikram etti.", "u3"],
  ["يَعِيشُ النَّاسُ هُنَا {عِيشَةَ} الأَغْنِيَاءِ.", ["عِيشَةَ", "عِيشَةُ", "عِيشَةً"], "muzâf, mansûb", "İnsanlar burada zenginler gibi yaşar.", "u3"],
  ["انْتَقَمَ المَظْلُومُ مِنَ الظَّالِمِ {انْتِقَامًا} شَدِيدًا.", ["انْتِقَامًا", "مُنْتَقِمًا", "انْتِقَامٌ"], "fiilin masdarı", "Mazlum zalimden şiddetle intikam aldı.", "u3"],
  ["لَا تُسْرِفْ {كُلَّ} الإِسْرَافِ.", ["كُلَّ", "كُلُّ", "كُلِّ"], "nâib mansûb", "Tamamen israf etme.", "u4"],
  ["نَصَحْتُ الطُّلَّابَ {بَعْضَ} النُّصْحِ.", ["بَعْضَ", "بَعْضُ", "بَعْضٍ"], "nâib mansûb", "Öğrencilere biraz nasihat ettim.", "u4"],
  ["أَكَلْتُ {قَلِيلًا}.", ["قَلِيلًا", "قَلِيلٌ", "قَلِيلٍ"], "sıfat nâib", "Az yedim.", "u4"],
  ["جَلَسْتُ {قُعُودًا}.", ["قُعُودًا", "قَاعِدٌ", "قُعُودٌ"], "eş anlamlı nâib", "Oturdum.", "u4"],
  ["طَرَقَ الرَّجُلُ البَابَ {ثَلَاثَ} طَرَقَاتٍ.", ["ثَلَاثَ", "ثَلَاثُ", "ثَلَاثَةَ"], "sayı nâib; müennes temyiz", "Adam kapıyı üç kez çaldı.", "u4"],
  ["وَاتَّحَدَتْ جُيُوشُ المُسْلِمِينَ {اتِّحَادَ} الأُخُوَّةِ.", ["اتِّحَادَ", "اتِّحَادُ", "اتِّحَادًا"], "muzâf: tenvinsiz", "Müslüman orduları kardeşler gibi birleşti.", "u5"],
  ["وَصَمَّمَتْ عَلَى الِانْتِصَارِ {تَصْمِيمًا}.", ["تَصْمِيمًا", "مُصَمِّمَةً", "تَصْمِيمٌ"], "te’kîd", "Zafere kesin karar verdi.", "u5"],
  ["وَانْتَصَرَتْ عَلَى جُيُوشِ الرُّومِ انْتِصَارًا {حَاسِمًا}.", ["حَاسِمًا", "حَاسِمٌ", "حَاسِمٍ"], "sıfat da mansûb", "Kesin bir zafer kazandı.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["نِمْتُ نَوْمًا ← nevi bildir", "نِمْتُ نَوْمًا عَمِيقًا", "نِمْتُ نَوْمَةً", "نِمْتُ نَوْمٌ عَمِيقٌ", "Sıfat eklenince nevi bildirir.", "u2"],
  ["نَظَرَ السَّائِحُ ← bir kez", "نَظَرَ السَّائِحُ نَظْرَةً", "نَظَرَ السَّائِحُ نَظَرًا", "نَظَرَ السَّائِحُ نَظَرًا طَوِيلًا", "فَعْلَة: bir kez.", "u2"],
  ["طَرَقَ البَابَ ← te’kîd", "طَرَقَ البَابَ طَرْقًا", "طَرَقَ البَابَ طَرْقَةً", "طَرَقَ البَابَ طَرْقًا خَفِيفًا", "Yalın masdar: te’kîd.", "u2"],
  ["دَارَ اللَّاعِبُ ← iki kez", "دَارَ اللَّاعِبُ دَوْرَتَيْنِ", "دَارَ اللَّاعِبُ دَوْرَتَانِ", "دَارَ اللَّاعِبُ دَوْرَةً", "Müsennâ mansûb: yâ ile.", "u2"],
  ["أَخَذْنَاهُمْ ← muzâf ile nevi", "أَخَذْنَاهُمْ أَخْذَ عَزِيزٍ", "أَخَذْنَاهُمْ أَخْذًا عَزِيزٍ", "أَخَذْنَاهُمْ أَخْذُ عَزِيزٍ", "Muzâf: tenvin düşer, mansûb.", "u2"],
  ["فَرِحَ ← masdar", "فَرَحًا", "فَارِحًا", "مَفْرُوحًا", "فَعِلَ → فَرَح.", "u3"],
  ["احْتَرَمَ ← masdar", "احْتِرَامًا", "مُحْتَرِمًا", "حُرْمَةً", "اِفْتِعَال: احْتِرَام.", "u3"],
  ["أَجَابَ ← masdar", "إِجَابَةً", "مُجِيبًا", "مُجَابًا", "إِفْعَالَة: إِجَابَة.", "u3"],
  ["انْتَصَرَ ← masdar", "انْتِصَارًا", "مُنْتَصِرًا", "انْتِصَارٌ", "اِفْتِعَال: انْتِصَار.", "u3"],
  ["ازْدَادَ ← masdar", "ازْدِيَادًا", "مُزْدَادًا", "ازْدِيَادٌ", "اِفْتِعَال: ازْدِيَاد.", "u3"],
  ["أَكَلْتُ أَكْلًا قَلِيلًا ← masdarı at", "أَكَلْتُ قَلِيلًا", "أَكَلْتُ قَلِيلٌ", "أَكَلْتُ قَلِيلٍ", "Sıfat masdarın yerine geçer, mansûb kalır.", "u4"],
  ["لَا تُسْرِفْ إِسْرَافًا ← كُلّ ile", "لَا تُسْرِفْ كُلَّ الإِسْرَافِ", "لَا تُسْرِفْ كُلُّ الإِسْرَافِ", "لَا تُسْرِفْ كُلَّ الإِسْرَافَ", "كُلَّ nâib, mansûb; masdar muzâfun ileyh.", "u4"],
  ["طَرَقَ البَابَ طَرْقَةً ← üç kez", "طَرَقَ البَابَ ثَلَاثَ طَرَقَاتٍ", "طَرَقَ البَابَ ثَلَاثَةَ طَرَقَاتٍ", "طَرَقَ البَابَ ثَلَاثُ طَرَقَاتٍ", "Sayı nâib; طَرْقَة müennes → ثَلَاثَ.", "u4"],
  ["نَصَحْتُهُ نُصْحًا ← بَعْض ile", "نَصَحْتُهُ بَعْضَ النُّصْحِ", "نَصَحْتُهُ بَعْضُ النُّصْحِ", "نَصَحْتُهُ بَعْضَ النُّصْحَ", "بَعْضَ mansûb, النُّصْحِ mecrûr.", "u4"]
];
// Ne o? hız oyunu
var NOUN_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = KND;
// Hangi tür? hız oyunu
var MM_OPTS = NV;
var MM_LIST = UNITS[1].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
[[HL("صَرَخَ الطِّفْلُ صَرْخَةً", "صَرْخَةً"), "a", "Bir çığlık."], [HL("حَجَّ حَجًّا مَبْرُورًا", "حَجًّا مَبْرُورًا"), "n", "Sıfatlı."],
 [HL("ذَكَرْتُ اللهَ ذِكْرًا", "ذِكْرًا"), "t", "Yalın."], [HL("هَبَطَتِ الطَّائِرَةُ هُبُوطًا مُرِيحًا", "هُبُوطًا مُرِيحًا"), "n", "Sıfatlı."],
 [HL("عَطَسَ الرَّجُلُ عَطْسَتَيْنِ", "عَطْسَتَيْنِ"), "a", "İki kez."], [HL("تَقَدَّمَ المُوَظَّفُ تَقَدُّمًا", "تَقَدُّمًا"), "t", "Yalın."]
].forEach(function (x) { MM_LIST.push(x); });
var HAFIZA = {
  fm: { name: "Fiil ↔ masdar", pairs: [["مَزَّقَ", "تَمْزِيقًا"], ["نَامَ", "نَوْمًا"], ["دَارَ", "دَوْرَةً"], ["كَلَّمَ", "تَكْلِيمًا"], ["صَبَرَ", "صَبْرًا"], ["أَجَابَ", "إِجَابَةً"], ["احْتَرَمَ", "احْتِرَامًا"], ["هَبَطَ", "هُبُوطًا"]] },
  nb: { name: "Masdar ↔ nâib", pairs: [["أَكَلْتُ أَكْلًا قَلِيلًا", "أَكَلْتُ قَلِيلًا"], ["جَلَسْتُ جُلُوسًا", "جَلَسْتُ قُعُودًا"], ["لَا تُسْرِفْ إِسْرَافًا تَامًّا", "لَا تُسْرِفْ كُلَّ الإِسْرَافِ"], ["نَصَحْتُهُ نُصْحًا قَلِيلًا", "نَصَحْتُهُ بَعْضَ النُّصْحِ"], ["قُمْتُ قِيَامًا", "قُمْتُ وُقُوفًا"], ["جَلَسْتُ جُلُوسًا طَوِيلًا", "جَلَسْتُ طَوِيلًا"], ["ضَحِكُوا ضَحِكًا كَثِيرًا", "ضَحِكُوا كَثِيرًا"], ["اجْتَهَدْتُ اجْتِهَادًا تَامًّا", "اجْتَهَدْتُ كُلَّ الِاجْتِهَادِ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["نَوْمًا عَمِيقًا", "derin bir uyku"], ["دَوْرَةً", "bir tur"], ["نَظْرَةً", "bir bakış"], ["صَبْرًا جَمِيلًا", "güzel bir sabır"], ["فَتْحًا مُبِينًا", "apaçık bir fetih"], ["كُلَّ الإِسْرَافِ", "tamamen israf"], ["بَعْضَ النُّصْحِ", "biraz nasihat"], ["ثَلَاثَ دَوْرَاتٍ", "üç tur"]] }
};
var KARTLAR = [
  ["Mef’ûl-i mutlak nedir?", "Fiilin kendi lafzından gelen mansûb masdar: مَزَّقْتُ الصَّحِيفَةَ تَمْزِيقًا"],
  ["Üç görevi?", "Te’kîd (تَمْزِيقًا), nevi (نَوْمًا عَمِيقًا), sayı (دَوْرَةً)"],
  ["Nevi nasıl bildirilir?", "Masdara sıfat ya da muzâfun ileyh eklenir: أَخْذَ عَزِيزٍ مُقْتَدِرٍ"],
  ["Sayı nasıl bildirilir?", "فَعْلَة (bir kez), müsennâ (دَوْرَتَيْنِ), sayı (ثَلَاثَ دَوْرَاتٍ)"],
  ["Müsennâsı nasıl mansûb olur?", "Yâ ile: دَوْرَتَيْنِ"],
  ["Masdarın yerine neler geçer?", "Eş anlamlısı, sıfatı, كُلّ / بَعْض, sayı"],
  ["جَلَسْتُ قُعُودًا?", "قُعُودًا eş anlamlı nâib."],
  ["أَكَلْتُ قَلِيلًا?", "Sıfat nâib: أَكْلًا قَلِيلًا."],
  ["لَا تُسْرِفْ كُلَّ الإِسْرَافِ?", "كُلَّ nâib, mansûb; الإِسْرَافِ muzâfun ileyh."],
  ["خَافَ خَوْفًا ile هَرَبَ خَوْفًا?", "İlki mef’ûl-i mutlak, ikincisi mef’ûlün lieclih."],
  ["فَرَحًا mı فَارِحًا mı?", "Mutlak için masdar: فَرَحًا. فَارِحًا hâl olur."],
  ["Lâzım fiil mutlak alır mı?", "Evet: انْتَصَرَ انْتِصَارًا. Bu onu müteaddî yapmaz."]
];
