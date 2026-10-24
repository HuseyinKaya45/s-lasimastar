/* ===== Maksûd Darphânesi — uygulama ===== */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const app=$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const isAr=s=>/[؀-ۿ]/.test(s)&&!/[a-zçğıöşü]/i.test(String(s).replace(/<[^>]*>/g,''));
const A=(s,c='')=>`<span class="ar ${c}">${esc(s)}</span>`;
/* Metindeki Arapça parçaları otomatik sarar (Türkçe açıklama içinde) */
const AW=s=>String(s).replace(/([؀-ۿ﴾﴿][؀-ۿـً-ٰٕ﴾﴿\s،؛؟.…\-()_/]*[؀-ۿً-ٰٕ﴾﴿])/g,'<span class="ar">$1</span>');
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);
const strip=s=>s.replace(/[ً-ٰٕـ‍]/g,'');
const ICON={
 play:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
 arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 back:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
 sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 snd:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7"/></svg>',
 mute:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6"/></svg>',
 target:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
 role:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h7"/><circle cx="18" cy="16" r="3"/></svg>',
 mark:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 19c3-1 4-4 4-7M9 5c4 0 7 2 7 6M13 19h6"/></svg>',
 split:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v6M12 9l-6 6v6M12 9l6 6v6"/></svg>',
 door:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21V9a8 8 0 0 1 16 0v12M2 21h20"/></svg>',
 bridge:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 17h20M4 17v-4a8 8 0 0 1 16 0v4M8 17v-3M16 17v-3M12 17v-4"/></svg>',
 eye:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
 ghost:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 20V10a6 6 0 0 1 12 0v10l-2-1.5L14 20l-2-1.5L10 20l-2-1.5z"/><circle cx="10" cy="11" r="1" fill="currentColor"/><circle cx="14" cy="11" r="1" fill="currentColor"/></svg>',
 bolt:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
 mem:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>'
};
ICON.compass='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5z" fill="currentColor"/></svg>';
ICON.scale='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M7 21h10M4 7h16M4 7l-3 7a3 3 0 0 0 6 0zM20 7l-3 7a3 3 0 0 0 6 0z"/></svg>';
ICON.ladder='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 2v20M17 2v20M7 6h10M7 11h10M7 16h10"/></svg>';
ICON.book='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/></svg>';
ICON.who='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20a6 6 0 0 1 12 0M10 20a6 6 0 0 1 12 0"/></svg>';
ICON.sort='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h11M4 18h6M19 14v6M16 17l3 3 3-3"/></svg>';
/* ---------- durum ---------- */
const KEY='maksud-darphanesi-v1';
const FRESH=()=>({v:1,xp:0,les:{},ilal:{},darp:{},exams:[],best:{},played:{},cards:{},badges:{},snd:true,day:'',streak:0,name:''});
let S=FRESH();
try{const t=JSON.parse(localStorage.getItem(KEY)||'null');if(t&&t.v===1)S=Object.assign(S,t);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
(function streak(){const d=new Date().toISOString().slice(0,10);if(S.day===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();})();
const LEVELS=[[0,'Çırak'],[300,'Kalfa'],[900,'Sikkezen'],[1800,'Ayarcı'],[3200,'Darphâne Emîni'],[5000,'Üstâd']];
function lvl(){let i=0;LEVELS.forEach((l,k)=>{if(S.xp>=l[0])i=k;});const cur=LEVELS[i][0],nx=LEVELS[i+1]?LEVELS[i+1][0]:cur+1;return {name:LEVELS[i][1],p:LEVELS[i+1]?(S.xp-cur)/(nx-cur):1};}
function hud(){const l=lvl();$('#lvlName').textContent=l.name;$('#lvlBar').style.width=Math.round(l.p*100)+'%';$('#xp').textContent=S.xp;}
function addXP(n){const b=lvl().name;S.xp+=n;save();hud();const a=lvl().name;if(a!==b){toast('Tebrikler! Yeni rütbe: '+a);confetti();}}
const lstar=id=>{const r=S.les[id];if(!r)return 0;return r.best>=1?3:r.best>=.6?2:1;};
const KC=k=>KISIM[k].col;
const AD=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
let AC=null;
function beep(kind){if(!S.snd)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const seq=kind==='ok'?[[660,.07],[990,.1]]:kind==='no'?[[200,.16]]:kind==='win'?[[523,.08],[659,.08],[784,.08],[1046,.2]]:[[520,.04]];let t=AC.currentTime;seq.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=kind==='no'?'sawtooth':'sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.2,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.02);t+=d;});}catch(e){}}
function speak(t){try{const u=new SpeechSynthesisUtterance(strip(t).length?t:t);u.lang='ar-SA';u.rate=.8;const v=speechSynthesis.getVoices().find(v=>/^ar/i.test(v.lang));if(v)u.voice=v;else toast('Cihazınızda Arapça ses bulunamadı.');speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){toast('Sesli okuma desteklenmiyor.');}}
let tT=0;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tT);tT=setTimeout(()=>t.hidden=true,2600);}
function confetti(){const c=$('#cf');c.hidden=false;const x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const cols=['#f2c867','#5fd3a0','#62c0ea','#bb94f0','#ff9f6e'];const P=Array.from({length:130},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*.5,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,s:3+Math.random()*5,r:Math.random()*6,c:pick(cols)}));let f=0;(function go(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=.1;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.beginPath();for(let k=0;k<5;k++){const a=k*1.2566,b=a+.628;x.lineTo(Math.cos(a)*p.s,Math.sin(a)*p.s);x.lineTo(Math.cos(b)*p.s*.45,Math.sin(b)*p.s*.45);}x.fill();x.restore();});if(++f<170)requestAnimationFrame(go);else c.hidden=true;})();}
const isDark=()=>document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
function themeBtn(){$('#thm').innerHTML=isDark()?ICON.sun:ICON.moon;}
try{const th=localStorage.getItem(KEY+'-theme');if(th)document.documentElement.dataset.theme=th;}catch(e){}
$('#thm').onclick=()=>{document.documentElement.dataset.theme=isDark()?'light':'dark';try{localStorage.setItem(KEY+'-theme',document.documentElement.dataset.theme);}catch(e){}themeBtn();};
function sndBtn(){$('#snd').innerHTML=S.snd?ICON.snd:ICON.mute;}
$('#snd').onclick=()=>{S.snd=!S.snd;save();sndBtn();};
let sheetOnClose=null;
function openSheet(html,onClose){sheetOnClose=onClose||null;$('#sheet').innerHTML=`<div class="sheet-bg"><div class="sheet" role="dialog" aria-modal="true">${html}</div></div>`;$('#sheet .sheet-bg').onclick=e=>{if(e.target.classList.contains('sheet-bg'))closeSheet();};$$('#sheet [data-close]').forEach(b=>b.onclick=closeSheet);}
function closeSheet(){$('#sheet').innerHTML='';if(sheetOnClose){const f=sheetOnClose;sheetOnClose=null;f();}}
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#sheet').innerHTML)closeSheet();});
const stars=(n,max=3)=>{let s='';for(let i=0;i<max;i++)s+=i<n?'★':'<span class="off">★</span>';return `<span class="stars" aria-label="${n} yıldız">${s}</span>`;};
const optCls=o=>isAr(o)?'opt':'opt tr';
