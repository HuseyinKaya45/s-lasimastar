// ================= SINAV MOTORU: “Kendini sına” sayfaları =================
// Veri: SINAV = { ad, ar, tr, toplam, kisimlar: [{ baslik, ar, bolumler: [{ ad, ar, not, puan, tip: "mcq" | "coklu", metin, metinTr, oge: [...] }] }] }
// mcq öğesi: { q, d, y: [yanlışlar], sira }   coklu öğesi: { q, d: [doğrular], y: [yanlışlar] }
(function () {
"use strict";
var KEY = "ihtibar:" + SINAV.id;
function oku(k, d) { try { var v = localStorage.getItem(KEY + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
function yaz(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) {} }
var C = oku(":cevap", {}), BITTI = oku(":bitti", false), TEMA = oku(":tema", "");
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function karistir(a, t) { a = a.slice(); var s = hash(String(t)) || 1; for (var i = a.length - 1; i > 0; i--) { s = (Math.imul(s, 1103515245) + 12345) & 0x7fffffff; var j = s % (i + 1), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function arSar(s) { return String(s).replace(/[؀-ۿ](?:[؀-ۿ\s،؟/()…-]*[؀-ۿ؟])?/g, function (m) { return '<span class="ar">' + m + '</span>'; }); }

// her bölümün öğelerine anahtar ver
var BOL = [];
SINAV.kisimlar.forEach(function (k, ki) { k.bolumler.forEach(function (b, bi) { b.key = ki + "-" + bi; b.oge.forEach(function (o, oi) { o.key = b.key + "-" + oi; }); BOL.push(b); }); });

function ogeDogru(b, o) {
  var c = C[o.key];
  if (b.tip === "coklu") { if (!c || !c.length) return false; return c.length === o.d.length && o.d.every(function (x) { return c.indexOf(x) >= 0; }); }
  return c === o.d;
}
function bolumPuan(b) { var n = b.oge.filter(function (o) { return ogeDogru(b, o); }).length; return Math.round(2 * b.puan * n / b.oge.length) / 2; }
function cevaplanan() { var n = 0, t = 0; BOL.forEach(function (b) { b.oge.forEach(function (o) { t++; var c = C[o.key]; if (c !== undefined && !(Array.isArray(c) && !c.length)) n++; }); }); return [n, t]; }

function ogeHtml(b, o, i) {
  var c = C[o.key], ops = b.tip === "coklu" ? karistir(o.d.concat(o.y), o.key) : (o.ops ? o.ops : karistir([o.d].concat(o.y), o.key));
  var dur = BITTI ? (ogeDogru(b, o) ? ' ok' : ' no') : '';
  var dugme = ops.map(function (op) {
    var sec = b.tip === "coklu" ? (c || []).indexOf(op) >= 0 : c === op, cls = sec ? ' secili' : '';
    if (BITTI) { var dg = b.tip === "coklu" ? o.d.indexOf(op) >= 0 : op === o.d; if (dg) cls += ' dogru'; else if (sec) cls += ' yanlis'; }
    return '<button type="button" class="sec ar' + cls + '" data-o="' + o.key + '" data-v="' + esc(op) + '"' + (BITTI ? ' disabled' : '') + '>' + op + '</button>';
  }).join("");
  return '<div class="soru' + dur + '"><span class="soru-no">' + (i + 1) + '</span>' + (o.ses ? '<button type="button" class="btn kucuk calbtn2" data-cal="' + o.ses + '">🔊 Dinle</button>' : '') + (o.q ? '<div class="sq ar" dir="rtl">' + esc(o.q).replace(/\[([^\]]+)\]/g, '<u>$1</u>').replace(/___/g, '<span class="bosluk2">&nbsp;</span>').replace(/\s+←$/, ' ←') + '</div>' : '') + '<div class="secim' + (BITTI ? ' bitti' : '') + '">' + dugme + '</div>' +
    (BITTI && !ogeDogru(b, o) ? '<div class="sonra">Doğrusu: <span class="ar">' + (b.tip === "coklu" ? o.d.join("، ") : o.d) + '</span></div>' : '') + '</div>';
}
function bolumHtml(b, no) {
  var p = BITTI ? '<span class="rozet">' + bolumPuan(b) + ' / ' + b.puan + '</span>' : '<span class="rozet soluk">' + b.puan + ' puan</span>';
  return '<section class="kart" id="b' + b.key + '"><h2>' + no + '. ' + b.ad + (b.ar ? ' <span class="ar">' + b.ar + '</span>' : '') + p + '</h2>' + (b.not ? '<p class="aciklama">' + arSar(b.not) + '</p>' : '') +
    (b.metin ? '<div class="metin"><p class="ar">' + b.metin + '</p>' + (b.metinTr ? '<details><summary>Türkçesi</summary><div class="trline">' + b.metinTr + '</div></details>' : '') + '</div>' : '') +
    (b.ses ? '<div class="satir-btn" style="margin-bottom:8px">' + [].concat(b.ses).map(function (id, j) { return '<button type="button" class="btn dolu" data-cal="' + id + '">▶ ' + ([].concat(b.ses).length > 1 ? (j + 1) + '. kaydı' : 'Kaydı') + ' dinle</button>'; }).join("") + '</div>' : '') +
    (b.kayitYok ? '<div class="uyari">' + b.kayitYok + '</div>' : b.oge.map(function (o, i) { return ogeHtml(b, o, i); }).join("")) + '</section>';
}
function ciz() {
  var top = 0, max = 0; BOL.forEach(function (b) { if (b.kayitYok) return; top += bolumPuan(b); max += b.puan; });
  var cv = cevaplanan();
  var bas = '<section class="kart kahraman"><div class="ar">' + SINAV.ar + '</div><h2>' + SINAV.tr + '</h2><p>' + SINAV.aciklama + '</p>' +
    (BITTI ? '<div class="sonuc-buyuk">' + top + ' / ' + max + '</div><p style="text-align:center" class="soluk">' + (top >= max * 0.85 ? 'Mükemmel!' : top >= max * 0.6 ? 'İyi! Yanlışlarına bakıp tekrar çalış.' : 'Üniteleri tekrar çalış, sonra yeniden dene.') + '</p><div class="satir-btn" style="justify-content:center"><button type="button" class="btn dolu" data-act="yeni">Yeniden başla</button></div>'
      : '<p class="soluk kucuk">Bütün soruları cevapla, sonra en alttaki “Sınavı bitir” düğmesine bas. Puanın kitaptaki puanlamaya göre hesaplanır.</p><div class="ilerleme"><i style="width:' + Math.round(100 * cv[0] / cv[1]) + '%"></i></div><div class="soluk kucuk" style="margin-top:6px">' + cv[0] + ' / ' + cv[1] + ' soru cevaplandı</div>') + '</section>';
  var no = 0, govde = SINAV.kisimlar.map(function (k) { return '<h2 class="kisim">' + k.baslik + ' <span class="ar">' + k.ar + '</span></h2>' + k.bolumler.map(function (b) { no++; return bolumHtml(b, no); }).join(""); }).join("");
  var son = BITTI ? '' : '<div class="satir-btn" style="justify-content:center;margin:10px 0 30px"><button type="button" class="btn dolu buyuk" data-act="bitir">✓ Sınavı bitir ve puanla</button><button type="button" class="btn" data-act="yeni">Cevapları sil</button></div>';
  document.getElementById("ana").innerHTML = bas + govde + son + '<p class="alt-bilgi">el-Arabiyyetü beyne yedeyk · 1. kitap · ' + SINAV.tr + ' — çevrimdışı çalışır; cevapların bu tarayıcıda saklanır.</p>';
  document.getElementById("puan").textContent = BITTI ? top + " / " + max : cv[0] + " / " + cv[1];
}
// ---------- ses: tek mp3, parçalar ZAMAN[id] = [[başlangıç, bitiş], ...] ----------
var ses = new Audio(), PLAN = [], BTN = null;
function sesHazir() {
  if (ses.src) return true;
  var el = document.getElementById("ses-veri"), b64 = el ? el.textContent.replace(/\s+/g, "") : "";
  if (!b64 || b64 === "SES_B64") return false;
  var bin = atob(b64), u = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  ses.src = URL.createObjectURL(new Blob([u], { type: "audio/mpeg" })); return true;
}
function durdur() { PLAN = []; ses.pause(); ses.dataset.son = ""; if (BTN) BTN.classList.remove("calan"); BTN = null; }
function sonraki() { var p = PLAN.shift(); if (!p) { durdur(); return; } ses.currentTime = p[0]; ses.dataset.son = p[1]; ses.play(); }
ses.addEventListener("timeupdate", function () { if (ses.dataset.son && ses.currentTime >= +ses.dataset.son) { ses.pause(); ses.dataset.son = ""; setTimeout(sonraki, 350); } });
function cal(id, btn) { var ayni = BTN === btn; durdur(); if (ayni || !window.ZAMAN || !ZAMAN[id] || !sesHazir()) return; PLAN = ZAMAN[id].slice(); BTN = btn; btn.classList.add("calan"); sonraki(); }
document.addEventListener("click", function (e) {
  var cb = e.target.closest("[data-cal]"); if (cb) { cal(cb.dataset.cal, cb); return; }
  var el = e.target.closest("[data-o]");
  if (el && !BITTI) {
    var key = el.dataset.o, v = el.dataset.v, b = BOL.filter(function (x) { return key.indexOf(x.key + "-") === 0; })[0];
    if (b.tip === "coklu") { var a = C[key] || []; var i = a.indexOf(v); if (i >= 0) a.splice(i, 1); else a.push(v); C[key] = a; }
    else C[key] = v;
    yaz(":cevap", C);
    el.parentNode.querySelectorAll(".sec").forEach(function (x) { x.classList.toggle("secili", b.tip === "coklu" ? (C[key] || []).indexOf(x.dataset.v) >= 0 : x.dataset.v === C[key]); });
    var cv = cevaplanan(); document.getElementById("puan").textContent = cv[0] + " / " + cv[1];
    var bar = document.querySelector(".kahraman .ilerleme i"); if (bar) { bar.style.width = Math.round(100 * cv[0] / cv[1]) + "%"; bar.parentNode.nextElementSibling.textContent = cv[0] + " / " + cv[1] + " soru cevaplandı"; }
    return;
  }
  var act = e.target.closest("[data-act]"); if (!act) return;
  if (act.dataset.act === "bitir") {
    var cv = cevaplanan();
    if (cv[0] < cv[1] && !confirm((cv[1] - cv[0]) + " soru boş. Yine de bitirilsin mi?")) return;
    BITTI = true; yaz(":bitti", true); ciz(); window.scrollTo(0, 0);
  } else if (act.dataset.act === "yeni") {
    if (!confirm("Bütün cevaplar silinsin mi?")) return;
    C = {}; BITTI = false; yaz(":cevap", C); yaz(":bitti", false); ciz(); window.scrollTo(0, 0);
  }
});
function temaUygula() { if (TEMA) document.documentElement.setAttribute("data-theme", TEMA); else document.documentElement.removeAttribute("data-theme"); }
document.getElementById("temaBtn").addEventListener("click", function () {
  var koyu = TEMA ? TEMA === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  TEMA = koyu ? "light" : "dark"; yaz(":tema", TEMA); temaUygula();
});
temaUygula(); ciz();
})();
