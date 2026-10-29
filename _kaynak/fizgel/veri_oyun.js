/* Etkinlik verileri */
// doğru/yanlış [ifade, doğru?, açıklama, ders]
const DY=[
[`Fiziksel gelişim yalnızca boy ve kilo artışıdır.`,0,`Kemik, kas, beyin, organ ve iç salgı bezlerinin gelişimini de kapsar.`,1],
[`Gelişim baştan ayağa ve merkezden dışa doğru ilerler.`,1,`Önce baş-boyun-gövde, sonra kol-bacak, en son parmaklar.`,1],
[`6 yaşında tek ayak üzerinde sıçrayabilmek niteliksel gelişime örnektir.`,1,`Sistemlerin çalışmasındaki değişimi gösterir.`,1],
[`Sağlıklı gelişim için açık hava ve bedensel etkinlikler gerekir.`,1,`BUTA'nın "A"sı: açık hava.`,1],
[`Ergenlikte her zaman erkekler kızlardan ileridedir.`,0,`Kızlar erken ergenliğe girdiği için bir süre ileridedir; sonunda erkekler farkı kapatır.`,1],
[`Büyümenin en hızlı olduğu dönem doğumu izleyen ilk iki yıldır.`,1,`İlk iki yıl.`,2],
[`Yenidoğanın kilosu 2500-3500 g arasındadır.`,1,`Boy 48-53 cm.`,2],
[`Yaklaşık 12 yaşında vücut yetişkin görünümüne benzer.`,0,`Yaklaşık 6 yaş civarında.`,2],
[`Kaslar doğumda beden ağırlığının 1/5-1/4'ü kadardır.`,1,`Ergenlikte 1/3, yetişkinde 2/5.`,3],
[`Önce küçük kaslar, sonra büyük kaslar gelişir.`,0,`Önce büyük kaslar.`,3],
[`Mide ve kalp istemsiz kaslarla çalışır.`,1,`İstemsiz kaslar kişiye bağlı olmadan çalışır.`,3],
[`Kızlar kaba motorda, erkekler ince motorda daha iyidir.`,0,`Kızlar ince motorda, erkekler kaba motorda daha iyi gözlenmiştir.`,3],
[`Yenidoğanda toplam 270 kemik vardır.`,1,`Evet.`,4],
[`Yenidoğanda kafatasında 6 bıngıldak vardır.`,1,`5'i ilk günlerde kapanır.`,4],
[`Tepedeki bıngıldak 12-18 ay arasında kapanır.`,1,`Evet.`,4],
[`Bıngıldağın geç kapanması D vitamini eksikliğiyle ilişkili olabilir.`,1,`Hipotiroidi de neden olabilir.`,4],
[`Yenidoğanda baş, beden büyüklüğünün 1/8'idir.`,0,`Yenidoğanda 1/4, yetişkinde 1/8.`,4],
[`1 yaşından sonra göğüs çevresi baş çevresini geçer.`,1,`Evet.`,4],
[`İlk dişler yaklaşık 16-19. ayda çıkar.`,0,`Yaklaşık 6-10. ayda.`,5],
[`Süt dişleri 20 adettir.`,1,`2-2,5 yaşa kadar tamamlanır.`,5],
[`12 yaşında ağızda 28 kalıcı diş bulunur.`,1,`Kitabın verdiği değer.`,5],
[`Diş fırçaları 3-5 ayda bir değiştirilmelidir.`,1,`Evet.`,5],
[`Kalıtım ve boşanma fiziksel gelişimi etkileyen faktörlerdir.`,0,`Doğrusu kalıtım ve çevre.`,6],
[`Cinsiyet ve göz rengi kalıtımla belirlenir.`,1,`Genler yoluyla.`,6],
[`Hücre ile doku aynı şeydir.`,0,`Hücreler birleşerek dokuları oluşturur.`,7],
[`Bebeğin midesi küçük olduğundan az ve sık beslenmelidir.`,1,`Evet.`,8],
[`Yenidoğanın dakikadaki nefes sayısı 10-20'dir.`,0,`40-60.`,8],
[`Oksijenin hücre düzeyinde kullanımına iç solunum denir.`,1,`Evet.`,8],
[`Kalp dakikada ortalama 70 kez atar.`,1,`Yenidoğanda 120-140.`,9],
[`Yenidoğandaki antikorlar 3. aydan sonra da tam koruma sağlar.`,0,`3. aydan sonra etkisini yitirir; aşı gerekir.`,9],
[`Bebeklerin böbrekleri doğuştan itibaren en düzenli çalışan organlardır.`,0,`İlk yıllarda böbreklerin çalışması düzensizdir.`,9],
[`İdrarın yaklaşık %95'i sudur.`,1,`Evet.`,9],
[`Merkezi sinir sisteminden 43 çift sinir çıkar.`,1,`12 çift beyinden, 31 çift omurilikten.`,10],
[`Beyindeki hücre kaybolunca yerine yenisi oluşur.`,0,`Yeni hücre oluşmaz.`,10],
[`Bebek 3. ayda başını dik tutar.`,1,`5. ayda dönme, 6. aya doğru oturma.`,10]
];
// rakam avı [soru, [şıklar], doğru idx, açıklama, ders]
const RAKAM=[
[`Yenidoğanın boyu kaç cm?`,[`48-53`,`30-35`,`60-65`],0,`48-53 cm.`,2],
[`Yenidoğanın kilosu kaç gram?`,[`2500-3500`,`1500-2000`,`4500-5000`],0,`2500-3500 g.`,2],
[`Yenidoğanda toplam kemik sayısı?`,[`206`,`270`,`320`],1,`270.`,4],
[`Yenidoğanın baş çevresi yaklaşık kaç cm?`,[`35`,`28`,`46`],0,`≈35 cm.`,4],
[`3. ayda baş çevresi?`,[`40,5`,`43`,`46`],0,`40,5 cm.`,4],
[`6. ayda baş çevresi?`,[`40,5`,`43`,`46`],1,`43 cm.`,4],
[`1 yaşında baş çevresi?`,[`43`,`46`,`55`],1,`46 cm.`,4],
[`Doğumda göğüs çevresi?`,[`28`,`33`,`47`],1,`33 cm.`,4],
[`1 yaşında göğüs çevresi?`,[`47`,`43`,`55`],0,`47 cm.`,4],
[`5 yaşında göğüs çevresi?`,[`47`,`55`,`60`],1,`55 cm.`,4],
[`Yenidoğanda baş, beden büyüklüğünün kaçta kaçıdır?`,[`1/2`,`1/4`,`1/8`],1,`1/4; yetişkinde 1/8.`,4],
[`Yenidoğanda bıngıldak sayısı?`,[`3`,`6`,`9`],1,`6.`,4],
[`İlk dişler kaçıncı aylarda çıkar?`,[`6-10`,`12-16`,`18-24`],0,`6-10. aylar.`,5],
[`Süt dişi sayısı?`,[`16`,`20`,`28`],1,`20.`,5],
[`12 yaşında kalıcı diş sayısı?`,[`20`,`28`,`32`],1,`28.`,5],
[`Süt dişleri kaç yaşında düşmeye başlar?`,[`3`,`7`,`10`],1,`7 yaş.`,5],
[`Yenidoğanın dakikadaki nefes sayısı?`,[`10-20`,`40-60`,`80-100`],1,`40-60.`,8],
[`1 yaşında dakikadaki nefes sayısı?`,[`30-35`,`40-60`,`60-80`],0,`30-35.`,8],
[`Yenidoğanda kalp atımı (dk)?`,[`60-70`,`120-140`,`180-200`],1,`120-140.`,9],
[`Kalp bir günde yaklaşık kaç ton kan pompalar?`,[`2`,`20`,`200`],1,`≈20 ton.`,9],
[`İdrarın yüzde kaçı su?`,[`50`,`80`,`95`],2,`%95.`,9],
[`Merkezi sinir sisteminden kaç çift sinir çıkar?`,[`12`,`31`,`43`],2,`43 çift.`,10],
[`Beyinden kaç çift sinir çıkar (kafa çiftleri)?`,[`12`,`31`,`43`],0,`12 çift.`,10]
];
// eşleştirme setleri [başlık, [[sol, sağ]...]]
const ESLES=[
[`Organ ↔ görev`,[[`Böbrek`,`kanı süzer, atığı uzaklaştırır`],[`Üreter`,`idrarı mesaneye taşır`],[`İdrar kesesi`,`idrarı bir süre depolar`],[`Üretra`,`idrarı vücut dışına atar`],[`Diyafram`,`göğüs hacmini artırıp azaltır`],[`Soluk borusu`,`havadaki toz ve mikropları temizler`],[`Burun`,`havayı ısıtır, nemlendirir`],[`Bronşlar`,`soluk borusunun ikiye ayrılmasıyla oluşur`]]],
[`Sistem ↔ organ`,[[`Sindirim`,`mide, ince bağırsak`],[`Solunum`,`akciğer, bronş`],[`Dolaşım`,`kalp, damarlar`],[`Boşaltım`,`böbrek, mesane`],[`Sinir`,`beyin, omurilik`],[`Sindirime yardımcı`,`karaciğer, pankreas`]]],
[`Kavram ↔ anlam`,[[`Nicel`,`boy-kilo gibi rakamsal artış`],[`Niteliksel`,`sistemlerin çalışmasındaki değişim`],[`İç solunum`,`oksijenin hücrede kullanılması`],[`Dış solunum`,`oksijenin dış ortamdan alınması`],[`Küçük dolaşım`,`kalp-akciğer-kalp`],[`Büyük dolaşım`,`kalp-vücut-kalp`],[`Bıngıldak`,`kafatasındaki boşluk`],[`İstemsiz kas`,`kişiye bağlı olmadan çalışır`]]]
];
// sıralama [başlık, [adımlar doğru sırada]]
const SIRA=[
[`Sindirim yolu`,[`Ağız`,`Yutak`,`Yemek borusu`,`Mide`,`İnce bağırsak`,`Kalın bağırsak`]],
[`Solunum yolu`,[`Burun`,`Yutak`,`Gırtlak`,`Soluk borusu`,`Bronşlar`,`Akciğerler`]],
[`Boşaltım yolu`,[`Böbrek`,`Üreter`,`İdrar kesesi`,`Üretra`]],
[`Hücreden sisteme`,[`Hücre`,`Doku`,`Organ`,`Sistem`]],
[`Baş çevresi artışı (küçükten büyüğe)`,[`Doğum (≈35)`,`3. ay (40,5)`,`6. ay (43)`,`1 yaş (46)`]],
[`Kas payının büyümesi`,[`Doğum (1/5-1/4)`,`Ergenlik (1/3)`,`Yetişkin (2/5)`]],
[`Süt dişi çıkışı (başlangıç ayına göre)`,[`Alt ön dişler (6-10)`,`Üst ön dişler (8-12)`,`Köpek dişleri (16-22)`,`İkinci azılar (25-33)`]],
[`Bebeğin hareket yol haritası`,[`2. ay: çevreyle etkileşim`,`3. ay: baş dik`,`5. ay: dönme`,`6. ay: oturma`]]
];
// kutulama: [başlık, [kategoriler], [[öğe, kategori idx, açıklama]]]
const KUTU=[
[`İstemli mi, istemsiz mi?`,[`İstemli kas`,`İstemsiz kas`],[[`Kol kası`,0,`İstediğimiz zaman çalıştırırız.`],[`Kalp kası`,1,`Biz karışmadan çalışır.`],[`Göz kapağı`,0,`İstemli.`],[`Mide kası`,1,`İstemsiz.`],[`Bacak kası`,0,`İstemli.`],[`Bağırsaklar`,1,`İstemsiz.`],[`Parmak kası`,0,`İstemli.`],[`Karaciğer`,1,`İstemsiz çalışan organ.`],[`Boyun kası`,0,`İstemli.`],[`Dalak`,1,`İstemsiz.`]]],
[`Merkezi mi, çevresel mi?`,[`Merkezi sinir sistemi`,`Çevresel sinir sistemi`],[[`Beyin`,0,`Merkezi.`],[`Beyincik`,0,`Merkezi.`],[`Omurilik`,0,`Merkezi.`],[`Omurilik soğanı`,0,`Merkezi.`],[`Sinir lifleri`,1,`Çevresel.`]]],
[`Nicel mi, niteliksel mi?`,[`Nicel`,`Niteliksel`],[[`Boy 3 cm uzadı`,0,`Rakamsal artış.`],[`Tek ayakla sıçrayabiliyor`,1,`Beceri / işlev.`],[`Kilosu 600 g arttı`,0,`Rakamsal.`],[`Düğme ilikleyebiliyor`,1,`Beceri.`],[`Baş çevresi 46 cm`,0,`Ölçüm.`],[`Koşarken yön değiştirebiliyor`,1,`Beceri.`]]],
[`Hangi sisteme ait?`,[`Sindirim`,`Solunum`,`Dolaşım`,`Boşaltım`],[[`Mide`,0,`Sindirim.`],[`Akciğer`,1,`Solunum.`],[`Kalp`,2,`Dolaşım.`],[`Böbrek`,3,`Boşaltım.`],[`Pankreas`,0,`Sindirime yardımcı organ.`],[`Diyafram`,1,`Solunum.`],[`Damar`,2,`Dolaşım.`],[`Mesane`,3,`Boşaltım.`],[`Soluk borusu`,1,`Solunum.`],[`İnce bağırsak`,0,`Sindirim.`]]]
];
// boşluk doldurma [cümle(___), [şıklar], doğru, ders]
const BOSLUK=[
[`___, bedeni oluşturan tüm organların gelişmesi, boyun uzaması, kilonun artışı, kemiklerin gelişimi, dişlerin çıkması ve kasların gelişmesidir.`,[`Fiziksel gelişim`,`Sosyal gelişim`,`Dil gelişimi`],0,1],
[`Vücudun hareket sisteminin aktif elemanları olup kemiklerin üzerini örten bölüme ___ denir.`,[`kaslar`,`sinirler`,`damarlar`],0,3],
[`Oksijenin hücre düzeyinde kullanılmasına ___ denir.`,[`iç solunum`,`dış solunum`,`boşaltım`],0,8],
[`Doğumu takip eden ___, yaşamın tüm dönemlerine oranla büyümenin en hızlı olduğu dönemdir.`,[`ilk iki yıl`,`ilk altı ay`,`ergenlik`],0,2],
[`Yaklaşık ___ yaş civarında vücudun genel görünümü yetişkine benzer.`,[`6`,`2`,`12`],0,2],
[`___ mide, kalp, karaciğer, dalak, bağırsaklar gibi organlardaki, kişiye bağlı olmadan çalışan kaslardır.`,[`İstemsiz kaslar`,`İstemli kaslar`,`Kemik kasları`],0,3],
[`Yenidoğan bebekte toplam ___ kemik vardır.`,[`270`,`206`,`180`],0,4],
[`Süt dişleri ___ adet olup 2-2,5 yaşına kadar tamamlanır.`,[`20`,`28`,`32`],0,5],
[`Yenidoğan bebeğin kafatasında ___ tane bıngıldak vardır.`,[`6`,`8`,`10`],0,4],
[`Kalp dakikada ortalama ___ kez kasılır.`,[`70`,`40`,`150`],0,9],
[`Merkezi sinir sisteminden ___ çift sinir çıkar.`,[`43`,`31`,`12`],0,10],
[`Bebek başını ___ ayda dik tutmaya başlar.`,[`3.`,`1.`,`8.`],0,10]
];
