/* ===== Nefy Terazisi — dersler =====
   m: [kaynak, harekeli metin] · tr: şerh · ex: [misal, açıklama] · q: [soru, seçenekler, doğru, açıklama]
   Metinler depodaki Emsile, Maksûd, İzhâru’l-Esrâr ve Avâmil programlarındaki neşirlerden alınmıştır. */
const LESSONS=[
{id:"n1",t:"Muzâri ve üç hâli",ar:"الْمُضَارِعُ: مَرْفُوعٌ وَمَنْصُوبٌ وَمَجْزُومٌ",e:null,
 m:[["Kitâbü’l-Maksûd","فَإِنَّهَا مَرْفُوعَةٌ فِي الْمَعْرُوفِ وَالْمَجْهُولِ مَا لَمْ يَكُنْ حَرْفٌ نَاصِبٌ يَنْصِبُهَا أَوْ جَازِمٌ يَجْزِمُهَا."],
    ["İzhâru’l-Esrâr","وَالتَّاسِعُ: الْمُضَارِعُ الْخَالِي عَنِ النَّوَاصِبِ وَالْجَوَازِمِ؛ نَحْوُ: يَضْرِبُ."],
    ["İzhâru’l-Esrâr","وَالْمُضَارِعُ الْمُتَّصِلُ بِهِ نُونُ جَمْعِ الْمُؤَنَّثِ، أَوْ نُونُ التَّأْكِيدِ…"]],
 tr:`<p>Maksûd muzâriyi anlatırken lâmü’l-fiil için şunu söyler: <b>ma‘lûmda da meçhûlde de merfûdur; ta ki onu nasb eden bir nâsıb veya cezm eden bir câzim gelmesin.</b> İzhâr da merfûları sayarken “nâsıb ve câzimden boş muzâri”yi dokuzuncu merfû olarak anar.</p>
 <p>Demek ki muzâri terazinin ortasında <b>merfû</b> olarak durur. Başına gelen edat ya onu olduğu gibi bırakır (<b>mâ, lâ</b>), ya <b>nasb</b> eder (<b>len</b>), ya da <b>cezm</b> eder (<b>lem, lemmâ</b>).</p>
 <ul><li><b>Müfred ve mütekellim sîgaları</b> (هُوَ، هِيَ، أَنْتَ، أَنَا، نَحْنُ): merfûda damme, mansûbda fetha, meczûmda sükûn.</li>
 <li><b>Ef‘âl-i hamse</b> (يَفْعَلَانِ، تَفْعَلَانِ، يَفْعَلُونَ، تَفْعَلُونَ، تَفْعَلِينَ): merfûda nûn durur; mansûb ve meczûmda <b>nûn düşer</b>.</li>
 <li><b>Nûn-ı nisve</b> (يَفْعَلْنَ، تَفْعَلْنَ): muzâri mebnî olur; hiçbir edat sonunu değiştirmez.</li></ul>`,
 ex:[["يَنْصُرُ · لَنْ يَنْصُرَ · لَمْ يَنْصُرْ","Müfred: damme, fetha, sükûn"],["يَنْصُرُونَ · لَنْ يَنْصُرُوا · لَمْ يَنْصُرُوا","Ef‘âl-i hamse: nûn düşer"],["يَنْصُرْنَ · لَنْ يَنْصُرْنَ · لَمْ يَنْصُرْنَ","Nûn-ı nisve: mebnî"]],
 q:[["Hiçbir edat girmemiş muzâri hangi hâldedir?",["Merfû","Mansûb","Meczûm","Mebnî"],0,"«مَرْفُوعَةٌ… مَا لَمْ يَكُنْ حَرْفٌ نَاصِبٌ أَوْ جَازِمٌ»"],
    ["يَنْصُرَانِ mansûb olunca ne olur?",["Nûn düşer: يَنْصُرَا","Sonu fethalanır: يَنْصُرَانَ","Değişmez","Sükûn alır"],0,"Ef‘âl-i hamsede nasb nûnun hazfiyledir."],
    ["يَكْتُبْنَ sîgası edat alınca neden değişmez?",["Nûn-ı nisve ile mebnîdir","Meçhûl olduğu için","Ef‘âl-i hamseden olduğu için","Edat amel etmediği için"],0,"«وَالْمُضَارِعُ الْمُتَّصِلُ بِهِ نُونُ جَمْعِ الْمُؤَنَّثِ» mebnîdir."],
    ["Hangisi ef‘âl-i hamseden değildir?",["تَنْصُرُ","تَنْصُرِينَ","يَنْصُرُونَ","تَنْصُرَانِ"],0,"Müfred müzekker muhâtab sonu damme ile i‘râb edilir."]]},
{id:"n2",t:"Emsile’de beş nefy",ar:"الْأَمْثِلَةُ الْمُخْتَلِفَةُ",e:null,
 m:[["Emsile-i Muhtelife","نَصَرَ يَنْصُرُ نَصْرًا… لَمْ يَنْصُرْ، لَمْ يُنْصَرْ، لَمَّا يَنْصُرْ، لَمَّا يُنْصَرْ، مَا يَنْصُرُ، مَا يُنْصَرُ، لَا يَنْصُرُ، لَا يُنْصَرُ، لَنْ يَنْصُرَ، لَنْ يُنْصَرَ"]],
 tr:`<p>Emsile-i Muhtelife, masdardan çıkan kalıpları sayarken muzârinin beş olumsuzunu ma‘lûm ve meçhûl olarak yan yana dizer. Her birinin kendi adı vardır:</p>
 <table class="tbl small"><tr><th>Edat</th><th>Adı</th><th>Mânâ</th><th>Hâl</th></tr>
 <tr><td>لَمْ يَنْصُرْ</td><td>Cahd-ı mutlak</td><td>yardım etmedi</td><td>meczûm</td></tr>
 <tr><td>لَمَّا يَنْصُرْ</td><td>Cahd-ı müstağrak</td><td>henüz yardım etmedi</td><td>meczûm</td></tr>
 <tr><td>مَا يَنْصُرُ</td><td>Nefy-i hâl</td><td>yardım etmiyor</td><td>merfû</td></tr>
 <tr><td>لَا يَنْصُرُ</td><td>Nefy-i istikbâl</td><td>yardım etmeyecek</td><td>merfû</td></tr>
 <tr><td>لَنْ يَنْصُرَ</td><td>Te’kîd-i nefy-i istikbâl</td><td>asla yardım etmeyecek</td><td>mansûb</td></tr></table>
 <p><b>Cahd</b> “inkâr”, <b>nefy</b> “olumsuzlama” demektir. Geçmişin olumsuzuna <i>cahd</i>, şimdiki ve geleceğin olumsuzuna <i>nefy</i> denmiştir.</p>`,
 ex:[["لَمْ يَنْصُرْ","Yardım etmedi"],["لَمَّا يَنْصُرْ","Henüz yardım etmedi"],["مَا يَنْصُرُ","Yardım etmiyor"],["لَا يَنْصُرُ","Yardım etmeyecek"],["لَنْ يَنْصُرَ","Asla yardım etmeyecek"]],
 q:[["لَمَّا يَنْصُرْ’ın adı nedir?",["Cahd-ı müstağrak","Cahd-ı mutlak","Nefy-i hâl","Nefy-i istikbâl"],0,"Olumsuzluk şu âna kadar uzanır (istiğrâk)."],
    ["Nefy-i hâl hangisidir?",["مَا يَنْصُرُ","لَا يَنْصُرُ","لَنْ يَنْصُرَ","لَمْ يَنْصُرْ"],0,"Mâ şimdiki zamanı olumsuzlar."],
    ["Emsile’de hangi ikisi meczûmdur?",["Lem ve lemmâ","Mâ ve lâ","Len ve lem","Lâ ve len"],0,"Lem ve lemmâ cezm eder."],
    ["Te’kîd-i nefy-i istikbâl hangi edatla yapılır?",["لَنْ","لَا","مَا","لَمَّا"],0,"Len geleceği te’kîdle olumsuzlar."]]},
{id:"n3",t:"مَا: nefy-i hâl",ar:"مَا لِنَفْيِ الْحَالِ",e:"ma",
 m:[["Kur’ân · Necm 53/3","﴿وَمَا يَنْطِقُ عَنِ الْهَوٰى﴾"],["Kur’ân · İnsân 76/30","﴿وَمَا تَشَاءُونَ إِلَّا أَنْ يَشَاءَ اللّٰهُ﴾"]],
 tr:`<p><b>Mâ</b> muzârinin başına gelince onu <b>değiştirmez</b>: fiil merfû kalır, ef‘âl-i hamsede nûn durur (<span class="ar">مَا تَشَاءُونَ</span>). Âmil değildir; sadece mânâyı <b>şimdiki zamanın olumsuzuna</b> (hâl) tahsis eder: <i>yapmıyor</i>.</p>
 <p>Mâ’nın başka kullanımları da vardır (ism-i mevsûl, istifhâm, şart; isim cümlesinde <i>leyse’ye benzeyen mâ</i>). Burada muzâriye giren <b>harf-i nefy</b> olan mâ söz konusudur; Avâmil’deki “mâ-yı müşebbehe bi-leyse” isim cümlesinde amel eder, fiile girmez.</p>
 <p>Nâkıs fiilde de durum aynıdır: <span class="ar">وَمَا يَنْطِقُ</span> gibi sahîhte damme görünür; <span class="ar">مَا يَدْعُو، مَا يَرْمِي، مَا يَخْشَى</span>’da damme takdîrîdir.</p>`,
 ex:[["مَا يَكْتُبُ","Yazmıyor"],["مَا تَشَاءُونَ","Dilemiyorsunuz (nûn durur)"],["مَا يَخْشَى","Haşyet duymuyor (damme takdîrî)"]],
 q:[["مَا + يَذْهَبُونَ nasıl olur?",["مَا يَذْهَبُونَ","مَا يَذْهَبُوا","مَا يَذْهَبْ","مَا يَذْهَبَ"],0,"Mâ amel etmez; nûn durur."],
    ["مَا يَكْتُبُ’nün anlamı?",["Yazmıyor","Yazmadı","Asla yazmayacak","Henüz yazmadı"],0,"Nefy-i hâl."],
    ["Mâ muzâride hangi zamanı olumsuzlar?",["Şimdiki zaman (hâl)","Geçmiş zaman","Te’kîdli gelecek","Emir"],0,"Adı da nefy-i hâldir."]]},
{id:"n4",t:"لَا: nefy-i istikbâl",ar:"لَا النَّافِيَةُ",e:"la",
 m:[["Kur’ân · Kâfirûn 109/2","﴿لَا أَعْبُدُ مَا تَعْبُدُونَ﴾"],["Kur’ân · Bakara 2/286","﴿لَا يُكَلِّفُ اللّٰهُ نَفْسًا إِلَّا وُسْعَهَا﴾"],["Avâmil (lâ-yı nâhiye)","وَالرَّابِعَةُ: (لَا) فِي النَّهْيِ؛ نَحْوُ: «لَا تُذْنِبْ»."]],
 tr:`<p><b>Lâ-yı nâfiye</b> de muzâriyi <b>değiştirmez</b>; fiil merfû kalır: <span class="ar">لَا أَعْبُدُ</span>. Emsile buna <b>nefy-i istikbâl</b> der: <i>yapmayacak</i>; çoğu zaman geniş zamanın olumsuzunu da verir: <i>yapmaz</i>.</p>
 <p><b>Dikkat — iki lâ:</b> Avâmil’in saydığı <b>lâ-yı nâhiye</b> bir talep (yasaklama) edatıdır ve <b>cezm eder</b>: <span class="ar">لَا تُذْنِبْ</span> “günah işleme!”. Biri haber verir, öteki emreder; farkı fiilin sonunda görürsün:</p>
 <table class="tbl small"><tr><th>Nâfiye (merfû)</th><th>Nâhiye (meczûm)</th></tr>
 <tr><td>لَا تَكْتُبُ — yazmayacaksın</td><td>لَا تَكْتُبْ — yazma!</td></tr>
 <tr><td>لَا تَكْتُبُونَ — yazmayacaksınız</td><td>لَا تَكْتُبُوا — yazmayın!</td></tr>
 <tr><td>لَا تَقُولُ — söylemeyeceksin</td><td>لَا تَقُلْ — söyleme!</td></tr></table>`,
 ex:[["لَا أَعْبُدُ","İbadet etmem / etmeyeceğim"],["لَا يُكَلِّفُ","Yüklemez (merfû)"],["لَا تَحْزَنْ","Üzülme! (nâhiye, meczûm)"]],
 q:[["لَا تَكْتُبُونَ’deki lâ hangisidir?",["Nâfiye (nûn durmuş)","Nâhiye","Lâ-yı nefy-i cins","Zâide"],0,"Nûn düşmemiş: fiil merfû."],
    ["لَا تَقُلْ’deki lâ hangisidir?",["Nâhiye (cezm etmiş)","Nâfiye","Nefy-i hâl","Len’in yerine"],0,"Orta harf düşmüş: meczûm."],
    ["لَا + يَخْرُجُونَ (nefy) nasıl olur?",["لَا يَخْرُجُونَ","لَا يَخْرُجُوا","لَا يَخْرُجْ","لَا يَخْرُجَ"],0,"Nâfiye lâ amel etmez."],
    ["Emsile’de لَا يَنْصُرُ’ın adı?",["Nefy-i istikbâl","Nefy-i hâl","Cahd-ı mutlak","Nehy-i gâib"],0,"Geleceğin olumsuzu."]]},
{id:"n5",t:"لَنْ: te’kîd-i nefy-i istikbâl",ar:"لَنْ لِلنَّفْيِ الْمُؤَكَّدِ فِي الِاسْتِقْبَالِ",e:"len",
 m:[["İzhâru’l-Esrâr","فَالنَّاصِبُ: أَرْبَعَةُ أَحْرُفٍ: أَنْ لِلْمَصْدَرِيَّةِ، وَلَنْ لِلنَّفْيِ الْمُؤَكَّدِ فِي الِاسْتِقْبَالِ، وَكَيْ لِلسَّبَبِيَّةِ، وَإِذَنْ لِلشَّرْطِ وَالْجَزَاءِ."],
    ["Avâmil","وَالثَّانِي: (لَنْ)؛ نَحْوُ: «لَنْ يَغْفِرَ اللهُ تَعَالَى لِلْكَافِرِينَ»."],
    ["Kur’ân · Âl-i İmrân 3/92","﴿لَنْ تَنَالُوا الْبِرَّ حَتّٰى تُنْفِقُوا مِمَّا تُحِبُّونَ﴾"]],
 tr:`<p><b>Len</b>, muzâriyi nasb eden dört harften biridir. İzhâr onu “<b>gelecekte te’kîdli nefy</b> için” diye tanımlar: <i>asla yapmayacak</i>. (Bu, Zemahşerî’nin dediği gibi ebedîlik <i>te’bîd</i> değil, kuvvetlendirme <i>te’kîd</i> bildirir.)</p>
 <ul><li>Müfred ve mütekellimde <b>fetha</b>: <span class="ar">لَنْ يَغْفِرَ</span>.</li>
 <li>Ef‘âl-i hamsede <b>nûn düşer</b>: <span class="ar">لَنْ تَنَالُوا</span> (aslı تَنَالُونَ).</li>
 <li>Nûn-ı nisvede değişmez: <span class="ar">لَنْ يَكْتُبْنَ</span>.</li>
 <li>Nâkıs vav/yâda fetha <b>görünür</b> (hafif olduğu için): <span class="ar">لَنْ يَدْعُوَ، لَنْ يَرْمِيَ</span>; elifte görünmez: <span class="ar">لَنْ يَخْشَى</span>.</li></ul>`,
 ex:[["لَنْ يَغْفِرَ","Asla bağışlamayacak (fetha)"],["لَنْ تَنَالُوا","Asla erişemeyeceksiniz (nûn düştü)"],["لَنْ تَرَانِي","Beni asla göremeyeceksin (A‘râf 7/143; fetha takdîrî)"]],
 q:[["لَنْ + يَكْتُبُونَ nasıl olur?",["لَنْ يَكْتُبُوا","لَنْ يَكْتُبُونَ","لَنْ يَكْتُبُونَا","لَنْ يَكْتُبْ"],0,"Nasb: nûnun hazfi."],
    ["Len muzâriye ne yapar?",["Nasb eder","Cezm eder","Amel etmez","Mebnî kılar"],0,"Nevâsıbdandır."],
    ["لَنْ + يَدْعُو?",["لَنْ يَدْعُوَ","لَنْ يَدْعُ","لَنْ يَدْعُو","لَنْ يَدْعُوا"],0,"«لَنْ يَغْزُوَ… لِخِفَّةِ الْفَتْحَةِ»"],
    ["İzhâr’a göre len ne içindir?",["Gelecekte te’kîdli nefy","Geçmişte nefy","Şimdiki zamanda nefy","Yasaklama"],0,"«لَنْ لِلنَّفْيِ الْمُؤَكَّدِ فِي الِاسْتِقْبَالِ»"]]},
{id:"n6",t:"لَمْ: cahd-ı mutlak",ar:"لَمْ: حَرْفُ نَفْيٍ وَجَزْمٍ وَقَلْبٍ",e:"lem",
 m:[["İzhâru’l-Esrâr","وَالْجَازِمُ: خَمْسَ عَشْرَةَ كَلِمَةً. أَرْبَعَةٌ مِنْهَا: حُرُوفٌ تَجْزِمُ فِعْلًا وَاحِدًا، وَهِيَ: لَمْ، وَلَمَّا لِنَفْيِ الْمَاضِي، وَلَامُ الْأَمْرِ، وَلَاءُ النَّهْيِ لِلطَّلَبِ."],
    ["Avâmil","الْأُولَى: (لَمْ)؛ نَحْوُ قَوْلِهِ تَعَالَى: ﴿لَمْ يَلِدْ وَلَمْ يُولَدْ﴾ [الإخلاص: ٣]."],
    ["Kur’ân · Bakara 2/24","﴿فَإِنْ لَمْ تَفْعَلُوا وَلَنْ تَفْعَلُوا فَاتَّقُوا النَّارَ﴾"]],
 tr:`<p><b>Lem</b>, tek fiili cezm eden dört harften biridir. Avâmil’in i‘râbında üç vasfı birlikte söylenir: <b>harf-i nefy, cezm ve kalb</b>. <i>Kalb</i>, muzârinin mânâsını <b>geçmişe çevirmesi</b>dir: <span class="ar">يَلِدُ</span> “doğurur” iken <span class="ar">لَمْ يَلِدْ</span> “doğurmadı”.</p>
 <ul><li>Müfred ve mütekellimde <b>sükûn</b>: <span class="ar">لَمْ يَلِدْ</span>.</li>
 <li>Ef‘âl-i hamsede <b>nûn düşer</b>: <span class="ar">لَمْ تَفْعَلُوا</span>.</li>
 <li>Nâkısta <b>illet harfi düşer</b>: <span class="ar">لَمْ يَدْعُ، لَمْ يَرْمِ، لَمْ يَخْشَ</span>.</li>
 <li>Ecvefte iki sâkin birleşir, <b>orta harf düşer</b>: <span class="ar">لَمْ يَقُلْ</span>.</li></ul>
 <p>Bakara 24’te lem ile len yan yana gelir: <span class="ar">لَمْ تَفْعَلُوا</span> “yapmadınız”, <span class="ar">لَنْ تَفْعَلُوا</span> “asla yapamayacaksınız”. İkisinde de nûn düşmüştür; biri cezm, öteki nasb ile.</p>`,
 ex:[["لَمْ يَلِدْ وَلَمْ يُولَدْ","Doğurmadı ve doğurulmadı (İhlâs 112/3)"],["أَلَمْ يَجِدْكَ يَتِيمًا","Seni yetim bulmadı mı? (Duhâ 93/6; misâl)"],["لَمْ تَفْعَلُوا","Yapmadınız (nûn düştü)"]],
 q:[["Lem’in i‘râbda sayılan üç vasfı?",["Nefy, cezm, kalb","Nefy, nasb, istikbâl","Nehy, cezm, talep","Nefy, ref‘, hâl"],0,"«حَرْفُ نَفْيٍ وَجَزْمٍ وَقَلْبٍ»"],
    ["لَمْ + يَقُولُ?",["لَمْ يَقُلْ","لَمْ يَقُولْ","لَمْ يَقُولَ","لَمْ يَقُولُ"],0,"İki sâkin: vav düşer."],
    ["لَمْ + يَرْمِي?",["لَمْ يَرْمِ","لَمْ يَرْمِيْ","لَمْ يَرْمِيَ","لَمْ يَرْمِي"],0,"İllet harfinin hazfi."],
    ["Kalb ne demektir?",["Muzârinin mânâsını geçmişe çevirmek","Harfi değiştirmek","Nasb etmek","Fiili isme çevirmek"],0,"لَمْ يَلِدْ: doğurmadı."]]},
{id:"n7",t:"لَمَّا: cahd-ı müstağrak",ar:"لَمَّا: النَّفْيُ الْمُتَّصِلُ بِالْحَالِ",e:"lemma",
 m:[["Avâmil","وَالثَّانِيَةُ: (لَمَّا)؛ نَحْوُ: «لَمَّا يَنْفَعْ عُمْرِي»."],
    ["Kur’ân · Hucurât 49/14","﴿قُلْ لَمْ تُؤْمِنُوا وَلٰكِنْ قُولُوا أَسْلَمْنَا وَلَمَّا يَدْخُلِ الْإِيمَانُ فِي قُلُوبِكُمْ﴾"],
    ["Kur’ân · Sâd 38/8","﴿بَلْ لَمَّا يَذُوقُوا عَذَابِ﴾"]],
 tr:`<p><b>Lemmâ</b> da lem gibi <b>cezm</b> ve <b>kalb</b> eder. Avâmil misali: <span class="ar">لَمَّا يَنْفَعْ عُمْرِي</span> “ömrüm (bana) henüz fayda vermedi”. Emsile adı <b>cahd-ı müstağrak</b>tır: olumsuzluk geçmişten konuşma anına kadar <b>kesintisiz uzanır</b> (istiğrâk).</p>
 <table class="tbl small"><tr><th>لَمْ</th><th>لَمَّا</th></tr>
 <tr><td>Olumsuz geçmiş; sonradan gerçekleşmiş olabilir</td><td>Şu âna kadar süren olumsuzluk: <b>henüz</b></td></tr>
 <tr><td>Gerçekleşme beklentisi yok</td><td>Çoğunlukla gerçekleşmesi <b>beklenir</b></td></tr>
 <tr><td>Şart edatından sonra gelir: إِنْ لَمْ</td><td>Şart edatından sonra gelmez</td></tr>
 <tr><td>Fiili hazfedilmez</td><td>Fiili hazfedilebilir: قَارَبْتُ الْمَدِينَةَ وَلَمَّا (henüz girmedim)</td></tr></table>
 <p>Hucurât 14 ikisini birlikte gösterir: <span class="ar">لَمْ تُؤْمِنُوا</span> “iman etmediniz”, <span class="ar">وَلَمَّا يَدْخُلِ الْإِيمَانُ</span> “iman henüz kalplerinize girmedi” (girmesi beklenir). <span class="ar">يَدْخُلِ</span>’deki esre, sonraki sâkinle buluşmamak içindir; fiil meczûmdur.</p>`,
 ex:[["لَمَّا يَنْفَعْ عُمْرِي","Ömrüm henüz fayda vermedi"],["لَمَّا يَذُوقُوا","Henüz tatmadılar (ecvef + nûn hazfi)"],["وَلَمَّا يَأْتِكُمْ","Henüz size gelmedi (Bakara 2/214; nâkıs)"]],
 q:[["لَمَّا يَكْتُبْ’in anlamı?",["Henüz yazmadı","Yazmadı","Yazmıyor","Asla yazmayacak"],0,"Cahd-ı müstağrak."],
    ["Hangisi lemmâ’ya özgüdür?",["Olumsuzluk şu âna kadar uzanır","Mânâyı geleceğe çevirir","Muzâriyi nasb eder","Şart edatından sonra gelir"],0,"İstiğrâk."],
    ["وَلَمَّا يَدْخُلِ’deki esre niçin?",["İki sâkin buluşmasın diye","Nasb alâmeti","Cer alâmeti","Mebnî olduğu için"],0,"Fiil meczûm; esre ârızîdir."],
    ["لَمَّا + يَذُوقُونَ?",["لَمَّا يَذُوقُوا","لَمَّا يَذُقْ","لَمَّا يَذُوقُونَ","لَمَّا يَذُوقُونَا"],0,"Ef‘âl-i hamse: nûn düşer; vav düşmez, çünkü sükûn yok."]]},
{id:"n8",t:"İllet ve idğamda nefy",ar:"النَّفْيُ فِي الْمُعْتَلِّ وَالْمُضَاعَفِ",e:null,
 m:[["Kitâbü’l-Maksûd","وَيَتَحَرَّكُ الْوَاوُ وَالْيَاءُ إِذَا كَانَتَا مَنْصُوبَتَيْنِ: نَحْوُ: «لَنْ يَغْزُوَ»، وَ«لَنْ يَرْمِيَ»، لِخِفَّةِ الْفَتْحَةِ عَلَيْهِمَا."],
    ["İzhâru’l-Esrâr","وَإِنْ كَانَ فِعْلًا.. فَرَفْعُهُ وَنَصْبُهُ تَقْدِيرِيٌّ، وَجَزْمُهُ لَفْظِيٌّ؛ نَحْوُ: يَخْشَى، وَلَنْ يَخْشَى، وَلَمْ يَخْشَ."],
    ["Kitâbü’l-Maksûd","وَإِنْ كَانَتَا سَاكِنَتَيْنِ [بِسُكُونٍ عَارِضٍ]: حُرِّكَتِ الثَّانِيَةُ، وَأُدْغِمَتِ الْأُولَى فِيهَا، نَحْوُ: «لَمْ يَمُدَّ [/ لَمْ يَمُدُّ / لَمْ يَمُدِّ]». وَالْأَصْلُ: «لَمْ يَمْدُدْ»"]],
 tr:`<p>Sahîhte görünen alâmetler illetli ve muzâaf fiilde şöyle değişir:</p>
 <table class="tbl small"><tr><th>Nevi</th><th>مَا / لَا</th><th>لَنْ</th><th>لَمْ / لَمَّا</th></tr>
 <tr><td>Nâkıs (vav)</td><td>يَدْعُو · damme takdîrî</td><td>يَدْعُوَ · fetha görünür</td><td>يَدْعُ · vav düşer</td></tr>
 <tr><td>Nâkıs (yâ)</td><td>يَرْمِي · damme takdîrî</td><td>يَرْمِيَ · fetha görünür</td><td>يَرْمِ · yâ düşer</td></tr>
 <tr><td>Nâkıs (elif)</td><td>يَخْشَى · takdîrî</td><td>يَخْشَى · takdîrî</td><td>يَخْشَ · elif düşer</td></tr>
 <tr><td>Ecvef</td><td>يَقُولُ</td><td>يَقُولَ</td><td>يَقُلْ · orta harf düşer</td></tr>
 <tr><td>Misâl</td><td>يَعِدُ</td><td>يَعِدَ</td><td>يَعِدْ · sahîh gibi</td></tr>
 <tr><td>Muzâaf</td><td>يَمُدُّ</td><td>يَمُدَّ</td><td>يَمُدَّ / يَمْدُدْ</td></tr>
 <tr><td>Lefîf</td><td>يَقِي</td><td>يَقِيَ</td><td>يَقِ</td></tr></table>
 <p><b>Neden?</b> Vav ve yâ üzerinde damme ağırdır (sıklet), okunmaz; fetha hafiftir, okunur. Elif hiçbir harekeyi kabul etmez (taazzür). Cezmde ise illet harfinin kendisi düşer, önceki hareke ona delâlet eder.</p>
 <p><b>Ecvef:</b> <span class="ar">لَمْ يَقُولْ</span> olsaydı vav ile lâm iki sâkin olarak buluşurdu; vav düşer: <span class="ar">لَمْ يَقُلْ</span> (<span class="ar">أَلَمْ أَقُلْ لَكُمْ</span>, Bakara 2/33). Ef‘âl-i hamsede son harekeli kaldığı için vav düşmez: <span class="ar">لَمْ يَقُولُوا</span>.</p>
 <p><b>Muzâaf:</b> Maksûd’a göre aslı <span class="ar">لَمْ يَمْدُدْ</span>’dir; ikinci dal harekelenip idğam edilir, en hafif hareke olduğu için fetha tercih edilir: <span class="ar">لَمْ يَمُدَّ</span>. Fekk de câizdir: <span class="ar">لَمْ يَمْسَسْهُمْ سُوءٌ</span> (Âl-i İmrân 3/174).</p>`,
 ex:[["لَنْ يَرْمِيَ · لَمْ يَرْمِ","Fetha görünür · yâ düşer"],["لَنْ يَخْشَى · لَمْ يَخْشَ","Takdîrî · elif düşer"],["لَمْ يَقُلْ · لَمْ يَقُولُوا","Orta harf düşer · düşmez"],["لَمْ يَمُدَّ · لَمْ يَمْدُدْ","İdğam · fekk"]],
 q:[["لَنْ يَرْمِيَ’de yâ neden harekeli?",["Fetha hafif olduğu için","Cezm için","Ötre ağır olmadığı için","Tesniye olduğu için"],0,"«لِخِفَّةِ الْفَتْحَةِ»"],
    ["يَخْشَى’nın nasbı nasıldır?",["Takdîrî","Lafzî fetha","Nûnun hazfi","İllet harfinin hazfi"],0,"«فَرَفْعُهُ وَنَصْبُهُ تَقْدِيرِيٌّ»"],
    ["لَمْ + يَمُدُّ için hangisi câiz değildir?",["لَمْ يَمُدْ","لَمْ يَمُدَّ","لَمْ يَمْدُدْ","لَمْ يَمُدِّ"],0,"İki sâkin kalamaz: ya idğam ya fekk."],
    ["لَمْ + يَبِيعُ?",["لَمْ يَبِعْ","لَمْ يَبِيعْ","لَمْ يَبِيعَ","لَمْ يَبْعِ"],0,"Ecvef: yâ düşer."],
    ["لَمْ + يَقِي (lefîf)?",["لَمْ يَقِ","لَمْ يَقِيْ","لَمْ يَوْقِ","لَمْ يَقِيَ"],0,"Sondan nâkıs gibi: yâ düşer."]]},
{id:"n9",t:"Terazinin üç kefesi",ar:"الْمِيزَانُ",e:null,
 m:[["Özet","مَا يَفْعَلُ · لَا يَفْعَلُ · لَنْ يَفْعَلَ · لَمْ يَفْعَلْ · لَمَّا يَفْعَلْ"]],
 tr:`<p>Beş edatı tek bakışta tart:</p>
 <table class="tbl small"><tr><th>Edat</th><th>Amel</th><th>Zaman</th><th>Türkçe</th></tr>
 <tr><td>مَا</td><td>yok (merfû)</td><td>şimdiki</td><td>yapmıyor</td></tr>
 <tr><td>لَا</td><td>yok (merfû)</td><td>gelecek / geniş</td><td>yapmayacak, yapmaz</td></tr>
 <tr><td>لَنْ</td><td>nasb</td><td>gelecek (te’kîdli)</td><td>asla yapmayacak</td></tr>
 <tr><td>لَمْ</td><td>cezm + kalb</td><td>geçmiş</td><td>yapmadı</td></tr>
 <tr><td>لَمَّا</td><td>cezm + kalb</td><td>geçmişten şu âna</td><td>henüz yapmadı</td></tr></table>
 <p><b>Kısa yol:</b> Sonu gör, edatı bul. Damme veya duran nûn → mâ/lâ. Fetha veya düşen nûn → len (ya da lem). Sükûn, düşen illet harfi veya düşen nûn → lem/lemmâ. Ef‘âl-i hamsede nasb ile cezm aynı görünür (<span class="ar">لَنْ يَكْتُبُوا · لَمْ يَكْتُبُوا</span>); orada edatın kendisine ve mânâya bakılır.</p>`,
 ex:[["لَنْ يَكْتُبُوا · لَمْ يَكْتُبُوا","Aynı görünür: biri mansûb, öteki meczûm"],["مَا يَكْتُبُونَ · لَا يَكْتُبُونَ","İkisi de merfû: nûn durur"]],
 q:[["Hangisi amel etmez?",["مَا","لَنْ","لَمْ","لَمَّا"],0,"Mâ ve lâ (nâfiye) amel etmez."],
    ["لَنْ يَكْتُبُوا ile لَمْ يَكْتُبُوا’nın farkı?",["Biri mansûb biri meczûm; şekil aynı","İkisi de mansûb","İkisi de meczûm","Şekilleri farklıdır"],0,"Ef‘âl-i hamsede nasb ve cezm nûnun hazfiyledir."],
    ["“Henüz gelmedi” hangi edatla?",["لَمَّا","لَمْ","لَنْ","لَا"],0,"Cahd-ı müstağrak."],
    ["Mânâyı geçmişe çeviren edatlar?",["Lem ve lemmâ","Mâ ve lâ","Len ve lâ","Yalnız len"],0,"Kalb vasfı."]]}
];
