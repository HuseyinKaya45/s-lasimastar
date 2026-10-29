/* İ'rabın Anahtarı — uygulama */
const KEY=`irab:durum`;
const INT=[0,1,3,7,14,30];
const SEK=[[`yol`,`🧭 Yol`],[`ders`,`📚 Dersler`],[`atolye`,`🛠️ Atölye`],[`vaka`,`🎭 Vakalar`],[`kart`,`🗂️ Kartlar`],[`sinav`,`📝 Sınav`],[`sozluk`,`📖 Sözlük`],[`ben`,`🏅 Ben`]];
const BAB=[``,`Cümle ve Hükümleri`,`Zarf, Car ve Mecrûr`,`Sık Kullanılan Edatlar`];
const SEVIYE=[[0,`Yeni Talebe`],[100,`Müştâk`],[250,`Müteallim`],[500,`Nahiv Yolcusu`],[900,`Mu'rib`],[1400,`Nahivci`],[2000,`Allâme`]];
const OYUN=[
[`mahal`,`Mahalli Var mı?`,`🏠`,`Önce var/yok, sonra yedi türden hangisi.`],
[`edat`,`Edat Dedektifi`,`🕵️`,`ما, من, أن, إن, لا, أي — hangi kostümde?`],
[`mut`,`Müteallak Avcısı`,`🧲`,`Car-mecrûr kime yapışır?`],
[`irab`,`Adım Adım İ'rab`,`🧩`,`Kelime kelime i'rab: ne rolü oynuyor?`],
[`beyit`,`Zevâvî Beyit Çözücü`,`🪶`,`İki beyitteki on dokuz cümleyi çöz.`],
[`esles`,`Harf Eşleştirme`,`🔗`,`Harfi anlamıyla eşleştir.`],
[`sirala`,`Adımları Sırala`,`🔢`,`Doğru yöntem sırası.`],
[`dy`,`Doğru mu, Yanlış mı?`,`⚡`,`Hızlı yanlış-avı.`]];
const ROZET=[
[`ilk`,`İlk Adım`,`🌱`,`İlk dersi tamamla`,s=>Object.keys(s.bitti).length>=1],
[`bab1`,`Cümle Ustası`,`🏠`,`1. babın derslerini bitir`,s=>[1,2,3,4].every(i=>s.bitti[i])],
[`bab2`,`Müteallak Avcısı`,`🧲`,`2. babın derslerini bitir`,s=>[5,6].every(i=>s.bitti[i])],
[`bab3`,`Edat Üstadı`,`🎭`,`3. babın derslerini bitir`,s=>[7,8,9,10,11,12].every(i=>s.bitti[i])],
[`hepsi`,`Kitabı Bitirdin`,`📘`,`12 dersin hepsi`,s=>Object.keys(s.bitti).length>=12],
[`seri3`,`3 Gün Üst Üste`,`🔥`,`3 günlük seri`,s=>s.seri>=3],
[`seri7`,`7 Gün Üst Üste`,`🌋`,`7 günlük seri`,s=>s.seri>=7],
[`xp250`,`250 Puan`,`⭐`,`250 XP topla`,s=>s.xp>=250],
[`xp1000`,`1000 Puan`,`🌟`,`1000 XP topla`,s=>s.xp>=1000],
[`dogru50`,`50 Doğru`,`🎯`,`Toplam 50 doğru cevap`,s=>s.say>=50],
[`mukemmel`,`Kusursuz Tur`,`💎`,`Bir etkinlikte %100`,s=>Object.values(s.oyun).some(o=>o.en>=100)],
[`kart20`,`Kart Kurdu`,`🗂️`,`20 kart tekrarı`,s=>s.tekr>=20],
[`vaka3`,`Dedektif`,`🎭`,`3 vakayı bitir`,s=>Object.keys(s.vaka).length>=3],
[`sinav80`,`Sertifikalı`,`🎓`,`Sınavda %80+`,s=>s.sinav.some(x=>x.puan>=80)]];
const VARS={xp:0,seri:0,son:``,bitti:{},kart:{},oyun:{},vaka:{},sinav:[],yanlis:{},tema:``,yazi:1,rozet:{},gun:{t:``,ders:0,oyun:0,kart:0},say:0,tekr:0};
let S=JSON.parse(JSON.stringify(VARS));
try{const k=JSON.parse(localStorage.getItem(KEY)||`null`);if(k)S=Object.assign(S,k)}catch(e){}
const kaydet=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
let T=`yol`,R={};
const $=s=>document.querySelector(s);
const kar=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sec=(a,n)=>kar(a).slice(0,n);
const bugun=()=>{const d=new Date();return d.getFullYear()+`-`+(d.getMonth()+1)+`-`+d.getDate()};
const gunNo=()=>Math.floor(Date.now()/864e5);
const seviye=()=>{let r=SEVIYE[0];for(const s of SEVIYE)if(S.xp>=s[0])r=s;return r};
const sonraki=()=>SEVIYE.find(s=>s[0]>S.xp);
function toast(m){const t=document.createElement(`div`);t.className=`toast`;t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}
function konfeti(){if(matchMedia(`(prefers-reduced-motion:reduce)`).matches)return;const e=[`🎉`,`✨`,`⭐`,`🌟`,`📘`];for(let i=0;i<22;i++){const s=document.createElement(`span`);s.className=`konfeti`;s.textContent=e[i%e.length];s.style.left=Math.random()*100+`vw`;s.style.animationDelay=Math.random()*.6+`s`;document.body.appendChild(s);setTimeout(()=>s.remove(),2600)}}
function gunYenile(){const b=bugun();if(S.gun.t!==b){S.gun={t:b,ders:0,oyun:0,kart:0}}}
function etkin(){gunYenile();const b=bugun();if(S.son!==b){const d=new Date();d.setDate(d.getDate()-1);const dun=d.getFullYear()+`-`+(d.getMonth()+1)+`-`+d.getDate();S.seri=S.son===dun?S.seri+1:1;S.son=b}}
function xpEkle(n,ne){etkin();S.xp+=n;if(ne&&S.gun[ne]!==undefined)S.gun[ne]++;rozetKontrol();kaydet();ust()}
function rozetKontrol(){for(const r of ROZET){if(!S.rozet[r[0]]&&r[4](S)){S.rozet[r[0]]=1;toast(`Yeni rozet: ${r[2]} ${r[1]}`);konfeti()}}}
function ust(){$(`#xp`).textContent=`⭐ `+S.xp;$(`#seri`).textContent=`🔥 `+S.seri;document.documentElement.style.setProperty(`--ars`,[1.25,1.55,1.9,2.3][S.yazi]+`rem`)}
function sekmeler(){$(`#sek`).innerHTML=SEK.map(x=>`<button class="tab ${T===x[0]?`on`:``}" data-a="git" data-v="${x[0]}">${x[1]}</button>`).join(``)}
function yukari(){window.scrollTo(0,0)}
function tema(){const t=S.tema||(matchMedia(`(prefers-color-scheme:dark)`).matches?`dark`:`light`);document.documentElement.dataset.theme=t}
const halka=(p,r=30)=>{const c=2*Math.PI*r;return `<div class="halka"><svg width="78" height="78" viewBox="0 0 78 78"><circle cx="39" cy="39" r="${r}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="8"/><circle cx="39" cy="39" r="${r}" fill="none" stroke="#fde68a" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p)}"/></svg><b>${Math.round(p*100)}%</b></div>`};
const bitenSay=()=>Object.keys(S.bitti).length;
const ilerle=(p)=>`<div class="ilerleme"><i style="width:${Math.round(p*100)}%"></i></div>`;

/* ---------- YOL ---------- */
function vYol(){
 gunYenile();const p=bitenSay()/DERS.length,sv=seviye(),sn=sonraki();
 const siradaki=DERS.find(d=>!S.bitti[d.id]);
 const zayif=Object.entries(S.yanlis).sort((a,b)=>b[1]-a[1])[0];
 const g=S.gun;
 let h=`<section class="hero"><h1>İ'rabın Anahtarı</h1><p>İbn Hişâm'ın <span class="ar" style="font-size:1.1em">قواعد الإعراب</span> risalesini oyunla, vakayla ve tekrarla öğren.</p>
 <div class="ozet">${halka(p)}<div><b>${sv[1]}</b><div style="opacity:.9">${S.xp} XP${sn?` · sonraki seviye için ${sn[0]-S.xp} XP`:``}</div><div style="opacity:.9">${bitenSay()}/${DERS.length} ders tamam</div></div></div>
 <div style="margin-top:.8rem">${siradaki?`<button class="btn" data-a="ders" data-v="${siradaki.id}">▶ ${bitenSay()?`Devam et`:`Başla`}: ${siradaki.ad}</button>`:`<button class="btn" data-a="git" data-v="sinav">🎓 Sınava gir</button>`}<button class="btn" style="background:rgba(255,255,255,.18);color:#fff" data-a="gunluk">⚡ Günün meydan okuması</button></div></section>`;
 h+=`<div class="kart"><h3>📅 Bugünün planı</h3><div class="satir"><span class="chip">${g.ders?`✅`:`⬜`} 1 ders</span><span class="chip">${g.oyun>=2?`✅`:`⬜`} 2 etkinlik turu (${Math.min(g.oyun,2)}/2)</span><span class="chip">${g.kart>=5?`✅`:`⬜`} 5 kart (${Math.min(g.kart,5)}/5)</span></div>`+(zayif?`<p class="u">Zayıf nokta: <b>${DERS.find(d=>d.id==zayif[0]).ad}</b>. <a href="#" data-a="ders" data-v="${zayif[0]}">Tekrar et</a></p>`:`<p class="u">Etkinliklerde yanlış yaptıkça zayıf noktaların burada görünecek.</p>`)+`</div>`;
 for(let b=1;b<=3;b++){h+=`<div class="bab"><h3>${b}. Bab — ${BAB[b]}</h3><div class="yol">`+DERS.filter(d=>d.bab===b).map(d=>`<button class="dugum ${S.bitti[d.id]?`bitti`:siradaki&&siradaki.id===d.id?`siradaki`:``}" data-a="ders" data-v="${d.id}" title="${d.ad}" aria-label="${d.ad}">${S.bitti[d.id]?`✓`:d.ikon}<small>${d.id}</small></button>`).join(``)+`</div></div>`}
 h+=`<div class="kutuk ana" style="margin-top:1.3rem"><b>Nasıl çalışmalı?</b> Her ders: benzetme → altın kural → örnekler → hafıza kancası → hızlı kontrol. Sonra Atölye'de oyna, Vakalar'da uygula, Kartlar'da tekrar et, Sınav'da ölç. Kural basit: <b>önce testle düşün, sonra ezberle.</b></div>`;
 h+=`<p class="u">İçerik, İbn Hişâm'ın Kavâidü'l-İ'râb ve Nüzhetü't-Tullâb (Şibrâvî tahkikli) metninden özgün anlatımla hazırlanmıştır; Arapça örnekler metindeki gibidir. Resmî ders materyalinin yerini tutmaz.</p>`;
 return h}

/* ---------- DERS ---------- */
function vDers(){
 if(R.ders){const d=DERS.find(x=>x.id===R.ders);return dersAc(d)}
 let h=`<h2>📚 Dersler</h2><p class="u">12 ders · 3 bab</p>`;
 for(let b=1;b<=3;b++){h+=`<div class="bab"><h3>${b}. Bab — ${BAB[b]}</h3><div class="izgara">`+DERS.filter(d=>d.bab===b).map(d=>`<button class="kutu ${S.bitti[d.id]?`bitti`:``}" data-a="ders" data-v="${d.id}"><span class="i">${d.ikon}</span><b>${d.id}. ${d.ad}</b><small>${d.dk} dk${S.bitti[d.id]?` · ✅ tamam`:``}</small></button>`).join(``)+`</div></div>`}
 return h}
function dersAc(d){
 R.kc=R.kc||{};const kc=R.kc[d.id]=R.kc[d.id]||{};
 const onc=DERS.find(x=>x.id===d.id-1),son=DERS.find(x=>x.id===d.id+1);
 let h=`<button class="btn sol" data-a="dersler">← Dersler</button><div class="etiket">${d.bab}. bab · ${BAB[d.bab]} · ${d.dk} dk</div><h2>${d.ikon} ${d.id}. ${d.ad}</h2>`;
 h+=`<div class="kutuk"><span class="etiket">💡 Benzetme</span><br>${d.kanca}</div>`;
 h+=`<div class="kart"><span class="etiket">📌 Altın kurallar</span><ul class="nok">`+d.kurallar.map(k=>`<li>${k}</li>`).join(``)+`</ul></div>`;
 h+=`<h3>🔍 Örnekler <small class="u">(dokun, i'rabı aç)</small></h3>`+d.ornek.map(o=>`<details class="orn"><summary><span class="arb">${o.ar}</span><span class="tr">${o.tr}</span></summary><div class="ic">`+o.irab.map(x=>`<p>• ${x}</p>`).join(``)+`</div></details>`).join(``);
 h+=`<div class="kutuk ana"><span class="etiket">🧠 Hafıza kancası</span><br>${d.ezber}</div>`;
 h+=`<div class="kutuk hata"><span class="etiket">⚠️ Sık yapılan hata</span><br>${d.hata}</div>`;
 h+=`<div class="kart"><h3>✅ Hızlı kontrol</h3>`+d.kontrol.map((q,i)=>{const c=kc[i];return `<div style="margin:.8rem 0"><div><b>${i+1}.</b> ${q.q}</div>`+q.o.map((o,j)=>`<button class="sec ${c!==undefined?(j===q.d?`d`:j===c?`y`:``):``}" ${c!==undefined?`disabled`:``} data-a="kc" data-v="${d.id}:${i}:${j}">${o}</button>`).join(``)+(c!==undefined?`<div class="cevap ${c===q.d?`d`:`y`}">${c===q.d?`✔ Doğru. `:`✘ `}${q.a}</div>`:``)+`</div>`}).join(``)+`</div>`;
 const hepsi=d.kontrol.every((q,i)=>kc[i]!==undefined);
 h+=`<div class="orta">${S.bitti[d.id]?`<p>✅ Bu dersi tamamladın.</p>`:`<button class="btn altin" data-a="bitir" data-v="${d.id}" ${hepsi?``:`disabled`}>🎉 Dersi tamamla (+25 XP)</button>${hepsi?``:`<p class="u">Önce üç soruyu cevapla.</p>`}`}</div>`;
 h+=`<div class="satir" style="justify-content:space-between">${onc?`<button class="btn sol" data-a="ders" data-v="${onc.id}">← ${onc.ad}</button>`:`<span></span>`}${son?`<button class="btn sol" data-a="ders" data-v="${son.id}">${son.ad} →</button>`:`<span></span>`}</div>`;
 return h}

/* ---------- ETKİNLİK MOTORU (MCQ) ---------- */
function mk(q,o,d,a,ders,ar){const m=o.map((x,i)=>[x,i===d]);const k=kar(m);return {q,ar,o:k.map(x=>x[0]),d:k.findIndex(x=>x[1]),a,ders}}
function isaret(bag,hedef){let r=bag;(hedef||``).split(`|`).forEach(x=>{if(x&&r.includes(x)&&!r.includes(`<mark>${x}`))r=r.replace(x,`<mark>${x}</mark>`)});return r}
const GRUP=(t)=>TUR[t].m;
function turSecenek(t,n=4){const ayni=Object.keys(TUR).filter(x=>x!==t&&GRUP(x)===GRUP(t)),dig=Object.keys(TUR).filter(x=>GRUP(x)!==GRUP(t));const s=[t,...sec(ayni,2),...sec(dig,n-3)];return kar(s)}
function gMahal(){const it=[];sec(JUMAL,7).forEach(j=>{const [bag,v,t,a]=j;const ar=`<span class="arb">${isaret(bag,v)}</span>`;
 it.push(mk(`Vurgulu cümlenin i'rabda mahalli var mı?`,[`Mahalli VAR`,`Mahalli YOK`],TUR[t].m?0:1,a,t==`haber`||t==`hal`||t==`mefulbih`||t==`muzaf`||t==`sartcevab`||t==`tabimufred`||t==`tabicumle`?2:3,ar));
 const ss=turSecenek(t);it.push(mk(`Peki hangi tür?`,ss.map(x=>TUR[x].ad),ss.indexOf(t),a,TUR[t].m?2:3,ar))});return it}
function gEdat(){return sec(EDAT,10).map(e=>{const [bag,h,t,g,a]=e;const secs=EDAT_SEC[g];const o=sec(secs.filter(x=>x!==t),3);o.push(t);return mk(`Vurgulu <span class="ar">${h}</span> hangi türdür?`,o,o.length-1,a,g===`ma`||g===`ey`?12:g===`min`||g===`en`?11:10,`<span class="arb">${isaret(bag,h)}</span>`)})}
function gMut(){return sec(MUT,8).map(m=>{const [bag,h,o,d,a]=m;return mk(`<span class="ar">${h}</span> neye müteallaktır?`,o,d,a,m[0].includes(`كَفَىٰ`)||m[1]===`كَعَمْرٍو`||m[1]===`لَوْلَاكَ`?5:6,`<span class="arb">${isaret(bag,h)}</span>`)})}
function gDY(){return sec(DY,10).map(x=>mk(x[0],[`Doğru`,`Yanlış`],x[1]?0:1,x[2],2))}
function gBeyit(){const p=BEYIT[Math.floor(Math.random()*BEYIT.length)];const it=[];const metin=p[1].join(`<br>`);p[2].forEach(c=>{const ss=turSecenek(c[1]);it.push(mk(`<b>${p[0]}</b><br>Vurgulu cümle hangi türdür?`,ss.map(x=>TUR[x].ad),ss.indexOf(c[1]),c[2],c[1]&&TUR[c[1]].m?2:3,`<span class="arb">${p[1].map(m=>isaret(m,c[0])).join(`<br>`)}</span>`))});return it}
function gIrab(){const it=[];sec(IRAB,4).forEach(s=>{const [c,tr,tk]=s;tk.forEach((k,i)=>{const ayr=KAT_AYR.find(g=>g.includes(k[1]))||[];const hav=KAT.filter(x=>x!==k[1]&&!ayr.includes(x));const o=sec(hav,3);o.push(k[1]);const sh=c.split(` `).map(w=>w===k[0]?`<mark>${w}</mark>`:w).join(` `);it.push(mk(`<i>${tr}</i><br><span class="ar">${k[0]}</span> kelimesinin i'rabdaki görevi?`,o,o.length-1,k[2],1,`<span class="arb">${sh}</span>`))})});return it}
function gSinav(){const a=sec(SINAV,14).map(s=>mk(s[0],s[1],s[2],s[4],s[3]));const b=gMut().slice(0,2).concat(gEdat().slice(0,4));return kar(a.concat(b)).slice(0,20)}
function gGunluk(){const a=[];a.push(...sec(gMahal(),2),...sec(gEdat(),1),...sec(gMut(),1),...sec(gDY(),1));return a}
function oyunBasla(k){
 if(k===`esles`)return eslesBasla();if(k===`sirala`)return siraBasla();
 const g={mahal:gMahal,edat:gEdat,mut:gMut,irab:gIrab,beyit:gBeyit,dy:gDY,sinav:gSinav,gunluk:gGunluk}[k];
 const it=g();R.oyun={k,it,i:0,dogru:0,seri:0,sec:null,xp:0,sinav:k===`sinav`,yan:[],gn:[]};T=k===`sinav`?`sinav`:`atolye`;
}
function oyunEkran(){
 const o=R.oyun,q=o.it[o.i];
 let h=`<button class="btn sol" data-a="oyunCik">← Çık</button><div class="satir" style="justify-content:space-between"><b>${o.i+1} / ${o.it.length}</b><span class="chip">🔥 ${o.seri} · ⭐ ${o.xp}</span></div>${ilerle(o.i/o.it.length)}`;
 h+=`<div class="kart">${q.ar||``}<div style="margin:.5rem 0"><b>${q.q}</b></div>`+q.o.map((x,i)=>`<button class="sec ${o.sec!==null&&!o.sinav?(i===q.d?`d`:i===o.sec?`y`:``):``} ${o.sinav&&o.sec===i?`sel`:``}" ${o.sec!==null?`disabled`:``} data-a="oyunSec" data-v="${i}">${x}</button>`).join(``);
 if(o.sec!==null&&!o.sinav)h+=`<div class="cevap ${o.sec===q.d?`d`:`y`}">${o.sec===q.d?`✔ Doğru! `:`✘ `}${q.a}</div>`;
 if(o.sec!==null)h+=`<button class="btn" data-a="oyunIleri">${o.i+1<o.it.length?`Sonraki →`:`Sonucu gör`}</button>`;
 return h+`</div>`}
function oyunSec(i){
 const o=R.oyun,q=o.it[o.i];if(o.sec!==null)return;o.sec=i;
 const ok=i===q.d;o.gn.push(ok);
 if(ok){o.dogru++;o.seri++;const x=10+Math.min(10,(o.seri-1)*2);if(!o.sinav){o.xp+=x}S.say++}else{o.seri=0;o.yan.push(q);if(q.ders)S.yanlis[q.ders]=(S.yanlis[q.ders]||0)+1}
 kaydet()}
function oyunBitir(){
 const o=R.oyun;const p=Math.round(100*o.dogru/o.it.length);o.bitti=true;o.p=p;
 if(o.sinav){const kn={};o.it.forEach((q,i)=>{const kk=KONU[q.ders]||`Genel`;kn[kk]=kn[kk]||[0,0];kn[kk][1]++;if(o.gn[i])kn[kk][0]++});o.konu=kn;S.sinav.push({t:Date.now(),puan:p});S.sinav=S.sinav.slice(-8);xpEkle(Math.round(p/2),null);if(p>=80)konfeti()}
 else if(o.k===`gunluk`){xpEkle(o.xp+20,`oyun`);if(p>=80)konfeti()}
 else{const b=S.oyun[o.k]||{en:0,n:0};b.en=Math.max(b.en,p);b.n++;S.oyun[o.k]=b;xpEkle(o.xp+(p===100?30:0),`oyun`);if(p===100)konfeti()}
 kaydet()}
function sonucEkran(){
 const o=R.oyun;const y=o.yan;const yildiz=o.p>=90?`⭐⭐⭐`:o.p>=70?`⭐⭐`:o.p>=40?`⭐`:`💪`;
 let h=`<div class="kart orta"><div style="font-size:2.4rem">${yildiz}</div><h2>${o.sinav?`Sınav sonucu`:`Tur bitti`}: %${o.p}</h2><p>${o.dogru} / ${o.it.length} doğru${o.sinav?``:` · +${o.xp+(o.p===100?30:0)} XP`}</p>`;
 if(o.sinav){h+=`<table class="tablo"><tr><th>Konu</th><th>Doğru</th><th style="width:40%"></th></tr>`+Object.entries(o.konu).map(([k,v])=>`<tr><td>${k}</td><td>${v[0]}/${v[1]}</td><td>${ilerle(v[0]/v[1])}</td></tr>`).join(``)+`</table><p>${o.p>=80?`Harika! Sertifika sınavına hazır görünüyorsun.`:o.p>=60?`İyi gidiyorsun. Yanlış konuları tekrar et.`:`Henüz erken; dersleri ve kartları tekrar edip yeniden dene.`}</p>`}
 h+=`</div>`;
 if(y.length){h+=`<div class="kart"><h3>🔁 Çalışılacak noktalar</h3>`+y.map(q=>`<div style="margin:.6rem 0;padding-bottom:.5rem;border-bottom:1px dashed var(--cizgi)">${q.ar||``}<div>${q.q}</div><div class="cevap d">✔ ${q.o[q.d]}<br>${q.a}</div>${q.ders?`<a href="#" data-a="ders" data-v="${q.ders}">📚 İlgili dersi aç</a>`:``}</div>`).join(``)+`</div>`}
 h+=`<div class="orta"><button class="btn" data-a="${o.sinav?`sinavBasla`:`oyunTekrar`}" data-v="${o.k}">🔄 Yeniden</button><button class="btn ikincil" data-a="oyunCik">Geri dön</button></div>`;
 return h}

/* ---------- Eşleştirme ve Sıralama ---------- */
function eslesBasla(){const p=sec(ESLES,6);R.oyun={k:`esles`,tip:`esles`,p,sol:kar(p.map((_,i)=>i)),sag:kar(p.map((_,i)=>i)),secL:null,eslesen:{},hata:0};T=`atolye`}
function eslesEkran(){
 const o=R.oyun;let h=`<button class="btn sol" data-a="oyunCik">← Çık</button><h2>🔗 Harf Eşleştirme</h2><p class="u">Önce soldan bir harf, sonra sağdan anlamını seç. Hata: ${o.hata}</p><div class="cift"><div>`+o.sol.map(i=>`<button class="${o.eslesen[i]!==undefined?`ok`:o.secL===i?`sel`:``}" data-a="elSol" data-v="${i}"><span class="ar">${o.p[i][0]}</span></button>`).join(``)+`</div><div>`+o.sag.map(i=>`<button class="${Object.values(o.eslesen).includes(i)?`ok`:``}" data-a="elSag" data-v="${i}">${o.p[i][1]}</button>`).join(``)+`</div></div>`;
 if(Object.keys(o.eslesen).length===o.p.length){const x=Math.max(10,60-o.hata*10);h+=`<div class="kart orta"><h3>🎉 Tamam!</h3><p>${o.hata} hata · +${o.bitti?0:x} XP</p><button class="btn" data-a="oyunTekrar" data-v="esles">🔄 Yeni tur</button></div>`}
 return h}
function elSag(i){const o=R.oyun;if(o.secL===null)return;if(o.secL===i){o.eslesen[i]=i;o.secL=null;if(Object.keys(o.eslesen).length===o.p.length&&!o.bitti){o.bitti=true;const x=Math.max(10,60-o.hata*10);const pu=Math.round(100*(6-Math.min(6,o.hata))/6);const b=S.oyun.esles||{en:0,n:0};b.en=Math.max(b.en,pu);b.n++;S.oyun.esles=b;S.say+=6;xpEkle(x,`oyun`);if(!o.hata)konfeti()}}else{o.hata++;toast(`Olmadı, tekrar dene.`);o.secL=null}}
function siraBasla(){const t=SIRA[Math.floor(Math.random()*SIRA.length)];R.oyun={k:`sirala`,tip:`sira`,t,kar:kar(t[1].map((_,i)=>i)),yan:[],kont:false}}
function siraEkran(){
 const o=R.oyun,n=o.t[1].length;let h=`<button class="btn sol" data-a="oyunCik">← Çık</button><h2>🔢 Adımları Sırala</h2><p><b>${o.t[0]}</b></p><p class="u">Adımlara doğru sırayla dokun.</p>`;
 h+=`<div class="kart">`+o.yan.map((i,k)=>`<div class="sira"><b style="${o.kont?`background:${o.t[1][i]===o.t[1][k]?`var(--dogru)`:`var(--yanlis)`}`:``}">${k+1}</b><div>${o.t[1][i]}</div></div>`).join(``)||``;
 h+=`</div><div>`+o.kar.map(i=>`<button class="cip ${o.yan.includes(i)?`k`:``}" data-a="siraSec" data-v="${i}">${o.t[1][i]}</button>`).join(``)+`</div>`;
 if(o.yan.length===n&&!o.kont)h+=`<button class="btn" data-a="siraKont">Kontrol et</button>`;
 if(o.yan.length)h+=`<button class="btn sol" data-a="siraSifir">Sıfırla</button>`;
 if(o.kont){const dg=o.yan.every((x,k)=>x===k);h+=`<div class="cevap ${dg?`d`:`y`}"><b>${dg?`✔ Mükemmel! +30 XP`:`Doğru sıra:`}</b>${dg?``:`<ol>${o.t[1].map(x=>`<li>${x}</li>`).join(``)}</ol>`}</div><button class="btn" data-a="oyunTekrar" data-v="sirala">🔄 Başka sıralama</button>`}
 return h}

/* ---------- ATÖLYE ---------- */
function vAtolye(){
 const o=R.oyun;
 if(o){if(o.tip===`esles`)return eslesEkran();if(o.tip===`sira`)return siraEkran();if(o.bitti)return sonucEkran();return oyunEkran()}
 let h=`<h2>🛠️ Atölye</h2><p class="u">Hatalarından öğrenirsin; yanlışlar ilgili derse yönlendirir.</p><div class="izgara">`+OYUN.map(g=>{const b=S.oyun[g[0]];return `<button class="kutu" data-a="oyun" data-v="${g[0]}"><span class="i">${g[2]}</span><b>${g[1]}</b><small>${g[3]}</small><br><small>${b?`En iyi: %${b.en} · ${b.n} tur`:`Henüz oynanmadı`}</small></button>`}).join(``)+`</div>`;
 return h}

/* ---------- VAKA ---------- */
function vVaka(){
 const v=R.vaka;
 if(!v){let h=`<h2>🎭 Vakalar</h2><p class="u">Küçük hikâyeler: kararlarını ver, geri bildirimi oku.</p><div class="izgara">`+VAKA.map(x=>`<button class="kutu ${S.vaka[x.id]!==undefined?`bitti`:``}" data-a="vakaAc" data-v="${x.id}"><span class="i">${x.ikon}</span><b>${x.ad}</b><small>${x.ozet}</small><br><small>${S.vaka[x.id]!==undefined?`✅ Skor: ${S.vaka[x.id]}/${x.adim.length}`:`Yeni`}</small></button>`).join(``)+`</div>`;return h}
 const x=VAKA.find(y=>y.id===v.id);
 let h=`<button class="btn sol" data-a="vakaCik">← Vakalar</button><h2>${x.ikon} ${x.ad}</h2>`;
 if(v.i===-1)return h+`<div class="kart"><p>${x.giris}</p><button class="btn" data-a="vakaBasla">Başla →</button></div>`;
 if(v.i>=x.adim.length){return h+`<div class="kart orta"><div style="font-size:2.2rem">${v.puan===x.adim.length?`🏆`:`📜`}</div><h3>Vaka tamam: ${v.puan} / ${x.adim.length}</h3><p>+${v.puan*10+15} XP</p><button class="btn" data-a="vakaAc" data-v="${x.id}">🔄 Tekrar</button><button class="btn ikincil" data-a="vakaCik">Diğer vakalar</button></div>`}
 const a=x.adim[v.i];
 h+=ilerle(v.i/x.adim.length)+`<div class="kart">${a.ar?`<span class="arb">${a.ar}</span>`:``}<p>${a.s}</p>`+v.perm.map((j,k)=>`<button class="sec ${v.s!==null?(a.o[j][1]?`d`:v.s===j?`y`:``):``}" ${v.s!==null?`disabled`:``} data-a="vakaSec" data-v="${j}">${a.o[j][0]}</button>`).join(``);
 if(v.s!==null){h+=`<div class="cevap ${a.o[v.s][1]?`d`:`y`}">${a.o[v.s][1]?`✔ `:`✘ `}${a.o[v.s][2]}</div><button class="btn" data-a="vakaIleri">${v.i+1<x.adim.length?`Devam →`:`Bitir`}</button>`}
 return h+`</div>`}
function vakaAdim(){const x=VAKA.find(y=>y.id===R.vaka.id),a=x.adim[R.vaka.i];R.vaka.perm=kar(a.o.map((_,i)=>i));R.vaka.s=null}

/* ---------- KART ---------- */
function kartSeti(){
 const now=gunNo();const id=KART.map((_,i)=>i);
 let due=id.filter(i=>S.kart[i]&&S.kart[i].d<=now).sort((a,b)=>S.kart[a].k-S.kart[b].k).slice(0,12);
 if(!due.length)due=id.filter(i=>!S.kart[i]).slice(0,8);
 return due}
function vKart(){
 const kt=R.kart||(R.kart={set:kartSeti(),i:0,acik:false});
 const bil=Object.keys(S.kart).length,usta=Object.values(S.kart).filter(x=>x.k>=4).length;
 let h=`<h2>🗂️ Tekrar Kartları</h2><p class="u">Aralıklı tekrar: bildikçe kart seyrekleşir. ${bil}/${KART.length} kart görüldü · ${usta} kart ustalaşıldı.</p>`+ilerle(usta/KART.length);
 if(kt.i>=kt.set.length)return h+`<div class="kart orta"><div style="font-size:2.2rem">${kt.set.length?`🎉`:`😌`}</div><h3>${kt.set.length?`Set bitti!`:`Bugünlük tüm kartlar tamam.`}</h3><p class="u">Yeni kartlar için ders ve etkinliklere devam et; vadesi gelen kartlar yarın seni bekler.</p><button class="btn" data-a="kartYeni">${kt.set.length?`Yeni set`:`Kontrol et`}</button></div>`;
 const k=KART[kt.set[kt.i]];
 h+=`<div class="satir" style="justify-content:space-between"><b>${kt.i+1}/${kt.set.length}</b><span class="u">Ders ${k[2]}</span></div><div class="kart kartca" data-a="kartAc"><div>${kt.acik?`<div class="etiket">Cevap</div><div>${k[1]}</div>`:`<div class="etiket">Soru</div><div>${k[0]}</div><p class="u">Cevabı görmek için dokun</p>`}</div></div>`;
 if(kt.acik)h+=`<div class="satir" style="justify-content:center"><button class="btn" style="background:var(--yanlis)" data-a="kartPuan" data-v="0">Bilemedim</button><button class="btn altin" data-a="kartPuan" data-v="1">Zor</button><button class="btn" data-a="kartPuan" data-v="2">Bildim</button></div>`;
 return h}

/* ---------- SINAV ---------- */
function vSinav(){
 if(R.oyun&&R.oyun.sinav){return R.oyun.bitti?sonucEkran():oyunEkran()}
 const s=S.sinav;
 let h=`<h2>📝 Deneme Sınavı</h2><div class="kart"><p>20 soru: cümle, car-mecrûr ve edat konularından karışık. Sınav sırasında anında geri bildirim yok; sonunda konu bazlı sonuç ve çalışılacak noktalar gelir.</p><button class="btn" data-a="sinavBasla">▶ Sınava başla</button></div>`;
 if(s.length)h+=`<div class="kart"><h3>Geçmiş sonuçlar</h3><table class="tablo">`+s.slice().reverse().map(x=>`<tr><td>${new Date(x.t).toLocaleDateString(`tr-TR`)}</td><td>%${x.puan}</td><td style="width:50%">${ilerle(x.puan/100)}</td></tr>`).join(``)+`</table></div>`;
 return h}

/* ---------- SÖZLÜK ---------- */
function vSozluk(){
 const q=(R.sq||``).toLowerCase();
 const l=SOZLUK.filter(s=>!q||s[0].toLowerCase().includes(q)||s[2].toLowerCase().includes(q)||s[1].includes(q));
 return `<h2>📖 Sözlük</h2><input class="ara" id="sara" placeholder="Terim ara (Türkçe ya da Arapça)" value="${R.sq||``}" aria-label="Ara"><p class="u">${l.length} terim</p><div id="szl">`+l.map(s=>`<div class="sz"><span class="ar">${s[1]}</span><div><b>${s[0]}</b><br><small>${s[2]}</small></div></div>`).join(``)+`</div>`}

/* ---------- BEN ---------- */
function vBen(){
 const sv=seviye();const n=ROZET.filter(r=>S.rozet[r[0]]).length;
 return `<h2>🏅 Ben</h2><div class="kart"><div class="satir"><span class="chip">${sv[1]}</span><span class="chip">⭐ ${S.xp} XP</span><span class="chip">🔥 ${S.seri} gün seri</span><span class="chip">🎯 ${S.say} doğru</span></div><p>Ders: <b>${bitenSay()}/12</b> · Vaka: <b>${Object.keys(S.vaka).length}/${VAKA.length}</b> · Kart tekrarı: <b>${S.tekr}</b></p></div><h3>Rozetler (${n}/${ROZET.length})</h3><div class="rozetler">`+ROZET.map(r=>`<div class="rozet ${S.rozet[r[0]]?`var`:``}"><div class="i">${r[2]}</div><b>${r[1]}</b><small>${r[3]}</small></div>`).join(``)+`</div><div class="kart"><h3>Ayarlar</h3><button class="btn ikincil" data-a="yazi">Arapça yazı boyutu</button><button class="btn ikincil" data-a="tema">Koyu/açık tema</button><button class="btn sol" data-a="sifirla">İlerlemeyi sıfırla</button></div>`}

/* ---------- ÇİZİM ve OLAYLAR ---------- */
function ciz(){sekmeler();ust();const m={yol:vYol,ders:vDers,atolye:vAtolye,vaka:vVaka,kart:vKart,sinav:vSinav,sozluk:vSozluk,ben:vBen};$(`#ana`).innerHTML=m[T]();}
function git(t){T=t;if(t!==`ders`)R.ders=null;if(t!==`kart`)R.kart=null;if(t===`atolye`||t===`sinav`){if(R.oyun&&((t===`atolye`)===!!R.oyun.sinav))R.oyun=null}ciz();yukari()}
document.addEventListener(`click`,e=>{
 const t=e.target.closest(`[data-a]`);if(!t)return;const a=t.dataset.a,v=t.dataset.v;
 if(t.tagName===`A`)e.preventDefault();
 switch(a){
 case `git`:R.oyun=null;git(v);return;
 case `tema`:S.tema=document.documentElement.dataset.theme===`dark`?`light`:`dark`;kaydet();tema();return;
 case `yazi`:S.yazi=(S.yazi+1)%4;kaydet();ust();return;
 case `ders`:T=`ders`;R.ders=+v;R.kart=null;ciz();yukari();return;
 case `dersler`:R.ders=null;ciz();yukari();return;
 case `kc`:{const [d,i,j]=v.split(`:`).map(Number);R.kc=R.kc||{};R.kc[d]=R.kc[d]||{};if(R.kc[d][i]===undefined){R.kc[d][i]=j;const ok=DERS.find(x=>x.id===d).kontrol[i].d===j;if(ok){S.say++;xpEkle(5,null)}else{S.yanlis[d]=(S.yanlis[d]||0)+1;kaydet()}}const y=window.scrollY;ciz();window.scrollTo(0,y);return}
 case `bitir`:S.bitti[+v]=1;xpEkle(25,`ders`);konfeti();toast(`Ders tamam! +25 XP`);ciz();yukari();return;
 case `oyun`:oyunBasla(v);ciz();yukari();return;
 case `gunluk`:oyunBasla(`gunluk`);T=`atolye`;ciz();yukari();return;
 case `oyunSec`:oyunSec(+v);ciz();return;
 case `oyunIleri`:{const o=R.oyun;o.i++;o.sec=null;if(o.i>=o.it.length)oyunBitir();ciz();yukari();return}
 case `oyunTekrar`:oyunBasla(v);ciz();yukari();return;
 case `sinavBasla`:oyunBasla(`sinav`);T=`sinav`;ciz();yukari();return;
 case `oyunCik`:R.oyun=null;ciz();yukari();return;
 case `elSol`:if(R.oyun.eslesen[+v]===undefined){R.oyun.secL=+v;ciz()}return;
 case `elSag`:elSag(+v);ciz();return;
 case `siraSec`:{const o=R.oyun;if(!o.kont&&!o.yan.includes(+v)){o.yan.push(+v);ciz()}return}
 case `siraSifir`:R.oyun.yan=[];R.oyun.kont=false;ciz();return;
 case `siraKont`:{const o=R.oyun;o.kont=true;const dg=o.yan.every((x,k)=>x===k);if(dg){S.say+=o.yan.length;const b=S.oyun.sirala||{en:0,n:0};b.en=100;b.n++;S.oyun.sirala=b;xpEkle(30,`oyun`);konfeti()}else{xpEkle(5,`oyun`)}ciz();return}
 case `vakaAc`:T=`vaka`;R.vaka={id:v,i:-1,puan:0,s:null,perm:[]};ciz();yukari();return;
 case `vakaCik`:R.vaka=null;ciz();yukari();return;
 case `vakaBasla`:R.vaka.i=0;vakaAdim();ciz();yukari();return;
 case `vakaSec`:{const r=R.vaka;if(r.s!==null)return;r.s=+v;const x=VAKA.find(y=>y.id===r.id);if(x.adim[r.i].o[+v][1]){r.puan++;S.say++}kaydet();ciz();return}
 case `vakaIleri`:{const r=R.vaka;r.i++;const x=VAKA.find(y=>y.id===r.id);if(r.i>=x.adim.length){S.vaka[r.id]=Math.max(S.vaka[r.id]||0,r.puan);xpEkle(r.puan*10+15,null);if(r.puan===x.adim.length)konfeti()}else vakaAdim();ciz();yukari();return}
 case `kartAc`:R.kart.acik=!R.kart.acik;ciz();return;
 case `kartPuan`:{const kt=R.kart,id=kt.set[kt.i],s=S.kart[id]||{k:0,d:0};s.k=+v===2?Math.min(5,s.k+1):+v===1?s.k:0;s.d=gunNo()+INT[s.k];S.kart[id]=s;S.tekr++;xpEkle(3,`kart`);kt.i++;kt.acik=false;ciz();return}
 case `kartYeni`:R.kart=null;ciz();return;
 case `sifirla`:if(confirm(`Tüm ilerleme silinsin mi?`)){S=JSON.parse(JSON.stringify(VARS));kaydet();R={};T=`yol`;tema();ciz()}return}
});
document.addEventListener(`input`,e=>{if(e.target.id===`sara`){R.sq=e.target.value;const p=e.target.selectionStart;ciz();const n=$(`#sara`);n.focus();n.setSelectionRange(p,p)}});
tema();gunYenile();ciz();
