/* ===== Terike Terazisi — terimler, oyun verileri ===== */
/* [türkçe terim, arapça, tanım] */
const TERMS=[
 ['Mîrâs','مِيرَاثٌ','Ölenin geride bıraktığı mal ve haklar; çoğulu mevârîs.'],
 ['İrs','إِرْثٌ','Bir kimsenin malının ölümünden sonra şer‘î mirasçılarına intikal etmesi.'],
 ['Tevârüs','تَوَارُثٌ','Karşılıklı mirasçı olmak; birinin diğerine mirasçı olması.'],
 ['Vâris','وَارِثٌ','Mirasçı; terikede hissesi olan kimse.'],
 ['Mûris','مُورِثٌ','Miras bırakan; müteveffâ.'],
 ['Terike','تَرِكَةٌ','Ölenin mal veya hak olarak bıraktığı şeyler; mîrâs, mevrûs, irs.'],
 ['Farîza','فَرِيضَةٌ','Farz, belirli pay, hisse; çoğulu ferâiz.'],
 ['Ferâiz','فَرَائِضُ','Belirli miras hisseleri; miras ilmi.'],
 ['Kelâle','كَلَالَةٌ','Babası ve çocuğu bulunmayan ölünün kardeşler yoluyla mirası.'],
 ['Asabe','عَصَبَةٌ','Erkek vasıtasıyla mûrise bağlanan erkek hısımlar; farz sahiplerinden kalanı alırlar.'],
 ['Ashâbü’l-ferâiz','أَصْحَابُ الْفَرَائِضِ','Payları âyet veya hadisle belirlenmiş mirasçılar.'],
 ['Zevi’l-erhâm','ذَوُو الْأَرْحَامِ','Farz sahibi ve asabe olmayan uzak kan hısımları (hala, dayı, kızın kızı).'],
 ['Hacb','حَجْبٌ','Yakın hısmın daha uzak olanın mirasçı olmasını önlemesi.'],
 ['Usûl','أُصُولٌ','Ölenin yukarı hısımları: ana, baba, dede, nine.'],
 ['Fürû','فُرُوعٌ','Ölenin aşağı hısımları: çocuk, torun.'],
 ['Velâ','وَلَاءٌ','Köleyi azat edenin azatlısına mirasçı olmasını sağlayan hükmî yakınlık.'],
 ['Velâü’l-müvâlât','وَلَاءُ الْمُوَالَاةِ','İki kişinin karşılıklı koruma ve diyette yardım karşılığı mirasçılık anlaşması (Hanefî).'],
 ['Mefkûd','مَفْقُودٌ','Kayıp; hayatı ya da ölümü bilinmeyen kimse.'],
 ['Cenîn','جَنِينٌ','Ana karnındaki çocuk; sağ doğarsa mirasçı olur.'],
 ['Gurre','غُرَّةٌ','Suçla ölü doğan cenîn için ödenen tazminat: tam diyetin yirmide biri, elli dinar.'],
 ['Mürted','مُرْتَدٌّ','İslâm dininden dönen kimse.'],
 ['Fey','فَيْءٌ','Savaşsız elde edilip beytülmâle konan mal.'],
 ['Beytülmâl','بَيْتُ الْمَالِ','İslâm devletinin hazinesi.'],
 ['İhtilâfü’d-dâreyn','اخْتِلَافُ الدَّارَيْنِ','Tebealık (ülke) farkı.'],
 ['Tesebbüb','تَسَبُّبٌ','Dolaylı yoldan ölüme sebebiyet vermek; Hanefîlere göre mirasa engel değil.'],
 ['Mükreh','مُكْرَهٌ','Zorlanan kimse.'],
 ['Âkıle','عَاقِلَةٌ','Diyeti ödemekle yükümlü olan hısım veya topluluk.'],
 ['Ric‘î talak','طَلَاقٌ رَجْعِيٌّ','İddet içinde dönülebilen boşama; evlilik iddet süresince devam eder.'],
 ['Bâin talak','طَلَاقٌ بَائِنٌ','Evliliği hemen sona erdiren boşama.']
];
/* Engel mi? [durum, engel mi (true/false), açıklama] — Hanefî esas, farklılık belirtilir */
const ENGEL=[
 ['Oğul, babasını kasden bir bıçakla öldürdü.',true,'Kasden öldürme kısas gerektirir; katil mirastan mahrumdur.'],
 ['Kız, ava ateş ederken yanlışlıkla babasını vurdu.',true,'Hata ile öldürme keffâret gerektirir; Hanefîlere göre mirasa engeldir.'],
 ['Uyuyan bir adam yanında yatan oğlunun üzerine düşüp onu öldürdü.',true,'Hataya benzer öldürme; keffâret gerektirdiği için engeldir.'],
 ['Bir adam kendi arazisinde kuyu kazdı; amcası düşüp öldü.',false,'Tesebbüb (dolaylı sebebiyet) Hanefîlere göre engel değildir.'],
 ['On yaşındaki çocuk oyun sırasında dedesinin ölümüne sebep oldu.',false,'Mükellef olmayanın öldürmesi Hanefîlere göre engel değildir (Şâfiîlere göre engeldir).'],
 ['Saldırıya uğrayan kardeş, meşrû savunma halinde kardeşini öldürdü.',false,'Meşrû savunma halinde öldürme engel değildir.'],
 ['Ölüm tehdidiyle zorlanan kişi (mükreh) hısmını öldürdü.',false,'Hanefîlere göre mükrehin öldürmesi engel değildir.'],
 ['Müslüman oğul, hristiyan babasından miras istiyor.',true,'Din farkı: “Müslüman kâfire, kâfir de müslümana mirasçı olamaz.”'],
 ['Hristiyan anne, müslüman oğlundan miras istiyor.',true,'Din farkı engeldir.'],
 ['Türkiye’de yaşayan müslüman, Mısır’daki müslüman kardeşine mirasçı oluyor.',false,'Müslüman için tebealık farkı engel değildir; Dâru’l-İslâm tek vatandır.'],
 ['Kocası zifaftan önce ölen kadın miras istiyor.',false,'Geçerli nikâh yeter; zifaf şart değildir (Berva‘ binti Vâşık).'],
 ['Ric‘î talakla boşanan kadın, iddeti bitmeden ölen kocasına mirasçı olmak istiyor.',false,'Ric‘î talakta evlilik iddet süresince devam eder; kadın mirasçıdır.'],
 ['Sağlam kocanın bâin talakla boşadığı kadın, iddette iken kocası öldü.',true,'Evlilik sona ermiş, mahrum etme ithamı da yok; mirasçı olamaz.'],
 ['Ölüm hastası koca hanımını bâin talakla boşadı ve iddet içinde öldü.',false,'Mahrum etme ithamı var; kadın mirasçı olur.'],
 ['Mûrisinden bir gün önce ölen kardeş miras alabilir mi?',true,'Vârisin, mûrisin ölümü anında hayatta olması şarttır.'],
 ['Babası öldüğünde ana karnında olan çocuk sağ doğdu.',false,'Cenîn sağ doğmak şartıyla mirasçı olur.'],
 ['Köle, ölen hür kardeşinden miras istiyor.',true,'Kölelik engeldir; mülk efendiye geçeceğinden bir yabancı mirasa girmiş olur.'],
 ['Mürted, müslüman babasından miras istiyor.',true,'Mürted mânen ölmüş sayılır; hiç kimseye mirasçı olamaz.'],
 ['Yahudi bir kişi, hristiyan hısmına mirasçı olmak istiyor (Hanefî görüşü).',false,'Hanefîlere göre küfür tek millettir; gayrimüslimler birbirine mirasçı olur (Mâlikîler aksi görüşte).'],
 ['Mefkûd hakkında hâkim vefat kararı verdi; mirası o tarihteki vârislere taksim ediliyor.',false,'Hükmî ölüm de mirası başlatır.']
];
/* Kim söyledi? [görüş, doğru sahip] */
const KIM_SEC=['Ebû Hanîfe','Ebû Yûsuf ve İmam Muhammed','Şâfiî','Mâlikîler','Hanefîler','Muâz b. Cebel','Hz. Ebû Bekir dönemi icmâı','Mâlikî, Hanbelî, Zâhirî'];
const KIM=[
 ['Öldürme fiilini işleyen herkes mirastan mahrumdur; kasıt ve mükelleflik sonucu etkilemez.','Şâfiî'],
 ['Katilde kasıt ve tecavüz (haddi aşma) esas alınır.','Mâlikîler'],
 ['Kısas veya keffâret gerektiren öldürmeler mirasa engeldir; tesebbüb engel değildir.','Hanefîler'],
 ['Mürtedin irtidattan önceki malı müslüman vârislerine, sonraki malı beytülmâle fey olur.','Ebû Hanîfe'],
 ['Mürtedin irtidattan önce ve sonra kazandığı malın hepsi müslüman vârislerine kalır.','Ebû Yûsuf ve İmam Muhammed'],
 ['Müslüman, yahudi babasına mirasçı olur (müslüman kâfire mirasçı olur).','Muâz b. Cebel'],
 ['“İki ayrı din” hadisi hristiyan ve yahudilerin kendi aralarındaki mirasçılığı da kapsar.','Mâlikîler'],
 ['Tebealık farkı hiçbir şekilde miras engeli değildir.','Mâlikî, Hanbelî, Zâhirî'],
 ['Velâya velâü’l-müvâlât da mirasçılık sebebi olarak eklenir.','Hanefîler'],
 ['Suçla ölü doğan cenîn mirasçı olur ve kendisine mirasçı olunur.','Ebû Hanîfe'],
 ['Bir veya birden çok nine ‹1/6›’yı aralarında eşit paylaşır.','Hz. Ebû Bekir dönemi icmâı'],
 ['Mürted kadının bütün malı müslüman mirasçılarına intikal eder.','Ebû Hanîfe']
];
/* Sınav için ek sorular */
const EXTRA=[
 ['Hangisi miras engellerinden biri değildir?',['Evlilik','Öldürme','Din farkı','Kölelik'],0,'Evlilik bir mirasçılık sebebidir; engel değil.'],
 ['Hangisi mirasçılık sebeplerinden biri değildir?',['Komşuluk','Nesep','Evlilik','Velâ'],0,'Sebepler: nesep, evlilik, velâ.'],
 ['Oğlu bulunan ölünün babasının payı nedir?',['1/6','Asabe olarak hepsi','1/3','Mahcûb'],0,'Oğul varken baba yalnız ‹1/6› alır; kalan oğula.'],
 ['Oğul ile birlikte bulunan kızın durumu nedir?',['Oğulla birlikte asabe olur, erkeğe iki kat','1/2 alır','2/3 alır','Mahcûb olur'],0,'“Erkeğe iki kızın payı kadar.”'],
 ['Ana bir kardeşleri mirastan hangisi düşürür?',['Ölenin çocuğu veya babası','Ölenin kocası','Ölenin annesi','Ölenin ninesi'],0,'Kelâlenin ön şartı baba ve çocuğun bulunmamasıdır.'],
 ['Ölenin iki kızı varsa oğlunun kızının durumu (oğul ve erkek torun yok)?',['Mahcûb olur','1/6 alır','1/2 alır','Kızlarla 2/3’ü paylaşır'],0,'Kızlar ‹2/3›’ü doldurunca tamamlayacak pay kalmaz.'],
 ['Annenin bulunması ninenin mirasına ne yapar?',['Nineyi düşürür (hacb)','Ninenin payını artırır','Etkisi yoktur','Nineyi asabe yapar'],0,'Yakın olan uzak olanı hacbeder.'],
 ['Hangisi asabedir?',['Oğlun oğlu','Ana bir kardeş','Kızın kızı','Hanım'],0,'Asabe, erkek vasıtasıyla bağlanan erkek hısımlardır.'],
 ['Kızın kızı hangi gruptandır?',['Zevi’l-erhâm','Asabe','Ashâbü’l-ferâiz','Velâ'],0,'Kızın kızı, hala, dayı zevi’l-erhâmdandır.'],
 ['Hükmî ölümde mirası kimler alır?',['Hüküm tarihinde mirasçı olanlar','Kaybolduğu gündeki mirasçılar','Beytülmâl','Sadece eşi'],0,'Mirası, hüküm tarihinde mirasçı olanlara taksim edilir.'],
 ['Hz. Peygamber zifaftan önce kocası ölen hangi kadını mirasçı yapmıştır?',['Berva‘ binti Vâşık','Fâtıma binti Kays','Hind binti Utbe','Ümmü Seleme'],0,'Berva‘ binti Vâşık örneği.'],
 ['Kocası ölen bir kadın, kocasının kız kardeşiyle birlikte mirasçıdır; çocuk yok. Hanımın payı?',['1/4','1/8','1/2','1/3'],0,'Çocuk yoksa hanıma ‹1/4›.'],
 ['“Velâ, nesep bağı gibi bir bağdır; satılmaz ve hibe edilmez” hadisi neyi anlatır?',['Velânın devredilemez bir mirasçılık sebebi olduğunu','Kölenin satılamayacağını','Neseple velânın aynı olmadığını','Mirasın hibe edilemeyeceğini'],0,'Velâ nesep gibi bir hükmî yakınlıktır.'],
 ['Tek yanlı miras engelinin anlamı nedir?',['Engelli kişi başkasından alamaz ama başkası ona mirasçı olabilir','İki taraf da birbirinden alamaz','Sadece kadınlara uygulanır','Sadece yarım pay alınır'],0,'Öldürme ve kölelik tek yanlıdır.']
];
