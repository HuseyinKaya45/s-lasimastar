/* ===== Kelime Ustası: el-Arabiyye beyne yedeyk sözlüğü (W: data.js) ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd=n=>Math.floor(Math.random()*n),pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const A=(s,c='')=>`<span class="ar ${c}">${esc(s)}</span>`;
const HAR=/[ً-ْٰـ]/g;
const sk=w=>w.replace(HAR,'').replace(/[أإآٱء]/g,'ا');
const MARK=/[ً-ْٰ]/;
function clusters(s){const o=[];for(const ch of s){if(MARK.test(ch)&&o.length)o[o.length-1]+=ch;else o.push(ch);}return o;}
const trn=s=>s.toLocaleLowerCase('tr').replace(/[âîû]/g,m=>({'â':'a','î':'i','û':'u'}[m]));
/* ---------- durum ---------- */
const KEY='kelime-ustasi-v1';
let S={v:1,w:{},xp:0,streak:0,last:0,best:{},daily:{day:0,ids:[],done:false},scan:null,theme:'',stats:{ok:0,no:0}};
try{const t=JSON.parse(localStorage.getItem(KEY)||'null');if(t&&t.v===1)S=Object.assign(S,t);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5);
const INT=[0,1,3,7,14,30];
const LEVELS=[[0,'Tâlib'],[300,'Mübtedî'],[1000,'Mütevassıt'],[2500,'Mütekaddim'],[5000,'Üstâd']];
function lvl(){let i=0;LEVELS.forEach((l,k)=>{if(S.xp>=l[0])i=k;});return LEVELS[i][1];}
function hud(){$('#hudXp').textContent='★ '+S.xp+' · '+lvl();}
function touchDay(){const t=today();if(S.last===t)return;S.streak=S.last===t-1?S.streak+1:1;S.last=t;}
function rate(id,ok){
  const r=S.w[id]||(S.w[id]={b:0,d:0,ok:0,no:0,m:0});touchDay();
  if(ok){r.ok++;r.b=Math.min(5,r.b+1);r.d=today()+INT[r.b];if(r.m>0)r.m--;S.xp+=10;S.stats.ok++;}
  else{r.no++;r.b=Math.max(0,r.b-2);r.d=today();r.m=2;S.stats.no++;}
  save();hud();
}
/* seviye bildirimi: b = biliyorum, k = karıştırıyorum, x = bilmiyorum */
function setLevel(id,lv){
  const r=S.w[id]||(S.w[id]={b:0,d:0,ok:0,no:0,m:0});touchDay();
  if(lv==='b'){r.b=3;r.d=today()+7;r.m=0;}else if(lv==='k'){r.b=1;r.d=today()+1;}else{r.b=0;r.d=today();r.m=2;}
  save();
}
const state=id=>{const r=S.w[id];return !r?'yeni':r.b>=5?'ogr':'calis';};
const isDue=id=>{const r=S.w[id];return !!r&&r.d<=today();};
const dueIds=()=>Object.keys(S.w).filter(id=>isDue(+id)).map(Number).sort((a,b)=>(S.w[b].m-S.w[a].m)||(S.w[a].d-S.w[b].d));
const mistIds=()=>Object.keys(S.w).filter(id=>S.w[id].m>0).map(Number);
let tT=0;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tT);tT=setTimeout(()=>t.hidden=true,2200);}
/* ---------- kelime seçimi ---------- */
const weight=w=>{const r=S.w[w.i];if(!r)return 1;if(r.m>0)return 4;if(r.d<=today())return 3;if(r.b>=5)return .15;return .8;};
function pickW(n,filter){
  const pool=filter?W.filter(filter):W;
  return pool.map(w=>[-Math.log(1-Math.random())/weight(w),w]).sort((a,b)=>a[0]-b[0]).slice(0,n).map(x=>x[1]);
}
/* ---------- soru üretimi ---------- */
const TYPES={anlam:'Anlamını bul',ar:'Türkçeden Arapçaya',tanim:'Arapça tarif',bosluk:'Boşluk doldur',cogul:'Çoğulunu bul',fiil:'Muzâri ve masdar',harekeli:'Doğru okunuş',karistir:'Harfleri diz'};
const tokset=s=>new Set(s.split(/[,;()]+/).map(x=>trn(x.trim())).filter(Boolean));
const trSim=(a,b)=>{const A_=tokset(a),B_=tokset(b);for(const x of A_)if(B_.has(x))return true;return false;};
const POOL={f:W.filter(x=>x.t==='f'),i:W.filter(x=>x.t==='i')};
function others(w,n,get,ok,pool){
  const P=pool||POOL[w.t],out=[],seen=new Set();
  for(let t=0;t<600&&out.length<n;t++){const x=pick(P);if(x.i===w.i)continue;const v=get(x);if(!v||seen.has(v))continue;if(ok&&!ok(x))continue;seen.add(v);out.push(v);}
  return out.length===n?out:null;
}
const VW=['َ','ُ','ِ'];
function mutate(s,skipFirst){
  const c=clusters(s),idx=[];c.forEach((x,i)=>{if(skipFirst&&i===0)return;if(/[َُِ]/.test(x)&&!/[ًٌٍ]/.test(x))idx.push(i);});
  if(!idx.length)return null;const i=pick(idx),cur=c[i].match(/[َُِ]/)[0];
  c[i]=c[i].replace(cur,pick(VW.filter(v=>v!==cur)));return c.join('');
}
function variants(s,n,skipFirst){const out=new Set();for(let t=0;t<60&&out.size<n;t++){const m=mutate(s,skipFirst);if(m&&m!==s)out.add(m);}return out.size===n?[...out]:null;}
const why=w=>`${A(w.k)} — <b>${esc(w.tr)}</b>${w.dt?`<div class="small muted" style="margin-top:4px">${esc(w.dt)}</div>`:''}${w.b?`<div style="margin-top:6px">${A(w.b[0])}${w.b[2]?`<div class="small muted">${esc(w.b[2])}</div>`:''}</div>`:''}${w.c?`<div class="small" style="margin-top:4px">Çoğul: ${A(w.c)}</div>`:''}${w.f?`<div class="small" style="margin-top:4px">${A(w.f.join(' '))}</div>`:''}`;
const wordIn=(d,k)=>{const s=sk(d),b=sk(k).replace(/^ال/,'');return b.length>=2&&s.includes(b);};
function mkQ(type,w){
  const base={type,w,why:why(w)};
  if(type==='anlam'){const o=others(w,3,x=>x.tr,x=>!trSim(x.tr,w.tr));if(!o)return null;return Object.assign(base,{prompt:'Bu kelimenin anlamı nedir?',show:w.k,right:w.tr,opts:shuffle([w.tr,...o]),ar:false});}
  if(type==='ar'){const o=others(w,3,x=>x.k,x=>!trSim(x.tr,w.tr)&&sk(x.k)!==sk(w.k));if(!o)return null;return Object.assign(base,{prompt:'Arapçası hangisi?',hint:w.tr,right:w.k,opts:shuffle([w.k,...o]),ar:true});}
  if(type==='tanim'){if(!w.d||wordIn(w.d,w.k))return null;const o=others(w,3,x=>x.k,x=>!trSim(x.tr,w.tr)&&sk(x.k)!==sk(w.k));if(!o)return null;return Object.assign(base,{prompt:'Bu tarif hangi kelimeyi anlatıyor?',sent:w.d.length>260?w.d.slice(0,260)+'…':w.d,right:w.k,opts:shuffle([w.k,...o]),ar:true});}
  if(type==='bosluk'){if(!w.b)return null;const [c,kel,tr]=w.b;if(c.split(kel).length>2)return null;const o=others(w,3,x=>x.b&&x.b[1],x=>x.b&&sk(x.b[1])!==sk(kel),W.filter(x=>x.b&&x.t===w.t));if(!o)return null;
    return Object.assign(base,{prompt:'Boşluğa hangisi uyar?',sent:c.replace(kel,'＿＿＿＿'),hint:tr,right:kel,opts:shuffle([kel,...o]),ar:true});}
  if(type==='cogul'){if(!w.c)return null;const o=others(w,3,x=>x.c,x=>x.c!==w.c&&sk(x.c)!==sk(w.c),W.filter(x=>x.c&&x.t===w.t));if(!o)return null;return Object.assign(base,{prompt:'Çoğulu hangisi?',show:w.k,hint:w.tr,right:w.c,opts:shuffle([w.c,...o]),ar:true});}
  if(type==='fiil'){if(w.t!=='f'||!w.f||w.f.length<2)return null;const r=w.f.join(' ');const v=variants(r,3,true);if(!v)return null;return Object.assign(base,{prompt:'Muzâri ve masdarı hangisi?',show:w.k,hint:w.tr,right:r,opts:shuffle([r,...v]),ar:true});}
  if(type==='harekeli'){if(clusters(w.k).filter(x=>/[َُِ]/.test(x)).length<2||/\s/.test(w.k))return null;const v=variants(w.k,3);if(!v)return null;return Object.assign(base,{prompt:'Doğru okunuş hangisi?',hint:w.tr,right:w.k,opts:shuffle([w.k,...v]),ar:true});}
  if(type==='karistir'){const c=clusters(w.k);if(/\s/.test(w.k)||c.length<3||c.length>8)return null;return Object.assign(base,{prompt:'Harfleri doğru sıraya diz',hint:w.tr,build:c,right:w.k});}
  return null;
}
function genQ(types,filter,tries=60){
  for(let t=0;t<tries;t++){const w=pickW(1,filter)[0];for(const ty of shuffle(types)){const q=mkQ(ty,w);if(q)return q;}}
  return null;
}
const ALL=Object.keys(TYPES);
/* ---------- ortak sınav iskeleti ---------- */
let TIMERS=[];const stopTimers=()=>{TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);});TIMERS=[];};
const gHead=(t,info,back)=>`<a class="btn sm ghost" href="${back||'#oyun'}">← Geri</a><div class="stage"><div class="hud2"><b>${t}</b><span class="small muted" id="gi">${info||''}</span></div><div class="card" id="gc"></div></div>`;
function endScreen(id,title,res,again,back='#oyun'){
  const nb=S.best[id]==null||res.score>S.best[id];if(nb)S.best[id]=res.score;save();hud();
  const wrong=res.wrong.map(w=>`<div class="wi" data-w="${w.i}"><span class="ar">${esc(w.k)}</span><span>${esc(w.tr)}</span></div>`).join('');
  $('#gc').innerHTML=`<div style="text-align:center"><div class="eyebrow">${esc(title)} · bitti</div><div class="scorebig">${res.score}</div><p>${res.msg}</p>${nb?'<p class="chip">Yeni rekor!</p>':`<p class="small muted">Rekor: ${S.best[id]}</p>`}</div>
  ${res.wrong.length?`<h3 style="margin:14px 0 8px;font-size:1rem">Tekrar bakılacaklar</h3><div class="wl">${wrong}</div>`:''}
  <div class="row" style="justify-content:center;margin-top:14px"><button class="btn pri" id="ag">Tekrar</button><a class="btn" href="${back}">Çıkış</a></div>`;
  $('#ag').onclick=again;bindWi();
}
function bindWi(){$$('.wi[data-w]').forEach(el=>el.onclick=()=>{const w=W[+el.dataset.w];let d=el.querySelector('.wd');if(!d){d=document.createElement('div');d.className='wd';d.innerHTML=why(w);el.appendChild(d);}el.classList.toggle('open');});}
/* gen: ()=>soru; total: tur sayısı (0 = süreli) */
function quiz({id,title,total=10,timed=false,gen,again,back,msgOf}){
  app.innerHTML=gHead(title,'',back);const card=$('#gc');let n=0,sc=0,ok=0,left=60,done=false;const wrong=[],seenW=new Set();
  const fin=()=>{if(done)return;done=true;stopTimers();endScreen(id,title,{score:sc,wrong,msg:msgOf?msgOf(ok,n):(timed?`60 saniyede ${ok} doğru.`:`${n} sorudan ${ok} doğru.`)},again,back);};
  const answer=(q,good,btn)=>{
    if(good){ok++;sc+=10;}else if(timed)left=Math.max(0,left-3);
    if(!good&&!seenW.has(q.w.i)){seenW.add(q.w.i);wrong.push(q.w);}
    rate(q.w.i,good);
    $('#gi').textContent='Puan '+sc;
  };
  const round=()=>{
    if(done)return;if(!timed&&n>=total)return fin();
    const q=gen();if(!q){card.innerHTML='<p class="muted" style="text-align:center">Bu oyun için uygun kelime bulunamadı.</p>';return;}
    n++;
    const head=`${timed?`<div class="row" style="justify-content:space-between"><span class="timer ${left<=10?'low':''}" id="tm">⏱ ${left} sn</span><b>Puan ${sc}</b></div>`:''}<p class="q">${q.prompt}${timed?'':` <span class="muted small">(${n}/${total})</span>`}</p>`;
    if(q.build){
      const tiles=shuffle(q.build.map((t,i)=>({t,i})));let placed=[];let tries=0;
      const draw=()=>{
        card.innerHTML=`${head}<p class="small muted" style="text-align:center">Anlam: ${esc(q.hint)}</p><div class="slots">${placed.map((p,j)=>`<button class="tile" data-p="${j}">${esc(p.t)}</button>`).join('')||'<span class="muted small">Harfleri sırayla dokun (sağdan sola)</span>'}</div><div class="tiles">${tiles.map((x,j)=>`<button class="tile ${placed.includes(x)?'ghost':''}" data-t="${j}" ${placed.includes(x)?'disabled':''}>${esc(x.t)}</button>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn" id="un">Geri al</button><button class="btn pri" id="ck" ${placed.length===tiles.length?'':'disabled'}>Kontrol</button><button class="btn ghost" id="pass">Pas</button></div><div class="fb" id="fb" hidden></div>`;
        $$('[data-t]').forEach(b=>b.onclick=()=>{placed.push(tiles[+b.dataset.t]);draw();});
        $$('[data-p]').forEach(b=>b.onclick=()=>{placed.splice(+b.dataset.p,1);draw();});
        $('#un').onclick=()=>{placed.pop();draw();};
        const reveal=good=>{answer(q,good);$$('button').forEach(b=>{if(b.closest('#gc'))b.disabled=true;});const f=$('#fb');f.hidden=false;f.className='fb '+(good?'ok':'no');f.innerHTML=(good?'Doğru! ':'Doğrusu: ')+q.why+`<div class="row" style="margin-top:8px"><button class="btn pri sm" id="nx">${!timed&&n>=total?'Bitir':'Sonraki'}</button></div>`;$('#nx').onclick=round;};
        $('#pass').onclick=()=>reveal(false);
        $('#ck').onclick=()=>{const w=placed.map(p=>p.t).join('');if(w===q.right)reveal(true);else{tries++;if(tries>=2)reveal(false);else{placed=[];draw();const f=$('#fb');f.hidden=false;f.className='fb no';f.textContent='Olmadı, bir kez daha dene.';}}};
      };draw();
    }else{
      card.innerHTML=`${head}${q.show?`<div class="qar">${esc(q.show)}</div>`:''}${q.sent?`<div class="qs">${esc(q.sent)}</div>`:''}${q.hint&&!q.sent?`<p class="small muted" style="text-align:center">${esc(q.hint)}</p>`:''}${q.type==='bosluk'&&q.hint?`<p class="small" style="text-align:center"><button class="btn sm ghost" id="hn">İpucu: Türkçesi</button><span id="hv" class="muted"></span></p>`:''}<div class="opts ${q.ar?'rtl':''}">${q.opts.map((o,i)=>`<button class="opt ${q.ar?'ar':''}" data-o="${i}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb" hidden></div>`;
      const hn=$('#hn');if(hn)hn.onclick=()=>{$('#hv').textContent=' '+q.hint;hn.hidden=true;};
      $$('[data-o]').forEach(b=>b.onclick=()=>{const good=q.opts[+b.dataset.o]===q.right;$$('[data-o]').forEach(x=>{x.disabled=true;if(q.opts[+x.dataset.o]===q.right)x.classList.add('ok');});if(!good)b.classList.add('no');answer(q,good);
        const f=$('#fb');f.hidden=false;f.className='fb '+(good?'ok':'no');
        if(timed){f.innerHTML=(good?'Doğru! ':'Doğrusu: ')+A(q.right);TIMERS.push(setTimeout(round,good?350:1100));}
        else{f.innerHTML=(good?'Doğru!':'Yanlış.')+'<div style="margin-top:6px">'+q.why+`</div><div class="row" style="margin-top:8px"><button class="btn pri sm" id="nx">${n>=total?'Bitir':'Sonraki'}</button></div>`;$('#nx').onclick=round;$('#nx').focus();}});
    }
  };
  round();
  if(timed)TIMERS.push(setInterval(()=>{left--;const t=$('#tm');if(t){t.textContent='⏱ '+left+' sn';t.classList.toggle('low',left<=10);}if(left<=0)fin();},1000));
}
/* ---------- bilgi kartı (seviye taraması, yeni kelimeler, üç saniye) ---------- */
function flash({id,title,list,mode,again,back,after}){
  app.innerHTML=gHead(title,'',back);const card=$('#gc');let i=0;const cnt={b:0,k:0,x:0};let left=3,revealed=false;
  const next=()=>{stopTimers();if(i>=list.length)return finish();draw();};
  const finish=()=>{
    if(mode==='tara')S.scan={n:list.length,b:cnt.b,k:cnt.k,x:cnt.x,day:today()};save();hud();
    if(after)return after(cnt);
    const est=Math.round(cnt.b/list.length*W.length);
    card.innerHTML=`<div style="text-align:center"><div class="eyebrow">${esc(title)} · bitti</div><div class="scorebig">${cnt.b}/${list.length}</div><p>Biliyorum: <b>${cnt.b}</b> · Karıştırıyorum: <b>${cnt.k}</b> · Bilmiyorum: <b>${cnt.x}</b></p>${mode==='tara'?`<p>Tahminî bildiğin kelime sayısı: <b>≈ ${est}</b> / ${W.length}</p><p class="small muted">Bu bir örnekleme tahminidir; kelime sayısı arttıkça kesinleşir. Bildiklerin tekrar sırasının sonuna alındı, karıştırdıkların ve bilmediklerin yakında önüne gelecek.</p>`:''}</div><div class="row" style="justify-content:center;margin-top:12px">${again?'<button class="btn pri" id="ag">Tekrar</button>':''}<a class="btn" href="${back||'#bugun'}">Çıkış</a></div>`;
    if(again)$('#ag').onclick=again;
  };
  const rateIt=lv=>{const w=list[i];cnt[lv]++;
    if(mode==='uc'){if(lv==='b')rate(w.i,true);else if(lv==='x')rate(w.i,false);else setLevel(w.i,'k');}else setLevel(w.i,lv);
    i++;next();};
  const draw=()=>{
    const w=list[i];revealed=false;left=3;
    card.innerHTML=`<div class="row" style="justify-content:space-between"><span class="small muted">${i+1} / ${list.length}</span>${mode==='uc'?'<span class="timer" id="tm">⏱ 3</span>':''}</div><div class="flash" id="fl"><div class="qar" style="font-size:2.8rem">${esc(w.k)}</div><div class="small muted" id="hintx">${mode==='uc'?'Anlamını düşün…':'Anlamını hatırlamaya çalış, sonra karta dokun'}</div><div id="rv" hidden style="width:100%"></div></div><div class="row" id="rb" style="justify-content:center;margin-top:10px" hidden><button class="btn good" data-l="b">Biliyorum</button><button class="btn mid" data-l="k">Karıştırıyorum</button><button class="btn bad" data-l="x">Bilmiyorum</button></div>`;
    const reveal=()=>{if(revealed)return;revealed=true;stopTimers();$('#rv').hidden=false;$('#rb').hidden=false;$('#hintx').hidden=true;$('#rv').innerHTML=`<div style="font-size:1.25rem;font-weight:600;margin:6px 0">${esc(w.tr)}</div>${w.d?`<div class="ar" style="font-size:1.15rem;font-weight:400">${esc(w.d.length>200?w.d.slice(0,200)+'…':w.d)}</div>`:''}${w.b?`<div class="ar" style="font-size:1.1rem;margin-top:6px;font-weight:400">${esc(w.b[0])}</div>`:''}${w.b&&w.b[2]?`<div class="small muted">${esc(w.b[2])}</div>`:''}`;$$('[data-l]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();rateIt(b.dataset.l);});};
    $('#fl').onclick=reveal;
    if(mode==='uc')TIMERS.push(setInterval(()=>{left--;const t=$('#tm');if(t)t.textContent='⏱ '+Math.max(left,0);if(left<=0)reveal();},1000));
  };
  next();
}
/* ---------- eşleştirme ---------- */
function eslesGame(){
  app.innerHTML=gHead('Eşleştirme');const card=$('#gc');let rounds=0,sc=0,errs=0;const wrong=[],seenW=new Set();
  const round=()=>{
    if(rounds>=3){const msg=`3 turda ${sc} puan, ${errs} hata.`;return endScreen('esles','Eşleştirme',{score:sc,wrong,msg},eslesGame);}
    rounds++;const ws=pickW(8,w=>w.tr.length<28);const trs=new Set(),L=[];
    ws.forEach(w=>{const k=trn(w.tr);if(!trs.has(k)){trs.add(k);L.push(w);}});
    const left=shuffle(L),right=shuffle(L);let sel=null,done=0;
    card.innerHTML=`<p class="q">Arapça kelimeleri Türkçe karşılıklarıyla eşleştir <span class="muted small">(${rounds}/3)</span></p><div class="match"><div class="col" id="cl">${left.map(w=>`<button class="mbtn ar" data-a="${w.i}">${esc(w.k)}</button>`).join('')}</div><div class="col" id="cr">${right.map(w=>`<button class="mbtn" data-t="${w.i}">${esc(w.tr)}</button>`).join('')}</div></div>`;
    $$('[data-a]').forEach(b=>b.onclick=()=>{$$('[data-a]').forEach(x=>x.classList.remove('sel'));sel=b.dataset.a;b.classList.add('sel');});
    $$('[data-t]').forEach(b=>b.onclick=()=>{
      if(sel==null)return;const a=sel;
      if(a===b.dataset.t){sc+=10;rate(+a,true);$$(`[data-a="${a}"],[data-t="${a}"]`).forEach(x=>x.classList.add('done'));sel=null;done++;$('#gi').textContent='Puan '+sc;if(done===L.length)TIMERS.push(setTimeout(round,400));}
      else{errs++;sc=Math.max(0,sc-3);const w=W[+a];rate(+a,false);if(!seenW.has(w.i)){seenW.add(w.i);wrong.push(w);}b.classList.add('no');TIMERS.push(setTimeout(()=>b.classList.remove('no'),500));$$('[data-a]').forEach(x=>x.classList.remove('sel'));sel=null;$('#gi').textContent='Puan '+sc;}
    });
  };
  round();
}
/* ---------- oyun listesi ---------- */
const GAMES=[
 {id:'uc',ico:'٣',t:'Üç Saniye',d:'Kelime çıkar, üç saniyede anlamını hatırla; sonra bilip bilmediğini söyle.',run:()=>flash({id:'uc',title:'Üç Saniye',list:pickW(15),mode:'uc',again:()=>GAME.uc(),back:'#oyun'})},
 {id:'hizli',ico:'٦٠',t:'Hızlı Test',d:'60 saniye: kelimenin anlamını ya da Arapçasını bul. Yanlış 3 saniye götürür.',run:()=>quiz({id:'hizli',title:'Hızlı Test',timed:true,gen:()=>genQ(['anlam','ar']),again:()=>GAME.hizli()})},
 {id:'anlam',ico:'مَعْنى',t:'Anlamını Bul',d:'Arapça kelime verilir, Türkçe karşılığını seç.',run:()=>quiz({id:'anlam',title:'Anlamını Bul',gen:()=>genQ(['anlam']),again:()=>GAME.anlam()})},
 {id:'ar',ico:'TR→',t:'Türkçeden Arapçaya',d:'Türkçe anlam verilir, doğru Arapça kelimeyi seç.',run:()=>quiz({id:'ar',title:'Türkçeden Arapçaya',gen:()=>genQ(['ar']),again:()=>GAME.ar()})},
 {id:'tanim',ico:'تَعْريف',t:'Arapça Tarif',d:'Sözlükteki Arapça tanım verilir, hangi kelime olduğunu bul. Türkçeye çevirmeden düşün.',run:()=>quiz({id:'tanim',title:'Arapça Tarif',gen:()=>genQ(['tanim']),again:()=>GAME.tanim()})},
 {id:'bosluk',ico:'＿＿＿',t:'Boşluk Doldur',d:'Sözlüğün örnek cümlesinde eksik kelimeyi bul.',run:()=>quiz({id:'bosluk',title:'Boşluk Doldur',gen:()=>genQ(['bosluk']),again:()=>GAME.bosluk()})},
 {id:'cogul',ico:'جَمْع',t:'Çoğulunu Bul',d:'Tekil kelimenin doğru (kırık) çoğulunu seç.',run:()=>quiz({id:'cogul',title:'Çoğulunu Bul',gen:()=>genQ(['cogul']),again:()=>GAME.cogul()})},
 {id:'fiil',ico:'يَفْعَلُ',t:'Muzâri ve Masdar',d:'Mâzî fiil verilir, doğru harekeli muzâri ve masdarı seç.',run:()=>quiz({id:'fiil',title:'Muzâri ve Masdar',gen:()=>genQ(['fiil']),again:()=>GAME.fiil()})},
 {id:'harekeli',ico:'ـَـُـِ',t:'Doğru Okunuş',d:'Dört harekelemeden hangisi doğru? Harekeli okumayı güçlendirir.',run:()=>quiz({id:'harekeli',title:'Doğru Okunuş',gen:()=>genQ(['harekeli']),again:()=>GAME.harekeli()})},
 {id:'karistir',ico:'ب ت ك',t:'Harfleri Diz',d:'Karışık harf parçalarını sırayla dizerek kelimeyi kur.',run:()=>quiz({id:'karistir',title:'Harfleri Diz',gen:()=>genQ(['karistir']),again:()=>GAME.karistir()})},
 {id:'esles',ico:'⇄',t:'Eşleştirme',d:'Sekiz Arapça kelimeyi Türkçe karşılıklarıyla eşleştir.',run:eslesGame},
 {id:'karma',ico:'★',t:'Karma Antrenman',d:'Bütün soru türlerinden 15 soru.',run:()=>quiz({id:'karma',title:'Karma Antrenman',total:15,gen:()=>genQ(ALL),again:()=>GAME.karma()})},
 {id:'sinav',ico:'✎',t:'Sınav',d:'20 soru, karışık türlerde; sonunda zayıf kelimelerin listesi.',run:()=>quiz({id:'sinav',title:'Sınav',total:20,gen:()=>genQ(ALL),again:()=>GAME.sinav(),msgOf:(ok,n)=>`%${Math.round(ok/Math.max(n,1)*100)} başarı (${ok}/${n}).`})},
 {id:'hata',ico:'✗',t:'Hata Defterim',d:'Yanlış yaptığın ya da bilmediğin kelimeler yeniden sorulur.',run:()=>{const ids=mistIds();if(!ids.length){app.innerHTML=gHead('Hata Defterim');$('#gc').innerHTML='<p class="muted" style="text-align:center">Hata defterin boş. Önce biraz çalış; yanlışların burada toplanır.</p>';return;}
   const set=new Set(ids);quiz({id:'hata',title:'Hata Defterim',total:Math.min(15,ids.length),gen:()=>genQ(ALL,w=>set.has(w.i)&&S.w[w.i]&&S.w[w.i].m>0),again:()=>GAME.hata()});}}
];
const GAME={};GAMES.forEach(g=>GAME[g.id]=()=>{stopTimers();g.run();});
/* ---------- görünümler ---------- */
const V={};
function counts(){let o=0,c=0;for(const id in S.w){if(S.w[id].b>=5)o++;else c++;}return {o,c,y:W.length-o-c};}
V.bugun=()=>{
  const t=today(),c=counts(),due=dueIds().length;
  if(S.daily.day!==t){S.daily={day:t,ids:pickW(15,w=>!S.w[w.i]&&w.tr).map(w=>w.i),done:false};save();}
  const newLeft=S.daily.ids.filter(id=>!S.w[id]).length;
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Bugün</div><h2>Kelime çalışmasına hoş geldin</h2></div><span class="chip">🔥 ${S.streak} gün</span></div>
  <div class="grid g2">
   <div class="card"><h3>Günlük plan</h3><p class="small muted" style="margin:6px 0 12px">Önce yeni kelimelerle tanış, sonra bekleyenleri tekrar et. Yirmi dakika yeter.</p>
    <div class="row"><button class="btn pri" id="bNew" ${newLeft?'':'disabled'}>Yeni kelimeler (${newLeft})</button><button class="btn pri" id="bRev" ${due?'':'disabled'}>Tekrar (${due} bekliyor)</button></div>
    ${!S.scan?'<p class="small" style="margin-top:12px">Önce <b>seviye taramasını</b> yap: bildiklerin ayıklansın, vaktini bilmediklerine ayır.</p><button class="btn" id="bScan">Seviye taraması (40 kelime)</button>':`<p class="small muted" style="margin-top:12px">Son taramada ${S.scan.b}/${S.scan.n} kelimeyi biliyordun (≈ ${Math.round(S.scan.b/S.scan.n*W.length)} / ${W.length}). <a href="#" id="bScan2">Yeniden tara</a></p>`}</div>
   <div class="card"><h3>Durum</h3><div class="bar" style="margin:10px 0 8px"><i style="width:${c.o/W.length*100}%;background:var(--good)"></i><i style="width:${c.c/W.length*100}%;background:var(--gold)"></i></div>
    <div class="small"><span class="chip">✓ Öğrenildi ${c.o}</span> <span class="chip">… Çalışılıyor ${c.c}</span> <span class="chip">Yeni ${c.y}</span></div>
    <p class="small muted" style="margin-top:10px">Toplam ${W.length} madde · Doğru ${S.stats.ok} · Yanlış ${S.stats.no}</p></div>
  </div>
  <div class="sec-h"><h3>Hızlı başla</h3><a href="#oyun" class="small">Bütün oyunlar →</a></div>
  <div class="gcards">${['hizli','tanim','bosluk','esles'].map(id=>{const g=GAMES.find(x=>x.id===id);return `<a class="gcard" href="#oyun/${g.id}"><div class="ico">${esc(g.ico)}</div><h3>${g.t}</h3><p>${g.d}</p></a>`;}).join('')}</div>`;
  const scan=()=>{stopTimers();flash({id:'tara',title:'Seviye Taraması',list:pickW(40,w=>true).map(w=>w),mode:'tara',again:scan,back:'#bugun'});};
  if($('#bScan'))$('#bScan').onclick=scan;if($('#bScan2'))$('#bScan2').onclick=e=>{e.preventDefault();scan();};
  $('#bNew').onclick=()=>{const list=S.daily.ids.filter(id=>!S.w[id]).map(id=>W[id]);flash({id:'yeni',title:'Yeni Kelimeler',list,mode:'yeni',back:'#bugun',after:()=>{toast('Yeni kelimeler işlendi');location.hash='#bugun';V.bugun();}});};
  $('#bRev').onclick=()=>{const ids=new Set(dueIds().slice(0,20));quiz({id:'tekrar',title:'Günlük Tekrar',total:Math.min(20,ids.size),gen:()=>genQ(ALL,w=>ids.has(w.i)),again:()=>V.bugun(),back:'#bugun'});};
};
V.oyun=([g])=>{
  if(g&&GAME[g])return GAME[g]();
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Oyunlar</div><h2>Oynayarak pekiştir</h2></div></div><p class="small muted">Her doğru cevap kelimeyi tekrar sırasında ileri taşır, her yanlış öne çeker; oyunlar da çalışma sayılır.</p><div class="gcards" style="margin-top:12px">${GAMES.map(g=>`<a class="gcard" href="#oyun/${g.id}"><div class="ico">${esc(g.ico)}</div><h3>${g.t}</h3><p>${g.d}</p>${S.best[g.id]!=null?`<p class="tiny" style="margin-top:6px">Rekor: ${S.best[g.id]}</p>`:''}</a>`).join('')}</div>`;
};
V.sozluk=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Sözlük</div><h2>Kelime ara</h2></div></div><input type="search" id="q" placeholder="Arapça (harekesiz de olur) ya da Türkçe yaz…" autocomplete="off"><div class="wl" id="res" style="margin-top:12px"></div>`;
  const run=()=>{
    const q=$('#q').value.trim();const el=$('#res');
    if(!q){el.innerHTML='<p class="muted small">Aramak için yazmaya başla.</p>';return;}
    let L;if(/[؀-ۿ]/.test(q)){const s=sk(q);L=W.filter(w=>sk(w.k)===s).concat(W.filter(w=>sk(w.k)!==s&&sk(w.k).startsWith(s))).concat(W.filter(w=>!sk(w.k).startsWith(s)&&sk(w.k).includes(s)));}
    else{const s=trn(q);L=W.filter(w=>trn(w.tr).startsWith(s)).concat(W.filter(w=>!trn(w.tr).startsWith(s)&&trn(w.tr).includes(s)));}
    el.innerHTML=(L.length?'':'<p class="muted small">Sonuç yok.</p>')+L.slice(0,60).map(w=>`<div class="wi" data-w="${w.i}"><span class="ar">${esc(w.k)}</span><span>${esc(w.tr)}</span></div>`).join('')+(L.length>60?`<p class="small muted">${L.length} sonuçtan ilk 60 gösteriliyor.</p>`:'');
    bindWi();
  };
  $('#q').oninput=run;run();
};
V.ilerleme=()=>{
  const c=counts(),ms=mistIds();
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">İlerleme</div><h2>Kelime haritan</h2></div></div>
  <div class="card"><div class="bar" style="height:16px"><i style="width:${c.o/W.length*100}%;background:var(--good)"></i><i style="width:${c.c/W.length*100}%;background:var(--gold)"></i></div>
   <p style="margin:10px 0 0"><span class="chip">✓ Öğrenildi ${c.o}</span> <span class="chip">… Çalışılıyor ${c.c}</span> <span class="chip">Yeni ${c.y}</span></p>
   <p class="small muted">“Öğrenildi”: art arda doğru bilinip 30 günlük aralığa ulaşan kelimeler. ${S.scan?`Son taramada bildiğin tahmini ≈ ${Math.round(S.scan.b/S.scan.n*W.length)} kelime.`:'Seviye taramasını yaparak tahmini bildiğin kelime sayısını görebilirsin.'}</p></div>
  <div class="sec-h"><h3>Hata defteri (${ms.length})</h3>${ms.length?'<a class="btn sm" href="#oyun/hata">Tekrar et</a>':''}</div>
  <div class="wl">${ms.length?ms.slice(0,80).map(id=>`<div class="wi" data-w="${id}"><span class="ar">${esc(W[id].k)}</span><span>${esc(W[id].tr)}</span></div>`).join(''):'<p class="muted small">Hata defterin boş.</p>'}</div>
  <div class="sec-h"><h3>Yedekle / geri yükle</h3></div>
  <div class="card"><p class="small muted" style="margin-top:0">İlerlemen yalnızca bu cihazın tarayıcısında saklanır. Telefon değiştirirsen ya da tarayıcı verisini silersen kaybolur; yedek dosyası alıp saklayabilirsin.</p>
   <div class="row"><button class="btn" id="bk">Yedek dosyası indir</button><label class="btn">Yedekten yükle<input type="file" id="rs" accept=".json,application/json" hidden></label><button class="btn bad" id="rz">Sıfırla</button></div></div>`;
  bindWi();
  $('#bk').onclick=()=>{const b=new Blob([JSON.stringify(S)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='kelime-ustasi-yedek-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);};
  $('#rs').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const t=JSON.parse(r.result);if(!t||t.v!==1||typeof t.w!=='object')throw 0;S=Object.assign(S,t);save();hud();toast('Yedek yüklendi');V.ilerleme();}catch(x){toast('Geçersiz yedek dosyası');}};r.readAsText(f);};
  $('#rz').onclick=()=>{if(confirm('Bütün ilerleme silinsin mi?')){try{localStorage.removeItem(KEY);}catch(e){}location.reload();}};
};
V.hakkinda=()=>{
  app.innerHTML=`<div style="max-width:720px;margin:0 auto"><h2 style="margin:8px 0 14px">Program hakkında</h2><div class="card" style="text-align:center"><div class="ar" style="font-size:2rem">كلمة</div><p style="margin:10px 0 4px"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p><p class="muted" style="margin:4px 0">Kaynak: <i>el-Arabiyye beyne yedeyk</i> sözlüğü (Sözlük Defteri verisi, ${W.length} madde)</p><p class="muted" style="margin:4px 0">© 2026 Hüseyin KAYA · İstifade edilmesi temennisiyle…</p></div>
  <p class="small muted" style="margin-top:14px">Kelimeler aralıklı tekrarla çalışılır: doğru bildikçe 1, 3, 7, 14, 30 gün sonra, yanlışsa hemen yeniden sorulur. Çeldiriciler aynı türden (fiil/isim) rastgele maddelerden seçilir; nadiren yanlış şık da kabul edilebilir görünebilir, böyle bir durumda anlamlara bakıp bilgiyi sözlükle karşılaştır. Program tek dosyadır, internet gerektirmez; ilerleme yalnızca bu cihazda saklanır.</p></div>`;
};
/* ---------- yönlendirme ---------- */
function route(){
  stopTimers();const h=(location.hash||'#bugun').slice(1).split('/');const v=V[h[0]]?h[0]:'bugun';
  $$('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===v));window.scrollTo(0,0);V[v](h.slice(1));
}
addEventListener('hashchange',route);
/* aynı bağlantıya yeniden dokunulursa (ör. Çıkış → #bugun) görünümü yenile */
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&a.getAttribute('href')===(location.hash||'#bugun')){e.preventDefault();route();}});
function themeApply(){if(S.theme)document.documentElement.dataset.theme=S.theme;else delete document.documentElement.dataset.theme;}
$('#tTheme').onclick=()=>{const dark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;S.theme=dark?'light':'dark';save();themeApply();};
themeApply();hud();route();
