// ================= VERİ: فَنَادِقُ إِسْطَنْبُولَ · çeviri ve isim cümlesi sınıf dersi =================
// Kelime yazımı: "Arapça|Türkçe|rol" · " · " ile ayrılır. Roller: mb mübtedâ, hb haber, tm tümleç (câr-mecrûr, zarf), x bağlaç, fs fasl zamiri.
// "وَ" tek başına yazılırsa sonraki kelimeye bitişik gösterilir.
var ROLLER = {
  mb: { tr: "Mübtedâ", ar: "مُبْتَدَأٌ", col: "cerr" }, hb: { tr: "Haber", ar: "خَبَرٌ", col: "ref" },
  tm: { tr: "Tümleç", ar: "مُتَعَلِّقٌ", col: "mz" }, x: { tr: "Bağlaç", ar: "حَرْفُ عَطْفٍ", col: "x" }, fs: { tr: "Fasl zamiri", ar: "ضَمِيرُ الفَصْلِ", col: "nasb" }
};
var BASLIK = "فَنَادِقُ إِسْطَنْبُولَ";
// Cümleler: p paragraf, k kelimeler, tr çeviri, y yanlış (çeldirici) çeviri, c cümlecikler [mübtedâ, türü, haber, türü, uyum], n çeviri notu
var CUMLE = [
  { p: 1, k: "الفَنَادِقُ|oteller|mb · كَثِيرَةٌ|çok|hb · فِي|-de, içinde|tm · إِسْطَنْبُولَ|İstanbul|tm",
    tr: "İstanbul’da oteller çoktur.", y: "İstanbul’daki oteller azdır.",
    c: [["الفَنَادِقُ", "Tek kelime · marife (ال)", "كَثِيرَةٌ", "Müfred", "Akılsız varlıkların çoğulu tekil dişil sayılır: الفَنَادِقُ → كَثِيرَةٌ."]],
    n: "Doğal Türkçe: “İstanbul’da çok otel var.” Arapçada mübtedâ başta; Türkçede yer bildiren tümleç (فِي إِسْطَنْبُولَ) başa alınır." },
  { p: 1, k: "بَعْضُ|bazısı|mb · الفَنَادِقِ|otellerin|mb · قَرِيبَةٌ|yakın|hb · مِنَ|-e (…den)|tm · المَطَارِ|havalimanı|tm · وَ|ve|x · بَعْضُهَا|bazısı|mb · بَعِيدَةٌ|uzak|hb · عَنْهُ|ondan|tm",
    tr: "Otellerin bazısı havalimanına yakın, bazısı ondan uzaktır.", y: "Bütün oteller havalimanına yakındır.",
    c: [["بَعْضُ الفَنَادِقِ", "İzafet terkibi", "قَرِيبَةٌ", "Müfred", "Haber, anlamca الفَنَادِقُ’a uymuş (akılsız çoğul → dişil tekil). قَرِيبٌ de denebilir."], ["بَعْضُهَا", "İzafet (zamirle)", "بَعِيدَةٌ", "Müfred", "ـهَا zamiri الفَنَادِقُ’u gösterir; haber yine dişil tekil."]],
    n: "قَرِيبٌ مِنْ = …e yakın · بَعِيدٌ عَنْ = …den uzak. Arapçada “yakın” مِنْ ile kurulur, Türkçeye “-e” diye çevrilir. عَنْهُ’daki ـهُ havalimanını gösterir." },
  { p: 1, k: "مُعْظَمُ|çoğu|mb · الفَنَادِقِ|otellerin|mb · فِي|-de|hb · مِنْطَقَةِ|bölgesi|hb · تَقْسِيمَ|Taksim|hb · وَسُلْطَانِ أَحْمَدَ|ve Sultanahmet|hb",
    tr: "Otellerin çoğu Taksim ve Sultanahmet bölgesindedir.", y: "Otellerin hepsi Taksim’dedir.",
    c: [["مُعْظَمُ الفَنَادِقِ", "İzafet terkibi", "فِي مِنْطَقَةِ تَقْسِيمَ…", "Şibh-i cümle (câr-mecrûr)", "Haber câr-mecrûrdur; gizli “bulunur” (مَوْجُودَةٌ) anlamı taşır."]],
    n: "مُعْظَمُ = çoğu, büyük kısmı. Câr-mecrûr haberi Türkçeye “-dedir / -de bulunur” diye çevir." },
  { p: 1, k: "بَعْضُ|bazısı|mb · الفَنَادِقِ|otellerin|mb · أَرْبَعَةُ|dört|hb · نُجُومٍ|yıldız|hb · وَ|ve|x · بَعْضُهَا|bazısı|mb · خَمْسَةُ|beş|hb · نُجُومٍ|yıldız|hb",
    tr: "Otellerin bazısı dört yıldızlı, bazısı beş yıldızlıdır.", y: "Otellerin bazısı dört katlı, bazısı beş katlıdır.",
    c: [["بَعْضُ الفَنَادِقِ", "İzafet terkibi", "أَرْبَعَةُ نُجُومٍ", "Müfred (sayı terkibi)", "Haber bir sayı terkibidir; “dört yıldız(lı)”."], ["بَعْضُهَا", "İzafet (zamirle)", "خَمْسَةُ نُجُومٍ", "Müfred (sayı terkibi)", "Aynı yapı."]],
    n: "Kelime kelime “dört yıldız”; Türkçede “dört yıldızlı” denir. Fasih kullanım: ذُو أَرْبَعِ نُجُومٍ (yıldız = نَجْمَةٌ)." },
  { p: 1, k: "أَسْعَارُ|fiyatları|mb · الفَنَادِقِ|otellerin|mb · عُمُومًا|genel olarak|tm · مُعْتَدِلَةٌ|makul, uygun|hb",
    tr: "Otel fiyatları genel olarak uygundur.", y: "Otel fiyatları her zaman çok pahalıdır.",
    c: [["أَسْعَارُ الفَنَادِقِ", "İzafet terkibi", "مُعْتَدِلَةٌ", "Müfred", "أَسْعَارٌ akılsız çoğul → haber dişil tekil."]],
    n: "عُمُومًا ara söz gibi araya girmiş; Türkçede başa ya da sona alınabilir. مُعْتَدِلٌ: ılımlı; fiyat için “makul, uygun”." },
  { p: 2, k: "الخِدْمَةُ|hizmet|mb · مُمْتَازَةٌ|mükemmel|hb · فِي|-de|tm · كُلِّ|bütün|tm · الفَنَادِقِ|oteller|tm",
    tr: "Bütün otellerde hizmet mükemmeldir.", y: "Bazı otellerde hizmet kötüdür.",
    c: [["الخِدْمَةُ", "Tek kelime · marife (ال)", "مُمْتَازَةٌ", "Müfred", "Mübtedâ dişil tekil → haber dişil tekil."]],
    n: "كُلُّ + marife çoğul = “bütün …”: كُلُّ الفَنَادِقِ bütün oteller." },
  { p: 2, k: "المُوَظَّفُونَ|(erkek) çalışanlar|mb · كَثِيرُونَ|çok|hb · وَ|ve|x · المُوَظَّفَاتُ|kadın çalışanlar|mb · كَثِيرَاتٌ|çok|hb · فِي|-de|tm · هَذِهِ|bu|tm · الفَنَادِقِ|oteller|tm",
    tr: "Bu otellerde erkek çalışanlar da kadın çalışanlar da çoktur.", y: "Bu otellerde çalışan azdır.",
    c: [["المُوَظَّفُونَ", "Tek kelime · cem-i müzekker sâlim", "كَثِيرُونَ", "Müfred", "Akıllı çoğul: haber de cem-i müzekker sâlim → كَثِيرُونَ."], ["المُوَظَّفَاتُ", "Tek kelime · cem-i müennes sâlim", "كَثِيرَاتٌ", "Müfred", "Akıllı dişil çoğul → كَثِيرَاتٌ."]],
    n: "Türkçede çoğul eki tekrarlanmaz: “Çalışanlar çoktur”, “çoklardır” denmez." },
  { p: 2, k: "المُوَظَّفُونَ|(erkek) çalışanlar|mb · نَشِيطُونَ|çalışkan|hb · وَ|ve|x · المُوَظَّفَاتُ|kadın çalışanlar|mb · نَشِيطَاتٌ|çalışkan|hb · أَيْضًا|de, da|tm",
    tr: "Erkek çalışanlar çalışkandır, kadın çalışanlar da çalışkandır.", y: "Erkek çalışanlar çalışkan, kadın çalışanlar tembeldir.",
    c: [["المُوَظَّفُونَ", "Tek kelime · cem-i müzekker sâlim", "نَشِيطُونَ", "Müfred", "Eril akıllı çoğul → نَشِيطُونَ."], ["المُوَظَّفَاتُ", "Tek kelime · cem-i müennes sâlim", "نَشِيطَاتٌ", "Müfred", "Dişil akıllı çoğul → نَشِيطَاتٌ."]],
    n: "نَشِيطٌ: hareketli, çalışkan, enerjik. أَيْضًا = “de, da”; cümlenin sonunda gelir." },
  { p: 2, k: "الغُرَفُ|odalar|mb · وَاسِعَةٌ|geniş|hb · وَ|ve|x · الصَّالَاتُ|salonlar|mb · مَلِيئَةٌ|dolu|hb · بِالضُّيُوفِ|misafirlerle|tm",
    tr: "Odalar geniş, salonlar misafirlerle doludur.", y: "Odalar dar, salonlar boştur.",
    c: [["الغُرَفُ", "Tek kelime · cem-i teksîr", "وَاسِعَةٌ", "Müfred", "Akılsız çoğul → dişil tekil."], ["الصَّالَاتُ", "Tek kelime · cem-i müennes sâlim", "مَلِيئَةٌ", "Müfred", "Dikkat! Salonlar akılsızdır: مَلِيئَاتٌ değil مَلِيئَةٌ."]],
    n: "مَلِيءٌ بِـ = …le dolu. الصَّالَاتُ ile المُوَظَّفَاتُ aynı kalıpta ama haberleri farklı: biri akılsız, biri akıllı." },
  { p: 3, k: "الطَّعَامُ|yemek|mb · التُّرْكِيُّ|Türk|mb · مَشْهُورٌ|meşhur|hb · فِي|-de|tm · هَذِهِ|bu|tm · الفَنَادِقِ|oteller|tm · وَ|ve|x · هُوَ|o|mb · رَخِيصٌ|ucuz|hb · وَلَذِيذٌ|ve lezzetli|hb",
    tr: "Türk yemeği bu otellerde meşhurdur; hem ucuz hem lezzetlidir.", y: "Türk yemeği bu otellerde pahalıdır.",
    c: [["الطَّعَامُ التُّرْكِيُّ", "Sıfat terkibi", "مَشْهُورٌ", "Müfred", "Sıfat (التُّرْكِيُّ) mübtedânın parçasıdır; haber مَشْهُورٌ."], ["هُوَ", "Zamir", "رَخِيصٌ وَلَذِيذٌ", "İki haber (و ile)", "Bir mübtedânın birden çok haberi olabilir."]],
    n: "الطَّعَامُ التُّرْكِيُّ “Türk yemeği”; التُّرْكِيُّ marife olduğu için sıfattır, haber değildir. وَهُوَ = “o da / ve o”." },
  { p: 3, k: "وَ|ve|x · القَهْوَةُ|kahve|mb · التُّرْكِيَّةُ|Türk|mb · مَشْهُورَةٌ|meşhur|hb · وَلَذِيذَةٌ|ve lezzetli|hb · أَيْضًا|de, da|tm · وَ|ve|x · هِيَ|o|mb · دَائِمًا|her zaman|tm · مَوْجُودَةٌ|mevcut, bulunur|hb",
    tr: "Türk kahvesi de meşhur ve lezzetlidir; her zaman bulunur.", y: "Türk kahvesi bazen bulunmaz.",
    c: [["القَهْوَةُ التُّرْكِيَّةُ", "Sıfat terkibi", "مَشْهُورَةٌ وَلَذِيذَةٌ", "İki haber (و ile)", "Mübtedâ dişil → haberler dişil."], ["هِيَ", "Zamir", "مَوْجُودَةٌ", "Müfred", "هِيَ kahveyi gösterir; دَائِمًا araya giren zarftır."]],
    n: "مَوْجُودٌ: mevcut; Türkçeye “bulunur, vardır” diye çevrilir." },
  { p: 3, k: "وَ|ve|x · المَشْرُوبَاتُ|içecekler|mb · كَثِيرَةٌ|çok|hb · فِي|-de|tm · الصَّيْفِ|yaz|tm · وَالشِّتَاءِ|ve kış|tm",
    tr: "Yazın ve kışın içecekler de çoktur.", y: "Yazın içecek yoktur.",
    c: [["المَشْرُوبَاتُ", "Tek kelime · cem-i müennes sâlim", "كَثِيرَةٌ", "Müfred", "İçecekler akılsız → كَثِيرَةٌ (كَثِيرَاتٌ değil)."]],
    n: "فِي الصَّيْفِ وَالشِّتَاءِ “yazın ve kışın” (zaman bildiren câr-mecrûr). Doğal Türkçe: “Yaz kış bol içecek var.”" },
  { p: 4, k: "إِسْطَنْبُولُ|İstanbul|mb · مَدِينَةُ|şehri|hb · التَّارِيخِ|tarih|hb · وَمَدِينَةُ|ve şehri|hb · الجَمَالِ|güzellik|hb · وَمَدِينَةُ|ve şehri|hb · الثَّقَافَةِ|kültür|hb · وَالحَضَارَةِ|ve medeniyet|hb",
    tr: "İstanbul tarih, güzellik, kültür ve medeniyet şehridir.", y: "İstanbul sadece bir ticaret şehridir.",
    c: [["إِسْطَنْبُولُ", "Özel isim (marife)", "مَدِينَةُ التَّارِيخِ…", "Müfred (izafet terkibi, و ile sıralı)", "Haber izafet terkibi; şehir adları dişildir."]],
    n: "مَدِينَةُ التَّارِيخِ “tarihin şehri” → Türkçede “tarih şehri”. Tekrarlanan مَدِينَةُ Türkçede bir kez söylenir." },
  { p: 4, k: "الزِّيَارَةُ|ziyaret|mb · إِلَى|-e|mb · إِسْطَنْبُولَ|İstanbul|mb · فُرْصَةٌ|fırsat|hb · جَمِيلَةٌ|güzel|hb · فِي|-de|tm · حَيَاةِ|hayatı|tm · الإِنْسَانِ|insanın|tm",
    tr: "İstanbul’u ziyaret etmek, insanın hayatında güzel bir fırsattır.", y: "İstanbul’u ziyaret etmek zor bir iştir.",
    c: [["الزِّيَارَةُ إِلَى إِسْطَنْبُولَ", "Mastar + câr-mecrûr", "فُرْصَةٌ جَمِيلَةٌ", "Müfred (sıfat terkibi, nekre)", "Haber nekre bir sıfat terkibi; mübtedâ dişil → جَمِيلَةٌ."]],
    n: "الزِّيَارَةُ إِلَى إِسْطَنْبُولَ “İstanbul’a ziyaret” → “İstanbul’u ziyaret etmek”. Arapça “-e” (إِلَى), Türkçe “-i”." },
  { p: 4, k: "وَ|ve|x · أَجْمَلُ|en güzel|mb · فَصْلٍ|mevsim|mb · لِزِيَارَةِ|ziyareti için|mb · إِسْطَنْبُولَ|İstanbul|mb · هُوَ|(o)|fs · فَصْلُ|mevsimi|hb · الرَّبِيعِ|ilkbahar|hb",
    tr: "İstanbul’u ziyaret için en güzel mevsim ilkbahardır.", y: "İstanbul’u ziyaret için en güzel mevsim kıştır.",
    c: [["أَجْمَلُ فَصْلٍ لِزِيَارَةِ إِسْطَنْبُولَ", "İsm-i tafdîl izafeti", "فَصْلُ الرَّبِيعِ", "Müfred (izafet terkibi)", "هُوَ fasl zamiridir: mübtedâ ile haberi ayırır, vurgu katar; çevrilmez."]],
    n: "أَجْمَلُ فَصْلٍ “mevsimin en güzeli” → “en güzel mevsim”. فَصْلُ الرَّبِيعِ “ilkbahar mevsimi” → kısaca “ilkbahar”." }
];
// Kelime kartları: [Arapça, Türkçe, çoğul / tekil, zıt anlamlı]
var KELIME = [
  ["فُنْدُقٌ", "otel", "فَنَادِقُ", ""], ["كَثِيرٌ", "çok", "", "قَلِيلٌ"], ["بَعْضٌ", "bazı, bir kısmı", "", "كُلٌّ"], ["قَرِيبٌ مِنْ", "…e yakın", "", "بَعِيدٌ عَنْ"],
  ["مَطَارٌ", "havalimanı", "مَطَارَاتٌ", ""], ["بَعِيدٌ عَنْ", "…den uzak", "", "قَرِيبٌ مِنْ"], ["مُعْظَمٌ", "çoğu, büyük kısmı", "", ""], ["مِنْطَقَةٌ", "bölge", "مَنَاطِقُ", ""],
  ["نَجْمٌ", "yıldız", "نُجُومٌ", ""], ["سِعْرٌ", "fiyat", "أَسْعَارٌ", ""], ["عُمُومًا", "genel olarak", "", ""], ["مُعْتَدِلٌ", "ılımlı; (fiyat) makul", "", ""],
  ["خِدْمَةٌ", "hizmet", "خِدْمَاتٌ", ""], ["مُمْتَازٌ", "mükemmel", "", "سَيِّئٌ"], ["كُلٌّ", "her, bütün", "", "بَعْضٌ"], ["مُوَظَّفٌ", "çalışan, memur", "مُوَظَّفُونَ", ""],
  ["مُوَظَّفَةٌ", "kadın çalışan", "مُوَظَّفَاتٌ", ""], ["نَشِيطٌ", "çalışkan, hareketli", "", "كَسْلَانُ"], ["أَيْضًا", "de, da; ayrıca", "", ""], ["غُرْفَةٌ", "oda", "غُرَفٌ", ""],
  ["وَاسِعٌ", "geniş", "", "ضَيِّقٌ"], ["صَالَةٌ", "salon", "صَالَاتٌ", ""], ["مَلِيءٌ بِـ", "…le dolu", "", "فَارِغٌ"], ["ضَيْفٌ", "misafir", "ضُيُوفٌ", ""],
  ["طَعَامٌ", "yemek", "أَطْعِمَةٌ", ""], ["تُرْكِيٌّ", "Türk, Türkiye’ye ait", "", ""], ["مَشْهُورٌ", "meşhur", "", "مَجْهُولٌ"], ["رَخِيصٌ", "ucuz", "", "غَالٍ"],
  ["لَذِيذٌ", "lezzetli", "", ""], ["قَهْوَةٌ", "kahve", "", ""], ["دَائِمًا", "her zaman", "", "أَحْيَانًا"], ["مَوْجُودٌ", "mevcut, bulunan", "", "مَفْقُودٌ"],
  ["مَشْرُوبٌ", "içecek", "مَشْرُوبَاتٌ", ""], ["صَيْفٌ", "yaz", "", "شِتَاءٌ"], ["شِتَاءٌ", "kış", "", "صَيْفٌ"], ["مَدِينَةٌ", "şehir", "مُدُنٌ", "قَرْيَةٌ"],
  ["تَارِيخٌ", "tarih", "", ""], ["جَمَالٌ", "güzellik", "", "قُبْحٌ"], ["ثَقَافَةٌ", "kültür", "", ""], ["حَضَارَةٌ", "medeniyet", "حَضَارَاتٌ", ""],
  ["زِيَارَةٌ", "ziyaret", "زِيَارَاتٌ", ""], ["فُرْصَةٌ", "fırsat", "فُرَصٌ", ""], ["جَمِيلٌ", "güzel", "", "قَبِيحٌ"], ["حَيَاةٌ", "hayat", "", "مَوْتٌ"],
  ["إِنْسَانٌ", "insan", "نَاسٌ", ""], ["أَجْمَلُ", "en güzel, daha güzel", "", ""], ["فَصْلٌ", "mevsim", "فُصُولٌ", ""], ["رَبِيعٌ", "ilkbahar", "", "خَرِيفٌ"]
];
// Kaide kartları
var KAIDE = [
  ["İsim cümlesi", "İsimle başlayan cümledir; iki temel öğesi vardır: <b class=\"c-mb\">mübtedâ</b> (hakkında konuşulan) ve <b class=\"c-hb\">haber</b> (onun hakkında söylenen). <span class=\"ar\"><b class=\"c-mb\">الغُرَفُ</b> <b class=\"c-hb\">وَاسِعَةٌ</b></span> “Odalar geniştir.”"],
  ["İkisi de merfû", "Mübtedâ ve haber ötreli (merfû) olur: <span class=\"ar\">الخِدْمَةُ مُمْتَازَةٌ · المُوَظَّفُونَ نَشِيطُونَ</span>. Cem-i müzekker sâlimde ref alameti و’dır."],
  ["Mübtedâ marife, haber nekre", "Mübtedâ çoğunlukla belirli (ال’li, özel isim, zamir ya da izafet), haber belirsizdir. <span class=\"ar\">الفُنْدُقُ جَمِيلٌ</span> cümledir; <span class=\"ar\">الفُنْدُقُ الجَمِيلُ</span> ise “güzel otel” sıfat terkibidir, cümle değildir."],
  ["Uyum (mutâbakat)", "Haber, mübtedâya cinsiyette ve sayıda uyar: <span class=\"ar\">المُوَظَّفُ نَشِيطٌ · المُوَظَّفَةُ نَشِيطَةٌ · المُوَظَّفَانِ نَشِيطَانِ · المُوَظَّفُونَ نَشِيطُونَ · المُوَظَّفَاتُ نَشِيطَاتٌ</span>."],
  ["Akılsız çoğul → dişil tekil", "İnsan dışındaki varlıkların çoğulu tekil dişil gibi muamele görür: <span class=\"ar\">الفَنَادِقُ كَثِيرَةٌ · الغُرَفُ وَاسِعَةٌ · الصَّالَاتُ مَلِيئَةٌ · المَشْرُوبَاتُ كَثِيرَةٌ</span>. Metnin en önemli uyum dersi budur."],
  ["Haberin türleri", "<b>Müfred</b> (tek kelime ya da terkip): <span class=\"ar\">الخِدْمَةُ مُمْتَازَةٌ · إِسْطَنْبُولُ مَدِينَةُ التَّارِيخِ</span>. <b>Şibh-i cümle</b> (câr-mecrûr / zarf): <span class=\"ar\">مُعْظَمُ الفَنَادِقِ فِي تَقْسِيمَ</span>. <b>Cümle</b>: <span class=\"ar\">الفُنْدُقُ غُرَفُهُ وَاسِعَةٌ · المُوَظَّفُونَ يَعْمَلُونَ</span>."],
  ["Bir mübtedâ, birden çok haber", "<span class=\"ar\">هُوَ رَخِيصٌ وَلَذِيذٌ · القَهْوَةُ مَشْهُورَةٌ وَلَذِيذَةٌ</span>: haberler و ile sıralanır."],
  ["Fasl zamiri", "Mübtedâ ile haber arasındaki <span class=\"ar\">هُوَ / هِيَ</span>, haberi sıfattan ayırır ve vurgu katar: <span class=\"ar\">أَجْمَلُ فَصْلٍ <b class=\"c-fs\">هُوَ</b> فَصْلُ الرَّبِيعِ</span>. Türkçeye çevrilmez."],
  ["Çeviri ipucu", "Türkçede yüklem sona gelir ve “-dır” eki alır: <span class=\"ar\">الغُرَفُ وَاسِعَةٌ</span> → “Odalar geniştir.” Yer bildiren tümleç çoğu zaman başa alınır: “İstanbul’da oteller çoktur.”"]
];
// Alıştırmalar: [soru (___ boşluk), doğru, yanlış1, yanlış2, açıklama]
var UYUM = [
  ["المُوَظَّفَاتُ ___ .", "نَشِيطَاتٌ", "نَشِيطُونَ", "نَشِيطٌ", "Akıllı dişil çoğul → cem-i müennes sâlim."],
  ["المُوَظَّفُونَ ___ .", "كَثِيرُونَ", "كَثِيرَاتٌ", "كَثِيرٌ", "Akıllı eril çoğul → cem-i müzekker sâlim."],
  ["الغُرَفُ ___ .", "وَاسِعَةٌ", "وَاسِعَاتٌ", "وَاسِعُونَ", "Akılsız çoğul → dişil tekil."],
  ["الصَّالَاتُ ___ بِالضُّيُوفِ.", "مَلِيئَةٌ", "مَلِيئَاتٌ", "مَلِيءٌ", "Salonlar akılsız: ـَاتٌ ile bitse de haber dişil tekil."],
  ["الفُنْدُقُ ___ مِنَ المَطَارِ.", "قَرِيبٌ", "قَرِيبَةٌ", "قَرِيبُونَ", "Eril tekil → eril tekil."],
  ["الغُرْفَةُ ___ .", "وَاسِعَةٌ", "وَاسِعٌ", "وَاسِعَاتٌ", "Dişil tekil → dişil tekil."],
  ["الطَّعَامُ ___ .", "لَذِيذٌ", "لَذِيذَةٌ", "لَذِيذَانِ", "Eril tekil."],
  ["القَهْوَةُ ___ .", "لَذِيذَةٌ", "لَذِيذٌ", "لَذِيذَاتٌ", "Dişil tekil."],
  ["المُوَظَّفَانِ ___ .", "نَشِيطَانِ", "نَشِيطُونَ", "نَشِيطٌ", "İkil → ikil (ـَانِ)."],
  ["المُوَظَّفَتَانِ ___ .", "نَشِيطَتَانِ", "نَشِيطَانِ", "نَشِيطَاتٌ", "Dişil ikil → ـَتَانِ."],
  ["أَسْعَارُ الفَنَادِقِ ___ .", "مُعْتَدِلَةٌ", "مُعْتَدِلُونَ", "مُعْتَدِلٌ", "Haber izafetin ilk kelimesine (أَسْعَارُ) uyar; akılsız çoğul → dişil tekil."],
  ["المَشْرُوبَاتُ ___ فِي الصَّيْفِ.", "كَثِيرَةٌ", "كَثِيرَاتٌ", "كَثِيرُونَ", "Akılsız çoğul."],
  ["الفُنْدُقَانِ ___ .", "جَمِيلَانِ", "جَمِيلَتَانِ", "جَمِيلَةٌ", "Eril ikil → ـَانِ."],
  ["إِسْطَنْبُولُ مَدِينَةٌ ___ .", "جَمِيلَةٌ", "جَمِيلٌ", "جَمِيلَاتٌ", "Burada جَمِيلَةٌ sıfattır; مَدِينَةٌ dişil."],
  ["الخِدْمَةُ ___ فِي كُلِّ الفَنَادِقِ.", "مُمْتَازَةٌ", "مُمْتَازٌ", "مُمْتَازَاتٌ", "Dişil tekil."],
  ["هُوَ ___ وَلَذِيذٌ.", "رَخِيصٌ", "رَخِيصَةٌ", "رِخَاصٌ", "هُوَ eril tekil (yemek)."]
];
var DONUSTUR = [
  ["الفُنْدُقُ قَرِيبٌ ← çoğul", "الفَنَادِقُ قَرِيبَةٌ", "الفَنَادِقُ قَرِيبُونَ", "الفَنَادِقُ قَرِيبَاتٌ", "Akılsız çoğul → dişil tekil haber."],
  ["المُوَظَّفُ نَشِيطٌ ← çoğul", "المُوَظَّفُونَ نَشِيطُونَ", "المُوَظَّفُونَ نَشِيطَةٌ", "المُوَظَّفُونَ نَشِيطٌ", "Akıllı eril çoğul → ـُونَ."],
  ["المُوَظَّفُ نَشِيطٌ ← dişil", "المُوَظَّفَةُ نَشِيطَةٌ", "المُوَظَّفَةُ نَشِيطٌ", "المُوَظَّفُ نَشِيطَةٌ", "İkisi de dişil olur."],
  ["المُوَظَّفَةُ نَشِيطَةٌ ← çoğul", "المُوَظَّفَاتُ نَشِيطَاتٌ", "المُوَظَّفَاتُ نَشِيطَةٌ", "المُوَظَّفُونَ نَشِيطَاتٌ", "Akıllı dişil çoğul → ـَاتٌ."],
  ["الغُرْفَةُ وَاسِعَةٌ ← çoğul", "الغُرَفُ وَاسِعَةٌ", "الغُرَفُ وَاسِعَاتٌ", "الغُرْفَاتُ وَاسِعُونَ", "Haber değişmez: akılsız çoğul."],
  ["الصَّالَةُ مَلِيئَةٌ ← çoğul", "الصَّالَاتُ مَلِيئَةٌ", "الصَّالَاتُ مَلِيئَاتٌ", "الصَّالَاتُ مَلِيئُونَ", "Akılsız çoğul."],
  ["الغُرْفَةُ وَاسِعَةٌ ← ikil", "الغُرْفَتَانِ وَاسِعَتَانِ", "الغُرْفَتَانِ وَاسِعَةٌ", "الغُرْفَتَانِ وَاسِعَانِ", "İkil her zaman ikille uyar (akılsız da olsa)."],
  ["الفُنْدُقُ مُمْتَازٌ ← ikil", "الفُنْدُقَانِ مُمْتَازَانِ", "الفُنْدُقَانِ مُمْتَازَتَانِ", "الفُنْدُقَانِ مُمْتَازٌ", "Eril ikil → ـَانِ."],
  ["السِّعْرُ مُعْتَدِلٌ ← çoğul", "الأَسْعَارُ مُعْتَدِلَةٌ", "الأَسْعَارُ مُعْتَدِلُونَ", "الأَسْعَارُ مُعْتَدِلٌ", "Akılsız çoğul."],
  ["الضَّيْفُ سَعِيدٌ ← dişil", "الضَّيْفَةُ سَعِيدَةٌ", "الضَّيْفَةُ سَعِيدٌ", "الضَّيْفُ سَعِيدَةٌ", "Mübtedâ ve haber birlikte dişil olur."]
];
var TERKIP = [
  ["الفُنْدُقُ جَمِيلٌ", "c", "Mübtedâ marife, haber nekre: “Otel güzeldir.”"], ["فُنْدُقٌ جَمِيلٌ", "t", "İkisi de nekre: “güzel bir otel”."], ["الفُنْدُقُ الجَمِيلُ", "t", "İkisi de marife: “güzel otel”."],
  ["الغُرَفُ وَاسِعَةٌ", "c", "“Odalar geniştir.”"], ["الغُرَفُ الوَاسِعَةُ", "t", "“geniş odalar”."], ["القَهْوَةُ التُّرْكِيَّةُ", "t", "“Türk kahvesi”: sıfat terkibi."],
  ["القَهْوَةُ تُرْكِيَّةٌ", "c", "“Kahve Türk’tür.”"], ["الطَّعَامُ التُّرْكِيُّ مَشْهُورٌ", "c", "Sıfat terkibi mübtedâ, مَشْهُورٌ haber."], ["فُرْصَةٌ جَمِيلَةٌ", "t", "Nekre sıfat terkibi."],
  ["الخِدْمَةُ مُمْتَازَةٌ", "c", "“Hizmet mükemmeldir.”"], ["المُوَظَّفُونَ النَّشِيطُونَ", "t", "“çalışkan çalışanlar”."], ["المُوَظَّفُونَ نَشِيطُونَ", "c", "“Çalışanlar çalışkandır.”"]
];
var TERKIP_OPTS = [["c", "İsim cümlesi", "جُمْلَةٌ اسْمِيَّةٌ", "ref"], ["t", "Sıfat terkibi", "صِفَةٌ وَمَوْصُوفٌ", "mz"]];
var HTUR = [
  ["الفَنَادِقُ كَثِيرَةٌ فِي إِسْطَنْبُولَ.", "m", "كَثِيرَةٌ tek kelime."], ["مُعْظَمُ الفَنَادِقِ فِي مِنْطَقَةِ تَقْسِيمَ.", "s", "Câr-mecrûr."],
  ["الضُّيُوفُ فِي الصَّالَةِ.", "s", "Câr-mecrûr."], ["الفُنْدُقُ أَمَامَ البَحْرِ.", "s", "Zarf (أَمَامَ)."],
  ["الفُنْدُقُ غُرَفُهُ وَاسِعَةٌ.", "c", "Haber bir isim cümlesi: غُرَفُهُ وَاسِعَةٌ."], ["إِسْطَنْبُولُ جَوُّهَا مُعْتَدِلٌ.", "c", "Haber isim cümlesi: جَوُّهَا مُعْتَدِلٌ."],
  ["المُوَظَّفُونَ يَعْمَلُونَ كَثِيرًا.", "c", "Haber fiil cümlesi: يَعْمَلُونَ."], ["السُّيَّاحُ يَزُورُونَ إِسْطَنْبُولَ فِي الرَّبِيعِ.", "c", "Haber fiil cümlesi."],
  ["إِسْطَنْبُولُ مَدِينَةُ التَّارِيخِ.", "m", "İzafet terkibi de müfred sayılır."], ["القَهْوَةُ مَوْجُودَةٌ دَائِمًا.", "m", "مَوْجُودَةٌ tek kelime."]
];
var HTUR_OPTS = [["m", "Müfred", "مُفْرَدٌ", "ref"], ["s", "Şibh-i cümle", "شِبْهُ جُمْلَةٍ", "mz"], ["c", "Cümle", "جُمْلَةٌ", "mi"]];
var DY = [
  ["الفَنَادِقُ قَلِيلَةٌ فِي إِسْطَنْبُولَ.", false, "كَثِيرَةٌ"], ["كُلُّ الفَنَادِقِ قَرِيبَةٌ مِنَ المَطَارِ.", false, "بَعْضُهَا قَرِيبَةٌ وَبَعْضُهَا بَعِيدَةٌ"],
  ["مُعْظَمُ الفَنَادِقِ فِي تَقْسِيمَ وَسُلْطَانِ أَحْمَدَ.", true, "Metinde aynen geçer."], ["أَسْعَارُ الفَنَادِقِ غَالِيَةٌ جِدًّا.", false, "مُعْتَدِلَةٌ"],
  ["الخِدْمَةُ مُمْتَازَةٌ فِي كُلِّ الفَنَادِقِ.", true, "Metinde aynen geçer."], ["الغُرَفُ ضَيِّقَةٌ.", false, "وَاسِعَةٌ"],
  ["الطَّعَامُ التُّرْكِيُّ رَخِيصٌ وَلَذِيذٌ.", true, "وَهُوَ رَخِيصٌ وَلَذِيذٌ"], ["القَهْوَةُ التُّرْكِيَّةُ مَوْجُودَةٌ دَائِمًا.", true, "وَهِيَ دَائِمًا مَوْجُودَةٌ"],
  ["أَجْمَلُ فَصْلٍ لِزِيَارَةِ إِسْطَنْبُولَ الشِّتَاءُ.", false, "فَصْلُ الرَّبِيعِ"], ["الصَّالَاتُ فَارِغَةٌ.", false, "مَلِيئَةٌ بِالضُّيُوفِ"],
  ["المُوَظَّفَاتُ نَشِيطَاتٌ.", true, "Metinde aynen geçer."], ["المَشْرُوبَاتُ قَلِيلَةٌ فِي الشِّتَاءِ.", false, "كَثِيرَةٌ فِي الصَّيْفِ وَالشِّتَاءِ"]
];
var SORU = [
  ["أَيْنَ مُعْظَمُ الفَنَادِقِ؟", "مُعْظَمُ الفَنَادِقِ فِي مِنْطَقَةِ تَقْسِيمَ وَسُلْطَانِ أَحْمَدَ.", "Otellerin çoğu nerede?"],
  ["هَلْ كُلُّ الفَنَادِقِ قَرِيبَةٌ مِنَ المَطَارِ؟", "لَا، بَعْضُهَا قَرِيبَةٌ وَبَعْضُهَا بَعِيدَةٌ.", "Bütün oteller havalimanına yakın mı?"],
  ["كَيْفَ أَسْعَارُ الفَنَادِقِ؟", "أَسْعَارُ الفَنَادِقِ مُعْتَدِلَةٌ.", "Otel fiyatları nasıl?"],
  ["كَيْفَ الخِدْمَةُ فِي الفَنَادِقِ؟", "الخِدْمَةُ مُمْتَازَةٌ.", "Otellerde hizmet nasıl?"],
  ["هَلِ المُوَظَّفُونَ كَسَالَى؟", "لَا، المُوَظَّفُونَ نَشِيطُونَ.", "Çalışanlar tembel mi?"],
  ["كَيْفَ الغُرَفُ؟", "الغُرَفُ وَاسِعَةٌ.", "Odalar nasıl?"],
  ["هَلِ الطَّعَامُ التُّرْكِيُّ غَالٍ؟", "لَا، هُوَ رَخِيصٌ وَلَذِيذٌ.", "Türk yemeği pahalı mı?"],
  ["هَلِ القَهْوَةُ التُّرْكِيَّةُ مَوْجُودَةٌ؟", "نَعَمْ، هِيَ دَائِمًا مَوْجُودَةٌ.", "Türk kahvesi var mı?"],
  ["مَا أَجْمَلُ فَصْلٍ لِزِيَارَةِ إِسْطَنْبُولَ؟", "أَجْمَلُ فَصْلٍ لِزِيَارَةِ إِسْطَنْبُولَ هُوَ فَصْلُ الرَّبِيعِ.", "İstanbul’u ziyaret için en güzel mevsim hangisi?"],
  ["مَا إِسْطَنْبُولُ؟", "إِسْطَنْبُولُ مَدِينَةُ التَّارِيخِ وَالجَمَالِ وَالثَّقَافَةِ.", "İstanbul nasıl bir şehir?"]
];
// Türkçeden Arapçaya yeni cümleler: [Türkçe, Arapça, ipucu]
var TRANSFER = [
  ["Otel havalimanına yakındır.", "الفُنْدُقُ قَرِيبٌ مِنَ المَطَارِ.", "قَرِيبٌ مِنْ"],
  ["Odalar temizdir.", "الغُرَفُ نَظِيفَةٌ.", "نَظِيفٌ: temiz · akılsız çoğul"],
  ["Kadın çalışanlar mutludur.", "المُوَظَّفَاتُ سَعِيدَاتٌ.", "سَعِيدٌ: mutlu"],
  ["Kahve sıcaktır ve lezzetlidir.", "القَهْوَةُ سَاخِنَةٌ وَلَذِيذَةٌ.", "سَاخِنٌ: sıcak"],
  ["Ankara güzel bir şehirdir.", "أَنْقَرَةُ مَدِينَةٌ جَمِيلَةٌ.", "Haber sıfat terkibi"],
  ["Fiyatlar ucuzdur.", "الأَسْعَارُ رَخِيصَةٌ.", "Akılsız çoğul"],
  ["Misafirler salondadır.", "الضُّيُوفُ فِي الصَّالَةِ.", "Şibh-i cümle haber"],
  ["Otel denizden uzaktır.", "الفُنْدُقُ بَعِيدٌ عَنِ البَحْرِ.", "بَعِيدٌ عَنْ"],
  ["Erkek çalışanlar çoktur.", "المُوَظَّفُونَ كَثِيرُونَ.", "Akıllı çoğul"],
  ["En güzel mevsim yazdır.", "أَجْمَلُ فَصْلٍ هُوَ فَصْلُ الصَّيْفِ.", "Fasl zamiri هُوَ"],
  ["İki oda geniştir.", "الغُرْفَتَانِ وَاسِعَتَانِ.", "İkil"],
  ["Türk yemeği meşhurdur.", "الطَّعَامُ التُّرْكِيُّ مَشْهُورٌ.", "Sıfat terkibi mübtedâ"]
];
// Uyum makinesi: isimler [Arapça, Türkçe, cinsiyet e/d, sayı 1/2/3, akıllı mı, uygun sıfatlar]
var UM_ISIM = [
  ["المُوَظَّفُ", "Çalışan (erkek)", "e", 1, true, ["nsht", "mmtz", "shhr", "scd"]], ["المُوَظَّفَةُ", "Çalışan (kadın)", "d", 1, true, ["nsht", "mmtz", "shhr", "scd"]],
  ["المُوَظَّفَانِ", "İki çalışan (erkek)", "e", 2, true, ["nsht", "mmtz", "shhr", "scd"]], ["المُوَظَّفَتَانِ", "İki çalışan (kadın)", "d", 2, true, ["nsht", "mmtz", "shhr", "scd"]],
  ["المُوَظَّفُونَ", "Çalışanlar (erkek)", "e", 3, true, ["nsht", "mmtz", "shhr", "scd", "kthr"]], ["المُوَظَّفَاتُ", "Çalışanlar (kadın)", "d", 3, true, ["nsht", "mmtz", "shhr", "scd", "kthr"]],
  ["الفُنْدُقُ", "Otel", "e", 1, false, ["jml", "qrb", "bcd", "rkhs", "mmtz", "shhr"]], ["الفُنْدُقَانِ", "İki otel", "e", 2, false, ["jml", "qrb", "bcd", "rkhs", "mmtz", "shhr"]],
  ["الفَنَادِقُ", "Oteller", "e", 3, false, ["jml", "qrb", "bcd", "rkhs", "mmtz", "shhr", "kthr"]], ["الغُرْفَةُ", "Oda", "d", 1, false, ["wsc", "jml", "nzf"]],
  ["الغُرْفَتَانِ", "İki oda", "d", 2, false, ["wsc", "jml", "nzf"]], ["الغُرَفُ", "Odalar", "d", 3, false, ["wsc", "jml", "nzf", "kthr"]],
  ["الصَّالَاتُ", "Salonlar", "d", 3, false, ["wsc", "jml", "nzf", "kthr"]], ["الطَّعَامُ", "Yemek", "e", 1, false, ["ldhd", "rkhs", "shhr"]],
  ["القَهْوَةُ", "Kahve", "d", 1, false, ["ldhd", "rkhs", "shhr"]], ["المَشْرُوبَاتُ", "İçecekler", "d", 3, false, ["ldhd", "rkhs", "kthr"]]
];
// sıfat kökü (eril tekil, harekesiz son) · Türkçe
var UM_SIFAT = {
  nsht: ["نَشِيط", "çalışkan"], mmtz: ["مُمْتَاز", "mükemmel"], shhr: ["مَشْهُور", "meşhur"], scd: ["سَعِيد", "mutlu"], kthr: ["كَثِير", "çok"],
  jml: ["جَمِيل", "güzel"], qrb: ["قَرِيب", "yakın"], bcd: ["بَعِيد", "uzak"], rkhs: ["رَخِيص", "ucuz"], wsc: ["وَاسِع", "geniş"], nzf: ["نَظِيف", "temiz"], ldhd: ["لَذِيذ", "lezzetli"]
};
var UM_BICIM = [["e1", "Eril tekil", "ٌ"], ["d1", "Dişil tekil", "َةٌ"], ["e2", "Eril ikil", "َانِ"], ["d2", "Dişil ikil", "َتَانِ"], ["e3", "Eril çoğul", "ُونَ"], ["d3", "Dişil çoğul", "َاتٌ"]];
// Ders akışı: [sekme, başlık, dakika, ne yapılır]
var AKIS = [
  ["kelime", "Isınma: kelimeler", 8, "Kelime kartlarını çevir; zıt anlamlıları sor. Öğrenciler kelimeyi söylesin, sen kartı aç."],
  ["metin", "Metni dinle ve oku", 8, "Önce dinlet, sonra sesli okut. Bilinmeyen kelimeye dokunup anlamını göster."],
  ["ceviri", "Cümle cümle çeviri", 15, "Her cümlede önce öğrenciler çevirsin; sonra kelime kelime ve doğal çeviriyi aç, nottaki tuzağı konuş."],
  ["isim", "İsim cümlesi: kaide ve analiz", 12, "Kaide kartlarını anlat; metnin cümlelerinde mübtedâ ve haberi sınıfla birlikte işaretle."],
  ["alistirma", "Uyum alıştırmaları", 12, "Uyum makinesi ve alıştırmalar: haber seç, dönüştür, cümle mi terkip mi, haberin türü."],
  ["ceviri", "Türkçeden Arapçaya", 8, "Çeviri sekmesinde “Türkçe → Arapça” ve “Yeni cümleler” modlarını kullan."],
  ["yaris", "Takım yarışması", 10, "Takımlar sırayla cevaplasın: çeviri, haber seç, mübtedâ bul, doğru–yanlış."],
  ["uret", "Üretim: kendi otelini anlat", 7, "Cümle kurucu ile cümle kurdur; sonra her öğrenci 5 isim cümlesi yazsın."]
];
