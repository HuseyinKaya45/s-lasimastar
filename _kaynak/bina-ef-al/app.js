/* ===== Binâ Sarayı — uygulama ===== */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const app=$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const A=(s,c='')=>`<span class="ar ${c}">${esc(s)}</span>`;
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);
const G=id=>GROUPS.find(g=>g.id===id);
const SLOTS=['m','u','e','f','s'];
const babSlots=B=>B.T.s?SLOTS:['m','u','e','f'];
const gcol=B=>G(B.g).col;
const fLabel=B=>B.fLbl||'İsm-i fâil';
const ICON={
 play:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
 arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 back:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
 sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 snd:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7"/></svg>',
 mute:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6"/></svg>',
 scale:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M5 21h14M4 7h16M7 7l-3 7a3 3 0 0 0 6 0L7 7zM17 7l-3 7a3 3 0 0 0 6 0l-3-7z"/></svg>',
 hunt:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></svg>',
 brick:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 15h18M9 4v5M15 9v6M9 15v5"/></svg>',
 elev:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="m9 8 3-3 3 3M9 16l3 3 3-3"/></svg>',
 mem:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
 door:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21V9a8 8 0 0 1 16 0v12M2 21h20M12 13v2"/></svg>',
 bulb:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/></svg>',
 crane:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4M2 22h8M6 4h15M6 4l4 4M21 4v5M19 9h4v4h-4z"/></svg>',
 det:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="15" r="4"/><circle cx="17" cy="15" r="4"/><path d="M11 15h2M3 15 5 6h4M21 15l-2-9h-4"/></svg>',
 tree:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-5h14v5"/></svg>',
 merge:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v6a6 6 0 0 0 6 6M18 3v6a6 6 0 0 1-6 6v6"/></svg>',
 card:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="15" height="13" rx="2"/><path d="M7 3h13a2 2 0 0 1 2 2v11"/></svg>',
 seven:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 8h6l-4 9"/></svg>',
 exam:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v3H9zM6 5H5a1 1 0 0 0-1 1v15h16V6a1 1 0 0 0-1-1h-1M8 12l2 2 4-4M8 17h8"/></svg>'
};
/* ---------- durum ---------- */
const KEY='bina-sarayi-v1';
let S={v:1,xp:0,seen:{},stars:{},tat:{},cells:0,exams:[],best:{},played:{},cards:{},badges:{},snd:true,day:'',streak:0,name:''};
try{const t=JSON.parse(localStorage.getItem(KEY)||'null');if(t&&t.v===1)S=Object.assign(S,t);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
(function streak(){const d=new Date().toISOString().slice(0,10);if(S.day===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();})();
const LEVELS=[[0,'Çırak'],[300,'Kalfa'],[900,'Usta'],[1800,'Mimar'],[3200,'Ser-mimar'],[5000,'Mimar Sinan']];
function lvl(){let i=0;LEVELS.forEach((l,k)=>{if(S.xp>=l[0])i=k;});const cur=LEVELS[i][0],nx=LEVELS[i+1]?LEVELS[i+1][0]:cur+1;return {name:LEVELS[i][1],p:LEVELS[i+1]?(S.xp-cur)/(nx-cur):1,next:LEVELS[i+1]};}
function hud(){const l=lvl();$('#lvlName').textContent=l.name;$('#lvlBar').style.width=Math.round(l.p*100)+'%';$('#xp').textContent=S.xp;}
function addXP(n){const before=lvl().name;S.xp+=n;save();hud();const after=lvl().name;if(after!==before){toast('Tebrikler! Yeni rütbe: '+after);confetti();}}
/* ---------- ses ---------- */
let AC=null;
function beep(kind){if(!S.snd)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const seq=kind==='ok'?[[660,.07],[880,.1]]:kind==='no'?[[220,.16]]:kind==='win'?[[523,.08],[659,.08],[784,.08],[1046,.18]]:[[440,.05]];let t=AC.currentTime;seq.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=kind==='no'?'sawtooth':'triangle';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.18,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.02);t+=d;});}catch(e){}}
function speak(t){sesPlay(t,null,toast);}
let tT=0;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tT);tT=setTimeout(()=>t.hidden=true,2600);}
function confetti(){const c=$('#cf');c.hidden=false;const x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const cols=['#e7b54a','#4cc38a','#e98a5b','#6fa8ff','#c44f6a'];const P=Array.from({length:120},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*.5,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,s:4+Math.random()*5,r:Math.random()*6,c:pick(cols)}));let f=0;(function go(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=.1;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore();});if(++f<160)requestAnimationFrame(go);else{c.hidden=true;}})();}
/* ---------- tema / ses düğmeleri ---------- */
function themeBtn(){const dark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;$('#thm').innerHTML=dark?ICON.sun:ICON.moon;}
try{const th=localStorage.getItem(KEY+'-theme');if(th)document.documentElement.dataset.theme=th;}catch(e){}
$('#thm').onclick=()=>{const dark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=dark?'light':'dark';try{localStorage.setItem(KEY+'-theme',document.documentElement.dataset.theme);}catch(e){}themeBtn();};
function sndBtn(){$('#snd').innerHTML=S.snd?ICON.snd:ICON.mute;}
$('#snd').onclick=()=>{S.snd=!S.snd;save();sndBtn();};
/* ---------- rozetler ---------- */
const BADGES=[
 ['ilk','İlk Tuğla','İlk dersi oku',()=>Object.keys(S.seen).length>0],
 ['zemin','Zemin Kat','Sülâsî mücerredin 6 bâbında yıldız',()=>BABS.filter(b=>b.g==='sm').every(b=>S.stars[b.id])],
 ['mezid','Üst Katlar','Sülâsî mezîdin 12 bâbında yıldız',()=>BABS.filter(b=>/^z/.test(b.g)).every(b=>S.stars[b.id])],
 ['rubai','Rubâî Kanadı','Rubâî ve mülhak 17 bâbda yıldız',()=>BABS.filter(b=>!/^(sm|z)/.test(b.g)).every(b=>S.stars[b.id])],
 ['yuz','Yüz Satır','100 tatbikat hücresi doldur',()=>S.cells>=100],
 ['bin','Bin Tuğla','500 tatbikat hücresi doldur',()=>S.cells>=500],
 ['mutel','Mu‘tel Ustası','Altı mu‘tel tablosunu bitir',()=>MUTEL.every(m=>tatPct('m-'+m.id)>=1)],
 ['sinav','Mümtaz','Bir sınavdan %90 ve üstü al',()=>S.exams.some(e=>e.pct>=90)],
 ['oyun','Oyun Ehli','Yedi oyunun hepsini oyna',()=>GAMES.every(g=>S.played[g.id])],
 ['seri','Devamlılık','3 gün üst üste çalış',()=>S.streak>=3],
 ['saray','Saray Tamam','35 pencerenin hepsini yak',()=>BABS.every(b=>S.stars[b.id])]
];
function checkBadges(){BADGES.forEach(([id,t,,f])=>{if(!S.badges[id]&&f()){S.badges[id]=1;save();toast('Rozet kazandın: '+t);beep('win');}});}
/* ---------- yardımcı: çeldirici üretimi ---------- */
const VW=['َ','ُ','ِ'];
function mutate(s){const c=clusters(s);const idx=[];c.forEach((x,i)=>{if(i<c.length-1&&/[َُِ]/.test(x))idx.push(i);});if(!idx.length)return null;const i=pick(idx);const cur=c[i].match(/[َُِ]/)[0];c[i]=c[i].replace(cur,pick(VW.filter(v=>v!==cur)));return c.join('');}
const MS_PAT=['FَAْL','FُAُول','FِAَاLَة','FَAَL','FُAْL','FِAْL','FَAَاLَة','FَAِيل'];
const SK=['m','u','e','f','s'];
function distract(row,k,n=3){
  const ans=row.f[k];const seen=new Set([ans]);const st=[],mu=[];
  const add=(x,arr)=>{if(x&&!seen.has(x)&&!x.includes('?')){seen.add(x);arr.push(x);}};
  const B=BAB[row.b];const slot=SK[k];const r=row.r;
  if(B.g==='sm'){
    if(row.man&&k<4)add(make(B.id,slot,r),st);
    if(k===1||k===2)BABS.filter(o=>o.g==='sm').forEach(o=>add(make(o.id,slot,r),st));
    if(k===0)BABS.filter(o=>o.g==='sm').forEach(o=>add(make(o.id,'m',r),st));
    if(k===3)['مَFْAُولٌ','FَAِيLٌ','FَاAِLٌ','مُFْAِLٌ','FَAِLٌ'].forEach(p=>add(fill(p,r),st));
    if(k===4)MS_PAT.forEach(p=>add(withAl(fill(p,r)),st));
  }else{
    const L=strip(ans).length;
    const cand=BABS.filter(o=>o.g!=='sm'&&nRoot(o)===r.length&&o.T[slot]).map(o=>make(o.id,slot,r)).filter(x=>Math.abs(strip(x).length-L)<=1);
    shuffle(cand).forEach(x=>add(x,st));
    if(row.man)add(make(B.id,slot,r),st);
  }
  for(let i=0;i<14&&mu.length<3;i++)add(mutate(ans),mu);
  const out=[];const a=shuffle(st),b=shuffle(mu);
  while(out.length<n&&(a.length||b.length)){if(b.length&&(out.length%2===1||!a.length))out.push(b.shift());else out.push(a.shift());}
  return out;
}
function vzPair(B){return vezin(B,'m')+' '+vezin(B,'u');}
function babOptions(B,n=4){
  const right=vzPair(B);const seen=new Set([right]);
  const same=shuffle(BABS.filter(o=>o.g===B.g&&o!==B)),near=shuffle(BABS.filter(o=>o.g!==B.g&&nRoot(o)===nRoot(B)&&(B.g==='sm')===(o.g==='sm'))),rest=shuffle(BABS.filter(o=>o!==B));
  const out=[right];[...same,...near,...rest].forEach(o=>{const t=vzPair(o);if(out.length<n&&!seen.has(t)){seen.add(t);out.push(t);}});
  return shuffle(out);
}
function stars(n,max=3){let s='';for(let i=0;i<max;i++)s+=i<n?'★':'<span class="off">★</span>';return `<span class="stars" aria-label="${n} yıldız">${s}</span>`;}
/* ---------- ok haritası ---------- */
function mapHTML(B,slot,r,{label=true}={}){
  const t=B.T[slot];if(!t)return '';
  const toks=clusters(t);const seen={};
  const cols=toks.map(tok=>{
    const p=tok[0];const isPh=/[FALM]/.test(p);let z=!isPh;
    if(isPh){if(seen[p])z=true;seen[p]=1;}
    const top=isPh?VZ_ROOT[PH[p]]+tok.slice(1):tok, bot=isPh?r[PH[p]]+tok.slice(1):tok;
    return `<div class="col ${z?'z':'r'}"><span class="t">${esc(top)}</span><i class="arr"></i><span class="b">${esc(bot)}</span></div>`;
  }).join('');
  const lab=slot==='f'?fLabel(B):SLOT_NAMES[slot];
  return `<div class="map" style="--c:${gcol(B)}"><div class="mh">${esc(fill(t,VZ_ROOT))}${label?`<small>${lab} · vezin</small>`:''}</div><div class="cols">${cols}</div><div class="mf">${esc(make(B.id,slot,r))}${label?'<small>mevzûn</small>':''}</div></div>`;
}
const legend=`<div class="legend"><span class="chip root">■ Aslî harf (ف ع ل karşılığı)</span><span class="chip zaid">■ Zâid harf</span></div>`;
/* ---------- tatbikat ilerleme ---------- */
function tatPct(id){const s=SET[id];const st=S.tat[id];if(!s)return 0;const tot=s.rows.filter(r=>!r.solved).length*4;if(!tot)return 1;const n=st?Object.keys(st).length:0;return n/tot;}
function tatStars(id){const s=SET[id];const st=S.tat[id]||{};const v=Object.values(st);const tot=s.rows.filter(r=>!r.solved).length*4;if(!tot||v.length<tot)return 0;const first=v.filter(x=>x===1).length/tot;return first>=.9?3:first>=.7?2:1;}
/* ===================== GÖRÜNÜMLER ===================== */
const V={};
function setTab(v){$$('#tabs a').forEach(a=>a.classList.toggle('on',a.dataset.v===v));}
function route(){
  stopTimers();
  const h=(location.hash||'#home').slice(1).split('/');
  const v=h[0]||'home';
  const map={home:'home',bablar:'bablar',bab:'bablar',tatbikat:'tatbikat',tat:'tatbikat',atolye:'atolye',oyun:'oyun',sinav:'sinav',ozet:'ozet',hakkinda:'hakkinda'};
  setTab(map[v]||'home');
  (V[v]||V.home)(h.slice(1));
  app.classList.remove('view');void app.offsetWidth;app.classList.add('view');
  window.scrollTo({top:0});
  checkBadges();
}
let TIMERS=[];function stopTimers(){TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);});TIMERS=[];}
addEventListener('hashchange',route);
/* ---------- SARAY (ana sayfa) ---------- */
const FLOORS=[
 {t:'7. kat · Mülhak bi-tedahraje & bi-ihrencame',g:['lt','lh']},
 {t:'6. kat · Rubâî mezîd',g:['rz']},
 {t:'5. kat · Rubâî mücerred & mülhak bi-dahraje',g:['rm','ld']},
 {t:'4. kat · Sülâsî mezîd (3 harf)',g:['z3']},
 {t:'3. kat · Sülâsî mezîd (2 harf)',g:['z2']},
 {t:'2. kat · Sülâsî mezîd (1 harf)',g:['z1']},
 {t:'Zemin · Sülâsî mücerred',g:['sm']}
];
function palace(){
  const dome=`<svg class="dome" viewBox="0 0 360 120" aria-hidden="true"><rect x="22" y="22" width="12" height="98" rx="3" fill="var(--panel2)" stroke="var(--line)"/><path d="M22 24l6-20 6 20z" fill="var(--gold)"/><rect x="326" y="22" width="12" height="98" rx="3" fill="var(--panel2)" stroke="var(--line)"/><path d="M326 24l6-20 6 20z" fill="var(--gold)"/><path d="M90 120c0-55 40-88 90-88s90 33 90 88z" fill="var(--panel2)" stroke="var(--line)"/><path d="M180 32V12" stroke="var(--gold)" stroke-width="3"/><circle cx="180" cy="9" r="5" fill="none" stroke="var(--gold)" stroke-width="2.5"/><text x="180" y="98" text-anchor="middle" font-family="BKufi, BAmiri, serif" font-size="22" fill="var(--gold)">بناء الأفعال</text></svg>`;
  const fl=FLOORS.map(F=>{
    const bs=BABS.filter(b=>F.g.includes(b.g));const lit=bs.filter(b=>S.stars[b.id]).length;
    return `<div class="floor"><div class="fl"><span>${F.t}</span><span>${lit}/${bs.length}</span></div><div class="wins">${bs.map(b=>`<a class="win l${S.stars[b.id]||0}" href="#bab/${b.id}" title="${esc(vzPair(b))}"><b>${b.n}</b><span class="ar">${esc(vezin(b,'m'))}</span></a>`).join('')}</div></div>`;
  }).join('');
  return `<div class="palace">${dome}${fl}</div>`;
}
V.home=()=>{
  const learned=BABS.filter(b=>S.stars[b.id]).length;
  const next=BABS.find(b=>!S.stars[b.id])||BABS[0];
  const bestExam=S.exams.length?Math.max(...S.exams.map(e=>e.pct)):null;
  app.innerHTML=`
  <section class="hero">
    <div>
      <div class="kufi">بِنَاءُ الأَفْعَالِ</div>
      <h1>Binâ Sarayı</h1>
      <p class="muted">Tavdîhu Metni Binâi’l-Ef‘âl’i adım adım öğreten saray: <b>35 bâb</b>, ok haritaları, kitaptaki <b>tatbikat tabloları</b> (500’ü aşkın fiil), yedi oyun ve gerçek bir <b>sınav</b>. Her bâbda yıldız kazandıkça sarayın bir penceresi yanar.</p>
      <div class="row" style="margin-top:12px">
        <a class="btn pri" href="#bab/${next.id}">${S.stars[next.id]?'Bâblara göz at':'Sıradaki bâb: '+next.n+'. '+esc(vezin(next,'m'))} ${ICON.arrow}</a>
        <a class="btn" href="#sinav">Sınava gir</a>
      </div>
      <div class="stat">
        <div><b>${learned}/35</b><span>yanan pencere</span></div>
        <div><b>${S.cells}</b><span>doldurulan hücre</span></div>
        <div><b>${S.streak}</b><span>gün seri</span></div>
        <div><b>${bestExam===null?'—':bestExam+'%'}</b><span>en iyi sınav</span></div>
      </div>
    </div>
    ${palace()}
  </section>
  <div class="sec-h"><h2>Öğrenme yolu</h2><span class="muted small">Her bâb için dört adım</span></div>
  <div class="grid g3">
    <a class="gcard" href="#bablar"><div class="ico">${ICON.bulb}</div><h3>1 · Dersi oku</h3><p class="muted small">Vezin, mevzûn, alâmet, binâ ve ok haritasıyla bâbın iskeletini gör.</p></a>
    <a class="gcard" href="#tatbikat"><div class="ico">${ICON.brick}</div><h3>2 · Tabloyu doldur</h3><p class="muted small">Kitaptaki tatbikat tablosunda muzâri, emir, ism-i fâil ve masdarı inşa et.</p></a>
    <a class="gcard" href="#oyun"><div class="ico">${ICON.scale}</div><h3>3 · Oyunla pekiştir</h3><p class="muted small">Mîzan, Zâid Avı, Asansör, Yedi Kapı… hız ve dikkat kazan.</p></a>
    <a class="gcard" href="#sinav"><div class="ico">${ICON.exam}</div><h3>4 · Sınavla ölç</h3><p class="muted small">Süreli, konu raporlu sınav; sonunda yazdırılabilir başarı belgesi.</p></a>
  </div>
  <div class="sec-h"><h2>Rozetler</h2><span class="muted small">${Object.keys(S.badges).length}/${BADGES.length}</span></div>
  <div class="badges">${BADGES.map(([id,t,d])=>`<div class="badge ${S.badges[id]?'on':''}" title="${esc(d)}">🏅 <div><b>${t}</b><div class="tiny muted">${d}</div></div></div>`).join('')}</div>
  <div class="row" style="margin-top:22px"><button class="btn sm ghost" id="reset">İlerlemeyi sıfırla</button></div>`;
  $('#reset').onclick=()=>{if(confirm('Bütün ilerleme, yıldızlar ve sınav geçmişi silinsin mi?')){const snd=S.snd;S={v:1,xp:0,seen:{},stars:{},tat:{},cells:0,exams:[],best:{},played:{},cards:{},badges:{},snd,day:S.day,streak:S.streak,name:''};save();hud();route();}};
};
/* ---------- BÂBLAR ---------- */
V.bablar=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">أَبْوَابُ التَّصْرِيفِ خَمْسَةٌ وَثَلَاثُونَ بَابًا</div><h2>Tasrîf bâbları otuz beştir</h2></div><a class="btn sm" href="#ozet">Telhîs tablosu</a></div>
  <p class="muted">Altısı sülâsî mücerred, on ikisi sülâsî mezîd, biri rubâî mücerred, altısı dahraje’ye mülhak, üçü rubâî mezîd, beşi tedahraje’ye mülhak, ikisi ihrencame’ye mülhaktır.</p>
  ${GROUPS.map(g=>{const bs=BABS.filter(b=>b.g===g.id);return `<div class="grp" style="--c:${g.col}"><h3>${g.tr} <span class="ar">${esc(g.ar)}</span></h3><p class="muted small" style="margin:2px 0 0">${g.desc}</p></div>
  <div class="bcards">${bs.map(b=>`<a class="bcard" href="#bab/${b.id}" style="--c:${g.col}">
    <div class="meta"><span class="num">${b.n}</span><span>${g.id==='sm'?'':b.no+'. bâb · '}${mLetters(b)} harf${zaidCount(b)?' · '+zaidCount(b)+' zâid':''}</span>${stars(S.stars[b.id]||0)}</div>
    <div class="vz">${esc(vezinLine(b))}</div><div class="mv">${esc(mevzunLine(b))}</div>
    <div class="meta"><span>${BINA_KIND[b.bk]}</span>${S.seen[b.id]?'<span>✓ okundu</span>':''}</div></a>`).join('')}</div>`;}).join('')}
  <div class="grp" style="--c:var(--gold)"><h3>Ek dersler <span class="ar">فَوَائِدُ</span></h3><p class="muted small" style="margin:2px 0 0">Kitabın sonundaki taksimler.</p></div>
  <div class="gcards">
    <a class="gcard" href="#atolye/yedi"><div class="ico">${ICON.seven}</div><h3>Yedi kısım: sahîh ve mu‘tel</h3><p class="muted small">Sahîh, misâl, ecvef, nâkıs, lefîf, muzâaf, mehmûz.</p></a>
    <a class="gcard" href="#atolye/idgam"><div class="ico">${ICON.merge}</div><h3>İdğam ve üç nevi</h3><p class="muted small">Vâcib, câiz, mümteni — canlandırmalı.</p></a>
    <a class="gcard" href="#atolye/agac"><div class="ico">${ICON.tree}</div><h3>Taksim ağaçları</h3><p class="muted small">Sülâsî ve rubâî ağaçları; sekiz kısım.</p></a>
  </div>`;
};
V.bab=([id])=>{
  const B=BAB[id];if(!B){location.hash='#bablar';return;}
  const g=G(B.g);const r=rootOf(B);const i=BABS.indexOf(B);const prev=BABS[i-1],next=BABS[i+1];
  if(!S.seen[id]){S.seen[id]=1;save();addXP(10);}
  const sl=babSlots(B);
  const zi=zaidIdx(B);const mc=clusters(make(B.id,'m',r));
  const mRow=x=>{const rr=[...x[0]];return `<tr>${sl.map(s=>`<td>${esc(s==='s'||B.T[s]?make(B.id,s,rr):'')}</td>`).join('')}${B.T.s?'':`<td>${esc(withAl(x[1]))}</td>`}</tr>`;};
  const exRows=[[B.R,B.ms]].concat(B.x2?[B.x2]:[]);
  const set=SET['b-'+B.id];
  app.innerHTML=`
  <div class="row" style="justify-content:space-between"><a class="btn sm ghost" href="#bablar">${ICON.back} Bâblar</a><div class="row">${prev?`<a class="btn sm" href="#bab/${prev.id}">‹ ${prev.n}</a>`:''}${next?`<a class="btn sm" href="#bab/${next.id}">${next.n} ›</a>`:''}</div></div>
  <div class="card" style="margin-top:12px;--c:${g.col}">
    <div class="lhead">
      <div><div class="eyebrow" style="color:${g.col}">${g.tr}${B.sub?' · '+B.sub:''} · ${g.id==='sm'?'':B.no+'. bâb · '}${B.n}/35</div>
      <h2 style="margin-top:4px">${B.n}. bâb: ${esc(SLOT_NAMES.m)} ${mLetters(B)} harf${zaidCount(B)?`, ${zaidCount(B)} zâid`:', hepsi aslî'}</h2>
      <p class="muted small" style="margin-top:4px">Mevzûn: ${A(make(B.id,'m',r))} “${esc(B.tr)}”</p></div>
      <div>${stars(S.stars[id]||0)}</div>
    </div>
    <div style="text-align:center;margin-top:10px"><div class="vbox"><div class="big">${esc(vezinLine(B))}</div></div></div>
    <div style="text-align:center;margin-top:8px" class="row" ><span class="ar" style="font-size:1.6rem;flex:1">${esc(mevzunLine(B))}</span><button class="btn sm" id="say">${ICON.play} Dinle</button></div>
  </div>
  <div class="info">
    <div class="card"><h3><span class="chip gold">Alâmet</span> عَلَامَتُهُ</h3><p>${B.al}</p><div class="ar">${esc(B.alAr)}</div>
      <div class="tiles" style="justify-content:flex-start;margin:8px 0 0">${mc.map((c,k)=>`<span class="tile ${zi.includes(k)?'pick':'good'}" style="min-width:42px;height:50px;font-size:1.5rem">${esc(c)}</span>`).join('')}</div>
      <p class="tiny muted" style="margin-top:6px">Yeşil: aslî · Turuncu: zâid${zi.length?'':' (zâid harf yok)'}</p></div>
    <div class="card"><h3><span class="chip root">Binâ</span> بِنَاؤُهُ</h3><p>${B.bn}</p><div class="ar">${esc(B.bnAr)}</div></div>
    <div class="card"><h3><span class="chip">Misaller</span> مِثَالُهُ</h3><div class="ex">${B.ex.map(e=>`<div>${A(e[0])}<span class="small muted">${esc(e[1])}</span><button class="btn sm ghost" data-say="${esc(e[0])}" aria-label="Dinle">${ICON.play}</button></div>`).join('')}</div></div>
  </div>
  <div class="sec-h"><div><h2>Ok haritası</h2><p class="muted small" style="margin:2px 0 0">Vezindeki her harf mevzûndaki karşılığına iner. Aslî harfler ف ع ل${nRoot(B)===4?' ل':''}’nin yerini alır; zâid harfler olduğu gibi kalır.</p></div><button class="btn sm" id="other">Başka fiille dene ↻</button></div>
  ${legend}
  <div class="maps" id="maps">${sl.map(s=>mapHTML(B,s,r)).join('')}</div>
  <p class="tiny muted" id="mapNote"></p>
  <div class="sec-h"><h2>Örnek tablo</h2>${B.g==='sm'?'<span class="muted small">Sülâsî mücerredin masdarı semâîdir (duyuma bağlıdır).</span>':''}</div>
  <div class="tscroll"><table class="tbl" style="--c:${g.col}"><thead><tr>${sl.map(s=>`<th><span class="ar">${s==='f'&&B.fLbl?'الصِّفَةُ المُشَبَّهَةُ':SLOT_AR[s]}</span>${s==='f'?fLabel(B):SLOT_NAMES[s]}</th>`).join('')}${B.T.s?'':'<th><span class="ar">المصدر</span>Masdar</th>'}</tr></thead><tbody>${exRows.map(mRow).join('')}</tbody></table></div>
  <div class="row" style="margin-top:18px">
    ${set&&set.rows.length?`<a class="btn pri" href="#tat/b-${B.id}">Tatbikata başla (${set.rows.length} fiil) ${ICON.arrow}</a>`:''}
    <a class="btn" href="#oyun/zaid">Zâid Avı</a><a class="btn" href="#atolye/vinc/${B.id}">Vinçte kendi kökünü dene</a>
  </div>`;
  $('#say').onclick=()=>speak(mevzunLine(B));
  $$('[data-say]').forEach(b=>b.onclick=()=>speak(b.dataset.say));
  const pool=(set?set.rows:[]).filter(x=>!x.man&&clusters(x.f[0]).length===clusters(fill(B.T.m,VZ_ROOT)).length);let k=0;
  $('#other').onclick=()=>{if(!pool.length){toast('Bu bâbda başka örnek yok.');return;}const row=pool[k++%pool.length];$('#maps').innerHTML=sl.map(s=>mapHTML(B,s,row.r)).join('');$('#mapNote').textContent='Gösterilen kök: '+row.r.join(' ');beep('tap');};
};
/* ---------- TATBİKAT ---------- */
V.tatbikat=()=>{
  const card=(s,title,sub,col)=>{const p=tatPct(s.id),st=tatStars(s.id);return `<a class="bcard" href="#tat/${s.id}" style="--c:${col}"><div class="meta"><span>${sub}</span>${stars(st)}</div><div class="vz">${title}</div><div class="pbar" style="margin-top:6px"><i style="width:${Math.round(p*100)}%"></i></div><div class="meta" style="margin-top:4px"><span>${s.rows.length} fiil</span><span>%${Math.round(p*100)}</span></div></a>`;};
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">تَطْبِيقَات</div><h2>Tatbikat tabloları</h2></div></div>
  <p class="muted">Kitaptaki talimat: ${A('اكْتُبْ فِعْلَ المُضَارِعِ وَالأَمْرِ وَاسْمِ الفَاعِلِ وَالمَصْدَرِ مِنَ الأَفْعَالِ الآتِيَةِ')} — “Aşağıdaki fiillerin muzârisini, emrini, ism-i fâilini ve masdarını yazınız.” Boş hücreye dokun, doğru kalıbı seç. İlk denemede doğru: 3 XP.</p>
  ${GROUPS.map(g=>{const bs=BABS.filter(b=>b.g===g.id&&SET['b-'+b.id].rows.length);return `<div class="grp" style="--c:${g.col}"><h3>${g.tr}</h3></div><div class="bcards">${bs.map(b=>card(SET['b-'+b.id],esc(vzPair(b)),b.n+'. bâb',g.col)).join('')}</div>`;}).join('')}
  <div class="grp" style="--c:var(--gold)"><h3>Genel tatbikat: sahîh ve mu‘tel fiiller <span class="ar">التَّطْبِيقَاتُ العَامَّةُ</span></h3><p class="muted small" style="margin:2px 0 0">Kitabın sonundaki tablolar: altı mücerred bâbda sahîh, misâl, ecvef, nâkıs, lefîf ve mehmûz fiiller.</p></div>
  <div class="bcards">${MUTEL.map(m=>card(SET['m-'+m.id],esc(m.ar),m.tr,m.col)).join('')}</div>`;
};
V.tat=([id])=>{
  const s=SET[id];if(!s){location.hash='#tatbikat';return;}
  const B=s.bab?BAB[s.bab]:null;const M=s.mt?MUTEL.find(m=>m.id===s.mt):null;
  const col=B?gcol(B):M.col;
  S.tat[id]=S.tat[id]||{};const st=S.tat[id];
  const fl=B&&B.fLbl?['الصِّفَةُ المُشَبَّهَةُ',B.fLbl]:['اسْمُ الفَاعِلِ','İsm-i fâil'];
  const head=`<tr>${M?'<th><span class="ar">البَابُ</span>Bâb</th>':''}<th><span class="ar">المَاضِي</span>Mâzi</th><th><span class="ar">المُضَارِعُ</span>Muzâri</th><th><span class="ar">الأَمْرُ</span>Emir</th><th><span class="ar">${fl[0]}</span>${fl[1]}</th><th><span class="ar">المَصْدَرُ</span>Masdar</th></tr>`;
  const body=s.rows.map((row,i)=>`<tr class="${row.solved?'solved':''}">${M?`<td class="tiny">${A(vzPair(BAB[row.b]),'')}</td>`:''}<td class="m">${esc(row.f[0])}</td>${[1,2,3,4].map(k=>{const key=i+'-'+k;if(row.solved)return `<td>${esc(row.f[k])}</td>`;const v=st[key];return `<td><button class="cell ${v===3?'shown':v?'ok':''}" data-k="${key}" ${v?'disabled':''} aria-label="${SLOT_NAMES[SK[k]]}">${v?esc(row.f[k]):'؟'}</button></td>`;}).join('')}</tr>`).join('');
  app.innerHTML=`<div class="row" style="justify-content:space-between"><a class="btn sm ghost" href="#tatbikat">${ICON.back} Tablolar</a>${B?`<a class="btn sm" href="#bab/${B.id}">Dersi aç</a>`:''}</div>
  <div class="card" style="margin-top:12px;--c:${col}">
    <div class="eyebrow" style="color:${col}">${B?G(B.g).tr+' · '+B.n+'. bâb':'Genel tatbikat · '+M.tr}</div>
    <h2 class="ar" style="font-size:1.7rem;margin-top:2px;text-align:start">${esc(B?'تَطْبِيقَاتٌ عَلَى '+vezinLine(B):M.ar)}</h2>
    <p class="muted small">${B?B.al:M.desc}</p>
    <div class="hud" style="margin:10px 0 0"><div class="pbar"><i id="tp"></i></div><span class="small" id="tpn"></span>${stars(tatStars(id))}</div>
    <div class="row" style="margin-top:8px"><button class="btn sm" id="hint">Bir hücreyi göster</button><button class="btn sm" id="all">Hepsini göster</button><button class="btn sm ghost" id="rst">Sıfırla</button>${B?`<button class="btn sm ghost" id="pat">Kalıp ipucu</button>`:''}</div>
  </div>
  <p class="small muted" style="margin:12px 0 6px">${A('اكْتُبْ فِعْلَ المُضَارِعِ وَالأَمْرِ وَاسْمِ الفَاعِلِ وَالمَصْدَرِ مِنَ الأَفْعَالِ الآتِيَةِ')}${s.rows.some(r=>r.solved)?' · Sarı satır kitapta çözülmüş örnektir.':''}</p>
  <div class="tscroll"><table class="tbl" style="--c:${col}"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
  const tot=s.rows.filter(r=>!r.solved).length*4;
  const prog=()=>{const n=Object.keys(st).length;$('#tp').style.width=(tot?n/tot*100:100)+'%';$('#tpn').textContent=n+'/'+tot;};
  prog();
  const done=()=>{const n=Object.keys(st).length;if(n===tot&&tot){const sr=tatStars(id);if(B&&sr>(S.stars[B.id]||0)){S.stars[B.id]=sr;}save();confetti();beep('win');toast(sr===3?'Mükemmel! Üç yıldız.':'Tablo tamamlandı: '+sr+' yıldız.');setTimeout(()=>route(),1200);}};
  const fillCell=(btn,row,k,v)=>{btn.textContent=row.f[k];btn.className='cell '+(v===3?'shown':'ok');btn.disabled=true;};
  app.querySelectorAll('.cell').forEach(btn=>btn.onclick=()=>{
    const [i,k]=btn.dataset.k.split('-').map(Number);const row=s.rows[i];
    btn.classList.add('sel');
    const opts=shuffle([row.f[k],...distract(row,k)]);let wrong=false;
    openSheet(`<div class="eyebrow">${SLOT_NAMES[SK[k]]==='İsm-i fâil'&&B&&B.fLbl?B.fLbl:SLOT_NAMES[SK[k]]} · ${A(SLOT_AR[SK[k]])}</div><div class="qar" style="font-size:2.2rem">${esc(row.f[0])}</div><div class="opts">${opts.map((o,j)=>`<button class="opt" data-o="${j}">${esc(o)}</button>`).join('')}</div><div class="row" style="justify-content:space-between;margin-top:12px"><button class="btn sm ghost" data-close>Vazgeç</button><button class="btn sm" data-show>Cevabı göster</button></div>`,()=>btn.classList.remove('sel'));
    $$('#sheet [data-o]').forEach(b=>b.onclick=()=>{
      if(opts[+b.dataset.o]===row.f[k]){b.classList.add('ok');beep('ok');const v=wrong?2:1;st[btn.dataset.k]=v;S.cells++;save();addXP(wrong?1:3);fillCell(btn,row,k,v);prog();setTimeout(()=>{closeSheet();done();},380);}
      else{b.classList.add('no');b.disabled=true;wrong=true;beep('no');btn.classList.add('wrong');setTimeout(()=>btn.classList.remove('wrong'),400);}
    });
    $('#sheet [data-show]').onclick=()=>{st[btn.dataset.k]=3;save();fillCell(btn,row,k,3);prog();closeSheet();done();};
  });
  $('#hint').onclick=()=>{const b=app.querySelector('.cell:not([disabled])');if(!b)return;const [i,k]=b.dataset.k.split('-').map(Number);st[b.dataset.k]=3;save();fillCell(b,s.rows[i],k,3);prog();b.scrollIntoView({block:'center',behavior:'smooth'});done();};
  $('#all').onclick=()=>{if(!confirm('Kalan bütün hücreler gösterilsin mi? (Yıldız hesabında “gösterildi” sayılır.)'))return;app.querySelectorAll('.cell:not([disabled])').forEach(b=>{const [i,k]=b.dataset.k.split('-').map(Number);st[b.dataset.k]=3;fillCell(b,s.rows[i],k,3);});save();prog();done();};
  $('#rst').onclick=()=>{S.tat[id]={};save();route();};
  if($('#pat'))$('#pat').onclick=()=>openSheet(`<h3>Kalıp ipucu</h3><p class="muted small">Bu bâbın vezinleri — kökü ف ع ل${nRoot(B)===4?' ل':''} yerine koy.</p><div class="gen">${babSlots(B).map(sl=>`<div><div class="tiny muted">${sl==='f'?fLabel(B):SLOT_NAMES[sl]}</div><div class="ar">${esc(vezin(B,sl))}</div></div>`).join('')}${B.T.s?'':`<div><div class="tiny muted">Masdar</div><div class="small">semâî</div></div>`}</div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn sm" data-close>Tamam</button></div>`);
};
/* ---------- alt pencere (sheet) ---------- */
let sheetOnClose=null;
function openSheet(html,onClose){sheetOnClose=onClose||null;$('#sheet').innerHTML=`<div class="sheet-bg"><div class="sheet" role="dialog" aria-modal="true">${html}</div></div>`;$('#sheet .sheet-bg').onclick=e=>{if(e.target.classList.contains('sheet-bg'))closeSheet();};$$('#sheet [data-close]').forEach(b=>b.onclick=closeSheet);const f=$('#sheet button');if(f)f.focus({preventScroll:true});}
function closeSheet(){$('#sheet').innerHTML='';if(sheetOnClose){const f=sheetOnClose;sheetOnClose=null;f();}}
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#sheet').innerHTML)closeSheet();});
/* ---------- ATÖLYE ---------- */
const TOOLS=[
 {id:'vinc',ic:'crane',t:'İnşaat Vinci',d:'Herhangi bir kökü seç, 35 bâbın her birinde mâzi, muzâri, emir, ism-i fâil ve masdarını ok haritasıyla inşa et.'},
 {id:'dedektif',ic:'det',t:'Bâb Dedektifi',d:'Harf say, zâidleri bul, kategoriyi ve bâbı tespit et: kitabın alâmet mantığıyla adım adım.'},
 {id:'kart',ic:'card',t:'Kart Destesi',d:'35 bâbı Leitner kutularıyla ezberle: ön yüz vezin, arka yüz mevzûn, alâmet ve binâ.'},
 {id:'yedi',ic:'seven',t:'Yedi Kısım',d:'Sahîh, misâl, ecvef, nâkıs, lefîf, muzâaf, mehmûz: tanımlar ve kitaptaki örnek listeleri.'},
 {id:'idgam',ic:'merge',t:'İdğam Laboratuvarı',d:'مَدَدَ → مَدَّ dönüşümünü adım adım izle; vâcib, câiz, mümteni nevilerini ayırt et.'},
 {id:'agac',ic:'tree',t:'Taksim Ağaçları',d:'Sülâsî ve rubâî fiilin taksimi; sekiz kısım (sâlim / gayr-i sâlim).'}
];
V.atolye=([t,...rest])=>{
  if(t&&TOOL[t])return TOOL[t](rest);
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Atölye</div><h2>Keşfet, inşa et, çözümle</h2></div></div><div class="gcards">${TOOLS.map(x=>`<a class="gcard" href="#atolye/${x.id}"><div class="ico">${ICON[x.ic]}</div><h3>${x.t}</h3><p class="muted small">${x.d}</p></a>`).join('')}</div>`;
};
const TOOL={};
const backA=(h='#atolye',t='Atölye')=>`<a class="btn sm ghost" href="${h}">${ICON.back} ${t}</a>`;
TOOL.vinc=([bid])=>{
  const LET='ء ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'.split(' ');
  let root=[...(bid&&BAB[bid]?BAB[bid].R:'كتب')];let cur=bid&&BAB[bid]?bid:'M9';
  app.innerHTML=`${backA()}<div class="sec-h" style="margin-top:12px"><div><div class="eyebrow">İnşaat Vinci</div><h2>Kökü yerleştir, bâbı seç</h2></div></div>
  <div class="card"><div class="rootbox" id="rb"></div><div class="kbd" style="margin-top:12px" id="kb">${LET.map(l=>`<button data-l="${l}">${l}</button>`).join('')}<button data-l="del" style="width:auto;padding:0 10px;font-family:var(--f-ui);font-size:.85rem">⌫ sil</button></div><p class="tiny muted" id="warn" style="text-align:center;margin-top:8px"></p></div>
  <div class="filter" id="bs" style="margin-top:14px"></div>
  <div id="out" style="margin-top:14px"></div>`;
  const draw=()=>{
    $('#rb').innerHTML=[0,1,2,3].map(i=>`<span class="${root[i]?'f':''}">${root[i]||''}</span>`).join('');
    const n=root.length;const ok=n===3||n===4;
    const w=[];if(root.some(c=>'وي'.includes(c)))w.push('illet harfi (و ي)');if(root.includes('ء'))w.push('hemze');if(n===3&&root[1]===root[2])w.push('tad‘îf');
    $('#warn').textContent=!ok?'Üç (sülâsî) veya dört (rubâî) harf seç.':w.length?'Dikkat: kökte '+w.join(', ')+' var. Vinç kuralları sahîh kök içindir; mu‘tel fiillerde i‘lâl kuralları ayrıca uygulanır.':'Kök: '+root.join(' ')+' · '+(n===3?'sülâsî':'rubâî');
    const list=ok?BABS.filter(b=>nRoot(b)===n):[];
    if(ok&&!list.find(b=>b.id===cur))cur=list[0].id;
    $('#bs').innerHTML=list.map(b=>`<button data-b="${b.id}" class="${b.id===cur?'on':''}"><span class="ar">${esc(vezin(b,'m'))}</span> · ${b.n}</button>`).join('');
    $$('#bs [data-b]').forEach(x=>x.onclick=()=>{cur=x.dataset.b;beep('tap');draw();});
    if(!ok){$('#out').innerHTML='';return;}
    const B=BAB[cur];
    $('#out').innerHTML=`<div class="card" style="--c:${gcol(B)}"><div class="eyebrow" style="color:${gcol(B)}">${G(B.g).tr} · ${B.n}. bâb</div><div class="ar" style="font-size:1.5rem">${esc(vezinLine(B))}</div>
    <div class="gen" style="margin-top:10px">${babSlots(B).map(sl=>`<div><div class="tiny muted">${sl==='f'?fLabel(B):SLOT_NAMES[sl]}</div><div class="ar">${esc(make(B.id,sl,root))}</div></div>`).join('')}${B.T.s?'':'<div><div class="tiny muted">Masdar</div><div class="small">Semâî: kitaptan / sözlükten öğrenilir</div></div>'}</div>
    <div class="row" style="margin-top:10px"><button class="btn sm" id="sayv">${ICON.play} Dinle</button><a class="btn sm" href="#bab/${B.id}">Bâb dersi</a></div></div>
    <div class="sec-h"><h3>Ok haritası</h3></div>${legend}<div class="maps">${babSlots(B).map(sl=>mapHTML(B,sl,root)).join('')}</div>`;
    $('#sayv').onclick=()=>speak(babSlots(B).map(sl=>make(B.id,sl,root)).join('، '));
  };
  $$('#kb [data-l]').forEach(b=>b.onclick=()=>{const l=b.dataset.l;if(l==='del')root.pop();else if(root.length<4)root.push(l);else{root=[l];}beep('tap');draw();});
  draw();
};
/* Bâb dedektifi */
function randomRow(filter){const pool=ALL_ROWS.filter(r=>r.set.startsWith('b-')&&(!filter||filter(r)));return pick(pool);}
TOOL.dedektif=()=>{
  let row,B,step,score=0,rounds=0,picked;
  const nextQ=()=>{row=randomRow(r=>!r.man&&clusters(r.f[0]).length===clusters(BAB[r.b].T.m).length);B=BAB[row.b];step=0;picked=new Set();rounds++;draw();};
  const showVerb=()=>`<div class="qar">${esc(row.f[0])}${B.g==='sm'?' '+esc(row.f[1]):''}</div>`;
  const draw=()=>{
    const steps=`<div class="steps">${[0,1,2,3].map(i=>`<i class="${i<=step?'on':''}"></i>`).join('')}</div>`;
    let body='';
    if(step===0)body=`<p class="q">1. Mâzi kaç harftir?</p>${showVerb()}<div class="opts">${[3,4,5,6].map(n=>`<button class="opt tr" data-a="${n}">${n} harf</button>`).join('')}</div><p class="tiny muted">İpucu: Şeddeli harf iki harf sayılır.</p>`;
    if(step===1){const c=clusters(row.f[0]);body=`<p class="q">2. Zâid harflere dokun (yoksa doğrudan “Kontrol”).</p><div class="tiles">${c.map((x,i)=>`<button class="tile ${picked.has(i)?'pick':''}" data-i="${i}">${esc(x)}</button>`).join('')}</div><p class="tiny muted" style="text-align:center">Tekrarlanan veya şeddeli harf de zâid sayılır (فَعَّلَ’de şeddeli ع).</p><div class="row" style="justify-content:center"><button class="btn pri" id="chk">Kontrol</button></div>`;}
    if(step===2){const opts=shuffle(GROUPS.filter(g=>g.id===B.g||Math.random()<.5)).slice(0,5);if(!opts.find(g=>g.id===B.g))opts[0]=G(B.g);body=`<p class="q">3. Hangi kategoridir?</p>${showVerb()}<div class="opts">${shuffle(opts).map(g=>`<button class="opt tr" data-g="${g.id}">${g.tr}</button>`).join('')}</div>`;}
    if(step===3){const opts=babOptions(B);body=`<p class="q">4. Hangi bâbdandır?</p>${showVerb()}<div class="opts">${opts.map(o=>`<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;}
    if(step===4)body=`<div style="text-align:center"><div class="qar">${esc(row.f[0])}</div><p><b>${G(B.g).tr}</b> · ${B.n}. bâb ${A(vzPair(B))}</p><p class="muted small">${B.al}</p><button class="btn pri" id="nx">Yeni fiil ${ICON.arrow}</button></div>`;
    app.innerHTML=`${backA()}<div class="stage" style="margin-top:12px"><div class="hud"><b>Bâb Dedektifi</b><span class="small muted">Puan: ${score} · Vaka ${rounds}</span></div>${steps}<div class="card">${body}<div class="fb" id="fb"></div></div></div>`;
    const ok=m=>{$('#fb').className='fb ok';$('#fb').textContent=m;beep('ok');score+=5;addXP(2);setTimeout(()=>{step++;draw();},900);};
    const no=m=>{$('#fb').className='fb no';$('#fb').textContent=m;beep('no');};
    if(step===0)$$('[data-a]').forEach(b=>b.onclick=()=>{+b.dataset.a===mLetters(B)?ok('Doğru: '+mLetters(B)+' harf.'):(b.classList.add('no'),no('Tekrar say.'));});
    if(step===1){$$('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;picked.has(i)?picked.delete(i):picked.add(i);b.classList.toggle('pick');beep('tap');});
      $('#chk').onclick=()=>{const z=zaidIdx(B);const good=z.length===picked.size&&z.every(i=>picked.has(i));if(good)ok(z.length?'Doğru! '+z.length+' zâid harf.':'Doğru! Bütün harfler aslî.');else{$$('[data-i]').forEach(b=>{const i=+b.dataset.i;b.classList.remove('pick');if(z.includes(i))b.classList.add('good');});no('Zâid harfler yeşille gösterildi.');setTimeout(()=>{step++;draw();},1800);}};}
    if(step===2)$$('[data-g]').forEach(b=>b.onclick=()=>{b.dataset.g===B.g?ok('Doğru: '+G(B.g).tr):(b.classList.add('no'),no(G(b.dataset.g).desc));});
    if(step===3)$$('[data-v]').forEach(b=>b.onclick=()=>{b.dataset.v===vzPair(B)?ok('Tebrikler, vaka çözüldü!'):(b.classList.add('no'),no('Değil. Alâmetleri hatırla.'));});
    if(step===4)$('#nx').onclick=nextQ;
  };
  nextQ();
};
/* Kart destesi (Leitner) */
TOOL.kart=()=>{
  const due=()=>{const arr=BABS.map(b=>({b,box:S.cards[b.id]||0}));const min=Math.min(...arr.map(x=>x.box));return shuffle(arr.filter(x=>x.box===min))[0].b;};
  let B=due(),flip=false;
  const draw=()=>{
    const boxes=[0,1,2,3,4].map(i=>BABS.filter(b=>(S.cards[b.id]||0)===i).length);
    app.innerHTML=`${backA()}<div class="stage" style="margin-top:12px"><div class="hud"><b>Kart Destesi</b><span class="small muted">Kutular: ${boxes.map((n,i)=>`${i+1}:${n}`).join(' · ')}</span></div>
    <div class="flash ${flip?'flip':''}" id="fc"><div class="in">
      <div class="face"><div class="eyebrow">${G(B.g).tr}</div><div class="qar">${esc(vezinLine(B))}</div><p class="muted small">Mevzûnu, alâmeti ve binâsı nedir? Kartı çevir.</p></div>
      <div class="face bk"><div class="ar" style="font-size:1.6rem">${esc(mevzunLine(B))}</div><p class="small" style="margin:6px 0">${B.al}</p><span class="chip root">${BINA_KIND[B.bk]}</span></div>
    </div></div>
    <div class="row" style="justify-content:center"><button class="btn" id="fl">Çevir</button><button class="btn" id="no" ${flip?'':'disabled'}>Tekrar et</button><button class="btn pri" id="ok" ${flip?'':'disabled'}>Bildim</button></div>
    <p class="tiny muted" style="text-align:center">Bildiğin kart bir üst kutuya geçer, bilemediğin ilk kutuya döner. En alt kutudaki kartlar önce gelir.</p></div>`;
    $('#fc').onclick=$('#fl').onclick=()=>{flip=!flip;draw();};
    $('#ok').onclick=()=>{S.cards[B.id]=Math.min(4,(S.cards[B.id]||0)+1);save();addXP(2);beep('ok');B=due();flip=false;draw();};
    $('#no').onclick=()=>{S.cards[B.id]=0;save();beep('tap');B=due();flip=false;draw();};
  };
  draw();
};
/* Yedi kısım */
TOOL.yedi=()=>{
  app.innerHTML=`${backA()}<div class="sec-h" style="margin-top:12px"><div><div class="eyebrow">وَاعْلَمْ أَنَّ كُلَّ فِعْلٍ…</div><h2>Her fiil yedi kısımdan biridir</h2></div><a class="btn sm" href="#oyun/kapi">Yedi Kapı oyunu</a></div>
  <div class="grid g2">${AQ_ORDER.map(k=>{const I=AQ_INFO[k];const extra=k==='lefif'?'<p class="small">Lefîf-i makrûn: ayn ve lâm illetli (طَوَى) · Lefîf-i mefrûk: fâ ve lâm illetli (وَقَى).</p>':k==='mehmuz'?'<p class="small">Mehmûzu’l-fâ (أَخَذَ), mehmûzu’l-ayn (سَأَلَ), mehmûzu’l-lâm (قَرَأَ).</p>':k==='mudaaf'?'<p class="small">مَدَّ aslı مَدَدَ’dir: birinci dâlin harekesi hazfedilip ikinci dâle idğam edilmiştir. → <a href="#atolye/idgam">İdğam</a></p>':'';return `<div class="card"><h3>${I.tr} ${A(I.ar)}</h3><p class="muted small">${I.d}.</p>${extra}<div class="ar" style="font-size:1.25rem">${esc(AQSAM[k].join(' – '))}</div></div>`;}).join('')}</div>
  <p class="muted small" style="margin-top:14px">Kitabın son tablolarında bu kısımlardan fiiller altı mücerred bâba göre dağıtılmıştır: <a href="#tatbikat">Genel tatbikat</a>.</p>`;
};
/* İdğam */
TOOL.idgam=()=>{
  let st=0;const frames=[['مَدَدَ','Aslı: iki dâl de harekeli (مَدَدَ).'],['مَدْدَ','Birinci dâlin harekesi hazfedildi; dâl sâkin oldu.'],['مَدَّ','Sâkin dâl ikinci dâle idğam edildi; şedde ile yazılır.']];
  const QZ=[['مَدَّ يَمُدُّ مَدًّا','v'],['لَمْ يَمُدَّ — لَمْ يَمْدُدْ','c'],['مَدَدْتُ إِلَى مَدَدْنَ','m'],['رَدَّ يَرُدُّ','v'],['اُمْدُدْ — مُدَّ','c'],['شَدَدْتُ','m'],['يَشُدُّ','v'],['لَمْ يَفِرَّ — لَمْ يَفْرِرْ','c'],['مَسَسْتُ','m'],['فَرَّ يَفِرُّ','v']];
  const TY={v:'Vâcib',c:'Câiz',m:'Mümteni'};let qi=0,sc=0;const qs=shuffle(QZ).slice(0,6);
  const draw=()=>{
    const q=qs[qi];
    app.innerHTML=`${backA()}<div class="sec-h" style="margin-top:12px"><div><div class="eyebrow">الإِدْغَامُ</div><h2>İdğam: iki mütecânis harfin birini diğerine katmak</h2></div></div>
    <div class="grid g2"><div class="card" style="text-align:center"><div class="steps">${frames.map((f,i)=>`<i class="${i<=st?'on':''}"></i>`).join('')}</div><div class="qar" style="font-size:3.4rem">${esc(frames[st][0])}</div><p>${frames[st][1]}</p><div class="row" style="justify-content:center"><button class="btn sm" id="pv" ${st?'':'disabled'}>‹ Geri</button><button class="btn sm pri" id="nx" ${st<2?'':'disabled'}>İleri ›</button><button class="btn sm ghost" id="sy">${ICON.play}</button></div></div>
    <div class="card"><h3>Üç nevi</h3><div class="idg" style="margin-top:8px">
      <span class="tag">Vâcib</span><span>İki mütecânis harf harekeli, ya da birincisi sâkin ikincisi harekeli: ${A('مَدَّ يَمُدُّ مَدًّا')}</span>
      <span class="tag">Câiz</span><span>Birincisi harekeli, ikincisi ârızî sükûnla sâkin: ${A('لَمْ يَمُدَّ')} aslı ${A('لَمْ يَمْدُدْ')}; fetha, damme veya kesra ile harekelenip idğam edilir; fekk de câizdir.</span>
      <span class="tag">Mümteni</span><span>Birincisi harekeli, ikincisi aslî sükûnla sâkin: ${A('مَدَدْتُ إِلَى مَدَدْنَ')}</span></div></div></div>
    <div class="sec-h"><h3>Hangi nevi? <span class="muted small">(${qi+1}/${qs.length} · puan ${sc})</span></h3></div>
    <div class="card stage">${q?`<div class="qar">${esc(q[0])}</div><div class="opts" style="grid-template-columns:repeat(3,1fr)">${['v','c','m'].map(t=>`<button class="opt tr" data-t="${t}">${TY[t]}</button>`).join('')}</div><div class="fb" id="fb"></div>`:`<div style="text-align:center"><p><b>${sc}/${qs.length}</b> doğru.</p><button class="btn pri" id="again">Yeniden</button></div>`}</div>`;
    $('#pv').onclick=()=>{st--;draw();};$('#nx').onclick=()=>{st++;beep('tap');draw();};$('#sy').onclick=()=>speak('مَدَدَ، مَدَّ');
    if(q)$$('[data-t]').forEach(b=>b.onclick=()=>{const ok=b.dataset.t===q[1];b.classList.add(ok?'ok':'no');$('#fb').className='fb '+(ok?'ok':'no');$('#fb').textContent=ok?'Doğru!':'Doğrusu: '+TY[q[1]];beep(ok?'ok':'no');if(ok){sc++;addXP(2);}$$('[data-t]').forEach(x=>x.disabled=true);setTimeout(()=>{qi++;draw();},1000);});
    else $('#again').onclick=()=>TOOL.idgam();
  };
  draw();
};
/* Taksim ağaçları */
TOOL.agac=()=>{
  const leaf=b=>`<a class="tleaf" href="#bab/${b.id}" style="text-decoration:none">${esc(vezinLine(b))}</a>`;
  const branch=(title,sub,bs)=>`<div class="tbranch card" style="padding:10px"><div class="tnode">${esc(title)}<small>${sub}</small></div><div style="display:flex;flex-direction:column;gap:6px;align-items:stretch">${bs.map(leaf).join('')}</div></div>`;
  const by=g=>BABS.filter(b=>b.g===g);
  app.innerHTML=`${backA()}<div class="sec-h" style="margin-top:12px"><div><div class="eyebrow">التَّقْسِيمُ</div><h2>Taksim ağaçları</h2></div></div>
  <div class="card"><div class="tree"><div class="tnode" style="font-size:1.4rem">الفِعْلُ الثُّلَاثِيُّ<small>Sülâsî fiil · 18 bâb</small></div>
    <div class="tkids">${branch('الثُّلَاثِيُّ المُجَرَّدُ','Mücerred · 6',by('sm'))}${branch('النَّوْعُ الأَوَّلُ','Mezîd · 1 harf',by('z1'))}${branch('النَّوْعُ الثَّانِي','Mezîd · 2 harf',by('z2'))}${branch('النَّوْعُ الثَّالِثُ','Mezîd · 3 harf',by('z3'))}</div></div></div>
  <div class="card" style="margin-top:14px"><div class="tree"><div class="tnode" style="font-size:1.4rem">الفِعْلُ الرُّبَاعِيُّ<small>Rubâî fiil · 17 bâb</small></div>
    <div class="tkids">${branch('الرُّبَاعِيُّ المُجَرَّدُ','Mücerred · 1',by('rm'))}${branch('المُلْحَقُ بِدَحْرَجَ','Mülhak · 6',by('ld'))}${branch('الرُّبَاعِيُّ المَزِيدُ فِيهِ','Mezîd · 3',by('rz'))}${branch('المُلْحَقُ بِتَدَحْرَجَ','Mülhak · 5',by('lt'))}${branch('المُلْحَقُ بِاحْرَنْجَمَ','Mülhak · 2',by('lh'))}</div></div></div>
  <div class="sec-h"><div><h2>Sekiz kısım <span class="ar muted" style="font-size:1.1rem">الأَقْسَامُ الثَّمَانِيَةُ</span></h2><p class="muted small" style="margin:2px 0 0">Bu bâblarda sınırlı fiil; sülâsî/rubâî, mücerred/mezîd ve sâlim/gayr-i sâlim olarak sekize ayrılır.</p></div></div>
  <div class="tscroll"><table class="tbl" style="--c:var(--gold)"><thead><tr><th></th><th>Sâlim <span class="ar">سَالِمٌ</span></th><th>Gayr-i sâlim <span class="ar">غَيْرُ سَالِمٍ</span></th></tr></thead><tbody>
    <tr><td class="small" style="font-family:var(--f-ui)">Sülâsî mücerred</td><td>كَرُمَ</td><td>وَعَدَ</td></tr>
    <tr><td class="small" style="font-family:var(--f-ui)">Rubâî mücerred</td><td>دَحْرَجَ</td><td>وَسْوَسَ وَزَلْزَلَ</td></tr>
    <tr><td class="small" style="font-family:var(--f-ui)">Sülâsî mezîd</td><td>أَكْرَمَ</td><td>أَوْعَدَ</td></tr>
    <tr><td class="small" style="font-family:var(--f-ui)">Rubâî mezîd</td><td>تَدَحْرَجَ</td><td>تَوَسْوَسَ</td></tr></tbody></table></div>`;
};
/* ---------- OYUNLAR ---------- */
const GAMES=[
 {id:'mizan',ic:'scale',t:'Mîzan',d:'Fiil kefeye kondu: doğru vezni seç, terazi dengelensin. 10 tur.'},
 {id:'zaid',ic:'hunt',t:'Zâid Avı',d:'Mâzideki zâid harfleri avla. Şeddeli ve tekrar eden harflere dikkat!'},
 {id:'tugla',ic:'brick',t:'Tuğla Ustası',d:'Harf tuğlalarını sırayla dizerek istenen kalıbı (muzâri, masdar…) inşa et.'},
 {id:'asansor',ic:'elev',t:'Asansör',d:'60 saniye: gelen fiili sarayın doğru katına çıkar.'},
 {id:'hafiza',ic:'mem',t:'Hafıza Sarayı',d:'Vezin ile mevzûnunu eşleştir; en az hamlede bitir.'},
 {id:'kapi',ic:'door',t:'Yedi Kapı',d:'60 saniye: fiili yedi kısımdan doğru kapıya gönder.'},
 {id:'mana',ic:'bulb',t:'Mânâ Avcısı',d:'Örnek cümleye bak: bu bâb ta‘diye mi, mutâvaat mı, müşâreket mi?'}
];
V.oyun=([g])=>{
  if(g&&GAME[g]){S.played[g]=1;save();return GAME[g]();}
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Oyunlar</div><h2>Oynayarak pekiştir</h2></div></div><div class="gcards">${GAMES.map(x=>`<a class="gcard" href="#oyun/${x.id}"><div class="ico">${ICON[x.ic]}</div><h3>${x.t}</h3><p class="muted small">${x.d}</p><span class="tiny muted">${S.best[x.id]!=null?'En iyi: '+S.best[x.id]:'Henüz oynanmadı'}</span></a>`).join('')}</div>`;
};
const GAME={};
function gameEnd(id,score,msg,again){
  const best=S.best[id];const nb=best==null||score>best;if(nb){S.best[id]=score;}save();addXP(Math.round(score/2));beep('win');if(nb)confetti();
  app.querySelector('.stage .card').innerHTML=`<div style="text-align:center"><div class="eyebrow">Oyun bitti</div><div class="scorebig">${score}</div><p>${msg}</p>${nb?'<p class="chip gold">Yeni rekor!</p>':`<p class="muted small">Rekor: ${best}</p>`}<div class="row" style="justify-content:center;margin-top:10px"><button class="btn pri" id="ag">Tekrar oyna</button><a class="btn" href="#oyun">Oyunlar</a></div></div>`;
  $('#ag').onclick=again;
}
const gHead=(t,info)=>`<a class="btn sm ghost" href="#oyun">${ICON.back} Oyunlar</a><div class="stage" style="margin-top:12px"><div class="hud"><b>${t}</b><span class="small muted" id="gi">${info||''}</span></div><div class="card"></div></div>`;
GAME.mizan=()=>{
  app.innerHTML=gHead('Mîzan');let n=0,sc=0,streak=0;const card=app.querySelector('.stage .card');
  const round=()=>{
    if(n>=10)return gameEnd('mizan',sc,'10 turda '+sc+' puan.',GAME.mizan);
    const row=randomRow(r=>!r.solved||true);const B=BAB[row.b];const opts=babOptions(B);n++;
    card.innerHTML=`<svg class="scale" viewBox="0 0 420 190" aria-hidden="true"><path d="M210 30v140M150 178h120" stroke="var(--muted)" stroke-width="4" stroke-linecap="round"/><g class="beam" id="beam" style="transform:rotate(-10deg)"><path d="M60 70h300" stroke="var(--gold)" stroke-width="5" stroke-linecap="round"/><path d="M60 70l-36 60h72zM360 70l-36 60h72z" fill="none" stroke="var(--gold)" stroke-width="2"/><rect x="18" y="128" width="84" height="8" rx="4" fill="var(--gold)"/><rect x="318" y="128" width="84" height="8" rx="4" fill="var(--gold)"/><text x="60" y="120" text-anchor="middle" direction="rtl" font-family="BAmiri, serif" font-size="22" fill="var(--ink)">${esc(row.f[0])}</text><text id="rp" x="360" y="120" text-anchor="middle" direction="rtl" font-family="BAmiri, serif" font-size="22" fill="var(--root)">؟</text></g><circle cx="210" cy="70" r="7" fill="var(--gold)"/></svg>
    <p class="q" style="text-align:center">Bu fiilin vezni hangisi? <span class="muted small">(${n}/10)</span></p><div class="qar" style="font-size:2rem">${esc(row.f[0]+' '+row.f[1])}</div>
    <div class="opts">${opts.map(o=>`<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $('#gi').textContent='Puan '+sc+' · Seri '+streak;
    $$('[data-v]').forEach(b=>b.onclick=()=>{const ok=b.dataset.v===vzPair(B);$$('[data-v]').forEach(x=>{x.disabled=true;if(x.dataset.v===vzPair(B))x.classList.add('ok');});
      if(ok){streak++;sc+=10+Math.min(streak,5)*2;beep('ok');$('#beam').style.transform='rotate(0deg)';$('#rp').textContent=vezin(B,'m');}else{streak=0;b.classList.add('no');beep('no');$('#beam').style.transform='rotate(12deg)';}
      $('#fb').className='fb '+(ok?'ok':'no');$('#fb').innerHTML=(ok?'Denge! ':'Doğrusu: ')+`${A(vzPair(B))} · ${G(B.g).tr}`;
      TIMERS.push(setTimeout(round,1300));});
  };round();
};
GAME.zaid=()=>{
  app.innerHTML=gHead('Zâid Avı');let n=0,sc=0;const card=app.querySelector('.stage .card');
  const round=()=>{
    if(n>=10)return gameEnd('zaid',sc,'10 fiilde '+sc+' puan.',GAME.zaid);
    const row=randomRow(r=>!r.man&&BAB[r.b].g!=='sm'&&clusters(r.f[0]).length===clusters(BAB[r.b].T.m).length);const B=BAB[row.b];const c=clusters(row.f[0]);const z=zaidIdx(B);const p=new Set();n++;
    card.innerHTML=`<p class="q" style="text-align:center">Zâid harflere dokun <span class="muted small">(${n}/10)</span></p><div class="tiles">${c.map((x,i)=>`<button class="tile" data-i="${i}">${esc(x)}</button>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn pri" id="ck">Avla!</button></div><div class="fb" id="fb"></div>`;
    $('#gi').textContent='Puan '+sc;
    $$('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;p.has(i)?p.delete(i):p.add(i);b.classList.toggle('pick');beep('tap');});
    $('#ck').onclick=()=>{let good=0,bad=0;$$('[data-i]').forEach(b=>{const i=+b.dataset.i;b.disabled=true;b.classList.remove('pick');if(z.includes(i)){b.classList.add(p.has(i)?'good':'pick');if(p.has(i))good++;}else if(p.has(i)){b.classList.add('bad');bad++;}});
      const perfect=good===z.length&&!bad;sc+=perfect?15:Math.max(0,good*4-bad*3);beep(perfect?'ok':'no');
      $('#fb').className='fb '+(perfect?'ok':'no');$('#fb').innerHTML=(perfect?'Tam isabet! ':'Zâidler: turuncu/yeşil. ')+`${A(vzPair(B))}<div class="small muted" style="font-weight:400">${B.al}</div>`;
      $('#ck').textContent='Sonraki';$('#ck').onclick=round;};
  };round();
};
GAME.tugla=()=>{
  app.innerHTML=gHead('Tuğla Ustası');let n=0,sc=0;const card=app.querySelector('.stage .card');
  const round=()=>{
    if(n>=8)return gameEnd('tugla',sc,'8 kalıpta '+sc+' puan.',GAME.tugla);
    const row=randomRow(r=>!r.man);const k=1+rnd(4);const target=row.f[k];const tc=clusters(target);
    const dec=clusters(mutate(target)||target).filter((x,i)=>x!==tc[i]).slice(0,1);const extra=[...dec,pick(['تَ','نْ','مُ','ا','سْ','وْ'].filter(x=>!tc.includes(x)))];
    const tiles=shuffle([...tc,...extra].map((t,i)=>({t,i})));const placed=[];n++;let tries=0;
    const draw=()=>{
      card.innerHTML=`<p class="q" style="text-align:center">${A(row.f[0])} fiilinin <b>${SLOT_NAMES[SK[k]]}</b> kalıbını inşa et <span class="muted small">(${n}/8)</span></p><p class="tiny muted" style="text-align:center">Vezin: ${A(fill(BAB[row.b].T[SK[k]]||'',VZ_ROOT)||'semâî')}</p>
      <div class="slots">${placed.map((p,j)=>`<button class="tile" data-p="${j}">${esc(p.t)}</button>`).join('')||'<span class="muted small" style="align-self:center">Tuğlaları buraya diz (sağdan sola)</span>'}</div>
      <div class="tiles">${tiles.map((x,j)=>`<button class="tile ${placed.includes(x)?'ghost':''}" data-t="${j}">${esc(x.t)}</button>`).join('')}</div>
      <div class="row" style="justify-content:center"><button class="btn" id="un">Geri al</button><button class="btn pri" id="ck" ${placed.length?'':'disabled'}>Kontrol</button><button class="btn ghost" id="pass">Pas</button></div><div class="fb" id="fb"></div>`;
      $$('[data-t]').forEach(b=>b.onclick=()=>{placed.push(tiles[+b.dataset.t]);beep('tap');draw();});
      $$('[data-p]').forEach(b=>b.onclick=()=>{placed.splice(+b.dataset.p,1);draw();});
      $('#un').onclick=()=>{placed.pop();draw();};
      $('#pass').onclick=()=>{$('#fb').className='fb no';$('#fb').innerHTML='Doğrusu: '+A(target);TIMERS.push(setTimeout(round,1500));};
      $('#ck').onclick=()=>{const w=placed.map(p=>p.t).join('');if(w===target){sc+=tries?6:12;beep('ok');$('#fb').className='fb ok';$('#fb').innerHTML='Sağlam bina! '+A(target);TIMERS.push(setTimeout(round,1200));}else{tries++;beep('no');$('#fb').className='fb no';$('#fb').textContent=tries>1?'İpucu: ilk tuğla '+tc[0]:'Olmadı, tekrar dene.';}};
    };draw();
  };round();
};
GAME.asansor=()=>{
  app.innerHTML=gHead('Asansör');let sc=0,left=60,row;const card=app.querySelector('.stage .card');
  const floors=['lh','lt','rz','ld','rm','z3','z2','z1','sm'];
  const next=()=>{row=randomRow();draw();};
  const draw=()=>{
    card.innerHTML=`<div class="hud"><span class="timer ${left<=10?'low':''}" id="tm">⏱ ${left} sn</span><b>Puan ${sc}</b></div><div class="qar">${esc(row.f[0])}</div><p class="tiny muted" style="text-align:center">Bu fiil sarayın hangi katında oturur?</p>
    <div class="elev">${floors.map(f=>`<button data-f="${f}"><span>${G(f).tr}</span><span class="ar">${esc(G(f).ar)}</span></button>`).join('')}</div>`;
    $$('[data-f]').forEach(b=>b.onclick=()=>{const B=BAB[row.b];const ok=b.dataset.f===B.g;b.classList.add(ok?'ok':'no');if(ok){sc+=10;beep('ok');}else{beep('no');left=Math.max(0,left-3);const r=$(`[data-f="${B.g}"]`);if(r)r.classList.add('ok');}$$('[data-f]').forEach(x=>x.disabled=true);TIMERS.push(setTimeout(next,ok?350:900));});
  };
  next();
  TIMERS.push(setInterval(()=>{left--;const t=$('#tm');if(t){t.textContent='⏱ '+left+' sn';t.classList.toggle('low',left<=10);}if(left<=0){stopTimers();gameEnd('asansor',sc,'60 saniyede '+sc/10+' fiil doğru kata çıktı.',GAME.asansor);}},1000));
};
GAME.hafiza=()=>{
  app.innerHTML=gHead('Hafıza Sarayı');const card=app.querySelector('.stage .card');
  const seen=new Set();const bs=shuffle(BABS).filter(b=>{const t=vzPair(b);if(seen.has(t))return false;seen.add(t);return true;}).slice(0,6);
  const cards=shuffle(bs.flatMap(b=>[{id:b.id,t:vzPair(b),k:'v'},{id:b.id,t:make(b.id,'m',rootOf(b))+' '+make(b.id,'u',rootOf(b)),k:'m'}]));
  let open=[],done=0,moves=0,lock=false;
  const draw=()=>{card.innerHTML=`<p class="tiny muted" style="text-align:center">Vezni (فَعَلَ…) mevzûnuyla eşleştir. Hamle: <b id="mv">${moves}</b></p><div class="mem">${cards.map((c,i)=>`<button class="mc ${c.done?'done':''} ${open.includes(i)?'open':''}" data-i="${i}" aria-label="Kart ${i+1}"><span>${esc(c.t)}</span><span class="back">✦</span></button>`).join('')}</div>`;
    $$('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;const c=cards[i];if(lock||c.done||open.includes(i))return;open.push(i);beep('tap');
      if(open.length===2){moves++;const [a,b2]=open.map(j=>cards[j]);if(a.id===b2.id&&a.k!==b2.k){a.done=b2.done=true;done++;open=[];beep('ok');if(done===bs.length){draw();return gameEnd('hafiza',Math.max(10,100-(moves-6)*6),moves+' hamlede tamamlandı.',GAME.hafiza);}}else{lock=true;draw();TIMERS.push(setTimeout(()=>{open=[];lock=false;draw();},900));return;}}
      draw();});};
  draw();
};
GAME.kapi=()=>{
  app.innerHTML=gHead('Yedi Kapı');let sc=0,left=60,cur;const card=app.querySelector('.stage .card');
  const pool=[];AQ_ORDER.forEach(k=>AQSAM[k].forEach(w=>pool.push([w,k])));MUTEL.forEach(m=>m.rows.forEach(r=>pool.push([r.x[0],m.id])));
  const next=()=>{cur=pick(pool);draw();};
  const draw=()=>{card.innerHTML=`<div class="hud"><span class="timer ${left<=10?'low':''}" id="tm">⏱ ${left} sn</span><b>Puan ${sc}</b></div><div class="qar">${esc(cur[0])}</div><div class="bins">${AQ_ORDER.map(k=>`<button class="bin" data-k="${k}"><b>${AQ_INFO[k].tr}</b><span class="ar">${AQ_INFO[k].ar}</span></button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('[data-k]').forEach(b=>b.onclick=()=>{const ok=b.dataset.k===cur[1];b.classList.add(ok?'ok':'no');$$('[data-k]').forEach(x=>x.disabled=true);if(ok){sc+=10;beep('ok');}else{beep('no');$(`[data-k="${cur[1]}"]`).classList.add('ok');$('#fb').className='fb no';$('#fb').textContent=AQ_INFO[cur[1]].tr+': '+AQ_INFO[cur[1]].d;}TIMERS.push(setTimeout(next,ok?350:1300));});};
  next();
  TIMERS.push(setInterval(()=>{left--;const t=$('#tm');if(t){t.textContent='⏱ '+left+' sn';t.classList.toggle('low',left<=10);}if(left<=0){stopTimers();gameEnd('kapi',sc,'60 saniyede '+sc/10+' fiil doğru kapıdan geçti.',GAME.kapi);}},1000));
};
GAME.mana=()=>{
  app.innerHTML=gHead('Mânâ Avcısı');let n=0,sc=0;const card=app.querySelector('.stage .card');
  const pool=BABS.filter(b=>b.ex&&b.ex.length);
  const round=()=>{
    if(n>=10)return gameEnd('mana',sc,'10 cümlede '+sc+' puan.',GAME.mana);
    const B=pick(pool);const e=pick(B.ex);n++;
    const kinds=shuffle(Object.keys(BINA_KIND).filter(k=>k!==B.bk)).slice(0,3).concat(B.bk);
    card.innerHTML=`<p class="q" style="text-align:center">Bu cümledeki fiilin bâbı hangi mânâ için kurulmuştur? <span class="muted small">(${n}/10)</span></p><div class="qar" style="font-size:2rem">${esc(e[0])}</div><p class="tiny muted" style="text-align:center">${A(vzPair(B))}</p><div class="opts">${shuffle(kinds).map(k=>`<button class="opt tr" data-k="${k}">${BINA_KIND[k]}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $('#gi').textContent='Puan '+sc;
    $$('[data-k]').forEach(b=>b.onclick=()=>{const ok=b.dataset.k===B.bk;$$('[data-k]').forEach(x=>{x.disabled=true;if(x.dataset.k===B.bk)x.classList.add('ok');});if(!ok)b.classList.add('no');sc+=ok?10:0;beep(ok?'ok':'no');$('#fb').className='fb '+(ok?'ok':'no');$('#fb').innerHTML=`${esc(e[1])}<div class="small muted" style="font-weight:400">${B.bn}</div>`;TIMERS.push(setTimeout(round,1900));});
  };round();
};
/* ---------- SINAV ---------- */
const SCOPES=[
 {id:'sm',t:'Sülâsî mücerred (6 bâb)',bs:b=>b.g==='sm'},
 {id:'zm',t:'Sülâsî mezîd (12 bâb)',bs:b=>/^z/.test(b.g)},
 {id:'rb',t:'Rubâî ve mülhaklar (17 bâb)',bs:b=>!/^(sm|z)/.test(b.g)},
 {id:'mt',t:'Sahîh–mu‘tel kısımları ve idğam',bs:null}
];
const TAGS={form:'Kalıp üretme',babOf:'Bâb tespiti',mevzun:'Vezin–mevzûn',bina:'Binâ (mânâ)',alamet:'Alâmet',zaid:'Zâid harfler',grup:'Kategori',kisim:'Yedi kısım',mutel:'Mu‘tel çekim',idgam:'İdğam'};
function genExam(scopes,count){
  const bs=BABS.filter(b=>scopes.some(s=>SCOPES.find(x=>x.id===s).bs&&SCOPES.find(x=>x.id===s).bs(b)));
  const mt=scopes.includes('mt');
  const gens=[];
  const rowsOf=b=>SET['b-'+b.id].rows;
  if(bs.length){
    gens.push(()=>{const b=pick(bs.filter(b=>rowsOf(b).length));const row=pick(rowsOf(b));const k=1+rnd(4);const lab=k===3&&b.fLbl?b.fLbl:SLOT_NAMES[SK[k]];return {tag:'form',q:`${A(row.f[0])} fiilinin <b>${lab.toLocaleLowerCase('tr')}</b> kalıbı hangisidir?`,o:[row.f[k],...distract(row,k)],a:0,ar:true,ex:`${A(vzPair(b))} bâbı: ${A(row.f.join(' – '))}`};});
    gens.push(()=>{const b=pick(bs.filter(b=>rowsOf(b).length));const row=pick(rowsOf(b));const o=babOptions(b);return {tag:'babOf',q:`${A(row.f[0]+(b.g==='sm'?' '+row.f[1]:''))} hangi bâbdandır?`,o,a:o.indexOf(vzPair(b)),ar:true,ex:`${G(b.g).tr} · ${b.n}. bâb. ${b.al}`};});
    gens.push(()=>{const b=pick(bs);const right=mevzunLine(b);const seen=new Set([right]);const o=[right];shuffle(BABS.filter(x=>x!==b&&(x.g===b.g||nRoot(x)===nRoot(b)))).forEach(x=>{const t=mevzunLine(x);if(o.length<4&&!seen.has(t)){seen.add(t);o.push(t);}});return {tag:'mevzun',q:`Vezni ${A(vezinLine(b))} olan bâbın kitaptaki mevzûnu hangisidir?`,o,a:0,ar:true,ex:'Mevzûn: '+A(right)};});
    gens.push(()=>{const b=pick(bs);const ks=shuffle(Object.keys(BINA_KIND).filter(k=>BINA_KIND[k]!==BINA_KIND[b.bk])).slice(0,3);return {tag:'bina',q:`${A(vezinLine(b))} bâbının binâsı (asıl mânâ özelliği) nedir?`,o:[BINA_KIND[b.bk],...ks.map(k=>BINA_KIND[k])],a:0,ex:b.bn};});
    gens.push(()=>{const b=pick(bs.filter(b=>b.g!=='sm'));if(!b)return null;const o=babOptions(b);return {tag:'alamet',q:`Alâmeti şu olan bâb hangisidir?<div class="small muted" style="font-weight:400;margin-top:4px">“${b.al}”</div>`,o,a:o.indexOf(vzPair(b)),ar:true,ex:A(vezinLine(b))};});
    gens.push(()=>{const b=pick(bs);const row=pick(rowsOf(b).length?rowsOf(b):[{f:[make(b.id,'m',rootOf(b))]}]);const z=zaidCount(b);return {tag:'zaid',q:`${A(row.f[0])} fiilinin mâzisinde kaç zâid harf vardır?`,o:['0','1','2','3'],a:z,ex:`${mLetters(b)} harf: ${nRoot(b)} aslî + ${z} zâid. ${b.al}`};});
    gens.push(()=>{const b=pick(bs);const row=pick(rowsOf(b).length?rowsOf(b):[{f:[make(b.id,'m',rootOf(b))]}]);const gs=[...new Set([b.g,...shuffle(GROUPS.map(g=>g.id))])].slice(0,4);const o=shuffle(gs);return {tag:'grup',q:`${A(row.f[0])} fiili hangi kategoriye aittir?`,o:o.map(g=>G(g).tr),a:o.indexOf(b.g),ex:G(b.g).desc};});
  }
  if(mt){
    gens.push(()=>{const k=pick(AQ_ORDER);const w=pick(AQSAM[k]);const o=[k,...sample(AQ_ORDER.filter(x=>x!==k),3)];const os=shuffle(o);return {tag:'kisim',q:`${A(w)} fiili yedi kısımdan hangisidir?`,o:os.map(x=>AQ_INFO[x].tr),a:os.indexOf(k),ex:AQ_INFO[k].tr+': '+AQ_INFO[k].d};});
    gens.push(()=>{const M=pick(MUTEL.filter(m=>m.id!=='sahih'));const r=pick(SET['m-'+M.id].rows);const k=1+rnd(4);return {tag:'mutel',q:`${A(r.f[0])} (${A(vzPair(BAB[r.b]))}) fiilinin <b>${SLOT_NAMES[SK[k]].toLocaleLowerCase('tr')}</b> kalıbı hangisidir?`,o:[r.f[k],...distract(r,k)],a:0,ar:true,ex:`${M.tr}: ${A(r.f.join(' – '))}`};});
    gens.push(()=>{const Q=pick([['مَدَّ يَمُدُّ','Vâcib'],['لَمْ يَمُدَّ','Câiz'],['مَدَدْتُ','Mümteni'],['رَدَّ','Vâcib'],['مَدَدْنَ','Mümteni'],['لَمْ يَفِرَّ','Câiz']]);const o=['Vâcib','Câiz','Mümteni'];return {tag:'idgam',q:`${A(Q[0])} örneğindeki idğam hangi nevidendir?`,o,a:o.indexOf(Q[1]),ex:'Vâcib: iki harf harekeli veya ilki sâkin; câiz: ikincisi ârızî sükûnla sâkin; mümteni: ikincisi aslî sükûnla sâkin.'};});
  }
  const out=[];const keys=new Set();let guard=0;
  while(out.length<count&&guard++<count*40){const g=gens[out.length%gens.length===0?rnd(gens.length):rnd(gens.length)];const q=g();if(!q||q.a<0)continue;const key=q.q;if(keys.has(key))continue;keys.add(key);
    /* seçenekleri karıştır */
    const idx=shuffle(q.o.map((_,i)=>i));q.o=idx.map(i=>q.o[i]);q.a=idx.indexOf(q.a);out.push(q);}
  return out;
}
let EX=null;
V.sinav=([sub])=>{
  if(sub==='run'&&EX)return examRun();
  if(sub==='sonuc'&&EX&&EX.done)return examResult();
  if(sub==='belge'&&EX&&EX.done)return examCert();
  const hist=S.exams.slice(-8).reverse();
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">الاِمْتِحَانُ</div><h2>Sınav</h2></div></div>
  <div class="grid g2"><div class="card">
    <h3>Sınavı hazırla</h3>
    <div class="field" style="margin-top:10px"><label for="nm">Adın (belge için)</label><input id="nm" value="${esc(S.name||'')}" placeholder="Ad Soyad" maxlength="60"></div>
    <p class="small" style="margin:12px 0 6px"><b>Kapsam</b></p>
    <div class="grid" style="gap:6px">${SCOPES.map((s,i)=>`<label class="check"><input type="checkbox" value="${s.id}" ${i<3?'checked':''}><span>${s.t}</span></label>`).join('')}</div>
    <div class="row" style="margin-top:12px">
      <div class="field"><label for="qn">Soru sayısı</label><select id="qn"><option>10</option><option selected>20</option><option>30</option><option>40</option><option>50</option></select></div>
      <div class="field"><label for="tm">Süre</label><select id="tm"><option value="0">Süresiz</option><option value="10">10 dk</option><option value="20" selected>20 dk</option><option value="30">30 dk</option><option value="45">45 dk</option></select></div>
    </div>
    <div class="row" style="margin-top:14px"><button class="btn pri" id="go">Sınavı başlat ${ICON.arrow}</button></div>
  </div>
  <div class="card"><h3>Soru türleri</h3><ul class="small muted" style="padding-inline-start:18px;margin:8px 0 0">
    <li>Tatbikat fiillerinden muzâri, emir, ism-i fâil ve masdar üretme</li><li>Fiilin bâbını tespit etme; vezin–mevzûn eşleştirme</li><li>Bâbın binâsı (ta‘diye, mutâvaat, müşâreket…) ve alâmeti</li><li>Zâid harf sayısı ve kategori (mücerred, mezîd, mülhak)</li><li>Yedi kısım, mu‘tel fiil çekimi ve idğam nevileri</li></ul>
    <p class="small" style="margin-top:12px"><b>Değerlendirme:</b> 85+ Pekiyi · 70+ İyi · 60+ Orta · 50+ Geçer · altı Tekrar.</p>
    ${hist.length?`<h3 style="margin-top:14px">Geçmiş</h3><div class="bars" style="margin-top:8px">${hist.map(e=>`<div><span class="small">${new Date(e.at).toLocaleDateString('tr-TR')} · ${e.n} soru</span><div class="pbar"><i style="width:${e.pct}%"></i></div><b>%${e.pct}</b></div>`).join('')}</div>`:''}
  </div></div>`;
  $('#go').onclick=()=>{
    const sc=$$('.check input:checked').map(x=>x.value);if(!sc.length){toast('En az bir kapsam seç.');return;}
    S.name=$('#nm').value.trim();save();
    const qs=genExam(sc,+$('#qn').value);
    EX={qs,ans:qs.map(()=>null),flag:qs.map(()=>false),i:0,start:Date.now(),limit:+$('#tm').value*60,done:false,scopes:sc};
    location.hash='#sinav/run';
  };
};
function examRun(){
  const draw=()=>{
    const q=EX.qs[EX.i];
    app.innerHTML=`<div class="stage"><div class="hud"><b>Soru ${EX.i+1}/${EX.qs.length}</b><span class="chip">${TAGS[q.tag]}</span><span class="timer" id="tm"></span></div>
    <div class="pbar"><i style="width:${EX.ans.filter(a=>a!==null).length/EX.qs.length*100}%"></i></div>
    <div class="card" style="margin-top:12px"><div class="q">${q.q}</div><div class="opts">${q.o.map((o,j)=>`<button class="opt ${q.ar?'':'tr'} ${EX.ans[EX.i]===j?'picked':''}" data-j="${j}">${esc(o)}</button>`).join('')}</div>
    <div class="row" style="justify-content:space-between;margin-top:14px"><button class="btn sm" id="pv" ${EX.i?'':'disabled'}>‹ Önceki</button><button class="btn sm ghost" id="fg">${EX.flag[EX.i]?'⚑ İşareti kaldır':'⚐ Sonra bak'}</button>${EX.i<EX.qs.length-1?'<button class="btn sm pri" id="nx">Sonraki ›</button>':'<button class="btn sm pri" id="fin">Bitir</button>'}</div></div>
    <div class="qnav">${EX.qs.map((_,j)=>`<button data-n="${j}" class="${EX.ans[j]!==null?'ans':''} ${j===EX.i?'cur':''} ${EX.flag[j]?'flag':''}">${j+1}</button>`).join('')}</div>
    <div class="row" style="margin-top:12px"><button class="btn sm ghost" id="fin2">Sınavı bitir</button><button class="btn sm ghost" id="quit">Vazgeç</button></div></div>`;
    $$('[data-j]').forEach(b=>b.onclick=()=>{EX.ans[EX.i]=+b.dataset.j;beep('tap');if(EX.i<EX.qs.length-1){EX.i++;}draw();});
    $('#pv').onclick=()=>{EX.i--;draw();};
    if($('#nx'))$('#nx').onclick=()=>{EX.i++;draw();};
    $('#fg').onclick=()=>{EX.flag[EX.i]=!EX.flag[EX.i];draw();};
    $$('[data-n]').forEach(b=>b.onclick=()=>{EX.i=+b.dataset.n;draw();});
    const fin=()=>{const blank=EX.ans.filter(a=>a===null).length;if(blank&&!confirm(blank+' soru boş. Yine de bitirilsin mi?'))return;finishExam();};
    if($('#fin'))$('#fin').onclick=fin;$('#fin2').onclick=fin;
    $('#quit').onclick=()=>{if(confirm('Sınav iptal edilsin mi?')){EX=null;location.hash='#sinav';}};
    tick();
  };
  const tick=()=>{const t=$('#tm');if(!t)return;const el=Math.floor((Date.now()-EX.start)/1000);if(EX.limit){const l=EX.limit-el;if(l<=0){finishExam();return;}t.textContent='⏱ '+Math.floor(l/60)+':'+String(l%60).padStart(2,'0');t.classList.toggle('low',l<60);}else t.textContent='⏱ '+Math.floor(el/60)+':'+String(el%60).padStart(2,'0');};
  TIMERS.push(setInterval(tick,1000));
  draw();
}
function finishExam(){
  stopTimers();
  const n=EX.qs.length;const c=EX.qs.filter((q,i)=>EX.ans[i]===q.a).length;
  EX.done=true;EX.c=c;EX.pct=Math.round(c/n*100);EX.time=Math.floor((Date.now()-EX.start)/1000);
  S.exams.push({at:Date.now(),n,c,pct:EX.pct});S.exams=S.exams.slice(-30);save();addXP(c*5);
  if(EX.pct>=85){confetti();beep('win');}
  location.hash='#sinav/sonuc';
}
const grade=p=>p>=85?'Pekiyi':p>=70?'İyi':p>=60?'Orta':p>=50?'Geçer':'Tekrar';
function examResult(){
  const tags={};EX.qs.forEach((q,i)=>{const t=tags[q.tag]=tags[q.tag]||{n:0,c:0};t.n++;if(EX.ans[i]===q.a)t.c++;});
  app.innerHTML=`<div class="stage"><div class="card" style="text-align:center"><div class="eyebrow">Sınav sonucu</div><div class="scorebig">%${EX.pct}</div><p><b>${grade(EX.pct)}</b> · ${EX.c}/${EX.qs.length} doğru · ${Math.floor(EX.time/60)} dk ${EX.time%60} sn</p>
    <div class="row" style="justify-content:center"><button class="btn pri" id="cert">Başarı belgesi</button>${EX.c<EX.qs.length?'<button class="btn" id="wr">Yanlışlarla yeni sınav</button>':''}<a class="btn" href="#sinav">Yeni sınav</a></div></div>
  <div class="card" style="margin-top:12px"><h3>Konu raporu</h3><div class="bars" style="margin-top:10px">${Object.entries(tags).map(([k,v])=>`<div><span>${TAGS[k]}</span><div class="pbar"><i style="width:${v.c/v.n*100}%;background:${v.c/v.n>=.7?'var(--good)':v.c/v.n>=.5?'var(--gold)':'var(--bad)'}"></i></div><b>${v.c}/${v.n}</b></div>`).join('')}</div></div>
  <div class="card" style="margin-top:12px"><h3>Cevap anahtarı</h3>${EX.qs.map((q,i)=>{const ok=EX.ans[i]===q.a;return `<div class="rev ${ok?'ok':'no'}"><div class="small"><b>${i+1}.</b> ${q.q}</div><div class="small" style="margin-top:4px">${ok?'✓':'✗'} Senin cevabın: ${EX.ans[i]===null?'<i>boş</i>':(q.ar?A(q.o[EX.ans[i]]):esc(q.o[EX.ans[i]]))}${ok?'':` · Doğrusu: <b>${q.ar?A(q.o[q.a]):esc(q.o[q.a])}</b>`}</div><div class="tiny muted" style="margin-top:2px">${q.ex}</div></div>`;}).join('')}</div></div>`;
  $('#cert').onclick=()=>location.hash='#sinav/belge';
  if($('#wr'))$('#wr').onclick=()=>{const wrong=EX.qs.filter((q,i)=>EX.ans[i]!==q.a).map(q=>Object.assign({},q));EX={qs:wrong,ans:wrong.map(()=>null),flag:wrong.map(()=>false),i:0,start:Date.now(),limit:0,done:false,scopes:EX.scopes};location.hash='#sinav/run';};
}
function examCert(){
  const d=new Date().toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});
  app.innerHTML=`<div class="stage"><div class="cert"><div class="kufi">بِنَاءُ الأَفْعَالِ</div><div class="eyebrow" style="margin-top:6px">Başarı Belgesi</div>
  <h2 style="margin-top:10px">${esc(S.name||'Değerli öğrenci')}</h2><p>Binâ Sarayı programında <b>Binâü’l-Ef‘âl</b> sınavını <b>${EX.qs.length}</b> soruda <b>%${EX.pct}</b> başarı ile tamamlamış ve <b>“${grade(EX.pct)}”</b> derecesini almıştır.</p>
  <p class="muted small">${d} · Rütbe: ${lvl().name} · Yanan pencere: ${BABS.filter(b=>S.stars[b.id]).length}/35</p>
  <p class="small" style="margin-top:16px"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p></div>
  <div class="row noprint" style="justify-content:center;margin-top:14px"><button class="btn pri" id="pr">Yazdır / PDF</button><a class="btn" href="#sinav/sonuc">Sonuca dön</a></div></div>`;
  $('#pr').onclick=()=>window.print();
}
/* ---------- TELHÎS ---------- */
V.ozet=()=>{
  let f='all',q='';
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">تَلْخِيصٌ</div><h2>Telhîs: 35 bâb tek tabloda</h2></div></div>
  <div class="row"><input class="search" id="q" placeholder="Ara: vezin, mevzûn veya binâ (ör. mutâvaat)" aria-label="Ara"></div>
  <div class="filter" id="ff" style="margin:10px 0">${[['all','Hepsi'],...GROUPS.map(g=>[g.id,g.tr])].map(([id,t])=>`<button data-f="${id}" class="${id===f?'on':''}">${t}</button>`).join('')}</div>
  <div class="tscroll"><table class="tbl" style="--c:var(--gold)"><thead><tr><th>#</th><th><span class="ar">وَزْنُ الفِعْلِ</span>Vezin</th><th><span class="ar">مَوْزُونُهُ</span>Mevzûn</th><th><span class="ar">بِنَاؤُهُ</span>Binâ</th></tr></thead><tbody id="tb"></tbody></table></div>`;
  const draw=()=>{$('#tb').innerHTML=BABS.filter(b=>(f==='all'||b.g===f)&&(!q||(vezinLine(b)+mevzunLine(b)+b.bn+b.bnAr+BINA_KIND[b.bk]+G(b.g).tr).toLocaleLowerCase('tr').includes(q)||strip(vezinLine(b)+mevzunLine(b)).includes(strip(q)))).map(b=>`<tr style="cursor:pointer" data-b="${b.id}"><td class="tiny" style="font-family:var(--f-ui)"><span class="num" style="--c:${gcol(b)}">${b.n}</span></td><td>${esc(vezinLine(b))}</td><td>${esc(mevzunLine(b))}</td><td style="font-size:1.05rem">${esc(b.bnAr)}<div class="tiny muted" style="font-family:var(--f-ui);line-height:1.3">${BINA_KIND[b.bk]}</div></td></tr>`).join('')||'<tr><td colspan="4" class="small muted" style="font-family:var(--f-ui)">Sonuç yok.</td></tr>';
    $$('#tb [data-b]').forEach(r=>r.onclick=()=>location.hash='#bab/'+r.dataset.b);};
  $('#q').oninput=e=>{q=e.target.value.trim().toLocaleLowerCase('tr');draw();};
  $$('#ff [data-f]').forEach(b=>b.onclick=()=>{f=b.dataset.f;$$('#ff [data-f]').forEach(x=>x.classList.toggle('on',x===b));draw();});
  draw();
};
V.hakkinda=()=>{app.innerHTML=`<div style="max-width:760px;margin:0 auto">
<h2 style="margin:8px 0 14px">Program hakkında</h2>
<div style="border:1px solid var(--line,var(--rule));border-radius:18px;padding:28px 18px;text-align:center">
<div style="font-family:var(--f-ar,serif);font-size:2rem;direction:rtl;line-height:1.6">بِنَاءُ الْأَفْعَالِ</div>
<p style="margin:14px 0 6px;font-size:1.05rem"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p>
<p style="margin:6px 0;color:var(--muted)">Kaynak: <i>Tavdîhu Metni Binâi’l-Ef‘âl</i> (1442/2021)</p>
<p style="margin:6px 0;color:var(--muted)">© 2026 Hüseyin KAYA · İstifade edilmesi temennisiyle…</p>
</div>
<p style="margin:14px 4px;color:var(--muted);font-size:.9rem">35 bâb dersi, tatbikat tabloları, atölye, yedi oyun ve raporlu sınav. Program tek bir dosyadır ve internet bağlantısı olmadan çalışır; ilerlemeniz yalnızca bu cihazda saklanır.</p>
</div>`;};
/* ---------- başlat ---------- */
document.documentElement.lang='tr';
themeBtn();sndBtn();hud();route();
