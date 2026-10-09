// ================= VERİ: İsm-i Fâil ve İsm-i Mef’ûlün Ameli (عَمَلُ اسْمِ الفَاعِلِ وَاسْمِ المَفْعُولِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "العَامِلُ", tr: "Âmil (ism-i fâil / mef’ûl)" }, nasb: { ar: "المَعْمُولُ", tr: "Ma’mûl" }, cerr: { ar: "سَبَبُ العَمَلِ", tr: "Amel sebebi" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var SB = [["l", "Harf-i tarifli", "مُعَرَّفٌ بِـ«الْـ»", "nasb"], ["h", "Haber", "خَبَرٌ", "cerr"], ["s", "Sıfat", "صِفَةٌ", "mi"], ["a", "Hâl", "حَالٌ", "ref"], ["n", "Nefiyden sonra", "مَسْبُوقٌ بِنَفْيٍ", "mz"], ["i", "İstifhamdan sonra", "مَسْبُوقٌ بِاسْتِفْهَامٍ", "muz"]];
var FM = [["f", "İsm-i fâil", "اسْمُ الفَاعِلِ", "nasb"], ["m", "İsm-i mef’ûl", "اسْمُ المَفْعُولِ", "cerr"]];
var MA = [["f", "Fâil (merfû)", "فَاعِلٌ", "nasb"], ["n", "Nâib-i fâil (merfû)", "نَائِبُ فَاعِلٍ", "cerr"], ["m", "Mef’ûl (mansûb)", "مَفْعُولٌ بِهِ", "mi"], ["z", "Muzâfun ileyh", "مُضَافٌ إِلَيْهِ", "ref"]];
var TUR_TR = { l: "Harf-i tarifli", h: "Haber", s: "Sıfat", a: "Hâl", n: "Nefy / nâib-i fâil", i: "İstifham", f: "Fâil", m: "Mef’ûl", z: "Muzâfun ileyh" };
// Makine: âmil × kullanım → [cümle, Türkçe]
var AW = ["قَارِئٌ القُرْآنَ", "مُطِيعٌ أَبَاهُ", "مُتْقَنٌ طَبْعُهُ", "مَمْنُوحٌ الجَائِزَةَ"];
var AT = ["ism-i fâil + mef’ûl", "ism-i fâil + mef’ûl", "ism-i mef’ûl + nâib-i fâil", "ism-i mef’ûl + nâib-i fâil + mef’ûl"];
var AC = ["Harf-i tarifli", "Haber", "Sıfat", "Hâl", "Nefiyden sonra", "İstifhamdan sonra", "İzafet"];
var AX = [
  [["القَارِئُ:mz / القُرْآنَ:nasb / مَأْجُورٌ.:x", "Kur’an okuyan sevap kazanır."], ["أَخِي:x / قَارِئٌ:mz / القُرْآنَ:nasb / كُلَّ يَوْمٍ.:x", "Kardeşim her gün Kur’an okur."], ["هَذَا وَلَدٌ:x / قَارِئٌ:mz / القُرْآنَ:nasb / بِصَوْتٍ جَمِيلٍ.:x", "Bu, Kur’an’ı güzel sesle okuyan bir çocuk."], ["جَلَسَ الشَّيْخُ:x / قَارِئًا:mz / القُرْآنَ.:nasb", "Şeyh Kur’an okuyarak oturdu."], ["مَا:cerr / قَارِئٌ:mz / أَخُوكَ:nasb / القُرْآنَ:nasb / اليَوْمَ.:x", "Kardeşin bugün Kur’an okumuyor."], ["أَ:cerr / قَارِئٌ:mz / أَخُوكَ:nasb / القُرْآنَ؟:nasb", "Kardeşin Kur’an okuyor mu?"], ["أَخِي:x / قَارِئُ:mz / القُرْآنِ.:nasb", "Kardeşim Kur’an okuyucusudur."]],
  [["المُطِيعُ:mz / أَبَاهُ:nasb / مَحْبُوبٌ.:x", "Babasına itaat eden sevilir."], ["عَلِيٌّ:x / مُطِيعٌ:mz / أَبَاهُ.:nasb", "Ali babasına itaat eder."], ["هَذَا وَلَدٌ:x / مُطِيعٌ:mz / أَبَاهُ.:nasb", "Bu, babasına itaat eden bir çocuk."], ["عَاشَ الوَلَدُ:x / مُطِيعًا:mz / أَبَاهُ.:nasb", "Çocuk babasına itaat ederek yaşadı."], ["مَا:cerr / مُطِيعٌ:mz / العَاقُّ:nasb / أَبَاهُ.:nasb", "Asi evlat babasına itaat etmez."], ["أَ:cerr / مُطِيعٌ:mz / أَنْتَ:nasb / أَبَاكَ؟:nasb", "Babana itaat ediyor musun?"], ["عَلِيٌّ:x / مُطِيعُ:mz / أَبِيهِ.:nasb", "Ali babasına itaatkârdır."]],
  [["المُتْقَنُ:mz / طَبْعُهُ:nasb / يُبَاعُ سَرِيعًا.:x", "Baskısı özenli olan (kitap) çabuk satılır."], ["الكِتَابُ:x / مُتْقَنٌ:mz / طَبْعُهُ.:nasb", "Kitabın baskısı özenli."], ["هَذَا كِتَابٌ:x / مُتْقَنٌ:mz / طَبْعُهُ.:nasb", "Bu, baskısı özenli bir kitap."], ["صَدَرَ الكِتَابُ:x / مُتْقَنًا:mz / طَبْعُهُ.:nasb", "Kitap baskısı özenli olarak çıktı."], ["مَا:cerr / مُتْقَنٌ:mz / طَبْعُ:nasb / هَذَا الكِتَابِ.:x", "Bu kitabın baskısı özenli değil."], ["أَ:cerr / مُتْقَنٌ:mz / طَبْعُ:nasb / الكِتَابِ؟:x", "Kitabın baskısı özenli mi?"], ["الكِتَابُ:x / مُتْقَنُ:mz / الطَّبْعِ.:nasb", "Kitap özenli baskılı."]],
  [["المَمْنُوحُ:mz / الجَائِزَةَ:nasb / سَعِيدٌ.:x", "Ödül verilen kişi mutludur."], ["سَعِيدٌ:x / مَمْنُوحٌ:mz / الجَائِزَةَ.:nasb", "Saîd’e ödül verildi."], ["هَذَا طَالِبٌ:x / مَمْنُوحٌ:mz / الجَائِزَةَ.:nasb", "Bu, ödül verilen bir öğrenci."], ["خَرَجَ الطَّالِبُ:x / مَمْنُوحًا:mz / جَائِزَةً.:nasb", "Öğrenci ödül almış olarak çıktı."], ["مَا:cerr / مَمْنُوحٌ:mz / الكَسُولُ:nasb / جَائِزَةً.:nasb", "Tembele ödül verilmez."], ["أَ:cerr / مَمْنُوحَةٌ:mz / المَرْأَةُ:nasb / حُقُوقَهَا؟:nasb", "Kadına hakları veriliyor mu?"], ["سَعِيدٌ:x / مَمْنُوحُ:mz / الجَائِزَةِ.:nasb", "Saîd ödüllüdür."]]
];
var AN = [
  "Harf-i tarifli olunca hiçbir şart aranmadan amel eder.",
  "Mübtedânın (ya da nâsihin) haberi olunca amel eder.",
  "Bir isme sıfat olunca amel eder.",
  "Hâl olunca amel eder.",
  "Nefiyden sonra gelince amel eder; ardındaki isim fâil / nâib-i fâil olarak haberin yerini tutar.",
  "İstifhamdan sonra gelince amel eder.",
  "Ma’mûlüne izafet edilebilir: tenvin düşer, ma’mûl mecrûr olur."
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
// Âmil + ma’mûl + sebep: [cümle, [âmil ×3], [ma’mûl ×3], sebep anahtarı, Türkçe, açıklama]
var SBA = { l: "مُعَرَّفٌ بِـ«الْـ»", h: "خَبَرٌ", s: "صِفَةٌ", a: "حَالٌ", n: "مَسْبُوقٌ بِنَفْيٍ", i: "مَسْبُوقٌ بِاسْتِفْهَامٍ" };
var TSA = { l: ["l", "h", "s"], h: ["h", "s", "a"], s: ["s", "h", "a"], a: ["a", "s", "h"], n: ["n", "i", "h"], i: ["i", "n", "h"] };
function AMS(x, i) { return CBP([x[0] + "<br>العَامِلُ:", x[1], "<br>المَعْمُولُ:", x[2], "<br>سَبَبُ العَمَلِ:", TSA[x[3]].map(function (k) { return SBA[k]; })], i, x[4], x[5]); }
// Âyet i’rabı: [âyet, kelime1, [i’rab ×3], kelime2, [i’rab ×3], Türkçe, açıklama]
function AYI(x, i) { return CBP([x[0] + "<br><b>" + x[1] + "</b>:", x[2], "<br><b>" + x[3] + "</b>:", x[4]], i, x[5], x[6]); }

var METIN = "دَخَلَ سَلِيمٌ المُسْتَشْفَى حَامِلًا ابْنَهُ الصَّغِيرَ، وَكَانَ الوَلَدُ مَكْسُورَةً ذِرَاعُهُ. اسْتَقْبَلَهُمَا مُمَرِّضٌ مُبْتَسِمٌ وَجْهُهُ، وَقَالَ: أَمُنْتَظِرٌ أَنْتَ الطَّبِيبَ؟ قَالَ سَلِيمٌ: نَعَمْ، وَمَا صَابِرٌ ابْنِي عَلَى الأَلَمِ." +
  "<br>بَعْدَ دَقَائِقَ جَاءَ الطَّبِيبُ المُعَالِجُ الأَطْفَالَ، فَفَحَصَ الذِّرَاعَ وَقَالَ: العَظْمُ مَكْسُورٌ طَرَفُهُ، وَلَكِنَّ الأَمْرَ سَهْلٌ. ثُمَّ وَضَعَ الجَبِيرَةَ، فَخَرَجَ الوَلَدُ مِنَ الغُرْفَةِ مَرْبُوطَةً ذِرَاعُهُ، شَاكِرًا الطَّبِيبَ." +
  "<br>قَالَ سَلِيمٌ: إِنَّ الطَّبِيبَ رَجُلٌ مُتْقِنٌ عَمَلَهُ، وَالمُحْسِنُ إِلَى النَّاسِ مَحْبُوبٌ عِنْدَ اللهِ.";

var UNITS = [
// ---------------------------------------------------------------- 1 · İSM-İ FÂİLİN AMELİ
{
  id: "u1", no: 1, ar: "عَمَلُ اسْمِ الفَاعِلِ", tr: "İsm-i Fâilin Ameli", short: "İsm-i fâil", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["İsm-i fâilin fiili gibi amel ettiğini bilmek: fâilini ref, mef’ûlünü nasb eder", "Lâzım fiilden gelen ism-i fâilin yalnız fâil aldığını görmek", "Boşluğa ism-i fâilin doğru biçimini koymak"],
  examples: [
    { s: "التَّارِكُ:mz / عَمَلَهُ:nasb / لِلْغَدِ نَادِمٌ.:x", tr: "İşini yarına bırakan pişman olur. (mef’ûl: عَمَلَهُ)", pair: "أَحْمَدُ:x / قَادِمٌ:mz / أَبُوهُ:nasb / مِنْ أَنْقَرَةَ.:x", pairTr: "Ahmed’in babası Ankara’dan geliyor. (fâil: أَبُوهُ)" },
    { s: "هَذَا وَلَدٌ:x / مُطِيعٌ:mz / أَبَاهُ.:nasb", tr: "Bu, babasına itaat eden bir çocuk.", pair: "يَتَحَدَّثُ الرَّجُلُ:x / رَافِعًا:mz / صَوْتَهُ.:nasb", pairTr: "Adam sesini yükselterek konuşuyor." },
    { s: "مَا:cerr / جَالِسٌ:mz / الطَّالِبُ:nasb / فِي مَكَانِهِ.:x", tr: "Öğrenci yerinde oturmuyor.", pair: "أَ:cerr / مُقِيمٌ:mz / عَمُّكَ:nasb / فِي المَدِينَةِ؟:x", pairTr: "Amcan şehirde mi oturuyor?" }
  ],
  rules: [
    { tr: "<b>İsm-i fâil</b> fiilinin amelini yapar: <b>fâilini ref</b>, fiili müteaddiyse <b>mef’ûlünü nasb</b> eder.", ex: ["يَتْرُكُ عَمَلَهُ ← التَّارِكُ عَمَلَهُ", "يَقْدَمُ أَبُوهُ ← قَادِمٌ أَبُوهُ"] },
    { tr: "Fiil lâzımsa ism-i fâil yalnız fâil alır: <span class=\"ar\">قَادِمٌ أَبُوهُ · جَالِسٌ الطَّالِبُ</span>. Fâil açık değilse gizli zamirdir: <span class=\"ar\">العَاقِلُ مُبْتَعِدٌ عَنِ الأَشْرَارِ</span> (<span class=\"ar\">مُبْتَعِدٌ</span>’ın fâili gizli هُوَ)." },
    { tr: "İsm-i fâil cinsiyette mübtedâya değil, kendi fâiline uyar: <span class=\"ar\">سَلْمَى مُسَافِرٌ أَبُوهَا</span>." },
    { tr: "Fâil açıkça zikredilince ism-i fâil müfred kalır (fiil gibi): <span class=\"ar\">مُصْطَفَى رَجُلٌ نَاجِحٌ أَبْنَاؤُهُ</span>." }
  ],
  kaide: ["١ ـ يَعْمَلُ اسْمُ الفَاعِلِ عَمَلَ فِعْلِهِ؛ فَيَرْفَعُ الفَاعِلَ وَيَنْصِبُ المَفْعُولَ، مِثْلُ: أَحْمَدُ قَادِمٌ أَبُوهُ مِنْ أَنْقَرَةَ. التَّارِكُ عَمَلَهُ لِلْغَدِ نَادِمٌ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "امْلَإِ الفَرَاغَ بِاسْمِ الفَاعِلِ المُنَاسِبِ مَعَ ضَبْطِ الجُمْلَةِ بِالشَّكْلِ", tr: "Boşluğa ism-i fâilin doğru biçimini seç.", exHtml: "<span class=\"ar\">وَصَلْتُ إِلَى العَمَلِ رَاكِبًا السَّيَّارَةَ (رَاكِبٌ – رَاكِبًا – رَاكِبٍ)</span>", items: PL([
      ["مَا ___ المَرِيضُ نُصْحَ الطَّبِيبِ.", "مُتَّبِعٌ", "مُتَّبِعًا", "مُتَّبِعٍ", "Hasta doktorun tavsiyesine uymuyor.", "Nefiyden sonra mübtedâ: merfû; المَرِيضُ fâili, نُصْحَ mef’ûlü."],
      ["العَاقِلُ ___ عَنْ مُصَاحَبَةِ الأَشْرَارِ.", "مُبْتَعِدٌ", "مُبْتَعِدًا", "مُبْتَعِدٍ", "Akıllı kişi kötülerle arkadaşlıktan uzak durur.", "Haber: merfû; fâili gizli zamir."],
      ["أَ___ أَنْتَ عَنِ التَّعْبِيرِ عَنْ رَأْيِكَ؟", "عَاجِزٌ", "عَاجِزًا", "عَاجِزٍ", "Fikrini ifade etmekten âciz misin?", "İstifhamdan sonra mübtedâ; أَنْتَ fâili."],
      ["سَلْمَى ___ أَبُوهَا إِلَى لَنْدَنَ لِلْعَمَلِ.", "مُسَافِرٌ", "مُسَافِرًا", "مُسَافِرٍ", "Selmâ’nın babası çalışmak için Londra’ya gidiyor.", "Haber; fâili أَبُوهَا (müzekker)."],
      ["مُصْطَفَى رَجُلٌ ___ أَبْنَاؤُهُ.", "نَاجِحٌ", "نَاجِحًا", "نَاجِحٍ", "Mustafa, oğulları başarılı bir adam.", "رَجُلٌ’e sıfat: merfû; fâili أَبْنَاؤُهُ."],
      ["شَاهَدَ المُتَفَرِّجُونَ المُبَارَاةَ ___ فَرِيقَهُمْ.", "مُشَجِّعِينَ", "مُشَجِّعُونَ", "مُشَجِّعٌ", "Seyirciler maçı takımlarını destekleyerek izledi.", "Hâl: mansûb (yâ ile)."],
      ["مَا ___ أَحَدٌ شَايًا فِي المَقْصَفِ.", "شَارِبٌ", "شَارِبًا", "شَارِبٍ", "Kantinde kimse çay içmiyor.", "Nefiyden sonra mübtedâ; أَحَدٌ fâili, شَايًا mef’ûlü."],
      ["___ قِيمَةَ الوَقْتِ لَا يَقْضِيهِ بِالأُمُورِ التَّافِهَةِ.", "العَارِفُ", "العَارِفَ", "العَارِفِ", "Vaktin değerini bilen onu boş işlerle geçirmez.", "Harf-i tarifli, mübtedâ; قِيمَةَ mef’ûlü."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اضْبِطْ مَعْمُولَ اسْمِ الفَاعِلِ", tr: "İsm-i fâilin ma’mûlünü doğru harekeyle seç.", items: PL([
      ["التَّارِكُ ___ لِلْغَدِ نَادِمٌ.", "عَمَلَهُ", "عَمَلُهُ", "عَمَلِهِ", "İşini yarına bırakan pişman olur.", "Mef’ûl: mansûb."],
      ["أَحْمَدُ قَادِمٌ ___ مِنْ أَنْقَرَةَ.", "أَبُوهُ", "أَبَاهُ", "أَبِيهِ", "Ahmed’in babası Ankara’dan geliyor.", "Fâil: merfû."],
      ["هَذَا وَلَدٌ مُطِيعٌ ___.", "أَبَاهُ", "أَبُوهُ", "أَبِيهِ", "Bu, babasına itaat eden bir çocuk.", "Mef’ûl: mansûb."],
      ["يَتَحَدَّثُ الرَّجُلُ رَافِعًا ___.", "صَوْتَهُ", "صَوْتُهُ", "صَوْتِهِ", "Adam sesini yükselterek konuşuyor.", "Mef’ûl."],
      ["مَا جَالِسٌ ___ فِي مَكَانِهِ.", "الطَّالِبُ", "الطَّالِبَ", "الطَّالِبِ", "Öğrenci yerinde oturmuyor.", "Fâil."],
      ["أَمُقِيمٌ ___ فِي المَدِينَةِ؟", "عَمُّكَ", "عَمَّكَ", "عَمِّكَ", "Amcan şehirde mi oturuyor?", "Fâil."],
      ["خَالِدٌ مُدَرِّسٌ ___ العَرَبِيَّةَ.", "اللُّغَةَ", "اللُّغَةُ", "اللُّغَةِ", "Hâlid Arapça öğretiyor.", "Tenvinli: mef’ûl mansûb (izafetle: مُدَرِّسُ اللُّغَةِ)."],
      ["عَبْدُ الصَّمَدِ قَارِئٌ مُؤَثِّرٌ ___.", "صَوْتُهُ", "صَوْتَهُ", "صَوْتِهِ", "Abdussamed sesi etkileyici bir okuyucu.", "أَثَّرَ burada fâil alıyor: merfû."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · İSM-İ MEF’ÛLÜN AMELİ
{
  id: "u2", no: 2, ar: "عَمَلُ اسْمِ المَفْعُولِ", tr: "İsm-i Mef’ûlün Ameli", short: "İsm-i mef’ûl", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["İsm-i mef’ûlün meçhul fiili gibi amel ettiğini bilmek: nâib-i fâilini ref eder", "İki mef’ûl alan fiilden gelen ism-i mef’ûlün ikinci mef’ûlü nasb ettiğini görmek", "İsm-i fâil ile ism-i mef’ûlü ayırmak"],
  examples: [
    { s: "الكِتَابُ:x / مُتْقَنٌ:mz / طَبْعُهُ.:nasb", tr: "Kitabın baskısı özenli. (nâib-i fâil: طَبْعُهُ)", pair: "المَمْنُوحُ:mz / الجَائِزَةَ:nasb / سَعِيدٌ.:x", pairTr: "Ödül verilen mutludur. (mef’ûl: الجَائِزَةَ)" },
    { s: "هَذَا عَمَلٌ:x / مَعْرُوفَةٌ:mz / قِيمَتُهُ.:nasb", tr: "Bu, değeri bilinen bir iş.", pair: "يَتَحَدَّثُ الرَّجُلُ:x / مَسْمُوعًا:mz / صَوْتُهُ.:nasb", pairTr: "Adam sesi duyularak konuşuyor." },
    { s: "مَا:cerr / مَخْذُولٌ:mz / المُخْلِصُونَ.:nasb", tr: "İhlaslılar yardımsız bırakılmaz.", pair: "أَ:cerr / مَسْمُوعٌ:mz / صَوْتُ:nasb / المُؤَذِّنِ؟:x", pairTr: "Müezzinin sesi duyuluyor mu?" }
  ],
  rules: [
    { tr: "<b>İsm-i mef’ûl</b> <b>meçhul fiili</b> gibi amel eder: <b>nâib-i fâilini ref</b> eder.", ex: ["يُتْقَنُ طَبْعُهُ ← مُتْقَنٌ طَبْعُهُ", "يُعْرَفُ قِيمَتُهُ ← مَعْرُوفَةٌ قِيمَتُهُ"] },
    { tr: "Fiil iki mef’ûl alıyorsa (<span class=\"ar\">مَنَحَ · أَعْطَى</span>) ism-i mef’ûl birinciyi nâib-i fâil yapar, ikinciyi <b>nasb</b> eder: <span class=\"ar\">المَمْنُوحُ الجَائِزَةَ</span> (nâib-i fâil gizli zamir, <span class=\"ar\">الجَائِزَةَ</span> mef’ûl)." },
    { tr: "İsm-i mef’ûl, nâib-i fâiliyle cinsiyette uyuşur: <span class=\"ar\">عَمَلٌ مَعْرُوفَةٌ قِيمَتُهُ</span> (<span class=\"ar\">قِيمَةٌ</span> müennes)." },
    { tr: "Biçimden ayırt et: <span class=\"ar\">مُتْقِنٌ</span> (ism-i fâil, “özenle yapan”) – <span class=\"ar\">مُتْقَنٌ</span> (ism-i mef’ûl, “özenle yapılmış”)." }
  ],
  kaide: ["٢ ـ يَعْمَلُ اسْمُ المَفْعُولِ عَمَلَ فِعْلِهِ المَجْهُولِ؛ فَيَرْفَعُ نَائِبَ الفَاعِلِ، وَيَنْصِبُ المَفْعُولَ إِنْ كَانَ فِعْلُهُ يَنْصِبُ المَفْعُولَ، مِثْلُ: الكِتَابُ مُتْقَنٌ طَبْعُهُ. المَمْنُوحُ الجَائِزَةَ سَعِيدٌ."],
  ex: [
    { type: "pick", fill: true, num: "٤", ar: "امْلَإِ الفَرَاغَ بِاسْمِ المَفْعُولِ مَعَ ضَبْطِ الجُمْلَةِ بِالشَّكْلِ", tr: "Boşluğa uygun ism-i mef’ûlü doğru biçimde seç.", exHtml: "<span class=\"ar\">العِلْمُ مَعْرُوفَةٌ فَوَائِدُهُ.</span>", items: PL([
      ["الغُرْفَةُ ___ نَوَافِذُهَا.", "مَفْتُوحَةٌ", "مَفْتُوحَةً", "فَاتِحَةٌ", "Odanın pencereleri açık.", "Haber: merfû; نَوَافِذُهَا nâib-i fâil."],
      ["رَأَيْتُ الأَشْجَارَ ___ أَغْصَانُهَا.", "مَقْطُوعَةً", "مَقْطُوعَةٌ", "قَاطِعَةً", "Ağaçları dalları kesilmiş gördüm.", "Hâl: mansûb; أَغْصَانُهَا nâib-i fâil."],
      ["___ مَالُهُ حَزِينٌ.", "المَسْرُوقُ", "المَسْرُوقَ", "السَّارِقُ", "Malı çalınan kişi üzgündür.", "Harf-i tarifli mübtedâ; مَالُهُ nâib-i fâil."],
      ["هَؤُلَاءِ أَبْطَالٌ ___ سِيَرُهُمْ فِي كُتُبِ التَّارِيخِ.", "مَكْتُوبَةٌ", "مَكْتُوبَةً", "كَاتِبَةٌ", "Bunlar hayat hikâyeleri tarih kitaplarında yazılı kahramanlardır.", "Sıfat: merfû; سِيَرُهُمْ (müennes) nâib-i fâil."],
      ["كُلُّ رَاعٍ ___ عَنْ رَعِيَّتِهِ.", "مَسْئُولٌ", "مَسْئُولًا", "سَائِلٌ", "Her çoban sürüsünden sorumludur.", "Haber: merfû."],
      ["كَانَ أَبِي رَجُلًا ___ دُعَاؤُهُ.", "مُسْتَجَابًا", "مُسْتَجَابٌ", "مُسْتَجِيبًا", "Babam duası kabul edilen bir adamdı.", "رَجُلًا’ya sıfat: mansûb."],
      ["خَرَجَ الحَاجُّ مِنَ الإِحْرَامِ ___ رَأْسُهُ.", "مَحْلُوقًا", "مَحْلُوقٌ", "حَالِقًا", "Hacı başı tıraş edilmiş olarak ihramdan çıktı.", "Hâl: mansûb."],
      ["الكِتَابُ ___ صَفَحَاتُهُ لِأَخِي.", "المُمَزَّقَةُ", "المُمَزَّقَ", "المُمَزِّقَةُ", "Sayfaları yırtılmış kitap kardeşimin.", "Harf-i tarifli sıfat; nâib-i fâil صَفَحَاتُهُ müennes."]
    ])},
    { type: "classify", extra: true, opts: FM, ar: "اسْمُ فَاعِلٍ أَمِ اسْمُ مَفْعُولٍ؟", tr: "Koyu âmil ism-i fâil mi, ism-i mef’ûl mü?", items: CL([
      [HL("التَّارِكُ عَمَلَهُ لِلْغَدِ نَادِمٌ.", "التَّارِكُ"), "f", "فَاعِلٌ vezni."],
      [HL("أَحْمَدُ قَادِمٌ أَبُوهُ.", "قَادِمٌ"), "f", "فَاعِلٌ."],
      [HL("مَا جَالِسٌ الطَّالِبُ.", "جَالِسٌ"), "f", "فَاعِلٌ."],
      [HL("أَمُقِيمٌ عَمُّكَ فِي المَدِينَةِ؟", "مُقِيمٌ"), "f", "مُفْعِلٌ: ism-i fâil."],
      [HL("هَذَا وَلَدٌ مُطِيعٌ أَبَاهُ.", "مُطِيعٌ"), "f", "مُفْعِلٌ."],
      [HL("يَتَحَدَّثُ رَافِعًا صَوْتَهُ.", "رَافِعًا"), "f", "فَاعِلٌ."],
      [HL("رَجُلُ البَرِيدِ مُسَلِّمٌ الطَّرْدَ.", "مُسَلِّمٌ"), "f", "Sondan bir önceki harf kesreli."],
      [HL("الطَّبِيبُ رَجُلٌ مُتْقِنٌ عَمَلَهُ.", "مُتْقِنٌ"), "f", "Kesre: ism-i fâil."],
      [HL("المَمْنُوحُ الجَائِزَةَ سَعِيدٌ.", "المَمْنُوحُ"), "m", "مَفْعُولٌ vezni."],
      [HL("الكِتَابُ مُتْقَنٌ طَبْعُهُ.", "مُتْقَنٌ"), "m", "Fetha: ism-i mef’ûl."],
      [HL("مَا مَخْذُولٌ المُخْلِصُونَ.", "مَخْذُولٌ"), "m", "مَفْعُولٌ."],
      [HL("أَمَسْمُوعٌ صَوْتُ المُؤَذِّنِ؟", "مَسْمُوعٌ"), "m", "مَفْعُولٌ."],
      [HL("هَذَا عَمَلٌ مَعْرُوفَةٌ قِيمَتُهُ.", "مَعْرُوفَةٌ"), "m", "مَفْعُولَةٌ."],
      [HL("يَتَحَدَّثُ مَسْمُوعًا صَوْتُهُ.", "مَسْمُوعًا"), "m", "مَفْعُولٌ."],
      [HL("الكِتَابُ مُتَّخَذٌ صَدِيقًا.", "مُتَّخَذٌ"), "m", "Sondan bir önceki harf fethalı."],
      [HL("﴿وَهُوَ مُحَرَّمٌ عَلَيْكُمْ إِخْرَاجُهُمْ﴾", "مُحَرَّمٌ"), "m", "Fetha: ism-i mef’ûl."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · AMELİN ŞARTLARI
{
  id: "u3", no: 3, ar: "شُرُوطُ عَمَلِهِمَا", tr: "Amelin Şartları", short: "Şartlar", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["İsm-i fâil ve mef’ûlün amel ettiği altı durumu bilmek", "Cümlede âmili, ma’mûlü ve amel sebebini göstermek"],
  examples: [
    { s: "التَّارِكُ:mz / عَمَلَهُ:nasb / لِلْغَدِ نَادِمٌ.:x", tr: "(harf-i tarifli)", pair: "أَحْمَدُ:x / قَادِمٌ:mz / أَبُوهُ:nasb / مِنْ أَنْقَرَةَ.:x", pairTr: "(haber)" },
    { s: "هَذَا وَلَدٌ:x / مُطِيعٌ:mz / أَبَاهُ.:nasb", tr: "(sıfat)", pair: "يَتَحَدَّثُ الرَّجُلُ:x / رَافِعًا:mz / صَوْتَهُ.:nasb", pairTr: "(hâl)" },
    { s: "مَا:cerr / جَالِسٌ:mz / الطَّالِبُ:nasb / فِي مَكَانِهِ.:x", tr: "(nefiyden sonra)", pair: "أَ:cerr / مَسْمُوعٌ:mz / صَوْتُ:nasb / المُؤَذِّنِ؟:x", pairTr: "(istifhamdan sonra)" }
  ],
  rules: [
    { tr: "İsm-i fâil ve ism-i mef’ûl şu durumlarda amel eder:", ex: ["أ مُعَرَّفٌ بِـ«الْـ»: التَّارِكُ عَمَلَهُ · المَمْنُوحُ الجَائِزَةَ", "ب خَبَرٌ: أَحْمَدُ قَادِمٌ أَبُوهُ · الكِتَابُ مُتْقَنٌ طَبْعُهُ", "جـ صِفَةٌ: وَلَدٌ مُطِيعٌ أَبَاهُ · عَمَلٌ مَعْرُوفَةٌ قِيمَتُهُ", "د حَالٌ: رَافِعًا صَوْتَهُ · مَسْمُوعًا صَوْتُهُ", "هـ بَعْدَ نَفْيٍ: مَا جَالِسٌ الطَّالِبُ · مَا مَخْذُولٌ المُخْلِصُونَ", "و بَعْدَ اسْتِفْهَامٍ: أَمُقِيمٌ عَمُّكَ؟ · أَمَسْمُوعٌ صَوْتُ المُؤَذِّنِ؟"] },
    { tr: "Harf-i tarifli olan hiçbir şart aramadan amel eder. Harf-i tarifsiz (tenvinli) olan ise haber, sıfat, hâl olunca ya da nefy / istifhamdan sonra gelince amel eder." },
    { tr: "Nefy ya da istifhamdan sonra gelen ism-i fâil / mef’ûl mübtedâdır; ardındaki merfû isim fâil ya da nâib-i fâildir ve haberin yerini tutar: <span class=\"ar\">مَا جَالِسٌ الطَّالِبُ</span>." },
    { tr: "Nâsihlerin haberi de “haber” sayılır: <span class=\"ar\">الكِتَابُ مَحْفُوظٌ حَقُّ طَبْعِهِ · ﴿إِنِّي جَاعِلٌ فِي الأَرْضِ خَلِيفَةً﴾</span>." }
  ],
  kaide: ["٣ ـ اسْمُ الفَاعِلِ وَاسْمُ المَفْعُولِ يَعْمَلَانِ عَمَلَ فِعْلِهِمَا: أ ـ إِذَا دَخَلَتْ عَلَيْهِمَا لَامُ التَّعْرِيفِ (الْـ)، مِثْلُ: التَّارِكُ عَمَلَهُ لِلْغَدِ نَادِمٌ، المَمْنُوحُ الجَائِزَةَ سَعِيدٌ. ب ـ إِذَا كَانَا خَبَرَيْنِ، مِثْلُ: أَحْمَدُ قَادِمٌ أَبُوهُ مِنْ أَنْقَرَةَ، الكِتَابُ مُتْقَنٌ طَبْعُهُ. جـ ـ إِذَا كَانَا صِفَتَيْنِ، مِثْلُ: هَذَا وَلَدٌ مُطِيعٌ أَبَاهُ، هَذَا عَمَلٌ مَعْرُوفَةٌ قِيمَتُهُ. د ـ إِذَا كَانَا حَالَيْنِ، مِثْلُ: يَتَحَدَّثُ الرَّجُلُ رَافِعًا صَوْتَهُ، يَتَحَدَّثُ الرَّجُلُ مَسْمُوعًا صَوْتُهُ. هـ ـ إِذَا كَانَا مَسْبُوقَيْنِ بِنَفْيٍ، مِثْلُ: مَا جَالِسٌ الطَّالِبُ فِي مَكَانِهِ، مَا مَخْذُولٌ المُخْلِصُونَ. و ـ إِذَا كَانَا مَسْبُوقَيْنِ بِاسْتِفْهَامٍ، مِثْلُ: أَمُقِيمٌ عَمُّكَ فِي المَدِينَةِ؟ أَمَسْمُوعٌ صَوْتُ المُؤَذِّنِ؟"],
  ex: [
    { type: "combo", num: "١", ar: "عَيِّنِ اسْمَ الفَاعِلِ وَاسْمَ المَفْعُولِ وَمَعْمُولَهُمَا فِيمَا يَأْتِي وَبَيِّنْ سَبَبَ عَمَلِهِ", tr: "Âmili, ma’mûlünü ve amel sebebini seç.", exHtml: "<span class=\"ar\">عَبْدُ الصَّمَدِ قَارِئٌ مُؤَثِّرٌ صَوْتُهُ ← مُؤَثِّرٌ: اسْمُ الفَاعِلِ · صَوْتُهُ: مَعْمُولُهُ · سَبَبُ عَمَلِهِ: صِفَةٌ لِـ«قَارِئٌ»</span>", items: [
      ["الطَّالِبُ العِلْمَ يَحْصُلُ عَلَيْهِ بِإِذْنِ اللهِ.", ["الطَّالِبُ", "يَحْصُلُ", "إِذْنِ"], ["العِلْمَ", "اللهِ", "عَلَيْهِ"], "l", "İlmi arayan, Allah’ın izniyle ona ulaşır.", "Harf-i tarifli ism-i fâil; العِلْمَ mef’ûlü."],
      ["الكِتَابُ مَحْفُوظٌ حَقُّ طَبْعِهِ عِنْدَ المُؤَلِّفِ.", ["مَحْفُوظٌ", "الكِتَابُ", "المُؤَلِّفِ"], ["حَقُّ", "طَبْعِهِ", "المُؤَلِّفِ"], "h", "Kitabın baskı hakkı yazarda saklıdır.", "Haber ism-i mef’ûl; حَقُّ nâib-i fâil."],
      ["مَا مُضِيعٌ اللهُ عَمَلَ عَامِلٍ.", ["مُضِيعٌ", "عَامِلٍ", "عَمَلَ"], ["اللهُ وَعَمَلَ", "عَامِلٍ", "عَمَلَ فَقَطْ"], "n", "Allah hiçbir çalışanın amelini zayi etmez.", "Nefiyden sonra; اللهُ fâil, عَمَلَ mef’ûl."],
      ["أَمَمْنُوحَةٌ المَرْأَةُ حُقُوقَهَا؟", ["مَمْنُوحَةٌ", "حُقُوقَهَا", "المَرْأَةُ"], ["المَرْأَةُ وَحُقُوقَهَا", "حُقُوقَهَا فَقَطْ", "المَرْأَةُ فَقَطْ"], "i", "Kadına hakları veriliyor mu?", "İstifhamdan sonra; المَرْأَةُ nâib-i fâil, حُقُوقَهَا mef’ûl."],
      ["أَفَاهِمٌ الطُّلَّابُ شَرْحَ المُعَلِّمِ؟", ["فَاهِمٌ", "الطُّلَّابُ", "شَرْحَ"], ["الطُّلَّابُ وَشَرْحَ", "المُعَلِّمِ", "شَرْحَ فَقَطْ"], "i", "Öğrenciler öğretmenin anlatımını anlıyor mu?", "İstifhamdan sonra; الطُّلَّابُ fâil, شَرْحَ mef’ûl."],
      ["إِنَّ الغَافِرَ ذُنُوبَ العِبَادِ هُوَ اللهُ.", ["الغَافِرَ", "ذُنُوبَ", "العِبَادِ"], ["ذُنُوبَ", "العِبَادِ", "اللهُ"], "l", "Kulların günahlarını bağışlayan Allah’tır.", "Harf-i tarifli; ذُنُوبَ mef’ûl."],
      ["إِنَّ رَجُلًا صَالِحَةً زَوْجَتُهُ فِي سَعَادَةٍ.", ["صَالِحَةً", "رَجُلًا", "سَعَادَةٍ"], ["زَوْجَتُهُ", "رَجُلًا", "سَعَادَةٍ"], "s", "Hanımı salih olan adam mutluluk içindedir.", "رَجُلًا’ya sıfat; زَوْجَتُهُ fâil."],
      ["خَرَجَ الطَّالِبُ مِنَ الغُرْفَةِ مَمْنُوحًا جَائِزَةً.", ["مَمْنُوحًا", "الطَّالِبُ", "الغُرْفَةِ"], ["جَائِزَةً", "الغُرْفَةِ", "الطَّالِبُ"], "a", "Öğrenci odadan ödül almış olarak çıktı.", "Hâl; nâib-i fâil gizli zamir, جَائِزَةً mef’ûl."]
    ].map(AMS) },
    { type: "classify", extra: true, opts: SB, ar: "مَا سَبَبُ عَمَلِهِ؟", tr: "Koyu âmil neden amel ediyor?", items: CL([
      [HL("التَّارِكُ عَمَلَهُ لِلْغَدِ نَادِمٌ.", "التَّارِكُ"), "l", "Harf-i tarifli."],
      [HL("المَمْنُوحُ الجَائِزَةَ سَعِيدٌ.", "المَمْنُوحُ"), "l", "Harf-i tarifli."],
      [HL("﴿وَالذَّاكِرِينَ اللهَ كَثِيرًا﴾", "الذَّاكِرِينَ"), "l", "Harf-i tarifli."],
      [HL("أَحْمَدُ قَادِمٌ أَبُوهُ مِنْ أَنْقَرَةَ.", "قَادِمٌ"), "h", "Haber."],
      [HL("الكِتَابُ مُتْقَنٌ طَبْعُهُ.", "مُتْقَنٌ"), "h", "Haber."],
      [HL("﴿إِنِّي جَاعِلٌ فِي الأَرْضِ خَلِيفَةً﴾", "جَاعِلٌ"), "h", "إِنَّ’nin haberi."],
      [HL("هَذَا وَلَدٌ مُطِيعٌ أَبَاهُ.", "مُطِيعٌ"), "s", "Sıfat."],
      [HL("هَذَا عَمَلٌ مَعْرُوفَةٌ قِيمَتُهُ.", "مَعْرُوفَةٌ"), "s", "Sıfat."],
      [HL("﴿شَرَابٌ مُخْتَلِفٌ أَلْوَانُهُ﴾", "مُخْتَلِفٌ"), "s", "Sıfat."],
      [HL("يَتَحَدَّثُ الرَّجُلُ رَافِعًا صَوْتَهُ.", "رَافِعًا"), "a", "Hâl."],
      [HL("يَتَحَدَّثُ الرَّجُلُ مَسْمُوعًا صَوْتُهُ.", "مَسْمُوعًا"), "a", "Hâl."],
      [HL("مَا جَالِسٌ الطَّالِبُ فِي مَكَانِهِ.", "جَالِسٌ"), "n", "Nefiyden sonra."],
      [HL("مَا مَخْذُولٌ المُخْلِصُونَ.", "مَخْذُولٌ"), "n", "Nefiyden sonra."],
      [HL("أَمُقِيمٌ عَمُّكَ فِي المَدِينَةِ؟", "مُقِيمٌ"), "i", "İstifhamdan sonra."],
      [HL("أَمَسْمُوعٌ صَوْتُ المُؤَذِّنِ؟", "مَسْمُوعٌ"), "i", "İstifhamdan sonra."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · HAREKE VE DÖNÜŞTÜRME
{
  id: "u4", no: 4, ar: "ضَبْطُ المَعْمُولِ وَوَضْعُ الاسْمِ مَكَانَ الفِعْلِ", tr: "Ma’mûlün Harekesi ve Fiilden İsme", short: "Dönüştür", col: "mi", legend: ["mz", "nasb"],
  goals: ["Ma’mûlün fâil / nâib-i fâil mi (merfû), mef’ûl mü (mansûb), muzâfun ileyh mi (mecrûr) olduğunu bulmak", "Fiilin yerine ism-i fâil ya da ism-i mef’ûl koymak"],
  examples: [
    { s: "هَذَا مَكَانٌ:x / مَمْنُوعٌ:mz / التَّدْخِينُ:nasb / فِيهِ.:x", tr: "Burası sigara içmenin yasak olduğu bir yer. (nâib-i fâil merfû)", pair: "عِيسَى:x / بَائِعٌ:mz / الكُتُبَ:nasb / فِي السُّوقِ.:x", pairTr: "Îsâ çarşıda kitap satıyor. (mef’ûl mansûb)" },
    { s: "رَجُلُ البَرِيدِ:x / يُسَلِّمُ:x / الطَّرْدَ مَسَاءً.:nasb", tr: "Postacı paketi akşam teslim eder.", pair: "رَجُلُ البَرِيدِ:x / مُسَلِّمٌ:mz / الطَّرْدَ:nasb / مَسَاءً.:x", pairTr: "Aynı anlam: ism-i fâil ile." }
  ],
  rules: [
    { tr: "Harekeyi seçmeden önce sor: âmil ism-i fâil mi, ism-i mef’ûl mü? Fiili lâzım mı, müteaddî mi?", ex: ["اسْمُ فَاعِلٍ + فَاعِلٌ ← مَرْفُوعٌ: مَكْسُورَةً ذِرَاعُهُ", "اسْمُ فَاعِلٍ + مَفْعُولٌ ← مَنْصُوبٌ: بَائِعٌ الكُتُبَ · حَامِلًا حَقِيبَتَهُ", "اسْمُ مَفْعُولٍ + نَائِبُ فَاعِلٍ ← مَرْفُوعٌ: المَسْرُوقَةُ حَقِيبَتُهُ", "بِلَا تَنْوِينٍ وَلَا «الْـ» ← إِضَافَةٌ: مُطَاعُ الأَوَامِرِ · مُسْتَجَابُ الدُّعَاءِ"] },
    { tr: "Muzâri <b>malûm</b> fiil → ism-i fâil; muzâri <b>meçhul</b> fiil → ism-i mef’ûl: <span class=\"ar\">يَحْمِلُ ← حَامِلٌ · يُتَّخَذُ ← مُتَّخَذٌ · تُغَطَّى ← مُغَطَّاةٌ</span>." },
    { tr: "Fiilin yerine geçen isim, cümledeki görevine göre i’rab alır (haber: merfû; hâl: mansûb); fâil açık zikredilince müfred kalır: <span class=\"ar\">الأَشْجَارُ مُتَسَاقِطَةٌ أَوْرَاقُهَا</span>." }
  ],
  kaide: ["امْلَإِ الفَرَاغَ بِكَلِمَةٍ مُنَاسِبَةٍ مِمَّا بَيْنَ القَوْسَيْنِ. ضَعْ فِي مَكَانِ كُلِّ فِعْلٍ اسْمَ الفَاعِلِ أَوِ اسْمَ المَفْعُولِ: رَجُلُ البَرِيدِ يُسَلِّمُ الطَّرْدَ مَسَاءً ← رَجُلُ البَرِيدِ مُسَلِّمٌ الطَّرْدَ مَسَاءً. الكِتَابُ يُتَّخَذُ صَدِيقًا ← الكِتَابُ مُتَّخَذٌ صَدِيقًا."],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "امْلَإِ الفَرَاغَ بِكَلِمَةٍ مُنَاسِبَةٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Boşluğa doğru harekeli kelimeyi seç.", exHtml: "<span class=\"ar\">هَذَا مَكَانٌ مَمْنُوعٌ التَّدْخِينُ فِيهِ (التَّدْخِينُ – التَّدْخِينَ – التَّدْخِينِ)</span>", items: PL([
      ["رَأَيْتُ فِي الحَدِيقَةِ بِنْتًا سَاقِيَةً ___.", "الأَشْجَارَ", "الأَشْجَارُ", "الأَشْجَارِ", "Bahçede ağaçları sulayan bir kız gördüm.", "İsm-i fâilin mef’ûlü: mansûb."],
      ["الدُّوَلُ المَحْرُومُ ___ لَيْسَتْ قَلِيلَةً.", "شَعْبُهَا", "شَعْبَهَا", "شَعْبِهَا", "Halkı mahrum bırakılmış ülkeler az değil.", "İsm-i mef’ûlün nâib-i fâili: merfû."],
      ["الرَّئِيسُ رَجُلٌ مُطَاعُ ___.", "الأَوَامِرِ", "أَوَامِرُهُ", "أَوَامِرَهُ", "Başkan emirleri dinlenen bir adam.", "مُطَاعُ tenvinsiz: izafet, muzâfun ileyh mecrûr."],
      ["رَأَى عَلِيٌّ صَدِيقَهُ مَكْسُورَةً ___.", "ذِرَاعُهُ", "ذِرَاعَهُ", "ذِرَاعِهِ", "Ali arkadaşını kolu kırık gördü.", "Nâib-i fâil: merfû."],
      ["المَظْلُومُ مُسْتَجَابُ ___.", "الدُّعَاءِ", "الدُّعَاءُ", "دُعَاءُهُ", "Mazlumun duası kabul olunur.", "Tenvinsiz: izafet."],
      ["عِيسَى بَائِعٌ ___ فِي السُّوقِ.", "الكُتُبَ", "الكُتُبُ", "الكُتُبِ", "Îsâ çarşıda kitap satıyor.", "Mef’ûl: mansûb."],
      ["دَخَلَ المُسَافِرُ المَطَارَ حَامِلًا ___.", "حَقِيبَتَهُ", "حَقِيبَتُهُ", "الحَقِيبَةِ", "Yolcu çantasını taşıyarak havalimanına girdi.", "Mef’ûl: mansûb."],
      ["الرَّجُلُ المَسْرُوقَةُ ___ اتَّصَلَ مُبَاشَرَةً بِالشُّرْطَةِ.", "حَقِيبَتُهُ", "حَقِيبَتَهُ", "حَقِيبَتِهِ", "Çantası çalınan adam hemen polisi aradı.", "Nâib-i fâil: merfû."]
    ])},
    { type: "pick", num: "٦", ar: "ضَعْ فِي مَكَانِ كُلِّ فِعْلٍ اسْمَ الفَاعِلِ أَوِ اسْمَ المَفْعُولِ", tr: "Fiilin yerine ism-i fâil / mef’ûl konmuş doğru cümleyi seç.", exHtml: "<span class=\"ar\">رَجُلُ البَرِيدِ يُسَلِّمُ الطَّرْدَ مَسَاءً ← مُسَلِّمٌ الطَّرْدَ · الكِتَابُ يُتَّخَذُ صَدِيقًا ← مُتَّخَذٌ صَدِيقًا</span>", items: PL([
      ["القُرْآنُ يَهْدِي النَّاسَ إِلَى سَعَادَةِ الدَّارَيْنِ.", "القُرْآنُ هَادٍ النَّاسَ إِلَى سَعَادَةِ الدَّارَيْنِ.", "القُرْآنُ هَادٍ النَّاسِ إِلَى سَعَادَةِ الدَّارَيْنِ.", "القُرْآنُ مَهْدِيٌّ النَّاسَ إِلَى سَعَادَةِ الدَّارَيْنِ.", "Kur’an insanları iki dünya mutluluğuna iletir.", "Malûm fiil → ism-i fâil; mef’ûl mansûb (izafetle: هَادِي النَّاسِ)."],
      ["طُوبَى لِمَنْ تُنْفَقُ أَمْوَالُهُمْ فِي الخَيْرَاتِ.", "طُوبَى لِلْمُنْفَقَةِ أَمْوَالُهُمْ فِي الخَيْرَاتِ.", "طُوبَى لِلْمُنْفِقَةِ أَمْوَالَهُمْ فِي الخَيْرَاتِ.", "طُوبَى لِلْمُنْفَقِينَ أَمْوَالُهُمْ فِي الخَيْرَاتِ.", "Malları hayırlara harcananlara ne mutlu!", "Meçhul → ism-i mef’ûl; nâib-i fâil أَمْوَالُهُمْ (müennes çoğul) olduğu için müfred müennes."],
      ["مَا يَهْتَمُّ بِعَاقِبَةِ الأُمُورِ إِلَّا العَاقِلُ.", "مَا مُهْتَمٌّ بِعَاقِبَةِ الأُمُورِ إِلَّا العَاقِلُ.", "مَا مُهْتَمًّا بِعَاقِبَةِ الأُمُورِ إِلَّا العَاقِلُ.", "مَا مُهْتَمُّونَ بِعَاقِبَةِ الأُمُورِ إِلَّا العَاقِلُ.", "İşlerin sonunu ancak akıllı düşünür.", "Nefiyden sonra mübtedâ: merfû; fâili العَاقِلُ."],
      ["الأَشْجَارُ تَتَسَاقَطُ أَوْرَاقُهَا فِي الخَرِيفِ.", "الأَشْجَارُ مُتَسَاقِطَةٌ أَوْرَاقُهَا فِي الخَرِيفِ.", "الأَشْجَارُ مُتَسَاقِطَةٌ أَوْرَاقَهَا فِي الخَرِيفِ.", "الأَشْجَارُ مُتَسَاقِطَاتٌ أَوْرَاقُهَا فِي الخَرِيفِ.", "Ağaçların yaprakları sonbaharda dökülür.", "Lâzım fiil → ism-i fâil; fâil أَوْرَاقُهَا merfû."],
      ["الأَرْضُ تُغَطَّى بِالثَّلْجِ فِي الشِّتَاءِ.", "الأَرْضُ مُغَطَّاةٌ بِالثَّلْجِ فِي الشِّتَاءِ.", "الأَرْضُ مُغَطِّيَةٌ بِالثَّلْجِ فِي الشِّتَاءِ.", "الأَرْضُ مُغَطًّى بِالثَّلْجِ فِي الشِّتَاءِ.", "Yer kışın karla örtülür.", "Meçhul → ism-i mef’ûl, müennes."],
      ["مَا يَسْتَغْنِي إِنْسَانٌ عَنِ الطَّعَامِ وَالشَّرَابِ.", "مَا مُسْتَغْنٍ إِنْسَانٌ عَنِ الطَّعَامِ وَالشَّرَابِ.", "مَا مُسْتَغْنًى إِنْسَانٌ عَنِ الطَّعَامِ وَالشَّرَابِ.", "مَا مُسْتَغْنِيًا إِنْسَانٌ عَنِ الطَّعَامِ وَالشَّرَابِ.", "Hiçbir insan yemek ve içmekten müstağni değildir.", "Nefiyden sonra ism-i fâil (menkûs: مُسْتَغْنٍ); fâili إِنْسَانٌ."],
      ["المُسَافِرُ يَحْمِلُ حَقِيبَتَهُ.", "المُسَافِرُ حَامِلٌ حَقِيبَتَهُ.", "المُسَافِرُ حَامِلٌ حَقِيبَتُهُ.", "المُسَافِرُ مَحْمُولٌ حَقِيبَتَهُ.", "Yolcu çantasını taşıyor.", "Haber ism-i fâil; mef’ûl mansûb."],
      ["أَيُهْمِلُ الشَّابُّ وَاجِبَهُ نَحْوَ المُجْتَمَعِ؟", "أَمُهْمِلٌ الشَّابُّ وَاجِبَهُ نَحْوَ المُجْتَمَعِ؟", "أَمُهْمِلٌ الشَّابُّ وَاجِبُهُ نَحْوَ المُجْتَمَعِ؟", "أَمُهْمَلٌ الشَّابُّ وَاجِبَهُ نَحْوَ المُجْتَمَعِ؟", "Genç topluma karşı görevini ihmal mi ediyor?", "İstifhamdan sonra ism-i fâil; fâil الشَّابُّ, mef’ûl وَاجِبَهُ."]
    ])},
    { type: "classify", extra: true, opts: MA, ar: "مَا نَوْعُ المَعْمُولِ؟", tr: "Koyu ma’mûl ne?", items: CL([
      [HL("أَحْمَدُ قَادِمٌ أَبُوهُ.", "أَبُوهُ"), "f", "Lâzım fiilin ism-i fâili: fâil."],
      [HL("مَا جَالِسٌ الطَّالِبُ.", "الطَّالِبُ"), "f", "Fâil."],
      [HL("عَبْدُ الصَّمَدِ قَارِئٌ مُؤَثِّرٌ صَوْتُهُ.", "صَوْتُهُ"), "f", "Fâil."],
      [HL("إِنَّ رَجُلًا صَالِحَةً زَوْجَتُهُ فِي سَعَادَةٍ.", "زَوْجَتُهُ"), "f", "Fâil."],
      [HL("الكِتَابُ مُتْقَنٌ طَبْعُهُ.", "طَبْعُهُ"), "n", "Nâib-i fâil."],
      [HL("أَمَسْمُوعٌ صَوْتُ المُؤَذِّنِ؟", "صَوْتُ"), "n", "Nâib-i fâil."],
      [HL("مَا مَخْذُولٌ المُخْلِصُونَ.", "المُخْلِصُونَ"), "n", "Nâib-i fâil."],
      [HL("الدُّوَلُ المَحْرُومُ شَعْبُهَا.", "شَعْبُهَا"), "n", "Nâib-i fâil."],
      [HL("التَّارِكُ عَمَلَهُ لِلْغَدِ نَادِمٌ.", "عَمَلَهُ"), "m", "Mef’ûl."],
      [HL("هَذَا وَلَدٌ مُطِيعٌ أَبَاهُ.", "أَبَاهُ"), "m", "Mef’ûl."],
      [HL("المَمْنُوحُ الجَائِزَةَ سَعِيدٌ.", "الجَائِزَةَ"), "m", "İkinci mef’ûl."],
      [HL("عِيسَى بَائِعٌ الكُتُبَ.", "الكُتُبَ"), "m", "Mef’ûl."],
      [HL("خَالِدٌ مُدَرِّسُ اللُّغَةِ العَرَبِيَّةِ.", "اللُّغَةِ"), "z", "İzafet."],
      [HL("سَعِيدٌ مَمْنُوحُ الجَائِزَةِ.", "الجَائِزَةِ"), "z", "İzafet."],
      [HL("المَظْلُومُ مُسْتَجَابُ الدُّعَاءِ.", "الدُّعَاءِ"), "z", "İzafet."],
      [HL("﴿الحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ﴾", "السَّمَاوَاتِ"), "z", "İzafet (mana bakımından mef’ûl)."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · İZAFET, ÂYETLER, OKUMA
{
  id: "u5", no: 5, ar: "الإِضَافَةُ إِلَى المَعْمُولِ · الآيَاتُ · القِرَاءَةُ", tr: "İzafet, Âyetler ve Okuma", short: "İzafet", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["İsm-i fâil ve mef’ûlü ma’mûlüne izafet etmek", "Âyetlerde âmili ve ma’mûlü i’rab etmek", "“Hastanede” metninde amel sebebini ve ma’mûlün türünü bulmak"],
  examples: [
    { s: "اللهُ:x / بَاسِطٌ:mz / الرِّزْقَ:nasb / لِمَنْ يَشَاءُ.:x", tr: "Allah rızkı dilediğine yayar.", pair: "اللهُ:x / بَاسِطُ:mz / الرِّزْقِ:nasb / لِمَنْ يَشَاءُ.:x", pairTr: "Aynı anlam: izafetle." },
    { s: "مَا:cerr / مُنْتَهَكٌ:mz / حَقُّهُ:nasb / فِي هَذِهِ البِلَادِ.:x", tr: "Bu ülkede kimsenin hakkı çiğnenmez.", pair: "مَا:cerr / مُنْتَهَكُ:mz / الحَقِّ:nasb / فِي هَذِهِ البِلَادِ.:x", pairTr: "Aynı anlam: izafetle." }
  ],
  rules: [
    { tr: "İsm-i fâil ve ism-i mef’ûl <b>ma’mûlüne izafet</b> edilebilir: tenvin düşer, ma’mûl muzâfun ileyh olarak <b>mecrûr</b> olur:", ex: ["خَالِدٌ مُدَرِّسُ اللُّغَةِ العَرَبِيَّةِ", "سَعِيدٌ مَمْنُوحُ الجَائِزَةِ", "الكِتَابُ مُجَدَّدٌ طَبْعُهُ ← مُجَدَّدُ الطَّبْعِ"] },
    { tr: "Nâib-i fâile izafet edilirken zamir düşer, isim harf-i tarifli olur ve ism-i mef’ûl mevsûfa uyar: <span class=\"ar\">الحَضَارَةُ مُشَاهَدَةٌ آثَارُهَا ← مُشَاهَدَةُ الآثَارِ · كَانَ عُمَرُ مَشْهُورًا عَدْلُهُ ← مَشْهُورَ العَدْلِ</span>." },
    { tr: "Bu izafet “lafzî”dir: isim belirli olmaz; bu yüzden nekreye sıfat ya da hâl olabilir: <span class=\"ar\">رَجُلٍ مُنْجِزِ وَعْدِهِ · مُعْطِيَهُ ثَوْبًا</span>." },
    { tr: "Âyet örneği: <span class=\"ar\">﴿فَلَعَلَّكَ بَاخِعٌ نَفْسَكَ﴾</span>: <span class=\"ar\">بَاخِعٌ</span> لَعَلَّ’nin haberi, merfû; <span class=\"ar\">نَفْسَكَ</span> onun mef’ûlü, mansûb." }
  ],
  kaide: ["٤ ـ يَجُوزُ إِضَافَةُ اسْمِ الفَاعِلِ وَاسْمِ المَفْعُولِ إِلَى مَعْمُولِهِ، مِثْلُ: خَالِدٌ مُدَرِّسُ اللُّغَةِ العَرَبِيَّةِ، سَعِيدٌ مَمْنُوحُ الجَائِزَةِ."],
  ex: [
    { type: "pick", num: "٥", ar: "أَضِفِ اسْمَ الفَاعِلِ وَاسْمَ المَفْعُولِ إِلَى مَعْمُولِهِ", tr: "Koyu ifadenin izafetli doğru biçimini seç.", exHtml: "<span class=\"ar\">اللهُ بَاسِطٌ الرِّزْقَ ← اللهُ بَاسِطُ الرِّزْقِ · مَا مُنْتَهَكٌ حَقُّهُ ← مَا مُنْتَهَكُ الحَقِّ</span>", items: PL([
      [HL("أَهَذَا الحَادِثُ مَعْرُوفَةٌ حَقِيقَتُهُ؟", "مَعْرُوفَةٌ حَقِيقَتُهُ"), "مَعْرُوفُ الحَقِيقَةِ", "مَعْرُوفَةُ الحَقِيقَةِ", "مَعْرُوفُ حَقِيقَتِهِ", "Bu kazanın gerçeği biliniyor mu?", "Zamir düşer, isim harf-i tarifli olur; ism-i mef’ûl الحَادِثُ’e uyar (müzekker)."],
      [HL("سَرَّ الغَنِيُّ الفَقِيرَ مُعْطِيًا ثَوْبًا إِيَّاهُ.", "مُعْطِيًا ثَوْبًا إِيَّاهُ"), "مُعْطِيَهُ ثَوْبًا", "مُعْطِيًا ثَوْبِهِ", "مُعْطِيهِ ثَوْبٌ", "Zengin, fakire bir elbise vererek onu sevindirdi.", "Birinci mef’ûle (zamir) izafet: مُعْطِيَهُ; ikinci mef’ûl mansûb kalır."],
      [HL("الكِتَابُ مُجَدَّدٌ طَبْعُهُ.", "مُجَدَّدٌ طَبْعُهُ"), "مُجَدَّدُ الطَّبْعِ", "مُجَدَّدٌ الطَّبْعِ", "مُجَدَّدُ الطَّبْعُ", "Kitabın baskısı yenilenmiş.", "Tenvin düşer, ma’mûl mecrûr."],
      [HL("أَبْحَثُ عَنْ رَجُلٍ مُنْجِزٍ وَعْدَهُ.", "مُنْجِزٍ وَعْدَهُ"), "مُنْجِزِ وَعْدِهِ", "مُنْجِزٍ وَعْدِهِ", "مُنْجِزَ وَعْدِهِ", "Sözünü yerine getiren bir adam arıyorum.", "Sıfat mecrûr kalır; ma’mûl muzâfun ileyh."],
      [HL("الحَضَارَةُ الإِسْلَامِيَّةُ مُشَاهَدَةٌ آثَارُهَا فِي العَالَمِ.", "مُشَاهَدَةٌ آثَارُهَا"), "مُشَاهَدَةُ الآثَارِ", "مُشَاهَدَةٌ الآثَارِ", "مُشَاهَدَةُ الآثَارُ", "İslam medeniyetinin eserleri dünyada görülür.", "İsm-i mef’ûl الحَضَارَةُ’ye uyar (müennes)."],
      [HL("كَانَ عُمَرُ بْنُ الخَطَّابِ مَشْهُورًا عَدْلُهُ.", "مَشْهُورًا عَدْلُهُ"), "مَشْهُورَ العَدْلِ", "مَشْهُورًا العَدْلِ", "مَشْهُورُ العَدْلِ", "Ömer b. Hattâb adaletiyle meşhurdu.", "كَانَ’nin haberi mansûb kalır: مَشْهُورَ."],
      [HL("أَلَيْسَ اللهُ مُحَوِّلًا قُلُوبَ البَشَرِ؟", "مُحَوِّلًا قُلُوبَ البَشَرِ"), "مُحَوِّلَ قُلُوبِ البَشَرِ", "مُحَوِّلًا قُلُوبِ البَشَرِ", "مُحَوِّلُ قُلُوبِ البَشَرِ", "Allah insanların kalplerini çeviren değil midir?", "لَيْسَ’in haberi mansûb: مُحَوِّلَ."],
      [HL("تَرَكَ المُوَظَّفُ غُرْفَةَ المُدِيرِ خَائِبَةً آمَالُهُ.", "خَائِبَةً آمَالُهُ"), "خَائِبَ الآمَالِ", "خَائِبَةَ الآمَالِ", "خَائِبًا الآمَالَ", "Memur müdürün odasından ümitleri boşa çıkmış olarak ayrıldı.", "İzafetle ism-i fâil sahibine (المُوَظَّفُ) uyar: müzekker; hâl mansûb."]
    ])},
    { type: "combo", num: "٧", ar: "أَعْرِبْ مَا تَحْتَهُ خَطٌّ فِي الآيَاتِ الكَرِيمَةِ", tr: "Koyu iki kelimenin i’rabını seç.", exHtml: "<span class=\"ar\">﴿فَلَعَلَّكَ بَاخِعٌ نَفْسَكَ عَلَى آثَارِهِمْ﴾ ← بَاخِعٌ: خَبَرُ «لَعَلَّ» مَرْفُوعٌ بِالضَّمَّةِ · نَفْسَكَ: مَفْعُولُ «بَاخِعٌ» مَنْصُوبٌ بِالفَتْحَةِ</span>", items: [
      ["﴿وَالذَّاكِرِينَ اللهَ كَثِيرًا وَالذَّاكِرَاتِ﴾ (الأحزاب ٣٥)", "الذَّاكِرِينَ", ["مَعْطُوفٌ عَلَى اسْمِ «إِنَّ» مَنْصُوبٌ بِاليَاءِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ بِاليَاءِ"], "اللهَ", ["مَفْعُولٌ بِهِ لِـ«الذَّاكِرِينَ» مَنْصُوبٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "فَاعِلٌ مَرْفُوعٌ"], "Allah’ı çok zikreden erkekler ve kadınlar… (Ahzâb 35)", "Harf-i tarifli ism-i fâil; اللهَ mef’ûlü."],
      ["﴿الحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ وَالأَرْضِ﴾ (فاطر ١)", "فَاطِرِ", ["نَعْتٌ لِلَفْظِ الجَلَالَةِ مَجْرُورٌ بِالكَسْرَةِ، وَهُوَ مُضَافٌ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "حَالٌ مَنْصُوبَةٌ بِالفَتْحَةِ"], "السَّمَاوَاتِ", ["مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالكَسْرَةِ", "فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ"], "Hamd, gökleri ve yeri yaratan Allah’adır. (Fâtır 1)", "İsm-i fâil ma’mûlüne izafet edilmiş."],
      ["﴿وَهُوَ مُحَرَّمٌ عَلَيْكُمْ إِخْرَاجُهُمْ﴾ (البقرة ٨٥)", "مُحَرَّمٌ", ["خَبَرُ «هُوَ» مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "حَالٌ مَنْصُوبَةٌ بِالفَتْحَةِ"], "إِخْرَاجُهُمْ", ["نَائِبُ فَاعِلٍ لِـ«مُحَرَّمٌ» مَرْفُوعٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ"], "Hâlbuki onları çıkarmak size haram kılınmıştı. (Bakara 85)", "Haber ism-i mef’ûl; nâib-i fâili إِخْرَاجُهُمْ."],
      ["﴿ذَلِكَ يَوْمٌ مَجْمُوعٌ لَهُ النَّاسُ﴾ (هود ١٠٣)", "مَجْمُوعٌ", ["نَعْتٌ لِـ«يَوْمٌ» مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "حَالٌ مَنْصُوبَةٌ بِالفَتْحَةِ"], "النَّاسُ", ["نَائِبُ فَاعِلٍ لِـ«مَجْمُوعٌ» مَرْفُوعٌ", "فَاعِلٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"], "O, insanların toplanacağı bir gündür. (Hûd 103)", "Sıfat ism-i mef’ûl; nâib-i fâili النَّاسُ."],
      ["﴿إِنِّي جَاعِلٌ فِي الأَرْضِ خَلِيفَةً﴾ (البقرة ٣٠)", "جَاعِلٌ", ["خَبَرُ «إِنَّ» مَرْفُوعٌ بِالضَّمَّةِ", "اسْمُ «إِنَّ» مَنْصُوبٌ", "نَعْتٌ مَرْفُوعٌ"], "خَلِيفَةً", ["مَفْعُولٌ بِهِ لِـ«جَاعِلٌ» مَنْصُوبٌ", "حَالٌ مَنْصُوبَةٌ", "تَمْيِيزٌ مَنْصُوبٌ"], "Ben yeryüzünde bir halife yaratacağım. (Bakara 30)", "Haber ism-i fâil; خَلِيفَةً mef’ûlü."],
      ["﴿يَخْرُجُ مِنْ بُطُونِهَا شَرَابٌ مُخْتَلِفٌ أَلْوَانُهُ﴾ (النحل ٦٩)", "مُخْتَلِفٌ", ["نَعْتٌ لِـ«شَرَابٌ» مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ", "حَالٌ مَنْصُوبَةٌ"], "أَلْوَانُهُ", ["فَاعِلٌ لِـ«مُخْتَلِفٌ» مَرْفُوعٌ", "نَائِبُ فَاعِلٍ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ"], "Arıların karınlarından renkleri çeşitli bir içecek çıkar. (Nahl 69)", "Sıfat ism-i fâil (lâzım); أَلْوَانُهُ fâili."]
    ].map(AYI) },
    { type: "reading", ar: "اقْرَأِ النَّصَّ ثُمَّ بَيِّنْ سَبَبَ العَمَلِ وَنَوْعَ المَعْمُولِ", tr: "Metni oku, soruları cevapla; sonra koyu âmilin amel sebebini ve koyu ma’mûlün türünü seç.", title: "فِي المُسْتَشْفَى",
      text: METIN,
      textTr: "Selim küçük oğlunu kucağında taşıyarak hastaneye girdi; çocuğun kolu kırılmıştı. Onları yüzü gülen bir hemşire karşıladı ve “Doktoru mu bekliyorsun?” dedi. Selim: “Evet, oğlum acıya dayanamıyor” dedi.<br>Birkaç dakika sonra çocukları tedavi eden doktor geldi, kolu muayene etti ve “Kemiğin ucu kırık ama durum basit” dedi. Sonra alçıyı taktı; çocuk odadan kolu sarılmış olarak, doktora teşekkür ederek çıktı.<br>Selim: “Doktor işini özenle yapan bir adam; insanlara iyilik eden Allah katında sevilir” dedi.",
      qa: [
        { q: "كَيْفَ دَخَلَ سَلِيمٌ المُسْتَشْفَى؟", a: "دَخَلَهُ حَامِلًا ابْنَهُ الصَّغِيرَ.", tr: "Selim hastaneye nasıl girdi? Küçük oğlunu taşıyarak." },
        { q: "مَاذَا أَصَابَ الوَلَدَ؟", a: "كَانَتْ ذِرَاعُهُ مَكْسُورَةً.", tr: "Çocuğa ne olmuştu? Kolu kırılmıştı." },
        { q: "مَاذَا قَالَ الطَّبِيبُ بَعْدَ الفَحْصِ؟", a: "قَالَ: العَظْمُ مَكْسُورٌ طَرَفُهُ، وَلَكِنَّ الأَمْرَ سَهْلٌ.", tr: "Doktor muayeneden sonra ne dedi? Kemiğin ucu kırık ama durum basit." },
        { q: "كَيْفَ وَصَفَ سَلِيمٌ الطَّبِيبَ؟", a: "وَصَفَهُ بِأَنَّهُ رَجُلٌ مُتْقِنٌ عَمَلَهُ.", tr: "Selim doktoru nasıl nitelendirdi? İşini özenle yapan bir adam olarak." }
      ],
      cls: { opts: SB, ar: "مَا سَبَبُ عَمَلِهِ؟", tr: "Koyu âmil neden amel ediyor?", items: [
        { s: HL("دَخَلَ سَلِيمٌ المُسْتَشْفَى حَامِلًا ابْنَهُ", "حَامِلًا"), a: "a", why: "Hâl." },
        { s: HL("وَكَانَ الوَلَدُ مَكْسُورَةً ذِرَاعُهُ", "مَكْسُورَةً"), a: "h", why: "كَانَ’nin haberi." },
        { s: HL("مُمَرِّضٌ مُبْتَسِمٌ وَجْهُهُ", "مُبْتَسِمٌ"), a: "s", why: "مُمَرِّضٌ’a sıfat." },
        { s: HL("أَمُنْتَظِرٌ أَنْتَ الطَّبِيبَ؟", "مُنْتَظِرٌ"), a: "i", why: "İstifhamdan sonra." },
        { s: HL("وَمَا صَابِرٌ ابْنِي عَلَى الأَلَمِ", "صَابِرٌ"), a: "n", why: "Nefiyden sonra." },
        { s: HL("جَاءَ الطَّبِيبُ المُعَالِجُ الأَطْفَالَ", "المُعَالِجُ"), a: "l", why: "Harf-i tarifli." },
        { s: HL("العَظْمُ مَكْسُورٌ طَرَفُهُ", "مَكْسُورٌ"), a: "h", why: "Haber." },
        { s: HL("فَخَرَجَ الوَلَدُ مِنَ الغُرْفَةِ مَرْبُوطَةً ذِرَاعُهُ", "مَرْبُوطَةً"), a: "a", why: "Hâl." },
        { s: HL("شَاكِرًا الطَّبِيبَ", "شَاكِرًا"), a: "a", why: "Hâl." },
        { s: HL("إِنَّ الطَّبِيبَ رَجُلٌ مُتْقِنٌ عَمَلَهُ", "مُتْقِنٌ"), a: "s", why: "رَجُلٌ’e sıfat." }
      ]},
      cls2: { opts: MA, ar: "مَا نَوْعُ المَعْمُولِ؟", tr: "Koyu ma’mûl ne?", items: [
        { s: HL("حَامِلًا ابْنَهُ الصَّغِيرَ", "ابْنَهُ"), a: "m", why: "Mef’ûl." },
        { s: HL("مَكْسُورَةً ذِرَاعُهُ", "ذِرَاعُهُ"), a: "n", why: "Nâib-i fâil." },
        { s: HL("مُبْتَسِمٌ وَجْهُهُ", "وَجْهُهُ"), a: "f", why: "Fâil." },
        { s: HL("أَمُنْتَظِرٌ أَنْتَ الطَّبِيبَ؟", "أَنْتَ"), a: "f", why: "Fâil (haberin yerini tutar)." },
        { s: HL("أَمُنْتَظِرٌ أَنْتَ الطَّبِيبَ؟", "الطَّبِيبَ"), a: "m", why: "Mef’ûl." },
        { s: HL("وَمَا صَابِرٌ ابْنِي", "ابْنِي"), a: "f", why: "Fâil." },
        { s: HL("المُعَالِجُ الأَطْفَالَ", "الأَطْفَالَ"), a: "m", why: "Mef’ûl." },
        { s: HL("مَكْسُورٌ طَرَفُهُ", "طَرَفُهُ"), a: "n", why: "Nâib-i fâil." },
        { s: HL("رَجُلٌ مُتْقِنٌ عَمَلَهُ", "عَمَلَهُ"), a: "m", why: "Mef’ûl." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["التَّارِكُ {عَمَلَهُ} لِلْغَدِ نَادِمٌ.", ["عَمَلَهُ", "عَمَلُهُ", "عَمَلِهِ"], "mef’ûl: mansûb", "İşini yarına bırakan pişman olur.", "u1"],
  ["أَحْمَدُ قَادِمٌ {أَبُوهُ} مِنْ أَنْقَرَةَ.", ["أَبُوهُ", "أَبَاهُ", "أَبِيهِ"], "fâil: merfû", "Ahmed’in babası Ankara’dan geliyor.", "u1"],
  ["هَذَا وَلَدٌ مُطِيعٌ {أَبَاهُ}.", ["أَبَاهُ", "أَبُوهُ", "أَبِيهِ"], "mef’ûl", "Babasına itaat eden bir çocuk.", "u1"],
  ["مَا {مُتَّبِعٌ} المَرِيضُ نُصْحَ الطَّبِيبِ.", ["مُتَّبِعٌ", "مُتَّبِعًا", "مُتَّبِعٍ"], "nefiyden sonra mübtedâ", "Hasta doktorun tavsiyesine uymuyor.", "u1"],
  ["شَاهَدُوا المُبَارَاةَ {مُشَجِّعِينَ} فَرِيقَهُمْ.", ["مُشَجِّعِينَ", "مُشَجِّعُونَ", "مُشَجِّعٌ"], "hâl: mansûb", "Maçı takımlarını destekleyerek izlediler.", "u1"],
  ["الكِتَابُ مُتْقَنٌ {طَبْعُهُ}.", ["طَبْعُهُ", "طَبْعَهُ", "طَبْعِهِ"], "nâib-i fâil: merfû", "Kitabın baskısı özenli.", "u2"],
  ["المَمْنُوحُ {الجَائِزَةَ} سَعِيدٌ.", ["الجَائِزَةَ", "الجَائِزَةُ", "الجَائِزَةِ"], "ikinci mef’ûl: mansûb", "Ödül verilen mutludur.", "u2"],
  ["هَذَا عَمَلٌ {مَعْرُوفَةٌ} قِيمَتُهُ.", ["مَعْرُوفَةٌ", "مَعْرُوفٌ", "مَعْرُوفَةً"], "nâib-i fâile uyar", "Değeri bilinen bir iş.", "u2"],
  ["الغُرْفَةُ {مَفْتُوحَةٌ} نَوَافِذُهَا.", ["مَفْتُوحَةٌ", "مَفْتُوحَةً", "فَاتِحَةٌ"], "haber ism-i mef’ûl", "Odanın pencereleri açık.", "u2"],
  ["كَانَ أَبِي رَجُلًا مُسْتَجَابًا {دُعَاؤُهُ}.", ["دُعَاؤُهُ", "دُعَاءَهُ", "دُعَائِهِ"], "nâib-i fâil", "Babam duası kabul olunan bir adamdı.", "u2"],
  ["مَا جَالِسٌ {الطَّالِبُ} فِي مَكَانِهِ.", ["الطَّالِبُ", "الطَّالِبَ", "الطَّالِبِ"], "fâil", "Öğrenci yerinde oturmuyor.", "u3"],
  ["أَمُقِيمٌ {عَمُّكَ} فِي المَدِينَةِ؟", ["عَمُّكَ", "عَمَّكَ", "عَمِّكَ"], "fâil", "Amcan şehirde mi oturuyor?", "u3"],
  ["يَتَحَدَّثُ الرَّجُلُ {رَافِعًا} صَوْتَهُ.", ["رَافِعًا", "رَافِعٌ", "رَافِعٍ"], "hâl", "Adam sesini yükselterek konuşuyor.", "u3"],
  ["أَمَمْنُوحَةٌ المَرْأَةُ {حُقُوقَهَا}؟", ["حُقُوقَهَا", "حُقُوقُهَا", "حُقُوقِهَا"], "ikinci mef’ûl", "Kadına hakları veriliyor mu?", "u3"],
  ["إِنَّ الغَافِرَ {ذُنُوبَ} العِبَادِ هُوَ اللهُ.", ["ذُنُوبَ", "ذُنُوبُ", "ذُنُوبِ"], "mef’ûl", "Kulların günahlarını bağışlayan Allah’tır.", "u3"],
  ["رَأَيْتُ بِنْتًا سَاقِيَةً {الأَشْجَارَ}.", ["الأَشْجَارَ", "الأَشْجَارُ", "الأَشْجَارِ"], "mef’ûl", "Ağaçları sulayan bir kız gördüm.", "u4"],
  ["رَأَى صَدِيقَهُ مَكْسُورَةً {ذِرَاعُهُ}.", ["ذِرَاعُهُ", "ذِرَاعَهُ", "ذِرَاعِهِ"], "nâib-i fâil", "Arkadaşını kolu kırık gördü.", "u4"],
  ["الرَّئِيسُ رَجُلٌ مُطَاعُ {الأَوَامِرِ}.", ["الأَوَامِرِ", "الأَوَامِرُ", "الأَوَامِرَ"], "izafet: mecrûr", "Başkan emirleri dinlenen biri.", "u4"],
  ["المُسَافِرُ {حَامِلٌ} حَقِيبَتَهُ.", ["حَامِلٌ", "حَامِلًا", "مَحْمُولٌ"], "haber ism-i fâil", "Yolcu çantasını taşıyor.", "u4"],
  ["الأَرْضُ {مُغَطَّاةٌ} بِالثَّلْجِ.", ["مُغَطَّاةٌ", "مُغَطِّيَةٌ", "مُغَطًّى"], "meçhul → ism-i mef’ûl", "Yer karla örtülü.", "u4"],
  ["اللهُ بَاسِطُ {الرِّزْقِ} لِمَنْ يَشَاءُ.", ["الرِّزْقِ", "الرِّزْقَ", "الرِّزْقُ"], "izafet", "Allah rızkı dilediğine yayar.", "u5"],
  ["﴿فَلَعَلَّكَ بَاخِعٌ {نَفْسَكَ}﴾", ["نَفْسَكَ", "نَفْسُكَ", "نَفْسِكَ"], "mef’ûl", "Belki de kendini helak edeceksin.", "u5"],
  ["﴿إِنِّي جَاعِلٌ فِي الأَرْضِ {خَلِيفَةً}﴾", ["خَلِيفَةً", "خَلِيفَةٌ", "خَلِيفَةٍ"], "mef’ûl", "Yeryüzünde bir halife yaratacağım.", "u5"],
  ["﴿شَرَابٌ مُخْتَلِفٌ {أَلْوَانُهُ}﴾", ["أَلْوَانُهُ", "أَلْوَانَهُ", "أَلْوَانِهِ"], "fâil", "Renkleri çeşitli bir içecek.", "u5"],
  ["﴿وَهُوَ مُحَرَّمٌ عَلَيْكُمْ {إِخْرَاجُهُمْ}﴾", ["إِخْرَاجُهُمْ", "إِخْرَاجَهُمْ", "إِخْرَاجِهِمْ"], "nâib-i fâil", "Onları çıkarmak size haram kılınmıştı.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["يَتْرُكُ عَمَلَهُ ← harf-i tarifli ism-i fâil", "التَّارِكُ عَمَلَهُ", "التَّارِكُ عَمَلِهِ", "المَتْرُوكُ عَمَلَهُ", "Mef’ûl mansûb kalır.", "u1"],
  ["يُطِيعُ أَبَاهُ ← وَلَدٌ’a sıfat", "وَلَدٌ مُطِيعٌ أَبَاهُ", "وَلَدٌ مُطِيعٌ أَبُوهُ", "وَلَدٌ مُطَاعٌ أَبَاهُ", "Malûm fiil: ism-i fâil; mef’ûl mansûb.", "u1"],
  ["يَرْفَعُ صَوْتَهُ ← hâl yap", "رَافِعًا صَوْتَهُ", "رَافِعٌ صَوْتَهُ", "رَافِعًا صَوْتُهُ", "Hâl mansûb; mef’ûl mansûb.", "u1"],
  ["يُتْقَنُ طَبْعُهُ ← haber yap", "الكِتَابُ مُتْقَنٌ طَبْعُهُ", "الكِتَابُ مُتْقِنٌ طَبْعَهُ", "الكِتَابُ مُتْقَنٌ طَبْعَهُ", "Meçhul: ism-i mef’ûl; nâib-i fâil merfû.", "u2"],
  ["يُمْنَحُ الجَائِزَةَ ← harf-i tarifli", "المَمْنُوحُ الجَائِزَةَ", "المَمْنُوحُ الجَائِزَةُ", "المَانِحُ الجَائِزَةُ", "İkinci mef’ûl mansûb.", "u2"],
  ["تُعْرَفُ قِيمَتُهُ ← عَمَلٌ’a sıfat", "عَمَلٌ مَعْرُوفَةٌ قِيمَتُهُ", "عَمَلٌ مَعْرُوفٌ قِيمَتَهُ", "عَمَلٌ مَعْرُوفَةٌ قِيمَتَهُ", "Nâib-i fâile uyar (müennes).", "u2"],
  ["يَجْلِسُ الطَّالِبُ ← nefy ile", "مَا جَالِسٌ الطَّالِبُ", "مَا جَالِسًا الطَّالِبُ", "مَا جَالِسٌ الطَّالِبَ", "Mübtedâ + fâil.", "u3"],
  ["يُقِيمُ عَمُّكَ ← istifham ile", "أَمُقِيمٌ عَمُّكَ؟", "أَمُقِيمٌ عَمَّكَ؟", "أَمُقَامٌ عَمُّكَ؟", "Mübtedâ + fâil.", "u3"],
  ["يُسْمَعُ صَوْتُ المُؤَذِّنِ ← istifham ile", "أَمَسْمُوعٌ صَوْتُ المُؤَذِّنِ؟", "أَسَامِعٌ صَوْتُ المُؤَذِّنِ؟", "أَمَسْمُوعٌ صَوْتَ المُؤَذِّنِ؟", "Meçhul: ism-i mef’ûl + nâib-i fâil.", "u3"],
  ["المُسَافِرُ يَحْمِلُ حَقِيبَتَهُ ← ism-i fâil", "المُسَافِرُ حَامِلٌ حَقِيبَتَهُ", "المُسَافِرُ حَامِلٌ حَقِيبَتُهُ", "المُسَافِرُ مَحْمُولٌ حَقِيبَتَهُ", "Haber; mef’ûl mansûb.", "u4"],
  ["الأَرْضُ تُغَطَّى بِالثَّلْجِ ← ism-i mef’ûl", "الأَرْضُ مُغَطَّاةٌ بِالثَّلْجِ", "الأَرْضُ مُغَطِّيَةٌ بِالثَّلْجِ", "الأَرْضُ مُغَطًّى بِالثَّلْجِ", "Meçhul fiil: ism-i mef’ûl, müennes.", "u4"],
  ["الأَشْجَارُ تَتَسَاقَطُ أَوْرَاقُهَا ← ism-i fâil", "الأَشْجَارُ مُتَسَاقِطَةٌ أَوْرَاقُهَا", "الأَشْجَارُ مُتَسَاقِطَاتٌ أَوْرَاقُهَا", "الأَشْجَارُ مُتَسَاقِطَةٌ أَوْرَاقَهَا", "Fâil açıkken müfred; fâil merfû.", "u4"],
  ["اللهُ بَاسِطٌ الرِّزْقَ ← izafet", "اللهُ بَاسِطُ الرِّزْقِ", "اللهُ بَاسِطٌ الرِّزْقِ", "اللهُ بَاسِطُ الرِّزْقَ", "Tenvin düşer, ma’mûl mecrûr.", "u5"],
  ["مَا مُنْتَهَكٌ حَقُّهُ ← izafet", "مَا مُنْتَهَكُ الحَقِّ", "مَا مُنْتَهَكٌ الحَقِّ", "مَا مُنْتَهَكُ حَقُّهُ", "Zamir düşer, isim harf-i tarifli ve mecrûr.", "u5"]
];
// Amel sebebi hız oyunu
var NOUN_LIST = UNITS[2].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = SB;
// İsm-i fâil mi ism-i mef’ûl mü hız oyunu
var MM_OPTS = FM;
var MM_LIST = UNITS[1].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  se: { name: "Örnek ↔ amel sebebi", pairs: [["التَّارِكُ عَمَلَهُ", "harf-i tarifli"], ["أَحْمَدُ قَادِمٌ أَبُوهُ", "haber"], ["وَلَدٌ مُطِيعٌ أَبَاهُ", "sıfat"], ["رَافِعًا صَوْتَهُ", "hâl"], ["مَا جَالِسٌ الطَّالِبُ", "nefiyden sonra"], ["أَمُقِيمٌ عَمُّكَ؟", "istifhamdan sonra"], ["مُدَرِّسُ اللُّغَةِ", "izafet"], ["الكِتَابُ مُتْقَنٌ طَبْعُهُ", "haber, ism-i mef’ûl"]] },
  ce: { name: "Fiil ↔ isim", pairs: [["يَحْمِلُ حَقِيبَتَهُ", "حَامِلٌ حَقِيبَتَهُ"], ["يُتَّخَذُ صَدِيقًا", "مُتَّخَذٌ صَدِيقًا"], ["يُسَلِّمُ الطَّرْدَ", "مُسَلِّمٌ الطَّرْدَ"], ["تُغَطَّى بِالثَّلْجِ", "مُغَطَّاةٌ بِالثَّلْجِ"], ["يَهْدِي النَّاسَ", "هَادٍ النَّاسَ"], ["يَسْتَغْنِي", "مُسْتَغْنٍ"], ["يُهْمِلُ وَاجِبَهُ", "مُهْمِلٌ وَاجِبَهُ"], ["تَتَسَاقَطُ أَوْرَاقُهَا", "مُتَسَاقِطَةٌ أَوْرَاقُهَا"]] },
  ay: { name: "Âyet ↔ Türkçe", pairs: [["فَلَعَلَّكَ بَاخِعٌ نَفْسَكَ", "belki kendini helak edeceksin"], ["وَالذَّاكِرِينَ اللهَ كَثِيرًا", "Allah’ı çok zikreden erkekler"], ["فَاطِرِ السَّمَاوَاتِ وَالأَرْضِ", "gökleri ve yeri yaratan"], ["مُحَرَّمٌ عَلَيْكُمْ إِخْرَاجُهُمْ", "onları çıkarmak size haram"], ["يَوْمٌ مَجْمُوعٌ لَهُ النَّاسُ", "insanların toplanacağı gün"], ["إِنِّي جَاعِلٌ فِي الأَرْضِ خَلِيفَةً", "yeryüzünde bir halife yaratacağım"], ["شَرَابٌ مُخْتَلِفٌ أَلْوَانُهُ", "renkleri çeşitli bir içecek"], ["اللهُ بَاسِطُ الرِّزْقِ", "Allah rızkı yayandır"]] }
};
var KARTLAR = [
  ["İsm-i fâil nasıl amel eder?", "Fiili gibi: fâilini ref, mef’ûlünü nasb eder."],
  ["İsm-i mef’ûl nasıl amel eder?", "Meçhul fiili gibi: nâib-i fâilini ref eder; ikinci mef’ûlü nasb eder."],
  ["Amel şartları kaç tane?", "Altı: harf-i tarifli · haber · sıfat · hâl · nefiyden sonra · istifhamdan sonra"],
  ["Harf-i tarifli olunca?", "Şartsız amel eder: التَّارِكُ عَمَلَهُ"],
  ["Nefiyden sonra cümle yapısı?", "İsm-i fâil mübtedâ, ardındaki isim fâil: مَا جَالِسٌ الطَّالِبُ"],
  ["مُتْقِنٌ / مُتْقَنٌ farkı?", "Kesre: ism-i fâil (yapan); fetha: ism-i mef’ûl (yapılan)."],
  ["İsm-i mef’ûl neye uyar?", "Nâib-i fâiline (cinsiyet): عَمَلٌ مَعْرُوفَةٌ قِيمَتُهُ"],
  ["Ma’mûlüne izafet?", "Caiz: مُدَرِّسُ اللُّغَةِ · مَمْنُوحُ الجَائِزَةِ"],
  ["İzafette ne olur?", "Tenvin düşer, ma’mûl muzâfun ileyh olarak mecrûr olur."],
  ["مُطَاعُ ___: hangi biçim?", "Tenvinsizse izafet: مُطَاعُ الأَوَامِرِ"],
  ["﴿فَلَعَلَّكَ بَاخِعٌ نَفْسَكَ﴾", "بَاخِعٌ لَعَلَّ’nin haberi; نَفْسَكَ onun mef’ûlü."],
  ["Fiilden isme?", "Malûm → ism-i fâil (يَحْمِلُ ← حَامِلٌ); meçhul → ism-i mef’ûl (يُتَّخَذُ ← مُتَّخَذٌ)."]
];
