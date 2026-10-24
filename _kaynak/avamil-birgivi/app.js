/* ===================== UYGULAMA ===================== */
(function(){
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const toAr = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);

/* ---------- kısaltmaları aç ---------- */
function expand(s){ if (typeof s !== "string") return s; let out = s; for (const k in ABBR) out = out.split(k).join(ABBR[k]); return out; }
function deepExpand(o){
  if (Array.isArray(o)) return o.map(deepExpand);
  if (o && typeof o === "object"){ const r={}; for (const k in o) r[k]=deepExpand(o[k]); return r; }
  return expand(o);
}
const BABS = [BAB1, BAB2, BAB3].map(deepExpand);

/* ---------- Arapça normalizasyon ---------- */
const HAR = /[ً-ٰٟۖ-ۭـ]/g;
const strip = s => String(s).replace(HAR, "");
const norm = s => strip(s).replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/[«»()؟?!.,،؛:\-\[\]﴿﴾]/g,"").trim();
const normTr = s => String(s).toLocaleLowerCase("tr").replace(/[âä]/g,"a").replace(/[îı]/g,"i").replace(/[ûü]/g,"u").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ç/g,"c").replace(/ğ/g,"g").replace(/[''`]/g,"");

/* ---------- düz liste ---------- */
const ITEMS = []; const BYID = {};
BABS.forEach(b => b.groups.forEach(g => g.items.forEach(it => {
  const rec = {it, g, b, idx: ITEMS.length};
  ITEMS.push(rec); BYID[it.id] = rec;
})));
const amilNo = {}; let c1 = 0; BABS[0].groups.forEach(g => g.items.forEach(it => amilNo[it.id] = ++c1));
const mamulNo = {}; let c2 = 0; BABS[1].groups.forEach(g => g.items.forEach(it => mamulNo[it.id] = ++c2));

/* ---------- kalıcı durum ---------- */
const KEY = "avamil-birgivi-v1";
const DEF = {learned:{}, notes:{}, stars:{}, box:{}, hist:[], last:"a1", s:{har:true, scale:1, theme:""}};
let S = DEF;
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign({}, DEF, JSON.parse(raw)); S.s = Object.assign({}, DEF.s, S.s||{}); } catch(e){}
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }

function toast(msg){ const t=$("#toast"); t.textContent=msg; t.hidden=false; clearTimeout(toast._t); toast._t=setTimeout(()=>t.hidden=true, 2200); }

/* ---------- görünüm ayarları ---------- */
function A(s){ return S.s.har ? s : strip(s); }
function applySettings(){
  document.documentElement.style.setProperty("--ar-scale", S.s.scale);
  if (S.s.theme) document.documentElement.setAttribute("data-theme", S.s.theme); else document.documentElement.removeAttribute("data-theme");
  $("#tHarakat").setAttribute("aria-pressed", S.s.har ? "true" : "false");
}
$("#tHarakat").onclick = () => { S.s.har = !S.s.har; save(); applySettings(); rerender(); toast(S.s.har ? "Harekeler gösteriliyor" : "Harekeler gizlendi (okuma alıştırması)"); };
$("#tSize").onclick = () => { const steps=[0.85,1,1.15,1.3]; const i=steps.indexOf(S.s.scale); S.s.scale = steps[(i+1)%steps.length]; save(); applySettings(); toast("Arapça boyut: %"+Math.round(S.s.scale*100)); };
$("#tTheme").onclick = () => {
  const dark = S.s.theme ? S.s.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  S.s.theme = dark ? "light" : "dark"; save(); applySettings();
};

/* ---------- amel yardımcıları ---------- */
function amelInfo(code){
  if (!code) return {tr:"—", ar:"", c:"none"};
  const mah = code.endsWith("*"); const base = AMEL[code.replace("*","")] || {tr:code, ar:code, c:"none"};
  return mah ? {tr: base.tr.split(" (")[0] + " (mahallen)", ar: base.ar + " مَحَلًّا", c: base.c} : base;
}
function amelPill(code){ if (code==="tabi") return `<span class="pill tabi">Tâbi' – metbû'una uyar</span>`; const a = amelInfo(code); return `<span class="pill ${a.c}">${esc(a.tr)}</span>`; }

/* ---------- terim ipuçları ---------- */
const termRe = (() => {
  const parts = TERMS.map(([ar]) => strip(ar)).filter(Boolean)
    .sort((a,b)=>b.length-a.length)
    .map(t => t.split("").map(ch => ch===" " ? "\\s+" : ch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&") + "[\\u064B-\\u065F\\u0670]*").join(""));
  return new RegExp("(" + parts.join("|") + ")", "g");
})();
const termMap = {}; TERMS.forEach(([ar,tr]) => { const k = strip(ar).replace(/\s+/g," "); if (!termMap[k]) termMap[k]=tr; });
function glossify(text){
  const t = A(text);
  let out = "", last = 0;
  t.replace(termRe, (m, _g, off) => {
    out += esc(t.slice(last, off));
    const tr = termMap[strip(m).replace(/\s+/g," ")] || "";
    out += `<span class="term" tabindex="0" data-tr="${esc(tr)}">${esc(m)}</span>`;
    last = off + m.length; return m;
  });
  return out + esc(t.slice(last));
}
function irabHTML(word, text){
  return `<b>${esc(A(word))}:</b> ${glossify(text)}`;
}

/* ---------- cümle işaretleme ---------- */
function marks(ex, amelCode){
  const s = ex.s; const R = [];
  let firstA = -1;
  (ex.a||[]).forEach(a => {
    let i = s.indexOf(a);
    while (i > -1){ const ws = s.lastIndexOf(" ", i-1) + 1; if (i - ws <= 2){ R.push({s:i, e:i+a.length, r:"a"}); if (firstA<0||i<firstA) firstA=i; } i = s.indexOf(a, i+a.length); }
  });
  let ptr = firstA > -1 ? firstA : 0;
  const rowAmels = (ex.rows||[]).map(r => r[2]);
  (ex.m||[]).forEach((m, k) => {
    let i = ex.mLast ? s.lastIndexOf(m) : s.indexOf(m, ptr);
    if (i < 0) i = s.indexOf(m);
    if (i < 0) return;
    // âmil aralığıyla çakışmayan ilk konumu bul
    while (i > -1 && R.some(r => r.r==="a" && i < r.e && i+m.length > r.s && !(r.s===i && r.e===i+m.length && false))){ const nx = s.indexOf(m, i+1); if (nx<0) break; i = nx; }
    let code = ex.case || rowAmels[k] || amelCode || "";
    if (code === "all") code = "";
    if (code === "in") code = k===0 ? "nasb" : "raf";
    if (code === "ls") code = k===0 ? "raf" : "nasb";
    if (code === "j2") code = "jazm";
    if (code === "rn") code = k===0 ? "raf" : "nasb";
    R.push({s:i, e:i+m.length, r:"m", c: amelInfo(code).c});
    ptr = i + m.length;
  });
  return R;
}
function sentenceHTML(ex, amelCode, opts={}){
  const s = ex.s, R = marks(ex, amelCode);
  const words = []; let pos = 0;
  s.split(" ").forEach((w, wi) => { words.push({w, s:pos, e:pos+w.length, i:wi}); pos += w.length + 1; });
  return words.map(wd => {
    let html = "", cur = wd.s;
    const segs = R.filter(r => r.s < wd.e && r.e > wd.s).sort((a,b)=> a.s-b.s || (a.r==="a"?-1:1));
    segs.forEach(r => {
      const a = Math.max(r.s, wd.s), b = Math.min(r.e, wd.e);
      if (a < cur) return;
      html += esc(A(s.slice(cur, a)));
      const cls = r.r==="a" ? "am" : "mm " + r.c;
      html += `<span class="${cls}">${esc(A(s.slice(a,b)))}</span>`;
      cur = b;
    });
    html += esc(A(s.slice(cur, wd.e)));
    return opts.plain ? html : `<span class="w" tabindex="0" data-w="${esc(wd.w)}">${html}</span>`;
  }).join(" ");
}
function matchIr(ex, word){
  const nw = norm(word);
  return (ex.ir||[]).map((r,i)=>({r,i})).filter(({r}) => { const k = norm(r[0]); return k===nw || (k.length>1 && nw.includes(k)) || (nw.length>2 && k.includes(nw)); });
}

/* ---------- konuşma ---------- */
function speak(text){ sesPlay(text, null, toast); }

/* ===================== YÖNLENDİRME ===================== */
let VIEW = "ana";
const VIEWS = ["ana","ders","metin","kart","sinav","sozluk","hakkinda","program"];
function go(view, id, push=true){
  if (BYID[view]) { id = view; view = "ders"; }
  if (!VIEWS.includes(view)) view = "ana";
  VIEW = view;
  if (view==="ders"){ if (id && BYID[id]) S.last = id; save(); }
  VIEWS.forEach(v => $("#v-"+v).hidden = v!==view);
  $$(".nav button").forEach(b => b.setAttribute("aria-current", b.dataset.view===view ? "page" : "false"));
  render(view);
  if (push){ const h = view==="ders" ? S.last : view; try { history.replaceState(null, "", "#"+h); } catch(e){} }
  window.scrollTo({top:0});
}
$$(".nav button").forEach(b => b.onclick = () => go(b.dataset.view));
document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]"); if (g){ e.preventDefault(); go(g.dataset.go, g.dataset.id); }
});
function render(v){ ({ana:renderHome, ders:renderLesson, metin:renderReader, kart:renderCards, sinav:renderQuiz, sozluk:renderDict, hakkinda:renderAbout, program:()=>{}})[v](); }
function rerender(){ render(VIEW); }

/* ===================== ANA SAYFA ===================== */
function progress(bi){ const its = ITEMS.filter(r => r.b.no===bi); const d = its.filter(r => S.learned[r.it.id]).length; return {d, n:its.length}; }
function renderHome(){
  const cells = [];
  const short = ar => { const w = strip(ar.split(" (")[0]).split(" "); return w.slice(0, 2).join(" "); };
  ITEMS.filter(r=>r.b.no===1).forEach(r => cells.push({cls:"amil", id:r.it.id, t:r.it.tr, lb:short(r.it.ar)}));
  ITEMS.filter(r=>r.b.no===2).forEach(r => cells.push({cls:"mamul", id:r.it.id, t:r.it.tr, lb:short(r.it.ar)}));
  BABS[2].alamat.forEach((a,i) => cells.push({cls:"irab", id: ["i1_1","i1_1","i1_1","i2_1","i2_1","i2_3","i4_1","i3_1","i3_2","i4_1"][i], t:"İ'râb alâmeti: "+a.tr, lb:short(a.ar), done: S.learned[["i1_1","i1_1","i1_1","i2_1","i2_1","i2_3","i4_1","i3_1","i3_2","i4_1"][i]]}));
  const P = [1,2,3].map(progress);
  const totalD = ITEMS.filter(r=>S.learned[r.it.id]).length;
  const hist = S.hist.slice(-12);
  const starred = Object.keys(S.stars).filter(k=>S.stars[k] && BYID[k]);
  const noted = Object.keys(S.notes).filter(k=>S.notes[k] && S.notes[k].trim() && BYID[k]);
  const lastRec = BYID[S.last] || ITEMS[0];
  $("#v-ana").innerHTML = `
  <div class="hero">
    <div>
      <p class="label">İmam Birgivî (ö. 981/1573) · Tahkikli metin, i'râb tabloları</p>
      <h1><span class="ar">${A("عَوَامِلُ الْبِرْكَوِيِّ")}</span>Avâmil-i Birgivî</h1>
      <p>“İ'râbı öğrenmek isteyen herkesin <b>yüz şeyi</b> bilmesi gerekir: altmışı <b style="color:var(--lal)">âmil</b>, otuzu <b style="color:var(--raf)">ma'mûl</b>, onu <b style="color:var(--nasb)">i'râb</b>.” Kitabın bütün metni, örnekleri, i'râbları ve nüsha farkları burada; her örnekte âmil kırmızı, ma'mûl renkli altı çizgiyle gösterilir.</p>
      <div class="row" style="margin-top:18px">
        <button class="btn lal" data-go="ders" data-id="${lastRec.it.id}">${totalD ? "Kaldığın yerden devam et" : "İlk derse başla"} →</button>
        <button class="btn ghost" data-go="sinav">Kendini sına</button>
        <button class="btn ghost" data-go="metin">Metni oku</button>
      </div>
      <p class="small muted" style="margin-top:12px">Son ders: <b>${esc(lastRec.it.tr)}</b> <span class="ar" style="font-size:1.05rem">${A(lastRec.it.ar)}</span></p>
    </div>
    <div>
      <div class="hcap"><span class="label">Kitaptaki yüz şey</span><span class="small muted">Bir kutuya dokun, dersi açılsın</span></div>
      <div class="hundred" role="list" aria-label="Kitaptaki yüz şey">
        ${cells.map((c,i)=>`<button role="listitem" class="${c.cls} ${(c.done ?? S.learned[c.id]) ? "done":""}" data-go="ders" data-id="${c.id}" title="${i+1}. ${esc(c.t)}" aria-label="${i+1}. ${esc(c.t)}"><span class="n">${i+1}</span><span class="lb">${esc(c.lb)}</span></button>`).join("")}
      </div>
      <div class="legend"><span style="--c:var(--lal)">60 âmil</span><span style="--c:var(--raf)">30 ma'mûl</span><span style="--c:var(--nasb)">10 i'râb alâmeti</span><span class="muted" style="--c:var(--sunk)">açık renk: henüz öğrenilmedi</span></div>
    </div>
  </div>
  <div class="babs">
    ${BABS.map((b,bi) => `
    <div class="bab">
      <div class="label">${b.no}. bâb · s. ${b.page}</div>
      <div class="ar">${A(b.ar.split(":")[1]||b.ar)}</div>
      <h3>${esc(b.tr.split(": ")[1])}</h3>
      <div class="bar" aria-label="İlerleme"><i style="width:${Math.round(P[bi].d/P[bi].n*100)}%"></i></div>
      <div class="small muted">${P[bi].d} / ${P[bi].n} ders öğrenildi</div>
      <ul>${b.groups.map(g=>`<li>${esc(g.tr)}</li>`).join("")}</ul>
      <div><button class="btn ghost" data-go="ders" data-id="${b.groups[0].items[0].id}">Bâba git</button></div>
    </div>`).join("")}
  </div>
  <div class="split">
    <div class="panel">
      <h3>Çalışma özeti</h3>
      <div class="statrow">
        <div class="stat"><b>${totalD}</b><span class="small muted">öğrenilen ders / ${ITEMS.length}</span></div>
        <div class="stat"><b>${Object.values(S.box).filter(x=>x>=4).length}</b><span class="small muted">pekişmiş kart</span></div>
        <div class="stat"><b>${S.hist.length}</b><span class="small muted">tamamlanan sınav</span></div>
      </div>
      ${hist.length ? `<p class="label" style="margin-top:16px">Son sınav puanları (%)</p>${sparkline(hist.map(h=>Math.round(h.score/h.total*100)))}` : `<p class="small muted" style="margin-top:14px">Henüz sınav çözmedin. Sınavlardaki yanlışların otomatik olarak tekrar kartlarına eklenir.</p>`}
    </div>
    <div class="panel">
      <h3>Yıldızlılar ve notların</h3>
      ${starred.length||noted.length ? `<div class="row">${[...new Set([...starred,...noted])].map(id=>`<button class="btn ghost small" data-go="ders" data-id="${id}">${S.stars[id]?"★ ":""}${esc(BYID[id].it.tr)}${S.notes[id]?" ✎":""}</button>`).join("")}</div>`
        : `<p class="small muted">Bir derste ★ ile işaretlediğin ya da not aldığın konular burada listelenir.</p>`}
      <details style="margin-top:14px"><summary class="small" style="cursor:pointer">İlerlemeyi yedekle / geri yükle</summary>
        <p class="small muted">İlerleme yalnızca bu tarayıcıda saklanır. Başka cihaza taşımak için aşağıdaki metni kopyalayıp orada yapıştır.</p>
        <textarea class="io" id="ioText" aria-label="Yedek metni"></textarea>
        <div class="row" style="margin-top:8px"><button class="btn ghost small" id="ioExp">Yedeği oluştur ve kopyala</button><button class="btn ghost small" id="ioImp">Yapıştırılanı yükle</button><button class="btn ghost small" id="ioReset">Her şeyi sıfırla</button></div>
      </details>
    </div>
  </div>
  <div class="panel" style="margin-top:18px">
    <blockquote class="quote"><div class="ar">${A(ABOUT.quotes[0].ar)}</div><p class="small muted" style="margin:6px 0 0">${esc(ABOUT.quotes[0].tr)} — ${esc(ABOUT.quotes[0].who)}</p></blockquote>
  </div>`;
  $("#ioExp").onclick = () => { const t = JSON.stringify(S); $("#ioText").value = t; $("#ioText").select(); (navigator.clipboard?.writeText(t)||Promise.reject()).then(()=>toast("Yedek kopyalandı"), ()=>toast("Metin seçildi; kopyalayabilirsin")); };
  $("#ioImp").onclick = () => { try { const o = JSON.parse($("#ioText").value); S = Object.assign({}, DEF, o); S.s = Object.assign({}, DEF.s, o.s||{}); save(); applySettings(); renderHome(); toast("İlerleme yüklendi"); } catch(e){ toast("Metin okunamadı. Yedeğin tamamını yapıştırdığından emin ol."); } };
  $("#ioReset").onclick = (e) => { const b=e.currentTarget; if (b.dataset.sure){ S = JSON.parse(JSON.stringify(DEF)); save(); applySettings(); renderHome(); toast("İlerleme sıfırlandı"); } else { b.dataset.sure="1"; b.textContent="Emin misin? Tekrar bas"; } };
}
function sparkline(vals){
  const w=320,h=70,p=8; const n=vals.length; const x=i=> n<2? w/2 : p+i*(w-2*p)/(n-1); const y=v=> h-p-(v/100)*(h-2*p);
  const pts = vals.map((v,i)=>`${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Sınav puanları">
    <line x1="${p}" x2="${w-p}" y1="${y(50)}" y2="${y(50)}" stroke="var(--rule)" stroke-dasharray="3 3"/>
    <polyline points="${p},${h-p} ${pts} ${x(n-1)},${h-p}" fill="var(--lal-soft)" stroke="none"/>
    <polyline points="${pts}" fill="none" stroke="var(--lal)" stroke-width="2"/>
    <circle cx="${x(n-1)}" cy="${y(vals[n-1])}" r="4" fill="var(--lal)"/>
    <text x="${Math.min(x(n-1), w-30)}" y="${Math.max(y(vals[n-1])-8, 12)}" fill="var(--ink)" font-size="12" font-weight="700">${vals[n-1]}</text></svg>`;
}

/* ===================== DERSLER ===================== */
let exIdx = 0, selWord = null, tocOpen = false;
function tocHTML(cur){
  return BABS.map(b => `<details ${cur.b.no===b.no?"open":""}><summary><span>${esc(b.tr.split(": ")[1])}</span><span class="small muted">${b.no}. bâb</span></summary>
    ${b.groups.map(g => `<div class="grp">${esc(g.tr)}</div>` + g.items.map(it => {
      const n = b.no===1 ? amilNo[it.id] : b.no===2 ? mamulNo[it.id] : "";
      return `<a href="#${it.id}" data-go="ders" data-id="${it.id}" class="${S.learned[it.id]?"done":""}" aria-current="${it.id===cur.it.id}"><span class="n">${n}</span><span class="small" style="flex:1">${esc(it.tr)}</span><span class="ar">${A(it.ar.split(" (")[0])}</span></a>`;
    }).join("")).join("")}</details>`).join("");
}
function renderLesson(){
  const rec = BYID[S.last] || ITEMS[0]; const {it, g, b} = rec;
  if (renderLesson._id !== it.id){ exIdx = 0; selWord = null; renderLesson._id = it.id; }
  const exs = it.ex || []; if (exIdx >= exs.length) exIdx = 0; const ex = exs[exIdx];
  const prev = ITEMS[rec.idx-1], next = ITEMS[rec.idx+1];
  const num = b.no===1 ? `${amilNo[it.id]}. âmil / 60` : b.no===2 ? `${mamulNo[it.id]}. ma'mûl / 30` : "İ'râb";
  const groupFirst = g.items[0].id === it.id;
  const amel = it.amel || g.amel || "";
  let html = `<div class="lessons">
    <aside><button class="btn ghost tocbtn" id="tocBtn" style="margin-bottom:10px">${tocOpen?"Fihristi gizle":"Fihristi göster"}</button>
    <nav class="toc" data-collapsed="${!tocOpen}" aria-label="Fihrist">${tocHTML(rec)}</nav></aside>
    <article class="lesson">
      <div class="crumb"><span>${esc(b.tr)}</span>›<span>${esc(g.tr)}</span>›<span class="pill lal">s. ${g.page}</span></div>
      <div class="lhead">
        <div style="min-width:0">
          <div class="no">${num}</div>
          <h2>${esc(it.tr)}</h2>
          ${it.mana ? `<p class="muted" style="margin:6px 0 0">Anlam / işlev: <b style="color:var(--ink)">${esc(it.mana)}</b></p>` : ""}
          ${it.trSub ? `<p class="muted" style="margin:6px 0 0">${esc(it.trSub)} <span class="ar" style="font-size:1rem">${A(it.sub)}</span></p>` : ""}
          <div class="row" style="margin-top:10px">${b.no<3 ? `<span class="small muted">Amel:</span> ${amelPill(amel)}` : ""}
            <label class="chk"><input type="checkbox" id="learned" ${S.learned[it.id]?"checked":""}> Öğrendim</label>
            <button class="ibtn" id="star" aria-pressed="${!!S.stars[it.id]}" title="Yıldızla">${S.stars[it.id]?"★":"☆"}</button>
          </div>
        </div>
        <div class="big">${A(it.ar)}</div>
      </div>`;
  if (groupFirst && b.groups[0]===g){
    html += `<div class="sec"><h3>${esc(b.tr)}</h3><div class="trbox"><p>${esc(b.trIntro)}</p></div><div class="matn"><div class="ar">${A(b.matn)}</div></div></div>`;
  }
  if (groupFirst && (g.matn || g.trIntro)){
    html += `<div class="sec"><h3>${esc(g.tr)} – giriş</h3>
      ${g.trIntro ? `<div class="trbox"><p>${esc(g.trIntro)}</p></div>` : ""}
      ${g.matn ? `<div class="matn"><div class="ar">${A(g.matn)}</div></div>` : ""}</div>`;
  }
  if (it.matn || it.pre){
    html += `<div class="sec"><h3>Metin <span class="small muted">(Birgivî)</span> <button class="ibtn" data-say="${esc(strip(it.matn||""))}" title="Sesli oku">🔊</button></h3>
      <div class="matn">${it.pre?`<div class="ar muted">${A(it.pre)}</div>`:""}<div class="ar">${A(it.matn||"")}</div>${it.post?`<div class="ar muted">${A(it.post)}</div>`:""}</div></div>`;
  }
  if (it.trNote || it.def){
    html += `<div class="sec"><h3>Açıklama</h3>${it.trNote?`<div class="trbox"><p>${esc(it.trNote)}</p></div>`:""}
      ${it.def?`<div class="matn"><div class="label">Ta'rîf (muhakkikin hâşiyesinden)</div><div class="ar">${A(it.def)}</div></div>`:""}</div>`;
  }
  if (it.sig){
    html += `<div class="sec"><h3>İ'râb alâmetleri</h3><div class="sigs">
      ${["Ref' (merfû')","Nasb (mansûb)", it.id.startsWith("i3")||it.id.startsWith("i4") ? "Cezm (meczûm)" : "Cer (mecrûr)"].map((h,i)=>`<div class="sig"><div class="label">${h}</div><div class="ar">${A(it.sig[i])}</div></div>`).join("")}
    </div></div>`;
  }
  if (ex){
    html += `<div class="sec"><h3>Misal ve i'râb <span class="small muted">${exs.length>1?`(${exIdx+1}/${exs.length})`:""}</span></h3>
      ${exs.length>1 ? `<div class="exnav">${exs.map((e,i)=>`<button data-ex="${i}" aria-pressed="${i===exIdx}">${e.h?A(e.h):toAr(i+1)}</button>`).join("")}</div>` : ""}
      <div class="sentence">
        <div class="s">${sentenceHTML(ex, amel)}</div>
        ${ex.q?`<div class="small muted">[${esc(ex.q)}]</div>`:""}
        <div class="trl">${esc(ex.t)}</div>
        <div class="keys"><span><i style="color:var(--lal)">Kırmızı</i>: âmil</span><span><i style="color:var(--raf)">Altı çizili</i>: ma'mûl (rengi ameli gösterir)</span><span>Bir kelimeye dokun → i'râbı</span>
          <button class="ibtn" data-say="${esc(strip(ex.s))}" title="Cümleyi sesli oku">🔊</button></div>
        <div class="popir ar" id="popir" ${selWord?"":"hidden"}></div>
      </div>
      ${ex.rows ? `<div class="tbl"><table><thead><tr><th>${A("الْمِثَالُ")}</th><th>${A("الْعَامِلُ")}</th><th>${A("الْمَعْمُولُ")}</th><th>${A("الْعَمَلُ / الْإِعْرَابُ")}</th></tr></thead><tbody>
        ${ex.rows.map((r,i)=>`<tr>${i===0?`<td class="ar" rowspan="${ex.rows.length}">${A(ex.s)}</td>`:""}<td class="ar">${A(r[0])}</td><td class="ar">${A(r[1])}</td><td><span class="ar" style="font-size:1.15rem">${A(amelInfo(r[2]).ar)}</span><br>${amelPill(r[2])}</td></tr>`).join("")}
      </tbody></table></div>` : ""}
      <div class="irab" dir="rtl">${(ex.ir||[]).map((r,i)=>`<div class="it" data-ir="${i}"><div class="ar">${irabHTML(r[0], r[1])}</div></div>`).join("")}</div>
      <p class="small muted">Noktalı altı çizili terimlerin üzerine gel ya da dokun: Türkçe karşılığı görünür.</p>
    </div>`;
  }
  const fns = [...(groupFirst ? (g.fn||[]) : []), ...(it.fn||[])];
  if (fns.length || it.note){
    html += `<div class="sec fn"><h3>Hâşiye ve nüsha farkları</h3><div class="matn"><ol dir="rtl">${fns.map(f=>`<li class="ar">${A(f)}</li>`).join("")}</ol>${it.note?`<div class="ar" style="color:var(--lal)">${A(it.note)}</div>`:""}
      <p class="small muted" style="margin:8px 0 0">Nüsha rumuzları: (ف) Fatih 5087 · (ج) Cârullah 2059 · (ل) Lâleli 3482 · (ص) Râşid Efendi 3/701</p></div></div>`;
  }
  html += `<div class="sec note"><h3>Notum</h3><textarea id="note" placeholder="Bu konu hakkında kendi notların… (otomatik kaydedilir)">${esc(S.notes[it.id]||"")}</textarea></div>
    <div class="lfoot">
      ${prev?`<button class="btn ghost" data-go="ders" data-id="${prev.it.id}">← ${esc(prev.it.tr)}</button>`:"<span></span>"}
      ${next?`<button class="btn" data-go="ders" data-id="${next.it.id}" id="nextBtn">${esc(next.it.tr)} →</button>`:`<button class="btn lal" data-go="sinav">Kitap bitti – sınava geç →</button>`}
    </div></article></div>`;
  $("#v-ders").innerHTML = html;
  // olaylar
  $("#tocBtn").onclick = () => { tocOpen = !tocOpen; renderLesson(); };
  $("#learned").onchange = e => { S.learned[it.id] = e.target.checked; save(); $$(".toc a[aria-current='true']").forEach(a=>a.classList.toggle("done", e.target.checked)); toast(e.target.checked ? "Öğrenildi olarak işaretlendi" : "İşaret kaldırıldı"); };
  $("#star").onclick = () => { S.stars[it.id] = !S.stars[it.id]; save(); renderLesson(); };
  $("#note").oninput = e => { S.notes[it.id] = e.target.value; save(); };
  $$("[data-ex]").forEach(bn => bn.onclick = () => { exIdx = +bn.dataset.ex; selWord = null; renderLesson(); });
  $$("[data-say]").forEach(bn => bn.onclick = () => speak(bn.dataset.say));
  if (ex){
    const showWord = w => {
      selWord = w; const hits = matchIr(ex, w);
      $$(".w").forEach(x => x.classList.toggle("sel", x.dataset.w===w));
      $$(".irab .it").forEach(x => x.classList.toggle("hl", hits.some(h=>h.i===+x.dataset.ir)));
      const p = $("#popir"); p.hidden = false;
      p.innerHTML = hits.length ? hits.map(h=>`<div>${irabHTML(h.r[0], h.r[1])}</div>`).join("") : `<span style="font-family:var(--f-body);direction:ltr;display:block;text-align:left" class="small muted">“${esc(A(w))}” kelimesinin i'râbı kitapta verilmemiştir (bu örneğin şâhidi değildir).</span>`;
    };
    $$(".w").forEach(x => { x.onclick = () => showWord(x.dataset.w); x.onkeydown = e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); showWord(x.dataset.w);} }; });
    if (selWord) showWord(selWord);
  }
}
document.addEventListener("keydown", e => {
  if (e.target.matches("input,textarea,select")) return;
  if (e.key === "/"){ e.preventDefault(); $("#q").focus(); return; }
  if (VIEW==="ders"){
    const rec = BYID[S.last]; if (!rec) return;
    if (e.key==="ArrowRight" && ITEMS[rec.idx+1]) go("ders", ITEMS[rec.idx+1].it.id);
    if (e.key==="ArrowLeft" && ITEMS[rec.idx-1]) go("ders", ITEMS[rec.idx-1].it.id);
  }
});

/* ===================== METİN OKUYUCU ===================== */
let RD = {tr:false, ez:false, fn:false};
function renderReader(){
  const P = (ar, id, tr) => `<p class="p">${quoted(ar)}${id?` <button class="go" data-go="ders" data-id="${id}">ders →</button>`:""}</p>${RD.tr && tr ? `<p class="tr">${esc(tr)}</p>` : ""}`;
  function quoted(s){
    let t = A(s);
    let h = esc(t).replace(/«([^»]+)»/g, '«<span class="q">$1</span>»').replace(/﴿([^﴾]+)﴾/g, '﴿<span class="q">$1</span>﴾');
    if (RD.ez) return t.split(" ").map(w => `<span class="ez">${esc(w)}</span>`).join(" ");
    return h;
  }
  const FN = arr => RD.fn && arr && arr.length ? `<div class="fn"><ol dir="rtl">${arr.map(f=>`<li class="ar">${A(f)}</li>`).join("")}</ol></div>` : "";
  let h = `<div class="reader"><div class="tools2">
      <button class="ibtn" id="rTr" aria-pressed="${RD.tr}">Türkçe meal</button>
      <button class="ibtn" id="rEz" aria-pressed="${RD.ez}">Ezber modu</button>
      <button class="ibtn" id="rFn" aria-pressed="${RD.fn}">Nüsha farkları</button>
      ${RD.ez?`<button class="ibtn" id="rOpen">Hepsini aç</button>`:""}
      <button class="ibtn" id="rSay">🔊 Mukaddimeyi dinle</button>
    </div>
    ${RD.ez?`<p class="small muted" style="text-align:center">Ezber modu: metni ezberden söyle, sonra kontrol etmek için kelimelere dokun.</p>`:""}
    <div class="page">
      <h2>${A("بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ")}</h2>
      ${P(MUQADDIMA.matn.replace(/^بِسْمِ[^.]+\.\s*/,""), null, MUQADDIMA.tr)}${FN(MUQADDIMA.fn)}
      <div class="orn">✻ ✻ ✻</div>`;
  BABS.forEach(b => {
    h += `<h2>${A(b.ar)}</h2>${P(b.matn, null, b.trIntro)}${FN(b.fn)}`;
    b.groups.forEach(g => {
      h += `<h3>${A(g.ar)}</h3>`;
      if (g.matn) h += P(g.matn, g.items[0].id, g.trIntro); else if (RD.tr && g.trIntro) h += `<p class="tr">${esc(g.trIntro)}</p>`;
      h += FN(g.fn);
      if (b.no < 3) g.items.forEach(it => {
        if (it.pre) h += P(it.pre);
        if (it.matn) h += P(it.matn, it.id, `${it.tr}${it.mana?" — "+it.mana:""}. ${it.ex? it.ex.map(e=>e.t).join(" / "):""}`);
        if (it.post) h += P(it.post);
        h += FN(it.fn);
      });
      if (g.after) h += P(g.after);
      if (g.post) h += P(g.post);
    });
    h += `<div class="orn">✻ ✻ ✻</div>`;
  });
  h += `</div></div>`;
  $("#v-metin").innerHTML = h;
  $("#rTr").onclick = () => { RD.tr=!RD.tr; renderReader(); };
  $("#rEz").onclick = () => { RD.ez=!RD.ez; renderReader(); };
  $("#rFn").onclick = () => { RD.fn=!RD.fn; renderReader(); };
  if ($("#rOpen")) $("#rOpen").onclick = () => $$(".ez").forEach(x=>x.classList.add("open"));
  $("#rSay").onclick = () => speak(strip(MUQADDIMA.matn));
  $$(".ez").forEach(x => x.onclick = () => x.classList.toggle("open"));
}

/* ===================== KARTLAR (Leitner) ===================== */
let CK = {scope:"all", cur:null, flip:false};
function deck(){ return ITEMS.filter(r => CK.scope==="all" || String(r.b.no)===CK.scope || (CK.scope==="star" && S.stars[r.it.id])); }
function nextCard(){
  const d = deck(); if (!d.length) return null;
  const weighted = []; d.forEach(r => { const bx = S.box[r.it.id]||1; const w = [0,16,8,4,2,1][bx]; for (let i=0;i<w;i++) weighted.push(r); });
  let c; let guard = 0; do { c = pick(weighted); } while (CK.cur && c.it.id===CK.cur.it.id && d.length>1 && guard++<20);
  return c;
}
function cardFront(r){
  const ex = r.it.ex && r.it.ex[0];
  return `<div class="label">${esc(r.g.tr)}</div><div class="big">${A(r.it.ar)}</div>${ex?`<div class="s">${sentenceHTML(ex, r.it.amel||r.g.amel, {plain:true})}</div>`:""}<div class="small muted">Kartı çevirmek için dokun</div>`;
}
function cardBack(r){
  const it = r.it, ex = it.ex && it.ex[0];
  let body = `<h3>${esc(it.tr)}</h3>`;
  if (it.mana) body += `<div>${esc(it.mana)}</div>`;
  if (r.b.no<3) body += `<div>${amelPill(it.amel||r.g.amel)}</div>`;
  if (it.sig) body += `<div class="ar" style="font-size:1.2rem">${it.sig.map(A).join(" · ")}</div><div class="small muted">ref' · nasb · ${it.id.match(/^i[34]/)?"cezm":"cer"}</div>`;
  if (ex) body += `<div class="trl">${esc(ex.t)}</div>`;
  if (ex && ex.rows) body += `<div class="small">Ma'mûl: <span class="ar" style="font-size:1.15rem">${ex.rows.map(x=>A(x[1])).join("، ")}</span></div>`;
  return body;
}
function renderCards(){
  if (!CK.cur) CK.cur = nextCard();
  const d = deck(); const counts=[0,0,0,0,0,0]; d.forEach(r => counts[S.box[r.it.id]||1]++);
  const mx = Math.max(1,...counts);
  const r = CK.cur;
  $("#v-kart").innerHTML = `<div class="cards">
    <div class="deckbar">
      <div><h2 style="font-size:1.6rem">Tekrar kartları</h2><p class="small muted" style="margin:4px 0 0">Leitner usulü: bildiğin kart üst kutuya çıkar ve daha seyrek gelir; bilemediğin 1. kutuya döner.</p></div>
      <select id="ckScope" class="filter" style="width:auto" aria-label="Deste">
        <option value="all">Bütün kitap (${ITEMS.length})</option><option value="1">1. bâb: Âmiller</option><option value="2">2. bâb: Ma'mûller</option><option value="3">3. bâb: İ'râb</option><option value="star">Yıldızlılar</option>
      </select>
    </div>
    <div class="row" style="justify-content:center;gap:24px;padding-bottom:16px">
      <div class="boxes" aria-label="Kutulardaki kart sayısı">${[1,2,3,4,5].map(i=>`<div title="${i}. kutu: ${counts[i]} kart" style="height:46px"><i style="height:${Math.max(3,counts[i]/mx*46)}px;opacity:${.35+i*.13}"></i><span>${i}</span></div>`).join("")}</div>
      <div class="small muted">${d.length} kart · ${counts[4]+counts[5]} pekişmiş</div>
    </div>
    ${r ? `<div class="flash ${CK.flip?"flip":""}" id="flash" tabindex="0" role="button" aria-label="Kartı çevir">
      <div class="inner"><div class="face">${cardFront(r)}</div><div class="face back">${cardBack(r)}</div></div></div>
    <div class="grade" ${CK.flip?"":"hidden"} id="grade">
      <button class="g1" data-g="1">Bilemedim</button><button data-g="2">Zorlandım</button><button class="g3" data-g="3">Bildim</button>
    </div>
    <div class="row" style="justify-content:space-between"><span class="small muted">Bu kart: ${S.box[r.it.id]||1}. kutu</span><button class="btn ghost small" data-go="ders" data-id="${r.it.id}">Dersini aç</button></div>`
    : `<div class="panel"><p>Bu destede kart yok. Yıldızlı destesi için derslerde ☆ işaretini kullan.</p></div>`}
  </div>`;
  $("#ckScope").value = CK.scope;
  $("#ckScope").onchange = e => { CK.scope = e.target.value; CK.cur = null; CK.flip = false; renderCards(); };
  if (!r) return;
  const flip = () => { CK.flip = !CK.flip; $("#flash").classList.toggle("flip", CK.flip); $("#grade").hidden = !CK.flip; };
  $("#flash").onclick = flip; $("#flash").onkeydown = e => { if (e.key===" "||e.key==="Enter"){ e.preventDefault(); flip(); } };
  $$("#grade button").forEach(b => b.onclick = () => {
    const g = +b.dataset.g, id = r.it.id, bx = S.box[id]||1;
    S.box[id] = g===1 ? 1 : g===2 ? bx : Math.min(5, bx+1);
    if (S.box[id] >= 4) S.learned[id] = true;
    save(); CK.cur = nextCard(); CK.flip = false; renderCards();
  });
}

/* ===================== SINAV ===================== */
const QTYPES = [
  {id:"amel", tr:"Âmilin ameli (ne yapar?)", b:[1]},
  {id:"nev", tr:"Âmilin nev'i (hangi gruptan?)", b:[1]},
  {id:"findA", tr:"Cümlede âmili bul", b:[1,2]},
  {id:"findM", tr:"Cümlede ma'mûlü bul", b:[1,2]},
  {id:"irab", tr:"Kelimenin i'râbı", b:[1,2,3]},
  {id:"mamul", tr:"Ma'mûlün türü", b:[2]},
  {id:"alamet", tr:"İ'râb alâmeti", b:[3]},
  {id:"mana", tr:"Cümlenin Türkçe anlamı", b:[1,2,3]}
];
let QZ = {scope:"all", n:10, types: QTYPES.map(t=>t.id), qs:null, i:0, score:0, answered:false, wrong:[]};
function poolFor(bno){ return ITEMS.filter(r => QZ.scope==="all" || String(r.b.no)===QZ.scope).filter(r => !bno || bno.includes(r.b.no)); }
function makeQ(type){
  const T = QTYPES.find(t=>t.id===type); const pool = poolFor(T.b); if (!pool.length) return null;
  const r = pick(pool), it = r.it, ex = it.ex && pick(it.ex);
  if (type==="amel"){
    const right = amelInfo(it.amel).tr; const all = [...new Set(Object.keys(AMEL).map(k=>AMEL[k].tr))];
    return {type, rec:r, q:`<span class="ar" style="font-size:1.8rem;color:var(--lal)">${A(it.ar)}</span> ne amel eder?`, opts: shuffle([right, ...shuffle(all.filter(x=>x!==right)).slice(0,3)]), right, why:`${it.tr}: ${right}.`};
  }
  if (type==="nev"){
    const right = r.g.tr; const all = BABS[0].groups.map(g=>g.tr);
    return {type, rec:r, q:`<span class="ar" style="font-size:1.8rem;color:var(--lal)">${A(it.ar)}</span> hangi gruptandır?`, opts: shuffle([right, ...shuffle(all.filter(x=>x!==right)).slice(0,3)]), right, why:`${it.tr} → ${right}`};
  }
  if ((type==="findA"||type==="findM") && ex){
    const R = marks(ex, it.amel||r.g.amel).filter(m => m.r===(type==="findA"?"a":"m"));
    if (!R.length) return null;
    const words=[]; let p=0; ex.s.split(" ").forEach(w=>{words.push({w,s:p,e:p+w.length}); p+=w.length+1;});
    if (words.length<2) return null;
    const right = words.map((w,i)=>R.some(m=>m.s<w.e&&m.e>w.s)?i:-1).filter(i=>i>-1);
    return {type, rec:r, ex, words, right, q: type==="findA" ? "Bu cümledeki <b style='color:var(--lal)'>âmil</b> hangi kelimede?" : "Bu cümledeki <b style='color:var(--raf)'>ma'mûl</b> hangi kelimede? (birden fazlaysa birini seçmen yeterli)", why: `Âmil: ${ (ex.rows||[]).map(x=>strip(x[0])).filter(Boolean).join("، ")||"—" } · Ma'mûl: ${(ex.rows||[]).map(x=>strip(x[1])).join("، ")||"—"}`};
  }
  if (type==="irab" && ex && ex.ir && ex.ir.length){
    const target = pick(ex.ir); const others = shuffle(ITEMS.flatMap(x=>(x.it.ex||[]).flatMap(e=>(e.ir||[]).map(i=>i[1])))).filter(t=>norm(t)!==norm(target[1]));
    const uniq = [...new Set(others)].slice(0,3);
    return {type, rec:r, ex, q:`Bu cümlede <b class="ar" style="font-size:1.4rem">«${A(target[0])}»</b> kelimesinin i'râbı hangisidir?`, opts: shuffle([target[1], ...uniq]), right: target[1], ar:true, showS:true, why:`${strip(target[0])}: ${strip(target[1])}`};
  }
  if (type==="mamul" && ex){
    const right = it.tr; const all = BABS[1].groups.flatMap(g=>g.items.map(i=>i.tr));
    return {type, rec:r, ex, showS:true, mark:"m", q:"Renkli işaretli kelime hangi ma'mûldür?", opts: shuffle([right, ...shuffle(all.filter(x=>x!==right)).slice(0,3)]), right, why:`${right} — ${r.g.tr}`};
  }
  if (type==="alamet" && ex && it.sig && ["raf","nasb","jar"].includes(ex.case)){
    const k = {raf:0,nasb:1,jar:2}[ex.case]; const right = strip(it.sig[k]);
    const all = BABS[2].alamat.map(a=>strip(a.ar));
    return {type, rec:r, ex, showS:true, mark:"m", q:"İşaretli kelimenin i'râb alâmeti nedir?", opts: shuffle([right, ...shuffle(all.filter(x=>x!==right)).slice(0,3)]), right, ar:true, why:`${it.tr}: ${["ref'","nasb","cer"][k]} hâlinde alâmet ${right}.`};
  }
  if (type==="mana" && ex){
    const right = ex.t; const all = ITEMS.flatMap(x=>(x.it.ex||[]).map(e=>e.t)).filter(t=>t!==right);
    return {type, rec:r, ex, showS:true, q:"Bu cümlenin Türkçe anlamı hangisidir?", opts: shuffle([right, ...shuffle([...new Set(all)]).slice(0,3)]), right, why:right};
  }
  return null;
}
function buildQuiz(){
  const qs = []; let guard = 0;
  while (qs.length < QZ.n && guard++ < 400){
    const q = makeQ(pick(QZ.types)); if (q && !qs.some(x=>x.rec===q.rec && x.type===q.type)) qs.push(q);
  }
  return qs;
}
function renderQuiz(){
  const v = $("#v-sinav");
  if (!QZ.qs){
    v.innerHTML = `<div class="quiz"><h2 style="font-size:1.6rem;margin-bottom:6px">Sınav</h2><p class="muted" style="margin-top:0">Sorular kitabın kendi örneklerinden her seferinde yeniden üretilir.</p>
      <div class="qset">
        <fieldset><legend>Kapsam</legend>
          ${[["all","Bütün kitap"],["1","1. bâb – Âmil"],["2","2. bâb – Ma'mûl"],["3","3. bâb – İ'râb"]].map(([k,t])=>`<label><input type="radio" name="qsc" value="${k}" ${QZ.scope===k?"checked":""}> ${t}</label>`).join("")}
          <label style="margin-top:8px">Soru sayısı <select id="qn" class="filter" style="width:auto">${[10,20,30].map(n=>`<option ${QZ.n===n?"selected":""}>${n}</option>`).join("")}</select></label>
        </fieldset>
        <fieldset><legend>Soru türleri</legend>${QTYPES.map(t=>`<label><input type="checkbox" name="qt" value="${t.id}" ${QZ.types.includes(t.id)?"checked":""}> ${t.tr} <span class="small muted">(${t.b.map(x=>x+".").join(" ")} bâb)</span></label>`).join("")}</fieldset>
      </div>
      <div class="row" style="margin-top:16px"><button class="btn lal" id="qStart">Sınavı başlat</button><span class="small muted" id="qWarn"></span></div>
      ${S.hist.length?`<div class="panel" style="margin-top:22px"><h3>Geçmiş</h3>${sparkline(S.hist.slice(-12).map(h=>Math.round(h.score/h.total*100)))}<p class="small muted">${S.hist.slice(-5).reverse().map(h=>`${new Date(h.at).toLocaleDateString("tr-TR")}: ${h.score}/${h.total}`).join(" · ")}</p></div>`:""}
    </div>`;
    $$("input[name=qsc]").forEach(x=>x.onchange=()=>QZ.scope=x.value);
    $("#qn").onchange = e => QZ.n = +e.target.value;
    $$("input[name=qt]").forEach(x=>x.onchange=()=>QZ.types=$$("input[name=qt]:checked").map(y=>y.value));
    $("#qStart").onclick = () => {
      if (!QZ.types.length){ $("#qWarn").textContent = "En az bir soru türü seç."; return; }
      const qs = buildQuiz(); if (!qs.length){ $("#qWarn").textContent = "Bu kapsamla seçilen türlerde soru üretilemiyor. Kapsamı genişlet ya da başka tür seç."; return; }
      Object.assign(QZ, {qs, i:0, score:0, answered:false, wrong:[], saved:false}); renderQuiz();
    };
    return;
  }
  if (QZ.i >= QZ.qs.length){
    const tot = QZ.qs.length, pct = Math.round(QZ.score/tot*100);
    if (!QZ.saved){ S.hist.push({at:Date.now(), score:QZ.score, total:tot}); S.hist = S.hist.slice(-50); QZ.wrong.forEach(q => S.box[q.rec.it.id] = 1); save(); QZ.saved = true; }
    v.innerHTML = `<div class="quiz"><div class="qcard" style="text-align:center">
      <div class="label">Sonuç</div><div style="font-family:var(--f-disp);font-size:3.4rem;font-weight:700;color:${pct>=70?"var(--ok)":"var(--lal)"}">${QZ.score} / ${tot}</div>
      <p>${pct>=90?"Mükemmel! Bu konular yerine oturmuş.":pct>=70?"Güzel; birkaç konuyu tekrar etmek yeter.":"Tekrar zamanı: yanlış yaptığın konular kart destesinde 1. kutuya alındı."}</p>
      ${QZ.wrong.length?`<p class="label" style="margin-top:14px">Tekrar edilecek dersler</p><div class="row" style="justify-content:center">${[...new Set(QZ.wrong.map(q=>q.rec.it.id))].map(id=>`<button class="btn ghost small" data-go="ders" data-id="${id}">${esc(BYID[id].it.tr)}</button>`).join("")}</div>`:""}
      <div class="row" style="justify-content:center;margin-top:18px"><button class="btn lal" id="qAgain">Yeni sınav</button><button class="btn ghost" id="qSet">Ayarlar</button><button class="btn ghost" data-go="kart">Kartlara geç</button></div>
    </div></div>`;
    $("#qAgain").onclick = () => { Object.assign(QZ,{qs:buildQuiz(), i:0, score:0, answered:false, wrong:[], saved:false}); renderQuiz(); };
    $("#qSet").onclick = () => { QZ.qs = null; QZ.saved=false; renderQuiz(); };
    return;
  }
  const q = QZ.qs[QZ.i];
  let body = "";
  if (q.type==="findA"||q.type==="findM"){
    body = `<div class="tokbtns" dir="rtl">${q.words.map((w,i)=>`<button data-tok="${i}">${esc(A(w.w))}</button>`).join("")}</div><div class="trl" style="text-align:center">${esc(q.ex.t)}</div>`;
  } else {
    if (q.showS) body += `<div class="s">${q.mark ? sentenceHTML({...q.ex, a:[]}, q.rec.it.amel||q.rec.g.amel, {plain:true}) : esc(A(q.ex.s))}</div>`;
    body += `<div class="opts">${q.opts.map((o,i)=>`<button data-opt="${i}" class="${q.ar?"ar":""}">${q.ar?esc(A(o)):esc(o)}</button>`).join("")}</div>`;
  }
  v.innerHTML = `<div class="quiz"><div class="qhead"><span class="small muted">Soru ${QZ.i+1} / ${QZ.qs.length}</span><div class="qprog"><i style="width:${QZ.i/QZ.qs.length*100}%"></i></div><span class="small"><b>${QZ.score}</b> doğru</span></div>
    <div class="qcard"><div class="label">${esc(QTYPES.find(t=>t.id===q.type).tr)}</div><div class="qq">${q.q}</div>${body}<div id="fb"></div></div>
    <div class="row" style="justify-content:space-between;margin-top:12px"><button class="btn ghost small" id="qQuit">Sınavı bitir</button><button class="btn" id="qNext" hidden>Sonraki →</button></div></div>`;
  const finish = ok => {
    QZ.answered = true; if (ok) QZ.score++; else QZ.wrong.push(q);
    $("#fb").innerHTML = `<div class="fb ${ok?"good":"badf"}"><b>${ok?"Doğru.":"Yanlış."}</b> <span class="${q.type==="irab"?"ar":""}">${esc(q.why)}</span> <button class="go btn ghost small" data-go="ders" data-id="${q.rec.it.id}" style="margin-inline-start:8px">Derse git</button></div>`;
    $("#qNext").hidden = false; $("#qNext").focus();
  };
  $$("[data-opt]").forEach(b => b.onclick = () => {
    if (QZ.answered) return; const ok = q.opts[+b.dataset.opt] === q.right;
    $$("[data-opt]").forEach(x => { x.disabled = true; if (q.opts[+x.dataset.opt]===q.right) x.classList.add("ok"); });
    if (!ok) b.classList.add("no"); finish(ok);
  });
  $$("[data-tok]").forEach(b => b.onclick = () => {
    if (QZ.answered) return; const ok = q.right.includes(+b.dataset.tok);
    $$("[data-tok]").forEach(x => { x.disabled = true; if (q.right.includes(+x.dataset.tok)) x.classList.add("ok"); });
    if (!ok) b.classList.add("no"); finish(ok);
  });
  $("#qNext").onclick = () => { QZ.i++; QZ.answered=false; renderQuiz(); };
  $("#qQuit").onclick = () => { QZ.qs = QZ.qs.slice(0, QZ.i + (QZ.answered?1:0)); if (!QZ.qs.length){ QZ.qs=null; } QZ.i = QZ.qs ? QZ.qs.length : 0; renderQuiz(); };
}

/* ===================== SÖZLÜK ===================== */
let DQ = "";
function renderDict(){
  const f = s => !DQ || norm(s).includes(norm(DQ)) || normTr(s).includes(normTr(DQ));
  const tar = TARIFAT.filter(t => f(t.ar)||f(t.tr)||f(t.trDef));
  const defs = ITEMS.filter(r=>r.it.def).filter(r=>f(r.it.ar)||f(r.it.tr));
  const terms = TERMS.filter(([a,t]) => f(a)||f(t));
  $("#v-sozluk").innerHTML = `<div class="row" style="justify-content:space-between;margin-bottom:16px"><div><h2 style="font-size:1.6rem">Sözlük ve ta'rîfât</h2><p class="small muted" style="margin:4px 0 0">Tahkikteki tanımlar (Arapça + Türkçe) ve i'râb metinlerinde geçen terimler.</p></div>
    <input class="filter" id="dq" type="search" placeholder="Terim ara (Arapça ya da Türkçe)" value="${esc(DQ)}" aria-label="Sözlükte ara"></div>
    <h3 style="margin:8px 0 10px">Temel ta'rîfler</h3>
    <div class="dict">${tar.map(t=>`<div class="d"><div class="row" style="justify-content:space-between"><b>${esc(t.tr)}</b><span class="ar h">${A(t.ar)}</span></div><div class="ar" style="font-size:1.12rem">${A(t.def)}</div><p class="small" style="margin:6px 0 0">${esc(t.trDef)}</p></div>`).join("")||"<p class='muted'>Sonuç yok.</p>"}</div>
    <h3 style="margin:26px 0 10px">Konu ta'rîfleri <span class="small muted">(ma'mûl bâbından)</span></h3>
    <div class="dict">${defs.map(r=>`<div class="d"><div class="row" style="justify-content:space-between"><button class="btn ghost small" data-go="ders" data-id="${r.it.id}">${esc(r.it.tr)}</button><span class="ar h">${A(r.it.ar)}</span></div><div class="ar" style="font-size:1.12rem">${A(r.it.def)}</div></div>`).join("")||"<p class='muted'>Sonuç yok.</p>"}</div>
    <h3 style="margin:26px 0 10px">İ'râb terimleri <span class="small muted">(${terms.length})</span></h3>
    <div class="terms">${terms.map(([a,t])=>`<div><span>${esc(t)}</span><span class="ar">${A(a)}</span></div>`).join("")}</div>`;
  const inp = $("#dq"); inp.oninput = () => { DQ = inp.value; const p = inp.selectionStart; renderDict(); const n=$("#dq"); n.focus(); n.setSelectionRange(p,p); };
}

/* ===================== KİTAP HAKKINDA ===================== */
function renderAbout(){
  const a = ABOUT;
  $("#v-hakkinda").innerHTML = `<div class="split" style="margin-top:0">
    <div class="panel"><div class="label">Müellif</div><h2 style="font-size:1.5rem;margin:6px 0">${esc(a.author.tr)}</h2><div class="ar" style="color:var(--lal)">${A(a.author.ar)}</div>
      <p class="small muted">Doğum: ${esc(a.author.born)} · Vefat: ${esc(a.author.died)}</p><p>${esc(a.author.bio)}</p>
      <div class="label" style="margin-top:14px">Eserlerinden</div><ul class="works">${a.author.works.map(w=>`<li><span class="small">${esc(w[1])}</span><span class="ar">${A(w[0])}</span></li>`).join("")}</ul></div>
    <div class="panel"><div class="label">Tahkik</div><h2 style="font-size:1.5rem;margin:6px 0">Bu neşir</h2><p>${esc(a.editor)}</p>
      <div class="label" style="margin-top:14px">Muhakkikin yöntemi</div><ol>${a.method.map(m=>`<li>${esc(m)}</li>`).join("")}</ol>
      <div class="label" style="margin-top:14px">Esas alınan yazma nüshalar</div>
      <div class="mss">${a.mss.map(m=>`<div class="m"><span class="code">(${m.code})</span><b>${esc(m.name)}</b><div class="small muted">${esc(m.desc)}</div></div>`).join("")}</div></div>
  </div>
  <div class="panel" style="margin-top:18px"><div class="label">Muhakkikin mukaddimesinden</div>
    ${a.quotes.map(q=>`<blockquote class="quote" style="margin-top:14px"><div class="ar">${A(q.ar)}</div><p class="small muted" style="margin:6px 0 0">${esc(q.tr)} — ${esc(q.who)}</p></blockquote>`).join("")}</div>
  <div class="panel" style="margin-top:18px"><div class="label">Kitabın yapısı</div>
    <div class="tbl"><table><thead><tr><th style="font-family:var(--f-body);color:var(--ink)">Bâb</th><th style="font-family:var(--f-body);color:var(--ink)">Kısım</th><th style="font-family:var(--f-body);color:var(--ink)">Sayı</th><th style="font-family:var(--f-body);color:var(--ink)">Sayfa</th></tr></thead><tbody>
    ${BABS.flatMap(b=>b.groups.map((g,i)=>`<tr>${i===0?`<td rowspan="${b.groups.length}"><b>${esc(b.tr)}</b></td>`:""}<td><button class="btn ghost small" data-go="ders" data-id="${g.items[0].id}">${esc(g.tr)}</button></td><td style="font-variant-numeric:tabular-nums">${g.count}</td><td style="font-variant-numeric:tabular-nums">${g.page}</td></tr>`)).join("")}
    </tbody></table></div></div>`;
}

/* ===================== ARAMA ===================== */
const IDX = [];
ITEMS.forEach(r => {
  IDX.push({id:r.it.id, kind:"Ders", tr:r.it.tr, ar:r.it.ar, hay: norm(r.it.ar)+" "+normTr(r.it.tr+" "+(r.it.mana||"")+" "+r.g.tr)});
  (r.it.ex||[]).forEach(e => IDX.push({id:r.it.id, kind:"Misal", tr:e.t, ar:e.s, hay: norm(e.s)+" "+normTr(e.t)}));
});
TARIFAT.forEach(t => IDX.push({view:"sozluk", kind:"Ta'rîf", tr:t.tr, ar:t.ar, hay: norm(t.ar)+" "+normTr(t.tr+" "+t.trDef)}));
const qIn = $("#q"), res = $("#results");
qIn.oninput = () => {
  const q = qIn.value.trim(); if (q.length < 2){ res.hidden = true; return; }
  const nq = /[؀-ۿ]/.test(q) ? norm(q) : normTr(q);
  const hits = IDX.filter(x => x.hay.includes(nq)).slice(0, 30);
  res.innerHTML = hits.length ? hits.map(h=>`<button ${h.view?`data-go="${h.view}"`:`data-go="ders" data-id="${h.id}"`}><span class="label">${h.kind}</span><div class="ar">${esc(A(h.ar))}</div><div class="small">${esc(h.tr)}</div></button>`).join("") : `<div class="small muted" style="padding:10px">“${esc(q)}” için sonuç yok.</div>`;
  res.hidden = false;
};
qIn.onkeydown = e => { if (e.key==="Escape"){ res.hidden=true; qIn.blur(); } if (e.key==="Enter"){ const b = res.querySelector("button"); if (b) b.click(); } };
document.addEventListener("click", e => { if (!e.target.closest(".search")) res.hidden = true; else if (e.target.closest(".results button")){ res.hidden = true; qIn.value=""; } });

/* ===================== BAŞLAT ===================== */
window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (h && h !== (VIEW==="ders" ? S.last : VIEW)) go(h, undefined, false); });
window.__AV = {ITEMS, marks};
applySettings();
const h0 = (location.hash||"").replace("#","");
go(h0 || "ana", undefined, false);
})();
