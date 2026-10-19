# Görev: «قصص النبيين للأطفال» (Nedvî) sayfalarını yazıya geçir ve kelime hazinesini çıkar

Sayfa resimleri: /tmp/claude-0/-home-user-s-lasimastar/ba2fab7f-83d2-538f-81ca-57b6409a6b5e/scratchpad/kisas/p/pNN.png (NN = PDF sayfa no, iki hane; PDF sayfa no = kitabın basılı sayfa no'su).
Resimler 131 dpi siyah-beyaz; okumak için PIL ile 2 kat büyütüp yarım sayfalık parçalara bölerek Read ile bak (kendi kırpmalarını `kirp/<önek>_...` altına koy). Harekeyi kitaptaki gibi, eksiksiz yaz; emin olmadığını not et.

Bu bir çocuk kitabı: Hz. İbrahim kıssası («هل كسر الأصنام؟», s. 9–26) ve Hz. Yusuf kıssası («أحسن القصص», s. 27–61). Öğrenciler (Türk) bu metinle Arapça öğreniyor.

## 1) Metin: `metin/sNN.json` (her sayfa ayrı), JSON dizisi, kitaptaki sırayla:
- Bölüm başlığı (çerçeveli başlık, ör. «٢ - وَلَدُ آزَرَ»): `{"tip":"baslik","no":2,"ar":"وَلَدُ آزَرَ","tr":"Âzer'in Oğlu"}`
- Kıssanın büyük başlığı (ör. «هل كسر الأصنام؟», «أحسن القصص»): `{"tip":"kitap","ar":"...","tr":"..."}`
- Her metin satırı/cümlesi: `{"tip":"satir","ar":"وَكَانَ آزَرُ لَهُ وَلَدٌ رَشِيدٌ، رَشِيدٌ جِدًّا.","tr":"Âzer'in akıllı, çok akıllı bir oğlu vardı."}` — kitapta bir satıra sığmayıp alt satıra taşan cümleyi tek kayıt yap; kitapta ayrı satır olan kısa cümleleri ayrı kayıt yap. Ayetleri ﴿ ﴾ içinde yaz. Dipnotları `{"tip":"dipnot","ar":..,"tr":..}` olarak ekle. Sayfa numarası, süs, "www..." yazısı alma.
- Önceki sayfadan devam eden yarım cümle varsa: `{"tip":"satir","devam":true,...}` (bir önceki sayfanın son kaydına eklenecek); sayfanın son cümlesi yarımsa olduğu gibi yaz.
- `tr`: doğal, sade Türkçe çeviri (öğrenciye yardım için; anlamı tam versin).

## 2) Kelime hazinesi: `kelime/<önek>.json` — senin sayfa aralığın için TEK dosya, JSON dizisi.
Metindeki anlamlı HER kelimeyi ve deyimi al (isim, fiil, sıfat, zarf, önemli edat/bağlaç; ayrıca deyim/kalıp ifadeler: «ذات يوم», «قال في نفسه», «لا تضر ولا تنفع», «ضاق صدره» gibi). Çok basit tekrarları bile atlama ama aralığın içinde aynı kelimeyi bir kez yaz (ilk geçtiği yerle). Özel isimleri (إبراهيم، آزر، يوسف، مصر…) `tur:"özel isim"` ile ekle.
Her kayıt:
```json
{"ar":"رَشِيدٌ", "asil":"رَشِيد", "tur":"sıfat", "kok":"ر ش د", "cogul":"رُشَداء", "fiil":null,
 "tr":"akıllı, aklı başında, doğru yolda olan",
 "cumle":"وَكَانَ آزَرُ لَهُ وَلَدٌ رَشِيدٌ، رَشِيدٌ جِدًّا.", "cumle_tr":"Âzer'in akıllı, çok akıllı bir oğlu vardı.",
 "ornek":"كَانَ الطَّالِبُ رَشِيدًا فِي أَعْمَالِهِ.", "ornek_tr":"Öğrenci işlerinde akıllıca davranırdı.",
 "sayfa":10, "bolum":"وَلَدُ آزَرَ"}
```
- `ar`: metinde geçtiği biçim (harekeli). `asil`: sözlük biçimi (isim/sıfat: tekil yalın; fiil: mâzî 3. tekil eril, ör. «سَجَدَ»). `tur`: isim / fiil / sıfat / zarf / edat / bağlaç / zamir / özel isim / deyim.
- Fiillerde `fiil`: `{"mazi":"سَجَدَ","muzari":"يَسْجُدُ","masdar":"سُجُود"}`; isimde varsa `cogul` (yoksa null). `kok`: üç (dört) harfli kök, harfler boşlukla.
- `cumle`: kelimenin geçtiği metin cümlesi BİREBİR (metin/sNN.json'daki `ar` ile aynı ya da onun bir parçası); `ar` bu cümlenin içinde aynen geçmeli. `cumle_tr`: o cümlenin Türkçesi.
- `ornek`/`ornek_tr`: senin yazdığın kısa, basit, harekeli YENİ bir örnek cümle (metinden farklı) ve Türkçesi.
- Deyimlerde `tur:"deyim"`, `asil` = deyimin kalıp hâli, `tr` = anlamı.

Bitirince her JSON'u `python3 -c "import json;json.load(open(...))"` ile doğrula; kelime dosyasında her kaydın `ar`'ı `cumle` içinde geçiyor mu, kontrol et. Son mesajın kısa olsun: dosyalar, satır ve kelime sayıları, emin olmadığın yerler.
