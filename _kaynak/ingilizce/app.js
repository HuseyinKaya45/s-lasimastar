/* ===== İngilizce Gramer Merkezi — uygulama ===== */
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

const KEY='ingilizce-merkez-v1';
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
/* ---------- bağlantılar ---------- */
/* depoda: ingilizce/index.html → ../zaman-makinesi/index.html; indirilen dosyalarda aynı klasör: zaman-makinesi.html */
const INREPO=/\/ingilizce\/(index\.html)?$/i.test(location.pathname);
const href=(k,n)=>(INREPO?'../'+k+'/index.html':k+'.html')+(n?'#unite/'+n:'');
const ALL=PROGS.flatMap(p=>p.units.map(u=>({...u,p})));
const UL=u=>u.ek||'Unit '+u.n;
const range=p=>{const a=p.units[0],b=p.units[p.units.length-1];return 'Unit '+a.n+'–'+(b.ek?(p.units.filter(u=>!u.ek).pop().n+' + Ekler'):b.n);};
const COL=['var(--p3)','var(--p1)','var(--p8)','var(--p2)'];
const ICON=['⏱️','🧱','🎨','🧭'];
let S={best:0,last:null};try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o)S=Object.assign(S,o);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};

/* ---------- görünümler ---------- */
const V={};
V.home=()=>`<section class="hero view"><div><p class="eyebrow">English Grammar · ${ALL.length} ünite · ${ALL.reduce((a,u)=>a+u.q.length,0)} soru</p><h1>İngilizce Gramer Merkezi</h1>
  <p class="muted">Dört çevrimdışı program, tek kapı: zamanlardan phrasal verb’lere İngilizce dilbilgisinin tamamı. Nereden başlayacağını bilmiyorsan önce <b>Seviye Testi</b>’ni çöz; test sana tekrar etmen gereken üniteleri göstersin.</p>
  <div class="row" style="margin-top:14px"><a class="btn pri" href="#test">Seviye Testi →</a><a class="btn" href="#dizin">Ünite Dizini</a></div>
  ${S.last?`<div class="stat"><div><b>${S.last.sc}</b><span>son test</span></div><div><b>${S.best}</b><span>en iyi</span></div><div><b>${S.last.lv}</b><span>yaklaşık seviye</span></div></div>`:''}</div>
  <div class="scalebox"><svg viewBox="0 0 300 220" role="img" aria-label="Dört program">${PROGS.map((p,i)=>`<a href="${href(p.k)}"><rect x="${20+(i%2)*140}" y="${15+Math.floor(i/2)*100}" width="120" height="85" rx="16" fill="${COL[i]}"/><text x="${80+(i%2)*140}" y="${52+Math.floor(i/2)*100}" text-anchor="middle" font-size="26">${ICON[i]}</text><text x="${80+(i%2)*140}" y="${82+Math.floor(i/2)*100}" text-anchor="middle" font-size="12" font-weight="700" fill="#111">${p.ad}</text></a>`).join('')}</svg></div></section>
 <h2 class="sec-h">Programlar</h2>
 <div class="grid g2">${PROGS.map((p,i)=>`<div class="card" style="border-top:5px solid ${COL[i]}"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${ICON[i]} ${p.ad}</h3><span class="chip">${range(p)}</span></div><p class="muted small">${p.en} · ${p.units.length} ünite</p>
   <ul class="small">${p.parts.map(x=>`<li>${x.t}</li>`).join('')}</ul><a class="btn pri sm" href="${href(p.k)}">Programı aç →</a></div>`).join('')}</div>
 <div class="keybox" style="margin-top:16px"><h3>Bağlantılar nasıl çalışır?</h3><p class="small">Bu sayfadaki bağlantılar programları açar. İndirdiğin dosyaları <b>aynı klasörde</b> ve şu adlarla tut: ${PROGS.map(p=>`<code>${p.k}.html</code>`).join(', ')}. Program açılmazsa dosyayı kendin aç; ilerlemen her programın içinde ayrıca saklanır.</p></div>`;

let DQ='';
V.dizin=()=>{setTimeout(dDraw,0);return `<div class="view"><h1>Ünite Dizini</h1><p class="muted">${ALL.length} ünitenin tamamı. Ara (İngilizce ya da Türkçe), bir üniteye dokun: ilgili program o ünitede açılsın.</p>
 <input class="inp" id="dq" placeholder="ör. passive, edilgen, used to, edat…" value="${esc(DQ)}"><div id="dl" style="margin-top:12px"></div></div>`;};
function dDraw(){
  const z=$('#dl');if(!z)return;const q=DQ.toLowerCase().trim();
  z.innerHTML=PROGS.map((p,i)=>{const rows=p.parts.map(pt=>{const us=pt.u.map(n=>p.units.find(u=>u.n===n)).filter(u=>u&&(!q||(u.t+' '+u.f+' '+u.tr+' '+UL(u)).toLowerCase().includes(q)));
      return us.length?`<div class="part"><b style="color:${COL[i]}">${pt.t}</b><span class="muted">${pt.en}</span></div><div class="path">${us.map(u=>`<a class="stop" href="${href(p.k,u.n)}" style="--c:${COL[i]}"><span class="n" style="font-size:.78rem">${u.ek?u.ek.replace('Ek ','E'):u.n}</span><span class="t"><b>${u.t} <span class="muted">(${u.f})</span></b><span>${u.tr}</span></span><span class="small muted">${p.ad} →</span></a>`).join('')}</div>`:'';}).join('');
    return rows?`<h2 class="sec-h">${ICON[i]} ${p.ad}</h2>${rows}`:'';}).join('')||'<p class="muted">Sonuç yok.</p>';
}
document.addEventListener('input',e=>{if(e.target.id==='dq'){DQ=e.target.value;dDraw();}});

/* ---------- Seviye Testi ---------- */
let T=null;
const LEVEL=sc=>sc>=85?'C1':sc>=70?'B2':sc>=50?'B1':sc>=30?'A2':'A1';
V.test=()=>`<div class="view"><h1>Seviye Testi</h1><p class="muted">Dört programın bütün bölümlerinden dengeli seçilmiş sorular. Sonunda her program ve bölüm için puanını, yaklaşık seviyeni ve tekrar etmen gereken üniteleri (bağlantılarıyla) görürsün.</p>
 <div id="tz" class="q"><div class="grid g2">${[['Kısa test','Her bölümden 1 soru',1],['Uzun test','Her bölümden 2 soru',2]].map(x=>`<button class="gcard" data-len="${x[2]}" style="text-align:start"><b>${x[0]}</b><p class="small muted">${x[1]} · ${PROGS.reduce((a,p)=>a+p.parts.length,0)*x[2]} soru</p></button>`).join('')}</div>
 <h3 class="sec-h">Ya da tek program</h3><div class="pills">${PROGS.map((p,i)=>`<button class="pill" data-tp="${i}">${ICON[i]} ${p.ad}</button>`).join('')}</div>
 ${S.last?`<p class="small muted" style="margin-top:12px">Son test: ${S.last.sc}/100 (${S.last.lv}) · En iyi: ${S.best}</p>`:''}</div></div>`;
function tStart(per,only){
  const items=[];PROGS.forEach((p,pi)=>{if(only!=null&&pi!==only)return;p.parts.forEach((pt,ti)=>{const pool=pt.u.flatMap(n=>{const u=p.units.find(x=>x.n===n);return u?u.q.map(q=>({q,u,pi,ti})):[];});items.push(...sample(pool,only!=null?Math.max(3,per*3):per));});});
  T={i:0,items:only!=null?items:shuffle(items),res:[]};tShow();
}
function tShow(){
  const z=$('#tz');if(!z)return;const n=T.items.length;
  if(T.i>=n){
    const ok=T.res.filter(Boolean).length,sc=Math.round(ok/n*100),lv=LEVEL(sc);if(sc>S.best)S.best=sc;S.last={sc,lv};save();if(sc>=70)confetti();
    const by=(f)=>{const m=new Map();T.items.forEach((it,i)=>{const k=f(it);const v=m.get(k)||[0,0];v[1]++;if(T.res[i])v[0]++;m.set(k,v);});return m;};
    const prog=by(it=>it.pi),part=by(it=>it.pi+'/'+it.ti);
    const wrong=[...new Map(T.items.filter((it,i)=>!T.res[i]).map(it=>[it.p?it:it.u.n+it.pi,it])).values()];
    z.innerHTML=`<div style="text-align:center"><p class="big2" style="font-size:2.2rem">${sc}<span class="muted" style="font-size:1rem">/100</span></p><p>${ok}/${n} doğru · yaklaşık seviye <b>${lv}</b></p><p class="small muted">Seviye tahmini kabaca bir yön göstermek içindir; resmî bir sınav sonucu değildir.</p></div>
     <h3 class="sec-h">Programlara göre</h3>${[...prog].map(([pi,[a,b]])=>`<div style="margin:8px 0"><div class="row" style="justify-content:space-between"><b>${ICON[pi]} ${PROGS[pi].ad}</b><span>${a}/${b}</span></div><div class="prog"><i style="width:${a/b*100}%;background:${COL[pi]}"></i></div></div>`).join('')}
     <h3 class="sec-h">Bölümlere göre</h3><div class="tblw"><table class="tbl">${[...part].map(([k,[a,b]])=>{const [pi,ti]=k.split('/').map(Number);return `<tr><td>${PROGS[pi].ad}</td><td>${PROGS[pi].parts[ti].t}</td><td>${a===b?'<span class="rightc">✓</span>':a+'/'+b}</td></tr>`;}).join('')}</table></div>
     ${wrong.length?`<h3 class="sec-h">Tekrar etmen önerilen üniteler</h3><div class="path">${[...new Map(T.items.filter((it,i)=>!T.res[i]).map(it=>[it.pi+'-'+it.u.n,it])).values()].map(it=>`<a class="stop" href="${href(PROGS[it.pi].k,it.u.n)}" style="--c:${COL[it.pi]}"><span class="n" style="font-size:.78rem">${it.u.ek?it.u.ek.replace('Ek ','E'):it.u.n}</span><span class="t"><b>${it.u.t}</b><span>${it.u.tr} · ${PROGS[it.pi].ad}</span></span><span>→</span></a>`).join('')}</div>`:'<p class="rightc">Hiç yanlışın yok. Harika!</p>'}
     <div class="row" style="justify-content:center;margin-top:14px"><a class="btn pri" href="#test" id="tAgain">Yeni test</a></div>`;
    $('#tAgain').onclick=e=>{e.preventDefault();route();};return;
  }
  const it=T.items[T.i];
  z.innerHTML=`<div class="prog"><i style="width:${T.i/n*100}%"></i></div><p class="small muted" style="margin-top:8px">Soru ${T.i+1}/${n} · ${ICON[it.pi]} ${PROGS[it.pi].ad} · ${PROGS[it.pi].parts[it.ti].t}</p><div id="tb"></div><div id="tn"></div>`;
  renderQ($('#tb'),it.q,ok=>{T.res[T.i]=ok;$('#tn').innerHTML=`<button class="btn pri sm" style="margin-top:8px">${T.i+1<n?'Sonraki →':'Sonucu gör'}</button>`;const b=$('#tn button');b.onclick=()=>{T.i++;tShow();};b.focus();});
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-len],[data-tp]');if(!b||!$('#tz'))return;if(b.dataset.len)tStart(+b.dataset.len,null);else tStart(1,+b.dataset.tp);});

/* ---------- Hakkında ---------- */
V.hakkinda=()=>`<div class="view card"><h1>Program hakkında</h1>
 <p><b>İngilizce Gramer Merkezi</b>, dört çevrimdışı İngilizce dilbilgisi programının giriş sayfasıdır: ${PROGS.map(p=>`<b>${p.ad}</b> (${range(p)})`).join(', ')}.</p>
 <p>Konu sırası <i>English Grammar in Use</i> (Units 1–145 ve ekler) ile aynıdır; anlatımlar, örnekler ve sorular programlar için özgün olarak yazılmıştır. Seviye Testi, programlardaki ${ALL.reduce((a,u)=>a+u.q.length,0)} sorudan seçer.</p>
 <p class="tiny muted" style="margin-top:16px">Hüseyin KAYA</p></div>`;

/* ---------- yönlendirme ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.preventDefault();e.stopPropagation();say(b.dataset.say);}},true);
function route(){
  const v=(location.hash.slice(1)||'home').split('/')[0],f=V[v]||V.home;
  try{speechSynthesis.cancel();}catch(e){}
  $('#app').innerHTML=f();$$('#tabs a').forEach(x=>x.classList.toggle('on',x.dataset.v===(V[v]?v:'home')));scrollTo(0,0);
}
addEventListener('hashchange',route);route();
