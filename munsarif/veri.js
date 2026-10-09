// ================= VERİ: Gayr-i Munsarif (المَمْنُوعُ مِنَ الصَّرْفِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "حَرْفُ الجَرِّ", tr: "Harf-i cer" }, nasb: { ar: "المَمْنُوعُ مِنَ الصَّرْفِ", tr: "Gayr-i munsarif" }, cerr: { ar: "المُضَافُ إِلَيْهِ", tr: "Muzâfun ileyh" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var G4 = [["a", "Alem", "العَلَمُ", "nasb"], ["v", "Vasıf (sıfat)", "الوَصْفُ", "cerr"], ["e", "Elif-i memdûde / maksûre", "المَخْتُومُ بِأَلِفِ التَّأْنِيثِ", "mi"], ["c", "Müntehe’l-cumû‘", "صِيغَةُ مُنْتَهَى الجُمُوعِ", "ref"]];
var G4X = G4.concat([["x", "Munsarif", "مَصْرُوفٌ", "x"]]);
var AL = [["m", "Müennes alem", "عَلَمٌ مُؤَنَّثٌ", "nasb"], ["a", "A’cemî alem", "عَلَمٌ أَعْجَمِيٌّ", "cerr"], ["n", "Elif-nûn ile biten", "مَخْتُومٌ بِأَلِفٍ وَنُونٍ", "mi"], ["r", "Mürekkeb-i mezcî", "مُرَكَّبٌ مَزْجِيٌّ", "ref"], ["f", "Fiil vezninde", "عَلَى وَزْنِ الفِعْلِ", "mz"], ["u", "Fu‘al vezninde", "عَلَى وَزْنِ فُعَلَ", "muz"]];
var MS2 = [["g", "Gayr-i munsarif", "مَمْنُوعٌ مِنَ الصَّرْفِ", "nasb"], ["s", "Munsarif", "مَصْرُوفٌ", "cerr"]];
var FK = [["f", "Fetha ile mecrûr", "مَجْرُورٌ بِالفَتْحَةِ", "nasb"], ["k", "Kesre ile mecrûr", "مَجْرُورٌ بِالكَسْرَةِ", "cerr"]];
var HR = [["r", "Merfû: tek damme", "مَرْفُوعٌ بِالضَّمَّةِ", "nasb"], ["n", "Mansûb: fetha", "مَنْصُوبٌ بِالفَتْحَةِ", "cerr"], ["f", "Mecrûr: fetha", "مَجْرُورٌ بِالفَتْحَةِ", "mi"], ["k", "Mecrûr: kesre", "مَجْرُورٌ بِالكَسْرَةِ", "ref"]];
var TUR_TR = { a: "Alem", v: "Vasıf", e: "Elif", c: "Cumû‘", x: "Munsarif", m: "Müennes", n: "Elif-nûn", r: "Mezcî", f: "Fetha", u: "Fu‘al", g: "Gayr-i munsarif", s: "Munsarif", k: "Kesre" };
// Makine: kelime × i’rab hâli → [cümle, Türkçe]
var GW = ["مَسَاجِدُ", "صَحْرَاءُ", "أَكْبَرُ", "حَمْرَاءُ", "زَيْنَبُ", "عَطْشَانُ"];
var GC = ["Merfû", "Mansûb", "Mecrûr: fetha", "Mecrûr: tarifli / muzâf"];
var GX = [
  [["فِي إِسْطَنْبُولَ:x / مَسَاجِدُ:nasb / كَثِيرَةٌ.:x", "İstanbul’da çok cami var."], ["زُرْتُ:x / مَسَاجِدَ:nasb / كَثِيرَةً.:x", "Birçok cami ziyaret ettim."], ["صَلَّيْتُ:x / فِي:mz / مَسَاجِدَ:nasb / كَثِيرَةٍ.:x", "Birçok camide namaz kıldım."], ["صَلَّيْتُ:x / فِي:mz / مَسَاجِدِ:nasb / إِسْطَنْبُولَ.:cerr", "İstanbul camilerinde namaz kıldım."]],
  [["هَذِهِ:x / صَحْرَاءُ:nasb / وَاسِعَةٌ.:x", "Bu geniş bir çöldür."], ["قَطَعْنَا:x / صَحْرَاءَ:nasb / وَاسِعَةً.:x", "Geniş bir çölü geçtik."], ["كُنْتُ:x / فِي:mz / صَحْرَاءَ:nasb / فِي لَيْلَةٍ ظَلْمَاءَ.:x", "Karanlık bir gecede bir çöldeydim."], ["قَضَيْنَا اللَّيْلَةَ:x / فِي:mz / الصَّحْرَاءِ:nasb / الوَاسِعَةِ.:x", "Geceyi geniş çölde geçirdik."]],
  [["أَخِي:x / أَكْبَرُ:nasb / مِنِّي.:x", "Kardeşim benden büyük."], ["مَا رَأَيْتُ رَجُلًا:x / أَكْبَرَ:nasb / مِنْهُ سِنًّا.:x", "Ondan daha yaşlı birini görmedim."], ["مَرَرْتُ:x / بِـ:mz / رَجُلٍ:x / أَكْبَرَ:nasb / مِنِّي.:x", "Benden büyük bir adamın yanından geçtim."], ["إِسْطَنْبُولُ:x / مِنْ:mz / أَكْبَرِ:nasb / المُدُنِ.:cerr", "İstanbul en büyük şehirlerdendir."]],
  [["هَذِهِ زَهْرَةٌ:x / حَمْرَاءُ.:nasb", "Bu kırmızı bir çiçek."], ["قَطَفْتُ زَهْرَةً:x / حَمْرَاءَ.:nasb", "Kırmızı bir çiçek kopardım."], ["جَلَسْتُ:x / فِي:mz / سَيَّارَةٍ:x / حَمْرَاءَ.:nasb", "Kırmızı bir arabada oturdum."], ["جَلَسْتُ:x / فِي:mz / السَّيَّارَةِ:x / الحَمْرَاءِ.:nasb", "Kırmızı arabada oturdum."]],
  [["أَصْبَحَتْ:x / زَيْنَبُ:nasb / كَاتِبَةً مَشْهُورَةً.:x", "Zeyneb ünlü bir yazar oldu."], ["رَأَيْتُ:x / زَيْنَبَ:nasb / فِي المَكْتَبَةِ.:x", "Zeyneb’i kütüphanede gördüm."], ["هَذَا الكِتَابُ:x / لِـ:mz / زَيْنَبَ.:nasb", "Bu kitap Zeyneb’in."], ["سَلَّمْتُ:x / عَلَى:mz / زَيْنَبِنَا.:nasb", "Bizim Zeyneb’e selam verdim."]],
  [["الوَلَدُ:x / عَطْشَانُ.:nasb", "Çocuk susamış."], ["رَجَعَ الوَلَدُ:x / عَطْشَانَ.:nasb", "Çocuk susamış hâlde döndü."], ["أَعْطَيْتُ المَاءَ:x / لِـ:mz / وَلَدٍ:x / عَطْشَانَ.:nasb", "Suyu susamış bir çocuğa verdim."], ["أَعْطَيْتُ المَاءَ:x / لِـ:mz / الوَلَدِ:x / العَطْشَانِ.:nasb", "Suyu susamış çocuğa verdim."]]
];
var GR = ["صِيغَةُ مُنْتَهَى الجُمُوعِ (مَفَاعِلُ)", "مَخْتُومٌ بِأَلِفِ التَّأْنِيثِ المَمْدُودَةِ", "وَصْفٌ عَلَى وَزْنِ أَفْعَلَ", "وَصْفٌ عَلَى وَزْنِ فَعْلَاءَ", "عَلَمٌ مُؤَنَّثٌ", "وَصْفٌ عَلَى وَزْنِ فَعْلَانَ"];
var GN = [
  "Merfû: tek damme alır, tenvin almaz.",
  "Mansûb: fetha alır, tenvin almaz.",
  "Mecrûr ama harf-i tarifsiz ve muzâf değil: kesre yerine fetha (tenvinsiz).",
  "Harf-i tarifli ya da muzâf olunca normal isim gibi kesre ile mecrûr olur."
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
// Kelime + sebep: [cümle, [kelime ×3], sebep anahtarı, Türkçe, açıklama]
var RS = {
  am: "عَلَمٌ مُؤَنَّثٌ", aa: "عَلَمٌ أَعْجَمِيٌّ", aam: "عَلَمٌ مُؤَنَّثٌ وَأَعْجَمِيٌّ", an: "عَلَمٌ مَخْتُومٌ بِأَلِفٍ وَنُونٍ زَائِدَتَيْنِ", ar: "عَلَمٌ مُرَكَّبٌ تَرْكِيبًا مَزْجِيًّا",
  af: "عَلَمٌ عَلَى وَزْنِ الفِعْلِ", au: "عَلَمٌ عَلَى وَزْنِ فُعَلَ", vn: "وَصْفٌ مَخْتُومٌ بِأَلِفٍ وَنُونٍ زَائِدَتَيْنِ", ve: "وَصْفٌ عَلَى وَزْنِ أَفْعَلَ", vf: "وَصْفٌ عَلَى وَزْنِ فَعْلَاءَ",
  vu: "وَصْفٌ عَلَى وَزْنِ فُعَلَ", vd: "وَصْفٌ عَدَدِيٌّ عَلَى وَزْنِ مَفْعَلَ أَوْ فُعَالَ", el: "مَخْتُومٌ بِأَلِفِ التَّأْنِيثِ المَمْدُودَةِ أَوِ المَقْصُورَةِ", mc: "صِيغَةُ مُنْتَهَى الجُمُوعِ"
};
var TRS = { am: ["am", "aa", "an"], aa: ["aa", "am", "af"], an: ["an", "vn", "am"], ar: ["ar", "aa", "af"], af: ["af", "aa", "ve"], au: ["au", "af", "vu"], vn: ["vn", "an", "ve"], ve: ["ve", "af", "vf"], vf: ["vf", "ve", "el"], vu: ["vu", "au", "vd"], vd: ["vd", "vu", "mc"], el: ["el", "vf", "mc"], mc: ["mc", "el", "vd"], aam: ["aam", "am", "aa"] };
function KS(x, i) { return CBP([x[0] + "<br>المَمْنُوعُ مِنَ الصَّرْفِ:", x[1], "<br>السَّبَبُ:", TRS[x[2]].map(function (k) { return RS[k]; })], i, x[3], x[4]); }
// Zabt + i’rab: [cümle, [biçim ×3], [i’rab ×3], Türkçe, açıklama]
function ZI(x, i) { return CBP([x[0] + "<br>الضَّبْطُ:", x[1], "<br>الإِعْرَابُ:", x[2]], i, x[3], x[4]); }

var METIN = "إِنَّ سُورِيَّةَ مِنَ المَنَاطِقِ القَدِيمَةِ الَّتِي عَاشَ فِيهَا بَنُو آدَمَ. وَمِنَ الأَدِلَّةِ عَلَى هَذِهِ الحَقِيقَةِ أَنِ اكْتُشِفَ فِي كَهْفٍ قُرْبَ إِدْلِبَ هَيْكَلٌ عَظْمِيٌّ يَعُودُ تَارِيخُهُ إِلَى الإِنْسَانِ الأَوَّلِ." +
  "<br>وَفِي سُورِيَّةَ مُدُنٌ أَثَرِيَّةٌ، مِنْهَا تَدْمُرُ وَمَارِي وَبُصْرَى، وَتَمْتَازُ سُورِيَّةُ كَذَلِكَ بِقِلَاعِهَا الكَثِيرَةِ المُنْتَشِرَةِ فِي أَنْحَاءٍ مُخْتَلِفَةٍ فِيهَا، فَعَلَى سَبِيلِ المِثَالِ قَلْعَةُ الحِصْنِ وَسَمْعَانَ وَقَلْعَةُ صَلَاحِ الدِّينِ وَقَلْعَةُ شَيْزَرَ وَقَلْعَتَا حَلَبَ وَدِمَشْقَ مِنْ هَذِهِ القِلَاعِ." +
  "<br>وَقَدِ اهْتَمَّتْ سُورِيَّةُ بِهَذِهِ الآثَارِ، وَأَقَامَتْ بِجِوَارِهَا فَنَادِقَ وَمَطَاعِمَ جَيِّدَةً حَتَّى يَشْعُرَ الزُّوَّارُ فِيهَا بِالرَّاحَةِ وَالمُتْعَةِ.";

var UNITS = [
// ---------------------------------------------------------------- 1 · TANIM VE ALEM
{
  id: "u1", no: 1, ar: "المَمْنُوعُ مِنَ الصَّرْفِ · العَلَمُ", tr: "Tanım ve Gayr-i Munsarif Alem", short: "Alem", col: "mz", legend: ["nasb", "mz"],
  goals: ["Sarfın burada tenvin demek olduğunu bilmek", "Gayr-i munsarifin kesre ve tenvin almadığını, kesre yerine fetha ile mecrûr olduğunu görmek", "Gayr-i munsarif alemin altı türünü tanımak: müennes, a’cemî, elif-nûnlu, mürekkeb-i mezcî, fiil vezninde, fu‘al vezninde"],
  examples: [
    { s: "تَدْرُسُ:x / خَدِيجَةُ:nasb / فِي:mz / دِمَشْقَ.:nasb", tr: "Hatice Dımaşk’ta okuyor. (müennes alemler)", pair: "بَنَى:x / إِبْرَاهِيمُ:nasb / مَعَ:x / إِسْمَاعِيلَ:nasb / الكَعْبَةَ.:x", pairTr: "İbrâhim, İsmâil ile Kâbe’yi inşa etti. (a’cemî alemler)" },
    { s: "عُثْمَانُ:nasb / بْنُ:x / عَفَّانَ:nasb / مِنْ كِبَارِ الصَّحَابَةِ.:x", tr: "Osman b. Affân büyük sahâbîlerdendir. (elif-nûn)", pair: "انْتَقَلْتُ:x / إِلَى:mz / حَضْرَمَوْتَ:nasb / لِمُدَّةِ سَنَةٍ.:x", pairTr: "Bir yıllığına Hadramut’a taşındım. (mürekkeb-i mezcî)" },
    { s: "يَعْمَلُ:x / أَحْمَدُ:nasb / مَعَ:x / عُمَرَ:nasb / فِي شَرِكَةٍ خَاصَّةٍ.:x", tr: "Ahmed, Ömer ile özel bir şirkette çalışıyor. (fiil vezni · fu‘al vezni)" }
  ],
  rules: [
    { tr: "<b>Sarf</b> burada <b>tenvin</b> demektir. <b>Gayr-i munsarif</b> (<span class=\"ar\">المَمْنُوعُ مِنَ الصَّرْفِ</span>) <b>tenvin ve kesre almayan</b> isimdir: merfû hâlde tek damme, mansûb hâlde fetha alır; mecrûr hâlde ise <b>kesre yerine fetha</b> alır.", ex: ["تَدْرُسُ خَدِيجَةُ فِي دِمَشْقَ ← فِي دِمَشْقَ (فِي دِمَشْقٍ değil)"] },
    { tr: "Gayr-i munsarif dört kısımdır: <b>alem</b>, <b>vasıf</b>, <b>elif-i te’nîs</b> ile biten isim ve <b>müntehe’l-cumû‘</b> kalıbı. Bu konuda alemi görüyoruz." },
    { tr: "<b>Alem</b> şu altı durumda gayr-i munsariftir:", ex: ["مُؤَنَّثٌ: خَدِيجَةُ · دِمَشْقُ · زَيْنَبُ", "أَعْجَمِيٌّ: إِبْرَاهِيمُ · إِسْمَاعِيلُ · يَعْقُوبُ", "ـانِ زَائِدَتَانِ: عُثْمَانُ · عَفَّانُ · عَدْنَانُ", "مُرَكَّبٌ مَزْجِيٌّ: حَضْرَمَوْتُ · بَعْلَبَكُّ", "وَزْنُ الفِعْلِ: أَحْمَدُ · يَزِيدُ", "فُعَلُ: عُمَرُ · زُحَلُ"] },
    { tr: "İnce noktalar: ortası sâkin üç harfli müennes alemde (<span class=\"ar\">هِنْد · مِصْر</span>) iki yol da caizdir; üç harfli a’cemî alem munsariftir (<span class=\"ar\">نُوحٌ · لُوطٌ</span>)." }
  ],
  kaide: ["١ ـ الصَّرْفُ هُنَا بِمَعْنَى التَّنْوِينِ. وَالاسْمُ المَمْنُوعُ مِنَ الصَّرْفِ (غَيْرُ مُنْصَرِفٍ) هُوَ الاسْمُ الَّذِي لَا يَقْبَلُ الكَسْرَةَ وَالتَّنْوِينَ؛ يُجَرُّ بِالفَتْحَةِ بَدَلَ الكَسْرَةِ، مِثْلُ كَلِمَةِ «دِمَشْقَ» فِي الجُمْلَةِ الآتِيَةِ: تَدْرُسُ خَدِيجَةُ فِي دِمَشْقَ.", "٢ ـ الاسْمُ المَمْنُوعُ مِنَ الصَّرْفِ أَرْبَعَةُ أَقْسَامٍ: أ ـ العَلَمُ: إِذَا كَانَ مُؤَنَّثًا، مِثْلُ: خَدِيجَةُ، دِمَشْقُ؛ أَوْ أَعْجَمِيًّا، مِثْلُ: إِبْرَاهِيمُ، إِسْمَاعِيلُ؛ أَوْ مَخْتُومًا بِأَلِفٍ وَنُونٍ زَائِدَتَيْنِ (ـانِ)، مِثْلُ: عُثْمَانُ، عَفَّانُ، عَدْنَانُ؛ أَوْ مُرَكَّبًا تَرْكِيبًا مَزْجِيًّا، مِثْلُ: حَضْرَمَوْتُ، بَعْلَبَكُّ؛ أَوْ عَلَى وَزْنِ الفِعْلِ، مِثْلُ: أَحْمَدُ، يَزِيدُ؛ أَوْ عَلَى وَزْنِ «فُعَلَ»، مِثْلُ: عُمَرُ، زُحَلُ."],
  ex: [
    { type: "pick", num: "١", ar: "ضَعْ خَطًّا تَحْتَ المَمْنُوعِ مِنَ الصَّرْفِ فِيمَا يَأْتِي", tr: "Cümledeki gayr-i munsarif kelimeyi (ya da kelimeleri) seç.", exHtml: "<span class=\"ar\">تَدْرُسُ <u>خَدِيجَةُ</u> فِي <u>دِمَشْقَ</u></span>", items: PL([
      ["وَصَلَ حُسَيْنٌ مِنْ مَكَّةَ صَبَاحَ اليَوْمِ.", "مَكَّةَ", "حُسَيْنٌ", "صَبَاحَ", "Hüseyin bu sabah Mekke’den geldi.", "Müennes alem; mecrûr ama kesre yerine fetha. حُسَيْنٌ tenvinli: munsarif."],
      ["هَذَا الوَلَدُ ابْنُ الأُسْتَاذِ يَعْقُوبَ.", "يَعْقُوبَ", "الوَلَدُ", "الأُسْتَاذِ", "Bu çocuk Ya’kûb hocanın oğlu.", "A’cemî alem; bedel olarak mecrûr, fetha ile."],
      ["سَلْمَانُ (رَضِيَ اللهُ عَنْهُ) كَانَ فَارِسِيَّ الأَصْلِ.", "سَلْمَانُ", "فَارِسِيَّ", "الأَصْلِ", "Selmân (r.a.) aslen Farslıydı.", "Elif-nûnla biten alem: tenvinsiz damme."],
      ["بُورْسَعِيدُ مَدِينَةٌ تَقَعُ فِي مِصْرَ.", "بُورْسَعِيدُ وَمِصْرَ", "مَدِينَةٌ", "مَدِينَةٌ وَمِصْرَ", "Port Said, Mısır’da bir şehirdir.", "İkisi de: بُورْسَعِيدُ mürekkeb-i mezcî; مِصْرُ müennes alem (فِي’den sonra fetha)."],
      ["كُنْتُ غَضْبَانَ عِنْدَمَا غَادَرْتُ الاجْتِمَاعَ.", "غَضْبَانَ", "الاجْتِمَاعَ", "عِنْدَمَا", "Toplantıdan çıkarken öfkeliydim.", "Vasıf, فَعْلَانُ vezninde: tenvinsiz fetha."],
      ["قَطَفَتِ البِنْتُ زَهْرَةً حَمْرَاءَ مِنَ الحَدِيقَةِ.", "حَمْرَاءَ", "زَهْرَةً", "الحَدِيقَةِ", "Kız bahçeden kırmızı bir çiçek kopardı.", "Vasıf, فَعْلَاءُ vezninde."],
      ["خَرَجَتِ الجُنُودُ مِنَ المُعَسْكَرِ مَثْنَى.", "مَثْنَى", "الجُنُودُ", "المُعَسْكَرِ", "Askerler kamptan ikişer ikişer çıktı.", "مَفْعَلُ vezninde sayı vasfı. الجُنُودُ çoğuldur ama müntehe’l-cumû‘ değildir."],
      ["مَا المَدِينَةُ الكُبْرَى فِي تُرْكِيَا؟", "الكُبْرَى وَتُرْكِيَا", "المَدِينَةُ", "المَدِينَةُ وَتُرْكِيَا", "Türkiye’nin en büyük şehri hangisi?", "الكُبْرَى elif-i maksûre ile biter; تُرْكِيَا müennes ve a’cemî alem. İkisinde de hareke görünmez."],
      ["أَحْمَدُ أَكْثَرُ مِنْ إِخْوَتِهِ عِلْمًا.", "أَحْمَدُ وَأَكْثَرُ", "إِخْوَتِهِ", "أَحْمَدُ وَعِلْمًا", "Ahmed kardeşlerinden daha bilgilidir.", "أَحْمَدُ fiil vezninde alem; أَكْثَرُ أَفْعَلُ vezninde vasıf."],
      ["افْتَتَحَتِ الحُكُومَةُ مَدَارِسَ كَثِيرَةً هَذَا العَامَ.", "مَدَارِسَ", "كَثِيرَةً", "الحُكُومَةُ", "Hükûmet bu yıl çok okul açtı.", "Müntehe’l-cumû‘: مَفَاعِلُ."],
      ["طُوبَى لِمَنْ عَاشَ مُسْلِمًا وَمَاتَ عَلَى الإِيمَانِ.", "طُوبَى", "مُسْلِمًا", "الإِيمَانِ", "Müslüman yaşayıp iman üzere ölene ne mutlu!", "Elif-i maksûre ile biter."],
      ["يَعْمَلُ فِي المُسْتَشْفَى أَطِبَّاءُ لَا بَأْسَ بِهِمْ.", "أَطِبَّاءُ", "المُسْتَشْفَى", "بَأْسَ", "Hastanede iyi doktorlar çalışıyor.", "أَطِبَّاءُ elif-i memdûde ile biter (kitabın sınıflaması). المُسْتَشْفَى’nin elifi te’nîs elifi değildir."]
    ])},
    { type: "classify", extra: true, opts: AL, ar: "لِمَاذَا مُنِعَ العَلَمُ مِنَ الصَّرْفِ؟", tr: "Koyu alem neden gayr-i munsarif?", items: CL([
      [HL("تَدْرُسُ خَدِيجَةُ فِي المَدْرَسَةِ", "خَدِيجَةُ"), "m", "Müennes alem (tâ ile)."],
      [HL("سَافَرْتُ إِلَى دِمَشْقَ", "دِمَشْقَ"), "m", "Şehir adı: müennes alem."],
      [HL("أَصْبَحَتْ زَيْنَبُ كَاتِبَةً", "زَيْنَبُ"), "m", "Tâsız müennes alem."],
      [HL("بَنَى إِبْرَاهِيمُ الكَعْبَةَ", "إِبْرَاهِيمُ"), "a", "A’cemî alem."],
      [HL("بَنَى إِبْرَاهِيمُ مَعَ إِسْمَاعِيلَ الكَعْبَةَ", "إِسْمَاعِيلَ"), "a", "A’cemî alem."],
      [HL("هَذَا ابْنُ الأُسْتَاذِ يَعْقُوبَ", "يَعْقُوبَ"), "a", "A’cemî alem."],
      [HL("عُثْمَانُ مِنْ كِبَارِ الصَّحَابَةِ", "عُثْمَانُ"), "n", "Zâid elif-nûn."],
      [HL("يَصِلُ النَّسَبُ إِلَى عَدْنَانَ", "عَدْنَانَ"), "n", "Zâid elif-nûn."],
      [HL("انْتَقَلْتُ إِلَى حَضْرَمَوْتَ", "حَضْرَمَوْتَ"), "r", "حَضْرَ + مَوْت: mürekkeb-i mezcî."],
      [HL("بَعْلَبَكُّ مَدِينَةٌ قَدِيمَةٌ", "بَعْلَبَكُّ"), "r", "بَعْل + بَكّ: mürekkeb-i mezcî."],
      [HL("يَعْمَلُ أَحْمَدُ فِي شَرِكَةٍ", "أَحْمَدُ"), "f", "أَفْعَلُ: muzâri vezni."],
      [HL("جَاءَ يَزِيدُ", "يَزِيدُ"), "f", "يَفْعِلُ: muzâri vezni."],
      [HL("يَعْمَلُ أَحْمَدُ مَعَ عُمَرَ", "عُمَرَ"), "u", "فُعَلُ vezni."],
      [HL("ظَهَرَ القَمَرُ وَزُحَلُ", "زُحَلُ"), "u", "فُعَلُ vezni."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · VASIF, ELİF, MÜNTEHE’L-CUMÛ‘
{
  id: "u2", no: 2, ar: "الوَصْفُ · أَلِفُ التَّأْنِيثِ · صِيغَةُ مُنْتَهَى الجُمُوعِ", tr: "Vasıf, Elif-i Te’nîs ve Müntehe’l-Cumû‘", short: "Vasıf", col: "nasb", legend: ["nasb", "mz"],
  goals: ["Gayr-i munsarif vasıfları tanımak: فَعْلَانُ، أَفْعَلُ، فَعْلَاءُ، فُعَلُ، مَفْعَلُ / فُعَالُ", "Elif-i memdûde ya da maksûre ile biten ismi tanımak", "Müntehe’l-cumû‘ kalıbını (مَفَاعِلُ، مَفَاعِيلُ) tanımak", "Gayr-i munsarif ismin sebebini söylemek"],
  examples: [
    { s: "رَجَعَ الرَّجُلُ:x / إِلَى:mz / البَيْتِ:x / تَعْبَانَ.:nasb", tr: "Adam eve yorgun döndü. (فَعْلَانُ)", pair: "أَخِي:x / أَكْبَرُ:nasb / مِنِّي بِسَنَتَيْنِ.:x", pairTr: "Kardeşim benden iki yaş büyük. (أَفْعَلُ)" },
    { s: "فِي الحَدِيقَةِ أَزْهَارٌ:x / بَيْضَاءُ:nasb / وَ:x / حَمْرَاءُ.:nasb", tr: "Bahçede beyaz ve kırmızı çiçekler var. (فَعْلَاءُ)", pair: "﴿فَعِدَّةٌ:x / مِنْ:mz / أَيَّامٍ:x / أُخَرَ﴾:nasb", pairTr: "…başka günlerde sayısınca (tutar). (فُعَلُ)" },
    { s: "جَنَيْتُ الأَزْهَارَ:x / مَثْنَى:nasb / وَ:x / ثُلَاثَ.:nasb", tr: "Çiçekleri ikişer ve üçer topladım. (sayı vasfı)", pair: "كُنْتُ:x / فِي:mz / صَحْرَاءَ:nasb / فِي:mz / لَيْلَةٍ:x / ظَلْمَاءَ.:nasb", pairTr: "Karanlık bir gecede bir çöldeydim. (elif-i memdûde)" },
    { s: "﴿إِنَّ فِي ذَلِكَ:x / لَذِكْرَى:nasb / لِمَنْ كَانَ لَهُ قَلْبٌ﴾:x", tr: "Şüphesiz bunda, kalbi olan için bir öğüt vardır. (Kâf 37 · elif-i maksûre)", pair: "فِي:mz / إِسْطَنْبُولَ:nasb / مَسَاجِدُ:nasb / كَثِيرَةٌ.:x", pairTr: "İstanbul’da çok cami var. (müntehe’l-cumû‘)" }
  ],
  rules: [
    { tr: "<b>Vasıf</b> (sıfat) şu kalıplarda gayr-i munsariftir:", ex: ["فَعْلَانُ: تَعْبَانُ · جَوْعَانُ · شَبْعَانُ", "أَفْعَلُ · فَعْلَاءُ: أَكْبَرُ · بَيْضَاءُ", "فُعَلُ: أُخَرُ", "مَفْعَلُ · فُعَالُ (sayı): مَثْنَى · ثُلَاثُ · رُبَاعُ"] },
    { tr: "Şart: <span class=\"ar\">فَعْلَانُ</span>’ın müennesi <span class=\"ar\">فَعْلَى</span> olmalı (<span class=\"ar\">عَطْشَانُ ← عَطْشَى</span>); müennesi <span class=\"ar\">فَعْلَانَةٌ</span> ise munsariftir (<span class=\"ar\">نَدْمَانٌ</span>). <span class=\"ar\">أَفْعَلُ</span>’ın müennesi de <span class=\"ar\">ـةٌ</span> ile olmamalı (<span class=\"ar\">أَرْمَلٌ ← أَرْمَلَةٌ</span> munsariftir)." },
    { tr: "<b>Elif-i te’nîs</b> ile biten isim: memdûde (<span class=\"ar\">ـاءُ</span>: <span class=\"ar\">صَحْرَاءُ · عُلَمَاءُ</span>) ya da maksûre (<span class=\"ar\">ـى</span>: <span class=\"ar\">ذِكْرَى · طُوبَى</span>). Dikkat: hemzesi aslî olan <span class=\"ar\">سَمَاءٌ · مَاءٌ · أَسْمَاءٌ</span> munsariftir." },
    { tr: "<b>Müntehe’l-cumû‘</b>: ortasında elif, elifin ardından iki ya da daha çok harf bulunan kırık çoğul:", ex: ["مَفَاعِلُ: مَسَاجِدُ · مَدَارِسُ · شَوَارِعُ", "مَفَاعِيلُ: مَفَاتِيحُ · مَصَابِيحُ · مَسَاكِينُ", "فَعَالِلُ · فَعَالَى: فَنَادِقُ · صَحَارَى"] }
  ],
  kaide: ["ب ـ الوَصْفُ (الصِّفَةُ): إِذَا كَانَ مَخْتُومًا بِأَلِفٍ وَنُونٍ زَائِدَتَيْنِ (ـانِ)، مِثْلُ: تَعْبَانُ، جَوْعَانُ، شَبْعَانُ؛ أَوْ عَلَى وَزْنِ «أَفْعَلَ» وَ«فَعْلَاءَ»، مِثْلُ: أَكْبَرُ، بَيْضَاءُ؛ أَوْ عَلَى وَزْنِ «فُعَلَ»، مِثْلُ: أُخَرُ؛ أَوْ عَلَى وَزْنِ «مَفْعَلَ» وَ«فُعَالَ» مِنَ الأَعْدَادِ، مِثْلُ: مَثْنَى، ثُلَاثُ.", "جـ ـ الاسْمُ إِذَا كَانَ مَخْتُومًا بِالأَلِفِ المَمْدُودَةِ (ـاءِ) أَوِ المَقْصُورَةِ (ـى)، مِثْلُ: صَحْرَاءُ، ذِكْرَى.", "د ـ الاسْمُ إِذَا كَانَ عَلَى صِيغَةِ مُنْتَهَى الجُمُوعِ، وَهِيَ الَّتِي فِي وَسَطِهَا أَلِفٌ بَعْدَهَا حَرْفَانِ أَوْ أَكْثَرُ (مَفَاعِلُ، مَفَاعِيلُ…)، مِثْلُ: مَسَاجِدُ، مَفَاتِيحُ."],
  ex: [
    { type: "combo", num: "٢", ar: "عَيِّنْ فِيمَا يَأْتِي المَمْنُوعَ مِنَ الصَّرْفِ وَبَيِّنْ سَبَبَ مَنْعِهِ", tr: "Gayr-i munsarif kelimeyi ve men sebebini seç.", exHtml: "<span class=\"ar\">أَصْبَحَتْ زَيْنَبُ كَاتِبَةً مَشْهُورَةً ← زَيْنَبُ: عَلَمٌ مُؤَنَّثٌ</span>", items: [
      ["اسْتُشْهِدَ حَمْزَةُ (رَضِيَ اللهُ عَنْهُ) فِي غَزْوَةِ أُحُدٍ.", ["حَمْزَةُ", "غَزْوَةِ", "أُحُدٍ"], "am", "Hamza (r.a.) Uhud savaşında şehit oldu.", "Tâ ile biten alem (erkek adı da olsa lafzen müennes)."],
      ["بَدَأَ الوَحْيُ فِي شَهْرِ رَمَضَانَ.", ["رَمَضَانَ", "شَهْرِ", "الوَحْيُ"], "an", "Vahiy Ramazan ayında başladı.", "Muzâfun ileyh: fetha ile mecrûr."],
      ["يُقَالُ إِنَّ إِدْرِيسَ ـ عَلَيْهِ السَّلَامُ ـ كَانَ أَوَّلَ خَيَّاطٍ.", ["إِدْرِيسَ", "خَيَّاطٍ", "السَّلَامُ"], "aa", "Denir ki İdrîs (a.s.) ilk terzi idi.", "A’cemî alem."],
      ["كَانَ عُثْمَانُ (رَضِيَ اللهُ عَنْهُ) ذَا حَيَاءٍ تَسْتَحْيِي مِنْهُ المَلَائِكَةُ.", ["عُثْمَانُ", "حَيَاءٍ", "ذَا"], "an", "Osman (r.a.) meleklerin bile kendisinden utandığı hayâ sahibiydi.", "حَيَاءٌ’ın hemzesi aslî: munsarif."],
      ["أَصْبَحَ أَشْعَبُ مَثَلًا فِي الطَّمَعِ.", ["أَشْعَبُ", "مَثَلًا", "الطَّمَعِ"], "af", "Eş’ab açgözlülükte darbımesel oldu.", "أَفْعَلُ: fiil vezni."],
      ["بَعْلَبَكُّ مَدِينَةٌ قَدِيمَةٌ فِي لُبْنَانَ.", ["بَعْلَبَكُّ", "مَدِينَةٌ", "قَدِيمَةٌ"], "ar", "Baalbek, Lübnan’da eski bir şehirdir.", "Mürekkeb-i mezcî. Not: لُبْنَانَ da gayr-i munsariftir (elif-nûnlu alem)."],
      ["إِطْعَامُ شَخْصٍ جَوْعَانَ مِنَ العَمَلِ الصَّالِحِ.", ["جَوْعَانَ", "شَخْصٍ", "إِطْعَامُ"], "vn", "Aç birini doyurmak salih ameldir.", "Na’t: fetha ile mecrûr."],
      ["نَشَأَ فِي التَّارِيخِ الإِسْلَامِيِّ عُلَمَاءُ عِظَامٌ.", ["عُلَمَاءُ", "عِظَامٌ", "التَّارِيخِ"], "el", "İslam tarihinde büyük âlimler yetişti.", "فُعَلَاءُ: elif-i memdûde."],
      ["سَاعَدْتُ فِي الطَّرِيقِ امْرَأَةً عَمْيَاءَ.", ["عَمْيَاءَ", "امْرَأَةً", "الطَّرِيقِ"], "vf", "Yolda âmâ bir kadına yardım ettim.", "فَعْلَاءُ vasıf."],
      ["أَطْفَأَ رَاشِدٌ المَصَابِيحَ قَبْلَ النَّوْمِ.", ["المَصَابِيحَ", "رَاشِدٌ", "النَّوْمِ"], "mc", "Râşid uyumadan önce lambaları söndürdü.", "مَفَاعِيلُ kalıbı (burada harf-i tarifli)."],
      ["دَخَلَ العُمَّالُ المَصْنَعَ ثُلَاثَ وَرُبَاعَ.", ["ثُلَاثَ وَرُبَاعَ", "العُمَّالُ", "المَصْنَعَ"], "vd", "İşçiler fabrikaya üçer dörder girdi.", "فُعَالُ: sayı vasfı."],
      ["رَأَيْتُ فِي الطَّرِيقِ مَسَاكِينَ يَتَسَوَّلُونَ.", ["مَسَاكِينَ", "الطَّرِيقِ", "يَتَسَوَّلُونَ"], "mc", "Yolda dilenen yoksullar gördüm.", "مَفَاعِيلُ."]
    ].map(KS) },
    { type: "combo", num: "٤", ar: "ضَعْ خَطًّا تَحْتَ الاسْمِ المَمْنُوعِ مِنَ الصَّرْفِ وَبَيِّنْ سَبَبَ مَنْعِهِ", tr: "Gayr-i munsarif ismi ve sebebini seç.", exHtml: "<span class=\"ar\">وَصَلَ رَئِيسُ الجَامِعَةِ مِنْ <u>لَنْدَنَ</u> أَمْسِ ← عَلَمٌ مُؤَنَّثٌ وَأَعْجَمِيٌّ</span>", items: [
      ["رَجَعَتْ سُعَادُ مِنَ العِرَاقِ.", ["سُعَادُ", "العِرَاقِ", "رَجَعَتْ"], "am", "Suâd Irak’tan döndü.", "Tâsız müennes alem."],
      ["طَلْحَةُ أَخُونَا الأَكْبَرُ فِي أُسْرَتِنَا.", ["طَلْحَةُ", "الأَكْبَرُ", "أُسْرَتِنَا"], "am", "Talha ailemizde en büyük kardeşimizdir.", "Tâlı alem. الأَكْبَرُ harf-i tarifli olduğundan burada etkisi görünmez."],
      ["لَا يُمْكِنُ أَنْ يَقِفَ الرَّجُلُ؛ لِأَنَّهُ تَعْبَانُ.", ["تَعْبَانُ", "الرَّجُلُ", "يَقِفَ"], "vn", "Adam ayakta duramıyor, çünkü yorgun.", "فَعْلَانُ: tenvinsiz damme."],
      ["تَوَلَّى عُمَرُ الخِلَافَةَ بَعْدَ أَبِي بَكْرٍ الصِّدِّيقِ.", ["عُمَرُ", "الخِلَافَةَ", "بَكْرٍ"], "au", "Ömer, Ebû Bekir es-Sıddîk’tan sonra halifeliği üstlendi.", "فُعَلُ vezninde alem."],
      ["يَصِلُ نَسَبُ الرَّسُولِ ﷺ إِلَى عَدْنَانَ.", ["عَدْنَانَ", "نَسَبُ", "الرَّسُولِ"], "an", "Resûlullah’ın soyu Adnân’a ulaşır.", "إِلَى’dan sonra fetha."],
      ["يُسْرِعُ العُمَّالُ إِلَى المَصْنَعِ ثُلَاثَ وَرُبَاعَ.", ["ثُلَاثَ وَرُبَاعَ", "العُمَّالُ", "المَصْنَعِ"], "vd", "İşçiler fabrikaya üçer dörder koşuyor.", "Sayı vasfı: hâl."],
      ["اشْتَرَى صَدِيقِي قَلَمًا أَسْوَدَ صَبَاحًا.", ["أَسْوَدَ", "قَلَمًا", "صَبَاحًا"], "ve", "Arkadaşım sabah siyah bir kalem aldı.", "Renk sıfatı أَفْعَلُ."],
      ["القَاهِرَةُ مِنْ أَقْدَمِ مُدُنِ العَالَمِ.", ["أَقْدَمِ", "القَاهِرَةُ", "مُدُنِ"], "ve", "Kahire dünyanın en eski şehirlerindendir.", "أَفْعَلُ; muzâf olduğu için burada kesre aldı."],
      ["إِسْطَنْبُولُ هِيَ المَدِينَةُ الكُبْرَى فِي تُرْكِيَا.", ["إِسْطَنْبُولُ", "المَدِينَةُ", "هِيَ"], "aam", "İstanbul Türkiye’nin en büyük şehridir.", "Şehir adı (müennes) ve a’cemî."],
      ["فِي المُدُنِ الكُبْرَى شَوَارِعُ وَاسِعَةٌ.", ["شَوَارِعُ", "المُدُنِ", "وَاسِعَةٌ"], "mc", "Büyük şehirlerde geniş caddeler var.", "مَفَاعِلُ: tenvinsiz damme."],
      ["يَجِبُ أَنْ تَقْرَأَ لِشُعَرَاءَ تَقْلِيدِيِّينَ.", ["شُعَرَاءَ", "تَقْلِيدِيِّينَ", "تَقْرَأَ"], "el", "Klasik şairleri okumalısın.", "Elif-i memdûde; لِـ’den sonra fetha."],
      ["تُوجَدُ فِي الجَزِيرَةِ العَرَبِيَّةِ صَحَارَى كَبِيرَةٌ.", ["صَحَارَى", "الجَزِيرَةِ", "كَبِيرَةٌ"], "mc", "Arap yarımadasında büyük çöller var.", "فَعَالَى: müntehe’l-cumû‘."]
    ].map(KS) },
    { type: "classify", extra: true, opts: G4, ar: "مِنْ أَيِّ قِسْمٍ هَذَا المَمْنُوعُ مِنَ الصَّرْفِ؟", tr: "Koyu kelime gayr-i munsarifin hangi kısmından?", items: CL([
      [HL("تَدْرُسُ خَدِيجَةُ", "خَدِيجَةُ"), "a", "Müennes alem."],
      [HL("بَنَى إِبْرَاهِيمُ الكَعْبَةَ", "إِبْرَاهِيمُ"), "a", "A’cemî alem."],
      [HL("انْتَقَلْتُ إِلَى حَضْرَمَوْتَ", "حَضْرَمَوْتَ"), "a", "Mürekkeb alem."],
      [HL("يَعْمَلُ أَحْمَدُ", "أَحْمَدُ"), "a", "Fiil vezninde alem."],
      [HL("جَاءَ عُثْمَانُ", "عُثْمَانُ"), "a", "Elif-nûnlu alem."],
      [HL("رَجَعَ الرَّجُلُ تَعْبَانَ", "تَعْبَانَ"), "v", "فَعْلَانُ vasıf."],
      [HL("أَخِي أَكْبَرُ مِنِّي", "أَكْبَرُ"), "v", "أَفْعَلُ vasıf."],
      [HL("قَلَمٌ أَسْوَدُ", "أَسْوَدُ"), "v", "أَفْعَلُ vasıf."],
      [HL("مِنْ أَيَّامٍ أُخَرَ", "أُخَرَ"), "v", "فُعَلُ vasıf."],
      [HL("دَخَلُوا ثُلَاثَ وَرُبَاعَ", "ثُلَاثَ"), "v", "Sayı vasfı."],
      [HL("كُنْتُ فِي صَحْرَاءَ", "صَحْرَاءَ"), "e", "Elif-i memdûde."],
      [HL("إِنَّ فِي ذَلِكَ لَذِكْرَى", "ذِكْرَى"), "e", "Elif-i maksûre."],
      [HL("طُوبَى لِمَنْ عَاشَ مُسْلِمًا", "طُوبَى"), "e", "Elif-i maksûre."],
      [HL("نَشَأَ عُلَمَاءُ عِظَامٌ", "عُلَمَاءُ"), "e", "Elif-i memdûde."],
      [HL("لِشُعَرَاءَ تَقْلِيدِيِّينَ", "شُعَرَاءَ"), "e", "Elif-i memdûde."],
      [HL("فِي إِسْطَنْبُولَ مَسَاجِدُ كَثِيرَةٌ", "مَسَاجِدُ"), "c", "مَفَاعِلُ."],
      [HL("أَيْنَ مَفَاتِيحُ البَيْتِ؟", "مَفَاتِيحُ"), "c", "مَفَاعِيلُ."],
      [HL("افْتَتَحَتِ الحُكُومَةُ مَدَارِسَ", "مَدَارِسَ"), "c", "مَفَاعِلُ."],
      [HL("فِي المُدُنِ شَوَارِعُ وَاسِعَةٌ", "شَوَارِعُ"), "c", "فَوَاعِلُ."],
      [HL("رَأَيْتُ مَسَاكِينَ", "مَسَاكِينَ"), "c", "مَفَاعِيلُ."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · SEÇME VE YERLEŞTİRME
{
  id: "u3", no: 3, ar: "اخْتِيَارُ المَمْنُوعِ مِنَ الصَّرْفِ وَاسْتِعْمَالُهُ", tr: "Doğru İsmi Seçmek ve Kullanmak", short: "Seçme", col: "cerr", legend: ["nasb", "mz"],
  goals: ["Seçenekler arasından gayr-i munsarif ismi bulmak", "Bir kelimenin yerine anlamca uygun gayr-i munsarif bir isim koymak", "Gayr-i munsarifin doğru harekesini seçmek", "Munsarif ile gayr-i munsarifi karıştırmamak (سَمَاءٌ · أَسْمَاءٌ · نُوحٌ)"],
  examples: [
    { s: "تُوجَدُ:x / مَصَانِعُ:nasb / كَثِيرَةٌ فِي مِنْطَقَتِنَا.:x", tr: "Bölgemizde çok fabrika var. (مَكْتَبَاتٌ ve بُيُوتٌ munsariftir)", pair: "سَيِّدُنَا:x / إِسْمَاعِيلُ:nasb / مِنَ الأَنْبِيَاءِ المَذْكُورِينَ فِي القُرْآنِ.:x", pairTr: "Efendimiz İsmâil Kur’an’da anılan peygamberlerdendir. (صَالِحٌ yerine)" },
    { s: "سَافَرَ صَدِيقِي:x / إِلَى:mz / بَيْرُوتَ:nasb / الأُسْبُوعَ المَاضِيَ.:x", tr: "Arkadaşım geçen hafta Beyrut’a gitti. (بَيْرُوتِ değil)", pair: "تَمَتَّعْتُ:x / بِـ:mz / مَنَاظِرَ:nasb / طَبِيعِيَّةٍ.:x", pairTr: "Doğal manzaraların tadını çıkardım." }
  ],
  rules: [
    { tr: "Seçerken <b>tenvine bak</b>: tenvinli kelime (<span class=\"ar\">بُيُوتٌ · حَزِينٌ · قَدِيمَةٍ</span>) munsariftir. Gayr-i munsarif kelime tenvinsiz yazılır." },
    { tr: "<b>Cem-i müennes sâlim</b> (<span class=\"ar\">مَكْتَبَاتٌ · عِمَارَاتٌ</span>) ve <b>فُعُولٌ</b> çoğulları (<span class=\"ar\">بُيُوتٌ · نُجُومٌ</span>) munsariftir; müntehe’l-cumû‘ değildir." },
    { tr: "Bir ismi gayr-i munsarifle değiştirince cümle yapısı korunur, yalnız hareke değişir:", ex: ["عِمَارَاتٍ كَبِيرَةً ← مَسَاجِدَ كَبِيرَةً", "رَخِيصًا ← أَرْخَصَ مِنْ أَمْسِ", "بِبِشَارَةٍ ← بِبُشْرَى"] },
    { tr: "Hemzesi aslî olan <span class=\"ar\">ـاءٌ</span> (<span class=\"ar\">سَمَاءٌ · مَاءٌ · أَسْمَاءٌ · حَيَاءٌ · عَطَاءٌ</span>) ile elifi te’nîs elifi olmayan <span class=\"ar\">ـى</span> (<span class=\"ar\">فَتًى · مُسْتَشْفًى</span>) munsariftir." }
  ],
  kaide: ["اخْتَرِ المَمْنُوعَ مِنَ الصَّرْفِ المُنَاسِبَ مِمَّا بَيْنَ القَوْسَيْنِ. اسْتَبْدِلْ بِمَا تَحْتَهُ خَطٌّ اسْمًا مَمْنُوعًا مِنَ الصَّرْفِ. اخْتَرِ الاسْمَ المُنَاسِبَ (بِالضَّبْطِ الصَّحِيحِ) مِمَّا بَيْنَ القَوْسَيْنِ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "اخْتَرِ المَمْنُوعَ مِنَ الصَّرْفِ المُنَاسِبَ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa uygun gayr-i munsarif ismi seç.", exHtml: "<span class=\"ar\">تُوجَدُ ___ كَثِيرَةٌ فِي مِنْطَقَتِنَا (مَكْتَبَاتٌ – مَصَانِعُ – بُيُوتٌ) ← مَصَانِعُ</span>", items: PL([
      ["___ تَعْمَلُ فِي الكُلِّيَّةِ أُسْتَاذَةً.", "سَعِيدَةُ", "خَالَتِي", "الأُمُّ", "Saîde fakültede hoca olarak çalışıyor.", "Müennes alem."],
      ["يَجْتَمِعُ رُؤَسَاءُ الوُزَرَاءِ فِي ___.", "إِسْطَنْبُولَ", "القَاهِرَةِ", "الكُوَيْتِ", "Başbakanlar İstanbul’da toplanıyor.", "القَاهِرَة ve الكُوَيْت harf-i tarifli olduğundan kesre alır."],
      ["بَقِيَ ___ فِي السِّجْنِ بِضْعَ سِنِينَ.", "يُوسُفُ", "عَلِيٌّ", "حَسَنٌ", "Yûsuf zindanda birkaç yıl kaldı.", "A’cemî alem."],
      ["أُحِبُّ أَنْ أَزُورَ مَدِينَةَ ___.", "حَضْرَمَوْتَ", "المَدِينَةِ", "الرِّبَاطِ", "Hadramut şehrini ziyaret etmek isterim.", "Mürekkeb-i mezcî: fetha ile mecrûr."],
      ["___ مِنَ العُلَمَاءِ الكِرَامِ بَيْنَ التَّابِعِينَ.", "سُفْيَانُ بْنُ عُيَيْنَةَ", "مَالِكُ بْنُ أَنَسٍ", "عَطَاءُ بْنُ أَبِي رَبَاحٍ", "Süfyân b. Uyeyne, tâbiîn arasında değerli âlimlerdendir.", "سُفْيَانُ elif-nûnlu alem. (Kitaptaki مُحَمَّدُ بْنُ سِيرِينَ de سِيرِينَ yüzünden gayr-i munsarif içerdiği için değiştirildi.)"],
      ["دَخَلَ أَبِي البَيْتَ وَهُوَ ___.", "تَعْبَانُ", "حَزِينٌ", "مُبْتَسِمٌ", "Babam eve yorgun girdi.", "فَعْلَانُ vasıf."],
      ["رَأَيْتُ صَدِيقِي فِي سَيَّارَةٍ ___.", "حَمْرَاءَ", "قَدِيمَةٍ", "غَالِيَةٍ", "Arkadaşımı kırmızı bir arabada gördüm.", "فَعْلَاءُ: fetha ile mecrûr na’t."],
      ["جَلَسَ الرُّكَّابُ فِي الطَّائِرَةِ ___.", "خُمَاسَ", "مُتَفَرِّقِينَ", "جَمِيعًا", "Yolcular uçakta beşer beşer oturdu.", "فُعَالُ: sayı vasfı."],
      ["أَقَامَ الحِزْبُ الاحْتِجَاجَاتِ فِي ___ كَبِيرَةٍ.", "مَيَادِينَ", "العَاصِمَةِ", "المَرْكَزِ", "Parti büyük meydanlarda protestolar düzenledi.", "مَفَاعِيلُ: fetha ile mecrûr."],
      ["ظَهَرَ القَمَرُ وَ___ لَامِعَيْنِ.", "زُحَلُ", "النُّجُومُ", "المُشْتَرِي", "Ay ve Satürn parlayarak göründü.", "فُعَلُ vezninde alem."],
      ["خَدِيجَةُ ___ مِنْ سَلْمَى.", "أَكْبَرُ", "كُبْرَى", "كَبِيرَةٌ", "Hatice Selmâ’dan büyüktür.", "مِنْ ile karşılaştırmada أَفْعَلُ gelir; كُبْرَى da gayr-i munsariftir ama burada yanlıştır."],
      ["لَا فَضْلَ بَيْنَ النَّاسِ إِلَّا بِـ___.", "التَّقْوَى", "الإِيمَانِ", "الخَشْيَةِ", "İnsanlar arasında üstünlük ancak takvâ iledir.", "Elif-i maksûre ile biter; harf-i tarifli olduğundan takdiren kesre ile mecrûr."]
    ])},
    { type: "pick", num: "٥", ar: "اسْتَبْدِلْ بِمَا تَحْتَهُ خَطٌّ اسْمًا مَمْنُوعًا مِنَ الصَّرْفِ", tr: "Koyu kelimenin yerine gelecek doğru gayr-i munsarif biçimi seç.", exHtml: "<span class=\"ar\">سَيِّدُنَا <u>صَالِحٌ</u> مِنَ الأَنْبِيَاءِ ← سَيِّدُنَا <u>إِسْمَاعِيلُ</u> مِنَ الأَنْبِيَاءِ</span>", items: PL([
      [HL("سَلِيمٌ طَيَّارٌ فِي الخُطُوطِ التُّرْكِيَّةِ.", "سَلِيمٌ"), "أَحْمَدُ", "أَحْمَدٌ", "سَعِيدٌ", "Ahmed Türk Hava Yolları’nda pilot.", "Fiil vezninde alem: tenvinsiz."],
      [HL("دَخَلَتِ المَرْأَةُ المَطْعَمَ وَهِيَ جَائِعَةٌ.", "جَائِعَةٌ"), "جَوْعَى", "جَوْعَانُ", "جَوْعَانَةٌ", "Kadın restorana aç girdi.", "جَوْعَانُ’ın müennesi جَوْعَى: elif-i maksûre."],
      [HL("عَلِيٌّ جَالِسٌ فِي غُرْفَتِهِ يُشَاهِدُ التِّلْفَازَ.", "عَلِيٌّ"), "عُثْمَانُ", "عُثْمَانٌ", "حَسَنٌ", "Osman odasında oturmuş televizyon izliyor.", "Elif-nûnlu alem."],
      [HL("لَبِسَتْ لَيْلَى ثَوْبًا جَمِيلًا لِلْحَفْلِ.", "جَمِيلًا"), "أَبْيَضَ", "أَبْيَضًا", "جَدِيدًا", "Leylâ eğlence için beyaz bir elbise giydi.", "أَفْعَلُ: tenvinsiz fetha."],
      [HL("شَاهَدْتُ فِي بَارِيسَ عِمَارَاتٍ كَبِيرَةً.", "عِمَارَاتٍ"), "مَسَاجِدَ", "مَسَاجِدًا", "بُيُوتًا", "Paris’te büyük camiler gördüm.", "Müntehe’l-cumû‘: mansûb, tenvinsiz."],
      [HL("وَجَدْتُ السَّمَكَ رَخِيصًا فِي السُّوقِ اليَوْمَ.", "رَخِيصًا"), "أَرْخَصَ مِنْ أَمْسِ", "أَرْخَصًا مِنْ أَمْسِ", "رَخِيصًا جِدًّا", "Bugün pazarda balığı dünden ucuz buldum.", "أَفْعَلُ."],
      [HL("تَسَلَّمَ الطُّلَّابُ شَهَادَاتِهِمْ وَهُمْ مَسْرُورُونَ.", "شَهَادَاتِهِمْ"), "جَوَائِزَهُمْ", "جَوَائِزِهِمْ", "جَوَائِزًا", "Öğrenciler ödüllerini sevinçle aldı.", "Mef’ûl: fetha. Muzâf olduğu için zaten tenvin almaz."],
      [HL("أَبُو بَكْرٍ مِنَ الخُلَفَاءِ الرَّاشِدِينَ.", "أَبُو بَكْرٍ"), "عُمَرُ", "عُمَرٌ", "عَلِيٌّ", "Ömer, Hulefâ-i Râşidîn’dendir.", "فُعَلُ vezninde alem."],
      [HL("جَاءَ أَخِي هَذَا المَسَاءَ بِبِشَارَةٍ سَارَّةٍ.", "بِبِشَارَةٍ"), "بِبُشْرَى", "بِبُشْرًى", "بِخَبَرٍ", "Kardeşim bu akşam sevindirici bir müjdeyle geldi.", "Elif-i maksûre: tenvin almaz."],
      [HL("فِي مَدِينَتِنَا مُحْتَاجُونَ كَثِيرُونَ.", "مُحْتَاجُونَ"), "فُقَرَاءُ", "فُقَرَاءٌ", "مُحْتَاجٌ", "Şehrimizde çok fakir var.", "فُعَلَاءُ: elif-i memdûde."],
      [HL("أَسْعَارُ البُيُوتِ ارْتَفَعَتْ هَذَا الشَّهْرَ.", "البُيُوتِ"), "المَسَاكِنِ", "المَسَاكِنَ", "مَسَاكِنَ", "Bu ay konut fiyatları yükseldi.", "Harf-i tarifli müntehe’l-cumû‘: kesre ile mecrûr."]
    ])},
    { type: "pick", fill: true, num: "٦", ar: "اخْتَرِ الاسْمَ المُنَاسِبَ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa doğru harekeli biçimi seç.", items: PL([
      ["سَافَرَ صَدِيقِي إِلَى ___ الأُسْبُوعَ المَاضِيَ.", "بَيْرُوتَ", "بَيْرُوتِ", "بَيْرُوتُ", "Arkadaşım geçen hafta Beyrut’a gitti.", "Şehir adı: fetha ile mecrûr."],
      ["هَذَا الكِتَابُ لِـ___.", "زَيْنَبَ", "زَيْنَبِ", "زَيْنَبُ", "Bu kitap Zeyneb’in.", "Müennes alem: fetha ile mecrûr."],
      ["كَانَ ___ مِنَ الخُلَفَاءِ الأُمَوِيِّينَ.", "مَرْوَانُ", "مَرْوَانَ", "مَرْوَانِ", "Mervân Emevî halifelerindendi.", "كَانَ’nin ismi: merfû."],
      ["رَأَيْتُ ___ يَمْشِي فِي الطَّرِيقِ مَعَ وَلَدِهِ.", "حَمْزَةَ", "حَمْزَةُ", "حَمْزَةِ", "Hamza’yı yolda oğluyla yürürken gördüm.", "Mef’ûl: fetha."],
      ["هَلْ شَاهَدْتَ فِي حَيَاتِكَ طَائِرَةً ___؟", "حَمْرَاءَ", "حَمْرَاءُ", "حَمْرَاءِ", "Hayatında kırmızı bir uçak gördün mü?", "Mansûb isme na’t: fetha."],
      ["زُرْتُ التَّكِيَّةَ السُّلَيْمَانِيَّةَ فِي ___.", "دِمَشْقَ", "دِمَشْقِ", "دِمَشْقُ", "Dımaşk’ta Süleymaniye Tekkesi’ni ziyaret ettim.", "فِي’den sonra fetha."],
      ["هَذَا الرَّجُلُ زَوْجُ ___.", "خَدِيجَةَ", "خَدِيجَةِ", "خَدِيجَةُ", "Bu adam Hatice’nin kocası.", "Muzâfun ileyh: fetha ile mecrûr."],
      ["تَمَتَّعْتُ بِـ___ طَبِيعِيَّةٍ لِمَضِيقِ إِسْطَنْبُولَ.", "مَنَاظِرَ", "مَنَاظِرِ", "مَنَاظِرُ", "İstanbul Boğazı’nın doğal manzaralarının tadını çıkardım.", "مَفَاعِلُ: fetha ile mecrûr."]
    ])},
    { type: "classify", extra: true, opts: MS2, ar: "مَمْنُوعٌ مِنَ الصَّرْفِ أَمْ مَصْرُوفٌ؟", tr: "Tuzaklara dikkat: kelime gayr-i munsarif mi, munsarif mi?", items: CL([
      ["صَحْرَاءُ", "g", "Elif-i te’nîs memdûde."],
      ["سَمَاءٌ", "s", "Hemze aslî (سمو): munsarif."],
      ["أَصْدِقَاءُ", "g", "أَفْعِلَاءُ: elif-i memdûde."],
      ["أَسْمَاءٌ", "s", "أَفْعَالٌ çoğulu; hemze aslî."],
      ["عُلَمَاءُ", "g", "فُعَلَاءُ."],
      ["مَاءٌ", "s", "Hemze aslî."],
      ["ذِكْرَى", "g", "Elif-i maksûre (te’nîs)."],
      ["فَتًى", "s", "Elif aslî: tenvin alır."],
      ["عُثْمَانُ", "g", "Elif-nûnlu alem."],
      ["سُلْطَانٌ", "s", "Alem ya da vasıf değil."],
      ["إِبْرَاهِيمُ", "g", "A’cemî alem."],
      ["نُوحٌ", "s", "Üç harfli a’cemî alem munsariftir."],
      ["أَحْمَرُ", "g", "أَفْعَلُ vasıf."],
      ["بُيُوتٌ", "s", "فُعُولٌ: müntehe’l-cumû‘ değil."],
      ["مَصَابِيحُ", "g", "مَفَاعِيلُ."],
      ["مَكْتَبَاتٌ", "s", "Cem-i müennes sâlim."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · CER HÂLİ
{
  id: "u4", no: 4, ar: "جَرُّ المَمْنُوعِ مِنَ الصَّرْفِ", tr: "Gayr-i Munsarifin Cer Hâli", short: "Cer", col: "mi", legend: ["nasb", "mz", "cerr"],
  goals: ["Gayr-i munsarifin kesre yerine fetha ile mecrûr olduğunu uygulamak", "Harf-i tarifli ya da muzâf olunca kesre ile mecrûr olduğunu bilmek", "Kelimeyi harekeleyip i’rabını söylemek", "Cümleyi fethalı cerden kesreli cere, kesreli cerden fethalı cere çevirmek"],
  examples: [
    { s: "تَنَاقَشْتُ:x / مَعَ:x / أَطِبَّاءَ:nasb / كَثِيرِينَ.:x", tr: "Birçok doktorla tartıştım. (fetha)", pair: "تَنَاقَشْتُ:x / مَعَ:x / الأَطِبَّاءِ:nasb / الكَثِيرِينَ.:x", pairTr: "Doktorların çoğuyla tartıştım. (harf-i tarifli: kesre)" },
    { s: "يَعْمَلُ النَّاسُ:x / فِي:mz / مَصَانِعَ:nasb / كَبِيرَةٍ.:x", tr: "İnsanlar büyük fabrikalarda çalışıyor. (fetha)", pair: "يَعْمَلُ النَّاسُ:x / فِي:mz / مَصَانِعِ:nasb / الدَّوْلَةِ.:cerr", pairTr: "İnsanlar devlet fabrikalarında çalışıyor. (muzâf: kesre)" },
    { s: "يَخْرُجُ الطُّلَّابُ:x / مِنَ:mz / المَدَارِسِ:nasb / ظُهْرًا.:x", tr: "Öğrenciler öğlen okullardan çıkar.", pair: "القَاهِرَةُ:x / مِنْ:mz / أَكْثَرِ:nasb / المُدُنِ:cerr / سُكَّانًا.:x", pairTr: "Kahire nüfusu en kalabalık şehirlerdendir." }
  ],
  rules: [
    { tr: "Gayr-i munsarif mecrûr olunca <b>kesre yerine fetha</b> alır: <span class=\"ar\">فِي مَدَارِسَ · لِزَيْنَبَ · إِلَى عَدْنَانَ</span>. Mecrûriyet harf-i cerden, izafetten ya da tâbi olmaktan (na’t, bedel) gelebilir." },
    { tr: "İki durumda normal <b>kesre</b> ile mecrûr olur:", ex: ["مُعَرَّفٌ بِـ«الْـ»: مِنَ المَدَارِسِ · فِي الصَّحْرَاءِ", "مُضَافٌ: مِنْ أَكْثَرِ المُدُنِ · فِي مَسَاجِدِ إِسْطَنْبُولَ"] },
    { tr: "Merfû ve mansûb hâlde değişiklik yalnızca tenvindir: <span class=\"ar\">مَسَاجِدُ كَثِيرَةٌ · زُرْتُ مَسَاجِدَ</span>. Elif-i maksûrede (<span class=\"ar\">ذِكْرَى · بُشْرَى</span>) hareke hiç görünmez." },
    { tr: "Çevirirken sıfatı da uydur: <span class=\"ar\">فِي شَوَارِعَ جَمِيلَةٍ ← فِي الشَّوَارِعِ الجَمِيلَةِ</span>; tersine <span class=\"ar\">بِالمَسَاجِدِ الكَثِيرَةِ ← بِمَسَاجِدَ كَثِيرَةٍ</span>." }
  ],
  kaide: ["٣ ـ المَمْنُوعُ مِنَ الصَّرْفِ يُجَرُّ بِالكَسْرَةِ: أ ـ إِذَا كَانَ مُعَرَّفًا بِـ«الْـ»، مِثْلُ: يَخْرُجُ الطُّلَّابُ مِنَ المَدَارِسِ ظُهْرًا. ب ـ إِذَا كَانَ مُضَافًا، مِثْلُ: القَاهِرَةُ مِنْ أَكْثَرِ المُدُنِ سُكَّانًا."],
  ex: [
    { type: "combo", num: "٧", ar: "اضْبِطْ بِالشَّكْلِ مَا تَحْتَهُ خَطٌّ وَبَيِّنْ سَبَبَ الضَّبْطِ", tr: "Boşluktaki kelimenin doğru harekesini ve i’rabını seç.", exHtml: "<span class=\"ar\">أَمَرَ عُثْمَانُ بْنُ عَفَّانَ بِاسْتِنْسَاخِ المُصْحَفِ ← عُثْمَانُ: فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ · عَفَّانَ: مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالفَتْحَةِ</span>", items: [
      ["سَافَرَ طَلْحَةُ إِلَى ___ لِلدِّرَاسَةِ.", ["لَنْدَنَ", "لَنْدَنِ", "لَنْدَنٍ"], ["اسْمٌ مَجْرُورٌ بِإِلَى، وَعَلَامَةُ جَرِّهِ الفَتْحَةُ؛ لِأَنَّهُ عَلَمٌ مُؤَنَّثٌ أَعْجَمِيٌّ", "اسْمٌ مَجْرُورٌ بِإِلَى، وَعَلَامَةُ جَرِّهِ الكَسْرَةُ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ"], "Talha okumak için Londra’ya gitti.", "Gayr-i munsarif alem: fetha."],
      ["كَثُرَتِ السَّيَّارَاتُ فِي ___ إِسْطَنْبُولَ.", ["شَوَارِعِ", "شَوَارِعَ", "شَوَارِعٍ"], ["اسْمٌ مَجْرُورٌ بِفِي، وَعَلَامَةُ جَرِّهِ الكَسْرَةُ؛ لِأَنَّهُ مُضَافٌ", "اسْمٌ مَجْرُورٌ بِفِي، وَعَلَامَةُ جَرِّهِ الفَتْحَةُ", "اسْمٌ مَجْرُورٌ بِالكَسْرَةِ مَعَ التَّنْوِينِ"], "İstanbul caddelerinde arabalar çoğaldı.", "Muzâf: kesre."],
      ["أَلَّفَ عَبَّاسُ مَحْمُود العَقَّادُ كِتَابَ «عَبْقَرِيَّةُ ___».", ["عُمَرَ", "عُمَرِ", "عُمَرٍ"], ["مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالفَتْحَةِ؛ عَلَمٌ عَلَى وَزْنِ فُعَلَ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ"], "Abbas Mahmud el-Akkâd «Ömer’in Dehası» kitabını yazdı.", "فُعَلُ vezninde alem: fetha."],
      ["فَرِحَ أَحْمَدُ بِلِقَاءِ صَدِيقِهِ ___.", ["أَشْرَفَ", "أَشْرَفِ", "أَشْرَفٍ"], ["بَدَلٌ مَجْرُورٌ بِالفَتْحَةِ؛ عَلَمٌ عَلَى وَزْنِ الفِعْلِ", "بَدَلٌ مَجْرُورٌ بِالكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ"], "Ahmed arkadaşı Eşref’le karşılaşınca sevindi.", "صَدِيقِهِ’ye bedel: mecrûr, fetha ile."],
      ["تَزَوَّجَتْ ___ مِنْ عَلِيٍّ كَرَّمَ اللهُ وَجْهَهُ.", ["فَاطِمَةُ", "فَاطِمَةَ", "فَاطِمَةٌ"], ["فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ بِلَا تَنْوِينٍ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ", "فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ مَعَ التَّنْوِينِ"], "Fâtıma, Ali (k.v.) ile evlendi.", "Merfû: tek damme."],
      ["تَصَدَّقَتْ سُمَيَّةُ عَلَى امْرَأَةٍ ___.", ["عَمْيَاءَ", "عَمْيَاءِ", "عَمْيَاءٍ"], ["نَعْتٌ مَجْرُورٌ بِالفَتْحَةِ؛ وَصْفٌ عَلَى وَزْنِ فَعْلَاءَ", "نَعْتٌ مَجْرُورٌ بِالكَسْرَةِ", "حَالٌ مَنْصُوبَةٌ بِالفَتْحَةِ"], "Sümeyye âmâ bir kadına sadaka verdi.", "Na’t: fetha ile mecrûr."],
      ["تَجَوَّلْتُ فِي ___ البِحَارِ بِتُرْكِيَا هَذِهِ العُطْلَةَ.", ["شَوَاطِئِ", "شَوَاطِئَ", "شَوَاطِئٍ"], ["اسْمٌ مَجْرُورٌ بِفِي، وَعَلَامَةُ جَرِّهِ الكَسْرَةُ؛ لِأَنَّهُ مُضَافٌ", "اسْمٌ مَجْرُورٌ بِفِي، وَعَلَامَةُ جَرِّهِ الفَتْحَةُ", "مَفْعُولٌ فِيهِ مَنْصُوبٌ"], "Bu tatilde Türkiye’de deniz kıyılarını gezdim.", "Muzâf: kesre."],
      ["تَرَدَّدْ إِلَى ___ فِيهَا عُلَمَاءُ أَفَاضِلُ.", ["مَجَالِسَ", "مَجَالِسِ", "مَجَالِسٍ"], ["اسْمٌ مَجْرُورٌ بِإِلَى، وَعَلَامَةُ جَرِّهِ الفَتْحَةُ؛ صِيغَةُ مُنْتَهَى الجُمُوعِ", "اسْمٌ مَجْرُورٌ بِإِلَى، وَعَلَامَةُ جَرِّهِ الكَسْرَةُ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ"], "İçinde faziletli âlimler bulunan meclislere devam et.", "Müntehe’l-cumû‘: fetha."]
    ].map(ZI) },
    { type: "pick", num: "٨", ar: "اجْعَلِ المَمْنُوعَ مِنَ الصَّرْفِ فِي الجُمَلِ الآتِيَةِ مَجْرُورًا بِالكَسْرَةِ", tr: "Koyu ifadeyi kesre ile mecrûr olacak biçime çevir (harf-i tarifli ya da izafet).", exHtml: "<span class=\"ar\">مَعَ أَطِبَّاءَ كَثِيرِينَ ← مَعَ الأَطِبَّاءِ الكَثِيرِينَ · فِي مَصَانِعَ كَبِيرَةٍ ← فِي مَصَانِعِ الدَّوْلَةِ</span>", items: PL([
      [HL("تَجَوَّلْتُ فِي شَوَارِعَ جَمِيلَةٍ طُولَ اليَوْمِ.", "فِي شَوَارِعَ جَمِيلَةٍ"), "فِي الشَّوَارِعِ الجَمِيلَةِ", "فِي الشَّوَارِعَ الجَمِيلَةِ", "فِي شَوَارِعِ جَمِيلَةٍ", "Bütün gün güzel caddelerde dolaştım.", "Harf-i tarifli: kesre; sıfat da harf-i tarifli olur."],
      [HL("صَوَّرْتُ الأَزْهَارَ المُتَنَوِّعَةَ فِي حَدَائِقَ مُخْتَلِفَةٍ.", "فِي حَدَائِقَ مُخْتَلِفَةٍ"), "فِي الحَدَائِقِ المُخْتَلِفَةِ", "فِي الحَدَائِقَ المُخْتَلِفَةِ", "فِي حَدَائِقِ مُخْتَلِفَةٍ", "Çeşitli çiçekleri farklı bahçelerde fotoğrafladım.", "Harf-i tarifli: kesre."],
      [HL("تَحَدَّثْنَا حَوْلَ المَوْضُوعِ مَعَ عُلَمَاءَ فِي المَدِينَةِ.", "مَعَ عُلَمَاءَ فِي المَدِينَةِ"), "مَعَ عُلَمَاءِ المَدِينَةِ", "مَعَ عُلَمَاءَ المَدِينَةِ", "مَعَ عُلَمَاءٍ فِي المَدِينَةِ", "Konuyu şehrin âlimleriyle konuştuk.", "Muzâf: kesre."],
      [HL("نَظَرْتُ لِشَرْحِ الكَلِمَةِ فِي قَوَامِيسَ مُخْتَلِفَةٍ.", "فِي قَوَامِيسَ مُخْتَلِفَةٍ"), "فِي القَوَامِيسِ المُخْتَلِفَةِ", "فِي القَوَامِيسَ المُخْتَلِفَةِ", "فِي قَوَامِيسٍ مُخْتَلِفَةٍ", "Kelimenin açıklamasına farklı sözlüklerde baktım.", "Harf-i tarifli: kesre."],
      [HL("قَرَّرْتُ أَنْ أَحْفَظَ مِنْ قَصَائِدَ طَوِيلَةٍ فِي العَصْرِ الجَاهِلِيِّ.", "مِنْ قَصَائِدَ طَوِيلَةٍ فِي العَصْرِ الجَاهِلِيِّ"), "مِنْ قَصَائِدِ العَصْرِ الجَاهِلِيِّ", "مِنْ قَصَائِدَ العَصْرِ الجَاهِلِيِّ", "مِنْ قَصَائِدٍ طَوِيلَةٍ", "Câhiliye döneminin kasidelerinden ezberlemeye karar verdim.", "Muzâf: kesre."],
      [HL("فِي بِلَادِنَا كَثِيرٌ مِنْ أَغْنِيَاءَ أَصْحَابِ الخَيْرَاتِ لَا نَعْرِفُهُمْ.", "مِنْ أَغْنِيَاءَ"), "مِنَ الأَغْنِيَاءِ", "مِنَ الأَغْنِيَاءَ", "مِنْ أَغْنِيَاءٍ", "Ülkemizde tanımadığımız hayır sahibi pek çok zengin var.", "Harf-i tarifli: kesre. (Kitapta صَاحِبِي الخَيْرَاتِ; doğrusu أَصْحَابِ الخَيْرَاتِ.)"],
      [HL("لِعِبَادٍ أَوْلِيَاءَ قُلُوبٌ لَا تَغْفُلُ عَنْ ذِكْرِ اللهِ أَبَدًا.", "لِعِبَادٍ أَوْلِيَاءَ"), "لِلْعِبَادِ الأَوْلِيَاءِ", "لِلْعِبَادِ الأَوْلِيَاءَ", "لِعِبَادٍ أَوْلِيَاءٍ", "Veli kulların, Allah’ı anmaktan asla gafil olmayan kalpleri vardır.", "Harf-i tarifli na’t: kesre."],
      [HL("مِنَ المُهِمِّ أَنْ نُرَبِّيَ أَوْلَادَنَا وَفْقَ تَعَالِيمَ إِسْلَامِيَّةٍ.", "وَفْقَ تَعَالِيمَ إِسْلَامِيَّةٍ"), "وَفْقَ التَّعَالِيمِ الإِسْلَامِيَّةِ", "وَفْقَ التَّعَالِيمَ الإِسْلَامِيَّةِ", "وَفْقَ تَعَالِيمٍ إِسْلَامِيَّةٍ", "Çocuklarımızı İslami öğretilere göre yetiştirmemiz önemlidir.", "Harf-i tarifli muzâfun ileyh: kesre."]
    ])},
    { type: "pick", num: "٩", ar: "اجْعَلِ المَمْنُوعَ مِنَ الصَّرْفِ فِي الجُمَلِ الآتِيَةِ مَجْرُورًا بِالفَتْحَةِ", tr: "Koyu ifadeyi fetha ile mecrûr olacak biçime (nekre, izafetsiz) çevir.", exHtml: "<span class=\"ar\">تَشْتَهِرُ القَاهِرَةُ بِالمَسَاجِدِ الكَثِيرَةِ ← تَشْتَهِرُ القَاهِرَةُ بِمَسَاجِدَ كَثِيرَةٍ</span>", items: PL([
      [HL("العُمَّالُ يَعْمَلُونَ بِمَصَانِعِ الدَّرَّاجَاتِ.", "بِمَصَانِعِ الدَّرَّاجَاتِ"), "بِمَصَانِعَ لِلدَّرَّاجَاتِ", "بِمَصَانِعٍ لِلدَّرَّاجَاتِ", "بِمَصَانِعِ لِلدَّرَّاجَاتِ", "İşçiler bisiklet fabrikalarında çalışıyor.", "İzafet kalkınca fetha."],
      [HL("لِلْفُقَهَاءِ آرَاءٌ مُخْتَلِفَةٌ فِي هَذَا المَوْضُوعِ.", "لِلْفُقَهَاءِ"), "لِفُقَهَاءَ", "لِفُقَهَاءٍ", "لِفُقَهَاءِ", "Fakihlerin bu konuda farklı görüşleri var.", "Nekre: fetha, tenvinsiz."],
      [HL("زَادَ بِنَاءُ الفَنَادِقِ السِّيَاحِيَّةِ فِي بِلَادِنَا.", "الفَنَادِقِ السِّيَاحِيَّةِ"), "فَنَادِقَ سِيَاحِيَّةٍ", "فَنَادِقٍ سِيَاحِيَّةٍ", "فَنَادِقِ سِيَاحِيَّةٍ", "Ülkemizde turistik otel yapımı arttı.", "Muzâfun ileyh nekre: fetha. Sıfat kesreli kalır."],
      [HL("تُكْتَبُ الرِّوَايَاتُ بِالأَسَالِيبِ المُتَنَوِّعَةِ.", "بِالأَسَالِيبِ المُتَنَوِّعَةِ"), "بِأَسَالِيبَ مُتَنَوِّعَةٍ", "بِأَسَالِيبٍ مُتَنَوِّعَةٍ", "بِأَسَالِيبِ مُتَنَوِّعَةٍ", "Romanlar çeşitli üsluplarla yazılır.", "Nekre: fetha."],
      [HL("مَا رَأْيُكَ فِي الأَكَاذِيبِ البَيْضَاءِ؟", "فِي الأَكَاذِيبِ البَيْضَاءِ"), "فِي أَكَاذِيبَ بَيْضَاءَ", "فِي أَكَاذِيبَ بَيْضَاءٍ", "فِي أَكَاذِيبٍ بَيْضَاءَ", "Beyaz yalanlar hakkında ne düşünüyorsun?", "İkisi de gayr-i munsarif: ikisi de fetha."],
      [HL("طَلَعَ البَدْرُ فِي اللَّيْلَةِ الظَّلْمَاءِ.", "فِي اللَّيْلَةِ الظَّلْمَاءِ"), "فِي لَيْلَةٍ ظَلْمَاءَ", "فِي لَيْلَةٍ ظَلْمَاءٍ", "فِي لَيْلَةٍ ظَلْمَاءِ", "Karanlık bir gecede dolunay doğdu.", "لَيْلَةٍ munsarif (kesre-tenvin); ظَلْمَاءَ fetha."],
      [HL("يَتَخَرَّجُ مَلَايِينُ الطُّلَّابِ مِنَ المَدَارِسِ كُلَّ سَنَةٍ.", "مِنَ المَدَارِسِ"), "مِنْ مَدَارِسَ", "مِنْ مَدَارِسٍ", "مِنْ مَدَارِسِ", "Her yıl okullardan milyonlarca öğrenci mezun olur.", "Nekre: fetha."],
      [HL("قَضَيْنَا اللَّيْلَةَ فِي الصَّحْرَاءِ الوَاسِعَةِ.", "فِي الصَّحْرَاءِ الوَاسِعَةِ"), "فِي صَحْرَاءَ وَاسِعَةٍ", "فِي صَحْرَاءٍ وَاسِعَةٍ", "فِي صَحْرَاءِ وَاسِعَةٍ", "Geceyi geniş bir çölde geçirdik.", "Nekre: fetha; sıfat munsarif: kesre-tenvin."]
    ])},
    { type: "classify", extra: true, opts: FK, ar: "بِمَ جُرَّ المَمْنُوعُ مِنَ الصَّرْفِ؟", tr: "Koyu kelime fetha ile mi, kesre ile mi mecrûr?", items: CL([
      [HL("مِنَ المَدَارِسِ", "المَدَارِسِ"), "k", "Harf-i tarifli."],
      [HL("مِنْ مَدَارِسَ كَثِيرَةٍ", "مَدَارِسَ"), "f", "Nekre."],
      [HL("كُنْتُ فِي صَحْرَاءَ", "صَحْرَاءَ"), "f", "Nekre."],
      [HL("قَضَيْنَا اللَّيْلَةَ فِي الصَّحْرَاءِ", "الصَّحْرَاءِ"), "k", "Harf-i tarifli."],
      [HL("مِنْ أَكْبَرِ المُدُنِ", "أَكْبَرِ"), "k", "Muzâf."],
      [HL("مَرَرْتُ بِرَجُلٍ أَكْبَرَ مِنِّي", "أَكْبَرَ"), "f", "Na’t, nekre."],
      [HL("سَافَرْتُ إِلَى دِمَشْقَ", "دِمَشْقَ"), "f", "Alem."],
      [HL("صَلَّيْتُ فِي مَسَاجِدِ إِسْطَنْبُولَ", "مَسَاجِدِ"), "k", "Muzâf."],
      [HL("صَلَّيْتُ فِي مَسَاجِدَ قَدِيمَةٍ", "مَسَاجِدَ"), "f", "Nekre."],
      [HL("تَحَدَّثْنَا مَعَ عُلَمَاءِ المَدِينَةِ", "عُلَمَاءِ"), "k", "Muzâf."],
      [HL("تَحَدَّثْنَا مَعَ عُلَمَاءَ كِبَارٍ", "عُلَمَاءَ"), "f", "Nekre."],
      [HL("هَذَا الكِتَابُ لِفَاطِمَةَ", "فَاطِمَةَ"), "f", "Alem."],
      [HL("تَصَدَّقَتْ عَلَى امْرَأَةٍ عَمْيَاءَ", "عَمْيَاءَ"), "f", "Na’t, nekre."],
      [HL("فَرِحْتُ بِالأَزْهَارِ البَيْضَاءِ", "البَيْضَاءِ"), "k", "Harf-i tarifli."],
      [HL("﴿وَزَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ﴾", "مَصَابِيحَ"), "f", "Nekre."],
      [HL("﴿لَقَدْ خَلَقْنَا الإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ﴾", "أَحْسَنِ"), "k", "Muzâf."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMA
{
  id: "u5", no: 5, ar: "إِعْرَابُ المَمْنُوعِ مِنَ الصَّرْفِ · القِرَاءَةُ", tr: "Âyetlerde İ’rab ve Okuma", short: "Okuma", col: "muz", legend: ["nasb", "mz"],
  goals: ["Âyetlerdeki gayr-i munsarifi i’rab etmek", "“Suriye” metnindeki gayr-i munsarif isimleri bulmak", "Her birinin sebebini ve metindeki i’rabını söylemek"],
  examples: [
    { s: "﴿إِنَّهَا بَقَرَةٌ:x / صَفْرَاءُ:nasb / فَاقِعٌ لَوْنُهَا تَسُرُّ النَّاظِرِينَ﴾:x", tr: "O, rengi parlak sarı, bakanlara ferahlık veren bir inektir. (Bakara 69) صَفْرَاءُ: بَقَرَةٌ’nin sıfatı, damme ile merfû." },
    { s: "﴿وَإِلَى:mz / ثَمُودَ:nasb / أَخَاهُمْ صَالِحًا﴾:x", tr: "Semûd’a da kardeşleri Sâlih’i (gönderdik). (A’râf 73)", pair: "﴿فَعِدَّةٌ:x / مِنْ:mz / أَيَّامٍ:x / أُخَرَ﴾:nasb", pairTr: "…başka günlerde sayısınca. (Bakara 184)" }
  ],
  rules: [
    { tr: "İ’rab ederken üç şeyi söyle: <b>görev</b> (fâil, na’t, hâl, muzâfun ileyh…), <b>hâl</b> (merfû / mansûb / mecrûr) ve <b>alâmet</b>. Gayr-i munsarif mecrûrsa: <span class=\"ar\">مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الفَتْحَةُ نِيَابَةً عَنِ الكَسْرَةِ</span>." },
    { tr: "Merfû ve mansûbda tenvin yoktur: <span class=\"ar\">اسْمُهُ أَحْمَدُ · رَجَعَ غَضْبَانَ · ذُرِّيَّةٌ ضُعَفَاءُ</span>." },
    { tr: "Metinde bir isim gayr-i munsarif kalıbında olsa bile harf-i tarifli ya da muzâfsa kesre alır: <span class=\"ar\">مِنَ المَنَاطِقِ · بِقِلَاعِهَا</span>. <span class=\"ar\">أَنْحَاءٍ</span> ise hemzesi aslî olduğundan munsariftir." }
  ],
  kaide: ["أَعْرِبِ المَمْنُوعَ مِنَ الصَّرْفِ فِي الآيَاتِ الكَرِيمَةِ. اقْرَأِ القِطْعَةَ التَّالِيَةَ وَاسْتَخْرِجْ مِنْهَا الأَسْمَاءَ المَمْنُوعَةَ مِنَ الصَّرْفِ وَبَيِّنْ سَبَبَ مَنْعِهَا."],
  ex: [
    { type: "combo", num: "١٠", ar: "أَعْرِبِ المَمْنُوعَ مِنَ الصَّرْفِ فِي الآيَاتِ الكَرِيمَةِ الآتِيَةِ", tr: "Âyetteki gayr-i munsarifin doğru harekesini ve i’rabını seç.", exHtml: "<span class=\"ar\">﴿إِنَّهَا بَقَرَةٌ صَفْرَاءُ﴾ ← صَفْرَاءُ: صِفَةٌ لِـ«بَقَرَةٌ» مَرْفُوعَةٌ بِالضَّمَّةِ</span>", items: [
      ["﴿وَزَيَّنَّا السَّمَاءَ الدُّنْيَا بِـ___ وَحِفْظًا﴾ (فصلت ١٢)", ["مَصَابِيحَ", "مَصَابِيحِ", "مَصَابِيحٍ"], ["اسْمٌ مَجْرُورٌ بِالبَاءِ، وَعَلَامَةُ جَرِّهِ الفَتْحَةُ؛ صِيغَةُ مُنْتَهَى الجُمُوعِ", "اسْمٌ مَجْرُورٌ بِالبَاءِ، وَعَلَامَةُ جَرِّهِ الكَسْرَةُ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ"], "Dünya semasını kandillerle süsledik ve koruduk. (Fussılet 12)", "Nekre müntehe’l-cumû‘: fetha."],
      ["﴿شَهْرُ ___ الَّذِي أُنْزِلَ فِيهِ القُرْآنُ﴾ (البقرة ١٨٥)", ["رَمَضَانَ", "رَمَضَانِ", "رَمَضَانُ"], ["مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالفَتْحَةِ؛ عَلَمٌ مَخْتُومٌ بِأَلِفٍ وَنُونٍ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالكَسْرَةِ", "نَعْتٌ مَرْفُوعٌ بِالضَّمَّةِ"], "Kur’an’ın indirildiği Ramazan ayı… (Bakara 185)", "Elif-nûnlu alem."],
      ["﴿وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِنْ بَعْدِي اسْمُهُ ___﴾ (الصف ٦)", ["أَحْمَدُ", "أَحْمَدَ", "أَحْمَدٌ"], ["خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ بِلَا تَنْوِينٍ؛ عَلَمٌ عَلَى وَزْنِ الفِعْلِ", "خَبَرٌ مَنْصُوبٌ بِالفَتْحَةِ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ مَعَ التَّنْوِينِ"], "…benden sonra gelecek, adı Ahmed olan bir peygamberi müjdeleyici olarak. (Saf 6)", "Mübtedanın haberi: merfû."],
      ["﴿وَلَمَّا رَجَعَ مُوسَى إِلَى قَوْمِهِ ___ أَسِفًا﴾ (الأعراف ١٥٠)", ["غَضْبَانَ", "غَضْبَانًا", "غَضْبَانُ"], ["حَالٌ مَنْصُوبَةٌ بِالفَتْحَةِ بِلَا تَنْوِينٍ؛ وَصْفٌ عَلَى وَزْنِ فَعْلَانَ", "حَالٌ مَنْصُوبَةٌ بِالفَتْحَةِ مَعَ التَّنْوِينِ", "نَعْتٌ مَرْفُوعٌ بِالضَّمَّةِ"], "Mûsâ kavmine öfkeli ve üzgün dönünce… (A’râf 150)", "Hâl: mansûb, tenvinsiz; yanındaki أَسِفًا munsarif."],
      ["﴿فَعِدَّةٌ مِنْ أَيَّامٍ ___﴾ (البقرة ١٨٤)", ["أُخَرَ", "أُخَرٍ", "أُخَرِ"], ["نَعْتٌ مَجْرُورٌ بِالفَتْحَةِ بَدَلَ الكَسْرَةِ؛ وَصْفٌ عَلَى وَزْنِ فُعَلَ", "نَعْتٌ مَجْرُورٌ بِالكَسْرَةِ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالكَسْرَةِ"], "…tutamadığı günler sayısınca başka günlerde (tutar). (Bakara 184)", "أَيَّامٍ’ın sıfatı: mecrûr, fetha ile."],
      ["﴿وَلَهُ ذُرِّيَّةٌ ___﴾ (البقرة ٢٦٦)", ["ضُعَفَاءُ", "ضُعَفَاءٌ", "ضُعَفَاءَ"], ["نَعْتٌ مَرْفُوعٌ بِالضَّمَّةِ بِلَا تَنْوِينٍ؛ مَخْتُومٌ بِأَلِفِ التَّأْنِيثِ المَمْدُودَةِ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ مَعَ التَّنْوِينِ", "نَعْتٌ مَنْصُوبٌ بِالفَتْحَةِ"], "…ve onun güçsüz çocukları varken. (Bakara 266)", "ذُرِّيَّةٌ’nin sıfatı: merfû."],
      ["﴿وَإِلَى ___ أَخَاهُمْ صَالِحًا﴾ (الأعراف ٧٣)", ["ثَمُودَ", "ثَمُودٍ", "ثَمُودِ"], ["اسْمٌ مَجْرُورٌ بِإِلَى، وَعَلَامَةُ جَرِّهِ الفَتْحَةُ؛ عَلَمٌ مُؤَنَّثٌ (اسْمُ قَبِيلَةٍ)", "اسْمٌ مَجْرُورٌ بِإِلَى، وَعَلَامَةُ جَرِّهِ الكَسْرَةُ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ"], "Semûd’a da kardeşleri Sâlih’i (gönderdik). (A’râf 73)", "Kabile adı olarak müennes alem."],
      ["﴿وَجَعَلْنَا فِيهَا ___ شَامِخَاتٍ﴾ (المرسلات ٢٧)", ["رَوَاسِيَ", "رَوَاسِيًا", "رَوَاسٍ"], ["مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ بِلَا تَنْوِينٍ؛ صِيغَةُ مُنْتَهَى الجُمُوعِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ مَعَ التَّنْوِينِ", "اسْمٌ مَجْرُورٌ بِالكَسْرَةِ"], "Orada yüksek, sabit dağlar yarattık. (Mürselât 27)", "فَوَاعِلُ: mansûb, tenvinsiz."]
    ].map(ZI) },
    { type: "reading", num: "١١", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ وَاسْتَخْرِجْ مِنْهَا الأَسْمَاءَ المَمْنُوعَةَ مِنَ الصَّرْفِ وَبَيِّنْ سَبَبَ مَنْعِهَا", tr: "Metni oku, soruları cevapla; sonra koyu kelimenin gayr-i munsarif olup olmadığını ve metindeki i’rabını seç.", title: "سُورِيَّةُ",
      text: METIN,
      textTr: "Suriye, Âdemoğullarının yaşadığı eski bölgelerdendir. Bu gerçeğin delillerinden biri, İdlib yakınlarındaki bir mağarada tarihi ilk insana uzanan bir iskeletin bulunmasıdır.<br>Suriye’de tarihî şehirler vardır; Tedmür (Palmira), Mari ve Busrâ bunlardandır. Suriye ayrıca farklı bölgelerine yayılmış çok sayıdaki kalesiyle de öne çıkar; örneğin Hısn Kalesi, Sem’ân, Selâhaddin Kalesi, Şeyzer Kalesi ile Halep ve Şam kaleleri bu kalelerdendir.<br>Suriye bu eserlere önem vermiş, ziyaretçiler rahat ve keyifli vakit geçirsin diye yanlarına iyi oteller ve lokantalar kurmuştur. (Ecnebilere Arapça Öğretimi kitabından, uyarlanarak)",
      qa: [
        { q: "مَا الدَّلِيلُ عَلَى أَنَّ سُورِيَّةَ مِنَ المَنَاطِقِ القَدِيمَةِ؟", a: "اكْتُشِفَ فِي كَهْفٍ قُرْبَ إِدْلِبَ هَيْكَلٌ عَظْمِيٌّ يَعُودُ إِلَى الإِنْسَانِ الأَوَّلِ.", tr: "Suriye’nin eski bir bölge olduğunun delili nedir? İdlib yakınlarında ilk insana ait bir iskelet bulunması." },
        { q: "اذْكُرْ ثَلَاثَ مُدُنٍ أَثَرِيَّةٍ فِي سُورِيَّةَ.", a: "تَدْمُرُ، وَمَارِي، وَبُصْرَى.", tr: "Suriye’de üç tarihî şehir say. Tedmür, Mari ve Busrâ." },
        { q: "بِمَ تَمْتَازُ سُورِيَّةُ كَذَلِكَ؟", a: "تَمْتَازُ بِقِلَاعِهَا الكَثِيرَةِ، مِثْلُ قَلْعَةِ الحِصْنِ وَقَلْعَةِ صَلَاحِ الدِّينِ وَقَلْعَتَيْ حَلَبَ وَدِمَشْقَ.", tr: "Suriye başka neyle öne çıkar? Çok sayıdaki kalesiyle: Hısn, Selâhaddin, Halep ve Şam kaleleri." },
        { q: "مَاذَا أَقَامَتْ سُورِيَّةُ بِجِوَارِ الآثَارِ؟ وَلِمَاذَا؟", a: "أَقَامَتْ فَنَادِقَ وَمَطَاعِمَ جَيِّدَةً حَتَّى يَشْعُرَ الزُّوَّارُ بِالرَّاحَةِ وَالمُتْعَةِ.", tr: "Suriye eserlerin yanına ne kurdu, niçin? İyi oteller ve lokantalar; ziyaretçiler rahat etsin diye." }
      ],
      cls: { opts: G4X, ar: "مَا سَبَبُ المَنْعِ؟", tr: "Koyu kelime gayr-i munsarif mi? Öyleyse hangi kısımdan?", items: [
        { s: HL("إِنَّ سُورِيَّةَ مِنَ المَنَاطِقِ القَدِيمَةِ", "سُورِيَّةَ"), a: "a", why: "Ülke adı: müennes (ve a’cemî) alem." },
        { s: HL("عَاشَ فِيهَا بَنُو آدَمَ", "آدَمَ"), a: "a", why: "Alem: a’cemî ya da أَفْعَلُ vezni." },
        { s: HL("فِي كَهْفٍ قُرْبَ إِدْلِبَ", "إِدْلِبَ"), a: "a", why: "Şehir adı: müennes alem." },
        { s: HL("مِنْهَا تَدْمُرُ وَمَارِي", "تَدْمُرُ"), a: "a", why: "Şehir adı: müennes alem (fiil vezninde de)." },
        { s: HL("تَدْمُرُ وَمَارِي وَبُصْرَى", "بُصْرَى"), a: "e", why: "Elif-i maksûre ile biter (aynı zamanda alem)." },
        { s: HL("قَلْعَةُ الحِصْنِ وَسَمْعَانَ", "سَمْعَانَ"), a: "a", why: "Elif-nûnlu alem." },
        { s: HL("وَقَلْعَةُ شَيْزَرَ", "شَيْزَرَ"), a: "a", why: "Yer adı: müennes alem." },
        { s: HL("وَقَلْعَتَا حَلَبَ وَدِمَشْقَ", "حَلَبَ"), a: "a", why: "Şehir adı." },
        { s: HL("حَلَبَ وَدِمَشْقَ مِنْ هَذِهِ القِلَاعِ", "دِمَشْقَ"), a: "a", why: "Şehir adı." },
        { s: HL("أَقَامَتْ بِجِوَارِهَا فَنَادِقَ", "فَنَادِقَ"), a: "c", why: "فَعَالِلُ." },
        { s: HL("فَنَادِقَ وَمَطَاعِمَ جَيِّدَةً", "مَطَاعِمَ"), a: "c", why: "مَفَاعِلُ." },
        { s: HL("فِي أَنْحَاءٍ مُخْتَلِفَةٍ", "أَنْحَاءٍ"), a: "x", why: "أَفْعَالٌ çoğulu; hemze aslî: munsarif (tenvinli)." },
        { s: HL("وَفِي سُورِيَّةَ مُدُنٌ أَثَرِيَّةٌ", "مُدُنٌ"), a: "x", why: "فُعُلٌ çoğulu: munsarif." },
        { s: HL("اكْتُشِفَ فِي كَهْفٍ", "كَهْفٍ"), a: "x", why: "Munsarif." }
      ]},
      cls2: { opts: HR, ar: "مَا إِعْرَابُهُ فِي النَّصِّ؟", tr: "Koyu kelime metinde nasıl i’rab edilmiş?", items: [
        { s: HL("إِنَّ سُورِيَّةَ مِنَ المَنَاطِقِ", "سُورِيَّةَ"), a: "n", why: "إِنَّ’nin ismi: mansûb." },
        { s: HL("بَنُو آدَمَ", "آدَمَ"), a: "f", why: "Muzâfun ileyh: fetha ile mecrûr." },
        { s: HL("قُرْبَ إِدْلِبَ", "إِدْلِبَ"), a: "f", why: "Muzâfun ileyh: fetha." },
        { s: HL("وَفِي سُورِيَّةَ مُدُنٌ", "سُورِيَّةَ"), a: "f", why: "فِي ile mecrûr: fetha." },
        { s: HL("مِنْهَا تَدْمُرُ", "تَدْمُرُ"), a: "r", why: "Muahhar mübtedâ: tek damme." },
        { s: HL("وَتَمْتَازُ سُورِيَّةُ", "سُورِيَّةُ"), a: "r", why: "Fâil: tek damme." },
        { s: HL("وَقَلْعَةُ شَيْزَرَ", "شَيْزَرَ"), a: "f", why: "Muzâfun ileyh." },
        { s: HL("وَقَلْعَتَا حَلَبَ", "حَلَبَ"), a: "f", why: "Muzâfun ileyh." },
        { s: HL("أَقَامَتْ بِجِوَارِهَا فَنَادِقَ", "فَنَادِقَ"), a: "n", why: "Mef’ûl: fetha, tenvinsiz." },
        { s: HL("مِنَ المَنَاطِقِ القَدِيمَةِ", "المَنَاطِقِ"), a: "k", why: "Harf-i tarifli: kesre." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["تَدْرُسُ خَدِيجَةُ فِي {دِمَشْقَ}.", ["دِمَشْقَ", "دِمَشْقِ", "دِمَشْقٍ"], "müennes alem: fetha ile mecrûr", "Hatice Dımaşk’ta okuyor.", "u1"],
  ["بَنَى إِبْرَاهِيمُ مَعَ {إِسْمَاعِيلَ} الكَعْبَةَ.", ["إِسْمَاعِيلَ", "إِسْمَاعِيلِ", "إِسْمَاعِيلٍ"], "a’cemî alem", "İbrâhim, İsmâil ile Kâbe’yi yaptı.", "u1"],
  ["عُثْمَانُ بْنُ {عَفَّانَ} مِنْ كِبَارِ الصَّحَابَةِ.", ["عَفَّانَ", "عَفَّانِ", "عَفَّانٍ"], "elif-nûn: fetha ile mecrûr", "Osman b. Affân büyük sahâbîlerdendir.", "u1"],
  ["انْتَقَلْتُ إِلَى {حَضْرَمَوْتَ} لِمُدَّةِ سَنَةٍ.", ["حَضْرَمَوْتَ", "حَضْرَمَوْتِ", "حَضْرَمَوْتٍ"], "mürekkeb-i mezcî", "Bir yıllığına Hadramut’a taşındım.", "u1"],
  ["يَعْمَلُ أَحْمَدُ مَعَ {عُمَرَ} فِي شَرِكَةٍ.", ["عُمَرَ", "عُمَرِ", "عُمَرٍ"], "fu‘al vezni", "Ahmed, Ömer ile bir şirkette çalışıyor.", "u1"],
  ["{أَحْمَدُ} أَكْثَرُ مِنْ إِخْوَتِهِ عِلْمًا.", ["أَحْمَدُ", "أَحْمَدٌ", "أَحْمَدَ"], "mübtedâ: tek damme", "Ahmed kardeşlerinden daha bilgilidir.", "u1"],
  ["رَجَعَ الرَّجُلُ إِلَى البَيْتِ {تَعْبَانَ}.", ["تَعْبَانَ", "تَعْبَانًا", "تَعْبَانُ"], "hâl: tenvinsiz fetha", "Adam eve yorgun döndü.", "u2"],
  ["أَخِي {أَكْبَرُ} مِنِّي بِسَنَتَيْنِ.", ["أَكْبَرُ", "أَكْبَرٌ", "أَكْبَرَ"], "haber: tek damme", "Kardeşim benden iki yaş büyük.", "u2"],
  ["فِي الحَدِيقَةِ أَزْهَارٌ {بَيْضَاءُ}.", ["بَيْضَاءُ", "بَيْضَاءٌ", "بَيْضَاءَ"], "na’t: tek damme", "Bahçede beyaz çiçekler var.", "u2"],
  ["كُنْتُ فِي صَحْرَاءَ فِي لَيْلَةٍ {ظَلْمَاءَ}.", ["ظَلْمَاءَ", "ظَلْمَاءٍ", "ظَلْمَاءِ"], "na’t: fetha ile mecrûr", "Karanlık bir gecede bir çöldeydim.", "u2"],
  ["فِي إِسْطَنْبُولَ {مَسَاجِدُ} كَثِيرَةٌ.", ["مَسَاجِدُ", "مَسَاجِدٌ", "مَسَاجِدَ"], "muahhar mübtedâ", "İstanbul’da çok cami var.", "u2"],
  ["جَنَيْتُ الأَزْهَارَ مَثْنَى وَ{ثُلَاثَ}.", ["ثُلَاثَ", "ثُلَاثًا", "ثُلَاثِ"], "sayı vasfı: hâl", "Çiçekleri ikişer üçer topladım.", "u2"],
  ["سَافَرَ صَدِيقِي إِلَى {بَيْرُوتَ}.", ["بَيْرُوتَ", "بَيْرُوتِ", "بَيْرُوتٍ"], "fetha ile mecrûr", "Arkadaşım Beyrut’a gitti.", "u3"],
  ["هَذَا الكِتَابُ لِـ{زَيْنَبَ}.", ["زَيْنَبَ", "زَيْنَبِ", "زَيْنَبٍ"], "fetha ile mecrûr", "Bu kitap Zeyneb’in.", "u3"],
  ["كَانَ {مَرْوَانُ} مِنَ الخُلَفَاءِ الأُمَوِيِّينَ.", ["مَرْوَانُ", "مَرْوَانَ", "مَرْوَانٌ"], "كَانَ’nin ismi", "Mervân Emevî halifelerindendi.", "u3"],
  ["تَمَتَّعْتُ بِـ{مَنَاظِرَ} طَبِيعِيَّةٍ.", ["مَنَاظِرَ", "مَنَاظِرِ", "مَنَاظِرٍ"], "müntehe’l-cumû‘", "Doğal manzaraların tadını çıkardım.", "u3"],
  ["خَدِيجَةُ {أَكْبَرُ} مِنْ سَلْمَى.", ["أَكْبَرُ", "كُبْرَى", "كَبِيرَةٌ"], "أَفْعَلُ + مِنْ", "Hatice Selmâ’dan büyüktür.", "u3"],
  ["يَخْرُجُ الطُّلَّابُ مِنَ {المَدَارِسِ} ظُهْرًا.", ["المَدَارِسِ", "المَدَارِسَ", "المَدَارِسٍ"], "harf-i tarifli: kesre", "Öğrenciler öğlen okullardan çıkar.", "u4"],
  ["القَاهِرَةُ مِنْ {أَكْثَرِ} المُدُنِ سُكَّانًا.", ["أَكْثَرِ", "أَكْثَرَ", "أَكْثَرٍ"], "muzâf: kesre", "Kahire en kalabalık şehirlerdendir.", "u4"],
  ["تَنَاقَشْتُ مَعَ {أَطِبَّاءَ} كَثِيرِينَ.", ["أَطِبَّاءَ", "أَطِبَّاءِ", "أَطِبَّاءٍ"], "nekre: fetha", "Birçok doktorla tartıştım.", "u4"],
  ["كَثُرَتِ السَّيَّارَاتُ فِي {شَوَارِعِ} إِسْطَنْبُولَ.", ["شَوَارِعِ", "شَوَارِعَ", "شَوَارِعٍ"], "muzâf: kesre", "İstanbul caddelerinde arabalar çoğaldı.", "u4"],
  ["تَصَدَّقَتْ سُمَيَّةُ عَلَى امْرَأَةٍ {عَمْيَاءَ}.", ["عَمْيَاءَ", "عَمْيَاءِ", "عَمْيَاءٍ"], "na’t: fetha", "Sümeyye âmâ bir kadına sadaka verdi.", "u4"],
  ["﴿شَهْرُ {رَمَضَانَ} الَّذِي أُنْزِلَ فِيهِ القُرْآنُ﴾", ["رَمَضَانَ", "رَمَضَانِ", "رَمَضَانُ"], "muzâfun ileyh: fetha", "Kur’an’ın indirildiği Ramazan ayı.", "u5"],
  ["﴿وَزَيَّنَّا السَّمَاءَ الدُّنْيَا بِـ{مَصَابِيحَ}﴾", ["مَصَابِيحَ", "مَصَابِيحِ", "مَصَابِيحٍ"], "fetha ile mecrûr", "Dünya semasını kandillerle süsledik.", "u5"],
  ["﴿وَلَهُ ذُرِّيَّةٌ {ضُعَفَاءُ}﴾", ["ضُعَفَاءُ", "ضُعَفَاءٌ", "ضُعَفَاءَ"], "na’t: tek damme", "…güçsüz çocukları varken.", "u5"],
  ["وَأَقَامَتْ بِجِوَارِهَا {فَنَادِقَ} وَمَطَاعِمَ.", ["فَنَادِقَ", "فَنَادِقًا", "فَنَادِقِ"], "mef’ûl: tenvinsiz fetha", "Yanlarına oteller ve lokantalar kurdu.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["دِمَشْقُ ← فِي ile", "فِي دِمَشْقَ", "فِي دِمَشْقٍ", "فِي دِمَشْقِ", "Alem: kesre yerine fetha, tenvinsiz.", "u1"],
  ["عُمَرُ ← مَعَ ile", "مَعَ عُمَرَ", "مَعَ عُمَرٍ", "مَعَ عُمَرِ", "Fu‘al vezninde alem.", "u1"],
  ["عُثْمَانُ ← mef’ûl yap", "رَأَيْتُ عُثْمَانَ", "رَأَيْتُ عُثْمَانًا", "رَأَيْتُ عُثْمَانِ", "Mansûb: tenvinsiz fetha.", "u1"],
  ["عَطْشَانُ ← hâl yap", "رَجَعَ الوَلَدُ عَطْشَانَ", "رَجَعَ الوَلَدُ عَطْشَانًا", "رَجَعَ الوَلَدُ عَطْشَانُ", "Hâl: tenvinsiz fetha.", "u2"],
  ["صَحْرَاءُ ← فِي ile", "فِي صَحْرَاءَ", "فِي صَحْرَاءٍ", "فِي صَحْرَاءِ", "Elif-i memdûde: fetha ile mecrûr.", "u2"],
  ["مَسَاجِدُ كَثِيرَةٌ ← بِـ ile", "بِمَسَاجِدَ كَثِيرَةٍ", "بِمَسَاجِدٍ كَثِيرَةٍ", "بِمَسَاجِدِ كَثِيرَةٍ", "İsim fetha; munsarif sıfat kesre-tenvin.", "u2"],
  ["صَالِحٌ ← gayr-i munsarif bir peygamber adı", "إِسْمَاعِيلُ", "نُوحٌ", "لُوطٌ", "Üç harfli a’cemî alemler munsariftir.", "u3"],
  ["رَخِيصٌ ← أَفْعَلُ kalıbı", "أَرْخَصُ", "أَرْخَصٌ", "رُخَصَاءُ", "أَفْعَلُ: tenvin almaz.", "u3"],
  ["جَائِعَةٌ ← gayr-i munsarif eş anlamlı", "جَوْعَى", "جَوْعَانَةٌ", "جَائِعَاتٌ", "جَوْعَانُ’ın müennesi جَوْعَى.", "u3"],
  ["فِي شَوَارِعَ جَمِيلَةٍ ← harf-i tarifli", "فِي الشَّوَارِعِ الجَمِيلَةِ", "فِي الشَّوَارِعَ الجَمِيلَةِ", "فِي الشَّوَارِعِ الجَمِيلَةَ", "Harf-i tarifli: kesre.", "u4"],
  ["مَعَ عُلَمَاءَ ← izafet: المَدِينَة", "مَعَ عُلَمَاءِ المَدِينَةِ", "مَعَ عُلَمَاءَ المَدِينَةِ", "مَعَ العُلَمَاءِ المَدِينَةِ", "Muzâf: kesre.", "u4"],
  ["بِالأَسَالِيبِ المُتَنَوِّعَةِ ← nekre", "بِأَسَالِيبَ مُتَنَوِّعَةٍ", "بِأَسَالِيبٍ مُتَنَوِّعَةٍ", "بِأَسَالِيبَ مُتَنَوِّعَةَ", "Nekre: fetha; sıfat munsarif.", "u4"],
  ["فِي اللَّيْلَةِ الظَّلْمَاءِ ← nekre", "فِي لَيْلَةٍ ظَلْمَاءَ", "فِي لَيْلَةٍ ظَلْمَاءٍ", "فِي لَيْلَةَ ظَلْمَاءَ", "لَيْلَةٌ munsarif; ظَلْمَاءُ gayr-i munsarif.", "u4"],
  ["أُخَرُ ← أَيَّامٍ’a sıfat", "مِنْ أَيَّامٍ أُخَرَ", "مِنْ أَيَّامٍ أُخَرٍ", "مِنْ أَيَّامَ أُخَرَ", "Na’t: fetha ile mecrûr.", "u5"]
];
// Kısım hız oyunu
var NOUN_LIST = UNITS[1].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = G4;
// Fetha mı kesre mi hız oyunu
var MM_OPTS = FK;
var MM_LIST = UNITS[3].ex[3].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  se: { name: "Kelime ↔ sebep", pairs: [["خَدِيجَةُ", "müennes alem"], ["إِبْرَاهِيمُ", "a’cemî alem"], ["عُثْمَانُ", "elif-nûnlu alem"], ["حَضْرَمَوْتُ", "mürekkeb-i mezcî"], ["أَحْمَدُ", "fiil vezninde alem"], ["عُمَرُ", "fu‘al vezninde alem"], ["أَكْبَرُ", "أَفْعَلُ vasıf"], ["مَسَاجِدُ", "müntehe’l-cumû‘"]] },
  ce: { name: "Fetha ↔ kesre", pairs: [["مِنْ مَدَارِسَ", "مِنَ المَدَارِسِ"], ["فِي صَحْرَاءَ", "فِي الصَّحْرَاءِ"], ["بِمَسَاجِدَ", "بِمَسَاجِدِ القَاهِرَةِ"], ["مَعَ عُلَمَاءَ", "مَعَ العُلَمَاءِ"], ["فِي شَوَارِعَ", "فِي شَوَارِعِ المَدِينَةِ"], ["بِأَكْبَرَ مِنْهُ", "بِأَكْبَرِ المُدُنِ"], ["فِي حَدَائِقَ", "فِي الحَدَائِقِ"], ["لِفُقَهَاءَ", "لِلْفُقَهَاءِ"]] },
  ay: { name: "Âyet ↔ Türkçe", pairs: [["بَقَرَةٌ صَفْرَاءُ", "sarı bir inek"], ["بِمَصَابِيحَ", "kandillerle"], ["شَهْرُ رَمَضَانَ", "Ramazan ayı"], ["اسْمُهُ أَحْمَدُ", "adı Ahmed"], ["غَضْبَانَ أَسِفًا", "öfkeli ve üzgün"], ["مِنْ أَيَّامٍ أُخَرَ", "başka günlerden"], ["ذُرِّيَّةٌ ضُعَفَاءُ", "güçsüz çocuklar"], ["رَوَاسِيَ شَامِخَاتٍ", "yüksek sabit dağlar"]] }
};
var KARTLAR = [
  ["Gayr-i munsarif ne demek?", "Tenvin ve kesre almayan isim (sarf = tenvin)."],
  ["Mecrûr olunca ne alır?", "Kesre yerine fetha: فِي دِمَشْقَ · فِي مَدَارِسَ"],
  ["Dört kısmı?", "Alem · vasıf · elif-i te’nîs ile biten · müntehe’l-cumû‘"],
  ["Alem hangi durumlarda?", "Müennes · a’cemî · elif-nûnlu · mürekkeb-i mezcî · fiil vezninde · fu‘al vezninde"],
  ["Vasıf kalıpları?", "فَعْلَانُ · أَفْعَلُ · فَعْلَاءُ · فُعَلُ · مَثْنَى / ثُلَاثُ"],
  ["Elif-i te’nîs?", "Memdûde ـاءُ: صَحْرَاءُ · maksûre ـى: ذِكْرَى"],
  ["Müntehe’l-cumû‘?", "Ortada elif + ardından iki ya da üç harf: مَسَاجِدُ · مَفَاتِيحُ"],
  ["Ne zaman kesre alır?", "Harf-i tarifli ya da muzâf olunca: مِنَ المَدَارِسِ · مِنْ أَكْثَرِ المُدُنِ"],
  ["سَمَاءٌ neden munsarif?", "Hemzesi aslî; te’nîs elifi değil."],
  ["نُوحٌ neden munsarif?", "Üç harfli, ortası sâkin a’cemî alem."],
  ["عُلَمَاءُ hangi kısım?", "Elif-i memdûde ile biten (فُعَلَاءُ)."],
  ["Kesreli cerden fethalıya?", "بِالمَسَاجِدِ الكَثِيرَةِ ← بِمَسَاجِدَ كَثِيرَةٍ"]
];
