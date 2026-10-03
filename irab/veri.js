// ================= VERİ: İsimlerin İ'rabı (kitaptaki iki ders, dört konu) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" olan parça düz metindir. "ref.Fâil" gibi yazılırsa etikete görev eklenir.
var ROLES = {
  ref: { ar: "مَرْفُوعٌ", tr: "Merfû" }, nasb: { ar: "مَنْصُوبٌ", tr: "Mansûb" }, cerr: { ar: "مَجْرُورٌ", tr: "Mecrûr" },
  muf: { ar: "مُفْرَدٌ", tr: "Müfred" }, mus: { ar: "مُثَنًّى", tr: "Müsennâ" }, mzs: { ar: "جَمْعُ مُذَكَّرٍ سَالِمٌ", tr: "Cem-i müz. sâlim" },
  mns: { ar: "جَمْعُ مُؤَنَّثٍ سَالِمٌ", tr: "Cem-i müe. sâlim" }, tks: { ar: "جَمْعُ تَكْسِيرٍ", tr: "Cem-i teksîr" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var TUR_OPTS = [["mus", "Müsennâ", "مُثَنًّى", "mus"], ["mzs", "Cem-i müz. sâlim", "جَمْعُ مُذَكَّرٍ سَالِمٌ", "mzs"], ["mns", "Cem-i müe. sâlim", "جَمْعُ مُؤَنَّثٍ سَالِمٌ", "mns"], ["tks", "Cem-i teksîr", "جَمْعُ تَكْسِيرٍ", "tks"]];
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cerr", "Mecrûr", "مَجْرُورٌ", "cerr"]];

// yardımcılar: W = okuma cümlesi ([kelime] hedef), CB = dönüştürme (kutu) maddesi, IR = i'rab maddesi
function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) { var m = /^\[(.*)\](.*)$/.exec(w); return m ? m[1] + m[2] + ":y" : w + ":x"; }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function IR(s, t, c, why, tr) { return { s: s, t: t, c: c, why: why, tr: tr }; }

var UNITS = [
// ---------------------------------------------------------------- 1 · MÜSENNÂ
{
  id: "u1", no: 1, ar: "إِعْرَابُ المُثَنَّى", tr: "Müsennânın İ'rabı", short: "Müsennâ", col: "mus", part: 1,
  goals: ["Müsennâyı ـانِ / ـَيْنِ ekleriyle tanımak ve kurmak", "Merfû iken elif, mansûb ve mecrûr iken yâ aldığını görmek", "Fâili ve mef'ûlü müsennâya çevirmek"],
  examples: [
    { s: "اسْتَقْبَلَ:- / الطَّالِبَانِ:ref.Fâil / المُعَلِّمَ:-", tr: "İki öğrenci öğretmeni karşıladı.", why: "Fâil → merfû → alameti elif: ـانِ" },
    { s: "وَدَّعَ:- / الوَالِدُ:- / الطَّالِبَيْنِ:nasb.Mef'ûl", tr: "Baba iki öğrenciyi uğurladı.", why: "Mef'ûl bih → mansûb → alameti yâ: ـَيْنِ" },
    { s: "لَعِبَ:- / سَلِيمٌ:- / مَعَ:- / الطَّالِبَيْنِ:cerr.Muzâfun ileyh", tr: "Selîm iki öğrenciyle oynadı.", why: "مَعَ kelimesinden sonra → mecrûr → alameti yâ: ـَيْنِ" }
  ],
  rules: [
    { tr: "<b class=\"r-mus\">Müsennâ</b>, iki erkeği ya da iki dişiyi (iki şeyi) gösteren isimdir. Tekilin sonuna <span class=\"ar\">ـانِ</span> ya da <span class=\"ar\">ـَيْنِ</span> eklenir.", ex: ["طَالِبٌ ← طَالِبَانِ / طَالِبَيْنِ", "طَالِبَةٌ ← طَالِبَتَانِ / طَالِبَتَيْنِ"] },
    { tr: "<b class=\"r-ref\">Merfû</b> iken alameti <b>elif</b>tir.", ex: ["اسْتَقْبَلَ الطَّالِبَانِ المُعَلِّمَ"] },
    { tr: "<b class=\"r-nasb\">Mansûb</b> ve <b class=\"r-cerr\">mecrûr</b> iken alameti <b>sakin yâ</b>dır: ikisi aynı görünür.", ex: ["وَدَّعَ الوَالِدُ الطَّالِبَيْنِ", "لَعِبَ سَلِيمٌ مَعَ الطَّالِبَيْنِ"] },
    { tr: "Sondaki nun <b>daima kesrelidir</b> (<span class=\"ar\">ـنِ</span>). Müsennâ tenvin almaz: <span class=\"ar\">مَرِيضٌ ← مَرِيضَانِ</span>." },
    { tr: "Müennes isimde <span class=\"ar\">ة</span> açılır, <span class=\"ar\">ت</span> olur.", ex: ["الطِّفْلَةُ ← الطِّفْلَتَانِ", "وَرَقَةً ← وَرَقَتَيْنِ"] },
    { tr: "İpucu: Fiil başta ise fâil müsennâ olsa da fiil <b>tekil kalır</b>. Sıfat ve zamir ise uyar: <span class=\"ar\">ـهُ ← ـهُمَا</span>.", ex: ["فَحَصَ الطَّبِيبَانِ المَاهِرَانِ المَرِيضَ", "وَصَلَ المُسَافِرَانِ إِلَى بَلَدِهِمَا"] },
    { tr: "İpucu: Müsennâ muzâf olunca nunu düşer (okuma parçasında geçer).", ex: ["مُعَلِّمَانِ + الصَّفِّ ← مُعَلِّمَا الصَّفِّ"] }
  ],
  kaide: [
    "المُثَنَّى: اسْمٌ يَدُلُّ عَلَى اثْنَيْنِ أَوِ اثْنَتَيْنِ بِزِيَادَةِ «ـانِ» أَوْ «ـيْنِ» عَلَى المُفْرَدِ، مِثْلُ: اسْتَقْبَلَ الطَّالِبَانِ المُعَلِّمَ، وَدَّعَ الوَالِدُ الطَّالِبَيْنِ.",
    "• يُرْفَعُ المُثَنَّى بِالأَلِفِ، مِثْلُ: اسْتَقْبَلَ الطَّالِبَانِ المُعَلِّمَ.",
    "• وَيُنْصَبُ بِاليَاءِ السَّاكِنَةِ، مِثْلُ: وَدَّعَ الوَالِدُ الطَّالِبَيْنِ.",
    "• وَيُجَرُّ بِاليَاءِ السَّاكِنَةِ، مِثْلُ: لَعِبَ سَلِيمٌ مَعَ الطَّالِبَيْنِ.",
    "• وَتَكُونُ النُّونُ فِي آخِرِهِ دَائِمًا مَكْسُورَةً."
  ],
  ex: [
    { type: "pick", fill: true, num: "١", ar: "امْلَأِ الفَرَاغَ بِالاسْمِ المُثَنَّى المُنَاسِبِ", tr: "Boşluğa uygun müsennâyı yerleştir. Önce kelimenin cümledeki görevini düşün.", items: [
      { q: "قَرَأْتُ ___ فِي الأُسْبُوعِ المَاضِي.", o: ["الكِتَابَانِ", "الكِتَابَيْنِ"], a: 1, tr: "Geçen hafta iki kitabı okudum.", why: "Mef'ûl bih → mansûb → yâ (ـَيْنِ)." },
      { q: "حَضَرَ ___ إِلَى الدَّرْسِ الأَوَّلِ.", o: ["الأُسْتَاذَانِ", "الأُسْتَاذَيْنِ"], a: 0, tr: "İki hoca ilk derse geldi.", why: "Fâil → merfû → elif (ـانِ). Fiil tekil kalır: حَضَرَ." },
      { q: "شَرِبَتْ شَوَّالُ ___ مَعَ وَالِدِهَا.", o: ["كَأْسَانِ", "كَأْسَيْنِ"], a: 1, tr: "Şevval babasıyla birlikte iki bardak içti.", why: "Mef'ûl bih → mansûb → yâ (ـَيْنِ)." },
      { q: "___ مُفِيدَانِ جِدًّا.", o: ["الكِتَابَانِ", "الكِتَابَيْنِ"], a: 0, tr: "İki kitap çok faydalıdır.", why: "Mübtedâ → merfû → elif. Haber de müsennâ ve merfû: مُفِيدَانِ." },
      { q: "فَحَصَتْ ___ مَرِيضَيْنِ.", o: ["الطَّبِيبَتَانِ", "الطَّبِيبَتَيْنِ"], a: 0, tr: "İki kadın doktor iki hastayı muayene etti.", why: "Fâil → merfû → elif. (مَرِيضَيْنِ ise mef'ûl olduğu için yâ almış.)" },
      { q: "الطَّالِبَتَانِ ___ فِي الجَامِعَةِ.", o: ["نَاجِحَتَانِ", "نَاجِحَتَيْنِ"], a: 0, tr: "İki kız öğrenci üniversitede başarılıdır.", why: "Haber → merfû → elif (ـانِ)." },
      { q: "شَاهَدَتِ الطَّالِبَتَانِ ___.", o: ["فِلْمَانِ", "فِلْمَيْنِ"], a: 1, tr: "İki kız öğrenci iki film izledi.", why: "Mef'ûl bih → mansûb → yâ (ـَيْنِ)." },
      { q: "حَامِدٌ وَحُسَامٌ ___ مَاهِرَانِ.", o: ["مُهَنْدِسَانِ", "مُهَنْدِسَيْنِ"], a: 0, tr: "Hâmid ve Hüsâm iki usta mühendistir.", why: "Haber → merfû → elif. Sıfatı مَاهِرَانِ da merfû." }
    ]},
    { type: "combo", num: "٢", ar: "حَوِّلِ الفَاعِلَ إِلَى المُثَنَّى", tr: "Fâili müsennâya çevir. Kutulara dokunarak doğru şekli seç.",
      exHtml: "<span class=\"ar\">وَصَلَ المُسَافِرُ إِلَى بَلَدِهِ ← وَصَلَ المُسَافِرَانِ إِلَى بَلَدِهِمَا</span><br>Fiil başta olduğu için tekil kalır; zamir değişir: <span class=\"ar\">ـهُ ← ـهُمَا</span>.", items: [
      CB("حَكَمَ الحَاكِمُ بِالعَدْلِ.", ["حَكَمَ", ["الحَاكِمُ", "الحَاكِمَانِ", "الحَاكِمَيْنِ"], "بِالعَدْلِ."], [1], "İki hâkim adaletle hükmetti.", "Fâil → merfû → ـانِ. Fiil tekil kalır."),
      CB("شَرِبَتِ الطِّفْلَةُ عَصِيرَهَا.", ["شَرِبَتِ", ["الطِّفْلَةُ", "الطِّفْلَتَانِ", "الطِّفْلَتَيْنِ"], ["عَصِيرَهَا", "عَصِيرَهُمَا"]], [1, 1], "İki kız çocuk meyve sularını içti.", "ة açılıp ت olur: الطِّفْلَتَانِ. Zamir de ikil olur: ـهُمَا."),
      CB("خَرَجَ المُدِيرُ مِنَ المَدْرَسَةِ.", ["خَرَجَ", ["المُدِيرُ", "المُدِيرَانِ", "المُدِيرَيْنِ"], "مِنَ المَدْرَسَةِ."], [1], "İki müdür okuldan çıktı.", "Fâil → merfû → elif."),
      CB("كَتَبَتِ المُعَلِّمَةُ عَلَى السَّبُّورَةِ.", ["كَتَبَتِ", ["المُعَلِّمَةُ", "المُعَلِّمَتَانِ", "المُعَلِّمَتَيْنِ"], "عَلَى السَّبُّورَةِ."], [1], "İki kadın öğretmen tahtaya yazdı.", "Fâil → merfû → elif; ة açıldı: ـتَانِ."),
      CB("فَكَّرَ العَالِمُ فِي المَسْأَلَةِ.", ["فَكَّرَ", ["العَالِمُ", "العَالِمَانِ", "العَالِمَيْنِ"], "فِي المَسْأَلَةِ."], [1], "İki âlim mesele üzerinde düşündü.", "Fâil → merfû → elif."),
      CB("عَمِلَتِ الزَّوْجَةُ طَعَامًا لَذِيذًا.", ["عَمِلَتِ", ["الزَّوْجَةُ", "الزَّوْجَتَانِ", "الزَّوْجَتَيْنِ"], "طَعَامًا لَذِيذًا."], [1], "İki hanım lezzetli bir yemek yaptı.", "Fâil → merfû → elif."),
      CB("فَحَصَ الطَّبِيبُ المَاهِرُ المَرِيضَ.", ["فَحَصَ", ["الطَّبِيبُ", "الطَّبِيبَانِ", "الطَّبِيبَيْنِ"], ["المَاهِرُ", "المَاهِرَانِ", "المَاهِرَيْنِ"], "المَرِيضَ."], [1, 1], "İki usta doktor hastayı muayene etti.", "Sıfat da mevsûfuna uyar: الطَّبِيبَانِ المَاهِرَانِ."),
      CB("دَخَلَتِ التِّلْمِيذَةُ الصَّغِيرَةُ الدَّرْسَ.", ["دَخَلَتِ", ["التِّلْمِيذَةُ", "التِّلْمِيذَتَانِ", "التِّلْمِيذَتَيْنِ"], ["الصَّغِيرَةُ", "الصَّغِيرَتَانِ", "الصَّغِيرَتَيْنِ"], "الدَّرْسَ."], [1, 1], "İki küçük kız öğrenci derse girdi.", "Fâil ve sıfatı merfû → ـتَانِ.")
    ]},
    { type: "combo", num: "٣", ar: "حَوِّلِ المَفْعُولَ بِهِ إِلَى المُثَنَّى", tr: "Mef'ûlü müsennâya çevir.",
      exHtml: "<span class=\"ar\">شَرِبَ الوَلَدُ كُوبًا مِنَ الحَلِيبِ ← شَرِبَ الوَلَدُ كُوبَيْنِ مِنَ الحَلِيبِ</span><br>Müsennâ tenvin almaz: <span class=\"ar\">كُوبًا ← كُوبَيْنِ</span>.", items: [
      CB("فَحَصَ الطَّبِيبُ مَرِيضًا.", ["فَحَصَ الطَّبِيبُ", ["مَرِيضًا", "مَرِيضَانِ", "مَرِيضَيْنِ"]], [2], "Doktor iki hastayı muayene etti.", "Mef'ûl → mansûb → yâ: ـَيْنِ. Tenvin gider."),
      CB("شَرِبَتِ الطِّفْلَةُ العَصِيرَ.", ["شَرِبَتِ الطِّفْلَةُ", ["العَصِيرَ", "العَصِيرَانِ", "العَصِيرَيْنِ"]], [2], "Kız çocuk iki meyve suyunu içti.", "Mef'ûl → mansûb → yâ."),
      CB("أَخْرَجَ المُدِيرُ وَرَقَةً.", ["أَخْرَجَ المُدِيرُ", ["وَرَقَةً", "وَرَقَتَانِ", "وَرَقَتَيْنِ"]], [2], "Müdür iki kâğıt çıkardı.", "Mef'ûl → mansûb → yâ; ة açıldı: ـتَيْنِ."),
      CB("كَتَبَتِ المُدِيرَةُ اسْمًا.", ["كَتَبَتِ المُدِيرَةُ", ["اسْمًا", "اسْمَانِ", "اسْمَيْنِ"]], [2], "Kadın müdür iki isim yazdı.", "Mef'ûl → mansûb → yâ."),
      CB("أَصْلَحَ المُهَنْدِسُ السَّيَّارَةَ.", ["أَصْلَحَ المُهَنْدِسُ", ["السَّيَّارَةَ", "السَّيَّارَتَانِ", "السَّيَّارَتَيْنِ"]], [2], "Mühendis iki arabayı tamir etti.", "Mef'ûl → mansûb → yâ."),
      CB("عَمِلَتِ الزَّوْجَةُ طَعَامًا لَذِيذًا.", ["عَمِلَتِ الزَّوْجَةُ", ["طَعَامًا", "طَعَامَانِ", "طَعَامَيْنِ"], ["لَذِيذًا", "لَذِيذَانِ", "لَذِيذَيْنِ"]], [2, 2], "Hanım iki lezzetli yemek yaptı.", "Mef'ûl ve sıfatı mansûb → ـَيْنِ."),
      CB("كَتَبَ الطَّبِيبُ دَوَاءً.", ["كَتَبَ الطَّبِيبُ", ["دَوَاءً", "دَوَاءَانِ", "دَوَاءَيْنِ"]], [2], "Doktor iki ilaç yazdı.", "Mef'ûl → mansûb → yâ."),
      CB("دَخَلَتِ التِّلْمِيذَةُ الصَّغِيرَةُ الدَّرْسَ.", ["دَخَلَتِ التِّلْمِيذَةُ الصَّغِيرَةُ", ["الدَّرْسَ", "الدَّرْسَانِ", "الدَّرْسَيْنِ"]], [2], "Küçük kız öğrenci iki derse girdi.", "Mef'ûl → mansûb → yâ.")
    ]},
    { type: "combo", num: "٤", ar: "حَوِّلْ مَا تَحْتَهُ خَطٌّ إِلَى المُثَنَّى", tr: "Altı çizili kelimeyi müsennâya çevir. Fâil mi, mef'ûl mü? Eki ona göre seç.",
      exHtml: "<span class=\"ar\">تَنَاوَلَ الوَلَدُ الفَطُورَ ← تَنَاوَلَ الوَلَدَانِ الفَطُورَ</span><br><span class=\"ar\">قَرَأَتِ الطَّالِبَةُ الحِكَايَةَ ← قَرَأَتِ الطَّالِبَةُ الحِكَايَتَيْنِ</span>", items: [
      CB("فَحَصَ <span class=\"ul\">الطَّبِيبُ</span> مَرِيضًا.", ["فَحَصَ", ["الطَّبِيبُ", "الطَّبِيبَانِ", "الطَّبِيبَيْنِ"], "مَرِيضًا."], [1], "İki doktor bir hastayı muayene etti.", "Fâil → merfû → elif."),
      CB("شَرِبَتِ الطِّفْلَةُ <span class=\"ul\">شَايًا</span>.", ["شَرِبَتِ الطِّفْلَةُ", ["شَايًا", "شَايَانِ", "شَايَيْنِ"]], [2], "Kız çocuk iki çay içti.", "Mef'ûl → mansûb → yâ."),
      CB("أَخْرَجَ <span class=\"ul\">المُدِيرُ</span> وَرَقَةً.", ["أَخْرَجَ", ["المُدِيرُ", "المُدِيرَانِ", "المُدِيرَيْنِ"], "وَرَقَةً."], [1], "İki müdür bir kâğıt çıkardı.", "Fâil → merfû → elif."),
      CB("كَتَبَتِ <span class=\"ul\">المُدِيرَةُ</span> اسْمًا.", ["كَتَبَتِ", ["المُدِيرَةُ", "المُدِيرَتَانِ", "المُدِيرَتَيْنِ"], "اسْمًا."], [1], "İki kadın müdür bir isim yazdı.", "Fâil → merfû → elif."),
      CB("أَصْلَحَ <span class=\"ul\">المُهَنْدِسُ</span> السَّيَّارَةَ.", ["أَصْلَحَ", ["المُهَنْدِسُ", "المُهَنْدِسَانِ", "المُهَنْدِسَيْنِ"], "السَّيَّارَةَ."], [1], "İki mühendis arabayı tamir etti.", "Fâil → merfû → elif."),
      CB("عَمِلَتِ الزَّوْجَةُ <span class=\"ul\">طَعَامًا لَذِيذًا</span>.", ["عَمِلَتِ الزَّوْجَةُ", ["طَعَامًا", "طَعَامَانِ", "طَعَامَيْنِ"], ["لَذِيذًا", "لَذِيذَانِ", "لَذِيذَيْنِ"]], [2, 2], "Hanım iki lezzetli yemek yaptı.", "Mef'ûl ve sıfatı mansûb → yâ."),
      CB("كَتَبَ <span class=\"ul\">الطَّبِيبُ</span> دَوَاءً.", ["كَتَبَ", ["الطَّبِيبُ", "الطَّبِيبَانِ", "الطَّبِيبَيْنِ"], "دَوَاءً."], [1], "İki doktor bir ilaç yazdı.", "Fâil → merfû → elif."),
      CB("دَخَلَتِ <span class=\"ul\">التِّلْمِيذَةُ الصَّغِيرَةُ</span> الدَّرْسَ.", ["دَخَلَتِ", ["التِّلْمِيذَةُ", "التِّلْمِيذَتَانِ", "التِّلْمِيذَتَيْنِ"], ["الصَّغِيرَةُ", "الصَّغِيرَتَانِ", "الصَّغِيرَتَيْنِ"], "الدَّرْسَ."], [1, 1], "İki küçük kız öğrenci derse girdi.", "Fâil ve sıfatı merfû → ـتَانِ.")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · CEM-İ MÜZEKKER SÂLİM
{
  id: "u2", no: 2, ar: "إِعْرَابُ جَمْعِ المُذَكَّرِ السَّالِمِ", tr: "Cem-i Müzekker Sâlimin İ'rabı", short: "Cem-i müz. sâlim", col: "mzs", part: 1,
  goals: ["Cem-i müzekker sâlimi ـُونَ / ـِينَ ekleriyle kurmak", "Merfû iken vav, mansûb ve mecrûr iken yâ aldığını görmek", "ـَيْنِ (müsennâ) ile ـِينَ (cem) farkını oturtmak", "Okuma parçasında müsennâ ve cemi bulup i'rabını yapmak"],
  examples: [
    { s: "اسْتَقْبَلَ:- / المُهَنْدِسُونَ:ref.Fâil / المُعَلِّمَ:-", tr: "Mühendisler öğretmeni karşıladı.", why: "Fâil → merfû → alameti vav: ـُونَ" },
    { s: "وَدَّعَ:- / الوَالِدُ:- / المُهَنْدِسِينَ:nasb.Mef'ûl", tr: "Baba mühendisleri uğurladı.", why: "Mef'ûl bih → mansûb → alameti yâ: ـِينَ" },
    { s: "اجْتَمَعَ:- / سَلِيمٌ:- / بِالمُهَنْدِسِينَ:cerr.Harf-i cer", tr: "Selîm mühendislerle bir araya geldi.", why: "بِـ harf-i cerrinden sonra → mecrûr → alameti yâ: ـِينَ" }
  ],
  rules: [
    { tr: "<b class=\"r-mzs\">Cem-i müzekker sâlim</b>, üç ve daha fazla erkeği gösterir. Tekil bozulmaz; sonuna <span class=\"ar\">ـُونَ</span> ya da <span class=\"ar\">ـِينَ</span> eklenir.", ex: ["مُهَنْدِسٌ ← مُهَنْدِسُونَ / مُهَنْدِسِينَ"] },
    { tr: "<b class=\"r-ref\">Merfû</b> iken alameti <b>vav</b>dır; vavdan önceki harf ötrelidir.", ex: ["اسْتَقْبَلَ المُهَنْدِسُونَ المُعَلِّمَ"] },
    { tr: "<b class=\"r-nasb\">Mansûb</b> ve <b class=\"r-cerr\">mecrûr</b> iken alameti <b>yâ</b>dır; yâdan önceki harf kesrelidir.", ex: ["وَدَّعَ الوَالِدُ المُهَنْدِسِينَ", "اجْتَمَعَ سَلِيمٌ بِالمُهَنْدِسِينَ"] },
    { tr: "Sondaki nun <b>daima fethalıdır</b> (<span class=\"ar\">ـنَ</span>). Müsennâda ise kesreliydi (<span class=\"ar\">ـنِ</span>)." },
    { tr: "Dikkat: <span class=\"ar\">ـَيْنِ</span> (fetha + sakin yâ) <b class=\"r-mus\">müsennâ</b>, <span class=\"ar\">ـِينَ</span> (kesre + yâ) <b class=\"r-mzs\">cem</b>dir.", ex: ["المُسْلِمَيْنِ ← اثْنَانِ", "المُسْلِمِينَ ← جَمْعٌ"] },
    { tr: "İpucu: Fiil başta ise tekil kalır. Sıfat ve haber de cem olur; zamir <span class=\"ar\">ـهُمْ</span> olur.", ex: ["حَضَرَ المُعَلِّمُونَ", "المُوَظَّفُونَ النَّشِيطُونَ مَحْبُوبُونَ", "شَكَرَ العَامِلُونَ مُدِيرَهُمْ"] },
    { tr: "İpucu: Muzâf olunca nunu düşer.", ex: ["مُعَلِّمُونَ + المَدْرَسَةِ ← مُعَلِّمُو المَدْرَسَةِ"] }
  ],
  kaide: [
    "جَمْعُ المُذَكَّرِ السَّالِمُ: اسْمٌ يَدُلُّ عَلَى ثَلَاثَةِ أَشْخَاصٍ فَأَكْثَرَ مِنَ الذُّكُورِ، بِزِيَادَةِ «ـونَ» مَا قَبْلَهُ مَضْمُومٌ، أَوْ «ـِينَ» مَا قَبْلَهُ مَكْسُورٌ عَلَى المُفْرَدِ، مِثْلُ: اسْتَقْبَلَ المُهَنْدِسُونَ المُعَلِّمَ، وَدَّعَ الوَالِدُ المُهَنْدِسِينَ.",
    "• يُرْفَعُ جَمْعُ المُذَكَّرِ السَّالِمُ بِالوَاوِ، مِثْلُ: اسْتَقْبَلَ المُهَنْدِسُونَ المُعَلِّمَ.",
    "• وَيُنْصَبُ بِاليَاءِ، مِثْلُ: وَدَّعَ الوَالِدُ المُهَنْدِسِينَ.",
    "• وَيُجَرُّ بِاليَاءِ، مِثْلُ: اجْتَمَعَ سَلِيمٌ بِالمُهَنْدِسِينَ.",
    "• وَتَكُونُ النُّونُ فِي آخِرِهِ دَائِمًا مَفْتُوحَةً."
  ],
  ex: [
    { type: "pick", fill: true, num: "٥", ar: "امْلَأِ الفَرَاغَ بِجَمْعِ المُذَكَّرِ السَّالِمِ المُنَاسِبِ", tr: "Boşluğa uygun cem-i müzekker sâlimi yerleştir.", items: [
      { q: "قَابَلْنَا ___ فِي الشَّرِكَةِ.", o: ["المُهَنْدِسُونَ", "المُهَنْدِسِينَ"], a: 1, tr: "Şirkette mühendislerle görüştük.", why: "Mef'ûl bih → mansûb → yâ (ـِينَ)." },
      { q: "حَضَرَ ___ إِلَى الاجْتِمَاعِ.", o: ["المُعَلِّمُونَ", "المُعَلِّمِينَ"], a: 0, tr: "Öğretmenler toplantıya geldi.", why: "Fâil → merfû → vav (ـُونَ)." },
      { q: "شَكَرَتْ سَاجِدَةُ ___.", o: ["العَامِلُونَ", "العَامِلِينَ"], a: 1, tr: "Sâcide işçilere teşekkür etti.", why: "Mef'ûl bih → mansûb → yâ." },
      { q: "سَمِعَ ___ الأَذَانَ.", o: ["المُسْلِمُونَ", "المُسْلِمِينَ"], a: 0, tr: "Müslümanlar ezanı duydu.", why: "Fâil → merfû → vav." },
      { q: "فَحَصَتِ الطَّبِيبَةُ ___ إِلَى الحَجِّ.", o: ["المُسَافِرُونَ", "المُسَافِرِينَ"], a: 1, tr: "Kadın doktor hacca gidecek yolcuları muayene etti.", why: "Mef'ûl bih → mansûb → yâ. (Fâil الطَّبِيبَةُ'dir.)" },
      { q: "المُخْلِصُونَ ___.", o: ["كَثِيرُونَ", "كَثِيرِينَ"], a: 0, tr: "İhlaslı olanlar çoktur.", why: "Haber → merfû → vav." },
      { q: "أَفْلَحَ ___.", o: ["المُؤْمِنُونَ", "المُؤْمِنِينَ"], a: 0, tr: "Müminler kurtuluşa erdi.", why: "Fâil → merfû → vav. (Mü'minûn sûresinin ilk âyeti: قَدْ أَفْلَحَ المُؤْمِنُونَ)" },
      { q: "المُسْلِمُونَ ___.", o: ["نَظِيفُونَ", "نَظِيفِينَ"], a: 0, tr: "Müslümanlar temizdir.", why: "Haber → merfû → vav." }
    ]},
    { type: "combo", num: "٦", ar: "حَوِّلِ الفَاعِلَ إِلَى جَمْعِ المُذَكَّرِ السَّالِمِ", tr: "Fâili cem-i müzekker sâlime çevir.",
      exHtml: "<span class=\"ar\">وَصَلَ المُسَافِرُ إِلَى البَلَدِ ← وَصَلَ المُسَافِرُونَ إِلَى البَلَدِ</span>", items: [
      CB("شَكَرَ العَامِلُ مُدِيرَهُ.", ["شَكَرَ", ["العَامِلُ", "العَامِلُونَ", "العَامِلِينَ"], ["مُدِيرَهُ", "مُدِيرَهُمْ"]], [1, 1], "İşçiler müdürlerine teşekkür etti.", "Fâil → merfû → ـُونَ. Zamir de çoğul: ـهُمْ."),
      CB("فَرِحَ المُؤْمِنُ بِالصِّيَامِ.", ["فَرِحَ", ["المُؤْمِنُ", "المُؤْمِنُونَ", "المُؤْمِنِينَ"], "بِالصِّيَامِ."], [1], "Müminler oruçla sevindi.", "Fâil → merfû → vav."),
      CB("خَرَجَ المَسْؤُولُ مِنَ الشَّرِكَةِ.", ["خَرَجَ", ["المَسْؤُولُ", "المَسْؤُولُونَ", "المَسْؤُولِينَ"], "مِنَ الشَّرِكَةِ."], [1], "Yetkililer şirketten çıktı.", "Fâil → merfû → vav."),
      CB("أَحَبَّ المُشَاهِدُ المُسَلْسَلَ التُّرْكِيَّ.", ["أَحَبَّ", ["المُشَاهِدُ", "المُشَاهِدُونَ", "المُشَاهِدِينَ"], "المُسَلْسَلَ التُّرْكِيَّ."], [1], "İzleyiciler Türk dizisini sevdi.", "Fâil → merfû → vav."),
      CB("فَكَّرَ العَالِمُ فِي المَسْأَلَةِ.", ["فَكَّرَ", ["العَالِمُ", "العَالِمُونَ", "العَالِمِينَ"], "فِي المَسْأَلَةِ."], [1], "Âlimler mesele üzerinde düşündü.", "Fâil → merfû → vav. (Teksîri العُلَمَاءُ da çok kullanılır.)"),
      CB("عَمِلَ الطَّبَّاخُ طَعَامًا لَذِيذًا.", ["عَمِلَ", ["الطَّبَّاخُ", "الطَّبَّاخُونَ", "الطَّبَّاخِينَ"], "طَعَامًا لَذِيذًا."], [1], "Aşçılar lezzetli bir yemek yaptı.", "Fâil → merfû → vav."),
      CB("سَبَحَ السَّبَّاحُ المَاهِرُ فِي البَحْرِ.", ["سَبَحَ", ["السَّبَّاحُ", "السَّبَّاحُونَ", "السَّبَّاحِينَ"], ["المَاهِرُ", "المَاهِرُونَ", "المَاهِرِينَ"], "فِي البَحْرِ."], [1, 1], "Usta yüzücüler denizde yüzdü.", "Fâil ve sıfatı merfû → ـُونَ."),
      CB("نَشَرَ المُحَرِّرُ الصَّحِيفَةَ.", ["نَشَرَ", ["المُحَرِّرُ", "المُحَرِّرُونَ", "المُحَرِّرِينَ"], "الصَّحِيفَةَ."], [1], "Editörler gazeteyi yayımladı.", "Fâil → merfû → vav.")
    ]},
    { type: "combo", num: "٧", ar: "حَوِّلِ المَفْعُولَ بِهِ إِلَى جَمْعِ المُذَكَّرِ السَّالِمِ", tr: "Mef'ûlü cem-i müzekker sâlime çevir.",
      exHtml: "<span class=\"ar\">وَدَّعْنَا المُسَافِرَ ← وَدَّعْنَا المُسَافِرِينَ</span>", items: [
      CB("عَذَّبَ المُشْرِكُونَ المُؤْمِنَ.", ["عَذَّبَ المُشْرِكُونَ", ["المُؤْمِنَ", "المُؤْمِنُونَ", "المُؤْمِنِينَ"]], [2], "Müşrikler müminlere işkence etti.", "Mef'ûl → mansûb → yâ. (المُشْرِكُونَ fâildir: vav.)"),
      CB("تَرَكَ السَّائِقُ المُسَافِرَ فِي الحَافِلَةِ.", ["تَرَكَ السَّائِقُ", ["المُسَافِرَ", "المُسَافِرُونَ", "المُسَافِرِينَ"], "فِي الحَافِلَةِ."], [2], "Şoför yolcuları otobüste bıraktı.", "Mef'ûl → mansûb → yâ."),
      CB("أَخْرَجَ الحَاكِمُ المَسْجُونَ مِنَ السِّجْنِ.", ["أَخْرَجَ الحَاكِمُ", ["المَسْجُونَ", "المَسْجُونُونَ", "المَسْجُونِينَ"], "مِنَ السِّجْنِ."], [2], "Yönetici mahkûmları hapisten çıkardı.", "Mef'ûl → mansûb → yâ."),
      CB("شَاهَدَتِ المُدِيرَةُ المُوَظَّفَ فِي الحَدِيقَةِ.", ["شَاهَدَتِ المُدِيرَةُ", ["المُوَظَّفَ", "المُوَظَّفُونَ", "المُوَظَّفِينَ"], "فِي الحَدِيقَةِ."], [2], "Kadın müdür memurları bahçede gördü.", "Mef'ûl → mansûb → yâ."),
      CB("فَحَصَ الطَّبِيبُ المُهَنْدِسَ.", ["فَحَصَ الطَّبِيبُ", ["المُهَنْدِسَ", "المُهَنْدِسُونَ", "المُهَنْدِسِينَ"]], [2], "Doktor mühendisleri muayene etti.", "Mef'ûl → mansûb → yâ."),
      CB("كَافَأَ المُحَاسِبُ العَامِلَ النَّشِيطَ.", ["كَافَأَ المُحَاسِبُ", ["العَامِلَ", "العَامِلُونَ", "العَامِلِينَ"], ["النَّشِيطَ", "النَّشِيطُونَ", "النَّشِيطِينَ"]], [2, 2], "Muhasebeci çalışkan işçileri ödüllendirdi.", "Mef'ûl ve sıfatı mansûb → ـِينَ."),
      CB("أَكْرَمَ أَحْمَدُ الجَائِعَ.", ["أَكْرَمَ أَحْمَدُ", ["الجَائِعَ", "الجَائِعُونَ", "الجَائِعِينَ"]], [2], "Ahmed açlara ikram etti.", "Mef'ûl → mansûb → yâ."),
      CB("يُحِبُّ رَئِيسُ الجُمْهُورِيَّةِ المُوَاطِنَ.", ["يُحِبُّ رَئِيسُ الجُمْهُورِيَّةِ", ["المُوَاطِنَ", "المُوَاطِنُونَ", "المُوَاطِنِينَ"]], [2], "Cumhurbaşkanı vatandaşları sever.", "Mef'ûl → mansûb → yâ.")
    ]},
    { type: "combo", num: "٨", ar: "حَوِّلْ مَا تَحْتَهُ خَطٌّ إِلَى جَمْعِ المُذَكَّرِ السَّالِمِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Altı çizili kelimeyi cem-i müzekker sâlime çevir; gerekiyorsa sıfatı ve haberi de değiştir.",
      exHtml: "<span class=\"ar\">تَنَاوَلَ الجَائِعُ الفَطُورَ ← تَنَاوَلَ الجَائِعُونَ الفَطُورَ</span><br><span class=\"ar\">أَكْرَمَتْ عَائِشَةُ الجَائِعَ ← أَكْرَمَتْ عَائِشَةُ الجَائِعِينَ</span><br><span class=\"ar\">قَدَّمْتُ الطَّعَامَ لِلْجَائِعِ ← قَدَّمْتُ الطَّعَامَ لِلْجَائِعِينَ</span><br><span class=\"ar\">المُوَظَّفُ النَّشِيطُ مَحْبُوبٌ ← المُوَظَّفُونَ النَّشِيطُونَ مَحْبُوبُونَ</span>", items: [
      CB("فَحَصَ الطَّبِيبُ <span class=\"ul\">اللَّاجِئَ</span>.", ["فَحَصَ الطَّبِيبُ", ["اللَّاجِئَ", "اللَّاجِئُونَ", "اللَّاجِئِينَ"]], [2], "Doktor mültecileri muayene etti.", "Mef'ûl → mansûb → yâ."),
      CB("<span class=\"ul\">المُهَنْدِسُ المَاهِرُ</span> مَشْكُورٌ.", [["المُهَنْدِسُ", "المُهَنْدِسُونَ", "المُهَنْدِسِينَ"], ["المَاهِرُ", "المَاهِرُونَ", "المَاهِرِينَ"], ["مَشْكُورٌ", "مَشْكُورُونَ", "مَشْكُورِينَ"]], [1, 1, 1], "Usta mühendisler takdiri hak eder.", "Mübtedâ, sıfatı ve haber merfû → ـُونَ. Haber de mübtedâya uyar."),
      CB("<span class=\"ul\">المَسْؤُولُ</span> عَادِلٌ.", [["المَسْؤُولُ", "المَسْؤُولُونَ", "المَسْؤُولِينَ"], ["عَادِلٌ", "عَادِلُونَ", "عَادِلِينَ"]], [1, 1], "Yetkililer adildir.", "Mübtedâ ve haber merfû → vav."),
      CB("سَلَّمْتُ عَلَى <span class=\"ul\">القَادِمِ</span> مِنَ العُمْرَةِ.", ["سَلَّمْتُ عَلَى", ["القَادِمِ", "القَادِمُونَ", "القَادِمِينَ"], "مِنَ العُمْرَةِ."], [2], "Umreden gelenlere selam verdim.", "Harf-i cerden (عَلَى) sonra → mecrûr → yâ."),
      CB("أَخْبَرْتُ <span class=\"ul\">المُهَنْدِسَ التُّرْكِيَّ</span> بِالمَسْأَلَةِ.", ["أَخْبَرْتُ", ["المُهَنْدِسَ", "المُهَنْدِسُونَ", "المُهَنْدِسِينَ"], ["التُّرْكِيَّ", "التُّرْكِيُّونَ", "التُّرْكِيِّينَ"], "بِالمَسْأَلَةِ."], [2, 2], "Türk mühendislere meseleyi haber verdim.", "Mef'ûl ve sıfatı mansûb → yâ."),
      CB("حَضَرَ الوَلَدُ مَعَ <span class=\"ul\">العَامِلِ</span>.", ["حَضَرَ الوَلَدُ مَعَ", ["العَامِلِ", "العَامِلُونَ", "العَامِلِينَ"]], [2], "Çocuk işçilerle birlikte geldi.", "مَعَ'den sonra (muzâfun ileyh) → mecrûr → yâ."),
      CB("رَسَمَ <span class=\"ul\">المُهَنْدِسُ</span> البِنَاءَ.", ["رَسَمَ", ["المُهَنْدِسُ", "المُهَنْدِسُونَ", "المُهَنْدِسِينَ"], "البِنَاءَ."], [1], "Mühendisler binayı çizdi.", "Fâil → merfû → vav; fiil tekil kalır."),
      CB("يَدْخُلُ <span class=\"ul\">المُؤْمِنُ</span> الجَنَّةَ.", ["يَدْخُلُ", ["المُؤْمِنُ", "المُؤْمِنُونَ", "المُؤْمِنِينَ"], "الجَنَّةَ."], [1], "Müminler cennete girer.", "Fâil → merfû → vav.")
    ]},
    { type: "classify", num: "+", extra: true, opts: [["mus", "Müsennâ", "مُثَنًّى", "mus"], ["mzs", "Cem-i müz. sâlim", "جَمْعُ مُذَكَّرٍ سَالِمٌ", "mzs"]], ar: "ـَيْنِ أَمْ ـِينَ؟", tr: "Ek alıştırma: harekeye bak. İki mi, çok mu?", items: [
      { s: "المُسْلِمَيْنِ", a: "mus", why: "Yâdan önce fetha, nun kesreli: iki.", tr: "iki Müslüman (mansûb / mecrûr)" },
      { s: "المُسْلِمِينَ", a: "mzs", why: "Yâdan önce kesre, nun fethalı: çok.", tr: "Müslümanlar (mansûb / mecrûr)" },
      { s: "مُعَلِّمِينَ", a: "mzs", why: "ـِينَ: kesre + yâ + fethalı nun.", tr: "öğretmenler" },
      { s: "الفَلَّاحَيْنِ", a: "mus", why: "ـَيْنِ: fetha + sakin yâ + kesreli nun.", tr: "iki çiftçi" },
      { s: "مُهَنْدِسَيْنِ", a: "mus", why: "ـَيْنِ: iki.", tr: "iki mühendis" },
      { s: "الفَلَّاحِينَ", a: "mzs", why: "ـِينَ: çok.", tr: "çiftçiler" },
      { s: "المُعَلِّمَيْنِ", a: "mus", why: "ـَيْنِ: iki.", tr: "iki öğretmen" },
      { s: "مُهَنْدِسِينَ", a: "mzs", why: "ـِينَ: çok.", tr: "mühendisler" }
    ]},
    { type: "find", target: "y", reading: true, num: "٩ (أ)", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ وَعَيِّنِ المُثَنَّى وَجَمْعَ المُذَكَّرِ السَّالِمِ", tr: "Parçayı oku. Her cümledeki müsennâ ve cem-i müzekker sâlim isimlere dokun, sonra Kontrol et. Zamirlere (هُمَا) ve fiillere (طَلَبَا) dikkat: onlar isim değil.",
      title: "طَالِبَتَانِ جَدِيدَتَانِ",
      text: "حَضَرَتْ إِلَى صَفِّنَا طَالِبَتَانِ جَدِيدَتَانِ مِنْ أَلْمَانْيَا. اسْمُهُمَا يَاسَمِينُ وَمَرْوَةُ. هُمَا مُسْلِمَتَانِ مِنْ أَصْلٍ تُرْكِيٍّ. خَرَجَتْ عَائِلَتُهُمَا إِلَى أَلْمَانْيَا لِلْعَمَلِ قَبْلَ ثَلَاثِينَ سَنَةً. وَفِي الحَقِيقَةِ هَاجَرَ إِلَى أَلْمَانْيَا مُسْلِمُونَ كَثِيرُونَ مِنْ تُرْكِيَا وَمِنْ سُورِيَا وَالجَزَائِرِ وَتُونِسَ وَالمَغْرِبِ.<br>حَضَرَتِ الطَّالِبَتَانِ إِلَى إِسْطَنْبُولَ قَبْلَ أُسْبُوعٍ. اسْتَقْبَلَ مَسْؤُولٌ مِنَ الكُلِّيَّةِ الطَّالِبَتَيْنِ فِي مَطَارِ إِسْطَنْبُولَ وَأَخَذَهُمَا إِلَى سَكَنِ الطَّالِبَاتِ فِي مِنْطَقَةِ عُمْرَانِيَةَ.<br>بَدَأَتِ الطَّالِبَتَانِ يَاسَمِينُ وَمَرْوَةُ الدِّرَاسَةَ فِي بِدَايَةِ هَذَا الأُسْبُوعِ. شَكَرَتِ الطَّالِبَتَانِ الإِدَارَةَ وَالمُدَرِّسِينَ عَلَى حُسْنِ الضِّيَافَةِ وَعَلَى الاسْتِقْبَالِ الحَارِّ.<br>طَلَبَ مُعَلِّمَا الصَّفِّ، إِبْرَاهِيمُ وَعَبْدُ الحَمِيدِ، مِنْ يَاسَمِينَ أَنْ تَجْلِسَ مَعَ سَلْمَى، وَطَلَبَا مِنْ مَرْوَةَ أَنْ تَجْلِسَ مَعَ حَلِيمَةَ.",
      textTr: "İki Yeni Öğrenci. Sınıfımıza Almanya'dan iki yeni kız öğrenci geldi. İsimleri Yasemin ve Merve. İkisi de Türk asıllı Müslüman. Aileleri otuz yıl önce çalışmak için Almanya'ya gitmiş. Aslında Türkiye'den, Suriye'den, Cezayir'den, Tunus'tan ve Fas'tan Almanya'ya pek çok Müslüman göç etti. İki öğrenci bir hafta önce İstanbul'a geldi. Fakülteden bir yetkili onları İstanbul havalimanında karşıladı ve Ümraniye'deki kız öğrenci yurduna götürdü. Yasemin ile Merve bu haftanın başında derslere başladı. İkisi de güzel misafirperverlik ve sıcak karşılama için idareye ve öğretmenlere teşekkür etti. Sınıfın iki öğretmeni İbrahim ve Abdülhamid, Yasemin'den Selma ile, Merve'den de Halime ile oturmasını istedi.",
      items: [
      W("حَضَرَتْ إِلَى صَفِّنَا [طَالِبَتَانِ] [جَدِيدَتَانِ] مِنْ أَلْمَانْيَا.", "Sınıfımıza Almanya'dan iki yeni kız öğrenci geldi.", "طَالِبَتَانِ fâil, جَدِيدَتَانِ onun sıfatı: ikisi de merfû müsennâ."),
      W("اسْمُهُمَا يَاسَمِينُ وَمَرْوَةُ. هُمَا [مُسْلِمَتَانِ] مِنْ أَصْلٍ تُرْكِيٍّ.", "İsimleri Yasemin ve Merve. İkisi de Türk asıllı Müslüman.", "مُسْلِمَتَانِ haber (merfû). هُمَا ve ـهُمَا zamirdir, müsennâ isim değildir."),
      W("وَفِي الحَقِيقَةِ هَاجَرَ إِلَى أَلْمَانْيَا [مُسْلِمُونَ] [كَثِيرُونَ] مِنْ تُرْكِيَا.", "Aslında Türkiye'den Almanya'ya pek çok Müslüman göç etti.", "مُسْلِمُونَ fâil, كَثِيرُونَ sıfatı: merfû, vav ile."),
      W("حَضَرَتِ [الطَّالِبَتَانِ] إِلَى إِسْطَنْبُولَ قَبْلَ أُسْبُوعٍ.", "İki öğrenci bir hafta önce İstanbul'a geldi.", "Fâil → merfû → elif."),
      W("اسْتَقْبَلَ مَسْؤُولٌ مِنَ الكُلِّيَّةِ [الطَّالِبَتَيْنِ] فِي مَطَارِ إِسْطَنْبُولَ وَأَخَذَهُمَا إِلَى سَكَنِ الطَّالِبَاتِ.", "Fakülteden bir yetkili iki öğrenciyi İstanbul havalimanında karşıladı ve onları kız öğrenci yurduna götürdü.", "الطَّالِبَتَيْنِ mef'ûl → yâ. الطَّالِبَاتِ ise cem-i müennes sâlimdir (3. konu)."),
      W("بَدَأَتِ [الطَّالِبَتَانِ] يَاسَمِينُ وَمَرْوَةُ الدِّرَاسَةَ.", "Yasemin ile Merve derslere başladı.", "Fâil → merfû → elif."),
      W("شَكَرَتِ [الطَّالِبَتَانِ] الإِدَارَةَ [وَالمُدَرِّسِينَ] عَلَى حُسْنِ الضِّيَافَةِ.", "İki öğrenci güzel misafirperverlik için idareye ve öğretmenlere teşekkür etti.", "الطَّالِبَتَانِ fâil (elif); المُدَرِّسِينَ mef'ûle atfedilmiş, mansûb (yâ)."),
      W("طَلَبَ [مُعَلِّمَا] الصَّفِّ مِنْ يَاسَمِينَ أَنْ تَجْلِسَ مَعَ سَلْمَى، وَطَلَبَا مِنْ مَرْوَةَ أَنْ تَجْلِسَ مَعَ حَلِيمَةَ.", "Sınıfın iki öğretmeni Yasemin'den Selma ile, Merve'den de Halime ile oturmasını istedi.", "مُعَلِّمَا = مُعَلِّمَانِ; muzâf olduğu için nun düştü. طَلَبَا ise fiildir.")
    ]},
    { type: "irab", num: "٩ (ب)", topts: ["mus", "mzs"], ar: "أَعْرِبِ المُثَنَّى وَجَمْعَ المُذَكَّرِ السَّالِمِ", tr: "Parçadaki kelimelerin i'rabını yap: önce türünü, sonra halini seç.", items: [
      IR("حَضَرَتْ إِلَى صَفِّنَا [طَالِبَتَانِ] جَدِيدَتَانِ.", "mus", "ref", "Fâil → merfû; alameti elif.", "Sınıfımıza iki yeni kız öğrenci geldi."),
      IR("حَضَرَتْ إِلَى صَفِّنَا طَالِبَتَانِ [جَدِيدَتَانِ].", "mus", "ref", "Merfû bir ismin sıfatı → merfû; alameti elif.", "Sınıfımıza iki yeni kız öğrenci geldi."),
      IR("هُمَا [مُسْلِمَتَانِ] مِنْ أَصْلٍ تُرْكِيٍّ.", "mus", "ref", "Haber → merfû; alameti elif.", "İkisi de Türk asıllı Müslüman."),
      IR("خَرَجَتْ عَائِلَتُهُمَا إِلَى أَلْمَانْيَا قَبْلَ [ثَلَاثِينَ] سَنَةً.", "mzs", "cerr", "قَبْلَ'den sonra muzâfun ileyh → mecrûr; alameti yâ. Not: ثَلَاثُونَ / ثَلَاثِينَ bir sayıdır; gerçek cem değildir ama cem-i müzekker sâlim gibi i'rab edilir (mülhak).", "Aileleri otuz yıl önce Almanya'ya gitti."),
      IR("هَاجَرَ إِلَى أَلْمَانْيَا [مُسْلِمُونَ] كَثِيرُونَ.", "mzs", "ref", "Fâil → merfû; alameti vav.", "Almanya'ya pek çok Müslüman göç etti."),
      IR("هَاجَرَ إِلَى أَلْمَانْيَا مُسْلِمُونَ [كَثِيرُونَ].", "mzs", "ref", "Merfû bir ismin sıfatı → merfû; alameti vav.", "Almanya'ya pek çok Müslüman göç etti."),
      IR("حَضَرَتِ [الطَّالِبَتَانِ] إِلَى إِسْطَنْبُولَ.", "mus", "ref", "Fâil → merfû; alameti elif.", "İki öğrenci İstanbul'a geldi."),
      IR("اسْتَقْبَلَ مَسْؤُولٌ مِنَ الكُلِّيَّةِ [الطَّالِبَتَيْنِ].", "mus", "nasb", "Mef'ûl bih → mansûb; alameti yâ.", "Fakülteden bir yetkili iki öğrenciyi karşıladı."),
      IR("شَكَرَتِ الطَّالِبَتَانِ الإِدَارَةَ [وَالمُدَرِّسِينَ].", "mzs", "nasb", "Mansûb olan الإِدَارَةَ'ye atfedilmiş → mansûb; alameti yâ.", "İki öğrenci idareye ve öğretmenlere teşekkür etti."),
      IR("طَلَبَ [مُعَلِّمَا] الصَّفِّ مِنْ يَاسَمِينَ أَنْ تَجْلِسَ مَعَ سَلْمَى.", "mus", "ref", "Fâil → merfû; alameti elif. Muzâf olduğu için nun düştü: مُعَلِّمَانِ ← مُعَلِّمَا.", "Sınıfın iki öğretmeni Yasemin'den Selma ile oturmasını istedi.")
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · CEM-İ MÜENNES SÂLİM
{
  id: "u3", no: 3, ar: "إِعْرَابُ جَمْعِ المُؤَنَّثِ السَّالِمِ", tr: "Cem-i Müennes Sâlimin İ'rabı", short: "Cem-i müe. sâlim", col: "mns", part: 2,
  goals: ["Cem-i müennes sâlimi ـَاتٌ ekiyle kurmak", "Merfû iken damme, mansûb ve mecrûr iken kesre aldığını görmek", "En büyük tuzaktan kaçınmak: mansûbken fetha almaz (ـَاتَ değil, ـَاتِ)"],
  examples: [
    { s: "اسْتَقْبَلَتِ:- / المُعَلِّمَاتُ:ref.Fâil / الضُّيُوفَ:-", tr: "Kadın öğretmenler misafirleri karşıladı.", why: "Fâil → merfû → alameti damme: ـَاتُ" },
    { s: "وَدَّعَ:- / المُدِيرُ:- / المُعَلِّمَاتِ:nasb.Mef'ûl", tr: "Müdür kadın öğretmenleri uğurladı.", why: "Mef'ûl bih → mansûb → alameti KESRE: ـَاتِ (fetha değil!)" },
    { s: "لَعِبَتْ:- / فَاطِمَةُ:- / مَعَ:- / المُعَلِّمَاتِ:cerr.Muzâfun ileyh", tr: "Fâtıma kadın öğretmenlerle oynadı.", why: "مَعَ'den sonra → mecrûr → alameti kesre: ـَاتِ" }
  ],
  rules: [
    { tr: "<b class=\"r-mns\">Cem-i müennes sâlim</b>, üç ve daha fazla dişiyi (ya da şeyi) gösterir. Tekilin sonundaki <span class=\"ar\">ة</span> düşer, <span class=\"ar\">ـَاتٌ</span> eklenir.", ex: ["مُعَلِّمَةٌ ← مُعَلِّمَاتٌ", "سَيَّارَةٌ ← سَيَّارَاتٌ"] },
    { tr: "<b class=\"r-ref\">Merfû</b> iken alameti <b>damme</b>dir.", ex: ["اسْتَقْبَلَتِ المُعَلِّمَاتُ الضُّيُوفَ", "الطَّبِيبَاتُ نَاجِحَاتٌ"] },
    { tr: "<b class=\"r-nasb\">Mansûb</b> iken alameti <b>kesre</b>dir. Fetha almaz: <span class=\"ar\">المُعَلِّمَاتَ</span> yanlıştır; nekire ise <span class=\"ar\">ـَاتًا</span> değil <span class=\"ar\">ـَاتٍ</span> olur.", ex: ["وَدَّعَ المُدِيرُ المُعَلِّمَاتِ", "لَبِسَتِ المَرْأَةُ سَاعَاتٍ"] },
    { tr: "<b class=\"r-cerr\">Mecrûr</b> iken alameti yine <b>kesre</b>dir. Mansûb ile mecrûr aynı görünür.", ex: ["لَعِبَتْ فَاطِمَةُ مَعَ المُعَلِّمَاتِ"] },
    { tr: "İpucu: Fiil müennes ve tekil kalır; zamir <span class=\"ar\">ـهُنَّ</span> olur. <span class=\"ar\">بِنْتٌ</span>'in çoğulu <span class=\"ar\">بَنَاتٌ</span> da böyle i'rab edilir.", ex: ["وَصَلَتِ المُسَافِرَاتُ إِلَى بَلَدِهِنَّ"] },
    { tr: "İpucu: İnsan dışı çoğulların sıfatı çoğu zaman tekil müennes olur.", ex: ["سَاعَاتٍ جَدِيدَةً", "رِسَالَاتٍ سَمَاوِيَّةً"] }
  ],
  kaide: [
    "جَمْعُ المُؤَنَّثِ السَّالِمُ: اسْمٌ يَدُلُّ عَلَى ثَلَاثَةِ أَشْخَاصٍ فَأَكْثَرَ مِنَ الإِنَاثِ، بِزِيَادَةِ «ات» فِي آخِرِ المُفْرَدِ، مِثْلُ: اسْتَقْبَلَتِ المُعَلِّمَاتُ الضُّيُوفَ، وَدَّعَ المُدِيرُ المُعَلِّمَاتِ.",
    "• يُرْفَعُ جَمْعُ المُؤَنَّثِ السَّالِمُ بِالضَّمَّةِ، مِثْلُ: اسْتَقْبَلَتِ المُعَلِّمَاتُ الضُّيُوفَ.",
    "• وَيُنْصَبُ بِالكَسْرَةِ، مِثْلُ: وَدَّعَ المُدِيرُ المُعَلِّمَاتِ.",
    "• وَيُجَرُّ بِالكَسْرَةِ، مِثْلُ: لَعِبَتْ فَاطِمَةُ مَعَ المُعَلِّمَاتِ."
  ],
  ex: [
    { type: "pick", fill: true, num: "١", ar: "امْلَأِ الفَرَاغَ بِجَمْعِ المُؤَنَّثِ السَّالِمِ المُنَاسِبِ", tr: "Boşluğa uygun cem-i müennes sâlimi yerleştir.", items: [
      { q: "قَرَأْتُ ___ فِي الأُسْبُوعِ المَاضِي.", o: ["المَجَلَّاتُ", "المَجَلَّاتِ"], a: 1, tr: "Geçen hafta dergileri okudum.", why: "Mef'ûl bih → mansûb → KESRE (ـَاتِ)." },
      { q: "حَضَرَتِ ___ إِلَى الدَّرْسِ الأَوَّلِ.", o: ["الطَّالِبَاتُ", "الطَّالِبَاتِ"], a: 0, tr: "Kız öğrenciler ilk derse geldi.", why: "Fâil → merfû → damme." },
      { q: "شَرِبَتْ شَوَّالُ ___ مَعَ وَالِدِهَا.", o: ["المَشْرُوبَاتُ", "المَشْرُوبَاتِ"], a: 1, tr: "Şevval babasıyla birlikte içecekleri içti.", why: "Mef'ûl bih → mansûb → kesre." },
      { q: "___ مُفِيدَةٌ جِدًّا.", o: ["المَقَالَاتُ", "المَقَالَاتِ"], a: 0, tr: "Makaleler çok faydalıdır.", why: "Mübtedâ → merfû → damme. Haber tekil müennes: مُفِيدَةٌ." },
      { q: "فَحَصَتْ ___ مَرِيضَيْنِ.", o: ["الطَّبِيبَاتُ", "الطَّبِيبَاتِ"], a: 0, tr: "Kadın doktorlar iki hastayı muayene etti.", why: "Fâil → merfû → damme." },
      { q: "الطَّبِيبَاتُ ___ فِي الجَامِعَةِ.", o: ["نَاجِحَاتٌ", "نَاجِحَاتٍ"], a: 0, tr: "Kadın doktorlar üniversitede başarılıdır.", why: "Haber → merfû → damme tenvini (ـَاتٌ)." },
      { q: "شَاهَدَتِ الطَّبِيبَاتُ ___.", o: ["المَرِيضَاتُ", "المَرِيضَاتِ"], a: 1, tr: "Kadın doktorlar hasta kadınları gördü.", why: "Mef'ûl bih → mansûb → kesre." },
      { q: "حَامِدَةُ وَصَالِحَةُ وَسَمْرَاءُ ___ مَاهِرَاتٌ.", o: ["مُهَنْدِسَاتٌ", "مُهَنْدِسَاتٍ"], a: 0, tr: "Hâmide, Sâliha ve Semrâ usta mühendislerdir.", why: "Haber → merfû → damme tenvini." }
    ]},
    { type: "combo", num: "٢", ar: "حَوِّلِ الفَاعِلَ إِلَى جَمْعِ المُؤَنَّثِ السَّالِمِ", tr: "Fâili cem-i müennes sâlime çevir.",
      exHtml: "<span class=\"ar\">وَصَلَتِ المُسَافِرَةُ إِلَى بَلَدِهَا ← وَصَلَتِ المُسَافِرَاتُ إِلَى بَلَدِهِنَّ</span>", items: [
      CB("حَكَمَتِ الحَاكِمَةُ بِالعَدْلِ.", ["حَكَمَتِ", ["الحَاكِمَةُ", "الحَاكِمَاتُ", "الحَاكِمَاتِ"], "بِالعَدْلِ."], [1], "Kadın yöneticiler adaletle hükmetti.", "Fâil → merfû → damme: ـَاتُ."),
      CB("شَرِبَتِ البِنْتُ عَصِيرَهَا.", ["شَرِبَتِ", ["البِنْتُ", "البَنَاتُ", "البَنَاتِ"], ["عَصِيرَهَا", "عَصِيرَهُنَّ"]], [1, 1], "Kızlar meyve sularını içti.", "بِنْتٌ'in çoğulu بَنَاتٌ; cem-i müennes sâlim gibi i'rab edilir. Zamir: ـهُنَّ."),
      CB("خَرَجَتِ المُدِيرَةُ مِنَ المَدْرَسَةِ.", ["خَرَجَتِ", ["المُدِيرَةُ", "المُدِيرَاتُ", "المُدِيرَاتِ"], "مِنَ المَدْرَسَةِ."], [1], "Kadın müdürler okuldan çıktı.", "Fâil → merfû → damme."),
      CB("كَتَبَتِ المُدِيرَةُ عَلَى السَّبُّورَةِ.", ["كَتَبَتِ", ["المُدِيرَةُ", "المُدِيرَاتُ", "المُدِيرَاتِ"], "عَلَى السَّبُّورَةِ."], [1], "Kadın müdürler tahtaya yazdı.", "Fâil → merfû → damme."),
      CB("فَكَّرَتِ العَالِمَةُ فِي المَسْأَلَةِ.", ["فَكَّرَتِ", ["العَالِمَةُ", "العَالِمَاتُ", "العَالِمَاتِ"], "فِي المَسْأَلَةِ."], [1], "Kadın âlimler mesele üzerinde düşündü.", "Fâil → merfû → damme."),
      CB("عَمِلَتِ الزَّوْجَةُ شَايًا لَذِيذًا.", ["عَمِلَتِ", ["الزَّوْجَةُ", "الزَّوْجَاتُ", "الزَّوْجَاتِ"], "شَايًا لَذِيذًا."], [1], "Hanımlar lezzetli bir çay yaptı.", "Fâil → merfû → damme."),
      CB("فَحَصَتِ الطَّبِيبَةُ المَاهِرَةُ المَرِيضَ.", ["فَحَصَتِ", ["الطَّبِيبَةُ", "الطَّبِيبَاتُ", "الطَّبِيبَاتِ"], ["المَاهِرَةُ", "المَاهِرَاتُ", "المَاهِرَاتِ"], "المَرِيضَ."], [1, 1], "Usta kadın doktorlar hastayı muayene etti.", "Fâil ve sıfatı merfû → ـَاتُ."),
      CB("دَخَلَتِ التِّلْمِيذَةُ الصَّغِيرَةُ الدَّرْسَ.", ["دَخَلَتِ", ["التِّلْمِيذَةُ", "التِّلْمِيذَاتُ", "التِّلْمِيذَاتِ"], ["الصَّغِيرَةُ", "الصَّغِيرَاتُ", "الصَّغِيرَاتِ"], "الدَّرْسَ."], [1, 1], "Küçük kız öğrenciler derse girdi.", "Fâil ve sıfatı merfû → ـَاتُ.")
    ]},
    { type: "combo", num: "٣", ar: "حَوِّلِ المَفْعُولَ بِهِ إِلَى جَمْعِ المُؤَنَّثِ السَّالِمِ", tr: "Mef'ûlü cem-i müennes sâlime çevir. Tuzağa dikkat: fetha mı, kesre mi?",
      exHtml: "<span class=\"ar\">سَاعَدَ المُسْلِمُ الصَّائِمَةَ ← سَاعَدَ المُسْلِمُ الصَّائِمَاتِ</span>", items: [
      CB("فَحَصَ الطَّبِيبُ الفَقِيرَةَ.", ["فَحَصَ الطَّبِيبُ", ["الفَقِيرَةَ", "الفَقِيرَاتَ", "الفَقِيرَاتِ"]], [2], "Doktor fakir kadınları muayene etti.", "Mef'ûl → mansûb → KESRE: ـَاتِ. ـَاتَ yanlıştır."),
      CB("لَبِسَتِ المَرْأَةُ سَاعَةً جَدِيدَةً.", ["لَبِسَتِ المَرْأَةُ", ["سَاعَةً", "سَاعَاتًا", "سَاعَاتٍ"], ["جَدِيدَةً", "جَدِيدَاتٍ"]], [[2, 0], [2, 1]], "Kadın yeni saatler taktı.", "Nekire mansûb: ـَاتٍ (ـَاتًا olmaz). İnsan dışı çoğulun sıfatı genelde tekil müennestir: جَدِيدَةً (جَدِيدَاتٍ da doğru)."),
      CB("أَخْرَجَتِ المُدِيرَةُ الكُرَّاسَةَ.", ["أَخْرَجَتِ المُدِيرَةُ", ["الكُرَّاسَةَ", "الكُرَّاسَاتَ", "الكُرَّاسَاتِ"]], [2], "Kadın müdür defterleri çıkardı.", "Mef'ûl → mansûb → kesre."),
      CB("بَعَثَ اللهُ رِسَالَةً سَمَاوِيَّةً إِلَى البَشَرِ.", ["بَعَثَ اللهُ", ["رِسَالَةً", "رِسَالَاتًا", "رِسَالَاتٍ"], ["سَمَاوِيَّةً", "سَمَاوِيَّاتٍ"], "إِلَى البَشَرِ."], [[2, 0], [2, 1]], "Allah insanlara semavî mesajlar gönderdi.", "Nekire mansûb: ـَاتٍ. Sıfat: سَمَاوِيَّةً (سَمَاوِيَّاتٍ da doğru)."),
      CB("أَصْلَحَتِ المُهَنْدِسَةُ السَّيَّارَةَ.", ["أَصْلَحَتِ المُهَنْدِسَةُ", ["السَّيَّارَةَ", "السَّيَّارَاتَ", "السَّيَّارَاتِ"]], [2], "Kadın mühendis arabaları tamir etti.", "Mef'ûl → mansûb → kesre."),
      CB("رَكِبَتِ البِنْتُ الطَّائِرَةَ.", ["رَكِبَتِ البِنْتُ", ["الطَّائِرَةَ", "الطَّائِرَاتَ", "الطَّائِرَاتِ"]], [2], "Kız uçaklara bindi.", "Mef'ûl → mansûb → kesre."),
      CB("كَتَبَتِ الطَّبِيبَةُ الوَصْفَةَ.", ["كَتَبَتِ الطَّبِيبَةُ", ["الوَصْفَةَ", "الوَصَفَاتَ", "الوَصَفَاتِ"]], [2], "Kadın doktor reçeteleri yazdı.", "Mef'ûl → mansûb → kesre."),
      CB("دَخَلَتِ التِّلْمِيذَةُ الحُجْرَةَ.", ["دَخَلَتِ التِّلْمِيذَةُ", ["الحُجْرَةَ", "الحُجُرَاتَ", "الحُجُرَاتِ"]], [2], "Kız öğrenci odalara girdi.", "Mef'ûl → mansûb → kesre. (Hucurât sûresinin adı da buradan.)")
    ]},
    { type: "irab", num: "+", extra: true, only: "c", ar: "ـَاتِ: مَنْصُوبٌ أَمْ مَجْرُورٌ؟", tr: "Ek alıştırma: kelime ـَاتِ ile bitiyorsa harekeye değil göreve bak. Mansûb mu, mecrûr mu?", items: [
      IR("رَكِبَتِ الطَّالِبَاتُ [الحَافِلَاتِ].", "mns", "nasb", "Mef'ûl bih → mansûb (alameti kesre).", "Kız öğrenciler otobüslere bindi."),
      IR("ذَهَبَتِ المُدَرِّسَاتُ [بِالسَّيَّارَاتِ].", "mns", "cerr", "بِـ harf-i cerrinden sonra → mecrûr (kesre).", "Kadın öğretmenler arabalarla gitti."),
      IR("سَلَّمْتُ عَلَى [المُعَلِّمَاتِ].", "mns", "cerr", "عَلَى'dan sonra → mecrûr.", "Kadın öğretmenlere selam verdim."),
      IR("شَكَرَ المُدِيرُ [المُوَظَّفَاتِ].", "mns", "nasb", "Mef'ûl bih → mansûb (kesre).", "Müdür kadın memurlara teşekkür etti."),
      IR("[الطَّالِبَاتُ] مُجْتَهِدَاتٌ.", "mns", "ref", "Mübtedâ → merfû (damme).", "Kız öğrenciler çalışkandır."),
      IR("تَكَلَّمْتُ مَعَ [الطَّبِيبَاتِ].", "mns", "cerr", "مَعَ'den sonra → mecrûr.", "Kadın doktorlarla konuştum."),
      IR("قَرَأَ أَحْمَدُ [المَجَلَّاتِ].", "mns", "nasb", "Mef'ûl bih → mansûb (kesre).", "Ahmed dergileri okudu."),
      IR("حَضَرَتِ [المُهَنْدِسَاتُ].", "mns", "ref", "Fâil → merfû (damme).", "Kadın mühendisler geldi.")
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · CEM-İ TEKSÎR
{
  id: "u4", no: 4, ar: "إِعْرَابُ جَمْعِ التَّكْسِيرِ", tr: "Cem-i Teksîrin İ'rabı", short: "Cem-i teksîr", col: "tks", part: 2,
  goals: ["Kırık çoğulu tekilinden ayırmak ve tekilini bulmak", "Damme, fetha, kesre ile üç halin de ayrı göründüğünü görmek", "Tuzakları tanımak: أَصْوَاتٌ teksîr, بَنَاتٌ cem-i müennes sâlim gibi", "Okuma parçasında cem-i müennes sâlim ve teksîrin i'rabını yapmak"],
  examples: [
    { s: "اسْتَقْبَلَ:- / الطُّلَّابُ:ref.Fâil / المُعَلِّمَ:-", tr: "Öğrenciler öğretmeni karşıladı.", why: "Fâil → merfû → alameti damme: ـُ" },
    { s: "وَدَّعَ:- / الوَالِدُ:- / الطُّلَّابَ:nasb.Mef'ûl", tr: "Baba öğrencileri uğurladı.", why: "Mef'ûl bih → mansûb → alameti fetha: ـَ" },
    { s: "لَعِبَ:- / سَلِيمٌ:- / مَعَ:- / الطُّلَّابِ:cerr.Muzâfun ileyh", tr: "Selîm öğrencilerle oynadı.", why: "مَعَ'den sonra → mecrûr → alameti kesre: ـِ" }
  ],
  rules: [
    { tr: "<b class=\"r-tks\">Cem-i teksîr</b>, tekilin kalıbı değiştirilerek (kırılarak) yapılan çoğuldur. Erkek, dişi ve insan dışı varlıklar için kullanılır.", ex: ["طَالِبٌ ← طُلَّابٌ", "كِتَابٌ ← كُتُبٌ", "أَمِيرٌ ← أُمَرَاءُ", "شَجَرَةٌ ← أَشْجَارٌ"] },
    { tr: "Tekil isim gibi i'rab edilir: <b class=\"r-ref\">merfû</b> damme, <b class=\"r-nasb\">mansûb</b> fetha, <b class=\"r-cerr\">mecrûr</b> kesre. Üç hal de ayrı görünür.", ex: ["الطُّلَّابُ", "الطُّلَّابَ", "الطُّلَّابِ"] },
    { tr: "Dikkat: sonu <span class=\"ar\">ـات</span> olan her kelime cem-i müennes sâlim değildir. <span class=\"ar\">ت</span> kökün harfiyse teksîrdir ve mansûbken fetha alır.", ex: ["صَوْتٌ ← أَصْوَاتٌ", "وَقْتٌ ← أَوْقَاتٌ", "سَمِعْتُ الأَصْوَاتَ"] },
    { tr: "İnsan dışı çoğulun sıfatı ve haberi çoğunlukla tekil müennes olur.", ex: ["الأَدْوِيَةُ مُفِيدَةٌ", "أَسْئِلَةً صَعْبَةً", "الأَطْعِمَةَ المُخْتَلِفَةَ"] },
    { tr: "İpucu: <span class=\"ar\">مَرْضَى</span> gibi elif-i maksûre ile bitenlerde hareke görünmez (takdîrî i'rab). <span class=\"ar\">أَرَانِبُ، دَفَاتِرُ، تَلَامِيذُ</span> gibi kalıplar nekire iken tenvin almaz." }
  ],
  kaide: [
    "جَمْعُ التَّكْسِيرِ: اسْمٌ يَدُلُّ عَلَى ثَلَاثَةِ أَشْخَاصٍ فَأَكْثَرَ مِنَ الذُّكُورِ وَالإِنَاثِ بِتَغْيِيرِ صُورَةِ المُفْرَدِ، مِثْلُ: اسْتَقْبَلَ الطُّلَّابُ المُعَلِّمَ.",
    "• يُرْفَعُ جَمْعُ التَّكْسِيرِ بِالضَّمَّةِ، مِثْلُ: اسْتَقْبَلَ الطُّلَّابُ المُعَلِّمَ.",
    "• وَيُنْصَبُ بِالفَتْحَةِ، مِثْلُ: وَدَّعَ الوَالِدُ الطُّلَّابَ.",
    "• وَيُجَرُّ بِالكَسْرَةِ، مِثْلُ: لَعِبَ سَلِيمٌ مَعَ الطُّلَّابِ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٤", ar: "امْلَأِ الفَرَاغَ بِجَمْعِ التَّكْسِيرِ المُنَاسِبِ", tr: "Boşluğa doğru harekeli kırık çoğulu yerleştir.", items: [
      { q: "قَرَأْتُ ___ فِي الشَّهْرِ المَاضِي.", o: ["الكُتُبُ", "الكُتُبَ", "الكُتُبِ"], a: 1, tr: "Geçen ay kitapları okudum.", why: "Mef'ûl bih → mansûb → fetha." },
      { q: "حَضَرَتِ ___ إِلَى الدَّرْسِ الأَوَّلِ.", o: ["البَنَاتُ", "البَنَاتَ", "البَنَاتِ"], a: 0, tr: "Kızlar ilk derse geldi.", why: "Fâil → merfû → damme. (بَنَاتٌ aslında cem-i müennes sâlim gibi çekilir; mansûbu البَنَاتِ olur.)" },
      { q: "لَعِبَ إِبْرَاهِيمُ مَعَ ___.", o: ["التَّلَامِيذُ", "التَّلَامِيذَ", "التَّلَامِيذِ"], a: 2, tr: "İbrahim öğrencilerle oynadı.", why: "مَعَ'den sonra → mecrûr → kesre." },
      { q: "___ مُفِيدَةٌ جِدًّا.", o: ["الأَدْوِيَةُ", "الأَدْوِيَةَ", "الأَدْوِيَةِ"], a: 0, tr: "İlaçlar çok faydalıdır.", why: "Mübtedâ → merfû → damme. Haber tekil müennes: مُفِيدَةٌ." },
      { q: "فَحَصَ المُعَلِّمُ ___.", o: ["الأَسْئِلَةُ", "الأَسْئِلَةَ", "الأَسْئِلَةِ"], a: 1, tr: "Öğretmen soruları inceledi.", why: "Mef'ûl bih → mansûb → fetha." },
      { q: "قَطَفَتِ النِّسَاءُ ___.", o: ["الأَزْهَارُ", "الأَزْهَارَ", "الأَزْهَارِ"], a: 1, tr: "Kadınlar çiçekleri topladı.", why: "Mef'ûl bih → mansûb → fetha. (النِّسَاءُ fâil, o da teksîr.)" },
      { q: "شَاهَدَ الصَّيَّادُ ___.", o: ["الأَرَانِبُ", "الأَرَانِبَ", "الأَرَانِبِ"], a: 1, tr: "Avcı tavşanları gördü.", why: "Mef'ûl bih → mansûb → fetha." },
      { q: "كَتَبَ الطُّلَّابُ الدَّرْسَ فِي ___.", o: ["الدَّفَاتِرُ", "الدَّفَاتِرَ", "الدَّفَاتِرِ"], a: 2, tr: "Öğrenciler dersi defterlere yazdı.", why: "فِي harf-i cerrinden sonra → mecrûr → kesre." }
    ]},
    { type: "combo", num: "٥", ar: "حَوِّلْ مَا تَحْتَهُ خَطٌّ إِلَى جَمْعِ التَّكْسِيرِ", tr: "Altı çizili kelimeyi kırık çoğula çevir; harekesini göreve göre seç.",
      exHtml: "<span class=\"ar\">اسْتَقْبَلَ الأَمِيرُ المُسَافِرَ فِي القَصْرِ ← اسْتَقْبَلَ الأُمَرَاءُ المُسَافِرَ فِي القَصْرِ</span>", items: [
      CB("صَعِدَ الرِّيَاضِيُّ <span class=\"ul\">الجَبَلَ</span>.", ["صَعِدَ الرِّيَاضِيُّ", ["الجَبَلَ", "الجِبَالُ", "الجِبَالَ", "الجِبَالِ"]], [2], "Sporcu dağlara tırmandı.", "Mef'ûl bih → mansûb → fetha."),
      CB("رَبِحَ <span class=\"ul\">التَّاجِرُ</span> مَالًا كَثِيرًا.", ["رَبِحَ", ["التَّاجِرُ", "التُّجَّارُ", "التُّجَّارَ", "التُّجَّارِ"], "مَالًا كَثِيرًا."], [1], "Tüccarlar çok mal kazandı.", "Fâil → merfû → damme."),
      CB("تَخَرَّجَتِ الطَّالِبَةُ فِي <span class=\"ul\">المَدْرَسَةِ</span>.", ["تَخَرَّجَتِ الطَّالِبَةُ فِي", ["المَدْرَسَةِ", "المَدَارِسُ", "المَدَارِسَ", "المَدَارِسِ"]], [3], "Kız öğrenci okullardan mezun oldu.", "فِي'den sonra → mecrûr → kesre."),
      CB("سَأَلَتْ فَاطِمَةُ <span class=\"ul\">سُؤَالًا صَعْبًا</span>.", ["سَأَلَتْ فَاطِمَةُ", ["سُؤَالًا", "أَسْئِلَةٌ", "أَسْئِلَةً", "أَسْئِلَةٍ"], ["صَعْبًا", "صَعْبَةً", "صِعَابًا"]], [[2, 1], [2, 2]], "Fâtıma zor sorular sordu.", "Mef'ûl → mansûb → fetha (tenvinli: أَسْئِلَةً). İnsan dışı çoğulun sıfatı: صَعْبَةً (صِعَابًا da olur)."),
      CB("فَكَّرَ الوَالِدُ فِي <span class=\"ul\">الأَمْرِ</span>.", ["فَكَّرَ الوَالِدُ فِي", ["الأَمْرِ", "الأُمُورُ", "الأُمُورَ", "الأُمُورِ"]], [3], "Baba işler üzerinde düşündü.", "فِي'den sonra → mecrûr → kesre."),
      CB("عَمِلَتِ الزَّوْجَةُ <span class=\"ul\">طَعَامًا مَحَلِّيًّا</span>.", ["عَمِلَتِ الزَّوْجَةُ", ["طَعَامًا", "أَطْعِمَةٌ", "أَطْعِمَةً", "أَطْعِمَةٍ"], ["مَحَلِّيًّا", "مَحَلِّيَّةً"]], [2, 1], "Hanım yöresel yemekler yaptı.", "Mef'ûl → fetha: أَطْعِمَةً; sıfat tekil müennes: مَحَلِّيَّةً."),
      CB("كَتَبَتِ الطَّبِيبَةُ وَصْفَةً <span class=\"ul\">لِلْمَرِيضِ</span>.", ["كَتَبَتِ الطَّبِيبَةُ وَصْفَةً", ["لِلْمَرِيضِ", "لِلْمَرْضَى", "لِلْمَرِيضِينَ"]], [1], "Kadın doktor hastalar için bir reçete yazdı.", "مَرِيضٌ'in kırık çoğulu مَرْضَى. Elif-i maksûre ile bittiği için kesre görünmez (takdîrî), ama mecrûrdur."),
      CB("دَخَلَتِ التِّلْمِيذَةُ الصَّغِيرَةُ <span class=\"ul\">الدَّرْسَ</span>.", ["دَخَلَتِ التِّلْمِيذَةُ الصَّغِيرَةُ", ["الدَّرْسَ", "الدُّرُوسُ", "الدُّرُوسَ", "الدُّرُوسِ"]], [2], "Küçük kız öğrenci derslere girdi.", "Mef'ûl → mansûb → fetha.")
    ]},
    { type: "classify", num: "+", extra: true, opts: [["mns", "Cem-i müe. sâlim", "جَمْعُ مُؤَنَّثٍ سَالِمٌ", "mns"], ["tks", "Cem-i teksîr", "جَمْعُ تَكْسِيرٍ", "tks"]], ar: "هَلْ كُلُّ «ـات» جَمْعُ مُؤَنَّثٍ سَالِمٌ؟", tr: "Ek alıştırma: tekilini düşün. ت kökten mi, sonradan mı eklenmiş?", items: [
      { s: "أَصْوَاتٌ", a: "tks", why: "Tekili صَوْتٌ; ت kökün harfi. Kalıp أَفْعَالٌ: teksîr." },
      { s: "مُعَلِّمَاتٌ", a: "mns", why: "مُعَلِّمَةٌ + ـَاتٌ." },
      { s: "أَوْقَاتٌ", a: "tks", why: "Tekili وَقْتٌ: teksîr." },
      { s: "سَيَّارَاتٌ", a: "mns", why: "سَيَّارَةٌ + ـَاتٌ." },
      { s: "أَبْيَاتٌ", a: "tks", why: "Tekili بَيْتٌ (şiir beyti): teksîr." },
      { s: "نَبَاتَاتٌ", a: "mns", why: "نَبَاتٌ + ـَاتٌ: sonradan eklenmiş." },
      { s: "أَمْوَاتٌ", a: "tks", why: "Tekili مَيِّتٌ: teksîr." },
      { s: "حَافِلَاتٌ", a: "mns", why: "حَافِلَةٌ + ـَاتٌ." },
      { s: "قُضَاةٌ", a: "tks", why: "Tekili قَاضٍ. Sonunda ة var ama kırık çoğuldur." }
    ]},
    { type: "find", target: "y", reading: true, num: "قِرَاءَةٌ (أ)", ar: "اقْرَأِ القِطْعَةَ وَعَيِّنْ جَمْعَ المُؤَنَّثِ السَّالِمَ وَجَمْعَ التَّكْسِيرِ", tr: "Parçayı oku. Her cümledeki cem-i müennes sâlim ve cem-i teksîr isimlere dokun, sonra Kontrol et. Müsennâ ve cem-i müzekker sâlim bu sefer hedef değil.",
      title: "رِحْلَةٌ إِلَى شَاطِئِ البَحْرِ",
      text: "نَظَّمَتْ طَالِبَاتُ الصَّفِّ التَّحْضِيرِيِّ رِحْلَةً إِلَى شَاطِئِ البَحْرِ فِي شَهْرِ مَايُو. وَفِي صَبَاحِ الرِّحْلَةِ اجْتَمَعَتِ الطَّالِبَاتُ فِي فِنَاءِ الكُلِّيَّةِ وَرَكِبْنَ الحَافِلَاتِ وَذَهَبْنَ إِلَى السَّاحِلِ. اشْتَرَكَتْ مُدَرِّسَاتُ الصُّفُوفِ التَّحْضِيرِيَّةِ أَيْضًا فِي الرِّحْلَةِ. ذَهَبَتِ المُدَرِّسَاتُ إِلَى السَّاحِلِ بِالسَّيَّارَاتِ. جَهَّزَتِ الطَّالِبَاتُ الأَطْعِمَةَ المُخْتَلِفَةَ وَالمَشْرُوبَاتِ الطَّبِيعِيَّةَ. أَكَلَتِ الطَّالِبَاتُ الأَطْعِمَةَ وَشَرِبْنَ المَشْرُوبَاتِ، ثُمَّ لَعِبْنَ مَعَ مُدَرِّسَاتِهِنَّ كُرَةَ الطَّائِرَةِ. وَفِي العَصْرِ رَكِبَتِ الطَّالِبَاتُ الحَافِلَاتِ وَرَجَعْنَ إِلَى الكُلِّيَّةِ.<br>وَنَظَّمَ طُلَّابُ الكُلِّيَّةِ أَيْضًا رِحْلَةً إِلَى الغَابَةِ. اشْتَرَكَ فِي الرِّحْلَةِ خَمْسُونَ طَالِبًا تَقْرِيبًا. عَمِيدُ الكُلِّيَّةِ وَعَدَدٌ كَبِيرٌ مِنَ المُدَرِّسِينَ أَيْضًا شَارَكُوا فِي هَذِهِ الرِّحْلَةِ. جَلَسَ الطُّلَّابُ تَحْتَ الأَشْجَارِ وَأَكَلُوا الأَطْعِمَةَ اللَّذِيذَةَ. شَاهَدُوا هُنَاكَ الأَزْهَارَ اللَّطِيفَةَ وَالأَشْجَارَ الطَّوِيلَةَ وَالنَّبَاتَاتِ المُخْتَلِفَةَ وَالأَرَانِبَ الصَّغِيرَةَ. كَوَّنَ الطُّلَّابُ فَرِيقَيْنِ وَلَعِبُوا مَعَ المُدَرِّسِينَ كُرَةَ القَدَمِ.",
      textTr: "Deniz Kıyısına Gezi. Hazırlık sınıfının kız öğrencileri mayıs ayında deniz kıyısına bir gezi düzenledi. Gezi sabahı kız öğrenciler fakültenin avlusunda toplandı, otobüslere binip sahile gittiler. Hazırlık sınıflarının kadın öğretmenleri de geziye katıldı; onlar sahile arabalarla gitti. Kız öğrenciler çeşitli yiyecekler ve doğal içecekler hazırladı. Yiyecekleri yediler, içecekleri içtiler, sonra öğretmenleriyle voleybol oynadılar. İkindi vakti otobüslere binip fakülteye döndüler. Fakültenin erkek öğrencileri de ormana bir gezi düzenledi. Geziye yaklaşık elli öğrenci katıldı. Fakülte dekanı ve pek çok öğretmen de bu geziye katıldı. Öğrenciler ağaçların altına oturup lezzetli yiyecekler yediler. Orada güzel çiçekleri, uzun ağaçları, çeşitli bitkileri ve küçük tavşanları seyrettiler. Öğrenciler iki takım kurup öğretmenlerle futbol oynadı.",
      items: [
      W("نَظَّمَتْ [طَالِبَاتُ] الصَّفِّ التَّحْضِيرِيِّ رِحْلَةً إِلَى شَاطِئِ البَحْرِ.", "Hazırlık sınıfının kız öğrencileri deniz kıyısına bir gezi düzenledi.", "طَالِبَاتُ: cem-i müennes sâlim, fâil."),
      W("اجْتَمَعَتِ [الطَّالِبَاتُ] فِي فِنَاءِ الكُلِّيَّةِ وَرَكِبْنَ [الحَافِلَاتِ] وَذَهَبْنَ إِلَى السَّاحِلِ.", "Kız öğrenciler fakülte avlusunda toplandı, otobüslere binip sahile gitti.", "İkisi de cem-i müennes sâlim; الحَافِلَاتِ mef'ûl ama kesreli."),
      W("اشْتَرَكَتْ [مُدَرِّسَاتُ] [الصُّفُوفِ] التَّحْضِيرِيَّةِ أَيْضًا فِي الرِّحْلَةِ.", "Hazırlık sınıflarının kadın öğretmenleri de geziye katıldı.", "مُدَرِّسَاتُ cem-i müennes sâlim; الصُّفُوفِ teksîr (tekili صَفٌّ)."),
      W("ذَهَبَتِ [المُدَرِّسَاتُ] إِلَى السَّاحِلِ [بِالسَّيَّارَاتِ].", "Kadın öğretmenler sahile arabalarla gitti.", "İkisi de cem-i müennes sâlim."),
      W("جَهَّزَتِ [الطَّالِبَاتُ] [الأَطْعِمَةَ] المُخْتَلِفَةَ [وَالمَشْرُوبَاتِ] الطَّبِيعِيَّةَ.", "Kız öğrenciler çeşitli yiyecekler ve doğal içecekler hazırladı.", "الأَطْعِمَةَ teksîr (tekili طَعَامٌ); diğer ikisi cem-i müennes sâlim. Sıfatlar tekil müennes."),
      W("أَكَلَتِ [الطَّالِبَاتُ] [الأَطْعِمَةَ] وَشَرِبْنَ [المَشْرُوبَاتِ]، ثُمَّ لَعِبْنَ مَعَ [مُدَرِّسَاتِهِنَّ] كُرَةَ الطَّائِرَةِ.", "Yiyecekleri yediler, içecekleri içtiler, sonra öğretmenleriyle voleybol oynadılar.", "كُرَةَ tekildir; ـهِنَّ zamirdir."),
      W("وَنَظَّمَ [طُلَّابُ] الكُلِّيَّةِ أَيْضًا رِحْلَةً إِلَى الغَابَةِ.", "Fakültenin erkek öğrencileri de ormana bir gezi düzenledi.", "طُلَّابُ teksîr (tekili طَالِبٌ)."),
      W("جَلَسَ [الطُّلَّابُ] تَحْتَ [الأَشْجَارِ] وَأَكَلُوا [الأَطْعِمَةَ] اللَّذِيذَةَ.", "Öğrenciler ağaçların altına oturup lezzetli yiyecekler yedi.", "Üçü de teksîr."),
      W("شَاهَدُوا هُنَاكَ [الأَزْهَارَ] اللَّطِيفَةَ [وَالأَشْجَارَ] الطَّوِيلَةَ [وَالنَّبَاتَاتِ] المُخْتَلِفَةَ [وَالأَرَانِبَ] الصَّغِيرَةَ.", "Orada güzel çiçekleri, uzun ağaçları, çeşitli bitkileri ve küçük tavşanları seyrettiler.", "النَّبَاتَاتِ cem-i müennes sâlim; diğerleri teksîr. Hepsi mansûb: teksîrler fetha, النَّبَاتَاتِ kesre."),
      W("كَوَّنَ [الطُّلَّابُ] فَرِيقَيْنِ وَلَعِبُوا مَعَ المُدَرِّسِينَ كُرَةَ القَدَمِ.", "Öğrenciler iki takım kurup öğretmenlerle futbol oynadı.", "فَرِيقَيْنِ müsennâ, المُدَرِّسِينَ cem-i müzekker sâlim: bu sefer hedef değil.")
    ]},
    { type: "irab", num: "قِرَاءَةٌ (ب)", topts: ["mns", "tks"], ar: "أَعْرِبْ جَمْعَ المُؤَنَّثِ السَّالِمَ وَجَمْعَ التَّكْسِيرِ", tr: "Parçadaki kelimelerin i'rabını yap: önce türünü, sonra halini seç.", items: [
      IR("نَظَّمَتْ [طَالِبَاتُ] الصَّفِّ رِحْلَةً.", "mns", "ref", "Fâil → merfû; alameti damme. Muzâf olduğu için tenvin almaz.", "Sınıfın kız öğrencileri bir gezi düzenledi."),
      IR("رَكِبْنَ [الحَافِلَاتِ] وَذَهَبْنَ إِلَى السَّاحِلِ.", "mns", "nasb", "Mef'ûl bih → mansûb; alameti kesre.", "Otobüslere binip sahile gittiler."),
      IR("اشْتَرَكَتْ [مُدَرِّسَاتُ] الصُّفُوفِ فِي الرِّحْلَةِ.", "mns", "ref", "Fâil → merfû; alameti damme.", "Sınıfların kadın öğretmenleri geziye katıldı."),
      IR("اشْتَرَكَتْ مُدَرِّسَاتُ [الصُّفُوفِ] فِي الرِّحْلَةِ.", "tks", "cerr", "Muzâfun ileyh → mecrûr; alameti kesre.", "Sınıfların kadın öğretmenleri geziye katıldı."),
      IR("ذَهَبَتِ المُدَرِّسَاتُ إِلَى السَّاحِلِ [بِالسَّيَّارَاتِ].", "mns", "cerr", "بِـ'den sonra → mecrûr; alameti kesre.", "Kadın öğretmenler sahile arabalarla gitti."),
      IR("جَهَّزَتِ الطَّالِبَاتُ [الأَطْعِمَةَ] المُخْتَلِفَةَ.", "tks", "nasb", "Mef'ûl bih → mansûb; alameti fetha.", "Kız öğrenciler çeşitli yiyecekler hazırladı."),
      IR("جَهَّزَتِ الطَّالِبَاتُ الأَطْعِمَةَ [وَالمَشْرُوبَاتِ] الطَّبِيعِيَّةَ.", "mns", "nasb", "Mansûb olan الأَطْعِمَةَ'ye atfedilmiş → mansûb; alameti kesre.", "Kız öğrenciler yiyecekler ve doğal içecekler hazırladı."),
      IR("لَعِبْنَ مَعَ [مُدَرِّسَاتِهِنَّ] كُرَةَ الطَّائِرَةِ.", "mns", "cerr", "مَعَ'den sonra muzâfun ileyh → mecrûr; alameti kesre.", "Öğretmenleriyle voleybol oynadılar."),
      IR("وَنَظَّمَ [طُلَّابُ] الكُلِّيَّةِ رِحْلَةً إِلَى الغَابَةِ.", "tks", "ref", "Fâil → merfû; alameti damme.", "Fakültenin öğrencileri ormana bir gezi düzenledi."),
      IR("جَلَسَ الطُّلَّابُ تَحْتَ [الأَشْجَارِ].", "tks", "cerr", "تَحْتَ'dan sonra muzâfun ileyh → mecrûr; alameti kesre.", "Öğrenciler ağaçların altına oturdu."),
      IR("شَاهَدُوا هُنَاكَ [الأَزْهَارَ] اللَّطِيفَةَ.", "tks", "nasb", "Mef'ûl bih → mansûb; alameti fetha.", "Orada güzel çiçekleri seyrettiler."),
      IR("شَاهَدُوا الأَزْهَارَ [وَالنَّبَاتَاتِ] المُخْتَلِفَةَ.", "mns", "nasb", "Mef'ûle atfedilmiş → mansûb; alameti kesre.", "Çiçekleri ve çeşitli bitkileri seyrettiler."),
      IR("شَاهَدُوا الأَزْهَارَ [وَالأَرَانِبَ] الصَّغِيرَةَ.", "tks", "nasb", "Mef'ûle atfedilmiş → mansûb; alameti fetha.", "Çiçekleri ve küçük tavşanları seyrettiler.")
    ]}
  ]
}
];

// Oyun havuzu: {kök|ek} hedef kelimeyi gösterir. [cümle, tür, hal, görev, Türkçe]
var IRAB_POOL = [
  ["اسْتَقْبَلَ {الطَّالِب|َانِ} المُعَلِّمَ.", "mus", "ref", "fâil", "İki öğrenci öğretmeni karşıladı."],
  ["وَدَّعَ الوَالِدُ {الطَّالِب|َيْنِ}.", "mus", "nasb", "mef'ûl bih", "Baba iki öğrenciyi uğurladı."],
  ["لَعِبَ سَلِيمٌ مَعَ {الطَّالِب|َيْنِ}.", "mus", "cerr", "muzâfun ileyh (مَعَ)", "Selîm iki öğrenciyle oynadı."],
  ["قَرَأْتُ {الكِتَاب|َيْنِ} فِي الأُسْبُوعِ المَاضِي.", "mus", "nasb", "mef'ûl bih", "Geçen hafta iki kitabı okudum."],
  ["حَضَرَ {الأُسْتَاذ|َانِ} إِلَى الدَّرْسِ الأَوَّلِ.", "mus", "ref", "fâil", "İki hoca ilk derse geldi."],
  ["{الكِتَاب|َانِ} مُفِيدَانِ جِدًّا.", "mus", "ref", "mübtedâ", "İki kitap çok faydalıdır."],
  ["فَحَصَتِ {الطَّبِيبَت|َانِ} مَرِيضَيْنِ.", "mus", "ref", "fâil", "İki kadın doktor iki hastayı muayene etti."],
  ["الطَّالِبَتَانِ {نَاجِحَت|َانِ} فِي الجَامِعَةِ.", "mus", "ref", "haber", "İki kız öğrenci üniversitede başarılıdır."],
  ["شَاهَدَتِ الطَّالِبَتَانِ {فِلْم|َيْنِ}.", "mus", "nasb", "mef'ûl bih", "İki kız öğrenci iki film izledi."],
  ["شَرِبَ الوَلَدُ {كُوب|َيْنِ} مِنَ الحَلِيبِ.", "mus", "nasb", "mef'ûl bih", "Çocuk iki bardak süt içti."],
  ["وَصَلَ {المُسَافِر|َانِ} إِلَى بَلَدِهِمَا.", "mus", "ref", "fâil", "İki yolcu memleketlerine vardı."],
  ["سَلَّمْتُ عَلَى {المُدَرِّس|َيْنِ}.", "mus", "cerr", "harf-i cerden sonra", "İki öğretmene selam verdim."],
  ["نَظَرْتُ إِلَى {الصُّورَت|َيْنِ}.", "mus", "cerr", "harf-i cerden sonra", "İki resme baktım."],
  ["قَرَأَتِ الطَّالِبَةُ {الحِكَايَت|َيْنِ}.", "mus", "nasb", "mef'ûl bih", "Kız öğrenci iki hikâyeyi okudu."],
  ["اسْتَقْبَلَ {المُهَنْدِس|ُونَ} المُعَلِّمَ.", "mzs", "ref", "fâil", "Mühendisler öğretmeni karşıladı."],
  ["وَدَّعَ الوَالِدُ {المُهَنْدِس|ِينَ}.", "mzs", "nasb", "mef'ûl bih", "Baba mühendisleri uğurladı."],
  ["اجْتَمَعَ سَلِيمٌ {بِالمُهَنْدِس|ِينَ}.", "mzs", "cerr", "harf-i cerden sonra", "Selîm mühendislerle bir araya geldi."],
  ["حَضَرَ {المُعَلِّم|ُونَ} إِلَى الاجْتِمَاعِ.", "mzs", "ref", "fâil", "Öğretmenler toplantıya geldi."],
  ["شَكَرَتْ سَاجِدَةُ {العَامِل|ِينَ}.", "mzs", "nasb", "mef'ûl bih", "Sâcide işçilere teşekkür etti."],
  ["سَمِعَ {المُسْلِم|ُونَ} الأَذَانَ.", "mzs", "ref", "fâil", "Müslümanlar ezanı duydu."],
  ["المُخْلِصُونَ {كَثِير|ُونَ}.", "mzs", "ref", "haber", "İhlaslı olanlar çoktur."],
  ["أَفْلَحَ {المُؤْمِن|ُونَ}.", "mzs", "ref", "fâil", "Müminler kurtuluşa erdi."],
  ["عَذَّبَ المُشْرِكُونَ {المُؤْمِن|ِينَ}.", "mzs", "nasb", "mef'ûl bih", "Müşrikler müminlere işkence etti."],
  ["سَلَّمْتُ عَلَى {القَادِم|ِينَ} مِنَ العُمْرَةِ.", "mzs", "cerr", "harf-i cerden sonra", "Umreden gelenlere selam verdim."],
  ["حَضَرَ الوَلَدُ مَعَ {العَامِل|ِينَ}.", "mzs", "cerr", "muzâfun ileyh (مَعَ)", "Çocuk işçilerle birlikte geldi."],
  ["قَابَلْنَا {المُهَنْدِس|ِينَ} فِي الشَّرِكَةِ.", "mzs", "nasb", "mef'ûl bih", "Şirkette mühendislerle görüştük."],
  ["{المُسْلِم|ُونَ} نَظِيفُونَ.", "mzs", "ref", "mübtedâ", "Müslümanlar temizdir."],
  ["شَكَرَتِ الطَّالِبَتَانِ {المُدَرِّس|ِينَ}.", "mzs", "nasb", "mef'ûl bih", "İki öğrenci öğretmenlere teşekkür etti."],
  ["اسْتَقْبَلَتِ {المُعَلِّم|َاتُ} الضُّيُوفَ.", "mns", "ref", "fâil", "Kadın öğretmenler misafirleri karşıladı."],
  ["وَدَّعَ المُدِيرُ {المُعَلِّم|َاتِ}.", "mns", "nasb", "mef'ûl bih", "Müdür kadın öğretmenleri uğurladı."],
  ["لَعِبَتْ فَاطِمَةُ مَعَ {المُعَلِّم|َاتِ}.", "mns", "cerr", "muzâfun ileyh (مَعَ)", "Fâtıma kadın öğretmenlerle oynadı."],
  ["قَرَأْتُ {المَجَلّ|َاتِ} فِي الأُسْبُوعِ المَاضِي.", "mns", "nasb", "mef'ûl bih", "Geçen hafta dergileri okudum."],
  ["حَضَرَتِ {الطَّالِب|َاتُ} إِلَى الدَّرْسِ الأَوَّلِ.", "mns", "ref", "fâil", "Kız öğrenciler ilk derse geldi."],
  ["شَرِبَتْ شَوَّالُ {المَشْرُوب|َاتِ} مَعَ وَالِدِهَا.", "mns", "nasb", "mef'ûl bih", "Şevval babasıyla içecekleri içti."],
  ["{المَقَال|َاتُ} مُفِيدَةٌ جِدًّا.", "mns", "ref", "mübtedâ", "Makaleler çok faydalıdır."],
  ["شَاهَدَتِ الطَّبِيبَاتُ {المَرِيض|َاتِ}.", "mns", "nasb", "mef'ûl bih", "Kadın doktorlar hasta kadınları gördü."],
  ["رَكِبَتِ الطَّالِبَاتُ {الحَافِل|َاتِ}.", "mns", "nasb", "mef'ûl bih", "Kız öğrenciler otobüslere bindi."],
  ["ذَهَبَتِ المُدَرِّسَاتُ إِلَى السَّاحِلِ {بِالسَّيَّار|َاتِ}.", "mns", "cerr", "harf-i cerden sonra", "Kadın öğretmenler sahile arabalarla gitti."],
  ["أَصْلَحَتِ المُهَنْدِسَةُ {السَّيَّار|َاتِ}.", "mns", "nasb", "mef'ûl bih", "Kadın mühendis arabaları tamir etti."],
  ["سَاعَدَ المُسْلِمُ {الصَّائِم|َاتِ}.", "mns", "nasb", "mef'ûl bih", "Müslüman oruçlu kadınlara yardım etti."],
  ["وَصَلَتِ {المُسَافِر|َاتُ} إِلَى بَلَدِهِنَّ.", "mns", "ref", "fâil", "Kadın yolcular memleketlerine vardı."],
  ["الطَّبِيبَاتُ {نَاجِح|َاتٌ} فِي الجَامِعَةِ.", "mns", "ref", "haber", "Kadın doktorlar üniversitede başarılıdır."],
  ["لَبِسَتِ المَرْأَةُ {سَاع|َاتٍ} جَدِيدَةً.", "mns", "nasb", "mef'ûl bih", "Kadın yeni saatler taktı."],
  ["اسْتَقْبَلَ {الطُّلَّاب|ُ} المُعَلِّمَ.", "tks", "ref", "fâil", "Öğrenciler öğretmeni karşıladı."],
  ["وَدَّعَ الوَالِدُ {الطُّلَّاب|َ}.", "tks", "nasb", "mef'ûl bih", "Baba öğrencileri uğurladı."],
  ["لَعِبَ سَلِيمٌ مَعَ {الطُّلَّاب|ِ}.", "tks", "cerr", "muzâfun ileyh (مَعَ)", "Selîm öğrencilerle oynadı."],
  ["قَرَأْتُ {الكُتُب|َ} فِي الشَّهْرِ المَاضِي.", "tks", "nasb", "mef'ûl bih", "Geçen ay kitapları okudum."],
  ["لَعِبَ إِبْرَاهِيمُ مَعَ {التَّلَامِيذ|ِ}.", "tks", "cerr", "muzâfun ileyh (مَعَ)", "İbrahim öğrencilerle oynadı."],
  ["{الأَدْوِيَة|ُ} مُفِيدَةٌ جِدًّا.", "tks", "ref", "mübtedâ", "İlaçlar çok faydalıdır."],
  ["فَحَصَ المُعَلِّمُ {الأَسْئِلَة|َ}.", "tks", "nasb", "mef'ûl bih", "Öğretmen soruları inceledi."],
  ["قَطَفَتِ النِّسَاءُ {الأَزْهَار|َ}.", "tks", "nasb", "mef'ûl bih", "Kadınlar çiçekleri topladı."],
  ["شَاهَدَ الصَّيَّادُ {الأَرَانِب|َ}.", "tks", "nasb", "mef'ûl bih", "Avcı tavşanları gördü."],
  ["كَتَبَ الطُّلَّابُ الدَّرْسَ فِي {الدَّفَاتِر|ِ}.", "tks", "cerr", "harf-i cerden sonra", "Öğrenciler dersi defterlere yazdı."],
  ["اسْتَقْبَلَ {الأُمَرَاء|ُ} المُسَافِرَ فِي القَصْرِ.", "tks", "ref", "fâil", "Emirler yolcuyu sarayda karşıladı."],
  ["جَلَسَ الطُّلَّابُ تَحْتَ {الأَشْجَار|ِ}.", "tks", "cerr", "muzâfun ileyh (تَحْتَ)", "Öğrenciler ağaçların altına oturdu."],
  ["صَعِدَ الرِّيَاضِيُّ {الجِبَال|َ}.", "tks", "nasb", "mef'ûl bih", "Sporcu dağlara tırmandı."],
  ["رَبِحَ {التُّجَّار|ُ} مَالًا كَثِيرًا.", "tks", "ref", "fâil", "Tüccarlar çok mal kazandı."],
  ["فَكَّرَ الوَالِدُ فِي {الأُمُور|ِ}.", "tks", "cerr", "harf-i cerden sonra", "Baba işler üzerinde düşündü."]
];

// Tür makinesi: [kelime, tür, açıklama]
var TUR_POOL = [
  ["مَكَانٌ", "muf", "ـان kökün parçası: tek bir yer."], ["إِنْسَانٌ", "muf", "Tek bir insan; ـان kalıbın parçası."], ["سُلْطَانٌ", "muf", "Tek bir sultan."], ["زَيْتُونٌ", "muf", "ـون kökün parçası: zeytin."],
  ["مِسْكِينٌ", "muf", "ـين kalıbın parçası: tek bir yoksul."], ["سِكِّينٌ", "muf", "Tek bir bıçak."], ["بُسْتَانٌ", "muf", "Tek bir bahçe."],
  ["طَالِبَانِ", "mus", "ـانِ: iki öğrenci."], ["كِتَابَيْنِ", "mus", "ـَيْنِ (fetha + yâ): iki kitap."], ["مُعَلِّمَتَانِ", "mus", "ة açılmış + ـانِ: iki kadın öğretmen."], ["الوَلَدَيْنِ", "mus", "ـَيْنِ: iki çocuk."], ["رَجُلَيْنِ", "mus", "ـَيْنِ: iki adam."], ["المُسْلِمَيْنِ", "mus", "ـَيْنِ: fetha + sakin yâ, nun kesreli."],
  ["مُهَنْدِسُونَ", "mzs", "ـُونَ: mühendisler."], ["المُسْلِمِينَ", "mzs", "ـِينَ: kesre + yâ, nun fethalı."], ["فَلَّاحُونَ", "mzs", "ـُونَ: çiftçiler."], ["مُعَلِّمِينَ", "mzs", "ـِينَ: öğretmenler."], ["المُؤْمِنُونَ", "mzs", "ـُونَ: müminler."], ["نَاجِحُونَ", "mzs", "ـُونَ: başarılılar."],
  ["مُعَلِّمَاتٌ", "mns", "مُعَلِّمَةٌ + ـَاتٌ."], ["سَيَّارَاتٌ", "mns", "سَيَّارَةٌ + ـَاتٌ."], ["الطَّالِبَاتِ", "mns", "طَالِبَةٌ + ـَاتٌ."], ["نَبَاتَاتٌ", "mns", "نَبَاتٌ + ـَاتٌ."], ["حَافِلَاتٌ", "mns", "حَافِلَةٌ + ـَاتٌ."], ["مَجَلَّاتٌ", "mns", "مَجَلَّةٌ + ـَاتٌ."],
  ["كُتُبٌ", "tks", "Tekili كِتَابٌ: kalıp kırılmış."], ["طُلَّابٌ", "tks", "Tekili طَالِبٌ."], ["أَصْوَاتٌ", "tks", "Tuzak! Tekili صَوْتٌ; ت kökten."], ["أَوْقَاتٌ", "tks", "Tuzak! Tekili وَقْتٌ."], ["أَبْيَاتٌ", "tks", "Tuzak! Tekili بَيْتٌ."],
  ["بُيُوتٌ", "tks", "Tekili بَيْتٌ; ـوت kalıbın parçası."], ["عُيُونٌ", "tks", "Tuzak! Tekili عَيْنٌ; ـون kalıbın parçası."], ["بَسَاتِينُ", "tks", "Tuzak! Tekili بُسْتَانٌ; ـين kalıbın parçası."], ["قُضَاةٌ", "tks", "Tekili قَاضٍ; sonunda ة olsa da kırık çoğul."],
  ["رِجَالٌ", "tks", "Tekili رَجُلٌ."], ["مَرْضَى", "tks", "Tekili مَرِيضٌ."], ["أُمَرَاءُ", "tks", "Tekili أَمِيرٌ."], ["دَفَاتِرُ", "tks", "Tekili دَفْتَرٌ."], ["شَيَاطِينُ", "tks", "Tuzak! Tekili شَيْطَانٌ."], ["مَيَادِينُ", "tks", "Tuzak! Tekili مَيْدَانٌ."]
];

var HAFIZA = {
  tks: { name: "Tekil ↔ kırık çoğul", pairs: [["طَالِبٌ", "طُلَّابٌ"], ["كِتَابٌ", "كُتُبٌ"], ["تِلْمِيذٌ", "تَلَامِيذُ"], ["دَوَاءٌ", "أَدْوِيَةٌ"], ["سُؤَالٌ", "أَسْئِلَةٌ"], ["زَهْرَةٌ", "أَزْهَارٌ"], ["أَرْنَبٌ", "أَرَانِبُ"], ["دَفْتَرٌ", "دَفَاتِرُ"], ["أَمِيرٌ", "أُمَرَاءُ"], ["جَبَلٌ", "جِبَالٌ"], ["تَاجِرٌ", "تُجَّارٌ"], ["مَدْرَسَةٌ", "مَدَارِسُ"], ["أَمْرٌ", "أُمُورٌ"], ["طَعَامٌ", "أَطْعِمَةٌ"], ["مَرِيضٌ", "مَرْضَى"], ["دَرْسٌ", "دُرُوسٌ"], ["شَجَرَةٌ", "أَشْجَارٌ"], ["ضَيْفٌ", "ضُيُوفٌ"], ["صَفٌّ", "صُفُوفٌ"], ["امْرَأَةٌ", "نِسَاءٌ"]] },
  alamet: { name: "Tür ve hal ↔ ek", pairs: [["Müsennâ<br>merfû", "ـَانِ"], ["Müsennâ<br>mansûb · mecrûr", "ـَيْنِ"], ["Cem-i müz.<br>merfû", "ـُونَ"], ["Cem-i müz.<br>mansûb · mecrûr", "ـِينَ"], ["Cem-i müe.<br>merfû", "ـَاتُ"], ["Cem-i müe.<br>mansûb · mecrûr", "ـَاتِ"]] }
};

var KARTLAR = [
  ["Müsennâ merfû iken alameti nedir?", "Elif: الطَّالِبَانِ"],
  ["Müsennâ mansûb ve mecrûr iken alameti nedir?", "Sakin yâ: الطَّالِبَيْنِ"],
  ["Müsennânın nunu hangi harekeyi alır?", "Daima kesre: ـانِ / ـَيْنِ"],
  ["Cem-i müzekker sâlim merfû iken alameti nedir?", "Vav: المُهَنْدِسُونَ"],
  ["Cem-i müzekker sâlim mansûb ve mecrûr iken?", "Yâ: المُهَنْدِسِينَ"],
  ["Cem-i müzekker sâlimin nunu?", "Daima fetha: ـُونَ / ـِينَ"],
  ["ـَيْنِ ile ـِينَ'nin farkı nedir?", "ـَيْنِ (fetha) müsennâ: المُسْلِمَيْنِ · ـِينَ (kesre) cem: المُسْلِمِينَ"],
  ["Cem-i müennes sâlim mansûb iken hangi harekeyi alır?", "Kesre (fetha değil!): وَدَّعَ المُدِيرُ المُعَلِّمَاتِ"],
  ["Cem-i müennes sâlim merfû ve mecrûr iken?", "Merfû damme: المُعَلِّمَاتُ · Mecrûr kesre: مَعَ المُعَلِّمَاتِ"],
  ["Cem-i teksîrin i'rab alametleri?", "Damme, fetha, kesre: الطُّلَّابُ / الطُّلَّابَ / الطُّلَّابِ"],
  ["Hangi türlerde mansûb ile mecrûr aynı görünür?", "Müsennâ, cem-i müzekker sâlim ve cem-i müennes sâlimde. Sadece teksîr üç hali ayrı gösterir."],
  ["Fiil başta, fâil müsennâ ya da cem ise fiil ne olur?", "Tekil kalır: حَضَرَ الأُسْتَاذَانِ · حَضَرَ الطُّلَّابُ"],
  ["Hangi görevler merfûdur?", "Fâil, mübtedâ ve haber: حَضَرَ المُعَلِّمُونَ"],
  ["İsim ne zaman mecrûr olur?", "Harf-i cerden sonra ve muzâfun ileyh olunca: فِي الدَّفَاتِرِ · تَحْتَ الأَشْجَارِ"],
  ["مُعَلِّمَا الصَّفِّ'de nun nereye gitti?", "İzafette müsennânın ve cem-i müzekker sâlimin nunu düşer: مُعَلِّمَا الصَّفِّ · مُعَلِّمُو المَدْرَسَةِ"],
  ["أَصْوَاتٌ cem-i müennes sâlim midir?", "Hayır, teksîrdir: tekili صَوْتٌ, ت kökün harfi. Mansûbu: الأَصْوَاتَ"]
];
