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

## Uygulama: Emir ve Nehiy

`emir/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (emr-i hâzır,
emr-i gâib, nehy-i hâzır, nehy-i gâib; âyet, hadis ve Osman Gazi okuması) emir-nehiy makinesi (dört tablo, sağdan sola),
kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Emir, Emir Ustası, Hangi Tür?, Hangi Zamir?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `emir/veri.js`, `emir/kaynak.html`,
`emir/oyunlar.js`, `emir/ortak.css`, `emir/ozel.css`; sonra `python3 emir/yap.py`.

## Uygulama: Sahih ve Mu’tel Fiil

`sahih/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (sahih ve mu’tel, sahihin
kısımları, mu’telin kısımları, yedi türü ayırt etme, "Cimri ve Ahmak Hizmetçi" okuması) fiil ağacı,
kök makinesi (kök harfleri ve adım adım karar), kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Fiil,
Kök Avcısı, Sahih mi Mu’tel mi?, Yedi Tür, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Düzenleme: `sahih/veri.js`, `sahih/kaynak.html`, `sahih/oyunlar.js`, `sahih/ortak.css`, `sahih/ozel.css`;
sonra `python3 sahih/yap.py`.

## Uygulama: Harf-i Cerler

`harfcer/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (harf-i cer ve mecrûr isim,
anlamlar, soruya harf-i cerle cevap, son hareke ve sebebi, metinde harf-i cer) on harf-i cer tablosu,
harf-i cer makinesi (harf + isim → mecrûr şekil, ال'den önce مِنَ / عَنِ / لِلْـ), kaide, örnek, bütün
alıştırmalar, beş oyun (Doğru Harf, Son Hareke, Harf mi?, Hal Yarışı, Hafıza Kartları) ve 20 soruluk quiz
provasıyla öğretir. Düzenleme: `harfcer/veri.js`, `harfcer/kaynak.html`, `harfcer/oyunlar.js`,
`harfcer/ortak.css`, `harfcer/ozel.css`; sonra `python3 harfcer/yap.py`.

## Uygulama: Ebvâb-ı Sitte

`ebvab/index.html` dosyasını tarayıcıda aç. Sülâsî mücerredin altı bâbını beş konu olarak (bâb ve ayn harekesi,
üstünlü mâzi: Nasara-Daraba-Fetaha, esreli ve ötreli mâzi: Alime-Hasune-Hasibe, bâbdan muzâri ve emir yapma,
âyetlerde ve metinde altı bâb) altı kapı görseli, hareke haritası (dokuz ihtimal, altı bâb), bâb bulma yolu,
bâb makinesi (86 fiil, mâzi-muzâri-emir), kaide, örnek, alıştırmalar, beş oyun (Muzâri Avcısı, Emir Ustası,
Hangi Bâb?, Ayn Harekesi, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `ebvab/veri.js`,
`ebvab/kaynak.html`, `ebvab/oyunlar.js`, `ebvab/ortak.css`, `ebvab/ozel.css`; sonra `python3 ebvab/yap.py`.

## Uygulama: İstifham Edatları

`istifham/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (hemze ve hel, olumsuz soru:
belâ ve ne'am, soru isimleri, soru sor-cevap ver, Ebu'd-Derdâ okuması ile âyet-hadisler ve serbest okuma)
soru edatları ağacı, cevap edatı tablosu, soru makinesi, kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Edat,
Soru Kur, Ne Soruyor?, Ne'am mı Belâ mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme:
`istifham/veri.js`, `istifham/kaynak.html`, `istifham/oyunlar.js`, `istifham/ortak.css`, `istifham/ozel.css`;
sonra `python3 istifham/yap.py`.

## Uygulama: İsm-i İşaret

`isaret/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (yakın ve uzak işaret isimleri,
uygun işaret ismi ve akılsız çoğul, işaret isminin i'rabı ve bedel, cümleyi dönüştürme, "Beyaz Öküz" okuması)
yakın-uzak tabloları, işaret makinesi (yakın/uzak, isim, hal), kaide, örnek, bütün alıştırmalar, beş oyun
(Doğru İşaret, Uzağa Taşı, Yakın İşaret, Uzak İşaret, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Düzenleme: `isaret/veri.js`, `isaret/kaynak.html`, `isaret/oyunlar.js`, `isaret/ortak.css`, `isaret/ozel.css`;
sonra `python3 isaret/yap.py`.

## Uygulama: İsm-i Mevsul

`mevsul/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (ism-i mevsul ve sıla, mevsul-isim-fiil
uyumu, sıla cümlesi ve âid, müşterek mevsul: مَنْ ve مَا, "Çocuk Eğitiminde Evin Rolü" okuması) mevsul tablosu,
isim-mevsul-sıla zinciri, mevsul makinesi, kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Mevsul, Cümle
Birleştir, Hangi Mevsul?, Men mi Mâ mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme:
`mevsul/veri.js`, `mevsul/kaynak.html`, `mevsul/oyunlar.js`, `mevsul/ortak.css`, `mevsul/ozel.css`; sonra
`python3 mevsul/yap.py`.

## Uygulama: Ef'âl-i Hamse

`hamse/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (ef'âl-i hamse nedir, müsennâ ve cemi
yapma, cümlede ef'âl-i hamse, i'rab: nûnun kalması ve düşmesi, "Bir Babanın Vasiyeti" okuması) beş kalıp tablosu,
nûn makinesi (fiil, şahıs; merfû/mansûb/meczûm), kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Fiil, Nûn Avı,
Ef'âl-i Hamse mi?, Hal Yarışı, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `hamse/veri.js`,
`hamse/kaynak.html`, `hamse/oyunlar.js`, `hamse/ortak.css`, `hamse/ozel.css`; sonra `python3 hamse/yap.py`.

## Uygulama: İsm-i Zaman, İsm-i Mekân ve Mim’li Masdar

`zaman/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (üç isim tek kalıp, مَفْعَل vezni ve
tasrif, مَفْعِل vezni ve mezîd fiil, âyet ve cümlelerde, "Hocamla Randevu" okuması) üç anlam kartları, vezin ağacı,
vezin makinesi (31 fiil: mâzi → muzâri → vezin → isim), kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Kalıp,
Vezin Avı, Zaman mı Mekân mı?, Vezin Yarışı, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. İki anlama
gelebilen kelimelerde (مَخْرَجًا، المَصِيرُ، مَوْعِدٍ…) iki cevap da kabul edilir. Düzenleme: `zaman/veri.js`,
`zaman/kaynak.html`, `zaman/oyunlar.js`, `zaman/ortak.css`, `zaman/ozel.css`; sonra `python3 zaman/yap.py`.

## Uygulama: Masdar-ı Merre, Masdar-ı Hey’e ve Masdar-ı Sınâî

`merre/index.html` dosyasını tarayıcıda aç. Kitaptaki iki dersi beş konu olarak (masdar-ı merre, masdar-ı hey’e,
merre mi hey’e mi, masdar-ı sınâî, "Kâbe Ziyareti" okuması) üç masdar kartı, kalıp kartları, masdar makinesi
(asıl masdar, merre, hey’e yan yana), -iyye makinesi, kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Masdar,
Hareke Avı, Hangi Masdar?, Sınâî mi Nisbe mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme:
`merre/veri.js`, `merre/kaynak.html`, `merre/oyunlar.js`, `merre/ortak.css`, `merre/ozel.css`; sonra
`python3 merre/yap.py`.

## Uygulama: İsm-i Âlet, İsm-i Tasğir ve İsm-i Mensûb

`alet/index.html` dosyasını tarayıcıda aç. Kitaptaki üç dersi beş konu olarak (ism-i âlet, ism-i tasğir, ism-i mensûb,
cümlede ism-i mensûb, okumalar: Marangozluk, Zeyd b. Sâbit, el-Cûd) üç isim kartı, kalıp kartları, âlet / tasğir /
nisbe makineleri, kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Kelime, Türet!, Hangi İsim?, Âlet Vezni,
Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Düzenleme: `alet/veri.js`, `alet/kaynak.html`,
`alet/oyunlar.js`, `alet/ortak.css`, `alet/ozel.css`; sonra `python3 alet/yap.py`.

## Uygulama: İsm-i Tafdîl

`tafdil/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (tafdîl nedir, dört kullanım ve uyum,
yardımcı tafdîl ve tasrif, âyet-hadis ve cümleler, "Yaz Tatili" okuması) uyum tablosu (SABİT · SABİT · İKİ YOL ·
UYUM ŞART), tafdîl makinesi (sıfat, kullanım, cinsiyet → cümle), kaide, örnek, bütün alıştırmalar, beş oyun
(Doğru Biçim, Tafdîl Yap, Hangi Kullanım?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla
öğretir. Düzenleme: `tafdil/veri.js`, `tafdil/kaynak.html`, `tafdil/oyunlar.js`, `tafdil/ortak.css`,
`tafdil/ozel.css`; sonra `python3 tafdil/yap.py`.

## Uygulama: İ’râb Nasıl Yapılır?

`irabnasil/index.html` dosyasını tarayıcıda aç. İ’rabı dört adımlı bir merdivenle (1. görevi, 2. hükmü, 3. alâmeti,
4. yeri / sebebi) beş konuda öğretir: dört adım ve isim cümlesi, fiil cümlesi, harf-i cer · izafet · sıfat, harekesiz
alâmetler (müsennâ, cemiler, ef’âl-i hamse, cezm), bir metnin kelime kelime i’rabı. İki yeni etkinlik türü vardır:
"Sırala" (i’rab parçalarını doğru sırayla dizme; yanlış sırada program hangi adımın gerektiğini söyler) ve "Harf harf
yaz" (terimleri harf düğmeleriyle yazma; أ/ا، ة/ه، ض/ظ gibi karışan harflerde uyarır). İ’rab makinesi, terim sözlüğü,
beş oyun (Eksik Parça, Doğru Yazım, Görevi Ne?, Alâmeti Ne?, Hafıza Kartları) ve 20 soruluk quiz provası da vardır.
Cümleler ve terimler `irabnasil/veri.js` içindeki `SENT` ve `SPELL` listelerindedir; sonra `python3 irabnasil/yap.py`.

## Uygulama: Nâkıs Fiil ve Çekimi

`nakis/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (nâkıs fiil ve bâbları, mâzinin çekimi,
muzârinin çekimi, emir ve mezîd nâkıs, "Abdullah b. Mes’ûd" okuması) bâb kartları, çekim makinesi (32 fiil × mâzi /
muzâri / emir, 14 şahıs tablosu), mezîd nâkıs tablosu, kaide, örnek, bütün alıştırmalar, yeni "Tablo doldur"
etkinliği (biçimleri seçip çekim tablosuna yerleştirme), beş oyun (Doğru Çekim, Zamir Avı, Hangi Bâb?, Vâv mı Yâ mı?,
Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Fiiller ve çekim motoru `nakis/veri.js` içindedir; sonra
`python3 nakis/yap.py`.

## Uygulama: Lefîf Fiil ve Çekimi

`lefif/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (lefîf fiil ve türleri, mâzinin çekimi,
muzârinin çekimi, emir ve mezîd lefîf, "İnnemâ’l-a’mâlü bi’n-niyyât" okuması) kök kartları (mekrûn: ن و ي, mefrûk:
و ق ي), bâb kartları, çekim makinesi (25 fiil × mâzi / muzâri / emir), mezîd lefîf tablosu, kaide, örnek, bütün
alıştırmalar, "Tablo doldur" etkinliği, beş oyun (Doğru Çekim, Zamir Avı, Mekrûn mu Mefrûk mu?, Hangi Tür?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla öğretir. Fiiller ve çekim motoru `lefif/veri.js` içindedir; sonra
`python3 lefif/yap.py`.

## Uygulama: Rubâî Mücerred Fiil ve Mezîdi

`rubai/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (rubâî mücerred, mücerredin çekimi,
rubâî mezîd ve vezinleri, mezîdin çekimi, âyetlerde rubâî fiil) harf kutuları (asıl ve ziyade harfler renkli), vezin
kartları (فَعْلَلَ، تَفَعْلَلَ، اِفْعَنْلَلَ، اِفْعَلَلَّ), kitaptaki çekim tablosu, çekim makinesi (24 fiil × mâzi / muzâri
/ emir; اِفْعَلَلَّ'de şeddenin çözülmesi dahil), kaide, örnek, bütün alıştırmalar, "Tablo doldur" etkinliği, beş oyun
(Doğru Çekim, Zamir Avı, Hangi Vezin?, Rubâî mi Sülâsî mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Fiiller ve çekim motoru `rubai/veri.js` içindedir; sonra `python3 rubai/yap.py`.

## Uygulama: Meçhul Fiil ve Nâibu’l-Fâil

`mechul/index.html` dosyasını tarayıcıda aç. Kitaptaki üç dersi (mâzi fiilin meçhulü, muzâri fiilin meçhulü,
nâibu’l-fâil) beş konu olarak (mâzinin meçhulü, muzârinin meçhulü, nâibu’l-fâil, âyet ve hadislerde meçhul, üç
okuma: Kerâhiyetü’l-harb, el-Mücâhid fî sebîlillâh, Feth-i İstanbul) "dört adımda meçhul cümle" şeması, beş kural
kartı (sahih, elif → vâv, orta harf illetli, son harf illetli, şeddeli), meçhul makinesi (23 fiil; değişen harfler
renkli), kaide, örnek, üç dersin bütün alıştırmaları, beş oyun (Meçhulünü Bul, Malûmunu Bul, Malûm mu Meçhul mü?,
Hangi Kural?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `mechul/veri.js` içindedir; sonra
`python3 mechul/yap.py`.

## Uygulama: Ecvef Fiil ve Çekimi

`ecvef/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (ecvef fiil ve bâbları, mâzinin çekimi,
muzârinin çekimi, emir ve mezîd ecvef, okumalar: "Ziyâretü’l-arâzi’l-mukaddese" ve "Eyne’l-hakîbe?") kök kartları
(vâvî ق و ل, yâî ب ي ع), bâb kartları, çekim makinesi (27 fiil × mâzi / muzâri / emir), mezîd ecvef tablosu, kaide,
örnek, bütün alıştırmalar ve boş tablolar (26 çekim tablosu "Tablo doldur" etkinliği olarak), beş oyun (Doğru Çekim,
Zamir Avı, Hangi Bâb?, Vâv mı Yâ mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `ecvef/veri.js`
içindedir; sonra `python3 ecvef/yap.py`.

## Uygulama: Sayıların Temyizi

`temyiz/index.html` dosyasını tarayıcıda aç. Kitaptaki dersi beş konu olarak (1–10, 11–19, onlar-yüz-bin, sayıları
okuma ve kullanma, okumalar: Ziyâd ve Üsâme, Hz. Ali) yedi grup kartı, tek bakışta kural tablosu (sayının cinsiyeti ·
temyizin sayısı · i’rabı), sayı makinesi (6 isim × 1–99 ve hazır sayılar 100…10000; doğru ifade, grup ve kural),
kaide, örnek, bütün alıştırmalar, beş oyun (Doğru Sayı, Doğru Temyiz, Uyumlu mu Zıt mı?, Temyiz Nasıl?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla öğretir. Sayı motoru `temyiz/veri.js` içindeki `SAY()` işlevidir; sonra
`python3 temyiz/yap.py`.

## Uygulama: Muzâaf Fiil ve Çekimi

`muzaaf/index.html` (yayın sürümü `muzaaf/sayfa.html`) muzâaf fiili beş konuda (muzâaf fiil ve bâbları, mâzinin
çekimi, muzârinin çekimi, emir ve mezîd muzâaf, okumalar: Hudeybiye barışı, ahmak avcı) kök kartı (م د د / şedde ≠
muzâaf), idğam–fekk kuralı, bâb kartları (مَدَّ يَمُدُّ، فَرَّ يَفِرُّ، وَدَّ يَوَدُّ), 30 fiillik çekim makinesi (değişen
kısım renkli, altında kural), mezîd muzâaf tablosu, kaide, örnek, kitaptaki bütün alıştırmalar, beş oyun (Doğru Çekim,
Zamir Avı, Hangi Bâb?, İdğam mı Fekk mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Çekim motoru
`muzaaf/veri.js` içindeki `SB()` / `NV()` işlevleridir; sonra `python3 muzaaf/yap.py`.

## Uygulama: Misâl Fiil ve Çekimi

`misal/index.html` (yayın sürümü `misal/sayfa.html`) misâl fiili beş konuda (misâl fiil: vâvî / yâî, mâzinin çekimi,
muzârinin çekimi, emir ve mezîd misâl, okumalar: Saîd b. Âmir, açgözlü Eş’ab) kök kartı (و ق ف / ي ء س), bâb kartları
(وَقَفَ يَقِفُ، وَضَعَ يَضَعُ، وَجِلَ يَوْجَلُ، يَئِسَ يَيْأَسُ), 30 fiillik çekim makinesi (vâv / yâ ya da düştüğü yer renkli,
altında kural), mezîd misâl tablosu, ifti’âlde و → ت kuralı, kaide, örnek, kitaptaki bütün alıştırmalar, beş oyun (Doğru
Çekim, Zamir Avı, Vâvî mi Yâî mi?, Vâv Düşer mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Çekim motoru
`misal/veri.js` içindeki `SD()` / `NV()` işlevleridir; sonra `python3 misal/yap.py`.

## Uygulama: Haber Çeşitleri

`haber/index.html` (yayın sürümü `haber/sayfa.html`) haberin türlerini beş konuda (mübtedâ, haber ve haberin türleri,
müfred haber, cümle haber, şibh-i cümle haber, âyetler ve okumalar: Uyku, Elma bahçesi) mübtedâ + haber zinciri, üç
türün kartları, haber makinesi (6 mübtedâ × 5 haber türü; i’rab, alâmet ve râbıt zamir), kaide, örnek, kitaptaki bütün
alıştırmalar, ek alıştırmalar (alâmet-i ref’, râbıt, câr-mecrûr / zarf, lafzan / mahallen), beş oyun (Doğru Haber,
Haberi Dönüştür, Haberin Türü?, Lafzan mı Mahallen mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `haber/veri.js` içindedir; sonra `python3 haber/yap.py`.

## Uygulama: Haberin Öne Geçmesi

`takdim/index.html` (yayın sürümü `takdim/sayfa.html`) haberin mübtedâdan önce geldiği durumları beş konuda (asıl sıra
ve üç sebep, soru ismi, nekra mübtedâ + şibh-i cümle haber, mübtedâda habere dönen zamir, âyetler-atasözleri-okuma: Hâtim
et-Tâî) üç sebep kartı, sıralama makinesi (10 cümle × iki sıra; doğru / yanlış ve sebebi), kaide, örnek, kitaptaki bütün
alıştırmalar, ek alıştırmalar (soru ismi seçme, dizilim doğru mu, nekra / marife, zamir uyumu), beş oyun (Doğru Kelime,
Cümleyi Diz, Neden Öne Geçti?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler
`takdim/veri.js` içindedir; sonra `python3 takdim/yap.py`.

## Uygulama: İnne ve Kardeşleri

`inne/index.html` (yayın sürümü `inne/sayfa.html`) إِنَّ وَأَخَوَاتُهَا konusunu beş konuda (altı harf ve anlamları, ismi
mansûb / haberi merfû ve zamirle kullanım, haberin türleri ve lâm-ı müzahleka, inne mi kâne mi?, okumalar: Ahmed ve
kalabalık yol, Çoban ve kurt) altı harf kartı, nâsih makinesi (6 cümle × yok / inne grubu / kâne grubu; harekeler ve
i’rab), kaide, örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar, beş oyun (Doğru Hareke, Cümleyi Dönüştür, Hangi
Anlam?, İnne mi Kâne mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `inne/veri.js` içindedir;
sonra `python3 inne/yap.py`.

## Uygulama: Sıfat Çeşitleri

`sifatcesit/index.html` (yayın sürümü `sifatcesit/sayfa.html`) sıfatın (na’t) türlerini beş konuda (sıfat ve türleri,
müfred sıfat ve uyum, cümle sıfat, şibh-i cümle sıfat, âyetler ve okumalar: Binbir Gece, Sinnimâr’ın mükâfatı)
mevsûf + sıfat zinciri, üç tür kartı, sıfat makinesi (6 mevsûf × 5 sıfat türü × 3 hal; râbıt ve i’rab), kaide, örnek,
kitaptaki bütün alıştırmalar, ek alıştırmalar (uyum, sıfat mı hâl mi, câr-mecrûr / zarf, sıfat mı haber mi), beş oyun
(Doğru Sıfat, Sıfatı Dönüştür, Sıfatın Türü?, Sıfat mı Değil mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `sifatcesit/veri.js` içindedir; sonra `python3 sifatcesit/yap.py`.

## Uygulama: Esmâ-i Hamse

`esmahamse/index.html` (yayın sürümü `esmahamse/sayfa.html`) الأَسْمَاءُ الخَمْسَةُ konusunu beş konuda (beş isim ve
şartları, merfû: vâv, mansûb: elif, mecrûr: yâ, i’rab ve okuma) beş isim × üç hal tablosu, esmâ makinesi (isim × hal ×
muzâfun ileyh: isim / zamir / yâ-i mütekellim), kaide, örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar (harfle mi
harekeyle mi, görev bulma), beş oyun (Doğru Biçim, Hali Değiştir, Hangi Hal?, Harfle mi?, Hafıza Kartları) ve 20 soruluk
quiz provasıyla öğretir. Veriler `esmahamse/veri.js` içindedir; sonra `python3 esmahamse/yap.py`.

## Uygulama: Temyîz

`temyizgenel/index.html` (yayın sürümü `temyizgenel/sayfa.html`) التَّمْيِيزُ konusunu beş konuda (temyîz nedir: melfûz ve
melhûz, melfûz temyîzin üç biçimi, melhûz temyîz ve fâil ⇄ temyîz dönüşümü, cümlede temyîz, âyetler ve okuma:
İstanbul’da turistler) temyîz makinesi (ölçü × madde × biçim), kaide, örnek, kitaptaki bütün alıştırmalar, ek
alıştırmalar, beş oyun (Doğru Temyîz, Dönüştür, Melfûz mu Melhûz mu?, Hangi Biçim?, Hafıza Kartları) ve 20 soruluk quiz
provasıyla öğretir. (Sayıların temyîzi ayrı programdır: `temyiz/`.) Veriler `temyizgenel/veri.js` içindedir; sonra
`python3 temyizgenel/yap.py`.

## Uygulama: Kâne ve Kardeşleri

`kane/index.html` (yayın sürümü `kane/sayfa.html`) كَانَ وَأَخَوَاتُهَا konusunu beş konuda (dokuz nâsih fiil ve anlamları,
ismi merfû · haberi mansûb ve zamirle çekim, haberin türleri ve i’rab, kâne’nin mâzî / muzâri / emir çekimi ve zincirleme
dönüşüm, âyetler ve okumalar: Hz. Ömer ve kadın, Cuhâ’nın hikâyeleri) dokuz fiil kartı, kâne makinesi (cümle × nâsih ×
kip; câmid fiiller), kaide, örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar (anlam, zamirle çekim, haber türü,
kâne mi inne mi), beş oyun (Doğru Hareke, Cümleyi Dönüştür, Haber Türü?, Kâne mi İnne mi?, Hafıza Kartları) ve 20 soruluk
quiz provasıyla öğretir. Veriler `kane/veri.js` içindedir; sonra `python3 kane/yap.py`.

## Uygulama: Zarf-ı Zamân ve Zarf-ı Mekân

`zarf/index.html` (yayın sürümü `zarf/sayfa.html`) ظَرْفُ الزَّمَانِ وَظَرْفُ المَكَانِ konusunu beş konuda (zarf nedir: mekân
ve zamân, zarf-ı mekân, zarf-ı zamân, harf-i cerle zarf ve dönüşüm, cümle kurma ve okumalar: fakültemizin kütüphanesi,
İslam kütüphanelerinin tarihi) zarf kartları, yön kutuları, zarf makinesi (12 zarf × mansûb / harf-i cerli), kaide,
örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar (mekân mı zamân mı, harekeleme, mansûb mu mecrûr mu), beş oyun
(Doğru Zarf, Dönüştür, Mekân mı Zamân mı?, Zarf mı Değil mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `zarf/veri.js` içindedir; sonra `python3 zarf/yap.py`.

## Uygulama: Hâl ve Hâl Çeşitleri

`hal/index.html` (yayın sürümü `hal/sayfa.html`) الحَالُ وَأَنْوَاعُهُ konusunu (kitaptaki iki ders) beş konuda (hâl nedir ve
sâhibu’l-hâl, uyum ve sıfat ⇄ hâl, hâlin çeşitleri: müfred / cümle / şibh-i cümle, râbıt-uyum zinciri ve i’rab, âyetler ve
okumalar: Neclâ’nın başarısı, dünden bugüne evlilik, obur misafir) hâl makinesi (6 sâhib × 5 durum × 3 tür), kaide, örnek,
kitaptaki bütün alıştırmalar (أ-١…أ-٨, ب-١…ب-١١), ek alıştırmalar, beş oyun (Doğru Hâl, Dönüştür, Hâl Türü?, Hâl mi
Sıfat mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `hal/veri.js` içindedir; sonra
`python3 hal/yap.py`.

## Uygulama: Müstesnâ

`mustesna/index.html` (yayın sürümü `mustesna/sayfa.html`) المُسْتَثْنَى konusunu (kitaptaki iki ders) beş konuda (istisnâ ve
üç rüknü, إِلَّا ile üç üslup: tâmm müsbet / tâmm menfî / nâkıs, غَيْرُ ve سِوَى, خَلَا / عَدَا / حَاشَا, hadisler ve okumalar:
Eş’ab ve yemek, okul ziyareti) istisnâ makinesi (4 cümle × 5 edat × 3 üslup), kaide, örnek, kitaptaki bütün alıştırmalar
(أ-١…أ-٨, ب-١…ب-٩), ek alıştırmalar, beş oyun (Doğru Müstesnâ, Dönüştür, Hangi Üslup?, Hangi Hüküm?, Hafıza Kartları) ve
20 soruluk quiz provasıyla öğretir. Veriler `mustesna/veri.js` içindedir; sonra `python3 mustesna/yap.py`.

## Uygulama: Atıf ve Atıf Edatları

`atif/index.html` (yayın sürümü `atif/sayfa.html`) العَطْفُ وَحُرُوفُهُ konusunu beş konuda (atıf ve üç unsuru, ma’tûfun
i’rabda tâbi olması, fiil kipi ve cümle türünde uyum, dokuz edatın anlamları, âyetler ve okuma: İstanbul’a ziyaret) dokuz
edat kartı, atıf makinesi (3 i’rab × 9 edat × 3 kelime çifti, Türkçe karşılığıyla), kaide, örnek, kitaptaki bütün
alıştırmalar, ek alıştırmalar (atfın yeri, fiil ve cümle uyumu, edat anlamları, uygun edat), beş oyun (Doğru Ma’tûf,
Dönüştür, Neyin Arasında?, Ma’tûfun İ’rabı, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `atif/veri.js`
içindedir; sonra `python3 atif/yap.py`.

## Uygulama: Olumsuzluk (Nefy)

`nefy/index.html` (yayın sürümü `nefy/sayfa.html`) النَّفْيُ konusunu beş konuda (nefy edatları ve isim cümlesi: لَيْسَ / مَا,
zâid bâ, لَيْسَ çekimi; fiilin nefyi ve i’rabı: merfû / meczûm / mansûb; zamana göre edat seçimi; olumlu ⇄ olumsuz; metinde
nefy ve nefy olmayan مَا / لَمَّا / لَا) nefy makinesi (6 cümle × 6 edat × zâid bâ; uymayan edatta nedenini söyler), kaide,
örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar, beş oyun (Doğru Biçim, Olumsuzla · Olumla, Hangi Zaman?, Nefy mi
Değil mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `nefy/veri.js` içindedir; sonra
`python3 nefy/yap.py`.

## Uygulama: Lâzım ve Müteaddî Fiil

`lazim/index.html` (yayın sürümü `lazim/sayfa.html`) الفِعْلُ اللَّازِمُ وَالمُتَعَدِّي konusunu beş konuda (lâzım ve müteaddî
fiil, cümleye uygun fiil, lâzımı hemze / tad’îf ile müteaddî yapmak, müteaddîyi mutâvaa ile lâzım yapmak, cümle kurma ve
okuma: Ebü’d-Derdâ) fiil makinesi (8 fiil × 4 yol; uymayan yolda nedenini söyler), kaide, örnek, kitaptaki bütün
alıştırmalar, ek alıştırmalar (lâzım mı müteaddî mi, hangi yol, mutâvaa biçimi), beş oyun (Doğru Fiil, Dönüştür, Lâzım mı
Müteaddî mi?, Hangi Yol?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `lazim/veri.js` içindedir; sonra
`python3 lazim/yap.py`.

## Uygulama: İki Mef’ûl Alan Fiiller

`ikimeful/index.html` (yayın sürümü `ikimeful/sayfa.html`) الأَفْعَالُ المُتَعَدِّيَةُ إِلَى مَفْعُولَيْنِ konusunu beş konuda (iki
mef’ûl alan fiiller ve iki kısmı, zan / yakîn / tahvîl fiilleri, mef’ûllerin mübtedâ-haberden dönüşümü, cümle kurma,
okumalar: إِسْطَنْبُولُ ve ذَكَاءُ طِفْلٍ) cümle makinesi (6 isim cümlesi × 8 fiil; أَعْطَى grubunda nedenini söyler), kaide,
örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar (aslı mübtedâ-haber mi, hangi grup, 2. mef’ûlün türü), beş oyun (Doğru
Mef’ûl, Dönüştür, Hangi Grup?, Aslı Mübtedâ-Haber mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler
`ikimeful/veri.js` içindedir; sonra `python3 ikimeful/yap.py`.
