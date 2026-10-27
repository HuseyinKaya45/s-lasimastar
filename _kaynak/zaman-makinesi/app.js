/* ===== Zaman Makinesi — uygulama ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);

/* ---------- İngilizce ses (cihazın İngilizce sesi; internet gerekmez) ---------- */
let EN_V=null;
function enVoice(){if(!('speechSynthesis' in window))return null;try{const vs=speechSynthesis.getVoices();return vs.find(v=>/^en[-_](GB|US)/i.test(v.lang)&&/natural|google|samantha|daniel|serena/i.test(v.name))||vs.find(v=>/^en[-_](GB|US)/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;}catch(e){return null;}}
if('speechSynthesis' in window){try{speechSynthesis.getVoices();speechSynthesis.addEventListener('voiceschanged',()=>{EN_V=enVoice();});}catch(e){}}
function say(t){
  const v=EN_V||enVoice();if(!v){toast('Cihazda İngilizce ses bulunamadı.');return;}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/[’‘]/g,"'"));u.lang=v.lang;u.voice=v;u.rate=.92;speechSynthesis.speak(u);}catch(e){}
}
const spk=t=>`<button class="spk" data-say="${esc(t)}" aria-label="Dinle" title="Dinle">▶</button>`;

/* ---------- durum ---------- */
const KEY='zaman-makinesi-v1';
const FRESH=()=>({v:1,xp:0,un:{},best:{tense:0,dy:0,order:0,race:0,match:0,sinav:0},known:{},day:'',streak:0});
let S=FRESH();
try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)S=Object.assign(FRESH(),o,{best:Object.assign(FRESH().best,o.best||{})});}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
(function(){const d=new Date().toISOString().slice(0,10);if(S.day!==d){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();}})();
const LEVELS=[[0,'Starter'],[60,'Elementary'],[160,'Pre-intermediate'],[320,'Intermediate'],[520,'Upper-intermediate'],[800,'Advanced'],[1150,'Time Master']];
function lvl(){let i=0;LEVELS.forEach((l,j)=>{if(S.xp>=l[0])i=j;});const nx=LEVELS[i+1];return{i,name:LEVELS[i][1],pct:nx?(S.xp-LEVELS[i][0])/(nx[0]-LEVELS[i][0])*100:100};}
function hud(){const l=lvl();$('#lvlName').textContent=l.name;$('#lvlBar').style.width=l.pct+'%';$('#xp').textContent=S.xp;}
function addXP(n){const a=lvl().i;S.xp+=n;save();hud();if(lvl().i>a){toast('Yeni seviye: '+lvl().name+' ✦');confetti();}}
let tT;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tT);tT=setTimeout(()=>t.hidden=true,2600);}
function confetti(){
  const cv=$('#cf'),x=cv.getContext('2d');cv.hidden=false;cv.width=innerWidth;cv.height=innerHeight;
  const cs=['#7fb2ff','#5ec4b0','#e8a05c','#ff8a7a','#b9a0ff'],P=Array.from({length:120},()=>({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.4,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,r:3+Math.random()*4,c:cs[Math.floor(Math.random()*cs.length)],a:Math.random()*6}));
  let f=0;(function tick(){x.clearRect(0,0,cv.width,cv.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.a+=.1;x.fillStyle=p.c;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore();});if(++f<150)requestAnimationFrame(tick);else{x.clearRect(0,0,cv.width,cv.height);cv.hidden=true;}})();
}
(function(){let t=null;try{t=localStorage.getItem(KEY+'-tema');}catch(e){}if(t)document.documentElement.dataset.theme=t;
  $('#themeB').onclick=()=>{const cur=document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');const n=cur==='dark'?'light':'dark';document.documentElement.dataset.theme=n;try{localStorage.setItem(KEY+'-tema',n);}catch(e){}};})();

/* ---------- cevap denetimi ---------- */
const clean=s=>String(s).toLowerCase().replace(/[’‘`´]/g,"'").replace(/[.!?,]/g,' ').replace(/\s+/g,' ').trim();
function variants(s){
  s=clean(s).replace(/\bwon't\b/g,'will not').replace(/\bcan't\b/g,'cannot').replace(/n't\b/g,' not').replace(/'m\b/g,' am').replace(/'re\b/g,' are').replace(/'ve\b/g,' have').replace(/'ll\b/g,' will').replace(/'d\b/g,' had');
  const n=x=>x.replace(/\s+/g,' ').trim(),out=new Set();if(/'s\b/.test(s)){out.add(n(s.replace(/'s\b/g,' is')));out.add(n(s.replace(/'s\b/g,' has')));}else out.add(n(s));
  return out;
}
function matches(inp,answers){const iv=variants(inp);return answers.some(a=>[...variants(a)].some(v=>iv.has(v)));}
const words=s=>clean(s).split(' ').filter(Boolean);

/* ---------- ortak ---------- */
const uDone=()=>UNITS.filter(u=>S.un[u.n]).length;
const starSum=()=>UNITS.reduce((a,u)=>a+((S.un[u.n]||{}).s||0),0);
const stars=n=>`<span class="stars" aria-label="${n} yıldız">${'★'.repeat(n)}<span class="off">${'★'.repeat(3-n)}</span></span>`;
const partOfU=n=>PARTS.find(p=>p.u.includes(n));
const BADGES=[
 ['🌱','İlk ünite',()=>uDone()>=1],['⏱️','Şimdiki zamanlar',()=>[1,2,3,4].every(n=>S.un[n])],['📜','Geçmiş',()=>[5,6].every(n=>S.un[n])],
 ['🔗','Perfect ustası',()=>[7,8,9,10,11,12,13,14].every(n=>S.un[n])],['🚀','Gelecek',()=>[19,20,21,22,23,24,25].every(n=>S.un[n])],['🏁','25 ünite',()=>uDone()===UNITS.length],
 ['⭐','75 yıldız',()=>starSum()===UNITS.length*3],['🏎️','Fiil yarışı 20+',()=>S.best.race>=20],['🎯','Zaman avcısı',()=>S.best.tense>=10],
 ['🎓','Sınav 90+',()=>S.best.sinav>=90],['📚','50 kelime',()=>Object.keys(S.known).length>=50],['🔥','3 gün seri',()=>S.streak>=3]
];
const clockSVG=()=>`<svg viewBox="0 0 300 300" role="img" aria-label="Zaman makinesi saati"><circle cx="150" cy="150" r="128" fill="var(--panel2)" stroke="var(--gold)" stroke-width="6"/>
 ${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<line x1="${150+105*Math.sin(a)}" y1="${150-105*Math.cos(a)}" x2="${150+118*Math.sin(a)}" y2="${150-118*Math.cos(a)}" stroke="var(--muted)" stroke-width="${i%3?2:5}" stroke-linecap="round"/>`;}).join('')}
 <text x="150" y="80" text-anchor="middle" font-size="17" font-weight="700" fill="var(--p2)">NOW</text><text x="80" y="214" text-anchor="middle" font-size="15" font-weight="700" fill="var(--p1)">PAST</text><text x="222" y="214" text-anchor="middle" font-size="15" font-weight="700" fill="var(--p3)">FUTURE</text>
 <g id="hh"><line x1="150" y1="150" x2="150" y2="88" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/></g><g id="mh"><line x1="150" y1="150" x2="150" y2="54" stroke="var(--gold)" stroke-width="4" stroke-linecap="round"/></g><circle cx="150" cy="150" r="9" fill="var(--gold)"/></svg>`;
let clkT;function spin(){clearInterval(clkT);let a=0;const h=$('#hh'),m=$('#mh');if(!h)return;clkT=setInterval(()=>{if(!document.body.contains(h))return clearInterval(clkT);a+=6;m.setAttribute('transform',`rotate(${a} 150 150)`);h.setAttribute('transform',`rotate(${a/12} 150 150)`);},50);}

/* ---------- görünümler ---------- */
const V={};
V.home=()=>{
  const nx=UNITS.find(u=>!S.un[u.n])||UNITS[0];
  return `<section class="hero view"><div><p class="eyebrow">English Grammar · Units 1–${UNITS.length}</p><h1>Zaman Makinesi</h1>
   <p class="big2" style="color:var(--gold)">Present · Past · Perfect · Future</p>
   <p class="muted">İngilizcenin zamanlarını adım adım öğren: her ünitede Türkçe anlatım, sesli örnek cümleler, zaman çizgisi ve alıştırmalar. Fiil Atölyesi’nde istediğin fiili istediğin zamanda çek, oyunlarla ve kelime kartlarıyla pekiştir.</p>
   <div class="row" style="margin-top:14px"><a class="btn pri" href="#unite/${nx.n}">${uDone()?'Kaldığın yerden devam':'Unit 1’e başla'} →</a><a class="btn" href="#lab">Fiil Atölyesi</a></div>
   <div class="stat"><div><b>${uDone()}/${UNITS.length}</b><span>ünite</span></div><div><b>${starSum()}</b><span>yıldız</span></div><div><b>${S.xp}</b><span>puan</span></div><div><b>${Object.keys(S.known).length}</b><span>bilinen kelime</span></div><div><b>${S.streak}</b><span>gün seri</span></div></div></div>
   <div class="scalebox">${clockSVG()}</div></section>
  <h2 class="sec-h">Zamanlar haritası</h2><p class="muted small">Bir zamana dokun: o zamanın ünitesine gidersin.</p>
  <div class="grid g3">${TENSES.map(t=>`<a class="gcard" href="#unite/${t.u}"><b>${t.ad}</b><p class="small muted">${t.tr}</p><div class="tl">${tlSVG(t.k)}</div><p class="small"><b>${conjText(conj(t.k,'I','work','+',true))}</b></p></a>`).join('')}</div>
  <h2 class="sec-h">Rozetler</h2><div class="bgrid">${BADGES.map(b=>`<div><span class="badge ${b[2]()?'on':''}">${b[2]()?b[0]:'🔒'}</span><div class="small">${b[1]}</div></div>`).join('')}</div>`;
};
V.yol=()=>`<div class="view"><h1>Üniteler</h1><p class="muted">Her ünitede anlatım, örnekler, sık yapılan hatalar ve 6–8 soruluk alıştırma var. Alıştırmayı tam doğru bitirirsen üç yıldız.</p>
 ${PARTS.map(p=>`<div class="part"><b style="color:${p.c}">${p.p}. ${p.t}</b><span class="muted">${p.en}</span></div><div class="path">${p.u.map(n=>{const u=UNITS[n-1],r=S.un[n];return `<a class="stop ${r?'done':''}" href="#unite/${n}" style="--c:${p.c}"><span class="n">${r?'✓':n}</span><span class="t"><b>Unit ${n} · ${u.t} <span class="muted">(${u.f})</span></b><span>${u.tr}</span></span>${stars(r?r.s:0)}</a>`;}).join('')}</div>`).join('')}</div>`;

let QZ=null;
V.unite=a=>{
  const n=Math.min(UNITS.length,Math.max(1,+a||1)),u=UNITS[n-1],p=partOfU(n),pv=UNITS[n-2],nx=UNITS[n];
  QZ={u,i:0,ok:0,items:shuffle(u.q),done:false};setTimeout(qShow,0);
  return `<article class="card view" style="--c:${p.c}">
   <div class="lhead"><div><p class="eyebrow" style="color:${p.c}">Unit ${n} · ${p.t}</p><h1>${u.t} <span class="muted">(${u.f})</span></h1><p class="muted">${u.tr}</p></div>${u.k?`<a class="btn sm" href="#lab/${u.k}">Fiil Atölyesi’nde dene →</a>`:''}</div>
   ${u.k?`<div class="tl">${tlSVG(u.k)}</div>`:''}
   <div class="lbody">${u.s.map(s=>`<h3 class="sec-h">${s.h}</h3><p>${s.b}</p>${s.f?`<div class="formula">${s.f.map(x=>typeof x==='string'?`<span>${x}</span>`:`<span class="k">${x.k}</span>`).join('')}</div>`:''}
     ${(s.ex||[]).map(e=>`<div class="ex">${spk(e[0])}<span class="en">${e[0]}</span><span class="tr">${e[1]}</span></div>`).join('')}`).join('')}
    ${u.tip.length?`<div class="keybox"><h3>Dikkat! Sık yapılan hatalar</h3>${u.tip.map(t=>`<p><span class="wrong">${t[0]}</span> → <span class="rightc">${t[1]}</span><br><span class="small muted">${t[2]}</span></p>`).join('')}</div>`:''}</div>
   <h2 class="sec-h">Alıştırma ${S.un[n]?stars(S.un[n].s):''}</h2><div id="qz"></div>
   <div class="row" style="justify-content:space-between;margin-top:16px">${pv?`<a class="btn ghost" href="#unite/${pv.n}">← Unit ${pv.n}</a>`:'<span></span>'}${nx?`<a class="btn ghost" href="#unite/${nx.n}">Unit ${nx.n} →</a>`:`<a class="btn ghost" href="#sinav">Sınava geç →</a>`}</div></article>`;
};
/* bir soruyu #qz benzeri kutuya çizer; cb(doğru mu) */
function renderQ(box,q,cb){
  const t=q[0];
  if(t==='c'){
    const o=shuffle(q[2].map((x,j)=>({x,c:j===q[3]})));
    box.innerHTML=`<p class="qt">${q[1]}</p><div class="opts">${o.map((x,j)=>`<button class="opt" data-j="${j}">${x.x}</button>`).join('')}</div><div class="qw"></div>`;
    $$('.opt',box).forEach(b=>b.onclick=()=>{const ok=o[+b.dataset.j].c;$$('.opt',box).forEach((x,j)=>{x.disabled=true;if(o[j].c)x.classList.add('ok');});if(!ok)b.classList.add('no');
      const full=q[1].replace('___',o.find(x=>x.c).x);$('.qw',box).innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${q[4]} ${spk(full)}</p>`;cb(ok);});
  }else if(t==='f'){
    box.innerHTML=`<p class="qt">${q[1].replace('___','<b style="color:var(--gold)">_____</b>')}</p><div class="fillin"><input class="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Cevabını yaz…"><button class="btn pri">Kontrol</button></div><div class="qw"></div>`;
    const inp=$('input',box),b=$('button',box);setTimeout(()=>inp.focus(),30);
    const go=()=>{if(!inp.value.trim())return;const ok=matches(inp.value,q[2]);inp.disabled=b.disabled=true;inp.style.borderColor=ok?'var(--good)':'var(--bad)';
      const full=q[1].replace(/___/,q[2][0]).replace(/\s*\([^)]*\)/,'');$('.qw',box).innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> Cevap: <b>${q[2][0]}</b> — ${q[3]} ${spk(full)}</p>`;cb(ok);};
    b.onclick=go;inp.onkeydown=e=>{if(e.key==='Enter')go();};
  }else{
    const pool=shuffle(q[1].map((w,i)=>({w,i}))),pick=[];
    box.innerHTML=`<p class="qt">Kelimeleri sıraya diz: <span class="muted">“${q[3]}”</span></p><div class="order"></div><div class="pills"></div><div class="row" style="margin-top:8px"><button class="btn pri">Kontrol</button><button class="btn ghost sm">Temizle</button></div><div class="qw"></div>`;
    const ord=$('.order',box),pl=$('.pills',box),[bk,bc]=$$('button.btn',box);
    const draw=()=>{ord.innerHTML=pick.map((x,k)=>`<button class="pill on" data-k="${k}">${x.w}</button>`).join('');pl.innerHTML=pool.filter(x=>!pick.includes(x)).map(x=>`<button class="pill" data-i="${x.i}">${x.w}</button>`).join('');
      $$('[data-i]',pl).forEach(b=>b.onclick=()=>{pick.push(pool.find(x=>x.i===+b.dataset.i));draw();});$$('[data-k]',ord).forEach(b=>b.onclick=()=>{pick.splice(+b.dataset.k,1);draw();});};
    draw();bc.onclick=()=>{pick.length=0;draw();};
    bk.onclick=()=>{if(pick.length<q[1].length)return toast('Bütün kelimeleri kullan.');const ok=words(pick.map(x=>x.w).join(' ')).join(' ')===words(q[2]).join(' ');bk.disabled=bc.disabled=true;$$('.pill',box).forEach(x=>x.disabled=true);
      $('.qw',box).innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${q[2]} ${spk(q[2])}</p>`;cb(ok);};
  }
}
function qShow(){
  const z=$('#qz');if(!z||!QZ)return;const n=QZ.items.length;
  if(QZ.i>=n){
    const s=QZ.ok===n?3:QZ.ok>=Math.ceil(n*.7)?2:1,old=S.un[QZ.u.n];if(!old||s>old.s)S.un[QZ.u.n]={s};save();if(!old)addXP(15);
    const nx=UNITS[QZ.u.n];
    z.innerHTML=`<div class="q" style="text-align:center"><div style="font-size:2rem">${stars(s)}</div><p class="big2">${QZ.ok}/${n} doğru</p><p class="muted">${s===3?'Mükemmel! Bu ünite tamam.':s===2?'Güzel. Üç yıldız için tekrar dene.':'Anlatımı bir kez daha okuyup yeniden dene.'}</p><div class="row" style="justify-content:center"><button class="btn" id="qAgain">Yeniden dene</button>${nx?`<a class="btn pri" href="#unite/${nx.n}">Unit ${nx.n} →</a>`:'<a class="btn pri" href="#sinav">Sınava gir →</a>'}</div></div>`;
    if(s===3)confetti();$('#qAgain').onclick=()=>{QZ.i=0;QZ.ok=0;QZ.items=shuffle(QZ.items);qShow();};return;
  }
  z.innerHTML=`<div class="q"><div class="prog"><i style="width:${QZ.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${QZ.i+1}/${n}</p><div id="qb"></div><div id="qn"></div></div>`;
  renderQ($('#qb'),QZ.items[QZ.i],ok=>{if(ok){QZ.ok++;addXP(3);}$('#qn').innerHTML=`<button class="btn pri sm" style="margin-top:8px">${QZ.i+1<n?'Sonraki soru':'Sonucu gör'}</button>`;const b=$('#qn button');b.onclick=()=>{QZ.i++;qShow();};b.focus();});
}

/* ---------- Fiil Atölyesi ---------- */
const COMMON=['work','play','study','live','watch','cook','visit','travel','stop','try','wait','open','listen','start','finish','help','talk','walk','rain','snow','enjoy','arrive','stay','plan','cry','dance','use','learn','call','clean'];
const STATE=['like','love','hate','want','need','prefer','know','realise','understand','recognise','believe','suppose','remember','mean','belong','fit','contain','consist','seem'];
let L={t:'pc',s:'he',v:'work',f:'+',c:true,all:false};
try{const o=JSON.parse(localStorage.getItem(KEY+'-lab')||'null');if(o)L=Object.assign(L,o);}catch(e){}
V.lab=a=>{if(a&&TENSE[a])L.t=a;setTimeout(labDraw,0);return `<div class="view"><h1>Fiil Atölyesi</h1><p class="muted">Bir zaman, bir özne ve bir fiil seç: makine cümleyi kursun. Düzensiz fiiller, -ing / -s / -ed yazım kuralları ve kısaltmalar otomatik.</p>
 <div class="calc"><div class="card">
  <h3 class="sec-h" style="margin-top:0">Zaman</h3><div class="pills" id="lt">${TENSES.map(t=>`<button class="pill" data-t="${t.k}">${t.ad}</button>`).join('')}</div>
  <h3 class="sec-h">Özne</h3><div class="pills" id="ls">${SUBJ.map(s=>`<button class="pill" data-s="${s}">${s}</button>`).join('')}</div>
  <h3 class="sec-h">Fiil</h3><input class="inp" id="lv" list="vl" value="${esc(L.v)}" autocapitalize="off" spellcheck="false"><datalist id="vl">${[...IRR.map(x=>x[0]),...COMMON].sort().map(v=>`<option value="${v}">`).join('')}</datalist>
  <div class="pills" style="margin-top:8px">${sample([...IRR.map(x=>x[0]),...COMMON],8).map(v=>`<button class="pill" data-v="${v}">${v}</button>`).join('')}</div>
  <h3 class="sec-h">Biçim</h3><div class="tg" id="lf"><button data-f="+">Olumlu</button><button data-f="-">Olumsuz</button><button data-f="?">Soru</button></div>
  <div class="tg" id="lc" style="margin-inline-start:8px"><button data-c="1">Kısaltma</button><button data-c="0">Uzun</button></div>
 </div><div class="card" id="lo"></div></div></div>`;};
function labDraw(){
  const o=$('#lo');if(!o)return;try{localStorage.setItem(KEY+'-lab',JSON.stringify(L));}catch(e){}
  $$('#lt .pill').forEach(b=>b.classList.toggle('on',b.dataset.t===L.t));$$('#ls .pill').forEach(b=>b.classList.toggle('on',b.dataset.s===L.s));
  $$('#lf button').forEach(b=>b.classList.toggle('on',b.dataset.f===L.f));$$('#lc button').forEach(b=>b.classList.toggle('on',(b.dataset.c==='1')===L.c));
  const v=(L.v||'').trim().toLowerCase();
  if(!/^[a-z]+$/.test(v)){o.innerHTML='<p class="muted">Geçerli bir İngilizce fiil yaz (ör. play, go, study).</p>';return;}
  const T=TENSE[L.t],p=conj(L.t,L.s,v,L.f,L.c),txt=conjText(p)+(L.f==='?'?'?':'.');
  const irr=IRRM[v];
  const notes=[];
  if(['pc','pac','ppc','papc'].includes(L.t)&&ing(v)!==v+'ing')notes.push(`-ing yazımı: <b>${v} → ${ing(v)}</b> ${/ie$/.test(v)?'(ie → y)':/e$/.test(v)?'(sondaki e düşer)':'(son ünsüz çiftlenir)'}`);
  if(L.t==='ps'&&L.f==='+'&&third(L.s)&&s3(v)!==v+'s')notes.push(`He/she/it: <b>${v} → ${s3(v)}</b>`);
  if(['pas','pp','pap'].includes(L.t)&&irr)notes.push(`Düzensiz fiil: <b>${irr[0]} – ${irr[1]} – ${irr[2]}</b> (${irr[3]})`);
  else if(['pas','pp','pap'].includes(L.t)&&ed(v)!==v+'ed'&&ed(v)!==v+'d')notes.push(`-ed yazımı: <b>${v} → ${ed(v)}</b>`);
  if(['pc','pac','ppc','papc'].includes(L.t)&&STATE.includes(v))notes.push('⚠ Bu bir <b>durum fiili</b>; normalde continuous kullanılmaz (Unit 4).');
  o.innerHTML=`<p class="eyebrow">${T.ad} · ${T.tr}</p><div class="conj">${p.map(x=>`<span class="${x[0]}">${esc(x[1])}</span>`).join(' ').replace(/ <span class="(\w)">'/g,'<span class="$1">\'')}${L.f==='?'?'?':'.'} ${spk(txt)}</div>
   <div class="tl">${tlSVG(L.t)}</div>${notes.map(n=>`<p class="small">• ${n}</p>`).join('')}
   <p class="small muted">Renkler: <span style="color:var(--p3)">özne</span> · <span style="color:var(--p6)">yardımcı fiil</span> · <span style="color:var(--p2)">ana fiil</span>${irr?` · Türkçesi: <b>${irr[3]}</b>`:''}</p>
   <details class="more" ${L.all?'open':''} id="lall"><summary>Bütün öznelerle tablo</summary><div class="tblw"><table class="tbl vtab"><tr><th>Özne</th><th>Olumlu</th><th>Olumsuz</th><th>Soru</th></tr>${SUBJ.map(s=>`<tr><td><b>${s}</b> <span class="muted small">${SUBJ_TR[s]}</span></td>${['+','-','?'].map(f=>`<td>${esc(conjText(conj(L.t,s,v,f,L.c)))}${f==='?'?'?':''}</td>`).join('')}</tr>`).join('')}</table></div></details>
   <p style="margin-top:10px"><a class="btn sm" href="#unite/${T.u}">Unit ${T.u}: ${T.ad} anlatımı →</a></p>`;
  $('#lall').ontoggle=e=>{L.all=e.target.open;};
}
document.addEventListener('click',e=>{
  const b=e.target.closest('#lt .pill,#ls .pill,#lf button,#lc button,.pill[data-v]');if(!b||!$('#lo'))return;
  if(b.dataset.t)L.t=b.dataset.t;if(b.dataset.s)L.s=b.dataset.s;if(b.dataset.f)L.f=b.dataset.f;if(b.dataset.c)L.c=b.dataset.c==='1';if(b.dataset.v){L.v=b.dataset.v;$('#lv').value=L.v;}
  labDraw();
});
document.addEventListener('input',e=>{if(e.target.id==='lv'){L.v=e.target.value;labDraw();}});

/* ---------- Kelimeler ---------- */
let KT='irr',KC={i:0,list:null};
V.kelime=a=>{if(a)KT=a;setTimeout(kDraw,0);return `<div class="view"><h1>Kelimeler</h1><p class="muted">Düzensiz fiiller ve ünitelerde geçen kelime grupları. ▶ ile dinle, kartlarla ezberle; “biliyorum” dediklerin sayılır.</p>
 <div class="tg" id="kt"><button data-k="irr">Düzensiz fiiller</button><button data-k="grp">Kelime grupları</button><button data-k="fc">Kartlar</button></div><div id="kb" style="margin-top:14px"></div></div>`;};
const ALLW=()=>[...IRR.map(x=>({en:x[0]+' – '+x[1]+' – '+x[2],say:x[0]+', '+x[1].replace('/',', ')+', '+x[2],tr:x[3],ex:'',id:'v:'+x[0]})),...VOCAB.flatMap(g=>g.w.map(w=>({en:w[0],say:w[0],tr:w[1],ex:w[2],id:'w:'+w[0]})))];
function kDraw(){
  const z=$('#kb');if(!z)return;$$('#kt button').forEach(b=>b.classList.toggle('on',b.dataset.k===KT));
  if(KT==='irr'){
    z.innerHTML=`<input class="inp" id="kq" placeholder="Ara: fiil ya da Türkçesi…"><div class="tblw" style="margin-top:10px"><table class="tbl" id="kirr"><tr><th></th><th>V1</th><th>V2 (past)</th><th>V3 (participle)</th><th>Türkçe</th></tr>${IRR.map(x=>`<tr data-q="${esc((x.join(' ')).toLowerCase())}"><td>${spk(x[0]+', '+x[1].replace('/',', ')+', '+x[2])}</td><td><b>${x[0]}</b></td><td>${x[1]}</td><td>${x[2]}</td><td class="muted">${x[3]}</td></tr>`).join('')}</table></div>`;
    $('#kq').oninput=e=>{const q=e.target.value.toLowerCase().trim();$$('#kirr tr[data-q]').forEach(r=>r.hidden=q&&!r.dataset.q.includes(q));};
  }else if(KT==='grp'){
    z.innerHTML=VOCAB.map(g=>`<div class="card" style="margin-bottom:12px"><div class="row" style="justify-content:space-between"><h3 class="sec-h" style="margin:0">${g.t}</h3><a class="small" href="#unite/${g.u}">Unit ${g.u}</a></div>${g.w.map(w=>`<div class="ex">${spk(w[0])}<span class="en"><b>${w[0]}</b> — ${w[1]}</span><span class="tr"><i>${w[2]}</i> ${spk(w[2])}</span></div>`).join('')}</div>`).join('');
  }else{
    const A=ALLW();if(!KC.list)KC.list=shuffle(A.map((_,i)=>i));const t=A[KC.list[KC.i%KC.list.length]],kn=Object.keys(S.known).length;
    z.innerHTML=`<p class="small muted" style="text-align:center">Kart ${KC.i%KC.list.length+1}/${A.length} · Bilinen ${kn}</p>
     <div class="fc" id="fc"><div class="in"><div class="sd"><b class="big2" style="font-size:1.6rem">${t.en}</b><span class="tiny muted" style="margin-top:10px">çevirmek için dokun</span></div><div class="sd bk"><b class="big2">${t.tr}</b>${t.ex?`<p style="margin-top:8px"><i>${t.ex}</i></p>`:''}</div></div></div>
     <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="kp">←</button>${spk(t.say)}<button class="btn ${S.known[t.id]?'pri':''}" id="kk">${S.known[t.id]?'✓ Biliyorum':'Biliyorum'}</button><button class="btn" id="kn">→</button></div>`;
    $('#fc').onclick=()=>$('#fc').classList.toggle('f');
    $('#kp').onclick=()=>{KC.i=(KC.i-1+KC.list.length)%KC.list.length;kDraw();};$('#kn').onclick=()=>{KC.i=(KC.i+1)%KC.list.length;kDraw();};
    $('#kk').onclick=()=>{if(S.known[t.id])delete S.known[t.id];else{S.known[t.id]=1;addXP(1);}save();KC.i=(KC.i+1)%KC.list.length;kDraw();};
  }
}
document.addEventListener('click',e=>{const b=e.target.closest('#kt button');if(b){KT=b.dataset.k;kDraw();}});

/* ---------- Oyunlar ---------- */
const GAMES=[['tense','🕰️','Hangi zaman?','Cümleyi oku, hangi zamanda olduğunu bul.'],['dy','✅','Doğru mu, yanlış mı?','Cümle doğru mu? Yanlışsa düzeltmesini gör.'],['order','🧩','Cümle Kur','Karışık kelimeleri doğru sıraya diz.'],['race','🏎️','Fiil Yarışı','60 saniyede düzensiz fiillerin V2/V3’ünü yaz.'],['match','🔗','Eşleştir','İngilizce kelimeyi Türkçesiyle buluştur.']];
V.oyun=sub=>{
  if(sub&&G[sub]){setTimeout(()=>G[sub](),0);return `<div class="view"><div class="row" style="justify-content:space-between"><a class="btn ghost sm" href="#oyun">← Oyunlar</a><span class="chip gold" id="gsc"></span></div><div id="game" style="margin-top:12px"></div></div>`;}
  return `<div class="view"><h1>Oyunlar</h1><p class="muted">Oynayarak pekiştir. Rekorların kaydedilir.</p><div class="grid g2">${GAMES.map(g=>`<a class="gcard" href="#oyun/${g[0]}"><div class="ic" style="font-size:1.4rem">${g[1]}</div><b>${g[2]}</b><p class="small muted">${g[3]}</p><span class="chip">Rekor: ${S.best[g[0]]}</span></a>`).join('')}</div></div>`;
};
const G={};
function seqGame(key,items,render){
  let i=0,sc=0;const step=()=>{
    $('#gsc').textContent=`Puan ${sc} · ${Math.min(i+1,items.length)}/${items.length}`;
    if(i>=items.length){const rec=sc>S.best[key];if(rec){S.best[key]=sc;save();confetti();}addXP(5);$('#game').innerHTML=`<div class="card" style="text-align:center"><p class="big2">${sc}/${items.length}</p><p class="muted">${rec?'Yeni rekor!':'Rekor: '+S.best[key]}</p><button class="btn pri" id="again">Yeniden oyna</button></div>`;$('#again').onclick=()=>G[key]();return;}
    render(items[i],ok=>{if(ok){sc++;addXP(2);}$('#gsc').textContent=`Puan ${sc} · ${i+1}/${items.length}`;},()=>{i++;step();});
  };step();
}
const nextBtn=(box,next)=>{box.insertAdjacentHTML('beforeend','<button class="btn pri sm" id="gn" style="margin-top:8px">Devam →</button>');$('#gn').onclick=next;$('#gn').focus();};
G.tense=()=>seqGame('tense',sample(TSENT,12),(it,res,next)=>{
  const o=shuffle([it[1],...sample(TENSES.map(t=>t.k).filter(k=>k!==it[1]),3)]);
  $('#game').innerHTML=`<div class="card"><p class="eyebrow">Bu cümle hangi zamanda?</p><p class="big2">${it[0]} ${spk(it[0])}</p><div class="opts">${o.map(k=>`<button class="opt" data-k="${k}">${TENSE[k].ad} <span class="muted small">· ${TENSE[k].tr}</span></button>`).join('')}</div><div id="gw"></div></div>`;
  $$('#game .opt').forEach(b=>b.onclick=()=>{const ok=b.dataset.k===it[1];res(ok);$$('#game .opt').forEach(x=>{x.disabled=true;if(x.dataset.k===it[1])x.classList.add('ok');});if(!ok)b.classList.add('no');
    $('#gw').innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${TENSE[it[1]].ad} → Unit ${TENSE[it[1]].u}</p>`;nextBtn($('#gw'),next);});
});
G.dy=()=>{
  const pool=[...UNITS.flatMap(u=>u.tip.flatMap(t=>[[t[0],false,t[1]+' — '+t[2]],[t[1],true,'Doğru. '+t[2]]])),...DY_EXTRA];
  seqGame('dy',sample(pool,12),(it,res,next)=>{
    $('#game').innerHTML=`<div class="card"><p class="eyebrow">Bu cümle doğru mu?</p><p class="big2">${it[0]}</p><div class="verdict"><button class="btn" data-v="1">✓ Doğru</button><button class="btn" data-v="0">✗ Yanlış</button></div><div id="gw"></div></div>`;
    $$('.verdict button').forEach(b=>b.onclick=()=>{const ok=(b.dataset.v==='1')===it[1];res(ok);$$('.verdict button').forEach(x=>{x.disabled=true;if((x.dataset.v==='1')===it[1])x.classList.add('good');});if(!ok)b.classList.add('bad');
      $('#gw').innerHTML=`<p class="why"><b>${ok?'Bildin!':'Olmadı.'}</b> ${it[1]?it[2]:'Doğrusu: <span class="rightc">'+it[2]+'</span>'}</p>`;nextBtn($('#gw'),next);});
  });
};
G.order=()=>{
  const pool=UNITS.flatMap(u=>u.s.flatMap(s=>(s.ex||[]).map(e=>e))).filter(e=>{const n=e[0].split(' ').length;return n>=4&&n<=9&&!/[\/()]/.test(e[0]);});
  seqGame('order',sample(pool,8),(it,res,next)=>{
    const ws=it[0].replace(/[.!?]$/,'').split(' ');
    const q=['o',ws,it[0],it[1]];const box=$('#game');box.innerHTML='<div class="card" id="ob"></div><div id="gw"></div>';
    renderQ($('#ob'),q,ok=>{res(ok);nextBtn($('#gw'),next);});
  });
};
G.race=()=>{
  let sc=0,left=60,cur,form;const pick=()=>{cur=IRR[Math.floor(Math.random()*IRR.length)];form=Math.random()<.5?1:2;};
  $('#game').innerHTML=`<div class="card" style="text-align:center"><p class="big2">60 saniye! Düzensiz fiilin istenen biçimini yaz.</p><button class="btn pri" id="rgo">Başla</button></div>`;
  $('#rgo').onclick=()=>{
    pick();const draw=()=>{$('#game').innerHTML=`<div class="card" style="text-align:center"><p class="timer" id="rt" style="font-size:1.6rem">${left}s</p><p class="muted">${cur[3]}</p><p class="big2" style="font-size:2rem">${cur[0]} → <span style="color:var(--gold)">${form===1?'V2 (past simple)':'V3 (past participle)'}</span></p><div class="fillin" style="max-width:420px;margin:0 auto"><input class="inp" id="ri" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn pri" id="rb">↵</button></div><p class="why" id="rw"></p></div>`;
      const i=$('#ri');i.focus();const go=()=>{const v=i.value.trim().toLowerCase();if(!v)return;const ans=cur[form].split('/');const ok=ans.includes(v);
        if(ok){sc++;$('#gsc').textContent='Puan '+sc;}const msg=ok?'✓':'✗ '+cur[0]+' – '+cur[1]+' – '+cur[2];pick();draw();$('#rw').textContent=msg;};
      $('#rb').onclick=go;i.onkeydown=e=>{if(e.key==='Enter')go();};};
    draw();$('#gsc').textContent='Puan 0';
    const tm=setInterval(()=>{left--;const t=$('#rt');if(!t){clearInterval(tm);return;}t.textContent=left+'s';if(left<=0){clearInterval(tm);const rec=sc>S.best.race;if(rec){S.best.race=sc;save();confetti();}addXP(sc);
      $('#game').innerHTML=`<div class="card" style="text-align:center"><p class="big2">Süre doldu! ${sc} doğru</p><p class="muted">${rec?'Yeni rekor!':'Rekor: '+S.best.race}</p><button class="btn pri" id="again">Yeniden</button> <a class="btn" href="#kelime/irr">Listeye bak</a></div>`;$('#again').onclick=()=>{sc=0;left=60;G.race();};}},1000);
  };
};
G.match=()=>{
  const set=sample(VOCAB.flatMap(g=>g.w),6),L=shuffle(set),R=shuffle(set);let sel=null,miss=0,done=0;$('#gsc').textContent='Hata 0';
  $('#game').innerHTML=`<div class="card"><p class="muted">Soldan bir kelime, sağdan Türkçesini seç.</p><div class="match grid g2"><div class="col">${L.map(t=>`<button class="mt" data-a="${esc(t[0])}"><b>${t[0]}</b></button>`).join('')}</div><div class="col">${R.map(t=>`<button class="mt" data-b="${esc(t[0])}">${t[1]}</button>`).join('')}</div></div></div>`;
  $$('[data-a]').forEach(b=>b.onclick=()=>{$$('[data-a]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b;say(b.dataset.a);});
  $$('[data-b]').forEach(b=>b.onclick=()=>{if(!sel)return toast('Önce soldan bir kelime seç.');
    if(sel.dataset.a===b.dataset.b){sel.classList.add('done');b.classList.add('done');sel.classList.remove('sel');sel=null;done++;addXP(2);
      if(done===set.length){const sc=Math.max(0,set.length*2-miss),rec=sc>S.best.match;if(rec){S.best.match=sc;save();}confetti();$('#game').insertAdjacentHTML('beforeend',`<div class="card" style="text-align:center;margin-top:12px"><p class="big2">Tamamlandı! Puan ${sc}</p><p class="muted">${rec?'Yeni rekor!':'Rekor: '+S.best.match}</p><button class="btn pri" id="again">Yeni set</button></div>`);$('#again').onclick=()=>G.match();}}
    else{miss++;b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),400);$('#gsc').textContent='Hata '+miss;}});
};

/* ---------- Sınav ---------- */
let EX=null;
V.sinav=()=>`<div class="view"><h1>Sınav</h1><p class="muted">${UNITS.length} ünitenin tamamından rastgele 25 soru: seçmeli, boşluk doldurma ve cümle kurma. Sonunda yanlışlarını görürsün.</p><div id="ex" class="q" style="text-align:center"><p class="big2">Rekorun: ${S.best.sinav} / 100</p><button class="btn pri" id="exGo">Sınavı başlat</button></div></div>`;
function exStart(){EX={i:0,ok:0,wr:[],items:sample(UNITS.flatMap(u=>u.q.map(q=>[q,u.n])),25)};exShow();}
function exShow(){
  const z=$('#ex'),n=EX.items.length;z.style.textAlign='start';
  if(EX.i>=n){const sc=Math.round(EX.ok/n*100),rec=sc>S.best.sinav;if(rec){S.best.sinav=sc;save();}addXP(EX.ok);if(sc>=80)confetti();
    z.innerHTML=`<div style="text-align:center"><p class="big2" style="font-size:2rem">${sc}</p><p>${EX.ok}/${n} doğru · ${sc>=90?'Time Master!':sc>=70?'Çok iyi.':sc>=50?'Fena değil; zayıf üniteleri tekrar et.':'Ünitelere geri dönmekte fayda var.'} ${rec?'<b>Yeni rekor!</b>':''}</p><button class="btn pri" id="exGo">Yeni sınav</button></div>
     ${EX.wr.length?`<h3 class="sec-h">Tekrar etmen gerekenler</h3>${EX.wr.map(w=>`<div class="keybox"><b>${w.q}</b><p class="why">Doğrusu: <b>${w.a}</b> · <a href="#unite/${w.u}">Unit ${w.u}</a></p></div>`).join('')}`:''}`;return;}
  const [q,u]=EX.items[EX.i];
  z.innerHTML=`<div class="prog"><i style="width:${EX.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${EX.i+1}/${n} · Doğru ${EX.ok} · Unit ${u}</p><div id="eb"></div><div id="en"></div>`;
  renderQ($('#eb'),q,ok=>{if(ok)EX.ok++;else EX.wr.push({q:q[0]==='o'?q[3]:q[1],a:q[0]==='c'?q[2][q[3]]:q[0]==='f'?q[2][0]:q[2],u});
    $('#en').innerHTML='<button class="btn pri sm" style="margin-top:8px">Sonraki →</button>';const b=$('#en button');b.onclick=()=>{EX.i++;exShow();};b.focus();});
}
document.addEventListener('click',e=>{if(e.target.id==='exGo')exStart();});

/* ---------- Hakkında ---------- */
V.hakkinda=()=>`<div class="view card"><h1>Program hakkında</h1>
 <p><b>Zaman Makinesi</b>, İngilizce zamanları (tenses) Türkçe açıklamalarla adım adım öğreten, internetsiz çalışan tek dosyalık bir programdır.</p>
 <h3 class="sec-h">İçerik</h3><ul><li>${UNITS.length} ünite: present continuous ve simple, past simple ve continuous, present perfect (simple/continuous, for/since, past ile karşılaştırma), past perfect (simple/continuous), have / have got, used to, gelecek için present, going to, will/shall, will be doing / will have done, when I do / when I’ve done.</li>
 <li>Konu sırası <i>English Grammar in Use</i> (Units 1–${UNITS.length}) ile aynıdır; anlatımlar, örnek cümleler ve alıştırmalar bu program için özgün olarak yazılmıştır.</li>
 <li>Fiil Atölyesi: ${IRR.length} düzensiz fiil, -ing/-s/-ed yazım kuralları ve 11 zaman yapısı.</li></ul>
 <p>▶ düğmeleri cihazınızdaki İngilizce sesi kullanır (Windows, Android, iOS ve macOS’ta genellikle hazırdır).</p>
 <h3 class="sec-h">İlerleme</h3><p>Puanlar, yıldızlar ve rekorlar bu tarayıcıda saklanır.</p><button class="btn" id="reset">İlerlememi sıfırla</button>
 <p class="tiny muted" style="margin-top:16px">Hüseyin KAYA</p></div>`;
document.addEventListener('click',e=>{if(e.target.id==='reset'&&confirm('Bütün ilerleme silinsin mi?')){S=FRESH();save();hud();toast('İlerleme sıfırlandı.');route();}});

/* ---------- yönlendirme ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.preventDefault();e.stopPropagation();say(b.dataset.say);}},true);
function route(){
  const [v,a]=(location.hash.slice(1)||'home').split('/'),f=V[v]||V.home;
  try{speechSynthesis.cancel();}catch(e){}
  $('#app').innerHTML=f(a);
  const tab=v==='unite'?'yol':V[v]?v:'home';$$('#tabs a').forEach(x=>x.classList.toggle('on',x.dataset.v===tab));
  if(v==='home'||!V[v])setTimeout(spin,60);
  scrollTo(0,0);
}
addEventListener('hashchange',route);hud();route();
