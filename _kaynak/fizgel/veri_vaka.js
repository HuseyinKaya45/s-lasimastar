/* Vakalar: {s, ar?, o:[[metin, doğru?, geri bildirim]]} */
const VAKA=[
{id:'v1',ad:`Geç Kapanan Bıngıldak`,ikon:`👶`,ozet:`10 aylık Elif'in bıngıldağı hâlâ geniş.`,
giris:`Kreşte çalışıyorsun. Aile, 10 aylık Elif'in tepesindeki yumuşak boşluğun hâlâ açık olduğunu fark etmiş ve sana soruyor.`,
adim:[
{s:`Önce bilgiyi hatırla: tepedeki bıngıldak ne zaman kapanır?`,o:[[`12-18 ay arasında`,1,`Doğru. Beş bıngıldak ilk günlerde kapanır; tepedeki 12-18 ayda kapanır.`],[`İlk haftada`,0,`İlk günlerde kapananlar diğer beş boşluktur.`],[`3. ayda`,0,`3 aydan önce kapanma doktora başvurulması gereken durumdur.`]]},
{s:`Elif 10 aylık. Bu durum için ne söylersin?`,o:[[`Henüz normal sınırlar içinde; yine de izlenir`,1,`Evet, 12-18 ay aralığı var. Baş çevresi ve genel gelişim izlenmeli.`],[`Kesin hastalık var`,0,`Acele yargı yok; aralık henüz dolmadı.`],[`Hiç önemli değil, hiç bakılmasın`,0,`Büyüme izlenmeli, belirgin sapma olursa uzmana gidilir.`]]},
{s:`Aile bıngıldak 20. ayda da açıksa ne yapmalı?`,o:[[`Doktora başvurup D vitamini ve tiroid hormonları açısından değerlendirilmeli`,1,`Geç kapanma D vitamini eksikliği ya da hipotiroidi ile ilişkili olabilir.`],[`Evde bekleyip bir yıl daha izlemek`,0,`Geç kapanma uzman değerlendirmesi gerektirir.`],[`Bebeği bol tuzlu beslemek`,0,`İlgisiz ve zararlı.`]]}]},
{id:'v2',ad:`Düğme İlikleyemeyen Mert`,ikon:`🧒`,ozet:`3 yaşındaki Mert koşuyor ama düğmeyi ilikleyemiyor.`,
giris:`Anaokulunda öğretmen Zeynep, 3 yaşındaki Mert'in çok iyi koşup zıpladığını, ama düğme ilikleyemediğini görüyor. Ailesi endişeli.`,
adim:[
{s:`Bu durumu hangi bilgi açıklar?`,o:[[`Önce büyük kaslar, sonra küçük kaslar gelişir`,1,`Kaba motor beceriler ince motordan önce gelişir.`],[`Önce küçük kaslar gelişir`,0,`Tam tersi.`],[`Kaslar hiç gelişmez`,0,`Gelişir; sıra önemli.`]]},
{s:`Zeynep ince motor için hangi etkinliği önerir?`,o:[[`Hızlı mandallar ya da on parmak parmak oyunu`,1,`Küçük kasları çalıştıran etkinlikler.`],[`Sadece koşma yarışı`,0,`Büyük kasları çalıştırır.`],[`Hiçbir şey, beklenir`,0,`Destekleyici etkinlik yapmak yararlıdır.`]]},
{s:`Anneye ne söylersin?`,o:[[`Gelişim sırası normal; destekleyici oyunlarla ilerler`,1,`Sorun yok ama destek olunur.`],[`Mert geri kalmış`,0,`Yanlış yargı.`],[`Okulu bıraksın`,0,`Alakasız.`]]}]},
{id:'v3',ad:`Bebeğin Nefes Hızı`,ikon:`😮‍💨`,ozet:`Yenidoğanın nefesi neden hızlı?`,
giris:`Yeni anne olan Ayşe, bebeğinin çok hızlı ve karnıyla nefes aldığını görüp korkuyor.`,
adim:[
{s:`Yenidoğanın dakikada normal nefes sayısı?`,o:[[`40-60`,1,`Doğru.`],[`10-20`,0,`Yetişkin düzeyi.`],[`80-100`,0,`Çok yüksek.`]]},
{s:`Karnıyla nefes almasının nedeni?`,o:[[`Kaburgalar yatay olduğu için karın kaslarını kullanır`,1,`Evet, bebek solunumu daha çok karın kaslarıyla yapar.`],[`Hasta olduğu için`,0,`Normal bir özelliktir.`],[`Uyuduğu için`,0,`Uykuyla ilgili değil.`]]},
{s:`Nefes yollarının özellikleri?`,o:[[`Dar ve kısa; bu yüzden daha sık nefes alır`,1,`Doğru.`],[`Geniş ve uzun`,0,`Tersi.`],[`Yok`,0,`Vardır.`]]}]},
{id:'v4',ad:`Diş Fırçası Savaşı`,ikon:`🪥`,ozet:`2 yaşındaki Deniz dişlerini fırçalamak istemiyor.`,
giris:`2 yaşındaki Deniz'in süt dişleri çıkmış ama fırçalama saatinde ağlıyor. Aile ne yapacağını bilmiyor.`,
adim:[
{s:`Fırçalama alışkanlığı ne zaman kazandırılır?`,o:[[`Süt dişleri çıkar çıkmaz`,1,`Doğru; fırça ve diş ipi alışkanlığı erken başlar.`],[`Kalıcı dişler çıkınca`,0,`Çok geç.`],[`Hiç gerek yok`,0,`Süt dişleri de korunmalıdır.`]]},
{s:`Fırça ne sıklıkta değiştirilir?`,o:[[`3-5 ayda bir`,1,`Doğru.`],[`Yılda bir`,0,`Çok seyrek.`],[`Hiç değiştirilmez`,0,`Yanlış.`]]},
{s:`Hangisi diş sağlığını korur?`,o:[[`Şekerli gıdaları sık yememek, kalsiyum/vitaminli beslenme`,1,`Doğru.`],[`Sert yiyecekleri dişle kırmak`,0,`Kırılabilir.`],[`Dişleri iğneyle temizlemek`,0,`Zararlı.`]]}]},
{id:'v5',ad:`Hareketsiz Çocuk`,ikon:`🛋️`,ozet:`Bahçeye çıkmak istemeyen bir çocuk.`,
giris:`5 yaşındaki Tuna bahçeye çıkmak istemiyor; sürekli oturuyor ve arkadaşlarıyla oynamıyor. Öğretmen çok endişeli.`,
adim:[
{s:`Fiziksel gelişim diğer alanlarla nasıl ilişkilidir?`,o:[[`Fiziksel gelişim bilişsel, sosyal ve duygusal alanları doğrudan etkiler`,1,`Doğru; temelidir.`],[`Hiçbir ilişki yok`,0,`Yakın ilişki var.`],[`Sadece boyla ilgili`,0,`Hayır.`]]},
{s:`Açık hava oyunu ne sağlar?`,o:[[`Kas çalışır, kan dolaşımı hızlanır, sosyalleşme ve enerji boşalması olur`,1,`Doğru.`],[`Sadece yorulma`,0,`Çok daha fazlası var.`],[`Hiçbir şey`,0,`Yanlış.`]]},
{s:`Öğretmen ne yapmalı?`,o:[[`Esnek, yalın kurallı, grup ya da bireysel oynayabileceği oyunlar sunmalı`,1,`Çocuğa özgürlük tanınmalı.`],[`Zorla oynatmalı`,0,`Baskı yarardan çok zarar getirir.`],[`Ceza vermeli`,0,`Uygun değil.`]]}]}
];
