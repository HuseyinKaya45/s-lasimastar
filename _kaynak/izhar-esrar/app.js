/* ===== Esrâr Rasathânesi — uygulama ===== */
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
const strip=s=>s.replace(/[ً-ٰٕـ‍]/g,'');
const BC=b=>BABS3[b].col;
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
/* ---------- durum ---------- */
const KEY='esrar-rasathanesi-v1';
const FRESH=()=>({v:1,xp:0,les:{},lab:{},cells:0,exams:[],best:{},played:{},cards:{},badges:{},snd:true,day:'',streak:0,name:''});
let S=FRESH();
try{const t=JSON.parse(localStorage.getItem(KEY)||'null');if(t&&t.v===1)S=Object.assign(S,t);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
(function streak(){const d=new Date().toISOString().slice(0,10);if(S.day===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();})();
const LEVELS=[[0,'Tâlib'],[300,'Mübtedî'],[900,'Mutavassıt'],[1800,'Muhakkik'],[3200,'Müdekkik'],[5000,'Allâme']];
function lvl(){let i=0;LEVELS.forEach((l,k)=>{if(S.xp>=l[0])i=k;});const cur=LEVELS[i][0],nx=LEVELS[i+1]?LEVELS[i+1][0]:cur+1;return {name:LEVELS[i][1],p:LEVELS[i+1]?(S.xp-cur)/(nx-cur):1};}
function hud(){const l=lvl();$('#lvlName').textContent=l.name;$('#lvlBar').style.width=Math.round(l.p*100)+'%';$('#xp').textContent=S.xp;}
function addXP(n){const b=lvl().name;S.xp+=n;save();hud();const a=lvl().name;if(a!==b){toast('Tebrikler! Yeni rütbe: '+a);confetti();}}
const lstar=id=>{const r=S.les[id];if(!r)return 0;return r.best>=1?3:r.best>=.6?2:1;};
/* ---------- ses, konuşma, efektler ---------- */
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
/* ---------- rozetler ---------- */
const BADGES=[
 ['ilk','İlk Işık','İlk dersi oku',()=>Object.keys(S.les).length>0],
 ['amil','Âmil Burcu','Birinci bâbın bütün derslerinde 2+ yıldız',()=>LESSONS.filter(l=>l.b===1).every(l=>lstar(l.id)>=2)],
 ['mamul','Ma‘mûl Burcu','İkinci bâbın bütün derslerinde 2+ yıldız',()=>LESSONS.filter(l=>l.b===2).every(l=>lstar(l.id)>=2)],
 ['irab','İ‘râb Burcu','Üçüncü bâbın bütün derslerinde 2+ yıldız',()=>LESSONS.filter(l=>l.b===3).every(l=>lstar(l.id)>=2)],
 ['lab10','Mu‘rib','Laboratuvarda 10 cümle çöz',()=>Object.keys(S.lab).length>=10],
 ['laball','Esrâr Avcısı','Laboratuvardaki bütün cümleleri çöz',()=>LAB.every((_,i)=>S.lab[i]!=null)],
 ['sinav','Mümtaz','Bir sınavdan %90 ve üstü al',()=>S.exams.some(e=>e.pct>=90)],
 ['oyun','Oyun Ehli','On oyunun hepsini oyna',()=>GAMES.every(g=>S.played[g.id])],
 ['seri','Devamlılık','3 gün üst üste çalış',()=>S.streak>=3],
 ['tam','Rasathâne Tamam','39 yıldızın hepsi tam parlak',()=>LESSONS.every(l=>lstar(l.id)===3)]
];
function checkBadges(){BADGES.forEach(([id,t,,f])=>{if(!S.badges[id]&&f()){S.badges[id]=1;save();toast('Rozet kazandın: '+t);beep('win');}});}
/* ---------- yönlendirme ---------- */
const V={};let TIMERS=[];
function stopTimers(){TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);});TIMERS=[];onResize=null;}
let onResize=null;addEventListener('resize',()=>{if(onResize)onResize();});
function route(){
  stopTimers();
  const h=(location.hash||'#home').slice(1).split('/');const v=h[0]||'home';
  const map={home:'home',dersler:'dersler',ders:'dersler',lab:'lab',harita:'harita',oyun:'oyun',kart:'kart',sinav:'sinav',hakkinda:'hakkinda'};
  $$('#tabs a').forEach(a=>a.classList.toggle('on',a.dataset.v===(map[v]||'home')));
  (V[v]||V.home)(h.slice(1));
  app.classList.remove('view');void app.offsetWidth;app.classList.add('view');
  window.scrollTo({top:0});checkBadges();
}
addEventListener('hashchange',route);
/* ===================== RASATHÂNE (ana sayfa) ===================== */
function seeded(seed){let s=seed;return()=>{s=(s*16807)%2147483647;return (s-1)/2147483646;};}
function skyLayout(portrait){
  const W=portrait?600:1000,H=portrait?980:560;const R=seeded(7);
  const regs=portrait?{0:[300,70,0,0],1:[40,140,520,380,3],2:[40,560,520,200,2],3:[40,800,520,130,1]}:{0:[500,52,0,0],1:[470,110,500,330,3],2:[30,110,400,230,2],3:[30,380,400,150,1]};
  const pos={};
  [0,1,2,3].forEach(b=>{const ls=LESSONS.filter(l=>l.b===b);const [x,y,w,h,rows]=regs[b];
    if(b===0){pos[ls[0].id]=[x,y];return;}
    const per=Math.ceil(ls.length/rows);
    ls.forEach((l,k)=>{const row=Math.floor(k/per),col=k%per;const n=Math.min(per,ls.length-row*per);
      let fx=n>1?col/(n-1):.5; if(row%2===1)fx=1-fx; /* yılan: sağdan sola başlar */
      const px=x+w-(fx*w)+(R()-.5)*18, py=y+(rows>1?row*(h/(rows-1)):h/2)+Math.sin(col*1.1+b)*h*.07+(R()-.5)*16;
      pos[l.id]=[Math.round(px),Math.round(py)];});
  });
  const bg=Array.from({length:portrait?150:190},()=>[Math.round(R()*W),Math.round(R()*H),+(R()*1.3+.3).toFixed(2),+(R()*3).toFixed(2)]);
  return {W,H,pos,bg,lab:portrait?{1:[300,120],2:[300,540],3:[300,780]}:{1:[720,92],2:[230,92],3:[230,362]}};
}
function skySVG(){
  const portrait=innerWidth<640;const L=skyLayout(portrait);
  const cols={0:'#f6e2a4',1:'#f2b84b',2:'#62c0ea',3:'#bb94f0'};
  let s=`<svg viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Ders yıldız haritası">`;
  s+=L.bg.map(([x,y,r,d])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" class="tw" style="animation-delay:${d}s"/>`).join('');
  [1,2,3].forEach(b=>{const ls=LESSONS.filter(l=>l.b===b);const pts=ls.map(l=>L.pos[l.id].join(',')).join(' ');s+=`<polyline points="${pts}" fill="none" stroke="${cols[b]}" stroke-opacity=".35" stroke-width="1.4" stroke-dasharray="3 4"/>`;});
  const lp=L.pos['l0'];s+=`<line x1="${lp[0]}" y1="${lp[1]}" x2="${L.pos.l1[0]}" y2="${L.pos.l1[1]}" stroke="#f6e2a4" stroke-opacity=".25" stroke-dasharray="2 5"/>`;
  const names={1:'العامل',2:'المعمول',3:'الإعراب'};
  [1,2,3].forEach(b=>{const [x,y]=L.lab[b];const n=LESSONS.filter(l=>l.b===b);const lit=n.filter(l=>lstar(l.id)).length;s+=`<text x="${x}" y="${y}" text-anchor="middle" class="cname" style="color:${cols[b]}">${names[b]}</text><text x="${x}" y="${y+18}" text-anchor="middle" font-size="11" opacity=".7">${BABS3[b].short} · ${lit}/${n.length}</text>`;});
  LESSONS.forEach(l=>{const [x,y]=L.pos[l.id];const st=lstar(l.id);const c=cols[l.b];const big=l.b===0;
    s+=`<g class="star" tabindex="0" role="link" data-l="${l.id}" aria-label="${esc((l.b?l.b+'. bâb, ':'')+l.t)}"><title>${esc(l.t)}</title>
    <circle class="halo" cx="${x}" cy="${y}" r="${big?24:17}" fill="${c}" opacity="${[.06,.18,.32,.55][st]}"/>
    <circle class="core" cx="${x}" cy="${y}" r="${(big?6:3.5)+st*1.6}" fill="${st?c:'#7c84ad'}"/>
    ${st===3?`<path d="M${x} ${y-14}v28M${x-14} ${y}h28" stroke="${c}" stroke-width="1" opacity=".6"/>`:''}
    <text x="${x}" y="${y+(big?38:30)}" text-anchor="middle" font-size="${portrait?13:11}" opacity=".75">${big?'Hutbe':l.i}</text></g>`;});
  return s+'</svg>';
}
V.home=()=>{
  const lit=LESSONS.filter(l=>lstar(l.id)).length;
  const next=LESSONS.find(l=>lstar(l.id)<2)||LESSONS[0];
  const best=S.exams.length?Math.max(...S.exams.map(e=>e.pct)):null;
  app.innerHTML=`
  <section class="hero">
    <div>
      <div class="kufi">إِظْهَارُ الْأَسْرَارِ</div>
      <h1>Esrâr Rasathânesi</h1>
      <p class="muted">İmam Birgivî’nin <b>İzhâru’l-Esrâr</b>’ı üç burçlu bir gökyüzünde: <b>âmil</b>, <b>ma‘mûl</b> ve <b>i‘râb</b>. Her ders bir yıldız; okudukça ve mini sınavları geçtikçe parlar. <b>İ‘râb Laboratuvarı</b>’nda kitabın misallerini kelime kelime çözer, âmilden ma‘mûle çizilen okları görürsün.</p>
      <div class="row" style="margin-top:12px"><a class="btn pri" href="#ders/${next.id}">${lstar(next.id)?'Devam et':'Başla'}: ${esc(next.t)} ${ICON.arrow}</a><a class="btn" href="#lab">İ‘râb Lab</a></div>
      <div class="counter">
        <div style="--c:var(--c-amil)"><b style="color:var(--c-amil)">60</b><span class="small">âmil</span><span class="ar">سِتُّونَ عَامِلًا</span></div>
        <div><b style="color:var(--c-mamul)">30</b><span class="small">ma‘mûl</span><span class="ar">ثَلَاثُونَ مَعْمُولًا</span></div>
        <div><b style="color:var(--c-irab)">4</b><span class="small">i‘râb taksimi</span><span class="ar">أَرْبَعَةُ تَقْسِيمَاتٍ</span></div>
      </div>
      <div class="stat">
        <div><b>${lit}/39</b><span>yanan yıldız</span></div><div><b>${Object.keys(S.lab).length}/${LAB.length}</b><span>çözülen cümle</span></div>
        <div><b>${S.streak}</b><span>gün seri</span></div><div><b>${best===null?'—':best+'%'}</b><span>en iyi sınav</span></div>
      </div>
    </div>
    <div><div class="sky" id="sky">${skySVG()}</div>
      <div class="legend2"><span><i style="background:#7c84ad"></i>okunmadı</span><span><i style="background:var(--gold);opacity:.6"></i>okundu</span><span><i style="background:var(--gold)"></i>mini sınav geçildi</span><span>✦ tam puan</span></div></div>
  </section>
  <div class="sec-h"><h2>Rasathânenin bölümleri</h2></div>
  <div class="gcards">
    <a class="gcard" href="#dersler"><div class="ico">${ICON.door}</div><h3>Dersler</h3><p class="muted small">Kitabın metni (harekeli), Türkçe şerh, misaller ve her derste mini sınav.</p></a>
    <a class="gcard" href="#lab"><div class="ico">${ICON.target}</div><h3>İ‘râb Laboratuvarı</h3><p class="muted small">${LAB.length} cümle: âmili bul, vazifeyi seç, i‘râbı ve alâmeti söyle. Arapça i‘râb metni otomatik.</p></a>
    <a class="gcard" href="#harita"><div class="ico">${ICON.split}</div><h3>Taksim haritaları</h3><p class="muted small">60 âmil, 30 ma‘mûl ve i‘râbın dört taksimi açılır-kapanır ağaçlarda.</p></a>
    <a class="gcard" href="#oyun"><div class="ico">${ICON.bolt}</div><h3>On oyun</h3><p class="muted small">Âmil Avcısı, Kesr mi Feth mi, Tenvîn Kapısı, Fâ Köprüsü, 60 Âmil Yarışı…</p></a>
    <a class="gcard" href="#sinav"><div class="ico">${ICON.eye}</div><h3>Sınav</h3><p class="muted small">Süreli, bâb bâb seçilebilen, konu raporlu sınav ve yazdırılabilir başarı belgesi.</p></a>
  </div>
  <div class="sec-h"><h2>Rozetler</h2><span class="muted small">${Object.keys(S.badges).length}/${BADGES.length}</span></div>
  <div class="badges">${BADGES.map(([id,t,d])=>`<div class="badge ${S.badges[id]?'on':''}">✦ <div><b>${t}</b><div class="tiny muted">${d}</div></div></div>`).join('')}</div>
  <div class="row" style="margin-top:22px"><button class="btn sm ghost" id="reset">İlerlemeyi sıfırla</button></div>`;
  const bind=()=>$$('#sky .star').forEach(g=>{g.onclick=()=>location.hash='#ders/'+g.dataset.l;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.onclick();}};});
  bind();let lastP=innerWidth<640;onResize=()=>{const p=innerWidth<640;if(p!==lastP){lastP=p;$('#sky').innerHTML=skySVG();bind();}};
  $('#reset').onclick=()=>{if(confirm('Bütün ilerleme silinsin mi?')){const snd=S.snd;S=FRESH();S.snd=snd;save();hud();route();}};
};
/* ===================== DERSLER ===================== */
V.dersler=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">فَوَجَبَ تَرْتِيبُهَا عَلَى ثَلَاثَةِ أَبْوَابٍ</div><h2>Dersler</h2></div><span class="muted small">${LESSONS.filter(l=>lstar(l.id)).length}/39 okundu</span></div>
  ${BABS3.map(B=>{const ls=LESSONS.filter(l=>l.b===B.b);return `<div class="grp" style="--c:${B.col}"><h3>${B.tr} <span class="ar">${esc(B.ar)}</span></h3></div>
   <div class="lgrid">${ls.map(l=>`<a class="lcard" href="#ders/${l.id}" style="--c:${B.col}"><span class="num">${l.b?l.i:'✦'}</span><span class="tt"><b>${esc(l.t)}</b><span class="ar">${esc(l.ar)}</span></span><span>${stars(lstar(l.id))}<div class="tiny muted" style="text-align:end">s. ${l.p}</div></span></a>`).join('')}</div>`;}).join('')}`;
};
V.ders=([id])=>{
  const L=LESSON[id];if(!L){location.hash='#dersler';return;}
  const B=BABS3[L.b];const prev=LESSONS[L.i-1],next=LESSONS[L.i+1];
  if(!S.les[id]){S.les[id]={best:0};save();addXP(10);}
  const labs=LAB.map((x,i)=>[x,i]).filter(([x])=>Math.abs(x.p-L.p)<=(L.b===3?5:3)).slice(0,4);
  app.innerHTML=`<div class="lnav"><a class="btn sm ghost" href="#dersler">${ICON.back} Dersler</a><div class="row">${prev?`<a class="btn sm" href="#ders/${prev.id}">‹ Önceki</a>`:''}${next?`<a class="btn sm" href="#ders/${next.id}">Sonraki ›</a>`:''}</div></div>
  <div class="card" style="margin-top:12px;--c:${B.col};border-top:4px solid ${B.col}">
    <div class="eyebrow" style="color:${B.col}">${B.tr} · Ders ${L.b?L.i:'0'} · kitapta s. ${L.p}</div>
    <h2 style="margin-top:4px">${esc(L.t)}</h2><div class="ar" style="font-size:1.4rem;color:var(--muted)">${esc(L.ar)}</div>
    <div style="margin-top:6px">${stars(lstar(id))}</div>
  </div>
  <div class="matn" style="margin-top:20px">${L.m.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="row" style="justify-content:flex-end"><button class="btn sm" id="say">${ICON.play} Metni dinle</button></div></div>
  <div class="sec-h"><h2>Şerh</h2></div>
  <div class="card serh">${AW(L.tr)}</div>
  <div class="sec-h"><h2>Misaller</h2></div>
  <div class="ex">${L.ex.map(e=>`<div>${A(e[0])}<span class="small muted">${AW(esc(e[1]))}</span><button class="btn sm ghost" data-say="${esc(e[0])}" aria-label="Dinle">${ICON.play}</button></div>`).join('')}</div>
  ${labs.length?`<div class="sec-h"><h2>Laboratuvarda çöz</h2></div><div class="slist" style="direction:rtl">${labs.map(([x,i])=>`<a class="btn sm" href="#lab/${i}"><span class="ar">${esc(x.s.map(t=>t.w.replace('ـ','')).join(' '))}</span></a>`).join('')}</div>`:''}
  <div class="sec-h"><div><h2>Mini sınav</h2><p class="muted small" style="margin:2px 0 0">%60 ile iki yıldız, tam puanla üç yıldız.</p></div><button class="btn sm" id="qr">Yeniden çöz</button></div>
  <div id="quiz"></div>
  <div class="lnav" style="margin-top:20px">${prev?`<a class="btn" href="#ders/${prev.id}">‹ ${esc(prev.t)}</a>`:'<span></span>'}${next?`<a class="btn pri" href="#ders/${next.id}">${esc(next.t)} ›</a>`:''}</div>`;
  $('#say').onclick=()=>speak(L.m.join(' '));
  $$('[data-say]').forEach(b=>b.onclick=()=>speak(b.dataset.say));
  const runQuiz=()=>{
    const qs=L.q.map(q=>{const idx=shuffle(q[1].map((_,i)=>i));return {q:q[0],o:idx.map(i=>q[1][i]),a:idx.indexOf(q[2]),ex:q[3]};});
    let done=0,ok=0;
    $('#quiz').innerHTML=qs.map((q,k)=>`<div class="qz" data-k="${k}"><div class="q">${k+1}. ${AW(esc(q.q))}</div><div class="opts">${q.o.map((o,j)=>`<button class="${isAr(o)?'opt ar1':'opt tr'}" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="fb"></div></div>`).join('');
    $$('#quiz .qz').forEach(box=>{const q=qs[+box.dataset.k];box.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{
      const good=+b.dataset.j===q.a;box.querySelectorAll('[data-j]').forEach(x=>{x.disabled=true;if(+x.dataset.j===q.a)x.classList.add('ok');});
      if(!good)b.classList.add('no');beep(good?'ok':'no');done++;if(good){ok++;addXP(4);}
      const fb=box.querySelector('.fb');fb.className='fb '+(good?'ok':'no');fb.innerHTML=(good?'Doğru! ':'Yanlış. ')+`<span style="font-weight:400">${AW(esc(q.ex))}</span>`;
      if(done===qs.length){const p=ok/qs.length;const r=S.les[id];if(p>(r.best||0)){r.best=p;save();}toast(`Sonuç: ${ok}/${qs.length}`+(p===1?' — tam puan!':''));if(p===1){confetti();beep('win');}checkBadges();}
    });});
  };
  runQuiz();$('#qr').onclick=runQuiz;
};
/* ===================== İ‘RÂB LABORATUVARI ===================== */
const JOIN='بتثجحخسشصضطظعغفقكلمنهيئـ';
const baseLast=w=>{const b=strip(w);return b[b.length-1];};
function sentHTML(sent,{virt=true,tags=false,colors=false}={}){
  const needV=virt&&sent.some(t=>t.a==='M'||t.a==='V');
  let h=needV?`<span class="tok virt" data-i="M" title="Ma‘nevî âmil">◇ ma‘nevî âmil</span>`:'';
  sent.forEach((t,i)=>{let w=t.w.replace('ـ','');const prev=sent[i-1];
    if(t.pre&&JOIN.includes(baseLast(t.w)))w=w+'‍';
    if(prev&&prev.pre&&JOIN.includes(baseLast(prev.w)))w='‍'+w;
    h+=`<button class="tok ${t.pre?'pre':''} ${colors?t.i:''}" data-i="${i}">${esc(w)}${tags?`<span class="tg">${esc(RO[t.r][0])}</span>`:''}</button>`;});
  return `<div class="sent">${h}</div>`;
}
function drawArcs(stage,list){
  const svg=stage.querySelector('svg.arcs');if(!svg)return;const sr=stage.getBoundingClientRect();
  let h=`<defs>${['r','n','j','z','b','g'].map(c=>`<marker id="ah-${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--c-${c==='g'?'amil':c})"/></marker>`).join('')}</defs>`;
  list.forEach(({f,t,c,hl})=>{const a=stage.querySelector(`[data-i="${f}"]`),b=stage.querySelector(`[data-i="${t}"]`);if(!a||!b)return;
    const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();
    const x1=ra.left+ra.width/2-sr.left,x2=rb.left+rb.width/2-sr.left,y1=ra.top-sr.top+4,y2=rb.top-sr.top+4;
    const dx=Math.abs(x1-x2);const top=Math.min(y1,y2)-Math.min(84,22+dx*.32);
    h+=`<path d="M${x1} ${y1} C ${x1} ${top}, ${x2} ${top}, ${x2} ${y2-2}" fill="none" stroke="var(--c-${c})" stroke-width="${hl?3:1.8}" stroke-opacity="${hl?1:.6}" marker-end="url(#ah-${c})" ${hl?'':'stroke-dasharray="5 4"'}/>`;});
  svg.innerHTML=h;
}
const amilKey=a=>a==='M'||a==='V'?'M':a;
function irabLabel(t){if(t.i==='b')return 'Mebnî';if(t.k==='m')return `${AL[t.al][0][0].toUpperCase()+AL[t.al][0].slice(1)} · mahallen ${IR[t.i][0].toLocaleLowerCase('tr')}`;return `${IR[t.i][0]} · ${AL[t.al][0]}${t.k==='t'?' (takdîrî)':''}`;}
function irabAr(t,sent){
  const role=t.ar||RO[t.r][1];
  if(t.i==='b')return `${role} مَبْنِيٌّ عَلَى ${AL[t.al][1]}، لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ`;
  if(t.k==='m')return `${role} مَبْنِيٌّ عَلَى ${AL[t.al][1]} فِي مَحَلِّ ${IR[t.i][3]}`;
  let s=`${role} ${IR[t.i][1]}`;
  if(t.r==='mecrur'&&typeof t.a==='number')s+=` بِـ(${strip(sent[t.a].w)})`;
  if(t.r==='mudIleyh')s=`${role} ${IR[t.i][1]}`;
  s+=` وَعَلَامَةُ ${IR[t.i][2]} ${AL[t.al][1]}`;
  if(AL[t.al][2])s+=t.k==='t'?' الْمُقَدَّرَةُ':' الظَّاهِرَةُ';
  return s;
}
const amilTR=(t,sent)=>t.a==='M'?'Ma‘nevî: lafzî âmillerden tecrîd (ibtidâ)':t.a==='V'?'Ma‘nevî: muzârinin isim yerine vukû‘u':typeof t.a==='number'?A(sent[t.a].w.replace('ـ','')):'— (ma‘mûl değil)';
const isTarget=t=>!['harf','fiil','ismFiil'].includes(t.r);
const ROLE_POOL=Object.keys(RO).filter(k=>!['harf','fiil','ismFiil'].includes(k));
const IRAB_POOL=[...new Set(LAB.flatMap(x=>x.s.filter(isTarget).map(irabLabel)))];
V.lab=([n])=>{
  let idx=n!=null&&LAB[+n]?+n:0;let mode='kesif',sel=null,all=true,tags=false;
  let q=null;
  const shell=()=>{
    const X=LAB[idx];
    app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">مُخْتَبَرُ الْإِعْرَابِ</div><h2>İ‘râb Laboratuvarı</h2></div><div class="seg"><button data-m="kesif" class="${mode==='kesif'?'on':''}">Keşfet</button><button data-m="coz" class="${mode==='coz'?'on':''}">Kendin çöz</button></div></div>
    <div class="slist">${LAB.map((x,i)=>`<button data-s="${i}" class="${i===idx?'on':''} ${S.lab[i]!=null?'done':''}">${i+1}</button>`).join('')}</div>
    <div class="labwrap"><div>
      <div class="stage2" id="stg"><svg class="arcs" aria-hidden="true"></svg>${sentHTML(X.s,{tags,colors:mode==='kesif'})}</div>
      <p class="small muted" style="text-align:center;margin-top:8px">“${esc(X.tr)}” · kitapta s. ${X.p}</p>
      ${mode==='kesif'?`<div class="irleg"><span style="color:var(--c-r)">● merfû</span><span style="color:var(--c-n)">● mansûb</span><span style="color:var(--c-j)">● mecrûr</span><span style="color:var(--c-z)">● meczûm</span><span style="color:var(--c-b)">● mebnî / âmil</span></div>
      <div class="row" style="justify-content:center;margin-top:10px"><button class="btn sm" id="all">${all?'Okları gizle':'Bütün okları göster'}</button><button class="btn sm" id="tg">${tags?'Etiketleri gizle':'Vazife etiketleri'}</button><button class="btn sm" id="say">${ICON.play} Dinle</button></div>`:''}
      <div class="row" style="justify-content:space-between;margin-top:12px"><button class="btn sm" id="pv" ${idx?'':'disabled'}>‹ Önceki cümle</button><button class="btn sm" id="nx" ${idx<LAB.length-1?'':'disabled'}>Sonraki cümle ›</button></div>
    </div><div class="ipanel" id="ip"></div></div>`;
    $$('[data-m]').forEach(b=>b.onclick=()=>{mode=b.dataset.m;sel=null;q=null;shell();});
    $$('[data-s]').forEach(b=>b.onclick=()=>{idx=+b.dataset.s;sel=null;q=null;history.replaceState(null,'','#lab/'+idx);shell();});
    $('#pv').onclick=()=>{idx--;sel=null;q=null;history.replaceState(null,'','#lab/'+idx);shell();};
    $('#nx').onclick=()=>{idx++;sel=null;q=null;history.replaceState(null,'','#lab/'+idx);shell();};
    if(mode==='kesif'){$('#all').onclick=()=>{all=!all;shell();};$('#tg').onclick=()=>{tags=!tags;shell();};$('#say').onclick=()=>speak(X.s.map(t=>t.w.replace('ـ','')).join(' '));kesif();}
    else coz();
    onResize=()=>arcs();
    requestAnimationFrame(arcs);
  };
  const arcs=()=>{const X=LAB[idx];const st=$('#stg');if(!st)return;const list=[];
    X.s.forEach((t,i)=>{if(t.a==null)return;const show=mode==='kesif'?(all||sel===i):(q&&q.reveal&&q.reveal.includes(i));if(!show)return;list.push({f:amilKey(t.a),t:i,c:t.i==='b'?'b':t.i,hl:sel===i});});
    drawArcs(st,list);};
  const kesif=()=>{
    const X=LAB[idx];
    const info=i=>{const t=X.s[i];
      $('#ip').innerHTML=`<div class="big">${esc(t.w.replace('ـ',''))}</div>
      <div class="irow"><span>Vazife</span><b>${esc(RO[t.r][0])}</b></div>
      <div class="irow"><span>Âmil</span><span>${amilTR(t,X.s)}</span></div>
      ${t.i==='b'&&!t.k?'':`<div class="irow"><span>İ‘râb</span><span>${esc(irabLabel(t))}</span></div>`}
      ${t.k&&t.i!=='b'?`<div class="irow"><span>Sıfatı</span><span>${KIND[t.k]}</span></div>`:''}
      ${t.note?`<p class="small muted" style="margin-top:8px">${AW(esc(t.note))}</p>`:''}
      <div class="irabtxt">${esc(irabAr(t,X.s))}</div>`;
      $$('#stg .tok').forEach(b=>b.classList.toggle('sel',b.dataset.i==String(i)));
      $$('#stg .tok').forEach(b=>b.classList.toggle('amil',typeof t.a==='number'&&b.dataset.i==String(t.a)||(t.a==='M'||t.a==='V')&&b.dataset.i==='M'));
    };
    if(sel==null)$('#ip').innerHTML=`<p class="muted small">Bir kelimeye dokun: vazifesini, âmilini, i‘râbını ve <b>Arapça i‘râb metnini</b> gör. Oklar <b>âmilden ma‘mûle</b> doğru çizilir; renk i‘râbı gösterir.</p><div class="irabtxt">${X.s.map(t=>`<div>• (${esc(strip(t.w))}): ${esc(irabAr(t,X.s))}.</div>`).join('')}</div>`;else info(sel);
    $$('#stg .tok:not(.virt)').forEach(b=>b.onclick=()=>{sel=+b.dataset.i;beep('tap');info(sel);arcs();});
  };
  const coz=()=>{
    const X=LAB[idx];const targets=X.s.map((t,i)=>i).filter(i=>isTarget(X.s[i]));
    if(!q)q={k:0,step:0,score:0,max:0,reveal:[]};
    const ip=$('#ip');
    const finish=()=>{const pct=q.max?Math.round(q.score/q.max*100):100;const prev=S.lab[idx];if(prev==null||pct>prev)S.lab[idx]=pct;save();addXP(Math.round(q.score*2));if(pct===100){confetti();beep('win');}
      ip.innerHTML=`<div style="text-align:center"><div class="eyebrow">Cümle çözüldü</div><div class="scorebig">%${pct}</div><p class="small">${q.score}/${q.max} adım doğru.</p><div class="irabtxt" style="text-align:right">${X.s.map(t=>`<div>• (${esc(strip(t.w))}): ${esc(irabAr(t,X.s))}.</div>`).join('')}</div><div class="row" style="justify-content:center;margin-top:10px">${idx<LAB.length-1?`<button class="btn pri" id="nxs">Sonraki cümle ${ICON.arrow}</button>`:''}<button class="btn" id="rp">Tekrar</button></div></div>`;
      if($('#nxs'))$('#nxs').onclick=()=>{idx++;q=null;history.replaceState(null,'','#lab/'+idx);shell();};$('#rp').onclick=()=>{q=null;shell();};checkBadges();};
    const step=()=>{
      if(q.k>=targets.length)return finish();
      const i=targets[q.k];const t=X.s[i];
      $$('#stg .tok').forEach(b=>{b.classList.toggle('h-target',b.dataset.i==String(i));b.classList.remove('sel','amil');});
      if(q.step===0&&(t.na||t.a==null)){q.step=1;}
      const head=`<div class="steps">${targets.map((_,k)=>`<i class="${k<q.k?'on':k===q.k?'on':''}" style="${k===q.k?'opacity:.55':''}"></i>`).join('')}</div><div class="big">${esc(t.w.replace('ـ',''))}</div>`;
      if(q.step===0){
        ip.innerHTML=head+`<p class="q">1. Bu kelimenin <b>âmili</b> hangisi?</p><p class="small muted">Cümlede âmil olan kelimeye dokun ya da ma‘nevî âmili seç.</p><button class="btn" id="man" style="width:100%">◇ Ma‘nevî âmil (lafızda yok)</button><div class="fb" id="fb"></div>`;
        const answer=v=>{const good=String(v)===String(amilKey(t.a));q.max++;if(good)q.score++;beep(good?'ok':'no');$('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Âmil: ')+amilTR(t,X.s);q.reveal.push(i);arcs();
          $$('#stg .tok').forEach(b=>b.onclick=null);$('#man').disabled=true;TIMERS.push(setTimeout(()=>{q.step=1;step();},good?900:1700));};
        $$('#stg .tok:not(.virt)').forEach(b=>b.onclick=()=>{if(+b.dataset.i===i){toast('Kelimenin kendisi kendi âmili olamaz.');return;}answer(+b.dataset.i);});
        $('#man').onclick=()=>answer('M');
      }else if(q.step===1){
        const opts=shuffle([t.r,...sample(ROLE_POOL.filter(r=>r!==t.r&&RO[r][0]!==RO[t.r][0]),3)]);
        ip.innerHTML=head+`<p class="q">2. <b>Vazifesi</b> nedir?</p><div class="opts" style="grid-template-columns:1fr">${opts.map(r=>`<button class="opt tr" data-r="${r}">${esc(RO[r][0])}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
        $$('#ip [data-r]').forEach(b=>b.onclick=()=>{const good=b.dataset.r===t.r;q.max++;if(good)q.score++;beep(good?'ok':'no');$$('#ip [data-r]').forEach(x=>{x.disabled=true;if(x.dataset.r===t.r)x.classList.add('ok');});if(!good)b.classList.add('no');
          if(!q.reveal.includes(i)){q.reveal.push(i);arcs();}TIMERS.push(setTimeout(()=>{q.step=2;step();},good?700:1500));});
      }else{
        const right=irabLabel(t);const opts=shuffle([right,...sample(IRAB_POOL.filter(x=>x!==right),3)]);
        ip.innerHTML=head+`<p class="q">3. <b>İ‘râbı</b> ve alâmeti?</p><div class="opts" style="grid-template-columns:1fr">${opts.map((o,j)=>`<button class="opt tr" data-o="${j}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
        $$('#ip [data-o]').forEach(b=>b.onclick=()=>{const good=opts[+b.dataset.o]===right;q.max++;if(good)q.score++;beep(good?'ok':'no');$$('#ip [data-o]').forEach(x=>{x.disabled=true;if(opts[+x.dataset.o]===right)x.classList.add('ok');});if(!good)b.classList.add('no');
          $('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=`<div class="irabtxt" style="font-weight:400">${esc(irabAr(t,X.s))}</div>`;
          const el=$(`#stg .tok[data-i="${i}"]`);if(el)el.classList.add(t.i);
          TIMERS.push(setTimeout(()=>{q.k++;q.step=0;step();},1900));});
      }
    };
    step();
  };
  shell();
};
/* ===================== HARİTALAR ===================== */
const amilsOf=g=>AMILS.filter(a=>a[1]===g);
const TREES={
 amil:{t:'Âmil',ar:'الْعَامِلُ',n:60,c:'var(--c-amil)',k:[
  {t:'Lafzî',ar:'لَفْظِيٌّ',n:58,k:[
   {t:'Semâî',ar:'سَمَاعِيٌّ',n:49,k:[
    {t:'İsimde amel eden',ar:'عَامِلٌ فِي الِاسْمِ',n:30,k:[
     {t:'Tek isimde: harf-i cer',ar:'حُرُوفُ الْجَرِّ',n:20,leafs:amilsOf('cer').map(a=>a[0]),l:'l4'},
     {t:'İki isimde',ar:'عَامِلٌ فِي اسْمَيْنِ',n:10,k:[
      {t:'Mansûbu önce (8)',ar:'مَنْصُوبُهُ قَبْلَ مَرْفُوعِهِ',n:8,k:[
       {t:'Fiile benzeyen harfler',ar:'الْمُشَبَّهَةُ بِالْفِعْلِ',n:6,leafs:amilsOf('muse').map(a=>a[0]),l:'l7'},
       {t:'Munkatı‘ istisnâda إِلَّا',ar:'إِلَّا',n:1,leafs:['إِلَّا'],l:'l10'},
       {t:'Lâ-yı nefy-i cins',ar:'لَا',n:1,leafs:['لَا'],l:'l10'}]},
      {t:'Merfûu önce (2)',ar:'مَرْفُوعُهُ قَبْلَ مَنْصُوبِهِ',n:2,leafs:['مَا','لَا'],l:'l11'}]}]},
    {t:'Muzâride amel eden',ar:'عَامِلٌ فِي الْمُضَارِعِ',n:19,k:[
     {t:'Nâsıb',ar:'النَّوَاصِبُ',n:4,leafs:amilsOf('nasb').map(a=>a[0]),l:'l12'},
     {t:'Câzim',ar:'الْجَوَازِمُ',n:15,k:[
      {t:'Tek fiili cezmeden',ar:'تَجْزِمُ فِعْلًا وَاحِدًا',n:4,leafs:amilsOf('cazm').slice(0,4).map(a=>a[0]),l:'l13'},
      {t:'İki fiili cezmeden (kelimü’l-mücâzât)',ar:'كَلِمُ الْمُجَازَاةِ',n:11,leafs:amilsOf('cazm').slice(4).map(a=>a[0]),l:'l13'}]}]}]},
   {t:'Kıyâsî',ar:'قِيَاسِيٌّ',n:9,leafs:amilsOf('kiy').map(a=>a[0]),l:'l14'}]},
  {t:'Ma‘nevî',ar:'مَعْنَوِيٌّ',n:2,leafs:amilsOf('man').map(a=>a[0]),l:'l21'}]},
 mamul:{t:'Ma‘mûl',ar:'الْمَعْمُولُ',n:30,c:'var(--c-mamul)',k:[
  {t:'Asaleten ma‘mûl',ar:'مَعْمُولٌ بِالْأَصَالَةِ',n:25,k:['raf','nasb','jarr','jazm'].map(g=>({t:MG[g][0],ar:MG[g][1],n:MG[g][2],leafs:MAMULS.filter(m=>m[2]===g).map(m=>m[1]),l:MAMULS.find(m=>m[2]===g)[3]}))},
  {t:'Tebean ma‘mûl (tâbiler)',ar:'مَعْمُولٌ بِالتَّبَعِيَّةِ',n:5,leafs:MAMULS.filter(m=>m[2]==='tabi').map(m=>m[1]),l:'l31'}]},
 irab:{t:'İ‘râbın taksimleri',ar:'تَقْسِيمَاتُ الْإِعْرَابِ',n:4,c:'var(--c-irab)',k:[
  {t:'1. Zâtına göre',ar:'بِحَسَبِ الذَّاتِ',n:10,l:'l33',k:[{t:'Hareke',ar:'حَرَكَةٌ',n:3,leafs:['ضَمَّةٌ','فَتْحَةٌ','كَسْرَةٌ']},{t:'Harf',ar:'حَرْفٌ',n:4,leafs:['وَاوٌ','أَلِفٌ','يَاءٌ','نُونٌ']},{t:'Hazf',ar:'حَذْفٌ',n:3,leafs:['حَذْفُ الْحَرَكَةِ','حَذْفُ الْآخِرِ','حَذْفُ النُّونِ']}]},
  {t:'2. Mahalline göre',ar:'بِحَسَبِ الْمَحَلِّ',n:9,l:'l34',k:[{t:'Saf harekelerle',ar:'بِالْحَرَكَاتِ الْمَحْضَةِ',n:3,leafs:['الْمُفْرَدُ وَالْمُكَسَّرُ الْمُنْصَرِفَانِ','غَيْرُ الْمُنْصَرِفِ','جَمْعُ الْمُؤَنَّثِ السَّالِمُ']},{t:'Saf harflerle',ar:'بِالْحُرُوفِ الْمَحْضَةِ',n:3,leafs:['الْأَسْمَاءُ السِّتَّةُ','جَمْعُ الْمُذَكَّرِ السَّالِمُ','الْمُثَنَّى']},{t:'Hareke + hazf',ar:'بِالْحَرَكَةِ مَعَ الْحَذْفِ',n:2,leafs:['الْمُضَارِعُ الصَّحِيحُ','الْمُضَارِعُ الْمُعْتَلُّ']},{t:'Harf + hazf',ar:'بِالْحُرُوفِ مَعَ الْحَذْفِ',n:1,leafs:['يَفْعَلَانِ، تَفْعَلُونَ…']}]},
  {t:'3. Nevine göre',ar:'بِحَسَبِ النَّوْعِ',n:4,l:'l36',k:[{t:'Ref‘',ar:'الرَّفْعُ',n:4,leafs:['ضَمَّةٌ','وَاوٌ','أَلِفٌ','نُونٌ']},{t:'Nasb',ar:'النَّصْبُ',n:5,leafs:['فَتْحَةٌ','كَسْرَةٌ','أَلِفٌ','يَاءٌ','حَذْفُ النُّونِ']},{t:'Cer',ar:'الْجَرُّ',n:3,leafs:['كَسْرَةٌ','فَتْحَةٌ','يَاءٌ']},{t:'Cezm',ar:'الْجَزْمُ',n:3,leafs:['حَذْفُ الْحَرَكَةِ','حَذْفُ الْآخِرِ','حَذْفُ النُّونِ']}]},
  {t:'4. Sıfatına göre',ar:'بِحَسَبِ الصِّفَةِ',n:3,l:'l37',k:[{t:'Lafzî',ar:'لَفْظِيٌّ',n:1,leafs:['جَاءَ زَيْدٌ']},{t:'Takdîrî (7 yer)',ar:'تَقْدِيرِيٌّ',n:7,leafs:['الْعَصَا','غُلَامِي','تَأَبَّطَ شَرًّا','الْقَاضِي','يَغْزُو','أَبُو الْقَاسِمِ','الْوَقْفُ']},{t:'Mahallî (2 yer)',ar:'مَحَلِّيٌّ',n:2,leafs:['مَرَرْتُ بِزَيْدٍ','الْمَبْنِيُّ']}]}]}
};
function treeHTML(n,c,depth=0){
  const has=n.k&&n.k.length;const open=depth<3;
  let h=`<li><button class="tn ${has||n.leafs?'':'leaf'}" style="--c:${c}" aria-expanded="${open}"><span class="car">▼</span><span>${esc(n.t)}</span><span class="ar">${esc(n.ar)}</span><span class="cnt">${n.n}</span>${n.l?`<a class="tiny" href="#ders/${n.l}" onclick="event.stopPropagation()">ders ›</a>`:''}</button>`;
  if(has||n.leafs){h+='<ul>';if(has)h+=n.k.map(x=>treeHTML(x,c,depth+1)).join('');if(n.leafs)h+=`<li><div class="leafs">${n.leafs.map(x=>`<span>${esc(x)}</span>`).join('')}</div></li>`;h+='</ul>';}
  return h+'</li>';
}
V.harita=([tab])=>{
  tab=tab||'amil';
  const tabs=[['amil','60 Âmil'],['mamul','30 Ma‘mûl'],['irab','İ‘râb'],['tablo','Tablolar']];
  let body='';
  if(tab==='tablo'){
    body=`<div class="row"><input class="search" id="q" placeholder="Ara: لَنْ، nâsıb, temyiz…" aria-label="Ara"></div>
    <h3 style="margin:16px 0 8px">60 âmil</h3><div class="tscroll"><table class="tbl bigtbl" style="--c:var(--c-amil)"><thead><tr><th>#</th><th>Âmil</th><th>Grup</th><th>Mânâ / not</th></tr></thead><tbody id="ta">${AMILS.map((a,i)=>`<tr data-s="${esc(strip(a[0])+' '+AG[a[1]][0]+' '+a[3]+' '+strip(a[2]))}"><td>${i+1}</td><td class="a">${esc(a[0])}</td><td><span class="gtag">${AG[a[1]][0]}</span></td><td><span class="ar">${esc(a[2])}</span> <span class="small muted">${esc(a[3])}</span></td></tr>`).join('')}</tbody></table></div>
    <h3 style="margin:16px 0 8px">30 ma‘mûl</h3><div class="tscroll"><table class="tbl bigtbl" style="--c:var(--c-mamul)"><thead><tr><th>#</th><th>Ma‘mûl</th><th>Türkçe</th><th>Grup</th></tr></thead><tbody id="tm">${MAMULS.map((m,i)=>`<tr data-s="${esc(strip(m[1])+' '+m[0]+' '+MG[m[2]][0])}" style="cursor:pointer" data-l="${m[3]}"><td>${i+1}</td><td class="a">${esc(m[1])}</td><td>${esc(m[0])}</td><td><span class="gtag">${MG[m[2]][0]}</span></td></tr>`).join('')}</tbody></table></div>`;
  }else{
    const T=TREES[tab];
    body=`<p class="muted small">Düğmelere dokunarak dalları aç/kapa. Sayılar kitaptaki sayımlardır.</p><div class="card" style="overflow-x:auto"><ul class="tr">${treeHTML(T,T.c)}</ul></div>
    ${tab==='amil'?`<p class="small" style="margin-top:10px"><b>Sağlama:</b> 20 + 6 + 1 + 1 + 2 + 4 + 15 = <b>49 semâî</b> · 9 kıyâsî · 2 ma‘nevî → <b>60</b>.</p>`:tab==='mamul'?`<p class="small" style="margin-top:10px"><b>Sağlama:</b> 9 + 13 + 2 + 1 = 25 asaleten · 5 tebean → <b>30</b>.</p>`:''}`;
  }
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">التَّقْسِيمُ</div><h2>Taksim haritaları</h2></div></div>
  <div class="filter" style="margin-bottom:12px">${tabs.map(([k,t])=>`<a class="btn sm ${k===tab?'pri':''}" href="#harita/${k}">${t}</a>`).join('')}</div>${body}`;
  $$('.tn').forEach(b=>b.onclick=()=>{if(b.classList.contains('leaf'))return;b.setAttribute('aria-expanded',b.getAttribute('aria-expanded')==='true'?'false':'true');beep('tap');});
  if($('#q'))$('#q').oninput=e=>{const v=strip(e.target.value.trim()).toLocaleLowerCase('tr');$$('#ta tr,#tm tr').forEach(r=>r.hidden=v&&!r.dataset.s.toLocaleLowerCase('tr').includes(v));};
  $$('#tm tr[data-l]').forEach(r=>r.onclick=()=>location.hash='#ders/'+r.dataset.l);
};
/* ===================== OYUNLAR ===================== */
const GAMES=[
 {id:'avci',ic:'target',t:'Âmil Avcısı',d:'Parlayan kelimenin âmilini cümlede avla. 10 tur.'},
 {id:'vazife',ic:'role',t:'Vazife Bil',d:'Kelime cümlede hangi vazifede? Fâil mi, hâl mi, temyiz mi?'},
 {id:'alamet',ic:'mark',t:'Alâmet Ustası',d:'İ‘râbı ve alâmeti söyle: damme, yâ, nun hazfi…'},
 {id:'inne',ic:'split',t:'Kesr mi Feth mi?',d:'Boşluğa إِنَّ mi, أَنَّ mi? Kitabın 21 yeri.'},
 {id:'muns',ic:'door',t:'Tenvîn Kapısı',d:'Kelime munsarif mi, gayr-i munsarif mi? Sebebini öğren.'},
 {id:'fa',ic:'bridge',t:'Fâ Köprüsü',d:'Şartın cevabına fâ girer mi? Vâcib, câiz, mümteni.'},
 {id:'kind',ic:'eye',t:'Görünen ve Gizli',d:'İ‘râb lafzî mi, takdîrî mi, mahallî mi?'},
 {id:'zamir',ic:'ghost',t:'Gizli Zamir',d:'Fâil vâciben mi, câizen mi müstetir, yoksa bâriz mi?'},
 {id:'yaris',ic:'bolt',t:'60 Âmil Yarışı',d:'60 saniye: âmili doğru gruba gönder.'},
 {id:'hafiza',ic:'mem',t:'Mânâ Hafızası',d:'Harf-i cerleri mânâlarıyla eşleştir.'}
];
V.oyun=([g])=>{
  if(g&&GAME[g]){S.played[g]=1;save();return GAME[g]();}
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Oyunlar</div><h2>Oynayarak pekiştir</h2></div></div><div class="gcards">${GAMES.map(x=>`<a class="gcard" href="#oyun/${x.id}"><div class="ico">${ICON[x.ic]}</div><h3>${x.t}</h3><p class="muted small">${x.d}</p><span class="tiny muted">${S.best[x.id]!=null?'Rekor: '+S.best[x.id]:'Henüz oynanmadı'}</span></a>`).join('')}</div>`;
};
const GAME={};
const gHead=t=>`<a class="btn sm ghost" href="#oyun">${ICON.back} Oyunlar</a><div class="stage" style="margin-top:12px"><div class="hud"><b>${t}</b><span class="small muted" id="gi"></span></div><div class="card" id="gc"></div></div>`;
function gameEnd(id,score,msg,again){
  const best=S.best[id];const nb=best==null||score>best;if(nb)S.best[id]=score;save();addXP(Math.round(score/2));beep('win');if(nb)confetti();
  $('#gc').innerHTML=`<div style="text-align:center"><div class="eyebrow">Oyun bitti</div><div class="scorebig">${score}</div><p>${msg}</p>${nb?'<p class="chip gold">Yeni rekor!</p>':`<p class="muted small">Rekor: ${best}</p>`}<div class="row" style="justify-content:center;margin-top:10px"><button class="btn pri" id="ag">Tekrar oyna</button><a class="btn" href="#oyun">Oyunlar</a></div></div>`;
  $('#ag').onclick=again;checkBadges();
}
/* Çoktan seçmeli tur motoru */
function mcGame(id,title,items,render,N=10){
  app.innerHTML=gHead(title);let n=0,sc=0,streak=0;const pool=shuffle(items).slice(0,N);
  const round=()=>{
    if(n>=pool.length)return gameEnd(id,sc,`${pool.length} turda ${sc} puan.`,()=>mcGame(id,title,items,render,N));
    const it=pool[n++];const R=render(it);$('#gi').textContent=`${n}/${pool.length} · Puan ${sc}`;
    $('#gc').innerHTML=`${R.html}<div class="opts" style="${R.cols?`grid-template-columns:repeat(${R.cols},1fr)`:''}">${R.opts.map((o,j)=>`<button class="${R.ar?'opt':'opt tr'}" data-j="${j}">${R.ar?esc(o):o}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('#gc [data-j]').forEach(b=>b.onclick=()=>{const good=+b.dataset.j===R.a;$$('#gc [data-j]').forEach(x=>{x.disabled=true;if(+x.dataset.j===R.a)x.classList.add('ok');});if(!good){b.classList.add('no');streak=0;}else{streak++;sc+=10+Math.min(streak,5)*2;}
      beep(good?'ok':'no');$('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Doğrusu gösterildi. ')+`<div class="small" style="font-weight:400">${R.ex||''}</div>`;if(R.after)R.after(good);TIMERS.push(setTimeout(round,good?1100:2200));});
  };round();
}
const LABT=[];LAB.forEach((x,si)=>x.s.forEach((t,ti)=>{if(isTarget(t))LABT.push({si,ti});}));
GAME.avci=()=>{
  app.innerHTML=gHead('Âmil Avcısı');let n=0,sc=0;const pool=sample(LABT.filter(o=>!LAB[o.si].s[o.ti].na&&LAB[o.si].s[o.ti].a!=null),10);
  const round=()=>{
    if(n>=pool.length)return gameEnd('avci',sc,'10 kelimede '+sc+' puan.',GAME.avci);
    const {si,ti}=pool[n++];const X=LAB[si],t=X.s[ti];$('#gi').textContent=`${n}/10 · Puan ${sc}`;
    $('#gc').innerHTML=`<p class="q" style="text-align:center">Parlayan kelimenin <b>âmilini</b> avla!</p><div class="stage2" id="stg" style="padding-top:90px"><svg class="arcs"></svg>${sentHTML(X.s)}</div><div class="fb" id="fb"></div>`;
    $(`#stg .tok[data-i="${ti}"]`).classList.add('h-target');
    const done=v=>{const good=String(v)===String(amilKey(t.a));beep(good?'ok':'no');if(good)sc+=10;$$('#stg .tok').forEach(b=>b.onclick=null);
      drawArcs($('#stg'),[{f:amilKey(t.a),t:ti,c:t.i,hl:1}]);const ae=$(`#stg .tok[data-i="${amilKey(t.a)}"]`);if(ae)ae.classList.add('sel');
      $('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'İsabet! ':'Âmil: ')+amilTR(t,X.s)+`<div class="small" style="font-weight:400">${esc(RO[t.r][0])} · ${esc(irabLabel(t))}</div>`;TIMERS.push(setTimeout(round,good?1400:2400));};
    $$('#stg .tok').forEach(b=>b.onclick=()=>{if(b.dataset.i===String(ti))return;done(b.dataset.i==='M'?'M':+b.dataset.i);});
    const v=$('#stg .tok.virt');if(v){v.style.cursor='pointer';}
  };round();
};
GAME.vazife=()=>mcGame('vazife','Vazife Bil',LABT,({si,ti})=>{const X=LAB[si],t=X.s[ti];const o=shuffle([t.r,...sample(ROLE_POOL.filter(r=>r!==t.r&&RO[r][0]!==RO[t.r][0]),3)]);
  return {html:`<p class="q" style="text-align:center">Altı çizili kelimenin vazifesi?</p><div class="qar" style="font-size:2rem">${X.s.map((x,i)=>i===ti?`<u style="color:var(--gold);text-underline-offset:10px">${esc(x.w.replace('ـ',''))}</u>`:esc(x.w.replace('ـ',''))).join(' ').replace(/ـ /g,'')}</div>`,opts:o.map(r=>esc(RO[r][0])),a:o.indexOf(t.r),ex:AW(esc(irabAr(t,X.s)))};});
GAME.alamet=()=>mcGame('alamet','Alâmet Ustası',LABT,({si,ti})=>{const X=LAB[si],t=X.s[ti];const r=irabLabel(t);const o=shuffle([r,...sample(IRAB_POOL.filter(x=>x!==r),3)]);
  return {html:`<p class="q" style="text-align:center">${A(X.s.map(x=>x.w.replace('ـ','')).join(' '))}</p><div class="qar">${esc(t.w.replace('ـ',''))}</div><p class="tiny muted" style="text-align:center">${esc(RO[t.r][0])}</p>`,opts:o.map(esc),a:o.indexOf(r),ex:AW(esc(irabAr(t,X.s)))};});
const fillInne=(s,w)=>s.replace(/___(ي)?/,(m,y)=>y?(w==='k'?'إِنِّي':'أَنِّي'):(w==='k'?'إِنَّ':'أَنَّ'));
GAME.inne=()=>mcGame('inne','Kesr mi Feth mi?',INNE,it=>{const o=['k','f','b'];
  return {html:`<p class="q" style="text-align:center">Boşluğa hangisi gelir?</p><div class="qar" style="font-size:2rem">${esc(it[0]).replace(/___/,'<span class="fill">؟</span>')}</div>`,opts:['إِنَّ (kesre)','أَنَّ (fetha)','İkisi de câiz'],a:o.indexOf(it[1]),cols:3,ex:`${A(it[1]==='b'?fillInne(it[0],'k')+' / '+fillInne(it[0],'f'):fillInne(it[0],it[1]))} — ${esc(it[2])} (s. ${it[3]})`};},14);
GAME.muns=()=>mcGame('muns','Tenvîn Kapısı',MUNS,it=>{const o=['m','g','c'];return {html:`<p class="q" style="text-align:center">Bu isim nasıl?</p><div class="qar">${esc(it[0])}</div>`,opts:['Munsarif','Gayr-i munsarif','İkisi de câiz'],a:o.indexOf(it[1]),cols:3,ex:esc(it[2])};},12);
GAME.fa=()=>mcGame('fa','Fâ Köprüsü',FAA,it=>{const o=['v','y','c'];return {html:`<p class="q" style="text-align:center">Cevaba <b>fâ</b> (فَـ) girer mi?</p><div class="qar" style="font-size:1.8rem">${esc(it[0])} <span class="fill">…</span> ${esc(it[1])}</div>`,opts:['Fâ vâcib','Fâ giremez','İkisi de câiz'],a:o.indexOf(it[2]),cols:3,ex:esc(it[3])};},12);
GAME.kind=()=>mcGame('kind','Görünen ve Gizli',KINDQ,it=>{const o=['l','t','m'];return {html:`<p class="q" style="text-align:center">Altı çizili kelimenin i‘râbı nasıl?</p><div class="qar" style="font-size:2rem">${esc(it[0]).replace(esc(it[1]),`<u style="color:var(--gold);text-underline-offset:10px">${esc(it[1])}</u>`)}</div>`,opts:['Lafzî','Takdîrî','Mahallî'],a:o.indexOf(it[2]),cols:3,ex:esc(it[3])};},12);
GAME.zamir=()=>mcGame('zamir','Gizli Zamir',ZAM,it=>{const o=['v','c','b'];return {html:`<p class="q" style="text-align:center">${it[3]?`${A(it[3])} kelimesinin `:''}fâil zamiri nasıl?</p><div class="qar">${esc(it[0])}</div>`,opts:['Vâciben müstetir','Câizen müstetir','Bâriz'],a:o.indexOf(it[1]),cols:3,ex:AW(esc(it[2]))};},12);
GAME.yaris=()=>{
  app.innerHTML=gHead('60 Âmil Yarışı');let sc=0,left=60,cur;
  const bins=['cer','muse','nasb','cazm','oth','kiy','man'];const BN={oth:['Diğer semâî','إِلَّا · لَا · مَا']};
  const grp=a=>['ill','lnc','mala'].includes(a[1])?'oth':a[1];
  const next=()=>{cur=pick(AMILS);draw();};
  const draw=()=>{$('#gc').innerHTML=`<div class="hud"><span class="timer ${left<=10?'low':''}" id="tm">⏱ ${left} sn</span><b>Puan ${sc}</b></div><div class="qar">${esc(cur[0])}</div><p class="tiny muted" style="text-align:center">${esc(cur[3])}</p><div class="bins">${bins.map(k=>`<button class="bin" data-k="${k}"><b>${(BN[k]||AG[k])[0]}</b><span class="ar">${esc(k==='oth'?BN.oth[1]:AG[k][1])}</span></button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('[data-k]').forEach(b=>b.onclick=()=>{const ok=b.dataset.k===grp(cur);b.classList.add(ok?'ok':'no');$$('[data-k]').forEach(x=>x.disabled=true);if(ok){sc+=10;beep('ok');}else{beep('no');left=Math.max(0,left-3);$(`[data-k="${grp(cur)}"]`).classList.add('ok');}TIMERS.push(setTimeout(next,ok?350:1100));});};
  next();
  TIMERS.push(setInterval(()=>{left--;const t=$('#tm');if(t){t.textContent='⏱ '+left+' sn';t.classList.toggle('low',left<=10);}if(left<=0){stopTimers();gameEnd('yaris',sc,'60 saniyede '+sc/10+' âmil doğru gruba gitti.',GAME.yaris);}},1000));
};
GAME.hafiza=()=>{
  app.innerHTML=gHead('Mânâ Hafızası');const seen=new Set();
  const ps=shuffle(amilsOf('cer')).filter(a=>{if(seen.has(a[2]))return false;seen.add(a[2]);return true;}).slice(0,6);
  const cards=shuffle(ps.flatMap((a,k)=>[{id:k,t:a[0]},{id:k,t:a[2]}]));let open=[],done=0,moves=0,lock=false;
  const draw=()=>{$('#gc').innerHTML=`<p class="tiny muted" style="text-align:center">Harf-i ceri metindeki mânâsıyla eşleştir. Hamle: <b>${moves}</b></p><div class="mem">${cards.map((c,i)=>`<button class="mc ${c.done?'done':''} ${open.includes(i)?'open':''}" data-i="${i}" aria-label="Kart ${i+1}"><span>${esc(c.t)}</span><span class="back">✦</span></button>`).join('')}</div>`;
    $$('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,c=cards[i];if(lock||c.done||open.includes(i))return;open.push(i);beep('tap');
      if(open.length===2){moves++;const [a,b2]=open.map(j=>cards[j]);if(a.id===b2.id){a.done=b2.done=true;done++;open=[];beep('ok');if(done===ps.length){draw();return gameEnd('hafiza',Math.max(10,100-(moves-6)*6),moves+' hamlede tamamlandı.',GAME.hafiza);}}else{lock=true;draw();TIMERS.push(setTimeout(()=>{open=[];lock=false;draw();},950));return;}}
      draw();});};
  draw();
};
/* ===================== KARTLAR ===================== */
const DECKS={
 amil:{t:'60 Âmil',items:AMILS.map(a=>({f:a[0],b:`<b>${AG[a[1]][0]}</b><div class="ar" style="font-size:1.3rem">${esc(a[2])}</div><div class="small muted">${esc(a[3])}</div>`}))},
 mamul:{t:'30 Ma‘mûl',items:MAMULS.map(m=>({f:m[1],b:`<b>${esc(m[0])}</b><div class="small muted">${MG[m[2]][0]}</div>`}))},
 terim:{t:'Ta‘rîfât',items:TERMS.map(t=>({f:t[0],b:`<div class="ar" style="font-size:1.2rem">${esc(t[1])}</div><div class="small muted" style="margin-top:6px">${esc(t[2])}</div>`}))}
};
V.kart=([dk])=>{
  dk=DECKS[dk]?dk:'amil';const D=DECKS[dk];
  const box=i=>S.cards[dk+i]||0;
  const due=()=>{const min=Math.min(...D.items.map((_,i)=>box(i)));return pick(D.items.map((_,i)=>i).filter(i=>box(i)===min));};
  let cur=due(),flip=false;
  const draw=()=>{const it=D.items[cur];const bx=[0,1,2,3,4].map(k=>D.items.filter((_,i)=>box(i)===k).length);
    app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Kart destesi · Leitner</div><h2>${D.t}</h2></div></div>
    <div class="filter" style="margin-bottom:10px">${Object.entries(DECKS).map(([k,d])=>`<a class="btn sm ${k===dk?'pri':''}" href="#kart/${k}">${d.t}</a>`).join('')}</div>
    <div class="stage"><div class="hud"><span class="small muted">Kutular: ${bx.map((n,i)=>`${i+1}:${n}`).join(' · ')}</span></div>
    <div class="flash ${flip?'flip':''}" id="fc"><div class="in"><div class="face"><div class="qar">${esc(it.f)}</div><p class="muted small">Grubu ve mânâsı? Kartı çevir.</p></div><div class="face bk">${it.b}</div></div></div>
    <div class="row" style="justify-content:center"><button class="btn" id="fl">Çevir</button><button class="btn" id="no" ${flip?'':'disabled'}>Tekrar et</button><button class="btn pri" id="ok" ${flip?'':'disabled'}>Bildim</button><button class="btn ghost" id="sy">${ICON.play}</button></div>
    <p class="tiny muted" style="text-align:center">Bildiğin kart bir üst kutuya geçer; bilemediğin ilk kutuya döner. Alt kutudakiler önce gelir.</p></div>`;
    $('#fc').onclick=$('#fl').onclick=()=>{flip=!flip;draw();};$('#sy').onclick=()=>speak(it.f);
    $('#ok').onclick=()=>{S.cards[dk+cur]=Math.min(4,box(cur)+1);save();addXP(2);beep('ok');cur=due();flip=false;draw();};
    $('#no').onclick=()=>{S.cards[dk+cur]=0;save();beep('tap');cur=due();flip=false;draw();};};
  draw();
};
/* ===================== SINAV ===================== */
const TAGS={ders:'Metin ve tarifler',amil:'Âmil tespiti',agrup:'Âmil grupları',inne:'إِنَّ / أَنَّ',vazife:'Ma‘mûl vazifesi',mgrup:'Ma‘mûl grupları',fa:'Cevapta fâ',zamir:'Zamirler',irab:'İ‘râb ve alâmet',muns:'Gayr-i munsarif',kind:'Lafzî/takdîrî/mahallî'};
function genExam(scopes,count){
  const gens=[];const B=b=>scopes.includes(b);
  const lessonQ=()=>{const L=pick(LESSONS.filter(l=>B(l.b===0?1:l.b)));const q=pick(L.q);return {tag:'ders',b:L.b||1,q:AW(esc(q[0])),o:q[1],a:q[2],ex:AW(esc(q[3]))+` <span class="muted">(Ders: ${esc(L.t)})</span>`};};
  if(B(1)){
    gens.push(lessonQ);
    gens.push(()=>{const o0=pick(LABT.filter(o=>!LAB[o.si].s[o.ti].na&&LAB[o.si].s[o.ti].a!=null));const X=LAB[o0.si],t=X.s[o0.ti];const right=t.a==='M'||t.a==='V'?'Ma‘nevî âmil':strip(X.s[t.a].w);
      const others=[...new Set(X.s.filter((x,i)=>i!==o0.ti).map(x=>strip(x.w)))].filter(x=>x!==right);const o=shuffle([right,...sample(others.concat(['Ma‘nevî âmil']).filter(x=>x!==right),3)]);if(o.length<3)return null;
      return {tag:'amil',b:1,q:`${A(X.s.map(x=>x.w.replace('ـ','')).join(' '))} cümlesinde ${A(t.w.replace('ـ',''))} kelimesinin âmili hangisidir?`,o,a:o.indexOf(right),ex:amilTR(t,X.s)};});
    gens.push(()=>{const a=pick(AMILS);const gl=g=>['ill','lnc','mala'].includes(g)?'Diğer semâî (إِلَّا/لَا/مَا)':AG[g][0];const right=gl(a[1]);const o=shuffle([right,...sample([...new Set(Object.keys(AG).map(gl))].filter(x=>x!==right),3)]);
      return {tag:'agrup',b:1,q:`${A(a[0])} <span class="small muted">(${esc(a[3])})</span> hangi âmil grubundandır?`,o,a:o.indexOf(right),ex:`${AG[a[1]][0]} — ${A(a[2])}`};});
    gens.push(()=>{const it=pick(INNE);const o=['إِنَّ (kesre)','أَنَّ (fetha)','İkisi de câiz'];return {tag:'inne',b:1,q:`Boşluğa hangisi gelir? ${A(it[0].replace('___','…'))}`,o,a:['k','f','b'].indexOf(it[1]),ex:esc(it[2])};});
  }
  if(B(2)){
    gens.push(lessonQ);
    gens.push(()=>{const o0=pick(LABT);const X=LAB[o0.si],t=X.s[o0.ti];const o=shuffle([t.r,...sample(ROLE_POOL.filter(r=>r!==t.r&&RO[r][0]!==RO[t.r][0]),3)]);
      return {tag:'vazife',b:2,q:`${A(X.s.map(x=>x.w.replace('ـ','')).join(' '))} cümlesinde ${A(t.w.replace('ـ',''))} kelimesinin vazifesi nedir?`,o:o.map(r=>RO[r][0]),a:o.indexOf(t.r),ex:A(irabAr(t,X.s))};});
    gens.push(()=>{const m=pick(MAMULS);const o=['raf','nasb','jarr','jazm','tabi'];const oo=shuffle(o).slice(0,4);if(!oo.includes(m[2]))oo[0]=m[2];const op=shuffle(oo);
      return {tag:'mgrup',b:2,q:`${A(m[1])} (${esc(m[0])}) hangi ma‘mûl grubundadır?`,o:op.map(g=>MG[g][0]),a:op.indexOf(m[2]),ex:`${MG[m[2]][0]} (${MG[m[2]][2]})`};});
    gens.push(()=>{const it=pick(FAA);return {tag:'fa',b:2,q:`${A(it[0]+' … '+it[1])} — cevaba fâ girer mi?`,o:['Fâ vâcib','Fâ giremez','İkisi de câiz'],a:['v','y','c'].indexOf(it[2]),ex:esc(it[3])};});
    gens.push(()=>{const it=pick(ZAM);return {tag:'zamir',b:2,q:`${A(it[0])}${it[3]?' ('+A(it[3])+')':''}: fâil zamiri nasıldır?`,o:['Vâciben müstetir','Câizen müstetir','Bâriz'],a:['v','c','b'].indexOf(it[1]),ex:AW(esc(it[2]))};});
  }
  if(B(3)){
    gens.push(lessonQ);
    gens.push(()=>{const o0=pick(LABT);const X=LAB[o0.si],t=X.s[o0.ti];const r=irabLabel(t);const o=shuffle([r,...sample(IRAB_POOL.filter(x=>x!==r),3)]);
      return {tag:'irab',b:3,q:`${A(X.s.map(x=>x.w.replace('ـ','')).join(' '))} cümlesinde ${A(t.w.replace('ـ',''))} kelimesinin i‘râbı?`,o,a:o.indexOf(r),ex:A(irabAr(t,X.s))};});
    gens.push(()=>{const it=pick(MUNS);return {tag:'muns',b:3,q:`${A(it[0])} kelimesi nasıldır?`,o:['Munsarif','Gayr-i munsarif','Sarf ve men‘ câiz'],a:['m','g','c'].indexOf(it[1]),ex:esc(it[2])};});
    gens.push(()=>{const it=pick(KINDQ);return {tag:'kind',b:3,q:`${A(it[0])} cümlesinde ${A(it[1])}’in i‘râbı nasıldır?`,o:['Lafzî','Takdîrî','Mahallî'],a:['l','t','m'].indexOf(it[2]),ex:esc(it[3])};});
  }
  const out=[],keys=new Set();let guard=0;
  while(out.length<count&&guard++<count*50){const q=pick(gens)();if(!q||q.a<0)continue;if(keys.has(q.q))continue;keys.add(q.q);const idx=shuffle(q.o.map((_,i)=>i));q.o=idx.map(i=>q.o[i]);q.a=idx.indexOf(q.a);out.push(q);}
  return out;
}
let EX=null;
V.sinav=([sub])=>{
  if(sub==='run'&&EX&&!EX.done)return examRun();
  if(sub==='sonuc'&&EX&&EX.done)return examResult();
  if(sub==='belge'&&EX&&EX.done)return examCert();
  const hist=S.exams.slice(-8).reverse();
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">الِامْتِحَانُ</div><h2>Sınav</h2></div></div>
  <div class="grid g2"><div class="card"><h3>Sınavı hazırla</h3>
    <div class="field" style="margin-top:10px"><label for="nm">Adın (belge için)</label><input id="nm" value="${esc(S.name||'')}" placeholder="Ad Soyad" maxlength="60"></div>
    <p class="small" style="margin:12px 0 6px"><b>Kapsam</b></p>
    <div class="grid" style="gap:6px">${[1,2,3].map(b=>`<label class="check"><input type="checkbox" value="${b}" checked><span>${BABS3[b].tr}${b===1?' (mukaddime dâhil)':''}</span></label>`).join('')}</div>
    <div class="row" style="margin-top:12px"><div class="field"><label for="qn">Soru sayısı</label><select id="qn"><option>10</option><option selected>20</option><option>30</option><option>40</option><option>50</option></select></div>
    <div class="field"><label for="tm">Süre</label><select id="tm"><option value="0">Süresiz</option><option value="10">10 dk</option><option value="20" selected>20 dk</option><option value="30">30 dk</option><option value="45">45 dk</option></select></div></div>
    <div class="row" style="margin-top:14px"><button class="btn pri" id="go">Sınavı başlat ${ICON.arrow}</button></div></div>
  <div class="card"><h3>Soru türleri</h3><ul class="small muted" style="padding-inline-start:18px;margin:8px 0 0">${Object.values(TAGS).map(t=>`<li>${t}</li>`).join('')}</ul>
    <p class="small" style="margin-top:12px"><b>Değerlendirme:</b> 85+ Pekiyi · 70+ İyi · 60+ Orta · 50+ Geçer · altı Tekrar.</p>
    ${hist.length?`<h3 style="margin-top:14px">Geçmiş</h3><div class="bars" style="margin-top:8px">${hist.map(e=>`<div><span class="small">${new Date(e.at).toLocaleDateString('tr-TR')} · ${e.n} soru</span><div class="pbar"><i style="width:${e.pct}%"></i></div><b>%${e.pct}</b></div>`).join('')}</div>`:''}</div></div>`;
  $('#go').onclick=()=>{const sc=$$('.check input:checked').map(x=>+x.value);if(!sc.length){toast('En az bir bâb seç.');return;}S.name=$('#nm').value.trim();save();
    const qs=genExam(sc,+$('#qn').value);EX={qs,ans:qs.map(()=>null),flag:qs.map(()=>false),i:0,start:Date.now(),limit:+$('#tm').value*60,done:false,sc};location.hash='#sinav/run';};
};
function examRun(){
  const draw=()=>{const q=EX.qs[EX.i];
    app.innerHTML=`<div class="stage"><div class="hud"><b>Soru ${EX.i+1}/${EX.qs.length}</b><span class="chip">${TAGS[q.tag]}</span><span class="timer" id="tm"></span></div>
    <div class="pbar"><i style="width:${EX.ans.filter(a=>a!==null).length/EX.qs.length*100}%"></i></div>
    <div class="card" style="margin-top:12px"><div class="q">${q.q}</div><div class="opts">${q.o.map((o,j)=>`<button class="${isAr(o)?'opt':'opt tr'} ${EX.ans[EX.i]===j?'picked':''}" data-j="${j}">${esc(o)}</button>`).join('')}</div>
    <div class="row" style="justify-content:space-between;margin-top:14px"><button class="btn sm" id="pv" ${EX.i?'':'disabled'}>‹ Önceki</button><button class="btn sm ghost" id="fg">${EX.flag[EX.i]?'⚑ İşareti kaldır':'⚐ Sonra bak'}</button>${EX.i<EX.qs.length-1?'<button class="btn sm pri" id="nx">Sonraki ›</button>':'<button class="btn sm pri" id="fin">Bitir</button>'}</div></div>
    <div class="qnav">${EX.qs.map((_,j)=>`<button data-n="${j}" class="${EX.ans[j]!==null?'ans':''} ${j===EX.i?'cur':''} ${EX.flag[j]?'flag':''}">${j+1}</button>`).join('')}</div>
    <div class="row" style="margin-top:12px"><button class="btn sm ghost" id="fin2">Sınavı bitir</button><button class="btn sm ghost" id="quit">Vazgeç</button></div></div>`;
    $$('[data-j]').forEach(b=>b.onclick=()=>{EX.ans[EX.i]=+b.dataset.j;beep('tap');if(EX.i<EX.qs.length-1)EX.i++;draw();});
    $('#pv').onclick=()=>{EX.i--;draw();};if($('#nx'))$('#nx').onclick=()=>{EX.i++;draw();};
    $('#fg').onclick=()=>{EX.flag[EX.i]=!EX.flag[EX.i];draw();};$$('[data-n]').forEach(b=>b.onclick=()=>{EX.i=+b.dataset.n;draw();});
    const fin=()=>{const bl=EX.ans.filter(a=>a===null).length;if(bl&&!confirm(bl+' soru boş. Yine de bitirilsin mi?'))return;finishExam();};
    if($('#fin'))$('#fin').onclick=fin;$('#fin2').onclick=fin;$('#quit').onclick=()=>{if(confirm('Sınav iptal edilsin mi?')){EX=null;location.hash='#sinav';}};tick();};
  const tick=()=>{const t=$('#tm');if(!t)return;const el=Math.floor((Date.now()-EX.start)/1000);if(EX.limit){const l=EX.limit-el;if(l<=0){finishExam();return;}t.textContent='⏱ '+Math.floor(l/60)+':'+String(l%60).padStart(2,'0');t.classList.toggle('low',l<60);}else t.textContent='⏱ '+Math.floor(el/60)+':'+String(el%60).padStart(2,'0');};
  TIMERS.push(setInterval(tick,1000));draw();
}
function finishExam(){stopTimers();const n=EX.qs.length,c=EX.qs.filter((q,i)=>EX.ans[i]===q.a).length;EX.done=true;EX.c=c;EX.pct=Math.round(c/n*100);EX.time=Math.floor((Date.now()-EX.start)/1000);
  S.exams.push({at:Date.now(),n,c,pct:EX.pct});S.exams=S.exams.slice(-30);save();addXP(c*5);if(EX.pct>=85){confetti();beep('win');}location.hash='#sinav/sonuc';}
const grade=p=>p>=85?'Pekiyi':p>=70?'İyi':p>=60?'Orta':p>=50?'Geçer':'Tekrar';
function examResult(){
  const tags={},bs={};EX.qs.forEach((q,i)=>{const ok=EX.ans[i]===q.a;const t=tags[q.tag]=tags[q.tag]||{n:0,c:0};t.n++;if(ok)t.c++;const b=bs[q.b]=bs[q.b]||{n:0,c:0};b.n++;if(ok)b.c++;});
  const bar=(lab,v)=>`<div><span>${lab}</span><div class="pbar"><i style="width:${v.c/v.n*100}%;background:${v.c/v.n>=.7?'var(--good)':v.c/v.n>=.5?'var(--gold)':'var(--bad)'}"></i></div><b>${v.c}/${v.n}</b></div>`;
  app.innerHTML=`<div class="stage"><div class="card" style="text-align:center"><div class="eyebrow">Sınav sonucu</div><div class="scorebig">%${EX.pct}</div><p><b>${grade(EX.pct)}</b> · ${EX.c}/${EX.qs.length} doğru · ${Math.floor(EX.time/60)} dk ${EX.time%60} sn</p>
    <div class="row" style="justify-content:center"><button class="btn pri" id="cert">Başarı belgesi</button>${EX.c<EX.qs.length?'<button class="btn" id="wr">Yanlışlarla yeni sınav</button>':''}<a class="btn" href="#sinav">Yeni sınav</a></div></div>
  <div class="card" style="margin-top:12px"><h3>Bâb raporu</h3><div class="bars" style="margin-top:10px">${Object.entries(bs).map(([b,v])=>bar(BABS3[b].short,v)).join('')}</div><h3 style="margin-top:14px">Konu raporu</h3><div class="bars" style="margin-top:10px">${Object.entries(tags).map(([k,v])=>bar(TAGS[k],v)).join('')}</div></div>
  <div class="card" style="margin-top:12px"><h3>Cevap anahtarı</h3>${EX.qs.map((q,i)=>{const ok=EX.ans[i]===q.a;const sh=x=>isAr(x)?A(x):esc(x);return `<div class="rev ${ok?'ok':'no'}"><div class="small"><b>${i+1}.</b> ${q.q}</div><div class="small" style="margin-top:4px">${ok?'✓':'✗'} Cevabın: ${EX.ans[i]===null?'<i>boş</i>':sh(q.o[EX.ans[i]])}${ok?'':` · Doğrusu: <b>${sh(q.o[q.a])}</b>`}</div><div class="tiny muted" style="margin-top:2px">${q.ex}</div></div>`;}).join('')}</div></div>`;
  $('#cert').onclick=()=>location.hash='#sinav/belge';
  if($('#wr'))$('#wr').onclick=()=>{const w=EX.qs.filter((q,i)=>EX.ans[i]!==q.a).map(q=>Object.assign({},q));EX={qs:w,ans:w.map(()=>null),flag:w.map(()=>false),i:0,start:Date.now(),limit:0,done:false,sc:EX.sc};location.hash='#sinav/run';};
}
function examCert(){
  const d=new Date().toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});
  app.innerHTML=`<div class="stage"><div class="cert"><div class="kufi">إِظْهَارُ الْأَسْرَارِ</div><div class="eyebrow" style="margin-top:6px">Başarı Belgesi</div>
  <h2 style="margin-top:10px">${esc(S.name||'Değerli öğrenci')}</h2><p>Esrâr Rasathânesi programında İmam Birgivî’nin <b>İzhâru’l-Esrâr</b> sınavını <b>${EX.qs.length}</b> soruda <b>%${EX.pct}</b> başarı ile tamamlamış ve <b>“${grade(EX.pct)}”</b> derecesini almıştır.</p>
  <p class="muted small">${d} · Rütbe: ${lvl().name} · Parlayan yıldız: ${LESSONS.filter(l=>lstar(l.id)).length}/39</p>
  <p class="small" style="margin-top:16px"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p></div>
  <div class="row noprint" style="justify-content:center;margin-top:14px"><button class="btn pri" id="pr">Yazdır / PDF</button><a class="btn" href="#sinav/sonuc">Sonuca dön</a></div></div>`;
  $('#pr').onclick=()=>window.print();
}
/* ===================== PROGRAM HAKKINDA ===================== */
V.hakkinda=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">عَنِ الْبَرْنَامَجِ</div><h2>Program hakkında</h2></div></div>
  <div class="card" style="text-align:center;padding:28px 18px">
    <div class="kufi" style="font-family:var(--f-kufi);font-size:2rem;color:var(--gold);direction:rtl">إِظْهَارُ الْأَسْرَارِ</div>
    <p style="margin-top:14px;font-size:1.05rem"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p>
    <p class="muted">Kaynak: İmam Birgivî, <i>İzhâru’l-Esrâr fi’n-Nahv</i> (Dâru’l-Minhâc, 2009)</p>
    <p class="muted">© 2026 Hüseyin KAYA · İstifade edilmesi temennisiyle…</p>
  </div>
  <div class="card" style="margin-top:14px"><h3>İçindekiler</h3><ul class="small" style="padding-inline-start:18px;margin:8px 0 0;line-height:1.8">
    <li><b>${LESSONS.length} ders</b>: kitabın harekeli metni, Türkçe şerh, misaller ve ${LESSONS.reduce((a,l)=>a+l.q.length,0)} soruluk mini sınavlar</li>
    <li><b>İ‘râb Laboratuvarı</b>: kitabın misallerinden ${LAB.length} cümle, âmil→ma‘mûl okları ve Arapça i‘râb metni</li>
    <li><b>Taksim haritaları</b>: 60 âmil, 30 ma‘mûl ve i‘râbın dört taksimi</li>
    <li><b>${GAMES.length} oyun</b>, kart destesi ve raporlu sınav</li></ul>
    <p class="small muted" style="margin-top:10px">Program tek bir dosyadır ve internet bağlantısı olmadan çalışır. İlerlemeniz yalnızca bu cihazda saklanır.</p></div>`;
};
/* ---------- başlat ---------- */
document.documentElement.lang='tr';
themeBtn();sndBtn();hud();route();
