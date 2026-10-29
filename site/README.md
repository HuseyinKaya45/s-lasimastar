# Yayın sitesi (GitHub Pages)

`python3 site/build_site.py` → `_site/` üretir: bir açılış sayfası (portal) ve `programs.json`'daki her program.
Programlar telefonda "ana ekrana eklenebilir" ve ilk açılıştan sonra internetsiz çalışır (service worker).

## Yeni program eklemek
1. Programın tek dosyalık sürümü `<klasor>/index.html` olarak depoda bulunsun.
2. `site/programs.json` içindeki `programlar` listesine bir kayıt ekle (`id`, `klasor`, `ad`, `kisa`, `arapca`, `aciklama`, `renk`, `ikon`).
3. `node site/mkicons.mjs` ile simgeleri üret (`site/icons/` altına yazılır, depoya eklenir).
4. `main`'e gönder; yayın otomatik güncellenir.

Yalnızca `programs.json`'da listelenen programlar yayına girer; depodaki diğer klasörler siteye kopyalanmaz.

## Bir kerelik kurulum
GitHub'da: depo → Settings → Pages → Source: **GitHub Actions**. İlk yayından sonra adres:
`https://<kullanici>.github.io/<depo>/`
