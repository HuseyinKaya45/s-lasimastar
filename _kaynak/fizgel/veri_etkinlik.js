/* Etkinlik kütüphanesi: kitaptaki 11 oyun/etkinlik (özgün özet) */
const ETK=[
{id:1,ad:`Top oyunu`,ikon:`⚽`,amac:`Büyük ve küçük kas gelişimi`,yas:`Bebeklik`,arac:`Top`,ozet:`Oturabilen bebeğin önüne top yuvarla; tutmaya ve yuvarlamaya çalışır. Emekleyen bebek topu yakalamak için ona doğru sürünür.`,tur:`kas`},
{id:2,ad:`Zıp zıp zıpla`,ikon:`🐸`,amac:`Büyük kas gelişimi`,yas:`Okul öncesi`,arac:`—`,ozet:`Çocuklar tekerlemeyi söyleyip hareketleri yapar: zıp zıp zıpla (tek ayakla zıpla), hop hop hopla (iki ayakla hopla), top top topla (son iki hecede yere çömel).`,tur:`kas`},
{id:3,ad:`Büyü büyü, küçül küçül`,ikon:`🌳`,amac:`Büyük kas gelişimi`,yas:`Okul öncesi`,arac:`—`,ozet:`"Büyü" kısmında kollar yukarı, parmak ucuna yüksel; "Küçül" kısmında kollar iner, çömelerek küçül. İki bölüm ara vermeden birbirine geçer.`,tur:`kas`},
{id:4,ad:`On parmak`,ikon:`🖐️`,amac:`Büyük ve küçük kas gelişimi`,yas:`Okul öncesi`,arac:`—`,ozet:`Parmak oyunu tekerlemesi: eller açılır, yumruk yapılır, kavuşturulur, arkaya saklanır, yukarı kalkar, aşağı iner ve kucakta dinlenir.`,tur:`kas`},
{id:5,ad:`Hızlı mandallar`,ikon:`📎`,amac:`Küçük kas gelişimi`,yas:`4-5 yaş`,arac:`Mandal`,ozet:`İki grup karşılıklı sıraya girer; her çocuk sırayla mandalları ebenin üstüne takıp sıranın arkasına geçer. En hızlı bitiren grup birinci olur.`,tur:`kas`},
{id:6,ad:`Kemik ve diş afişi`,ikon:`🖼️`,amac:`Kemik ve diş sağlığı bilinci`,yas:`Öğrenci uygulaması`,arac:`Karton, boya`,ozet:`Kemik ve diş sağlığına yönelik bir afiş hazırla; sınıfta arkadaşlarınla tartışarak incele.`,tur:`bilgi`},
{id:7,ad:`Günaydın (benimle gelme)`,ikon:`🏃`,amac:`Solunumu destekleme`,yas:`Okul öncesi`,arac:`—`,ozet:`Halkada çocuklar durur; ebe dışarıdan koşarken birinin sırtına dokunup "Benimle gelme" der. İki oyuncu ters yönde koşar, karşılaşınca eğilip selamlaşır ve boş yere önce varmaya çalışır; kapamayan ebe olur.`,tur:`solunum`},
{id:8,ad:`Bahçedeki midilli`,ikon:`🐴`,amac:`Solunum organlarının düzgün çalışması`,yas:`Okul öncesi`,arac:`—`,ozet:`Çocuklar el ele halka olur, midilli ortadadır. "Bahçemize nasıl girdin?" "İçeriye atladım." "Nasıl çıkacaksın?" "İşte böyle!" Midilli kolların altından çıkmaya çalışır; çıkınca 3-4 koşucu onu yakalamaya gider.`,tur:`solunum`},
{id:9,ad:`Ağaçlardaki sincaplar`,ikon:`🐿️`,amac:`Büyük ve küçük kas gelişimi`,yas:`Okul öncesi`,arac:`—`,ozet:`7-8 kişilik gruplar daire olup ağaç olur, ortadaki çocuk sincaptır, dışta ebe vardır. Düdükle sincaplar kendi ağacından çıkıp başka ağaca koşar; dışarıda kalan ebe sincap olur.`,tur:`kas`},
{id:10,ad:`Sıkı sıkı sarılalım`,ikon:`🤗`,amac:`Büyük ve küçük kas gelişimi`,yas:`Okul öncesi`,arac:`Düdük`,ozet:`Çocuklar bahçede dağınık dolaşır; öğretmen düdük çalıp parmakla bir sayı gösterir. Çocuklar o sayıda grup olup sıkıca sarılır; sayıyı tamamlayamayan ya da tek kalan elenir.`,tur:`kas`},
{id:11,ad:`Yağmur - kar - fırtına`,ikon:`🌧️`,amac:`Büyük ve küçük kas gelişimi`,yas:`Okul öncesi`,arac:`—`,ozet:`Yağmur: parmakları yere doğru çevirerek kollar aşağı yukarı. Kar: eller göğse vurulur. Fırtına: "vuuuu" sesi ve el çırpma. Önce deneme, sonra oyun; yanılan seyirci olur.`,tur:`kas`}
];
// uygulama faaliyeti işlem basamakları
const GOZLEM=[
`Okul öncesi eğitim kurumuna (anaokulu/kreş) git.`,
`Boy, kilo, diş gibi 0-72 ay gelişim bilgilerini hazırla.`,
`Gözlem yapacağın etkinliğin zamanını öğretmenle belirle.`,
`Etkinlik sırasında çocukları gözlemle; izin alarak fotoğraf/kamera kaydı yap.`,
`Çektiklerinle çocukların boy, kilo, diş gelişimini karşılaştır.`,
`Edindiğin bilgilerden yola çıkarak bir grafik hazırla.`,
`Grafiğini sınıfa getirip arkadaşlarınla paylaş.`,
`Raporlarını arkadaşlarınla benzerlik ve farklılık yönünden objektif biçimde tartış.`];
