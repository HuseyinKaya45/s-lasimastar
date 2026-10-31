/* ===== En Sık 3000 Kelime: W = [{i, r (sıklık sırası), k, p (tür), tr, ex, et}] (data.js) ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd=n=>Math.floor(Math.random()*n),pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const trn=s=>s.toLocaleLowerCase('tr').replace(/[âîû]/g,m=>({'â':'a','î':'i','û':'u'}[m]));
const norm=s=>s.toLowerCase().replace(/[’‘`]/g,"'").replace(/\s+/g,' ').trim();
const POSN={n:'isim',v:'fiil',adj:'sıfat',adv:'zarf',prep:'edat',pron:'zamir',conj:'bağlaç',det:'belirleyici',num:'sayı',int:'ünlem',aux:'yardımcı fiil',x:'kelime'};
const POSG=[['all','Bütün türler'],['n','İsim'],['v','Fiil'],['adj','Sıfat'],['adv','Zarf'],['other','Diğer (edat, zamir, bağlaç…)']];
/* ---------- durum ---------- */
const KEY='kelime-3000-v1';
let S={v:1,w:{},xp:0,streak:0,last:0,best:{},daily:{day:0,ids:[]},scan:null,theme:'',band:'all',pos:'all',user:[],stats:{ok:0,no:0}};
try{const t=JSON.parse(localStorage.getItem(KEY)||'null');if(t&&t.v===1)S=Object.assign(S,t);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
const BASE=W.length;
const addUserWord=u=>W.push({i:W.length,r:100000+W.length,k:u.k,p:'x',tr:u.tr,ex:u.ex||'',et:'',u:1});
S.user.forEach(addUserWord);
const BANDS=[];for(let a=1;a<=BASE;a+=500)BANDS.push([a,Math.min(a+499,BASE)]);
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5);
const INT=[0,1,3,7,14,30];
const LEVELS=[[0,'Başlangıç'],[300,'Gelişen'],[1000,'Orta'],[2500,'İleri'],[5000,'Usta']];
const lvl=()=>{let n='';LEVELS.forEach(l=>{if(S.xp>=l[0])n=l[1];});return n;};
const hud=()=>{$('#hudXp').textContent='★ '+S.xp+' · '+lvl();};
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
const posGroup=p=>['n','v','adj','adv'].includes(p)?p:'other';
const inScope=w=>{
  if(S.band!=='all'){const [a,b]=S.band.split('-').map(Number);if(w.r<a||w.r>b)return false;}
  if(S.pos!=='all'&&posGroup(w.p)!==S.pos)return false;
  return true;
};
const isDue=id=>{const r=S.w[id];return !!r&&r.d<=today();};
const dueIds=()=>Object.keys(S.w).filter(id=>isDue(+id)&&W[+id]&&inScope(W[+id])).map(Number).sort((a,b)=>(S.w[b].m-S.w[a].m)||(S.w[a].d-S.w[b].d));
const mistIds=()=>Object.keys(S.w).filter(id=>S.w[id].m>0&&W[+id]).map(Number);
let tT=0;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tT);tT=setTimeout(()=>t.hidden=true,2200);}
/* ---------- İngilizce ses: yalnızca cihazın kendi sesi, kayıt gömülü değil ---------- */
function enVoice(){
  if(!('speechSynthesis' in window))return null;
  const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));if(!vs.length)return null;
  const loc=vs.filter(v=>v.localService!==false);return loc.find(x=>/^en[-_](GB|US)/i.test(x.lang))||loc[0]||vs[0];
}
function speak(t){
  if(!('speechSynthesis' in window)){toast('Bu cihazda ses desteği yok');return false;}
  try{speechSynthesis.cancel();const v=enVoice();if(!v){toast('Cihazında İngilizce ses bulunamadı');return false;}
    const u=new SpeechSynthesisUtterance(t);u.voice=v;u.lang=v.lang;u.rate=.9;speechSynthesis.speak(u);return true;}catch(e){toast('Ses çalınamadı');return false;}
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.stopPropagation();speak(b.dataset.say);}},true);
const sayBtn=t=>`<button class="btn sm ghost" data-say="${esc(t)}" aria-label="Dinle">🔊</button>`;
/* ---------- kelime seçimi ---------- */
const weight=w=>{const r=S.w[w.i];if(!r)return 1;if(r.m>0)return 4;if(r.d<=today())return 3;if(r.b>=5)return .15;return .8;};
function pickW(n,filter){
  const pool=W.filter(w=>inScope(w)&&(!filter||filter(w)));
  return pool.map(w=>[-Math.log(1-Math.random())/weight(w),w]).sort((a,b)=>a[0]-b[0]).slice(0,n).map(x=>x[1]);
}
/* ---------- soru üretimi ---------- */
const TYPES={anlam:'İngilizceden Türkçeye',tr:'Türkçeden İngilizceye',bosluk:'Boşluk doldur',cumle:'Cümlenin anlamı',yaz:'Yazarak',karistir:'Harfleri diz'};
const tokset=s=>new Set(s.split(/[,;()\/]+/).map(x=>trn(x.trim())).filter(Boolean));
const trSim=(a,b)=>{const A=tokset(a),B=tokset(b);for(const x of A)if(B.has(x))return true;return false;};
const samePos=(a,b)=>a.p===b.p||(posGroup(a.p)==='other'&&posGroup(b.p)==='other');
/* n adet çeldirici: aynı türden, anlamı benzemeyen, yakın sıklıktan öncelikli */
function others(w,n,get,ok){
  const near=W.filter(x=>x.i!==w.i&&!x.u&&samePos(x,w)&&Math.abs(x.r-w.r)<700),far=W.filter(x=>x.i!==w.i&&samePos(x,w));
  const out=[],seen=new Set();
  const take=pool=>{for(const x of shuffle(pool)){if(out.length>=n)break;const v=get(x);if(!v||seen.has(norm(v)))continue;if(ok&&!ok(x))continue;if(trSim(x.tr,w.tr))continue;seen.add(norm(v));out.push(v);}};
  take(near);if(out.length<n)take(far);if(out.length<n)take(W);
  return out.length===n?out:null;
}
const why=w=>`<b>${esc(w.k)}</b> ${w.u?'':sayBtn(w.k)} <span class="chip">${esc(POSN[w.p]||'')}</span> — ${esc(w.tr)}${w.ex?`<div class="small" style="margin-top:6px;font-style:italic">${esc(w.ex)}${w.ex&&!w.u?' '+sayBtn(w.ex):''}</div>`:''}${w.et?`<div class="small muted">${esc(w.et)}</div>`:''}${w.u?'':`<div class="tiny muted" style="margin-top:4px">Sıklık sırası: ${w.r}</div>`}`;
/* örnek cümlede sözcüğün (çekimli) yerini bul: tam olarak bir eşleşme varsa [başlangıç, uzunluk, yüzey biçimi] */
function findIn(ex,k){
  const stems=[k];if(/e$/.test(k))stems.push(k.slice(0,-1));if(/y$/.test(k))stems.push(k.slice(0,-1)+'i');
  const re=/[A-Za-z]+(?:['’][a-z]+)?/g;let m,hits=[];
  while((m=re.exec(ex))){const t=m[0].toLowerCase().replace(/['’].*$/,'');
    const ok=stems.some(s=>t===s||(t.startsWith(s)&&t.length-s.length<=3&&/^(s|es|ed|d|ing|er|est|ly|ies|ied|n|en)$/.test(t.slice(s.length))))||(k.length>2&&t.length===k.length+4&&t.startsWith(k+k[k.length-1])&&/(ing|ed)$/.test(t))||(k.length>2&&t.length===k.length+3&&t.startsWith(k+k[k.length-1])&&/(er|en)$/.test(t));
    if(ok)hits.push([m.index,m[0].length,m[0]]);}
  return hits.length===1?hits[0]:null;
}
function mkQ(type,w){
  const base={type,w,why:why(w)};
  if(w.u&&['bosluk','cumle'].includes(type))return null;
  if(type==='anlam'){const o=others(w,3,x=>x.tr);if(!o)return null;return Object.assign(base,{prompt:'Bu kelimenin anlamı nedir?',show:w.k,say:w.k,tag:POSN[w.p],right:w.tr,opts:shuffle([w.tr,...o])});}
  if(type==='tr'){const o=others(w,3,x=>x.k,x=>norm(x.k)!==norm(w.k));if(!o)return null;return Object.assign(base,{prompt:'İngilizcesi hangisi?',show:w.tr,tag:POSN[w.p],right:w.k,opts:shuffle([w.k,...o])});}
  if(type==='bosluk'){const f=w.ex&&w.et?findIn(w.ex,w.k):null;if(!f)return null;
    const o=others(w,3,x=>x.k,x=>norm(x.k)!==norm(w.k));if(!o)return null;
    return Object.assign(base,{prompt:'Boşluğa hangi kelime (sözlük biçimi) uyar?',sent:w.ex.slice(0,f[0])+'＿＿＿'+w.ex.slice(f[0]+f[1]),hint:w.et,tag:POSN[w.p],right:w.k,opts:shuffle([w.k,...o])});}
  if(type==='cumle'){if(!w.ex||!w.et)return null;const o=others(w,3,x=>x.et,x=>x.et&&x.ex&&Math.abs(x.et.length-w.et.length)<22);if(!o)return null;return Object.assign(base,{prompt:'Bu cümle ne demek?',show:w.ex,say:w.ex,showSmall:true,right:w.et,opts:shuffle([w.et,...o])});}
  if(type==='yaz'){if(!/^[A-Za-z' -]+$/.test(w.k))return null;return Object.assign(base,{prompt:'İngilizcesini yaz',show:w.tr,tag:POSN[w.p],right:w.k,type:'yaz',first:w.k[0]});}
  if(type==='karistir'){if(!/^[A-Za-z]{4,10}$/.test(w.k))return null;return Object.assign(base,{prompt:'Harfleri doğru sıraya diz',hint:w.tr,build:[...w.k],right:w.k});}
  return null;
}
function genQ(types,filter,tries=80){
  for(let t=0;t<tries;t++){const w=pickW(1,filter)[0];if(!w)return null;for(const ty of shuffle(types)){const q=mkQ(ty,w);if(q)return q;}}
  return null;
}
const ALL=Object.keys(TYPES);
/* ---------- ortak sınav iskeleti ---------- */
let TIMERS=[];const stopTimers=()=>{TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);});TIMERS=[];};
const gHead=(t,info,back)=>`<a class="btn sm ghost" href="${back||'#oyun'}">← Geri</a><div class="stage"><div class="hud2"><b>${t}</b><span class="small muted" id="gi">${info||''}</span></div><div class="card" id="gc"></div></div>`;
function bindWi(){$$('.wi[data-w]').forEach(el=>el.onclick=()=>{const w=W[+el.dataset.w];let d=el.querySelector('.wd');if(!d){d=document.createElement('div');d.className='wd';d.innerHTML=why(w);el.appendChild(d);}el.classList.toggle('open');});}
function endScreen(id,title,res,again,back='#oyun'){
  const nb=S.best[id]==null||res.score>S.best[id];if(nb)S.best[id]=res.score;save();hud();
  const wrong=res.wrong.map(w=>`<div class="wi" data-w="${w.i}"><b>${esc(w.k)}</b><span>${esc(w.tr)}</span></div>`).join('');
  $('#gc').innerHTML=`<div style="text-align:center"><div class="eyebrow">${esc(title)} · bitti</div><div class="scorebig">${res.score}</div><p>${res.msg}</p>${nb?'<p class="chip">Yeni rekor!</p>':`<p class="small muted">Rekor: ${S.best[id]}</p>`}</div>
  ${res.wrong.length?`<h3 style="margin:14px 0 8px;font-size:1rem">Tekrar bakılacaklar</h3><div class="wl">${wrong}</div>`:''}
  <div class="row" style="justify-content:center;margin-top:14px"><button class="btn pri" id="ag">Tekrar</button><a class="btn" href="${back}">Çıkış</a></div>`;
  $('#ag').onclick=again;bindWi();
}
/* gen: ()=>soru; total: tur sayısı; timed: 60 sn */
function quiz({id,title,total=10,timed=false,gen,again,back,msgOf}){
  app.innerHTML=gHead(title,'',back);const card=$('#gc');let n=0,sc=0,ok=0,left=60,done=false;const wrong=[],seenW=new Set();
  const fin=()=>{if(done)return;done=true;stopTimers();endScreen(id,title,{score:sc,wrong,msg:msgOf?msgOf(ok,n):(timed?`60 saniyede ${ok} doğru.`:`${n} sorudan ${ok} doğru.`)},again,back);};
  const answer=(q,good)=>{
    if(good){ok++;sc+=10;}else if(timed)left=Math.max(0,left-3);
    if(!good&&!seenW.has(q.w.i)){seenW.add(q.w.i);wrong.push(q.w);}
    rate(q.w.i,good);$('#gi').textContent='Puan '+sc;
  };
  const nextBtn=()=>`<div class="row" style="margin-top:8px"><button class="btn pri sm" id="nx">${n>=total&&!timed?'Bitir':'Sonraki'}</button></div>`;
  const round=()=>{
    if(done)return;if(!timed&&n>=total)return fin();
    const q=gen();if(!q){card.innerHTML='<p class="muted" style="text-align:center">Bu oyun için uygun kelime bulunamadı (kapsam çok dar olabilir).</p>';return;}
    n++;
    const head=`${timed?`<div class="row" style="justify-content:space-between"><span class="timer ${left<=10?'low':''}" id="tm">⏱ ${left} sn</span><b>Puan ${sc}</b></div>`:''}<p class="q">${q.prompt}${timed?'':` <span class="muted small">(${n}/${total})</span>`}</p>`;
    if(q.build){
      const tiles=shuffle(q.build.map((t,i)=>({t,i})));let placed=[];let tries=0;
      const draw=()=>{
        card.innerHTML=`${head}<p class="small muted" style="text-align:center">Anlam: ${esc(q.hint)}</p><div class="slots">${placed.map((p,j)=>`<button class="tile" data-p="${j}">${esc(p.t)}</button>`).join('')||'<span class="muted small">Harflere sırayla dokun</span>'}</div><div class="tiles">${tiles.map((x,j)=>`<button class="tile ${placed.includes(x)?'ghost':''}" data-t="${j}" ${placed.includes(x)?'disabled':''}>${esc(x.t)}</button>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn" id="un">Geri al</button><button class="btn pri" id="ck" ${placed.length===tiles.length?'':'disabled'}>Kontrol</button><button class="btn ghost" id="pass">Pas</button></div><div class="fb" id="fb" hidden></div>`;
        $$('[data-t]').forEach(b=>b.onclick=()=>{placed.push(tiles[+b.dataset.t]);draw();});
        $$('[data-p]').forEach(b=>b.onclick=()=>{placed.splice(+b.dataset.p,1);draw();});
        $('#un').onclick=()=>{placed.pop();draw();};
        const reveal=good=>{answer(q,good);$$('#gc button').forEach(b=>b.disabled=true);const f=$('#fb');f.hidden=false;f.className='fb '+(good?'ok':'no');f.innerHTML=(good?'Doğru! ':'Doğrusu: ')+q.why+nextBtn();$('#nx').onclick=round;$('#nx').disabled=false;};
        $('#pass').onclick=()=>reveal(false);
        $('#ck').onclick=()=>{const w=placed.map(p=>p.t).join('');if(w===q.right)reveal(true);else{tries++;if(tries>=2)reveal(false);else{placed=[];draw();const f=$('#fb');f.hidden=false;f.className='fb no';f.textContent='Olmadı, bir kez daha dene.';}}};
      };draw();
    }else if(q.type==='yaz'){
      card.innerHTML=`${head}<div class="qar" style="font-size:1.8rem">${esc(q.show)}</div><p class="small muted" style="text-align:center">${esc(q.tag||'')} · İpucu: <b>${esc(q.first)}</b>… (${q.right.length} harf)</p><div class="row" style="justify-content:center;margin-top:8px"><input type="text" id="ans" autocomplete="off" autocapitalize="none" spellcheck="false" style="max-width:320px"><button class="btn pri" id="ck">Kontrol</button></div><div class="fb" id="fb" hidden></div>`;
      const inp=$('#ans');inp.focus();
      const check=()=>{if($('#nx'))return;const v=norm(inp.value);if(!v)return;const good=v===norm(q.right);answer(q,good);inp.disabled=true;$('#ck').disabled=true;const f=$('#fb');f.hidden=false;f.className='fb '+(good?'ok':'no');f.innerHTML=(good?'Doğru! ':'Doğrusu: ')+q.why+nextBtn();$('#nx').onclick=round;$('#nx').focus();};
      $('#ck').onclick=check;inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};
    }else{
      card.innerHTML=`${head}${q.show?`<div class="qar" ${q.showSmall?'style="font-size:1.35rem;font-weight:600"':''}>${esc(q.show)}${q.say?' '+sayBtn(q.say):''}</div>`:''}${q.tag&&!q.sent?`<p class="small muted" style="text-align:center">${esc(q.tag)}</p>`:''}${q.sent?`<div class="qs">${esc(q.sent)}</div>`:''}${q.hint?`<p class="small muted" style="text-align:center">Cümlenin Türkçesi: ${esc(q.hint)}</p>`:''}<div class="opts" ${q.showSmall?'style="grid-template-columns:1fr"':''}>${q.opts.map((o,i)=>`<button class="opt" data-o="${i}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb" hidden></div>`;
      $$('[data-o]').forEach(b=>b.onclick=()=>{const good=q.opts[+b.dataset.o]===q.right;$$('[data-o]').forEach(x=>{x.disabled=true;if(q.opts[+x.dataset.o]===q.right)x.classList.add('ok');});if(!good)b.classList.add('no');answer(q,good);
        const f=$('#fb');f.hidden=false;f.className='fb '+(good?'ok':'no');
        if(timed){f.innerHTML=(good?'Doğru! ':'Doğrusu: ')+esc(q.right);TIMERS.push(setTimeout(round,good?350:1100));}
        else{f.innerHTML=(good?'Doğru!':'Yanlış.')+'<div style="margin-top:6px">'+q.why+'</div>'+nextBtn();$('#nx').onclick=round;$('#nx').focus();}});
    }
    if(q.onShow)TIMERS.push(setTimeout(q.onShow,200));
  };
  round();
  if(timed)TIMERS.push(setInterval(()=>{left--;const t=$('#tm');if(t){t.textContent='⏱ '+left+' sn';t.classList.toggle('low',left<=10);}if(left<=0)fin();},1000));
}
/* ---------- dinle ve seç ---------- */
function dinleGame(){
  if(!enVoice()){app.innerHTML=gHead('Dinle ve Seç');$('#gc').innerHTML='<p class="muted" style="text-align:center">Bu oyun cihazının İngilizce sesini kullanır; şu an cihazında İngilizce ses bulunamadı.</p>';return;}
  quiz({id:'dinle',title:'Dinle ve Seç',gen:()=>{const q=genQ(['anlam']);if(!q)return null;q.prompt='Duyduğun kelimenin anlamı nedir? (🔊 ile tekrar dinle)';q.say=q.show;q.show='🎧';q.tag=null;q.onShow=()=>speak(q.say);return q;},again:()=>GAME.dinle()});
}
/* ---------- bilgi kartı (seviye taraması, yeni kelimeler, üç saniye) ---------- */
function flash({id,title,list,mode,again,back,after}){
  app.innerHTML=gHead(title,'',back);const card=$('#gc');let i=0;const cnt={b:0,k:0,x:0};let left=3,revealed=false;const byBand={};
  const next=()=>{stopTimers();if(i>=list.length)return finish();draw();};
  const finish=()=>{
    if(mode==='tara'){S.scan={n:list.length,b:cnt.b,k:cnt.k,x:cnt.x,day:today(),est:estimate(byBand)};}save();hud();
    if(after)return after(cnt);
    card.innerHTML=`<div style="text-align:center"><div class="eyebrow">${esc(title)} · bitti</div><div class="scorebig">${cnt.b}/${list.length}</div><p>Biliyorum: <b>${cnt.b}</b> · Karıştırıyorum: <b>${cnt.k}</b> · Bilmiyorum: <b>${cnt.x}</b></p>${mode==='tara'?`<p>Tahminî bildiğin kelime sayısı: <b>≈ ${S.scan.est} / ${BASE}</b></p><p class="small muted">Bu, her sıklık diliminden örnek alınarak yapılmış bir tahmindir; kesin değildir. Bildiklerin tekrar sırasının sonuna alındı, karıştırdıkların ve bilmediklerin yakında önüne gelecek.</p>`:''}</div><div class="row" style="justify-content:center;margin-top:12px">${again?'<button class="btn pri" id="ag">Tekrar</button>':''}<a class="btn" href="${back||'#bugun'}">Çıkış</a></div>`;
    if(again)$('#ag').onclick=again;
  };
  const rateIt=lv=>{const w=list[i];cnt[lv]++;const bi=Math.floor((w.r-1)/500);(byBand[bi]=byBand[bi]||{n:0,b:0}).n++;if(lv==='b')byBand[bi].b++;
    if(mode==='uc'){if(lv==='b')rate(w.i,true);else if(lv==='x')rate(w.i,false);else setLevel(w.i,'k');}else setLevel(w.i,lv);
    i++;next();};
  const draw=()=>{
    const w=list[i];revealed=false;left=3;
    card.innerHTML=`<div class="row" style="justify-content:space-between"><span class="small muted">${i+1} / ${list.length}</span>${mode==='uc'?'<span class="timer" id="tm">⏱ 3</span>':''}</div><div class="flash" id="fl"><div class="qar" style="font-size:2.2rem">${esc(w.k)}</div><div class="small muted">${esc(POSN[w.p]||'')}</div><div class="small muted" id="hintx">${mode==='uc'?'Anlamını düşün…':'Anlamını hatırlamaya çalış, sonra karta dokun'}</div><div id="rv" hidden style="width:100%"></div></div><div class="row" id="rb" style="justify-content:center;margin-top:10px" hidden><button class="btn good" data-l="b">Biliyorum</button><button class="btn mid" data-l="k">Karıştırıyorum</button><button class="btn bad" data-l="x">Bilmiyorum</button></div>`;
    const reveal=()=>{if(revealed)return;revealed=true;stopTimers();$('#rv').hidden=false;$('#rb').hidden=false;$('#hintx').hidden=true;$('#rv').innerHTML=`<div style="font-size:1.25rem;font-weight:600;margin:6px 0">${esc(w.tr)} ${w.u?'':sayBtn(w.k)}</div>${w.ex?`<div style="margin-top:6px;font-style:italic">${esc(w.ex)}</div>`:''}${w.et?`<div class="small muted">${esc(w.et)}</div>`:''}`;$$('[data-l]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();rateIt(b.dataset.l);});};
    $('#fl').onclick=reveal;
    if(mode==='uc')TIMERS.push(setInterval(()=>{left--;const t=$('#tm');if(t)t.textContent='⏱ '+Math.max(left,0);if(left<=0)reveal();},1000));
  };
  if(!list.length){card.innerHTML='<p class="muted" style="text-align:center">Bu kapsamda gösterilecek kelime yok.</p>';return;}
  next();
}
/* dilim dilim bilme oranından toplam tahmini: her dilimin oranı × dilimin kelime sayısı */
function estimate(byBand){let t=0,cov=0;BANDS.forEach((b,i)=>{const e=byBand[i];const sz=b[1]-b[0]+1;if(e&&e.n){t+=e.b/e.n*sz;cov+=sz;}});return cov?Math.round(t/cov*BASE):0;}
/* tabakalı örnek: her 500'lük dilimden eşit sayıda */
function stratified(per){const out=[];BANDS.forEach(b=>{out.push(...shuffle(W.filter(w=>w.r>=b[0]&&w.r<=b[1]&&!w.u)).slice(0,per));});return shuffle(out);}
/* ---------- eşleştirme ---------- */
function eslesGame(){
  app.innerHTML=gHead('Eşleştirme');const card=$('#gc');let rounds=0,sc=0,errs=0;const wrong=[],seenW=new Set();
  const round=()=>{
    if(rounds>=3){return endScreen('esles','Eşleştirme',{score:sc,wrong,msg:`3 turda ${sc} puan, ${errs} hata.`},eslesGame);}
    rounds++;const trs=new Set(),L=[];
    pickW(12,w=>w.k.length<18&&w.tr.length<30).forEach(w=>{const k=trn(w.tr);if(!trs.has(k)&&L.length<7){trs.add(k);L.push(w);}});
    if(L.length<3){card.innerHTML='<p class="muted" style="text-align:center">Bu kapsamda eşleştirme için yeterli kelime yok.</p>';return;}
    const left=shuffle(L),right=shuffle(L);let sel=null,done=0;
    card.innerHTML=`<p class="q">İngilizce kelimeleri Türkçe anlamlarıyla eşleştir <span class="muted small">(${rounds}/3)</span></p><div class="match"><div class="col">${left.map(w=>`<button class="mbtn" data-a="${w.i}">${esc(w.k)}</button>`).join('')}</div><div class="col">${right.map(w=>`<button class="mbtn" data-t="${w.i}">${esc(w.tr)}</button>`).join('')}</div></div>`;
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
 {id:'uc',ico:'3',t:'Üç Saniye',d:'Kelime çıkar, üç saniyede anlamını hatırla; sonra bilip bilmediğini söyle.',run:()=>flash({id:'uc',title:'Üç Saniye',list:pickW(15),mode:'uc',again:()=>GAME.uc(),back:'#oyun'})},
 {id:'hizli',ico:'60',t:'Hızlı Test',d:'60 saniye: anlamını ya da İngilizcesini bul. Yanlış 3 saniye götürür.',run:()=>quiz({id:'hizli',title:'Hızlı Test',timed:true,gen:()=>genQ(['anlam','tr']),again:()=>GAME.hizli()})},
 {id:'anlam',ico:'EN→TR',t:'İngilizceden Türkçeye',d:'İngilizce kelime verilir, Türkçe anlamını seç.',run:()=>quiz({id:'anlam',title:'İngilizceden Türkçeye',gen:()=>genQ(['anlam']),again:()=>GAME.anlam()})},
 {id:'tr',ico:'TR→EN',t:'Türkçeden İngilizceye',d:'Türkçe anlam verilir, doğru İngilizce kelimeyi seç.',run:()=>quiz({id:'tr',title:'Türkçeden İngilizceye',gen:()=>genQ(['tr']),again:()=>GAME.tr()})},
 {id:'bosluk',ico:'___',t:'Boşluk Doldur',d:'Örnek cümlede eksik kelimeyi bul; cümlenin Türkçesi ipucu olarak görünür.',run:()=>quiz({id:'bosluk',title:'Boşluk Doldur',gen:()=>genQ(['bosluk']),again:()=>GAME.bosluk()})},
 {id:'cumle',ico:'“…”',t:'Cümlenin Anlamı',d:'İngilizce örnek cümle verilir, doğru Türkçe çevirisini seç.',run:()=>quiz({id:'cumle',title:'Cümlenin Anlamı',gen:()=>genQ(['cumle']),again:()=>GAME.cumle()})},
 {id:'yaz',ico:'Aa',t:'Yazarak',d:'Türkçe anlam verilir; İngilizcesini yaz (ilk harf ipucu).',run:()=>quiz({id:'yaz',title:'Yazarak',gen:()=>genQ(['yaz']),again:()=>GAME.yaz()})},
 {id:'karistir',ico:'ABC',t:'Harfleri Diz',d:'Karışık harflere sırayla dokunarak kelimeyi kur.',run:()=>quiz({id:'karistir',title:'Harfleri Diz',gen:()=>genQ(['karistir']),again:()=>GAME.karistir()})},
 {id:'esles',ico:'⇄',t:'Eşleştirme',d:'İngilizce kelimeleri Türkçe karşılıklarıyla eşleştir.',run:eslesGame},
 {id:'dinle',ico:'🔊',t:'Dinle ve Seç',d:'Kelimeyi dinle, anlamını seç. Cihazının İngilizce sesini kullanır.',run:dinleGame},
 {id:'karma',ico:'★',t:'Karma Antrenman',d:'Bütün soru türlerinden 15 soru.',run:()=>quiz({id:'karma',title:'Karma Antrenman',total:15,gen:()=>genQ(ALL),again:()=>GAME.karma()})},
 {id:'sinav',ico:'✎',t:'Sınav',d:'20 soru, karışık türlerde; sonunda zayıf kelimelerin listesi.',run:()=>quiz({id:'sinav',title:'Sınav',total:20,gen:()=>genQ(ALL),again:()=>GAME.sinav(),msgOf:(ok,n)=>`%${Math.round(ok/Math.max(n,1)*100)} başarı (${ok}/${n}).`})},
 {id:'hata',ico:'✗',t:'Hata Defterim',d:'Yanlış yaptığın ya da bilmediğin kelimeler yeniden sorulur.',run:()=>{const ids=mistIds();if(!ids.length){app.innerHTML=gHead('Hata Defterim');$('#gc').innerHTML='<p class="muted" style="text-align:center">Hata defterin boş. Önce biraz çalış; yanlışların burada toplanır.</p>';return;}
   const set=new Set(ids);quiz({id:'hata',title:'Hata Defterim',total:Math.min(15,ids.length),gen:()=>genQ(ALL,w=>set.has(w.i)&&S.w[w.i]&&S.w[w.i].m>0),again:()=>GAME.hata()});}}
];
const GAME={};GAMES.forEach(g=>GAME[g.id]=()=>{stopTimers();g.run();});
/* ---------- görünümler ---------- */
const V={};
function counts(){let o=0,c=0;for(const id in S.w){if(!W[+id])continue;if(S.w[id].b>=5)o++;else c++;}return {o,c,y:W.length-o-c};}
const bandLabel=b=>b[0]+'–'+b[1];
const scopeSel=()=>`<span class="row"><label class="small muted">Sıklık: <select id="band"><option value="all">Hepsi (${BASE})</option>${BANDS.map(b=>`<option value="${b[0]}-${b[1]}" ${S.band===b[0]+'-'+b[1]?'selected':''}>${bandLabel(b)}. kelimeler</option>`).join('')}</select></label><label class="small muted">Tür: <select id="pos">${POSG.map(p=>`<option value="${p[0]}" ${S.pos===p[0]?'selected':''}>${p[1]}</option>`).join('')}</select></label></span>`;
function bindScope(re){const b=$('#band'),p=$('#pos');if(b)b.onchange=()=>{S.band=b.value;save();re();};if(p)p.onchange=()=>{S.pos=p.value;save();re();};}
V.bugun=()=>{
  const t=today(),c=counts(),due=dueIds().length;
  /* yeni kelimeler sıklık sırasıyla: en sık olan önce */
  const fresh=()=>W.filter(w=>!S.w[w.i]&&!w.u&&inScope(w)).sort((a,b)=>a.r-b.r).slice(0,15).map(w=>w.i);
  if(S.daily.day!==t){S.daily={day:t,ids:fresh()};save();}
  let ids=S.daily.ids.filter(id=>!S.w[id]&&W[id]&&inScope(W[id]));if(!ids.length&&S.daily.day===t){const f=fresh();ids=f;}
  const newLeft=ids.length;
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Bugün</div><h2>3000 kelimeye hoş geldin</h2></div><span class="chip">🔥 ${S.streak} gün</span></div>
  <div class="grid g2">
   <div class="card"><h3>Günlük plan</h3><p class="small muted" style="margin:6px 0 12px">Yeni kelimeler en sık kullanılandan başlar. Önce yenilerle tanış, sonra bekleyenleri tekrar et. On beş dakika yeter.</p>
    <div class="row"><button class="btn pri" id="bNew" ${newLeft?'':'disabled'}>Yeni kelimeler (${newLeft})</button><button class="btn pri" id="bRev" ${due?'':'disabled'}>Tekrar (${due} bekliyor)</button></div>
    ${!S.scan?'<p class="small" style="margin-top:12px">Önce <b>seviye taramasını</b> yap: bildiklerin ayıklansın, vaktini bilmediklerine ayır.</p><button class="btn" id="bScan">Seviye taraması (30 kelime)</button>':`<p class="small muted" style="margin-top:12px">Son taramada tahmini ≈ ${S.scan.est} / ${BASE} kelime biliyordun. <a href="#" id="bScan2">Yeniden tara</a></p>`}
    <p style="margin:12px 0 0">${scopeSel()}</p></div>
   <div class="card"><h3>Durum</h3><div class="bar" style="margin:10px 0 8px"><i style="width:${c.o/BASE*100}%;background:var(--good)"></i><i style="width:${c.c/BASE*100}%;background:var(--gold)"></i></div>
    <div class="small"><span class="chip">✓ Öğrenildi ${c.o}</span> <span class="chip">… Çalışılıyor ${c.c}</span> <span class="chip">Yeni ${c.y}</span></div>
    <p class="small muted" style="margin-top:10px">Toplam ${W.length} kelime · Doğru ${S.stats.ok} · Yanlış ${S.stats.no}</p></div>
  </div>
  <div class="sec-h"><h3>Hızlı başla</h3><a href="#oyun" class="small">Bütün oyunlar →</a></div>
  <div class="gcards">${['hizli','bosluk','cumle','yaz'].map(id=>{const g=GAMES.find(x=>x.id===id);return `<a class="gcard" href="#oyun/${g.id}"><div class="ico">${esc(g.ico)}</div><h3>${g.t}</h3><p>${g.d}</p></a>`;}).join('')}</div>`;
  bindScope(V.bugun);
  const scan=()=>{stopTimers();flash({id:'tara',title:'Seviye Taraması',list:stratified(5),mode:'tara',again:scan,back:'#bugun'});};
  if($('#bScan'))$('#bScan').onclick=scan;if($('#bScan2'))$('#bScan2').onclick=e=>{e.preventDefault();scan();};
  $('#bNew').onclick=()=>{const list=ids.map(id=>W[id]);flash({id:'yeni',title:'Yeni Kelimeler',list,mode:'yeni',back:'#bugun',after:()=>{toast('Yeni kelimeler işlendi');S.daily.ids=[];save();V.bugun();}});};
  $('#bRev').onclick=()=>{const set=new Set(dueIds().slice(0,20));quiz({id:'tekrar',title:'Günlük Tekrar',total:Math.min(20,set.size),gen:()=>genQ(ALL,w=>set.has(w.i)),again:()=>V.bugun(),back:'#bugun'});};
};
V.oyun=([g])=>{
  if(g&&GAME[g])return GAME[g]();
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Oyunlar</div><h2>Oynayarak pekiştir</h2></div></div><p class="small muted">Her doğru cevap kelimeyi tekrar sırasında ileri taşır, her yanlış öne çeker; oyunlar da çalışma sayılır. Aşağıdaki seçimle hangi kelimelerle oynayacağını daraltabilirsin.</p><p>${scopeSel()}</p><div class="gcards" style="margin-top:12px">${GAMES.map(g=>`<a class="gcard" href="#oyun/${g.id}"><div class="ico">${esc(g.ico)}</div><h3>${g.t}</h3><p>${g.d}</p>${S.best[g.id]!=null?`<p class="tiny" style="margin-top:6px">Rekor: ${S.best[g.id]}</p>`:''}</a>`).join('')}</div>`;
  bindScope(()=>V.oyun([]));
};
V.sozluk=()=>{
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">Sözlük</div><h2>Kelime ara ve ekle</h2></div></div><input type="search" id="q" placeholder="İngilizce ya da Türkçe yaz…" autocomplete="off"><div class="wl" id="res" style="margin-top:12px"></div>
  <div class="sec-h"><h3>Kendi kelimelerim</h3></div>
  <div class="card"><p class="small muted" style="margin-top:0">Her satıra bir kelime yaz: <b>kelime ; Türkçesi ; örnek cümle</b> (örnek isteğe bağlı). Eklediklerin diğerleriyle aynı oyunlarda çalışılır (boşluk doldurma ve cümle oyunları hariç).</p>
   <textarea id="ut" rows="5" style="width:100%;padding:10px;border-radius:12px;border:1.5px solid var(--line);background:var(--panel);font:inherit" placeholder="reluctant ; isteksiz ; She was reluctant to go.&#10;thrive ; gelişmek, serpilmek"></textarea>
   <div class="row" style="margin-top:8px"><button class="btn pri" id="ua">Ekle</button><span class="small muted">${S.user.length} kelime eklenmiş</span></div></div>`;
  const run=()=>{
    const q=$('#q').value.trim();const el=$('#res');
    if(!q){el.innerHTML='<p class="muted small">Aramak için yazmaya başla.</p>';return;}
    const s=trn(q);const L=W.filter(w=>trn(w.k).startsWith(s)||trn(w.tr).startsWith(s)).concat(W.filter(w=>!trn(w.k).startsWith(s)&&!trn(w.tr).startsWith(s)&&(trn(w.k).includes(s)||trn(w.tr).includes(s))));
    el.innerHTML=(L.length?'':'<p class="muted small">Sonuç yok.</p>')+L.slice(0,60).map(w=>`<div class="wi" data-w="${w.i}"><b>${esc(w.k)}</b><span>${esc(w.tr)}</span></div>`).join('')+(L.length>60?`<p class="small muted">${L.length} sonuçtan ilk 60 gösteriliyor.</p>`:'');
    bindWi();
  };
  $('#q').oninput=run;run();
  $('#ua').onclick=()=>{
    const have=new Set(W.map(w=>norm(w.k)));let n=0,skip=0;
    $('#ut').value.split(/\n/).forEach(line=>{line=line.trim();if(!line)return;let p=line.split(/\s*[;|\t]\s*/);if(p.length<2)p=line.split(/\s+[-–=]\s+/);if(p.length<2||!p[0]||!p[1]){skip++;return;}
      if(have.has(norm(p[0]))){skip++;return;}have.add(norm(p[0]));const u={k:p[0].trim(),tr:p[1].trim(),ex:(p[2]||'').trim()};S.user.push(u);addUserWord(u);n++;});
    save();toast(n+' kelime eklendi'+(skip?' · '+skip+' satır atlandı (eksik ya da zaten var)':''));V.sozluk();
  };
};
V.ilerleme=()=>{
  const c=counts(),ms=mistIds();
  app.innerHTML=`<div class="sec-h"><div><div class="eyebrow">İlerleme</div><h2>Kelime haritan</h2></div></div>
  <div class="card"><div class="bar" style="height:16px"><i style="width:${c.o/BASE*100}%;background:var(--good)"></i><i style="width:${c.c/BASE*100}%;background:var(--gold)"></i></div>
   <p style="margin:10px 0 0"><span class="chip">✓ Öğrenildi ${c.o}</span> <span class="chip">… Çalışılıyor ${c.c}</span> <span class="chip">Yeni ${c.y}</span></p>
   <p class="small muted">“Öğrenildi”: art arda doğru bilinip 30 günlük aralığa ulaşan kelimeler. ${S.scan?`Son taramada tahmini bildiğin ≈ ${S.scan.est} kelime.`:''}</p></div>
  <div class="sec-h"><h3>Sıklık dilimlerine göre</h3></div>
  <div class="wl">${BANDS.map(b=>{const ws=W.filter(w=>w.r>=b[0]&&w.r<=b[1]&&!w.u);const o=ws.filter(w=>S.w[w.i]&&S.w[w.i].b>=5).length,k=ws.filter(w=>S.w[w.i]&&S.w[w.i].b<5).length;return `<div class="card" style="padding:10px 12px"><div class="row" style="justify-content:space-between"><b>${bandLabel(b)}. kelimeler</b><span class="small muted">${o} öğrenildi · ${k} çalışılıyor · ${ws.length-o-k} yeni</span></div><div class="bar" style="margin-top:6px"><i style="width:${o/ws.length*100}%;background:var(--good)"></i><i style="width:${k/ws.length*100}%;background:var(--gold)"></i></div></div>`;}).join('')}</div>
  <div class="sec-h"><h3>Hata defteri (${ms.length})</h3>${ms.length?'<a class="btn sm" href="#oyun/hata">Tekrar et</a>':''}</div>
  <div class="wl">${ms.length?ms.slice(0,80).map(id=>`<div class="wi" data-w="${id}"><b>${esc(W[id].k)}</b><span>${esc(W[id].tr)}</span></div>`).join(''):'<p class="muted small">Hata defterin boş.</p>'}</div>
  <div class="sec-h"><h3>Yedekle / geri yükle</h3></div>
  <div class="card"><p class="small muted" style="margin-top:0">İlerlemen ve eklediğin kelimeler yalnızca bu cihazın tarayıcısında saklanır. Telefon değiştirirsen ya da tarayıcı verisini silersen kaybolur; yedek dosyası alıp saklayabilirsin.</p>
   <div class="row"><button class="btn" id="bk">Yedek dosyası indir</button><label class="btn">Yedekten yükle<input type="file" id="rs" accept=".json,application/json" hidden></label><button class="btn bad" id="rz">Sıfırla</button></div></div>`;
  bindWi();
  $('#bk').onclick=()=>{const b=new Blob([JSON.stringify(S)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='kelime-3000-yedek-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);};
  $('#rs').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const t=JSON.parse(r.result);if(!t||t.v!==1||typeof t.w!=='object')throw 0;try{localStorage.setItem(KEY,JSON.stringify(t));}catch(x){}toast('Yedek yüklendi, sayfa yenileniyor');setTimeout(()=>location.reload(),600);}catch(x){toast('Geçersiz yedek dosyası');}};r.readAsText(f);};
  $('#rz').onclick=()=>{if(confirm('Bütün ilerleme ve eklediğin kelimeler silinsin mi?')){try{localStorage.removeItem(KEY);}catch(e){}location.reload();}};
};
V.hakkinda=()=>{
  app.innerHTML=`<div style="max-width:720px;margin:0 auto"><h2 style="margin:8px 0 14px">Program hakkında</h2><div class="card" style="text-align:center"><div style="font-size:2rem;font-weight:700;color:var(--acc)">3000</div><p style="margin:10px 0 4px"><b>Marmara Üniversitesi İlahiyat Fakültesi Öğretim Görevlisi Hüseyin KAYA tarafından hazırlanmıştır.</b></p><p class="muted" style="margin:4px 0">İngilizcede en sık kullanılan ${BASE} sözcük</p><p class="muted" style="margin:4px 0">© 2026 Hüseyin KAYA · İstifade edilmesi temennisiyle…</p></div>
  <p class="small muted" style="margin-top:14px"><b>Liste nasıl hazırlandı:</b> Çok kaynaklı bir İngilizce derlemin sözcük sıklıkları (wordfreq) kullanıldı; çekimli biçimler tek sözcükte toplandı, özel isimler, kısaltmalar ve anlamsız parçalar elendi. Sıra, sıklığa göredir: 1. kelime en sık kullanılandır. <b>Türkçe anlamlar ve örnek cümleler yapay zekâ yardımıyla hazırlandı ve elle tek tek doğrulanmadı;</b> bir sözcüğün anlamında ya da cümlede hata görürsen, o kelimeyi not edip düzeltilmesi için bildirmen çok değerlidir. Her kelime için yalnızca en yaygın anlamlar verilmiştir; çok anlamlı sözcüklerin ender anlamları listede yoktur.</p>
  <p class="small muted">Kelimeler aralıklı tekrarla çalışılır: doğru bildikçe 1, 3, 7, 14, 30 gün sonra; yanlışsa hemen yeniden sorulur. Çeldiriciler rastgele (aynı türden) seçilir; nadiren birden fazla şık kabul edilebilir görünebilir. 🔊 düğmeleri ve Dinle oyunu cihazının kendi İngilizce sesini kullanır; cihazında İngilizce ses yoksa çalışmaz. Program tek dosyadır, internet gerektirmez; ilerleme yalnızca bu cihazda saklanır.</p></div>`;
};
/* ---------- yönlendirme ---------- */
function route(){
  stopTimers();try{speechSynthesis.cancel();}catch(e){}const h=(location.hash||'#bugun').slice(1).split('/');const v=V[h[0]]?h[0]:'bugun';
  $$('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===v));window.scrollTo(0,0);V[v](h.slice(1));
}
addEventListener('hashchange',route);
/* aynı bağlantıya yeniden dokunulursa (ör. Çıkış → #bugun) görünümü yenile */
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&a.getAttribute('href')===(location.hash||'#bugun')){e.preventDefault();route();}});
function themeApply(){if(S.theme)document.documentElement.dataset.theme=S.theme;else delete document.documentElement.dataset.theme;}
$('#tTheme').onclick=()=>{const dark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;S.theme=dark?'light':'dark';save();themeApply();};
themeApply();hud();route();
