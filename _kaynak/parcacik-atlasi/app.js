/* ===== Parçacık Atlası — uygulama ===== */
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
const KEY='parcacik-atlasi-v1';
const FRESH=()=>({v:1,xp:0,un:{},best:{pfill:0,pmean:0,pobj:0,dy:0,order:0,match:0,sinav:0},known:{},day:'',streak:0});
let S=FRESH();
try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)S=Object.assign(FRESH(),o,{best:Object.assign(FRESH().best,o.best||{})});}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
(function(){const d=new Date().toISOString().slice(0,10);if(S.day!==d){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();}})();
const LEVELS=[[0,'Starter'],[60,'Elementary'],[160,'Pre-intermediate'],[320,'Intermediate'],[520,'Upper-intermediate'],[800,'Advanced'],[900,'Phrasal Pro']];
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
 ['🌱','İlk ünite',()=>uDone()>=1],['🚪','in / out',()=>partDone(0)],['💡','on / off',()=>partDone(1)],['⬆️','up / down',()=>partDone(2)],['↩️','away / back',()=>partDone(3)],['📘','Ekler',()=>partDone(4)],
 ['🏁',UNITS.length+' ünite',()=>uDone()===UNITS.length],['⭐',UNITS.length*3+' yıldız',()=>starSum()===UNITS.length*3],['🧩','Parçacık avcısı',()=>S.best.pfill>=10],['🎯','Nesne ustası',()=>S.best.pobj>=10],['🎓','Sınav 90+',()=>S.best.sinav>=90],['📚','50 kelime',()=>Object.keys(S.known).length>=50],['🔥','3 gün seri',()=>S.streak>=3]
];
const UL=n=>UN[n]&&UN[n].ek||'Unit '+n;
const blocksSVG=()=>`<svg viewBox="0 0 300 260" role="img" aria-label="Parçacık pusulası"><circle cx="150" cy="130" r="110" fill="var(--panel2)" stroke="var(--gold)" stroke-width="5"/><circle cx="150" cy="130" r="12" fill="var(--gold)"/>
 <g id="bl">${[['up',150,42,'var(--p3)'],['down',150,222,'var(--p3)'],['in',62,130,'var(--p2)'],['out',238,130,'var(--p2)'],['on',88,68,'var(--p6)'],['off',212,192,'var(--p6)'],['away',212,68,'var(--p8)'],['back',88,192,'var(--p8)']].map((b,i)=>`<g class="blk" style="transition:transform .6s ${i*0.08}s"><circle cx="${b[1]}" cy="${b[2]}" r="25" fill="${b[3]}"/><text x="${b[1]}" y="${b[2]+5}" text-anchor="middle" font-size="14" font-weight="700" fill="#111">${b[0]}</text></g>`).join('')}</g></svg>`;
let blT;function spin(){clearInterval(blT);const g=$$('#bl .blk');if(!g.length)return;let up=true;const go=()=>{g.forEach((b,i)=>b.style.transform=up?`translateY(${-6-i%3*4}px)`:'translateY(0)');up=!up;};go();blT=setInterval(()=>{if(!document.body.contains(g[0]))return clearInterval(blT);go();},1400);}

/* ---------- görünümler ---------- */
const V={};
V.home=()=>{
  const nx=UNITS.find(u=>!S.un[u.n])||UNITS[0];
  return `<section class="hero view"><div><p class="eyebrow">English Grammar · Units ${FIRST}–${LAST}</p><h1>Parçacık Atlası</h1>
   <p class="big2" style="color:var(--gold)">Phrasal verbs · in · out · on · off · up · down · away · back</p>
   <p class="muted">İngilizcenin en çok kullanılan phrasal verb’lerini parçacık parçacık öğren: her ünitede Türkçe anlatım, sesli örnekler, sık yapılan hatalar ve alıştırmalar. Parçacık Haritası’nda anlamları ve nesnenin yerini gör; sonda zamanlar, modallar, kısaltmalar, yazım ve Amerikan İngilizcesi özetleri.</p>
   <div class="row" style="margin-top:14px"><a class="btn pri" href="#unite/${nx.n}">${uDone()?'Kaldığın yerden devam':'Unit '+FIRST+'’ye başla'} →</a><a class="btn" href="#lab">Parçacık Haritası</a></div>
   <div class="stat"><div><b>${uDone()}/${UNITS.length}</b><span>ünite</span></div><div><b>${starSum()}</b><span>yıldız</span></div><div><b>${S.xp}</b><span>puan</span></div><div><b>${Object.keys(S.known).length}</b><span>bilinen kelime</span></div><div><b>${S.streak}</b><span>gün seri</span></div></div></div>
   <div class="scalebox">${blocksSVG()}</div></section>
  <h2 class="sec-h">Bölümler</h2>
  <div class="grid g3">${PARTS.map(p=>{const d=p.u.filter(n=>S.un[n]).length;return `<a class="gcard" href="#unite/${p.u.find(n=>!S.un[n])||p.u[0]}"><b style="color:${p.c}">${p.p}. ${p.t}</b><p class="small muted">${p.en} · ${UL(p.u[0])}–${UL(p.u[p.u.length-1])}</p><div class="prog" style="margin-top:8px"><i style="width:${d/p.u.length*100}%;background:${p.c}"></i></div><p class="small muted">${d}/${p.u.length} ünite</p></a>`;}).join('')}</div>
  <h2 class="sec-h">Rozetler</h2><div class="bgrid">${BADGES.map(b=>`<div><span class="badge ${b[2]()?'on':''}">${b[2]()?b[0]:'🔒'}</span><div class="small">${b[1]}</div></div>`).join('')}</div>`;
};
V.yol=()=>`<div class="view"><h1>Üniteler</h1><p class="muted">Her ünitede anlatım, örnekler, sık yapılan hatalar ve 4–6 soruluk alıştırma var. Alıştırmayı tam doğru bitirirsen üç yıldız.</p>
 ${PARTS.map(p=>`<div class="part"><b style="color:${p.c}">${p.p}. ${p.t}</b><span class="muted">${p.en}</span></div><div class="path">${p.u.map(n=>{const u=UN[n],r=S.un[n];return `<a class="stop ${r?'done':''}" href="#unite/${n}" style="--c:${p.c}"><span class="n">${r?'✓':n}</span><span class="t"><b>${UL(n)} · ${u.t} <span class="muted">(${u.f})</span></b><span>${u.tr}</span></span>${stars(r?r.s:0)}</a>`;}).join('')}</div>`).join('')}</div>`;
let QZ=null;
const LABN={};
V.unite=a=>{
  const n=Math.min(LAST,Math.max(FIRST,+a||FIRST)),u=UN[n],p=partOfU(n),pv=UN[n-1],nx=UN[n+1];
  QZ={u,i:0,ok:0,items:shuffle(u.q)};setTimeout(qShow,0);
  return `<article class="card view" style="--c:${p.c}">
   <div class="lhead"><div><p class="eyebrow" style="color:${p.c}">${UL(n)} · ${p.t}</p><h1>${u.t} <span class="muted">(${u.f})</span></h1><p class="muted">${u.tr}</p></div>${u.lab?`<a class="btn sm" href="#lab/${u.lab}">Dönüştürücü: ${LABN[u.lab]} →</a>`:''}</div>
   <div class="lbody">${u.s.map(s=>`<h3 class="sec-h">${s.h}</h3><p>${s.b}</p>${s.f?`<div class="formula">${s.f.map(x=>typeof x==='string'?`<span>${x}</span>`:`<span class="k">${x.k}</span>`).join('')}</div>`:''}
     ${(s.ex||[]).map(e=>`<div class="ex">${spk(e[0])}<span class="en">${e[0]}</span><span class="tr">${e[1]}</span></div>`).join('')}`).join('')}
    ${u.tip.length?`<div class="keybox"><h3>Dikkat! Sık yapılan hatalar</h3>${u.tip.map(t=>`<p><span class="wrong">${t[0]}</span> → <span class="rightc">${t[1]}</span><br><span class="small muted">${t[2]}</span></p>`).join('')}</div>`:''}</div>
   <h2 class="sec-h">Alıştırma ${S.un[n]?stars(S.un[n].s):''}</h2><div id="qz"></div>
   <div class="row" style="justify-content:space-between;margin-top:16px">${pv?`<a class="btn ghost" href="#unite/${pv.n}">← ${UL(pv.n)}</a>`:'<span></span>'}${nx?`<a class="btn ghost" href="#unite/${nx.n}">${UL(nx.n)} →</a>`:`<a class="btn ghost" href="#sinav">Sınava geç →</a>`}</div></article>`;
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
    z.innerHTML=`<div class="q" style="text-align:center"><div style="font-size:2rem">${stars(s)}</div><p class="big2">${QZ.ok}/${n} doğru</p><p class="muted">${s===3?'Mükemmel! Bu ünite tamam.':s===2?'Güzel. Üç yıldız için tekrar dene.':'Anlatımı bir kez daha okuyup yeniden dene.'}</p><div class="row" style="justify-content:center"><button class="btn" id="qAgain">Yeniden dene</button>${nx?`<a class="btn pri" href="#unite/${nx.n}">${UL(nx.n)} →</a>`:'<a class="btn pri" href="#sinav">Sınava gir →</a>'}</div></div>`;
    if(s===3)confetti();$('#qAgain').onclick=()=>{QZ.i=0;QZ.ok=0;QZ.items=shuffle(QZ.items);qShow();};return;
  }
  z.innerHTML=`<div class="q"><div class="prog"><i style="width:${QZ.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${QZ.i+1}/${n}</p><div id="qb"></div><div id="qn"></div></div>`;
  renderQ($('#qb'),QZ.items[QZ.i],ok=>{if(ok){QZ.ok++;addXP(3);}$('#qn').innerHTML=`<button class="btn pri sm" style="margin-top:8px">${QZ.i+1<n?'Sonraki soru':'Sonucu gör'}</button>`;const b=$('#qn button');b.onclick=()=>{QZ.i++;qShow();};b.focus();});
}

/* ---------- Parçacık Haritası ---------- */
let L={pt:'up',i:null,o:'the light'};
try{const o=JSON.parse(localStorage.getItem(KEY+'-lab')||'null');if(o)L=Object.assign(L,o);}catch(e){}
const PRON=new Set(['it','them','me','you','him','her','us']);
V.lab=a=>{setTimeout(labDraw,0);return `<div class="view"><h1>Parçacık Haritası</h1><p class="muted">Bir parçacık seç, phrasal verb’leri gör. Birine dokun: anlamı, örneği ve nesnenin cümledeki <b>yeri</b> (isim mi, zamir mi?) ortaya çıksın.</p>
 <div class="pills" id="lpt" style="margin:6px 0 14px">${PARTICLES.map(p=>`<button class="pill" data-pt="${p}">${p}</button>`).join('')}</div>
 <div class="calc"><div class="card" id="lin"></div><div class="card" id="lout"></div></div></div>`;};
function labDraw(){
  const z=$('#lin'),o=$('#lout');if(!z)return;try{localStorage.setItem(KEY+'-lab',JSON.stringify(L));}catch(e){}
  $$('#lpt .pill').forEach(b=>b.classList.toggle('on',b.dataset.pt===L.pt));
  const list=PV.map((p,i)=>[p,i]).filter(([p])=>p[1]===L.pt||(L.pt==='up'&&p[0]==='put up'));
  if(L.i===null||!list.some(([,i])=>i===L.i))L.i=list[0][1];
  z.innerHTML=`<h3 class="sec-h" style="margin-top:0">${L.pt.toUpperCase()} ile (${list.length})</h3><div class="pills">${list.map(([p,i])=>`<button class="pill ${i===L.i?'on':''}" data-i="${i}">${PVN(p)}</button>`).join('')}</div>`;
  const p=PV[L.i],obj=(L.o||'').trim(),isP=PRON.has(obj.toLowerCase());
  let pos='';
  if(p[4]==='s'){
    const ok1=`${p[0]} ${obj} ${p[1]}`,ok2=`${p[0]} ${p[1]} ${obj}`;
    pos=`<h3 class="sec-h">Nesne nereye?</h3><p class="small muted">Bu fiil <b>ayrılabilir</b>. Bir nesne yaz (isim ya da it/them/me…):</p><input class="inp" id="lo3" value="${esc(obj)}">
     ${obj?`<div class="ex">${spk(ok1)}<span class="en"><span class="rightc">✓ ${esc(ok1)}</span></span></div><div class="ex">${isP?'<span></span>':spk(ok2)}<span class="en">${isP?`<span class="wrong">✗ ${esc(ok2)}</span> <span class="small muted">— zamir araya girmeli</span>`:`<span class="rightc">✓ ${esc(ok2)}</span>`}</span></div>`:''}`;
  }else if(p[4]==='p')pos=`<h3 class="sec-h">Nesne nereye?</h3><p class="small">Bu fiil bir edatla nesne alır ve <b>ayrılmaz</b>: <b>${esc(p[3])}</b></p>`;
  else pos=`<h3 class="sec-h">Nesne</h3><p class="small">Genellikle <b>nesnesiz</b> kullanılır (ya da ayrılmaz).</p>`;
  o.innerHTML=`<p class="eyebrow">phrasal verb</p><p class="conj">${PVN(p)} ${spk(PVN(p))}</p><p class="big2">${p[2]}</p><div class="ex">${spk(p[3])}<span class="en"><i>${esc(p[3])}</i></span></div>${pos}
   <p style="margin-top:10px"><a class="btn sm" href="#unite/${VOCAB.find(v=>v.k===L.pt).u}">${UL(VOCAB.find(v=>v.k===L.pt).u)} anlatımı →</a></p>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('#lpt .pill,#lin .pill');if(!b||!$('#lout'))return;if(b.dataset.pt){L.pt=b.dataset.pt;L.i=null;}if(b.dataset.i)L.i=+b.dataset.i;labDraw();});
document.addEventListener('input',e=>{if(e.target.id!=='lo3')return;L.o=e.target.value;const pos=e.target.selectionStart;labDraw();const i=$('#lo3');if(i){i.focus();i.setSelectionRange(pos,pos);}});

/* ---------- Kelimeler ---------- */
let KT='grp',KC={i:0,list:null};
V.kelime=a=>{if(a)KT=a;setTimeout(kDraw,0);return `<div class="view"><h1>Kelimeler</h1><p class="muted">Ünitelerdeki fiil kalıpları ve kelime grupları. ▶ ile dinle, kartlarla ezberle; “biliyorum” dediklerin sayılır.</p>
 <div class="tg" id="kt"><button data-k="grp">Gruplar</button><button data-k="fc">Kartlar</button></div><div id="kb" style="margin-top:14px"></div></div>`;};
const ALLW=()=>VOCAB.flatMap(g=>g.w.map(w=>({en:w[0],say:w[0],tr:w[1],ex:w[2],id:'w:'+w[0]})));
function kDraw(){
  const z=$('#kb');if(!z)return;$$('#kt button').forEach(b=>b.classList.toggle('on',b.dataset.k===KT));
  if(KT==='grp'){
    z.innerHTML=VOCAB.map(g=>`<div class="card" style="margin-bottom:12px"><div class="row" style="justify-content:space-between"><h3 class="sec-h" style="margin:0">${g.t}</h3><a class="small" href="#unite/${g.u}">${UL(g.u)}</a></div>${g.w.map(w=>`<div class="ex">${spk(w[0])}<span class="en"><b>${w[0]}</b> — ${w[1]}</span><span class="tr"><i>${w[2]}</i> ${spk(w[2])}</span></div>`).join('')}</div>`).join('');
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
const GAMES=[['pfill','🧩','Parçacığı bul','Cümledeki eksik parçacığı seç: in, out, on, off, up, down, away, back.'],['pmean','📖','Anlamı ne?','Phrasal verb’ün Türkçe anlamını bul.'],['pobj','🎯','Nesne nereye?','turn it off mu, turn off it mi? Doğru sırayı seç.'],['dy','✅','Doğru mu, yanlış mı?','Cümle doğru mu? Yanlışsa düzeltmesini gör.'],['order','🧱','Cümle Kur','Karışık kelimeleri doğru sıraya diz.'],['match','🔗','Eşleştir','Phrasal verb’ü Türkçesiyle buluştur.']];

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
  $('#game').innerHTML=`<div class="card"><p class="eyebrow">${q}</p><p class="big2">${it[0].includes('___')?it[0].replace('___','<b style="color:var(--gold)">____</b>'):it[0]} ${spk(it[0].replace('___',ans(it)==='–'?'':ans(it)))}</p><div class="opts">${(opts||(it[2]&&it[2].ing?shuffle([[it[2].ing,it[2].ing],[it[2].ed,it[2].ed]]):shuffle(it[2].map(x=>[x,x])))).map(o=>`<button class="opt" data-o="${o[0]}">${o[1]}</button>`).join('')}</div><div id="gw"></div></div>`;
  $$('#game .opt').forEach(b=>b.onclick=()=>{const ok=b.dataset.o===ans(it);res(ok);$$('#game .opt').forEach(x=>{x.disabled=true;if(x.dataset.o===ans(it))x.classList.add('ok');});if(!ok)b.classList.add('no');
    $('#gw').innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${why(it)}</p>`;nextBtn($('#gw'),next);});
});
const blankPV=p=>{const re=new RegExp('\\b'+p[1]+'\\b','i');return re.test(p[3])?p[3].replace(re,'___'):null;};
G.pfill=()=>choiceGame('pfill',sample(PV.filter(p=>blankPV(p)&&p[0]!=='put up'),12).map(p=>[blankPV(p),p[1],shuffle([p[1],...sample(PARTICLES.filter(x=>x!==p[1]),3)]),p]),'Hangi parçacık?',null,it=>it[1],it=>`<b>${PVN(it[3])}</b> = ${it[3][2]}`);
G.pmean=()=>choiceGame('pmean',sample(PV,12).map(p=>[PVN(p)+' — ?',p[2],shuffle([p[2],...sample(PV.filter(x=>x[2]!==p[2]),3).map(x=>x[2])]),p]),'Bu phrasal verb ne demek?',null,it=>it[1],it=>`<i>${it[3][3]}</i>`);
G.pobj=()=>choiceGame('pobj',sample(PV.filter(p=>p[4]==='s'),12).map(p=>{const pr=sample(['it','them'],1)[0],ok=`${p[0]} ${pr} ${p[1]}`,bad=`${p[0]} ${p[1]} ${pr}`;return [`(${p[2]}) — zamir: ${pr}`,ok,shuffle([ok,bad]),p];}),'Doğru sıra hangisi?',null,it=>it[1],it=>'Zamir (it/them…) fiil ile parçacığın <b>arasına</b> girer.');
/* ---------- Sınav ---------- */
let EX=null;
V.sinav=()=>`<div class="view"><h1>Sınav</h1><p class="muted">${UNITS.length} ünitenin tamamından rastgele 25 soru: seçmeli, boşluk doldurma ve cümle kurma. Sonunda yanlışlarını görürsün.</p><div id="ex" class="q" style="text-align:center"><p class="big2">Rekorun: ${S.best.sinav} / 100</p><button class="btn pri" id="exGo">Sınavı başlat</button></div></div>`;
function exStart(){EX={i:0,ok:0,wr:[],items:sample(UNITS.flatMap(u=>u.q.map(q=>[q,u.n])),25)};exShow();}
function exShow(){
  const z=$('#ex'),n=EX.items.length;z.style.textAlign='start';
  if(EX.i>=n){const sc=Math.round(EX.ok/n*100),rec=sc>S.best.sinav;if(rec){S.best.sinav=sc;save();}addXP(EX.ok);if(sc>=80)confetti();
    z.innerHTML=`<div style="text-align:center"><p class="big2" style="font-size:2rem">${sc}</p><p>${EX.ok}/${n} doğru · ${sc>=90?'Grammar Master!':sc>=70?'Çok iyi.':sc>=50?'Fena değil; zayıf üniteleri tekrar et.':'Ünitelere geri dönmekte fayda var.'} ${rec?'<b>Yeni rekor!</b>':''}</p><button class="btn pri" id="exGo">Yeni sınav</button></div>
     ${EX.wr.length?`<h3 class="sec-h">Tekrar etmen gerekenler</h3>${EX.wr.map(w=>`<div class="keybox"><b>${w.q}</b><p class="why">Doğrusu: <b>${w.a}</b> · <a href="#unite/${w.u}">${UL(w.u)}</a></p></div>`).join('')}`:''}`;return;}
  const [q,u]=EX.items[EX.i];
  z.innerHTML=`<div class="prog"><i style="width:${EX.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${EX.i+1}/${n} · Doğru ${EX.ok} · ${UL(u)}</p><div id="eb"></div><div id="en"></div>`;
  renderQ($('#eb'),q,ok=>{if(ok)EX.ok++;else EX.wr.push({q:q[0]==='o'?q[3]:q[1],a:q[0]==='c'?q[2][q[3]]:q[0]==='f'?q[2][0]:q[2],u});
    $('#en').innerHTML='<button class="btn pri sm" style="margin-top:8px">Sonraki →</button>';const b=$('#en button');b.onclick=()=>{EX.i++;exShow();};b.focus();});
}
document.addEventListener('click',e=>{if(e.target.id==='exGo')exStart();});

/* ---------- Hakkında ---------- */
V.hakkinda=()=>`<div class="view card"><h1>Program hakkında</h1>
 <p><b>Parçacık Atlası</b>, İngilizcedeki phrasal verb’leri (in, out, on, off, up, down, away, back) ve dilbilgisi özetlerini Türkçe açıklamalarla adım adım öğreten, internetsiz çalışan tek dosyalık bir programdır. Kardeş programlar: <b>Zaman Makinesi</b> (Units 1–25), <b>Yapı Ustası</b> (Units 26–97) ve <b>Renkli Cümleler</b> (Units 98–136).</p>
 <h3 class="sec-h">İçerik</h3><ul>${PARTS.map(p=>`<li><b>${p.t}</b> (${UL(p.u[0])}–${UL(p.u[p.u.length-1])}): ${p.u.map(n=>UN[n].t).join(', ')}</li>`).join('')}</ul>
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
