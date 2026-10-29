/* Dallanan senaryolar ve vaka çalışmaları (özgün kurgu) */
var SENARYOLAR = [
  { id: "sn-kapsam", konu: "etik", b: "Kapsam dışı sunucu", ikon: "🧭",
    giris: "<b>Elif</b> bir perakende firmasının <i>yalnızca</i> dış IP aralığını (203.0.113.0/28) test etmek üzere yazılı sözleşme imzaladı. Taramada aralığa çok yakın, listede olmayan bir sunucu (203.0.113.40) yanıt veriyor. Üzerinde eski bir yönetim paneli görünüyor.",
    adimlar: [
      { s: "Elif ne yapmalı?", o: [
        ["Panele bir bakıp zayıf şifre denemek; sonuçta müşterinin yararına", 0, "Kapsam dışı sistemlere dokunmak etik dışıdır, yasal sorun da çıkarabilir. “Müşterinin yararına” demek yazılı kapsamı değiştirmez."],
        ["Durup durumu belgelemek, müşteriye yazılı bildirmek ve kapsam genişletme onayı beklemek", 2, "Doğru. Kapsam yazılı olmalı; kapsam dışına çıkmadan önce yazılı onay alınır, iletişim açık tutulur."],
        ["Sunucuyu sessizce kapsamdaymış gibi test etmek, raporda “aralığa yakın” yazmak", 0, "Saklamak ve gerçeği çarpıtmak şeffaflık ilkesini bozar."],
        ["Konuyu kimseye söylememek ama sunucuya hiç dokunmamak", 1, "Dokunmamak iyi, ama açıklama yükümlülüğü var: müşterinin bu sunucudan haberi olmayabilir; bunu bildirmelisin."]
      ] }
    ] },
  { id: "sn-kesinti", konu: "etik", b: "Gece yarısı yavaşlama", ikon: "🌙",
    giris: "<b>Murat</b> bir bankanın test ortamında yük testi yaparken canlı sisteme bağlı bir servisin yanıt süresinin beklenmedik şekilde yükseldiğini fark eder. Kimse henüz şikâyet etmemiştir.",
    adimlar: [
      { s: "İlk hamlesi ne olmalı?", o: [
        ["Testi hızla bitirip raporda hiç bahsetmemek", 0, "Beklenmedik etkiyi saklamak etik değildir."],
        ["Testi durdurup sözleşmedeki iletişim kişisine hemen haber vermek", 2, "Doğru: kazara olabilir; saklamamak ve doğru kişilerin hızla bilmesi esastır."],
        ["Kendi başına canlı sistemde “düzeltmeye” çalışmak", 0, "Kapsam ve yetki dışı müdahale yeni bir risk yaratır."],
        ["Sabah olunca haber vermeyi planlamak", 1, "Beklemek zararı büyütebilir; iletişim hemen kurulmalı."]
      ] },
      { s: "Müşteri “kazara olduğunu anlıyoruz, devam edin ama yük düşük olsun” diyor. Murat ne yapar?", o: [
        ["Onayı yazılı hâle getirir, yük sınırını sözleşme ekine/e-postaya yazar", 2, "Doğru: anlaşılmış kabul edilebilir risk belgelenir."],
        ["Sözlü onay yetmiş diye hiç yazmaz", 1, "Belgelemek önemli; sözlü anlaşma sonra tartışma yaratabilir."],
        ["Yük sınırını yok sayıp daha agresif devam eder", 0, "Anlaşılan sınırı aşmak etik dışıdır."]
      ] }
    ] },
  { id: "sn-ifsa", konu: "etik", b: "Milyonları etkileyen açık", ikon: "📡",
    giris: "<b>Deniz</b> boş zamanında yaygın bir ev modem yazılımında uzaktan kod çalıştırmaya izin veren bir açık buluyor. Binlerce ev etkileniyor olabilir.",
    adimlar: [
      { s: "En doğru yol hangisi?", o: [
        ["Sosyal medyada ayrıntılarıyla paylaşıp şöhret kazanmak", 0, "Düzeltme yokken kamuya açmak saldırganlara kapıyı açar."],
        ["Açığı karaborsada satmak", 0, "Kötü amaçlı kullanım riski; etik kodunu ihlal eder."],
        ["Üreticiyi ve gerekirse yetkili CERT’i bilgilendirip düzeltme için makul zaman tanımak", 2, "Doğru: responsible disclosure (RFPolicy ruhu; Kaminsky örneği)."],
        ["Kimseye söylememek; “bana bulaşmasın”", 1, "Zararsız gibi görünse de sorumlu ifşa, bu tür açıkları düzelttirmeyi bekler."]
      ] },
      { s: "Üretici aylarca yanıt vermiyor. Deniz ne yapmalı?", o: [
        ["RFPolicy mantığıyla süreyi belgeleyip CERT ile birlikte kamuya açıklamayı planlamak", 2, "Doğru: politika, üretici ayak sürürse açıklamaya da izin veren dengeyi kurar."],
        ["Açığı hemen ayrıntılı sömürü koduyla yayımlamak", 0, "İfşa sorumlu olmalı; kullanıcıları gereksiz riske atmaz."],
        ["Açığı unutmak", 1, "Sorumluluk kaçmak değildir."]
      ] }
    ] },
  { id: "sn-cikar", konu: "etik", b: "Çıkar çatışması", ikon: "🤝",
    giris: "<b>Kerem</b> bir lojistik firmasına sızma testi yapacak. Firmanın en büyük rakibinde kardeşinin ortaklığı var; ayrıca rakip firmadan danışmanlık ücreti de almıştı.",
    adimlar: [
      { s: "Kerem ne yapmalı?", o: [
        ["Hiç söylememek; kendi profesyonelliğine güvenmek", 0, "Çıkar çatışmasını açıklamak etik yükümlülüktür."],
        ["Durumu işverene/müşteriye başlamadan açıklamak ve birlikte karar vermek", 2, "Doğru: şeffaflık."],
        ["Testin sonunda raporun en altına küçük punto ile yazmak", 0, "Açıklama zamanında ve açıkça yapılmalı."],
        ["Teste başlayıp rakiple ilgili bilgi çıkarsa saklamak", 0, "Gizlilik ve çıkar çatışması burada çarpışır; en başta açıklamak gerekir."]
      ] }
    ] },
  { id: "sn-veri", konu: "etik", b: "Maaş listesi", ikon: "📄",
    giris: "<b>Aslı</b> bir dosya sunucusunda tüm çalışanların maaşlarının bulunduğu bir tablo buluyor. Bu, testin kanıtı olabilir; ama kişisel veri içerir.",
    adimlar: [
      { s: "Aslı ne yapar?", o: [
        ["Kendine kopyalar, arkadaşına “bak ne buldum” diye gösterir", 0, "Müşteri verisini paylaşmak gizlilik ihlalidir."],
        ["Dosyaya erişimi raporda kanıtlar (gereken en az düzeyde), içeriği yaymadan korur", 2, "Doğru: kanıt göster ama hassas veriyi koru."],
        ["Dosyayı silip izini kapatır", 0, "Müşterinin verisine zarar vermek ve kanıtı yok etmek yanlıştır."],
        ["Raporda hiç bahsetmez", 1, "Açık bulgu müşteriye açıklanmalı."]
      ] }
    ] },
  { id: "sn-phish", konu: "faz", b: "Phishing izni yok", ikon: "🎣",
    giris: "<b>Burak</b> bir şirket testinde teknik servis açığı bulamıyor. Sözleşmede sosyal mühendislik <i>belirtilmemiş</i>. Kolay yol: çalışanlara phishing e-postası göndermek.",
    adimlar: [
      { s: "Burak ne yapmalı?", o: [
        ["“Zaten saldırganlar yapar” diyerek phishing göndermek", 0, "Kapsam dışı. Şirketin farkındalık eğitimi başka yöntemlerle yürüyor olabilir; izin olmadan yapmak etik dışı."],
        ["Müşteriye kapsam değişikliğini önermek, yazılı onay gelirse yapmak", 2, "Doğru: kapsam yazılı olarak genişletilir."],
        ["Çalışanları kişisel telefonlarından aramak", 0, "Aynı sorun: izinsiz sosyal mühendislik ve ek gizlilik riski."],
        ["Test bitti diye raporu yazıp bulamadıklarını belirtmek", 1, "Kabul edilebilir ama kapsam önerisini sunmak da müşteriye değer katar."]
      ] }
    ] },
  { id: "sn-iz", konu: "faz", b: "Logları silmek", ikon: "🧹",
    giris: "<b>Zeynep</b> bir red team çalışmasında operasyon ekibinin tespit yeteneğini ölçmek istiyor. Windows’ta olay günlüklerini temizlemeyi düşünüyor.",
    adimlar: [
      { s: "Log temizliği hakkında hangisi doğrudur?", o: [
        ["Log silmek hiç iz bırakmaz", 0, "Yanlış: Windows’ta logları silmek “loglar silindi” kaydı bırakır."],
        ["Log temizliği bir iz bırakır; bu da operasyon ekibinin dikkatini çekebilir, test amacı olabilir", 2, "Doğru: covering tracks bazen tam olarak savunmayı sınamak içindir."],
        ["Covering tracks aşaması hiçbir zaman gerekli değildir", 1, "Gerçek saldırganlar yapar; görev hedefine bağlıdır."]
      ] },
      { s: "Bu çalışmada hangi unsur belirleyicidir?", o: [
        ["Müşterinin yazılı hedefleri ve kapsamı", 2, "Her zaman: görev hedefini hatırla."],
        ["Testçinin kendi merakı", 0, "Hedefler müşteriye aittir."],
        ["Mümkün olduğunca fazla sistemi etkilemek", 0, "Zarar verme ilkesine aykırı."]
      ] }
    ] },
  { id: "sn-kanit", konu: "faz", b: "“Yaptım” yetmez", ikon: "🧾",
    giris: "<b>Can</b> bir web sunucusunda kod çalıştırmayı başardı. Toplantıda yöneticiler “emin misiniz, yanlış alarm olabilir mi?” diye soruyor.",
    adimlar: [
      { s: "Can’ın en güçlü cevabı nedir?", o: [
        ["“Bana güvenin, başardım.”", 0, "Gaining access aşamasında belgeleme/kanıt şarttır."],
        ["Kanıt gösterir: zaman damgalı ekran görüntüleri, komut çıktıları ve adım adım tekrar edilebilir notlar", 2, "Doğru: sömürü yanlış pozitif olamaz ama kanıtlanmalıdır."],
        ["“Nmap öyle gösterdi.”", 1, "Tarama sonucu zafiyeti kanıtlamaz; sömürü kanıtı gerekir."],
        ["Sistemi çökertip herkesin görmesini sağlamak", 0, "Zarar verme ilkesine aykırı."]
      ] }
    ] },
  { id: "sn-sapka", konu: "tur", b: "Üç kişi, üç şapka", ikon: "🎩",
    giris: "<b>Ali</b> izinli çalışan bir pentester. <b>Bora</b> izin almadan bir şirketin açığını bulup şirketi bilgilendiriyor, yöntemleri black-hat tekniklerine benziyor. <b>Cem</b> fidye için sistem şifreliyor.",
    adimlar: [
      { s: "Klasik terminolojiye göre sırasıyla Ali, Bora, Cem?", o: [
        ["White hat · Gray hat · Black hat", 2, "Doğru. Gray hat: iyi niyetli ama black-hat teknikleri."],
        ["Gray hat · White hat · Black hat", 0, "Ali izinli ve iyi: white."],
        ["White hat · Black hat · Gray hat", 0, "Bora’nın niyeti iyi; gray."],
        ["Black hat · Gray hat · White hat", 0, "Sıralama tersine."]
      ] },
      { s: "Yeni terminoloji ile Ali nasıl adlandırılır?", o: [
        ["Authorized", 2, "Doğru: authorized / unauthorized / semi-authorized."],
        ["Unauthorized", 0, "Ali izinli."],
        ["Semi-authorized", 0, "Bora’ya daha yakın."]
      ] }
    ] },
  { id: "sn-sicil", konu: "etik", b: "Sertifika adayı", ikon: "🎓",
    giris: "<b>Ece</b> CEH’e hazırlanıyor. Eskiden bir gençlik arkadaş grubu şirketlere zarar verecek eylemlerde bulunurdu; Ece bu grupla hâlâ yakın ve bazen sohbet ediyor.",
    adimlar: [
      { s: "Etik kodu açısından en isabetli yaklaşım?", o: [
        ["Hiçbir sorun yok, sohbet etmek yasal bir şey değil", 0, "Kitap: doğrudan yasa dışı olmasa da “black hat” sayılan gruplarla ilişki kurmak kurallara aykırıdır."],
        ["İlişkiyi kesmek; zararlı faaliyet yürüten gruplarla bağını bırakmak", 2, "Doğru."],
        ["Gruba “üye değilim, sadece izliyorum” demek", 1, "Belirsiz bir tutum; temiz çizgi gerekir."]
      ] }
    ] }
];

/* vaka: saldırı hikâyesi → aşama eşleme */
var VAKALAR = [
  { id: "vk-aylin", b: "Aylin’in Cuma e-postası", ikon: "📬",
    giris: "Bir sağlık firmasında muhasebe uzmanı <b>Aylin</b>, Cuma öğleden önce “fatura düzeltmesi” konulu bir e-posta alır. Hikâyeyi adım adım izle ve her adımı doğru etiketle. (Savunma gözüyle öğreniyorsun.)",
    adimlar: [
      { m: "Saldırgan grup, firmanın çalışanlarını sosyal ağlardan derler; hangi muhasebe yazılımını kullandıklarını öğrenir.", s: "Bu adım Cyber Kill Chain’de neye denk gelir?", o: ["Reconnaissance", "Weaponization", "Delivery", "C2"], a: 0, e: "Hedef ve zayıf noktaları araştırma = Reconnaissance (OSINT)." },
      { m: "Saldırgan, bu yazılımın PDF fatura formatına benzeyen zararlı bir doküman hazırlar.", s: "Bu adım nedir?", o: ["Reconnaissance", "Weaponization", "Exploitation", "Installation"], a: 1, e: "Zararlıyı teslim edilebilir paket hâline getirmek = Weaponization." },
      { m: "Doküman Aylin’e e-posta eki olarak gider.", s: "Bu adım nedir?", o: ["Delivery", "Exploitation", "Actions on Objectives", "Installation"], a: 0, e: "Silahı kurbanın ortamına ulaştırma = Delivery." },
      { m: "Aylin eki açar; dokümandaki zafiyet tetiklenir, zararlı çalışır.", s: "Bu adım nedir?", o: ["Delivery", "Exploitation", "Reconnaissance", "C2"], a: 1, e: "Zafiyetin tetiklenip sistemin enfekte olması = Exploitation (Initial Compromise)." },
      { m: "Zararlı, yeniden başlatmada da çalışsın diye zamanlanmış görev ekler.", s: "Bu adım Kill Chain’de nedir? ATT&CK’taki karşılığı hangisi?", o: ["Installation · Persistence", "Delivery · Initial Access", "C2 · Execution", "Exploitation · Discovery"], a: 0, e: "Kalıcı erişim = Installation; ATT&CK taktiği Persistence (Life Cycle’da Establish Foothold/Maintain Presence)." },
      { m: "Zararlı, dışarıdaki bir sunucuya düzenli bağlanıp talimat bekler.", s: "Bu adım nedir?", o: ["Command & Control", "Weaponization", "Delivery", "Impact"], a: 0, e: "Dışarıdan komut ve erişim = C2. Giden bağlantı olduğu için firewall genelde izin verir." },
      { m: "Saldırgan Aylin’in makinesinden elde ettiği kimlik bilgileriyle bir dosya sunucusuna geçer.", s: "Attack Life Cycle’da bu adım hangisi?", o: ["Move Laterally", "Initial Recon", "Initial Compromise", "Complete Mission"], a: 0, e: "Ağ içinde yan yana hareket = Move Laterally (east-west)." },
      { m: "Müşteri kayıtlarını toplayıp dışarıya aktarır.", s: "Kill Chain / ATT&CK karşılığı?", o: ["Actions on Objectives · Exfiltration", "Delivery · Collection", "Installation · Impact", "Recon · Discovery"], a: 0, e: "Asıl hedefe varış: Actions on Objectives; ATT&CK’ta Collection + Exfiltration." }
    ] },
  { id: "vk-kamera", b: "Garip kamera sunucusu (5 aşama)", ikon: "📹",
    giris: "Yetkili bir pentester, kapsamı yazılı bir müşteri için 5 aşamayı yürütüyor. Eylemleri aşamalarla eşleştir.",
    adimlar: [
      { m: "Şirketin ağ bloklarını ve ofis lokasyonlarını derler.", s: "Aşama?", o: ["Reconnaissance & Footprinting", "Scanning & Enumeration", "Gaining Access", "Covering Tracks"], a: 0, e: "Boyut ve kapsamı anlamak için bilgi toplama." },
      { m: "Bir host üzerinde açık portlar ve arkasındaki servis sürümleri belirlenir.", s: "Aşama?", o: ["Scanning & Enumeration", "Maintaining Access", "Reconnaissance & Footprinting", "Gaining Access"], a: 0, e: "Port + servis keşfi = Scanning & Enumeration." },
      { m: "Eski sürüm bir servis sömürülür, kanıt olarak komut çıktısı kaydedilir.", s: "Aşama?", o: ["Gaining Access", "Scanning & Enumeration", "Covering Tracks", "Maintaining Access"], a: 0, e: "Sömürü + belgeleme = Gaining Access." },
      { m: "Sistem yeniden başlatıldığında da erişim sürsün diye zamanlanmış görev bırakılır; dışarıya beacon atılır.", s: "Aşama?", o: ["Maintaining Access", "Gaining Access", "Reconnaissance & Footprinting", "Covering Tracks"], a: 0, e: "Persistence. Beacon dışarı çıkar çünkü gelen bağlantı engelli." },
      { m: "Müşteri tespit yeteneğini görmek istediği için olay günlükleri silinir (anlaşılan kapsamda).", s: "Aşama? Ne olur?", o: ["Covering Tracks · “logs cleared” kaydı oluşur", "Gaining Access · iz kalmaz", "Scanning · yeni port açılır", "Maintaining Access · kullanıcı oturumu kapanır"], a: 0, e: "Log silmek de kendi izini bırakır." }
    ] }
];
