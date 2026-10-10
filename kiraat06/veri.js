// ================= VERİ: Kıraat 6 — المِهَنُ وَالأَعْمَالُ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "الشَّخْصُ", tr: "Kişi" }, nasb: { ar: "المِهْنَةُ", tr: "Meslek" }, cerr: { ar: "المَكَانُ", tr: "Yer" },
  mi: { ar: "الفِعْلُ", tr: "Fiil" }, ref: { ar: "الصِّفَةُ", tr: "Sıfat" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var CINS = [["m", "Erkek", "مُذَكَّرٌ", "muz"], ["f", "Kadın", "مُؤَنَّثٌ", "mun"]];
var NEBI = [["h", "Terzilik", "الخِيَاطَةُ", "mi"], ["n", "Marangozluk", "النِّجَارَةُ", "nasb"], ["d", "Demircilik", "الحِدَادَةُ", "ref"], ["r", "Çobanlık", "الرَّعْيُ", "mz"], ["z", "Çiftçilik", "الزِّرَاعَةُ", "cerr"], ["w", "Vezirlik", "الوِزَارَةُ", "muz"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", m: "Erkek", f: "Kadın" };

// Meslek makinesi: [meslek, Türkçe, ne yapar, nerede, aleti, çoğulu, kadını, Türkçe bilgiler]
var MESLEK = [
  ["نَجَّارٌ", "marangoz", "يَصْنَعُ الأَثَاثَ مِنَ الخَشَبِ", "الوَرْشَةُ / مَصْنَعُ المَفْرُوشَاتِ", "المِنْشَارُ", "نَجَّارُونَ", "نَجَّارَةٌ", ["tahtadan mobilya yapar", "atölye / mobilya fabrikası", "testere"]],
  ["طَبِيبٌ", "doktor", "يُعَالِجُ المَرْضَى", "المُسْتَشْفَى", "السَّمَّاعَةُ", "أَطِبَّاءُ", "طَبِيبَةٌ", ["hastaları tedavi eder", "hastane", "steteskop"]],
  ["طَيَّارٌ", "pilot", "يَقُودُ الطَّائِرَةَ", "المَطَارُ / الخُطُوطُ الجَوِّيَّةُ", "الطَّائِرَةُ", "طَيَّارُونَ", "طَيَّارَةٌ", ["uçak kullanır", "havaalanı / hava yolları", "uçak"]],
  ["شُرْطِيٌّ", "polis", "يُنَظِّمُ المُرُورَ", "الشَّارِعُ / المَخْفَرُ", "الصَّفَّارَةُ", "شُرْطِيُّونَ / شُرْطَةٌ", "شُرْطِيَّةٌ", ["trafiği düzenler", "cadde / karakol", "düdük"]],
  ["صَيْدَلَانِيٌّ", "eczacı", "يَبِيعُ الدَّوَاءَ لِلْمَرْضَى", "الصَّيْدَلِيَّةُ", "الدَّوَاءُ", "صَيَادِلَةٌ", "صَيْدَلَانِيَّةٌ", ["hastalara ilaç satar", "eczane", "ilaç"]],
  ["مُدَرِّسٌ", "öğretmen", "يُعَلِّمُ الطُّلَّابَ القِرَاءَةَ وَالكِتَابَةَ", "المَدْرَسَةُ", "الكِتَابُ وَالسَّبُّورَةُ", "مُدَرِّسُونَ", "مُدَرِّسَةٌ", ["öğrencilere okuma yazma öğretir", "okul", "kitap ve tahta"]],
  ["مُحَامٍ", "avukat", "يُدَافِعُ عَنِ النَّاسِ", "المَحْكَمَةُ", "القَانُونُ", "مُحَامُونَ", "مُحَامِيَةٌ", ["insanları savunur", "mahkeme", "kanun"]],
  ["خَبَّازٌ", "fırıncı", "يَصْنَعُ الخُبْزَ", "المَخْبَزُ", "الفُرْنُ", "خَبَّازُونَ", "خَبَّازَةٌ", ["ekmek yapar", "fırın (dükkân)", "fırın"]],
  ["خَيَّاطٌ", "terzi", "يَخِيطُ الثِّيَابَ", "مَحَلُّ الخِيَاطَةِ", "الإِبْرَةُ وَالمِقَصُّ", "خَيَّاطُونَ", "خَيَّاطَةٌ", ["elbise diker", "terzi dükkânı", "iğne ve makas"]],
  ["مُمَرِّضٌ", "hemşire", "يُسَاعِدُ الطَّبِيبَ وَيَعْتَنِي بِالمَرْضَى", "المُسْتَشْفَى", "الحُقْنَةُ", "مُمَرِّضُونَ", "مُمَرِّضَةٌ", ["doktora yardım eder, hastalara bakar", "hastane", "iğne (şırınga)"]],
  ["حَلَّاقٌ", "berber", "يَقُصُّ شَعْرَ النَّاسِ", "صَالُونُ الحِلَاقَةِ", "المِقَصُّ وَالمِرْآةُ", "حَلَّاقُونَ", "حَلَّاقَةٌ", ["insanların saçını keser", "berber salonu", "makas ve ayna"]],
  ["حَدَّادٌ", "demirci", "يَصْنَعُ الأَبْوَابَ مِنَ الحَدِيدِ", "وَرْشَةُ الحِدَادَةِ", "المِطْرَقَةُ", "حَدَّادُونَ", "—", ["demirden kapı yapar", "demirci atölyesi", "çekiç"]],
  ["صَحَفِيٌّ", "gazeteci", "يَكْتُبُ الأَخْبَارَ", "الجَرِيدَةُ", "القَلَمُ وَالحَاسُوبُ", "صَحَفِيُّونَ", "صَحَفِيَّةٌ", ["haber yazar", "gazete", "kalem ve bilgisayar"]]
];
var BAKIS = [["مَاذَا يَعْمَلُ؟", "Ne yapar?"], ["أَيْنَ يَعْمَلُ؟", "Nerede çalışır?"], ["مَا أَدَاتُهُ؟", "Aleti ne?"], ["مَا جَمْعُهُ؟", "Çoğulu?"], ["مَا مُؤَنَّثُهُ؟", "Kadını?"]];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
// Dört seçenekli: ilk seçenek doğru; sıra kaydırılır
function PL4(list) { return list.map(function (x, i) { var o = x[1], s = (i * 3 + 1) % o.length, r = o.slice(s).concat(o.slice(0, s)); return { q: x[0], o: r, a: r.indexOf(o[0]), tr: x[2], why: x[3] }; }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "مَرْيَمُ مِنْ سُورِيَةَ، تَسْكُنُ مَعَ عَائِلَتِهَا فِي مَدِينَةِ إِسْطَنْبُولَ، هِيَ طَالِبَةٌ فِي السَّنَةِ التَّحْضِيرِيَّةِ فِي كُلِّيَّةِ الاقْتِصَادِ فِي جَامِعَةِ مَرْمَرَةَ، وَالِدُهَا نَجَّارٌ فِي مَصْنَعِ المَفْرُوشَاتِ، يَعْمَلُ فِي اليَوْمِ تِسْعَ سَاعَاتٍ، هُوَ يُحِبُّ عَمَلَهُ كَثِيرًا، وَالِدَتُهَا طَبِيبَةٌ فِي المُسْتَشْفَى، هِيَ تَعْمَلُ فِي قِسْمِ النِّسَائِيَّةِ، يَبْدَأُ عَمَلُهَا السَّاعَةَ السَّابِعَةَ وَالنِّصْفَ صَبَاحًا، وَيَنْتَهِي السَّاعَةَ الثَّانِيَةَ بَعْدَ الظُّهْرِ. وَأَخُوهَا الكَبِيرُ طَيَّارٌ، هُوَ يَعْمَلُ فِي الخُطُوطِ الجَوِّيَّةِ التُّرْكِيَّةِ." +
  "<br>تَسْكُنُ مَرْيَمُ فِي حَيٍّ جَمِيلٍ وَهَادِئٍ، شَقَّتُهَا فِي الدَّوْرِ الرَّابِعِ، وَهِيَ مُطِلَّةٌ عَلَى البَحْرِ. جِيرَانُ مَرْيَمَ لَطِيفُونَ جِدًّا، الجَارُ فِي الطَّابِقِ الأَوَّلِ اسْمُهُ مُحَمَّدٌ، يَعْمَلُ شُرْطِيًّا لِلْمُرُورِ، أَمَّا زَوْجَتُهُ فَهِيَ رَبَّةُ بَيْتٍ. عِنْدَهُ بِنْتٌ وَوَلَدٌ: سُمَيَّةُ وَأَحْمَدُ، سُمَيَّةُ صَيْدَلَانِيَّةٌ، وَأَحْمَدُ طَالِبٌ فِي الثَّانَوِيَّةِ. وَجَارُهُمْ فِي الدَّوْرِ الثَّانِي اسْمُهُ سَالِمٌ، هُوَ مُتَقَاعِدٌ، لَهُ وَلَدٌ وَاحِدٌ اسْمُهُ مَازِنٌ، مَازِنٌ طَالِبٌ فِي المَرْحَلَةِ الابْتِدَائِيَّةِ، وَأُمُّ مَازِنٍ مُعَلِّمَةٌ تَعْمَلُ فِي مَدْرَسَةٍ قَرِيبَةٍ مِنَ البَيْتِ. وَجَارُهُمْ فِي الطَّابِقِ الثَّالِثِ اسْمُهُ قُصَيٌّ، هُوَ عِرَاقِيٌّ، اسْتَأْجَرَ شَقَّتَهُ قَبْلَ خَمْسِ سَنَوَاتٍ، هُوَ مُحَامٍ، زَوْجَتُهُ مُوَظَّفَةٌ فِي مَصْنَعِ الأَدْوِيَةِ، عِنْدَهُمَا وَلَدَانِ وَبِنْتَانِ: الوَلَدُ الأَوَّلُ طَالِبٌ يَدْرُسُ فِي كُلِّيَّةِ العُلُومِ، وَالثَّانِي خَبَّازٌ، بِنْتُهُ الأُولَى مُمَرِّضَةٌ، وَالثَّانِيَةُ خَيَّاطَةٌ.";
var METIN_TR = "Meryem Suriyelidir; ailesiyle İstanbul şehrinde oturuyor. Marmara Üniversitesi İktisat Fakültesinde hazırlık sınıfında öğrencidir. Babası mobilya fabrikasında marangozdur; günde dokuz saat çalışır ve işini çok sever. Annesi hastanede doktordur; kadın doğum bölümünde çalışır. İşi sabah yedi buçukta başlar, öğleden sonra saat ikide biter. Ağabeyi pilottur, Türk Hava Yollarında çalışır." +
  "<br>Meryem güzel ve sakin bir mahallede oturuyor; dairesi dördüncü kattadır ve denize bakar. Meryem’in komşuları çok naziktir. Birinci kattaki komşunun adı Muhammed’dir, trafik polisi olarak çalışır; eşi ise ev hanımıdır. Bir kızı ve bir oğlu var: Sümeyye ve Ahmed. Sümeyye eczacıdır, Ahmed lise öğrencisidir. İkinci kattaki komşularının adı Sâlim’dir, emeklidir; Mâzin adında tek bir oğlu var, Mâzin ilkokul öğrencisidir; Mâzin’in annesi eve yakın bir okulda çalışan bir öğretmendir. Üçüncü kattaki komşularının adı Kusay’dır, Iraklıdır; dairesini beş yıl önce kiralamıştır. Avukattır; eşi ilaç fabrikasında memurdur. İki oğulları ve iki kızları var: büyük oğul fen fakültesinde okuyan bir öğrenci, ikincisi fırıncı; büyük kızı hemşire, ikincisi terzidir.";
var SOZLUK = [["مِهْنَةٌ ج مِهَنٌ", "meslek"], ["نَجَّارٌ", "marangoz"], ["مَصْنَعُ المَفْرُوشَاتِ", "mobilya fabrikası"], ["قِسْمُ النِّسَائِيَّةِ", "kadın doğum bölümü"], ["طَيَّارٌ", "pilot"], ["الخُطُوطُ الجَوِّيَّةُ", "hava yolları"], ["حَيٌّ هَادِئٌ", "sakin mahalle"], ["شَقَّةٌ", "daire"], ["الدَّوْرُ / الطَّابِقُ", "kat"], ["جَارٌ ج جِيرَانٌ", "komşu"], ["شُرْطِيُّ المُرُورِ", "trafik polisi"], ["رَبَّةُ بَيْتٍ", "ev hanımı"], ["الثَّانَوِيَّةُ", "lise"], ["مُتَقَاعِدٌ", "emekli"], ["المَرْحَلَةُ الابْتِدَائِيَّةُ", "ilkokul"], ["اسْتَأْجَرَ", "kiraladı"], ["مُحَامٍ", "avukat"], ["مُوَظَّفَةٌ", "memur (kadın)"], ["خَبَّازٌ", "fırıncı"], ["مُمَرِّضَةٌ", "hemşire"], ["خَيَّاطَةٌ", "terzi (kadın)"]];

var EK_METIN = [
  ["النَّجَّارُ", "عَمِّي مَنْصُورٌ يَعْمَلُ نَجَّارًا، هُوَ نَجَّارٌ نَشِيطٌ، يَصْنَعُ الأَثَاثَ، كَالأَبْوَابِ وَالكَرَاسِيِّ وَالمَكَاتِبِ وَالطَّاوِلَاتِ. أَنَا أَحْتَرِمُ عَمِّي، لِأَنَّهُ يُقَدِّمُ خَدَمَاتٍ لِلْوَطَنِ وَالمُوَاطِنِينَ."],
  ["الحَدَّادُ", "وَقَفَ أَحْمَدُ وَزَمِيلُهُ أَمَامَ وَرْشَةِ الحِدَادَةِ، فَسَأَلَ أَحْمَدُ زَمِيلَهُ خَالِدًا: مَاذَا يَعْمَلُ هَذَا الرَّجُلُ؟ فَأَجَابَهُ: هُوَ يَصْنَعُ أَبْوَابًا مِنَ الحَدِيدِ لِلْمَنَازِلِ وَالمَحَلَّاتِ التِّجَارِيَّةِ وَالحَدَائِقِ العَامَّةِ… فَالحَدَّادُ مِثْلُ النَّجَّارِ؛ فَالنَّجَّارُ يَصْنَعُ أَبْوَابًا مِنَ الخَشَبِ، وَالحَدَّادُ يَصْنَعُ أَبْوَابًا مِنَ الحَدِيدِ."],
  ["الصَّائِغُ", "ذَهَبَتِ الأُمُّ إِلَى السُّوقِ، فَاشْتَرَتْ مِنَ الصَّائِغِ عِقْدًا مِنَ الفِضَّةِ وَقَدَّمَتْهُ لِبِنْتِهَا، وَقَالَتْ لَهَا: هَذَا الصَّائِغُ يَصْنَعُ أَشْيَاءَ كَثِيرَةً مِنَ الذَّهَبِ وَالفِضَّةِ، مِثْلَ: الخَوَاتِمِ وَالأَسَاوِرِ وَالعُقُودِ."],
  ["عَامِلُ النَّظَافَةِ", "شَوَارِعُنَا نَظِيفَةٌ، وَهَذَا بِفَضْلِ عَامِلِ النَّظَافَةِ، إِنَّهُ رَجُلٌ نَشِيطٌ، يَسْتَيْقِظُ كُلَّ صَبَاحٍ، يَكْنُسُ الشَّوَارِعَ، وَيَجْمَعُ القُمَامَةَ، وَيَضَعُهَا فِي صُنْدُوقِ القُمَامَةِ (الحَاوِيَةِ)، فَهُوَ يُحَافِظُ عَلَى صِحَّتِنَا، وَوَاجِبُنَا جَمِيعًا أَنْ نُحَافِظَ عَلَى النَّظَافَةِ."],
  ["الصَّحَفِيُّ", "مُحَمَّدٌ صَحَفِيٌّ يَعْمَلُ فِي جَرِيدَةٍ يَوْمِيَّةٍ اسْمُهَا «الغَدُ». هُوَ يَكْتُبُ الأَخْبَارَ الجَدِيدَةَ فِي السِّيَاسَةِ، يُسَافِرُ مُحَمَّدٌ إِلَى كُلِّ مَكَانٍ لِيَبْحَثَ عَنِ الأَخْبَارِ المُهِمَّةِ."]
];
var EK_TR = "<b>Marangoz:</b> Amcam Mansûr marangozdur; çalışkan bir marangozdur, kapı, sandalye, çalışma masası ve masa gibi mobilyalar yapar. Amcama saygı duyarım, çünkü vatana ve vatandaşlara hizmet ediyor." +
  "<br><b>Demirci:</b> Ahmed ve arkadaşı demirci atölyesinin önünde durdular. Ahmed arkadaşı Hâlid’e: “Bu adam ne iş yapıyor?” diye sordu. O da: “Evler, dükkânlar ve parklar için demirden kapılar yapıyor… Demirci marangoz gibidir; marangoz tahtadan, demirci demirden kapı yapar” dedi." +
  "<br><b>Kuyumcu:</b> Anne çarşıya gitti, kuyumcudan gümüş bir kolye alıp kızına verdi ve dedi ki: “Bu kuyumcu altından ve gümüşten yüzük, bilezik, kolye gibi birçok şey yapar.”" +
  "<br><b>Temizlik işçisi:</b> Sokaklarımız temiz; bu, temizlik işçisi sayesindedir. O çalışkan bir adamdır; her sabah uyanır, sokakları süpürür, çöpleri toplar ve çöp kutusuna (konteynere) koyar. Böylece sağlığımızı korur; temizliği korumak hepimizin görevidir." +
  "<br><b>Gazeteci:</b> Muhammed, adı “el-Ğad” (Yarın) olan günlük bir gazetede çalışan bir gazetecidir. Siyasetle ilgili yeni haberleri yazar; önemli haberleri araştırmak için her yere gider.";
var NEBI_METIN = "العَمَلُ ضَرُورِيٌّ لِكُلِّ إِنْسَانٍ، وَهُوَ وَسِيلَةٌ لِيَحْصُلَ الإِنْسَانُ عَلَى احْتِيَاجَاتِهِ مِنَ الغِذَاءِ وَالكِسَاءِ وَالدَّوَاءِ وَالسَّكَنِ وَغَيْرِهَا. وَلِلْعَمَلِ مَنْزِلَةٌ كَبِيرَةٌ فِي الإِسْلَامِ، ذَكَرَهُ اللهُ فِي القُرْآنِ الكَرِيمِ، وَشَجَّعَ عَلَيْهِ النَّبِيُّ مُحَمَّدٌ ﷺ، وَهُوَ كَالعِبَادَةِ لِدَوْرِهِ الكَبِيرِ فِي بِنَاءِ المُجْتَمَعِ." +
  "<br>أَنْبِيَاءُ اللهِ قُدْوَةٌ لِلنَّاسِ عَلَى الأَرْضِ، وَكَانَ العَمَلُ مِنْ صِفَاتِهِمْ، وَقَدْ مَارَسَ الأَنْبِيَاءُ أَعْمَالًا مُخْتَلِفَةً، فَمَثَلًا نَبِيُّ اللهِ إِدْرِيسُ عَلَيْهِ السَّلَامُ كَانَ يَعْمَلُ فِي خِيَاطَةِ الثِّيَابِ، وَالنَّاسُ قَبْلَ ذَلِكَ كَانُوا يَلْبَسُونَ جُلُودَ الحَيَوَانَاتِ، قَالَ تَعَالَى: ﴿وَعَلَّمْنَاهُ صَنْعَةَ لَبُوسٍ لَكُمْ…﴾، وَنَبِيُّ اللهِ نُوحٌ عَلَيْهِ السَّلَامُ كَانَ يَعْمَلُ بِالنِّجَارَةِ فَصَنَعَ سَفِينَتَهُ المَشْهُورَةَ، وَهِيَ مُعْجِزَتُهُ، قَالَ تَعَالَى: ﴿فَأَوْحَيْنَا إِلَيْهِ أَنِ اصْنَعِ الفُلْكَ بِأَعْيُنِنَا…﴾، وَنَبِيُّ اللهِ دَاوُدُ عَلَيْهِ السَّلَامُ عَمِلَ فِي الحِدَادَةِ، وَهِيَ مُعْجِزَتُهُ فَصَنَعَ الدُّرُوعَ وَالأَسْلِحَةَ. وَمُوسَى عَلَيْهِ السَّلَامُ كَانَ رَاعِيًا لِلْغَنَمِ عَشْرَ سَنَوَاتٍ عِنْدَ نَبِيِّ اللهِ شُعَيْبٍ. وَعَمِلَ أَبُو البَشَرِ آدَمُ عَلَيْهِ السَّلَامُ فِي الزِّرَاعَةِ، وَيَعْقُوبُ عَلَيْهِ السَّلَامُ فِي الرَّعْيِ، وَعَمِلَ يُوسُفُ عَلَيْهِ السَّلَامُ وَزِيرًا عَلَى خَزَائِنِ مِصْرَ، وَعَمِلَ سَيِّدُ الخَلْقِ نَبِيُّنَا مُحَمَّدٌ ﷺ بِرَعْيِ الأَغْنَامِ فِي صِغَرِهِ. قَالَ رَسُولُ اللهِ ﷺ: «مَا بُعِثَ نَبِيٌّ إِلَّا رَعَى الغَنَمَ». فَكُلُّ الأَنْبِيَاءِ عَمِلُوا فِي رَعْيِ الأَغْنَامِ، وَهِيَ مِهْنَةٌ شَرِيفَةٌ تُعَلِّمُ الإِنْسَانَ الصَّبْرَ وَالتَّفْكِيرَ فِي الحَيَاةِ. وَعَمِلَ أَيْضًا نَبِيُّنَا ﷺ فِي شَبَابِهِ بِالتِّجَارَةِ." +
  "<br>وَأَخِيرًا طَلَبُ الرِّزْقِ خَيْرٌ مِنَ الجُلُوسِ بِلَا عَمَلٍ، لِأَنَّ الفَرَاغَ سَبَبٌ لِكَثِيرٍ مِنَ المَشَاكِلِ المَادِّيَّةِ وَالمَعْنَوِيَّةِ." +
  "<br>﴿وَقُلِ اعْمَلُوا فَسَيَرَى اللهُ عَمَلَكُمْ وَرَسُولُهُ وَالمُؤْمِنُونَ وَسَتُرَدُّونَ إِلَى عَالِمِ الغَيْبِ وَالشَّهَادَةِ فَيُنَبِّئُكُمْ بِمَا كُنْتُمْ تَعْمَلُونَ﴾ (التَّوْبَةُ: ١٠٥)";
var NEBI_TR = "Çalışmak her insan için zorunludur; insanın yiyecek, giyecek, ilaç, mesken gibi ihtiyaçlarını elde etmesinin aracıdır. İslâm’da çalışmanın büyük bir yeri vardır: Allah onu Kur’an’da anmış, Peygamberimiz (s.a.v.) teşvik etmiştir; toplumun inşasındaki büyük rolü sebebiyle ibadet gibidir." +
  "<br>Allah’ın peygamberleri yeryüzünde insanlara örnektir; çalışmak onların sıfatlarındandı. Peygamberler farklı işler yaptılar: İdrîs (a.s.) elbise dikerdi; ondan önce insanlar hayvan derisi giyerdi (“Ona sizin için zırh yapmayı öğrettik…”). Nûh (a.s.) marangozluk yaptı ve meşhur gemisini yaptı; bu onun mucizesiydi (“Ona: Gözlerimizin önünde gemiyi yap, diye vahyettik…”). Dâvûd (a.s.) demircilik yaptı; zırhlar ve silahlar yapması onun mucizesiydi. Mûsâ (a.s.) Şuayb (a.s.)’ın yanında on yıl koyun güttü. İnsanlığın babası Âdem (a.s.) çiftçilik, Ya’kûb (a.s.) çobanlık yaptı; Yûsuf (a.s.) Mısır hazinelerine vezir oldu. Yaratılmışların efendisi Peygamberimiz (s.a.v.) küçüklüğünde koyun güttü. Resûlullah (s.a.v.): “Koyun gütmemiş hiçbir peygamber gönderilmedi” buyurdu. Çobanlık insana sabrı ve hayatı düşünmeyi öğreten şerefli bir meslektir. Peygamberimiz gençliğinde ticaret de yaptı." +
  "<br>Son olarak, rızık peşinde koşmak işsiz oturmaktan hayırlıdır; çünkü boşluk birçok maddi ve manevi sorunun sebebidir. “De ki: Çalışın! Allah, Resûlü ve müminler amelinizi görecektir…” (Tevbe 105)";

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendini ve aileni düşünmek: ne iş yapıyorsun, annenin babanın mesleği ne", "Meryem’in ailesini ve komşularını anlatan metni durmadan okumak ve dinlemek", "Meslek ve iş yeri kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "وَالِدُهَا:mz / نَجَّارٌ:nasb / فِي مَصْنَعِ المَفْرُوشَاتِ.:cerr", tr: "Babası mobilya fabrikasında marangoz.", pair: "وَالِدَتُهَا:mz / طَبِيبَةٌ:nasb / فِي المُسْتَشْفَى.:cerr", pairTr: "Annesi hastanede doktor." },
    { s: "مُحَمَّدٌ:mz / يَعْمَلُ:- / شُرْطِيًّا:nasb.Meslek (mansûb) / لِلْمُرُورِ.:-", tr: "Muhammed trafik polisi olarak çalışıyor." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> İstanbul’da oturan Suriyeli Meryem’in ailesi (marangoz baba, doktor anne, pilot ağabey) ve apartmandaki üç komşu ailenin meslekleri." },
    { tr: "<b>Mesleği söyleme kalıpları:</b><br>• <span class=\"ar\">هُوَ نَجَّارٌ · هِيَ طَبِيبَةٌ</span> o marangoz / doktor<br>• <span class=\"ar\">يَعْمَلُ شُرْطِيًّا · تَعْمَلُ مُدَرِّسَةً</span> polis / öğretmen olarak çalışır (meslek mansûb)<br>• <span class=\"ar\">يَعْمَلُ فِي…</span> …-de çalışır · <span class=\"ar\">مَا مِهْنَتُكَ؟</span> mesleğin ne?" },
    { tr: "<b>Erkek ve kadın meslek adı:</b> çoğu meslek <span class=\"ar\">ـةٌ</span> ile dişil olur: <span class=\"ar\">طَبِيبٌ ← طَبِيبَةٌ · مُمَرِّضٌ ← مُمَرِّضَةٌ · خَيَّاطٌ ← خَيَّاطَةٌ · صَيْدَلَانِيٌّ ← صَيْدَلَانِيَّةٌ</span>. <span class=\"ar\">مُحَامٍ</span> (avukat) → <span class=\"ar\">مُحَامِيَةٌ</span>." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: مَاذَا تَعْمَلُ / تَعْمَلِينَ؟ أَيْنَ تَعْمَلُ / تَعْمَلِينَ؟ مَا مِهْنَةُ وَالِدِكَ وَوَالِدَتِكَ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "المِهَنُ وَالأَعْمَالُ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "مَاذَا تَعْمَلُ / تَعْمَلِينَ؟", a: "أَنَا طَالِبٌ فِي السَّنَةِ التَّحْضِيرِيَّةِ.", tr: "Ne iş yapıyorsun? (Örnek cevap) Hazırlık sınıfında öğrenciyim." },
        { q: "أَيْنَ تَعْمَلُ / تَعْمَلِينَ؟", a: "أَدْرُسُ فِي جَامِعَةِ مَرْمَرَةَ.", tr: "Nerede çalışıyorsun? Marmara Üniversitesinde okuyorum." },
        { q: "مَا مِهْنَةُ وَالِدِكَ وَوَالِدَتِكَ؟", a: "وَالِدِي مُهَنْدِسٌ، وَوَالِدَتِي مُعَلِّمَةٌ.", tr: "Annenin ve babanın mesleği ne? Babam mühendis, annem öğretmen." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "مَرْيَمُ مِنْ تُرْكِيَا.", a: "y", why: "Suriyeli: مِنْ سُورِيَةَ; İstanbul’da oturuyor." },
        { s: "مَرْيَمُ طَالِبَةٌ فِي كُلِّيَّةِ الاقْتِصَادِ.", a: "d", why: "فِي السَّنَةِ التَّحْضِيرِيَّةِ فِي كُلِّيَّةِ الاقْتِصَادِ." },
        { s: "يُحِبُّ وَالِدُ مَرْيَمَ عَمَلَهُ كَثِيرًا.", a: "d", why: "هُوَ يُحِبُّ عَمَلَهُ كَثِيرًا." },
        { s: "تَعْمَلُ وَالِدَةُ مَرْيَمَ فِي قِسْمِ النِّسَائِيَّةِ.", a: "d", why: "Metinde aynen geçer." },
        { s: "يَنْتَهِي عَمَلُ وَالِدَتِهَا السَّاعَةَ الخَامِسَةَ.", a: "y", why: "Saat ikide biter: السَّاعَةَ الثَّانِيَةَ بَعْدَ الظُّهْرِ." },
        { s: "الحَيُّ الَّذِي تَسْكُنُ فِيهِ مَرْيَمُ مُزْعِجٌ.", a: "y", why: "Sakin: حَيٍّ جَمِيلٍ وَهَادِئٍ." },
        { s: "جِيرَانُ مَرْيَمَ لَطِيفُونَ.", a: "d", why: "جِيرَانُ مَرْيَمَ لَطِيفُونَ جِدًّا." },
        { s: "زَوْجَةُ مُحَمَّدٍ مُعَلِّمَةٌ.", a: "y", why: "Ev hanımı: رَبَّةُ بَيْتٍ. Öğretmen olan Mâzin’in annesi." },
        { s: "سَالِمٌ مُتَقَاعِدٌ.", a: "d", why: "هُوَ مُتَقَاعِدٌ." },
        { s: "مَازِنٌ طَالِبٌ فِي الجَامِعَةِ.", a: "y", why: "İlkokulda: فِي المَرْحَلَةِ الابْتِدَائِيَّةِ." },
        { s: "قُصَيٌّ مُحَامٍ عِرَاقِيٌّ.", a: "d", why: "هُوَ عِرَاقِيٌّ… هُوَ مُحَامٍ." },
        { s: "زَوْجَةُ قُصَيٍّ تَعْمَلُ فِي مَصْنَعِ الأَدْوِيَةِ.", a: "d", why: "مُوَظَّفَةٌ فِي مَصْنَعِ الأَدْوِيَةِ." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("وَالِدُهَا نَجَّارٌ", "نَجَّارٌ"), "marangoz", "demirci", "fırıncı", "Babası marangoz.", "نِجَارَةٌ: marangozluk."],
      [HL("فِي مَصْنَعِ المَفْرُوشَاتِ", "مَصْنَعِ"), "fabrika", "dükkân", "okul", "Mobilya fabrikasında.", "= مَعْمَلٌ"],
      [HL("فِي مَصْنَعِ المَفْرُوشَاتِ", "المَفْرُوشَاتِ"), "mobilya", "elbise", "ilaç", "Mobilya fabrikası.", "= الأَثَاثُ"],
      [HL("وَأَخُوهَا الكَبِيرُ طَيَّارٌ", "طَيَّارٌ"), "pilot", "şoför", "denizci", "Ağabeyi pilot.", "طَائِرَةٌ: uçak."],
      [HL("فِي حَيٍّ جَمِيلٍ وَهَادِئٍ", "هَادِئٍ"), "sakin", "kalabalık", "eski", "Güzel ve sakin bir mahallede.", "هُدُوءٌ: sükûnet."],
      [HL("شَقَّتُهَا فِي الدَّوْرِ الرَّابِعِ", "شَقَّتُهَا"), "dairesi", "odası", "evi (müstakil)", "Dairesi dördüncü katta.", "Çoğulu: شُقَقٌ."],
      [HL("جِيرَانُ مَرْيَمَ لَطِيفُونَ", "جِيرَانُ"), "komşular", "akrabalar", "arkadaşlar", "Meryem’in komşuları.", "Tekili: جَارٌ."],
      [HL("يَعْمَلُ شُرْطِيًّا لِلْمُرُورِ", "لِلْمُرُورِ"), "trafik", "şehir", "okul", "Trafik polisi olarak.", ""],
      [HL("فَهِيَ رَبَّةُ بَيْتٍ", "رَبَّةُ بَيْتٍ"), "ev hanımı", "öğretmen", "hemşire", "O ev hanımıdır.", ""],
      [HL("هُوَ مُتَقَاعِدٌ", "مُتَقَاعِدٌ"), "emekli", "öğrenci", "işsiz genç", "O emeklidir.", "تَقَاعُدٌ: emeklilik."],
      [HL("اسْتَأْجَرَ شَقَّتَهُ", "اسْتَأْجَرَ"), "kiraladı", "sattı", "yaptı", "Dairesini kiraladı.", "أُجْرَةٌ: kira, ücret."],
      [HL("بِنْتُهُ الأُولَى مُمَرِّضَةٌ", "مُمَرِّضَةٌ"), "hemşire", "terzi", "eczacı", "Büyük kızı hemşire.", "مَرِيضٌ: hasta."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama: Meryem ve Komşuları", short: "Anlama", col: "nasb", legend: ["mz", "nasb"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak ve düzeltmek", "Doğru cevabı seçmek", "Apartmandaki her kişinin mesleğini bilmek"],
  examples: [
    { s: "مَا مِهْنَةُ:- / وَالِدَةِ مَرْيَمَ؟:mz", tr: "Meryem’in annesinin mesleği ne?", pair: "هِيَ:- / طَبِيبَةٌ.:nasb", pairTr: "Doktor." },
    { s: "كَمْ جَارًا:- / لِلْعَائِلَةِ فِي البِنَاءِ؟:mz", tr: "Ailenin binada kaç komşusu var?", pair: "ثَلَاثَةُ جِيرَانٍ:nasb / مُحَمَّدٌ وَسَالِمٌ وَقُصَيٌّ.:mz", pairTr: "Üç komşu: Muhammed, Sâlim ve Kusay." }
  ],
  rules: [
    { tr: "<b>Apartman</b> (<span class=\"ar\">البِنَاءُ</span>): 1. kat <span class=\"ar\">مُحَمَّدٌ</span> (trafik polisi) · 2. kat <span class=\"ar\">سَالِمٌ</span> (emekli) · 3. kat <span class=\"ar\">قُصَيٌّ</span> (avukat) · 4. kat <span class=\"ar\">مَرْيَمُ</span> ve ailesi." },
    { tr: "<span class=\"ar\">الدَّوْرُ = الطَّابِقُ</span> kat. Sıra sayıları: <span class=\"ar\">الأَوَّلُ، الثَّانِي، الثَّالِثُ، الرَّابِعُ</span>; dişil: <span class=\"ar\">الأُولَى، الثَّانِيَةُ</span> (<span class=\"ar\">بِنْتُهُ الأُولَى</span>)." },
    { tr: "<b>Dikkat:</b> Annenin işi 7.30–14.00 arasıdır, yani yaklaşık altı buçuk saat; dokuz saat çalışan babadır." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مَاذَا يَعْمَلُ وَالِدُ مَرْيَمَ؟ مَا مِهْنَةُ وَالِدَةِ مَرْيَمَ؟ فِي أَيِّ طَابِقٍ تَسْكُنُ مَرْيَمُ؟ مَنْ يَعْمَلُ فِي الخُطُوطِ الجَوِّيَّةِ التُّرْكِيَّةِ؟ كَمْ جَارًا لِلْعَائِلَةِ فِي البِنَاءِ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ. ٣ ـ اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مَاذَا يَعْمَلُ وَالِدُ مَرْيَمَ؟", "هُوَ نَجَّارٌ فِي مَصْنَعِ المَفْرُوشَاتِ.", "هُوَ طَيَّارٌ.", "هُوَ شُرْطِيٌّ لِلْمُرُورِ.", "Meryem’in babası ne iş yapıyor? Mobilya fabrikasında marangoz.", ""],
      ["مَا مِهْنَةُ وَالِدَةِ مَرْيَمَ؟", "طَبِيبَةٌ فِي المُسْتَشْفَى.", "مُعَلِّمَةٌ.", "رَبَّةُ بَيْتٍ.", "Annesinin mesleği ne? Hastanede doktor.", "قِسْمُ النِّسَائِيَّةِ."],
      ["فِي أَيِّ طَابِقٍ تَسْكُنُ مَرْيَمُ؟", "فِي الطَّابِقِ (الدَّوْرِ) الرَّابِعِ.", "فِي الطَّابِقِ الأَوَّلِ.", "فِي الطَّابِقِ الثَّالِثِ.", "Meryem hangi katta oturuyor? Dördüncü katta.", "شَقَّتُهَا فِي الدَّوْرِ الرَّابِعِ."],
      ["مَنْ يَعْمَلُ فِي الخُطُوطِ الجَوِّيَّةِ التُّرْكِيَّةِ؟", "أَخُو مَرْيَمَ الكَبِيرُ.", "وَالِدُ مَرْيَمَ.", "قُصَيٌّ.", "Türk Hava Yollarında kim çalışıyor? Ağabeyi.", "وَأَخُوهَا الكَبِيرُ طَيَّارٌ."],
      ["كَمْ جَارًا لِلْعَائِلَةِ فِي البِنَاءِ؟", "ثَلَاثَةُ جِيرَانٍ.", "جَارَانِ.", "خَمْسَةُ جِيرَانٍ.", "Binada kaç komşusu var? Üç.", "مُحَمَّدٌ (١)، سَالِمٌ (٢)، قُصَيٌّ (٣)."]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ الجُمَلِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)?", items: CL([
      ["تَعْمَلُ وَالِدَةُ مَرْيَمَ سَبْعَ سَاعَاتٍ فِي اليَوْمِ.", "y", "7.30–14.00: altı buçuk saat. (Dokuz saat çalışan babası.)"],
      ["تَسْكُنُ مَرْيَمُ فِي مَدِينَةٍ سَاحِلِيَّةٍ.", "d", "İstanbul deniz kıyısında; dairesi denize bakıyor."],
      ["عَائِلَةُ مَرْيَمَ تَعِيشُ فِي بَيْتٍ مُسْتَقِلٍّ.", "y", "Apartman dairesinde: شَقَّتُهَا فِي الدَّوْرِ الرَّابِعِ."],
      ["وَالِدُ مَرْيَمَ طَبِيبٌ.", "y", "Marangoz: نَجَّارٌ; doktor olan annesi."],
      ["بِنْتُ الجَارِ العِرَاقِيِّ خَيَّاطَةٌ.", "d", "وَالثَّانِيَةُ خَيَّاطَةٌ."]
    ]) },
    { type: "pick", extra: true, ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["تَعْمَلُ وَالِدَةُ مَرْيَمَ سَبْعَ سَاعَاتٍ. ✗", "يَعْمَلُ وَالِدُ مَرْيَمَ تِسْعَ سَاعَاتٍ، وَوَالِدَتُهَا مِنَ السَّابِعَةِ وَالنِّصْفِ إِلَى الثَّانِيَةِ.", "تَعْمَلُ وَالِدَةُ مَرْيَمَ عَشْرَ سَاعَاتٍ.", "لَا تَعْمَلُ وَالِدَةُ مَرْيَمَ.", "Babası dokuz saat; annesi 7.30–14.00.", ""],
      ["عَائِلَةُ مَرْيَمَ تَعِيشُ فِي بَيْتٍ مُسْتَقِلٍّ. ✗", "عَائِلَةُ مَرْيَمَ تَعِيشُ فِي شَقَّةٍ فِي الدَّوْرِ الرَّابِعِ.", "عَائِلَةُ مَرْيَمَ تَعِيشُ فِي قَرْيَةٍ.", "عَائِلَةُ مَرْيَمَ تَعِيشُ فِي الطَّابِقِ الأَوَّلِ.", "Meryem’in ailesi dördüncü kattaki bir dairede oturuyor.", "مُسْتَقِلٌّ: müstakil."],
      ["وَالِدُ مَرْيَمَ طَبِيبٌ. ✗", "وَالِدُ مَرْيَمَ نَجَّارٌ.", "وَالِدُ مَرْيَمَ طَيَّارٌ.", "وَالِدُ مَرْيَمَ مُحَامٍ.", "Meryem’in babası marangoz.", ""]
    ])},
    { type: "pick", fill: true, num: "٣", ar: "اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ", tr: "Kitaptaki seçeneklerden doğrusunu seç.", items: PL([
      ["مَرْيَمُ طَالِبَةٌ فِي كُلِّيَّةِ ___.", "الاقْتِصَادِ", "الحُقُوقِ", "التَّرْبِيَةِ", "Meryem iktisat fakültesinde öğrenci.", ""],
      ["يَعْمَلُ وَالِدُ مَرْيَمَ ___ فِي اليَوْمِ.", "٩ سَاعَاتٍ", "٨ سَاعَاتٍ", "١٠ سَاعَاتٍ", "Meryem’in babası günde 9 saat çalışıyor.", "تِسْعَ سَاعَاتٍ."],
      ["جَارُ مَرْيَمَ العِرَاقِيُّ ___.", "مُحَامٍ", "مُهَنْدِسٌ", "مُعَلِّمٌ", "Meryem’in Iraklı komşusu avukat.", "قُصَيٌّ."],
      ["أَخُو مَرْيَمَ يَعْمَلُ ___.", "طَيَّارًا", "صَيْدَلَانِيًّا", "شُرْطِيًّا", "Meryem’in ağabeyi pilot olarak çalışıyor.", "يَعْمَلُ + meslek mansûb: طَيَّارًا."]
    ])},
    { type: "pick", extra: true, ar: "مَا مِهْنَتُهُ؟ مَا مِهْنَتُهَا؟", tr: "Metne göre bu kişinin mesleğini seç.", items: PL([
      ["مُحَمَّدٌ (الطَّابِقُ الأَوَّلُ)", "شُرْطِيٌّ لِلْمُرُورِ", "مُحَامٍ", "نَجَّارٌ", "Muhammed: trafik polisi.", ""],
      ["سُمَيَّةُ بِنْتُ مُحَمَّدٍ", "صَيْدَلَانِيَّةٌ", "مُمَرِّضَةٌ", "خَيَّاطَةٌ", "Sümeyye: eczacı.", ""],
      ["أَحْمَدُ بْنُ مُحَمَّدٍ", "طَالِبٌ فِي الثَّانَوِيَّةِ", "طَالِبٌ فِي كُلِّيَّةِ العُلُومِ", "خَبَّازٌ", "Ahmed: lise öğrencisi.", ""],
      ["سَالِمٌ (الدَّوْرُ الثَّانِي)", "مُتَقَاعِدٌ", "طَبِيبٌ", "شُرْطِيٌّ", "Sâlim: emekli.", ""],
      ["أُمُّ مَازِنٍ", "مُعَلِّمَةٌ", "رَبَّةُ بَيْتٍ", "طَبِيبَةٌ", "Mâzin’in annesi: öğretmen.", "تَعْمَلُ فِي مَدْرَسَةٍ قَرِيبَةٍ مِنَ البَيْتِ."],
      ["زَوْجَةُ قُصَيٍّ", "مُوَظَّفَةٌ فِي مَصْنَعِ الأَدْوِيَةِ", "صَيْدَلَانِيَّةٌ", "رَبَّةُ بَيْتٍ", "Kusay’ın eşi: ilaç fabrikasında memur.", ""],
      ["ابْنُ قُصَيٍّ الثَّانِي", "خَبَّازٌ", "طَالِبٌ", "طَيَّارٌ", "Kusay’ın ikinci oğlu: fırıncı.", "Birinci oğlu fen fakültesinde öğrenci."],
      ["بِنْتُ قُصَيٍّ الأُولَى", "مُمَرِّضَةٌ", "خَيَّاطَةٌ", "مُعَلِّمَةٌ", "Kusay’ın büyük kızı: hemşire.", "İkinci kızı terzi."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ: المِهَنُ", tr: "Kelimeler: Meslekler, Eş ve Zıt Anlam", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Mesleği anlatan cümlelerde boşluk doldurmak", "Kelimeleri eş ve zıt anlamlılarıyla eşleştirmek", "Bir mesleğe uymayan kelimeyi bulmak", "Mesleği tanımlamak: هُوَ الَّذِي…"],
  examples: [
    { s: "الإِسْكَافِيُّ:nasb / هُوَ الَّذِي:- / يَصْنَعُ الأَحْذِيَةَ وَيُصْلِحُهَا.:mi", tr: "Ayakkabıcı, ayakkabı yapan ve onaran kişidir." },
    { s: "مَصْنَعٌ:mz.Kelime / = مَعْمَلٌ:nasb.Eş", tr: "fabrika = fabrika", pair: "نِسَائِيٌّ:mz.Kelime / ≠ رِجَالِيٌّ:cerr.Zıt", pairTr: "kadınlara ait ≠ erkeklere ait" }
  ],
  rules: [
    { tr: "<b>Tanım kalıbı:</b> <span class=\"ar\">… هُوَ الَّذِي يَـ…</span> “… -en kişidir”: <span class=\"ar\">الخَبَّازُ هُوَ الَّذِي يَصْنَعُ الخُبْزَ</span>. Kadın için <span class=\"ar\">هِيَ الَّتِي تَـ…</span>." },
    { tr: "<b>فَعَّالٌ kalıbı</b> çoğu zaman meslek bildirir: <span class=\"ar\">نَجَّارٌ، خَبَّازٌ، خَيَّاطٌ، حَلَّاقٌ، جَزَّارٌ، بَنَّاءٌ، عَطَّارٌ، طَيَّارٌ، حَدَّادٌ، حَمَّالٌ</span>." },
    { tr: "<b>Eş anlam:</b> <span class=\"ar\">تَسْكُنُ = تَعِيشُ · عَائِلَةٌ = أُسْرَةٌ · وَالِدٌ = أَبٌ · مَصْنَعٌ = مَعْمَلٌ · دَوْرٌ = طَابِقٌ · مُطِلٌّ = مُشْرِفٌ</span>. <b>Zıt anlam:</b> <span class=\"ar\">قَرِيبٌ ≠ بَعِيدٌ · يُحِبُّ ≠ يَكْرَهُ · نِسَائِيٌّ ≠ رِجَالِيٌّ · يَبْدَأُ ≠ يَنْتَهِي · صَغِيرٌ ≠ كَبِيرٌ</span>." }
  ],
  kaide: ["٤ ـ امْلَإِ الفَرَاغَاتِ بِالكَلِمَاتِ المُنَاسِبَةِ: (المِقَصِّ، المُسْتَشْفَى، مُدَرِّسٌ، الدَّوَاءَ، القِرَاءَةَ، طَبِيبٌ، بِلَادٍ، الكِتَابَةَ، أُعَالِجُ، صَيْدَلَانِيَّةٌ، حَلَّاقٌ، طَيَّارٌ).", "٥ ـ صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا. ٦ ـ صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا. ٧ ـ ضَعْ خَطًّا تَحْتَ الكَلِمَةِ غَيْرِ المُنَاسِبَةِ. ٨ ـ أَكْمِلْ كَمَا فِي المِثَالِ: الإِسْكَافِيُّ: هُوَ الَّذِي يَصْنَعُ الأَحْذِيَةَ وَيُصْلِحُهَا."],
  ex: [
    { type: "bank", num: "٤", ar: "امْلَإِ الفَرَاغَاتِ بِالكَلِمَاتِ المُنَاسِبَةِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. Her kelime bir kez kullanılır.", bank: ["المِقَصِّ", "المُسْتَشْفَى", "مُدَرِّسٌ", "الدَّوَاءَ", "القِرَاءَةَ", "طَبِيبٌ", "بِلَادٍ", "الكِتَابَةَ", "أُعَالِجُ", "صَيْدَلَانِيَّةٌ", "حَلَّاقٌ", "طَيَّارٌ"],
      tr2: "1) Ben öğretmenim, öğrencilere okuma ve yazma öğretirim. 2) Ben berberim, insanların saçını makasla keserim. 3) Ben doktorum, hastanede çalışır ve hastaları tedavi ederim. 4) Ben pilotum, uzak ülkelere uçarım. 5) Ben eczacıyım, hastalara ilaç satarım.",
      parts: ["١ ـ أَنَا", { a: [2] }, "أُعَلِّمُ الطُّلَّابَ", { a: [4, 7] }, "وَ", { a: [4, 7] }, ".<br>٢ ـ أَنَا", { a: [10] }, "، أَقُصُّ شَعْرَ النَّاسِ بِـ", { a: [0] }, ".<br>٣ ـ أَنَا", { a: [5] }, "، أَعْمَلُ فِي", { a: [1] }, "وَ", { a: [8] }, "المَرْضَى.<br>٤ ـ أَنَا", { a: [11] }, "، أُسَافِرُ إِلَى", { a: [6] }, "بَعِيدَةٍ.<br>٥ ـ أَنَا", { a: [9] }, "، أَبِيعُ", { a: [3] }, "لِلْمَرْضَى."] },
    { type: "bank", num: "٥", ar: "صِلْ بَيْنَ الكَلِمَةِ وَمُرَادِفِهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan eş anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["طَابِقٌ", "تَعِيشُ", "أُسْرَةٌ", "مَعْمَلٌ", "مُشْرِفٌ", "أَبٌ"], items: [
      { pre: "تَسْكُنُ =", a: [1], tr: "oturur = yaşar" }, { pre: "عَائِلَةٌ =", a: [2], tr: "aile = aile" }, { pre: "وَالِدٌ =", a: [5], tr: "baba = baba" }, { pre: "مَصْنَعٌ =", a: [3], tr: "fabrika = fabrika" }, { pre: "دَوْرٌ =", a: [0], tr: "kat = kat" }, { pre: "مُطِلٌّ =", a: [4], tr: "bakan, nazır = yukarıdan bakan" }
    ]},
    { type: "bank", num: "٦", ar: "صِلْ بَيْنَ الكَلِمَةِ وَضِدِّهَا فِيمَا يَأْتِي", tr: "Önce aşağıdan zıt anlamlıyı seç, sonra kelimenin kutusuna dokun.", bank: ["يَكْرَهُ", "يَنْتَهِي", "بَعِيدٌ", "كَبِيرٌ", "رِجَالِيٌّ"], items: [
      { pre: "قَرِيبٌ ≠", a: [2], tr: "yakın ≠ uzak" }, { pre: "يُحِبُّ ≠", a: [0], tr: "sever ≠ nefret eder" }, { pre: "نِسَائِيٌّ ≠", a: [4], tr: "kadınlara ait ≠ erkeklere ait" }, { pre: "يَبْدَأُ ≠", a: [1], tr: "başlar ≠ biter" }, { pre: "صَغِيرٌ ≠", a: [3], tr: "küçük ≠ büyük" }
    ]},
    { type: "pick", num: "٧", ar: "ضَعْ خَطًّا تَحْتَ الكَلِمَةِ غَيْرِ المُنَاسِبَةِ", tr: "Bu mesleğe uymayan kelimeyi seç.", items: PL4([
      ["حَلَّاقٌ:", ["سَرِيرٌ", "مِقَصٌّ", "مِرْآةٌ", "كُرْسِيٌّ"], "Berber: makas, ayna, sandalye var; yatak yok.", "سَرِيرٌ yatak odasındadır."],
      ["مُصَوِّرٌ:", ["ثِيَابٌ", "آلَةُ تَصْوِيرٍ", "ضَوْءٌ", "فِلْمٌ"], "Fotoğrafçı: makine, ışık, film; elbise yok.", "ثِيَابٌ terziyle ilgilidir."],
      ["أُسْتَاذٌ:", ["فَاتُورَةٌ", "طُلَّابٌ", "صَفٌّ", "كِتَابٌ"], "Hoca: öğrenci, sınıf, kitap; fatura yok.", "فَاتُورَةٌ: fatura."],
      ["سَائِقٌ:", ["مَكْتَبَةٌ", "شَارِعٌ", "سَيَّارَةٌ", "رَاكِبٌ"], "Şoför: cadde, araba, yolcu; kütüphane yok.", ""],
      ["نَادِلٌ:", ["دُكَّانٌ", "مَطْعَمٌ", "طَعَامٌ", "طَاوِلَةٌ"], "Garson: lokanta, yemek, masa; dükkân yok.", "نَادِلٌ: garson."]
    ])},
    { type: "pick", num: "٨", ar: "أَكْمِلْ كَمَا فِي المِثَالِ", tr: "Mesleğin doğru tanımını seç.", exHtml: '<span class="ar">الإِسْكَافِيُّ: هُوَ الَّذِي يَصْنَعُ الأَحْذِيَةَ وَيُصْلِحُهَا.</span>', items: PL([
      ["الجَزَّارُ:", "هُوَ الَّذِي يَبِيعُ اللَّحْمَ.", "هُوَ الَّذِي يَصْنَعُ الخُبْزَ.", "هُوَ الَّذِي يَبْنِي البُيُوتَ.", "Kasap et satan kişidir.", ""],
      ["الخَبَّازُ:", "هُوَ الَّذِي يَصْنَعُ الخُبْزَ.", "هُوَ الَّذِي يَخِيطُ الثِّيَابَ.", "هُوَ الَّذِي يَقُصُّ الشَّعْرَ.", "Fırıncı ekmek yapan kişidir.", ""],
      ["الخَيَّاطُ:", "هُوَ الَّذِي يَخِيطُ الثِّيَابَ.", "هُوَ الَّذِي يَبِيعُ العُطُورَ.", "هُوَ الَّذِي يَصْنَعُ الأَثَاثَ.", "Terzi elbise diken kişidir.", ""],
      ["الحَلَّاقُ:", "هُوَ الَّذِي يَقُصُّ الشَّعْرَ.", "هُوَ الَّذِي يَبِيعُ اللَّحْمَ.", "هُوَ الَّذِي يَبْنِي البُيُوتَ.", "Berber saç kesen kişidir.", ""],
      ["البَنَّاءُ:", "هُوَ الَّذِي يَبْنِي البُيُوتَ.", "هُوَ الَّذِي يَصْنَعُ الخُبْزَ.", "هُوَ الَّذِي يَخِيطُ الثِّيَابَ.", "Duvarcı ev yapan kişidir.", "بَنَى، يَبْنِي: inşa etti."],
      ["النَّجَّارُ:", "هُوَ الَّذِي يَصْنَعُ الأَثَاثَ مِنَ الخَشَبِ.", "هُوَ الَّذِي يَصْنَعُ الأَبْوَابَ مِنَ الحَدِيدِ.", "هُوَ الَّذِي يَبِيعُ الدَّوَاءَ.", "Marangoz tahtadan mobilya yapan kişidir.", "Demirden kapı yapan: الحَدَّادُ."],
      ["العَطَّارُ:", "هُوَ الَّذِي يَبِيعُ العُطُورَ وَالتَّوَابِلَ.", "هُوَ الَّذِي يَقُصُّ الشَّعْرَ.", "هُوَ الَّذِي يَبِيعُ اللَّحْمَ.", "Attar koku ve baharat satan kişidir.", "عِطْرٌ: koku, parfüm."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · DİL BİLGİSİ
{
  id: "u4", no: 4, ar: "جَمْعُ المُذَكَّرِ السَّالِمُ وَتَكْوِينُ الجُمَلِ", tr: "Cem-i Müzekker Sâlim, Cümle ve Harf-i Cer", short: "Cümle", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Meslek adlarını cem-i müzekker sâlim yapmak: ـُونَ / ـِينَ", "Mesleği ve iş yerini söylemek: أَعْمَلُ طَبِيبًا فِي المُسْتَشْفَى", "Karışık kelimelerden cümle kurmak", "“مَتَى” ile soru sormak ve uygun harf-i ceri koymak"],
  examples: [
    { s: "أَنَا:mz / أَعْمَلُ:- / خَبَّازًا:nasb.Meslek / فِي المَخْبَزِ.:cerr", tr: "Fırında fırıncı olarak çalışıyorum.", pair: "زَوْجَتِي:mz / تَعْمَلُ:- / مُدَرِّسَةً:nasb.Meslek / فِي المَدْرَسَةِ.:cerr", pairTr: "Eşim okulda öğretmen olarak çalışıyor." },
    { s: "مُدَرِّسٌ:nasb.Tekil / ← مُدَرِّسُونَ:nasb.Merfû / مُدَرِّسِينَ:nasb.Mansûb–mecrûr", tr: "öğretmen → öğretmenler" }
  ],
  rules: [
    { tr: "<b>Cem-i müzekker sâlim:</b> tekilin sonuna ref’ hâlinde <span class=\"ar\">ـُونَ</span>, nasb ve cer hâlinde <span class=\"ar\">ـِينَ</span> eklenir: <span class=\"ar\">مُدَرِّسٌ ← مُدَرِّسُونَ · جَزَّارٌ ← جَزَّارُونَ · حَمَّالٌ ← حَمَّالُونَ · مُضِيفٌ ← مُضِيفُونَ · طَيَّارٌ ← طَيَّارُونَ</span>. Akıllı erkekler için kullanılır." },
    { tr: "<b>يَعْمَلُ + meslek:</b> meslek <b>mansûb</b> gelir (hâl): <span class=\"ar\">يَعْمَلُ طَبِيبًا · تَعْمَلُ مُدَرِّسَةً · يَعْمَلُ مُذِيعًا فِي الإِذَاعَةِ</span>." },
    { tr: "<b>مَتَى ile soru:</b> <span class=\"ar\">يَبْدَأُ الدَّوَامُ السَّاعَةَ السَّابِعَةَ ← مَتَى يَبْدَأُ الدَّوَامُ؟</span> · cevap “ben” ise soru “sen”e: <span class=\"ar\">أَنَا أَنَامُ… ← مَتَى تَنَامُ؟</span>" },
    { tr: "<b>Fiil + harf-i cer:</b> <span class=\"ar\">جَلَسَ عَلَى · وَضَعَ فِي · سَأَلَ عَنْ · خَرَجَ مِنْ · ذَهَبَ إِلَى · كَتَبَ بِـ · سَافَرَ إِلَى</span>." }
  ],
  kaide: ["٩ ـ هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ (جَمْعُ المُذَكَّرِ السَّالِمِ): مُدَرِّسٌ، جَزَّارٌ، حَمَّالٌ، مُضِيفٌ، طَيَّارٌ. ١٠ ـ أَكْمِلْ كَمَا فِي النَّمُوذَجِ: أَنَا أَعْمَلُ خَبَّازًا فِي المَخْبَزِ.", "١١ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا صَحِيحَةً. ١٢ ـ سَلْ كَمَا فِي النَّمُوذَجِ: يَبْدَأُ الدَّوَامُ السَّاعَةَ السَّابِعَةَ صَبَاحًا ← مَتَى يَبْدَأُ الدَّوَامُ؟ ١٣ ـ امْلَإِ الفَرَاغَاتِ بِحَرْفِ الجَرِّ المُنَاسِبِ."],
  ex: [
    { type: "pick", fill: true, num: "٩", ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ (جَمْعُ المُذَكَّرِ السَّالِمِ)", tr: "Tekilin cem-i müzekker sâlimini seç.", items: PL([
      ["مُدَرِّسٌ ← ___", "مُدَرِّسُونَ", "مُدَرِّسَاتٌ", "مَدَارِسُ", "öğretmen → öğretmenler", "مَدَارِسُ: okullar."],
      ["جَزَّارٌ ← ___", "جَزَّارُونَ", "جُزُرٌ", "جَزَّارَاتٌ", "kasap → kasaplar", ""],
      ["حَمَّالٌ ← ___", "حَمَّالُونَ", "أَحْمَالٌ", "حَمَّالَةٌ", "hamal → hamallar", "أَحْمَالٌ: yükler."],
      ["مُضِيفٌ ← ___", "مُضِيفُونَ", "مُضِيفَاتٌ", "ضُيُوفٌ", "host, kabin memuru → kabin memurları", "ضُيُوفٌ: misafirler."],
      ["طَيَّارٌ ← ___", "طَيَّارُونَ", "طُيُورٌ", "طَائِرَاتٌ", "pilot → pilotlar", "طُيُورٌ: kuşlar."],
      ["نَجَّارٌ ← ___", "نَجَّارُونَ", "نُجُورٌ", "نَجَّارَاتٌ", "marangoz → marangozlar", "Kitaptan değil."],
      ["مُمَرِّضٌ ← ___", "مُمَرِّضُونَ", "مَرْضَى", "مُمَرِّضَاتٌ", "hemşire (erkek) → hemşireler", "مَرْضَى: hastalar."],
      ["رَأَيْتُ ___ فِي المَطَارِ.", "الطَّيَّارِينَ", "الطَّيَّارُونَ", "الطَّيَّارَاتِ", "Havaalanında pilotları gördüm.", "Mef’ûl (mansûb): ـِينَ."]
    ])},
    { type: "pick", fill: true, num: "١٠", ar: "أَكْمِلْ كَمَا فِي النَّمُوذَجِ", tr: "Mesleğe uygun iş yerini seç.", exHtml: '<span class="ar">أَنَا أَعْمَلُ خَبَّازًا فِي المَخْبَزِ.</span>', items: PL([
      ["أَنَا أَعْمَلُ طَبِيبًا فِي ___.", "المُسْتَشْفَى", "المَطَارِ", "المَخْبَزِ", "Hastanede doktor olarak çalışıyorum.", ""],
      ["زَوْجَتِي تَعْمَلُ مُدَرِّسَةً فِي ___.", "المَدْرَسَةِ", "المُسْتَشْفَى", "الإِذَاعَةِ", "Eşim okulda öğretmen.", ""],
      ["وَلَدِي سَامِي طَالِبٌ فِي ___.", "الجَامِعَةِ", "المَخْبَزِ", "المَطَارِ", "Oğlum Sâmî üniversitede öğrenci.", "المَدْرَسَةِ da olur."],
      ["وَلِيدٌ يَعْمَلُ مُذِيعًا فِي ___.", "الإِذَاعَةِ", "الصَّيْدَلِيَّةِ", "المَصْنَعِ", "Velîd radyoda spiker.", "التِّلْفَازِ da olur."],
      ["عَمِّي بَشِيرٌ يَعْمَلُ طَيَّارًا فِي ___.", "الخُطُوطِ الجَوِّيَّةِ", "المَدْرَسَةِ", "المَحْكَمَةِ", "Amcam Beşîr hava yollarında pilot.", "المَطَارِ da olur."]
    ])},
    { type: "bank", num: "١١", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ لِتُكَوِّنَ جُمَلًا صَحِيحَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["أَعْمَلُ", "طَبِيبًا", "خَالِدٌ", "يَعْمَلُ", "مُهَنْدِسًا", "تَعْمَلُ", "مُدَرِّسَةً", "وَلَدِي", "سَامِي", "هُوَ", "طَالِبٌ", "صَالِحَةُ", "صَيْدَلَانِيَّةً"],
      tr2: "1) Ben doktor olarak çalışıyorum. 2) Arkadaşım Hâlid mühendis olarak çalışıyor. 3) Eşim öğretmen olarak çalışıyor. 4) Bu oğlum Sâmî, o öğrenci. 5) Eşim Sâliha eczacı olarak çalışıyor.",
      parts: ["١ ـ أَنَا", { a: [0] }, { a: [1] }, ".<br>٢ ـ صَدِيقِي", { a: [2] }, { a: [3] }, { a: [4] }, ".<br>٣ ـ زَوْجَتِي", { a: [5] }, { a: [6] }, ".<br>٤ ـ هَذَا", { a: [7] }, { a: [8] }, "،", { a: [9] }, { a: [10] }, ".<br>٥ ـ زَوْجَتِي", { a: [11] }, { a: [5] }, { a: [12] }, "."] },
    { type: "pick", fill: true, num: "١٢", ar: "سَلْ كَمَا فِي النَّمُوذَجِ", tr: "Cümleye uygun “مَتَى” sorusunu seç.", exHtml: '<span class="ar">يَبْدَأُ الدَّوَامُ السَّاعَةَ السَّابِعَةَ صَبَاحًا. ← مَتَى يَبْدَأُ الدَّوَامُ؟</span>', items: PL([
      ["يَنْتَهِي الدَّوَامُ السَّاعَةَ الثَّالِثَةَ وَالنِّصْفَ. ← ___", "مَتَى يَنْتَهِي الدَّوَامُ؟", "أَيْنَ الدَّوَامُ؟", "كَمْ سَاعَةً الدَّوَامُ؟", "Mesai ne zaman biter?", "دَوَامٌ: mesai."],
      ["يَسْتَيْقِظُ حَسَّانٌ السَّاعَةَ السَّابِعَةَ صَبَاحًا. ← ___", "مَتَى يَسْتَيْقِظُ حَسَّانٌ؟", "مَنْ يَسْتَيْقِظُ؟", "أَيْنَ يَسْتَيْقِظُ حَسَّانٌ؟", "Hassân ne zaman uyanıyor?", ""],
      ["عَلِيٌّ يَذْهَبُ إِلَى العَمَلِ السَّاعَةَ التَّاسِعَةَ. ← ___", "مَتَى يَذْهَبُ عَلِيٌّ إِلَى العَمَلِ؟", "أَيْنَ يَذْهَبُ عَلِيٌّ؟", "كَيْفَ يَذْهَبُ عَلِيٌّ؟", "Ali işe ne zaman gidiyor?", ""],
      ["أَنَا أَنَامُ السَّاعَةَ الثَّانِيَةَ عَشْرَةَ. ← ___", "مَتَى تَنَامُ؟", "مَتَى أَنَامُ؟", "مَتَى يَنَامُ؟", "Ne zaman uyuyorsun?", "أَنَا أَنَامُ ← أَنْتَ تَنَامُ."],
      ["وَالِدِي يَخْرُجُ إِلَى عَمَلِهِ مُبَكِّرًا. ← ___", "مَتَى يَخْرُجُ وَالِدُكَ إِلَى عَمَلِهِ؟", "مَتَى يَخْرُجُ وَالِدِي؟", "أَيْنَ يَعْمَلُ وَالِدُكَ؟", "Baban işine ne zaman çıkıyor?", "وَالِدِي ← وَالِدُكَ."]
    ])},
    { type: "bank", num: "١٣", reuse: true, ar: "امْلَإِ الفَرَاغَاتِ بِحَرْفِ الجَرِّ المُنَاسِبِ", tr: "Önce aşağıdan harf-i ceri seç, sonra boşluğa dokun. Bir harf birden çok kez kullanılabilir.", bank: ["عَلَى", "فِي", "عَنْ", "مِنْ", "إِلَى", "بِـ"],
      tr2: "Sandalyeye oturuyorum. · Kalemi çantaya koyuyorum. · Dersi soruyorum. · Üniversiteden çıkıyorum. · Fakülteye gidiyorum. · Kalemle yazıyorum. · Sen ülkene seyahat ediyorsun. · Sen saati soruyorsun.",
      parts: ["• أَنَا أَجْلِسُ", { a: [0] }, "الكُرْسِيِّ.<br>• أَنَا أَضَعُ القَلَمَ", { a: [1] }, "الحَقِيبَةِ.<br>• أَنَا أَسْأَلُ", { a: [2] }, "الدَّرْسِ.<br>• أَنَا أَخْرُجُ", { a: [3] }, "الجَامِعَةِ.<br>• أَنَا أَذْهَبُ", { a: [4] }, "الكُلِّيَّةِ.<br>• أَنَا أَكْتُبُ", { a: [5] }, "القَلَمِ.<br>• أَنْتَ تُسَافِرُ", { a: [4] }, "بَلَدِكَ.<br>• أَنْتَ تَسْأَلُ", { a: [2] }, "السَّاعَةِ."] }
  ]
},
// ---------------------------------------------------------------- 5 · EK OKUMA
{
  id: "u5", no: 5, ar: "نُصُوصٌ إِضَافِيَّةٌ: أَعْمَالٌ مُتَنَوِّعَةٌ وَمِهَنُ الأَنْبِيَاءِ", tr: "Ek Okuma: Çeşitli İşler ve Peygamberlerin Meslekleri", short: "Ek okuma", col: "muz", legend: ["mz", "nasb"],
  goals: ["Beş kısa metni okumak: marangoz, demirci, kuyumcu, temizlik işçisi, gazeteci", "Peygamberlerin mesleklerini öğrenmek", "İslâm’da çalışmanın değerini anlamak", "Tevbe 105’i okumak ve anlamak"],
  examples: [
    { s: "النَّجَّارُ:nasb / يَصْنَعُ:- / أَبْوَابًا مِنَ الخَشَبِ:mz", tr: "Marangoz tahtadan kapı yapar.", pair: "الحَدَّادُ:nasb / يَصْنَعُ:- / أَبْوَابًا مِنَ الحَدِيدِ:mz", pairTr: "Demirci demirden kapı yapar." },
    { s: "نُوحٌ عَلَيْهِ السَّلَامُ:mz / كَانَ يَعْمَلُ:- / بِالنِّجَارَةِ.:nasb", tr: "Nûh (a.s.) marangozluk yapardı." }
  ],
  rules: [
    { tr: "<b>Ek metinler:</b> <span class=\"ar\">النَّجَّارُ</span> mobilya yapar · <span class=\"ar\">الحَدَّادُ</span> demirden kapı yapar · <span class=\"ar\">الصَّائِغُ</span> altından, gümüşten yüzük, bilezik, kolye yapar · <span class=\"ar\">عَامِلُ النَّظَافَةِ</span> sokakları süpürür, çöp toplar · <span class=\"ar\">الصَّحَفِيُّ</span> haber yazar." },
    { tr: "<b>Peygamberlerin meslekleri:</b> <span class=\"ar\">إِدْرِيسُ</span> terzilik · <span class=\"ar\">نُوحٌ</span> marangozluk (gemi) · <span class=\"ar\">دَاوُدُ</span> demircilik (zırh) · <span class=\"ar\">مُوسَى</span> çobanlık (Şuayb’ın yanında 10 yıl) · <span class=\"ar\">آدَمُ</span> çiftçilik · <span class=\"ar\">يَعْقُوبُ</span> çobanlık · <span class=\"ar\">يُوسُفُ</span> Mısır hazinelerine vezirlik · <span class=\"ar\">مُحَمَّدٌ ﷺ</span> küçükken çobanlık, gençliğinde ticaret." },
    { tr: "<b>Ana fikir:</b> Çalışmak insanın ihtiyaçlarını karşılamasının yoludur; İslâm’da ibadet gibidir. <span class=\"ar\">طَلَبُ الرِّزْقِ خَيْرٌ مِنَ الجُلُوسِ بِلَا عَمَلٍ</span>: rızık aramak işsiz oturmaktan hayırlıdır." }
  ],
  kaide: ["١٤ ـ نُصُوصٌ إِضَافِيَّةٌ لِلْقِرَاءَةِ: اقْرَإِ النُّصُوصَ الآتِيَةَ: أَعْمَالٌ مُتَنَوِّعَةٌ (النَّجَّارُ، الحَدَّادُ، الصَّائِغُ، عَامِلُ النَّظَافَةِ، الصَّحَفِيُّ).", "مِهَنُ وَأَعْمَالُ الأَنْبِيَاءِ عَلَيْهِمُ السَّلَامُ. ﴿وَقُلِ اعْمَلُوا فَسَيَرَى اللهُ عَمَلَكُمْ وَرَسُولُهُ وَالمُؤْمِنُونَ…﴾ (التَّوْبَةُ: ١٠٥)"],
  ex: [
    { type: "reading", num: "١٤ (أ)", ar: "اقْرَإِ النُّصُوصَ الآتِيَةَ: أَعْمَالٌ مُتَنَوِّعَةٌ", tr: "Beş kısa metni oku ya da dinle; sonra soruları cevapla.", title: "أَعْمَالٌ مُتَنَوِّعَةٌ", dialog: EK_METIN, text: EK_METIN.map(function (m) { return m[0] + ". " + m[1]; }).join("<br>"), textTr: EK_TR, speak: true,
      qa: [
        { q: "لِمَاذَا يَحْتَرِمُ الكَاتِبُ عَمَّهُ النَّجَّارَ؟", a: "لِأَنَّهُ يُقَدِّمُ خَدَمَاتٍ لِلْوَطَنِ وَالمُوَاطِنِينَ.", tr: "Yazar marangoz amcasına neden saygı duyuyor? Vatana ve vatandaşlara hizmet ettiği için." },
        { q: "مَا الفَرْقُ بَيْنَ النَّجَّارِ وَالحَدَّادِ؟", a: "النَّجَّارُ يَصْنَعُ أَبْوَابًا مِنَ الخَشَبِ، وَالحَدَّادُ يَصْنَعُ أَبْوَابًا مِنَ الحَدِيدِ.", tr: "Marangozla demirci arasındaki fark nedir?" },
        { q: "مَا وَاجِبُنَا نَحْوَ النَّظَافَةِ؟", a: "وَاجِبُنَا جَمِيعًا أَنْ نُحَافِظَ عَلَى النَّظَافَةِ.", tr: "Temizlik konusunda görevimiz nedir?" }
      ],
      cls: { opts: [["n", "Marangoz", "النَّجَّارُ", "nasb"], ["d", "Demirci", "الحَدَّادُ", "ref"], ["s", "Kuyumcu", "الصَّائِغُ", "mi"], ["a", "Temizlik işçisi", "عَامِلُ النَّظَافَةِ", "mz"], ["h", "Gazeteci", "الصَّحَفِيُّ", "cerr"]], ar: "مَنْ يَعْمَلُ هَذَا؟", tr: "Metinlere göre bu işi kim yapar?", items: [
        { s: "يَصْنَعُ الكَرَاسِيَّ وَالطَّاوِلَاتِ.", a: "n", why: "Marangoz mobilya yapar." },
        { s: "يَصْنَعُ أَبْوَابًا مِنَ الحَدِيدِ.", a: "d", why: "Demirci." },
        { s: "يَصْنَعُ الخَوَاتِمَ وَالأَسَاوِرَ.", a: "s", why: "Kuyumcu altından ve gümüşten yapar." },
        { s: "يَكْنُسُ الشَّوَارِعَ.", a: "a", why: "Temizlik işçisi." },
        { s: "يَكْتُبُ الأَخْبَارَ الجَدِيدَةَ.", a: "h", why: "Gazeteci." },
        { s: "يَجْمَعُ القُمَامَةَ.", a: "a", why: "Temizlik işçisi." },
        { s: "يَبْحَثُ عَنِ الأَخْبَارِ المُهِمَّةِ.", a: "h", why: "Gazeteci her yere gider." },
        { s: "اشْتَرَتْ مِنْهُ الأُمُّ عِقْدًا مِنَ الفِضَّةِ.", a: "s", why: "Kuyumcu." }
      ]}
    },
    { type: "reading", num: "١٤ (ب)", ar: "مِهَنُ وَأَعْمَالُ الأَنْبِيَاءِ عَلَيْهِمُ السَّلَامُ", tr: "Metni oku ya da dinle; sonra peygamberin mesleğini seç.", title: "مِهَنُ وَأَعْمَالُ الأَنْبِيَاءِ", text: NEBI_METIN, textTr: NEBI_TR, speak: true,
      qa: [
        { q: "مَا أَهَمِّيَّةُ العَمَلِ فِي الإِسْلَامِ؟", a: "لِلْعَمَلِ مَنْزِلَةٌ كَبِيرَةٌ، وَهُوَ كَالعِبَادَةِ لِدَوْرِهِ فِي بِنَاءِ المُجْتَمَعِ.", tr: "İslâm’da çalışmanın önemi nedir? İbadet gibidir." },
        { q: "مَاذَا تُعَلِّمُ مِهْنَةُ رَعْيِ الأَغْنَامِ؟", a: "تُعَلِّمُ الإِنْسَانَ الصَّبْرَ وَالتَّفْكِيرَ فِي الحَيَاةِ.", tr: "Çobanlık neyi öğretir? Sabrı ve düşünmeyi." },
        { q: "لِمَاذَا طَلَبُ الرِّزْقِ خَيْرٌ مِنَ الجُلُوسِ بِلَا عَمَلٍ؟", a: "لِأَنَّ الفَرَاغَ سَبَبٌ لِكَثِيرٍ مِنَ المَشَاكِلِ المَادِّيَّةِ وَالمَعْنَوِيَّةِ.", tr: "Rızık aramak neden işsiz oturmaktan hayırlıdır?" }
      ],
      cls: { opts: NEBI, ar: "مَا مِهْنَتُهُ؟", tr: "Metne göre bu peygamberin mesleği ne?", items: [
        { s: "إِدْرِيسُ عَلَيْهِ السَّلَامُ", a: "h", why: "خِيَاطَةُ الثِّيَابِ; ondan önce insanlar deri giyerdi." },
        { s: "نُوحٌ عَلَيْهِ السَّلَامُ", a: "n", why: "Marangozluk; gemisini yaptı." },
        { s: "دَاوُدُ عَلَيْهِ السَّلَامُ", a: "d", why: "Demircilik; zırh ve silah yaptı." },
        { s: "مُوسَى عَلَيْهِ السَّلَامُ", a: "r", why: "Şuayb’ın yanında on yıl çobanlık." },
        { s: "آدَمُ عَلَيْهِ السَّلَامُ", a: "z", why: "Çiftçilik: الزِّرَاعَةُ." },
        { s: "يَعْقُوبُ عَلَيْهِ السَّلَامُ", a: "r", why: "Çobanlık: الرَّعْيُ." },
        { s: "يُوسُفُ عَلَيْهِ السَّلَامُ", a: "w", why: "Mısır hazinelerine vezir." },
        { s: "مُحَمَّدٌ ﷺ فِي صِغَرِهِ", a: "r", why: "Küçükken koyun güttü; gençliğinde ticaret yaptı." }
      ]}
    },
    { type: "pick", extra: true, ar: "أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Ek metinlere göre doğru cevabı seç.", items: PL([
      ["مِنْ أَيِّ شَيْءٍ يَصْنَعُ الصَّائِغُ أَشْيَاءَهُ؟", "مِنَ الذَّهَبِ وَالفِضَّةِ.", "مِنَ الخَشَبِ.", "مِنَ الحَدِيدِ.", "Kuyumcu neden yapar? Altın ve gümüşten.", ""],
      ["مَا اسْمُ الجَرِيدَةِ الَّتِي يَعْمَلُ فِيهَا مُحَمَّدٌ؟", "الغَدُ.", "اليَوْمُ.", "الوَطَنُ.", "Muhammed’in gazetesinin adı? el-Ğad (Yarın).", "جَرِيدَةٌ يَوْمِيَّةٌ: günlük gazete."],
      ["أَيْنَ يَضَعُ عَامِلُ النَّظَافَةِ القُمَامَةَ؟", "فِي صُنْدُوقِ القُمَامَةِ (الحَاوِيَةِ).", "فِي الشَّارِعِ.", "فِي الحَدِيقَةِ.", "Temizlik işçisi çöpü nereye koyar? Çöp kutusuna.", ""],
      ["كَمْ سَنَةً رَعَى مُوسَى عَلَيْهِ السَّلَامُ الغَنَمَ؟", "عَشْرَ سَنَوَاتٍ.", "خَمْسَ سَنَوَاتٍ.", "سَنَتَيْنِ.", "Mûsâ (a.s.) kaç yıl koyun güttü? On yıl.", "عِنْدَ نَبِيِّ اللهِ شُعَيْبٍ."],
      ["مَا مُعْجِزَةُ نُوحٍ عَلَيْهِ السَّلَامُ؟", "سَفِينَتُهُ المَشْهُورَةُ.", "الدُّرُوعُ.", "خِيَاطَةُ الثِّيَابِ.", "Nûh’un mucizesi? Meşhur gemisi.", "Zırhlar Dâvûd’un mucizesi."],
      ["مَا مَعْنَى «مَا بُعِثَ نَبِيٌّ إِلَّا رَعَى الغَنَمَ»؟", "كُلُّ الأَنْبِيَاءِ عَمِلُوا فِي رَعْيِ الغَنَمِ.", "لَمْ يَرْعَ نَبِيٌّ الغَنَمَ.", "رَعَى الغَنَمَ نَبِيٌّ وَاحِدٌ.", "Hadisin anlamı? Bütün peygamberler koyun güttü.", ""]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["مَرْيَمُ مِنْ {سُورِيَةَ}، تَسْكُنُ فِي إِسْطَنْبُولَ.", ["سُورِيَةَ", "تُرْكِيَا", "العِرَاقِ"], "metin", "Meryem Suriyeli, İstanbul’da oturuyor.", "u1"],
  ["وَالِدُهَا {نَجَّارٌ} فِي مَصْنَعِ المَفْرُوشَاتِ.", ["نَجَّارٌ", "طَبِيبٌ", "حَدَّادٌ"], "metin", "Babası mobilya fabrikasında marangoz.", "u1"],
  ["وَالِدَتُهَا {طَبِيبَةٌ} فِي المُسْتَشْفَى.", ["طَبِيبَةٌ", "مُعَلِّمَةٌ", "خَيَّاطَةٌ"], "metin", "Annesi hastanede doktor.", "u1"],
  ["وَأَخُوهَا الكَبِيرُ {طَيَّارٌ}.", ["طَيَّارٌ", "شُرْطِيٌّ", "خَبَّازٌ"], "metin", "Ağabeyi pilot.", "u1"],
  ["تَسْكُنُ مَرْيَمُ فِي حَيٍّ جَمِيلٍ وَ{هَادِئٍ}.", ["هَادِئٍ", "بَعِيدٍ", "ضَيِّقٍ"], "metin", "Meryem güzel ve sakin bir mahallede oturuyor.", "u1"],
  ["الجَارُ فِي الطَّابِقِ الأَوَّلِ يَعْمَلُ {شُرْطِيًّا} لِلْمُرُورِ.", ["شُرْطِيًّا", "شُرْطِيٌّ", "شُرْطِيَّةً"], "anlama", "Birinci kattaki komşu trafik polisi.", "u2"],
  ["أَمَّا زَوْجَتُهُ فَهِيَ {رَبَّةُ} بَيْتٍ.", ["رَبَّةُ", "مُعَلِّمَةُ", "صَاحِبَةُ"], "anlama", "Eşi ise ev hanımı.", "u2"],
  ["سَالِمٌ {مُتَقَاعِدٌ}.", ["مُتَقَاعِدٌ", "طَالِبٌ", "خَبَّازٌ"], "anlama", "Sâlim emekli.", "u2"],
  ["قُصَيٌّ عِرَاقِيٌّ، هُوَ {مُحَامٍ}.", ["مُحَامٍ", "مُهَنْدِسٌ", "مُعَلِّمٌ"], "anlama", "Kusay Iraklı, avukat.", "u2"],
  ["أَنَا حَلَّاقٌ، أَقُصُّ شَعْرَ النَّاسِ بِـ{المِقَصِّ}.", ["المِقَصِّ", "القَلَمِ", "الدَّوَاءِ"], "boşluk", "Berberim, saçı makasla keserim.", "u3"],
  ["أَنَا صَيْدَلَانِيَّةٌ، أَبِيعُ {الدَّوَاءَ} لِلْمَرْضَى.", ["الدَّوَاءَ", "الخُبْزَ", "اللَّحْمَ"], "boşluk", "Eczacıyım, hastalara ilaç satarım.", "u3"],
  ["الجَزَّارُ هُوَ الَّذِي يَبِيعُ {اللَّحْمَ}.", ["اللَّحْمَ", "الخُبْزَ", "الثِّيَابَ"], "tanım", "Kasap et satan kişidir.", "u3"],
  ["الخَيَّاطُ هُوَ الَّذِي {يَخِيطُ} الثِّيَابَ.", ["يَخِيطُ", "يَبْنِي", "يَقُصُّ"], "tanım", "Terzi elbise diker.", "u3"],
  ["مَصْنَعٌ = {مَعْمَلٌ}.", ["مَعْمَلٌ", "مَطْعَمٌ", "مَكْتَبٌ"], "eş anlam", "Fabrika = fabrika.", "u3"],
  ["نِسَائِيٌّ ≠ {رِجَالِيٌّ}.", ["رِجَالِيٌّ", "طِفْلِيٌّ", "عَائِلِيٌّ"], "zıt", "Kadınlara ait ≠ erkeklere ait.", "u3"],
  ["مُدَرِّسٌ ← {مُدَرِّسُونَ}.", ["مُدَرِّسُونَ", "مَدَارِسُ", "مُدَرِّسَاتٌ"], "cem", "Öğretmen → öğretmenler.", "u4"],
  ["أَنَا أَعْمَلُ خَبَّازًا فِي {المَخْبَزِ}.", ["المَخْبَزِ", "المُسْتَشْفَى", "المَطَارِ"], "yer", "Fırında fırıncı olarak çalışıyorum.", "u4"],
  ["{مَتَى} يَبْدَأُ الدَّوَامُ؟", ["مَتَى", "أَيْنَ", "مَنْ"], "soru", "Mesai ne zaman başlıyor?", "u4"],
  ["أَنَا أَسْأَلُ {عَنِ} الدَّرْسِ.", ["عَنِ", "عَلَى", "إِلَى"], "harf-i cer", "Dersi soruyorum.", "u4"],
  ["أَنَا أَكْتُبُ {بِـ}القَلَمِ.", ["بِـ", "فِي", "مِنْ"], "harf-i cer", "Kalemle yazıyorum.", "u4"],
  ["الحَدَّادُ يَصْنَعُ أَبْوَابًا مِنَ {الحَدِيدِ}.", ["الحَدِيدِ", "الخَشَبِ", "الذَّهَبِ"], "ek okuma", "Demirci demirden kapı yapar.", "u5"],
  ["الصَّائِغُ يَصْنَعُ الخَوَاتِمَ مِنَ الذَّهَبِ وَ{الفِضَّةِ}.", ["الفِضَّةِ", "الخَشَبِ", "الحَدِيدِ"], "ek okuma", "Kuyumcu altından ve gümüşten yüzük yapar.", "u5"],
  ["نُوحٌ عَلَيْهِ السَّلَامُ صَنَعَ {سَفِينَتَهُ} المَشْهُورَةَ.", ["سَفِينَتَهُ", "دِرْعَهُ", "ثَوْبَهُ"], "peygamberler", "Nûh (a.s.) meşhur gemisini yaptı.", "u5"],
  ["مَا بُعِثَ نَبِيٌّ إِلَّا رَعَى {الغَنَمَ}.", ["الغَنَمَ", "الإِبِلَ", "البَقَرَ"], "hadis", "Koyun gütmemiş peygamber gönderilmedi.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["وَالِدُ مَرْيَمَ طَبِيبٌ ← metne göre düzelt", "وَالِدُ مَرْيَمَ نَجَّارٌ", "وَالِدُ مَرْيَمَ طَيَّارٌ", "وَالِدُ مَرْيَمَ مُحَامٍ", "Doktor olan annesi.", "u1"],
  ["مَازِنٌ طَالِبٌ فِي الجَامِعَةِ ← metne göre düzelt", "مَازِنٌ طَالِبٌ فِي المَرْحَلَةِ الابْتِدَائِيَّةِ", "مَازِنٌ خَبَّازٌ", "مَازِنٌ طَالِبٌ فِي الثَّانَوِيَّةِ", "İlkokulda.", "u2"],
  ["عَائِلَةُ مَرْيَمَ فِي بَيْتٍ مُسْتَقِلٍّ ← metne göre düzelt", "عَائِلَةُ مَرْيَمَ فِي شَقَّةٍ", "عَائِلَةُ مَرْيَمَ فِي قَرْيَةٍ", "عَائِلَةُ مَرْيَمَ فِي فُنْدُقٍ", "شَقَّتُهَا فِي الدَّوْرِ الرَّابِعِ.", "u2"],
  ["طَبِيبٌ ← dişil", "طَبِيبَةٌ", "طَبِيبَاتٌ", "أَطِبَّاءُ", "طَبِيبٌ + ـةٌ", "u1"],
  ["مُحَامٍ ← dişil", "مُحَامِيَةٌ", "مُحَامَةٌ", "مُحَامُونَ", "Nâkıs isim: مُحَامٍ ← مُحَامِيَةٌ.", "u1"],
  ["دَوْرٌ ← eş anlam", "طَابِقٌ", "مَعْمَلٌ", "أُسْرَةٌ", "kat = kat", "u3"],
  ["قَرِيبٌ ← zıt anlam", "بَعِيدٌ", "كَبِيرٌ", "رِجَالِيٌّ", "yakın ≠ uzak", "u3"],
  ["حَلَّاقٌ: مِقَصٌّ، مِرْآةٌ، كُرْسِيٌّ، سَرِيرٌ ← uymayan", "سَرِيرٌ", "مِقَصٌّ", "مِرْآةٌ", "Berberde yatak olmaz.", "u3"],
  ["الخَبَّازُ ← tanımı", "هُوَ الَّذِي يَصْنَعُ الخُبْزَ", "هُوَ الَّذِي يَبِيعُ اللَّحْمَ", "هُوَ الَّذِي يَبْنِي البُيُوتَ", "خُبْزٌ: ekmek.", "u3"],
  ["طَيَّارٌ ← cem-i müzekker sâlim", "طَيَّارُونَ", "طُيُورٌ", "طَائِرَاتٌ", "ـُونَ eklenir.", "u4"],
  ["أَنَا، طَبِيبًا، أَعْمَلُ ← sırala", "أَنَا أَعْمَلُ طَبِيبًا", "طَبِيبًا أَنَا أَعْمَلُ", "أَعْمَلُ أَنَا طَبِيبًا", "Kitaptaki 11. etkinlik.", "u4"],
  ["أَنَا أَنَامُ السَّاعَةَ الثَّانِيَةَ عَشْرَةَ ← مَتَى ile sor", "مَتَى تَنَامُ؟", "مَتَى أَنَامُ؟", "أَيْنَ تَنَامُ؟", "أَنَا ← أَنْتَ", "u4"],
  ["أَنَا أَجْلِسُ … الكُرْسِيِّ ← harf-i cer", "أَنَا أَجْلِسُ عَلَى الكُرْسِيِّ", "أَنَا أَجْلِسُ إِلَى الكُرْسِيِّ", "أَنَا أَجْلِسُ عَنِ الكُرْسِيِّ", "جَلَسَ عَلَى", "u4"],
  ["دَاوُدُ عَلَيْهِ السَّلَامُ ← mesleği", "الحِدَادَةُ", "النِّجَارَةُ", "الخِيَاطَةُ", "Zırh yaptı.", "u5"]
];
// Erkek mi kadın mı? hız oyunu
var NOUN_LIST = [
  ["نَجَّارٌ", "m", "marangoz"], ["طَبِيبَةٌ", "f", "doktor (k.)"], ["طَيَّارٌ", "m", "pilot"], ["شُرْطِيٌّ", "m", "polis"], ["صَيْدَلَانِيَّةٌ", "f", "eczacı (k.)"], ["مُعَلِّمَةٌ", "f", "öğretmen (k.)"], ["مُحَامٍ", "m", "avukat"], ["مُوَظَّفَةٌ", "f", "memur (k.)"],
  ["خَبَّازٌ", "m", "fırıncı"], ["مُمَرِّضَةٌ", "f", "hemşire (k.)"], ["خَيَّاطَةٌ", "f", "terzi (k.)"], ["مُتَقَاعِدٌ", "m", "emekli"], ["رَبَّةُ بَيْتٍ", "f", "ev hanımı"], ["حَلَّاقٌ", "m", "berber"], ["مُحَامِيَةٌ", "f", "avukat (k.)"], ["صَحَفِيٌّ", "m", "gazeteci"], ["مُذِيعَةٌ", "f", "spiker (k.)"], ["جَزَّارٌ", "m", "kasap"]
];
var SP_M = CINS;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  my: { name: "Meslek ↔ iş yeri", pairs: [["طَبِيبٌ", "المُسْتَشْفَى"], ["خَبَّازٌ", "المَخْبَزُ"], ["طَيَّارٌ", "المَطَارُ"], ["صَيْدَلَانِيٌّ", "الصَّيْدَلِيَّةُ"], ["مُدَرِّسٌ", "المَدْرَسَةُ"], ["مُحَامٍ", "المَحْكَمَةُ"], ["مُذِيعٌ", "الإِذَاعَةُ"]] },
  zd: { name: "Kelime ↔ zıt / eş", pairs: [["قَرِيبٌ", "بَعِيدٌ"], ["يُحِبُّ", "يَكْرَهُ"], ["نِسَائِيٌّ", "رِجَالِيٌّ"], ["يَبْدَأُ", "يَنْتَهِي"], ["مَصْنَعٌ", "مَعْمَلٌ"], ["دَوْرٌ", "طَابِقٌ"], ["مُطِلٌّ", "مُشْرِفٌ"]] },
  nb: { name: "Peygamber ↔ mesleği", pairs: [["إِدْرِيسُ", "الخِيَاطَةُ"], ["نُوحٌ", "النِّجَارَةُ"], ["دَاوُدُ", "الحِدَادَةُ"], ["آدَمُ", "الزِّرَاعَةُ"], ["يُوسُفُ", "الوِزَارَةُ"], ["مُوسَى", "رَعْيُ الغَنَمِ"]] }
};
var KARTLAR = [
  ["Meryem kimdir?", "مَرْيَمُ سُورِيَّةٌ، تَسْكُنُ فِي إِسْطَنْبُولَ · طَالِبَةٌ فِي السَّنَةِ التَّحْضِيرِيَّةِ، كُلِّيَّةُ الاقْتِصَادِ، جَامِعَةُ مَرْمَرَةَ"],
  ["Meryem’in ailesi?", "الوَالِدُ نَجَّارٌ (٩ سَاعَاتٍ) · الوَالِدَةُ طَبِيبَةٌ (قِسْمُ النِّسَائِيَّةِ) · الأَخُ الكَبِيرُ طَيَّارٌ"],
  ["Apartmandaki komşular?", "١: مُحَمَّدٌ شُرْطِيُّ مُرُورٍ · ٢: سَالِمٌ مُتَقَاعِدٌ · ٣: قُصَيٌّ مُحَامٍ عِرَاقِيٌّ · ٤: مَرْيَمُ"],
  ["Komşuların çocukları?", "سُمَيَّةُ صَيْدَلَانِيَّةٌ، أَحْمَدُ فِي الثَّانَوِيَّةِ · مَازِنٌ فِي الابْتِدَائِيَّةِ · أَوْلَادُ قُصَيٍّ: طَالِبٌ، خَبَّازٌ، مُمَرِّضَةٌ، خَيَّاطَةٌ"],
  ["Meslek söyleme kalıbı?", "هُوَ طَبِيبٌ · يَعْمَلُ طَبِيبًا فِي المُسْتَشْفَى (meslek mansûb)"],
  ["Tanım kalıbı?", "الإِسْكَافِيُّ هُوَ الَّذِي يَصْنَعُ الأَحْذِيَةَ وَيُصْلِحُهَا"],
  ["Cem-i müzekker sâlim?", "ـُونَ / ـِينَ: مُدَرِّسُونَ، جَزَّارُونَ، حَمَّالُونَ، مُضِيفُونَ، طَيَّارُونَ"],
  ["Eş anlamlar?", "تَسْكُنُ = تَعِيشُ · مَصْنَعٌ = مَعْمَلٌ · دَوْرٌ = طَابِقٌ · مُطِلٌّ = مُشْرِفٌ"],
  ["Zıt anlamlar?", "قَرِيبٌ ≠ بَعِيدٌ · نِسَائِيٌّ ≠ رِجَالِيٌّ · يَبْدَأُ ≠ يَنْتَهِي · يُحِبُّ ≠ يَكْرَهُ"],
  ["Fiil + harf-i cer?", "جَلَسَ عَلَى · وَضَعَ فِي · سَأَلَ عَنْ · خَرَجَ مِنْ · ذَهَبَ إِلَى · كَتَبَ بِـ"],
  ["Peygamberlerin meslekleri?", "إِدْرِيسُ خِيَاطَةٌ · نُوحٌ نِجَارَةٌ · دَاوُدُ حِدَادَةٌ · آدَمُ زِرَاعَةٌ · مُوسَى وَمُحَمَّدٌ ﷺ رَعْيٌ"],
  ["Tevbe 105?", "وَقُلِ اعْمَلُوا فَسَيَرَى اللهُ عَمَلَكُمْ وَرَسُولُهُ وَالمُؤْمِنُونَ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat06";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("مِهْنَةٌ", "i", "meslek", "مِهَنٌ", "fial_f", "حِرْفَةٌ", "", "مَا مِهْنَةُ وَالِدِكَ وَوَالِدَتِكَ؟", "مِهْنَةُ", "Annenin ve babanın mesleği ne?"),
  KW("عَمَلٌ", "i", "iş", "أَعْمَالٌ", "efal", "شُغْلٌ", "", "هُوَ يُحِبُّ عَمَلَهُ كَثِيرًا.", "عَمَلَهُ", "İşini çok seviyor."),
  KW("نَجَّارٌ", "i", "marangoz", "نَجَّارُونَ", "un", "", "", "وَالِدُهَا نَجَّارٌ فِي مَصْنَعِ المَفْرُوشَاتِ.", "نَجَّارٌ", "Babası mobilya fabrikasında marangoz."),
  KW("مَصْنَعٌ", "i", "fabrika", "مَصَانِعُ", "mefail", "مَعْمَلٌ", "", "وَالِدُهَا نَجَّارٌ فِي مَصْنَعِ المَفْرُوشَاتِ.", "مَصْنَعِ", "Babası mobilya fabrikasında marangoz."),
  KW("طَيَّارٌ", "i", "pilot", "طَيَّارُونَ", "un", "", "", "وَأَخُوهَا الكَبِيرُ طَيَّارٌ.", "طَيَّارٌ", "Ağabeyi pilot."),
  KW("شَقَّةٌ", "i", "daire", "شُقَقٌ", "fual_f", "", "", "شَقَّتُهَا فِي الدَّوْرِ الرَّابِعِ.", "شَقَّتُهَا", "Dairesi dördüncü katta."),
  KW("طَابِقٌ", "i", "kat", "طَوَابِقُ", "fevail", "دَوْرٌ", "", "الجَارُ فِي الطَّابِقِ الأَوَّلِ اسْمُهُ مُحَمَّدٌ.", "الطَّابِقِ", "Birinci kattaki komşunun adı Muhammed."),
  KW("جَارٌ", "i", "komşu", "جِيرَانٌ", "diger", "", "", "جِيرَانُ مَرْيَمَ لَطِيفُونَ جِدًّا.", "جِيرَانُ", "Meryem’in komşuları çok nazik."),
  KW("شُرْطِيٌّ", "i", "polis", "شُرْطِيُّونَ", "un", "", "", "يَعْمَلُ شُرْطِيًّا لِلْمُرُورِ.", "شُرْطِيًّا", "Trafik polisi olarak çalışıyor."),
  KW("صَيْدَلَانِيٌّ", "i", "eczacı", "صَيَادِلَةٌ", "diger", "", "", "سُمَيَّةُ صَيْدَلَانِيَّةٌ.", "صَيْدَلَانِيَّةٌ", "Sümeyye eczacı."),
  KW("مُحَامٍ", "i", "avukat", "مُحَامُونَ", "un", "", "", "هُوَ مُحَامٍ، زَوْجَتُهُ مُوَظَّفَةٌ.", "مُحَامٍ", "O avukat, eşi memur."),
  KW("مُوَظَّفٌ", "i", "memur", "مُوَظَّفُونَ", "un", "", "", "زَوْجَتُهُ مُوَظَّفَةٌ فِي مَصْنَعِ الأَدْوِيَةِ.", "مُوَظَّفَةٌ", "Eşi ilaç fabrikasında memur."),
  KW("دَوَاءٌ", "i", "ilaç", "أَدْوِيَةٌ", "efile", "", "", "زَوْجَتُهُ مُوَظَّفَةٌ فِي مَصْنَعِ الأَدْوِيَةِ.", "الأَدْوِيَةِ", "Eşi ilaç fabrikasında memur."),
  KW("خَبَّازٌ", "i", "fırıncı", "خَبَّازُونَ", "un", "", "", "وَالثَّانِي خَبَّازٌ.", "خَبَّازٌ", "İkincisi fırıncı."),
  KW("مُمَرِّضٌ", "i", "hemşire", "مُمَرِّضُونَ", "un", "", "", "بِنْتُهُ الأُولَى مُمَرِّضَةٌ.", "مُمَرِّضَةٌ", "Büyük kızı hemşire."),
  KW("خَيَّاطٌ", "i", "terzi", "خَيَّاطُونَ", "un", "", "", "وَالثَّانِيَةُ خَيَّاطَةٌ.", "خَيَّاطَةٌ", "İkinci kızı terzi."),
  KW("حَلَّاقٌ", "i", "berber", "حَلَّاقُونَ", "un", "", "", "أَنَا حَلَّاقٌ، أَقُصُّ شَعْرَ النَّاسِ.", "حَلَّاقٌ", "Ben berberim, insanların saçını keserim."),
  KW("مِقَصٌّ", "i", "makas", "مَقَاصُّ", "mefail", "", "", "أَقُصُّ شَعْرَ النَّاسِ بِالمِقَصِّ.", "بِالمِقَصِّ", "İnsanların saçını makasla keserim."),
  KW("جَزَّارٌ", "i", "kasap", "جَزَّارُونَ", "un", "قَصَّابٌ", "", "الجَزَّارُ هُوَ الَّذِي يَبِيعُ اللَّحْمَ.", "الجَزَّارُ", "Kasap et satan kişidir."),
  KW("حَدِيدٌ", "i", "demir", "", "", "", "", "الحَدَّادُ يَصْنَعُ أَبْوَابًا مِنَ الحَدِيدِ.", "الحَدِيدِ", "Demirci demirden kapı yapar."),
  KW("خَشَبٌ", "i", "tahta, odun", "أَخْشَابٌ", "efal", "", "", "النَّجَّارُ يَصْنَعُ أَبْوَابًا مِنَ الخَشَبِ.", "الخَشَبِ", "Marangoz tahtadan kapı yapar."),
  KW("خَبَرٌ", "i", "haber", "أَخْبَارٌ", "efal", "", "", "هُوَ يَكْتُبُ الأَخْبَارَ الجَدِيدَةَ.", "الأَخْبَارَ", "Yeni haberleri yazar."),
  KW("سَفِينَةٌ", "i", "gemi", "سُفُنٌ", "fuul_k", "فُلْكٌ", "", "فَصَنَعَ سَفِينَتَهُ المَشْهُورَةَ.", "سَفِينَتَهُ", "Meşhur gemisini yaptı."),
  KW("غَنَمٌ", "i", "koyun (topluluk)", "أَغْنَامٌ", "efal", "", "", "وَعَمِلَ نَبِيُّنَا مُحَمَّدٌ ﷺ بِرَعْيِ الأَغْنَامِ.", "الأَغْنَامِ", "Peygamberimiz koyun güttü."),
  KW("هَادِئٌ", "s", "sakin", "", "", "", "مُزْعِجٌ", "تَسْكُنُ مَرْيَمُ فِي حَيٍّ جَمِيلٍ وَهَادِئٍ.", "وَهَادِئٍ", "Meryem güzel ve sakin bir mahallede oturuyor."),
  KW("لَطِيفٌ", "s", "nazik, hoş", "لُطَفَاءُ", "fuala", "", "", "جِيرَانُ مَرْيَمَ لَطِيفُونَ جِدًّا.", "لَطِيفُونَ", "Meryem’in komşuları çok nazik."),
  KW("مُتَقَاعِدٌ", "s", "emekli", "مُتَقَاعِدُونَ", "un", "", "", "هُوَ مُتَقَاعِدٌ، لَهُ وَلَدٌ وَاحِدٌ.", "مُتَقَاعِدٌ", "O emekli, tek oğlu var."),
  KW("مُطِلٌّ", "s", "-e bakan, nazır", "", "", "مُشْرِفٌ", "", "وَهِيَ مُطِلَّةٌ عَلَى البَحْرِ.", "مُطِلَّةٌ", "Ve denize bakıyor."),
  KW("نِسَائِيٌّ", "s", "kadınlara ait", "", "", "", "رِجَالِيٌّ", "هِيَ تَعْمَلُ فِي قِسْمِ النِّسَائِيَّةِ.", "النِّسَائِيَّةِ", "Kadın doğum bölümünde çalışıyor."),
  KW("صَنَعَ", "f", "yaptı, üretti", "", "", "", "", "يَصْنَعُ الأَثَاثَ، كَالأَبْوَابِ وَالكَرَاسِيِّ.", "يَصْنَعُ", "Kapı, sandalye gibi mobilya yapar."),
  KW("عَالَجَ", "f", "tedavi etti", "", "", "دَاوَى", "", "أَنَا طَبِيبٌ، أُعَالِجُ المَرْضَى.", "أُعَالِجُ", "Ben doktorum, hastaları tedavi ederim."),
  KW("اسْتَأْجَرَ", "f", "kiraladı", "", "", "", "", "اسْتَأْجَرَ شَقَّتَهُ قَبْلَ خَمْسِ سَنَوَاتٍ.", "اسْتَأْجَرَ", "Dairesini beş yıl önce kiraladı."),
  KW("احْتَرَمَ", "f", "saygı gösterdi", "", "", "", "احْتَقَرَ", "أَنَا أَحْتَرِمُ عَمِّي.", "أَحْتَرِمُ", "Amcama saygı duyarım."),
  KW("سَافَرَ", "f", "yolculuk etti", "", "", "", "", "أَنَا طَيَّارٌ، أُسَافِرُ إِلَى بِلَادٍ بَعِيدَةٍ.", "أُسَافِرُ", "Ben pilotum, uzak ülkelere uçarım.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","قُلُوبٌ، دُرُوسٌ"],"efal":["أَفْعَالٌ","ef’âl","أَعْمَالٌ، أَخْبَارٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَدْوِيَةٌ، أَطْعِمَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، رِجَالٌ"],"fuul_k":["فُعُلٌ","fu’ul","سُفُنٌ، كُتُبٌ"],"fial_f":["فِعَلٌ","fi’al","مِهَنٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","شُقَقٌ، غُرَفٌ"],"fuala":["فُعَلَاءُ","fu’alâ","لُطَفَاءُ، وُزَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَطِبَّاءُ"],"fevail":["فَوَاعِلُ","fevâil","طَوَابِقُ، شَوَارِعُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَصَانِعُ، مَقَاصُّ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","فَنَاجِينُ، فَنَادِقُ"],"fual":["فُعَّالٌ","fu’’âl","طُلَّابٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","نَجَّارُونَ، طَيَّارُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","جَامِعَاتٌ، سَيَّارَاتٌ"],"diger":["…","başka kalıplar","جِيرَانٌ، صَيَادِلَةٌ"]};
