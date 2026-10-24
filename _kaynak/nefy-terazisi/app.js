/* ===== Nefy Terazisi — uygulama ===== */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const app=$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const isAr=s=>/[؀-ۿ]/.test(s)&&!/[a-zçğıöşü]/i.test(String(s).replace(/<[^>]*>/g,''));
const A=(s,c='')=>`<span class="ar ${c}">${esc(s)}</span>`;
const AW=s=>String(s).replace(/([؀-ۿ﴾﴿][؀-ۿـً-ٰٕ﴾﴿\s،؛؟.…\-()_/]*[؀-ۿً-ٰٕ﴾﴿])/g,'<span class="ar">$1</span>');
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);
const ICON={
 play:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
 arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 back:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
 sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 snd:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7"/></svg>',
 mute:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6"/></svg>',
 scale:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M7 21h10M4 7h16M4 7l-3 7a3 3 0 0 0 6 0zM20 7l-3 7a3 3 0 0 0 6 0z"/></svg>',
 target:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
 book:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/></svg>',
 key:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/></svg>',
 eye:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
 bolt:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
 cards:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/></svg>'
};
/* ---------- durum ---------- */
const KEY='nefy-terazisi-v1';
const FRESH=()=>({v:1,xp:0,les:{},best:{},played:{},exams:[],tz:{f:0,e:'all'},snd:true,day:'',streak:0});
let S=FRESH();
try{const t=JSON.parse(localStorage.getItem(KEY)||'null');if(t&&t.v===1)S=Object.assign(S,t);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
(function streak(){const d=new Date().toISOString().slice(0,10);if(S.day===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();})();
const LEVELS=[[0,'Mübtedi'],[200,'Tâlib'],[600,'Mütefennin'],[1200,'Müdakkik'],[2200,'Muhakkik'],[3500,'Üstâd']];
function lvl(){let i=0;LEVELS.forEach((l,k)=>{if(S.xp>=l[0])i=k;});const cur=LEVELS[i][0],nx=LEVELS[i+1]?LEVELS[i+1][0]:cur+1;return {name:LEVELS[i][1],p:LEVELS[i+1]?(S.xp-cur)/(nx-cur):1};}
function hud(){const l=lvl();$('#lvlName').textContent=l.name;$('#lvlBar').style.width=Math.round(l.p*100)+'%';$('#xp').textContent=S.xp;}
function addXP(n){const b=lvl().name;S.xp+=n;save();hud();const a=lvl().name;if(a!==b){toast('Tebrikler! Yeni rütbe: '+a);confetti();}}
const lstar=id=>{const r=S.les[id];if(!r)return 0;return r.best>=1?3:r.best>=.6?2:1;};
let AC=null;
function beep(kind){if(!S.snd)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const seq=kind==='ok'?[[660,.07],[990,.1]]:kind==='no'?[[200,.16]]:kind==='win'?[[523,.08],[659,.08],[784,.08],[1046,.2]]:[[520,.04]];let t=AC.currentTime;seq.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=kind==='no'?'sawtooth':'sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.2,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.02);t+=d;});}catch(e){}}
function speak(t){sesPlay(t,null,toast);}
/* Liste hâlinde okuma: her parça kendi kaydıyla, sırayla */
let SEQ=0;
function speakSeq(list){const id=++SEQ;let k=0;const next=()=>{if(id!==SEQ||k>=list.length)return;sesPlay(list[k++],()=>setTimeout(next,250),k===1?toast:null);};next();}
let tT=0;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tT);tT=setTimeout(()=>t.hidden=true,2600);}
function confetti(){const c=$('#cf');c.hidden=false;const x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const cols=['#f2c867','#5fd3a0','#ffb454','#7fb2ff','#ff9f6e'];const P=Array.from({length:130},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*.5,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,s:3+Math.random()*5,r:Math.random()*6,c:pick(cols)}));let f=0;(function go(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=.1;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore();});if(++f<170)requestAnimationFrame(go);else c.hidden=true;})();}
const isDark=()=>document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
function themeBtn(){$('#thm').innerHTML=isDark()?ICON.sun:ICON.moon;}
try{const th=localStorage.getItem(KEY+'-theme');if(th)document.documentElement.dataset.theme=th;}catch(e){}
$('#thm').onclick=()=>{document.documentElement.dataset.theme=isDark()?'light':'dark';try{localStorage.setItem(KEY+'-theme',document.documentElement.dataset.theme);}catch(e){}themeBtn();};
function sndBtn(){$('#snd').innerHTML=S.snd?ICON.snd:ICON.mute;}
$('#snd').onclick=()=>{S.snd=!S.snd;save();sndBtn();};
function openSheet(html){$('#sheet').innerHTML=`<div class="sheet-bg"><div class="sheet" role="dialog" aria-modal="true">${html}</div></div>`;$('#sheet .sheet-bg').onclick=e=>{if(e.target.classList.contains('sheet-bg'))closeSheet();};$$('#sheet [data-close]').forEach(b=>b.onclick=closeSheet);$$('#sheet [data-say]').forEach(b=>b.onclick=()=>speak(b.dataset.say));}
function closeSheet(){$('#sheet').innerHTML='';}
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#sheet').innerHTML)closeSheet();});
const stars=(n,max=3)=>{let s='';for(let i=0;i<max;i++)s+=i<n?'★':'<span class="off">★</span>';return `<span class="stars" aria-label="${n} yıldız">${s}</span>`;};
const sayB=(t,cls='btn sm ghost')=>`<button class="${cls}" data-say="${esc(t)}" aria-label="Dinle">${ICON.play}</button>`;
const bindSay=(root=document)=>root.querySelectorAll('[data-say]').forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.say);});
const ekol=e=>`style="--c:${e.col}"`;
/* Programın gömülü sesle okuduğu metinler (ses_topla.mjs bu listeyi okur) */
function SES_LISTE(){
  const L=[];LESSONS.forEach(l=>{l.m.forEach(m=>L.push(m[1]));l.ex.forEach(x=>L.push(x[0]));});
  FIIL.forEach(v=>SIGA.forEach((_,i)=>{L.push(muz(v,i));EDAT.forEach(e=>L.push(edatli(v,i,e)));}));
  EDAT.forEach(e=>L.push(e.ar));L.push(...KARTLAR.map(k=>k.on));
  return [...new Set(L)];
}
/* ---------- yönlendirme ---------- */
const V={};let TIMERS=[];
function stopTimers(){TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);});TIMERS=[];SEQ++;}
function route(){
  stopTimers();
  const h=(location.hash||'#home').slice(1).split('/').map(decodeURIComponent);const v=h[0]||'home';
  const map={home:'home',dersler:'dersler',ders:'dersler',tezgah:'tezgah',oyun:'oyun',kart:'kart',sinav:'sinav',hakkinda:'hakkinda'};
  $$('#tabs a').forEach(a=>a.classList.toggle('on',a.dataset.v===(map[v]||'home')));
  (V[v]||V.home)(h.slice(1));
  app.classList.remove('view');void app.offsetWidth;app.classList.add('view');
  bindSay(app);window.scrollTo({top:0});
}
addEventListener('hashchange',route);
/* ===================== TERAZİ (ana sayfa) ===================== */
V.home=()=>{
  const done=LESSONS.filter(l=>S.les[l.id]).length;
  app.innerHTML=`<section class="hero">
    <div><div class="kufi">مِيزَانُ النَّفْيِ</div><h1>Nefy Terazisi</h1>
      <p class="muted">Emsile’deki beş olumsuz kalıp: <span class="ar">مَا يَنْصُرُ، لَا يَنْصُرُ، لَنْ يَنْصُرَ، لَمْ يَنْصُرْ، لَمَّا يَنْصُرْ</span>. Her birinin 14 sîgasını, mânâsını ve sonda neyin değiştiğini sâlim fiillerle çalış.</p>
      <div class="row" style="margin-top:12px"><a class="btn pri" href="#ders/${(LESSONS.find(l=>!S.les[l.id])||LESSONS[0]).id}">${done?'Kaldığın dersten devam':'Birinci derse başla'} ${ICON.arrow}</a><a class="btn" href="#tezgah">Tezgâh</a><a class="btn" href="#oyun">Oyunlar</a></div>
      <div class="stat"><div><b>${done}/${LESSONS.length}</b><span>ders</span></div><div><b>${FIIL.length}</b><span>sâlim fiil</span></div><div><b>${S.xp}</b><span>puan</span></div><div><b>${S.streak}</b><span>gün seri</span></div></div></div>
    <div class="card terazi"><div class="tz-top"><span class="muted small" id="tzSiga"></span><button class="btn sm ghost" id="tzNew" title="Başka fiil">↻ Başka fiil</button></div>
      <svg id="tzSvg" viewBox="0 0 360 230" role="img" aria-label="Terazi">
        <rect x="174" y="40" width="12" height="160" rx="5" fill="var(--line)"/><rect x="120" y="196" width="120" height="14" rx="7" fill="var(--line)"/>
        <circle cx="180" cy="40" r="9" fill="var(--gold)"/>
        <g id="tzBeam"><rect x="60" y="36" width="240" height="8" rx="4" fill="var(--gold)"/></g>
        <g id="tzL"><path d="M0 0 L-36 62 M0 0 L36 62" stroke="var(--muted)" stroke-width="1.5"/><path d="M-46 62 h92 a46 20 0 0 1 -92 0z" fill="var(--c-n)" opacity=".9"/><text y="100" text-anchor="middle" font-size="13" fill="var(--c-n)" font-weight="700">Üstün</text></g>
        <g id="tzR"><path d="M0 0 L-36 62 M0 0 L36 62" stroke="var(--muted)" stroke-width="1.5"/><path d="M-46 62 h92 a46 20 0 0 1 -92 0z" fill="var(--c-j)" opacity=".9"/><text y="100" text-anchor="middle" font-size="13" fill="var(--c-j)" font-weight="700">Cezm</text></g>
        <text x="180" y="24" text-anchor="middle" font-size="12" fill="var(--c-r)" font-weight="700" id="tzMid">Değişmez · denge</text>
      </svg>
      <div class="tz-word"><div class="ar" id="tzW"></div><div class="small muted" id="tzT"></div></div>
      <div class="tz-edat">${EDAT.map(e=>`<button class="btn" data-e="${e.id}" ${ekol(e)}><span class="ar">${e.ar}</span></button>`).join('')}<button class="btn ghost" data-e="">edatsız</button></div></div>
  </section>
  <div class="sec-h"><div><div class="eyebrow">الْأَمْثِلَةُ الْمُخْتَلِفَةُ</div><h2>Beş kalıp</h2></div></div>
  <div class="kefeler">${EDAT.map(e=>`<a class="kefe" href="#ders/${LESSONS.find(l=>l.e===e.id).id}" ${ekol(e)}>
    <div class="row" style="justify-content:space-between"><span class="ed ar">${e.ar}</span><span class="chip" style="color:${e.col}">${YAPI_AD[yapi(0,e.hal).k]}</span></div>
    <b>${e.isim}</b><div class="ar">${esc(edatli(FIIL[0],0,e))}</div><div class="small muted">${esc(trAnlam(FIIL[0],0,e.id))}</div></a>`).join('')}</div>
  <div class="sec-h"><div><div class="eyebrow">الدُّرُوسُ</div><h2>Dersler</h2></div><a class="btn sm" href="#dersler">Hepsi</a></div>
  ${dersListe()}`;
  let v=FIIL[0],i=0,cur='';
  const draw=()=>{const e=cur?edatOf(cur):null,hal=e?e.hal:'raf';const base=muz(v,i);
    $('#tzSiga').innerHTML=`${esc(v.mz)} · ${SIGA[i].tr} (${A(SIGA[i].z)})`;
    $('#tzW').innerHTML=e?`<span style="color:${e.col}">${esc(e.ar)}</span> `+farkBoya(base,cek(v,i,e.hal)):esc(base);
    $('#tzT').innerHTML=e?`${esc(trAnlam(v,i,e.id))} · ${esc(yapi(i,hal).t)}`:'Edatsız muzâri. Bir edat seç.';
    const k=yapi(i,hal).k;tilt(hal==='nasb'&&k!=='ayni'?-11:hal==='jazm'&&k!=='ayni'?11:0);$('#tzMid').style.opacity=k==='ayni'?1:.35;
    $$('.tz-edat [data-e]').forEach(b=>b.classList.toggle('pri',b.dataset.e===cur));};
  $$('.tz-edat [data-e]').forEach(b=>b.onclick=()=>{cur=b.dataset.e;draw();const e=cur?edatOf(cur):null;speak(e?edatli(v,i,e):muz(v,i));beep('tap');});
  $('#tzNew').onclick=()=>{v=pick(FIIL.filter(x=>x!==v));i=pick([0,1,2,3,5,6,8,9,12,13]);draw();};
  tiltNow=0;draw();
};
let tiltNow=0;
function tilt(to){const from=tiltNow;tiltNow=to;const t0=performance.now();
  const set=a=>{const r=a*Math.PI/180,c=Math.cos(r),s=Math.sin(r);$('#tzBeam')?.setAttribute('transform',`rotate(${a} 180 40)`);
    const L=[180-120*c,40-120*s],R=[180+120*c,40+120*s];$('#tzL')?.setAttribute('transform',`translate(${L[0]} ${L[1]})`);$('#tzR')?.setAttribute('transform',`translate(${R[0]} ${R[1]})`);};
  const go=now=>{const k=Math.min(1,(now-t0)/450),e=1-Math.pow(1-k,3);set(from+(to-from)*e);if(k<1&&$('#tzBeam'))requestAnimationFrame(go);};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)set(to);else requestAnimationFrame(go);}
/* ===================== DERSLER ===================== */
const lcol=l=>edatOf(l.e)?edatOf(l.e).col:'var(--gold)';
function dersListe(){return `<div class="lgrid">${LESSONS.map((l,k)=>`<a class="lcard" href="#ders/${l.id}" style="--c:${lcol(l)}">
  <div class="row" style="justify-content:space-between"><span class="num">${k+1}</span>${stars(lstar(l.id))}</div><b>${esc(l.t)}</b><div class="ar muted">${esc(l.ar)}</div></a>`).join('')}</div>`;}
V.dersler=a=>{if(a&&a[0])return V.ders(a);
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">الدُّرُوسُ</div><h2>Dersler</h2></div><span class="muted small">Her dersin sonunda kısa bir sınav var; 3 yıldız için hepsini bil.</span></div>${dersListe()}`;};
function dersCekim(L){
  const v=FIIL[0];
  if(L.e==='muz')return `<div class="tscroll">${tabloMuz(v)}</div>`;
  if(L.e==='all')return `<div class="tscroll">${tabloHepsi(v)}</div>`;
  if(edatOf(L.e))return `<div class="row" style="justify-content:flex-end;margin-bottom:8px"><button class="btn sm" id="dSay">${ICON.play} 14 sîgayı dinle</button></div><div class="tscroll">${tabloEdat(v,edatOf(L.e))}</div>`;
  return '';
}
V.ders=a=>{
  const k=LESSONS.findIndex(l=>l.id===a[0]);if(k<0)return V.dersler([]);const L=LESSONS[k],e=edatOf(L.e);
  if(!S.les[L.id]){S.les[L.id]={best:0};save();}
  const ck=dersCekim(L);
  app.innerHTML=`<a class="btn sm ghost" href="#dersler">${ICON.back} Dersler</a>
  <div class="lhead card" style="margin-top:10px;--c:${lcol(L)}"><div><div class="eyebrow">${k+1}. ders</div><h2>${esc(L.t)}</h2>${e?`<p class="small muted">${esc(e.d)}</p>`:''}</div><div class="big ar vbox">${esc(L.ar)}</div></div>
  <div class="matnler">${L.m.map(m=>`<div class="card matn"><div class="row" style="justify-content:space-between"><span class="chip gold">${esc(m[0])}</span>${sayB(m[1])}</div><p class="ar">${esc(m[1])}</p></div>`).join('')}</div>
  <div class="card serh">${AW(L.tr)}</div>
  ${ck?`<div class="sec-h"><div><div class="eyebrow">التَّصْرِيفُ</div><h3>Çekim: ${esc(FIIL[0].mz)} ${esc(muz(FIIL[0],0))}</h3></div><a class="btn sm" href="#tezgah/0/${e?e.id:'all'}">Başka fiille çek ${ICON.arrow}</a></div>${ck}`:''}
  <div class="sec-h"><div><div class="eyebrow">الْأَمْثِلَةُ</div><h3>Misaller</h3></div></div>
  <div class="ex">${L.ex.map(x=>`<div><span class="ar">${esc(x[0])}</span><span class="row small muted">${AW(esc(x[1]))}${sayB(x[0])}</span></div>`).join('')}</div>
  <div class="sec-h"><div><div class="eyebrow">اخْتِبَارٌ</div><h3>Dersin sınavı</h3></div>${stars(lstar(L.id))}</div>
  <div class="card stage" id="lq"></div>
  <div class="row" style="justify-content:space-between;margin-top:16px">${k>0?`<a class="btn" href="#ders/${LESSONS[k-1].id}">${ICON.back} Önceki</a>`:'<span></span>'}${k<LESSONS.length-1?`<a class="btn" href="#ders/${LESSONS[k+1].id}">Sonraki ${ICON.arrow}</a>`:'<a class="btn pri" href="#sinav">Genel sınav</a>'}</div>`;
  if($('#dSay'))$('#dSay').onclick=()=>speakSeq(SIGA.map((_,i)=>edatli(FIIL[0],i,e)));
  $$('.tbl [data-sig]').forEach(c=>c.onclick=()=>sigaDetay(FIIL[0],+c.dataset.sig));
  let n=0,sc=0;const qs=L.q.map(q=>{const o=shuffle(q[1].map((t,j)=>({t,ok:j===q[2]})));return {q:q[0],o,ex:q[3]};});
  const round=()=>{
    if(n>=qs.length){const r=sc/qs.length;const st=S.les[L.id];const first=r>(st.best||0);st.best=Math.max(st.best||0,r);save();if(first)addXP(Math.round(10*sc));
      $('#lq').innerHTML=`<div style="text-align:center"><div class="scorebig">${sc}/${qs.length}</div>${stars(lstar(L.id))}<p class="muted">${r===1?'Tam isabet!':'Yanlışları tekrar görmek için yeniden dene.'}</p><div class="row" style="justify-content:center"><button class="btn" id="re">Yeniden</button>${k<LESSONS.length-1?`<a class="btn pri" href="#ders/${LESSONS[k+1].id}">Sonraki ders</a>`:''}</div></div>`;
      if(r===1){beep('win');confetti();}$('#re').onclick=()=>{n=0;sc=0;round();};return;}
    const Q=qs[n++];
    $('#lq').innerHTML=`<div class="hud"><span class="small muted">Soru ${n}/${qs.length}</span><div class="pbar"><i style="width:${(n-1)/qs.length*100}%"></i></div></div><div class="q">${AW(esc(Q.q))}</div>
      <div class="opts">${Q.o.map((o,j)=>`<button class="${isAr(o.t)?'opt':'opt tr'}" data-j="${j}">${isAr(o.t)?esc(o.t):AW(esc(o.t))}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('#lq [data-j]').forEach(b=>b.onclick=()=>{const good=Q.o[+b.dataset.j].ok;$$('#lq [data-j]').forEach(x=>{x.disabled=true;if(Q.o[+x.dataset.j].ok)x.classList.add('ok');});if(good)sc++;else b.classList.add('no');beep(good?'ok':'no');
      $('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Doğrusu yeşil. ')+`<div class="small" style="font-weight:400">${AW(esc(Q.ex))}</div><button class="btn sm" id="nx" style="margin-top:8px">Devam ${ICON.arrow}</button>`;$('#nx').onclick=round;});
  };round();
};
/* ===================== TEZGÂH ===================== */
function fiilSec(id){
  if(String(id).startsWith('k-')){const [,r,mu]=String(id).split('-');const rr=rootOf(r);if(rr&&!checkRoot(rr))return {id,r:rr,mu:['u','i','a'].includes(mu)?mu:'u',mz:rr[0]+'َ'+rr[1]+'َ'+rr[2]+'َ',tr:'',ozel:true};}
  return FIIL[+id]||FIIL[0];
}
V.tezgah=a=>{
  const fid=a[0]!=null&&a[0]!==''?a[0]:S.tz.f, eid=edatOf(a[1])||a[1]==='all'?a[1]:(edatOf(S.tz.e)?S.tz.e:'all');const v=fiilSec(fid);S.tz={f:v.id,e:eid};save();
  const seg=[['all','Hepsi'],...EDAT.map(e=>[e.id,e.ar])];
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">التَّصْرِيفُ</div><h2>Tezgâh</h2></div><span class="muted small">Sâlim bir fiil ve bir edat seç; 14 sîga çekilsin.</span></div>
  <div class="card tz-ctl">
    <label class="small muted">Fiil<select id="fs" class="field">${FIIL.map(f=>`<option value="${f.id}" ${f.id===v.id?'selected':''}>${f.mz} ${muz(f,0)} — ${f.tr}</option>`).join('')}${v.ozel?`<option value="${esc(v.id)}" selected>Kendi kökün: ${v.r.join(' ')}</option>`:''}</select></label>
    <details ${v.ozel?'open':''}><summary class="small">Kendi sâlim kökünü yaz</summary><div class="row" style="margin-top:8px"><input id="kr" class="field ar" placeholder="ن ص ر" value="${v.ozel?v.r.join(' '):''}" style="width:120px"><select id="kv" class="field"><option value="u">يَفْعُلُ</option><option value="i">يَفْعِلُ</option><option value="a">يَفْعَلُ</option></select><button class="btn sm" id="kb">Çek</button><span class="small" id="km" style="color:var(--bad)"></span></div></details>
    <div class="seg" role="tablist">${seg.map(([id,t])=>`<button class="${id===eid?'on':''}" data-e="${id}" ${id!=='all'?ekol(edatOf(id)):''}><span class="${id==='all'?'':'ar'}">${t}</span></button>`).join('')}</div>
  </div>
  ${eid==='all'?`<p class="small muted" style="margin:12px 0 0"><span class="chg">Renkli kısım</span> edatın değiştirdiği sondur. Bir sîgaya dokun: beş kalıbı mânâlarıyla gör.</p>`:(()=>{const e=edatOf(eid);return `<div class="card" style="margin-top:12px;border-color:${e.col}"><h3><span class="ar" style="color:${e.col};font-size:1.4rem">${e.ar}</span> ${e.isim}</h3><p class="small">${esc(e.d)}</p><p class="small muted">${e.zaman} · Türkçe: <b>${esc(e.g)}</b></p><button class="btn sm" id="sayAll">${ICON.play} 14 sîgayı dinle</button></div>`;})()}
  <div class="tscroll" style="margin-top:14px">${eid==='all'?tabloHepsi(v):tabloEdat(v,edatOf(eid))}</div>`;
  $('#fs').onchange=e=>location.hash=`#tezgah/${encodeURIComponent(e.target.value)}/${eid}`;
  $$('.seg [data-e]').forEach(b=>b.onclick=()=>location.hash=`#tezgah/${encodeURIComponent(v.id)}/${b.dataset.e}`);
  if(v.ozel)$('#kv').value=v.mu;
  $('#kb').onclick=()=>{const r=rootOf($('#kr').value),m=checkRoot(r);if(m){$('#km').textContent=m;return;}location.hash=`#tezgah/${encodeURIComponent('k-'+r.join('')+'-'+$('#kv').value)}/${eid}`;};
  if($('#sayAll'))$('#sayAll').onclick=()=>speakSeq(SIGA.map((_,i)=>edatli(v,i,edatOf(eid))));
  $$('.tbl [data-sig]').forEach(c=>c.onclick=()=>sigaDetay(v,+c.dataset.sig));
};
const sigaHucre=(s,i)=>`<td class="sg"><button class="lk" data-sig="${i}"><span class="ar">${s.z}</span><small>${s.tr}</small></button></td>`;
function tabloMuz(v){
  return `<table class="tbl tz"><tr><th>Sîga</th><th>Muzâri</th><th>Sonu</th></tr>${SIGA.map((s,i)=>`<tr>${sigaHucre(s,i)}<td class="m">${esc(muz(v,i))} ${sayB(muz(v,i),'ib sm')}</td><td class="trc">${NISVE.includes(i)?'cem‘-i müennes nûnu':NUNLU.includes(i)?'nûn':'ötre'}</td></tr>`).join('')}</table>`;
}
function tabloEdat(v,e){
  return `<table class="tbl tz" style="--c:${e.col}"><tr><th>Sîga</th><th>Muzâri</th><th><span class="ar">${e.ar}</span>${e.isim}</th><th>Sona ne oldu?</th><th>Türkçe</th></tr>
  ${SIGA.map((s,i)=>{const b=muz(v,i),c=cek(v,i,e.hal),y=yapi(i,e.hal);return `<tr>${sigaHucre(s,i)}
    <td>${esc(b)}</td><td class="m"><span style="color:${e.col}">${e.ar}</span> ${farkBoya(b,c)} ${sayB(e.ar+' '+c,'ib sm')}</td>
    <td class="ir"><span class="tag t-${y.k}">${YAPI_AD[y.k]}</span><small>${esc(y.t)}</small></td><td class="trc">${esc(trAnlam(v,i,e.id))}</td></tr>`;}).join('')}</table>`;
}
function tabloHepsi(v){
  return `<table class="tbl tz hep"><tr><th>Sîga</th><th>Muzâri</th>${EDAT.map(e=>`<th style="--c:${e.col}"><span class="ar">${e.ar}</span>${e.isim}</th>`).join('')}</tr>
  ${SIGA.map((s,i)=>{const b=muz(v,i);return `<tr>${sigaHucre(s,i)}<td>${esc(b)}</td>${EDAT.map(e=>{const c=cek(v,i,e.hal);return `<td><button class="cellb" data-say="${esc(e.ar+' '+c)}">${farkBoya(b,c)}</button></td>`;}).join('')}</tr>`;}).join('')}</table>`;
}
function sigaDetay(v,i){
  const b=muz(v,i);
  openSheet(`<div class="row" style="justify-content:space-between"><h3>${SIGA[i].tr} <span class="ar muted">${SIGA[i].z}</span></h3><button class="btn sm ghost" data-close>Kapat</button></div><p class="small muted">${SIGA[i].k} · Muzâri: ${A(b)}</p>
  <div class="ex">${EDAT.map(e=>{const f=edatli(v,i,e);return `<div style="border-color:${e.col}"><span class="ar">${esc(f)}</span><span class="small" style="flex:1 1 200px"><b style="color:${e.col}">${e.isim}</b> · ${esc(trAnlam(v,i,e.id))}<br><span class="muted">${esc(yapi(i,e.hal).t)}</span></span>${sayB(f)}</div>`;}).join('')}</div>`);
}
/* ===================== SORU ÜRETİCİLER ===================== */
const SIG_ALL=[...Array(14).keys()];
function rastgele(){return {v:pick(FIIL),i:pick(SIG_ALL),e:pick(EDAT)};}
/* Yanlış şıklar: öteki sonlar ve sık yapılan hatalar */
function yanlislar(v,i,e){
  const dogru=cek(v,i,e.hal),out=new Set(),raf=cek(v,i,'raf');
  ['raf','nasb','jazm'].forEach(h=>out.add(cek(v,i,h)));
  if(NUNLU.includes(i)){out.add(raf.replace(/[َِ]$/,VW.o));out.add(raf+'ا');}
  else if(NISVE.includes(i)){out.add(raf.replace(/نَ$/,''));out.add(raf+'ا');}
  else out.add(raf.replace(/ُ$/,VW.i));
  out.delete(dogru);
  for(const j of shuffle(SIG_ALL)){if(out.size>=4)break;out.add(cek(v,j,e.hal));out.delete(dogru);}
  return [...out];
}
const GEN={
  cekim(){const {v,i,e}=rastgele(),d=edatli(v,i,e);const o=shuffle([d,...sample(yanlislar(v,i,e),3).map(w=>e.ar+' '+w)]);
    return {k:'cekim',html:`<p class="muted small" style="text-align:center;margin:0">${SIGA[i].tr} (${A(SIGA[i].z)}) · ${esc(v.mz)}</p><div class="qar"><span style="color:${e.col}">${e.ar}</span> + ${esc(muz(v,i))}</div>`,say:muz(v,i),o,a:o.indexOf(d),ex:`${A(d)} — ${esc(yapi(i,e.hal).t)}`};},
  mana(){const {v,i,e}=rastgele(),d=edatli(v,i,e);const all=EDAT.map(x=>trAnlam(v,i,x.id));const right=all[EDAT.indexOf(e)];const o=shuffle([right,...sample(all.filter(x=>x!==right),3)]);
    return {k:'mana',html:`<p class="muted small" style="text-align:center;margin:0">${esc(v.mz)}: ${esc(v.tr)} · ${SIGA[i].k}</p><div class="qar">${esc(d)}</div>`,say:d,o,a:o.indexOf(right),ex:`<b>${e.isim}</b> (${e.ar}): ${esc(e.g)}`};},
  edat(){const {v,i,e}=rastgele(),c=cek(v,i,e.hal);const o=EDAT.map(x=>x.ar);
    return {k:'edat',html:`<p class="muted small" style="text-align:center;margin:0">“${esc(trAnlam(v,i,e.id))}” · ${SIGA[i].k}</p><div class="qar"><span class="blank">؟</span> ${esc(c)}</div>`,o,a:EDAT.indexOf(e),cols:5,ex:`${A(e.ar+' '+c)} — ${e.isim}.`};},
  siga(){const {v,i,e}=rastgele(),d=edatli(v,i,e),f=cek(v,i,e.hal);const ayni=SIG_ALL.filter(j=>cek(v,j,e.hal)===f);const diger=sample(SIG_ALL.filter(j=>!ayni.includes(j)),3);const o=shuffle([i,...diger]);
    return {k:'siga',html:`<p class="muted small" style="text-align:center;margin:0">Bu çekim hangi sîga?</p><div class="qar">${esc(d)}</div>`,say:d,o:o.map(j=>SIGA[j].tr+' · '+SIGA[j].k),a:o.indexOf(i),cols:2,ex:`${esc(trAnlam(v,i,e.id))}`+(ayni.length>1?` · Aynı lafız: ${ayni.map(j=>SIGA[j].tr).join(' = ')}`:'')};},
  hata(){const {v,i,e}=rastgele(),d=edatli(v,i,e);const dogrular=new Set(SIG_ALL.map(j=>cek(v,j,e.hal)));const yan=yanlislar(v,i,e).filter(w=>!dogrular.has(w));const ok=Math.random()<.5||!yan.length;const w=ok?d:e.ar+' '+pick(yan);
    return {k:'hata',html:`<p class="muted small" style="text-align:center;margin:0">${SIGA[i].tr} (${A(SIGA[i].z)}) · ${esc(v.mz)}</p><div class="qar">${esc(w)}</div>`,say:ok?w:null,o:['Doğru','Yanlış'],a:ok?0:1,cols:2,ex:ok?'Doğru çekim.':`Doğrusu: ${A(d)}`};}
};
const GAMES=[
 {id:'cekim',t:'Doğru Çekim',d:'Edat ile muzâriyi birleştir; doğru çekimi seç.',ic:'scale'},
 {id:'mana',t:'Mânâ Avı',d:'Edatlı fiilin Türkçesini bul.',ic:'eye'},
 {id:'edat',t:'Edatı Bul',d:'Türkçesine ve fiilin sonuna bakıp boşluğa edatı koy.',ic:'key'},
 {id:'siga',t:'Sîgayı Bul',d:'Çekim hangi sîga: kim, kaç kişi, erkek mi kadın mı?',ic:'target'},
 {id:'hata',t:'Hata Avı',d:'60 saniye: çekim doğru mu yanlış mı?',ic:'bolt',sure:60}
];
/* ===================== OYUNLAR ===================== */
V.oyun=a=>{
  if(a&&a[0]&&GEN[a[0]])return oyna(GAMES.find(g=>g.id===a[0]));
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">الْأَلْعَابُ</div><h2>Oyunlar</h2></div><span class="muted small">Sorular ${FIIL.length} sâlim fiilden üretilir.</span></div>
  <div class="gcards">${GAMES.map(g=>`<a class="gcard" href="#oyun/${g.id}"><div class="ico">${ICON[g.ic]}</div><h3>${g.t}</h3><p class="small muted" style="margin:0">${g.d}</p><span class="small">En iyi: <b>${S.best[g.id]||0}</b></span></a>`).join('')}</div>`;
};
function oyna(G){
  app.innerHTML=`<a class="btn sm ghost" href="#oyun">${ICON.back} Oyunlar</a><div class="card stage" style="margin-top:10px"><div class="hud"><b>${G.t}</b><span class="small muted" id="gi"></span><div class="pbar"><i id="gp"></i></div></div><div id="gc"></div></div>`;
  let n=0,sc=0,seri=0,bitti=false;const N=G.sure?999:10,t0=Date.now();
  const end=()=>{if(bitti)return;bitti=true;stopTimers();S.played[G.id]=1;const yeni=sc>(S.best[G.id]||0);if(yeni)S.best[G.id]=sc;save();addXP(Math.round(sc/2));
    $('#gc').innerHTML=`<div style="text-align:center"><div class="scorebig">${sc}</div><p class="muted">${n} soruda ${sc} puan${yeni?' · yeni rekor!':''}</p><div class="row" style="justify-content:center"><button class="btn pri" id="re">Yeniden oyna</button><a class="btn" href="#oyun">Başka oyun</a></div></div>`;
    if(yeni&&sc>0){beep('win');confetti();}$('#re').onclick=()=>oyna(G);};
  if(G.sure)TIMERS.push(setInterval(()=>{const k=Math.max(0,G.sure-(Date.now()-t0)/1000);$('#gp').style.width=(k/G.sure*100)+'%';if(k<=0)end();},200));
  const round=()=>{if(bitti)return;if(n>=N)return end();const R=GEN[G.id]();n++;
    $('#gi').textContent=G.sure?`Puan ${sc}`:`${n}/${N} · Puan ${sc}`;if(!G.sure)$('#gp').style.width=((n-1)/N*100)+'%';
    $('#gc').innerHTML=`${R.html}${R.say?`<div style="text-align:center">${sayB(R.say,'btn sm')}</div>`:''}<div class="opts" style="${R.cols?`grid-template-columns:repeat(${R.cols},minmax(0,1fr))`:''}">${R.o.map((o,j)=>`<button class="${isAr(o)?'opt':'opt tr'}" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    bindSay($('#gc'));
    $$('#gc [data-j]').forEach(b=>b.onclick=()=>{const good=+b.dataset.j===R.a;$$('#gc [data-j]').forEach(x=>{x.disabled=true;if(+x.dataset.j===R.a)x.classList.add('ok');});
      if(good){seri++;sc+=10+Math.min(seri,5)*2;}else{b.classList.add('no');seri=0;}beep(good?'ok':'no');
      $('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Doğrusu yeşil. ')+`<div class="small" style="font-weight:400">${R.ex||''}</div>`;
      TIMERS.push(setTimeout(round,good?(G.sure?600:1200):(G.sure?1600:2600)));});
  };round();
}
/* ===================== KARTLAR ===================== */
const KARTLAR=[
 ...EDAT.map(e=>({on:edatli(FIIL[0],0,e),arka:`<b style="color:${e.col}">${e.ad} — ${e.isim}</b><br>${esc(e.d)}<br><span class="muted">${e.zaman} · ${esc(trAnlam(FIIL[0],0,e.id))}</span>`})),
 {on:"لَنْ يَنْصُرُوا",arka:"<b>Nûnlu sîga</b>: len gelince nûn düşer (يَنْصُرُونَ ← يَنْصُرُوا). Asla yardım etmeyecekler."},
 {on:"لَمْ تَنْصُرِي",arka:"<b>Müfred müennes muhâtaba</b>: lem gelince nûn düşer (تَنْصُرِينَ ← تَنْصُرِي). Yardım etmedin (kadın)."},
 {on:"لَمْ يَنْصُرْنَ",arka:"<b>Cem‘-i müennes</b>: nûnu düşmez; beş kalıpta da aynı kalır. Yardım etmediler (kadınlar)."},
 {on:"مَا يَنْصُرُونَ",arka:"<b>Mâ</b> sonu değiştirmez: nûn durur. Yardım etmiyorlar."},
 {on:"لَا تَنْصُرْ",arka:"<b>Nehy</b> (yasaklama), nefy değil: cezm eder. “Yardım etme!”"},
 {on:"لَنْ نَنْصُرَ",arka:"<b>Mütekellim ma‘a’l-gayr</b>: sonu üstün. Asla yardım etmeyeceğiz."},
 {on:"لَمَّا أَنْصُرْ",arka:"<b>Mütekellim vahde</b>: sonu cezm. Henüz yardım etmedim."},
 {on:"لَمَّا يَنْفَعْ عُمْرِي",arka:"<b>Lemmâ</b> (Avâmil): “Ömrüm henüz fayda vermedi.”"}
];
V.kart=()=>{
  let k=0,flip=false;const deck=KARTLAR.slice();
  const draw=()=>{const c=deck[k];app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">الْبِطَاقَاتُ</div><h2>Kartlar</h2></div><span class="muted small">${k+1}/${deck.length} · karta dokun, çevir</span></div>
    <div class="stage"><button class="fcard ${flip?'flip':''}" id="fc"><div class="ff ar">${esc(c.on)}</div><div class="fb2">${c.arka}</div></button>
    <div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="pv">${ICON.back}</button>${sayB(c.on,'btn')}<button class="btn" id="fl">Çevir</button><button class="btn" id="nx">${ICON.arrow}</button><button class="btn ghost" id="mx">Karıştır</button></div></div>`;
    bindSay(app);$('#fc').onclick=$('#fl').onclick=()=>{flip=!flip;draw();};$('#pv').onclick=()=>{k=(k+deck.length-1)%deck.length;flip=false;draw();};$('#nx').onclick=()=>{k=(k+1)%deck.length;flip=false;draw();};
    $('#mx').onclick=()=>{deck.sort(()=>Math.random()-.5);k=0;flip=false;draw();};};
  draw();
};
/* ===================== SINAV ===================== */
const KTR={cekim:'Çekim',mana:'Mânâ',edat:'Edat',siga:'Sîga',ders:'Ders bilgisi'};
V.sinav=a=>{
  if(a&&a[0]==='basla')return sinavBasla();
  const son=S.exams.slice(-5).reverse();
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">الِامْتِحَانُ</div><h2>Sınav</h2></div></div>
  <div class="card" style="max-width:720px"><p>20 soru: çekim, mânâ, edat, sîga ve derslerden bilgi. Sonunda konu konu dökümünü görürsün.</p><a class="btn pri" href="#sinav/basla">Sınavı başlat ${ICON.arrow}</a>
  ${son.length?`<h3 style="margin-top:16px">Son sınavlar</h3><ul class="small">${son.map(e=>`<li>${e.d}: <b>%${e.pct}</b></li>`).join('')}</ul>`:''}</div>`;
};
function sinavBasla(){
  const Q=[];['cekim','mana','edat','siga'].forEach(k=>{for(let j=0;j<4;j++)Q.push(GEN[k]());});
  sample(LESSONS.flatMap(l=>l.q),4).forEach(q=>{const o=shuffle(q[1]);Q.push({k:'ders',html:`<div class="q">${AW(esc(q[0]))}</div>`,o,a:o.indexOf(q[1][q[2]]),ex:AW(esc(q[3]))});});
  const sira=shuffle(Q),cev=[];let n=0;
  app.innerHTML=`<div class="card stage"><div class="hud"><b>Sınav</b><span class="small muted" id="gi"></span><div class="pbar"><i id="gp"></i></div></div><div id="gc"></div></div>`;
  const round=()=>{if(n>=sira.length)return sonuc();const R=sira[n];$('#gi').textContent=`${n+1}/${sira.length}`;$('#gp').style.width=(n/sira.length*100)+'%';
    $('#gc').innerHTML=`${R.html}<div class="opts" style="${R.cols?`grid-template-columns:repeat(${R.cols},minmax(0,1fr))`:''}">${R.o.map((o,j)=>`<button class="${isAr(o)?'opt':'opt tr'}" data-j="${j}">${esc(o)}</button>`).join('')}</div>`;
    $$('#gc [data-j]').forEach(b=>b.onclick=()=>{cev.push({R,j:+b.dataset.j});beep('tap');n++;round();});};
  const sonuc=()=>{const dog=cev.filter(c=>c.j===c.R.a).length,pct=Math.round(dog/cev.length*100);const d=new Date().toLocaleDateString('tr-TR');
    S.exams.push({d,pct});save();addXP(dog*3);if(pct>=90){beep('win');confetti();}
    const kat={};cev.forEach(c=>{const k=c.R.k;kat[k]=kat[k]||[0,0];kat[k][1]++;if(c.j===c.R.a)kat[k][0]++;});
    app.innerHTML=`<div class="card stage" style="text-align:center"><div class="eyebrow">نَتِيجَةٌ</div><div class="scorebig">%${pct}</div><p class="muted">${cev.length} sorudan ${dog} doğru · ${d}</p>
      <div class="counter">${Object.entries(kat).map(([k,[a,b]])=>`<div><b>${a}/${b}</b><span class="small muted">${KTR[k]}</span></div>`).join('')}</div>
      <div class="row noprint" style="justify-content:center;margin-top:14px"><a class="btn pri" href="#sinav/basla">Yeniden</a><button class="btn" id="pr">Yazdır / PDF</button></div></div>
      ${cev.some(c=>c.j!==c.R.a)?`<div class="sec-h"><h3>Yanlışlar</h3></div><div class="ex">${cev.filter(c=>c.j!==c.R.a).map(c=>`<div><span class="small" style="flex:1 1 260px">${c.R.html.replace(/<div class="qar">/,'<div class="ar" style="font-size:1.3rem">')}</span><span class="small">Senin: <s>${esc(c.R.o[c.j])}</s><br>Doğru: <b>${esc(c.R.o[c.R.a])}</b><br><span class="muted">${c.R.ex||''}</span></span></div>`).join('')}</div>`:''}`;
    $('#pr').onclick=()=>window.print();};
  round();
}
/* ===================== PROGRAM HAKKINDA ===================== */
V.hakkinda=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">عَنِ الْبَرْنَامَجِ</div><h2>Program hakkında</h2></div></div>
  <div class="card" style="text-align:center;padding:28px 18px">
    <div class="kufi" style="font-family:var(--f-kufi);font-size:2rem;color:var(--gold);direction:rtl">مِيزَانُ النَّفْيِ</div>
    <p style="margin-top:14px;font-size:1.05rem"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p>
    <p class="muted">Dayandığı metin: <i>Emsile</i> (Emsile-i Muttaride ve Emsile-i Muhtelife). Misaller Kur’ân ve <i>Avâmil</i>’den.</p>
    <p class="muted">© 2026 Hüseyin KAYA · İstifade edilmesi temennisiyle…</p></div>
  <div class="card" style="margin-top:14px"><h3>İçindekiler</h3><ul class="small" style="padding-inline-start:18px;margin:8px 0 0;line-height:1.8">
    <li><b>${LESSONS.length} ders</b>: muzârinin 14 sîgası ve beş olumsuz kalıp; her derste نَصَرَ ile 14 sîga çekim, misaller ve ${LESSONS.reduce((a,l)=>a+l.q.length,0)} soruluk ders sınavları</li>
    <li><b>Tezgâh</b>: ${FIIL.length} sâlim fiil veya kendi sâlim kökün; 14 sîga × 5 kalıp, sona ne olduğu ve Türkçe karşılık</li>
    <li><b>Terazi</b>: edat seçildikçe fiilin sonunun nasıl değiştiğini gösteren terazi</li>
    <li><b>${GAMES.length} oyun</b>, ${KARTLAR.length} kart ve 20 soruluk raporlu sınav</li></ul>
    <p class="small muted" style="margin-top:10px">Program tek bir dosyadır ve internet bağlantısı olmadan çalışır. Arapça okunuşlar programa gömülüdür. İlerlemeniz yalnızca bu cihazda saklanır.</p>
    <button class="btn sm" id="reset" style="margin-top:8px">İlerlemeyi sıfırla</button></div>`;
  $('#reset').onclick=()=>{if(confirm('Bütün ilerleme silinsin mi?')){const snd=S.snd;S=FRESH();S.snd=snd;save();hud();route();}};
};
/* ---------- başlat ---------- */
document.documentElement.lang='tr';
themeBtn();sndBtn();hud();route();
