// Motor testi: node _kaynak/emsile-tezgahi/test_motor.mjs  (hata varsa çıkış kodu 1)
import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const D=path.dirname(fileURLToPath(import.meta.url));
const E=new Function(fs.readFileSync(path.join(D,'engine.js'),'utf8')+';let MAZIDX;try{MAZIDX=MAZID}catch(e){}return {ROOTS,BABS,TABLES,MUH,SIGA,FAIL,MEF,MAZID:MAZIDX,babOf,fill,checkRoot,masdarOf,trCek,trCekD};')();
const {ROOTS,BABS,TABLES,MUH,SIGA,FAIL,MEF,MAZID,babOf,fill,checkRoot,masdarOf,trCek,trCekD}=E;
let hata=0;const t=(ok,m)=>{if(!ok){hata++;console.log('HATA:',m)}};
const N=x=>x.normalize('NFC');const strip=s=>s.replace(/[ً-ْٰ]/g,'');
// 1) Klasik örnekler (Emsile'nin bilinen çekimleri)
const nsr=[...'نصر'],b1=babOf(1),T=id=>TABLES.find(x=>x.id===id);
const beklenen={mazi:['نَصَرَ','نَصَرَا','نَصَرُوا','نَصَرَتْ','نَصَرَتَا','نَصَرْنَ','نَصَرْتَ','نَصَرْتُمَا','نَصَرْتُمْ','نَصَرْتِ','نَصَرْتُمَا','نَصَرْتُنَّ','نَصَرْتُ','نَصَرْنَا'],
 muz:['يَنْصُرُ','يَنْصُرَانِ','يَنْصُرُونَ','تَنْصُرُ','تَنْصُرَانِ','يَنْصُرْنَ','تَنْصُرُ','تَنْصُرَانِ','تَنْصُرُونَ','تَنْصُرِينَ','تَنْصُرَانِ','تَنْصُرْنَ','أَنْصُرُ','نَنْصُرُ'],
 maziP:['نُصِرَ','نُصِرَا','نُصِرُوا','نُصِرَتْ','نُصِرَتَا','نُصِرْنَ','نُصِرْتَ','نُصِرْتُمَا','نُصِرْتُمْ','نُصِرْتِ','نُصِرْتُمَا','نُصِرْتُنَّ','نُصِرْتُ','نُصِرْنَا']};
for(const [id,ws] of Object.entries(beklenen))ws.forEach((w,i)=>t(N(fill(T(id).f(b1,i),nsr))===N(w),`نصر ${id} ${i+1}: ${fill(T(id).f(b1,i),nsr)} ≠ ${w}`));
t(fill(T('emr').f(b1,6),nsr)==='اُنْصُرْ','emir نصر');t(fill(T('emr').f(babOf(2),6),[...'ضرب'])==='اِضْرِبْ','emir ضرب');
// 2) İdğam: lâmı ن ve ت olan köklerde
t(N(fill(T('mazi').f(b1,13),[...'سكن']))===N('سَكَنَّا'),'idğam سكن نحن');t(N(fill(T('mazi').f(b1,5),[...'سكن']))===N('سَكَنَّ'),'idğam سكن هن');t(N(fill(T('muz').f(b1,5),[...'سكن']))===N('يَسْكُنَّ'),'idğam سكن يسكنّ');
// 2b) Türkçe karşılıklar (altın örnekler)
const TC={ 'yazmak':{mazi:'Yazdı',muz:'Yazar / yazıyor / yazacak',fail:'Yazan',mef:'Yazılan',lem:'Yazmadı',nhal:'Yazmıyor',nist:'Yazmayacak',gaib:'Yazsın',nehyG:'Yazmasın',emr:'Yaz',nehyH:'Yazma'},
 'yardım etmek':{mazi:'Yardım etti',muz:'Yardım eder / yardım ediyor / yardım edecek',fail:'Yardım eden',mef:'Yardım edilen',lem:'Yardım etmedi'},
 'gitmek':{mazi:'Gitti',muz:'Gider / gidiyor / gidecek',fail:'Giden',mef:'Gidilen'},
 'okumak':{mazi:'Okudu',muz:'Okur / okuyor / okuyacak',fail:'Okuyan',mef:'Okunan',gaib:'Okusun'},
 'bilmek':{mazi:'Bildi',muz:'Bilir / biliyor / bilecek',fail:'Bilen',mef:'Bilinen'},
 'vurmak':{mazi:'Vurdu',muz:'Vurur / vuruyor / vuracak',mef:'Vurulan'},
 'öldürmek':{mazi:'Öldürdü',muz:'Öldürür / öldürüyor / öldürecek',mef:'Öldürülen',nhal:'Öldürmüyor'},
 'istemek':{mazi:'İstedi',muz:'İster / istiyor / isteyecek',fail:'İsteyen',mef:'İstenen'},
 'kaçmak':{mazi:'Kaçtı',muz:'Kaçar / kaçıyor / kaçacak'},'düşmek':{mazi:'Düştü',muz:'Düşer / düşüyor / düşecek'},'toplamak':{mazi:'Topladı',muz:'Toplar / topluyor / toplayacak',mef:'Toplanan'}};
for(const [tk,ex] of Object.entries(TC)){const o=trCek(tk);for(const [id,w] of Object.entries(ex))t(o[id]===w,`Türkçe ${tk} ${id}: ${o[id]} ≠ ${w}`)}
const R1=r=>ROOTS.find(x=>x.r===r);
t(trCekD(R1('فهم')).mef==='Anlaşılan','فهم mef Anlaşılan');t(trCekD(R1('غلب')).mef==='Yenilen','غلب mef Yenilen');t(trCekD(R1('جهل')).mef==='Bilinmeyen','جهل mef');t(trCekD(R1('صرف')).mef==='Çevrilen','صرف mef');t(trCekD(R1('فصل')).mef==='Ayrılan','فصل mef');
t(!R1('عدل').mc,'عدل: عَنْهُ ayrı anlam, örnek verilmedi');t(R1('غضب').mc==='عَلَيْهِ','غضب مَغْضُوبٌ عَلَيْهِ');t(!R1('حسب').m2,'حسب tek masdar');
// 2c) İsm-i zaman/mekân ve masdar-ı mîmî ayrımı
const z=MUH.find(m=>m.id==='zarf');t(N(fill(z.t(babOf(2)),[...'ضرب']))===N('مَضْرِبٌ'),'ضرب zaman/mekân مَضْرِبٌ');t(N(fill(z.t(babOf(1)),nsr))===N('مَنْصَرٌ'),'نصر zaman/mekân مَنْصَرٌ');
// 3) Kök listesi tutarlılığı
const gor=new Set();
for(const d of ROOTS){t(!gor.has(d.r),'tekrar kök '+d.r);gor.add(d.r);t(!checkRoot([...d.r]),'geçersiz kök '+d.r);t(babOf(d.b),'bâb yok '+d.r);
  t(/[ً-ٍ]/.test(d.ms),'masdar harekesiz '+d.r);t(masdarOf(d).every(m=>strip(m).length>=3),'masdar kısa '+d.r);
  t(d.tr&&d.tr.length>2,'anlam yok '+d.r);t(d.tk&&/m[ae]k$/.test(d.tk),'Türkçe mastar yok '+d.r);for(const [id,w] of Object.entries(trCekD(d)))t(w&&!/undefined|NaN/.test(w),'Türkçe bozuk '+d.r+' '+id);if(d.b===5)t(d.sf,'kerume sıfatı yok '+d.r);
  // masdar kökün harflerini içermeli (sülâsî)
  const k=[...d.r];t(masdarOf(d).every(m=>k.every(h=>strip(m).includes(h))),'masdar kökü içermiyor '+d.r);
  // 24 kalıp: hiçbiri boş üretmemeli
  for(const m of MUH){if(m.masdar)continue;const w=m.t(babOf(d.b));t(w&&fill(w,k).length>=3,`kalıp boş ${d.r} ${m.id}`)}
  // 14 sîga: tablo çekimleri üretilmeli
  for(const tb of TABLES)for(let i=0;i<14;i++){if(tb.only&&!tb.only.includes(i))continue;const w=fill(tb.f(babOf(d.b),i),k);t(w&&!/[FAL]/.test(w),`çekim bozuk ${d.r} ${tb.id} ${i+1}`)}}
// düzeltmeler: tablo sayısı, çoğul sıralaması, şâz mimli biçimler
t(!TABLES.some(x=>x.id==='nun'),'nûn-ı sakîle tablosu kaldırılmalı');t(TABLES.length===9,'tablo sayısı '+TABLES.length);
t(FAIL.indexOf('FُAَّاLٌ')<FAIL.indexOf('FُAَّLٌ'),'فُعَّال önce gelmeli');t(MEF[MEF.length-1]==='مَFَاAِيLُ','مَفَاعِيلُ en sonda olmalı');
t(typeof MAZID==='undefined','mezîd bâblar kaldırılmalı');
const MMX={غفر:'مَغْفِرَةٌ',رجع:'مَرْجِعٌ',طلع:'مَطْلِعٌ',حشر:'مَحْشِرٌ',سكن:'مَسْكِنٌ',سجد:'مَسْجِدٌ',جمع:'مَجْمِعٌ',سقط:'مَسْقِطٌ',نفع:'مَنْفَعَةٌ'};
for(const [r,w] of Object.entries(MMX)){const d=ROOTS.find(x=>x.r===r);t(d&&d.mm&&fill(d.mm,[...r]).replace(/[\u064b-\u0652]/g,'')===w.replace(/[\u064b-\u0652]/g,'')&&fill(d.mm,[...r])===w.replace('ٌ','ٌ'),'mimli '+r+' '+(d&&fill(d.mm,[...r])))}
t(ROOTS.find(x=>x.r==='سجد').mz===ROOTS.find(x=>x.r==='سجد').mm,'سجد: zaman/mekân/masdar aynı');
t(ROOTS.find(x=>x.r==='حسب').tr==='hesaplamak'&&ROOTS.find(x=>x.r==='حسب').b===6,'حسب hesaplamak, 6. bâb');
console.log(hata?hata+' hata':'tüm kontroller geçti ('+ROOTS.length+' kök)');process.exit(hata?1:0);
