# Arapça–İngilizce sürüm: toplu çeviri betiği

`_kaynak/ceviri_en.py`, el-Arabiyyetü beyne yedeyk programlarının (2., 3., 4. kitap; 65 ünite + sınav) Türkçe metinlerini
**Claude Sonnet 5.5** ile **Message Batches API** (%50 indirimli, asenkron) üzerinden İngilizceye çevirir.
Arapça metinler, sesler ve resimler aynen kalır; yalnızca Türkçe açıklama, yönerge, çeviri ve kelime anlamları çevrilir.
Arayüz düğmeleri `k2ortak/en_ui.json` ile zaten çevrilmiştir. Pilot: `k4u1` (elle yapıldı).

## Gereksinimler
- `pip install anthropic`
- `ANTHROPIC_API_KEY` ortam değişkeni (console.anthropic.com → API Keys). Çeviri **API kredisinden** düşer; claude.ai aboneliğinden değil.

## Adımlar
```bash
python3 _kaynak/ceviri_en.py hazirla                 # 1) metinleri çıkarır + maliyet tahmini (ücretsiz)
python3 _kaynak/ceviri_en.py gonder                  # 2) önizleme: hiçbir şey göndermez, ilk isteği durum/ornek_istek.json'a yazar
python3 _kaynak/ceviri_en.py gonder --evet           # 3) batch'i gönderir (ÜCRETLİ)
python3 _kaynak/ceviri_en.py durum                   # 4) çoğu 1 saatte, en geç 24 saatte biter
python3 _kaynak/ceviri_en.py indir                   # 5) sonuçları doğrular ve kaydeder
python3 _kaynak/ceviri_en.py gonder --evet --kucuk   # 6) (gerekirse) hatalı/eksik kalanları küçük parçalarla yeniden dene; sonra yine durum + indir
python3 _kaynak/ceviri_en.py yaz                     # 7) tamamlanan üniteler için <ünite>/veri.en.js, meta.en.json, ceviri.en.json
python3 _kaynak/ceviri_en.py derle                   # 8) en/<ünite>/index.html üretir (k2ortak/yap.py --en)
```
**Önce küçük deneme öneririm** (yaklaşık 5 sent): `hazirla --birim k4u2`, `gonder --evet`, `indir`, `yaz --birim k4u2`, `derle --birim k4u2`,
`en/k4u2/index.html`'i açıp gözden geçirin. Sonra `hazirla`yı seçeneksiz tekrar çalıştırıp hepsine geçin (hazırlanan ve çevrilen metinler korunur).
Aynı kitaptan seçmek için: `--kitap 4`.

## Betik ne yapıyor?
- Her `veri.js` ve `meta.json`daki Türkçe metinleri bulur; resim adları, ses anahtarları ve blok türleri gibi **kimlikleri çevirmez**.
- Aynı metni tek kez çevirir (tekrarlar tüm ünitelerde paylaşılır; pilot çevirileri baştan yüklenir).
- Metinleri ünite sırasıyla ~7.000 karakterlik istekler hâlinde paketler; sistem istemi (kurallar + `ceviri_en/sozluk.json` terim sözlüğü + pilottan örnekler) önbelleğe alınabilir.
- Yapılandırılmış çıktı (`output_config.format`, JSON şema) ve düşük efor; Sonnet 5.5'te `thinking: {"type": "between_tools"}` (çeviri için düşünme gerekmez). API bunu reddederse `gonder --adaptif`.
- **Her metni otomatik doğrular**; kuralları geçmeyen metin kabul edilmez, `durum/sorunlar.json`a gerekçesiyle yazılır ve yeniden denenir:
  Arapça kısımlar harfi harfine aynı mı · `[[ ]]` ve `___` sayısı · kaynaktaki rakamlar çıktıda var mı · çıktıda Türkçe harf (ç ğ ı ş İ) kalmış mı · uzunluk makul mü · reddedilmiş / hatalı / eksik istek.
- `yaz` JavaScript sözdizimini `node --check` ile denetler; eksik çevirisi olan üniteyi yazmaz.

## Sizin gözden geçirmeniz gerekenler
Betik biçimi doğrular, **anlam kalitesini** doğrulayamaz. Terim sözlüğünü (`ceviri_en/sozluk.json`) göndermeden önce gözden geçirip
düzeltin; çeviri bittikten sonra birkaç üniteyi (özellikle dilbilgisi ve siyer metinlerini) örnekleyerek okuyun. Sözlüğü değiştirince
yalnızca henüz çevrilmeyen metinler etkilenir; bitenleri yeniden çevirmek için `durum/sonuc.json`dan silin ya da `durum/` klasörünü silip baştan başlayın.

## Maliyet
`hazirla` çıktısı tahmin verir (Sonnet 5.5 Batch: giriş 1 $/M, çıkış 5 $/M token). Tüm kitaplar için ≈ **2–4 dolar**, yeniden denemelerle birlikte ≈ 3–5 dolar.
Reddedilen (refusal) metinler normal yoldan çevrilemezse `gonder --evet --kucuk --model claude-opus-5-5` ile Opus 5.5'e verilebilir.

## Dosyalar
`ceviri_en/sozluk.json` (terim sözlüğü, elle düzenlenir) · `ceviri_en/durum/` (çalışma durumu; git'e girmez): `ogeler.json`, `sonuc.json`, `sorunlar.json`, `batches.json`, `ornek_istek.json`.
