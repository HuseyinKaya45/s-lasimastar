(function () {
  "use strict";
  // KITAP [{ar,tr}], BOLUM [{k,no,ar,tr,s}], METIN [{b,t,ar,tr,s}],
  // K [{ar,a,tur,kok,c,f:[mazi,muzari,masdar]|null,tr,cu,cut,o,ot,s,b,x:[[cümle,tr,sayfa]]}]
  var N = K.length;
  var ANAHTAR = "kisasKelime";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ana = $("#ana");

  // ---------- yardımcılar ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bugun() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
  function karistir(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function aralik(a, b) { var r = []; for (var i = a; i < b; i++) r.push(i); return r; }
  function arNorm(s) { return String(s || "").replace(/[ً-ٰٟـ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").trim(); }
  function trNorm(s) {
    return String(s || "").toLocaleLowerCase("tr").replace(/[âà]/g, "a").replace(/[îı]/g, "i").replace(/û/g, "u").replace(/ş/g, "s").replace(/ç/g, "c")
      .replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ü/g, "u").replace(/\s+/g, " ").trim();
  }
  function arMetin(s) { return esc(s).replace(/﴿[^﴾]*﴾/g, function (a) { return '<span class="ayet">' + a + "</span>"; }); }
  function kisa(tr) { return String(tr || "").split(/;\s*/).slice(0, 2).join("; "); }
  function toast(m, geri) {
    var t = $("#toast"); t.textContent = m;
    if (geri) {
      var b = document.createElement("button"); b.type = "button"; b.className = "toast-geri"; b.textContent = "Geri al";
      b.addEventListener("click", function () { t.classList.remove("acik"); geri(); }); t.appendChild(b);
    }
    t.classList.add("acik"); clearTimeout(toast.z); toast.z = setTimeout(function () { t.classList.remove("acik"); }, geri ? 5000 : 2200);
  }
  function konfeti() {
    var renk = ["#1e6b58", "#a8781f", "#2f5f9e", "#b23c2a", "#63c4a8"];
    for (var i = 0; i < 40; i++) {
      var e = document.createElement("i"); e.className = "konfeti";
      e.style.left = (Math.random() * 100) + "vw"; e.style.background = renk[i % renk.length];
      e.style.animationDelay = (Math.random() * .5) + "s"; document.body.appendChild(e);
      setTimeout(e.remove.bind(e), 2300);
    }
  }
  function onayli(btn, soru, fn) {
    if (btn.dataset.onay) { clearTimeout(+btn.dataset.onay); delete btn.dataset.onay; btn.textContent = btn.dataset.eski; btn.classList.remove("onay"); fn(); return; }
    btn.dataset.eski = btn.textContent; btn.textContent = soru; btn.classList.add("onay");
    btn.dataset.onay = setTimeout(function () { delete btn.dataset.onay; btn.textContent = btn.dataset.eski; btn.classList.remove("onay"); }, 5000);
  }
  // metin cümlesinde kelimeyi işaretle
  function vurgula(cumle, kelime) {
    var i = cumle.indexOf(kelime);
    if (!kelime || i < 0) return arMetin(cumle);
    return arMetin(cumle.slice(0, i)) + "<mark>" + esc(kelime) + "</mark>" + arMetin(cumle.slice(i + kelime.length));
  }
  var TUR_AD = { "isim": "isim", "fiil": "fiil", "sıfat": "sıfat", "zarf": "zarf", "edat": "edat", "bağlaç": "bağlaç", "zamir": "zamir", "özel isim": "özel isim", "deyim": "deyim" };

  // ---------- kayıt ----------
  var depoVar = true;
  function bos() { return { v: 1, k: {}, f: {}, gun: {}, yb: { g: 0, n: 0 }, puan: 0, rek: {}, ay: { yeni: 15, tema: null, kk: -1, kb: -1, trAcik: false, yon: "ar", tsay: 10 } }; }
  function yukle() {
    var d = bos();
    try {
      var s = localStorage.getItem(ANAHTAR);
      if (s) { var o = JSON.parse(s); for (var k in o) if (k !== "ay") d[k] = o[k]; for (var a in o.ay) d.ay[a] = o.ay[a]; }
    } catch (e) { depoVar = false; }
    return d;
  }
  var D = yukle();
  function kaydet() { try { localStorage.setItem(ANAHTAR, JSON.stringify(D)); } catch (e) { depoVar = false; } }
  var ID = K.map(function (x) { return x.a + "|" + x.tur; });
  function st(i) { return D.k[ID[i]]; }
  function durum(i) { var s = st(i); if (!s) return "yeni"; if (s.b) return "bil"; if (s.i >= 21) return "tamam"; return "ogr"; }
  var DURUM_AD = { yeni: "yeni", ogr: "öğreniliyor", tamam: "öğrenildi", bil: "biliyorum" };
  function durumHTML(i) { var d = durum(i); return '<span class="durum ' + d + '">' + DURUM_AD[d] + "</span>"; }
  function biliyorum(i, ac) {
    var s = st(i);
    if (ac) { if (s) s.b = 1; else D.k[ID[i]] = { r: 0, i: 0, e: 2.5, d: bugun(), l: 0, g: 0, b: 1 }; }
    else if (s) { delete s.b; if (!s.g) delete D.k[ID[i]]; }
    kaydet();
  }
  function gunKayit() { var t = bugun(); return D.gun[t] || (D.gun[t] = { t: 0, y: 0, d: 0 }); }
  function yeniKalan() { var t = bugun(); var n = D.yb.g === t ? D.yb.n : 0; return Math.max(0, D.ay.yeni - n); }
  function seri() {
    var t = bugun(), n = 0;
    if (!(D.gun[t] && D.gun[t].t)) t--;
    while (D.gun[t] && D.gun[t].t) { n++; t--; }
    return n;
  }
  function puanEkle(n) { D.puan = (D.puan || 0) + n; var g = gunKayit(); g.t++; kaydet(); rozetGuncelle(); }

  // ---------- aralıklı tekrar ----------
  function sonraki(s, q) {
    if (q === 1) return 0;
    if (!s || s.r === 0) return q === 4 ? 4 : 1;
    if (s.r === 1 && s.i < 3) return q === 2 ? 2 : q === 3 ? 3 : 6;
    var g = q === 2 ? Math.max(s.i + 1, Math.round(s.i * 1.2)) : q === 3 ? Math.round(s.i * s.e) : Math.round(s.i * s.e * 1.3);
    return Math.min(3650, Math.max(g, s.i + 1));
  }
  function gunYazi(g) { return g === 0 ? "şimdi" : g < 30 ? g + " gün" : g < 365 ? Math.round(g / 30) + " ay" : (Math.round(g / 36.5) / 10) + " yıl"; }
  function puanla(i, q) {
    var t = bugun(), gk = gunKayit(), s = st(i);
    if (!s) { s = D.k[ID[i]] = { r: 0, i: 0, e: 2.5, d: t, l: 0, g: 0 }; if (D.yb.g !== t) D.yb = { g: t, n: 0 }; D.yb.n++; gk.y++; }
    var g = sonraki(s, q);
    s.g++; gk.t++;
    if (q === 1) { if (s.r > 0) { s.l++; s.e = Math.max(1.3, s.e - 0.2); } s.r = 0; s.i = 0; s.d = t; }
    else {
      gk.d++; D.puan = (D.puan || 0) + 1;
      if (q === 2) s.e = Math.max(1.3, s.e - 0.15);
      if (q === 4) s.e = Math.min(3.2, s.e + 0.15);
      s.r++; s.i = g; s.d = t + g;
    }
    kaydet(); rozetGuncelle();
  }

  // ---------- sesli okuma ----------
  var arSes = null;
  function sesBul() { try { var v = speechSynthesis.getVoices().filter(function (x) { return /^ar/i.test(x.lang); }); arSes = v.length ? v[0] : null; } catch (e) { arSes = null; } }
  if (window.speechSynthesis) { sesBul(); try { speechSynthesis.onvoiceschanged = sesBul; } catch (e) {} }
  function oku(m) { if (!arSes) return; try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(m); u.voice = arSes; u.lang = arSes.lang; u.rate = .8; speechSynthesis.speak(u); } catch (e) {} }
  function dinleBtn(m) { return arSes ? '<button class="dinle" type="button" data-oku="' + esc(m) + '" title="Dinle">🔊</button>' : ""; }
  document.addEventListener("click", function (e) { var b = e.target.closest("[data-oku]"); if (b) { e.stopPropagation(); oku(b.getAttribute("data-oku")); } }, true);

  // ---------- tema, rozet ----------
  function temaUygula() { if (D.ay.tema) document.documentElement.setAttribute("data-theme", D.ay.tema); else document.documentElement.removeAttribute("data-theme"); }
  function koyuMu() { return D.ay.tema ? D.ay.tema === "dark" : window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches; }
  $("#temaBtn").addEventListener("click", function () { D.ay.tema = koyuMu() ? "light" : "dark"; temaUygula(); kaydet(); $("#temaBtn").textContent = koyuMu() ? "☀" : "☾"; });
  function rozetGuncelle() { $("#seriRozet").textContent = "🔥 " + seri() + "  ★ " + (D.puan || 0); }
  temaUygula(); $("#temaBtn").textContent = koyuMu() ? "☀" : "☾"; rozetGuncelle();

  // ---------- metindeki kelimeleri bulma ----------
  var FORM = {};
  K.forEach(function (x, i) {
    if (x.tur === "deyim") return;
    [x.ar, x.a].forEach(function (f, n) { var k = arNorm(f); if (k && (!FORM[k] || (n === 0 && FORM[k].n === 1))) FORM[k] = { i: i, n: n }; });
  });
  var ONEK = ["", "و", "ف", "ب", "ل", "ك", "ال", "وال", "فال", "بال", "كال", "لل", "ول", "وب", "فب", "س", "وس"];
  function kelimeBul(tok) {
    var n = arNorm(tok);
    for (var j = 0; j < ONEK.length; j++) {
      var o = ONEK[j];
      if (o && n.indexOf(o) !== 0) continue;
      var r = n.slice(o.length);
      if (r.length < 2) continue;
      if (FORM[r]) return FORM[r].i;
      if (FORM["ال" + r]) return FORM["ال" + r].i;
    }
    return -1;
  }
  function satirHTML(ar) {
    // ayetleri olduğu gibi bırak, diğer kelimeleri tıklanabilir yap
    var parca = String(ar).split(/(﴿[^﴾]*﴾)/);
    return parca.map(function (p) {
      if (/^﴿/.test(p)) return '<span class="ayet">' + esc(p) + "</span>";
      return p.split(/(\s+)/).map(function (t) {
        if (!t.trim()) return t;
        var m = t.match(/^([«"(]*)(.*?)([.،؛:!؟?»")]*)$/), on = m[1], govde = m[2], son = m[3];
        var i = kelimeBul(govde);
        if (i < 0) return esc(t);
        return esc(on) + '<span class="k' + (st(i) ? " ogr" : "") + '" data-k="' + i + '">' + esc(govde) + "</span>" + esc(son);
      }).join("");
    }).join("");
  }
  // deyimler: satırda geçenler
  var DEYIM = aralik(0, N).filter(function (i) { return K[i].tur === "deyim"; });
  function satirDeyimleri(ar) {
    var n = arNorm(ar);
    return DEYIM.filter(function (i) { return n.indexOf(arNorm(K[i].ar)) >= 0; });
  }

  // ---------- kelime gösterimi ----------
  function etiketlerHTML(i) {
    var x = K[i], h = '<span class="etk">' + esc(TUR_AD[x.tur] || x.tur) + "</span>";
    if (x.kok) h += '<span class="etk">kök: <span class="ar">' + esc(x.kok) + "</span></span>";
    if (x.c) h += '<span class="etk">çoğul: <span class="ar">' + esc(x.c) + "</span></span>";
    if (x.f) h += '<span class="etk ar">' + esc(x.f.filter(Boolean).join(" – ")) + "</span>";
    h += '<span class="etk">s. ' + x.s + "</span>";
    return '<div class="etiketler2">' + h + "</div>";
  }
  function detayHTML(i) {
    var x = K[i];
    var h = '<div class="kel-detay">' + etiketlerHTML(i) +
      '<div class="blok"><small>Metinde</small><span class="ar">' + vurgula(x.cu, x.ar) + '</span><div class="tr">' + esc(x.cut) + "</div></div>";
    if (x.o) h += '<div class="blok"><small>Başka bir örnek</small><span class="ar">' + esc(x.o) + '</span><div class="tr">' + esc(x.ot) + "</div></div>";
    (x.x || []).slice(0, 2).forEach(function (e) { h += '<div class="blok"><small>Metinde (s. ' + e[2] + ')</small><span class="ar">' + vurgula(e[0], x.ar) + '</span><div class="tr">' + esc(e[1]) + "</div></div>"; });
    return h + "</div>";
  }
  function popAc(i) {
    popKapat();
    var x = K[i], b = st(i) && st(i).b;
    var p = document.createElement("div"); p.className = "pop"; p.id = "pop";
    p.innerHTML = '<div class="ust"><span class="ar">' + esc(x.a || x.ar) + "</span>" + dinleBtn(x.a || x.ar) + '<button class="kapat" type="button" aria-label="Kapat">×</button></div>' +
      '<div class="anlam">' + esc(x.tr) + "</div>" + etiketlerHTML(i) +
      (x.o ? '<div class="kel-detay"><div class="blok"><span class="ar" style="font-size:1.25rem">' + esc(x.o) + '</span><div class="tr">' + esc(x.ot) + "</div></div></div>" : "") +
      '<div class="satir-btn" style="margin-top:8px"><button type="button" class="yildiz' + (D.f[ID[i]] ? " acik" : "") + '" data-yildiz="' + i + '">' + (D.f[ID[i]] ? "★" : "☆") + "</button>" +
      '<button class="btn kucuk" type="button" data-kelgit="' + i + '">Kelime kartı</button>' +
      '<button type="button" class="bil-kucuk" data-bil="' + i + '">' + (b ? "↺ yeniden çalış" : "✓ biliyorum") + "</button></div>";
    document.body.appendChild(p);
    $(".kapat", p).addEventListener("click", popKapat);
  }
  function popKapat() { var p = $("#pop"); if (p) p.remove(); $$(".k.acik").forEach(function (k) { k.classList.remove("acik"); }); }

  // ---------- kapsam (kıssa / bölüm) ----------
  function kapsamUygun(i) {
    var b = K[i].b;
    if (D.ay.kb >= 0) return b === D.ay.kb;
    if (D.ay.kk >= 0) return BOLUM[b] && BOLUM[b].k === D.ay.kk;
    return true;
  }
  function kapsamHTML() {
    var sec = '<select id="kb" aria-label="Bölüm"><option value="-1">Bütün bölümler</option>' + BOLUM.map(function (b, n) {
      if (D.ay.kk >= 0 && b.k !== D.ay.kk) return "";
      return '<option value="' + n + '"' + (n === D.ay.kb ? " selected" : "") + ">" + esc((KITAP.length > 1 ? (b.k ? "Y" : "İ") + " " : "") + b.no + ". " + b.tr) + "</option>";
    }).join("") + "</select>";
    return '<div class="ayarlar"><span class="ayar"><span class="lbl">Kıssa</span>' +
      seg("kk", D.ay.kk, [[-1, "Hepsi"]].concat(KITAP.map(function (k, n) { return [n, esc(k.kisa || k.tr)]; }))) + "</span>" + sec + "</div>";
  }
  function kapsamBagla(yeniden) {
    segBagla(ana, function (a, v) { if (a === "kk") { D.ay.kk = +v; D.ay.kb = -1; kaydet(); yeniden(); } });
    var kb = $("#kb"); if (kb) kb.addEventListener("change", function () { D.ay.kb = +this.value; kaydet(); yeniden(); });
  }

  // ---------- sekmeler ----------
  var SEKME = [["oku", "Okuma"], ["kelime", "Kelimeler"], ["kart", "Kartlar"], ["oyun", "Oyunlar"], ["ist", "İlerleme"]];
  var aktif = "oku", tus = null;
  $("#sekmeler").innerHTML = SEKME.map(function (s) { return '<button class="sekme" role="tab" type="button" data-s="' + s[0] + '">' + s[1] + "</button>"; }).join("");
  $("#sekmeler").addEventListener("click", function (e) { var b = e.target.closest(".sekme"); if (b) git(b.getAttribute("data-s")); });
  function git(s) {
    aktif = s; tus = null; popKapat();
    $$(".sekme").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-s") === s ? "true" : "false"); });
    ({ oku: okuCiz, kelime: kelimeCiz, kart: kartCiz, oyun: oyunCiz, ist: istCiz })[s]();
    window.scrollTo(0, 0);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") popKapat();
    if (!tus || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.tagName === "INPUT" && e.key !== "Enter") return;
    tus(e);
  });
  function seg(ad, deger, secenek) {
    return '<span class="seg" data-seg="' + ad + '">' + secenek.map(function (o) {
      return '<button type="button" data-v="' + o[0] + '" aria-pressed="' + (String(o[0]) === String(deger)) + '">' + o[1] + "</button>";
    }).join("") + "</span>";
  }
  function segBagla(kok, fn) {
    $$("[data-seg]", kok).forEach(function (s) {
      s.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) fn(s.getAttribute("data-seg"), b.getAttribute("data-v")); });
    });
  }

  // ---------- OKUMA ----------
  var okB = 0;
  function okuCiz() {
    var b = BOLUM[okB], satirlar = METIN.filter(function (m) { return m.b === okB; });
    var yeniKitap = okB === 0 || BOLUM[okB - 1].k !== b.k;
    ana.innerHTML = '<section class="kart"><div class="bolum-sec"><select id="okb" aria-label="Bölüm">' + BOLUM.map(function (x, n) {
        return (n === 0 || BOLUM[n - 1].k !== x.k ? '<optgroup label="' + esc(KITAP[x.k].tr) + '">' : "") +
          '<option value="' + n + '"' + (n === okB ? " selected" : "") + ">" + x.no + ". " + esc(x.tr) + "</option>" +
          (n === BOLUM.length - 1 || BOLUM[n + 1].k !== x.k ? "</optgroup>" : "");
      }).join("") + '</select></div>' +
      '<p class="soluk kucuk" style="margin:0">Altı noktalı kelimelere dokun: anlamı, kökü ve örneği açılır.</p>' +
      (yeniKitap ? '<div class="satir-bas kitap-bas"><div class="ar">' + esc(KITAP[b.k].ar) + '</div><div class="tr">' + esc(KITAP[b.k].tr) + "</div></div>" : "") +
      '<div class="satir-bas"><div class="ar">' + esc(b.no + " - " + b.ar) + "</div>" + dinleBtn(b.ar) + '<div class="tr">' + esc(b.tr) + "</div></div>" +
      '<div id="satirlar">' + satirlar.map(function (m, n) {
        var dy = satirDeyimleri(m.ar);
        return '<div class="satir' + (m.t === "d" ? " dipnot" : "") + '">' +
          '<span class="ar">' + satirHTML(m.ar) + "</span>" +
          (dy.length ? '<div class="etiketler2" style="justify-content:flex-end">' + dy.map(function (i) { return '<span class="etk ar k" data-k="' + i + '" title="deyim">' + esc(K[i].ar) + "</span>"; }).join("") + "</div>" : "") +
          "</div>";
      }).join("") + "</div>" +
      '<div class="satir-btn" style="justify-content:space-between;margin-top:14px"><button class="btn" id="onceki" type="button"' + (okB ? "" : " disabled") + '>← Önceki bölüm</button>' +
      '<button class="btn dolu" id="bolumCalis" type="button">Bu bölümün kelimeleri</button>' +
      '<button class="btn" id="sonraki" type="button"' + (okB < BOLUM.length - 1 ? "" : " disabled") + ">Sonraki bölüm →</button></div></section>";
    $("#okb").addEventListener("change", function () { okB = +this.value; okuCiz(); });
    $("#onceki").addEventListener("click", function () { okB--; okuCiz(); window.scrollTo(0, 0); });
    $("#sonraki").addEventListener("click", function () { okB++; okuCiz(); window.scrollTo(0, 0); });
    $("#bolumCalis").addEventListener("click", function () { D.ay.kk = b.k; D.ay.kb = okB; kaydet(); git("kelime"); });
    $("#satirlar").addEventListener("click", function (e) {
      var k = e.target.closest(".k"); if (k) { popAc(+k.getAttribute("data-k")); k.classList.add("acik"); }
    });
  }

  // ---------- KELİMELER ----------
  var L = { ara: "", tur: "hepsi", acik: {} };
  function kelimeSatir(i) {
    var x = K[i];
    return '<div class="madde" data-m="' + i + '"><div class="madde-ust" data-ac="' + i + '"><span class="ar">' + esc(x.a || x.ar) + '</span><span class="tr">' + esc(x.tr) + "</span>" +
      '<span class="yan"><button type="button" class="yildiz' + (D.f[ID[i]] ? " acik" : "") + '" data-yildiz="' + i + '">' + (D.f[ID[i]] ? "★" : "☆") + "</button>" + durumHTML(i) + "</span></div>" +
      (L.acik[i] ? '<div class="madde-ic">' + detayHTML(i) + '<div class="satir-btn" style="margin-top:8px">' + dinleBtn(x.a || x.ar) +
        '<button type="button" class="bil-kucuk" data-bil="' + i + '">' + (st(i) && st(i).b ? "↺ yeniden çalış" : "✓ biliyorum") + "</button></div></div>" : "") + "</div>";
  }
  function kelimeCiz() {
    var sayi = aralik(0, N).filter(kapsamUygun).length;
    ana.innerHTML = '<section class="kart"><h2>Kelimeler ve deyimler</h2><p class="aciklama">Metinde geçen ' + N + " kelime ve deyim, geçtikleri bölüme göre. Bir kelimeye dokununca metindeki cümlesi, başka bir örnek ve Türkçeleri açılır.</p>" +
      kapsamHTML() +
      '<div class="arama"><input type="search" id="ara" placeholder="Ara: صنم, put…" value="' + esc(L.ara) + '" aria-label="Ara"></div>' +
      '<div class="ayarlar"><span class="ayar">' + seg("tur", L.tur, [["hepsi", "Hepsi"], ["isim", "İsim"], ["fiil", "Fiil"], ["sıfat", "Sıfat"], ["deyim", "Deyim"], ["diger", "Diğer"], ["yildiz", "★"]]) + "</span></div>" +
      '<p class="soluk kucuk">Bu kapsamda ' + sayi + ' kayıt var.</p><div id="liste"></div></section>';
    listeDoldur();
    var ara = $("#ara"), z;
    ara.addEventListener("input", function () { clearTimeout(z); z = setTimeout(function () { L.ara = ara.value.trim(); listeDoldur(); }, 200); });
    kapsamBagla(kelimeCiz);
    segBagla(ana, function (a, v) { if (a !== "tur") return; L.tur = v; $$('[data-seg="tur"] button').forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-v") === v); }); listeDoldur(); });
  }
  function listeDoldur() {
    var q = L.ara, aq = arNorm(q), tq = trNorm(q), arMi = /[؀-ۿ]/.test(q), t = L.tur;
    var r = aralik(0, N).filter(function (i) {
      var x = K[i];
      if (!q && !kapsamUygun(i)) return false;
      if (q && (arMi ? (arNorm(x.ar).indexOf(aq) < 0 && arNorm(x.a).indexOf(aq) < 0 && arNorm(x.kok).replace(/\s/g, "").indexOf(aq) < 0) : trNorm(x.tr).indexOf(tq) < 0)) return false;
      if (t === "hepsi") return true;
      if (t === "yildiz") return D.f[ID[i]];
      if (t === "diger") return ["isim", "fiil", "sıfat", "deyim"].indexOf(x.tur) < 0;
      return x.tur === t;
    });
    var h = "", son = null;
    r.forEach(function (i) { var b = K[i].b; if (!q && b !== son) { son = b; h += '<div class="sayfa-bas">' + esc(BOLUM[b].no + ". " + BOLUM[b].tr) + "</div>"; } h += kelimeSatir(i); });
    $("#liste").innerHTML = h || '<p class="soluk">Sonuç yok.</p>';
  }
  function maddeYenile(i) { var el = $('.madde[data-m="' + i + '"]'); if (!el) return; var d = document.createElement("div"); d.innerHTML = kelimeSatir(i); el.replaceWith(d.firstChild); }
  document.addEventListener("click", function (e) {
    var y = e.target.closest("[data-yildiz]");
    if (y) {
      var i = +y.getAttribute("data-yildiz");
      if (D.f[ID[i]]) delete D.f[ID[i]]; else D.f[ID[i]] = 1;
      kaydet(); $$('[data-yildiz="' + i + '"]').forEach(function (b) { b.classList.toggle("acik", !!D.f[ID[i]]); b.textContent = D.f[ID[i]] ? "★" : "☆"; });
      return;
    }
    var bb = e.target.closest("[data-bil]");
    if (bb) {
      var bi = +bb.getAttribute("data-bil"), ac = !(st(bi) && st(bi).b);
      biliyorum(bi, ac); S = null; maddeYenile(bi);
      if ($("#pop")) popAc(bi);
      toast(ac ? "Bu kelime bir daha gösterilmeyecek." : "Kelime yeniden çalışma listesinde.");
      return;
    }
    var kg = e.target.closest("[data-kelgit]");
    if (kg) { var ki = +kg.getAttribute("data-kelgit"); L.ara = K[ki].a || K[ki].ar; L.acik[ki] = true; git("kelime"); return; }
    var a = e.target.closest("[data-ac]");
    if (a && !e.target.closest("button")) { var ai = +a.getAttribute("data-ac"); L.acik[ai] = !L.acik[ai]; maddeYenile(ai); }
  });

  // ---------- KARTLAR ----------
  var S = null, ekstra = 0;
  function bekleyenler() {
    var t = bugun(), r = [];
    for (var i = 0; i < N; i++) { var s = st(i); if (s && !s.b && s.d <= t && kapsamUygun(i)) r.push(i); }
    r.sort(function (a, b) { return (st(a).d - st(b).d) || (a - b); });
    return r;
  }
  function oturumKur() {
    var bek = bekleyenler().slice(0, 200), h = {}, n = yeniKalan() + ekstra; ekstra = 0;
    bek.forEach(function (i) { h[i] = 1; });
    var yeni = aralik(0, N).filter(function (i) { return !st(i) && !h[i] && kapsamUygun(i) && K[i].tur !== "özel isim"; }).slice(0, n), q = [];
    while (bek.length || yeni.length) { for (var j = 0; j < 3 && bek.length; j++) q.push(bek.shift()); if (yeni.length) q.push(yeni.shift()); }
    S = { q: q, top: q.length, bitti: 0, acik: false, tekrar: {}, dogru: 0 };
  }
  function kartCiz() {
    if (!S || !S.q.length) oturumKur();
    if (!S.q.length) {
      ana.innerHTML = '<section class="kart">' + kapsamHTML() + '</section><section class="kart bitti"><div class="buyuk-ikon">🌿</div><h2>Şu an sorulacak kart yok</h2>' +
        '<p class="aciklama">' + (S.top ? "Oturumu bitirdin! " + S.top + " kartın " + S.dogru + " tanesini ilk seferde bildin." : "Bu kapsamdaki bugünkü tekrarların ve yeni kelimelerin bitti.") + "</p>" +
        '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="ek10" type="button">+10 yeni kelime</button><button class="btn" id="gOyun" type="button">Oyun oyna</button></div></section>';
      kapsamBagla(function () { S = null; kartCiz(); });
      $("#ek10").addEventListener("click", function () { ekstra = 10; S = null; kartCiz(); });
      $("#gOyun").addEventListener("click", function () { git("oyun"); });
      return;
    }
    var i = S.q[0], x = K[i], s = st(i);
    var on = '<div class="f-ar ar">' + esc(x.ar) + "</div>" + (x.a && x.a !== x.ar ? '<div class="f-ek ar">' + esc(x.a) + "</div>" : "") + dinleBtn(x.a || x.ar) +
      '<div class="f-ipucu">Anlamı ne? Düşün, sonra dokun.</div>';
    var arka = '<div style="text-align:center"><div class="f-ar ar" style="font-size:2.4rem">' + esc(x.ar) + "</div>" + dinleBtn(x.a || x.ar) + '<div class="f-tr">' + esc(x.tr) + "</div></div>" + detayHTML(i);
    ana.innerHTML = '<div class="cal-ust"><div class="cubuk"><i style="width:' + (S.top ? S.bitti / S.top * 100 : 0) + '%"></i></div><span class="sayac">' + S.bitti + " / " + S.top + "</span></div>" +
      '<div class="fkart' + (S.acik ? " genis" : "") + '" id="fkart"><span class="etiket">' + esc(BOLUM[x.b].tr) + '</span><span class="etiket sag">' +
      (!s ? '<span class="durum yeni">yeni</span>' : s.r === 0 ? '<span class="durum ogr">yeniden</span>' : '<span class="durum tek">tekrar</span>') + "</span>" +
      '<div style="width:100%;margin-top:16px">' + (S.acik ? arka : on) + "</div></div>" +
      (S.acik ? '<div class="oy">' + [[1, "Bilmedim"], [2, "Zor"], [3, "Bildim"], [4, "Kolay"]].map(function (o) {
        return '<button type="button" class="o' + o[0] + '" data-q="' + o[0] + '">' + o[1] + "<small>" + gunYazi(sonraki(s, o[0])) + "</small></button>";
      }).join("") + "</div>" : '<button class="btn dolu buyuk goster-btn" id="goster" type="button">Cevabı göster</button>') +
      '<button class="btn bil-btn" id="bilBtn" type="button">✓ Bunu iyi biliyorum — bir daha gösterme</button>' +
      '<section class="kart" style="margin-top:14px">' + kapsamHTML() + '<p class="soluk kucuk" style="margin:0">Kısayollar: <b>Boşluk</b> çevirir, <b>1–4</b> puanlar, <b>B</b> bir daha göstermez.</p></section>';
    function cevir() { if (!S.acik) { S.acik = true; kartCiz(); } }
    if (!S.acik) $("#fkart").addEventListener("click", cevir);
    var g = $("#goster"); if (g) g.addEventListener("click", cevir);
    $$(".oy button").forEach(function (b) { b.addEventListener("click", function () { cevap(+b.getAttribute("data-q")); }); });
    $("#bilBtn").addEventListener("click", gosterme);
    kapsamBagla(function () { S = null; kartCiz(); });
    tus = function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!S.acik) cevir(); else cevap(3); }
      else if (S.acik && /^[1-4]$/.test(e.key)) cevap(+e.key);
      else if (e.key === "b" || e.key === "B") gosterme();
    };
  }
  function gosterme() {
    var i = S.q.shift(), once = st(i) ? JSON.stringify(st(i)) : null;
    S.q = S.q.filter(function (x) { return x !== i; }); S.top--;
    biliyorum(i, true); S.acik = false; kartCiz();
    toast("“" + K[i].ar + "” bir daha gösterilmeyecek.", function () {
      if (once) D.k[ID[i]] = JSON.parse(once); else delete D.k[ID[i]];
      kaydet(); S.q.unshift(i); S.top++; if (aktif === "kart") kartCiz();
    });
  }
  function cevap(q) {
    var i = S.q.shift(); puanla(i, q);
    if (q === 1) { S.tekrar[i] = 1; S.q.splice(Math.min(S.q.length, 3 + Math.floor(Math.random() * 3)), 0, i); }
    else { S.bitti++; if (!S.tekrar[i]) S.dogru++; }
    S.acik = false; if (!S.q.length) konfeti(); kartCiz();
  }

  // ---------- OYUNLAR ----------
  function havuz(kosul) { return aralik(0, N).filter(function (i) { return kapsamUygun(i) && K[i].tur !== "özel isim" && (!kosul || kosul(i)); }); }
  function celdirici(i, n, anahtar, ayniTur) {
    var hedef = anahtar(i), gor = {}, r = [];
    gor[hedef] = 1;
    var aday = karistir(aralik(0, N).filter(function (j) { return j !== i && K[j].tur !== "özel isim" && (!ayniTur || K[j].tur === K[i].tur); }));
    aday.sort(function (a, b) { return (K[a].tur !== K[i].tur) - (K[b].tur !== K[i].tur); });
    for (var k = 0; k < aday.length && r.length < n; k++) { var a = anahtar(aday[k]); if (!a || gor[a]) continue; gor[a] = 1; r.push(aday[k]); }
    return r;
  }
  var OYUN = [
    ["esle", "🧩", "Eşleştir", "Arapça kelimeleri Türkçe anlamlarıyla eşleştir."],
    ["test", "✅", "Anlam testi", "Dört seçenekten doğru anlamı bul."],
    ["bosluk", "✍️", "Boşluk doldur", "Kıssadaki cümlede eksik kelimeyi bul."],
    ["kur", "🔤", "Cümle kur", "Kıssadan bir cümlenin kelimelerini doğru sıraya diz."],
    ["hiz", "⚡", "Doğru mu? (60 sn)", "Kelime ile anlam eşleşiyor mu? Süre bitmeden çok puan topla."]
  ];
  var O = null;
  function oyunCiz() {
    O = null;
    ana.innerHTML = '<section class="kart"><h2>Oyunlar</h2><p class="aciklama">Kelimeleri oyunlarla pekiştir. Önce hangi bölümden sorulacağını seç.</p>' + kapsamHTML() +
      '<div class="ayarlar"><span class="ayar"><span class="lbl">Soru</span>' + seg("tsay", D.ay.tsay, [[10, "10"], [20, "20"], [30, "30"]]) + "</span></div>" +
      '<div class="oyunlar">' + OYUN.map(function (o) {
        var rek = D.rek && D.rek[o[0]];
        return '<button class="oyun-kart" type="button" data-oyun="' + o[0] + '"><span class="ikon">' + o[1] + "</span><b>" + o[2] + "</b><span>" + o[3] + (rek ? "<br>Rekor: " + rek : "") + "</span></button>";
      }).join("") + "</div></section>";
    kapsamBagla(oyunCiz);
    segBagla(ana, function (a, v) { if (a === "tsay") { D.ay.tsay = +v; kaydet(); oyunCiz(); } });
    $$("[data-oyun]").forEach(function (b) { b.addEventListener("click", function () { oyunBasla(b.getAttribute("data-oyun")); }); });
  }
  function yetersiz(n) {
    ana.innerHTML = '<section class="kart"><h2>Yeterli kelime yok</h2><p class="not">Bu kapsamda oyun için en az ' + n + ' uygun kelime gerekli. Daha geniş bir bölüm seç.</p><button class="btn" id="geri" type="button">Oyunlara dön</button></section>';
    $("#geri").addEventListener("click", oyunCiz);
  }
  function oyunBasla(ad) {
    if (ad === "esle") return esleBasla();
    if (ad === "kur") return kurBasla();
    if (ad === "hiz") return hizBasla();
    var h = ad === "bosluk" ? havuz(function (i) { return K[i].cu && K[i].cu.indexOf(K[i].ar) >= 0 && K[i].tur !== "deyim"; }) : havuz();
    if (h.length < 4) return yetersiz(4);
    O = { ad: ad, s: karistir(h).slice(0, D.ay.tsay), n: 0, d: 0, yanlis: [] };
    soruCiz();
  }
  function soruUst() { return '<div class="cal-ust"><div class="cubuk"><i style="width:' + (O.n / O.s.length * 100) + '%"></i></div><span class="sayac">' + (O.n + 1) + " / " + O.s.length + " · ✓ " + O.d + "</span></div>"; }
  function soruCiz() {
    if (O.n >= O.s.length) return sonuc();
    var i = O.s[O.n], x = K[i], soru, sec, secHTML, sinif = "";
    if (O.ad === "test") {
      var arTr = (O.n % 2 === 0);
      sec = karistir(celdirici(i, 3, arTr ? function (j) { return trNorm(kisa(K[j].tr)); } : function (j) { return arNorm(K[j].a || K[j].ar); }).concat([i]));
      soru = arTr ? '<div class="soru-ar ar">' + esc(x.ar) + "</div>" + dinleBtn(x.a || x.ar) + '<p class="soluk kucuk">Anlamı hangisi?</p>' : '<div class="soru-tr">' + esc(kisa(x.tr)) + '</div><p class="soluk kucuk">Arapçası hangisi?</p>';
      secHTML = function (j) { return arTr ? esc(kisa(K[j].tr)) : esc(K[j].a || K[j].ar); };
      if (!arTr) sinif = " ar";
    } else {
      sec = karistir(celdirici(i, 3, function (j) { return arNorm(K[j].ar); }, true).concat([i]));
      var n = x.cu.indexOf(x.ar);
      soru = '<div class="soru-tanim">' + arMetin(x.cu.slice(0, n)) + '<span class="bosluk-yer">…</span>' + arMetin(x.cu.slice(n + x.ar.length)) + "</div>" +
        '<div class="yardim" id="yardim" hidden>' + esc(x.cut) + "</div>";
      secHTML = function (j) { return esc(K[j].ar); };
      sinif = " ar";
    }
    ana.innerHTML = soruUst() + '<section class="kart"><div class="soru-kutu">' + soru + '</div><div class="secenekler">' + sec.map(function (j, k) {
      return '<button type="button" class="sec' + sinif + '" data-j="' + j + '"><span class="kisayol">' + (k + 1) + "</span>" + secHTML(j) + "</button>";
    }).join("") + '</div><div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center">' +
      (O.ad === "bosluk" ? '<button class="btn" id="yardimBtn" type="button">Türkçe yardım</button>' : "") +
      '<button class="btn dolu" id="son" type="button" hidden>Sonraki →</button></div></section><button class="btn kucuk" id="birak" type="button">Bitir</button>';
    var bitti = false;
    function sec1(b) {
      if (bitti) return; bitti = true;
      var ok = +b.getAttribute("data-j") === i;
      $$(".sec").forEach(function (y) { y.disabled = true; if (+y.getAttribute("data-j") === i) y.classList.add("dogru"); });
      if (ok) { O.d++; puanEkle(1); $("#gb").className = "geri-bildirim iyi"; $("#gb").innerHTML = "Doğru! ✓ <span class=\"soluk\">" + esc(x.ar) + " = " + esc(kisa(x.tr)) + "</span>"; }
      else { b.classList.add("yanlis"); O.yanlis.push(i); var s = st(i); if (s && !s.b) { s.d = Math.min(s.d, bugun()); kaydet(); } $("#gb").className = "geri-bildirim kotu"; $("#gb").innerHTML = 'Doğrusu: <span class="ar" style="font-size:1.3rem">' + esc(x.ar) + "</span> = " + esc(kisa(x.tr)); }
      $("#son").hidden = false; $("#son").focus();
      if (ok) setTimeout(function () { if (O && O.s[O.n] === i && aktif === "oyun") ileri(); }, 1000);
    }
    function ileri() { O.n++; soruCiz(); }
    $$(".sec").forEach(function (b) { b.addEventListener("click", function () { sec1(b); }); });
    $("#son").addEventListener("click", ileri);
    var yb = $("#yardimBtn"); if (yb) yb.addEventListener("click", function () { $("#yardim").hidden = false; this.hidden = true; });
    $("#birak").addEventListener("click", function () { O.s = O.s.slice(0, O.n); sonuc(); });
    tus = function (e) { if (/^[1-4]$/.test(e.key) && !bitti) sec1($$(".sec")[+e.key - 1]); else if (e.key === "Enter" && bitti) { e.preventDefault(); ileri(); } };
  }
  function rekor(ad, p) { D.rek = D.rek || {}; if (!D.rek[ad] || p > D.rek[ad]) { D.rek[ad] = p; kaydet(); return true; } return false; }
  function sonuc() {
    var top = O.s.length, yz = top ? Math.round(O.d / top * 100) : 0, yeniRek = rekor(O.ad, O.d);
    if (yz >= 80 && top) konfeti();
    ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">' + (yz >= 80 ? "🏆" : yz >= 50 ? "👍" : "💪") + "</div><h2>" + O.d + " / " + top + " doğru</h2>" +
      '<p class="aciklama">%' + yz + (yeniRek && O.d ? " — yeni rekor!" : "") + "</p>" +
      '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="tekrar" type="button">Yeniden oyna</button><button class="btn" id="geri" type="button">Oyunlara dön</button></div>' +
      (O.yanlis.length ? '<div class="sonuc-liste" style="text-align:start">' + O.yanlis.map(function (i) {
        return '<div class="r"><span class="ar">' + esc(K[i].ar) + '</span><span class="t">' + esc(K[i].tr) + "</span></div>";
      }).join("") + "</div>" : "") + "</section>";
    var ad = O.ad;
    $("#tekrar").addEventListener("click", function () { oyunBasla(ad); });
    $("#geri").addEventListener("click", oyunCiz);
    tus = function (e) { if (e.key === "Enter") oyunBasla(ad); };
  }
  // eşleştir
  function esleBasla() {
    var h = havuz(); if (h.length < 4) return yetersiz(4);
    var gor = {}, c = [];
    karistir(h).forEach(function (i) { if (c.length >= 6) return; var k = trNorm(kisa(K[i].tr)); if (!gor[k]) { gor[k] = 1; c.push(i); } });
    var E = { sol: karistir(c.slice()), sag: karistir(c.slice()), kalan: c.length, hata: 0, t0: Date.now() };
    ana.innerHTML = '<section class="kart"><h2>Eşleştir</h2><p class="aciklama">Bir Arapça kelimeye, sonra Türkçe anlamına dokun.</p><div class="esle"><div class="sutun">' +
      E.sol.map(function (i) { return '<button type="button" class="ek ar" data-y="a" data-i="' + i + '">' + esc(K[i].ar) + "</button>"; }).join("") + '</div><div class="sutun">' +
      E.sag.map(function (i) { return '<button type="button" class="ek" data-y="t" data-i="' + i + '">' + esc(kisa(K[i].tr)) + "</button>"; }).join("") +
      '</div></div><div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="yeniTur" type="button">Yeni tur</button><button class="btn" id="geri" type="button">Oyunlara dön</button></div></section>';
    $("#yeniTur").addEventListener("click", esleBasla); $("#geri").addEventListener("click", oyunCiz);
    var secili = null;
    $$(".ek").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.classList.contains("tamam")) return;
        if (!secili || secili.getAttribute("data-y") === b.getAttribute("data-y")) { if (secili) secili.classList.remove("secili"); secili = b; b.classList.add("secili"); return; }
        if (secili.getAttribute("data-i") === b.getAttribute("data-i")) {
          secili.classList.add("tamam"); b.classList.add("tamam"); secili.classList.remove("secili"); secili = null; puanEkle(1);
          if (--E.kalan === 0) { var sn = Math.round((Date.now() - E.t0) / 1000); $("#gb").className = "geri-bildirim iyi"; $("#gb").textContent = "Tebrikler! " + sn + " saniye, " + E.hata + " hata."; konfeti(); }
        } else {
          E.hata++; var a = secili, c2 = b; a.classList.add("hata"); c2.classList.add("hata");
          setTimeout(function () { a.classList.remove("hata", "secili"); c2.classList.remove("hata"); }, 450); secili = null;
        }
      });
    });
  }
  // cümle kur
  function kurHavuz() {
    return METIN.map(function (m, n) { return n; }).filter(function (n) {
      var m = METIN[n]; if (m.t !== "s" || /﴿/.test(m.ar)) return false;
      if (D.ay.kb >= 0 ? m.b !== D.ay.kb : D.ay.kk >= 0 && BOLUM[m.b].k !== D.ay.kk) return false;
      var w = m.ar.split(/\s+/).filter(Boolean).length; return w >= 3 && w <= 9;
    });
  }
  function kurBasla() {
    var h = kurHavuz(); if (h.length < 1) return yetersiz(1);
    O = { ad: "kur", s: karistir(h).slice(0, Math.min(D.ay.tsay, h.length)), n: 0, d: 0, yanlis: [] };
    kurCiz();
  }
  function kurCiz() {
    if (O.n >= O.s.length) return kurSonuc();
    var m = METIN[O.s[O.n]], ks = m.ar.split(/\s+/).filter(Boolean), dizi = [], havuzK = karistir(ks.map(function (w, n) { return n; }));
    if (havuzK.every(function (v, n) { return v === n; }) && ks.length > 1) havuzK.reverse();
    function ciz() {
      ana.innerHTML = soruUst() + '<section class="kart"><p class="soluk kucuk" style="text-align:center;margin:0">' + esc(BOLUM[m.b].no + ". " + BOLUM[m.b].tr) + '</p><div class="soru-tr" style="text-align:center;font-size:1.05rem">Kıssadaki cümleyi doğru sıraya diz.</div>' +
        '<div class="sira-alan" id="alan">' + dizi.map(function (n, k) { return '<button type="button" class="tas" data-geri="' + k + '">' + esc(ks[n]) + "</button>"; }).join("") + "</div>" +
        '<div class="sira-havuz">' + havuzK.map(function (n) { return dizi.indexOf(n) >= 0 ? "" : '<button type="button" class="tas" data-al="' + n + '">' + esc(ks[n]) + "</button>"; }).join("") + "</div>" +
        '<div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center"><button class="btn" id="temizle" type="button">Temizle</button>' +
        '<button class="btn dolu" id="kontrol" type="button"' + (dizi.length === ks.length ? "" : " disabled") + '>Kontrol et</button><button class="btn" id="pas" type="button">Göster</button></div></section><button class="btn kucuk" id="birak" type="button">Bitir</button>';
      $$("[data-al]").forEach(function (b) { b.addEventListener("click", function () { dizi.push(+b.getAttribute("data-al")); ciz(); }); });
      $$("[data-geri]").forEach(function (b) { b.addEventListener("click", function () { dizi.splice(+b.getAttribute("data-geri"), 1); ciz(); }); });
      $("#temizle").addEventListener("click", function () { dizi = []; ciz(); });
      $("#kontrol").addEventListener("click", kontrol);
      $("#pas").addEventListener("click", function () { O.yanlis.push(O.s[O.n]); goster(false); });
      $("#birak").addEventListener("click", function () { O.s = O.s.slice(0, O.n); kurSonuc(); });
    }
    function kontrol() {
      var ok = dizi.map(function (n) { return ks[n]; }).join(" ") === ks.join(" ");
      if (ok) { O.d++; puanEkle(2); goster(true); } else { $("#gb").className = "geri-bildirim kotu"; $("#gb").textContent = "Henüz doğru değil; kelimelere dokunarak geri alabilirsin."; }
    }
    function goster(ok) {
      $("#alan").innerHTML = '<span class="ar" style="font-size:1.6rem">' + esc(m.ar) + "</span>";
      $(".sira-havuz").innerHTML = "";
      $("#gb").className = "geri-bildirim " + (ok ? "iyi" : "kotu"); $("#gb").textContent = ok ? "Harika! ✓" : "Doğru sıralama yukarıda.";
      $(".satir-btn", ana).innerHTML = '<button class="btn dolu" id="son" type="button">Sonraki →</button>' + dinleBtn(m.ar);
      $("#son").addEventListener("click", function () { O.n++; kurCiz(); }); $("#son").focus();
    }
    ciz();
    tus = function (e) { if (e.key === "Enter" && $("#son")) { e.preventDefault(); $("#son").click(); } };
  }
  function kurSonuc() {
    var top = O.s.length; rekor("kur", O.d); if (top && O.d / top >= .8) konfeti();
    ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">🔤</div><h2>' + O.d + " / " + top + ' cümle</h2><div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="tekrar" type="button">Yeniden oyna</button><button class="btn" id="geri" type="button">Oyunlara dön</button></div>' +
      (O.yanlis.length ? '<div class="sonuc-liste" style="text-align:start">' + O.yanlis.map(function (n) { return '<div class="r"><span class="ar">' + esc(METIN[n].ar) + "</span></div>"; }).join("") + "</div>" : "") + "</section>";
    $("#tekrar").addEventListener("click", kurBasla); $("#geri").addEventListener("click", oyunCiz);
  }
  // doğru mu (60 sn)
  function hizBasla() {
    var h = havuz(); if (h.length < 4) return yetersiz(4);
    var H = { p: 0, s: 0, son: Date.now() + 60000, i: -1, j: -1 }, zam;
    function yeni() {
      H.i = h[Math.floor(Math.random() * h.length)];
      H.j = Math.random() < .5 ? H.i : celdirici(H.i, 1, function (j) { return trNorm(kisa(K[j].tr)); })[0];
      if (H.j == null) H.j = H.i;
      $("#hk").innerHTML = '<div class="soru-ar ar">' + esc(K[H.i].ar) + '</div><div class="soru-tr">= ' + esc(kisa(K[H.j].tr)) + "</div>";
    }
    function cevap(d) {
      if (Date.now() > H.son) return;
      var ok = (H.i === H.j) === d; H.s++;
      if (ok) { H.p++; }
      $("#gb").className = "geri-bildirim " + (ok ? "iyi" : "kotu"); $("#gb").textContent = ok ? "✓" : "✗ " + K[H.i].ar + " = " + kisa(K[H.i].tr);
      $("#puanH").textContent = H.p; yeni();
    }
    function bit() {
      clearInterval(zam); var yr = rekor("hiz", H.p); puanEkle(H.p); if (H.p >= 15) konfeti();
      ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">⚡</div><h2>' + H.p + " puan</h2><p class=\"aciklama\">" + H.s + " soruda " + H.p + " doğru" + (yr && H.p ? " — yeni rekor!" : "") + "</p>" +
        '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="tekrar" type="button">Yeniden oyna</button><button class="btn" id="geri" type="button">Oyunlara dön</button></div></section>';
      $("#tekrar").addEventListener("click", hizBasla); $("#geri").addEventListener("click", oyunCiz);
      tus = null;
    }
    ana.innerHTML = '<section class="kart"><div class="cal-ust"><span class="sayac">⏱ <span class="sure" id="sure">60</span> sn</span><div class="cubuk"><i id="sc" style="width:100%"></i></div><span class="sayac">★ <span id="puanH">0</span></span></div>' +
      '<div class="soru-kutu" id="hk"></div><div class="dy"><button class="y" type="button" id="hY">✗ Yanlış</button><button class="d" type="button" id="hD">✓ Doğru</button></div>' +
      '<div class="geri-bildirim" id="gb"></div><p class="soluk kucuk" style="text-align:center">Klavye: ← yanlış, → doğru</p></section>';
    $("#hD").addEventListener("click", function () { cevap(true); }); $("#hY").addEventListener("click", function () { cevap(false); });
    yeni();
    zam = setInterval(function () {
      var k = Math.max(0, H.son - Date.now());
      if (aktif !== "oyun" || !$("#sure")) { clearInterval(zam); return; }
      $("#sure").textContent = Math.ceil(k / 1000); $("#sc").style.width = (k / 600) + "%";
      if (k <= 0) bit();
    }, 200);
    tus = function (e) { if (e.key === "ArrowRight") cevap(true); else if (e.key === "ArrowLeft") cevap(false); };
  }

  // ---------- İLERLEME ----------
  function istCiz() {
    var c = { yeni: 0, ogr: 0, tamam: 0, bil: 0 };
    aralik(0, N).forEach(function (i) { c[durum(i)]++; });
    var bol = BOLUM.map(function (b, n) {
      var r = aralik(0, N).filter(function (i) { return K[i].b === n; }), t = r.filter(function (i) { var d = durum(i); return d === "tamam" || d === "bil"; }).length, g = r.filter(function (i) { return durum(i) === "ogr"; }).length;
      return [b, r.length, t, g];
    });
    ana.innerHTML = '<section class="kart"><h2>İlerleme</h2><div class="hero" style="grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">' +
      '<div class="sayi yeni"><b>' + c.tamam + '</b><span>öğrenildi</span></div><div class="sayi tekrar"><b>' + c.bil + '</b><span>biliyorum</span></div>' +
      '<div class="sayi seri"><b>' + c.ogr + '</b><span>öğreniliyor</span></div><div class="sayi"><b>' + (D.puan || 0) + '</b><span>puan ★</span></div><div class="sayi seri"><b>' + seri() + '</b><span>gün seri 🔥</span></div></div></section>' +
      '<section class="kart"><h2>Bölümler</h2>' + bol.map(function (x, n) {
        return '<div class="madde"><div class="madde-ust" data-bgit="' + n + '"><span class="tr" style="white-space:normal;color:inherit">' + esc(x[0].no + ". " + x[0].tr) + ' <span class="ar soluk" style="font-size:1.1rem">' + esc(x[0].ar) + '</span></span><span class="yan"><span class="kucuk soluk">' + (x[2]) + "/" + x[1] + "</span></span></div>" +
          '<div class="ilerleme" style="height:6px;margin-top:4px"><i class="o" style="width:' + (x[1] ? x[2] / x[1] * 100 : 0) + '%"></i><i class="g" style="width:' + (x[1] ? x[3] / x[1] * 100 : 0) + '%"></i></div></div>';
      }).join("") + "</section>" +
      '<section class="kart"><h2>Ayarlar</h2><div class="ayarlar"><span class="ayar"><span class="lbl">Günlük yeni kelime</span>' + seg("yeni", D.ay.yeni, [[5, "5"], [10, "10"], [15, "15"], [20, "20"], [30, "30"]]) + "</span></div>" +
      (arSes ? '<p class="soluk kucuk">🔊 Cihazında Arapça ses bulundu.</p>' : '<p class="soluk kucuk">Cihazında Arapça okuma sesi bulunamadı, bu yüzden dinleme düğmesi gizli.</p>') + "</section>" +
      '<section class="kart"><h2>Yedek</h2><p class="aciklama">İlerleme yalnızca bu tarayıcıda durur. Ara sıra yedek al.</p>' + (depoVar ? "" : '<p class="not"><b>Dikkat:</b> Bu tarayıcı kayıt yapmaya izin vermiyor.</p>') +
      '<div class="satir-btn"><button class="btn dolu" id="yedekAl" type="button">Yedek al</button><label class="btn" for="yedekDosya" style="display:inline-block">Yedeği yükle</label><input type="file" id="yedekDosya" accept=".json,application/json" hidden>' +
      '<button class="btn" id="sifirla" type="button" style="margin-inline-start:auto;color:var(--yanlis)">Her şeyi sıfırla</button></div></section>';
    segBagla(ana, function (a, v) { D.ay.yeni = +v; kaydet(); S = null; istCiz(); });
    $$("[data-bgit]").forEach(function (b) { b.addEventListener("click", function () { okB = +b.getAttribute("data-bgit"); git("oku"); }); });
    $("#yedekAl").addEventListener("click", function () {
      var d = new Date(), veri = JSON.stringify(D), ad = "kisas-kelime-yedek-" + d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";
      function tarayici() { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([veri], { type: "application/json" })); a.download = ad; document.body.appendChild(a); a.click(); a.remove(); toast("Yedek indirildi."); }
      if (!(window.claude && window.claude.use)) return tarayici();
      window.claude.use("downloads").then(function (dl) {
        if (!dl) return tarayici();
        dl.save({ filename: ad, data: veri }).then(function () { toast("Yedek kaydedildi."); }, function (e) { toast(e && e.code === "declined" ? "Yedek kaydedilmedi." : "Burada indirme yapılamıyor; programı dosya olarak açıp yedek al."); });
      }, tarayici);
    });
    $("#yedekDosya").addEventListener("change", function () {
      var f = this.files[0]; if (!f) return; var r = new FileReader();
      r.onload = function () { try { var o = JSON.parse(r.result); if (!o || typeof o.k !== "object") throw 0; var d = bos(); for (var k in o) if (k !== "ay") d[k] = o[k]; for (var a in o.ay) d.ay[a] = o.ay[a]; D = d; kaydet(); temaUygula(); rozetGuncelle(); S = null; istCiz(); toast("Yedek yüklendi."); } catch (e) { toast("Bu dosya geçerli bir yedek değil."); } };
      r.readAsText(f);
    });
    $("#sifirla").addEventListener("click", function () { onayli(this, "Bütün ilerleme silinecek — eminim, sil", function () { var t = D.ay.tema; D = bos(); D.ay.tema = t; kaydet(); rozetGuncelle(); S = null; istCiz(); toast("Sıfırlandı."); }); });
  }

  git("oku");
})();
