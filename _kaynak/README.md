# Programların kaynak dosyaları

Her klasör, depodaki aynı adlı programın (`<klasör>/index.html`) parçalarıdır.
Programlar tek dosya olarak derlenir; burası düzenleme ve yeniden derleme içindir.

Derleme: `python3 _kaynak/build.py` (hepsi) veya `python3 _kaynak/build.py maksud-darphanesi`.
Sıra ve dosyalar build.py içindeki ORDER tablosundadır. Yazı tipleri `fonts.css`'ten,
ortak ses kodu `ses.js`'ten eklenir. `ses/<program>.json` ({metin: base64 mp3}) varsa
kayıtlı sesler programa gömülür.

`izhar-esrar`, `usul-lafizlar` ve `maksud-darphanesi` klasörlerinde shell.html, `mkshell.py`
ile izhar-esrar/shell.html temel alınarak üretilmiştir (pal.css + extra.css).

## Gömülü Arapça ses

1. `node _kaynak/ses_topla.mjs [program ...]` — programları tarayıcıda gezip seslendirilen
   metinleri `ses/<program>.txt` dosyasına toplar (her çalıştırma öncekilerle birleşir; süre `SURE=saniye`).
2. `GOOGLE_TTS_API_KEY=... python3 _kaynak/ses_uret.py [program ...]` — eksik metinleri Google
   Text-to-Speech ile seslendirip `ses/<program>.json` dosyasına ekler (ses: `SES_VOICE`, hız: `SES_HIZ`).
   Google projesinde faturalandırma açık olmalıdır.
3. `python3 _kaynak/build.py` — kayıtları programlara gömer.

Kayıt yalnızca toplanan metinler içindir; programın anlık ürettiği (ör. kullanıcının seçtiği
kökle çekim) metinlerde cihazdaki Arapça sese dönülür, o da yoksa uyarı verilir.
