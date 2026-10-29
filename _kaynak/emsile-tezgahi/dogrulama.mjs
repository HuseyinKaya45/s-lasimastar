// Kök listesi doğrulama kâğıdı üretir: node _kaynak/emsile-tezgahi/dogrulama.mjs  → dogrulama/emsile-kok-listesi.html
import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const D=path.dirname(fileURLToPath(import.meta.url));
const src=fs.readFileSync(path.join(D,'engine.js'),'utf8');
const E=new Function(src+';return {ROOTS,BABS,babOf,fill,mzStem,muStem,V,MUH,trCek};')();
const {ROOTS,BABS,babOf,fill,mzStem,muStem,V,trCek}=E;
const satir=(d,i)=>{const b=babOf(d.b),r=[...d.r];
  const maz=fill(mzStem(b)+V.a,r),muz=fill('يَ'+muStem(b)+V.u,r);
  const fail=d.sf&&d.b===6?d.sf+' <i>(sıfat-ı müşebbehe)</i>':fill('FَاAِLٌ',r),mef=d.lz?(d.mc?fill('مَFْAُوLٌ ',r)+d.mc+' <i>(harf-i cerle)</i>':'<i>kullanılmaz / pek kullanılmaz</i>'):fill('مَFْAُوLٌ',r);
  return `<tr><td>${i+1}</td><td class="ar">${d.r.split('').join(' ')}</td><td>${b.id}</td><td class="ar">${maz} ${muz}</td><td class="ar">${[d.ms,d.m2].filter(Boolean).join(' · ')}</td><td class="ar">${fail}</td><td class="ar">${mef}</td><td>${d.tr}${d.lz?' <i>(lâzım)</i>':''}</td><td>${(c=>[c.mazi,c.muz.split(' / ')[0],c.fail,d.lz?'—':c.mef].join(' · '))(trCek(d.tk))}</td><td></td></tr>`};
const gruplar=BABS.map(b=>`<h2>${b.id}. bâb — ${b.tr} <span class="ar">${b.ar}</span></h2><table><tr><th>#</th><th>Kök</th><th>Bâb</th><th>Mâzî · Muzâri</th><th>Masdar</th><th>İsm-i fâil</th><th>İsm-i mef'ûl</th><th>Anlam</th><th>Türkçe (mâzî · muzâri · fâil · mef'ûl)</th><th>Düzeltme</th></tr>${ROOTS.filter(x=>x.b===b.id).map((d,i)=>satir(d,i)).join('')}</table>`).join('');
const html=`<!doctype html><meta charset="utf-8"><title>Emsile Tezgâhı — kök listesi doğrulama kâğıdı</title><style>
body{font:14px/1.5 system-ui,sans-serif;margin:20px;color:#111}.ar{font-family:"Noto Naskh Arabic","Traditional Arabic",serif;direction:rtl;font-size:1.25em}
table{border-collapse:collapse;width:100%;margin-bottom:24px}td,th{border:1px solid #999;padding:4px 6px;text-align:left;vertical-align:top}td.ar{text-align:right}th{background:#eee}h2{margin:22px 0 6px}
@media print{h2{break-after:avoid}tr{break-inside:avoid}}</style>
<h1>Emsile Tezgâhı — kök listesi doğrulama kâğıdı</h1>
<p>Her satırda programın o kök için ürettiği bâb, mâzî-muzâri, masdar(lar), ism-i fâil ve ism-i mef'ûl vardır. Yanlış gördüğünü “Düzeltme” sütununa yaz. Masdarlar programa elle girilmiş (semâî) verilerdir; mâzî, muzâri, fâil ve mef'ûl ise kuralla üretilir. Türkçe sütunu, kökün Türkçe mastarından kuralla üretilir; yanlış gördüğünü yaz. Lâzım (geçişsiz) fiillerde ism-i mef'ûl harf-i cerle kullanılır.</p>
<p>Toplam <b>${ROOTS.length}</b> kök.</p>${gruplar}`;
fs.mkdirSync(path.join(D,'../../dogrulama'),{recursive:true});
fs.writeFileSync(path.join(D,'../../dogrulama/emsile-kok-listesi.html'),html);console.log('yazıldı',ROOTS.length);
