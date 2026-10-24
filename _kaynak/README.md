# Programların kaynak dosyaları

Her klasör, depodaki aynı adlı programın (`<klasör>/index.html`) parçalarıdır.
Programlar tek dosya olarak derlenir; burası düzenleme ve yeniden derleme içindir.

- `avamil-birgivi`: shell.html + data1.js + data2.js + app.js
- `avamil-curcani`: shell.html + data.js + app.js
- `emsile-tezgahi`: shell.html + engine.js + app.js
  (shell'in arkasına `<script>` içinde js dosyaları sırayla eklenir)
- `bina-ef-al`, `izhar-esrar`, `usul-lafizlar`, `maksud-darphanesi`: `build.sh`
  shell.html içindeki `/*__FONTS__*/` yerine `../fonts.css` (gömülü yazı tipleri) konur,
  js dosyaları sırayla eklenir. build.sh içindeki dizin yollarını yeni ortama göre düzeltin.
- `izhar-esrar`, `usul-lafizlar`, `maksud-darphanesi`: shell.html, `mkshell.py` ile
  izhar-esrar/shell.html temel alınarak üretilir (pal.css + extra.css).

Yapılacak: Arapça seslendirmeyi cihazın metin okuma motoruna bırakmak yerine,
önceden üretilmiş ses kayıtlarını programlara gömmek (GOOGLE_TTS_API_KEY ile).
