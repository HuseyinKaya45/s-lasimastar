# Çeviri kaynakları

Arapça–Türkçe PDF'ler bu klasördeki verilerden üretilir. Her alt klasör bir PDF'e aittir
(`dosya.txt` hangi PDF olduğunu söyler).

- `data*.py` — çeviriler. Her satır: `t(sayfa, konum, """metin""")` gönderi metni,
  `h(sayfa, konum, "metin")` görsel kartın başlığı.
- `cols.json`, `tx.json`, `rects.json` — sayfadaki sütun ve görsel konumları.
- `araclar/build5.py` — PDF'i üretir (özgün PDF + 240 dpi sayfa görüntüleri gerekir).

Bir çeviriyi düzeltmek için ilgili `data*.py` dosyasındaki metni değiştirip PDF yeniden üretilir.
