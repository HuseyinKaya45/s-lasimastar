// ---------- oyunlar ----------
var HAL_TR = { ref: "Merfû", nasb: "Mansûb", cezm: "Meczûm" };
var POOL = CZ_POOL.map(function (p) {
  var m = /\{([^}]+)\}/.exec(p[0]);
  return { pre: p[0].slice(0, m.index), post: p[0].slice(m.index + m[0].length), w: m[1], forms: p[1], c: p[2], role: p[3], tr: p[4], topic: p[5] };
});
function poolHtml(it, mode) { return it.pre + (mode === "blank" ? '<span class="blank">&nbsp;</span>' : '<b class="hl">' + it.w + '</b>') + it.post; }
function why(it) { return '<span class="ar">' + it.w + '</span>: ' + arWrap(it.role) + ' → <b>' + HAL_TR[it.c] + '</b>'; }
var EDAT_G = [["nasb", "Nasb (fetha)", "نَصْبٌ", "nasb"], ["cezm", "Cezm (sükûn)", "جَزْمٌ", "cerr"], ["ref", "Etkisiz (damme)", "رَفْعٌ", "ref"]];
var LEM_G = [["lam", "لَمْ + sükûn", "لَمْ", "cerr"], ["lan", "لَنْ + fetha", "لَنْ", "nasb"]];

var GAMES = {
  avci: { name: "Doğru Son", ico: "يَكْتُبُ · يَكْتُبَ · يَكْتُبْ", col: "cerr", d: "12 cümle. Fiilin sonunu seç: damme mi, fetha mı, sükûn mu? Edatı ve anlamı düşün." },
  hal: { name: "Üç Hal Yarışı", ico: "مَرْفُوعٌ · مَنْصُوبٌ · مَجْزُومٌ", col: "ref", d: "60 saniye. Altı çizili fiil merfû mu, mansûb mu, meczûm mu?" },
  edat: { name: "Edat Dedektifi", ico: "لِيَذْهَب ؟", col: "mz", d: "60 saniye. Aynı Arapça, farklı anlam! Türkçeye bak: bu edat nasb mı eder, cezm mi, yoksa etkisiz mi?" },
  lem: { name: "لَمْ mi, لَنْ mi?", ico: "لَمْ ؟ لَنْ", col: "nasb", d: "60 saniye. Türkçe cümle geçmiş mi, gelecek mi? Doğru olumsuzluk edatını seç." },
  hafiza: { name: "Hafıza Kartları", ico: "لَمْ ↔ -medi", col: "mi", d: "Kartları çevir, eşleri bul: edat ile anlamı ya da merfû ile meczûm şekli." }
};
var G = null, GT = null;
function stopGame() { if (GT) { clearInterval(GT); GT = null; } G = null; }
function renderGames() {
  if (G) return '<section class="panel">' + gameBody() + '</section>';
  var best = store.get("gbest", {});
  return '<section class="panel"><div class="card stack"><div class="lbl">Oyunlar</div><h2>Oynayarak pekiştir</h2><p class="muted">Her oyun cezmin bir kuralını çalıştırır ve rütbe puanı kazandırır.</p><div class="row-btns"><button class="btn small" data-snd="1">Ses: ' + (SND.on ? "açık" : "kapalı") + '</button></div></div>' +
    '<div class="game-menu">' + Object.keys(GAMES).map(function (k) {
      var g = GAMES[k];
      return '<div class="card game-card" style="--role:var(--' + g.col + ')"><div class="ico">' + g.ico + '</div><h3>' + g.name + '</h3><p class="muted">' + g.d + '</p><p class="muted" style="margin-top:auto">' + (best[k] != null ? 'En iyi: <b class="tabular">' + best[k] + '</b>' : 'Henüz oynanmadı') + '</p>' +
        (k === "hafiza" ? '<div class="row-btns">' + Object.keys(HAFIZA).map(function (dk) { return '<button class="btn solid small" data-gstart="hafiza" data-deck="' + dk + '" style="--accent:var(--' + g.col + ')">' + HAFIZA[dk].name + '</button>'; }).join("") + '</div>' :
          '<button class="btn solid" data-gstart="' + k + '" style="--accent:var(--' + g.col + ')">Oyna</button>') + '</div>';
    }).join("") + '</div></section>';
}
function gameHead(t) { return '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="lbl">Oyun</div><h2>' + t + '</h2></div><button class="btn small" data-gmenu="1">Oyunlara dön</button></div>'; }
function redraw() { main.innerHTML = renderGames(); }
var SPEED = { hal: { opts: HAL_OPTS, keys: "1 Merfû · 2 Mansûb · 3 Meczûm" }, edat: { opts: EDAT_G, keys: "1 Nasb · 2 Cezm · 3 Etkisiz" }, lem: { opts: LEM_G, keys: "1 لَمْ · 2 لَنْ" } };
function startGame(k, deck) {
  stopGame();
  G = { id: k, score: 0, n: 0, ok: 0, over: false, start: Date.now(), combo: 0, maxCombo: 0 };
  if (k === "avci") { G.list = shuffle(POOL).slice(0, 12); G.i = 0; G.list.forEach(function (it) { it.opts = shuffle(it.forms); }); }
  if (SPEED[k]) { G.t = 60; G.opts = SPEED[k].opts; nextSpeed(); }
  if (k === "hafiza") { var ps = shuffle(HAFIZA[deck].pairs).slice(0, 6), cards = []; ps.forEach(function (p, i) { cards.push({ p: i, t: p[0] }); cards.push({ p: i, t: p[1] }); }); G.deck = deck; G.cards = shuffle(cards); G.open = []; G.done = {}; G.moves = 0; G.pairs = 6; }
  ST.tab = "oyun"; document.querySelectorAll("nav.tabs button").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.tab === "oyun" ? "true" : "false"); });
  redraw();
  if (SPEED[k]) GT = setInterval(function () {
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
  G.xp = Math.round(score / (SPEED[G.id] ? 5 : 2));
  redraw(); addXP(G.xp); beep("win"); if (G.record || G.stars === 3) confetti();
}
function gameOver(t, lines) {
  return '<div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">' + t + ' bitti</div>' + (G.stars != null ? starsHtml(G.stars) : '') + '<div class="score-big tabular">' + G.final + '</div>' + (G.record ? '<p><b>Yeni rekor!</b></p>' : '') + lines.map(function (l) { return '<p>' + l + '</p>'; }).join("") +
    '<p class="muted">Kazandığın: +' + G.xp + ' rütbe puanı</p><div class="row-btns" style="justify-content:center"><button class="btn solid" data-gstart="' + G.id + '"' + (G.deck ? ' data-deck="' + G.deck + '"' : '') + '>Tekrar oyna</button><button class="btn" data-gmenu="1">Başka oyun</button></div></div>';
}
function gameBody() { return { avci: bodyAvci, hal: bodySpeed, edat: bodySpeed, lem: bodySpeed, hafiza: bodyHaf }[G.id](); }
function starsBy(ok, n) { return ok >= n - 1 ? 3 : ok >= Math.ceil(n * 0.66) ? 2 : 1; }

// doğru şekil
function bodyAvci() {
  if (G.over) return gameOver("Doğru Son", ['<b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> doğru.']);
  var it = G.list[G.i], done = G.ans != null;
  return '<div class="card stack">' + gameHead("Doğru Son") + '<div class="hud"><span>Cümle <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
    '<div class="target">' + (done ? poolHtml(it) : poolHtml(it, "blank")) + '</div>' +
    (done ? '<div class="fb" style="text-align:center">' + (G.ans === it.w ? '<span class="ok">Doğru! +10</span> ' : '<span class="no">Yanlış.</span> Doğrusu: <span class="ar">' + it.w + '</span>. ') + '<br>' + why(it) + '</div>' + (ST.tr ? '<p class="trline" style="text-align:center">' + it.tr + '</p>' : '') +
      '<div style="text-align:center"><button class="btn solid" data-gnext="1" id="g-next">' + (G.i + 1 < G.list.length ? "Sonraki" : "Sonucu gör") + '</button></div>' :
      '<p class="muted" style="text-align:center">Fiilin doğru sonu hangisi?</p><div class="big3">' + it.opts.map(function (f) { return '<button data-ga="' + f + '">' + f + '</button>'; }).join("") + '</div>') + '</div>';
}
// hız oyunları: hal yarışı ve doğru/yanlış
function nextSpeed() {
  var g = 0, it;
  if (G.id === "hal") { do { it = pick(POOL); g++; } while (G.cur && it.w === G.cur.w && g < 10); G.cur = { w: it.w, html: poolHtml(it), a: it.c, fb: why(it) }; }
  else if (G.id === "edat") { do { it = pick(EDAT_POOL); g++; } while (G.cur && it[0] + it[1] === G.cur.w && g < 10); var e = EDAT_G.filter(function (x) { return x[0] === it[2]; })[0]; G.cur = { w: it[0] + it[1], html: it[0] + '<div class="muted" style="font-family:var(--f-body);font-size:1.1rem;direction:ltr">' + it[1] + '</div>', a: it[2], fb: '<span class="ar">' + it[0] + '</span> (' + it[1] + ') → ' + e[1] }; }
  else { do { it = pick(LEM_POOL); g++; } while (G.cur && it[0] === G.cur.w && g < 10); G.cur = { w: it[0], html: '<span style="font-family:var(--f-body);direction:ltr;display:block;font-size:1.4rem">' + it[0] + '</span>', a: it[1], fb: it[0] + ' → <span class="ar">' + it[2] + '</span>' }; }
}
function bodySpeed() {
  var title = GAMES[G.id].name;
  if (G.over) return gameOver(title, ['Doğru: <b class="tabular">' + G.ok + ' / ' + G.n + '</b> · en uzun seri: <b class="tabular">' + G.maxCombo + '</b>']);
  return '<div class="card stack">' + gameHead(title) +
    '<div class="hud"><span>Süre <b id="g-time">' + G.t + '</b></span><span>Puan <b id="g-score">' + G.score + '</b></span><span>Çarpan <b id="g-combo">x' + Math.min(5, 1 + Math.floor(G.combo / 3)) + '</b></span></div>' +
    '<div class="time-bar' + (G.t <= 10 ? " low" : "") + '" id="g-tbar"><div style="width:' + (G.t / 60 * 100) + '%"></div></div>' +
    '<div class="target" id="g-target">' + G.cur.html + '</div><div class="gfb" id="g-fb"><span class="muted">Klavye: ' + SPEED[G.id].keys + '</span></div>' +
    '<div class="big5">' + G.opts.map(function (o, i) { return '<button style="--role:var(--' + o[3] + ')" data-gs="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '<small>' + (i + 1) + '</small></button>'; }).join("") + '</div></div>';
}
function speedPick(v) {
  if (!G || G.over || G.lock) return;
  var c = G.cur, ok = c.a === v, tg = document.getElementById("g-target"), fb = document.getElementById("g-fb");
  G.n++;
  if (ok) {
    G.ok++; G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo);
    var m = Math.min(5, 1 + Math.floor((G.combo - 1) / 3)); G.score += 10 * m; beep("ok");
    fb.innerHTML = '<b style="color:var(--good)">Doğru +' + 10 * m + '</b> · önceki: ' + c.fb;
    tg.classList.remove("flash-no"); tg.classList.add("flash-ok"); nextSpeed(); tg.innerHTML = G.cur.html;
    setTimeout(function () { tg.classList.remove("flash-ok"); }, 180);
  } else {
    G.combo = 0; G.t = Math.max(0, G.t - 3); beep("no"); G.lock = true;
    fb.innerHTML = '<b style="color:var(--bad)">Yanlış, −3 sn.</b> ' + c.fb;
    void tg.offsetWidth; tg.classList.add("flash-no");
    setTimeout(function () { if (!G || G.over) return; G.lock = false; tg.classList.remove("flash-no"); nextSpeed(); tg.innerHTML = G.cur.html; fb.innerHTML = '<span class="muted">Klavye: ' + SPEED[G.id].keys + '</span>'; if (G.t <= 0) endGame(G.score); }, 1800);
  }
  hud();
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
var TOPIC = { u1: "Cezm edatları", u2: "لَمْ · لَنْ", u3: "لَا · لِـ", u4: "Nasb mı cezm mi", u5: "Kur'an ve okuma" };
var TK = ["u1", "u2", "u3", "u4", "u5"];
var Q = null, QT = null;
function stopQuiz() { if (QT) { clearInterval(QT); QT = null; } if (Q && !Q.done) Q = null; }
function quizBank() {
  var bank = { u1: [], u2: [], u3: [], u4: [], u5: [] };
  UNITS.forEach(function (u) {
    u.ex.forEach(function (ex) {
      expand(ex).forEach(function (it) {
        if (it.kind === "pick") bank[u.id].push({ inst: ex.tr.split(".")[0] + ".", q: it.q.replace("___", "……"), o: it.o.slice(), a: it.o[it.a], why: it.why || "", tr: it.tr || "" });
        if (it.kind === "classify") bank[u.id].push({ inst: "Bu kelimenin türü ne?", q: it.s, o: ex.opts.map(function (x) { return x[1]; }), a: ex.opts.filter(function (x) { return x[0] === it.a; })[0][1], why: it.why || "", tr: it.tr || "" });
        if (it.kind === "irab") bank[u.id].push({ inst: "Altı çizili kelimenin hali ne?", q: it.s.replace(/\[(.+?)\]/, '<b class="hl">$1</b>'), o: ["Merfû", "Mansûb", "Meczûm"], a: HAL_TR[it.c], why: it.why || "", tr: it.tr || "" });
      });
    });
  });
  POOL.forEach(function (p) {
    bank[p.topic].push({ inst: "Fiilin doğru şekli hangisi?", q: poolHtml(p, "blank"), o: p.forms.slice(), a: p.w, why: why(p), tr: p.tr });
  });
  EDAT_POOL.forEach(function (d) { bank[/emir|için/.test(d[1]) ? "u3" : "u4"].push({ inst: "Bu anlamda edat nasb mı eder, cezm mi? (" + d[1] + ")", q: d[0], o: ["Nasb", "Cezm", "Etkisiz"], a: { nasb: "Nasb", cezm: "Cezm", ref: "Etkisiz" }[d[2]], why: "" }); });
  LEM_POOL.forEach(function (l) { bank.u2.push({ inst: "Türkçeye uyan olumsuzluk: " + l[0], q: "", o: ["لَمْ + sükûn", "لَنْ + fetha"], a: l[1] === "lam" ? "لَمْ + sükûn" : "لَنْ + fetha", why: '<span class="ar">' + l[2] + '</span>' }); });
  return bank;
}
function startQuiz() {
  var bank = quizBank(), qs = [];
  TK.forEach(function (k) {
    var seen = {}, got = 0;
    shuffle(bank[k]).forEach(function (q) { var sig = q.q.replace(/<[^>]+>/g, ""); if (got >= 4 || seen[sig]) return; seen[sig] = 1; got++; q.topic = k; q.o = shuffle(q.o); qs.push(q); });
  });
  Q = { qs: shuffle(qs), i: 0, ans: [], start: Date.now(), done: false };
  main.innerHTML = renderQuiz();
  QT = setInterval(function () { var el = document.getElementById("qz-clock"); if (el && Q && !Q.done) { var s = Math.floor((Date.now() - Q.start) / 1000); el.textContent = Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); } }, 1000);
}
function renderQuiz() {
  var best = store.get("qbest", null);
  if (!Q) return '<section class="panel"><div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">Quiz provası</div><h2>Gerçek quiz gibi: 20 soru</h2>' +
    '<p class="muted" style="max-width:60ch">Beş konudan dörder soru gelir: doğru son, لَمْ-لَنْ, iki لِـ ve iki لَا, nasb-cezm ayırma. Cevaplar sonda gösterilir. Sonunda konu konu puanını ve yanlışlarının açıklamasını görürsün. Her denemede sorular değişir.</p>' +
    (best != null ? '<p>En iyi sonucun: <b class="tabular">' + best + ' / 20</b></p>' : '') + '<button class="btn solid" data-qstart="1">Provayı başlat</button></div></section>';
  if (Q.done) {
    var by = {}; Q.qs.forEach(function (q, i) { by[q.topic] = by[q.topic] || [0, 0]; by[q.topic][1]++; if (Q.ans[i] === q.a) by[q.topic][0]++; });
    var tot = Q.qs.filter(function (q, i) { return Q.ans[i] === q.a; }).length;
    var col = { u1: "mz", u2: "cerr", u3: "ref", u4: "nasb", u5: "mi" };
    var weak = Object.keys(by).filter(function (k) { return by[k][0] / by[k][1] < 0.8; });
    return '<section class="panel"><div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">Quiz provası bitti · ' + Q.time + '</div>' + starsHtml(tot >= 18 ? 3 : tot >= 14 ? 2 : 1) + '<div class="score-big tabular">' + tot + ' / 20</div>' +
      '<p>' + (tot >= 18 ? "Konuya hâkimsin. Aferin!" : tot >= 14 ? "İyi gidiyorsun. Aşağıdaki zayıf konuya bir kez daha bak." : "Önce Özet'teki i'rab makinesiyle çalış, zayıf konunun alıştırmalarını çöz, sonra provayı tekrarla.") + '</p>' +
      '<div class="qz-bars">' + TK.map(function (k) { var v = by[k] || [0, 4]; return '<div class="qz-bar" style="--role:var(--' + col[k] + ')"><span>' + TOPIC[k] + '</span><div class="tr2"><div style="width:' + (v[0] / v[1] * 100) + '%"></div></div><b class="tabular">' + v[0] + '/' + v[1] + '</b></div>'; }).join("") + '</div>' +
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
  else if (d.gnext) { G.i++; G.ans = null; if (G.i >= G.list.length) { G.stars = starsBy(G.ok, G.list.length); endGame(G.score); } else redraw(); }
  else if (d.gc != null) flip(+d.gc);
});
document.addEventListener("keydown", function (ev) {
  if (ST.tab !== "oyun" || !G || G.over || !SPEED[G.id]) return;
  var i = ["1", "2", "3"].indexOf(ev.key); if (i >= 0 && i < G.opts.length) { ev.preventDefault(); speedPick(G.opts[i][0]); }
});
