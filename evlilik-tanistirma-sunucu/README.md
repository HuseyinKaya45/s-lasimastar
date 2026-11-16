# Evlilik Tanıştırma Sistemi — Sunucu Sürümü

Evlenmek isteyen yetişkinlerin **kendi isteğiyle** kurumlara başvurduğu, adayların **kendi belirttiği tercihlere** göre uyumlu adayların önerildiği ve tanıştırma sürecinin **karşılıklı rızayla** yürütüldüğü, **çok kullanıcılı ve merkezi veritabanlı** web uygulaması.

- **Bağımlılık yok:** yalnızca Node.js ≥ 22.13 (yerleşik `node:http`, `node:sqlite`, `node:crypto`). `npm install` gerekmez; tedarik zinciri saldırı yüzeyi minimumdur ve kapalı ağda kurulabilir.
- **Önerilen dağıtım — bağımsız birimler (§0):** her birim kendi bilgisayarında, kendi veritabanıyla çalışır; aday verisi merkezde toplanmaz. Devlet denetimi imzalı, kişisiz paketlerle yapılır. İsterseniz tek merkezî sunucu olarak da kurulabilir (§1).
- **Veritabanı:** SQLite (WAL). Çok kullanıcılı erişim tek sunucu süreci üzerinden yapılır; yazmalar tek işlemde (iş verisi + denetim kaydı) gerçekleşir.
- **Aynı kuralların sunucuda uygulanması:** çevrimdışı tarayıcı sürümünden farklı olarak tüm yetki ve iş kuralları sunucudadır; istemci yalnızca görünümdür.

> **Önemli:** Bu yazılım bir karar destek ve kayıt aracıdır; hukuki danışmanlık değildir. Üretime almadan önce [Üretim öncesi kontrol listesi](#üretim-öncesi-kontrol-listesi)ni tamamlayın.

---

## 0. Dağıtım modeli: bağımsız birimler + merkezî otorite (önerilen)

**Her birim (şube/il) kendi bilgisayarında, kendi veritabanıyla tamamen bağımsız çalışır.** Aday verileri hiçbir zaman merkezde toplanmaz, birimler arasında da paylaşılmaz. Devlet denetimi, **kişisel veri taşımadan**, imzalı paketlerle sağlanır:

```
        ┌─────────────────────────── MERKEZÎ OTORİTE (kendi bilgisayarı, çevrimdışı olabilir) ───────────────────────────┐
        │  authority.js:  anahtar üret · parametreleri İMZALA · birimleri kaydet · gelen denetim paketlerini DOĞRULA     │
        └───────────▲──────────────────────────────────────────────────────────────────────────────────▲─────────────────┘
                    │ imzalı parametre paketi (USB/e-posta/kurum ağı)                      imzalı denetim paketi │ (kişisiz)
        ┌───────────┴──────────┐        ┌──────────────────────┐        ┌──────────────────────┐
        │ BİRİM A (bilgisayar) │        │ BİRİM B (bilgisayar) │        │ BİRİM C (bilgisayar) │   … her biri ayrı DATA_DIR,
        │ kendi DB + kendi anahtar│     │ kendi DB + kendi anahtar│     │ kendi DB + kendi anahtar│     ayrı şifreleme anahtarı
        └──────────────────────┘        └──────────────────────┘        └──────────────────────┘
```

| Ne taşınır? | Yön | İçerik |
|---|---|---|
| **Parametre paketi** | Otorite → birim | Otoritenin **Ed25519 ile imzaladığı** kurallar (yaş sınırları, ağırlıklar, sorular, rıza metni…). Birim imzayı doğrular; sahte, değiştirilmiş veya eski sürüm paket **reddedilir**. |
| **Denetim paketi** | Birim → otorite | **Kişisel veri içermez:** toplu sayılar, parametre mührü, denetim günlüğü (yalnız kimlik/işlem türleri). Birimin **imzasıyla** mühürlüdür. |
| Aday verisi | **hiçbir yöne taşınmaz** | Her birimde kalır, alan düzeyinde şifrelidir. |

**Otoritenin denetim gücü (veri görmeden):** imza doğrulama · denetim günlüğü zincirini **paketin kendi iddiasına güvenmeden yeniden hesaplama** · birimin parametre mührünün otoritenin yayımladığıyla eşleşmesi · eski/eksik paket tespiti · aynı birimden gelen paketler arasında **günlüğün geçmişinin yeniden yazılması** tespiti · kayıtsız birim kodu tespiti.

**Birimde zorlama (`LOCK_PARAMS=1`):** parametreler yalnız otoritenin imzalı paketiyle değişir (kurum adı hariç); **paket yüklenmeden eşleştirme ve tanıştırma kapalıdır**. Kurulumda otoritenin açık anahtarı (`AUTHORITY_PUBKEY_FILE`) tanımlanır; özel anahtar birimde bulunmaz.

### Birim kurulumu (tek bilgisayar)
```bash
# Linux/macOS:  ./baslat.sh      Windows: baslat.bat      (ilk çalıştırmada sihirbaz açılır)
npm run setup -- --keys-file=/media/usb/ets-anahtar.env   # birim kodu sorulur; şifreleme anahtarı USB'de ayrı dosyaya yazılır
npm run init-admin                                        # birim yöneticisi
npm run sign-keygen                                       # keys/unit-public.pem  → OTORİTEYE gönderin
# .env'e ekleyin:
#   SIGNING_KEY_FILE=…/keys/unit-signing.pem
#   AUTHORITY_PUBKEY_FILE=…/authority-public.pem
#   LOCK_PARAMS=1
npm start      # http://127.0.0.1:8080  (aynı bilgisayardaki tarayıcıdan)
```
Birim bilgisayarı **internete bağlı olmak zorunda değildir**; sistem dışarıya hiçbir bağlantı kurmaz. Birkaç görevli aynı birimde çalışacaksa `HOST` ve TLS ayarlarıyla (§6) birim içi ağdan erişim verilebilir; yoksa yalnız o bilgisayardan (`127.0.0.1`) kullanılır.

### Otorite iş akışı (otoritenin kendi bilgisayarında)
```bash
node authority.js keygen --out=otorite/                         # parolalı özel anahtar + açık anahtar (açık anahtarı birimlere dağıtın)
node authority.js sign-params parametreler.json --key=otorite/authority-private.pem --version=1 --note="Genelge 2026/4"
node authority.js register-unit ANK-01 ankara/unit-public.pem --name="Ankara Birimi"
# Birimler paketi Parametreler sayfasından yükler. Düzenli olarak birimlerden Denetim sayfasındaki
# "Denetim paketini indir" dosyalarını toplayın, sonra:
node authority.js aggregate --units=units.json --packages=gelen-paketler/ --bundle=parametre-paketi-v1.json
node authority.js verify-package gelen-paketler/ANK-01.json --pub=ankara/unit-public.pem
```
`aggregate`, sorun varsa **çıkış kodu 2** döndürür (betiklere/izlemeye bağlanabilir).

### Bu modelin sınırları (bilerek)
- **Birimler arası eşleştirme yoktur:** her birim yalnız kendi adaylarını eşleştirir. Havuzlar küçük kalabilir; bu, gizlilik için bilinçli bir tercihtir.
- **Aynı kişinin iki ayrı birime başvurması sistem tarafından tespit edilemez** (veri paylaşılmadığı için). Bu, idari kural/prosedürle (örn. başvuruda beyan, birimler arası resmî bildirim) yönetilmelidir.
- Aday bir birimden diğerine **taşınamaz**; yeni birimde yeniden başvurur.
- **Özel anahtarların korunması** güvenin temelidir: otorite özel anahtarı sızarsa sahte parametre paketi üretilebilir; birim imza anahtarı sızarsa o birim adına sahte denetim paketi üretilebilir. Anahtarları çevrimdışı/HSM'de saklayın, sızıntıda anahtar değiştirip `register-unit` ile yenileyin.
- Birim yöneticisi kendi bilgisayarında yazılımı veya veritabanını değiştirebilir; bu **önlenmez, tespit edilir** (mühür uyuşmazlığı, imza/zincir bozulması, geçmişin yeniden yazılması). Tespit, düzenli paket gönderimine bağlıdır.

---

## 1. Hızlı başlangıç (tek sunucu, otoritesiz)

```bash
cd evlilik-tanistirma-sunucu

# 1) Veri şifreleme anahtarı üret ve .env'e yaz
npm run keygen > .env
echo "HOST=127.0.0.1" >> .env
echo "PORT=8080" >> .env
chmod 600 .env

# 2) İlk yöneticiyi oluştur (parola istenir; en az 12 karakter)
npm run init-admin

# 3) Başlat
npm start
```

Tarayıcıda `http://127.0.0.1:8080` — yönetici hesabıyla girin. **Üretimde HTTPS zorunludur** (bkz. §6).

Denemek için `ALLOW_DEMO=1` ile başlatın; **Veri** sekmesinden 40 deneme adayı ekleyebilirsiniz. Üretimde `ALLOW_DEMO` kapalı olmalıdır.

### Anahtarınızı kaybetmeyin
`DATA_KEYS`, aday verilerini çözen anahtardır. **Kaybolursa veriler kurtarılamaz**; veritabanı yedeğiyle aynı yerde **saklamayın**. Anahtarı kurumun anahtar yönetim sürecine (HSM/kasa) teslim edin.

---

## 2. Mimari ve güvenlik kontrolleri

| Alan | Uygulama |
|---|---|
| Kişisel veri saklama | Aday kaydı **alan düzeyinde AES-256-GCM** ile şifrelenir (kayıt kimliği AAD olarak bağlanır; blob başka kayda taşınamaz). Veritabanı dosyası veya yedeği tek başına okunamaz. Testle doğrulanır: ad, T.C. no, telefon veri dosyasında düz metin olarak bulunmaz. |
| Çift kayıt kontrolü | T.C. no düz metin tutulmaz; `HMAC-SHA256` dizin özeti üzerinden benzersizlik sağlanır. |
| Anahtar döndürme | Anahtar halkası (`DATA_KEYS=1:…,2:…`, `DATA_KEY_ID`); `npm run rekey` tüm kayıtları yeni anahtarla yeniden şifreler. |
| Kimlik doğrulama | Kullanıcı adı + parola (scrypt, N=2¹⁵), en az 12 karakter, deneme sınırı (5 hata → 15 dk kilit), IP bazlı sınır, sahte özetle zamanlama eşitleme. Kullanıcı varlığı sızdırılmaz. |
| İki aşamalı doğrulama | İsteğe bağlı TOTP (RFC 6238); yönetici **tüm kullanıcılar için zorunlu** kılabilir. Aynı kod tekrar kullanılamaz. |
| Oturum | 256 bit rastgele jeton (veritabanında yalnız özeti), `HttpOnly; SameSite=Strict; Secure` çerez, boşta kalma + mutlak süre sınırı. |
| CSRF / XSS | Oturuma bağlı CSRF jetonu + `Origin` doğrulaması; sıkı CSP (satır içi betik/stil yok); tüm çıktılar kaçışlanır. |
| Yetki | Sunucuda rol bazlı: **Yönetici / Görevli / Denetçi (salt okunur)**. Denetçi yalnız maskeli veri görür; iletişim bilgisini ve serbest metni göremez. |
| Denetim günlüğü | **SHA-256 zincirli**, işlemle aynı transaction'da yazılır; SQLite tetikleyicileri `UPDATE/DELETE`'i engeller. `npm run verify-audit` ve panel zinciri doğrular; baş özeti dışarıda mühürlenebilir. Kişisel veri içeren **her görüntüleme** kaydedilir. |
| İki kişi kuralı | Birden fazla yönetici varsa **parametre değişikliği** ikinci yönetici onayı ister; **güvenlik engelini kaldırma** ve **şikâyet kapatma** işlemi, engeli koyan/bildiren kişiden farklı bir yönetici gerektirir. |
| Parametre bütünlüğü | Parametre sürümleri gerekçeyle saklanır, SHA-256 "mühür" üretir; makamın bildirdiği resmî mühürle karşılaştırılır, uyuşmazlık panelde uyarı olur. |
| Eşzamanlılık | Aday kayıtlarında iyimser kilit (`version`); iki görevli aynı kaydı ezemez (409). |
| Başlıklar / ağ | CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, HSTS (Secure modda), istek boyutu sınırı, zaman aşımları, yol geçişi (path traversal) koruması. |

### Değiştirilemez ürün güvenceleri (parametre ile kapatılamaz)
18 yaş alt sınırı · gönüllülük ve şahsen başvuru · iki taraf **ayrı ayrı** kabul etmeden iletişim bilgisi paylaşılmaması · reddeden adayın bir daha aynı kişiyle eşleştirilmemesi · koruma/uzaklaştırma kararı olanın havuza alınmaması · sistemin kimseyi otomatik eşleştirmemesi.

---

## 3. Roller ve yetkiler

| İşlem | Yönetici | Görevli | Denetçi |
|---|:-:|:-:|:-:|
| Aday oluştur/düzenle, havuza al, bekletme, çekilme, güvenlik engeli koy | ✔ | ✔ | — |
| Eşleştirmeyi çalıştır, tanıştırma yürüt | ✔ | ✔ | — |
| Aday/tanıştırma görüntüle | tam | tam | **maskeli** |
| İletişim bilgisi (yalnız görüşme planlandıktan sonra ve rıza varsa) | ✔ | ✔ | — |
| Güvenlik engeli kaldır, şikâyet kapat, kişisel veri sil (anonimleştir) | ✔ (iki kişi kuralı) | — | — |
| Parametre öner/uygula/onayla | ✔ | — | görüntüle |
| Kullanıcı yönetimi | ✔ | — | — |
| Denetim günlüğü, zincir doğrulama, denetim paketi | ✔ | — | ✔ |
| Adalet raporu, panel | ✔ | ✔ | ✔ |

---

## 4. Yapılandırma (ortam değişkenleri / `.env`)

| Değişken | Varsayılan | Açıklama |
|---|---|---|
| `DATA_KEYS` | — (zorunlu) | `id:base64(32 bayt)` listesi, virgülle ayrılır. `npm run keygen` üretir. |
| `DATA_KEY_ID` | — (zorunlu) | Şifrelemede kullanılacak geçerli anahtar kimliği. |
| `DATA_DIR` | `./data` | Veritabanı klasörü (0700). Yalnız servis hesabı erişebilmeli. |
| `HOST` / `PORT` | `127.0.0.1` / `8080` | Dinleme adresi. Dış ağa doğrudan açmayın; ters vekil kullanın. |
| `TLS_CERT` / `TLS_KEY` | — | Verilirse sunucu doğrudan HTTPS (TLS ≥1.2) sunar. |
| `TRUST_PROXY` | `0` | `1`: HTTPS sonlandıran ters vekil arkasında; `X-Forwarded-For` istemci IP'si için kullanılır ve çerez `Secure` olur. Yalnız güvenilir vekil arkasında açın. |
| `COOKIE_SECURE` | TLS/vekil varsa `1` | Çerez `Secure` bayrağı. |
| `SESSION_MAX_HOURS` | `12` | Mutlak oturum süresi (boşta kalma süresi parametrelerden). |
| `ALLOW_DEMO` | `0` | Deneme verisi uçları. **Üretimde kapalı.** |
| `UNIT_CODE` | `BIRIM-1` | Otoritenin verdiği birim kodu; denetim paketlerinde yer alır. |
| `KEYS_FILE` | — | Şifreleme anahtarlarının tutulduğu ayrı dosya (örn. USB). `npm run setup -- --keys-file=…` üretir. |
| `AUTHORITY_PUBKEY_FILE` | — | Otoritenin açık anahtarı (PEM). Tanımlıysa imzalı parametre paketi yüklenebilir. |
| `LOCK_PARAMS` | `0` | `1`: parametreler yalnız otoritenin imzalı paketiyle değişir; paket yüklenmeden eşleştirme kapalıdır. `AUTHORITY_PUBKEY_FILE` gerektirir. |
| `SIGNING_KEY_FILE` | — | Birimin denetim paketi imza özel anahtarı (`npm run sign-keygen`). Yoksa paketler imzasız olur ve otorite bunu sorun olarak işaretler. |
| `SIGNING_KEY_PASSPHRASE` | — | İmza anahtarı parolalıysa. |
| `RATE_LIMIT_PER_MIN` | `600` | IP başına dakika başı istek sınırı. |

---

## 5. İşletim

**Yedekleme** (tutarlı anlık görüntü, `VACUUM INTO`; kişisel veriler şifreli):
```bash
npm run backup            # ./data/backups/ets-<tarih>.sqlite (0600)
```
Yedekleri ve `DATA_KEYS`'i **ayrı** ortamlarda saklayın. Geri yükleme: servisi durdurun, yedeği `DATA_DIR/ets.sqlite` olarak koyun (`-wal`/`-shm` dosyalarını silin), aynı anahtarla başlatın, `npm run verify-audit` çalıştırın.

**Denetim bütünlüğü:**
```bash
npm run verify-audit      # zinciri doğrular, baş özetini yazar (dış mühürleme için saklayın)
```

**Anahtar döndürme:** yeni anahtar üretin → `DATA_KEYS`'e `2:…` ekleyin, `DATA_KEY_ID=2` yapın → `npm run rekey` → eski anahtarı yedekler eskiyi gerektirdiği sürece saklayın.

**Güncelleme:** servisi durdurun, yedek alın, dosyaları değiştirin, başlatın; şema `CREATE IF NOT EXISTS` ile uyumludur (sürüm geçişi gerekirse ayrıca belgelenir).

**Günlükler:** istek günlükleri `stdout`'a (yöntem, yol, durum, süre — **gövde/kişisel veri yok**) yazılır; sistem günlüğüne (journald) yönlendirin. Hata ayrıntıları istemciye gönderilmez.

---

## 6. Dağıtım

`deploy/` klasöründe örnekler vardır (**test ortamınızda doğrulayın**):

- `deploy/nginx.conf` — TLS sonlandırma, güvenlik başlıkları, istek sınırı.
- `deploy/ets.service` — systemd birimi (sertleştirilmiş: `NoNewPrivileges`, `ProtectSystem=strict`, ayrı servis kullanıcısı).
- `Dockerfile` — `node:22-alpine`, root olmayan kullanıcı, `/data` birimi.

Önerilen düzen: **nginx (TLS) → `127.0.0.1:8080`**, `TRUST_PROXY=1`, kurum içi ağ/VPN dışına açmayın.

---

## 7. Test

```bash
npm test      # 34 test: kriptografi, motor, HTTP uçları, yetki, şifreleme, denetim zinciri, iki kişi kuralı, TOTP, imzalı paketler, parametre kilidi, toplu denetim
```
Testler gerçek HTTP sunucusu ve geçici bir veritabanı kullanır; veri dosyasında düz metin kişisel veri bulunmadığını, rol ihlallerinin reddedildiğini ve denetim günlüğü kurcalamasının yakalandığını doğrular.

---

## 8. API özeti

Tüm uçlar `/api` altındadır; JSON; oturum çerezi + `X-CSRF-Token` başlığı gerekir.

`POST /login` · `POST /logout` · `GET /me` · `POST /me/password` · `POST /me/totp/setup|enable`
`GET /dashboard` · `GET /fairness` · `GET|POST /params…` (öneri/onay/mühür/2FA zorunluluğu)
`GET|POST /applicants` · `GET|PUT /applicants/:id` · `POST /applicants/:id/action` · `GET /applicants/:id/card`
`POST /match/run` · `GET /match/latest` · `GET /match/why`
`GET|POST /intros` · `GET /intros/:id` · `POST /intros/:id/{respond|plan|outcome|end|decision|timeout|complaint|close-complaint}`
`POST /params/import-bundle` (imzalı otorite paketi)
`GET /audit` · `GET /audit/verify` · `GET /export/package` (imzalı, kişisiz) · `GET|POST|PATCH /users`

---

## 9. Ölçek ve sınırlar

- **Tek sunucu süreci + SQLite.** Binlerce aday ve onlarca eşzamanlı görevli için uygundur. Yüksek erişilebilirlik (HA), çok düğümlü çalışma veya on binlerce aday için PostgreSQL ve ayrı iş kuyruğu gerekir.
- **Eşleştirme O(n²):** ölçüm — 1.000 aday ≈ 1 sn, 2.000 ≈ 4 sn, 4.000 ≈ 16 sn. 300'den büyük havuzlarda hesap ayrı iş parçacığında yapılır (sunucu yanıt vermeye devam eder); çok büyük havuzlarda gece çalıştırma veya ön eleme (il/yaş dilimi) önerilir.
- **Merkezî otoriteye bağımlılık yoktur ama zorunlu da değildir:** `AUTHORITY_PUBKEY_FILE`/`LOCK_PARAMS` verilmezse birim tamamen yerel çalışır (denetim paketleri yine üretilebilir).
- **Kimlik doğrulama yerel hesaplarladır.** e-Devlet/LDAP/SAML tümleşmesi yoktur; kurumsal kimlik sağlayıcı gerekiyorsa `lib/service.js` içindeki `login` bölümü uyarlanmalıdır.
- **Resmî sorgu yok.** Nüfus (MERNİS), adli sicil, koruma kararı sorguları yapılmaz; görevlinin elle teyit ettiği işaretlerdir.
- **TOTP için QR kodu üretilmez** (bağımlılık yok); gizli anahtar/URI elle girilir.
- Hız sınırları bellek içidir (süreç yeniden başlayınca sıfırlanır); ağ katmanında ek sınır önerilir.
- Denetim günlüğünün kurcalanması **tespit edilir, engellenmez**: veritabanı dosyasına tam erişimi olan biri zinciri baştan üretebilir. Baş özetini düzenli olarak dışarıda (imzalı/zaman damgalı) saklayın.

---

## Üretim öncesi kontrol listesi

- [ ] Eşleştirme politikasının ve toplanan verilerin **hukuka uygunluğu** (KVKK: aydınlatma, açık rıza, VERBİS, saklama-imha, veri sorumlusu/işleyen rolleri; cinsiyet kuralı dahil) yetkili makamca onaylandı.
- [ ] Rıza metni, parametreler ve süreç yetkili makamca onaylanıp **resmî parametre mührü** tanımlandı.
- [ ] **Bağımsız güvenlik testi** (sızma testi, kod incelemesi) yapıldı. Bu proje otomatik testlerle doğrulanmıştır; bağımsız bir güvenlik değerlendirmesinden geçmemiştir.
- [ ] HTTPS/TLS, ters vekil, güvenlik duvarı, yalnız kurum ağı/VPN erişimi.
- [ ] Anahtar yönetimi (HSM/kasa), yedek ve geri yükleme **tatbikatı**, baş özeti dışarıda mühürleme.
- [ ] Otorite özel anahtarı çevrimdışı/HSM'de, **yedekli**; birim imza anahtarları üretilip açık anahtarlar `register-unit` ile kaydedildi; birimler **düzenli aralıkla** (örn. haftalık) denetim paketi gönderiyor.
- [ ] En az **iki yönetici** hesabı (iki kişi kuralı) ve **iki aşamalı doğrulama zorunluluğu**.
- [ ] `ALLOW_DEMO` kapalı, deneme verisi yok, varsayılan/geçici parolalar değiştirilmiş.
- [ ] Personel eğitimi: rıza alma, gönüllülük görüşmesi, güvenlik/şikâyet prosedürü, adayın çekilme ve silme talebi.
