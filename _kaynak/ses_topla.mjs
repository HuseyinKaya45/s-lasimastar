// Programların seslendirdiği Arapça metinleri toplar: node _kaynak/ses_topla.mjs [program ...]
// Her programı tarayıcıda açar, sesPlay'i dinler, ekranları gezerek tıklar ve
// data-say metinlerini de alır. Sonuç: _kaynak/ses/<program>.txt (satır başına bir metin;
// önceki taramalarla birleştirilir, tekrar çalıştırmak kapsamı artırır).
import {createRequire} from 'module';const {chromium}=createRequire(import.meta.url)('playwright');
import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const K=path.dirname(fileURLToPath(import.meta.url)),R=path.dirname(K);
const ALL=['avamil-birgivi','avamil-curcani','bina-ef-al','emsile-tezgahi','izhar-esrar','maksud-darphanesi','usul-lafizlar'];
const SURE=+(process.env.SURE||240)*1000;
fs.mkdirSync(path.join(K,'ses'),{recursive:true});
const br=await chromium.launch();
for(const p of (process.argv.slice(2).length?process.argv.slice(2):ALL)){
  const pg=await br.newPage();pg.on('dialog',d=>d.dismiss().catch(()=>{}));
  await pg.goto('file://'+path.join(R,p,'index.html'));
  await pg.evaluate(()=>{window.__said=new Set();window.open=()=>null;window.print=()=>{};
    window.sesPlay=(t,onend)=>{window.__said.add(String(t));if(onend)setTimeout(onend,0);return true;};});
  const said=new Set(),seen=new Map();const t0=Date.now();let n=0;
  const harvest=async()=>{for(const t of await pg.evaluate(()=>{const a=[...window.__said];window.__said.clear();
    document.querySelectorAll('[data-say]').forEach(e=>a.push(e.dataset.say));return a;}))said.add(t);};
  while(Date.now()-t0<SURE){
    const c=await pg.evaluate(()=>{const v=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};
      return [...document.querySelectorAll('button,a,[onclick],[data-say],[data-go],[data-i],[role=button],summary,label,.card,.opt,[tabindex]')]
        .filter(v).map((e,i)=>{e.dataset.__k=i;return {i,k:e.tagName+'|'+(e.getAttribute('href')||'')+'|'+(e.textContent||'').trim().slice(0,40)};});});
    if(!c.length){await pg.goto('file://'+path.join(R,p,'index.html'));continue;}
    // önce az tıklananlar
    c.sort((a,b)=>(seen.get(a.k)||0)-(seen.get(b.k)||0)+Math.random()-.5);
    const x=c[Math.random()<.8?0:Math.floor(Math.random()*c.length)];seen.set(x.k,(seen.get(x.k)||0)+1);
    try{await pg.evaluate(i=>{const e=document.querySelector(`[data-__k="${i}"]`);if(e&&!(e.tagName==='A'&&/^(https?:|mailto:)/.test(e.getAttribute('href')||'')))e.click();},x.i);}catch(e){}
    if(++n%5===0)await harvest();
    if(n%400===0)await pg.evaluate(()=>{location.hash='';});
  }
  await harvest();
  const out=[...said].map(t=>t.normalize('NFC').replace(/\s+/g,' ').trim()).filter(t=>/[؀-ۿ]/.test(t));
  const f=path.join(K,'ses',p+'.txt'),eski=fs.existsSync(f)?fs.readFileSync(f,'utf8').split('\n').filter(Boolean):[];
  const u=[...new Set([...eski,...out])].sort();
  fs.writeFileSync(f,u.join('\n')+'\n');
  console.log(p,'tıklama',n,'yeni',u.length-eski.length,'metin',u.length,'harf',u.join('').length);
  await pg.close();
}
await br.close();
