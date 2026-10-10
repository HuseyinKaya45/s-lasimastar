(function () {
"use strict";
// ---------- yardımcılar ----------
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function bare(s) { return String(s).replace(/[ً-ْٰـ]/g, "").replace(/[أإآٱ]/g, "ا"); }
function ar(s) { return '<span class="ar">' + s + '</span>'; }
var store = {
  get: function (k, d) { try { var v = localStorage.getItem("okumakelime:" + k); return v === null ? d : JSON.parse(v); } catch (x) { return d; } },
  set: function (k, v) { try { localStorage.setItem("okumakelime:" + k, JSON.stringify(v)); } catch (x) {} }
};
function dayNum() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
var TODAY = dayNum();
var main = document.getElementById("main");
function toast(t) { var el = document.getElementById("toast"); el.innerHTML = t; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove("show"); }, 1800); }

// ---------- ses ----------
var SND = { on: store.get("snd", true), ctx: null };
function beep(kind) {
  if (!SND.on) return;
  try {
    SND.ctx = SND.ctx || new (window.AudioContext || window.webkitAudioContext)();
    var c = SND.ctx, o = c.createOscillator(), g = c.createGain(), f = { ok: [660, 880], no: [220, 160], tick: [520, 520], end: [523, 784] }[kind] || [440, 440];
    o.frequency.setValueAtTime(f[0], c.currentTime); o.frequency.linearRampToValueAtTime(f[1], c.currentTime + 0.15);
    g.gain.setValueAtTime(0.08, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.26);
  } catch (x) {}
}
function sayAr(t) {
  try {
    if (!window.speechSynthesis) { toast("Bu tarayıcı sesli okumayı desteklemiyor."); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(t).replace(/<[^>]+>/g, "")), v = speechSynthesis.getVoices().filter(function (x) { return /^ar/i.test(x.lang); })[0];
    u.lang = "ar-SA"; u.rate = 0.8; if (v) u.voice = v; speechSynthesis.speak(u);
  } catch (x) {}
}

// ---------- veri dizinleri ----------
var W = KELIMELER, WBY = {}, DBY = {};
W.forEach(function (w) { WBY[w.id] = w; });
DERSLER.forEach(function (d, i) { d.no = i; DBY[d.id] = d; });
var TYPES = {
  a: { tr: "Anlam", ask: "Anlamı nedir?", col: "cerr" },
  c: { tr: "Çoğul", ask: "Çoğulu hangisi?", col: "nasb" },
  t: { tr: "Tekil", ask: "Tekili hangisi?", col: "mi" },
  e: { tr: "Eş anlam", ask: "Eş anlamlısı hangisi?", col: "mz" },
  z: { tr: "Zıt anlam", ask: "Zıt anlamlısı hangisi?", col: "ref" },
  r: { tr: "Arapçası", ask: "Arapçası hangisi?", col: "muz" }
};
var TUR = { i: "isim", s: "sıfat", f: "fiil", z: "zarf", h: "terkip" };
var TURL = [["all", "Hepsi"], ["i", "İsimler"], ["s", "Sıfatlar"], ["f", "Fiiller"], ["z", "Zarflar"], ["h", "Terkipler"]];
var CAT = { a: "1–5. dersler", b: "6–10. dersler" };

// ---------- durum ----------
var ST = {
  scope: store.get("scope", { cat: "all", off: {} }),
  lt: store.get("lt", {}),       // Leitner: anahtar → {b, due, ok, ng}
  hist: store.get("hist", {}),   // oyun + tekrar: anahtar → {ok, ng}
  stats: store.get("stats", { xp: 0, streak: 0, last: -1, newDay: -1, newN: 0 }),
  perDay: store.get("perDay", 5)
};
function save() { store.set("scope", ST.scope); store.set("lt", ST.lt); store.set("hist", ST.hist); store.set("stats", ST.stats); store.set("perDay", ST.perDay); }
var DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };
var RANKS = [[0, "Mübtedî"], [150, "Talebe"], [400, "Kâtip"], [900, "Edîb"], [1800, "Âlim"], [3500, "Allâme"]];

function lessonOn(id) { var d = DBY[id]; return (ST.scope.cat === "all" || d.cat === ST.scope.cat) && !ST.scope.off[id]; }
function inScope(w) { return w.dl.some(lessonOn); }
function scopeWords() { var s = W.filter(inScope); return s.length ? s : W.slice(); }
function typesOf(w) { var r = ["a", "r"]; if (w.c) r.push("c"); if (w.e) r.push("e"); if (w.z) r.push("z"); if (w.c) r.push("t"); return r; }
function key(w, t) { return w.id + ":" + t; }
function rec(k) { return ST.lt[k]; }
function eligible(w, t) { if (t === "r") return ((rec(key(w, "a")) || {}).b || 0) >= 2; return t !== "t" || ((rec(key(w, "c")) || {}).b || 0) >= 3; }
function wordLevel(w) { var ts = typesOf(w), s = 0; ts.forEach(function (t) { s += ((rec(key(w, t)) || {}).b || 0); }); return s / ts.length; }
function learned(w) { return typesOf(w).every(function (t) { return ((rec(key(w, t)) || {}).b || 0) >= 4; }); }
function seenWord(w) { return !!rec(key(w, "a")); }
function addXp(n) { ST.stats.xp += n; renderXp(); }
function touchStreak() {
  var s = ST.stats;
  if (s.last === TODAY) return;
  s.streak = s.last === TODAY - 1 ? s.streak + 1 : 1; s.last = TODAY;
}
function hist(k, ok) { var h = ST.hist[k] || (ST.hist[k] = { ok: 0, ng: 0 }); if (ok) h.ok++; else h.ng++; }

function renderXp() {
  var xp = ST.stats.xp, i = 0; while (i + 1 < RANKS.length && xp >= RANKS[i + 1][0]) i++;
  var nx = RANKS[i + 1], pc = nx ? Math.round((xp - RANKS[i][0]) / (nx[0] - RANKS[i][0]) * 100) : 100;
  var streak = ST.stats.last >= TODAY - 1 ? ST.stats.streak : 0;
  document.getElementById("xpbox").innerHTML = '<div class="row"><span class="lbl">Rütbe</span><span class="tabular">' + xp + ' puan</span></div>' +
    '<div class="row"><b class="rank">' + RANKS[i][1] + '</b><span class="muted">' + (nx ? "sonra: " + nx[1] : "en yüksek rütbe") + '</span></div>' +
    '<div class="xpbar"><div style="width:' + pc + '%"></div></div>' +
    '<div class="row"><span class="muted">Seri</span><b class="tabular">' + streak + ' gün</b></div>';
}

// ---------- kelime ailesi kartı ----------
function hlSent(w) { if (!w.s) return ""; return w.sw && w.s.indexOf(w.sw) >= 0 ? w.s.replace(w.sw, '<b class="hl">' + w.sw + '</b>') : w.s; }
function kalipAd(k) { var p = KALIPLAR[k]; return p ? ar(p[0]) + ' <span class="muted">' + p[1] + '</span>' : ''; }
function dots(w) {
  return '<div class="lv-row">' + typesOf(w).map(function (t) { var b = (rec(key(w, t)) || {}).b || 0; return '<span class="lv r-' + TYPES[t].col + '" title="' + TYPES[t].tr + ': kutu ' + b + '/5"><b class="trk"><i style="width:' + (b * 20) + '%"></i></b><small>' + TYPES[t].tr + '</small></span>'; }).join("") + '</div>';
}
function aile(w, opt) {
  opt = opt || {};
  function cell(lbl, col, val, sub) { return '<div class="fam-cell r-' + col + '"><span class="lbl">' + lbl + '</span>' + (val ? '<span class="ar v">' + val + '</span>' + (sub ? '<small>' + sub + '</small>' : '') : '<span class="muted v0">—</span>') + '</div>'; }
  return '<div class="fam">' +
    '<div class="fam-head"><button class="say" data-say="' + esc(w.w) + '" aria-label="Dinle">🔊</button><div class="fam-main"><span class="ar fam-w">' + w.w + '</span><span class="fam-tr"><b>' + esc(w.tr) + '</b> <span class="muted">· ' + TUR[w.t] + '</span></span></div></div>' +
    '<div class="fam-grid">' + cell("Çoğulu", "nasb", w.c, w.k && KALIPLAR[w.k] ? kalipAd(w.k) : "") + cell("Eş anlamlısı =", "mz", w.e) + cell("Zıt anlamlısı ≠", "ref", w.z) + '</div>' +
    (w.s ? '<div class="fam-s"><button class="say small" data-say="' + esc(w.s) + '" aria-label="Cümleyi dinle">🔊</button><div><div class="ar">' + hlSent(w) + '</div><small class="muted">' + esc(w.st) + '</small></div></div>' : '') +
    '<div class="fam-foot"><span class="muted">' + w.dl.map(function (id) { return (DBY[id].no + 1) + '. ders · ' + esc(DBY[id].tr); }).join('<br>') + '</span>' + (opt.dots === false ? '' : dots(w)) + '</div></div>';
}
function openFam(id) {
  var w = WBY[id]; if (!w) return;
  var m = document.getElementById("modal") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "modal" }));
  m.className = "modal"; m.innerHTML = '<div class="modal-in card" role="dialog" aria-modal="true" aria-label="Kelime ailesi"><div class="modal-top"><span class="lbl">Kelime ailesi</span><button class="btn small" data-close="1">Kapat</button></div>' + aile(w) + '</div>';
  m.querySelector("[data-close]").focus();
}
function closeFam() { var m = document.getElementById("modal"); if (m) m.remove(); }

// ---------- soru üretici ----------
function others(w, f, pref) {
  var pool = scopeWords().length >= 12 ? scopeWords() : W, seen = {}, out = [], fav = [];
  seen[w[f]] = 1; seen[w.w] = 1;
  shuffle(pool).forEach(function (x) { var v = x[f]; if (!v || seen[v] || x.id === w.id) return; seen[v] = 1; (pref && pref(x) ? fav : out).push(v); });
  return fav.concat(out);
}
function makeQ(k) {
  var p = k.split(":"), w = WBY[p[0]], t = p[1], q = { k: k, w: w, t: t, lat: false }, ds;
  if (t === "a") { q.prompt = w.w; q.ok = w.tr; q.lat = true; ds = others(w, "tr", function (x) { return x.t === w.t; }); }
  if (t === "c") { q.prompt = w.w; q.ok = w.c; ds = others(w, "c", function (x) { return x.k === w.k; }); }
  if (t === "t") { q.prompt = w.c; q.ok = w.w; ds = others(w, "w", function (x) { return x.c && x.t === w.t; }); }
  if (t === "e") { q.prompt = w.w; q.ok = w.e; ds = (w.z ? [w.z] : []).concat(others(w, "e", function (x) { return x.t === w.t; })); }
  if (t === "z") { q.prompt = w.w; q.ok = w.z; ds = (w.e ? [w.e] : []).concat(others(w, "z", function (x) { return x.t === w.t; })); }
  if (t === "r") { q.prompt = w.tr; q.plat = true; q.ok = w.w; ds = others(w, "w", function (x) { return x.t === w.t; }); }
  ds = ds.filter(function (v, i) { return v !== q.ok && ds.indexOf(v) === i; }).slice(0, 3);
  q.opts = shuffle([q.ok].concat(ds));
  return q;
}
function optBtns(q, attr, done) {
  return '<div class="opts qopts' + (q.lat ? ' lat-opts' : '') + '">' + q.opts.map(function (o, i) {
    var cl = "opt block" + (q.lat ? " lat" : "");
    if (done) { if (o === q.ok) cl += " sel-ok"; else if (o === done) cl += " sel-no"; }
    return '<button class="' + cl + '" ' + attr + '="' + i + '"' + (done ? " disabled" : "") + '><span class="kn">' + (i + 1) + '</span>' + (q.lat ? esc(o) : '<span class="ar">' + o + '</span>') + '</button>';
  }).join("") + '</div>';
}

// ---------- tekrar oturumu ----------
var S = null;
function dueKeys() {
  var out = [];
  scopeWords().forEach(function (w) { typesOf(w).forEach(function (t) { var k = key(w, t), r = rec(k); if (r && r.due <= TODAY && eligible(w, t)) out.push(k); }); });
  return out.sort(function (a, b) { return rec(a).b - rec(b).b; });
}
function newWords() {
  if (ST.stats.newDay !== TODAY) { ST.stats.newDay = TODAY; ST.stats.newN = 0; }
  var left = Math.max(0, ST.perDay - ST.stats.newN);
  return scopeWords().filter(function (w) { return !seenWord(w); }).slice(0, left);
}
function startSession(mode, arg) {
  var q = [], intro = {};
  if (mode === "daily") {
    q = shuffle(dueKeys().slice(0, 30));
    newWords().forEach(function (w) { intro[w.id] = true; typesOf(w).forEach(function (t) { if (t !== "t" && t !== "r") q.push(key(w, t)); }); });
  } else if (mode === "weak") {
    q = shuffle(weakList().slice(0, 12).reduce(function (a, x) { return a.concat(x.keys); }, [])).slice(0, 24);
  } else if (mode === "ders") {
    W.filter(function (w) { return w.dl.indexOf(arg) >= 0; }).forEach(function (w) { if (!seenWord(w)) intro[w.id] = true; typesOf(w).forEach(function (t) { if (eligible(w, t)) q.push(key(w, t)); }); });
    q = shuffle(q);
  }
  if (!q.length) { S = { mode: mode, empty: true }; return go("tekrar"); }
  // tanışma: yeni kelimenin ilk sorusundan önce aile kartı
  S = { mode: mode, arg: arg, queue: q, i: 0, intro: intro, introDone: {}, right: 0, wrong: 0, again: {}, cur: null, ans: null, newN: Object.keys(intro).length };
  go("tekrar");
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
  S.ans = o; touchStreak(); hist(q.k, ok);
  if (ok) {
    if (!S.again[q.k]) { r.b = Math.min(5, r.b + 1); r.due = TODAY + (r.b === 5 && r.ok > 4 ? 30 : DAYS[r.b]); }
    r.ok++; S.right++; addXp(5); beep("ok");
  } else {
    r.b = 1; r.due = TODAY + 1; r.ng++; S.wrong++; beep("no");
    if (!S.again[q.k]) { S.again[q.k] = 1; S.queue.splice(Math.min(S.queue.length, S.i + 4), 0, q.k); }
  }
  save(); render();
}
function next() {
  if (!S) return;
  var it = curItem();
  if (it && it.intro) { S.introDone[it.intro.id] = true; if (S.mode === "daily") { ST.stats.newN++; save(); } }
  else { S.i++; S.cur = null; S.ans = null; }
  if (S.i >= S.queue.length) { addXp(10); beep("end"); }
  render();
}
function renderTekrar() {
  if (!S) return '<section class="panel"><div class="card stack center"><div class="lbl">Günlük tekrar</div><h2>Bugünün kartları hazır</h2>' + todaySummary() + '<div class="row-btns center"><button class="btn solid" data-sess="daily">Tekrara başla</button></div></div></section>';
  if (S.empty) { var m = S.mode; S = null; return '<section class="panel"><div class="card stack center"><h2>' + (m === "weak" ? "Zayıf kelimen yok" : "Bugün için kart kalmadı") + '</h2><p class="muted">' + (m === "weak" ? "Yanlış yaptığın kelimeler burada birikir." : "Yarın yeni kartlar gelecek. Bu arada oyun oynayabilir ya da bir dersi tekrar edebilirsin.") + '</p><div class="row-btns center"><button class="btn solid" data-go="oyun">Oyunlar</button><button class="btn" data-go="kelime">Kelimeler</button></div></div></section>'; }
  var it = curItem(), n = S.queue.length, pc = Math.round(S.i / n * 100);
  var head = '<div class="hud"><span>Kart <b>' + Math.min(S.i + 1, n) + '</b> / ' + n + '</span><span>Doğru <b>' + S.right + '</b></span><span>Yanlış <b>' + S.wrong + '</b></span></div><div class="time-bar"><div style="width:' + pc + '%"></div></div>';
  if (!it) {
    var t = S.right + S.wrong, oran = t ? Math.round(S.right / t * 100) : 0, ms = S.mode; S = null;
    return '<section class="panel"><div class="card stack center"><div class="lbl">Oturum bitti</div><div class="score-big tabular">%' + oran + '</div><p>' + t + ' sorudan ' + (t - (t - Math.round(oran * t / 100))) + ' doğru. +10 bitiş puanı.</p>' + todaySummary() +
      '<div class="row-btns center">' + (ms === "daily" && dueKeys().length ? '<button class="btn solid" data-sess="daily">Devam et</button>' : '') + '<button class="btn" data-go="zayif">Zayıf kelimeler</button><button class="btn" data-go="oyun">Oyunlar</button></div></div></section>';
  }
  if (it.intro) return '<section class="panel"><div class="card stack">' + head + '<div class="lbl">Yeni kelime · tanış</div><p class="muted">Kelimeyi, çoğulunu, eş ve zıt anlamlısını oku; 🔊 ile dinle. Sonra sorular gelecek.</p>' + aile(it.intro, { dots: false }) + '<div class="row-btns"><button class="btn solid" data-next="1">Anladım, sor <span class="kbd">Enter</span></button></div></div></section>';
  var q = it.q, w = q.w;
  return '<section class="panel"><div class="card stack">' + head +
    '<div class="qcard r-' + TYPES[q.t].col + '"><span class="qtype">' + TYPES[q.t].tr + '</span><div class="target">' + (q.plat ? '<span class="lat-c">' + esc(q.prompt) + '</span>' : '<span class="ar">' + q.prompt + '</span>') + '</div><p class="qask"><b>' + TYPES[q.t].ask + '</b>' + (q.t !== "a" && q.t !== "r" ? ' <span class="muted">(' + esc(w.tr) + ')</span>' : '') + '</p></div>' +
    optBtns(q, "data-ans", S.ans) +
    (S.ans !== null ? '<p class="fb">' + (S.ans === q.ok ? '<span class="ok">Doğru!</span> Kart bir üst kutuya çıktı.' : '<span class="no">Yanlış.</span> Doğrusu: ' + (q.lat ? '<b>' + esc(q.ok) + '</b>' : ar(q.ok)) + '. Kart birinci kutuya döndü; birazdan yeniden sorulacak.') + '</p>' + aile(w) + '<div class="row-btns"><button class="btn solid" data-next="1">Sonraki <span class="kbd">Enter</span></button></div>' : '<p class="muted small">Klavye: 1–4 ile seç.</p>') +
    '</div></section>';
}
function todaySummary() {
  var due = dueKeys().length, nw = newWords().length;
  return '<div class="sumrow"><div><b class="tabular">' + due + '</b><span>tekrar kartı</span></div><div><b class="tabular">' + nw + '</b><span>yeni kelime</span></div><div><b class="tabular">' + scopeWords().filter(learned).length + '</b><span>öğrenilen kelime</span></div></div>';
}

// ---------- zayıf kelimeler ----------
function weakList() {
  var by = {};
  Object.keys(ST.hist).forEach(function (k) { var h = ST.hist[k], wid = k.split(":")[0], w = WBY[wid]; if (!w || !inScope(w) || !h.ng) return; var x = by[wid] || (by[wid] = { w: w, ng: 0, ok: 0, keys: [], types: {} }); x.ng += h.ng; x.ok += h.ok; x.keys.push(k); x.types[k.split(":")[1]] = 1; });
  return Object.keys(by).map(function (k) { return by[k]; }).filter(function (x) { return x.ng * 2 > x.ok; }).sort(function (a, b) { return (b.ng - b.ok / 2) - (a.ng - a.ok / 2); });
}
function renderZayif() {
  var L = weakList();
  return '<section class="panel"><div class="card stack"><div class="lbl">Zayıf kelimeler</div><h2>En çok zorlandığın kelimeler</h2><p class="muted">Tekrarda ve oyunlarda yanlış yaptığın kelimeler burada toplanır. Doğru cevapladıkça listeden düşerler.</p>' +
    (L.length ? '<div class="row-btns"><button class="btn solid" data-sess="weak">Zayıf kelimeleri çalış</button></div><div class="weak-list">' + L.slice(0, 40).map(function (x) {
      return '<button class="weak" data-fam="' + x.w.id + '"><span class="ar">' + x.w.w + '</span><span>' + esc(x.w.tr) + '</span><span class="muted small">' + Object.keys(x.types).map(function (t) { return TYPES[t].tr; }).join(", ") + '</span><span class="cnt"><b class="r-bad">' + x.ng + '</b> yanlış · <b class="r-good">' + x.ok + '</b> doğru</span></button>';
    }).join("") + '</div>' : '<p class="empty">Henüz zayıf kelimen yok. Tekrar yaptıkça ve oyun oynadıkça burası dolar.</p>') + '</div></section>';
}

// ---------- ana sayfa ----------
function boxCounts() {
  var c = [0, 0, 0, 0, 0, 0];
  scopeWords().forEach(function (w) { typesOf(w).forEach(function (t) { var r = rec(key(w, t)); c[r ? r.b : 0]++; }); });
  return c;
}
function renderBas() {
  var sw = scopeWords(), c = boxCounts(), tot = c.reduce(function (a, b) { return a + b; }, 0), lw = sw.filter(learned).length, sn = sw.filter(seenWord).length;
  var boxes = '<div class="leitner">' + [0, 1, 2, 3, 4, 5].map(function (b) {
    var lb = b === 0 ? "Yeni" : b + ". kutu", sub = b === 0 ? "henüz görülmedi" : b === 1 ? "her gün" : b === 5 ? "2 haftada bir" : ["", "", "1 gün sonra", "3 gün sonra", "1 hafta sonra"][b];
    return '<div class="lbox b' + b + '"><div class="lbar"><i style="height:' + (tot ? Math.max(4, Math.round(c[b] / tot * 100)) : 4) + '%"></i></div><b class="tabular">' + c[b] + '</b><span>' + lb + '</span><small class="muted">' + sub + '</small></div>';
  }).join("") + '</div>';
  var cats = [["all", "Hepsi"], ["a", "1–5. dersler"], ["b", "6–10. dersler"]];
  function lessonBtns(cat) {
    return DERSLER.filter(function (d) { return d.cat === cat; }).map(function (d) {
      var on = !ST.scope.off[d.id] && (ST.scope.cat === "all" || ST.scope.cat === cat);
      return '<button class="lchip' + (on ? " on" : "") + '" data-ltog="' + d.id + '" aria-pressed="' + on + '">' + (d.no + 1) + '. ' + esc(d.tr) + '</button>';
    }).join("");
  }
  return '<section class="panel">' +
    '<div class="card stack hero"><div class="hero-l"><div class="lbl">Bugün</div><h2>Günlük tekrar</h2>' + todaySummary() +
      '<div class="row-btns"><button class="btn solid big" data-sess="daily">Tekrara başla</button><button class="btn" data-go="oyun">Oyunlar</button></div>' +
      '<div class="prog-line"><span>Çalışma alanında <b>' + sw.length + '</b> kelime: <b>' + sn + '</b> tanındı, <b>' + lw + '</b> öğrenildi.</span><div class="xpbar"><div style="width:' + (sw.length ? Math.round(lw / sw.length * 100) : 0) + '%"></div></div></div></div></div>' +
    '<div class="card stack"><div class="lbl">Aralıklı tekrar</div><h2>Kartların kutuları</h2><p class="muted">Her kelimenin anlamı, Arapçası (Türkçeden), çoğulu, tekili, eş ve zıt anlamlısı ayrı birer karttır. Arapçası kartı, anlam kartı 2. kutuya çıkınca sorulmaya başlar. Doğru bildiğin kart bir üst kutuya çıkar ve daha seyrek sorulur; yanlış bildiğin kart birinci kutuya döner. 4. kutuya ulaşan kart “öğrenildi” sayılır.</p>' + boxes + '</div>' +
    '<div class="card stack"><div class="lbl">Çalışma alanı</div><h2>Hangi derslerin kelimeleri?</h2><div class="seg" role="group" aria-label="Kategori">' + cats.map(function (x) { return '<button data-cat="' + x[0] + '" aria-pressed="' + (ST.scope.cat === x[0]) + '">' + x[1] + '</button>'; }).join("") + '</div>' +
      '<details><summary>Dersleri tek tek seç (' + DERSLER.filter(function (d) { return !ST.scope.off[d.id]; }).length + ' / ' + DERSLER.length + ' açık)</summary><div class="lgroups"><div><div class="lbl">1–5. dersler</div><div class="lchips">' + lessonBtns("a") + '</div></div><div><div class="lbl">6–10. dersler</div><div class="lchips">' + lessonBtns("b") + '</div></div></div><div class="row-btns"><button class="btn small" data-lall="1">Hepsini aç</button><button class="btn small" data-lnone="1">Hepsini kapat</button></div></details></div>' +
    '<div class="card stack"><div class="lbl">Ayarlar</div><div class="setrow"><span>Günde kaç yeni kelime?</span><div class="seg">' + [3, 5, 8, 12].map(function (n) { return '<button data-perday="' + n + '" aria-pressed="' + (ST.perDay === n) + '">' + n + '</button>'; }).join("") + '</div></div>' +
      '<div class="setrow"><span>Ses efektleri</span><button class="btn small" data-snd="1">' + (SND.on ? "Açık" : "Kapalı") + '</button></div>' +
      '<div class="setrow"><span>İlerlemeyi sıfırla</span><button class="btn small danger" data-reset="1">Sıfırla</button></div><p class="muted small">İlerlemen bu tarayıcıda saklanır; başka cihazda sıfırdan başlar.</p></div>' +
    '</section>';
}

// ---------- kelimeler ----------
var FIND = { q: "", t: "all" };
function renderKelime() {
  var q = bare(FIND.q.trim().toLowerCase());
  function match(w) { if (FIND.t !== "all" && w.t !== FIND.t) return false; if (!q) return true; return [w.w, w.c, w.e, w.z].some(function (x) { return x && bare(x).indexOf(q) >= 0; }) || w.tr.toLowerCase().indexOf(q) >= 0; }
  var groups = ["a", "b"].map(function (cat) {
    var ls = DERSLER.filter(function (d) { return d.cat === cat; }).map(function (d) {
      var ws = W.filter(function (w) { return w.dl.indexOf(d.id) >= 0 && match(w); });
      if (!ws.length) return "";
      var lw = ws.filter(learned).length;
      return '<details class="lesson"' + (q ? " open" : "") + '><summary><span class="lname">' + (d.no + 1) + '. ' + esc(d.tr) + '</span><span class="ar lar">' + d.ar + '</span><span class="muted small">' + lw + '/' + ws.length + '</span></summary><div class="chips">' +
        ws.map(function (w) { var lv = wordLevel(w); return '<button class="wchip" data-fam="' + w.id + '"><span class="ar">' + w.w + '</span><span class="small">' + esc(w.tr) + '</span><i class="lvdot" style="--lv:' + (lv / 5) + '"></i></button>'; }).join("") +
        '</div><div class="row-btns"><button class="btn small" data-sess="ders" data-arg="' + d.id + '">Bu dersin kelimelerini çalış</button></div></details>';
    }).join("");
    return ls ? '<div class="stack"><h3>' + CAT[cat] + '</h3>' + ls + '</div>' : "";
  }).join("");
  return '<section class="panel"><div class="card stack"><div class="lbl">Bütün kelimeler</div><h2>Derslere göre kelime hazinesi</h2><p class="muted">Bir kelimeye ya da terkibe dokun: çoğulu, eş ve zıt anlamlısı, dersteki cümlesi ve kutuların açılır. Kelimeler kitabın sonundaki listeye (مَسْرَدُ أَهَمِّ المُفْرَدَاتِ) göre derslere ayrılmıştır; birden çok derste geçen kelime her dersinde görünür. Arama Arapça (harekesiz de olur) ya da Türkçe yapılabilir.</p>' +
    '<input class="search" id="find" type="search" placeholder="Ara: سوق ya da pazar" value="' + esc(FIND.q) + '" aria-label="Kelime ara">' +
    '<div class="seg" role="group" aria-label="Tür">' + TURL.map(function (x) { return '<button data-ftur="' + x[0] + '" aria-pressed="' + (FIND.t === x[0]) + '">' + x[1] + '</button>'; }).join("") + '</div>' +
    (groups || '<p class="empty">Aramana uyan kelime yok.</p>') + '</div></section>';
}

// ---------- eş ve zıt anlamlılar ----------
function renderEsZit() {
  var sw = scopeWords();
  function blok(f, sym, col, title) {
    var seen = {}, rows = [];
    DERSLER.forEach(function (d) {
      var ws = sw.filter(function (w) { return w[f] && w.dl[0] === d.id; }).filter(function (w) { var a = [bare(w.w), bare(w[f])].sort().join("|"); if (seen[a]) return false; seen[a] = 1; return true; });
      if (ws.length) rows.push('<div class="ezrow"><div class="lbl">' + (d.no + 1) + '. ' + esc(d.tr) + '</div><div class="chips">' + ws.map(function (w) { return '<button class="wchip pl" data-fam="' + w.id + '"><span class="ar">' + w.w + '</span><span class="arr r-' + col + '">' + sym + '</span><span class="ar r-' + col + '">' + w[f] + '</span></button>'; }).join("") + '</div></div>');
    });
    var n = Object.keys(seen).length;
    return '<div class="card stack"><div class="lbl">' + title + ' · ' + n + ' çift</div>' + (rows.join("") || '<p class="empty">Çalışma alanında çift yok.</p>') +
      '<div class="row-btns"><button class="btn small solid" data-gstart="mik" data-mode="' + f + '">Mıknatıs: ' + title + '</button><button class="btn small" data-gstart="haf" data-mode="' + f + '">Hafıza: ' + title + '</button></div></div>';
  }
  return '<section class="panel"><div class="card stack"><div class="lbl">Eş ve zıt anlamlılar</div><h2>Kitaptaki = ve × işaretli kelimeler</h2><p class="muted">Kitabın kelime listesinde “=” eş anlamlıyı, “×” zıt anlamlıyı gösterir. Bir çifte dokun: kelimenin bütün ailesi açılır. Çiftler kelimenin ilk geçtiği derse göre sıralandı.</p></div>' +
    blok("e", "=", "mz", "Eş anlamlılar") + blok("z", "≠", "ref", "Zıt anlamlılar") + '</section>';
}

// ---------- kalıplar ----------
function renderKalip() {
  var by = {};
  scopeWords().forEach(function (w) { if (w.c && w.k) (by[w.k] = by[w.k] || []).push(w); });
  var keys = Object.keys(KALIPLAR).filter(function (k) { return by[k]; });
  return '<section class="panel"><div class="card stack"><div class="lbl">Çoğul kalıpları</div><h2>Çoğulları kalıplarla öğren</h2><p class="muted">Kırık çoğullar (cem-i teksîr) rastgele değildir; birkaç kalıba toplanır. Aynı kalıptaki kelimeleri birlikte görmek, yeni bir kelimenin çoğulunu tahmin etmeyi kolaylaştırır. Kalıp Fabrikası oyunu bu sayfayı çalıştırır.</p></div>' +
    '<div class="kalip-grid">' + keys.map(function (k) {
      var p = KALIPLAR[k];
      return '<div class="card kalip"><div class="kh"><span class="ar kp">' + p[0] + '</span><div><b>' + p[1] + '</b><small class="muted">' + p[2] + '</small></div><span class="cnt tabular">' + by[k].length + '</span></div><div class="chips">' +
        by[k].map(function (w) { return '<button class="wchip pl" data-fam="' + w.id + '"><span class="ar">' + w.w + '</span><span class="arr">←</span><span class="ar r-nasb">' + w.c + '</span></button>'; }).join("") + '</div></div>';
    }).join("") + '</div></section>';
}

// ---------- oyunlar ----------
var GAMES = {
  fab: { name: "Kalıp Fabrikası", ico: "كِتَابٌ ← فُعُلٌ", col: "nasb", d: "10 tur. Tekil kelime banttan gelir: hangi çoğul kalıbının makinesine girmeli? Makine çoğulu üretir." },
  mik: { name: "Mıknatıs", ico: "الحَقُّ ≠ البَاطِلُ", col: "ref", d: "6 çift açık kart. Eşleri birbirine yapıştır: eş anlam, zıt anlam ya da tekil–çoğul." },
  haf: { name: "Hafıza", ico: "؟ ↔ ؟", col: "mi", d: "Kartlar kapalı. İkişer çevir, eşleri bul. En az hamleyle bitir." },
  dus: { name: "Düşen Kelimeler", ico: "⇣ قَلِيلٌ", col: "cerr", d: "Kelime yukarıdan düşer; yere değmeden doğru sepete dokun. Üç canın var, hız giderek artar." },
  cum: { name: "Cümlede Değiştir", ico: "قَبِيحٌ ← جَمِيلٌ", col: "mz", d: "10 cümle. Dersteki cümlede koyu kelimenin yerine eş ya da zıt anlamlısını koy." },
  hiz: { name: "Hız Turu", ico: "صَحِيحٌ · خَطَأٌ", col: "muz", d: "60 saniye. İlişki doğru mu yanlış mı? Seri yaptıkça puan katlanır. Klavye: 1 / 2." },
  ter: { name: "Terkip Tamamla", ico: "غُرْفَةُ … ؟", col: "nasb", d: "10 terkip. Kitaptaki terkiplerin eksik kelimesini bul: وَجْبَةُ ___ ← الفَطُورِ." },
  tur: { name: "Türkçeden Arapçaya", ico: "pazar → ؟", col: "cerr", d: "10 soru. Türkçe anlamı verilen kelimenin ya da terkibin Arapçasını seç." }
};
var MODES = { e: ["Eş anlam", "="], z: ["Zıt anlam", "≠"], c: ["Tekil–çoğul", "←"] };
var G = null, GT = null;
function stopGame() { if (GT) { clearInterval(GT); GT = null; } }
function gameXp(n, k, ok) { if (k) hist(k, ok); if (ok) addXp(n); touchStreak(); save(); }
function renderOyun() {
  if (!G) return '<section class="panel"><div class="card stack"><div class="lbl">Oyunlar</div><h2>Oynayarak ezberle</h2><p class="muted">Oyunlar çalışma alanındaki kelimeleri kullanır. Yanlış yaptığın kelimeler “Zayıf kelimeler” listesine eklenir.</p><div class="row-btns"><button class="btn small" data-snd="1">Ses: ' + (SND.on ? "açık" : "kapalı") + '</button></div></div><div class="game-menu">' +
    Object.keys(GAMES).map(function (k) { var g = GAMES[k]; return '<div class="card game-card" style="--role:var(--' + g.col + ')"><div class="ico">' + g.ico + '</div><h3>' + g.name + '</h3><p class="muted">' + g.d + '</p><div class="row-btns">' + ((k === "mik" || k === "haf") ? Object.keys(MODES).map(function (m) { return '<button class="btn small" data-gstart="' + k + '" data-mode="' + m + '">' + MODES[m][0] + '</button>'; }).join("") : '<button class="btn small solid" data-gstart="' + k + '">Başla</button>') + '</div></div>'; }).join("") + '</div></section>';
  var g = GAMES[G.id];
  var top = '<div style="width:100%;text-align:left;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="lbl">Oyun</div><h2>' + g.name + (G.mode ? ' <span class="muted small">· ' + MODES[G.mode][0] + '</span>' : '') + '</h2></div><button class="btn small" data-gmenu="1">Oyunlara dön</button></div>';
  if (G.done) return '<section class="panel"><div class="card stack center">' + top + '<div class="score-big tabular">' + G.score + '</div><p>' + G.endMsg + '</p><div class="row-btns center"><button class="btn solid" data-gstart="' + G.id + '"' + (G.mode ? ' data-mode="' + G.mode + '"' : '') + '>Yeniden oyna</button><button class="btn" data-gmenu="1">Başka oyun</button></div></div></section>';
  return '<section class="panel"><div class="card stack">' + top + GR[G.id]() + '</div></section>';
}
function endGame(msg) { stopGame(); G.done = true; G.endMsg = msg; beep("end"); addXp(10); save(); render(); }

// Kalıp Fabrikası
function fabPool() { return scopeWords().filter(function (w) { return w.c && w.k && KALIPLAR[w.k] && w.k !== "diger"; }); }
function fabRound() {
  var pool = fabPool(); if (!pool.length) pool = W.filter(function (w) { return w.c && KALIPLAR[w.k] && w.k !== "diger"; });
  var w = pick(pool), ks = shuffle(Object.keys(KALIPLAR).filter(function (k) { return k !== w.k && k !== "diger"; })).slice(0, 3);
  G.cur = { w: w, opts: shuffle([w.k].concat(ks)) }; G.ans = null;
}
var GR = {
  fab: function () {
    var c = G.cur, w = c.w;
    return '<div class="hud"><span>Tur <b>' + (G.r + 1) + '</b> / 10</span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="belt"><div class="belt-in"><span class="ar">' + w.w + '</span><small>' + esc(w.tr) + '</small></div><span class="belt-arr">⟵</span><div class="machine' + (G.ans ? " on" : "") + '">' + (G.ans ? '<span class="ar">' + KALIPLAR[w.k][0] + '</span>' : '⚙') + '</div><span class="belt-arr">⟵</span><div class="belt-out' + (G.ans ? " on" : "") + '">' + (G.ans ? '<span class="ar r-nasb">' + w.c + '</span>' : '<span class="muted">?</span>') + '</div></div>' +
      '<p class="qask"><b>Bu kelime hangi çoğul kalıbına girer?</b></p>' +
      '<div class="kopts">' + c.opts.map(function (k, i) {
        var cl = "kopt"; if (G.ans) { if (k === w.k) cl += " sel-ok"; else if (k === G.ans) cl += " sel-no"; }
        return '<button class="' + cl + '" data-fab="' + i + '"' + (G.ans ? " disabled" : "") + '><span class="ar">' + KALIPLAR[k][0] + '</span><small>' + KALIPLAR[k][1] + '</small></button>';
      }).join("") + '</div>' +
      (G.ans ? '<p class="fb">' + (G.ans === w.k ? '<span class="ok">Doğru!</span> ' : '<span class="no">Yanlış.</span> ') + ar(w.w + ' ← ' + w.c) + ' · ' + KALIPLAR[w.k][1] + ' kalıbı.</p><div class="row-btns"><button class="btn solid" data-gnext="1">' + (G.r >= 9 ? "Bitir" : "Sonraki") + '</button></div>' : '');
  },
  mik: function () { return pairBoard(false); },
  haf: function () { return pairBoard(true); },
  dus: function () {
    var c = G.cur;
    return '<div class="hud"><span>Can <b>' + "♥♥♥".slice(0, G.lives) + '<span class="muted">' + "♥♥♥".slice(G.lives) + '</span></b></span><span>Puan <b>' + G.score + '</b></span><span>Kelime <b>' + (G.r + 1) + '</b> / 20</span></div>' +
      '<div class="sky" id="sky"><div class="faller r-' + TYPES[c.t].col + '" id="faller" style="top:' + G.pos + '%"><span class="ar">' + c.prompt + '</span><small>' + TYPES[c.t].ask.replace(" hangisi?", "?").replace(" nedir?", "?") + '</small></div>' + (G.msg ? '<div class="skymsg">' + G.msg + '</div>' : '') + '</div>' +
      '<div class="baskets">' + c.opts.map(function (o, i) { var cl = "basket"; if (G.ans !== null) { if (o === c.ok) cl += " sel-ok"; else if (o === G.ans) cl += " sel-no"; } return '<button class="' + cl + '" data-dus="' + i + '"' + (G.ans !== null ? " disabled" : "") + '>' + (c.lat ? esc(o) : '<span class="ar">' + o + '</span>') + '</button>'; }).join("") + '</div>';
  },
  cum: function () {
    var c = G.cur, w = c.w;
    return '<div class="hud"><span>Cümle <b>' + (G.r + 1) + '</b> / 10</span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="sentcard"><div class="ar">' + hlSent(w) + '</div><small class="muted">' + esc(w.st) + '</small></div>' +
      '<p class="qask">Koyu kelimenin sözlük biçimi ' + ar(w.w) + ' <span class="muted">(' + esc(w.tr) + ')</span>. Yerine <b class="r-' + TYPES[c.t].col + '">' + (c.t === "e" ? "eş anlamlısını (anlam aynı kalsın)" : "zıt anlamlısını (anlam tersine dönsün)") + '</b> koy:</p>' +
      optBtns(c, "data-cum", G.ans) +
      (G.ans !== null ? '<p class="fb">' + (G.ans === c.ok ? '<span class="ok">Doğru!</span> ' : '<span class="no">Yanlış.</span> ') + ar(w.w + ' ' + (c.t === "e" ? "=" : "≠") + ' ' + c.ok) + '</p><div class="row-btns"><button class="btn solid" data-gnext="1">' + (G.r >= 9 ? "Bitir" : "Sonraki") + '</button></div>' : '');
  },
  ter: function () {
    var c = G.cur;
    return '<div class="hud"><span>Terkip <b>' + (G.r + 1) + '</b> / 10</span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="sentcard"><div class="ar" style="font-size:1.7rem">' + c.parts.map(function (p, i) { return i === c.gap ? (G.ans !== null ? '<b class="hl">' + c.ok + '</b>' : '<u>&nbsp;؟&nbsp;</u>') : p; }).join(" ") + '</div><small class="muted">' + esc(c.w.tr) + '</small></div>' +
      '<p class="qask"><b>Eksik kelime hangisi?</b></p>' + optBtns(c, "data-ter", G.ans) +
      (G.ans !== null ? '<p class="fb">' + (G.ans === c.ok ? '<span class="ok">Doğru!</span> ' : '<span class="no">Yanlış.</span> ') + ar(c.w.w) + ' · ' + esc(c.w.tr) + '</p><div class="row-btns"><button class="btn solid" data-gnext="1">' + (G.r >= 9 ? "Bitir" : "Sonraki") + '</button></div>' : '');
  },
  tur: function () {
    var c = G.cur;
    return '<div class="hud"><span>Soru <b>' + (G.r + 1) + '</b> / 10</span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="target"><span class="lat-c">' + esc(c.prompt) + '</span> <span class="muted small">(' + TUR[c.w.t] + ')</span></div><p class="qask"><b>Arapçası hangisi?</b></p>' + optBtns(c, "data-tur", G.ans) +
      (G.ans !== null ? '<p class="fb">' + (G.ans === c.ok ? '<span class="ok">Doğru!</span> ' : '<span class="no">Yanlış.</span> Doğrusu: ') + ar(c.ok) + '</p><div class="row-btns"><button class="btn solid" data-gnext="1">' + (G.r >= 9 ? "Bitir" : "Sonraki") + '</button></div>' : '');
  },
  hiz: function () {
    var c = G.cur;
    return '<div class="hud"><span>Süre <b id="hz-t">' + G.t + '</b></span><span>Puan <b>' + G.score + '</b></span><span>Seri <b>x' + Math.min(5, 1 + Math.floor(G.streak / 3)) + '</b></span></div><div class="time-bar' + (G.t <= 10 ? " low" : "") + '"><div style="width:' + (G.t / 60 * 100) + '%"></div></div>' +
      '<div class="target' + (G.flash ? " flash-" + G.flash : "") + '"><span class="ar">' + c.w.w + '</span> <span class="rel r-' + TYPES[c.t].col + '">' + { a: "anlamı:", c: "çoğulu:", e: "eş anlamlısı:", z: "zıt anlamlısı:" }[c.t] + '</span> ' + (c.t === "a" ? '<span class="lat-c">' + esc(c.cand) + '</span>' : '<span class="ar">' + c.cand + '</span>') + '</div>' +
      '<div class="big2"><button style="--role:var(--good)" data-hiz="1">Doğru<small>1</small></button><button style="--role:var(--bad)" data-hiz="0">Yanlış<small>2</small></button></div>' +
      '<div class="gfb">' + (G.last || '&nbsp;') + '</div>';
  }
};
function pairBoard(hidden) {
  return '<div class="hud"><span>Eşleşen <b>' + G.matched + '</b> / ' + G.pairs.length + '</span><span>' + (hidden ? 'Hamle' : 'Hata') + ' <b>' + (hidden ? G.moves : G.miss) + '</b></span><span>Süre <b id="pb-t">' + G.sec + '</b> sn</span></div>' +
    '<div class="pboard' + (hidden ? " hidden" : "") + '">' + G.tiles.map(function (t, i) {
      var open = !hidden || t.done || G.sel.indexOf(i) >= 0, cl = "ptile" + (t.done ? " done" : "") + (G.sel.indexOf(i) >= 0 ? " sel" : "") + (G.bad && G.bad.indexOf(i) >= 0 ? " bad" : "") + (t.side ? " s1" : "");
      return '<button class="' + cl + '" data-pt="' + i + '"' + (t.done ? " disabled" : "") + '>' + (open ? '<span class="ar">' + t.text + '</span>' : '<span class="back">؟</span>') + '</button>';
    }).join("") + '</div>' +
    (G.log.length ? '<div class="plog">' + G.log.map(function (p) { return '<span class="badge r-' + (G.mode === "z" ? "ref" : G.mode === "e" ? "mz" : "nasb") + '"><span class="ar">' + p[0] + ' ' + MODES[G.mode][1] + ' ' + p[1] + '</span>' + esc(p[2]) + '</span>'; }).join("") + '</div>' : '');
}
function startGame(id, mode) {
  stopGame(); closeFam();
  G = { id: id, mode: mode || null, r: 0, score: 0, done: false };
  if (id === "fab") fabRound();
  if (id === "mik" || id === "haf") {
    var f = mode, used = {}, pairs = [];
    shuffle(scopeWords().length >= 6 ? scopeWords() : W).forEach(function (w) {
      if (pairs.length >= 6 || !w[f]) return;
      var a = w.w, b = w[f]; if (used[a] || used[b]) return; used[a] = used[b] = 1; pairs.push(w);
    });
    if (pairs.length < 6) W.forEach(function (w) { if (pairs.length >= 6 || !w[f] || used[w.w] || used[w[f]]) return; used[w.w] = used[w[f]] = 1; pairs.push(w); });
    G.pairs = pairs; G.tiles = shuffle(pairs.reduce(function (a, w, i) { return a.concat([{ p: i, side: 0, text: w.w }, { p: i, side: 1, text: w[f] }]); }, []));
    G.sel = []; G.matched = 0; G.miss = 0; G.moves = 0; G.sec = 0; G.log = [];
    GT = setInterval(function () { G.sec++; var el = document.getElementById("pb-t"); if (el) el.textContent = G.sec; }, 1000);
  }
  if (id === "dus") { G.lives = 3; dusRound(); }
  if (id === "cum") cumRound();
  if (id === "ter") terRound();
  if (id === "tur") turRound();
  if (id === "hiz") {
    G.t = 60; G.streak = 0; G.n = 0; hizRound();
    GT = setInterval(function () { G.t--; if (G.t <= 0) return endGame(G.n + " ifade değerlendirdin."); var el = document.getElementById("hz-t"); if (el) el.textContent = G.t; var b = document.querySelector(".time-bar"); if (b) { b.firstChild.style.width = (G.t / 60 * 100) + "%"; b.classList.toggle("low", G.t <= 10); } }, 1000);
  }
  go("oyun");
}
function pairTap(i) {
  var t = G.tiles[i]; if (t.done || G.sel.indexOf(i) >= 0 || G.lock) return;
  G.sel.push(i); G.bad = null;
  if (G.sel.length === 2) {
    var a = G.tiles[G.sel[0]], b = G.tiles[G.sel[1]], w = G.pairs[a.p], k = key(w, G.mode === "c" ? "c" : G.mode);
    G.moves++;
    if (a.p === b.p && a.side !== b.side) {
      a.done = b.done = true; G.matched++; G.score += 10; G.sel = []; G.log.push([w.w, w[G.mode], w.tr]); beep("ok"); gameXp(3, k, true);
      if (G.matched === G.pairs.length) { G.score += Math.max(0, 60 - G.sec) + (G.id === "mik" ? Math.max(0, 30 - G.miss * 5) : Math.max(0, 40 - (G.moves - 6) * 3)); return endGame("Bütün çiftleri " + G.sec + " saniyede " + (G.id === "haf" ? G.moves + " hamlede " : "") + "buldun" + (G.id === "mik" ? ", " + G.miss + " hata" : "") + "."); }
    } else {
      G.miss++; beep("no"); G.bad = G.sel.slice(); gameXp(0, k, false);
      if (G.id === "haf") { G.lock = true; render(); setTimeout(function () { if (!G) return; G.sel = []; G.bad = null; G.lock = false; render(); }, 900); return; }
      G.sel = [];
    }
  }
  render();
}
function dusRound() {
  var pool = scopeWords(), w = pick(pool), ts = typesOf(w).filter(function (t) { return t !== "t" && t !== "r"; }), t = pick(ts.length > 1 ? ts.filter(function (x) { return x !== "a"; }) : ts);
  var q = makeQ(key(w, t)); q.opts = shuffle([q.ok].concat(q.opts.filter(function (o) { return o !== q.ok; }).slice(0, 2)));
  G.cur = q; G.pos = 0; G.ans = null; G.msg = "";
  var dur = Math.max(3.2, 8 - G.r * 0.25) * 1000, t0 = Date.now();
  stopGame();
  GT = setInterval(function () {
    G.pos = Math.min(100, (Date.now() - t0) / dur * 100);
    var el = document.getElementById("faller"); if (el) el.style.top = (G.pos * 0.78) + "%";
    if (G.pos >= 100) { stopGame(); dusAnswer(-1); }
  }, 50);
}
function dusAnswer(i) {
  if (G.ans !== null) return; stopGame();
  var c = G.cur, o = i < 0 ? "" : c.opts[i], ok = o === c.ok;
  G.ans = o;
  if (ok) { var bonus = Math.round((100 - G.pos) / 10); G.score += 10 + bonus; G.msg = '<span class="ok">Doğru! +' + (10 + bonus) + '</span>'; beep("ok"); }
  else { G.lives--; G.msg = '<span class="no">' + (i < 0 ? "Yere düştü!" : "Yanlış sepet!") + '</span> Doğrusu: ' + (c.lat ? esc(c.ok) : ar(c.ok)); beep("no"); }
  gameXp(ok ? 4 : 0, c.k, ok);
  render();
  setTimeout(function () {
    if (!G || G.id !== "dus" || G.done) return;
    G.r++;
    if (G.lives <= 0 || G.r >= 20) return endGame(G.r + " kelime düştü, " + (3 - G.lives) + " can kaybettin.");
    dusRound(); render();
  }, ok ? 800 : 1600);
}
function cumRound() {
  var pool = scopeWords().filter(function (w) { return w.s && w.sw && w.s.indexOf(w.sw) >= 0 && (w.e || w.z); });
  if (pool.length < 4) pool = W.filter(function (w) { return w.s && w.sw && w.s.indexOf(w.sw) >= 0 && (w.e || w.z); });
  var w = pick(pool), t = w.e && w.z ? pick(["e", "z"]) : w.e ? "e" : "z", q = makeQ(key(w, t));
  q.opts = shuffle([q.ok].concat(q.opts.filter(function (o) { return o !== q.ok; }).slice(0, 2)));
  G.cur = q; G.ans = null;
}
function terPool() { var f = function (w) { return w.t === "h" && w.w.split(" ").length >= 2; }; var p = scopeWords().filter(f); return p.length >= 4 ? p : W.filter(f); }
function terRound() {
  var pool = terPool(), w = pick(pool), parts = w.w.split(" "), idx = [];
  parts.forEach(function (p, i) { if (bare(p).length > 2) idx.push(i); });
  var gap = idx.length ? pick(idx) : parts.length - 1, ok = parts[gap], seen = {}, ds = [], al = /^ال/.test(bare(ok));
  seen[bare(ok)] = 1;
  shuffle(W.filter(function (x) { return x.t === "h" && x.id !== w.id; })).forEach(function (x) { x.w.split(" ").forEach(function (p) { var b = bare(p); if (b.length > 2 && !seen[b] && ds.length < 3 && /^ال/.test(b) === al) { seen[b] = 1; ds.push(p); } }); });
  shuffle(W).forEach(function (x) { if (ds.length < 3 && !seen[bare(x.w)] && x.w.indexOf(" ") < 0) { seen[bare(x.w)] = 1; ds.push(x.w); } });
  G.cur = { w: w, parts: parts, gap: gap, ok: ok, opts: shuffle([ok].concat(ds)), k: key(w, "a"), lat: false }; G.ans = null;
}
function turRound() { var w = pick(scopeWords()), q = makeQ(key(w, "r")); G.cur = q; G.ans = null; }
function hizRound() {
  var pool = scopeWords(), w = pick(pool), ts = typesOf(w).filter(function (t) { return t !== "t" && t !== "r"; }), t = pick(ts), f = { a: "tr", c: "c", e: "e", z: "z" }[t];
  var truth = Math.random() < 0.5, cand = w[f];
  if (!truth) { var alt = (t === "e" && w.z) ? [w.z] : (t === "z" && w.e) ? [w.e] : []; alt = alt.concat(others(w, f)); cand = alt[0]; if (!cand) { truth = true; cand = w[f]; } }
  G.cur = { w: w, t: t, cand: cand, truth: truth, k: key(w, t) };
}
function hizAnswer(v) {
  var c = G.cur, ok = (v === 1) === c.truth;
  G.n++;
  if (ok) { G.streak++; var m = Math.min(5, 1 + Math.floor(G.streak / 3)); G.score += 10 * m; G.flash = "ok"; beep("ok"); G.last = '<span class="ok">Doğru +' + (10 * m) + '</span>'; }
  else { G.streak = 0; G.flash = "no"; beep("no"); G.last = '<span class="no">Yanlış.</span> ' + ar(c.w.w) + ' → ' + (c.t === "a" ? esc(c.w.tr) : ar(c.w[{ c: "c", e: "e", z: "z" }[c.t]])); }
  gameXp(ok ? 2 : 0, c.k, ok);
  hizRound(); render();
}

// ---------- sekmeler ----------
var TABS = [["bas", "Ana Sayfa"], ["tekrar", "Günlük Tekrar"], ["kelime", "Kelimeler ve Terkipler"], ["eszit", "Eş ve Zıt"], ["kalip", "Çoğul Kalıpları"], ["oyun", "Oyunlar"], ["zayif", "Zayıf Kelimeler"]];
var TAB = "bas";
function renderTabs() {
  document.getElementById("tabs").innerHTML = TABS.map(function (t) { return '<button role="tab" data-tab="' + t[0] + '" aria-selected="' + (TAB === t[0]) + '">' + t[1] + (t[0] === "tekrar" ? ' <span class="pc" id="duepc"></span>' : '') + '</button>'; }).join("");
  var n = dueKeys().length + newWords().length, el = document.getElementById("duepc"); if (el) el.textContent = n ? n : "";
}
function render() {
  var y = window.scrollY;
  main.innerHTML = { bas: renderBas, tekrar: renderTekrar, kelime: renderKelime, eszit: renderEsZit, kalip: renderKalip, oyun: renderOyun, zayif: renderZayif }[TAB]();
  renderTabs(); renderXp();
  window.scrollTo(0, y);
}
function go(t) { if (t !== "oyun" && G) { stopGame(); G = null; } TAB = t; closeFam(); render(); window.scrollTo(0, 0); }

// ---------- olaylar ----------
document.addEventListener("click", function (e) {
  var b = e.target.closest("button, .modal"); if (!b) return;
  if (b.classList.contains("modal") && e.target === b) return closeFam();
  var d = b.dataset;
  if (d.tab) return go(d.tab);
  if (d.go) return go(d.go);
  if (d.close) return closeFam();
  if (d.say) return sayAr(d.say);
  if (d.fam) return openFam(d.fam);
  if (d.sess) return startSession(d.sess, d.arg);
  if (d.ans != null) return answer(+d.ans);
  if (d.next) return next();
  if (d.cat) { ST.scope.cat = d.cat; save(); return render(); }
  if (d.ltog) { if (ST.scope.off[d.ltog]) delete ST.scope.off[d.ltog]; else ST.scope.off[d.ltog] = 1; var dd = DBY[d.ltog]; if (ST.scope.cat !== "all" && ST.scope.cat !== dd.cat) { ST.scope.cat = "all"; } save(); render(); var det = main.querySelector("details"); if (det) det.open = true; return; }
  if (d.lall) { ST.scope.off = {}; save(); render(); main.querySelector("details").open = true; return; }
  if (d.lnone) { DERSLER.forEach(function (x) { ST.scope.off[x.id] = 1; }); save(); render(); main.querySelector("details").open = true; return; }
  if (d.ftur) { FIND.t = d.ftur; return render(); }
  if (d.perday) { ST.perDay = +d.perday; save(); return render(); }
  if (d.snd) { SND.on = !SND.on; store.set("snd", SND.on); return render(); }
  if (d.reset) { if (window.confirm("Bütün ilerlemen (kutular, puan, seri) silinsin mi?")) { ST.lt = {}; ST.hist = {}; ST.stats = { xp: 0, streak: 0, last: -1, newDay: -1, newN: 0 }; save(); toast("İlerleme sıfırlandı."); render(); } return; }
  if (d.gstart) return startGame(d.gstart, d.mode);
  if (d.gmenu) { stopGame(); G = null; return render(); }
  if (!G) return;
  if (d.fab != null && !G.ans) { var k = G.cur.opts[+d.fab], ok = k === G.cur.w.k; G.ans = k; if (ok) { G.score += 10; beep("ok"); } else beep("no"); gameXp(ok ? 4 : 0, key(G.cur.w, "c"), ok); return render(); }
  if (d.pt != null) return pairTap(+d.pt);
  if (d.dus != null) return dusAnswer(+d.dus);
  if (d.cum != null && G.ans === null) { var c = G.cur, o = c.opts[+d.cum], ok2 = o === c.ok; G.ans = o; if (ok2) { G.score += 10; beep("ok"); } else beep("no"); gameXp(ok2 ? 4 : 0, c.k, ok2); return render(); }
  if (d.hiz != null) return hizAnswer(+d.hiz);
  if ((d.ter != null || d.tur != null) && G.ans === null) { var c3 = G.cur, o3 = c3.opts[+(d.ter != null ? d.ter : d.tur)], ok3 = o3 === c3.ok; G.ans = o3; if (ok3) { G.score += 10; beep("ok"); } else beep("no"); gameXp(ok3 ? 4 : 0, c3.k, ok3); return render(); }
  if (d.gnext) {
    G.r++;
    if (G.id === "fab") { if (G.r >= 10) return endGame("10 kelimenin " + G.score / 10 + " tanesinin kalıbını doğru buldun."); fabRound(); }
    if (G.id === "cum") { if (G.r >= 10) return endGame("10 cümlenin " + G.score / 10 + " tanesinde doğru kelimeyi koydun."); cumRound(); }
    if (G.id === "ter") { if (G.r >= 10) return endGame("10 terkibin " + G.score / 10 + " tanesini doğru tamamladın."); terRound(); }
    if (G.id === "tur") { if (G.r >= 10) return endGame("10 sorunun " + G.score / 10 + " tanesinde Arapçasını doğru buldun."); turRound(); }
    return render();
  }
});
document.addEventListener("input", function (e) {
  if (e.target.id === "find") { FIND.q = e.target.value; var pos = e.target.selectionStart; render(); var f = document.getElementById("find"); if (f) { f.focus(); try { f.setSelectionRange(pos, pos); } catch (x) {} } }
});
document.addEventListener("keydown", function (e) {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "Escape") return closeFam();
  var n = parseInt(e.key, 10);
  if (TAB === "tekrar" && S && !S.empty) {
    if (e.key === "Enter") { var nx = main.querySelector("[data-next]"); if (nx) { e.preventDefault(); nx.click(); } return; }
    if (n >= 1 && n <= 4) { var bt = main.querySelector('[data-ans="' + (n - 1) + '"]'); if (bt && !bt.disabled) bt.click(); }
    return;
  }
  if (TAB === "oyun" && G && !G.done) {
    if (G.id === "hiz" && (n === 1 || n === 2)) return hizAnswer(n === 1 ? 1 : 0);
    var sel = { fab: "data-fab", dus: "data-dus", cum: "data-cum", ter: "data-ter", tur: "data-tur" }[G.id];
    if (sel && n >= 1 && n <= 4) { var b2 = main.querySelector("[" + sel + '="' + (n - 1) + '"]'); if (b2 && !b2.disabled) b2.click(); }
    if (e.key === "Enter") { var g2 = main.querySelector("[data-gnext]"); if (g2) g2.click(); }
  }
});

render();
})();
