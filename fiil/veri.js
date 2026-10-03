// ================= VERİ: Fiil Çeşitleri (أَقْسَامُ الفِعْلِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "cerr.ـتْ" gibi yazılırsa etikete not eklenir.
var ROLES = {
  cerr: { ar: "فِعْلٌ مَاضٍ", tr: "Mâzi" }, mz: { ar: "فِعْلٌ مُضَارِعٌ", tr: "Muzâri" }, ref: { ar: "فِعْلُ أَمْرٍ", tr: "Emir" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Mecrûr", "مَجْرُورٌ", "cerr"]];
var TUR_OPTS = HAL_OPTS;
var FT_OPTS = [["m", "Mâzi", "مَاضٍ", "cerr"], ["u", "Muzâri", "مُضَارِعٌ", "mz"], ["a", "Emir", "أَمْرٌ", "ref"]];
var FT_TR = { m: "Mâzi", u: "Muzâri", a: "Emir" };
var AYN_OPTS = [["a", "Fetha (üstün)", "الفَتْحَةُ", "x"], ["i", "Kesre (esre)", "الكَسْرَةُ", "x"], ["u", "Damme (ötre)", "الضَّمَّةُ", "x"]];

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
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }

// Fiiller: [mâzi, muzâri, emir, Türkçe mâzi, Türkçe muzâri, Türkçe emir, ayn harekesi (mâzi), muzâride ayn]
var FV = [
  ["حَفِظَ", "يَحْفَظُ", "اِحْفَظْ", "ezberledi", "ezberliyor", "ezberle!", "i", "a"],
  ["نَصَرَ", "يَنْصُرُ", "اُنْصُرْ", "yardım etti", "yardım ediyor", "yardım et!", "a", "u"],
  ["جَعَلَ", "يَجْعَلُ", "اِجْعَلْ", "kıldı", "kılıyor", "kıl!", "a", "a"],
  ["عَبَدَ", "يَعْبُدُ", "اُعْبُدْ", "ibadet etti", "ibadet ediyor", "ibadet et!", "a", "u"],
  ["رَكَعَ", "يَرْكَعُ", "اِرْكَعْ", "rükû etti", "rükû ediyor", "rükû et!", "a", "a"],
  ["سَجَدَ", "يَسْجُدُ", "اُسْجُدْ", "secde etti", "secde ediyor", "secde et!", "a", "u"],
  ["ذَكَرَ", "يَذْكُرُ", "اُذْكُرْ", "andı", "anıyor", "an!", "a", "u"],
  ["حَمِدَ", "يَحْمَدُ", "اِحْمَدْ", "hamdetti", "hamdediyor", "hamdet!", "i", "a"],
  ["حَكَمَ", "يَحْكُمُ", "اُحْكُمْ", "hükmetti", "hükmediyor", "hükmet!", "a", "u"],
  ["جَمَعَ", "يَجْمَعُ", "اِجْمَعْ", "topladı", "topluyor", "topla!", "a", "a"],
  ["زَرَعَ", "يَزْرَعُ", "اِزْرَعْ", "ekti", "ekiyor", "ek!", "a", "a"],
  ["ذَهَبَ", "يَذْهَبُ", "اِذْهَبْ", "gitti", "gidiyor", "git!", "a", "a"],
  ["كَتَبَ", "يَكْتُبُ", "اُكْتُبْ", "yazdı", "yazıyor", "yaz!", "a", "u"],
  ["فَتَحَ", "يَفْتَحُ", "اِفْتَحْ", "açtı", "açıyor", "aç!", "a", "a"],
  ["جَلَسَ", "يَجْلِسُ", "اِجْلِسْ", "oturdu", "oturuyor", "otur!", "a", "i"],
  ["عَلِمَ", "يَعْلَمُ", "اِعْلَمْ", "bildi", "biliyor", "bil!", "i", "a"],
  ["حَضَرَ", "يَحْضُرُ", "اُحْضُرْ", "geldi", "geliyor", "gel!", "a", "u"],
  ["شَرِبَ", "يَشْرَبُ", "اِشْرَبْ", "içti", "içiyor", "iç!", "i", "a"],
  ["دَخَلَ", "يَدْخُلُ", "اُدْخُلْ", "girdi", "giriyor", "gir!", "a", "u"],
  ["خَرَجَ", "يَخْرُجُ", "اُخْرُجْ", "çıktı", "çıkıyor", "çık!", "a", "u"],
  ["رَجَعَ", "يَرْجِعُ", "اِرْجِعْ", "döndü", "dönüyor", "dön!", "a", "i"],
  ["سَمِعَ", "يَسْمَعُ", "اِسْمَعْ", "duydu", "duyuyor", "dinle!", "i", "a"],
  ["فَهِمَ", "يَفْهَمُ", "اِفْهَمْ", "anladı", "anlıyor", "anla!", "i", "a"],
  ["لَعِبَ", "يَلْعَبُ", "اِلْعَبْ", "oynadı", "oynuyor", "oyna!", "i", "a"]
];
var MAK_F = [12, 11, 13, 14, 15, 16, 0, 3];
// sülâsî mâzi: ayn harekesi oyunu için ek fiiller
var AYN_POOL = FV.map(function (f) { return [f[0], f[6], f[3]]; }).concat([
  ["حَسُنَ", "u", "güzel oldu"], ["كَرُمَ", "u", "cömert oldu"], ["كَبُرَ", "u", "büyüdü"], ["صَغُرَ", "u", "küçüldü"], ["كَثُرَ", "u", "çoğaldı"], ["قَرُبَ", "u", "yakın oldu"], ["بَعُدَ", "u", "uzak oldu"], ["شَرُفَ", "u", "şerefli oldu"],
  ["فَرِحَ", "i", "sevindi"], ["رَكِبَ", "i", "bindi"], ["عَمِلَ", "i", "çalıştı"], ["ضَحِكَ", "i", "güldü"], ["وَصَلَ", "a", "vardı"], ["تَرَكَ", "a", "bıraktı"]
]);
// fâ, ayn, lâm: harfleri harekeleriyle ayır
function harfler(w) { var m = w.match(/[^ً-ْ][ً-ْ]*/g) || []; return m; }
function falHtml(w) {
  var h = harfler(w), c = ["cerr", "ref", "mz"];
  return h.map(function (x, i) { return '<b style="color:var(--' + (c[i] || "ink") + ')">' + x + '</b>'; }).join("");
}

var UNITS = [
// ---------------------------------------------------------------- 1 · MÂZİ
{
  id: "u1", no: 1, ar: "الفِعْلُ المَاضِي", tr: "Mâzi Fiil", short: "Mâzi", col: "cerr", legend: ["cerr"],
  goals: ["Mâzinin konuşmadan önce olmuş bir işi anlattığını bilmek", "Mâzinin iki alametini kullanmak: sakin tâ (ذَهَبَتْ) ve zamir tâsı (حَضَرْتُ)", "Fiilin harflerine fâ, ayn, lâm demek ve ayn harekesini söylemek"],
  examples: [
    { s: "بَعَثَ:cerr / اللهُ:- / مُحَمَّدًا:-", tr: "Allah Muhammed'i (peygamber olarak) gönderdi." },
    { s: "نَزَلَ:cerr / القُرْآنُ:- / عَلَى مُحَمَّدٍ:-", tr: "Kur'an Muhammed'e indi." },
    { s: "ذَهَبَتْ:cerr.ـتْ / فَاطِمَةُ:- / إِلَى السُّوقِ:-", tr: "Fâtıma çarşıya gitti.", why: "Alamet 1: sakin müenneslik tâsı alır." },
    { s: "حَضَرْتُ:cerr.ـتُ / صَبَاحًا:-", tr: "Sabah geldim.", why: "Alamet 2: zamir tâsı alır." }
  ],
  rules: [
    { tr: "Fiil zamanına göre üçe ayrılır: <b class=\"r-cerr\">mâzi</b>, <b class=\"r-mz\">muzâri</b>, <b class=\"r-ref\">emir</b>." },
    { tr: "<b>Mâzi</b>, işin konuşmadan önce, yani geçmişte olduğunu gösterir.", ex: ["حَضَرَ", "فَتَحَ", "عَلِمَ"] },
    { tr: "<b>Alamet 1:</b> sonuna sakin müenneslik tâsı (<span class=\"ar\">تَاءُ التَّأْنِيثِ السَّاكِنَةُ</span>) eklenebilir.", ex: ["ذَهَبَتْ", "فَتَحَتْ", "عَلِمَتْ"] },
    { tr: "<b>Alamet 2:</b> sonuna zamir tâsı eklenebilir.", ex: ["حَضَرْتَ", "حَضَرْتِ", "حَضَرْتُمَا", "حَضَرْتُمْ", "حَضَرْتُنَّ", "حَضَرْتُ"] },
    { tr: "Üç harfli mâzinin 1. harfine <b class=\"r-cerr\">fâ</b>, 2. harfine <b class=\"r-ref\">ayn</b>, 3. harfine <b class=\"r-mz\">lâm</b> denir (<span class=\"ar\">فَعَلَ</span> kalıbı)." },
    { tr: "Ayn harekesi üç türlü olur: fetha (<span class=\"ar\">فَتَحَ</span>), kesre (<span class=\"ar\">عَلِمَ</span>), damme (<span class=\"ar\">حَسُنَ</span>)." }
  ],
  kaide: [
    "يَنْقَسِمُ الفِعْلُ مِنْ حَيْثُ زَمَانُهُ إِلَى ثَلَاثَةِ أَقْسَامٍ: مَاضٍ وَمُضَارِعٍ وَأَمْرٍ.",
    "١ ـ الفِعْلُ المَاضِي: أ) يَدُلُّ عَلَى حُدُوثِ الفِعْلِ فِي الزَّمَنِ المَاضِي، أَيْ قَبْلَ زَمَنِ التَّكَلُّمِ، مِثْلُ: حَضَرَ، وَفَتَحَ، وَعَلِمَ.",
    "ب) وَعَلَامَتُهُ أَنْ يَقْبَلَ تَاءَ التَّأْنِيثِ المَبْسُوطَةَ السَّاكِنَةَ، مِثْلُ: ذَهَبَتْ، وَفَتَحَتْ، وَعَلِمَتْ. وَكَذَلِكَ أَنْ يَقْبَلَ تَاءَ الضَّمِيرِ مِثْلُ: حَضَرْتَ، وَحَضَرْتِ، وَحَضَرْتُمَا، وَحَضَرْتُمْ، وَحَضَرْتُنَّ، وَحَضَرْتُ.",
    "ج) يُسَمَّى الحَرْفُ الأَوَّلُ مِنَ الفِعْلِ المَاضِي الثُّلَاثِيِّ: فَاءَ الفِعْلِ، وَالثَّانِي: عَيْنَ الفِعْلِ، وَالثَّالِثُ: لَامَ الفِعْلِ. (فَعَلَ)"
  ],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنِ الفِعْلَ المَاضِيَ فِي الجُمَلِ التَّالِيَةِ", tr: "Mâzi fiile dokun. Bazı cümlelerde mâzi yok; bazılarında emir ya da muzâri tuzak olarak duruyor.", items: [
      W("[خَرَجَ] الأُسْتَاذُ مِنَ الصَّفِّ.", "Hoca sınıftan çıktı.", "خَرَجَ: mâzi (خَرَجَتْ olabilir)."),
      W("يَجْلِسُ المُدِيرُ فِي الحَدِيقَةِ.", "Müdür bahçede oturuyor.", "Mâzi yok: يَجْلِسُ muzâridir."),
      W("اِقْرَأْ كِتَابَكَ يَا حَسَنُ.", "Kitabını oku ey Hasan.", "Mâzi yok: اِقْرَأْ emirdir."),
      W("[قَالَ] المُدَرِّسُ لِلطَّالِبِ: اِجْتَهِدْ فِي دُرُوسِكَ.", "Öğretmen öğrenciye: \"Derslerinde çalış\" dedi.", "قَالَ mâzi; اِجْتَهِدْ emir."),
      W("[فَحَصَتِ] الطَّبِيبَةُ المَرِيضَةَ.", "Kadın doktor hastayı muayene etti.", "فَحَصَتْ: sakin tâ alamet; ال'den önce kesre alır."),
      W("[حَمَلْتُ] الكُتُبَ إِلَى البَيْتِ.", "Kitapları eve taşıdım.", "حَمَلْتُ: zamir tâsı alamet."),
      W("يَلْعَبُ الأَطْفَالُ فِي الحَدِيقَةِ.", "Çocuklar bahçede oynuyor.", "Mâzi yok."),
      W("يَذْهَبُ الضُّيُوفُ إِلَى حَدِيقَةِ الحَيَوَانَاتِ.", "Misafirler hayvanat bahçesine gidiyor.", "Mâzi yok.")
    ]},
    { type: "pick", extra: true, ar: "أَيُّ الأَفْعَالِ يَقْبَلُ التَّاءَ؟", tr: "Alamet testi: hangi kelimenin sonuna sakin tâ (ـتْ) eklenebilir? O kelime mâzidir.", items: [
      { q: "ـتْ +", o: ["يَفْتَحُ", "فَتَحَ", "اِفْتَحْ"], a: 1, why: "فَتَحَتْ olur; يَفْتَحُتْ ya da اِفْتَحْتْ diye bir şey yok.", tr: "فَتَحَتْ: o (kadın) açtı." },
      { q: "ـتْ +", o: ["عَلِمَ", "يَعْلَمُ", "اِعْلَمْ"], a: 0, why: "عَلِمَتْ.", tr: "عَلِمَتْ: o (kadın) bildi." },
      { q: "ـتْ +", o: ["اُكْتُبْ", "يَكْتُبُ", "كَتَبَ"], a: 2, why: "كَتَبَتْ.", tr: "كَتَبَتْ: o (kadın) yazdı." },
      { q: "ـتُ +", o: ["يَحْضُرُ", "حَضَرَ", "اُحْضُرْ"], a: 1, why: "Zamir tâsı da yalnız mâziye gelir: حَضَرْتُ.", tr: "حَضَرْتُ: geldim." },
      { q: "ـتُ +", o: ["شَرِبَ", "اِشْرَبْ", "يَشْرَبُ"], a: 0, why: "شَرِبْتُ.", tr: "شَرِبْتُ: içtim." },
      { q: "ـتَ +", o: ["اِجْلِسْ", "يَجْلِسُ", "جَلَسَ"], a: 2, why: "جَلَسْتَ.", tr: "جَلَسْتَ: oturdun." }
    ]},
    { type: "classify", num: "٧", opts: AYN_OPTS, ar: "امْلَأِ الفَرَاغَ: حَرَكَةُ عَيْنِ الفِعْلِ", tr: "Koyu yazılan mâzinin ikinci harfi (ayn) hangi harekeyi taşıyor?", exHtml: "<span class=\"ar\">وَضَعَ عَلِيٌّ القَلَمَ فِي الحَقِيبَةِ ← وَضَعَ ← الفَتْحَةُ</span>", items: [
      { s: HL("وَصَلَ الضُّيُوفُ إِلَى الفُنْدُقِ.", "وَصَلَ"), a: "a", why: "وَ صَ لَ: ayn ص, üstün.", tr: "Misafirler otele vardı." },
      { s: HL("عَلِمَ الطَّالِبُ الجَوَابَ.", "عَلِمَ"), a: "i", why: "عَ لِ مَ: ayn ل, esre.", tr: "Öğrenci cevabı bildi." },
      { s: HL("تَرَكَ المُوَظَّفُ الحَقِيبَةَ فِي الغُرْفَةِ.", "تَرَكَ"), a: "a", why: "ayn ر, üstün.", tr: "Memur çantayı odada bıraktı." },
      { s: HL("شَرِبَ المَرِيضُ الدَّوَاءَ.", "شَرِبَ"), a: "i", why: "ayn ر, esre.", tr: "Hasta ilacı içti." },
      { s: HL("حَسُنَ أَدَبُ الطَّالِبِ.", "حَسُنَ"), a: "u", why: "ayn س, ötre.", tr: "Öğrencinin edebi güzel oldu." },
      { s: HL("رَجَعَ الوَالِدُ مِنَ السُّوقِ.", "رَجَعَ"), a: "a", why: "ayn ج, üstün.", tr: "Baba çarşıdan döndü." }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · MUZÂRİ
{
  id: "u2", no: 2, ar: "الفِعْلُ المُضَارِعُ", tr: "Muzâri Fiil", short: "Muzâri", col: "mz", legend: ["mz"],
  goals: ["Muzârinin şimdiki ya da gelecek zamanı gösterdiğini bilmek", "Muzârinin alametini kullanmak: başına سَـ ya da سَوْفَ gelebilir", "Gelecek zaman cevabı kurmak: سَأَذْهَبُ"],
  examples: [
    { s: "يَحْفَظُ:mz / عَلِيٌّ:- / سُورَةَ الوَاقِعَةِ:-", tr: "Ali Vâkıa sûresini ezberliyor." },
    { s: "يَسْكُنُ:mz / صَالِحٌ:- / فِي إِسْطَنْبُولَ:-", tr: "Salih İstanbul'da oturuyor." },
    { s: "سَيَحْضُرُ:mz.سَـ / الأُسْتَاذُ:- / غَدًا:-", tr: "Hoca yarın gelecek.", why: "Alamet: سَـ (yakın gelecek)." },
    { s: "سَوْفَ_يَذْهَبُ:mz.سَوْفَ / إِلَى مَكَّةَ:-", tr: "Mekke'ye gidecek.", why: "Alamet: سَوْفَ (gelecek)." }
  ],
  rules: [
    { tr: "<b>Muzâri</b>, işin şimdi (hâl) ya da gelecekte (istikbâl) olduğunu gösterir.", ex: ["يَحْضُرُ", "يَعْلَمُ", "يَجْلِسُ"] },
    { tr: "<b>Alamet:</b> başına <span class=\"ar\">سَـ</span> ya da <span class=\"ar\">سَوْفَ</span> gelebilir; o zaman anlam kesin gelecek olur.", ex: ["سَيَحْضُرُ", "سَوْفَ يَذْهَبُ"] },
    { tr: "<span class=\"ar\">سَـ</span> fiile bitişik yazılır; <span class=\"ar\">سَوْفَ</span> ayrı yazılır." },
    { tr: "Muzâri dört harften biriyle başlar: <span class=\"ar\">أ، ن، ي، ت</span> (أَنَيْتُ). Örnek: <span class=\"ar\">أَذْهَبُ، نَذْهَبُ، يَذْهَبُ، تَذْهَبُ</span>." }
  ],
  kaide: ["٢ ـ الفِعْلُ المُضَارِعُ: أ) يَدُلُّ عَلَى حُدُوثِ الفِعْلِ فِي الزَّمَنِ الحَاضِرِ أَوِ المُسْتَقْبَلِ، مِثْلُ: يَحْضُرُ، وَيَعْلَمُ، وَيَجْلِسُ.", "ب) وَعَلَامَتُهُ أَنْ يَقْبَلَ «السِّينَ» وَ«سَوْفَ»، مِثْلُ: سَيَحْضُرُ، سَوْفَ يَذْهَبُ."],
  ex: [
    { type: "combo", num: "٦", ar: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ مُسْتَعِينًا بِمَا بَيْنَ القَوْسَيْنِ", tr: "Soruya parantezdeki zamanla, سَـ alan muzâri ile cevap ver. Soru \"sen\" diyorsa cevap \"ben\" olur.", exHtml: "<span class=\"ar\">مَتَى تَذْهَبُ إِلَى قُونْيَا؟ (غَدًا) ← سَأَذْهَبُ إِلَى قُونْيَا غَدًا.</span>", items: [
      CB("مَتَى تَحْضُرُ إِلَى الكُلِّيَّةِ؟ <span class=\"muted\">(صَبَاحًا)</span>", [["سَتَحْضُرُ", "سَأَحْضُرُ", "حَضَرْتُ"], "إِلَى الكُلِّيَّةِ صَبَاحًا."], [1], "Fakülteye sabah geleceğim.", "Soru \"sen\": cevap أَ ile (ben). سَوْفَ أَحْضُرُ da olur."),
      CB("مَتَى تَرْجِعُ إِلَى البَيْتِ؟ <span class=\"muted\">(مَسَاءً)</span>", [["سَأَرْجِعُ", "رَجَعْتُ", "سَتَرْجِعُ"], "إِلَى البَيْتِ مَسَاءً."], [0], "Eve akşam döneceğim.", "سَأَرْجِعُ."),
      CB("مَتَى يَنْزِلُ المَطَرُ؟ <span class=\"muted\">(فِي الرَّبِيعِ)</span>", [["سَأَنْزِلُ", "نَزَلَ", "سَيَنْزِلُ"], "المَطَرُ فِي الرَّبِيعِ."], [2], "Yağmur ilkbaharda yağacak.", "Özne المَطَرُ (o): سَيَنْزِلُ."),
      CB("مَتَى يَنْزِلُ الثَّلْجُ؟ <span class=\"muted\">(فِي الشِّتَاءِ)</span>", [["سَيَنْزِلُ", "سَتَنْزِلُ", "نَزَلَ"], "الثَّلْجُ فِي الشِّتَاءِ."], [0], "Kar kışın yağacak.", "الثَّلْجُ müzekker: سَيَنْزِلُ."),
      CB("مَتَى تَذْهَبُ لِأَدَاءِ الحَجِّ؟ <span class=\"muted\">(فِي السَّنَةِ القَادِمَةِ)</span>", [["ذَهَبْتُ", "سَأَذْهَبُ", "اِذْهَبْ"], "لِأَدَاءِ الحَجِّ فِي السَّنَةِ القَادِمَةِ."], [1], "Gelecek yıl hacca gideceğim.", "سَأَذْهَبُ."),
      CB("مَتَى تَكْتُبُ الوَاجِبَ المَنْزِلِيَّ؟ <span class=\"muted\">(بَعْدَ غَدٍ)</span>", [["سَأَكْتُبُ", "سَيَكْتُبُ", "اُكْتُبْ"], "الوَاجِبَ المَنْزِلِيَّ بَعْدَ غَدٍ."], [0], "Ev ödevini öbür gün yazacağım.", "سَأَكْتُبُ."),
      CB("مَتَى تَكْثُرُ الفَاكِهَةُ؟ <span class=\"muted\">(فِي الصَّيْفِ)</span>", [["سَيَكْثُرُ", "سَأَكْثُرُ", "سَتَكْثُرُ"], "الفَاكِهَةُ فِي الصَّيْفِ."], [2], "Meyve yazın bollaşacak.", "الفَاكِهَةُ müennes: baştaki harf ت."),
      CB("مَتَى تَزُورُ الأُسْرَةَ؟ <span class=\"muted\">(فِي العُطْلَةِ)</span>", [["سَتَزُورُ", "سَأَزُورُ", "زُرْ"], "الأُسْرَةَ فِي العُطْلَةِ."], [1], "Aileyi tatilde ziyaret edeceğim.", "سَأَزُورُ.")
    ]},
    { type: "pick", extra: true, ar: "أَيُّ الأَفْعَالِ يَقْبَلُ السِّينَ؟", tr: "Alamet testi: hangisi doğru yazılmış? سَـ ve سَوْفَ yalnız muzâriye gelir.", items: [
      { q: "", o: ["سَذَهَبَ", "سَيَذْهَبُ", "سَاذْهَبْ"], a: 1, why: "سَـ + يَذْهَبُ.", tr: "Gidecek." },
      { q: "", o: ["سَوْفَ يَكْتُبُ", "سَوْفَ كَتَبَ", "سَوْفَ اُكْتُبْ"], a: 0, why: "سَوْفَ + muzâri.", tr: "Yazacak." },
      { q: "", o: ["سَفَتَحَتْ", "سَافْتَحْ", "سَتَفْتَحُ"], a: 2, why: "سَتَفْتَحُ.", tr: "Açacak (o kadın) / açacaksın." },
      { q: "", o: ["سَوْفَ نَرْجِعُ", "سَوْفَ رَجَعْنَا", "سَوْفَ اِرْجِعْ"], a: 0, why: "سَوْفَ + نَرْجِعُ.", tr: "Döneceğiz." },
      { q: "", o: ["سَحَضَرْتُ", "سَأَحْضُرُ", "سَاُحْضُرْ"], a: 1, why: "سَأَحْضُرُ.", tr: "Geleceğim." },
      { q: "", o: ["سَوْفَ شَرِبَ", "سَوْفَ اِشْرَبْ", "سَوْفَ يَشْرَبُ"], a: 2, why: "سَوْفَ يَشْرَبُ.", tr: "İçecek." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · EMİR
{
  id: "u3", no: 3, ar: "فِعْلُ الأَمْرِ", tr: "Emir Fiil", short: "Emir", col: "ref", legend: ["ref"],
  goals: ["Emrin şimdi ya da ileride bir işin yapılmasını istediğini bilmek", "Muzâriden emir yapmak: يَكْتُبُ ← اُكْتُبْ", "Başa gelen hemzenin harekesini doğru seçmek: اُ mı, اِ mi?"],
  examples: [
    { s: "اُعْبُدْ:ref / رَبَّكَ:-", tr: "Rabbine ibadet et." },
    { s: "اِفْتَحْ:ref / كِتَابَكَ:-", tr: "Kitabını aç." },
    { s: "اُحْضُرْ:ref / مُبَكِّرًا:-", tr: "Erken gel." },
    { s: "اِذْهَبْ:ref / إِلَى المَدْرَسَةِ:-", tr: "Okula git." }
  ],
  rules: [
    { tr: "<b>Emir</b>, şimdi ya da gelecekte bir işin yapılmasını ister (talep).", ex: ["اُحْضُرْ", "اِذْهَبْ", "اِعْلَمْ"] },
    { tr: "Muzâriden yapılır: baştaki <span class=\"ar\">تَـ</span> düşer, son harf sakin olur; ilk harf sakin kaldığı için başa bir hemze gelir.", ex: ["تَذْهَبُ ← ذْهَبْ ← اِذْهَبْ"] },
    { tr: "Muzâride ayn <b>damme</b> ise hemze de <b>damme</b> alır; ayn fetha ya da kesre ise hemze <b>kesre</b> alır.", ex: ["يَكْتُبُ ← اُكْتُبْ", "يَفْتَحُ ← اِفْتَحْ", "يَجْلِسُ ← اِجْلِسْ"] },
    { tr: "Mâzinin harekesi muzârinin harekesini her zaman göstermez: <span class=\"ar\">نَصَرَ يَنْصُرُ</span> ama <span class=\"ar\">جَعَلَ يَجْعَلُ</span>. Muzâriyi sözlükten öğren." }
  ],
  kaide: ["٣ ـ فِعْلُ الأَمْرِ: يَدُلُّ عَلَى طَلَبِ حُدُوثِ الفِعْلِ فِي الزَّمَنِ الحَاضِرِ أَوِ المُسْتَقْبَلِ، مِثْلُ: اُحْضُرْ، اِذْهَبْ، اِعْلَمْ."],
  ex: [
    { type: "combo", num: "٥", ar: "حَوِّلِ الفِعْلَ المَاضِيَ إِلَى المُضَارِعِ وَالأَمْرِ", tr: "Önce muzâriyi seç (ayn harekesine dikkat), sonra ondan emri seç.", exHtml: "<span class=\"ar\">حَفِظَ ← يَحْفَظُ ← اِحْفَظْ</span>", items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (i) {
      var f = FV[i], st = harfler(f[0]).map(function (h) { return h.charAt(0); }), v = { a: "َ", i: "ِ", u: "ُ" }, ks = ["a", "i", "u"];
      var mu = ks.map(function (k) { return "يَ" + st[0] + "ْ" + st[1] + v[k] + st[2] + "ُ"; });
      var em = ks.map(function (k) { return (k === "u" ? "اُ" : "اِ") + st[0] + "ْ" + st[1] + v[k] + st[2] + "ْ"; });
      var k = ks.indexOf(f[7]);
      return CB(f[0] + ' <span class="muted">(' + f[3] + ')</span>', [mu, "←", em], [k, k], f[1] + " (" + f[4] + ") · " + f[2] + " (" + f[5] + ")", "Muzâride ayn " + { a: "fetha", i: "kesre", u: "damme" }[f[7]] + (f[7] === "u" ? "; emrin hemzesi de damme: " : "; emrin hemzesi kesre: ") + f[2] + ".");
    })}
  ]
},
// ---------------------------------------------------------------- 4 · AYIRT ETME
{
  id: "u4", no: 4, ar: "أَقْسَامُ الفِعْلِ", tr: "Üç Fiili Ayırt Etme", short: "Ayırt etme", col: "mi", legend: ["cerr", "mz", "ref"],
  goals: ["Cümledeki fiilin mâzi mi, muzâri mi, emir mi olduğunu söylemek", "Zaman ipuçlarını kullanmak: الآنَ، يَا، dün, yarın", "Cümleye uygun fiili seçmek"],
  examples: [
    { s: "اُعْبُدْ:ref / رَبَّكَ:-", tr: "Rabbine ibadet et.", pair: "اِفْتَحْ:ref / كِتَابَكَ:-", pairTr: "Kitabını aç." },
    { s: "يَحْفَظُ:mz / عَلِيٌّ سُورَةَ الوَاقِعَةِ:-", tr: "Ali Vâkıa sûresini ezberliyor.", pair: "يَسْكُنُ:mz / صَالِحٌ فِي إِسْطَنْبُولَ:-", pairTr: "Salih İstanbul'da oturuyor." },
    { s: "بَعَثَ:cerr / اللهُ مُحَمَّدًا:-", tr: "Allah Muhammed'i gönderdi.", pair: "نَزَلَ:cerr / القُرْآنُ عَلَى مُحَمَّدٍ:-", pairTr: "Kur'an Muhammed'e indi." }
  ],
  rules: [
    { tr: "Sonuna <span class=\"ar\">ـتْ</span> ya da <span class=\"ar\">ـتُ</span> alabiliyorsa <b class=\"r-cerr\">mâzi</b>." },
    { tr: "Başına <span class=\"ar\">سَـ / سَوْفَ</span> alabiliyorsa, <span class=\"ar\">أ، ن، ي، ت</span> ile başlıyorsa <b class=\"r-mz\">muzâri</b>." },
    { tr: "Bir şey istiyorsa, hemzeyle başlayıp sakinle bitiyorsa <b class=\"r-ref\">emir</b>. Genelde yanında <span class=\"ar\">يَا</span> ile hitap vardır." },
    { tr: "İpuçları: <span class=\"ar\">الآنَ</span> (şimdi) → muzâri; <span class=\"ar\">أَمْسِ</span> (dün) → mâzi; <span class=\"ar\">يَا كَرِيمُ</span> → emir." }
  ],
  kaide: ["يَنْقَسِمُ الفِعْلُ مِنْ حَيْثُ زَمَانُهُ إِلَى ثَلَاثَةِ أَقْسَامٍ: مَاضٍ وَمُضَارِعٍ وَأَمْرٍ."],
  ex: [
    { type: "classify", num: "٢", opts: FT_OPTS, ar: "بَيِّنْ نَوْعَ الفِعْلِ فِي الجُمَلِ التَّالِيَةِ", tr: "Koyu yazılan fiilin türü ne?", items: [
      { s: HL("جَمَعَ المُدِيرُ العُمَّالَ أَمَامَ الشَّرِكَةِ.", "جَمَعَ"), a: "m", why: "جَمَعَتْ olabilir: mâzi.", tr: "Müdür işçileri şirketin önünde topladı." },
      { s: HL("يَدْرُسُ حَسَنٌ فِي كُلِّيَّةِ الإِلَهِيَّاتِ.", "يَدْرُسُ"), a: "u", why: "سَيَدْرُسُ olabilir: muzâri.", tr: "Hasan ilahiyat fakültesinde okuyor." },
      { s: HL("اُكْتُبْ رِسَالَةً إِلَى أَهْلِكَ.", "اُكْتُبْ"), a: "a", why: "İstek: emir.", tr: "Ailene bir mektup yaz." },
      { s: HL("اِجْلِسْ فِي المَسْجِدِ.", "اِجْلِسْ"), a: "a", why: "İstek: emir.", tr: "Mescitte otur." },
      { s: HL("يَسْمَعُ الأُسْتَاذُ كَلَامَ الطُّلَّابِ.", "يَسْمَعُ"), a: "u", why: "ي ile başlıyor, سَـ alabilir.", tr: "Hoca öğrencilerin sözünü dinliyor." },
      { s: HL("فَهِمْتُ دَرْسَ النَّحْوِ.", "فَهِمْتُ"), a: "m", why: "Zamir tâsı: mâzi.", tr: "Nahiv dersini anladım." },
      { s: HL("أَكَلْتُ الغَدَاءَ فِي المَطْعَمِ.", "أَكَلْتُ"), a: "m", why: "Dikkat: hemzeyle başlıyor ama emir değil; ـتُ aldığı için mâzi.", tr: "Öğle yemeğini lokantada yedim." },
      { s: HL("فَرِحَ النَّاسُ بِعِيدِ الفِطْرِ.", "فَرِحَ"), a: "m", why: "فَرِحَتْ olabilir: mâzi.", tr: "İnsanlar Ramazan Bayramı'na sevindi." }
    ]},
    { type: "pick", fill: true, num: "٣", ar: "عَيِّنِ الفِعْلَ المُنَاسِبَ ثُمَّ ضَعْهُ فِي الفَرَاغِ", tr: "Cümleye hangi fiil uyar? Özneye (erkek, kadın) ve ipuçlarına (الآنَ، يَا) bak.", items: [
      { q: "___ النُّجُومُ فِي السَّمَاءِ.", o: ["لَمَعَتْ", "يَلْمَعُ", "اِلْمَعْ"], a: 0, tr: "Yıldızlar gökte parladı.", why: "النُّجُومُ insan dışı çoğul: müennes fiil ister → لَمَعَتْ. يَلْمَعُ müzekkerdir." },
      { q: "___ اللهُ المُسْلِمِينَ فِي بَدْرٍ.", o: ["نَصَرَ", "تَنْصُرُ", "اُنْصُرُوا"], a: 0, tr: "Allah Bedir'de Müslümanlara yardım etti.", why: "Bedir geçmişte: نَصَرَ. تَنْصُرُ müennes/muhatab." },
      { q: "___ زَيْنَبُ وَاجِبَاتِهَا.", o: ["عَمِلَ", "تَعْمَلُ", "اِعْمَلْ"], a: 1, tr: "Zeynep ödevlerini yapıyor.", why: "زَيْنَبُ müennes: تَعْمَلُ. عَمِلَ müzekkerdir." },
      { q: "___ السُّيَّاحُ فِي هَذَا الفُنْدُقِ.", o: ["سَكَنَتْ", "يَسْكُنُ", "اُسْكُنْ"], a: 1, tr: "Turistler bu otelde kalıyor.", why: "Erkek özne, fiil önde: يَسْكُنُ." },
      { q: "___ العُمَّالُ الحِجَارَةَ مِنَ الجَبَلِ.", o: ["نَقَلَ", "تَنْقُلُ", "اُنْقُلْ"], a: 0, tr: "İşçiler taşları dağdan taşıdı.", why: "Erkek özne: نَقَلَ." },
      { q: "___ سَيَّارَتَكَ فِي المَوْقِفِ يَا كَرِيمُ.", o: ["تَرَكَتْ", "يَتْرُكُ", "اُتْرُكْ"], a: 2, tr: "Arabanı otoparka bırak ey Kerîm.", why: "يَا كَرِيمُ: hitap ve istek → emir." },
      { q: "___ البِنْتُ الحَلِيبَ الآنَ.", o: ["شَرِبَ", "تَشْرَبُ", "اِشْرَبْ"], a: 1, tr: "Kız şimdi süt içiyor.", why: "الآنَ (şimdi) + müennes özne → تَشْرَبُ." },
      { q: "___ الطَّالِبَاتُ مِنَ الوَلَدِ.", o: ["ضَحِكَتْ", "يَضْحَكُ", "اِضْحَكْ"], a: 0, tr: "Kız öğrenciler çocuğa güldü.", why: "Müennes özne: ضَحِكَتْ." }
    ]},
    { type: "bank", num: "٤", ar: "امْلَأِ الفَرَاغَ بِالفِعْلِ المُنَاسِبِ مِنْ بَيْنِ الأَفْعَالِ التَّالِيَةِ", tr: "Önce aşağıdan bir fiil seç, sonra uygun boşluğa dokun. Her fiil bir kez kullanılır.",
      bank: ["تَطْبُخُ", "فَهِمْتُ", "اِدْفَعْ", "يَرْجِعُ", "تَهْبِطُ", "يَذْهَبُ", "يَفْتَحُ", "سَأَلَ"], items: [
      { h: "حَدِيثَ رَسُولِ اللهِ ﷺ.", a: [1], tr: "Resûlullah'ın hadisini anladım." },
      { h: "المُوَظَّفُونَ إِلَى أَعْمَالِهِمْ صَبَاحًا.", a: [5], tr: "Memurlar sabah işlerine gidiyor." },
      { h: "خَدِيجَةُ الطَّعَامَ.", a: [0], tr: "Hadîce yemek pişiriyor." },
      { h: "المَرْضَى مِنَ المُسْتَشْفَى.", a: [3], tr: "Hastalar hastaneden dönüyor." },
      { h: "الشُّرْطِيُّ السَّائِقَ عَنِ اسْمِهِ.", a: [7], tr: "Polis şoföre adını sordu." },
      { h: "الإِمَامُ بَابَ المَسْجِدِ قَبْلَ صَلَاةِ الفَجْرِ.", a: [6], tr: "İmam sabah namazından önce caminin kapısını açıyor." },
      { h: "الحِسَابَ يَا جَمِيلُ!", a: [2], tr: "Hesabı öde ey Cemîl!" },
      { h: "الطَّائِرَةُ فِي المَطَارِ.", a: [4], tr: "Uçak havaalanına iniyor." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: بَطَلُ الجَرْيِ", tr: "Okuma: Koşu Şampiyonu", short: "Okuma", col: "muz", legend: ["cerr", "mz"],
  goals: ["Bir hikâyedeki fiilleri bulup türünü söylemek", "سَيَرْجِعُ gibi bir muzâride سَـ alametini görmek", "مَا وَجَدَ'de olumsuzluk edatından sonra mâziyi tanımak"],
  examples: [
    { s: "دَخَلَ:cerr / رَجُلٌ مَطْعَمًا:-", tr: "Bir adam bir lokantaya girdi." },
    { s: "يَمْلِكُ:mz / هَذَا المِعْطَفَ:-", tr: "Bu paltoya sahip." },
    { s: "وَسَيَرْجِعُ:mz.سَـ / بَعْدَ عَشْرِ دَقَائِقَ:-", tr: "Ve on dakika sonra dönecek." }
  ],
  rules: [
    { tr: "Hikâye anlatırken çoğunlukla <b class=\"r-cerr\">mâzi</b> kullanılır: <span class=\"ar\">دَخَلَ، عَلَّقَ، وَضَعَ</span>." },
    { tr: "Kâğıttaki not şimdiyi ve geleceği anlatır: <span class=\"ar\">يَمْلِكُ</span> (sahip), <span class=\"ar\">سَيَرْجِعُ</span> (dönecek)." },
    { tr: "<span class=\"ar\">مَا وَجَدَ</span>: <span class=\"ar\">مَا</span> olumsuzluk edatıdır; fiil yine mâzidir (bulmadı)." },
    { tr: "<span class=\"ar\">قَرَأَهَا</span>: mâzi + isme değil fiile bitişik zamir (onu okudu)." }
  ],
  kaide: ["اقْرَأِ القِطْعَةَ ثُمَّ اذْكُرْ أَنْوَاعَ الأَفْعَالِ."],
  ex: [
    { type: "reading", num: "٨", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ اذْكُرْ أَنْوَاعَ الأَفْعَالِ", tr: "Hikâyeyi oku, sonra aşağıda fiillerin türünü seç.", title: "بَطَلُ الجَرْيِ",
      text: "دَخَلَ رَجُلٌ مَطْعَمًا، وَعَلَّقَ مِعْطَفَهُ عَلَى المِشْجَبِ، وَوَضَعَ عَلَيْهِ وَرَقَةً، كَتَبَ فِي الوَرَقَةِ: «بَطَلُ المُلَاكَمَةِ يَمْلِكُ هَذَا المِعْطَفَ، وَسَيَرْجِعُ بَعْدَ عَشْرِ دَقَائِقَ». لَمَّا رَجَعَ الرَّجُلُ مَا وَجَدَ المِعْطَفَ، وَرَأَى مَكَانَهُ وَرَقَةً. أَخَذَ الوَرَقَةَ ثُمَّ قَرَأَهَا: «بَطَلُ الجَرْيِ أَخَذَ المِعْطَفَ وَذَهَبَ!»",
      textTr: "Koşu Şampiyonu. Bir adam bir lokantaya girdi, paltosunu askıya astı ve üzerine bir kâğıt koydu. Kâğıda şunu yazdı: \"Bu paltonun sahibi boks şampiyonudur, on dakika sonra dönecek.\" Adam döndüğünde paltoyu bulamadı; yerinde bir kâğıt gördü. Kâğıdı alıp okudu: \"Koşu şampiyonu paltoyu aldı ve gitti!\"",
      qa: [
        { q: "مَاذَا كَتَبَ الرَّجُلُ فِي الوَرَقَةِ؟", a: "كَتَبَ: بَطَلُ المُلَاكَمَةِ يَمْلِكُ هَذَا المِعْطَفَ، وَسَيَرْجِعُ بَعْدَ عَشْرِ دَقَائِقَ.", tr: "Adam kâğıda ne yazdı? \"Bu paltonun sahibi boks şampiyonu, on dakika sonra dönecek.\"" },
        { q: "مَاذَا وَجَدَ الرَّجُلُ لَمَّا رَجَعَ؟", a: "مَا وَجَدَ المِعْطَفَ، وَرَأَى مَكَانَهُ وَرَقَةً.", tr: "Adam dönünce ne buldu? Paltoyu bulamadı, yerinde bir kâğıt gördü." },
        { q: "مَنْ أَخَذَ المِعْطَفَ؟", a: "أَخَذَهُ بَطَلُ الجَرْيِ.", tr: "Paltoyu kim aldı? Koşu şampiyonu." }
      ],
      cls: { opts: FT_OPTS, ar: "اذْكُرْ أَنْوَاعَ الأَفْعَالِ", tr: "Hikâyedeki fiil mâzi mi, muzâri mi, emir mi? (Bu hikâyede emir yok.)", items: [
        { s: HL("دَخَلَ رَجُلٌ مَطْعَمًا", "دَخَلَ"), a: "m", why: "girdi: mâzi." },
        { s: HL("وَعَلَّقَ مِعْطَفَهُ عَلَى المِشْجَبِ", "عَلَّقَ"), a: "m", why: "astı: mâzi (عَلَّقَتْ olabilir)." },
        { s: HL("وَوَضَعَ عَلَيْهِ وَرَقَةً", "وَضَعَ"), a: "m", why: "koydu: mâzi." },
        { s: HL("كَتَبَ فِي الوَرَقَةِ", "كَتَبَ"), a: "m", why: "yazdı: mâzi." },
        { s: HL("بَطَلُ المُلَاكَمَةِ يَمْلِكُ هَذَا المِعْطَفَ", "يَمْلِكُ"), a: "u", why: "sahip: muzâri (ي ile başlıyor)." },
        { s: HL("وَسَيَرْجِعُ بَعْدَ عَشْرِ دَقَائِقَ", "سَيَرْجِعُ"), a: "u", why: "سَـ alameti: muzâri, gelecek." },
        { s: HL("لَمَّا رَجَعَ الرَّجُلُ", "رَجَعَ"), a: "m", why: "döndü: mâzi." },
        { s: HL("مَا وَجَدَ المِعْطَفَ", "وَجَدَ"), a: "m", why: "مَا olumsuzluk; fiil mâzi: bulmadı." },
        { s: HL("وَرَأَى مَكَانَهُ وَرَقَةً", "رَأَى"), a: "m", why: "gördü: mâzi (رَأَتْ olabilir)." },
        { s: HL("أَخَذَ الوَرَقَةَ ثُمَّ قَرَأَهَا", "قَرَأَهَا"), a: "m", why: "قَرَأَ + هَا: mâzi." },
        { s: HL("بَطَلُ الجَرْيِ أَخَذَ المِعْطَفَ", "أَخَذَ"), a: "m", why: "aldı: mâzi; hemzeyle başlıyor ama emir değil." },
        { s: HL("أَخَذَ المِعْطَفَ وَذَهَبَ!", "ذَهَبَ"), a: "m", why: "gitti: mâzi." }
      ]}
    }
  ]
}
];

// Doğru Fiil oyunu: [cümle {hedef}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var FT_POOL = [
  ["{خَرَجَ} الأُسْتَاذُ مِنَ الصَّفِّ أَمْسِ.", ["خَرَجَ", "يَخْرُجُ", "اُخْرُجْ"], "أَمْسِ (dün) → mâzi", "Hoca dün sınıftan çıktı.", "u1"],
  ["{حَمَلْتُ} الكُتُبَ إِلَى البَيْتِ.", ["حَمَلْتُ", "يَحْمِلُ", "اِحْمِلْ"], "ـتُ alameti → mâzi", "Kitapları eve taşıdım.", "u1"],
  ["{فَحَصَتِ} الطَّبِيبَةُ المَرِيضَةَ.", ["فَحَصَتِ", "يَفْحَصُ", "اِفْحَصْ"], "kadın özne, geçmiş → sakin tâ", "Kadın doktor hastayı muayene etti.", "u1"],
  ["{بَعَثَ} اللهُ مُحَمَّدًا ﷺ.", ["بَعَثَ", "اِبْعَثْ", "سَبَعَثَ"], "geçmiş olay → mâzi", "Allah Muhammed'i gönderdi.", "u1"],
  ["{نَزَلَ} القُرْآنُ عَلَى مُحَمَّدٍ.", ["نَزَلَ", "اِنْزِلْ", "سَنَزَلَ"], "geçmiş olay → mâzi", "Kur'an Muhammed'e indi.", "u1"],
  ["{سَيَحْضُرُ} الأُسْتَاذُ غَدًا.", ["سَيَحْضُرُ", "سَحَضَرَ", "سَاُحْضُرْ"], "سَـ yalnız muzâriye gelir", "Hoca yarın gelecek.", "u2"],
  ["{يَلْعَبُ} الأَطْفَالُ فِي الحَدِيقَةِ الآنَ.", ["يَلْعَبُ", "لَعِبَ", "اِلْعَبْ"], "الآنَ (şimdi) → muzâri", "Çocuklar şimdi bahçede oynuyor.", "u2"],
  ["{سَوْفَ يَذْهَبُ} الضُّيُوفُ إِلَى حَدِيقَةِ الحَيَوَانَاتِ.", ["سَوْفَ يَذْهَبُ", "سَوْفَ ذَهَبَ", "سَوْفَ اِذْهَبْ"], "سَوْفَ + muzâri", "Misafirler hayvanat bahçesine gidecek.", "u2"],
  ["{سَأَذْهَبُ} إِلَى قُونْيَا غَدًا.", ["سَأَذْهَبُ", "ذَهَبْتُ", "اِذْهَبْ"], "غَدًا (yarın), ben → سَأَ", "Yarın Konya'ya gideceğim.", "u2"],
  ["{تَشْرَبُ} البِنْتُ الحَلِيبَ الآنَ.", ["تَشْرَبُ", "شَرِبَ", "اِشْرَبْ"], "الآنَ + kadın özne", "Kız şimdi süt içiyor.", "u2"],
  ["{اِقْرَأْ} كِتَابَكَ يَا حَسَنُ.", ["اِقْرَأْ", "قَرَأَ", "يَقْرَأُ"], "يَا حَسَنُ: hitap ve istek → emir", "Kitabını oku ey Hasan.", "u3"],
  ["{اُتْرُكْ} سَيَّارَتَكَ فِي المَوْقِفِ يَا كَرِيمُ.", ["اُتْرُكْ", "تَرَكَتْ", "يَتْرُكُ"], "istek → emir; يَتْرُكُ'da ayn damme → اُ", "Arabanı otoparka bırak ey Kerîm.", "u3"],
  ["{اُكْتُبْ} رِسَالَةً إِلَى أَهْلِكَ.", ["اُكْتُبْ", "اِكْتُبْ", "اُكْتِبْ"], "يَكْتُبُ: ayn damme → hemze damme", "Ailene bir mektup yaz.", "u3"],
  ["{اِفْتَحْ} كِتَابَكَ.", ["اِفْتَحْ", "اُفْتَحْ", "اِفْتُحْ"], "يَفْتَحُ: ayn fetha → hemze kesre", "Kitabını aç.", "u3"],
  ["{اِجْلِسْ} فِي المَسْجِدِ.", ["اِجْلِسْ", "اُجْلُسْ", "اِجْلَسْ"], "يَجْلِسُ: ayn kesre → hemze kesre", "Mescitte otur.", "u3"],
  ["{اُعْبُدْ} رَبَّكَ.", ["اُعْبُدْ", "اِعْبَدْ", "اِعْبِدْ"], "يَعْبُدُ: ayn damme → اُ", "Rabbine ibadet et.", "u3"],
  ["{جَمَعَ} المُدِيرُ العُمَّالَ أَمَامَ الشَّرِكَةِ.", ["جَمَعَ", "اِجْمَعْ", "سَجَمَعَ"], "bitmiş iş → mâzi", "Müdür işçileri şirketin önünde topladı.", "u4"],
  ["{لَمَعَتِ} النُّجُومُ فِي السَّمَاءِ.", ["لَمَعَتِ", "يَلْمَعُ", "اِلْمَعْ"], "insan dışı çoğul → müennes fiil", "Yıldızlar gökte parladı.", "u4"],
  ["{تَعْمَلُ} زَيْنَبُ وَاجِبَاتِهَا.", ["تَعْمَلُ", "عَمِلَ", "اِعْمَلْ"], "Zeynep müennes → تَ", "Zeynep ödevlerini yapıyor.", "u4"],
  ["{اِدْفَعِ} الحِسَابَ يَا جَمِيلُ!", ["اِدْفَعِ", "يَدْفَعُ", "دَفَعَ"], "يَا جَمِيلُ → emir", "Hesabı öde ey Cemîl!", "u4"],
  ["{تَهْبِطُ} الطَّائِرَةُ فِي المَطَارِ.", ["تَهْبِطُ", "يَهْبِطُ", "اِهْبِطْ"], "الطَّائِرَةُ müennes → تَ", "Uçak havaalanına iniyor.", "u4"],
  ["{دَخَلَ} رَجُلٌ مَطْعَمًا.", ["دَخَلَ", "اُدْخُلْ", "سَدَخَلَ"], "hikâye → mâzi", "Bir adam lokantaya girdi.", "u5"],
  ["بَطَلُ المُلَاكَمَةِ {يَمْلِكُ} هَذَا المِعْطَفَ.", ["يَمْلِكُ", "مَلَكَتْ", "اِمْلِكْ"], "şimdiki durum → muzâri", "Bu palto boks şampiyonunun.", "u5"],
  ["وَ{سَيَرْجِعُ} بَعْدَ عَشْرِ دَقَائِقَ.", ["سَيَرْجِعُ", "سَرَجَعَ", "سَارْجِعْ"], "gelecek → سَـ + muzâri", "On dakika sonra dönecek.", "u5"],
  ["بَطَلُ الجَرْيِ {أَخَذَ} المِعْطَفَ وَذَهَبَ!", ["أَخَذَ", "يَأْخُذُ", "سَأَخَذَ"], "olmuş iş → mâzi", "Koşu şampiyonu paltoyu aldı ve gitti!", "u5"]
];
var HAFIZA = {
  mu: { name: "Mâzi ↔ muzâri", pairs: FV.slice(0, 12).map(function (f) { return [f[0], f[1]]; }) },
  em: { name: "Muzâri ↔ emir", pairs: FV.slice(10, 22).map(function (f) { return [f[1], f[2]]; }) },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["كَتَبَ", "yazdı"], ["يَكْتُبُ", "yazıyor"], ["اُكْتُبْ", "yaz!"], ["سَيَذْهَبُ", "gidecek"], ["ذَهَبَتْ", "(kadın) gitti"], ["حَضَرْتُ", "geldim"], ["اِجْلِسْ", "otur!"], ["يَشْرَبُ", "içiyor"], ["فَتَحْتَ", "açtın"], ["سَوْفَ نَرْجِعُ", "döneceğiz"], ["اِفْهَمْ", "anla!"], ["عَلِمْتِ", "(kadın) bildin"]] }
};
var KARTLAR = [
  ["Fiil zamanına göre kaça ayrılır?", "Üçe: mâzi (geçmiş), muzâri (şimdi, gelecek), emir (istek)."],
  ["Mâzinin iki alameti?", "Sakin tâ: ذَهَبَتْ · zamir tâsı: حَضَرْتُ"],
  ["Muzârinin alameti?", "Başına سَـ ya da سَوْفَ gelebilir: سَيَحْضُرُ، سَوْفَ يَذْهَبُ"],
  ["Emir neyi gösterir?", "Şimdi ya da gelecekte bir işin yapılmasını ister: اُحْضُرْ، اِذْهَبْ"],
  ["Fâ, ayn, lâm nedir?", "Üç harfli mâzinin 1., 2. ve 3. harfi: فَـ عَـ لَ"],
  ["Ayn harekeleri?", "Fetha: فَتَحَ · kesre: عَلِمَ · damme: حَسُنَ"],
  ["Emrin hemzesi ne zaman damme?", "Muzâride ayn damme ise: يَكْتُبُ ← اُكْتُبْ"],
  ["Emrin hemzesi ne zaman kesre?", "Muzâride ayn fetha ya da kesre ise: يَفْتَحُ ← اِفْتَحْ · يَجْلِسُ ← اِجْلِسْ"],
  ["أَكَلْتُ emir mi?", "Hayır. Hemzeyle başlıyor ama ـتُ aldığı için mâzi: yedim."],
  ["الآنَ ve أَمْسِ ipucu?", "الآنَ (şimdi) → muzâri · أَمْسِ (dün) → mâzi"],
  ["Muzârinin baş harfleri?", "أ، ن، ي، ت (أَنَيْتُ): أَذْهَبُ، نَذْهَبُ، يَذْهَبُ، تَذْهَبُ"],
  ["مَا وَجَدَ hangi fiil?", "Mâzi; مَا olumsuzluk edatı: bulmadı."]
];
