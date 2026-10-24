ICON.coin='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5" stroke-dasharray="2 2"/></svg>';
ICON.fire='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-9 0 4-4 6-4 12 0 4 3 8 7 8z"/></svg>';
ICON.gear='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>';
ICON.tree='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v6M12 9l-6 5v5M12 9l6 5v5M12 9v10"/></svg>';
/* ---------- rozetler ---------- */
const BADGES=[
 ['ilk','İlk Sikke','İlk dersi oku',()=>Object.keys(S.les).length>0],
 ['k1','Bâblar Tepsisi','Bâblar kısmında her derste 2+ yıldız',()=>LESSONS.filter(l=>l.k===1).every(l=>lstar(l.id)>=2)],
 ['k2','Altı Vecih','Altı vecih kısmında her derste 2+ yıldız',()=>LESSONS.filter(l=>l.k===2).every(l=>lstar(l.id)>=2)],
 ['k3','Sahîh Ayar','Sahîhin tasrîfi kısmında 2+ yıldız',()=>LESSONS.filter(l=>l.k===3).every(l=>lstar(l.id)>=2)],
 ['k4','Fevâid','Fevâid kısmında 2+ yıldız',()=>LESSONS.filter(l=>l.k===4).every(l=>lstar(l.id)>=2)],
 ['k5','Mu‘tellât','Mu‘tellât kısmında 2+ yıldız',()=>LESSONS.filter(l=>l.k===5).every(l=>lstar(l.id)>=2)],
 ['darp','Sikkezen','Darphâne’de 5 farklı kök bas',()=>Object.keys(S.darp).length>=5],
 ['ocak10','Ocakçı','İ‘lâl Ocağı’nda 10 dönüşümü kendin yap',()=>Object.keys(S.ilal).length>=10],
 ['ocakall','Simyager','Bütün dönüşümleri kendin yap',()=>ILAL.every((_,i)=>S.ilal[i]!=null)],
 ['sinav','Mümtaz','Bir sınavdan %90 ve üstü al',()=>S.exams.some(e=>e.pct>=90)],
 ['oyun','Oyun Ehli','Bütün oyunları oyna',()=>GAMES.every(g=>S.played[g.id])],
 ['seri','Devamlılık','3 gün üst üste çalış',()=>S.streak>=3],
 ['tam','Altın Vitrin','Bütün sikkeler altın (3 yıldız)',()=>LESSONS.every(l=>lstar(l.id)===3)]
];
function checkBadges(){BADGES.forEach(([id,t,,f])=>{if(!S.badges[id]&&f()){S.badges[id]=1;save();toast('Rozet kazandın: '+t);beep('win');}});}
/* ---------- yönlendirme ---------- */
const V={};let TIMERS=[];
function stopTimers(){TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);});TIMERS=[];onResize=null;}
let onResize=null;addEventListener('resize',()=>{if(onResize)onResize();});
function route(){
  stopTimers();
  const h=(location.hash||'#home').slice(1).split('/');const v=h[0]||'home';
  const map={home:'home',dersler:'dersler',ders:'dersler',darp:'darp',ocak:'ocak',harita:'harita',oyun:'oyun',kart:'kart',sinav:'sinav',hakkinda:'hakkinda'};
  $$('#tabs a').forEach(a=>a.classList.toggle('on',a.dataset.v===(map[v]||'home')));
  (V[v]||V.home)(h.slice(1));
  app.classList.remove('view');void app.offsetWidth;app.classList.add('view');
  fixArrows(app);window.scrollTo({top:0});checkBadges();
}
addEventListener('hashchange',route);
/* Sağdan sola akışta süreç oku: mantıksal sıra “asıl → son”, görsel olarak ← */
function fixArrows(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const ns=[];while(w.nextNode()){const t=w.currentNode;if(t.nodeValue.includes('→'))ns.push(t);}
  ns.forEach(t=>{const el=t.parentElement;if(el&&getComputedStyle(el).direction==='rtl')t.nodeValue=t.nodeValue.replace(/→/g,'←');});}
new MutationObserver(()=>{fixArrows(app);const sh=document.getElementById('sheet');if(sh)fixArrows(sh);}).observe(document.body,{childList:true,subtree:true});
/* ---------- ortak: harf kutucukları ve fark ---------- */
const CL=s=>clusters(s);
function lcsMask(a,b){const n=a.length,m=b.length,T=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)T[i][j]=a[i]===b[j]?T[i+1][j+1]+1:Math.max(T[i+1][j],T[i][j+1]);
  const keep=Array(m).fill(false);let i=0,j=0;while(i<n&&j<m){if(a[i]===b[j]){keep[j]=true;i++;j++;}else if(T[i+1][j]>=T[i][j+1])i++;else j++;}return keep;}
function tilesHTML(form,prev){const b=CL(form);const keep=prev!=null?lcsMask(CL(prev),b):b.map(()=>true);
  return `<div class="tiles2">${b.map((c,k)=>c===' '?'<span class="gap"></span>':`<span class="t ${keep[k]?'':'chg'}">${esc(c)}</span>`).join('')}</div>`;}
/* ===================== ANA SAYFA: SİKKE VİTRİNİ ===================== */
const coinCls=id=>['c0','c1','c2','c3'][lstar(id)];
function vitrinHTML(){const next=LESSONS.find(l=>lstar(l.id)<2)||LESSONS[0];
  return KISIM.map(K=>{const ls=LESSONS.filter(l=>l.k===K.k);return `<div class="tray" style="--c:${K.col}"><div class="tray-h"><b>${K.tr}</b><span class="ar">${esc(K.ar)}</span></div><div class="coins">${ls.map(l=>`<a class="coin ${coinCls(l.id)} ${l.id===next.id?'next':''}" href="#ders/${l.id}" title="${esc((l.i+1)+'. '+l.t)}" aria-label="Ders ${l.i+1}: ${esc(l.t)}"><span>${AD(l.i+1)}</span></a>`).join('')}</div></div>`;}).join('');}
V.home=()=>{
  const lit=LESSONS.filter(l=>lstar(l.id)).length;
  const next=LESSONS.find(l=>lstar(l.id)<2)||LESSONS[0];
  const best=S.exams.length?Math.max(...S.exams.map(e=>e.pct)):null;
  app.innerHTML=`
  <section class="hero">
    <div>
      <div class="kufi">الْمَقْصُودُ</div>
      <h1>Maksûd Darphânesi</h1>
      <p class="muted">Kitâbü’l-Maksûd’a göre masdar <b>maden</b>, vezinler <b>kalıp</b>, sîgalar <b>sikke</b>. Kökü seç, bâbı seç, sikkeyi bas. Programın kalbi <b>İ‘lâl Ocağı</b>: illetli kelimeler aslî hâlinden kitabın kurallarıyla adım adım dönüşür, kuralı sen seçersin.</p>
      <div class="row" style="margin-top:12px"><a class="btn pri" href="#ders/${next.id}">${lstar(next.id)?'Devam et':'Başla'}: ${esc(next.t)} ${ICON.arrow}</a><a class="btn" href="#ocak">İ‘lâl Ocağı</a><a class="btn" href="#darp">Darphâne</a></div>
      <div class="counter">
        <div><b style="color:var(--s1)">${AD(6)}+${AD(1)}</b><span class="small">mücerred bâb</span><span class="ar">نَصَرَ … دَحْرَجَ</span></div>
        <div><b style="color:var(--s3)">${AD(14)}+${AD(3)}</b><span class="small">mezîd bâb</span><span class="ar">أَفْعَلَ … تَفَعْلَلَ</span></div>
        <div><b style="color:var(--s5)">${AD(10)}</b><span class="small">i‘lâl kuralı</span><span class="ar">قَالَ · يَقُولُ · قُلْ</span></div>
      </div>
      <div class="stat">
        <div><b>${lit}/${LESSONS.length}</b><span>okunan ders</span></div><div><b>${Object.keys(S.ilal).length}/${ILAL.length}</b><span>dönüşüm</span></div>
        <div><b>${S.streak}</b><span>gün seri</span></div><div><b>${best===null?'—':best+'%'}</b><span>en iyi sınav</span></div>
      </div>
    </div>
    <div><div class="vitrin" id="vit"><div class="vit-h"><span class="ar">خِزَانَةُ السِّكَكِ</span><span class="tiny">Sikke vitrini · ${LESSONS.length} ders</span></div>${vitrinHTML()}</div>
      <div class="legend2"><span><i class="lg c0"></i>okunmadı</span><span><i class="lg c1"></i>bakır: okundu</span><span><i class="lg c2"></i>gümüş: %60+</span><span><i class="lg c3"></i>altın: tam puan</span></div></div>
  </section>
  <div class="sec-h"><h2>Atölyeler</h2></div>
  <div class="gcards">
    <a class="gcard" href="#dersler"><div class="ico">${ICON.door}</div><h3>Dersler</h3><p class="muted small">${LESSONS.length} ders: kitabın harekeli metni, Türkçe şerh, misaller, mini sınav.</p></a>
    <a class="gcard" href="#darp"><div class="ico">${ICON.coin}</div><h3>Darphâne</h3><p class="muted small">Herhangi bir sahîh kökü altı bâbda bas: 14 sîga, emir, nehiy, nûnlar, fâil, mef‘ûl. Kitabın 20 bâb zinciri vitrinde.</p></a>
    <a class="gcard" href="#ocak"><div class="ico">${ICON.fire}</div><h3>İ‘lâl Ocağı</h3><p class="muted small">${ILAL.length} dönüşüm zinciri, kendin dönüştür modu ve hangi kuralın işlediğini bulan Kural Makinesi.</p></a>
    <a class="gcard" href="#harita"><div class="ico">${ICON.tree}</div><h3>Haritalar</h3><p class="muted small">Bâb ağacı, yedi kısım, vecih sayıları, mîmî masdar.</p></a>
    <a class="gcard" href="#oyun"><div class="ico">${ICON.bolt}</div><h3>${GAMES.length} oyun</h3><p class="muted small">Bâb Avcısı, Sîga Tanı, Aslını Bul, Hangi Kural?, İftiâl Tezgâhı…</p></a>
    <a class="gcard" href="#sinav"><div class="ico">${ICON.eye}</div><h3>Sınav</h3><p class="muted small">Kısım kısım seçilebilen, süreli, konu raporlu sınav ve başarı belgesi.</p></a>
  </div>
  <div class="sec-h"><h2>Rozetler</h2><span class="muted small">${Object.keys(S.badges).length}/${BADGES.length}</span></div>
  <div class="badges">${BADGES.map(([id,t,d])=>`<div class="badge ${S.badges[id]?'on':''}">✦ <div><b>${t}</b><div class="tiny muted">${d}</div></div></div>`).join('')}</div>
  <div class="row" style="margin-top:22px"><button class="btn sm ghost" id="reset">İlerlemeyi sıfırla</button></div>`;
  $('#reset').onclick=()=>{if(confirm('Bütün ilerleme silinsin mi?')){const snd=S.snd;S=FRESH();S.snd=snd;save();hud();route();}};
};
/* ===================== DERSLER ===================== */
V.dersler=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">كِتَابُ الْمَقْصُودِ</div><h2>Dersler</h2></div><span class="muted small">${LESSONS.filter(l=>lstar(l.id)).length}/${LESSONS.length} okundu</span></div>
  ${KISIM.map(K=>{const ls=LESSONS.filter(l=>l.k===K.k);return `<div class="grp" style="--c:${K.col}"><h3>${K.tr} <span class="ar">${esc(K.ar)}</span></h3><p class="small muted" style="margin:2px 0 8px">${esc(K.d)}</p></div>
   <div class="lgrid">${ls.map(l=>`<a class="lcard" href="#ders/${l.id}" style="--c:${K.col}"><span class="coin sm ${coinCls(l.id)}"><span>${AD(l.i+1)}</span></span><span class="tt"><b>${esc(l.t)}</b><span class="ar">${esc(l.ar)}</span></span><span>${stars(lstar(l.id))}<div class="tiny muted" style="text-align:end">s. ${l.p}</div></span></a>`).join('')}</div>`;}).join('')}`;
};
V.ders=([id])=>{
  const L=LESSON[id];if(!L){location.hash='#dersler';return;}
  const K=KISIM[L.k];const prev=LESSONS[L.i-1],next=LESSONS[L.i+1];
  if(!S.les[id]){S.les[id]={best:0};save();addXP(10);}
  const chains=ILAL.map((x,i)=>[x,i]).filter(([x])=>x.l===id);
  app.innerHTML=`<div class="lnav"><a class="btn sm ghost" href="#dersler">${ICON.back} Dersler</a><div class="row">${prev?`<a class="btn sm" href="#ders/${prev.id}">‹ Önceki</a>`:''}${next?`<a class="btn sm" href="#ders/${next.id}">Sonraki ›</a>`:''}</div></div>
  <div class="card" style="margin-top:12px;border-top:4px solid ${K.col}">
    <div class="eyebrow" style="color:${K.col}">${K.tr} · Ders ${L.i+1} · kitapta s. ${L.p}</div>
    <h2 style="margin-top:4px">${esc(L.t)}</h2><div class="ar" style="font-size:1.45rem;color:var(--muted)">${esc(L.ar)}</div>
    <div style="margin-top:6px">${stars(lstar(id))}</div>
  </div>
  <div class="matn" style="margin-top:20px">${L.m.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="row" style="justify-content:flex-end"><button class="btn sm" id="say">${ICON.play} Metni dinle</button></div></div>
  <div class="sec-h"><h2>Şerh</h2></div>
  <div class="card serh">${AW(L.tr)}</div>
  <div class="sec-h"><h2>Misaller</h2></div>
  <div class="ex">${L.ex.map(e=>`<div>${A(e[0])}<span class="small muted">${AW(esc(e[1]))}</span><button class="btn sm ghost" data-say="${esc(e[0])}" aria-label="Dinle">${ICON.play}</button></div>`).join('')}</div>
  ${chains.length?`<div class="sec-h"><h2>İ‘lâl Ocağı’nda dönüştür</h2></div><div class="row">${chains.map(([x,i])=>`<a class="btn sm" href="#ocak/zincir/${i}"><span class="ar">${esc(x.a)} ← ${esc(x.w)}</span></a>`).join('')}</div>`:''}
  <div class="sec-h"><div><h2>Mini sınav</h2><p class="muted small" style="margin:2px 0 0">%60 ile gümüş, tam puanla altın sikke.</p></div><button class="btn sm" id="qr">Yeniden çöz</button></div>
  <div id="quiz"></div>
  <div class="lnav" style="margin-top:20px">${prev?`<a class="btn" href="#ders/${prev.id}">‹ ${esc(prev.t)}</a>`:'<span></span>'}${next?`<a class="btn pri" href="#ders/${next.id}">${esc(next.t)} ›</a>`:`<a class="btn pri" href="#sinav">Sınava geç ›</a>`}</div>`;
  $('#say').onclick=()=>speak(L.m.join(' '));
  $$('[data-say]').forEach(b=>b.onclick=()=>speak(b.dataset.say));
  const runQuiz=()=>{
    const qs=L.q.map(q=>{const idx=shuffle(q[1].map((_,i)=>i));return {q:q[0],o:idx.map(i=>q[1][i]),a:idx.indexOf(q[2]),ex:q[3]};});
    let done=0,ok=0;
    $('#quiz').innerHTML=qs.map((q,k)=>`<div class="qz" data-k="${k}"><div class="q">${k+1}. ${AW(esc(q.q))}</div><div class="opts">${q.o.map((o,j)=>`<button class="${isAr(o)?'opt ar1':'opt tr'}" data-j="${j}">${isAr(o)?esc(o):AW(esc(o))}</button>`).join('')}</div><div class="fb"></div></div>`).join('');
    $$('#quiz .qz').forEach(box=>{const q=qs[+box.dataset.k];box.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{
      const good=+b.dataset.j===q.a;box.querySelectorAll('[data-j]').forEach(x=>{x.disabled=true;if(+x.dataset.j===q.a)x.classList.add('ok');});
      if(!good)b.classList.add('no');beep(good?'ok':'no');done++;if(good){ok++;addXP(4);}
      const fb=box.querySelector('.fb');fb.className='fb '+(good?'ok':'no');fb.innerHTML=(good?'Doğru! ':'Yanlış. ')+`<span style="font-weight:400">${AW(esc(q.ex))}</span>`;
      if(done===qs.length){const p=ok/qs.length;const r=S.les[id];if(p>(r.best||0)){r.best=p;save();}toast(`Sonuç: ${ok}/${qs.length}`+(p===1?' — altın sikke!':''));if(p===1){confetti();beep('win');}checkBadges();}
    });});
  };
  runQuiz();$('#qr').onclick=runQuiz;
};
/* ===================== DARPHÂNE ===================== */
const GRID_ROWS=[['Gâib',[0,1,2]],['Gâibe',[3,4,5]],['Muhâtab',[6,7,8]],['Muhâtaba',[9,10,11]],['Mütekellim',[12,null,13]]];
function gridHTML(fn,only,label){
  return `<div class="cgrid"><div class="ch"></div><div class="ch">Müfred</div><div class="ch">Tesniye</div><div class="ch">Cem‘</div>${GRID_ROWS.map(([rn,ix])=>`<div class="rh">${rn}</div>${ix.map(i=>{if(i===null||(only&&!only.includes(i)))return `<div class="cell empty">—</div>`;const f=fn(i);return `<button class="cell sikke" data-say="${esc(f.plain)}" title="${esc(SIGA[i].tr)}"><span class="ar">${f.html}</span><span class="tiny">${esc(SIGA[i].z)}</span></button>`;}).join('')}`).join('')}</div>`;
}
const DARP_T=[...TABLES.map(t=>({id:t.id,tr:t.tr,ar:t.ar})),{id:'fail',tr:'İsm-i fâil (10)',ar:'اسْمُ الْفَاعِلِ'},{id:'mef',tr:'İsm-i mef‘ûl (7)',ar:'اسْمُ الْمَفْعُولِ'},{id:'mimi',tr:'Mîmî masdar · zaman · mekân',ar:'الْمِيمِيُّ'}];
V.darp=([mode,a1])=>{
  mode=mode==='vitrin'?'vitrin':'sulasi';
  const head=`<div class="sec-h"><div><div class="eyebrow">دَارُ الضَّرْبِ</div><h2>Darphâne</h2></div><div class="seg"><button data-m="sulasi" class="${mode==='sulasi'?'on':''}">Sülâsî kalıpları</button><button data-m="vitrin" class="${mode==='vitrin'?'on':''}">Bâb vitrini</button></div></div>`;
  if(mode==='vitrin')return darpVitrin(head);
  let st={r:['ن','ص','ر'],b:1,t:'mazi',miz:false};
  try{const t=JSON.parse(localStorage.getItem(KEY+'-darp')||'null');if(t)st=Object.assign(st,t);}catch(e){}
  const draw=()=>{
    try{localStorage.setItem(KEY+'-darp',JSON.stringify(st));}catch(e){}
    const B=babOf(st.b);const R=st.miz?['ف','ع','ل']:st.r;const root=ROOTS.find(x=>x.r===st.r.join(''));
    const T=TABLES.find(t=>t.id===st.t);
    let out='';
    if(T){out=gridHTML(i=>{const t=T.f(B,i);return {html:paint(t,R),plain:fill(t,R)};},T.only);
      if(T.pas&&root&&root.lz)out=`<p class="warn small">Bu fiil lâzımdır: lâzımdan meçhûl gelmez (ancak harf-i cerle: نُصِرَ بِهِ gibi). Kalıp yine de gösteriliyor.</p>`+out;}
    else if(st.t==='fail'){const n=failNote(B);out=`<p class="small"><b>Vezin:</b> <span class="ar">${n.v}</span> — ${AW(esc(n.d))}</p><div class="cards2">${FAIL.map((t,i)=>`<button class="sikke big" data-say="${esc(fill(t,R))}"><span class="ar">${paint(t,R)}</span><span class="tiny">${FAIL_TR[i]}</span></button>`).join('')}</div><p class="tiny muted">Kitaptaki on vecih نَاصِرٌ üzerinedir; 5. bâb ve lâzım fiillerde vezin farklıdır.</p>`;}
    else if(st.t==='mef'){out=`<div class="cards2">${MEF.map((t,i)=>`<button class="sikke big" data-say="${esc(fill(t,R))}"><span class="ar">${paint(t,R)}</span><span class="tiny">${MEF_TR[i]}</span></button>`).join('')}</div>`+(root&&root.lz?`<p class="warn small">Lâzım fiilden ism-i mef‘ûl harf-i cerle gelir (مُنْكَسَرٌ بِهِ gibi).</p>`:'');}
    else{const m=mimi(B);out=`<div class="cards2"><button class="sikke big" data-say="${esc(fill(m.masdar,R))}"><span class="ar">${paint(m.masdar,R)}</span><span class="tiny">Mîmî masdar</span></button><button class="sikke big" data-say="${esc(fill(m.zm,R))}"><span class="ar">${paint(m.zm,R)}</span><span class="tiny">İsm-i zaman</span></button><button class="sikke big" data-say="${esc(fill(m.zm,R))}"><span class="ar">${paint(m.zm,R)}</span><span class="tiny">İsm-i mekân</span></button></div><p class="small">${B.mu==='i'?'Muzâride ayn <b>esre</b>: masdar <span class="ar">مَفْعَلٌ</span>, zaman-mekân <span class="ar">مَفْعِلٌ</span>.':'Muzâride ayn <b>ötre/üstün</b>: üçü de <span class="ar">مَفْعَلٌ</span>.'} Şâzlar: ${SHAZ.slice(0,5).map(x=>A(x)).join(' ')} …</p>`;}
    app.innerHTML=head+`<div class="darp">
      <div class="press card">
        <div class="field"><label for="rt">Kök (sahîh, üç harf)</label><div class="row"><input id="rt" class="rootin" value="${esc(st.r.join(' '))}" dir="rtl" maxlength="9" aria-label="Kök"><button class="btn pri" id="go">${ICON.coin} Bas</button></div><div class="tiny" id="rerr" style="color:var(--bad)"></div></div>
        <p class="tiny muted" style="margin:10px 0 4px">Bâb (Maksûd sırası)</p>
        <div class="babs">${BABS.map(b=>`<button data-b="${b.id}" class="${b.id===st.b?'on':''}"><b>${b.id}</b><span class="ar">${b.ar}</span></button>`).join('')}</div>
        <p class="tiny muted" style="margin:10px 0 4px">Bu bâbdan kökler</p>
        <div class="chips">${ROOTS.filter(x=>x.b===st.b).map(x=>`<button data-r="${x.r}" class="${x.r===st.r.join('')?'on':''}" title="${esc(x.tr)}"><span class="ar">${x.r.split('').join(' ')}</span></button>`).join('')}</div>
        <label class="check" style="margin-top:10px"><input type="checkbox" id="miz" ${st.miz?'checked':''}><span>Mîzan göster (ف ع ل)</span></label>
      </div>
      <div>
        <div class="stamp card"><div class="ar big">${esc(fill(mzS(B)+VW.a,st.r))} <span class="muted">·</span> ${esc(fill(PRE[0]+muS(B)+VW.u,st.r))}</div><div class="small muted">${B.id}. bâb <span class="ar">${B.vz}</span>${root?` · “${esc(root.tr)}”${root.ms?' · masdar '+A(root.ms):''}${root.lz?' · lâzım':''}`:' · (listede olmayan kök: bâbı sen seçtin)'}</div></div>
        <div class="filter" style="margin:12px 0">${DARP_T.map(t=>`<button class="btn sm ${t.id===st.t?'pri':''}" data-t="${t.id}">${esc(t.tr)}</button>`).join('')}</div>
        <div class="out" id="out"><h3 class="ar" style="text-align:center;margin:0 0 8px">${esc((DARP_T.find(t=>t.id===st.t)||{}).ar||'')}</h3>${out}</div>
        <div class="legend2" style="justify-content:center"><span><i style="background:var(--rf)"></i>fâ</span><span><i style="background:var(--ra)"></i>ayn</span><span><i style="background:var(--rl)"></i>lâm</span><span><i style="background:var(--muted)"></i>zâid</span></div>
      </div></div>`;
    $$('[data-m]').forEach(b=>b.onclick=()=>location.hash='#darp/'+b.dataset.m);
    $$('[data-b]').forEach(b=>b.onclick=()=>{st.b=+b.dataset.b;beep('tap');draw();stampAnim();});
    $$('[data-r]').forEach(b=>b.onclick=()=>{st.r=b.dataset.r.split('');const x=ROOTS.find(y=>y.r===b.dataset.r);if(x)st.b=x.b;S.darp[b.dataset.r]=1;save();beep('tap');draw();stampAnim();checkBadges();});
    $$('[data-t]').forEach(b=>b.onclick=()=>{st.t=b.dataset.t;draw();stampAnim();});
    $('#miz').onchange=e=>{st.miz=e.target.checked;draw();};
    const go=()=>{const r=rootOf($('#rt').value);const er=checkRoot(r);if(er){$('#rerr').textContent=er;beep('no');return;}st.r=r;const x=ROOTS.find(y=>y.r===r.join(''));if(x)st.b=x.b;S.darp[r.join('')]=1;save();addXP(3);beep('ok');draw();stampAnim();checkBadges();};
    $('#go').onclick=go;$('#rt').onkeydown=e=>{if(e.key==='Enter')go();};
    $$('#out [data-say]').forEach(b=>b.onclick=()=>speak(b.dataset.say));
  };
  const stampAnim=()=>{$$('#out .sikke').forEach((c,k)=>{c.style.animationDelay=(k*18)+'ms';c.classList.add('struck');});};
  draw();
};
function darpVitrin(head){
  const groups=[...new Set(VITRIN.map(v=>v.g))];
  app.innerHTML=head+`<p class="muted small">Kitabın tasrîf bölümündeki zincirler: mâzi · muzâri · masdar · <span class="ar">فَهُوَ</span> fâil · <span class="ar">وَذَاكَ</span> mef‘ûl · emir · nehiy. “14 sîga” düğmesiyle tam çekimi bas.</p>
  ${groups.map(g=>`<div class="grp" style="--c:var(--s3)"><h3>${esc(g)}</h3></div><div class="vgrid">${VITRIN.map((v,i)=>[v,i]).filter(([v])=>v.g===g).map(([v,i])=>`<div class="vcard"><div class="vh"><span class="ar vz">${esc(v.v)}</span><span class="small muted">“${esc(v.m)}”${v.lz?' · lâzım':''}</span></div><div class="chain">${v.c.map((w,k)=>`<button class="lk" data-say="${esc(w)}" title="${VIT_TR[k]}"><span class="ar">${esc(w)}</span><span class="tiny">${VIT_TR[k].split(' ')[0]}${k===3?' fâil':k===4?' mef‘ûl':''}</span></button>`).join('')}</div>${v.x?`<button class="btn sm" data-v="${i}">${ICON.coin} 14 sîga</button>`:'<span class="tiny muted">Muzâaf / nâkıs sonlu bâb: tam çekim İ‘lâl kurallarıyla.</span>'}</div>`).join('')}</div>`).join('')}`;
  $$('[data-m]').forEach(b=>b.onclick=()=>location.hash='#darp/'+b.dataset.m);
  $$('[data-say]').forEach(b=>b.onclick=()=>speak(b.dataset.say));
  $$('[data-v]').forEach(b=>b.onclick=()=>{const v=VITRIN[+b.dataset.v],x=v.x;
    const mk=(stem,suf,pre)=>i=>{const f=(pre?pre(i):'')+stem+suf[i];return {html:esc(f),plain:f};};
    const preA=i=>x.pu?PRE[i].replace(VW.a,VW.u):PRE[i];
    openSheet(`<div class="row" style="justify-content:space-between"><h3 class="ar" style="margin:0">${esc(v.c[0])} ${esc(v.c[1])}</h3><button class="btn sm ghost" data-close>Kapat</button></div>
      <h4>Mâzi · ma‘lûm</h4>${gridHTML(mk(x.ms,SUF.mazi))}
      <h4>Muzâri · ma‘lûm</h4>${gridHTML(mk(x.us,SUF.raf,preA))}
      ${x.mp?`<h4>Mâzi · meçhûl</h4>${gridHTML(mk(x.mp,SUF.mazi))}<h4>Muzâri · meçhûl</h4>${gridHTML(mk(x.up,SUF.raf,pP))}`:'<p class="small muted">Lâzım bâb: meçhûl ancak harf-i cerle gelir.</p>'}`);
    $$('#sheet [data-say]').forEach(c=>c.onclick=()=>speak(c.dataset.say));});
}
/* ===================== İ‘LÂL OCAĞI ===================== */
const ILCAT=[...new Set(ILAL.map(x=>x.c.split(' · ')[0]))];
function ruleBadge(k){const R=KURAL[k];return `<span class="rb">${R.n?`<b>Kural ${R.n}</b> · `:''}${esc(R.t)}</span>`;}
V.ocak=([tab,n])=>{
  tab=['zincir','coz','makine','kurallar'].includes(tab)?tab:'zincir';
  const tabs=[['zincir','Dönüşümü izle'],['coz','Kendin dönüştür'],['makine','Kural Makinesi'],['kurallar','Kurallar']];
  const head=`<div class="sec-h"><div><div class="eyebrow">مَوْقِدُ الْإِعْلَالِ</div><h2>İ‘lâl Ocağı</h2></div></div><div class="filter" style="margin-bottom:12px">${tabs.map(([k,t])=>`<a class="btn sm ${k===tab?'pri':''}" href="#ocak/${k}">${t}</a>`).join('')}</div>`;
  if(tab==='makine')return ocakMakine(head);
  if(tab==='kurallar')return ocakKurallar(head);
  let idx=n!=null&&ILAL[+n]?+n:0;let filt=null;
  try{const f=sessionStorage.getItem(KEY+'-rf');if(f){filt=f;sessionStorage.removeItem(KEY+'-rf');}}catch(e){}
  const list=()=>ILAL.map((x,i)=>[x,i]).filter(([x])=>!filt||x.s.some(s=>s[0]===filt));
  const shell=()=>{const X=ILAL[idx];
    app.innerHTML=head+`${filt?`<p class="small">Süzgeç: ${ruleBadge(filt)} <button class="btn sm ghost" id="nof">Kaldır</button></p>`:''}
    <div class="slist ar">${list().map(([x,i])=>`<button data-i="${i}" class="${i===idx?'on':''} ${S.ilal[i]!=null?'done':''}" title="${esc(x.c)}">${esc(x.w)}</button>`).join('')}</div>
    <div class="furnace" id="fur"></div>
    <div class="row" style="justify-content:space-between;margin-top:12px"><button class="btn sm" id="pv">‹ Önceki</button><a class="btn sm ghost" href="#ders/${X.l}">İlgili ders ›</a><button class="btn sm" id="nx">Sonraki ›</button></div>`;
    const L=list();const pos=L.findIndex(([,i])=>i===idx);
    $('#pv').disabled=pos<=0;$('#nx').disabled=pos>=L.length-1;
    const go=i=>{idx=i;history.replaceState(null,'','#ocak/'+tab+'/'+i);shell();};
    $('#pv').onclick=()=>go(L[pos-1][1]);$('#nx').onclick=()=>go(L[pos+1][1]);
    $$('[data-i]').forEach(b=>b.onclick=()=>go(+b.dataset.i));
    if($('#nof'))$('#nof').onclick=()=>{filt=null;shell();};
    const cur=$('.slist .on');if(cur)cur.scrollIntoView({inline:'center',block:'nearest'});
    if(tab==='zincir')izle(X);else coz(X,idx);
  };
  const frame=(X,inner)=>`<div class="fur-h"><span class="chip">${esc(X.c)}</span><span class="ar fur-w">${esc(X.w)}</span><button class="btn sm ghost" id="say" aria-label="Dinle">${ICON.play}</button></div>${inner}`;
  const izle=X=>{let k=0;let auto=null;
    const draw=()=>{let rows=`<div class="srow asl"><div class="lab"><span class="tiny">Asıl</span><span class="ar">${esc(X.a)}</span></div>${tilesHTML(X.a)}</div>`;
      for(let j=0;j<k;j++){const s=X.s[j],prev=j?X.s[j-1][1]:X.a;rows+=`<div class="arrowdn">${ruleBadge(s[0])}</div><div class="srow ${j===X.s.length-1?'fin':''}"><div class="lab"><span class="tiny">${j===X.s.length-1?'Son şekil':(j+1)+'. adım'}</span><span class="ar">${esc(s[1])}</span></div>${tilesHTML(s[1],prev)}<p class="small note">${AW(esc(s[2]))}</p></div>`;}
      $('#fur').innerHTML=frame(X,`<div class="chainv">${rows}</div><div class="row" style="justify-content:center;margin-top:12px">${k<X.s.length?`<button class="btn pri" id="st">${k?'Sonraki adım':'Ateşle'} ${ICON.fire}</button><button class="btn" id="all">Hepsini göster</button>`:`<span class="chip gold">${X.s.length} adımda tamam</span><button class="btn" id="re">Baştan</button><a class="btn" href="#ocak/coz/${idx}">Şimdi sen dönüştür ›</a>`}</div>`);
      $('#say').onclick=()=>speak(X.w);
      if($('#st'))$('#st').onclick=()=>{k++;beep(k===X.s.length?'win':'tap');draw();};
      if($('#all'))$('#all').onclick=()=>{k=X.s.length;draw();};
      if($('#re'))$('#re').onclick=()=>{k=0;draw();};};
    draw();};
  const coz=(X,i)=>{let k=0,phase=0,score=0,max=0;
    const allForms=ILAL.flatMap(y=>[y.a,...y.s.map(s=>s[1])]);
    const ruleOpts=s=>shuffle([s[0],...sample(Object.keys(KURAL).filter(r=>r!==s[0]&&!(KURAL[r].t===KURAL[s[0]].t)),3)]);
    const formOpts=(cur,s,next)=>{const o=new Set([next]);if(cur!==next)o.add(cur);if(X.w!==next)o.add(X.w);
      const L=CL(next).length;const near=shuffle(allForms.filter(f=>f!==next&&Math.abs(CL(f).length-L)<=1));for(const f of near){if(o.size>=3)break;o.add(f);}return shuffle([...o].slice(0,3));};
    let opts=null;
    const draw=()=>{const cur=k?X.s[k-1][1]:X.a;const s=X.s[k];
      let rows=k?`<div class="srow asl"><div class="lab"><span class="tiny">Asıl</span><span class="ar">${esc(X.a)}</span></div>${tilesHTML(X.a)}</div>`:'';
      for(let j=0;j<k;j++){const t=X.s[j],prev=j?X.s[j-1][1]:X.a;rows+=`<div class="arrowdn">${ruleBadge(t[0])}</div><div class="srow"><div class="lab"><span class="tiny">${j+1}. adım</span><span class="ar">${esc(t[1])}</span></div>${tilesHTML(t[1],prev)}</div>`;}
      if(k>=X.s.length){const pct=max?Math.round(score/max*100):100;const p=S.ilal[i];if(p==null||pct>p)S.ilal[i]=pct;save();addXP(score*3);if(pct===100){confetti();beep('win');}
        $('#fur').innerHTML=frame(X,`<div class="chainv">${rows}</div><div style="text-align:center;margin-top:12px"><div class="scorebig">%${pct}</div><p class="small">${score}/${max} doğru seçim.</p><div class="row" style="justify-content:center"><button class="btn pri" id="nx2">Sonraki dönüşüm ${ICON.arrow}</button><button class="btn" id="re">Tekrar</button></div></div>`);
        $('#say').onclick=()=>speak(X.w);$('#re').onclick=()=>{k=0;phase=0;score=0;max=0;opts=null;draw();};
        $('#nx2').onclick=()=>{const L=list();const pos=L.findIndex(([,j])=>j===i);const nx=L[(pos+1)%L.length][1];location.hash='#ocak/coz/'+nx;};checkBadges();return;}
      let q;
      if(phase===0){opts=opts||ruleOpts(s);q=`<p class="q">${k+1}. adım: <span class="ar">${esc(cur)}</span> kelimesinde hangi kural işler?</p><div class="opts" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${opts.map(r=>`<button class="opt tr rule" data-o="${r}"><b>${KURAL[r].n?'Kural '+KURAL[r].n+' · ':''}${esc(KURAL[r].t)}</b><span class="tiny">${esc(KURAL[r].d)}</span></button>`).join('')}</div>`;}
      else{opts=opts||formOpts(cur,s,s[1]);q=`<p class="q">${ruleBadge(s[0])} uygulanınca kelime ne olur?</p><div class="opts">${opts.map(f=>`<button class="opt ar1" data-o="${esc(f)}">${esc(f)}</button>`).join('')}</div>`;}
      $('#fur').innerHTML=frame(X,`<div class="chainv">${rows}<div class="srow cur"><div class="lab"><span class="tiny">${k?'Ocakta':'Ocakta · asıl'}</span><span class="ar">${esc(cur)}</span></div>${tilesHTML(cur,k?(k>1?X.s[k-2][1]:X.a):null)}</div></div><div class="qbox">${q}<div class="fb" id="fb"></div></div>`);
      $('#say').onclick=()=>speak(X.w);
      $$('#fur [data-o]').forEach(b=>b.onclick=()=>{const right=phase===0?s[0]:s[1];const pick=b.dataset.o;const good=pick===right||(phase===0&&KURAL[pick].t===KURAL[right].t);max++;if(good)score++;beep(good?'ok':'no');
        $$('#fur [data-o]').forEach(x=>{x.disabled=true;if(x.dataset.o===right)x.classList.add('ok');});if(!good)b.classList.add('no');
        $('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Doğrusu işaretlendi. ')+(phase===1?`<span style="font-weight:400">${AW(esc(s[2]))}</span>`:`<span style="font-weight:400">${esc(KURAL[right].d)}</span>`)+`<div style="margin-top:8px"><button class="btn sm pri" id="cn">Devam ${ICON.arrow}</button></div>`;
        $('#cn').onclick=()=>{opts=null;if(phase===0)phase=1;else{phase=0;k++;}draw();};$('#cn').focus();});};
    draw();};
  shell();
};
/* Kural Makinesi: vav/yânın durumunu seç, kitabın hangi kuralının işlediğini gör */
function ocakMakine(head){
  const st={h:'و',m:'a',p:'lam',b:'a',n:'x',ar:0};
  const Q=[
   ['h','Harf',[['و','و vav'],['ي','ي yâ']]],
   ['m','Kendi harekesi',[['a','üstün'],['u','ötre'],['i','esre'],['o','sâkin']]],
   ['p','Yeri',[['fa','fâü’l-fiil (başta)'],['ayn','aynü’l-fiil (ortada)'],['lam','lâmü’l-fiil (sonda)']]],
   ['b','Öncesi',[['a','üstünlü harf'],['u','ötreli harf'],['i','esreli harf'],['o','sâkin sahîh harf'],['vs','sâkin vav/yâ'],['x','yok (başta)']]],
   ['n','Sonrası',[['x','önemli değil'],['ta','tesniye elifi'],['vv','harekeli vav'],['vy','harekeli yâ'],['sk','sâkin harf (iki sâkin)']]]
  ];
  const decide=()=>{const {h,m,p,b,n}=st;
    if(m==='o'&&(n==='vv'||n==='vy')){if(h==='و'&&n==='vv')return ['k9','مَغْزُوْوٌ → مَغْزُوٌّ',35];return ['k10','مَرْمُوْيٌ → مَرْمِيٌّ',36];}
    if(b==='vs'&&m!=='o'){if(h==='و')return ['k9','مَغْزُوْوٌ → مَغْزُوٌّ',35];return ['k10','مَرْمُوْيٌ → مَرْمِيٌّ',36];}
    if(m==='o'){
      if(n==='sk')return ['hz','غَزَاوْا → غَزَوْا',4];
      if(h==='ي'&&b==='u')return ['k4','يُيْسِرُ → يُوسِرُ',13];
      if(h==='و'&&b==='i')return ['kv','قِوْلَ → قِيلَ',14];
      if(b==='a'&&st.ar)return ['k1s','يَخَوْفُ → يَخَافُ',21];
      if(b==='a')return ['none','Sükûnu aslî olan vav/yâ, öncesi üstün olsa da değişmez: غَزَوْنَ، رَمَيْتُ، قَوْلٌ.',-1];
      if(h==='ي'&&b==='i')return ['k3','خَشِيتَ: yâ kalır',12];
      return ['none','Değişmez: medd harfi olarak kalır (يَقُولُ’daki vav gibi).',-1];}
    /* harekeli */
    if(n==='ta'&&b==='a')return ['none','Tesniyede kalb yoktur: غَزَوَا، رَمَيَا (elif-i tesniye ile karışmasın).',-1];
    if(b==='o')return ['k7','يَقْوُلُ → يَقُولُ',19];
    if(b==='a')return ['k1','قَوَلَ → قَالَ',0];
    if(p==='lam'&&(b==='u'||b==='i')&&m==='a')return ['k8','لَنْ يَغْزُوَ: mansûb, hareke kalır',25];
    if(h==='و'&&b==='i'&&p==='lam')return ['k6','غَبِوَ → غَبِيَ',15];
    if(p==='lam'&&(b==='u'||b==='i')&&m==='u')return ['k8','يَغْزُوُ → يَغْزُو · يَرْمِيُ → يَرْمِي',22];
    if(p==='lam'&&m==='i'&&b==='u')return ['st','تَغْزُوِينَ → تَغْزِوْينَ',29];
    if(h==='ي'&&b==='i')return ['k3','خَشِيَ: yâ kalır',12];
    if(h==='و'&&b==='u'&&m==='i')return ['st','قُوِلَ → قِوْلَ (sonra kural 4–5)',14];
    if(b==='x')return ['none','Başta harekeli vav/yâ sahîh harf gibidir (وَعَدَ). Misâlde fâ, muzâride düşebilir: يَعِدُ.',44];
    return ['none','Bu durum için kitapta özel bir kural yoktur; fiil sahîhe kıyasla çekilir.',-1];};
  const draw=()=>{const [k,ex,ci]=decide();const R=KURAL[k];
    app.innerHTML=head+`<div class="mach"><div class="card"><h3>Durumu kur</h3>${Q.map(([key,lab,os])=>`<div class="hq"><span>${lab}</span><div class="seg">${os.map(([v,t])=>`<button data-q="${key}" data-v="${v}" class="${st[key]===v?'on':''}">${esc(t)}</button>`).join('')}</div></div>`).join('')}
      ${st.m==='o'&&st.b==='a'?`<label class="check" style="margin-top:8px"><input type="checkbox" id="ar" ${st.ar?'checked':''}><span>Sükûnu aslî değil (harekesi öncesine nakledildi)</span></label>`:''}</div>
      <div class="card mres"><div class="eyebrow">Makinenin hükmü</div>${R?`<div class="bigrule">${R.n?`<span>Kural ${R.n}</span>`:''}<b>${esc(R.t)}</b><span class="ar">${esc(R.ar)}</span></div><p>${esc(R.d)}</p>`:`<div class="bigrule"><b>Değişiklik yok</b></div>`}<div class="exl"><span class="tiny muted">Misal</span><span class="ar">${esc(R?ex:ex)}</span></div>${ci>=0?`<a class="btn sm" href="#ocak/zincir/${ci}">Bu dönüşümü ocakta izle ›</a>`:''}</div></div>
      <p class="small muted" style="margin-top:12px">Makine, kitabın 1–10 numaralı kurallarını ve onlara bağlı nakil, iskân ve hazf işlemlerini seçtiğin duruma uygular. Kitabın altın kuralı: illetli fiili sahîhe kıyas et; kıyas ibdâl, nakil veya iskân gerektiriyorsa uygula.</p>`;
    $$('[data-q]').forEach(b=>b.onclick=()=>{st[b.dataset.q]=b.dataset.v;beep('tap');draw();});
    if($('#ar'))$('#ar').onchange=e=>{st.ar=e.target.checked?1:0;draw();};};
  draw();
}
function ocakKurallar(head){
  const cnt=k=>ILAL.filter(x=>x.s.some(s=>s[0]===k)).length;
  app.innerHTML=head+`<p class="muted small">Kitabın on kuralı ve onları tamamlayan işlemler. Bir karta dokun: o kuralın işlediği dönüşümler açılır.</p><div class="rgrid">${Object.entries(KURAL).map(([k,R])=>`<button class="rcard ${R.n?'main':''}" data-k="${k}">${R.n?`<span class="rn">${R.n}</span>`:''}<b>${esc(R.t)}</b>${R.ar?`<span class="ar">${esc(R.ar)}</span>`:''}<span class="small">${esc(R.d)}</span><span class="ar exr">${esc(R.ex)}</span><span class="tiny muted">${cnt(k)} dönüşüm</span></button>`).join('')}</div>`;
  $$('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;const i=ILAL.findIndex(x=>x.s.some(s=>s[0]===k));if(i<0)return;try{sessionStorage.setItem(KEY+'-rf',k);}catch(e){}location.hash='#ocak/zincir/'+i;});
}
/* ===================== HARİTALAR ===================== */
function treeHTML(n,depth=0){const has=n.k&&n.k.length;
  let h=`<li><button class="tn ${has||n.leafs?'':'leaf'}" aria-expanded="true"><span class="car">▼</span><span>${esc(n.t)}</span><span class="ar">${esc(n.ar)}</span></button>`;
  if(has||n.leafs){h+='<ul>';if(n.leafs)h+=`<li><div class="leafs">${n.leafs.map(x=>`<span>${esc(x)}</span>`).join('')}</div></li>`;if(has)h+=n.k.map(x=>treeHTML(x,depth+1)).join('');h+='</ul>';}
  return h+'</li>';}
V.harita=([tab])=>{
  tab=tab||'bab';const tabs=[['bab','Bâb ağacı'],['kisim','Yedi kısım'],['vecih','Vecih sayıları'],['mimi','Mîmî ve fâil']];
  let body='';
  if(tab==='bab')body=`<div class="card" style="overflow-x:auto"><ul class="tr">${treeHTML(BABTREE)}</ul></div><p class="small" style="margin-top:10px"><b>Sağlama:</b> 6 + 1 (+6 mülhak) mücerred · 3 + 5 + 6 = 14 mezîd sülâsî · 3 mezîd rubâî.</p>`;
  else if(tab==='kisim'){const K=[['Sahîh','—','نَصَرَ','Kökünde illet harfi, hemze ve tekrar yok'],['Misâl','fâ','وَعَدَ · يَسَرَ','Fâ, ma‘lûm muzâri/emir/nehiyde düşebilir'],['Ecvef','ayn','قَالَ · كَالَ','Kural 1, 7, 4–5'],['Nâkıs','lâm','غَزَا · رَمَى','Kural 1, 6, 8, 9, 10; cezmde lâm düşer'],['Lefîf-i makrûn','ayn + lâm','رَوَى · شَوَى','Ayn sahîh gibi, lâm nâkıs gibi'],['Lefîf-i mefrûk','fâ + lâm','وَقَى','Fâ misâl gibi, lâm nâkıs gibi: قِهْ'],['Muzâaf','ayn = lâm','مَدَّ','İdğam, izhâr, ârızî sükûn'],['Mehmûz','hemze','أَخَذَ · سَأَلَ · قَرَأَ','Sâkin hemze kalb; harekeli hemze nakil']];
    body=`<div class="kgrid">${K.map((r,i)=>`<div class="kcard" style="--c:${['var(--s3)','var(--s1)','var(--s2)','var(--s5)','var(--s4)','var(--s4)','var(--gold)','var(--s3)'][i]}"><b>${r[0]}</b><span class="ar">${r[2]}</span><span class="tiny muted">İllet yeri: ${r[1]}</span><span class="small">${r[3]}</span></div>`).join('')}</div><p class="small muted" style="margin-top:10px">Medd, lîn, zevâid ve illet harfleri aynıdır: و ي ا.</p>`;}
  else if(tab==='vecih')body=`<div class="vecih">${[['14','Mâzi, müstakbel, emir, nehiy (ma‘lûm ve meçhûl)','3 gâib · 3 gâibe · 3 muhâtab · 3 muhâtaba · 2 mütekellim'],['12','Ma‘lûm emir ve nehiy','Mütekellim gelmez'],['10','İsm-i fâil','Cem‘-i müzekker 4 lafız (نَاصِرُونَ، نُصَّارٌ، نُصَّرٌ، نَصَرَةٌ) · cem‘-i müennes 2 (نَاصِرَاتٌ، نَوَاصِرُ)'],['7','İsm-i mef‘ûl','Cem‘-i müzekker 2 (مَنْصُورُونَ، مَنَاصِيرُ) · cem‘-i müennes 1'],['6','Nûn-ı hafîfeli emir','Tesniye ve cem‘-i müennese girmez'],['6','Masdardan çıkan vecihler','Mâzi, muzâri, emir, nehiy, fâil, mef‘ûl']].map(r=>`<div class="vc"><span class="num">${AD(r[0])}</span><div><b>${r[1]}</b><div class="small muted">${AW(esc(r[2]))}</div></div></div>`).join('')}</div>`;
  else body=`<div class="grid g2"><div class="card"><h3>Mîmî masdar · zaman · mekân</h3><div class="tscroll" style="margin-top:8px"><table class="tbl lt"><thead><tr><th>Fiil</th><th>Masdar</th><th>Zaman-mekân</th></tr></thead><tbody>
    <tr><td>Sahîh, ecvef, muzâaf, mehmûz: muzâride ayn ötre/üstün</td><td class="a">مَفْعَلٌ</td><td class="a">مَفْعَلٌ</td></tr><tr><td>… ayn esre</td><td class="a">مَفْعَلٌ</td><td class="a">مَفْعِلٌ</td></tr><tr><td>Nâkıs, lefîf-i makrûn</td><td class="a">مَفْعَلٌ</td><td class="a">مَفْعَلٌ</td></tr><tr><td>Misâl, lefîf-i mefrûk</td><td class="a">مَفْعِلٌ</td><td class="a">مَفْعِلٌ</td></tr><tr><td>Mezîd</td><td colspan="2">Muzâri meçhûl + ötreli mim: <span class="ar">مُسْتَخْرَجٌ</span></td></tr></tbody></table></div>
    <p class="small" style="margin-top:8px"><b>13 şâz:</b> ${SHAZ.map(x=>A(x)).join(' · ')} · <b>2 masdar:</b> ${A('الْمَرْجِعُ')} ${A('الْمَصِيرُ')}</p></div>
    <div class="card"><h3>İsm-i fâil (mâzinin aynı)</h3><div class="tscroll" style="margin-top:8px"><table class="tbl lt"><tbody><tr><td>Üstün (1, 2, 3)</td><td class="a">فَاعِلٌ</td></tr><tr><td>Ötre (5)</td><td class="a">فَعِيلٌ · فَعْلٌ</td></tr><tr><td>Esre, müteaddî (4, 6)</td><td class="a">فَاعِلٌ</td></tr><tr><td>Esre, lâzım</td><td class="a">فَعِيلٌ · فَعِلٌ · أَفْعَلُ · فَعْلَانُ</td></tr></tbody></table></div>
    <h3 style="margin-top:12px">Mübâlağa</h3><div class="leafs" style="justify-content:flex-start">${MUBALAGA.map(m=>`<span title="${esc(m[1])}">${esc(m[0])}</span>`).join('')}</div></div></div>`;
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">التَّقْسِيمُ</div><h2>Haritalar</h2></div></div><div class="filter" style="margin-bottom:12px">${tabs.map(([k,t])=>`<a class="btn sm ${k===tab?'pri':''}" href="#harita/${k}">${t}</a>`).join('')}</div>${body}`;
  $$('.tn').forEach(b=>b.onclick=()=>{if(b.classList.contains('leaf'))return;b.setAttribute('aria-expanded',b.getAttribute('aria-expanded')==='true'?'false':'true');beep('tap');});
};
/* ===================== OYUNLAR ===================== */
const GAMES=[
 {id:'bab',ic:'door',t:'Bâb Avcısı',d:'Mâzi ve muzârisinden fiilin Maksûd’daki bâbını bul.'},
 {id:'vezin',ic:'split',t:'Vezin Ustası',d:'Mezîd fiil hangi bâbın kalıbında basılmış?'},
 {id:'siga',ic:'role',t:'Sîga Tanı',d:'Basılan sikke hangi sîga? Gâib mi, muhâtaba mı?'},
 {id:'kisim',ic:'tree',t:'Yedi Kısım',d:'Misâl, ecvef, nâkıs, lefîf, muzâaf, mehmûz, sahîh.'},
 {id:'vasl',ic:'mark',t:'Vasl mı Kat‘ mı?',d:'Bu kelimenin hemzesi düşer mi?'},
 {id:'mimi',ic:'target',t:'Mekân Kalıbı',d:'Muzârinin aynına bak: مَفْعَلٌ mı مَفْعِلٌ mi?'},
 {id:'ibdal',ic:'gear',t:'İftiâl Tezgâhı',d:'Köke iftiâl uygula: tâ ط mı olur, د mı, ت mi?'},
 {id:'kural',ic:'fire',t:'Hangi Kural?',d:'Dönüşümde işleyen i‘lâl kuralını seç.'},
 {id:'asl',ic:'ghost',t:'Aslını Bul',d:'İ‘lâlli kelimenin aslı neydi?'},
 {id:'mana',ic:'eye',t:'Bâbın Mânâsı',d:'Ta‘diye, sayrûret, vicdân, taleb, tahavvül…'},
 {id:'tadiye',ic:'bridge',t:'Lâzım–Müteaddî',d:'Fiil nasıl geçişli ya da geçişsiz oldu?'},
 {id:'yaris',ic:'bolt',t:'Kısım Yarışı',d:'60 saniye: fiili doğru kısma gönder.'}
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
function mcGame(id,title,items,render,N=10){
  app.innerHTML=gHead(title);let n=0,sc=0,streak=0;const pool=shuffle(items).slice(0,N);
  const round=()=>{
    if(n>=pool.length)return gameEnd(id,sc,`${pool.length} turda ${sc} puan.`,()=>mcGame(id,title,items,render,N));
    const it=pool[n++];const R=render(it);$('#gi').textContent=`${n}/${pool.length} · Puan ${sc}`;
    $('#gc').innerHTML=`${R.html}<div class="opts" style="${R.cols?`grid-template-columns:repeat(${R.cols},minmax(0,1fr))`:''}">${R.opts.map((o,j)=>`<button class="${isAr(o)?'opt ar1':'opt tr'}" data-j="${j}">${isAr(o)?esc(o):AW(esc(o))}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('#gc [data-j]').forEach(b=>b.onclick=()=>{const good=+b.dataset.j===R.a;$$('#gc [data-j]').forEach(x=>{x.disabled=true;if(+x.dataset.j===R.a)x.classList.add('ok');});if(!good){b.classList.add('no');streak=0;}else{streak++;sc+=10+Math.min(streak,5)*2;}
      beep(good?'ok':'no');$('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Doğrusu gösterildi. ')+`<div class="small" style="font-weight:400">${R.ex||''}</div>`;TIMERS.push(setTimeout(round,good?1200:2400));});
  };round();
}
const P2=(p,s)=>`<p class="muted small" style="text-align:center;margin:0">${p}</p>${isAr(s)?`<div class="qar">${esc(s)}</div>`:`<div class="qtr">${AW(esc(s))}</div>`}`;
const mcOpts=(right,pool,n=4)=>{const o=shuffle([right,...sample([...new Set(pool)].filter(x=>x!==right),n-1)]);return {o,a:o.indexOf(right)};};
const pairOf=(r,b)=>fill(mzS(b)+VW.a,r.split(''))+' '+fill(PRE[0]+muS(b)+VW.u,r.split(''));
GAME.bab=()=>mcGame('bab','Bâb Avcısı',ROOTS,x=>{const B=babOf(x.b);return {html:P2('Maksûd’a göre kaçıncı bâb?',pairOf(x.r,B)),opts:BABS.map(b=>b.id+'. '+b.vz),a:x.b-1,cols:2,ex:`${x.b}. bâb <span class="ar">${B.ar}</span> — ${esc(B.tr)}`};},10);
GAME.vezin=()=>mcGame('vezin','Vezin Ustası',VITRIN,v=>{const m=mcOpts(v.v,VITRIN.map(y=>y.v));return {html:P2('Hangi bâbın kalıbı?',v.c[0]+' '+v.c[1]),opts:m.o,a:m.a,cols:2,ex:`${esc(v.g)} · ${esc(v.m)}`};},10);
function sigaItem(){const x=pick(ROOTS),B=babOf(x.b);const T=pick(TABLES.filter(t=>t.n===14&&!t.pas||t.id==='mazi'||t.id==='muz'));const i=pick(T.only||ALL);const f=fill(T.f(B,i),x.r.split(''));
  const same=(T.only||ALL).filter(j=>fill(T.f(B,j),x.r.split(''))===f);const others=(T.only||ALL).filter(j=>!same.includes(j));
  const o=shuffle([i,...sample(others,3)]);return {f,T,i,same,o};}
GAME.siga=()=>mcGame('siga','Sîga Tanı',Array.from({length:12},sigaItem),it=>({html:P2(`${it.T.tr}: bu sikke hangi sîga?`,it.f),opts:it.o.map(j=>SIGA[j].tr),a:it.o.indexOf(it.i),cols:2,ex:it.same.length>1?'Aynı lafız: '+it.same.map(j=>SIGA[j].tr).join(' = '):''}),12);
GAME.kisim=()=>mcGame('kisim','Yedi Kısım',KISMQ,it=>{const m=mcOpts(KISM[it[1]],Object.values(KISM));return {html:P2('Bu fiil hangi kısımdandır?',it[0]),opts:m.o,a:m.a,cols:2,ex:''};},12);
GAME.vasl=()=>mcGame('vasl','Vasl mı Kat‘ mı?',VASL,it=>({html:P2('Hemzesi nasıl?',it[0]),opts:['Hemze-i vasl (düşer)','Hemze-i kat‘ (düşmez)'],a:it[1]==='v'?0:1,cols:2,ex:esc(it[2])}),12);
GAME.mimi=()=>mcGame('mimi','Mekân Kalıbı',ROOTS,x=>{const B=babOf(x.b),r=x.r.split('');const right=fill(mimi(B).zm,r);const o=shuffle([...new Set([right,fill('مَFْAَLٌ',r),fill('مَFْAِLٌ',r),fill('مُFْAَLٌ',r),fill('مِFْAَLٌ',r)])].slice(0,4));if(!o.includes(right))o[0]=right;const oo=shuffle(o);
  return {html:P2('Bu fiilden ism-i mekân?',pairOf(x.r,B)),opts:oo,a:oo.indexOf(right),cols:2,ex:B.mu==='i'?'Muzâride ayn esre → مَفْعِلٌ':'Muzâride ayn ötre/üstün → مَفْعَلٌ'};},10);
GAME.ibdal=()=>mcGame('ibdal','İftiâl Tezgâhı',IBDAL,it=>{const o=shuffle([it[1],...it[2]]);return {html:P2('Bu kökün اِفْتَعَلَ bâbı?',it[0].split('').join(' ')),opts:o,a:o.indexOf(it[1]),cols:2,ex:'Fâ: '+it[0][0]};},10);
const STEPS=ILAL.flatMap((x,i)=>x.s.map((s,k)=>({x,i,k,s,from:k?x.s[k-1][1]:x.a})));
GAME.kural=()=>mcGame('kural','Hangi Kural?',STEPS.filter(s=>s.from!==s.s[1]),it=>{const right=it.s[0];const o=shuffle([right,...sample(Object.keys(KURAL).filter(k=>k!==right&&KURAL[k].t!==KURAL[right].t),3)]);
  return {html:`<p class="muted small" style="text-align:center;margin:0">${esc(it.x.c)}</p><div class="qar">${esc(it.from)} <span class="muted">←</span> ${esc(it.s[1])}</div><p class="tiny muted" style="text-align:center">sağdaki şekil soldakine dönüşüyor</p>`,opts:o.map(k=>(KURAL[k].n?'Kural '+KURAL[k].n+' · ':'')+KURAL[k].t),a:o.indexOf(right),cols:2,ex:AW(esc(it.s[2]))};},12);
GAME.asl=()=>mcGame('asl','Aslını Bul',ILAL.filter(x=>x.a!==x.w),x=>{const pool=ILAL.filter(y=>y!==x&&y.a!==x.a).map(y=>y.a);const near=pool.filter(a=>Math.abs(CL(a).length-CL(x.a).length)<=2);const m=mcOpts(x.a,near.length>=3?near:pool);
  return {html:P2('Bu kelimenin aslı?',x.w),opts:m.o,a:m.a,cols:2,ex:x.s.map(s=>KURAL[s[0]].t).join(' → ')};},12);
GAME.mana=()=>mcGame('mana','Bâbın Mânâsı',MANA,it=>{const m=mcOpts(it[1],MANAK);return {html:P2(`${it[2]} bâbı: hangi mânâ?`,it[0]),opts:m.o,a:m.a,cols:2,ex:''};},10);
GAME.tadiye=()=>mcGame('tadiye','Lâzım–Müteaddî',TADIYE,it=>{const m=mcOpts(TADK[it[1]],Object.values(TADK));return {html:P2('Burada ne oldu?',it[0]),opts:m.o,a:m.a,cols:1,ex:esc(it[2])};},10);
GAME.yaris=()=>{app.innerHTML=gHead('Kısım Yarışı');let sc=0,n=0,left=60,cur=null;const pool=shuffle(KISMQ);
  const KB=[['sahih','Sahîh'],['misal','Misâl'],['ecvef','Ecvef'],['nakis','Nâkıs'],['lmak','Lefîf-i makrûn'],['lmef','Lefîf-i mefrûk'],['muz','Muzâaf'],['mh','Mehmûz']];
  const kk=k=>['mf','ma','ml'].includes(k)?'mh':k;
  $('#gc').innerHTML=`<div style="text-align:center"><p>Fiil yedi kısmın hangisinden? 60 saniyen var.</p><button class="btn pri" id="st">Başla</button></div>`;
  $('#st').onclick=()=>{TIMERS.push(setInterval(()=>{left--;$('#gi').textContent=`⏱ ${left} sn · Puan ${sc}`;if(left<=0){stopTimers();gameEnd('yaris',sc,`${n} fiilde ${sc} puan.`,GAME.yaris);}},1000));nx();};
  const nx=()=>{cur=pool[n%pool.length];n++;$('#gi').textContent=`⏱ ${left} sn · Puan ${sc}`;
    $('#gc').innerHTML=`<div class="qar">${esc(cur[0])}</div><div class="opts" style="grid-template-columns:repeat(2,minmax(0,1fr))">${KB.map(([k,t])=>`<button class="opt tr" data-k="${k}">${t}</button>`).join('')}</div>`;
    $$('#gc [data-k]').forEach(b=>b.onclick=()=>{const good=b.dataset.k===kk(cur[1]);if(good){sc+=10;beep('ok');b.classList.add('ok');}else{beep('no');b.classList.add('no');$(`#gc [data-k="${kk(cur[1])}"]`).classList.add('ok');}$$('#gc [data-k]').forEach(x=>x.disabled=true);TIMERS.push(setTimeout(()=>{if(left>0)nx();},good?350:900));});};
};
/* ===================== KARTLAR ===================== */
const DECKS={
 terim:{t:'Istılahlar',h:'Mânâsı? Kartı çevir.',items:TERMS.map(t=>({f:t[0],b:`<b>${esc(t[1])}</b><div class="small" style="margin-top:6px">${AW(esc(t[2]))}</div>`}))},
 vezin:{t:'Bâb vezinleri',h:'Hangi grup, misali ne?',items:VITRIN.map(v=>({f:v.v,b:`<b>${esc(v.g)}</b><div class="ar" style="font-size:1.3rem;margin-top:6px">${esc(v.c.slice(0,3).join(' · '))}</div><div class="small muted">${esc(v.m)}</div>`}))},
 ilal:{t:'İ‘lâl',h:'Aslı ve kuralları? Kartı çevir.',items:ILAL.filter(x=>x.a!==x.w).map(x=>({f:x.w,b:`<div class="ar" style="font-size:1.6rem">${esc(x.a)}</div><div class="small" style="margin-top:6px">${x.s.map(s=>esc(KURAL[s[0]].t)).join(' → ')}</div><div class="tiny muted">${esc(x.c)}</div>`}))}
};
V.kart=([dk])=>{
  dk=DECKS[dk]?dk:'terim';const D=DECKS[dk];
  const box=i=>S.cards[dk+i]||0;
  const due=()=>{const min=Math.min(...D.items.map((_,i)=>box(i)));return pick(D.items.map((_,i)=>i).filter(i=>box(i)===min));};
  let cur=due(),flip=false;
  const draw=()=>{const it=D.items[cur];const bx=[0,1,2,3,4].map(k=>D.items.filter((_,i)=>box(i)===k).length);
    app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Kart destesi · Leitner</div><h2>${D.t}</h2></div></div>
    <div class="filter" style="margin-bottom:10px">${Object.entries(DECKS).map(([k,d])=>`<a class="btn sm ${k===dk?'pri':''}" href="#kart/${k}">${d.t}</a>`).join('')}</div>
    <div class="stage"><div class="hud"><span class="small muted">Kutular: ${bx.map((n,i)=>`${i+1}:${n}`).join(' · ')}</span></div>
    <div class="flash ${flip?'flip':''}" id="fc"><div class="in"><div class="face"><div class="qar">${esc(it.f)}</div><p class="muted small">${D.h}</p></div><div class="face bk">${it.b}</div></div></div>
    <div class="row" style="justify-content:center"><button class="btn" id="fl">Çevir</button><button class="btn" id="no" ${flip?'':'disabled'}>Tekrar et</button><button class="btn pri" id="ok" ${flip?'':'disabled'}>Bildim</button><button class="btn ghost" id="sy" aria-label="Dinle">${ICON.play}</button></div>
    <p class="tiny muted" style="text-align:center">Bildiğin kart bir üst kutuya geçer; bilemediğin ilk kutuya döner. Alt kutudakiler önce gelir.</p></div>`;
    $('#fc').onclick=$('#fl').onclick=()=>{flip=!flip;draw();};$('#sy').onclick=()=>speak(it.f);
    $('#ok').onclick=()=>{S.cards[dk+cur]=Math.min(4,box(cur)+1);save();addXP(2);beep('ok');cur=due();flip=false;draw();};
    $('#no').onclick=()=>{S.cards[dk+cur]=0;save();beep('tap');cur=due();flip=false;draw();};};
  draw();
};
/* ===================== SINAV ===================== */
const TAGS={ders:'Metin ve tarifler',bab:'Sülâsî bâblar',vezin:'Mezîd vezinler',vasl:'Hemze-i vasl',mimi:'Mîmî masdar / mekân',siga:'Sîgalar',kisim:'Yedi kısım',ibdal:'İftiâl ibdâli',mana:'Bâb mânâları',tadiye:'Lâzım–müteaddî',ilal:'İ‘lâl kuralları',asl:'Aslî şekil'};
function genExam(scopes,count){
  const gens=[];const B=k=>scopes.includes(k);
  const lessonQ=k=>()=>{const L=pick(LESSONS.filter(l=>(l.k||1)===k));const q=pick(L.q);return {tag:'ders',k,q:AW(esc(q[0])),o:q[1],a:q[2],ex:AW(esc(q[3]))+` <span class="muted">(Ders: ${esc(L.t)})</span>`};};
  const W=(tag,k,f)=>()=>{const r=f();return r&&Object.assign({tag,k},r);};
  if(B(1)){gens.push(lessonQ(1),lessonQ(1),
    W('bab',1,()=>{const x=pick(ROOTS),b=babOf(x.b);return {q:`${A(pairOf(x.r,b))} Maksûd’a göre kaçıncı bâbdır?`,o:BABS.map(y=>y.id+'. bâb ('+y.vz+')'),a:x.b-1,ex:b.ar};}),
    W('vezin',1,()=>{const v=pick(VITRIN);const m=mcOpts(v.v,VITRIN.map(y=>y.v));return {q:`${A(v.c[0])} hangi bâbın veznindedir?`,o:m.o,a:m.a,ex:esc(v.g)};}));}
  if(B(2)){gens.push(lessonQ(2),lessonQ(2),
    W('vasl',2,()=>{const it=pick(VASL);return {q:`${A(it[0])} kelimesinin hemzesi?`,o:['Hemze-i vasl','Hemze-i kat‘'],a:it[1]==='v'?0:1,ex:esc(it[2])};}),
    W('mimi',2,()=>{const x=pick(ROOTS),b=babOf(x.b),r=x.r.split('');const right=fill(mimi(b).zm,r);const o=[...new Set([right,fill('مَFْAَLٌ',r),fill('مَFْAِLٌ',r),fill('مُFْAَLٌ',r)])];return {q:`${A(pairOf(x.r,b))} fiilinden ism-i mekân?`,o,a:o.indexOf(right),ex:b.mu==='i'?'Ayn esre → مَفْعِلٌ':'Ayn ötre/üstün → مَفْعَلٌ'};}));}
  if(B(3)){gens.push(lessonQ(3),
    W('siga',3,()=>{const it=sigaItem();return {q:`${esc(it.T.tr)}: ${A(it.f)} hangi sîgadır?`,o:it.o.map(j=>SIGA[j].tr),a:it.o.indexOf(it.i),ex:''};}),
    W('siga',3,()=>{const it=sigaItem();return {q:`${esc(it.T.tr)}: ${A(it.f)} hangi sîgadır?`,o:it.o.map(j=>SIGA[j].tr),a:it.o.indexOf(it.i),ex:''};}));}
  if(B(4)){gens.push(lessonQ(4),lessonQ(4),
    W('kisim',4,()=>{const it=pick(KISMQ);const m=mcOpts(KISM[it[1]],Object.values(KISM));return {q:`${A(it[0])} hangi kısımdandır?`,o:m.o,a:m.a,ex:''};}),
    W('ibdal',4,()=>{const it=pick(IBDAL);const o=[it[1],...it[2]];return {q:`${A(it[0].split('').join(' '))} kökünden اِفْتَعَلَ?`,o,a:0,ex:''};}),
    W('mana',4,()=>{const it=pick(MANA);const m=mcOpts(it[1],MANAK);return {q:`${A(it[0])} (${esc(it[2])}) hangi mânâdadır?`,o:m.o,a:m.a,ex:''};}),
    W('tadiye',4,()=>{const it=pick(TADIYE);const m=mcOpts(TADK[it[1]],Object.values(TADK));return {q:`${AW(esc(it[0]))}: ne olmuştur?`,o:m.o,a:m.a,ex:esc(it[2])};}));}
  if(B(5)){gens.push(lessonQ(5),lessonQ(5),
    W('ilal',5,()=>{const it=pick(STEPS.filter(s=>s.from!==s.s[1]));const right=it.s[0];const o=[right,...sample(Object.keys(KURAL).filter(k=>k!==right&&KURAL[k].t!==KURAL[right].t),3)];return {q:`${A(it.from)} → ${A(it.s[1])}: hangi işlem?`,o:o.map(k=>(KURAL[k].n?'Kural '+KURAL[k].n+' · ':'')+KURAL[k].t),a:0,ex:AW(esc(it.s[2]))};}),
    W('asl',5,()=>{const x=pick(ILAL.filter(y=>y.a!==y.w));const m=mcOpts(x.a,ILAL.filter(y=>y!==x&&y.a!==x.a).map(y=>y.a));return {q:`${A(x.w)} kelimesinin aslı?`,o:m.o,a:m.a,ex:x.s.map(s=>esc(KURAL[s[0]].t)).join(' → ')};}));}
  const out=[],keys=new Set();let guard=0;
  while(out.length<count&&guard++<count*60){const q=pick(gens)();if(!q||q.a<0||new Set(q.o).size!==q.o.length)continue;if(keys.has(q.q))continue;keys.add(q.q);const idx=shuffle(q.o.map((_,i)=>i));q.o=idx.map(i=>q.o[i]);q.a=idx.indexOf(q.a);out.push(q);}
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
    <div class="grid" style="gap:6px">${[1,2,3,4,5].map(k=>`<label class="check"><input type="checkbox" value="${k}" checked><span>${KISIM[k].tr}${k===1?' (mukaddime dâhil)':''}</span></label>`).join('')}</div>
    <div class="row" style="margin-top:12px"><div class="field"><label for="qn">Soru sayısı</label><select id="qn"><option>10</option><option selected>20</option><option>30</option><option>40</option><option>50</option></select></div>
    <div class="field"><label for="tm">Süre</label><select id="tm"><option value="0">Süresiz</option><option value="10">10 dk</option><option value="20" selected>20 dk</option><option value="30">30 dk</option><option value="45">45 dk</option></select></div></div>
    <div class="row" style="margin-top:14px"><button class="btn pri" id="go">Sınavı başlat ${ICON.arrow}</button></div></div>
  <div class="card"><h3>Soru türleri</h3><ul class="small muted" style="padding-inline-start:18px;margin:8px 0 0">${Object.values(TAGS).map(t=>`<li>${t}</li>`).join('')}</ul>
    <p class="small" style="margin-top:12px"><b>Değerlendirme:</b> 85+ Pekiyi · 70+ İyi · 60+ Orta · 50+ Geçer · altı Tekrar.</p>
    ${hist.length?`<h3 style="margin-top:14px">Geçmiş</h3><div class="bars" style="margin-top:8px">${hist.map(e=>`<div><span class="small">${new Date(e.at).toLocaleDateString('tr-TR')} · ${e.n} soru</span><div class="pbar"><i style="width:${e.pct}%"></i></div><b>%${e.pct}</b></div>`).join('')}</div>`:''}</div></div>`;
  $('#go').onclick=()=>{const sc=$$('.check input:checked').map(x=>+x.value);if(!sc.length){toast('En az bir kısım seç.');return;}S.name=$('#nm').value.trim();save();
    const qs=genExam(sc,+$('#qn').value);if(qs.length<+$('#qn').value)toast('Bu kapsamda '+qs.length+' farklı soru hazırlandı.');EX={qs,ans:qs.map(()=>null),flag:qs.map(()=>false),i:0,start:Date.now(),limit:+$('#tm').value*60,done:false,sc};location.hash='#sinav/run';};
};
function examRun(){
  const draw=()=>{const q=EX.qs[EX.i];
    app.innerHTML=`<div class="stage"><div class="hud"><b>Soru ${EX.i+1}/${EX.qs.length}</b><span class="chip">${TAGS[q.tag]}</span><span class="timer" id="tm"></span></div>
    <div class="pbar"><i style="width:${EX.ans.filter(a=>a!==null).length/EX.qs.length*100}%"></i></div>
    <div class="card" style="margin-top:12px"><div class="q">${q.q}</div><div class="opts">${q.o.map((o,j)=>`<button class="${isAr(o)?'opt':'opt tr'} ${EX.ans[EX.i]===j?'picked':''}" data-j="${j}">${isAr(o)?esc(o):AW(esc(o))}</button>`).join('')}</div>
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
  const tags={},bs={};EX.qs.forEach((q,i)=>{const ok=EX.ans[i]===q.a;const t=tags[q.tag]=tags[q.tag]||{n:0,c:0};t.n++;if(ok)t.c++;const b=bs[q.k]=bs[q.k]||{n:0,c:0};b.n++;if(ok)b.c++;});
  const bar=(lab,v)=>`<div><span>${lab}</span><div class="pbar"><i style="width:${v.c/v.n*100}%;background:${v.c/v.n>=.7?'var(--good)':v.c/v.n>=.5?'var(--gold)':'var(--bad)'}"></i></div><b>${v.c}/${v.n}</b></div>`;
  app.innerHTML=`<div class="stage"><div class="card" style="text-align:center"><div class="eyebrow">Sınav sonucu</div><div class="scorebig">%${EX.pct}</div><p><b>${grade(EX.pct)}</b> · ${EX.c}/${EX.qs.length} doğru · ${Math.floor(EX.time/60)} dk ${EX.time%60} sn</p>
    <div class="row" style="justify-content:center"><button class="btn pri" id="cert">Başarı belgesi</button>${EX.c<EX.qs.length?'<button class="btn" id="wr">Yanlışlarla yeni sınav</button>':''}<a class="btn" href="#sinav">Yeni sınav</a></div></div>
  <div class="card" style="margin-top:12px"><h3>Kısım raporu</h3><div class="bars" style="margin-top:10px">${Object.entries(bs).map(([k,v])=>bar(KISIM[k].tr,v)).join('')}</div><h3 style="margin-top:14px">Konu raporu</h3><div class="bars" style="margin-top:10px">${Object.entries(tags).map(([k,v])=>bar(TAGS[k],v)).join('')}</div></div>
  <div class="card" style="margin-top:12px"><h3>Cevap anahtarı</h3>${EX.qs.map((q,i)=>{const ok=EX.ans[i]===q.a;const sh=x=>isAr(x)?A(x):AW(esc(x));return `<div class="rev ${ok?'ok':'no'}"><div class="small"><b>${i+1}.</b> ${q.q}</div><div class="small" style="margin-top:4px">${ok?'✓':'✗'} Cevabın: ${EX.ans[i]===null?'<i>boş</i>':sh(q.o[EX.ans[i]])}${ok?'':` · Doğrusu: <b>${sh(q.o[q.a])}</b>`}</div><div class="tiny muted" style="margin-top:2px">${q.ex}</div></div>`;}).join('')}</div></div>`;
  $('#cert').onclick=()=>location.hash='#sinav/belge';
  if($('#wr'))$('#wr').onclick=()=>{const w=EX.qs.filter((q,i)=>EX.ans[i]!==q.a).map(q=>Object.assign({},q));EX={qs:w,ans:w.map(()=>null),flag:w.map(()=>false),i:0,start:Date.now(),limit:0,done:false,sc:EX.sc};location.hash='#sinav/run';};
}
function examCert(){
  const d=new Date().toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});
  app.innerHTML=`<div class="stage"><div class="cert"><div class="kufi">الْمَقْصُودُ</div><div class="eyebrow" style="margin-top:6px">Başarı Belgesi</div>
  <h2 style="margin-top:10px">${esc(S.name||'Değerli öğrenci')}</h2><p>Maksûd Darphânesi programında <b>Kitâbü’l-Maksûd</b> sınavını <b>${EX.qs.length}</b> soruda <b>%${EX.pct}</b> başarı ile tamamlamış ve <b>“${grade(EX.pct)}”</b> derecesini almıştır.</p>
  <p class="muted small">${d} · Rütbe: ${lvl().name} · Altın sikke: ${LESSONS.filter(l=>lstar(l.id)===3).length}/${LESSONS.length}</p>
  <p class="small" style="margin-top:16px"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p></div>
  <div class="row noprint" style="justify-content:center;margin-top:14px"><button class="btn pri" id="pr">Yazdır / PDF</button><a class="btn" href="#sinav/sonuc">Sonuca dön</a></div></div>`;
  $('#pr').onclick=()=>window.print();
}
/* ===================== PROGRAM HAKKINDA ===================== */
V.hakkinda=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">عَنِ الْبَرْنَامَجِ</div><h2>Program hakkında</h2></div></div>
  <div class="card" style="text-align:center;padding:28px 18px">
    <div class="kufi" style="font-family:var(--f-kufi);font-size:2rem;color:var(--gold);direction:rtl">الْمَقْصُودُ</div>
    <p style="margin-top:14px;font-size:1.05rem"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p>
    <p class="muted">Kaynak: <i>Kitâbü’l-Maksûd</i> (müellifi meçhul; İmam-ı A‘zam Ebû Hanîfe’ye de nispet edilir), nşr. Dr. Musa Alak, İstanbul 2011</p>
    <p class="muted">© 2026 Hüseyin KAYA · İstifade edilmesi temennisiyle…</p>
  </div>
  <div class="card" style="margin-top:14px"><h3>İçindekiler</h3><ul class="small" style="padding-inline-start:18px;margin:8px 0 0;line-height:1.8">
    <li><b>${LESSONS.length} ders</b>: kitabın harekeli metni, Türkçe şerh, misaller ve ${LESSONS.reduce((a,l)=>a+l.q.length,0)} soruluk mini sınavlar</li>
    <li><b>Darphâne</b>: ${ROOTS.length} hazır kök (veya kendi kökün), altı bâb, ${TABLES.length} çekim tablosu, fâil, mef‘ûl, mîmî; kitabın ${VITRIN.length} bâb zinciri</li>
    <li><b>İ‘lâl Ocağı</b>: ${ILAL.length} dönüşüm zinciri (${STEPS.length} adım), kendin dönüştür modu, Kural Makinesi ve ${Object.keys(KURAL).length} kural kartı</li>
    <li><b>${GAMES.length} oyun</b>, üç kart destesi, haritalar ve raporlu sınav</li></ul>
    <p class="small muted" style="margin-top:10px">Program tek bir dosyadır ve internet bağlantısı olmadan çalışır. İlerlemeniz yalnızca bu cihazda saklanır.</p></div>`;
};
/* ---------- başlat ---------- */
document.documentElement.lang='tr';
themeBtn();sndBtn();hud();route();
