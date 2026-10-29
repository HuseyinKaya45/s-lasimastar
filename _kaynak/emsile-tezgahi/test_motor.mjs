// Motor testi: node _kaynak/emsile-tezgahi/test_motor.mjs  (hata varsa çıkış kodu 1)
import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const D=path.dirname(fileURLToPath(import.meta.url));
const E=new Function(fs.readFileSync(path.join(D,'engine.js'),'utf8')+';return {ROOTS,BABS,TABLES,MUH,SIGA,babOf,fill,checkRoot,masdarOf,MAZID};')();
const {ROOTS,BABS,TABLES,MUH,SIGA,babOf,fill,checkRoot,masdarOf}=E;
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
// 3) Kök listesi tutarlılığı
const gor=new Set();
for(const d of ROOTS){t(!gor.has(d.r),'tekrar kök '+d.r);gor.add(d.r);t(!checkRoot([...d.r]),'geçersiz kök '+d.r);t(babOf(d.b),'bâb yok '+d.r);
  t(/[ً-ٍ]/.test(d.ms),'masdar harekesiz '+d.r);t(masdarOf(d).every(m=>strip(m).length>=3),'masdar kısa '+d.r);
  t(d.tr&&d.tr.length>2,'anlam yok '+d.r);if(d.b===6)t(d.sf,'kerume sıfatı yok '+d.r);
  // masdar kökün harflerini içermeli (sülâsî)
  const k=[...d.r];t(masdarOf(d).every(m=>k.every(h=>strip(m).includes(h))),'masdar kökü içermiyor '+d.r);
  // 24 kalıp: hiçbiri boş üretmemeli
  for(const m of MUH){if(m.masdar)continue;const w=m.t(babOf(d.b));t(w&&fill(w,k).length>=3,`kalıp boş ${d.r} ${m.id}`)}
  // 14 sîga: tablo çekimleri üretilmeli
  for(const tb of TABLES)for(let i=0;i<14;i++){if(tb.only&&!tb.only.includes(i))continue;const w=fill(tb.f(babOf(d.b),i),k);t(w&&!/[FAL]/.test(w),`çekim bozuk ${d.r} ${tb.id} ${i+1}`)}}
console.log(hata?hata+' hata':'tüm kontroller geçti ('+ROOTS.length+' kök)');process.exit(hata?1:0);
