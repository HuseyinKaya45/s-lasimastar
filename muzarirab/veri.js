// ================= VERİ: ذَكَاءُ الأَطْفَالِ · muzâri fiilin i'rabı (merfû, mansûb, meczûm) sınıf dersi =================
// Kelime yazımı: "Arapça|Türkçe|rol" · " · " ile ayrılır.
// Roller: mr merfû muzâri, mn mansûb muzâri, mc meczûm muzâri, en nasb edatı, ec cezm edatı, ng fiili etkilemeyen edat (tuzak), em emir.
var ROL = {
  mr: { tr: "Merfû muzâri", k: "Merfû" }, mn: { tr: "Mansûb muzâri", k: "Mansûb" }, mc: { tr: "Meczûm muzâri", k: "Meczûm" },
  en: { tr: "Nasb edatı", k: "Nâsıb" }, ec: { tr: "Cezm edatı", k: "Câzim" }, ng: { tr: "Etkilemeyen edat", k: "Etkisiz" }, em: { tr: "Emir fiil", k: "Emir" }
};
var HAL_ROL = { mr: "r", mn: "n", mc: "c" };
var BASLIK = "ذَكَاءُ الأَطْفَالِ";
var PARA = [1, 2, 3, 4];
// c: [kelime, hâl (r/n/c, edatlarda ""), sebep, alamet, not]
var CUMLE = [
  { p: 1, k: "ذَكَرَ|anlattı · الإِمَامُ|İmam · ابْنُ الجَوْزِيِّ|İbnü’l-Cevzî · فِي|-de · كِتَابِهِ|kitabı · «الأَذْكِيَاءِ»|el-Ezkiyâ · بَعْضَ|bazı · القَصَصِ|kıssalar · الَّتِي|ki onlar · تَدُلُّ|gösterir|mr · عَلَى|-i · ذَكَاءِ|zekâsı · الأَطْفَالِ،|çocuklar · وَمِنْ|ve -den · بَيْنِهَا:|aralarında",
    tr: "İmam İbnü’l-Cevzî «el-Ezkiyâ» (Zekiler) adlı kitabında çocukların zekâsını gösteren bazı kıssalar anlatır; bunlardan bazıları şunlardır:", y: "İmam İbnü’l-Cevzî kitabında çocukların oyunlarını anlatır.",
    c: [["تَدُلُّ", "r", "Önünde nâsıb ya da câzim yok", "ötre", "Sahih fiil; “ki … gösterir”."]],
    n: "تَدُلُّ عَلَى “…-i gösterir”. Fiil القَصَصِ’e uyduğu için تَـ ile başlar. «الأَذْكِيَاءِ» kitabın adıdır ve كِتَابِهِ’ye bağlı olduğu için esre alır." },
  { p: 2, k: "كَانَ|idi · الخَلِيفَةُ|halife · عُمَرُ بْنُ الخَطَّابِ|Ömer b. Hattâb · رَضِيَ اللهُ عَنْهُ|Allah ondan razı olsun · يَمْشِي|yürüyor|mr · فِي|-de · طَرِيقٍ،|bir yol",
    tr: "Halife Ömer b. Hattâb (r.a.) bir yolda yürüyordu.", y: "Halife Ömer b. Hattâb bir bahçede oturuyordu.",
    c: [["يَمْشِي", "r", "Edat yok", "takdiri ötre (ي üzerinde görünmez)", "Sonu ي olan fiil: merfûda hareke görünmez."]],
    n: "كَانَ… يَمْشِي “yürüyordu”: geçmişte süren iş (كَانَ ileride). Metindeki (ض) kısaltması رَضِيَ اللهُ عَنْهُ diye okunur." },
  { p: 2, k: "فَمَرَّ|ve geçti · بِأَطْفَالٍ|çocukların yanından · يَلْعَبُونَ.|oynuyorlardı|mr",
    tr: "Oyun oynayan çocukların yanından geçti.", y: "Ders çalışan çocukların yanına oturdu.",
    c: [["يَلْعَبُونَ", "r", "Edat yok", "nûnun sübûtu (ـُونَ)", "Ef’âl-i hamse: merfûda nûn kalır."]],
    n: "مَرَّ بِـ “…-in yanından geçti”. يَلْعَبُونَ أَطْفَالٍ’ı niteler: “oynayan çocuklar”." },
  { p: 2, k: "وَلَمَّا|ve -ince|ng · رَآهُ|onu gördü · الأَطْفَالُ|çocuklar · جَرَوْا|koştular · بَعِيدًا|uzağa · إِلَّا|hariç · طِفْلًا|çocuk · وَاحِدًا|bir · وَقَفَ|durdu · فِي|-de · مَكَانِهِ.|yeri",
    tr: "Çocuklar onu görünce uzağa koştular; yalnız bir çocuk yerinde durdu.", y: "Çocuklar onu görünce hepsi yerinde durdu.",
    c: [["لَمَّا", "", "Ardından mâzi geliyor: “-ince”", "—", "Bu لَمَّا fiili etkilemez. Câzim لَمَّا muzâri alır: لَمَّا يَبْرُدْ “henüz soğumadı”."]],
    n: "Tuzak: لَمَّا + mâzi = “-ince, -dığı zaman”. جَرَوْا: جَرَى’nın “onlar” çekimi. إِلَّا طِفْلًا “bir çocuk hariç” (istisna, ileride)." },
  { p: 2, k: "فَقَالَ|dedi · لَهُ|ona · عُمَرُ:|Ömer · لِمَاذَا|niçin · لَمْ|-madın|ec · تَجْرِ|koş|mc · مَعَ|ile · أَصْحَابِكَ؟|arkadaşların",
    tr: "Ömer ona dedi ki: Niçin arkadaşlarınla birlikte koşmadın?", y: "Ömer ona dedi ki: Niçin arkadaşlarınla oynamıyorsun?",
    c: [["لَمْ", "", "Cezm edatı", "—", "لَمْ + muzâri: geçmişte olumsuz, “…medi”."], ["تَجْرِ", "c", "لَمْ", "harf-i illetin hazfı (تَجْرِي → تَجْرِ)", "Sonu ي olan fiil meczûm olunca ي düşer, esre kalır."]],
    n: "لَمْ تَجْرِ “koşmadın”: muzâri biçim, geçmiş anlam. Metindeki لماذ yazımı لِمَاذَا olarak düzeltildi." },
  { p: 2, k: "أَجَابَ|cevap verdi · الطِّفْلُ:|çocuk · يَا|ey · أَمِيرَ المُؤْمِنِينَ،|mü’minlerin emîri · لَمْ|-madım|ec · أَعْمَلْ|yap|mc · سُوءًا|kötülük · حَتَّى|ki|en · أَخَافَكَ،|senden korkayım|mn",
    tr: "Çocuk cevap verdi: Ey mü’minlerin emîri, senden korkayım diye bir kötülük yapmadım,", y: "Çocuk cevap verdi: Ey mü’minlerin emîri, bir kötülük yaptım, senden korkuyorum,",
    c: [["أَعْمَلْ", "c", "لَمْ", "sükûn", "Sahih fiil: meczûmda sükûn."], ["حَتَّى", "", "Nasb edatı", "—", "Burada “…sın diye, …ki”."], ["أَخَافَكَ", "n", "حَتَّى", "üstün (zamirden önce)", "Alamet ـكَ zamirinden önceki harfte: أَخَافَـ + كَ."]],
    n: "لَمْ أَعْمَلْ سُوءًا حَتَّى أَخَافَكَ: “senden korkmamı gerektirecek bir kötülük yapmadım”." },
  { p: 2, k: "وَلَيْسَتِ|ve değil · الطَّرِيقُ|yol · ضَيِّقَةً|dar · حَتَّى|ki|en · أَتْرُكَهَا|onu bırakayım|mn · لَكَ!|sana",
    tr: "yol da dar değil ki onu sana bırakayım!", y: "yol çok dar, onu sana bırakıyorum!",
    c: [["أَتْرُكَهَا", "n", "حَتَّى", "üstün (zamirden önce)", "Sahih fiil: mansûbda üstün; ـهَا “onu (yolu)”."]],
    n: "لَيْسَ “değil” ileride işlenecek. الطَّرِيقُ burada dişil kullanılmış (لَيْسَتْ, ضَيِّقَةً): طَرِيقٌ hem müzekker hem müennes olabilir." },
  { p: 2, k: "فَأُعْجِبَ|hayran kaldı · الخَلِيفَةُ|halife · بِذَكَاءِ|zekâsına · الطِّفْلِ.|çocuk",
    tr: "Halife çocuğun zekâsına hayran kaldı.", y: "Halife çocuğa kızdı.",
    c: [], yok: "Bu cümlede muzâri fiil yok: أُعْجِبَ mâzidir.",
    n: "أُعْجِبَ بِـ “…-e hayran kaldı, …-i beğendi”." },
  { p: 2, k: "إِنَّ|şüphesiz · هَذَا|bu · الطِّفْلَ|çocuk · قَدْ|(gerçekten) · أَصْبَحَ|oldu · فِيمَا بَعْدُ|daha sonra · قَائِدًا|komutan · عَظِيمًا،|büyük · وَعَالِمًا|ve âlim · كَبِيرًا،|büyük · وَهُوَ|o da · عَبْدُ اللهِ بْنُ الزُّبَيْرِ|Abdullah b. Zübeyr · رَضِيَ اللهُ عَنْهُ.|r.a.",
    tr: "Bu çocuk daha sonra büyük bir komutan ve büyük bir âlim oldu; o, Abdullah b. Zübeyr’dir (r.a.).", y: "Bu çocuk daha sonra bir tüccar oldu; o, Ömer’in oğludur.",
    c: [], yok: "Muzâri yok: أَصْبَحَ mâzidir. قَدْ mâzi ile “gerçekten, artık” anlamı katar.",
    n: "إِنَّ ve أَصْبَحَ ileride işlenecek. فِيمَا بَعْدُ “daha sonra” (بَعْدُ ötreli kalır)." },
  { p: 3, k: "جَلَسَ|oturdu · طِفْلٌ|bir çocuk · مَعَ|ile · بَعْضِ|bazı · الرِّجَالِ|adamlar · وَهُمْ|onlar … iken · يَأْكُلُونَ،|yiyorlar|mr · فَبَكَى.|ve ağladı",
    tr: "Bir çocuk, yemek yerlerken bazı adamlarla birlikte oturdu ve ağladı.", y: "Bir çocuk adamlarla oturup güldü.",
    c: [["يَأْكُلُونَ", "r", "Edat yok", "nûnun sübûtu", "Ef’âl-i hamse merfû: nûn kalır."]],
    n: "وَهُمْ يَأْكُلُونَ “onlar yerken” (hâl cümlesi). بَكَى mâzi; muzârisi يَبْكِي." },
  { p: 3, k: "قَالُوا:|dediler · لِمَاذَا|niçin · تَبْكِي؟|ağlıyorsun|mr",
    tr: "Niçin ağlıyorsun? dediler.", y: "Niçin gülüyorsun? dediler.",
    c: [["تَبْكِي", "r", "Edat yok", "takdiri ötre", "Sonu ي: merfûda hareke görünmez."]],
    n: "لِمَاذَا soru kelimesidir, fiili etkilemez." },
  { p: 3, k: "قَالَ:|dedi · الطَّعَامُ|yemek · حَارٌّ!|sıcak",
    tr: "Yemek sıcak! dedi.", y: "Yemek soğuk! dedi.",
    c: [], yok: "Muzâri yok; isim cümlesi.",
    n: "الطَّعَامُ حَارٌّ: mübtedâ ve haber." },
  { p: 3, k: "قَالُوا:|dediler · اُتْرُكْهُ|onu bırak|em · حَتَّى|-e kadar|en · يَبْرُدَ!|soğusun|mn",
    tr: "Soğuyana kadar onu bırak! dediler.", y: "Onu hemen ye! dediler.",
    c: [["اُتْرُكْ", "", "Emir", "sükûn (emir)", "Emir muzâriden yapılır ve sükûnla biter; ama muzâri değildir, edatla meczûm olmamıştır."], ["يَبْرُدَ", "n", "حَتَّى", "üstün", "Burada حَتَّى “-e kadar”."]],
    n: "حَتَّى iki anlamda gelir: “-e kadar” (حَتَّى يَبْرُدَ) ve “…sın diye” (حَتَّى أَخَافَكَ). İkisinde de muzâri mansûbdur." },
  { p: 3, k: "قَالَ:|dedi · إِذَا|-ırsam|ng · أَنَا|ben · تَرَكْتُهُ|onu bıraktım · فَأَنْتُمْ|siz · لَا|-mazsınız|ng · تَتْرُكُونَهُ!|onu bırakırsınız|mr",
    tr: "Ben onu bırakırsam siz bırakmazsınız! dedi.", y: "Ben onu bırakırsam siz de bırakırsınız! dedi.",
    c: [["إِذَا", "", "Şart (mâzi ile)", "—", "إِذَا fiili cezm etmez."], ["لَا", "", "lâ-i nâfiye (olumsuzluk)", "—", "Olumsuzluk لَا’sı fiili etkilemez."], ["تَتْرُكُونَهُ", "r", "Edat yok (لَا nâfiye)", "nûnun sübûtu", "Nûn duruyor: fiil merfû."]],
    n: "Tuzak: لَا تَتْرُكُونَهُ’de nûn duruyor; demek ki bu لَا nehiy değil, nefy. Nehiy olsaydı لَا تَتْرُكُوهُ “bırakmayın!” olurdu." },
  { p: 4, k: "قَالَ|dedi · الأَصْمَعِيُّ:|Asmaî · قُلْتُ|dedim · لِغُلَامٍ|bir oğlana · صَغِيرٍ|küçük · مِنْ|-den · أَبْنَاءِ|çocukları · العَرَبِ:|Araplar",
    tr: "Asmaî dedi ki: Arap çocuklarından küçük bir oğlana dedim ki:", y: "Asmaî dedi ki: Yaşlı bir adama sordum:",
    c: [], yok: "Muzâri yok; قَالَ ve قُلْتُ mâzidir.",
    n: "الأَصْمَعِيُّ meşhur bir dil âlimidir. غُلَامٌ “oğlan, delikanlı”." },
  { p: 4, k: "أَيَسُرُّكَ|seni sevindirir mi|mr · أَنْ|-ması|en · يَكُونَ|olması|mn · لَكَ|senin · مِئَةُ|yüz · أَلْفِ|bin · دِرْهَمٍ|dirhem · وَأَنْتَ|sen … iken · أَحْمَقُ؟|ahmak",
    tr: "Ahmak olduğun hâlde yüz bin dirhemin olması seni sevindirir mi?", y: "Akıllı olup yüz dirhemin olması seni üzer mi?",
    c: [["يَسُرُّكَ", "r", "Edat yok (أَ soru hemzesi)", "ötre (zamirden önce)", "Soru hemzesi fiili etkilemez."], ["أَنْ", "", "Nasb edatı", "—", "أَنْ + muzâri = mastar anlamı: “olması”."], ["يَكُونَ", "n", "أَنْ", "üstün", "Sahih sonlu: üstün görünür."]],
    n: "أَنْ يَكُونَ لَكَ… “senin … olması”. مِئَةُ أَلْفِ “yüz bin”. وَأَنْتَ أَحْمَقُ “sen ahmak iken” (hâl)." },
  { p: 4, k: "قَالَ:|dedi · لَا|hayır|ng · وَاللهِ!|vallahi",
    tr: "Hayır, vallahi! dedi.", y: "Evet, vallahi! dedi.",
    c: [["لَا", "", "Cevap: “hayır”", "—", "Ardından fiil yok; cevap لَا’sı."]],
    n: "لَا وَاللهِ “hayır, vallahi”." },
  { p: 4, k: "قُلْتُ|dedim · لَهُ:|ona · وَلِمَاذَا؟|peki niçin",
    tr: "Ona: Peki niçin? dedim.", y: "Ona: Peki ne zaman? dedim.",
    c: [], yok: "Muzâri yok.",
    n: "وَلِمَاذَا “peki niçin?”." },
  { p: 4, k: "قَالَ:|dedi · أَخَافُ|korkarım|mr · أَنْ|-masından|en · يَقْضِيَ|yok etmesi|mn · حُمْقِي|ahmaklığım · عَلَى|-i · مَالِي|malım · وَيَبْقَى|ve kalması|mn · حُمْقِي.|ahmaklığım",
    tr: "Ahmaklığımın malımı yok edip ahmaklığımın kalmasından korkarım, dedi.", y: "Malımın ahmaklığımı yok etmesinden korkarım, dedi.",
    c: [["أَخَافُ", "r", "Edat yok", "ötre", "Sonu sahih: ötre görünür."], ["يَقْضِيَ", "n", "أَنْ", "üstün (ي üzerinde görünür)", "Sonu ي olan fiil mansûbda üstünü gösterir."], ["يَبْقَى", "n", "أَنْ (و ile bağlı)", "takdiri üstün (elifte görünmez)", "يَقْضِيَ’ye bağlı olduğu için o da mansûb."]],
    n: "قَضَى عَلَى “…-i yok etti, bitirdi”. Cevabın inceliği: para biter, ahmaklık kalır." }
];
// Kelime kartları: [Arapça, Türkçe, çoğul ya da muzâri, zıt]
var KELIME = [
  ["ذَكَاءٌ", "zekâ", "", "غَبَاءٌ"], ["ذَكِيٌّ", "zeki", "أَذْكِيَاءُ", "غَبِيٌّ"], ["طِفْلٌ", "çocuk", "أَطْفَالٌ", ""], ["ذَكَرَ", "andı, anlattı", "يَذْكُرُ", "نَسِيَ"],
  ["إِمَامٌ", "imam, önder", "أَئِمَّةٌ", ""], ["قِصَّةٌ", "kıssa, hikâye", "قِصَصٌ", ""], ["دَلَّ عَلَى", "gösterdi", "يَدُلُّ", ""], ["خَلِيفَةٌ", "halife", "خُلَفَاءُ", ""],
  ["مَشَى", "yürüdü", "يَمْشِي", "وَقَفَ"], ["طَرِيقٌ", "yol", "طُرُقٌ", ""], ["مَرَّ بِـ", "-in yanından geçti", "يَمُرُّ", ""], ["لَعِبَ", "oynadı", "يَلْعَبُ", ""],
  ["رَأَى", "gördü", "يَرَى", ""], ["جَرَى", "koştu", "يَجْرِي", "وَقَفَ"], ["بَعِيدٌ", "uzak", "", "قَرِيبٌ"], ["وَقَفَ", "durdu", "يَقِفُ", "جَلَسَ"],
  ["مَكَانٌ", "yer", "أَمَاكِنُ", ""], ["صَاحِبٌ", "arkadaş", "أَصْحَابٌ", ""], ["أَجَابَ", "cevap verdi", "يُجِيبُ", "سَأَلَ"], ["أَمِيرٌ", "emîr, başkan", "أُمَرَاءُ", ""],
  ["مُؤْمِنٌ", "mü’min", "مُؤْمِنُونَ", ""], ["عَمِلَ", "yaptı, çalıştı", "يَعْمَلُ", ""], ["سُوءٌ", "kötülük", "", "خَيْرٌ"], ["خَافَ", "korktu", "يَخَافُ", ""],
  ["ضَيِّقٌ", "dar", "", "وَاسِعٌ"], ["تَرَكَ", "bıraktı", "يَتْرُكُ", "أَخَذَ"], ["أُعْجِبَ بِـ", "-e hayran kaldı", "يُعْجَبُ", ""], ["قَائِدٌ", "komutan, önder", "قَادَةٌ", ""],
  ["عَظِيمٌ", "büyük, ulu", "عُظَمَاءُ", "حَقِيرٌ"], ["عَالِمٌ", "âlim", "عُلَمَاءُ", "جَاهِلٌ"], ["جَلَسَ", "oturdu", "يَجْلِسُ", "قَامَ"], ["رَجُلٌ", "adam", "رِجَالٌ", "اِمْرَأَةٌ"],
  ["أَكَلَ", "yedi", "يَأْكُلُ", ""], ["بَكَى", "ağladı", "يَبْكِي", "ضَحِكَ"], ["طَعَامٌ", "yemek", "أَطْعِمَةٌ", ""], ["حَارٌّ", "sıcak", "", "بَارِدٌ"],
  ["بَرَدَ", "soğudu", "يَبْرُدُ", ""], ["غُلَامٌ", "oğlan", "غِلْمَانٌ", ""], ["اِبْنٌ", "oğul", "أَبْنَاءٌ", "بِنْتٌ"], ["سَرَّ", "sevindirdi", "يَسُرُّ", "أَحْزَنَ"],
  ["أَلْفٌ", "bin", "آلَافٌ", ""], ["دِرْهَمٌ", "dirhem (gümüş para)", "دَرَاهِمُ", ""], ["أَحْمَقُ", "ahmak", "حَمْقَى", "عَاقِلٌ"], ["حُمْقٌ", "ahmaklık", "", "عَقْلٌ"],
  ["قَضَى عَلَى", "yok etti, bitirdi", "يَقْضِي", ""], ["مَالٌ", "mal, para", "أَمْوَالٌ", ""], ["بَقِيَ", "kaldı", "يَبْقَى", "ذَهَبَ"], ["فِيمَا بَعْدُ", "daha sonra", "", ""]
];
// Kaide kartları
var KAIDE = [
  ["Muzâri üç hâlde", "Muzâri fiil <b class=\"c-mr\">merfû</b>, <b class=\"c-mn\">mansûb</b> ya da <b class=\"c-mc\">meczûm</b> olur. Hâlini önündeki edat belirler. (İsimde mecrûr, fiilde meczûm vardır.)"],
  ["Merfû", "Önünde nasb ya da cezm edatı yoksa merfûdur: <span class=\"ar\">تَدُلُّ · يَمْشِي · يَلْعَبُونَ · أَخَافُ</span>. Olumsuzluk <span class=\"ar\">لَا</span>’sı, soru, <span class=\"ar\">سَ / سَوْفَ / قَدْ</span> fiili etkilemez: <span class=\"ar\">لَا تَتْرُكُونَهُ</span>."],
  ["Nasb edatları", "<table class=\"mini\"><tr><td class=\"ar\">أَنْ</td><td>-mek, -mesi</td><td class=\"ar\">أَنْ يَكُونَ</td></tr><tr><td class=\"ar\">لَنْ</td><td>asla …meyecek</td><td class=\"ar\">لَنْ أَتْرُكَهُ</td></tr><tr><td class=\"ar\">كَيْ</td><td>…sın diye</td><td class=\"ar\">كَيْ أَتَعَلَّمَ</td></tr><tr><td class=\"ar\">حَتَّى</td><td>-e kadar, …sın diye</td><td class=\"ar\">حَتَّى يَبْرُدَ</td></tr><tr><td class=\"ar\">لِـ</td><td>için</td><td class=\"ar\">لِأَتَعَلَّمَ</td></tr></table>"],
  ["Cezm edatları", "<table class=\"mini\"><tr><td class=\"ar\">لَمْ</td><td>…medi (geçmiş olumsuz)</td><td class=\"ar\">لَمْ أَعْمَلْ</td></tr><tr><td class=\"ar\">لَمَّا</td><td>henüz …medi</td><td class=\"ar\">لَمَّا يَبْرُدْ</td></tr><tr><td class=\"ar\">لَا</td><td>…me! (yasak, nehiy)</td><td class=\"ar\">لَا تَجْرِ</td></tr><tr><td class=\"ar\">لِـ</td><td>…sın (emir)</td><td class=\"ar\">لِيَكْتُبْ</td></tr></table>"],
  ["Sahih fiilde alametler", "<table class=\"mini\"><tr><td>Merfû</td><td>ötre</td><td class=\"ar\">يَعْمَلُ</td></tr><tr><td>Mansûb</td><td>üstün</td><td class=\"ar\">أَنْ يَعْمَلَ</td></tr><tr><td>Meczûm</td><td>sükûn</td><td class=\"ar\">لَمْ يَعْمَلْ</td></tr></table>Meczûm fiil ال ile başlayan kelimeye kavuşunca esre alır: <span class=\"ar\">لَمْ يَعْمَلِ الطِّفْلُ</span>."],
  ["Sonu ي ya da و olan fiil", "Merfûda hareke görünmez: <span class=\"ar\">يَمْشِي · تَبْكِي · يَدْعُو</span>. Mansûbda üstün görünür: <span class=\"ar\">أَنْ يَقْضِيَ · أَنْ يَدْعُوَ</span>. Meczûmda son harf düşer: <span class=\"ar\">لَمْ تَجْرِ · لَا تَبْكِ · لَمْ يَدْعُ</span>."],
  ["Sonu elif olan fiil", "<span class=\"ar\">يَبْقَى · يَنْسَى</span>: merfû ve mansûbda hareke görünmez (<span class=\"ar\">أَنْ… وَيَبْقَى</span>). Meczûmda elif düşer: <span class=\"ar\">لَمْ يَبْقَ</span>."],
  ["Ef’âl-i hamse", "<span class=\"ar\">يَفْعَلُونَ · تَفْعَلُونَ · يَفْعَلَانِ · تَفْعَلَانِ · تَفْعَلِينَ</span>. Merfûda nûn kalır: <span class=\"ar\">يَلْعَبُونَ · لَا تَتْرُكُونَهُ</span>. Mansûb ve meczûmda nûn düşer: <span class=\"ar\">لَنْ يَلْعَبُوا · لَا تَتْرُكُوهُ</span>. و’dan sonra elif yazılır; zamir gelince yazılmaz."],
  ["Zamir bitişince", "Alamet zamirden önceki harftedir: <span class=\"ar\">أَخَافَـ<b class=\"c-mn\">كَ</b> · أَتْرُكَـ<b class=\"c-mn\">هَا</b> · يَسُرُّ<b class=\"c-mr\">كَ</b></span>."],
  ["Tuzaklar", "<span class=\"ar\">لَمَّا</span> + mâzi “-ince” etkilemez: <span class=\"ar\">وَلَمَّا رَآهُ</span>. <span class=\"ar\">إِذَا</span> etkilemez. Cevap <span class=\"ar\">لَا</span>’sı “hayır”: <span class=\"ar\">لَا وَاللهِ</span>. Olumsuzluk <span class=\"ar\">لَا</span>’sı merfû bırakır (<span class=\"ar\">لَا تَتْرُكُونَهُ</span>), yasak <span class=\"ar\">لَا</span>’sı cezm eder (<span class=\"ar\">لَا تَتْرُكُوهُ</span>). Emir (<span class=\"ar\">اُتْرُكْهُ</span>) muzâri değildir."],
  ["Bağlanan fiil de aynı hâlde", "و ile bağlanan muzâri öncekinin hâlini alır: <span class=\"ar\">أَنْ <b class=\"c-mn\">يَقْضِيَ</b>… وَ<b class=\"c-mn\">يَبْقَى</b></span> (ikisi de mansûb)."],
  ["Özet", "<table class=\"mini\"><tr><th></th><th>Merfû</th><th>Mansûb</th><th>Meczûm</th></tr><tr><td>Sahih</td><td class=\"ar\">يَعْمَلُ</td><td class=\"ar\">يَعْمَلَ</td><td class=\"ar\">يَعْمَلْ</td></tr><tr><td>Sonu ي / و</td><td class=\"ar\">يَمْشِي</td><td class=\"ar\">يَمْشِيَ</td><td class=\"ar\">يَمْشِ</td></tr><tr><td>Sonu elif</td><td class=\"ar\">يَبْقَى</td><td class=\"ar\">يَبْقَى</td><td class=\"ar\">يَبْقَ</td></tr><tr><td>Ef’âl-i hamse</td><td class=\"ar\">يَلْعَبُونَ</td><td class=\"ar\">يَلْعَبُوا</td><td class=\"ar\">يَلْعَبُوا</td></tr></table>"]
];
// Hâlini bul: [cümle ({} içindeki fiil), hâl, açıklama]
var HALBUL = [
  ["لِمَاذَا لَمْ {تَجْرِ} مَعَ أَصْحَابِكَ؟", "c", "لَمْ’den sonra; ي düşmüş."], ["مَرَّ بِأَطْفَالٍ {يَلْعَبُونَ}.", "r", "Edat yok; nûn duruyor."],
  ["اُتْرُكْهُ حَتَّى {يَبْرُدَ}.", "n", "حَتَّى’dan sonra; üstün."], ["فَأَنْتُمْ لَا {تَتْرُكُونَهُ}.", "r", "لَا nâfiye etkilemez; nûn duruyor."],
  ["أَخَافُ أَنْ {يَقْضِيَ} حُمْقِي عَلَى مَالِي.", "n", "أَنْ’den sonra; ي üzerinde üstün."], ["أَنْ يَقْضِيَ حُمْقِي عَلَى مَالِي وَ{يَبْقَى} حُمْقِي.", "n", "Mansûba bağlı; elifte takdiri."],
  ["لِمَاذَا {تَبْكِي}؟", "r", "Edat yok; takdiri ötre."], ["لَمْ {أَعْمَلْ} سُوءًا.", "c", "لَمْ’den sonra; sükûn."],
  ["لَا {تَتْرُكُوا} الطَّعَامَ!", "c", "Yasak لَا’sı; nûn düşmüş."], ["لَنْ {يَلْعَبُوا} اليَوْمَ.", "n", "لَنْ’den sonra; nûn düşmüş."],
  ["كَانَ عُمَرُ {يَمْشِي} فِي طَرِيقٍ.", "r", "Edat yok (كَانَ nasb etmez)."], ["لَمْ {يَبْقَ} مَالٌ.", "c", "لَمْ’den sonra; elif düşmüş."],
  ["أَيَسُرُّكَ أَنْ {يَكُونَ} لَكَ مَالٌ؟", "n", "أَنْ’den sonra; üstün."], ["لَمَّا {يَبْرُدِ} الطَّعَامُ.", "c", "Muzâri alan لَمَّا “henüz” câzimdir; sükûn ال’den önce esre olmuş."],
  ["{أَخَافُ} أَنْ يَبْقَى حُمْقِي.", "r", "Önünde edat yok."], ["جِئْتُ كَيْ {أَتَعَلَّمَ}.", "n", "كَيْ’den sonra; üstün."]
];
// Edatı seç: [cümle ___, doğru, yanlış1, yanlış2, açıklama]
var EDAT = [
  ["___ أَعْمَلْ سُوءًا.", "لَمْ", "لَنْ", "أَنْ", "Fiil sükûnlu → câzim: لَمْ “yapmadım”."],
  ["أُرِيدُ ___ أَلْعَبَ.", "أَنْ", "لَمْ", "لَا", "Üstün → nâsıb: “oynamak istiyorum”."],
  ["___ تَجْرِ فِي الطَّرِيقِ!", "لَا", "لَنْ", "أَنْ", "ي düşmüş ve ünlem: yasak لَا’sı."],
  ["___ أَتْرُكَ الطَّعَامَ.", "لَنْ", "لَمْ", "لَا", "Üstün → لَنْ “bırakmayacağım”."],
  ["الأَطْفَالُ ___ يَلْعَبُونَ.", "لَا", "لَمْ", "لَنْ", "Nûn duruyor → merfû; yalnız olumsuzluk لَا’sı uyar."],
  ["هُمْ ___ يَلْعَبُوا أَمْسِ.", "لَمْ", "سَوْفَ", "قَدْ", "Nûn düşmüş ve “dün”: لَمْ."],
  ["اُتْرُكْهُ ___ يَبْرُدَ.", "حَتَّى", "لَمْ", "لَا", "Üstün; “soğuyana kadar”."],
  ["جِئْتُ إِلَى المَدْرَسَةِ ___ أَتَعَلَّمَ.", "كَيْ", "لَمْ", "لَا", "Üstün; “öğreneyim diye”."],
  ["___ يَبْقَ شَيْءٌ.", "لَمْ", "لَنْ", "أَنْ", "Elif düşmüş → câzim."],
  ["أَخَافُ ___ يَقْضِيَ حُمْقِي عَلَى مَالِي.", "أَنْ", "لَمْ", "لَا", "Üstün görünüyor → nâsıb."],
  ["إِذَا تَرَكْتُهُ فَأَنْتُمْ ___ تَتْرُكُونَهُ.", "لَا", "لَمْ", "لَنْ", "Nûn kaldı → etkilemeyen لَا."],
  ["___ تَبْكِيَ يَا وَلَدِي.", "لَنْ", "لَمْ", "لَا", "ي üzerinde üstün → nâsıb: “ağlamayacaksın”."]
];
// Doğru biçimi seç
var BICIM = [
  ["لِمَاذَا لَمْ ___ مَعَ أَصْحَابِكَ؟", "تَجْرِ", "تَجْرِي", "تَجْرِيَ", "لَمْ + sonu ي → ي düşer."],
  ["لَمْ ___ سُوءًا.", "أَعْمَلْ", "أَعْمَلُ", "أَعْمَلَ", "لَمْ + sahih → sükûn."],
  ["لَيْسَتِ الطَّرِيقُ ضَيِّقَةً حَتَّى ___ لَكَ.", "أَتْرُكَهَا", "أَتْرُكُهَا", "أَتْرُكْهَا", "حَتَّى → üstün, zamirden önce."],
  ["اُتْرُكْهُ حَتَّى ___ .", "يَبْرُدَ", "يَبْرُدُ", "يَبْرُدْ", "حَتَّى → üstün."],
  ["إِذَا تَرَكْتُهُ فَأَنْتُمْ لَا ___ .", "تَتْرُكُونَهُ", "تَتْرُكُوهُ", "تَتْرُكْهُ", "Olumsuzluk لَا’sı → merfû, nûn kalır."],
  ["مَرَّ بِأَطْفَالٍ ___ .", "يَلْعَبُونَ", "يَلْعَبُوا", "يَلْعَبُ", "Edat yok → merfû: ـُونَ."],
  ["أَيَسُرُّكَ أَنْ ___ لَكَ مَالٌ؟", "يَكُونَ", "يَكُونُ", "يَكُنْ", "أَنْ → üstün."],
  ["أَخَافُ أَنْ ___ حُمْقِي عَلَى مَالِي.", "يَقْضِيَ", "يَقْضِي", "يَقْضِ", "أَنْ + sonu ي → üstün görünür."],
  ["لَا ___ يَا وَلَدِي!", "تَبْكِ", "تَبْكِي", "تَبْكِيَ", "Yasak لَا’sı + sonu ي → ي düşer."],
  ["لَنْ ___ اليَوْمَ. (هُمْ)", "يَلْعَبُوا", "يَلْعَبُونَ", "يَلْعَبُو", "لَنْ → nûn düşer, و’dan sonra elif yazılır."],
  ["لَمْ ___ شَيْءٌ.", "يَبْقَ", "يَبْقَى", "يَبْقَا", "لَمْ + sonu elif → elif düşer."],
  ["لَا ___ الطَّعَامَ! (أَنْتُمْ)", "تَتْرُكُوا", "تَتْرُكُونَ", "تَتْرُكُو", "Yasak → nûn düşer, elif yazılır."],
  ["يَجِبُ أَنْ ___ إِلَى المَدْرَسَةِ. (أَنْتِ)", "تَذْهَبِي", "تَذْهَبِينَ", "تَذْهَبْ", "أَنْ + أَنْتِ → nûn düşer: تَذْهَبِي."],
  ["لَمْ ___ مَعَهُمْ. (أَنَا)", "أَمْشِ", "أَمْشِي", "أَمْشِيَ", "لَمْ + sonu ي → ي düşer."]
];
// Bu edat ne yapar? [cümle ({} içinde edat), n / c / x, açıklama]
var TUZAK = [
  ["{لَمْ} تَجْرِ", "c", "لَمْ her zaman cezm eder."], ["فَأَنْتُمْ {لَا} تَتْرُكُونَهُ", "x", "Olumsuzluk لَا’sı; nûn duruyor."],
  ["{لَا} تَجْرِ!", "c", "Yasak لَا’sı; ي düşmüş."], ["وَ{لَمَّا} رَآهُ الأَطْفَالُ", "x", "Mâzi ile “-ince”."],
  ["{لَمَّا} يَبْرُدِ الطَّعَامُ", "c", "Muzâri ile “henüz …medi”."], ["{إِذَا} أَنَا تَرَكْتُهُ", "x", "إِذَا cezm etmez."],
  ["اُتْرُكْهُ {حَتَّى} يَبْرُدَ", "n", "حَتَّى + muzâri: mansûb."], ["{لَنْ} أَتْرُكَهُ", "n", "لَنْ nasb eder."],
  ["أَيَسُرُّكَ {أَنْ} يَكُونَ", "n", "أَنْ nasb eder."], ["{قَدْ} يَأْتِي", "x", "قَدْ etkilemez; “belki gelir”."],
  ["{سَوْفَ} أَلْعَبُ", "x", "سَوْفَ etkilemez."], ["قَالَ: {لَا} وَاللهِ", "x", "Cevap لَا’sı “hayır”."],
  ["{كَيْ} أَتَعَلَّمَ", "n", "كَيْ nasb eder."], ["{لِ}يَكْتُبْ كُلُّ طَالِبٍ", "c", "Emir lâmı cezm eder: “her öğrenci yazsın”."],
  ["جِئْتُ {لِ}أَتَعَلَّمَ", "n", "“için” anlamındaki lâm nasb eder."]
];
var TUZAK_AD = { n: "Nasb eder", c: "Cezm eder", x: "Etkilemez" };
var DONUSTUR = [
  ["أَعْمَلُ سُوءًا ← لَمْ", "لَمْ أَعْمَلْ سُوءًا", "لَمْ أَعْمَلُ سُوءًا", "لَمْ أَعْمَلَ سُوءًا", "Sahih + لَمْ → sükûn."],
  ["تَجْرِي ← لَمْ", "لَمْ تَجْرِ", "لَمْ تَجْرِي", "لَمْ تَجْرِيَ", "ي düşer."],
  ["يَلْعَبُونَ ← لَنْ", "لَنْ يَلْعَبُوا", "لَنْ يَلْعَبُونَ", "لَنْ يَلْعَبُو", "Nûn düşer, elif yazılır."],
  ["تَتْرُكُونَهُ ← لَا (yasak)", "لَا تَتْرُكُوهُ", "لَا تَتْرُكُونَهُ", "لَا تَتْرُكْهُ", "Nûn düşer; zamir varken elif yazılmaz. تَتْرُكْهُ tekil olur."],
  ["يَبْرُدُ ← حَتَّى", "حَتَّى يَبْرُدَ", "حَتَّى يَبْرُدُ", "حَتَّى يَبْرُدْ", "Üstün."],
  ["يَبْقَى ← لَمْ", "لَمْ يَبْقَ", "لَمْ يَبْقَى", "لَمْ يَبْقَيْ", "Elif düşer."],
  ["يَمْشِي ← أَنْ", "أَنْ يَمْشِيَ", "أَنْ يَمْشِي", "أَنْ يَمْشِ", "Üstün ي üzerinde görünür."],
  ["تَبْكِينَ ← لَا (yasak)", "لَا تَبْكِي", "لَا تَبْكِينَ", "لَا تَبْكِ", "أَنْتِ: nûn düşer, ي (zamir) kalır."],
  ["يَأْكُلَانِ ← أَنْ", "أَنْ يَأْكُلَا", "أَنْ يَأْكُلَانِ", "أَنْ يَأْكُلَانَ", "İkilde de nûn düşer."],
  ["يَدْعُو ← لَمْ", "لَمْ يَدْعُ", "لَمْ يَدْعُو", "لَمْ يَدْعُوَ", "و düşer."]
];
var DY = [
  ["ذَكَرَ ابْنُ الجَوْزِيِّ قَصَصًا عَنْ ذَكَاءِ الأَطْفَالِ.", true, "Metinde geçer."], ["كَانَ عُمَرُ يَمْشِي فِي السُّوقِ.", false, "فِي طَرِيقٍ"],
  ["جَرَى كُلُّ الأَطْفَالِ بَعِيدًا.", false, "إِلَّا طِفْلًا وَاحِدًا"], ["لَمْ يَعْمَلِ الطِّفْلُ سُوءًا.", true, "Metinde geçer."],
  ["كَانَتِ الطَّرِيقُ ضَيِّقَةً.", false, "لَيْسَتِ الطَّرِيقُ ضَيِّقَةً"], ["أَصْبَحَ الطِّفْلُ قَائِدًا عَظِيمًا وَعَالِمًا كَبِيرًا.", true, "Metinde geçer."],
  ["بَكَى الطِّفْلُ لِأَنَّ الطَّعَامَ بَارِدٌ.", false, "الطَّعَامُ حَارٌّ"], ["قَالَ الرِّجَالُ: اُتْرُكْهُ حَتَّى يَبْرُدَ.", true, "Metinde geçer."],
  ["يَسُرُّ الغُلَامَ أَنْ يَكُونَ لَهُ مَالٌ وَهُوَ أَحْمَقُ.", false, "لَا وَاللهِ"], ["يَخَافُ الغُلَامُ أَنْ يَبْقَى حُمْقُهُ.", true, "Metinde geçer."],
  ["الطِّفْلُ الَّذِي جَرَى هُوَ عَبْدُ اللهِ بْنُ الزُّبَيْرِ.", false, "وَقَفَ فِي مَكَانِهِ"]
];
var SORU = [
  ["مَاذَا ذَكَرَ ابْنُ الجَوْزِيِّ فِي كِتَابِهِ؟", "ذَكَرَ قَصَصًا تَدُلُّ عَلَى ذَكَاءِ الأَطْفَالِ.", "İbnü’l-Cevzî kitabında ne anlattı?"],
  ["مَاذَا فَعَلَ الأَطْفَالُ لَمَّا رَأَوْا عُمَرَ؟", "جَرَوْا بَعِيدًا إِلَّا طِفْلًا وَاحِدًا.", "Çocuklar Ömer’i görünce ne yaptı?"],
  ["لِمَاذَا لَمْ يَجْرِ الطِّفْلُ؟", "لِأَنَّهُ لَمْ يَعْمَلْ سُوءًا، وَلَيْسَتِ الطَّرِيقُ ضَيِّقَةً.", "Çocuk niçin koşmadı?"],
  ["مَنْ هَذَا الطِّفْلُ؟", "هُوَ عَبْدُ اللهِ بْنُ الزُّبَيْرِ.", "Bu çocuk kimdir?"],
  ["لِمَاذَا بَكَى الطِّفْلُ؟", "بَكَى لِأَنَّ الطَّعَامَ حَارٌّ.", "Çocuk niçin ağladı?"],
  ["مَاذَا قَالَ الرِّجَالُ؟", "قَالُوا: اُتْرُكْهُ حَتَّى يَبْرُدَ.", "Adamlar ne dedi?"],
  ["لِمَاذَا لَا يَتْرُكُ الطِّفْلُ الطَّعَامَ؟", "لِأَنَّ الرِّجَالَ لَا يَتْرُكُونَهُ.", "Çocuk yemeği niçin bırakmıyor?"],
  ["مَاذَا سَأَلَ الأَصْمَعِيُّ الغُلَامَ؟", "سَأَلَهُ: أَيَسُرُّكَ أَنْ يَكُونَ لَكَ مِئَةُ أَلْفِ دِرْهَمٍ وَأَنْتَ أَحْمَقُ؟", "Asmaî oğlana ne sordu?"],
  ["مِمَّ يَخَافُ الغُلَامُ؟", "يَخَافُ أَنْ يَقْضِيَ حُمْقُهُ عَلَى مَالِهِ وَيَبْقَى حُمْقُهُ.", "Oğlan neden korkuyor?"]
];
// Türkçeden Arapçaya: [Türkçe, Arapça, ipucu]
var TRANSFER = [
  ["Kötülük yapmadım.", "لَمْ أَعْمَلْ سُوءًا.", "لَمْ + sükûn"], ["Niçin koşmadın?", "لِمَاذَا لَمْ تَجْرِ؟", "لَمْ: ي düşer"],
  ["Koşma!", "لَا تَجْرِ!", "Yasak لَا’sı: ي düşer"], ["Çocuklar oynuyorlar.", "الأَطْفَالُ يَلْعَبُونَ.", "Merfû: nûn kalır"],
  ["Onlar oynamadılar.", "هُمْ لَمْ يَلْعَبُوا.", "Nûn düşer, elif yazılır"], ["Soğuyana kadar bekle.", "اِنْتَظِرْ حَتَّى يَبْرُدَ.", "حَتَّى + üstün"],
  ["Yemeği bırakmayacağım.", "لَنْ أَتْرُكَ الطَّعَامَ.", "لَنْ + üstün"], ["Ağlamanı istemiyorum.", "لَا أُرِيدُ أَنْ تَبْكِيَ.", "أَنْ: üstün ي üzerinde görünür"],
  ["Ağlama!", "لَا تَبْكِ!", "Yasak: ي düşer"], ["Malın kalmasını istiyorum.", "أُرِيدُ أَنْ يَبْقَى المَالُ.", "Elifte hareke görünmez"],
  ["Siz yemeği bırakmazsınız.", "أَنْتُمْ لَا تَتْرُكُونَ الطَّعَامَ.", "Olumsuzluk لَا’sı: nûn kalır"], ["Yemeği bırakmayın!", "لَا تَتْرُكُوا الطَّعَامَ!", "Yasak: nûn düşer"]
];
// Fiiller: m mâzi, ts Türkçe kök, b tekil gövde (önek sonrası), t s sahih / y sonu ي / w sonu و / a sonu elif, h ef'âl-i hamse merfû gövdeleri [هُمْ-أَنْتُمْ, هُمَا, أَنْتِ]
var FIIL = {
  ktb: { m: "كَتَبَ", tr: "yazmak", ts: "yaz", b: "كْتُب", t: "s", h: ["كْتُبُونَ", "كْتُبَانِ", "كْتُبِينَ"] },
  lab: { m: "لَعِبَ", tr: "oynamak", ts: "oyna", b: "لْعَب", t: "s", h: ["لْعَبُونَ", "لْعَبَانِ", "لْعَبِينَ"] },
  trk: { m: "تَرَكَ", tr: "bırakmak", ts: "bırak", b: "تْرُك", t: "s", h: ["تْرُكُونَ", "تْرُكَانِ", "تْرُكِينَ"] },
  jls: { m: "جَلَسَ", tr: "oturmak", ts: "otur", b: "جْلِس", t: "s", h: ["جْلِسُونَ", "جْلِسَانِ", "جْلِسِينَ"] },
  aml: { m: "عَمِلَ", tr: "çalışmak", ts: "çalış", b: "عْمَل", t: "s", h: ["عْمَلُونَ", "عْمَلَانِ", "عْمَلِينَ"] },
  msh: { m: "مَشَى", tr: "yürümek", ts: "yürü", b: "مْشِ", t: "y", h: ["مْشُونَ", "مْشِيَانِ", "مْشِينَ"] },
  jry: { m: "جَرَى", tr: "koşmak", ts: "koş", b: "جْرِ", t: "y", h: ["جْرُونَ", "جْرِيَانِ", "جْرِينَ"] },
  bky: { m: "بَكَى", tr: "ağlamak", ts: "ağla", b: "بْكِ", t: "y", h: ["بْكُونَ", "بْكِيَانِ", "بْكِينَ"] },
  dea: { m: "دَعَا", tr: "çağırmak", ts: "çağır", b: "دْعُ", t: "w", h: ["دْعُونَ", "دْعُوَانِ", "دْعِينَ"] },
  bqy: { m: "بَقِيَ", tr: "kalmak", ts: "kal", b: "بْقَ", t: "a", h: ["بْقَوْنَ", "بْقَيَانِ", "بْقَيْنَ"] },
  nsy: { m: "نَسِيَ", tr: "unutmak", ts: "unut", b: "نْسَ", t: "a", h: ["نْسَوْنَ", "نْسَيَانِ", "نْسَيْنَ"] }
};
// Şahıslar: [zamir, önek, gövde (s tekil · 0/1/2 hamse), Türkçe şahıs, Türkçe özne]
var SAHIS = {
  hw: ["هُوَ", "يَ", "s", "3s", "o"], hy: ["هِيَ", "تَ", "s", "3s", "o (kız)"], nt: ["أَنْتَ", "تَ", "s", "2s", "sen"],
  ni: ["أَنْتِ", "تَ", 2, "2s", "sen (kız)"], an: ["أَنَا", "أَ", "s", "1s", "ben"], nh: ["نَحْنُ", "نَ", "s", "1p", "biz"],
  hm: ["هُمْ", "يَ", 0, "3p", "onlar"], tm: ["أَنْتُمْ", "تَ", 0, "2p", "siz"], hma: ["هُمَا", "يَ", 1, "3s", "ikisi"]
};
// Edatlar: [Arapça, hâl, ad, Türkçe kip]
var EDATLAR = {
  yok: ["", "r", "Edat yok", "pres"], nf: ["لَا", "r", "لَا (olumsuz)", "neg"], an: ["أَنْ", "n", "يَجِبُ أَنْ", "gerek"], ln: ["لَنْ", "n", "لَنْ", "fut"],
  ky: ["كَيْ", "n", "كَيْ", "diye"], ht: ["حَتَّى", "n", "حَتَّى", "diye"], lm: ["لَمْ", "c", "لَمْ", "past"], nh: ["لَا", "c", "لَا (yasak)", "nehy"]
};
// Ders akışı: [sekme, başlık, dakika, ne yapılır]
var AKIS = [
  ["kelime", "Isınma: kelimeler", 8, "Kelime kartlarını çevir; fiillerin muzârisini söylet: جَرَى → ?"],
  ["metin", "Metni dinle ve oku", 8, "Önce dinlet, sonra üç kıssayı sesli okut. “Muzâri fiiller renkli” ile fiilleri ve edatları göster."],
  ["ceviri", "Cümle cümle çeviri", 18, "Her cümlede önce öğrenciler çevirsin; sonra kelime kelime ve doğal çeviriyi aç, nottaki tuzağı konuş."],
  ["isim", "Kaide, fiil tablosu ve analiz", 15, "Kaide kartlarını anlat; fiil tablosunu gizleyip doldurt; cümlelerde muzârinin hâlini ve edatları işaretlet."],
  ["alistirma", "Alıştırmalar", 14, "Muzâri makinesi, hâlini bul, edatı seç, doğru biçim, bu edat ne yapar, dönüştür."],
  ["ceviri", "Türkçeden Arapçaya", 8, "Çeviri sekmesinde “Türkçe → Arapça” ve “Yeni cümleler” modlarını kullan."],
  ["yaris", "Takım yarışması", 10, "Takımlar sırayla cevaplasın: çeviri, hâl, edat, biçim, tuzak, doğru–yanlış."],
  ["uret", "Üretim: kendi cümlen", 9, "Cümle kurucu ile fiil × şahıs × edat cümleleri kurdur; sonra her öğrenci kendi cümlelerini yazsın."]
];
