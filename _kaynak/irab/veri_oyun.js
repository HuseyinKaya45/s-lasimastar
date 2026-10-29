/* Etkinlik verileri */
const TUR={
haber:{ad:`Haber`,m:1},hal:{ad:`Hâl`,m:1},mefulbih:{ad:`Mef'ûl bih (mekûlü'l-kavl)`,m:1},muzaf:{ad:`Muzâf ileyh`,m:1},
sartcevab:{ad:`Câzim şartın cevabı (fâ / izâ-i fücâ'iyye ile)`,m:1},tabimufred:{ad:`Müfrede tâbi (nat)`,m:1},tabicumle:{ad:`Mahalli olan cümleye tâbi (ataf)`,m:1},
ibtida:{ad:`İbtidâiyye (müsta'nefe)`,m:0},sila:{ad:`Sıla`,m:0},mutariza:{ad:`Mu'tarıza`,m:0},tefsir:{ad:`Tefsiriyye`,m:0},
kasem:{ad:`Kasem cevabı`,m:0},sartgayr:{ad:`Câzim olmayan şartın cevabı`,m:0},tabigayr:{ad:`Mahalli olmayana tâbi`,m:0}};
// [bağlam(ar), vurgulu cümle(ar), tür, açıklama]
const JUMAL=[
[`زَيْدٌ قَامَ أَبُوهُ`,`قَامَ أَبُوهُ`,`haber`,`Yerine "قائم" koyabilirsin; mübtedâ <span class="ar">زيد</span>'in haberidir.`],
[`إِنَّ زَيْدًا أَبُوهُ قَائِمٌ`,`أَبُوهُ قَائِمٌ`,`haber`,`<span class="ar">إنّ</span>'nin haberi olduğu için rafʿ mahallinde.`],
[`كَانَ زَيْدٌ أَبُوهُ قَائِمٌ`,`أَبُوهُ قَائِمٌ`,`haber`,`<span class="ar">كان</span>'nin haberi olduğu için nasb mahallinde.`],
[`جَاءَ زَيْدٌ يَضْحَكُ`,`يَضْحَكُ`,`hal`,`Takdir: <span class="ar">ضاحكًا</span>; nasb mahallinde hâl.`],
[`قَالَ زَيْدٌ عَمْرٌو مُنْطَلِقٌ`,`عَمْرٌو مُنْطَلِقٌ`,`mefulbih`,`Söylenen söz (mekûlü'l-kavl); <span class="ar">قال</span>'nin mef'ûlü olarak nasb mahallinde.`],
[`يَوْمَ هُمْ بَارِزُونَ`,`هُمْ بَارِزُونَ`,`muzaf`,`Zaman zarfı <span class="ar">يوم</span>'den sonra gelince muzâf ileyh; cerr mahallinde.`],
[`مَن يُضْلِلِ اللَّهُ فَلَا هَادِيَ لَهُ`,`فَلَا هَادِيَ لَهُ`,`sartcevab`,`Câzim şartın cevabı <b>fâ</b> ile bağlanmış; cezm mahallinde.`],
[`وَإِن تُصِبْهُمْ سَيِّئَةٌ إِذَا هُمْ يَقْنَطُونَ`,`إِذَا هُمْ يَقْنَطُونَ`,`sartcevab`,`Câzim şartın cevabı <b>fücâ'e izâsı</b> ile bağlanmış; cezm mahallinde.`],
[`يَوْمٌ لَّا بَيْعٌ فِيهِ`,`لَّا بَيْعٌ فِيهِ`,`tabimufred`,`<span class="ar">يوم</span>'ün sıfatı; müfrede tâbi, rafʿ mahallinde.`],
[`زَيْدٌ قَامَ أَبُوهُ وَقَعَدَ أَخُوهُ`,`قَعَدَ أَخُوهُ`,`tabicumle`,`Rafʿ mahallindeki <span class="ar">قام أبوه</span>'ya ataf olduğu için o da rafʿ mahallinde.`],
[`إِنَّا أَنزَلْنَاهُ`,`إِنَّا أَنزَلْنَاهُ`,`ibtida`,`Söze yeni başlıyor; ibtidâiyye, mahalli yok.`],
[`جَاءَ الَّذِي قَامَ أَبُوهُ`,`قَامَ أَبُوهُ`,`sila`,`<span class="ar">الذي</span> ism-i mevsûlünden sonra sıla cümlesi.`],
[`فَإِن لَّمْ تَفْعَلُوا وَلَن تَفْعَلُوا فَاتَّقُوا النَّارَ`,`وَلَن تَفْعَلُوا`,`mutariza`,`Şart ile cevabı arasına girmiş araya giren cümle.`],
[`وَلَمَّا يَأْتِكُم مَّثَلُ الَّذِينَ خَلَوْا مِن قَبْلِكُم مَّسَّتْهُمُ الْبَأْسَاءُ وَالضَّرَّاءُ`,`مَّسَّتْهُمُ الْبَأْسَاءُ وَالضَّرَّاءُ`,`tefsir`,`Öncekini (<span class="ar">مثل</span>) açıklıyor; tefsiriyye.`],
[`قَالَ فَبِعِزَّتِكَ لَأُغْوِيَنَّهُمْ`,`لَأُغْوِيَنَّهُمْ`,`kasem`,`Yemin (<span class="ar">بعزتك</span>) cümlesinin cevabı.`],
[`وَلَوْ شِئْنَا لَرَفَعْنَاهُ بِهَا`,`لَرَفَعْنَاهُ بِهَا`,`sartgayr`,`<span class="ar">لو</span> câzim değildir; cevabı mahalli olmayan.`],
[`قَامَ زَيْدٌ وَقَعَدَ عَمْرٌو`,`وَقَعَدَ عَمْرٌو`,`tabigayr`,`Mahalli olmayan <span class="ar">قام زيد</span>'e ataf; o da mahalli olmayan.`]
];
// edat dedektifi: [ar, hedef, doğru tür, seçenekler, açıklama]
const EDAT_SEC={
ma:[`Mevsûl (isim)`,`Şart (isim)`,`İstifham (isim)`,`Ta'accub`,`Nekra mevsûfe`,`Nâfiye`,`Masdariyye`,`Kâffe`,`Zâide`],
min:[`Şartiyye`,`İstifhâmiyye`,`Mevsûle`,`Nekra mevsûfe`],
en:[`Masdariyye`,`Muhaffefe`,`Müfessire`,`Zâide`],
in:[`Şartiyye`,`Nâfiye`,`Zâide`,`Muhaffefe`],
la:[`Nâfiye`,`Nâhiye`,`Zâide`],
ey:[`Şartiyye`,`İstifhâmiyye`,`Mevsûle`,`Sıfat`,`Nidâda vasl`]};
const EDAT=[
[`مَا عِندَكُمْ يَنفَدُ`,`مَا`,`Mevsûl (isim)`,`ma`,`Yanınızdaki şey tükenir; <span class="ar">ما</span> yerine "<span class="ar">الذي</span>" konur.`],
[`وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ`,`مَا`,`Şart (isim)`,`ma`,`İki fiil cezmedilmiş (<span class="ar">تفعلوا</span>, <span class="ar">يعلمه</span>): şart ismi.`],
[`وَمَا تِلْكَ بِيَمِينِكَ يَا مُوسَىٰ`,`مَا`,`İstifham (isim)`,`ma`,`"Nedir?" sorusu.`],
[`مَا أَحْسَنَ زَيْدًا`,`مَا`,`Ta'accub`,`ma`,`Hayret kalıbı: "ne güzel!"`],
[`مَرَرْتُ بِمَا مُعْجِبٍ لَكَ`,`مَا`,`Nekra mevsûfe`,`ma`,`"<span class="ar">شيء</span>" anlamında nekra, arkasından sıfat gelmiş.`],
[`مَا هَٰذَا بَشَرًا`,`مَا`,`Nâfiye`,`ma`,`"Bu insan değil": olumsuzluk harfi.`],
[`وَدُّوا مَا عَنِتُّمْ`,`مَا`,`Masdariyye`,`ma`,`<span class="ar">ما عنتم</span> = <span class="ar">عنتكم</span>.`],
[`إِنَّمَا اللَّهُ إِلَٰهٌ وَاحِدٌ`,`مَا`,`Kâffe`,`ma`,`<span class="ar">إنّ</span>'yi amelden alıkoyar.`],
[`فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ`,`مَا`,`Zâide`,`ma`,`Pekiştirme; çıkarsan cümle bozulmaz.`],
[`مَن يَعْمَلْ سُوءًا يُجْزَ بِهِ`,`مَن`,`Şartiyye`,`min`,`İki fiil cezmedilmiş.`],
[`مَن بَعَثَنَا مِن مَّرْقَدِنَا`,`مَن`,`İstifhâmiyye`,`min`,`"Kim?" sorusu.`],
[`وَمِنَ الشَّيَاطِينِ مَن يَغُوصُونَ لَهُ`,`مَن`,`Mevsûle`,`min`,`"Dalanlar" anlamında, sıla cümlesi var.`],
[`مَرَرْتُ بِمَنْ مُعْجِبٍ لَكَ`,`مَنْ`,`Nekra mevsûfe`,`min`,`Arkasından sıfat gelmiş nekra.`],
[`وَالَّذِي أَطْمَعُ أَن يَغْفِرَ لِي`,`أَن`,`Masdariyye`,`en`,`Müdâri' mansûb; <span class="ar">أن يغفر</span> = bağışlama.`],
[`عَلِمَ أَن سَيَكُونُ مِنكُم مَّرْضَىٰ`,`أَن`,`Muhaffefe`,`en`,`<span class="ar">سيكون</span> öncesinde: şe'n zamiri mahzuf, muhaffefe.`],
[`فَأَوْحَيْنَا إِلَيْهِ أَنِ اصْنَعِ الْفُلْكَ`,`أَنِ`,`Müfessire`,`en`,`Vahiy "söz" anlamlıdır; arkasından cümle açıklıyor.`],
[`فَلَمَّا أَن جَاءَ الْبَشِيرُ`,`أَن`,`Zâide`,`en`,`<span class="ar">لما</span> sonrası pekiştirme.`],
[`إِن تَقُمْ أَقُمْ`,`إِن`,`Şartiyye`,`in`,`İki fiili cezmeder.`],
[`إِنْ عِندَكُم مِّن سُلْطَانٍ بِهَٰذَا`,`إِنْ`,`Nâfiye`,`in`,`"Elinizde delil yok."`],
[`مَا إِنْ زَيْدٌ قَائِمٌ`,`إِنْ`,`Zâide`,`in`,`<span class="ar">ما</span> ile birlikte nefyi pekiştirir.`],
[`وَإِنْ كُلًّا لَمَّا لَيُوَفِّيَنَّهُمْ`,`إِنْ`,`Muhaffefe`,`in`,`<span class="ar">إنّ</span>'nin hafifletilmişi; <span class="ar">كلا</span>'yı nasbeder.`],
[`لَا إِلَٰهَ إِلَّا اللَّهُ`,`لَا`,`Nâfiye`,`la`,`"İlâh yok."`],
[`لَا تَقُمْ`,`لَا`,`Nâhiye`,`la`,`"Kalkma!"; müdâri'yi cezmeder.`],
[`لِئَلَّا يَعْلَمَ أَهْلُ الْكِتَابِ`,`لِئَلَّا`,`Zâide`,`la`,`<span class="ar">ليعلم</span> anlamı; pekiştirme.`],
[`أَيًّا مَّا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ`,`أَيًّا`,`Şartiyye`,`ey`,`<span class="ar">تدعوا</span> cezmedilmiş.`],
[`أَيُّكُمْ زَادَتْهُ هَٰذِهِ إِيمَانًا`,`أَيُّكُمْ`,`İstifhâmiyye`,`ey`,`"Hanginiz?"`],
[`لَنَنزِعَنَّ مِن كُلِّ شِيعَةٍ أَيُّهُمْ أَشَدُّ`,`أَيُّهُمْ`,`Mevsûle`,`ey`,`"<span class="ar">الذي</span> en şiddetli ise" anlamı.`],
[`مَرَرْتُ بِرَجُلٍ أَيِّ رَجُلٍ`,`أَيِّ`,`Sıfat`,`ey`,`"Ne adam!" kemâl anlamlı sıfat.`],
[`يَا أَيُّهَا الْإِنسَانُ`,`أَيُّهَا`,`Nidâda vasl`,`ey`,`<span class="ar">الإنسان</span>'a ulaşmak için köprü.`]
];
// müteallak avcısı: [ar, hedef, soru, seçenekler, doğru idx, açıklama]
const MUT=[
[`أَنْعَمْتَ عَلَيْهِمْ`,`عَلَيْهِمْ`,[`<span class="ar">أَنْعَمْتَ</span>`,`Mahzuf <span class="ar">كائن</span>`,`Müteallakı yok`],0,`Fiile müteallak.`],
[`غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ`,`عَلَيْهِمْ`,[`<span class="ar">غير</span>`,`<span class="ar">المغضوب</span> (ism-i mef'ûl)`,`Müteallakı yok`],1,`İsm-i mef'ûl fiil anlamı taşır.`],
[`رَأَيْتُ طَائِرًا عَلَىٰ غُصْنٍ`,`عَلَىٰ غُصْنٍ`,[`<span class="ar">رأيت</span>`,`Mahzuf sıfat <span class="ar">كائنًا</span>`,`Müteallakı yok`],1,`<span class="ar">طائر</span> nekra, şibh-i cümle sıfat; mahzuf <span class="ar">كائنًا</span>.`],
[`فَخَرَجَ عَلَىٰ قَوْمِهِ فِي زِينَتِهِ`,`فِي زِينَتِهِ`,[`<span class="ar">خرج</span>`,`Mahzuf hâl <span class="ar">متزينًا</span>`,`Müteallakı yok`],1,`Hâl olduğu için mahzuf hâle müteallak.`],
[`رَأَيْتُ الْهِلَالَ بَيْنَ السَّحَابِ`,`بَيْنَ السَّحَابِ`,[`Mahzuf hâl <span class="ar">كائنًا</span>`,`Mahzuf sıfat`,`Müteallakı yok`],0,`<span class="ar">الهلال</span> ma'rife: hâl.`],
[`الْحَمْدُ لِلَّهِ`,`لِلَّهِ`,[`Mahzuf haber <span class="ar">كائن</span> / <span class="ar">استقر</span>`,`<span class="ar">الحمد</span>`,`Müteallakı yok`],0,`Mübtedânın haberi mahzuf.`],
[`وَلَهُ مَن فِي السَّمَاوَاتِ`,`فِي السَّمَاوَاتِ`,[`<span class="ar">كائن</span> (ism-i fâil)`,`<span class="ar">استقر</span> (fiil)`,`Müteallakı yok`],1,`Sıla'da yalnız fiil takdir edilir.`],
[`وَكَفَىٰ بِاللَّهِ شَهِيدًا`,`بِاللَّهِ`,[`<span class="ar">كفى</span>`,`Mahzuf <span class="ar">كائن</span>`,`Müteallakı yok (zâid bâ)`],2,`Zâid bâ'nın müteallakı yoktur.`],
[`زَيْدٌ كَعَمْرٍو`,`كَعَمْرٍو`,[`Mahzuf haber`,`<span class="ar">زيد</span>`,`Müteallakı yok (kâf-ı teşbîh)`],2,`Kâf-ı teşbîhin müteallakı aranmaz.`],
[`لَوْلَاكَ فِي ذَا الْعَامِ لَمْ أَحْجُجِ`,`لَوْلَاكَ`,[`<span class="ar">أحجج</span>`,`Mahzuf haber`,`Müteallakı yok (<span class="ar">لولا</span>)`],2,`Dört istisnadan biri: <span class="ar">لولا</span>.`]
];
// eşleştirme: [harf, anlam]
const ESLES=[
[`وَ`,`mutlak toplama (cem')`],[`حَتَّىٰ`,`cem' + gâye`],[`فَ`,`tertîb + hemen ardından`],[`ثُمَّ`,`tertîb + mühlet`],
[`قَدْ`,`tahkîk, tevakku', taklîl`],[`سَوْفَ`,`istikbâl (tenfîs)`],[`لَمْ`,`müdâri'yi nefy + geçmişe çevirme + cezm`],[`لَنْ`,`nefy + nasb + istikbâl`],
[`إِذَنْ`,`cevap ve cezâ`],[`لَوْ`,`imtinâ li-imtinâ`],[`لَوْلَا`,`imtinâ li-vücûd`],[`لَمَّا (mâzî ile)`,`vücûd li-vücûd`],
[`نَعَمْ`,`tasdîk, va'd, i'lâm`],[`أَجَلْ`,`yalnız haberi tasdîk`],[`بَلَىٰ`,`olumsuzu olumlu yapma`],[`إِذَا`,`gelecek zarfı + şart`],
[`إِذْ`,`geçmiş zaman zarfı`],[`كَلَّا`,`redd ve zecr`]];
// adım adım i'rab: [cümle, tr, [[kelime, doğru kategori, açıklama]...]]
const KAT=[`Mübtedâ`,`Haber`,`Fâil`,`Mef'ûl bih`,`Hâl`,`Nat (sıfat)`,`Muzâf ileyh`,`Fiil-i mâzî`,`Fiil-i müdâri'`,`Harf`,`Car-mecrûr`,`Mecrûr isim`,`İsm-i inne`,`İsm-i kâne`,`Atıf harfi`,`Ma'tûf`]
const KAT_AYR=[[`Car-mecrûr`,`Mecrûr isim`],[`Mübtedâ`,`İsm-i inne`,`İsm-i kâne`],[`Fiil-i mâzî`,`Fiil-i müdâri'`],[`Haber`,`Hâl`]];;
const IRAB=[
[`زَيْدٌ قَائِمٌ`,`Zeyd ayaktadır.`,[[`زَيْدٌ`,`Mübtedâ`,`Başta duran, haberi bekleyen isim; merfû'.`],[`قَائِمٌ`,`Haber`,`Mübtedâyı tamamlar; merfû'.`]]],
[`قَامَ زَيْدٌ`,`Zeyd kalktı.`,[[`قَامَ`,`Fiil-i mâzî`,`Fetha üzerine mebnî.`],[`زَيْدٌ`,`Fâil`,`İşi yapan; merfû'.`]]],
[`إِنَّ زَيْدًا أَبُوهُ قَائِمٌ`,`Zeyd'in babası ayaktadır.`,[[`إِنَّ`,`Harf`,`Nâsıh harf; mahalli yok.`],[`زَيْدًا`,`İsm-i inne`,`<span class="ar">إنّ</span> ismi nasbeder.`],[`أَبُوهُ`,`Mübtedâ`,`Vâv ile merfû' (beş isimden); aynı zamanda muzâf.`],[`قَائِمٌ`,`Haber`,`<span class="ar">أبوه</span>'nun haberi; <b>أبوه قائم</b> cümlesi <span class="ar">إنّ</span>'nin haberi, rafʿ mahallinde.`]]],
[`جَاءَ زَيْدٌ يَضْحَكُ`,`Zeyd güleyerek geldi.`,[[`جَاءَ`,`Fiil-i mâzî`,`Fetha üzerine mebnî.`],[`زَيْدٌ`,`Fâil`,`Merfû', damme.`],[`يَضْحَكُ`,`Hâl`,`Cümle olarak nasb mahallinde hâl; kendisi fiil-i müdâri' merfû'.`]]],
[`قَالَ زَيْدٌ عَمْرٌو مُنْطَلِقٌ`,`Zeyd "Amr yola çıktı" dedi.`,[[`قَالَ`,`Fiil-i mâzî`,`Fetha üzerine mebnî.`],[`زَيْدٌ`,`Fâil`,`Merfû'.`],[`عَمْرٌو`,`Mübtedâ`,`Mekûlü'l-kavl cümlesinin başı.`],[`مُنْطَلِقٌ`,`Haber`,`<b>عمرو منطلق</b> cümlesi <span class="ar">قال</span>'nin mef'ûl bih'i, nasb mahallinde.`]]],
[`الْحَمْدُ لِلَّهِ`,`Hamd Allah'a mahsustur.`,[[`الْحَمْدُ`,`Mübtedâ`,`Merfû'; haberi mahzuf.`],[`لِلَّهِ`,`Car-mecrûr`,`Mahzuf habere müteallak (<span class="ar">كائن</span> / <span class="ar">استقر</span>).`]]],
[`مَرَرْتُ بِرَجُلٍ صَالِحٍ`,`Salih bir adama uğradım.`,[[`مَرَرْتُ`,`Fiil-i mâzî`,`Sükûn üzerine mebnî (tâ-i fâil ile); tâ zamiri fâil.`],[`بِرَجُلٍ`,`Car-mecrûr`,`Cer harfi <span class="ar">بِ</span> + mecrûr isim <span class="ar">رَجُلٍ</span>; <span class="ar">مررت</span>'e müteallak.`],[`صَالِحٍ`,`Nat (sıfat)`,`<span class="ar">رجل</span>'in sıfatı; ona tâbi, mecrûr.`]]],
[`جَاءَ زَيْدٌ وَعَمْرٌو`,`Zeyd ve Amr geldi.`,[[`جَاءَ`,`Fiil-i mâzî`,`Fetha üzerine mebnî.`],[`زَيْدٌ`,`Fâil`,`Merfû'.`],[`وَعَمْرٌو`,`Ma'tûf`,`<span class="ar">و</span> mutlak cem' atıf harfidir (mahalli yok); <span class="ar">عمرو</span> Zeyd'e ma'tûf; ma'tûf, ma'tûf aleyhin i'rabını alır (fâile ma'tûf olduğu için merfû').`]]],
[`كَانَ زَيْدٌ قَائِمًا`,`Zeyd ayaktaydı.`,[[`كَانَ`,`Fiil-i mâzî`,`Nâkıs fiil; fetha üzerine mebnî.`],[`زَيْدٌ`,`İsm-i kâne`,`Kâne'nin ismi, merfû'.`],[`قَائِمًا`,`Haber`,`Kâne'nin haberi, mansûb.`]]]
];
// beyit: [beyit adı, mısra metni, [[cümle, tür, açıklama]]]
const BEYIT=[
[`1. Beyit (Zevâvî) — mahalli olan 7 cümle`,[`مَنْ ظَنَّنِي أَعْلَمْتُهُ فَضْلِي ظَهَرْ`,`إِذْ صُغْتُ نَظْمًا اسْتَنَارَ وَزَهَرْ`,`فَاللَّهُ يَعْلَمُ أَكُنْتُ كِدْتُ`,`أَقُولُ أَنْوِي الْخَيْرَ إِنِّي سُدْتُ`],[
[`ظَنَّنِي`,`haber`,`<span class="ar">من</span> mübtedâsının haberi, rafʿ mahallinde.`],
[`أَعْلَمْتُهُ`,`mefulbih`,`<span class="ar">ظن</span>'nin ikinci mef'ûlü, nasb mahallinde.`],
[`ظَهَرْ`,`mefulbih`,`<span class="ar">أعلم</span>'nin üçüncü mef'ûlü, nasb mahallinde.`],
[`صُغْتُ`,`muzaf`,`<span class="ar">إذ</span> zarfından sonra muzâf ileyh, cerr mahallinde.`],
[`اسْتَنَارَ`,`tabimufred`,`<span class="ar">نظمًا</span>'nın sıfatı, nasb mahallinde.`],
[`زَهَرْ`,`tabicumle`,`<span class="ar">استنار</span>'a ma'tûf, nasb mahallinde.`],
[`اللَّهُ يَعْلَمُ`,`sartcevab`,`<span class="ar">من</span> şartının cevabı, fâ ile bağlı; cezm mahallinde.`],
[`كُنْتُ`,`mefulbih`,`<span class="ar">يعلم</span>'nin mef'ûl bih'i, nasb mahallinde.`],
[`كِدْتُ|أَقُولُ`,`haber`,`<span class="ar">كان</span>'nin haberi, nasb mahallinde.`],
[`أَقُولُ`,`haber`,`<span class="ar">كاد</span>'nin haberi, nasb mahallinde.`],
[`أَنْوِي`,`hal`,`<span class="ar">أقول</span> fiilinin fâilinden hâl, nasb mahallinde.`],
[`سُدْتُ`,`haber`,`<span class="ar">إنّ</span>'nin haberi, rafʿ mahallinde.`]]],
[`2. Beyit (Zevâvî) — mahalli olmayan 7 cümle`,[`آلَيْتُ أَيْ أَقْسَمْتُ وَالْقَسَمُ بَرْ`,`لَوْ تَابَ مَنْ عَصَى لَعَزَّ وَانْتَصَرْ`],[
[`آلَيْتُ`,`ibtida`,`Söze başlıyor; müsta'nefe.`],
[`أَقْسَمْتُ`,`tefsir`,`<span class="ar">أي</span> tefsir harfidir; <span class="ar">آليت</span>'yi açıklar.`],
[`وَالْقَسَمُ بَرْ`,`mutariza`,`Araya girmiş cümle.`],
[`تَابَ`,`kasem`,`Kitabın i'rabına göre yemin cevabı.`],
[`عَصَى`,`sila`,`<span class="ar">من</span> ism-i mevsûlünün sılası.`],
[`لَعَزَّ`,`sartgayr`,`<span class="ar">لو</span> câzim olmayan şart harfidir; cevabı mahalli olmayan.`],
[`وَانْتَصَرْ`,`tabigayr`,`Mahalli olmayan <span class="ar">عز</span>'e ataf.`]]]
];
// sıralama: [başlık, [adımlar doğru sırada]]
const SIRA=[
[`Cümlenin mahallini bulma testi`,[`Cümleyi belirle (hangi bölüm?)`,`Yerine tek kelime koymayı dene`,`Kelime i'rab alıyor mu bak`,`Alıyorsa: hangi rolde? (haber, hâl, nat…)`,`Almıyorsa: mahalli olmayan 7 cümleden hangisi?`]],
[`Car-mecrûrun müteallakını bulma`,[`Car-mecrûrü işaretle`,`Cer harfi dört müstesnadan biri mi? (zâid bâ, lealle, levlâ, kâf)`,`Değilse yakındaki fiil ya da fiil benzerine bak`,`Bulamazsan öndeki ismin nekra mı ma'rife mi olduğuna bak`,`Nekraysa sıfat, ma'rifeyse hâl; takdir <span class="ar">كائن</span> / <span class="ar">استقر</span>`]],
[`Cümlenin sıfat/hâl tayini`,[`Cümlenin öndeki ismini bul`,`İsmin mahza nekra mı mahza ma'rife mi olduğuna bak`,`Mahza nekraysa: sıfat`,`Mahza ma'rifeyse: hâl`,`İkisi de değilse: iki ihtimali birden yaz`]]
];
// doğru / yanlış: [ifade, doğru mu, açıklama]
const DY=[
[`Faydalı söz hem kelâm hem cümle diye anılır.`,1,`Müellif iki adı aynı anlamda kullanır.`],
[`Fiille başlayan cümle ismiyyedir.`,0,`Fiille başlıyorsa fi'liyye.`],
[`Başka cümleye bina edilmiş cümle kübrâdır.`,0,`O suğrâdır; kübrâ, içinde başka cümle taşıyandır.`],
[`Hâl olan cümle nasb mahallindedir.`,1,`Hâl daima mansûbdur; cümle ise nasb mahallinde.`],
[`Sıla cümlesinin i'rabda mahalli vardır.`,0,`Sıla mahalli olmayan yedi cümleden biridir.`],
[`Mu'tarıza araya giren cümledir.`,1,`Şart ve cevabı gibi iki parça arasına girer.`],
[`Câzim olmayan şartın cevabının mahalli yoktur.`,1,`<span class="ar">لو</span>, <span class="ar">لما</span>, <span class="ar">إذا</span> cevapları mahalli olmayanlardandır.`],
[`Her şart cevabının cezm mahalli vardır.`,0,`Yalnız fâ/izâ-i fücâ'e ile gelen câzim şart cevabının vardır.`],
[`Müfred testi, cümlenin mahalli olup olmadığını anlamaya yarar.`,1,`Yerine tek kelime konunca i'rab alıyorsa mahalli vardır.`],
[`Zâid bâ'nın müteallakı bulunmalıdır.`,0,`Müteallaksızdır.`],
[`Sıla cümlesindeki şibh-i cümlede <span class="ar">استقر</span> takdir edilir.`,1,`Sıla cümle olduğundan fiil takdiri gerekir.`],
[`<span class="ar">بلى</span> olumlu soruya olumlu cevap verir.`,0,`Olumsuz soruyu olumlu yapar.`],
[`<span class="ar">إذا</span> gelecek, <span class="ar">إذ</span> geçmiş zaman zarfıdır.`,1,`Doğru.`],
[`<span class="ar">لن</span> müdâri'yi mecz eder.`,0,`<span class="ar">لن</span> nasbeder; mecz eden <span class="ar">لم</span>.`],
[`<span class="ar">ما</span> hem isim hem harf olabilir.`,1,`İsim: mevsûl, şart…; harf: nâfiye, masdariyye…`],
[`<span class="ar">لا</span>'nın nâhiye türü müdâri'yi cezmeder.`,1,`<span class="ar">لا تقم</span>.`],
[`<span class="ar">إنَّمَا</span> içindeki <span class="ar">ما</span> nâfiyedir.`,0,`Kâffedir; <span class="ar">إنّ</span>'yi amelden keser.`],
[`<span class="ar">أَنِ اصْنَعِ الْفُلْكَ</span> içindeki <span class="ar">أَنِ</span> müfessiredir.`,1,`Vahiy fiilinden sonra açıklama.`],
[`<span class="ar">أَيّ</span> yalnız istifham için kullanılır.`,0,`Şart, istifham, mevsûl, sıfat ve nidâda vasl olur.`],
[`<span class="ar">حَتَّىٰ</span> atıfta mutlak cem' ve gâye bildirir.`,1,`Doğru.`],
[`<span class="ar">فَ</span> sıra bildirir ama mühlet vermez.`,1,`Tertîb ve ta'kîb.`],
[`<span class="ar">ثُمَّ</span> hemen ardından getirir.`,0,`Mühletle getirir.`]
];
