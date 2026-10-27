/* ===== Terike Terazisi — uygulama ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);
const fmt=s=>String(s).replace(/‹(\d+)\/(\d+)›/g,'<span class="frac"><i>$1</i><u>$2</u></span>');
function speak(t){sesPlay(t,null,toast);}
const say=t=>`<button class="say" data-say="${esc(t)}" aria-label="Dinle">▶ dinle</button>`;
function SES_LISTE(){const a=[];PARTS.forEach(p=>a.push(p.ar));LESSONS.forEach(l=>{a.push(l.ar);l.qt.forEach(q=>a.push(q[0]));});TERMS.forEach(t=>a.push(t[1]));a.push('عِلْمُ الْفَرَائِضِ');return a;}

/* ---------- durum ---------- */
const KEY='terike-terazisi-v1';
const FRESH=()=>({v:1,xp:0,les:{},best:{pay:0,engel:0,kim:0,es:0,sinav:0},known:{},day:'',streak:0});
let S=FRESH();
try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)S=Object.assign(FRESH(),o,{best:Object.assign(FRESH().best,o.best||{})});}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
(function(){const d=new Date().toISOString().slice(0,10);if(S.day!==d){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();}})();

const LEVELS=[[0,'Tâlib'],[60,'Mübtedî'],[160,'Mütefakkih'],[320,'Fakîh'],[520,'Ferâizî'],[800,'Allâme']];
function lvl(){let i=0;LEVELS.forEach((l,j)=>{if(S.xp>=l[0])i=j;});const nx=LEVELS[i+1];return{i,name:LEVELS[i][1],pct:nx?(S.xp-LEVELS[i][0])/(nx[0]-LEVELS[i][0])*100:100};}
function hud(){const l=lvl();$('#lvlName').textContent=l.name;$('#lvlBar').style.width=l.pct+'%';$('#xp').textContent=S.xp;}
function addXP(n){const a=lvl().i;S.xp+=n;save();hud();if(lvl().i>a){toast('Yeni rütbe: '+lvl().name+' ✦');confetti();}}
let tT;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tT);tT=setTimeout(()=>t.hidden=true,2600);}
function confetti(){
  const cv=$('#cf'),x=cv.getContext('2d');cv.hidden=false;cv.width=innerWidth;cv.height=innerHeight;
  const cs=['#d4a63c','#14826f','#3a5fc0','#c2402e','#8f3fa6'],P=Array.from({length:120},()=>({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.4,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,r:3+Math.random()*4,c:cs[Math.floor(Math.random()*cs.length)],a:Math.random()*6}));
  let f=0;(function tick(){x.clearRect(0,0,cv.width,cv.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.a+=.1;x.fillStyle=p.c;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore();});if(++f<150)requestAnimationFrame(tick);else{x.clearRect(0,0,cv.width,cv.height);cv.hidden=true;}})();
}
/* tema */
(function(){let t=null;try{t=localStorage.getItem(KEY+'-tema');}catch(e){}if(t)document.documentElement.dataset.theme=t;
  $('#themeB').onclick=()=>{const cur=document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');const n=cur==='dark'?'light':'dark';document.documentElement.dataset.theme=n;try{localStorage.setItem(KEY+'-tema',n);}catch(e){}};})();

/* ---------- ortak ---------- */
const doneCount=()=>LESSONS.filter(l=>S.les[l.id]).length;
const starSum=()=>LESSONS.reduce((a,l)=>a+((S.les[l.id]||{}).s||0),0);
const stars=n=>`<span class="stars" aria-label="${n} yıldız">${'★'.repeat(n)}<span class="off">${'★'.repeat(3-n)}</span></span>`;
const partOf=p=>PARTS.find(x=>x.p===p);
const BADGES=[
 ['🌱','İlk durak',()=>doneCount()>=1],
 ['📜','Deliller tamam',()=>LESSONS.filter(l=>l.p===2).every(l=>S.les[l.id])],
 ['🧱','Rükün ve sebep',()=>LESSONS.filter(l=>l.p===3).every(l=>S.les[l.id])],
 ['🚧','Engel bilgini',()=>LESSONS.filter(l=>l.p===4).every(l=>S.les[l.id])],
 ['🏁','Bütün yol',()=>doneCount()===LESSONS.length],
 ['⭐','39 yıldız',()=>starSum()===LESSONS.length*3],
 ['⚖️','Pay avcısı (10)',()=>S.best.pay>=10],
 ['🛡️','Engel ustası',()=>S.best.engel>=10],
 ['🎓','Sınav 90+',()=>S.best.sinav>=90],
 ['🔥','3 gün seri',()=>S.streak>=3]
];
const scaleSVG=()=>`<svg viewBox="0 0 400 292" role="img" aria-label="Terazi">
 <defs><linearGradient id="gp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--gold)"/><stop offset="1" stop-color="var(--p1)"/></linearGradient></defs>
 <rect x="150" y="246" width="100" height="12" rx="6" fill="var(--line)"/><rect x="194" y="70" width="12" height="180" rx="5" fill="url(#gp)"/>
 <g class="beam" id="beam"><rect x="40" y="64" width="320" height="10" rx="5" fill="url(#gp)"/>
  <g id="panL"><path d="M60 74 30 160M60 74 90 160" stroke="var(--muted)" stroke-width="1.5"/><path d="M18 160h84a42 20 0 0 1-84 0z" fill="var(--p2)"/><text x="60" y="152" text-anchor="middle" font-family="var(--f-ar)" font-size="20" fill="var(--ink)">فَرَائِض</text></g>
  <g id="panR"><path d="M340 74 310 160M340 74 370 160" stroke="var(--muted)" stroke-width="1.5"/><path d="M298 160h84a42 20 0 0 1-84 0z" fill="var(--p3)"/><text x="340" y="152" text-anchor="middle" font-family="var(--f-ar)" font-size="20" fill="var(--ink)">عَصَبَة</text></g>
 </g><circle cx="200" cy="66" r="12" fill="var(--gold)"/><text x="200" y="286" text-anchor="middle" font-family="var(--f-ar)" font-size="22" fill="var(--gold)">تَرِكَة</text></svg>`;
let beamT;function swing(){clearInterval(beamT);let s=1;const b=$('#beam');if(!b)return;const go=()=>{const a=s*6;b.style.transform=`rotate(${a}deg)`;['#panL','#panR'].forEach(id=>{const p=$(id);const cx=id==='#panL'?60:340;p.style.transformOrigin=cx+'px 74px';p.style.transform=`rotate(${-a}deg)`;p.style.transition='transform 1s cubic-bezier(.5,1.6,.4,1)';});s=s===1?-1:s===-1?0:1;};go();beamT=setInterval(()=>{if(!document.body.contains(b))return clearInterval(beamT);go();},1600);}

/* ---------- görünümler ---------- */
const V={};
V.home=()=>{
  const nxt=LESSONS.find(l=>!S.les[l.id])||LESSONS[0];
  return `<section class="hero view">
   <div><p class="eyebrow">Adım adım · genel hatlarıyla</p>
    <h1>İslâm Miras Hukuku</h1><div class="kufi">عِلْمُ الْفَرَائِضِ ${say('عِلْمُ الْفَرَائِضِ')}</div>
    <p class="muted">Kitap, Sünnet ve İcmâ’ya dayanan paylar; mirasın rükünleri, sebepleri, şartları ve engelleri. On üç durakta öğren, Pay Masası’nda hesapla, oyunlarla pekiştir.</p>
    <div class="row" style="margin-top:14px"><a class="btn pri" href="#ders/${nxt.id}">${doneCount()?'Kaldığın yerden devam':'İlk durağa başla'} →</a><a class="btn" href="#masa">Pay Masası’nı aç</a></div>
    <div class="stat"><div><b>${doneCount()}/${LESSONS.length}</b><span>durak</span></div><div><b>${starSum()}</b><span>yıldız</span></div><div><b>${S.xp}</b><span>puan</span></div><div><b>${S.streak}</b><span>gün seri</span></div><div><b>${S.best.sinav}</b><span>sınav rekoru</span></div></div>
   </div><div class="scalebox">${scaleSVG()}</div></section>
  <h2 class="sec-h">Mirasın yolculuğu</h2>
  <div class="grid g3">${[
   ['1','Mûris vefat eder','Hakîkî, hükmî veya takdîrî ölüm (şart 1).','d10'],
   ['2','Vâris hayattadır','Ölüm anında hayatta; cenîn sağ doğarsa (şart 2).','d10'],
   ['3','Engel yok mu?','Öldürme, din farkı, tebealık farkı, kölelik (şart 3).','d11'],
   ['4','Borç ve vasiyet','Paylar borç ödenip vasiyet yerine getirildikten sonra verilir.','d4'],
   ['5','Farz sahipleri','Ashâbü’l-ferâiz paylarını alır: ‹1/2› ‹1/4› ‹1/8› ‹2/3› ‹1/3› ‹1/6›.','d4'],
   ['6','Kalan asabeye','„Kalan, en yakın erkek hısımındır”; yoksa zevi’l-erhâm.','d9']
  ].map(x=>`<a class="gcard" href="#ders/${x[3]}"><div class="ic"><b>${x[0]}</b></div><b>${x[1]}</b><p class="small muted">${fmt(x[2])}</p></a>`).join('')}</div>
  <h2 class="sec-h">Kısımlar</h2>
  <div class="grid g2">${PARTS.map(p=>{const ls=LESSONS.filter(l=>l.p===p.p),d=ls.filter(l=>S.les[l.id]).length;return `<a class="gcard" href="#yol" style="--c:${p.c}"><div class="row" style="justify-content:space-between"><b>${p.p}. ${p.t}</b><span class="ar muted">${p.ar}</span></div><div class="prog" style="margin-top:10px"><i style="width:${d/ls.length*100}%;background:${p.c}"></i></div><p class="small muted">${d}/${ls.length} durak</p></a>`;}).join('')}</div>
  <h2 class="sec-h">Rozetler</h2>
  <div class="bgrid">${BADGES.map(b=>`<div><span class="badge ${b[2]()?'on':''}">${b[2]()?b[0]:'🔒'}</span><div class="small">${b[1]}</div></div>`).join('')}</div>`;
};
V.yol=()=>`<div class="view"><h1>Yol Haritası</h1><p class="muted">Her durakta kısa bir anlatım, âyet ve hadis metinleri, akılda kalacaklar ve bir alıştırma var. Alıştırmada her doğru cevap puan kazandırır; hepsini bilirsen üç yıldız.</p>
 ${PARTS.map(p=>`<div class="part" style="--c:${p.c}"><b style="color:${p.c}">${p.p}. ${p.t}</b><span class="ar">${p.ar}</span></div>
 <div class="path">${LESSONS.filter(l=>l.p===p.p).map(l=>{const i=LESSONS.indexOf(l)+1,r=S.les[l.id];return `<a class="stop ${r?'done':''}" href="#ders/${l.id}" style="--c:${p.c}"><span class="n">${r?'✓':i}</span><span class="t"><b>${l.t}</b><span>${l.sub}</span></span>${stars(r?r.s:0)}</a>`;}).join('')}</div>`).join('')}</div>`;

let QZ=null;
V.ders=id=>{
  const l=LESSONS.find(x=>x.id===id)||LESSONS[0],i=LESSONS.indexOf(l),p=partOf(l.p),pv=LESSONS[i-1],nx=LESSONS[i+1];
  QZ={l,i:0,ok:0,items:shuffle(l.q).map(q=>{const o=shuffle(q[1].map((t,j)=>({t,c:j===q[2]})));return{q:q[0],o,w:q[3]};})};
  setTimeout(qShow,0);
  return `<article class="card view" style="--c:${p.c}">
   <div class="lhead"><div><p class="eyebrow" style="color:${p.c}">Durak ${i+1}/${LESSONS.length} · ${p.t}</p><h1>${l.t}</h1><p class="muted">${l.sub}</p></div>
    <div class="ar" style="font-size:1.8rem;color:${p.c}">${l.ar} ${say(l.ar)}</div></div>
   <div class="lbody">${fmt(l.b)}
    ${l.qt.map(q=>`<blockquote class="quote"><span class="ar">${q[0]} ${say(q[0])}</span><span class="tr">“${q[1]}”</span><span class="src">${q[2]}</span></blockquote>`).join('')}
    <div class="keybox"><h3>Akılda kalsın</h3><ul>${l.key.map(k=>`<li>${fmt(k)}</li>`).join('')}</ul></div>
   </div>
   <h2 class="sec-h">Alıştırma ${S.les[l.id]?stars(S.les[l.id].s):''}</h2><div id="qz"></div>
   <div class="row" style="justify-content:space-between;margin-top:16px">${pv?`<a class="btn ghost" href="#ders/${pv.id}">← ${pv.t}</a>`:'<span></span>'}${nx?`<a class="btn ghost" href="#ders/${nx.id}">${nx.t} →</a>`:`<a class="btn ghost" href="#sinav">Sınava geç →</a>`}</div>
  </article>`;
};
function qShow(){
  const z=$('#qz');if(!z||!QZ)return;const n=QZ.items.length;
  if(QZ.i>=n){
    const s=QZ.ok===n?3:QZ.ok>=Math.ceil(n*.7)?2:1,old=S.les[QZ.l.id];
    if(!old||s>old.s){S.les[QZ.l.id]={s};}save();
    if(!old)addXP(15);
    z.innerHTML=`<div class="q" style="text-align:center"><div style="font-size:2rem">${stars(s)}</div><p class="big2">${QZ.ok}/${n} doğru</p><p class="muted">${s===3?'Mükemmel! Bu durak tamam.':s===2?'Güzel. Üç yıldız için bir daha dene.':'Metni bir kez daha okuyup yeniden dene.'}</p><div class="row" style="justify-content:center"><button class="btn" id="qAgain">Yeniden dene</button>${LESSONS[LESSONS.indexOf(QZ.l)+1]?`<a class="btn pri" href="#ders/${LESSONS[LESSONS.indexOf(QZ.l)+1].id}">Sonraki durak →</a>`:'<a class="btn pri" href="#sinav">Sınava gir →</a>'}</div></div>`;
    if(s===3)confetti();
    $('#qAgain').onclick=()=>{QZ.i=0;QZ.ok=0;QZ.items=shuffle(QZ.items).map(it=>({...it,o:shuffle(it.o)}));qShow();};
    return;
  }
  const it=QZ.items[QZ.i];
  z.innerHTML=`<div class="q"><div class="prog"><i style="width:${QZ.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${QZ.i+1}/${n}</p><p class="qt">${fmt(it.q)}</p><div class="opts">${it.o.map((o,j)=>`<button class="opt" data-j="${j}">${fmt(o.t)}</button>`).join('')}</div><div id="qw"></div></div>`;
  $$('.opt',z).forEach(b=>b.onclick=()=>{
    const o=it.o[+b.dataset.j];$$('.opt',z).forEach((x,j)=>{x.disabled=true;if(it.o[j].c)x.classList.add('ok');});
    if(o.c){QZ.ok++;addXP(3);}else b.classList.add('no');
    $('#qw').innerHTML=`<p class="why"><b>${o.c?'Doğru.':'Yanlış.'}</b> ${fmt(it.w)}</p><button class="btn pri sm" id="qN" style="margin-top:8px">${QZ.i+1<n?'Sonraki soru':'Sonucu gör'}</button>`;
    $('#qN').onclick=()=>{QZ.i++;qShow();};$('#qN').focus();
  });
}

/* ---------- Pay Masası ---------- */
const PRESETS=[
 ['Ömeriyye (koca)',{koca:1,anne:1,baba:1}],
 ['Ömeriyye (hanım)',{kari:1,anne:1,baba:1}],
 ['İbn Mes‘ûd hadisi',{kiz:1,okiz:1,ozk:1}],
 ['Erkeğe iki kat',{kari:1,ogul:1,kiz:2}],
 ['Avl örneği',{koca:1,ozk:2}],
 ['Redd örneği',{kiz:1,anne:1}],
 ['Kelâle',{anne:1,akar:2,oze:1}],
 ['Nineler',{kari:2,nine:2,ogul:1}]
];
let M={c:{},b:{},mal:''};
try{const o=JSON.parse(localStorage.getItem(KEY+'-masa')||'null');if(o&&o.c)M=o;}catch(e){}
const saveM=()=>{try{localStorage.setItem(KEY+'-masa',JSON.stringify(M));}catch(e){}};
V.masa=()=>{setTimeout(masaDraw,0);return `<div class="view"><h1>Pay Masası</h1><p class="muted">Mirasçıları ekle; terazi hacbi, farz paylarını ve asabeyi adım adım göstersin. Bir mirasçıya “katil” ya da “din farkı” işareti koyarak engellerin etkisini gör.</p>
 <div class="pills" style="margin:10px 0 14px">${PRESETS.map((p,i)=>`<button class="pill" data-pre="${i}">${p[0]}</button>`).join('')}<button class="pill" data-pre="x">Temizle</button></div>
 <div class="calc"><div class="card"><h2 class="sec-h" style="margin-top:0">Mirasçılar</h2><div id="heirs"></div>
  <label class="small muted" style="display:block;margin-top:12px">Terike tutarı (isteğe bağlı, borç ve vasiyet sonrası)<input class="inp" id="mal" inputmode="decimal" placeholder="örn. 120000" value="${esc(M.mal)}"></label></div>
  <div class="card" id="sonuc"></div></div>
 <p class="tiny muted" style="margin-top:12px">Pay Masası genel hatlarıyla, Hanefî esasa göre ve sınırlı mirasçı türüyle hesaplar (dede, baba bir kardeşler, torun oğlu, amca vb. yok). “Avl”, “redd” ve “Ömeriyye” metinde geçmeyen ek bilgilerdir. Gerçek bir taksim için mutlaka bir uzmana danışınız.</p></div>`;};
function masaDraw(){
  const h=$('#heirs');if(!h)return;
  h.innerHTML=HEIRS.map(x=>{const n=M.c[x.k]||0;return `<div class="heir"><div class="nm"><b>${x.ad}</b><span>${fmt(x.n)}</span>${n?`<div class="row" style="gap:6px;margin-top:4px"><button class="mini ${M.b[x.k]==='katil'?'on':''}" data-ban="${x.k}" data-t="katil">katil</button><button class="mini ${M.b[x.k]==='din'?'on':''}" data-ban="${x.k}" data-t="din">din farkı</button></div>`:''}</div>
   <div class="stp"><button data-d="-1" data-k="${x.k}" aria-label="azalt">−</button><output>${n}</output><button data-d="1" data-k="${x.k}" aria-label="artır">+</button></div></div>`;}).join('');
  $$('.stp button',h).forEach(b=>b.onclick=()=>{const k=b.dataset.k,x=HEIR[k];let n=(M.c[k]||0)+(+b.dataset.d);n=Math.max(0,Math.min(x.max,n));M.c[k]=n;if(n&&k==='koca')M.c.kari=0;if(n&&k==='kari')M.c.koca=0;if(!n)delete M.b[k];saveM();masaDraw();});
  $$('.mini',h).forEach(b=>b.onclick=()=>{const k=b.dataset.ban;M.b[k]=M.b[k]===b.dataset.t?undefined:b.dataset.t;if(!M.b[k])delete M.b[k];saveM();masaDraw();});
  const r=hesapla(M.c,M.b),o=$('#sonuc'),mal=parseFloat(String(M.mal).replace(/\./g,'').replace(',','.'));
  if(!r.rows.length){o.innerHTML=`<div style="text-align:center">${scaleSVG()}<p class="muted">Soldan mirasçı ekleyin ya da hazır bir örnek seçin.</p></div>`;setTimeout(swing,50);return;}
  const live=r.rows.filter(x=>!fZero(x.f));if(!fZero(r.rest))live.push({ad:'Zevi’l-erhâm / beytülmâl',f:r.rest,n:1,rest:true});
  let a=0;const R=80,C=95,arc=live.map((x,i)=>{const v=fVal(x.f),a0=a;a+=v;const col=`var(--p${i%10+1})`;
    if(v>=.9999)return `<circle cx="${C}" cy="${C}" r="${R}" fill="${col}"/>`;
    const p=t=>[C+R*Math.sin(2*Math.PI*t),C-R*Math.cos(2*Math.PI*t)],[x0,y0]=p(a0),[x1,y1]=p(a);
    return `<path d="M${C} ${C}L${x0.toFixed(2)} ${y0.toFixed(2)}A${R} ${R} 0 ${v>.5?1:0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}Z" fill="${col}" stroke="var(--panel)" stroke-width="2"><title>${esc(x.ad)} ${fStr(x.f)}</title></path>`;}).join('');
  const money=f=>isFinite(mal)&&mal>0?(mal*fVal(f)).toLocaleString('tr-TR',{maximumFractionDigits:2}):'';
  o.innerHTML=`<h2 class="sec-h" style="margin-top:0">Taksim ${r.avl?'<span class="chip bad">avl</span>':''}${r.radd?'<span class="chip good">redd</span>':''}</h2>
   <div class="pie"><svg viewBox="0 0 190 190" role="img" aria-label="Pay dağılımı">${arc}<circle cx="${C}" cy="${C}" r="34" fill="var(--panel)"/><text x="${C}" y="${C+6}" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">1</text></svg>
   <div class="legend">${live.map((x,i)=>`<div><i style="background:var(--p${i%10+1})"></i><span>${x.ad}${x.n>1?' ×'+x.n:''}</span><b>${fHtml(x.f)}</b></div>`).join('')}</div></div>
   <div class="stack">${live.map((x,i)=>`<div style="flex:${fVal(x.f)};background:var(--p${i%10+1})" title="${esc(x.ad)}">${fVal(x.f)>.08?fStr(x.f):''}</div>`).join('')}</div>
   <div class="tblw"><table class="tbl res"><tr><th>Mirasçı</th><th>Durum</th><th>Toplam</th><th>Kişi başı</th>${money(ONE)?'<th>Tutar (kişi)</th>':''}</tr>
   ${r.rows.map(x=>`<tr class="${x.mahrum||x.mahcub?'m':''}"><td><b>${x.ad}</b>${x.n>1?' ×'+x.n:''}</td><td>${x.typ}</td><td>${fHtml(x.f)}</td><td>${fHtml(x.each)}</td>${money(ONE)?`<td>${money(x.each)}</td>`:''}</tr>`).join('')}</table></div>
   <h3 class="sec-h">Adım adım</h3><ol class="steps">${r.st.map(s=>`<li><span>${fmt(s)}</span></li>`).join('')}</ol>
   <details class="more"><summary>Her payın gerekçesi</summary><ul>${r.rows.map(x=>`<li><b>${x.ad}:</b> ${fmt(x.why)}</li>`).join('')}</ul></details>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-pre]');if(!b)return;const v=b.dataset.pre;M.c=v==='x'?{}:Object.assign({},PRESETS[+v][1]);M.b={};saveM();masaDraw();});
document.addEventListener('input',e=>{if(e.target.id==='mal'){M.mal=e.target.value;saveM();masaDraw();}});

/* ---------- Oyunlar ---------- */
const GAMES=[
 ['pay','⚖️','Pay Avcısı','Rastgele bir aile: her mirasçının payını bul. Terazi denetler.'],
 ['engel','🛡️','Engel mi, değil mi?','Durumu oku: mirasçı olur mu, olamaz mı?'],
 ['kim','🗣️','Kim söyledi?','Görüşü sahibiyle eşleştir: mezhepler ve sahâbîler.'],
 ['es','🔗','Terim Eşleştirme','Arapça terimi tanımıyla buluştur.']
];
V.oyun=sub=>{
  if(sub&&G[sub]){setTimeout(()=>G[sub](),0);return `<div class="view"><div class="row" style="justify-content:space-between"><a class="btn ghost sm" href="#oyun">← Oyunlar</a><span class="chip gold" id="gsc"></span></div><div id="game" style="margin-top:12px"></div></div>`;}
  return `<div class="view"><h1>Oyunlar</h1><p class="muted">Öğrendiklerini oynayarak pekiştir. Rekorların kaydedilir.</p><div class="grid g2">${GAMES.map(g=>`<a class="gcard" href="#oyun/${g[0]}"><div class="ic" style="font-size:1.4rem">${g[1]}</div><b>${g[2]}</b><p class="small muted">${g[3]}</p><span class="chip">Rekor: ${S.best[g[0]]}</span></a>`).join('')}</div></div>`;
};
const G={};
const PCHO=['1/2','1/4','1/8','2/3','1/3','1/6','Kalanın 1/3’ü','1/6 + asabe','Asabe','Mahcûb'];
function scen(){
  for(let t=0;t<200;t++){
    const c={},pool=shuffle(['ogul','kiz','kiz','okiz','baba','anne','anne','nine','akar','oze','ozk','ozk','baba']),n=2+Math.floor(Math.random()*3);
    if(Math.random()<.7)c[Math.random()<.5?'koca':'kari']=1;
    pool.slice(0,n).forEach(k=>{c[k]=Math.min(HEIR[k].max,1+(Math.random()<.35?1:0));});
    const r=hesapla(c,{});if(r.rows.length>=2&&r.rows.length<=5)return{c,r};
  }
}
G.pay=()=>{
  let sc=0,round=0;const go=()=>{
    round++;const {c,r}=scen(),pick={};
    $('#gsc').textContent=`Puan ${sc} · Tur ${round}/10`;
    $('#game').innerHTML=`<div class="card"><p class="eyebrow">Mûris vefat etti; geride kalanlar:</p><p class="big2">${r.rows.map(x=>x.ad+(x.n>1?' ×'+x.n:'')).join(' · ')}</p><p class="small muted">Her mirasçının durumunu seç (eşlerde ve ana bir kardeşlerde toplam payı düşün).</p>
     ${r.rows.map(x=>`<div class="heir" style="grid-template-columns:1fr"><div class="nm"><b>${x.ad}${x.n>1?' ×'+x.n:''}</b></div><div class="pills" data-h="${x.k}">${PCHO.map(o=>`<button class="pill" data-o="${o}">${fmt(o.replace(/^(\d)\/(\d)/,'‹$1/$2›'))}</button>`).join('')}</div><p class="why" id="w-${x.k}"></p></div>`).join('')}
     <button class="btn pri" id="chk" style="margin-top:12px">Teraziye koy</button></div>`;
    $$('#game .pills').forEach(p=>$$('.pill',p).forEach(b=>b.onclick=()=>{$$('.pill',p).forEach(x=>x.classList.remove('on'));b.classList.add('on');pick[p.dataset.h]=b.dataset.o;}));
    $('#chk').onclick=()=>{
      if(Object.keys(pick).length<r.rows.length)return toast('Önce her mirasçı için bir seçim yap.');
      let all=true;r.rows.forEach(x=>{const ok=pick[x.k]===x.typ,p=$(`#game .pills[data-h="${x.k}"]`);$$('.pill',p).forEach(b=>{b.disabled=true;if(b.dataset.o===x.typ)b.classList.add('ok');else if(b.classList.contains('on'))b.classList.add('no');});
        $('#w-'+x.k).innerHTML=`<b>${ok?'✓':'✗'} ${x.typ}</b> — ${fmt(x.why)} <span class="muted">(son pay: ${fHtml(x.f)})</span>`;if(ok){sc++;addXP(2);}else all=false;});
      if(all){sc+=2;toast('Tam isabet! +2');}
      $('#gsc').textContent=`Puan ${sc} · Tur ${round}/10`;
      const b=$('#chk');b.textContent=round<10?'Sonraki aile →':'Sonucu gör';b.onclick=()=>round<10?go():end();
    };
  };
  const end=()=>{const rec=sc>S.best.pay;if(rec){S.best.pay=sc;save();confetti();}addXP(5);$('#game').innerHTML=`<div class="card" style="text-align:center"><p class="big2">Toplam puan: ${sc}</p><p class="muted">${rec?'Yeni rekor!':'Rekor: '+S.best.pay}</p><div class="row" style="justify-content:center"><button class="btn pri" id="again">Yeniden oyna</button><a class="btn" href="#masa">Pay Masası’nda incele</a></div></div>`;$('#again').onclick=()=>{sc=0;round=0;go();};};
  go();
};
function seqGame(key,items,render){
  let i=0,sc=0;const step=()=>{
    $('#gsc').textContent=`Puan ${sc} · ${Math.min(i+1,items.length)}/${items.length}`;
    if(i>=items.length){const rec=sc>S.best[key];if(rec){S.best[key]=sc;save();confetti();}addXP(5);$('#game').innerHTML=`<div class="card" style="text-align:center"><p class="big2">${sc}/${items.length}</p><p class="muted">${rec?'Yeni rekor!':'Rekor: '+S.best[key]}</p><button class="btn pri" id="again">Yeniden oyna</button></div>`;$('#again').onclick=()=>G[key]();return;}
    render(items[i],ok=>{if(ok){sc++;addXP(2);}$('#gsc').textContent=`Puan ${sc} · ${i+1}/${items.length}`;},()=>{i++;step();});
  };step();
}
G.engel=()=>seqGame('engel',sample(ENGEL,12),(it,res,next)=>{
  $('#game').innerHTML=`<div class="card"><p class="eyebrow">Durum</p><p class="big2">${it[0]}</p><div class="verdict"><button class="btn" data-v="0">✓ Mirasçı OLUR</button><button class="btn" data-v="1">✗ Mirasçı OLAMAZ</button></div><div id="gw"></div></div>`;
  $$('.verdict button').forEach(b=>b.onclick=()=>{const ok=(b.dataset.v==='1')===it[1];res(ok);$$('.verdict button').forEach(x=>{x.disabled=true;if((x.dataset.v==='1')===it[1])x.classList.add('good');});if(!ok)b.classList.add('bad');
    $('#gw').innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> ${it[2]}</p><button class="btn pri sm" id="gn">Devam →</button>`;$('#gn').onclick=next;$('#gn').focus();});
});
G.kim=()=>seqGame('kim',sample(KIM,10),(it,res,next)=>{
  const o=shuffle([it[1],...sample(KIM_SEC.filter(x=>x!==it[1]),3)]);
  $('#game').innerHTML=`<div class="card"><p class="eyebrow">Bu görüş kimin?</p><p class="big2">“${fmt(it[0])}”</p><div class="opts">${o.map(x=>`<button class="opt">${x}</button>`).join('')}</div><div id="gw"></div></div>`;
  $$('#game .opt').forEach(b=>b.onclick=()=>{const ok=b.textContent===it[1];res(ok);$$('#game .opt').forEach(x=>{x.disabled=true;if(x.textContent===it[1])x.classList.add('ok');});if(!ok)b.classList.add('no');
    $('#gw').innerHTML=`<p class="why"><b>${ok?'Doğru.':'Yanlış.'}</b> Görüş sahibi: ${it[1]}.</p><button class="btn pri sm" id="gn">Devam →</button>`;$('#gn').onclick=next;});
});
G.es=()=>{
  const set=sample(TERMS,6),L=shuffle(set),Rr=shuffle(set);let sel=null,miss=0,done=0;
  $('#gsc').textContent='Hata 0';
  $('#game').innerHTML=`<div class="card"><p class="muted">Soldan bir terim, sağdan tanımını seç.</p><div class="match grid g2"><div class="col">${L.map(t=>`<button class="mt" data-a="${esc(t[0])}"><span class="ar" style="font-size:1.25rem">${t[1]}</span><br><b>${t[0]}</b></button>`).join('')}</div><div class="col">${Rr.map(t=>`<button class="mt" data-b="${esc(t[0])}">${t[2]}</button>`).join('')}</div></div></div>`;
  $$('[data-a]').forEach(b=>b.onclick=()=>{$$('[data-a]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b;speak(set.find(t=>t[0]===b.dataset.a)[1]);});
  $$('[data-b]').forEach(b=>b.onclick=()=>{if(!sel)return toast('Önce soldan bir terim seç.');
    if(sel.dataset.a===b.dataset.b){sel.classList.add('done');b.classList.add('done');sel.classList.remove('sel');sel=null;done++;addXP(2);
      if(done===set.length){const sc=Math.max(0,set.length*2-miss);const rec=sc>S.best.es;if(rec){S.best.es=sc;save();}confetti();$('#game').insertAdjacentHTML('beforeend',`<div class="card" style="text-align:center;margin-top:12px"><p class="big2">Tamamlandı! Puan ${sc}</p><p class="muted">${rec?'Yeni rekor!':'Rekor: '+S.best.es}</p><button class="btn pri" id="again">Yeni set</button></div>`);$('#again').onclick=()=>G.es();}}
    else{miss++;b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),400);$('#gsc').textContent='Hata '+miss;}});
};

/* ---------- Kartlar ---------- */
let KC={i:0,list:TERMS.map((_,i)=>i)};
V.kart=()=>{setTimeout(kDraw,0);return `<div class="view"><h1>Kartlar</h1><p class="muted">Karta dokun, arkasını çevir. “Biliyorum” dediklerin sayılır.</p><div id="kc"></div></div>`;};
function kDraw(){
  const z=$('#kc');if(!z)return;const t=TERMS[KC.list[KC.i]],kn=Object.keys(S.known).length;
  z.innerHTML=`<p class="small muted" style="text-align:center">Kart ${KC.i+1}/${KC.list.length} · Bilinen ${kn}/${TERMS.length}</p>
   <div class="fc" id="fc"><div class="in"><div class="sd"><span class="ar">${t[1]}</span><b class="big2" style="margin-top:8px">${t[0]}</b><span class="tiny muted" style="margin-top:10px">çevirmek için dokun</span></div><div class="sd bk"><b>${t[0]}</b><p style="margin-top:8px">${t[2]}</p></div></div></div>
   <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="kp">←</button>${say(t[1])}<button class="btn ${S.known[t[0]]?'pri':''}" id="kk">${S.known[t[0]]?'✓ Biliyorum':'Biliyorum'}</button><button class="btn" id="ks">Karıştır</button><button class="btn" id="kn">→</button></div>`;
  $('#fc').onclick=()=>$('#fc').classList.toggle('f');
  $('#kp').onclick=()=>{KC.i=(KC.i-1+KC.list.length)%KC.list.length;kDraw();};
  $('#kn').onclick=()=>{KC.i=(KC.i+1)%KC.list.length;kDraw();};
  $('#ks').onclick=()=>{KC.list=shuffle(KC.list);KC.i=0;kDraw();};
  $('#kk').onclick=()=>{if(S.known[t[0]])delete S.known[t[0]];else{S.known[t[0]]=1;addXP(1);}save();KC.i=(KC.i+1)%KC.list.length;kDraw();};
}

/* ---------- Sınav ---------- */
let EX=null;
V.sinav=()=>`<div class="view"><h1>Sınav</h1><p class="muted">Bütün duraklardan ve ek sorulardan rastgele 20 soru. Sonunda yanlışlarını açıklamalarıyla birlikte görürsün.</p><div id="ex" class="q" style="text-align:center"><p class="big2">Rekorun: ${S.best.sinav} / 100</p><button class="btn pri" id="exGo">Sınavı başlat</button></div></div>`;
function exStart(){const pool=[...LESSONS.flatMap(l=>l.q),...EXTRA];EX={i:0,ok:0,wr:[],items:sample(pool,20).map(q=>({q:q[0],o:shuffle(q[1].map((t,j)=>({t,c:j===q[2]}))),w:q[3]}))};exShow();}
function exShow(){
  const z=$('#ex');const n=EX.items.length;z.style.textAlign='start';
  if(EX.i>=n){const sc=Math.round(EX.ok/n*100),rec=sc>S.best.sinav;if(rec){S.best.sinav=sc;save();}addXP(EX.ok);if(sc>=80)confetti();
    z.innerHTML=`<div style="text-align:center"><p class="big2" style="font-size:2rem">${sc}</p><p>${EX.ok}/${n} doğru · ${sc>=90?'Ferâizî gibi!':sc>=70?'Çok iyi.':sc>=50?'Fena değil; zayıf durakları tekrar et.':'Yol Haritası’ndan tekrar başlamalısın.'} ${rec?'<b>Yeni rekor!</b>':''}</p><button class="btn pri" id="exGo">Yeni sınav</button></div>
     ${EX.wr.length?`<h3 class="sec-h">Yanlışların</h3>${EX.wr.map(w=>`<div class="keybox"><b>${fmt(w.q)}</b><p class="why">Doğrusu: <b>${fmt(w.a)}</b> — ${fmt(w.w)}</p></div>`).join('')}`:''}`;return;}
  const it=EX.items[EX.i];
  z.innerHTML=`<div class="prog"><i style="width:${EX.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${EX.i+1}/${n} · Doğru ${EX.ok}</p><p class="qt">${fmt(it.q)}</p><div class="opts">${it.o.map((o,j)=>`<button class="opt" data-j="${j}">${fmt(o.t)}</button>`).join('')}</div>`;
  $$('.opt',z).forEach(b=>b.onclick=()=>{const o=it.o[+b.dataset.j];$$('.opt',z).forEach((x,j)=>{x.disabled=true;if(it.o[j].c)x.classList.add('ok');});
    if(o.c)EX.ok++;else{b.classList.add('no');EX.wr.push({q:it.q,a:it.o.find(x=>x.c).t,w:it.w});}
    setTimeout(()=>{EX.i++;exShow();},o.c?650:1500);});
}
document.addEventListener('click',e=>{if(e.target.id==='exGo')exStart();});

/* ---------- Hakkında ---------- */
V.hakkinda=()=>`<div class="view card"><h1>Program hakkında</h1>
 <p><b>Terike Terazisi</b>, İslâm miras hukukunu (ferâiz) adım adım ve genel hatlarıyla öğretmek için hazırlanmış, internetsiz çalışan tek dosyalık bir öğretim programıdır.</p>
 <h3 class="sec-h">İçerik</h3><ul><li>Kavramlar: mîrâs, irs, tevârüs, vâris, mûris, terike, farîza / ferâiz.</li><li>Deliller: Kitap (Nisâ 4/7, 8, 11, 12, 13-14, 176; Enfâl 8/75), Sünnet ve İcmâ.</li><li>Rükünler, mirasçılık sebepleri (nesep, evlilik, velâ), şartlar (ölüm türleri, vârisin hayatı) ve engeller (öldürme, din farkı, mürted, tebealık farkı, kölelik).</li></ul>
 <p>Anlatımlar, kullanıcının sağladığı “Mîrâs” ansiklopedi maddesi esas alınarak hazırlanmıştır. Arapça metinlerin yanındaki <b>▶ dinle</b> düğmesi programa gömülü kaydı, yoksa cihazdaki Arapça sesi kullanır.</p>
 <h3 class="sec-h">Pay Masası hakkında</h3><p>Hesaplayıcı öğretim amaçlıdır: Hanefî esasa göre, sınırlı mirasçı türüyle çalışır. Dede, baba bir kardeşler, oğlun oğlu, amca gibi mirasçılar ile hacb-ı noksân ayrıntıları, avl ve redd’in mezheplere göre farkları gösterilmez. “Avl”, “redd” ve “Ömeriyye” maddede geçmeyen ek bilgilerdir. Gerçek bir taksim için uzmana başvurunuz.</p>
 <h3 class="sec-h">İlerleme</h3><p>Puanların, yıldızların ve rekorların bu tarayıcıda saklanır.</p><button class="btn" id="reset">İlerlememi sıfırla</button>
 <p class="tiny muted" style="margin-top:16px">Hüseyin KAYA – Marmara Üniversitesi İlahiyat Fakültesi</p></div>`;
document.addEventListener('click',e=>{if(e.target.id==='reset'&&confirm('Bütün ilerleme silinsin mi?')){S=FRESH();save();hud();toast('İlerleme sıfırlandı.');route();}});

/* ---------- yönlendirme ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.preventDefault();e.stopPropagation();speak(b.dataset.say);}},true);
function route(){
  const [v,a]=(location.hash.slice(1)||'home').split('/'),f=V[v]||V.home;
  sesStop();$('#app').innerHTML=f(a);
  const tab=v==='ders'?'yol':V[v]?v:'home';$$('#tabs a').forEach(x=>x.classList.toggle('on',x.dataset.v===tab));
  if(v==='home'||!V[v])setTimeout(swing,60);
  scrollTo(0,0);
}
addEventListener('hashchange',route);hud();route();
