// ================= VERİ: Masdarın Ameli (عَمَلُ المَصْدَرِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "المَصْدَرُ العَامِلُ", tr: "Âmil masdar" }, nasb: { ar: "المَعْمُولُ", tr: "Ma’mûl" }, cerr: { ar: "فَاعِلُ المَصْدَرِ · غَيْرُ العَامِلِ", tr: "Masdarın fâili / amel etmeyen" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var GS5 = [["e", "Âmil: en / mâ ile takdir", "عَامِلٌ: يُقَدَّرُ بِـ«أَنْ» أَوْ «مَا»", "nasb"], ["v", "Âmil: fiilin yerine", "عَامِلٌ: نَائِبٌ عَنْ فِعْلِهِ", "cerr"], ["t", "Amel etmez: te’kîd", "غَيْرُ عَامِلٍ: لِلتَّأْكِيدِ", "mi"], ["d", "Amel etmez: aded", "غَيْرُ عَامِلٍ: لِلْعَدَدِ", "ref"], ["b", "Amel etmez: teşbih", "غَيْرُ عَامِلٍ: لِلتَّشْبِيهِ", "muz"]];
var FMZ = [["f", "Fâiline muzâf", "مُضَافٌ إِلَى فَاعِلِهِ", "nasb"], ["m", "Mef’ûlüne muzâf", "مُضَافٌ إِلَى مَفْعُولِهِ", "cerr"]];
var SK = [["m", "Muzâf", "مُضَافٌ", "nasb"], ["t", "Tenvinli", "مُنَوَّنٌ", "cerr"], ["l", "Harf-i tarifli", "مُعَرَّفٌ بِـ«الْـ»", "mi"]];
var AG = [["a", "Âmil", "عَامِلٌ", "nasb"], ["g", "Amel etmiyor", "غَيْرُ عَامِلٍ", "cerr"]];
var MA2 = [["f", "Fâil (izafetle mecrûr)", "فَاعِلٌ مَجْرُورٌ لَفْظًا", "nasb"], ["m", "Mef’ûl (mansûb)", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "cerr"], ["z", "Mef’ûl (izafetle mecrûr)", "مَفْعُولٌ مَجْرُورٌ لَفْظًا", "mi"]];
var TUR_TR = { e: "En / mâ", v: "Fiilin yerine", t: "Te’kîd / tenvinli", d: "Aded", b: "Teşbih", f: "Fâil", m: "Mef’ûl / muzâf", l: "Harf-i tarifli", a: "Âmil", g: "Gayr-i âmil", z: "Mecrûr mef’ûl" };
// Makine: masdar × kullanım → [cümle, Türkçe]
var MW = ["اجْتِهَادٌ · الدَّرْسَ", "إِكْرَامٌ · الضَّيْفَ", "حُبٌّ · الوَطَنَ", "إِطْعَامٌ · المَسَاكِينَ"];
var MC = ["Muzâf", "Tenvinli", "Harf-i tarifli", "Fiilin yerine", "En + mâzî", "En + muzâri", "Mâ + muzâri", "Mef’ûl-i mutlak"];
var MX = [
  [["يَسُرُّنِي:x / اجْتِهَادُكَ:mz / الدَّرْسَ.:nasb", "Derse çalışman beni sevindiriyor."], ["اجْتِهَادٌ:mz / الدَّرْسَ:nasb / خَيْرٌ مِنَ اللَّعِبِ.:x", "Derse çalışmak oyundan iyidir."], ["الاجْتِهَادُ:mz / الدَّرْسَ:nasb / طَرِيقُ النَّجَاحِ.:x", "Derse çalışmak başarının yoludur."], ["اجْتِهَادًا:mz / الدَّرْسَ!:nasb", "Derse çalışın!"], ["يَسُرُّنِي:x / أَنِ اجْتَهَدْتَ:mz / الدَّرْسَ.:nasb", "Derse çalışmış olman beni sevindiriyor. (geçmiş)"], ["يَسُرُّنِي:x / أَنْ تَجْتَهِدَ:mz / الدَّرْسَ.:nasb", "Derse çalışacak olman beni sevindiriyor. (gelecek)"], ["يَسُرُّنِي:x / مَا تَجْتَهِدُ:mz / الدَّرْسَ.:nasb", "Şu an derse çalışman beni sevindiriyor. (şimdi)"], ["اجْتَهَدْتُ:x / اجْتِهَادًا:cerr / كَبِيرًا.:x", "Çok çalıştım. (mef’ûl-i mutlak: amel etmez)"]],
  [["أَعْجَبَنِي:x / إِكْرَامُ:mz / الرَّجُلِ:cerr / ضَيْفَهُ.:nasb", "Adamın misafirine ikramı hoşuma gitti."], ["إِكْرَامٌ:mz / ضَيْفًا:nasb / مِنْ أَخْلَاقِ المُسْلِمِ.:x", "Misafire ikram Müslümanın ahlakındandır."], ["الإِكْرَامُ:mz / الضَّيْفَ:nasb / مِنَ الإِيمَانِ.:x", "Misafire ikram imandandır."], ["إِكْرَامًا:mz / الضَّيْفَ!:nasb", "Misafire ikram edin!"], ["أَعْجَبَنِي:x / أَنْ أَكْرَمْتَ:mz / الضَّيْفَ.:nasb", "Misafire ikram etmiş olman hoşuma gitti."], ["يُعْجِبُنِي:x / أَنْ تُكْرِمَ:mz / الضَّيْفَ.:nasb", "Misafire ikram edecek olman hoşuma gidiyor."], ["يُعْجِبُنِي:x / مَا تُكْرِمُ:mz / الضَّيْفَ.:nasb", "Misafire şu an ikram etmen hoşuma gidiyor."], ["أَكْرَمْتُ:x / إِكْرَامًا:cerr / الضَّيْفَ.:nasb", "Misafire elbette ikram ettim. (الضَّيْفَ, أَكْرَمْتُ’un mef’ûlü)"]],
  [["حُبُّكَ:mz / الوَطَنَ:nasb / مِنَ الإِيمَانِ.:x", "Vatanı sevmen imandandır."], ["حُبٌّ:mz / الوَطَنَ:nasb / وَاجِبٌ.:x", "Vatanı sevmek vaciptir."], ["الحُبُّ:mz / وَطَنَنَا:nasb / مِنَ الإِيمَانِ.:x", "Vatanımızı sevmek imandandır."], ["حُبًّا:mz / الوَطَنَ!:nasb", "Vatanı sevin!"], ["يُعْجِبُنِي:x / أَنْ أَحْبَبْتَ:mz / الوَطَنَ.:nasb", "Vatanı sevmiş olman hoşuma gidiyor."], ["يُعْجِبُنِي:x / أَنْ تُحِبَّ:mz / الوَطَنَ.:nasb", "Vatanı sevecek olman hoşuma gidiyor."], ["يُعْجِبُنِي:x / مَا تُحِبُّ:mz / الوَطَنَ.:nasb", "Vatanı şu an sevmen hoşuma gidiyor."], ["أُحِبُّ الوَطَنَ:x / حُبًّا:cerr / شَدِيدًا.:x", "Vatanı çok severim. (mef’ûl-i mutlak)"]],
  [["إِطْعَامُكَ:mz / المَسَاكِينَ:nasb / صَدَقَةٌ.:x", "Yoksulları doyurman sadakadır."], ["﴿أَوْ إِطْعَامٌ:mz / فِي يَوْمٍ ذِي مَسْغَبَةٍ:x / يَتِيمًا﴾:nasb", "Ya da açlık gününde bir yetimi doyurmak. (Beled 14-15)"], ["الإِطْعَامُ:mz / المَسَاكِينَ:nasb / عَمَلٌ صَالِحٌ.:x", "Yoksulları doyurmak salih ameldir."], ["إِطْعَامًا:mz / المَسَاكِينَ!:nasb", "Yoksulları doyurun!"], ["سَرَّنِي:x / أَنْ أَطْعَمْتَ:mz / المَسَاكِينَ.:nasb", "Yoksulları doyurmuş olman beni sevindirdi."], ["يَسُرُّنِي:x / أَنْ تُطْعِمَ:mz / المَسَاكِينَ.:nasb", "Yoksulları doyuracak olman beni sevindiriyor."], ["يَسُرُّنِي:x / مَا تُطْعِمُ:mz / المَسَاكِينَ.:nasb", "Yoksulları şu an doyurman beni sevindiriyor."], ["أَطْعَمْتُ:x / إِطْعَامَيْنِ:cerr / المَسَاكِينَ.:nasb", "Yoksulları iki kez doyurdum. (aded: amel etmez)"]]
];
var MN = [
  "En çok kullanılan biçim: masdar fâiline muzâf, mef’ûlü mansûb.",
  "Tenvinli masdar mef’ûlünü nasb eder.",
  "Harf-i tarifli masdar da amel eder; kullanımı azdır.",
  "Fiilinin yerine geçen (emir anlamlı) masdar amel eder.",
  "أَنْ + mâzî: geçmiş anlam. Masdar bununla takdir edilebiliyorsa amel eder.",
  "أَنْ + muzâri: gelecek anlam.",
  "مَا (masdariyye) + muzâri: şimdiki zaman.",
  "Te’kîd, aded ya da teşbih bildiren mef’ûl-i mutlak amel etmez; ardındaki isim fiilin ma’mûlüdür."
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
// Üç zaman: [cümle, geçmiş, gelecek, şimdi, Türkçe, açıklama] → her satırda doğru olan farklı
function UZ(x, i) {
  return CBP([x[0] + "<br>لِلْمُضِيِّ (أَنْ + المَاضِي):", [x[1], x[2], x[3]], "<br>لِلِاسْتِقْبَالِ (أَنْ + المُضَارِعِ):", [x[2], x[3], x[1]], "<br>لِلْحَالِ (مَا + المُضَارِعِ):", [x[3], x[1], x[2]]], i, x[4], x[5]);
}

var METIN = "مِنْ حِكْمَةِ اللهِ ـ عَزَّ وَجَلَّ ـ جَعْلُهُ الحَيَاةَ مُتَشَابِكَةَ المَصَالِحِ، مُتَشَعِّبَةَ الجَوَانِبِ، مُتَعَدِّدَةَ المَنَافِعِ. وَمُوَاجَهَةُ المَرْءِ أَعْبَاءَهَا وَحْدَهُ تُثْقِلُ كَاهِلَهُ، وَإِنْ كَانَ قَوِيَّ العَزْمِ، مَتِينَ الجِسْمِ، وَاسِعَ الحِيلَةِ. وَلَكِنَّ مُعَاوَنَةَ النَّاسِ بَعْضِهِمْ بَعْضًا تُسَهِّلُ عَلَيْهِمْ حَيَاتَهُمْ؛ لِذَا كَانَ اكْتِسَابُ المَرْءِ إِخْوَانًا يَشُدُّ أَزْرَهُ بِهِمْ وَيَشُدُّونَ أَزْرَهُمْ بِهِ ضَرُورَةً." +
  "<br>يَقُولُ عَلِيٌّ ـ رَضِيَ اللهُ عَنْهُ ـ: «أَعْجَزُ النَّاسِ مَنْ عَجَزَ عَنِ اكْتِسَابِ الإِخْوَانِ، وَأَعْجَزُ مِنْهُ مَنْ ضَيَّعَ مَنْ ظَفِرَ بِهِ مِنْهُمْ». فَمَا أَرْوَعَ كَوْنَ النَّاسِ مُتَآزِرِينَ، يُهْرَعُ كُلٌّ مِنْهُمْ إِلَى مُسَاعَدَةِ أَخِيهِ!";

var UNITS = [
// ---------------------------------------------------------------- 1 · MASDARIN AMELİ
{
  id: "u1", no: 1, ar: "عَمَلُ المَصْدَرِ وَصُوَرُهُ", tr: "Masdarın Ameli ve Biçimleri", short: "Amel", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Masdarın fiili gibi amel edip mef’ûlü nasb ettiğini bilmek", "Masdarın fâilinin çoğunlukla muzâfun ileyh olarak mecrûr geldiğini görmek", "Masdarın fâiline mi, mef’ûlüne mi muzâf olduğunu ayırmak", "Âmil masdarın üç biçimini tanımak: muzâf, tenvinli, harf-i tarifli"],
  examples: [
    { s: "يَسُرُّنِي:x / اجْتِهَادُكَ:mz / الدَّرْسَ.:nasb", tr: "Derse çalışman beni sevindiriyor. (ـكَ fâil, الدَّرْسَ mef’ûl)", pair: "يُعْجِبُنِي:x / إِحْسَانُكَ:mz / الفُقَرَاءَ.:nasb", pairTr: "Fakirlere iyilik etmen hoşuma gidiyor." },
    { s: "دَرْءٌ:mz / مَفْسَدَةً:nasb / أَوْلَى مِنْ:x / جَلْبٍ:mz / مَنْفَعَةً.:nasb", tr: "Bir zararı gidermek, bir fayda sağlamaktan önce gelir. (tenvinli)", pair: "نَحْنُ فِي:x / انْتِظَارٍ:mz / ضُيُوفَنَا.:nasb", pairTr: "Misafirlerimizi bekliyoruz. (tenvinli)" },
    { s: "الحُبُّ:mz / وَطَنَنَا:nasb / مِنَ الإِيمَانِ.:x", tr: "Vatanımızı sevmek imandandır. (harf-i tarifli)", pair: "الكِتَابَةُ:mz / مِثْلَ:nasb / هَذِهِ الرِّوَايَةِ لَيْسَتْ بِالأَمْرِ السَّهْلِ.:x", pairTr: "Bu roman gibisini yazmak kolay iş değil. (harf-i tarifli)" }
  ],
  rules: [
    { tr: "<b>Masdar</b> fiilinin amelini yapar: <b>mef’ûlü nasb</b> eder. Masdarın <b>fâili</b> ise çoğunlukla ona <b>muzâf</b> olur ve lafzen mecrûrdur:", ex: ["يَسُرُّنِي اجْتِهَادُكَ الدَّرْسَ ← ـكَ: فَاعِلٌ مَجْرُورٌ لَفْظًا · الدَّرْسَ: مَفْعُولٌ", "إِكْرَامُ الرَّجُلِ ضَيْفَهُ ← الرَّجُلِ: فَاعِلٌ · ضَيْفَهُ: مَفْعُولٌ"] },
    { tr: "Masdar bazen <b>mef’ûlüne</b> muzâf olur, fâil zikredilmez: <span class=\"ar\">بَعْدَ شُرْبِ الدَّوَاءِ · هِوَايَتِي مُمَارَسَةُ الرِّيَاضَةِ</span>." },
    { tr: "Âmil masdar üç biçimde gelir:", ex: ["مُضَافٌ (en çok): اجْتِهَادُكَ الدَّرْسَ", "مُنَوَّنٌ: دَرْءٌ مَفْسَدَةً · انْتِظَارٍ ضُيُوفَنَا", "مُعَرَّفٌ بِـ«الْـ» (en az): الحُبُّ وَطَنَنَا"] },
    { tr: "Lâzım fiilin masdarı mef’ûl almaz, yalnız fâiline muzâf olur: <span class=\"ar\">انْغِمَاسُ المَرْءِ فِي التَّرَفِ · قُرْبُ الصَّدِيقِ</span>." }
  ],
  kaide: ["١ ـ يَعْمَلُ المَصْدَرُ عَمَلَ فِعْلِهِ، فَيَنْصِبُ المَفْعُولَ. وَأَمَّا فَاعِلُ المَصْدَرِ فَيَأْتِي غَالِبًا مُضَافًا إِلَيْهِ مَجْرُورًا، مِثْلُ: يَسُرُّنِي اجْتِهَادُكَ الدَّرْسَ.", "٣ ـ يَعْمَلُ المَصْدَرُ مُضَافًا وَهُوَ الأَكْثَرُ، مِثْلُ: يَسُرُّنِي اجْتِهَادُكَ الدَّرْسَ؛ أَوْ مُنَوَّنًا، مِثْلُ: دَرْءٌ مَفْسَدَةً أَوْلَى مِنْ جَلْبٍ مَنْفَعَةً؛ أَوْ مُعَرَّفًا بِـ«الْـ» وَهُوَ الأَقَلُّ اسْتِعْمَالًا، مِثْلُ: الحُبُّ وَطَنَنَا مِنَ الإِيمَانِ."],
  ex: [
    { type: "classify", num: "٢", opts: FMZ, ar: "عَيِّنِ المَصْدَرَ المُضَافَ إِلَى الفَاعِلِ وَالمُضَافَ إِلَى المَفْعُولِ", tr: "Koyu masdar fâiline mi, mef’ûlüne mi muzâf?", exHtml: "<span class=\"ar\">تَحَسَّنَ حَالُ المَرِيضِ بَعْدَ شُرْبِ الدَّوَاءِ ← «شُرْبِ» مُضَافٌ إِلَى مَفْعُولِهِ «الدَّوَاءِ»</span>", items: CL([
      [HL("انْغِمَاسُ المَرْءِ فِي التَّرَفِ يَضُرُّهُ.", "انْغِمَاسُ"), "f", "المَرْءِ dalan kişi: fâil."],
      [HL("يَفْرَحُ الإِنْسَانُ لِقُرْبِ الصَّدِيقِ.", "قُرْبِ"), "f", "Yakın olan dost: fâil."],
      [HL("مِنْ حُسْنِ إِسْلَامِ المَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ.", "تَرْكُهُ"), "f", "ـهُ fâil, مَا mef’ûl."],
      [HL("حُبُّكَ الوَطَنَ مِنَ الإِيمَانِ.", "حُبُّكَ"), "f", "ـكَ fâil, الوَطَنَ mef’ûl."],
      [HL("مَا أَجْمَلَ إِكْرَامَ الرَّجُلِ ضَيْفَهُ!", "إِكْرَامَ"), "f", "الرَّجُلِ fâil, ضَيْفَهُ mef’ûl."],
      [HL("إِنْشَادُ أَخِي الشِّعْرَ يُرَوِّحُ عَنْ نَفْسِي.", "إِنْشَادُ"), "f", "أَخِي fâil, الشِّعْرَ mef’ûl."],
      [HL("مَا أَجْمَلَ طَاعَتَكَ وَالِدَيْكَ!", "طَاعَتَكَ"), "f", "ـكَ fâil, وَالِدَيْكَ mef’ûl."],
      [HL("هِوَايَتِي مُمَارَسَةُ الرِّيَاضَةِ.", "مُمَارَسَةُ"), "m", "Spor yapılan şey: mef’ûl."]
    ]) },
    { type: "classify", extra: true, opts: SK, ar: "مَا صُورَةُ المَصْدَرِ العَامِلِ؟", tr: "Koyu âmil masdar hangi biçimde?", items: CL([
      [HL("يَسُرُّنِي اجْتِهَادُكَ الدَّرْسَ.", "اجْتِهَادُكَ"), "m", "Muzâf (en çok kullanılan)."],
      [HL("حُبُّكَ الوَطَنَ مِنَ الإِيمَانِ.", "حُبُّكَ"), "m", "Muzâf."],
      [HL("مَا أَجْمَلَ إِكْرَامَ الرَّجُلِ ضَيْفَهُ!", "إِكْرَامَ"), "m", "Muzâf."],
      [HL("دَرْءٌ مَفْسَدَةً أَوْلَى مِنْ جَلْبٍ مَنْفَعَةً.", "دَرْءٌ"), "t", "Tenvinli."],
      [HL("دَرْءٌ مَفْسَدَةً أَوْلَى مِنْ جَلْبٍ مَنْفَعَةً.", "جَلْبٍ"), "t", "Tenvinli."],
      [HL("نَحْنُ فِي انْتِظَارٍ ضُيُوفَنَا.", "انْتِظَارٍ"), "t", "Tenvinli."],
      [HL("﴿أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ يَتِيمًا﴾", "إِطْعَامٌ"), "t", "Tenvinli; mef’ûlü يَتِيمًا."],
      [HL("الحُبُّ وَطَنَنَا مِنَ الإِيمَانِ.", "الحُبُّ"), "l", "Harf-i tarifli (az)."],
      [HL("الكِتَابَةُ مِثْلَ هَذِهِ الرِّوَايَةِ لَيْسَتْ بِالأَمْرِ السَّهْلِ.", "الكِتَابَةُ"), "l", "Harf-i tarifli; مِثْلَ mef’ûlü."],
      [HL("الطَّالِبُ قَلِيلُ الإِهْمَالِ وَاجِبَهُ.", "الإِهْمَالِ"), "l", "Harf-i tarifli; وَاجِبَهُ mef’ûlü."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · EN / MÂ İLE TAKDİR
{
  id: "u2", no: 2, ar: "تَقْدِيرُ المَصْدَرِ بِـ«أَنْ» وَ«مَا» وَالفِعْلِ", tr: "En / Mâ ve Fiille Takdir", short: "Takdir", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Masdarın amel şartını bilmek: أَنْ ya da مَا ile fiile çevrilebilmeli", "أَنْ + mâzî (geçmiş), أَنْ + muzâri (gelecek), مَا + muzâri (şimdi) farkını görmek", "Masdar-ı müevvel ile sarîh masdar arasında gidip gelmek"],
  examples: [
    { s: "يَسُرُّنِي:x / اجْتِهَادُكَ:mz / الدَّرْسَ.:nasb", tr: "Derse çalışman beni sevindiriyor.", pair: "يَسُرُّنِي:x / أَنِ اجْتَهَدْتَ:mz / الدَّرْسَ.:nasb", pairTr: "= derse çalışmış olman (geçmiş)" },
    { s: "يَسُرُّنِي:x / أَنْ تَجْتَهِدَ:mz / الدَّرْسَ.:nasb", tr: "= derse çalışacak olman (gelecek)", pair: "يُعْجِبُنِي:x / مَا تُعْطِي:mz / الفُقَرَاءَ.:nasb", pairTr: "= şu an fakirlere vermen (şimdi) ← عَطَاؤُكَ الفُقَرَاءَ" }
  ],
  rules: [
    { tr: "Masdarın amel etmesi için yerine <b>أَنْ ya da مَا + fiil</b> konabilmelidir; buna <b>masdar-ı müevvel</b> denir:", ex: ["أَنْ + المَاضِي ← لِلْمُضِيِّ: يَسُرُّنِي أَنِ اجْتَهَدْتَ الدَّرْسَ", "أَنْ + المُضَارِعِ ← لِلِاسْتِقْبَالِ: يَسُرُّنِي أَنْ تَجْتَهِدَ الدَّرْسَ", "مَا + المُضَارِعِ ← لِلْحَالِ: يُعْجِبُنِي مَا تُعْطِي الفُقَرَاءَ"] },
    { tr: "Sarîh masdar zaman bildirmez; en ya da mâ ile kurulan masdar-ı müevvel zamanı belli eder. Sarîh masdarı müevvele çevirince fâil, fiilin fâili olur: <span class=\"ar\">عِصْيَانُ الجُنُودِ قُوَّادَهُمْ ← أَنْ عَصَى الجُنُودُ قُوَّادَهُمْ</span>." },
    { tr: "Tersine, <span class=\"ar\">أَنْ</span>/<span class=\"ar\">مَا</span> + fiili masdara çevirince fâil masdara muzâf olur, mef’ûl mansûb kalır: <span class=\"ar\">يَسُرُّنِي أَنْ تُنْقِذَ الغَرِيقَ ← يَسُرُّنِي إِنْقَاذُكَ الغَرِيقَ</span>." },
    { tr: "Harf-i cerden sonra da aynı: <span class=\"ar\">لِأَنْ فَعَلْتَ الخَيْرَ ← لِفِعْلِكَ الخَيْرَ · بِأَنْ يَنْجَحَ الأَوْلَادُ ← بِنَجَاحِ الأَوْلَادِ</span>." }
  ],
  kaide: ["٢ ـ يُشْتَرَطُ فِي عَمَلِ المَصْدَرِ أَنْ يَصْلُحَ تَقْدِيرُهُ: أ ـ بِـ«أَنْ وَالفِعْلِ المَاضِي» (لِلْمُضِيِّ)، مِثْلُ: يَسُرُّنِي اجْتِهَادُكَ (أَنِ اجْتَهَدْتَ) الدَّرْسَ. ب ـ أَوْ بِـ«أَنْ وَالفِعْلِ المُضَارِعِ» (لِلِاسْتِقْبَالِ)، مِثْلُ: يَسُرُّنِي اجْتِهَادُكَ (أَنْ تَجْتَهِدَ) الدَّرْسَ. جـ ـ أَوْ بِـ«مَا المَصْدَرِيَّةِ وَالفِعْلِ المُضَارِعِ» (لِلْحَالِ)، مِثْلُ: يُعْجِبُنِي عَطَاؤُكَ (مَا تُعْطِي) الفُقَرَاءَ (الآنَ). يُسَمَّى (أَنْ + الفِعْلُ) وَ(مَا + الفِعْلُ) مَصْدَرًا مُؤَوَّلًا؛ لِأَنَّ «أَنْ» وَ«مَا» تُؤَوِّلَانِ الفِعْلَ إِلَى مَصْدَرٍ: أَنْ + يَجْتَهِدَ: اجْتِهَادُهُ · مَا + تُعْطِي: عَطَاؤُكَ."],
  ex: [
    { type: "combo", num: "٣", ar: "اسْتَبْدِلْ كُلَّ مَصْدَرٍ مُضَافٍ فِيمَا يَأْتِي بِـ«أَنْ وَالفِعْلِ المَاضِي / المُضَارِعِ» وَبِـ«مَا وَالفِعْلِ» وَاذْكُرِ الفَرْقَ فِي المَعْنَى", tr: "Her satır için doğru masdar-ı müevveli seç: geçmiş, gelecek, şimdi.", exHtml: "<span class=\"ar\">يَسُرُّنِي إِحْسَانُكَ إِلَى الفُقَرَاءِ ← أَنْ أَحْسَنْتَ (لِلْمُضِيِّ) · أَنْ تُحْسِنَ (لِلِاسْتِقْبَالِ) · مَا تُحْسِنُ (لِلْحَالِ)</span>", items: [
      ["يُحْزِنُنِي عِصْيَانُ الجُنُودِ قُوَّادَهُمْ.", "أَنْ عَصَى الجُنُودُ قُوَّادَهُمْ", "أَنْ يَعْصِيَ الجُنُودُ قُوَّادَهُمْ", "مَا يَعْصِي الجُنُودُ قُوَّادَهُمْ", "Askerlerin komutanlarına isyanı beni üzüyor.", "الجُنُودُ fiilin fâili olur."],
      ["صُنْعُكَ المَعْرُوفَ شَرَفٌ لَكَ.", "أَنْ صَنَعْتَ المَعْرُوفَ", "أَنْ تَصْنَعَ المَعْرُوفَ", "مَا تَصْنَعُ المَعْرُوفَ", "İyilik yapman senin için şereftir.", "ـكَ fiilde fâil zamiri olur."],
      ["قَنَاعَةُ الإِنْسَانِ كَنْزٌ لَا يَفْنَى.", "أَنْ قَنِعَ الإِنْسَانُ", "أَنْ يَقْنَعَ الإِنْسَانُ", "مَا يَقْنَعُ الإِنْسَانُ", "İnsanın kanaati tükenmez bir hazinedir.", "Lâzım fiil: yalnız fâil."],
      ["مَا أَجْمَلَ تَرْكَكَ الكَسَلَ!", "أَنْ تَرَكْتَ الكَسَلَ", "أَنْ تَتْرُكَ الكَسَلَ", "مَا تَتْرُكُ الكَسَلَ", "Tembelliği bırakman ne güzel!", "Mef’ûl mansûb kalır."],
      ["مُصَاحَبَتُكَ الصَّالِحِينَ نِعْمَةٌ.", "أَنْ صَاحَبْتَ الصَّالِحِينَ", "أَنْ تُصَاحِبَ الصَّالِحِينَ", "مَا تُصَاحِبُ الصَّالِحِينَ", "Salihlerle arkadaşlığın bir nimettir.", "Mef’ûl mansûb."],
      ["يَلِيقُ بِكَ تَنْظِيمُكَ الأُمُورَ.", "أَنْ نَظَّمْتَ الأُمُورَ", "أَنْ تُنَظِّمَ الأُمُورَ", "مَا تُنَظِّمُ الأُمُورَ", "İşleri düzene koyman sana yakışır.", "Mef’ûl mansûb."],
      ["وَيْلٌ لِقِيَادَتِكَ السَّيَّارَةَ.", "أَنْ قُدْتَ السَّيَّارَةَ", "أَنْ تَقُودَ السَّيَّارَةَ", "مَا تَقُودُ السَّيَّارَةَ", "Senin araba kullanmana yazıklar olsun.", "Ecvef fiil: قَادَ – يَقُودُ."],
      ["أَنَا فِي حُزْنٍ لِوَفَاةِ جَدِّي.", "أَنْ تُوُفِّيَ جَدِّي", "أَنْ يُتَوَفَّى جَدِّي", "مَا يُتَوَفَّى جَدِّي", "Dedemin vefatı yüzünden üzgünüm.", "Meçhul fiil; anlamca yalnız geçmiş uygun."]
    ].map(UZ) },
    { type: "pick", num: "٤", ar: "اسْتَبْدِلْ «أَنْ وَالفِعْلَ» أَوْ «مَا وَالفِعْلَ» بِمَصْدَرٍ", tr: "Masdar-ı müevvelin yerine sarîh masdar konmuş doğru cümleyi seç.", exHtml: "<span class=\"ar\">يَسُرُّنِي أَنْ تُنْقِذَ الغَرِيقَ ← يَسُرُّنِي إِنْقَاذُكَ الغَرِيقَ</span>", items: PL([
      ["أَحْزَنَنِي أَنْ فَقَدْتَ حَقِيبَتَكَ.", "أَحْزَنَنِي فَقْدُكَ حَقِيبَتَكَ.", "أَحْزَنَنِي فَقْدُكَ حَقِيبَتُكَ.", "أَحْزَنَنِي فَقْدَكَ حَقِيبَتِكَ.", "Çantanı kaybetmen beni üzdü.", "Masdar fâil (merfû), ـكَ muzâfun ileyh, mef’ûl mansûb."],
      ["أَنْ تَنْصُرَ المَظْلُومَ مُرُوءَةٌ.", "نَصْرُكَ المَظْلُومَ مُرُوءَةٌ.", "نَصْرُكَ المَظْلُومُ مُرُوءَةٌ.", "نَصْرَكَ المَظْلُومِ مُرُوءَةٌ.", "Mazluma yardım etmen mertliktir.", "Mübtedâ masdar; mef’ûl mansûb."],
      ["يُعْجِبُنِي مَا تَقُولُ الحَقَّ.", "يُعْجِبُنِي قَوْلُكَ الحَقَّ.", "يُعْجِبُنِي قَوْلُكَ الحَقُّ.", "يُعْجِبُنِي قَوْلَكَ الحَقِّ.", "Hakkı söylemen hoşuma gidiyor.", "Mef’ûl mansûb."],
      ["قَدَّرْتُكَ لِأَنْ فَعَلْتَ الخَيْرَ.", "قَدَّرْتُكَ لِفِعْلِكَ الخَيْرَ.", "قَدَّرْتُكَ لِفِعْلِكَ الخَيْرِ.", "قَدَّرْتُكَ لِفِعْلُكَ الخَيْرَ.", "İyilik yaptığın için seni takdir ettim.", "Masdar lâm ile mecrûr; mef’ûl mansûb."],
      ["مَا أَحْسَنَ أَنْ تَعْرِفَ خَطَأَكَ!", "مَا أَحْسَنَ مَعْرِفَتَكَ خَطَأَكَ!", "مَا أَحْسَنَ مَعْرِفَتُكَ خَطَأَكَ!", "مَا أَحْسَنَ مَعْرِفَتَكَ خَطَئِكَ!", "Hatanı bilmen ne güzel!", "Taaccübde mef’ûl: مَعْرِفَتَكَ."],
      ["قَرَّرْتُ أَنْ أَتَّبِعَ الحِمْيَةَ.", "قَرَّرْتُ اتِّبَاعَ الحِمْيَةِ.", "قَرَّرْتُ اتِّبَاعُ الحِمْيَةِ.", "قَرَّرْتُ اتِّبَاعًا الحِمْيَةِ.", "Perhiz yapmaya karar verdim.", "Fâil anlaşıldığı için masdar mef’ûlüne muzâf."],
      ["يَفْتَخِرُ الآبَاءُ بِأَنْ يَنْجَحَ الأَوْلَادُ.", "يَفْتَخِرُ الآبَاءُ بِنَجَاحِ الأَوْلَادِ.", "يَفْتَخِرُ الآبَاءُ بِنَجَاحِ الأَوْلَادُ.", "يَفْتَخِرُ الآبَاءُ بِنَجَاحَ الأَوْلَادِ.", "Babalar çocukların başarısıyla övünür.", "Lâzım fiil: masdar fâiline muzâf."],
      ["طَلَبَ المُدَرِّسُ مِنِّي أَنْ أَجْلِسَ عَلَى الكُرْسِيِّ.", "طَلَبَ المُدَرِّسُ مِنِّي الجُلُوسَ عَلَى الكُرْسِيِّ.", "طَلَبَ المُدَرِّسُ مِنِّي الجُلُوسُ عَلَى الكُرْسِيِّ.", "طَلَبَ المُدَرِّسُ مِنِّي جُلُوسًا الكُرْسِيَّ.", "Öğretmen benden sandalyeye oturmamı istedi.", "Masdar طَلَبَ’in mef’ûlü."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · FİİLİN YERİNE GEÇEN MASDAR
{
  id: "u3", no: 3, ar: "المَصْدَرُ النَّائِبُ عَنْ فِعْلِهِ", tr: "Fiilinin Yerine Geçen Masdar", short: "Nâib", col: "cerr", legend: ["mz", "nasb"],
  goals: ["Emir fiilinin yerine geçen masdarın da amel ettiğini bilmek", "Emri masdara çevirip ma’mûlünü göstermek"],
  examples: [
    { s: "تَقْدِيرًا:mz / جُهُودَ:nasb / الطُّلَّابِ.:x", tr: "Öğrencilerin emeğini takdir edin! (= قَدِّرُوا جُهُودَ الطُّلَّابِ)", pair: "إِطْعَامًا:mz / المَسَاكِينَ!:nasb", pairTr: "Yoksulları doyurun! (= أَطْعِمُوا المَسَاكِينَ)" }
  ],
  rules: [
    { tr: "Masdar, <b>fiilinin yerine</b> geçince (çoğu zaman emir anlamında) amel eder: <span class=\"ar\">تَقْدِيرًا جُهُودَ الطُّلَّابِ</span> = <span class=\"ar\">قَدِّرُوا جُهُودَ الطُّلَّابِ</span>." },
    { tr: "Biçim: masdar <b>mansûb ve tenvinli</b>, ma’mûlü <b>mansûb</b>:", ex: ["أَكْرِمِ الفَقِيرَ ← إِكْرَامًا الفَقِيرَ", "اسْقِ الأَشْجَارَ ← سَقْيًا الأَشْجَارَ", "نَظِّفِ الأَسْنَانَ ← تَنْظِيفًا الأَسْنَانَ"] },
    { tr: "Doğru masdarı seç: <span class=\"ar\">أَفْعَلَ ← إِفْعَالًا</span> (<span class=\"ar\">أَطْفِئْ ← إِطْفَاءً · أَوْقِدْ ← إِيقَادًا</span>), <span class=\"ar\">فَعَّلَ ← تَفْعِيلًا</span> (<span class=\"ar\">نَظِّفْ ← تَنْظِيفًا</span>), <span class=\"ar\">افْتَعَلَ ← افْتِعَالًا</span> (<span class=\"ar\">احْتَرِمْ ← احْتِرَامًا</span>); sülâsîde semâîdir (<span class=\"ar\">فَتْحًا · سَقْيًا · خَفْضًا · رَحْمَةً</span>)." }
  ],
  kaide: ["د ـ أَوْ أَنْ يَكُونَ المَصْدَرُ نَائِبًا عَنْ فِعْلِهِ، مِثْلُ: تَقْدِيرًا (قَدِّرُوا) جُهُودَ الطُّلَّابِ، إِطْعَامًا (أَطْعِمُوا) المَسَاكِينَ."],
  ex: [
    { type: "pick", num: "٥", ar: "اجْعَلِ المَصْدَرَ نَائِبًا عَنِ الفِعْلِ فِيمَا يَأْتِي ثُمَّ بَيِّنْ مَعْمُولَ المَصْدَرِ", tr: "Emrin yerine geçen doğru masdar ifadesini seç.", exHtml: "<span class=\"ar\">أَكْرِمِ الفَقِيرَ ← إِكْرَامًا الفَقِيرَ (الفَقِيرَ: مَفْعُولُ «إِكْرَامًا»)</span>", items: PL([
      ["اسْقِ الأَشْجَارَ.", "سَقْيًا الأَشْجَارَ", "سَقْيًا الأَشْجَارِ", "سَقْيٌ الأَشْجَارَ", "Ağaçları sula!", "Masdar tenvinli mansûb, mef’ûl mansûb."],
      ["أَطْفِئِ النَّارَ.", "إِطْفَاءً النَّارَ", "إِطْفَاءً النَّارِ", "إِطْفَاءُ النَّارُ", "Ateşi söndür!", "إِفْعَالٌ kalıbı."],
      ["أَوْقِدِ المِصْبَاحَ.", "إِيقَادًا المِصْبَاحَ", "إِيقَادًا المِصْبَاحِ", "وَقْدًا المِصْبَاحُ", "Lambayı yak!", "أَوْقَدَ ← إِيقَادٌ."],
      ["احْتَرِمِ الكِبَارَ.", "احْتِرَامًا الكِبَارَ", "احْتِرَامًا الكِبَارِ", "احْتِرَامٌ الكِبَارَ", "Büyüklere saygı göster!", "افْتِعَالٌ kalıbı."],
      ["افْتَحِ البَابَ.", "فَتْحًا البَابَ", "فَتْحًا البَابِ", "فَتْحٌ البَابُ", "Kapıyı aç!", "Mef’ûl mansûb."],
      ["نَظِّفِ الأَسْنَانَ.", "تَنْظِيفًا الأَسْنَانَ", "تَنْظِيفًا الأَسْنَانِ", "نَظَافَةً الأَسْنَانَ", "Dişleri temizle!", "نَظَّفَ ← تَنْظِيفٌ (نَظَافَةٌ نَظُفَ’in masdarı)."],
      ["اخْفِضِ الصَّوْتَ.", "خَفْضًا الصَّوْتَ", "خَفْضًا الصَّوْتِ", "خَفْضٌ الصَّوْتَ", "Sesi alçalt!", "خَفَضَ ← خَفْضٌ."],
      ["ارْحَمِ الضُّعَفَاءَ.", "رَحْمَةً الضُّعَفَاءَ", "رَحْمَةً الضُّعَفَاءِ", "رَحْمَةٌ الضُّعَفَاءَ", "Zayıflara merhamet et!", "Mef’ûl mansûb."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اضْبِطْ", tr: "Fiilin yerine geçen masdarı ya da ma’mûlünü doğru biçimde seç.", items: PL([
      ["تَقْدِيرًا ___ الطُّلَّابِ.", "جُهُودَ", "جُهُودِ", "جُهُودُ", "Öğrencilerin emeğini takdir edin!", "Mef’ûl mansûb."],
      ["إِطْعَامًا ___!", "المَسَاكِينَ", "المَسَاكِينِ", "المَسَاكِينُ", "Yoksulları doyurun!", "Mef’ûl mansûb."],
      ["إِكْرَامًا ___!", "الفَقِيرَ", "الفَقِيرِ", "الفَقِيرُ", "Fakire ikram et!", "Mef’ûl mansûb."],
      ["سَقْيًا ___!", "الأَشْجَارَ", "الأَشْجَارِ", "الأَشْجَارُ", "Ağaçları sula!", "Mef’ûl mansûb."],
      ["___ البَابَ! (افْتَحْ)", "فَتْحًا", "فَتْحٌ", "فَاتِحًا", "Kapıyı aç!", "Masdar mansûb tenvinli."],
      ["___ الصَّوْتَ! (اخْفِضْ)", "خَفْضًا", "خَافِضًا", "خَفْضٌ", "Sesi alçalt!", "Masdar mansûb."],
      ["___ الكِبَارَ! (احْتَرِمْ)", "احْتِرَامًا", "مُحْتَرَمًا", "احْتِرَامٌ", "Büyüklere saygı!", "Masdar, ism-i mef’ûl değil."],
      ["___ الضُّعَفَاءَ! (ارْحَمْ)", "رَحْمَةً", "رَاحِمًا", "رَحْمَةٌ", "Zayıflara merhamet!", "Masdar, ism-i fâil değil."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · AMEL ETMEYEN MASDAR
{
  id: "u4", no: 4, ar: "المَصْدَرُ غَيْرُ العَامِلِ", tr: "Amel Etmeyen Masdar", short: "Gayr-i âmil", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["Mef’ûl-i mutlak olan masdarın amel etmediğini bilmek: te’kîd, aded, teşbih", "Âmil ve gayr-i âmil masdarı sebebiyle birlikte ayırmak"],
  examples: [
    { s: "ضَرَبْتُ:x / ضَرْبًا:cerr / الخَادِمَ.:nasb", tr: "Hizmetçiyi iyice dövdüm. (te’kîd: الخَادِمَ, ضَرَبْتُ’un mef’ûlü)", pair: "زُرْتُ:x / زِيَارَتَيْنِ:cerr / المَرِيضَ.:nasb", pairTr: "Hastayı iki kez ziyaret ettim. (aded)" },
    { s: "لِلسَّيَّارَةِ صَوْتٌ:x / صَوْتَ:cerr / الرَّعْدِ.:x", tr: "Arabanın gök gürültüsü gibi bir sesi var. (teşbih: yalnız izafet)", pair: "لَوْلَا:x / خَوْفٌ:mz / بَأْسَكَ:nasb / لَعَصَيْنَاكَ.:x", pairTr: "Gücünden korkmasaydık sana isyan ederdik. (âmil: أَنْ نَخَافَ)" }
  ],
  rules: [
    { tr: "<b>Mef’ûl-i mutlak</b> olan masdar amel etmez; ardındaki isim cümlenin fiilinin ma’mûlüdür:", ex: ["لِلتَّأْكِيدِ: ضَرَبْتُ ضَرْبًا الخَادِمَ · أَهْمَلَ إِهْمَالًا عَمَلَهُ", "لِلْعَدَدِ: زُرْتُ زِيَارَتَيْنِ المَرِيضَ", "لِلتَّشْبِيهِ: لِلسَّيَّارَةِ صَوْتٌ صَوْتَ الرَّعْدِ"] },
    { tr: "Test: masdarın yerine <span class=\"ar\">أَنْ</span>/<span class=\"ar\">مَا</span> + fiil konabiliyor mu? <span class=\"ar\">لَوْلَا خَوْفٌ بَأْسَكَ</span> → <span class=\"ar\">لَوْلَا أَنْ نَخَافَ بَأْسَكَ</span>: konabiliyor, âmildir. <span class=\"ar\">أَهْمَلَ إِهْمَالًا</span>’da konamıyor: amel etmez." },
    { tr: "Teşbih masdarında (<span class=\"ar\">صَوْتَ الرَّعْدِ · فَصَاحَةَ سَحْبَانَ</span>) ardındaki isim yalnızca muzâfun ileyhtir." },
    { tr: "Ma’mûl harf-i cerle de gelebilir (lâm-ı takviye): <span class=\"ar\">إِنْقَاذًا لِلْغَرِيقِ</span> = <span class=\"ar\">إِنْقَاذًا الغَرِيقَ</span>." }
  ],
  kaide: ["٤ ـ لَا يَعْمَلُ مَصْدَرُ المَفْعُولِ المُطْلَقِ؛ فَلَا يَعْمَلُ المَصْدَرُ الدَّالُّ عَلَى التَّأْكِيدِ، مِثْلُ: ضَرَبْتُ ضَرْبًا الخَادِمَ. «الخَادِمَ» مَفْعُولٌ لِـ«ضَرَبْتُ» لَيْسَ لِـ«ضَرْبًا». وَلَا المَصْدَرُ الدَّالُّ عَلَى العَدَدِ، مِثْلُ: زُرْتُ زِيَارَتَيْنِ المَرِيضَ. «المَرِيضَ» مَفْعُولٌ لِـ«زُرْتُ» لَيْسَ لِـ«زِيَارَتَيْنِ». وَلَا المَصْدَرُ الدَّالُّ عَلَى التَّشْبِيهِ، مِثْلُ: لِلسَّيَّارَةِ صَوْتٌ صَوْتَ الرَّعْدِ. «الصَّوْتُ» هُنَا مُضَافٌ إِلَى «الرَّعْدِ» فَقَطْ."],
  ex: [
    { type: "classify", num: "١", opts: GS5, ar: "عَيِّنِ المَصْدَرَ العَامِلَ وَغَيْرَ العَامِلِ وَبَيِّنِ السَّبَبَ", tr: "Koyu masdar amel ediyor mu? Sebebi ne?", exHtml: "<span class=\"ar\">لَوْلَا خَوْفٌ بَأْسَكَ لَعَصَيْنَاكَ ← عَامِلٌ؛ يَصْلُحُ تَقْدِيرُهُ بِـ«أَنْ نَخَافَ» · أَهْمَلَ العَامِلُ إِهْمَالًا عَمَلَهُ ← غَيْرُ عَامِلٍ؛ لِأَنَّهُ لِلتَّأْكِيدِ</span>", items: CL([
      [HL("سَاءَنِي ضَرْبُكَ الوَلَدَ.", "ضَرْبُكَ"), "e", "= أَنْ ضَرَبْتَ الوَلَدَ."],
      [HL("يَسُرُّنِي إِنْصَافُكَ الضُّعَفَاءَ.", "إِنْصَافُكَ"), "e", "= أَنْ تُنْصِفَ الضُّعَفَاءَ."],
      [HL("لَكَ فَصَاحَةٌ فَصَاحَةَ سَحْبَانَ.", "فَصَاحَةَ"), "b", "Teşbih: “Sahbân’ın fesahati gibi”."],
      [HL("إِنْقَاذًا لِلْغَرِيقِ.", "إِنْقَاذًا"), "v", "= أَنْقِذُوا الغَرِيقَ (ma’mûl lâm ile)."],
      [HL("آلَمَنِي زَجْرُكَ السَّائِلَ.", "زَجْرُكَ"), "e", "= أَنْ زَجَرْتَ السَّائِلَ."],
      [HL("الطَّالِبُ قَلِيلُ الإِهْمَالِ وَاجِبَهُ.", "الإِهْمَالِ"), "e", "Harf-i tarifli; = أَنْ يُهْمِلَ وَاجِبَهُ."],
      [HL("إِغَاثَةَ المَلْهُوفِ.", "إِغَاثَةَ"), "v", "= أَغِيثُوا المَلْهُوفَ (mef’ûlüne muzâf)."],
      [HL("اجْتِهَادُكَ الدَّرْسَ سَبَبٌ لِنَجَاحِكَ.", "اجْتِهَادُكَ"), "e", "= أَنْ تَجْتَهِدَ الدَّرْسَ."]
    ]) },
    { type: "classify", extra: true, opts: GS5, ar: "عَامِلٌ أَمْ غَيْرُ عَامِلٍ؟ وَلِمَاذَا؟", tr: "Masdarın durumunu seç.", items: CL([
      [HL("يَسُرُّنِي اجْتِهَادُكَ الدَّرْسَ.", "اجْتِهَادُكَ"), "e", "En ile takdir."],
      [HL("يُعْجِبُنِي إِحْسَانُكَ الفُقَرَاءَ.", "إِحْسَانُكَ"), "e", "En ile takdir."],
      [HL("دَرْءٌ مَفْسَدَةً أَوْلَى مِنْ جَلْبٍ مَنْفَعَةً.", "دَرْءٌ"), "e", "= أَنْ تُدْرَأَ…"],
      [HL("نَحْنُ فِي انْتِظَارٍ ضُيُوفَنَا.", "انْتِظَارٍ"), "e", "= فِي أَنْ نَنْتَظِرَ…"],
      [HL("الحُبُّ وَطَنَنَا مِنَ الإِيمَانِ.", "الحُبُّ"), "e", "= أَنْ نُحِبَّ وَطَنَنَا."],
      [HL("لَوْلَا خَوْفٌ بَأْسَكَ لَعَصَيْنَاكَ.", "خَوْفٌ"), "e", "= أَنْ نَخَافَ."],
      [HL("تَقْدِيرًا جُهُودَ الطُّلَّابِ.", "تَقْدِيرًا"), "v", "= قَدِّرُوا."],
      [HL("إِطْعَامًا المَسَاكِينَ.", "إِطْعَامًا"), "v", "= أَطْعِمُوا."],
      [HL("إِكْرَامًا الفَقِيرَ.", "إِكْرَامًا"), "v", "= أَكْرِمْ."],
      [HL("أَهْمَلَ العَامِلُ إِهْمَالًا عَمَلَهُ.", "إِهْمَالًا"), "t", "Te’kîd."],
      [HL("ضَرَبْتُ ضَرْبًا الخَادِمَ.", "ضَرْبًا"), "t", "Te’kîd."],
      [HL("زُرْتُ زِيَارَتَيْنِ المَرِيضَ.", "زِيَارَتَيْنِ"), "d", "Aded."],
      [HL("أَطْعَمْتُ إِطْعَامَيْنِ المَسَاكِينَ.", "إِطْعَامَيْنِ"), "d", "Aded."],
      [HL("لِلسَّيَّارَةِ صَوْتٌ صَوْتَ الرَّعْدِ.", "صَوْتَ"), "b", "Teşbih."],
      [HL("لَكَ فَصَاحَةٌ فَصَاحَةَ سَحْبَانَ.", "فَصَاحَةَ"), "b", "Teşbih."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "المَصْدَرُ العَامِلُ فِي النُّصُوصِ · القِرَاءَةُ", tr: "Metinde ve Âyetlerde Âmil Masdar", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Âyet ve hadislerde masdarın fâiline mi mef’ûlüne mi muzâf olduğunu bulmak", "Metinde amel eden masdarları ve ma’mûllerini çıkarmak"],
  examples: [
    { s: "﴿وَلَوْلَا:x / دَفْعُ:mz / اللهِ:cerr / النَّاسَ:nasb / بَعْضَهُمْ بِبَعْضٍ﴾:x", tr: "Allah’ın insanları birbiriyle savması olmasaydı… (Bakara 251)", pair: "﴿ذِكْرُ:x / رَحْمَتِ:mz / رَبِّكَ:cerr / عَبْدَهُ:nasb / زَكَرِيَّا﴾:x", pairTr: "Rabbinin kulu Zekeriyyâ’ya rahmetinin anılması. (Meryem 2)" }
  ],
  rules: [
    { tr: "Metinde âmil masdarı bulmak için: masdarın ardında mansûb bir isim var mı, ya da masdar <span class=\"ar\">أَنْ</span> + fiil ile açılabiliyor mu?", ex: ["جَعْلُهُ الحَيَاةَ ← أَنْ جَعَلَ الحَيَاةَ", "مُوَاجَهَةُ المَرْءِ أَعْبَاءَهَا ← أَنْ يُوَاجِهَ المَرْءُ أَعْبَاءَهَا", "مُعَاوَنَةُ النَّاسِ بَعْضِهِمْ بَعْضًا ← أَنْ يُعَاوِنَ النَّاسُ بَعْضُهُمْ بَعْضًا"] },
    { tr: "Nâkıs fiilin masdarı da amel eder: <span class=\"ar\">كَوْنَ النَّاسِ مُتَآزِرِينَ</span> (<span class=\"ar\">النَّاسِ</span> ismi, <span class=\"ar\">مُتَآزِرِينَ</span> haberi)." },
    { tr: "<span class=\"ar\">حِكْمَةٌ · عَزْمٌ</span> gibi isim ya da ma’mûlsüz masdarlar burada amel etmez." }
  ],
  kaide: ["اقْرَإِ القِطْعَةَ التَّالِيَةَ وَاسْتَخْرِجِ المَصَادِرَ الَّتِي تَعْمَلُ عَمَلَ أَفْعَالِهَا وَبَيِّنْ مَعْمُولَهَا."],
  ex: [
    { type: "classify", extra: true, opts: FMZ, ar: "مُضَافٌ إِلَى فَاعِلِهِ أَمْ إِلَى مَفْعُولِهِ؟", tr: "Âyet ve hadislerde: koyu masdar fâiline mi, mef’ûlüne mi muzâf?", items: CL([
      [HL("﴿وَلَوْلَا دَفْعُ اللهِ النَّاسَ بَعْضَهُمْ بِبَعْضٍ﴾", "دَفْعُ"), "f", "اللهِ fâil, النَّاسَ mef’ûl. (Bakara 251)"],
      [HL("﴿وَلِلَّهِ عَلَى النَّاسِ حِجُّ البَيْتِ﴾", "حِجُّ"), "m", "Haccedilen Beyt: mef’ûl. (Âl-i İmrân 97)"],
      [HL("﴿ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُ زَكَرِيَّا﴾", "رَحْمَتِ"), "f", "رَبِّكَ fâil, عَبْدَهُ mef’ûl. (Meryem 2)"],
      [HL("﴿وَأَخْذِهِمُ الرِّبَا﴾", "أَخْذِهِمُ"), "f", "ـهِمْ fâil, الرِّبَا mef’ûl. (Nisâ 161)"],
      [HL("«طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ»", "طَلَبُ"), "m", "İstenen ilim: mef’ûl."],
      [HL("«مِنْ حُسْنِ إِسْلَامِ المَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ»", "تَرْكُهُ"), "f", "ـهُ fâil."],
      [HL("تَحَسَّنَ حَالُ المَرِيضِ بَعْدَ شُرْبِ الدَّوَاءِ.", "شُرْبِ"), "m", "İçilen ilaç: mef’ûl."],
      [HL("قِرَاءَةُ القُرْآنِ عِبَادَةٌ.", "قِرَاءَةُ"), "m", "Mef’ûl."],
      [HL("حِفْظُ الأَمَانَةِ وَاجِبٌ.", "حِفْظُ"), "m", "Mef’ûl."],
      [HL("إِنْشَادُ أَخِي الشِّعْرَ يُرَوِّحُ عَنْ نَفْسِي.", "إِنْشَادُ"), "f", "أَخِي fâil."],
      [HL("مُمَارَسَةُ الرِّيَاضَةِ مُفِيدَةٌ.", "مُمَارَسَةُ"), "m", "Mef’ûl."],
      [HL("حُبُّكَ الوَطَنَ مِنَ الإِيمَانِ.", "حُبُّكَ"), "f", "ـكَ fâil."]
    ]) },
    { type: "reading", num: "٦", ar: "اقْرَإِ القِطْعَةَ التَّالِيَةَ وَاسْتَخْرِجِ المَصَادِرَ الَّتِي تَعْمَلُ عَمَلَ أَفْعَالِهَا وَبَيِّنْ مَعْمُولَهَا", tr: "Metni oku, soruları cevapla; sonra koyu masdarın amel edip etmediğini ve koyu ma’mûlün türünü seç.", title: "التَّعَاوُنُ",
      text: METIN,
      textTr: "Aziz ve celil olan Allah’ın hikmetlerinden biri, hayatı menfaatleri iç içe, yönleri dallı budaklı, faydaları çok kılmasıdır. İnsanın onun yükleriyle tek başına yüzleşmesi, azmi güçlü, bedeni sağlam, çaresi bol olsa da sırtını ağırlaştırır. Ama insanların birbirine yardım etmesi hayatlarını kolaylaştırır; bu yüzden insanın, kendisiyle güçlendiği ve onları da kendisiyle güçlendirdiği kardeşler edinmesi bir zarurettir.<br>Ali (r.a.) şöyle der: “İnsanların en âcizi kardeş edinmekten âciz olandır; ondan daha âcizi de edindiği kardeşi kaybedendir.” İnsanların, her biri kardeşinin yardımına koşarak birbirine destek olması ne harikadır! (el-Lugatu’l-Arabiyye, el-Ulûmu’l-Lugaviyye, 11. cilt)",
      qa: [
        { q: "كَيْفَ جَعَلَ اللهُ الحَيَاةَ؟", a: "جَعَلَهَا مُتَشَابِكَةَ المَصَالِحِ، مُتَشَعِّبَةَ الجَوَانِبِ، مُتَعَدِّدَةَ المَنَافِعِ.", tr: "Allah hayatı nasıl kıldı? Menfaatleri iç içe, yönleri dallı budaklı, faydaları çok." },
        { q: "مَا الَّذِي يُثْقِلُ كَاهِلَ المَرْءِ؟", a: "مُوَاجَهَتُهُ أَعْبَاءَ الحَيَاةِ وَحْدَهُ.", tr: "İnsanın sırtını ne ağırlaştırır? Hayatın yükleriyle tek başına yüzleşmesi." },
        { q: "مَا الَّذِي يُسَهِّلُ عَلَى النَّاسِ حَيَاتَهُمْ؟", a: "مُعَاوَنَةُ النَّاسِ بَعْضِهِمْ بَعْضًا.", tr: "İnsanların hayatını ne kolaylaştırır? Birbirlerine yardım etmeleri." },
        { q: "مَنْ أَعْجَزُ النَّاسِ عِنْدَ عَلِيٍّ رَضِيَ اللهُ عَنْهُ؟", a: "مَنْ عَجَزَ عَنِ اكْتِسَابِ الإِخْوَانِ، وَأَعْجَزُ مِنْهُ مَنْ ضَيَّعَ مَنْ ظَفِرَ بِهِ مِنْهُمْ.", tr: "Hz. Ali’ye göre insanların en âcizi kim? Kardeş edinemeyen; ondan da âcizi edindiğini kaybeden." }
      ],
      cls: { opts: AG, ar: "هَلْ يَعْمَلُ المَصْدَرُ؟", tr: "Koyu masdar burada amel ediyor mu?", items: [
        { s: HL("جَعْلُهُ الحَيَاةَ مُتَشَابِكَةَ المَصَالِحِ", "جَعْلُهُ"), a: "a", why: "Fâili ـهُ, mef’ûlleri الحَيَاةَ ve مُتَشَابِكَةَ." },
        { s: HL("وَمُوَاجَهَةُ المَرْءِ أَعْبَاءَهَا وَحْدَهُ", "مُوَاجَهَةُ"), a: "a", why: "Mef’ûlü أَعْبَاءَهَا." },
        { s: HL("وَلَكِنَّ مُعَاوَنَةَ النَّاسِ بَعْضِهِمْ بَعْضًا", "مُعَاوَنَةَ"), a: "a", why: "Mef’ûlü بَعْضًا." },
        { s: HL("كَانَ اكْتِسَابُ المَرْءِ إِخْوَانًا", "اكْتِسَابُ"), a: "a", why: "Mef’ûlü إِخْوَانًا." },
        { s: HL("مَنْ عَجَزَ عَنِ اكْتِسَابِ الإِخْوَانِ", "اكْتِسَابِ"), a: "a", why: "Mef’ûlüne muzâf." },
        { s: HL("فَمَا أَرْوَعَ كَوْنَ النَّاسِ مُتَآزِرِينَ", "كَوْنَ"), a: "a", why: "Nâkıs fiilin masdarı: ismi النَّاسِ, haberi مُتَآزِرِينَ." },
        { s: HL("يُهْرَعُ كُلٌّ مِنْهُمْ إِلَى مُسَاعَدَةِ أَخِيهِ", "مُسَاعَدَةِ"), a: "a", why: "Mef’ûlüne muzâf." },
        { s: HL("مِنْ حِكْمَةِ اللهِ ـ عَزَّ وَجَلَّ ـ", "حِكْمَةِ"), a: "g", why: "Ma’mûlü yok; fiil anlamında kullanılmamış." },
        { s: HL("وَإِنْ كَانَ قَوِيَّ العَزْمِ", "العَزْمِ"), a: "g", why: "Muzâfun ileyh; ma’mûlü yok." }
      ]},
      cls2: { opts: MA2, ar: "مَا نَوْعُ المَعْمُولِ؟", tr: "Koyu kelime masdarın neyi?", items: [
        { s: HL("جَعْلُهُ الحَيَاةَ", "الحَيَاةَ"), a: "m", why: "Mef’ûl." },
        { s: HL("وَمُوَاجَهَةُ المَرْءِ أَعْبَاءَهَا", "المَرْءِ"), a: "f", why: "Fâil, izafetle mecrûr." },
        { s: HL("وَمُوَاجَهَةُ المَرْءِ أَعْبَاءَهَا", "أَعْبَاءَهَا"), a: "m", why: "Mef’ûl." },
        { s: HL("مُعَاوَنَةَ النَّاسِ بَعْضِهِمْ بَعْضًا", "النَّاسِ"), a: "f", why: "Fâil (بَعْضِهِمْ ondan bedel)." },
        { s: HL("مُعَاوَنَةَ النَّاسِ بَعْضِهِمْ بَعْضًا", "بَعْضًا"), a: "m", why: "Mef’ûl." },
        { s: HL("اكْتِسَابُ المَرْءِ إِخْوَانًا", "إِخْوَانًا"), a: "m", why: "Mef’ûl." },
        { s: HL("عَنِ اكْتِسَابِ الإِخْوَانِ", "الإِخْوَانِ"), a: "z", why: "Mef’ûl, izafetle mecrûr." },
        { s: HL("إِلَى مُسَاعَدَةِ أَخِيهِ", "أَخِيهِ"), a: "z", why: "Mef’ûl, izafetle mecrûr." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["يَسُرُّنِي اجْتِهَادُكَ {الدَّرْسَ}.", ["الدَّرْسَ", "الدَّرْسُ", "الدَّرْسِ"], "mef’ûl: mansûb", "Derse çalışman beni sevindiriyor.", "u1"],
  ["يُعْجِبُنِي إِحْسَانُكَ {الفُقَرَاءَ}.", ["الفُقَرَاءَ", "الفُقَرَاءِ", "الفُقَرَاءُ"], "mef’ûl", "Fakirlere iyilik etmen hoşuma gidiyor.", "u1"],
  ["حُبُّكَ {الوَطَنَ} مِنَ الإِيمَانِ.", ["الوَطَنَ", "الوَطَنِ", "الوَطَنُ"], "mef’ûl", "Vatanı sevmen imandandır.", "u1"],
  ["دَرْءٌ {مَفْسَدَةً} أَوْلَى مِنْ جَلْبٍ مَنْفَعَةً.", ["مَفْسَدَةً", "مَفْسَدَةٍ", "مَفْسَدَةٌ"], "tenvinli masdarın mef’ûlü", "Zararı gidermek fayda sağlamaktan önce gelir.", "u1"],
  ["نَحْنُ فِي انْتِظَارٍ {ضُيُوفَنَا}.", ["ضُيُوفَنَا", "ضُيُوفِنَا", "ضُيُوفُنَا"], "mef’ûl", "Misafirlerimizi bekliyoruz.", "u1"],
  ["الحُبُّ {وَطَنَنَا} مِنَ الإِيمَانِ.", ["وَطَنَنَا", "وَطَنِنَا", "وَطَنُنَا"], "harf-i tarifli masdarın mef’ûlü", "Vatanımızı sevmek imandandır.", "u1"],
  ["مَا أَجْمَلَ إِكْرَامَ الرَّجُلِ {ضَيْفَهُ}!", ["ضَيْفَهُ", "ضَيْفِهِ", "ضَيْفُهُ"], "mef’ûl", "Adamın misafirine ikramı ne güzel!", "u2"],
  ["يَسُرُّنِي {أَنْ تُنْقِذَ} الغَرِيقَ.", ["أَنْ تُنْقِذَ", "أَنْ تُنْقِذُ", "مَا تُنْقِذَ"], "en + muzâri: mansûb", "Boğulanı kurtaracak olman beni sevindiriyor.", "u2"],
  ["يَسُرُّنِي إِنْقَاذُكَ {الغَرِيقَ}.", ["الغَرِيقَ", "الغَرِيقِ", "الغَرِيقُ"], "mef’ûl", "Boğulanı kurtarman beni sevindiriyor.", "u2"],
  ["مَا أَحْسَنَ مَعْرِفَتَكَ {خَطَأَكَ}!", ["خَطَأَكَ", "خَطَئِكَ", "خَطَؤُكَ"], "mef’ûl", "Hatanı bilmen ne güzel!", "u2"],
  ["يُعْجِبُنِي {مَا تَقُولُ} الحَقَّ.", ["مَا تَقُولُ", "مَا تَقُولَ", "أَنْ تَقُولُ"], "mâ + muzâri: merfû", "Şu an hakkı söylemen hoşuma gidiyor.", "u2"],
  ["{إِكْرَامًا} الفَقِيرَ!", ["إِكْرَامًا", "إِكْرَامٌ", "مُكْرِمًا"], "fiilin yerine geçen masdar", "Fakire ikram et!", "u3"],
  ["إِطْعَامًا {المَسَاكِينَ}!", ["المَسَاكِينَ", "المَسَاكِينِ", "المَسَاكِينُ"], "mef’ûl", "Yoksulları doyurun!", "u3"],
  ["تَقْدِيرًا {جُهُودَ} الطُّلَّابِ.", ["جُهُودَ", "جُهُودِ", "جُهُودُ"], "mef’ûl", "Öğrencilerin emeğini takdir edin.", "u3"],
  ["{سَقْيًا} الأَشْجَارَ!", ["سَقْيًا", "سَاقِيًا", "سَقْيٌ"], "masdar", "Ağaçları sulayın!", "u3"],
  ["فَتْحًا {البَابَ}!", ["البَابَ", "البَابِ", "البَابُ"], "mef’ûl", "Kapıyı açın!", "u3"],
  ["ضَرَبْتُ ضَرْبًا {الخَادِمَ}.", ["الخَادِمَ", "الخَادِمِ", "الخَادِمُ"], "ضَرَبْتُ’un mef’ûlü", "Hizmetçiyi iyice dövdüm.", "u4"],
  ["لِلسَّيَّارَةِ صَوْتٌ صَوْتَ {الرَّعْدِ}.", ["الرَّعْدِ", "الرَّعْدَ", "الرَّعْدُ"], "muzâfun ileyh", "Arabanın gök gürültüsü gibi sesi var.", "u4"],
  ["لَوْلَا خَوْفٌ {بَأْسَكَ} لَعَصَيْنَاكَ.", ["بَأْسَكَ", "بَأْسِكَ", "بَأْسُكَ"], "tenvinli masdarın mef’ûlü", "Gücünden korkmasaydık sana isyan ederdik.", "u4"],
  ["سَاءَنِي ضَرْبُكَ {الوَلَدَ}.", ["الوَلَدَ", "الوَلَدِ", "الوَلَدُ"], "mef’ûl", "Çocuğu dövmen beni üzdü.", "u4"],
  ["مُوَاجَهَةُ المَرْءِ {أَعْبَاءَهَا} وَحْدَهُ تُثْقِلُ كَاهِلَهُ.", ["أَعْبَاءَهَا", "أَعْبَائِهَا", "أَعْبَاؤُهَا"], "mef’ûl", "Yükleriyle tek başına yüzleşmek sırtını ağırlaştırır.", "u5"],
  ["مُعَاوَنَةُ النَّاسِ بَعْضِهِمْ {بَعْضًا}.", ["بَعْضًا", "بَعْضٍ", "بَعْضٌ"], "mef’ûl", "İnsanların birbirine yardımı.", "u5"],
  ["اكْتِسَابُ المَرْءِ {إِخْوَانًا}.", ["إِخْوَانًا", "إِخْوَانٍ", "إِخْوَانٌ"], "mef’ûl", "İnsanın kardeş edinmesi.", "u5"],
  ["﴿أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ {يَتِيمًا}﴾", ["يَتِيمًا", "يَتِيمٍ", "يَتِيمٌ"], "tenvinli masdarın mef’ûlü", "Ya da açlık gününde bir yetimi doyurmak.", "u5"],
  ["﴿ذِكْرُ رَحْمَتِ رَبِّكَ {عَبْدَهُ} زَكَرِيَّا﴾", ["عَبْدَهُ", "عَبْدِهِ", "عَبْدُهُ"], "رَحْمَتِ’in mef’ûlü", "Rabbinin kulu Zekeriyyâ’ya rahmetinin anılması.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["تُحِبُّ الوَطَنَ ← masdar (fâiline muzâf)", "حُبُّكَ الوَطَنَ", "حُبُّكَ الوَطَنِ", "حُبَّكَ الوَطَنُ", "Fâil muzâfun ileyh, mef’ûl mansûb.", "u1"],
  ["يُكْرِمُ الرَّجُلُ ضَيْفَهُ ← masdar", "إِكْرَامُ الرَّجُلِ ضَيْفَهُ", "إِكْرَامُ الرَّجُلُ ضَيْفَهُ", "إِكْرَامُ الرَّجُلِ ضَيْفِهِ", "Fâil mecrûr, mef’ûl mansûb.", "u1"],
  ["شَرِبَ الدَّوَاءَ ← masdar (mef’ûlüne muzâf)", "شُرْبُ الدَّوَاءِ", "شُرْبُ الدَّوَاءَ", "شُرْبًا الدَّوَاءِ", "Mef’ûl izafetle mecrûr.", "u1"],
  ["يَسُرُّنِي أَنْ تُنْقِذَ الغَرِيقَ ← sarîh masdar", "يَسُرُّنِي إِنْقَاذُكَ الغَرِيقَ", "يَسُرُّنِي إِنْقَاذُكَ الغَرِيقِ", "يَسُرُّنِي مُنْقِذُكَ الغَرِيقَ", "Masdar, ism-i fâil değil.", "u2"],
  ["أَنْ تَنْصُرَ المَظْلُومَ ← sarîh masdar", "نَصْرُكَ المَظْلُومَ", "نَصْرُكَ المَظْلُومُ", "نَاصِرُكَ المَظْلُومَ", "Mef’ûl mansûb.", "u2"],
  ["يَسُرُّنِي صُنْعُكَ المَعْرُوفَ ← şimdiki zaman", "يَسُرُّنِي مَا تَصْنَعُ المَعْرُوفَ", "يَسُرُّنِي أَنْ صَنَعْتَ المَعْرُوفَ", "يَسُرُّنِي مَا تَصْنَعَ المَعْرُوفَ", "Mâ + muzâri: şimdi (fiil merfû).", "u2"],
  ["أَكْرِمِ الفَقِيرَ ← fiilin yerine masdar", "إِكْرَامًا الفَقِيرَ", "إِكْرَامًا الفَقِيرِ", "إِكْرَامٌ الفَقِيرَ", "Masdar ve mef’ûl mansûb.", "u3"],
  ["أَطْفِئِ النَّارَ ← fiilin yerine masdar", "إِطْفَاءً النَّارَ", "إِطْفَاءً النَّارِ", "إِطْفَاءُ النَّارُ", "إِفْعَالٌ kalıbı.", "u3"],
  ["قَدِّرُوا جُهُودَ الطُّلَّابِ ← fiilin yerine masdar", "تَقْدِيرًا جُهُودَ الطُّلَّابِ", "تَقْدِيرًا جُهُودِ الطُّلَّابِ", "قَدْرًا جُهُودَ الطُّلَّابِ", "قَدَّرَ ← تَقْدِيرٌ.", "u3"],
  ["أَهْمَلَ عَمَلَهُ ← te’kîd masdarı ekle", "أَهْمَلَ إِهْمَالًا عَمَلَهُ", "أَهْمَلَ إِهْمَالًا عَمَلِهِ", "أَهْمَلَ إِهْمَالُ عَمَلِهِ", "عَمَلَهُ fiilin mef’ûlü kalır.", "u4"],
  ["زُرْتُ المَرِيضَ ← aded masdarı ekle", "زُرْتُ المَرِيضَ زِيَارَتَيْنِ", "زُرْتُ المَرِيضَ زِيَارَتَانِ", "زُرْتُ المَرِيضِ زِيَارَتَيْنِ", "Aded masdarı mansûb; amel etmez.", "u4"],
  ["لِلسَّيَّارَةِ صَوْتٌ ← teşbih: الرَّعْد", "لِلسَّيَّارَةِ صَوْتٌ صَوْتَ الرَّعْدِ", "لِلسَّيَّارَةِ صَوْتٌ صَوْتَ الرَّعْدَ", "لِلسَّيَّارَةِ صَوْتٌ صَوْتًا الرَّعْدَ", "Teşbih masdarı yalnız muzâftır.", "u4"],
  ["يَكْتَسِبُ المَرْءُ إِخْوَانًا ← masdar", "اكْتِسَابُ المَرْءِ إِخْوَانًا", "اكْتِسَابُ المَرْءِ إِخْوَانٍ", "اكْتِسَابُ المَرْءُ إِخْوَانًا", "Fâil mecrûr, mef’ûl mansûb.", "u5"],
  ["يُعَاوِنُ النَّاسُ بَعْضُهُمْ بَعْضًا ← masdar", "مُعَاوَنَةُ النَّاسِ بَعْضِهِمْ بَعْضًا", "مُعَاوَنَةُ النَّاسِ بَعْضُهُمْ بَعْضًا", "مُعَاوَنَةُ النَّاسِ بَعْضِهِمْ بَعْضٍ", "بَعْضِهِمْ bedel (mecrûr), بَعْضًا mef’ûl.", "u5"]
];
// Amel / sebep hız oyunu
var NOUN_LIST = UNITS[3].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = GS5;
// Fâiline mi mef’ûlüne mi hız oyunu
var MM_OPTS = FMZ;
var MM_LIST = UNITS[4].ex[0].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  se: { name: "Örnek ↔ durum", pairs: [["اجْتِهَادُكَ الدَّرْسَ", "muzâf, âmil"], ["دَرْءٌ مَفْسَدَةً", "tenvinli, âmil"], ["الحُبُّ وَطَنَنَا", "harf-i tarifli, âmil"], ["تَقْدِيرًا جُهُودَ الطُّلَّابِ", "fiilin yerine, âmil"], ["ضَرَبْتُ ضَرْبًا الخَادِمَ", "te’kîd: amel etmez"], ["زُرْتُ زِيَارَتَيْنِ المَرِيضَ", "aded: amel etmez"], ["صَوْتٌ صَوْتَ الرَّعْدِ", "teşbih: amel etmez"], ["بَعْدَ شُرْبِ الدَّوَاءِ", "mef’ûlüne muzâf"]] },
  ce: { name: "Masdar ↔ te’vîl", pairs: [["إِحْسَانُكَ (geçmiş)", "أَنْ أَحْسَنْتَ"], ["اجْتِهَادُكَ (gelecek)", "أَنْ تَجْتَهِدَ"], ["عَطَاؤُكَ (şimdi)", "مَا تُعْطِي"], ["إِنْقَاذُكَ الغَرِيقَ", "أَنْ تُنْقِذَ الغَرِيقَ"], ["نَصْرُكَ المَظْلُومَ", "أَنْ تَنْصُرَ المَظْلُومَ"], ["قَوْلُكَ الحَقَّ", "مَا تَقُولُ الحَقَّ"], ["لِفِعْلِكَ الخَيْرَ", "لِأَنْ فَعَلْتَ الخَيْرَ"], ["إِكْرَامًا الفَقِيرَ", "أَكْرِمِ الفَقِيرَ"]] },
  ay: { name: "Âyet / hadis ↔ Türkçe", pairs: [["وَلَوْلَا دَفْعُ اللهِ النَّاسَ", "Allah insanları savmasaydı"], ["وَلِلَّهِ عَلَى النَّاسِ حِجُّ البَيْتِ", "Beyti haccetmek Allah için borçtur"], ["أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ يَتِيمًا", "açlık gününde yetimi doyurmak"], ["ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُ", "Rabbinin kuluna rahmetinin anılması"], ["وَأَخْذِهِمُ الرِّبَا", "faizi almaları"], ["طَلَبُ العِلْمِ فَرِيضَةٌ", "ilim istemek farzdır"], ["تَرْكُهُ مَا لَا يَعْنِيهِ", "kendini ilgilendirmeyeni bırakması"], ["حُبُّكَ الوَطَنَ", "vatanı sevmen"]] }
};
var KARTLAR = [
  ["Masdar nasıl amel eder?", "Fiili gibi: mef’ûlü nasb eder; fâili çoğunlukla ona muzâftır."],
  ["Masdarın fâili nerede?", "Muzâfun ileyh: اجْتِهَادُكَ الدَّرْسَ (ـكَ fâil)."],
  ["Amel şartı?", "Yerine أَنْ / مَا + fiil konabilmeli ya da fiilinin yerine geçmiş olmalı."],
  ["أَنْ + mâzî?", "Geçmiş: أَنِ اجْتَهَدْتَ"],
  ["أَنْ + muzâri?", "Gelecek: أَنْ تَجْتَهِدَ"],
  ["مَا + muzâri?", "Şimdiki zaman: مَا تُعْطِي"],
  ["Masdar-ı müevvel nedir?", "أَنْ / مَا + fiilden oluşan, masdar yerine geçen yapı."],
  ["Âmil masdarın biçimleri?", "Muzâf (en çok) · tenvinli · harf-i tarifli (en az)."],
  ["Fiilin yerine geçen masdar?", "تَقْدِيرًا جُهُودَ الطُّلَّابِ = قَدِّرُوا…"],
  ["Hangi masdar amel etmez?", "Mef’ûl-i mutlak: te’kîd, aded, teşbih."],
  ["ضَرَبْتُ ضَرْبًا الخَادِمَ’de الخَادِمَ?", "ضَرَبْتُ’un mef’ûlü; ضَرْبًا’nın değil."],
  ["Mef’ûlüne muzâf masdar?", "بَعْدَ شُرْبِ الدَّوَاءِ · طَلَبُ العِلْمِ"]
];
