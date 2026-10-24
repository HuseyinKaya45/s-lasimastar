/* ---------- rozetler ---------- */
const BADGES=[
 ['ilk','İlk Adım','İlk dersi oku',()=>Object.keys(S.les).length>0],
 ['g1','Kuzey','Vaz‘ ayrımının bütün derslerinde 2+ yıldız',()=>LESSONS.filter(l=>l.g===1).every(l=>lstar(l.id)>=2)],
 ['g2','Doğu','İsti‘mâl dersinde 2+ yıldız',()=>LESSONS.filter(l=>l.g===2).every(l=>lstar(l.id)>=2)],
 ['g3','Güney','Açıklık-kapalılık derslerinde 2+ yıldız',()=>LESSONS.filter(l=>l.g===3).every(l=>lstar(l.id)>=2)],
 ['g4','Batı','Delâlet derslerinde 2+ yıldız',()=>LESSONS.filter(l=>l.g===4).every(l=>lstar(l.id)>=2)],
 ['lab5','Müstenbit','Tahlil Masası’nda 5 nass çöz',()=>Object.keys(S.lab).length>=5],
 ['laball','Nass Ehli','Bütün nasları tahlil et',()=>NASS.every((_,i)=>S.lab[i]!=null)],
 ['sinav','Mümtaz','Bir sınavdan %90 ve üstü al',()=>S.exams.some(e=>e.pct>=90)],
 ['oyun','Oyun Ehli','Bütün oyunları oyna',()=>GAMES.every(g=>S.played[g.id])],
 ['seri','Devamlılık','3 gün üst üste çalış',()=>S.streak>=3],
 ['tam','Pusula Tamam','Bütün derslerde üç yıldız',()=>LESSONS.every(l=>lstar(l.id)===3)]
];
function checkBadges(){BADGES.forEach(([id,t,,f])=>{if(!S.badges[id]&&f()){S.badges[id]=1;save();toast('Rozet kazandın: '+t);beep('win');}});}
/* ---------- yönlendirme ---------- */
const V={};let TIMERS=[];
function stopTimers(){TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);});TIMERS=[];onResize=null;}
let onResize=null;addEventListener('resize',()=>{if(onResize)onResize();});
function route(){
  stopTimers();
  const h=(location.hash||'#home').slice(1).split('/');const v=h[0]||'home';
  const map={home:'home',dersler:'dersler',ders:'dersler',lab:'lab',terazi:'terazi',oyun:'oyun',kart:'kart',sinav:'sinav',hakkinda:'hakkinda'};
  $$('#tabs a').forEach(a=>a.classList.toggle('on',a.dataset.v===(map[v]||'home')));
  (V[v]||V.home)(h.slice(1));
  app.classList.remove('view');void app.offsetWidth;app.classList.add('view');
  window.scrollTo({top:0});checkBadges();
}
addEventListener('hashchange',route);
/* ===================== PUSULA (ana sayfa) ===================== */
const ANG={1:-90,2:0,3:90,4:180};
const SHORTAR={1:'الْوَضْعُ',2:'الِاسْتِعْمَالُ',3:'الظُّهُورُ وَالْخَفَاءُ',4:'كَيْفِيَّةُ الدَّلَالَةِ'};
function compassPos(){
  const pos={};const cx=340,cy=280;
  [1,2,3,4].forEach(g=>{const ls=LESSONS.filter(l=>l.g===g);const rings=ls.length>7?[[115,ls.slice(0,7)],[178,ls.slice(7)]]:[[150,ls]];
    rings.forEach(([r,arr])=>{const n=arr.length,step=r>150?11:13;arr.forEach((l,k)=>{const a=(ANG[g]+(k-(n-1)/2)*step)*Math.PI/180;pos[l.id]=[Math.round(cx+Math.cos(a)*r),Math.round(cy+Math.sin(a)*r),a,r];});});});
  return pos;
}
function compassSVG(){
  const cx=340,cy=280,P=compassPos();const next=LESSONS.find(l=>lstar(l.id)<2)||LESSONS[0];
  let s=`<svg viewBox="0 0 680 560" role="img" aria-label="Lafız pusulası: dört ayrım ve dersler"><defs><radialGradient id="cg" cx="50%" cy="40%"><stop offset="0" stop-color="var(--panel2)"/><stop offset="1" stop-color="var(--panel)"/></radialGradient></defs>`;
  /* sektörler */
  [1,2,3,4].forEach(g=>{const a1=(ANG[g]-42)*Math.PI/180,a2=(ANG[g]+42)*Math.PI/180,r0=70,r1=222;
    s+=`<path d="M${cx+Math.cos(a1)*r0} ${cy+Math.sin(a1)*r0} L${cx+Math.cos(a1)*r1} ${cy+Math.sin(a1)*r1} A${r1} ${r1} 0 0 1 ${cx+Math.cos(a2)*r1} ${cy+Math.sin(a2)*r1} L${cx+Math.cos(a2)*r0} ${cy+Math.sin(a2)*r0} A${r0} ${r0} 0 0 0 ${cx+Math.cos(a1)*r0} ${cy+Math.sin(a1)*r0}z" fill="${GC(g)}" fill-opacity=".09" stroke="${GC(g)}" stroke-opacity=".3"/>`;});
  /* kadran */
  s+=`<circle cx="${cx}" cy="${cy}" r="230" fill="none" stroke="var(--line)" stroke-width="2"/>`;
  for(let d=0;d<360;d+=6){const a=d*Math.PI/180,l=d%30===0?12:5;s+=`<line x1="${cx+Math.cos(a)*230}" y1="${cy+Math.sin(a)*230}" x2="${cx+Math.cos(a)*(230-l)}" y2="${cy+Math.sin(a)*(230-l)}" stroke="var(--muted)" stroke-opacity=".5"/>`;}
  /* gül */
  const rose=(r,w,rot,op)=>{let p='';for(let k=0;k<4;k++){const a=(rot+k*90)*Math.PI/180,b=a+Math.PI/2;p+=`<path d="M${cx} ${cy} L${cx+Math.cos(a-w)*r*.28} ${cy+Math.sin(a-w)*r*.28} L${cx+Math.cos(a)*r} ${cy+Math.sin(a)*r} L${cx+Math.cos(a+w)*r*.28} ${cy+Math.sin(a+w)*r*.28}z" fill="var(--gold)" fill-opacity="${op}"/>`;}return p;};
  s+=rose(205,.5,-45,.08)+rose(222,.4,-90,.13);
  /* halkalar */
  [115,150,178].forEach(r=>s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--line)" stroke-dasharray="2 6"/>`);
  /* etiketler */
  const lab={1:[cx,32],2:[598,cy-6],3:[cx,540],4:[82,cy-6]};
  [1,2,3,4].forEach(g=>{const [x,y]=lab[g];const ls=LESSONS.filter(l=>l.g===g),lit=ls.filter(l=>lstar(l.id)).length;
    s+=`<text x="${x}" y="${y}" text-anchor="middle" class="cn-ar" fill="${GC(g)}">${SHORTAR[g]}</text><text x="${x}" y="${y+20}" text-anchor="middle" class="cn-tr">${AYRIM[g].dir} · ${esc(AYR[g])} · ${lit}/${ls.length}</text>`;});
  /* ibre */
  const nn=next.g?P[next.id]:null;const deg=nn?(nn[2]*180/Math.PI+90):0;
  s+=`<g class="needle" style="transform:rotate(${deg}deg);transform-origin:${cx}px ${cy}px"><path d="M${cx} ${cy-96} L${cx+11} ${cy} L${cx} ${cy+30} L${cx-11} ${cy}z" fill="var(--gold)" opacity=".9"/><path d="M${cx} ${cy-96} L${cx+11} ${cy} L${cx} ${cy}z" fill="#000" opacity=".18"/></g>`;
  /* dersler */
  LESSONS.forEach(l=>{if(!l.g)return;const [x,y,a,r]=P[l.id];const st=lstar(l.id),c=GC(l.g);const lx=cx+Math.cos(a)*(r+21),ly=cy+Math.sin(a)*(r+21)+5;
    s+=`<g class="star" tabindex="0" role="link" data-l="${l.id}" aria-label="Ders ${l.i+1}: ${esc(l.t)}"><title>${l.i+1}. ${esc(l.t)}</title>
    <circle class="halo" cx="${x}" cy="${y}" r="15" fill="${c}" opacity="${[.08,.2,.34,.55][st]}"/><circle cx="${x}" cy="${y}" r="${4+st*1.6}" fill="${st?c:'var(--muted)'}"/>${l.id===next.id?`<circle cx="${x}" cy="${y}" r="19" fill="none" stroke="var(--gold)" stroke-width="2" class="pulse"/>`:''}
    <text x="${lx}" y="${ly}" text-anchor="middle" class="cn-n">${l.i+1}</text></g>`;});
  /* merkez */
  const g0=LESSONS[0];
  s+=`<g class="star" tabindex="0" role="link" data-l="${g0.id}" aria-label="Giriş: ${esc(g0.t)}"><title>Giriş: ${esc(g0.t)}</title><circle cx="${cx}" cy="${cy}" r="56" fill="url(#cg)" stroke="var(--gold)" stroke-width="${lstar(g0.id)?3:1.5}"/><text x="${cx}" y="${cy+4}" text-anchor="middle" class="cn-c">اللَّفْظُ</text><text x="${cx}" y="${cy+30}" text-anchor="middle" class="cn-n">Giriş</text></g>`;
  return s+'</svg>';
}
V.home=()=>{
  const lit=LESSONS.filter(l=>lstar(l.id)).length;
  const next=LESSONS.find(l=>lstar(l.id)<2)||LESSONS[0];
  const best=S.exams.length?Math.max(...S.exams.map(e=>e.pct)):null;
  app.innerHTML=`
  <section class="hero">
    <div>
      <div class="kufi">طُرُقُ الِاسْتِنْبَاطِ</div>
      <h1>Lafız Pusulası</h1>
      <p class="muted">İslâm hukukunda <b>kaynaklardan hüküm çıkarma</b> metodlarının lafızlar bölümü. Hanefî usulcülerin <b>dört ayrımı</b> pusulanın dört yönünde: <b>Kuzey</b> vaz‘, <b>Doğu</b> isti‘mâl, <b>Güney</b> açıklık ve kapalılık, <b>Batı</b> delâlet şekli. İbre, sıradaki dersi gösterir.</p>
      <div class="row" style="margin-top:12px"><a class="btn pri" href="#ders/${next.id}">${lstar(next.id)?'Devam et':'Başla'}: ${esc(next.t)} ${ICON.arrow}</a><a class="btn" href="#lab">Tahlil Masası</a></div>
      <div class="dirs">${[1,2,3,4].map(g=>`<a href="#dersler" style="--c:${GC(g)}"><b>${AYRIM[g].dir}</b><span class="ar">${SHORTAR[g]}</span><span class="tiny muted">${AYRIM[g].kinds.slice(0,4).join(' · ')}${AYRIM[g].kinds.length>4?' …':''}</span></a>`).join('')}</div>
      <div class="stat">
        <div><b>${lit}/${LESSONS.length}</b><span>okunan ders</span></div><div><b>${Object.keys(S.lab).length}/${NASS.length}</b><span>tahlil edilen nass</span></div>
        <div><b>${S.streak}</b><span>gün seri</span></div><div><b>${best===null?'—':best+'%'}</b><span>en iyi sınav</span></div>
      </div>
    </div>
    <div><div class="compass" id="cmp">${compassSVG()}</div>
      <div class="legend2"><span><i style="background:var(--muted)"></i>okunmadı</span><span><i style="background:var(--gold);opacity:.6"></i>okundu</span><span><i style="background:var(--gold)"></i>mini sınav geçildi</span><span>◯ sıradaki ders</span></div></div>
  </section>
  <div class="sec-h"><h2>Bölümler</h2></div>
  <div class="gcards">
    <a class="gcard" href="#dersler"><div class="ico">${ICON.book}</div><h3>Dersler</h3><p class="muted small">${LESSONS.length} ders: anlatım, Arapça âyet ve hadisler, Türkçe açıklama ve mini sınav.</p></a>
    <a class="gcard" href="#lab"><div class="ico">${ICON.target}</div><h3>Nass Tahlil Masası</h3><p class="muted small">${NASS.length} âyet ve hadisi dört ayrıma göre adım adım çöz.</p></a>
    <a class="gcard" href="#terazi"><div class="ico">${ICON.scale}</div><h3>Terazi ve tablolar</h3><p class="muted small">Açıklık merdiveni, haml matrisi, kuvvet terazisi, Hanefî–cumhur şemaları.</p></a>
    <a class="gcard" href="#oyun"><div class="ico">${ICON.bolt}</div><h3>${GAMES.length} oyun</h3><p class="muted small">Lafzın Kimliği, Dört Delâlet, Mefhûm Avcısı, Kim Söyledi?, Pusula Yarışı…</p></a>
    <a class="gcard" href="#sinav"><div class="ico">${ICON.eye}</div><h3>Sınav</h3><p class="muted small">Ayrım ayrım seçilebilen, süreli, konu raporlu sınav ve başarı belgesi.</p></a>
  </div>
  <div class="sec-h"><h2>Rozetler</h2><span class="muted small">${Object.keys(S.badges).length}/${BADGES.length}</span></div>
  <div class="badges">${BADGES.map(([id,t,d])=>`<div class="badge ${S.badges[id]?'on':''}">✦ <div><b>${t}</b><div class="tiny muted">${d}</div></div></div>`).join('')}</div>
  <div class="row" style="margin-top:22px"><button class="btn sm ghost" id="reset">İlerlemeyi sıfırla</button></div>`;
  $$('#cmp .star').forEach(g=>{g.onclick=()=>location.hash='#ders/'+g.dataset.l;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.onclick();}};});
  $('#reset').onclick=()=>{if(confirm('Bütün ilerleme silinsin mi?')){const snd=S.snd;S=FRESH();S.snd=snd;save();hud();route();}};
};
/* ===================== DERSLER ===================== */
V.dersler=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">مَبَاحِثُ الْأَلْفَاظِ</div><h2>Dersler</h2></div><span class="muted small">${LESSONS.filter(l=>lstar(l.id)).length}/${LESSONS.length} okundu</span></div>
  ${AYRIM.map(B=>{const ls=LESSONS.filter(l=>l.g===B.g);return `<div class="grp" style="--c:${B.col}"><h3>${B.tr}${B.g?` <span class="small muted">· ${B.dir}</span>`:''} <span class="ar">${esc(B.ar)}</span></h3><p class="small muted" style="margin:2px 0 8px">${esc(B.sub)}</p></div>
   <div class="lgrid">${ls.map(l=>`<a class="lcard" href="#ders/${l.id}" style="--c:${B.col}"><span class="num">${l.i+1}</span><span class="tt"><b>${esc(l.t)}</b>${l.ar?`<span class="ar">${esc(l.ar)}</span>`:''}</span><span>${stars(lstar(l.id))}<div class="tiny muted" style="text-align:end">${l.s}</div></span></a>`).join('')}</div>`;}).join('')}`;
};
V.ders=([id])=>{
  const L=LESSON[id];if(!L){location.hash='#dersler';return;}
  const B=AYRIM[L.g];const prev=LESSONS[L.i-1],next=LESSONS[L.i+1];
  if(!S.les[id]){S.les[id]={best:0};save();addXP(10);}
  const labs=NASS.map((x,i)=>[x,i]).filter(([x])=>x.l===id);
  app.innerHTML=`<div class="lnav"><a class="btn sm ghost" href="#dersler">${ICON.back} Dersler</a><div class="row">${prev?`<a class="btn sm" href="#ders/${prev.id}">‹ Önceki</a>`:''}${next?`<a class="btn sm" href="#ders/${next.id}">Sonraki ›</a>`:''}</div></div>
  <div class="card" style="margin-top:12px;border-top:4px solid ${B.col}">
    <div class="eyebrow" style="color:${B.col}">${B.tr}${B.g?' · '+B.dir:''} · Ders ${L.i+1} · ${L.s}</div>
    <h2 style="margin-top:4px">${esc(L.t)}</h2>${L.ar?`<div class="ar" style="font-size:1.5rem;color:var(--muted)">${esc(L.ar)}</div>`:''}
    <div style="margin-top:6px">${stars(lstar(id))}</div>
  </div>
  <div class="sec-h"><h2>Anlatım</h2></div>
  <div class="card serh">${AW(L.tr)}</div>
  <div class="sec-h"><h2>Nasslar ve misaller</h2></div>
  <div class="ex">${L.ex.map(e=>`<div class="${e[0]?'':'tronly'}">${e[0]?A(e[0]):''}<span class="small muted">${AW(e[1])}</span>${e[0]?`<button class="btn sm ghost" data-say="${esc(e[0])}" aria-label="Dinle">${ICON.play}</button>`:''}</div>`).join('')}</div>
  ${labs.length?`<div class="sec-h"><h2>Tahlil Masası’nda çöz</h2></div><div class="row">${labs.map(([x,i])=>`<a class="btn sm" href="#lab/${i}"><span class="ar">${esc(x.ar.split(' ').slice(0,5).join(' '))}…</span> <span class="tiny muted">${esc(x.ref)}</span></a>`).join('')}</div>`:''}
  <div class="sec-h"><div><h2>Mini sınav</h2><p class="muted small" style="margin:2px 0 0">%60 ile iki yıldız, tam puanla üç yıldız.</p></div><button class="btn sm" id="qr">Yeniden çöz</button></div>
  <div id="quiz"></div>
  <div class="lnav" style="margin-top:20px">${prev?`<a class="btn" href="#ders/${prev.id}">‹ ${esc(prev.t)}</a>`:'<span></span>'}${next?`<a class="btn pri" href="#ders/${next.id}">${esc(next.t)} ›</a>`:`<a class="btn pri" href="#sinav">Sınava geç ›</a>`}</div>`;
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
/* ===================== NASS TAHLİL MASASI ===================== */
function nassHTML(X,on){
  const hs=new Set((X.hl||[]).map(strip));
  return `<div class="nass">${X.ar.split(' ').map(w=>`<span class="${hs.has(strip(w))?'hlw'+(on?' on':''):''}">${esc(w)}</span>`).join(' ')}</div>`;
}
V.lab=([n])=>{
  let idx=n!=null&&NASS[+n]?+n:0;let mode='coz',q=null;
  const shell=()=>{
    const X=NASS[idx];
    app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">مَائِدَةُ التَّحْلِيلِ</div><h2>Nass Tahlil Masası</h2></div><div class="seg"><button data-m="coz" class="${mode==='coz'?'on':''}">Kendin çöz</button><button data-m="kesif" class="${mode==='kesif'?'on':''}">Tahlili gör</button></div></div>
    <div class="slist">${NASS.map((x,i)=>`<button data-s="${i}" class="${i===idx?'on':''} ${S.lab[i]!=null?'done':''}" title="${esc(x.ref)}">${i+1}</button>`).join('')}</div>
    <div class="labwrap"><div>
      <div class="desk"><div class="eyebrow" style="text-align:center">${esc(X.ref)}</div>${nassHTML(X,mode==='kesif')}<p class="small muted" style="text-align:center;margin:8px 0 0">“${esc(X.tr)}”</p>
      <div class="row" style="justify-content:center;margin-top:10px"><button class="btn sm" id="say">${ICON.play} Dinle</button><a class="btn sm ghost" href="#ders/${X.l}">İlgili ders ›</a></div></div>
      <div class="lenses">${[1,2,3,4].map(g=>{const k=X.st.filter(s=>s[4]===g).length;return `<span style="--c:${GC(g)}" class="${k?'':'off'}"><b>${AYRIM[g].dir}</b> ${esc(AYR[g])}${k?` · ${k}`:''}</span>`;}).join('')}</div>
      <div class="row" style="justify-content:space-between;margin-top:12px"><button class="btn sm" id="pv" ${idx?'':'disabled'}>‹ Önceki nass</button><button class="btn sm" id="nx" ${idx<NASS.length-1?'':'disabled'}>Sonraki nass ›</button></div>
    </div><div class="ipanel" id="ip"></div></div>`;
    $$('[data-m]').forEach(b=>b.onclick=()=>{mode=b.dataset.m;q=null;shell();});
    const go=i=>{idx=i;q=null;history.replaceState(null,'','#lab/'+idx);shell();};
    $$('[data-s]').forEach(b=>b.onclick=()=>go(+b.dataset.s));
    $('#pv').onclick=()=>go(idx-1);$('#nx').onclick=()=>go(idx+1);
    $('#say').onclick=()=>speak(X.ar);
    if(mode==='kesif')kesif();else coz();
  };
  const kesif=()=>{const X=NASS[idx];
    $('#ip').innerHTML=`<p class="eyebrow">Tahlil</p>${X.st.map((s,k)=>`<div class="tstep" style="--c:${GC(s[4])}"><div class="tiny" style="color:${GC(s[4])}">${AYRIM[s[4]].dir} · ${esc(AYR[s[4]])}</div><div class="small"><b>${k+1}.</b> ${AW(esc(s[0]))}</div><div class="small"><b style="color:var(--good)">→ ${esc(s[1][s[2]])}</b></div><div class="tiny muted">${AW(esc(s[3]))}</div></div>`).join('')}`;};
  const coz=()=>{const X=NASS[idx];const ip=$('#ip');
    if(!q)q={k:0,score:0,order:X.st.map(s=>{const o=shuffle(s[1].map((_,i)=>i));return {o,a:o.indexOf(s[2])};})};
    const finish=()=>{const pct=Math.round(q.score/X.st.length*100);const prev=S.lab[idx];if(prev==null||pct>prev)S.lab[idx]=pct;save();addXP(q.score*5);if(pct===100){confetti();beep('win');}
      ip.innerHTML=`<div style="text-align:center"><div class="eyebrow">Tahlil tamam</div><div class="scorebig">%${pct}</div><p class="small">${q.score}/${X.st.length} adım doğru.</p></div>${X.st.map(s=>`<div class="tstep" style="--c:${GC(s[4])}"><div class="small">${AW(esc(s[0]))}</div><b class="small" style="color:var(--good)">→ ${esc(s[1][s[2]])}</b></div>`).join('')}<div class="row" style="justify-content:center;margin-top:10px">${idx<NASS.length-1?`<button class="btn pri" id="nxs">Sonraki nass ${ICON.arrow}</button>`:''}<button class="btn" id="rp">Tekrar</button></div>`;
      if($('#nxs'))$('#nxs').onclick=()=>{idx++;q=null;history.replaceState(null,'','#lab/'+idx);shell();};$('#rp').onclick=()=>{q=null;shell();};checkBadges();};
    const step=()=>{if(q.k>=X.st.length)return finish();const s=X.st[q.k],O=q.order[q.k];
      ip.innerHTML=`<div class="steps">${X.st.map((_,k)=>`<i class="${k<=q.k?'on':''}" style="${k===q.k?'opacity:.55':''}"></i>`).join('')}</div>
      <div class="tiny" style="color:${GC(s[4])};font-weight:700">${AYRIM[s[4]].dir} yönü · ${esc(AYR[s[4]])}</div><p class="q">${q.k+1}. ${AW(esc(s[0]))}</p>
      <div class="opts" style="grid-template-columns:1fr">${O.o.map((i,j)=>`<button class="opt tr" data-o="${j}">${esc(s[1][i])}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
      $$('#ip [data-o]').forEach(b=>b.onclick=()=>{const good=+b.dataset.o===O.a;if(good)q.score++;beep(good?'ok':'no');$$('#ip [data-o]').forEach(x=>{x.disabled=true;if(+x.dataset.o===O.a)x.classList.add('ok');});if(!good)b.classList.add('no');
        $('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Doğrusu işaretlendi. ')+`<span style="font-weight:400">${AW(esc(s[3]))}</span><div style="margin-top:8px"><button class="btn sm pri" id="cn">Devam ${ICON.arrow}</button></div>`;
        $('#cn').onclick=()=>{q.k++;step();};$('#cn').focus();});};
    step();};
  shell();
};
/* ===================== TERAZİ VE TABLOLAR ===================== */
const PAIRS=[
 {k:'acik',t:'Zâhir ↔ Nass',w:1,a:'Zâhir',b:'Nass',ex:'Nisâ 4/24 “bunların dışındakiler size helâl” zâhiren dörtten fazlasını da kapsar; Nisâ 4/3 ise sayıyı dörtle sınırlamak için gelmiş nasstır → evlenilecek kadın sayısı dörtle sınırlıdır.'},
 {k:'acik',t:'Nass ↔ Müfesser',w:1,a:'Nass',b:'Müfesser',ex:'Müstehâza hadisi: “Her namaz için abdest al” (nass; “vakti” takdiri mümkün) ↔ “Her namaz vakti için abdest al” (müfesser) → Hanefî fıkhı: her vakit için bir abdest.'},
 {k:'acik',t:'Nass ↔ Muhkem',w:1,a:'Nass',b:'Muhkem',ex:'Nisâ 4/24 (nass) ↔ Ahzâb 33/53 “…hanımlarıyla asla evlenmeniz olmaz” (muhkem) → Hz. Peygamber’in hanımlarıyla evlenmek ebediyen haramdır.'},
 {k:'acik',t:'Müfesser ↔ Muhkem',w:1,a:'Müfesser',b:'Muhkem',ex:'Muhkem tercih edilir; ancak bu teâruza naslarda sahih bir örnek gösterilemez.'},
 {k:'del',t:'İbâre ↔ İşâret',w:0,a:'İbâre',b:'İşâret',ex:'Bakara 2/178 ibâreyle kasıtlı öldürmede kısası; Nisâ 4/93 işâretle cezanın yalnız cehennem olduğunu gösterir → ibâre tercih edilir: kısas vardır.'},
 {k:'del',t:'İşâret ↔ Nassın delâleti',w:0,a:'İşâret',b:'Nassın delâleti',ex:'Nisâ 4/92 delâletle kasıtlı öldürmede evleviyetle kefâret (Şâfiî) ↔ Nisâ 4/93 işâretle kefâret yok → işâret tercih edilir: Hanefîlere göre kasıtlı öldürmede kefâret yoktur.'},
 {k:'del',t:'Nassın delâleti ↔ İktizâ',w:0,a:'Nassın delâleti',b:'İktizâ',ex:'Nassın delâleti tercih edilir; iktizâ en zayıf delâlettir. İktizâ ile diğerlerinin teâruzuna sahih örnek yoktur.'}
];
function scaleSVG(p){const tilt=p.w===0?-11:11;/* ağır kefe aşağı */
  const L=p.w===0?p.a:p.b;
  return `<svg viewBox="0 0 400 230" class="scl" role="img" aria-label="${esc(p.t)}: ${esc(L)} ağır basar">
  <path d="M200 40 L200 205 M150 210 H250" stroke="var(--muted)" stroke-width="5" stroke-linecap="round"/><circle cx="200" cy="40" r="8" fill="var(--gold)"/>
  <g style="transform:rotate(${tilt}deg);transform-origin:200px 40px;transition:transform .8s cubic-bezier(.3,1.6,.5,1)">
   <line x1="50" y1="40" x2="350" y2="40" stroke="var(--gold)" stroke-width="6" stroke-linecap="round"/>
   ${[[50,p.a,p.w===0],[350,p.b,p.w===1]].map(([x,t,h])=>`<g style="transform:rotate(${-tilt}deg);transform-origin:${x}px 40px"><path d="M${x} 40 L${x-42} 120 M${x} 40 L${x+42} 120" stroke="var(--muted)"/><path d="M${x-52} 120 H${x+52} Q${x+44} 150 ${x} 150 Q${x-44} 150 ${x-52} 120z" fill="${h?'var(--gold)':'var(--panel2)'}" stroke="var(--gold)"/><text x="${x}" y="142" text-anchor="middle" font-size="15" font-weight="700" fill="${h?'var(--gold-ink)':'var(--ink)'}">${esc(t)}</text></g>`).join('')}
  </g></svg>`;}
V.terazi=([tab])=>{
  tab=tab||'merdiven';
  const tabs=[['merdiven','Açıklık merdiveni'],['haml','Haml matrisi'],['kuvvet','Kuvvet terazisi'],['sema','Hanefî – cumhur'],['mezhep','Görüş tablosu']];
  let body='';
  if(tab==='merdiven'){
    const rung=i=>`<button class="rung" data-r="${i}" style="--c:${i<4?GC(3):'var(--zaid)'}"><span>${ACIKK[i]}</span><span class="ar">${ACIKAR[i]}</span></button>`;
    body=`<p class="muted small">Açıklık arttıkça yukarı, kapalılık arttıkça aşağı. Bir basamağa dokun.</p>
    <div class="ladwrap"><div class="ladder"><div class="lad-h">Açıklık ↑</div>${[3,2,1,0].map(rung).join('')}<div class="lad-mid">لَفْظٌ</div>${[4,5,6,7].map(rung).join('')}<div class="lad-h">Kapalılık ↓</div></div><div class="ipanel" id="rd"></div></div>
    <h3 style="margin:18px 0 8px">Te’vil ve nesih tablosu (Hanefî)</h3><div class="tscroll"><table class="tbl"><thead><tr><th>Derece</th><th>Asıl sevk sebebi mi?</th><th>Te’vil / tahsîs</th><th>Nesih</th></tr></thead><tbody>
    ${[['Zâhir','Hayır','✓ açık','✓ (Hz. Peygamber hayatında)'],['Nass','Evet','✓ açık (daha az)','✓ (Hz. Peygamber hayatında)'],['Müfesser','—','✗ kapalı','✓ (Hz. Peygamber hayatında)'],['Muhkem','—','✗ kapalı','✗ kapalı']].map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="small" style="margin-top:8px"><b>Hanefî dışı ıstılah:</b> zâhir (zannî; te’vil edilirse “müevvel”) · nass (kat‘î = Hanefî müfesser) · muhkem (zâhir + nass) · kapalılıkta yalnız mücmel ve müteşâbih.</p>`;
  }else if(tab==='haml'){
    body=`<p class="muted small">Bir lafız bir nasta mutlak, diğerinde mukayyed geldi. Durumu seç; iki görüşün cevabını gör.</p>
    <div class="card"><div class="hq"><span>Itlak-takyîd nerede?</span><div class="seg" data-q="w"><button data-v="h" class="on">Hükmün kendisinde</button><button data-v="s">Hükmün sebebinde</button></div></div>
    <div class="hq" id="hq2"><span>Hükümler</span><div class="seg" data-q="h"><button data-v="1" class="on">Aynı</button><button data-v="0">Farklı</button></div></div>
    <div class="hq" id="hq3"><span>Sebepler</span><div class="seg" data-q="s"><button data-v="1" class="on">Aynı</button><button data-v="0">Farklı</button></div></div></div>
    <div class="matrix" id="mx"></div><div class="card" id="hres" style="margin-top:12px"></div>`;
  }else if(tab==='kuvvet'){
    body=`<p class="muted small">Teâruz eden iki delâleti seç: ağır gelen kefe tercih edilir.</p><div class="filter" style="margin-bottom:10px">${PAIRS.map((p,i)=>`<button class="btn sm" data-p="${i}">${esc(p.t)}</button>`).join('')}</div><div class="card" id="kv"></div>
    <div class="grid g2" style="margin-top:12px"><div class="card"><h3>Açıklık sırası</h3><p class="big-order">Muhkem › Müfesser › Nass › Zâhir</p></div><div class="card"><h3>Delâlet sırası</h3><p class="big-order">İbâre › İşâret › Nassın delâleti › İktizâ</p></div></div>`;
  }else if(tab==='sema'){
    body=`<div class="grid g2"><div class="card"><h3>Hanefîler</h3><ul class="tr" style="margin-top:8px">
      <li><span class="tn leaf" style="--c:${GC(4)}">Delâlet <span class="ar">الدَّلَالَةُ</span></span><ul>${DELK.map((d,i)=>`<li><span class="tn leaf">${d} <span class="ar">${DELAR[i]}</span></span></li>`).join('')}<li><span class="tn leaf" style="opacity:.7">Bunların dışındakiler: bâtıl dayanak</span></li></ul></li></ul></div>
    <div class="card"><h3>Cumhur (Mâlikî, Şâfiî…)</h3><ul class="tr" style="margin-top:8px"><li><span class="tn leaf">Delâlet</span><ul>
      <li><span class="tn leaf">Mantûk <span class="ar">الْمَنْطُوقُ</span></span><div class="tiny muted" style="margin:2px 0 4px 6px">= ibâre + işâret + iktizâ</div></li>
      <li><span class="tn leaf">Mefhûm <span class="ar">الْمَفْهُومُ</span></span><ul><li><span class="tn leaf">Muvâfaka <span class="ar">الْمُوَافَقَةُ</span></span><div class="tiny muted" style="margin:2px 0 4px 6px">= nassın delâleti · fahve’l-hitâb · kıyâs-ı celî</div></li><li><span class="tn leaf">Muhâlefe <span class="ar">الْمُخَالَفَةُ</span></span><div class="leafs" style="justify-content:flex-start;direction:ltr"><span class="gtag">sıfat</span><span class="gtag">şart</span><span class="gtag">gâye</span><span class="gtag">aded</span></div></li></ul></li></ul></li></ul></div></div>
    <div class="card" style="margin-top:12px"><h3>Mefhûm-i muhâlifin hücciyeti</h3><div class="tscroll"><table class="tbl"><thead><tr><th>Alan</th><th>Hanefî</th><th>Cumhur</th></tr></thead><tbody><tr><td>İnsan sözleri, yazar ifadeleri</td><td colspan="2" style="text-align:center">İttifakla hüccet (“Kitapların mefhumları hüccettir”)</td></tr><tr><td>Kur’ân ve Sünnet</td><td>Hüccet değil</td><td>Hüccet (müellifin tercihi)</td></tr></tbody></table></div>
    <p class="small muted" style="margin-top:8px">Şart: kaydın, hükmün kalkmasını göstermekten başka bir faydası olmamalı (nimet, âdet, kötüleme, teşvik, mübalağa için ise alınmaz).</p></div>`;
  }else{
    body=`<div class="row"><input class="search" id="q" placeholder="Ara: tahsîs, kur’, mefhûm…" aria-label="Ara"></div><div class="tscroll" style="margin-top:10px"><table class="tbl"><thead><tr><th>Mesele</th><th>Hanefî</th><th>Cumhur / Şâfiî</th></tr></thead><tbody id="mt">
    ${[['Tahsîse uğramamış âmmın delâleti','Kat‘î','Zannî'],['Muhassıs','Akıl, örf, müstakil ve mukarin nass','Her delil (müstakil veya değil)'],['İstisnâ, şart, sıfat','Kasr','Tahsîs'],['Âmmdan sonra gelen müstakil delil','Nesih','Tahsîs'],['Kitabın âmmını haber-i vâhid ve kıyasla ilk tahsîs','Câiz değil','Câiz'],['Bilerek besmele terk edilen kesim','Haram','Helâl (Şâfiî)'],['Beş veskten az ürünün zekâtı','Öşür var (Ebû Hanîfe)','Nisap şart'],['Kur’ ve iddet','Hayız (Hanbelî de)','Tuhur (Şâfiî, Mâlikî)'],['Hüküm bir, sebep farklı: haml','Hamledilmez','Hamledilir'],['Sebepte ıtlak-takyîd: haml','Hamledilmez','Hamledilir'],['Lâzım vasfa yönelik nehiy (ribâ, bayram orucu)','Fâsid','Bâtıl'],['Umûmü’l-müşterek','Câiz değil (çoğunluk)','Câiz (Şâfiî)'],['Naslarda mefhûm-i muhâlif','Hüccet değil','Hüccet'],['Kırk koyunda bir koyun','Kıymet verilebilir (müellif bunu tercih eder)','Aynen koyun'],['Altmış fakiri doyurma','Bir fakire altmış gün de olur','Altmış ayrı fakir (müellif bunu tercih eder)'],['Ceninin tezkiyesi','Ebû Hanîfe: teşbih; ölü cenin yenmez','Annesinin tezkiyesi yeter (müellif bunu tercih eder)'],['Kasıtlı öldürmede kefâret','Yok (işâret)','Var (Şâfiî; delâlet)']].map(r=>`<tr data-s="${esc(r.join(' ').toLocaleLowerCase('tr'))}"><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>`;
  }
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">الْمِيزَانُ</div><h2>Terazi ve tablolar</h2></div></div>
  <div class="filter" style="margin-bottom:12px">${tabs.map(([k,t])=>`<a class="btn sm ${k===tab?'pri':''}" href="#terazi/${k}">${t}</a>`).join('')}</div>${body}`;
  if(tab==='merdiven'){const show=i=>{const ex=ACIK.filter(x=>x[1]===i);const d=LADDER[i];
      $$('.rung').forEach(b=>b.classList.toggle('on',+b.dataset.r===i));
      $('#rd').innerHTML=`<div class="big">${ACIKAR[i]}</div><h3 style="text-align:center">${ACIKK[i]}</h3><p class="small">${esc(d[3])}</p>${i<4?`<div class="irow"><span>Te’vil/tahsîs</span><span>${esc(d[0])}</span></div><div class="irow"><span>Nesih</span><span>${i===3?'Kapalı':esc(d[1])}</span></div>`:`<div class="irow"><span>Kaynak · çözüm</span><span>${esc(d[2])}</span></div>`}<p class="tiny muted" style="margin-top:8px">Misaller:</p><ul class="small" style="padding-inline-start:18px;margin:4px 0">${ex.map(x=>`<li>${AW(esc(x[0]))}</li>`).join('')}</ul>`;beep('tap');};
    $$('.rung').forEach(b=>b.onclick=()=>show(+b.dataset.r));show(0);}
  if(tab==='haml'){const st={w:'h',h:'1',s:'1'};
    const res=()=>{let k,txt,ex;
      if(st.w==='s'){k='h';txt='Sebepte ıtlak-takyîd (hüküm bir)';ex=HAML.filter(x=>/fıtır|Şuf/.test(x[0]));}
      else if(st.h==='1'&&st.s==='1'){k='i';txt='Hüküm bir, sebep bir';ex=HAML.filter(x=>x[1]==='i');}
      else if(st.h==='0'&&st.s==='0'){k='y';txt='Hükümler ve sebepler farklı';ex=[HAML[3]];}
      else if(st.h==='0'){k='y';txt='Hükümler farklı, sebep bir';ex=[HAML[4]];}
      else {k='h';txt='Hüküm bir, sebepler farklı';ex=[HAML[5]];}
      $('#hq2').hidden=$('#hq3').hidden=st.w==='s';
      const cell=(h,s)=>{const sel=st.w==='h'&&st.h===h&&st.s===s;const r=h==='1'&&s==='1'?'i':h==='1'?'h':'y';return `<div class="mcell ${sel?'on':''} k-${r}"><span class="tiny muted">Hüküm ${h==='1'?'aynı':'farklı'} · sebep ${s==='1'?'aynı':'farklı'}</span><b>${HAMLK[r]}</b></div>`;};
      $('#mx').innerHTML=cell('1','1')+cell('1','0')+cell('0','1')+cell('0','0')+`<div class="mcell wide ${st.w==='s'?'on':''} k-h"><span class="tiny muted">Itlak-takyîd sebepte</span><b>${HAMLK.h}</b></div>`;
      $('#hres').innerHTML=`<div class="eyebrow">${esc(txt)}</div><div class="grid g2" style="margin-top:8px"><div class="vbox"><span class="tiny muted">Hanefî</span><b>${k==='i'?'Hamledilir':'Hamledilmez'}</b></div><div class="vbox"><span class="tiny muted">Cumhur</span><b>${k==='y'?'Hamledilmez':'Hamledilir'}</b></div></div><p class="small" style="margin-top:10px"><b>Misal:</b></p><ul class="small" style="padding-inline-start:18px;margin:4px 0">${ex.map(x=>`<li>${esc(x[0])} — <span class="muted">${esc(x[2])}</span></li>`).join('')}</ul>`;};
    $$('.hq .seg').forEach(sg=>sg.querySelectorAll('button').forEach(b=>b.onclick=()=>{st[sg.dataset.q]=b.dataset.v;sg.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));beep('tap');res();}));res();}
  if(tab==='kuvvet'){const show=i=>{const p=PAIRS[i];$$('[data-p]').forEach(b=>b.classList.toggle('pri',+b.dataset.p===i));$('#kv').innerHTML=`<h3 style="text-align:center">${esc(p.t)}</h3>${scaleSVG({...p,w:1-p.w})}<p class="small">${AW(esc(p.ex))}</p>`;
      requestAnimationFrame(()=>requestAnimationFrame(()=>{$('#kv').innerHTML=`<h3 style="text-align:center">${esc(p.t)}</h3>${scaleSVG(p)}<p class="small"><b>Ağır basan: ${esc(p.w===0?p.a:p.b)}.</b> ${AW(esc(p.ex))}</p>`;}));beep('tap');};
    $$('[data-p]').forEach(b=>b.onclick=()=>show(+b.dataset.p));show(0);}
  if($('#q'))$('#q').oninput=e=>{const v=e.target.value.trim().toLocaleLowerCase('tr');$$('#mt tr').forEach(r=>r.hidden=v&&!r.dataset.s.includes(v));};
};
/* ===================== OYUNLAR ===================== */
const GAMES=[
 {id:'vaz',ic:'target',t:'Lafzın Kimliği',d:'Hâss mı, âmm mı, müşterek mi? Arapça lafzı tanı.'},
 {id:'umum',ic:'split',t:'Umûm Sîgası',d:'Umûm hangi sîgadan geliyor? Küll, mevsûl, nekre…'},
 {id:'emir',ic:'mark',t:'Emrin Rengi',d:'Vücûb, nedb, ibâha, irşâd, te’dîb: karîneyi oku.'},
 {id:'nehiy',ic:'door',t:'Nehyin Sonucu',d:'Bâtıl mı, fâsid mi, sahih ama mekruh mu?'},
 {id:'acik',ic:'ladder',t:'Açıklık Merdiveni',d:'Zâhir, nass, müfesser, muhkem; hafî, müşkil, mücmel, müteşâbih.'},
 {id:'delalet',ic:'eye',t:'Dört Delâlet',d:'Hüküm ibâreyle mi, işâretle mi, delâletle mi, iktizâ ile mi?'},
 {id:'mefhum',ic:'ghost',t:'Mefhûm Avcısı',d:'Sıfat, şart, gâye, aded — yoksa mefhûm alınmaz mı?'},
 {id:'haml',ic:'scale',t:'Haml Terazisi',d:'Mutlak mukayyede hamledilir mi?'},
 {id:'istimal',ic:'role',t:'Hakikat mi Mecâz mı?',d:'Hakikat, mecâz, sarîh, kinâye.'},
 {id:'mezhep',ic:'who',t:'Kim Söyledi?',d:'Bu görüş Hanefîlerin mi, cumhurun mu?'},
 {id:'sirala',ic:'sort',t:'Kuvvet Sıralaması',d:'Dereceleri doğru sıraya diz.'},
 {id:'yaris',ic:'compass',t:'Pusula Yarışı',d:'60 saniye: terimi doğru yöne (ayrıma) gönder.'}
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
    $('#gc').innerHTML=`${R.html}<div class="opts" style="${R.cols?`grid-template-columns:repeat(${R.cols},minmax(0,1fr))`:''}">${R.opts.map((o,j)=>`<button class="opt tr" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('#gc [data-j]').forEach(b=>b.onclick=()=>{const good=+b.dataset.j===R.a;$$('#gc [data-j]').forEach(x=>{x.disabled=true;if(+x.dataset.j===R.a)x.classList.add('ok');});if(!good){b.classList.add('no');streak=0;}else{streak++;sc+=10+Math.min(streak,5)*2;}
      beep(good?'ok':'no');$('#fb').className='fb '+(good?'ok':'no');$('#fb').innerHTML=(good?'Doğru! ':'Doğrusu gösterildi. ')+`<div class="small" style="font-weight:400">${R.ex||''}</div>`;TIMERS.push(setTimeout(round,good?1200:2400));});
  };round();
}
const bigAr=s=>`<div class="qar">${esc(s)}</div>`;
const prompt2=(p,s)=>`<p class="muted small" style="text-align:center;margin:0">${p}</p>${isAr(s)?bigAr(s):`<div class="qtr">${AW(esc(s))}</div>`}`;
GAME.vaz=()=>mcGame('vaz','Lafzın Kimliği',VAZ,it=>{const o=['Hâss','Âmm','Müşterek'];return {html:prompt2('Bu lafız vaz‘ bakımından nedir?',it[0]),opts:o,a:'ham'.indexOf(it[1]),ex:esc(it[2]),cols:3};},12);
GAME.umum=()=>mcGame('umum','Umûm Sîgası',UMUM,it=>{const o=shuffle([it[1],...sample(UMUMK.map((_,i)=>i).filter(i=>i!==it[1]),3)]);return {html:prompt2('Bu nastaki umûm hangi sîgadan?',it[0]),opts:o.map(i=>UMUMK[i]),a:o.indexOf(it[1]),ex:'Sîga: '+UMUMK[it[1]]};},10);
GAME.emir=()=>mcGame('emir','Emrin Rengi',EMIR,it=>{const k=Object.keys(EMIRK);return {html:prompt2('Bu emir neyi ifade eder?',it[0]),opts:k.map(x=>EMIRK[x]),a:k.indexOf(it[1]),ex:AW(esc(it[2]))};},10);
GAME.nehiy=()=>mcGame('nehiy','Nehyin Sonucu',NEHIY,it=>{const k=Object.keys(NEHIYK);return {html:prompt2('Yasaklanan bu işin hukukî sonucu?',it[0]),opts:k.map(x=>NEHIYK[x]),a:k.indexOf(it[1]),ex:esc(it[2]),cols:1};},10);
GAME.acik=()=>mcGame('acik','Açıklık Merdiveni',ACIK,it=>{const half=it[1]<4?[0,1,2,3]:[4,5,6,7];return {html:prompt2('Hanefî ıstılahına göre derecesi?',it[0]),opts:half.map(i=>ACIKK[i]),a:half.indexOf(it[1]),ex:esc(it[2]),cols:2};},12);
GAME.delalet=()=>mcGame('delalet','Dört Delâlet',DELALET,it=>({html:prompt2('Bu hüküm hangi delâletle sabittir?',it[0]),opts:DELK,a:it[1],ex:esc(it[2]),cols:2}),12);
GAME.mefhum=()=>mcGame('mefhum','Mefhûm Avcısı',MEFHUM,it=>{const k=Object.keys(MEFK);return {html:prompt2('Cumhura göre bu kaydın mefhûm-i muhâlifi?',it[0]),opts:k.map(x=>MEFK[x]),a:k.indexOf(it[1]),ex:esc(it[2]),cols:1};},10);
GAME.haml=()=>mcGame('haml','Haml Terazisi',HAML,it=>{const k=Object.keys(HAMLK);return {html:prompt2('Mutlak mukayyede hamledilir mi?',it[0]),opts:k.map(x=>HAMLK[x]),a:k.indexOf(it[1]),ex:esc(it[2]),cols:1};},8);
GAME.istimal=()=>mcGame('istimal','Hakikat mi Mecâz mı?',ISTIMAL,it=>{const k=Object.keys(ISTK);return {html:prompt2('Lafız kullanıldığı mânâ bakımından?',it[0]),opts:k.map(x=>ISTK[x]),a:k.indexOf(it[1]),ex:esc(it[2]),cols:2};},10);
GAME.mezhep=()=>mcGame('mezhep','Kim Söyledi?',MEZHEP,it=>({html:prompt2('Bu görüş kimin?',it[0]),opts:['Hanefîler','Cumhur / Şâfiîler'],a:it[1]==='h'?0:1,ex:esc(it[2]),cols:2}),12);
const SORTS=[
 {t:'Açıklık: en güçlüden en zayıfa',o:['Muhkem','Müfesser','Nass','Zâhir']},
 {t:'Kapalılık: en hafif kapalıdan en ağıra',o:['Hafî','Müşkil','Mücmel','Müteşâbih']},
 {t:'Delâlet: en güçlüden en zayıfa',o:['İbâre','İşâret','Nassın delâleti','İktizâ']},
 {t:'Hanefî ayrımlar: birinciden dördüncüye',o:['Vaz‘','İsti‘mâl','Açıklık-kapalılık','Delâlet şekli']}
];
GAME.sirala=()=>{app.innerHTML=gHead('Kuvvet Sıralaması');let r=0,sc=0;const rounds=shuffle(SORTS);
  const round=()=>{if(r>=rounds.length)return gameEnd('sirala',sc,`${rounds.length} sıralamada ${sc} puan.`,GAME.sirala);
    const R=rounds[r++];let k=0,err=0;$('#gi').textContent=`${r}/${rounds.length} · Puan ${sc}`;
    $('#gc').innerHTML=`<p class="q" style="text-align:center">${esc(R.t)}</p><p class="tiny muted" style="text-align:center">Sırayla dokun.</p><div class="slots" id="sl">${R.o.map((_,i)=>`<span>${i+1}</span>`).join('')}</div><div class="opts" style="grid-template-columns:repeat(2,minmax(0,1fr))">${shuffle(R.o).map(o=>`<button class="opt tr" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('#gc [data-o]').forEach(b=>b.onclick=()=>{if(b.dataset.o===R.o[k]){b.disabled=true;b.classList.add('ok');$$('#sl span')[k].textContent=R.o[k];$$('#sl span')[k].classList.add('f');k++;beep('ok');
        if(k===R.o.length){const p=Math.max(5,25-err*5);sc+=p;$('#fb').className='fb ok';$('#fb').textContent=`Tamam! +${p}`;TIMERS.push(setTimeout(round,1300));}}
      else{err++;beep('no');b.classList.add('no');TIMERS.push(setTimeout(()=>b.classList.remove('no'),500));}});};
  round();};
GAME.yaris=()=>{app.innerHTML=gHead('Pusula Yarışı');let sc=0,n=0,left=60,cur=null;const pool=shuffle(TERMS);
  $('#gc').innerHTML=`<div style="text-align:center"><p>Terim hangi ayrıma (pusula yönüne) aittir? 60 saniyen var.</p><button class="btn pri" id="st">Başla</button></div>`;
  $('#st').onclick=()=>{const tick=()=>{left--;$('#gi').textContent=`⏱ ${left} sn · Puan ${sc}`;if(left<=0){stopTimers();gameEnd('yaris',sc,`${n} terimde ${sc} puan.`,GAME.yaris);}};TIMERS.push(setInterval(tick,1000));nx();};
  const nx=()=>{cur=pool[n%pool.length];n++;$('#gi').textContent=`⏱ ${left} sn · Puan ${sc}`;
    $('#gc').innerHTML=`<div class="qar">${esc(cur[1])}</div><p style="text-align:center;margin:0"><b>${esc(cur[0])}</b></p><div class="dirbtn">${[1,2,3,4].map(g=>`<button class="opt tr" data-g="${g}" style="--c:${GC(g)}"><b>${AYRIM[g].dir}</b><span class="tiny">${esc(AYR[g])}</span></button>`).join('')}</div><div class="fb" id="fb"></div>`;
    $$('#gc [data-g]').forEach(b=>b.onclick=()=>{const good=+b.dataset.g===cur[3];if(good){sc+=10;beep('ok');b.classList.add('ok');}else{beep('no');b.classList.add('no');$(`#gc [data-g="${cur[3]}"]`).classList.add('ok');}$$('#gc [data-g]').forEach(x=>x.disabled=true);TIMERS.push(setTimeout(()=>{if(left>0)nx();},good?350:900));});};
};
/* ===================== KARTLAR ===================== */
const DECKS={
 terim:{t:'Istılahlar',h:'Tarifi? Kartı çevir.',items:TERMS.map(t=>({f:t[1],s:t[0],b:`<b>${esc(t[0])}</b><div class="small" style="margin-top:6px">${esc(t[2])}</div><div class="tiny muted" style="margin-top:6px">${AYRIM[t[3]].dir} · ${esc(AYR[t[3]])}</div>`}))},
 nass:{t:'Âyet ve hadisler',h:'Kaynağı ve usûl meselesi? Kartı çevir.',items:NASS.map(x=>({f:x.ar,b:`<b>${esc(x.ref)}</b><div class="small" style="margin-top:6px">${esc(x.tr)}</div><div class="tiny muted" style="margin-top:6px">${esc(LESSON[x.l].t)}</div>`}))}
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
    <div class="flash ${flip?'flip':''}" id="fc"><div class="in"><div class="face"><div class="qar" style="${dk==='nass'?'font-size:clamp(1.3rem,4.5vw,1.9rem)':''}">${esc(it.f)}</div><p class="muted small">${D.h}</p></div><div class="face bk">${it.b}</div></div></div>
    <div class="row" style="justify-content:center"><button class="btn" id="fl">Çevir</button><button class="btn" id="no" ${flip?'':'disabled'}>Tekrar et</button><button class="btn pri" id="ok" ${flip?'':'disabled'}>Bildim</button><button class="btn ghost" id="sy" aria-label="Dinle">${ICON.play}</button></div>
    <p class="tiny muted" style="text-align:center">Bildiğin kart bir üst kutuya geçer; bilemediğin ilk kutuya döner. Alt kutudakiler önce gelir.</p></div>`;
    $('#fc').onclick=$('#fl').onclick=()=>{flip=!flip;draw();};$('#sy').onclick=()=>speak(it.f);
    $('#ok').onclick=()=>{S.cards[dk+cur]=Math.min(4,box(cur)+1);save();addXP(2);beep('ok');cur=due();flip=false;draw();};
    $('#no').onclick=()=>{S.cards[dk+cur]=0;save();beep('tap');cur=due();flip=false;draw();};};
  draw();
};
/* ===================== SINAV ===================== */
const TAGS={ders:'Ders soruları',nass:'Nass tahlili',vaz:'Hâss / âmm / müşterek',umum:'Umûm sîgaları',emir:'Emir',nehiy:'Nehiy',haml:'Mutlak–mukayyed',mezhep:'Hanefî–cumhur',istimal:'Hakikat–mecâz',acik:'Açıklık–kapalılık',delalet:'Delâlet şekilleri',mefhum:'Mefhûm-i muhâlif'};
function genExam(scopes,count){
  const gens=[];const B=g=>scopes.includes(g);
  const lessonQ=g=>()=>{const L=pick(LESSONS.filter(l=>(l.g||1)===g));const q=pick(L.q);return {tag:'ders',g,q:AW(esc(q[0])),o:q[1],a:q[2],ex:AW(esc(q[3]))+` <span class="muted">(Ders: ${esc(L.t)})</span>`};};
  const nassQ=g=>()=>{const X=pick(NASS.filter(x=>x.st.some(s=>s[4]===g)));const s=pick(X.st.filter(s=>s[4]===g));return {tag:'nass',g,q:`${A(X.ar)} <span class="small muted">(${esc(X.ref)})</span><br>${AW(esc(s[0]))}`,o:s[1],a:s[2],ex:AW(esc(s[3]))};};
  const pool=(tag,g,arr,qf,opts,ans,exf)=>()=>{const it=pick(arr);const o=opts(it);return {tag,g,q:qf(it),o,a:ans(it,o),ex:exf(it)};};
  const P=s=>isAr(s)?A(s):AW(esc(s));
  if(B(1)){
    gens.push(lessonQ(1),lessonQ(1),nassQ(1));
    gens.push(pool('vaz',1,VAZ,it=>`${A(it[0])} lafzı vaz‘ bakımından nedir?`,()=>['Hâss','Âmm','Müşterek'],it=>'ham'.indexOf(it[1]),it=>esc(it[2])));
    gens.push(pool('umum',1,UMUM,it=>`${A(it[0])} — umûm hangi sîgadan gelir?`,it=>{const o=shuffle([it[1],...sample(UMUMK.map((_,i)=>i).filter(i=>i!==it[1]),3)]);it._o=o;return o.map(i=>UMUMK[i]);},it=>it._o.indexOf(it[1]),it=>UMUMK[it[1]]));
    gens.push(pool('emir',1,EMIR,it=>`${P(it[0])} — bu emir neyi ifade eder?`,()=>Object.values(EMIRK),it=>Object.keys(EMIRK).indexOf(it[1]),it=>AW(esc(it[2]))));
    gens.push(pool('nehiy',1,NEHIY,it=>`${esc(it[0])}: hukukî sonucu?`,()=>Object.values(NEHIYK),it=>Object.keys(NEHIYK).indexOf(it[1]),it=>esc(it[2])));
    gens.push(pool('haml',1,HAML,it=>`${esc(it[0])}: mutlak mukayyede hamledilir mi?`,()=>Object.values(HAMLK),it=>Object.keys(HAMLK).indexOf(it[1]),it=>esc(it[2])));
    gens.push(pool('mezhep',1,MEZHEP,it=>`“${esc(it[0])}” görüşü kimindir?`,()=>['Hanefîler','Cumhur / Şâfiîler'],it=>it[1]==='h'?0:1,it=>esc(it[2])));
  }
  if(B(2)){
    gens.push(lessonQ(2),lessonQ(2),nassQ(2));
    gens.push(pool('istimal',2,ISTIMAL,it=>`${esc(it[0])}: lafız kullanıldığı mânâ bakımından nedir?`,()=>Object.values(ISTK),it=>Object.keys(ISTK).indexOf(it[1]),it=>esc(it[2])));
    gens.push(pool('istimal',2,ISTIMAL,it=>`${esc(it[0])}: lafız kullanıldığı mânâ bakımından nedir?`,()=>Object.values(ISTK),it=>Object.keys(ISTK).indexOf(it[1]),it=>esc(it[2])));
  }
  if(B(3)){
    gens.push(lessonQ(3),lessonQ(3),nassQ(3));
    gens.push(pool('acik',3,ACIK,it=>`${AW(esc(it[0]))}: Hanefî ıstılahına göre derecesi?`,it=>(it[1]<4?[0,1,2,3]:[4,5,6,7]).map(i=>ACIKK[i]),(it,o)=>o.indexOf(ACIKK[it[1]]),it=>esc(it[2])));
  }
  if(B(4)){
    gens.push(lessonQ(4),lessonQ(4),nassQ(4));
    gens.push(pool('delalet',4,DELALET,it=>`${AW(esc(it[0]))}: bu hüküm hangi delâletle sabittir?`,()=>DELK.slice(),it=>it[1],it=>esc(it[2])));
    gens.push(pool('mefhum',4,MEFHUM,it=>`${A(it[0])} — cumhura göre mefhûm-i muhâlif?`,()=>Object.values(MEFK),it=>Object.keys(MEFK).indexOf(it[1]),it=>esc(it[2])));
  }
  const out=[],keys=new Set();let guard=0;
  while(out.length<count&&guard++<count*60){const q=pick(gens)();if(!q||q.a<0)continue;if(keys.has(q.q))continue;keys.add(q.q);const idx=shuffle(q.o.map((_,i)=>i));q.o=idx.map(i=>q.o[i]);q.a=idx.indexOf(q.a);out.push(q);}
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
    <div class="grid" style="gap:6px">${[1,2,3,4].map(g=>`<label class="check"><input type="checkbox" value="${g}" checked><span>${AYRIM[g].dir}: ${AYR[g]}${g===1?' (giriş dâhil)':''}</span></label>`).join('')}</div>
    <div class="row" style="margin-top:12px"><div class="field"><label for="qn">Soru sayısı</label><select id="qn"><option>10</option><option selected>20</option><option>30</option><option>40</option><option>50</option></select></div>
    <div class="field"><label for="tm">Süre</label><select id="tm"><option value="0">Süresiz</option><option value="10">10 dk</option><option value="20" selected>20 dk</option><option value="30">30 dk</option><option value="45">45 dk</option></select></div></div>
    <div class="row" style="margin-top:14px"><button class="btn pri" id="go">Sınavı başlat ${ICON.arrow}</button></div></div>
  <div class="card"><h3>Soru türleri</h3><ul class="small muted" style="padding-inline-start:18px;margin:8px 0 0">${Object.values(TAGS).map(t=>`<li>${t}</li>`).join('')}</ul>
    <p class="small" style="margin-top:12px"><b>Değerlendirme:</b> 85+ Pekiyi · 70+ İyi · 60+ Orta · 50+ Geçer · altı Tekrar.</p>
    ${hist.length?`<h3 style="margin-top:14px">Geçmiş</h3><div class="bars" style="margin-top:8px">${hist.map(e=>`<div><span class="small">${new Date(e.at).toLocaleDateString('tr-TR')} · ${e.n} soru</span><div class="pbar"><i style="width:${e.pct}%"></i></div><b>%${e.pct}</b></div>`).join('')}</div>`:''}</div></div>`;
  $('#go').onclick=()=>{const sc=$$('.check input:checked').map(x=>+x.value);if(!sc.length){toast('En az bir ayrım seç.');return;}S.name=$('#nm').value.trim();save();
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
  const tags={},bs={};EX.qs.forEach((q,i)=>{const ok=EX.ans[i]===q.a;const t=tags[q.tag]=tags[q.tag]||{n:0,c:0};t.n++;if(ok)t.c++;const b=bs[q.g]=bs[q.g]||{n:0,c:0};b.n++;if(ok)b.c++;});
  const bar=(lab,v)=>`<div><span>${lab}</span><div class="pbar"><i style="width:${v.c/v.n*100}%;background:${v.c/v.n>=.7?'var(--good)':v.c/v.n>=.5?'var(--gold)':'var(--bad)'}"></i></div><b>${v.c}/${v.n}</b></div>`;
  app.innerHTML=`<div class="stage"><div class="card" style="text-align:center"><div class="eyebrow">Sınav sonucu</div><div class="scorebig">%${EX.pct}</div><p><b>${grade(EX.pct)}</b> · ${EX.c}/${EX.qs.length} doğru · ${Math.floor(EX.time/60)} dk ${EX.time%60} sn</p>
    <div class="row" style="justify-content:center"><button class="btn pri" id="cert">Başarı belgesi</button>${EX.c<EX.qs.length?'<button class="btn" id="wr">Yanlışlarla yeni sınav</button>':''}<a class="btn" href="#sinav">Yeni sınav</a></div></div>
  <div class="card" style="margin-top:12px"><h3>Ayrım raporu</h3><div class="bars" style="margin-top:10px">${Object.entries(bs).map(([g,v])=>bar(AYRIM[g].dir+' · '+AYR[g],v)).join('')}</div><h3 style="margin-top:14px">Konu raporu</h3><div class="bars" style="margin-top:10px">${Object.entries(tags).map(([k,v])=>bar(TAGS[k],v)).join('')}</div></div>
  <div class="card" style="margin-top:12px"><h3>Cevap anahtarı</h3>${EX.qs.map((q,i)=>{const ok=EX.ans[i]===q.a;const sh=x=>isAr(x)?A(x):esc(x);return `<div class="rev ${ok?'ok':'no'}"><div class="small"><b>${i+1}.</b> ${q.q}</div><div class="small" style="margin-top:4px">${ok?'✓':'✗'} Cevabın: ${EX.ans[i]===null?'<i>boş</i>':sh(q.o[EX.ans[i]])}${ok?'':` · Doğrusu: <b>${sh(q.o[q.a])}</b>`}</div><div class="tiny muted" style="margin-top:2px">${q.ex}</div></div>`;}).join('')}</div></div>`;
  $('#cert').onclick=()=>location.hash='#sinav/belge';
  if($('#wr'))$('#wr').onclick=()=>{const w=EX.qs.filter((q,i)=>EX.ans[i]!==q.a).map(q=>Object.assign({},q));EX={qs:w,ans:w.map(()=>null),flag:w.map(()=>false),i:0,start:Date.now(),limit:0,done:false,sc:EX.sc};location.hash='#sinav/run';};
}
function examCert(){
  const d=new Date().toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});
  app.innerHTML=`<div class="stage"><div class="cert"><div class="kufi">طُرُقُ الِاسْتِنْبَاطِ</div><div class="eyebrow" style="margin-top:6px">Başarı Belgesi</div>
  <h2 style="margin-top:10px">${esc(S.name||'Değerli öğrenci')}</h2><p>Lafız Pusulası programında <b>İslâm Hukuk İlminin Esasları — Lafızlar</b> sınavını <b>${EX.qs.length}</b> soruda <b>%${EX.pct}</b> başarı ile tamamlamış ve <b>“${grade(EX.pct)}”</b> derecesini almıştır.</p>
  <p class="muted small">${d} · Rütbe: ${lvl().name} · Okunan ders: ${LESSONS.filter(l=>lstar(l.id)).length}/${LESSONS.length}</p>
  <p class="small" style="margin-top:16px"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p></div>
  <div class="row noprint" style="justify-content:center;margin-top:14px"><button class="btn pri" id="pr">Yazdır / PDF</button><a class="btn" href="#sinav/sonuc">Sonuca dön</a></div></div>`;
  $('#pr').onclick=()=>window.print();
}
/* ===================== PROGRAM HAKKINDA ===================== */
V.hakkinda=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">عَنِ الْبَرْنَامَجِ</div><h2>Program hakkında</h2></div></div>
  <div class="card" style="text-align:center;padding:28px 18px">
    <div class="kufi" style="font-family:var(--f-kufi);font-size:2rem;color:var(--gold);direction:rtl">طُرُقُ الِاسْتِنْبَاطِ</div>
    <p style="margin-top:14px;font-size:1.05rem"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p>
    <p class="muted">Kaynak: Zekiyyüddin Şa‘bân, <i>İslâm Hukuk İlminin Esasları (Usûlü’l-Fıkh)</i>, trc. İbrahim Kâfi Dönmez — Üçüncü Bölüm, Lafızlar (§ 229–315)</p>
    <p class="muted">© 2026 Hüseyin KAYA · İstifade edilmesi temennisiyle…</p>
  </div>
  <div class="card" style="margin-top:14px"><h3>İçindekiler</h3><ul class="small" style="padding-inline-start:18px;margin:8px 0 0;line-height:1.8">
    <li><b>${LESSONS.length} ders</b>: anlatım, Arapça âyet ve hadisler, misaller ve ${LESSONS.reduce((a,l)=>a+l.q.length,0)} soruluk mini sınavlar</li>
    <li><b>Nass Tahlil Masası</b>: ${NASS.length} âyet ve hadis, ${NASS.reduce((a,x)=>a+x.st.length,0)} tahlil adımı</li>
    <li><b>Terazi ve tablolar</b>: açıklık merdiveni, haml matrisi, kuvvet terazisi, Hanefî–cumhur şemaları ve görüş tablosu</li>
    <li><b>${GAMES.length} oyun</b>, iki kart destesi ve raporlu sınav</li></ul>
    <p class="small muted" style="margin-top:10px">Program tek bir dosyadır ve internet bağlantısı olmadan çalışır. İlerlemeniz yalnızca bu cihazda saklanır.</p></div>`;
};
/* ---------- başlat ---------- */
document.documentElement.lang='tr';
themeBtn();sndBtn();hud();route();
