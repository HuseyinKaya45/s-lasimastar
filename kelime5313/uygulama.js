(function () {
  "use strict";
  var N = K.length, PAKET = 100, PSAY = Math.ceil(N / PAKET);
  var ANAHTAR = "kelimeDefteri5313";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ana = $("#ana");

  // ---------- yardımcılar ----------
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bugun() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
  function karistir(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function aralik(a, b) { var r = []; for (var i = a; i < b; i++) r.push(i); return r; }
  function paketAd(p) { return (p * PAKET + 1) + "–" + Math.min(N, (p + 1) * PAKET); }
  function arParca(i) { var p = K[i][0].split(/،\s*/); return { ana: p[0], ek: p.slice(1).join("، ") }; }
  function kisa(tr) { var p = tr.split(/;\s*/); return p.slice(0, 2).join("; "); }
  function arNorm(s) { return s.replace(/[ً-ٰٟـ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي"); }
  function trNorm(s) {
    return s.toLocaleLowerCase("tr").replace(/[â]/g, "a").replace(/[îı]/g, "i").replace(/[û]/g, "u").replace(/ş/g, "s").replace(/ç/g, "c")
      .replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ü/g, "u").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }
  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, d = aralik(0, n + 1);
    for (var i = 1; i <= m; i++) {
      var on = d[0]; d[0] = i;
      for (var j = 1; j <= n; j++) { var t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, on + (a[i - 1] === b[j - 1] ? 0 : 1)); on = t; }
    }
    return d[n];
  }
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

  // ---------- kayıt ----------
  var depoVar = true;
  function bos() { return { v: 1, k: {}, f: {}, gun: {}, yb: { g: 0, n: 0 }, ay: { yeni: 20, yon: "ar", en: true, bas: 0, tema: null, kay: "ogr", kp: 0, gizle: false } }; }
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

  function durum(i) { var s = D.k[i]; if (!s) return "yeni"; if (s.b) return "bil"; if (s.i >= 21) return "tamam"; return "ogr"; }
  var DURUM_AD = { yeni: "yeni", ogr: "öğreniliyor", tamam: "öğrenildi", bil: "biliyorum" };
  // "Bir daha gösterme": kelime bilinen sayılır, kartlarda ve tekrarlarda bir daha çıkmaz
  function biliyorum(i, ac) {
    var s = D.k[i];
    if (ac) { if (s) s.b = 1; else D.k[i] = { r: 0, i: 0, e: 2.5, d: bugun(), l: 0, g: 0, b: 1 }; }
    else if (s) { delete s.b; if (!s.g) delete D.k[i]; }
    kaydet();
  }
  function durumHTML(i) { var d = durum(i); return '<span class="durum ' + d + '">' + DURUM_AD[d] + "</span>"; }
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
    for (var k in D.k) if (D.k[k].d <= t && !D.k[k].b) r.push(+k);
    r.sort(function (a, b) { return (D.k[a].d - D.k[b].d) || (a - b); });
    return r;
  }
  function siradakiYeniler(n, haric) {
    var r = [], h = haric || {};
    for (var j = 0; j < N && r.length < n; j++) { var i = (D.ay.bas + j) % N; if (!D.k[i] && !h[i]) r.push(i); }
    return r;
  }
  function sayilar() {
    var c = { yeni: N, ogr: 0, tamam: 0, bil: 0 };
    for (var k in D.k) { c.yeni--; c[durum(+k)]++; }
    return c;
  }

  // ---------- aralıklı tekrar (SM-2'ye yakın) ----------
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
    var t = bugun(), gk = gunKayit(), s = D.k[i];
    if (!s) {
      s = D.k[i] = { r: 0, i: 0, e: 2.5, d: t, l: 0, g: 0 };
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

  // ---------- sesli okuma (cihazda Arapça ses varsa) ----------
  var arSes = null;
  function sesBul() {
    try {
      var v = speechSynthesis.getVoices().filter(function (x) { return /^ar/i.test(x.lang); });
      arSes = v.length ? v[0] : null;
    } catch (e) { arSes = null; }
  }
  if (window.speechSynthesis) { sesBul(); try { speechSynthesis.onvoiceschanged = function () { sesBul(); }; } catch (e) {} }
  function oku(i) {
    if (!arSes) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(K[i][0].replace(/[\/…]/g, "، ")); u.voice = arSes; u.lang = arSes.lang; u.rate = .8; speechSynthesis.speak(u); } catch (e) {}
  }
  function dinleBtn(i) { return arSes ? '<button class="dinle" type="button" data-oku="' + i + '" title="Dinle">🔊</button>' : ""; }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-oku]"); if (b) { e.stopPropagation(); oku(+b.getAttribute("data-oku")); }
  }, true);

  // ---------- tema, seri ----------
  function temaUygula() { if (D.ay.tema) document.documentElement.setAttribute("data-theme", D.ay.tema); else document.documentElement.removeAttribute("data-theme"); }
  function koyuMu() { return D.ay.tema ? D.ay.tema === "dark" : window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches; }
  $("#temaBtn").addEventListener("click", function () { D.ay.tema = koyuMu() ? "light" : "dark"; temaUygula(); kaydet(); $("#temaBtn").textContent = koyuMu() ? "☀" : "☾"; });
  function seriGuncelle() { $("#seriRozet").textContent = "🔥 " + seri(); }
  temaUygula(); $("#temaBtn").textContent = koyuMu() ? "☀" : "☾"; seriGuncelle();

  // ---------- sekmeler ----------
  var SEKME = [["bugun", "Bugün"], ["calis", "Kartlar"], ["test", "Test"], ["yaz", "Yazma"], ["esle", "Eşleştir"], ["liste", "Liste"], ["ist", "İstatistik"]];
  var aktif = "bugun", tus = null;
  $("#sekmeler").innerHTML = SEKME.map(function (s) { return '<button class="sekme" role="tab" type="button" data-s="' + s[0] + '">' + s[1] + "</button>"; }).join("");
  $("#sekmeler").addEventListener("click", function (e) { var b = e.target.closest(".sekme"); if (b) git(b.getAttribute("data-s")); });
  function git(s) {
    aktif = s; tus = null;
    $$(".sekme").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-s") === s ? "true" : "false"); });
    ({ bugun: bugunCiz, calis: calisCiz, test: testCiz, yaz: yazCiz, esle: esleCiz, liste: listeCiz, ist: istCiz })[s]();
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

  // ---------- BUGÜN ----------
  function bugunCiz() {
    var bek = bekleyenler().length, yk = yeniKalan(), c = sayilar(), sr = seri();
    var sira = siradakiYeniler(5);
    var bitti = bek === 0 && yk === 0;
    ana.innerHTML =
      '<section class="kart"><h2>Bugünün çalışması</h2>' +
      '<p class="aciklama">' + (bitti ? "Bugünkü görevin bitti, aferin! İstersen birkaç yeni kelime daha ekleyebilir ya da test çözebilirsin." :
        "Önce tekrarı gelen kelimeler, sonra bugünün yeni kelimeleri gelir. Her gün biraz çalışmak, bir günde çok çalışmaktan daha etkilidir.") + "</p>" +
      '<div class="hero"><div class="sayi tekrar"><b>' + bek + '</b><span>tekrar bekliyor</span></div>' +
      '<div class="sayi yeni"><b>' + yk + '</b><span>yeni kelime</span></div>' +
      '<div class="sayi seri"><b>' + sr + '</b><span>gün seri 🔥</span></div></div>' +
      '<div class="satir-btn">' + (bitti ? '<button class="btn dolu buyuk" id="ekYeni" type="button">+10 yeni kelime</button><button class="btn buyuk" id="gitTest" type="button">Test çöz</button>' :
        '<button class="btn dolu buyuk" id="basla" type="button">Çalışmaya başla →</button>') + "</div></section>" +
      '<section class="kart"><h2>Genel ilerleme</h2><p class="aciklama">' + N + ' kelimeden <b>' + (N - c.yeni) + "</b> tanesiyle tanıştın.</p>" +
      '<div class="ilerleme"><i class="o" style="width:' + (c.tamam / N * 100) + '%"></i><i class="b" style="width:' + (c.bil / N * 100) + '%"></i><i class="g" style="width:' + (c.ogr / N * 100) + '%"></i></div>' +
      '<div class="efsane"><span><i style="background:var(--dogru)"></i>Öğrenildi ' + c.tamam + '</span><span><i style="background:var(--mavi)"></i>Biliyorum ' + c.bil + '</span><span><i style="background:var(--altin)"></i>Öğreniliyor ' + c.ogr +
      '</span><span><i style="background:var(--yumusak)"></i>Yeni ' + c.yeni + "</span></div></section>" +
      '<section class="kart"><h2>Sıradaki yeni kelimeler</h2><p class="aciklama">Kelimeler en sık kullanılandan başlayarak sıralı. Başlangıç yerini İstatistik → Ayarlar\'dan ya da Liste\'den değiştirebilirsin.</p>' +
      sira.map(function (i) { return kelimeSatir(i); }).join("") + "</section>" +
      '<section class="kart"><h2>Nasıl çalışırım?</h2><ol class="kucuk" style="margin:4px 0 0;padding-inline-start:20px">' +
      "<li><b>Kartlar</b>: Arapçayı gör, anlamını aklından söyle, sonra kartı çevir. Ne kadar iyi bildiğine göre bir düğmeye bas. Program kelimeyi unutmak üzereyken sana yeniden sorar.</li>" +
      "<li><b>Test</b> ve <b>Yazma</b>: öğrendiğin kelimeleri dört seçenekle ya da Türkçesini yazarak dene.</li>" +
      "<li><b>Eşleştir</b>: kelimeleri anlamlarıyla eşleştirerek oyun gibi tekrar et.</li>" +
      "<li>İlerlemen bu tarayıcıda saklanır. Arada bir <b>İstatistik → Yedek al</b> ile dosyaya kaydet.</li></ol></section>";
    var b = $("#basla"); if (b) b.addEventListener("click", function () { S = null; git("calis"); });
    var ey = $("#ekYeni"); if (ey) ey.addEventListener("click", function () { ekstraYeni = 10; S = null; git("calis"); });
    var gt = $("#gitTest"); if (gt) gt.addEventListener("click", function () { git("test"); });

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
    S = { q: q, top: q.length, bitti: 0, acik: false, tekrar: {}, dogru: 0 };
  }
  function yonu(i) { var y = D.ay.yon; return y === "karisik" ? ((i + bugun()) % 2 ? "tr" : "ar") : y; }
  function calisCiz() {
    if (!S || !S.q.length) oturumKur();
    if (!S.q.length) {
      ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">🌿</div><h2>Şu an sorulacak kart yok</h2>' +
        '<p class="aciklama">' + (S.top ? "Oturumu bitirdin! " + S.top + " kartın " + S.dogru + " tanesini ilk seferde bildin." : "Bugünkü tekrarların ve yeni kelimelerin bitti.") + "</p>" +
        '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="ek10" type="button">+10 yeni kelime</button>' +
        '<button class="btn" id="ek20" type="button">+20 yeni kelime</button><button class="btn" id="gTest" type="button">Test çöz</button></div></section>';
      $("#ek10").addEventListener("click", function () { ekstraYeni = 10; S = null; calisCiz(); });
      $("#ek20").addEventListener("click", function () { ekstraYeni = 20; S = null; calisCiz(); });
      $("#gTest").addEventListener("click", function () { git("test"); });
      return;
    }
    var i = S.q[0], yon = yonu(i), p = arParca(i), s = D.k[i];
    var yeniMi = !s, ust = { m: 0, y: 0, k: 0 };
    S.q.forEach(function (x) { if (!D.k[x]) ust.y++; else if (D.k[x].r === 0) ust.k++; else ust.m++; });
    var arHTML = '<div class="f-ar ar">' + esc(p.ana) + "</div>" + (p.ek ? '<div class="f-ek ar">' + esc(p.ek) + "</div>" : "");
    var trHTML = '<div class="f-tr">' + esc(K[i][1]) + "</div>" + (D.ay.en && K[i][2] ? '<div class="f-en">' + esc(K[i][2]) + "</div>" : "");
    var on = yon === "ar" ? arHTML + dinleBtn(i) : trHTML.replace(/<div class="f-en">.*<\/div>$/, "");
    var arka = yon === "ar" ? arHTML + dinleBtn(i) + '<hr class="f-cizgi">' + trHTML : trHTML + '<hr class="f-cizgi">' + arHTML + dinleBtn(i);
    ana.innerHTML =
      '<div class="cal-ust"><div class="cubuk"><i style="width:' + (S.top ? (S.bitti / S.top * 100) : 0) + '%"></i></div>' +
      '<span class="sayac" title="tekrar · yeni · yeniden"><span class="m">' + ust.m + '</span> · <span class="y">' + ust.y + '</span> · <span class="k">' + ust.k + "</span></span></div>" +
      '<div class="fkart" id="fkart"><span class="etiket">No ' + (i + 1) + "</span><span class=\"etiket sag\">" +
      (yeniMi ? '<span class="durum yeni">yeni kelime</span>' : s.r === 0 ? '<span class="durum ogr">yeniden</span>' : '<span class="durum tek">tekrar</span>') + "</span>" +
      '<div id="fic">' + (S.acik ? arka : on + '<div class="f-ipucu">' + (yon === "ar" ? "Türkçesi ne? Düşün, sonra dokun." : "Arapçası ne? Düşün, sonra dokun.") + "</div>") + "</div></div>" +
      (S.acik ? '<div class="oy">' + [[1, "Bilmedim"], [2, "Zor"], [3, "Bildim"], [4, "Kolay"]].map(function (o) {
        return '<button type="button" class="o' + o[0] + '" data-q="' + o[0] + '">' + o[1] + "<small>" + gunYazi(sonraki(s, o[0])) + "</small></button>";
      }).join("") + "</div>" : '<button class="btn dolu buyuk goster-btn" id="goster" type="button">Cevabı göster</button>') +
      '<div class="ayarlar" style="margin-top:16px"><span class="ayar"><span class="lbl">Yön</span>' +
      seg("yon", D.ay.yon, [["ar", "Arapça → Türkçe"], ["tr", "Türkçe → Arapça"], ["karisik", "Karışık"]]) + "</span>" +
      '<label class="anahtar"><input type="checkbox" id="enGoster"' + (D.ay.en ? " checked" : "") + "> İngilizce ipucu</label></div>" +
      '<button class="btn bil-btn" id="bilBtn" type="button">✓ Bunu iyi biliyorum — bir daha gösterme</button>' +
      '<p class="soluk kucuk">Kısayollar: <b>Boşluk</b> kartı çevirir, <b>1–4</b> puanlar, <b>B</b> bir daha göstermez.' + (yeniMi ? " Yeni kelimede “Bilmedim” dersen kart birkaç kart sonra yine gelir." : "") + "</p>";
    function cevir() { if (!S.acik) { S.acik = true; calisCiz(); } }
    $("#fkart").addEventListener("click", cevir);
    var g = $("#goster"); if (g) g.addEventListener("click", cevir);
    $$(".oy button").forEach(function (b) { b.addEventListener("click", function () { cevap(+b.getAttribute("data-q")); }); });
    $("#bilBtn").addEventListener("click", gosterme);
    segBagla(ana, function (a, v) { D.ay.yon = v; kaydet(); calisCiz(); });
    $("#enGoster").addEventListener("change", function () { D.ay.en = this.checked; kaydet(); calisCiz(); });
    tus = function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!S.acik) cevir(); else cevap(3); }
      else if (S.acik && /^[1-4]$/.test(e.key)) cevap(+e.key);
      else if (e.key === "b" || e.key === "B") gosterme();
    };
  }
  function gosterme() {
    var i = S.q.shift(), once = D.k[i] ? JSON.stringify(D.k[i]) : null, kuyruk = S.q.filter(function (x) { return x === i; }).length;
    S.q = S.q.filter(function (x) { return x !== i; });
    S.top -= kuyruk; S.top--;
    biliyorum(i, true); S.acik = false; calisCiz();
    toast("“" + arParca(i).ana + "” bir daha gösterilmeyecek.", function () {
      if (once) D.k[i] = JSON.parse(once); else delete D.k[i];
      kaydet(); S.q.unshift(i); S.top += 1 + kuyruk; if (aktif === "calis") calisCiz();
    });
  }
  function cevap(q) {
    var i = S.q.shift();
    puanla(i, q);
    if (q === 1) { S.tekrar[i] = 1; S.q.splice(Math.min(S.q.length, 3 + Math.floor(Math.random() * 3)), 0, i); }
    else { S.bitti++; if (!S.tekrar[i]) S.dogru++; }
    S.acik = false;
    if (!S.q.length) { konfeti(); }
    calisCiz();
  }

  // ---------- kaynak seçimi (test / yazma / eşleştir) ----------
  function havuz() {
    var k = D.ay.kay, r;
    if (k === "paket") r = aralik(D.ay.kp * PAKET, Math.min(N, (D.ay.kp + 1) * PAKET));
    else if (k === "zor") r = Object.keys(D.k).map(Number).filter(function (i) { return !D.k[i].b && (D.k[i].l > 0 || D.k[i].e < 2.3 || D.k[i].r === 0); });
    else if (k === "yildiz") r = Object.keys(D.f).map(Number);
    else r = Object.keys(D.k).map(Number).filter(function (i) { return !D.k[i].b; });
    return r;
  }
  function kaynakHTML() {
    return '<div class="ayarlar"><span class="ayar"><span class="lbl">Kelimeler</span>' +
      seg("kay", D.ay.kay, [["ogr", "Çalıştıklarım"], ["zor", "Zorlandıklarım"], ["yildiz", "★ Yıldızlılar"], ["paket", "Paket"]]) + "</span>" +
      (D.ay.kay === "paket" ? '<select id="kp" aria-label="Paket">' + aralik(0, PSAY).map(function (p) {
        return '<option value="' + p + '"' + (p === D.ay.kp ? " selected" : "") + ">" + paketAd(p) + "</option>";
      }).join("") + "</select>" : "") + "</div>";
  }
  function kaynakBagla(yeniden) {
    var kp = $("#kp"); if (kp) kp.addEventListener("change", function () { D.ay.kp = +this.value; kaydet(); yeniden(); });
  }
  function havuzBos(baslik) {
    var m = { ogr: "Henüz kartlarla çalıştığın kelime yok. Önce Kartlar bölümünde birkaç kelime öğren ya da yukarıdan bir paket seç.",
      zor: "Zorlandığın kelime yok — harika! Başka bir kaynak seç.", yildiz: "Yıldızlı kelimen yok. Liste'de kelimelerin yanındaki ☆ işaretine dokunarak ekleyebilirsin.", paket: "" }[D.ay.kay];
    return '<section class="kart"><h2>' + baslik + "</h2>" + kaynakHTML() + '<p class="not">' + m + " (En az 4 kelime gerekli.)</p></section>";
  }
  function celdirici(i, n, alan) {
    var hedef = alan === 0 ? arNorm(K[i][0]) : trNorm(kisa(K[i][1])), gor = {}, r = [];
    gor[hedef] = 1;
    var lo = Math.max(0, i - 200), hi = Math.min(N, i + 200), deneme = 0;
    while (r.length < n && deneme++ < 400) {
      var j = lo + Math.floor(Math.random() * (hi - lo));
      if (j === i) continue;
      var a = alan === 0 ? arNorm(K[j][0]) : trNorm(kisa(K[j][1]));
      if (!a || gor[a]) continue;
      gor[a] = 1; r.push(j);
    }
    return r;
  }

  // ---------- TEST ----------
  var T = null;
  function testCiz() {
    var h = havuz();
    if (h.length < 4) { ana.innerHTML = havuzBos("Test"); segBagla(ana, testSeg); kaynakBagla(testCiz); return; }
    if (!T) {
      ana.innerHTML = '<section class="kart"><h2>Test</h2><p class="aciklama">Dört seçenekten doğru anlamı bul. Yanlış yaptığın ve daha önce çalıştığın kelimeler bugünkü tekrar listene eklenir.</p>' +
        kaynakHTML() + '<div class="ayarlar"><span class="ayar"><span class="lbl">Yön</span>' + seg("tyon", D.ay.tyon || "ar", [["ar", "Arapça → Türkçe"], ["tr", "Türkçe → Arapça"], ["karisik", "Karışık"]]) +
        '</span><span class="ayar"><span class="lbl">Soru</span>' + seg("tsay", D.ay.tsay || 10, [[10, "10"], [20, "20"], [50, "50"]]) + "</span></div>" +
        '<p class="soluk kucuk">Bu kaynakta ' + h.length + ' kelime var.</p><button class="btn dolu buyuk" id="tBasla" type="button">Teste başla</button></section>';
      segBagla(ana, testSeg); kaynakBagla(testCiz);
      $("#tBasla").addEventListener("click", function () {
        var sor = karistir(h.slice()).slice(0, D.ay.tsay || 10);
        T = { s: sor, n: 0, d: 0, yanlis: [], cevap: null };
        testSoru();
      });
      tus = function (e) { if (e.key === "Enter") $("#tBasla").click(); };
      return;
    }
    testSoru();
  }
  function testSeg(a, v) {
    if (a === "kay") D.ay.kay = v; else if (a === "tyon") D.ay.tyon = v; else if (a === "tsay") D.ay.tsay = +v;
    kaydet(); T = null; testCiz();
  }
  function testSoru() {
    if (T.n >= T.s.length) return testSonuc();
    var i = T.s[T.n], y = D.ay.tyon || "ar";
    if (y === "karisik") y = Math.random() < .5 ? "ar" : "tr";
    if (!T.cevap) T.cevap = { y: y, sec: karistir(celdirici(i, 3, y === "ar" ? 1 : 0).concat([i])) };
    y = T.cevap.y;
    var p = arParca(i);
    ana.innerHTML = '<div class="cal-ust"><div class="cubuk"><i style="width:' + (T.n / T.s.length * 100) + '%"></i></div><span class="sayac">' + (T.n + 1) + " / " + T.s.length + " · ✓ " + T.d + "</span></div>" +
      '<section class="kart"><div class="soru-kutu">' + (y === "ar" ? '<div class="soru-ar ar">' + esc(p.ana) + "</div>" + (p.ek ? '<div class="f-ek ar">' + esc(p.ek) + "</div>" : "") + dinleBtn(i) :
        '<div class="soru-tr">' + esc(K[i][1]) + "</div>") + "</div>" +
      '<div class="secenekler">' + T.cevap.sec.map(function (j, n) {
        return '<button type="button" class="sec' + (y === "ar" ? "" : " ar") + '" data-j="' + j + '"><span class="kisayol">' + (n + 1) + "</span>" + esc(y === "ar" ? kisa(K[j][1]) : K[j][0]) + "</button>";
      }).join("") + '</div><div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="tSon" type="button" hidden>Sonraki →</button></div></section>' +
      '<button class="btn kucuk" id="tBirak" type="button">Testi bitir</button>';
    var bitti = false;
    function sec(b) {
      if (bitti) return; bitti = true;
      var j = +b.getAttribute("data-j"), ok = j === i;
      $$(".sec").forEach(function (x) { x.disabled = true; if (+x.getAttribute("data-j") === i) x.classList.add("dogru"); });
      if (ok) { T.d++; $("#gb").textContent = "Doğru! ✓"; $("#gb").className = "geri-bildirim iyi"; }
      else {
        b.classList.add("yanlis"); T.yanlis.push(i);
        if (D.k[i]) { D.k[i].d = Math.min(D.k[i].d, bugun()); kaydet(); }
        $("#gb").innerHTML = "Doğrusu: <span class=\"ar\">" + esc(K[i][0]) + "</span> = " + esc(K[i][1]); $("#gb").className = "geri-bildirim kotu";
      }
      $("#tSon").hidden = false; $("#tSon").focus();
      if (ok) setTimeout(function () { if (T && T.s[T.n] === i && bitti) ileri(); }, 900);
    }
    function ileri() { T.n++; T.cevap = null; testSoru(); }
    $$(".sec").forEach(function (b) { b.addEventListener("click", function () { sec(b); }); });
    $("#tSon").addEventListener("click", ileri);
    $("#tBirak").addEventListener("click", function () { T.s = T.s.slice(0, T.n); testSonuc(); });
    tus = function (e) {
      if (/^[1-4]$/.test(e.key) && !bitti) sec($$(".sec")[+e.key - 1]);
      else if (e.key === "Enter" && bitti) { e.preventDefault(); ileri(); }
    };
  }
  function testSonuc() {
    var top = T.s.length, d = T.d, yuzde = top ? Math.round(d / top * 100) : 0;
    if (yuzde >= 80 && top) konfeti();
    ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">' + (yuzde >= 80 ? "🏆" : yuzde >= 50 ? "👍" : "💪") + "</div><h2>" + d + " / " + top + " doğru</h2>" +
      '<p class="aciklama">%' + yuzde + (yuzde >= 80 ? " — çok iyi!" : yuzde >= 50 ? " — fena değil, biraz daha tekrar." : " — bu kelimeleri kartlarla tekrar etmeye devam.") + "</p>" +
      '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="tYeni" type="button">Yeni test</button>' +
      (T.yanlis.length ? '<button class="btn" id="tYanlis" type="button">Yanlışları yeniden sor</button>' : "") + "</div>" +
      (T.yanlis.length ? '<div class="sonuc-liste" style="text-align:start">' + T.yanlis.map(function (i) {
        return '<div class="r"><span class="ar">' + esc(K[i][0]) + '</span><span class="t">' + esc(K[i][1]) + "</span></div>";
      }).join("") + "</div>" : "") + "</section>";
    var yan = T.yanlis.slice();
    $("#tYeni").addEventListener("click", function () { T = null; testCiz(); });
    var ty = $("#tYanlis"); if (ty) ty.addEventListener("click", function () { T = { s: karistir(yan), n: 0, d: 0, yanlis: [], cevap: null }; testSoru(); });
    tus = function (e) { if (e.key === "Enter") $("#tYeni").click(); };
  }

  // ---------- YAZMA ----------
  var Y = null;
  function adaylar(tr) {
    var r = [];
    tr.replace(/\([^)]*\)/g, " ").split(/[;,\/]| veya /).forEach(function (p) { var n = trNorm(p.replace(/[؀-ۿ]+/g, " ")); if (n) r.push(n); });
    return r;
  }
  function dogruMu(girdi, tr) {
    var g = trNorm(girdi); if (!g) return false;
    return adaylar(tr).some(function (a) {
      if (a === g) return true;
      var tol = a.length >= 9 ? 2 : a.length >= 5 ? 1 : 0;
      if (lev(a, g) <= tol) return true;
      return g.length >= 4 && a.split(" ").indexOf(g) >= 0 && a.split(" ").length <= 3;
    });
  }
  function yazCiz() {
    var h = havuz();
    if (h.length < 4) { ana.innerHTML = havuzBos("Yazma"); segBagla(ana, yazSeg); kaynakBagla(yazCiz); return; }
    if (!Y) {
      ana.innerHTML = '<section class="kart"><h2>Yazma</h2><p class="aciklama">Arapça kelimeyi gör, Türkçe anlamını yaz. Anlamlardan birini yazman yeter; Türkçe harfleri (ş, ğ, ı…) kullanmasan da kabul edilir. Program yanılırsa “Aslında doğruydu” düğmesine bas.</p>' +
        kaynakHTML() + '<div class="ayarlar"><span class="ayar"><span class="lbl">Soru</span>' + seg("ysay", D.ay.ysay || 10, [[10, "10"], [20, "20"], [30, "30"]]) + "</span></div>" +
        '<button class="btn dolu buyuk" id="yBasla" type="button">Başla</button></section>';
      segBagla(ana, yazSeg); kaynakBagla(yazCiz);
      $("#yBasla").addEventListener("click", function () { Y = { s: karistir(h.slice()).slice(0, D.ay.ysay || 10), n: 0, d: 0, yanlis: [] }; yazSoru(); });
      tus = function (e) { if (e.key === "Enter") $("#yBasla").click(); };
      return;
    }
    yazSoru();
  }
  function yazSeg(a, v) { if (a === "kay") D.ay.kay = v; else D.ay.ysay = +v; kaydet(); Y = null; yazCiz(); }
  function yazSoru() {
    if (Y.n >= Y.s.length) return yazSonuc();
    var i = Y.s[Y.n], p = arParca(i), durumu = null;
    ana.innerHTML = '<div class="cal-ust"><div class="cubuk"><i style="width:' + (Y.n / Y.s.length * 100) + '%"></i></div><span class="sayac">' + (Y.n + 1) + " / " + Y.s.length + " · ✓ " + Y.d + "</span></div>" +
      '<section class="kart"><div class="soru-kutu"><div class="soru-ar ar">' + esc(p.ana) + "</div>" + (p.ek ? '<div class="f-ek ar">' + esc(p.ek) + "</div>" : "") + dinleBtn(i) + "</div>" +
      '<div class="yaz-satir"><input type="text" id="yGir" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Türkçe anlamı…" aria-label="Türkçe anlam"><button class="btn dolu" id="yKontrol" type="button">Kontrol</button></div>' +
      '<div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center">' +
      '<button class="btn" id="yBilmiyorum" type="button">Bilmiyorum</button><button class="btn" id="yAslinda" type="button" hidden>Aslında doğruydu</button>' +
      '<button class="btn dolu" id="ySon" type="button" hidden>Sonraki →</button></div></section><button class="btn kucuk" id="yBirak" type="button">Bitir</button>';
    var gir = $("#yGir"); gir.focus();
    function goster(ok, bos) {
      durumu = ok;
      if (ok) { Y.d++; $("#gb").className = "geri-bildirim iyi"; $("#gb").innerHTML = "Doğru! ✓ <span class=\"soluk\">" + esc(K[i][1]) + "</span>"; }
      else {
        Y.yanlis.push(i);
        if (D.k[i]) { D.k[i].d = Math.min(D.k[i].d, bugun()); kaydet(); }
        $("#gb").className = "geri-bildirim kotu"; $("#gb").innerHTML = (bos ? "" : "Olmadı. ") + "Doğrusu: " + esc(K[i][1]);
        if (!bos) $("#yAslinda").hidden = false;
      }
      gir.disabled = true; $("#yKontrol").disabled = true; $("#yBilmiyorum").hidden = true; $("#ySon").hidden = false; $("#ySon").focus();
    }
    function kontrol() { if (durumu !== null) return ileri(); if (!gir.value.trim()) return; goster(dogruMu(gir.value, K[i][1]), false); }
    function ileri() { Y.n++; yazSoru(); }
    $("#yKontrol").addEventListener("click", kontrol);
    $("#yBilmiyorum").addEventListener("click", function () { goster(false, true); });
    $("#yAslinda").addEventListener("click", function () { Y.yanlis.pop(); Y.d++; $("#gb").className = "geri-bildirim iyi"; $("#gb").innerHTML = "Tamam, doğru sayıldı ✓ <span class=\"soluk\">" + esc(K[i][1]) + "</span>"; this.hidden = true; });
    $("#ySon").addEventListener("click", ileri);
    $("#yBirak").addEventListener("click", function () { Y.s = Y.s.slice(0, Y.n); yazSonuc(); });
    tus = function (e) { if (e.key === "Enter") { e.preventDefault(); kontrol(); } };
  }
  function yazSonuc() {
    var top = Y.s.length;
    if (top && Y.d / top >= .8) konfeti();
    ana.innerHTML = '<section class="kart bitti"><div class="buyuk-ikon">✍️</div><h2>' + Y.d + " / " + top + " doğru</h2>" +
      '<div class="satir-btn" style="justify-content:center"><button class="btn dolu" id="yYeni" type="button">Yeniden</button></div>' +
      (Y.yanlis.length ? '<div class="sonuc-liste" style="text-align:start">' + Y.yanlis.map(function (i) {
        return '<div class="r"><span class="ar">' + esc(K[i][0]) + '</span><span class="t">' + esc(K[i][1]) + "</span></div>";
      }).join("") + "</div>" : "") + "</section>";
    $("#yYeni").addEventListener("click", function () { Y = null; yazCiz(); });
    tus = function (e) { if (e.key === "Enter") $("#yYeni").click(); };
  }

  // ---------- EŞLEŞTİR ----------
  var E = null;
  function esleCiz() {
    var h = havuz();
    if (h.length < 4) { ana.innerHTML = havuzBos("Eşleştir"); segBagla(ana, function (a, v) { D.ay.kay = v; kaydet(); E = null; esleCiz(); }); kaynakBagla(function () { E = null; esleCiz(); }); return; }
    if (!E) {
      var sec = karistir(h.slice()).slice(0, 6), gor = {}, ciftler = [];
      sec.forEach(function (i) { var k = trNorm(kisa(K[i][1])); if (!gor[k]) { gor[k] = 1; ciftler.push(i); } });
      E = { c: ciftler, sol: karistir(ciftler.slice()), sag: karistir(ciftler.slice()), kalan: ciftler.length, hata: 0, t0: Date.now(), secili: null };
    }
    ana.innerHTML = '<section class="kart"><h2>Eşleştir</h2><p class="aciklama">Bir Arapça kelimeye, sonra onun Türkçe anlamına dokun.</p>' + kaynakHTML() +
      '<div class="esle"><div class="sutun">' + E.sol.map(function (i) { return '<button type="button" class="ek ar" data-y="a" data-i="' + i + '">' + esc(arParca(i).ana) + "</button>"; }).join("") +
      '</div><div class="sutun">' + E.sag.map(function (i) { return '<button type="button" class="ek" data-y="t" data-i="' + i + '">' + esc(kisa(K[i][1])) + "</button>"; }).join("") +
      '</div></div><div class="geri-bildirim" id="gb"></div><div class="satir-btn" style="justify-content:center"><button class="btn" id="eYeni" type="button">Yeni tur</button></div></section>';
    segBagla(ana, function (a, v) { D.ay.kay = v; kaydet(); E = null; esleCiz(); });
    kaynakBagla(function () { E = null; esleCiz(); });
    $("#eYeni").addEventListener("click", function () { E = null; esleCiz(); });
    var secili = null;
    $$(".ek").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.classList.contains("tamam")) return;
        if (!secili || secili.getAttribute("data-y") === b.getAttribute("data-y")) {
          if (secili) secili.classList.remove("secili");
          secili = b; b.classList.add("secili");
          if (b.getAttribute("data-y") === "a") oku(+b.getAttribute("data-i"));
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

  // ---------- LİSTE ----------
  var L = { p: null, ara: "", filtre: "hepsi" };
  function kelimeSatir(i) {
    return '<div class="kelime"><span class="no">' + (i + 1) + '</span><span class="ar">' + esc(K[i][0]) + "</span>" +
      '<span class="tr">' + esc(K[i][1]) + (D.ay.en && K[i][2] ? '<span class="en">' + esc(K[i][2]) + "</span>" : "") + "</span>" +
      '<span class="yan"><button type="button" class="yildiz' + (D.f[i] ? " acik" : "") + '" data-yildiz="' + i + '" title="Yıldızla" aria-label="Yıldızla">' + (D.f[i] ? "★" : "☆") + "</button>" + durumHTML(i) +
      '<button type="button" class="bil-kucuk" data-bil="' + i + '">' + (D.k[i] && D.k[i].b ? "↺ yeniden çalış" : "✓ biliyorum") + "</button></span></div>";
  }
  function kelimeOlay(kok) {
    kok.addEventListener("click", function (e) {
      var bb = e.target.closest("[data-bil]");
      if (bb) {
        var bi = +bb.getAttribute("data-bil"), ac = !(D.k[bi] && D.k[bi].b);
        biliyorum(bi, ac); S = null;
        var satir = bb.closest(".kelime"), yeni = document.createElement("div"); yeni.innerHTML = kelimeSatir(bi);
        satir.replaceWith(yeni.firstChild);
        toast(ac ? "Bu kelime bir daha gösterilmeyecek." : "Kelime yeniden çalışma listesinde.");
        return;
      }
      var y = e.target.closest("[data-yildiz]");
      if (y) {
        var i = +y.getAttribute("data-yildiz");
        if (D.f[i]) delete D.f[i]; else D.f[i] = 1;
        kaydet(); y.classList.toggle("acik", !!D.f[i]); y.textContent = D.f[i] ? "★" : "☆";
        return;
      }
      var t = e.target.closest(".gizli-tr .tr"); if (t) t.classList.toggle("ac");
    });
  }
  function listeCiz() {
    if (L.p === null) L.p = Math.floor(D.ay.bas / PAKET);
    var pd = paketDurum();
    ana.innerHTML = '<section class="kart"><h2>Kelime listesi</h2><p class="aciklama">Kelimeler sıklık sırasına göre 100\'erli paketlere bölündü. Arapça, Türkçe, İngilizce ya da numara ile arayabilirsin.</p>' +
      '<div class="arama"><input type="search" id="ara" placeholder="Ara: كتاب, kitap, 250…" value="' + esc(L.ara) + '" aria-label="Ara"></div>' +
      '<div class="paketler" id="paketler">' + aralik(0, PSAY).map(function (p) {
        return '<button type="button" class="paket' + (p === L.p && !L.ara ? " aktif" : "") + '" data-p="' + p + '" title="' + paketAd(p) + '">' + (p * PAKET + 1) +
          '<span class="dolgu" style="width:' + pd[p] + '%"></span></button>';
      }).join("") + "</div>" +
      '<div class="ayarlar"><span class="ayar">' + seg("filtre", L.filtre, [["hepsi", "Hepsi"], ["yeni", "Yeni"], ["ogr", "Öğreniliyor"], ["tamam", "Öğrenildi"], ["bil", "Biliyorum"], ["yildiz", "★"]]) + "</span>" +
      '<label class="anahtar"><input type="checkbox" id="gizle"' + (D.ay.gizle ? " checked" : "") + "> Türkçeyi gizle (kendini dene)</label></div>" +
      '<div class="satir-btn" id="pAraclar"' + (L.ara ? " hidden" : "") + '><button class="btn kucuk" id="pBas" type="button">Yeni kelimeleri bu paketten başlat</button>' +
      '<button class="btn kucuk" id="pTest" type="button">Bu paketi test et</button><button class="btn kucuk" id="pEsle" type="button">Bu paketle eşleştir</button></div>' +
      '<div id="liste" class="' + (D.ay.gizle ? "gizli-tr" : "") + '" style="margin-top:10px"></div></section>';
    listeDoldur();
    var ara = $("#ara"), z;
    ara.addEventListener("input", function () { clearTimeout(z); z = setTimeout(function () { L.ara = ara.value.trim(); $("#pAraclar").hidden = !!L.ara; $$(".paket").forEach(function (b) { b.classList.toggle("aktif", !L.ara && +b.getAttribute("data-p") === L.p); }); listeDoldur(); }, 200); });
    $("#paketler").addEventListener("click", function (e) { var b = e.target.closest(".paket"); if (b) { L.p = +b.getAttribute("data-p"); L.ara = ""; listeCiz(); } });
    segBagla(ana, function (a, v) { L.filtre = v; $$('[data-seg="filtre"] button').forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-v") === v); }); listeDoldur(); });
    $("#gizle").addEventListener("change", function () { D.ay.gizle = this.checked; kaydet(); $("#liste").className = this.checked ? "gizli-tr" : ""; });
    $("#pBas").addEventListener("click", function () { D.ay.bas = L.p * PAKET; kaydet(); toast("Yeni kelimeler artık " + (L.p * PAKET + 1) + ". kelimeden başlayacak."); });
    $("#pTest").addEventListener("click", function () { D.ay.kay = "paket"; D.ay.kp = L.p; kaydet(); T = null; git("test"); });
    $("#pEsle").addEventListener("click", function () { D.ay.kay = "paket"; D.ay.kp = L.p; kaydet(); E = null; git("esle"); });

  }
  function listeDoldur() {
    var r, q = L.ara;
    if (q) {
      r = [];
      if (/^\d+$/.test(q)) { var n = +q - 1; if (n >= 0 && n < N) r.push(n); }
      else {
        var aq = arNorm(q), tq = trNorm(q), arMi = /[؀-ۿ]/.test(q);
        for (var i = 0; i < N && r.length < 200; i++) {
          if (arMi ? arNorm(K[i][0]).indexOf(aq) >= 0 : (tq && (trNorm(K[i][1]).indexOf(tq) >= 0 || trNorm(K[i][2]).indexOf(tq) >= 0))) r.push(i);
        }
      }
    } else r = aralik(L.p * PAKET, Math.min(N, (L.p + 1) * PAKET));
    var f = L.filtre;
    if (f !== "hepsi") r = r.filter(function (i) { return f === "yildiz" ? D.f[i] : durum(i) === f; });
    $("#liste").innerHTML = r.length ? r.map(kelimeSatir).join("") + (q && r.length >= 200 ? '<p class="soluk kucuk">İlk 200 sonuç gösteriliyor.</p>' : "") : '<p class="soluk">Sonuç yok.</p>';
  }
  function paketDurum() {
    var r = aralik(0, PSAY).map(function () { return 0; });
    for (var k in D.k) if (D.k[k].b || D.k[k].i >= 21) r[Math.floor(k / PAKET)]++;
    return r.map(function (v, p) { return Math.round(v / (Math.min(N, (p + 1) * PAKET) - p * PAKET) * 100); });
  }

  // ---------- İSTATİSTİK ----------
  function istCiz() {
    var c = sayilar(), t = bugun(), gecmis = [], ileri = [], tops = 0, dogru = 0;
    for (var g in D.gun) { tops += D.gun[g].t; dogru += D.gun[g].d; }
    for (var j = 13; j >= 0; j--) { var gk = D.gun[t - j]; gecmis.push([t - j, gk ? gk.t : 0]); }
    for (j = 0; j < 7; j++) ileri.push([t + j, 0]);
    for (var k in D.k) { if (D.k[k].b) continue; var fark = Math.max(0, D.k[k].d - t); if (fark < 7) ileri[fark][1]++; }
    var gmax = Math.max.apply(null, gecmis.map(function (x) { return x[1]; }).concat([1]));
    var imax = Math.max.apply(null, ileri.map(function (x) { return x[1]; }).concat([1]));
    var GUN = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];
    function gunAd(n) { return GUN[new Date(n * 86400000).getUTCDay()]; }
    var pd = paketDurum(), ilk = {};
    for (k in D.k) { var pk = Math.floor(k / PAKET); ilk[pk] = (ilk[pk] || 0) + 1; }
    ana.innerHTML =
      '<section class="kart"><h2>Özet</h2><div class="hero" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr))">' +
      '<div class="sayi yeni"><b>' + c.tamam + '</b><span>öğrenildi</span></div><div class="sayi tekrar"><b>' + c.bil + '</b><span>biliyorum</span></div><div class="sayi seri"><b>' + c.ogr + '</b><span>öğreniliyor</span></div>' +
      '<div class="sayi tekrar"><b>' + tops + '</b><span>toplam cevap</span></div><div class="sayi"><b>' + (tops ? Math.round(dogru / tops * 100) : 0) + '%</b><span>başarı</span></div>' +
      '<div class="sayi seri"><b>' + seri() + '</b><span>gün seri 🔥</span></div></div>' +
      '<p class="soluk kucuk">“Öğrenildi”: bir sonraki tekrarı en az 3 hafta sonra olan kelime.</p></section>' +
      '<section class="kart ikili"><div><h3>Son 14 gün</h3><div class="grafik">' + gecmis.map(function (x) {
        return '<div class="s"><b>' + (x[1] || "") + '</b><i style="height:' + (x[1] / gmax * 85) + '%"></i><small>' + gunAd(x[0]) + "</small></div>";
      }).join("") + '</div></div><div><h3>Önümüzdeki 7 gün tekrar</h3><div class="grafik">' + ileri.map(function (x, n) {
        return '<div class="s ileri"><b>' + (x[1] || "") + '</b><i style="height:' + (x[1] / imax * 85) + '%"></i><small>' + (n ? gunAd(x[0]) : "bugün") + "</small></div>";
      }).join("") + "</div></div></section>" +
      '<section class="kart"><h2>Paketler</h2><p class="aciklama">Her kare 100 kelime. Yeşil doluluk öğrenilen oranı gösterir; dokununca listeyi açar.</p><div class="izgara">' +
      aralik(0, PSAY).map(function (p) {
        return '<button type="button" class="h" data-p="' + p + '" title="' + paketAd(p) + ": " + (ilk[p] || 0) + " çalışıldı, %" + pd[p] + ' öğrenildi"><i style="height:' + pd[p] + '%"></i><span>' + (p + 1) + "</span></button>";
      }).join("") + "</div></section>" +
      '<section class="kart"><h2>Ayarlar</h2><div class="ayarlar"><span class="ayar"><span class="lbl">Günlük yeni kelime</span>' +
      seg("yeni", D.ay.yeni, [[5, "5"], [10, "10"], [20, "20"], [30, "30"], [50, "50"]]) + "</span></div>" +
      '<div class="ayarlar"><span class="ayar"><span class="lbl">Yeni kelimeler şuradan başlasın</span><select id="bas" aria-label="Başlangıç">' +
      aralik(0, PSAY).map(function (p) { return '<option value="' + p * PAKET + '"' + (Math.floor(D.ay.bas / PAKET) === p ? " selected" : "") + ">" + paketAd(p) + "</option>"; }).join("") +
      '</select></span><label class="anahtar"><input type="checkbox" id="en2"' + (D.ay.en ? " checked" : "") + "> İngilizce ipucunu göster</label></div>" +
      (arSes ? '<p class="soluk kucuk">🔊 Cihazında Arapça ses bulundu; kartlarda dinleme düğmesi görünür.</p>' : '<p class="soluk kucuk">Cihazında Arapça okuma sesi bulunamadı, bu yüzden dinleme düğmesi gizli.</p>') + "</section>" +
      '<section class="kart"><h2>Yedek</h2><p class="aciklama">İlerlemen yalnızca bu tarayıcıda durur. Tarayıcı verisi silinirse kaybolur; ara sıra yedek al. Yedeği başka bir cihazda “Yedeği yükle” ile açabilirsin.</p>' +
      (depoVar ? "" : '<p class="not"><b>Dikkat:</b> Bu tarayıcı kayıt yapmaya izin vermiyor. Sayfayı kapatınca ilerleme kaybolur; mutlaka yedek al.</p>') +
      '<div class="satir-btn"><button class="btn dolu" id="yedekAl" type="button">Yedek al (dosya indir)</button>' +
      '<label class="btn" for="yedekDosya" style="display:inline-block">Yedeği yükle</label><input type="file" id="yedekDosya" accept=".json,application/json" hidden>' +
      '<button class="btn" id="sifirla" type="button" style="margin-inline-start:auto;color:var(--yanlis)">Her şeyi sıfırla</button></div></section>';
    segBagla(ana, function (a, v) { D.ay.yeni = +v; kaydet(); S = null; istCiz(); toast("Günde " + v + " yeni kelime."); });
    $("#bas").addEventListener("change", function () { D.ay.bas = +this.value; L.p = null; kaydet(); S = null; toast("Yeni kelimeler " + (+this.value + 1) + ". kelimeden başlayacak."); });
    $("#en2").addEventListener("change", function () { D.ay.en = this.checked; kaydet(); });
    $$(".izgara .h").forEach(function (b) { b.addEventListener("click", function () { L.p = +b.getAttribute("data-p"); L.ara = ""; git("liste"); }); });
    $("#yedekAl").addEventListener("click", function () {
      var d = new Date(), veri = JSON.stringify(D);
      var ad = "kelime-defteri-yedek-" + d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";
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
          D = d; kaydet(); temaUygula(); seriGuncelle(); S = null; T = null; Y = null; E = null; istCiz(); toast("Yedek yüklendi: " + Object.keys(D.k).length + " kelime.");
        } catch (e) { toast("Bu dosya geçerli bir yedek değil."); }
      };
      r.readAsText(f);
    });
    $("#sifirla").addEventListener("click", function () {
      if (!confirm("Bütün ilerleme silinecek. Emin misin?")) return;
      if (!confirm("Son kez soruyorum: geri alınamaz. Silinsin mi?")) return;
      var tema = D.ay.tema; D = bos(); D.ay.tema = tema; kaydet(); seriGuncelle(); S = null; T = null; Y = null; E = null; istCiz(); toast("Sıfırlandı.");
    });
  }

  kelimeOlay(ana);
  git("bugun");
})();
