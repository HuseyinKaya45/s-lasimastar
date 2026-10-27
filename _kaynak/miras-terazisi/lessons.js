/* ===== Terike Terazisi — dersler (kaynak: “Mîrâs” maddesi; Kitap, Sünnet, İcmâ; rükünler, sebepler, şartlar, engeller) =====
   p: kısım · t: başlık · ar: anahtar Arapça terim · b: anlatım (‹1/2› kesir işaretidir) · qt: [arapça, türkçe, kaynak] · key: akılda kalsın · q: [soru, seçenekler, doğru, açıklama] */
const PARTS=[
 {p:1,t:'Kavramlar',ar:'الْمِيرَاثُ وَالْفَرَائِضُ',c:'var(--p1)'},
 {p:2,t:'Mirasın delilleri',ar:'أَدِلَّةُ الْمِيرَاثِ',c:'var(--p2)'},
 {p:3,t:'Rükünler ve sebepler',ar:'الْأَرْكَانُ وَالْأَسْبَابُ',c:'var(--p3)'},
 {p:4,t:'Şartlar ve engeller',ar:'الشُّرُوطُ وَالْمَوَانِعُ',c:'var(--p4)'}
];
const LESSONS=[
/* ---------------- 1. KAVRAMLAR ---------------- */
{id:'d1',p:1,t:'Mîrâs, irs ve ferâiz',sub:'“VRS” kökü ve terimler',ar:'مِيرَاثٌ',
 b:`<p><b>Mîrâs</b>, ölenin geride bıraktığı mal ve haklardır; çoğulu <b>mevârîs</b>tir. Kelime <b>“VRS”</b> kökündendir. Bu kökten gelen <b>irs</b> mastarı, bir kimsenin malının ölümünden sonra şer‘î mirasçılarına intikal etmesi demektir.</p>
<div class="tblw"><table class="tbl"><tr><th>Terim</th><th>Arapça</th><th>Anlamı</th></tr>
<tr><td><b>İrs</b></td><td class="ar">إِرْثٌ</td><td>Malın ölümden sonra şer‘î mirasçılara geçmesi</td></tr>
<tr><td><b>Tevârüs</b></td><td class="ar">تَوَارُثٌ</td><td>Karşılıklı mirasçı olmak; birinin diğerine mirasçı olması</td></tr>
<tr><td><b>Vâris</b></td><td class="ar">وَارِثٌ</td><td>Mirasçı</td></tr>
<tr><td><b>Mûris</b></td><td class="ar">مُورِثٌ</td><td>Miras bırakan</td></tr>
<tr><td><b>Terike</b></td><td class="ar">تَرِكَةٌ</td><td>Ölenin bıraktığı miras</td></tr></table></div>
<p>Miras ilmi anlamında kullanılan başka bir terim <b>Ferâiz</b>dir. Tekili <b>farîza</b>; farz, belirli pay, hisse demektir. İslâm miras hukuku terimi olarak ferâiz, <b>belirli miras hisseleri</b> anlamını ifade eder.</p>
<p>Bu ilme “ferâiz” denmesi iki sebeptendir: miras âyetindeki “Bu hisseler Allah’tan birer farîzadır” ifadesi ve “Ferâiz ilmini öğreniniz” hadisindeki “ferâiz” terimi.</p>`,
 qt:[['فَرِيضَةً مِنَ اللَّهِ','Allah’tan bir farîza (farz kılınmış pay) olarak…','en-Nisâ 4/11']],
 key:['Mîrâs → çoğulu mevârîs','Kök: V-R-S (irs, tevârüs, vâris, mûris)','Terike = ölenin bıraktığı miras','Farîza = belirli pay; ferâiz = belirli miras hisseleri'],
 q:[['“Mîrâs” kelimesinin çoğulu hangisidir?',['Mevârîs','Ferâiz','Terikât','Vürrâs'],0,'Mîrâsın çoğulu mevârîstir; “ferâiz” ise farîzanın çoğuludur.'],
    ['Miras bırakan kimseye ne denir?',['Mûris','Vâris','Mevrûs','Mevlâ'],0,'Mûris miras bırakan, vâris mirasçıdır.'],
    ['“Tevârüs” ne demektir?',['Karşılıklı mirasçı olmak','Mirası bölüştürmek','Mirastan mahrum etmek','Vasiyet etmek'],0,'Tevârüs, karşılıklı mirasçı olmak veya birinin diğerine mirasçı olmasıdır.'],
    ['“Farîza” kelimesinin anlamı nedir?',['Farz, belirli pay, hisse','Ölenin borcu','Miras bırakan','Kalan mal'],0,'Farîza; farz, belirli pay, hisse demektir.'],
    ['Bu ilme “ferâiz” denmesinin dayanağı hangisidir?',['Nisâ 4/11’deki “Allah’tan birer farîzadır” ifadesi ve “Ferâiz ilmini öğreniniz” hadisi','Hz. Ömer’in bir içtihadı','Kıyas','Medine halkının örfü'],0,'Âyetteki “farîza” ifadesi ile hadisteki “ferâiz” terimi sebebiyledir.']]},
{id:'d2',p:1,t:'Ferâiz ilmi: tanım, amaç ve önem',sub:'İlmin yarısı',ar:'عِلْمُ الْفَرَائِضِ',
 b:`<p>Fıkıh terimi olarak miras veya ferâiz ilmi; <b>ölenin geride bıraktığı mal ve hakların belli ölçülerle şer‘î mirasçılara bölünmesinden söz eden ilimdir.</b></p>
<p>Ferâiz ilminin <b>amacı</b>, hak sahiplerine haklarını ulaştırmaktır. Buna <b>mirasın bölüştürülmesi</b> denir.</p>
<p>Ferâiz ilminin önemi büyüktür; çünkü kişinin hayatta iken yaptığı muamelelerin <b>ölümünden sonraki devamı</b> niteliğindedir. Hz. Peygamber bu ilmi öğrenmeyi ve öğretmeyi emretmiş, onun ilmin yarısı olduğunu, unutulacağını ve ümmetinden kaldırılan ilk ilim olacağını bildirmiştir.</p>
<p>Sahabe içinde ferâizi en iyi bilenin <b>Zeyd b. Sâbit</b> (ö. 45/665) olduğu da hadiste geçer.</p>`,
 qt:[['تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا النَّاسَ، فَإِنَّهَا نِصْفُ الْعِلْمِ','Ferâiz ilmini öğreniniz ve onu insanlara öğretiniz; çünkü o ilmin yarısıdır… unutulur ve ümmetimden kaldırılan ilk ilim o olacaktır.','Tirmizî, Ferâiz 2; İbn Mâce, Ferâiz 1'],['أَفْرَضُهُمْ زَيْدُ بْنُ ثَابِتٍ','Sizin ferâiz ilmini en çok bileniniz Zeyd b. Sâbit’tir.','Tirmizî, Menâkıb 32; İbn Mâce, Mukaddime 11']],
 key:['Tanım: terikenin belli ölçülerle şer‘î mirasçılara bölünmesinin ilmi','Amaç: hak sahiplerine haklarını ulaştırmak','Önemi: hayattaki muamelelerin ölümden sonraki devamı','Ferâizi en iyi bilen sahabî: Zeyd b. Sâbit'],
 q:[['Ferâiz ilminin amacı nedir?',['Hak sahiplerine haklarını ulaştırmak','Vasiyeti çoğaltmak','Malı devlete devretmek','Borçları ertelemek'],0,'Amacı hak sahiplerine haklarını ulaştırmaktır; buna mirasın bölüştürülmesi denir.'],
    ['Hadiste ferâiz ilmi için hangisi söylenmiştir?',['İlmin yarısıdır ve ümmetten kaldırılacak ilk ilimdir','Yalnız kadılar öğrenir','Sadece Medine’ye özgüdür','Kıyasla öğrenilir'],0,'“Çünkü o ilmin yarısıdır, unutulur ve ümmetimden kaldırılan ilimlerin ilki olacaktır.”'],
    ['Hadise göre ferâizi en iyi bilen sahabî kimdir?',['Zeyd b. Sâbit','Abdullah b. Mes‘ûd','Muâz b. Cebel','Ubâde b. es-Sâmit'],0,'“Sizin ferâiz ilmini en çok bileniniz Zeyd b. Sâbit’tir.”'],
    ['Ferâiz ilmi neden önemlidir?',['Hayattaki muamelelerin ölümden sonraki devamı olduğu için','Ticaretin şartlarını belirlediği için','Namazın vakitlerini gösterdiği için','Sadece kölelerle ilgili olduğu için'],0,'Hayatta iken yapılan muamelelerin ölümünden sonraki devamı niteliğindedir.']]},
/* ---------------- 2. DELİLLER ---------------- */
{id:'d3',p:2,t:'Mirasın dayandığı deliller',sub:'Kitap, Sünnet, İcmâ',ar:'الْكِتَابُ وَالسُّنَّةُ وَالْإِجْمَاعُ',
 b:`<p>Miras; <b>Kitap, Sünnet ve İcmâ</b> delillerine dayanır. Miras hukukunda, <b>icmâ bulunmadıkça kıyas veya içtihad yoluna gidilmez.</b></p>
<p>Kur’ân’da miras hükümleri başlıca şu âyetlerde belirlenmiştir:</p>
<div class="tblw"><table class="tbl"><tr><th>Âyet</th><th>Konu</th></tr>
<tr><td>en-Nisâ 4/7</td><td>Erkeklerin ve kadınların genel miras hakkı</td></tr>
<tr><td>en-Nisâ 4/8</td><td>Taksimde hazır bulunan vâris olmayan akraba, yetim ve yoksullar</td></tr>
<tr><td>en-Nisâ 4/11</td><td>Çocuklar ve ana-babanın mirası</td></tr>
<tr><td>en-Nisâ 4/12</td><td>Karı-kocanın mirası; ana bir kardeşler (kelâle)</td></tr>
<tr><td>en-Nisâ 4/13-14</td><td>Müeyyide: Allah’ın sınırları; itaate cennet, isyana cehennem</td></tr>
<tr><td>en-Nisâ 4/176</td><td>Öz veya baba bir kardeşler (kelâle)</td></tr>
<tr><td>el-Enfâl 8/75</td><td>Zevi’l-erhâm: akrabalar birbirine daha yakındır</td></tr></table></div>
<p>Nisâ 4/7, miras haklarından genel olarak söz eder: hem erkeklerin hem kadınların ana-baba ve hısımların bıraktığında hissesi vardır; bunlar az olsun çok olsun farz kılınmış bir hissedir. Nisâ 4/8 ise miras taksim olunurken hazır bulunan vâris olmayan akrabalara, yetimlere ve yoksullara da mirastan verilmesini ve onlara güzel söz söylenmesini emreder.</p>
<p>Miras düzenlemesinin hemen ardından gelen 13-14. âyetler, bu payların <b>Allah’ın koyduğu sınırlar</b> olduğunu bildirir: Allah’a ve Rasûlü’ne itaat edeni Allah ebedî kalacağı cennetlere koyar; isyan edip sınırları aşanı da ebedî kalacağı ateşe koyar.</p>`,
 qt:[['لِلرِّجَالِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ وَلِلنِّسَاءِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ','Ana-baba ve hısımların bıraktıklarında erkeklerin hissesi vardır; kadınların da ana-baba ve hısımların bıraktıklarında hisseleri vardır.','en-Nisâ 4/7'],['وَإِذَا حَضَرَ الْقِسْمَةَ أُولُو الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينُ فَارْزُقُوهُمْ مِنْهُ','Miras taksim olunurken akrabalar, yetimler ve yoksullar da bulunursa mirastan onlara da verin…','en-Nisâ 4/8'],['تِلْكَ حُدُودُ اللَّهِ','İşte bunlar Allah’ın koyduğu sınırlardır.','en-Nisâ 4/13']],
 key:['Deliller: Kitap, Sünnet, İcmâ','İcmâ yoksa kıyas ve içtihada gidilmez','Ana âyetler: Nisâ 7, 11, 12, 176; Enfâl 75','Nisâ 13-14: müeyyide (Allah’ın sınırları)'],
 q:[['Miras hukukunda kıyas ve içtihada ne zaman gidilmez?',['İcmâ bulunmadıkça','Kur’ân’da hüküm olunca','Mirasçı çok olunca','Hiçbir zaman sınır yoktur'],0,'Metin: “Miras hukukunda, icmâ bulunmadıkça kıyas veya içtihad yoluna gidilmez.”'],
    ['Karı-kocanın mirasını belirleyen âyet hangisidir?',['en-Nisâ 4/12','en-Nisâ 4/7','el-Enfâl 8/75','en-Nisâ 4/176'],0,'Karı-kocanın ve ana bir kardeşlerin mirası Nisâ 4/12’dedir.'],
    ['Zevi’l-erhâmın mirasına dair genel düzenleme hangi âyettedir?',['el-Enfâl 8/75','en-Nisâ 4/11','en-Nisâ 4/8','en-Nisâ 4/14'],0,'“Akraba olanlar Allah’ın kitabına göre birbirlerine daha yakındırlar.”'],
    ['Nisâ 4/8’e göre taksimde hazır bulunan vâris olmayan akraba, yetim ve yoksullara ne yapılır?',['Mirastan onlara da verilir ve güzel söz söylenir','Hiçbir şey verilmez','Terikenin yarısı verilir','Taksim ertelenir'],0,'“Mirastan onlara da verin ve onlara güzel söz söyleyin.”'],
    ['Miras âyetlerinin ardından gelen 13-14. âyetlerin niteliği nedir?',['Müeyyide (itaate cennet, sınırları aşana ateş)','Yeni paylar','Vasiyet hükümleri','Nikâh hükümleri'],0,'Bu iki âyet müeyyide niteliğindedir: “İşte bunlar Allah’ın koyduğu sınırlardır…”']]},
{id:'d4',p:2,t:'Çocuklar ve ana-babanın payları',sub:'en-Nisâ 4/11',ar:'لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ',
 b:`<p>Nisâ 4/11 çocukların ve ana-babanın paylarını belirler:</p>
<ul><li><b>Erkek ve kız çocuk birlikte</b>: erkeğin payı kızın <b>iki katı</b>dır.</li>
<li><b>Yalnız kızlar, ikiden fazla</b> (fakihlerin anlayışına göre iki ve daha fazla): terikenin <b>‹2/3›</b>’si.</li>
<li><b>Tek kız</b>: terikenin <b>‹1/2›</b>’si.</li>
<li><b>Ana-baba, ölenin çocuğu varken</b>: her birine <b>‹1/6›</b>.</li>
<li><b>Çocuk yok, mirasçı ana-baba ise</b>: ananın payı <b>‹1/3›</b>.</li>
<li><b>Ölenin kardeşleri varsa</b>: ananın payı <b>‹1/6›</b>.</li></ul>
<p>Bu paylar, <b>ölenin borçları ödenip vasiyeti de yerine getirildikten sonra</b> hak sahiplerine verilir. Âyet, “Baba ve çocuklardan hangisinin size fayda bakımından daha yakın olduğunu siz bilemezsiniz” diyerek bu payların <b>Allah tarafından farz kılındığını</b> bildirir.</p>`,
 qt:[['يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ','Allah size evlâtlarınız hakkında, erkeğe iki kızın payı kadar (pay verilmesini) emreder.','en-Nisâ 4/11']],
 key:['Oğul + kız: erkeğe iki kat','Tek kız ‹1/2›; iki ve daha fazla kız ‹2/3›','Çocuk varken baba ve ana: her biri ‹1/6›','Çocuk yoksa ana ‹1/3›; kardeşler varsa ana ‹1/6›','Önce borç ve vasiyet, sonra miras'],
 q:[['Ölen yalnızca bir kız bırakmışsa kızın farz payı nedir?',['1/2','2/3','1/3','1/6'],0,'“Eğer mirasçı bir tek kız ise mirasın yarısı onundur.”'],
    ['Erkek ve kız çocuk birlikte mirasçı olunca paylaşım nasıldır?',['Erkeğe kızın iki katı','Eşit','Kıza erkeğin iki katı','Hepsi erkeğe'],0,'“Erkeklerin paylarının kızların iki katı olmasını emretmektedir.”'],
    ['Ölenin çocuğu varken babanın farz payı nedir?',['1/6','1/3','1/2','1/4'],0,'Çocuk varken ana ve babanın her birinin payı altıda birdir.'],
    ['Çocuk yok, ölenin birden çok kardeşi varsa ananın payı nedir?',['1/6','1/3','1/2','Hiç'],0,'“Eğer ölenin kardeşleri varsa terekenin altıda biri ananındır.”'],
    ['Miras payları ne zaman verilir?',['Borçlar ödenip vasiyet yerine getirildikten sonra','Cenazeden önce','Borçlardan önce','Vasiyetten önce'],0,'Âyet: “Bu paylar, ölenin borçları ödenip vasiyeti de yerine getirildikten sonra…”']]},
{id:'d5',p:2,t:'Karı-kocanın payları',sub:'en-Nisâ 4/12',ar:'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ',
 b:`<p>Nisâ 4/12 eşlerin birbirine mirasçılığını şöyle belirler:</p>
<div class="tblw"><table class="tbl"><tr><th>Mirasçı</th><th>Ölenin çocuğu yoksa</th><th>Ölenin çocuğu varsa</th></tr>
<tr><td><b>Koca</b> (karısı ölünce)</td><td>‹1/2›</td><td>‹1/4›</td></tr>
<tr><td><b>Karı(lar)</b> (kocası ölünce)</td><td>‹1/4›</td><td>‹1/8›</td></tr></table></div>
<p>Birden çok hanım varsa bu pay aralarında <b>eşit</b> bölünür. Bu paylar da, ölenin <b>vasiyeti yerine getirildikten ve varsa borcu ödendikten sonra</b> verilir.</p>
<p class="muted small">Dikkat: Kocanın payı, karının payının iki katıdır — çocuk yoksa ‹1/2› / ‹1/4›, çocuk varsa ‹1/4› / ‹1/8›.</p>`,
 qt:[['وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِنْ لَمْ يَكُنْ لَهُنَّ وَلَدٌ','Eğer hanımlarınızın çocukları yoksa, bıraktıkları mirasın yarısı sizindir.','en-Nisâ 4/12']],
 key:['Koca: çocuk yoksa ‹1/2›, varsa ‹1/4›','Karı: çocuk yoksa ‹1/4›, varsa ‹1/8›','Birden çok hanım payı eşit paylaşır'],
 q:[['Çocuğu olmayan bir kadın ölünce kocasının payı nedir?',['1/2','1/4','1/8','1/3'],0,'“Eğer hanımlarınızın çocukları yoksa, bıraktıkları mirasın yarısı sizindir.”'],
    ['Çocuk bırakarak ölen bir erkeğin hanımının payı nedir?',['1/8','1/4','1/6','1/2'],0,'“Şayet çocuklarınız varsa, bıraktığınız mirasın sekizde biri hanımlarınızındır.”'],
    ['Ölenin dört hanımı varsa ve çocuğu yoksa hanımların toplam payı nedir?',['1/4 (aralarında eşit)','Her birine 1/4','1/1','1/8'],0,'Pay toplam ‹1/4›’tür ve hanımlar arasında eşit bölünür; her birine ‹1/16› düşer.'],
    ['Çocuk bırakarak ölen kadının kocasının payı nedir?',['1/4','1/2','1/8','1/6'],0,'“Şayet çocukları varsa bıraktıkları mirasın dörtte biri sizindir.”']]},
{id:'d6',p:2,t:'Kardeşler (kelâle) ve zevi’l-erhâm',sub:'en-Nisâ 4/12, 4/176; el-Enfâl 8/75',ar:'الْكَلَالَةُ',
 b:`<p><b>Kelâle</b> adı verilen kardeşlerin mirası iki statüde toplanmıştır: <b>ana bir kardeşler</b> ve <b>ana-baba bir (öz) ya da baba bir kardeşler</b>. Kelâlenin mirasçı olmasında <b>ön şart</b>, miras bırakanın <b>baba veya erkek çocuklarının bulunmamasıdır</b>.</p>
<h3>Ana bir kardeşler (4/12)</h3>
<ul><li>Ölenin erkek usûl ve fürûu yoksa, <b>tek</b> ana bir (erkek veya kız) kardeş: <b>‹1/6›</b>.</li>
<li>Daha çok iseler: <b>‹1/3›</b>, aralarında <b>eşit</b> (erkek-kadın farkı olmadan).</li></ul>
<h3>Öz veya baba bir kardeşler (4/176)</h3>
<ul><li>Ölenin çocuğu yoksa <b>tek kız kardeş</b>: <b>‹1/2›</b>.</li>
<li><b>İki kız kardeş</b>: <b>‹2/3›</b>.</li>
<li>Ölen kız kardeşse ve çocuğu yoksa, <b>erkek kardeş</b> terikenin <b>hepsini</b> alır.</li>
<li>Erkek ve kız kardeşler birlikte: <b>bir erkeğe iki kadının payı</b>.</li></ul>
<h3>Zevi’l-erhâm (8/75)</h3>
<p>Âyet ve hadislerde payları veya mirasçılık esasları belirlenmiş olanların dışında kalan hısımlar için genel düzenleme: “Akraba olanlar, Allah’ın kitabına göre birbirlerine daha yakındırlar.”</p>`,
 qt:[['يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ','Senden fetva isterler. De ki: Kelâle hakkında Allah size fetva verir.','en-Nisâ 4/176'],['وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ','Akraba olanlar, Allah’ın kitabına göre birbirlerine daha yakındırlar.','el-Enfâl 8/75']],
 key:['Kelâlenin ön şartı: baba ve erkek çocuk yok','Ana bir kardeş: tek ‹1/6›, çok ‹1/3› (eşit)','Öz/baba bir kız kardeş: tek ‹1/2›, iki ‹2/3›','Öz kardeşler karışık: erkeğe iki kat'],
 q:[['Kelâlenin mirasçı olmasının ön şartı nedir?',['Miras bırakanın babasının veya erkek çocuklarının bulunmaması','Ölenin hanımının olmaması','Terikenin büyük olması','Kardeşlerin reşit olması'],0,'Metin: “Kelâlenin mirasçı olmasında ön şart, miras bırakanın baba veya erkek çocuklarının bulunmamasıdır.”'],
    ['Tek ana bir kardeşin payı nedir?',['1/6','1/3','1/2','2/3'],0,'Ana bir erkek veya kız kardeşten her birinin payı altıda birdir.'],
    ['Birden çok ana bir kardeş ‹1/3›’ü nasıl paylaşır?',['Eşit olarak','Erkeğe iki kat','Büyüğe fazla','Kura ile'],0,'Âyet: “kardeşler mirasın üçte birini … aralarında eşit olarak paylaşırlar.”'],
    ['Çocuğu olmayan ölünün iki öz kız kardeşinin payı nedir?',['2/3','1/2','1/3','1/6'],0,'“Eğer mirasçılar iki kız kardeş ise, terekenin üçte ikisini alırlar.”'],
    ['Zevi’l-erhâm kimlerdir?',['Payları ve mirasçılık esasları belirlenmiş olanların dışında kalan hısımlar','Farz sahipleri','Asabe','Eşler'],0,'Hala, dayı, kızın kızı gibi uzak kan hısımları; dayanağı Enfâl 8/75.']]},
{id:'d7',p:2,t:'Sünnet ve icmâ delilleri',sub:'Hadisler ve ninenin payı',ar:'أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا',
 b:`<p>Hz. Peygamber’den mirasla ilgili çeşitli hadisler nakledilmiştir:</p>
<ul><li><b>Paylar ve kalan</b>: “Miras paylarını hak sahiplerine veriniz. Kalan miktar, en yakın erkek hısımındır.”</li>
<li><b>Din farkı</b>: “Müslüman kâfire, kâfir de müslümana mirasçı olamaz.” “İki farklı dine mensup olanlar birbirine mirasçı olamaz.”</li>
<li><b>Nineler</b>: Ubâde b. es-Sâmit: Hz. Peygamber mirastan iki nineye, aralarında paylaşmak üzere hükmetti.</li>
<li><b>Kız, oğul kızı ve kız kardeş</b>: İbn Mes‘ûd: Rasûlullah ölenin kızına ‹1/2›, oğul kızına ‹2/3›’ye tamamlamak için ‹1/6› ve kalanın kız kardeşe verilmesine hükmetti.</li>
<li><b>Zevi’l-erhâm</b>: Mikdâm b. Ma‘dîkerib: “Ben mirasçısı olmayanın mirasçısıyım… Dayı, mirasçısı olmayanın mirasçısıdır; onun diyetini öder ve ona mirasçı olur.”</li></ul>
<h3>İcmâ</h3>
<p>Bir ninenin tek başına <b>‹1/6›</b> alacağı, birden fazla ninenin bu <b>‹1/6›</b>’yı <b>aralarında eşit</b> paylaşacağı Sahabe ve Tâbiîn’in icmâı ile sabittir. Konu Hz. Ebû Bekir’in halifeliği sırasında tartışılmış; Hz. Peygamber’den altıda bir uygulaması nakledilince bu yönde görüş birliği oluşmuştur.</p>`,
 qt:[['أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ','Miras paylarını hak sahiplerine veriniz; kalan, en yakın erkek hısımındır.','Buhârî, Ferâiz 5; Müslim, Ferâiz 2'],['لَا يَرِثُ الْمُسْلِمُ الْكَافِرَ وَلَا الْكَافِرُ الْمُسْلِمَ','Müslüman kâfire, kâfir de müslümana mirasçı olamaz.','Buhârî, Ferâiz 26; Müslim, Ferâiz 1'],['الْخَالُ وَارِثُ مَنْ لَا وَارِثَ لَهُ','Dayı, mirasçısı olmayanın mirasçısıdır.','Ebû Dâvud, Ferâiz 8; Tirmizî, Ferâiz 12']],
 key:['Önce farz sahipleri, kalan en yakın erkek hısıma (asabe)','Din farkı mirasa engel','Kız ‹1/2› + oğul kızı ‹1/6› (‹2/3›’ye tamamlama) + kalan kız kardeşe','Nine ‹1/6›; birden çok nine ‹1/6›’yı eşit paylaşır (icmâ)'],
 q:[['“Kalan miktar, en yakın erkek hısımındır” hadisine göre farz sahiplerinden artan kime verilir?',['En yakın erkek hısıma (asabe)','Beytülmâle','Hanıma','Fakirlere'],0,'Hadis: “Miras paylarını hak sahiplerine veriniz. Kalan miktar, en yakın erkek hısımındır.”'],
    ['İbn Mes‘ûd’un rivayetine göre kız, oğul kızı ve kız kardeş birlikte olunca oğul kızına ne verilmiştir?',['1/6 (2/3’e tamamlamak için)','1/2','1/3','Hiçbir şey'],0,'Kıza yarım, oğul kızına üçte ikiye tamamlamak için altıda bir, kalan kız kardeşe.'],
    ['Birden fazla ninenin payı icmâya göre nasıldır?',['1/6’yı aralarında eşit paylaşırlar','Her birine 1/6','1/3’ü paylaşırlar','Mirasçı olamazlar'],0,'İkiden fazla nineler altıda bir hisseyi aralarında eşit paylaşır; bu icmâ ile sabittir.'],
    ['Ninenin payına dair icmâ hangi halifenin döneminde oluştu?',['Hz. Ebû Bekir','Hz. Ömer','Hz. Osman','Hz. Ali'],0,'Konu Hz. Ebû Bekir’in halifeliği sırasında tartışılmış ve icmâ oluşmuştur.'],
    ['Mikdâm b. Ma‘dîkerib’in rivayetine göre mirasçısı olmayanın mirasçısı kimdir?',['Dayı (ve Hz. Peygamber/devlet)','Komşu','Hala','En yaşlı mümin'],0,'“Ben mirasçısı olmayanın mirasçısıyım… Dayı, mirasçısı olmayanın mirasçısıdır.”']]},
/* ---------------- 3. RÜKÜNLER VE SEBEPLER ---------------- */
{id:'d8',p:3,t:'Mirasın üç rüknü',sub:'Mûris, vâris, terike',ar:'أَرْكَانُ الْمِيرَاثِ',
 b:`<p>Mirasın <b>rükünleri üçtür</b>:</p>
<ol><li><b>Mûris</b>: Vefat edip geride miras bırakan kimse. Buna <b>müteveffâ</b> da denir.</li>
<li><b>Vâris</b>: Kendisine miras intikal eden, yani terikede hissesi olan kimse.</li>
<li><b>Terike</b>: Ölenin mal veya hak olarak geride bıraktığı şeyler. Buna <b>mîrâs</b>, <b>mevrûs</b> ve <b>irs</b> adı da verilir.</li></ol>
<p>Terikedeki <b>haklardan</b> maksat; <b>kısas</b> hakkı, satış bedelini alabilmek için <b>satılan malı hapsetme</b> hakkı ve borcu alabilmek için <b>rehnedileni hapsetme</b> hakkı gibi haklardır.</p>
<p><b>Bu üç rükünden birisinin bulunmaması halinde miras söz konusu olmaz.</b></p>`,
 qt:[],
 key:['Mûris (müteveffâ) — miras bırakan','Vâris — terikede hissesi olan','Terike (mîrâs, mevrûs, irs) — mal ve haklar','Biri yoksa miras yok'],
 q:[['Mirasın rükünleri kaç tanedir?',['Üç','İki','Dört','Beş'],0,'Mûris, vâris, terike.'],
    ['Mûrise verilen diğer ad hangisidir?',['Müteveffâ','Mevrûs','Mevlâ','Asabe'],0,'Mûrise müteveffâ da denir.'],
    ['Hangisi terikeye verilen adlardan biri değildir?',['Farîza','Mîrâs','Mevrûs','İrs'],0,'Terikeye mîrâs, mevrûs ve irs denir; farîza belirli paydır.'],
    ['Terikedeki “hak”lara örnek hangisidir?',['Kısas hakkı ve rehnedileni hapsetme hakkı','Oy kullanma hakkı','Nafaka borcu','Kardeşlik bağı'],0,'Kısas, satılan malı hapsetme ve rehnedileni hapsetme hakkı gibi.']]},
{id:'d9',p:3,t:'Mirasçı olmanın sebepleri',sub:'Hısımlık, evlilik, velâ',ar:'أَسْبَابُ الْإِرْثِ',
 b:`<p>Mirasın söz konusu olması için <b>sebep ve şartların bulunması</b>, <b>engellerin bulunmaması</b> gerekir. Mirasçı olmanın sebepleri üçtür: <b>nesep hısımlığı, evlilik ve velâ</b>.</p>
<h3>1. Hısımlık (nesep)</h3>
<p>Usûl (ana, baba, dede, nine), fürû (çocuk, torun), kardeşler ve amcalar bu hısımlardandır. Bunlar mûrise <b>yakınlık derecesine göre</b> mirasçı olur; yakın olan uzak olanın mirasçı olmasını önler: buna <b>hacbetme</b> denir.</p>
<ul><li><b>Asabe</b>: Erkek vasıtasıyla mûrise bağlanan erkek hısımlar (baba, babanın babası, oğul, oğlun oğlu). Farz sahiplerinden kalanı alırlar; yalnız asabe varsa mirasın tamamı onlarındır.</li>
<li><b>Ashâbü’l-ferâiz</b>: Payları belirli mirasçılar (farz sahipleri).</li>
<li><b>Zevi’l-erhâm</b>: Farz sahipleri ve asabe yoksa mirasçı olan uzak kan hısımları (hala, dayı, kızın kızı gibi).</li></ul>
<h3>2. Evlilik</h3>
<p>Geçerli bir nikâh akdi eşler arasında miras hakkı doğurur; <b>cinsel temasın olup olmaması sonucu etkilemez</b>. Zifaftan önce eşlerden biri ölse diğeri ona mirasçı olur (Hz. Peygamber, cinsel temastan önce kocası ölen Berva‘ binti Vâşık’ı mirasçı yapmıştır).</p>
<ul><li><b>Ric‘î talak</b> iddetindeki kadın, kocası ölürse mirasçı olur; çünkü evlilik iddet süresince devam eder.</li>
<li><b>Sağlam</b> kocanın <b>bâin talak</b>la boşadığı kadın, iddette iken koca ölse <b>mirasçı olamaz</b>; mirastan mahrum etmek ithamı yoktur.</li>
<li><b>Ölüm hastası</b> koca bâin talakla boşar ve iddet içinde ölürse kadın <b>mirasçı olur</b>; mirastan mahrum etme ithamı vardır.</li></ul>
<h3>3. Velâ</h3>
<p>Şâri‘in belirlediği hükmî bir yakınlıktır: köleyi azat eden efendinin, azat ettiği köleye mirasçı olması. Hanefîler buna <b>velâü’l-müvâlât</b>ı da eklemiştir: iki kişinin birbirine koruyucu ve diyette yardımcı olup buna karşılık birbirine mirasçı olmak üzere anlaşması.</p>`,
 qt:[['الْوَلَاءُ لُحْمَةٌ كَلُحْمَةِ النَّسَبِ لَا يُبَاعُ وَلَا يُوهَبُ','Velâ, nesep bağı gibi bir bağdır; satılmaz ve hibe edilmez.','İbn Hibbân ve Hâkim sahihlemiştir']],
 key:['Sebepler: nesep, evlilik, velâ','Yakın hısım uzak olanı hacbeder','Asabe ← erkek vasıtasıyla bağlanan erkekler','Ric‘î iddet: mirasçı · sağlam kocanın bâin talakı: değil · ölüm hastasının bâin talakı: mirasçı'],
 q:[['Mirasçı olmanın sebepleri hangileridir?',['Nesep hısımlığı, evlilik, velâ','Komşuluk, evlilik, ortaklık','Vasiyet, hibe, satış','Nesep, din, vatan'],0,'Metin: Mirasçı olmanın sebepleri üçtür: nesep hısımlığı, evlilik ve velâ.'],
    ['Yakın hısmın uzak olanın mirasçı olmasını önlemesine ne denir?',['Hacbetme','Avl','Redd','Tevârüs'],0,'Daha uzak olanın mirasçı olmasını önlerler, buna “hacbetme” denir.'],
    ['Zifaftan önce eşlerden biri ölse ne olur?',['Diğeri ona mirasçı olur','Nikâh geçersiz sayılır','Yalnız kadın mirasçı olur','Mehir iade edilir, miras yok'],0,'Cinsel temasın olup olmaması sonucu etkilemez.'],
    ['Sağlam bir koca karısını bâin talakla boşadı; kadın iddetteyken koca öldü. Kadın mirasçı olur mu?',['Hayır','Evet','Yarım pay alır','Vasiyetle alır'],0,'Mirastan mahrum etmek ithamı olmadığından mirasçı olamaz.'],
    ['Ölüm hastası koca bâin talakla boşadı ve iddet içinde öldü. Kadın?',['Mirasçı olur','Mirasçı olamaz','Sadece mehrini alır','Zevi’l-erhâm olur'],0,'Burada mirastan mahrum etmek amacıyla boşama ithamı vardır.'],
    ['Velâü’l-müvâlâtı mirasçılık sebebi olarak kim ekledi?',['Hanefîler','Şâfiîler','Mâlikîler','Zâhirîler'],0,'Hanefîler velâya velâü’l-müvâlâtı da eklediler.']]},
/* ---------------- 4. ŞARTLAR VE ENGELLER ---------------- */
{id:'d10',p:4,t:'Mirasın şartları',sub:'Ölüm, hayat, engel yokluğu',ar:'شُرُوطُ الْمِيرَاثِ',
 b:`<p>Mirasta hakkın sabit olması için <b>üç şart</b> gerekir: mûrisin ölümü, mirasçının hayatta olması ve bir miras engeli bulunmaması.</p>
<h3>1. Mûrisin ölmesi</h3>
<ul><li><b>Gerçek (hakîkî) ölüm</b>: Ruhun bedenden ayrılması; görme, işitme veya başka bir delille sabit olur.</li>
<li><b>Hükmî ölüm</b>: Hayatta olduğu bilinen veya muhtemel kimsenin ölümüne hâkimin hükmetmesi. Dâru’l-harbe kaçan mürted ile gerekli süreler geçmiş <b>mefkûd</b> (kayıp) böyledir; mirası hüküm tarihinde mirasçı olanlara taksim edilir; mefkûdun eşi iddet bekler ve serbest kalır.</li>
<li><b>Takdîrî ölüm</b>: Suç işleme yoluyla annesinden ölü doğan cenîn (gebe kadına vurulup cenînin ölü doğması gibi). Suçluya tam diyetin yirmide biri kadar, <b>elli dinar</b> (yaklaşık iki yüz gram altın) <b>gurre</b> tazminatı ödettirilir. Ebû Hanîfe’ye göre bu cenîn mirasçı olur ve kendisine mirasçı olunur; çünkü suç anında diri kabul edilir.</li></ul>
<h3>2. Mirasçının hayatta olması</h3>
<p>Mûrisin ölümü sırasında vârisin hayatta olması gerekir. Mûristen önce ölen hısım, sonra ölen mûrisine mirasçı olamaz. Mûris öldüğünde ana karnındaki çocuk (cenîn) <b>sağ doğmak şartıyla</b> mirasçı olur.</p>
<h3>3. Miras engeli bulunmaması</h3>
<p>Öldürme, din farkı, tebealık farkı ve kölelik — sonraki derslerde.</p>`,
 qt:[],
 key:['Şartlar: mûrisin ölümü, vârisin hayatı, engel yokluğu','Ölüm: hakîkî, hükmî (hâkim kararı), takdîrî (cenîn)','Gurre: tam diyetin ‹1/20›’si, elli dinar','Cenîn sağ doğarsa mirasçı'],
 q:[['Mefkûd (kayıp) kişi hakkında hâkimin vefat kararı hangi tür ölümdür?',['Hükmî ölüm','Gerçek ölüm','Takdîrî ölüm','Mânevî ölüm'],0,'Hükmî ölüm, hâkimin hükmüyle ortaya çıkar.'],
    ['Suç yoluyla ölü doğan cenîn hangi tür ölüme örnektir?',['Takdîrî ölüm','Hükmî ölüm','Gerçek ölüm','Hiçbiri'],0,'Takdîrî ölüm; kişinin takdiren ölü kabul edilmesidir.'],
    ['Gurre tazminatı tam diyetin ne kadarıdır?',['Yirmide biri','Onda biri','Yarısı','Üçte biri'],0,'Elli dinar; tam diyetin yirmide biri kadar.'],
    ['Mûrisinden önce ölen bir hısım ona mirasçı olur mu?',['Hayır','Evet','Yarım pay alır','Çocukları onun yerine alır diye otomatik evet'],0,'Mûrisin ölümü sırasında vârisin hayatta olması gerekir.'],
    ['Ana karnındaki çocuk hangi şartla mirasçı olur?',['Sağ doğması','Erkek olması','Babasının razı olması','Doğumdan sonra bir yıl yaşaması'],0,'Sağ doğmak şartıyla mirasçı olur.'],
    ['Ebû Hanîfe’ye göre suçla ölü doğan cenîn?',['Mirasçı olur ve ona mirasçı olunur','Mirasçı olmaz','Sadece ona mirasçı olunur','Gurre devlete gider'],0,'Çünkü onun suç işleme sırasında diri olduğu kabul edilir.']]},
{id:'d11',p:4,t:'Engel 1: Öldürme',sub:'“Katil için miras yoktur”',ar:'الْقَتْلُ',
 b:`<p>Mûrisini öldüren kimse için, bir an önce onun servetini elde etmek amacıyla öldürme ithamı vardır. Hısımını öldürenin onun mirasından mahrum olacağında <b>mezheplerin görüş birliği</b> vardır; ancak <b>hangi öldürmelerin</b> engel olacağı ihtilaflıdır.</p>
<h3>Hanefîler</h3>
<p><b>Kısas veya keffâret</b> gerektiren öldürmeler mirasa engeldir:</p>
<div class="tblw"><table class="tbl"><tr><th>Tür</th><th>Örnek</th><th>Sonuç</th></tr>
<tr><td><b>Kasden</b></td><td>Silâh veya kesici aletle</td><td>Günah ve kısas; keffâret yok</td></tr>
<tr><td><b>Kasda benzer</b></td><td>Sopa, değnek gibi öldürmede kullanılmayan bir şeyle</td><td>Keffâret, âkıle üzerine diyet, günah</td></tr>
<tr><td><b>Hata</b></td><td>Ava atıp insanı vurmak</td><td>Keffâret, âkıle üzerine diyet; uhrevî günah kalkmış</td></tr>
<tr><td><b>Hataya benzer</b></td><td>Uykuda/uyanıkken üzerine düşmek</td><td>Hata gibi</td></tr></table></div>
<p class="small muted">Ebû Yûsuf ve İmam Muhammed’e göre insan öldürebilecek büyük taş vb. her şeyle kasden öldürme meydana gelir.</p>
<p><b>Mirasa engel olmayanlar</b> (Hanefî): dolaylı yoldan ölüme sebebiyet (<b>tesebbüb</b>), <b>mükellef olmayanın</b> öldürmesi, <b>meşrû savunma</b> halinde öldürme, <b>mükrehin</b> (zorlananın) öldürmesi.</p>
<h3>Diğer mezhepler</h3>
<ul><li><b>Şâfiî</b>: Öldürme fiilini işleyen herkes mahrumdur; kasıt ve mükelleflik sonucu etkilemez.</li>
<li><b>Mâlikî</b>: Katilde <b>kasıt ve tecavüz</b> esas alınır.</li></ul>
<p>Görüş ayrılığı, hadisteki <b>“kâtil”</b> kelimesinin kapsamındaki belirsizlikten doğmuştur.</p>`,
 qt:[['الْقَاتِلُ لَا يَرِثُ','Katil mirasçı olamaz (Katil için miras yoktur).','Tirmizî, Ferâiz 17; Ebû Dâvud, Diyât 18']],
 key:['Öldüren mirastan mahrum — ittifak','Hanefî: kısas/keffâret gerektiren dört tür engel','Engel değil (Hanefî): tesebbüb, mükellef olmayan, meşrû savunma, mükreh','Şâfiî: her öldüren mahrum · Mâlikî: kasıt ve tecavüz'],
 q:[['Hanefîlere göre hangi öldürmeler mirasa engeldir?',['Kısas veya keffâret gerektirenler','Yalnız kasden öldürme','Her türlü ölüme sebebiyet','Hiçbiri'],0,'Kısas veya keffâret cezasını gerektiren öldürme çeşitleri mirasa engel olur.'],
    ['Ava atıp yanlışlıkla insanı öldürmek hangi türdür?',['Hata','Kasden','Kasda benzer','Tesebbüb'],0,'Birisini yanlışlıkla öldürme: ava atıp insanı öldürmek gibi.'],
    ['Hanefîlere göre hangisi mirasa engel değildir?',['Meşrû savunma halinde öldürme','Kasda benzer öldürme','Hata ile öldürme','Hataya benzer öldürme'],0,'Meşrû savunma, tesebbüb, mükellef olmayanın ve mükrehin öldürmesi engel değildir.'],
    ['Hangi mezhebe göre öldürme fiilini işleyen herkes mirasçı olamaz?',['Şâfiî','Hanefî','Mâlikî','Zâhirî'],0,'İmam Şâfiî’ye göre kasıt ve mükelleflik sonucu etkilemez.'],
    ['Mâlikîler öldürmede neyi esas alır?',['Kasıt ve tecavüzü','Silahın türünü','Ölümün süresini','Mirasın miktarını'],0,'Mâlikîler katilde kasıt ve tecavüzü esas alırlar.'],
    ['Görüş ayrılığının kaynağı nedir?',['Hadisteki “kâtil” sözcüğünün kapsamındaki belirsizlik','Âyetin nesh edilmesi','İcmânın bulunmaması','Kıyasın reddi'],0,'Muhammed Ebû Zehra’ya atıfla belirtilen sebep budur.']]},
{id:'d12',p:4,t:'Engel 2: Din farkı ve mürtedin mirası',sub:'Velâyet bağının kesikliği',ar:'اخْتِلَافُ الدِّينِ',
 b:`<p>Mûris ile vârisin ayrı dinlerden oluşu miras engelidir; İslâm hukukçularının görüş birliği vardır. Müslüman kâfire, kâfir de müslümana — nesep hısımlığı veya evlilik akdi bulunsa bile — mirasçı olamaz. Sebebi, müslüman ile gayrimüslim arasında <b>velâyet bağının kesik</b> olmasıdır.</p>
<p>Örnek: Müslüman bir erkekle gayrimüslim karısı arasında mirasçılık cereyan etmez; çocuklar babaya tâbi olarak müslüman sayıldığından onlarla gayrimüslim anneleri arasında da mirasçılık yoktur.</p>
<h3>Azınlık görüşü</h3>
<p>Muâz b. Cebel, Muâviye ve Tâbiîn’den Mesrûk, Saîd b. el-Müseyyeb, İbrâhîm en-Nehaî gibi bazı bilginlere göre <b>müslüman kâfire mirasçı olur; kâfir müslümana olamaz</b>. Delilleri: “İslâm yücedir, onun üzerine yücelinmez” ve “İslâm artırır, eksiltmez” hadislerinin genel anlamı; ayrıca Muâz b. Cebel’in, yahudi babasından müslüman oğlunu mirasçı yapması. Çoğunluk ise bu hadisleri doğrudan mirasla ilgili görmemiştir.</p>
<p>Gayrimüslimler birbirine mirasçı olabilir; çünkü <b>küfür ehli tek millet</b> sayılır (el-Enfâl 8/73; Yûnus 10/32). Yalnız <b>Mâlikîler</b>, “iki ayrı din” hadisinin hristiyan ve yahudilerin kendi aralarındaki mirasçılığı da kapsadığını söyler.</p>
<h3>Mürtedin mirası</h3>
<p>Mürted mânen ölmüş sayıldığından <b>ne müslümana ne kâfire mirasçı olamaz</b>. Ondan başkasına intikal ise ihtilaflıdır:</p>
<div class="tblw"><table class="tbl"><tr><th>Görüş</th><th>Mürtedin malı</th></tr>
<tr><td><b>Ebû Hanîfe</b></td><td>İrtidattan önce kazandığı → müslüman vârislerine; sonra kazandığı → beytülmâle <b>fey</b>. Mürted kadınsa malın tamamı müslüman mirasçılarına.</td></tr>
<tr><td><b>Ebû Yûsuf ve İmam Muhammed</b></td><td>Önce ve sonra kazandıklarının hepsi müslüman vârislerine; erkek-kadın ayrımı yok.</td></tr>
<tr><td><b>Şâfiî, Mâlikî, Hanbelî</b></td><td>Mirasçı olamaz, ona da mirasçı olunmaz; bütün malı beytülmâle fey (İslâm toplumuna harp ilânı sayılır).</td></tr></table></div>
<p>Bu hükümler mürted irtidadı üzere ölürse uygulanır; hayatta olduğu sürece malı bekletilir, İslâm’a dönerse kendisine verilir.</p>`,
 qt:[['لَا يَتَوَارَثُ أَهْلُ مِلَّتَيْنِ شَتَّى','İki ayrı dine mensup olanlar birbirine mirasçı olamaz.','Ebû Dâvud, Ferâiz 10; Tirmizî, Ferâiz 16'],['الْإِسْلَامُ يَعْلُو وَلَا يُعْلَى','İslâm yücedir, onun üzerine yücelinmez.','Buhârî, Cenâiz 79']],
 key:['Din farkı engel — çoğunluk','Azınlık (Muâz b. Cebel vd.): müslüman kâfire mirasçı olur','Gayrimüslimler birbirine mirasçı (küfür tek millet) — Mâlikîler hariç','Mürted kimseye mirasçı olmaz; malı: Ebû Hanîfe ikiye ayırır, İmâmeyn hepsini vârise, cumhur beytülmâle'],
 q:[['Müslüman ile gayrimüslim arasındaki miras engelinin sebebi nedir?',['Velâyet bağının kesik olması','Ülke farkı','Malın haram olması','Nikâhın geçersizliği'],0,'Bunun sebebi, müslümanla gayrimüslim arasında velâyet bağının kesik olmasıdır.'],
    ['Hangi sahabî, yahudi babasından müslüman oğlunu mirasçı yapmıştır?',['Muâz b. Cebel','Zeyd b. Sâbit','Abdullah b. Mes‘ûd','Ubâde b. es-Sâmit'],0,'Davaya bakan Muâz b. Cebel müslümanı yahudiye mirasçı yapmıştır.'],
    ['Gayrimüslimlerin kendi aralarında mirasçılığını kabul etmeyen mezhep hangisidir?',['Mâlikî','Hanefî','Şâfiî','Hanbelî'],0,'Mâlikîler “iki ayrı din” hadisinin hristiyan ve yahudileri de kapsadığını söyler.'],
    ['Ebû Hanîfe’ye göre erkek mürtedin irtidattan SONRA kazandığı mal nereye gider?',['Beytülmâle fey','Müslüman vârislerine','Gayrimüslim akrabasına','Eşine'],0,'İrtidattan önce kazandığı müslüman vârislere, sonra kazandıkları beytülmâle fey.'],
    ['Ebû Yûsuf ve İmam Muhammed’e göre mürtedin malı?',['Önce ve sonra kazandığının hepsi müslüman vârislerine','Hepsi beytülmâle','Yarısı vârise yarısı devlete','Gayrimüslim vârislerine'],0,'Bu iki müçtehid erkek-kadın ayrımı da yapmaz.'],
    ['Mürted hayattayken malına ne yapılır?',['Bekletilir; İslâm’a dönerse kendisine verilir','Hemen taksim edilir','Yakılır','Kadıya hibe edilir'],0,'Hükümler mürted irtidadı üzere ölürse uygulanır.']]},
{id:'d13',p:4,t:'Engel 3–4: Tebealık farkı ve kölelik',sub:'İhtilâfü’d-dâreyn',ar:'اخْتِلَافُ الدَّارَيْنِ',
 b:`<h3>Tebealık farkı (ihtilâfü’d-dâreyn)</h3>
<p>Müslümanlar hangi devletin tebeası olurlarsa olsunlar birbirine mirasçı olur; <b>müslüman için tebealık farkı engel değildir</b>. Örneğin Türkiye’deki bir müslüman Mısır’daki müslüman hısmına mirasçı olur; çünkü <b>Dâru’l-İslâm müslümanlar için tek vatandır</b>. Bir müslüman Dâru’l-harpte ölse, Dâru’l-İslâm’daki vârisleri ona mirasçı olur.</p>
<p><b>Gayrimüslimler için</b> ülke ayrılığı engeldir: İslâm tebeasındaki gayrimüslim, yabancı tebealı gayrimüslim hısmına mirasçı olamaz; çünkü mirasçılık <b>velâyet bağı</b>na dayanır. Ancak ülkeler sulh anlaşmalarıyla karşılıklı miras ilişkilerini düzenleyebilir. <b>Mâlikî, Hanbelî ve Zâhirîlere</b> göre tebealık farkı hiçbir şekilde engel değildir.</p>
<h3>Kölelik</h3>
<p>Köle hısımlarına mirasçı olamaz; çünkü mülk edinme sebepleriyle mâlik olamadığı gibi miras yoluyla da olamaz, elindekiler efendisine aittir. Mirasçı yapılsa mülk kendiliğinden efendisine geçer ve sebepsiz yere bir yabancı mirasa sokulmuş olur; bu icmâya göre bâtıldır.</p>
<h3>Tek yanlı engeller</h3>
<p><b>Öldürme</b> ve <b>kölelik</b> tek yanlıdır: bunlar başkasından miras alamaz, fakat başkası kendilerine mirasçı olabilir. Bunlara ayrıca <b>mûrisin ölüm tarihinin belirlenememesi</b> ve <b>mirasçının kim olduğunun bilinememesi</b> gibi engeller de eklenmiştir.</p>`,
 qt:[],
 key:['Müslümanlar için ülke farkı engel değil — Dâru’l-İslâm tek vatan','Gayrimüslimler için engel (Hanefî); sulh anlaşmasıyla düzenlenebilir','Mâlikî, Hanbelî, Zâhirî: tebealık farkı hiç engel değil','Öldürme ve kölelik tek yanlı engeldir'],
 q:[['Türkiye’deki bir müslüman Mısır’daki müslüman hısmına mirasçı olur mu?',['Evet; Dâru’l-İslâm tek vatandır','Hayır; ülke farkı engeldir','Yalnız anlaşma varsa','Yalnız kardeşse'],0,'Müslüman için başka başka devletin tebeası olmak miras engeli değildir.'],
    ['Tebealık farkı kimler için miras engelidir?',['Gayrimüslimler','Müslümanlar','Köleler','Kadınlar'],0,'Ülke ayrılığı gayrimüslimler için bir miras engeli teşkil eder.'],
    ['Hangi mezheplere göre tebealık farkı hiçbir şekilde engel değildir?',['Mâlikî, Hanbelî, Zâhirî','Hanefî, Şâfiî','Yalnız Hanefî','Hiçbiri'],0,'Mâlikî, Hanbelî ve Zâhirîlere göre tebealık farkı miras engeli doğurmaz.'],
    ['Kölenin mirasçı olamamasının sebebi nedir?',['Malik olamaz; mirası efendisine geçer ve yabancı mirasa girmiş olur','Kölenin akrabası yoktur','Köle mükellef değildir','Köle hep borçludur'],0,'Sebepsiz yere bir yabancı mirasa sokulmuş olur ki, bu icmâya göre bâtıldır.'],
    ['Hangi iki engel tek yanlıdır?',['Öldürme ve kölelik','Din farkı ve tebealık','Din farkı ve öldürme','Kölelik ve din farkı'],0,'Bunlar başkasından miras alamaz; fakat başkası kendilerine mirasçı olabilir.']]}
];
