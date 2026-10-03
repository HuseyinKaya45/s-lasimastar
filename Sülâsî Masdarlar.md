# Sülâsî Masdarlar

Ezberleme: Türkçede zaten bildiğin kelimeleri çapa yap.
## Uygulama: Sülâsî Mezîd Atölyesi

`uygulama/index.html` dosyasını tarayıcıda aç. Bir harf ilâveli İf'âl, Tef'îl ve Mufâale
ile iki harf ilâveli İnfi'âl ve İfti'âl bablarını
Türkçe çapa kelimeler, Emsile satırı, kalıp makinesi (14 sîga çekim), fevâid,
Kur'an örnekleri, sınav ve dört oyunla (Kalıp Avcısı, Hafıza Kartları,
Kalıp Ustası, Bab Kovaları) öğretir. Oyunlar ve sınav rütbe puanı kazandırır.

## Uygulama: Tefa''ul'den İstif'âl'e

`uygulama/dort-bab.html` dosyasını tarayıcıda aç. Tefa''ul, Tefâ'ul, İf'ilâl ve
İstif'âl bablarını aynı yapıyla (çapalar, Emsile, kalıp makinesi, sınav, oyunlar) öğretir.

İki program tek kaynaktan üretilir: `uygulama/sayfa.html` düzenlenir, sonra
`python3 uygulama/yap.py` çalıştırılır.

## Uygulama: Arapçada Cümle Yapıları

`cumle/index.html` dosyasını tarayıcıda aç. Kitaptaki dört dersi (الجملة المفيدة،
المبتدأ والخبر، الفاعل وتأنيث الفعل، المفعول به) kaide, örnek, görsel, etkileşimli
alıştırma ve oyunlarla öğretir. Düzenleme için `cumle/kaynak.html`, `cumle/veri.js`
ve `cumle/oyunlar.js` değiştirilir, sonra `python3 cumle/yap.py` çalıştırılır.

## Uygulama: Kelime ve İsim Bilgisi (quiz hazırlığı)

`kelime/index.html` dosyasını tarayıcıda aç. Kitaptaki dört dersi (أقسام الكلمة،
المذكر والمؤنث، المفرد والمثنى والجمع، النكرة والمعرفة) tek sayfalık özet,
hatırlatma kartları, kontrol listesi, bütün alıştırmalar, beş oyun ve 20 soruluk
quiz provasıyla çalıştırır. Düzenleme: `kelime/veri.js`, `kelime/kaynak.html`,
`kelime/oyunlar.js`, `kelime/ortak.css`; sonra `python3 kelime/yap.py`.

## Uygulama: İsimlerin İ'rabı

`irab/index.html` dosyasını tarayıcıda aç. Kitaptaki iki dersi dört konu olarak
(müsennâ, cem-i müzekker sâlim, cem-i müennes sâlim, cem-i teksîr) i'rab tablosu,
örnekler, kaide, bütün alıştırmalar, iki okuma parçası (bulma ve i'rab), beş oyun
(Ek Avcısı, Hal Yarışı, İ'rab Dedektifi, Tür Makinesi, Hafıza Kartları) ve 20 soruluk
quiz provasıyla öğretir. Düzenleme: `irab/veri.js`, `irab/kaynak.html`, `irab/oyunlar.js`,
`irab/ortak.css`, `irab/ozel.css`; sonra `python3 irab/yap.py`.

## Uygulama: İzafet ve İ'rabı

`izafet/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi dört konu olarak
(izafet terkibi, muzâfın i'rabı, müsennâ ve cem muzâf olunca nunun düşmesi, okuma parçası)
kaide, örnek, görsel, dokuz alıştırma, beş oyun (Doğru Şekil, Hal Yarışı, Doğru mu Yanlış mı?,
İzafet Kur, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `izafet/veri.js`,
`izafet/kaynak.html`, `izafet/oyunlar.js`, `izafet/ortak.css`, `izafet/ozel.css`; sonra `python3 izafet/yap.py`.

## Uygulama: Sıfat Tamlaması

`sifat/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi dört konu olarak (sıfat ve mevsûf,
cinsiyet ve sayı uyumu, akılsız çoğulun sıfatı, iki okuma parçası) kaide, örnek, görsel, bütün
alıştırmalar, beş oyun (Doğru Sıfat, Hal Yarışı, Uyum Kontrolü, Akıllı mı Akılsız mı?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `sifat/veri.js`, `sifat/kaynak.html`,
`sifat/oyunlar.js`, `sifat/ortak.css`, `sifat/ozel.css`; sonra `python3 sifat/yap.py`.

## Uygulama: Muzâri Fiilin Nasbı

`nasb/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (أَنْ ve لَنْ, amaç
edatları, fâ-i sebebiyye, Kur'an'da nasb, okuma) nasb makinesi, kaide, örnek, bütün alıştırmalar,
beş oyun (Doğru Hareke, Merfû mu Mansûb mu?, Edat Avcısı, Fâ Testi, Hafıza Kartları) ve 20 soruluk
quiz provasıyla öğretir. Düzenleme: `nasb/veri.js`, `nasb/kaynak.html`, `nasb/oyunlar.js`,
`nasb/ortak.css`, `nasb/ozel.css`; sonra `python3 nasb/yap.py`.

## Uygulama: Muzâri Fiilin Cezmi

`cezm/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (cezm edatları, لَمْ ve لَنْ,
lâ-i nâhiye ve lâm-ı emr, nasb mı cezm mi, Kur'an ve okuma) i'rab makinesi, kaide, örnek, bütün
alıştırmalar, beş oyun (Doğru Son, Üç Hal Yarışı, Edat Dedektifi, لَمْ mi لَنْ mi?, Hafıza Kartları)
ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `cezm/veri.js`, `cezm/kaynak.html`, `cezm/oyunlar.js`,
`cezm/ortak.css`, `cezm/ozel.css`; sonra `python3 cezm/yap.py`.

## Uygulama: Zamirler

`zamir/index.html` dosyasını tarayıcıda aç. Kitaptaki üç dersi dört konu olarak (munfasıl zamirler,
isme bitişik zamirler, fiile bitişik nasb zamirleri, iki hadis ve Âl-i Yâsir okuması) zamir makinesi,
kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Zamir, Ek Dönüştürücü, Kim O?, Zamir Nerede?,
Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `zamir/veri.js`, `zamir/kaynak.html`,
`zamir/oyunlar.js`, `zamir/ortak.css`, `zamir/ozel.css`; sonra `python3 zamir/yap.py`.

## Uygulama: Fiile Bitişen Merfû Zamirler

`refzamir/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi dört konu olarak (altı ref zamiri,
mâzi çekimi, muzâri çekimi, kudsî hadis okuması) çekim makinesi, kaide, örnek, bütün alıştırmalar,
beş oyun (Doğru Çekim, Çekim Ustası, Hangi Zamir?, Kim Yaptı?, Hafıza Kartları) ve 20 soruluk quiz
provasıyla öğretir. Düzenleme: `refzamir/veri.js`, `refzamir/kaynak.html`, `refzamir/oyunlar.js`,
`refzamir/ortak.css`, `refzamir/ozel.css`; sonra `python3 refzamir/yap.py`.

## Uygulama: Fiil Çeşitleri

`fiil/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (mâzi, muzâri, emir,
üç fiili ayırt etme, okuma) üç zaman makinesi, kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Fiil,
Emir Ustası, Hangi Zaman?, Ayn Harekesi, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Düzenleme: `fiil/veri.js`, `fiil/kaynak.html`, `fiil/oyunlar.js`, `fiil/ortak.css`, `fiil/ozel.css`;
sonra `python3 fiil/yap.py`.

## Uygulama: İsm-i Fâil ve İsm-i Mef'ûl

`failmef/index.html` dosyasını tarayıcıda aç. Kitaptaki iki dersi beş konu olarak (sülâsî ve gayr-i
sülâsîden ism-i fâil, sülâsî ve gayr-i sülâsîden ism-i mef'ûl, okuma) kalıp makinesi, tasrif, kaide,
örnek, bütün alıştırmalar, beş oyun (Doğru Kalıp, Kalıp Ustası, Fâil mi Mef'ûl mü?, Sülâsî mi?,
Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `failmef/veri.js`,
`failmef/kaynak.html`, `failmef/oyunlar.js`, `failmef/ortak.css`, `failmef/ozel.css`; sonra
`python3 failmef/yap.py`.

## Uygulama: Mübalağa Sîgası

`mubalaga/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi dört konu olarak (anlam, beş vezin,
âyet ve cümlelerde bulma, sabır metni) vezin makinesi, kaide, örnek, bütün alıştırmalar, beş oyun
(Doğru Sîga, Vezin Ustası, Hangi Vezin?, Fâil mi Mübalağa mı?, Hafıza Kartları) ve 20 soruluk quiz
provasıyla öğretir. Düzenleme: `mubalaga/veri.js`, `mubalaga/kaynak.html`, `mubalaga/oyunlar.js`,
`mubalaga/ortak.css`, `mubalaga/ozel.css`; sonra `python3 mubalaga/yap.py`.

## Uygulama: Sıfat-ı Müşebbehe

`sifatmus/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi dört konu olarak (anlam, أَفْعَلُ ve
فَعْلَانُ, diğer vezinler, dost metni) sıfat makinesi, tasrif, kaide, örnek, bütün alıştırmalar, beş oyun
(Doğru Sıfat, Müennes Ustası, Hangi Vezin?, Sıfat mı Fâil mi?, Hafıza Kartları) ve 20 soruluk quiz
provasıyla öğretir. Düzenleme: `sifatmus/veri.js`, `sifatmus/kaynak.html`, `sifatmus/oyunlar.js`,
`sifatmus/ortak.css`, `sifatmus/ozel.css`; sonra `python3 sifatmus/yap.py`.

## Uygulama: Sülâsî Masdarlar

`masdar/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (masdar nedir, on sekiz
vezin, masdar bulma, cümlede ve âyette masdar, okuma) Türkçe çapa kelimeler, harf harf eşleştiren
masdar makinesi, kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Masdar, Masdar Ustası, Masdar mı
Fiil mi?, İlk Hareke, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme:
`masdar/veri.js`, `masdar/kaynak.html`, `masdar/oyunlar.js`, `masdar/ortak.css`, `masdar/ozel.css`;
sonra `python3 masdar/yap.py`.

## Uygulama: Sâlim Fiil ve Çekimi

`salim/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi dört konu olarak (sâlim fiil ve ref
zamirleri, mâzi çekimi, muzâri çekimi, okuma) çekim makinesi, iki etkileşimli çekim tablosu, kaide,
örnek, bütün alıştırmalar, beş oyun (Doğru Çekim, Çekim Ustası, Sâlim mi?, Hangi Zamir?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `salim/veri.js`, `salim/kaynak.html`,
`salim/oyunlar.js`, `salim/ortak.css`, `salim/ozel.css`; sonra `python3 salim/yap.py`.
