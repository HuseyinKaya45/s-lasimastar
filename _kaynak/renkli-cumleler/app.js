/* ===== Renkli Cümleler — uygulama ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);

/* ---------- İngilizce ses (cihazın İngilizce sesi; internet gerekmez) ---------- */
let EN_V=null;
function enVoice(){if(!('speechSynthesis' in window))return null;try{const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang)),loc=vs.filter(v=>v.localService!==false);/* internetsiz çalışan (cihazdaki) sesler önce */return loc.find(v=>/^en[-_](GB|US)/i.test(v.lang))||loc[0]||vs.find(v=>/^en[-_](GB|US)/i.test(v.lang))||vs[0]||null;}catch(e){return null;}}
if('speechSynthesis' in window){try{speechSynthesis.getVoices();speechSynthesis.addEventListener('voiceschanged',()=>{EN_V=enVoice();});}catch(e){}}
function say(t){
  const d=SES_AUDIO[sesKey(t)];if(d){try{sesStop();SES_A=new Audio('data:audio/mpeg;base64,'+d);const pr=SES_A.play();if(pr&&pr.catch)pr.catch(()=>{});return;}catch(e){}}
  const v=EN_V||enVoice();if(!v){toast('Cihazda İngilizce ses bulunamadı.');return;}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/[’‘]/g,"'"));u.lang=v.lang;u.voice=v;u.rate=.92;speechSynthesis.speak(u);}catch(e){}
}
const spk=t=>`<button class="spk" data-say="${esc(t)}" aria-label="Dinle" title="Dinle">▶</button>`;

/* ---------- durum ---------- */
const KEY='renkli-cumleler-v1';
const FRESH=()=>({v:1,xp:0,un:{},best:{ed:0,link:0,time:0,prep:0,dy:0,order:0,match:0,sinav:0},known:{},day:'',streak:0});
let S=FRESH();
try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)S=Object.assign(FRESH(),o,{best:Object.assign(FRESH().best,o.best||{})});}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
(function(){const d=new Date().toISOString().slice(0,10);if(S.day!==d){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();}})();
const LEVELS=[[0,'Starter'],[60,'Elementary'],[160,'Pre-intermediate'],[320,'Intermediate'],[520,'Upper-intermediate'],[800,'Advanced'],[1000,'Word Artist']];
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
 ['🌱','İlk ünite',()=>uDone()>=1],['🎨','Sıfat ustası',()=>partDone(0)],['📈','Karşılaştırma',()=>partDone(1)],['🧭','Kelime sırası',()=>partDone(2)],['🌉','Bağlaçlar',()=>partDone(3)],['⏰','Zaman edatları',()=>partDone(4)],['📍','Yer edatları',()=>partDone(5)],['🧲','Edatlı kalıplar',()=>partDone(6)],
 ['🏁',UNITS.length+' ünite',()=>uDone()===UNITS.length],['⭐',UNITS.length*3+' yıldız',()=>starSum()===UNITS.length*3],['😮','-ing/-ed ustası',()=>S.best.ed>=10],['🔗','Bağlaç avcısı',()=>S.best.link>=10],['🎓','Sınav 90+',()=>S.best.sinav>=90],['🔥','3 gün seri',()=>S.streak>=3]
];
const blocksSVG=()=>`<svg viewBox="0 0 300 260" role="img" aria-label="Renk paleti"><path d="M150 20c-75 0-130 50-130 110 0 50 40 80 85 80 22 0 25-20 15-32-10-14 0-30 20-30h35c45 0 75-25 75-60C250 60 210 20 150 20z" fill="var(--panel2)" stroke="var(--gold)" stroke-width="5"/>
 <g id="bl">${[[80,85,'var(--p2)','big'],[140,60,'var(--p6)','-er'],[200,85,'var(--p3)','-ly'],[210,145,'var(--p8)','as'],[95,150,'var(--p1)','in']].map((b,i)=>`<g class="blk" style="transition:transform .6s ${i*0.12}s"><circle cx="${b[0]}" cy="${b[1]}" r="26" fill="${b[2]}"/><text x="${b[0]}" y="${b[1]+6}" text-anchor="middle" font-size="16" font-weight="700" fill="#111">${b[3]}</text></g>`).join('')}</g></svg>`;
let blT;function spin(){clearInterval(blT);const g=$$('#bl .blk');if(!g.length)return;let up=true;const go=()=>{g.forEach((b,i)=>b.style.transform=up?`translateY(${-6-i%3*4}px)`:'translateY(0)');up=!up;};go();blT=setInterval(()=>{if(!document.body.contains(g[0]))return clearInterval(blT);go();},1400);}

/* ---------- görünümler ---------- */
const V={};
V.home=()=>{
  const nx=UNITS.find(u=>!S.un[u.n])||UNITS[0];
  return `<section class="hero view"><div><p class="eyebrow">English Grammar · Units ${FIRST}–${LAST}</p><h1>Renkli Cümleler</h1>
   <p class="big2" style="color:var(--gold)">Adjectives · Adverbs · Comparison · Word order · Linking words · Prepositions</p>
   <p class="muted">Cümlelerine renk kat: sıfat ve zarflar, karşılaştırma, kelime sırası, bağlaçlar ve edatlar. Her ünitede Türkçe anlatım, sesli örnekler, sık yapılan hatalar ve alıştırmalar; Sıfat Makinesi’nde biçimleri üret, oyunlarla pekiştir.</p>
   <div class="row" style="margin-top:14px"><a class="btn pri" href="#unite/${nx.n}">${uDone()?'Kaldığın yerden devam':'Unit '+FIRST+'’e başla'} →</a><a class="btn" href="#lab">Sıfat Makinesi</a></div>
   <div class="stat"><div><b>${uDone()}/${UNITS.length}</b><span>ünite</span></div><div><b>${starSum()}</b><span>yıldız</span></div><div><b>${S.xp}</b><span>puan</span></div><div><b>${Object.keys(S.known).length}</b><span>bilinen kelime</span></div><div><b>${S.streak}</b><span>gün seri</span></div></div></div>
   <div class="scalebox">${blocksSVG()}</div></section>
  <h2 class="sec-h">Bölümler</h2>
  <div class="grid g3">${PARTS.map(p=>{const d=p.u.filter(n=>S.un[n]).length;return `<a class="gcard" href="#unite/${p.u.find(n=>!S.un[n])||p.u[0]}"><b style="color:${p.c}">${p.p}. ${p.t}</b><p class="small muted">${p.en} · Unit ${p.u[0]}–${p.u[p.u.length-1]}</p><div class="prog" style="margin-top:8px"><i style="width:${d/p.u.length*100}%;background:${p.c}"></i></div><p class="small muted">${d}/${p.u.length} ünite</p></a>`;}).join('')}</div>
  <h2 class="sec-h">Rozetler</h2><div class="bgrid">${BADGES.map(b=>`<div><span class="badge ${b[2]()?'on':''}">${b[2]()?b[0]:'🔒'}</span><div class="small">${b[1]}</div></div>`).join('')}</div>`;
};
V.yol=()=>`<div class="view"><h1>Üniteler</h1><p class="muted">Her ünitede anlatım, örnekler, sık yapılan hatalar ve 4–6 soruluk alıştırma var. Alıştırmayı tam doğru bitirirsen üç yıldız.</p>
 ${PARTS.map(p=>`<div class="part"><b style="color:${p.c}">${p.p}. ${p.t}</b><span class="muted">${p.en}</span></div><div class="path">${p.u.map(n=>{const u=UN[n],r=S.un[n];return `<a class="stop ${r?'done':''}" href="#unite/${n}" style="--c:${p.c}"><span class="n">${r?'✓':n}</span><span class="t"><b>Unit ${n} · ${u.t} <span class="muted">(${u.f})</span></b><span>${u.tr}</span></span>${stars(r?r.s:0)}</a>`;}).join('')}</div>`).join('')}</div>`;
let QZ=null;
const LABN={adj:'Sıfat biçimleri',ed:'-ing / -ed sıfatlar'};
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

const qSay=q=>q[0]==='c'?q[1].replace('___',q[2][q[3]]):q[0]==='f'?q[1].replace(/___/,q[2][0]).replace(/\s*\([^)]*\)/,''):q[2];
function renderQ(box,q,cb){
  const t=q[0];
  if(t==='c'){
    const o=shuffle(q[2].map((x,j)=>({x,c:j===q[3]})));
    box.innerHTML=`<p class="qt">${q[1]}</p><div class="opts">${o.map((x,j)=>`<button class="opt" data-j="${j}">${x.x}</button>`).join('')}</div><div class="qw"></div>`;
    $$('.opt',box).forEach(b=>b.onclick=()=>{const ok=o[+b.dataset.j].c;$$('.opt',box).forEach((x,j)=>{x.disabled=true;if(o[j].c)x.classList.add('ok');});if(!ok)b.classList.add('no');
      const full=qSay(q);$('.qw',box).innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${q[4]} ${spk(full)}</p>`;cb(ok);});
  }else if(t==='f'){
    box.innerHTML=`<p class="qt">${q[1].replace('___','<b style="color:var(--gold)">_____</b>')}</p><div class="fillin"><input class="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Cevabını yaz…"><button class="btn pri">Kontrol</button></div><div class="qw"></div>`;
    const inp=$('input',box),b=$('button',box);setTimeout(()=>inp.focus(),30);
    const go=()=>{if(!inp.value.trim())return;const ok=matches(inp.value,q[2]);inp.disabled=b.disabled=true;inp.style.borderColor=ok?'var(--good)':'var(--bad)';
      const full=qSay(q);$('.qw',box).innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> Cevap: <b>${q[2][0]}</b> — ${q[3]} ${spk(full)}</p>`;cb(ok);};
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

/* ---------- Sıfat Makinesi ---------- */
const ADJ_EX=['cheap','big','easy','good','bad','beautiful','careful','fast','hot','happy','interesting','far','quiet','gentle','friendly','hard'];
let L={m:'adj',a:'happy',v:'bore',x:'my sister',y:'my brother'};
try{const o=JSON.parse(localStorage.getItem(KEY+'-lab')||'null');if(o)L=Object.assign(L,o);}catch(e){}
V.lab=a=>{if(a&&LABN[a])L.m=a;setTimeout(labDraw,0);return `<div class="view"><h1>Sıfat Makinesi</h1><p class="muted">Bir sıfat yaz: karşılaştırma, en üstünlük ve zarf biçimlerini kurallarıyla görsün, örnek cümleler kursun. İkinci kipte bir fiilden <b>-ing / -ed</b> sıfatlarını üret.</p>
 <div class="tg" id="lm" style="margin:6px 0 14px">${Object.entries(LABN).map(([k,v])=>`<button data-m="${k}">${v}</button>`).join('')}</div>
 <div class="calc"><div class="card" id="lin"></div><div class="card" id="lout"></div></div></div>`;};
function labIn(){
  const z=$('#lin');if(!z)return;
  z.innerHTML=L.m==='adj'?`<h3 class="sec-h" style="margin-top:0">Sıfat</h3><input class="inp" id="la" value="${esc(L.a)}" autocapitalize="off" spellcheck="false"><div class="pills" style="margin-top:8px">${ADJ_EX.map(a=>`<button class="pill" data-a="${a}">${a}</button>`).join('')}</div>
   <h3 class="sec-h">Karşılaştırılacaklar</h3><div class="row"><input class="inp" id="lx" value="${esc(L.x)}" style="flex:1"><input class="inp" id="ly" value="${esc(L.y)}" style="flex:1"></div>`
  :`<h3 class="sec-h" style="margin-top:0">Duygu fiili</h3><input class="inp" id="lv2" value="${esc(L.v)}" autocapitalize="off" spellcheck="false"><div class="pills" style="margin-top:8px">${Object.keys(EDV).map(v=>`<button class="pill" data-v="${v}">${v}</button>`).join('')}</div>`;
}
function labDraw(){
  const o=$('#lout');if(!o)return;try{localStorage.setItem(KEY+'-lab',JSON.stringify(L));}catch(e){}
  $$('#lm button').forEach(b=>b.classList.toggle('on',b.dataset.m===L.m));if(!$('#la')&&!$('#lv2')||($('#la')&&L.m!=='adj')||($('#lv2')&&L.m!=='ed'))labIn();
  $$('#lin .pill').forEach(b=>b.classList.toggle('on',b.dataset.a===L.a||b.dataset.v===L.v));
  const row=(lab,txt,note)=>`<div class="keybox"><p class="eyebrow">${lab}</p><p class="conj" style="font-size:1.2rem">${esc(txt)} ${txt&&txt!=='—'?spk(txt):''}</p>${note?`<p class="small muted">${note}</p>`:''}</div>`;
  if(L.m==='adj'){
    const f=adjForms(L.a||'');if(!f){o.innerHTML='<p class="muted">Bir İngilizce sıfat yaz (ör. cheap, beautiful).</p>';return;}
    const X=(L.x||'A').trim(),Y=(L.y||'B').trim(),Xc=X[0].toUpperCase()+X.slice(1),a=L.a.trim().toLowerCase(),be=/^(i|you|we|they)$/i.test(X)||/s$/.test(X)&&!/ss$/.test(X)?'are':'is';
    o.innerHTML=row('Karşılaştırma (comparative)',f.cmp,f.rule)+row('En üstünlük (superlative)',f.sup,'Önünde the: '+f.sup+'.')+row('Zarf (adverb)',f.adv,f.adr)
     +`<h3 class="sec-h">Örnek cümleler</h3>${[`${Xc} ${be} ${f.cmp} than ${Y}.`,`${Xc} ${be} as ${a} as ${Y}.`,`${Xc} ${be} not as ${a} as ${Y}.`,`${Xc} ${be} much ${f.cmp} than ${Y}.`,`${Xc} ${be} ${f.sup} in the family.`].map(t=>`<div class="ex">${spk(t)}<span class="en">${esc(t)}</span></div>`).join('')}`;
  }else{
    const f=edForms(L.v||'');if(!f){o.innerHTML='<p class="muted">Bir fiil yaz (ör. bore, interest).</p>';return;}
    const tr=EDV[L.v.trim().toLowerCase()];
    o.innerHTML=row('-ing (neden olan: nasıl bir şey?)',f.ing,'Şey/kişinin özelliği: '+(tr?'“'+tr+'” etkisi yapan':''))+row('-ed (hisseden: ne hissediyor?)',f.ed,'Kişinin duygusu.')
     +`<h3 class="sec-h">Örnek cümleler</h3>${[`The film was ${f.ing}.`,`I was ${f.ed}.`,`It was a really ${f.ing} day.`,`Why do you look so ${f.ed}?`].map(t=>`<div class="ex">${spk(t)}<span class="en">${esc(t)}</span></div>`).join('')}`;
  }
}
document.addEventListener('click',e=>{
  const b=e.target.closest('#lm button,#lin .pill');if(!b||!$('#lout'))return;
  if(b.dataset.m)L.m=b.dataset.m;if(b.dataset.a){L.a=b.dataset.a;$('#la').value=L.a;}if(b.dataset.v){L.v=b.dataset.v;$('#lv2').value=L.v;}
  if(b.dataset.m)labIn();labDraw();
});
document.addEventListener('input',e=>{const m={la:'a',lv2:'v',lx:'x',ly:'y'}[e.target.id];if(!m)return;L[m]=e.target.value;labDraw();});

/* ---------- Kelimeler ---------- */
let KT='grp',KC={i:0,list:null};
V.kelime=a=>{if(a)KT=a;setTimeout(kDraw,0);return `<div class="view"><h1>Kelimeler</h1><p class="muted">Ünitelerdeki fiil kalıpları ve kelime grupları. ▶ ile dinle, kartlarla ezberle; “biliyorum” dediklerin sayılır.</p>
 <div class="tg" id="kt"><button data-k="grp">Gruplar</button><button data-k="fc">Kartlar</button></div><div id="kb" style="margin-top:14px"></div></div>`;};
const ALLW=()=>VOCAB.flatMap(g=>g.w.map(w=>({en:w[0],say:w[0],tr:w[1],ex:w[2],id:'w:'+w[0]})));
function kDraw(){
  const z=$('#kb');if(!z)return;$$('#kt button').forEach(b=>b.classList.toggle('on',b.dataset.k===KT));
  if(KT==='grp'){
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
const GAMES=[['ed','😮','-ing mi, -ed mi?','boring mi bored mı? Doğru sıfatı seç.'],['link','🌉','Bağlaç seç','although, despite, unless, in case, as, like…'],['time','⏰','at / on / in','Zaman ifadesine doğru edatı koy.'],['prep','📍','Edat avcısı','in, on, at, to, of, for, with… Doğru edatı bul.'],['dy','✅','Doğru mu, yanlış mı?','Cümle doğru mu? Yanlışsa düzeltmesini gör.'],['order','🧱','Cümle Kur','Karışık kelimeleri doğru sıraya diz.'],['match','🔗','Eşleştir','İngilizce ifadeyi Türkçesiyle buluştur.']];

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
  $('#game').innerHTML=`<div class="card"><p class="eyebrow">${q}</p><p class="big2">${it[0].includes('___')?it[0].replace('___','<b style="color:var(--gold)">____</b>'):it[0]} </p><div class="opts">${(opts||(it[2]&&it[2].ing?shuffle([[it[2].ing,it[2].ing],[it[2].ed,it[2].ed]]):shuffle(it[2].map(x=>[x,x])))).map(o=>`<button class="opt" data-o="${o[0]}">${o[1]}</button>`).join('')}</div><div id="gw"></div></div>`;
  $$('#game .opt').forEach(b=>b.onclick=()=>{const ok=b.dataset.o===ans(it);res(ok);$$('#game .opt').forEach(x=>{x.disabled=true;if(x.dataset.o===ans(it))x.classList.add('ok');});if(!ok)b.classList.add('no');
    const st=cgSay(it,ans);$('#gw').innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${why(it)} ${st?spk(st):''}</p>`;nextBtn($('#gw'),next);});
});
const cgSay=(it,ans)=>it.say!==undefined?it.say:it[0].replace('___',ans(it)==='–'?'':ans(it)).replace(/\s+/g,' ').trim();
G.ed=()=>choiceGame('ed',sample(EDQ,12).map(x=>{const f=edForms(x[1]);return [x[0],x[2]==='ing'?f.ing:f.ed,f];}),'Hangisi?',null,it=>it[1],it=>it[1].endsWith('ing')?'Şeyin/durumun niteliği → -ing.':'Kişinin hissettiği → -ed.');
G.prep=()=>choiceGame('prep',sample(PREPQ,12),'Boşluğa hangi edat gelir?',null,it=>it[1],it=>it[3]);
G.link=()=>choiceGame('link',sample(LINKQ,12),'Boşluğa hangisi gelir?',null,it=>it[1],it=>it[3]);
G.time=()=>choiceGame('time',sample(TIMEQ,12).map(x=>['___ '+x[0],x[1]]),'Doğru edat?',[['at','at'],['on','on'],['in','in'],['–','– (edat yok)']],it=>it[1],it=>({at:'Saatler, kısa anlar, at night/the weekend → at.',on:'Günler ve tarihler → on.',in:'Ay, yıl, mevsim, günün bölümleri → in.','–':'this/next/last/every ile edat yok.'})[it[1]]);
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
 <p><b>Renkli Cümleler</b>, İngilizcede sıfat, zarf, karşılaştırma, kelime sırası, bağlaç ve zaman edatlarını Türkçe açıklamalarla adım adım öğreten, internetsiz çalışan tek dosyalık bir programdır. Kardeş programlar: <b>Zaman Makinesi</b> (Units 1–25) ve <b>Yapı Ustası</b> (Units 26–97).</p>
 <h3 class="sec-h">İçerik</h3><ul>${PARTS.map(p=>`<li><b>${p.t}</b> (Unit ${p.u[0]}–${p.u[p.u.length-1]}): ${p.u.map(n=>UN[n].t).join(', ')}</li>`).join('')}</ul>
 <p>Konu sırası <i>English Grammar in Use</i> (Units ${FIRST}–${LAST}) ile aynıdır; anlatımlar, örnek cümleler ve alıştırmalar bu program için özgün olarak yazılmıştır.</p>
 <p>▶ düğmeleri cihazınızdaki İngilizce sesi kullanır.</p>
 <h3 class="sec-h">İlerleme</h3><p>Puanlar, yıldızlar ve rekorlar bu tarayıcıda saklanır.</p><button class="btn" id="reset">İlerlememi sıfırla</button>
 <p class="tiny muted" style="margin-top:16px">Hüseyin KAYA</p></div>`;
document.addEventListener('click',e=>{if(e.target.id==='reset'&&confirm('Bütün ilerleme silinsin mi?')){S=FRESH();save();hud();toast('İlerleme sıfırlandı.');route();}});


/* ---------- gömülü ses listesi (ses_topla.mjs bunu okur) ---------- */
function SES_LISTE(){const a=new Set(),add=t=>{if(t&&/[a-z]/i.test(t))a.add(String(t).replace(/\s+/g,' ').trim());};
  UNITS.forEach(u=>{u.s.forEach(s=>(s.ex||[]).forEach(e=>add(e[0])));u.q.forEach(q=>add(qSay(q)));});
  VOCAB.forEach(g=>g.w.forEach(w=>{add(w[0]);add(w[2]);}));
  const fill=(t,x)=>t.replace('___',x==='–'?'':x);
  EDQ.forEach(x=>{const f=edForms(x[1]);add(fill(x[0],x[2]==='ing'?f.ing:f.ed));});LINKQ.forEach(x=>add(fill(x[0],x[1])));PREPQ.forEach(x=>add(fill(x[0],x[1])));TIMEQ.forEach(x=>add(fill('___ '+x[0],x[1])));
  return [...a];}

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
