// ================= VERİ: Mef’ûlün Lieclih (المَفْعُولُ لَهُ / المَفْعُولُ لِأَجْلِهِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "العَامِلُ", tr: "Fiil (âmil)" }, nasb: { ar: "المَفْعُولُ لِأَجْلِهِ", tr: "Mef’ûlün lieclih (mansûb)" }, cerr: { ar: "سَبَبٌ مَجْرُورٌ", tr: "Sebep: harf-i cer ile" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var KND = [["l", "Mef’ûlün lieclih", "مَفْعُولٌ لِأَجْلِهِ", "nasb"], ["h", "Hâl", "حَالٌ", "mi"], ["m", "Mef’ûl-i mutlak", "مَفْعُولٌ مُطْلَقٌ", "ref"], ["b", "Mef’ûlün bih", "مَفْعُولٌ بِهِ", "cerr"]];
var SB = [["e", "Sebep bildirir (mef’ûlün lieclih)", "مَفْعُولٌ لِأَجْلِهِ مَجْرُورٌ", "cerr"], ["h", "Sebep bildirmez", "لَيْسَ لِلتَّعْلِيلِ", "x"]];
var TN = [["n", "Nekre", "نَكِرَةٌ", "nasb"], ["a", "elif-lâmlı", "مُعَرَّفٌ بِـ«ال»", "cerr"], ["d", "Muzâf", "مُضَافٌ", "mi"]];
var RD = [["n", "Mef’ûlün lieclih (mansûb)", "مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ", "nasb"], ["c", "Sebep: harf-i cer + masdar", "مَجْرُورٌ بِحَرْفِ جَرٍّ", "cerr"], ["l", "Lâm + fiil (ta’lîl)", "لَامُ التَّعْلِيلِ + فِعْلٌ", "mi"], ["x", "Başka", "غَيْرُ ذَلِكَ", "x"]];
var TUR_TR = { l: "Mef’ûlün lieclih", h: "Hâl", m: "Mef’ûl-i mutlak", b: "Mef’ûlün bih", e: "Sebep bildirir", n: "Nekre", a: "elif-lâmlı", d: "Muzâf" };
// Makine: [fiil kısmı, mansûb, lâm ile mecrûr, şekil (n nekre / d muzâf), Türkçe, soru]
var ML = [
  ["اغْتَرَبْتُ", "طَلَبًا لِلْعِلْمِ", "لِطَلَبِ العِلْمِ", "n", "İlim öğrenmek için gurbete çıktım.", "لِمَ اغْتَرَبْتَ؟"],
  ["تُمْنَحُ المُكَافَآتُ", "تَشْجِيعًا لِلْمُبْدِعِينَ", "لِتَشْجِيعِ المُبْدِعِينَ", "n", "Ödüller yaratıcı kişileri teşvik için verilir.", "لِمَ تُمْنَحُ المُكَافَآتُ؟"],
  ["قُمْتُ", "احْتِرَامًا لَكَ", "لِاحْتِرَامِكَ", "n", "Sana saygıdan ayağa kalktım.", "لِمَ قُمْتَ؟"],
  ["خَرَجْتُ", "حُبًّا فِي الصَّيْدِ", "لِحُبِّ الصَّيْدِ", "n", "Av sevgisinden (ava) çıktım.", "لِمَ خَرَجْتَ؟"],
  ["أَسْأَلُ أُسْتَاذِي", "قَصْدَ المَعْرِفَةِ", "لِقَصْدِ المَعْرِفَةِ", "d", "Bilgi edinmek amacıyla hocama sorarım.", "لِمَ تَسْأَلُ أُسْتَاذَكَ؟"],
  ["يَصُومُ المُسْلِمُونَ", "امْتِثَالًا لِأَمْرِ رَبِّهِمْ", "لِامْتِثَالِ أَمْرِ رَبِّهِمْ", "n", "Müslümanlar Rablerinin emrine uymak için oruç tutar.", "لِمَ يَصُومُ المُسْلِمُونَ؟"]
];
var MF = ["Mansûb", "Lâm ile mecrûr", "Öne alınmış · mansûb", "Öne alınmış · lâm ile"];

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
// Dönüştür (mansûb + mecrûr): [baş, [mansûb, y1, y2], arka, [mecrûr, y1, y2], mecrûr arkası, Türkçe, açıklama]
function DM(x, i) { return CBP(["مَنْصُوبًا: " + x[0], x[1], x[2] + "<br>مَجْرُورًا: …", x[3], x[4]], i, x[5], x[6]); }
// İ’rab: [cümle, [sebep, y1, y2], mecrûr mu, Türkçe, açıklama]
var IRN = ["مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "حَالٌ مَنْصُوبَةٌ"];
var IRC = ["جَارٌّ وَمَجْرُورٌ لِلتَّعْلِيلِ", "مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"];
function IRB(x, i) { return CBP([x[0] + " ← السَّبَبُ:", x[1], "· إِعْرَابُهُ:", x[2] ? IRC : IRN], i, x[3], x[4]); }

var UNITS = [
// ---------------------------------------------------------------- 1 · TANIM
{
  id: "u1", no: 1, ar: "المَفْعُولُ لَهُ (المَفْعُولُ لِأَجْلِهِ)", tr: "Mef’ûlün Lieclih Nedir?", short: "Tanım", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Mef’ûlün lieclihin fiilin sebebini bildiren mansûb masdar olduğunu bilmek", "“لِمَ؟ / niçin?” sorusuyla onu bulmak", "Hâl, mef’ûl-i mutlak ve mef’ûlün bihten ayırmak"],
  examples: [
    { s: "اغْتَرَبْتُ:mz / طَلَبًا:nasb / لِلْعِلْمِ.:-", tr: "İlim öğrenmek için gurbete çıktım. (لِمَ اغْتَرَبْتَ؟ ← طَلَبًا لِلْعِلْمِ)", pair: "اغْتَرَبْتُ:mz / لِطَلَبِ العِلْمِ.:cerr", pairTr: "Aynı anlam: lâm ile mecrûr." },
    { s: "تُمْنَحُ:mz / المُكَافَآتُ:- / تَشْجِيعًا:nasb / لِلْمُبْدِعِينَ.:-", tr: "Ödüller yaratıcı kişileri teşvik için verilir." },
    { s: "أَسْأَلُ:mz / أُسْتَاذِي:- / قَصْدَ المَعْرِفَةِ.:nasb", tr: "Bilgi edinmek amacıyla hocama sorarım. (muzâf)" }
  ],
  rules: [
    { tr: "<b>Mef’ûlün lieclih</b> (<span class=\"ar\">المَفْعُولُ لَهُ / لِأَجْلِهِ</span>): fiilden sonra gelip fiilin <b>niçin</b> yapıldığını, yani sebebini bildiren <b>mansûb masdardır</b>:", ex: ["اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ", "هَرَبَ القَاتِلُ خَوْفًا مِنَ القَتْلِ"] },
    { tr: "Takdir edilen bir soruya cevaptır: <span class=\"ar\">لِمَ اغْتَرَبْتَ؟ ← طَلَبًا لِلْعِلْمِ</span>. Türkçede “… için, …den dolayı, … amacıyla” diye çevrilir." },
    { tr: "Karıştırma: <b>hâl</b> “nasıl?” sorusuna cevaptır ve çoğu zaman ism-i fâildir (<span class=\"ar\">جَاءَ خَائِفًا</span>). <b>Mef’ûl-i mutlak</b> fiilin kendi masdarıdır (<span class=\"ar\">خَافَ خَوْفًا شَدِيدًا</span>). <b>Mef’ûlün lieclih</b> ise “niçin?” sorusuna cevap verir (<span class=\"ar\">هَرَبَ خَوْفًا</span>)." },
    { tr: "Bilgi: Nahivcilerin çoğu mef’ûlün lieclihin kalbî bir masdar (korku, sevgi, istek…) olmasını, fiille aynı zamanda ve aynı fâile ait olmasını şart koşar. Şart eksikse harf-i cer gelir: <span class=\"ar\">جِئْتُ لِلْكِتَابِ</span>." }
  ],
  kaide: [
    "المَفْعُولُ لَهُ (المَفْعُولُ لِأَجْلِهِ): مَصْدَرٌ مَنْصُوبٌ يُذْكَرُ بَعْدَ الفِعْلِ لِبَيَانِ سَبَبِ وُقُوعِهِ، مِثْلُ: اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ.",
    "وَهُوَ جَوَابٌ لِسُؤَالٍ مُقَدَّرٍ يَبْدَأُ بِـ: «لِمَ وَقَعَ الفِعْلُ؟»."
  ],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "١", ar: "عَيِّنِ المَفْعُولَ لِأَجْلِهِ فِي الجُمَلِ التَّالِيَةِ", tr: "Fiili (âmil) ve mef’ûlün lieclihi etiketle; kalanlar Başka.", items: [
      T("سَافَرْتُ:mz / إِلَى بِلَادِ الغُرْبَةِ:x / طَلَبًا:nasb / لِلْعِلْمِ.:x", "İlim öğrenmek için gurbet ellere yolculuk ettim.", "Nekre masdar, mansûb; لِلْعِلْمِ ona bağlı."),
      T("أُعِدَّ:mz / هَذَا الكِتَابُ:x / لِيُسَاعِدَ:cerr / الطُّلَّابَ عَلَى القَوَاعِدِ.:x", "Bu kitap öğrencilere kurallarda yardım etmek için hazırlandı.", "Lâm-ı ta’lîl + fiil: masdar-ı müevvel (لِمُسَاعَدَةِ). Masdar-ı sarîh olmadığı için dar tanımla mef’ûlün lieclih değil, sebep bildiren mecrûrdur."),
      T("هَرَبَ:mz / القَاتِلُ إِلَى جِهَةٍ مَجْهُولَةٍ:x / خَوْفًا:nasb / مِنَ القَتْلِ.:x", "Katil öldürülme korkusuyla bilinmeyen bir yere kaçtı.", "Niçin kaçtı? Korkudan."),
      T("كَانَ الشُّعَرَاءُ:x / يَمْدَحُونَ:mz / رِجَالَ الدَّوْلَةِ بِأَشْعَارِهِمْ:x / مُدَاهَنَةً:nasb / لَهُمْ.:x", "Şairler devlet adamlarını yaranmak için şiirleriyle överlerdi.", "Âmil يَمْدَحُونَ."),
      T("غَرَسَ:mz / البُسْتَانِيُّ الأَشْجَارَ وَالأَزْهَارَ:x / تَجْمِيلًا:nasb / لِلْحَدِيقَةِ.:x", "Bahçıvan bahçeyi güzelleştirmek için ağaç ve çiçek dikti.", "جَمَّلَ → تَجْمِيل."),
      T("يَحْتَرِمُ:mz / الشَّعْبُ القَانُونَ:x / دَفْعًا:nasb / لِلظُّلْمِ.:x", "Halk zulmü önlemek için kanuna saygı gösterir.", "دَفَعَ → دَفْع."),
      T("قَبَضَ:mz / الشُّرْطِيُّ عَلَى اللِّصِّ:x / خَوْفًا:nasb / مِنْ فِرَارِهِ.:x", "Polis kaçmasından korktuğu için hırsızı yakaladı.", "Niçin yakaladı? Kaçar korkusuyla."),
      T("يُسَاعِدُ:mz / الغَنِيُّ الفَقِيرَ:x / شَفَقَةً:nasb / عَلَيْهِ.:x", "Zengin fakire acıdığı için yardım eder.", "Kitapta شَفْقَةً yazılmış; doğrusu شَفَقَةً.")
    ]},
    { type: "classify", extra: true, opts: KND, ar: "مَا إِعْرَابُ الكَلِمَةِ المُلَوَّنَةِ؟", tr: "Koyu kelime mef’ûlün lieclih mi, hâl mi, mef’ûl-i mutlak mı, mef’ûlün bih mi?", items: CL([
      [HL("قُمْتُ احْتِرَامًا لِلْمُعَلِّمِ", "احْتِرَامًا"), "l", "Niçin kalktım? Saygıdan."],
      [HL("دَخَلَ الطَّالِبُ مُسْرِعًا", "مُسْرِعًا"), "h", "Nasıl girdi? İsm-i fâil: hâl."],
      [HL("ضَرَبْتُ الكُرَةَ ضَرْبًا قَوِيًّا", "ضَرْبًا"), "m", "Fiilin kendi masdarı: mef’ûl-i mutlak."],
      [HL("قَرَأْتُ كِتَابًا", "كِتَابًا"), "b", "Okunan şey: mef’ûlün bih."],
      [HL("سَافَرْتُ طَلَبًا لِلْعِلْمِ", "طَلَبًا"), "l", "Niçin? İlim için."],
      [HL("جَاءَ الوَلَدُ ضَاحِكًا", "ضَاحِكًا"), "h", "Nasıl geldi? Gülerek."],
      [HL("خَافَ اللِّصُّ خَوْفًا شَدِيدًا", "خَوْفًا"), "m", "خَافَ fiilinin kendi masdarı: mef’ûl-i mutlak."],
      [HL("هَرَبَ اللِّصُّ خَوْفًا مِنَ الشُّرْطِيِّ", "خَوْفًا"), "l", "هَرَبَ’nin sebebi: mef’ûlün lieclih."],
      [HL("زُرْتُ صَدِيقِي", "صَدِيقِي"), "b", "Ziyaret edilen: mef’ûlün bih."],
      [HL("رَجَعَ الجُنْدِيُّ مُنْتَصِرًا", "مُنْتَصِرًا"), "h", "Nasıl döndü? Galip olarak."],
      [HL("اجْتَهَدْتُ اجْتِهَادًا كَبِيرًا", "اجْتِهَادًا"), "m", "Aynı fiilin masdarı."],
      [HL("تَصَدَّقَ الغَنِيُّ ابْتِغَاءَ مَرْضَاةِ اللهِ", "ابْتِغَاءَ"), "l", "Allah’ın rızasını istemek için: muzâf mef’ûlün lieclih."],
      [HL("شَرِبْتُ المَاءَ بَارِدًا", "بَارِدًا"), "h", "Suyun hâli."],
      [HL("نَامَ الطِّفْلُ نَوْمًا عَمِيقًا", "نَوْمًا"), "m", "نَامَ → نَوْم: mef’ûl-i mutlak."],
      [HL("أَكَلْتُ تُفَّاحَةً", "تُفَّاحَةً"), "b", "Yenen şey."],
      [HL("وَقَفَ الطُّلَّابُ تَحِيَّةً لِلْأُسْتَاذِ", "تَحِيَّةً"), "l", "Niçin kalktılar? Selamlamak için."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · MANSÛB, MECRÛR, TAKDÎM
{
  id: "u2", no: 2, ar: "نَصْبُهُ وَجَرُّهُ وَتَقْدِيمُهُ", tr: "Mansûb, Mecrûr ve Öne Alınması", short: "Nasb · cer", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Mef’ûlün lieclihin asıl olarak mansûb, çoğunlukla lâm ile de mecrûr olduğunu bilmek", "مِنْ، بِـ، فِي ile gelen sebebi tanımak", "Âmilinden önce gelebildiğini ve nekre / elif-lâmlı / muzâf geldiğini bilmek"],
  examples: [
    { s: "بَكَى:mz / الوَلَدُ:- / مِنَ الأَلَمِ.:cerr", tr: "Çocuk acıdan ağladı. (مِنْ)", pair: "مَاتَتِ:mz / الشَّاةُ:- / بِدَائِهَا.:cerr", pairTr: "Koyun hastalığından öldü. (بِـ)" },
    { s: "سُجِنَ:mz / الرَّجُلُ:- / فِي لِيرَةٍ.:cerr", tr: "Adam bir lira yüzünden hapsedildi. (فِي)" },
    { s: "حُبًّا:nasb / فِي الصَّيْدِ:- / خَرَجْتُ.:mz", tr: "Av sevgisinden çıktım. (öne alınmış, mansûb)", pair: "لِحُبِّ الصَّيْدِ:cerr / خَرَجْتُ.:mz", pairTr: "Lâm ile mecrûr da öne alınabilir." },
    { s: "اسْتَقَالَ:mz / أَحْمَدُ:- / لِلطَّمَعِ:cerr / فِي العِلْمِ.:-", tr: "Ahmed ilme duyduğu hırstan (işinden) ayrıldı. (elif-lâmlı)" }
  ],
  rules: [
    { tr: "Asıl olan <b>mansûb</b> olmasıdır; çoğunlukla <b>lâm</b> ile mecrûr da olur. Lâm gelince tenvin düşer, masdar muzâf olur:", ex: ["اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ ← اغْتَرَبْتُ لِطَلَبِ العِلْمِ"] },
    { tr: "<span class=\"ar\">مِنْ، بِـ، فِي</span> ile de mecrûr olur: <span class=\"ar\">بَكَى الوَلَدُ مِنَ الأَلَمِ · مَاتَتِ الشَّاةُ بِدَائِهَا · سُجِنَ الرَّجُلُ فِي لِيرَةٍ</span>. Her harf-i cer sebep bildirmez: <span class=\"ar\">خَرَجْتُ مِنَ البَيْتِ</span> (yer), <span class=\"ar\">كَتَبْتُ بِالقَلَمِ</span> (âlet)." },
    { tr: "Mansûb da mecrûr da olsa âmilinden (fiilden) <b>önce</b> gelebilir: <span class=\"ar\">حُبًّا فِي الصَّيْدِ خَرَجْتُ · لِحُبِّ الصَّيْدِ خَرَجْتُ</span>." },
    { tr: "Üç şekilde gelir: <b>nekre</b> (<span class=\"ar\">حُبًّا</span>; çoğunlukla mansûb), <b>elif-lâmlı</b> (<span class=\"ar\">لِلطَّمَعِ</span>; çoğunlukla lâm ile mecrûr), <b>muzâf</b> (<span class=\"ar\">قَصْدَ المَعْرِفَةِ</span>; ikisi de yaygın)." }
  ],
  kaide: [
    "الأَصْلُ فِي المَفْعُولِ لَهُ أَنْ يَكُونَ مَنْصُوبًا، وَيَجُوزُ جَرُّهُ بِـ«اللَّامِ» عَلَى الأَكْثَرِ، مِثْلُ: اغْتَرَبْتُ لِطَلَبِ العِلْمِ. كَمَا يَجُوزُ جَرُّهُ بِـ«مِنْ» أَوْ «البَاءِ» أَوْ «فِي»، مِثْلُ: بَكَى الوَلَدُ مِنَ الأَلَمِ، مَاتَتِ الشَّاةُ بِدَائِهَا، سُجِنَ الرَّجُلُ فِي لِيرَةٍ.",
    "يَجُوزُ تَقْدِيمُ المَفْعُولِ لِأَجْلِهِ عَلَى عَامِلِهِ (الفِعْلِ)، سَوَاءٌ أَكَانَ مَنْصُوبًا أَمْ مَجْرُورًا بِحَرْفِ الجَرِّ، مِثْلُ: حُبًّا فِي الصَّيْدِ خَرَجْتُ، أَوْ: لِحُبِّ الصَّيْدِ خَرَجْتُ.",
    "يَأْتِي المَفْعُولُ لَهُ نَكِرَةً، أَوْ مُعَرَّفًا بِـ«ال»، أَوْ مُضَافًا: حُبًّا فِي الصَّيْدِ خَرَجْتُ، اسْتَقَالَ أَحْمَدُ لِلطَّمَعِ فِي العِلْمِ، أَسْأَلُ أُسْتَاذِي قَصْدَ المَعْرِفَةِ."
  ],
  ex: [
    { type: "classify", extra: true, opts: SB, ar: "هَلْ حَرْفُ الجَرِّ هُنَا لِلتَّعْلِيلِ؟", tr: "Koyu câr-mecrûr fiilin sebebini mi bildiriyor?", items: CL([
      [HL("بَكَى الوَلَدُ مِنَ الأَلَمِ", "مِنَ الأَلَمِ"), "e", "Niçin ağladı? Acıdan."],
      [HL("خَرَجْتُ مِنَ البَيْتِ", "مِنَ البَيْتِ"), "h", "Nereden? Yer bildirir."],
      [HL("مَاتَتِ الشَّاةُ بِدَائِهَا", "بِدَائِهَا"), "e", "Hastalığı yüzünden: sebep bâsı."],
      [HL("كَتَبْتُ بِالقَلَمِ", "بِالقَلَمِ"), "h", "Neyle? Âlet."],
      [HL("سُجِنَ الرَّجُلُ فِي لِيرَةٍ", "فِي لِيرَةٍ"), "e", "Bir lira yüzünden: sebep fî’si."],
      [HL("جَلَسْتُ فِي الصَّفِّ", "فِي الصَّفِّ"), "h", "Nerede? Yer."],
      [HL("جِئْتُ لِلدِّرَاسَةِ", "لِلدِّرَاسَةِ"), "e", "Niçin geldim? Ders için."],
      [HL("ذَهَبْتُ إِلَى المَدْرَسَةِ", "إِلَى المَدْرَسَةِ"), "h", "Nereye? Yön."],
      [HL("قُمْتُ لِاحْتِرَامِكَ", "لِاحْتِرَامِكَ"), "e", "Saygıdan."],
      [HL("هَذَا الكِتَابُ لِأَحْمَدَ", "لِأَحْمَدَ"), "h", "Mülkiyet lâmı."],
      [HL("ارْتَجَفَ الطِّفْلُ مِنَ البَرْدِ", "مِنَ البَرْدِ"), "e", "Soğuktan titredi."],
      [HL("سَافَرْتُ بِالطَّائِرَةِ", "بِالطَّائِرَةِ"), "h", "Neyle? Vasıta."]
    ]) },
    { type: "combo", num: "٣", ar: "حَوِّلْ مَا بَيْنَ القَوْسَيْنِ إِلَى مَفْعُولٍ لِأَجْلِهِ مَنْصُوبٍ وَمَجْرُورٍ", tr: "Parantezdeki fiilden masdar yap: önce mansûb, sonra lâm ile mecrûr biçimini seç.",
      exHtml: "<span class=\"ar\">تَجَوَّلَ الطُّلَّابُ فِي الحَدِيقَةِ (رَوَّحَ) عَنْ أَنْفُسِهِمْ ← تَرْوِيحًا عَنْ أَنْفُسِهِمْ · لِلتَّرْوِيحِ عَنْ أَنْفُسِهِمْ</span>", items: [
      ["يَصُومُ المُسْلِمُونَ شَهْرَ رَمَضَانَ (امْتَثَلَ)", ["امْتِثَالًا", "مُمْتَثِلِينَ", "امْتِثَالٌ"], "لِأَمْرِ رَبِّهِمْ", ["لِلِامْتِثَالِ", "لِلِامْتِثَالَ", "لِامْتِثَالًا"], "لِأَمْرِ رَبِّهِمْ.", "Müslümanlar Rablerinin emrine uymak için Ramazan ayında oruç tutar.", "امْتَثَلَ → امْتِثَال."],
      ["يَذْهَبُ التَّلَامِيذُ إِلَى مَدَارِسِهِمْ (رَغِبَ)", ["رَغْبَةً", "رَاغِبِينَ", "رَغْبَةٌ"], "فِي العِلْمِ وَالمَعْرِفَةِ", ["لِلرَّغْبَةِ", "لِلرَّغْبَةَ", "لِرَغْبَةً"], "فِي العِلْمِ وَالمَعْرِفَةِ.", "Öğrenciler ilme ve bilgiye istekleri için okullarına gider.", "رَغِبَ → رَغْبَة."],
      ["لَمَّا دَخَلَ المُعَلِّمُ الصَّفَّ قَامَ التَّلَامِيذُ (حَيَّا)", ["تَحِيَّةً", "مُحَيِّينَ", "تَحِيَّةٌ"], "لَهُ", ["لِلتَّحِيَّةِ", "لِلتَّحِيَّةَ", "لِتَحِيَّةً"], "لَهُ.", "Öğretmen sınıfa girince öğrenciler onu selamlamak için ayağa kalktı.", "حَيَّا → تَحِيَّة."],
      ["قَامَ الأَطِبَّاءُ بِفَحْصِ التَّلَامِيذِ فِي المَدْرَسَةِ (حَافَظَ)", ["مُحَافَظَةً", "مُحَافِظِينَ", "مُحَافَظَةٌ"], "عَلَى صِحَّتِهِمْ", ["لِلْمُحَافَظَةِ", "لِلْمُحَافَظَةَ", "لِمُحَافَظَةً"], "عَلَى صِحَّتِهِمْ.", "Doktorlar sağlıklarını korumak için okuldaki öğrencileri muayene etti.", "حَافَظَ → مُحَافَظَة (mufâ’ale)."],
      ["يَقِفُ الشُّرْطِيُّ فِي المَيْدَانِ (سَهَّلَ)", ["تَسْهِيلًا", "مُسَهِّلًا", "تَسْهِيلٌ"], "لِحَرَكَةِ المُرُورِ", ["لِتَسْهِيلِ", "لِتَسْهِيلَ", "لِتَسْهِيلًا"], "حَرَكَةِ المُرُورِ.", "Polis trafiği kolaylaştırmak için meydanda durur.", "سَهَّلَ → تَسْهِيل. Lâm ile mecrûrda masdar muzâf olur: لِتَسْهِيلِ حَرَكَةِ المُرُورِ."],
      ["ذَبَحَ صَاحِبُ البَيْتِ شَاةً (أَكْرَمَ)", ["إِكْرَامًا", "مُكْرِمًا", "إِكْرَامٌ"], "لِضُيُوفِهِ", ["لِإِكْرَامِ", "لِإِكْرَامَ", "لِإِكْرَامًا"], "ضُيُوفِهِ.", "Ev sahibi misafirlerine ikram için bir koyun kesti.", "أَكْرَمَ → إِكْرَام; mecrûrda: لِإِكْرَامِ ضُيُوفِهِ."],
      ["ابْتَعَدَتِ البِنْتُ عَنِ الأَسَدِ فِي حَدِيقَةِ الحَيَوَانَاتِ (خَافَ)", ["خَوْفًا", "خَائِفَةً", "خَوْفٌ"], "مِنْهُ", ["لِلْخَوْفِ", "لِلْخَوْفَ", "لِخَوْفًا"], "مِنْهُ.", "Kız hayvanat bahçesinde korkusundan aslandan uzaklaştı.", "خَافَ → خَوْف. خَائِفَةً hâl olurdu."],
      ["فِي أَوَاخِرِ شَهْرِ رَمَضَانَ تَشْتَرِي الأُمَّهَاتُ المَلَابِسَ الجَدِيدَةَ (اسْتَعَدَّ)", ["اسْتِعْدَادًا", "مُسْتَعِدَّاتٍ", "اسْتِعْدَادٌ"], "لِلْعِيدِ", ["لِلِاسْتِعْدَادِ", "لِلِاسْتِعْدَادَ", "لِاسْتِعْدَادًا"], "لِلْعِيدِ.", "Ramazanın son günlerinde anneler bayrama hazırlık için yeni elbiseler alır.", "اسْتَعَدَّ → اسْتِعْدَاد."]
    ].map(DM) },
    { type: "classify", extra: true, opts: TN, ar: "مَا نَوْعُ المَفْعُولِ لِأَجْلِهِ؟", tr: "Koyu mef’ûlün lieclih nekre mi, elif-lâmlı mı, muzâf mı?", items: CL([
      [HL("حُبًّا فِي الصَّيْدِ خَرَجْتُ", "حُبًّا"), "n", "Tenvinli: nekre."],
      [HL("اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ", "طَلَبًا"), "n", "Nekre; لِلْعِلْمِ ayrı bir câr-mecrûr."],
      [HL("اسْتَقَالَ أَحْمَدُ لِلطَّمَعِ فِي العِلْمِ", "لِلطَّمَعِ"), "a", "elif-lâmlı: çoğunlukla lâm ile mecrûr."],
      [HL("أَسْأَلُ أُسْتَاذِي قَصْدَ المَعْرِفَةِ", "قَصْدَ"), "d", "Muzâf: قَصْدَ المَعْرِفَةِ."],
      [HL("وَلَا تَقْتُلُوا أَوْلَادَكُمْ خَشْيَةَ إِمْلَاقٍ", "خَشْيَةَ"), "d", "Muzâf."],
      [HL("جِئْتُ لِلدِّرَاسَةِ", "لِلدِّرَاسَةِ"), "a", "elif-lâmlı, lâm ile."],
      [HL("قُمْتُ احْتِرَامًا لَكَ", "احْتِرَامًا"), "n", "Nekre."],
      [HL("تَصَدَّقَ ابْتِغَاءَ مَرْضَاةِ اللهِ", "ابْتِغَاءَ"), "d", "Muzâf."],
      [HL("تَجَوَّلُوا لِلتَّرْوِيحِ عَنْ أَنْفُسِهِمْ", "لِلتَّرْوِيحِ"), "a", "elif-lâmlı."]
    ]) },
    { type: "pick", extra: true, ar: "قَدِّمِ المَفْعُولَ لِأَجْلِهِ عَلَى عَامِلِهِ", tr: "Mef’ûlün lieclihi fiilden önceye al: doğru yazılışı seç.", items: PL([
      ["اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ. ← öne al", "طَلَبًا لِلْعِلْمِ اغْتَرَبْتُ.", "طَلَبٌ لِلْعِلْمِ اغْتَرَبْتُ.", "طَلَبٍ لِلْعِلْمِ اغْتَرَبْتُ.", "İlim için gurbete çıktım.", "Öne alınca da mansûb kalır."],
      ["قُمْتُ لِاحْتِرَامِكَ. ← öne al", "لِاحْتِرَامِكَ قُمْتُ.", "احْتِرَامُكَ قُمْتُ.", "لِاحْتِرَامَكَ قُمْتُ.", "Sana saygıdan kalktım.", "Mecrûr da öne alınır; harf-i cer onunla gider."],
      ["يَدْرُسُ الطَّالِبُ رَغْبَةً فِي النَّجَاحِ. ← öne al", "رَغْبَةً فِي النَّجَاحِ يَدْرُسُ الطَّالِبُ.", "رَغْبَةٌ فِي النَّجَاحِ يَدْرُسُ الطَّالِبُ.", "رَغْبَةً فِي النَّجَاحُ يَدْرُسُ الطَّالِبُ.", "Öğrenci başarı isteğiyle ders çalışır.", "Mansûb kalır."],
      ["بَكَى الوَلَدُ مِنَ الأَلَمِ. ← öne al", "مِنَ الأَلَمِ بَكَى الوَلَدُ.", "مِنَ الأَلَمَ بَكَى الوَلَدُ.", "الأَلَمَ بَكَى الوَلَدُ.", "Çocuk acıdan ağladı.", "مِنْ ile birlikte öne gelir."],
      ["تَرَكْتُ المُنْكَرَ خَشْيَةَ اللهِ. ← öne al", "خَشْيَةَ اللهِ تَرَكْتُ المُنْكَرَ.", "خَشْيَةُ اللهِ تَرَكْتُ المُنْكَرَ.", "خَشْيَةً اللهِ تَرَكْتُ المُنْكَرَ.", "Allah korkusuyla kötülüğü bıraktım.", "Muzâf: tenvin almaz, mansûb."],
      ["سَهِرْتُ لِلْمُذَاكَرَةِ. ← öne al", "لِلْمُذَاكَرَةِ سَهِرْتُ.", "لِلْمُذَاكَرَةُ سَهِرْتُ.", "المُذَاكَرَةَ سَهِرْتُ.", "Ders çalışmak için uyumadım.", "elif-lâmlı, lâm ile mecrûr."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · UYGUN MEF’ÛLÜN LİECLİH
{
  id: "u3", no: 3, ar: "اخْتِيَارُ المَفْعُولِ لِأَجْلِهِ المُنَاسِبِ", tr: "Uygun Mef’ûlün Lieclihi Seçmek", short: "Uygun sebep", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["Masdarı ism-i fâil ve başka kelimelerden ayırmak", "Cümlenin anlamına uyan sebebi seçmek", "Fiilin babına göre masdarı doğru kurmak"],
  examples: [
    { s: "يُؤَدِّي:mz / المُسْلِمُ العِبَادَاتِ:- / طَاعَةً:nasb / لِلَّهِ.:-", tr: "Müslüman ibadetleri Allah’a itaat için yerine getirir. (طَائِعًا hâl olurdu)" },
    { s: "بَعَثَ:mz / اللهُ الرُّسُلَ:- / رَحْمَةً:nasb / بِالإِنْسَانِ.:-", tr: "Allah peygamberleri insana rahmet olarak gönderdi.", pair: "يَحْرِصُ:mz / المُسْلِمُونَ عَلَى أَدَاءِ الزَّكَاةِ:- / تَطْهِيرًا:nasb / لِأَمْوَالِهِمْ.:-", pairTr: "Müslümanlar mallarını temizlemek için zekâtı vermeye özen gösterir." }
  ],
  rules: [
    { tr: "Mef’ûlün lieclih <b>masdardır</b>; aynı kökten ism-i fâil (<span class=\"ar\">طَائِعًا، رَاحِمًا، مُحَيِّيًا</span>) hâl olur, mef’ûlün lieclih olmaz." },
    { tr: "Masdarı fiilin babına göre kur:", ex: ["أَكْرَمَ ← إِكْرَامًا · حَيَّا ← تَحِيَّةً", "حَافَظَ ← مُحَافَظَةً · اسْتَعَدَّ ← اسْتِعْدَادًا"] },
    { tr: "Anlama bak: hangi sebep bu işe uyar? <span class=\"ar\">أَدَاءُ الزَّكَاةِ ← تَطْهِيرًا لِأَمْوَالِهِمْ</span>; <span class=\"ar\">رَصْدُ الهِلَالِ ← اسْتِقْبَالًا لِشَهْرِ رَمَضَانَ</span>." },
    { tr: "Masdardan sonra gelen harf-i cer (<span class=\"ar\">لِـ، عَلَى، عَنْ، بِـ، فِي</span>) masdara bağlıdır: <span class=\"ar\">حِفَاظًا عَلَى · بَحْثًا عَنْ · رَغْبَةً فِي</span>." }
  ],
  kaide: ["المَفْعُولُ لَهُ مَصْدَرٌ مَنْصُوبٌ يُذْكَرُ بَعْدَ الفِعْلِ لِبَيَانِ سَبَبِ وُقُوعِهِ: يُؤَدِّي المُسْلِمُ العِبَادَاتِ طَاعَةً لِلَّهِ."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "امْلَإِ الفَرَاغَ بِمَفْعُولٍ لِأَجْلِهِ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa uyan mef’ûlün lieclihi (masdarı) seç.", items: PL([
      ["يُؤَدِّي المُسْلِمُ العِبَادَاتِ ___ لِلَّهِ.", "طَاعَةً", "طَائِعًا", "طَوْعًا", "Müslüman ibadetleri Allah’a itaat için yerine getirir.", "طَاعَةً: sebep. طَائِعًا ism-i fâil (hâl); طَوْعًا “gönüllü” anlamında hâl gibi kullanılır."],
      ["يَسْتَقْبِلُ الوَزِيرُ ضَيْفَهُ ___ لَهُ.", "إِكْرَامًا", "كَرِيمًا", "كَرَامَةٌ", "Bakan misafirini ona ikram için karşılar.", "أَكْرَمَ → إِكْرَامًا; كَرَامَةٌ merfû."],
      ["بَعَثَ اللهُ الرُّسُلَ ___ بِالإِنْسَانِ.", "رَحْمَةً", "رَاحِمًا", "رَحْمًا", "Allah peygamberleri insana rahmet olarak gönderdi.", "رَحْمَةً بِـ: merhametten."],
      ["شَارَكَ الطُّلَّابُ فِي حَفْلِ التَّكْرِيمِ ___ عَنْ حُبِّهِمْ.", "تَعْبِيرًا", "عِبْرَةً", "عِبَارَةً", "Öğrenciler sevgilerini ifade etmek için ödül törenine katıldı.", "عَبَّرَ عَنْ → تَعْبِيرًا عَنْ."],
      ["رَفَعَ رَئِيسُ الوُزَرَاءِ يَدَيْهِ ___ لِلْجُمْهُورِ.", "تَحِيَّةً", "حَيَاةً", "مُحَيِّيًا", "Başbakan halkı selamlamak için ellerini kaldırdı.", "حَيَّا → تَحِيَّة; مُحَيِّيًا hâl olur."],
      ["تُكْثِرُ البِنْتُ مِنْ زِيَارَةِ أُمِّهَا ___ عَلَيْهَا.", "اطْمِئْنَانًا", "مُطْمَئِنًّا", "مُطْمَئِنِّينَ", "Kız, annesinden emin olmak için onu sık sık ziyaret eder.", "اطْمَأَنَّ → اطْمِئْنَان."],
      ["يَقْضِي العُمَّالُ إِجَازَاتِهِمْ فِي الخَارِجِ ___ عَنِ الرَّاحَةِ.", "بَحْثًا", "بَاحِثِينَ", "بُحُوثًا", "İşçiler dinlenme arayışıyla tatillerini yurt dışında geçirir.", "بَحَثَ عَنْ → بَحْثًا عَنْ."],
      ["قَطَعَتْ بَعْضُ الدُّوَلِ عَلَاقَتَهَا بِجِيرَانِهَا ___ عَلَى تَدَخُّلِهَا فِي المِيَاهِ الدَّوْلِيَّةِ.", "احْتِجَاجًا", "حُجَّةً", "بِحُجَّةِ", "Bazı devletler uluslararası sulara müdahalelerini protesto için komşularıyla ilişkisini kesti.", "احْتَجَّ عَلَى → احْتِجَاجًا عَلَى."]
    ])},
    { type: "pick", fill: true, num: "٤", ar: "اخْتَرْ مِنْ جُمَلِ القَائِمَةِ (ب) التَّكْمِلَةَ المُنَاسِبَةَ لِلْقَائِمَةِ (أ)", tr: "Cümleyi tamamlayan sebebi (B listesinden) seç.", items: PL([
      ["يَحْرِصُ المُسْلِمُونَ عَلَى أَدَاءِ الزَّكَاةِ ___.", "تَطْهِيرًا لِأَمْوَالِهِمْ", "حِمَايَةً لَهُ مِنَ الاعْتِدَاءِ", "احْتِجَاجًا عَلَى التَّشْرِيعَاتِ الجَدِيدَةِ", "Müslümanlar mallarını temizlemek için zekâtı vermeye özen gösterir.", "Zekât malı temizler."],
      ["خَرَجَ كُلُّ أَفْرَادِ الأُسْرَةِ إِلَى الحَدِيقَةِ ___.", "تَرْحِيبًا بِالضُّيُوفِ", "احْتِجَاجًا عَلَى التَّشْرِيعَاتِ الجَدِيدَةِ", "تَطْهِيرًا لِأَمْوَالِهِمْ", "Bütün aile misafirleri karşılamak için bahçeye çıktı.", "Eşleştirmede kalan seçenek: د."],
      ["أَعْطَى الوَلَدُ لُعْبَتَهُ لِصَدِيقِهِ ___.", "لِلْعَطْفِ عَلَيْهِ", "احْتِجَاجًا عَلَى التَّشْرِيعَاتِ الجَدِيدَةِ", "اسْتِقْبَالًا لِشَهْرِ رَمَضَانَ", "Çocuk oyuncağını şefkatinden arkadaşına verdi.", "Lâm ile mecrûr sebep."],
      ["يَشْتَرِي الآبَاءُ المَلَابِسَ الجَدِيدَةَ ___.", "اسْتِعْدَادًا لِلْعِيدِ", "حِمَايَةً لَهُ مِنَ الاعْتِدَاءِ", "احْتِجَاجًا عَلَى التَّشْرِيعَاتِ الجَدِيدَةِ", "Babalar bayrama hazırlık için yeni elbiseler alır.", "Bayram hazırlığı."],
      ["يَرْصُدُ المُسْلِمُونَ الهِلَالَ ___.", "اسْتِقْبَالًا لِشَهْرِ رَمَضَانَ", "تَطْهِيرًا لِأَمْوَالِهِمْ", "لِلْعَطْفِ عَلَيْهِ", "Müslümanlar Ramazan ayını karşılamak için hilali gözler.", "Hilal ayın başlangıcını gösterir."],
      ["يَتَجَمَّعُ المُتَظَاهِرُونَ فِي المَيْدَانِ ___.", "احْتِجَاجًا عَلَى التَّشْرِيعَاتِ الجَدِيدَةِ", "لِلْعَطْفِ عَلَيْهِ", "تَطْهِيرًا لِأَمْوَالِهِمْ", "Göstericiler yeni yasaları protesto için meydanda toplanır.", "Gösterinin sebebi."],
      ["أَقَامَ رَئِيسُ الوُزَرَاءِ مَأْدُبَةَ العَشَاءِ ___.", "لِتَكْرِيمِ الوَفْدِ الزَّائِرِ", "حِمَايَةً لَهُ مِنَ الاعْتِدَاءِ", "احْتِجَاجًا عَلَى التَّشْرِيعَاتِ الجَدِيدَةِ", "Başbakan ziyaretçi heyeti onurlandırmak için akşam yemeği verdi.", "Lâm ile mecrûr sebep."],
      ["يَحْرُسُ الجُنُودُ الوَطَنَ ___.", "حِمَايَةً لَهُ مِنَ الاعْتِدَاءِ", "لِلْعَطْفِ عَلَيْهِ", "تَرْحِيبًا بِالضُّيُوفِ", "Askerler vatanı saldırıdan korumak için bekler.", "لَهُ: الوَطَنُ."]
    ])},
    { type: "pick", fill: true, num: "٦", ar: "امْلَإِ الفَرَاغَ بِمَفْعُولٍ لِأَجْلِهِ مُنَاسِبٍ: (طَاعَةً، لِانْتِخَابِ، حِفَاظًا، لِإِقْرَارِ، لِمَنْعِ، لِنَشْرِ، انْتِظَارًا، اسْتِعْدَادًا)", tr: "Listedeki sebeplerden cümleye uyanı seç.", items: PL([
      ["يَتَوَجَّهُ المُسَافِرُونَ إِلَى صَالَةِ السَّفَرِ ___ لِمَوْعِدِ السَّفَرِ.", "اسْتِعْدَادًا", "طَاعَةً", "لِنَشْرِ", "Yolcular yolculuk vaktine hazırlık için yolcu salonuna yönelir.", "اسْتِعْدَادًا لِـ."],
      ["تُحَاوِلُ المُؤَسَّسَاتُ المَدَنِيَّةُ تَوْعِيَةَ الشَّبَابِ ___ انْتِشَارِ الجَرِيمَةِ.", "لِمَنْعِ", "حِفَاظًا", "لِانْتِخَابِ", "Sivil kuruluşlar suçun yayılmasını önlemek için gençleri bilinçlendirmeye çalışır.", "لِمَنْعِ: muzâf, lâm ile mecrûr."],
      ["جَلَسَ المُسَافِرُ فِي صَالَةِ المَطَارِ ___ لِرُكُوبِ الطَّائِرَةِ.", "انْتِظَارًا", "لِإِقْرَارِ", "طَاعَةً", "Yolcu uçağa binmeyi beklemek için havaalanı salonunda oturdu.", "انْتِظَارًا لِـ."],
      ["أَرْسَلَ الرَّسُولُ مُعَاذًا إِلَى اليَمَنِ ___ الإِسْلَامِ فِيهَا.", "لِنَشْرِ", "انْتِظَارًا", "لِمَنْعِ", "Peygamber Muâz’ı İslam’ı yaymak için Yemen’e gönderdi.", "لِنَشْرِ الإِسْلَامِ."],
      ["تُعَاقِبُ الدَّوْلَةُ المُذْنِبَ ___ عَلَى حُقُوقِ الآخَرِينَ.", "حِفَاظًا", "لِانْتِخَابِ", "انْتِظَارًا", "Devlet başkalarının haklarını korumak için suçluyu cezalandırır.", "حِفَاظًا عَلَى."],
      ["يَتَصَدَّقُ المُسْلِمُ عَلَى المُحْتَاجِينَ ___ لِأَمْرِ اللهِ.", "طَاعَةً", "لِمَنْعِ", "لِإِقْرَارِ", "Müslüman Allah’ın emrine itaat için muhtaçlara sadaka verir.", "طَاعَةً لِـ. (Kitapta يَتَصَّدقُ yazılmış; doğrusu يَتَصَدَّقُ.)"],
      ["يَجْتَمِعُ مَنْدُوبُو الدُّوَلِ ___ اتِّفَاقِيَّةِ السَّلَامِ بَيْنَ الدُّوَلِ المُتَخَاصِمَةِ.", "لِإِقْرَارِ", "حِفَاظًا", "طَاعَةً", "Devletlerin temsilcileri, çekişen devletler arasındaki barış anlaşmasını onaylamak için toplanır.", "لِإِقْرَارِ: muzâf."],
      ["يَتَوَجَّهُ النَّاخِبُونَ إِلَى صَنَادِيقِ الاقْتِرَاعِ ___ أَعْضَاءِ البَرْلَمَانِ.", "لِانْتِخَابِ", "اسْتِعْدَادًا", "لِنَشْرِ", "Seçmenler milletvekillerini seçmek için sandık başına gider.", "لِانْتِخَابِ أَعْضَاءِ."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · CEVAP VE İ’RAB
{
  id: "u4", no: 4, ar: "الإِجَابَةُ وَالإِعْرَابُ", tr: "Soruya Cevap ve İ’rab", short: "Cevap · i’rab", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["“لِمَاذَا؟” sorusuna mef’ûlün lieclihle cevap vermek", "Mef’ûlün lieclihi i’rab etmek: مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ", "Sebep bildiren câr-mecrûrun i’rabını bilmek"],
  examples: [
    { s: "نَدْرُسُ:mz / العَرَبِيَّةَ:- / لِفَهْمِ القُرْآنِ وَالسُّنَّةِ.:cerr", tr: "Arapçayı Kur’an ve Sünneti anlamak için okuruz. (لِمَاذَا تَدْرُسُونَ العَرَبِيَّةَ؟)", pair: "نَدْرُسُ:mz / العَرَبِيَّةَ:- / فَهْمًا:nasb / لِلْقُرْآنِ وَالسُّنَّةِ.:-", pairTr: "Mansûb biçimi." },
    { s: "أُسَامِحُ:mz / الصَّدِيقَ:- / حِفَاظًا:nasb / عَلَى المَوَدَّةِ.:-", tr: "Sevgiyi korumak için arkadaşımı bağışlarım." }
  ],
  rules: [
    { tr: "“<span class=\"ar\">لِمَاذَا؟ / لِمَ؟</span>” sorusunun cevabı mef’ûlün lieclihtir. Cevapta parantezdeki fiil ya da masdar mansûb masdara çevrilir:", ex: ["لِمَاذَا نَظَمَ الشَّاعِرُ قَصِيدَتَهُ؟ ← نَظَمَهَا مَدْحًا لِلْأَمِيرِ"] },
    { tr: "İ’rab: <span class=\"ar\">طَلَبًا: مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ</span>. Ardındaki <span class=\"ar\">لِلْحُرِّيَّةِ</span> câr-mecrûrdur ve <span class=\"ar\">طَلَبًا</span>’ya bağlıdır (müteallik)." },
    { tr: "Muzâf ise: <span class=\"ar\">خَشْيَةَ: مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ وَهُوَ مُضَافٌ · الزَّلَلِ: مُضَافٌ إِلَيْهِ مَجْرُورٌ</span>." },
    { tr: "Harf-i cer ile gelirse: <span class=\"ar\">لِلدِّرَاسَةِ: جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِالفِعْلِ «جِئْتُ»</span>; anlamca sebep bildirir." }
  ],
  kaide: [
    "اغْتَرَبْتُ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِتَاءِ المُتَكَلِّمِ، وَالتَّاءُ ضَمِيرٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ رَفْعٍ فَاعِلٌ. طَلَبًا: مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ. لِلْحُرِّيَّةِ: جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِـ«طَلَبًا».",
    "أُسَامِحُ: فِعْلٌ مُضَارِعٌ مَرْفُوعٌ، وَفَاعِلُهُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنَا». الصَّدِيقَ: مَفْعُولٌ بِهِ مَنْصُوبٌ. حِفَاظًا: مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ. عَلَى المَوَدَّةِ: جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِـ«حِفَاظًا»."
  ],
  ex: [
    { type: "pick", num: "٥", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ بِمَفْعُولٍ لِأَجْلِهِ مُسْتَعِينًا بِمَا بَيْنَ القَوْسَيْنِ", tr: "Soruya mef’ûlün lieclihle verilen doğru cevabı seç.", exHtml: "<span class=\"ar\">لِمَاذَا تَدْرُسُونَ اللُّغَةَ العَرَبِيَّةَ؟ (فَهْمُ القُرْآنِ) ← نَدْرُسُ العَرَبِيَّةَ لِفَهْمِ القُرْآنِ وَالسُّنَّةِ النَّبَوِيَّةِ الشَّرِيفَةِ.</span>", items: PL([
      ["لِمَاذَا يَجْتَمِعُ أَعْضَاءُ اللَّجْنَةِ الاقْتِصَادِيَّةِ؟ (حَلٌّ لِأَزْمَةِ التَّضَخُّمِ المَالِيِّ)", "يَجْتَمِعُونَ حَلًّا لِأَزْمَةِ التَّضَخُّمِ المَالِيِّ.", "يَجْتَمِعُونَ حَلٌّ لِأَزْمَةِ التَّضَخُّمِ المَالِيِّ.", "يَجْتَمِعُونَ حَلٍّ لِأَزْمَةِ التَّضَخُّمِ المَالِيِّ.", "Enflasyon krizine çözüm bulmak için toplanıyorlar.", "حَلًّا: mansûb masdar."],
      ["لِمَاذَا نَظَمَ الشَّاعِرُ قَصِيدَتَهُ؟ (مَدَحَ لِلْأَمِيرِ)", "نَظَمَهَا مَدْحًا لِلْأَمِيرِ.", "نَظَمَهَا مَدْحٌ لِلْأَمِيرِ.", "نَظَمَهَا مَدَحَ لِلْأَمِيرِ.", "Şiirini emiri övmek için yazdı.", "مَدَحَ → مَدْح."],
      ["لِمَاذَا وَقَفَ الطُّلَّابُ؟ (احْتَرَمَ أُسْتَاذَتَهُمْ)", "وَقَفُوا احْتِرَامًا لِأُسْتَاذَتِهِمْ.", "وَقَفُوا احْتِرَامٌ لِأُسْتَاذَتِهِمْ.", "وَقَفُوا احْتَرَمَ لِأُسْتَاذَتِهِمْ.", "Hocalarına saygıdan ayağa kalktılar.", "احْتَرَمَ → احْتِرَام."],
      ["لِمَاذَا تَدْرُسُ إِدَارَةُ المُرُورِ الحَوَادِثَ؟ (قَلَّلَ عَدَدَهَا)", "تَدْرُسُهَا تَقْلِيلًا لِعَدَدِهَا.", "تَدْرُسُهَا قَلِيلًا لِعَدَدِهَا.", "تَدْرُسُهَا تَقْلِيلٌ لِعَدَدِهَا.", "Sayılarını azaltmak için kazaları inceliyor.", "قَلَّلَ → تَقْلِيل."],
      ["لِمَاذَا تَمْنَحُ الحُكُومَةُ المُزَارِعِينَ قُرُوضًا؟ (سَاعَدَ لَهُمْ)", "تَمْنَحُهُمْ قُرُوضًا مُسَاعَدَةً لَهُمْ.", "تَمْنَحُهُمْ قُرُوضًا مُسَاعَدَةٌ لَهُمْ.", "تَمْنَحُهُمْ قُرُوضًا سَاعَدَ لَهُمْ.", "Onlara yardım için kredi veriyor.", "سَاعَدَ → مُسَاعَدَة (mufâ’ale)."],
      ["لِمَاذَا يَقُومُ الجُنُودُ بِحِرَاسَةِ الحُدُودِ؟ (حَمَى مِنَ الأَعْدَاءِ)", "يَحْرُسُونَهَا حِمَايَةً لَهَا مِنَ الأَعْدَاءِ.", "يَحْرُسُونَهَا حِمَايَةٌ لَهَا مِنَ الأَعْدَاءِ.", "يَحْرُسُونَهَا حَمَى لَهَا مِنَ الأَعْدَاءِ.", "Düşmanlardan korumak için sınırları bekliyorlar.", "حَمَى → حِمَايَة."],
      ["لِمَاذَا يَجْتَمِعُ وَزِيرَا الخَارِجِيَّةِ التُّرْكِيُّ وَالسُّورِيُّ؟ (بَحَثَ عَنْ سُبُلِ التَّسْوِيَةِ)", "يَجْتَمِعَانِ بَحْثًا عَنْ سُبُلِ التَّسْوِيَةِ.", "يَجْتَمِعَانِ بَحْثٌ عَنْ سُبُلِ التَّسْوِيَةِ.", "يَجْتَمِعَانِ بَحْثٍ عَنْ سُبُلِ التَّسْوِيَةِ.", "Uzlaşma yollarını aramak için bir araya geliyorlar.", "بَحَثَ → بَحْث."],
      ["لِمَاذَا وَزَّعَ مُدِيرُ الجَامِعَةِ الجَوَائِزَ عَلَى المُتَفَوِّقِينَ؟ (قَدَّرَ جُهُودَهُمْ)", "وَزَّعَهَا تَقْدِيرًا لِجُهُودِهِمْ.", "وَزَّعَهَا قَدْرًا لِجُهُودِهِمْ.", "وَزَّعَهَا تَقْدِيرٌ لِجُهُودِهِمْ.", "Ödülleri çabalarını takdir etmek için dağıttı.", "قَدَّرَ → تَقْدِير."]
    ])},
    { type: "combo", num: "٨", ar: "أَعْرِبِ الجُمَلَ التَّالِيَةَ", tr: "Sebep bildiren kelimeyi ve i’rabını seç.", exHtml: "<span class=\"ar\">أُسَامِحُ الصَّدِيقَ حِفَاظًا عَلَى المَوَدَّةِ ← حِفَاظًا: مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ</span>", items: [
      ["زُرْتُ الوَالِدَةَ رَغْبَةً فِي رِضَاهَا.", ["رَغْبَةً", "الوَالِدَةَ", "رِضَاهَا"], false, "Rızasını kazanmak isteğiyle anneyi ziyaret ettim.", "زُرْتُ: fiil + fâil tâ; الوَالِدَةَ mef’ûlün bih; فِي رِضَاهَا رَغْبَةً’ya bağlı."],
      ["اسْتَرَحْتُ طَلَبًا لِلرَّاحَةِ.", ["طَلَبًا", "لِلرَّاحَةِ", "اسْتَرَحْتُ"], false, "Dinlenmek için mola verdim.", "لِلرَّاحَةِ câr-mecrûr, طَلَبًا’ya bağlı."],
      ["أَتَحَفَّظُ فِي كَلَامِي خَشْيَةَ الزَّلَلِ.", ["خَشْيَةَ", "كَلَامِي", "الزَّلَلِ"], false, "Hata yapma korkusuyla sözlerime dikkat ederim.", "Muzâf; الزَّلَلِ muzâfun ileyh mecrûr."],
      ["أَسْأَلُ العَالِمَ قَصْدَ المَعْرِفَةِ.", ["قَصْدَ", "العَالِمَ", "المَعْرِفَةِ"], false, "Bilgi edinmek amacıyla âlime sorarım.", "العَالِمَ mef’ûlün bih; قَصْدَ muzâf mef’ûlün lieclih."],
      ["وَالأَرْضَ وَضَعَهَا لِلْأَنَامِ.", ["لِلْأَنَامِ", "الأَرْضَ", "وَضَعَهَا"], true, "Yeryüzünü de yaratıklar için yerleştirdi. (Rahmân 10)", "لِلْأَنَامِ: ta’lîl lâmı ile câr-mecrûr, وَضَعَ’ya bağlı. الأَنَام masdar olmadığı için dar tanımla mef’ûlün lieclih değildir."],
      ["جِئْتُ لِلدِّرَاسَةِ.", ["لِلدِّرَاسَةِ", "جِئْتُ", "تُ"], true, "Ders için geldim.", "elif-lâmlı masdar lâm ile mecrûr; câr-mecrûr جِئْتُ’e bağlı."],
      ["تَرَكْتُ المُنْكَرَ خَشْيَةَ اللهِ.", ["خَشْيَةَ", "المُنْكَرَ", "اللهِ"], false, "Allah korkusuyla kötülüğü bıraktım.", "المُنْكَرَ mef’ûlün bih; خَشْيَةَ muzâf."],
      ["هَاجَرَ لِلرَّغْبَةِ فِي الغِنَى.", ["لِلرَّغْبَةِ", "هَاجَرَ", "الغِنَى"], true, "Zenginlik isteğiyle göç etti.", "elif-lâmlı masdar lâm ile mecrûr; فِي الغِنَى الرَّغْبَةِ’ye bağlı."]
    ].map(IRB) }
  ]
},
// ---------------------------------------------------------------- 5 · ÂYET, HADİS, OKUMA
{
  id: "u5", no: 5, ar: "فِي الآيَاتِ وَالحَدِيثِ وَالقِرَاءَةِ", tr: "Âyet, Hadis ve Okuma", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Âyet ve hadislerde mef’ûlün lieclihi bulmak", "Aynı sebebin mansûb ve mecrûr gelişini görmek: خَشْيَةَ إِمْلَاقٍ / مِنْ إِمْلَاقٍ", "“الأُمُّ: سِرُّ الحَيَاةِ” metnini okuyup sebep bildiren ifadeleri ayırmak"],
  examples: [
    { s: "يَدْعُونَ:mz / رَبَّهُمْ:- / خَوْفًا وَطَمَعًا:nasb", tr: "Rablerine korkarak ve umarak dua ederler. (Secde 16)" },
    { s: "يَخْفِقُ:mz / قَلْبُهَا:- / رَحْمَةً:nasb / بِطِفْلِهَا.:-", tr: "Kalbi çocuğuna merhametten çarpar." }
  ],
  rules: [
    { tr: "Âyet ve hadislerde mef’ûlün lieclih çoğu zaman muzâftır: <span class=\"ar\">خَشْيَةَ إِمْلَاقٍ · حَذَرَ المَوْتِ · رِئَاءَ النَّاسِ</span>." },
    { tr: "Aynı anlam harf-i cer ile de gelir:", ex: ["خَشْيَةَ إِمْلَاقٍ (الإسراء ٣١) · مِنْ إِمْلَاقٍ (الأنعام ١٥١)"] },
    { tr: "<span class=\"ar\">لِيَسْتَحِيلَا، لِتَقُومَ، لِتَتَسَمَّعَ</span> gibi <b>lâm-ı ta’lîl + muzâri</b> de sebep bildirir; bunlar masdar-ı müevveldir, kitaptaki tanımla mef’ûlün lieclih sayılmaz." },
    { tr: "Bazı sebep bildiren câr-mecrûrlarda mecrûr masdar değildir (<span class=\"ar\">لِلْأَنَامِ، فِي هِرَّةٍ</span>); bunlar ta’lîl için câr-mecrûr diye i’rab edilir." }
  ],
  kaide: ["ضَعْ خَطًّا تَحْتَ المَفْعُولِ لِأَجْلِهِ فِي الآيَاتِ الكَرِيمَةِ وَالحَدِيثَيْنِ الشَّرِيفَيْنِ، ثُمَّ اقْرَأِ القِطْعَةَ وَعَيِّنْ فِيهَا المَفْعُولَ لِأَجْلِهِ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "٧", ar: "ضَعْ خَطًّا تَحْتَ المَفْعُولِ لِأَجْلِهِ فِي الآيَاتِ الكَرِيمَةِ وَالحَدِيثَيْنِ الشَّرِيفَيْنِ", tr: "Fiili, mansûb mef’ûlün lieclihi ve harf-i cerle gelen sebebi etiketle.", items: [
      T("وَلَا:x / تَقْتُلُوا:mz / أَوْلَادَكُمْ:x / خَشْيَةَ إِمْلَاقٍ:nasb / نَحْنُ نَرْزُقُهُمْ وَإِيَّاكُمْ:x", "Yoksulluk korkusuyla çocuklarınızı öldürmeyin; onları da sizi de biz rızıklandırırız. (İsrâ 31)", "Muzâf mef’ûlün lieclih."),
      T("وَلَا:x / تَقْتُلُوا:mz / أَوْلَادَكُمْ:x / مِنْ إِمْلَاقٍ:cerr / نَحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ:x", "Yoksulluk yüzünden çocuklarınızı öldürmeyin; sizi de onları da biz rızıklandırırız. (En’âm 151)", "Aynı sebep مِنْ ile mecrûr."),
      T("يَجْعَلُونَ:mz / أَصَابِعَهُمْ فِي آذَانِهِمْ:x / مِنَ الصَّوَاعِقِ:cerr / حَذَرَ المَوْتِ:nasb", "Ölüm korkusuyla, yıldırımlardan dolayı parmaklarını kulaklarına tıkarlar. (Bakara 19)", "İki sebep: مِنَ الصَّوَاعِقِ (mecrûr) ve حَذَرَ المَوْتِ (muzâf, mansûb)."),
      T("تَتَجَافَى جُنُوبُهُمْ عَنِ المَضَاجِعِ:x / يَدْعُونَ:mz / رَبَّهُمْ:x / خَوْفًا:nasb / وَطَمَعًا:nasb", "Yanları yataklardan uzaklaşır; Rablerine korku ve ümitle dua ederler. (Secde 16)", "Bazı müfessirler “korkarak, umarak” diye hâl de der."),
      T("كَالَّذِي:x / يُنْفِقُ:mz / مَالَهُ:x / رِئَاءَ النَّاسِ:nasb / وَلَا يُؤْمِنُ بِاللهِ:x", "Malını insanlara gösteriş için harcayan ve Allah’a inanmayan kimse gibi… (Bakara 264)", "رِئَاءَ: muzâf mef’ûlün lieclih."),
      T("وَيُسَبِّحُ:mz / الرَّعْدُ بِحَمْدِهِ وَالمَلَائِكَةُ:x / مِنْ خِيفَتِهِ:cerr", "Gök gürültüsü O’nu hamd ile, melekler de O’nun korkusundan tesbih eder. (Ra’d 13)", "مِنْ ile mecrûr sebep: korkusundan."),
      T("وَالأَرْضَ:x / وَضَعَهَا:mz / لِلْأَنَامِ:cerr", "Yeryüzünü de yaratıklar için yerleştirdi. (Rahmân 10)", "Kitap burayı sayar; الأَنَام masdar olmadığından ta’lîl lâmıyla câr-mecrûr demek daha doğrudur."),
      T("مَنْ:x / صَامَ:mz / رَمَضَانَ:x / إِيمَانًا وَاحْتِسَابًا:nasb / غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ:x", "Kim inanarak ve sevabını Allah’tan umarak Ramazan orucunu tutarsa geçmiş günahları bağışlanır. (Hadis)", "إِيمَانًا وَاحْتِسَابًا: mef’ûlün lieclih (hâl diyenler de var)."),
      T("دَخَلَتْ:mz / امْرَأَةٌ النَّارَ:x / فِي هِرَّةٍ:cerr / حَبَسَتْهَا:x", "Bir kadın hapsettiği bir kedi yüzünden cehenneme girdi. (Hadis)", "فِي sebep bildirir (bir kedi yüzünden); هِرَّة masdar değildir.")
    ]},
    { type: "reading", num: "٩", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ عَيِّنِ المَفْعُولَ لِأَجْلِهِ", tr: "Metni oku, soruları cevapla; sonra koyu ifadeyi sınıflandır.", title: "الأُمُّ: سِرُّ الحَيَاةِ",
      text: "نَعَمْ، إِنَّ الأُمَّ سِرُّ حَيَاةِ الإِنْسَانِ، مِنْ صَرْخَةِ الوِلَادَةِ تَبْدَأُ رِحْلَةُ الحَيَاةِ مَعَهُ وَتَكُونُ إِلَى جَانِبِهِ، لَا تُفَارِقُهُ حَتَّى تُفَارِقَهَا الرُّوحُ.<br>فَالأُمُّ تَضُمُّ طِفْلَهَا بِعِنَايَتِهَا وَرِعَايَتِهَا، وَيَخْفِقُ قَلْبُهَا دَائِمًا رَحْمَةً بِطِفْلِهَا، وَتَسْكُبُ قَلْبَهَا فِي قَلْبِهِ لِيَسْتَحِيلَا إِلَى قَلْبٍ وَاحِدٍ. وَهِيَ الَّتِي تَسْهَرُ عَلَى طِفْلِهَا اللَّيَالِيَ، وَهِيَ الَّتِي تَتَحَمَّلُ آلَامَ الحَيَاةِ عَطْفًا عَلَيْهِ لِتَقُومَ بِتَرْبِيَتِهِ أَحْسَنَ تَرْبِيَةٍ.<br>لَا يَسْتَطِيعُ الرَّجُلُ أَنْ يَكُونَ رَجُلًا حَتَّى يَجِدَ إِلَى جَانِبِهِ أُمًّا تَبْعَثُ فِي نَفْسِهِ رُوحَ الشَّجَاعَةِ وَالهِمَّةِ، وَتَغْرِسُ فِي قَلْبِهِ سِرَّ الحَيَاةِ إِشْعَارًا بِقِيمَةِ المَسْؤُولِيَّةِ الَّتِي حَمَّلَهَا اللهُ إِيَّاهُ. وَكَذَلِكَ لَا يَسْتَطِيعُ الإِنْسَانُ أَنْ يَجِدَ عِنْدَ أَحَدٍ، مِنَ الحَنَانِ وَالحُبِّ وَالعَطْفِ وَالإِيثَارِ، مَا يَجِدُهُ فِي قَلْبِ الأُمِّ؛ فَهِيَ الَّتِي تَمْنَحُهُ كُلَّ الحُبِّ وَالحَنَانِ، وَهِيَ الَّتِي تَغْمُرُهُ بِالحُبِّ وَتُؤْثِرُهُ عَلَى نَفْسِهَا دُونَ أَنْ تَتَرَدَّدَ. فَهِيَ عُكَّازُهُ الَّذِي يَسْتَنِدُ عَلَيْهِ فِي كُلِّ مَرَاحِلِ حَيَاتِهِ، وَهِيَ الَّتِي تَجْعَلُ قَلْبَهَا مُسْتَوْدَعًا لِأَسْرَارِهِ لِلتَّرْوِيحِ عَنْ نَفْسِهِ، وَهِيَ الَّتِي تَسْهَرُ بِجَانِبِ سَرِيرِهِ لَيْلَهَا كُلَّهُ لِتَتَسَمَّعَ أَنْفَاسَهُ، وَهِيَ الَّتِي تَحْرِصُ كُلَّ الحِرْصِ لِتَفْهَمَ حَاجَاتِهِ مِنْ خِلَالِ حَرَكَاتِ يَدَيْهِ وَنَظَرَاتِ عَيْنَيْهِ.",
      textTr: "Evet, anne insanın hayatının sırrıdır. Doğumdaki ilk çığlıktan itibaren hayat yolculuğu onunla başlar; anne onun yanında olur ve ruhu bedeninden ayrılıncaya kadar ondan ayrılmaz. Anne çocuğunu ilgisi ve bakımıyla kucaklar; kalbi çocuğuna merhametten hep çarpar, iki kalp tek kalp olsun diye kalbini onun kalbine döker. Çocuğu için gecelerce uykusuz kalan, ona şefkatinden hayatın acılarına katlanan odur; onu en güzel şekilde yetiştirmek ister. Erkek, yanında ruhuna cesaret ve azim aşılayan, Allah’ın ona yüklediği sorumluluğun değerini hissettirmek için kalbine hayatın sırrını eken bir anne bulmadıkça adam olamaz. İnsan annesinin kalbinde bulduğu şefkati, sevgiyi ve fedakârlığı kimsede bulamaz. Ona bütün sevgiyi veren, kendine tercih eden odur. Hayatının her döneminde dayandığı bastonudur; içini rahatlatması için kalbini sırlarına emanet yeri yapar, nefesini dinlemek için bütün gece yatağının başında bekler, el hareketlerinden ve bakışlarından ihtiyaçlarını anlamak için büyük özen gösterir.",
      qa: [
        { q: "مِنْ مَتَى تَبْدَأُ رِحْلَةُ الحَيَاةِ مَعَ الأُمِّ؟", a: "مِنْ صَرْخَةِ الوِلَادَةِ.", tr: "Hayat yolculuğu anneyle ne zaman başlar? Doğumdaki ilk çığlıktan." },
        { q: "لِمَاذَا يَخْفِقُ قَلْبُ الأُمِّ دَائِمًا؟", a: "رَحْمَةً بِطِفْلِهَا.", tr: "Annenin kalbi niçin hep çarpar? Çocuğuna merhametten." },
        { q: "لِمَاذَا تَتَحَمَّلُ الأُمُّ آلَامَ الحَيَاةِ؟", a: "عَطْفًا عَلَى طِفْلِهَا، لِتَقُومَ بِتَرْبِيَتِهِ أَحْسَنَ تَرْبِيَةٍ.", tr: "Anne hayatın acılarına niçin katlanır? Çocuğuna şefkatinden, onu en güzel şekilde yetiştirmek için." },
        { q: "مَاذَا تَغْرِسُ الأُمُّ فِي قَلْبِ ابْنِهَا؟", a: "تَغْرِسُ سِرَّ الحَيَاةِ إِشْعَارًا بِقِيمَةِ المَسْؤُولِيَّةِ.", tr: "Anne oğlunun kalbine ne eker? Sorumluluğun değerini hissettirmek için hayatın sırrını." },
        { q: "لِمَاذَا تَسْهَرُ الأُمُّ بِجَانِبِ سَرِيرِ طِفْلِهَا؟", a: "لِتَتَسَمَّعَ أَنْفَاسَهُ.", tr: "Anne niçin çocuğunun yatağı başında uykusuz kalır? Nefesini dinlemek için." }
      ],
      cls: { opts: RD, ar: "مَا هَذَا التَّعْبِيرُ؟", tr: "Koyu ifade mansûb mef’ûlün lieclih mi, harf-i cerle sebep mi, lâm + fiil mi, başka mı?", items: [
        { s: HL("وَيَخْفِقُ قَلْبُهَا دَائِمًا رَحْمَةً بِطِفْلِهَا", "رَحْمَةً"), a: "n", why: "Niçin çarpar? Merhametten: mansûb masdar." },
        { s: HL("تَتَحَمَّلُ آلَامَ الحَيَاةِ عَطْفًا عَلَيْهِ", "عَطْفًا"), a: "n", why: "Şefkatinden." },
        { s: HL("سِرَّ الحَيَاةِ إِشْعَارًا بِقِيمَةِ المَسْؤُولِيَّةِ", "إِشْعَارًا"), a: "n", why: "Hissettirmek için." },
        { s: HL("مُسْتَوْدَعًا لِأَسْرَارِهِ لِلتَّرْوِيحِ عَنْ نَفْسِهِ", "لِلتَّرْوِيحِ"), a: "c", why: "elif-lâmlı masdar, lâm ile mecrûr sebep." },
        { s: HL("تَسْكُبُ قَلْبَهَا فِي قَلْبِهِ لِيَسْتَحِيلَا", "لِيَسْتَحِيلَا"), a: "l", why: "Lâm-ı ta’lîl + muzâri." },
        { s: HL("عَطْفًا عَلَيْهِ لِتَقُومَ بِتَرْبِيَتِهِ", "لِتَقُومَ"), a: "l", why: "Lâm-ı ta’lîl + muzâri." },
        { s: HL("لَيْلَهَا كُلَّهُ لِتَتَسَمَّعَ أَنْفَاسَهُ", "لِتَتَسَمَّعَ"), a: "l", why: "Lâm-ı ta’lîl + muzâri." },
        { s: HL("تَحْرِصُ كُلَّ الحِرْصِ لِتَفْهَمَ حَاجَاتِهِ", "لِتَفْهَمَ"), a: "l", why: "Lâm-ı ta’lîl + muzâri." },
        { s: HL("لِتَقُومَ بِتَرْبِيَتِهِ أَحْسَنَ تَرْبِيَةٍ", "أَحْسَنَ"), a: "x", why: "Mef’ûl-i mutlak yerinde (nâib)." },
        { s: HL("تَسْهَرُ عَلَى طِفْلِهَا اللَّيَالِيَ", "اللَّيَالِيَ"), a: "x", why: "Zarf-ı zaman." },
        { s: HL("وَهِيَ الَّتِي تَحْرِصُ كُلَّ الحِرْصِ", "كُلَّ"), a: "x", why: "Mef’ûl-i mutlak yerinde." },
        { s: HL("تَجْعَلُ قَلْبَهَا مُسْتَوْدَعًا لِأَسْرَارِهِ", "مُسْتَوْدَعًا"), a: "x", why: "جَعَلَ’in 2. mef’ûlü." },
        { s: HL("أَنْ يَكُونَ رَجُلًا", "رَجُلًا"), a: "x", why: "كَانَ’nin haberi." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["سَافَرْتُ إِلَى بِلَادِ الغُرْبَةِ {طَلَبًا} لِلْعِلْمِ.", ["طَلَبًا", "طَالِبًا", "طَلَبٌ"], "masdar, mansûb", "İlim için gurbete gittim.", "u1"],
  ["هَرَبَ القَاتِلُ {خَوْفًا} مِنَ القَتْلِ.", ["خَوْفًا", "خَائِفٌ", "خَوْفٍ"], "masdar, mansûb", "Katil korkudan kaçtı.", "u1"],
  ["غَرَسَ البُسْتَانِيُّ الأَزْهَارَ {تَجْمِيلًا} لِلْحَدِيقَةِ.", ["تَجْمِيلًا", "جَمِيلًا", "تَجْمِيلٌ"], "masdar, mansûb", "Bahçıvan bahçeyi güzelleştirmek için çiçek dikti.", "u1"],
  ["يَحْتَرِمُ الشَّعْبُ القَانُونَ {دَفْعًا} لِلظُّلْمِ.", ["دَفْعًا", "دَافِعٌ", "دَفْعٍ"], "masdar, mansûb", "Halk zulmü önlemek için kanuna uyar.", "u1"],
  ["يُسَاعِدُ الغَنِيُّ الفَقِيرَ {شَفَقَةً} عَلَيْهِ.", ["شَفَقَةً", "شَفِيقٌ", "شَفَقَةٌ"], "masdar, mansûb", "Zengin fakire acıdığı için yardım eder.", "u1"],
  ["اغْتَرَبْتُ {لِطَلَبِ} العِلْمِ.", ["لِطَلَبِ", "لِطَلَبًا", "طَلَبًا"], "lâm ile: tenvin düşer", "İlim için gurbete çıktım.", "u2"],
  ["بَكَى الوَلَدُ {مِنَ} الأَلَمِ.", ["مِنَ", "إِلَى", "عَنِ"], "sebep مِنْ", "Çocuk acıdan ağladı.", "u2"],
  ["مَاتَتِ الشَّاةُ {بِدَائِهَا}.", ["بِدَائِهَا", "بِدَاءَهَا", "دَاؤُهَا"], "sebep bâsı", "Koyun hastalığından öldü.", "u2"],
  ["{حُبًّا} فِي الصَّيْدِ خَرَجْتُ.", ["حُبًّا", "حُبٌّ", "حُبٍّ"], "öne alınmış, mansûb", "Av sevgisinden çıktım.", "u2"],
  ["لِحُبِّ {الصَّيْدِ} خَرَجْتُ.", ["الصَّيْدِ", "الصَّيْدَ", "الصَّيْدُ"], "muzâfun ileyh mecrûr", "Av sevgisinden çıktım.", "u2"],
  ["اسْتَقَالَ أَحْمَدُ {لِلطَّمَعِ} فِي العِلْمِ.", ["لِلطَّمَعِ", "لِلطَّمَعَ", "طَمَعٌ"], "elif-lâmlı: lâm ile mecrûr", "Ahmed ilme hırsından ayrıldı.", "u2"],
  ["يُؤَدِّي المُسْلِمُ العِبَادَاتِ {طَاعَةً} لِلَّهِ.", ["طَاعَةً", "طَائِعٌ", "طَاعَةٍ"], "masdar: sebep", "Müslüman ibadetleri Allah’a itaat için yapar.", "u3"],
  ["بَعَثَ اللهُ الرُّسُلَ {رَحْمَةً} بِالإِنْسَانِ.", ["رَحْمَةً", "رَاحِمٌ", "رَحْمَةٍ"], "masdar: sebep", "Allah peygamberleri rahmet olarak gönderdi.", "u3"],
  ["يَسْتَقْبِلُ الوَزِيرُ ضَيْفَهُ {إِكْرَامًا} لَهُ.", ["إِكْرَامًا", "كَرِيمٌ", "إِكْرَامٍ"], "أَكْرَمَ → إِكْرَام", "Bakan misafirini ikram için karşılar.", "u3"],
  ["يَتَوَجَّهُ النَّاخِبُونَ إِلَى الصَّنَادِيقِ {لِانْتِخَابِ} أَعْضَاءِ البَرْلَمَانِ.", ["لِانْتِخَابِ", "لِانْتِخَابَ", "لِانْتِخَابٌ"], "lâm + muzâf masdar", "Seçmenler milletvekillerini seçmek için sandığa gider.", "u3"],
  ["جَلَسَ المُسَافِرُ فِي صَالَةِ المَطَارِ {انْتِظَارًا} لِلطَّائِرَةِ.", ["انْتِظَارًا", "مُنْتَظِرٌ", "انْتِظَارٌ"], "masdar, mansûb", "Yolcu uçağı beklemek için salonda oturdu.", "u3"],
  ["يَشْتَرِي الآبَاءُ المَلَابِسَ الجَدِيدَةَ {اسْتِعْدَادًا} لِلْعِيدِ.", ["اسْتِعْدَادًا", "مُسْتَعِدٌّ", "اسْتِعْدَادٌ"], "اسْتَعَدَّ → اسْتِعْدَاد", "Babalar bayrama hazırlık için elbise alır.", "u3"],
  ["نَظَمَ الشَّاعِرُ قَصِيدَتَهُ {مَدْحًا} لِلْأَمِيرِ.", ["مَدْحًا", "مَدْحٌ", "مَدْحٍ"], "cevap: mansûb masdar", "Şair şiirini emiri övmek için yazdı.", "u4"],
  ["تَمْنَحُ الحُكُومَةُ المُزَارِعِينَ قُرُوضًا {مُسَاعَدَةً} لَهُمْ.", ["مُسَاعَدَةً", "مُسَاعَدَةٌ", "مُسَاعَدَةٍ"], "mansûb", "Hükümet çiftçilere yardım için kredi verir.", "u4"],
  ["أَتَحَفَّظُ فِي كَلَامِي {خَشْيَةَ} الزَّلَلِ.", ["خَشْيَةَ", "خَشْيَةُ", "خَشْيَةً"], "muzâf: tenvinsiz mansûb", "Hata korkusuyla sözüme dikkat ederim.", "u4"],
  ["جِئْتُ {لِلدِّرَاسَةِ}.", ["لِلدِّرَاسَةِ", "لِلدِّرَاسَةَ", "الدِّرَاسَةً"], "câr-mecrûr", "Ders için geldim.", "u4"],
  ["وَلَا تَقْتُلُوا أَوْلَادَكُمْ {خَشْيَةَ} إِمْلَاقٍ.", ["خَشْيَةَ", "خَشْيَةُ", "خَشْيَةٍ"], "muzâf, mansûb", "Yoksulluk korkusuyla çocuklarınızı öldürmeyin.", "u5"],
  ["يَدْعُونَ رَبَّهُمْ {خَوْفًا} وَطَمَعًا.", ["خَوْفًا", "خَوْفٌ", "خَوْفٍ"], "mansûb", "Rablerine korku ve ümitle dua ederler.", "u5"],
  ["كَالَّذِي يُنْفِقُ مَالَهُ {رِئَاءَ} النَّاسِ.", ["رِئَاءَ", "رِئَاءُ", "رِئَاءِ"], "muzâf, mansûb", "Malını gösteriş için harcayan gibi.", "u5"],
  ["وَيَخْفِقُ قَلْبُهَا دَائِمًا {رَحْمَةً} بِطِفْلِهَا.", ["رَحْمَةً", "رَحِيمٌ", "رَحْمَةٌ"], "mansûb masdar", "Kalbi çocuğuna merhametten çarpar.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ ← lâm ile", "اغْتَرَبْتُ لِطَلَبِ العِلْمِ", "اغْتَرَبْتُ لِطَلَبًا لِلْعِلْمِ", "اغْتَرَبْتُ لِلطَّلَبِ العِلْمِ", "Lâm gelince tenvin düşer, masdar muzâf olur.", "u2"],
  ["قُمْتُ احْتِرَامًا لَكَ ← lâm ile", "قُمْتُ لِاحْتِرَامِكَ", "قُمْتُ لِاحْتِرَامًا لَكَ", "قُمْتُ لِاحْتِرَامُكَ", "Zamir muzâfun ileyh olur: لِاحْتِرَامِكَ.", "u2"],
  ["تُمْنَحُ المُكَافَآتُ تَشْجِيعًا لِلْمُبْدِعِينَ ← lâm ile", "تُمْنَحُ المُكَافَآتُ لِتَشْجِيعِ المُبْدِعِينَ", "تُمْنَحُ المُكَافَآتُ لِتَشْجِيعًا المُبْدِعِينَ", "تُمْنَحُ المُكَافَآتُ لِتَشْجِيعِ المُبْدِعُونَ", "Muzâfun ileyh cem-i müz.: yâ ile mecrûr.", "u2"],
  ["اغْتَرَبْتُ لِطَلَبِ العِلْمِ ← mansûb", "اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ", "اغْتَرَبْتُ طَلَبٌ لِلْعِلْمِ", "اغْتَرَبْتُ طَلَبَ لِلْعِلْمِ", "Nekre masdar tenvinli mansûb; العِلْم lâm ile gelir.", "u2"],
  ["لِحُبِّ الصَّيْدِ خَرَجْتُ ← mansûb", "حُبًّا فِي الصَّيْدِ خَرَجْتُ", "حُبٌّ فِي الصَّيْدِ خَرَجْتُ", "حُبٍّ فِي الصَّيْدِ خَرَجْتُ", "Öne alınmış mansûb.", "u2"],
  ["خَرَجْتُ حُبًّا فِي الصَّيْدِ ← öne al", "حُبًّا فِي الصَّيْدِ خَرَجْتُ", "حُبٌّ فِي الصَّيْدِ خَرَجْتُ", "حُبًّا فِي الصَّيْدُ خَرَجْتُ", "Öne alınca i’rab değişmez.", "u2"],
  ["امْتَثَلَ ← masdar", "امْتِثَالًا", "مُمْتَثِلًا", "امْتِثَالٌ", "اِفْتِعَال: امْتِثَال.", "u3"],
  ["حَيَّا ← masdar", "تَحِيَّةً", "مُحَيِّيًا", "حَيَاةً", "تَفْعِلَة: تَحِيَّة.", "u3"],
  ["حَافَظَ ← masdar", "مُحَافَظَةً", "مُحَافِظًا", "حَافِظًا", "مُفَاعَلَة: مُحَافَظَة.", "u3"],
  ["سَهَّلَ ← masdar", "تَسْهِيلًا", "سَهْلًا", "مُسَهِّلًا", "تَفْعِيل: تَسْهِيل.", "u3"],
  ["أَكْرَمَ ← masdar", "إِكْرَامًا", "كَرِيمًا", "مُكْرِمًا", "إِفْعَال: إِكْرَام.", "u3"],
  ["اسْتَعَدَّ ← masdar", "اسْتِعْدَادًا", "مُسْتَعِدًّا", "عُدَّةً", "اِسْتِفْعَال: اسْتِعْدَاد.", "u3"],
  ["لِمَاذَا نَظَمَ الشَّاعِرُ قَصِيدَتَهُ؟ ← (مَدَحَ)", "نَظَمَهَا مَدْحًا لِلْأَمِيرِ", "نَظَمَهَا مَادِحٌ لِلْأَمِيرِ", "نَظَمَهَا مَدْحٌ لِلْأَمِيرِ", "Cevap mansûb masdar.", "u4"],
  ["لِمَاذَا وَزَّعَ المُدِيرُ الجَوَائِزَ؟ ← (قَدَّرَ)", "وَزَّعَهَا تَقْدِيرًا لِجُهُودِهِمْ", "وَزَّعَهَا قَدْرًا لِجُهُودِهِمْ", "وَزَّعَهَا تَقْدِيرٌ لِجُهُودِهِمْ", "قَدَّرَ → تَقْدِير, mansûb.", "u4"]
];
// Ne o? hız oyunu
var NOUN_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = KND;
// Sebep mi? hız oyunu
var MM_OPTS = SB;
var MM_LIST = UNITS[1].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
[[HL("اسْتَقَالَ أَحْمَدُ لِلطَّمَعِ فِي العِلْمِ", "لِلطَّمَعِ"), "e", "Hırsından."], [HL("يَبْكِي الطِّفْلُ مِنَ الجُوعِ", "مِنَ الجُوعِ"), "e", "Açlıktan."],
 [HL("مَرَرْتُ بِصَدِيقِي", "بِصَدِيقِي"), "h", "Geçilen kişi; sebep değil."], [HL("فَرِحْتُ بِنَجَاحِكَ", "بِنَجَاحِكَ"), "e", "Başarın yüzünden sevindim."],
 [HL("أَخَذْتُ الكِتَابَ مِنَ المَكْتَبَةِ", "مِنَ المَكْتَبَةِ"), "h", "Nereden? Yer."], [HL("سَهِرْتُ لِلْمُذَاكَرَةِ", "لِلْمُذَاكَرَةِ"), "e", "Ders çalışmak için."],
 [HL("نِمْتُ فِي الحَدِيقَةِ", "فِي الحَدِيقَةِ"), "h", "Nerede? Yer."]
].forEach(function (x) { MM_LIST.push(x); });
var HAFIZA = {
  ms: { name: "Mansûb ↔ lâm ile", pairs: [["طَلَبًا لِلْعِلْمِ", "لِطَلَبِ العِلْمِ"], ["احْتِرَامًا لَكَ", "لِاحْتِرَامِكَ"], ["حُبًّا فِي الصَّيْدِ", "لِحُبِّ الصَّيْدِ"], ["تَشْجِيعًا لِلْمُبْدِعِينَ", "لِتَشْجِيعِ المُبْدِعِينَ"], ["قَصْدَ المَعْرِفَةِ", "لِقَصْدِ المَعْرِفَةِ"], ["إِكْرَامًا لِضُيُوفِهِ", "لِإِكْرَامِ ضُيُوفِهِ"], ["تَسْهِيلًا لِلْمُرُورِ", "لِتَسْهِيلِ المُرُورِ"], ["خَشْيَةَ إِمْلَاقٍ", "مِنْ إِمْلَاقٍ"]] },
  fm: { name: "Fiil ↔ masdar", pairs: [["امْتَثَلَ", "امْتِثَالًا"], ["رَغِبَ", "رَغْبَةً"], ["حَيَّا", "تَحِيَّةً"], ["حَافَظَ", "مُحَافَظَةً"], ["سَهَّلَ", "تَسْهِيلًا"], ["أَكْرَمَ", "إِكْرَامًا"], ["خَافَ", "خَوْفًا"], ["اسْتَعَدَّ", "اسْتِعْدَادًا"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["طَلَبًا لِلْعِلْمِ", "ilim öğrenmek için"], ["خَوْفًا", "korkudan"], ["احْتِرَامًا", "saygıdan"], ["رَحْمَةً", "merhametten"], ["طَاعَةً", "itaat için"], ["اسْتِعْدَادًا", "hazırlık için"], ["خَشْيَةَ إِمْلَاقٍ", "yoksulluk korkusuyla"], ["تَطْهِيرًا", "temizlemek için"]] }
};
var KARTLAR = [
  ["Mef’ûlün lieclih nedir?", "Fiilin sebebini bildiren mansûb masdar: اغْتَرَبْتُ طَلَبًا لِلْعِلْمِ"],
  ["Hangi soruya cevaptır?", "لِمَ؟ / لِمَاذَا؟ (niçin?)"],
  ["Hangi harflerle mecrûr olur?", "Çoğunlukla لِـ; ayrıca مِنْ، بِـ، فِي"],
  ["Lâm gelince ne olur?", "Tenvin düşer, masdar muzâf olur: لِطَلَبِ العِلْمِ"],
  ["Öne alınabilir mi?", "Evet: حُبًّا فِي الصَّيْدِ خَرَجْتُ · لِحُبِّ الصَّيْدِ خَرَجْتُ"],
  ["Üç şekli?", "Nekre (حُبًّا), elif-lâmlı (لِلطَّمَعِ), muzâf (قَصْدَ المَعْرِفَةِ)"],
  ["هَرَبَ خَوْفًا ile خَافَ خَوْفًا farkı?", "İlki mef’ûlün lieclih (sebep), ikincisi mef’ûl-i mutlak (aynı fiilin masdarı)."],
  ["طَاعَةً mı طَائِعًا mı?", "Sebep için masdar: طَاعَةً. طَائِعًا hâl olur."],
  ["İ’rabı?", "مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ"],
  ["خَشْيَةَ إِمْلَاقٍ?", "Muzâf mef’ûlün lieclih; إِمْلَاقٍ muzâfun ileyh."],
  ["مِنْ إِمْلَاقٍ?", "Aynı sebep, مِنْ ile mecrûr (En’âm 151)."],
  ["لِتَقُومَ بِتَرْبِيَتِهِ?", "Lâm-ı ta’lîl + fiil: sebep bildirir ama masdar-ı müevveldir."]
];
