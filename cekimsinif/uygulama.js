(function () {
"use strict";
// ---------- yardımcılar ----------
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
var store = {
  get: function (k, d) { try { var v = localStorage.getItem("cekimsinif:" + k); return v === null ? d : JSON.parse(v); } catch (x) { return d; } },
  set: function (k, v) { try { localStorage.setItem("cekimsinif:" + k, JSON.stringify(v)); } catch (x) {} }
};
var main = document.getElementById("main"), toastEl = document.getElementById("toast"), toastT;
function toast(t) { toastEl.textContent = t; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 1800); }
var SND = { ctx: null, on: store.get("ses", true) };
function beep(type) {
  if (!SND.on) return;
  try {
    SND.ctx = SND.ctx || new (window.AudioContext || window.webkitAudioContext)();
    var c = SND.ctx, notes = type === "ok" ? [660, 880] : type === "win" ? [523, 659, 784, 1046] : type === "end" ? [440, 330] : [220, 160];
    notes.forEach(function (f, i) { var o = c.createOscillator(), g = c.createGain(); o.type = type === "no" ? "sawtooth" : "triangle"; o.frequency.value = f; var t = c.currentTime + i * 0.1; g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.24); });
  } catch (x) {}
}
function say(t) {
  try { if (!window.speechSynthesis) return toast("Bu tarayıcı sesli okuma desteklemiyor."); speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = "ar-SA"; u.rate = 0.8; speechSynthesis.speak(u); } catch (x) {}
}

// ---------- çekim görünümü ----------
var TUR_AD = { m: "Muzâri harfi", z: "Ref zamiri", t: "Te'nîs tâsı (zamir değil)", n: "İ'râb nûnu", s: "Gövde" };
function stemHtml(st, b) {
  var g = harfler(st);
  return g.map(function (x, j) { return j === 1 ? '<span class="ayn" style="--bc:var(--' + BAB[b].col + ')">' + x + '</span>' : x; }).join("");
}
function formHtml(v, mode, i) {
  return '<span class="frm">' + cj(v, mode, i).map(function (p) {
    if (p[1] === "s") return stemHtml(p[0], v.b);
    if (p[1] === "") return p[0];
    return '<span class="k-' + p[1] + '">' + p[0] + '</span>';
  }).join("") + '</span>';
}
function verbHero(v) { return '<span class="vh"><span class="ar">' + stemHtml(v.ms, v.b) + 'َ</span><span class="ar">' + 'يَ' + stemHtml(v.us, v.b) + 'ُ</span></span>'; }
function babTag(b) { var x = BAB[b]; return '<span class="btag" style="--bc:var(--' + x.col + ')">' + x.no + '. bâb · ' + x.ad + ' <span class="ar">' + x.k + '</span></span>'; }
function legend(mode) {
  var it = [["ayn", "Ayn harekesi (bâbı gösterir)"]];
  if (mode !== "m") it.push(["k-m", "Muzâri harfi (أَنَيْتُ)"]);
  it.push(["k-z", "Ref zamiri"]);
  if (mode !== "u") it.push(["k-t", "Te'nîs tâsı (zamir değil)"]);
  if (mode !== "m") it.push(["k-n", "İ'râb nûnu"]);
  return '<div class="legend">' + it.map(function (x) { return '<span><i class="' + x[0] + '"></i>' + x[1] + '</span>'; }).join("") + '</div>';
}
function cellTr(i) { return CELLS[i][2] + " · " + CELLS[i][4]; }
function whyText(v, mode, i) {
  var z = zamirOf(mode, i), b = BAB[v.b];
  var s = (mode === "m" ? "Mâzi" : "Muzâri") + ", " + CELLS[i][3] + " (" + CELLS[i][2].toLowerCase() + "): " + cjText(v, mode, i) + ". ";
  s += z === "gizli" ? "Ref zamiri gizlidir" + (mode === "m" && i === 3 ? "; sondaki تْ te'nîs tâsıdır, zamir değil" : "") + "." : "Ref zamiri: " + ZAMIR[z] + ".";
  s += " Ayn harekesi " + (mode === "m" ? "mâzide " + HR_KISA[b.m] : "muzâride " + HR_KISA[b.u]) + " (" + b.no + ". bâb, " + b.ad + ").";
  return s;
}

// ---------- durum ----------
var TABS = [["tahta", "Tahta"], ["bab", "Altı Bâb"], ["kart", "Soru Kartı"], ["yaris", "Takım Yarışması"], ["kagit", "Çalışma Kâğıdı"]];
var ST = {
  tab: store.get("tab", "tahta"), bab: store.get("bab", "n"), vi: store.get("vi", 0), mode: store.get("mode", "m"),
  hide: false, shown: {}, focus: -1, zoom: store.get("zoom", 1),
  cmpCell: 0, cmpMode: "m",
  q: { babs: store.get("qbabs", BKEYS.slice()), mode: "x", type: "cek", sure: store.get("sure", 0) },
  teams: store.get("teams", { n: 2, s: [0, 0, 0, 0], turn: 0 }),
  sheet: store.get("sheet", { vs: BKEYS.map(function (b) { return firstOf(b); }), mode: "mu", cevap: false })
};
function firstOf(b) { for (var i = 0; i < FIILLER.length; i++) if (FIILLER[i].b === b) return i; return 0; }
function save() { store.set("tab", ST.tab); store.set("bab", ST.bab); store.set("vi", ST.vi); store.set("mode", ST.mode); store.set("zoom", ST.zoom); store.set("qbabs", ST.q.babs); store.set("sure", ST.q.sure); store.set("teams", ST.teams); store.set("sheet", ST.sheet); }
if (!FIILLER[ST.vi] || FIILLER[ST.vi].b !== ST.bab) ST.vi = firstOf(ST.bab);
var TEAM_AD = ["1. Takım", "2. Takım", "3. Takım", "4. Takım"], TEAM_COL = ["cerr", "ref", "mz", "mi"];

// ---------- ortak bileşenler ----------
function babChips(sel, attr) {
  return '<div class="babchips" role="group" aria-label="Bâb">' + BKEYS.map(function (b) {
    var x = BAB[b], on = Array.isArray(sel) ? sel.indexOf(b) >= 0 : sel === b;
    return '<button class="bchip' + (on ? " on" : "") + '" style="--bc:var(--' + x.col + ')" ' + attr + '="' + b + '" aria-pressed="' + on + '"><b>' + x.no + '</b> ' + x.ad + ' <span class="ar">' + x.ex + '</span></button>';
  }).join("") + '</div>';
}
function seg(name, cur, items) {
  return '<div class="seg" role="group">' + items.map(function (x) { return '<button data-' + name + '="' + x[0] + '" aria-pressed="' + (cur === x[0]) + '">' + x[1] + '</button>'; }).join("") + '</div>';
}
function scoreboard() {
  var T = ST.teams;
  if (T.n < 2) return '<div class="teams-off muted">Takım puanı kapalı.</div>';
  return '<div class="teams">' + T.s.slice(0, T.n).map(function (s, i) {
    return '<div class="team' + (T.turn === i ? " turn" : "") + '" style="--bc:var(--' + TEAM_COL[i] + ')"><div class="tn">' + TEAM_AD[i] + (T.turn === i ? ' <span class="sira">sıra</span>' : '') + '</div><div class="ts tabular">' + s + '</div><div class="row-btns"><button class="btn small" data-tadd="' + i + '" aria-label="' + TEAM_AD[i] + ' artı bir">+1</button><button class="btn small ghost" data-tsub="' + i + '" aria-label="' + TEAM_AD[i] + ' eksi bir">−1</button></div></div>';
  }).join("") + '</div>';
}
function teamSettings() {
  return '<div class="teamset"><span class="muted">Takım:</span>' + seg("tn", String(ST.teams.n), [["1", "Yok"], ["2", "2"], ["3", "3"], ["4", "4"]]) + '<button class="btn small ghost" data-treset="1">Puanları sıfırla</button></div>';
}

// ---------- 1 · TAHTA ----------
function renderTahta() {
  var v = FIILLER[ST.vi], modes = ST.mode === "mu" ? ["m", "u"] : [ST.mode];
  var verbs = FIILLER.filter(function (x) { return x.b === ST.bab; });
  var grid = CROWS.map(function (r, ri) {
    var cells = CELLS.map(function (c, i) { return [c, i]; }).filter(function (x) { return x[0][0] === ri; });
    return '<div class="brow"><div class="rlab"><b>' + r[0] + '</b> <span class="ar">' + r[1] + '</span></div><div class="rcells">' + cells.map(function (x) {
      var c = x[0], i = x[1], hidden = ST.hide && !ST.shown[i];
      return '<div class="cell' + (c[1] === 1 && ri === 4 ? " span2" : "") + (ST.focus === i ? " focus" : "") + '" id="c' + i + '">' +
        '<div class="ctop"><span class="ar pron">' + c[3] + '</span><span class="clab">' + (ri === 4 ? (c[1] === 0 ? "tekil" : "ikil · çoğul") : SAYI[c[1]]) + ' · ' + c[4] + '</span></div>' +
        modes.map(function (m) {
          return hidden ? '<button class="reveal" data-rev="' + i + '" aria-label="' + c[2] + ' ' + (m === "m" ? "mâzi" : "muzâri") + ' göster">' + (modes.length > 1 ? (m === "m" ? "mâzi" : "muzâri") + " ?" : "?") + '</button>'
            : '<div class="cform"><span class="ar">' + formHtml(v, m, i) + '</span>' + (modes.length > 1 ? '<small>' + (m === "m" ? "mâzi" : "muzâri") + '</small>' : '') + '</div>';
        }).join("") + '</div>';
    }).join("") + '</div></div>';
  }).join("");
  return '<section class="panel">' +
    '<div class="card stack ctrl">' +
      '<div class="ctrl-row"><span class="lbl">Bâb</span>' + babChips(ST.bab, "data-bab") + '</div>' +
      '<div class="ctrl-row"><span class="lbl">Fiil</span><div class="vchips">' + verbs.map(function (x) { return '<button class="vchip' + (x.i === ST.vi ? " on" : "") + '" data-vi="' + x.i + '"><span class="ar">' + x.m + '</span> <small>' + esc(x.tr) + '</small></button>'; }).join("") + '<button class="btn small" data-rv="1">🎲 Rastgele fiil</button></div></div>' +
      '<div class="ctrl-row"><span class="lbl">Zaman</span>' + seg("mode", ST.mode, [["m", "Mâzi"], ["u", "Muzâri"], ["mu", "İkisi yan yana"]]) + '</div>' +
    '</div>' +
    '<div class="board card" style="--z:' + ST.zoom + '">' +
      '<div class="hero"><div class="hero-v">' + verbHero(v) + '</div><div class="hero-m">' + babTag(v.b) + '<span class="muted">' + esc(v.tr) + '</span><button class="btn small ghost" data-say="' + v.m + ' ' + v.u + '" aria-label="Fiili dinle">🔊</button></div></div>' +
      '<div class="tools">' +
        '<button class="btn small' + (ST.hide ? " solid" : "") + '" data-hide="1">' + (ST.hide ? "👁 Hepsini göster" : "🙈 Gizle: sınıf söylesin") + '</button>' +
        (ST.hide ? '<button class="btn small solid" data-next="1">Sıradaki ▸ <kbd>boşluk</kbd></button>' : '') +
        '<button class="btn small" data-rnd="1">🎯 Rastgele zamir</button>' +
        '<button class="btn small" data-sayall="1">🔊 Çekimi dinle</button>' +
        '<span class="zoom"><button class="btn small ghost" data-zoom="-1" aria-label="Yazıyı küçült">A−</button><button class="btn small ghost" data-zoom="1" aria-label="Yazıyı büyüt">A+</button></span>' +
      '</div>' +
      '<div class="grid">' + grid + '</div>' +
      legend(ST.mode) +
    '</div>' +
    '<div class="card stack"><div class="lbl">Sınıfta nasıl kullanılır?</div><ol class="howto">' +
      '<li><b>Gizle</b>’ye bas; her hücrede “?” kalır. Öğrenciler sırayla (هُوَ، هُمَا، هُمْ…) çekimi söyler, sen <b>Sıradaki</b> ile (ya da boşluk tuşuyla) doğrusunu açarsın.</li>' +
      '<li><b>Rastgele zamir</b> bir hücreyi işaretler; o zamirle cümle kurdurabilirsin.</li>' +
      '<li><b>İkisi yan yana</b> mâzi ile muzâriyi aynı zamirde karşılaştırır: ref zamiri (kırmızı) aynı kalır, muzâri harfi ve i\'râb nûnu eklenir.</li>' +
      '<li>Bâbı değiştirince yalnız ayn harekesinin (renkli harf) değiştiğine dikkat çek.</li></ol></div>' +
  '</section>';
}
function nextReveal() {
  for (var i = 0; i < CELLS.length; i++) if (!ST.shown[i]) { ST.shown[i] = 1; ST.focus = i; render(); var el = document.getElementById("c" + i); if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest", behavior: "smooth" }); return; }
  toast("Bütün çekim açıldı. Aferin!"); beep("win");
}

// ---------- 2 · ALTI BÂB ----------
function renderBab() {
  var i = ST.cmpCell, m = ST.cmpMode, c = CELLS[i];
  return '<section class="panel">' +
    '<div class="card stack"><div class="lbl">Altı bâb</div><h2>Ayn harekesi bâbı belirler</h2><p class="muted">Sülâsî mücerred fiil, mâzide ve muzâride ayn harfinin (ortadaki harf) harekesine göre altı bâba ayrılır. Bir kart seç: o bâbın fiili tahtaya gelir.</p>' +
      '<div class="babgrid">' + BKEYS.map(function (b) {
        var x = BAB[b], v = FIILLER[firstOf(b)];
        return '<button class="babcard" style="--bc:var(--' + x.col + ')" data-gobab="' + b + '"><span class="bno">' + x.no + '</span><span class="bad">' + x.ad + '</span><span class="ar bex">' + verbHero(v) + '</span><span class="bk"><span class="ar">' + x.k + '</span></span><span class="bh">' + HR_KISA[x.m] + ' · ' + HR_KISA[x.u] + '</span><small class="muted">' + BAB_NOT[b] + '</small></button>';
      }).join("") + '</div></div>' +
    '<div class="board card stack" style="--z:' + ST.zoom + '"><div class="lbl">Karşılaştır · koro çalışması</div><h2>Aynı zamir, altı bâb</h2><p class="muted">Bir zamir ve zaman seç; altı bâbın örnek fiili aynı anda çekilir. Ek hep aynıdır, yalnız ayn harekesi değişir. ◀ ▶ ile (ya da ok tuşlarıyla) sıradaki zamire geç.</p>' +
      '<div class="ctrl-row">' + seg("cmode", m, [["m", "Mâzi"], ["u", "Muzâri"]]) + '<div class="stepper"><button class="btn small" data-cstep="-1" aria-label="Önceki zamir">◀</button><span class="ar pron big">' + c[3] + '</span><span class="clab">' + c[2] + ' · ' + c[4] + '</span><button class="btn small" data-cstep="1" aria-label="Sonraki zamir">▶</button></div></div>' +
      '<div class="pchips">' + CELLS.map(function (x, j) { return '<button class="pchip' + (j === i ? " on" : "") + '" data-ccell="' + j + '"><span class="ar">' + x[3] + '</span><small>' + x[2].replace(" · ", " ") + '</small></button>'; }).join("") + '</div>' +
      '<div class="cmpgrid">' + BKEYS.map(function (b) {
        var v = FIILLER[firstOf(b)], x = BAB[b];
        return '<div class="cmp" style="--bc:var(--' + x.col + ')"><div class="cmph">' + x.no + '. ' + x.ad + '</div><div class="ar cmpf">' + formHtml(v, m, i) + '</div><small class="muted">' + HR_KISA[m === "m" ? x.m : x.u] + '</small></div>';
      }).join("") + '</div>' + legend(m) + '</div>' +
    '<div class="grid2">' +
      '<div class="card stack"><div class="lbl">Kaide</div><h3>Mâzi: ekler sona gelir</h3><ul class="rul">' +
        '<li>هُوَ ve هِيَ’de ref zamiri gizlidir; <span class="ar">نَصَرَ<span class="k-t">تْ</span></span>’taki تْ te\'nîs tâsıdır, zamir değil.</li>' +
        '<li>Ref zamirleri: <span class="ar k-z">ا</span> ikil elifi, <span class="ar k-z">و</span> çoğul vavı, <span class="ar k-z">نَ</span> kadınlar nûnu, <span class="ar k-z">تَ تِ تُ</span> hareke alan tâ, <span class="ar k-z">نَا</span> biz nâsı.</li>' +
        '<li>Hareke ile başlayan zamirden (و، ا) önce son harf harekeli, sâkin başlayandan (تُ، نَا، نَ) önce sâkin olur: <span class="ar">نَصَرُوا · نَصَرْتُ</span>.</li>' +
        '<li>Son harf ن ise aynı harfle başlayan zamirle idğam edilir: <span class="ar">حَسُنَّ، حَسُنَّا</span>.</li></ul></div>' +
      '<div class="card stack"><div class="lbl">Kaide</div><h3>Muzâri: başa harf, sona ek</h3><ul class="rul">' +
        '<li>Muzâri harfleri <b>أَنَيْتُ</b>: <span class="ar k-m">أَ</span> ben, <span class="ar k-m">نَ</span> biz, <span class="ar k-m">يَ</span> gâib, <span class="ar k-m">تَ</span> muhatab ve gâibe.</li>' +
        '<li>Sonu ötreli: <span class="ar">يَنْصُرُ</span>. İkil elifi, çoğul vavı ve muhataba yâsından sonra i\'râb nûnu gelir: <span class="ar">يَنْصُرَا<span class="k-n">نِ</span> · يَنْصُرُو<span class="k-n">نَ</span> · تَنْصُرِي<span class="k-n">نَ</span></span>.</li>' +
        '<li>Kadınlar nûnu ile sonu sâkin olur: <span class="ar">يَنْصُرْنَ · تَنْصُرْنَ</span>.</li>' +
        '<li>Aynı yazılan çekimler: <span class="ar">تَنْصُرُ</span> = أَنْتَ ve هِيَ · <span class="ar">تَنْصُرَانِ</span> = أَنْتُمَا ve هُمَا (kadın). Zamir ya da özne ayırır.</li></ul></div>' +
    '</div>' +
  '</section>';
}

// ---------- 3 · SORU KARTI ----------
var QC = null, TMR = { id: null, left: 0, total: 0 };
function poolVerbs(babs) { var b = babs && babs.length ? babs : BKEYS; return FIILLER.filter(function (v) { return b.indexOf(v.b) >= 0; }); }
function newCard() {
  var v = pick(poolVerbs(ST.q.babs)), m = ST.q.mode === "x" ? pick(["m", "u"]) : ST.q.mode, i = Math.floor(Math.random() * 14);
  QC = { v: v, m: m, i: i, type: ST.q.type, open: false };
  startTimer();
}
function startTimer() {
  stopTimer(); if (!ST.q.sure) return;
  TMR.total = TMR.left = ST.q.sure;
  TMR.id = setInterval(function () {
    TMR.left--; var bar = document.getElementById("tbar"), num = document.getElementById("tnum");
    if (bar) bar.style.width = Math.max(0, TMR.left / TMR.total * 100) + "%";
    if (num) num.textContent = Math.max(0, TMR.left);
    if (TMR.left <= 3 && TMR.left > 0) beep("end");
    if (TMR.left <= 0) { stopTimer(); beep("no"); toast("Süre doldu!"); var c = document.querySelector(".qcard"); if (c) c.classList.add("timeup"); }
  }, 1000);
}
function rotate() { if (ST.teams.n > 1) ST.teams.turn = (ST.teams.turn + 1) % ST.teams.n; }
function stopTimer() { if (TMR.id) clearInterval(TMR.id); TMR.id = null; }
function renderKart() {
  if (!QC) newCard();
  var v = QC.v, m = QC.m, i = QC.i, c = CELLS[i], tn = m === "m" ? "Mâzi" : "Muzâri";
  var soru = QC.type === "cek"
    ? '<div class="qverb">' + verbHero(v) + '<div class="muted">' + esc(v.tr) + '</div></div><div class="qask"><span class="tchip ' + (m === "m" ? "tm" : "tu") + '">' + tn + '</span><span class="ar qpron">' + c[3] + '</span><span class="clab big">' + c[2] + ' · ' + c[4] + '</span></div>'
    : '<div class="qask"><span class="ar qform">' + (QC.open ? formHtml(v, m, i) : cjText(v, m, i)) + '</span><span class="muted">Bu çekim hangi zamir, hangi zaman, hangi bâb?</span></div>';
  var cevap = QC.type === "cek"
    ? '<div class="ar qform">' + formHtml(v, m, i) + '</div>'
    : '<div class="qans-list"><div><span class="lbl">Zaman</span><b>' + tn + '</b></div><div><span class="lbl">Zamir</span><b><span class="ar">' + c[3] + '</span> ' + c[2] + '</b>' + sameNote(v, m, i) + '</div><div><span class="lbl">Bâb</span>' + babTag(v.b) + '</div><div><span class="lbl">Fiil</span><b><span class="ar">' + v.m + ' ' + v.u + '</span> · ' + esc(v.tr) + '</b></div></div>';
  return '<section class="panel">' +
    '<div class="card stack ctrl">' +
      '<div class="ctrl-row"><span class="lbl">Bâblar</span>' + babChips(ST.q.babs, "data-qbab") + '</div>' +
      '<div class="ctrl-row"><span class="lbl">Zaman</span>' + seg("qmode", ST.q.mode, [["m", "Mâzi"], ["u", "Muzâri"], ["x", "Karışık"]]) + '<span class="lbl">Soru</span>' + seg("qtype", ST.q.type, [["cek", "Çek: zamir → çekim"], ["tani", "Tanı: çekim → zamir"]]) + '</div>' +
      '<div class="ctrl-row"><span class="lbl">Süre</span>' + seg("sure", String(ST.q.sure), [["0", "Yok"], ["10", "10 sn"], ["20", "20 sn"], ["30", "30 sn"]]) + teamSettings() + '</div>' +
    '</div>' +
    '<div class="board card qcard" style="--z:' + ST.zoom + '">' +
      (ST.teams.n > 1 ? '<div class="qturn" style="--bc:var(--' + TEAM_COL[ST.teams.turn] + ')">Sıra: <b>' + TEAM_AD[ST.teams.turn] + '</b></div>' : '') +
      (ST.q.sure ? '<div class="timer"><div class="tb"><div id="tbar" style="width:100%"></div></div><span id="tnum" class="tabular">' + ST.q.sure + '</span></div>' : '') +
      soru +
      (QC.open ? '<div class="qans">' + cevap + '<p class="muted why">' + whyText(v, m, i) + '</p></div>' : '') +
      '<div class="row-btns center">' + (QC.open ? '' : '<button class="btn solid big" data-qopen="1">Cevabı göster <kbd>boşluk</kbd></button>') +
        (QC.open && ST.teams.n > 1 ? '<button class="btn big good" data-qok="1">✓ Doğru (+1 ' + TEAM_AD[ST.teams.turn] + ')</button><button class="btn big ghost" data-qnew="1">✗ Yanlış</button>' : '') +
        '<button class="btn big' + (QC.open && ST.teams.n < 2 ? " solid" : "") + '" data-qnew="1">Yeni soru <kbd>→</kbd></button>' +
        (QC.open ? '<button class="btn big ghost" data-say="' + cjText(v, m, i) + '" aria-label="Cevabı dinle">🔊</button>' : '') + '</div>' +
    '</div>' +
    scoreboard() +
  '</section>';
}
function sameCells(v, m, i) { var t = cjText(v, m, i), out = []; for (var j = 0; j < 14; j++) if (cjText(v, m, j) === t) out.push(j); return out; }
function sameNote(v, m, i) {
  var s = sameCells(v, m, i).filter(function (j) { return j !== i; });
  return s.length ? '<div class="muted small">Aynı yazılır: ' + s.map(function (j) { return '<span class="ar">' + CELLS[j][3] + '</span> ' + CELLS[j][2].toLowerCase(); }).join(", ") + '</div>' : '';
}

// ---------- 4 · TAKIM YARIŞMASI ----------
var G = { on: false, n: store.get("gn", 10), k: 0, cur: null, ans: null, types: store.get("gtypes", ["cek", "zamir", "bab", "muz"]), babs: store.get("gbabs", BKEYS.slice()), log: [] };
var GT = [["cek", "Çekimi bul"], ["zamir", "Zamiri bul"], ["bab", "Bâbı bul"], ["muz", "Muzâriyi bul"]];
function makeQ() {
  var t = pick(G.types.length ? G.types : ["cek"]), v = pick(poolVerbs(G.babs)), m = pick(["m", "u"]), i = Math.floor(Math.random() * 14), q = { t: t, v: v, m: m, i: i };
  if (t === "cek") {
    var ok = cjText(v, m, i), set = {}; set[ok] = 1; var opts = [ok];
    var alt = BKEYS.map(function (b) { return BAB[b][m]; }).concat(["a", "i", "u"]).filter(function (h) { return h !== BAB[v.b][m]; });
    var w = cjText(v, m, i, alt[0]); if (!set[w]) { set[w] = 1; opts.push(w); }
    DIS[i].concat(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])).forEach(function (j) { var x = cjText(v, m, j); if (opts.length < 4 && !set[x]) { set[x] = 1; opts.push(x); } });
    q.ask = '<div class="qverb">' + verbHero(v) + '<div class="muted">' + esc(v.tr) + '</div></div><div class="qask"><span class="tchip ' + (m === "m" ? "tm" : "tu") + '">' + (m === "m" ? "Mâzi" : "Muzâri") + '</span><span class="ar qpron">' + CELLS[i][3] + '</span><span class="clab big">' + CELLS[i][2] + '</span></div>';
    q.opts = shuffle(opts).map(function (x) { return { h: '<span class="ar">' + x + '</span>', ok: x === ok }; });
    q.why = whyText(v, m, i);
  } else if (t === "zamir") {
    var same = sameCells(v, m, i), cand = shuffle(DIS[i].concat(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]))).filter(function (j) { return same.indexOf(j) < 0; }), used = {}, list = [i];
    cand.forEach(function (j) { var key = CELLS[j][3] + CELLS[j][2]; if (list.length < 4 && !used[key]) { used[key] = 1; list.push(j); } });
    q.ask = '<div class="qask"><span class="tchip ' + (m === "m" ? "tm" : "tu") + '">' + (m === "m" ? "Mâzi" : "Muzâri") + '</span><span class="ar qform">' + cjText(v, m, i) + '</span><span class="muted">Hangi zamirle çekilmiş?</span></div>';
    q.opts = shuffle(list).map(function (j) { return { h: '<span class="ar">' + CELLS[j][3] + '</span><small>' + CELLS[j][2] + '</small>', ok: j === i }; });
    q.why = whyText(v, m, i) + (same.length > 1 ? " Aynı yazılan: " + same.filter(function (j) { return j !== i; }).map(function (j) { return CELLS[j][3] + " (" + CELLS[j][2].toLowerCase() + ")"; }).join(", ") + "." : "");
  } else if (t === "bab") {
    var bs = [v.b].concat(shuffle(BKEYS.filter(function (b) { return b !== v.b; })).slice(0, 3));
    q.ask = '<div class="qask"><span class="ar qform">' + v.m + ' ' + v.u + '</span><span class="muted">' + esc(v.tr) + ' · Hangi bâbdan?</span></div>';
    q.opts = shuffle(bs).map(function (b) { return { h: '<b>' + BAB[b].no + '. ' + BAB[b].ad + '</b><small class="ar">' + BAB[b].k + '</small>', ok: b === v.b }; });
    q.why = v.m + " " + v.u + ": mâzide ayn " + HR_KISA[BAB[v.b].m] + ", muzâride " + HR_KISA[BAB[v.b].u] + " → " + BAB[v.b].no + ". bâb, " + BAB[v.b].ad + ".";
  } else {
    var ok2 = v.u, os = ["u", "i", "a"].map(function (h) { return "يَ" + (function () { var g = harfler(v.us); g[1] = g[1].replace(/[َُِ]/, HR[h]); return g.join(""); })() + "ُ"; });
    q.ask = '<div class="qask"><span class="ar qform">' + v.m + '</span><span class="muted">' + esc(v.tr) + ' · Muzârisi hangisi?</span></div>';
    q.opts = shuffle(os).map(function (x) { return { h: '<span class="ar">' + x + '</span>', ok: x === ok2 }; });
    q.why = v.m + " → " + v.u + " (" + BAB[v.b].no + ". bâb, " + BAB[v.b].ad + ": muzâride ayn " + HR_KISA[BAB[v.b].u] + ").";
  }
  return q;
}
function renderYaris() {
  var T = ST.teams;
  if (!G.on) {
    return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Takım yarışması</div><h2>Tahtada çoktan seçmeli yarışma</h2><p class="muted">Takımlar sırayla cevap verir. Seçeneğe tıkla ya da 1–4 tuşuna bas. Doğru cevap takıma 1 puan kazandırır; yanlışta sıra diğer takıma geçer.</p>' +
      '<div class="ctrl-row"><span class="lbl">Soru sayısı</span>' + seg("gn", String(G.n), [["10", "10"], ["20", "20"], ["30", "30"]]) + teamSettings() + '</div>' +
      '<div class="ctrl-row"><span class="lbl">Soru türü</span><div class="seg multi">' + GT.map(function (x) { var on = G.types.indexOf(x[0]) >= 0; return '<button data-gtype="' + x[0] + '" aria-pressed="' + on + '">' + x[1] + '</button>'; }).join("") + '</div></div>' +
      '<div class="ctrl-row"><span class="lbl">Bâblar</span>' + babChips(G.babs, "data-gbab") + '</div>' +
      '<div class="row-btns"><button class="btn solid big" data-gstart="1">Yarışmayı başlat</button></div></div>' + scoreboard() + '</section>';
  }
  if (G.k >= G.n) {
    var best = -1, win = [];
    T.s.slice(0, T.n).forEach(function (s, i) { if (s > best) { best = s; win = [i]; } else if (s === best) win.push(i); });
    return '<section class="panel"><div class="board card stack center" style="--z:' + ST.zoom + '"><div class="lbl">Yarışma bitti</div><h2 class="winner">' + (T.n < 2 ? "Doğru: " + T.s[0] + " / " + G.n : win.length > 1 ? "Berabere: " + win.map(function (i) { return TEAM_AD[i]; }).join(" · ") : "🏆 " + TEAM_AD[win[0]] + " kazandı!") + '</h2>' + scoreboard() + '<div class="row-btns center"><button class="btn solid big" data-gagain="1">Yeni yarışma</button></div></div></section>';
  }
  var q = G.cur;
  return '<section class="panel"><div class="board card qcard" style="--z:' + ST.zoom + '">' +
    '<div class="qhead"><span class="muted tabular">Soru ' + (G.k + 1) + ' / ' + G.n + '</span>' + (T.n > 1 ? '<span class="qturn" style="--bc:var(--' + TEAM_COL[T.turn] + ')">Sıra: <b>' + TEAM_AD[T.turn] + '</b></span>' : '') + '</div>' +
    q.ask +
    '<div class="gopts">' + q.opts.map(function (o, j) {
      var cl = G.ans === null ? "" : o.ok ? " ok" : G.ans === j ? " no" : " dim";
      return '<button class="gopt' + cl + '" data-gans="' + j + '"' + (G.ans !== null ? " disabled" : "") + '><kbd>' + (j + 1) + '</kbd>' + o.h + '</button>';
    }).join("") + '</div>' +
    (G.ans !== null ? '<p class="why">' + (q.opts[G.ans].ok ? "✓ Doğru! " : "✗ Yanlış. ") + esc(q.why) + '</p><div class="row-btns center"><button class="btn solid big" data-gnext="1">Sonraki soru <kbd>→</kbd></button></div>' : '') +
    '</div>' + scoreboard() + '<div class="row-btns"><button class="btn small ghost" data-gstop="1">Yarışmayı bitir</button></div></section>';
}
function gAnswer(j) {
  if (G.ans !== null || !G.cur) return;
  G.ans = j; var ok = G.cur.opts[j].ok, T = ST.teams;
  if (ok) { T.s[T.n > 1 ? T.turn : 0]++; beep("ok"); } else beep("no");
  save(); render();
}
function gNext() { G.k++; if (ST.teams.n > 1) ST.teams.turn = (ST.teams.turn + 1) % ST.teams.n; G.ans = null; G.cur = G.k < G.n ? makeQ() : null; if (G.k >= G.n) beep("win"); save(); render(); }

// ---------- 5 · ÇALIŞMA KÂĞIDI ----------
function renderKagit() {
  var S = ST.sheet, modes = S.mode === "mu" ? ["m", "u"] : [S.mode];
  var sheets = S.vs.filter(function (x) { return x >= 0; }).map(function (vi) {
    var v = FIILLER[vi];
    return '<div class="ws"><div class="wsh"><span class="ar">' + v.m + ' ' + v.u + '</span><span>' + BAB[v.b].no + '. bâb · ' + BAB[v.b].ad + ' · ' + esc(v.tr) + '</span></div><table class="wst"><thead><tr><th>Zamir</th>' + modes.map(function (m) { return '<th>' + (m === "m" ? "Mâzi" : "Muzâri") + '</th>'; }).join("") + '</tr></thead><tbody>' +
      CELLS.map(function (c, i) { return '<tr><td><span class="ar">' + c[3] + '</span> <small>' + c[2] + '</small></td>' + modes.map(function (m) { return '<td class="ar">' + (S.cevap ? cjText(v, m, i) : '') + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>';
  }).join("");
  return '<section class="panel"><div class="card stack ctrl noprint"><div class="lbl">Çalışma kâğıdı</div><h2>Yazdırılabilir çekim tablosu</h2><p class="muted">Her bâb için bir fiil seç; boş tabloyu yazdırıp dağıt, cevap anahtarını ayrıca yazdır. Yazdırırken yalnız kâğıt basılır.</p>' +
    BKEYS.map(function (b, k) {
      return '<div class="ctrl-row"><span class="lbl">' + BAB[b].no + '. ' + BAB[b].ad + '</span><select data-sv="' + k + '" aria-label="' + BAB[b].ad + ' fiili">' + '<option value="-1"' + (S.vs[k] === -1 ? " selected" : "") + '>— yok —</option>' + FIILLER.filter(function (v) { return v.b === b; }).map(function (v) { return '<option value="' + v.i + '"' + (S.vs[k] === v.i ? " selected" : "") + '>' + v.m + ' · ' + esc(v.tr) + '</option>'; }).join("") + '</select></div>';
    }).join("") +
    '<div class="ctrl-row"><span class="lbl">Zaman</span>' + seg("smode", S.mode, [["m", "Mâzi"], ["u", "Muzâri"], ["mu", "İkisi"]]) + seg("scev", S.cevap ? "1" : "0", [["0", "Boş tablo"], ["1", "Cevap anahtarı"]]) + '<button class="btn solid" data-print="1">🖨 Yazdır</button></div></div>' +
    '<div class="sheet"><div class="sheet-top"><b>Ebvâb-ı Sitte · Mâzi ve Muzâri Çekimi' + (S.cevap ? ' · Cevap anahtarı' : '') + '</b><span>Ad Soyad: ______________________ &nbsp; Tarih: ____________</span></div><div class="wsgrid">' + sheets + '</div></div></section>';
}

// ---------- çatı ----------
function renderTabs() {
  document.getElementById("tabs").innerHTML = TABS.map(function (t) { return '<button role="tab" aria-selected="' + (ST.tab === t[0]) + '" data-tab="' + t[0] + '">' + t[1] + '</button>'; }).join("") +
    '<span class="tabtools"><button class="btn small ghost" data-full="1" aria-label="Tam ekran">⛶ Tam ekran</button><button class="btn small ghost" data-theme="1" aria-label="Açık ya da koyu tema">Tema</button></span>';
}
function render() {
  if (ST.tab !== "kart") stopTimer();
  renderTabs();
  if (ST.tab === "tahta") main.innerHTML = renderTahta();
  else if (ST.tab === "bab") main.innerHTML = renderBab();
  else if (ST.tab === "kart") main.innerHTML = renderKart();
  else if (ST.tab === "yaris") main.innerHTML = renderYaris();
  else main.innerHTML = renderKagit();
}
function setTab(t) { ST.tab = t; save(); render(); window.scrollTo(0, 0); }
function sayAll() {
  var v = FIILLER[ST.vi], modes = ST.mode === "mu" ? ["m", "u"] : [ST.mode];
  say(modes.map(function (m) { return CELLS.map(function (c, i) { return c[3] + " " + cjText(v, m, i); }).join("، "); }).join(". "));
}

document.addEventListener("click", function (e) {
  var b = e.target.closest("button"); if (!b) return; var d = b.dataset;
  if (d.tab) return setTab(d.tab);
  if (d.full) { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (x) { toast("Tam ekran açılamadı."); } return; }
  if (d.theme) { var r = document.documentElement, cur = r.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); r.setAttribute("data-theme", cur === "dark" ? "light" : "dark"); store.set("theme", r.getAttribute("data-theme")); return; }
  if (d.say) return say(d.say);
  if (d.sayall) return sayAll();
  if (d.zoom) { ST.zoom = Math.max(0.8, Math.min(1.8, Math.round((ST.zoom + 0.2 * +d.zoom) * 10) / 10)); save(); return render(); }
  // tahta
  if (d.bab) { ST.bab = d.bab; ST.vi = firstOf(d.bab); ST.shown = {}; ST.focus = -1; save(); return render(); }
  if (d.vi) { ST.vi = +d.vi; ST.shown = {}; ST.focus = -1; save(); return render(); }
  if (d.rv) { var vs = FIILLER.filter(function (x) { return x.b === ST.bab && x.i !== ST.vi; }); ST.vi = pick(vs).i; ST.shown = {}; ST.focus = -1; save(); return render(); }
  if (d.mode) { ST.mode = d.mode; save(); return render(); }
  if (d.hide) { ST.hide = !ST.hide; ST.shown = {}; ST.focus = -1; return render(); }
  if (d.next) return nextReveal();
  if (d.rev) { ST.shown[+d.rev] = 1; ST.focus = +d.rev; return render(); }
  if (d.rnd) { var hid = []; for (var i = 0; i < 14; i++) if (!ST.hide || !ST.shown[i]) hid.push(i); if (!hid.length) hid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; ST.focus = pick(hid.filter(function (x) { return x !== ST.focus; }).length ? hid.filter(function (x) { return x !== ST.focus; }) : hid); render(); var el = document.getElementById("c" + ST.focus); if (el && el.scrollIntoView) el.scrollIntoView({ block: "center", behavior: "smooth" }); toast(CELLS[ST.focus][3] + " · " + CELLS[ST.focus][2]); return; }
  // altı bâb
  if (d.gobab) { ST.bab = d.gobab; ST.vi = firstOf(d.gobab); ST.shown = {}; save(); return setTab("tahta"); }
  if (d.cmode) { ST.cmpMode = d.cmode; return render(); }
  if (d.cstep) { ST.cmpCell = (ST.cmpCell + 14 + +d.cstep) % 14; return render(); }
  if (d.ccell) { ST.cmpCell = +d.ccell; return render(); }
  // ortak takım
  if (d.tn) { ST.teams.n = +d.tn; if (ST.teams.turn >= ST.teams.n) ST.teams.turn = 0; save(); return render(); }
  if (d.treset) { ST.teams.s = [0, 0, 0, 0]; ST.teams.turn = 0; save(); return render(); }
  if (d.tadd) { ST.teams.s[+d.tadd]++; beep("ok"); save(); return render(); }
  if (d.tsub) { ST.teams.s[+d.tsub] = Math.max(0, ST.teams.s[+d.tsub] - 1); save(); return render(); }
  // soru kartı
  if (d.qbab) { var qb = ST.q.babs, k = qb.indexOf(d.qbab); if (k >= 0) { if (qb.length > 1) qb.splice(k, 1); else toast("En az bir bâb seçili kalmalı."); } else qb.push(d.qbab); QC = null; save(); return render(); }
  if (d.qmode) { ST.q.mode = d.qmode; QC = null; return render(); }
  if (d.qtype) { ST.q.type = d.qtype; QC = null; return render(); }
  if (d.sure) { ST.q.sure = +d.sure; save(); QC = null; return render(); }
  if (d.qopen) { QC.open = true; stopTimer(); return render(); }
  if (d.qok) { ST.teams.s[ST.teams.turn]++; beep("ok"); rotate(); newCard(); save(); return render(); }
  if (d.qnew) { rotate(); newCard(); save(); return render(); }
  // yarışma
  if (d.gn) { G.n = +d.gn; store.set("gn", G.n); return render(); }
  if (d.gtype) { var gk = G.types.indexOf(d.gtype); if (gk >= 0) { if (G.types.length > 1) G.types.splice(gk, 1); } else G.types.push(d.gtype); store.set("gtypes", G.types); return render(); }
  if (d.gbab) { var gb = G.babs.indexOf(d.gbab); if (gb >= 0) { if (G.babs.length > 1) G.babs.splice(gb, 1); } else G.babs.push(d.gbab); store.set("gbabs", G.babs); return render(); }
  if (d.gstart || d.gagain) { G.on = true; G.k = 0; G.ans = null; ST.teams.s = [0, 0, 0, 0]; ST.teams.turn = 0; G.cur = makeQ(); save(); return render(); }
  if (d.gans) return gAnswer(+d.gans);
  if (d.gnext) return gNext();
  if (d.gstop) { G.on = false; return render(); }
  // kâğıt
  if (d.smode) { ST.sheet.mode = d.smode; save(); return render(); }
  if (d.scev) { ST.sheet.cevap = d.scev === "1"; save(); return render(); }
  if (d.print) { try { window.print(); } catch (x) {} return; }
});
document.addEventListener("change", function (e) {
  var s = e.target; if (s.dataset && s.dataset.sv !== undefined) { ST.sheet.vs[+s.dataset.sv] = +s.value; save(); render(); }
});
document.addEventListener("keydown", function (e) {
  if (e.target.closest && e.target.closest("select, input, textarea")) return;
  var k = e.key;
  if (ST.tab === "tahta" && ST.hide && (k === " " || k === "ArrowRight")) { e.preventDefault(); return nextReveal(); }
  if (ST.tab === "bab" && (k === "ArrowRight" || k === "ArrowLeft")) { e.preventDefault(); ST.cmpCell = (ST.cmpCell + 14 + (k === "ArrowRight" ? 1 : -1)) % 14; return render(); }
  if (ST.tab === "kart") {
    if (k === " " && QC && !QC.open) { e.preventDefault(); QC.open = true; stopTimer(); return render(); }
    if (k === "ArrowRight" || (k === " " && QC && QC.open)) { e.preventDefault(); rotate(); newCard(); save(); return render(); }
  }
  if (ST.tab === "yaris" && G.on && G.cur) {
    if (G.ans === null && /^[1-4]$/.test(k) && G.cur.opts[+k - 1]) { e.preventDefault(); return gAnswer(+k - 1); }
    if (G.ans !== null && (k === "ArrowRight" || k === "Enter" || k === " ")) { e.preventDefault(); return gNext(); }
  }
});
var th = store.get("theme", null); if (th) document.documentElement.setAttribute("data-theme", th);
ST.sheet.vs = BKEYS.map(function (b, k) { var x = ST.sheet.vs[k]; return x === -1 || (FIILLER[x] && FIILLER[x].b === b) ? x : firstOf(b); });
render();
})();
