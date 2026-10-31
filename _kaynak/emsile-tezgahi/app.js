(function(){
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const strip = s => String(s).replace(/[ً-ْٰ]/g, "");
const uniq = a => [...new Set(a)];

/* ---------- durum ---------- */
const KEY = "emsile-tezgahi-v1";
let S = {mist:[], xp:0, best:{}, sound:true, theme:"", root:"نصر", bab:1, miz:true, pas:false, col:true, plays:0, v:2};
try { const raw = localStorage.getItem(KEY); if (raw){ const o = JSON.parse(raw); Object.assign(S, o); if (!o.v){ S.pas = false; S.v = 2; } } } catch(e){}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} };
const toast = m => { const t = $("#toast"); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(()=>t.hidden=true, 2200); };
const hud = () => $("#hudXp").textContent = "★ " + S.xp;
const addXp = n => { S.xp += n; save(); hud(); };
let AC;
function beep(k){ if (!S.sound) return; try { AC = AC || new (window.AudioContext||window.webkitAudioContext)(); const seq = k==="good"?[587,784]:k==="bad"?[200,150]:[523,659,784,1046]; seq.forEach((f,i)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type=k==="bad"?"triangle":"sine"; o.frequency.value=f; const t=AC.currentTime+i*.09; g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.13,t+.02); g.gain.exponentialRampToValueAtTime(.0001,t+.16); o.connect(g).connect(AC.destination); o.start(t); o.stop(t+.18); }); } catch(e){} }
function confetti(){ if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; const c=$("#cf"), x=c.getContext("2d"); c.hidden=false; c.width=innerWidth; c.height=innerHeight; const cols=[getComputedStyle(document.documentElement).getPropertyValue("--rf"),getComputedStyle(document.documentElement).getPropertyValue("--ra"),getComputedStyle(document.documentElement).getPropertyValue("--rl"),getComputedStyle(document.documentElement).getPropertyValue("--gold")]; const P=Array.from({length:110},()=>({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*12,vy:-Math.random()*10-3,s:4+Math.random()*5,c:pick(cols),r:Math.random()*6})); let t=0; (function f(){ x.clearRect(0,0,c.width,c.height); P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore();}); if(++t<90) requestAnimationFrame(f); else c.hidden=true; })(); }
function applyTheme(){ if (S.theme) document.documentElement.setAttribute("data-theme", S.theme); else document.documentElement.removeAttribute("data-theme"); $("#tSound").setAttribute("aria-pressed", S.sound); }
$("#tTheme").onclick = () => { const light = S.theme ? S.theme==="light" : matchMedia("(prefers-color-scheme: light)").matches; S.theme = light ? "dark" : "light"; save(); applyTheme(); };
$("#tSound").onclick = () => { S.sound = !S.sound; save(); applyTheme(); };

/* ---------- aktif kök ---------- */
let R;
let ROOTERR = "";
function setRoot(str, bab){
  const r = rootOf(str); const data = ROOTS.find(x => x.r === (r||[]).join("")), err = checkRoot(r);
  if (err && !data){   /* desteklenmeyen kök: çekim üretilmez, önceki kök kalır */
    ROOTERR = (str && str.trim() ? "“" + str.trim() + "” çekilemedi: " : "") + err + (R ? " Önceki kök gösteriliyor." : "");
    if (R) return; return setRoot("نصر", 1);
  }
  ROOTERR = "";
  R = {r: r, data: data || null, b: babOf(data ? data.b : (bab || S.bab || 1))};
  R.locked = !!(data && bab && bab !== data.b);
  R.err = "";
  S.root = R.r.join(""); S.bab = R.b.id; save();
}
setRoot(S.root, S.bab);
const W = t => S.col ? paint(t, R.r) : esc(fill(t, R.r));
const Z = t => paint(t, MIZAN);
const lz = () => !!(R.data && R.data.lz);
const lemma = (rt=R) => fill(mzStem(rt.b) + V.a, rt.r) + " " + fill("يَ" + muStem(rt.b) + V.u, rt.r);

/* Emsile-i Muhtelife öğeleri */
const KALIP = ["alet","merre","nev","tasgir","mensub","mubalaga","tafdil","tac1","tac2"];   /* kalıp örneği: sözlükte doğrulanmış kelime sayılmaz */
function muh(rt=R){
  return MUH.map((m, i) => {
    const o = {i, id:m.id, tr:m.tr, ar:m.ar, d:m.d, g:m.g, pre:"", x:[]};
    if (KALIP.includes(m.id)) o.kalip = true;
    o.mean = rt.data ? trCekD(rt.data)[m.id] : m.g;
    if (m.masdar){ if (rt.data){ o.txt = masdarOf(rt.data).join(" · "); } else { o.guess = masdarGuess(rt); o.gt = MASDAR_KALIP[rt.b.id]; o.note = "Sülâsîde masdar semâîdir: bu kök programın listesinde yok. Gösterilenler bâbın en yaygın kalıplarıdır (olası); gerçek masdarı sözlükten doğrula."; } return o; }
    o.t = m.t(rt.b);
    if (m.id === "fail" && rt.data && rt.data.sf){ o.txt = rt.data.sf; o.t = null; o.x = ["FَاAِLٌ"]; o.note = (rt.b.id === 5 ? "Kerume bâbında ism-i fâil yerine genellikle sıfat-ı müşebbehe kullanılır: " : "Bu fiilde öğrencinin daha sık karşılaşacağı biçim sıfat-ı müşebbehedir: ") + rt.data.sf + "."; }
    if (m.id === "mef" && rt.data && rt.data.lz){
      o.kalip = true;
      if (rt.data.mc){ o.t = "مَFْAُوLٌ " + rt.data.mc; o.mean = "Harf-i cerle kullanılır"; o.note = "Lâzım (geçişsiz) fiilin ism-i mef'ûlü harf-i cerle birlikte kullanılır: " + fill(o.t, rt.r) + "."; }
      else { o.mean = "Bu kök için örnek verilmedi"; o.note = "Lâzım (geçişsiz) fiilin ism-i mef'ûlü harf-i cerle gelir."; }
    }
    if (m.id === "zarf"){
      const d = rt.data || {}, zT = d.mz || o.t, mT = d.mm || "مَFْAَLٌ";
      if (zT === mT){ o.t = zT; o.x = []; o.note = "Bu fiilde ism-i zaman, ism-i mekân ve masdar-ı mîmî aynı biçimdedir: " + fill(zT, rt.r) + "."; }
      else { o.t = zT; o.x = [mT]; o.gtr = "İsm-i zaman · İsm-i mekân"; o.note = "Bu fiilde ism-i zaman ve ism-i mekân " + fill(zT, rt.r) + ", masdar-ı mîmî " + fill(mT, rt.r) + " biçimindedir. Kartta ilk kelime zaman/mekân, ikinci kelime masdar-ı mîmîdir."; }
    }
    if (m.p && !(rt.data && rt.data.lz)) o.p = m.p();
    return o;
  });
}

/* ===================== YÖNLENDİRME ===================== */
const VIEWS = ["tezgah","muttaride","bablar","ezber","oyun","rehber","program"];
let VIEW = "tezgah";
function go(v){
  if (!VIEWS.includes(v)) v = "tezgah"; VIEW = v; stopChant(); ROOTERR = ""; pauseTimer();
  VIEWS.forEach(x => $("#v-"+x).hidden = x!==v);
  $$(".nav button").forEach(b => b.setAttribute("aria-current", b.dataset.view===v ? "page" : "false"));
  ({tezgah:renderLoom, muttaride:renderTables, bablar:renderBabs, ezber:renderChant, oyun:renderHub, rehber:renderGuide, program:()=>{}})[v]();
  try { history.replaceState(null, "", "#"+v); } catch(e){}
  scrollTo({top:0});
}
$$(".nav button").forEach(b => b.onclick = () => go(b.dataset.view));
document.addEventListener("click", e => {
  const rc = e.target.closest("[data-root]");
  if (rc){ setRoot(rc.dataset.root); toast("Kök: " + rc.dataset.root.split("").join(" ") + " · " + R.b.tr); if (rc.dataset.go) go(rc.dataset.go); else render(); return; }
  const g = e.target.closest("[data-go]"); if (g){ e.preventDefault(); closeSheet(); go(g.dataset.go); return; }
});
addEventListener("hashchange", () => { const h = location.hash.slice(1); if (h && h !== VIEW) go(h); });
const render = () => ({tezgah:renderLoom, muttaride:renderTables, bablar:renderBabs, ezber:renderChant, oyun:renderHub, rehber:renderGuide})[VIEW]();

/* ---------- kök seçici ---------- */
function picker(){
  return `<div class="picker">
    <div class="rootin"><label class="small muted" for="rootIn">Kök</label><input id="rootIn" value="${esc(R.r.join(""))}" maxlength="5" aria-label="Üç harfli kök" autocomplete="off">
      <label class="small muted" for="babIn">Bâb</label><select id="babIn">${BABS.map(b=>`<option value="${b.id}" ${b.id===R.b.id?"selected":""}>${b.id}. ${b.ar} – ${b.tr}</option>`).join("")}</select></div>
    ${ROOTERR ? `<div class="warn">${esc(ROOTERR)}</div>` : ""}${R.data ? `<div class="small muted">Anlamı: <b style="color:var(--ink)">${esc(R.data.tr)}</b>${R.data.lz?" · lâzım (geçişsiz)":" · müteaddî (geçişli)"}</div>` : `<div class="small muted">Kendi kökünü çekiyorsun: masdar semâîdir; bâbın en yaygın kalıpları “olası masdar” diye önerilir (sözlükten doğrula). Lâzım/müteaddî bilgisi yok.</div>`}
    <div class="rootchips" style="max-height:210px;overflow:auto">${BABS.map(b => `<span class="bl">${b.id}.</span>` + ROOTS.filter(x=>x.b===b.id).map(x=>`<button data-root="${x.r}" aria-pressed="${x.r===R.r.join("")}" title="${esc(x.tr)}">${x.r}</button>`).join("")).join("")}</div>
  </div>`;
}
function bindPicker(){
  const ri = $("#rootIn"), bi = $("#babIn");
  ri.onchange = () => { setRoot(ri.value); render(); };
  ri.onkeydown = e => { if (e.key==="Enter") ri.onchange(); };
  bi.onchange = () => { setRoot(R.r.join(""), +bi.value); if (R.locked) toast(R.r.join(" ") + " kökü " + R.b.tr + "ndandır; başka bâbda çekilmez. Farklı bâb denemek için kendi kökünü yaz."); render(); };
}

/* ===================== TEZGÂH ===================== */
let loomTimer = null, loomI = 0;
function renderLoom(){
  const M = muh();
  $("#v-tezgah").innerHTML = `
  <div class="hero">
    <div>
      <span class="eyebrow">Emsile-i Muhtelife · Emsile-i Muttaride · Binâ</span>
      <h1>Kökü tezgâha koy, <span>kalıplar</span> dokusun</h1>
      <p class="muted" style="max-width:56ch">Medresede sarfın ilk kitabı Emsile'dir: Emsile-i Muhtelife bir kökü 24 sîgaya döker. Burada her kalıp, kökü <b class="rf">fâ</b>, <b class="ra">ayn</b>, <b class="rl">lâm</b> renkleriyle gösterir; <span class="zv">gri harfler</span> kalıbın eklediği harflerdir (zevâid). Altındaki satır mîzandır: aynı kalıp <span class="ar" dir="rtl">ف ع ل</span> harfleriyle.</p>
      ${picker()}
    </div>
    <div class="panel loom" aria-live="polite">
      <div class="tiles miz">${MIZAN.map((c,i)=>`<div class="tile ${["rf","ra","rl"][i]}">${c}<small>${["fâü'l-fiil","aynü'l-fiil","lâmü'l-fiil"][i]}</small></div>`).join("")}</div>
      <svg class="threads" viewBox="0 0 240 40" aria-hidden="true"><path d="M60 0 C60 20 180 20 180 40" stroke="var(--rf)" fill="none" stroke-width="2"/><path d="M120 0 V40" stroke="var(--ra)" stroke-width="2"/><path d="M180 0 C180 20 60 20 60 40" stroke="var(--rl)" fill="none" stroke-width="2"/></svg>
      <div class="tiles">${R.r.map((c,i)=>`<div class="tile ${["rf","ra","rl"][i]}">${esc(c)}</div>`).join("")}</div>
      <div style="height:6px"></div>
      <div class="woven" id="wv"></div><div class="wmiz" id="wz"></div><div class="wname" id="wn"></div>
      <div class="row"><button class="btn ghost sm" id="wPrev" aria-label="Önceki kalıp">‹</button><button class="btn ghost sm" id="wPlay">Duraklat</button><button class="btn ghost sm" id="wNext" aria-label="Sonraki kalıp">›</button></div>
    </div>
  </div>
  <div class="sec-h"><div><span class="eyebrow">${esc(R.b.ar)} · ${esc(lemma())}</span><h2>Emsile-i Muhtelife</h2></div>
    <div class="toggles"><div class="seg"><button aria-pressed="${S.miz}" id="tMiz">Mîzan</button><button aria-pressed="${S.pas}" id="tPas">Meçhul</button><button aria-pressed="${S.col}" id="tCol">Renkler</button></div><button class="btn sm" data-go="ezber">Ezberle →</button></div></div>
  <div class="cards">${M.map((o,k) => cardHTML(o, k)).join("")}</div>
  <div class="legend small" style="margin-top:14px"><span class="rf">fâü'l-fiil</span><span class="ra">aynü'l-fiil</span><span class="rl">lâmü'l-fiil</span><span class="zv">zevâid (ilave harf)</span></div>`;
  bindPicker();
  $("#tMiz").onclick = () => { S.miz = !S.miz; save(); renderLoom(); };
  $("#tPas").onclick = () => { S.pas = !S.pas; save(); renderLoom(); };
  $("#tCol").onclick = () => { S.col = !S.col; save(); renderLoom(); };
  $$("[data-card]").forEach(b => b.onclick = () => openCard(+b.dataset.card));
  const cyc = M.filter(o => o.t || o.txt || o.guess);
  const show = () => { const o = cyc[loomI % cyc.length]; const wv = $("#wv"); if (!wv) return; wv.classList.remove("anim"); void wv.offsetWidth; wv.classList.add("anim"); if (o.t){ wv.innerHTML = W(o.t); $("#wz").innerHTML = Z(o.t); } else if (o.guess){ wv.innerHTML = o.gt.map(W).join(" · "); $("#wz").innerHTML = o.gt.map(Z).join(" · "); } else { wv.textContent = o.txt; $("#wz").textContent = ""; } $("#wn").textContent = o.tr + " · " + o.ar; };
  clearInterval(loomTimer); loomI = 0; show();
  const play = () => { clearInterval(loomTimer); loomTimer = setInterval(() => { if (VIEW!=="tezgah") return clearInterval(loomTimer); loomI++; show(); }, 2400); };
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) play(); else $("#wPlay").textContent = "Oynat";
  let playing = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("#wPlay").onclick = () => { playing = !playing; if (playing) play(); else clearInterval(loomTimer); $("#wPlay").textContent = playing ? "Duraklat" : "Oynat"; };
  $("#wNext").onclick = () => { loomI++; show(); }; $("#wPrev").onclick = () => { loomI = (loomI - 1 + cyc.length) % cyc.length; show(); };
}
function cardHTML(o, k){
  const main = o.t ? W(o.t) : o.txt ? esc(o.txt) : o.guess ? `<span class="w2" style="font-size:1.35rem;opacity:.85">${o.guess.map(esc).join(" · ")}</span><br><small class="muted" style="font-size:.7rem">olası (semâî)</small>` : `<span class="muted" style="font-size:1rem">${o.none ? "—" : "semâî"}</span>`;
  const extra = o.x.length ? `<div class="w2">${o.x.map(W).join(" · ")}</div>` : "";
  const mz = S.miz && o.t ? `<div class="mz">${Z(o.t)}${o.x.length ? " · " + o.x.map(Z).join(" · ") : ""}</div>` : "";
  const mean = `<div class="small" style="color:var(--gold);margin-top:2px">${esc(o.mean)}</div>`;
  const ps = S.pas && o.p ? `<div class="ps"><div class="w2">${W(o.p)}</div>${S.miz?`<div class="mz">${Z(o.p)}</div>`:""}</div>` : "";
  return `<button class="fcard drop" style="animation-delay:${k*18}ms" data-card="${o.i}"><div class="k"><span>${o.i+1}. ${esc(o.tr)}</span><span class="ar">${o.ar}</span></div><div class="w">${main}</div>${extra}${mz}${mean}${ps}</button>`;
}
function openCard(i){
  const o = muh()[i]; if (!o) return;
  const parts = o.t ? clusters(o.t).filter(c => c.s !== " ").map(c => { const b = c.s[0]; const role = b==="F"?["rf","fâ"]:b==="A"?["ra","ayn"]:b==="L"?["rl","lâm"]:["zv","ilave"]; return `<span class="${role[0]}">${esc(fill(c.s, R.r))}<small>${role[1]}</small></span>`; }).join("") : "";
  const word = o.t ? fill(o.t, R.r) : (o.txt||"");
  $("#sheet").innerHTML = `<div class="sheet" id="sh"><div class="p" role="dialog" aria-modal="true" aria-label="${esc(o.tr)}">
    <div class="row" style="justify-content:space-between"><span class="eyebrow">${o.i+1}. kalıp · ${esc(R.b.tr)}</span><button class="ib" id="shX" aria-label="Kapat">✕</button></div>
    <h2 style="margin-top:8px">${esc(o.tr)} <span class="ar muted" style="font-size:1.2rem">${o.ar}</span></h2>
    <p class="muted">${esc(o.d)}</p>
    <div class="panel pad" style="text-align:center"><div class="woven">${o.t?W(o.t):o.guess?`<span style="font-size:2rem">${o.guess.map(esc).join(" · ")}</span>`:esc(o.txt||"—")}</div>${o.t?`<div class="wmiz">${Z(o.t)}</div>`:""}
      <p style="margin:12px 0 0"><b>${esc(o.mean)}</b>${R.data ? ` <span class="small muted">· kök anlamı: ${esc(R.data.tr)}</span>` : ` <span class="small muted">· genel anlam kalıbı</span>`}</p>${R.data ? `<p class="small muted" style="margin:2px 0 0">Genel kalıp: ${esc(o.g)}</p>` : ""}</div>
    ${parts?`<h3 style="margin:20px 0 10px;font-size:1.05rem">Kelime nasıl dokundu?</h3><div class="parts">${parts}</div><p class="small muted" style="text-align:center">Sağdan sola: kökün harfleri renkli, kalıbın eklediği harfler gri.</p>`:""}
    ${o.p?`<h3 style="margin:20px 0 10px;font-size:1.05rem">Meçhulü</h3><div class="panel pad" style="text-align:center"><div class="woven" style="font-size:2.4rem">${W(o.p)}</div><div class="wmiz">${Z(o.p)}</div></div>`:""}
    ${o.x.length?`<h3 style="margin:20px 0 10px;font-size:1.05rem">Diğer kalıpları</h3><div class="panel pad" style="text-align:center"><div class="woven" style="font-size:2.2rem">${o.x.map(W).join(" · ")}</div><div class="wmiz">${o.x.map(Z).join(" · ")}</div></div>`:""}
    ${o.note||o.none?`<p class="small" style="margin-top:14px">${esc(o.note||o.none)}</p>`:""}
  </div></div>`;
  $("#sh").onclick = e => { if (e.target.id==="sh") closeSheet(); }; $("#shX").onclick = closeSheet; $("#shX").focus();
}
function closeSheet(){ $("#sheet").innerHTML = ""; }
addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });

/* ===================== MUTTARİDE ===================== */
let TB = "mazi", TBHIDE = false;
const ROWS = [{tr:"Gâib", g:"m", p:"g", idx:[0,1,2]}, {tr:"Gâibe", g:"f", p:"g", idx:[3,4,5]}, {tr:"Muhatab", g:"m", p:"h", idx:[6,7,8]}, {tr:"Muhataba", g:"f", p:"h", idx:[9,10,11]}, {tr:"Mütekellim", g:"x", p:"m", idx:[12,-1,13]}];
function figs(g, p){
  const col = g==="m" ? "var(--rl)" : g==="f" ? "var(--rf)" : "var(--gold)";
  const one = x => `<circle cx="${x}" cy="7" r="4" fill="${col}"/><path d="M${x-6} 22 q6 -12 12 0" fill="${col}"/>`;
  const mark = p==="h" ? `<path d="M44 14 h10 m-4 -4 l4 4 l-4 4" stroke="var(--muted)" stroke-width="2" fill="none"/>` : p==="m" ? `<path d="M40 2 h14 a3 3 0 0 1 3 3 v6 a3 3 0 0 1 -3 3 h-8 l-4 4 v-4 h-2 a3 3 0 0 1 -3 -3 v-6 a3 3 0 0 1 3 -3z" fill="var(--panel2)" stroke="var(--muted)"/>` : "";
  return `<svg width="58" height="24" viewBox="0 0 58 24" aria-hidden="true">${one(8)}${one(22)}${one(36).replace(/fill/g,'opacity=".55" fill')}${mark}</svg>`;
}
function tableForm(t, i, rt=R){ return t.f(rt.b, i); }
function matrixHTML(t, opts={}){
  const allow = i => i >= 0 && (!t.only || t.only.includes(i));
  return `<div class="matrix"><div></div><div class="h">Müfred (tekil)</div><div class="h">Tesniye (ikil)</div><div class="h">Cem' (çoğul)</div>
    ${ROWS.map(r => `<div class="rh">${figs(r.g, r.p)}<span>${r.tr}</span></div>` + r.idx.map((i, c) => {
      if (i < 0) return `<div class="cell x"><span class="small">↔ نَحْنُ</span></div>`;
      if (!allow(i)) return `<div class="cell x"><span class="small">—</span></div>`;
      const tag = opts.answer ? "button" : "div";
      return `<${tag} class="cell" data-i="${i}" ${opts.answer?"":""}>${opts.answer ? `<span class="z">${SIGA[i].z}</span><span class="small muted">${i+1}</span>` : `<span class="w">${W(tableForm(t,i))}</span>${S.miz?`<span class="mz">${Z(tableForm(t,i))}</span>`:""}<span class="z">${SIGA[i].z} · ${i+1}</span>`}</${tag}>`;
    }).join("")).join("")}</div>`;
}
function renderTables(){
  const t = TABLES.find(x => x.id === TB) || TABLES[0];
  const dis = t.pas && lz();
  $("#v-muttaride").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Emsile-i Muttaride</span><h2>14 sîga tablosu</h2></div><span class="muted small">Kişi (gâib, muhatab, mütekellim) × sayı (tekil, ikil, çoğul)</span></div>
    <div class="panel pad">${picker()}</div>
    <div class="row" style="margin-top:16px"><div class="seg" role="tablist">${TABLES.map(x=>`<button aria-pressed="${x.id===t.id}" data-tb="${x.id}">${esc(x.tr)}</button>`).join("")}<button aria-pressed="${TB==="fail"}" data-tb="fail">İsm-i fâil</button><button aria-pressed="${TB==="mef"}" data-tb="mef">İsm-i mef'ûl</button></div></div>
    <div class="sec-h"><div><span class="eyebrow ar" style="font-size:1rem;letter-spacing:0">${TB==="fail"?"اسْمُ الْفَاعِلِ":TB==="mef"?"اسْمُ الْمَفْعُولِ":t.ar}</span><h2>${TB==="fail"?"İsm-i fâil":TB==="mef"?"İsm-i mef'ûl":esc(t.tr)} · <span class="ar" style="font-size:1.3rem">${esc(lemma())}</span></h2></div>
      <div class="row"><div class="seg"><button aria-pressed="${S.miz}" id="tMiz2">Mîzan</button><button aria-pressed="${S.col}" id="tCol2">Renkler</button><button aria-pressed="${TBHIDE}" id="tHide">Kendini sına</button></div><button class="btn ghost sm" id="tPrint">🖨 Boş çalışma kâğıdı</button></div></div>
    <p class="muted" style="margin-top:-6px">${TB==="fail"?"Yapan anlamında. Müfred, tesniye ve sâlim cemiler kıyâsîdir; teksîr cemileri (فُعَّلٌ، فُعَّالٌ، فَعَلَةٌ، فَوَاعِلُ) Emsile'de kalıp olarak sayılır, her kökte kullanılmaz.":TB==="mef"?"Yapılan anlamında: مَفْعُولٌ kalıbı.":esc(t.d)}</p>
    ${TB==="fail" ? `${R.data && R.data.sf ? `<div class="panel pad" style="margin-bottom:12px">${R.b.id===5 ? "<b>Kerume bâbı lâzımdır:</b> ism-i fâil yerine genellikle" : "<b>Bu fiilde</b> öğrencinin daha sık karşılaşacağı biçim"} <b>sıfat-ı müşebbehe</b>${R.b.id===5 ? " kullanılır" : "dir"}: <span class="ar" style="font-size:1.6rem">${esc(R.data.sf)}</span>.</div>` : R.b.id===5 ? `<div class="panel pad" style="margin-bottom:12px">Kerume bâbında ism-i fâil yerine genellikle sıfat-ı müşebbehe (فَعِيلٌ, فَعْلٌ, أَفْعَلُ gibi) kullanılır; aşağıdaki kıyâsî kalıp çoğu kökte kullanılmaz.</div>` : ""}<div class="list" ${R.b.id===5 ? 'style="opacity:.55"' : ""}>${FAIL.map((f,i)=>`<div class="cell"><span class="w">${W(f)}</span>${S.miz?`<span class="mz">${Z(f)}</span>`:""}<span class="z" style="font-family:var(--f-ui)">${esc(FAIL_TR[i])}</span></div>`).join("")}</div>`
      : TB==="mef" ? (`${lz() ? `<div class="panel pad" style="margin-bottom:12px">${R.data.mc ? `Bu kök lâzım (geçişsiz): ism-i mef'ûl harf-i cerle kullanılır: <span class="ar" style="font-size:1.4rem">${esc(fill("مَFْAُوLٌ " + R.data.mc, R.r))}</span>.` : "Bu kök lâzım (geçişsiz): ism-i mef'ûl harf-i cerle gelir."}</div>` : ""}<div class="list">${MEF.map((f,i)=>`<div class="cell"><span class="w">${W(f)}</span>${S.miz?`<span class="mz">${Z(f)}</span>`:""}<span class="z" style="font-family:var(--f-ui)">${esc(MEF_TR[i])}</span></div>`).join("")}</div>`)
      : dis ? `<div class="panel pad">Bu kök lâzım (geçişsiz) olduğu için meçhulü doğrudan yapılmaz. Müteaddî bir kök seç (ör. نصر، ضرب، فتح).</div>` : matrixHTML(t)}
    <div class="panel pad" style="margin-top:18px"><span class="eyebrow">Hatırlatma</span><p style="margin:6px 0 0">Muzâri harfleri <b class="ar" style="font-size:1.15rem">أَتَيْنَ</b> (eteyne): <span class="ar">أَ</span> ben, <span class="ar">تَ</span> sen/o (kadın), <span class="ar">يَ</span> o (erkek), <span class="ar">نَ</span> biz. Aynı görünen sîgalar vardır: <span class="ar">تَنْصُرُ</span> hem 4. (o kadın) hem 7. (sen erkek) sîgadır.</p></div>`;
  bindPicker();
  $$("[data-tb]").forEach(b => b.onclick = () => { TB = b.dataset.tb; renderTables(); });
  $("#tMiz2").onclick = () => { S.miz = !S.miz; save(); renderTables(); };
  $("#tCol2").onclick = () => { S.col = !S.col; save(); renderTables(); };
  $("#tHide").onclick = () => { TBHIDE = !TBHIDE; renderTables(); };
  $("#tPrint").onclick = () => { document.body.classList.add("pb"); try { window.print(); } catch(e){} setTimeout(() => document.body.classList.remove("pb"), 600); };
  if (TBHIDE){ $$("#v-muttaride .cell:not(.x)").forEach(c => { c.classList.add("veil"); c.onclick = () => c.classList.toggle("open"); }); }
}

/* ===================== BÂBLAR ===================== */
function renderBabs(){
  $("#v-bablar").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Binâ</span><h2>Sülâsî mücerred: altı bâb</h2></div><span class="muted small">Bâbı, aynü'l-fiilin mâzi ve muzârideki harekesi belirler</span></div>
   <div class="babs">${BABS.map(b => { const ex = ROOTS.filter(x=>x.b===b.id); const rt = {r:ex[0].r.split(""), b, data:ex[0]};
     return `<div class="panel bab"><div class="row" style="justify-content:space-between"><span class="eyebrow">${b.id}. bâb · ${esc(b.tr)}</span><span class="ar muted">${b.vz}</span></div>
       <div class="big">${paint(mzStem(b)+V.a, rt.r)} ${paint("يَ"+muStem(b)+V.u, rt.r)}</div>
       <div class="dial"><div class="v">ـ${V[b.mz]}ـ<small>mâzi</small></div><span class="muted">→</span><div class="v">ـ${V[b.mu]}ـ<small>muzâri</small></div><span class="small muted" style="flex:1">${esc(b.note)}</span></div>
       <div class="rootchips">${ex.map(x=>`<button data-root="${x.r}" data-go="tezgah" title="${esc(x.tr)}">${x.r}</button>`).join("")}</div></div>`; }).join("")}</div>`;
}

/* ===================== EZBER ===================== */
let CH = {on:false, i:-1, hide:false, speed:1, t:null};
function chantItems(rt=R){
  const out = [];
  muh(rt).forEach(o => {
    if (o.txt && !o.t){ out.push({s:o.pre + o.txt, tr:o.tr, h:esc(o.pre + o.txt)}); return; }
    if (!o.t) return;
    out.push({s:o.pre + fill(o.t, rt.r) + (o.x.length ? " وَ" + o.x.map(x=>fill(x, rt.r)).join(" وَ") : ""), tr:o.tr, h:esc(o.pre) + W(o.t) + o.x.map(x => " وَ" + W(x)).join("")});
    if (o.p && S.pas) out.push({s:fill(o.p, rt.r), tr:o.tr + " (meçhul)", h:W(o.p)});
  });
  return out;
}
/* Kendini sına: parçayı ezberden söyle, göster, kendi değerlendirmeni yap; puan yalnızca “hatırladım” diyebildiklerine verilir */
let RC = null;
function recallHTML(items){
  RC = RC || {i:0, ok:0, open:false, done:false, yan:[]};
  if (RC.done){
    return `<div class="panel pad" style="text-align:center"><div class="eyebrow">Sonuç</div><div class="score" style="font-size:2.6rem;font-weight:700;color:var(--gold)">${RC.ok} / ${items.length}</div><p>${RC.ok===items.length?"Hepsini hatırladın!":"Hatırlayamadıkların aşağıda; bir daha dene."}</p>
      ${RC.yan.length ? `<div class="chant" style="font-size:1.3rem;line-height:2">${RC.yan.map(i=>`<div><span class="small muted" style="font-family:var(--f-ui)">${esc(items[i].tr)}</span> ${items[i].h}</div>`).join("")}</div>` : ""}
      <button class="btn" id="rAgain" style="margin-top:12px">Yeniden dene</button></div>`;
  }
  const x = items[RC.i];
  return `<div class="panel pad" style="text-align:center"><div class="row" style="justify-content:space-between"><span class="eyebrow">${RC.i+1} / ${items.length}</span><div class="prog" style="max-width:200px"><i style="width:${Math.round(100*RC.i/items.length)}%"></i></div></div>
    <h3 style="margin:14px 0 4px">${esc(x.tr)}</h3><div class="small muted">${esc(lemma())}</div>
    <div class="woven" style="margin:12px 0;${RC.open ? "" : "filter:blur(10px);user-select:none"}">${x.h}</div>
    ${RC.open ? `<p class="small muted">Ezberden doğru söyleyebildin mi?</p><div class="row" style="justify-content:center"><button class="btn" id="rOk">✓ Hatırladım</button><button class="btn ghost" id="rNo">✗ Hatırlayamadım</button></div>` : `<p class="small muted">Önce ezberden söyle, sonra göster.</p><button class="btn" id="rShow">Göster</button>`}</div>`;
}
function bindRecall(items){
  const sh = $("#rShow"); if (sh) sh.onclick = () => { RC.open = true; renderChant(); };
  const done = ok => { if (ok) RC.ok++; else RC.yan.push(RC.i); RC.i++; RC.open = false; if (RC.i >= items.length){ RC.done = true; addXp(RC.ok * 2); if (RC.ok === items.length){ confetti(); beep("win"); } } renderChant(); };
  const o = $("#rOk"), n = $("#rNo"); if (o) o.onclick = () => done(true); if (n) n.onclick = () => done(false);
  const a = $("#rAgain"); if (a) a.onclick = () => { RC = null; renderChant(); };
}
function stopChant(){ CH.on = false; clearTimeout(CH.t); }
function renderChant(){
  const items = chantItems();
  $("#v-ezber").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Ezber halkası</span><h2>Emsile'yi sırayla çalış</h2></div><span class="muted small">Medresedeki gibi: 24 sîga sırayla</span></div>
   <div class="panel pad">${picker()}</div>
   <div class="row" style="margin:16px 0">${CH.hide ? "" : `<button class="btn" id="cPlay">${CH.on?"Durdur":"▶ Sırayla göster"}</button>
     <div class="seg"><button aria-pressed="${CH.speed===1.4}" data-sp="1.4">Yavaş</button><button aria-pressed="${CH.speed===1}" data-sp="1">Normal</button><button aria-pressed="${CH.speed===.7}" data-sp=".7">Hızlı</button></div>`}
     <div class="seg"><button aria-pressed="${!CH.hide}" id="cShow">Sırayla göster</button><button aria-pressed="${CH.hide}" id="cHide">Kendini sına (puanlı)</button></div></div>
   ${CH.hide ? recallHTML(items) : `<p class="small muted">Bu bölüm yalnızca kalıpları sırayla vurgular; puan vermez. Ezberini ölçmek için “Kendini sına”yı kullan.</p>
   <div class="panel pad chant" id="chant">${items.map((x,i)=>`<span class="it ${i===CH.i?"on":""}" data-ci="${i}" title="${esc(x.tr)}">${x.h}</span>`).join(" ")}</div>
   <p class="small muted" style="margin-top:10px">${items.length} parça · bir parçaya dokununca o parçadan itibaren gösterilir.</p>`}`;
  bindPicker();
  if (CH.hide){ bindRecall(items); $("#cShow").onclick = () => { CH.hide = false; RC = null; renderChant(); }; return; }
  $("#cShow").onclick = () => {};
  const step = () => {
    if (!CH.on) return; const its = $$("#chant .it");
    its.forEach(x => x.classList.remove("on")); CH.i++;
    if (CH.i >= its.length){ CH.on = false; CH.i = -1; $("#cPlay").textContent = "▶ Baştan göster"; return; }
    const el = its[CH.i]; el.classList.add("on"); el.classList.add("open"); el.scrollIntoView({block:"nearest", behavior:"smooth"});
    const next = () => { CH.t = setTimeout(step, 250 * CH.speed); };
    CH.t = setTimeout(step, 1500 * CH.speed);
  };
  $("#cPlay").onclick = () => { if (CH.on){ stopChant(); $("#cPlay").textContent = "▶ Devam et"; } else { CH.on = true; if (CH.i >= items.length-1) CH.i = -1; CH.i--; if (CH.i < -1) CH.i = -1; $("#cPlay").textContent = "Durdur"; step(); } };
  $$("[data-sp]").forEach(b => b.onclick = () => { CH.speed = +b.dataset.sp; $$("[data-sp]").forEach(x=>x.setAttribute("aria-pressed", x===b)); });
  $("#cHide").onclick = () => { CH.hide = true; RC = null; stopChant(); renderChant(); };
  $$("#chant .it").forEach(el => el.onclick = () => { stopChant(); CH.i = +el.dataset.ci - 1; CH.on = true; $("#cPlay").textContent = "Durdur"; step(); });
}

/* ===================== OYUNLAR ===================== */
const GAMES = [
 {id:"siga", ico:"هُمْ", tr:"Sîga Avcısı", d:"Kelime hangi sîga? Kişi-sayı matrisinde doğru hücreye dokun."},
 {id:"insaat", ico:"يَـ", tr:"Çekim İnşaatı", d:"Muzâri harfini ve sonekini seçip kelimeyi kendin kur."},
 {id:"terazi", ico:"⚖", tr:"Mîzan Terazisi", d:"Kelimeyi doğru vezinle tart: terazi dengeye gelsin."},
 {id:"kok", ico:"ن ص ر", tr:"Kök Avı", d:"Kelimenin içinden fâ, ayn, lâm harflerini sırayla bul."},
 {id:"bab", ico:"ـَ ـُ", tr:"Bâb Bulmaca", d:"Mâzi ve muzâriye bakıp kökün bâbını tanı."},
 {id:"zincir", ico:"…", tr:"Emsile Zinciri", d:"Ezber sırası: zincirin sıradaki halkası hangisi?"},
 {id:"hizli", ico:"60", tr:"Hızlı Kalıp", d:"60 saniye: istenen kalıbı dört seçenekten kap."},
 {id:"masdar", ico:"مَصْدَر", tr:"Masdar Ustası", d:"Fiilin masdarını bul; masdarı görüp fiili tanı. 130'dan fazla kök."},
 {id:"sigaK", ico:"①⑭", tr:"Sîgadan Kelimeye", d:"Tablo ve sîga söylenir; doğru Arapça çekimi seç."},
 {id:"hata", ico:"✗", tr:"Hatayı Bul", d:"Dört çekimden biri yanlış harekeli: yakala."},
 {id:"doldur", ico:"▢", tr:"Tabloyu Tamamla", d:"Çekimleri sürükleyip boş hücrelere bırak (ya da dokunarak yerleştir)."},
 {id:"diz", ico:"ن‑ص‑ر", tr:"Kelimeyi Diz", d:"Karışık harf parçalarına sırayla dokunarak çekimi kur."},
 {id:"hafiza", ico:"🃏", tr:"Eşli Kartlar", d:"Kelimeyi sîgasıyla eşleştir (hafıza oyunu)."},
 {id:"degis", ico:"⇄", tr:"Bir Değişiklik Yap", d:"Bir çekim verilir: özneyi değiştir ya da başına lem/len/lâ getir; yalnızca değişen parçayı bul."},
 {id:"duzelt", ico:"✎", tr:"Hatayı Düzelt, Sebebini Seç", d:"Yanlış çekimin doğrusunu bul ve kuralını seç."},
 {id:"coklu", ico:"☰", tr:"Bütün İhtimalleri Bul", d:"Aynı biçim birden fazla sîgaya uyar: hepsini işaretle."},
 {id:"anlam", ico:"TR", tr:"Anlamdan Kalıba", d:"Türkçe anlam verilir; doğru Arapça kalıbı seç."},
 {id:"tekrar", ico:"↻", tr:"Yanlışlarımı Tekrar Et", d:"Yanlış yaptığın kalıplar farklı kökle yeniden sorulur; doğru bilince listeden çıkar."},
 {id:"deste", ico:"🎴", tr:"Fiil Destesi", d:"Kapalı kartlardan birini aç; çıkan kök, kip ve sîgaya göre doğru çekimi bul."},
 {id:"karma", ico:"★", tr:"Karma Antrenman", d:"Bütün soru türlerinden 15 soru; günlük çalışma için."}
];
const mkey = d => JSON.stringify(d);
function addMist(d){ if (!d || S.mist.some(x => mkey(x) === mkey(d))) return; S.mist.push(d); if (S.mist.length > 40) S.mist.shift(); save(); }
function delMist(d){ S.mist = S.mist.filter(x => mkey(x) !== mkey(d)); save(); }
/* masdar kalıbı: kök harflerini sırayla F-A-L ile değiştirir (نَصْرًا → FَAْLًا) */
function masdarKalip(d){ const k = Array.from(d.r); let n = 0, out = ""; for (const c of d.ms){ if (n < 3 && c === k[n]){ out += "FAL"[n]; n++; } else out += c; } return n === 3 ? out : null; }
function mutate(w, valid){
  const M = "َُِْ"; const idx = [...w].map((c,i)=> M.includes(c) && w[i-1]!=="ّ" && w[i+1]!=="ّ" ? i : -1).filter(i=>i>=0);
  for (let n=0;n<40 && idx.length;n++){ const i = pick(idx); const rp = pick([...M].filter(c=>c!==w[i])); const out = w.slice(0,i)+rp+w.slice(i+1); if (out!==w && !valid.includes(out)) return out; }
  return w.replace(/[َُِ]/, c => c==="َ" ? "ُ" : "َ");
}
const RT = () => { const d = pick(ROOTS); return {r:d.r.split(""), b:babOf(d.b), data:d}; };
let G = null;
function renderHub(){
  if (G && !G.done){ resumeTimer(); draw(); return; }
  $("#v-oyun").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Oyun odası</span><h2>Çekimi oynayarak pekiştir</h2></div><span class="muted small">Sorular ${ROOTS.length} kökten her seferinde yeniden üretilir</span></div>
   <div class="hub">${GAMES.map(g=>`<button class="gcard" data-g="${g.id}"><span class="ico ${Array.from(g.ico).length > 3 ? "u" : ""}">${g.ico}</span><h3>${g.tr}</h3><span class="muted small">${g.d}</span>${g.id==="tekrar" ? `<span class="chip best">${S.mist.length} bekliyor</span>` : S.best[g.id]?`<span class="chip best">En iyi ${S.best[g.id]}</span>`:""}</button>`).join("")}</div>`;
  $$("[data-g]").forEach(b => b.onclick = () => start(b.dataset.g));
}
function makeQ(id, force){
  if (id === "cark") id = "deste";   /* eski kayıtlı yanlışlarla uyum */
  const rt = RT();
  const muz = TABLES.filter(t => !(t.pas && rt.data.lz));
  const okI = t => SIGA.map((s,i)=>i).filter(i=>!t.only||t.only.includes(i));
  if (id === "karma") return makeQ(pick(["siga","insaat","terazi","kok","bab","zincir","hizli","masdar","sigaK","hata","doldur","diz","anlam","degis","duzelt","coklu"]));
  if (id === "tekrar"){ const d = G.pool[G.i % G.pool.length]; return makeQ(d.g, d); }
  const tid = x => TABLES.find(t => t.id === x);
  if (id === "anlam"){
    const pool = muh(rt).filter(o => o.t && !o.kalip && o.mean);
    const o = (force && pool.find(x => x.id === force.m)) || pick(pool), right = fill(o.t, rt.r);
    const opts = shuffle([right, ...shuffle(uniq(pool.filter(x => x !== o).map(x => fill(x.t, rt.r))).filter(x => x !== right)).slice(0,3)]);
    return {k:"opt", rt, html:`<div class="q">Bu Türkçe anlamın Arapça kalıbı hangisi?</div><div class="w" style="font-family:var(--f-ui);font-size:1.7rem">${esc(o.mean)}</div><div class="small muted">kök: <span class="ar" style="font-size:1.2rem">${esc(lemma(rt))}</span></div>`, opts, right, ar:true, why:`${o.tr}: ${right} (${o.mean})`, desc:{g:"anlam", m:o.id}};
  }
  if (id === "degis"){
    const b = rt.b;
    const kind = force ? force.kind : pick(["p1","p2"]);
    if (kind === "p1"){
      const t = force ? tid(force.t) : pick(muz.filter(x => ["mazi","muz","lem","len","nehy"].includes(x.id))), ok = okI(t);
      const i = force ? force.i : pick(ok), j = force ? force.j : pick(ok.filter(x => fill(t.f(b,x), rt.r) !== fill(t.f(b,i), rt.r)));
      const base = fill(t.f(b,i), rt.r), right = fill(t.f(b,j), rt.r);
      const o2 = uniq([...ok.filter(x => x !== j).map(x => fill(t.f(b,x), rt.r)), ...muz.filter(x => x.id !== t.id && (!x.only || x.only.includes(j))).map(x => fill(x.f(b,j), rt.r))]).filter(x => x !== right);
      return {k:"opt", rt, html:`<div class="q">Bir değişiklik yap: <b>${esc(t.tr)}</b></div><div class="w">${esc(base)}</div><div class="small muted">${SIGA[i].z} (${esc(SIGA[i].tr)})</div><div class="q" style="margin-top:8px">Özneyi <span class="ar" style="font-size:1.5rem">${SIGA[j].z}</span> <span class="small muted">(${esc(SIGA[j].tr)})</span> yap.</div>`, opts: shuffle([right, ...shuffle(o2).slice(0,3)]), right, ar:true, why:`${SIGA[i].z} → ${SIGA[j].z}: ${base} → ${right}. Değişen parça muzâri harfi ve sondaki ektir.`, desc:{g:"degis", kind:"p1", t:t.id, i, j}};
    }
    const tos = {lem:["لَمْ","Lem (cahd-ı mutlak): cezmeder, anlamı olumsuz geçmiş yapar."], len:["لَنْ","Len: nasbeder, geleceğin kesin olumsuzu."], nehy:["لَا (nâhiye)","Lâ-yı nâhiye: cezmeder, yasaklar."]};
    const to = force ? force.to : pick(["lem","len","nehy"]), T2 = tid(to), i = force ? force.i : Math.floor(Math.random()*14);
    const base = fill(tid("muz").f(b,i), rt.r), right = fill(T2.f(b,i), rt.r);
    const o2 = uniq([base, ...["lem","len","nehy"].filter(x => x !== to).map(x => fill(tid(x).f(b,i), rt.r)), ...[...Array(14).keys()].filter(x => x !== i).map(x => fill(T2.f(b,x), rt.r))]).filter(x => x !== right);
    const why2 = {lem:"Cezim: sondaki damme sükûna döner; beş fiilde (…ونَ, …انِ, …ينَ) nûn düşer.", len:"Nasb: sondaki damme fetha olur; beş fiilde nûn düşer.", nehy:"Cezim: sondaki damme sükûna döner; beş fiilde nûn düşer."}[to];
    return {k:"opt", rt, html:`<div class="q">Bir değişiklik yap: muzârinin başına <b class="ar" style="font-size:1.4rem">${tos[to][0]}</b> getir</div><div class="w">${esc(base)}</div><div class="small muted">${SIGA[i].z} (${esc(SIGA[i].tr)})</div>`, opts: shuffle([right, ...shuffle(o2).slice(0,3)]), right, ar:true, why:`${base} → ${right}. ${why2}`, desc:{g:"degis", kind:"p2", to, i}};
  }
  if (id === "duzelt"){
    const b = rt.b, mk2 = (pre, i, suf) => fill(pre + PRE[i] + muStem(b) + suf, rt.r), nunI = [1,2,4,7,8,9,10], dammaI = [0,3,6,12,13];
    const NED = {nun:"Cezm ya da nasb sebebiyle (beş fiilde) sondaki nûn düşer.", cezm:"Lem ve lâ-yı nâhiye muzâriyi cezmeder: sondaki damme sükûna döner.", nasb:"Len muzâriyi nasbeder: sondaki damme fetha olur.", pref3:"Müennes gâibe (هِيَ) sîgasında muzâri harfi تَ'dir.", pref6:"Muhatab (أَنْتَ) sîgasında muzâri harfi تَ'dir.", pref12:"Mütekellim vahde (أَنَا) sîgasında muzâri harfi أَ'dir.", pref13:"Mütekellim maa'l-gayr (نَحْنُ) sîgasında muzâri harfi نَ'dir.", emrhamza:"Emirde sükûnla başlanmaz: başa vasıl hemzesi gelir.", emrharake:"Vasıl hemzesinin harekesi muzârinin ayn harekesine bağlıdır: ayn ötre ise ötre (اُ), değilse esre (اِ)."};
    const cat = force ? force.cat : pick(["nun","cezm","nasb","pref","emr"]);
    let key, right, wrong, alts = [], hd = "", pi = force ? force.i : null, pre0 = force ? force.pre : null;
    if (cat === "nun"){ pre0 = pre0 || pick(["لَمْ ","لَنْ ","لَا "]); pi = pi ?? pick(nunI); const sf = pre0 === "لَنْ " ? SUF.nasb : SUF.jazm; right = mk2(pre0, pi, sf[pi]); wrong = mk2(pre0, pi, SUF.raf[pi]); key = "nun"; alts = [mk2(pre0, pi, SUF.nasb[pi]), mk2(pre0, pi, SUF.nun[pi])]; }
    else if (cat === "cezm"){ pre0 = pre0 || pick(["لَمْ ","لَا "]); pi = pi ?? pick(dammaI); right = mk2(pre0, pi, SUF.jazm[pi]); wrong = mk2(pre0, pi, SUF.raf[pi]); key = "cezm"; alts = [mk2(pre0, pi, SUF.nasb[pi]), mk2(pre0, pi, "")]; }
    else if (cat === "nasb"){ pre0 = "لَنْ "; pi = pi ?? pick(dammaI); right = mk2(pre0, pi, SUF.nasb[pi]); wrong = mk2(pre0, pi, SUF.raf[pi]); key = "nasb"; alts = [mk2(pre0, pi, SUF.jazm[pi]), mk2(pre0, pi, "")]; }
    else if (cat === "pref"){ pi = pi ?? pick([3,6,12,13]); const yanlisP = {3:0, 6:0, 12:13, 13:12}[pi]; pre0 = ""; right = mk2("", pi, SUF.raf[pi]); wrong = fill(PRE[yanlisP] + muStem(b) + SUF.raf[pi], rt.r); key = "pref" + pi; alts = [fill(PRE[pi] + muStem(b) + SUF.nasb[pi], rt.r), fill(PRE[pi] + muStem(b) + SUF.jazm[pi], rt.r)]; }
    else { pi = pi ?? pick([6,7,8,9,10,11]); right = fill(tid("emr").f(b,pi), rt.r); const sw = pre0 || pick(["hamza","harake"]); pre0 = sw;
      if (sw === "hamza"){ wrong = right.slice(2); key = "emrhamza"; } else { wrong = (b.mu === "u" ? "اِ" : "اُ") + right.slice(2); key = "emrharake"; }
      alts = [fill("لَا " + PRE[pi] + muStem(b) + SUF.jazm[pi], rt.r), fill(PRE[pi] + muStem(b) + SUF.raf[pi], rt.r)]; }
    const forms = uniq([right, wrong, ...alts]).slice(0,4);
    const rs = shuffle([NED[key], ...shuffle(Object.keys(NED).filter(k => k !== key)).slice(0,3).map(k => NED[k])]);
    return {k:"duzelt", rt, wrong, forms: shuffle(forms), right, reasons: rs, rightReason: NED[key], why:`Doğrusu: ${right}. ${NED[key]}`, desc:{g:"duzelt", cat, i:pi, pre:pre0}};
  }
  if (id === "coklu"){
    const t = force ? tid(force.t) : pick(muz.filter(x => ["muz","mazi","lem","len","nehy","maziP","muzP"].includes(x.id))), ok = okI(t);
    const gr = {}; ok.forEach(i => { const w = fill(t.f(rt.b,i), rt.r); (gr[w] = gr[w] || []).push(i); });
    const multi = Object.values(gr).filter(a => a.length > 1); if (!multi.length) return makeQ("coklu");
    const idx = force ? multi.find(a => a.includes(force.i)) || pick(multi) : pick(multi), w = fill(t.f(rt.b, idx[0]), rt.r);
    return {k:"coklu", rt, t, w, right: idx, why:`${t.tr}: ${w} → ${idx.map(j => SIGA[j].z + " (" + SIGA[j].tr + ")").join(" / ")}`, desc:{g:"coklu", t:t.id, i:idx[0]}};
  }
  if (id === "masdar"){
    const mkRt = d => ({r:d.r.split(""), b:babOf(d.b), data:d});
    const pool = ROOTS.filter(x => x.r !== rt.data.r);
    if (Math.random() < .6){
      const mine = masdarOf(rt.data), right = pick(mine), norm = x => x.normalize("NFC");
      const pats = uniq(pool.map(x => masdarKalip(x)).filter(Boolean)).filter(pt => !mine.some(m => norm(fill(pt, rt.r)) === norm(m)));
      const opts = shuffle([right, ...shuffle(pats).slice(0,3).map(pt => fill(pt, rt.r))]);
      return {k:"opt", rt, html:`<div class="q">Hangisi bu fiilin masdarlarından biridir? <span class="small muted">(${esc(rt.data.tr)})</span></div><div class="w">${paint(mzStem(rt.b)+V.a, rt.r)} ${paint("يَ"+muStem(rt.b)+V.u, rt.r)}</div><div class="small muted">Seçeneklerin hepsi aynı köktendir; fark kalıptadır.</div>`, opts, right, ar:true, why:`${lemma(rt)} → ${mine.join(" · ")}. Masdar semâîdir (kalıbı ezberlenir); sözlükte başka masdarları da bulunabilir.`};
    }
    const right = lemma(rt);
    const opts = shuffle([right, ...shuffle(uniq(pool.map(x=>lemma(mkRt(x)))).filter(x=>x!==right)).slice(0,3)]);
    return {k:"opt", rt, html:`<div class="q">Bu masdar hangi fiilindir?</div><div class="w">${esc(rt.data.ms)}</div>`, opts, right, ar:true, why:`${rt.data.ms} → ${right} (${rt.data.tr})`};
  }
  if (id === "sigaK"){
    const tf = force && tid(force.t) && !(tid(force.t).pas && rt.data.lz) ? tid(force.t) : null;
    const t = tf || pick(muz), ok = okI(t), i = tf && force.i != null ? force.i : pick(ok), right = fill(t.f(rt.b,i), rt.r);
    const other = uniq([...ok.filter(j=>j!==i).map(j=>fill(t.f(rt.b,j), rt.r)), ...muz.filter(x=>x.id!==t.id && (!x.only||x.only.includes(i))).map(x=>fill(x.f(rt.b,i), rt.r))]).filter(x=>x!==right);
    const opts = shuffle([right, ...shuffle(other).slice(0,3)]);
    return {k:"opt", rt, html:`<div class="q">Doğru çekimi bul: <b>${esc(t.tr)}</b></div><div class="w" style="font-size:2.2rem">${SIGA[i].z}</div><div class="small muted">${esc(SIGA[i].tr)} · ${esc(lemma(rt))}</div>`, opts, right, ar:true, why:`${t.tr} · ${SIGA[i].z}: ${right}`, desc:{g:"sigaK", t:t.id, i}};
  }
  if (id === "hata"){
    const t = pick(muz.filter(x=>["mazi","muz","lem","len","nehy","maziP","muzP"].includes(x.id))), ok = okI(t);
    const all = uniq(ok.map(j=>fill(t.f(rt.b,j), rt.r)));
    const forms = shuffle(all).slice(0,4), k = Math.floor(Math.random()*4), orig = forms[k], bad = mutate(orig, all);
    forms[k] = bad;
    return {k:"opt", rt, html:`<div class="q">Dört çekimden biri yanlış harekeli. Hangisi? <span class="small muted">${esc(t.tr)} · ${esc(lemma(rt))}</span></div>`, opts: forms, right: bad, ar:true, why:`Doğrusu: ${orig}`};
  }
  if (id === "doldur"){
    const t = pick(muz.filter(x=>["mazi","muz","lem","maziP","muzP"].includes(x.id))), ok = okI(t);
    const words = ok.map(i=>fill(t.f(rt.b,i), rt.r));
    const blanks = shuffle(ok).slice(0,4).sort((a,b)=>a-b), rights = {};
    blanks.forEach(i => rights[i] = fill(t.f(rt.b,i), rt.r));
    const d = uniq(muz.filter(x=>x.id!==t.id).map(x=>fill(x.f(rt.b,pick(ok)), rt.r))).filter(w=>!words.includes(w));
    return {k:"fill", rt, t, blanks, rights, chips: shuffle([...blanks.map(i=>rights[i]), ...shuffle(d).slice(0,2)]), why:`${t.tr}: ` + blanks.map(i=>`${SIGA[i].z} ${rights[i]}`).join(" · ")};
  }
  if (id === "deste"){
    const kisa = {mazi:"Mâzî", maziP:"Mâzî meçhûl", muz:"Muzâri", muzP:"Muzâri meçhûl", len:"Len", lem:"Lem", emr:"Emir", gaib:"Emr-i gâib", nehy:"Nehy"};
    const av = muz.filter(x => kisa[x.id]), tf = force && av.find(x => x.id === force.t);
    let segs = shuffle(av.filter(x => !tf || x !== tf)).slice(0, tf ? 7 : 8); if (tf) segs.push(tf); segs = shuffle(segs);
    const sel = tf ? segs.indexOf(tf) : Math.floor(Math.random()*segs.length), t = segs[sel], ok = okI(t), i = tf && force.i != null ? force.i : pick(ok), right = fill(t.f(rt.b,i), rt.r);
    const other = uniq([...ok.filter(j=>j!==i).map(j=>fill(t.f(rt.b,j), rt.r)), ...muz.filter(x=>x.id!==t.id && (!x.only||x.only.includes(i))).map(x=>fill(x.f(rt.b,i), rt.r))]).filter(x=>x!==right);
    return {k:"deste", rt, segs: segs.map(x=>({id:x.id, ad:kisa[x.id]})), sel, t, i, opts: shuffle([right, ...shuffle(other).slice(0,3)]), right, why:`${t.tr} · ${SIGA[i].z}: ${right}`, desc:{g:"deste", t:t.id, i}};
  }
  if (id === "diz"){
    const t = pick(muz), ok = okI(t), i = pick(ok), tpl = t.f(rt.b,i), w = fill(tpl, rt.r);
    const parts = clusters(w).map(c=>c.s).filter(c=>c!==" ");
    if (parts.length < 4 || parts.length > 9) return makeQ("diz");
    return {k:"diz", rt, t, i, parts, w, order: shuffle(parts.map((_,j)=>j)), why:`${t.tr} · ${SIGA[i].z}: ${w}`};
  }
  if (id === "hafiza"){
    const t = pick(muz.filter(x=>["mazi","muz","lem","len","maziP","muzP"].includes(x.id))), seen = new Set(), picked = [];
    for (const i of shuffle(okI(t))){ const w = fill(t.f(rt.b,i), rt.r); if (seen.has(w)) continue; seen.add(w); picked.push(i); if (picked.length===6) break; }
    return {k:"mem", rt, t, cards: shuffle(picked.flatMap(i=>[{p:i, t:"w", c:fill(t.f(rt.b,i), rt.r)}, {p:i, t:"l", c:i}])), why:`${t.tr} · ${lemma(rt)}`};
  }
  if (id === "siga"){ const t = pick(muz.filter(t=>["mazi","muz","maziP","muzP","lem","len"].includes(t.id))); const ok = SIGA.map((s,i)=>i).filter(i=>!t.only||t.only.includes(i)); const i = pick(ok); const w = fill(t.f(rt.b,i), rt.r); const right = ok.filter(j => fill(t.f(rt.b,j), rt.r) === w); return {k:"matrix", rt, t, w, right, why:`${right.map(j=>(j+1)+". "+SIGA[j].tr+" ("+SIGA[j].z+")").join(" / ")}`}; }
  if (id === "insaat"){ const t = pick(muz.filter(t=>["mazi","muz","muzP"].includes(t.id))); const i = Math.floor(Math.random()*14); return {k:"build", rt, t, i, target: fill(t.f(rt.b,i), rt.r), why:`${t.tr}, ${SIGA[i].tr} (${SIGA[i].z}): ${fill(t.f(rt.b,i), rt.r)}`}; }
  if (id === "terazi"){ const pool = muh(rt).filter(o=>o.t && !o.kalip); const o = pick(pool); const right = fill(o.t, MIZAN); const others = uniq(MUH.filter(m=>m.t).map(m=>fill(m.t(rt.b), MIZAN)).concat(FAIL.map(f=>fill(f,MIZAN)), MEF.map(f=>fill(f,MIZAN)))).filter(x=>x!==right); return {k:"scale", rt, o, w: fill(o.t, rt.r), opts: shuffle([right, ...shuffle(others).slice(0,3)]), right, why:`${o.tr}: ${fill(o.t, MIZAN)}`}; }
  if (id === "kok"){ const pool = muh(rt).filter(o=>o.t && !o.kalip).concat(TABLES.filter(t=>!t.pas).map(t=>({t:t.f(rt.b, pick((t.only||[0,1,2,3,4,5,6,7,8,9,10,11,12,13]))), tr:t.tr}))); const o = pick(pool); const cl = clusters(o.t).filter(c => c.s !== " "); return {k:"root", rt, w: fill(o.t, rt.r), letters: cl.map(c => fill(c.s, rt.r)), base: cl.map(c => fill(c.s[0], rt.r)), why:`Kök: ${rt.r.join(" ")} · ${o.tr}`}; }
  if (id === "bab"){ const right = rt.b.id; return {k:"opt", rt, html:`<div class="q">Bu kökün bâbı hangisi?</div><div class="w">${paint(mzStem(rt.b)+V.a, rt.r)} ${paint("يَ"+muStem(rt.b)+V.u, rt.r)}</div><div class="small muted">${esc(rt.data.tr)}</div>`, opts: BABS.map(b=>b.ar), right: rt.b.ar, ar:true, why:`${rt.b.ar} – ${rt.b.tr} (${rt.b.vz})`}; }
  if (id === "zincir"){ const seq = chantItems(rt); const k = 1 + Math.floor(Math.random()*(seq.length-2)); const right = seq[k].s; const opts = shuffle([right, ...shuffle(seq.filter((x,j)=>j!==k && x.s!==right).map(x=>x.s)).slice(0,3)]); return {k:"opt", rt, html:`<div class="q">Zincirde sıradaki halka hangisi?</div><div class="ar" style="font-size:1.6rem;line-height:2">${seq.slice(Math.max(0,k-3),k).map(x=>esc(x.s)).join(" · ")} · <span style="color:var(--gold)">؟</span></div>`, opts, right, ar:true, why:`${seq[k].tr}: ${right}`}; }
  if (id === "hizli"){ const pool = muh(rt).filter(o=>o.t && !o.kalip); const o = pick(pool); const right = fill(o.t, rt.r); const opts = shuffle([right, ...shuffle(uniq(pool.filter(x=>x!==o).map(x=>fill(x.t, rt.r))).filter(x=>x!==right)).slice(0,3)]); return {k:"opt", rt, html:`<div class="q"><b>${esc(o.gtr || o.tr)}</b> <span class="ar muted">${o.ar}</span></div><div class="ar muted" style="font-size:1.4rem">${esc(lemma(rt))}</div>`, opts, right, ar:true, why:`${o.gtr || o.tr}: ${right}`}; }
}
function runTimer(){
  clearInterval(G.iv); G.paused = false;
  G.iv = setInterval(() => { const left = Math.max(0, G.timer - Math.floor((Date.now()-G.t0)/1000)); const e = $("#gT"); if (e) e.textContent = left + " sn"; if (!left) end(); }, 250);
}
function pauseTimer(){   /* başka bölüme geçilince süreli oyun durur */
  if (G && G.timer && !G.done && !G.paused){ G.left = Math.max(0, G.timer - Math.floor((Date.now()-G.t0)/1000)); clearInterval(G.iv); G.paused = true; }
}
function resumeTimer(){ if (G && G.timer && !G.done && G.paused){ G.t0 = Date.now() - (G.timer - G.left)*1000; runTimer(); } }
function start(id){
  if (id === "tekrar" && !S.mist.length){ toast("Henüz tekrar edilecek yanlışın yok. Önce başka oyunlar oyna."); return; }
  const pool = id === "tekrar" ? shuffle(S.mist).slice(0, 10) : null;
  G = {id, i:0, ans:0, pool, n: id==="hizli" ? 999 : id==="hafiza" ? 1 : id==="karma" ? 15 : id==="tekrar" ? pool.length : 10, score:0, wrong:0, q:null, lock:false, timer: id==="hizli" ? 60 : 0}; G.q = makeQ(id);
  if (G.timer){ G.t0 = Date.now(); runTimer(); } go("oyun"); }
function draw(){
  const q = G.q, g = GAMES.find(x=>x.id===G.id);
  let body = "";
  if (q.k === "matrix") body = `<div class="q">Bu kelime hangi sîga?</div><div class="w">${paint(q.t.f(q.rt.b, q.right[0]), q.rt.r)}</div><div class="small muted">${esc(q.t.tr)} · ${esc(lemma(q.rt))}</div><div style="margin-top:14px">${matrixHTML(q.t, {answer:true})}</div>`;
  if (q.k === "build"){ const pre = q.t.id==="mazi" ? null : uniq(q.t.id==="muz" ? PRE : PRE.map((p,i)=>pP(i))); const sufs = shuffle(uniq(q.t.id==="mazi" ? SUF.mazi : SUF.raf)); const stem = q.t.id==="mazi" ? mzStem(q.rt.b) : q.t.id==="muz" ? muStem(q.rt.b) : muStemP();
    G.b = G.b || {p: pre ? null : "", s:null, stem};
    body = `<div class="q">Kur: <b>${esc(q.t.tr)}</b> · <span class="ar" style="font-size:1.3rem">${SIGA[q.i].z}</span> <span class="small muted">(${esc(SIGA[q.i].tr)})</span></div><div class="ar muted" style="font-size:1.3rem">${esc(lemma(q.rt))}</div>
      <div class="build">${pre?`<div class="slot ${G.b.p?"fill":""}">${G.b.p?esc(G.b.p):"?"}</div>`:""}<div class="slot stem"><span>${paint(stem, q.rt.r)}</span></div><div class="slot ${G.b.s?"fill":""}">${G.b.s?esc("ـ"+G.b.s):"?"}</div></div>
      <div class="preview" aria-live="polite">${(G.b.p!==null && G.b.s) ? paint((G.b.p||"") + stem + G.b.s, q.rt.r) : ""}</div>
      ${pre?`<div class="tray"><span class="lbl">Muzâri harfi</span>${pre.map(p=>`<button data-pp="${p}" aria-pressed="${G.b.p===p}">${p}ـ</button>`).join("")}</div>`:""}
      <div class="tray" style="margin-top:10px"><span class="lbl">Sonek (son hareke ve ekler)</span>${sufs.map(s=>`<button data-ss="${s}" aria-pressed="${G.b.s===s}">ـ${s}</button>`).join("")}</div>
      <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="bCheck" ${(G.b.p!==null && G.b.s)?"":"disabled"}>Kontrol et</button></div>`; }
  if (q.k === "scale") body = `<div class="q">Bu kelimenin mîzanı (vezni) hangisi?</div><div class="w">${paint(q.o.t, q.rt.r)}</div>
      <svg class="scale" viewBox="0 0 360 140" aria-hidden="true"><path d="M180 60 V130 M140 130 h80" stroke="var(--muted)" stroke-width="4" stroke-linecap="round"/><g class="beam" id="beam" style="transform:rotate(${G.tilt??-8}deg)"><path d="M50 60 H310" stroke="var(--gold)" stroke-width="5" stroke-linecap="round"/><path d="M50 60 l-24 36 h48 z M310 60 l-24 36 h48 z" fill="var(--panel2)" stroke="var(--gold)" stroke-width="2"/><text x="50" y="92" text-anchor="middle" font-size="15" fill="var(--ink)" font-family="Noto Naskh Arabic">${esc(strip(q.w))}</text><text x="310" y="92" text-anchor="middle" font-size="15" fill="var(--ink)" font-family="Noto Naskh Arabic" id="pan2">${esc(G.pan||"؟")}</text></g><circle cx="180" cy="60" r="7" fill="var(--gold)"/></svg>
      <div class="opts rtl">${q.opts.map((o,i)=>`<button class="opt ar" data-o="${i}">${esc(o)}</button>`).join("")}</div>`;
  if (q.k === "root"){ G.sel = G.sel || []; body = `<div class="q">Kökün harflerini sırayla seç: önce <b class="rf">fâ</b>, sonra <b class="ra">ayn</b>, sonra <b class="rl">lâm</b></div><div class="w mono">${esc(q.w)}</div>
      <div class="letters">${q.letters.map((l,i)=>`<button data-l="${i}" class="${G.sel.indexOf(i)>-1?"p"+(G.sel.indexOf(i)+1):""}">${esc(l)}</button>`).join("")}</div>`; }
  if (q.k === "opt") body = `${q.html}<div class="opts ${q.ar?"rtl":""}">${q.opts.map((o,i)=>`<button class="opt ${q.ar?"ar":""}" data-o="${i}">${esc(o)}</button>`).join("")}</div>`;
  if (q.k === "deste") body = desteHTML(q);
  if (q.k === "duzelt") body = duzeltHTML(q);
  if (q.k === "coklu") body = cokluHTML(q);
  if (q.k === "fill") body = fillHTML(q);
  if (q.k === "diz") body = dizHTML(q);
  if (q.k === "mem") body = memHTML(q);
  $("#v-oyun").innerHTML = `<div class="stage"><div class="ghead"><div><span class="eyebrow">${esc(g.tr)}</span><h2 style="font-size:1.4rem">${G.timer?"":`Soru ${G.i+1} / ${G.n}`}</h2></div><div class="row">${G.timer?`<span class="timer" id="gT">${G.timer} sn</span>`:`<div class="prog" style="width:160px"><i style="width:${G.i/G.n*100}%"></i></div>`}<span class="chip">✓ ${G.score}</span><button class="btn ghost sm" id="gEnd">Bitir</button></div></div>
    <div class="panel qbox">${body}<div id="fb"></div></div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" id="gNext" hidden>Devam →</button></div></div>`;
  $("#gEnd").onclick = end;
  $("#gNext").onclick = next;
  if (q.k === "fill") bindFill(q);
  if (q.k === "diz") bindDiz(q);
  if (q.k === "mem") bindMem(q);
  if (q.k === "matrix") $$(".cell[data-i]").forEach(c => c.onclick = () => { if (G.lock) return; const i = +c.dataset.i; const ok = q.right.includes(i); $$(".cell[data-i]").forEach(x => { if (q.right.includes(+x.dataset.i)) x.classList.add("good"); }); if (!ok) c.classList.add("bad"); answer(ok); });
  if (q.k === "build"){
    $$("[data-pp]").forEach(b => b.onclick = () => { if (G.lock) return; G.b.p = b.dataset.pp; draw(); });
    $$("[data-ss]").forEach(b => b.onclick = () => { if (G.lock) return; G.b.s = b.dataset.ss; draw(); });
    const c = $("#bCheck"); if (c) c.onclick = () => { if (G.lock) return; const w = fill((G.b.p||"") + G.b.stem + G.b.s, q.rt.r); answer(w === q.target); };
  }
  if (q.k === "scale") $$("[data-o]").forEach(b => b.onclick = () => { if (G.lock) return; const ok = q.opts[+b.dataset.o] === q.right; G.pan = q.opts[+b.dataset.o]; $("#pan2").textContent = G.pan; $("#beam").style.transform = `rotate(${ok?0:12}deg)`; $$("[data-o]").forEach(x=>{ x.disabled = true; if (q.opts[+x.dataset.o]===q.right) x.classList.add("good"); }); if (!ok) b.classList.add("bad"); answer(ok); });
  if (q.k === "root") $$("[data-l]").forEach(b => b.onclick = () => { if (G.lock) return; const i = +b.dataset.l; const k = G.sel.indexOf(i); if (k > -1) G.sel.splice(k,1); else if (G.sel.length < 3) G.sel.push(i); if (G.sel.length === 3){ const ok = G.sel.map(j => q.base[j]).join("") === q.rt.r.join(""); draw(); answer(ok); } else draw(); });
  if (q.k === "deste") bindDeste(q);
  if (q.k === "duzelt") bindDuzelt(q);
  if (q.k === "coklu") bindCoklu(q);
  if (q.k === "opt" || q.k === "deste") $$("[data-o]").forEach(b => b.onclick = () => { if (G.lock) return; const ok = q.opts[+b.dataset.o] === q.right; $$("[data-o]").forEach(x=>{ x.disabled = true; if (q.opts[+x.dataset.o]===q.right) x.classList.add("good"); }); if (!ok) b.classList.add("bad"); answer(ok); });
}
/* --- Hatayı Düzelt, Sebebini Seç --- */
function duzeltHTML(q){
  G.d = G.d || {a:null, b:null, res:false};
  const st = (g, i, ok) => G.d.res ? (ok ? "good" : G.d[g] === i ? "bad" : "") : "";
  return `<div class="q">Hatalı çekim: <span class="ar" style="font-size:1.9rem;color:var(--bad)">${esc(q.wrong)}</span></div><div class="small muted">kök: <span class="ar" style="font-size:1.2rem">${esc(lemma(q.rt))}</span></div>
  <div class="q" style="margin-top:12px"><b>1)</b> Doğrusu hangisi?</div><div class="opts rtl">${q.forms.map((f,i)=>`<button class="opt ar ${st("a", i, f===q.right)}" ${G.d.a===i?'aria-pressed="true"':""} data-da="${i}">${esc(f)}</button>`).join("")}</div>
  <div class="q" style="margin-top:14px"><b>2)</b> Hangi kural nedeniyle?</div><div class="opts" style="grid-template-columns:1fr">${q.reasons.map((r,i)=>`<button class="opt ${st("b", i, r===q.rightReason)}" style="text-align:left" ${G.d.b===i?'aria-pressed="true"':""} data-db="${i}">${esc(r)}</button>`).join("")}</div>
  <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="dChk" ${G.d.a!==null && G.d.b!==null && !G.d.res ? "" : "disabled"}>Kontrol et</button></div>`;
}
function bindDuzelt(q){
  $$("[data-da]").forEach(b => b.onclick = () => { if (G.lock) return; G.d.a = +b.dataset.da; draw(); });
  $$("[data-db]").forEach(b => b.onclick = () => { if (G.lock) return; G.d.b = +b.dataset.db; draw(); });
  const c = $("#dChk"); if (c) c.onclick = () => { if (G.lock) return; const ok = q.forms[G.d.a] === q.right && q.reasons[G.d.b] === q.rightReason; G.d.res = true; draw(); answer(ok); };
}
/* --- Bütün İhtimalleri Bul --- */
function cokluHTML(q){
  G.cs = G.cs || [];
  return `<div class="q">Bu çekim hangi sîgalara uyar? <b>Hepsini</b> işaretle.</div><div class="w">${paint(q.t.f(q.rt.b, q.right[0]), q.rt.r)}</div><div class="small muted">${esc(q.t.tr)} · ${esc(lemma(q.rt))}</div><div style="margin-top:14px">${matrixHTML(q.t, {answer:true})}</div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="cChk">Kontrol et</button></div>`;
}
function bindCoklu(q){
  const cells = $$("#v-oyun .cell[data-i]"), paintSel = () => cells.forEach(c => c.classList.toggle("sel", G.cs.includes(+c.dataset.i)));
  paintSel();
  cells.forEach(c => c.onclick = () => { if (G.lock) return; const i = +c.dataset.i; const k = G.cs.indexOf(i); if (k > -1) G.cs.splice(k,1); else G.cs.push(i); paintSel(); });
  const k = $("#cChk"); if (k) k.onclick = () => { if (G.lock) return;
    const ok = G.cs.length === q.right.length && q.right.every(i => G.cs.includes(i));
    cells.forEach(c => { const i = +c.dataset.i; if (q.right.includes(i)) c.classList.add("good"); else if (G.cs.includes(i)) c.classList.add("bad"); });
    answer(ok); };
}
/* --- Fiil Destesi: kapalı kartlardan birini aç --- */
function desteHTML(q){
  G.c = G.c || {open:null};
  const n = q.segs.length, cards = q.segs.map((sg, k) => {
    const up = G.c.open === k;
    return `<button class="dk ${up ? "up" : G.c.open !== null ? "dim" : ""}" data-dk="${k}" ${G.c.open !== null ? "disabled" : ""} aria-label="${up ? esc(sg.ad) : "Kapalı kart " + (k+1)}">${up ? `<span class="ad">${esc(q.segs[q.sel].ad)}</span>` : `<span class="ar" style="font-size:1.6rem">؟</span>`}</button>`; }).join("");
  const deck = `<div class="deck">${cards}</div>`;
  if (G.c.open === null) return `<div class="q">Bir kart aç: çıkan kipe göre çekim yapacaksın</div><div class="small muted">Kök: <span class="ar" style="font-size:1.2rem">${esc(lemma(q.rt))}</span></div>${deck}`;
  return `${deck}<div class="q" style="margin-top:12px">Çıkan kip: <b>${esc(q.segs[q.sel].ad)}</b> · <span class="ar" style="font-size:1.6rem">${SIGA[q.i].z}</span> <span class="small muted">(${esc(SIGA[q.i].tr)})</span></div><div class="small muted">Kök: <span class="ar" style="font-size:1.2rem">${esc(lemma(q.rt))}</span></div><div class="opts">${q.opts.map((o,i)=>`<button class="opt ar" data-o="${i}">${esc(o)}</button>`).join("")}</div>`;
}
function bindDeste(q){
  $$("[data-dk]").forEach(b => b.onclick = () => { if (G.c.open !== null) return; G.c.open = +b.dataset.dk; draw(); });
}
/* --- Tabloyu Tamamla --- */
function fillHTML(q){
  G.f = G.f || {put:{}, sel:null}; const used = Object.values(G.f.put);
  const cell = i => {
    if (!q.blanks.includes(i)){ const w = fill(tableForm(q.t,i,q.rt), q.rt.r); return `<div class="cell"><span class="w">${paint(tableForm(q.t,i,q.rt), q.rt.r)}</span><span class="z">${SIGA[i].z} · ${i+1}</span></div>`; }
    const c = G.f.put[i]; return `<button class="cell slotc" data-fi="${i}"><span class="w">${c!==undefined ? paint(q.chips[c], q.rt.r) : "؟"}</span><span class="z">${SIGA[i].z} · ${i+1}</span></button>`;
  };
  const allow = i => i >= 0 && (!q.t.only || q.t.only.includes(i));
  const grid = `<div class="matrix"><div></div><div class="h">Müfred</div><div class="h">Tesniye</div><div class="h">Cem'</div>${ROWS.map(r => `<div class="rh">${figs(r.g, r.p)}<span>${r.tr}</span></div>` + r.idx.map(i => i < 0 ? `<div class="cell x"><span class="small">↔ نَحْنُ</span></div>` : !allow(i) ? `<div class="cell x"><span class="small">—</span></div>` : cell(i)).join("")).join("")}</div>`;
  return `<div class="q">Boş hücreleri tamamla: <b>${esc(q.t.tr)}</b> · <span class="ar" style="font-size:1.2rem">${esc(lemma(q.rt))}</span></div><div class="small muted">Aşağıdaki kelimeyi sürükleyip boş hücreye bırak; ya da kelimeye, sonra hücreye dokun. Yerleşmiş kelimeye dokunursan geri döner.</div><div style="margin-top:12px">${grid}</div><div class="tray" style="margin-top:14px">${q.chips.map((w,j)=>used.includes(j) ? "" : `<button data-fc="${j}" aria-pressed="${G.f.sel===j}">${paint(w, q.rt.r)}</button>`).join("")}</div>`;
}
function bindFill(q){
  const place = (i, j) => {
    G.f.put[i] = j; G.f.sel = null; draw();
    if (q.blanks.every(k => G.f.put[k] !== undefined)){
      const ok = q.blanks.every(k => q.chips[G.f.put[k]] === q.rights[k]);
      $$("[data-fi]").forEach(x => x.classList.add(q.chips[G.f.put[+x.dataset.fi]] === q.rights[+x.dataset.fi] ? "good" : "bad"));
      answer(ok);
    }
  };
  const under = (x, y) => { const e = document.elementFromPoint(x, y); return e ? e.closest("[data-fi]") : null; };
  $$("[data-fc]").forEach(b => {
    b.style.touchAction = "none";
    b.onclick = () => { if (b.dataset.dragged){ delete b.dataset.dragged; return; } if (G.lock) return; G.f.sel = +b.dataset.fc; draw(); };
    b.onpointerdown = e => {
      if (G.lock || (e.pointerType === "mouse" && e.button !== 0)) return;
      const sx = e.clientX, sy = e.clientY, j = +b.dataset.fc; let ghost = null, over = null, px = sx, py = sy, raf = 0;
      const tick = () => { if (!ghost) return; if (py < 80) scrollBy(0, -Math.ceil((80 - py)/5)); else if (py > innerHeight - 80) scrollBy(0, Math.ceil((py - (innerHeight - 80))/5));
        const t = under(px, py); if (over && over !== t) over.style.outline = ""; over = t; if (t) t.style.outline = "3px solid var(--gold)"; raf = requestAnimationFrame(tick); };
      const mv = ev => {
        px = ev.clientX; py = ev.clientY;
        if (!ghost){ if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 8) return; ghost = b.cloneNode(true); ghost.removeAttribute("data-fc"); ghost.style.cssText = "position:fixed;z-index:80;pointer-events:none;opacity:.92;transform:translate(-50%,-50%) scale(1.08);box-shadow:0 8px 24px rgb(0 0 0 / .35)"; document.body.appendChild(ghost); b.style.opacity = ".35"; raf = requestAnimationFrame(tick); }
        ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px";
      };
      const up = ev => {
        removeEventListener("pointermove", mv); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
        cancelAnimationFrame(raf); if (over) over.style.outline = "";
        if (!ghost) return; ghost.remove(); b.style.opacity = ""; b.dataset.dragged = "1"; setTimeout(() => { delete b.dataset.dragged; }, 400);
        const t = ev.type === "pointerup" ? under(ev.clientX, ev.clientY) : null; if (t) place(+t.dataset.fi, j);
      };
      addEventListener("pointermove", mv); addEventListener("pointerup", up); addEventListener("pointercancel", up);
    };
  });
  $$("[data-fi]").forEach(b => b.onclick = () => {
    if (G.lock) return; const i = +b.dataset.fi;
    if (G.f.sel !== null){ place(i, G.f.sel); return; }
    if (G.f.put[i] !== undefined){ delete G.f.put[i]; draw(); }
  });
}
/* --- Kelimeyi Diz --- */
function dizHTML(q){
  G.sel = G.sel || [];
  return `<div class="q">Parçalara sırayla dokunarak kelimeyi kur (okuma sırasıyla: sağdan sola)</div><div class="small muted">${esc(q.t.tr)} · <span class="ar">${SIGA[q.i].z}</span> · <span class="ar">${esc(lemma(q.rt))}</span></div>
  <div class="preview" style="margin:14px 0;min-height:2em;border-bottom:2px dashed var(--line)">${esc(G.sel.map(j=>q.parts[j]).join(""))}</div>
  <div class="letters">${q.order.map(j=>`<button data-dj="${j}" ${G.sel.includes(j)?"disabled style='opacity:.25'":""}>${esc(q.parts[j])}</button>`).join("")}</div>
  <div class="row" style="justify-content:center;margin-top:12px"><button class="btn ghost sm" id="dUndo">Geri al</button></div>`;
}
function bindDiz(q){
  $$("[data-dj]").forEach(b => b.onclick = () => { if (G.lock) return; G.sel.push(+b.dataset.dj); draw();
    if (G.sel.length === q.parts.length){ const w = G.sel.map(j=>q.parts[j]).join(""); answer(w === q.w.replace(/ /g,"")); } });
  const u = $("#dUndo"); if (u) u.onclick = () => { if (G.lock) return; G.sel.pop(); draw(); };
}
/* --- Eşli Kartlar --- */
function memHTML(q){
  G.m = G.m || {open:[], done:{}, moves:0, busy:false};
  return `<div class="q">Kelimeyi sîgasıyla eşleştir <span class="small muted">· ${esc(q.t.tr)} · ${esc(lemma(q.rt))} · hamle: ${G.m.moves} · yanlış: ${G.m.miss||0}</span></div><div class="memg">${q.cards.map((c,k)=>{ const up = G.m.open.includes(k) || G.m.done[c.p]; return `<button class="mc ${G.m.done[c.p]?"ok":up?"up":""}" data-mc="${k}">${up ? (c.t==="w" ? `<span class="ar" style="font-size:1.45rem;font-weight:700">${esc(c.c)}</span>` : `<span class="ar" style="font-size:1.3rem">${SIGA[c.c].z}</span><small>${esc(SIGA[c.c].tr)}</small>`) : "?"}</button>`; }).join("")}</div>`;
}
function bindMem(q){
  $$("[data-mc]").forEach(b => b.onclick = () => {
    if (G.lock || G.m.busy) return; const k = +b.dataset.mc, c = q.cards[k];
    if (G.m.done[c.p] || G.m.open.includes(k)) return;
    G.m.open.push(k);
    if (G.m.open.length < 2){ draw(); return; }
    G.m.moves++; const [a, z] = G.m.open.map(x => q.cards[x]);
    if (a.p === z.p && a.t !== z.t){
      G.m.done[a.p] = true; G.m.open = []; draw();
      if (Object.keys(G.m.done).length === q.cards.length/2){ const mm = G.m.miss||0; q.why = `${q.why} · ${G.m.moves} hamle, ${mm} yanlış eşleştirme`; answer(mm === 0 ? true : mm <= 3); }
    } else { G.wrong++; G.m.miss = (G.m.miss||0) + 1; G.m.busy = true; draw(); const me = G.q; setTimeout(() => { if (G && G.q === me && G.m){ G.m.open = []; G.m.busy = false; draw(); } }, 900); }
  });
}
function answer(ok){
  G.lock = true; G.ans = (G.ans||0) + 1; if (G.q.desc){ if (!ok) addMist(G.q.desc); else if (G.id === "tekrar") delMist(G.q.desc); }
  if (ok){ G.score++; addXp(5); beep("good"); } else { G.wrong++; beep("bad"); }
  const fb = $("#fb"); fb.className = "fb " + (ok?"good":"bad"); fb.innerHTML = `${ok?"Doğru!":"Olmadı."} <span class="${G.q.k==="root"?"":""}">${esc(G.q.why)}</span>`;
  if (G.timer) setTimeout(next, ok ? 400 : 1100); else { const n = $("#gNext"); n.hidden = false; n.focus(); }
}
function next(){ if (!G || G.done) return; G.i++; G.lock = false; G.b = null; G.c = null; G.f = null; G.m = null; G.d = null; G.cs = null; G.sel = null; G.pan = null; G.tilt = undefined; if (!G.timer && G.i >= G.n) return end(); G.q = makeQ(G.id); draw(); }
if (/[?&]test\b/.test(location.search)) window.__G = () => G; if (/[?&]test\b/.test(location.search)) window.__E = {makeQ, muh, ROOTS, babOf, fill, TABLES, FAIL, FAIL_TR, MEF_TR};
function end(){
  if (!G || G.done) return; G.done = true; clearInterval(G.iv); S.plays++; S.best[G.id] = Math.max(S.best[G.id]||0, G.score); save();
  const perfect = !G.wrong && G.score > 0 && G.score === G.ans; if (perfect || G.score >= 8){ confetti(); beep("win"); }
  const g = GAMES.find(x=>x.id===G.id), id = G.id;
  $("#v-oyun").innerHTML = `<div class="stage"><div class="panel done"><span class="eyebrow">${esc(g.tr)}</span><div class="score">${G.score}${G.timer?"":" / "+G.ans}</div><p>${G.timer?"60 saniyede "+G.score+" doğru"+(G.ans?" ("+G.ans+" cevaptan).":"."):!G.ans?"Hiç soru cevaplamadın.":perfect?"Hatasız!":"Bir tur daha atınca kalıplar oturur."}</p><p class="small muted">En iyi: ${S.best[id]}</p>
    <div class="row" style="justify-content:center"><button class="btn" id="gAgain">Tekrar oyna</button><button class="btn ghost" id="gHub">Oyun odası</button></div></div></div>`;
  $("#gAgain").onclick = () => start(id); $("#gHub").onclick = () => { G = null; renderHub(); };
}

/* ===================== REHBER ===================== */
function renderGuide(){
  const T = [
   ["Emsile","Örnekler. Sarfın ilk kitabı: bir kökün kalıplara dökülmüş hâllerini sıralar."],
   ["Emsile-i Muhtelife","Farklı örnekler: mâzi, muzâri, masdar, fâil, mef'ûl, nefy, nehy, emir, zaman-mekân, âlet… her biri bir kez."],
   ["Emsile-i Muttaride","Düzenli örnekler: her kalıbın 14 sîgası tablo hâlinde."],
   ["Binâ (Bâb)","Fiilin kalıp ailesi. Sülâsî mücerredde altı bâb vardır."],
   ["Kök (mâdde)","Kelimenin anlam taşıyan üç asıl harfi: fâ, ayn, lâm."],
   ["Mîzan","Ölçü: kalıp ف ع ل harfleriyle gösterilir. نَاصِرٌ'in mîzanı فَاعِلٌ'dir."],
   ["Zevâid","Köke kalıbın eklediği harfler: سَأَلْتُمُونِيهَا harfleri."],
   ["Sîga","Çekimdeki kişi-sayı-cinsiyet biçimi. Mâzi ve muzâride 14 sîga vardır."],
   ["Gâib / Muhatab / Mütekellim","Üçüncü şahıs / ikinci şahıs / birinci şahıs."],
   ["Müfred / Tesniye / Cem'","Tekil / ikil / çoğul."],
   ["Müzekker / Müennes","Eril / dişil."],
   ["Ma'lûm / Meçhûl","Etken / edilgen. Meçhulde mâzinin fâsı ötre, aynı esre olur."],
   ["Lâzım / Müteaddî","Geçişsiz / geçişli. Lâzım fiilin meçhulü ve ism-i mef'ûlü harf-i cerle yapılır."],
   ["Cahd","Olumsuz geçmiş: lem (mutlak), lemmâ (müstağrak, 'henüz')."],
   ["Nefy","Olumsuzlama: mâ (mâzi ve hâl), lâ (istikbâl), len (kesin istikbâl)."],
   ["Emr-i hâzır / gâib","Sen'e emir (اُنْصُرْ) / o'na emir, lâm ile (لِيَنْصُرْ)."],
   ["Nehy","Yasaklama: لَا تَنْصُرْ (yardım etme)."],
   ["Eteyne","Muzâri harfleri أ ت ي ن."]
  ];
  $("#v-rehber").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Rehber</span><h2>Sarfın temel kavramları</h2></div></div>
   <div class="gl">${T.map(([a,b])=>`<div class="panel"><b>${esc(a)}</b><br><span class="muted small">${esc(b)}</span></div>`).join("")}</div>
   <div class="sec-h"><h2>14 sîga ve zamirleri</h2></div>
   <div class="panel pad">${matrixHTML({f:()=>"", only:null}, {answer:true}).replace(/<button/g,"<div").replace(/<\/button>/g,"</div>")}</div>
   <div class="sec-h"><h2>Bu motor hakkında</h2></div>
   <div class="panel pad"><p style="margin-top:0">Çekimler kurallarla, sâlim (harf-i illet, hemze ve tad'îf bulunmayan) sülâsî kökler için üretilir. Masdar sülâsîde semâî olduğu için hazır köklerde kayıtlı masdar(lar) gösterilir; özel kökte bâbın en yaygın kalıpları “olası” diye önerilir. Bazı köklerde ses değişmeleri (ör. lâmı ت veya ن olan köklerde idğam) olabilir; kendi kökünü girerken bunu göz önünde tut. Mezîd bâblarda ses değişmesi gerektirmeyen örnek kökler seçildi.</p></div>`;
}

/* ===================== BAŞLAT ===================== */
applyTheme(); hud();
go((location.hash||"").slice(1) || "tezgah");
})();
