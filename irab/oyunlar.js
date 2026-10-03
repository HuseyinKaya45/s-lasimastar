// ---------- oyunlar ----------
var TUR5 = [["muf", "Müfred", "مُفْرَدٌ", "muf"]].concat(TUR_OPTS);
var HAL_TR = { ref: "Merfû", nasb: "Mansûb", cerr: "Mecrûr" };
var TUR_TR = { muf: "Müfred", mus: "Müsennâ", mzs: "Cem-i müz. sâlim", mns: "Cem-i müe. sâlim", tks: "Cem-i teksîr" };
var ALAMET = [["elif", "Elif", "الأَلِفُ"], ["vav", "Vav", "الوَاوُ"], ["ya", "Yâ", "اليَاءُ"], ["damme", "Damme", "الضَّمَّةُ"], ["fetha", "Fetha", "الفَتْحَةُ"], ["kesre", "Kesre", "الكَسْرَةُ"]];
function alametOf(t, c) {
  if (t === "mus") return c === "ref" ? "elif" : "ya";
  if (t === "mzs") return c === "ref" ? "vav" : "ya";
  if (t === "mns") return c === "ref" ? "damme" : "kesre";
  return { ref: "damme", nasb: "fetha", cerr: "kesre" }[c];
}
function alametName(k) { return ALAMET.filter(function (a) { return a[0] === k; })[0][1]; }
// havuz maddesini çöz: {kök|ek}
var ENDS = { mus: ["َانِ", "َيْنِ"], mzs: ["ُونَ", "ِينَ"], mns: ["َاتُ", "َاتِ", "َاتَ"], mnsN: ["َاتٌ", "َاتٍ", "َاتًا"], tks: ["ُ", "َ", "ِ"] };
var POOL = IRAB_POOL.map(function (p) {
  var m = /\{([^|]+)\|([^}]+)\}/.exec(p[0]), stem = m[1], end = m[2];
  var set = p[1] === "mns" && ENDS.mnsN.indexOf(end) >= 0 ? ENDS.mnsN : ENDS[p[1]];
  return { pre: p[0].slice(0, m.index), post: p[0].slice(m.index + m[0].length), w: stem + end, forms: set.map(function (e) { return stem + e; }), t: p[1], c: p[2], role: p[3], tr: p[4] };
});
function poolHtml(it, mode) { return it.pre + (mode === "blank" ? '<span class="blank">&nbsp;</span>' : '<b class="hl">' + it.w + '</b>') + it.post; }
function why(it) { return '<span class="ar">' + it.w + '</span>: ' + TUR_TR[it.t] + ' · ' + it.role + ' → <b>' + HAL_TR[it.c] + '</b> · alameti ' + alametName(alametOf(it.t, it.c)).toLowerCase(); }

var GAMES = {
  avci: { name: "Ek Avcısı", ico: "ـانِ · ـَيْنِ · ـَاتِ", col: "nasb", d: "12 cümle. Boşluğa kelimenin doğru şeklini koy. Fâil mi, mef'ûl mü? Ek ona göre değişir." },
  hal: { name: "Hal Yarışı", ico: "مَرْفُوعٌ · مَنْصُوبٌ · مَجْرُورٌ", col: "ref", d: "60 saniye. Altı çizili kelime merfû mu, mansûb mu, mecrûr mu? Seri yaptıkça puan katlanır." },
  dedektif: { name: "İ'rab Dedektifi", ico: "النَّوْعُ ← الحَالُ ← العَلَامَةُ", col: "cerr", d: "8 kelime, her birinde üç soru: türü ne, hali ne, alameti ne? Tam i'rab yapmayı öğretir." },
  tur: { name: "Tür Makinesi", ico: "ـات ؟ ـون ؟ ـان", col: "tks", d: "12 kelime. Müfred mi, müsennâ mı, hangi cem? Tuzaklar var: أَصْوَاتٌ، زَيْتُونٌ، مَكَانٌ…" },
  hafiza: { name: "Hafıza Kartları", ico: "كِتَابٌ ↔ كُتُبٌ", col: "mus", d: "Kartları çevir, eşleri bul: tekil ile kırık çoğulu ya da tür ve hal ile eki." }
};
var G = null, GT = null;
function stopGame() { if (GT) { clearInterval(GT); GT = null; } G = null; }
function renderGames() {
  if (G) return '<section class="panel">' + gameBody() + '</section>';
  var best = store.get("gbest", {});
  return '<section class="panel"><div class="card stack"><div class="lbl">Oyunlar</div><h2>Oynayarak pekiştir</h2><p class="muted">Her oyun i\'rabın bir adımını çalıştırır ve rütbe puanı kazandırır.</p><div class="row-btns"><button class="btn small" data-snd="1">Ses: ' + (SND.on ? "açık" : "kapalı") + '</button></div></div>' +
    '<div class="game-menu">' + Object.keys(GAMES).map(function (k) {
      var g = GAMES[k];
      return '<div class="card game-card" style="--role:var(--' + g.col + ')"><div class="ico">' + g.ico + '</div><h3>' + g.name + '</h3><p class="muted">' + g.d + '</p><p class="muted" style="margin-top:auto">' + (best[k] != null ? 'En iyi: <b class="tabular">' + best[k] + '</b>' : 'Henüz oynanmadı') + '</p>' +
        (k === "hafiza" ? '<div class="row-btns">' + Object.keys(HAFIZA).map(function (dk) { return '<button class="btn solid small" data-gstart="hafiza" data-deck="' + dk + '" style="--accent:var(--' + g.col + ')">' + HAFIZA[dk].name + '</button>'; }).join("") + '</div>' :
          '<button class="btn solid" data-gstart="' + k + '" style="--accent:var(--' + g.col + ')">Oyna</button>') + '</div>';
    }).join("") + '</div></section>';
}
function gameHead(t) { return '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="lbl">Oyun</div><h2>' + t + '</h2></div><button class="btn small" data-gmenu="1">Oyunlara dön</button></div>'; }
function redraw() { main.innerHTML = renderGames(); }
// türlere dengeli dağılmış bir liste
function balanced(n) { var by = {}; shuffle(POOL).forEach(function (p) { (by[p.t] = by[p.t] || []).push(p); }); var out = [], ks = shuffle(Object.keys(by)), i = 0; while (out.length < n) { var k = ks[i % ks.length]; if (by[k].length) out.push(by[k].shift()); i++; } return shuffle(out); }
function startGame(k, deck) {
  stopGame();
  G = { id: k, score: 0, n: 0, ok: 0, over: false, start: Date.now(), combo: 0, maxCombo: 0 };
  if (k === "avci") { G.list = balanced(12); G.i = 0; G.list.forEach(function (it) { it.opts = shuffle(it.forms); }); }
  if (k === "hal") { G.t = 60; G.opts = HAL_OPTS; nextSpeed(); }
  if (k === "dedektif") { G.list = balanced(8); G.i = 0; G.step = 1; G.r = []; }
  if (k === "tur") { var tr = shuffle(TUR_POOL.filter(function (x) { return /Tuzak/.test(x[2]) || x[1] === "muf"; })).slice(0, 4); G.list = shuffle(tr.concat(shuffle(TUR_POOL.filter(function (x) { return tr.indexOf(x) < 0; })).slice(0, 8))); G.i = 0; }
  if (k === "hafiza") { var ps = shuffle(HAFIZA[deck].pairs).slice(0, 6), cards = []; ps.forEach(function (p, i) { cards.push({ p: i, t: p[0] }); cards.push({ p: i, t: p[1] }); }); G.deck = deck; G.cards = shuffle(cards); G.open = []; G.done = {}; G.moves = 0; G.pairs = 6; }
  ST.tab = "oyun"; document.querySelectorAll("nav.tabs button").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.tab === "oyun" ? "true" : "false"); });
  redraw();
  if (k === "hal") GT = setInterval(function () {
    if (!G || G.over) return; G.t--; if (G.t <= 5 && G.t > 0) beep("tick");
    if (G.t <= 0) { G.t = 0; endGame(G.score); return; } hud();
  }, 1000);
  if (k === "hafiza") GT = setInterval(function () { var el = document.getElementById("g-clock"); if (el && G && !G.over) el.textContent = Math.floor((Date.now() - G.start) / 1000) + " sn"; }, 1000);
}
function hud() {
  var a = document.getElementById("g-time"); if (a) a.textContent = G.t;
  var tb = document.getElementById("g-tbar"); if (tb) { tb.firstChild.style.width = (G.t / 60 * 100) + "%"; tb.classList.toggle("low", G.t <= 10); }
  var s = document.getElementById("g-score"); if (s) s.textContent = G.score;
  var c = document.getElementById("g-combo"); if (c) c.textContent = "x" + Math.min(5, 1 + Math.floor(G.combo / 3));
}
function endGame(score) {
  if (GT) { clearInterval(GT); GT = null; }
  G.over = true; G.final = score;
  var best = store.get("gbest", {}); G.record = best[G.id] == null || score > best[G.id];
  if (G.record) { best[G.id] = score; store.set("gbest", best); }
  G.xp = Math.round(score / (G.id === "hal" ? 5 : 2));
  redraw(); addXP(G.xp); beep("win"); if (G.record || G.stars === 3) confetti();
}
function gameOver(t, lines) {
  return '<div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">' + t + ' bitti</div>' + (G.stars != null ? starsHtml(G.stars) : '') + '<div class="score-big tabular">' + G.final + '</div>' + (G.record ? '<p><b>Yeni rekor!</b></p>' : '') + lines.map(function (l) { return '<p>' + l + '</p>'; }).join("") +
    '<p class="muted">Kazandığın: +' + G.xp + ' rütbe puanı</p><div class="row-btns" style="justify-content:center"><button class="btn solid" data-gstart="' + G.id + '"' + (G.deck ? ' data-deck="' + G.deck + '"' : '') + '>Tekrar oyna</button><button class="btn" data-gmenu="1">Başka oyun</button></div></div>';
}
function gameBody() { return { avci: bodyAvci, hal: bodySpeed, dedektif: bodyDed, tur: bodyTur, hafiza: bodyHaf }[G.id](); }
function starsBy(ok, n) { return ok >= n - 1 ? 3 : ok >= Math.ceil(n * 0.66) ? 2 : 1; }

// ek avcısı
function bodyAvci() {
  if (G.over) return gameOver("Ek Avcısı", ['<b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> doğru.']);
  var it = G.list[G.i], done = G.ans != null;
  return '<div class="card stack">' + gameHead("Ek Avcısı") + '<div class="hud"><span>Cümle <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
    '<div class="target">' + (done ? poolHtml(it) : poolHtml(it, "blank")) + '</div>' +
    (done ? '<div class="fb" style="text-align:center">' + (G.ans === it.w ? '<span class="ok">Doğru! +10</span> ' : '<span class="no">Yanlış.</span> Doğrusu: <span class="ar">' + it.w + '</span>. ') + '<br>' + why(it) + '</div>' + (ST.tr ? '<p class="trline" style="text-align:center">' + it.tr + '</p>' : '') +
      '<div style="text-align:center"><button class="btn solid" data-gnext="1" id="g-next">' + (G.i + 1 < G.list.length ? "Sonraki" : "Sonucu gör") + '</button></div>' :
      '<p class="muted" style="text-align:center">Boşluğa hangisi gelir?</p><div class="big3">' + it.opts.map(function (f) { return '<button data-ga="' + f + '">' + f + '</button>'; }).join("") + '</div>') + '</div>';
}
// hal yarışı (hız)
function nextSpeed() { var it, g = 0; do { it = pick(POOL); g++; } while (G.cur && it.w === G.cur.w && g < 10); G.cur = it; }
function bodySpeed() {
  var title = GAMES.hal.name;
  if (G.over) return gameOver(title, ['Doğru: <b class="tabular">' + G.ok + ' / ' + G.n + '</b> · en uzun seri: <b class="tabular">' + G.maxCombo + '</b>']);
  return '<div class="card stack">' + gameHead(title) +
    '<div class="hud"><span>Süre <b id="g-time">' + G.t + '</b></span><span>Puan <b id="g-score">' + G.score + '</b></span><span>Çarpan <b id="g-combo">x' + Math.min(5, 1 + Math.floor(G.combo / 3)) + '</b></span></div>' +
    '<div class="time-bar' + (G.t <= 10 ? " low" : "") + '" id="g-tbar"><div style="width:' + (G.t / 60 * 100) + '%"></div></div>' +
    '<div class="target" id="g-target">' + poolHtml(G.cur) + '</div><div class="gfb" id="g-fb"><span class="muted">Klavye: 1 Merfû · 2 Mansûb · 3 Mecrûr</span></div>' +
    '<div class="big5">' + HAL_OPTS.map(function (o, i) { return '<button style="--role:var(--' + o[3] + ')" data-gs="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '<small>' + (i + 1) + '</small></button>'; }).join("") + '</div></div>';
}
function speedPick(v) {
  if (!G || G.over || G.lock) return;
  var c = G.cur, ok = c.c === v, tg = document.getElementById("g-target"), fb = document.getElementById("g-fb");
  G.n++;
  if (ok) {
    G.ok++; G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo);
    var m = Math.min(5, 1 + Math.floor((G.combo - 1) / 3)); G.score += 10 * m; beep("ok");
    fb.innerHTML = '<b style="color:var(--good)">Doğru +' + 10 * m + '</b> · önceki: <span class="ar">' + c.w + '</span> ' + c.role + ' → ' + HAL_TR[c.c];
    tg.classList.remove("flash-no"); tg.classList.add("flash-ok"); nextSpeed(); tg.innerHTML = poolHtml(G.cur);
    setTimeout(function () { tg.classList.remove("flash-ok"); }, 180);
  } else {
    G.combo = 0; G.t = Math.max(0, G.t - 3); beep("no"); G.lock = true;
    fb.innerHTML = '<b style="color:var(--bad)">Yanlış, −3 sn.</b> ' + why(c);
    void tg.offsetWidth; tg.classList.add("flash-no");
    setTimeout(function () { if (!G || G.over) return; G.lock = false; tg.classList.remove("flash-no"); nextSpeed(); tg.innerHTML = poolHtml(G.cur); fb.innerHTML = '<span class="muted">Klavye: 1 Merfû · 2 Mansûb · 3 Mecrûr</span>'; if (G.t <= 0) endGame(G.score); }, 1800);
  }
  hud();
}
// i'rab dedektifi: tür → hal → alamet
function bodyDed() {
  if (G.over) return gameOver("İ'rab Dedektifi", ['<b class="tabular">' + G.ok + ' / ' + G.list.length * 3 + '</b> adım doğru.']);
  var it = G.list[G.i], head = '<div class="card stack">' + gameHead("İ'rab Dedektifi") + '<div class="hud"><span>Kelime <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Adım <b>' + Math.min(G.step, 3) + '/3</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
    '<div class="target">' + poolHtml(it) + '</div>';
  var marks = G.r.map(function (r) { return r ? '<span class="ok">✓</span>' : '<span class="no">✗</span>'; }).join(" ");
  if (G.step === 1) return head + '<p style="text-align:center"><b>1. Altı çizili kelimenin türü ne?</b></p><div class="big5">' + TUR_OPTS.map(function (o) { return '<button style="--role:var(--' + o[3] + ')" data-gd="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '</button>'; }).join("") + '</div></div>';
  if (G.step === 2) return head + '<div class="fb" style="text-align:center">' + marks + ' Türü: <b>' + TUR_TR[it.t] + '</b></div><p style="text-align:center"><b>2. Cümledeki hali ne?</b></p><div class="big5">' + HAL_OPTS.map(function (o) { return '<button style="--role:var(--' + o[3] + ')" data-gd="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '</button>'; }).join("") + '</div></div>';
  if (G.step === 3) return head + '<div class="fb" style="text-align:center">' + marks + ' ' + TUR_TR[it.t] + ' · <b>' + HAL_TR[it.c] + '</b> (' + it.role + ')</div><p style="text-align:center"><b>3. Bu halin alameti ne?</b></p><div class="big5">' + ALAMET.map(function (o) { return '<button style="--role:var(--accent)" data-gd="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '</button>'; }).join("") + '</div></div>';
  return head + '<div class="fb" style="text-align:center">' + marks + '<br>' + why(it) + '</div>' + (ST.tr ? '<p class="trline" style="text-align:center">' + it.tr + '</p>' : '') +
    '<div style="text-align:center"><button class="btn solid" data-gdn="1" id="g-next">' + (G.i + 1 < G.list.length ? "Sonraki kelime" : "Sonucu gör") + '</button></div></div>';
}
function dedPick(v) {
  var it = G.list[G.i], ans = G.step === 1 ? it.t : G.step === 2 ? it.c : alametOf(it.t, it.c), good = v === ans;
  G.r.push(good); if (good) { G.ok++; G.score += 10; beep("ok"); } else beep("no");
  G.step++; redraw();
}
// tür makinesi
function bodyTur() {
  if (G.over) return gameOver("Tür Makinesi", ['<b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> doğru.']);
  var c = G.list[G.i];
  return '<div class="card stack">' + gameHead("Tür Makinesi") + '<div class="hud"><span>Kelime <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
    '<div class="target" style="font-size:clamp(2.4rem,9vw,3.4rem)">' + c[0] + '</div>' +
    (G.ans != null ? '<div class="fb" style="text-align:center">' + (G.ans === c[1] ? '<span class="ok">Doğru.</span> ' : '<span class="no">Yanlış.</span> Doğrusu: <b>' + TUR_TR[c[1]] + '</b>. ') + arWrap(c[2]) + '</div><div style="text-align:center"><button class="btn solid" data-gnext="1" id="g-next">' + (G.i + 1 < G.list.length ? "Sonraki" : "Sonucu gör") + '</button></div>' :
      '<div class="big5">' + TUR5.map(function (o) { return '<button style="--role:var(--' + o[3] + ')" data-gn="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '</button>'; }).join("") + '</div>') + '</div>';
}
// hafıza
function bodyHaf() {
  if (G.over) return gameOver("Hafıza Kartları", ['<b class="tabular">' + G.moves + '</b> hamlede, <b class="tabular">' + G.secs + '</b> saniyede bitirdin.']);
  return '<div class="card stack">' + gameHead("Hafıza Kartları · " + HAFIZA[G.deck].name) +
    '<div class="hud"><span>Hamle <b id="g-moves">' + G.moves + '</b></span><span>Çift <b id="g-pairs">' + Object.keys(G.done).length + '/' + G.pairs + '</b></span><span>Süre <b id="g-clock">0 sn</b></span></div>' +
    '<div class="mem">' + G.cards.map(function (c, i) { var lat = /^[A-Za-zÇĞİÖŞÜçğıöşü]/.test(c.t); return '<button class="mcard' + (G.done[c.p] ? " done" : "") + '" data-gc="' + i + '" aria-label="Kart ' + (i + 1) + '"><div class="in"><div class="face back">؟</div><div class="face front' + (lat ? " lat" : "") + '">' + c.t + '</div></div></button>'; }).join("") + '</div></div>';
}
function flip(i) {
  if (!G || G.over || G.lock) return;
  var c = G.cards[i]; if (G.done[c.p] || G.open.indexOf(i) >= 0) return;
  G.open.push(i); document.querySelector('[data-gc="' + i + '"]').classList.add("up");
  if (G.open.length < 2) return;
  G.moves++; document.getElementById("g-moves").textContent = G.moves;
  var a = G.cards[G.open[0]], b = G.cards[G.open[1]];
  if (a.p === b.p) {
    G.done[a.p] = 1; beep("ok");
    G.open.forEach(function (j) { var e = document.querySelector('[data-gc="' + j + '"]'); e.classList.remove("up"); e.classList.add("done"); });
    G.open = []; document.getElementById("g-pairs").textContent = Object.keys(G.done).length + "/" + G.pairs;
    if (Object.keys(G.done).length === G.pairs) { G.secs = Math.floor((Date.now() - G.start) / 1000); G.stars = G.moves <= 9 ? 3 : G.moves <= 13 ? 2 : 1; setTimeout(function () { endGame(G.stars * 20 + Math.max(0, 60 - G.secs)); }, 500); }
  } else {
    G.lock = true; beep("no");
    setTimeout(function () { if (!G) return; G.open.forEach(function (j) { var e = document.querySelector('[data-gc="' + j + '"]'); if (e) e.classList.remove("up"); }); G.open = []; G.lock = false; }, 950);
  }
}

// ---------- QUIZ PROVASI ----------
var TOPIC = { u1: "Müsennâ", u2: "Cem-i müz. sâlim", u3: "Cem-i müe. sâlim", u4: "Cem-i teksîr" };
var T2U = { mus: "u1", mzs: "u2", mns: "u3", tks: "u4" };
var Q = null, QT = null;
function stopQuiz() { if (QT) { clearInterval(QT); QT = null; } if (Q && !Q.done) Q = null; }
function quizBank() {
  var bank = { u1: [], u2: [], u3: [], u4: [] };
  UNITS.forEach(function (u) {
    u.ex.forEach(function (ex) {
      expand(ex).forEach(function (it) {
        if (it.kind === "pick") bank[u.id].push({ inst: ex.tr.split(".")[0] + ".", q: it.q.replace("___", "……"), o: it.o.slice(), a: it.o[it.a], why: it.why || "", tr: it.tr || "" });
        if (it.kind === "classify") bank[u.id].push({ inst: "Bu kelimenin türü ne?", q: it.s, o: ex.opts.map(function (x) { return x[1]; }), a: ex.opts.filter(function (x) { return x[0] === it.a; })[0][1], why: it.why || "", tr: it.tr || "" });
        if (it.kind === "irab") bank[T2U[it.t]].push({ inst: "Altı çizili kelimenin hali ne?", q: it.s.replace(/\[(.+?)\]/, '<b class="hl">$1</b>'), o: ["Merfû", "Mansûb", "Mecrûr"], a: HAL_TR[it.c], why: it.why || "", tr: it.tr || "" });
      });
    });
  });
  POOL.forEach(function (p) {
    bank[T2U[p.t]].push({ inst: "Boşluğa hangisi gelir?", q: poolHtml(p, "blank"), o: p.forms.slice(), a: p.w, why: why(p), tr: p.tr });
    bank[T2U[p.t]].push({ inst: "Bu halin alameti ne?", q: poolHtml(p), o: ALAMET.map(function (a) { return a[1]; }), a: alametName(alametOf(p.t, p.c)), why: why(p), tr: p.tr });
  });
  TUR_POOL.forEach(function (w) { if (w[1] !== "muf") bank[T2U[w[1]]].push({ inst: "Bu kelimenin türü ne?", q: w[0], o: TUR5.map(function (x) { return x[1]; }), a: TUR_TR[w[1]], why: w[2] }); });
  return bank;
}
function startQuiz() {
  var bank = quizBank(), qs = [];
  ["u1", "u2", "u3", "u4"].forEach(function (k) {
    var seen = {}, got = 0;
    shuffle(bank[k]).forEach(function (q) { var sig = q.q.replace(/<[^>]+>/g, ""); if (got >= 5 || seen[sig]) return; seen[sig] = 1; got++; q.topic = k; q.o = shuffle(q.o); qs.push(q); });
  });
  Q = { qs: shuffle(qs), i: 0, ans: [], start: Date.now(), done: false };
  main.innerHTML = renderQuiz();
  QT = setInterval(function () { var el = document.getElementById("qz-clock"); if (el && Q && !Q.done) { var s = Math.floor((Date.now() - Q.start) / 1000); el.textContent = Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); } }, 1000);
}
function renderQuiz() {
  var best = store.get("qbest", null);
  if (!Q) return '<section class="panel"><div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">Quiz provası</div><h2>Gerçek quiz gibi: 20 soru</h2>' +
    '<p class="muted" style="max-width:60ch">Her konudan 5 soru gelir: boşluk doldurma, hal bulma, alamet ve tür soruları. Cevaplar sonda gösterilir. Sonunda konu konu puanını ve yanlışlarının açıklamasını görürsün. Her denemede sorular değişir.</p>' +
    (best != null ? '<p>En iyi sonucun: <b class="tabular">' + best + ' / 20</b></p>' : '') + '<button class="btn solid" data-qstart="1">Provayı başlat</button></div></section>';
  if (Q.done) {
    var by = {}; Q.qs.forEach(function (q, i) { by[q.topic] = by[q.topic] || [0, 0]; by[q.topic][1]++; if (Q.ans[i] === q.a) by[q.topic][0]++; });
    var tot = Q.qs.filter(function (q, i) { return Q.ans[i] === q.a; }).length;
    var col = { u1: "mus", u2: "mzs", u3: "mns", u4: "tks" };
    var weak = Object.keys(by).filter(function (k) { return by[k][0] / by[k][1] < 0.8; });
    return '<section class="panel"><div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">Quiz provası bitti · ' + Q.time + '</div>' + starsHtml(tot >= 18 ? 3 : tot >= 14 ? 2 : 1) + '<div class="score-big tabular">' + tot + ' / 20</div>' +
      '<p>' + (tot >= 18 ? "Konuya hâkimsin. Aferin!" : tot >= 14 ? "İyi gidiyorsun. Aşağıdaki zayıf konuya bir kez daha bak." : "Önce Özet'teki tabloyu çalış, zayıf konunun alıştırmalarını çöz, sonra provayı tekrarla.") + '</p>' +
      '<div class="qz-bars">' + ["u1", "u2", "u3", "u4"].map(function (k) { var v = by[k] || [0, 5]; return '<div class="qz-bar" style="--role:var(--' + col[k] + ')"><span>' + TOPIC[k] + '</span><div class="tr2"><div style="width:' + (v[0] / v[1] * 100) + '%"></div></div><b class="tabular">' + v[0] + '/' + v[1] + '</b></div>'; }).join("") + '</div>' +
      (weak.length ? '<div class="row-btns" style="justify-content:center">' + weak.map(function (k) { return '<button class="btn small" data-go="' + k + '">' + TOPIC[k] + ' konusuna dön</button>'; }).join("") + '</div>' : '') +
      '<div class="row-btns" style="justify-content:center"><button class="btn solid" data-qstart="1">Yeni prova</button></div></div>' +
      '<div class="card stack"><div class="lbl">Cevap anahtarı</div><h2>Yanlışların</h2>' + (tot === 20 ? '<p>Hiç yanlışın yok.</p>' : '<div class="items">' + Q.qs.map(function (q, i) {
        if (Q.ans[i] === q.a) return "";
        return '<div class="item no"><span class="qz-type">' + TOPIC[q.topic] + ' · ' + q.inst + '</span>' + (q.q ? '<div class="q">' + q.q + '</div>' : '') + '<div class="fb"><span class="no">Senin cevabın:</span> ' + arw(Q.ans[i] || "boş") + '<br><span class="ok">Doğrusu:</span> ' + arw(q.a) + (q.why ? '<br>' + q.why : '') + '</div>' + (q.tr ? '<div class="trline">' + q.tr + '</div>' : '') + '</div>';
      }).join("") + '</div>') + '</div></section>';
  }
  var q = Q.qs[Q.i];
  return '<section class="panel"><div class="card stack"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="lbl">Quiz provası · ' + TOPIC[q.topic] + '</div><h2>Soru ' + (Q.i + 1) + ' / 20</h2></div><div class="hud"><span>Süre <b id="qz-clock">0:00</b></span></div></div>' +
    '<div class="progress prog"><div style="width:' + (Q.i / 20 * 100) + '%;--role:var(--accent)"></div></div>' +
    '<p><b>' + q.inst + '</b></p>' + (q.q ? '<div class="target" style="font-size:clamp(1.5rem,5vw,2.2rem)">' + q.q + '</div>' : '') +
    '<div class="opts">' + q.o.map(function (o, oi) { var lat = /^[A-Za-zÇĞİÖŞÜçğıöşü]/.test(o); return '<button class="opt block' + (lat ? " lat" : "") + (Q.ans[Q.i] === o ? " sel-ok" : "") + '" data-qa="' + oi + '">' + o + '</button>'; }).join("") + '</div>' +
    '<div class="row-btns"><button class="btn small" data-qprev="1"' + (Q.i === 0 ? " disabled" : "") + '>Önceki</button><button class="btn small" data-qskip="1">' + (Q.i < 19 ? "Sonraki" : "Bitir") + '</button></div></div></section>';
}
function arw(t) { return /[؀-ۿ]/.test(t) ? '<span class="ar">' + t + '</span>' : '<b>' + t + '</b>'; }
function quizNext() {
  if (Q.i < 19) { Q.i++; main.innerHTML = renderQuiz(); return; }
  var s = Math.floor((Date.now() - Q.start) / 1000); Q.time = Math.floor(s / 60) + " dk " + (s % 60) + " sn"; Q.done = true;
  if (QT) { clearInterval(QT); QT = null; }
  var tot = Q.qs.filter(function (q, i) { return Q.ans[i] === q.a; }).length, best = store.get("qbest", null);
  if (best == null || tot > best) store.set("qbest", tot);
  main.innerHTML = renderQuiz(); window.scrollTo({ top: 0 }); addXP(tot * 4); if (tot >= 18) confetti(); beep("win");
}

main.addEventListener("click", function (ev) {
  var b = ev.target.closest("button"); if (!b) return;
  var d = b.dataset;
  if (d.qstart) { startQuiz(); window.scrollTo({ top: 0 }); return; }
  if (d.qa != null && Q && !Q.done) { Q.ans[Q.i] = Q.qs[Q.i].o[+d.qa]; beep("tick"); setTimeout(quizNext, 180); return; }
  if (d.qprev && Q && Q.i > 0) { Q.i--; main.innerHTML = renderQuiz(); return; }
  if (d.qskip && Q) { quizNext(); return; }
  if (d.gstart) { startGame(d.gstart, d.deck); window.scrollTo({ top: 0 }); return; }
  if (d.gmenu) { stopGame(); redraw(); return; }
  if (!G) return;
  if (d.gs) speedPick(d.gs);
  else if (d.ga != null) { if (G.ans != null) return; G.ans = d.ga; if (d.ga === G.list[G.i].w) { G.ok++; G.score += 10; beep("ok"); } else beep("no"); redraw(); }
  else if (d.gn) { if (G.ans != null) return; G.ans = d.gn; if (d.gn === G.list[G.i][1]) { G.ok++; G.score += 10; beep("ok"); } else beep("no"); redraw(); }
  else if (d.gnext) { G.i++; G.ans = null; if (G.i >= G.list.length) { G.stars = starsBy(G.ok, G.list.length); endGame(G.score); } else redraw(); }
  else if (d.gd) dedPick(d.gd);
  else if (d.gdn) { G.i++; G.step = 1; G.r = []; if (G.i >= G.list.length) { G.stars = starsBy(G.ok, G.list.length * 3); endGame(G.score); } else redraw(); }
  else if (d.gc != null) flip(+d.gc);
});
document.addEventListener("keydown", function (ev) {
  if (ST.tab !== "oyun" || !G || G.over || G.id !== "hal") return;
  var i = ["1", "2", "3"].indexOf(ev.key); if (i >= 0) { ev.preventDefault(); speedPick(HAL_OPTS[i][0]); }
});
