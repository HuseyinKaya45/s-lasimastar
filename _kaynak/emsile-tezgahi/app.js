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
let S = {xp:0, best:{}, sound:true, theme:"", root:"نصر", bab:1, miz:true, pas:false, col:true, plays:0, v:2};
try { const raw = localStorage.getItem(KEY); if (raw){ const o = JSON.parse(raw); Object.assign(S, o); if (!o.v){ S.pas = false; S.v = 2; } } } catch(e){}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} };
const toast = m => { const t = $("#toast"); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(()=>t.hidden=true, 2200); };
const hud = () => $("#hudXp").textContent = "★ " + S.xp;
const addXp = n => { S.xp += n; save(); hud(); };
let AC;
function beep(k){ if (!S.sound) return; try { AC = AC || new (window.AudioContext||window.webkitAudioContext)(); const seq = k==="good"?[587,784]:k==="bad"?[200,150]:[523,659,784,1046]; seq.forEach((f,i)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type=k==="bad"?"triangle":"sine"; o.frequency.value=f; const t=AC.currentTime+i*.09; g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.13,t+.02); g.gain.exponentialRampToValueAtTime(.0001,t+.16); o.connect(g).connect(AC.destination); o.start(t); o.stop(t+.18); }); } catch(e){} }
function confetti(){ if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; const c=$("#cf"), x=c.getContext("2d"); c.hidden=false; c.width=innerWidth; c.height=innerHeight; const cols=[getComputedStyle(document.documentElement).getPropertyValue("--rf"),getComputedStyle(document.documentElement).getPropertyValue("--ra"),getComputedStyle(document.documentElement).getPropertyValue("--rl"),getComputedStyle(document.documentElement).getPropertyValue("--gold")]; const P=Array.from({length:110},()=>({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*12,vy:-Math.random()*10-3,s:4+Math.random()*5,c:pick(cols),r:Math.random()*6})); let t=0; (function f(){ x.clearRect(0,0,c.width,c.height); P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore();}); if(++t<90) requestAnimationFrame(f); else c.hidden=true; })(); }
/* Seslendirme harekeli metinle yapılır (harekesiz metni okuyucu tahmin eder ve yanlış okur). Harekeli kayıt da cihazdaki Arapça ses de yoksa eski (harekesiz) kayda düşülür. */
function speak(t, onend){
  t = String(t).replace(/ · /g, "، ");
  if (typeof SES_AUDIO !== "undefined" && !SES_AUDIO[sesKey(t)] && !(SES_V || sesVoice()) && SES_AUDIO[sesKey(strip(t))]) t = strip(t);
  return sesPlay(t, onend, typeof toast==='function'?toast:null);
}
function applyTheme(){ if (S.theme) document.documentElement.setAttribute("data-theme", S.theme); else document.documentElement.removeAttribute("data-theme"); $("#tSound").setAttribute("aria-pressed", S.sound); }
$("#tTheme").onclick = () => { const light = S.theme ? S.theme==="light" : matchMedia("(prefers-color-scheme: light)").matches; S.theme = light ? "dark" : "light"; save(); applyTheme(); };
$("#tSound").onclick = () => { S.sound = !S.sound; save(); applyTheme(); };

/* ---------- aktif kök ---------- */
let R;
function setRoot(str, bab){
  const r = rootOf(str); const data = ROOTS.find(x => x.r === (r||[]).join(""));
  R = {r: r || ["ن","ص","ر"], data: data || null, b: babOf(data ? data.b : (bab || S.bab || 1))};
  R.locked = !!(data && bab && bab !== data.b);
  R.err = checkRoot(r);
  S.root = R.r.join(""); S.bab = R.b.id; save();
}
setRoot(S.root, S.bab);
const W = t => S.col ? paint(t, R.r) : esc(fill(t, R.r));
const Z = t => paint(t, MIZAN);
const lz = () => !!(R.data && R.data.lz);
const lemma = (rt=R) => fill(mzStem(rt.b) + V.a, rt.r) + " " + fill("يَ" + muStem(rt.b) + V.u, rt.r);

/* Emsile-i Muhtelife öğeleri */
function muh(rt=R){
  return MUH.map((m, i) => {
    const o = {i, id:m.id, tr:m.tr, ar:m.ar, d:m.d, g:m.g, pre:"", x:[]};
    if (m.masdar){ if (rt.data){ o.txt = masdarOf(rt.data).join(" · "); } else { o.guess = masdarGuess(rt); o.gt = MASDAR_KALIP[rt.b.id]; o.note = "Sülâsîde masdar semâîdir: bu kök programın listesinde yok. Gösterilenler bâbın en yaygın kalıplarıdır (olası); gerçek masdarı sözlükten doğrula."; } return o; }
    o.t = m.t(rt.b);
    if (m.id === "fail" && rt.b.id === 6 && rt.data && rt.data.sf){ o.txt = rt.data.sf; o.t = null; o.note = "Kerume bâbında ism-i fâil yerine sıfat-ı müşebbehe kullanılır."; }
    if (m.id === "mef" && rt.data && rt.data.lz){ o.note = rt.b.id === 6 ? "Kerume bâbı lâzımdır: ism-i mef'ûl kıyâsî kalıpla gösterilir ama bu fiillerde pek kullanılmaz; sıfat-ı müşebbehe tercih edilir." : "Lâzım (geçişsiz) fiilin ism-i mef'ûlü harf-i cerle birlikte kullanılır (مَجْلُوسٌ فِيهِ, مَخْرُوجٌ مِنْهُ gibi)."; }
    if (m.p && !(rt.data && rt.data.lz)) o.p = m.p();
    return o;
  });
}

/* ===================== YÖNLENDİRME ===================== */
const VIEWS = ["tezgah","muttaride","bablar","ezber","oyun","rehber","program"];
let VIEW = "tezgah";
function go(v){
  if (!VIEWS.includes(v)) v = "tezgah"; VIEW = v; stopChant();
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
  const s = e.target.closest("[data-say]"); if (s){ e.stopPropagation(); speak(s.dataset.say); return; }
});
addEventListener("hashchange", () => { const h = location.hash.slice(1); if (h && h !== VIEW) go(h); });
const render = () => ({tezgah:renderLoom, muttaride:renderTables, bablar:renderBabs, ezber:renderChant, oyun:renderHub, rehber:renderGuide})[VIEW]();

/* ---------- kök seçici ---------- */
function picker(){
  return `<div class="picker">
    <div class="rootin"><label class="small muted" for="rootIn">Kök</label><input id="rootIn" value="${esc(R.r.join(""))}" maxlength="5" aria-label="Üç harfli kök" autocomplete="off">
      <label class="small muted" for="babIn">Bâb</label><select id="babIn">${BABS.map(b=>`<option value="${b.id}" ${b.id===R.b.id?"selected":""}>${b.id}. ${b.ar} – ${b.tr}</option>`).join("")}</select></div>
    ${R.err ? `<div class="warn">${esc(R.err)}</div>` : R.data ? `<div class="small muted">Anlamı: <b style="color:var(--ink)">${esc(R.data.tr)}</b>${R.data.lz?" · lâzım (geçişsiz)":" · müteaddî (geçişli)"}</div>` : `<div class="small muted">Kendi kökünü çekiyorsun: masdar semâîdir; bâbın en yaygın kalıpları “olası masdar” diye önerilir (sözlükten doğrula). Lâzım/müteaddî bilgisi yok.</div>`}
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
  const mean = `<div class="small" style="color:var(--gold);margin-top:2px">${esc(R.r.join("")==="نصر" ? NASR_TR[o.id] : o.g)}</div>`;
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
      ${word?`<button class="btn ghost sm" data-say="${esc(o.pre + word)}" style="margin-top:10px">🔊 Dinle</button>`:""}
      ${R.r.join("")==="نصر" && NASR_TR[o.id] ? `<p style="margin:12px 0 0"><b>${esc(NASR_TR[o.id])}</b></p>` : `<p style="margin:12px 0 0"><b>${esc(o.g)}</b>${R.data ? ` <span class="small muted">· kök anlamı: ${esc(R.data.tr)}</span>` : ""}</p>`}</div>
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
      <div class="row"><div class="seg"><button aria-pressed="${S.miz}" id="tMiz2">Mîzan</button><button aria-pressed="${S.col}" id="tCol2">Renkler</button><button aria-pressed="${TBHIDE}" id="tHide">Kendini sına</button></div><button class="btn ghost sm" id="sayAll">🔊 Hepsini dinle</button><button class="btn ghost sm" id="tPrint">🖨 Boş çalışma kâğıdı</button></div></div>
    <p class="muted" style="margin-top:-6px">${TB==="fail"?"Yapan anlamında. Müfred, tesniye ve sâlim cemiler kıyâsîdir; teksîr cemileri (فُعَّلٌ، فُعَّالٌ، فَعَلَةٌ، فَوَاعِلُ) Emsile'de kalıp olarak sayılır, her kökte kullanılmaz.":TB==="mef"?"Yapılan anlamında: مَفْعُولٌ kalıbı.":esc(t.d)}</p>
    ${TB==="fail" ? `<div class="list">${FAIL.map((f,i)=>`<div class="cell"><span class="w">${W(f)}</span>${S.miz?`<span class="mz">${Z(f)}</span>`:""}<span class="z" style="font-family:var(--f-ui)">${esc(FAIL_TR[i])}</span></div>`).join("")}</div>`
      : TB==="mef" ? (`${lz() ? `<div class="panel pad" style="margin-bottom:12px">${R.b.id===6 ? "Kerume bâbı lâzımdır: kıyâsî kalıp gösterilir ama bu fiillerde ism-i mef'ûl pek kullanılmaz." : "Bu kök lâzım (geçişsiz): ism-i mef'ûl harf-i cerle birlikte kullanılır (مَجْلُوسٌ فِيهِ gibi)."}</div>` : ""}<div class="list">${MEF.map((f,i)=>`<div class="cell"><span class="w">${W(f)}</span>${S.miz?`<span class="mz">${Z(f)}</span>`:""}<span class="z" style="font-family:var(--f-ui)">${esc(MEF_TR[i])}</span></div>`).join("")}</div>`)
      : dis ? `<div class="panel pad">Bu kök lâzım (geçişsiz) olduğu için meçhulü doğrudan yapılmaz. Müteaddî bir kök seç (ör. نصر، ضرب، فتح).</div>` : matrixHTML(t)}
    <div class="panel pad" style="margin-top:18px"><span class="eyebrow">Hatırlatma</span><p style="margin:6px 0 0">Muzâri harfleri <b class="ar" style="font-size:1.15rem">أَتَيْنَ</b> (eteyne): <span class="ar">أَ</span> ben, <span class="ar">تَ</span> sen/o (kadın), <span class="ar">يَ</span> o (erkek), <span class="ar">نَ</span> biz. Aynı görünen sîgalar vardır: <span class="ar">تَنْصُرُ</span> hem 4. (o kadın) hem 7. (sen erkek) sîgadır.</p></div>`;
  bindPicker();
  $$("[data-tb]").forEach(b => b.onclick = () => { TB = b.dataset.tb; renderTables(); });
  $("#tMiz2").onclick = () => { S.miz = !S.miz; save(); renderTables(); };
  $("#tCol2").onclick = () => { S.col = !S.col; save(); renderTables(); };
  $("#tHide").onclick = () => { TBHIDE = !TBHIDE; renderTables(); };
  $("#tPrint").onclick = () => { document.body.classList.add("pb"); try { window.print(); } catch(e){} setTimeout(() => document.body.classList.remove("pb"), 600); };
  if (TBHIDE){ $$("#v-muttaride .cell:not(.x)").forEach(c => { c.classList.add("veil"); c.onclick = () => c.classList.toggle("open"); }); }
  $("#sayAll").onclick = () => { const forms = TB==="fail" ? FAIL : TB==="mef" ? MEF : SIGA.map((s,i)=>i).filter(i=>!t.only||t.only.includes(i)).map(i=>tableForm(t,i)); speak(forms.map(f=>fill(f,R.r)).join("، ")); };
}

/* ===================== BÂBLAR ===================== */
let MZB = "ifal", MZR = "كرم";
function renderBabs(){
  const mb = MAZID.find(x=>x.id===MZB); if (!mb.roots.includes(MZR)) MZR = mb.roots[0];
  const r = MZR.split("");
  const P = t => S.col ? paint(t, r) : esc(fill(t, r));
  $("#v-bablar").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Binâ</span><h2>Sülâsî mücerred: altı bâb</h2></div><span class="muted small">Bâbı, aynü'l-fiilin mâzi ve muzârideki harekesi belirler</span></div>
   <div class="babs">${BABS.map(b => { const ex = ROOTS.filter(x=>x.b===b.id); const rt = {r:ex[0].r.split(""), b, data:ex[0]};
     return `<div class="panel bab"><div class="row" style="justify-content:space-between"><span class="eyebrow">${b.id}. bâb · ${esc(b.tr)}</span><span class="ar muted">${b.vz}</span></div>
       <div class="big">${paint(mzStem(b)+V.a, rt.r)} ${paint("يَ"+muStem(b)+V.u, rt.r)}</div>
       <div class="dial"><div class="v">ـ${V[b.mz]}ـ<small>mâzi</small></div><span class="muted">→</span><div class="v">ـ${V[b.mu]}ـ<small>muzâri</small></div><span class="small muted" style="flex:1">${esc(b.note)}</span></div>
       <div class="rootchips">${ex.map(x=>`<button data-root="${x.r}" data-go="tezgah" title="${esc(x.tr)}">${x.r}</button>`).join("")}</div></div>`; }).join("")}</div>
   <div class="sec-h"><div><span class="eyebrow">Sülâsî mezîd</span><h2>Mezîd bâblar</h2></div><span class="muted small">Köke harf eklenerek yeni anlamlar</span></div>
   <div class="seg">${MAZID.map(x=>`<button aria-pressed="${x.id===MZB}" data-mb="${x.id}">${esc(x.tr)}</button>`).join("")}</div>
   <div class="panel pad" style="margin-top:14px">
     <div class="row" style="justify-content:space-between"><div><h2 style="font-size:1.4rem">${esc(mb.tr)} <span class="ar" style="font-size:1.3rem">${mb.ar}</span></h2><div class="ar muted" style="font-size:1.2rem">${mb.vz}</div></div>
       <div class="rootchips">${mb.roots.map(x=>`<button data-mr="${x}" aria-pressed="${x===MZR}">${x}</button>`).join("")}</div></div>
     <p>${esc(mb.m)} <b>${esc(r.join(" "))}</b>: ${esc((MZ_MEAN_BY[mb.id]||{})[MZR]||"")}</p>
     <div class="mzgrid">${Object.keys(MZ_TR).map(k => mb.f[k] ? `<div class="cell"><span class="z" style="font-family:var(--f-ui)">${MZ_TR[k]}</span><span class="w">${P(mb.f[k])}</span><span class="mz">${Z(mb.f[k])}</span><button class="btn ghost sm" style="align-self:center;margin-top:4px" data-say="${esc(fill(mb.f[k], r))}">🔊</button></div>` : `<div class="cell x"><span class="z" style="font-family:var(--f-ui)">${MZ_TR[k]}</span><span class="small">yok (lâzım)</span></div>`).join("")}</div>
     <p class="small muted" style="margin-bottom:0">Gri harfler bu bâbın köke eklediği harflerdir: ${esc(mb.tr)} bâbının imzası.</p>
   </div>`;
  $$("[data-mb]").forEach(b => b.onclick = () => { MZB = b.dataset.mb; renderBabs(); });
  $$("[data-mr]").forEach(b => b.onclick = () => { MZR = b.dataset.mr; renderBabs(); });
}

/* ===================== EZBER ===================== */
let CH = {on:false, i:-1, hide:false, speed:1, voice:true, t:null};
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
function stopChant(){ CH.on = false; clearTimeout(CH.t); sesStop(); }
function renderChant(){
  const items = chantItems();
  $("#v-ezber").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Ezber halkası</span><h2>Emsile'yi ritimle oku</h2></div><span class="muted small">Medresedeki gibi: 24 sîga sırayla</span></div>
   <div class="panel pad">${picker()}</div>
   <div class="row" style="margin:16px 0"><button class="btn" id="cPlay">${CH.on?"Durdur":"▶ Okumaya başla"}</button>
     <div class="seg"><button aria-pressed="${CH.speed===1.4}" data-sp="1.4">Yavaş</button><button aria-pressed="${CH.speed===1}" data-sp="1">Normal</button><button aria-pressed="${CH.speed===.7}" data-sp=".7">Hızlı</button></div>
     <div class="seg"><button aria-pressed="${CH.voice}" id="cVoice">Sesli</button><button aria-pressed="${CH.hide}" id="cHide">Kendini sına</button></div></div>
   ${CH.hide?`<p class="small muted">Kendini sına: kalıplar gizli. Sıradakini ezberden söyle, sonra dokunarak kontrol et.</p>`:""}
   <div class="panel pad chant" id="chant">${items.map((x,i)=>`<span class="it ${CH.hide?"hid":""} ${i===CH.i?"on":""}" data-ci="${i}" title="${esc(x.tr)}">${x.h}</span>`).join(" ")}</div>
   <p class="small muted" style="margin-top:10px">${items.length} parça · bir parçaya dokununca o parçadan okunur.</p>`;
  bindPicker();
  const step = () => {
    if (!CH.on) return; const its = $$("#chant .it");
    its.forEach(x => x.classList.remove("on")); CH.i++;
    if (CH.i >= its.length){ CH.on = false; CH.i = -1; $("#cPlay").textContent = "▶ Baştan oku"; beep("win"); addXp(10); return; }
    const el = its[CH.i]; el.classList.add("on"); el.classList.add("open"); el.scrollIntoView({block:"nearest", behavior:"smooth"});
    const next = () => { CH.t = setTimeout(step, 250 * CH.speed); };
    if (CH.voice) speak(items[CH.i].s, next); else CH.t = setTimeout(step, 1500 * CH.speed);
  };
  $("#cPlay").onclick = () => { if (CH.on){ stopChant(); $("#cPlay").textContent = "▶ Devam et"; } else { CH.on = true; if (CH.i >= items.length-1) CH.i = -1; CH.i--; if (CH.i < -1) CH.i = -1; $("#cPlay").textContent = "Durdur"; step(); } };
  $$("[data-sp]").forEach(b => b.onclick = () => { CH.speed = +b.dataset.sp; $$("[data-sp]").forEach(x=>x.setAttribute("aria-pressed", x===b)); });
  $("#cVoice").onclick = () => { CH.voice = !CH.voice; $("#cVoice").setAttribute("aria-pressed", CH.voice); };
  $("#cHide").onclick = () => { CH.hide = !CH.hide; stopChant(); renderChant(); };
  $$("#chant .it").forEach(el => el.onclick = () => { if (CH.hide && !el.classList.contains("open")){ el.classList.add("open"); return; } stopChant(); CH.i = +el.dataset.ci - 1; CH.on = true; $("#cPlay").textContent = "Durdur"; step(); });
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
 {id:"doldur", ico:"▢", tr:"Tabloyu Tamamla", d:"Boş hücrelere doğru çekimleri yerleştir."},
 {id:"diz", ico:"ن‑ص‑ر", tr:"Kelimeyi Diz", d:"Karışık harf parçalarına sırayla dokunarak çekimi kur."},
 {id:"hafiza", ico:"🃏", tr:"Eşli Kartlar", d:"Kelimeyi sîgasıyla eşleştir (hafıza oyunu)."},
 {id:"karma", ico:"★", tr:"Karma Antrenman", d:"Bütün soru türlerinden 15 soru; günlük çalışma için."}
];
function mutate(w, valid){
  const M = "َُِْ"; const idx = [...w].map((c,i)=> M.includes(c) && w[i-1]!=="ّ" && w[i+1]!=="ّ" ? i : -1).filter(i=>i>=0);
  for (let n=0;n<40 && idx.length;n++){ const i = pick(idx); const rp = pick([...M].filter(c=>c!==w[i])); const out = w.slice(0,i)+rp+w.slice(i+1); if (out!==w && !valid.includes(out)) return out; }
  return w.replace(/[َُِ]/, c => c==="َ" ? "ُ" : "َ");
}
const RT = () => { const d = pick(ROOTS); return {r:d.r.split(""), b:babOf(d.b), data:d}; };
let G = null;
function renderHub(){
  if (G && !G.done){ draw(); return; }
  $("#v-oyun").innerHTML = `<div class="sec-h" style="margin-top:0"><div><span class="eyebrow">Oyun odası</span><h2>Çekimi oynayarak pekiştir</h2></div><span class="muted small">Sorular ${ROOTS.length} kökten her seferinde yeniden üretilir</span></div>
   <div class="hub">${GAMES.map(g=>`<button class="gcard" data-g="${g.id}"><span class="ico">${g.ico}</span><h3>${g.tr}</h3><span class="muted small">${g.d}</span>${S.best[g.id]?`<span class="chip best">En iyi ${S.best[g.id]}</span>`:""}</button>`).join("")}</div>`;
  $$("[data-g]").forEach(b => b.onclick = () => start(b.dataset.g));
}
function makeQ(id){
  const rt = RT();
  const muz = TABLES.filter(t => !(t.pas && rt.data.lz));
  const okI = t => SIGA.map((s,i)=>i).filter(i=>!t.only||t.only.includes(i));
  if (id === "karma") return makeQ(pick(["siga","insaat","terazi","kok","bab","zincir","hizli","masdar","sigaK","hata","doldur","diz"]));
  if (id === "masdar"){
    const mkRt = d => ({r:d.r.split(""), b:babOf(d.b), data:d});
    const pool = ROOTS.filter(x => x.r !== rt.data.r);
    if (Math.random() < .6){
      const mine = masdarOf(rt.data), right = rt.data.ms;
      const opts = shuffle([right, ...shuffle(uniq(pool.map(x=>x.ms)).filter(x=>!mine.includes(x))).slice(0,3)]);
      return {k:"opt", rt, html:`<div class="q">Bu fiilin masdarı hangisi? <span class="small muted">(${esc(rt.data.tr)})</span></div><div class="w">${paint(mzStem(rt.b)+V.a, rt.r)} ${paint("يَ"+muStem(rt.b)+V.u, rt.r)}</div>`, opts, right, ar:true, why:`${lemma(rt)} → ${mine.join(" · ")}${mine.length>1?" (birden çok masdarı vardır)":""}`};
    }
    const right = lemma(rt);
    const opts = shuffle([right, ...shuffle(uniq(pool.map(x=>lemma(mkRt(x)))).filter(x=>x!==right)).slice(0,3)]);
    return {k:"opt", rt, html:`<div class="q">Bu masdar hangi fiilindir?</div><div class="w">${esc(rt.data.ms)}</div>`, opts, right, ar:true, why:`${rt.data.ms} → ${right} (${rt.data.tr})`};
  }
  if (id === "sigaK"){
    const t = pick(muz), ok = okI(t), i = pick(ok), right = fill(t.f(rt.b,i), rt.r);
    const other = uniq([...ok.filter(j=>j!==i).map(j=>fill(t.f(rt.b,j), rt.r)), ...muz.filter(x=>x.id!==t.id && (!x.only||x.only.includes(i))).map(x=>fill(x.f(rt.b,i), rt.r))]).filter(x=>x!==right);
    const opts = shuffle([right, ...shuffle(other).slice(0,3)]);
    return {k:"opt", rt, html:`<div class="q">Doğru çekimi bul: <b>${esc(t.tr)}</b></div><div class="w" style="font-size:2.2rem">${SIGA[i].z}</div><div class="small muted">${esc(SIGA[i].tr)} · ${esc(lemma(rt))}</div>`, opts, right, ar:true, why:`${t.tr} · ${SIGA[i].z}: ${right}`};
  }
  if (id === "hata"){
    const t = pick(muz.filter(x=>["mazi","muz","lem","len","nehy","maziP","muzP","nun"].includes(x.id))), ok = okI(t);
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
  if (id === "terazi"){ const pool = muh(rt).filter(o=>o.t); const o = pick(pool); const right = fill(o.t, MIZAN); const others = uniq(MUH.filter(m=>m.t).map(m=>fill(m.t(rt.b), MIZAN)).concat(FAIL.map(f=>fill(f,MIZAN)), MEF.map(f=>fill(f,MIZAN)))).filter(x=>x!==right); return {k:"scale", rt, o, w: fill(o.t, rt.r), opts: shuffle([right, ...shuffle(others).slice(0,3)]), right, why:`${o.tr}: ${fill(o.t, MIZAN)}`}; }
  if (id === "kok"){ const pool = muh(rt).filter(o=>o.t).concat(TABLES.filter(t=>!t.pas).map(t=>({t:t.f(rt.b, pick((t.only||[0,1,2,3,4,5,6,7,8,9,10,11,12,13]))), tr:t.tr}))); const o = pick(pool); const cl = clusters(o.t).filter(c => c.s !== " "); return {k:"root", rt, w: fill(o.t, rt.r), letters: cl.map(c => fill(c.s, rt.r)), base: cl.map(c => fill(c.s[0], rt.r)), why:`Kök: ${rt.r.join(" ")} · ${o.tr}`}; }
  if (id === "bab"){ const right = rt.b.id; return {k:"opt", rt, html:`<div class="q">Bu kökün bâbı hangisi?</div><div class="w">${paint(mzStem(rt.b)+V.a, rt.r)} ${paint("يَ"+muStem(rt.b)+V.u, rt.r)}</div><div class="small muted">${esc(rt.data.tr)}</div>`, opts: BABS.map(b=>b.ar), right: rt.b.ar, ar:true, why:`${rt.b.ar} – ${rt.b.tr} (${rt.b.vz})`}; }
  if (id === "zincir"){ const seq = chantItems(rt); const k = 1 + Math.floor(Math.random()*(seq.length-2)); const right = seq[k].s; const opts = shuffle([right, ...shuffle(seq.filter((x,j)=>j!==k && x.s!==right).map(x=>x.s)).slice(0,3)]); return {k:"opt", rt, html:`<div class="q">Zincirde sıradaki halka hangisi?</div><div class="ar" style="font-size:1.6rem;line-height:2">${seq.slice(Math.max(0,k-3),k).map(x=>esc(x.s)).join(" · ")} · <span style="color:var(--gold)">؟</span></div>`, opts, right, ar:true, why:`${seq[k].tr}: ${right}`}; }
  if (id === "hizli"){ const pool = muh(rt).filter(o=>o.t); const o = pick(pool); const right = fill(o.t, rt.r); const opts = shuffle([right, ...shuffle(uniq(pool.filter(x=>x!==o).map(x=>fill(x.t, rt.r))).filter(x=>x!==right)).slice(0,3)]); return {k:"opt", rt, html:`<div class="q"><b>${esc(o.tr)}</b> <span class="ar muted">${o.ar}</span></div><div class="ar muted" style="font-size:1.4rem">${esc(lemma(rt))}</div>`, opts, right, ar:true, why:`${o.tr}: ${right}`}; }
}
function start(id){ G = {id, i:0, n: id==="hizli" ? 999 : id==="hafiza" ? 1 : id==="karma" ? 15 : 10, score:0, wrong:0, q:makeQ(id), lock:false, timer: id==="hizli" ? 60 : 0}; if (G.timer){ G.t0 = Date.now(); G.iv = setInterval(() => { const left = Math.max(0, G.timer - Math.floor((Date.now()-G.t0)/1000)); const e = $("#gT"); if (e) e.textContent = left + " sn"; if (!left) end(); }, 250); } go("oyun"); }
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
      <div class="opts">${q.opts.map((o,i)=>`<button class="opt ar" data-o="${i}">${esc(o)}</button>`).join("")}</div>`;
  if (q.k === "root"){ G.sel = G.sel || []; body = `<div class="q">Kökün harflerini sırayla seç: önce <b class="rf">fâ</b>, sonra <b class="ra">ayn</b>, sonra <b class="rl">lâm</b></div><div class="w mono">${esc(q.w)}</div>
      <div class="letters">${q.letters.map((l,i)=>`<button data-l="${i}" class="${G.sel.indexOf(i)>-1?"p"+(G.sel.indexOf(i)+1):""}">${esc(l)}</button>`).join("")}</div>`; }
  if (q.k === "opt") body = `${q.html}<div class="opts">${q.opts.map((o,i)=>`<button class="opt ${q.ar?"ar":""}" data-o="${i}">${esc(o)}</button>`).join("")}</div>`;
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
  if (q.k === "opt") $$("[data-o]").forEach(b => b.onclick = () => { if (G.lock) return; const ok = q.opts[+b.dataset.o] === q.right; $$("[data-o]").forEach(x=>{ x.disabled = true; if (q.opts[+x.dataset.o]===q.right) x.classList.add("good"); }); if (!ok) b.classList.add("bad"); answer(ok); });
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
  return `<div class="q">Boş hücreleri tamamla: <b>${esc(q.t.tr)}</b> · <span class="ar" style="font-size:1.2rem">${esc(lemma(q.rt))}</span></div><div class="small muted">Önce aşağıdan bir kelime seç, sonra boş hücreye dokun. Yerleşmiş kelimeye dokunursan geri döner.</div><div style="margin-top:12px">${grid}</div><div class="tray" style="margin-top:14px">${q.chips.map((w,j)=>used.includes(j) ? "" : `<button data-fc="${j}" aria-pressed="${G.f.sel===j}">${paint(w, q.rt.r)}</button>`).join("")}</div>`;
}
function bindFill(q){
  $$("[data-fc]").forEach(b => b.onclick = () => { if (G.lock) return; G.f.sel = +b.dataset.fc; draw(); });
  $$("[data-fi]").forEach(b => b.onclick = () => {
    if (G.lock) return; const i = +b.dataset.fi;
    if (G.f.sel !== null){ G.f.put[i] = G.f.sel; G.f.sel = null; }
    else if (G.f.put[i] !== undefined){ delete G.f.put[i]; }
    else return;
    draw();
    if (q.blanks.every(k => G.f.put[k] !== undefined)){
      const ok = q.blanks.every(k => q.chips[G.f.put[k]] === q.rights[k]);
      $$("[data-fi]").forEach(x => x.classList.add(q.chips[G.f.put[+x.dataset.fi]] === q.rights[+x.dataset.fi] ? "good" : "bad"));
      answer(ok);
    }
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
  return `<div class="q">Kelimeyi sîgasıyla eşleştir <span class="small muted">· ${esc(q.t.tr)} · ${esc(lemma(q.rt))} · hamle: ${G.m.moves}</span></div><div class="memg">${q.cards.map((c,k)=>{ const up = G.m.open.includes(k) || G.m.done[c.p]; return `<button class="mc ${G.m.done[c.p]?"ok":up?"up":""}" data-mc="${k}">${up ? (c.t==="w" ? `<span class="ar" style="font-size:1.45rem;font-weight:700">${esc(c.c)}</span>` : `<span class="ar" style="font-size:1.3rem">${SIGA[c.c].z}</span><small>${esc(SIGA[c.c].tr)}</small>`) : "?"}</button>`; }).join("")}</div>`;
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
      if (Object.keys(G.m.done).length === q.cards.length/2) answer(true);
    } else { G.m.busy = true; draw(); const me = G.q; setTimeout(() => { if (G && G.q === me && G.m){ G.m.open = []; G.m.busy = false; draw(); } }, 900); }
  });
}
function answer(ok){
  G.lock = true; if (ok){ G.score++; addXp(5); beep("good"); } else { G.wrong++; beep("bad"); }
  const fb = $("#fb"); fb.className = "fb " + (ok?"good":"bad"); fb.innerHTML = `${ok?"Doğru!":"Olmadı."} <span class="${G.q.k==="root"?"":""}">${esc(G.q.why)}</span>`;
  if (G.timer) setTimeout(next, ok ? 400 : 1100); else { const n = $("#gNext"); n.hidden = false; n.focus(); }
}
function next(){ if (!G || G.done) return; G.i++; G.lock = false; G.b = null; G.f = null; G.m = null; G.sel = null; G.pan = null; G.tilt = undefined; if (!G.timer && G.i >= G.n) return end(); G.q = makeQ(G.id); draw(); }
if (/[?&]test\b/.test(location.search)) window.__G = () => G;
function end(){
  if (!G || G.done) return; G.done = true; clearInterval(G.iv); S.plays++; S.best[G.id] = Math.max(S.best[G.id]||0, G.score); save();
  const perfect = !G.wrong && G.score > 0; if (perfect || G.score >= 8){ confetti(); beep("win"); }
  const g = GAMES.find(x=>x.id===G.id), id = G.id;
  $("#v-oyun").innerHTML = `<div class="stage"><div class="panel done"><span class="eyebrow">${esc(g.tr)}</span><div class="score">${G.score}${G.timer?"":" / "+G.i}</div><p>${G.timer?"60 saniyede "+G.score+" doğru.":perfect?"Hatasız!":"Bir tur daha atınca kalıplar oturur."}</p><p class="small muted">En iyi: ${S.best[id]}</p>
    <div class="row" style="justify-content:center"><button class="btn" id="gAgain">Tekrar oyna</button><button class="btn ghost" id="gHub">Oyun odası</button></div></div></div>`;
  $("#gAgain").onclick = () => start(id); $("#gHub").onclick = () => { G = null; renderHub(); };
}

/* ===================== REHBER ===================== */
function renderGuide(){
  const T = [
   ["Emsile","Örnekler. Sarfın ilk kitabı: bir kökün kalıplara dökülmüş hâllerini sıralar."],
   ["Emsile-i Muhtelife","Farklı örnekler: mâzi, muzâri, masdar, fâil, mef'ûl, nefy, nehy, emir, zaman-mekân, âlet… her biri bir kez."],
   ["Emsile-i Muttaride","Düzenli örnekler: her kalıbın 14 sîgası tablo hâlinde."],
   ["Binâ (Bâb)","Fiilin kalıp ailesi. Sülâsî mücerredde altı bâb; mezîdde ilave harfli bâblar."],
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
   ["Te'kîd nûnu","Sakîle (şeddeli نَّ) ve hafîfe (sâkin نْ): mutlaka anlamı katar."],
   ["Emr-i hâzır / gâib","Sen'e emir (اُنْصُرْ) / o'na emir, lâm ile (لِيَنْصُرْ)."],
   ["Nehy","Yasaklama: لَا تَنْصُرْ (yardım etme)."],
   ["Eteyne","Muzâri harfleri أ ت ي ن."],
   ["Sülâsî mücerred / mezîd","İlavesiz üç harfli / harf eklenmiş üç harfli fiil."]
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
