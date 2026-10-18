(function () {
  "use strict";
  // M: maddeler {k, c, m, t, o[], b[cümle, kelime]|null, tr, ttr, otr[], r, s, y[[ilişki, kelime, tr]], f}
  var N = M.length;
  var ANAHTAR = "mucemDefteri";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ana = $("#ana");

  // ---------- yardımcılar ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bugun() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
  function karistir(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function aralik(a, b) { var r = []; for (var i = a; i < b; i++) r.push(i); return r; }
  function arNorm(s) { return String(s || "").replace(/[ً-ٰٟـ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي"); }
  function trNorm(s) {
    return String(s || "").toLocaleLowerCase("tr").replace(/[âà]/g, "a").replace(/[îı]/g, "i").replace(/û/g, "u").replace(/ş/g, "s").replace(/ç/g, "c")
      .replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ü/g, "u").replace(/\s+/g, " ").trim();
  }
  // ayetler yeşil, tırnaklı örnekler kalın
  function arMetin(s) {
    return esc(s).replace(/﴿[^﴾]*﴾/g, function (a) { return '<span class="ayet">' + a + "</span>"; })
      .replace(/«([^»]*)»/g, "«<b>$1</b>»");
  }
  function kisaTanim(i) {
    var t = (M[i].t || M[i].m || "").replace(/^\s*\(\s*[١1]\s*\)\s*/, "");
    var p = t.split(/\s*\(\s*[٢2]\s*\)|[؛.:]\s|\s[“"﴿«]/)[0].trim();
    if (p.length > 80) p = p.slice(0, 80).replace(/\s+\S*$/, "") + "…";
    return p;
  }
  function fiilMi(i) { return /^يَ|^يُ|^ي[؀-ۿ]/.test((M[i].m || "").trim()); }
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
  // onay: ilk dokunuşta düğme soruyu gösterir, 5 sn içinde ikinci dokunuş işi yapar (confirm() bazı görünümlerde engelli)
  function onayli(btn, soru, fn) {
    if (btn.dataset.onay) { clearTimeout(+btn.dataset.onay); delete btn.dataset.onay; btn.textContent = btn.dataset.eski; btn.classList.remove("onay"); fn(); return; }
    btn.dataset.eski = btn.textContent; btn.textContent = soru; btn.classList.add("onay");
    btn.dataset.onay = setTimeout(function () { delete btn.dataset.onay; btn.textContent = btn.dataset.eski; btn.classList.remove("onay"); }, 5000);
  }
  function resimHTML(i, sinif) { var r = M[i].r; return r && RESIM[r] ? '<img class="' + (sinif || "m-resim") + '" src="' + RESIM[r] + '" alt="">' : ""; }

  // ---------- kayıt ----------
  var depoVar = true;
  function bos() { return { v: 1, k: {}, f: {}, gun: {}, yb: { g: 0, n: 0 }, ay: { yeni: 10, yon: "kt", tema: null, kay: "ogr", ks: 0, tsoru: "tanim", tsay: 10 } }; }
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
  // kayıtlar madde başıyla tutulur; ileride yeni sayfalar eklenince sıra değişse de ilerleme kaybolmaz
  var ID = M.map(function (x) { return x.k + "|" + x.s; });
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
  function bekleyenler() {
    var t = bugun(), r = [];
    for (var i = 0; i < N; i++) { var s = st(i); if (s && !s.b && s.d <= t) r.push(i); }
    r.sort(function (a, b) { return (st(a).d - st(b).d) || (a - b); });
    return r;
  }
  function siradakiYeniler(n, haric) {
    var r = [], h = haric || {};
    for (var i = 0; i < N && r.length < n; i++) if (!st(i) && !h[i]) r.push(i);
    return r;
  }
  function sayilar() {
    var c = { yeni: 0, ogr: 0, tamam: 0, bil: 0 };
    for (var i = 0; i < N; i++) c[durum(i)]++;
    return c;
  }

  // ---------- aralıklı tekrar ----------
  function sonraki(s, q) {
    if (q === 1) return 0;
    if (!s || s.r === 0) return q === 4 ? 4 : 1;
    if (s.r === 1 && s.i < 3) return q === 2 ? 2 : q === 3 ? 3 : 6;
    var g = q === 2 ? Math.max(s.i + 1, Math.round(s.i * 1.2)) : q === 3 ? Math.round(s.i * s.e) : Math.round(s.i * s.e * 1.3);
    return Math.min(3650, Math.max(g, s.i + 1));
  }
  function gunYazi(g) {
    if (g === 0) return "şimdi";
    if (g < 30) return g + " gün";
    if (g < 365) return Math.round(g / 30) + " ay";
    return (Math.round(g / 36.5) / 10) + " yıl";
  }
  function puanla(i, q) {
    var t = bugun(), gk = gunKayit(), s = st(i);
    if (!s) {
      s = D.k[ID[i]] = { r: 0, i: 0, e: 2.5, d: t, l: 0, g: 0 };
      if (D.yb.g !== t) D.yb = { g: t, n: 0 };
      D.yb.n++; gk.y++;
    }
    var g = sonraki(s, q);
    s.g++; gk.t++;
    if (q === 1) {
      if (s.r > 0) { s.l++; s.e = Math.max(1.3, s.e - 0.2); }
      s.r = 0; s.i = 0; s.d = t;
    } else {
      gk.d++;
      if (q === 2) s.e = Math.max(1.3, s.e - 0.15);
      if (q === 4) s.e = Math.min(3.2, s.e + 0.15);
      s.r++; s.i = g; s.d = t + g;
    }
    kaydet(); seriGuncelle();
  }
  function tekrarlaBugun(i) { var s = st(i); if (s && !s.b) { s.d = Math.min(s.d, bugun()); kaydet(); } }

  // ---------- sesli okuma (cihazda Arapça ses varsa) ----------
  var arSes = null;
  function sesBul() {
    try { var v = speechSynthesis.getVoices().filter(function (x) { return /^ar/i.test(x.lang); }); arSes = v.length ? v[0] : null; } catch (e) { arSes = null; }
  }
  if (window.speechSynthesis) { sesBul(); try { speechSynthesis.onvoiceschanged = sesBul; } catch (e) {} }
  function okuMetin(m) {
    if (!arSes) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(m); u.voice = arSes; u.lang = arSes.lang; u.rate = .8; speechSynthesis.speak(u); } catch (e) {}
  }
  function dinleBtn(i) { return arSes ? '<button class="dinle" type="button" data-oku="' + i + '" title="Dinle">🔊</button>' : ""; }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-oku]"); if (b) { e.stopPropagation(); okuMetin(M[+b.getAttribute("data-oku")].k); }
  }, true);

  // ---------- tema, seri ----------
  function temaUygula() { if (D.ay.tema) document.documentElement.setAttribute("data-theme", D.ay.tema); else document.documentElement.removeAttribute("data-theme"); }
  function koyuMu() { return D.ay.tema ? D.ay.tema === "dark" : window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches; }
  $("#temaBtn").addEventListener("click", function () { D.ay.tema = koyuMu() ? "light" : "dark"; temaUygula(); kaydet(); $("#temaBtn").textContent = koyuMu() ? "☀" : "☾"; });
  function seriGuncelle() { $("#seriRozet").textContent = "🔥 " + seri(); }
  temaUygula(); $("#temaBtn").textContent = koyuMu() ? "☀" : "☾"; seriGuncelle();

  // ---------- sekmeler ----------
  var SEKME = [["bugun", "Bugün"], ["calis", "Kartlar"], ["tanim", "Tanımdan bul"], ["bosluk", "Boşluk doldur"], ["esle", "Eşleştir"], ["sozluk", "Sözlük"]];
  if (LEVHA.length) SEKME.push(["levha", "Levhalar"]);
  SEKME.push(["ist", "İstatistik"]);
  var aktif = "bugun", tus = null;
  $("#sekmeler").innerHTML = SEKME.map(function (s) { return '<button class="sekme" role="tab" type="button" data-s="' + s[0] + '">' + s[1] + "</button>"; }).join("");
  $("#sekmeler").addEventListener("click", function (e) { var b = e.target.closest(".sekme"); if (b) git(b.getAttribute("data-s")); });
  function git(s) {
    aktif = s; tus = null;
    $$(".sekme").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-s") === s ? "true" : "false"); });
    ({ bugun: bugunCiz, calis: calisCiz, tanim: tanimCiz, bosluk: boslukCiz, esle: esleCiz, sozluk: sozlukCiz, levha: levhaCiz, ist: istCiz })[s]();
    window.scrollTo(0, 0);
  }
  document.addEventListener("keydown", function (e) {
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

  // ---------- madde gösterimi ----------
  function ilgiliHTML(i) {
    var y = M[i].y || [];
    if (!y.length) return "";
    return '<div class="m-ilgili">' + y.map(function (x) { return '<span class="cip"><span class="ar">' + esc(x[0]) + ": " + esc(x[1]) + "</span></span>"; }).join("") + "</div>";
  }
  // madde gövdesi: tanım + örnekler (+ Türkçe, istenirse)
  function govdeHTML(i, trAcik) {
    var x = M[i], h = "";
    h += '<div class="m-tanim">' + arMetin(x.t || x.m) + "</div>";
    if (trAcik && x.ttr) h += '<div class="m-tr">' + esc(x.ttr) + "</div>";
    (x.o || []).forEach(function (o, n) {
      h += '<div class="m-ornek">' + arMetin(o) + "</div>";
      if (trAcik && x.otr && x.otr[n]) h += '<div class="m-tr">' + esc(x.otr[n]) + "</div>";
    });
    return h;
  }
  function basHTML(i, buyuk) {
    var x = M[i];
    return '<div class="f-bas"><div class="' + (buyuk ? "f-ar" : "soru-ar") + ' ar">' + esc(x.k) + "</div>" +
      (x.f ? '<div class="m-cogul">' + esc(x.f) + "</div>" : "") +
      (x.c ? '<div class="m-cogul">ج: ' + esc(x.c) + "</div>" : "") + dinleBtn(i) + "</div>";
  }

  // ---------- BUGÜN ----------
  function bugunCiz() {
    var bek = bekleyenler().length, yk = Math.min(yeniKalan(), sayilar().yeni), c = sayilar(), sr = seri();
    var bitti = bek === 0 && yk === 0;
    ana.innerHTML =
      '<section class="kart"><h2>Bugünün çalışması</h2>' +
      '<p class="aciklama">' + (bitti ? "Bugünkü görevin bitti, aferin! İstersen yeni kelime ekleyebilir ya da “Tanımdan bul” alıştırmasını çözebilirsin." :
        "Kelimeleri sözlüğün kendi Arapça açıklamalarıyla öğren. Türkçe her kartta bir düğmenin arkasında duruyor; önce Arapçayı anlamaya çalış.") + "</p>" +
      '<div class="hero"><div class="sayi tekrar"><b>' + bek + '</b><span>tekrar bekliyor</span></div>' +
      '<div class="sayi yeni"><b>' + yk + '</b><span>yeni kelime</span></div>' +
      '<div class="sayi seri"><b>' + sr + '</b><span>gün seri 🔥</span></div></div>' +
      '<div class="satir-btn">' + (bitti ? '<button class="btn dolu buyuk" id="ekYeni" type="button">+5 yeni kelime</button><button class="btn buyuk" id="gitTanim" type="button">Tanımdan bul</button>' :
        '<button class="btn dolu buyuk" id="basla" type="button">Çalışmaya başla →</button>') + "</div></section>" +
      '<section class="kart"><h2>Genel ilerleme</h2><p class="aciklama">Sözlükte şimdilik ' + N + " madde var (" + SAYFA_ARALIK + "). <b>" + (N - c.yeni) + "</b> tanesiyle tanıştın.</p>" +
      '<div class="ilerleme"><i class="o" style="width:' + (c.tamam / N * 100) + '%"></i><i class="b" style="width:' + (c.bil / N * 100) + '%"></i><i class="g" style="width:' + (c.ogr / N * 100) + '%"></i></div>' +
      '<div class="efsane"><span><i style="background:var(--dogru)"></i>Öğrenildi ' + c.tamam + '</span><span><i style="background:var(--mavi)"></i>Biliyorum ' + c.bil +
      '</span><span><i style="background:var(--altin)"></i>Öğreniliyor ' + c.ogr + '</span><span><i style="background:var(--yumusak)"></i>Yeni ' + c.yeni + "</span></div></section>" +
      '<section class="kart"><h2>Nasıl çalışırım?</h2><ol class="kucuk" style="margin:4px 0 0;padding-inline-start:20px">' +
      "<li><b>Kartlar</b>: Kelimeyi gör, ne demek olduğunu Arapça açıklamasıyla hatırlamaya çalış, sonra kartı çevir. Bilemediğinde “Türkçesi” düğmesine bas.</li>" +
      "<li><b>Tanımdan bul</b>: Sözlüğün Arapça açıklamasını (ya da resmi) okuyup doğru kelimeyi seç. Arapçayı Arapçayla düşünmenin en iyi alıştırması.</li>" +
      "<li><b>Boşluk doldur</b>: Kitaptaki örnek cümlede eksik kelimeyi bul.</li>" +
      "<li><b>Sözlük</b>: Bütün maddeleri sayfa sırasıyla oku, ara, ★ ile işaretle. İyi bildiğin kelimeleri “✓ biliyorum” ile ayır.</li>" +
      "<li>İlerlemen bu tarayıcıda saklanır; arada bir <b>İstatistik → Yedek al</b>.</li></ol></section>";
    var b = $("#basla"); if (b) b.addEventListener("click", function () { S = null; git("calis"); });
    var ey = $("#ekYeni"); if (ey) ey.addEventListener("click", function () { ekstraYeni = 5; S = null; git("calis"); });
    var gt = $("#gitTanim"); if (gt) gt.addEventListener("click", function () { git("tanim"); });
  }

  // ---------- KARTLAR ----------
  var S = null, ekstraYeni = 0;
  function oturumKur() {
    var bek = bekleyenler().slice(0, 300), h = {};
    var n = yeniKalan() + ekstraYeni; ekstraYeni = 0;
    bek.forEach(function (i) { h[i] = 1; });
    var yeni = siradakiYeniler(n, h), q = [];
    while (bek.length || yeni.length) {
      for (var j = 0; j < 3 && bek.length; j++) q.push(bek.shift());
      if (yeni.length) q.push(yeni.shift());
    }
    S = { q: q, top: q.length, bitti: 0, acik: false, tr: false, tekrar: {}, dogru: 0 };
  }
  function yonu(i) { var y = D.ay.yon; return y === "karisik" ? ((i + bugun()) % 2 ? "tk" : "kt") : y; }
  function calisCiz() {
    if (!S || !S.q.length) oturumKur();
    if (!S.q.length) {
      ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">🌿</div><h2>Şu an sorulacak kart yok</h2>' +
        '<p class="aciklama">' + (S.top ? "Oturumu bitirdin! " + S.top + " kartın " + S.dogru + " tanesini ilk seferde bildin." : "Bugünkü tekrarların ve yeni kelimelerin bitti.") + "</p>" +
        '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="ek5" type="button">+5 yeni kelime</button>' +
        '<button class="btn" id="ek10" type="button">+10 yeni kelime</button><button class="btn" id="gTanim" type="button">Tanımdan bul</button></div></section>';
      $("#ek5").addEventListener("click", function () { ekstraYeni = 5; S = null; calisCiz(); });
      $("#ek10").addEventListener("click", function () { ekstraYeni = 10; S = null; calisCiz(); });
      $("#gTanim").addEventListener("click", function () { git("tanim"); });
      return;
    }
    var i = S.q[0], yon = yonu(i), x = M[i], s = st(i), yeniMi = !s, ust = { m: 0, y: 0, k: 0 };
    S.q.forEach(function (j) { var t = st(j); if (!t) ust.y++; else if (t.r === 0) ust.k++; else ust.m++; });
    var on, arka;
    if (yon === "kt") {
      on = basHTML(i, true) + '<div class="f-ipucu">Ne demek? Arapça açıklamasını hatırlamaya çalış, sonra dokun.</div>';
      arka = basHTML(i, false) + resimHTML(i) + '<hr class="f-cizgi">' + govdeHTML(i, S.tr) + ilgiliHTML(i);
    } else {
      on = '<div class="m-tanim" style="text-align:center">' + arMetin(x.t || x.m) + "</div>" + resimHTML(i) + '<div class="f-ipucu">Hangi kelime? Düşün, sonra dokun.</div>';
      arka = basHTML(i, true) + resimHTML(i) + '<hr class="f-cizgi">' + govdeHTML(i, S.tr) + ilgiliHTML(i);
    }
    if (S.acik && S.tr) arka = arka.replace('<hr class="f-cizgi">', '<div class="f-tr" style="text-align:center">' + esc(x.tr) + '</div><hr class="f-cizgi">');
    ana.innerHTML =
      '<div class="cal-ust"><div class="cubuk"><i style="width:' + (S.top ? (S.bitti / S.top * 100) : 0) + '%"></i></div>' +
      '<span class="sayac" title="tekrar · yeni · yeniden"><span class="m">' + ust.m + '</span> · <span class="y">' + ust.y + '</span> · <span class="k">' + ust.k + "</span></span></div>" +
      '<div class="fkart' + (S.acik ? " genis" : "") + '" id="fkart"><span class="etiket">s. ' + x.s + "</span><span class=\"etiket sag\">" +
      (yeniMi ? '<span class="durum yeni">yeni kelime</span>' : s.r === 0 ? '<span class="durum ogr">yeniden</span>' : '<span class="durum tek">tekrar</span>') + "</span>" +
      '<div style="width:100%;margin-top:14px">' + (S.acik ? arka + '<button class="btn kucuk tr-btn" id="trBtn" type="button">' + (S.tr ? "Türkçeyi gizle" : "Türkçesi") + "</button>" : on) + "</div></div>" +
      (S.acik ? '<div class="oy">' + [[1, "Bilmedim"], [2, "Zor"], [3, "Bildim"], [4, "Kolay"]].map(function (o) {
        return '<button type="button" class="o' + o[0] + '" data-q="' + o[0] + '">' + o[1] + "<small>" + gunYazi(sonraki(s, o[0])) + "</small></button>";
      }).join("") + "</div>" : '<button class="btn dolu buyuk goster-btn" id="goster" type="button">Cevabı göster</button>') +
      '<button class="btn bil-btn" id="bilBtn" type="button">✓ Bunu iyi biliyorum — bir daha gösterme</button>' +
      '<div class="ayarlar" style="margin-top:16px"><span class="ayar"><span class="lbl">Kartın ön yüzü</span>' +
      seg("yon", D.ay.yon, [["kt", "Kelime"], ["tk", "Arapça tanım"], ["karisik", "Karışık"]]) + "</span></div>" +
      '<p class="soluk kucuk">Kısayollar: <b>Boşluk</b> kartı çevirir, <b>1–4</b> puanlar, <b>T</b> Türkçeyi açar, <b>B</b> bir daha göstermez.</p>';
    function cevir() { if (!S.acik) { S.acik = true; calisCiz(); } }
    if (!S.acik) $("#fkart").addEventListener("click", cevir);
    var g = $("#goster"); if (g) g.addEventListener("click", cevir);
    var tb = $("#trBtn"); if (tb) tb.addEventListener("click", function () { S.tr = !S.tr; calisCiz(); });
    $$(".oy button").forEach(function (b) { b.addEventListener("click", function () { cevap(+b.getAttribute("data-q")); }); });
    $("#bilBtn").addEventListener("click", gosterme);
    segBagla(ana, function (a, v) { D.ay.yon = v; kaydet(); calisCiz(); });
    tus = function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!S.acik) cevir(); else cevap(3); }
      else if (S.acik && /^[1-4]$/.test(e.key)) cevap(+e.key);
      else if (S.acik && (e.key === "t" || e.key === "T")) { S.tr = !S.tr; calisCiz(); }
      else if (e.key === "b" || e.key === "B") gosterme();
    };
  }
  function gosterme() {
    var i = S.q.shift(), once = st(i) ? JSON.stringify(st(i)) : null, kuyruk = S.q.filter(function (x) { return x === i; }).length;
    S.q = S.q.filter(function (x) { return x !== i; });
    S.top -= kuyruk + 1;
    biliyorum(i, true); S.acik = false; S.tr = false; calisCiz();
    toast("“" + M[i].k + "” bir daha gösterilmeyecek.", function () {
      if (once) D.k[ID[i]] = JSON.parse(once); else delete D.k[ID[i]];
      kaydet(); S.q.unshift(i); S.top += 1 + kuyruk; if (aktif === "calis") calisCiz();
    });
  }
  function cevap(q) {
    var i = S.q.shift();
    puanla(i, q);
    if (q === 1) { S.tekrar[i] = 1; S.q.splice(Math.min(S.q.length, 3 + Math.floor(Math.random() * 3)), 0, i); }
    else { S.bitti++; if (!S.tekrar[i]) S.dogru++; }
    S.acik = false; S.tr = false;
    if (!S.q.length) konfeti();
    calisCiz();
  }

  // ---------- kaynak seçimi ----------
  var SAYFALAR = [];
  M.forEach(function (x) { if (SAYFALAR.indexOf(x.s) < 0) SAYFALAR.push(x.s); });
  var GRUP = 4, GSAY = Math.ceil(SAYFALAR.length / GRUP);
  function grupAd(g) { var a = SAYFALAR[g * GRUP], b = SAYFALAR[Math.min(SAYFALAR.length, (g + 1) * GRUP) - 1]; return a === b ? "s. " + a : "s. " + a + "–" + b; }
  function havuz(kosul) {
    var k = D.ay.kay, r = aralik(0, N);
    if (k === "sayfa") { var ss = SAYFALAR.slice(D.ay.ks * GRUP, (D.ay.ks + 1) * GRUP); r = r.filter(function (i) { return ss.indexOf(M[i].s) >= 0; }); }
    else if (k === "zor") r = r.filter(function (i) { var s = st(i); return s && !s.b && (s.l > 0 || s.e < 2.3 || s.r === 0); });
    else if (k === "yildiz") r = r.filter(function (i) { return D.f[ID[i]]; });
    else r = r.filter(function (i) { var s = st(i); return s && !s.b; });
    return kosul ? r.filter(kosul) : r;
  }
  function kaynakHTML() {
    return '<div class="ayarlar"><span class="ayar"><span class="lbl">Kelimeler</span>' +
      seg("kay", D.ay.kay, [["ogr", "Çalıştıklarım"], ["zor", "Zorlandıklarım"], ["yildiz", "★ Yıldızlılar"], ["sayfa", "Sayfalar"]]) + "</span>" +
      (D.ay.kay === "sayfa" ? '<select id="ks" aria-label="Sayfalar">' + aralik(0, GSAY).map(function (g) {
        return '<option value="' + g + '"' + (g === D.ay.ks ? " selected" : "") + ">" + grupAd(g) + "</option>";
      }).join("") + "</select>" : "") + "</div>";
  }
  function kaynakBagla(yeniden) {
    var ks = $("#ks"); if (ks) ks.addEventListener("change", function () { D.ay.ks = +this.value; kaydet(); yeniden(); });
  }
  function havuzBos(baslik, n) {
    var m = { ogr: "Henüz kartlarla çalıştığın kelime yok. Önce Kartlar bölümünde birkaç kelime öğren ya da “Sayfalar”ı seç.",
      zor: "Zorlandığın kelime yok — harika! Başka bir kaynak seç.", yildiz: "Yıldızlı kelimen yok. Sözlük'te kelimelerin yanındaki ☆ işaretine dokunarak ekleyebilirsin.",
      sayfa: "Bu sayfalarda uygun madde yok." }[D.ay.kay];
    return '<section class="kart"><h2>' + baslik + "</h2>" + kaynakHTML() + '<p class="not">' + m + " (En az " + (n || 4) + " kelime gerekli.)</p></section>";
  }
  // aynı türden (fiil / isim) ve yakın sayfalardan çeldirici
  function celdirici(i, n, uygun, anahtar) {
    var hedef = anahtar(i), gor = {}, aday = [], fi = fiilMi(i);
    gor[hedef] = 1;
    aralik(0, N).forEach(function (j) { if (j !== i && uygun(j)) aday.push(j); });
    aday.sort(function (a, b) { return ((fiilMi(a) !== fi) - (fiilMi(b) !== fi)) || (Math.abs(a - i) - Math.abs(b - i)) + (Math.random() - .5) * 30; });
    var r = [];
    for (var k = 0; k < aday.length && r.length < n; k++) { var a = anahtar(aday[k]); if (!a || gor[a]) continue; gor[a] = 1; r.push(aday[k]); }
    return r;
  }
  function soruUst(Q) {
    return '<div class="cal-ust"><div class="cubuk"><i style="width:' + (Q.n / Q.s.length * 100) + '%"></i></div><span class="sayac">' + (Q.n + 1) + " / " + Q.s.length + " · ✓ " + Q.d + "</span></div>";
  }
  function sonucHTML(Q, ikon) {
    var top = Q.s.length, yuzde = top ? Math.round(Q.d / top * 100) : 0;
    if (yuzde >= 80 && top) konfeti();
    return '<section class="kart bitti"><div class="buyuk-ikon">' + (yuzde >= 80 ? "🏆" : yuzde >= 50 ? "👍" : ikon) + "</div><h2>" + Q.d + " / " + top + " doğru</h2>" +
      '<p class="aciklama">%' + yuzde + (yuzde >= 80 ? " — çok iyi!" : yuzde >= 50 ? " — fena değil." : " — bu kelimeleri kartlarla tekrar et.") + "</p>" +
      '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="qYeni" type="button">Yeni tur</button>' +
      (Q.yanlis.length ? '<button class="btn" id="qYanlis" type="button">Yanlışları yeniden sor</button>' : "") + "</div>" +
      (Q.yanlis.length ? '<div class="sonuc-liste" style="text-align:start">' + Q.yanlis.map(function (i) {
        return '<div class="r"><span class="ar">' + esc(M[i].k) + '</span><span class="t"><span class="ar" style="font-size:1.15rem">' + esc(kisaTanim(i)) + "</span><br><span class=\"soluk\">" + esc(M[i].tr) + "</span></span></div>";
      }).join("") + "</div>" : "") + "</section>";
  }
  // dört seçenekli ortak soru akışı
  function secmeli(Q, ciz, cevapAnahtar, secenekHTML, secenekSinif, sonrakiCiz, bittiCiz) {
    if (Q.n >= Q.s.length) return bittiCiz();
    var i = Q.s[Q.n];
    if (!Q.sec) Q.sec = karistir(celdirici(i, 3, Q.uygun, cevapAnahtar).concat([i]));
    ana.innerHTML = soruUst(Q) + '<section class="kart"><div class="soru-kutu">' + ciz(i, Q) + "</div>" +
      '<div class="secenekler">' + Q.sec.map(function (j, n) {
        return '<button type="button" class="sec ' + secenekSinif + '" data-j="' + j + '"><span class="kisayol">' + (n + 1) + "</span>" + secenekHTML(j) + "</button>";
      }).join("") + '</div><div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center">' +
      '<button class="btn" id="qTr" type="button">Türkçe yardım</button><button class="btn dolu" id="qSon" type="button" hidden>Sonraki →</button></div></section>' +
      '<button class="btn kucuk" id="qBirak" type="button">Bitir</button>';
    var bitti = false;
    function sec(b) {
      if (bitti) return; bitti = true;
      var j = +b.getAttribute("data-j"), ok = j === i;
      $$(".sec").forEach(function (x) { x.disabled = true; if (+x.getAttribute("data-j") === i) x.classList.add("dogru"); });
      if (ok) { Q.d++; $("#gb").className = "geri-bildirim iyi"; $("#gb").innerHTML = "Doğru! ✓ <span class=\"soluk\">" + esc(M[i].k) + " = " + esc(M[i].tr) + "</span>"; }
      else {
        b.classList.add("yanlis"); Q.yanlis.push(i); tekrarlaBugun(i);
        $("#gb").className = "geri-bildirim kotu"; $("#gb").innerHTML = 'Doğrusu: <span class="ar" style="font-size:1.3rem">' + esc(M[i].k) + "</span> = " + esc(M[i].tr);
      }
      $("#qTr").hidden = true; $("#qSon").hidden = false; $("#qSon").focus();
      if (ok) setTimeout(function () { if (Q.s[Q.n] === i && bitti && aktif === Q.sekme) ileri(); }, 1100);
    }
    function ileri() { Q.n++; Q.sec = null; Q.trAcik = false; sonrakiCiz(); }
    $$(".sec").forEach(function (b) { b.addEventListener("click", function () { sec(b); }); });
    $("#qSon").addEventListener("click", ileri);
    $("#qTr").addEventListener("click", function () { Q.trAcik = true; var y = $("#yardim"); if (y) y.hidden = false; this.hidden = true; });
    $("#qBirak").addEventListener("click", function () { Q.s = Q.s.slice(0, Q.n); bittiCiz(); });
    tus = function (e) {
      if (/^[1-4]$/.test(e.key) && !bitti) sec($$(".sec")[+e.key - 1]);
      else if (e.key === "Enter" && bitti) { e.preventDefault(); ileri(); }
    };
  }
  function sonucBagla(Q, yeniden, tekrar) {
    $("#qYeni").addEventListener("click", yeniden);
    var y = $("#qYanlis"); if (y) y.addEventListener("click", function () { tekrar(karistir(Q.yanlis.slice())); });
    tus = function (e) { if (e.key === "Enter") $("#qYeni").click(); };
  }
  function girisHTML(baslik, aciklama, ek, n) {
    return '<section class="kart"><h2>' + baslik + '</h2><p class="aciklama">' + aciklama + "</p>" + kaynakHTML() + ek +
      '<div class="ayarlar"><span class="ayar"><span class="lbl">Soru</span>' + seg("tsay", D.ay.tsay, [[10, "10"], [20, "20"], [50, "50"]]) + "</span></div>" +
      '<p class="soluk kucuk">Bu kaynakta ' + n + ' uygun kelime var.</p><button class="btn dolu buyuk" id="qBasla" type="button">Başla</button></section>';
  }

  // ---------- TANIMDAN BUL ----------
  var T = null;
  function tanimUygun(i) { return D.ay.tsoru === "resim" ? !!M[i].r : D.ay.tsoru === "karisik" ? true : !!(M[i].t || M[i].m); }
  function tanimCiz() {
    var h = havuz(tanimUygun);
    var segler = function (a, v) { if (a === "kay") D.ay.kay = v; else if (a === "tsoru") D.ay.tsoru = v; else D.ay.tsay = +v; kaydet(); T = null; tanimCiz(); };
    if (h.length < 4) { ana.innerHTML = havuzBos("Tanımdan bul"); segBagla(ana, segler); kaynakBagla(tanimCiz); return; }
    if (!T) {
      ana.innerHTML = girisHTML("Tanımdan bul", "Sözlüğün Arapça açıklamasını ya da kitaptaki resmi gör, dört kelimeden doğrusunu seç. Takılırsan “Türkçe yardım” açıklamanın Türkçesini gösterir.",
        '<div class="ayarlar"><span class="ayar"><span class="lbl">Soru</span>' + seg("tsoru", D.ay.tsoru, [["tanim", "Arapça tanım"], ["resim", "Resim"], ["karisik", "Karışık"]]) + "</span></div>", h.length);
      segBagla(ana, segler); kaynakBagla(tanimCiz);
      $("#qBasla").addEventListener("click", function () { T = { s: karistir(h.slice()).slice(0, D.ay.tsay), n: 0, d: 0, yanlis: [], uygun: function () { return true; }, sekme: "tanim" }; tanimSoru(); });
      tus = function (e) { if (e.key === "Enter") $("#qBasla").click(); };
      return;
    }
    tanimSoru();
  }
  function tanimSoru() {
    secmeli(T, function (i, Q) {
      var x = M[i], resimli = D.ay.tsoru === "resim" || (D.ay.tsoru === "karisik" && x.r && (i % 3 === 0 || !(x.t || x.m)));
      if (Q.tip == null || Q.tipI !== i) { Q.tip = resimli ? "resim" : "tanim"; Q.tipI = i; }
      if (Q.tip === "resim") return '<p class="soluk kucuk" style="margin:0 0 6px">Bu resim hangi kelime?</p>' + resimHTML(i, "soru-resim") +
        '<div class="yardim" id="yardim" hidden>' + esc(x.tr) + "</div>";
      return '<p class="soluk kucuk" style="margin:0 0 6px">Bu açıklama hangi kelimenin?</p><div class="soru-tanim">' + arMetin(x.t || x.m) + "</div>" +
        '<div class="yardim" id="yardim" hidden>' + esc(x.ttr || x.tr) + "</div>";
    }, function (j) { return arNorm(M[j].k); }, function (j) { return esc(M[j].k); }, "ar", tanimSoru, function () {
      ana.innerHTML = sonucHTML(T, "💪");
      var Q = T;
      sonucBagla(Q, function () { T = null; tanimCiz(); }, function (s) { T = { s: s, n: 0, d: 0, yanlis: [], uygun: Q.uygun, sekme: "tanim" }; tanimSoru(); });
    });
  }

  // ---------- BOŞLUK DOLDUR ----------
  var B = null;
  function boslukUygun(i) { var b = M[i].b; return !!(b && b[0] && b[1] && b[0].indexOf(b[1]) >= 0); }
  function boslukCiz() {
    var h = havuz(boslukUygun);
    var segler = function (a, v) { if (a === "kay") D.ay.kay = v; else D.ay.tsay = +v; kaydet(); B = null; boslukCiz(); };
    if (h.length < 4) { ana.innerHTML = havuzBos("Boşluk doldur"); segBagla(ana, segler); kaynakBagla(boslukCiz); return; }
    if (!B) {
      ana.innerHTML = girisHTML("Boşluk doldur", "Kitaptaki örnek cümlede bir kelime eksik. Cümleyi oku, doğru kelimeyi seç.", "", h.length);
      segBagla(ana, segler); kaynakBagla(boslukCiz);
      $("#qBasla").addEventListener("click", function () { B = { s: karistir(h.slice()).slice(0, D.ay.tsay), n: 0, d: 0, yanlis: [], uygun: boslukUygun, sekme: "bosluk" }; boslukSoru(); });
      tus = function (e) { if (e.key === "Enter") $("#qBasla").click(); };
      return;
    }
    boslukSoru();
  }
  function boslukSoru() {
    secmeli(B, function (i) {
      var b = M[i].b, n = b[0].indexOf(b[1]), on = b[0].slice(0, n), son = b[0].slice(n + b[1].length);
      var otrN = (M[i].o || []).indexOf(b[0]), tr = otrN >= 0 && M[i].otr ? M[i].otr[otrN] : "";
      return '<div class="soru-tanim">' + arMetin(on) + '<span class="bosluk-yer">…</span>' + arMetin(son) + "</div>" +
        '<div class="yardim" id="yardim" hidden>' + esc(tr || M[i].tr) + "</div>";
    }, function (j) { return arNorm(M[j].b[1]); }, function (j) { return esc(M[j].b[1]); }, "ar", boslukSoru, function () {
      ana.innerHTML = sonucHTML(B, "✍️");
      var Q = B;
      sonucBagla(Q, function () { B = null; boslukCiz(); }, function (s) { B = { s: s, n: 0, d: 0, yanlis: [], uygun: boslukUygun, sekme: "bosluk" }; boslukSoru(); });
    });
  }

  // ---------- EŞLEŞTİR ----------
  var E = null;
  function esleCiz() {
    var h = havuz(function (i) { return !!kisaTanim(i); });
    var segler = function (a, v) { if (a === "kay") D.ay.kay = v; else D.ay.esle = v; kaydet(); E = null; esleCiz(); };
    if (h.length < 4) { ana.innerHTML = havuzBos("Eşleştir"); segBagla(ana, segler); kaynakBagla(function () { E = null; esleCiz(); }); return; }
    var tur = D.ay.esle || "tanim";
    if (!E) {
      var sec = karistir(h.slice()), gor = {}, ciftler = [];
      sec.forEach(function (i) { if (ciftler.length >= 5) return; var k = tur === "tr" ? trNorm(M[i].tr) : arNorm(kisaTanim(i)); if (!gor[k]) { gor[k] = 1; ciftler.push(i); } });
      E = { sol: karistir(ciftler.slice()), sag: karistir(ciftler.slice()), kalan: ciftler.length, hata: 0, t0: Date.now() };
    }
    ana.innerHTML = '<section class="kart"><h2>Eşleştir</h2><p class="aciklama">Bir kelimeye, sonra onun açıklamasına dokun.</p>' + kaynakHTML() +
      '<div class="ayarlar"><span class="ayar"><span class="lbl">Eşi</span>' + seg("esle", tur, [["tanim", "Arapça açıklama"], ["tr", "Türkçe anlam"]]) + "</span></div>" +
      '<div class="esle"><div class="sutun">' + E.sol.map(function (i) { return '<button type="button" class="ek ar" data-y="a" data-i="' + i + '">' + esc(M[i].k) + "</button>"; }).join("") +
      '</div><div class="sutun">' + E.sag.map(function (i) {
        return '<button type="button" class="ek' + (tur === "tr" ? "" : " ar") + '" data-y="t" data-i="' + i + '"' + (tur === "tr" ? "" : ' style="font-size:1.15rem"') + ">" + esc(tur === "tr" ? M[i].tr : kisaTanim(i)) + "</button>";
      }).join("") + '</div></div><div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center"><button class="btn" id="eYeni" type="button">Yeni tur</button></div></section>';
    segBagla(ana, segler);
    kaynakBagla(function () { E = null; esleCiz(); });
    $("#eYeni").addEventListener("click", function () { E = null; esleCiz(); });
    var secili = null;
    $$(".ek").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.classList.contains("tamam") || !E) return;
        if (!secili || secili.getAttribute("data-y") === b.getAttribute("data-y")) {
          if (secili) secili.classList.remove("secili");
          secili = b; b.classList.add("secili");
          return;
        }
        if (secili.getAttribute("data-i") === b.getAttribute("data-i")) {
          secili.classList.add("tamam"); b.classList.add("tamam"); secili.classList.remove("secili"); secili = null;
          if (--E.kalan === 0) {
            var sn = Math.round((Date.now() - E.t0) / 1000);
            $("#gb").className = "geri-bildirim iyi"; $("#gb").textContent = "Tebrikler! " + sn + " saniye, " + E.hata + " hata.";
            konfeti(); E = null;
          }
        } else {
          E.hata++;
          var a = secili, c = b; a.classList.add("hata"); c.classList.add("hata");
          setTimeout(function () { a.classList.remove("hata", "secili"); c.classList.remove("hata"); }, 450);
          secili = null;
        }
      });
    });
  }

  // ---------- SÖZLÜK ----------
  var L = { ara: "", filtre: "hepsi", acik: {}, tr: {} };
  function maddeHTML(i) {
    var x = M[i], ac = L.acik[i], b = st(i) && st(i).b;
    return '<div class="madde" data-m="' + i + '"><div class="madde-ust" data-ac="' + i + '"><span class="ar">' + esc(x.k) + '</span><span class="tr">' + esc(x.tr) + "</span>" +
      '<span class="yan"><button type="button" class="yildiz' + (D.f[ID[i]] ? " acik" : "") + '" data-yildiz="' + i + '" aria-label="Yıldızla">' + (D.f[ID[i]] ? "★" : "☆") + "</button>" + durumHTML(i) + "</span></div>" +
      (ac ? '<div class="madde-ic">' + (x.c ? '<div class="m-cogul">ج: ' + esc(x.c) + "</div>" : "") + resimHTML(i) +
        '<div class="m-metin">' + arMetin(x.m || x.t) + "</div>" +
        (L.tr[i] ? '<div class="m-tr"><b>' + esc(x.tr) + "</b>" + (x.ttr ? " — " + esc(x.ttr) : "") + "</div>" + (x.otr || []).map(function (o, n) { return '<div class="m-tr">' + esc((x.o || [])[n] ? "“" + o + "”" : o) + "</div>"; }).join("") : "") +
        ilgiliHTML(i) + '<div class="satir-btn" style="margin-top:8px">' + dinleBtn(i) +
        '<button class="btn kucuk" type="button" data-trac="' + i + '">' + (L.tr[i] ? "Türkçeyi gizle" : "Türkçesi") + "</button>" +
        '<button type="button" class="bil-kucuk" data-bil="' + i + '">' + (b ? "↺ yeniden çalış" : "✓ biliyorum") + "</button></div></div>" : "") + "</div>";
  }
  function sozlukCiz() {
    ana.innerHTML = '<section class="kart"><h2>Sözlük</h2><p class="aciklama">Maddeler kitaptaki sırayla. Bir maddeye dokununca açıklaması, örnekleri ve resmi açılır.</p>' +
      '<div class="arama"><input type="search" id="ara" placeholder="Ara: بحر, deniz…" value="' + esc(L.ara) + '" aria-label="Ara"></div>' +
      '<div class="ayarlar"><span class="ayar">' + seg("filtre", L.filtre, [["hepsi", "Hepsi"], ["yeni", "Yeni"], ["ogr", "Öğreniliyor"], ["tamam", "Öğrenildi"], ["bil", "Biliyorum"], ["yildiz", "★"]]) + "</span></div>" +
      (YON.length ? '<details class="kucuk" style="margin-bottom:8px"><summary>Yönlendirme maddeleri (' + YON.length + ")</summary>" + YON.map(function (y) {
        return '<div class="r" style="padding:3px 0"><span class="ar" style="font-size:1.2rem">' + esc(y[0]) + "</span> — " + esc(y[1]) + ' <span class="ar" style="font-size:1.2rem">' + esc(y[2]) + '</span> <span class="soluk">' + esc(y[3] || "") + "</span></div>";
      }).join("") + "</details>" : "") +
      '<div id="liste"></div></section>';
    listeDoldur();
    var ara = $("#ara"), z;
    ara.addEventListener("input", function () { clearTimeout(z); z = setTimeout(function () { L.ara = ara.value.trim(); listeDoldur(); }, 200); });
    segBagla(ana, function (a, v) { L.filtre = v; $$('[data-seg="filtre"] button').forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-v") === v); }); listeDoldur(); });
  }
  function listeDoldur() {
    var q = L.ara, aq = arNorm(q), tq = trNorm(q), arMi = /[؀-ۿ]/.test(q), f = L.filtre;
    var r = aralik(0, N).filter(function (i) {
      if (q) {
        var x = M[i];
        if (arMi ? (arNorm(x.k).indexOf(aq) < 0 && arNorm(x.c).indexOf(aq) < 0 && arNorm(x.m).indexOf(aq) < 0) : (trNorm(x.tr).indexOf(tq) < 0 && trNorm(x.ttr).indexOf(tq) < 0)) return false;
      }
      return f === "hepsi" ? true : f === "yildiz" ? D.f[ID[i]] : durum(i) === f;
    });
    var h = "", son = null;
    r.forEach(function (i) { if (M[i].s !== son) { son = M[i].s; h += '<div class="sayfa-bas">Sayfa ' + son + "</div>"; } h += maddeHTML(i); });
    $("#liste").innerHTML = h || '<p class="soluk">Sonuç yok.</p>';
  }
  function maddeYenile(i) {
    var el = $('.madde[data-m="' + i + '"]'); if (!el) return;
    var d = document.createElement("div"); d.innerHTML = maddeHTML(i); el.replaceWith(d.firstChild);
  }
  ana.addEventListener("click", function (e) {
    var y = e.target.closest("[data-yildiz]");
    if (y) {
      var i = +y.getAttribute("data-yildiz");
      if (D.f[ID[i]]) delete D.f[ID[i]]; else D.f[ID[i]] = 1;
      kaydet(); y.classList.toggle("acik", !!D.f[ID[i]]); y.textContent = D.f[ID[i]] ? "★" : "☆";
      return;
    }
    var bb = e.target.closest("[data-bil]");
    if (bb) {
      var bi = +bb.getAttribute("data-bil"), ac = !(st(bi) && st(bi).b);
      biliyorum(bi, ac); S = null; maddeYenile(bi);
      toast(ac ? "Bu kelime bir daha gösterilmeyecek." : "Kelime yeniden çalışma listesinde.");
      return;
    }
    var t = e.target.closest("[data-trac]");
    if (t) { var ti = +t.getAttribute("data-trac"); L.tr[ti] = !L.tr[ti]; maddeYenile(ti); return; }
    var a = e.target.closest("[data-ac]");
    if (a && !e.target.closest("button")) { var ai = +a.getAttribute("data-ac"); L.acik[ai] = !L.acik[ai]; maddeYenile(ai); }
  });

  // ---------- LEVHALAR ----------
  var LT = null;
  function levhaCiz() {
    ana.innerHTML = LEVHA.map(function (l, n) {
      return '<section class="kart"><h2 class="ar" style="text-align:right">' + esc(l.b) + "</h2>" + (l.tr ? '<p class="aciklama">' + esc(l.tr) + "</p>" : "") +
        l.r.map(function (r) { return RESIM[r] ? '<div class="levha-kap"><img class="levha-resim" src="' + RESIM[r] + '" alt="" title="Büyütmek için dokun"></div>' : ""; }).join("") +
        '<p class="soluk kucuk">Resme dokununca büyür. Bir etikete dokun, Türkçesi görünsün.</p><div class="etiketler">' + l.e.map(function (x, k) {
          return '<button type="button" class="etiket-cip" data-lv="' + n + "-" + k + '"><span class="ar">' + esc(x[0]) + "</span><small></small></button>";
        }).join("") + '</div><div class="satir-btn" style="margin-top:12px"><button class="btn dolu" type="button" data-lvtest="' + n + '">Bu levhadan test</button></div></section>';
    }).join("");
    $$("[data-lv]").forEach(function (b) {
      b.addEventListener("click", function () { var p = b.getAttribute("data-lv").split("-"), x = LEVHA[+p[0]].e[+p[1]], s = $("small", b); s.textContent = s.textContent ? "" : x[1]; });
    });
    $$(".levha-resim").forEach(function (im) { im.addEventListener("click", function () { im.classList.toggle("buyuk"); }); });
    $$("[data-lvtest]").forEach(function (b) { b.addEventListener("click", function () { levhaTest(+b.getAttribute("data-lvtest")); }); });
  }
  function levhaTest(n) {
    var e = LEVHA[n].e;
    LT = { n: n, s: karistir(aralik(0, e.length)).slice(0, 15), k: 0, d: 0 };
    levhaSoru();
  }
  function levhaSoru() {
    var e = LEVHA[LT.n].e;
    if (LT.k >= LT.s.length) {
      if (LT.d / LT.s.length >= .8) konfeti();
      ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">🧍</div><h2>' + LT.d + " / " + LT.s.length + ' doğru</h2><div class="satir-btn" style="justify-content:center">' +
        '<button class="btn dolu" id="lvYeni" type="button">Yeniden</button><button class="btn" id="lvDon" type="button">Levhaya dön</button></div></section>';
      $("#lvYeni").addEventListener("click", function () { levhaTest(LT.n); });
      $("#lvDon").addEventListener("click", levhaCiz);
      return;
    }
    var i = LT.s[LT.k], gor = {}, sec = [i];
    gor[e[i][1]] = 1;
    karistir(aralik(0, e.length)).forEach(function (j) { if (sec.length < 4 && !gor[e[j][1]]) { gor[e[j][1]] = 1; sec.push(j); } });
    karistir(sec);
    ana.innerHTML = '<div class="cal-ust"><div class="cubuk"><i style="width:' + (LT.k / LT.s.length * 100) + '%"></i></div><span class="sayac">' + (LT.k + 1) + " / " + LT.s.length + "</span></div>" +
      '<section class="kart"><div class="soru-kutu"><div class="soru-ar ar">' + esc(e[i][0]) + '</div></div><div class="secenekler">' + sec.map(function (j, k) {
        return '<button type="button" class="sec" data-j="' + j + '"><span class="kisayol">' + (k + 1) + "</span>" + esc(e[j][1]) + "</button>";
      }).join("") + '</div><div class="geri-bildirim" id="gb"></div></section>';
    var bitti = false;
    function sec1(b) {
      if (bitti) return; bitti = true;
      var ok = +b.getAttribute("data-j") === i;
      $$(".sec").forEach(function (x) { x.disabled = true; if (+x.getAttribute("data-j") === i) x.classList.add("dogru"); });
      if (ok) LT.d++; else b.classList.add("yanlis");
      setTimeout(function () { LT.k++; if (aktif === "levha") levhaSoru(); }, ok ? 700 : 1500);
    }
    $$(".sec").forEach(function (b) { b.addEventListener("click", function () { sec1(b); }); });
    tus = function (ev) { if (/^[1-4]$/.test(ev.key)) sec1($$(".sec")[+ev.key - 1]); };
  }

  // ---------- İSTATİSTİK ----------
  function istCiz() {
    var c = sayilar(), t = bugun(), gecmis = [], ileri = [], tops = 0, dogru = 0;
    for (var g in D.gun) { tops += D.gun[g].t; dogru += D.gun[g].d; }
    for (var j = 13; j >= 0; j--) { var gk = D.gun[t - j]; gecmis.push([t - j, gk ? gk.t : 0]); }
    for (j = 0; j < 7; j++) ileri.push([t + j, 0]);
    for (var i = 0; i < N; i++) { var s = st(i); if (!s || s.b) continue; var fark = Math.max(0, s.d - t); if (fark < 7) ileri[fark][1]++; }
    var gmax = Math.max.apply(null, gecmis.map(function (x) { return x[1]; }).concat([1]));
    var imax = Math.max.apply(null, ileri.map(function (x) { return x[1]; }).concat([1]));
    var GUN = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];
    function gunAd(n) { return GUN[new Date(n * 86400000).getUTCDay()]; }
    ana.innerHTML =
      '<section class="kart"><h2>Özet</h2><div class="hero" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr))">' +
      '<div class="sayi yeni"><b>' + c.tamam + '</b><span>öğrenildi</span></div><div class="sayi tekrar"><b>' + c.bil + '</b><span>biliyorum</span></div><div class="sayi seri"><b>' + c.ogr + '</b><span>öğreniliyor</span></div>' +
      '<div class="sayi"><b>' + (tops ? Math.round(dogru / tops * 100) : 0) + '%</b><span>başarı</span></div>' +
      '<div class="sayi seri"><b>' + seri() + '</b><span>gün seri 🔥</span></div></div>' +
      '<p class="soluk kucuk">“Öğrenildi”: bir sonraki tekrarı en az 3 hafta sonra olan kelime.</p></section>' +
      '<section class="kart ikili"><div><h3>Son 14 gün</h3><div class="grafik">' + gecmis.map(function (x) {
        return '<div class="s"><b>' + (x[1] || "") + '</b><i style="height:' + (x[1] / gmax * 85) + '%"></i><small>' + gunAd(x[0]) + "</small></div>";
      }).join("") + '</div></div><div><h3>Önümüzdeki 7 gün tekrar</h3><div class="grafik">' + ileri.map(function (x, n) {
        return '<div class="s ileri"><b>' + (x[1] || "") + '</b><i style="height:' + (x[1] / imax * 85) + '%"></i><small>' + (n ? gunAd(x[0]) : "bugün") + "</small></div>";
      }).join("") + "</div></div></section>" +
      '<section class="kart"><h2>Ayarlar</h2><div class="ayarlar"><span class="ayar"><span class="lbl">Günlük yeni kelime</span>' +
      seg("yeni", D.ay.yeni, [[5, "5"], [10, "10"], [15, "15"], [20, "20"], [30, "30"]]) + "</span></div>" +
      (arSes ? '<p class="soluk kucuk">🔊 Cihazında Arapça ses bulundu; kartlarda dinleme düğmesi görünür.</p>' : '<p class="soluk kucuk">Cihazında Arapça okuma sesi bulunamadı, bu yüzden dinleme düğmesi gizli.</p>') + "</section>" +
      '<section class="kart"><h2>Yedek</h2><p class="aciklama">İlerlemen yalnızca bu tarayıcıda durur. Ara sıra yedek al; yedeği başka bir cihazda “Yedeği yükle” ile açabilirsin. Sözlüğe yeni sayfalar eklendiğinde de ilerlemen korunur.</p>' +
      (depoVar ? "" : '<p class="not"><b>Dikkat:</b> Bu tarayıcı kayıt yapmaya izin vermiyor. Sayfayı kapatınca ilerleme kaybolur; mutlaka yedek al.</p>') +
      '<div class="satir-btn"><button class="btn dolu" id="yedekAl" type="button">Yedek al (dosya indir)</button>' +
      '<label class="btn" for="yedekDosya" style="display:inline-block">Yedeği yükle</label><input type="file" id="yedekDosya" accept=".json,application/json" hidden>' +
      '<button class="btn" id="sifirla" type="button" style="margin-inline-start:auto;color:var(--yanlis)">Her şeyi sıfırla</button></div></section>';
    segBagla(ana, function (a, v) { D.ay.yeni = +v; kaydet(); S = null; istCiz(); toast("Günde " + v + " yeni kelime."); });
    $("#yedekAl").addEventListener("click", function () {
      var d = new Date(), veri = JSON.stringify(D);
      var ad = "sozluk-defteri-yedek-" + d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";
      function tarayici() {
        var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([veri], { type: "application/json" })); a.download = ad;
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
        toast("Yedek indirildi.");
      }
      // claude.ai sayfasında indirme izin penceresiyle yapılır; tek dosya sürümünde doğrudan indirilir
      if (!(window.claude && window.claude.use)) return tarayici();
      window.claude.use("downloads").then(function (dl) {
        if (!dl) return tarayici();
        dl.save({ filename: ad, data: veri }).then(function () { toast("Yedek kaydedildi."); }, function (e) {
          toast(e && e.code === "declined" ? "Yedek kaydedilmedi." : "Burada indirme yapılamıyor; programı dosya olarak açıp yedek al.");
        });
      }, tarayici);
    });
    $("#yedekDosya").addEventListener("change", function () {
      var f = this.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var o = JSON.parse(r.result);
          if (!o || typeof o.k !== "object") throw 0;
          var d = bos(); for (var k in o) if (k !== "ay") d[k] = o[k]; for (var a in o.ay) d.ay[a] = o.ay[a];
          D = d; kaydet(); temaUygula(); seriGuncelle(); S = null; T = null; B = null; E = null; istCiz(); toast("Yedek yüklendi: " + Object.keys(D.k).length + " kelime.");
        } catch (e) { toast("Bu dosya geçerli bir yedek değil."); }
      };
      r.readAsText(f);
    });
    $("#sifirla").addEventListener("click", function () {
      onayli(this, "Bütün ilerleme silinecek, geri alınamaz — eminim, sil", function () {
        var tema = D.ay.tema; D = bos(); D.ay.tema = tema; kaydet(); seriGuncelle(); S = null; T = null; B = null; E = null; istCiz(); toast("Sıfırlandı.");
      });
    });
  }

  git("bugun");
})();
