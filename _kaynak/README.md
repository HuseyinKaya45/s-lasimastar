# Programların kaynak dosyaları

Her klasör, depodaki aynı adlı programın (`<klasör>/index.html`) parçalarıdır.
Programlar tek dosya olarak derlenir; burası düzenleme ve yeniden derleme içindir.

Derleme: `python3 _kaynak/build.py` (hepsi) veya `python3 _kaynak/build.py maksud-darphanesi`.
Sıra ve dosyalar build.py içindeki ORDER tablosundadır. Yazı tipleri `fonts.css`'ten,
ortak ses kodu `ses.js`'ten eklenir. `ses/<program>.json` ({metin: base64 mp3}) varsa
kayıtlı sesler programa gömülür.

`izhar-esrar`, `usul-lafizlar` ve `maksud-darphanesi` klasörlerinde shell.html, `mkshell.py`
ile izhar-esrar/shell.html temel alınarak üretilmiştir (pal.css + extra.css).

Yapılacak: Arapça seslendirmeyi cihazın metin okuma motoruna bırakmak yerine,
önceden üretilmiş ses kayıtlarını programlara gömmek (GOOGLE_TTS_API_KEY ile).
