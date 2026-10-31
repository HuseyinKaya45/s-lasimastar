// Bütün kalıpları kontrol için çizelge üretir: node _kaynak/emsile-tezgahi/kaliplar.mjs → dogrulama/emsile-kalip-cizelgesi.html
import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const D=path.dirname(fileURLToPath(import.meta.url));
const src=fs.readFileSync(path.join(D,'engine.js'),'utf8');
const E=new Function(src+';return {BABS,ROOTS,TABLES,MUH,SIGA,FAIL,FAIL_TR,MEF,MEF_TR,fill,babOf,mzStem,muStem,V};')();
const {BABS,ROOTS,TABLES,MUH,SIGA,FAIL,FAIL_TR,MEF,MEF_TR,fill,babOf}=E;
/* her bâbın örnek kökü: kök listesindeki örnek fiiller */
const MODEL={1:'نصر',2:'ضرب',3:'فتح',4:'علم',5:'كرم',6:'حسب'};
const rootOf=b=>[...MODEL[b.id]];
const h=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const head=`<tr><th>#</th><th>Kalıp</th>${BABS.map(b=>`<th>${b.id}. bâb<br><span class="ar s">${MODEL[b.id].split('').join(' ')}</span></th>`).join('')}<th>Düzeltme</th></tr>`;
const dash='<span class="muted">—</span>';
/* A) 24 muhtelife kalıp */
const muhRows=MUH.map((m,i)=>{
  const cells=BABS.map(b=>{
    if(m.masdar){const d=ROOTS.find(x=>x.r===MODEL[b.id]);return `<td class="ar">${d?[d.ms].concat(d.m2||[]).join(' · '):dash}<div class="s muted">semâî</div></td>`;}
    if(m.id==='fail'){const d=ROOTS.find(x=>x.r===MODEL[b.id]);return `<td class="ar">${d&&d.sf?`${h(d.sf)}<div class="s muted">sıfat-ı müşebbehe</div>`:fill(m.t(b),rootOf(b))}</td>`;}
    if(m.id==='mef'){const d=ROOTS.find(x=>x.r===MODEL[b.id]);return `<td class="ar">${d&&d.lz?(d.mc?fill(m.t(b),rootOf(b))+' '+d.mc:dash+'<div class="s muted">lâzım</div>'):fill(m.t(b),rootOf(b))}</td>`;}
    if(m.id==='zarf'){const w=[fill('مَFْAَLٌ',rootOf(b)),fill('مَFْAِLٌ',rootOf(b))];return `<td class="ar">${b.mu==='i'?w[1]+' (zaman/mekân) · '+w[0]+' (mîmî)':w[0]}</td>`;}
    if(!m.t)return `<td>${dash}</td>`;
    const w=fill(m.t(b),rootOf(b));const p=m.p?fill(m.p(b),rootOf(b)):null;
    return `<td class="ar">${w}${p?`<div class="s muted">meçhûl: <span class="ar">${p}</span></div>`:''}</td>`;
  }).join('');
  return `<tr><td>${i+1}</td><td><b>${h(m.tr)}</b><div class="ar s">${h(m.ar)}</div><div class="s muted">${h(m.g)}</div></td>${cells}<td></td></tr>`;
}).join('');
/* B) 14 sîga tabloları: her tablo için 14 satır × 6 bâb */
const tableSecs=TABLES.map((t,ti)=>{
  const rows=SIGA.map((s,i)=>{
    if(t.only&&!t.only.includes(i))return '';
    return `<tr><td>${i+1}</td><td class="ar">${s.z}<div class="s muted">${h(s.tr)}</div></td>${BABS.map(b=>`<td class="ar">${fill(t.f(b,i),rootOf(b))}</td>`).join('')}<td></td></tr>`;
  }).join('');
  return `<h3>${ti+1}. ${h(t.tr)} <span class="ar">${h(t.ar)}</span></h3><p class="s muted">${h(t.d)}</p><table>${head.replace('<th>Kalıp</th>','<th>Zamir / sîga</th>')}${rows}</table>`;
}).join('');
/* C) bâb kalıpları */
const babRows=BABS.map(b=>`<tr><td>${b.id}</td><td class="ar">${h(b.ar)}</td><td class="ar">${h(b.vz)}</td><td>${h(b.tr)}</td><td>${h(b.note)}</td><td></td></tr>`).join('');
/* D) ism-i fâil / mef'ûl çoğul kalıpları */
const fm=(arr,tr,tpl)=>arr.map((w,i)=>`<tr><td>${i+1}</td><td>${h(tr[i])}</td><td class="ar">${w}</td><td class="ar">${BABS.map(b=>fill(w,rootOf(b))).join(' · ')}</td><td></td></tr>`).join('');
const html=`<!doctype html><meta charset="utf-8"><title>Emsile Ocağı — kalıp çizelgesi</title><style>
body{font:14px/1.5 system-ui,sans-serif;margin:20px;color:#111}.ar{font-family:"Noto Naskh Arabic","Traditional Arabic",serif;direction:rtl;font-size:1.25em}
.s{font-size:.78rem}.muted{color:#666}table{border-collapse:collapse;width:100%;margin-bottom:24px}td,th{border:1px solid #999;padding:4px 6px;text-align:left;vertical-align:top}td.ar{text-align:right}th{background:#eee}
h2{margin:30px 0 6px;border-bottom:2px solid #333}h3{margin:20px 0 4px}@media print{h2,h3{break-after:avoid}tr{break-inside:avoid}}</style>
<h1>Emsile Ocağı — bütün kalıpların kontrol çizelgesi</h1>
<p>Bu çizelge programdaki bütün kalıpları, her bâbın örnek köküyle üretilmiş hâlde gösterir. Altı bâbın örnek kökleri sütun başlarındadır: 1. bâb <span class="ar">نصر</span>, 2. bâb <span class="ar">ضرب</span>, 3. bâb <span class="ar">فتح</span>, 4. bâb <span class="ar">علم</span>, 5. bâb <span class="ar">كرم</span>, 6. bâb <span class="ar">حسب</span>. Yanlış gördüğünü “Düzeltme” sütununa yaz. Çekimler kuralla üretilir; masdar ve sıfat gibi semâî olanlar kök listesinden gelir.</p>
<p class="s muted">İçindekiler: A) Bâb tanımları · B) 24 muhtelife kalıp (ezber sırası) · C) 14 sîgalı çekim tabloları · D) İsm-i fâil ve ism-i mef'ûl çoğul/müennes kalıpları</p>
<h2>A) Sülâsî mücerred bâblar</h2><table><tr><th>#</th><th>Örnek</th><th>Vezin</th><th>Ad</th><th>Açıklama</th><th>Düzeltme</th></tr>${babRows}</table>
<h2>B) Emsile-i muhtelife: 24 kalıp</h2><table>${head}${muhRows}</table>
<h2>C) 14 sîgalı çekim tabloları</h2>${tableSecs}
<h2>D) İsm-i fâil ve ism-i mef'ûl kalıpları</h2>
<h3>İsm-i fâil</h3><table><tr><th>#</th><th>Tür</th><th>Kalıp</th><th>6 bâbdan örnekler</th><th>Düzeltme</th></tr>${fm(FAIL,FAIL_TR)}</table>
<h3>İsm-i mef'ûl</h3><table><tr><th>#</th><th>Tür</th><th>Kalıp</th><th>6 bâbdan örnekler</th><th>Düzeltme</th></tr>${fm(MEF,MEF_TR)}</table>
`;
fs.mkdirSync(path.join(D,'../../dogrulama'),{recursive:true});
fs.writeFileSync(path.join(D,'../../dogrulama/emsile-kalip-cizelgesi.html'),html);
console.log('yazıldı:',MUH.length,'muhtelife,',TABLES.length,'tablo');
