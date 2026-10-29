/* Vakalar: dallanan senaryolar. adım: {s:soru, ar:opsiyonel Arapça, o:[[metin, doğru?, geri bildirim]]} */
const VAKA=[
{id:'v1',ad:`Medrese Tahtasındaki Âyet`,ikon:`📜`,ozet:`Hoca tahtaya Bakara 24'ü yazdı ve sana döndü.`,
giris:`Ders başlamak üzere. Hoca tahtaya şu âyeti yazıyor ve sana dönüp soruyor: "Bu âyette <b>ولن تفعلوا</b> cümlesinin i'rabdaki durumu nedir?"`,
adim:[
{ar:`فَإِن لَّمْ تَفْعَلُوا وَلَن تَفْعَلُوا فَاتَّقُوا النَّارَ`,s:`İlk iş: <b>ولن تفعلوا</b> cümlesi şart ile cevabının arasına girmiştir. Bu cümleye ne dersin?`,o:[[`Câzim şartın cevabıdır`,0,`Cevap <b>فاتقوا النار</b>'dır, çünkü <span class="ar">فاء</span> ile bağlanmış. Aradaki cümle cevap olamaz.`],[`Mu'tarıza (araya giren cümle)`,1,`Doğru! Şart ile cevabı arasına girdiği için mu'tarıza.`],[`Sıla cümlesidir`,0,`Sıla ism-i mevsûlden sonra gelir; burada mevsûl yok.`]]},
{s:`Hoca devam ediyor: "Peki mu'tarıza cümlenin mahalli var mı?"`,o:[[`Var, nasb mahallinde`,0,`Mu'tarıza mahalli olmayan yedi cümleden biridir.`],[`Yok`,1,`Doğru! Mahalli olmayan yedi cümleden biri.`],[`Var, cezm mahallinde`,0,`Cezm mahalli câzim şartın cevabı içindir; mu'tarıza değil.`]]},
{s:`Son soru: <b>فاتقوا النار</b> cümlesi için ne dersin?`,o:[[`Mu'tarıza`,0,`Hayır, o şartın cevabıdır.`],[`Câzim şartın cevabı; fâ ile bağlı, cezm mahallinde`,1,`Tam isabet. Fâ ile bağlanan câzim şart cevabı cezm mahallindedir.`],[`İbtidâiyye`,0,`Cümle şarta bağlı, yeni bir söz başlatmıyor.`]]}]},
{id:'v2',ad:`Yolculukta Bir Adam`,ikon:`🧳`,ozet:`Hâl mi, sıfat mı? Yolcu arkadaşın sorar.`,
giris:`Medreseye dönerken yanındaki arkadaşın şu cümleyi söylüyor: <b>مررت برجل صالح يصلي</b>. "Hocamız bunun <i>يصلي</i> kısmını hem sıfat hem hâl dedi, nasıl olur?" diye soruyor.`,
adim:[
{ar:`مَرَرْتُ بِرَجُلٍ صَالِحٍ يُصَلِّي`,s:`Önce kurala bak: <span class="ar">رجل</span> mahza nekra mı?`,o:[[`Evet, mahza nekradır`,0,`<span class="ar">صالح</span> sıfatı ile tahsis edilmiş. Mahza nekra değil.`],[`Hayır, sıfatla tahsis edilmiş`,1,`Doğru! Mahza nekra olmayınca iki ihtimal doğar.`],[`Ma'rifedir`,0,`<span class="ar">رجل</span> nekradır.`]]},
{s:`Bu durumda <b>يصلي</b> için ne yazarsın?`,o:[[`Yalnız hâl`,0,`İki ihtimali de yazmalısın.`],[`Yalnız sıfat`,0,`İki ihtimali de yazmalısın.`],[`Sıfat (cerr mahalli) ya da hâl (nasb mahalli)`,1,`Doğru! Mahza olmayan nekra/ma'rife arası iki vecih caizdir.`]]},
{s:`Arkadaşın bir de <span class="ar">رَأَيْتُ طَائِرًا يَطِيرُ</span> der. Burada <b>يطير</b>?`,o:[[`Sıfat`,1,`<span class="ar">طائرًا</span> mahza nekra → sıfat.`],[`Hâl`,0,`Hâl için mahza ma'rife gerek.`],[`İbtidâiyye`,0,`Cümle bir isme bağlı, yeni söz değil.`]]}]},
{id:'v3',ad:`Kayıp Müteallak`,ikon:`🧲`,ozet:`Hamd cümlesinin mıknatısı nerede?`,
giris:`Nahiv müsvedden ders çalışırken sayfada <b>الحمد لله</b> yazıyor ve kenarda not: "<i>lillâh müteallak?</i>" Cevabı bulman gerek.`,
adim:[
{ar:`الْحَمْدُ لِلَّهِ`,s:`<span class="ar">الحمد</span> mübtedâ. <span class="ar">لله</span> neye bağlanır?`,o:[[`<span class="ar">الحمد</span> kelimesine`,0,`Mübtedâ fiil gibi çalışmaz; müteallak olamaz.`],[`Mahzuf habere (<span class="ar">كائن</span> / <span class="ar">استقر</span>)`,1,`Doğru! Haber mahzuf; car-mecrûr ona müteallak.`],[`Hiçbir şeye`,0,`<span class="ar">لام</span> dört müstesnadan biri değil.`]]},
{s:`Bu takdirde <span class="ar">كائن</span> ile <span class="ar">استقر</span> arasında seçim hakkın var mı?`,o:[[`Evet, ikisi de olur`,1,`Haber olduğu için ikisi de caiz.`],[`Hayır, yalnız <span class="ar">كائن</span>`,0,`Yalnız sıla'da tek ihtimal vardır: <span class="ar">استقر</span>.`],[`Hayır, yalnız <span class="ar">استقر</span>`,0,`Haberde ikisi de olur.`]]},
{ar:`وَلَهُ مَن فِي السَّمَاوَاتِ وَالْأَرْضِ`,s:`Not defterinde bir de bu âyet var. <span class="ar">في السماوات</span> sıla ise takdir ne olur?`,o:[[`<span class="ar">كائن</span> ya da <span class="ar">استقر</span>`,0,`Sıla'da bu serbestlik yok.`],[`Yalnız <span class="ar">استقر</span>`,1,`Doğru! Sıla cümle olduğundan fiil takdir edilir.`],[`Hiçbir takdir gerekmez`,0,`Şibh-i cümle mutlaka bir şeye bağlanır.`]]}]},
{id:'v4',ad:`Joker Kart: Ma`,ikon:`🃏`,ozet:`Aynı harf, üç farklı cümle...`,
giris:`Kütüphanede üç cümle yan yana yazılı. Hepsi <b>ما</b> içeriyor. Müsvedde yazan arkadaşın kafası karışmış.`,
adim:[
{ar:`مَا عِندَكُمْ يَنفَدُ`,s:`Birinci cümlede <span class="ar">ما</span>?`,o:[[`Nâfiye`,0,`Olumsuzluk anlamı yok.`],[`Mevsûl (isim): "yanınızdaki şey"`,1,`Doğru! Yerine "<span class="ar">الذي</span>" koyabilirsin.`],[`Kâffe`,0,`Kâffe <span class="ar">إنّ</span> gibi bir harfin ardından gelir.`]]},
{ar:`إِنَّمَا اللَّهُ إِلَٰهٌ وَاحِدٌ`,s:`İkinci cümlede <span class="ar">ما</span>?`,o:[[`Kâffe`,1,`Doğru! <span class="ar">إنّ</span>'yi amelden keser; <span class="ar">الله</span> artık mübtedâ.`],[`Masdariyye`,0,`Masdariyye müdâri'yle birlikte kullanılır.`],[`Zâide`,0,`Zâide olsaydı <span class="ar">إنّ</span> amel ederdi.`]]},
{ar:`مَا أَحْسَنَ زَيْدًا`,s:`Üçüncü cümlede <span class="ar">ما</span>?`,o:[[`İstifham`,0,`"Zeyd'i ne güzelleştirdi?" gibi okunabilirdi ama kalıp taaccubdur.`],[`Ta'accub`,1,`Doğru! "Zeyd ne güzel!"`],[`Şart`,0,`Cezmedilen fiil yok.`]]}]},
{id:'v5',ad:`Şart Cevabı Tuzağı`,ikon:`🪤`,ozet:`Hangi cevap cezm mahallinde?`,
giris:`Sınavda iki ayrı şart cümlesi karşına çıkıyor. Hangisinin cevabı cezm mahallindedir?`,
adim:[
{ar:`مَن يُضْلِلِ اللَّهُ فَلَا هَادِيَ لَهُ`,s:`Cevap cümlesi <b>فلا هادي له</b>: ne dersin?`,o:[[`Cezm mahallinde, fâ ile bağlı`,1,`Doğru! Câzim şartın cevabı fâ ile gelince cezm mahallinde sayılır.`],[`Mahalli yok`,0,`Fâ ile bağlandığı için mahalli var.`],[`Nasb mahallinde`,0,`Hâl değil, cevap.`]]},
{ar:`وَلَوْ شِئْنَا لَرَفَعْنَاهُ بِهَا`,s:`Peki <b>لرفعناه بها</b>?`,o:[[`Cezm mahallinde`,0,`<span class="ar">لو</span> câzim değildir.`],[`Mahalli yok, câzim olmayan şartın cevabı`,1,`Doğru!`],[`Hâl`,0,`Bu bir cevap cümlesi.`]]},
{ar:`وَإِن تُصِبْهُمْ سَيِّئَةٌ بِمَا قَدَّمَتْ أَيْدِيهِمْ إِذَا هُمْ يَقْنَطُونَ`,s:`Son olarak <b>إذا هم يقنطون</b>?`,o:[[`Mahalli yok`,0,`Fücâ'e izâsı fâ gibi iş görür; cezm mahalli var.`],[`Cezm mahallinde, fücâ'e izâsı ile bağlı`,1,`Doğru! <span class="ar">إذا</span> fâ'nın yerini tutar.`],[`Muzâf ileyh`,0,`Zaman zarfı yok.`]]}]},
{id:'v6',ad:`Zevâvî'nin Bilmecesi`,ikon:`🪶`,ozet:`Beytin içinde üç cümleyi çöz.`,
giris:`Eski bir defterde Ebû İshâk ez-Zevâvî'nin nazmettiği beyit yazılı: <b>مَنْ ظَنَّنِي أَعْلَمْتُهُ فَضْلِي ظَهَرْ</b>. Üç cümlenin görevini bulmalısın.`,
adim:[
{ar:`مَنْ ظَنَّنِي أَعْلَمْتُهُ فَضْلِي ظَهَرْ`,s:`<b>ظنني</b> cümlesi <span class="ar">من</span> şart ismine göre nedir?`,o:[[`<span class="ar">من</span>'in haberi, rafʿ mahallinde`,1,`Doğru! <span class="ar">من</span> mübtedâ, <span class="ar">ظنني</span> haberi.`],[`Hâl`,0,`Hâl değil.`],[`Sıla`,0,`<span class="ar">من</span> burada şart ismi, mevsûl değil.`]]},
{s:`<b>أعلمته</b> cümlesi <span class="ar">ظن</span> fiilinin neyidir?`,o:[[`İkinci mef'ûl, nasb mahallinde`,1,`Doğru! <span class="ar">ظن</span> iki mef'ûl alır.`],[`Hâl`,0,`Mef'ûl rolünde.`],[`Muzâf ileyh`,0,`Muzâf ileyh değil.`]]},
{s:`<b>ظهر</b> cümlesi <span class="ar">أعلم</span>'nin neyidir?`,o:[[`Üçüncü mef'ûl, nasb mahallinde`,1,`Doğru! <span class="ar">أعلم</span> üç mef'ûl alır.`],[`İbtidâiyye`,0,`Başlangıç değil; fiile bağlı.`],[`Mu'tarıza`,0,`Araya girmiş değil.`]]}]}
];
