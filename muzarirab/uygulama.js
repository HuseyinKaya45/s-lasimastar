(function () {
"use strict";
// ---------- yardımcılar ----------
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
var store = {
  get: function (k, d) { try { var v = localStorage.getItem("muzarirab:" + k); return v === null ? d : JSON.parse(v); } catch (x) { return d; } },
  set: function (k, v) { try { localStorage.setItem("muzarirab:" + k, JSON.stringify(v)); } catch (x) {} }
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
CUMLE.forEach(function (s, i) {
  s.i = i;
  s.t = s.k.split(" · ").map(function (x) { var p = x.split("|"); return { ar: p[0], tr: p[1], rol: p[2] || "" }; });
  s.ar = s.t.map(function (t) { return t.ar; }).join(" ");
});
var HALLER = { r: "Merfû", n: "Mansûb", c: "Meczûm" }, HRENK = { r: "mr", n: "mn", c: "mc" };
var CYC = { hal: ["r", "n", "c", undefined], edat: ["en", "ec", undefined] };
function beklenen(t, mod) { return mod === "hal" ? HAL_ROL[t.rol] || null : (t.rol === "en" || t.rol === "ec" ? t.rol : null); }
function markable(t, mod) { return mod === "edat" || !!HAL_ROL[t.rol]; }
function dogru(e, m) { return (m || null) === (e || null); }
// opt.color: rolleri renklendir · opt.label: etiket · opt.mark/opt.mod/opt.check: sınıf işaretlemesi
function sentHtml(s, opt) {
  opt = opt || {};
  return s.t.map(function (t, j) {
    var cls = "tok", lab = "";
    if (opt.mark) {
      if (markable(t, opt.mod)) {
        var m = opt.mark[j], e = beklenen(t, opt.mod); cls += " ch mk";
        if (m) { cls += " c-" + (opt.mod === "hal" ? HRENK[m] : m) + " on"; lab = opt.mod === "hal" ? HALLER[m] : ROL[m].k; }
        if (opt.check && (e || m)) cls += dogru(e, m) ? " right" : " wrong";
      }
    } else if (opt.color && t.rol) { cls += " ch c-" + t.rol + " on"; if (opt.label) lab = ROL[t.rol].k; }
    return '<span class="' + cls + '" data-tok="' + s.i + '-' + j + '"' + (lab ? ' data-lab="' + lab + '"' : '') + '>' + t.ar + '</span>';
  }).join(" ");
}

// ---------- muzâri biçimleri ----------
var SON = { s: { r: "ُ", n: "َ", c: "ْ" }, y: { r: "ي", n: "يَ", c: "" }, w: { r: "و", n: "وَ", c: "" }, a: { r: "ى", n: "ى", c: "" } };
function vForm(vk, pk, h) {
  var V = FIIL[vk], P = SAHIS[pk];
  if (P[2] === "s") return P[1] + V.b + SON[V.t][h];
  var hb = V.h[P[2]]; if (h === "r") return P[1] + hb;
  var d = hb.slice(0, -2); if (/وْ?$/.test(d)) d += "ا"; return P[1] + d;
}
function hamse(pk) { return SAHIS[pk][2] !== "s"; }
function alametTx(vk, pk, h) {
  if (hamse(pk)) return h === "r" ? "nûnun sübûtu (nûn kalır)" : "nûnun hazfı (nûn düşer)";
  var t = FIIL[vk].t;
  if (t === "s") return { r: "ötre", n: "üstün", c: "sükûn" }[h];
  if (t === "a") return { r: "takdiri ötre (elifte görünmez)", n: "takdiri üstün (elifte görünmez)", c: "elif düşer" }[h];
  return { r: "takdiri ötre (görünmez)", n: "üstün (görünür)", c: "son harf (" + (t === "y" ? "ي" : "و") + ") düşer" }[h];
}
function tuzakForm(vk, pk, h) {
  var V = FIIL[vk], P = SAHIS[pk];
  if (hamse(pk)) {
    if (P[2] === 2) return P[1] + V.b + SON[V.t][h];
    if (P[2] === 1) { var d = V.h[0]; if (h !== "r") { d = d.slice(0, -2); if (/وْ?$/.test(d)) d += "ا"; } return P[1] + d; }
    return h === "r" ? P[1] + V.b + SON[V.t].r : P[1] + V.h[0].slice(0, -2);
  }
  if ((V.t === "y" || V.t === "w") && h === "c") return P[1] + V.b + (V.t === "y" ? "ي" : "و") + "ْ";
  if (V.t === "a" && h === "c") return P[1] + V.b + "يْ";
  if (V.t === "a" && h === "n") return P[1] + V.b + "يَ";
  return null;
}
function secenek(vk, pk, h) { var o = []; ["r", "n", "c"].forEach(function (x) { var f = vForm(vk, pk, x); if (o.indexOf(f) < 0) o.push(f); }); var t = tuzakForm(vk, pk, h); if (t && o.indexOf(t) < 0) o.push(t); return o; }
// ---------- Türkçe çekim ----------
function lastV(s) { var m = s.match(/[aeıioöuü]/g); return m ? m[m.length - 1] : "a"; }
function I4(v) { return { a: "ı", ı: "ı", e: "i", i: "i", o: "u", u: "u", ö: "ü", ü: "ü" }[v]; }
function trCekim(ts, per, kip) {
  var v = lastV(ts), e = /[eiöü]/.test(v) ? "e" : "a", I = e === "a" ? "ı" : "i", vf = /[aeıioöuü]$/.test(ts), y = vf ? "y" : "";
  var YOR = { "1s": "um", "2s": "sun", "3s": "", "1p": "uz", "2p": "sunuz", "3p": "lar" };
  if (kip === "pres") return (vf ? ts.slice(0, -1) + I4(lastV(ts.slice(0, -1))) : ts + I4(v)) + "yor" + YOR[per];
  if (kip === "neg") return ts + "m" + I4(v) + "yor" + YOR[per];
  if (kip === "past") return ts + "m" + e + "d" + I + { "1s": "m", "2s": "n", "3s": "", "1p": "k", "2p": "n" + I + "z", "3p": "l" + e + "r" }[per];
  if (kip === "fut") return ts + "m" + e + "y" + e + "c" + e + { "1s": "ğ" + I + "m", "2s": "ks" + I + "n", "3s": "k", "1p": "ğ" + I + "z", "2p": "ks" + I + "n" + I + "z", "3p": "kl" + e + "r" }[per];
  if (kip === "gerek") return ts + "m" + e + "l" + I + { "1s": "y" + I + "m", "2s": "s" + I + "n", "3s": "", "1p": "y" + I + "z", "2p": "s" + I + "n" + I + "z", "3p": "l" + e + "r" }[per];
  if (kip === "diye") return { "1s": ts + y + e + "y" + I + "m", "2s": ts + y + e + "s" + I + "n", "3s": ts + "s" + I4(v) + "n", "1p": ts + y + e + "l" + I + "m", "2p": ts + y + e + "s" + I + "n" + I + "z", "3p": ts + "s" + I4(v) + "nl" + e + "r" }[per] + " diye";
  return per === "2p" ? ts + "m" + e + "y" + I + "n" : ts + "m" + e;
}
function cap(t) { return t.charAt(0).toLocaleUpperCase("tr") + t.slice(1); }
function ikinci(pk) { return pk === "nt" || pk === "ni" || pk === "tm"; }
// cümle: [Arapça başı, fiil, son] · Türkçe · açıklama
function kurCumle(vk, pk, ek) {
  var E = EDATLAR[ek], P = SAHIS[pk], V = FIIL[vk], h = E[1], f = vForm(vk, pk, h), bas, son = ".";
  if (ek === "an") bas = "يَجِبُ أَنْ";
  else if (ek === "nh") { bas = "لَا"; son = "!"; }
  else if (ek === "ky" || ek === "ht") bas = E[0];
  else bas = P[0] + (E[0] ? " " + E[0] : "");
  var tf = trCekim(V.ts, P[3], E[3]), tr = ek === "nh" ? cap(tf) + "!" : cap(P[4]) + " " + tf + (E[3] === "diye" ? "…" : ".");
  var neden = h === "r" ? (ek === "nf" ? "Olumsuzluk لَا’sı fiili etkilemez: merfû." : "Önünde nâsıb ya da câzim yok: merfû.") : h === "n" ? E[0] + " nasb eder: mansûb." : E[0] + (ek === "nh" ? " (yasak)" : "") + " cezm eder: meczûm.";
  return { bas: bas, f: f, son: son, h: h, ar: bas + " " + f + son, tr: tr, why: neden + " Alamet: " + alametTx(vk, pk, h) + "." };
}

// ---------- durum ----------
var TABS = [["plan", "Ders Planı"], ["kelime", "Kelimeler"], ["metin", "Metin"], ["ceviri", "Çeviri"], ["isim", "Kaide ve Analiz"], ["alistirma", "Alıştırmalar"], ["yaris", "Yarışma"], ["uret", "Üretim"]];
var ST = {
  tab: store.get("tab", "plan"), zoom: store.get("zoom", 1),
  kel: { flip: {}, mode: "at", spot: -1, order: KELIME.map(function (_, i) { return i; }) },
  met: { tr: false, renk: false, sadeceTr: false, sel: -1, gloss: null },
  cev: { mode: "at", i: 0, step: 0 },
  isim: { i: 0, mod: "goster", mark: {}, check: false },
  tab2: { v: "jry", hide: false, shown: {} },
  al: { set: "makine", k: 0, ans: null, ok: 0, n: 0, order: {} },
  um: { v: "jry", p: "nt", e: "lm", pick: null },
  kur: { v: "trk", p: "tm", e: "nf" },
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
  return '<section class="panel"><div class="card stack"><div class="lbl">Ders akışı · ' + tot + ' dakika</div><h2>Bugünkü ders: çeviri ve muzâri fiilin i’rabı</h2>' +
    '<p class="muted">Bir adımı başlat: ilgili sekme açılır ve süre sayılır. Süre bitince zil çalar; ders senin hızında devam eder. Sekmelere istediğin an geçebilirsin.</p>' +
    '<div class="goals"><div><span class="lbl">Hedefler</span><ul><li>Üç kıssayı anlayarak okumak ve doğal Türkçeye çevirmek</li><li>Muzâri fiilin merfû, mansûb ve meczûm hâllerini tanımak</li><li>Nasb edatlarını (أَنْ لَنْ كَيْ حَتَّى لِـ) ve cezm edatlarını (لَمْ لَمَّا لَا لِـ) bilmek; etkilemeyen edatları ayırmak</li><li>Alametleri uygulamak: sahih, sonu ي / و / elif olan fiiller ve ef’âl-i hamse</li><li>Türkçeden Arapçaya olumsuz, yasak ve “-mek / …sın diye” cümleleri kurmak</li></ul></div></div>' +
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
function LEGEND() { return '<div class="legend">' + ["mr", "mn", "mc", "en", "ec", "ng", "em"].map(function (k) { return '<span><i class="c-' + k + '"></i>' + ROL[k].tr + '</span>'; }).join("") + '</div>'; }
function renderMetin() {
  var M = ST.met;
  var g = M.gloss ? CUMLE[M.gloss[0]].t[M.gloss[1]] : null;
  return '<section class="panel"><div class="card stack ctrl"><div class="ctrl-row">' +
    '<button class="btn small' + (M.tr ? " solid" : "") + '" data-mt="tr">Türkçe altında</button>' +
    '<button class="btn small' + (M.renk ? " solid" : "") + '" data-mt="renk">Muzâri fiiller ve edatlar renkli</button>' +
    '<button class="btn small' + (M.sadeceTr ? " solid" : "") + '" data-mt="sadeceTr">Yalnız Türkçe (geri çeviri)</button>' +
    '<button class="btn small" data-sayall="1">🔊 Metni dinle</button><button class="btn small ghost" data-hush="1">■ Durdur</button></div>' +
    '<p class="muted">Bir kelimeye dokun: anlamı aşağıda görünür. Bir cümle numarasına dokun: o cümle seçilir, çevirisi ve sesi gelir.</p></div>' +
    '<div class="board card metin" style="--z:' + ST.zoom + '"><h2 class="ar mbaslik">' + BASLIK + '</h2>' +
    PARA.map(function (p) {
      return (p > 2 ? '<div class="yildiz">*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*</div>' : '') + '<div class="para' + (M.tr || M.sadeceTr ? " blk" : "") + '">' + CUMLE.filter(function (s) { return s.p === p; }).map(function (s) {
        var sel = M.sel === s.i;
        return '<span class="sent' + (sel ? " sel" : "") + '"><button class="sno" data-msel="' + s.i + '" aria-label="' + (s.i + 1) + '. cümle">' + (s.i + 1) + '</button>' +
          (M.sadeceTr ? '<span class="trtext">' + esc(s.tr) + '</span>' : '<span class="ar">' + sentHtml(s, { color: M.renk }) + '</span>' + (M.tr ? '<span class="trtext">' + esc(s.tr) + '</span>' : '')) + '</span> ';
      }).join("") + '</div>';
    }).join("") +
    (M.renk ? LEGEND() : '') + '</div>' +
    (g ? '<div class="card gloss"><span class="ar">' + g.ar + '</span> <b>' + esc(g.tr) + '</b> <span class="muted">· ' + (M.gloss[0] + 1) + '. cümle' + (g.rol ? ' · ' + ROL[g.rol].tr : '') + '</span><button class="btn small ghost" data-say="' + g.ar + '">🔊</button></div>' : '') +
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
      (C.step >= 1 ? '<div class="wbw">' + s.t.map(function (t) { return '<span class="wb' + (t.rol ? " c-" + t.rol : "") + '"><span class="ar">' + t.ar + '</span><small>' + esc(t.tr) + '</small></span>'; }).join("") + '</div>' : '') +
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

// ---------- 4 · KAİDE VE ANALİZ ----------
function fiilChips(cur, key) { return '<div class="pchips">' + Object.keys(FIIL).map(function (k) { return '<button class="pchip wide' + (k === cur ? " on" : "") + '" data-' + key + '="' + k + '"><span class="ar">' + FIIL[k].m + ' · ' + vForm(k, "hw", "r") + '</span><small>' + FIIL[k].tr + '</small></button>'; }).join("") + '</div>'; }
var TSIRA = [];
Object.keys(SAHIS).forEach(function (p) { ["r", "n", "c"].forEach(function (h) { TSIRA.push(p + "-" + h); }); });
function tabloHtml() {
  var T = ST.tab2, V = FIIL[T.v];
  return '<div class="board card stack" style="--z:' + ST.zoom + '"><div class="lbl">Fiil tablosu</div><h2>Bir fiil, dokuz şahıs, üç hâl</h2><p class="muted">Bir fiil seç. “Gizle”ye bas; sınıf her hücreyi söylesin, sen dokunarak ya da “Sıradaki” ile aç. Ef’âl-i hamse satırları koyu çerçeveli.</p>' +
    fiilChips(T.v, "tn2") +
    '<div class="row-btns"><button class="btn small' + (T.hide ? " solid" : "") + '" data-thide="1">' + (T.hide ? "👁 Hepsini göster" : "🙈 Gizle: sınıf söylesin") + '</button>' + (T.hide ? '<button class="btn small solid" data-tnext="1">Sıradaki ▸</button>' : '') + '</div>' +
    '<table class="itab ftab"><thead><tr><th></th><th>Merfû</th><th>Mansûb <span class="ar">(أَنْ)</span></th><th>Meczûm <span class="ar">(لَمْ)</span></th></tr></thead><tbody>' + Object.keys(SAHIS).map(function (p) {
      return '<tr class="' + (hamse(p) ? "hms" : "") + '"><th class="ar">' + SAHIS[p][0] + '<small>' + SAHIS[p][4] + '</small></th>' + ["r", "n", "c"].map(function (h) {
        var id = p + "-" + h, hid = T.hide && !T.shown[id];
        return '<td class="ar">' + (hid ? '<button class="reveal" data-trev="' + id + '">?</button>' : '<span class="c-' + HRENK[h] + '">' + vForm(T.v, p, h) + '</span>') + '</td>';
      }).join("") + '</tr>';
    }).join("") + '</tbody></table>' +
    '<p class="muted">' + V.m + ' (' + V.tr + '): tekilde merfû ' + alametTx(T.v, "hw", "r") + ', mansûb ' + alametTx(T.v, "hw", "n") + ', meczûm ' + alametTx(T.v, "hw", "c") + '. Ef’âl-i hamsede merfû nûn kalır, mansûb ve meczûmda nûn düşer.</p></div>';
}
function rowTable(s) {
  if (!s.c.length) return '<p class="note">' + arr(s.yok || "Bu cümlede muzâri fiil yok.") + '</p>';
  return '<table class="ctab"><thead><tr><th>Kelime</th><th>Hâli</th><th>Sebep</th><th>Alamet</th><th>Not</th></tr></thead><tbody>' + s.c.map(function (c) {
    return '<tr><td class="ar' + (c[1] ? " c-" + HRENK[c[1]] : "") + '" style="color:var(--role, var(--ink))">' + c[0] + '</td><td>' + (c[1] ? HALLER[c[1]] : "—") + '</td><td>' + arr(c[2]) + '</td><td>' + arr(c[3]) + '</td><td>' + arr(c[4]) + '</td></tr>';
  }).join("") + '</tbody></table>';
}
function renderIsim() {
  var I = ST.isim, s = CUMLE[I.i], quiz = I.mod !== "goster";
  return '<section class="panel"><div class="card stack"><div class="lbl">Kaide</div><h2>Muzâri fiilin i’rabı</h2><div class="kaide">' +
    KAIDE.map(function (k, i) { return '<div class="kd"><span class="kd-no">' + (i + 1) + '</span><div><b>' + k[0] + '</b><p>' + k[1] + '</p></div></div>'; }).join("") + '</div></div>' +
    tabloHtml() +
    '<div class="card stack ctrl"><div class="lbl">Metindeki cümleler</div><div class="pchips">' + CUMLE.map(function (x, k) { return '<button class="pchip' + (k === I.i ? " on" : "") + (x.c.length ? "" : " bos") + '" data-ii="' + k + '">' + (k + 1) + '</button>'; }).join("") + '</div>' +
    '<div class="ctrl-row">' + seg("imod", I.mod, [["goster", "Göster"], ["hal", "Sınıf hâlini işaretlesin"], ["edat", "Sınıf edatları bulsun"]]) +
    (quiz ? '<span class="muted">' + (I.mod === "hal" ? "Kesik çizgili muzâriye dokun: merfû → mansûb → meczûm → boş." : "Kelimeye dokun: nasb edatı → cezm edatı → boş. Etkilemeyen edatları işaretleme!") + '</span><button class="btn small solid" data-icheck="1">Kontrol et</button><button class="btn small ghost" data-iclear="1">Temizle</button>' : '') + '</div></div>' +
    '<div class="board card analiz" style="--z:' + ST.zoom + '"><div class="lbl">' + (I.i + 1) + '. cümle</div><div class="ar anl">' +
      (quiz ? sentHtml(s, { mark: I.mark, mod: I.mod, check: I.check }) : sentHtml(s, { color: true, label: true })) + '</div>' +
      '<div class="muted">' + esc(s.tr) + '</div>' +
      (!quiz || I.check ? rowTable(s) + '<p class="muted">💡 ' + arr(s.n) + '</p>' : '') + LEGEND() +
      '<div class="row-btns center"><button class="btn ghost" data-imove="-1">◀ Önceki</button><button class="btn" data-imove="1">Sonraki ▶</button></div></div></section>';
}

// ---------- 5 · ALIŞTIRMALAR ----------
var SETS = [["makine", "Muzâri makinesi"], ["hal", "Hâlini bul"], ["edat", "Edatı seç"], ["bicim", "Doğru biçim"], ["tuzak", "Bu edat ne yapar?"], ["donustur", "Dönüştür"], ["dy", "Doğru mu, yanlış mı?"], ["soru", "Soru–cevap (sözlü)"]];
function qGap(x) { return '<span class="ar">' + x.replace("___", '<span class="gap">___</span>').replace(/\((.*?)\)$/, '<span class="tchip">$1</span>') + '</span>'; }
function qBold(x) { return '<span class="ar">' + x.replace(/\{(.*?)\}/, '<b class="gap">$1</b>') + '</span>'; }
function mc(list, f) { return list.map(function (x) { return { q: f(x), o: [x[1], x[2], x[3]], a: x[1], why: x[4] }; }); }
var TUZAK_OPTS = ["n", "c", "x"];
function setItems(k) {
  if (k === "edat") return mc(EDAT, function (x) { return qGap(x[0]); });
  if (k === "bicim") return mc(BICIM, function (x) { return qGap(x[0]); });
  if (k === "hal") return HALBUL.map(function (x) { return { q: '<div class="lbl">Altı çizili fiilin hâli?</div>' + qBold(x[0]), o: ["Merfû", "Mansûb", "Meczûm"], a: HALLER[x[1]], why: x[2], fixed: true }; });
  if (k === "tuzak") return TUZAK.map(function (x) { return { q: '<div class="lbl">Altı çizili edat fiile ne yapar?</div>' + qBold(x[0]), o: TUZAK_OPTS.map(function (o) { return TUZAK_AD[o]; }), a: TUZAK_AD[x[1]], why: x[2], fixed: true }; });
  if (k === "donustur") return DONUSTUR.map(function (x) { var p = x[0].split(" ← "); return { q: '<span class="ar">' + p[0] + '</span> <span class="tchip">' + arr("+ " + p[1]) + '</span>', o: [x[1], x[2], x[3]], a: x[1], why: x[4] }; });
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
function sahisSeg(name, cur) { return seg(name, cur, Object.keys(SAHIS).map(function (p) { return [p, '<span class="ar">' + SAHIS[p][0] + '</span>']; })); }
function edatSeg(name, cur) { return seg(name, cur, Object.keys(EDATLAR).map(function (e) { return [e, arr(EDATLAR[e][2])]; })); }
var MK_OPTS = null;
function renderMakine() {
  var U = ST.um, c = kurCumle(U.v, U.p, U.e), ok = c.f;
  if (!MK_OPTS) MK_OPTS = shuffle(secenek(U.v, U.p, c.h));
  return '<div class="card stack ctrl"><div class="lbl">Muzâri makinesi</div><p class="muted">Fiili, şahsı ve edatı seç; fiil boşluklu çıkar, sınıf doğru biçimi bulsun. Yanlışta makine nedenini söyler. Yasak لَا’sı yalnız 2. şahısla kullanılır.</p>' +
    '<div class="ctrl-row"><span class="lbl">Fiil</span>' + fiilChips(U.v, "umv") + '</div>' +
    '<div class="ctrl-row"><span class="lbl">Şahıs</span>' + sahisSeg("ump2", U.p) + '</div>' +
    '<div class="ctrl-row"><span class="lbl">Edat</span>' + edatSeg("ume", U.e) + '</div></div>' +
    '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="ar qbig">' + c.bas + ' <span class="gap">' + (U.pick ? '<span class="' + (U.pick === ok ? "c-" + HRENK[c.h] : "wrongtxt") + '">' + U.pick + '</span>' : "؟") + '</span>' + c.son + '</div><div class="trtext big">' + esc(c.tr) + '</div>' +
    '<div class="gopts n' + MK_OPTS.length + '">' + MK_OPTS.map(function (o) {
      var cl = !U.pick ? "" : o === ok ? " ok" : U.pick === o ? " no" : " dim";
      return '<button class="gopt' + cl + '" data-ump="' + o + '"><span class="ar">' + o + '</span></button>';
    }).join("") + '</div>' +
    (U.pick ? '<p class="why">' + (U.pick === ok ? "✓ Doğru! " : "✗ Doğrusu: <span class=\"ar\">" + ok + "</span>. ") + arr(c.why) + '</p><div class="ar qmid">' + c.ar + '</div>' : '') + '</div>';
}

// ---------- 6 · YARIŞMA ----------
var G = { on: false, n: 12, k: 0, cur: null, ans: null };
function makeQ() {
  var t = pick(["cev", "cev", "hal", "hal", "edat", "bicim", "bicim", "tuzak", "tuzak", "dy"]), q = {};
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
  } else if (t === "hal") {
    var hb = pick(HALBUL);
    q.ask = '<div class="lbl">Altı çizili fiilin hâli?</div><div class="qbig">' + qBold(hb[0]) + '</div>';
    q.o = ["r", "n", "c"].map(function (h) { return { h: "<b>" + HALLER[h] + "</b>", ok: h === hb[1] }; });
    q.why = hb[2];
  } else if (t === "tuzak") {
    var tz = pick(TUZAK);
    q.ask = '<div class="lbl">Altı çizili edat fiile ne yapar?</div><div class="qbig">' + qBold(tz[0]) + '</div>';
    q.o = TUZAK_OPTS.map(function (o) { return { h: "<b>" + TUZAK_AD[o] + "</b>", ok: o === tz[1] }; });
    q.why = tz[2];
  } else {
    var u = pick(t === "edat" ? EDAT : BICIM);
    q.ask = '<div class="lbl">' + (t === "edat" ? "Hangi edat?" : "Doğru biçim hangisi?") + '</div><div class="qbig">' + qGap(u[0]) + '</div>';
    q.o = shuffle([u[1], u[2], u[3]]).map(function (x) { return { h: optHtml(x), ok: x === u[1] }; });
    q.why = u[4];
  }
  return q;
}
function renderYaris() {
  var T = ST.teams;
  if (!G.on) return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Takım yarışması</div><h2>Muzâri yarışması</h2><p class="muted">Sorular karışık gelir: doğru çeviri, hâlini bul, edatı seç, doğru biçim, bu edat ne yapar, doğru–yanlış. Takımlar sırayla cevaplar; 1–3 tuşları da çalışır.</p>' +
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
function renderUret() {
  var K = ST.kur, c = kurCumle(K.v, K.p, K.e);
  return '<section class="panel"><div class="card stack ctrl"><div class="lbl">Cümle kurucu</div><h2>Kendi cümleni kur</h2><p class="muted">Fiili, şahsı ve edatı seç. Kurucu muzârinin doğru biçimini yapar, Türkçesini yazar ve nedenini söyler. Önce sınıf tahmin etsin!</p>' +
    '<div class="ctrl-row"><span class="lbl">Fiil</span>' + fiilChips(K.v, "kv") + '</div>' +
    '<div class="ctrl-row"><span class="lbl">Şahıs</span>' + sahisSeg("kp", K.p) + '</div>' +
    '<div class="ctrl-row"><span class="lbl">Edat</span>' + edatSeg("ke", K.e) + '</div></div>' +
    '<div class="board card qcard" style="--z:' + ST.zoom + '"><div class="ar qbig">' + c.bas + ' <span class="c-' + HRENK[c.h] + '">' + c.f + '</span>' + c.son + '</div><div class="trtext big">' + esc(c.tr) + '</div><p class="muted">' + arr(c.why) + '</p><div class="row-btns center"><button class="btn ghost" data-say="' + c.ar + '">🔊 Dinle</button><button class="btn" data-krnd="1">🎲 Rastgele cümle</button></div></div>' +
    '<div class="grid2"><div class="card stack"><div class="lbl">Yazma görevi · 9 dk</div><h3>Bir çocukluk anısı</h3><ol class="howto"><li>Dün yapmadığın bir şey: <span class="ar">لَمْ أَلْعَبْ…</span></li><li>Asla yapmayacağın bir şey: <span class="ar">لَنْ أَتْرُكَ…</span></li><li>Yapmak istediğin bir şey: <span class="ar">أُرِيدُ أَنْ…</span></li><li>Bir şeyi ne için yaptın? <span class="ar">ذَهَبْتُ… حَتَّى / كَيْ…</span></li><li>Kardeşine bir yasak: <span class="ar">لَا تَجْرِ / لَا تَبْكِ…</span></li><li>Arkadaşların ne yapıyor? <span class="ar">أَصْدِقَائِي يَلْعَبُونَ…</span></li></ol><p class="muted">Her muzârinin altına hâlini ve alametini yaz.</p></div>' +
    '<div class="card stack"><div class="lbl">Örnek paragraf</div><p class="ar big2">أُرِيدُ أَنْ أَلْعَبَ مَعَ أَصْدِقَائِي. أَصْدِقَائِي يَلْعَبُونَ فِي الحَدِيقَةِ كُلَّ يَوْمٍ. أَمْسِ لَمْ أَلْعَبْ مَعَهُمْ؛ ذَهَبْتُ إِلَى المَدْرَسَةِ حَتَّى أَتَعَلَّمَ. قَالَ لِي أَبِي: لَا تَجْرِ فِي الطَّرِيقِ! لَنْ أَتْرُكَ دُرُوسِي، وَلَنْ يَتْرُكَ أَصْدِقَائِي دُرُوسَهُمْ.</p><p class="muted">Arkadaşlarımla oynamak istiyorum. Arkadaşlarım her gün bahçede oynuyorlar. Dün onlarla oynamadım; öğreneyim diye okula gittim. Babam bana: Yolda koşma! dedi. Derslerimi bırakmayacağım, arkadaşlarım da derslerini bırakmayacaklar.</p></div></div>' +
    '<div class="card stack noprint"><div class="lbl">Ödev</div><h3>Yazdırılabilir çalışma kâğıdı</h3><p class="muted">Metnin ' + CUMLE.length + ' cümlesinin çevirisi, ' + TRANSFER.length + ' yeni cümlenin Arapçası ve boş fiil tablosu.</p><div class="row-btns"><button class="btn solid" data-print="1">🖨 Ödevi yazdır</button></div></div>' +
    '<div class="sheet printonly"><div class="sheet-top"><b>ذَكَاءُ الأَطْفَالِ · Muzâri fiilin i’rabı ödevi</b><span>Ad Soyad: ____________________ Tarih: __________</span></div>' +
    '<h4>A. Türkçeye çevir; muzâri fiillerin altını çiz, hâlini ve sebebini yaz.</h4><ol>' + CUMLE.map(function (s) { return '<li><span class="ar">' + s.ar + '</span><div class="line"></div></li>'; }).join("") + '</ol>' +
    '<h4>B. Arapçaya çevir.</h4><ol>' + TRANSFER.map(function (t) { return '<li>' + esc(t[0]) + '<div class="line"></div></li>'; }).join("") + '</ol>' +
    '<h4>C. Tabloyu doldur: يَتْرُكُ ve يَجْرِي</h4><table class="itab print"><thead><tr><th></th><th>Merfû</th><th>Mansûb (أَنْ)</th><th>Meczûm (لَمْ)</th></tr></thead><tbody>' + ["هُوَ", "أَنْتِ", "هُمْ", "هُمَا"].map(function (r) { return '<tr><th class="ar">' + r + '</th><td></td><td></td><td></td></tr>'; }).join("") + '</tbody></table></div></section>';
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
// yasak لَا’sı yalnız 2. şahısla
function nehyFix(o, edatDegisti) {
  if (o.e !== "nh" || ikinci(o.p)) return;
  if (edatDegisti) { o.p = "nt"; toast("Yasak لَا’sı 2. şahısla kullanılır: أَنْتَ seçildi."); }
  else { o.e = "nf"; toast("Bu şahısla yasak لَا’sı olmaz: olumsuzluk لَا’sı seçildi."); }
}

document.addEventListener("click", function (e) {
  var tok = e.target.closest("[data-tok]");
  if (tok && ST.tab === "metin") { var p = tok.dataset.tok.split("-"); ST.met.gloss = [+p[0], +p[1]]; return render(); }
  if (tok && ST.tab === "isim" && ST.isim.mod !== "goster") { var tj = +tok.dataset.tok.split("-")[1], ts = CUMLE[ST.isim.i]; if (!markable(ts.t[tj], ST.isim.mod)) return; var cyc = CYC[ST.isim.mod], cur = ST.isim.mark[tj]; ST.isim.mark[tj] = cyc[(cyc.indexOf(cur) + 1) % cyc.length]; ST.isim.check = false; return render(); }
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
  // analiz
  var I = ST.isim;
  if (d.ii) { I.i = +d.ii; I.mark = {}; I.check = false; return render(); }
  if (d.imove) { I.i = (I.i + CUMLE.length + +d.imove) % CUMLE.length; I.mark = {}; I.check = false; return render(); }
  if (d.imod) { I.mod = d.imod; I.mark = {}; I.check = false; return render(); }
  if (d.icheck) { I.check = true; var s2 = CUMLE[I.i], good = s2.t.every(function (t, tj) { return !markable(t, I.mod) || dogru(beklenen(t, I.mod), I.mark[tj]); }); beep(good ? "win" : "no"); toast(good ? "Hepsi doğru!" : "Kırmızı çerçeveli kelimelere tekrar bak."); return render(); }
  if (d.iclear) { I.mark = {}; I.check = false; return render(); }
  if (d.tn2) { ST.tab2.v = d.tn2; ST.tab2.shown = {}; return render(); }
  if (d.thide) { ST.tab2.hide = !ST.tab2.hide; ST.tab2.shown = {}; return render(); }
  if (d.trev) { ST.tab2.shown[d.trev] = 1; return render(); }
  if (d.tnext) { var nx = TSIRA.filter(function (x) { return !ST.tab2.shown[x]; })[0]; if (nx) ST.tab2.shown[nx] = 1; else { toast("Tablo tamam. Aferin!"); beep("win"); } return render(); }
  // alıştırma
  var A = ST.al;
  if (d.aset) { A.set = d.aset; A.k = 0; A.ans = null; return render(); }
  if (d.aans) { if (A.ans !== null) return; A.ans = +d.aans; var it = getItems(A.set)[A.k % getItems(A.set).length]; A.n++; if (it.o[A.ans] === it.a) { A.ok++; beep("ok"); } else beep("no"); return render(); }
  if (d.aopen) { A.ans = true; return render(); }
  if (d.anext) { A.k++; A.ans = null; return render(); }
  if (d.umv) { ST.um.v = d.umv; umReset(); return render(); }
  if (d.ump2) { ST.um.p = d.ump2; nehyFix(ST.um, false); umReset(); return render(); }
  if (d.ume) { ST.um.e = d.ume; nehyFix(ST.um, true); umReset(); return render(); }
  if (d.ump) { if (ST.um.pick) return; ST.um.pick = d.ump; beep(d.ump === kurCumle(ST.um.v, ST.um.p, ST.um.e).f ? "ok" : "no"); return render(); }
  // yarışma
  if (d.gn) { G.n = +d.gn; return render(); }
  if (d.gstart) { G.on = true; G.k = 0; G.ans = null; ST.teams.s = [0, 0, 0, 0]; ST.teams.turn = 0; G.cur = makeQ(); save(); return render(); }
  if (d.gans) return gAnswer(+d.gans);
  if (d.gnext) return gNext();
  if (d.gstop) { G.on = false; return render(); }
  // üretim
  if (d.kv) { ST.kur.v = d.kv; return render(); }
  if (d.kp) { ST.kur.p = d.kp; nehyFix(ST.kur, false); return render(); }
  if (d.ke) { ST.kur.e = d.ke; nehyFix(ST.kur, true); return render(); }
  if (d.krnd) { ST.kur.v = pick(Object.keys(FIIL)); ST.kur.p = pick(Object.keys(SAHIS)); ST.kur.e = pick(Object.keys(EDATLAR)); nehyFix(ST.kur, true); return render(); }
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
