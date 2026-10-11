(function () {
"use strict";
// ---------- yardımcılar ----------
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
var store = {
  get: function (k, d) { try { var v = localStorage.getItem("hasanyolculuk:" + k); return v === null ? d : JSON.parse(v); } catch (x) { return d; } },
  set: function (k, v) { try { localStorage.setItem("hasanyolculuk:" + k, JSON.stringify(v)); } catch (x) {} }
};
var main = document.getElementById("main"), toastEl = document.getElementById("toast"), toastT;
function toast(t) { toastEl.textContent = t; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 1800); }
var SND = { ctx: null };
function beep(type) {
  try {
    SND.ctx = SND.ctx || new (window.AudioContext || window.webkitAudioContext)();
    var c = SND.ctx, notes = type === "ok" ? [660, 880] : type === "win" ? [523, 659, 784, 1046] : type === "bell" ? [880, 660, 880] : [220, 160];
    notes.forEach(function (f, i) { var o = c.createOscillator(), g = c.createGain(); o.type = type === "no" ? "sawtooth" : "triangle"; o.frequency.value = f; var t = c.currentTime + i * 0.12; g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.27); });
  } catch (x) {}
}
function say(t) {
  try { if (!window.speechSynthesis) return toast("Bu tarayıcı sesli okuma desteklemiyor."); speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t.replace(/<[^>]+>/g, "")); u.lang = "ar-SA"; u.rate = 0.8; speechSynthesis.speak(u); } catch (x) {}
}
function hush() { try { speechSynthesis.cancel(); } catch (x) {} }
function seg(name, cur, items) {
  return '<div class="seg" role="group">' + items.map(function (x) { return '<button data-' + name + '="' + x[0] + '" aria-pressed="' + (String(cur) === String(x[0])) + '">' + x[1] + '</button>'; }).join("") + '</div>';
}
// Türkçe ek-fiil: güzel → güzeldir, uzak → uzaktır
function dir(w) {
  var v = (w.match(/[aıoueiöü]/gi) || ["a"]).pop().toLowerCase(), h = { a: "ı", ı: "ı", o: "u", u: "u", e: "i", i: "i", ö: "ü", ü: "ü" }[v];
  return w + (/[fstkçşhp]$/i.test(w) ? "t" : "d") + h + "r";
}
// Türkçe metindeki Arapça parçaları Arapça yazı tipine al
function arr(t) { return esc(t).replace(/([\u0600-\u06FF][\u0600-\u06FF\u064B-\u0652\u0670\s،]*[\u0600-\u06FF\u064B-\u0652\u0670])/g, '<span class="ar">$1</span>'); }
function deDa(w) { var v = (w.match(/[aıoueiöü]/gi) || ["a"]).pop().toLowerCase(); return w + (/[aıou]/.test(v) ? " da" : " de"); }

// ---------- cümle verisini aç ----------
// "(هُوَ)" gizli fâil (g), "+هَا" öncekine bitişik (a)
var MARK_YOK = { x: 1, ek: 1, kn: 1 };
CUMLE.forEach(function (s, i) {
  s.i = i;
  s.t = s.k.split(" · ").map(function (x) {
    var p = x.split("|"), ar = p[0], g = /^\(.*\)$/.test(ar), a = ar.charAt(0) === "+";
    return { ar: a ? ar.slice(1) : g ? ar.slice(1, -1) : ar, tr: p[1], r: p[2], g: g, a: a };
  });
  s.ar = s.t.filter(function (t) { return !t.g; }).reduce(function (acc, t) { return acc + (acc === "" || t.a || /(^| )وَ$/.test(acc) ? "" : " ") + t.ar; }, "");
  var ch = [];
  s.t.forEach(function (t, j) { var last = ch[ch.length - 1]; if (last && last.r === t.r && t.r !== "x" && !t.g && !s.t[last.w[last.w.length - 1]].g) last.w.push(j); else ch.push({ r: t.r, w: [j], g: t.g, a: t.a }); });
  s.ch = ch;
  s.isim = s.t.some(function (t) { return t.r === "mb"; });
});
function tokHtml(s, j) { var t = s.t[j]; return '<span class="tok" data-tok="' + s.i + '-' + j + '">' + t.ar + '</span>'; }
// opt.ghost: gizli fâili göster · opt.color: renklenecek roller · opt.mark/check: sınıf işaretlemesi · opt.label: rol etiketi
function sentHtml(s, opt) {
  opt = opt || {};
  var out = "";
  s.ch.forEach(function (c, ci) {
    if (c.g && !opt.ghost) return;
    var inner = c.w.map(function (j) { return tokHtml(s, j); }).join(" ");
    var cls = "ch" + (c.g ? " gz" : ""), role = c.r, on = opt.color === "all" || (opt.color && opt.color.indexOf(role) >= 0);
    if (on) cls += " c-" + role + " on";
    if (opt.mark && !MARK_YOK[c.r] && !c.g) { var m = opt.mark[ci]; cls += " mk" + (m ? " c-" + m + " on" : ""); if (opt.check) cls += m === c.r ? " right" : " wrong"; }
    var sep = out === "" || c.a || /وَ<\/span><\/span>$/.test(out) ? "" : " ";
    out += sep + '<span class="' + cls + '" data-ch="' + ci + '"' + (opt.label && on && !MARK_YOK[role] ? ' data-lab="' + (c.g ? "Gizli fâil" : ROLLER[role].tr) + '"' : '') + '>' + inner + '</span>';
  });
  return out;
}

// ---------- durum ----------
var TABS = [["plan", "Ders Planı"], ["kelime", "Kelimeler"], ["metin", "Metin"], ["ceviri", "Çeviri"], ["isim", "Fiil Cümlesi"], ["alistirma", "Alıştırmalar"], ["yaris", "Yarışma"], ["uret", "Üretim"]];
var ST = {
  tab: store.get("tab", "plan"), zoom: store.get("zoom", 1),
  kel: { flip: {}, mode: "at", spot: -1, order: KELIME.map(function (_, i) { return i; }) },
  met: { tr: false, renk: false, sadeceTr: false, sel: -1, gloss: null },
  cev: { mode: "at", i: 0, step: 0 },
  isim: { i: 0, color: [], mark: {}, check: false, quiz: false },
  al: { set: "makine", k: 0, ans: null, ok: 0, n: 0, order: {} },
  um: { f: 1, v: "ktb", z: "m", pick: null },
  kur: { f: 1, v: "ktb", z: "m", o: 0, t: "" },
  teams: store.get("teams", { n: 2, s: [0, 0, 0, 0], turn: 0 }),
  stage: store.get("stage", -1)
};
function save() { store.set("tab", ST.tab); store.set("zoom", ST.zoom); store.set("teams", ST.teams); store.set("stage", ST.stage); }
var TEAM_AD = ["1. Takım", "2. Takım", "3. Takım", "4. Takım"], TEAM_COL = ["cerr", "ref", "mz", "mi"];

// ---------- ders zamanlayıcısı ----------
var CLK = { left: 0, run: false, id: null };
function clkStart(k) {
  ST.stage = k; CLK.left = AKIS[k][2] * 60; CLK.run = true; save();
  if (/^Türkçeden/.test(AKIS[k][1])) { ST.cev.mode = "ta"; ST.cev.i = 0; ST.cev.step = 0; } else if (AKIS[k][0] === "ceviri") { ST.cev.mode = "at"; ST.cev.step = 0; }
  if (!CLK.id) CLK.id = setInterval(function () {
    if (!CLK.run) return;
    CLK.left--; clkPaint();
    if (CLK.left === 0) { beep("bell"); toast("“" + AKIS[ST.stage][1] + "” için süre doldu."); }
  }, 1000);
}
function mmss(s) { var neg = s < 0; s = Math.abs(s); return (neg ? "+" : "") + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
function clkHtml() {
  if (ST.stage < 0) return '<span class="clk idle"><button class="btn small ghost" data-tab="plan">⏱ Ders akışı</button></span>';
  var a = AKIS[ST.stage];
  return '<span class="clk' + (CLK.left < 0 ? " over" : "") + '"><b>' + (ST.stage + 1) + '/' + AKIS.length + '</b> <span class="cname">' + a[1] + '</span> <span class="ctime tabular" id="ctime">' + mmss(CLK.left) + '</span>' +
    '<button class="btn small ghost" data-clk="pause" aria-label="' + (CLK.run ? "Duraklat" : "Devam") + '">' + (CLK.run ? "⏸" : "▶") + '</button>' +
    (ST.stage < AKIS.length - 1 ? '<button class="btn small" data-clk="next">Sonraki adım ▸</button>' : '') + '</span>';
}
function clkPaint() { var el = document.getElementById("ctime"); if (el) { el.textContent = mmss(CLK.left); el.parentNode.classList.toggle("over", CLK.left < 0); } }

// ---------- takımlar ----------
function scoreboard() {
  var T = ST.teams;
  if (T.n < 2) return '';
  return '<div class="teams">' + T.s.slice(0, T.n).map(function (s, i) {
    return '<div class="team' + (T.turn === i ? " turn" : "") + '" style="--bc:var(--' + TEAM_COL[i] + ')"><div class="tn">' + TEAM_AD[i] + (T.turn === i ? ' <span class="sira">sıra</span>' : '') + '</div><div class="ts tabular">' + s + '</div><div class="row-btns"><button class="btn small" data-tadd="' + i + '">+1</button><button class="btn small ghost" data-tsub="' + i + '">−1</button></div></div>';
  }).join("") + '</div>';
}
function teamSettings() { return '<span class="teamset"><span class="lbl">Takım</span>' + seg("tn", ST.teams.n, [["1", "Yok"], ["2", "2"], ["3", "3"], ["4", "4"]]) + '<button class="btn small ghost" data-treset="1">Puanları sıfırla</button></span>'; }
function rotate() { if (ST.teams.n > 1) ST.teams.turn = (ST.teams.turn + 1) % ST.teams.n; }

// ---------- 0 · DERS PLANI ----------
function renderPlan() {
  var tot = AKIS.reduce(function (a, x) { return a + x[2]; }, 0);
  return '<section class="panel"><div class="card stack"><div class="lbl">Ders akışı · ' + tot + ' dakika</div><h2>Bugünkü ders: çeviri ve fiil cümlesi</h2>' +
    '<p class="muted">Bir adımı başlat: ilgili sekme açılır ve süre sayılır. Süre bitince zil çalar; ders senin hızında devam eder. Sekmelere istediğin an geçebilirsin.</p>' +
    '<div class="goals"><div><span class="lbl">Hedefler</span><ul><li>Metni anlayarak okumak ve doğal Türkçeye çevirmek</li><li>Fiil cümlesinde fiil, fâil ve mef’ûl bihi bulmak; gizli fâili fark etmek</li><li>Fiili fâile uydurmak: dişil fâilde تْ / تَـ, fiil başta tekil</li><li>Fâilin merfû, mef’ûlün mansûb olduğunu görmek</li><li>Türkçeden Arapçaya fiil cümlesi kurmak</li></ul></div></div>' +
    '<ol class="akis">' + AKIS.map(function (a, k) {
      return '<li class="' + (ST.stage === k ? "now" : ST.stage > k ? "done" : "") + '"><span class="ak-no">' + (k + 1) + '</span><div><b>' + a[1] + '</b> <span class="muted">· ' + a[2] + ' dk</span><p class="muted">' + a[3] + '</p></div><button class="btn small' + (ST.stage === k ? " solid" : "") + '" data-stage="' + k + '">' + (ST.stage === k ? "Yeniden başlat" : "Başlat") + '</button></li>';
    }).join("") + '</ol></div></section>';
}

// ---------- 1 · KELİMELER ----------
function renderKelime() {
  var K = ST.kel, at = K.mode === "at";
  var spot = K.spot >= 0 ? KELIME[K.spot] : null;
  return '<section class="panel"><div class="card stack ctrl"><div class="ctrl-row"><span class="lbl">Yön</span>' + seg("kmode", K.mode, [["at", "Arapça → Türkçe"], ["ta", "Türkçe → Arapça"]]) +
    '<button class="btn small" data-kall="1">Hepsini çevir</button><button class="btn small ghost" data-knone="1">Hepsini kapat</button><button class="btn small ghost" data-kmix="1">Karıştır</button><button class="btn small solid" data-kspot="1">🎯 Rastgele kart</button></div>' +
    '<p class="muted">Karta dokun: arka yüzü açılır. Önce sınıf söylesin, sonra aç. Arka yüzde çoğul (fiillerde muzâri) ve zıt anlamlı da var.</p></div>' +
    (spot ? '<div class="board card spot" style="--z:' + ST.zoom + '"><div class="ar spot-ar">' + (at || K.spotOpen ? spot[0] : "?") + '</div><div class="spot-tr">' + (!at || K.spotOpen ? spot[1] : "?") + '</div>' + (K.spotOpen ? '<div class="muted">' + (spot[2] ? (/^[يت][َُ]/.test(spot[2]) ? "Muzâri" : "Çoğul") + ': <span class="ar">' + spot[2] + '</span> ' : '') + (spot[3] ? ' · Zıt: <span class="ar">' + spot[3] + '</span>' : '') + '</div>' : '') +
      '<div class="row-btns center">' + (K.spotOpen ? '' : '<button class="btn solid big" data-kspotopen="1">Göster <kbd>boşluk</kbd></button>') + '<button class="btn big" data-kspot="1">Sonraki <kbd>→</kbd></button><button class="btn big ghost" data-say="' + spot[0] + '">🔊</button><button class="btn big ghost" data-kspotclose="1">Kapat</button></div></div>' : '') +
    '<div class="kgrid" style="--z:' + ST.zoom + '">' + K.order.map(function (i) {
      var w = KELIME[i], f = !!K.flip[i];
      return '<button class="kcard' + (f ? " flip" : "") + '" data-kf="' + i + '"><span class="kfront">' + (at ? '<span class="ar">' + w[0] + '</span>' : '<span class="ktr">' + w[1] + '</span>') + '</span>' +
        (f ? '<span class="kback">' + (at ? '<span class="ktr">' + w[1] + '</span>' : '<span class="ar">' + w[0] + '</span>') + (w[2] ? '<small>' + (/^[يت][َُ]/.test(w[2]) ? "Muzâri" : "Çoğul") + ': <span class="ar">' + w[2] + '</span></small>' : '') + (w[3] ? '<small>× <span class="ar">' + w[3] + '</span></small>' : '') + '</span>' : '') + '</button>';
    }).join("") + '</div></section>';
}

// ---------- 2 · METİN ----------
function renderMetin() {
  var M = ST.met, paras = [1, 2, 3, 4, 5];
  var g = M.gloss ? CUMLE[M.gloss[0]].t[M.gloss[1]] : null;
  return '<section class="panel"><div class="card stack ctrl"><div class="ctrl-row">' +
    '<button class="btn small' + (M.tr ? " solid" : "") + '" data-mt="tr">Türkçe altında</button>' +
    '<button class="btn small' + (M.renk ? " solid" : "") + '" data-mt="renk">Fiil · fâil · mef’ûl renkli</button>' +
    '<button class="btn small' + (M.sadeceTr ? " solid" : "") + '" data-mt="sadeceTr">Yalnız Türkçe (geri çeviri)</button>' +
    '<button class="btn small" data-sayall="1">🔊 Metni dinle</button><button class="btn small ghost" data-hush="1">■ Durdur</button></div>' +
    '<p class="muted">Bir kelimeye dokun: anlamı aşağıda görünür. Bir cümle numarasına dokun: o cümle seçilir, çevirisi ve sesi gelir.</p></div>' +
    '<div class="board card metin" style="--z:' + ST.zoom + '"><h2 class="ar mbaslik">' + BASLIK + '</h2>' +
    paras.map(function (p) {
      return '<div class="para' + (M.tr || M.sadeceTr ? " blk" : "") + '">' + CUMLE.filter(function (s) { return s.p === p; }).map(function (s) {
        var sel = M.sel === s.i;
        return '<span class="sent' + (sel ? " sel" : "") + '"><button class="sno" data-msel="' + s.i + '" aria-label="' + (s.i + 1) + '. cümle">' + (s.i + 1) + '</button>' +
          (M.sadeceTr ? '<span class="trtext">' + esc(s.tr) + '</span>' : '<span class="ar">' + sentHtml(s, { color: M.renk ? ["fl", "fa", "mf", "mb", "hb"] : null }) + '</span>' + (M.tr ? '<span class="trtext">' + esc(s.tr) + '</span>' : '')) + '</span> ';
      }).join("") + '</div>';
    }).join("") +
    (M.renk ? LEGEND(false) : '') + '</div>' +
    (g ? '<div class="card gloss"><span class="ar">' + g.ar + '</span> <b>' + esc(g.tr) + '</b> <span class="muted">· ' + (CUMLE[M.gloss[0]].i + 1) + '. cümle · ' + ROLLER[g.r].tr + '</span><button class="btn small ghost" data-say="' + g.ar + '">🔊</button></div>' : '') +
    (M.sel >= 0 ? '<div class="card stack"><div class="lbl">' + (M.sel + 1) + '. cümle</div><div class="ar big">' + CUMLE[M.sel].ar + '</div><div><b>' + esc(CUMLE[M.sel].tr) + '</b></div><p class="muted">' + arr(CUMLE[M.sel].n) + '</p><div class="row-btns"><button class="btn small" data-say="' + CUMLE[M.sel].ar + '">🔊 Dinle</button><button class="btn small ghost" data-gocev="' + M.sel + '">Çeviri sekmesinde aç</button><button class="btn small ghost" data-goisim="' + M.sel + '">Analiz et</button></div></div>' : '') +
  '</section>';
}

// ---------- 3 · ÇEVİRİ ----------
function cevList() { return ST.cev.mode === "yeni" ? TRANSFER : CUMLE; }
function renderCeviri() {
  var C = ST.cev, L = cevList(), n = L.length; if (C.i >= n) C.i = 0;
  var body = "";
  if (C.mode === "yeni") {
    var x = TRANSFER[C.i];
    body = '<div class="cev-q">' + esc(x[0]) + '</div>' + (C.step >= 1 ? '<div class="muted">İpucu: ' + arr(x[2]) + '</div>' : '') +
      (C.step >= 2 ? '<div class="ar cev-a">' + x[1] + '</div>' : '');
  } else {
    var s = CUMLE[C.i], at = C.mode === "at";
    body = (at ? '<div class="ar cev-ar">' + sentHtml(s) + '</div>' : '<div class="cev-q">' + esc(s.tr) + '</div>') +
      (C.step >= 1 ? '<div class="wbw">' + s.t.map(function (t) { return '<span class="wb' + (t.r !== "x" ? " c-" + t.r : "") + (t.g ? " gz" : "") + '"><span class="ar">' + (t.a ? "ـ" : "") + t.ar + '</span><small>' + esc(t.g ? "(gizli) " + t.tr : t.tr) + '</small></span>'; }).join("") + '</div>' : '') +
      (C.step >= 2 ? (at ? '<div class="cev-a">' + esc(s.tr) + '</div>' : '<div class="ar cev-a">' + s.ar + '</div>') : '') +
      (C.step >= 3 ? '<p class="note">💡 ' + arr(s.n) + '</p>' : '');
  }
  var steps = C.mode === "yeni" ? [["İpucu", 1], ["Arapçası", 2]] : [["Kelime kelime", 1], [C.mode === "at" ? "Çeviri" : "Arapçası", 2], ["Not", 3]];
  return '<section class="panel"><div class="card stack ctrl"><div class="ctrl-row"><span class="lbl">Mod</span>' + seg("cmode", C.mode, [["at", "Arapça → Türkçe"], ["ta", "Türkçe → Arapça"], ["yeni", "Yeni cümleler (TR → AR)"]]) + '</div>' +
    '<div class="pchips">' + L.map(function (_, k) { return '<button class="pchip' + (k === C.i ? " on" : "") + '" data-ci="' + k + '">' + (k + 1) + '</button>'; }).join("") + '</div>' +
    '<p class="muted">Önce öğrenciler çevirsin; sonra adım adım aç. Boşluk: sıradaki adım · ← →: önceki / sonraki cümle.</p></div>' +
    '<div class="board card cev" style="--z:' + ST.zoom + '"><div class="lbl">' + (C.i + 1) + ' / ' + n + '</div>' + body +
    '<div class="row-btns center">' + steps.map(function (x) { return '<button class="btn' + (C.step >= x[1] ? " solid" : "") + '" data-cstep="' + x[1] + '">' + x[0] + '</button>'; }).join("") +
    '<button class="btn ghost" data-say="' + (C.mode === "yeni" ? TRANSFER[C.i][1] : CUMLE[C.i].ar) + '">🔊</button></div>' +
    '<div class="row-btns center"><button class="btn big ghost" data-cmove="-1">◀ Önceki</button><button class="btn big" data-cmove="1">Sonraki ▶</button></div></div></section>';
}

// ---------- 4 · FİİL CÜMLESİ ----------
function LEGEND(ghost) {
  return '<div class="legend"><span><i class="c-fl"></i>Fiil</span><span><i class="c-fa"></i>Fâil</span><span><i class="c-mf"></i>Mef’ûl bih</span><span><i class="c-tm"></i>Tümleç</span>' + (ghost ? '<span><i class="ghostbox"></i>Gizli fâil</span>' : '') + '<span><i class="c-mb"></i>Mübtedâ</span><span><i class="c-hb"></i>Haber</span></div>';
}
function clauseTable(s) {
  return '<table class="ctab"><thead><tr><th>Fiil</th><th>Fâil</th><th>Mef’ûl bih</th><th>Açıklama</th></tr></thead><tbody>' + s.c.map(function (c) {
    if (c[0] === "i") return '<tr><td colspan="3"><b>İsim cümlesi:</b> mübtedâ <span class="ar c-mb">' + c[1] + '</span> · haber <span class="ar c-hb">' + c[2] + '</span></td><td>' + arr(c[3]) + '</td></tr>';
    return '<tr><td class="ar c-fl">' + c[1] + '</td><td class="ar c-fa">' + arr(c[2]) + '</td><td class="ar c-mf">' + arr(c[3]) + '</td><td>' + arr(c[4]) + '</td></tr>';
  }).join("") + '</tbody></table>';
}
function cycleOf(s) { return s.isim ? ["mb", "hb", "tm", undefined] : ["fl", "fa", "mf", "tm", undefined]; }
function renderIsim() {
  var I = ST.isim, s = CUMLE[I.i], roles = s.isim ? [["mb", "Mübtedâ"], ["hb", "Haber"], ["tm", "Tümleç"]] : [["fl", "Fiil"], ["fa", "Fâil"], ["mf", "Mef’ûl"], ["tm", "Tümleç"]];
  return '<section class="panel"><div class="card stack"><div class="lbl">Kaide</div><h2>Fiil cümlesi: fiil, fâil, mef’ûl bih</h2><div class="kaide">' +
    KAIDE.map(function (k, i) { return '<div class="kd"><span class="kd-no">' + (i + 1) + '</span><div><b>' + k[0] + '</b><p>' + k[1] + '</p></div></div>'; }).join("") + '</div></div>' +
    '<div class="card stack ctrl"><div class="lbl">Metindeki cümleler</div><div class="pchips">' + CUMLE.map(function (x, k) { return '<button class="pchip' + (k === I.i ? " on" : "") + '" data-ii="' + k + '"' + (x.isim ? ' title="İsim cümlesi"' : '') + '>' + (k + 1) + (x.isim ? "ⁱ" : "") + '</button>'; }).join("") + '</div>' +
    '<div class="ctrl-row">' + seg("iq", I.quiz ? "1" : "0", [["0", "Göster"], ["1", "Sınıf işaretlesin"]]) +
    (I.quiz ? '<span class="muted">Parçaya dokun: ' + (s.isim ? "mübtedâ → haber → tümleç" : "fiil → fâil → mef’ûl → tümleç") + ' → boş. Gizli fâil gösterilmez; onu sözlü sor. Sonra kontrol et.</span><button class="btn small solid" data-icheck="1">Kontrol et</button><button class="btn small ghost" data-iclear="1">Temizle</button>'
      : roles.map(function (r) { return '<button class="btn small' + (I.color.indexOf(r[0]) >= 0 ? " solid" : "") + '" data-icol="' + r[0] + '">' + r[1] + '</button>'; }).join("") + '<button class="btn small ghost" data-icol="all">Hepsi</button>') + '</div></div>' +
    '<div class="board card analiz" style="--z:' + ST.zoom + '"><div class="lbl">' + (I.i + 1) + '. cümle' + (s.isim ? " · isim cümlesi (karşılaştırma için)" : "") + '</div><div class="ar anl">' +
      (I.quiz ? sentHtml(s, { mark: I.mark, check: I.check }) : sentHtml(s, { color: I.color.length ? I.color : null, label: true, ghost: I.color.indexOf("fa") >= 0 })) + '</div>' +
      '<div class="muted">' + esc(s.tr) + '</div>' +
      ((!I.quiz && I.color.length >= 2) || I.check ? clauseTable(s) : '') +
      LEGEND(true) +
      '<div class="row-btns center"><button class="btn ghost" data-imove="-1">◀ Önceki</button><button class="btn" data-imove="1">Sonraki ▶</button></div></div></section>';
}

// ---------- 5 · ALIŞTIRMALAR ----------
var SETS = [["makine", "Fiil–fâil makinesi"], ["uyum", "Fiilin biçimi"], ["irab", "Harekeyi seç"], ["fail", "Fâili bul"], ["meful", "Mef’ûlü bul"], ["tur", "İsim mi, fiil cümlesi mi?"], ["donustur", "Dönüştür"], ["dy", "Doğru mu, yanlış mı?"], ["soru", "Soru–cevap (sözlü)"]];
function qGap(x) { return '<span class="ar">' + x.replace("___", '<span class="gap">___</span>') + '</span>'; }
function mc(list, f) { return list.map(function (x) { return { q: f(x), o: [x[1], x[2], x[3]], a: x[1], why: x[4] }; }); }
function setItems(k) {
  if (k === "uyum") return mc(UYUM, function (x) { return qGap(x[0]) + (x[5] ? ' <span class="tchip">' + x[5] + '</span>' : ''); });
  if (k === "irab") return mc(IRAB, function (x) { return qGap(x[0]); });
  if (k === "fail") return mc(FAIL, function (x) { return '<div class="lbl">Fâil hangisi?</div><span class="ar">' + x[0] + '</span>'; });
  if (k === "meful") return mc(MEFUL, function (x) { return '<div class="lbl">Mef’ûl bih hangisi?</div><span class="ar">' + x[0] + '</span>'; });
  if (k === "donustur") return DONUSTUR.map(function (x) { var p = x[0].split(" ← "); return { q: '<span class="ar">' + p[0] + '</span> <span class="tchip">' + arr(p[1]) + '</span>', o: [x[1], x[2], x[3]], a: x[1], why: x[4] }; });
  if (k === "tur") return TUR.map(function (x) { return { q: '<span class="ar">' + x[0] + '</span>', o: TUR_OPTS.map(function (o) { return o[1]; }), a: TUR_OPTS.filter(function (o) { return o[0] === x[1]; })[0][1], why: x[2], fixed: true }; });
  if (k === "dy") return DY.map(function (x) { return { q: '<span class="ar">' + x[0] + '</span>', o: ["Doğru ✓", "Yanlış ✗"], a: x[1] ? "Doğru ✓" : "Yanlış ✗", why: x[1] ? x[2] : "Metne göre: " + x[2], fixed: true }; });
  return [];
}
// seçenek: yalnız Arapçaysa Arapça yazı, Türkçe içeriyorsa karışık
function optHtml(o) { return /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(o) ? '<b>' + arr(o) + '</b>' : '<span class="ar">' + o + '</span>'; }
var ITEMS = {};
function getItems(k) { if (!ITEMS[k]) { ITEMS[k] = shuffle(setItems(k)); ITEMS[k].forEach(function (it) { if (!it.fixed) it.o = shuffle(it.o); }); } return ITEMS[k]; }
function renderAl() {
  var A = ST.al, body = "";
  if (A.set === "makine") body = renderMakine();
  else if (A.set === "soru") {
    var q = SORU[A.k % SORU.length];
    body = '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="lbl">' + (A.k % SORU.length + 1) + ' / ' + SORU.length + '</div><div class="ar qbig">' + q[0] + '</div><div class="muted">' + esc(q[2]) + '</div>' +
      (A.ans ? '<div class="qans"><div class="ar qmid">' + q[1] + '</div></div>' : '') +
      '<div class="row-btns center">' + (A.ans ? '' : '<button class="btn solid big" data-aopen="1">Cevabı göster <kbd>boşluk</kbd></button>') + '<button class="btn big" data-anext="1">Sonraki <kbd>→</kbd></button><button class="btn big ghost" data-say="' + (A.ans ? q[1] : q[0]) + '">🔊</button></div></div>';
  } else {
    var L = getItems(A.set), it = L[A.k % L.length];
    body = '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="qhead"><span class="lbl">' + (A.k % L.length + 1) + ' / ' + L.length + '</span><span class="muted tabular">Sınıf: ' + A.ok + ' / ' + A.n + ' doğru</span></div><div class="qbig">' + it.q + '</div>' +
      '<div class="gopts n' + it.o.length + '">' + it.o.map(function (o, j) {
        var cl = A.ans === null ? "" : o === it.a ? " ok" : A.ans === j ? " no" : " dim";
        return '<button class="gopt' + cl + '" data-aans="' + j + '"' + (A.ans !== null ? " disabled" : "") + '><kbd>' + (j + 1) + '</kbd>' + optHtml(o) + '</button>';
      }).join("") + '</div>' +
      (A.ans !== null ? '<p class="why">' + (it.o[A.ans] === it.a ? "✓ Doğru! " : "✗ Doğrusu: " + optHtml(it.a) + ". ") + arr(it.why) + '</p><div class="row-btns center"><button class="btn solid big" data-anext="1">Sonraki <kbd>→</kbd></button></div>' : '') + '</div>';
  }
  return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Alıştırma seç</div><div class="seg wrapseg" role="group">' + SETS.map(function (x) { return '<button data-aset="' + x[0] + '" aria-pressed="' + (A.set === x[0]) + '">' + x[1] + '</button>'; }).join("") + '</div></div>' + body + '</section>';
}
// fiil biçimleri: mâzi ve muzâri
function vForm(vk, z, b) {
  var v = UM_FIIL[vk], m = v[0], u = v[2], p = v[1];
  if (z === "m") return { e1: m + "َ", d1: m + "َتْ", e2: m + "َا", e3: m + "ُوا", d3: m + "ْنَ" }[b];
  return { e1: "ي" + p + u + "ُ", d1: "ت" + p + u + "ُ", e2: "ي" + p + u + "َانِ", e3: "ي" + p + u + "ُونَ", d3: "ي" + p + u + "ْنَ" }[b];
}
function umCorrect(f) { return UM_FAIL[f][2] === "d" ? "d1" : "e1"; }
// تْ + ال → تِ
function joinVF(verb, fail) { return (/تْ$/.test(verb) && fail.charAt(0) === "ا" ? verb.slice(0, -1) + "ِ" : verb) + " " + fail; }
function umWhy(f) {
  var x = UM_FAIL[f], g = x[2] === "e" ? "eril" : "dişil";
  return "Fâil " + g + (x[3] > 1 ? " ve " + ["", "", "ikil", "çoğul"][x[3]] + "; fiil başta olduğu için yine tekil" : " tekil") + (x[2] === "d" ? ": mâzide تْ, muzâride تَـ." : ": mâzide sonda ek yok, muzâride يَـ.");
}
function renderMakine() {
  var U = ST.um, x = UM_FAIL[U.f], ok = umCorrect(U.f);
  return '<div class="card stack ctrl"><div class="lbl">Fiil–fâil makinesi</div><p class="muted">Bir fâil ve bir fiil seç; sınıf fiilin doğru biçimini bulsun. Öğrencilerin en sık hatası: çoğul fâilde fiili de çoğul yapmak (ذَهَبُوا المُسَافِرُونَ ✗).</p>' +
    '<div class="ctrl-row"><span class="lbl">Fâil</span><div class="pchips">' + UM_FAIL.map(function (y, i) { return '<button class="pchip wide' + (i === U.f ? " on" : "") + '" data-umf="' + i + '"><span class="ar">' + y[0] + '</span><small>' + y[1] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">Fiil</span><div class="pchips">' + Object.keys(UM_FIIL).map(function (k) { return '<button class="pchip wide' + (k === U.v ? " on" : "") + '" data-umv="' + k + '"><span class="ar">' + UM_FIIL[k][0] + 'َ</span><small>' + UM_FIIL[k][3] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">Zaman</span>' + seg("umz", U.z, [["m", "Mâzi"], ["u", "Muzâri"]]) + '</div></div>' +
    '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="ar qbig"><span class="gap">' + (U.pick ? '<span class="' + (U.pick === ok ? "c-fl on ch" : "wrongtxt") + '">' + vForm(U.v, U.z, U.pick) + '</span>' : "؟") + '</span> <span class="c-fa on ch">' + x[0] + '</span></div>' +
    '<div class="gopts n6">' + UM_BICIM.map(function (b) {
      var cl = !U.pick ? "" : b[0] === ok ? " ok" : U.pick === b[0] ? " no" : " dim";
      return '<button class="gopt' + cl + '" data-ump="' + b[0] + '"><span class="ar">' + vForm(U.v, U.z, b[0]) + '</span><small>' + b[1] + '</small></button>';
    }).join("") + '</div>' +
    (U.pick ? '<p class="why">' + (U.pick === ok ? "✓ Doğru! " : "✗ Doğrusu: <span class=\"ar\">" + vForm(U.v, U.z, ok) + "</span>. ") + umWhy(U.f) + '</p><div class="ar qmid">' + joinVF(vForm(U.v, U.z, ok), x[0]) + '</div><div class="trtext big">' + esc(x[1]) + ' ' + (U.z === "m" ? UM_FIIL[U.v][3] : UM_FIIL[U.v][4]) + '.</div>' : '') + '</div>';
}

// ---------- 6 · YARIŞMA ----------
var G = { on: false, n: 12, k: 0, cur: null, ans: null };
function makeQ() {
  var t = pick(["cev", "cev", "uyum", "uyum", "fail", "meful", "irab", "dy", "tur"]), q = {};
  if (t === "cev") {
    var s = pick(CUMLE), other = pick(CUMLE.filter(function (x) { return x !== s; }));
    q.ask = '<div class="lbl">Doğru çeviri hangisi?</div><div class="ar qbig">' + s.ar + '</div>';
    q.o = shuffle([s.tr, s.y, other.tr]).map(function (x) { return { h: '<b class="trtext">' + esc(x) + '</b>', ok: x === s.tr }; });
    q.why = s.tr;
  } else if (t === "dy") {
    var d = pick(DY);
    q.ask = '<div class="lbl">Metne göre doğru mu?</div><div class="ar qbig">' + d[0] + '</div>';
    q.o = [{ h: "<b>Doğru ✓</b>", ok: d[1] }, { h: "<b>Yanlış ✗</b>", ok: !d[1] }];
    q.why = d[1] ? "Doğru." : "Yanlış; metinde: " + d[2];
  } else if (t === "tur") {
    var tr = pick(TUR);
    q.ask = '<div class="lbl">İsim cümlesi mi, fiil cümlesi mi?</div><div class="ar qbig">' + tr[0] + '</div>';
    q.o = TUR_OPTS.map(function (o) { return { h: "<b>" + o[1] + "</b>", ok: o[0] === tr[1] }; });
    q.why = tr[2];
  } else {
    var src = { uyum: UYUM, fail: FAIL, meful: MEFUL, irab: IRAB }[t], u = pick(src);
    var lbl = { uyum: "Fiilin doğru biçimi?", fail: "Fâil hangisi?", meful: "Mef’ûl bih hangisi?", irab: "Doğru hareke hangisi?" }[t];
    q.ask = '<div class="lbl">' + lbl + '</div><div class="ar qbig">' + u[0].replace("___", '<span class="gap">___</span>') + '</div>' + (u[5] ? '<span class="tchip">' + u[5] + '</span>' : '');
    q.o = shuffle([u[1], u[2], u[3]]).map(function (x) { return { h: optHtml(x), ok: x === u[1] }; });
    q.why = u[4];
  }
  return q;
}
function renderYaris() {
  var T = ST.teams;
  if (!G.on) return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Takım yarışması</div><h2>Çeviri ve fiil cümlesi yarışması</h2><p class="muted">Sorular karışık gelir: doğru çeviri, fiilin biçimi, fâili bul, mef’ûlü bul, doğru hareke, isim mi fiil cümlesi mi, doğru–yanlış. Takımlar sırayla cevaplar; 1–3 tuşları da çalışır.</p>' +
    '<div class="ctrl-row"><span class="lbl">Soru</span>' + seg("gn", G.n, [["8", "8"], ["12", "12"], ["16", "16"], ["20", "20"]]) + teamSettings() + '</div><div class="row-btns"><button class="btn solid big" data-gstart="1">Yarışmayı başlat</button></div></div>' + scoreboard() + '</section>';
  if (G.k >= G.n) {
    var best = -1, win = [];
    T.s.slice(0, Math.max(1, T.n)).forEach(function (s, i) { if (s > best) { best = s; win = [i]; } else if (s === best) win.push(i); });
    return '<section class="panel"><div class="board card qcard"><div class="lbl">Yarışma bitti</div><h2 class="winner">' + (T.n < 2 ? "Doğru: " + T.s[0] + " / " + G.n : win.length > 1 ? "Berabere: " + win.map(function (i) { return TEAM_AD[i]; }).join(" · ") : "🏆 " + TEAM_AD[win[0]] + " kazandı!") + '</h2><div class="row-btns center"><button class="btn solid big" data-gstart="1">Yeni yarışma</button></div></div>' + scoreboard() + '</section>';
  }
  var q = G.cur;
  return '<section class="panel"><div class="board card qcard" style="--z:' + ST.zoom + '"><div class="qhead"><span class="muted tabular">Soru ' + (G.k + 1) + ' / ' + G.n + '</span>' + (T.n > 1 ? '<span class="qturn" style="--bc:var(--' + TEAM_COL[T.turn] + ')">Sıra: <b>' + TEAM_AD[T.turn] + '</b></span>' : '') + '</div>' + q.ask +
    '<div class="gopts n' + q.o.length + '">' + q.o.map(function (o, j) { var cl = G.ans === null ? "" : o.ok ? " ok" : G.ans === j ? " no" : " dim"; return '<button class="gopt' + cl + '" data-gans="' + j + '"' + (G.ans !== null ? " disabled" : "") + '><kbd>' + (j + 1) + '</kbd>' + o.h + '</button>'; }).join("") + '</div>' +
    (G.ans !== null ? '<p class="why">' + (q.o[G.ans].ok ? "✓ Doğru! " : "✗ Yanlış. ") + '<span>' + arr(q.why) + '</span></p><div class="row-btns center"><button class="btn solid big" data-gnext="1">Sonraki <kbd>→</kbd></button></div>' : '') + '</div>' + scoreboard() + '<div class="row-btns"><button class="btn small ghost" data-gstop="1">Yarışmayı bitir</button></div></section>';
}
function gAnswer(j) { if (G.ans !== null) return; G.ans = j; if (G.cur.o[j].ok) { ST.teams.s[ST.teams.n > 1 ? ST.teams.turn : 0]++; beep("ok"); } else beep("no"); save(); render(); }
function gNext() { G.k++; rotate(); G.ans = null; G.cur = G.k < G.n ? makeQ() : null; if (G.k >= G.n) beep("win"); save(); render(); }

// ---------- 7 · ÜRETİM ----------
var TUM = [["", "Yok", "", ""], ["ms", "فِي المَسَاءِ", "Akşam", "o"], ["jm", "يَوْمَ الجُمُعَةِ", "Cuma günü", "o"], ["sr", "بِسُرْعَةٍ", "hızla", "f"]];
function renderUret() {
  var K = ST.kur, x = UM_FAIL[K.f], v = UM_FIIL[K.v], objs = v[5].length ? v[5] : v[6]; if (K.o >= objs.length) K.o = 0;
  var verb = vForm(K.v, K.z, umCorrect(K.f)), ob = objs[K.o], tm = TUM.filter(function (y) { return y[0] === K.t; })[0];
  var vf = joinVF(verb, x[0]), ar = vf + " " + ob[0] + (tm[0] ? " " + tm[1] : "") + ".";
  var trv = K.z === "m" ? v[3] : v[4];
  var tr = (tm[3] === "o" ? tm[2] + " " + x[1].charAt(0).toLowerCase() + x[1].slice(1) : x[1]) + " " + ob[1] + " " + (tm[3] === "f" ? tm[2] + " " : "") + trv + ".";
  var vShown = vf.split(" ")[0];
  return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Cümle kurucu</div><h2>Kendi fiil cümleni kur</h2><p class="muted">Fiili, fâili, zamanı ve tümleci seç; kurucu fiili fâile uydurur (dişil → تْ / تَـ, fiil başta tekil) ve Türkçesini yazar. Önce sınıf tahmin etsin!</p>' +
    '<div class="ctrl-row"><span class="lbl">Fiil</span><div class="pchips">' + Object.keys(UM_FIIL).map(function (k) { return '<button class="pchip wide' + (k === K.v ? " on" : "") + '" data-kv="' + k + '"><span class="ar">' + UM_FIIL[k][0] + 'َ</span><small>' + UM_FIIL[k][3] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">Fâil</span><div class="pchips">' + UM_FAIL.map(function (y, i) { return '<button class="pchip wide' + (i === K.f ? " on" : "") + '" data-kf2="' + i + '"><span class="ar">' + y[0] + '</span><small>' + y[1] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">' + (v[5].length ? "Mef’ûl" : "Tümleç") + '</span><div class="pchips">' + objs.map(function (y, i) { return '<button class="pchip wide' + (i === K.o ? " on" : "") + '" data-ko="' + i + '"><span class="ar">' + y[0] + '</span><small>' + y[1] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">Zaman</span>' + seg("kz", K.z, [["m", "Mâzi"], ["u", "Muzâri"]]) + '<span class="lbl">Ek</span>' + seg("kt", K.t, TUM.map(function (y) { return [y[0], y[0] ? '<span class="ar">' + y[1] + '</span>' : "Yok"]; })) + '</div></div>' +
    '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="ar qbig"><span class="ch c-fl on">' + vShown + '</span> <span class="ch c-fa on">' + x[0] + '</span> <span class="ch ' + (v[5].length ? "c-mf" : "c-tm") + ' on">' + ob[0] + '</span>' + (tm[0] ? ' <span class="ch c-tm on">' + tm[1] + '</span>' : '') + '.</div><div class="trtext big">' + esc(tr) + '</div><p class="muted">' + umWhy(K.f) + '</p><div class="row-btns center"><button class="btn ghost" data-say="' + ar + '">🔊 Dinle</button><button class="btn" data-krnd="1">🎲 Rastgele cümle</button></div></div>' +
    '<div class="grid2"><div class="card stack"><div class="lbl">Yazma görevi · 7 dk</div><h3>Kendi yolculuğunu anlat</h3><ol class="howto"><li>Ne zaman yola çıktın? <span class="ar">فِي يَوْمِ… سَافَرْتُ إِلَى…</span></li><li>Neye bindin? <span class="ar">رَكِبْتُ الحَافِلَةَ / القِطَارَ</span></li><li>Seni kim karşıladı? <span class="ar">اِسْتَقْبَلَنِي أَبِي / اِسْتَقْبَلَتْنِي أُمِّي</span></li><li>Ne yaptın, ne gördün? <span class="ar">شَاهَدْتُ… · زُرْتُ…</span></li><li>Ne zaman döndün? <span class="ar">رَجَعْتُ بَعْدَ…</span></li></ol><p class="muted">Her cümle fiille başlasın. Arkadaşından bahsederken fâili açık yaz: <span class="ar">ذَهَبَ أَحْمَدُ · ذَهَبَتْ فَاطِمَةُ</span>.</p></div>' +
    '<div class="card stack"><div class="lbl">Örnek paragraf</div><p class="ar big2">فِي يَوْمِ السَّبْتِ رَكِبَ أَحْمَدُ القِطَارَ وَذَهَبَ إِلَى قُونْيَةَ. اِسْتَقْبَلَتْهُ أُخْتُهُ فِي المَحَطَّةِ. طَبَخَتِ الأُخْتُ طَعَامًا لَذِيذًا. وَفِي المَسَاءِ زَارَ الأَخَوَانِ مَسْجِدًا قَدِيمًا. وَبَعْدَ يَوْمَيْنِ رَجَعَ أَحْمَدُ إِلَى أَنْقَرَةَ.</p><p class="muted">Cumartesi günü Ahmed trene bindi ve Konya’ya gitti. Kız kardeşi onu istasyonda karşıladı. Kız kardeş lezzetli bir yemek pişirdi. Akşam iki kardeş eski bir camiyi ziyaret etti. İki gün sonra Ahmed Ankara’ya döndü.</p></div></div>' +
    '<div class="card stack noprint"><div class="lbl">Ödev</div><h3>Yazdırılabilir çalışma kâğıdı</h3><p class="muted">Metnin ' + CUMLE.length + ' cümlesinin çevirisi ve ' + TRANSFER.length + ' yeni cümlenin Arapçası için boş satırlı kâğıt.</p><div class="row-btns"><button class="btn solid" data-print="1">🖨 Ödevi yazdır</button></div></div>' +
    '<div class="sheet printonly"><div class="sheet-top"><b>رِحْلَةُ حَسَنٍ · Çeviri ve fiil cümlesi ödevi</b><span>Ad Soyad: ____________________ Tarih: __________</span></div>' +
    '<h4>A. Türkçeye çevir; fiilin altını bir, fâilin altını iki, mef’ûlün altını dalgalı çizgiyle çiz. Gizli fâili cümlenin yanına yaz.</h4><ol>' + CUMLE.map(function (s) { return '<li><span class="ar">' + s.ar + '</span><div class="line"></div></li>'; }).join("") + '</ol>' +
    '<h4>B. Arapçaya çevir.</h4><ol>' + TRANSFER.map(function (t) { return '<li>' + esc(t[0]) + '<div class="line"></div></li>'; }).join("") + '</ol></div></section>';
}

// ---------- çatı ----------
function renderTabs() {
  document.getElementById("tabs").innerHTML = '<div class="tabrow">' + TABS.map(function (t) { return '<button role="tab" aria-selected="' + (ST.tab === t[0]) + '" data-tab="' + t[0] + '">' + t[1] + '</button>'; }).join("") + '</div>' +
    '<div class="toolrow">' + clkHtml() + '<span class="tabtools"><button class="btn small ghost" data-zoom="-1" aria-label="Yazıyı küçült">A−</button><button class="btn small ghost" data-zoom="1" aria-label="Yazıyı büyüt">A+</button><button class="btn small ghost" data-full="1">⛶ Tam ekran</button><button class="btn small ghost" data-theme="1">Tema</button></span></div>';
}
function render() {
  renderTabs();
  var f = { plan: renderPlan, kelime: renderKelime, metin: renderMetin, ceviri: renderCeviri, isim: renderIsim, alistirma: renderAl, yaris: renderYaris, uret: renderUret }[ST.tab] || renderPlan;
  main.innerHTML = f();
}
function setTab(t) { ST.tab = t; hush(); save(); render(); window.scrollTo(0, 0); }

document.addEventListener("click", function (e) {
  var tok = e.target.closest("[data-tok]");
  if (tok && ST.tab === "metin") { var p = tok.dataset.tok.split("-"); ST.met.gloss = [+p[0], +p[1]]; return render(); }
  var chEl = e.target.closest("[data-ch]");
  if (chEl && ST.tab === "isim" && ST.isim.quiz) { var ci = +chEl.dataset.ch, s = CUMLE[ST.isim.i]; if (MARK_YOK[s.ch[ci].r] || s.ch[ci].g) return; var cyc = cycleOf(s), cur = ST.isim.mark[ci]; ST.isim.mark[ci] = cyc[(cyc.indexOf(cur) + 1) % cyc.length]; ST.isim.check = false; return render(); }
  var b = e.target.closest("button"); if (!b) return; var d = b.dataset;
  if (d.tab) return setTab(d.tab);
  if (d.full) { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (x) { toast("Tam ekran açılamadı."); } return; }
  if (d.theme) { var r = document.documentElement, cur2 = r.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); r.setAttribute("data-theme", cur2 === "dark" ? "light" : "dark"); store.set("theme", r.getAttribute("data-theme")); return; }
  if (d.zoom) { ST.zoom = Math.max(0.8, Math.min(1.8, Math.round((ST.zoom + 0.2 * +d.zoom) * 10) / 10)); save(); return render(); }
  if (d.say) return say(d.say);
  if (d.hush) return hush();
  if (d.sayall) return say(CUMLE.map(function (s) { return s.ar; }).join(" "));
  if (d.print) { try { window.print(); } catch (x) {} return; }
  // zamanlayıcı
  if (d.stage) { clkStart(+d.stage); return setTab(AKIS[+d.stage][0]); }
  if (d.clk === "pause") { CLK.run = !CLK.run; return renderTabs(); }
  if (d.clk === "next") { var nk = ST.stage + 1; if (nk < AKIS.length) { clkStart(nk); return setTab(AKIS[nk][0]); } return; }
  // takım
  if (d.tn) { ST.teams.n = +d.tn; if (ST.teams.turn >= ST.teams.n) ST.teams.turn = 0; save(); return render(); }
  if (d.treset) { ST.teams.s = [0, 0, 0, 0]; ST.teams.turn = 0; save(); return render(); }
  if (d.tadd) { ST.teams.s[+d.tadd]++; beep("ok"); save(); return render(); }
  if (d.tsub) { ST.teams.s[+d.tsub] = Math.max(0, ST.teams.s[+d.tsub] - 1); save(); return render(); }
  // kelimeler
  var K = ST.kel;
  if (d.kmode) { K.mode = d.kmode; K.flip = {}; return render(); }
  if (d.kf) { K.flip[+d.kf] = !K.flip[+d.kf]; return render(); }
  if (d.kall) { KELIME.forEach(function (_, i) { K.flip[i] = true; }); return render(); }
  if (d.knone) { K.flip = {}; return render(); }
  if (d.kmix) { K.order = shuffle(K.order); K.flip = {}; return render(); }
  if (d.kspot) { K.spot = pick(KELIME.map(function (_, i) { return i; }).filter(function (i) { return i !== K.spot; })); K.spotOpen = false; render(); window.scrollTo(0, 0); return; }
  if (d.kspotopen) { K.spotOpen = true; return render(); }
  if (d.kspotclose) { K.spot = -1; return render(); }
  // metin
  if (d.mt) { ST.met[d.mt] = !ST.met[d.mt]; if (d.mt === "sadeceTr" && ST.met.sadeceTr) ST.met.tr = false; return render(); }
  if (d.msel) { ST.met.sel = ST.met.sel === +d.msel ? -1 : +d.msel; if (ST.met.sel >= 0) say(CUMLE[ST.met.sel].ar); return render(); }
  if (d.gocev) { ST.cev.mode = "at"; ST.cev.i = +d.gocev; ST.cev.step = 0; return setTab("ceviri"); }
  if (d.goisim) { ST.isim.i = +d.goisim; ST.isim.mark = {}; ST.isim.check = false; return setTab("isim"); }
  // çeviri
  var C = ST.cev;
  if (d.cmode) { C.mode = d.cmode; C.i = 0; C.step = 0; return render(); }
  if (d.ci) { C.i = +d.ci; C.step = 0; return render(); }
  if (d.cstep) { C.step = C.step >= +d.cstep ? +d.cstep - 1 : +d.cstep; return render(); }
  if (d.cmove) { var n = cevList().length; C.i = (C.i + n + +d.cmove) % n; C.step = 0; return render(); }
  // isim
  var I = ST.isim;
  if (d.ii) { I.i = +d.ii; I.mark = {}; I.check = false; return render(); }
  if (d.imove) { I.i = (I.i + CUMLE.length + +d.imove) % CUMLE.length; I.mark = {}; I.check = false; return render(); }
  if (d.iq) { I.quiz = d.iq === "1"; I.mark = {}; I.check = false; return render(); }
  if (d.icol) { if (d.icol === "all") I.color = I.color.length >= 3 ? [] : ["fl", "fa", "mf", "tm", "mb", "hb"]; else { var k = I.color.indexOf(d.icol); if (k >= 0) I.color.splice(k, 1); else I.color.push(d.icol); } return render(); }
  if (d.icheck) { I.check = true; var s2 = CUMLE[I.i], good = s2.ch.every(function (c, ci2) { return MARK_YOK[c.r] || c.g || I.mark[ci2] === c.r; }); beep(good ? "win" : "no"); toast(good ? "Hepsi doğru!" : "Kırmızı parçalara tekrar bak."); return render(); }
  if (d.iclear) { I.mark = {}; I.check = false; return render(); }
  // alıştırma
  var A = ST.al;
  if (d.aset) { A.set = d.aset; A.k = 0; A.ans = null; return render(); }
  if (d.aans) { if (A.ans !== null) return; A.ans = +d.aans; var it = getItems(A.set)[A.k % getItems(A.set).length]; A.n++; if (it.o[A.ans] === it.a) { A.ok++; beep("ok"); } else beep("no"); return render(); }
  if (d.aopen) { A.ans = true; return render(); }
  if (d.anext) { A.k++; A.ans = null; return render(); }
  if (d.umf) { ST.um.f = +d.umf; ST.um.pick = null; return render(); }
  if (d.umv) { ST.um.v = d.umv; ST.um.pick = null; return render(); }
  if (d.umz) { ST.um.z = d.umz; ST.um.pick = null; return render(); }
  if (d.ump) { ST.um.pick = d.ump; beep(d.ump === umCorrect(ST.um.f) ? "ok" : "no"); return render(); }
  // yarışma
  if (d.gn) { G.n = +d.gn; return render(); }
  if (d.gstart) { G.on = true; G.k = 0; G.ans = null; ST.teams.s = [0, 0, 0, 0]; ST.teams.turn = 0; G.cur = makeQ(); save(); return render(); }
  if (d.gans) return gAnswer(+d.gans);
  if (d.gnext) return gNext();
  if (d.gstop) { G.on = false; return render(); }
  // üretim
  if (d.kv) { ST.kur.v = d.kv; ST.kur.o = 0; return render(); }
  if (d.kf2) { ST.kur.f = +d.kf2; return render(); }
  if (d.ko) { ST.kur.o = +d.ko; return render(); }
  if (d.kz) { ST.kur.z = d.kz; return render(); }
  if (d.kt !== undefined) { ST.kur.t = d.kt; return render(); }
  if (d.krnd) { var vks = Object.keys(UM_FIIL); ST.kur.v = pick(vks); ST.kur.f = Math.floor(Math.random() * UM_FAIL.length); ST.kur.o = 0; ST.kur.z = pick(["m", "u"]); ST.kur.t = pick(TUM)[0]; return render(); }
});
document.addEventListener("keydown", function (e) {
  if (e.target.closest && e.target.closest("input, textarea, select")) return;
  var k = e.key, t = ST.tab;
  if (t === "ceviri") {
    var C = ST.cev, max = C.mode === "yeni" ? 2 : 3;
    if (k === " ") { e.preventDefault(); C.step = Math.min(max, C.step + 1); return render(); }
    if (k === "ArrowRight" || k === "ArrowLeft") { e.preventDefault(); var n = cevList().length; C.i = (C.i + n + (k === "ArrowRight" ? 1 : -1)) % n; C.step = 0; return render(); }
  }
  if (t === "isim" && (k === "ArrowRight" || k === "ArrowLeft")) { e.preventDefault(); ST.isim.i = (ST.isim.i + CUMLE.length + (k === "ArrowRight" ? 1 : -1)) % CUMLE.length; ST.isim.mark = {}; ST.isim.check = false; return render(); }
  if (t === "kelime" && ST.kel.spot >= 0) {
    if (k === " ") { e.preventDefault(); ST.kel.spotOpen = true; return render(); }
    if (k === "ArrowRight") { e.preventDefault(); ST.kel.spot = pick(KELIME.map(function (_, i) { return i; }).filter(function (i) { return i !== ST.kel.spot; })); ST.kel.spotOpen = false; return render(); }
  }
  if (t === "alistirma") {
    var A = ST.al;
    if (A.set === "soru") { if (k === " " && !A.ans) { e.preventDefault(); A.ans = true; return render(); } if (k === "ArrowRight") { e.preventDefault(); A.k++; A.ans = null; return render(); } }
    else if (A.set !== "makine") {
      var L = getItems(A.set), it = L[A.k % L.length];
      if (A.ans === null && /^[1-9]$/.test(k) && it.o[+k - 1] !== undefined) { e.preventDefault(); A.ans = +k - 1; A.n++; if (it.o[A.ans] === it.a) { A.ok++; beep("ok"); } else beep("no"); return render(); }
      if (A.ans !== null && (k === "ArrowRight" || k === "Enter")) { e.preventDefault(); A.k++; A.ans = null; return render(); }
    }
  }
  if (t === "yaris" && G.on && G.cur) {
    if (G.ans === null && /^[1-4]$/.test(k) && G.cur.o[+k - 1]) { e.preventDefault(); return gAnswer(+k - 1); }
    if (G.ans !== null && (k === "ArrowRight" || k === "Enter")) { e.preventDefault(); return gNext(); }
  }
});
var th = store.get("theme", null); if (th) document.documentElement.setAttribute("data-theme", th);
if (ST.stage >= 0) { CLK.left = AKIS[ST.stage][2] * 60; CLK.run = false; if (!CLK.id) CLK.id = setInterval(function () { if (!CLK.run) return; CLK.left--; clkPaint(); if (CLK.left === 0) { beep("bell"); toast("Süre doldu."); } }, 1000); }
render();
})();
