(function () {
"use strict";
// ---------- yardımcılar ----------
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
var store = {
  get: function (k, d) { try { var v = localStorage.getItem("cersifat:" + k); return v === null ? d : JSON.parse(v); } catch (x) { return d; } },
  set: function (k, v) { try { localStorage.setItem("cersifat:" + k, JSON.stringify(v)); } catch (x) {} }
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
// "+" ile başlayan kelime öncekine bitişik yazılır (بِـ, لِـ)
CUMLE.forEach(function (s, i) {
  s.i = i;
  s.t = s.k.split(" · ").map(function (x) { var p = x.split("|"), att = p[0].charAt(0) === "+"; return { ar: att ? p[0].slice(1) : p[0], att: att, tr: p[1], cer: p[2] || "", sif: p[3] || "" }; });
  s.ar = s.t.map(function (t, j) { return (j && !t.att ? " " : "") + t.ar; }).join("");
});
var HALLER = { r: "Merfû", n: "Mansûb", c: "Mecrûr" };
var CYC = { cer: ["hc", "mj", undefined], sif: ["mv", "sf", undefined] };
// işaretleme kontrolü: mt (و ile bağlı) işaretlenmese de, mecrûr diye işaretlense de doğru
function dogru(e, m) { return e === "mt" ? (!m || m === "mj") : (m || null) === (e || null); }
// opt.layer: cer / sif · opt.color: rolleri renklendir · opt.label: etiket · opt.mark/opt.check: sınıf işaretlemesi
function sentHtml(s, opt) {
  opt = opt || {};
  return s.t.map(function (t, j) {
    var cls = "tok", lab = "", role = opt.layer ? t[opt.layer] : "";
    var nx = s.t[j + 1];
    if (t.att) cls += " att"; if (nx && nx.att) cls += " pre";
    if (opt.mark) {
      var m = opt.mark[j]; cls += " ch mk";
      if (m) { cls += " c-" + m + " on"; lab = ROL[m].k; }
      if (opt.check && (role || m)) cls += dogru(role, m) ? " right" : " wrong";
    } else if (opt.color && role) { cls += " ch c-" + role + " on"; if (opt.label) lab = ROL[role].k; }
    return (j && !t.att ? " " : "") + '<span class="' + cls + '" data-tok="' + s.i + '-' + j + '"' + (lab ? ' data-lab="' + lab + '"' : '') + '>' + t.ar + '</span>';
  }).join("");
}

// ---------- isim ve sıfat biçimleri ----------
var HR = { r: "ُ", n: "َ", c: "ِ" }, TN = { r: "ٌ", n: "ًا", c: "ٍ" };
// k: t (tekil), f (ـَة), i (ikil), fi (ـَتَانِ), cz (ـُونَ), cn (ـَاتٌ)
function ek(st, k, h, def) {
  if (k === "t") return st + (def ? HR[h] : TN[h]);
  if (k === "f") return st + "َة" + (def ? HR[h] : h === "n" ? "ً" : TN[h]);
  if (k === "i") return st + (h === "r" ? "َانِ" : "َيْنِ");
  if (k === "fi") return st + "َت" + (h === "r" ? "َانِ" : "َيْنِ");
  if (k === "cz") return st + (h === "r" ? "ُونَ" : "ِينَ");
  return st + "َات" + (def ? (h === "r" ? "ُ" : "ِ") : (h === "r" ? "ٌ" : "ٍ"));
}
function nForm(nk, h, def) { var N = NOUN[nk]; return ek(def ? N.d : N.a, N.k, h, def); }
// sıfatın eki: tekilde cinsiyet, ikilde ikil, insan çoğulunda çoğul, akılsız çoğulda dişil tekil
function adjKind(nk) { var N = NOUN[nk]; if (N.s === "t") return N.g === "m" ? "t" : "f"; if (N.s === "i") return N.g === "m" ? "i" : "fi"; return N.ins ? (N.g === "m" ? "cz" : "cn") : "f"; }
function aForm(ak, nk, h, def, k) { var A = ADJ[ak]; return ek(def ? A[1] : A[0], k || adjKind(nk), h, def); }
function uyum(nk, h, def) {
  var N = NOUN[nk];
  return (N.s === "c" && !N.ins ? "akılsız çoğul → dişil tekil" : (N.g === "m" ? "müzekker" : "müennes") + " · " + { t: "tekil", i: "ikil", c: "çoğul" }[N.s]) + " · " + HALLER[h].toLowerCase() + " · " + (def ? "belirli" : "belirsiz");
}
function cap(t) { return t.charAt(0).toLocaleUpperCase("tr") + t.slice(1); }
// Türkçe öbek: ci 0 yalın, 1 -i, 2 -e, 3 -de, 4 -den
function trOb(nk, ak, ci, def) {
  var N = NOUN[nk], core = N.tr[!def && ci === 1 ? 0 : ci], adj = ak ? ADJ[ak][2] + " " : "";
  return N.s === "t" && !def ? adj + "bir " + core : (N.s === "i" ? "iki " : "") + adj + core;
}
function disil(nk) { var N = NOUN[nk]; return N.g === "f" || (N.s === "c" && !N.ins); }
// تْ + ال → تِ
function bitis(on, w) { return (/تْ$/.test(on) && w.charAt(0) === "ا" ? on.slice(0, -1) + "ِ" : on) + " "; }
// harf + isim: مِنْ + ال → مِنَ · بِـ bitişik · لِـ + ال → لِلْ
function harfParca(h, w) {
  if (h === "min") return [/^ال/.test(w) ? "مِنَ" : "مِنْ", w, " "];
  if (h === "bi") return ["بِ", w, ""];
  if (h === "li") return ["لِ", /^ال/.test(w) ? w.slice(1) : w, ""];
  return [KURHARF[h].ar, w, " "];
}

// ---------- durum ----------
var TABS = [["plan", "Ders Planı"], ["kelime", "Kelimeler"], ["metin", "Metin"], ["ceviri", "Çeviri"], ["isim", "Kaide ve Analiz"], ["alistirma", "Alıştırmalar"], ["yaris", "Yarışma"], ["uret", "Üretim"]];
var ST = {
  tab: store.get("tab", "plan"), zoom: store.get("zoom", 1),
  kel: { flip: {}, mode: "at", spot: -1, order: KELIME.map(function (_, i) { return i; }) },
  met: { tr: false, renk: "", m: 0, sadeceTr: false, sel: -1, gloss: null },
  cev: { mode: "at", i: 0, step: 0 },
  isim: { i: 0, mod: "cer", mark: {}, check: false },
  tab2: { n: "mdn", a: "qdm", hide: false, shown: {}, hh: false, hs: {} },
  al: { set: "makine", k: 0, ans: null, ok: 0, n: 0, order: {} },
  um: { n: "mdn", a: "qdm", h: "c", def: false, pick: null },
  kur: { h: "ila", n: "tfl", a: "sgr", def: true, sf: true },
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
  return '<section class="panel"><div class="card stack"><div class="lbl">Ders akışı · ' + tot + ' dakika</div><h2>Bugünkü ders: çeviri, harf-i cerler ve sıfat tamlaması</h2>' +
    '<p class="muted">Bir adımı başlat: ilgili sekme açılır ve süre sayılır. Süre bitince zil çalar; ders senin hızında devam eder. Sekmelere istediğin an geçebilirsin.</p>' +
    '<div class="goals"><div><span class="lbl">Hedefler</span><ul><li>İki metni anlayarak okumak ve doğal Türkçeye çevirmek</li><li>Harf-i cerleri (فِي إِلَى مِنْ عَلَى عَنْ بِـ لِـ كَـ) ve anlamlarını tanımak; ardından gelen ismin mecrûr olduğunu görmek</li><li>Bitişik harfleri ve okunuş değişikliklerini bilmek: لِلْحَيَاةِ · مِنَ الكُلِّيَّةِ</li><li>Sıfat tamlamasında dört uyumu (cinsiyet, sayı, hâl, belirlilik) ve akılsız çoğulun dişil tekil sıfatını uygulamak</li><li>Sıfat tamlamasını isim cümlesinden ve izafetten ayırmak</li></ul></div></div>' +
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
function LEGEND(layer) {
  var ks = layer === "cer" ? ["hc", "mj", "mt"] : layer === "sif" ? ["mv", "sf"] : ["hc", "mj", "mv", "sf"];
  return '<div class="legend">' + ks.map(function (k) { return '<span><i class="c-' + k + '"></i>' + ROL[k].tr + '</span>'; }).join("") + '</div>';
}
function rolAd(t) { return [t.cer ? ROL[t.cer].tr : "", t.sif ? ROL[t.sif].tr : ""].filter(Boolean).join(" · "); }
function renderMetin() {
  var M = ST.met;
  var g = M.gloss ? CUMLE[M.gloss[0]].t[M.gloss[1]] : null;
  return '<section class="panel"><div class="card stack ctrl"><div class="ctrl-row">' + seg("mm", M.m, [["0", "İki metin"], ["1", "1. metin"], ["2", "2. metin"]]) +
    '<button class="btn small' + (M.tr ? " solid" : "") + '" data-mt="tr">Türkçe altında</button>' +
    '<button class="btn small' + (M.renk === "cer" ? " solid" : "") + '" data-mrenk="cer">Harf-i cer renkli</button>' +
    '<button class="btn small' + (M.renk === "sif" ? " solid" : "") + '" data-mrenk="sif">Sıfat tamlaması renkli</button>' +
    '<button class="btn small' + (M.sadeceTr ? " solid" : "") + '" data-mt="sadeceTr">Yalnız Türkçe (geri çeviri)</button>' +
    '<button class="btn small" data-sayall="1">🔊 Metni dinle</button><button class="btn small ghost" data-hush="1">■ Durdur</button></div>' +
    '<p class="muted">Bir kelimeye dokun: anlamı aşağıda görünür. Bir cümle numarasına dokun: o cümle seçilir, çevirisi ve sesi gelir.</p></div>' +
    '<div class="board card metin" style="--z:' + ST.zoom + '">' +
    [1, 2].filter(function (m) { return !+M.m || +M.m === m; }).map(function (m) {
      return '<h2 class="ar mbaslik">' + BASLIK[m - 1] + '</h2>' + PARA[m - 1].map(function (p) {
        return '<div class="para' + (M.tr || M.sadeceTr ? " blk" : "") + '">' + CUMLE.filter(function (s) { return s.p === p; }).map(function (s) {
          var sel = M.sel === s.i;
          return '<span class="sent' + (sel ? " sel" : "") + '"><button class="sno" data-msel="' + s.i + '" aria-label="' + (s.i + 1) + '. cümle">' + (s.i + 1) + '</button>' +
            (M.sadeceTr ? '<span class="trtext">' + esc(s.tr) + '</span>' : '<span class="ar">' + sentHtml(s, { layer: M.renk, color: !!M.renk }) + '</span>' + (M.tr ? '<span class="trtext">' + esc(s.tr) + '</span>' : '')) + '</span> ';
        }).join("") + '</div>';
      }).join("");
    }).join("") +
    (M.renk ? LEGEND(M.renk) : '') + '</div>' +
    (g ? '<div class="card gloss"><span class="ar">' + g.ar + '</span> <b>' + esc(g.tr) + '</b> <span class="muted">· ' + (M.gloss[0] + 1) + '. cümle' + (rolAd(g) ? ' · ' + rolAd(g) : '') + '</span><button class="btn small ghost" data-say="' + g.ar + '">🔊</button></div>' : '') +
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
      (C.step >= 1 ? '<div class="wbw">' + s.t.map(function (t) { var r = t.cer || t.sif; return '<span class="wb' + (r ? " c-" + r : "") + '"><span class="ar">' + t.ar + '</span><small>' + esc(t.tr) + '</small></span>'; }).join("") + '</div>' : '') +
      (C.step >= 2 ? (at ? '<div class="cev-a">' + esc(s.tr) + '</div>' : '<div class="ar cev-a">' + s.ar + '</div>') : '') +
      (C.step >= 3 ? '<p class="note">💡 ' + arr(s.n) + '</p>' : '');
  }
  var steps = C.mode === "yeni" ? [["İpucu", 1], ["Arapçası", 2]] : [["Kelime kelime", 1], [C.mode === "at" ? "Çeviri" : "Arapçası", 2], ["Not", 3]];
  return '<section class="panel"><div class="card stack ctrl"><div class="ctrl-row"><span class="lbl">Mod</span>' + seg("cmode", C.mode, [["at", "Arapça → Türkçe"], ["ta", "Türkçe → Arapça"], ["yeni", "Yeni cümleler (TR → AR)"]]) + '</div>' +
    '<div class="pchips">' + L.map(function (x, k) { return (C.mode !== "yeni" && k && x.m !== L[k - 1].m ? '<span class="psep">2. metin</span>' : '') + '<button class="pchip' + (k === C.i ? " on" : "") + '" data-ci="' + k + '">' + (k + 1) + '</button>'; }).join("") + '</div>' +
    '<p class="muted">Önce öğrenciler çevirsin; sonra adım adım aç. Boşluk: sıradaki adım · ← →: önceki / sonraki cümle.</p></div>' +
    '<div class="board card cev" style="--z:' + ST.zoom + '"><div class="lbl">' + (C.i + 1) + ' / ' + n + (C.mode !== "yeni" ? ' · ' + CUMLE[C.i].m + '. metin' : '') + '</div>' + body +
    '<div class="row-btns center">' + steps.map(function (x) { return '<button class="btn' + (C.step >= x[1] ? " solid" : "") + '" data-cstep="' + x[1] + '">' + x[0] + '</button>'; }).join("") +
    '<button class="btn ghost" data-say="' + (C.mode === "yeni" ? TRANSFER[C.i][1] : CUMLE[C.i].ar) + '">🔊</button></div>' +
    '<div class="row-btns center"><button class="btn big ghost" data-cmove="-1">◀ Önceki</button><button class="btn big" data-cmove="1">Sonraki ▶</button></div></div></section>';
}

// ---------- 4 · KAİDE VE ANALİZ ----------
function harfKart() {
  var T = ST.tab2;
  return '<div class="board card stack" style="--z:' + ST.zoom + '"><div class="lbl">Harf-i cerler</div><h2>Sekiz harf, anlamları ve metinden örnekler</h2>' +
    '<div class="row-btns"><button class="btn small' + (T.hh ? " solid" : "") + '" data-hhide="1">' + (T.hh ? "👁 Anlamları göster" : "🙈 Anlamları gizle: sınıf söylesin") + '</button></div>' +
    '<div class="hgrid">' + HARFLER.map(function (h, i) {
      var hid = T.hh && !T.hs[i];
      return '<div class="hkart"><div class="ar hharf c-hc">' + h[0] + '</div>' + (hid ? '<button class="reveal" data-hrev="' + i + '">?</button>' : '<div class="hanlam">' + esc(h[1]) + '</div><div class="ar hor">' + h[2] + '</div><small class="muted">' + esc(h[3]) + '</small>') + '</div>';
    }).join("") + '</div></div>';
}
var SATIR = [["r", "Merfû", "ظَهَرَ(تْ) …"], ["n", "Mansûb", "رَأَيْتُ …"], ["c", "Mecrûr", "نَظَرْتُ إِلَى …"]];
function tamHtml(nk, ak, h, def) { return '<span class="c-mv">' + nForm(nk, h, def) + '</span> <span class="c-sf">' + aForm(ak, nk, h, def) + '</span>'; }
function tabloHtml() {
  var T = ST.tab2, N = NOUN[T.n];
  return '<div class="board card stack" style="--z:' + ST.zoom + '"><div class="lbl">Sıfat tablosu</div><h2>Bir tamlama, altı biçim</h2><p class="muted">Bir isim ve bir sıfat seç. “Gizle”ye bas; sınıf her hücreyi söylesin, sen dokunarak ya da “Sıradaki” ile aç. Sıfat mevsufuna hâlde ve belirlilikte uyar.</p>' +
    '<div class="pchips">' + Object.keys(NOUN).map(function (k) { return '<button class="pchip wide' + (k === T.n ? " on" : "") + '" data-tn2="' + k + '"><span class="ar">' + nForm(k, "r", false) + '</span><small>' + (NOUN[k].s === "i" ? "iki " : "") + NOUN[k].tr[0] + '</small></button>'; }).join("") + '</div>' +
    '<div class="pchips">' + N.sf.map(function (a) { return '<button class="pchip wide' + (a === T.a ? " on" : "") + '" data-tadj="' + a + '"><span class="ar">' + ADJ[a][0] + 'ٌ</span><small>' + ADJ[a][2] + '</small></button>'; }).join("") + '</div>' +
    '<div class="row-btns"><button class="btn small' + (T.hide ? " solid" : "") + '" data-thide="1">' + (T.hide ? "👁 Hepsini göster" : "🙈 Gizle: sınıf söylesin") + '</button>' + (T.hide ? '<button class="btn small solid" data-tnext="1">Sıradaki ▸</button>' : '') + '</div>' +
    '<table class="itab stab"><thead><tr><th></th><th>Belirsiz</th><th>Belirli</th></tr></thead><tbody>' + SATIR.map(function (r) {
      return '<tr><th>' + r[1] + '<small class="ar">' + r[2] + '</small></th>' + [false, true].map(function (def) {
        var id = r[0] + (def ? "d" : "b"), hid = T.hide && !T.shown[id];
        return '<td class="ar">' + (hid ? '<button class="reveal" data-trev="' + id + '">?</button>' : tamHtml(T.n, T.a, r[0], def)) + '</td>';
      }).join("") + '</tr>';
    }).join("") + '</tbody></table>' +
    '<p class="muted">Uyum: ' + uyum(T.n, "r", true).split(" · ").slice(0, -2).join(" · ") + '. Türkçesi: “' + trOb(T.n, T.a, 0, true) + '”, “' + trOb(T.n, T.a, 0, false) + '”.</p></div>';
}
function cerTable(s) {
  if (!s.cer.length) return '<p class="note">' + arr(s.yok || "Bu cümlede harf-i cer yok.") + '</p>';
  return '<table class="ctab"><thead><tr><th>Harf</th><th>Mecrûr</th><th>Alamet</th><th>Not</th></tr></thead><tbody>' + s.cer.map(function (c) {
    return '<tr><td class="ar c-hc" style="color:var(--role)">' + c[0] + '</td><td class="ar c-mj" style="color:var(--role)">' + c[1] + '</td><td>' + arr(c[2]) + '</td><td>' + arr(c[3]) + '</td></tr>';
  }).join("") + '</tbody></table>';
}
function sifTable(s) {
  if (!s.sif.length) return '<p class="note">' + arr(s.yok || "Bu cümlede sıfat tamlaması yok.") + '</p>';
  return '<table class="ctab"><thead><tr><th>Mevsuf</th><th>Sıfat</th><th>Uyum</th><th>Not</th></tr></thead><tbody>' + s.sif.map(function (c) {
    return '<tr><td class="ar c-mv" style="color:var(--role)">' + c[0] + '</td><td class="ar c-sf" style="color:var(--role)">' + c[1] + '</td><td>' + arr(c[2]) + '</td><td>' + arr(c[3]) + '</td></tr>';
  }).join("") + '</tbody></table>';
}
function katman(mod) { return mod === "cer" || mod === "mcer" ? "cer" : "sif"; }
function renderIsim() {
  var I = ST.isim, s = CUMLE[I.i], quiz = I.mod.charAt(0) === "m", L = katman(I.mod);
  return '<section class="panel"><div class="card stack"><div class="lbl">Kaide</div><h2>Harf-i cerler ve sıfat tamlaması</h2><div class="kaide">' +
    KAIDE.map(function (k, i) { return '<div class="kd"><span class="kd-no">' + (i + 1) + '</span><div><b>' + k[0] + '</b><p>' + k[1] + '</p></div></div>'; }).join("") + '</div></div>' +
    harfKart() + tabloHtml() +
    '<div class="card stack ctrl"><div class="lbl">Metindeki cümleler</div><div class="pchips">' + CUMLE.map(function (x, k) { return (k && x.m !== CUMLE[k - 1].m ? '<span class="psep">2. metin</span>' : '') + '<button class="pchip' + (k === I.i ? " on" : "") + '" data-ii="' + k + '">' + (k + 1) + '</button>'; }).join("") + '</div>' +
    '<div class="ctrl-row">' + seg("imod", I.mod, [["cer", "Harf-i cer"], ["sif", "Sıfat tamlaması"], ["mcer", "Sınıf: harf + mecrûr"], ["msif", "Sınıf: mevsuf + sıfat"]]) +
    (quiz ? '<span class="muted">Kelimeye dokun: ' + (L === "cer" ? "harf → mecrûr" : "mevsuf → sıfat") + ' → boş. Cümlede hiç yoksa hiçbir şey işaretleme.</span><button class="btn small solid" data-icheck="1">Kontrol et</button><button class="btn small ghost" data-iclear="1">Temizle</button>' : '') + '</div></div>' +
    '<div class="board card analiz" style="--z:' + ST.zoom + '"><div class="lbl">' + (I.i + 1) + '. cümle · ' + (L === "cer" ? "harf-i cer" : "sıfat tamlaması") + '</div><div class="ar anl">' +
      (quiz ? sentHtml(s, { layer: L, mark: I.mark, check: I.check }) : sentHtml(s, { layer: L, color: true, label: true })) + '</div>' +
      '<div class="muted">' + esc(s.tr) + '</div>' +
      (!quiz || I.check ? (L === "cer" ? cerTable(s) : sifTable(s)) + '<p class="muted">💡 ' + arr(s.n) + '</p>' : '') + LEGEND(L) +
      '<div class="row-btns center"><button class="btn ghost" data-imove="-1">◀ Önceki</button><button class="btn" data-imove="1">Sonraki ▶</button></div></div></section>';
}

// ---------- 5 · ALIŞTIRMALAR ----------
var SETS = [["makine", "Sıfat makinesi"], ["harf", "Harfi seç"], ["mecrur", "Mecrûr biçimi"], ["bicim", "Sıfatın biçimi"], ["terkip", "Tamlama mı, cümle mi?"], ["donustur", "Dönüştür"], ["dy", "Doğru mu, yanlış mı?"], ["soru", "Soru–cevap (sözlü)"]];
function qGap(x) { return '<span class="ar">' + x.replace("___", '<span class="gap">___</span>') + '</span>'; }
function mc(list, f) { return list.map(function (x) { return { q: f(x), o: [x[1], x[2], x[3]], a: x[1], why: x[4] }; }); }
var TERKIP_OPTS = ["st", "iz", "cm"];
function setItems(k) {
  if (k === "harf") return mc(HARF, function (x) { return qGap(x[0]); });
  if (k === "bicim") return mc(BICIM, function (x) { return qGap(x[0]); });
  if (k === "mecrur") return mc(MECRUR, function (x) { return qGap(x[0]); });
  if (k === "terkip") return TERKIP.map(function (x) { return { q: '<div class="lbl">Bu ifade nedir?</div><span class="ar">' + x[0] + '</span>', o: TERKIP_OPTS.map(function (o) { return TERKIP_AD[o]; }), a: TERKIP_AD[x[1]], why: x[2], fixed: true }; });
  if (k === "donustur") return DONUSTUR.map(function (x) { var p = x[0].split(" ← "); return { q: '<span class="ar">' + p[0] + '</span> <span class="tchip">' + arr(p[1]) + '</span>', o: [x[1], x[2], x[3]], a: x[1], why: x[4] }; });
  if (k === "dy") return DY.map(function (x) { return { q: '<span class="ar">' + x[0] + '</span>', o: ["Doğru ✓", "Yanlış ✗"], a: x[1] ? "Doğru ✓" : "Yanlış ✗", why: x[1] ? x[2] : "Metne göre: " + x[2], fixed: true }; });
  return [];
}
function optHtml(o) { return /[A-Za-zÇĞİÖŞÜçğıöşüâîû]/.test(o) ? '<b>' + arr(o) + '</b>' : '<span class="ar">' + o + '</span>'; }
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
// makine çerçevesi: merfû ظَهَرَ(تْ) · mansûb رَأَيْتُ · mecrûr نَظَرْتُ إِلَى
function mCerceve(nk, h) {
  if (h === "r") return { on: disil(nk) ? "ظَهَرَتْ" : "ظَهَرَ", ci: 0, son: " göründü.", why: "Fâil merfûdur; sıfatı da merfû." + (NOUN[nk].s === "c" && !NOUN[nk].ins ? " Akılsız çoğul olduğu için fiil de dişil: ظَهَرَتْ." : "") };
  if (h === "n") return { on: "رَأَيْتُ", ci: 1, son: " gördüm.", why: "Mef’ûl bih mansûbdur; sıfatı da mansûb." };
  return { on: "نَظَرْتُ إِلَى", ci: 2, son: " baktım.", why: "إِلَى mevsufu mecrûr yapar; sıfat ona uyduğu için o da mecrûr." };
}
function makineSecenek(U) {
  var ok = aForm(U.a, U.n, U.h, U.def), N = NOUN[U.n], k = adjKind(U.n), out = [ok];
  function add(f) { if (out.indexOf(f) < 0) out.push(f); }
  // yanlış cinsiyet / sayı
  var alt = { t: "f", f: N.s === "c" ? "cz" : "t", i: "fi", fi: "i", cz: "t", cn: "f" }[k];
  if (N.s === "c" && !N.ins) alt = "t";
  add(aForm(U.a, U.n, U.h, U.def, alt));
  // yanlış hâl
  ["r", "n", "c"].some(function (h) { var f = aForm(U.a, U.n, h, U.def); if (out.indexOf(f) < 0) { add(f); return true; } return false; });
  // yanlış belirlilik
  add(aForm(U.a, U.n, U.h, !U.def));
  return out.slice(0, 4);
}
var MK_OPTS = null;
function renderMakine() {
  var U = ST.um, ok = aForm(U.a, U.n, U.h, U.def), fr = mCerceve(U.n, U.h), w = nForm(U.n, U.h, U.def), N = NOUN[U.n];
  if (!MK_OPTS) MK_OPTS = shuffle(makineSecenek(U));
  var tr = cap(trOb(U.n, U.a, fr.ci, U.def)) + fr.son;
  return '<div class="card stack ctrl"><div class="lbl">Sıfat makinesi</div><p class="muted">İsmi, sıfatı, hâli ve belirliliği seç; sıfat boşluklu çıkar, sınıf doğru biçimi bulsun. Yanlışta makine nedenini söyler.</p>' +
    '<div class="ctrl-row"><span class="lbl">İsim</span><div class="pchips">' + Object.keys(NOUN).map(function (k) { return '<button class="pchip wide' + (k === U.n ? " on" : "") + '" data-umn="' + k + '"><span class="ar">' + nForm(k, "r", false) + '</span><small>' + (NOUN[k].s === "i" ? "iki " : "") + NOUN[k].tr[0] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">Sıfat</span><div class="pchips">' + N.sf.map(function (a) { return '<button class="pchip wide' + (a === U.a ? " on" : "") + '" data-uma="' + a + '"><span class="ar">' + ADJ[a][0] + 'ٌ</span><small>' + ADJ[a][2] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">Hâl</span>' + seg("umh", U.h, [["r", "Merfû (fâil)"], ["n", "Mansûb (mef’ûl)"], ["c", "Mecrûr (harf-i cer)"]]) + seg("umd", U.def ? "1" : "0", [["0", "Belirsiz"], ["1", "Belirli (ال)"]]) + '</div></div>' +
    '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="ar qbig">' + bitis(fr.on, w) + '<span class="c-mv">' + w + '</span> <span class="gap">' + (U.pick ? '<span class="' + (U.pick === ok ? "c-sf" : "wrongtxt") + '">' + U.pick + '</span>' : "؟") + '</span></div><div class="trtext big">' + esc(tr) + '</div>' +
    '<div class="gopts n' + MK_OPTS.length + '">' + MK_OPTS.map(function (o) {
      var cl = !U.pick ? "" : o === ok ? " ok" : U.pick === o ? " no" : " dim";
      return '<button class="gopt' + cl + '" data-ump="' + o + '"><span class="ar">' + o + '</span></button>';
    }).join("") + '</div>' +
    (U.pick ? '<p class="why">' + (U.pick === ok ? "✓ Doğru! " : "✗ Doğrusu: <span class=\"ar\">" + ok + "</span>. ") + fr.why + ' Uyum: ' + uyum(U.n, U.h, U.def) + '.</p><div class="ar qmid">' + bitis(fr.on, w) + w + ' ' + ok + '.</div>' : '') + '</div>';
}

// ---------- 6 · YARIŞMA ----------
var G = { on: false, n: 12, k: 0, cur: null, ans: null };
function makeQ() {
  var t = pick(["cev", "cev", "harf", "harf", "bicim", "bicim", "mecrur", "terkip", "terkip", "dy"]), q = {};
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
  } else if (t === "terkip") {
    var tb = pick(TERKIP);
    q.ask = '<div class="lbl">Bu ifade nedir?</div><div class="ar qbig">' + tb[0] + '</div>';
    q.o = TERKIP_OPTS.map(function (o) { return { h: "<b>" + TERKIP_AD[o] + "</b>", ok: o === tb[1] }; });
    q.why = tb[2];
  } else {
    var u = pick(t === "harf" ? HARF : t === "mecrur" ? MECRUR : BICIM);
    q.ask = '<div class="lbl">' + (t === "harf" ? "Hangi harf-i cer?" : t === "mecrur" ? "Doğru mecrûr biçim hangisi?" : "Sıfatın doğru biçimi hangisi?") + '</div><div class="ar qbig">' + u[0].replace("___", '<span class="gap">___</span>') + '</div>';
    q.o = shuffle([u[1], u[2], u[3]]).map(function (x) { return { h: optHtml(x), ok: x === u[1] }; });
    q.why = u[4];
  }
  return q;
}
function renderYaris() {
  var T = ST.teams;
  if (!G.on) return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Takım yarışması</div><h2>Harf-i cer ve sıfat yarışması</h2><p class="muted">Sorular karışık gelir: doğru çeviri, harfi seç, sıfatın biçimi, mecrûr biçim, tamlama mı cümle mi, doğru–yanlış. Takımlar sırayla cevaplar; 1–3 tuşları da çalışır.</p>' +
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
var HALTR = ["yalın", "-i", "-e", "-de", "-den"];
function kurCumle() {
  var K = ST.kur, N = NOUN[K.n], H = KURHARF[K.h], fr = N.ins ? H.ins : H.yer;
  var w = nForm(K.n, "c", K.def), adj = K.sf ? aForm(K.a, K.n, "c", K.def) : "", p = harfParca(K.h, w);
  return {
    html: fr[0] + ' <span class="c-hc">' + p[0] + '</span>' + p[2] + '<span class="c-mj">' + p[1] + '</span>' + (adj ? ' <span class="c-sf">' + adj + '</span>' : '') + '.',
    ar: fr[0] + " " + p[0] + p[2] + p[1] + (adj ? " " + adj : "") + ".",
    tr: cap(trOb(K.n, K.sf ? K.a : null, fr[1], K.def)) + fr[2] + " " + fr[3] + ".",
    why: fr[0] + " " + H.ar + ": Türkçede " + (fr[2] ? "“" + fr[2].trim() + "”" : HALTR[fr[1]] + " hâli") + ". " + H.ar + " ismi mecrûr yapar" + (adj ? "; sıfat ona uyar (" + uyum(K.n, "c", K.def) + ")." : ".") +
      (K.h === "li" && K.def ? " لِـ + ال → لِلْ." : K.h === "min" && K.def ? " مِنْ + ال → مِنَ." : K.h === "bi" ? " بِـ kelimeye bitişik yazılır." : "")
  };
}
function renderUret() {
  var K = ST.kur, N = NOUN[K.n], c = kurCumle();
  return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Cümle kurucu</div><h2>Harf + sıfat tamlaması kur</h2><p class="muted">Harfi, ismi ve sıfatı seç; belirli mi belirsiz mi olacağına karar ver. Kurucu çerçeve fiili seçer, ismi ve sıfatı mecrûr yapar, Türkçesini yazar. Önce sınıf tahmin etsin!</p>' +
    '<div class="ctrl-row"><span class="lbl">Harf</span>' + seg("kh", K.h, Object.keys(KURHARF).map(function (h) { return [h, '<span class="ar">' + KURHARF[h].ar + '</span>']; })) + '</div>' +
    '<div class="ctrl-row"><span class="lbl">İsim</span><div class="pchips">' + Object.keys(NOUN).map(function (k) { return '<button class="pchip wide' + (k === K.n ? " on" : "") + '" data-kn2="' + k + '"><span class="ar">' + nForm(k, "r", false) + '</span><small>' + (NOUN[k].s === "i" ? "iki " : "") + NOUN[k].tr[0] + '</small></button>'; }).join("") + '</div></div>' +
    '<div class="ctrl-row"><span class="lbl">Sıfat</span><div class="pchips">' + N.sf.map(function (a) { return '<button class="pchip wide' + (a === K.a ? " on" : "") + '" data-ka="' + a + '"><span class="ar">' + ADJ[a][0] + 'ٌ</span><small>' + ADJ[a][2] + '</small></button>'; }).join("") + '</div>' +
    seg("kd", K.def ? "1" : "0", [["0", "Belirsiz"], ["1", "Belirli (ال)"]]) + '<button class="btn small' + (K.sf ? " solid" : "") + '" data-ksf="1">' + (K.sf ? "Sıfat var" : "Sıfat yok") + '</button></div></div>' +
    '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="ar qbig">' + c.html + '</div><div class="trtext big">' + esc(c.tr) + '</div><p class="muted">' + arr(c.why) + '</p><div class="row-btns center"><button class="btn ghost" data-say="' + c.ar + '">🔊 Dinle</button><button class="btn" data-krnd="1">🎲 Rastgele cümle</button></div></div>' +
    '<div class="grid2"><div class="card stack"><div class="lbl">Yazma görevi · 8 dk</div><h3>Şehrini anlat</h3><ol class="howto"><li>Nerede oturuyorsun? <span class="ar">أَسْكُنُ فِي مَدِينَةٍ…</span></li><li>Şehrinde neler var? <span class="ar">فِي مَدِينَتِي سُوقٌ قَدِيمٌ…</span></li><li>Okula neyle gidiyorsun? <span class="ar">أَذْهَبُ إِلَى المَدْرَسَةِ بِـ…</span></li><li>Hasta olunca kime gidersin? <span class="ar">أَذْهَبُ إِلَى الطَّبِيبِ…</span></li><li>Şehrine kimler, nereden gelir? <span class="ar">يَحْضُرُ إِلَى مَدِينَتِي سُيَّاحٌ كَثِيرُونَ مِنْ…</span></li></ol><p class="muted">Her cümlede bir harf-i cer ve bir sıfat tamlaması olsun. Harfi kırmızı, mecrûru mavi, sıfatı mor kalemle çiz.</p></div>' +
    '<div class="card stack"><div class="lbl">Örnek paragraf</div><p class="ar big2">أَسْكُنُ فِي مَدِينَةٍ جَمِيلَةٍ. فِي مَدِينَتِي سُوقٌ قَدِيمٌ وَمَسْجِدٌ كَبِيرٌ. أَذْهَبُ إِلَى المَدْرَسَةِ الجَدِيدَةِ بِالحَافِلَةِ. أَجْلِسُ مَعَ صَدِيقِي النَّشِيطِ فِي الصَّفِّ. فِي الصَّيْفِ يَحْضُرُ إِلَى مَدِينَتِي سُيَّاحٌ كَثِيرُونَ مِنْ بِلَادٍ بَعِيدَةٍ.</p><p class="muted">Güzel bir şehirde oturuyorum. Şehrimde eski bir çarşı ve büyük bir cami var. Yeni okula otobüsle gidiyorum. Sınıfta çalışkan arkadaşımla oturuyorum. Yazın şehrime uzak ülkelerden birçok turist gelir.</p></div></div>' +
    '<div class="card stack noprint"><div class="lbl">Ödev</div><h3>Yazdırılabilir çalışma kâğıdı</h3><p class="muted">İki metnin ' + CUMLE.length + ' cümlesinin çevirisi, ' + TRANSFER.length + ' yeni cümlenin Arapçası ve boş sıfat tablosu.</p><div class="row-btns"><button class="btn solid" data-print="1">🖨 Ödevi yazdır</button></div></div>' +
    '<div class="sheet printonly"><div class="sheet-top"><b>الطِّفْلُ المَرِيضُ · إِسْطَنْبُولُ · Harf-i cer ve sıfat tamlaması ödevi</b><span>Ad Soyad: ____________________ Tarih: __________</span></div>' +
    '<h4>A. Türkçeye çevir; harf-i ceri daire içine al, mecrûrun ve sıfat tamlamasının altını çiz.</h4><ol>' + CUMLE.map(function (s) { return '<li><span class="ar">' + s.ar + '</span><div class="line"></div></li>'; }).join("") + '</ol>' +
    '<h4>B. Arapçaya çevir.</h4><ol>' + TRANSFER.map(function (t) { return '<li>' + esc(t[0]) + '<div class="line"></div></li>'; }).join("") + '</ol>' +
    '<h4>C. Tabloyu doldur: مَدِينَةٌ قَدِيمَةٌ ve أَسْوَاقٌ قَدِيمَةٌ</h4><table class="itab print"><thead><tr><th></th><th>Belirsiz</th><th>Belirli</th></tr></thead><tbody>' + ["Merfû", "Mansûb", "Mecrûr (فِي ile)"].map(function (r) { return '<tr><th>' + r + '</th><td></td><td></td></tr>'; }).join("") + '</tbody></table></div></section>';
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
function umReset() { ST.um.pick = null; MK_OPTS = null; }
function sfFix(o) { var L = NOUN[o.n].sf; if (L.indexOf(o.a) < 0) o.a = L[0]; }

document.addEventListener("click", function (e) {
  var tok = e.target.closest("[data-tok]");
  if (tok && ST.tab === "metin") { var p = tok.dataset.tok.split("-"); ST.met.gloss = [+p[0], +p[1]]; return render(); }
  if (tok && ST.tab === "isim" && ST.isim.mod.charAt(0) === "m") { var tj = +tok.dataset.tok.split("-")[1], cyc = CYC[katman(ST.isim.mod)], cur = ST.isim.mark[tj]; ST.isim.mark[tj] = cyc[(cyc.indexOf(cur) + 1) % cyc.length]; ST.isim.check = false; return render(); }
  var b = e.target.closest("button"); if (!b) return; var d = b.dataset;
  if (d.tab) return setTab(d.tab);
  if (d.full) { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (x) { toast("Tam ekran açılamadı."); } return; }
  if (d.theme) { var r = document.documentElement, cur2 = r.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); r.setAttribute("data-theme", cur2 === "dark" ? "light" : "dark"); store.set("theme", r.getAttribute("data-theme")); return; }
  if (d.zoom) { ST.zoom = Math.max(0.8, Math.min(1.8, Math.round((ST.zoom + 0.2 * +d.zoom) * 10) / 10)); save(); return render(); }
  if (d.say) return say(d.say);
  if (d.hush) return hush();
  if (d.sayall) return say(CUMLE.filter(function (s) { return !+ST.met.m || s.m === +ST.met.m; }).map(function (s) { return s.ar; }).join(" "));
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
  if (d.mrenk) { ST.met.renk = ST.met.renk === d.mrenk ? "" : d.mrenk; return render(); }
  if (d.mm) { ST.met.m = +d.mm; return render(); }
  if (d.msel) { ST.met.sel = ST.met.sel === +d.msel ? -1 : +d.msel; if (ST.met.sel >= 0) say(CUMLE[ST.met.sel].ar); return render(); }
  if (d.gocev) { ST.cev.mode = "at"; ST.cev.i = +d.gocev; ST.cev.step = 0; return setTab("ceviri"); }
  if (d.goisim) { ST.isim.i = +d.goisim; ST.isim.mark = {}; ST.isim.check = false; return setTab("isim"); }
  // çeviri
  var C = ST.cev;
  if (d.cmode) { C.mode = d.cmode; C.i = 0; C.step = 0; return render(); }
  if (d.ci) { C.i = +d.ci; C.step = 0; return render(); }
  if (d.cstep) { C.step = C.step >= +d.cstep ? +d.cstep - 1 : +d.cstep; return render(); }
  if (d.cmove) { var n = cevList().length; C.i = (C.i + n + +d.cmove) % n; C.step = 0; return render(); }
  // analiz
  var I = ST.isim;
  if (d.ii) { I.i = +d.ii; I.mark = {}; I.check = false; return render(); }
  if (d.imove) { I.i = (I.i + CUMLE.length + +d.imove) % CUMLE.length; I.mark = {}; I.check = false; return render(); }
  if (d.imod) { I.mod = d.imod; I.mark = {}; I.check = false; return render(); }
  if (d.icheck) { I.check = true; var s2 = CUMLE[I.i], L2 = katman(I.mod), good = s2.t.every(function (t, tj) { return dogru(t[L2], I.mark[tj]); }); beep(good ? "win" : "no"); toast(good ? "Hepsi doğru!" : "Kırmızı çerçeveli kelimelere tekrar bak."); return render(); }
  if (d.iclear) { I.mark = {}; I.check = false; return render(); }
  if (d.hhide) { ST.tab2.hh = !ST.tab2.hh; ST.tab2.hs = {}; return render(); }
  if (d.hrev) { ST.tab2.hs[d.hrev] = 1; return render(); }
  if (d.tn2) { ST.tab2.n = d.tn2; sfFix(ST.tab2); ST.tab2.shown = {}; return render(); }
  if (d.tadj) { ST.tab2.a = d.tadj; ST.tab2.shown = {}; return render(); }
  if (d.thide) { ST.tab2.hide = !ST.tab2.hide; ST.tab2.shown = {}; return render(); }
  if (d.trev) { ST.tab2.shown[d.trev] = 1; return render(); }
  if (d.tnext) { var ids = ["rb", "rd", "nb", "nd", "cb", "cd"], nx = ids.filter(function (x) { return !ST.tab2.shown[x]; })[0]; if (nx) ST.tab2.shown[nx] = 1; else { toast("Tablo tamam. Aferin!"); beep("win"); } return render(); }
  // alıştırma
  var A = ST.al;
  if (d.aset) { A.set = d.aset; A.k = 0; A.ans = null; return render(); }
  if (d.aans) { if (A.ans !== null) return; A.ans = +d.aans; var it = getItems(A.set)[A.k % getItems(A.set).length]; A.n++; if (it.o[A.ans] === it.a) { A.ok++; beep("ok"); } else beep("no"); return render(); }
  if (d.aopen) { A.ans = true; return render(); }
  if (d.anext) { A.k++; A.ans = null; return render(); }
  if (d.umn) { ST.um.n = d.umn; sfFix(ST.um); umReset(); return render(); }
  if (d.uma) { ST.um.a = d.uma; umReset(); return render(); }
  if (d.umh) { ST.um.h = d.umh; umReset(); return render(); }
  if (d.umd) { ST.um.def = d.umd === "1"; umReset(); return render(); }
  if (d.ump) { if (ST.um.pick) return; ST.um.pick = d.ump; beep(d.ump === aForm(ST.um.a, ST.um.n, ST.um.h, ST.um.def) ? "ok" : "no"); return render(); }
  // yarışma
  if (d.gn) { G.n = +d.gn; return render(); }
  if (d.gstart) { G.on = true; G.k = 0; G.ans = null; ST.teams.s = [0, 0, 0, 0]; ST.teams.turn = 0; G.cur = makeQ(); save(); return render(); }
  if (d.gans) return gAnswer(+d.gans);
  if (d.gnext) return gNext();
  if (d.gstop) { G.on = false; return render(); }
  // üretim
  if (d.kh) { ST.kur.h = d.kh; return render(); }
  if (d.kn2) { ST.kur.n = d.kn2; sfFix(ST.kur); return render(); }
  if (d.ka) { ST.kur.a = d.ka; return render(); }
  if (d.kd) { ST.kur.def = d.kd === "1"; return render(); }
  if (d.ksf) { ST.kur.sf = !ST.kur.sf; return render(); }
  if (d.krnd) { ST.kur.h = pick(Object.keys(KURHARF)); ST.kur.n = pick(Object.keys(NOUN)); ST.kur.a = pick(NOUN[ST.kur.n].sf); ST.kur.def = Math.random() < 0.5; ST.kur.sf = Math.random() < 0.8; return render(); }
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
