// ================= VERİ: Ebvâb-ı Sitte (أَبْوَابُ الثُّلَاثِيِّ المُجَرَّدِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  cerr: { ar: "نَصَرَ", tr: "Nasara" }, ref: { ar: "ضَرَبَ", tr: "Daraba" }, mz: { ar: "فَتَحَ", tr: "Fetaha" },
  nasb: { ar: "عَلِمَ", tr: "Alime" }, mi: { ar: "حَسُنَ", tr: "Hasune" }, mun: { ar: "حَسِبَ", tr: "Hasibe" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cer", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
// Harekeler: Türkçe adlarıyla
var HR = { a: "َ", i: "ِ", u: "ُ" };
var HR_TR = { a: "üstün (fetha)", i: "esre (kesre)", u: "ötre (damme)" };
var HR_KISA = { a: "üstün", i: "esre", u: "ötre" };
var HRK_OPTS = [["a", "Üstün", "فَتْحَةٌ", "cerr"], ["i", "Esre", "كَسْرَةٌ", "ref"], ["u", "Ötre", "ضَمَّةٌ", "mz"]];
// Altı bâb
var BAB = {
  n: { no: 1, ad: "Nasara", m: "a", u: "u", col: "cerr", ex: "نَصَرَ", mu: "يَنْصُرُ", em: "اُنْصُرْ", ms: "نَصْرٌ", tr: "yardım etti", k: "فَعَلَ يَفْعُلُ", not: "Üstün · ötre. En kalabalık bâblardan biri." },
  d: { no: 2, ad: "Daraba", m: "a", u: "i", col: "ref", ex: "ضَرَبَ", mu: "يَضْرِبُ", em: "اِضْرِبْ", ms: "ضَرْبٌ", tr: "vurdu", k: "فَعَلَ يَفْعِلُ", not: "Üstün · esre. Vavla başlayan misâl fiillerin çoğu buradadır: وَجَدَ يَجِدُ." },
  f: { no: 3, ad: "Fetaha", m: "a", u: "a", col: "mz", ex: "فَتَحَ", mu: "يَفْتَحُ", em: "اِفْتَحْ", ms: "فَتْحٌ", tr: "açtı", k: "فَعَلَ يَفْعَلُ", not: "Üstün · üstün. Ayn ya da lâm harfi boğaz harfidir: ء ه ع ح غ خ" },
  a: { no: 4, ad: "Alime", m: "i", u: "a", col: "nasb", ex: "عَلِمَ", mu: "يَعْلَمُ", em: "اِعْلَمْ", ms: "عِلْمٌ", tr: "bildi", k: "فَعِلَ يَفْعَلُ", not: "Esre · üstün. Duygu, hâl, hastalık bildiren fiiller çoğu zaman buradadır: فَرِحَ، حَزِنَ." },
  h: { no: 5, ad: "Hasune", m: "u", u: "u", col: "mi", ex: "حَسُنَ", mu: "يَحْسُنُ", em: "اُحْسُنْ", ms: "حُسْنٌ", tr: "güzel oldu", k: "فَعُلَ يَفْعُلُ", not: "Ötre · ötre. Kalıcı vasıf ve tabiat bildirir; her zaman lâzımdır (mef’ûl almaz)." },
  hs: { no: 6, ad: "Hasibe", m: "i", u: "i", col: "mun", ex: "حَسِبَ", mu: "يَحْسِبُ", em: "اِحْسِبْ", ms: "حِسْبَانٌ", tr: "sandı", k: "فَعِلَ يَفْعِلُ", not: "Esre · esre. Fiili azdır; çoğu vavla başlayan misâldir: وَرِثَ يَرِثُ." }
};
var BKEYS = ["n", "d", "f", "a", "h", "hs"];
var BAB_BY_MU = {}; BKEYS.forEach(function (k) { BAB_BY_MU[BAB[k].m + BAB[k].u] = k; });
var BAB_OPTS = BKEYS.map(function (k) { return [k, BAB[k].ad, BAB[k].ex, BAB[k].col]; });
function bOpts(keys) { return keys.map(function (k) { return [k, BAB[k].ad, BAB[k].ex, BAB[k].col]; }); }
function babAd(k) { return BAB[k].no + ". " + BAB[k].ad + " (" + BAB[k].ex + " " + BAB[k].mu + ")"; }

// Harfleri harekeleriyle ayır; ayn sondan ikinci gruptur
function harfler(w) { return w.match(/[^ً-ْ][ً-ْ]*/g) || []; }
function aynHtml(w, col) {
  var g = harfler(w), i = g.length - 2;
  return g.map(function (x, j) { return j === i ? '<b style="color:var(--' + (col || "accent") + ')">' + x + '</b>' : x; }).join("");
}
function swapAyn(w, v) { var g = harfler(w), i = g.length - 2; g[i] = g[i].replace(/[َُِ]/, HR[v]); return g.join(""); }
function aynOf(w) { var g = harfler(w), x = g[g.length - 2]; return /ُ/.test(x) ? "u" : /ِ/.test(x) ? "i" : "a"; }

// Fiiller: [mâzi, muzâri, emir, Türkçe, bâb]
var VERBS = [
  ["نَصَرَ", "يَنْصُرُ", "اُنْصُرْ", "yardım etti", "n"], ["كَتَبَ", "يَكْتُبُ", "اُكْتُبْ", "yazdı", "n"], ["دَخَلَ", "يَدْخُلُ", "اُدْخُلْ", "girdi", "n"], ["خَرَجَ", "يَخْرُجُ", "اُخْرُجْ", "çıktı", "n"],
  ["شَكَرَ", "يَشْكُرُ", "اُشْكُرْ", "şükretti", "n"], ["ذَكَرَ", "يَذْكُرُ", "اُذْكُرْ", "andı", "n"], ["عَبَدَ", "يَعْبُدُ", "اُعْبُدْ", "ibadet etti", "n"], ["طَلَبَ", "يَطْلُبُ", "اُطْلُبْ", "istedi", "n"],
  ["تَرَكَ", "يَتْرُكُ", "اُتْرُكْ", "bıraktı", "n"], ["حَضَرَ", "يَحْضُرُ", "اُحْضُرْ", "geldi", "n"], ["سَجَدَ", "يَسْجُدُ", "اُسْجُدْ", "secde etti", "n"], ["نَظَرَ", "يَنْظُرُ", "اُنْظُرْ", "baktı", "n"],
  ["دَرَسَ", "يَدْرُسُ", "اُدْرُسْ", "ders çalıştı", "n"], ["قَعَدَ", "يَقْعُدُ", "اُقْعُدْ", "oturdu", "n"], ["حَكَمَ", "يَحْكُمُ", "اُحْكُمْ", "hükmetti", "n"], ["رَزَقَ", "يَرْزُقُ", "اُرْزُقْ", "rızık verdi", "n"],
  ["ضَرَبَ", "يَضْرِبُ", "اِضْرِبْ", "vurdu", "d"], ["جَلَسَ", "يَجْلِسُ", "اِجْلِسْ", "oturdu", "d"], ["رَجَعَ", "يَرْجِعُ", "اِرْجِعْ", "döndü", "d"], ["غَسَلَ", "يَغْسِلُ", "اِغْسِلْ", "yıkadı", "d"],
  ["نَزَلَ", "يَنْزِلُ", "اِنْزِلْ", "indi", "d"], ["صَبَرَ", "يَصْبِرُ", "اِصْبِرْ", "sabretti", "d"], ["عَرَفَ", "يَعْرِفُ", "اِعْرِفْ", "tanıdı", "d"], ["حَمَلَ", "يَحْمِلُ", "اِحْمِلْ", "taşıdı", "d"],
  ["غَفَرَ", "يَغْفِرُ", "اِغْفِرْ", "bağışladı", "d"], ["كَسَبَ", "يَكْسِبُ", "اِكْسِبْ", "kazandı", "d"], ["مَلَكَ", "يَمْلِكُ", "اِمْلِكْ", "sahip oldu", "d"], ["كَسَرَ", "يَكْسِرُ", "اِكْسِرْ", "kırdı", "d"],
  ["هَبَطَ", "يَهْبِطُ", "اِهْبِطْ", "indi", "d"], ["وَجَدَ", "يَجِدُ", "جِدْ", "buldu", "d"], ["وَعَدَ", "يَعِدُ", "عِدْ", "söz verdi", "d"], ["وَصَلَ", "يَصِلُ", "صِلْ", "vardı", "d"],
  ["فَتَحَ", "يَفْتَحُ", "اِفْتَحْ", "açtı", "f"], ["ذَهَبَ", "يَذْهَبُ", "اِذْهَبْ", "gitti", "f"], ["جَعَلَ", "يَجْعَلُ", "اِجْعَلْ", "kıldı", "f"], ["مَنَعَ", "يَمْنَعُ", "اِمْنَعْ", "engelledi", "f"],
  ["سَأَلَ", "يَسْأَلُ", "اِسْأَلْ", "sordu", "f"], ["قَرَأَ", "يَقْرَأُ", "اِقْرَأْ", "okudu", "f"], ["زَرَعَ", "يَزْرَعُ", "اِزْرَعْ", "ekti", "f"], ["جَمَعَ", "يَجْمَعُ", "اِجْمَعْ", "topladı", "f"],
  ["نَفَعَ", "يَنْفَعُ", "اِنْفَعْ", "fayda verdi", "f"], ["بَعَثَ", "يَبْعَثُ", "اِبْعَثْ", "gönderdi", "f"], ["نَجَحَ", "يَنْجَحُ", "اِنْجَحْ", "başardı", "f"], ["ذَبَحَ", "يَذْبَحُ", "اِذْبَحْ", "kesti", "f"],
  ["رَكَعَ", "يَرْكَعُ", "اِرْكَعْ", "rükû etti", "f"], ["دَفَعَ", "يَدْفَعُ", "اِدْفَعْ", "itti, ödedi", "f"], ["طَبَخَ", "يَطْبَخُ", "اِطْبَخْ", "pişirdi", "f"], ["صَنَعَ", "يَصْنَعُ", "اِصْنَعْ", "yaptı", "f"],
  ["شَرَحَ", "يَشْرَحُ", "اِشْرَحْ", "açıkladı", "f"], ["بَحَثَ", "يَبْحَثُ", "اِبْحَثْ", "araştırdı", "f"], ["وَضَعَ", "يَضَعُ", "ضَعْ", "koydu", "f"],
  ["عَلِمَ", "يَعْلَمُ", "اِعْلَمْ", "bildi", "a"], ["فَهِمَ", "يَفْهَمُ", "اِفْهَمْ", "anladı", "a"], ["شَرِبَ", "يَشْرَبُ", "اِشْرَبْ", "içti", "a"], ["سَمِعَ", "يَسْمَعُ", "اِسْمَعْ", "duydu", "a"],
  ["فَرِحَ", "يَفْرَحُ", "اِفْرَحْ", "sevindi", "a"], ["حَزِنَ", "يَحْزَنُ", "اِحْزَنْ", "üzüldü", "a"], ["لَعِبَ", "يَلْعَبُ", "اِلْعَبْ", "oynadı", "a"], ["رَكِبَ", "يَرْكَبُ", "اِرْكَبْ", "bindi", "a"],
  ["عَمِلَ", "يَعْمَلُ", "اِعْمَلْ", "çalıştı", "a"], ["حَفِظَ", "يَحْفَظُ", "اِحْفَظْ", "ezberledi", "a"], ["حَمِدَ", "يَحْمَدُ", "اِحْمَدْ", "hamdetti", "a"], ["ضَحِكَ", "يَضْحَكُ", "اِضْحَكْ", "güldü", "a"],
  ["تَعِبَ", "يَتْعَبُ", "اِتْعَبْ", "yoruldu", "a"], ["غَضِبَ", "يَغْضَبُ", "اِغْضَبْ", "kızdı", "a"], ["رَحِمَ", "يَرْحَمُ", "اِرْحَمْ", "merhamet etti", "a"], ["صَعِدَ", "يَصْعَدُ", "اِصْعَدْ", "yukarı çıktı", "a"], ["قَبِلَ", "يَقْبَلُ", "اِقْبَلْ", "kabul etti", "a"],
  ["حَسُنَ", "يَحْسُنُ", "اُحْسُنْ", "güzel oldu", "h"], ["كَرُمَ", "يَكْرُمُ", "اُكْرُمْ", "cömert oldu", "h"], ["كَبُرَ", "يَكْبُرُ", "اُكْبُرْ", "büyük oldu", "h"], ["صَغُرَ", "يَصْغُرُ", "اُصْغُرْ", "küçük oldu", "h"],
  ["كَثُرَ", "يَكْثُرُ", "اُكْثُرْ", "çoğaldı", "h"], ["قَرُبَ", "يَقْرُبُ", "اُقْرُبْ", "yakın oldu", "h"], ["بَعُدَ", "يَبْعُدُ", "اُبْعُدْ", "uzak oldu", "h"], ["شَرُفَ", "يَشْرُفُ", "اُشْرُفْ", "şerefli oldu", "h"],
  ["عَظُمَ", "يَعْظُمُ", "اُعْظُمْ", "büyük oldu", "h"], ["سَهُلَ", "يَسْهُلُ", "اُسْهُلْ", "kolay oldu", "h"], ["صَعُبَ", "يَصْعُبُ", "اُصْعُبْ", "zor oldu", "h"], ["ثَقُلَ", "يَثْقُلُ", "اُثْقُلْ", "ağır oldu", "h"], ["شَجُعَ", "يَشْجُعُ", "اُشْجُعْ", "cesur oldu", "h"],
  ["حَسِبَ", "يَحْسِبُ", "اِحْسِبْ", "sandı", "hs"], ["وَرِثَ", "يَرِثُ", "رِثْ", "mirasçı oldu", "hs"], ["وَثِقَ", "يَثِقُ", "ثِقْ", "güvendi", "hs"], ["وَرِعَ", "يَرِعُ", "رِعْ", "haramdan sakındı", "hs"], ["وَمِقَ", "يَمِقُ", "مِقْ", "sevdi", "hs"]
].map(function (v, i) { return { m: v[0], u: v[1], e: v[2], tr: v[3], b: v[4], i: i }; });
var V_BY = {}; VERBS.forEach(function (v) { V_BY[v.m] = v; });
function vb(m) { return V_BY[m]; }
// Muzâri ve emir seçenekleri
var ORD = ["u", "i", "a"];
function muzOpts(v) { return ORD.map(function (x) { return swapAyn(v.u, x); }); }
function emirOpts(v) {
  var e = v.e, cur = BAB[v.b].u, out = [e];
  if (e.charAt(0) === "ا") out.push((e.charAt(1) === "ُ" ? "اِ" : "اُ") + e.slice(2), swapAyn(e, cur === "u" ? "i" : "u"));
  else ORD.filter(function (x) { return x !== cur; }).forEach(function (x) { out.push(swapAyn(e, x)); });
  return out;
}
function rot(a, k) { k = k % a.length; return a.slice(k).concat(a.slice(0, k)); }
function babWhy(v) { var b = BAB[v.b]; return v.m + " " + v.u + ": " + HR_KISA[b.m] + " · " + HR_KISA[b.u] + " → " + b.no + ". bâb, " + b.ad + "."; }

function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function bigAyn(w, tr) { return '<span class="ar" style="font-size:1.9rem">' + aynHtml(w) + '</span>' + (tr ? ' <small class="muted">(' + tr + ')</small>' : ''); }
// Mâzi → muzâri + bâb (kombine)
function MB(m, keys) {
  var v = vb(m), ki = ORD.indexOf(BAB[v.b].u);
  return CB(v.m + ' <span class="muted" style="font-size:.8em">(' + v.tr + ')</span>', [muzOpts(v), "←", keys.map(function (k) { return BAB[k].ex + " بَابُ"; })], [ki, keys.indexOf(v.b)], v.m + " " + v.u + " (" + v.tr + ")", babWhy(v));
}
// Mâzi → muzâri → emir
function ME(m, k) {
  var v = vb(m), mo = muzOpts(v), eo = rot(emirOpts(v), k);
  return CB(v.m + ' <span class="muted" style="font-size:.8em">(' + v.tr + ')</span>', [mo, "←", eo], [ORD.indexOf(BAB[v.b].u), eo.indexOf(v.e)], v.m + " → " + v.u + " → " + v.e, "Muzâride ayn " + HR_KISA[BAB[v.b].u] + (v.e.charAt(0) === "ا" ? "; emrin hemzesi " + (BAB[v.b].u === "u" ? "ötre (اُ)." : "esre (اِ).") : "; misâl fiilde vav düştüğü için emir hemzesiz: " + v.e + "."));
}

var UNITS = [
// ---------------------------------------------------------------- 1 · BÂB NEDİR
{
  id: "u1", no: 1, ar: "مَا هُوَ البَابُ؟", tr: "Bâb Nedir? Ayn Harekesi", short: "Bâb nedir?", col: "mus", legend: ["cerr", "ref", "mz", "nasb", "mi", "mun"],
  goals: ["Bâbın, mâzi ile muzârinin ayn harekesinden oluşan bir kalıp olduğunu anlamak", "Mâzide ve muzâride ayn harfini bulup harekesini söylemek", "Altı bâbı sırasıyla ve harekeleriyle ezberlemek: üstün-ötre, üstün-esre, üstün-üstün, esre-üstün, ötre-ötre, esre-esre"],
  examples: [
    { s: "نَصَرَ:cerr / يَنْصُرُ:cerr", tr: "1 · üstün → ötre", pair: "ضَرَبَ:ref / يَضْرِبُ:ref", pairTr: "2 · üstün → esre" },
    { s: "فَتَحَ:mz / يَفْتَحُ:mz", tr: "3 · üstün → üstün", pair: "عَلِمَ:nasb / يَعْلَمُ:nasb", pairTr: "4 · esre → üstün" },
    { s: "حَسُنَ:mi / يَحْسُنُ:mi", tr: "5 · ötre → ötre", pair: "حَسِبَ:mun / يَحْسِبُ:mun", pairTr: "6 · esre → esre" }
  ],
  rules: [
    { tr: "<b>Bâb</b> (<span class=\"ar\">بَابٌ</span>) \"kapı\" demektir. Üç harfli kök fiiller (sülâsî mücerred) altı kapıdan birine girer." },
    { tr: "Fiilin harflerine <b>fâ, ayn, lâm</b> denir (<span class=\"ar\">فَعَلَ</span>). Bâbı belirleyen, ortadaki <b>ayn</b> harfinin harekesidir: önce mâzide, sonra muzâride.", ex: ["نَ<b>صَ</b>رَ", "يَنْ<b>صُ</b>رُ"] },
    { tr: "Altı bâb ve harekeleri (mâzi · muzâri): <b class=\"r-cerr\">1. Nasara</b> üstün·ötre, <b class=\"r-ref\">2. Daraba</b> üstün·esre, <b class=\"r-mz\">3. Fetaha</b> üstün·üstün, <b class=\"r-nasb\">4. Alime</b> esre·üstün, <b class=\"r-mi\">5. Hasune</b> ötre·ötre, <b class=\"r-mun\">6. Hasibe</b> esre·esre." },
    { tr: "Ezber satırı: <span class=\"ar\">نَصَرَ يَنْصُرُ، ضَرَبَ يَضْرِبُ، فَتَحَ يَفْتَحُ، عَلِمَ يَعْلَمُ، حَسُنَ يَحْسُنُ، حَسِبَ يَحْسِبُ</span>." },
    { tr: "Bâbı bilmek, mâziden muzâri ve emri doğru yapmayı sağlar. Mâzisi üstünlü üç bâb vardır; muzârinin harekesi mâziden tahmin edilemez, bâbını bilmek gerekir." },
    { tr: "Dokuz ihtimalden yalnız altısı kullanılır. Ötreli mâzinin muzârisi her zaman ötrelidir." }
  ],
  kaide: [
    "أَبْوَابُ الفِعْلِ الثُّلَاثِيِّ المُجَرَّدِ سِتَّةٌ، وَتُعْرَفُ بِحَرَكَةِ عَيْنِ الفِعْلِ فِي المَاضِي وَالمُضَارِعِ.",
    "البَابُ الأَوَّلُ: فَعَلَ يَفْعُلُ، نَحْوُ: نَصَرَ يَنْصُرُ. البَابُ الثَّانِي: فَعَلَ يَفْعِلُ، نَحْوُ: ضَرَبَ يَضْرِبُ. البَابُ الثَّالِثُ: فَعَلَ يَفْعَلُ، نَحْوُ: فَتَحَ يَفْتَحُ.",
    "البَابُ الرَّابِعُ: فَعِلَ يَفْعَلُ، نَحْوُ: عَلِمَ يَعْلَمُ. البَابُ الخَامِسُ: فَعُلَ يَفْعُلُ، نَحْوُ: حَسُنَ يَحْسُنُ. البَابُ السَّادِسُ: فَعِلَ يَفْعِلُ، نَحْوُ: حَسِبَ يَحْسِبُ."
  ],
  ex: [
    { type: "classify", opts: HRK_OPTS, ar: "مَا حَرَكَةُ عَيْنِ المَاضِي؟", tr: "Mâzinin ortadaki harfi (ayn, renkli) hangi harekeyi taşıyor?", items: ["نَصَرَ", "عَلِمَ", "حَسُنَ", "فَتَحَ", "شَرِبَ", "كَرُمَ", "حَسِبَ", "جَلَسَ"].map(function (m) {
      var v = vb(m); return { s: bigAyn(v.m, v.tr), a: BAB[v.b].m, why: "Ayn harfi " + harfler(v.m)[1] + ": " + HR_TR[BAB[v.b].m] + "." };
    })},
    { type: "classify", opts: HRK_OPTS, ar: "مَا حَرَكَةُ عَيْنِ المُضَارِعِ؟", tr: "Muzâride ayn harfi (renkli) hangi harekeyi taşıyor? Baştaki muzâri harfini ve sakin fâyı atla.", items: ["يَنْصُرُ", "يَضْرِبُ", "يَفْتَحُ", "يَعْلَمُ", "يَحْسُنُ", "يَحْسِبُ", "يَجْلِسُ", "يَكْتُبُ"].map(function (u) {
      var v = VERBS.filter(function (x) { return x.u === u; })[0]; return { s: bigAyn(u, v.m), a: BAB[v.b].u, why: v.m + " → " + u + ": muzâride ayn " + HR_TR[BAB[v.b].u] + "." };
    })},
    { type: "classify", opts: BAB_OPTS, ar: "مِنْ أَيِّ بَابٍ هَذَا الفِعْلُ؟", tr: "Mâzi ve muzârinin ayn harekelerine bak: fiil hangi bâbdan?", items: ["كَتَبَ", "جَلَسَ", "ذَهَبَ", "فَهِمَ", "كَرُمَ", "وَرِثَ", "رَجَعَ", "سَمِعَ"].map(function (m) {
      var v = vb(m); return { s: '<span class="ar" style="font-size:1.8rem">' + aynHtml(v.m) + ' · ' + aynHtml(v.u) + '</span> <small class="muted">(' + v.tr + ')</small>', a: v.b, why: babWhy(v) };
    })}
  ]
},
// ---------------------------------------------------------------- 2 · ÜSTÜNLÜ MÂZİ
{
  id: "u2", no: 2, ar: "فَعَلَ: نَصَرَ، ضَرَبَ، فَتَحَ", tr: "Üstünlü Mâzi: Nasara, Daraba, Fetaha", short: "Üstünlü mâzi", col: "cerr", legend: ["cerr", "ref", "mz"],
  goals: ["Mâzisi üstünlü (فَعَلَ) fiilin üç bâba gidebildiğini görmek", "Fetaha bâbının şartını bilmek: ayn ya da lâm boğaz harfi", "Muzâriyi duyunca bâbı söylemek: يَكْتُبُ → Nasara, يَجْلِسُ → Daraba, يَذْهَبُ → Fetaha"],
  examples: [
    { s: "كَتَبَ:cerr / يَكْتُبُ:cerr", tr: "yazdı · yazıyor", pair: "جَلَسَ:ref / يَجْلِسُ:ref", pairTr: "oturdu · oturuyor" },
    { s: "ذَهَبَ:mz / يَذْهَبُ:mz", tr: "gitti · gidiyor (ayn: ه)", pair: "قَرَأَ:mz / يَقْرَأُ:mz", pairTr: "okudu · okuyor (lâm: ء)" },
    { s: "دَخَلَ:cerr / يَدْخُلُ:cerr", tr: "girdi: ayn خ boğaz harfi ama Nasara", pair: "رَجَعَ:ref / يَرْجِعُ:ref", pairTr: "döndü: lâm ع boğaz harfi ama Daraba" }
  ],
  rules: [
    { tr: "Mâzisi <span class=\"ar\">فَعَلَ</span> olan fiil üç bâbdan birine girer: muzâride ayn <b class=\"r-cerr\">ötre</b> (Nasara), <b class=\"r-ref\">esre</b> (Daraba) ya da <b class=\"r-mz\">üstün</b> (Fetaha).", ex: ["يَنْصُرُ", "يَضْرِبُ", "يَفْتَحُ"] },
    { tr: "<b class=\"r-mz\">Fetaha</b> bâbında ayn ya da lâm harfi <b>boğaz harfi</b> (<span class=\"ar\">حُرُوفُ الحَلْقِ</span>) olur.", ex: ["ء", "ه", "ع", "ح", "غ", "خ"] },
    { tr: "Bu şart gereklidir ama yetmez: <span class=\"ar\">دَخَلَ يَدْخُلُ</span> (Nasara) ve <span class=\"ar\">رَجَعَ يَرْجِعُ</span> (Daraba) boğaz harfli olduğu hâlde Fetaha değildir. Boğaz harfi yoksa ise fiil Fetaha olamaz." },
    { tr: "Vavla başlayan misâl fiiller çoğunlukla <b class=\"r-ref\">Daraba</b>dır; muzâride vav düşer: <span class=\"ar\">وَجَدَ يَجِدُ، وَعَدَ يَعِدُ، وَصَلَ يَصِلُ</span>. Boğaz harfliyse Fetaha olur: <span class=\"ar\">وَضَعَ يَضَعُ</span>." },
    { tr: "Bu üç bâbın mâzisi aynı göründüğü için muzâriyi sözlükten ya da kulaktan öğrenmek gerekir. Muzâriyi öğrenince bâb da öğrenilmiş olur." }
  ],
  kaide: [
    "يَكُونُ عَيْنُ المَاضِي مَفْتُوحًا فِي ثَلَاثَةِ أَبْوَابٍ: فَعَلَ يَفْعُلُ (نَصَرَ يَنْصُرُ)، فَعَلَ يَفْعِلُ (ضَرَبَ يَضْرِبُ)، فَعَلَ يَفْعَلُ (فَتَحَ يَفْتَحُ).",
    "لَا يَأْتِي بَابُ فَتَحَ يَفْتَحُ إِلَّا إِذَا كَانَتْ عَيْنُهُ أَوْ لَامُهُ حَرْفًا مِنْ حُرُوفِ الحَلْقِ، وَهِيَ: الهَمْزَةُ، وَالهَاءُ، وَالعَيْنُ، وَالحَاءُ، وَالغَيْنُ، وَالخَاءُ."
  ],
  ex: [
    { type: "combo", ar: "اخْتَرِ المُضَارِعَ ثُمَّ البَابَ", tr: "Kutulara dokun: önce muzâriyi, sonra bâbı seç.", exHtml: "<span class=\"ar\">كَتَبَ ← يَكْتُبُ ← نَصَرَ بَابُ</span>", items: ["نَظَرَ", "نَزَلَ", "جَعَلَ", "دَخَلَ", "رَجَعَ", "سَأَلَ", "شَكَرَ", "غَسَلَ", "زَرَعَ"].map(function (m) { return MB(m, ["n", "d", "f"]); }) },
    { type: "pick", ar: "أَيُّ الأَفْعَالِ لَا يَكُونُ مِنْ بَابِ فَتَحَ؟", tr: "Hangisi Fetaha bâbından olamaz? Ayn ve lâm harflerinde boğaz harfi (ء ه ع ح غ خ) ara.", items: [
      { q: "", o: ["ذَهَبَ", "نَصَرَ", "فَتَحَ"], a: 1, why: "نَصَرَ: ص ve ر boğaz harfi değil. ذَهَبَ'de ه, فَتَحَ'de ح var.", tr: "" },
      { q: "", o: ["كَتَبَ", "سَأَلَ", "مَنَعَ"], a: 0, why: "كَتَبَ: ت ve ب boğaz harfi değil.", tr: "" },
      { q: "", o: ["قَرَأَ", "جَعَلَ", "جَلَسَ"], a: 2, why: "جَلَسَ: ل ve س boğaz harfi değil.", tr: "" },
      { q: "", o: ["ضَرَبَ", "بَحَثَ", "زَرَعَ"], a: 0, why: "ضَرَبَ: ر ve ب. Fâ harfi ض zaten sayılmaz.", tr: "" },
      { q: "", o: ["طَبَخَ", "نَزَلَ", "ذَبَحَ"], a: 1, why: "نَزَلَ: ز ve ل boğaz harfi değil.", tr: "" },
      { q: "", o: ["غَسَلَ", "دَفَعَ", "صَنَعَ"], a: 0, why: "غَسَلَ: غ boğaz harfi ama fâ yerinde; ayn ve lâmda yok. Bu yüzden Daraba: يَغْسِلُ.", tr: "" }
    ]},
    { type: "classify", opts: bOpts(["n", "d", "f"]), ar: "مِنْ أَيِّ بَابٍ الفِعْلُ المُضَارِعُ؟", tr: "Cümledeki muzâriye bak: Nasara mı, Daraba mı, Fetaha mı?", items: [
      { s: HL("يَكْتُبُ الطَّالِبُ الدَّرْسَ.", "يَكْتُبُ"), a: "n", why: "يَكْتُبُ: ayn ötre.", tr: "Öğrenci dersi yazıyor." },
      { s: HL("يَجْلِسُ المُعَلِّمُ عَلَى الكُرْسِيِّ.", "يَجْلِسُ"), a: "d", why: "يَجْلِسُ: ayn esre.", tr: "Öğretmen sandalyede oturuyor." },
      { s: HL("يَذْهَبُ أَحْمَدُ إِلَى المَسْجِدِ.", "يَذْهَبُ"), a: "f", why: "يَذْهَبُ: ayn üstün; ayn harfi ه.", tr: "Ahmed mescide gidiyor." },
      { s: HL("يَدْخُلُ الضَّيْفُ البَيْتَ.", "يَدْخُلُ"), a: "n", why: "Tuzak: ayn خ boğaz harfi ama muzâri ötreli: Nasara.", tr: "Misafir eve giriyor." },
      { s: HL("يَرْجِعُ الأَبُ مِنَ العَمَلِ.", "يَرْجِعُ"), a: "d", why: "Tuzak: lâm ع boğaz harfi ama muzâri esreli: Daraba.", tr: "Baba işten dönüyor." },
      { s: HL("يَفْتَحُ الوَلَدُ البَابَ.", "يَفْتَحُ"), a: "f", why: "يَفْتَحُ: ayn üstün; lâm ح.", tr: "Çocuk kapıyı açıyor." },
      { s: HL("يَغْسِلُ الطِّفْلُ يَدَيْهِ.", "يَغْسِلُ"), a: "d", why: "يَغْسِلُ: ayn esre.", tr: "Çocuk ellerini yıkıyor." },
      { s: HL("يَشْكُرُ المُؤْمِنُ رَبَّهُ.", "يَشْكُرُ"), a: "n", why: "يَشْكُرُ: ayn ötre.", tr: "Mümin Rabbine şükrediyor." },
      { s: HL("يَزْرَعُ الفَلَّاحُ القَمْحَ.", "يَزْرَعُ"), a: "f", why: "يَزْرَعُ: ayn üstün; lâm ع.", tr: "Çiftçi buğday ekiyor." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · ESRELİ VE ÖTRELİ MÂZİ
{
  id: "u3", no: 3, ar: "فَعِلَ وَفَعُلَ: عَلِمَ، حَسُنَ، حَسِبَ", tr: "Esreli ve Ötreli Mâzi: Alime, Hasune, Hasibe", short: "Esreli · ötreli", col: "nasb", legend: ["nasb", "mi", "mun"],
  goals: ["Esreli mâzinin (فَعِلَ) iki bâba, ötreli mâzinin (فَعُلَ) tek bâba gittiğini bilmek", "Hasune bâbının kalıcı vasıf bildirdiğini ve mef’ûl almadığını görmek", "Hasibe bâbının az fiilli olduğunu, çoğunun misâl olduğunu bilmek: وَرِثَ يَرِثُ"],
  examples: [
    { s: "فَرِحَ:nasb / يَفْرَحُ:nasb", tr: "sevindi · seviniyor", pair: "شَرِبَ:nasb / يَشْرَبُ:nasb", pairTr: "içti · içiyor" },
    { s: "كَرُمَ:mi / يَكْرُمُ:mi", tr: "cömert oldu · cömert oluyor", pair: "كَثُرَ:mi / يَكْثُرُ:mi", pairTr: "çoğaldı · çoğalıyor" },
    { s: "وَرِثَ:mun / يَرِثُ:mun", tr: "mirasçı oldu · mirasçı oluyor", pair: "وَثِقَ:mun / يَثِقُ:mun", pairTr: "güvendi · güveniyor" }
  ],
  rules: [
    { tr: "Mâzisi <span class=\"ar\">فَعِلَ</span> (esreli) olan fiil çoğunlukla <b class=\"r-nasb\">Alime</b>dir (muzâri üstün), azı <b class=\"r-mun\">Hasibe</b>dir (muzâri esre).", ex: ["عَلِمَ يَعْلَمُ", "حَسِبَ يَحْسِبُ"] },
    { tr: "<b class=\"r-nasb\">Alime</b> bâbında duygu, hâl, bilgi ve hastalık bildiren fiiller çoktur.", ex: ["فَرِحَ", "حَزِنَ", "فَهِمَ", "تَعِبَ"] },
    { tr: "Mâzisi <span class=\"ar\">فَعُلَ</span> (ötreli) olan fiil her zaman <b class=\"r-mi\">Hasune</b>dir: muzâri de ötreli olur.", ex: ["حَسُنَ يَحْسُنُ", "كَرُمَ يَكْرُمُ"] },
    { tr: "<b class=\"r-mi\">Hasune</b> kalıcı vasıf ve tabiat bildirir (güzel oldu, cömert oldu, büyük oldu). Bu fiiller <b>lâzımdır</b>, mef’ûl bih almaz. Sıfatları genelde <span class=\"ar\">فَعِيلٌ، فَعَلٌ</span> kalıbındadır: <span class=\"ar\">كَرِيمٌ، حَسَنٌ</span>." },
    { tr: "<b class=\"r-mun\">Hasibe</b> bâbının fiili azdır; çoğu vavla başlayan misâldir. Vav muzâride düşer, ayn esre kalır: <span class=\"ar\">وَرِثَ يَرِثُ، وَثِقَ يَثِقُ</span>." },
    { tr: "Not: Kur’an’da (Hafs kıraati) <span class=\"ar\">حَسِبَ</span>'in muzârisi <span class=\"ar\">يَحْسَبُ</span> okunur; başka kıraatlerde <span class=\"ar\">يَحْسِبُ</span>. Bâbın adı yine <span class=\"ar\">حَسِبَ يَحْسِبُ</span>'dir." }
  ],
  kaide: [
    "يَكُونُ عَيْنُ المَاضِي مَكْسُورًا فِي بَابَيْنِ: فَعِلَ يَفْعَلُ (عَلِمَ يَعْلَمُ) وَهُوَ كَثِيرٌ، وَفَعِلَ يَفْعِلُ (حَسِبَ يَحْسِبُ) وَهُوَ قَلِيلٌ، وَأَكْثَرُهُ مِنَ المِثَالِ الوَاوِيِّ: وَرِثَ يَرِثُ.",
    "وَيَكُونُ عَيْنُ المَاضِي مَضْمُومًا فِي بَابٍ وَاحِدٍ: فَعُلَ يَفْعُلُ (حَسُنَ يَحْسُنُ)، وَهُوَ لِلصِّفَاتِ وَالطَّبَائِعِ، وَلَا يَكُونُ إِلَّا لَازِمًا."
  ],
  ex: [
    { type: "combo", ar: "اخْتَرِ المُضَارِعَ ثُمَّ البَابَ", tr: "Kutulara dokun: önce muzâriyi, sonra bâbı seç.", exHtml: "<span class=\"ar\">عَلِمَ ← يَعْلَمُ ← عَلِمَ بَابُ</span>", items: ["شَرِبَ", "فَرِحَ", "حَفِظَ", "حَسُنَ", "كَثُرَ", "قَرُبَ", "حَسِبَ", "وَرِثَ", "وَثِقَ"].map(function (m) { return MB(m, ["a", "h", "hs"]); }) },
    { type: "classify", opts: bOpts(["a", "h", "hs"]), ar: "مِنْ أَيِّ بَابٍ الفِعْلُ؟", tr: "Koyu fiil Alime mi, Hasune mi, Hasibe mi?", items: [
      { s: HL("يَفْرَحُ الطِّفْلُ بِالهَدِيَّةِ.", "يَفْرَحُ"), a: "a", why: "فَرِحَ يَفْرَحُ: esre · üstün.", tr: "Çocuk hediyeye seviniyor." },
      { s: HL("حَسُنَ خُلُقُ الوَلَدِ.", "حَسُنَ"), a: "h", why: "حَسُنَ يَحْسُنُ: ötre · ötre.", tr: "Çocuğun ahlâkı güzelleşti." },
      { s: HL("وَرِثَ الابْنُ مَالَ أَبِيهِ.", "وَرِثَ"), a: "hs", why: "وَرِثَ يَرِثُ: esre · esre.", tr: "Oğul babasının malına mirasçı oldu." },
      { s: HL("يَثِقُ المُؤْمِنُ بِرَبِّهِ.", "يَثِقُ"), a: "hs", why: "وَثِقَ يَثِقُ: vav düştü, ayn esre.", tr: "Mümin Rabbine güvenir." },
      { s: HL("يَشْرَبُ الوَلَدُ اللَّبَنَ.", "يَشْرَبُ"), a: "a", why: "شَرِبَ يَشْرَبُ: esre · üstün.", tr: "Çocuk süt içiyor." },
      { s: HL("كَثُرَ المَطَرُ فِي الشِّتَاءِ.", "كَثُرَ"), a: "h", why: "Ötreli mâzi: her zaman Hasune.", tr: "Kışın yağmur çoğaldı." },
      { s: HL("يَحْفَظُ الطَّالِبُ القُرْآنَ.", "يَحْفَظُ"), a: "a", why: "حَفِظَ يَحْفَظُ: esre · üstün.", tr: "Öğrenci Kur’an’ı ezberliyor." },
      { s: HL("قَرُبَ وَقْتُ الصَّلَاةِ.", "قَرُبَ"), a: "h", why: "قَرُبَ يَقْرُبُ: ötre · ötre.", tr: "Namaz vakti yaklaştı." }
    ]},
    { type: "pick", ar: "اخْتَرِ المَاضِيَ الصَّحِيحَ", tr: "Anlama uyan mâzi hangisi? Ayn harekesine dikkat.", items: [
      { q: "güzel oldu", o: ["حَسَنَ", "حَسُنَ", "حَسِنَ"], a: 1, why: "Kalıcı vasıf: Hasune, حَسُنَ.", tr: "" },
      { q: "bildi", o: ["عَلِمَ", "عَلُمَ", "عَلَمَ"], a: 0, why: "عَلِمَ يَعْلَمُ: Alime.", tr: "" },
      { q: "cömert oldu", o: ["كَرِمَ", "كَرَمَ", "كَرُمَ"], a: 2, why: "Kalıcı vasıf: كَرُمَ (Hasune).", tr: "" },
      { q: "sevindi", o: ["فَرُحَ", "فَرِحَ", "فَرَحَ"], a: 1, why: "Duygu: فَرِحَ (Alime).", tr: "" },
      { q: "mirasçı oldu", o: ["وَرِثَ", "وَرُثَ", "وَرَثَ"], a: 0, why: "وَرِثَ يَرِثُ: Hasibe.", tr: "" },
      { q: "çoğaldı", o: ["كَثِرَ", "كَثَرَ", "كَثُرَ"], a: 2, why: "كَثُرَ يَكْثُرُ: Hasune.", tr: "" }
    ]},
    { type: "pick", ar: "أَيُّ الأَفْعَالِ يَأْخُذُ مَفْعُولًا بِهِ؟", tr: "Hasune lâzımdır. Hangi fiil mef’ûl bih alabilir?", items: [
      { q: "", o: ["كَرُمَ", "شَرِبَ", "حَسُنَ"], a: 1, why: "شَرِبَ المَاءَ (suyu içti). Hasune fiilleri mef’ûl almaz.", tr: "" },
      { q: "", o: ["فَهِمَ", "كَثُرَ", "قَرُبَ"], a: 0, why: "فَهِمَ الدَّرْسَ (dersi anladı).", tr: "" },
      { q: "", o: ["صَغُرَ", "عَظُمَ", "حَفِظَ"], a: 2, why: "حَفِظَ القُرْآنَ.", tr: "" },
      { q: "", o: ["وَرِثَ", "شَرُفَ", "بَعُدَ"], a: 0, why: "وَرِثَ المَالَ (mala mirasçı oldu).", tr: "" }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · MUZÂRİ VE EMİR
{
  id: "u4", no: 4, ar: "المُضَارِعُ وَالأَمْرُ مِنَ الأَبْوَابِ", tr: "Bâbdan Muzâri ve Emir Yapma", short: "Muzâri · emir", col: "mi", legend: ["cerr", "ref", "mz", "nasb", "mi", "mun"],
  goals: ["Bâbını bildiğin fiilin muzârisini ve emrini yapmak", "Emrin hemzesini muzârinin ayn harekesinden bulmak: ötre → اُ, üstün ya da esre → اِ", "Sözlükteki bâb işaretini okumak: كَتَبَ ـُ"],
  examples: [
    { s: "اُنْصُرْ:cerr / أَخَاكَ:-", tr: "Kardeşine yardım et.", pair: "اِجْلِسْ:ref / هُنَا:-", pairTr: "Buraya otur." },
    { s: "اِفْتَحْ:mz / البَابَ:-", tr: "Kapıyı aç.", pair: "اِعْلَمْ:nasb / ذَلِكَ:-", pairTr: "Bunu bil." },
    { s: "ثِقْ:mun / بِاللهِ:-", tr: "Allah’a güven.", pair: "جِدْ:ref / الطَّرِيقَ:-", pairTr: "Yolu bul." }
  ],
  rules: [
    { tr: "Muzâri: başa <span class=\"ar\">يَـ</span> gelir, fâ sakin olur, ayn bâbın harekesini alır.", ex: ["نَصَرَ ← يَنْصُرُ", "ضَرَبَ ← يَضْرِبُ", "فَتَحَ ← يَفْتَحُ"] },
    { tr: "Emir muzâriden yapılır: baştaki harf atılır, son harf sakin olur; ilk harf sakin kaldığı için başa hemze gelir." },
    { tr: "Hemzenin harekesi muzârinin ayn harekesine bakar: <b>ötre ise اُ</b>, <b>üstün ya da esre ise اِ</b>.", ex: ["اُنْصُرْ", "اِضْرِبْ", "اِفْتَحْ", "اِعْلَمْ", "اِحْسِبْ"] },
    { tr: "Misâl fiilde muzâride vav düşer; ilk harf harekeli kaldığı için emirde hemze gerekmez.", ex: ["وَجَدَ يَجِدُ جِدْ", "وَضَعَ يَضَعُ ضَعْ", "وَثِقَ يَثِقُ ثِقْ"] },
    { tr: "Hasune bâbının emri kıyasen yapılır (<span class=\"ar\">اُحْسُنْ، اُكْرُمْ</span>) ama vasıf bildirdiği için nadiren kullanılır." },
    { tr: "Sözlükler bâbı mâzinin yanına küçük bir hareke koyarak gösterir: <span class=\"ar\">كَتَبَ ـُ</span> = يَكْتُبُ, <span class=\"ar\">جَلَسَ ـِ</span> = يَجْلِسُ, <span class=\"ar\">ذَهَبَ ـَ</span> = يَذْهَبُ." }
  ],
  kaide: [
    "يُصَاغُ المُضَارِعُ عَلَى حَسَبِ بَابِ الفِعْلِ، وَيُصَاغُ الأَمْرُ مِنَ المُضَارِعِ، فَإِذَا كَانَتْ عَيْنُ المُضَارِعِ مَضْمُومَةً ضُمَّتْ هَمْزَةُ الوَصْلِ، وَإِلَّا كُسِرَتْ: اُنْصُرْ، اِضْرِبْ، اِفْتَحْ، اِعْلَمْ.",
    "يُعْرَفُ بَابُ الفِعْلِ مِنَ المُعْجَمِ؛ فَإِنَّهُ يَضَعُ حَرَكَةَ عَيْنِ المُضَارِعِ بَعْدَ المَاضِي، نَحْوُ: كَتَبَ ـُ، جَلَسَ ـِ، ذَهَبَ ـَ."
  ],
  ex: [
    { type: "combo", ar: "حَوِّلِ المَاضِيَ إِلَى المُضَارِعِ وَالأَمْرِ", tr: "Önce muzâriyi, sonra ondan emri seç. Emrin hemzesine ve aynına dikkat.", exHtml: "<span class=\"ar\">نَصَرَ ← يَنْصُرُ ← اُنْصُرْ</span>", items: [["سَجَدَ", 1], ["صَبَرَ", 2], ["رَكَعَ", 0], ["حَفِظَ", 1], ["دَرَسَ", 2], ["حَمَلَ", 0], ["شَرَحَ", 1], ["سَمِعَ", 2], ["حَسِبَ", 0], ["وَجَدَ", 1]].map(function (x) { return ME(x[0], x[1]); }) },
    { type: "pick", ar: "اقْرَأْ عَلَامَةَ البَابِ فِي المُعْجَمِ", tr: "Sözlükte mâzinin yanındaki küçük hareke muzârinin ayn harekesidir. Muzâri hangisi?", items: [
      { q: "طَلَبَ ـُ", o: ["يَطْلِبُ", "يَطْلُبُ", "يَطْلَبُ"], a: 1, why: "ـُ: ayn ötre → Nasara.", tr: "istedi" },
      { q: "نَزَلَ ـِ", o: ["يَنْزِلُ", "يَنْزُلُ", "يَنْزَلُ"], a: 0, why: "ـِ: ayn esre → Daraba.", tr: "indi" },
      { q: "مَنَعَ ـَ", o: ["يَمْنُعُ", "يَمْنِعُ", "يَمْنَعُ"], a: 2, why: "ـَ: ayn üstün → Fetaha (lâm ع).", tr: "engelledi" },
      { q: "عَرَفَ ـِ", o: ["يَعْرُفُ", "يَعْرِفُ", "يَعْرَفُ"], a: 1, why: "ـِ: Daraba.", tr: "tanıdı" },
      { q: "حَكَمَ ـُ", o: ["يَحْكُمُ", "يَحْكِمُ", "يَحْكَمُ"], a: 0, why: "ـُ: Nasara.", tr: "hükmetti" },
      { q: "بَعَثَ ـَ", o: ["يَبْعُثُ", "يَبْعِثُ", "يَبْعَثُ"], a: 2, why: "ـَ: Fetaha (ayn ع).", tr: "gönderdi" }
    ]},
    { type: "pick", ar: "اخْتَرِ الأَمْرَ الصَّحِيحَ", tr: "Muzâriden yapılan doğru emir hangisi?", items: [
      { q: "يَدْخُلُ", o: ["اِدْخُلْ", "اُدْخُلْ", "اُدْخِلْ"], a: 1, why: "Ayn ötre → hemze ötre.", tr: "gir!" },
      { q: "يَرْجِعُ", o: ["اِرْجِعْ", "اُرْجِعْ", "اِرْجَعْ"], a: 0, why: "Ayn esre → hemze esre.", tr: "dön!" },
      { q: "يَذْهَبُ", o: ["اُذْهَبْ", "اِذْهُبْ", "اِذْهَبْ"], a: 2, why: "Ayn üstün → hemze esre.", tr: "git!" },
      { q: "يَفْهَمُ", o: ["اِفْهَمْ", "اُفْهُمْ", "اِفْهِمْ"], a: 0, why: "Alime: ayn üstün → اِ.", tr: "anla!" },
      { q: "يَضَعُ", o: ["اِضَعْ", "ضَعْ", "اُوضُعْ"], a: 1, why: "Vav düştü, ilk harf harekeli: hemze gerekmez.", tr: "koy!" },
      { q: "يَشْكُرُ", o: ["اِشْكُرْ", "اُشْكِرْ", "اُشْكُرْ"], a: 2, why: "Ayn ötre → اُ.", tr: "şükret!" }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · ÂYET VE METİN
{
  id: "u5", no: 5, ar: "الأَبْوَابُ فِي القُرْآنِ وَالنَّصِّ", tr: "Âyetlerde ve Metinde Altı Bâb", short: "Âyet · metin", col: "muz", legend: ["cerr", "ref", "mz", "nasb", "mi", "mun"],
  goals: ["Âyetlerde altı bâbın her birinden fiil görmek", "Bir metindeki fiillerin bâbını söylemek", "Ekli şekilden (نَصَرَكُمْ، فَتَحْنَا) mâziye ve bâba ulaşmak"],
  examples: [
    { s: "وَلَقَدْ:- / نَصَرَكُمُ:cerr / اللّٰهُ بِبَدْرٍ:-", tr: "Andolsun, Allah size Bedir’de yardım etti. (Âl-i İmrân 123)" },
    { s: "ضَرَبَ:ref / اللّٰهُ مَثَلًا:-", tr: "Allah bir misal verdi. (Nahl 75)" },
    { s: "إِنَّا:- / فَتَحْنَا:mz / لَكَ فَتْحًا مُبِينًا:-", tr: "Biz sana apaçık bir fetih verdik. (Fetih 1)" },
    { s: "عَلِمَ:nasb / اللّٰهُ أَنَّكُمْ:-", tr: "Allah biliyordu ki siz… (Bakara 187)" },
    { s: "وَحَسُنَ:mi / أُولٰئِكَ رَفِيقًا:-", tr: "Onlar ne güzel arkadaştır! (Nisâ 69)" },
    { s: "أَ:- / حَسِبَ:mun / النَّاسُ أَنْ يُتْرَكُوا:-", tr: "İnsanlar bırakılacaklarını mı sandı? (Ankebût 2)" }
  ],
  rules: [
    { tr: "Kur’an’da altı bâbın her birinden fiil vardır; bâbların adı olan fiiller de âyetlerde geçer: <span class=\"ar\">نَصَرَ، ضَرَبَ، فَتَحَ، عَلِمَ، حَسُنَ، حَسِبَ</span>." },
    { tr: "Ekli şekilde önce eki ayır: <span class=\"ar\">نَصَرَكُمْ ← نَصَرَ</span>, <span class=\"ar\">فَتَحْنَا ← فَتَحَ</span>, <span class=\"ar\">يَذْكُرُونَ ← يَذْكُرُ</span>." },
    { tr: "Emirden de bâb bulunur: <span class=\"ar\">اقْرَأْ</span> (üstün ayn) → Fetaha, <span class=\"ar\">فَاعْلَمْ</span> → Alime." },
    { tr: "Hikâyede bâb sorarken mâziyi ve muzâriyi birlikte düşün: <span class=\"ar\">جَلَسَ</span> → <span class=\"ar\">يَجْلِسُ</span> → Daraba." }
  ],
  kaide: ["الأَفْعَالُ فِي القُرْآنِ الكَرِيمِ تَأْتِي مِنَ الأَبْوَابِ السِّتَّةِ كُلِّهَا، فَاعْرِفْ بَابَ كُلِّ فِعْلٍ بِحَرَكَةِ عَيْنِهِ فِي المَاضِي وَالمُضَارِعِ."],
  ex: [
    { type: "classify", opts: BAB_OPTS, ar: "مِنْ أَيِّ بَابٍ الفِعْلُ فِي الآيَةِ؟", tr: "Âyetteki koyu fiil hangi bâbdan?", items: [
      { s: HL("وَلَقَدْ نَصَرَكُمُ اللّٰهُ بِبَدْرٍ", "نَصَرَكُمُ") + ' <small class="muted">(Âl-i İmrân 123)</small>', a: "n", why: "نَصَرَ يَنْصُرُ.", tr: "Andolsun, Allah size Bedir’de yardım etti." },
      { s: HL("الَّذِينَ يَذْكُرُونَ اللّٰهَ قِيَامًا وَقُعُودًا", "يَذْكُرُونَ") + ' <small class="muted">(Âl-i İmrân 191)</small>', a: "n", why: "ذَكَرَ يَذْكُرُ: muzâride ayn ötre.", tr: "Onlar ayakta ve otururken Allah’ı anarlar." },
      { s: HL("ضَرَبَ اللّٰهُ مَثَلًا", "ضَرَبَ") + ' <small class="muted">(Nahl 75)</small>', a: "d", why: "ضَرَبَ يَضْرِبُ: bâbın kendisi.", tr: "Allah bir misal verdi." },
      { s: HL("وَمَنْ يَغْفِرُ الذُّنُوبَ إِلَّا اللّٰهُ", "يَغْفِرُ") + ' <small class="muted">(Âl-i İmrân 135)</small>', a: "d", why: "غَفَرَ يَغْفِرُ: ayn esre.", tr: "Günahları Allah’tan başka kim bağışlar?" },
      { s: HL("إِنَّا فَتَحْنَا لَكَ فَتْحًا مُبِينًا", "فَتَحْنَا") + ' <small class="muted">(Fetih 1)</small>', a: "f", why: "فَتَحَ يَفْتَحُ.", tr: "Biz sana apaçık bir fetih verdik." },
      { s: HL("اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", "اقْرَأْ") + ' <small class="muted">(Alak 1)</small>', a: "f", why: "قَرَأَ يَقْرَأُ: emirde de ayn üstün.", tr: "Yaratan Rabbinin adıyla oku." },
      { s: HL("عَلِمَ اللّٰهُ أَنَّكُمْ كُنْتُمْ تَخْتَانُونَ أَنْفُسَكُمْ", "عَلِمَ") + ' <small class="muted">(Bakara 187)</small>', a: "a", why: "عَلِمَ يَعْلَمُ.", tr: "Allah, kendinize hıyanet ettiğinizi biliyordu." },
      { s: HL("فَاعْلَمْ أَنَّهُ لَا إِلٰهَ إِلَّا اللّٰهُ", "اعْلَمْ") + ' <small class="muted">(Muhammed 19)</small>', a: "a", why: "Emir اِعْلَمْ: muzâri يَعْلَمُ, Alime.", tr: "Bil ki Allah’tan başka ilah yoktur." },
      { s: HL("وَحَسُنَ أُولٰئِكَ رَفِيقًا", "حَسُنَ") + ' <small class="muted">(Nisâ 69)</small>', a: "h", why: "حَسُنَ يَحْسُنُ.", tr: "Onlar ne güzel arkadaştır!" },
      { s: HL("كَبُرَ مَقْتًا عِنْدَ اللّٰهِ", "كَبُرَ") + ' <small class="muted">(Saff 3)</small>', a: "h", why: "كَبُرَ يَكْبُرُ: ötreli mâzi.", tr: "Allah katında büyük bir öfke sebebidir." },
      { s: HL("أَحَسِبَ النَّاسُ أَنْ يُتْرَكُوا", "حَسِبَ") + ' <small class="muted">(Ankebût 2)</small>', a: "hs", why: "حَسِبَ: bâbın kendisi. (Hafs kıraatinde muzâri يَحْسَبُ okunur.)", tr: "İnsanlar bırakılacaklarını mı sandı?" },
      { s: HL("وَوَرِثَ سُلَيْمَانُ دَاوُودَ", "وَرِثَ") + ' <small class="muted">(Neml 16)</small>', a: "hs", why: "وَرِثَ يَرِثُ: misâl, Hasibe.", tr: "Süleyman Dâvûd’a vâris oldu." }
    ]},
    { type: "reading", ar: "اقْرَأِ القِطْعَةَ ثُمَّ بَيِّنْ أَبْوَابَ الأَفْعَالِ", tr: "Hikâyeyi oku, sonra fiillerin bâbını seç.", title: "يَوْمُ عَلِيٍّ",
      text: "خَرَجَ عَلِيٌّ مِنَ البَيْتِ صَبَاحًا، وَذَهَبَ إِلَى المَدْرَسَةِ. جَلَسَ فِي الصَّفِّ، وَفَتَحَ كِتَابَهُ، وَكَتَبَ الدَّرْسَ. فَهِمَ عَلِيٌّ الدَّرْسَ وَفَرِحَ كَثِيرًا. عَلِيٌّ وَلَدٌ طَيِّبٌ؛ حَسُنَ خَطُّهُ، وَكَرُمَ خُلُقُهُ. وَرِثَ حُبَّ العِلْمِ مِنْ أَبِيهِ، وَهُوَ يَثِقُ بِمُعَلِّمِهِ. رَجَعَ إِلَى البَيْتِ مَسَاءً، وَشَكَرَ رَبَّهُ.",
      textTr: "Ali’nin Günü. Ali sabah evden çıktı ve okula gitti. Sınıfta oturdu, kitabını açtı ve dersi yazdı. Ali dersi anladı ve çok sevindi. Ali iyi bir çocuk; yazısı güzelleşti, ahlâkı da cömert. İlim sevgisini babasından miras aldı ve öğretmenine güveniyor. Akşam eve döndü ve Rabbine şükretti.",
      qa: [
        { q: "مَاذَا فَعَلَ عَلِيٌّ فِي الصَّفِّ؟", a: "جَلَسَ، وَفَتَحَ كِتَابَهُ، وَكَتَبَ الدَّرْسَ.", tr: "Ali sınıfta ne yaptı? Oturdu, kitabını açtı, dersi yazdı." },
        { q: "مِمَّنْ وَرِثَ عَلِيٌّ حُبَّ العِلْمِ؟", a: "وَرِثَهُ مِنْ أَبِيهِ.", tr: "Ali ilim sevgisini kimden miras aldı? Babasından." },
        { q: "مَاذَا فَعَلَ فِي المَسَاءِ؟", a: "رَجَعَ إِلَى البَيْتِ وَشَكَرَ رَبَّهُ.", tr: "Akşam ne yaptı? Eve dönüp Rabbine şükretti." }
      ],
      cls: { opts: BAB_OPTS, ar: "بَيِّنْ بَابَ كُلِّ فِعْلٍ", tr: "Hikâyedeki koyu fiil hangi bâbdan?", items: [
        { s: HL("خَرَجَ عَلِيٌّ مِنَ البَيْتِ", "خَرَجَ"), a: "n", why: "خَرَجَ يَخْرُجُ." },
        { s: HL("وَذَهَبَ إِلَى المَدْرَسَةِ", "ذَهَبَ"), a: "f", why: "ذَهَبَ يَذْهَبُ (ayn ه)." },
        { s: HL("جَلَسَ فِي الصَّفِّ", "جَلَسَ"), a: "d", why: "جَلَسَ يَجْلِسُ." },
        { s: HL("وَفَتَحَ كِتَابَهُ", "فَتَحَ"), a: "f", why: "فَتَحَ يَفْتَحُ." },
        { s: HL("وَكَتَبَ الدَّرْسَ", "كَتَبَ"), a: "n", why: "كَتَبَ يَكْتُبُ." },
        { s: HL("فَهِمَ عَلِيٌّ الدَّرْسَ", "فَهِمَ"), a: "a", why: "فَهِمَ يَفْهَمُ." },
        { s: HL("وَفَرِحَ كَثِيرًا", "فَرِحَ"), a: "a", why: "فَرِحَ يَفْرَحُ: duygu." },
        { s: HL("حَسُنَ خَطُّهُ", "حَسُنَ"), a: "h", why: "حَسُنَ يَحْسُنُ." },
        { s: HL("وَكَرُمَ خُلُقُهُ", "كَرُمَ"), a: "h", why: "كَرُمَ يَكْرُمُ." },
        { s: HL("وَرِثَ حُبَّ العِلْمِ", "وَرِثَ"), a: "hs", why: "وَرِثَ يَرِثُ." },
        { s: HL("وَهُوَ يَثِقُ بِمُعَلِّمِهِ", "يَثِقُ"), a: "hs", why: "وَثِقَ يَثِقُ: vav düştü, ayn esre." },
        { s: HL("رَجَعَ إِلَى البَيْتِ مَسَاءً", "رَجَعَ"), a: "d", why: "رَجَعَ يَرْجِعُ (lâm ع ama Daraba)." },
        { s: HL("وَشَكَرَ رَبَّهُ", "شَكَرَ"), a: "n", why: "شَكَرَ يَشْكُرُ." }
      ]}
    }
  ]
}
];

var HAFIZA = {
  kal: { name: "Bâb ↔ kalıp", pairs: BKEYS.map(function (k) { return [BAB[k].ex + " " + BAB[k].mu, BAB[k].k]; }) },
  mu: { name: "Mâzi ↔ muzâri", pairs: VERBS.filter(function (v, i) { return i % 3 === 0; }).map(function (v) { return [v.m, v.u]; }) },
  tr: { name: "Bâb ↔ hareke", pairs: BKEYS.map(function (k) { return [BAB[k].ex, HR_KISA[BAB[k].m] + " · " + HR_KISA[BAB[k].u]]; }) }
};
var KARTLAR = [
  ["Bâb ne demek?", "Kapı. Sülâsî fiiller altı kapıdan birine girer."],
  ["Bâbı ne belirler?", "Ayn harfinin harekesi: önce mâzide, sonra muzâride."],
  ["Altı bâb sırasıyla?", "نَصَرَ، ضَرَبَ، فَتَحَ، عَلِمَ، حَسُنَ، حَسِبَ"],
  ["Harekeleri (mâzi · muzâri)?", "üstün·ötre, üstün·esre, üstün·üstün, esre·üstün, ötre·ötre, esre·esre"],
  ["Fetaha bâbının şartı?", "Ayn ya da lâm boğaz harfi: ء ه ع ح غ خ"],
  ["دَخَلَ boğaz harfli. Fetaha mı?", "Hayır: دَخَلَ يَدْخُلُ, Nasara. Şart gerekli ama yetmez."],
  ["Ötreli mâzi hangi bâb?", "Her zaman Hasune: حَسُنَ يَحْسُنُ. Lâzımdır, vasıf bildirir."],
  ["Esreli mâzi hangi bâb?", "Çoğu Alime (عَلِمَ يَعْلَمُ), azı Hasibe (حَسِبَ يَحْسِبُ)."],
  ["Hasibe bâbının fiilleri?", "Az; çoğu misâl: وَرِثَ يَرِثُ، وَثِقَ يَثِقُ"],
  ["Emrin hemzesi?", "Muzâride ayn ötre → اُ (اُنْصُرْ); değilse → اِ (اِضْرِبْ، اِفْتَحْ)"],
  ["Sözlükte كَتَبَ ـُ ne demek?", "Muzârinin ayn harekesi ötre: يَكْتُبُ (Nasara)."],
  ["وَجَدَ'nin muzârisi ve emri?", "يَجِدُ، جِدْ: vav düşer, Daraba."]
];
