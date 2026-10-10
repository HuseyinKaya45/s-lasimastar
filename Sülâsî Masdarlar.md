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

## Uygulama: Mef’ûlün Lieclih

`mefullieclih/index.html` (yayın sürümü `mefullieclih/sayfa.html`) المَفْعُولُ لَهُ (المَفْعُولُ لِأَجْلِهِ) konusunu beş konuda
(tanım ve لِمَ؟ sorusu, mansûb / lâm ile mecrûr / مِنْ، بِـ، فِي ile gelişi ve öne alınması, uygun mef’ûlün lieclihi seçmek,
لِمَاذَا؟ sorusuna cevap ve i’rab, âyet-hadis ve “الأُمُّ: سِرُّ الحَيَاةِ” okuması) sebep makinesi (6 cümle × 4 biçim), kaide,
örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar (lieclih / hâl / mutlak / bih, sebep bildiren harf-i cer, nekre /
elif-lâmlı / muzâf, öne alma), beş oyun (Doğru Sebep, Dönüştür, Ne O?, Sebep mi?, Hafıza Kartları) ve 20 soruluk quiz
provasıyla öğretir. Veriler `mefullieclih/veri.js` içindedir; sonra `python3 mefullieclih/yap.py`.

## Uygulama: Mef’ûl-i Mutlak

`mefulmutlak/index.html` (yayın sürümü `mefulmutlak/sayfa.html`) المَفْعُولُ المُطْلَقُ konusunu beş konuda (tanım ve âyet-hadis
örnekleri, te’kîd / nevi / sayı, uygun masdar ve fiil, masdarın yerine geçenler: eş anlamlısı, sıfatı, كُلّ / بَعْض, sayı;
okuma: مِنَ البُطُولَاتِ الخَالِدَةِ) masdar makinesi (6 fiil × 6 görev), kaide, örnek, kitaptaki bütün alıştırmalar, ek
alıştırmalar (mutlak / lieclih / hâl / bih, türü, nâib türü, masdarı atıp nâib koyma, metinde mutlak), beş oyun (Doğru Masdar,
Dönüştür, Ne O?, Hangi Görev?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `mefulmutlak/veri.js`
içindedir; sonra `python3 mefulmutlak/yap.py`.

## Uygulama: Mef’ûlün Maah

`mefulmaah/index.html` (yayın sürümü `mefulmaah/sayfa.html`) المَفْعُولُ مَعَهُ konusunu beş konuda (tanım ve vâvın türü: maiyyet /
atıf / hâl, şartlar, vâvdan sonraki ismin hükümleri: maah vâcib / atıf vâcib / ikisi câiz, nâsıb türleri ve مَا / كَيْفَ,
okuma: مَبْدَأُ الشُّورَى فِي الإِسْلَامِ) vâv makinesi (6 cümle × 2 okuyuş; olmayan okuyuşta nedenini söyler), kaide, örnek,
kitaptaki bütün alıştırmalar, ek alıştırmalar, beş oyun (Doğru Hareke, Dönüştür, Hangi Vâv?, Nâsıb Ne?, Hafıza Kartları) ve
20 soruluk quiz provasıyla öğretir. Veriler `mefulmaah/veri.js` içindedir; sonra `python3 mefulmaah/yap.py`.

## Uygulama: Maksûr, Menkûs ve Memdûd İsimler

`maksur/index.html` (yayın sürümü `maksur/sayfa.html`) المَقْصُورُ وَالمَنْقُوصُ وَالمَمْدُودُ konusunu beş konuda (maksûr: üç hâlde
takdîrî; menkûs: merfû ve mecrûrda takdîrî, mansûbda zâhir, nekrede yânın düşmesi; memdûd: hep zâhir, gayr-i munsarif
olanlar; i’rab alâmeti ve cümle kurma; okuma: Molla Fenârî ve Sultan Bâyezid) isim makinesi (6 isim × 6 hâl), kaide, örnek,
kitaptaki bütün alıştırmalar, ek alıştırmalar, beş oyun (Doğru Biçim, Dönüştür, Hangi Tür?, Zâhir mi Takdîrî mi?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `maksur/veri.js` içindedir; sonra `python3 maksur/yap.py`.

## Uygulama: Mukârabe, Recâ ve Şurû’ Fiilleri

`mukarabe/index.html` (yayın sürümü `mukarabe/sayfa.html`) أَفْعَالُ المُقَارَبَةِ وَالرَّجَاءِ وَالشُّرُوعِ konusunu beş konuda (كَانَ gibi
amel ve muzâri haber, mukârabe: كَادَ / أَوْشَكَ ve أَنْ, recâ: عَسَى ve tam kullanımı, şurû’ fiilleri ve tam fiil, cümle kurma ve
okuma: Ebû Bekir es-Sıddîk) fiil makinesi (8 fiil × 6 isim; cinsiyet uyumu, haber uyumu ve أَنْ kuralı), kaide, örnek, kitaptaki
bütün alıştırmalar, ek alıştırmalar, beş oyun (Doğru Biçim, Dönüştür, Hangi Grup?, Tam mı Nâkıs mı?, Hafıza Kartları) ve 20
soruluk quiz provasıyla öğretir. Veriler `mukarabe/veri.js` içindedir; sonra `python3 mukarabe/yap.py`.

## Uygulama: Şart ve Şart Edatları

`sart/index.html` (yayın sürümü `sart/sayfa.html`) الشَّرْطُ وَأَدَوَاتُهُ konusunu beş konuda (şart üslubunun öğeleri, câzim edatlar
ve cezm alâmeti, câzim olmayan إِذَا / لَوْ ve mâzî ile şart, şart cümlesi kurma ve talep cevabı, âyetler ve okumalar: ذَكَاءُ فَتَاةٍ،
الحِيلَةُ) şart makinesi (8 edat × 6 fiil çifti; cezm alâmetini söyler), kaide, örnek, kitaptaki bütün alıştırmalar, ek
alıştırmalar, beş oyun (Doğru Cezm, Şarta Çevir, Edat Ne Bildirir?, Câzim mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla
öğretir. Veriler `sart/veri.js` içindedir; sonra `python3 sart/yap.py`.

## Uygulama: Cinsini Nefy Eden Lâ

`lacins/index.html` (yayın sürümü `lacins/sayfa.html`) لَا النَّافِيَةُ لِلْجِنْسِ konusunu beş konuda (tanım ve ameli, isminin i’rabı:
mebnî / mansûb, ismi ve haberi, amel şartları, iptal ve haberin hazfı, âyetler ve okuma: مَدِينَتِي المُفَضَّلَةُ) lâ makinesi
(6 isim × 4 durum), kaide, örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar, beş oyun (Doğru Hareke, Lâ Ekle, İsmin Hükmü,
Niçin Amelsiz?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `lacins/veri.js` içindedir; sonra
`python3 lacins/yap.py`.

## Uygulama: Şartın Cevabının Fâ ile Birlikte Gelmesi

`sartfa/index.html` (yayın sürümü `sartfa/sayfa.html`) اقْتِرَانُ جَوَابِ الشَّرْطِ بِالفَاءِ konusunu beş konuda (kural, isim cümlesi ve
câmid fiil, talep ve nefy, قَدْ / سَـ / سَوْفَ ve beyitler, fâ’lı muzârinin i’rabı ve fâ’lı cevap kurma, âyet, hadis ve okuma:
اِرْضَ بِمَا لَدَيْكَ!) fâ makinesi (5 şart × 6 cevap türü), kaide, örnek, kitaptaki bütün alıştırmalar, ek alıştırmalar, beş oyun
(Fâ’lı Cevap, Fâ Ekle, Neden Fâ?, Fâ Gerekli mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler
`sartfa/veri.js` içindedir; sonra `python3 sartfa/yap.py`.

## Uygulama: Taaccüp Üslubu

`taaccub/index.html` (yayın sürümü `taaccub/sayfa.html`) أُسْلُوبُ التَّعَجُّبِ konusunu beş konuda (مَا أَفْعَلَهُ sîgası, أَفْعِلْ بِهِ
sîgası ve iki sîga, şartlar ve dolaylı taaccüp, sarîh / müevvel masdar ve مَا / مَنْ, semâî sîgalar ve okuma: العَوْلَمَةُ) taaccüp
makinesi (8 fiil × 4 sîga), kaide, örnek, kitaptaki 13 alıştırmanın hepsi, ek alıştırmalar, beş oyun (Doğru Biçim, Taaccübe
Çevir, Neden Dolaylı?, Doğrudan mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `taaccub/veri.js`
içindedir; sonra `python3 taaccub/yap.py`.

## Uygulama: Medih ve Zemm Fiilleri

`medih/index.html` (yayın sürümü `medih/sayfa.html`) أَفْعَالُ المَدْحِ وَالذَّمِّ konusunu beş konuda (نِعْمَ ve بِئْسَ: fiil, fâil ve
mahsûs; fâil–mahsûs uyumu ve te’nîs tâsı; حَبَّذَا ve لَا حَبَّذَا; mahsûsu ve fâili tamamlama; âyetler ve okuma: الصِّدْقُ)
medih-zemm makinesi (4 fiil × 6 mahsûs), kaide, örnek, kitaptaki 7 alıştırmanın hepsi, ek alıştırmalar, beş oyun (Doğru
Biçim, Medih-Zemm Kur, Hangi Fiil?, Övgü mü Yergi mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler
`medih/veri.js` içindedir; sonra `python3 medih/yap.py`.

## Uygulama: Te’kîd

`tekid/index.html` (yayın sürümü `tekid/sayfa.html`) التَّأْكِيدُ konusunu beş konuda (tanım, lafzî ve ma’nevî te’kîd; ma’nevî te’kîd
kelimeleri ve كِلَا / كِلْتَا; i’rab ve zamir uyumu, hata düzeltme; te’kîd üslubuna çevirme; âyet, hadis ve okuma:
النَّظَافَةُ فِي الإِسْلَامِ) te’kîd makinesi (6 müekked × 4 i’rab), kaide, örnek, kitaptaki 10 alıştırmanın hepsi, ek alıştırmalar,
beş oyun (Doğru Biçim, Te’kîd Et, Hangi Kelime?, Lafzî mi Ma’nevî mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla
öğretir. Veriler `tekid/veri.js` içindedir; sonra `python3 tekid/yap.py`.

## Uygulama: Kıraat 20 — Köy ile Şehir Arasında

`kiraat20/index.html` (yayın sürümü `kiraat20/sayfa.html`) okuma-anlama dersinin 20. konusu بَيْنَ الرِّيفِ وَالمَدِينَةِ’yi beş
bölümde (okumaya hazırlık ve tam harekeli metin, sesli okuma ve sözlükle; metni anlama ve olay sıralama; zıt, eş anlam ve
çoğul; köy–şehir karşılaştırması ve resimler; görüş yazısı) köy–şehir karşılaştırıcısı (6 konu × 4 bakış), kitaptaki 9
etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Çevir, Köy mü Şehir mi?, Doğru mu Yanlış mı?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 40 kelimesini çalıştırır. Veriler
`kiraat20/veri.js` içindedir; sonra `python3 kiraat20/yap.py`.

## Uygulama: Bedel

`bedel/index.html` (yayın sürümü `bedel/sayfa.html`) البَدَلُ konusunu beş konuda (tanım, mübdel minh ve bedel, na’t / te’kîd farkı;
bedel-i küll, ba’z ve iştimâl; zamir ve i’rab uyumu; bedelli ve bedelsiz cümle, sıralama; âyet, hadis ve okuma:
عَدْلُ الرَّسُولِ ﷺ) bedel makinesi (6 isim × 4 söyleyiş), kaide, örnek, kitaptaki 9 alıştırmanın hepsi, ek alıştırmalar, beş oyun
(Doğru Biçim, Bedel Kur, Hangi Bedel?, Bedel mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler
`bedel/veri.js` içindedir; sonra `python3 bedel/yap.py`.

## Uygulama: Nidâ Üslubu

`nida/index.html` (yayın sürümü `nida/sayfa.html`) أُسْلُوبُ النِّدَاءِ konusunu beş konuda (nidâ edatları: yakın, uzak, her ikisi;
münâdânın beş türü; münâdânın i’rabı: mebnî / mansûb; يَا أَيُّهَا / يَا أَيَّتُهَا, اللَّهُمَّ ve edatın hazfı; muzâftan şibh-i muzâfa ve
okuma: فِي سَبِيلِ اللهِ) nidâ makinesi (6 tür × 4 sayı / cinsiyet), kaide, örnek, kitaptaki 8 alıştırmanın hepsi, ek alıştırmalar,
beş oyun (Doğru Hareke, Seslen, Hangi Münâdâ?, Yakın mı Uzak mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `nida/veri.js` içindedir; sonra `python3 nida/yap.py`.

## Uygulama: Gayr-i Munsarif

`munsarif/index.html` (yayın sürümü `munsarif/sayfa.html`) المَمْنُوعُ مِنَ الصَّرْفِ konusunu beş konuda (tanım ve alemin altı men sebebi;
vasıf, elif-i te’nîs ve müntehe’l-cumû‘; doğru ismi seçme ve yerleştirme; cer hâli: fetha / kesre ve çevirme; âyetlerde i’rab ve
okuma: سُورِيَّةُ) cer makinesi (6 kelime × 4 i’rab hâli), kaide, örnek, kitaptaki 11 alıştırmanın hepsi, ek alıştırmalar, beş oyun
(Doğru Hareke, Çevir, Hangi Kısım?, Fetha mı Kesre mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `munsarif/veri.js` içindedir; sonra `python3 munsarif/yap.py`.

## Uygulama: Kem-i İstifhâmiyye ve Kem-i Haberiyye

`kem/index.html` (yayın sürümü `kem/sayfa.html`) كَمِ الاسْتِفْهَامِيَّةُ وَالخَبَرِيَّةُ konusunu beş konuda (kem’in iki türü; kem-i istifhâmiyye
ve harf-i cerli soru; kem-i haberiyye ve temyizin dört biçimi; temyiz ve i’rabı; âyetlerde kem ve okuma: فِي سُوقِ الكُتُبِ) kem
makinesi (6 isim × 5 kullanım), kaide, örnek, kitaptaki 8 alıştırmanın hepsi, ek alıştırmalar, beş oyun (Doğru Temyiz, Çevir,
Temyizin Biçimi, Soru mu Çokluk mu?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `kem/veri.js` içindedir; sonra `python3 kem/yap.py`.

## Uygulama: İnne mi, Enne mi? Mâ-i Kâffe

`kaffe/index.html` (yayın sürümü `kaffe/sayfa.html`) كَسْرُ هَمْزَةِ «إِنَّ» وَ«مَا» الكَافَّةُ konusunu beş konuda (inne mi enne mi?; kesrenin
yedi yeri; cümle tamamlama ve metinde zabt: إِسْطَنْبُولُ; mâ-i kâffe ve leytemâ; mâ’nın etkisi ve okuma: جَوْلَةٌ فِي السُّوقِ) inne
makinesi (3 cümle × 9 yer), kaide, örnek, kitaptaki 10 alıştırmanın hepsi, ek alıştırmalar, beş oyun (Doğru Biçim, Dönüştür,
Neden Kesre?, İnne mi Enne mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `kaffe/veri.js` içindedir; sonra `python3 kaffe/yap.py`.

## Uygulama: İsm-i Fâil ve İsm-i Mef’ûlün Ameli

`famel/index.html` (yayın sürümü `famel/sayfa.html`) عَمَلُ اسْمِ الفَاعِلِ وَاسْمِ المَفْعُولِ konusunu beş konuda (ism-i fâilin ameli;
ism-i mef’ûlün ameli; amelin altı şartı; ma’mûlün harekesi ve fiilden isme; izafet, âyetler ve okuma: فِي المُسْتَشْفَى) amel
makinesi (4 âmil × 7 kullanım), kaide, örnek, kitaptaki 7 alıştırmanın hepsi, ek alıştırmalar, beş oyun (Doğru Hareke, Dönüştür,
Neden Amel Ediyor?, Fâil mi Mef’ûl mü?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `famel/veri.js` içindedir; sonra `python3 famel/yap.py`.

## Uygulama: Masdarın Ameli

`masamel/index.html` (yayın sürümü `masamel/sayfa.html`) عَمَلُ المَصْدَرِ konusunu beş konuda (masdarın ameli ve üç biçimi;
en / mâ ile takdir ve zaman farkı; fiilinin yerine geçen masdar; amel etmeyen masdar: te’kîd, aded, teşbih; metinde ve
âyetlerde: التَّعَاوُنُ) masdar makinesi (4 masdar × 8 kullanım), kaide, örnek, kitaptaki 6 alıştırmanın hepsi, ek alıştırmalar,
beş oyun (Doğru Hareke, Dönüştür, Amel Ediyor mu?, Fâiline mi Mef’ûlüne mi?, Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir.
Veriler `masamel/veri.js` içindedir; sonra `python3 masamel/yap.py`.

## Uygulama: Mehmûz Fiil ve Çekimi

`mehmuz/index.html` (yayın sürümü `mehmuz/sayfa.html`) الفِعْلُ المَهْمُوزُ وَتَصْرِيفُهُ konusunu beş konuda (mehmûz fiil ve hemzenin yeri:
fâ / ayn / lâm; mâzi ve muzâri çekimi; emir ve hemzesi düşen emirler: كُلْ، خُذْ، مُرْ، سَلْ; mezîd mehmûz; okuma: هُدُوءُ الغَابَةِ)
çekim makinesi (23 fiil × 3 zaman; hemzenin yazılışı kurallardan otomatik üretilir), kaide, örnek, kitaptaki 30 alıştırmanın
hepsi (çekim tabloları dokun-yerleştir biçiminde), ek alıştırmalar, beş oyun (Doğru Çekim, Zamir Avı, Hemze Nerede?, Mehmûz mu?,
Hafıza Kartları) ve 20 soruluk quiz provasıyla öğretir. Veriler `mehmuz/veri.js` içindedir; sonra `python3 mehmuz/yap.py`.

## Uygulama: Hemze ve Yazılışı

`hemze/index.html` (yayın sürümü `hemze/sayfa.html`) الهَمْزَةُ وَكِتَابَتُهَا konusunu beş konuda (hemze-i kat’ ve hemze-i vasl;
kelime başında hemze; ortadaki hemze ve harekelerin gücü; sondaki hemze; okuma: لَا تُفْشِ أَسْرَارَ عَائِلَتِكَ) hemze makinesi
(yer × önceki harf × kendi harekesi → elif, vav, nebre ya da tek başına), kaide, örnek, kitaptaki üç alıştırmanın hepsi, ek
alıştırmalar, beş oyun (Doğru Yazılış, Dönüştür, Neyin Üzerinde?, Kat’ mı Vasl mı?, Hafıza Kartları) ve 20 soruluk quiz
provasıyla öğretir. Veriler `hemze/veri.js` içindedir; sonra `python3 hemze/yap.py`.

## Uygulama: Kıraat 23 — İslâm’da Cihad Kavramı

`kiraat23/index.html` (yayın sürümü `kiraat23/sayfa.html`) okuma-anlama dersinin 23. konusu مَفْهُومُ الجِهَادِ فِي الإِسْلَامِ’ı beş
bölümde (okumaya hazırlık ve tam harekeli metin, sesli okuma ve sözlükle; metni anlama, cihadın dört gayesi ve delilleri; zıt ve
eş anlam; çoğul ve tekil; harf-i cer, üslup, vezin ve eşleştirme) cihad gezgini (6 konu × 4 bakış: fikir, delil, kelimeler,
düşünme sorusu), kitaptaki bütün etkinlikler, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Zıt mı Eş mi?,
Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 42 kelimesini çalıştırır. Veriler `kiraat23/veri.js` içindedir; sonra
`python3 kiraat23/yap.py`.

## Uygulama: Kelime Hazinesi

`kelimehazinesi/index.html` (yayın sürümü `kelimehazinesi/sayfa.html`) 70 Sarf ve Nahiv dersinde geçen 246 temel kelimeyi
anlamı, çoğulu (ve çoğul kalıbı), eş ve zıt anlamlısı ve dersteki örnek cümlesiyle öğretir. Günlük tekrar beş kutulu
aralıklı tekrar (Leitner) ile çalışır: bilinen kart daha seyrek, yanlış bilinen kart ertesi gün yeniden sorulur. Kelimeler
derse göre listelenir ve aranabilir, çoğullar kalıplarına göre toplanır, yanlış yapılan kelimeler "Zayıf kelimeler"de birikir.
Altı oyun vardır: Kalıp Fabrikası, Mıknatıs, Hafıza, Düşen Kelimeler, Cümlede Değiştir, Hız Turu. Okuma-anlama dersleri
(Kıraat 20, 23) dahil değildir. Kelimeler `kelimehazinesi/kelimeler.json` içindedir; yeni ders eklemek için oraya yazıp
`python3 kelimehazinesi/yap.py` çalıştırılır.

## Uygulama: Kıraat 1 — Selamlaşma ve Tanışma

`kiraat01/index.html` (yayın sürümü `kiraat01/sayfa.html`) okuma-anlama dersinin 1. konusu التَّحِيَّاتُ وَالتَّعَارُفُ’yu beş
bölümde (okumaya hazırlık ve dört tanışma metni; metni anlama, bilgi tablosu ve soru sorma; boşluk, eş ve zıt anlam;
cümle kurma ve bitişik zamirler; selamlaşma ve kimlik kartı) tanışma makinesi (4 kişi × 8 soru), kitaptaki 9 etkinliğin ve
“لَاحِظْ” bölümünün hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Kim Söyledi?, Doğru mu Yanlış mı?,
Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi (modül: `kiraat01/kelime.js`, `kelime.css`)
dersin 30 kelimesini aralıklı tekrar, kelime kartları, çoğul kalıpları, zayıf kelimeler ve altı kelime oyunuyla çalıştırır;
modül sonraki okuma derslerine de eklenir (veri: `KH_KELIMELER`). Veriler `kiraat01/veri.js` içindedir; sonra
`python3 kiraat01/yap.py`.

## Uygulama: Kıraat 2 — Peygamberimizin Ailesi

`kiraat02/index.html` (yayın sürümü `kiraat02/sayfa.html`) okuma-anlama dersinin 2. konusu عَائِلَةُ النَّبِيِّ مُحَمَّدٍ ﷺ’i beş
bölümde (okumaya hazırlık ve metin; metni anlama ve aile ağacı; boşluk, zıt ve eş anlam; akrabalık adları ve cümle kurma;
muzâri fiil ve zamirler) aile ağacı, akrabalık şeması, çekim makinesi (6 fiil × 6 zamir), kitaptaki 10 etkinliğin hepsi,
ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Kim Kimdir?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk
quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 35 kelimesini çalıştırır. Veriler `kiraat02/veri.js` içindedir;
sonra `python3 kiraat02/yap.py`.

## Uygulama: Kıraat 3 — Abdurrahman’ın Evi

`kiraat03/index.html` (yayın sürümü `kiraat03/sayfa.html`) okuma-anlama dersinin 3. konusu بَيْتُ عَبْدِ الرَّحْمَنِ’i beş bölümde
(okumaya hazırlık ve metin; metni anlama, ✓/✗ ve düzeltme; ev, eşya ve sofra kelimeleri; harf-i cer, zarflar ve cümle kurma;
şemsî–kamerî lâm ve işaret isimleri) ev planı, işaret makinesi, zarf–harf-i cer tablosu, kitaptaki 9 etkinlik ve 3 tedrîbin
hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Hangi Odada?, Doğru mu Yanlış mı?, Hafıza Kartları) ve
20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 35 kelimesini çalıştırır. Veriler `kiraat03/veri.js`
içindedir; sonra `python3 kiraat03/yap.py`.

## Uygulama: Kıraat 4 — Sofra Başında

`kiraat04/index.html` (yayın sürümü `kiraat04/sayfa.html`) okuma-anlama dersinin 4. konusu حَوْلَ مَائِدَةِ الطَّعَامِ’ı beş bölümde
(okumaya hazırlık ve metin; metni anlama, ✓/✗ ve soru yazma; kelime ilişkileri ve cümle kurma; öğünler, meyveler, sebzeler ve
lokanta menüsü; bitişik zamirler ve eril–dişil) öğün çizelgesi, zamir makinesi (5 isim × 8 zamir), kitaptaki 11 etkinliğin
hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Meyve mi Sebze mi?, Doğru mu Yanlış mı?, Hafıza Kartları)
ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 33 kelimesini çalıştırır. Veriler `kiraat04/veri.js`
içindedir; sonra `python3 kiraat04/yap.py`.

## Uygulama: Kıraat 5 — Üniversitede Okumak

`kiraat05/index.html` (yayın sürümü `kiraat05/sayfa.html`) okuma-anlama dersinin 5. konusu الدِّرَاسَةُ فِي الجَامِعَةِ’yi beş bölümde
(okumaya hazırlık ve metin; metni anlama, ✓/✗, eşleştirme ve soru yazma; zaman sözleri, eş–zıt–çoğul; harf-i cer, cümle kurma
ve أُرِيدُ أَنْ…; ders programı, günler ve aylar) Hâlid’in yıl–hafta–gün şeması, program makinesi (örnek program), kitaptaki
12 etkinliğin ve ek ödevin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Gün mü Ay mı?, Doğru mu Yanlış mı?,
Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 33 kelimesini çalıştırır. Veriler
`kiraat05/veri.js` içindedir; sonra `python3 kiraat05/yap.py`.

## Uygulama: Kıraat 6 — Meslekler ve İşler

`kiraat06/index.html` (yayın sürümü `kiraat06/sayfa.html`) okuma-anlama dersinin 6. konusu المِهَنُ وَالأَعْمَالُ’i beş bölümde
(okumaya hazırlık ve metin; metni anlama ve apartmandaki meslekler; meslek kelimeleri, eş–zıt anlam, uymayan kelime ve tanım;
cem-i müzekker sâlim, iş yeri, cümle kurma, مَتَى ve harf-i cer; ek okuma metinleri ve peygamberlerin meslekleri) apartman
şeması, meslek makinesi (13 meslek × 5 soru), kitaptaki 14 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime,
Düzelt ve Dönüştür, Erkek mi Kadın mı?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler.
“Kelime Hazinesi” sekmesi dersin 34 kelimesini çalıştırır. Veriler `kiraat06/veri.js` içindedir; sonra `python3 kiraat06/yap.py`.

## Uygulama: Kıraat 7 — Müslümanın Bir Günü

`kiraat07/index.html` (yayın sürümü `kiraat07/sayfa.html`) okuma-anlama dersinin 7. konusu اليَوْمُ فِي حَيَاةِ المُسْلِمِ’i beş bölümde
(okumaya hazırlık ve metin; metni anlama, fiil–tümleç eşleştirme ve günlük işleri sıralama; eş–zıt anlam ve vakitler; resme
uygun fiil, cümle kurma ve لِـ + mansûb; mâzî–muzâri çekim) günün akışı şeması, çekim makinesi (6 fiil × 6 zamir × 2 zaman),
kitaptaki 8 etkinliğin ve genel alıştırmanın hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Mâzî mi Muzâri mi?,
Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 33 kelimesini
çalıştırır. Veriler `kiraat07/veri.js` içindedir; sonra `python3 kiraat07/yap.py`.

## Uygulama: Kıraat 8 — Hayatımdaki En İyi İnsanlar

`kiraat08/index.html` (yayın sürümü `kiraat08/sayfa.html`) okuma-anlama dersinin 8. konusu مِنْ أَفْضَلِ الأَشْخَاصِ فِي حَيَاتِي’yi beş
bölümde (okumaya hazırlık ve metin; metni anlama, ✓/✗ ve (أ)–(ب) eşleştirme; sıfatlar, eş–zıt anlam, dış görünüş–ahlak; renklerin
eril–dişil biçimleri; soru edatları ve kalıplar) Rağad–Murâd kartları, renk makinesi (13 renk × eril/dişil), soru edatları tablosu,
kitaptaki 9 etkinliğin ve tedrîbin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Rağad mı Murâd mı?, Doğru mu
Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 35 kelimesini çalıştırır.
Veriler `kiraat08/veri.js` içindedir; sonra `python3 kiraat08/yap.py`.

## Uygulama: Kıraat 9 — Yılın Mevsimleri

`kiraat09/sayfa.html` (aynısı `kiraat09/index.html`) فُصُولُ السَّنَةِ okuma-anlama dersini beş
bölümde (okumaya hazırlık ve metin; metni anlama, ✓/✗ ve “hangi mevsim?”; boşluk doldurma, eş–zıt anlam, çoğul→tekil;
paragraf ve cümle kurma, أَمَّا… فَـ ve كَثِيرًا مِنَ kalıpları; olumsuzluk edatları مَا، لَمْ، لَا، لَنْ، لَيْسَ) dört mevsim kartları,
olumsuzluk makinesi (5 cümle × 5 edat), edatlar tablosu, kitaptaki 11 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime,
Düzelt ve Dönüştür, Hangi Mevsim?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi”
sekmesi dersin 34 kelimesini çalıştırır. Veriler `kiraat09/veri.js` içindedir; sonra `python3 kiraat09/yap.py`.

## Uygulama: Kıraat 10 — Alışveriş Günü

`kiraat10/sayfa.html` (aynısı `kiraat10/index.html`) يَوْمُ التَّسَوُّقِ okuma-anlama dersini beş
bölümde (okumaya hazırlık ve metin; metni anlama, haftalık ihtiyaç tablosu ve ✓/✗; boşluk doldurma, eş–zıt anlam, tekil–çoğul;
soru kurma, cümle kurma ve kelime kullanma; لَكِنْ، لِأَنَّ، مِنْ… إِلَى kalıpları, pazar reyonları ve miktar) Çarşamba Pazarı kartları,
alışveriş makinesi (9 ürün × 4 miktar), haftalık liste tablosu, kitaptaki 12 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime,
Düzelt ve Dönüştür, Hangi Reyon?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi”
sekmesi dersin 35 kelimesini çalıştırır. Veriler `kiraat10/veri.js` içindedir; sonra `python3 kiraat10/yap.py`.

## Uygulama: Okuma Kelime Hazinesi (Okuma-anlama 1–10)

`okumakelime/index.html` (yayın sürümü `okumakelime/sayfa.html`) okuma-anlama dersinin ilk on konusunda geçen 514 kaydı
(240 isim, 90 fiil, 74 sıfat, 11 zarf, 99 terkip) anlamı, Arapçası, çoğulu (ve çoğul kalıbı), eş ve zıt anlamlısı ve dersteki
örnek cümlesiyle öğretir. Liste, derslerin “Kelime Hazinesi” verileriyle ders kitabının sonundaki kelime listesinin
(مَسْرَدُ أَهَمِّ مُفْرَدَاتِ دُرُوسِ كِتَابِ القِرَاءَةِ) birleşimidir; birden çok derste geçen kelime her dersinde görünür.
Günlük tekrar beş kutulu aralıklı tekrarla (Leitner) çalışır. Kelimeler derse ve türe (isim, sıfat, fiil, zarf, terkip) göre
listelenir ve aranır; “Eş ve Zıt” sekmesi kitaptaki = ve × çiftlerini derse göre toplar. Sekiz oyun vardır: Kalıp Fabrikası,
Mıknatıs, Hafıza, Düşen Kelimeler, Cümlede Değiştir, Hız Turu, Terkip Tamamla, Türkçeden Arapçaya. Kelimeler
`okumakelime/kelimeler.json` içindedir; değiştirdikten sonra `python3 okumakelime/yap.py` çalıştırılır.

## Uygulama: Kıraat 11 — Doktorda

`kiraat11/sayfa.html` (aynısı `kiraat11/index.html`) عِنْدَ الطَّبِيبِ okuma-anlama dersini beş bölümde (okumaya hazırlık ve
metin; metni anlama, olay sıralama ve düzeltme; boşluk doldurma, eş anlam, tekil–çoğul, zıt anlam; kim ne yapar, doğru kelime ve
doktorun işleri; يَشْعُرُ بِـ، عَلَيْكَ أَنْ، كَثِيرًا مِنْ، يَتَأَلَّفُ مِنْ، عِنْدَمَا kalıpları) hasta–doktor kartları, olay şeridi,
şikâyet ve tavsiye makinesi (6 şikâyet × 4 kişi), kitaptaki 10 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve
Dönüştür, Kim Yapar?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin
38 kelimesini çalıştırır. Veriler `kiraat11/veri.js` içindedir; sonra `python3 kiraat11/yap.py`.

## Uygulama: Kıraat 12 — Hobiler

`kiraat12/sayfa.html` (aynısı `kiraat12/index.html`) الهِوَايَاتُ okuma-anlama dersini beş bölümde (okumaya hazırlık ve metin;
metni anlama, ✓/✗, sultanlar ve hobileri; eş, zıt anlam ve çoğul; cümle tamamlama, cümle kurma, kelime kullanma; resimdeki hobi,
hobi türleri, harf-i cerli fiiller ve يُمْكِنُ أَنْ) hobi türleri ağacı, tarihte hobiler kartları, hobi makinesi (16 hobi × 5 kalıp),
kitaptaki 9 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Hangi Tür?, Doğru mu Yanlış mı?, Hafıza
Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 36 kelimesini çalıştırır. Veriler
`kiraat12/veri.js` içindedir; sonra `python3 kiraat12/yap.py`.

## Uygulama: Kıraat 13 — Yaz Tatili

`kiraat13/sayfa.html` (aynısı `kiraat13/index.html`) الإِجَازَةُ الصَّيْفِيَّةُ okuma-anlama dersini beş bölümde (okumaya hazırlık
ve metin; metni anlama, ✓/✗ ve soru kurma; boşluk doldurma, eş–zıt anlam, çoğul; sıfat uyumu, harf-i cer, cümle kurma;
تُعْتَبَرُ مِنْ أَكْبَرِ، أَكْثَرُ شَيْءٍ أَعْجَبَنِي، تَشْتَهِرُ بِـ kalıpları ve ism-i tafdîl) Trabzon–Karaca Mağarası kartları, şehir
tanıtma makinesi (6 şehir × 4 kalıp), kitaptaki 11 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür,
Şehir mi Mağara mı?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin
37 kelimesini çalıştırır. Veriler `kiraat13/veri.js` içindedir; sonra `python3 kiraat13/yap.py`.

## Uygulama: Kıraat 14 — Boş Vakitler

`kiraat14/sayfa.html` (aynısı `kiraat14/index.html`) أَوْقَاتُ الفَرَاغِ okuma-anlama dersini beş bölümde (okumaya hazırlık ve
metin; metni anlama, ✓/✗ ve faydalı–zararlı ayırma; tekil, eş ve zıt anlam; cümle eşleştirme, boşluk doldurma, kelime kullanma;
etkinlik türleri ve قَدْ، حَتَّى، يَحْتَاجُ إِلَى، بِشَكْلٍ عَامٍّ kalıpları) faydalı–zararlı kartları, boş vakit makinesi
(17 etkinlik × 4 kişi), kitaptaki 8 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Faydalı mı
Zararlı mı?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin
37 kelimesini çalıştırır. Veriler `kiraat14/veri.js` içindedir; sonra `python3 kiraat14/yap.py`.

## Uygulama: Kıraat 15 — İnsan ve Ulaşım Araçları

`kiraat15/sayfa.html` (aynısı `kiraat15/index.html`) الإِنْسَانُ وَوَسَائِلُ النَّقْلِ okuma-anlama dersini beş bölümde (okumaya
hazırlık ve metin; metni anlama, ✓/✗ ve eski–yeni araç ayırma; boşluk doldurma, eş ve zıt anlam; tekil, soru kurma, kelime
kullanma; تُعْتَبَرُ مِنْ أَهَمِّ، خَاصَّةً، بِسَبَبِ kalıpları ve muzâriden mâzîye dönüştürme) eski–yeni araç kartları, kara–deniz–hava
tablosu, zaman makinesi (8 fiil × 4 zaman), kitaptaki 11 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve
Dönüştür, Kara mı Deniz mi Hava mı?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi”
sekmesi dersin 37 kelimesini çalıştırır. Veriler `kiraat15/veri.js` içindedir; sonra `python3 kiraat15/yap.py`.

## Uygulama: Kıraat 16 — Şeyh Muhammed Mütevellî eş-Şa‘râvî

`kiraat16/sayfa.html` (aynısı `kiraat16/index.html`) الشَّيْخُ مُحَمَّد مُتَوَلِّي الشَّعْرَاوِيُّ okuma-anlama dersini beş bölümde
(okumaya hazırlık ve metin; metni anlama, yıl–olay eşleştirme, ✓/✗ ve olay sıralama; boşluk doldurma ve tekil–çoğul; eş ve zıt
anlam, فِي، مِنْ، إِلَى harf-i cerleri; cümle dizme, يُعَدُّ مِنْ أَشْهَرِ، حَوَالَيْ، عَدَدٌ مِنْ kalıpları ve mâzî çekimi) hayat çizgisi,
harf-i cer tablosu, çekim makinesi (9 fiil × 7 kişi), kitaptaki 11 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime,
Düzelt ve Dönüştür, فِي mi مِنْ mi إِلَى mı?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime
Hazinesi” sekmesi dersin 37 kelimesini çalıştırır. Veriler `kiraat16/veri.js` içindedir; sonra `python3 kiraat16/yap.py`.

## Uygulama: Kıraat 17 — Müslümanların Bayramları

`kiraat17/sayfa.html` (aynısı `kiraat17/index.html`) أَعْيَادُ المُسْلِمِينَ okuma-anlama dersini beş bölümde (okumaya hazırlık ve
metin; metni anlama, ✓/✗, A–B eşleştirme ve Ramazan–Kurban ayırma; boşluk doldurma, eş ve zıt anlam; çoğul ve soru kurma;
cümle dizme, uygun olmayanı bulma ve أَنْ / لِـ + mansûb) iki bayram kartları, bayram günü sırası, karar makinesi (9 fiil × 6 kişi),
kitaptaki 10 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Ramazan mı Kurban mı?, Doğru mu
Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 37 kelimesini çalıştırır.
Veriler `kiraat17/veri.js` içindedir; sonra `python3 kiraat17/yap.py`.

## Uygulama: Kıraat 18 — İstanbul

`kiraat18/sayfa.html` (aynısı `kiraat18/index.html`) إِسْطَنْبُولُ okuma-anlama dersini beş bölümde (okumaya hazırlık ve metin;
metni anlama, ✓/✗, A–B eşleştirme ve eser türlerini ayırma; boşluk doldurma, cümle tamamlama ve ism-i tafdîl; eş, zıt anlam ve
çoğul; kelime tanımı, cümle dizme ve مِنْ حَيْثُ، مِنْ قِبَلِ، تَجْمَعُ بَيْنَ kalıpları) iki kıta kartları, tarih çizgisi, tafdîl makinesi
(6 sıfat × 4 kalıp), kitaptaki 10 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Cami mi Saray mı
Kule mi?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 38
kelimesini çalıştırır. Veriler `kiraat18/veri.js` içindedir; sonra `python3 kiraat18/yap.py`.

## Uygulama: Kıraat 19 — İki Kutsal Şehir

`kiraat19/sayfa.html` (aynısı `kiraat19/index.html`) مَدِينَتَانِ مُقَدَّسَتَانِ okuma-anlama dersini beş bölümde (okumaya hazırlık ve
metin; metni anlama, ✓/✗, A–B eşleştirme ve Mekke–Medine ayırma; boşluk doldurma, eş ve zıt anlam; çoğul, cümle tamamlama ve
hicret şiiri; cümle dizme, مِنْ أَهَمِّ مَعَالِمِ…، أَمَّا… فَـ…، مُنْذُ ذَلِكَ الوَقْتِ ve كَانَ / أَصْبَحَ) Mekke–Medine kartları, karşılaştırma
makinesi (6 konu × 3 kalıp), طَلَعَ البَدْرُ عَلَيْنَا şiiri, kitaptaki 10 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime,
Düzelt ve Dönüştür, Mekke mi Medine mi?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime
Hazinesi” sekmesi dersin 37 kelimesini çalıştırır. Veriler `kiraat19/veri.js` içindedir; sonra `python3 kiraat19/yap.py`.

## Uygulama: Kıraat 21 — Ramazan Âdetleri

`kiraat21/sayfa.html` (aynısı `kiraat21/index.html`) العَادَاتُ الرَّمَضَانِيَّةُ okuma-anlama dersini beş bölümde (okumaya hazırlık ve
metin; metni anlama, ✓/✗ ve Şam atasözü; eş ve zıt anlam; çoğul, birlikte gelen kelimeler ve kelime kullanma; cümle dizme,
harf-i cerler, ramazan âdetleri ve لِـ / حَتَّى ile amaç) ramazan kartları, amaç makinesi (6 cümle × 3 kalıp), “üç on” atasözü,
kitaptaki 10 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Hangi Harf-i Cer?, Doğru mu Yanlış
mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 38 kelimesini çalıştırır. Veriler
`kiraat21/veri.js` içindedir; sonra `python3 kiraat21/yap.py`.

## Uygulama: Kıraat 22 — Hac İbadeti

`kiraat22/sayfa.html` (aynısı `kiraat22/index.html`) عِبَادَةُ الحَجِّ okuma-anlama dersini beş bölümde (okumaya hazırlık ve metin;
metni anlama, ✓/✗, A–B eşleştirme ve haccın şartları; aşamaları sıralama ve menâsikin yeri; çoğul, eş ve zıt anlam; cümle
dizme, يَقُومُ بِـ، يَجِبُ عَلَى، اسْتَطَاعَ kalıpları ve hadisler) şart–fazilet kartları, hac rehberi makinesi (8 aşama × ne / nerede /
ne zaman), adım adım hac yolu, kitaptaki 9 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür,
Nerede Yapılır?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin
37 kelimesini çalıştırır. Veriler `kiraat22/veri.js` içindedir; sonra `python3 kiraat22/yap.py`.

## Uygulama: Kıraat 23 (kitap) — İletişim Araçları

`kiraat23b/sayfa.html` (aynısı `kiraat23b/index.html`) ders kitabının 23. konusu وَسَائِلُ الاتِّصَالِ’yi beş bölümde (okumaya
hazırlık ve metin; metni anlama, ✓/✗ ve eski–yeni ayırma; eş ve zıt anlam; tekil–çoğul, tanımlar ve soru kurma; kelime kullanma,
olumlu–olumsuz yönler, kitaptaki tavsiyeler ve etken–edilgen fiil) eski–yeni kartları, icat makinesi (8 icat × etken / edilgen /
mastar), icatlar zinciri, kitaptaki 9 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Eski mi Yeni
mi?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 38 kelimesini
çalıştırır. Veriler `kiraat23b/veri.js` içindedir; sonra `python3 kiraat23b/yap.py`. (`kiraat23/` klasöründeki “İslâm’da Cihad
Kavramı” ayrı bir derstir.)

## Uygulama: Kıraat 24 — Emevî Camii

`kiraat24/sayfa.html` (aynısı `kiraat24/index.html`) المَسْجِدُ الأُمَوِيُّ okuma-anlama dersini beş bölümde (okumaya hazırlık ve metin;
metni anlama, ✓/✗ ve düzeltme, sayıların anlamı, Emevî–Sultanahmet ayırma; Sultanahmet paragrafı ve boşluk doldurma; eş, zıt anlam
ve tekil–çoğul; harf-i cerler, kelime kullanma ve sayı–sayılan uyumu) yer–bölüm kartları, sayı makinesi (9 bilgi × soru / rakam /
yazı), mabetten mescide tarih çizgisi, kitaptaki 10 etkinliğin hepsi, ek etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür,
Emevî mi Sultanahmet mi?, Doğru mu Yanlış mı?, Hafıza Kartları) ve 20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi
dersin 37 kelimesini çalıştırır. Veriler `kiraat24/veri.js` içindedir; sonra `python3 kiraat24/yap.py`.

## Uygulama: Kıraat 25 — Orta Doğu: Konumu ve Önemi

`kiraat25/sayfa.html` (aynısı `kiraat25/index.html`) الشَّرْقُ الأَوْسَطُ: مَوْقِعُهُ وَأَهَمِّيَّتُهُ okuma-anlama dersini (kitabın son
dersi) beş bölümde (okumaya hazırlık ve metin; metni anlama, ✓/✗ ve düzeltme, önem türü ve boğazlar; Suriye paragrafı ve boşluk
doldurma; eş, zıt anlam ve çoğul; kelimeleri sıralama, kelime kullanma ve harf-i cerler) dinî–coğrafî–iktisadî önem kartları, su
yolları makinesi (5 boğaz/kanal × soru / nerede / neyi bağlar), metnin beş paragraf çizgisi, kitaptaki 8 etkinliğin hepsi, ek
etkinlikler, beş oyun (Eksik Kelime, Düzelt ve Dönüştür, Dinî mi Coğrafî mi İktisadî mi?, Doğru mu Yanlış mı?, Hafıza Kartları) ve
20 soruluk quiz provasıyla işler. “Kelime Hazinesi” sekmesi dersin 46 kelimesini çalıştırır. Veriler `kiraat25/veri.js` içindedir;
sonra `python3 kiraat25/yap.py`.

## Uygulama: Okuma Kelime Hazinesi 2 (Okuma-anlama 11–25)

`okumakelime2/index.html` (yayın sürümü `okumakelime2/sayfa.html`) okuma-anlama dersinin 11–25. konularında geçen 844 kaydı
(745 ayrı kelime ve terkip: 353 isim, 95 sıfat, 165 fiil, 5 zarf, 127 terkip) anlamı, Arapçası, çoğulu (ve çoğul kalıbı), eş
ve zıt anlamlısı ve dersteki örnek cümlesiyle öğretir. Liste, 11–25. derslerin “Kelime Hazinesi” verileriyle (23. ders için
kitaptaki “İletişim Araçları”, `kiraat23b`) ders kitabının sonundaki kelime cetvelinin (isimler–sıfatlar–zarflar, fiiller,
terkipler) birleşimidir; birden çok derste geçen kelime her dersinde görünür. Dersler üç gruptadır (11–15, 16–20, 21–25).
Günlük tekrar, sekmeler ve sekiz oyun 1–10 programıyla aynıdır; ilerleme ayrı saklanır. Kelimeler
`okumakelime2/kelimeler.json` içindedir; değiştirdikten sonra `python3 okumakelime2/yap.py` çalıştırılır.
