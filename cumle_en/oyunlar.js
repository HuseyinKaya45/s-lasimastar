// ---------- game pools ----------
function buildPools() {
  var P = { sent: [], order: [], agree: [], irab: [] };
  function addSent(chs, tr) {
    if (!chs.length) return;
    var first = chs[0].r;
    if (first === "mub" || first === "fiil") P.sent.push({ s: chs.map(function (c) { return c.t; }).join(" "), a: first === "mub" ? "i" : "f", tr: tr || "" });
    chs.forEach(function (c, ci) {
      if (["mub", "hab", "fail", "mef"].indexOf(c.r) < 0) return;
      var w = c.t.split(" ")[0], m = /^(.*?)(ًا|[ًٌٍَُِ])$/.exec(w);
      if (!m || m[1].length < 2) return;
      P.irab.push({ chs: chs, ci: ci, base: m[1], end: m[2], role: c.r, tr: tr || "" });
    });
  }
  UNITS.forEach(function (u) {
    u.examples.forEach(function (e) { addSent(chunks(e.s), e.tr); if (e.pair) addSent(chunks(e.pair), e.pairTr); });
    u.ex.forEach(function (ex) {
      if (ex.type === "tag") ex.items.forEach(function (it) { addSent(chunks(it.c), it.tr); });
      if (ex.type === "classify") ex.items.forEach(function (it) { P.sent.push({ s: it.s, a: it.a, tr: it.tr, why: it.why }); });
      if (ex.type === "reading") ex.cls.items.forEach(function (it) { P.sent.push({ s: it.s, a: it.a, why: it.why }); });
      if (ex.type === "order") ex.items.forEach(function (it) { P.order.push(it); });
      if (ex.agree || ex.type === "agree" || ex.type === "number") expand(ex).forEach(function (it) { P.agree.push({ it: it, fill: !!ex.fill }); });
    });
  });
  return P;
}
var POOLS = null;
var GAMES = {
  hiz: { name: "Nominal or Verbal?", ico: "اسْمِيَّةٌ ؟ فِعْلِيَّةٌ", col: "mub", d: "60 seconds. Quickly choose the type of each sentence that appears. A streak of correct answers raises your multiplier; a wrong answer costs 3 seconds." },
  tren: { name: "Sentence Train", ico: "فِعْلٌ ← فَاعِلٌ ← مَفْعُولٌ", col: "fiil", d: "8 sentences. Put the mixed-up wagons in the right order. Some trains have an extra wagon: if the verb does not agree with the fā‘il, leave it out." },
  uyum: { name: "Agreement Master", ico: "طَوِيلٌ · طَوِيلَةٌ · طَوِيلُونَ", col: "hab", d: "10 questions, 12 seconds each. Make the khabar agree with the mubtada’ and the verb with the fā‘il." },
  irab: { name: "Vowel Hunter", ico: "ـُ ـَ ـِ", col: "mef", d: "12 questions. The last vowel of a word is missing: ḍamma, fatḥa or kasra? Think about its role and catch the vowel." },
  kita: { name: "Continent Hunt", ico: "آسِيَا · إِفْرِيقِيَا", col: "fail", d: "From the free reading: 12 countries. Read the Arabic name: Asia or Africa?" }
};
var G = null, GT = null;
function stopGame() { if (GT) { clearInterval(GT); GT = null; } G = null; }
function renderGames() {
  if (G) return '<section class="panel">' + gameBody() + '</section>';
  var best = store.get("gbest", {});
  return '<section class="panel">' +
    '<div class="card stack"><div class="lbl">Games</div><h2>Practise by playing</h2><p class="muted">The games are built from the book’s sentences in all four lessons. Every game earns you rank points.</p>' +
      '<div class="row-btns"><button class="btn small" data-snd="1">Sound: ' + (SND.on ? "on" : "off") + '</button></div></div>' +
    '<div class="game-menu">' + Object.keys(GAMES).map(function (k) {
      var g = GAMES[k];
      return '<div class="card game-card" style="--role:var(--' + g.col + ')"><div class="ico">' + g.ico + '</div><h3>' + g.name + '</h3><p class="muted">' + g.d + '</p><p class="muted" style="margin-top:auto">' + (best[k] != null ? 'Best: <b class="tabular">' + best[k] + '</b>' : 'Not played yet') + '</p><button class="btn solid" data-gstart="' + k + '" style="--accent:var(--' + g.col + ')">Play</button></div>';
    }).join("") + '</div></section>';
}
function gameHead(title) { return '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="lbl">Game</div><h2>' + title + '</h2></div><button class="btn small" data-gmenu="1">Back to games</button></div>'; }
function startGame(k) {
  stopGame(); POOLS = POOLS || buildPools();
  G = { id: k, score: 0, n: 0, ok: 0, over: false, start: Date.now() };
  if (k === "hiz") { G.t = 60; G.combo = 0; G.maxCombo = 0; nextHiz(); }
  if (k === "tren") { G.list = shuffle(POOLS.order).slice(0, 8); G.i = 0; G.miss = 0; setupTren(); }
  if (k === "uyum") { G.list = shuffle(POOLS.agree).slice(0, 10); G.i = 0; G.t = 12; }
  if (k === "irab") { G.list = shuffle(POOLS.irab).slice(0, 12); G.i = 0; }
  if (k === "kita") { G.list = shuffle(KIRAAT.countries).slice(0, 12); G.i = 0; }
  ST.tab = "oyun"; document.querySelectorAll("nav.tabs button").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.tab === "oyun" ? "true" : "false"); });
  main.innerHTML = renderGames();
  if (k === "hiz") GT = setInterval(function () {
    if (!G || G.id !== "hiz" || G.over) return;
    G.t--; if (G.t <= 5 && G.t > 0) beep("tick");
    if (G.t <= 0) { G.t = 0; endGame(G.score); return; }
    hud();
  }, 1000);
  if (k === "uyum") GT = setInterval(function () {
    if (!G || G.id !== "uyum" || G.over || G.ans != null) return;
    G.t--; if (G.t <= 3 && G.t > 0) beep("tick");
    if (G.t <= 0) { G.ans = -1; G.n++; beep("no"); redraw(); return; }
    hud();
  }, 1000);
}
function redraw() { main.innerHTML = renderGames(); }
function hud() {
  var a = document.getElementById("g-time"); if (a) a.textContent = G.t;
  var tb = document.getElementById("g-tbar"); if (tb) { tb.firstChild.style.width = (G.t / (G.id === "uyum" ? 12 : 60) * 100) + "%"; tb.classList.toggle("low", G.t <= (G.id === "uyum" ? 4 : 10)); }
  var s = document.getElementById("g-score"); if (s) s.textContent = G.score;
  var c = document.getElementById("g-combo"); if (c) c.textContent = "x" + Math.min(5, 1 + Math.floor(G.combo / 3));
}
function endGame(score) {
  if (GT) { clearInterval(GT); GT = null; }
  G.over = true; G.final = score;
  var best = store.get("gbest", {}); G.record = best[G.id] == null || score > best[G.id];
  if (G.record) { best[G.id] = score; store.set("gbest", best); }
  G.xp = Math.round(score / (G.id === "hiz" ? 5 : 2));
  redraw(); addXP(G.xp); beep("win");
  if (G.record || G.stars === 3) confetti();
}
function gameOver(title, lines) {
  return '<div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">Game over: ' + title + '</div>' + (G.stars != null ? starsHtml(G.stars) : '') +
    '<div class="score-big tabular">' + G.final + '</div>' + (G.record ? '<p><b>New record!</b></p>' : '') + lines.map(function (l) { return '<p>' + l + '</p>'; }).join("") +
    '<p class="muted">You earned: +' + G.xp + ' rank points</p><div class="row-btns" style="justify-content:center"><button class="btn solid" data-gstart="' + G.id + '">Play again</button><button class="btn" data-gmenu="1">Another game</button></div></div>';
}
function gameBody() {
  if (G.id === "hiz") return bodyHiz();
  if (G.id === "tren") return bodyTren();
  if (G.id === "uyum") return bodyUyum();
  if (G.id === "irab") return bodyIrab();
  if (G.id === "kita") return bodyKita();
  return "";
}

// 1. Nominal or verbal?
function nextHiz() { var it, g = 0; do { it = pick(POOLS.sent); g++; } while (G.cur && it.s === G.cur.s && g < 10); G.cur = it; }
function bodyHiz() {
  if (G.over) return gameOver("Nominal or Verbal?", ['Correct: <b class="tabular">' + G.ok + ' / ' + G.n + '</b> · longest streak: <b class="tabular">' + G.maxCombo + '</b>', G.ok >= 20 ? "You can tell a sentence by its first word." : "Tip: look only at the first word. Is it a noun or a verb?"]);
  return '<div class="card stack">' + gameHead("Nominal or Verbal?") +
    '<div class="hud"><span>Time <b id="g-time">' + G.t + '</b></span><span>Score <b id="g-score">' + G.score + '</b></span><span>Multiplier <b id="g-combo">x' + Math.min(5, 1 + Math.floor(G.combo / 3)) + '</b></span></div>' +
    '<div class="time-bar' + (G.t <= 10 ? " low" : "") + '" id="g-tbar"><div style="width:' + (G.t / 60 * 100) + '%"></div></div>' +
    '<div class="target" id="g-target">' + G.cur.s + '</div><div class="gfb" id="g-fb"><span class="muted">Keyboard: 1 nominal sentence, 2 verbal sentence</span></div>' +
    '<div class="big2"><button style="--role:var(--mub)" data-gp="i"><span class="ar">جُمْلَةٌ اسْمِيَّةٌ</span>Nominal sentence<small>1</small></button><button style="--role:var(--fiil)" data-gp="f"><span class="ar">جُمْلَةٌ فِعْلِيَّةٌ</span>Verbal sentence<small>2</small></button></div></div>';
}
function hizPick(v) {
  if (!G || G.over || G.lock) return;
  var c = G.cur, ok = c.a === v, tg = document.getElementById("g-target"), fb = document.getElementById("g-fb");
  G.n++;
  if (ok) {
    G.ok++; G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo);
    var m = Math.min(5, 1 + Math.floor((G.combo - 1) / 3)); G.score += 10 * m; beep("ok");
    fb.innerHTML = '<b style="color:var(--good)">Correct +' + 10 * m + '</b> · previous sentence: <span class="ar">' + c.s + '</span>' + (c.tr ? ' = ' + c.tr : '');
    tg.classList.remove("flash-no"); tg.classList.add("flash-ok"); nextHiz(); tg.textContent = G.cur.s;
    setTimeout(function () { tg.classList.remove("flash-ok"); }, 180);
  } else {
    G.combo = 0; G.t = Math.max(0, G.t - 3); beep("no"); G.lock = true;
    fb.innerHTML = '<b style="color:var(--bad)">Wrong, −3 s.</b> ' + (c.why || (c.a === "i" ? "The first word is a noun." : "The first word is a verb.")) + (c.tr ? ' · ' + c.tr : '');
    void tg.offsetWidth; tg.classList.add("flash-no");
    setTimeout(function () { if (!G || G.id !== "hiz" || G.over) return; G.lock = false; tg.classList.remove("flash-no"); nextHiz(); tg.textContent = G.cur.s; if (G.t <= 0) endGame(G.score); }, 1200);
  }
  hud();
}

// 2. Sentence train
function setupTren() { var it = G.list[G.i]; G.pool = shuffle(it.t.concat(it.extra || []).map(function (t, i) { return { t: t, id: i }; })); G.line = []; G.res = null; G.tries = 0; }
function bodyTren() {
  if (G.over) return gameOver("Sentence Train", ['You built <b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> trains correctly on the first try, in <b class="tabular">' + G.secs + '</b> seconds.']);
  var it = G.list[G.i], used = {}; G.line.forEach(function (id) { used[id] = 1; });
  var txt = function (id) { return G.pool.filter(function (p) { return p.id === id; })[0].t; };
  return '<div class="card stack">' + gameHead("Sentence Train") +
    '<div class="hud"><span>Train <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Score <b>' + G.score + '</b></span></div>' +
    (it.from ? '<p class="muted">Turn it into a nominal sentence: <span class="ar" style="font-size:1.3rem;color:var(--ink)">' + it.from + '</span></p>' : '<p class="muted">Put the wagons in the right order.' + (ST.tr && it.tr ? ' Hint: ' + it.tr : '') + '</p>') +
    '<div class="svg-scroll"><svg viewBox="0 0 640 46" aria-hidden="true"><rect x="560" y="8" width="70" height="30" rx="8" class="s-fiil"/><rect x="590" y="0" width="22" height="14" rx="3" class="s-fiil"/><circle cx="578" cy="40" r="5" class="s-ink"/><circle cx="612" cy="40" r="5" class="s-ink"/><path d="M10 40 L555 40" class="k-line" stroke-width="3"/></svg></div>' +
    '<div class="tile-line' + (G.res === "ok" ? " okk" : G.res === "no" ? " nok" : "") + '">' + (G.line.length ? G.line.map(function (id, pos) { return '<button class="tile inl" data-gun="' + pos + '">' + txt(id) + '</button>'; }).join("") : '<span class="muted" style="font-size:.9rem;direction:ltr">The engine is on the right: the first wagon goes right behind it.</span>') + '</div>' +
    '<div class="tiles">' + G.pool.map(function (p) { return '<button class="tile" data-gpl="' + p.id + '"' + (used[p.id] ? " disabled" : "") + '>' + p.t + '</button>'; }).join("") + '</div>' +
    '<div class="row-btns"><button class="btn solid" data-gtc="1">Send the train</button><button class="btn" data-gts="1">Skip</button></div>' +
    (G.res === "no" ? '<div class="fb"><span class="no">Derailed!</span> Check the order, or whether the verb agrees with the fā‘il.</div>' : '') + '</div>';
}
function trenCheck(skip) {
  var it = G.list[G.i];
  var txt = norm(G.line.map(function (id) { return G.pool.filter(function (p) { return p.id === id; })[0].t; }).join(" "));
  var ok = !skip && [it.t.join(" ")].concat(it.alt || []).map(norm).indexOf(txt) >= 0;
  if (ok) { G.score += G.tries === 0 ? 15 : 8; if (G.tries === 0) G.ok++; beep("ok"); G.i++; }
  else if (skip) { G.i++; beep("no"); toast("Correct answer: " + it.t.join(" ")); }
  else { G.tries++; G.miss++; G.res = "no"; beep("no"); redraw(); return; }
  if (G.i >= G.list.length) { G.secs = Math.floor((Date.now() - G.start) / 1000); G.stars = G.ok >= 7 ? 3 : G.ok >= 5 ? 2 : 1; endGame(G.score); return; }
  setupTren(); redraw();
}

// 3. Agreement master
function bodyUyum() {
  if (G.over) return gameOver("Agreement Master", ['<b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> correct.']);
  var e = G.list[G.i], it = e.it, ai = typeof it.a === "number" ? it.a : it.o.indexOf(it.a);
  var q = it.q ? (e.fill ? it.q.replace("___", '<span class="q-end">؟</span>') : it.q) : "Which one is correct?";
  return '<div class="card stack">' + gameHead("Agreement Master") +
    '<div class="hud"><span>Question <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Score <b id="g-score">' + G.score + '</b></span><span>Time <b id="g-time">' + G.t + '</b></span></div>' +
    '<div class="time-bar" id="g-tbar"><div style="width:' + (G.t / 12 * 100) + '%"></div></div>' +
    '<div class="target" style="font-size:1.8rem">' + q + '</div>' +
    '<div class="opts">' + it.o.map(function (o, oi) {
      var cl = G.ans != null ? (oi === ai ? " sel-ok" : (oi === G.ans ? " sel-no" : "")) : "";
      return '<button class="opt block' + cl + '" data-gu="' + oi + '"' + (G.ans != null ? " disabled" : "") + '>' + o + '</button>';
    }).join("") + '</div>' +
    (G.ans != null ? '<div class="fb">' + (G.ans === ai ? '<span class="ok">Correct.</span> ' : G.ans === -1 ? '<span class="no">Time’s up.</span> ' : '<span class="no">Wrong.</span> ') + (it.why || "") + (it.tr ? ' · ' + it.tr : '') + '</div><div><button class="btn solid" data-gnext="1" id="g-next">' + (G.i + 1 < G.list.length ? "Next" : "See result") + '</button></div>' : '') + '</div>';
}
function uyumPick(oi) {
  if (!G || G.ans != null) return;
  var it = G.list[G.i].it, ai = typeof it.a === "number" ? it.a : it.o.indexOf(it.a);
  G.ans = oi; G.n++;
  if (oi === ai) { G.ok++; G.score += 10 + G.t; beep("ok"); } else beep("no");
  redraw(); var nb = document.getElementById("g-next"); if (nb) nb.focus({ preventScroll: true });
}
function uyumNext() {
  G.i++; G.ans = null; G.t = 12;
  if (G.i >= G.list.length) { G.stars = G.ok >= 9 ? 3 : G.ok >= 6 ? 2 : 1; endGame(G.score); return; }
  redraw();
}

// 4. Vowel hunter
function irabOpts(e) {
  var b = e.base, tanwin = /[ًٌٍ]/.test(e.end), alif = e.end === "ًا";
  var list = tanwin ? [b + "ٌ", b + (alif ? "ًا" : "ً"), b + "ٍ"] : [b + "ُ", b + "َ", b + "ِ"];
  return list;
}
function bodyIrab() {
  if (G.over) return gameOver("Vowel Hunter", ['You caught <b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> vowels.']);
  var e = G.list[G.i], opts = irabOpts(e), correct = e.base + e.end;
  var sent = e.chs.map(function (c, ci) {
    if (ci !== e.ci) return c.t;
    var rest = c.t.split(" ").slice(1).join(" ");
    if (G.ans != null) return '<span class="r-' + e.role + '" style="font-weight:700">' + correct + '</span>' + (rest ? " " + rest : "");
    return e.base + '<span class="q-end">؟</span>' + (rest ? " " + rest : "");
  }).join(" ");
  var labels = ["ḍamma", "fatḥa", "kasra"];
  return '<div class="card stack">' + gameHead("Vowel Hunter") +
    '<div class="hud"><span>Question <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Score <b>' + G.score + '</b></span></div>' +
    '<div class="target">' + sent + '</div><p class="muted" style="text-align:center">Which vowel ends the word marked with a question mark?</p>' +
    '<div class="big3">' + opts.map(function (o, oi) {
      var cl = G.ans != null ? (o === correct ? ' style="--role:var(--good)"' : (oi === G.ans ? ' style="--role:var(--bad)"' : ' style="opacity:.5"')) : '';
      return '<button data-gi="' + oi + '"' + cl + (G.ans != null ? " disabled" : "") + '>' + o + '<small style="font-family:var(--f-body);font-size:.75rem">' + labels[oi] + '</small></button>';
    }).join("") + '</div>' +
    (G.ans != null ? '<div class="fb">' + (opts[G.ans] === correct ? '<span class="ok">Correct.</span> ' : '<span class="no">Wrong.</span> ') + 'This word is the <b class="r-' + e.role + '">' + ROLES[e.role].tr + '</b>: ' + (e.role === "mef" ? "accusative (manṣūb); a singular noun takes fatḥa." : "nominative (marfū‘); a singular noun takes ḍamma.") + (e.tr ? ' · ' + e.tr : '') + '</div><div><button class="btn solid" data-gin="1" id="g-next">' + (G.i + 1 < G.list.length ? "Next" : "See result") + '</button></div>' : '') + '</div>';
}
function irabPick(oi) {
  if (!G || G.ans != null) return;
  var e = G.list[G.i]; G.ans = oi;
  if (irabOpts(e)[oi] === e.base + e.end) { G.ok++; G.score += 10; beep("ok"); } else beep("no");
  redraw(); var nb = document.getElementById("g-next"); if (nb) nb.focus({ preventScroll: true });
}
function irabNext() { G.i++; G.ans = null; if (G.i >= G.list.length) { G.stars = G.ok >= 11 ? 3 : G.ok >= 8 ? 2 : 1; endGame(G.score); return; } redraw(); }

// 5. Continent hunt
function bodyKita() {
  if (G.over) return gameOver("Continent Hunt", ['You placed <b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> countries on the right continent.']);
  var c = G.list[G.i];
  return '<div class="card stack">' + gameHead("Continent Hunt") +
    '<div class="hud"><span>Country <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Score <b>' + G.score + '</b></span></div>' +
    '<div class="target" style="font-size:2.6rem">' + c[0] + '</div>' +
    (G.ans != null ? '<div class="fb" style="text-align:center">' + (G.ans === c[2] ? '<span class="ok">Correct.</span> ' : '<span class="no">Wrong.</span> ') + '<b>' + c[1] + '</b> ' + (c[2] === "as" ? "is in Asia." : "is in Africa.") + '</div><div style="text-align:center"><button class="btn solid" data-gkn="1" id="g-next">' + (G.i + 1 < G.list.length ? "Next" : "See result") + '</button></div>' :
      '<div class="big2"><button style="--role:var(--mub)" data-gk="as"><span class="ar">آسِيَا</span>Asia</button><button style="--role:var(--fail)" data-gk="af"><span class="ar">إِفْرِيقِيَا</span>Africa</button></div>') + '</div>';
}
function kitaPick(v) { if (!G || G.ans != null) return; G.ans = v; if (v === G.list[G.i][2]) { G.ok++; G.score += 10; beep("ok"); } else beep("no"); redraw(); var nb = document.getElementById("g-next"); if (nb) nb.focus({ preventScroll: true }); }
function kitaNext() { G.i++; G.ans = null; if (G.i >= G.list.length) { G.stars = G.ok >= 11 ? 3 : G.ok >= 8 ? 2 : 1; endGame(G.score); return; } redraw(); }

main.addEventListener("click", function (ev) {
  var b = ev.target.closest("button"); if (!b) return;
  var d = b.dataset;
  if (d.gstart) { startGame(d.gstart); window.scrollTo({ top: 0 }); }
  else if (d.gmenu) { stopGame(); redraw(); }
  else if (!G) return;
  else if (d.gp) hizPick(d.gp);
  else if (d.gpl != null) { G.line.push(+d.gpl); G.res = null; beep("tick"); redraw(); }
  else if (d.gun != null) { G.line.splice(+d.gun, 1); G.res = null; redraw(); }
  else if (d.gtc) trenCheck(false);
  else if (d.gts) trenCheck(true);
  else if (d.gu != null) uyumPick(+d.gu);
  else if (d.gnext) uyumNext();
  else if (d.gi != null) irabPick(+d.gi);
  else if (d.gin) irabNext();
  else if (d.gk) kitaPick(d.gk);
  else if (d.gkn) kitaNext();
});
document.addEventListener("keydown", function (ev) {
  if (ST.tab !== "oyun" || !G || G.over || G.id !== "hiz") return;
  if (ev.key === "1") { ev.preventDefault(); hizPick("i"); }
  if (ev.key === "2") { ev.preventDefault(); hizPick("f"); }
});
