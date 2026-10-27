/* ===== Yapı Ustası — uygulama ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);

/* ---------- İngilizce ses (cihazın İngilizce sesi; internet gerekmez) ---------- */
let EN_V=null;
function enVoice(){if(!('speechSynthesis' in window))return null;try{const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang)),loc=vs.filter(v=>v.localService!==false);/* internetsiz çalışan (cihazdaki) sesler önce */return loc.find(v=>/^en[-_](GB|US)/i.test(v.lang))||loc[0]||vs.find(v=>/^en[-_](GB|US)/i.test(v.lang))||vs[0]||null;}catch(e){return null;}}
if('speechSynthesis' in window){try{speechSynthesis.getVoices();speechSynthesis.addEventListener('voiceschanged',()=>{EN_V=enVoice();});}catch(e){}}
function say(t){
  const v=EN_V||enVoice();if(!v){toast('Cihazda İngilizce ses bulunamadı.');return;}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/[’‘]/g,"'"));u.lang=v.lang;u.voice=v;u.rate=.92;speechSynthesis.speak(u);}catch(e){}
}
const spk=t=>`<button class="spk" data-say="${esc(t)}" aria-label="Dinle" title="Dinle">▶</button>`;

/* ---------- durum ---------- */
const KEY='yapi-ustasi-v1';
const FRESH=()=>({v:1,xp:0,un:{},best:{vs:0,ns:0,art:0,dy:0,order:0,match:0,sinav:0},known:{},day:'',streak:0});
let S=FRESH();
try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)S=Object.assign(FRESH(),o,{best:Object.assign(FRESH().best,o.best||{})});}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
(function(){const d=new Date().toISOString().slice(0,10);if(S.day!==d){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();}})();
const LEVELS=[[0,'Starter'],[60,'Elementary'],[160,'Pre-intermediate'],[320,'Intermediate'],[520,'Upper-intermediate'],[800,'Advanced'],[1500,'Grammar Master']];
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
const UN=Object.fromEntries(UNITS.map(u=>[u.n,u])),FIRST=UNITS[0].n,LAST=UNITS[UNITS.length-1].n;
const uDone=()=>UNITS.filter(u=>S.un[u.n]).length;
const starSum=()=>UNITS.reduce((a,u)=>a+((S.un[u.n]||{}).s||0),0);
const stars=n=>`<span class="stars" aria-label="${n} yıldız">${'★'.repeat(n)}<span class="off">${'★'.repeat(3-n)}</span></span>`;
const partOfU=n=>PARTS.find(p=>p.u.includes(n));
const partDone=k=>PARTS[k].u.every(n=>S.un[n]);
const BADGES=[
 ['🌱','İlk ünite',()=>uDone()>=1],['🔑','Modal ustası',()=>partDone(0)],['💭','if & wish',()=>partDone(1)],['🏗️','Edilgen',()=>partDone(2)],['🗣️','Aktarma',()=>partDone(3)],
 ['🧩','-ing & to',()=>partDone(4)],['📦','İsimler',()=>partDone(5)],['🧭','Zamirler',()=>partDone(6)],['🪢','Relative',()=>partDone(7)],['🏁',UNITS.length+' ünite',()=>uDone()===UNITS.length],['⭐',UNITS.length*3+' yıldız',()=>starSum()===UNITS.length*3],
 ['🎯','Fiil ayırıcı',()=>S.best.vs>=10],['🏷️','Article ustası',()=>S.best.art>=10],['🎓','Sınav 90+',()=>S.best.sinav>=90],['📚','50 kelime',()=>Object.keys(S.known).length>=50],['🔥','3 gün seri',()=>S.streak>=3]
];
const blocksSVG=()=>`<svg viewBox="0 0 300 260" role="img" aria-label="Yapı blokları">
 <g id="bl">${[[30,190,'var(--p2)','can'],[110,190,'var(--p3)','be V3'],[190,190,'var(--p8)','said'],[70,130,'var(--p1)','-ing'],[150,130,'var(--p6)','if'],[110,70,'var(--p7)','the']].map((b,i)=>`<g class="blk" style="transition:transform .6s ${i*0.12}s"><rect x="${b[0]}" y="${b[1]}" width="80" height="54" rx="10" fill="${b[2]}"/><text x="${b[0]+40}" y="${b[1]+34}" text-anchor="middle" font-size="18" font-weight="700" fill="#111">${b[3]}</text></g>`).join('')}</g>
 <rect x="20" y="246" width="260" height="8" rx="4" fill="var(--line)"/></svg>`;
let blT;function spin(){clearInterval(blT);const g=$$('#bl .blk');if(!g.length)return;let up=true;const go=()=>{g.forEach((b,i)=>b.style.transform=up?`translateY(${-6-i%3*4}px)`:'translateY(0)');up=!up;};go();blT=setInterval(()=>{if(!document.body.contains(g[0]))return clearInterval(blT);go();},1400);}

/* ---------- görünümler ---------- */
const V={};
V.home=()=>{
  const nx=UNITS.find(u=>!S.un[u.n])||UNITS[0];
  return `<section class="hero view"><div><p class="eyebrow">English Grammar · Units ${FIRST}–${LAST}</p><h1>Yapı Ustası</h1>
   <p class="big2" style="color:var(--gold)">Modals · if & wish · Passive · Reported speech · -ing/to · Articles · Relative clauses</p>
   <p class="muted">İngilizcenin cümle yapılarını blok blok kur: her ünitede Türkçe anlatım, sesli örnekler, sık yapılan hatalar ve alıştırmalar. Dönüştürücü’de cümleyi edilgene, dolaylı anlatıma ve question tag’e çevir; oyunlarla pekiştir.</p>
   <div class="row" style="margin-top:14px"><a class="btn pri" href="#unite/${nx.n}">${uDone()?'Kaldığın yerden devam':'Unit '+FIRST+'’ya başla'} →</a><a class="btn" href="#lab">Dönüştürücü</a></div>
   <div class="stat"><div><b>${uDone()}/${UNITS.length}</b><span>ünite</span></div><div><b>${starSum()}</b><span>yıldız</span></div><div><b>${S.xp}</b><span>puan</span></div><div><b>${Object.keys(S.known).length}</b><span>bilinen kelime</span></div><div><b>${S.streak}</b><span>gün seri</span></div></div></div>
   <div class="scalebox">${blocksSVG()}</div></section>
  <h2 class="sec-h">Bölümler</h2>
  <div class="grid g3">${PARTS.map(p=>{const d=p.u.filter(n=>S.un[n]).length;return `<a class="gcard" href="#unite/${p.u.find(n=>!S.un[n])||p.u[0]}"><b style="color:${p.c}">${p.p}. ${p.t}</b><p class="small muted">${p.en} · Unit ${p.u[0]}–${p.u[p.u.length-1]}</p><div class="prog" style="margin-top:8px"><i style="width:${d/p.u.length*100}%;background:${p.c}"></i></div><p class="small muted">${d}/${p.u.length} ünite</p></a>`;}).join('')}</div>
  <h2 class="sec-h">Rozetler</h2><div class="bgrid">${BADGES.map(b=>`<div><span class="badge ${b[2]()?'on':''}">${b[2]()?b[0]:'🔒'}</span><div class="small">${b[1]}</div></div>`).join('')}</div>`;
};
V.yol=()=>`<div class="view"><h1>Üniteler</h1><p class="muted">Her ünitede anlatım, örnekler, sık yapılan hatalar ve 4–6 soruluk alıştırma var. Alıştırmayı tam doğru bitirirsen üç yıldız.</p>
 ${PARTS.map(p=>`<div class="part"><b style="color:${p.c}">${p.p}. ${p.t}</b><span class="muted">${p.en}</span></div><div class="path">${p.u.map(n=>{const u=UN[n],r=S.un[n];return `<a class="stop ${r?'done':''}" href="#unite/${n}" style="--c:${p.c}"><span class="n">${r?'✓':n}</span><span class="t"><b>Unit ${n} · ${u.t} <span class="muted">(${u.f})</span></b><span>${u.tr}</span></span>${stars(r?r.s:0)}</a>`;}).join('')}</div>`).join('')}</div>`;
let QZ=null;
const LABN={pass:'Edilgen',rep:'Dolaylı anlatım',tag:'Question tag',q:'Soru'};
V.unite=a=>{
  const n=Math.min(LAST,Math.max(FIRST,+a||FIRST)),u=UN[n],p=partOfU(n),pv=UN[n-1],nx=UN[n+1];
  QZ={u,i:0,ok:0,items:shuffle(u.q)};setTimeout(qShow,0);
  return `<article class="card view" style="--c:${p.c}">
   <div class="lhead"><div><p class="eyebrow" style="color:${p.c}">Unit ${n} · ${p.t}</p><h1>${u.t} <span class="muted">(${u.f})</span></h1><p class="muted">${u.tr}</p></div>${u.lab?`<a class="btn sm" href="#lab/${u.lab}">Dönüştürücü: ${LABN[u.lab]} →</a>`:''}</div>
   <div class="lbody">${u.s.map(s=>`<h3 class="sec-h">${s.h}</h3><p>${s.b}</p>${s.f?`<div class="formula">${s.f.map(x=>typeof x==='string'?`<span>${x}</span>`:`<span class="k">${x.k}</span>`).join('')}</div>`:''}
     ${(s.ex||[]).map(e=>`<div class="ex">${spk(e[0])}<span class="en">${e[0]}</span><span class="tr">${e[1]}</span></div>`).join('')}`).join('')}
    ${u.tip.length?`<div class="keybox"><h3>Dikkat! Sık yapılan hatalar</h3>${u.tip.map(t=>`<p><span class="wrong">${t[0]}</span> → <span class="rightc">${t[1]}</span><br><span class="small muted">${t[2]}</span></p>`).join('')}</div>`:''}</div>
   <h2 class="sec-h">Alıştırma ${S.un[n]?stars(S.un[n].s):''}</h2><div id="qz"></div>
   <div class="row" style="justify-content:space-between;margin-top:16px">${pv?`<a class="btn ghost" href="#unite/${pv.n}">← Unit ${pv.n}</a>`:'<span></span>'}${nx?`<a class="btn ghost" href="#unite/${nx.n}">Unit ${nx.n} →</a>`:`<a class="btn ghost" href="#sinav">Sınava geç →</a>`}</div></article>`;
};

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
    const nx=UN[QZ.u.n+1];
    z.innerHTML=`<div class="q" style="text-align:center"><div style="font-size:2rem">${stars(s)}</div><p class="big2">${QZ.ok}/${n} doğru</p><p class="muted">${s===3?'Mükemmel! Bu ünite tamam.':s===2?'Güzel. Üç yıldız için tekrar dene.':'Anlatımı bir kez daha okuyup yeniden dene.'}</p><div class="row" style="justify-content:center"><button class="btn" id="qAgain">Yeniden dene</button>${nx?`<a class="btn pri" href="#unite/${nx.n}">Unit ${nx.n} →</a>`:'<a class="btn pri" href="#sinav">Sınava gir →</a>'}</div></div>`;
    if(s===3)confetti();$('#qAgain').onclick=()=>{QZ.i=0;QZ.ok=0;QZ.items=shuffle(QZ.items);qShow();};return;
  }
  z.innerHTML=`<div class="q"><div class="prog"><i style="width:${QZ.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${QZ.i+1}/${n}</p><div id="qb"></div><div id="qn"></div></div>`;
  renderQ($('#qb'),QZ.items[QZ.i],ok=>{if(ok){QZ.ok++;addXP(3);}$('#qn').innerHTML=`<button class="btn pri sm" style="margin-top:8px">${QZ.i+1<n?'Sonraki soru':'Sonucu gör'}</button>`;const b=$('#qn button');b.onclick=()=>{QZ.i++;qShow();};b.focus();});
}

/* ---------- Dönüştürücü ---------- */
const DT=[['ps','Present Simple'],['pc','Present Continuous'],['pas','Past Simple'],['pac','Past Continuous'],['pp','Present Perfect'],['pap','Past Perfect'],['wi','will'],['gt','going to'],['m:can','can'],['m:must','must'],['m:should','should']];
const DSUBJ=['I','you','he','she','we','they'];
let L={m:'pass',t:'pas',s:'they',v:'build',o:'this bridge',pl:false,f:'+',w:'she'};
try{const o=JSON.parse(localStorage.getItem(KEY+'-lab')||'null');if(o)L=Object.assign(L,o);}catch(e){}
const LAB_EX=[['build','this bridge',false],['write','the letter',false],['paint','the house',false],['clean','the rooms',true],['make','these cakes',true],['steal','my bike',false],['invent','the telephone',false],['send','the emails',true],['repair','the car',false],['grow','vegetables',true]];
V.lab=a=>{if(a&&LABN[a])L.m=a;setTimeout(labDraw,0);return `<div class="view"><h1>Dönüştürücü</h1><p class="muted">Etken bir cümle kur; makine onu <b>edilgene</b>, <b>dolaylı anlatıma</b>, <b>question tag</b>’e ve <b>soruya</b> çevirsin. Düzensiz fiiller ve zaman kaymaları otomatik.</p>
 <div class="tg" id="lm" style="margin:6px 0 14px">${Object.entries(LABN).map(([k,v])=>`<button data-m="${k}">${v}</button>`).join('')}</div>
 <div class="calc"><div class="card">
  <h3 class="sec-h" style="margin-top:0">Zaman / modal</h3><div class="pills" id="lt">${DT.map(t=>`<button class="pill" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>
  <h3 class="sec-h">Özne</h3><div class="pills" id="ls">${DSUBJ.map(s=>`<button class="pill" data-s="${s}">${s}</button>`).join('')}</div>
  <h3 class="sec-h">Fiil ve nesne</h3><div class="row"><input class="inp" id="lv" list="vl" value="${esc(L.v)}" style="flex:1;min-width:110px" autocapitalize="off" spellcheck="false" placeholder="fiil"><input class="inp" id="lo2" value="${esc(L.o)}" style="flex:2;min-width:150px" autocapitalize="off" spellcheck="false" placeholder="nesne (ör. the car)"></div>
  <datalist id="vl">${IRR.map(x=>`<option value="${x[0]}">`).join('')}</datalist>
  <label class="small" style="display:flex;gap:8px;align-items:center;margin-top:8px"><input type="checkbox" id="lpl" ${L.pl?'checked':''}> Nesne çoğul (are/were)</label>
  <div class="pills" style="margin-top:8px">${LAB_EX.map((x,i)=>`<button class="pill" data-x="${i}">${x[0]} ${x[1]}</button>`).join('')}</div>
  <h3 class="sec-h">Biçim</h3><div class="tg" id="lf"><button data-f="+">Olumlu</button><button data-f="-">Olumsuz</button><button data-f="?">Soru</button></div>
  <div class="tg" id="lw" style="margin-inline-start:8px"><button data-w="he">Konuşan: he</button><button data-w="she">Konuşan: she</button></div>
 </div><div class="card" id="lout"></div></div></div>`;};
function labDraw(){
  const o=$('#lout');if(!o)return;try{localStorage.setItem(KEY+'-lab',JSON.stringify(L));}catch(e){}
  $$('#lm button').forEach(b=>b.classList.toggle('on',b.dataset.m===L.m));$$('#lt .pill').forEach(b=>b.classList.toggle('on',b.dataset.t===L.t));$$('#ls .pill').forEach(b=>b.classList.toggle('on',b.dataset.s===L.s));
  $$('#lf button').forEach(b=>b.classList.toggle('on',b.dataset.f===L.f));$$('#lw button').forEach(b=>b.classList.toggle('on',b.dataset.w===L.w));
  const v=(L.v||'').trim().toLowerCase();if(!/^[a-z]+$/.test(v)){o.innerHTML='<p class="muted">Geçerli bir fiil yaz (ör. build, write, clean).</p>';return;}
  const obj=(L.o||'').trim(),act=conjText(conj(L.t,L.s,v,L.f,true))+(obj?' '+obj:'')+(L.f==='?'?'?':'.');
  const row=(lab,txt,note)=>`<div class="keybox"><p class="eyebrow">${lab}</p><p class="conj" style="font-size:1.2rem">${esc(txt)} ${spk(txt)}</p>${note?`<p class="small muted">${note}</p>`:''}</div>`;
  let out=row('Etken (active)',act,'');
  if(L.m==='pass'){
    const p=passive(L.t,L.s,v,obj,L.pl,L.f);
    out+=p?row('Edilgen (passive)',p,'Nesne özne olur → <b>be</b> (zamana göre) + <b>'+V3(v)+'</b> (V3) + by …. Yapan önemsizse “by …” atılabilir.'):'<p class="muted">Bu zaman için edilgen gösterilmiyor.</p>';
    if(p&&!obj)out+='<p class="small">⚠ Edilgen için bir nesne yaz.</p>';
  }else if(L.m==='rep'){
    const r=reported(L.t,L.s,v,obj,L.f,L.w),TN=Object.fromEntries(DT),bn=TN[r.t]||(r.t==='m:would'?'would':r.t==='m:could'?'could':r.t==='m:might'?'might':r.t==='pap'?'Past Perfect':r.t==='papc'?'Past Perfect Continuous':r.t==='wgt'?'was/were going to':r.t);
    out+=row('Doğrudan (direct)','“'+r.direct+'”','')+row('Dolaylı (reported)',r.rep,`Zaman bir geri: <b>${TN[L.t]}</b> → <b>${bn}</b>. Zamirler konuşana göre değişir (I → ${L.w}, my → ${L.w==='he'?'his':'her'}).`);
  }else if(L.m==='tag'){
    const f=L.f==='?'?'+':L.f,t=tag(L.t,L.s,v,f).replace(/^(.*?), /,'$1'+(obj?' '+obj:'')+', ');
    out+=row('Question tag',t,f==='+'?'Olumlu cümle → olumsuz tag.':'Olumsuz cümle → olumlu tag.');
  }else{
    const q=conjText(conj(L.t,L.s,v,'?',true))+(obj?' '+obj:'')+'?';const neg=conjText(conj(L.t,L.s,v,'-',true))+(obj?' '+obj:'')+'.';
    out+=row('Evet/hayır sorusu',q,'Yardımcı fiil özneden önce; yoksa do/does/did.')+row('Olumsuz',neg,'')+row('Wh- sorusu',(q.replace(/^\w/,c=>c.toLowerCase())).replace(/^/,'What ').replace(' '+obj+'?','?').replace(/^What (\w+)/,(m,a)=>'What '+a),'Nesneyi soruyorsak nesne düşer: <b>What</b> + yardımcı + özne + fiil?');
  }
  o.innerHTML=out;
}
document.addEventListener('click',e=>{
  const b=e.target.closest('#lm button,#lt .pill,#ls .pill,#lf button,#lw button,.pill[data-x]');if(!b||!$('#lout'))return;
  if(b.dataset.m)L.m=b.dataset.m;if(b.dataset.t)L.t=b.dataset.t;if(b.dataset.s)L.s=b.dataset.s;if(b.dataset.f)L.f=b.dataset.f;if(b.dataset.w)L.w=b.dataset.w;
  if(b.dataset.x){const x=LAB_EX[+b.dataset.x];L.v=x[0];L.o=x[1];L.pl=x[2];$('#lv').value=L.v;$('#lo2').value=L.o;$('#lpl').checked=L.pl;}
  labDraw();
});
document.addEventListener('input',e=>{if(e.target.id==='lv')L.v=e.target.value;else if(e.target.id==='lo2')L.o=e.target.value;else if(e.target.id==='lpl')L.pl=e.target.checked;else return;labDraw();});

/* ---------- Kelimeler ---------- */
let KT='grp',KC={i:0,list:null};
V.kelime=a=>{if(a)KT=a;setTimeout(kDraw,0);return `<div class="view"><h1>Kelimeler</h1><p class="muted">Ünitelerdeki fiil kalıpları ve kelime grupları. ▶ ile dinle, kartlarla ezberle; “biliyorum” dediklerin sayılır.</p>
 <div class="tg" id="kt"><button data-k="grp">Gruplar</button><button data-k="vs">-ing / to listesi</button><button data-k="fc">Kartlar</button></div><div id="kb" style="margin-top:14px"></div></div>`;};
const ALLW=()=>VOCAB.flatMap(g=>g.w.map(w=>({en:w[0],say:w[0],tr:w[1],ex:w[2],id:'w:'+w[0]})));
const VSN={ing:'+ -ing',to:'+ to …',both:'ikisi de (aynı anlam)',diff:'ikisi de (anlam değişir)'};
function kDraw(){
  const z=$('#kb');if(!z)return;$$('#kt button').forEach(b=>b.classList.toggle('on',b.dataset.k===KT));
  if(KT==='grp'){
    z.innerHTML=VOCAB.map(g=>`<div class="card" style="margin-bottom:12px"><div class="row" style="justify-content:space-between"><h3 class="sec-h" style="margin:0">${g.t}</h3><a class="small" href="#unite/${g.u}">Unit ${g.u}</a></div>${g.w.map(w=>`<div class="ex">${spk(w[0])}<span class="en"><b>${w[0]}</b> — ${w[1]}</span><span class="tr"><i>${w[2]}</i> ${spk(w[2])}</span></div>`).join('')}</div>`).join('');
  }else if(KT==='vs'){
    z.innerHTML=Object.entries(VSN).map(([k,t])=>`<div class="card" style="margin-bottom:12px"><h3 class="sec-h" style="margin-top:0">${t}</h3><div class="pills">${VSORT.filter(x=>x[1]===k).map(x=>`<span class="pill" title="${esc(x[2])}">${x[0]}</span>`).join('')}</div>${k==='diff'?`<ul class="small">${VSORT.filter(x=>x[1]==='diff').map(x=>`<li><b>${x[0]}</b>: ${x[2]}</li>`).join('')}</ul>`:''}</div>`).join('');
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
const GAMES=[['vs','🧩','-ing mi, to mu?','Fiili doğru kutuya at: -ing, to, ikisi de ya da anlam değişir.'],['ns','📦','Sayılabilir mi?','İsim sayılabilir mi, sayılamaz mı, ikisi de mi?'],['art','🏷️','a / an / the / –','Boşluğa doğru artikeli koy.'],['dy','✅','Doğru mu, yanlış mı?','Cümle doğru mu? Yanlışsa düzeltmesini gör.'],['order','🧱','Cümle Kur','Karışık kelimeleri doğru sıraya diz.'],['match','🔗','Eşleştir','İngilizce kalıbı Türkçesiyle buluştur.']];

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
G.match=()=>{
  const set=sample(VOCAB.flatMap(g=>g.w),6),L=shuffle(set),R=shuffle(set);let sel=null,miss=0,done=0;$('#gsc').textContent='Hata 0';
  $('#game').innerHTML=`<div class="card"><p class="muted">Soldan bir kelime, sağdan Türkçesini seç.</p><div class="match grid g2"><div class="col">${L.map(t=>`<button class="mt" data-a="${esc(t[0])}"><b>${t[0]}</b></button>`).join('')}</div><div class="col">${R.map(t=>`<button class="mt" data-b="${esc(t[0])}">${t[1]}</button>`).join('')}</div></div></div>`;
  $$('[data-a]').forEach(b=>b.onclick=()=>{$$('[data-a]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b;say(b.dataset.a);});
  $$('[data-b]').forEach(b=>b.onclick=()=>{if(!sel)return toast('Önce soldan bir kelime seç.');
    if(sel.dataset.a===b.dataset.b){sel.classList.add('done');b.classList.add('done');sel.classList.remove('sel');sel=null;done++;addXP(2);
      if(done===set.length){const sc=Math.max(0,set.length*2-miss),rec=sc>S.best.match;if(rec){S.best.match=sc;save();}confetti();$('#game').insertAdjacentHTML('beforeend',`<div class="card" style="text-align:center;margin-top:12px"><p class="big2">Tamamlandı! Puan ${sc}</p><p class="muted">${rec?'Yeni rekor!':'Rekor: '+S.best.match}</p><button class="btn pri" id="again">Yeni set</button></div>`);$('#again').onclick=()=>G.match();}}
    else{miss++;b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),400);$('#gsc').textContent='Hata '+miss;}});
};

const choiceGame=(key,items,q,opts,ans,why)=>seqGame(key,items,(it,res,next)=>{
  $('#game').innerHTML=`<div class="card"><p class="eyebrow">${q}</p><p class="big2">${it[0].includes('___')?it[0].replace('___','<b style="color:var(--gold)">____</b>'):it[0]} ${spk(it[0].replace('___',ans(it)==='–'?'':ans(it)))}</p><div class="opts">${opts.map(o=>`<button class="opt" data-o="${o[0]}">${o[1]}</button>`).join('')}</div><div id="gw"></div></div>`;
  $$('#game .opt').forEach(b=>b.onclick=()=>{const ok=b.dataset.o===ans(it);res(ok);$$('#game .opt').forEach(x=>{x.disabled=true;if(x.dataset.o===ans(it))x.classList.add('ok');});if(!ok)b.classList.add('no');
    $('#gw').innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${why(it)}</p>`;nextBtn($('#gw'),next);});
});
G.vs=()=>choiceGame('vs',sample(VSORT,12),'Bu fiilden sonra ne gelir?',Object.entries(VSN),it=>it[1],it=>`<b>${it[0]}</b> ${VSN[it[1]]}. ${it[2]}`);
G.ns=()=>choiceGame('ns',sample(NSORT,12),'Bu isim sayılabilir mi?',[['c','Sayılabilir (a/an, çoğul)'],['u','Sayılamaz (much, some)'],['b','Anlama göre ikisi de']],it=>it[1],it=>({c:'Sayılabilir: a/an alır, çoğul olur.',u:'Sayılamaz: a/an almaz, çoğul olmaz.',b:'Anlama göre değişir (Unit 70).'})[it[1]]);
G.art=()=>choiceGame('art',sample(ART,12),'Boşluğa ne gelir?',[['a','a'],['an','an'],['the','the'],['–','– (artikel yok)']],it=>it[1],it=>it[2]);

/* ---------- Sınav ---------- */
let EX=null;
V.sinav=()=>`<div class="view"><h1>Sınav</h1><p class="muted">${UNITS.length} ünitenin tamamından rastgele 25 soru: seçmeli, boşluk doldurma ve cümle kurma. Sonunda yanlışlarını görürsün.</p><div id="ex" class="q" style="text-align:center"><p class="big2">Rekorun: ${S.best.sinav} / 100</p><button class="btn pri" id="exGo">Sınavı başlat</button></div></div>`;
function exStart(){EX={i:0,ok:0,wr:[],items:sample(UNITS.flatMap(u=>u.q.map(q=>[q,u.n])),25)};exShow();}
function exShow(){
  const z=$('#ex'),n=EX.items.length;z.style.textAlign='start';
  if(EX.i>=n){const sc=Math.round(EX.ok/n*100),rec=sc>S.best.sinav;if(rec){S.best.sinav=sc;save();}addXP(EX.ok);if(sc>=80)confetti();
    z.innerHTML=`<div style="text-align:center"><p class="big2" style="font-size:2rem">${sc}</p><p>${EX.ok}/${n} doğru · ${sc>=90?'Grammar Master!':sc>=70?'Çok iyi.':sc>=50?'Fena değil; zayıf üniteleri tekrar et.':'Ünitelere geri dönmekte fayda var.'} ${rec?'<b>Yeni rekor!</b>':''}</p><button class="btn pri" id="exGo">Yeni sınav</button></div>
     ${EX.wr.length?`<h3 class="sec-h">Tekrar etmen gerekenler</h3>${EX.wr.map(w=>`<div class="keybox"><b>${w.q}</b><p class="why">Doğrusu: <b>${w.a}</b> · <a href="#unite/${w.u}">Unit ${w.u}</a></p></div>`).join('')}`:''}`;return;}
  const [q,u]=EX.items[EX.i];
  z.innerHTML=`<div class="prog"><i style="width:${EX.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${EX.i+1}/${n} · Doğru ${EX.ok} · Unit ${u}</p><div id="eb"></div><div id="en"></div>`;
  renderQ($('#eb'),q,ok=>{if(ok)EX.ok++;else EX.wr.push({q:q[0]==='o'?q[3]:q[1],a:q[0]==='c'?q[2][q[3]]:q[0]==='f'?q[2][0]:q[2],u});
    $('#en').innerHTML='<button class="btn pri sm" style="margin-top:8px">Sonraki →</button>';const b=$('#en button');b.onclick=()=>{EX.i++;exShow();};b.focus();});
}
document.addEventListener('click',e=>{if(e.target.id==='exGo')exStart();});

/* ---------- Hakkında ---------- */
V.hakkinda=()=>`<div class="view card"><h1>Program hakkında</h1>
 <p><b>Yapı Ustası</b>, İngilizcenin temel cümle yapılarını Türkçe açıklamalarla adım adım öğreten, internetsiz çalışan tek dosyalık bir programdır. Zamanlar için kardeş program <b>Zaman Makinesi</b>’dir (Units 1–25).</p>
 <h3 class="sec-h">İçerik</h3><ul>${PARTS.map(p=>`<li><b>${p.t}</b> (Unit ${p.u[0]}–${p.u[p.u.length-1]}): ${p.u.map(n=>UN[n].t).join(', ')}</li>`).join('')}</ul>
 <p>Konu sırası <i>English Grammar in Use</i> (Units ${FIRST}–${LAST}) ile aynıdır; anlatımlar, örnek cümleler ve alıştırmalar bu program için özgün olarak yazılmıştır.</p>
 <p>▶ düğmeleri cihazınızdaki İngilizce sesi kullanır.</p>
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
