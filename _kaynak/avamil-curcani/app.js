(function(){
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const toAr = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
const HAR = /[ً-ٰٟ]/g;
const strip = s => String(s).replace(HAR, "");
const norm = s => strip(s).replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه");
const normTr = s => String(s).toLocaleLowerCase("tr").replace(/[âä]/g,"a").replace(/[îı]/g,"i").replace(/[ûü]/g,"u").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ç/g,"c").replace(/ğ/g,"g").replace(/['’`]/g,"");
const today = () => new Date().toISOString().slice(0,10);

/* ---------- düz liste ---------- */
const ALL = []; const BY = {}; const STB = {};
STATIONS.forEach((st, si) => { st.idx = si; STB[st.id] = st; st.items.forEach((it, ii) => { const rec = {id: st.id+"_"+ii, no: ALL.length+1, st, it, ii}; it.rec = rec; ALL.push(rec); BY[rec.id] = rec; }); });
const amelOf = rec => rec.st.amel;

/* ---------- durum ---------- */
const KEY = "yuz-amil-v1";
const DEF = {xp:0, learned:{}, best:{}, test:{}, plays:0, perfect:0, labUses:0, climbed:false, streak:{n:0, last:""}, sound:true, theme:"", seen:{}};
let S = JSON.parse(JSON.stringify(DEF));
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch(e){}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} };

function toast(msg){ const t=$("#toast"); t.textContent=msg; t.hidden=false; clearTimeout(toast.t); toast.t=setTimeout(()=>t.hidden=true, 2300); }
function bumpStreak(){
  const d = today(); if (S.streak.last === d) return;
  const y = new Date(Date.now()-864e5).toISOString().slice(0,10);
  S.streak.n = S.streak.last === y ? S.streak.n + 1 : 1; S.streak.last = d;
}
function addXp(n, from){
  S.xp += n; bumpStreak(); save(); hud();
  if (from && from.getBoundingClientRect){ const r = from.getBoundingClientRect(); const f = document.createElement("div"); f.className="xpfly"; f.textContent="+"+n; f.style.left=(r.left+r.width/2-14)+"px"; f.style.top=(r.top-6)+"px"; document.body.appendChild(f); setTimeout(()=>f.remove(), 1000); }
  checkBadges();
}
const level = () => 1 + Math.floor(S.xp/150);
function hud(){ $("#hudXp").textContent = "★ " + S.xp + " · Sv " + level(); $("#hudStreak").textContent = "🔥 " + (S.streak.last===today() || S.streak.last===new Date(Date.now()-864e5).toISOString().slice(0,10) ? S.streak.n : 0); }

/* ---------- ses ---------- */
let AC = null;
function beep(kind){
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const seq = kind==="good" ? [660, 880] : kind==="bad" ? [220, 170] : [523, 659, 784, 1046];
    seq.forEach((f, i) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = kind==="bad" ? "square" : "sine"; o.frequency.value = f; g.gain.setValueAtTime(.0001, AC.currentTime + i*.09); g.gain.exponentialRampToValueAtTime(.12, AC.currentTime + i*.09 + .02); g.gain.exponentialRampToValueAtTime(.0001, AC.currentTime + i*.09 + .16); o.connect(g).connect(AC.destination); o.start(AC.currentTime + i*.09); o.stop(AC.currentTime + i*.09 + .18); });
  } catch(e){}
}
function confetti(){
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = $("#confetti"), x = c.getContext("2d"); c.hidden = false; c.width = innerWidth; c.height = innerHeight;
  const cols = ["#6a3fb5","#e8594a","#1f9d78","#e6a417","#2f64d6"];
  const P = Array.from({length:120}, () => ({x: innerWidth/2, y: innerHeight/3, vx:(Math.random()-.5)*12, vy:Math.random()*-10-3, s:4+Math.random()*5, c:pick(cols), r:Math.random()*6}));
  let t = 0; (function f(){ x.clearRect(0,0,c.width,c.height); P.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += .2; x.save(); x.translate(p.x,p.y); x.rotate(p.r); x.fillStyle=p.c; x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6); x.restore(); }); if (++t < 90) requestAnimationFrame(f); else c.hidden = true; })();
}
function speak(t){ sesPlay(t, null, toast); }

/* ---------- ayarlar ---------- */
function applyTheme(){ if (S.theme) document.documentElement.setAttribute("data-theme", S.theme); else document.documentElement.removeAttribute("data-theme"); $("#tSound").setAttribute("aria-pressed", S.sound); }
$("#tTheme").onclick = () => { const dark = S.theme ? S.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches; S.theme = dark ? "light" : "dark"; save(); applyTheme(); };
$("#tSound").onclick = () => { S.sound = !S.sound; save(); applyTheme(); toast(S.sound ? "Ses açık" : "Ses kapalı"); };

/* ---------- vurgulama ---------- */
function ranges(s, a, m){
  const R = []; let ptr = 0;
  if (a){ let i = s.indexOf(a); while (i > -1){ const ws = s.lastIndexOf(" ", i-1) + 1; if (i - ws <= 2){ R.push({s:i, e:i+a.length, k:"a"}); ptr = i + a.length; break; } i = s.indexOf(a, i+1); } }
  (m||[]).forEach(w => { let i = s.indexOf(w, ptr); if (i < 0) i = s.indexOf(w); if (i < 0) return; if (R.some(r => r.k==="a" && i < r.e && i + w.length > r.s)){ const j = s.indexOf(w, i+1); if (j < 0) return; i = j; } R.push({s:i, e:i+w.length, k:"m"}); ptr = i + w.length; });
  return R.sort((x,y)=>x.s-y.s);
}
function hl(s, a, m){
  const R = ranges(s, a, m); let out = "", c = 0;
  R.forEach(r => { if (r.s < c) return; out += esc(s.slice(c, r.s)) + `<span class="${r.k==="a"?"am":"mm"}">${esc(s.slice(r.s, r.e))}</span>`; c = r.e; });
  return out + esc(s.slice(c));
}
function exHTML(e){
  return `<div class="ex"><div class="s">${hl(e.s, e.a, e.m)} <button class="say" data-say="${esc(strip(e.s))}" aria-label="Sesli oku">🔊</button></div><div class="t">${esc(e.t)}${e.q?`<span class="q">${esc(e.q)}</span>`:""}</div></div>`;
}
const stStyle = st => `--h:${st.h}`;
const stars = st => {
  const n = st.items.filter(it => S.learned[it.rec.id]).length;
  const k = (n >= Math.ceil(st.items.length/2) ? 1 : 0) + (n === st.items.length ? 1 : 0) + (S.test[st.id] ? 1 : 0);
  return {k, n, html:`<span class="stars" aria-label="${k} yıldız">${[0,1,2].map(i => i<k ? "★" : `<span class="off">★</span>`).join("")}</span>`};
};

/* ===================== YÖNLENDİRME ===================== */
let VIEW = "harita", CUR = "s1";
function go(v, id){
  if (STB[v]){ id = v; v = "istasyon"; }
  if (BY[v]){ const r = BY[v]; id = r.st.id; v = "istasyon"; setTimeout(()=>openItem(r.id), 30); }
  if (!["harita","istasyon","oyun","atolye","ozet","program"].includes(v)) v = "harita";
  VIEW = v; if (v==="istasyon" && id) CUR = id;
  ["harita","istasyon","oyun","atolye","ozet","program"].forEach(x => $("#v-"+x).hidden = x!==v);
  $$(".nav button").forEach(b => b.setAttribute("aria-current", b.dataset.view===v ? "page" : "false"));
  ({harita:renderMap, istasyon:renderStation, oyun:renderHub, atolye:renderLab, ozet:renderTable, program:()=>{}})[v]();
  try { history.replaceState(null, "", "#" + (v==="istasyon" ? CUR : v)); } catch(e){}
  scrollTo({top:0});
}
$$(".nav button").forEach(b => b.onclick = () => go(b.dataset.view));
document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]"); if (g){ e.preventDefault(); closeSheet(); go(g.dataset.go, g.dataset.id); return; }
  const it = e.target.closest("[data-item]"); if (it){ openItem(it.dataset.item); return; }
  const sy = e.target.closest("[data-say]"); if (sy){ e.stopPropagation(); speak(sy.dataset.say); }
});
addEventListener("hashchange", () => { const h = location.hash.slice(1); if (h && h !== (VIEW==="istasyon"?CUR:VIEW)) go(h); });

/* ===================== HARİTA ===================== */
function mapSVG(){
  const W = 820, H = 560, n = STATIONS.length, x0 = 50, y0 = 505, dx = (W-100)/(n-1), dy = (H-110)/(n-1);
  const P = STATIONS.map((s,i) => ({x: x0 + i*dx, y: y0 - i*dy}));
  let path = `M ${P[0].x} ${P[0].y}`; for (let i=1;i<n;i++) path += ` H ${P[i].x} V ${P[i].y}`;
  const next = STATIONS.find(s => stars(s).k < 2) || STATIONS[n-1];
  return `<svg class="map" viewBox="0 0 ${W} ${H}" role="img" aria-label="Yüz âmil yolculuk haritası: 15 istasyon">
    <path d="${path}" fill="none" stroke="var(--line)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${path}" fill="none" stroke="var(--sun)" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
    ${STATIONS.map((s,i) => { const p = P[i], st = stars(s), cur = s===next;
      return `<g class="node st" style="${stStyle(s)}" data-go="istasyon" data-id="${s.id}" tabindex="0" role="button" aria-label="${i+1}. istasyon: ${esc(s.tr)}">
        <title>${i+1}. ${esc(s.tr)} — ${esc(s.sub)}</title>
        ${cur ? `<circle cx="${p.x}" cy="${p.y}" r="30" fill="none" stroke="var(--sun)" stroke-width="3" stroke-dasharray="5 4"><animateTransform attributeName="transform" type="rotate" from="0 ${p.x} ${p.y}" to="360 ${p.x} ${p.y}" dur="12s" repeatCount="indefinite"/></circle>` : ""}
        <circle class="b" cx="${p.x}" cy="${p.y}" r="22" style="fill:hsl(${s.h} var(--ss) var(--sl))"/>
        <text x="${p.x}" y="${p.y+6}" text-anchor="middle" font-size="17" fill="#fff">${i+1}</text>
        <text x="${p.x}" y="${p.y+40}" text-anchor="middle" font-size="13" fill="var(--sun)" letter-spacing="1">${"★".repeat(st.k)}<tspan fill="var(--line)">${"★".repeat(3-st.k)}</tspan></text>
      </g>`; }).join("")}
    <text x="${P[n-1].x}" y="${P[n-1].y-38}" text-anchor="middle" font-size="15" fill="var(--violet)">١٠٠</text>
  </svg>`;
}
const BADGES = [
  {id:"ilk", ico:"①", tr:"İlk adım", d:"İlk âmili öğren", ok:() => Object.keys(S.learned).length >= 1},
  {id:"cer", ico:"جـ", tr:"Cer ustası", d:"17 cer harfinin hepsi", ok:() => STB.s1.items.every(it => S.learned[it.rec.id])},
  {id:"yarim", ico:"٥٠", tr:"Yarı yol", d:"50 âmil öğren", ok:() => Object.keys(S.learned).length >= 50},
  {id:"yuz", ico:"١٠٠", tr:"Yüz âmil", d:"Hepsini öğren", ok:() => Object.keys(S.learned).length >= 100},
  {id:"oyuncu", ico:"▶", tr:"Oyuncu", d:"5 oyun bitir", ok:() => S.plays >= 5},
  {id:"kusursuz", ico:"✓", tr:"Kusursuz", d:"Bir oyunu hatasız bitir", ok:() => S.perfect >= 1},
  {id:"zirve", ico:"▲", tr:"Zirve", d:"Merdivenin tepesine çık", ok:() => S.climbed},
  {id:"lab", ico:"⚗", tr:"Laborant", d:"Laboratuvarda 10 dönüşüm", ok:() => S.labUses >= 10},
  {id:"seri", ico:"🔥", tr:"Üç gün seri", d:"3 gün üst üste çalış", ok:() => S.streak.n >= 3}
];
function checkBadges(){ S.badges = S.badges || {}; BADGES.forEach(b => { if (!S.badges[b.id] && b.ok()){ S.badges[b.id] = true; save(); toast("Rozet kazandın: " + b.tr); beep("win"); } }); }
function renderMap(){
  const L = Object.keys(S.learned).length, lv = level(), into = S.xp % 150;
  const next = STATIONS.find(s => stars(s).k < 2) || STATIONS[0];
  $("#v-harita").innerHTML = `
  <div class="hero">
    <div>
      <div class="arline">${BOOK.title}</div>
      <h1>Yüz âmili <em>oynayarak</em> öğren</h1>
      <p>Cürcânî'nin el-Avâmilü'l-Mie'si 15 istasyonluk bir merdiven: her basamakta âmilleri görsel şemalarla öğren, kitabın misallerini dinle, etkinlikleri çöz ve oyunlarla pekiştir.</p>
      <div class="row" style="margin-top:18px">
        <button class="btn coral" data-go="istasyon" data-id="${next.id}">${L ? "Devam et" : "Yolculuğa başla"}: ${next.idx+1}. istasyon →</button>
        <button class="btn ghost" data-go="oyun">Oyun salonu</button>
      </div>
    </div>
    <div class="card mapbox">${mapSVG()}</div>
  </div>
  <div class="stats">
    <div class="card stat"><span class="eyebrow">Öğrenilen</span><b>${L}<span class="muted small"> / 100</span></b><div class="bar"><i style="width:${L}%"></i></div></div>
    <div class="card stat"><span class="eyebrow">Seviye ${lv}</span><b>${S.xp}<span class="muted small"> puan</span></b><div class="bar"><i style="width:${into/150*100}%"></i></div></div>
    <div class="card stat"><span class="eyebrow">Yıldız</span><b>${STATIONS.reduce((a,s)=>a+stars(s).k,0)}<span class="muted small"> / 45</span></b><div class="bar"><i style="width:${STATIONS.reduce((a,s)=>a+stars(s).k,0)/45*100}%"></i></div></div>
    <div class="card stat"><span class="eyebrow">Seri</span><b>${S.streak.last===today()?S.streak.n:0}<span class="muted small"> gün</span></b><div class="small muted" style="margin-top:6px">Her gün biraz çalış, seri büyüsün.</div></div>
  </div>
  <div class="sec-h"><h2>İstasyonlar</h2><span class="muted small">★ yarısını öğren · ★★ hepsini öğren · ★★★ istasyon testini geç</span></div>
  <div class="stgrid">${STATIONS.map(s => { const st = stars(s); return `<button class="stcard st" style="${stStyle(s)}" data-go="istasyon" data-id="${s.id}">
      <span class="num">${s.idx+1}</span><span class="meta"><h3>${esc(s.tr)}</h3><span class="small muted">${esc(s.sub)}</span><br>${st.html} <span class="small muted">${st.n}/${s.items.length}</span></span></button>`; }).join("")}</div>
  <div class="sec-h"><h2>Yüz kutu</h2><span class="muted small">Her kutu bir âmil. Koyu olanlar öğrendiklerin.</span></div>
  <div class="card pad"><div class="hundred">${ALL.map(r => `<button class="st ${S.learned[r.id]?"on":""}" style="${stStyle(r.st)}" data-item="${r.id}" title="${r.no}. ${esc(strip(r.it.ar))} – ${esc(r.it.tr)}">${r.no}</button>`).join("")}</div></div>
  <div class="sec-h"><h2>Rozetler</h2></div>
  <div class="badges">${BADGES.map(b => `<div class="badge ${S.badges?.[b.id]?"on":""}"><span class="i">${b.ico}</span><span><b>${esc(b.tr)}</b><br>${esc(b.d)}</span></div>`).join("")}</div>
  <div class="sec-h"><h2>Kitap hakkında</h2></div>
  <div class="card pad"><p class="ar" style="margin:0 0 6px;color:var(--violet)">${BOOK.author}</p><p class="muted small" style="margin:0 0 10px">${esc(BOOK.authorTr)} · Tavdîh: ${esc(BOOK.date)}</p><p style="margin:0">${esc(BOOK.intro)}</p>
    <details style="margin-top:12px"><summary style="cursor:pointer;font-weight:600">Metnin hutbesi (Arapça ve Türkçe)</summary><p class="ar" style="font-size:1.35rem">${BOOK.khutba}</p><p class="muted">${esc(BOOK.khutbaTr)}</p></details></div>`;
  $$(".map .node").forEach(n => n.onkeydown = e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); go("istasyon", n.dataset.id); } });
}

/* ===================== İSTASYON ===================== */
function renderStation(){
  const s = STB[CUR] || STATIONS[0], st = stars(s), prev = STATIONS[s.idx-1], next = STATIONS[s.idx+1];
  const acts = ACTIVITIES.filter(a => a.st === s.id);
  $("#v-istasyon").innerHTML = `<div class="st" style="${stStyle(s)}">
    <div class="band">
      <div class="row" style="justify-content:space-between"><span class="eyebrow" style="color:#fff;opacity:.85">${s.idx+1}. istasyon · ${s.kind==="semai"?"Semâî":s.kind==="qiyasi"?"Kıyâsî":"Ma'nevî"} · ${s.items.length} âmil</span>${st.html.replace('class="stars"','class="stars" style="color:#fff"')}</div>
      <div class="ar">${s.ar}</div>
      <h1>${esc(s.tr)}</h1>
      <p style="margin:6px 0 16px;max-width:60ch;opacity:.92">${esc(s.trIntro)}</p>
      <div class="row"><button class="btn" style="background:#fff;color:hsl(${s.h} 60% 35%)" id="stTest">İstasyon testi (6 soru)</button>${acts.map(a=>`<button class="btn ghost" data-act="${a.id}">Etkinlik: ${esc(a.title)}</button>`).join("")}</div>
    </div>
    <div class="card matn" style="margin-top:16px"><span class="eyebrow">Metin</span><div class="ar">${s.matn}</div></div>
    <div class="sec-h"><h2>Şema</h2><span class="muted small">Kitaptaki ağaç şeması · bir dala dokun</span></div>
    <div class="card pad"><div class="tree"><div class="root">${s.ar}</div><div class="branches">${s.items.map(it => `<div class="leaf"><button data-item="${it.rec.id}">${esc(strip(it.ar))}${S.learned[it.rec.id]?" ✓":""}</button></div>`).join("")}</div></div></div>
    <div class="sec-h"><h2>Âmiller</h2><span class="muted small">${st.n} / ${s.items.length} öğrenildi</span></div>
    <div class="items">${s.items.map(it => `<button class="item" data-item="${it.rec.id}"><span class="n">${it.rec.no}</span>${S.learned[it.rec.id]?'<span class="ok">✓</span>':""}<span class="big">${it.ar}</span><span class="tr">${esc(it.tr)}</span><span class="sub">${esc(it.m[0].tr)}</span></button>`).join("")}</div>
    <div class="row" style="justify-content:space-between;margin-top:30px">
      ${prev?`<button class="btn ghost" data-go="istasyon" data-id="${prev.id}">← ${esc(prev.tr)}</button>`:"<span></span>"}
      ${next?`<button class="btn" data-go="istasyon" data-id="${next.id}">${esc(next.tr)} →</button>`:`<button class="btn coral" data-go="oyun">Oyun salonuna geç →</button>`}
    </div></div>`;
  $("#stTest").onclick = () => startTest(s);
  $$("[data-act]").forEach(b => b.onclick = () => startActivity(b.dataset.act));
}

/* ---------- âmil paneli ---------- */
let SHEET_ID = null;
function openItem(id){
  const r = BY[id]; if (!r) return; SHEET_ID = id; const it = r.it, s = r.st;
  const a = AMEL[amelOf(r)];
  const pr = ALL[r.no-2], nx = ALL[r.no];
  const learned = !!S.learned[id];
  $("#sheet").innerHTML = `<div class="sheet" id="sh"><div class="panel st" style="${stStyle(s)}" role="dialog" aria-modal="true" aria-label="${esc(it.tr)}">
    <div class="row" style="justify-content:space-between"><span class="tag c">${r.no}. âmil / 100 · ${esc(s.tr)}</span><button class="ib" id="shClose" aria-label="Kapat">✕</button></div>
    <div class="phead" style="margin-top:12px"><div><h2 style="font-size:1.8rem">${esc(it.tr)}</h2><div class="row" style="margin-top:8px"><span class="tag c">${esc(a.tr)}</span><span class="ar muted" style="font-size:1rem">${a.ar}</span></div></div>
      <div class="big">${it.ar} <button class="say" data-say="${esc(strip(it.ar))}" aria-label="Sesli oku">🔊</button></div></div>
    ${it.m.length > 1 ? `<div class="card pad" style="margin-top:16px"><span class="eyebrow">Manaları · ${it.m.length}</span><div class="tree"><div class="root">${it.ar}</div><div class="branches">${it.m.map((m,i)=>`<div class="leaf"><button data-jump="${i}">${m.ar}</button></div>`).join("")}</div></div></div>` : ""}
    ${it.m.map((m,i) => `<div class="card meaning" id="mn${i}"><div class="mh"><span class="ar">${m.ar}</span><span class="tag c">${esc(m.tr)}</span></div>${m.ex.map(exHTML).join("")}</div>`).join("")}
    <div class="row" style="justify-content:space-between;margin-top:18px">
      <button class="btn ${learned?"ghost":"mint"}" id="shLearn">${learned?"✓ Öğrenildi":"Öğrendim (+10)"}</button>
      <div class="row">${pr?`<button class="btn ghost sm" data-item="${pr.id}">← ${esc(strip(pr.it.ar))}</button>`:""}${nx?`<button class="btn ghost sm" data-item="${nx.id}">${esc(strip(nx.it.ar))} →</button>`:""}</div>
    </div>
    <p class="small muted" style="margin-top:14px"><span class="am">Kırmızı</span> âmil, <span class="mm">mavi altı çizili</span> ma'mûl. 🔊 ile cümleyi dinle.</p>
  </div></div>`;
  $("#sh").onclick = e => { if (e.target.id === "sh") closeSheet(); };
  $("#shClose").onclick = closeSheet;
  $$("[data-jump]").forEach(b => b.onclick = () => $("#mn"+b.dataset.jump).scrollIntoView({behavior:"smooth", block:"start"}));
  $("#shLearn").onclick = e => { if (S.learned[id]){ delete S.learned[id]; save(); openItem(id); refresh(); return; } S.learned[id] = true; addXp(10, e.currentTarget); beep("good"); openItem(id); refresh(); if (stars(s).k===2 && s.items.every(x=>S.learned[x.rec.id])) { confetti(); toast(s.tr + ": hepsini öğrendin! ★★"); } };
  $("#shClose").focus();
}
function closeSheet(){ if (SHEET_ID){ SHEET_ID = null; $("#sheet").innerHTML = ""; } }
function refresh(){ if (VIEW==="istasyon") { const y = scrollY; renderStation(); scrollTo(0,y); } else if (VIEW==="harita") { const y = scrollY; renderMap(); scrollTo(0,y); } }
addEventListener("keydown", e => {
  if (e.key === "Escape") closeSheet();
  if (SHEET_ID && (e.key === "ArrowRight" || e.key === "ArrowLeft")){ const r = BY[SHEET_ID]; const n = ALL[r.no - 1 + (e.key==="ArrowRight"?1:-1)]; if (n) openItem(n.id); }
});

/* ===================== SORU ÜRETİCİLER ===================== */
const amelKeys = [...new Set(ALL.map(amelOf))];
function qAmel(r){ const right = AMEL[amelOf(r)].tr; return {p:`<span class="eyebrow">Ne amel eder?</span><div class="big">${r.it.ar}</div>`, o:shuffle([right, ...shuffle(amelKeys.map(k=>AMEL[k].tr).filter(x=>x!==right)).slice(0,3)]), a:right, why:`${r.it.tr}: ${right}.`, r}; }
function qStation(r){ const right = r.st.tr; return {p:`<span class="eyebrow">Hangi gruptan?</span><div class="big">${r.it.ar}</div>`, o:shuffle([right, ...shuffle(STATIONS.map(s=>s.tr).filter(x=>x!==right)).slice(0,3)]), a:right, why:`${r.it.tr} → ${right} (${r.st.idx+1}. istasyon).`, r}; }
function qMeaning(r){ const m = pick(r.it.m); const right = m.tr; const pool = ALL.filter(x=>x!==r).flatMap(x=>x.it.m.map(y=>y.tr)).filter(t=>t!==right && !r.it.m.some(z=>z.tr===t)); return {p:`<span class="eyebrow">Manası / işlevi hangisi?</span><div class="big">${r.it.ar}</div>`, o:shuffle([right, ...shuffle([...new Set(pool)]).slice(0,3)]), a:right, why:`${r.it.tr}: ${right}`, r}; }
function qUse(r){ if (r.it.m.length < 2) return null; const mi = Math.floor(Math.random()*r.it.m.length), m = r.it.m[mi], e = pick(m.ex); const opts = shuffle(r.it.m.map(x=>x.ar)).slice(0,4); if (!opts.includes(m.ar)) opts[0] = m.ar; return {p:`<span class="eyebrow">Bu cümlede «${esc(strip(r.it.ar))}» hangi manada?</span><div class="s">${hl(e.s, e.a)}</div><div class="muted small">${esc(e.t)}</div>`, o:shuffle(opts), a:m.ar, ar:true, why:`${m.ar} — ${m.tr}`, r}; }
function qTrans(r){ const e = pick(r.it.m.flatMap(m=>m.ex)); const pool = ALL.flatMap(x=>x.it.m.flatMap(m=>m.ex.map(y=>y.t))).filter(t=>t!==e.t); return {p:`<span class="eyebrow">Türkçe anlamı hangisi?</span><div class="s">${hl(e.s, e.a, e.m)}</div>`, o:shuffle([e.t, ...shuffle([...new Set(pool)]).slice(0,3)]), a:e.t, why:e.t, r}; }
function qFind(r){
  const exs = r.it.m.flatMap(m=>m.ex).filter(e => e.a && e.s.split(" ").length >= 2); if (!exs.length) return null;
  const e = pick(exs); const R = ranges(e.s, e.a).filter(x=>x.k==="a"); if (!R.length) return null;
  const w = []; let p = 0; e.s.split(" ").forEach(t => { w.push({t, s:p, e:p+t.length}); p += t.length + 1; });
  const right = w.map((x,i)=> x.s < R[0].e && x.e > R[0].s ? i : -1).filter(i=>i>-1);
  return {tok:true, p:`<span class="eyebrow">Âmil hangi kelimede?</span><div class="muted small">${esc(e.t)}</div>`, w:w.map(x=>x.t), a:right, why:`Âmil: ${strip(e.a)} (${r.it.tr})`, r};
}
const GEN = [qAmel, qStation, qMeaning, qUse, qTrans, qFind];
function mixed(pool, n){ const out = []; let g = 0; while (out.length < n && g++ < 300){ const q = pick(GEN)(pick(pool)); if (q) out.push(q); } return out; }

/* ===================== OYUN MOTORU (çoktan seçmeli / kelime seçmeli) ===================== */
let RUN = null;
function runQuiz(cfg){
  RUN = Object.assign({i:0, score:0, wrong:[], lock:false}, cfg); go("oyun"); drawQ();
}
function drawQ(){
  const R = RUN, v = $("#v-oyun");
  if (R.timer && !R.t0) { R.t0 = Date.now(); R.iv = setInterval(() => { const left = Math.max(0, R.timer - Math.floor((Date.now()-R.t0)/1000)); const el = $("#gTimer"); if (el) el.textContent = left + " sn"; if (!left){ clearInterval(R.iv); finish(); } }, 250); }
  if (R.mode === "stairs" ? R.step >= R.top : (!R.timer && R.i >= R.qs.length)) return finish();
  if (R.timer && R.i >= R.qs.length) R.qs.push(...R.gen(10));
  const q = R.qs[R.i];
  const head = `<div class="ghead"><div><span class="eyebrow">${esc(R.kicker||"Oyun")}</span><h2>${esc(R.title)}</h2></div>
    <div class="row">${R.timer?`<span class="timer" id="gTimer">${R.timer} sn</span>`:""}<span class="chip xp">✓ ${R.score}</span><button class="btn ghost sm" id="gQuit">Bitir</button></div></div>
    ${R.mode==="stairs" ? `<div class="stairs" aria-label="Merdiven: ${R.step}/${R.top}">${Array.from({length:R.top},(_,i)=>`<div class="${i<R.step?"on":""} ${i===R.step-1||(R.step===0&&i===0)?"me":""}" style="height:${(i+1)/R.top*100}%"></div>`).join("")}</div>`
      : R.timer ? "" : `<div class="row" style="margin-bottom:12px"><div class="prog"><i style="width:${R.i/R.qs.length*100}%"></i></div><span class="small muted">${R.i+1} / ${R.qs.length}</span></div>`}`;
  let body;
  if (q.tok) body = `<div class="card qbox">${q.p}<div class="toks" style="margin-top:14px">${q.w.map((w,i)=>`<button data-t="${i}">${esc(w)}</button>`).join("")}</div><div id="fb"></div></div>`;
  else if (q.bucket) body = `<div class="card qbox">${q.p}<div class="buckets">${q.o.map((b,i)=>`<button class="bucket st" style="--h:${b.h}" data-o="${i}">${esc(b.tr)}</button>`).join("")}</div><div id="fb"></div></div>`;
  else body = `<div class="card qbox">${q.p}<div class="opts">${q.o.map((o,i)=>`<button class="opt ${q.ar?"ar":""}" data-o="${i}">${esc(o)}</button>`).join("")}</div><div id="fb"></div></div>`;
  v.innerHTML = `<div class="stage">${head}${body}<div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn" id="gNext" hidden>Devam →</button></div></div>`;
  $("#gQuit").onclick = finish;
  const answer = (ok, el) => {
    if (R.lock) return; R.lock = true;
    if (ok){ R.score++; beep("good"); addXp(R.xp||5, el); if (R.mode==="stairs") R.step++; }
    else { beep("bad"); R.wrong.push(q); if (R.mode==="stairs") R.step = Math.max(0, R.step-1); }
    const fb = $("#fb"); fb.className = "fb " + (ok?"good":"bad"); fb.innerHTML = `${ok?"Doğru!":"Olmadı."} <span class="${q.whyAr?"ar":""}">${esc(q.why||"")}</span> ${q.r?`<button class="btn ghost sm" data-item="${q.r.id}" style="margin-inline-start:8px">Âmile bak</button>`:""}`;
    if (R.timer){ setTimeout(() => { R.i++; R.lock = false; drawQ(); }, ok ? 450 : 1100); }
    else { const n = $("#gNext"); n.hidden = false; n.focus(); }
  };
  $$("[data-o]").forEach(b => b.onclick = () => {
    if (R.lock) return; const i = +b.dataset.o; const ok = q.bucket ? q.o[i].k === q.a : q.o[i] === q.a;
    $$("[data-o]").forEach(x => { x.disabled = true; const val = q.bucket ? q.o[+x.dataset.o].k : q.o[+x.dataset.o]; if (val === q.a) x.classList.add("good"); });
    if (!ok) b.classList.add("bad"); answer(ok, b);
  });
  $$("[data-t]").forEach(b => b.onclick = () => {
    if (R.lock) return; const ok = q.a.includes(+b.dataset.t);
    $$("[data-t]").forEach(x => { x.disabled = true; if (q.a.includes(+x.dataset.t)) x.classList.add("good"); });
    if (!ok) b.classList.add("bad"); answer(ok, b);
  });
  $("#gNext").onclick = () => { R.i++; R.lock = false; if (R.mode==="stairs" && R.i >= R.qs.length) R.qs.push(...R.gen(10)); drawQ(); };
}
function finish(){
  const R = RUN; if (!R || R.done) return; R.done = true; clearInterval(R.iv);
  const total = R.timer ? R.i : (R.mode==="stairs" ? R.i : R.qs.length);
  const perfect = !R.wrong.length && total > 0 && (R.mode!=="stairs" || R.step>=R.top);
  S.plays++; if (perfect) S.perfect++;
  if (R.mode==="stairs" && R.step >= R.top) S.climbed = true;
  if (R.key){ S.best[R.key] = Math.max(S.best[R.key]||0, R.score); }
  if (R.onDone) R.onDone(R);
  save(); checkBadges(); hud();
  if (perfect || (R.mode==="stairs" && R.step>=R.top)) { confetti(); beep("win"); }
  const wrongIds = [...new Set(R.wrong.filter(q=>q.r).map(q=>q.r.id))];
  $("#v-oyun").innerHTML = `<div class="stage"><div class="card done-box">
    <span class="eyebrow">${esc(R.title)}</span>
    <div class="score">${R.mode==="stairs" ? (R.step>=R.top ? "Zirve!" : R.step+" / "+R.top) : R.score + (R.timer ? "" : " / "+total)}</div>
    <p>${R.mode==="stairs" ? (R.step>=R.top ? "Merdivenin tepesine çıktın." : "Biraz daha! Yanlış cevap seni bir basamak indirir.") : R.timer ? `${R.timer} saniyede ${R.score} doğru.` : perfect ? "Hatasız! Harika iş." : "Yanlışlarını tekrar etmek için aşağıdaki âmillere dokun."}</p>
    ${R.best!==false && R.key ? `<p class="small muted">En iyi skorun: ${S.best[R.key]}</p>`:""}
    ${wrongIds.length?`<div class="chips" style="margin:10px 0">${wrongIds.map(id=>`<button data-item="${id}"><span class="ar">${esc(strip(BY[id].it.ar))}</span> ${esc(BY[id].it.tr)}</button>`).join("")}</div>`:""}
    <div class="row" style="justify-content:center;margin-top:16px"><button class="btn coral" id="gAgain">Tekrar oyna</button>${R.back?`<button class="btn ghost" data-go="${R.back[0]}" data-id="${R.back[1]||""}">${esc(R.back[2])}</button>`:""}<button class="btn ghost" data-go="oyun">Oyun salonu</button></div>
  </div></div>`;
  $("#gAgain").onclick = () => R.again();
  RUN = null;
}

/* ===================== OYUN SALONU ===================== */
const GAMES = [
  {id:"merdiven", c:"var(--violet)", tr:"Merdiven", d:"Doğru cevap bir basamak çıkarır, yanlış bir basamak indirir. 12 basamağı tırman.", ico:'<path d="M3 20h4v-4h4v-4h4V8h4V4"/>'},
  {id:"hafiza", c:"var(--coral)", tr:"Hafıza Kartları", d:"Kartları çevir, âmili manasıyla eşleştir.", ico:'<rect x="3" y="4" width="8" height="12" rx="2"/><rect x="13" y="8" width="8" height="12" rx="2"/>'},
  {id:"kova", c:"var(--mint)", tr:"Kovaya At", d:"45 saniye: gelen âmili doğru amel kovasına at.", ico:'<path d="M4 7h16l-2 13H6z"/><path d="M9 7V4h6v3"/>'},
  {id:"hareke", c:"var(--sun)", tr:"Harekeyi Koy", d:"Âmilin etkisini gör: kelimenin doğru son harekesini seç.", ico:'<path d="M5 19c4-1 10-1 14 0"/><path d="M12 5v8"/><circle cx="12" cy="4" r="1"/>'},
  {id:"avci", c:"#2f64d6", tr:"Âmil Avcısı", d:"60 saniye: cümledeki âmile dokun.", ico:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'},
  {id:"mana", c:"#a03fb5", tr:"Mana Dedektifi", d:"Bâ, min, fî, lâm… bu cümlede hangi manada?", ico:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>'}
];
function renderHub(){
  if (RUN && !RUN.done) { drawQ(); return; }
  $("#v-oyun").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Oyun salonu</span><h2>Oyna, pekiştir, puan topla</h2></div><span class="muted small">Doğru cevap: +5 puan</span></div>
   <div class="hub">${GAMES.map(g => `<button class="gcard" data-game="${g.id}"><span class="ico" style="background:${g.c}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g.ico}</svg></span><h3>${g.tr}</h3><span class="muted small">${g.d}</span>${S.best[g.id]?`<span class="chip best">En iyi ${S.best[g.id]}</span>`:""}</button>`).join("")}</div>
   <div class="sec-h"><h2>Kapsam</h2><span class="muted small">Oyunlarda hangi istasyonlar kullanılsın?</span></div>
   <div class="card pad"><div class="chips" id="scope">${STATIONS.map(s=>`<button aria-pressed="${!(S.off||{})[s.id]}" data-sc="${s.id}">${s.idx+1}. ${esc(s.tr)}</button>`).join("")}</div>
   <div class="row" style="justify-content:center;margin-top:10px"><button class="btn ghost sm" id="scAll">Hepsi</button><button class="btn ghost sm" id="scLearned">Sadece öğrendiklerim</button></div></div>`;
  $$("[data-game]").forEach(b => b.onclick = () => startGame(b.dataset.game));
  $$("[data-sc]").forEach(b => b.onclick = () => { S.off = S.off||{}; S.off[b.dataset.sc] = !S.off[b.dataset.sc]; save(); b.setAttribute("aria-pressed", !S.off[b.dataset.sc]); });
  $("#scAll").onclick = () => { S.off = {}; S.onlyLearned = false; save(); renderHub(); toast("Bütün istasyonlar seçildi"); };
  $("#scLearned").onclick = () => { S.onlyLearned = !S.onlyLearned; save(); toast(S.onlyLearned ? "Sadece öğrendiğin âmiller sorulacak" : "Bütün âmiller sorulacak"); };
}
function pool(){ let p = ALL.filter(r => !(S.off||{})[r.st.id]); if (S.onlyLearned){ const l = p.filter(r=>S.learned[r.id]); if (l.length >= 6) p = l; else toast("Henüz 6 âmil öğrenmedin; tüm kapsam kullanılıyor."); } return p.length ? p : ALL; }
const BUCKETS = [
  {k:"jar", tr:"Cer eder", h:352},{k:"in", tr:"İsim nasb · haber ref'", h:24},{k:"ls", tr:"İsim ref' · haber nasb", h:285},
  {k:"ism", tr:"Tek ismi nasb", h:96},{k:"nasb", tr:"Muzâriyi nasb", h:150},{k:"jazm", tr:"Muzâriyi cezm", h:190},{k:"qul", tr:"İki ismi nasb", h:205}
];
const bucketOf = r => { const a = amelOf(r); return a==="tam" ? "ism" : a; };
function startGame(id){
  const P = pool();
  if (id === "merdiven"){ const gen = n => mixed(P, n); runQuiz({key:id, title:"Merdiven", kicker:"Tırmanış", mode:"stairs", step:0, top:12, qs:gen(14), gen, again:()=>startGame(id)}); }
  if (id === "kova"){ const B = P.filter(r => BUCKETS.some(b=>b.k===bucketOf(r))); const gen = n => shuffle(B).slice(0,n).map(r => ({bucket:true, p:`<span class="eyebrow">Hangi kovaya?</span><div class="big">${r.it.ar}</div><div class="muted small">${esc(r.it.tr)}</div>`, o:BUCKETS, a:bucketOf(r), why:`${r.it.tr}: ${AMEL[amelOf(r)].tr}`, r})); runQuiz({key:id, title:"Kovaya At", kicker:"45 saniye", timer:45, qs:gen(10), gen, xp:3, again:()=>startGame(id)}); }
  if (id === "hareke") runQuiz({key:id, title:"Harekeyi Koy", kicker:"İ'râb", qs:shuffle(HAREKE).slice(0,10).map(harekeQ), again:()=>startGame(id)});
  if (id === "avci"){ const gen = n => { const o=[]; let g=0; while (o.length<n && g++<200){ const q = qFind(pick(P)); if (q) o.push(q); } return o; }; runQuiz({key:id, title:"Âmil Avcısı", kicker:"60 saniye", timer:60, qs:gen(10), gen, xp:3, again:()=>startGame(id)}); }
  if (id === "mana"){ const M = ALL.filter(r => r.it.m.length > 1); runQuiz({key:id, title:"Mana Dedektifi", kicker:"Manalar", qs:Array.from({length:10}, () => qUse(pick(M))), again:()=>startGame(id)}); }
  if (id === "hafiza") memory();
}
function harekeQ(h){
  const w = h.w; let stem, end;
  const m = w.match(/([ً-ْ]+)(ا?)$/);
  if (m){ stem = w.slice(0, w.length - m[0].length); end = m[0]; } else { stem = w; end = ""; }
  if (end.includes("ّ")){ stem += "ّ"; end = end.replace("ّ",""); }
  const tanwin = /[ً-ٍ]/.test(end);
  const ta = /ة$/.test(strip(stem));
  const ends = tanwin ? ["ٌ", ta ? "ً" : "ًا", "ٍ"] : ["ُ","َ","ِ","ْ"];
  const opts = ends.map(e => stem + e);
  const right = opts.find(o => o === w) || w; if (!opts.includes(right)) opts[0] = right;
  const blanked = h.s.replace(w, `<span class="blank">${esc(strip(stem))}…</span>`);
  return {p:`<span class="eyebrow">Doğru son harekeyi seç</span><div class="s">${blanked.split(/(<span class="blank">.*?<\/span>)/).map(x=>x.startsWith("<span")?x:esc(x)).join("")}</div>`, o:shuffle(opts), a:right, ar:true, why:h.why};
}
function memory(){
  const P = shuffle(pool()).slice(0, 8);
  const cards = shuffle(P.flatMap(r => [{id:r.id, ar:true, t:r.it.ar}, {id:r.id, ar:false, t:r.it.m[0].tr}]));
  let open = [], found = 0, moves = 0, lock = false; const t0 = Date.now();
  go("oyun");
  $("#v-oyun").innerHTML = `<div class="stage"><div class="ghead"><div><span class="eyebrow">Eşleştir</span><h2>Hafıza Kartları</h2></div><div class="row"><span class="chip" id="mMoves">0 hamle</span><button class="btn ghost sm" data-go="oyun">Çık</button></div></div>
    <div class="mem">${cards.map((c,i)=>`<button class="mcard" data-m="${i}" aria-label="Kart ${i+1}"><span class="in"><span class="f">١٠٠</span><span class="b ${c.ar?"ar":""}">${c.ar?c.t:esc(c.t)}</span></span></button>`).join("")}</div>
    <p class="small muted" style="text-align:center;margin-top:14px">Arapça âmili, Türkçe manası/işleviyle eşleştir.</p></div>`;
  $$("[data-m]").forEach(b => b.onclick = () => {
    const i = +b.dataset.m; if (lock || b.classList.contains("flip") || b.classList.contains("done")) return;
    b.classList.add("flip"); open.push(i);
    if (open.length === 2){
      moves++; $("#mMoves").textContent = moves + " hamle"; const [x, y] = open; lock = true;
      if (cards[x].id === cards[y].id && cards[x].ar !== cards[y].ar){
        setTimeout(() => { [x,y].forEach(k => $(`[data-m="${k}"]`).classList.add("done")); open = []; lock = false; found++; beep("good"); addXp(5, b);
          if (found === P.length){ const sec = Math.round((Date.now()-t0)/1000); S.plays++; if (moves === P.length) S.perfect++; const sc = Math.max(1, 100 - (moves - P.length)*5 - Math.floor(sec/6)); S.best.hafiza = Math.max(S.best.hafiza||0, sc); save(); checkBadges(); confetti(); beep("win");
            $("#v-oyun").insertAdjacentHTML("beforeend", `<div class="stage"><div class="card done-box" style="margin-top:16px"><div class="score">${sc}</div><p>${moves} hamlede, ${sec} saniyede bitirdin.</p><div class="row" style="justify-content:center"><button class="btn coral" id="mAgain">Tekrar oyna</button><button class="btn ghost" data-go="oyun">Oyun salonu</button></div></div></div>`); $("#mAgain").onclick = memory; }
        }, 400);
      } else { beep("bad"); setTimeout(() => { [x,y].forEach(k => $(`[data-m="${k}"]`).classList.remove("flip")); open = []; lock = false; }, 900); }
    }
  });
}
function startTest(s){
  const P = s.items.map(it => it.rec);
  runQuiz({title: s.tr + " · İstasyon testi", kicker: (s.idx+1)+". istasyon", qs:mixed(P, 6), back:["istasyon", s.id, "İstasyona dön"],
    onDone: R => { if (R.score >= 5 && !S.test[s.id]){ S.test[s.id] = true; addXp(30); toast("Üçüncü yıldız kazandın! ★★★"); } },
    again: () => startTest(s)});
}

/* ===================== ETKİNLİKLER ===================== */
function startActivity(id){
  const A = ACTIVITIES.find(a => a.id === id); if (!A) return;
  let qs;
  if (A.type === "choose") qs = A.q.map(q => {
    const s = q.w ? hl(q.s, q.w) : esc(q.s).replace("____", '<span class="blank">؟</span>');
    return {p:`<span class="eyebrow">${A.ar}</span><div class="s">${s}</div>${q.t?`<div class="muted small">${esc(q.t)}</div>`:""}${A.bank?`<div class="small muted" style="margin-top:8px">Kitaptaki kelime bankası: <span class="ar" style="font-size:1.05rem">${A.bank}</span></div>`:""}`, o:q.o, a:q.o[q.a], ar:true, why:q.o[q.a] + (q.t?" — "+q.t:""), whyAr:false};
  });
  else qs = A.q.map((q, i) => ({p:`<span class="eyebrow">${A.ar}</span><div class="s">${esc(q[0])}</div><div class="muted small">Doğru dönüşümü seç</div>`, o:shuffle([q[1], ...A.wrong[i]]), a:q[1], ar:true, why:q[1]}));
  runQuiz({title:A.title, kicker:"Kitaptan etkinlik · s. "+A.page, qs: A.type==="transform" ? qs : shuffle(qs), back:["atolye","", "Atölyeye dön"], again:()=>startActivity(id)});
}

/* ===================== ATÖLYE: ÂMİL LABORATUVARI ===================== */
let LB = {s:0, a:1, last:null};
const END = {d:{raf:"ُ", nasb:"َ"}, dg:{raf:"ُ", nasb:"َ"}, n:{raf:"ٌ", nasb:"ًا"}, nt:{raf:"ٌ", nasb:"ً"}};
function renderLab(){
  const S0 = LAB_SENTENCES[LB.s], A = LAB_AMILS[LB.a];
  const fem = S0.mb[2] === "f";
  const amilWord = A.ar ? (fem && A.fem ? A.fem : A.ar) : "";
  const w = (x, c) => { const m = x[0].match(/^(.*?)(.[\u064B-\u0652]*)$/); return `${esc(m[1])}<span class="end ${c} ${LB.last!==null?"pop":""}">${esc(m[2] + END[x[1]][c])}</span>`; };
  $("#v-atolye").innerHTML = `
  <div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Atölye</span><h2>Âmil Laboratuvarı</h2></div><span class="muted small">Bir cümle ve bir âmil seç; son harekelerin nasıl değiştiğini izle.</span></div>
  <div class="card lab">
    <span class="eyebrow">1 · Cümle (mübtedâ + haber)</span>
    <div class="chips" style="margin:8px 0 16px">${LAB_SENTENCES.map((x,i)=>`<button aria-pressed="${i===LB.s}" data-ls="${i}"><span class="ar">${esc(x.mb[0])+END[x.mb[1]].raf} ${esc(x.kh[0])+END[x.kh[1]].raf}</span></button>`).join("")}</div>
    <span class="eyebrow">2 · Âmil</span>
    <div class="chips" style="margin:8px 0 6px">${LAB_AMILS.map((x,i)=>`<button aria-pressed="${i===LB.a}" data-la="${i}">${x.ar?`<span class="ar">${x.ar}</span> · `:""}${esc(x.tr)}</button>`).join("")}</div>
    <div class="sent">${amilWord?`<span class="amil">${amilWord}</span> `:""}${w(S0.mb, A.mb)} ${w(S0.kh, A.kh)}</div>
    <div class="legend"><span><i style="background:var(--raf)"></i>merfû' (ref')</span><span><i style="background:var(--nasb)"></i>mansûb (nasb)</span><span><i style="background:var(--coral)"></i>âmil</span></div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:18px">
      <div class="card pad" style="box-shadow:none"><span class="eyebrow">Mübtedâ şimdi</span><h3 style="margin-top:4px">${A.mb==="raf"?"Merfû'":"Mansûb"} <span class="muted small">(${A.ar ? (A.mb===A.kh && A.mb==="nasb" ? "1. mef'ûl" : A.mb==="nasb" ? "âmilin ismi" : "âmilin ismi") : "mübtedâ"})</span></h3></div>
      <div class="card pad" style="box-shadow:none"><span class="eyebrow">Haber şimdi</span><h3 style="margin-top:4px">${A.kh==="raf"?"Merfû'":"Mansûb"} <span class="muted small">(${A.ar ? (A.mb===A.kh && A.kh==="nasb" ? "2. mef'ûl" : "âmilin haberi") : "haber"})</span></h3></div>
      <div class="card pad" style="box-shadow:none"><span class="eyebrow">Kural</span><p style="margin:4px 0 0">${esc(A.note)}</p></div>
    </div>
    <p class="muted" style="text-align:center;margin:14px 0 0">${esc(S0.t)}</p>
  </div>
  <div class="sec-h"><h2>Kitaptan etkinlikler</h2><span class="muted small">Tavdîh'teki alıştırmalar, etkileşimli</span></div>
  <div class="hub">${ACTIVITIES.map(a => { const s = STB[a.st]; return `<button class="gcard st" style="${stStyle(s)}" data-act="${a.id}"><span class="tag c">${s.idx+1}. istasyon · s. ${a.page}</span><h3>${esc(a.title)}</h3><span class="ar" style="font-size:1.1rem;color:var(--c)">${a.ar}</span><span class="muted small">${esc(a.tr)} · ${a.q.length} soru</span></button>`; }).join("")}</div>`;
  $$("[data-ls]").forEach(b => b.onclick = () => { LB.s = +b.dataset.ls; LB.last = "s"; labUse(); renderLab(); });
  $$("[data-la]").forEach(b => b.onclick = () => { LB.a = +b.dataset.la; LB.last = "a"; labUse(); renderLab(); });
  $$("[data-act]").forEach(b => b.onclick = () => startActivity(b.dataset.act));
}
function labUse(){ S.labUses++; if (S.labUses % 5 === 0) addXp(5); else save(); checkBadges(); }

/* ===================== 100'LÜK TABLO ===================== */
let TQ = "";
function renderTable(){
  const f = r => !TQ || norm(r.it.ar).includes(norm(TQ)) || normTr(r.it.tr + " " + r.it.m.map(m=>m.tr).join(" ") + " " + r.st.tr).includes(normTr(TQ)) || r.it.m.some(m => norm(m.ar).includes(norm(TQ)));
  const rows = STATIONS.map(s => { const its = s.items.map(i=>i.rec).filter(f); if (!its.length) return ""; return `<tr class="grp st" style="${stStyle(s)}"><td colspan="5">${s.idx+1}. ${esc(s.tr)} <span class="ar" style="font-size:1rem;margin-inline-start:8px">${s.ar}</span></td></tr>` + its.map(r => { const m = r.it.m[0], e = m.ex[0]; return `<tr class="st" style="${stStyle(s)}"><td style="font-variant-numeric:tabular-nums;color:var(--muted)">${r.no}</td><td class="ar"><button class="btn ghost sm" data-item="${r.id}" style="font-family:var(--f-ar);font-size:1.15rem">${r.it.ar}</button></td><td>${esc(r.it.tr)}<div class="small muted">${r.it.m.map(x=>esc(x.tr)).join(" · ")}</div></td><td class="ar">${r.it.m.map(x=>x.ar).join("، ")}</td><td class="ar">${hl(e.s, e.a, e.m)}</td></tr>`; }).join(""); }).join("");
  $("#v-ozet").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Telhîs</span><h2>100 âmil tek tabloda</h2></div><input class="search" id="tq" type="search" placeholder="Ara: لن, cezm, istisnâ…" value="${esc(TQ)}" aria-label="Tabloda ara"></div>
   <div class="card tbl"><table><thead><tr><th>No</th><th>Âmil</th><th>Türkçe</th><th>Mana (kitaptan)</th><th>Misal</th></tr></thead><tbody>${rows || `<tr><td colspan="5" class="muted">“${esc(TQ)}” için sonuç yok.</td></tr>`}</tbody></table></div>`;
  const q = $("#tq"); q.oninput = () => { TQ = q.value; const p = q.selectionStart; renderTable(); const n = $("#tq"); n.focus(); n.setSelectionRange(p,p); };
}

/* ===================== BAŞLAT ===================== */
applyTheme(); hud(); checkBadges();
go((location.hash||"").slice(1) || "harita");
})();
