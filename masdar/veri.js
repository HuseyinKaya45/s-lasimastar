// ================= VERİ: Sülâsî Masdarlar (مَصَادِرُ الأَفْعَالِ الثُّلَاثِيَّةِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "nasb.فَعْل" gibi yazılırsa etikete not eklenir.
var ROLES = {
  nasb: { ar: "مَصْدَرٌ", tr: "Masdar" }, cerr: { ar: "فِعْلٌ", tr: "Fiil" }, mz: { ar: "اسْمُ فَاعِلٍ", tr: "İsm-i fâil" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
var HRK = { a: "fetha", i: "kesre", u: "damme" };
// 18 vezin: [anahtar, vezin, örnek fiil, muzâride ayn, örnek masdar, Türkçe, Türkçe çapa, renk grubu]
var VZ = [
  ["fl", "فَعْلٌ", "نَصَرَ", "u", "نَصْرٌ", "yardım", "nusret, Nasreddin", "cerr"],
  ["fil", "فِعْلٌ", "عَلِمَ", "a", "عِلْمٌ", "bilgi", "ilim", "cerr"],
  ["ful", "فُعْلٌ", "حَسُنَ", "u", "حُسْنٌ", "güzellik", "hüsn (hüsnühat)", "cerr"],
  ["fla", "فَعْلَةٌ", "رَحِمَ", "a", "رَحْمَةٌ", "merhamet", "rahmet", "mi"],
  ["fila", "فِعْلَةٌ", "خَدَمَ", "u", "خِدْمَةٌ", "hizmet", "hizmet", "mi"],
  ["fula", "فُعْلَةٌ", "صَحِبَ", "a", "صُحْبَةٌ", "arkadaşlık", "sohbet", "mi"],
  ["faa", "فَعَلٌ", "عَمِلَ", "a", "عَمَلٌ", "iş", "amel", "mz"],
  ["faal", "فَعَالٌ", "وَدَعَ", "a", "وَدَاعٌ", "ayrılık", "veda", "ref"],
  ["fiaal", "فِعَالٌ", "مَثُلَ", "u", "مِثَالٌ", "örnek", "misal", "ref"],
  ["fuaal", "فُعَالٌ", "سَأَلَ", "a", "سُؤَالٌ", "soru", "sual", "ref"],
  ["faala", "فَعَلَةٌ", "غَلَبَ", "i", "غَلَبَةٌ", "üstünlük", "galebe", "mz"],
  ["faaala", "فَعَالَةٌ", "جَهِلَ", "a", "جَهَالَةٌ", "bilgisizlik", "cehalet", "nasb"],
  ["fiaala", "فِعَالَةٌ", "زَرَعَ", "a", "زِرَاعَةٌ", "tarım", "ziraat", "nasb"],
  ["fuula", "فُعُولَةٌ", "سَهُلَ", "u", "سُهُولَةٌ", "kolaylık", "suhulet", "nasb"],
  ["filan", "فِعْلَانٌ", "حَسِبَ", "a", "حِسْبَانٌ", "hesap", "hesap", "muz"],
  ["fulan", "فُعْلَانٌ", "شَكَرَ", "u", "شُكْرَانٌ", "şükür", "şükran", "muz"],
  ["fuul", "فُعُولٌ", "سَجَدَ", "u", "سُجُودٌ", "secde", "sücud", "muz"],
  ["faalan", "فَعَلَانٌ", "دَارَ", "u", "دَوَرَانٌ", "dönme", "devran, deveran", "muz"]
];
var VZ_BY = {}; VZ.forEach(function (v) { VZ_BY[v[0]] = v; });

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^\[(.*)\](.*)$/.exec(w), p = /^\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function CB(q, parts, ok, tr, why) {
  return { q: q, p: parts.map(function (x) { return Array.isArray(x) ? { o: x } : x; }), ok: Array.isArray(ok[0]) ? ok : [ok], tr: tr, why: why };
}
function PK(q, o, tr, why, k) { var r = o.slice(), a = (k || 0) % o.length; var c = r.splice(0, 1)[0]; r.splice(a, 0, c); return { q: q, o: r, a: a, tr: tr, why: why }; }
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function harfler(w) { return w.match(/[^ً-ْٰ][ً-ْٰ]*/g) || []; }
// kökten basit vezinler (oyun seçenekleri için)
function kalip(k, key) {
  var f = k[0], a = k[1], l = k[2], fi = f === "أ" ? "إ" : f;
  return { fl: f + "َ" + a + "ْ" + l + "ٌ", fil: fi + "ِ" + a + "ْ" + l + "ٌ", ful: f + "ُ" + a + "ْ" + l + "ٌ", faa: f + "َ" + a + "َ" + l + "ٌ", faal: f + "َ" + a + "َا" + l + "ٌ", fuul: f + "ُ" + a + "ُو" + l + "ٌ", fla: f + "َ" + a + "ْ" + l + "َةٌ" }[key];
}
function kok(maz) { return harfler(maz).map(function (h) { return h.charAt(0); }).slice(0, 3); }

// Fiiller (1. alıştırma ve makine): [mâzi, muzâri, [masdar(lar)], [vezin(ler)], Türkçe, Türkçe çapa]
var MS = [
  ["ضَرَبَ", "يَضْرِبُ", ["ضَرْبٌ"], ["fl"], "vurmak", "darbe (ضَرْبَةٌ)"],
  ["أَخَذَ", "يَأْخُذُ", ["أَخْذٌ"], ["fl"], "almak", "ahz (ahzü kabz)"],
  ["طَلَعَ", "يَطْلُعُ", ["طُلُوعٌ"], ["fuul"], "doğmak (güneş)", "tulû"],
  ["غَرَبَ", "يَغْرُبُ", ["غُرُوبٌ"], ["fuul"], "batmak (güneş)", "gurup"],
  ["نَظَرَ", "يَنْظُرُ", ["نَظَرٌ"], ["faa"], "bakmak", "nazar"],
  ["سَكَنَ", "يَسْكُنُ", ["سُكُونٌ"], ["fuul"], "durmak, sakinleşmek", "sükûn"],
  ["فَتَحَ", "يَفْتَحُ", ["فَتْحٌ"], ["fl"], "açmak, fethetmek", "fetih"],
  ["شَكَرَ", "يَشْكُرُ", ["شُكْرٌ", "شُكْرَانٌ"], ["ful", "fulan"], "şükretmek", "şükür, şükran"],
  ["نَجَحَ", "يَنْجَحُ", ["نَجَاحٌ"], ["faal"], "başarmak", "necah"],
  ["سَمِعَ", "يَسْمَعُ", ["سَمْعٌ", "سَمَاعٌ"], ["fl", "faal"], "işitmek", "sem', semâ"],
  ["حَفِظَ", "يَحْفَظُ", ["حِفْظٌ"], ["fil"], "ezberlemek, korumak", "hıfz"],
  ["حَكَمَ", "يَحْكُمُ", ["حُكْمٌ"], ["ful"], "hükmetmek", "hüküm"],
  ["حَمِدَ", "يَحْمَدُ", ["حَمْدٌ"], ["fl"], "övmek", "hamd"],
  ["تَعِبَ", "يَتْعَبُ", ["تَعَبٌ"], ["faa"], "yorulmak", "teab (yorgunluk)"],
  ["عَدَلَ", "يَعْدِلُ", ["عَدْلٌ"], ["fl"], "adaletli olmak", "adl, adalet"],
  ["رَكَعَ", "يَرْكَعُ", ["رُكُوعٌ"], ["fuul"], "rükû etmek", "rükû"],
  ["كَرِهَ", "يَكْرَهُ", ["كُرْهٌ", "كَرَاهَةٌ"], ["ful", "faaala"], "hoşlanmamak", "kerahet, mekruh"],
  ["ذَكَرَ", "يَذْكُرُ", ["ذِكْرٌ"], ["fil"], "anmak", "zikir"]
];
var MAK = VZ.map(function (v) { return [v[2], v[3], v[4], v[0], v[5], v[6]]; });

var UNITS = [
// ---------------------------------------------------------------- 1 · MASDAR NEDİR?
{
  id: "u1", no: 1, ar: "المَصْدَرُ", tr: "Masdar Nedir?", short: "Anlam", col: "nasb", legend: ["nasb"],
  goals: ["Masdarın zamandan bağımsız bir olayı (iş, hâl) gösterdiğini bilmek", "Fiil ile masdarı ayırmak: ذَكَرَ (andı) ↔ ذِكْرٌ (anma)", "Sülâsî masdarların semâî olduğunu, sözlükten öğrenildiğini bilmek"],
  examples: [
    { s: "الصَّبْرُ:nasb.صَبَرَ / عِنْدَ:- / الصَّدْمَةِ:nasb.صَدَمَ / الأُولَى:-", tr: "Sabır, ilk sarsıntı anındadır." },
    { s: "أُحِبُّ:cerr / ذِكْرَ:nasb.ذَكَرَ / اللهِ:- / صَبَاحًا:- / وَمَسَاءً:-", tr: "Allah'ı sabah akşam anmayı severim." },
    { s: "النَّظَافَةُ:nasb.نَظُفَ / مِنَ الإِيمَانِ:-", tr: "Temizlik imandandır.", why: "الإِيمَانُ da masdardır, ama gayr-i sülâsî (آمَنَ)." },
    { s: "العَدْلُ:nasb.عَدَلَ / أَسَاسُ:- / المُلْكِ:-", tr: "Adalet mülkün temelidir." }
  ],
  rules: [
    { tr: "<b class=\"r-nasb\">Masdar</b>, zamandan soyutlanmış bir olayı (iş, oluş, hâl) gösteren isimdir: <span class=\"ar\">ذِكْرٌ</span> anma, <span class=\"ar\">عَدْلٌ</span> adalet." },
    { tr: "Fiil olayı <b>zamanla</b> verir: <span class=\"ar\">ذَكَرَ</span> andı (geçmiş), <span class=\"ar\">يَذْكُرُ</span> anıyor. Masdar zamansızdır: <span class=\"ar\">ذِكْرٌ</span> anma." },
    { tr: "Türkçedeki birçok Arapça kökenli kelime aslında masdardır: <b>ilim, rahmet, hizmet, sohbet, amel, veda, misal, sual, ziraat, şükran</b>." },
    { tr: "Sülâsî fiillerin masdarları <b>çoktur ve semâîdir</b>: kuralla bulunmaz, duyarak ve sözlüğe bakarak öğrenilir. Bir fiilin birden fazla masdarı olabilir: <span class=\"ar\">شُكْرٌ، شُكْرَانٌ</span>." },
    { tr: "Masdar cümlede isim gibi davranır: mübtedâ (<span class=\"ar\">العَدْلُ أَسَاسُ المُلْكِ</span>), mef'ûl (<span class=\"ar\">أُحِبُّ ذِكْرَ اللهِ</span>), muzâfun ileyh (<span class=\"ar\">حِفْظِ اللِّسَانِ</span>)." }
  ],
  kaide: ["المَصْدَرُ: اسْمٌ يَدُلُّ عَلَى حَدَثٍ مُجَرَّدٍ مِنَ الزَّمَانِ. أَوْزَانُ مَصَادِرِ الأَفْعَالِ الثُّلَاثِيَّةِ كَثِيرَةٌ، وَهِيَ تُعْرَفُ بِالسَّمَاعِ وَبِالرُّجُوعِ إِلَى القَامُوسِ."],
  ex: [
    { type: "classify", extra: true, opts: [["m", "Masdar", "مَصْدَرٌ", "nasb"], ["f", "Fiil", "فِعْلٌ", "cerr"], ["n", "İsm-i fâil", "اسْمُ فَاعِلٍ", "mz"]], ar: "مَصْدَرٌ أَمْ فِعْلٌ؟", tr: "Kelime masdar mı (zamansız olay), fiil mi (zamanlı), ism-i fâil mi (yapan)?", items: [
      { s: "ذِكْرٌ", a: "m", why: "anma: zaman yok." }, { s: "ذَكَرَ", a: "f", why: "andı: geçmiş zaman." }, { s: "ذَاكِرٌ", a: "n", why: "anan: فَاعِل." },
      { s: "عَدْلٌ", a: "m", why: "adalet." }, { s: "يَعْدِلُ", a: "f", why: "adaletli davranıyor." }, { s: "صَبْرٌ", a: "m", why: "sabır." },
      { s: "صَابِرٌ", a: "n", why: "sabreden." }, { s: "سُجُودٌ", a: "m", why: "secde etme." }, { s: "سَجَدَ", a: "f", why: "secde etti." },
      { s: "نَظَافَةٌ", a: "m", why: "temizlik (فَعَالَة)." }
    ]},
    { type: "pick", extra: true, ar: "مَا مَعْنَاهُ بِالتُّرْكِيَّةِ؟", tr: "Türkçe çapa: masdarı tanıdık bir Türkçe kelimeyle eşleştir.", items: [
      PK("رَحْمَةٌ", ["rahmet", "hizmet", "sohbet"], "merhamet", "رَحْمَةٌ ← rahmet.", 0),
      PK("خِدْمَةٌ", ["hizmet", "hikmet", "rahmet"], "hizmet", "خِدْمَةٌ ← hizmet.", 1),
      PK("صُحْبَةٌ", ["sohbet", "sahip", "sıhhat"], "arkadaşlık, sohbet", "صُحْبَةٌ ← sohbet.", 2),
      PK("سُؤَالٌ", ["sual", "suret", "sual-i cevap"], "soru", "سُؤَالٌ ← sual.", 0),
      PK("زِرَاعَةٌ", ["ziraat", "ziyaret", "zarar"], "tarım", "زِرَاعَةٌ ← ziraat.", 1),
      PK("وَدَاعٌ", ["veda", "vefa", "vaat"], "ayrılık", "وَدَاعٌ ← veda.", 2)
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · 18 VEZİN
{
  id: "u2", no: 2, ar: "أَوْزَانُ المَصَادِرِ الثُّلَاثِيَّةِ", tr: "On Sekiz Vezin", short: "Vezinler", col: "cerr", legend: ["cerr", "nasb"],
  goals: ["Kitaptaki on sekiz masdar veznini örnekleriyle tanımak", "Bir masdarın veznini söylemek: رَحْمَةٌ ← فَعْلَةٌ", "Her vezni bir Türkçe kelimeyle hatırlamak: رَحْمَةٌ = rahmet"],
  examples: [
    { s: "نَصَرَ:cerr / نَصْرٌ:nasb.فَعْل", tr: "yardım etti → yardım", pair: "عَلِمَ:cerr / عِلْمٌ:nasb.فِعْل", pairTr: "bildi → ilim" },
    { s: "رَحِمَ:cerr / رَحْمَةٌ:nasb.فَعْلَة", tr: "merhamet etti → rahmet", pair: "خَدَمَ:cerr / خِدْمَةٌ:nasb.فِعْلَة", pairTr: "hizmet etti → hizmet" },
    { s: "سَأَلَ:cerr / سُؤَالٌ:nasb.فُعَال", tr: "sordu → sual", pair: "سَجَدَ:cerr / سُجُودٌ:nasb.فُعُول", pairTr: "secde etti → sücud" }
  ],
  rules: [
    { tr: "<b>Kısa vezinler</b> (üç harf, ortası sakin): <span class=\"ar\">فَعْلٌ</span> نَصْرٌ · <span class=\"ar\">فِعْلٌ</span> عِلْمٌ · <span class=\"ar\">فُعْلٌ</span> حُسْنٌ. Fark yalnız ilk harfin harekesinde." },
    { tr: "<b>ة ile</b>: <span class=\"ar\">فَعْلَةٌ</span> رَحْمَةٌ · <span class=\"ar\">فِعْلَةٌ</span> خِدْمَةٌ · <span class=\"ar\">فُعْلَةٌ</span> صُحْبَةٌ · <span class=\"ar\">فَعَلَةٌ</span> غَلَبَةٌ." },
    { tr: "<b>ا ile uzayan</b>: <span class=\"ar\">فَعَالٌ</span> وَدَاعٌ · <span class=\"ar\">فِعَالٌ</span> مِثَالٌ · <span class=\"ar\">فُعَالٌ</span> سُؤَالٌ · <span class=\"ar\">فَعَالَةٌ</span> جَهَالَةٌ · <span class=\"ar\">فِعَالَةٌ</span> زِرَاعَةٌ." },
    { tr: "<b>و ile uzayan</b>: <span class=\"ar\">فُعُولٌ</span> سُجُودٌ · <span class=\"ar\">فُعُولَةٌ</span> سُهُولَةٌ." },
    { tr: "<b>ان ile biten</b>: <span class=\"ar\">فِعْلَانٌ</span> حِسْبَانٌ · <span class=\"ar\">فُعْلَانٌ</span> شُكْرَانٌ · <span class=\"ar\">فَعَلَانٌ</span> دَوَرَانٌ (hareket bildirir)." },
    { tr: "Ve <span class=\"ar\">فَعَلٌ</span> عَمَلٌ. Kitaptaki tablo, fiilin muzâri harekesini de verir: <span class=\"ar\">نَصَرَ يَنْصُرُ</span> (ـُـ)." }
  ],
  kaide: ["مِنْ أَوْزَانِ مَصَادِرِ الأَفْعَالِ الثُّلَاثِيَّةِ: ١ ـ فَعْلٌ: نَصَرَ – نَصْرٌ ٢ ـ فِعْلٌ: عَلِمَ – عِلْمٌ ٣ ـ فُعْلٌ: حَسُنَ – حُسْنٌ ٤ ـ فَعْلَةٌ: رَحِمَ – رَحْمَةٌ ٥ ـ فِعْلَةٌ: خَدَمَ – خِدْمَةٌ ٦ ـ فُعْلَةٌ: صَحِبَ – صُحْبَةٌ ٧ ـ فَعَلٌ: عَمِلَ – عَمَلٌ ٨ ـ فَعَالٌ: وَدَعَ – وَدَاعٌ ٩ ـ فِعَالٌ: مَثُلَ – مِثَالٌ ١٠ ـ فُعَالٌ: سَأَلَ – سُؤَالٌ ١١ ـ فَعَلَةٌ: غَلَبَ – غَلَبَةٌ ١٢ ـ فَعَالَةٌ: جَهِلَ – جَهَالَةٌ ١٣ ـ فِعَالَةٌ: زَرَعَ – زِرَاعَةٌ ١٤ ـ فُعُولَةٌ: سَهُلَ – سُهُولَةٌ ١٥ ـ فِعْلَانٌ: حَسِبَ – حِسْبَانٌ ١٦ ـ فُعْلَانٌ: شَكَرَ – شُكْرَانٌ ١٧ ـ فُعُولٌ: سَجَدَ – سُجُودٌ ١٨ ـ فَعَلَانٌ: دَارَ – دَوَرَانٌ."],
  ex: [
    { type: "pick", extra: true, ar: "عَلَى أَيِّ وَزْنٍ؟", tr: "Masdar hangi vezinde? İlk harfin harekesine, ة'ya, uzatma harfine bak.", items: [
      PK("حُسْنٌ", ["فُعْلٌ", "فَعْلٌ", "فِعْلٌ"], "güzellik", "İlk harf damme, ikinci sakin: فُعْلٌ.", 0),
      PK("رَحْمَةٌ", ["فَعْلَةٌ", "فِعْلَةٌ", "فَعَلَةٌ"], "merhamet", "فَعْلَةٌ.", 1),
      PK("غَلَبَةٌ", ["فَعَلَةٌ", "فَعْلَةٌ", "فَعَالَةٌ"], "üstünlük", "İkinci harf de fethalı: فَعَلَةٌ.", 2),
      PK("سُؤَالٌ", ["فُعَالٌ", "فِعَالٌ", "فُعُولٌ"], "soru", "فُعَالٌ.", 0),
      PK("زِرَاعَةٌ", ["فِعَالَةٌ", "فَعَالَةٌ", "فِعَالٌ"], "tarım", "فِعَالَةٌ.", 1),
      PK("سُجُودٌ", ["فُعُولٌ", "فُعُولَةٌ", "فُعَالٌ"], "secde", "فُعُولٌ.", 2),
      PK("دَوَرَانٌ", ["فَعَلَانٌ", "فُعْلَانٌ", "فِعْلَانٌ"], "dönme", "فَعَلَانٌ.", 0),
      PK("شُكْرَانٌ", ["فُعْلَانٌ", "فِعْلَانٌ", "فُعُولٌ"], "şükran", "فُعْلَانٌ.", 1),
      PK("عَمَلٌ", ["فَعَلٌ", "فَعْلٌ", "فِعْلٌ"], "iş, amel", "İkinci harf hareketli: فَعَلٌ.", 2),
      PK("سُهُولَةٌ", ["فُعُولَةٌ", "فُعُولٌ", "فَعَالَةٌ"], "kolaylık", "فُعُولَةٌ.", 0)
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · MASDAR YAPMA
{
  id: "u3", no: 3, ar: "صَوْغُ المَصْدَرِ", tr: "Masdarı Bulma", short: "Masdar bulma", col: "mz", legend: ["cerr", "nasb"],
  goals: ["Sık kullanılan fiillerin masdarlarını bilmek", "Bir fiilin birden fazla masdarı olabileceğini görmek: سَمْعٌ، سَمَاعٌ", "Türkçedeki karşılıklarıyla masdarları akılda tutmak: طُلُوعٌ = tulû"],
  examples: [
    { s: "طَلَعَ:cerr / طُلُوعٌ:nasb.فُعُول", tr: "doğdu → tulû (doğuş)", pair: "غَرَبَ:cerr / غُرُوبٌ:nasb.فُعُول", pairTr: "battı → gurup (batış)" },
    { s: "حَفِظَ:cerr / حِفْظٌ:nasb.فِعْل", tr: "ezberledi → hıfz", pair: "حَكَمَ:cerr / حُكْمٌ:nasb.فُعْل", pairTr: "hükmetti → hüküm" },
    { s: "نَجَحَ:cerr / نَجَاحٌ:nasb.فَعَال", tr: "başardı → başarı", pair: "تَعِبَ:cerr / تَعَبٌ:nasb.فَعَل", pairTr: "yoruldu → yorgunluk" }
  ],
  rules: [
    { tr: "Hareket bildiren fiiller sık sık <span class=\"ar\">فُعُولٌ</span> alır: <span class=\"ar\">طُلُوعٌ، غُرُوبٌ، رُكُوعٌ، سُجُودٌ، سُكُونٌ</span>." },
    { tr: "Geçişli fiiller sık sık <span class=\"ar\">فَعْلٌ</span> alır: <span class=\"ar\">ضَرْبٌ، أَخْذٌ، فَتْحٌ، حَمْدٌ</span>." },
    { tr: "Fiil 4. bâbdan (<span class=\"ar\">فَعِلَ يَفْعَلُ</span>) ve lâzımsa <span class=\"ar\">فَعَلٌ</span> gelebilir: <span class=\"ar\">تَعَبٌ، فَرَحٌ</span>." },
    { tr: "Bunlar eğilimdir, kural değildir. Emin olmak için sözlüğe bak." }
  ],
  kaide: ["أَوْزَانُ مَصَادِرِ الأَفْعَالِ الثُّلَاثِيَّةِ تُعْرَفُ بِالسَّمَاعِ وَبِالرُّجُوعِ إِلَى القَامُوسِ."],
  ex: [
    { type: "combo", num: "١", ar: "امْلَأِ الفَرَاغَ بِمَصْدَرٍ مُنَاسِبٍ مِنَ الأَفْعَالِ التَّالِيَةِ", tr: "Fiilin masdarını seç. Birden fazla masdarı olan fiillerde ikisi de doğru sayılır.", items: MS.map(function (m, i) {
      var k = kok(m[0]), opts = m[2].slice(), keys = ["fil", "ful", "faal", "fuul", "faa", "fl"];
      keys.forEach(function (key) { var f = kalip(k, key); if (opts.length < 3 && opts.indexOf(f) < 0) opts.push(f); });
      var order = opts.map(function (o, j) { return [o, (j * 7 + i * 3) % 5]; }).sort(function (a, b) { return a[1] - b[1]; }).map(function (x) { return x[0]; });
      var ok = m[2].map(function (w) { return [order.indexOf(w)]; });
      return CB(m[0] + ' <span class="muted">(' + m[1] + ')</span>', [order], ok, m[4] + " → " + m[2].join(" / ") + " · Türkçede: " + m[5], m[3].map(function (k2) { return VZ_BY[k2][1]; }).join(" / ") + " vezni.");
    })}
  ]
},
// ---------------------------------------------------------------- 4 · ÂYET VE CÜMLELER
{
  id: "u4", no: 4, ar: "المَصْدَرُ فِي الجُمْلَةِ", tr: "Cümlede ve Âyette Masdar", short: "Cümlede", col: "mi", legend: ["nasb", "cerr"],
  goals: ["Âyet, hadis ve cümlelerde masdarı bulmak", "Bulduğu masdarın fiilini söylemek: سُكُوتٌ ← سَكَتَ", "İsm-i fâil (الصَّالِحِينَ) ve ism-i mef'ûl (مَقْبُولٌ) tuzaklarına düşmemek"],
  examples: [
    { s: "﴿إِذَا:- / جَاءَ:cerr / نَصْرُ:nasb.نَصَرَ / اللهِ:- / وَالفَتْحُ﴾:nasb.فَتَحَ", tr: "Allah'ın yardımı ve fetih geldiğinde." },
    { s: "سَلَامَةُ:nasb.سَلِمَ / الإِنْسَانِ:- / فِي:- / حِفْظِ:nasb.حَفِظَ / اللِّسَانِ:-", tr: "İnsanın selâmeti dilini korumasındadır." },
    { s: "﴿فَإِنَّ:- / مَعَ:- / العُسْرِ:nasb.عَسُرَ / يُسْرًا﴾:nasb.يَسُرَ", tr: "Şüphesiz zorlukla beraber bir kolaylık vardır." }
  ],
  rules: [
    { tr: "Masdar çoğu zaman <b>muzâf</b> olur: <span class=\"ar\">نَصْرُ اللهِ، حِفْظِ اللِّسَانِ، ذِكْرُ الصَّالِحِينَ</span>." },
    { tr: "Masdara zamir bitişebilir: <span class=\"ar\">سُكُوتُهُ، ذِكْرِكَ، شُكْرِكَ، عِبَادَتِكَ</span>." },
    { tr: "<span class=\"ar\">تَفَكُّرٌ</span> da masdardır ama gayr-i sülâsî (<span class=\"ar\">تَفَكَّرَ</span>)." }
  ],
  kaide: ["ضَعْ خَطًّا تَحْتَ المَصْدَرِ ثُمَّ اذْكُرْ فِعْلَهُ."],
  ex: [
    { type: "find", target: "y", num: "٢ (أ)", ar: "ضَعْ خَطًّا تَحْتَ المَصْدَرِ", tr: "Masdarlara dokun. Bir cümlede birden fazla olabilir.", items: [
      W("[كَلَامُ] المُؤْمِنِ [حِكْمَةٌ] [وَسُكُوتُهُ] [تَفَكُّرٌ].", "Müminin sözü hikmet, susması tefekkürdür.", "كَلَامٌ (كَلَّمَ, isim-masdar), حِكْمَةٌ (حَكُمَ), سُكُوتٌ (سَكَتَ), تَفَكُّرٌ (تَفَكَّرَ, gayr-i sülâsî). المُؤْمِنُ ism-i fâildir."),
      W("[سَلَامَةُ] الإِنْسَانِ فِي [حِفْظِ] اللِّسَانِ.", "İnsanın selâmeti dilini korumasındadır.", "سَلَامَةٌ ← سَلِمَ (فَعَالَة); حِفْظٌ ← حَفِظَ (فِعْل)."),
      W("[ذِكْرُ] الصَّالِحِينَ يُنْزِلُ [الرَّحْمَةَ].", "Salihleri anmak rahmeti indirir.", "ذِكْرٌ ← ذَكَرَ; رَحْمَةٌ ← رَحِمَ. الصَّالِحِينَ ism-i fâildir."),
      W("[العُذْرُ] عِنْدَ كِرَامِ النَّاسِ مَقْبُولٌ.", "Özür, cömert insanlar katında kabul edilir.", "عُذْرٌ ← عَذَرَ (فُعْل). مَقْبُولٌ ism-i mef'ûl."),
      W("﴿إِذَا جَاءَ [نَصْرُ] اللهِ [وَالفَتْحُ]﴾", "Allah'ın yardımı ve fetih geldiğinde. (Nasr 110/1)", "نَصْرٌ ← نَصَرَ; فَتْحٌ ← فَتَحَ (فَعْل)."),
      W("﴿وَالعَصْرِ ۝ إِنَّ الإِنْسَانَ لَفِي [خُسْرٍ]﴾", "Asra yemin olsun ki insan gerçekten ziyandadır. (Asr 103/1-2)", "خُسْرٌ ← خَسِرَ (فُعْل). العَصْرُ burada vakit adıdır."),
      W("﴿فَإِنَّ مَعَ [العُسْرِ] [يُسْرًا] ۝ إِنَّ مَعَ [العُسْرِ] [يُسْرًا]﴾", "Şüphesiz zorlukla beraber bir kolaylık vardır; şüphesiz zorlukla beraber bir kolaylık vardır. (İnşirâh 94/5-6)", "عُسْرٌ ← عَسُرَ; يُسْرٌ ← يَسُرَ (فُعْل)."),
      W("قَالَ ﷺ لِمُعَاذٍ: لَا تَدَعَنَّ أَنْ تَقُولَ دُبُرَ كُلِّ صَلَاةٍ: اللَّهُمَّ أَعِنِّي عَلَى [ذِكْرِكَ] [وَشُكْرِكَ] [وَحُسْنِ] [عِبَادَتِكَ].", "Muâz'a: Her namazın ardından \"Allahım! Seni anmama, sana şükretmeme ve sana güzel ibadet etmeme yardım et\" demeyi bırakma.", "ذِكْرٌ (ذَكَرَ)، شُكْرٌ (شَكَرَ)، حُسْنٌ (حَسُنَ)، عِبَادَةٌ (عَبَدَ, فِعَالَة).")
    ]},
    { type: "pick", num: "٢ (ب)", ar: "اذْكُرْ فِعْلَهُ", tr: "Masdarın fiili hangisi?", items: [
      PK("سُكُوتٌ ←", ["سَكَتَ", "سَكَنَ", "أَسْكَتَ"], "susma", "سَكَتَ – يَسْكُتُ – سُكُوتٌ.", 0),
      PK("سَلَامَةٌ ←", ["سَلِمَ", "أَسْلَمَ", "سَلَّمَ"], "selâmet", "سَلِمَ – يَسْلَمُ – سَلَامَةٌ.", 1),
      PK("عُذْرٌ ←", ["عَذَرَ", "اعْتَذَرَ", "عَذَّرَ"], "özür", "عَذَرَ – يَعْذِرُ – عُذْرٌ.", 2),
      PK("خُسْرٌ ←", ["خَسِرَ", "أَخْسَرَ", "خَاسِرٌ"], "ziyan", "خَسِرَ – يَخْسَرُ – خُسْرٌ.", 0),
      PK("عُسْرٌ ←", ["عَسُرَ", "عَسِيرٌ", "أَعْسَرَ"], "zorluk", "عَسُرَ – يَعْسُرُ – عُسْرٌ.", 1),
      PK("عِبَادَةٌ ←", ["عَبَدَ", "عَبْدٌ", "عَابِدٌ"], "ibadet", "عَبَدَ – يَعْبُدُ – عِبَادَةٌ.", 2),
      PK("حُسْنٌ ←", ["حَسُنَ", "أَحْسَنَ", "حَسَنٌ"], "güzellik", "حَسُنَ – يَحْسُنُ – حُسْنٌ.", 0),
      PK("رَحْمَةٌ ←", ["رَحِمَ", "رَحِيمٌ", "تَرَحَّمَ"], "merhamet", "رَحِمَ – يَرْحَمُ – رَحْمَةٌ.", 1)
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: كَيْفَ يَكُونُ الرَّجُلُ سَيِّدًا؟", tr: "Okuma: Efendi Nasıl Olunur?", short: "Okuma", col: "muz", legend: ["nasb"],
  goals: ["Bir metinden sülâsî masdarları çıkarmak", "Bulduğu masdarın veznini söylemek", "Gayr-i sülâsî masdarları (احْتِرَامٌ، اسْتِفَادَةٌ) ayırmak"],
  examples: [
    { s: "بِالدِّينِ:nasb.فِعْل / وَالكَرَمِ:nasb.فَعَل / وَالشَّجَاعَةِ:nasb.فَعَالَة", tr: "Din, cömertlik ve cesaretle." },
    { s: "وَالبُعْدِ:nasb.فُعْل / عَنِ الكَذِبِ:nasb.فَعِل", tr: "ve yalandan uzak durmakla." },
    { s: "وَبِاحْتِرَامِ:- / الكِبَارِ:-", tr: "ve büyüklere saygıyla.", why: "احْتِرَامٌ masdardır ama gayr-i sülâsî (احْتَرَمَ)." }
  ],
  rules: [
    { tr: "Metindeki sülâsî masdarlar: <span class=\"ar\">الدِّينُ، الكَرَمُ، الشَّجَاعَةُ، البُعْدُ، الكَذِبُ، السُّوءُ، السَّمَاعُ، الرَّحْمَةُ، العِنَايَةُ</span>." },
    { tr: "Gayr-i sülâsî masdarlar: <span class=\"ar\">احْتِرَامٌ (احْتَرَمَ)، المَشْوَرَةُ (mîmî masdar)، الاسْتِفَادَةُ (اسْتَفَادَ)</span>." },
    { tr: "<span class=\"ar\">سَيِّدٌ، الكِبَارُ، الصَّغِيرُ، الفَقِيرُ</span> sıfattır; <span class=\"ar\">تَجَارِبُ، آرَاءٌ</span> çoğul isimdir." }
  ],
  kaide: ["اقْرَأِ القِطْعَةَ التَّالِيَةَ وَاسْتَخْرِجْ مِنْهَا المَصَادِرَ الثُّلَاثِيَّةَ وَاذْكُرْ صِيغَتَهَا."],
  ex: [
    { type: "reading", num: "٣", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ", tr: "Metni oku; sorulara bak. Sonra masdarları bul ve vezinlerini seç.", title: "الأَعْرَابِيُّ وَالسِّيَادَةُ",
      text: "سَأَلَ رَجُلٌ أَعْرَابِيًّا: كَيْفَ يَكُونُ الرَّجُلُ عِنْدَكُمْ سَيِّدًا؟ قَالَ: بِالدِّينِ وَالكَرَمِ وَالشَّجَاعَةِ، وَالبُعْدِ عَنِ الكَذِبِ وَعَنْ صَدِيقِ السُّوءِ، وَبِاحْتِرَامِ الكِبَارِ وَالسَّمَاعِ إِلَى آرَائِهِمْ وَالمَشْوَرَةِ مَعَهُمْ وَالاسْتِفَادَةِ مِنْ تَجَارِبِهِمْ، وَالرَّحْمَةِ بِالصَّغِيرِ، وَالعِنَايَةِ بِالمُحْتَاجِ وَالفَقِيرِ.",
      textTr: "Bir adam bir bedeviye sordu: Sizde bir adam nasıl efendi (saygın) olur? Dedi ki: Din, cömertlik ve cesaretle; yalandan ve kötü arkadaştan uzak durmakla; büyüklere saygı göstermek, görüşlerini dinlemek, onlarla istişare etmek ve tecrübelerinden faydalanmakla; küçüğe merhamet etmek, muhtaca ve fakire ilgi göstermekle.",
      qa: [
        { q: "مَاذَا سَأَلَ الرَّجُلُ الأَعْرَابِيَّ؟", a: "سَأَلَهُ: كَيْفَ يَكُونُ الرَّجُلُ عِنْدَكُمْ سَيِّدًا؟", tr: "Adam bedeviye ne sordu? Sizde bir adam nasıl efendi olur?" },
        { q: "كَيْفَ يُعَامِلُ السَّيِّدُ الكِبَارَ؟", a: "يَحْتَرِمُهُمْ وَيَسْمَعُ إِلَى آرَائِهِمْ وَيُشَاوِرُهُمْ وَيَسْتَفِيدُ مِنْ تَجَارِبِهِمْ.", tr: "Efendi büyüklere nasıl davranır? Saygı gösterir, görüşlerini dinler, istişare eder, tecrübelerinden faydalanır." }
      ]
    },
    { type: "find", target: "y", num: "٣ (أ)", ar: "اسْتَخْرِجِ المَصَادِرَ الثُّلَاثِيَّةَ", tr: "Yalnız sülâsî masdarlara dokun. Gayr-i sülâsî masdarlar (احْتِرَامِ، المَشْوَرَةِ، الاسْتِفَادَةِ) hedef değil.", items: [
      W("قَالَ: [بِالدِّينِ] [وَالكَرَمِ] [وَالشَّجَاعَةِ]،", "Dedi ki: Din, cömertlik ve cesaretle;", "دِينٌ (دَانَ), كَرَمٌ (كَرُمَ), شَجَاعَةٌ (شَجُعَ)."),
      W("[وَالبُعْدِ] عَنِ [الكَذِبِ] وَعَنْ صَدِيقِ [السُّوءِ]،", "yalandan ve kötü arkadaştan uzak durmakla;", "بُعْدٌ (بَعُدَ), كَذِبٌ (كَذَبَ), سُوءٌ (سَاءَ). صَدِيقٌ isimdir."),
      W("وَبِاحْتِرَامِ الكِبَارِ [وَالسَّمَاعِ] إِلَى آرَائِهِمْ وَالمَشْوَرَةِ مَعَهُمْ وَالاسْتِفَادَةِ مِنْ تَجَارِبِهِمْ،", "büyüklere saygı, görüşlerini dinlemek, onlarla istişare ve tecrübelerinden faydalanmakla;", "سَمَاعٌ (سَمِعَ). احْتِرَامٌ، مَشْوَرَةٌ، اسْتِفَادَةٌ gayr-i sülâsî."),
      W("[وَالرَّحْمَةِ] بِالصَّغِيرِ، [وَالعِنَايَةِ] بِالمُحْتَاجِ وَالفَقِيرِ.", "küçüğe merhamet, muhtaca ve fakire ilgi göstermekle.", "رَحْمَةٌ (رَحِمَ), عِنَايَةٌ (عَنَى). المُحْتَاجُ ism-i fâil, الصَّغِيرُ ve الفَقِيرُ sıfat.")
    ]},
    { type: "pick", num: "٣ (ب)", ar: "اذْكُرْ صِيغَتَهَا", tr: "Bulduğun masdar hangi vezinde?", items: [
      PK("الكَرَمُ", ["فَعَلٌ", "فَعْلٌ", "فَعِلٌ"], "cömertlik", "كَرَمٌ: فَعَلٌ.", 0),
      PK("الشَّجَاعَةُ", ["فَعَالَةٌ", "فِعَالَةٌ", "فُعَالٌ"], "cesaret", "شَجَاعَةٌ: فَعَالَةٌ.", 1),
      PK("البُعْدُ", ["فُعْلٌ", "فِعْلٌ", "فَعْلٌ"], "uzaklık", "بُعْدٌ: فُعْلٌ.", 2),
      PK("الكَذِبُ", ["فَعِلٌ", "فِعْلٌ", "فَعَلٌ"], "yalan", "كَذِبٌ: فَعِلٌ (كِذْبٌ: فِعْلٌ da denir).", 0),
      PK("السَّمَاعُ", ["فَعَالٌ", "فِعَالٌ", "فُعَالٌ"], "dinleme", "سَمَاعٌ: فَعَالٌ.", 1),
      PK("الرَّحْمَةُ", ["فَعْلَةٌ", "فِعْلَةٌ", "فَعَلَةٌ"], "merhamet", "رَحْمَةٌ: فَعْلَةٌ.", 2),
      PK("العِنَايَةُ", ["فِعَالَةٌ", "فَعَالَةٌ", "فُعُولَةٌ"], "ilgi, inayet", "عِنَايَةٌ: فِعَالَةٌ.", 0),
      PK("الدِّينُ", ["فِعْلٌ", "فَعْلٌ", "فُعْلٌ"], "din", "دِينٌ: فِعْلٌ.", 1)
    ]}
  ]
}
];

// Doğru Masdar oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var MD_POOL = [
  ["{الصَّبْرُ} عِنْدَ الصَّدْمَةِ الأُولَى.", ["الصَّبْرُ", "الصَّابِرُ", "صَبَرَ"], "sabır: masdar", "Sabır ilk sarsıntı anındadır.", "u1"],
  ["أُحِبُّ {ذِكْرَ} اللهِ صَبَاحًا وَمَسَاءً.", ["ذِكْرَ", "ذَاكِرَ", "ذَكَرَ"], "anma: masdar, mef'ûl", "Allah'ı sabah akşam anmayı severim.", "u1"],
  ["{النَّظَافَةُ} مِنَ الإِيمَانِ.", ["النَّظَافَةُ", "النَّظِيفُ", "نَظُفَ"], "temizlik: فَعَالَة", "Temizlik imandandır.", "u1"],
  ["{العَدْلُ} أَسَاسُ المُلْكِ.", ["العَدْلُ", "العَادِلُ", "عَدَلَ"], "adalet: فَعْل", "Adalet mülkün temelidir.", "u1"],
  ["{العِلْمُ} نُورٌ.", ["العِلْمُ", "العَالِمُ", "عَلِمَ"], "ilim: فِعْل", "İlim nurdur.", "u2"],
  ["{الرَّحْمَةُ} مِنْ صِفَاتِ المُؤْمِنِ.", ["الرَّحْمَةُ", "الرَّحِيمُ", "رَحِمَ"], "rahmet: فَعْلَة", "Merhamet müminin sıfatlarındandır.", "u2"],
  ["{خِدْمَةُ} النَّاسِ عِبَادَةٌ.", ["خِدْمَةُ", "خَادِمُ", "خَدَمَ"], "hizmet: فِعْلَة", "İnsanlara hizmet ibadettir.", "u2"],
  ["{صُحْبَةُ} الصَّالِحِينَ خَيْرٌ.", ["صُحْبَةُ", "صَاحِبُ", "صَحِبَ"], "sohbet: فُعْلَة", "Salihlerle arkadaşlık hayırdır.", "u2"],
  ["{السُّؤَالُ} نِصْفُ العِلْمِ.", ["السُّؤَالُ", "السَّائِلُ", "سَأَلَ"], "sual: فُعَال", "Soru ilmin yarısıdır.", "u2"],
  ["{الزِّرَاعَةُ} مِهْنَةٌ قَدِيمَةٌ.", ["الزِّرَاعَةُ", "الزَّارِعُ", "زَرَعَ"], "ziraat: فِعَالَة", "Tarım eski bir meslektir.", "u2"],
  ["شَاهَدْنَا {طُلُوعَ} الشَّمْسِ.", ["طُلُوعَ", "طَالِعَ", "طَلَعَ"], "tulû: فُعُول", "Güneşin doğuşunu seyrettik.", "u3"],
  ["نُصَلِّي المَغْرِبَ بَعْدَ {غُرُوبِ} الشَّمْسِ.", ["غُرُوبِ", "غَارِبِ", "غَرْبِ"], "gurup: فُعُول", "Akşamı güneş batınca kılarız.", "u3"],
  ["{النَّجَاحُ} يَحْتَاجُ إِلَى صَبْرٍ.", ["النَّجَاحُ", "النَّاجِحُ", "نَجَحَ"], "başarı: فَعَال", "Başarı sabır ister.", "u3"],
  ["{حِفْظُ} القُرْآنِ شَرَفٌ.", ["حِفْظُ", "حَافِظُ", "حَفِظَ"], "hıfz: فِعْل", "Kur'an'ı ezberlemek şereftir.", "u3"],
  ["{الرُّكُوعُ} رُكْنٌ مِنْ أَرْكَانِ الصَّلَاةِ.", ["الرُّكُوعُ", "الرَّاكِعُ", "رَكَعَ"], "rükû: فُعُول", "Rükû namazın rükünlerindendir.", "u3"],
  ["﴿إِذَا جَاءَ {نَصْرُ} اللهِ وَالفَتْحُ﴾", ["نَصْرُ", "نَاصِرُ", "نَصَرَ"], "nusret: فَعْل", "Allah'ın yardımı geldiğinde.", "u4"],
  ["﴿إِنَّ الإِنْسَانَ لَفِي {خُسْرٍ}﴾", ["خُسْرٍ", "خَاسِرٍ", "خَسِرَ"], "ziyan: فُعْل", "İnsan ziyandadır.", "u4"],
  ["﴿فَإِنَّ مَعَ العُسْرِ {يُسْرًا}﴾", ["يُسْرًا", "يَسِيرًا", "يَسَّرَ"], "kolaylık: فُعْل", "Zorlukla beraber kolaylık vardır.", "u4"],
  ["سَلَامَةُ الإِنْسَانِ فِي {حِفْظِ} اللِّسَانِ.", ["حِفْظِ", "حَافِظِ", "حَفِظَ"], "koruma: فِعْل", "İnsanın selâmeti dilini korumasındadır.", "u4"],
  ["أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ {عِبَادَتِكَ}.", ["عِبَادَتِكَ", "عَابِدِكَ", "عَبْدِكَ"], "ibadet: فِعَالَة", "Seni anmama, sana şükretmeme ve güzel ibadet etmeme yardım et.", "u4"],
  ["يَكُونُ الرَّجُلُ سَيِّدًا بِالدِّينِ وَ{الكَرَمِ}.", ["الكَرَمِ", "الكَرِيمِ", "كَرُمَ"], "cömertlik: فَعَل", "Adam dinle ve cömertlikle efendi olur.", "u5"],
  ["وَ{الشَّجَاعَةِ}", ["الشَّجَاعَةِ", "الشُّجَاعِ", "شَجُعَ"], "cesaret: فَعَالَة", "ve cesaretle", "u5"],
  ["وَ{البُعْدِ} عَنِ الكَذِبِ", ["البُعْدِ", "البَعِيدِ", "بَعُدَ"], "uzak durma: فُعْل", "ve yalandan uzak durmakla", "u5"],
  ["وَ{الرَّحْمَةِ} بِالصَّغِيرِ", ["الرَّحْمَةِ", "الرَّحِيمِ", "رَحِمَ"], "merhamet: فَعْلَة", "ve küçüğe merhametle", "u5"]
];
var HAFIZA = {
  fm: { name: "Fiil ↔ masdar", pairs: MS.filter(function (m) { return m[2].length === 1; }).slice(0, 14).map(function (m) { return [m[0], m[2][0]]; }) },
  tr: { name: "Masdar ↔ Türkçe", pairs: VZ.map(function (v) { return [v[4], v[6].split(",")[0]]; }) },
  vz: { name: "Vezin ↔ örnek", pairs: VZ.map(function (v) { return [v[1], v[4]]; }) }
};
var KARTLAR = [
  ["Masdar nedir?", "Zamandan soyutlanmış bir olayı gösteren isim: ذِكْرٌ (anma), عَدْلٌ (adalet)."],
  ["Fiil ile masdar farkı?", "Fiil zaman taşır: ذَكَرَ (andı). Masdar taşımaz: ذِكْرٌ (anma)."],
  ["Sülâsî masdar nasıl öğrenilir?", "Semâîdir: duyarak ve sözlüğe bakarak."],
  ["Kısa üç vezin?", "فَعْلٌ نَصْرٌ · فِعْلٌ عِلْمٌ · فُعْلٌ حُسْنٌ"],
  ["ة ile biten vezinler?", "فَعْلَةٌ رَحْمَةٌ · فِعْلَةٌ خِدْمَةٌ · فُعْلَةٌ صُحْبَةٌ · فَعَلَةٌ غَلَبَةٌ"],
  ["ا ile uzayan vezinler?", "فَعَالٌ وَدَاعٌ · فِعَالٌ مِثَالٌ · فُعَالٌ سُؤَالٌ · فَعَالَةٌ جَهَالَةٌ · فِعَالَةٌ زِرَاعَةٌ"],
  ["و ile uzayan vezinler?", "فُعُولٌ سُجُودٌ · فُعُولَةٌ سُهُولَةٌ"],
  ["ان ile biten vezinler?", "فِعْلَانٌ حِسْبَانٌ · فُعْلَانٌ شُكْرَانٌ · فَعَلَانٌ دَوَرَانٌ"],
  ["طَلَعَ ve غَرَبَ'nin masdarı?", "طُلُوعٌ (tulû) ve غُرُوبٌ (gurup): فُعُولٌ"],
  ["Birden fazla masdar?", "Olur: شُكْرٌ / شُكْرَانٌ, سَمْعٌ / سَمَاعٌ, كُرْهٌ / كَرَاهَةٌ"],
  ["Türkçe çapa örnekleri?", "rahmet, hizmet, sohbet, amel, veda, misal, sual, ziraat, şükran"],
  ["احْتِرَامٌ sülâsî masdar mı?", "Hayır; gayr-i sülâsî fiilin (احْتَرَمَ) masdarı."]
];
