// ---------- oyunlar ----------
var CEM5 = [["muf", "Müfred", "مُفْرَدٌ", "muf"], ["mus", "Müsennâ", "مُثَنًّى", "mus"], ["mzs", "Cem-i müz. sâlim", "جَمْعُ مُذَكَّرٍ سَالِمٌ", "muz"], ["mns", "Cem-i müe. sâlim", "جَمْعُ مُؤَنَّثٍ سَالِمٌ", "mun"], ["tks", "Cem-i teksîr", "جَمْعُ تَكْسِيرٍ", "cem"]];
var SAYI_WHY = { muf: "Tek bir şeyi gösterir.", mus: "Sonunda ـانِ / ـَيْنِ var: iki.", mzs: "Sonunda ـُونَ / ـِينَ var.", mns: "ة yerine ـَاتٌ gelmiş.", tks: "Tekilin kalıbı kırılmış." };
var MARIFE_NAMES = { zamir: "zamir", isaret: "ism-i işaret", mevsul: "ism-i mevsûl", alem: "alem (özel isim)", al: "ال ile marife", izafet: "marifeye muzâf (izafet)" };
function wordPool(roles) {
  var out = [], seen = {};
  UNITS.forEach(function (u) {
    u.ex.forEach(function (ex) {
      if (ex.type !== "tag" || roles.indexOf(ex.roles[0]) < 0) return;
      ex.items.forEach(function (it) { chunks(it.c).forEach(function (c) { if (roles.indexOf(c.r) >= 0 && !seen[c.t]) { seen[c.t] = 1; out.push([c.t, c.r, ""]); } }); });
    });
  });
  return out;
}
var GAMES = {
  ayikla: { name: "Kelime Ayıklama", ico: "اسْمٌ · فِعْلٌ · حَرْفٌ", col: "ism", d: "60 saniye. Kelime isim mi, fiil mi, harf mi? Hızlı ve doğru seç; seri yaptıkça puan katlanır." },
  cins: { name: "Cinsiyet Kapısı", ico: "ة · ى · اء", col: "mun", d: "60 saniye. İsim müzekker mi, müennes mi? Tuzaklara dikkat: الغَدَاءُ، الشَّمْسُ…" },
  sayi: { name: "Sayı Makinesi", ico: "ـانِ · ـُونَ · ـَاتٌ", col: "cem", d: "12 kelime. Müfred mi, müsennâ mı, yoksa hangi cem türü?" },
  dedektif: { name: "Marife Dedektifi", ico: "النَّكِرَةُ ؟ المَعْرِفَةُ", col: "mar", d: "12 isim. Önce nekire mi marife mi karar ver; marifeyse türünü bularak bonus kazan." },
  hafiza: { name: "Hafıza Kartları", ico: "كِتَابٌ ↔ كُتُبٌ", col: "muf", d: "Kartları çevir, eşleri bul: tekil ile çoğulu ya da erkek ile dişiyi." }
};
var G = null, GT = null;
function stopGame() { if (GT) { clearInterval(GT); GT = null; } G = null; }
function renderGames() {
  if (G) return '<section class="panel">' + gameBody() + '</section>';
  var best = store.get("gbest", {});
  return '<section class="panel"><div class="card stack"><div class="lbl">Oyunlar</div><h2>Oynayarak pekiştir</h2><p class="muted">Her oyun quizde çıkacak türden bir beceriyi çalıştırır ve rütbe puanı kazandırır.</p><div class="row-btns"><button class="btn small" data-snd="1">Ses: ' + (SND.on ? "açık" : "kapalı") + '</button></div></div>' +
    '<div class="game-menu">' + Object.keys(GAMES).map(function (k) {
      var g = GAMES[k];
      return '<div class="card game-card" style="--role:var(--' + g.col + ')"><div class="ico">' + g.ico + '</div><h3>' + g.name + '</h3><p class="muted">' + g.d + '</p><p class="muted" style="margin-top:auto">' + (best[k] != null ? 'En iyi: <b class="tabular">' + best[k] + '</b>' : 'Henüz oynanmadı') + '</p>' +
        (k === "hafiza" ? '<div class="row-btns">' + Object.keys(HAFIZA).map(function (dk) { return '<button class="btn solid small" data-gstart="hafiza" data-deck="' + dk + '" style="--accent:var(--' + g.col + ')">' + HAFIZA[dk].name + '</button>'; }).join("") + '</div>' :
          '<button class="btn solid" data-gstart="' + k + '" style="--accent:var(--' + g.col + ')">Oyna</button>') + '</div>';
    }).join("") + '</div></section>';
}
function gameHead(t) { return '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="lbl">Oyun</div><h2>' + t + '</h2></div><button class="btn small" data-gmenu="1">Oyunlara dön</button></div>'; }
function redraw() { main.innerHTML = renderGames(); }
function startGame(k, deck) {
  stopGame();
  G = { id: k, score: 0, n: 0, ok: 0, over: false, start: Date.now(), combo: 0, maxCombo: 0 };
  if (k === "ayikla") { G.pool = KELIME_POOL.map(function (x) { return [x[0], x[1], ""]; }).concat(wordPool(["ism", "fiil", "harf"])); G.opts = [["ism", "İsim", "اسْمٌ", "ism"], ["fiil", "Fiil", "فِعْلٌ", "fiil"], ["harf", "Harf", "حَرْفٌ", "harf"]]; G.t = 60; nextSpeed(); }
  if (k === "cins") { G.pool = CINS_POOL.concat(wordPool(["muz", "mun"])); G.opts = [["muz", "Müzekker", "مُذَكَّرٌ", "muz"], ["mun", "Müennes", "مُؤَنَّثٌ", "mun"]]; G.t = 60; nextSpeed(); }
  if (k === "sayi") { G.list = shuffle(SAYI_POOL).slice(0, 12); G.i = 0; }
  if (k === "dedektif") { G.list = shuffle(MARIFE_POOL).slice(0, 12); G.i = 0; G.step = 1; }
  if (k === "hafiza") { var ps = shuffle(HAFIZA[deck].pairs).slice(0, 6), cards = []; ps.forEach(function (p, i) { cards.push({ p: i, t: p[0] }); cards.push({ p: i, t: p[1] }); }); G.deck = deck; G.cards = shuffle(cards); G.open = []; G.done = {}; G.moves = 0; G.pairs = 6; }
  ST.tab = "oyun"; document.querySelectorAll("nav.tabs button").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.tab === "oyun" ? "true" : "false"); });
  redraw();
  if (k === "ayikla" || k === "cins") GT = setInterval(function () {
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
  G.xp = Math.round(score / (G.id === "ayikla" || G.id === "cins" ? 5 : 2));
  redraw(); addXP(G.xp); beep("win"); if (G.record || G.stars === 3) confetti();
}
function gameOver(t, lines) {
  return '<div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">' + t + ' bitti</div>' + (G.stars != null ? starsHtml(G.stars) : '') + '<div class="score-big tabular">' + G.final + '</div>' + (G.record ? '<p><b>Yeni rekor!</b></p>' : '') + lines.map(function (l) { return '<p>' + l + '</p>'; }).join("") +
    '<p class="muted">Kazandığın: +' + G.xp + ' rütbe puanı</p><div class="row-btns" style="justify-content:center"><button class="btn solid" data-gstart="' + G.id + '"' + (G.deck ? ' data-deck="' + G.deck + '"' : '') + '>Tekrar oyna</button><button class="btn" data-gmenu="1">Başka oyun</button></div></div>';
}
function gameBody() { return { ayikla: bodySpeed, cins: bodySpeed, sayi: bodySayi, dedektif: bodyDed, hafiza: bodyHaf }[G.id](); }

// hız oyunları (ayıklama, cinsiyet)
function nextSpeed() { var it, g = 0; do { it = pick(G.pool); g++; } while (G.cur && it[0] === G.cur[0] && g < 10); G.cur = it; }
function bodySpeed() {
  var title = GAMES[G.id].name;
  if (G.over) return gameOver(title, ['Doğru: <b class="tabular">' + G.ok + ' / ' + G.n + '</b> · en uzun seri: <b class="tabular">' + G.maxCombo + '</b>']);
  return '<div class="card stack">' + gameHead(title) +
    '<div class="hud"><span>Süre <b id="g-time">' + G.t + '</b></span><span>Puan <b id="g-score">' + G.score + '</b></span><span>Çarpan <b id="g-combo">x' + Math.min(5, 1 + Math.floor(G.combo / 3)) + '</b></span></div>' +
    '<div class="time-bar' + (G.t <= 10 ? " low" : "") + '" id="g-tbar"><div style="width:' + (G.t / 60 * 100) + '%"></div></div>' +
    '<div class="target" id="g-target" style="font-size:clamp(2.4rem,9vw,3.4rem)">' + G.cur[0] + '</div><div class="gfb" id="g-fb"><span class="muted">Klavye: ' + G.opts.map(function (o, i) { return (i + 1) + " " + o[1]; }).join(" · ") + '</span></div>' +
    '<div class="big5">' + G.opts.map(function (o, i) { return '<button style="--role:var(--' + o[3] + ')" data-gs="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '<small>' + (i + 1) + '</small></button>'; }).join("") + '</div></div>';
}
function speedPick(v) {
  if (!G || G.over || G.lock) return;
  var c = G.cur, ok = c[1] === v, tg = document.getElementById("g-target"), fb = document.getElementById("g-fb");
  var label = G.opts.filter(function (o) { return o[0] === c[1]; })[0][1];
  G.n++;
  if (ok) {
    G.ok++; G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo);
    var m = Math.min(5, 1 + Math.floor((G.combo - 1) / 3)); G.score += 10 * m; beep("ok");
    fb.innerHTML = '<b style="color:var(--good)">Doğru +' + 10 * m + '</b> · önceki: <span class="ar">' + c[0] + '</span> = ' + label + (c[2] ? ' (' + c[2] + ')' : '');
    tg.classList.remove("flash-no"); tg.classList.add("flash-ok"); nextSpeed(); tg.textContent = G.cur[0];
    setTimeout(function () { tg.classList.remove("flash-ok"); }, 180);
  } else {
    G.combo = 0; G.t = Math.max(0, G.t - 3); beep("no"); G.lock = true;
    fb.innerHTML = '<b style="color:var(--bad)">Yanlış, −3 sn.</b> <span class="ar">' + c[0] + '</span> = <b>' + label + '</b>' + (c[2] ? ' · ' + c[2] : '');
    void tg.offsetWidth; tg.classList.add("flash-no");
    setTimeout(function () { if (!G || G.over) return; G.lock = false; tg.classList.remove("flash-no"); nextSpeed(); tg.textContent = G.cur[0]; if (G.t <= 0) endGame(G.score); }, 1300);
  }
  hud();
}

// sayı makinesi
function bodySayi() {
  if (G.over) return gameOver("Sayı Makinesi", ['<b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> doğru.']);
  var c = G.list[G.i];
  return '<div class="card stack">' + gameHead("Sayı Makinesi") + '<div class="hud"><span>Kelime <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
    '<div class="target" style="font-size:clamp(2.4rem,9vw,3.4rem)">' + c[0] + '</div>' +
    (G.ans != null ? '<div class="fb" style="text-align:center">' + (G.ans === c[1] ? '<span class="ok">Doğru.</span> ' : '<span class="no">Yanlış.</span> Doğrusu: <b>' + CEM5.filter(function (o) { return o[0] === c[1]; })[0][1] + '</b>. ') + SAYI_WHY[c[1]] + '</div><div style="text-align:center"><button class="btn solid" data-gnext="1" id="g-next">' + (G.i + 1 < G.list.length ? "Sonraki" : "Sonucu gör") + '</button></div>' :
      '<div class="big5">' + CEM5.map(function (o) { return '<button style="--role:var(--' + o[3] + ')" data-gn="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '</button>'; }).join("") + '</div>') + '</div>';
}
// marife dedektifi
function bodyDed() {
  if (G.over) return gameOver("Marife Dedektifi", ['<b class="tabular">' + G.ok + ' / ' + G.list.length + '</b> doğru karar; bonuslarla birlikte puanın yukarıda.']);
  var c = G.list[G.i], isMar = c[1] !== "nek", fb = "";
  if (G.step === 1) {
    return '<div class="card stack">' + gameHead("Marife Dedektifi") + '<div class="hud"><span>İsim <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="target" style="font-size:clamp(2.2rem,8vw,3.2rem)">' + c[0] + '</div><p class="muted" style="text-align:center">Bu isim belirsiz mi, belli mi?</p>' +
      '<div class="big2"><button style="--role:var(--nek)" data-gd="nek"><span class="ar">نَكِرَةٌ</span>Nekire</button><button style="--role:var(--mar)" data-gd="mar"><span class="ar">مَعْرِفَةٌ</span>Marife</button></div></div>';
  }
  if (G.step === 2) {
    return '<div class="card stack">' + gameHead("Marife Dedektifi") + '<div class="hud"><span>İsim <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
      '<div class="target" style="font-size:clamp(2.2rem,8vw,3.2rem)">' + c[0] + '</div><div class="fb" style="text-align:center"><span class="ok">Evet, marife! +10</span> Bonus soru: hangi türden? (+5)</div>' +
      '<div class="big5">' + MARIFE_OPTS.map(function (o) { return '<button style="--role:var(--mar)" data-gt="' + o[0] + '"><span class="ar">' + o[2] + '</span>' + o[1] + '</button>'; }).join("") + '</div></div>';
  }
  if (G.res1 === false) fb = '<span class="no">Yanlış.</span> <span class="ar">' + c[0] + '</span> ' + (isMar ? '<b>marifedir</b> (' + MARIFE_NAMES[c[1]] + ').' : '<b>nekiredir</b>: belirsiz bir şeyi gösterir.');
  else if (!isMar) fb = '<span class="ok">Doğru.</span> Belirsiz: nekire.';
  else fb = (G.res2 ? '<span class="ok">Tür de doğru!</span> ' : '<span class="no">Tür yanlış.</span> ') + 'Bu bir ' + MARIFE_NAMES[c[1]] + '.';
  return '<div class="card stack">' + gameHead("Marife Dedektifi") + '<div class="hud"><span>İsim <b>' + (G.i + 1) + '/' + G.list.length + '</b></span><span>Puan <b>' + G.score + '</b></span></div>' +
    '<div class="target" style="font-size:clamp(2.2rem,8vw,3.2rem)">' + c[0] + '</div><div class="fb" style="text-align:center">' + fb + '</div><div style="text-align:center"><button class="btn solid" data-gdn="1" id="g-next">' + (G.i + 1 < G.list.length ? "Sonraki" : "Sonucu gör") + '</button></div></div>';
}
// hafıza
function bodyHaf() {
  if (G.over) return gameOver("Hafıza Kartları", ['<b class="tabular">' + G.moves + '</b> hamlede, <b class="tabular">' + G.secs + '</b> saniyede bitirdin.']);
  return '<div class="card stack">' + gameHead("Hafıza Kartları · " + HAFIZA[G.deck].name) +
    '<div class="hud"><span>Hamle <b id="g-moves">' + G.moves + '</b></span><span>Çift <b id="g-pairs">' + Object.keys(G.done).length + '/' + G.pairs + '</b></span><span>Süre <b id="g-clock">0 sn</b></span></div>' +
    '<div class="mem">' + G.cards.map(function (c, i) { return '<button class="mcard' + (G.done[c.p] ? " done" : "") + '" data-gc="' + i + '" aria-label="Kart ' + (i + 1) + '"><div class="in"><div class="face back">؟</div><div class="face front">' + c.t + '</div></div></button>'; }).join("") + '</div></div>';
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
var TOPIC = { u1: "Kelimenin kısımları", u2: "Müzekker–müennes", u3: "Müfred–müsennâ–cem", u4: "Nekire–marife" };
var Q = null, QT = null;
function stopQuiz() { if (QT) { clearInterval(QT); QT = null; } if (Q && !Q.done) Q = null; }
function quizBank() {
  var bank = { u1: [], u2: [], u3: [], u4: [] };
  UNITS.forEach(function (u) {
    u.ex.forEach(function (ex) {
      var inst = ex.tr;
      expand(ex).forEach(function (it) {
        if (it.kind === "pick") bank[u.id].push({ inst: inst, q: it.q ? (ex.fill ? it.q.replace("___", "……") : it.q) : "", o: it.o.slice(), a: typeof it.a === "number" ? it.o[it.a] : it.a, why: it.why || "", tr: typeof it.tr === "string" ? it.tr : "" });
        if (it.kind === "classify") { var op = it.opts || ex.opts; bank[u.id].push({ inst: inst, q: it.s, o: op.map(function (x) { return x[1]; }), a: op.filter(function (x) { return x[0] === it.a; })[0][1], why: it.why || "", tr: it.tr || "" }); }
      });
    });
  });
  KELIME_POOL.forEach(function (w) { bank.u1.push({ inst: "Bu kelime isim mi, fiil mi, harf mi?", q: w[0], o: ["İsim", "Fiil", "Harf"], a: { ism: "İsim", fiil: "Fiil", harf: "Harf" }[w[1]], why: "" }); });
  CINS_POOL.forEach(function (w) { bank.u2.push({ inst: "Bu isim müzekker mi, müennes mi?", q: w[0], o: ["Müzekker", "Müennes"], a: w[1] === "muz" ? "Müzekker" : "Müennes", why: w[2] }); });
  SAYI_POOL.forEach(function (w) { bank.u3.push({ inst: "Bu isim sayı bakımından nedir?", q: w[0], o: CEM5.map(function (x) { return x[1]; }), a: CEM5.filter(function (x) { return x[0] === w[1]; })[0][1], why: SAYI_WHY[w[1]] }); });
  MARIFE_POOL.forEach(function (w) {
    if (w[1] === "nek") bank.u4.push({ inst: "Bu isim nekire mi, marife mi?", q: w[0], o: ["Nekire", "Marife"], a: "Nekire", why: "Belirsiz bir şeyi gösterir." });
    else bank.u4.push({ inst: "Bu marife hangi türden?", q: w[0], o: MARIFE_OPTS.map(function (x) { return x[1]; }), a: MARIFE_OPTS.filter(function (x) { return x[0] === w[1]; })[0][1], why: "" });
  });
  return bank;
}
function startQuiz() {
  var bank = quizBank(), qs = [];
  ["u1", "u2", "u3", "u4"].forEach(function (k) { shuffle(bank[k]).slice(0, 5).forEach(function (q) { q.topic = k; q.o = shuffle(q.o); qs.push(q); }); });
  Q = { qs: shuffle(qs), i: 0, ans: [], start: Date.now(), done: false };
  main.innerHTML = renderQuiz();
  QT = setInterval(function () { var el = document.getElementById("qz-clock"); if (el && Q && !Q.done) { var s = Math.floor((Date.now() - Q.start) / 1000); el.textContent = Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); } }, 1000);
}
function renderQuiz() {
  var best = store.get("qbest", null);
  if (!Q) return '<section class="panel"><div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">Quiz provası</div><h2>Gerçek quiz gibi: 20 soru</h2>' +
    '<p class="muted" style="max-width:60ch">Her konudan 5 soru gelir. Cevaplar sonda gösterilir; quizdeki gibi önce hepsini cevapla. Sonunda konu konu puanını ve yanlışlarının açıklamasını görürsün. Her denemede sorular değişir.</p>' +
    (best != null ? '<p>En iyi sonucun: <b class="tabular">' + best + ' / 20</b></p>' : '') + '<button class="btn solid" data-qstart="1">Provayı başlat</button></div></section>';
  if (Q.done) {
    var by = {}; Q.qs.forEach(function (q, i) { by[q.topic] = by[q.topic] || [0, 0]; by[q.topic][1]++; if (Q.ans[i] === q.a) by[q.topic][0]++; });
    var tot = Q.qs.filter(function (q, i) { return Q.ans[i] === q.a; }).length;
    var col = { u1: "ism", u2: "mun", u3: "cem", u4: "mar" };
    var weak = Object.keys(by).filter(function (k) { return by[k][0] / by[k][1] < 0.8; });
    return '<section class="panel"><div class="card stack" style="text-align:center;justify-items:center"><div class="lbl">Quiz provası bitti · ' + Q.time + '</div>' + starsHtml(tot >= 18 ? 3 : tot >= 14 ? 2 : 1) + '<div class="score-big tabular">' + tot + ' / 20</div>' +
      '<p>' + (tot >= 18 ? "Quize hazırsın. Aferin!" : tot >= 14 ? "İyi gidiyorsun. Aşağıdaki zayıf konuya bir kez daha bak." : "Önce Özet sayfasını oku, zayıf konunun alıştırmalarını çöz, sonra provayı tekrarla.") + '</p>' +
      '<div class="qz-bars">' + ["u1", "u2", "u3", "u4"].map(function (k) { var v = by[k] || [0, 5]; return '<div class="qz-bar" style="--role:var(--' + col[k] + ')"><span>' + TOPIC[k] + '</span><div class="tr2"><div style="width:' + (v[0] / v[1] * 100) + '%"></div></div><b class="tabular">' + v[0] + '/' + v[1] + '</b></div>'; }).join("") + '</div>' +
      (weak.length ? '<div class="row-btns" style="justify-content:center">' + weak.map(function (k) { return '<button class="btn small" data-go="' + k + '">' + TOPIC[k] + ' dersine dön</button>'; }).join("") + '</div>' : '') +
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
function arw(t) { return /[\u0600-\u06FF]/.test(t) ? '<span class="ar">' + t + '</span>' : '<b>' + t + '</b>'; }
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
  else if (d.gn) { if (G.ans != null) return; G.ans = d.gn; if (d.gn === G.list[G.i][1]) { G.ok++; G.score += 10; beep("ok"); } else beep("no"); redraw(); }
  else if (d.gnext) { G.i++; G.ans = null; if (G.i >= G.list.length) { G.stars = G.ok >= 11 ? 3 : G.ok >= 8 ? 2 : 1; endGame(G.score); } else redraw(); }
  else if (d.gd) {
    var c = G.list[G.i], isMar = c[1] !== "nek", good = (d.gd === "mar") === isMar;
    if (good) { G.ok++; G.score += 10; beep("ok"); } else beep("no");
    G.res1 = good; G.res2 = null; G.step = good && isMar ? 2 : 3; redraw();
  }
  else if (d.gt) { var cc = G.list[G.i]; G.res2 = d.gt === cc[1]; if (G.res2) { G.score += 5; beep("ok"); } else beep("no"); G.step = 3; redraw(); }
  else if (d.gdn) { G.i++; G.step = 1; if (G.i >= G.list.length) { G.stars = G.ok >= 11 ? 3 : G.ok >= 8 ? 2 : 1; endGame(G.score); } else redraw(); }
  else if (d.gc != null) flip(+d.gc);
});
document.addEventListener("keydown", function (ev) {
  if (ST.tab !== "oyun" || !G || G.over || !G.opts) return;
  var i = ["1", "2", "3"].indexOf(ev.key); if (i >= 0 && i < G.opts.length) { ev.preventDefault(); speedPick(G.opts[i][0]); }
});
