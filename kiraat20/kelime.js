// ================= KELİME HAZİNESİ MODÜLÜ =================
// Okuma derslerine eklenen kelime çalışması: kelime kartı, aralıklı tekrar (Leitner), çoğul kalıpları, zayıf kelimeler, oyunlar.
// Girdi (veri.js): KH_KEY (depolama öneki), KH_KELIMELER [{id,w,t,tr,c,k,e,z,s,sw,st}], KALIPLAR {anahtar: [kalıp, ad, örnek]}.
// Dışa: window.KHMOD.mount(kök), KHMOD.stop(). Puan için varsa window.KH_XP(n) çağrılır.
(function () {
"use strict";
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function bare(s) { return String(s).replace(/[ً-ْٰـ]/g, "").replace(/[أإآٱ]/g, "ا"); }
function ar(s) { return '<span class="ar">' + s + '</span>'; }
var store = {
  get: function (k, d) { try { var v = localStorage.getItem(KH_KEY + ":kh:" + k); return v === null ? d : JSON.parse(v); } catch (x) { return d; } },
  set: function (k, v) { try { localStorage.setItem(KH_KEY + ":kh:" + k, JSON.stringify(v)); } catch (x) {} }
};
function dayNum() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
var TODAY = dayNum(), ROOT = null;
function xp(n) { if (window.KH_XP && n > 0) window.KH_XP(n, true); }
var SND = { ctx: null };
function beep(kind) {
  try {
    if (localStorage.getItem(KH_KEY + ":snd") === "false") return;
    SND.ctx = SND.ctx || new (window.AudioContext || window.webkitAudioContext)();
    var c = SND.ctx, o = c.createOscillator(), g = c.createGain(), f = { ok: [660, 880], no: [220, 160], end: [523, 784] }[kind] || [440, 440];
    o.frequency.setValueAtTime(f[0], c.currentTime); o.frequency.linearRampToValueAtTime(f[1], c.currentTime + 0.15);
    g.gain.setValueAtTime(0.08, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.26);
  } catch (x) {}
}
function sayAr(t) {
  try {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(t).replace(/<[^>]+>/g, "")), v = speechSynthesis.getVoices().filter(function (x) { return /^ar/i.test(x.lang); })[0];
    u.lang = "ar-SA"; u.rate = 0.8; if (v) u.voice = v; speechSynthesis.speak(u);
  } catch (x) {}
}

var W = KH_KELIMELER, WBY = {};
W.forEach(function (w) { WBY[w.id] = w; });
var TYPES = {
  a: { tr: "Anlam", ask: "Anlamı nedir?", col: "cerr" },
  c: { tr: "Çoğul", ask: "Çoğulu hangisi?", col: "nasb" },
  t: { tr: "Tekil", ask: "Tekili hangisi?", col: "mi" },
  e: { tr: "Eş anlam", ask: "Eş anlamlısı hangisi?", col: "mz" },
  z: { tr: "Zıt anlam", ask: "Zıt anlamlısı hangisi?", col: "ref" }
};
var TUR = { i: "isim", s: "sıfat", f: "fiil", h: "harf / kalıp" };
var ST = { lt: store.get("lt", {}), hist: store.get("hist", {}), stats: store.get("stats", { newDay: -1, newN: 0 }), perDay: store.get("perDay", 6), tab: "tekrar" };
function save() { store.set("lt", ST.lt); store.set("hist", ST.hist); store.set("stats", ST.stats); store.set("perDay", ST.perDay); }
var DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };

function typesOf(w) { var r = ["a"]; if (w.c) r.push("c"); if (w.e) r.push("e"); if (w.z) r.push("z"); if (w.c) r.push("t"); return r; }
function key(w, t) { return w.id + ":" + t; }
function rec(k) { return ST.lt[k]; }
function eligible(w, t) { return t !== "t" || ((rec(key(w, "c")) || {}).b || 0) >= 3; }
function wordLevel(w) { var ts = typesOf(w), s = 0; ts.forEach(function (t) { s += ((rec(key(w, t)) || {}).b || 0); }); return s / ts.length; }
function learned(w) { return typesOf(w).every(function (t) { return ((rec(key(w, t)) || {}).b || 0) >= 4; }); }
function seenWord(w) { return !!rec(key(w, "a")); }
function hist(k, ok) { var h = ST.hist[k] || (ST.hist[k] = { ok: 0, ng: 0 }); if (ok) h.ok++; else h.ng++; }

// ---------- kelime kartı ----------
function hlSent(w) { if (!w.s) return ""; return w.sw && w.s.indexOf(w.sw) >= 0 ? w.s.replace(w.sw, '<b class="hl">' + w.sw + '</b>') : w.s; }
function kalipAd(k) { var p = KALIPLAR[k]; return p ? ar(p[0]) + ' <span class="muted">' + p[1] + '</span>' : ''; }
function dots(w) {
  return '<div class="lv-row">' + typesOf(w).map(function (t) { var b = (rec(key(w, t)) || {}).b || 0; return '<span class="lv r-' + TYPES[t].col + '" title="' + TYPES[t].tr + ': kutu ' + b + '/5"><b class="trk"><i style="width:' + (b * 20) + '%"></i></b><small>' + TYPES[t].tr + '</small></span>'; }).join("") + '</div>';
}
function aile(w, opt) {
  opt = opt || {};
  function cell(lbl, col, val, sub) { return '<div class="fam-cell r-' + col + '"><span class="lbl">' + lbl + '</span>' + (val ? '<span class="ar v">' + val + '</span>' + (sub ? '<small>' + sub + '</small>' : '') : '<span class="muted v0">—</span>') + '</div>'; }
  return '<div class="fam">' +
    '<div class="fam-head"><button class="say" data-ksay="' + esc(w.w) + '" aria-label="Dinle">🔊</button><div class="fam-main"><span class="ar fam-w">' + w.w + '</span><span class="fam-tr"><b>' + esc(w.tr) + '</b> <span class="muted">· ' + TUR[w.t] + '</span></span></div></div>' +
    '<div class="fam-grid">' + cell("Çoğulu", "nasb", w.c, w.k && KALIPLAR[w.k] ? kalipAd(w.k) : "") + cell("Eş anlamlısı =", "mz", w.e) + cell("Zıt anlamlısı ≠", "ref", w.z) + '</div>' +
    (w.s ? '<div class="fam-s"><button class="say small" data-ksay="' + esc(w.s) + '" aria-label="Cümleyi dinle">🔊</button><div><div class="ar">' + hlSent(w) + '</div><small class="muted">' + esc(w.st) + '</small></div></div>' : '') +
    (opt.dots === false ? '' : '<div class="fam-foot"><span class="muted">Metinden</span>' + dots(w) + '</div>') + '</div>';
}
function openFam(id) {
  var w = WBY[id]; if (!w) return;
  var m = document.getElementById("khmodal") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "khmodal" }));
  m.className = "khmodal"; m.innerHTML = '<div class="modal-in card" role="dialog" aria-modal="true" aria-label="Kelime kartı"><div class="modal-top"><span class="lbl">Kelime kartı</span><button class="btn small" data-kclose="1">Kapat</button></div>' + aile(w) + '</div>';
  m.querySelector("[data-kclose]").focus();
}
function closeFam() { var m = document.getElementById("khmodal"); if (m) m.remove(); }
document.addEventListener("click", function (e) {
  var m = document.getElementById("khmodal"); if (!m) return;
  if (e.target === m || e.target.closest("[data-kclose]")) return closeFam();
  var s = e.target.closest("[data-ksay]"); if (s && m.contains(s)) sayAr(s.dataset.ksay);
});

// ---------- soru üretici ----------
function others(w, f, pref) {
  var seen = {}, out = [], fav = [];
  seen[w[f]] = 1; seen[w.w] = 1;
  shuffle(W).forEach(function (x) { var v = x[f]; if (!v || seen[v] || x.id === w.id) return; seen[v] = 1; (pref && pref(x) ? fav : out).push(v); });
  return fav.concat(out);
}
function makeQ(k) {
  var p = k.split(":"), w = WBY[p[0]], t = p[1], q = { k: k, w: w, t: t, lat: false }, ds;
  if (t === "a") { q.prompt = w.w; q.ok = w.tr; q.lat = true; ds = others(w, "tr", function (x) { return x.t === w.t; }); }
  if (t === "c") { q.prompt = w.w; q.ok = w.c; ds = others(w, "c", function (x) { return x.k === w.k; }); }
  if (t === "t") { q.prompt = w.c; q.ok = w.w; ds = others(w, "w", function (x) { return x.c && x.t === w.t; }); }
  if (t === "e") { q.prompt = w.w; q.ok = w.e; ds = (w.z ? [w.z] : []).concat(others(w, "e", function (x) { return x.t === w.t; })); }
  if (t === "z") { q.prompt = w.w; q.ok = w.z; ds = (w.e ? [w.e] : []).concat(others(w, "z", function (x) { return x.t === w.t; })); }
  ds = ds.filter(function (v, i) { return v !== q.ok && ds.indexOf(v) === i; }).slice(0, 3);
  q.opts = shuffle([q.ok].concat(ds));
  return q;
}
function optBtns(q, attr, done) {
  return '<div class="opts qopts' + (q.lat ? ' lat-opts' : '') + '">' + q.opts.map(function (o, i) {
    var cl = "opt block" + (q.lat ? " lat" : "");
    if (done !== null && done !== undefined) { if (o === q.ok) cl += " sel-ok"; else if (o === done) cl += " sel-no"; }
    return '<button class="' + cl + '" ' + attr + '="' + i + '"' + (done !== null && done !== undefined ? " disabled" : "") + '><span class="kn">' + (i + 1) + '</span>' + (q.lat ? esc(o) : '<span class="ar">' + o + '</span>') + '</button>';
  }).join("") + '</div>';
}

// ---------- tekrar oturumu ----------
var S = null;
function dueKeys() {
  var out = [];
  W.forEach(function (w) { typesOf(w).forEach(function (t) { var k = key(w, t), r = rec(k); if (r && r.due <= TODAY && eligible(w, t)) out.push(k); }); });
  return out.sort(function (a, b) { return rec(a).b - rec(b).b; });
}
function newWords() {
  if (ST.stats.newDay !== TODAY) { ST.stats.newDay = TODAY; ST.stats.newN = 0; }
  return W.filter(function (w) { return !seenWord(w); }).slice(0, Math.max(0, ST.perDay - ST.stats.newN));
}
function weakList() {
  var by = {};
  Object.keys(ST.hist).forEach(function (k) { var h = ST.hist[k], wid = k.split(":")[0], w = WBY[wid]; if (!w || !h.ng) return; var x = by[wid] || (by[wid] = { w: w, ng: 0, ok: 0, keys: [], types: {} }); x.ng += h.ng; x.ok += h.ok; x.keys.push(k); x.types[k.split(":")[1]] = 1; });
  return Object.keys(by).map(function (k) { return by[k]; }).filter(function (x) { return x.ng * 2 > x.ok; }).sort(function (a, b) { return (b.ng - b.ok / 2) - (a.ng - a.ok / 2); });
}
function startSession(mode) {
  var q = [], intro = {};
  if (mode === "daily") {
    q = shuffle(dueKeys().slice(0, 30));
    newWords().forEach(function (w) { intro[w.id] = true; typesOf(w).forEach(function (t) { if (t !== "t") q.push(key(w, t)); }); });
  } else if (mode === "weak") {
    q = shuffle(weakList().slice(0, 12).reduce(function (a, x) { return a.concat(x.keys); }, [])).slice(0, 24);
  } else {
    W.forEach(function (w) { if (!seenWord(w)) intro[w.id] = true; typesOf(w).forEach(function (t) { if (eligible(w, t)) q.push(key(w, t)); }); });
    q = shuffle(q).slice(0, 40);
  }
  ST.tab = "tekrar";
  S = q.length ? { mode: mode, queue: q, i: 0, intro: intro, introDone: {}, right: 0, wrong: 0, again: {}, cur: null, ans: null } : { mode: mode, empty: true };
  render();
}
function curItem() {
  if (!S || S.empty || S.i >= S.queue.length) return null;
  var k = S.queue[S.i], wid = k.split(":")[0];
  if (S.intro[wid] && !S.introDone[wid]) return { intro: WBY[wid] };
  if (!S.cur || S.cur.k !== k) { S.cur = makeQ(k); S.ans = null; }
  return { q: S.cur };
}
function answer(i) {
  var q = S.cur; if (!q || S.ans !== null) return;
  var o = q.opts[i], ok = o === q.ok, r = rec(q.k) || (ST.lt[q.k] = { b: 1, due: TODAY, ok: 0, ng: 0 });
  S.ans = o; hist(q.k, ok);
  if (ok) { if (!S.again[q.k]) { r.b = Math.min(5, r.b + 1); r.due = TODAY + (r.b === 5 && r.ok > 4 ? 30 : DAYS[r.b]); } r.ok++; S.right++; xp(3); beep("ok"); }
  else { r.b = 1; r.due = TODAY + 1; r.ng++; S.wrong++; beep("no"); if (!S.again[q.k]) { S.again[q.k] = 1; S.queue.splice(Math.min(S.queue.length, S.i + 4), 0, q.k); } }
  save(); render();
}
function next() {
  var it = curItem();
  if (it && it.intro) { S.introDone[it.intro.id] = true; if (S.mode === "daily") { ST.stats.newN++; save(); } }
  else { S.i++; S.cur = null; S.ans = null; }
  if (S.i >= S.queue.length) { xp(10); beep("end"); }
  render();
}
function summary() {
  var c = [0, 0, 0, 0, 0, 0];
  W.forEach(function (w) { typesOf(w).forEach(function (t) { var r = rec(key(w, t)); c[r ? r.b : 0]++; }); });
  var tot = c.reduce(function (a, b) { return a + b; }, 0);
  return '<div class="sumrow"><div><b class="tabular">' + dueKeys().length + '</b><span>tekrar kartı</span></div><div><b class="tabular">' + newWords().length + '</b><span>yeni kelime</span></div><div><b class="tabular">' + W.filter(learned).length + ' / ' + W.length + '</b><span>öğrenilen kelime</span></div></div>' +
    '<div class="leitner">' + [0, 1, 2, 3, 4, 5].map(function (b) {
      var lb = b === 0 ? "Yeni" : b + ". kutu", sub = ["görülmedi", "her gün", "1 gün sonra", "3 gün sonra", "1 hafta sonra", "2 haftada bir"][b];
      return '<div class="lbox b' + b + '"><div class="lbar"><i style="height:' + (tot ? Math.max(4, Math.round(c[b] / tot * 100)) : 4) + '%"></i></div><b class="tabular">' + c[b] + '</b><span>' + lb + '</span><small class="muted">' + sub + '</small></div>';
    }).join("") + '</div>';
}
function renderTekrar() {
  if (!S) return '<div class="card stack"><div class="lbl">Aralıklı tekrar</div><h2>Bu dersin kelimeleri</h2><p class="muted">Her kelimenin anlamı, çoğulu, tekili, eş ve zıt anlamlısı ayrı birer karttır. Doğru bildiğin kart bir üst kutuya çıkar ve daha seyrek sorulur; yanlış bildiğin kart birinci kutuya döner. 4. kutuya ulaşan kart “öğrenildi” sayılır.</p>' + summary() +
    '<div class="row-btns"><button class="btn solid big" data-ksess="daily">Günlük tekrara başla</button><button class="btn" data-ksess="all">Bütün kelimeleri çalış</button></div>' +
    '<div class="setrow"><span>Günde kaç yeni kelime?</span><div class="seg">' + [4, 6, 10, 20].map(function (n) { return '<button data-kperday="' + n + '" aria-pressed="' + (ST.perDay === n) + '">' + n + '</button>'; }).join("") + '</div></div></div>';
  if (S.empty) { var m = S.mode; S = null; return '<div class="card stack center"><h2>' + (m === "weak" ? "Zayıf kelimen yok" : "Bugün için kart kalmadı") + '</h2><p class="muted">Yarın yeni kartlar gelecek. Bu arada kelime oyunlarını oynayabilirsin.</p><div class="row-btns center"><button class="btn solid" data-ktab="oyun">Kelime oyunları</button><button class="btn" data-ktab="tekrar">Geri</button></div></div>'; }
  var it = curItem(), n = S.queue.length, pc = Math.round(S.i / n * 100);
  var head = '<div class="hud"><span>Kart <b>' + Math.min(S.i + 1, n) + '</b> / ' + n + '</span><span>Doğru <b>' + S.right + '</b></span><span>Yanlış <b>' + S.wrong + '</b></span></div><div class="time-bar"><div style="width:' + pc + '%"></div></div>';
  if (!it) {
    var t = S.right + S.wrong, oran = t ? Math.round(S.right / t * 100) : 0; S = null;
    return '<div class="card stack center"><div class="lbl">Oturum bitti</div><div class="score-big tabular">%' + oran + '</div><p>' + t + ' sorudan ' + Math.round(oran * t / 100) + ' doğru.</p><div class="row-btns center"><button class="btn solid" data-ktab="tekrar">Kutulara dön</button><button class="btn" data-ktab="zayif">Zayıf kelimeler</button><button class="btn" data-ktab="oyun">Kelime oyunları</button></div></div>';
  }
  if (it.intro) return '<div class="card stack">' + head + '<div class="lbl">Yeni kelime · tanış</div><p class="muted">Kelimeyi, çoğulunu, eş ve zıt anlamlısını oku; 🔊 ile dinle. Sonra sorular gelecek.</p>' + aile(it.intro, { dots: false }) + '<div class="row-btns"><button class="btn solid" data-knext="1">Anladım, sor <span class="kbd">Enter</span></button></div></div>';
  var q = it.q, w = q.w;
  return '<div class="card stack">' + head +
    '<div class="qcard r-' + TYPES[q.t].col + '"><span class="qtype">' + TYPES[q.t].tr + '</span><div class="target"><span class="ar">' + q.prompt + '</span></div><p class="qask"><b>' + TYPES[q.t].ask + '</b>' + (q.t !== "a" ? ' <span class="muted">(' + esc(w.tr) + ')</span>' : '') + '</p></div>' +
    optBtns(q, "data-kans", S.ans) +
    (S.ans !== null ? '<p class="fb">' + (S.ans === q.ok ? '<span class="ok">Doğru!</span> Kart bir üst kutuya çıktı.' : '<span class="no">Yanlış.</span> Doğrusu: ' + (q.lat ? '<b>' + esc(q.ok) + '</b>' : ar(q.ok)) + '. Kart birinci kutuya döndü; birazdan yeniden sorulacak.') + '</p>' + aile(w) + '<div class="row-btns"><button class="btn solid" data-knext="1">Sonraki <span class="kbd">Enter</span></button></div>' : '<p class="muted small">Klavye: 1–4 ile seç.</p>') + '</div>';
}

// ---------- liste ve kalıplar ----------
var FIND = { q: "" };
function renderListe() {
  var q = bare(FIND.q.trim().toLowerCase());
  var ws = W.filter(function (w) { return !q || [w.w, w.c, w.e, w.z].some(function (x) { return x && bare(x).indexOf(q) >= 0; }) || w.tr.toLowerCase().indexOf(q) >= 0; });
  var by = {}; W.forEach(function (w) { if (w.c && w.k) (by[w.k] = by[w.k] || []).push(w); });
  return '<div class="card stack"><div class="lbl">Kelime kartları</div><h2>Metindeki kelimeler</h2><p class="muted">Bir kelimeye dokun: çoğulu, eş ve zıt anlamlısı, metindeki cümlesi ve kutuları açılır. Arama Arapça (harekesiz de olur) ya da Türkçe yapılabilir.</p>' +
    '<input class="search" id="khfind" type="search" placeholder="Ara" value="' + esc(FIND.q) + '" aria-label="Kelime ara">' +
    (ws.length ? '<div class="chips">' + ws.map(function (w) { return '<button class="wchip" data-kfam="' + w.id + '"><span class="ar">' + w.w + '</span><span class="small">' + esc(w.tr) + '</span><i class="lvdot" style="--lv:' + (wordLevel(w) / 5) + '"></i></button>'; }).join("") + '</div>' : '<p class="empty">Aramana uyan kelime yok.</p>') + '</div>' +
    '<div class="card stack"><div class="lbl">Çoğul kalıpları</div><h2>Çoğulları kalıplarıyla öğren</h2><p class="muted">Kırık çoğullar birkaç kalıba toplanır; aynı kalıptaki kelimeleri birlikte görmek yeni kelimelerin çoğulunu tahmin etmeyi kolaylaştırır.</p><div class="kalip-grid">' +
    Object.keys(KALIPLAR).filter(function (k) { return by[k]; }).map(function (k) {
      var p = KALIPLAR[k];
      return '<div class="kalip"><div class="kh"><span class="ar kp">' + p[0] + '</span><div><b>' + p[1] + '</b><small class="muted">' + p[2] + '</small></div><span class="cnt tabular">' + by[k].length + '</span></div><div class="chips">' +
        by[k].map(function (w) { return '<button class="wchip pl" data-kfam="' + w.id + '"><span class="ar">' + w.w + ' ← <span class="r-nasb">' + w.c + '</span></span></button>'; }).join("") + '</div></div>';
    }).join("") + '</div></div>';
}
function renderZayif() {
  var L = weakList();
  return '<div class="card stack"><div class="lbl">Zayıf kelimeler</div><h2>En çok zorlandığın kelimeler</h2><p class="muted">Tekrarda ve kelime oyunlarında yanlış yaptığın kelimeler burada toplanır; doğru cevapladıkça listeden düşer.</p>' +
    (L.length ? '<div class="row-btns"><button class="btn solid" data-ksess="weak">Zayıf kelimeleri çalış</button></div><div class="weak-list">' + L.slice(0, 40).map(function (x) {
      return '<button class="weak" data-kfam="' + x.w.id + '"><span class="ar">' + x.w.w + '</span><span>' + esc(x.w.tr) + '</span><span class="muted small">' + Object.keys(x.types).map(function (t) { return TYPES[t].tr; }).join(", ") + '</span><span class="cnt"><b class="r-bad">' + x.ng + '</b> yanlış · <b class="r-good">' + x.ok + '</b> doğru</span></button>';
    }).join("") + '</div>' : '<p class="empty">Henüz zayıf kelimen yok.</p>') + '</div>';
}

// ---------- oyunlar ----------
var GAMES = {
  fab: { name: "Kalıp Fabrikası", ico: "طَالِبٌ ← فُعَّالٌ", col: "nasb", d: "Tekil kelime banttan gelir: hangi çoğul kalıbının makinesine girmeli?" },
  mik: { name: "Mıknatıs", ico: "كَبِيرٌ ≠ صَغِيرٌ", col: "ref", d: "Açık kartlarda eşleri birbirine yapıştır: eş anlam, zıt anlam ya da tekil–çoğul." },
  haf: { name: "Hafıza", ico: "؟ ↔ ؟", col: "mi", d: "Kartlar kapalı. İkişer çevir, eşleri bul." },
  dus: { name: "Düşen Kelimeler", ico: "⇣ سَنَةٌ", col: "cerr", d: "Kelime yere düşmeden doğru sepete dokun. Üç can, giderek artan hız." },
  cum: { name: "Cümlede Değiştir", ico: "قَرِيبٌ ← بَعِيدٌ", col: "mz", d: "Metindeki cümlede koyu kelimenin yerine eş ya da zıt anlamlısını koy." },
  hiz: { name: "Hız Turu", ico: "صَحِيحٌ · خَطَأٌ", col: "muz", d: "60 saniye: ilişki doğru mu yanlış mı? Klavye: 1 / 2." }
};
var MODES = { e: ["Eş anlam", "="], z: ["Zıt anlam", "≠"], c: ["Tekil–çoğul", "←"] };
var G = null, GT = null;
function stopGame() { if (GT) { clearInterval(GT); GT = null; } }
function gxp(n, k, ok) { if (k) hist(k, ok); if (ok) xp(n); save(); }
function gamesAvail() {
  return {
    fab: W.filter(function (w) { return w.c && KALIPLAR[w.k] && w.k !== "diger"; }).length >= 3,
    mik: true, haf: true, dus: true,
    cum: W.filter(function (w) { return w.s && w.sw && (w.e || w.z); }).length >= 3, hiz: true
  };
}
function modeOk(m) { return W.filter(function (w) { return w[m]; }).length >= 4; }
function renderOyun() {
  var av = gamesAvail();
  if (!G) return '<div class="card stack"><div class="lbl">Kelime oyunları</div><h2>Oynayarak ezberle</h2><p class="muted">Oyunlar bu dersin kelimelerini kullanır. Yanlış yaptığın kelimeler “Zayıf kelimeler” listesine eklenir.</p></div><div class="game-menu">' +
    Object.keys(GAMES).filter(function (k) { return av[k]; }).map(function (k) { var g = GAMES[k]; return '<div class="card game-card" style="--role:var(--' + g.col + ')"><div class="ico">' + g.ico + '</div><h3>' + g.name + '</h3><p class="muted">' + g.d + '</p><div class="row-btns">' + ((k === "mik" || k === "haf") ? Object.keys(MODES).filter(modeOk).map(function (m) { return '<button class="btn small" data-kgstart="' + k + '" data-kmode="' + m + '">' + MODES[m][0] + '</button>'; }).join("") : '<button class="btn small solid" data-kgstart="' + k + '">Başla</button>') + '</div></div>'; }).join("") + '</div>';
  var g = GAMES[G.id];
  var top = '<div style="width:100%;text-align:left;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="lbl">Kelime oyunu</div><h2>' + g.name + (G.mode ? ' <span class="muted small">· ' + MODES[G.mode][0] + '</span>' : '') + '</h2></div><button class="btn small" data-kgmenu="1">Oyunlara dön</button></div>';
  if (G.done) return '<div class="card stack center">' + top + '<div class="score-big tabular">' + G.score + '</div><p>' + G.endMsg + '</p><div class="row-btns center"><button class="btn solid" data-kgstart="' + G.id + '"' + (G.mode ? ' data-kmode="' + G.mode + '"' : '') + '>Yeniden oyna</button><button class="btn" data-kgmenu="1">Başka oyun</button></div></div>';
  return '<div class="card stack">' + top + GR[G.id]() + '</div>';
}
function endGame(msg) { stopGame(); G.done = true; G.endMsg = msg; beep("end"); xp(10); save(); render(); }
function fabRound() {
  var pool = W.filter(function (w) { return w.c && KALIPLAR[w.k] && w.k !== "diger"; }), w = pick(pool);
  var ks = shuffle(Object.keys(KALIPLAR).filter(function (k) { return k !== w.k && k !== "diger"; })).slice(0, 3);
  G.cur = { w: w, opts: shuffle([w.k].concat(ks)) }; G.ans = null;
}
var GR = {
  fab: function () {
    var c = G.cur, w = c.w;
    return '<div class="hud"><span>Tur <b>' + (G.r + 1) + '</b> / 10</span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="belt"><div class="belt-in"><span class="ar">' + w.w + '</span><small>' + esc(w.tr) + '</small></div><span class="belt-arr">⟵</span><div class="machine' + (G.ans ? " on" : "") + '">' + (G.ans ? '<span class="ar">' + KALIPLAR[w.k][0] + '</span>' : '⚙') + '</div><span class="belt-arr">⟵</span><div class="belt-out' + (G.ans ? " on" : "") + '">' + (G.ans ? '<span class="ar r-nasb">' + w.c + '</span>' : '<span class="muted">?</span>') + '</div></div>' +
      '<p class="qask"><b>Bu kelime hangi çoğul kalıbına girer?</b></p><div class="kopts">' + c.opts.map(function (k, i) {
        var cl = "kopt"; if (G.ans) { if (k === w.k) cl += " sel-ok"; else if (k === G.ans) cl += " sel-no"; }
        return '<button class="' + cl + '" data-kfab="' + i + '"' + (G.ans ? " disabled" : "") + '><span class="ar">' + KALIPLAR[k][0] + '</span><small>' + KALIPLAR[k][1] + '</small></button>';
      }).join("") + '</div>' +
      (G.ans ? '<p class="fb">' + (G.ans === w.k ? '<span class="ok">Doğru!</span> ' : '<span class="no">Yanlış.</span> ') + ar(w.w + ' ← ' + w.c) + ' · ' + KALIPLAR[w.k][1] + ' kalıbı.</p><div class="row-btns"><button class="btn solid" data-kgnext="1">' + (G.r >= 9 ? "Bitir" : "Sonraki") + '</button></div>' : '');
  },
  mik: function () { return pairBoard(false); },
  haf: function () { return pairBoard(true); },
  dus: function () {
    var c = G.cur;
    return '<div class="hud"><span>Can <b>' + "♥♥♥".slice(0, G.lives) + '<span class="muted">' + "♥♥♥".slice(G.lives) + '</span></b></span><span>Puan <b>' + G.score + '</b></span><span>Kelime <b>' + (G.r + 1) + '</b> / 20</span></div>' +
      '<div class="sky"><div class="faller r-' + TYPES[c.t].col + '" id="khfaller" style="top:' + (G.pos * 0.78) + '%"><span class="ar">' + c.prompt + '</span><small>' + TYPES[c.t].ask.replace(" hangisi?", "?").replace(" nedir?", "?") + '</small></div>' + (G.msg ? '<div class="skymsg">' + G.msg + '</div>' : '') + '</div>' +
      '<div class="baskets">' + c.opts.map(function (o, i) { var cl = "basket"; if (G.ans !== null) { if (o === c.ok) cl += " sel-ok"; else if (o === G.ans) cl += " sel-no"; } return '<button class="' + cl + '" data-kdus="' + i + '"' + (G.ans !== null ? " disabled" : "") + '>' + (c.lat ? esc(o) : '<span class="ar">' + o + '</span>') + '</button>'; }).join("") + '</div>';
  },
  cum: function () {
    var c = G.cur, w = c.w;
    return '<div class="hud"><span>Cümle <b>' + (G.r + 1) + '</b> / 10</span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="sentcard"><div class="ar">' + hlSent(w) + '</div><small class="muted">' + esc(w.st) + '</small></div>' +
      '<p class="qask">Koyu kelimenin sözlük biçimi ' + ar(w.w) + ' <span class="muted">(' + esc(w.tr) + ')</span>. Yerine <b class="r-' + TYPES[c.t].col + '">' + (c.t === "e" ? "eş anlamlısını (anlam aynı kalsın)" : "zıt anlamlısını (anlam tersine dönsün)") + '</b> koy:</p>' +
      optBtns(c, "data-kcum", G.ans) +
      (G.ans !== null ? '<p class="fb">' + (G.ans === c.ok ? '<span class="ok">Doğru!</span> ' : '<span class="no">Yanlış.</span> ') + ar(w.w + ' ' + (c.t === "e" ? "=" : "≠") + ' ' + c.ok) + '</p><div class="row-btns"><button class="btn solid" data-kgnext="1">' + (G.r >= 9 ? "Bitir" : "Sonraki") + '</button></div>' : '');
  },
  hiz: function () {
    var c = G.cur;
    return '<div class="hud"><span>Süre <b id="khhz">' + G.t + '</b></span><span>Puan <b>' + G.score + '</b></span><span>Seri <b>x' + Math.min(5, 1 + Math.floor(G.streak / 3)) + '</b></span></div><div class="time-bar' + (G.t <= 10 ? " low" : "") + '" id="khbar"><div style="width:' + (G.t / 60 * 100) + '%"></div></div>' +
      '<div class="target' + (G.flash ? " flash-" + G.flash : "") + '"><span class="ar">' + c.w.w + '</span> <span class="rel r-' + TYPES[c.t].col + '">' + { a: "anlamı:", c: "çoğulu:", e: "eş anlamlısı:", z: "zıt anlamlısı:" }[c.t] + '</span> ' + (c.t === "a" ? '<span class="lat-c">' + esc(c.cand) + '</span>' : '<span class="ar">' + c.cand + '</span>') + '</div>' +
      '<div class="big2"><button style="--role:var(--good)" data-khiz="1">Doğru<small>1</small></button><button style="--role:var(--bad)" data-khiz="0">Yanlış<small>2</small></button></div><div class="gfb">' + (G.last || '&nbsp;') + '</div>';
  }
};
function pairBoard(hidden) {
  return '<div class="hud"><span>Eşleşen <b>' + G.matched + '</b> / ' + G.pairs.length + '</span><span>' + (hidden ? 'Hamle' : 'Hata') + ' <b>' + (hidden ? G.moves : G.miss) + '</b></span><span>Süre <b id="khpt">' + G.sec + '</b> sn</span></div>' +
    '<div class="pboard' + (hidden ? " hidden" : "") + '">' + G.tiles.map(function (t, i) {
      var open = !hidden || t.done || G.sel.indexOf(i) >= 0, cl = "ptile" + (t.done ? " done" : "") + (G.sel.indexOf(i) >= 0 ? " sel" : "") + (G.bad && G.bad.indexOf(i) >= 0 ? " bad" : "") + (t.side ? " s1" : "");
      return '<button class="' + cl + '" data-kpt="' + i + '"' + (t.done ? " disabled" : "") + '>' + (open ? '<span class="ar">' + t.text + '</span>' : '<span class="back">؟</span>') + '</button>';
    }).join("") + '</div>' +
    (G.log.length ? '<div class="plog">' + G.log.map(function (p) { return '<span class="badge r-' + (G.mode === "z" ? "ref" : G.mode === "e" ? "mz" : "nasb") + '"><span class="ar">' + p[0] + ' ' + MODES[G.mode][1] + ' ' + p[1] + '</span>' + esc(p[2]) + '</span>'; }).join("") + '</div>' : '');
}
function startGame(id, mode) {
  stopGame(); closeFam();
  G = { id: id, mode: mode || null, r: 0, score: 0, done: false };
  if (id === "fab") fabRound();
  if (id === "mik" || id === "haf") {
    var f = mode, used = {}, pairs = [];
    shuffle(W).forEach(function (w) { if (pairs.length >= 6 || !w[f] || used[w.w] || used[w[f]]) return; used[w.w] = used[w[f]] = 1; pairs.push(w); });
    G.pairs = pairs; G.tiles = shuffle(pairs.reduce(function (a, w, i) { return a.concat([{ p: i, side: 0, text: w.w }, { p: i, side: 1, text: w[f] }]); }, []));
    G.sel = []; G.matched = 0; G.miss = 0; G.moves = 0; G.sec = 0; G.log = [];
    GT = setInterval(function () { G.sec++; var el = document.getElementById("khpt"); if (el) el.textContent = G.sec; }, 1000);
  }
  if (id === "dus") { G.lives = 3; dusRound(); }
  if (id === "cum") cumRound();
  if (id === "hiz") {
    G.t = 60; G.streak = 0; G.n = 0; hizRound();
    GT = setInterval(function () { G.t--; if (G.t <= 0) return endGame(G.n + " ifade değerlendirdin."); var el = document.getElementById("khhz"); if (el) el.textContent = G.t; var b = document.getElementById("khbar"); if (b) { b.firstChild.style.width = (G.t / 60 * 100) + "%"; b.classList.toggle("low", G.t <= 10); } }, 1000);
  }
  ST.tab = "oyun"; render();
}
function pairTap(i) {
  var t = G.tiles[i]; if (t.done || G.sel.indexOf(i) >= 0 || G.lock) return;
  G.sel.push(i); G.bad = null;
  if (G.sel.length === 2) {
    var a = G.tiles[G.sel[0]], b = G.tiles[G.sel[1]], w = G.pairs[a.p], k = key(w, G.mode);
    G.moves++;
    if (a.p === b.p && a.side !== b.side) {
      a.done = b.done = true; G.matched++; G.score += 10; G.sel = []; G.log.push([w.w, w[G.mode], w.tr]); beep("ok"); gxp(2, k, true);
      if (G.matched === G.pairs.length) { G.score += Math.max(0, 60 - G.sec) + (G.id === "mik" ? Math.max(0, 30 - G.miss * 5) : Math.max(0, 40 - (G.moves - G.pairs.length) * 3)); return endGame("Bütün çiftleri " + G.sec + " saniyede " + (G.id === "haf" ? G.moves + " hamlede " : "") + "buldun" + (G.id === "mik" ? ", " + G.miss + " hata" : "") + "."); }
    } else {
      G.miss++; beep("no"); G.bad = G.sel.slice(); gxp(0, k, false);
      if (G.id === "haf") { G.lock = true; render(); setTimeout(function () { if (!G) return; G.sel = []; G.bad = null; G.lock = false; render(); }, 900); return; }
      G.sel = [];
    }
  }
  render();
}
function dusRound() {
  var w = pick(W), ts = typesOf(w).filter(function (t) { return t !== "t"; }), t = pick(ts.length > 1 ? ts.filter(function (x) { return x !== "a"; }) : ts);
  var q = makeQ(key(w, t)); q.opts = shuffle([q.ok].concat(q.opts.filter(function (o) { return o !== q.ok; }).slice(0, 2)));
  G.cur = q; G.pos = 0; G.ans = null; G.msg = "";
  var dur = Math.max(3.2, 8 - G.r * 0.25) * 1000, t0 = Date.now();
  stopGame();
  GT = setInterval(function () {
    G.pos = Math.min(100, (Date.now() - t0) / dur * 100);
    var el = document.getElementById("khfaller"); if (el) el.style.top = (G.pos * 0.78) + "%";
    if (G.pos >= 100) { stopGame(); dusAnswer(-1); }
  }, 50);
}
function dusAnswer(i) {
  if (!G || G.ans !== null) return; stopGame();
  var c = G.cur, o = i < 0 ? "" : c.opts[i], ok = o === c.ok;
  G.ans = o;
  if (ok) { var bonus = Math.round((100 - G.pos) / 10); G.score += 10 + bonus; G.msg = '<span class="ok">Doğru! +' + (10 + bonus) + '</span>'; beep("ok"); }
  else { G.lives--; G.msg = '<span class="no">' + (i < 0 ? "Yere düştü!" : "Yanlış sepet!") + '</span> Doğrusu: ' + (c.lat ? esc(c.ok) : ar(c.ok)); beep("no"); }
  gxp(ok ? 3 : 0, c.k, ok); render();
  setTimeout(function () {
    if (!G || G.id !== "dus" || G.done) return;
    G.r++;
    if (G.lives <= 0 || G.r >= 20) return endGame(G.r + " kelime düştü, " + (3 - G.lives) + " can kaybettin.");
    dusRound(); render();
  }, ok ? 800 : 1600);
}
function cumRound() {
  var pool = W.filter(function (w) { return w.s && w.sw && w.s.indexOf(w.sw) >= 0 && (w.e || w.z); });
  var w = pick(pool), t = w.e && w.z ? pick(["e", "z"]) : w.e ? "e" : "z", q = makeQ(key(w, t));
  q.opts = shuffle([q.ok].concat(q.opts.filter(function (o) { return o !== q.ok; }).slice(0, 2)));
  G.cur = q; G.ans = null;
}
function hizRound() {
  var w = pick(W), ts = typesOf(w).filter(function (t) { return t !== "t"; }), t = pick(ts), f = { a: "tr", c: "c", e: "e", z: "z" }[t];
  var truth = Math.random() < 0.5, cand = w[f];
  if (!truth) { var alt = (t === "e" && w.z) ? [w.z] : (t === "z" && w.e) ? [w.e] : []; alt = alt.concat(others(w, f)); cand = alt[0]; if (!cand) { truth = true; cand = w[f]; } }
  G.cur = { w: w, t: t, cand: cand, truth: truth, k: key(w, t) };
}
function hizAnswer(v) {
  var c = G.cur, ok = (v === 1) === c.truth;
  G.n++;
  if (ok) { G.streak++; var m = Math.min(5, 1 + Math.floor(G.streak / 3)); G.score += 10 * m; G.flash = "ok"; beep("ok"); G.last = '<span class="ok">Doğru +' + (10 * m) + '</span>'; }
  else { G.streak = 0; G.flash = "no"; beep("no"); G.last = '<span class="no">Yanlış.</span> ' + (c.t === "a" ? ar(c.w.w) + ' → ' + esc(c.w.tr) : ar(c.w.w + ' ← ' + c.w[c.t])); }
  gxp(ok ? 1 : 0, c.k, ok); hizRound(); render();
}

// ---------- çatı ----------
var SUB = [["tekrar", "Aralıklı tekrar"], ["liste", "Kelime kartları"], ["oyun", "Kelime oyunları"], ["zayif", "Zayıf kelimeler"]];
function render() {
  if (!ROOT || !document.body.contains(ROOT)) return;
  var y = window.scrollY;
  ROOT.innerHTML = '<div class="card stack khhead"><div class="lbl">Kelime hazinesi · ' + W.length + ' kelime</div><div class="seg khsub" role="tablist">' + SUB.map(function (s) { return '<button role="tab" data-ktab="' + s[0] + '" aria-pressed="' + (ST.tab === s[0]) + '">' + s[1] + '</button>'; }).join("") + '</div></div>' +
    ({ tekrar: renderTekrar, liste: renderListe, oyun: renderOyun, zayif: renderZayif }[ST.tab])();
  window.scrollTo(0, y);
}
function onClick(e) {
  var b = e.target.closest("button"); if (!b || !ROOT.contains(b)) return;
  var d = b.dataset;
  if (d.ktab) { if (d.ktab !== "oyun" && G) { stopGame(); G = null; } if (d.ktab === "tekrar") S = S && !S.empty ? S : null; ST.tab = d.ktab; closeFam(); return render(); }
  if (d.ksay) return sayAr(d.ksay);
  if (d.kfam) return openFam(d.kfam);
  if (d.ksess) return startSession(d.ksess);
  if (d.kans != null) return answer(+d.kans);
  if (d.knext) return next();
  if (d.kperday) { ST.perDay = +d.kperday; save(); return render(); }
  if (d.kgstart) return startGame(d.kgstart, d.kmode);
  if (d.kgmenu) { stopGame(); G = null; return render(); }
  if (!G) return;
  if (d.kfab != null && !G.ans) { var k = G.cur.opts[+d.kfab], ok = k === G.cur.w.k; G.ans = k; if (ok) { G.score += 10; beep("ok"); } else beep("no"); gxp(3, key(G.cur.w, "c"), ok); return render(); }
  if (d.kpt != null) return pairTap(+d.kpt);
  if (d.kdus != null) return dusAnswer(+d.kdus);
  if (d.kcum != null && G.ans === null) { var c = G.cur, o = c.opts[+d.kcum], ok2 = o === c.ok; G.ans = o; if (ok2) { G.score += 10; beep("ok"); } else beep("no"); gxp(3, c.k, ok2); return render(); }
  if (d.khiz != null) return hizAnswer(+d.khiz);
  if (d.kgnext) {
    G.r++;
    if (G.id === "fab") { if (G.r >= 10) return endGame("10 kelimenin " + G.score / 10 + " tanesinin kalıbını doğru buldun."); fabRound(); }
    if (G.id === "cum") { if (G.r >= 10) return endGame("10 cümlenin " + G.score / 10 + " tanesinde doğru kelimeyi koydun."); cumRound(); }
    return render();
  }
}
document.addEventListener("input", function (e) {
  if (e.target.id !== "khfind") return;
  FIND.q = e.target.value; var pos = e.target.selectionStart; render();
  var f = document.getElementById("khfind"); if (f) { f.focus(); try { f.setSelectionRange(pos, pos); } catch (x) {} }
});
document.addEventListener("keydown", function (e) {
  if (!ROOT || !document.body.contains(ROOT) || e.target.tagName === "INPUT") return;
  if (e.key === "Escape") return closeFam();
  var n = parseInt(e.key, 10), q = function (s) { var x = ROOT.querySelector(s); if (x && !x.disabled) { e.preventDefault(); x.click(); } };
  if (ST.tab === "tekrar" && S) { if (e.key === "Enter") return q("[data-knext]"); if (n >= 1 && n <= 4) return q('[data-kans="' + (n - 1) + '"]'); return; }
  if (ST.tab === "oyun" && G && !G.done) {
    if (G.id === "hiz" && (n === 1 || n === 2)) return hizAnswer(n === 1 ? 1 : 0);
    var sel = { fab: "data-kfab", dus: "data-kdus", cum: "data-kcum" }[G.id];
    if (sel && n >= 1 && n <= 4) return q("[" + sel + '="' + (n - 1) + '"]');
    if (e.key === "Enter") q("[data-kgnext]");
  }
});
window.KHMOD = {
  mount: function (el) { ROOT = el; el.addEventListener("click", onClick); render(); },
  stop: function () { stopGame(); G = null; closeFam(); },
  count: function () { return dueKeys().length + newWords().length; }
};
})();
