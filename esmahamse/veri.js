// ================= VERİ: Esmâ-i Hamse (الأَسْمَاءُ الخَمْسَةُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "مِنَ الأَسْمَاءِ الخَمْسَةِ", tr: "Esmâ-i hamse" }, nasb: { ar: "المُضَافُ إِلَيْهِ", tr: "Muzâfun ileyh" },
  mz: { ar: "", tr: "Başka" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Esmâ-i hamse" }
};
var HAL3 = [["r", "Merfû (vâv)", "مَرْفُوعٌ بِالوَاوِ", "cerr"], ["n", "Mansûb (elif)", "مَنْصُوبٌ بِالأَلِفِ", "nasb"], ["c", "Mecrûr (yâ)", "مَجْرُورٌ بِاليَاءِ", "mz"]];
var HAL_TR = { r: "Merfû (vâv)", n: "Mansûb (elif)", c: "Mecrûr (yâ)", t: "Takdîrî" };
var TUR_TR = HAL_TR;
// Makine: [kök, Türkçe, muzâfun ileyh isim, isim Türkçe, zamirle uygun mu]
var EH = [
  ["أَب", "baba", "طَالِبٍ", "Tâlib’in babası", true], ["أَخ", "kardeş", "عَلِيٍّ", "Ali’nin kardeşi", true], ["حَم", "kayınpeder", "زَيْنَبَ", "Zeyneb’in kayınpederi", true],
  ["ذ", "sahibi", "عِلْمٍ", "ilim sahibi", false], ["ف", "ağız", "الطِّفْلِ", "çocuğun ağzı", true]
];
var EH_SUF = { r: "ُو", n: "َا", c: "ِي" };
var EH_MI = [["İsim", "عَلِيٍّ"], ["Zamir ـكَ", "كَ"], ["Yâ-i mütekellim ـي", "ي"]];
var EH_FR = [["r", "هَذَا", "Merfû"], ["n", "رَأَيْتُ", "Mansûb"], ["c", "نَظَرْتُ إِلَى", "Mecrûr"]];

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
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
var GOREV = ["Fâil", "Nâib-i fâil", "Mübtedâ", "Haber", "Mef’ûlün bih", "İnne’nin ismi", "Kâne’nin haberi", "Muzâfun ileyh", "Harf-i cerle mecrûr"];
var ALAMET = ["Merfû · vâv ile", "Mansûb · elif ile", "Mecrûr · yâ ile", "Merfû · takdîrî damme"];
function others(list, c, n) { var o = list.filter(function (x) { return x !== c; }); return [c, o[n % o.length], o[(n + 1) % o.length]]; }
// İ’rab: [cümle, kelime, görev, alâmet, Türkçe, açıklama]
function IR(x, n) { return CBP([x[0] + " ← " + x[1] + " · Görevi:", others(GOREV, x[2], n), "· Hükmü:", others(ALAMET, x[3], n + 1)], n, x[4], x[5]); }
function GO(opts) { return opts.map(function (o, i) { return [o[0], o[1], o[2], ["cerr", "nasb", "mz", "mi"][i]]; }); }

var UNITS = [
// ---------------------------------------------------------------- 1 · BEŞ İSİM
{
  id: "u1", no: 1, ar: "الأَسْمَاءُ الخَمْسَةُ", tr: "Esmâ-i Hamse ve Şartları", short: "Beş isim", col: "cerr", legend: ["cerr", "nasb"],
  goals: ["Beş ismi bilmek: أَبٌ، أَخٌ، حَمٌ، ذُو، فَمٌ", "Harfle i’rab edilmeleri için şartları bilmek: müfred ve muzâf olmalı (yâ-i mütekellime değil)", "Cümlede esmâ-i hamseyi bulmak"],
  examples: [
    { s: "رَجَعَ:- / أَبُو:cerr / طَالِبٍ.:nasb", tr: "Ebû Tâlib döndü. (vâv)", pair: "قَابَلْتُ:- / أَبَا:cerr / طَالِبٍ.:nasb", pairTr: "Ebû Tâlib’le görüştüm. (elif)" },
    { s: "سَلَّمْتُ عَلَى:- / أَبِي:cerr / طَالِبٍ.:nasb", tr: "Ebû Tâlib’e selam verdim. (yâ)" },
    { s: "أَحْمَدُ:- / ذُو:cerr / عِلْمٍ.:nasb", tr: "Ahmed ilim sahibidir.", pair: "فُو:cerr / كَ:nasb / نَظِيفٌ.:-", pairTr: "Ağzın temiz." }
  ],
  rules: [
    { tr: "<b class=\"r-cerr\">Esmâ-i hamse</b> (<span class=\"ar\">الأَسْمَاءُ الخَمْسَةُ</span>): <span class=\"ar\">أَبٌ</span> (baba), <span class=\"ar\">أَخٌ</span> (kardeş), <span class=\"ar\">حَمٌ</span> (kayınpeder), <span class=\"ar\">ذُو</span> (sahibi), <span class=\"ar\">فَمٌ</span> (ağız)." },
    { tr: "<b>Müfred</b> ve <b>muzâf</b> olunca harflerle i’rab edilir:", ex: ["Merfû: vâv ile · أَبُو طَالِبٍ، أَخُو عَلِيٍّ، حَمُوهَا، ذُو عِلْمٍ، فُوكَ", "Mansûb: elif ile · أَبَا طَالِبٍ، أَخَا عَلِيٍّ، حَمَاهَا، ذَا عِلْمٍ، فَاكَ", "Mecrûr: yâ ile · أَبِي طَالِبٍ، أَخِي عَلِيٍّ، حَمِيهَا، ذِي عِلْمٍ، فِيكَ"] },
    { tr: "Şartlar yoksa harekeyle i’rab edilir: muzâf değilse (<span class=\"ar\">جَاءَ أَبٌ، الأَبُ</span>), müsennâ ya da cemi ise (<span class=\"ar\">الآبَاءُ</span>). <span class=\"ar\">فَمٌ</span> mîmle kullanılınca da harekeyle: <span class=\"ar\">فَمُكَ نَظِيفٌ</span>." },
    { tr: "<b>Yâ-i mütekellime</b> muzâf olunca i’rab <b>takdîrî</b>dir: <span class=\"ar\">أَخِي مُهَنْدِسٌ</span> (mübtedâ, hâ üzerinde takdîrî damme ile merfû)." },
    { tr: "<span class=\"ar\">ذُو</span> her zaman bir isme muzâf olur ve zamire eklenmez: <span class=\"ar\">ذُو عِلْمٍ، ذُو خُلُقٍ، ذُو النُّورَيْنِ</span>." }
  ],
  kaide: [
    "١ ـ الأَسْمَاءُ الخَمْسَةُ هِيَ: أَبٌ، أَخٌ، حَمٌ، ذُو، فَمٌ.",
    "٢ ـ إِذَا كَانَتِ الأَسْمَاءُ الخَمْسَةُ مُفْرَدَةً وَمُضَافَةً: أ ـ تُرْفَعُ بِالوَاوِ، مِثْلُ: رَجَعَ أَبُو طَالِبٍ. ب ـ وَتُنْصَبُ بِالأَلِفِ، مِثْلُ: قَابَلْتُ أَبَا طَالِبٍ. جـ ـ وَتُجَرُّ بِاليَاءِ، مِثْلُ: سَلَّمْتُ عَلَى أَبِي طَالِبٍ.",
    "٣ ـ إِذَا كَانَتِ الأَسْمَاءُ الخَمْسَةُ مُضَافَةً إِلَى يَاءِ المُتَكَلِّمِ فَيَكُونُ إِعْرَابُهَا تَقْدِيرِيًّا، مِثْلُ: أَخِي مُهَنْدِسٌ (مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ المُقَدَّرَةِ عَلَى الخَاءِ)."
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنِ الأَسْمَاءَ الخَمْسَةَ فِيمَا يَأْتِي", tr: "Esmâ-i hamseye dokun.", items: [
      W("كُنْ بَارًّا بِ[أَبِيكَ] وَأُمِّكَ.", "Babana ve annene iyi davran.", "أَبِيكَ: harf-i cerle mecrûr, yâ ile."),
      W("زَارَتِ المَرْأَةُ [حَمَاهَا] المَرِيضَ فِي المُسْتَشْفَى.", "Kadın hasta kayınpederini hastanede ziyaret etti.", "حَمَاهَا: mef’ûl, elif ile."),
      W("ذَهَبَ كَرِيمٌ إِلَى المَطَارِ لِاسْتِقْبَالِ [أَخِيهِ] هَارُونَ.", "Kerîm kardeşi Hârûn’u karşılamak için havalimanına gitti.", "أَخِيهِ: muzâfun ileyh, yâ ile."),
      W("كَانَ [أَبُوهُ] مَشْهُورًا بِصِدْقِهِ.", "Babası doğruluğuyla meşhurdu.", "أَبُوهُ: kâne’nin ismi, vâv ile."),
      W("لَا تُخْرِجْ مِنْ [فِيكَ] قَوْلًا سَيِّئًا.", "Ağzından kötü bir söz çıkarma.", "فِيكَ: harf-i cerle mecrûr."),
      W("كَانَ يَشْتَغِلُ بِالعِلْمِ فَقَطْ قَبْلَ مَوْتِ [أَبِيهِ].", "Babasının ölümünden önce yalnız ilimle uğraşıyordu.", "أَبِيهِ: muzâfun ileyh."),
      W("قَابَلْتُ [أَخَا] شُعَيْبٍ فِي مَرْكَزِ التِّجَارَةِ.", "Şuayb’ın kardeşiyle ticaret merkezinde karşılaştım.", "أَخَا: mef’ûl, elif ile."),
      W("اتَّخِذْ دَائِمًا صَدِيقًا [ذَا] خُلُقٍ حَسَنٍ.", "Daima güzel ahlak sahibi bir dost edin.", "ذَا: sıfat, mansûb (صَدِيقًا'ya uyar).")
    ]},
    { type: "pick", fill: true, num: "٢", ar: "امْلَإِ الفَرَاغَ بِوَضْعِ الكَلِمَةِ المُنَاسِبَةِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Cümledeki görevine bak: merfû → vâv, mansûb → elif, mecrûr → yâ.", items: PL([
      ["إِنَّ ___ عَلِيٍّ (ابْنَ سِينَا) مِنْ أَهَمِّ الفَلَاسِفَةِ.", "أَبَا", "أَبُو", "أَبِي", "Ebû Ali İbn Sînâ en önemli filozoflardandır.", "İnne’nin ismi: mansûb, elif."],
      ["وَفَوْقَ كُلِّ ___ عِلْمٍ عَلِيمٌ.", "ذِي", "ذُو", "ذَا", "Her ilim sahibinin üstünde daha iyi bilen biri vardır. (Yûsuf 76)", "كُلِّ'nin muzâfun ileyhi: yâ."],
      ["نَظِّفْ ___ كُلَّ يَوْمٍ.", "فَاكَ", "فُوكَ", "فِيكَ", "Ağzını her gün temizle.", "Mef’ûl: elif."],
      ["كَانَ ___ رَجُلًا فَاضِلًا.", "حَمُوهُ", "حَمَاهُ", "حَمِيهِ", "Kayınpederi faziletli bir adamdı.", "Kâne’nin ismi: vâv."],
      ["مَرَرْتُ عَلَى ___ أَمْسِ.", "أَخِيكَ", "أَخُوكَ", "أَخَاكَ", "Dün kardeşinin yanından geçtim.", "Harf-i cer: yâ."],
      ["كَانَ ___ بَكْرٍ صَدِيقًا لِلنَّبِيِّ ﷺ.", "أَبُو", "أَبَا", "أَبِي", "Ebû Bekir Peygamber’in dostuydu.", "Kâne’nin ismi: vâv."],
      ["إِنَّ الأَبَ ___ فَضْلٍ عَلَى الوَلَدِ.", "ذُو", "ذَا", "ذِي", "Babanın çocuk üzerinde büyük hakkı vardır.", "İnne’nin haberi: merfû, vâv."],
      ["رَأَيْتُ ___ يُوسُفَ فِي المَكْتَبَةِ.", "أَخَا", "أَخُو", "أَخِي", "Yûsuf’un kardeşini kütüphanede gördüm.", "Mef’ûl: elif."]
    ])},
    { type: "classify", extra: true, opts: [["h", "Harfle (و / ا / ي)", "بِالحُرُوفِ", "cerr"], ["k", "Harekeyle", "بِالحَرَكَاتِ", "x"], ["t", "Takdîrî", "تَقْدِيرِيٌّ", "mi"]], ar: "كَيْفَ يُعْرَبُ الاسْمُ؟", tr: "Koyu isim nasıl i’rab edilir? Şartlara bak: müfred + muzâf mı, yâ-i mütekellime mi?", items: CL([
      [HL("جَاءَ أَبُو طَالِبٍ", "أَبُو"), "h", "Müfred ve muzâf: harfle."], [HL("جَاءَ أَبٌ", "أَبٌ"), "k", "Muzâf değil: harekeyle."],
      [HL("جَاءَ الأَبُ", "الأَبُ"), "k", "Muzâf değil."], [HL("جَاءَ أَبِي", "أَبِي"), "t", "Yâ-i mütekellim: takdîrî."],
      [HL("جَاءَ الآبَاءُ", "الآبَاءُ"), "k", "Cemi: harekeyle."], [HL("فُوكَ نَظِيفٌ", "فُوكَ"), "h", "Mîmsiz, muzâf: harfle."],
      [HL("فَمُكَ نَظِيفٌ", "فَمُكَ"), "k", "Mîmle: harekeyle."], [HL("أَحْمَدُ ذُو عِلْمٍ", "ذُو"), "h", "Harfle."],
      [HL("أَخِي مُهَنْدِسٌ", "أَخِي"), "t", "Takdîrî damme."], [HL("رَأَيْتُ أَخًا لَكَ", "أَخًا"), "k", "Muzâf değil: harekeyle."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · MERFÛ
{
  id: "u2", no: 2, ar: "رَفْعُ الأَسْمَاءِ الخَمْسَةِ بِالوَاوِ", tr: "Merfû: Vâv ile", short: "Merfû", col: "nasb", legend: ["cerr", "nasb"],
  goals: ["Esmâ-i hamsenin merfû olduğu görevleri tanımak: fâil, nâib-i fâil, mübtedâ, haber, kâne’nin ismi, inne’nin haberi", "Merfû yerde vâvlı biçimi yazmak: أَبُو، أَخُو، حَمُو، ذُو، فُو"],
  examples: [
    { s: "اِسْتَيْقَظَ:- / أَخُو:cerr / عَلِيٍّ.:nasb", tr: "Ali’nin kardeşi uyandı. (fâil)" },
    { s: "عَائِشَةُ:- / حَمُو:cerr / هَا:nasb / غَنِيٌّ.:-", tr: "Âişe’nin kayınpederi zengin. (mübtedâ)" }
  ],
  rules: [
    { tr: "Merfû yerde vâv: <span class=\"ar\">رَجَعَ أَبُو طَالِبٍ</span> (fâil), <span class=\"ar\">فُوكَ نَظِيفٌ</span> (mübtedâ), <span class=\"ar\">أَحْمَدُ ذُو عِلْمٍ</span> (haber), <span class=\"ar\">كَانَ أَبُوهُ مَشْهُورًا</span> (kâne’nin ismi), <span class=\"ar\">إِنَّ الأَبَ ذُو فَضْلٍ</span> (inne’nin haberi)." },
    { tr: "Merfû bir isme bağlanan (sıfat, atıf) esmâ-i hamse de merfûdur: <span class=\"ar\">ابْنُ عَمِّ عَلِيٍّ وَحَمُوهُ</span>." }
  ],
  kaide: ["أ ـ تُرْفَعُ بِالوَاوِ، مِثْلُ: رَجَعَ أَبُو طَالِبٍ، اسْتَيْقَظَ أَخُو عَلِيٍّ، أَحْمَدُ ذُو عِلْمٍ، عَائِشَةُ حَمُوهَا غَنِيٌّ، فُوكَ نَظِيفٌ."],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "امْلَإِ الفَرَاغَ بِاسْمٍ مَرْفُوعٍ مِنَ الأَسْمَاءِ الخَمْسَةِ", tr: "Merfû biçimi (vâvlı) seç.", exHtml: "<span class=\"ar\">أَصْبَحَ أَبُو بَكْرٍ الصِّدِّيقُ خَلِيفَةً بَعْدَ وَفَاةِ النَّبِيِّ ﷺ.</span>", items: PL([
      ["سَافَرَ ___ إِلَى اليَمَنِ فِي الأُسْبُوعِ المَاضِي.", "أَخُوكَ", "أَخَاكَ", "أَخِيكَ", "Kardeşin geçen hafta Yemen’e gitti.", "Fâil: vâv."],
      ["وَاللهُ ___ فَضْلٍ عَظِيمٍ.", "ذُو", "ذَا", "ذِي", "Allah büyük lütuf sahibidir. (Bakara 105)", "Haber: vâv."],
      ["___ مُهَنْدِسٌ فِي شَرِكَةِ الكَهْرَبَاءِ.", "أَبُوهُ", "أَبَاهُ", "أَبِيهِ", "Babası elektrik şirketinde mühendis.", "Mübtedâ: vâv."],
      ["لَا يَخْرُجْ ___ إِلَى السُّوقِ لَيْلًا.", "أَخُوكَ", "أَخَاكَ", "أَخِيكَ", "Kardeşin gece çarşıya çıkmasın.", "Fâil: vâv."],
      ["إِنَّ النَّبِيَّ ﷺ ابْنُ عَمِّ عَلِيٍّ رَضِيَ اللهُ عَنْهُ وَ___.", "حَمُوهُ", "حَمَاهُ", "حَمِيهِ", "Peygamber ﷺ Ali’nin amcasının oğlu ve kayınpederidir.", "Habere atıf: merfû (Ali, Fâtıma’nın kocası)."],
      ["___ مُدَرِّسُ التَّارِيخِ فِي المَدْرَسَةِ الثَّانَوِيَّةِ.", "أَخُو أَحْمَدَ", "أَخَا أَحْمَدَ", "أَخِي أَحْمَدَ", "Ahmed’in kardeşi lisede tarih öğretmeni.", "Mübtedâ: vâv."],
      ["___ سَافَرَ إِلَى لَنْدَنَ لِلتِّجَارَةِ.", "حَمُوكَ", "حَمَاكَ", "حَمِيكَ", "Kayınpederin ticaret için Londra’ya gitti.", "Mübtedâ: vâv."],
      ["جُنَيْدٌ ___ الأَكْبَرُ فِي أُسْرَتِنَا.", "أَخُونَا", "أَخَانَا", "أَخِينَا", "Cüneyd ailemizdeki en büyük kardeşimiz.", "Haber: vâv."]
    ])},
    { type: "classify", extra: true, opts: [["f", "Fâil", "فَاعِلٌ", "cerr"], ["m", "Mübtedâ", "مُبْتَدَأٌ", "nasb"], ["h", "Haber", "خَبَرٌ", "mz"], ["k", "Kâne’nin ismi", "اسْمُ كَانَ", "mi"]], ar: "مَا وَظِيفَةُ الاسْمِ المَرْفُوعِ؟", tr: "Koyu esmâ-i hamse cümlede ne? (hepsi merfû)", items: CL([
      [HL("رَجَعَ أَبُو طَالِبٍ", "أَبُو"), "f", "Fâil."], [HL("أَحْمَدُ ذُو عِلْمٍ", "ذُو"), "h", "Haber."], [HL("فُوكَ نَظِيفٌ", "فُوكَ"), "m", "Mübtedâ."],
      [HL("كَانَ أَبُوهُ مَشْهُورًا بِصِدْقِهِ", "أَبُوهُ"), "k", "Kâne’nin ismi."], [HL("اسْتَيْقَظَ أَخُو عَلِيٍّ", "أَخُو"), "f", "Fâil."], [HL("وَاللهُ ذُو فَضْلٍ عَظِيمٍ", "ذُو"), "h", "Haber."],
      [HL("حَمُوكَ سَافَرَ إِلَى لَنْدَنَ", "حَمُوكَ"), "m", "Mübtedâ."], [HL("كَانَ أَبُو بَكْرٍ صَدِيقًا لِلنَّبِيِّ", "أَبُو"), "k", "Kâne’nin ismi."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 3 · MANSÛB
{
  id: "u3", no: 3, ar: "نَصْبُ الأَسْمَاءِ الخَمْسَةِ بِالأَلِفِ", tr: "Mansûb: Elif ile", short: "Mansûb", col: "mi", legend: ["cerr", "nasb"],
  goals: ["Esmâ-i hamsenin mansûb olduğu görevleri tanımak: mef’ûl, inne’nin ismi, kâne’nin haberi", "Mansûb yerde elifli biçimi yazmak: أَبَا، أَخَا، حَمَا، ذَا، فَا"],
  examples: [
    { s: "رَأَيْتُ:- / أَخَا:cerr / عَلِيٍّ.:nasb", tr: "Ali’nin kardeşini gördüm. (mef’ûl)" },
    { s: "إِنَّ:- / حَمَا:cerr / هَا:nasb / مُسِنٌّ.:-", tr: "Kayınpederi yaşlıdır. (inne’nin ismi)", pair: "سَأَكُونُ:- / ذَا:cerr / عِلْمٍ.:nasb", pairTr: "İlim sahibi olacağım. (kâne’nin haberi)" }
  ],
  rules: [
    { tr: "Mansûb yerde elif: <span class=\"ar\">قَابَلْتُ أَبَا طَالِبٍ</span> (mef’ûl), <span class=\"ar\">إِنَّ حَمَاهَا مُسِنٌّ</span> (inne’nin ismi), <span class=\"ar\">سَأَكُونُ ذَا عِلْمٍ</span> (kâne’nin haberi), <span class=\"ar\">اِفْتَحْ فَاكَ</span>." },
    { tr: "Mansûb isme sıfat olunca da elif: <span class=\"ar\">صَدِيقًا ذَا خُلُقٍ حَسَنٍ</span>." }
  ],
  kaide: ["ب ـ وَتُنْصَبُ بِالأَلِفِ، مِثْلُ: قَابَلْتُ أَبَا طَالِبٍ، رَأَيْتُ أَخَا عَلِيٍّ، سَأَكُونُ ذَا عِلْمٍ، إِنَّ حَمَاهَا مُسِنٌّ، اِفْتَحْ فَاكَ."],
  ex: [
    { type: "pick", fill: true, num: "٦", ar: "امْلَإِ الفَرَاغَ بِاسْمٍ مَنْصُوبٍ مِنَ الأَسْمَاءِ الخَمْسَةِ", tr: "Mansûb biçimi (elifli) seç.", exHtml: "<span class=\"ar\">يَغْسِلُ الوَلَدُ فَاهُ بَعْدَ الأَكْلِ.</span>", items: PL([
      ["إِنَّ ___ رَجُلٌ كَرِيمٌ.", "أَبَاكَ", "أَبُوكَ", "أَبِيكَ", "Baban cömert bir adam.", "İnne’nin ismi: elif."],
      ["سَأَزُورُ ___ فِي الجَامِعَةِ غَدًا.", "أَخَاكَ", "أَخُوكَ", "أَخِيكَ", "Yarın kardeşini üniversitede ziyaret edeceğim.", "Mef’ûl: elif."],
      ["كَانَ عُثْمَانُ بْنُ عَفَّانَ ___ مَالٍ كَثِيرٍ.", "ذَا", "ذُو", "ذِي", "Osman b. Affân çok mal sahibiydi.", "Kâne’nin haberi: elif."],
      ["قَالَ طَبِيبُ الأَسْنَانِ لَهُ: «افْتَحْ ___ جَيِّدًا».", "فَاكَ", "فُوكَ", "فِيكَ", "Diş hekimi: “Ağzını iyice aç” dedi.", "Mef’ûl: elif."],
      ["احْتَرِمْ ___ لِأَنَّهُ وَالِدُ زَوْجَتِكَ.", "حَمَاكَ", "حَمُوكَ", "حَمِيكَ", "Kayınpederine saygı göster; o eşinin babasıdır.", "Mef’ûl: elif."],
      ["يَجِبُ عَلَى المُسْلِمِ أَنْ يَكُونَ ___ خُلُقٍ حَسَنٍ.", "ذَا", "ذُو", "ذِي", "Müslüman güzel ahlak sahibi olmalı.", "Kâne’nin haberi: elif."],
      ["سَمِعْتُ أَنَّ ___ صَدِيقِي مُصَابٌ بِالسَّرَطَانِ.", "أَخَا", "أَخُو", "أَخِي", "Arkadaşımın kardeşinin kansere yakalandığını duydum.", "أَنَّ'nin ismi: elif."],
      ["إِنَّ ___ تُوُفِّيَ قَبْلَ عَشْرِ سَنَوَاتٍ.", "حَمَاهَا", "حَمُوهَا", "حَمِيهَا", "Kayınpederi on yıl önce vefat etti.", "İnne’nin ismi: elif."]
    ])},
    { type: "classify", extra: true, opts: [["m", "Mef’ûlün bih", "مَفْعُولٌ بِهِ", "cerr"], ["i", "İnne’nin ismi", "اسْمُ إِنَّ", "nasb"], ["k", "Kâne’nin haberi", "خَبَرُ كَانَ", "mz"]], ar: "مَا وَظِيفَةُ الاسْمِ المَنْصُوبِ؟", tr: "Koyu esmâ-i hamse cümlede ne? (hepsi mansûb)", items: CL([
      [HL("قَابَلْتُ أَبَا طَالِبٍ", "أَبَا"), "m", "Mef’ûl."], [HL("إِنَّ حَمَاهَا مُسِنٌّ", "حَمَاهَا"), "i", "İnne’nin ismi."], [HL("سَأَكُونُ ذَا عِلْمٍ", "ذَا"), "k", "Kâne’nin haberi."],
      [HL("اِفْتَحْ فَاكَ", "فَاكَ"), "m", "Mef’ûl."], [HL("رَأَيْتُ أَخَا عَلِيٍّ", "أَخَا"), "m", "Mef’ûl."], [HL("إِنَّ أَبَاكَ رَجُلٌ كَرِيمٌ", "أَبَاكَ"), "i", "İnne’nin ismi."],
      [HL("كَانَ عُثْمَانُ ذَا مَالٍ كَثِيرٍ", "ذَا"), "k", "Kâne’nin haberi."], [HL("أَعْرِفُ أَنَّ أَخَا صَالِحٍ طَيَّارٌ", "أَخَا"), "i", "أَنَّ'nin ismi."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 4 · MECRÛR
{
  id: "u4", no: 4, ar: "جَرُّ الأَسْمَاءِ الخَمْسَةِ بِاليَاءِ", tr: "Mecrûr: Yâ ile", short: "Mecrûr", col: "ref", legend: ["cerr", "nasb"],
  goals: ["Esmâ-i hamsenin harf-i cerden sonra ve muzâfun ileyh olunca mecrûr olduğunu bilmek", "Mecrûr yerde yâlı biçimi yazmak: أَبِي، أَخِي، حَمِي، ذِي، فِي", "أَخِي mütekellim ile أَخِي عَلِيٍّ (mecrûr) farkını görmek"],
  examples: [
    { s: "مَرَرْتُ بِـ:- / أَخِي:cerr / عَلِيٍّ.:nasb", tr: "Ali’nin kardeşine uğradım. (harf-i cer)" },
    { s: "أَيْنَ بَيْتُ:- / حَمِي:cerr / هَا؟:nasb", tr: "Kayınpederinin evi nerede? (muzâfun ileyh)", pair: "مَاذَا أَخْرَجْتَ مِنْ:- / فِي:cerr / كَ؟:nasb", pairTr: "Ağzından ne çıkardın?" }
  ],
  rules: [
    { tr: "Mecrûr yerde yâ: harf-i cerden sonra (<span class=\"ar\">سَلَّمْتُ عَلَى أَبِي طَالِبٍ، مِنْ فِيكَ</span>) ve muzâfun ileyh olunca (<span class=\"ar\">بَيْتُ حَمِيهَا، فَوْقَ كُلِّ ذِي عِلْمٍ</span>)." },
    { tr: "Dikkat: <span class=\"ar\">أَخِي عَلِيٍّ</span> (Ali’nin kardeşi, mecrûr: yâ alâmet) ile <span class=\"ar\">أَخِي</span> (benim kardeşim: yâ zamir, i’rab takdîrî) aynı yazılır ama farklıdır." },
    { tr: "Lakaplar: <span class=\"ar\">ذُو النُّورَيْنِ</span> (Osman), <span class=\"ar\">أَبُو تُرَابٍ</span> (Ali), <span class=\"ar\">أَبُو حَامِدٍ</span> (Gazâlî); harf-i cerden sonra: <span class=\"ar\">لُقِّبَ بِذِي النُّورَيْنِ، بِأَبِي تُرَابٍ</span>." }
  ],
  kaide: ["جـ ـ وَتُجَرُّ بِاليَاءِ، مِثْلُ: سَلَّمْتُ عَلَى أَبِي طَالِبٍ، مَرَرْتُ بِأَخِي عَلِيٍّ، وَفَوْقَ كُلِّ ذِي عِلْمٍ عَلِيمٌ، أَيْنَ بَيْتُ حَمِيهَا؟ مَاذَا أَخْرَجْتَ مِنْ فِيكَ؟"],
  ex: [
    { type: "pick", fill: true, num: "٧", ar: "امْلَإِ الفَرَاغَ بِاسْمٍ مَجْرُورٍ مِنَ الأَسْمَاءِ الخَمْسَةِ", tr: "Mecrûr biçimi (yâlı) seç.", exHtml: "<span class=\"ar\">سَمِعْتُ مِنْ أَبِيكَ قَوْلًا عَجِيبًا.</span>", items: PL([
      ["أَحْسِنْ إِلَى ___ الحَاجَةِ تَكُنْ عَبْدًا مَقْبُولًا عِنْدَ اللهِ.", "ذِي", "ذُو", "ذَا", "İhtiyaç sahibine iyilik et ki Allah katında makbul bir kul olasın.", "Harf-i cer إِلَى: yâ."],
      ["الجَدُّ هُوَ أَبُو ___ أَوْ أُمِّكَ.", "أَبِيكَ", "أَبُوكَ", "أَبَاكَ", "Dede, babanın ya da annenin babasıdır.", "Muzâfun ileyh: yâ."],
      ["أَيْنَ يَدْرُسُ ابْنُ ___ الآنَ؟", "أَخِيكَ", "أَخُوكَ", "أَخَاكَ", "Kardeşinin oğlu şimdi nerede okuyor?", "Muzâfun ileyh: yâ."],
      ["أَخْرَجَتِ الطِّفْلَةُ مِنْ ___ شَيْئًا صَغِيرًا وَهِيَ تَضْحَكُ.", "فِيهَا", "فُوهَا", "فَاهَا", "Kız çocuk gülerek ağzından küçük bir şey çıkardı.", "Harf-i cer مِنْ: yâ."],
      ["كَانَ حَزِينًا جِدًّا عَلَى وَفَاةِ ___.", "أَبِيهِ", "أَبُوهُ", "أَبَاهُ", "Babasının vefatına çok üzgündü.", "Muzâfun ileyh: yâ."],
      ["لَقَّبَ الرَّسُولُ ﷺ عَلِيَّ بْنَ أَبِي طَالِبٍ بِـ___ تُرَابٍ.", "أَبِي", "أَبُو", "أَبَا", "Peygamber Ali’ye “Ebû Turâb” lakabını verdi.", "Harf-i cer بِـ: yâ."],
      ["مَرَرْتُ بِـ___ فِي مَكْتَبِهِ أَمْسِ.", "حَمِيكَ", "حَمُوكَ", "حَمَاكَ", "Dün kayınpederine bürosunda uğradım.", "Harf-i cer: yâ."],
      ["هَلْ قَرَأْتَ مِنْ كُتُبِ ___ حَامِدٍ الغَزَالِيِّ؟", "أَبِي", "أَبُو", "أَبَا", "Ebû Hâmid el-Gazâlî’nin kitaplarından okudun mu?", "Muzâfun ileyh: yâ."]
    ])},
    { type: "pick", num: "٣", ar: "ضَعْ عَلَامَةَ (✓) أَمَامَ التَّكْمِلَةِ الصَّحِيحَةِ", tr: "Doğru tamamlayıcıyı seç: cümlede görevi ne?", exHtml: "<span class=\"ar\">لُقِّبَ عُثْمَانُ رَضِيَ اللهُ عَنْهُ بِـ…… ← ذِي النُّورَيْنِ ✓</span>", items: PL([
      ["الَّذِي هَاجَرَ النَّبِيُّ ﷺ مَعَهُ هُوَ ___.", "أَبُو بَكْرٍ الصِّدِّيقُ", "أَبَا بَكْرٍ الصِّدِّيقَ", "أَبِي بَكْرٍ الصِّدِّيقِ", "Peygamber’in birlikte hicret ettiği kişi Ebû Bekir es-Sıddîk’tır.", "Haber: merfû."],
      ["سَمِعْتُ أَنَّ ___ سَافَرَ إِلَى مَكَّةَ لِلْعُمْرَةِ.", "أَخَا فَرِيدٍ", "أَخُو فَرِيدٍ", "أَخِي فَرِيدٍ", "Ferîd’in kardeşinin umre için Mekke’ye gittiğini duydum.", "أَنَّ'nin ismi: mansûb."],
      ["تُوُفِّيَ ___ قَبْلَ ثَلَاثِ سَنَوَاتٍ.", "حَمُو زَيْنَبَ", "حَمَا زَيْنَبَ", "حَمِي زَيْنَبَ", "Zeyneb’in kayınpederi üç yıl önce vefat etti.", "Nâib-i fâil: merfû."],
      ["مِنْ أَشْهَرِ كُتُبِ ___ الغَزَالِيِّ إِحْيَاءُ عُلُومِ الدِّينِ.", "أَبِي حَامِدٍ", "أَبُو حَامِدٍ", "أَبَا حَامِدٍ", "Gazâlî’nin en meşhur kitaplarından biri İhyâ’dır.", "Muzâfun ileyh: mecrûr."],
      ["لَا تَتَكَلَّمْ وَفِي ___ طَعَامٌ.", "فِيكَ", "فُوكَ", "فَاكَ", "Ağzında yemek varken konuşma.", "Harf-i cer فِي: mecrûr."],
      ["كَانَ عَلِيٌّ رَضِيَ اللهُ عَنْهُ ___.", "ذَا نَفْسٍ كَرِيمَةٍ", "ذُو نَفْسٍ كَرِيمَةٍ", "ذِي نَفْسٍ كَرِيمَةٍ", "Ali cömert ruhlu biriydi.", "Kâne’nin haberi: mansûb."],
      ["مَا سَمِعْتُ خَبَرًا عَنْ ___ مُنْذُ زَمَنٍ بَعِيدٍ.", "أَخِيكَ", "أَخُوكَ", "أَخَاكَ", "Uzun zamandır kardeşinden haber alamadım.", "Harf-i cer عَنْ: mecrûr."],
      ["كَانَ ___ حَامِيًا لِلنَّبِيِّ ﷺ حَتَّى وَفَاتِهِ.", "أَبُو طَالِبٍ", "أَبَا طَالِبٍ", "أَبِي طَالِبٍ", "Ebû Tâlib ölümüne kadar Peygamber’in koruyucusuydu.", "Kâne’nin ismi: merfû."]
    ])},
    { type: "classify", extra: true, opts: [["c", "Harf-i cerle", "بِحَرْفِ الجَرِّ", "cerr"], ["i", "Muzâfun ileyh", "مُضَافٌ إِلَيْهِ", "nasb"]], ar: "لِمَاذَا جُرَّ الاسْمُ؟", tr: "Koyu esmâ-i hamse neden mecrûr?", items: CL([
      [HL("سَلَّمْتُ عَلَى أَبِي طَالِبٍ", "أَبِي"), "c", "عَلَى."], [HL("مَرَرْتُ بِأَخِي عَلِيٍّ", "أَخِي"), "c", "بِـ."], [HL("أَيْنَ بَيْتُ حَمِيهَا؟", "حَمِيهَا"), "i", "بَيْتُ'in muzâfun ileyhi."],
      [HL("مَاذَا أَخْرَجْتَ مِنْ فِيكَ؟", "فِيكَ"), "c", "مِنْ."], [HL("وَفَوْقَ كُلِّ ذِي عِلْمٍ عَلِيمٌ", "ذِي"), "i", "كُلِّ'nin muzâfun ileyhi."], [HL("قَبْلَ مَوْتِ أَبِيهِ", "أَبِيهِ"), "i", "مَوْتِ'in muzâfun ileyhi."],
      [HL("عَلِيُّ بْنُ أَبِي طَالِبٍ", "أَبِي"), "i", "بْنُ'nun muzâfun ileyhi."], [HL("كُنْ بَارًّا بِأَبِيكَ", "أَبِيكَ"), "c", "بِـ."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · İ’RAB VE OKUMA
{
  id: "u5", no: 5, ar: "الإِعْرَابُ وَالقِرَاءَةُ", tr: "İ’rab ve Okuma", short: "İ’rab", col: "muz", legend: ["cerr", "nasb"],
  goals: ["Esmâ-i hamseyi görevi ve alâmetiyle i’rab etmek: أَبُو: مُبْتَدَأٌ مَرْفُوعٌ بِالوَاوِ", "Soruya parantezdeki kelimeyi doğru halde koyarak cevap vermek", "Okuma parçasındaki esmâ-i hamseyi i’rab etmek"],
  examples: [
    { s: "أَبُو:cerr / حَامِدٍ:nasb / الغَزَالِيُّ عَالِمٌ مَشْهُورٌ.:-", tr: "Ebû Hâmid el-Gazâlî meşhur bir âlimdir. (أَبُو: مُبْتَدَأٌ مَرْفُوعٌ بِالوَاوِ)" }
  ],
  rules: [
    { tr: "İ’rab sırası: görevi + hükmü + alâmeti: <span class=\"ar\">أَبُو: مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الوَاوُ لِأَنَّهُ مِنَ الأَسْمَاءِ الخَمْسَةِ، وَهُوَ مُضَافٌ</span>." },
    { tr: "Yâ-i mütekellimle: <span class=\"ar\">تُوُفِّيَ أَبِي: نَائِبُ فَاعِلٍ مَرْفُوعٌ بِالضَّمَّةِ المُقَدَّرَةِ عَلَى البَاءِ</span>." }
  ],
  kaide: ["عَيِّنِ الأَسْمَاءَ الخَمْسَةَ وَأَعْرِبْهَا: أَبُو حَامِدٍ الغَزَالِيُّ عَالِمٌ مَشْهُورٌ ← أَبُو: مُبْتَدَأٌ مَرْفُوعٌ بِالوَاوِ."],
  ex: [
    { type: "combo", num: "٤", ar: "عَيِّنِ الأَسْمَاءَ الخَمْسَةَ فِيمَا يَأْتِي وَأَعْرِبْهَا", tr: "Esmâ-i hamsenin görevini ve hükmünü seç.", items: [
      ["﴿إِذْ قَالَ لَهُمْ أَخُوهُمْ صَالِحٌ أَلَا تَتَّقُونَ﴾", "أَخُوهُمْ", "Fâil", "Merfû · vâv ile", "Hani kardeşleri Sâlih onlara: “Sakınmaz mısınız?” demişti. (Şuarâ 142)", "فَاعِلٌ مَرْفُوعٌ بِالوَاوِ."],
      ["تُوُفِّيَ أَبِي قَبْلَ سَنَوَاتٍ.", "أَبِي", "Nâib-i fâil", "Merfû · takdîrî damme", "Babam yıllar önce vefat etti.", "Yâ-i mütekellim: takdîrî."],
      ["﴿وَآتِ ذَا القُرْبَى حَقَّهُ﴾", "ذَا", "Mef’ûlün bih", "Mansûb · elif ile", "Akrabaya hakkını ver. (İsrâ 26)", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالأَلِفِ."],
      ["﴿فَطَوَّعَتْ لَهُ نَفْسُهُ قَتْلَ أَخِيهِ﴾", "أَخِيهِ", "Muzâfun ileyh", "Mecrûr · yâ ile", "Nefsi onu kardeşini öldürmeye itti. (Mâide 30)", "مُضَافٌ إِلَيْهِ مَجْرُورٌ بِاليَاءِ."],
      ["لَا تَتَكَلَّمْ وَفُوكَ مَمْلُوءٌ.", "فُوكَ", "Mübtedâ", "Merfû · vâv ile", "Ağzın doluyken konuşma.", "مُبْتَدَأٌ مَرْفُوعٌ بِالوَاوِ."],
      ["مَاذَا يَعْمَلُ حَمُوكَ هَذِهِ الأَيَّامَ؟", "حَمُوكَ", "Fâil", "Merfû · vâv ile", "Kayınpederin bu günlerde ne iş yapıyor?", "فَاعِلٌ مَرْفُوعٌ بِالوَاوِ."],
      ["عَلِيُّ بْنُ أَبِي طَالِبٍ مَشْهُورٌ بِعِلْمِهِ وَشَجَاعَتِهِ.", "أَبِي", "Muzâfun ileyh", "Mecrûr · yâ ile", "Ali b. Ebî Tâlib ilmi ve cesaretiyle meşhurdur.", "مُضَافٌ إِلَيْهِ مَجْرُورٌ بِاليَاءِ."],
      ["أَعْرِفُ أَنَّ أَخَا صَالِحٍ طَيَّارٌ مَاهِرٌ.", "أَخَا", "İnne’nin ismi", "Mansûb · elif ile", "Sâlih’in kardeşinin usta bir pilot olduğunu biliyorum.", "اسْمُ أَنَّ مَنْصُوبٌ بِالأَلِفِ."]
    ].map(IR) },
    { type: "pick", num: "٨", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ بِمَا بَيْنَ القَوْسَيْنِ", tr: "Parantezdeki kelimeyi cevaptaki görevine göre çekerek doğru cevabı seç.", exHtml: "<span class=\"ar\">لِمَنِ اشْتَرَيْتَ هَذَا القَلَمَ؟ (أَخُو عَلِيٍّ) ← اشْتَرَيْتُ هَذَا القَلَمَ لِأَخِي عَلِيٍّ.</span>", items: PL([
      ["مَعَ مَنْ تَكَلَّمْتَ قَبْلَ قَلِيلٍ؟ (حَمُو مُحَمَّدٍ)", "تَكَلَّمْتُ مَعَ حَمِي مُحَمَّدٍ.", "تَكَلَّمْتُ مَعَ حَمُو مُحَمَّدٍ.", "تَكَلَّمْتُ مَعَ حَمَا مُحَمَّدٍ.", "Az önce Muhammed’in kayınpederiyle konuştum.", "مَعَ zarfının muzâfun ileyhi: yâ."],
      ["مَنْ صَحِبَ الرَّسُولَ ﷺ فِي الهِجْرَةِ؟ (أَبُو بَكْرٍ)", "صَحِبَهُ أَبُو بَكْرٍ.", "صَحِبَهُ أَبَا بَكْرٍ.", "صَحِبَهُ أَبِي بَكْرٍ.", "Hicrette ona Ebû Bekir eşlik etti.", "Fâil: vâv."],
      ["مَنْ هَذَا الرَّجُلُ؟ (ذُو عِلْمٍ)", "هَذَا الرَّجُلُ ذُو عِلْمٍ.", "هَذَا الرَّجُلُ ذَا عِلْمٍ.", "هَذَا الرَّجُلُ ذِي عِلْمٍ.", "Bu adam ilim sahibidir.", "Haber: vâv."],
      ["مَنْ رَأَيْتَ فِي المَكْتَبَةِ أَمْسِ؟ (أَخُو صَدِيقِي)", "رَأَيْتُ أَخَا صَدِيقِي.", "رَأَيْتُ أَخُو صَدِيقِي.", "رَأَيْتُ أَخِي صَدِيقِي.", "Arkadaşımın kardeşini gördüm.", "Mef’ûl: elif."],
      ["مِمَّ يَشْكُو المَرِيضُ؟ (فُوهُ)", "يَشْكُو مِنْ فِيهِ.", "يَشْكُو مِنْ فُوهُ.", "يَشْكُو مِنْ فَاهُ.", "Hasta ağzından şikâyetçi.", "Harf-i cer: yâ."],
      ["بِمَ لُقِّبَ عَلِيُّ بْنُ أَبِي طَالِبٍ؟ (أَبُو تُرَابٍ)", "لُقِّبَ بِأَبِي تُرَابٍ.", "لُقِّبَ بِأَبُو تُرَابٍ.", "لُقِّبَ بِأَبَا تُرَابٍ.", "Ebû Turâb lakabıyla anıldı.", "Harf-i cer: yâ."],
      ["مَنْ أَفْلَحَ يَوْمَ القِيَامَةِ؟ (ذُو قَلْبٍ سَلِيمٍ)", "أَفْلَحَ ذُو قَلْبٍ سَلِيمٍ.", "أَفْلَحَ ذَا قَلْبٍ سَلِيمٍ.", "أَفْلَحَ ذِي قَلْبٍ سَلِيمٍ.", "Kıyamet günü selim kalp sahibi kurtulur.", "Fâil: vâv."],
      ["مَنْ قَابَلْتَ فِي السُّوقِ أَمْسِ؟ (أَخُوكَ)", "قَابَلْتُ أَخَاكَ.", "قَابَلْتُ أَخُوكَ.", "قَابَلْتُ أَخِيكَ.", "Dün çarşıda kardeşinle karşılaştım.", "Mef’ûl: elif."]
    ])},
    { type: "reading", num: "٩", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ", tr: "Metni oku, soruları cevapla; sonra koyu esmâ-i hamsenin i’rabını seç.", title: "سَعِيدٌ ذُو النَّفْسِ الكَرِيمَةِ",
      text: "سَعِيدٌ شَابٌّ ذُو نَفْسٍ كَرِيمَةٍ، يُحِبُّ الإِحْسَانَ إِلَى الفُقَرَاءِ. ذَاتَ يَوْمٍ خَرَجَ مَعَ أَخِيهِ جَمِيلٍ وَأَبِيهِ إِلَى المَسْجِدِ، وَبَعْدَ الصَّلَاةِ عَادَ الأَبُ إِلَى البَيْتِ، أَمَّا سَعِيدٌ وَأَخُوهُ جَمِيلٌ فَذَهَبَا إِلَى السُّوقِ لِشِرَاءِ بَعْضِ حَاجَاتِ البَيْتِ. وَفِي الطَّرِيقِ رَأَى سَعِيدٌ بِنْتًا صَغِيرَةً تَرْتَعِشُ مِنَ البَرْدِ، فَأَسْرَعَ إِلَيْهَا وَأَعْطَاهَا نِصْفَ مَا فِي جَيْبِهِ مِنَ النُّقُودِ، وَمَسَحَ رَأْسَهَا وَتَحَدَّثَ إِلَيْهَا. لَمَّا وَصَلَ سَعِيدٌ مَعَ أَخِيهِ إِلَى البَيْتِ سَأَلَ أَبُوهُ عَنْ سَبَبِ تَأَخُّرِهِمَا، فَذَكَرَ جَمِيلٌ كُلَّ مَا حَدَثَ فِي الطَّرِيقِ وَمَا فَعَلَهُ أَخُوهُ الكَبِيرُ سَعِيدٌ. بَعْدَ أَنِ اسْتَمَعَ الأَبُ إِلَيْهِ اتَّجَهَ إِلَى ابْنِهِ سَعِيدٍ وَقَبَّلَهُ وَقَالَ لَهُ: «أَنْتَ يَا بُنَيَّ ذُو قَلْبٍ رَحِيمٍ، جَزَاكَ اللهُ خَيْرَ الجَزَاءِ».",
      textTr: "Saîd cömert ruhlu bir gençtir, fakirlere iyilik etmeyi sever. Bir gün kardeşi Cemîl ve babasıyla camiye çıktı; namazdan sonra baba eve döndü, Saîd ile kardeşi Cemîl ise evin bazı ihtiyaçlarını almak için çarşıya gittiler. Yolda Saîd soğuktan titreyen küçük bir kız gördü; hemen yanına koştu, cebindeki paranın yarısını ona verdi, başını okşadı ve onunla konuştu. Saîd kardeşiyle eve varınca babası gecikmelerinin sebebini sordu. Cemîl yolda olan her şeyi ve ağabeyi Saîd’in yaptığını anlattı. Baba onu dinledikten sonra oğlu Saîd’e döndü, onu öptü ve: “Yavrum, sen merhametli bir kalp sahibisin; Allah seni en güzel şekilde mükâfatlandırsın” dedi.",
      qa: [
        { q: "لِمَاذَا ذَهَبَ سَعِيدٌ مَعَ أَبِيهِ وَأَخِيهِ إِلَى المَسْجِدِ؟", a: "ذَهَبُوا لِلصَّلَاةِ.", tr: "Saîd babası ve kardeşiyle camiye neden gitti? Namaz için." },
        { q: "أَيْنَ ذَهَبَ الأَبُ بَعْدَ الصَّلَاةِ؟", a: "عَادَ إِلَى البَيْتِ.", tr: "Baba namazdan sonra nereye gitti? Eve döndü." },
        { q: "لِمَاذَا كَانَتْ تَرْتَعِشُ البِنْتُ الصَّغِيرَةُ؟", a: "كَانَتْ تَرْتَعِشُ مِنَ البَرْدِ.", tr: "Küçük kız neden titriyordu? Soğuktan." },
        { q: "كَيْفَ عَامَلَ سَعِيدٌ البِنْتَ؟", a: "أَعْطَاهَا نِصْفَ مَا فِي جَيْبِهِ، وَمَسَحَ رَأْسَهَا، وَتَحَدَّثَ إِلَيْهَا.", tr: "Saîd kıza nasıl davrandı? Parasının yarısını verdi, başını okşadı, konuştu." },
        { q: "مَا رَأْيُكَ فِي سَعِيدٍ؟", a: "سَعِيدٌ شَابٌّ ذُو نَفْسٍ كَرِيمَةٍ وَقَلْبٍ رَحِيمٍ.", tr: "Saîd hakkında ne düşünüyorsun? Cömert ruhlu, merhametli bir genç." }
      ],
      cls: { opts: HAL3, ar: "أَعْرِبِ الأَسْمَاءَ الخَمْسَةَ فِي القِطْعَةِ", tr: "Koyu esmâ-i hamse nasıl i’rab edilir?", items: [
        { s: HL("سَعِيدٌ شَابٌّ ذُو نَفْسٍ كَرِيمَةٍ", "ذُو"), a: "r", why: "شَابٌّ'ın sıfatı: merfû, vâv ile." },
        { s: HL("خَرَجَ مَعَ أَخِيهِ جَمِيلٍ", "أَخِيهِ"), a: "c", why: "مَعَ'nin muzâfun ileyhi: mecrûr, yâ ile." },
        { s: HL("مَعَ أَخِيهِ جَمِيلٍ وَأَبِيهِ", "وَأَبِيهِ"), a: "c", why: "أَخِيهِ'ye atıf: mecrûr, yâ ile." },
        { s: HL("أَمَّا سَعِيدٌ وَأَخُوهُ جَمِيلٌ فَذَهَبَا", "وَأَخُوهُ"), a: "r", why: "سَعِيدٌ'a (mübtedâ) atıf: merfû, vâv ile." },
        { s: HL("لَمَّا وَصَلَ سَعِيدٌ مَعَ أَخِيهِ", "أَخِيهِ"), a: "c", why: "Muzâfun ileyh: yâ ile." },
        { s: HL("سَأَلَ أَبُوهُ عَنْ سَبَبِ تَأَخُّرِهِمَا", "أَبُوهُ"), a: "r", why: "Fâil: vâv ile." },
        { s: HL("وَمَا فَعَلَهُ أَخُوهُ الكَبِيرُ سَعِيدٌ", "أَخُوهُ"), a: "r", why: "Fâil: vâv ile." },
        { s: HL("أَنْتَ يَا بُنَيَّ ذُو قَلْبٍ رَحِيمٍ", "ذُو"), a: "r", why: "Haber: vâv ile." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
// Doğru Biçim oyunu: [cümle {boşluk}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var MV_POOL = [
  ["رَجَعَ {أَبُو} طَالِبٍ.", ["أَبُو", "أَبَا", "أَبِي"], "fâil: vâv", "Ebû Tâlib döndü.", "u2"],
  ["اسْتَيْقَظَ {أَخُو} عَلِيٍّ.", ["أَخُو", "أَخَا", "أَخِي"], "fâil: vâv", "Ali’nin kardeşi uyandı.", "u2"],
  ["أَحْمَدُ {ذُو} عِلْمٍ.", ["ذُو", "ذَا", "ذِي"], "haber: vâv", "Ahmed ilim sahibi.", "u2"],
  ["عَائِشَةُ {حَمُوهَا} غَنِيٌّ.", ["حَمُوهَا", "حَمَاهَا", "حَمِيهَا"], "mübtedâ: vâv", "Âişe’nin kayınpederi zengin.", "u2"],
  ["{فُوكَ} نَظِيفٌ.", ["فُوكَ", "فَاكَ", "فِيكَ"], "mübtedâ: vâv", "Ağzın temiz.", "u2"],
  ["كَانَ {أَبُوهُ} مَشْهُورًا بِصِدْقِهِ.", ["أَبُوهُ", "أَبَاهُ", "أَبِيهِ"], "kâne’nin ismi: vâv", "Babası doğruluğuyla meşhurdu.", "u2"],
  ["وَاللهُ {ذُو} الفَضْلِ العَظِيمِ.", ["ذُو", "ذَا", "ذِي"], "haber: vâv", "Allah büyük lütuf sahibidir.", "u2"],
  ["قَابَلْتُ {أَبَا} طَالِبٍ.", ["أَبَا", "أَبُو", "أَبِي"], "mef’ûl: elif", "Ebû Tâlib’le görüştüm.", "u3"],
  ["رَأَيْتُ {أَخَا} عَلِيٍّ.", ["أَخَا", "أَخُو", "أَخِي"], "mef’ûl: elif", "Ali’nin kardeşini gördüm.", "u3"],
  ["سَأَكُونُ {ذَا} عِلْمٍ.", ["ذَا", "ذُو", "ذِي"], "kâne’nin haberi: elif", "İlim sahibi olacağım.", "u3"],
  ["إِنَّ {حَمَاهَا} مُسِنٌّ.", ["حَمَاهَا", "حَمُوهَا", "حَمِيهَا"], "inne’nin ismi: elif", "Kayınpederi yaşlı.", "u3"],
  ["اِفْتَحْ {فَاكَ}.", ["فَاكَ", "فُوكَ", "فِيكَ"], "mef’ûl: elif", "Ağzını aç.", "u3"],
  ["﴿وَآتِ {ذَا} القُرْبَى حَقَّهُ﴾", ["ذَا", "ذُو", "ذِي"], "mef’ûl: elif", "Akrabaya hakkını ver.", "u3"],
  ["اتَّخِذْ صَدِيقًا {ذَا} خُلُقٍ حَسَنٍ.", ["ذَا", "ذُو", "ذِي"], "mansûb sıfat: elif", "Güzel ahlaklı bir dost edin.", "u3"],
  ["سَلَّمْتُ عَلَى {أَبِي} طَالِبٍ.", ["أَبِي", "أَبُو", "أَبَا"], "harf-i cer: yâ", "Ebû Tâlib’e selam verdim.", "u4"],
  ["مَرَرْتُ بِـ{أَخِي} عَلِيٍّ.", ["أَخِي", "أَخُو", "أَخَا"], "harf-i cer: yâ", "Ali’nin kardeşine uğradım.", "u4"],
  ["وَفَوْقَ كُلِّ {ذِي} عِلْمٍ عَلِيمٌ.", ["ذِي", "ذُو", "ذَا"], "muzâfun ileyh: yâ", "Her ilim sahibinin üstünde bir bilen var.", "u4"],
  ["أَيْنَ بَيْتُ {حَمِيهَا}؟", ["حَمِيهَا", "حَمُوهَا", "حَمَاهَا"], "muzâfun ileyh: yâ", "Kayınpederinin evi nerede?", "u4"],
  ["مَاذَا أَخْرَجْتَ مِنْ {فِيكَ}؟", ["فِيكَ", "فُوكَ", "فَاكَ"], "harf-i cer: yâ", "Ağzından ne çıkardın?", "u4"],
  ["لُقِّبَ عُثْمَانُ بِـ{ذِي} النُّورَيْنِ.", ["ذِي", "ذُو", "ذَا"], "harf-i cer: yâ", "Osman Zinnûreyn lakabıyla anıldı.", "u4"],
  ["﴿قَتْلَ {أَخِيهِ}﴾", ["أَخِيهِ", "أَخُوهُ", "أَخَاهُ"], "muzâfun ileyh: yâ", "Kardeşini öldürmeyi.", "u4"],
  ["{أَخِي} مُهَنْدِسٌ.", ["أَخِي", "أَخُوي", "أَخَايَ"], "yâ-i mütekellim: takdîrî", "Kardeşim mühendis.", "u1"],
  ["{فَمُكَ} نَظِيفٌ.", ["فَمُكَ", "فَمَكَ", "فَمِكَ"], "mîmle: harekeyle", "Ağzın temiz.", "u1"]
];
// Hali Değiştir: [verilen ← hedef, doğru, y1, y2, açıklama, konu]
var DON = [];
[["أَبُو طَالِبٍ", "أَبَا طَالِبٍ", "أَبِي طَالِبٍ"], ["أَخُو عَلِيٍّ", "أَخَا عَلِيٍّ", "أَخِي عَلِيٍّ"], ["حَمُوهَا", "حَمَاهَا", "حَمِيهَا"], ["ذُو عِلْمٍ", "ذَا عِلْمٍ", "ذِي عِلْمٍ"], ["فُوكَ", "فَاكَ", "فِيكَ"], ["أَبُوكَ", "أَبَاكَ", "أَبِيكَ"], ["أَخُوهُ", "أَخَاهُ", "أَخِيهِ"]].forEach(function (f, i) {
  var fr = ["رَجَعَ ", "رَأَيْتُ ", "سَلَّمْتُ عَلَى "], hal = ["merfû", "mansûb", "mecrûr"], top = ["u2", "u3", "u4"];
  [[0, 1], [1, 2], [2, 0]].forEach(function (p, k) {
    if ((i + k) % 3 === 2) return;
    var t = p[1], o = [0, 1, 2].filter(function (z) { return z !== t; });
    DON.push([fr[p[0]] + f[p[0]] + " ← " + hal[t], fr[t] + f[t], fr[t] + f[o[0]], fr[t] + f[o[1]], hal[t] + ": " + ["vâv", "elif", "yâ"][t], top[t]]);
  });
});
// Hangi Hal? hız oyunu
var NOUN_LIST = [];
UNITS.forEach(function (u) { u.ex.forEach(function (ex) { if (ex.cls && ex.cls.opts === HAL3) ex.cls.items.forEach(function (it) { NOUN_LIST.push([it.s, it.a, it.why]); }); }); });
MV_POOL.forEach(function (p) { var m = /\{([^}]+)\}/.exec(p[0]), w = m[1], k = p[4] === "u2" ? "r" : p[4] === "u3" ? "n" : p[4] === "u4" ? "c" : ""; if (k) NOUN_LIST.push([p[0].replace(m[0], '<b class="hl">' + w + '</b>'), k, p[2]]); });
var SP_M = HAL3;
// Harfle mi? hız oyunu
var MM_OPTS = [["h", "Harfle", "بِالحُرُوفِ", "cerr"], ["d", "Harfle değil", "لَا", "x"]];
var MM_LIST = UNITS[0].ex[2].items.map(function (it) { return [it.s, it.a === "h" ? "h" : "d", it.why]; });
[["أَبُو بَكْرٍ", "h"], ["ذَا النُّورَيْنِ", "h"], ["أَبِي حَامِدٍ", "h"], ["فَاهُ", "h"], ["حَمِيكَ", "h"], ["الأَخُ", "d"], ["إِخْوَةٌ", "d"], ["أَبَوَانِ", "d"], ["فَمٌ", "d"], ["أَبِي (babam)", "d"], ["أَخُوكَ", "h"], ["آبَاؤُنَا", "d"]].forEach(function (x) { MM_LIST.push([x[0], x[1], x[1] === "h" ? "Müfred ve muzâf: harfle." : "Şart yok (muzâf değil / cemi / müsennâ / mîmli / yâ-i mütekellim)."]); });
var HAFIZA = {
  rn: { name: "Merfû ↔ mansûb", pairs: [["أَبُو", "أَبَا"], ["أَخُو", "أَخَا"], ["حَمُو", "حَمَا"], ["ذُو", "ذَا"], ["فُوكَ", "فَاكَ"], ["أَبُوهُ", "أَبَاهُ"], ["أَخُوكَ", "أَخَاكَ"]] },
  lk: { name: "Lakap ↔ kişi", pairs: [["ذُو النُّورَيْنِ", "Hz. Osman"], ["أَبُو تُرَابٍ", "Hz. Ali"], ["أَبُو بَكْرٍ", "es-Sıddîk"], ["أَبُو حَامِدٍ", "Gazâlî"], ["أَبُو عَلِيٍّ", "İbn Sînâ"], ["أَبُو طَالِبٍ", "Peygamberin amcası"], ["ذُو القَرْنَيْنِ", "Zülkarneyn"]] },
  tr: { name: "Kelime ↔ anlam", pairs: [["أَبٌ", "baba"], ["أَخٌ", "kardeş"], ["حَمٌ", "kayınpeder"], ["ذُو", "sahibi"], ["فَمٌ", "ağız"], ["ذُو عِلْمٍ", "ilim sahibi"], ["فُوكَ", "ağzın"]] }
};
var KARTLAR = [
  ["Esmâ-i hamse?", "أَبٌ، أَخٌ، حَمٌ، ذُو، فَمٌ"],
  ["Harfle i’rab şartı?", "Müfred ve muzâf olmak (yâ-i mütekellime değil)."],
  ["Merfû alâmeti?", "Vâv: أَبُو طَالِبٍ، ذُو عِلْمٍ، فُوكَ"],
  ["Mansûb alâmeti?", "Elif: أَبَا طَالِبٍ، ذَا عِلْمٍ، فَاكَ"],
  ["Mecrûr alâmeti?", "Yâ: أَبِي طَالِبٍ، ذِي عِلْمٍ، فِيكَ"],
  ["أَخِي مُهَنْدِسٌ: i’rab?", "Mübtedâ; hâ üzerinde takdîrî damme ile merfû."],
  ["جَاءَ أَبٌ nasıl i’rab edilir?", "Harekeyle: muzâf değil."],
  ["فَمُكَ / فُوكَ?", "Mîmle harekeyle (فَمُكَ); mîmsiz harfle (فُوكَ)."],
  ["ذُو neye muzâf olur?", "İsme: ذُو عِلْمٍ، ذُو خُلُقٍ; zamire eklenmez."],
  ["حَمٌ ne demek?", "Kayınpeder (eşin babası): حَمُوهَا"],
  ["Lakaplar?", "ذُو النُّورَيْنِ (Osman), أَبُو تُرَابٍ (Ali), أَبُو حَامِدٍ (Gazâlî)"],
  ["أَبُو: i’rab cümlesi?", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الوَاوُ لِأَنَّهُ مِنَ الأَسْمَاءِ الخَمْسَةِ"]
];
