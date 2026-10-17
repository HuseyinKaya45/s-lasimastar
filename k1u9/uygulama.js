(function () {
"use strict";
// ---------- kayıt ----------
var PFX = UNITE.pfx;
var store = {
  get: function (k, d) { try { var v = localStorage.getItem(PFX + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch (e) {} },
  del: function (k) { try { localStorage.removeItem(PFX + k); } catch (e) {} }
};
var ST = Object.assign({ tr: true, okunus: false, hiz: 1, tema: "", efekt: true, sekme: "bas", dIdx: 0, kDers: 0 }, store.get("ayar", {}));
var A = store.get("cevap", {});
function ayarKaydet() { store.set("ayar", ST); }
function cevapKaydet() { store.set("cevap", A); }

var SEKMELER = [
  ["bas", "Başlangıç", "البِدايَةُ"], ["diyalog", "Diyaloglar", "الحِوارُ"], ["kelime", "Kelimeler", "المُفْرَداتُ"], ["sayi", "Renkler ve sayılar", "الأَلْوانُ"],
  ["kalip", "Kalıplar", "التَّراكيبُ"], ["ses", "Sesler: ظ ve ذ", "الأَصْواتُ"], ["dinleme", "Dinleme", "فَهْمُ المَسْموعِ"], ["okuma", "Okuma", "القِراءَةُ"],
  ["yazi", "Yazı", "الكِتابَةُ"], ["konusma", "Konuşma", "الكَلامُ"], ["tekrar", "Alıştırmalar", "التَّدْريباتُ"], ["sinav", "Sınav", "الاخْتِبارُ"]
];
var YOL = {
  diyalog: "Üç diyaloğu dinle, tekrar et, rol yap; sonra “evet mi, hayır mı?” sorularını cevapla.",
  kelime: "Kırtasiye, yiyecek ve giyecek kelimeleri; dinle-bul, resme bak-seç ve eşleştirme oyunları.",
  sayi: "Renkler (أَبْيَضُ، أَسْوَدُ …) ve onluk sayılar (عِشْرونَ … ثَمانونَ).",
  kalip: "أُريدُ …; هذا / هذِهِ …; أَيُّ … تُريدُ؟; بِكَمِ …؟; المَطْلوبُ … رِيالًا; تَفَضَّلْ …",
  ses: "ظ sesi: kelimeler, ظ – ذ ayırt etme oyunu ve âyetler.",
  dinleme: "Ders 78’in dinleme alıştırmaları: diyalogları ve paragrafı dinle, soruları cevapla.",
  okuma: "Dört kısa metni oku (Mâlik, Râşid, yeni ev, aile alışverişte) ve cevapla; boşlukları doldur.",
  yazi: "Harfleri birleştir, harfleri sırala, resme bak-kelimeyi bul, sondaki harfi bul.",
  konusma: "Arkadaşınla alışveriş konuşmaları ve sorulara cevap.",
  tekrar: "Ders 76 ve 81’in alıştırmaları: garip kelime, eşleştirme, yanlış yazılan kelime, doğru cümle.",
  sinav: "Bütün bölümlerden karışık 15 soru (sesli sorular dahil)."
};
function toplam(t) {
  switch (t) {
    case "bas": return 1;
    case "diyalog": return DIYALOG.reduce(function (s, d) { return s + 2 + d.soru.length; }, 0);
    case "kelime": return KELIME.length + 3;
    case "sayi": return GUN.length + 4;
    case "kalip": return KALIP_T.reduce(function (s, t) { return s + t.oge.length; }, 0);
    case "ses": return 1 + AYET.length;
    case "dinleme": return DINLE_SEC.reduce(function (s, g) { return s + g.oge.length; }, 0);
    case "okuma": return FARKLI.length + (CUMLE_RESIM.length ? 1 : 0) + (SORU_CEVAP.length ? 1 : 0) + METINLER.reduce(function (s, m) { return s + m.soru.length; }, 0);
    case "yazi": return HARF.length + 1 + EKSIK.length + BAS_HARF.length + HARF_BUL.length;
    case "konusma": return KONUS.length + CEVAPLA.length;
    case "tekrar": return GARIP.length + 2 + YANLIS.length + AYNI_CUMLE.length + CUMLE_SIRA.length + SEC.length;
    case "sinav": return 1;
  }
  return 0;
}
function yapilan(t) { var n = 0; for (var k in A) if (k.indexOf(t + "/") === 0) n++; return n; }
function puanHesap() { var p = 0; for (var k in A) if (A[k].ok) p += 10; return p; }

// ---------- yardımcılar ----------
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
// Türkçe metin içindeki Arapça parçaları yönü bozulmasın diye ayrı sarar
function arSar(s) { return String(s).replace(/[\u0600-\u06FF](?:[\u0600-\u06FF\s/]*[\u0600-\u06FF])?/g, function (m) { return '<span class="ar-ic">' + m + '</span>'; }); }
function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function karistir(arr, tohum) {
  var a = arr.slice(), s = tohum === undefined ? Math.floor(Math.random() * 2147483647) : hash(String(tohum)) || 1;
  for (var i = a.length - 1; i > 0; i--) { s = (Math.imul(s, 1103515245) + 12345) & 0x7fffffff; var j = s % (i + 1), t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function rastgele(arr, n, haric) { return karistir(arr.filter(function (x) { return haric.indexOf(x) < 0; })).slice(0, n); }
function ilerlemeHtml(t) { var y = Math.min(yapilan(t), toplam(t)), tp = toplam(t); return '<div class="ilerleme" title="' + y + ' / ' + tp + '"><i style="width:' + (tp ? Math.round(100 * y / tp) : 0) + '%"></i></div>'; }
var toastZ;
function toast(m) { var t = document.getElementById("toast"); t.textContent = m; t.classList.add("goster"); clearTimeout(toastZ); toastZ = setTimeout(function () { t.classList.remove("goster"); }, 2600); }
var ACtx;
function bip(ok) {
  if (!ST.efekt) return;
  try {
    ACtx = ACtx || new (window.AudioContext || window.webkitAudioContext)();
    var o = ACtx.createOscillator(), g = ACtx.createGain(), t = ACtx.currentTime;
    o.type = "sine"; o.frequency.setValueAtTime(ok ? 660 : 220, t); if (ok) o.frequency.setValueAtTime(880, t + .08);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.12, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + (ok ? .25 : .3));
    o.connect(g); g.connect(ACtx.destination); o.start(t); o.stop(t + .32);
  } catch (e) {}
}
function cevapla(key, ok, v) {
  if (A[key]) return false;
  A[key] = { ok: ok ? 1 : 0, v: v === undefined ? "" : v }; cevapKaydet(); ustGuncelle();
  var t = key.split("/")[0];
  if (yapilan(t) === toplam(t)) { var s = SEKMELER.filter(function (x) { return x[0] === t; })[0]; if (s) setTimeout(function () { toast("Tebrikler! “" + s[1] + "” bölümünü tamamladın."); }, 400); }
  return true;
}
function isaretle(key) { if (!A[key]) { A[key] = { ok: 1, v: "" }; cevapKaydet(); ustGuncelle(); } }
function img(ad, cls, alt) { return RESIM[ad] ? '<img class="' + (cls || "rsm") + '" src="' + RESIM[ad] + '" alt="' + esc(alt || "") + '" loading="lazy">' : ''; }
function trSatir(t, tag) {
  if (!t) return "";
  tag = tag || "div";
  if (ST.tr) return '<' + tag + ' class="trline">' + t + '</' + tag + '>';
  return '<div class="tr-gizli"><button type="button" class="btn kucuk trac" data-trac="1">Türkçesi</button><' + tag + ' class="trline" hidden>' + t + '</' + tag + '></div>';
}
function okunus(t) { return ST.okunus && t ? '<div class="okunus">' + t + '</div>' : ''; }
function calBtn(id, etiket) { return '<button type="button" class="calbtn" data-cal="' + id + '" aria-label="Dinle">' + (etiket || "▶") + '</button>'; }
function ayarHtml() {
  return '<div class="ayarlar"><div class="ayar"><span class="lbl">Türkçe</span><div class="seg" role="group">' + [[1, "Açık"], [0, "Tıklayınca"]].map(function (t) { return '<button type="button" data-trm="' + t[0] + '" aria-pressed="' + (ST.tr === !!t[0]) + '">' + t[1] + '</button>'; }).join("") + '</div></div>' +
    '<div class="ayar"><span class="lbl">Okunuş</span><div class="seg" role="group">' + [[1, "Göster"], [0, "Gizle"]].map(function (t) { return '<button type="button" data-oku="' + t[0] + '" aria-pressed="' + (ST.okunus === !!t[0]) + '">' + t[1] + '</button>'; }).join("") + '</div></div>' +
    '<div class="ayar"><span class="lbl">Hız</span><div class="seg" role="group">' + [0.75, 1].map(function (h) { return '<button type="button" data-hiz="' + h + '" aria-pressed="' + (ST.hiz === h) + '">' + (h === 1 ? "Normal" : "Yavaş") + '</button>'; }).join("") + '</div></div></div>';
}
var DOGRU = {};
function secim(key, dogru, yanlislar, o) {
  o = o || {};
  DOGRU[key] = dogru;
  var ops = o.sira ? [dogru].concat(yanlislar).sort() : karistir([dogru].concat(yanlislar), key), c = A[key];
  return '<div class="secim' + (c ? ' bitti' : '') + '" data-k="' + key + '"' + (o.sonraCal ? ' data-sonracal="' + o.sonraCal + '"' : '') + '>' + ops.map(function (op) {
    var cls = ""; if (c) { if (op === dogru) cls = " dogru"; else if (c.v === op) cls = " yanlis"; }
    return '<button type="button" class="sec' + (o.tr ? '' : ' ar') + cls + '" data-v="' + esc(op) + '"' + (c ? ' disabled' : '') + '>' + (o.etiket ? o.etiket(op) : op) + '</button>';
  }).join("") + '</div><div class="sonra"' + (c ? '' : ' hidden') + '>' + (o.sonra || '') + '</div>';
}
// resimli seçim: şıklar resim adları
function resimSecim(key, dogru, siklar, o) {
  o = o || {};
  DOGRU[key] = dogru;
  var c = A[key], ops = o.sira ? siklar : karistir(siklar, key);
  return '<div class="rsecim' + (c ? ' bitti' : '') + '" data-k="' + key + '">' + ops.map(function (r, i) {
    var cls = c ? (r === dogru ? ' dogru' : (c.v === r ? ' yanlis' : '')) : '';
    return '<button type="button" class="rsec' + cls + '" data-rv="' + r + '"' + (c ? ' disabled' : '') + '>' + (o.harf ? '<span class="rharf">' + o.harf[i] + '</span>' : '') + img(r) + '</button>';
  }).join("") + '</div><div class="sonra"' + (c ? '' : ' hidden') + '>' + (o.sonra || '') + '</div>';
}
function yazGoster(key, model, tr, o) {
  o = o || {};
  var c = A[key], yazi = store.get("y:" + key, "");
  return '<textarea class="' + (o.tr ? '' : 'ar') + '" rows="' + (o.satir || 2) + '" data-yaz="' + key + '" placeholder="' + (o.yer || 'Cevabını yaz…') + '">' + esc(yazi) + '</textarea>' +
    '<div class="satir-btn" style="margin-top:6px"><button type="button" class="btn kucuk" data-goster="' + key + '"' + (c ? ' hidden' : '') + '>' + (o.dugme || 'Örnek cevabı göster') + '</button></div>' +
    '<div class="model" data-model="' + key + '"' + (c ? '' : ' hidden') + '>' + (model ? '<div class="ar">' + model + '</div>' : '') + (tr ? '<div class="trline">' + tr + '</div>' : '') +
    '<div class="oz-isaret satir-btn">' + (c ? '<span class="etiket ' + (c.ok ? 'ok">✓ Doğru saydın' : 'no">✗ Tekrar çalış') + '</span>' :
      '<span class="kucuk soluk">Kendi cevabın nasıldı?</span><button type="button" class="btn kucuk" data-oz="' + key + '" data-ok="1">✓ Doğru</button><button type="button" class="btn kucuk" data-oz="' + key + '" data-ok="0">✗ Eksik / yanlış</button>') + '</div></div>';
}
function bolumBasi(t, baslik) {
  return '<div class="bolum-ust"><div class="soluk kucuk" id="bolumSayi" data-t="' + t + '" data-b="' + esc(baslik) + '">' + baslik + ' · ' + Math.min(yapilan(t), toplam(t)) + ' / ' + toplam(t) + ' tamamlandı</div><button type="button" class="btn kucuk" data-sifirla="' + t + '">Bu bölümü sıfırla</button></div><div id="bolumBar">' + ilerlemeHtml(t) + '</div><div style="height:14px"></div>';
}
function kart(baslik, ar, aciklama, govde, id) {
  return '<section class="kart"' + (id ? ' id="' + id + '"' : '') + '><h2>' + baslik + (ar ? ' <span class="ar">' + ar + '</span>' : '') + '</h2>' + (aciklama ? '<p class="aciklama">' + aciklama + '</p>' : '') + govde + '</section>';
}
function soru(no, ic) { return '<div class="soru"><span class="soru-no">' + no + '</span>' + ic + '</div>'; }

// ================= SES MOTORU =================
// Bütün kayıtlar tek dosyada; bir "parça" bir ya da birkaç [başlangıç, bitiş] aralığıdır.
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
function parcaSure(id) { return (ZAMAN[id] || []).reduce(function (s, a) { return s + a[1] - a[0]; }, 0); }
// oynatma planı: adımlar [{t:"ses", s, e, oge}|{t:"bekle", sn, oge, sende}]
var OY = { plan: [], k: -1, beklemeBitis: 0, o: null, aktifOge: -1 };
function oynat(ids, o) {
  durdur(true);
  if (!sesHazirla()) { toast("Ses bulunamadı."); return; }
  o = o || {}; var plan = [];
  ids.forEach(function (id, i) {
    var bek = o.bekle ? o.bekle(i, id) : 0;
    if (o.atla && o.atla(i)) { plan.push({ t: "bekle", sn: bek, oge: i, sende: true }); }
    else {
      (ZAMAN[id] || []).forEach(function (a, j) { plan.push({ t: "ses", s: a[0], e: a[1], oge: i, id: id, ilk: j === 0 }); if (j < ZAMAN[id].length - 1) plan.push({ t: "bekle", sn: 0.25, oge: i }); });
      if (bek) plan.push({ t: "bekle", sn: bek, oge: i, tekrar: true });
    }
    if (i < ids.length - 1 && o.ara) plan.push({ t: "bekle", sn: o.ara, oge: i });
  });
  OY.plan = plan; OY.o = o; OY.ids = ids; OY.k = -1; OY.aktifOge = -1;
  adimGec();
}
function cal1(id) { oynat([id]); }
function adimGec() {
  OY.k++;
  var a = OY.plan[OY.k];
  if (!a) { var bitti = OY.o && OY.o.bitti; ogeVurgu(-1); OY.plan = []; durumYaz(""); if (bitti) bitti(); return; }
  if (a.oge !== OY.aktifOge) { OY.aktifOge = a.oge; ogeVurgu(a.oge); }
  if (a.t === "ses") { ses.currentTime = a.s; ses.playbackRate = ST.hiz; var p = ses.play(); if (p && p.catch) p.catch(function () {}); }
  else { ses.pause(); OY.beklemeBitis = performance.now() + a.sn * 1000 / (a.tekrar || a.sende ? ST.hiz : 1); OY.beklemeSure = a.sn; }
}
function ogeVurgu(i) {
  document.querySelectorAll(".calan").forEach(function (e) { e.classList.remove("calan"); });
  document.querySelectorAll(".sende").forEach(function (e) { e.classList.remove("sende"); });
  if (i < 0 || !OY.ids) return;
  var id = OY.ids[i], a = OY.plan[OY.k];
  document.querySelectorAll('[data-parca="' + id + '"]').forEach(function (e) { e.classList.add(a && a.sende ? "sende" : "calan"); });
  if (OY.o && OY.o.vurgu) OY.o.vurgu(i);
}
function durumYaz(m) { var d = document.getElementById("oyDurum"); if (d) { d.textContent = m; d.hidden = !m; } }
function durdur(sessiz) { OY.plan = []; OY.k = -1; ses.pause(); ogeVurgu(-1); if (!sessiz) durumYaz(""); }
function tik() {
  var a = OY.plan[OY.k];
  if (a) {
    if (a.t === "ses") { if (ses.currentTime >= a.e || ses.ended) { ses.pause(); adimGec(); } }
    else {
      var kalan = (OY.beklemeBitis - performance.now()) / 1000;
      if (a.sende) durumYaz("🎙 Sıra sende! Kendi satırını söyle… " + Math.max(0, Math.ceil(kalan)));
      else if (a.tekrar) durumYaz("🔁 Şimdi sen tekrar et… " + Math.max(0, Math.ceil(kalan)));
      if (kalan <= 0) { durumYaz(""); adimGec(); }
    }
  }
  requestAnimationFrame(tik);
}
requestAnimationFrame(tik);

// ================= BÖLÜMLER =================
var CIZ = {};

CIZ.bas = function () {
  var yol = SEKMELER.slice(1).map(function (s) {
    var y = Math.min(yapilan(s[0]), toplam(s[0])), t = toplam(s[0]);
    return '<button type="button" class="yol-kart" data-git="' + s[0] + '"><span class="ar">' + s[2] + '</span><b>' + s[1] + '</b><span class="soluk">' + YOL[s[0]] + '</span>' + ilerlemeHtml(s[0]) + '<span class="sayi"><span>' + y + ' / ' + t + '</span><span>' + (y === t ? "✓ bitti" : "") + '</span></span></button>';
  }).join("");
  return '<div class="kahraman"><div class="ar">التَّسَوُّقُ</div><h2>Alışveriş</h2>' +
    '<p>el-Arabiyyetü beyne yedeyk, 1. kitap, 9. ünite. Kitapçıda, pazarda ve giyim mağazasında alışveriş yapmayı; “istiyorum” (أُريدُ), “buyurun” (تَفَضَّلْ), “kaça?” (بِكَمْ؟), “hangi …?” (أَيُّ …؟) ve “borcunuz …” (المَطْلوبُ …) demeyi; renkleri ve 20, 30 … 80 gibi onluk sayıları öğreneceksin. Kitabın ses kayıtları bu dosyanın içindedir; internet gerekmez.</p>' +
    '<div class="satir-btn" style="justify-content:center;margin-top:14px"><button type="button" class="btn dolu" data-git="diyalog">▶ İlk diyaloğa başla</button></div></div>' +
    kart("Ayarlar", "", "Türkçe anlamlar ve Latin harfli okunuş başlangıçta yardımcı olur; alıştıkça gizle.", ayarHtml()) +
    kart("Nasıl çalışmalı?", "", "", '<ol class="nasil"><li><b>Bak ve dinle</b> <span class="ar">أُنْظُرْ وَاسْتَمِعْ</span>: önce resme bak, sesi dinle.</li><li><b>Tekrar et</b> <span class="ar">أَعِدْ</span>: “Dinle ve tekrar et” düğmesi her cümleden sonra sana süre verir; yüksek sesle söyle.</li><li><b>Rol yap</b>: diyalogda bir kişiyi seç; onun sözlerini sen söyle.</li><li><b>Oyna ve sına</b>: kelime oyunları ve alıştırmalar; her doğru cevap 10 puan.</li></ol>') +
    kart("Çalışma yolu", "", "Sırayla gitmen önerilir; ilerlemen bu cihazda saklanır.", '<div class="yol">' + yol + '</div><div class="satir-btn" style="margin-top:14px"><button type="button" class="btn kucuk" data-act="hepsiniSifirla">Bütün ilerlemeyi sıfırla</button></div>');
};

// ---------- diyaloglar ----------
CIZ.diyalog = function () {
  var d = DIYALOG[ST.dIdx] || DIYALOG[0], ids = d.satir.map(function (s, i) { return d.id + "-" + i; });
  var sec = '<div class="hap">' + DIYALOG.map(function (x, i) { return '<button type="button" class="hap-btn' + (i === ST.dIdx ? ' aktif' : '') + '" data-didx="' + i + '"><span class="ar">' + x.ad + '</span>' + (A["diyalog/" + x.id] ? ' ✓' : '') + (A["diyalog/" + x.id + "-rol"] ? '★' : '') + '</button>'; }).join("") + '</div>';
  var rolGizle = store.get("rolGizle", false);
  var satirlar = d.satir.map(function (s, i) {
    return '<div class="dsat k' + s[0] + '" data-parca="' + d.id + '-' + i + '" data-dsat="' + i + '"><span class="kisi ar">' + d.kisiler[s[0]] + ':</span><div class="dmetin"><div class="ar dar">' + s[1] + '</div>' + okunus(s[3]) + trSatir(s[2]) + '</div>' + calBtn(d.id + "-" + i) + '</div>';
  }).join("");
  var rol = '<div class="satir-btn"><span class="kucuk soluk">Rol yap — sen kimsin?</span>' + d.kisiler.map(function (k, i) { return '<button type="button" class="btn kucuk" data-rol="' + i + '"><span class="ar">' + k + '</span></button>'; }).join("") +
    '<label class="anahtar"><input type="checkbox" data-rolgizle="1"' + (rolGizle ? ' checked' : '') + '> Rol yaparken kendi satırlarımı gizle</label></div>';
  return bolumBasi("diyalog", "Diyaloglar") + kart("Diyaloglar", "الحِوارُ", "Bir diyalog seç. Satıra dokununca o cümle çalar.", sec + ayarHtml()) +
    '<section class="kart"><h2>' + d.tr.split(":")[0] + ' <span class="ar">' + d.ad + '</span></h2><p class="aciklama">' + (d.tr.split(":")[1] || "") + '</p>' +
    '<div class="diyalog-govde' + (rolGizle ? ' rol-gizle' : '') + '">' + diyalogGorsel(d) + '<div class="dsatirlar">' + satirlar + '</div></div>' +
    '<div class="oy-durum" id="oyDurum" hidden></div>' +
    '<div class="satir-btn" style="margin-top:10px"><button type="button" class="btn dolu" data-dact="dinle">▶ Diyaloğu dinle</button><button type="button" class="btn" data-dact="tekrar">🔁 Dinle ve tekrar et</button><button type="button" class="btn" data-dact="dur">■ Durdur</button></div>' +
    '<div style="margin-top:10px">' + rol + '</div></section>' + diyalogSoru(d);
};
function diyalogSoru(d) {
  return kart("Sorulara kısa cevap ver", "أَجِبْ عَنِ الأَسْئِلَةِ بِاخْتِصارٍ", "Diyaloğa göre doğru cevabı seç. Son sorular senin hakkında: kendi cevabını sesli söyle.", d.soru.map(function (q, i) { return soru(i + 1, '<span class="ar sar">' + q[0] + '</span>' + (q[2] ? secim("diyalog/" + d.id + "/s" + i, q[1], q[2], { sira: true }) : yazGoster("diyalog/" + d.id + "/s" + i, q[1], "", { yer: "Cevabını yaz ya da söyle…" }))); }).join(""));
}
function diyalogGorsel(d) {
  if (d.agac) return '<div class="agac">' + d.agac.map(function (sira) { return '<div class="agac-sira">' + sira.map(function (k) { return '<figure>' + img(k[0]) + '<figcaption class="ar">' + k[1] + '</figcaption></figure>'; }).join("") + '</div>'; }).join("") + '</div>';
  if (d.resimler) return '<div class="dresimler">' + d.resimler.map(function (r) { return img(r, "dresim"); }).join("") + '</div>';
  return img(d.resim, "dresim");
}
function diyalogCal(tur, rolKisi) {
  var d = DIYALOG[ST.dIdx], ids = d.satir.map(function (s, i) { return d.id + "-" + i; });
  if (tur === "dinle") oynat(ids, { ara: 0.45, bitti: function () { if (!A["diyalog/" + d.id]) { isaretle("diyalog/" + d.id); toast("Diyaloğu dinledin. Şimdi tekrar et ya da rol yap!"); ciz(); } } });
  else if (tur === "tekrar") oynat(ids, { ara: 0.2, bekle: function (i, id) { return parcaSure(id) * 1.3 + 0.8; }, bitti: function () { isaretle("diyalog/" + d.id); ciz(); } });
  else if (tur === "rol") { document.querySelectorAll(".dsat").forEach(function (e) { e.classList.remove("benim", "acildi"); }); document.querySelectorAll(".dsat.k" + rolKisi).forEach(function (e) { e.classList.add("benim"); }); oynat(ids, { ara: 0.35, atla: function (i) { return d.satir[i][0] === rolKisi; }, bekle: function (i, id) { return d.satir[i][0] === rolKisi ? parcaSure(id) * 1.5 + 1.2 : 0; },
    bitti: function () { cevapla("diyalog/" + d.id + "-rol", true); bip(true); toast("Rolünü tamamladın! Rolü değiştirip tekrar dene."); document.querySelectorAll(".dsat.acildi").forEach(function (e) { e.classList.remove("acildi"); }); ciz(); },
    vurgu: function (i) { var e = document.querySelector('.dsat[data-dsat="' + (i - 1) + '"]'); if (e) e.classList.add("acildi"); } }); }
}

// ---------- kelimeler ----------
var KOYUN = {};
function kelimeListe() { return KELIME.map(function (k, i) { return i; }).filter(function (i) { return !ST.kDers || KELIME[i][4] === ST.kDers; }); }
CIZ.kelime = function () {
  var liste = kelimeListe();
  var filtre = '<div class="hap">' + KELIME_DERS.map(function (x) { return '<button type="button" class="hap-btn' + (ST.kDers === x[0] ? ' aktif' : '') + '" data-kders="' + x[0] + '">' + x[1] + '</button>'; }).join("") + '</div>';
  var grid = '<div class="kgrid">' + liste.map(function (i) { var k = KELIME[i]; return '<button type="button" class="kkart' + (A["kelime/k/" + i] ? ' duydu' : '') + '" data-kcal="' + i + '" data-parca="' + k[5] + '">' + img(k[3]) + '<span class="ar kar">' + k[0] + '</span>' + (ST.okunus ? '<span class="okunus">' + k[2] + '</span>' : '') + (ST.tr ? '<span class="ktr">' + k[1] + '</span>' : '') + '</button>'; }).join("") + '</div>';
  var ctrl = '<div class="oy-durum" id="oyDurum" hidden></div><div class="satir-btn" style="margin-top:10px"><button type="button" class="btn dolu" data-kact="hepsi">▶ Hepsini dinle</button><button type="button" class="btn" data-kact="tekrar">🔁 Dinle ve tekrar et</button><button type="button" class="btn" data-dact="dur">■ Durdur</button></div>';
  return bolumBasi("kelime", "Kelimeler") + kart("Bak, dinle ve tekrar et", "أُنْظُرْ وَاسْتَمِعْ وَأَعِدْ", "Bir karta dokununca kelime okunur. Her kelimeyi en az bir kez dinle.", filtre + ayarHtml() + '<div style="height:10px"></div>' + grid + ctrl) +
    kart("Oyun 1: Dinle, resmi bul", "اِسْتَمِعْ وَاخْتَرِ الصّورَةَ", "Kelimeyi dinle, doğru resme dokun. 8 sorudan en az 6 doğru puan kazandırır.", oyunHtml("o1")) +
    kart("Oyun 2: Resme bak, kelimeyi seç", "اُنْظُرْ وَاخْتَرِ الكَلِمَةَ", "Resimdeki kelime hangisi? (Seçimden sonra kelime okunur.)", oyunHtml("o2")) +
    kart("Oyun 3: Resim – kelime eşleştir", "صِلْ بَيْنَ الكَلِمَةِ وَالصّورَةِ المُناسِبَةِ", "Bir resme, sonra onun kelimesine dokun.", esleHtml("kelime/esle", function () { var l = karistir(kelimeListe().filter(function (i) { return KELIME[i][0] !== "أَنا"; })).slice(0, 6); return l.map(function (i) { return { sol: img(KELIME[i][3]), sag: '<span class="ar">' + KELIME[i][0] + '</span>', parca: KELIME[i][5] }; }); }));
};
function oyunYeni(tur) {
  var havuz = kelimeListe(), sorular = karistir(havuz).slice(0, Math.min(8, havuz.length));
  var tum = KELIME.map(function (k, i) { return i; });
  KOYUN[tur] = { i: 0, puan: 0, cevap: null, sorular: sorular.map(function (d) {
    var yan = karistir(tum.filter(function (j) { return j !== d && KELIME[j][0] !== KELIME[d][0] && KELIME[j][3] !== KELIME[d][3]; })).slice(0, 3);
    return { d: d, ops: karistir([d].concat(yan)) };
  }) };
}
function oyunHtml(tur) {
  var o = KOYUN[tur];
  if (!o) return '<div class="satir-btn"><button type="button" class="btn dolu" data-oyun="' + tur + '">Oyunu başlat</button>' + (A["kelime/" + tur] ? '<span class="etiket ok">✓ Daha önce başardın</span>' : '') + '</div>';
  if (o.i >= o.sorular.length) return '<div class="sonuc-buyuk">' + o.puan + ' / ' + o.sorular.length + '</div><p style="text-align:center" class="soluk">' + (o.puan >= 6 ? "Harika!" : "Bir daha dene; kelimeleri dinleyerek tekrar et.") + '</p><div class="satir-btn" style="justify-content:center"><button type="button" class="btn dolu" data-oyun="' + tur + '">Yeniden oyna</button></div>';
  var q = o.sorular[o.i], k = KELIME[q.d];
  var ust = '<div class="ilerleme" style="margin-bottom:10px"><i style="width:' + Math.round(100 * o.i / o.sorular.length) + '%"></i></div><div class="soluk kucuk">Soru ' + (o.i + 1) + ' / ' + o.sorular.length + ' · doğru: ' + o.puan + '</div>';
  if (tur === "o1") {
    return ust + '<div class="satir-btn" style="justify-content:center;margin:10px 0"><button type="button" class="btn dolu buyuk-cal" data-cal="' + k[5] + '">🔊 Dinle</button></div><div class="rsecim">' + q.ops.map(function (j) { var cls = o.cevap === null ? '' : (j === q.d ? ' dogru' : (o.cevap === j ? ' yanlis' : '')); return '<button type="button" class="rsec' + cls + '" data-ocev="' + tur + '" data-j="' + j + '"' + (o.cevap !== null ? ' disabled' : '') + '>' + img(KELIME[j][3]) + (o.cevap !== null ? '<span class="ar kar">' + KELIME[j][0] + '</span>' : '') + '</button>'; }).join("") + '</div>' + (o.cevap !== null ? '<div class="satir-btn" style="justify-content:center;margin-top:10px"><button type="button" class="btn dolu" data-osonraki="' + tur + '">Sonraki →</button></div>' : '');
  }
  return ust + '<div style="text-align:center;margin:10px 0">' + img(k[3], "rsm buyuk") + '</div><div class="secim" style="justify-content:center">' + q.ops.map(function (j) { var cls = o.cevap === null ? '' : (j === q.d ? ' dogru' : (o.cevap === j ? ' yanlis' : '')); return '<button type="button" class="sec ar' + cls + '" data-ocev="' + tur + '" data-j="' + j + '"' + (o.cevap !== null ? ' disabled' : '') + '>' + KELIME[j][0] + '</button>'; }).join("") + '</div>' + (o.cevap !== null ? '<div class="sonra">' + KELIME[q.d][1] + '</div><div class="satir-btn" style="justify-content:center;margin-top:10px"><button type="button" class="btn dolu" data-osonraki="' + tur + '">Sonraki →</button></div>' : '');
}
// genel eşleştirme: sol/sağ html
var ES = {}, ES_KAYNAK = {};
function esleHtml(key, kaynak) {
  ES_KAYNAK[key] = kaynak;
  var o = ES[key];
  if (!o || o.yeni) { var c = kaynak(); o = ES[key] = { c: c, sol: karistir(c.map(function (x, i) { return i; })), sag: karistir(c.map(function (x, i) { return i; })), tamam: [], hata: 0, secili: null }; }
  return '<div class="eslestir" data-esle="' + key + '"><div class="sutun">' + o.sol.map(function (i) { return '<button type="button" class="es' + (o.tamam.indexOf(i) >= 0 ? ' tamam' : '') + '" data-es="sol" data-i="' + i + '"' + (o.tamam.indexOf(i) >= 0 ? ' disabled' : '') + '>' + o.c[i].sol + '</button>'; }).join("") + '</div>' +
    '<div class="sutun">' + o.sag.map(function (i) { return '<button type="button" class="es' + (o.tamam.indexOf(i) >= 0 ? ' tamam' : '') + '" data-es="sag" data-i="' + i + '"' + (o.tamam.indexOf(i) >= 0 ? ' disabled' : '') + '>' + o.c[i].sag + '</button>'; }).join("") + '</div></div>' +
    '<div class="satir-btn" style="margin-top:10px"><span class="kucuk soluk">Hata: <b data-eshata="' + key + '">' + o.hata + '</b>' + (A[key] ? ' · ✓ başarıldı' : '') + '</span><button type="button" class="btn kucuk" data-esyeni="' + key + '">Yeni tur</button></div>';
}
function esleYenile(key) { var kap = document.querySelector('[data-esle="' + key + '"]'); if (!kap) return; var tmp = document.createElement("div"); tmp.innerHTML = esleHtml(key, ES_KAYNAK[key]); var alt = kap.nextElementSibling; kap.replaceWith(tmp.children[0]); alt.replaceWith(tmp.children[0]); }
function esleTik(el) {
  var key = el.closest("[data-esle]").dataset.esle, o = ES[key], yan = el.dataset.es, i = +el.dataset.i;
  if (o.tamam.indexOf(i) >= 0) return;
  if (!o.secili || o.secili.yan === yan) { document.querySelectorAll('[data-esle="' + key + '"] .es.secili').forEach(function (b) { b.classList.remove("secili"); }); o.secili = { yan: yan, i: i, el: el }; el.classList.add("secili"); return; }
  var diger = o.secili; o.secili = null; diger.el.classList.remove("secili");
  if (diger.i === i) {
    o.tamam.push(i); bip(true); if (o.c[i].parca) cal1(o.c[i].parca);
    document.querySelectorAll('[data-esle="' + key + '"] .es[data-i="' + i + '"]').forEach(function (b) { b.classList.add("tamam"); b.disabled = true; });
    if (o.tamam.length === o.c.length) { cevapla(key, o.hata <= 2, o.hata); toast(o.hata === 0 ? "Kusursuz!" : "Tamam! Hata: " + o.hata); }
  } else {
    o.hata++; bip(false);
    [el, diger.el].forEach(function (b) { b.classList.add("hata", "titre"); setTimeout(function () { b.classList.remove("hata", "titre"); }, 450); });
    var hb = document.querySelector('[data-eshata="' + key + '"]'); if (hb) hb.textContent = o.hata;
  }
}

// ---------- sıra sayıları ----------
var SIRA = null, SDIN = null;
var RAKAM_AR = "٠١٢٣٤٥٦٧٨٩";
function arRakam(n) { return String(n).replace(/\d/g, function (d) { return RAKAM_AR[+d]; }); }
CIZ.sayi = function () {
  var kartlar = '<div class="kgrid">' + GUN.map(function (g, i) { return '<button type="button" class="kkart' + (A["sayi/s/" + i] ? ' duydu' : '') + '" data-scal="' + i + '" data-parca="g' + i + '">' + img(GUN_RESIM[i]) + '<span class="ar kar">' + g[0] + '</span>' + (ST.okunus ? '<span class="okunus">' + g[2] + '</span>' : '') + (ST.tr ? '<span class="ktr">' + g[1] + '</span>' : '') + '</button>'; }).join("") + '</div>';
  var tum = GUN.map(function (g, i) { return i; }), dizi = karistir(tum, "renk-dizi");
  var din = SDIN || (SDIN = { sorular: karistir(tum).concat(karistir(tum)).slice(0, 6), i: 0, puan: 0, cevap: null });
  var dinHtml = din.i >= din.sorular.length ? '<div class="sonuc-buyuk">' + din.puan + ' / ' + din.sorular.length + '</div><div class="satir-btn" style="justify-content:center"><button type="button" class="btn dolu" data-act="sdinYeni">Yeniden oyna</button></div>' :
    '<div class="soluk kucuk">Soru ' + (din.i + 1) + ' / ' + din.sorular.length + '</div><div class="satir-btn" style="justify-content:center;margin:8px 0"><button type="button" class="btn dolu" data-cal="g' + din.sorular[din.i] + '">🔊 Dinle</button></div><div class="rsecim">' + dizi.map(function (i) { var cls = din.cevap === null ? '' : (i === din.sorular[din.i] ? ' dogru' : (din.cevap === i ? ' yanlis' : '')); return '<button type="button" class="rsec' + cls + '" data-sdin="' + i + '"' + (din.cevap !== null ? ' disabled' : '') + '>' + img(GUN_RESIM[i]) + (din.cevap !== null ? '<span class="ar kar">' + GUN[i][0] + '</span>' : '') + '</button>'; }).join("") + '</div>' + (din.cevap !== null ? '<div class="satir-btn" style="justify-content:center"><button type="button" class="btn dolu" data-act="sdinSonraki">Sonraki →</button></div>' : '');
  var ot = ONLUK.map(function (o, i) { return i; });
  var sira = SIRA || (SIRA = { havuz: karistir(ot), dizi: [], hata: 0 });
  var siraHtml = '<div class="sira-kutu">' + sira.havuz.map(function (i) { var yer = sira.dizi.indexOf(i) >= 0; return '<button type="button" class="rakam-btn gun-btn ar' + (yer ? ' dogru' : '') + '" data-sira="' + i + '"' + (yer ? ' disabled' : '') + '>' + ONLUK[i][1] + '</button>'; }).join("") + '</div><div class="sira-kutu">' + ONLUK.map(function (o, i) { return '<span class="rakam-yer gun-yer ar">' + (sira.dizi[i] !== undefined ? ONLUK[sira.dizi[i]][1] : arRakam(o[0])) + '</span>'; }).join("") + '</div><div class="satir-btn"><span class="kucuk soluk">Hata: ' + sira.hata + '</span>' + (A["sayi/sira"] ? '<span class="etiket ok">✓</span>' : '') + '<button type="button" class="btn kucuk" data-act="siraYeni">Yeniden</button></div>';
  var onluk = '<div class="kgrid">' + ONLUK.map(function (o) { return '<button type="button" class="kkart" data-cal="' + o[3] + '">' + img(o[4]) + '<span class="rakam">' + arRakam(o[0]) + '</span><span class="ar kar">' + o[1] + '</span>' + (ST.okunus ? '<span class="okunus">' + o[2] + '</span>' : '') + '</button>'; }).join("") + '</div>';
  return bolumBasi("sayi", "Renkler ve sayılar") + kart("Ek kelimeler: renkler", "مُفْرَداتٌ إِضافِيَّةٌ", "Renge dokun, dinle ve tekrar et. Renk kelimesi isimden sonra gelir: قَميصٌ أَزْرَقُ (mavi gömlek), القَميصُ الأَزْرَقُ (mavi gömlek — belirli). İleride: dişil isimle renk de dişil olur: النَّظّارَةُ الزَّرْقاءُ, النَّظّارَةُ السَّوْداءُ.", kartlar + '<div class="oy-durum" id="oyDurum" hidden></div><div class="satir-btn" style="margin-top:10px"><button type="button" class="btn dolu" data-sact="hepsi">▶ Hepsini dinle</button><button type="button" class="btn" data-sact="tekrar">🔁 Dinle ve tekrar et</button></div>') +
    kart("1. Rengi adıyla eşleştir", "صِلْ بَيْنَ الصّورَةِ وَاللَّوْنِ", "Bir renge, sonra onun adına dokun.", esleHtml("sayi/esle", function () { return tum.map(function (i) { return { sol: img(GUN_RESIM[i]), sag: '<span class="ar">' + GUN[i][0] + '</span>', parca: "g" + i }; }); })) +
    kart("2. Duyduğun rengi göster", "اِسْتَمِعْ وَأَشِرْ إِلى اللَّوْنِ", "6 sorudan en az 5 doğru puan kazandırır.", dinHtml) +
    kart("3. Renklerin adını söyle", "قُلْ أَسْماءَ الأَلْوانِ", "Bu renk ne? Sesli söyle; sonra dokunup doğrusunu dinle.", '<div class="kgrid">' + karistir(tum, "renk-soyle").map(function (i) { return '<button type="button" class="kkart" data-cal="g' + i + '">' + img(GUN_RESIM[i]) + '</button>'; }).join("") + '</div>') +
    kart("4. Onluk sayılar", "الأَعْدادُ", "Fiyat söylerken: المَطْلوبُ عِشْرونَ رِيالًا (borcunuz yirmi riyal). Onluklardan sonra gelen isim tekil ve üstünlü olur: ثَلاثونَ رِيالًا. İleride: بِـ’den sonra sonu değişir: القَميصُ بِعِشْرينَ رِيالًا. Karta dokun, cümleyi dinle.", onluk) +
    kart("5. Onlukları sırala", "رَتِّبِ الأَعْدادَ", "Yirmiden (عِشْرونَ) başlayarak küçükten büyüğe dokun.", siraHtml) +
    kart("6. Rakamı sayıyla eşleştir", "صِلْ بَيْنَ الرَّقْمِ وَالعَدَدِ", "Rakama, sonra onun yazısına dokun.", esleHtml("sayi/esle2", function () { return karistir(ot).slice(0, 6).map(function (i) { return { sol: '<span class="ar" style="font-size:1.8rem">' + arRakam(ONLUK[i][0]) + '</span>', sag: '<span class="ar">' + ONLUK[i][1] + '</span>', parca: ONLUK[i][3] }; }); }));
};

// ---------- kalıplar ----------
function dinleBtn(id) { return ZAMAN[id] ? calBtn(id, "▶ Dinle") : ""; }
function ornek(id, metin) { return '<div class="not">' + (ZAMAN[id] ? calBtn(id) + ' ' : '') + 'Örnek: <span class="ar sar">' + metin + '</span></div>'; }
CIZ.kalip = function () {
  var ozet = '<div class="ozet-grid">' + KALIP_OZET.map(function (k) { return '<div class="ozet-kutu"><div class="ar ozet-bas">' + k[0] + '</div><div class="ozet-ic">' + k[1].map(function (x) { return '<span class="ar">' + x + '</span>'; }).join("") + '</div><div class="kucuk soluk">' + arSar(k[2]) + '</div></div>'; }).join("") + '</div>';
  return bolumBasi("kalip", "Kalıplar") + kart("Kalıpların özeti", "مُلَخَّصُ التَّراكيبِ", "", ozet) + KALIP_T.map(function (t, ti) {
    return kart(t.ad, t.ar, t.not, t.ornek.map(function (o) { return ornek(o[0], o[1]); }).join("") + t.oge.map(function (x, i) {
      return soru(i + 1, '<div class="rsatir">' + (x.r ? img(x.r, "rsm orta") : '') + '<div style="flex:1">' + (x.ipucu ? '<span class="kucuk soluk">' + x.ipucu + '</span> ' : '') + (x.s ? '<span class="ar sar">' + x.s + '</span>' : '') +
        secim("kalip/t" + ti + "/" + i, x.d, x.y, { sira: !!x.sira, sonraCal: ZAMAN[x.ses] ? x.ses : "", sonra: (x.sonra ? '<span class="ar sar">' + x.sonra + '</span> ' : '') + dinleBtn(x.ses) }) + '</div></div>');
    }).join(""));
  }).join("");
};

// ---------- sesler: ط ----------
var KK = null;
function hVurgu(s) { return s.replace(/ظ/g, '<b class="vurgu-harf">ظ</b>'); }
CIZ.ses = function () {
  var kel = '<div class="kgrid kucuk-grid">' + SES_KELIME.map(function (k, i) { return '<button type="button" class="kkart" data-cal="h-' + i + '" data-parca="h-' + i + '"><span class="ar kar">' + hVurgu(k) + '</span></button>'; }).join("") + '</div>';
  var cift = '<div class="cift-grid">' + CIFT.map(function (c, i) { return '<div class="cift"><button type="button" class="cbtn kh" data-cal="ha-' + i + '" data-parca="ha-' + i + '"><span class="ar">' + c[0] + '</span></button><button type="button" class="cbtn kf" data-cal="he-' + i + '" data-parca="he-' + i + '"><span class="ar">' + c[1] + '</span></button></div>'; }).join("") + '</div>';
  var o = KK;
  var oyun = !o ? '<div class="satir-btn"><button type="button" class="btn dolu" data-act="kkBasla">Oyunu başlat</button>' + (A["ses/oyun"] ? '<span class="etiket ok">✓ Başardın</span>' : '') + '</div>' :
    o.i >= o.s.length ? '<div class="sonuc-buyuk">' + o.puan + ' / ' + o.s.length + '</div><div class="satir-btn" style="justify-content:center"><button type="button" class="btn dolu" data-act="kkBasla">Yeniden oyna</button></div>' :
    (function () { var q = o.s[o.i], c = CIFT[q.c]; return '<div class="soluk kucuk">Soru ' + (o.i + 1) + ' / ' + o.s.length + ' · doğru: ' + o.puan + '</div><div class="satir-btn" style="justify-content:center;margin:8px 0"><button type="button" class="btn dolu" data-cal="' + (q.kh ? "ha-" : "he-") + q.c + '">🔊 Dinle</button></div><div class="secim" style="justify-content:center">' + [0, 1].map(function (j) { var dog = (j === 0) === q.kh, cls = o.cevap === null ? '' : (dog ? ' dogru' : (o.cevap === j ? ' yanlis' : '')); return '<button type="button" class="sec ar' + cls + '" data-kk="' + j + '"' + (o.cevap !== null ? ' disabled' : '') + ' style="font-size:2rem">' + c[j] + '</button>'; }).join("") + '</div>' + (o.cevap !== null ? '<div class="satir-btn" style="justify-content:center"><button type="button" class="btn dolu" data-act="kkSonraki">Sonraki →</button></div>' : ''); })();
  var ayet = AYET.map(function (a, i) { return '<div class="dsat' + (A["ses/ayet/" + i] ? ' duydu' : '') + '" data-parca="ayet-' + i + '"><div class="dmetin"><div class="ar dar">' + hVurgu(a[0]) + '</div><div class="kucuk soluk ar">' + a[1] + '</div></div>' + calBtn("ayet-" + i) + '</div>'; }).join("");
  return bolumBasi("ses", "Sesler") + kart("1. ظ sesi", "اِسْتَمِعْ وَأَعِدْ", "ظ, ذ’nin kalın (dolgun) olanıdır: dil ucu üst ön dişlerin ucuna değer, İngilizcedeki “this” kelimesinin “th” sesi gibi; ama ağız dolgun açılır ve ardından gelen ünlüler kalın duyulur. Dinle ve tekrar et.", kel) +
    kart("2. ظ mı, yoksa ذ mi?", "اِسْتَمِعْ وَأَعِدْ", "Her çiftte sağdaki ظ, soldaki ذ ile. İkisini de dinleyip farkı duy: ظ kalın, ذ incedir.", cift) +
    kart("Oyun: Hangisini duydun?", "", "Kelimeyi dinle; ظ ile mi ذ ile mi? 10 sorudan en az 8 doğru puan kazandırır.", oyun) +
    kart("3. Âyetlerde ظ", "اِسْتَمِعْ وَأَعِدْ", "Âyeti dinle, sonra tekrar et.", '<div class="ar-ayet">' + ayet + '</div>');
};

// ---------- dinleme ----------
CIZ.dinleme = function () {
  return bolumBasi("dinleme", "Dinleme") + DINLE_SEC.map(function (g, gi) {
    return kart(g.ad, g.ar, g.not, '<div class="satir-btn" style="margin-bottom:8px">' + calBtn(g.ses, "▶ " + (g.etiket || "Kaydı dinle")) + '</div>' + g.oge.map(function (q, i) {
      return soru(i + 1, '<span class="ar sar">' + q[0] + '</span>' + secim("dinleme/s" + gi + "-" + i, q[1], q[2], { sira: true }));
    }).join(""));
  }).join("");
};

// ---------- okuma ----------
CIZ.okuma = function () {
  var abc = ["أ", "ب", "ج"];
  var t1 = FARKLI.map(function (f, i) {
    var key = "okuma/farkli/" + i, dog = abc[f[1]];
    return soru(i + 1, '<div class="farkli-liste">' + f[0].map(function (x, j) { return '<div><span class="rharf">' + abc[j] + '</span> <span class="ar sar">' + x + '</span></div>'; }).join("") + '</div>' + secim(key, dog, abc.filter(function (h) { return h !== dog; }), { sira: true, sonra: "Farklı olan: " + dog }));
  }).join("");
  var t3 = esleHtml("okuma/resim", function () { return CUMLE_RESIM.map(function (x) { return { sol: img(x[1]), sag: '<span class="ar">' + x[0] + '</span>' }; }); });
  var t4 = esleHtml("okuma/soru", function () { return SORU_CEVAP.map(function (x) { return { sol: '<span class="ar">' + x[0] + '</span>', sag: '<span class="ar">' + x[1] + '</span>' }; }); });
  var met = METINLER.map(function (m, mi) {
    return kart(m.ad, m.ar || "اِقْرَأِ الفِقْرَةَ، ثُمَّ أَجِبْ", m.not || "Metni oku ya da dinle; sonra soruların doğru cevabını seç.",
      (m.resim ? '<div class="dresimler metin-resim">' + m.resim.map(function (r) { return img(r, "dresim"); }).join("") + '</div>' : '') +
      '<div class="metin" data-parca="' + m.ses + '"><p class="ar">' + m.metin + '</p>' + trSatir(m.tr) + '</div><div class="oy-durum" id="oyDurum' + (mi ? mi : '') + '" hidden></div><div class="satir-btn" style="margin:8px 0">' + (ZAMAN[m.ses] ? calBtn(m.ses, "▶ Metni dinle") : '') + '</div>' +
      m.soru.map(function (q, i) { return (q[3] ? '<div class="not" style="margin-top:12px">' + q[3] + '</div>' : '') + soru(i + 1, '<span class="ar sar">' + q[0] + '</span>' + secim("okuma/m" + mi + "/" + i, q[1], q[2], { sira: true })); }).join(""));
  }).join("");
  return bolumBasi("okuma", "Okuma") + (FARKLI.length ? kart("Farklı olanı bul", "ضَعْ عَلامَةَ (✗) بِجانِبِ المُخْتَلِفِ", "Üç yazıdan biri farklı. Hangisi?", t1) : '') +
    (CUMLE_RESIM.length ? kart("Cümleyi resimle eşleştir", "صِلْ بَيْنَ الجُمْلَةِ وَالصّورَةِ المُناسِبَةِ", "Bir resme, sonra ona uyan cümleye dokun.", t3) : '') +
    (SORU_CEVAP.length ? kart("Soruyu cevapla eşleştir", "صِلْ بَيْنَ السُّؤالِ وَالجَوابِ", "", t4) : '') + met;
};

// ---------- yazı ----------
var IZ = { secili: HARF[0][0], cizgi: [] };
function harfBulHtml(i) {
  var h = HARF_BUL[i], key = "yazi/bul/" + i, d = store.get("hb:" + i, { b: [], h: 0 }), c = A[key];
  return '<div class="secim" data-hb="' + i + '">' + h[1].map(function (w) { var ok = h[2].indexOf(w) >= 0, bul = d.b.indexOf(w) >= 0 || (c && ok); return '<button type="button" class="sec ar' + (bul ? ' dogru' : '') + '" data-hbw="' + esc(w) + '"' + (bul || c ? ' disabled' : '') + '>' + w + '</button>'; }).join("") + '</div><div class="sonra kucuk">' + (c ? '✓ Tamam · hata: ' + d.h : 'Bulunan: ' + d.b.length + ' / ' + h[2].length + ' · hata: ' + d.h) + '</div>';
}
CIZ.yazi = function () {
  var tablo = '<div class="harf-tablo">' + HARF.map(function (h) { return '<div class="harf-kutu"><div class="ar harf-buyuk">' + h[0] + '</div><div class="kucuk soluk">' + h[1] + '</div><div class="ar">' + h[2].join(" &nbsp; ") + '</div><div class="ar kucuk-ar">' + h[3].join(" · ") + '</div></div>'; }).join("") + '</div><p class="not">' + arSar(HARF_NOT) + '</p>';
  var secenek = HARF.map(function (h) { return h[0]; }).concat(YAZ_KELIME);
  var iz = '<div class="hap">' + secenek.map(function (x) { var bitti = A["yazi/iz/" + x]; return '<button type="button" class="hap-btn' + (IZ.secili === x ? ' aktif' : '') + '" data-izsec="' + esc(x) + '"><span class="ar">' + x + '</span>' + (bitti ? ' ✓' : '') + '</button>'; }).join("") + '</div>' +
    '<div class="iz-kap"><canvas id="izTuval" width="600" height="300" aria-label="Çizim alanı"></canvas></div><div class="satir-btn"><button type="button" class="btn" data-act="izTemizle">Temizle</button><button type="button" class="btn dolu" data-act="izTamam">✓ Tamam</button><span class="kucuk soluk">Parmağınla ya da fareyle soluk harfin üzerinden geç.</span></div>';
  var es = esleHtml("yazi/esle", function () { return YAZ_RESIM.map(function (x) { return { sol: img(x[1]), sag: '<span class="ar" style="font-size:1.6rem">' + x[0] + '</span>' }; }); });
  var eks = EKSIK.map(function (e, i) { return soru(i + 1, '<span class="ar sar" style="font-size:1.8rem">' + e[0] + '</span>' + secim("yazi/eksik/" + i, e[1], e[2].filter(function (h) { return h !== e[1]; }), { sira: true, sonra: '<span class="ar sar">' + e[3] + '</span>' })); }).join("");
  var bas = BAS_HARF.map(function (b, i) { return soru(i + 1, '<span class="soluk kucuk">Bu kelimeler hangi harfle bitiyor?</span><div class="ar sar">' + b[0].join(" · ") + '</div>' + secim("yazi/bas/" + i, b[1], rastgele(HARF_SIK, 3, [b[1]]), { sira: true })); }).join("");
  var bul = HARF_BUL.map(function (h, i) { return soru(i + 1, '<span class="soluk kucuk">İçinde</span> <span class="ar sar" style="color:var(--vurgu)">' + h[0] + '</span> <span class="soluk kucuk">harfi olan kelimeleri seç:</span>' + harfBulHtml(i)); }).join("");
  return bolumBasi("yazi", "Yazı") + kart("Harflerden kelimeye", "صِلْ بَيْنَ الحُروفِ لِتُصْبِحَ كَلِمَةً", "", tablo) +
    kart("Harfi çiz", "مُرَّ بِقَلَمِكَ عَلى الحَرْفِ", "Bir harf ya da kelime seç; soluk yazının üzerinden geç. Her harf için “Tamam” de.", iz) +
    kart("Resme bak, kelimeyi bul", "اُكْتُبِ الكَلِماتِ تَحْتَ الصُّوَرِ", "Tekil ve çoğul: قَميصٌ → قُمْصانٌ. Bir resme, sonra onun kelimesine dokun.", es) +
    kart("Harfleri sırala", "رَتِّبِ الحُروفَ، ثُمَّ صِلْ بَيْنَها لِتُصْبِحَ كَلِمَةً", "Karışık harflerden hangi kelime çıkar?", eks) +
    kart("Sondaki harf", "اُكْتُبْ في الدّائِرَةِ الحَرْفَ الَّذي تَنْتَهي بِهِ الكَلِماتُ", "", bas) +
    kart("Harfi bul", "ضَعْ عَلامَةَ (✓) أَمامَ الكَلِمَةِ الَّتي فيها الحَرْفُ", "", bul);
};

function izKur() {
  var cv = document.getElementById("izTuval"); if (!cv) return;
  var ctx = cv.getContext("2d"), r = cv.getBoundingClientRect(), olcek = cv.width / r.width;
  var renk = getComputedStyle(document.body);
  function ciz2() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = renk.getPropertyValue("--yumusak") || "#eee"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = renk.getPropertyValue("--cizgi"); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(20, 200); ctx.lineTo(580, 200); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "rgba(150,140,120,.35)"; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.direction = "rtl";
    var boy = IZ.secili.length > 2 ? 150 : 220; ctx.font = boy + 'px "Scheherazade New", serif'; ctx.fillText(IZ.secili, 300, 215);
    ctx.strokeStyle = renk.getPropertyValue("--vurgu") || "#1e6b58"; ctx.lineWidth = 12; ctx.lineCap = "round"; ctx.lineJoin = "round";
    IZ.cizgi.forEach(function (c) { ctx.beginPath(); c.forEach(function (p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); ctx.stroke(); });
  }
  var akt = null;
  function nokta(e) { var b = cv.getBoundingClientRect(); return [(e.clientX - b.left) * cv.width / b.width, (e.clientY - b.top) * cv.height / b.height]; }
  cv.onpointerdown = function (e) { e.preventDefault(); cv.setPointerCapture(e.pointerId); akt = [nokta(e)]; IZ.cizgi.push(akt); ciz2(); };
  cv.onpointermove = function (e) { if (!akt) return; akt.push(nokta(e)); ciz2(); };
  cv.onpointerup = cv.onpointercancel = function () { akt = null; };
  IZ.yeniden = ciz2;
  if (document.fonts && document.fonts.load) document.fonts.load('40px "Scheherazade New"').then(ciz2, ciz2); else ciz2();
}

// ---------- konuşma ----------
CIZ.konusma = function () {
  var k = KONUS.map(function (x, i) {
    var key = "konusma/k/" + i;
    return soru(i + 1, '<b>' + x[0] + '</b>' + (x[3] ? '<div style="margin-top:6px">' + img(x[3], "rsm orta") + '</div>' : '') + '<div class="not" style="margin:6px 0"><span class="kucuk">Örnek:</span> <span class="ar sar">' + x[1] + '</span></div><div class="hap">' + x[2].map(function (c) { return '<span class="hap-btn' + (c[2] ? ' resimli' : '') + '">' + (c[2] ? img(c[2], "hap-resim") : '') + '<span class="ar">' + c[0] + (c[1] ? ' – ' + c[1] : '') + '</span></span>'; }).join("") + '</div>' +
      '<div class="satir-btn" style="margin-top:6px">' + (A[key] ? '<span class="etiket ok">✓ Konuştuk</span>' : '<button type="button" class="btn kucuk" data-konus="' + i + '">Arkadaşımla konuştuk</button>') + '</div>');
  }).join("");
  var c = CEVAPLA.map(function (x, i) { return soru(i + 1, '<span class="ar sar">' + x[0] + '</span>' + trSatir(x[2]) + yazGoster("konusma/cevap/" + i, x[1], "", { yer: "Arapça cevabını yaz ya da söyle…" })); }).join("");
  return bolumBasi("konusma", "Konuşma") + kart("Arkadaşınla konuş", "تَبادَلِ الحِوارَ مَعَ زَميلِكَ", "Örnekteki gibi konuş; aşağıdaki kelimeleri ve resimleri kullanarak kalıbı tekrar et. Biriniz satıcı, biriniz müşteri olsun; sonra rolleri değiştirin.", k) +
    kart("Cevap ver", "أَجِبْ", "Soruya sesli cevap ver ya da yaz; sonra örnekle karşılaştır.", ayarHtml() + c);
};

// ---------- kendini sına ----------
CIZ.tekrar = function () {
  var gar = GARIP.map(function (g, i) { return soru(i + 1, secim("tekrar/garip/" + i, g[1], g[0].filter(function (x) { return x !== g[1]; }), { sira: true })); }).join("");
  var es = esleHtml("tekrar/cumle", function () { return CUMLE_PARCA.map(function (x) { return { sol: '<span class="ar">' + x[0] + '</span>', sag: '<span class="ar">' + x[1] + '</span>' }; }); });
  var es2 = esleHtml("tekrar/resim", function () { return IFADE_RESIM.map(function (x) { return { sol: img(x[1]), sag: '<span class="ar">' + x[0] + '</span>' }; }); });
  var yan = YANLIS.map(function (g, i) { return soru(i + 1, '<span class="soluk kucuk">Hangisi yanlış yazılmış?</span>' + secim("tekrar/yanlis/" + i, g[1], g[0].filter(function (x) { return x !== g[1]; }), { sira: true, sonra: 'Doğrusu: <span class="ar">' + g[2] + '</span>' })); }).join("");
  var dog = AYNI_CUMLE.map(function (g, i) { return soru(i + 1, '<span class="ar sar">' + g[0] + '</span>' + secim("tekrar/dogru/" + i, g[0], g[1], { sira: true })); }).join("");
  var sira = CUMLE_SIRA.map(function (g, i) { return soru(i + 1, '<span class="ar sar" style="color:var(--vurgu)">' + g[0] + '</span>' + secim("tekrar/sira/" + i, g[1], g[2], { sira: true })); }).join("");
  var sec = SEC.map(function (d, i) { return soru(i + 1, '<span class="ar sar">' + d[0].replace("___", '<span class="bosluk">' + (A["tekrar/sec/" + i] ? d[1] : "&nbsp;") + '</span>') + '</span>' + secim("tekrar/sec/" + i, d[1], d[2], { sira: true })); }).join("");
  return bolumBasi("tekrar", "Alıştırmalar") + kart("1. Garip kelimeyi bul (Ders 76)", "ضَعْ عَلامَةَ (✗) عَلى الكَلِمَةِ الغَريبَةِ في كُلِّ مَجْموعَةٍ", "Her grupta diğerlerine benzemeyen kelime hangisi?", gar) +
    kart("2. İfadenin iki parçasını eşleştir (Ders 76, 81)", "صِلْ بَيْنَ جُزْأَيِ التَّعْبيرِ", "", es) +
    kart("3. İfadeyi resimle eşleştir (Ders 76)", "صِلْ بَيْنَ التَّعْبيرِ وَالصّورَةِ المُناسِبَةِ", "", es2) +
    kart("4. Yanlış yazılan kelimeyi bul (Ders 81)", "ضَعْ عَلامَةَ (✗) عَلى الكَلِمَةِ الَّتي كُتِبَتْ خَطَأً", "Örnek: طَبَق – طَمَطِم – مَطْلوب → طَمَطِم yanlış; doğrusu طَماطِم.", yan) +
    kart("5. Aynı cümleyi bul (Ders 81)", "ضَعْ عَلامَةَ (✗) عَلى الجُمْلَةِ المُطابِقَةِ", "Üstteki cümlenin aynısı hangisi? Harflere ve harekelere dikkat et.", dog) +
    kart("6. Kelimeleri sırala (Ders 81)", "رَتِّبِ الكَلِماتِ لِتُصْبِحَ جُمْلَةً", "Karışık kelimelerden doğru cümle hangisi? Örnek: القِراءَةِ هذا كِتابُ → هذا كِتابُ القِراءَةِ.", sira) +
    kart("7. Doğru kelimeyi koy (Ders 81)", "اِمْلَأِ الفَراغَ", "Son sorularda: arkadaşına doğru kelimeyi söyle (tedrîb 9).", sec);
};


// ---------- sınav ----------
var SINAV = null;
function sinavHavuzu() {
  var h = [], tum = KELIME.map(function (k, i) { return i; });
  KELIME.forEach(function (k, i) {
    var yan = karistir(tum.filter(function (j) { return KELIME[j][0] !== k[0] && KELIME[j][3] !== k[3]; })).slice(0, 3);
    if (ZAMAN[k[5]]) h.push({ tur: "dinle", tr: "Dinle ve resmi seç.", cal: k[5], d: k[3], y: yan.map(function (j) { return KELIME[j][3]; }), resim: true, not: k[0] });
    h.push({ tur: "resim", tr: "Resimdeki kelime hangisi?", resimSoru: k[3], d: k[0], y: yan.map(function (j) { return KELIME[j][0]; }) });
  });
  KALIP_T.forEach(function (t, ti) { t.oge.forEach(function (x) { if (x.r) h.push({ tur: "k" + ti, tr: (x.s ? x.s + " — " : "") + "Doğru cevap hangisi?", resimSoru: x.r, d: x.d, y: x.y }); }); });
  FARKLI.forEach(function (f) { h.push({ tur: "farkli", tr: "Hangisi farklı?", d: f[0][f[1]] + " (" + ["أ", "ب", "ج"][f[1]] + ")", y: [0, 1, 2].filter(function (j) { return j !== f[1]; }).map(function (j) { return f[0][j] + " (" + ["أ", "ب", "ج"][j] + ")"; }) }); });
  CIFT.forEach(function (c, i) { var ha = i % 2 === 0, id = (ha ? "ha-" : "he-") + i; if (ZAMAN[id]) h.push({ tur: "ta", tr: "Hangi kelimeyi duydun?", cal: id, d: c[ha ? 0 : 1], y: [c[ha ? 1 : 0]] }); });
  GUN.forEach(function (g, i) { if (ZAMAN["g" + i]) h.push({ tur: "renk", tr: "Hangi rengi duydun?", cal: "g" + i, d: g[0], y: rastgele(GUN.map(function (x) { return x[0]; }), 3, [g[0]]) }); });
  BAS_HARF.forEach(function (b) { h.push({ tur: "harf", tr: "Bu kelimeler hangi harfle bitiyor? " + b[0].join("، "), d: b[1], y: rastgele(HARF_SIK, 3, [b[1]]) }); });
  return h;
}
function sinavBaslat() {
  var h = karistir(sinavHavuzu()), secilen = [], tur = {};
  h.forEach(function (q) { if (secilen.length < 15 && (tur[q.tur] || 0) < 3) { secilen.push(q); tur[q.tur] = (tur[q.tur] || 0) + 1; } });
  secilen.forEach(function (q) { q.ops = karistir([q.d].concat(q.y)); });
  SINAV = { s: secilen, i: 0, cevap: [] }; ciz();
  if (secilen[0].cal) setTimeout(function () { cal1(secilen[0].cal); }, 300);
}
CIZ.sinav = function () {
  var eniyi = store.get("sinavEnIyi", null);
  if (!SINAV) return kart("Ünite sınavı", "الاخْتِبارُ", "Kelimeler, sesler, sıra sayıları, kalıplar ve okumadan karışık 15 soru. Sesli sorularda 🔊 düğmesiyle tekrar dinleyebilirsin.", '<div class="satir-btn"><button type="button" class="btn dolu" data-act="sinavBasla">Sınavı başlat</button>' + (eniyi !== null ? '<span class="soluk">En iyi sonucun: <b>%' + eniyi + '</b></span>' : '') + '</div>');
  var S = SINAV;
  if (S.i >= S.s.length) {
    var d = S.cevap.filter(function (c) { return c.ok; }).length, oran = Math.round(100 * d / S.s.length);
    return kart("Sınav sonucu", "النَّتيجَةُ", "", '<div class="sonuc-buyuk">%' + oran + '</div><p style="text-align:center" class="soluk">' + d + ' / ' + S.s.length + ' doğru' + (oran >= 85 ? ' — mükemmel!' : oran >= 60 ? ' — iyi!' : ' — bölümleri tekrar çalış.') + '</p><div class="satir-btn" style="justify-content:center"><button type="button" class="btn dolu" data-act="sinavBasla">Yeni sınav</button></div>');
  }
  var q = S.s[S.i], c = S.cevap[S.i];
  var ops = q.resim ? '<div class="rsecim">' + q.ops.map(function (o, oi) { var cls = c ? (o === q.d ? ' dogru' : c.v === o ? ' yanlis' : '') : ''; return '<button type="button" class="rsec' + cls + '" data-sinav="' + oi + '"' + (c ? ' disabled' : '') + '>' + img(o) + '</button>'; }).join("") + '</div>' :
    '<div class="secim">' + q.ops.map(function (o, oi) { var cls = c ? (o === q.d ? ' dogru' : c.v === o ? ' yanlis' : '') : ''; return '<button type="button" class="sec ar' + cls + '" data-sinav="' + oi + '"' + (c ? ' disabled' : '') + '>' + o + '</button>'; }).join("") + '</div>';
  return kart("Soru " + (S.i + 1) + " / " + S.s.length, "", "", '<div class="ilerleme" style="margin-bottom:12px"><i style="width:' + Math.round(100 * S.i / S.s.length) + '%"></i></div><div class="sinav-soru"><div class="soluk">' + q.tr.replace(/([؀-ۿ][؀-ۿ\s،]*)/g, '<span class="ar">$1</span>') + '</div>' +
    (q.cal ? '<div class="satir-btn" style="justify-content:center;margin:10px 0"><button type="button" class="btn dolu" data-cal="' + q.cal + '">🔊 Dinle</button></div>' : '') + (q.resimSoru ? '<div style="text-align:center;margin:10px 0">' + img(q.resimSoru, "rsm buyuk") + '</div>' : '') + ops +
    (c ? '<div class="sonra">' + (c.ok ? '✓ Doğru!' : '✗ Yanlış.') + (q.not ? ' <span class="ar">' + q.not + '</span>' : '') + '</div><div class="satir-btn" style="margin-top:12px"><button type="button" class="btn dolu" data-act="sinavSonraki">' + (S.i + 1 < S.s.length ? 'Sonraki soru →' : 'Sonucu gör') + '</button></div>' : '') + '</div>');
};

// ================= ÇİZİM VE OLAYLAR =================
var ana = document.getElementById("ana");
function sekmelerCiz() {
  document.getElementById("sekmeler").innerHTML = SEKMELER.map(function (s) {
    var bitti = s[0] !== "bas" && yapilan(s[0]) >= toplam(s[0]);
    return '<button type="button" class="sekme" role="tab" data-sekme="' + s[0] + '" aria-selected="' + (ST.sekme === s[0]) + '"><span>' + s[1] + (bitti ? '<span class="nokta" title="Tamamlandı"></span>' : '') + '</span><small>' + s[2] + '</small></button>';
  }).join("");
}
function ustGuncelle() {
  document.getElementById("puan").textContent = "★ " + puanHesap();
  sekmelerCiz();
  var bs = document.getElementById("bolumSayi");
  if (bs) { var t = bs.dataset.t; bs.textContent = bs.dataset.b + " · " + Math.min(yapilan(t), toplam(t)) + " / " + toplam(t) + " tamamlandı"; document.getElementById("bolumBar").innerHTML = ilerlemeHtml(t); }
}
function ciz(kaydirma) {
  var y = window.scrollY;
  ana.innerHTML = CIZ[ST.sekme]() + '<p class="alt-bilgi">el-Arabiyyetü beyne yedeyk · 1. kitap · 9. ünite — çevrimdışı çalışır; ilerlemen bu tarayıcıda saklanır.</p>';
  if (ST.sekme === "yazi") izKur();
  window.scrollTo(0, kaydirma ? 0 : y);
}
function sekmeAc(s) { durdur(); ST.sekme = s; ayarKaydet(); sekmelerCiz(); ciz(true); var b = document.querySelector('.sekme[data-sekme="' + s + '"]'); if (b && b.scrollIntoView) b.scrollIntoView({ block: "nearest", inline: "center" }); }
function temaUygula() { if (ST.tema) document.documentElement.setAttribute("data-theme", ST.tema); else document.documentElement.removeAttribute("data-theme"); }

document.addEventListener("click", function (e) {
  var t = e.target, el;
  if ((el = t.closest("[data-sekme]"))) { sekmeAc(el.dataset.sekme); return; }
  if ((el = t.closest("[data-git]"))) { sekmeAc(el.dataset.git); return; }
  if ((el = t.closest("[data-trac]"))) { var tl = el.nextElementSibling; tl.hidden = !tl.hidden; el.textContent = tl.hidden ? "Türkçesi" : "Gizle"; return; }
  if ((el = t.closest("[data-trm]"))) { ST.tr = el.dataset.trm === "1"; ayarKaydet(); ciz(); return; }
  if ((el = t.closest("[data-oku]"))) { ST.okunus = el.dataset.oku === "1"; ayarKaydet(); ciz(); return; }
  if ((el = t.closest("[data-hiz]"))) { ST.hiz = +el.dataset.hiz; ses.playbackRate = ST.hiz; ayarKaydet(); document.querySelectorAll("[data-hiz]").forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.hiz === ST.hiz); }); return; }
  if ((el = t.closest("[data-didx]"))) { durdur(); ST.dIdx = +el.dataset.didx; ayarKaydet(); ciz(); return; }
  if ((el = t.closest("[data-dact]"))) { var a = el.dataset.dact; if (a === "dur") durdur(); else diyalogCal(a); return; }
  if ((el = t.closest("[data-rol]"))) { diyalogCal("rol", +el.dataset.rol); return; }
  if ((el = t.closest("[data-dsat]")) && !t.closest("button")) { cal1(DIYALOG[ST.dIdx].id + "-" + el.dataset.dsat); return; }
  if ((el = t.closest("[data-kders]"))) { ST.kDers = +el.dataset.kders; ayarKaydet(); KOYUN = {}; ES["kelime/esle"] = null; ciz(); return; }
  if ((el = t.closest("[data-kcal]"))) { var ki = +el.dataset.kcal; cal1(KELIME[ki][5]); if (!A["kelime/k/" + ki]) { isaretle("kelime/k/" + ki); el.classList.add("duydu"); } return; }
  if ((el = t.closest("[data-kact]"))) { var ids = kelimeListe().map(function (i) { return KELIME[i][5]; }); var isle = function (i) { isaretle("kelime/k/" + kelimeListe()[i]); }; if (el.dataset.kact === "hepsi") oynat(ids, { ara: 0.6, vurgu: isle }); else oynat(ids, { bekle: function (i, id) { return parcaSure(id) * 1.4 + 1; }, vurgu: isle }); return; }
  if ((el = t.closest("[data-scal]"))) { var si = +el.dataset.scal; cal1("g" + si); if (!A["sayi/s/" + si]) { isaretle("sayi/s/" + si); el.classList.add("duydu"); } return; }
  if ((el = t.closest("[data-sact]"))) { var sids = GUN.map(function (s, i) { return "g" + i; }); var sis = function (i) { isaretle("sayi/s/" + i); }; if (el.dataset.sact === "hepsi") oynat(sids, { ara: 0.6, vurgu: sis }); else oynat(sids, { bekle: function (i, id) { return parcaSure(id) * 1.4 + 1; }, vurgu: sis }); return; }
  if ((el = t.closest("[data-cal]"))) { cal1(el.dataset.cal); var ay = /^ayet-(\d+)$/.exec(el.dataset.cal); if (ay) isaretle("ses/ayet/" + ay[1]); return; }
  if ((el = t.closest("[data-oyun]"))) { oyunYeni(el.dataset.oyun); ciz(); var q0 = KOYUN[el.dataset.oyun]; if (el.dataset.oyun === "o1") cal1(KELIME[q0.sorular[0].d][5]); return; }
  if ((el = t.closest("[data-ocev]"))) {
    var tur = el.dataset.ocev, o = KOYUN[tur], q = o.sorular[o.i]; if (o.cevap !== null) return;
    o.cevap = +el.dataset.j; var dg = o.cevap === q.d; if (dg) o.puan++; bip(dg); if (tur === "o2") cal1(KELIME[q.d][5]); ciz(); return;
  }
  if ((el = t.closest("[data-osonraki]"))) {
    var tr2 = el.dataset.osonraki, o2 = KOYUN[tr2]; o2.i++; o2.cevap = null;
    if (o2.i >= o2.sorular.length) { if (o2.puan >= 6) cevapla("kelime/" + tr2, true, o2.puan); toast("Sonuç: " + o2.puan + " / " + o2.sorular.length); }
    ciz(); if (tr2 === "o1" && o2.i < o2.sorular.length) cal1(KELIME[o2.sorular[o2.i].d][5]); return;
  }
  if ((el = t.closest("[data-es]"))) { esleTik(el); return; }
  if ((el = t.closest("[data-esyeni]"))) { ES[el.dataset.esyeni].yeni = true; esleYenile(el.dataset.esyeni); return; }
  if ((el = t.closest(".secim .sec[data-v]"))) {
    var kutu = el.parentNode, key = kutu.dataset.k; if (!key || A[key]) return;
    var ok = el.dataset.v === DOGRU[key];
    cevapla(key, ok, el.dataset.v); bip(ok);
    kutu.classList.add("bitti");
    kutu.querySelectorAll(".sec").forEach(function (b) { b.disabled = true; if (b.dataset.v === DOGRU[key]) b.classList.add("dogru"); });
    if (!ok) { el.classList.add("yanlis"); kutu.classList.add("titre"); }
    var sn = kutu.nextElementSibling; if (sn && sn.classList.contains("sonra") && sn.innerHTML) sn.hidden = false;
    if (kutu.dataset.sonracal) setTimeout(function () { cal1(kutu.dataset.sonracal); }, 350);
    return;
  }
  if ((el = t.closest(".rsecim .rsec[data-rv]"))) {
    var rk = el.parentNode, rkey = rk.dataset.k; if (!rkey || A[rkey]) return;
    var rok = el.dataset.rv === DOGRU[rkey]; cevapla(rkey, rok, el.dataset.rv); bip(rok);
    rk.querySelectorAll(".rsec").forEach(function (b) { b.disabled = true; if (b.dataset.rv === DOGRU[rkey]) b.classList.add("dogru"); });
    if (!rok) { el.classList.add("yanlis"); rk.classList.add("titre"); }
    var rs = rk.nextElementSibling; if (rs && rs.classList.contains("sonra")) rs.hidden = false; return;
  }
  if ((el = t.closest("[data-sira]"))) {
    var sv = +el.dataset.sira;
    if (sv === SIRA.dizi.length) { SIRA.dizi.push(sv); bip(true); if (SIRA.dizi.length === ONLUK.length) { cevapla("sayi/sira", SIRA.hata <= 1, SIRA.hata); toast("Sıralama tamam!"); } ciz(); }
    else { SIRA.hata++; bip(false); el.classList.remove("titre"); void el.offsetWidth; el.classList.add("titre"); }
    return;
  }
  if ((el = t.closest("[data-sdin]"))) { if (SDIN.cevap !== null) return; SDIN.cevap = +el.dataset.sdin; var sd = SDIN.cevap === SDIN.sorular[SDIN.i]; if (sd) SDIN.puan++; bip(sd); ciz(); return; }
  if ((el = t.closest("[data-kk]"))) { if (KK.cevap !== null) return; KK.cevap = +el.dataset.kk; var kq = KK.s[KK.i], kd = (KK.cevap === 0) === kq.kh; if (kd) KK.puan++; bip(kd); ciz(); return; }
  if ((el = t.closest("[data-sinav]"))) {
    var q2 = SINAV.s[SINAV.i]; if (SINAV.cevap[SINAV.i]) return;
    var v = q2.ops[+el.dataset.sinav], dg2 = v === q2.d; SINAV.cevap[SINAV.i] = { ok: dg2, v: v }; bip(dg2);
    if (SINAV.cevap.filter(Boolean).length === SINAV.s.length) { var oran = Math.round(100 * SINAV.cevap.filter(function (c) { return c.ok; }).length / SINAV.s.length); if (oran > store.get("sinavEnIyi", -1)) store.set("sinavEnIyi", oran); cevapla("sinav/bitti", oran >= 60, oran); }
    ciz(); return;
  }
  if ((el = t.closest("[data-hbw]"))) {
    var hi = +el.parentNode.dataset.hb, hk = "yazi/bul/" + hi, hd = store.get("hb:" + hi, { b: [], h: 0 }), hw = el.dataset.hbw;
    if (A[hk] || hd.b.indexOf(hw) >= 0) return;
    if (HARF_BUL[hi][2].indexOf(hw) >= 0) { hd.b.push(hw); el.classList.add("dogru"); el.disabled = true; bip(true); }
    else { hd.h++; bip(false); el.classList.remove("titre"); void el.offsetWidth; el.classList.add("yanlis", "titre"); setTimeout(function () { el.classList.remove("yanlis"); }, 500); }
    store.set("hb:" + hi, hd);
    if (hd.b.length === HARF_BUL[hi][2].length) cevapla(hk, hd.h <= 1, hd.h);
    el.parentNode.nextElementSibling.textContent = A[hk] ? "✓ Tamam · hata: " + hd.h : "Bulunan: " + hd.b.length + " / " + HARF_BUL[hi][2].length + " · hata: " + hd.h;
    return;
  }
  if ((el = t.closest("[data-izsec]"))) { IZ.secili = el.dataset.izsec; IZ.cizgi = []; ciz(); return; }
  if ((el = t.closest("[data-okudum]"))) { isaretle("okuma/cumle/" + el.dataset.okudum); bip(true); ciz(); return; }
  if ((el = t.closest("[data-konus]"))) { cevapla("konusma/k/" + el.dataset.konus, true); bip(true); ciz(); return; }
  if ((el = t.closest("[data-goster]"))) { var gk = el.dataset.goster; el.hidden = true; var md = document.querySelector('[data-model="' + gk + '"]'); if (md) md.hidden = false; return; }
  if ((el = t.closest("[data-oz]"))) { var k2 = el.dataset.oz, ok2 = el.dataset.ok === "1"; cevapla(k2, ok2); bip(ok2); el.parentNode.innerHTML = '<span class="etiket ' + (ok2 ? 'ok">✓ Doğru saydın' : 'no">✗ Tekrar çalış') + '</span>'; return; }
  if ((el = t.closest("[data-sifirla]"))) { if (confirm("Bu bölümdeki cevaplar silinsin mi?")) { var bt = el.dataset.sifirla; for (var kk in A) if (kk.indexOf(bt + "/") === 0) delete A[kk]; cevapKaydet(); ustGuncelle(); KOYUN = {}; ES = {}; SIRA = SDIN = KK = null; ciz(); } return; }
  if ((el = t.closest("[data-act]"))) { islem(el.dataset.act); return; }
});
function islem(a) {
  switch (a) {
    case "siraYeni": SIRA = null; ciz(); break;
    case "sdinYeni": SDIN = null; ciz(); break;
    case "sdinSonraki": SDIN.i++; SDIN.cevap = null; if (SDIN.i >= SDIN.sorular.length && SDIN.puan >= 5) cevapla("sayi/dinle", true, SDIN.puan); ciz(); if (SDIN.i < SDIN.sorular.length) cal1("g" + SDIN.sorular[SDIN.i]); break;
    case "kkBasla": KK = { s: karistir(CIFT.map(function (c, i) { return i; })).slice(0, 10).map(function (i) { return { c: i, kh: Math.random() < 0.5 }; }), i: 0, puan: 0, cevap: null }; ciz(); cal1((KK.s[0].kh ? "ha-" : "he-") + KK.s[0].c); break;
    case "kkSonraki": KK.i++; KK.cevap = null; if (KK.i >= KK.s.length) { if (KK.puan >= 8) cevapla("ses/oyun", true, KK.puan); toast("Sonuç: " + KK.puan + " / 10"); } ciz(); if (KK.i < KK.s.length) cal1((KK.s[KK.i].kh ? "ha-" : "he-") + KK.s[KK.i].c); break;
    case "izTemizle": IZ.cizgi = []; if (IZ.yeniden) IZ.yeniden(); break;
    case "izTamam":
      if (IZ.cizgi.reduce(function (s, c) { return s + c.length; }, 0) < 12) { toast("Önce harfin üzerinden geç."); break; }
      if (HARF.some(function (h) { return h[0] === IZ.secili; })) { if (cevapla("yazi/iz/" + IZ.secili, true)) bip(true); } else { isaretle("yaziek/" + IZ.secili); bip(true); }
      toast("Güzel! Sıradakine geç."); IZ.cizgi = []; ciz(); break;
    case "sinavBasla": sinavBaslat(); window.scrollTo(0, 0); break;
    case "sinavSonraki": SINAV.i++; ciz(true); var q = SINAV.s[SINAV.i]; if (q && q.cal) setTimeout(function () { cal1(q.cal); }, 250); break;
    case "hepsiniSifirla": if (confirm("Bütün cevaplar ve ilerleme silinsin mi?")) { try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf(PFX) === 0 && k !== PFX + "ayar") localStorage.removeItem(k); }); } catch (e) {} A = {}; SINAV = null; KOYUN = {}; ES = {}; ustGuncelle(); ciz(); } break;
  }
}
document.addEventListener("change", function (e) {
  if (e.target.dataset && e.target.dataset.rolgizle) { store.set("rolGizle", e.target.checked); var g = document.querySelector(".diyalog-govde"); if (g) g.classList.toggle("rol-gizle", e.target.checked); }
});
document.addEventListener("input", function (e) { var t = e.target; if (t.dataset && t.dataset.yaz) store.set("y:" + t.dataset.yaz, t.value); });
document.getElementById("temaBtn").addEventListener("click", function () {
  var koyu = ST.tema ? ST.tema === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  ST.tema = koyu ? "light" : "dark"; ayarKaydet(); temaUygula(); if (IZ.yeniden && ST.sekme === "yazi") IZ.yeniden();
});
var efektBtn = document.getElementById("efektBtn");
function efektGoster() { efektBtn.style.opacity = ST.efekt ? 1 : .45; efektBtn.title = ST.efekt ? "Ses efektleri açık" : "Ses efektleri kapalı"; }
efektBtn.addEventListener("click", function () { ST.efekt = !ST.efekt; ayarKaydet(); efektGoster(); toast(ST.efekt ? "Ses efektleri açık" : "Ses efektleri kapalı"); });
window.addEventListener("resize", function () { if (ST.sekme === "yazi" && IZ.yeniden) IZ.yeniden(); });

if (!CIZ[ST.sekme]) ST.sekme = "bas";
if (!A["bas/acildi"]) { A["bas/acildi"] = { ok: 0, v: "" }; cevapKaydet(); }
temaUygula(); efektGoster(); ustGuncelle(); ciz(true);
setTimeout(sesHazirla, 300);
window.__k1 = { ses: ses, OY: OY, IZ: IZ, A: function () { return A; } };
})();
