(function () {
"use strict";
// ================= el-Arabiyyetü beyne yedeyk 2 — ünite uygulaması (ortak motor) =================
// Veri: UNITE, DERSLER (her ders bloklardan oluşur), KELIME; ses: ZAMAN (asıl kayıt parçaları), SES_AUDIO (gömülü okunuşlar)
var PFX = UNITE.pfx;
var store = {
  get: function (k, d) { try { var v = localStorage.getItem(PFX + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch (e) {} }
};
var ST = Object.assign({ tr: true, hiz: 1, tema: "", efekt: true, sekme: "bas", kDers: 0 }, store.get("ayar", {}));
var A = store.get("cevap", {});
function ayarKaydet() { store.set("ayar", ST); }
function cevapKaydet() { store.set("cevap", A); }

// ---------- yardımcılar ----------
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
var VURGU = /\[\[(.+?)\]\]/g;
function temiz(s) { return String(s).replace(VURGU, "$1").replace(/_{2,}/g, "…"); }
function arHtml(s) { return esc(s).replace(VURGU, '<mark class="vurgu-harf">$1</mark>').replace(/_{3,}/g, '<span class="bosluk">&nbsp;</span>'); }
function AR(s, cls) { return '<span class="ar ' + (cls || "") + '">' + arHtml(s) + "</span>"; }
// Türkçe metindeki Arapça parçaları sarar
function AW(s) { return esc(s).replace(/([؀-ۿ﴾﴿][؀-ۿً-ٰ﴾﴿\s،؛؟.…\-()]*[؀-ۿً-ٰ﴾﴿])/g, '<span class="ar-ic">$1</span>'); }
function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function karistir(a, tohum) { a = a.slice(); var h = tohum == null ? Math.random() * 4e9 : hash(String(tohum)); for (var i = a.length - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; var j = h % (i + 1); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
var tT = 0;
function toast(m) { var t = document.getElementById("toast"); t.textContent = m; t.classList.add("goster"); clearTimeout(tT); tT = setTimeout(function () { t.classList.remove("goster"); }, 2400); }
var AC = null;
function bip(tur) {
  if (!ST.efekt) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    var seq = tur === "ok" ? [[660, .07], [990, .1]] : tur === "no" ? [[210, .16]] : [[523, .08], [659, .08], [784, .08], [1046, .18]], t = AC.currentTime;
    seq.forEach(function (p) { var o = AC.createOscillator(), g = AC.createGain(); o.frequency.value = p[0]; o.type = tur === "no" ? "sawtooth" : "sine"; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + p[1]); o.connect(g).connect(AC.destination); o.start(t); o.stop(t + p[1] + .02); t += p[1]; });
  } catch (e) {}
}

// ---------- ses ----------
var ses = new Audio(); ses.preload = "auto";
function sesHazirla() {
  if (ses.src) return true;
  var el = document.getElementById("ses-veri"), b64 = el ? el.textContent.replace(/\s+/g, "") : "";
  if (!b64 || b64.indexOf("SES_") === 0) return false;
  var bin = atob(b64), u = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  ses.src = URL.createObjectURL(new Blob([u], { type: "audio/mpeg" }));
  return true;
}
var Q = { liste: [], k: -1, bitis: 0, cb: null, id: 0, segs: null, sj: 0 };
ses.addEventListener("timeupdate", function () { if (Q.segs && ses.currentTime >= Q.bitis) segSonraki(); });
ses.addEventListener("ended", function () { if (Q.segs) segSonraki(); });
// timeupdate seyrek gelir; parça sonunu her karede yokla ki sonraki satıra taşmasın
function tik() { if (!Q.segs) return; if (ses.currentTime >= Q.bitis) segSonraki(); if (Q.segs) requestAnimationFrame(tik); }
function segSonraki() {
  Q.sj++;
  if (Q.sj < Q.segs.length) { ses.currentTime = Q.segs[Q.sj][0]; Q.bitis = Q.segs[Q.sj][1]; return; }
  ses.pause(); Q.segs = null; var f = Q.segBitti; Q.segBitti = null; if (f) setTimeout(f, 120);
}
function segCal(id, bitti) {
  if (!sesHazirla() || !ZAMAN[id]) { if (bitti) setTimeout(bitti, 300); return false; }
  Q.segs = ZAMAN[id]; Q.sj = 0; Q.segBitti = bitti; ses.currentTime = Q.segs[0][0]; Q.bitis = Q.segs[0][1]; ses.playbackRate = ST.hiz;
  var p = ses.play(); if (p && p.catch) p.catch(function () {}); tik(); return true;
}
function sure(o) { if (o.s && ZAMAN[o.s]) return ZAMAN[o.s].reduce(function (t, a) { return t + a[1] - a[0]; }, 0); return Math.max(1.2, temiz(o.m || "").length / 12); }
// o: {s: kayıt parçası, m: metin} — kayıt varsa onu, yoksa gömülü okunuşu çalar
function cal1(o, bitti) {
  if (o.s && ZAMAN[o.s]) return segCal(o.s, bitti);
  if (o.m && o.tts !== false) return sesPlay(temiz(o.m), bitti, toast);
  if (bitti) setTimeout(bitti, 200); return false;
}
function durdur() { Q.id++; Q.liste = []; Q.segs = null; Q.segBitti = null; try { ses.pause(); } catch (e) {} if (window.sesStop) sesStop(); vurgu(null); }
// liste: [{o, el, bekle}] sırayla çalar; bekle>0 ise o satırda öğrenci konuşur (rol)
function kuyruk(liste, bitti) {
  durdur(); var id = Q.id, k = 0;
  (function adim() {
    if (id !== Q.id) return;
    if (k >= liste.length) { vurgu(null); if (bitti) bitti(); return; }
    var x = liste[k++]; vurgu(x.el, x.bekle);
    if (x.bekle) { setTimeout(adim, x.bekle * 1000); return; }
    cal1(x.o, function () { if (id === Q.id) setTimeout(adim, 250); });
  })();
}
function vurgu(sel, sende) {
  document.querySelectorAll(".calan,.sende").forEach(function (e) { e.classList.remove("calan"); e.classList.remove("sende"); });
  if (!sel) return; var e = document.querySelector(sel); if (!e) return;
  e.classList.add(sende ? "sende" : "calan"); e.classList.add("dinlendi");
  var r = e.getBoundingClientRect(); if (r.top < 120 || r.bottom > innerHeight - 40) e.scrollIntoView({ block: "center", behavior: "smooth" });
}
function calBtn(o, cls) { return '<button type="button" class="' + (cls || "bcal") + '" data-act="cal" data-o="' + esc(JSON.stringify(o)) + '" aria-label="Dinle">▶</button>'; }

// ---------- ilerleme ----------
function oge(b) {
  switch (b.t) {
    case "dy": case "secim": case "bosluk": case "acik": case "sessec": case "resim": return (b.ogeler || b.resimler).length;
    case "siniflandir": return b.ogeler.length;
    case "sirala": case "esle": case "dinle": return 1;
    case "diyalog": case "metin": return 1;
    default: return 0;
  }
}
function bkey(d, j) { return "d" + d.no + "-" + j; }
function bYapilan(d, j) {
  var b = d.bloklar[j], k = bkey(d, j), n = 0;
  if (oge(b) === 1 && ["sirala", "esle", "dinle", "diyalog", "metin"].indexOf(b.t) >= 0) return A[k] ? 1 : 0;
  for (var i = 0; i < oge(b); i++) if (A[k + ":" + i] != null) n++;
  return n;
}
function dToplam(d) { return d.bloklar.reduce(function (s, b) { return s + oge(b); }, 0); }
function dYapilan(d) { return d.bloklar.reduce(function (s, b, j) { return s + bYapilan(d, j); }, 0); }
function puan() { var p = 0; Object.keys(A).forEach(function (k) { var v = A[k]; if (v === true || (v && v.ok)) p += 10; else if (v === 1) p += 5; }); return p; }
function kaydet(k, v, d) {
  var once = d ? dYapilan(d) : 0; A[k] = v; cevapKaydet(); ustGuncelle();
  if (d && dYapilan(d) === dToplam(d) && once < dToplam(d)) { setTimeout(function () { toast("Tebrikler! Ders " + d.no + " tamamlandı."); bip("win"); }, 500); sekmelerCiz(); }
}
function ilerleme(d) { var t = dToplam(d), y = dYapilan(d); return '<div class="ilerleme" title="' + y + "/" + t + '"><i style="width:' + (t ? Math.round(y / t * 100) : 0) + '%"></i></div>'; }

// ---------- bloklar ----------
var BAS = { diyalog: ["Diyalog", "الحِوارُ"], metin: ["Okuma metni", "النَّصُّ"], hazirlik: ["Hazırlık", "تَهْيِئَةٌ"], dy: ["Doğru mu, yanlış mı?", "ضَعْ عَلامَةَ (✓) أَوْ (✗)"], sirala: ["Sırala", "رَتِّبْ"], esle: ["Eşleştir", "صِلْ"], bosluk: ["Boşluğu doldur", "امْلَأِ الفَراغَ"], secim: ["Doğru cevabı seç", "اخْتَرِ الجَوابَ الصَّحيحَ"], siniflandir: ["Sınıflandır", "صَنِّفْ"], acik: ["Cevapla", "أَجِبْ"], kural: ["Kural", "القاعِدَةُ"], tablo: ["İncele", "ادْرُسْ وَلاحِظْ"], dinle: ["Dinleme", "فَهْمُ المَسْموعِ"], sessec: ["Hangisini duydun?", "ضَعْ عَلامَةَ (✓) بِجانِبِ الكَلِمَةِ الَّتي تَسْمَعُها"], tekrar: ["Dinle ve tekrarla", "اسْتَمِعْ، ثُمَّ أَعِدْ"], resim: ["Resimlerle konuş", "تَكَلَّمْ"], ornek: ["İncele", "ادْرُسْ وَلاحِظْ"], hat: ["Hat", "الخَطُّ"] };
function blokBas(b) {
  var v = BAS[b.t] || ["", ""];
  return '<h2>' + esc(b.baslik || v[0]) + ' <span class="ar">' + esc(b.ar || v[1]) + "</span></h2>" + (b.aciklama ? '<p class="aciklama">' + AW(b.aciklama) + "</p>" : "");
}
function trSatir(t) { return t ? '<div class="trline"' + (ST.tr ? "" : " hidden") + ">" + AW(t) + "</div>" : ""; }
var R = {};
R.diyalog = function (b, k, d) {
  var kisi = b.kisiler;
  return blokBas(b) + (b.resim ? '<div class="dresimler">' + [].concat(b.resim).map(function (r) { return img(r, "dresim"); }).join("") + "</div>" : "") +
    '<div class="satir-btn" style="margin:6px 0 10px"><button class="btn dolu" data-act="dinle-hepsi" data-k="' + k + '">▶ Hepsini dinle</button>' +
    kisi.map(function (p, i) { return '<button class="btn" data-act="rol" data-k="' + k + '" data-i="' + i + '">Rol: ' + esc(p.tr) + " sen ol</button>"; }).join("") +
    '<button class="btn" data-act="dur">■ Durdur</button></div>' +
    '<div class="dsatirlar">' + b.satir.map(function (s, i) {
      var o = { s: s[3], m: s[1] };
      return '<div class="birim" id="' + k + "-" + i + '" data-act="cal" data-o="' + esc(JSON.stringify(o)) + '">' + calBtn(o) +
        '<div class="bmetin"><div class="kisi k' + (s[0] + 1) + '">' + esc(kisi[s[0]].ar) + ' <small>· ' + esc(kisi[s[0]].tr) + '</small></div><p class="ar">' + arHtml(s[1]) + "</p>" + trSatir(s[2]) + "</div></div>";
    }).join("") + "</div>" + (b.not ? '<p class="not">' + AW(b.not) + "</p>" : "");
};
R.metin = function (b, k) {
  var n = 0;
  return blokBas(b) + (b.resim ? '<div class="dresimler">' + [].concat(b.resim).map(function (r) { return img(r, "dresim"); }).join("") + "</div>" : "") +
    '<div class="satir-btn" style="margin:6px 0 10px"><button class="btn dolu" data-act="dinle-hepsi" data-k="' + k + '">▶ Metni dinle</button><button class="btn" data-act="dur">■ Durdur</button></div>' +
    b.paragraf.map(function (p, pi) {
      return '<div class="paragraf"><div class="p-bas"><span class="p-no">' + (pi + 1) + "</span></div>" + p.map(function (s) {
        var o = { s: s[2], m: s[0] }, id = k + "-" + (n++);
        return '<div class="birim" id="' + id + '" data-act="cal" data-o="' + esc(JSON.stringify(o)) + '">' + calBtn(o) + '<div class="bmetin"><p class="ar">' + arHtml(s[0]) + "</p>" + trSatir(s[1]) + "</div></div>";
      }).join("") + "</div>";
    }).join("") + (b.not ? '<p class="not">' + AW(b.not) + "</p>" : "");
};
R.hazirlik = function (b) {
  return blokBas(b) + '<ol class="hliste">' + b.ogeler.map(function (s) { return "<li>" + AR(s[0], "sar") + trSatir(s[1]) + "</li>"; }).join("") + "</ol>";
};
R.kural = function (b) {
  return blokBas(b) + '<div class="kural-kutu">' + (b.s ? calBtn({ s: b.s, m: b.metin }) + " " : "") + AR(b.metin, "kural-ar") + (b.tr ? '<div class="trline">' + AW(b.tr) + "</div>" : "") + "</div>" + (b.not ? '<p class="not">' + AW(b.not) + "</p>" : "");
};
R.tablo = function (b) {
  // b.ses: hücrelerle aynı biçimde asıl kayıt parçaları (isteğe bağlı)
  var cell = function (c, ri, ci) { var sid = b.ses && b.ses[ri] && b.ses[ri][ci]; return c === "" || c === "×" ? '<td class="soluk">' + esc(c) + "</td>" : '<td><button class="hucre" data-act="cal" data-o="' + esc(JSON.stringify({ m: c, s: sid || undefined, tts: b.tts !== false })) + '">' + arHtml(c) + "</button></td>"; };
  return blokBas(b) + '<div class="tablo-kap"><table class="k2tablo"><thead><tr>' + b.bas.map(function (h) { return "<th>" + AW(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
    b.satir.map(function (r, ri) { return "<tr>" + r.map(function (c, ci) { return cell(c, ri, ci); }).join("") + "</tr>"; }).join("") + "</tbody></table></div>" + (b.not ? '<p class="not">' + AW(b.not) + "</p>" : "");
};
R.ornek = function (b) {
  return blokBas(b) + '<div class="ornekler">' + b.ogeler.map(function (s, i) {
    var o = { m: s[0], s: s[2], tts: b.tts !== false };
    return '<div class="birim" data-act="cal" data-o="' + esc(JSON.stringify(o)) + '">' + (b.tts !== false || (s[2] && ZAMAN[s[2]]) ? calBtn(o) : '<span class="soru-no">' + (i + 1) + "</span>") + '<div class="bmetin"><p class="ar">' + arHtml(s[0]) + "</p>" + trSatir(s[1]) + "</div></div>";
  }).join("") + "</div>" + (b.not ? '<p class="not">' + AW(b.not) + "</p>" : "");
};
R.tekrar = R.ornek;
R.hat = function (b) {
  return blokBas(b) + b.ogeler.map(function (g) { return '<div class="hat-grup"><p class="trline">' + AW(g[0]) + '</p><div class="hat-harf ar">' + esc(g[1]) + "</div></div>"; }).join("");
};
function soruBas(i, metin, cls) { return '<div class="soru-metin ' + (cls || "") + '"><span class="soru-no">' + (i + 1) + "</span>" + arHtml(metin) + "</div>"; }
R.dy = function (b, k) {
  return blokBas(b) + b.ogeler.map(function (s, i) {
    var a = A[k + ":" + i], cv = a == null ? null : a.v;
    return '<div class="soru">' + soruBas(i, s[0]) + trSatir(s[3]) + '<div class="secim' + (a != null ? " bitti" : "") + '">' +
      [["✓ Doğru", true], ["✗ Yanlış", false]].map(function (o) {
        var c = a == null ? "" : o[1] === s[1] ? " dogru" : o[1] === cv ? " yanlis" : "";
        return '<button class="sec' + c + '" data-act="dy" data-k="' + k + '" data-i="' + i + '" data-v="' + o[1] + '"' + (a != null ? " disabled" : "") + ">" + o[0] + "</button>";
      }).join("") + "</div>" + (a != null ? '<div class="sonra">' + (s[1] ? "Doğru." : "Doğrusu: " + AR(s[2] || "")) + "</div>" : "") + "</div>";
  }).join("");
};
R.secim = function (b, k) {
  return blokBas(b) + b.ogeler.map(function (s, i) {
    var a = A[k + ":" + i], sec = karistir([s[1]].concat(s[2]), k + i);
    return '<div class="soru">' + soruBas(i, s[0]) + trSatir(s[3]) + '<div class="secim' + (a != null ? " bitti" : "") + '">' + sec.map(function (o) {
      var c = a == null ? "" : o === s[1] ? " dogru" : o === a.v ? " yanlis" : "";
      return '<button class="sec' + (/[؀-ۿ]/.test(o) ? " ar" : "") + c + '" data-act="secim" data-k="' + k + '" data-i="' + i + '" data-v="' + esc(o) + '"' + (a != null ? " disabled" : "") + ">" + arHtml(o) + "</button>";
    }).join("") + "</div>" + (a != null && s[4] ? '<div class="sonra">' + AW(s[4]) + "</div>" : "") + "</div>";
  }).join("");
};
R.bosluk = function (b, k) {
  return blokBas(b) + (b.kutu ? '<div class="kutu ar">' + b.kutu.map(esc).join(" · ") + "</div>" : "") + b.ogeler.map(function (s, i) {
    var a = A[k + ":" + i], sec = karistir(s[2] ? [s[1]].concat(s[2]) : b.kutu, k + i), cumle = s[0];
    if (a != null) cumle = cumle.replace(/_{3,}/, "[[" + s[1] + "]]");
    return '<div class="soru">' + soruBas(i, cumle) + trSatir(s[3]) + '<div class="secim' + (a != null ? " bitti" : "") + '">' + sec.map(function (o) {
      var c = a == null ? "" : o === s[1] ? " dogru" : o === a.v ? " yanlis" : "";
      return '<button class="sec ar' + c + '" data-act="secim" data-k="' + k + '" data-i="' + i + '" data-v="' + esc(o) + '"' + (a != null ? " disabled" : "") + ">" + esc(o) + "</button>";
    }).join("") + "</div></div>";
  }).join("");
};
R.sessec = function (b, k) {
  return blokBas(b) + '<div class="sessec">' + b.ogeler.map(function (s, i) {
    var a = A[k + ":" + i], h = hash(k + i) % 2, hedef = s[h];
    return '<div class="soru"><div class="satir-btn"><span class="soru-no">' + (i + 1) + "</span>" + calBtn({ m: hedef, s: b.ses ? b.ses[i][h] : undefined }, "btn") + '<div class="secim' + (a != null ? " bitti" : "") + '">' + s.map(function (o) {
      var c = a == null ? "" : o === hedef ? " dogru" : o === a.v ? " yanlis" : "";
      return '<button class="sec ar' + c + '" data-act="sessec" data-k="' + k + '" data-i="' + i + '" data-v="' + esc(o) + '" data-h="' + esc(hedef) + '"' + (a != null ? " disabled" : "") + ">" + esc(o) + "</button>";
    }).join("") + "</div></div></div>";
  }).join("") + "</div>" + (b.not ? '<p class="not">' + AW(b.not) + "</p>" : "");
};
R.acik = function (b, k) {
  return blokBas(b) + b.ogeler.map(function (s, i) {
    var a = A[k + ":" + i];
    return '<div class="soru">' + soruBas(i, s[0]) + trSatir(s[2]) + (a != null ? '<div class="model">' + calBtn({ m: s[1] }, "bcal") + " " + AR(s[1]) + (s[3] ? '<div class="trline">' + AW(s[3]) + "</div>" : "") + "</div>" :
      '<div class="satir-btn" style="margin-top:6px"><button class="btn kucuk" data-act="goster" data-k="' + k + '" data-i="' + i + '">Örnek cevabı göster</button></div>') + "</div>";
  }).join("");
};
R.resim = function (b, k) {
  return blokBas(b) + '<div class="rgrid">' + b.resimler.map(function (s, i) {
    var a = A[k + ":" + i];
    return '<div class="rkart">' + img(s[0]) + (s[2] ? '<div class="trline">' + AW(s[2]) + "</div>" : "") + (a != null ? '<div class="model">' + calBtn({ m: s[1] }, "bcal") + " " + AR(s[1]) + "</div>" :
      '<button class="btn kucuk" data-act="goster" data-k="' + k + '" data-i="' + i + '">Örnek cümle</button>') + "</div>";
  }).join("") + "</div>";
};
R.siniflandir = function (b, k) {
  return blokBas(b) + '<div class="sinif">' + b.ogeler.map(function (s, i) {
    var a = A[k + ":" + i];
    return '<div class="sinif-satir"><span class="ar sinif-kel">' + arHtml(s[0]) + '</span><div class="secim' + (a != null ? " bitti" : "") + '">' + b.gruplar.map(function (g, gi) {
      var c = a == null ? "" : gi === s[1] ? " dogru" : gi === a.v ? " yanlis" : "";
      return '<button class="sec' + (/[؀-ۿ]/.test(g) ? " ar" : "") + c + '" data-act="sinif" data-k="' + k + '" data-i="' + i + '" data-v="' + gi + '"' + (a != null ? " disabled" : "") + ">" + arHtml(g) + "</button>";
    }).join("") + "</div></div>";
  }).join("") + "</div>";
};
R.sirala = function (b, k) {
  var st = SIRA[k] || (SIRA[k] = { dizi: [] }), bitti = A[k];
  var havuz = karistir(b.ogeler.map(function (_, i) { return i; }), k);
  if (bitti) return blokBas(b) + '<ol class="sira-sonuc">' + b.ogeler.map(function (s) { return "<li>" + AR(s, "sar") + "</li>"; }).join("") + '</ol><div class="satir-btn"><span class="etiket ok">Tamam</span><button class="btn kucuk" data-act="sira-sifir" data-k="' + k + '">Yeniden</button></div>';
  return blokBas(b) + '<div class="sira-dizi">' + (st.dizi.length ? st.dizi.map(function (i, n) { return '<div class="sira-oge yerlesti"><span class="soru-no">' + (n + 1) + "</span>" + AR(b.ogeler[i]) + "</div>"; }).join("") : '<p class="soluk kucuk">Aşağıdan doğru sırayla seç.</p>') + "</div>" +
    '<div class="sira-havuz">' + havuz.filter(function (i) { return st.dizi.indexOf(i) < 0; }).map(function (i) { return '<button class="sira-oge" data-act="sira" data-k="' + k + '" data-i="' + i + '">' + AR(b.ogeler[i]) + "</button>"; }).join("") + "</div>" +
    (st.dizi.length ? '<div class="satir-btn"><button class="btn kucuk" data-act="sira-sifir" data-k="' + k + '">Baştan</button></div>' : "");
};
var SIRA = {}, ESLE = {};
R.esle = function (b, k) {
  var st = ESLE[k] || (ESLE[k] = { sol: null, ok: {} }), bitti = A[k];
  var sag = karistir(b.ciftler.map(function (_, i) { return i; }), k);
  var tamam = function (i) { return bitti || st.ok[i]; };
  return blokBas(b) + '<div class="eslestir"><div class="es-sutun">' + b.ciftler.map(function (c, i) {
    return '<button class="es sol' + (tamam(i) ? " dogru" : st.sol === i ? " secili" : "") + '" data-act="es-sol" data-k="' + k + '" data-i="' + i + '"' + (tamam(i) ? " disabled" : "") + ">" + arHtml(c[0]) + "</button>";
  }).join("") + '</div><div class="es-sutun">' + sag.map(function (i) {
    var c = b.ciftler[i];
    return '<button class="es sag' + (tamam(i) ? " dogru" : "") + '" data-act="es-sag" data-k="' + k + '" data-i="' + i + '"' + (tamam(i) ? " disabled" : "") + ">" + arHtml(c[1]) + "</button>";
  }).join("") + "</div></div>" + (bitti && b.ciftler[0][2] ? '<div class="sonra">' + b.ciftler.map(function (c) { return AR(c[0] + " – " + c[1]) + ": " + AW(c[2]); }).join("<br>") + "</div>" : "") +
    (bitti ? '<div class="satir-btn" style="margin-top:8px"><span class="etiket ok">Tamam</span><button class="btn kucuk" data-act="es-sifir" data-k="' + k + '">Yeniden</button></div>' : "");
};
R.dinle = function (b, k) {
  var o = { s: b.s };
  return blokBas(b) + '<div class="satir-btn" style="margin:6px 0 10px"><button class="btn dolu" data-act="dinle-kayit" data-k="' + k + '" data-o="' + esc(JSON.stringify(o)) + '">▶ Kaydı dinle</button><button class="btn" data-act="dur">■ Durdur</button>' + (A[k] ? '<span class="etiket ok">Dinlendi</span>' : "") + "</div>" +
    (b.metin ? '<details class="dinle-metin"><summary>Kaydın metni (önce dinle, sonra aç)</summary>' + b.metin.map(function (s) { return '<div class="birim"><div class="bmetin"><p class="ar">' + arHtml(s[0]) + "</p>" + trSatir(s[1]) + "</div></div>"; }).join("") + "</details>" : "") +
    (b.not ? '<p class="not">' + AW(b.not) + "</p>" : "");
};
function img(id, cls) { return RESIM[id] ? '<img class="' + (cls || "rsm") + '" src="' + RESIM[id] + '" alt="" loading="lazy">' : ""; }

// ---------- sekmeler ----------
var SEKMELER = [["bas", "Başlangıç", "البِدايَةُ"]].concat(DERSLER.map(function (d) { return ["d" + d.no, "Ders " + d.no, d.kisa]; }), [["kelime", "Kelimeler", "المُفْرَداتُ"], ["sinav", "Sınav", "الاخْتِبارُ"]]);
var CIZ = {};
function ayarHtml() {
  return '<div class="ayarlar"><label class="anahtar"><input type="checkbox" data-act="tr-ac"' + (ST.tr ? " checked" : "") + '> Türkçe çeviri</label>' +
    '<span class="ayar"><span class="lbl">Hız</span><span class="seg">' + [0.75, 1].map(function (h) { return '<button data-act="hiz" data-v="' + h + '" aria-pressed="' + (ST.hiz === h) + '">' + (h === 1 ? "Normal" : "Yavaş") + "</button>"; }).join("") + "</span></span></div>";
}
CIZ.bas = function () {
  return '<section class="kahraman"><div class="ar">' + esc(UNITE.ar) + "</div><h2>" + esc(UNITE.tr) + "</h2><p>" + AW(UNITE.giris) + "</p></section>" +
    '<div class="kart">' + ayarHtml() + '</div><div class="yol">' + DERSLER.map(function (d) {
      var t = dToplam(d), y = dYapilan(d);
      return '<button class="yol-kart" data-sekme="d' + d.no + '"><b>Ders ' + d.no + " · " + esc(d.tr) + '</b><span class="ar">' + esc(d.ar) + '</span><span class="soluk">' + esc(d.ozet) + "</span>" + ilerleme(d) + '<span class="sayi"><span>' + y + "/" + t + "</span>" + (t && y === t ? "<span>✓</span>" : "") + "</span></button>";
    }).join("") + '<button class="yol-kart" data-sekme="kelime"><b>Kelimeler</b><span class="ar">المُفْرَداتُ</span><span class="soluk">' + KELIME.length + ' kelime: dinle, kartlarla çalış, eşleştir.</span></button><button class="yol-kart" data-sekme="sinav"><b>Sınav</b><span class="ar">الاخْتِبارُ</span><span class="soluk">Bütün derslerden karışık 15 soru.</span></button></div>';
};
function dersCiz(d) {
  return '<div class="bolum-ust"><div><h2 class="ders-bas">Ders ' + d.no + " · " + esc(d.tr) + ' <span class="ar">' + esc(d.ar) + '</span></h2><p class="soluk kucuk">' + esc(d.ozet) + "</p></div>" + '<div style="min-width:160px">' + ilerleme(d) + '<span class="soluk kucuk">' + dYapilan(d) + "/" + dToplam(d) + "</span></div></div>" +
    '<div class="kart dar">' + ayarHtml() + "</div>" +
    d.bloklar.map(function (b, j) { var k = bkey(d, j); return '<section class="kart blok-' + b.t + '" id="' + k + '">' + R[b.t](b, k, d) + "</section>"; }).join("") +
    '<div class="satir-btn" style="justify-content:space-between">' + (d.no > DERSLER[0].no ? '<button class="btn" data-sekme="d' + (d.no - 1) + '">← Ders ' + (d.no - 1) + "</button>" : "<span></span>") +
    (DERSLER.some(function (x) { return x.no === d.no + 1; }) ? '<button class="btn dolu" data-sekme="d' + (d.no + 1) + '">Ders ' + (d.no + 1) + " →</button>" : '<button class="btn dolu" data-sekme="sinav">Sınav →</button>') + "</div>";
}
DERSLER.forEach(function (d) { CIZ["d" + d.no] = function () { return dersCiz(d); }; });
// kelimeler
var KS = { mod: "liste", k: 0, dondu: false, oyun: null };
CIZ.kelime = function () {
  var dersler = [0].concat(DERSLER.filter(function (d) { return KELIME.some(function (w) { return w[2] === d.no; }); }).map(function (d) { return d.no; }));
  var L = KELIME.filter(function (w) { return !ST.kDers || w[2] === ST.kDers; });
  var h = '<div class="kart"><h2>Kelimeler <span class="ar">المُفْرَداتُ</span></h2><div class="satir-btn">' + dersler.map(function (n) { return '<button class="btn kucuk' + (ST.kDers === n ? " dolu" : "") + '" data-act="kders" data-v="' + n + '">' + (n ? "Ders " + n : "Hepsi") + "</button>"; }).join("") + '</div><div class="satir-btn" style="margin-top:8px"><span class="seg">' +
    [["liste", "Liste"], ["kart", "Kartlar"], ["oyun", "Eşleştirme"]].map(function (m) { return '<button data-act="kmod" data-v="' + m[0] + '" aria-pressed="' + (KS.mod === m[0]) + '">' + m[1] + "</button>"; }).join("") + "</span></div></div>";
  if (KS.mod === "liste") h += '<div class="kart"><div class="kgrid2">' + L.map(function (w) { return '<div class="kkart2" data-act="cal" data-o="' + esc(JSON.stringify({ m: w[0] })) + '"><span class="ar">' + esc(w[0]) + "</span><span>" + esc(w[1]) + "</span></div>"; }).join("") + "</div></div>";
  else if (KS.mod === "kart") { var w = L[KS.k % L.length]; h += '<div class="kart"><div class="flas' + (KS.dondu ? " dondu" : "") + '"><div class="flas-ic" data-act="kdon"><div class="flas-yuz flas-on"><span class="ar" style="font-size:2.4rem">' + esc(w[0]) + '</span></div><div class="flas-yuz flas-arka"><b style="font-size:1.4rem">' + esc(w[1]) + '</b></div></div></div><div class="satir-btn" style="justify-content:center"><button class="btn" data-act="kgec" data-v="-1">←</button>' + calBtn({ m: w[0] }, "btn") + '<button class="btn" data-act="kdon">Çevir</button><button class="btn" data-act="kgec" data-v="1">→</button></div><p class="soluk kucuk" style="text-align:center">' + (KS.k % L.length + 1) + " / " + L.length + "</p></div>"; }
  else {
    if (!KS.oyun) { var s = karistir(L).slice(0, 6); KS.oyun = { s: s, sag: karistir(s.map(function (_, i) { return i; })), sol: null, ok: {}, hata: 0 }; }
    var o = KS.oyun, bit = Object.keys(o.ok).length === o.s.length;
    h += '<div class="kart"><div class="eslestir"><div class="es-sutun">' + o.s.map(function (w, i) { return '<button class="es sol' + (o.ok[i] ? " dogru" : o.sol === i ? " secili" : "") + '" data-act="ko-sol" data-i="' + i + '"' + (o.ok[i] ? " disabled" : "") + '><span class="ar">' + esc(w[0]) + "</span></button>"; }).join("") +
      '</div><div class="es-sutun">' + o.sag.map(function (i) { return '<button class="es sag' + (o.ok[i] ? " dogru" : "") + '" data-act="ko-sag" data-i="' + i + '"' + (o.ok[i] ? " disabled" : "") + ">" + esc(o.s[i][1]) + "</button>"; }).join("") + "</div></div>" +
      (bit ? '<p class="sonuc-buyuk" style="text-align:center">' + (o.hata ? o.hata + " hata" : "Hatasız!") + "</p>" : "") + '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" data-act="ko-yeni">Yeni oyun</button></div></div>';
  }
  return h;
};
// sınav
var SN = null;
function havuz() {
  var P = [];
  DERSLER.forEach(function (d) {
    d.bloklar.forEach(function (b) {
      if (b.t === "secim") b.ogeler.forEach(function (s) { P.push({ q: s[0], d: s[1], o: [s[1]].concat(s[2]), ders: d.no }); });
      if (b.t === "bosluk") b.ogeler.forEach(function (s) { P.push({ q: s[0], d: s[1], o: s[2] ? [s[1]].concat(s[2]) : karistir(b.kutu.filter(function (x) { return x !== s[1]; })).slice(0, 3).concat([s[1]]), ders: d.no }); });
      if (b.t === "dy") b.ogeler.forEach(function (s) { P.push({ q: s[0], d: s[1] ? "✓ Doğru" : "✗ Yanlış", o: ["✓ Doğru", "✗ Yanlış"], ders: d.no, not: s[1] ? "" : s[2] }); });
      if (b.t === "siniflandir") b.ogeler.forEach(function (s) { P.push({ q: s[0] + " ← " + (b.soru || "?"), d: b.gruplar[s[1]], o: b.gruplar.slice(), ders: d.no }); });
    });
  });
  return P;
}
CIZ.sinav = function () {
  if (!SN) return '<div class="kart"><h2>Sınav <span class="ar">الاخْتِبارُ</span></h2><p>Bütün derslerin alıştırmalarından karışık 15 soru. Her soruda tek doğru cevap var.</p>' + (store.get("sinav", null) ? '<p class="soluk">Son sınav: ' + store.get("sinav").p + "/15</p>" : "") + '<button class="btn dolu" data-act="sn-bas">Başla</button></div>';
  if (SN.i >= SN.s.length) { store.set("sinav", { p: SN.p }); return '<div class="kart" style="text-align:center"><p class="sonuc-buyuk">' + SN.p + " / " + SN.s.length + '</p><p class="soluk">' + (SN.p >= 13 ? "Mükemmel!" : SN.p >= 9 ? "İyi gidiyorsun." : "Dersleri tekrar et, sonra yeniden dene.") + '</p><button class="btn dolu" data-act="sn-bas">Yeniden</button></div>'; }
  var q = SN.s[SN.i], sec = karistir(q.o, "sn" + SN.i + q.q);
  return '<div class="kart"><div class="bolum-ust"><b>Soru ' + (SN.i + 1) + " / " + SN.s.length + '</b><span class="soluk">Ders ' + q.ders + " · Puan " + SN.p + "</span></div>" + soruBas(SN.i, q.q) + '<div class="secim' + (SN.c ? " bitti" : "") + '">' + sec.map(function (o) {
    var c = !SN.c ? "" : o === q.d ? " dogru" : o === SN.c ? " yanlis" : "";
    return '<button class="sec' + (/[؀-ۿ]/.test(o) ? " ar" : "") + c + '" data-act="sn" data-v="' + esc(o) + '"' + (SN.c ? " disabled" : "") + ">" + arHtml(o) + "</button>";
  }).join("") + "</div>" + (SN.c ? (q.not ? '<div class="sonra">Doğrusu: ' + AR(q.not) + "</div>" : "") + '<div class="satir-btn" style="margin-top:10px"><button class="btn dolu" data-act="sn-gec">Devam →</button></div>' : "") + "</div>";
};

// ---------- çizim ----------
function sekmelerCiz() {
  document.getElementById("sekmeler").innerHTML = SEKMELER.map(function (s) {
    var d = DERSLER.filter(function (x) { return "d" + x.no === s[0]; })[0], bitti = d && dToplam(d) && dYapilan(d) === dToplam(d);
    return '<button type="button" class="sekme" role="tab" data-sekme="' + s[0] + '" aria-selected="' + (ST.sekme === s[0]) + '"><span>' + s[1] + (bitti ? '<span class="nokta"></span>' : "") + "</span><small>" + esc(s[2]) + "</small></button>";
  }).join("");
}
function ustGuncelle() { document.getElementById("puan").textContent = "★ " + puan(); }
var ana = document.getElementById("ana");
function ciz(basa) {
  var y = scrollY;
  ana.innerHTML = CIZ[ST.sekme]() + '<p class="alt-bilgi">el-Arabiyyetü beyne yedeyk · 2. kitap · ' + UNITE.no + ". ünite — çevrimdışı çalışır; ilerlemen bu tarayıcıda saklanır.</p>";
  if (basa) scrollTo(0, 0); else scrollTo(0, y);
}
function sekmeAc(s) { durdur(); ST.sekme = s; ayarKaydet(); sekmelerCiz(); ciz(true); var b = document.querySelector('.sekme[data-sekme="' + s + '"]'); if (b && b.scrollIntoView) b.scrollIntoView({ block: "nearest", inline: "center" }); }
function dersOf(k) { var no = +k.split("-")[0].slice(1); return DERSLER.filter(function (d) { return d.no === no; })[0]; }
function blokOf(k) { return dersOf(k).bloklar[+k.split("-")[1]]; }
function yeniden(k) { var el = document.getElementById(k); if (!el) return ciz(); var d = dersOf(k), j = +k.split("-")[1]; el.innerHTML = R[d.bloklar[j].t](d.bloklar[j], k, d); var u = document.querySelector(".bolum-ust"); if (u) u.lastChild.innerHTML = ilerleme(d) + '<span class="soluk kucuk">' + dYapilan(d) + "/" + dToplam(d) + "</span>"; }
function cevap(k, i, ok, v) { var d = dersOf(k); bip(ok ? "ok" : "no"); kaydet(k + ":" + i, { ok: ok, v: v }, d); yeniden(k); }

document.addEventListener("click", function (e) {
  var t = e.target, el;
  if ((el = t.closest("[data-sekme]"))) { sekmeAc(el.dataset.sekme); return; }
  if (!(el = t.closest("[data-act]"))) return;
  var act = el.dataset.act, k = el.dataset.k, i = +el.dataset.i, b;
  switch (act) {
    case "cal": durdur(); var o = JSON.parse(el.dataset.o); var bir = el.closest(".birim"); if (bir) { bir.classList.add("calan", "dinlendi"); } cal1(o, function () { if (bir) bir.classList.remove("calan"); }); break;
    case "dur": durdur(); break;
    case "dinle-hepsi": b = blokOf(k);
      var L = b.t === "diyalog" ? b.satir.map(function (s, n) { return { o: { s: s[3], m: s[1] }, el: "#" + k + "-" + n }; }) : [].concat.apply([], b.paragraf).map(function (s, n) { return { o: { s: s[2], m: s[0] }, el: "#" + k + "-" + n }; });
      kuyruk(L, function () { if (!A[k]) { kaydet(k, 1, dersOf(k)); yeniden(k); } }); break;
    case "rol": b = blokOf(k);
      kuyruk(b.satir.map(function (s, n) { var o = { s: s[3], m: s[1] }; return { o: o, el: "#" + k + "-" + n, bekle: s[0] === i ? sure(o) * 1.3 + 1 : 0 }; }), function () { if (!A[k]) { kaydet(k, 1, dersOf(k)); yeniden(k); } toast("Rol bitti. Şimdi öteki rolü dene!"); }); break;
    case "dinle-kayit": durdur(); cal1(JSON.parse(el.dataset.o), function () { if (!A[k]) { kaydet(k, 1, dersOf(k)); yeniden(k); } }); break;
    case "dy": b = blokOf(k); var v = el.dataset.v === "true"; cevap(k, i, v === b.ogeler[i][1], v); break;
    case "secim": b = blokOf(k); cevap(k, i, el.dataset.v === b.ogeler[i][1], el.dataset.v); break;
    case "sessec": cevap(k, i, el.dataset.v === el.dataset.h, el.dataset.v); break;
    case "sinif": b = blokOf(k); cevap(k, i, +el.dataset.v === b.ogeler[i][1], +el.dataset.v); break;
    case "goster": kaydet(k + ":" + i, 1, dersOf(k)); yeniden(k); b = blokOf(k); var it = (b.ogeler || b.resimler)[i]; cal1({ m: it[1] }); break;
    case "sira": b = blokOf(k); var st = SIRA[k]; st.dizi.push(i);
      if (st.dizi.length === b.ogeler.length) { var ok = st.dizi.every(function (x, n) { return x === n; }); if (ok) { bip("ok"); kaydet(k, true, dersOf(k)); } else { bip("no"); toast("Sıra doğru değil; tekrar dene."); st.dizi = []; } }
      yeniden(k); break;
    case "sira-sifir": SIRA[k] = { dizi: [] }; if (A[k]) { delete A[k]; cevapKaydet(); ustGuncelle(); } yeniden(k); break;
    case "es-sol": ESLE[k].sol = i; yeniden(k); break;
    case "es-sag": var es = ESLE[k]; if (es.sol == null) { toast("Önce soldan bir kelime seç."); break; }
      if (es.sol === i) { es.ok[i] = true; es.sol = null; bip("ok"); b = blokOf(k); if (Object.keys(es.ok).length === b.ciftler.length) kaydet(k, true, dersOf(k)); yeniden(k); }
      else { bip("no"); el.classList.add("titre"); setTimeout(function () { el.classList.remove("titre"); }, 400); } break;
    case "es-sifir": ESLE[k] = { sol: null, ok: {} }; delete A[k]; cevapKaydet(); ustGuncelle(); yeniden(k); break;
    case "tr-ac": ST.tr = el.checked; ayarKaydet(); document.querySelectorAll(".trline").forEach(function (x) { if (!x.closest(".model,.sonra,.kural-kutu,.hat-grup,.rkart,.es-sutun")) x.hidden = !ST.tr; }); break;
    case "hiz": ST.hiz = +el.dataset.v; ayarKaydet(); ciz(); break;
    case "kders": ST.kDers = +el.dataset.v; KS.k = 0; KS.oyun = null; ayarKaydet(); ciz(); break;
    case "kmod": KS.mod = el.dataset.v; KS.oyun = null; ciz(); break;
    case "kdon": KS.dondu = !KS.dondu; ciz(); break;
    case "kgec": KS.k = Math.max(0, KS.k + +el.dataset.v + 1000) % 1000; KS.dondu = false; ciz(); break;
    case "ko-sol": KS.oyun.sol = i; ciz(); break;
    case "ko-sag": if (KS.oyun.sol === i) { KS.oyun.ok[i] = true; KS.oyun.sol = null; bip("ok"); cal1({ m: KS.oyun.s[i][0] }); } else { KS.oyun.hata++; bip("no"); } ciz(); break;
    case "ko-yeni": KS.oyun = null; ciz(); break;
    case "sn-bas": SN = { s: karistir(havuz()).slice(0, 15), i: 0, p: 0, c: null }; ciz(true); break;
    case "sn": var q = SN.s[SN.i]; SN.c = el.dataset.v; if (SN.c === q.d) { SN.p++; bip("ok"); } else bip("no"); ciz(); break;
    case "sn-gec": SN.i++; SN.c = null; ciz(true); break;
  }
});
// gömülü okunuş listesi (ses_topla.mjs okur)
window.SES_LISTE = function () {
  var L = [];
  var ekle = function (s) { if (s && /[؀-ۿ]/.test(s)) L.push(temiz(s)); };
  DERSLER.forEach(function (d) {
    d.bloklar.forEach(function (b) {
      if (b.t === "diyalog") b.satir.forEach(function (s) { if (!s[3] || !ZAMAN[s[3]]) ekle(s[1]); });
      if (b.t === "metin") b.paragraf.forEach(function (p) { p.forEach(function (s) { if (!s[2] || !ZAMAN[s[2]]) ekle(s[0]); }); });
      if ((b.t === "ornek" || b.t === "tekrar") && b.tts !== false) b.ogeler.forEach(function (s) { if (!s[2] || !ZAMAN[s[2]]) ekle(s[0]); });
      if (b.t === "tablo" && b.tts !== false) b.satir.forEach(function (r, ri) { r.forEach(function (c, ci) { if (c !== "×" && !(b.ses && ZAMAN[b.ses[ri][ci]])) ekle(c); }); });
      if (b.t === "acik" || b.t === "resim") (b.ogeler || b.resimler).forEach(function (s) { ekle(s[1]); });
      if (b.t === "sessec") b.ogeler.forEach(function (s, i) { [0, 1].forEach(function (j) { if (!(b.ses && ZAMAN[b.ses[i][j]])) ekle(s[j]); }); });
    });
  });
  KELIME.forEach(function (w) { ekle(w[0]); });
  return L.filter(function (x, n) { return L.indexOf(x) === n; });
};
// ---------- tema ----------
function temaUygula() { if (ST.tema) document.documentElement.dataset.theme = ST.tema; else delete document.documentElement.dataset.theme; var koyu = ST.tema ? ST.tema === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; document.getElementById("temaBtn").textContent = koyu ? "☀" : "☾"; }
document.getElementById("temaBtn").onclick = function () { var koyu = ST.tema ? ST.tema === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; ST.tema = koyu ? "light" : "dark"; ayarKaydet(); temaUygula(); };
document.getElementById("efektBtn").onclick = function () { ST.efekt = !ST.efekt; ayarKaydet(); this.style.opacity = ST.efekt ? 1 : .45; toast(ST.efekt ? "Ses efektleri açık" : "Ses efektleri kapalı"); };
document.getElementById("efektBtn").style.opacity = ST.efekt ? 1 : .45;
if (!CIZ[ST.sekme]) ST.sekme = "bas";
temaUygula(); sekmelerCiz(); ustGuncelle(); ciz(true);
})();
