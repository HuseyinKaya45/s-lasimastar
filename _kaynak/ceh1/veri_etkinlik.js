/* Etkinlikler: sıralama, eşleştirme, sınıflandırma */
var SIRALAMA = [
  { id: "ord-kill", konu: "model", b: "Kill Chain’i sıraya diz", t: "Cyber Kill Chain’in 7 aşamasını doğru sıraya koy (ilk sıradan başla).",
    items: ["Reconnaissance", "Weaponization", "Delivery", "Exploitation", "Installation", "Command & Control", "Actions on Objectives"],
    not: ["Hedef ve zayıf noktaları araştırma", "Zararlıyı hazırlama (özel ya da hazır)", "Silahı hedef ortama ulaştırma", "Zararlının sistemi enfekte etmesi", "Kalıcı erişim için backdoor/ek yazılım", "Uzaktan komut ve erişim", "Veri çalma, yıkım, para kazanma…"] },
  { id: "ord-life", konu: "model", b: "Attack Life Cycle’ı sıraya diz", t: "Mandiant’ın saldırı yaşam döngüsünün 8 adımını sırala (döngüye girmeden önceki adımlar önce).",
    items: ["Initial Recon", "Initial Compromise", "Establish Foothold", "Escalate Privileges", "Internal Recon", "Move Laterally", "Maintain Presence", "Complete Mission"],
    not: ["Kurban ve OSINT ile ilk keşif", "Çoğunlukla phishing ile ilk giriş", "Erişimi koruma, geri dönüş yolu", "Yönetici yetkisi kazanma", "Ağdaki bağlantıları ve kimlik bilgilerini inceleme", "East-west: başka sistemlere geçiş", "Zararlıyı çalışır tutma (persistence)", "Veri sızdırma; çoğu zaman tekrar tekrar"] },
  { id: "ord-faz", konu: "faz", b: "5 aşamayı sıraya diz", t: "EC-Council etik hackleme aşamalarını doğru sıraya koy.",
    items: ["Reconnaissance & Footprinting", "Scanning & Enumeration", "Gaining Access", "Maintaining Access", "Covering Tracks"],
    not: ["Ağ blokları, hostlar, kişiler", "Açık portlar, servisler, sızan bilgi", "Sömür ve kanıtla", "Persistence, beacon, rootkit", "Log ve izleri örtme"] },
  { id: "ord-atk1", konu: "model", b: "ATT&CK’ın ilk yarısı", t: "ATT&CK taktiklerinin ilk 7’sini sırala.",
    items: ["Reconnaissance", "Resource Development", "Initial Access", "Execution", "Persistence", "Privilege Escalation", "Defense Evasion"],
    not: ["Kurban ve giriş yolları arama", "Altyapı, exploit, kimlik toplama", "İlk erişim", "Zararlı davranışların çalıştırılması", "Yeniden başlatmadan sağ çıkma", "Yönetici yetkisi", "Korumaları atlatma"] },
  { id: "ord-atk2", konu: "model", b: "ATT&CK’ın ikinci yarısı", t: "ATT&CK taktiklerinin son 7’sini sırala.",
    items: ["Credential Access", "Discovery", "Lateral Movement", "Collection", "Command and Control", "Exfiltration", "Impact"],
    not: ["Kullanıcı adı/şifre toplama", "Ortam hakkında bilgi toplama", "Sistemler arası geçiş", "Verileri bir araya getirme", "Uzaktan komuta altyapısı", "Veriyi dışarı taşıma", "Yıkım, şifreleme (ransomware)"] }
];

var ESLESTIRME = [
  { id: "mat-kill", konu: "model", b: "Kill Chain: aşama ↔ anlam", t: "Her aşamayı doğru açıklamayla eşleştir.",
    p: [["Reconnaissance", "Hedefi araştırma, seçme ve zayıf noktaları belirleme"], ["Weaponization", "Zararlıyı teslim edilebilir paket hâline getirme"], ["Delivery", "Zararlıyı ya da zararlı bağlantıyı kurbanın ortamına ulaştırma"], ["Exploitation", "Zararlının hedefi fiilen enfekte etmesi"], ["Installation", "Kalıcı erişim için backdoor kurma"], ["Command & Control", "Dışarıdan “elle klavye” erişimi sağlama"], ["Actions on Objectives", "Veri sızdırma, yıkım ya da başka hedefe geçiş"]] },
  { id: "mat-life", konu: "model", b: "Attack Life Cycle: adım ↔ anlam", t: "Mandiant döngüsünün adımlarını eşleştir.",
    p: [["Initial Compromise", "İlk sisteme sızma (çoğunlukla phishing)"], ["Establish Foothold", "Sisteme geri dönme yolu garanti altına alınır"], ["Escalate Privileges", "Yönetici düzeyine çıkma, kimlik bilgisi toplama"], ["Internal Recon", "Sistemin diğer bağlantılarını ve hesapları inceleme"], ["Move Laterally", "Ağ içinde east-west hareket"], ["Maintain Presence", "Registry/zamanlanmış görev ile kalıcılık"], ["Complete Mission", "Veri çıkarma; çoğu zaman tekrar eden ziyaret"]] },
  { id: "mat-atk", konu: "model", b: "ATT&CK: taktik ↔ davranış", t: "ATT&CK taktiklerini davranışlarla eşleştir.",
    p: [["Persistence", "Her açılışta ya da oturum açılışında çalışan program kurmak"], ["Privilege Escalation", "Kısıtlı kullanıcıdan yönetici düzeyine çıkmak"], ["Defense Evasion", "Maskeleme, korumaları kurcalama"], ["Credential Access", "Eski saldırılardan ya da sistemden kullanıcı adı/şifre toplamak"], ["Discovery", "Kurban ortamı hakkında bilgi toplayan her faaliyet"], ["Exfiltration", "Toplanan veriyi saldırgana taşımak"], ["Impact", "Verinin şifrelenmesi/yıkımı (ransomware dâhil)"]] },
  { id: "mat-sapka", konu: "tur", b: "Şapka terimleri", t: "Terimleri tanımlarıyla eşleştir.",
    p: [["White hat", "Her zaman iyi amaçla çalışır"], ["Black hat", "Genellikle yasaya aykırı kötü işler yapar"], ["Gray hat", "İyi amaçlı ama black-hat tekniklerini kullanır"], ["Authorized", "İzinli (yeni terminolojideki “white” karşılığı)"], ["Unauthorized", "İzinsiz (yeni terminolojideki “black” karşılığı)"], ["Semi-authorized", "Yarı izinli (yeni terminolojideki “gray” karşılığı)"]] },
  { id: "mat-kisaltma", konu: "tur", b: "Kısaltma çözme", t: "Kısaltmaları çöz.",
    p: [["PTES", "Penetration Testing Execution Standard"], ["OSSTMM", "Open Source Security Testing Methodology Manual"], ["TTP", "Tactics, Techniques and Procedures"], ["CERT", "Computer Emergency Response Team"], ["C2", "Command & Control"], ["COTS", "Common Off-The-Shelf (hazır) yazılım"]] },
  { id: "mat-tarih", konu: "etik", b: "İsimler ve olaylar", t: "Kişi/kurumu doğru bilgiyle eşleştir.",
    p: [["Rain Forest Puppy", "1990’larda RFPolicy’yi yazan araştırmacı"], ["Dan Kaminsky", "DNS açıklarını önce üreticilerle çözüp sonra duyurdu"], ["Lockheed Martin", "Cyber Kill Chain’i uyarlayan savunma şirketi"], ["Mandiant", "Attack Life Cycle’ı sık kullanan güvenlik firması"], ["MITRE", "ATT&CK taksonomisini yayımlar"], ["Mirai", "Gömülü Linux cihazlardan oluşan botnet"]] }
];

/* sınıflandırma: aşama kovası seçilir */
var SINIFLA = [
  { id: "sort-faz", konu: "faz", b: "Hangi aşama? (5 aşama)", t: "Her eylemin hangi etik hackleme aşamasına ait olduğunu seç.",
    kovalar: ["Recon & Footprinting", "Scanning & Enumeration", "Gaining Access", "Maintaining Access", "Covering Tracks"],
    items: [
      ["Şirketin ağ bloklarını ve çalışan adlarını açık kaynaklardan listelemek", 0],
      ["Bir hostta hangi portların açık olduğunu belirlemek", 1],
      ["SMTP sunucusundan geçerli kullanıcı adlarını öğrenmek", 1],
      ["SMB paylaşımlarını ve kullanıcıları listelemek", 1],
      ["Yazılımın hangi sürümde çalıştığını (ör. Apache/NGINX/IIS) öğrenmek", 1],
      ["Açık bir servisi sömürüp sistemde kod çalıştırmak", 2],
      ["Sızdığını rapor için kanıtlayacak ekran görüntüsü almak", 2],
      ["İzinli bir phishing kampanyasıyla kullanıcıdan şifre almak", 2],
      ["Yeniden başlatmadan sonra da çalışacak zamanlanmış görev eklemek", 3],
      ["Dışarıdaki bir sunucuya düzenli “beacon” gönderen yazılım bırakmak", 3],
      ["Backdoor sağlayan bir rootkit kurmak", 3],
      ["Eylemlerin loglanmasını engellemek", 4],
      ["Windows olay günlüklerini temizlemek", 4],
      ["Ağ bağlantılarını yanlış raporlayan zararlı kullanmak", 4],
      ["Şirketin çalışanlarının e-posta biçimini (ad.soyad@) tahmin etmek", 0],
      ["Hedefin konum ve ofis bilgilerini derlemek", 0]
    ] },
  { id: "sort-kill", konu: "model", b: "Hangi Kill Chain aşaması?", t: "Her olayı Kill Chain aşamasıyla eşleştir.",
    kovalar: ["Reconnaissance", "Weaponization", "Delivery", "Exploitation", "Installation", "C2", "Actions on Obj."],
    items: [
      ["Saldırgan hedef şirketin çalışanlarını LinkedIn’den derliyor", 0],
      ["Zararlı makro, bir PDF/Office dosyasına gömülüyor", 1],
      ["Hazırlanan dosya e-posta ekiyle kurbana gönderiliyor", 2],
      ["Kurban eki açıyor ve zafiyet tetikleniyor", 3],
      ["Sistemde kalıcı backdoor oluşuyor", 4],
      ["Dışarıdaki sunucu içerideki makineye komut gönderiyor", 5],
      ["Müşteri veritabanı dışarı sızdırılıyor", 6],
      ["Zararlı bir web sitesi kurban ziyaret edince enfekte ediyor (sitenin hazırlanması)", 1],
      ["Kurbanın zararlı siteyi ziyaret etmesi sağlanıyor", 2],
      ["Saldırgan hedef için hangi VPN cihazını kullandıklarını araştırıyor", 0]
    ] },
  { id: "sort-etik", konu: "etik", b: "Etik mi, değil mi?", t: "Her davranışı <b>Etik</b> ya da <b>Etik dışı</b> olarak işaretle.",
    kovalar: ["Etik", "Etik dışı"],
    items: [
      ["Yazılı kapsamdaki sistemlerde test yapmak", 0],
      ["Bulduğun açığı sosyal medyada herkese duyurmak", 1],
      ["Üretici ve CERT ile iletişime geçip düzeltmeleri beklemek", 0],
      ["Müşteri verisini tanıdığına “göstermek için” paylaşmak", 1],
      ["Çıkar çatışmanı işverene bildirmek", 0],
      ["Kapsam dışındaki komşu şirket sunucusunu “bir bakmak için” taramak", 1],
      ["Beklenmedik kesinti olduğunda ilgilileri hemen bilgilendirmek", 0],
      ["Bir black-hat grubuyla bağlantını sürdürmek", 1],
      ["Kazara oluşan kesintiyi gizlemek", 1],
      ["İzin verilmeyen bir sosyal mühendislik testini “kolay yol” diye yapmak", 1],
      ["Sözleşmeye uygun şekilde gizli bilgiyi korumak", 0],
      ["Kapsamı yazılı olarak netleştirmek", 0]
    ] },
  { id: "sort-tur", konu: "tur", b: "Pentest mi, red team mi?", t: "Her tanımı doğru kavramla eşleştir.",
    kovalar: ["Penetration testing / Ethical hacking", "Red teaming"],
    items: [
      ["Kuruluşun savunmasını delmeyi deneyen izinli test", 0],
      ["Testçiler düşmanca davranır, gerçek saldırgan gibi gizli kalmaya çalışır", 1],
      ["İş ilanlarında “ethical hacker” yerine sık görülen ad", 0],
      ["Tespit edilmemek öncelikli hedeftir", 1],
      ["Yazılımda hata bulma testini de kapsar", 0],
      ["Sızma testinin özel, adversarial bir türü", 1]
    ] }
];
