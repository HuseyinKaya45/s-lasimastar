// ================= VERİ: طَالِبَتَانِ جَدِيدَتَانِ · tesniye ve cemi çeşitlerinin i'rabı sınıf dersi =================
// Kelime yazımı: "Arapça|Türkçe" ya da "Arapça|Türkçe|tür|hâl" · " · " ile ayrılır.
// Türler: ms müsennâ, cz cem-i müzekker sâlim, cn cem-i müennes sâlim, ct cem-i teksîr, mf müfred, oz özel isim (çoğul değil), sy sayı, zm fiil + ikil zamiri.
// Hâller: r merfû, n mansûb, c mecrûr.
var TURLER = {
  ms: { tr: "Müsennâ (ikil)", k: "İkil" }, cz: { tr: "Cem-i müzekker sâlim", k: "C. müzekker" }, cn: { tr: "Cem-i müennes sâlim", k: "C. müennes" },
  ct: { tr: "Cem-i teksîr", k: "C. teksîr" }, mf: { tr: "Müfred", k: "Müfred" }, oz: { tr: "Özel isim (çoğul değil)", k: "Özel isim" },
  sy: { tr: "Sayı (cem-i müzekker gibi)", k: "Sayı" }, zm: { tr: "Fiil + ikil zamiri", k: "Fiil + ـا" }
};
var HALLER = { r: "Merfû", n: "Mansûb", c: "Mecrûr" };
var BASLIK = "طَالِبَتَانِ جَدِيدَتَانِ";
// c: [kelime, tür, hâl, alamet, görevi]
var CUMLE = [
  { p: 1, k: "حَضَرَتْ|geldi · إِلَى|-e · صَفِّنَا|sınıfımız · طَالِبَتَانِ|iki kız öğrenci|ms|r · جَدِيدَتَانِ|yeni|ms|r · مِنْ|-den · أَلْمَانْيَا.|Almanya",
    tr: "Sınıfımıza Almanya’dan iki yeni kız öğrenci geldi.", y: "Sınıfımıza Fransa’dan üç yeni öğrenci geldi.",
    c: [["طَالِبَتَانِ", "ms", "r", "ـَانِ (elif)", "Fâil: حَضَرَتْ fiilinin fâili."], ["جَدِيدَتَانِ", "ms", "r", "ـَانِ (elif)", "Sıfat: mevsufuna (طَالِبَتَانِ) cinsiyette, sayıda ve hâlde uyar."]],
    n: "Fiil başta olduğu için tekil kalır (حَضَرَتْ); fâil dişil olduğu için تْ alır. Fâil, câr-mecrûrdan (إِلَى صَفِّنَا) sonra gelmiş." },
  { p: 1, k: "اِسْمُهُمَا|ikisinin adı|mf|r · يَاسَمِينُ|Yasemin|oz|r · وَمَرْوَةُ.|ve Merve",
    tr: "Adları Yasemin ve Merve’dir.", y: "Adları Ayşe ve Fatma’dır.",
    c: [["اِسْمُهُمَا", "mf", "r", "ötre", "Tek bir “ad”: müfred. ـهُمَا ikil zamiridir: “ikisinin adı”."], ["يَاسَمِينُ", "oz", "r", "ötre", "Özel isim; sondaki ين kelimenin kendisidir, çoğul eki değildir."]],
    n: "اِسْمُهُمَا “ikisinin adı”: ad kelimesi tekil kalır, ikillik zamirde (ـهُمَا) görünür." },
  { p: 1, k: "هُمَا|o ikisi · مُسْلِمَتَانِ|iki Müslüman (kadın)|ms|r · مِنْ|-den · أَصْلٍ|köken · تُرْكِيٍّ.|Türk",
    tr: "İkisi de Türk asıllı Müslümandır.", y: "İkisi de Alman asıllıdır.",
    c: [["مُسْلِمَتَانِ", "ms", "r", "ـَانِ (elif)", "Haber: هُمَا مُسْلِمَتَانِ. İsim cümlesinde haber merfûdur."]],
    n: "مِنْ أَصْلٍ تُرْكِيٍّ “Türk asıllı”. هُمَا ikil zamiri: “o ikisi”." },
  { p: 1, k: "خَرَجَتْ|gitti · عَائِلَتُهُمَا|aileleri · إِلَى|-e · أَلْمَانْيَا|Almanya · لِلْعَمَلِ|çalışmak için · قَبْلَ|önce · ثَلَاثِينَ|otuz|sy|c · سَنَةً.|yıl",
    tr: "Aileleri otuz yıl önce çalışmak için Almanya’ya gitmiş.", y: "Aileleri on yıl önce okumak için Almanya’ya gitmiş.",
    c: [["ثَلَاثِينَ", "sy", "c", "ـِينَ (yâ)", "قَبْلَ’den sonra mecrûr. ثَلَاثُونَ sayısı cem-i müzekker sâlim gibi i'rab edilir: merfû ـُونَ, mansûb ve mecrûr ـِينَ."]],
    n: "خَرَجَتْ عَائِلَتُهُمَا: aile dişil → تْ. قَبْلَ ثَلَاثِينَ سَنَةً “otuz yıl önce”." },
  { p: 1, k: "وَفِي|ve -de · الحَقِيقَةِ|gerçek · هَاجَرَ|göç etti · إِلَى|-e · أَلْمَانْيَا|Almanya · مُسْلِمُونَ|Müslümanlar|cz|r · كَثِيرُونَ|çok|cz|r · مِنْ|-den · تُرْكِيَا|Türkiye · وَمِنْ|ve -den · سُورِيَا|Suriye · وَالجَزَائِرِ|ve Cezayir · وَتُونُسَ|ve Tunus · وَالمَغْرِبِ.|ve Fas",
    tr: "Aslında Almanya’ya Türkiye’den, Suriye’den, Cezayir’den, Tunus’tan ve Fas’tan birçok Müslüman göç etti.", y: "Aslında Almanya’ya çok az Müslüman göç etti.",
    c: [["مُسْلِمُونَ", "cz", "r", "ـُونَ (vav)", "Fâil: هَاجَرَ fiilinin fâili; fiil başta tekil kalmış."], ["كَثِيرُونَ", "cz", "r", "ـُونَ (vav)", "Sıfat: mevsufuna (مُسْلِمُونَ) uyar."]],
    n: "وَفِي الحَقِيقَةِ “aslında, gerçekte”. مُسْلِمُونَ كَثِيرُونَ “birçok Müslüman” (Türkçede isim tekil kalır)." },
  { p: 2, k: "حَضَرَتِ|geldi · الطَّالِبَتَانِ|iki kız öğrenci|ms|r · إِلَى|-e · إِسْطَنْبُولَ|İstanbul · قَبْلَ|önce · أُسْبُوعٍ.|bir hafta",
    tr: "İki öğrenci bir hafta önce İstanbul’a geldi.", y: "İki öğrenci bir ay önce Ankara’ya geldi.",
    c: [["الطَّالِبَتَانِ", "ms", "r", "ـَانِ (elif)", "Fâil."]],
    n: "حَضَرَتِ الطَّالِبَتَانِ: تْ + ال → تِ. Fiil tekil (حَضَرَتَا değil)." },
  { p: 2, k: "اِسْتَقْبَلَ|karşıladı · مَسْؤُولٌ|bir yetkili|mf|r · مِنَ|-den · الكُلِّيَّةِ|fakülte · الطَّالِبَتَيْنِ|iki öğrenciyi|ms|n · فِي|-de · مَطَارِ|havalimanı · إِسْطَنْبُولَ|İstanbul · وَأَخَذَهُمَا|ve onları götürdü · إِلَى|-e · سَكَنِ|yurdu · الطَّالِبَاتِ|kız öğrenciler|cn|c · فِي|-de · مِنْطَقَةِ|semti · عُمْرَانِيَةَ.|Ümraniye",
    tr: "Fakülteden bir yetkili iki öğrenciyi İstanbul Havalimanı’nda karşıladı ve onları Ümraniye’deki kız öğrenci yurduna götürdü.", y: "Bir öğretmen öğrencileri otogarda karşılayıp otele götürdü.",
    c: [["مَسْؤُولٌ", "mf", "r", "ötre", "Fâil; müfred, harekeyle i'rab edilir."], ["الطَّالِبَتَيْنِ", "ms", "n", "ـَيْنِ (yâ)", "Mef'ûl bih: karşılanan kişiler."], ["الطَّالِبَاتِ", "cn", "c", "esre", "Muzâfun ileyh: سَكَنِ الطَّالِبَاتِ “kız öğrenci yurdu”."]],
    n: "أَخَذَهُمَا: ـهُمَا ikil zamiri, mef'ûl: “onları (ikisini) götürdü”. سَكَنُ الطَّالِبَاتِ “kız öğrenci yurdu”." },
  { p: 3, k: "بَدَأَتِ|başladı · الطَّالِبَتَانِ|iki öğrenci|ms|r · يَاسَمِينُ|Yasemin|oz|r · وَمَرْوَةُ|ve Merve · الدِّرَاسَةَ|öğrenim(e)|mf|n · فِي|-de · بِدَايَةِ|başı · هَذَا|bu · الأُسْبُوعِ.|hafta",
    tr: "Yasemin ve Merve bu haftanın başında derslere başladı.", y: "Yasemin ve Merve geçen ay derslere başladı.",
    c: [["الطَّالِبَتَانِ", "ms", "r", "ـَانِ (elif)", "Fâil."], ["يَاسَمِينُ", "oz", "r", "ötre", "İki öğrencinin adı; özel isim, çoğul değil."], ["الدِّرَاسَةَ", "mf", "n", "üstün", "Mef'ûl bih; müfred."]],
    n: "بَدَأَ الدِّرَاسَةَ “öğrenime, derslere başladı”: Arapçada mef'ûl, Türkçede “-e”." },
  { p: 3, k: "شَكَرَتِ|teşekkür etti · الطَّالِبَتَانِ|iki öğrenci|ms|r · الإِدَارَةَ|yönetim(e)|mf|n · وَالمُدَرِّسِينَ|ve öğretmenler(e)|cz|n · عَلَى|için · حُسْنِ|güzelliği · الضِّيَافَةِ|misafirperverlik · وَعَلَى|ve için · الاِسْتِقْبَالِ|karşılama · الحَارِّ.|sıcak",
    tr: "İki öğrenci güzel misafirperverlik ve sıcak karşılama için yönetime ve öğretmenlere teşekkür etti.", y: "İki öğrenci yalnız yönetime teşekkür etti.",
    c: [["الطَّالِبَتَانِ", "ms", "r", "ـَانِ (elif)", "Fâil."], ["المُدَرِّسِينَ", "cz", "n", "ـِينَ (yâ)", "Mef'ûle (الإِدَارَةَ) و ile bağlıdır, o da mansûb."]],
    n: "شَكَرَ… عَلَى “…için teşekkür etti”. Arapçada mef'ûl (الإِدَارَةَ وَالمُدَرِّسِينَ), Türkçede “yönetime ve öğretmenlere”." },
  { p: 4, k: "طَلَبَ|istedi · مُعَلِّمَا|iki öğretmeni|ms|r · الصَّفِّ،|sınıf · إِبْرَاهِيمُ|İbrahim · وَعَبْدُ الحَمِيدِ،|ve Abdülhamid · مِنْ|-den · يَاسَمِينَ|Yasemin|oz|c · أَنْ تَجْلِسَ|oturmasını · مَعَ|ile · سَلْمَى،|Selma · وَطَلَبَا|ve (ikisi) istedi|zm| · مِنْ|-den · مَرْوَةَ|Merve · أَنْ تَجْلِسَ|oturmasını · مَعَ|ile · حَلِيمَةَ.|Halime",
    tr: "Sınıfın iki öğretmeni İbrahim ile Abdülhamid, Yasemin’den Selma’nın, Merve’den de Halime’nin yanına oturmasını istedi.", y: "Sınıfın öğretmeni Yasemin’den yalnız oturmasını istedi.",
    c: [["مُعَلِّمَا", "ms", "r", "elif (nûn düştü)", "Fâil. Aslı مُعَلِّمَانِ; izafette nûn düşer: مُعَلِّمَا الصَّفِّ."], ["يَاسَمِينَ", "oz", "c", "üstün", "مِنْ’den sonra mecrûr; özel isim esre almaz (ayrıntısı ileride). Çoğul değil."], ["طَلَبَا", "zm", "", "ـا", "Fiil + ikil elifi: “ikisi istedi”; fâil bu zamirdir."]],
    n: "مُعَلِّمَا الصَّفِّ “sınıfın iki öğretmeni”. طَلَبَ مِنْهُ أَنْ… “ondan …mesini istedi”." }
];
// Kelime kartları: [Arapça, Türkçe, çoğul ya da muzâri, zıt]
var KELIME = [
  ["طَالِبَةٌ", "kız öğrenci", "طَالِبَاتٌ", ""], ["طَالِبٌ", "öğrenci", "طُلَّابٌ", ""], ["جَدِيدٌ", "yeni", "جُدُدٌ", "قَدِيمٌ"], ["صَفٌّ", "sınıf", "صُفُوفٌ", ""],
  ["اِسْمٌ", "ad, isim", "أَسْمَاءٌ", ""], ["مُسْلِمٌ", "Müslüman", "مُسْلِمُونَ", ""], ["مُسْلِمَةٌ", "Müslüman kadın", "مُسْلِمَاتٌ", ""], ["أَصْلٌ", "köken, asıl", "أُصُولٌ", ""],
  ["تُرْكِيٌّ", "Türk", "أَتْرَاكٌ", ""], ["عَائِلَةٌ", "aile", "عَائِلَاتٌ", ""], ["خَرَجَ", "çıktı, gitti", "يَخْرُجُ", "دَخَلَ"], ["عَمَلٌ", "iş, çalışma", "أَعْمَالٌ", ""],
  ["سَنَةٌ", "yıl", "سَنَوَاتٌ", ""], ["حَقِيقَةٌ", "gerçek", "حَقَائِقُ", ""], ["هَاجَرَ", "göç etti", "يُهَاجِرُ", ""], ["كَثِيرٌ", "çok", "", "قَلِيلٌ"],
  ["حَضَرَ", "geldi", "يَحْضُرُ", "غَابَ"], ["أُسْبُوعٌ", "hafta", "أَسَابِيعُ", ""], ["اِسْتَقْبَلَ", "karşıladı", "يَسْتَقْبِلُ", "وَدَّعَ"], ["مَسْؤُولٌ", "yetkili, sorumlu", "مَسْؤُولُونَ", ""],
  ["كُلِّيَّةٌ", "fakülte", "كُلِّيَّاتٌ", ""], ["مَطَارٌ", "havalimanı", "مَطَارَاتٌ", ""], ["أَخَذَ", "aldı, götürdü", "يَأْخُذُ", ""], ["سَكَنٌ", "yurt, konut", "", ""],
  ["مِنْطَقَةٌ", "bölge, semt", "مَنَاطِقُ", ""], ["بَدَأَ", "başladı", "يَبْدَأُ", "اِنْتَهَى"], ["دِرَاسَةٌ", "öğrenim, ders", "", ""], ["بِدَايَةٌ", "başlangıç", "", "نِهَايَةٌ"],
  ["شَكَرَ", "teşekkür etti", "يَشْكُرُ", ""], ["إِدَارَةٌ", "yönetim, idare", "", ""], ["مُدَرِّسٌ", "öğretmen", "مُدَرِّسُونَ", ""], ["حُسْنٌ", "güzellik", "", ""],
  ["ضِيَافَةٌ", "misafirperverlik", "", ""], ["اِسْتِقْبَالٌ", "karşılama", "", "تَوْدِيعٌ"], ["حَارٌّ", "sıcak", "", "بَارِدٌ"], ["طَلَبَ", "istedi", "يَطْلُبُ", ""],
  ["مُعَلِّمٌ", "öğretmen", "مُعَلِّمُونَ", ""], ["جَلَسَ", "oturdu", "يَجْلِسُ", "قَامَ"], ["كِتَابٌ", "kitap", "كُتُبٌ", ""], ["مُدِيرٌ", "müdür", "مُدِيرُونَ", ""]
];
// Kaide kartları
var KAIDE = [
  ["Müsennâ (ikil)", "İki kişi ya da şey. Merfûda <b class=\"c-ms ar\">ـَانِ</b> (alamet elif): <span class=\"ar\">حَضَرَتْ طَالِبَت<b class=\"c-ms\">َانِ</b></span>. Mansûb ve mecrûrda <b class=\"c-ms ar\">ـَيْنِ</b> (alamet yâ): <span class=\"ar\">اِسْتَقْبَلَ… الطَّالِبَت<b class=\"c-ms\">َيْنِ</b></span>."],
  ["Cem-i müzekker sâlim", "Erkek, akıllı varlıklar; kelime bozulmaz, sona ek gelir. Merfûda <b class=\"c-cz ar\">ـُونَ</b> (vav): <span class=\"ar\">هَاجَرَ مُسْلِم<b class=\"c-cz\">ُونَ</b></span>. Mansûb ve mecrûrda <b class=\"c-cz ar\">ـِينَ</b> (yâ): <span class=\"ar\">شَكَرَتْ… المُدَرِّس<b class=\"c-cz\">ِينَ</b></span>."],
  ["Cem-i müennes sâlim", "Sona <b class=\"c-cn ar\">ـَاتٌ</b> gelir. Merfûda ötre: <span class=\"ar\">الطَّالِبَاتُ</span>. Mansûb ve mecrûrda <b>esre</b>: <span class=\"ar\">رَأَيْتُ الطَّالِبَاتِ · سَكَنِ الطَّالِبَاتِ</span>. Dikkat: mansûbken bile üstün değil esre!"],
  ["Cem-i teksîr", "Kelimenin yapısı bozulur: <span class=\"ar\">طَالِبٌ ← طُلَّابٌ · كِتَابٌ ← كُتُبٌ · صَفٌّ ← صُفُوفٌ</span>. Müfred gibi harekelerle i'rab edilir: <span class=\"ar\">الطُّلَّابُ · الطُّلَّابَ · الطُّلَّابِ</span>."],
  ["Müfred", "Tek kişi ya da şey; harekelerle: merfû ötre, mansûb üstün, mecrûr esre: <span class=\"ar\">مَسْؤُولٌ · الدِّرَاسَةَ · الكُلِّيَّةِ</span>."],
  ["İzafette nûn düşer", "Müsennâ ve cem-i müzekker sâlim muzâf olunca sondaki nûn düşer: <span class=\"ar\">مُعَلِّمَانِ + الصَّفِّ ← مُعَلِّمَا الصَّفِّ · مُعَلِّمُونَ + المَدْرَسَةِ ← مُعَلِّمُو المَدْرَسَةِ</span>."],
  ["Sıfat uyar", "Sıfat, mevsufuna cinsiyette, sayıda, hâlde ve belirlilikte uyar: <span class=\"ar\">طَالِبَتَانِ جَدِيدَتَانِ · مُسْلِمُونَ كَثِيرُونَ</span>."],
  ["Fiil başta tekil", "Fâil ikil ya da çoğul olsa da fiil tekil kalır: <span class=\"ar\">حَضَرَتْ طَالِبَتَانِ · هَاجَرَ مُسْلِمُونَ</span>. Fâil zamir olunca ikil görünür: <span class=\"ar\">طَلَبَا</span> “ikisi istedi”."],
  ["Her <span class=\"ar\">ين</span> ve <span class=\"ar\">ات</span> çoğul eki değildir", "<span class=\"ar\">يَاسَمِينُ</span> özel isimdir; ين kelimenin kendisidir. <span class=\"ar\">ثَلَاثُونَ / ثَلَاثِينَ</span> sayıdır; cem-i müzekker sâlim gibi i'rab edilir. <span class=\"ar\">اِسْمُهُمَا</span>’da ikillik zamirdedir: ad tekil."],
  ["Özet", "<table class=\"mini\"><tr><th></th><th>Merfû</th><th>Mansûb</th><th>Mecrûr</th></tr><tr><td>İkil</td><td class=\"ar\">ـَانِ</td><td class=\"ar\">ـَيْنِ</td><td class=\"ar\">ـَيْنِ</td></tr><tr><td>C. müzekker</td><td class=\"ar\">ـُونَ</td><td class=\"ar\">ـِينَ</td><td class=\"ar\">ـِينَ</td></tr><tr><td>C. müennes</td><td class=\"ar\">ـَاتُ</td><td class=\"ar\">ـَاتِ</td><td class=\"ar\">ـَاتِ</td></tr><tr><td>Müfred, c. teksîr</td><td class=\"ar\">ـُ</td><td class=\"ar\">ـَ</td><td class=\"ar\">ـِ</td></tr></table>İkil ve cem-i müzekkerde mansûb ile mecrûr aynıdır; cem-i müennes sâlimde mansûb esre alır."]
];
// Alıştırmalar: [soru, doğru, yanlış1, yanlış2, açıklama]
var BICIM = [
  ["حَضَرَتْ إِلَى صَفِّنَا ___ جَدِيدَتَانِ.", "طَالِبَتَانِ", "طَالِبَتَيْنِ", "طَالِبَاتٍ", "Fâil merfû → ikilde ـَانِ."],
  ["اِسْتَقْبَلَ مَسْؤُولٌ ___ فِي المَطَارِ.", "الطَّالِبَتَيْنِ", "الطَّالِبَتَانِ", "الطَّالِبَاتُ", "Mef'ûl mansûb → ikilde ـَيْنِ."],
  ["هَاجَرَ إِلَى أَلْمَانْيَا ___ كَثِيرُونَ.", "مُسْلِمُونَ", "مُسْلِمِينَ", "مُسْلِمَانِ", "Fâil merfû → ـُونَ; sıfatı da ـُونَ."],
  ["شَكَرَتِ الطَّالِبَتَانِ الإِدَارَةَ وَ___ .", "المُدَرِّسِينَ", "المُدَرِّسُونَ", "المُدَرِّسَانِ", "Mansûba bağlı → ـِينَ."],
  ["أَخَذَهُمَا إِلَى سَكَنِ ___ .", "الطَّالِبَاتِ", "الطَّالِبَاتُ", "الطَّالِبَاتَ", "Muzâfun ileyh mecrûr → esre."],
  ["رَأَيْتُ ___ فِي الصَّفِّ.", "الطَّالِبَاتِ", "الطَّالِبَاتَ", "الطَّالِبَاتُ", "Cem-i müennes sâlim mansûbken de esre alır!"],
  ["طَلَبَ ___ الصَّفِّ مِنْ يَاسَمِينَ أَنْ تَجْلِسَ.", "مُعَلِّمَا", "مُعَلِّمَانِ", "مُعَلِّمَيْنِ", "İzafette nûn düşer; merfû → elif."],
  ["سَلَّمْتُ عَلَى ___ .", "المُعَلِّمِينَ", "المُعَلِّمُونَ", "المُعَلِّمَانِ", "عَلَى’dan sonra mecrûr → ـِينَ."],
  ["جَاءَ ___ إِلَى المَدْرَسَةِ.", "الطُّلَّابُ", "الطُّلَّابَ", "الطُّلَّابِ", "Cem-i teksîr müfred gibi: merfû ötre."],
  ["قَرَأْتُ ___ .", "الكِتَابَيْنِ", "الكِتَابَانِ", "الكِتَابَيْنُ", "Mef'ûl ikil → ـَيْنِ."],
  ["المُدَرِّسُونَ ___ .", "نَشِيطُونَ", "نَشِيطِينَ", "نَشِيطَيْنِ", "Haber merfû → ـُونَ."],
  ["خَرَجَتْ عَائِلَتُهُمَا قَبْلَ ___ سَنَةً.", "ثَلَاثِينَ", "ثَلَاثُونَ", "ثَلَاثَانِ", "Mecrûr → ـِينَ (sayı cem-i müzekker gibi)."],
  ["هُمَا ___ مِنْ أَصْلٍ تُرْكِيٍّ.", "مُسْلِمَتَانِ", "مُسْلِمَتَيْنِ", "مُسْلِمَاتٍ", "Haber merfû; هُمَا ikil → ـَتَانِ."],
  ["حَضَرَتِ ___ إِلَى المَسْجِدِ.", "المُسْلِمَاتُ", "المُسْلِمَاتِ", "المُسْلِمَاتَ", "Fâil merfû → cem-i müennes sâlimde ötre."]
];
// Türünü bul: [kelime, tür, açıklama]
var TURBUL = [
  ["طَالِبَتَانِ", "ms", "ـَانِ: iki kız öğrenci."], ["مُسْلِمُونَ", "cz", "ـُونَ: erkek, akıllı, kelime bozulmamış."], ["الطَّالِبَاتِ", "cn", "ـَاتِ eki."],
  ["الطُّلَّابُ", "ct", "طَالِبٌ’in yapısı bozulmuş."], ["المُدَرِّسِينَ", "cz", "ـِينَ: mansûb ya da mecrûr cem-i müzekker."], ["الطَّالِبَتَيْنِ", "ms", "ـَيْنِ: mansûb ya da mecrûr ikil."],
  ["يَاسَمِينُ", "mf", "Özel isim; ين kelimenin parçası: tekil."], ["الكُتُبُ", "ct", "كِتَابٌ’ın yapısı bozulmuş."], ["مُعَلِّمَا", "ms", "Aslı مُعَلِّمَانِ; izafette nûn düşmüş."],
  ["مُسْلِمَتَانِ", "ms", "ـَتَانِ: iki Müslüman kadın."], ["الصُّفُوفُ", "ct", "صَفٌّ’ın yapısı bozulmuş."], ["المُعَلِّمَاتُ", "cn", "ـَاتُ eki."],
  ["مَسْؤُولٌ", "mf", "Tek kişi."], ["المَسْؤُولُونَ", "cz", "ـُونَ eki."], ["أَصْدِقَاءُ", "ct", "صَدِيقٌ’in çoğulu; yapı bozulmuş."], ["حَافِلَاتٌ", "cn", "ـَاتٌ eki (akılsız da olsa)."]
];
var TUR_OPTS = ["ms", "cz", "cn", "ct", "mf"];
// Hâlini bul: [cümle ({} içindeki kelime), hâl, açıklama]
var HALBUL = [
  ["حَضَرَتْ إِلَى صَفِّنَا {طَالِبَتَانِ} جَدِيدَتَانِ.", "r", "Fâil; ikilde merfû ـَانِ."], ["اِسْتَقْبَلَ مَسْؤُولٌ {الطَّالِبَتَيْنِ}.", "n", "Mef'ûl; ikilde mansûb ـَيْنِ."],
  ["أَخَذَهُمَا إِلَى سَكَنِ {الطَّالِبَاتِ}.", "c", "Muzâfun ileyh; esre."], ["هَاجَرَ إِلَى أَلْمَانْيَا {مُسْلِمُونَ} كَثِيرُونَ.", "r", "Fâil; ـُونَ."],
  ["شَكَرَتِ الطَّالِبَتَانِ الإِدَارَةَ وَ{المُدَرِّسِينَ}.", "n", "Mef'ûle bağlı; ـِينَ."], ["خَرَجَتْ قَبْلَ {ثَلَاثِينَ} سَنَةً.", "c", "قَبْلَ’den sonra; ـِينَ."],
  ["طَلَبَ {مُعَلِّمَا} الصَّفِّ…", "r", "Fâil; elif (nûn izafette düştü)."], ["رَأَيْتُ {الطَّالِبَاتِ} فِي الكُلِّيَّةِ.", "n", "Mef'ûl; cem-i müennes sâlim mansûbda esre alır."],
  ["سَلَّمْتُ عَلَى {المُعَلِّمِينَ}.", "c", "ـِينَ hem mansûb hem mecrûr olabilir; burada عَلَى’dan sonra mecrûr."], ["هُمَا {مُسْلِمَتَانِ}.", "r", "Haber; ـَانِ."],
  ["جَاءَ {الطُّلَّابُ}.", "r", "Cem-i teksîr: ötre."], ["قَرَأْتُ {الكُتُبَ}.", "n", "Cem-i teksîr: üstün."]
];
var DONUSTUR = [
  ["حَضَرَتْ طَالِبَةٌ جَدِيدَةٌ ← ikil", "حَضَرَتْ طَالِبَتَانِ جَدِيدَتَانِ", "حَضَرَتْ طَالِبَتَيْنِ جَدِيدَتَيْنِ", "حَضَرَتَا طَالِبَتَانِ جَدِيدَتَانِ", "Fâil merfû ـَانِ; sıfat uyar; fiil tekil kalır."],
  ["اِسْتَقْبَلَ المَسْؤُولُ الطَّالِبَةَ ← ikil", "اِسْتَقْبَلَ المَسْؤُولُ الطَّالِبَتَيْنِ", "اِسْتَقْبَلَ المَسْؤُولُ الطَّالِبَتَانِ", "اِسْتَقْبَلَ المَسْؤُولُ الطَّالِبَاتُ", "Mef'ûl ikil: ـَيْنِ."],
  ["هَاجَرَ مُسْلِمٌ ← çoğul", "هَاجَرَ مُسْلِمُونَ", "هَاجَرَ مُسْلِمِينَ", "هَاجَرُوا مُسْلِمُونَ", "Fâil ـُونَ; fiil tekil."],
  ["شَكَرْتُ المُدَرِّسَ ← çoğul", "شَكَرْتُ المُدَرِّسِينَ", "شَكَرْتُ المُدَرِّسُونَ", "شَكَرْتُ المُدَرِّسَانِ", "Mef'ûl: ـِينَ."],
  ["رَأَيْتُ الطَّالِبَةَ ← çoğul", "رَأَيْتُ الطَّالِبَاتِ", "رَأَيْتُ الطَّالِبَاتَ", "رَأَيْتُ الطَّالِبَاتُ", "Mansûb ama esre."],
  ["جَاءَ الطَّالِبُ ← çoğul", "جَاءَ الطُّلَّابُ", "جَاءَ الطَّالِبُونَ", "جَاءَ الطُّلَّابَ", "طَالِبٌ’in çoğulu cem-i teksîrdir: طُلَّابٌ; merfû ötre."],
  ["طَلَبَ مُعَلِّمُ الصَّفِّ ← ikil", "طَلَبَ مُعَلِّمَا الصَّفِّ", "طَلَبَ مُعَلِّمَانِ الصَّفِّ", "طَلَبَ مُعَلِّمَيِ الصَّفِّ", "İzafette nûn düşer; merfû elif."],
  ["سَلَّمْتُ عَلَى المُعَلِّمِ ← ikil", "سَلَّمْتُ عَلَى المُعَلِّمَيْنِ", "سَلَّمْتُ عَلَى المُعَلِّمَانِ", "سَلَّمْتُ عَلَى المُعَلِّمِينَ", "Mecrûr ikil: ـَيْنِ (ـِينَ çoğuldur)."],
  ["هِيَ مُسْلِمَةٌ ← ikil", "هُمَا مُسْلِمَتَانِ", "هُمَا مُسْلِمَتَيْنِ", "هُمَا مُسْلِمَاتٌ", "Haber merfû ikil."],
  ["قَرَأْتُ الكِتَابَ ← çoğul", "قَرَأْتُ الكُتُبَ", "قَرَأْتُ الكُتُبُ", "قَرَأْتُ الكِتَابَاتِ", "Cem-i teksîr mansûb: üstün."]
];
var DY = [
  ["حَضَرَتْ إِلَى الصَّفِّ ثَلَاثُ طَالِبَاتٍ.", false, "طَالِبَتَانِ"], ["الطَّالِبَتَانِ مِنْ فَرَنْسَا.", false, "مِنْ أَلْمَانْيَا"],
  ["يَاسَمِينُ وَمَرْوَةُ مُسْلِمَتَانِ مِنْ أَصْلٍ تُرْكِيٍّ.", true, "Metinde geçer."], ["خَرَجَتْ عَائِلَتُهُمَا إِلَى أَلْمَانْيَا قَبْلَ عَشْرِ سَنَوَاتٍ.", false, "قَبْلَ ثَلَاثِينَ سَنَةً"],
  ["هَاجَرَ إِلَى أَلْمَانْيَا مُسْلِمُونَ مِنْ تُرْكِيَا وَالمَغْرِبِ.", true, "Metinde geçer."], ["حَضَرَتِ الطَّالِبَتَانِ إِلَى إِسْطَنْبُولَ قَبْلَ شَهْرٍ.", false, "قَبْلَ أُسْبُوعٍ"],
  ["اِسْتَقْبَلَ مَسْؤُولٌ الطَّالِبَتَيْنِ فِي المَطَارِ.", true, "Metinde geçer."], ["سَكَنُ الطَّالِبَاتِ فِي مِنْطَقَةِ عُمْرَانِيَةَ.", true, "Metinde geçer."],
  ["شَكَرَتِ الطَّالِبَتَانِ الطُّلَّابَ.", false, "الإِدَارَةَ وَالمُدَرِّسِينَ"], ["لِلصَّفِّ مُعَلِّمٌ وَاحِدٌ.", false, "مُعَلِّمَا الصَّفِّ: إِبْرَاهِيمُ وَعَبْدُ الحَمِيدِ"],
  ["طَلَبَ المُعَلِّمَانِ مِنْ يَاسَمِينَ أَنْ تَجْلِسَ مَعَ سَلْمَى.", true, "Metinde geçer."], ["طَلَبَ المُعَلِّمَانِ مِنْ مَرْوَةَ أَنْ تَجْلِسَ مَعَ سَلْمَى.", false, "مَعَ حَلِيمَةَ"]
];
var SORU = [
  ["مِنْ أَيْنَ حَضَرَتِ الطَّالِبَتَانِ؟", "حَضَرَتَا مِنْ أَلْمَانْيَا.", "Öğrenciler nereden geldi?"],
  ["مَا اسْمُ الطَّالِبَتَيْنِ؟", "اِسْمُهُمَا يَاسَمِينُ وَمَرْوَةُ.", "Öğrencilerin adı ne?"],
  ["مَتَى خَرَجَتْ عَائِلَتُهُمَا إِلَى أَلْمَانْيَا؟", "خَرَجَتْ قَبْلَ ثَلَاثِينَ سَنَةً.", "Aileleri ne zaman Almanya’ya gitti?"],
  ["مَنْ هَاجَرَ إِلَى أَلْمَانْيَا؟", "هَاجَرَ مُسْلِمُونَ كَثِيرُونَ مِنْ تُرْكِيَا وَسُورِيَا وَالجَزَائِرِ وَتُونُسَ وَالمَغْرِبِ.", "Almanya’ya kimler göç etti?"],
  ["مَنِ اسْتَقْبَلَ الطَّالِبَتَيْنِ؟", "اِسْتَقْبَلَهُمَا مَسْؤُولٌ مِنَ الكُلِّيَّةِ.", "Öğrencileri kim karşıladı?"],
  ["أَيْنَ سَكَنُ الطَّالِبَاتِ؟", "سَكَنُ الطَّالِبَاتِ فِي مِنْطَقَةِ عُمْرَانِيَةَ.", "Kız öğrenci yurdu nerede?"],
  ["مَنْ شَكَرَتِ الطَّالِبَتَانِ؟", "شَكَرَتَا الإِدَارَةَ وَالمُدَرِّسِينَ.", "Öğrenciler kime teşekkür etti?"],
  ["مَا اسْمُ مُعَلِّمَيِ الصَّفِّ؟", "اِسْمُهُمَا إِبْرَاهِيمُ وَعَبْدُ الحَمِيدِ.", "Sınıfın iki öğretmeninin adı ne?"],
  ["مَعَ مَنْ تَجْلِسُ مَرْوَةُ؟", "تَجْلِسُ مَعَ حَلِيمَةَ.", "Merve kiminle oturuyor?"]
];
// Türkçeden Arapçaya: [Türkçe, Arapça, ipucu]
var TRANSFER = [
  ["İki yeni öğrenci (erkek) geldi.", "حَضَرَ طَالِبَانِ جَدِيدَانِ.", "Fâil ikil: ـَانِ; sıfat uyar"],
  ["Müdür iki öğrenciyi karşıladı.", "اِسْتَقْبَلَ المُدِيرُ الطَّالِبَيْنِ.", "Mef'ûl ikil: ـَيْنِ"],
  ["Öğretmenler sınıfa geldi.", "حَضَرَ المُعَلِّمُونَ إِلَى الصَّفِّ.", "ـُونَ; fiil tekil"],
  ["Öğretmenlere teşekkür ettim.", "شَكَرْتُ المُعَلِّمِينَ.", "Mef'ûl: ـِينَ"],
  ["Kız öğrencileri gördüm.", "رَأَيْتُ الطَّالِبَاتِ.", "Mansûb ama esre"],
  ["İki kitap okudum.", "قَرَأْتُ كِتَابَيْنِ.", "Mef'ûl ikil: ـَيْنِ"],
  ["Öğrenciler çalışkandır.", "الطُّلَّابُ نَشِيطُونَ.", "Cem-i teksîr mübtedâ; haber ـُونَ"],
  ["Sınıfın iki öğretmeni geldi.", "حَضَرَ مُعَلِّمَا الصَّفِّ.", "İzafette nûn düşer"],
  ["İki kız öğrenci Müslümandır.", "الطَّالِبَتَانِ مُسْلِمَتَانِ.", "İkisi de ـَانِ"],
  ["Müslüman kadınlar camiye geldi.", "حَضَرَتِ المُسْلِمَاتُ إِلَى المَسْجِدِ.", "Cem-i müennes sâlim merfû: ötre"],
  ["Kız öğrenci yurduna gittim.", "ذَهَبْتُ إِلَى سَكَنِ الطَّالِبَاتِ.", "Muzâfun ileyh: esre"],
  ["Otuz yıl önce.", "قَبْلَ ثَلَاثِينَ سَنَةً.", "ثَلَاثِينَ mecrûr"]
];
// İ'rab tablosu, makine ve kurucu: isimler [kök, dişil mi, çoğul (cz / cn / kırık çoğul kökü), insan mı, Türkçe {t,i,c: [yalın, -i, -e]}]
var ISIM = {
  mlm: ["المُعَلِّم", false, "cz", true, { t: ["öğretmen", "öğretmeni", "öğretmene"], i: ["iki öğretmen", "iki öğretmeni", "iki öğretmene"], c: ["öğretmenler", "öğretmenleri", "öğretmenlere"] }],
  mlma: ["المُعَلِّم", true, "cn", true, { t: ["kadın öğretmen", "kadın öğretmeni", "kadın öğretmene"], i: ["iki kadın öğretmen", "iki kadın öğretmeni", "iki kadın öğretmene"], c: ["kadın öğretmenler", "kadın öğretmenleri", "kadın öğretmenlere"] }],
  tlba: ["الطَّالِب", true, "cn", true, { t: ["kız öğrenci", "kız öğrenciyi", "kız öğrenciye"], i: ["iki kız öğrenci", "iki kız öğrenciyi", "iki kız öğrenciye"], c: ["kız öğrenciler", "kız öğrencileri", "kız öğrencilere"] }],
  tlb: ["الطَّالِب", false, "الطُّلَّاب", true, { t: ["öğrenci", "öğrenciyi", "öğrenciye"], i: ["iki öğrenci", "iki öğrenciyi", "iki öğrenciye"], c: ["öğrenciler", "öğrencileri", "öğrencilere"] }],
  mslm: ["المُسْلِم", false, "cz", true, { t: ["Müslüman", "Müslümanı", "Müslümana"], i: ["iki Müslüman", "iki Müslümanı", "iki Müslümana"], c: ["Müslümanlar", "Müslümanları", "Müslümanlara"] }],
  mdr: ["المُدِير", false, "cz", true, { t: ["müdür", "müdürü", "müdüre"], i: ["iki müdür", "iki müdürü", "iki müdüre"], c: ["müdürler", "müdürleri", "müdürlere"] }],
  ktb: ["الكِتَاب", false, "الكُتُب", false, { t: ["kitap", "kitabı", "kitaba"], i: ["iki kitap", "iki kitabı", "iki kitaba"], c: ["kitaplar", "kitapları", "kitaplara"] }],
  hfl: ["الحَافِل", true, "cn", false, { t: ["otobüs", "otobüsü", "otobüse"], i: ["iki otobüs", "iki otobüsü", "iki otobüse"], c: ["otobüsler", "otobüsleri", "otobüslere"] }]
};
var SAYI = [["t", "Tekil"], ["i", "İkil"], ["c", "Çoğul"]];
// Ders akışı: [sekme, başlık, dakika, ne yapılır]
var AKIS = [
  ["kelime", "Isınma: kelimeler", 8, "Kelime kartlarını çevir; her kelimenin çoğulunu söylet ve türünü sor: طَالِبَاتٌ hangi çoğul?"],
  ["metin", "Metni dinle ve oku", 8, "Önce dinlet, sonra sesli okut. “İkil ve çoğullar renkli” ile metindeki kelimeleri göster."],
  ["ceviri", "Cümle cümle çeviri", 15, "Her cümlede önce öğrenciler çevirsin; sonra kelime kelime ve doğal çeviriyi aç, nottaki tuzağı konuş."],
  ["isim", "İ'rab: kaide, tablo ve analiz", 14, "Kaide kartlarını anlat; i'rab tablosunu gizleyip sınıfa doldurt; metnin cümlelerinde türü ve hâli işaretlet."],
  ["alistirma", "Alıştırmalar", 12, "İ'rab makinesi, doğru biçimi seç, türünü bul, hâlini bul, dönüştür."],
  ["ceviri", "Türkçeden Arapçaya", 8, "Çeviri sekmesinde “Türkçe → Arapça” ve “Yeni cümleler” modlarını kullan."],
  ["yaris", "Takım yarışması", 10, "Takımlar sırayla cevaplasın: çeviri, doğru biçim, tür, hâl, doğru–yanlış."],
  ["uret", "Üretim: sınıfını anlat", 7, "Cümle kurucu ile cümle kurdur; sonra her öğrenci sınıfını ikil ve çoğullarla anlatsın."]
];
