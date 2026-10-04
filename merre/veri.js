// ================= VERİ: Masdar-ı Merre, Masdar-ı Hey’e, Masdar-ı Sınâî =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  nasb: { ar: "مَصْدَرُ المَرَّةِ", tr: "Masdar-ı merre" }, cerr: { ar: "مَصْدَرُ الهَيْئَةِ", tr: "Masdar-ı hey’e" }, mi: { ar: "المَصْدَرُ الصِّنَاعِيُّ", tr: "Masdar-ı sınâî" },
  mz: { ar: "المَصْدَرُ الأَصْلِيُّ", tr: "Asıl masdar" }, x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var MH = [["m", "Merre", "مَصْدَرُ المَرَّةِ", "nasb"], ["h", "Hey’e", "مَصْدَرُ الهَيْئَةِ", "cerr"]];
var MH4 = [["m", "Merre", "مَصْدَرُ المَرَّةِ", "nasb"], ["h", "Hey’e", "مَصْدَرُ الهَيْئَةِ", "cerr"], ["a", "Asıl masdar", "مَصْدَرٌ أَصْلِيٌّ", "mz"], ["s", "Sınâî", "مَصْدَرٌ صِنَاعِيٌّ", "mi"]];
var MH4_TR = { m: "Masdar-ı merre", h: "Masdar-ı hey’e", a: "Asıl masdar", s: "Masdar-ı sınâî" };
var SNO = [["s", "Masdar-ı sınâî", "مَصْدَرٌ صِنَاعِيٌّ", "mi"], ["n", "Nisbe sıfatı", "اسْمٌ مَنْسُوبٌ", "mz"]];
// Sülâsî fiiller: [mâzi, asıl masdar (mansûb), asıl masdar (muzâf), merre gövdesi, hey’e gövdesi, anlam, hey’e için muzâfun ileyh, "… gibi"]
var MV = [
  ["جَلَسَ", "جُلُوسًا", "جُلُوسَ", "جَلْسَ", "جِلْسَ", "oturmak", "المَلِكِ", "kral gibi"],
  ["وَقَفَ", "وُقُوفًا", "وُقُوفَ", "وَقْفَ", "وِقْفَ", "durmak", "الأَبْطَالِ", "kahramanlar gibi"],
  ["مَشَى", "مَشْيًا", "مَشْيَ", "مَشْيَ", "مِشْيَ", "yürümek", "الشَّيْخِ", "yaşlı biri gibi"],
  ["نَظَرَ", "نَظَرًا", "نَظَرَ", "نَظْرَ", "نِظْرَ", "bakmak", "الخَصْمِ", "düşman gibi"],
  ["فَرِحَ", "فَرَحًا", "فَرَحَ", "فَرْحَ", "فِرْحَ", "sevinmek", "المُنْتَصِرِ", "galip gelen gibi"],
  ["ضَحِكَ", "ضَحِكًا", "ضَحِكَ", "ضَحْكَ", "ضِحْكَ", "gülmek", "المُتَكَبِّرِ", "kibirli gibi"],
  ["قَفَزَ", "قَفْزًا", "قَفْزَ", "قَفْزَ", "قِفْزَ", "sıçramak", "الأَسَدِ", "aslan gibi"],
  ["وَثَبَ", "وَثْبًا", "وَثْبَ", "وَثْبَ", "وِثْبَ", "atılmak", "الأَسَدِ", "aslan gibi"],
  ["سَجَدَ", "سُجُودًا", "سُجُودَ", "سَجْدَ", "سِجْدَ", "secde etmek", "الخَاشِعِ", "huşu içindeki gibi"],
  ["رَكَعَ", "رُكُوعًا", "رُكُوعَ", "رَكْعَ", "رِكْعَ", "rükû etmek", "الخَاشِعِ", "huşu içindeki gibi"],
  ["ضَرَبَ", "ضَرْبًا", "ضَرْبَ", "ضَرْبَ", "ضِرْبَ", "vurmak", "البَطَلِ", "kahraman gibi"],
  ["أَكَلَ", "أَكْلًا", "أَكْلَ", "أَكْلَ", "إِكْلَ", "yemek", "الجَائِعِ", "aç biri gibi"],
  ["قَعَدَ", "قُعُودًا", "قُعُودَ", "قَعْدَ", "قِعْدَ", "oturmak", "المُتَوَاضِعِ", "alçakgönüllü gibi"],
  ["دَمَعَ", "دَمْعًا", "دَمْعَ", "دَمْعَ", "دِمْعَ", "yaşarmak (göz)", "الخَائِفِ", "korkan biri gibi"]
];
// Tâ’lı masdar ve mezîd: [mâzi, asıl masdar, merre, anlam, açıklama]
var MV2 = [
  ["دَعَا", "دَعْوَةٌ", "دَعْوَةً وَاحِدَةً", "davet etmek", "Asıl masdar zaten tâ’lı: وَاحِدَةً ile nitelenir."],
  ["رَحِمَ", "رَحْمَةٌ", "رَحْمَةً وَاحِدَةً", "merhamet etmek", "Asıl masdar zaten tâ’lı: وَاحِدَةً ile nitelenir."],
  ["أَقَامَ", "إِقَامَةٌ", "إِقَامَةً وَاحِدَةً", "ikamet etmek", "Mezîd ve tâ’lı: وَاحِدَةً ile nitelenir."],
  ["اِسْتَفْهَمَ", "اِسْتِفْهَامٌ", "اِسْتِفْهَامَةً", "soru sormak", "Mezîd: asıl masdarın sonuna tâ eklenir."],
  ["اِنْطَلَقَ", "اِنْطِلَاقٌ", "اِنْطِلَاقَةً", "yola koyulmak", "Mezîd: asıl masdarın sonuna tâ eklenir."],
  ["اِبْتَسَمَ", "اِبْتِسَامٌ", "اِبْتِسَامَةً", "gülümsemek", "Mezîd: asıl masdarın sonuna tâ eklenir."],
  ["أَكْرَمَ", "إِكْرَامٌ", "إِكْرَامَةً", "ikram etmek", "Mezîd: asıl masdarın sonuna tâ eklenir."]
];
// Makine maddeleri: [mâzi, asıl masdar, merre cümlesi, hey’e cümlesi | null, anlam, merre Türkçe, hey’e Türkçe, not]
var MK = MV.map(function (v) {
  return [v[0], v[2].slice(0, -1) + "ٌ", v[0] + " " + v[3] + "ةً", v[0] + " " + v[4] + "ةَ " + v[6], v[5], "bir kez", v[7], "Merre فَعْلَةٌ (fâ üstünlü), hey’e فِعْلَةٌ (fâ esreli)."];
}).concat(MV2.map(function (v) { return [v[0], v[1], v[0] + " " + v[2], null, v[3], "bir kez", "", v[4] + " Hey’enin mezîdde belirli kalıbı yoktur."]; }));
// Masdar-ı sınâî: [kelime, sınâî, nisbe, yanlış, kelime Türkçe, sınâî Türkçe, kelimenin türü]
var SN = [
  ["إِسْلَامٌ", "إِسْلَامِيَّةٌ", "إِسْلَامِيٌّ", "إِسْلَامَةٌ", "İslâm", "İslâmiyet", "masdar"],
  ["إِنْسَانٌ", "إِنْسَانِيَّةٌ", "إِنْسَانِيٌّ", "إِنْسَانَةٌ", "insan", "insanlık", "câmid isim"],
  ["حُرٌّ", "حُرِّيَّةٌ", "حُرِّيٌّ", "حُرَّةٌ", "hür", "hürriyet", "sıfat"],
  ["مَسْؤُولٌ", "مَسْؤُولِيَّةٌ", "مَسْؤُولِيٌّ", "مَسْؤُولَةٌ", "sorumlu", "sorumluluk", "ism-i mef’ûl"],
  ["شَخْصٌ", "شَخْصِيَّةٌ", "شَخْصِيٌّ", "شَخْصَةٌ", "şahıs", "şahsiyet", "câmid isim"],
  ["أَهَمُّ", "أَهَمِّيَّةٌ", "أَهَمِّيٌّ", "هَامَّةٌ", "daha önemli", "önem", "ism-i tafdîl"],
  ["أَفْضَلُ", "أَفْضَلِيَّةٌ", "أَفْضَلِيٌّ", "فَضِيلَةٌ", "daha üstün", "öncelik, üstünlük", "ism-i tafdîl"],
  ["كَيْفَ", "كَيْفِيَّةٌ", "كَيْفِيٌّ", "كَيْفَةٌ", "nasıl", "keyfiyet, nasıllık", "soru edatı"],
  ["هُوَ", "هُوِيَّةٌ", "هُوِيٌّ", "هُوَةٌ", "o", "hüviyet, kimlik", "zamir"],
  ["فَرْضٌ", "فَرْضِيَّةٌ", "فَرْضِيٌّ", "فَرِيضَةٌ", "farz", "farziyet", "masdar"],
  ["أَكْثَرُ", "أَكْثَرِيَّةٌ", "أَكْثَرِيٌّ", "كَثْرَةٌ", "daha çok", "çoğunluk", "ism-i tafdîl"],
  ["أَقَلُّ", "أَقَلِّيَّةٌ", "أَقَلِّيٌّ", "قِلَّةٌ", "daha az", "azınlık", "ism-i tafdîl"],
  ["جَاهِلٌ", "جَاهِلِيَّةٌ", "جَاهِلِيٌّ", "جَهَالَةٌ", "câhil", "câhiliye", "ism-i fâil"],
  ["عُنْصُرٌ", "عُنْصُرِيَّةٌ", "عُنْصُرِيٌّ", "عَنَاصِرُ", "unsur, ırk", "ırkçılık", "câmid isim"],
  ["شَاعِرٌ", "شَاعِرِيَّةٌ", "شَاعِرِيٌّ", "شِعْرٌ", "şair", "şairlik yeteneği", "ism-i fâil"],
  ["حَسَّاسٌ", "حَسَّاسِيَّةٌ", "حَسَّاسِيٌّ", "حِسٌّ", "hassas", "alerji, hassasiyet", "mübalağa sîgası"],
  ["إِحْصَاءٌ", "إِحْصَائِيَّةٌ", "إِحْصَائِيٌّ", "إِحْصَاءَةٌ", "sayım", "istatistik", "masdar"]
];

function W(s, tr, why) {
  return { c: s.split(" ").map(function (w) {
    var m = /^([^\[\{]*)\[(.*)\](.*)$/.exec(w), p = /^([^\[\{]*)\{(.*)\}(.*)$/.exec(w);
    if (m) return (m[1] + m[2] + m[3]).replace(/_/g, " ") + ":y";
    if (p) return (p[1] + p[2] + p[3]).replace(/_/g, " ") + ":-";
    return w.replace(/_/g, " ") + ":x";
  }).join(" / "), tr: tr, why: why };
}
function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
var UNITS = [
// ---------------------------------------------------------------- 1 · MERRE
{
  id: "u1", no: 1, ar: "مَصْدَرُ المَرَّةِ", tr: "Masdar-ı Merre", short: "Merre", col: "nasb", legend: ["nasb", "mz"],
  goals: ["Masdar-ı merrenin işin bir kez yapıldığını bildirdiğini bilmek: جَلَسَ جَلْسَةً (bir kez oturdu)", "Sülâsîden فَعْلَةٌ kalıbıyla yapmak; asıl masdar tâ’lı ise وَاحِدَةٌ ile nitelemek: دَعْوَةً وَاحِدَةً", "Mezîdden asıl masdara tâ ekleyerek yapmak: اِسْتِفْهَامٌ ← اِسْتِفْهَامَةٌ"],
  examples: [
    { s: "جَلَسَ الطِّفْلُ اليَوْمَ:- / جَلْسَةً.:nasb", tr: "Çocuk bugün bir kez oturdu.", pair: "شَرِبَ المَرِيضُ مِنَ الدَّوَاءِ:- / شَرْبَةً.:nasb", pairTr: "Hasta ilaçtan bir yudum (bir kez) içti." },
    { s: "دَعَوْتُ جَارِي إِلَى بَيْتِي:- / دَعْوَةً وَاحِدَةً.:nasb", tr: "Komşumu evime bir kez davet ettim." }
  ],
  rules: [
    { tr: "<b class=\"r-nasb\">Masdar-ı merre</b> (<span class=\"ar\">مَصْدَرُ المَرَّةِ</span>): işin <b>bir kez</b> olduğunu bildiren isimdir. Soru: <b>kaç kez?</b>" },
    { tr: "Sülâsîden kalıbı <b class=\"ar\">فَعْلَةٌ</b> (fâ üstünlü, ayn sükûnlu, sonda tâ):", ex: ["جَلَسَ ← جَلْسَةٌ", "شَرِبَ ← شَرْبَةٌ", "سَجَدَ ← سَجْدَةٌ", "نَظَرَ ← نَظْرَةٌ"] },
    { tr: "Asıl masdar zaten <b>tâ-yı merbûta</b> ile bitiyorsa merre <span class=\"ar\">وَاحِدَةٌ</span> sıfatıyla belirtilir:", ex: ["رَحْمَةٌ وَاحِدَةٌ", "دَعْوَةٌ وَاحِدَةٌ", "إِقَامَةٌ وَاحِدَةٌ"] },
    { tr: "<b>Mezîd</b> fiilde asıl masdarın sonuna tâ eklenir:", ex: ["اِسْتِفْهَامٌ ← اِسْتِفْهَامَةٌ", "اِنْطِلَاقٌ ← اِنْطِلَاقَةٌ", "اِبْتِسَامٌ ← اِبْتِسَامَةٌ"] },
    { tr: "Merre müsennâ ve cemi olabilir: <span class=\"ar\">ضَرْبَتَانِ، فَرْحَتَانِ، رَكْعَتَيْنِ</span>. Asıl masdarı فَعْل olmayan fiilde de kalıp فَعْلَةٌ’dir: <span class=\"ar\">زَارَ (زِيَارَةٌ) ← زَوْرَةٌ</span>." }
  ],
  kaide: [
    "١ ـ مَصْدَرُ المَرَّةِ: اسْمٌ يَدُلُّ عَلَى حُدُوثِ الفِعْلِ مَرَّةً وَاحِدَةً.",
    "صِيغَتُهُ مِنَ الفِعْلِ الثُّلَاثِيِّ: فَعْلَةٌ، مِثْلُ: جَلْسَةٌ.",
    "إِذَا كَانَ المَصْدَرُ الأَصْلِيُّ مَخْتُومًا بِالتَّاءِ المَرْبُوطَةِ وُصِفَ المَصْدَرُ بِلَفْظِ «وَاحِدَة»، مِثْلُ: رَحْمَةٌ وَاحِدَةٌ، دَعْوَةٌ وَاحِدَةٌ، إِقَامَةٌ وَاحِدَةٌ.",
    "مَصْدَرُ المَرَّةِ مِنَ الفِعْلِ غَيْرِ الثُّلَاثِيِّ يَأْتِي بِزِيَادَةِ تَاءٍ مَرْبُوطَةٍ فِي آخِرِهِ عَلَى مَصْدَرِهِ الأَصْلِيِّ، مِثْلُ: اِسْتِفْهَامٌ ← اِسْتِفْهَامَةٌ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٢", ar: "هَاتِ مَصْدَرَ المَرَّةِ مِنَ الأَفْعَالِ الآتِيَةِ", tr: "Boşluğa fiilin masdar-ı merresini koy: فَعْلَةً.", items: [
      { q: "أَكَلْتُ فِي اليَوْمِ ___.", o: ["أَكْلَةً", "إِكْلَةً", "أَكْلًا"], a: 0, tr: "Günde bir öğün (bir kez) yedim.", why: "أَكَلَ ← أَكْلَةٌ." },
      { q: "رَكَعَ المُصَلِّي ___.", o: ["رُكُوعًا", "رَكْعَةً", "رِكْعَةً"], a: 1, tr: "Namaz kılan bir kez rükû etti.", why: "رَكَعَ ← رَكْعَةٌ." },
      { q: "صَرَخَ المَرِيضُ ___.", o: ["صِرْخَةً", "صُرَاخًا", "صَرْخَةً"], a: 2, tr: "Hasta bir kez bağırdı.", why: "صَرَخَ ← صَرْخَةٌ." },
      { q: "دَعَوْتُ الأَصْدِقَاءَ إِلَى الغَدَاءِ ___.", o: ["دَعْوَةً وَاحِدَةً", "دَعْوَةً", "دِعْوَةً"], a: 0, tr: "Arkadaşları öğle yemeğine bir kez davet ettim.", why: "Asıl masdar دَعْوَةٌ zaten tâ’lı: وَاحِدَةً ile belirtilir." },
      { q: "وَقَفَتِ الحَافِلَةُ فِي المَحَطَّةِ ___.", o: ["وِقْفَةً", "وَقْفَةً", "وُقُوفًا"], a: 1, tr: "Otobüs durakta bir kez durdu.", why: "وَقَفَ ← وَقْفَةٌ." },
      { q: "هَجَمَ اللَّاعِبُونَ ___ وَسَجَّلُوا الهَدَفَ.", o: ["هَجْمَةً", "هِجْمَةً", "هُجُومًا"], a: 0, tr: "Oyuncular bir atak yaptı ve golü attı.", why: "هَجَمَ ← هَجْمَةٌ." },
      { q: "نَظَرَ السَّائِحُ إِلَى الصُّورَةِ ___.", o: ["نِظْرَةً", "نَظَرًا", "نَظْرَةً"], a: 2, tr: "Turist resme bir kez baktı.", why: "نَظَرَ ← نَظْرَةٌ." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "مَصْدَرُ المَرَّةِ مِنَ المَصْدَرِ المَخْتُومِ بِالتَّاءِ وَمِنْ غَيْرِ الثُّلَاثِيِّ", tr: "Asıl masdar tâ’lı mı? Fiil mezîd mi? Doğru merreyi seç.", items: [
      { q: "رَحِمَ ← ___", o: ["رَحْمَةٌ وَاحِدَةٌ", "رَحْمَةٌ", "رِحْمَةٌ"], a: 0, tr: "bir kez merhamet", why: "Asıl masdar رَحْمَةٌ tâ’lı: وَاحِدَةٌ eklenir." },
      { q: "اِسْتَفْهَمَ ← ___", o: ["اِسْتِفْهَامٌ وَاحِدٌ", "اِسْتِفْهَامَةٌ", "فَهْمَةٌ"], a: 1, tr: "bir kez sorma", why: "Mezîd: اِسْتِفْهَامٌ + ة." },
      { q: "أَقَامَ ← ___", o: ["إِقَامَةٌ", "قَوْمَةٌ", "إِقَامَةٌ وَاحِدَةٌ"], a: 2, tr: "bir kez ikamet", why: "Asıl masdar إِقَامَةٌ tâ’lı: وَاحِدَةٌ eklenir." },
      { q: "اِنْطَلَقَ ← ___", o: ["اِنْطِلَاقَةٌ", "طَلْقَةٌ", "اِنْطِلَاقٌ"], a: 0, tr: "bir çıkış, atılım", why: "Mezîd: اِنْطِلَاقٌ + ة." },
      { q: "اِبْتَسَمَ ← ___", o: ["بَسْمَةٌ", "اِبْتِسَامَةٌ", "اِبْتِسَامٌ"], a: 1, tr: "bir gülümseme", why: "Mezîd: اِبْتِسَامٌ + ة." },
      { q: "زَارَ ← ___", o: ["زِيَارَةٌ", "زِيَارَةٌ وَاحِدَةٌ", "زَوْرَةٌ"], a: 2, tr: "bir kez ziyaret", why: "Sülâsî: kalıp فَعْلَةٌ → زَوْرَةٌ. (Asıl masdar زِيَارَةٌ.)" }
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · HEY’E
{
  id: "u2", no: 2, ar: "مَصْدَرُ الهَيْئَةِ", tr: "Masdar-ı Hey’e", short: "Hey’e", col: "cerr", legend: ["cerr", "nasb"],
  goals: ["Masdar-ı hey’enin işin nasıl, hangi biçimde yapıldığını bildirdiğini bilmek: جِلْسَةَ الرَّجُلِ (adam gibi oturuş)", "Sülâsîden فِعْلَةٌ kalıbıyla yapmak ve izafet ya da sıfatla tamamlamak", "Merre (فَعْلَةٌ) ile hey’eyi (فِعْلَةٌ) harekesinden ayırmak"],
  examples: [
    { s: "جَلَسَ الطِّفْلُ اليَوْمَ:- / جِلْسَةَ:cerr / الرَّجُلِ.:-", tr: "Çocuk bugün adam gibi oturdu.", pair: "جَلَسَ الطِّفْلُ اليَوْمَ:- / جَلْسَةً.:nasb", pairTr: "Çocuk bugün bir kez oturdu." },
    { s: "فَهُوَ فِي:- / عِيشَةٍ:cerr / رَاضِيَةٍ:-", tr: "O, hoşnut bir yaşayış içindedir. (Hâkka 21) · sıfatla" }
  ],
  rules: [
    { tr: "<b class=\"r-cerr\">Masdar-ı hey’e</b> (<span class=\"ar\">مَصْدَرُ الهَيْئَةِ</span>): işin <b>yapılış biçimini</b> bildiren isimdir. Soru: <b>nasıl?</b>" },
    { tr: "Sülâsîden kalıbı <b class=\"ar\">فِعْلَةٌ</b> (fâ esreli):", ex: ["جَلَسَ ← جِلْسَةٌ", "مَشَى ← مِشْيَةٌ", "وَقَفَ ← وِقْفَةٌ", "نَظَرَ ← نِظْرَةٌ"] },
    { tr: "Biçim, ya bir <b>izafetle</b> ya da bir <b>sıfatla</b> belirtilir:", ex: ["جِلْسَةَ المَلِكِ (izafet)", "مِشْيَةَ الشَّيْخِ (izafet)", "عِيشَةٍ رَاضِيَةٍ (sıfat)"] },
    { tr: "Tek harekenin farkı: <span class=\"ar\">جَلْسَةً</span> bir kez oturdu (merre), <span class=\"ar\">جِلْسَةَ المَلِكِ</span> kral gibi oturdu (hey’e)." },
    { tr: "<b>Mezîd</b> fiilin masdar-ı hey’esi için belirli bir kalıp yoktur." }
  ],
  kaide: [
    "٢ ـ مَصْدَرُ الهَيْئَةِ: اسْمٌ يَدُلُّ عَلَى هَيْئَةِ الفِعْلِ حِينَ وُقُوعِهِ بِالوَصْفِ أَوِ الإِضَافَةِ.",
    "صِيغَتُهُ مِنَ الفِعْلِ الثُّلَاثِيِّ: فِعْلَةٌ، مِثْلُ: جِلْسَةٌ.",
    "لَيْسَتْ لِمَصْدَرِ الهَيْئَةِ مِنَ الفِعْلِ غَيْرِ الثُّلَاثِيِّ صِيغَةٌ مُعَيَّنَةٌ."
  ],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "هَاتِ مَصْدَرَ الهَيْئَةِ مِنَ الأَفْعَالِ الآتِيَةِ", tr: "Boşluğa masdar-ı hey’eyi koy: فِعْلَةَ + muzâfun ileyh.", items: [
      { q: "جَلَسْتُ ___ المُتَوَاضِعِ.", o: ["جَلْسَةَ", "جِلْسَةَ", "جُلُوسًا"], a: 1, tr: "Alçakgönüllü biri gibi oturdum.", why: "جَلَسَ ← جِلْسَةٌ." },
      { q: "فَرِحْتُ ___ الظَّمْآنِ.", o: ["فِرْحَةَ", "فَرْحَةَ", "فَرَحًا"], a: 0, tr: "Susamış biri (suya kavuşunca) nasıl sevinirse öyle sevindim.", why: "فَرِحَ ← فِرْحَةٌ." },
      { q: "وَقَفَ الجُنْدِيُّ فِي الحَرْبِ ___ الأَبْطَالِ.", o: ["وَقْفَةَ", "وُقُوفَ", "وِقْفَةَ"], a: 2, tr: "Asker savaşta kahramanlar gibi durdu.", why: "وَقَفَ ← وِقْفَةٌ." },
      { q: "مَشَى الرَّجُلُ ___ الشَّيْخِ.", o: ["مِشْيَةَ", "مَشْيَةَ", "مَمْشَى"], a: 0, tr: "Adam yaşlı biri gibi yürüdü.", why: "مَشَى ← مِشْيَةٌ." },
      { q: "وَثَبَ الشُّجَاعُ ___ الأَسَدِ.", o: ["وَثْبَةَ", "وِثْبَةَ", "وُثُوبَ"], a: 1, tr: "Yiğit aslan gibi atıldı.", why: "وَثَبَ ← وِثْبَةٌ." },
      { q: "ضَحِكَ الرَّجُلُ ___ المُتَكَبِّرِ.", o: ["ضَحْكَةَ", "ضَحِكًا", "ضِحْكَةَ"], a: 2, tr: "Adam kibirli biri gibi güldü.", why: "ضَحِكَ ← ضِحْكَةٌ." },
      { q: "قَفَزَ اللَّاعِبُ ___ الأَسَدِ.", o: ["قِفْزَةَ", "قَفْزَةَ", "قَفْزًا"], a: 0, tr: "Oyuncu aslan gibi sıçradı.", why: "قَفَزَ ← قِفْزَةٌ." }
    ]},
    { type: "pick", fill: true, extra: true, ar: "مَصْدَرُ الهَيْئَةِ بِالوَصْفِ وَالإِضَافَةِ", tr: "Hey’e bazen sıfatla gelir. Âyet, hadis ve cümlelerde doğru kalıbı seç.", items: [
      { q: "فَهُوَ فِي ___ رَاضِيَةٍ", o: ["عَيْشَةٍ", "عِيشَةٍ", "مَعِيشَةٍ"], a: 1, tr: "O, hoşnut bir yaşayış içindedir. (Hâkka 21)", why: "عَاشَ ← عِيشَةٌ: sıfatla (رَاضِيَةٍ) belirtilmiş hey’e." },
      { q: "مَاتَ ___ جَاهِلِيَّةً", o: ["مِيتَةً", "مَوْتَةً", "مَوْتًا"], a: 0, tr: "Câhiliye ölümüyle öldü. (Müslim, İmâre 53)", why: "مَاتَ ← مِيتَةٌ: sıfatla belirtilmiş hey’e. مَوْتَةٌ merre olurdu." },
      { q: "قَعَدَ ___ المُتَوَاضِعِ.", o: ["قَعْدَةَ", "قُعُودًا", "قِعْدَةَ"], a: 2, tr: "Alçakgönüllü biri gibi oturdu.", why: "قِعْدَةٌ: izafetle." },
      { q: "رَكِبَ الفَارِسُ الحِصَانَ ___ حَسَنَةً.", o: ["رِكْبَةً", "رَكْبَةً", "رُكُوبًا"], a: 0, tr: "Süvari ata güzel bir biçimde bindi.", why: "رِكْبَةٌ: sıfatla (حَسَنَةً)." },
      { q: "نَظَرَ إِلَيْهِ ___ الحَاسِدِ.", o: ["نَظْرَةَ", "نِظْرَةَ", "مَنْظَرَ"], a: 1, tr: "Ona kıskanç biri gibi baktı.", why: "نِظْرَةٌ: izafetle." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · AYIRT ETME
{
  id: "u3", no: 3, ar: "المَرَّةُ أَمِ الهَيْئَةُ؟", tr: "Merre mi Hey’e mi?", short: "Ayırt et", col: "mi", legend: ["nasb", "cerr"],
  goals: ["Cümlede ve hadislerde merre ile hey’eyi bulmak", "Harekeye (فَعْلَة / فِعْلَة) ve arkasından gelene (izafet, sıfat) bakarak türünü söylemek", "Merrenin müsennâsını tanımak: ضَرْبَتَانِ، فَرْحَتَانِ"],
  examples: [
    { s: "سَجَدَ الطِّفْلُ الصَّغِيرُ:- / سَجْدَةً.:nasb", tr: "Küçük çocuk bir kez secde etti.", pair: "جَلَسَ الطَّالِبُ:- / جِلْسَةَ:cerr / المَلِكِ.:-", pairTr: "Öğrenci kral gibi oturdu." },
    { s: "لِلصَّائِمِ:- / فَرْحَتَانِ:nasb", tr: "Oruçlunun iki sevinci vardır.", pair: "فَأَحْسِنُوا:- / القِتْلَةَ:cerr", pairTr: "Öldürme biçimini güzel yapın." }
  ],
  rules: [
    { tr: "Fâsı <b>üstünlü</b> (<span class=\"ar\">فَعْلَةٌ</span>) ve \"bir kez\" anlamı → <b class=\"r-nasb\">merre</b>: <span class=\"ar\">سَجْدَةً، أَكْلَةً، ضَرْبَةٌ</span>." },
    { tr: "Fâsı <b>esreli</b> (<span class=\"ar\">فِعْلَةٌ</span>) ve \"… gibi, … biçiminde\" anlamı → <b class=\"r-cerr\">hey’e</b>: <span class=\"ar\">فِرْحَةَ المُنْتَصِرِ، نِظْرَةَ الخَصْمِ</span>." },
    { tr: "Hey’e çoğunlukla bir izafet ya da sıfatla gelir; merre tek başına durabilir ya da sayı bildirir: <span class=\"ar\">ضَرْبَتَانِ: ضَرْبَةٌ لِلْوَجْهِ وَضَرْبَةٌ لِلْيَدَيْنِ</span>." },
    { tr: "Hadiste <span class=\"ar\">فَأَحْسِنُوا القِتْلَةَ … الذِّبْحَةَ</span>: öldürmenin ve kesmenin <b>biçimini</b> güzel yapın → hey’e." }
  ],
  kaide: ["عَيِّنْ مَصْدَرَ المَرَّةِ وَمَصْدَرَ الهَيْئَةِ فِي الجُمَلِ التَّالِيَةِ."],
  ex: [
    { type: "find", target: "y", num: "١", ar: "عَيِّنْ مَصْدَرَ المَرَّةِ وَمَصْدَرَ الهَيْئَةِ فِي الجُمَلِ التَّالِيَةِ", tr: "Merre ya da hey’e olan kelimelere dokun. Hadislerde birden fazla var.", items: [
      W("سَجَدَ الطِّفْلُ الصَّغِيرُ [سَجْدَةً].", "Küçük çocuk bir kez secde etti.", "سَجْدَةً."),
      W("أَكَلَ المَرِيضُ مِنَ الطَّعَامِ [أَكْلَةً].", "Hasta yemekten bir kez yedi.", "أَكْلَةً."),
      W("فَرِحَ الأَبُ بِهَذَا الخَبَرِ [فِرْحَةَ] المُنْتَصِرِ.", "Baba bu habere galip gelen biri gibi sevindi.", "فِرْحَةَ."),
      W("جَلَسَ الطَّالِبُ [جِلْسَةَ] المَلِكِ.", "Öğrenci kral gibi oturdu.", "جِلْسَةَ."),
      W("نَظَرَ الرَّجُلُ إِلَيْهِ [نِظْرَةَ] الخَصْمِ.", "Adam ona düşman gibi baktı.", "نِظْرَةَ."),
      W("التَّيَمُّمُ [ضَرْبَتَانِ]: [ضَرْبَةٌ] لِلْوَجْهِ وَ[ضَرْبَةٌ] لِلْيَدَيْنِ إِلَى المِرْفَقَيْنِ.", "Teyemmüm iki vuruştur: bir vuruş yüz, bir vuruş dirseklere kadar eller için. (Dârekutnî)", "ضَرْبَتَانِ، ضَرْبَةٌ، ضَرْبَةٌ."),
      W("لِلصَّائِمِ [فَرْحَتَانِ]: [فَرْحَةٌ] عِنْدَ إِفْطَارِهِ، وَ[فَرْحَةٌ] عِنْدَ لِقَاءِ رَبِّهِ.", "Oruçlunun iki sevinci vardır: biri iftar ederken, biri Rabbine kavuşurken. (Buhârî, Müslim)", "فَرْحَتَانِ، فَرْحَةٌ، فَرْحَةٌ."),
      W("إِنَّ اللهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ، فَإِذَا قَتَلْتُمْ فَأَحْسِنُوا [القِتْلَةَ]، وَإِذَا ذَبَحْتُمْ فَأَحْسِنُوا [الذِّبْحَةَ].", "Allah her şeye iyiliği yazmıştır; öldürdüğünüzde öldürme biçimini, kestiğinizde kesme biçimini güzel yapın. (Müslim)", "القِتْلَةَ، الذِّبْحَةَ. الإِحْسَانَ mezîdin asıl masdarı.")
    ]},
    { type: "classify", num: "١", opts: MH, ar: "مَرَّةٌ أَمْ هَيْئَةٌ؟", tr: "Bulduğun kelime merre mi, hey’e mi? Harekeye ve anlama bak.", items: [
      { s: HL("سَجَدَ الطِّفْلُ الصَّغِيرُ سَجْدَةً", "سَجْدَةً"), a: "m", why: "فَعْلَةٌ: bir kez secde." },
      { s: HL("أَكَلَ المَرِيضُ مِنَ الطَّعَامِ أَكْلَةً", "أَكْلَةً"), a: "m", why: "فَعْلَةٌ: bir kez yedi." },
      { s: HL("فَرِحَ الأَبُ فِرْحَةَ المُنْتَصِرِ", "فِرْحَةَ"), a: "h", why: "فِعْلَةٌ + izafet: galip gibi." },
      { s: HL("جَلَسَ الطَّالِبُ جِلْسَةَ المَلِكِ", "جِلْسَةَ"), a: "h", why: "فِعْلَةٌ + izafet: kral gibi." },
      { s: HL("نَظَرَ الرَّجُلُ إِلَيْهِ نِظْرَةَ الخَصْمِ", "نِظْرَةَ"), a: "h", why: "فِعْلَةٌ + izafet: düşman gibi." },
      { s: HL("التَّيَمُّمُ ضَرْبَتَانِ", "ضَرْبَتَانِ"), a: "m", why: "Merrenin müsennâsı: iki vuruş." },
      { s: HL("ضَرْبَةٌ لِلْوَجْهِ", "ضَرْبَةٌ"), a: "m", why: "Bir vuruş." },
      { s: HL("لِلصَّائِمِ فَرْحَتَانِ", "فَرْحَتَانِ"), a: "m", why: "Merrenin müsennâsı: iki sevinç. (Hey’e فِرْحَةٌ ile karşılaştır.)" },
      { s: HL("فَرْحَةٌ عِنْدَ إِفْطَارِهِ", "فَرْحَةٌ"), a: "m", why: "Bir sevinç." },
      { s: HL("فَأَحْسِنُوا القِتْلَةَ", "القِتْلَةَ"), a: "h", why: "فِعْلَةٌ: öldürme biçimi." },
      { s: HL("فَأَحْسِنُوا الذِّبْحَةَ", "الذِّبْحَةَ"), a: "h", why: "فِعْلَةٌ: kesme biçimi." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · SINÂÎ
{
  id: "u4", no: 4, ar: "المَصْدَرُ الصِّنَاعِيُّ", tr: "Masdar-ı Sınâî", short: "Sınâî", col: "ref", legend: ["mi"],
  goals: ["Masdar-ı sınâînin bir kelimeye ـِيَّةٌ eklenerek yapıldığını bilmek: إِسْلَامٌ ← إِسْلَامِيَّةٌ", "Câmid isimden, müştaktan, ism-i tafdîlden, hatta zamir ve soru kelimesinden yapmak: هُوِيَّةٌ، كَيْفِيَّةٌ", "Cümlede uygun masdar-ı sınâîyi kullanmak ve onu nisbe sıfatından ayırmak"],
  examples: [
    { s: "هَلْ تَقْدِرُ عَلَى حَمْلِ:- / المَسْؤُولِيَّةِ؟:mi", tr: "Sorumluluğu taşıyabilir misin?", pair: "لِهَذَا المَوْضُوعِ:- / أَهَمِّيَّةٌ:mi / خَاصَّةٌ.:-", pairTr: "Bu konunun özel bir önemi var." },
    { s: "الإِسْلَامُ لَا يَقْبَلُ:- / العُنْصُرِيَّةَ.:mi", tr: "İslâm ırkçılığı kabul etmez.", pair: "شَاعِرِيَّةُ:mi / خَالِدٍ ضَعِيفَةٌ.:-", pairTr: "Hâlid’in şairlik yeteneği zayıf." }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">Masdar-ı sınâî</b> (<span class=\"ar\">المَصْدَرُ الصِّنَاعِيُّ</span>): câmid ya da müştak bir isme <b>şeddeli yâ</b> ve <b>tâ-yı merbûta</b> eklenerek yapılır: kelime + <span class=\"ar\">ـِيَّـ</span> + <span class=\"ar\">ـة</span>.", ex: ["إِسْلَامٌ + ـِيَّةٌ = إِسْلَامِيَّةٌ", "حُرٌّ ← حُرِّيَّةٌ", "إِنْسَانٌ ← إِنْسَانِيَّةٌ"] },
    { tr: "Hemen her kelimeden yapılır: ism-i tafdîl (<span class=\"ar\">أَهَمُّ ← أَهَمِّيَّةٌ</span>), ism-i fâil (<span class=\"ar\">جَاهِلٌ ← جَاهِلِيَّةٌ</span>), ism-i mef’ûl (<span class=\"ar\">مَسْؤُولٌ ← مَسْؤُولِيَّةٌ</span>), zamir (<span class=\"ar\">هُوَ ← هُوِيَّةٌ</span>), soru kelimesi (<span class=\"ar\">كَيْفَ ← كَيْفِيَّةٌ</span>)." },
    { tr: "Anlamı soyut bir kavramdır; Türkçede çoğu zaman <b>-lik, -iyet</b> ile karşılanır: hürriyet, mesuliyet, ehemmiyet, keyfiyet, hüviyet." },
    { tr: "Nisbe sıfatıyla karıştırma: <span class=\"ar\">الحُرِّيَّةُ نِعْمَةٌ</span> (isim: hürriyet) – <span class=\"ar\">الحَضَارَةُ الإِسْلَامِيَّةُ</span> (dişil isimden sonra gelen sıfat: İslâmî medeniyet)." }
  ],
  kaide: ["المَصْدَرُ الصِّنَاعِيُّ: اسْمٌ جَامِدٌ أَوْ مُشْتَقٌّ زِيدَ فِي آخِرِهِ يَاءٌ مُشَدَّدَةٌ بَعْدَهَا تَاءٌ مَرْبُوطَةٌ (كَلِمَة + ـِيَّـ + ة)، مِثْلُ: إِسْلَامٌ + ـِيَّـ + ة: إِسْلَامِيَّةٌ."],
  ex: [
    { type: "pick", fill: true, num: "١", ar: "امْلَأِ الفَرَاغَ بِمَصْدَرٍ صِنَاعِيٍّ مُنَاسِبٍ مِنَ الكَلِمَاتِ التَّالِيَةِ", tr: "Kelimenin masdar-ı sınâîsini seç: sonunda şeddeli yâ ve tâ.", items: [] },
    { type: "pick", fill: true, num: "٢", ar: "صُغْ مَصَادِرَ صِنَاعِيَّةً مِنَ الأَسْمَاءِ التَّالِيَةِ وَامْلَأِ الفَرَاغَاتِ بِهَا", tr: "Parantezdeki kelimeden masdar-ı sınâî yap ve boşluğa koy.", items: [
      { q: "___ السَّيْرِ لِلسَّيَّارَاتِ القَادِمَةِ مِنَ اليَمِينِ. (أَفْضَلُ)", o: ["أَفْضَلِيَّةُ", "أَفْضَلُ", "فَضْلُ"], a: 0, tr: "Geçiş önceliği sağdan gelen arabalarındır.", why: "أَفْضَلُ ← أَفْضَلِيَّةٌ." },
      { q: "الإِسْلَامُ دِينُ ___. (إِنْسَانٌ)", o: ["الإِنْسَانِيِّ", "الإِنْسَانِيَّةِ", "الأُنَاسِ"], a: 1, tr: "İslâm insanlığın dinidir.", why: "إِنْسَانٌ ← إِنْسَانِيَّةٌ. الإِنْسَانِيِّ nisbe sıfatı olurdu." },
      { q: "لِلْمُطَالَعَةِ المُسْتَمِرَّةِ ___ خَاصَّةٌ. (أَهَمُّ)", o: ["أَهَمُّ", "هَامَّةٌ", "أَهَمِّيَّةٌ"], a: 2, tr: "Sürekli okumanın özel bir önemi vardır.", why: "أَهَمُّ ← أَهَمِّيَّةٌ." },
      { q: "ثَبَتَتْ ___ الزَّكَاةِ فِي الإِسْلَامِ. (فَرْضٌ)", o: ["فَرْضِيَّةُ", "فَرِيضَةُ", "فَرْضِيُّ"], a: 0, tr: "İslâm’da zekâtın farziyeti sabit oldu.", why: "فَرْضٌ ← فَرْضِيَّةٌ." },
      { q: "___ العُلَمَاءِ فِي المُجْتَمَعِ كَبِيرَةٌ. (مَسْؤُولٌ)", o: ["مَسْؤُولُ", "مَسْؤُولِيَّةُ", "مَسْأَلَةُ"], a: 1, tr: "Âlimlerin toplumdaki sorumluluğu büyüktür.", why: "مَسْؤُولٌ ← مَسْؤُولِيَّةٌ. Haber كَبِيرَةٌ dişil: mübtedâ da dişil olmalı." },
      { q: "تَظْهَرُ ___ الكَاتِبِ مِنْ خِلَالِ أَعْمَالِهِ. (شَخْصٌ)", o: ["شَخْصُ", "أَشْخَاصُ", "شَخْصِيَّةُ"], a: 2, tr: "Yazarın kişiliği eserlerinden anlaşılır.", why: "شَخْصٌ ← شَخْصِيَّةٌ." },
      { q: "عَلَّمْتُ وَلَدِي ___ الوُضُوءِ. (كَيْفَ)", o: ["كَيْفِيَّةَ", "كَيْفَ", "كَيْفِيَّ"], a: 0, tr: "Oğluma abdestin nasıl alındığını öğrettim.", why: "كَيْفَ ← كَيْفِيَّةٌ." },
      { q: "___ المُسْلِمِينَ تَعِيشُ فِي آسْيَا وَإِفْرِيقْيَا. (أَكْثَرُ)", o: ["أَكْثَرُ", "أَكْثَرِيَّةُ", "كَثْرَةُ"], a: 1, tr: "Müslümanların çoğunluğu Asya ve Afrika’da yaşar.", why: "أَكْثَرُ ← أَكْثَرِيَّةٌ. Fiil تَعِيشُ dişil." }
    ]},
    { type: "bank", num: "٣", ar: "امْلَأِ الفَرَاغَ بِمَصْدَرٍ صِنَاعِيٍّ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Önce aşağıdan bir kelime seç, sonra uygun boşluğa dokun. Her kelime bir kez kullanılır; son harekesine de bak.",
      bank: ["شَخْصِيَّةٍ", "الأَنَانِيَّةُ", "أَهَمِّيَّةَ", "إِحْصَائِيَّةٍ", "حَسَّاسِيَّةٌ", "مَسْؤُولِيَّةُ", "مَاهِيَّةَ", "الأَفْضَلِيَّةُ"], items: [
      { h: "أَحَدُ الأَمْرَاضِ الشَّائِعَةِ.", a: [1], tr: "Bencillik yaygın hastalıklardan biridir." },
      { h: "فِي الإِمَامَةِ لِمَنْ يَحْفَظُ القُرْآنَ.", a: [7], tr: "İmamlıkta öncelik Kur’an’ı ezbere bilenindir." },
      { pre: "فُلَانٌ ذُو", h: "قَوِيَّةٍ.", a: [0], tr: "Falanca güçlü bir kişiliğe sahip." },
      { pre: "فِي وَجْهِي", h: "ضِدَّ الشَّمْسِ.", a: [4], tr: "Yüzümde güneşe karşı alerji var." },
      { pre: "الطُّلَّابُ يَعْلَمُونَ", h: "المُطَالَعَةِ.", a: [2], tr: "Öğrenciler okumanın önemini biliyor." },
      { pre: "يَزْدَادُ اهْتِمَامُ النَّاسِ بِالقِرَاءَةِ حَسَبَ", h: "أَخِيرَةٍ.", a: [3], tr: "Son bir istatistiğe göre insanların okumaya ilgisi artıyor." },
      { pre: "تَعَلَّمَ التَّلَامِيذُ فِي هَذَا الدَّرْسِ", h: "المَاءِ.", a: [6], tr: "Öğrenciler bu derste suyun mahiyetini öğrendi." },
      { h: "الشَّبَابِ فِي المُجْتَمَعِ كَبِيرَةٌ.", a: [5], tr: "Gençlerin toplumdaki sorumluluğu büyüktür." }
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: زِيَارَةُ الكَعْبَةِ", tr: "Okuma: Kâbe Ziyareti", short: "Okuma", col: "muz", legend: ["nasb", "cerr", "mz"],
  goals: ["Metinde merre ve hey’eyi bulmak", "Merre ve hey’eyi mim’li masdardan, sülâsî asıl masdardan ve ism-i fâilden ayırmak", "رَحْمَةً وَاسِعَةً gibi sıfatlı asıl masdarı merreyle karıştırmamak"],
  examples: [
    { s: "دَمَعَتْ عَيْنَايَ:- / دِمْعَةَ:cerr / الخَوْفِ وَالرَّجَاءِ.:-", tr: "Gözlerim korku ve ümitle yaşardı." },
    { s: "وَرَفَعْتُ يَدَيَّ إِلَى السَّمَاءِ:- / رَفْعَةً.:nasb", tr: "Ellerimi bir kez semaya kaldırdım." }
  ],
  rules: [
    { tr: "Merre: <span class=\"ar\">رَفْعَةً، رَكْعَتَيْنِ</span>. Hey’e: <span class=\"ar\">دِمْعَةَ الخَوْفِ، وِقْفَةَ الذَّاهِلِ، مِشْيَةَ العَبْدِ</span>." },
    { tr: "Mim’li masdar: <span class=\"ar\">مَغْفِرَةً</span>. Sülâsî asıl masdar: <span class=\"ar\">زِيَارَةِ، جَلَالِهَا، عَظَمَتِهَا، الطَّوَافَ، رَحْمَةً</span>." },
    { tr: "İsm-i fâil: <span class=\"ar\">الذَّاهِلِ، المُؤْمِنِينَ، الخَاضِعِ</span>. <span class=\"ar\">المُشَرَّفَةِ، المُقَدَّسُ</span> ise ism-i mef’ûl." }
  ],
  kaide: ["اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ اسْتَخْرِجْ مِنْهَا: مَصْدَرَ المَرَّةِ، مَصْدَرَ الهَيْئَةِ، المَصْدَرَ المِيمِيَّ، المَصْدَرَ الثُّلَاثِيَّ، اسْمَ الفَاعِلِ."],
  ex: [
    { type: "reading", num: "٤", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ اسْتَخْرِجْ مِنْهَا", tr: "Metni oku; sonra koyu kelimenin ne olduğunu seç.", title: "زِيَارَةُ الكَعْبَةِ",
      text: "قَالَ أَحَدٌ بَعْدَ زِيَارَةِ الكَعْبَةِ المُشَرَّفَةِ: دَخَلْتُ المَسْجِدَ الحَرَامَ لِأَوَّلِ مَرَّةٍ، عِنْدَمَا شَاهَدْتُ الكَعْبَةَ دَمَعَتْ عَيْنَايَ دِمْعَةَ الخَوْفِ وَالرَّجَاءِ. وَوَقَفْتُ أَمَامَهَا وِقْفَةَ الذَّاهِلِ لِجَلَالِهَا وَعَظَمَتِهَا. وَهَذَا المَكَانُ المُقَدَّسُ يَرْبِطُ بَيْنَ قُلُوبِ المُؤْمِنِينَ. وَمَشَيْتُ حَوْلَ الكَعْبَةِ مِشْيَةَ العَبْدِ الخَاضِعِ ثُمَّ أَكْمَلْتُ الطَّوَافَ، وَوَقَفْتُ أَمَامَهَا وَرَفَعْتُ يَدَيَّ إِلَى السَّمَاءِ رَفْعَةً، وَدَعَوْتُ اللهَ أَنْ يَغْفِرَ لِي مَغْفِرَةً، وَيَرْحَمَنِي رَحْمَةً وَاسِعَةً، ثُمَّ صَلَّيْتُ لِلهِ رَكْعَتَيْنِ.",
      textTr: "Kâbe Ziyareti. Biri, Kâbe-i Müşerrefe’yi ziyaret ettikten sonra şöyle dedi: Mescid-i Harâm’a ilk kez girdim. Kâbe’yi görünce gözlerim korku ve ümitle yaşardı. Onun celâli ve azameti karşısında şaşkına dönmüş biri gibi önünde durdum. Bu mukaddes mekân, müminlerin kalplerini birbirine bağlıyor. Kâbe’nin etrafında boyun eğmiş bir kul gibi yürüdüm, sonra tavafı tamamladım. Önünde durup ellerimi bir kez semaya kaldırdım ve Allah’a beni bağışlamasını, bana geniş rahmetiyle merhamet etmesini diledim. Sonra Allah için iki rekât namaz kıldım.",
      qa: [
        { q: "مَاذَا حَدَثَ عِنْدَمَا شَاهَدَ الكَعْبَةَ؟", a: "دَمَعَتْ عَيْنَاهُ دِمْعَةَ الخَوْفِ وَالرَّجَاءِ.", tr: "Kâbe’yi görünce ne oldu? Gözleri korku ve ümitle yaşardı." },
        { q: "كَيْفَ وَقَفَ أَمَامَهَا؟", a: "وَقَفَ وِقْفَةَ الذَّاهِلِ لِجَلَالِهَا وَعَظَمَتِهَا.", tr: "Önünde nasıl durdu? Celâli ve azameti karşısında şaşkın biri gibi." },
        { q: "كَيْفَ مَشَى حَوْلَ الكَعْبَةِ؟", a: "مَشَى مِشْيَةَ العَبْدِ الخَاضِعِ.", tr: "Kâbe’nin etrafında nasıl yürüdü? Boyun eğmiş bir kul gibi." },
        { q: "بِمَاذَا دَعَا اللهَ؟", a: "دَعَا اللهَ أَنْ يَغْفِرَ لَهُ وَيَرْحَمَهُ رَحْمَةً وَاسِعَةً.", tr: "Allah’a ne diye dua etti? Kendisini bağışlamasını ve geniş rahmetiyle merhamet etmesini." }
      ],
      cls: { opts: [["m", "Merre", "مَصْدَرُ المَرَّةِ", "nasb"], ["h", "Hey’e", "مَصْدَرُ الهَيْئَةِ", "cerr"], ["d", "Mim’li masdar", "مَصْدَرٌ مِيمِيٌّ", "mi"], ["s", "Sülâsî masdar", "مَصْدَرٌ ثُلَاثِيٌّ", "mz"], ["f", "İsm-i fâil", "اسْمُ فَاعِلٍ", "mun"], ["x", "Hiçbiri", "لَيْسَ مِنْهَا", "x"]], ar: "اسْتَخْرِجْ مِنَ القِطْعَةِ", tr: "Koyu kelime ne?", items: [
        { s: HL("بَعْدَ زِيَارَةِ الكَعْبَةِ", "زِيَارَةِ"), a: "s", why: "زَارَ → زِيَارَةٌ: sülâsînin asıl masdarı." },
        { s: HL("الكَعْبَةِ المُشَرَّفَةِ", "المُشَرَّفَةِ"), a: "x", why: "شَرَّفَ → مُشَرَّفٌ: ism-i mef’ûl." },
        { s: HL("دَمَعَتْ عَيْنَايَ دِمْعَةَ الخَوْفِ", "دِمْعَةَ"), a: "h", why: "فِعْلَةٌ + izafet: korkan biri gibi." },
        { s: HL("وَوَقَفْتُ أَمَامَهَا وِقْفَةَ الذَّاهِلِ", "وِقْفَةَ"), a: "h", why: "فِعْلَةٌ + izafet." },
        { s: HL("وِقْفَةَ الذَّاهِلِ", "الذَّاهِلِ"), a: "f", why: "ذَهَلَ → ذَاهِلٌ: şaşkın." },
        { s: HL("لِجَلَالِهَا وَعَظَمَتِهَا", "لِجَلَالِهَا"), a: "s", why: "جَلَّ → جَلَالٌ." },
        { s: HL("لِجَلَالِهَا وَعَظَمَتِهَا", "عَظَمَتِهَا"), a: "s", why: "عَظُمَ → عَظَمَةٌ." },
        { s: HL("وَهَذَا المَكَانُ المُقَدَّسُ", "المُقَدَّسُ"), a: "x", why: "قَدَّسَ → مُقَدَّسٌ: ism-i mef’ûl." },
        { s: HL("بَيْنَ قُلُوبِ المُؤْمِنِينَ", "المُؤْمِنِينَ"), a: "f", why: "آمَنَ → مُؤْمِنٌ: mezîdin ism-i fâili." },
        { s: HL("وَمَشَيْتُ حَوْلَ الكَعْبَةِ مِشْيَةَ العَبْدِ", "مِشْيَةَ"), a: "h", why: "فِعْلَةٌ + izafet: kul gibi." },
        { s: HL("مِشْيَةَ العَبْدِ الخَاضِعِ", "الخَاضِعِ"), a: "f", why: "خَضَعَ → خَاضِعٌ." },
        { s: HL("ثُمَّ أَكْمَلْتُ الطَّوَافَ", "الطَّوَافَ"), a: "s", why: "طَافَ → طَوَافٌ: sülâsînin asıl masdarı." },
        { s: HL("وَرَفَعْتُ يَدَيَّ إِلَى السَّمَاءِ رَفْعَةً", "رَفْعَةً"), a: "m", why: "فَعْلَةٌ: bir kez kaldırdım." },
        { s: HL("أَنْ يَغْفِرَ لِي مَغْفِرَةً", "مَغْفِرَةً"), a: "d", why: "غَفَرَ → مَغْفِرَةٌ: mim’li masdar (semâî)." },
        { s: HL("وَيَرْحَمَنِي رَحْمَةً وَاسِعَةً", "رَحْمَةً"), a: "s", why: "رَحِمَ → رَحْمَةٌ: asıl masdar; sıfatla nitelenmiş, \"bir kez\" anlamı yok." },
        { s: HL("ثُمَّ صَلَّيْتُ لِلهِ رَكْعَتَيْنِ", "رَكْعَتَيْنِ"), a: "m", why: "رَكْعَةٌ'nin müsennâsı: merre kalıbı (iki rekât)." }
      ]}
    }
  ]
}
];
// Sınâî alıştırması 1: kitabın 15 kelimesi
UNITS[3].ex[0].items = [
  ["مُلْكٌ", "مُلْكِيَّةٌ", "مُلْكِيٌّ", "مَمْلَكَةٌ", "mülk → mülkiyet"], ["حَاكِمٌ", "حَاكِمِيَّةٌ", "حَاكِمِيٌّ", "حُكْمٌ", "hâkim → hâkimiyet"], ["مَغْلُوبٌ", "مَغْلُوبِيَّةٌ", "مَغْلُوبِيٌّ", "غَلَبَةٌ", "yenik → yenilmişlik"],
  ["حُرٌّ", "حُرِّيَّةٌ", "حُرِّيٌّ", "حُرَّةٌ", "hür → hürriyet"], ["قَابِلٌ", "قَابِلِيَّةٌ", "قَابِلِيٌّ", "قُبُولٌ", "kabul eden → kabiliyet"], ["وَاقِعٌ", "وَاقِعِيَّةٌ", "وَاقِعِيٌّ", "وُقُوعٌ", "gerçek → gerçekçilik"],
  ["غَالِبٌ", "غَالِبِيَّةٌ", "غَالِبِيٌّ", "غَلَبَةٌ", "galip → çoğunluk"], ["أَغْلَبُ", "أَغْلَبِيَّةٌ", "أَغْلَبِيٌّ", "غَالِبٌ", "daha çok → ekseriyet"], ["أَوَّلُ", "أَوَّلِيَّةٌ", "أَوَّلِيٌّ", "أُولَى", "ilk → öncelik"],
  ["جَاهِلٌ", "جَاهِلِيَّةٌ", "جَاهِلِيٌّ", "جَهَالَةٌ", "câhil → câhiliye"], ["مَوْضُوعٌ", "مَوْضُوعِيَّةٌ", "مَوْضُوعِيٌّ", "وَضْعٌ", "konu → nesnellik"], ["أَكْثَرُ", "أَكْثَرِيَّةٌ", "أَكْثَرِيٌّ", "كَثْرَةٌ", "daha çok → çoğunluk"],
  ["هُوَ", "هُوِيَّةٌ", "هُوِيٌّ", "هُوَةٌ", "o → hüviyet, kimlik"], ["مَشْرُوعٌ", "مَشْرُوعِيَّةٌ", "مَشْرُوعِيٌّ", "شَرِيعَةٌ", "meşru → meşruiyet"], ["أَقَلُّ", "أَقَلِّيَّةٌ", "أَقَلِّيٌّ", "قِلَّةٌ", "daha az → azınlık"]
].map(function (v, i) {
  var ord = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [v[1], v[2], v[3]];
  return { q: v[0] + " ← ___", o: ord.map(function (k) { return o[k]; }), a: ord.indexOf(0), tr: v[4], why: '<span class="ar">' + v[1] + '</span>: kelime + ـِيَّةٌ. <span class="ar">' + v[2] + '</span> nisbe sıfatı olur.' };
});

// Doğru Masdar oyunu: [cümle {kelime}, seçenekler (ilki doğru), açıklama, Türkçe, konu]
var MS_POOL = [
  ["جَلَسَ الطِّفْلُ اليَوْمَ {جَلْسَةً}.", ["جَلْسَةً", "جِلْسَةً", "جُلُوسًا"], "merre: فَعْلَةٌ", "Çocuk bugün bir kez oturdu.", "u1"],
  ["شَرِبَ المَرِيضُ مِنَ الدَّوَاءِ {شَرْبَةً}.", ["شَرْبَةً", "شِرْبَةً", "مَشْرَبًا"], "merre: فَعْلَةٌ", "Hasta ilaçtan bir kez içti.", "u1"],
  ["دَعَوْتُ جَارِي إِلَى بَيْتِي {دَعْوَةً وَاحِدَةً}.", ["دَعْوَةً وَاحِدَةً", "دَعْوَةً", "دِعْوَةً"], "tâ’lı masdar: وَاحِدَةً", "Komşumu bir kez davet ettim.", "u1"],
  ["رَكَعَ المُصَلِّي {رَكْعَةً}.", ["رَكْعَةً", "رِكْعَةً", "رُكُوعًا"], "merre", "Namaz kılan bir kez rükû etti.", "u1"],
  ["سَأَلْتُهُ {اِسْتِفْهَامَةً}.", ["اِسْتِفْهَامَةً", "اِسْتِفْهَامًا وَاحِدًا", "فَهْمَةً"], "mezîd: asıl masdar + ة", "Ona bir kez soru sordum.", "u1"],
  ["جَلَسَ الطِّفْلُ {جِلْسَةَ} الرَّجُلِ.", ["جِلْسَةَ", "جَلْسَةَ", "جُلُوسًا"], "hey’e: فِعْلَةٌ + izafet", "Çocuk adam gibi oturdu.", "u2"],
  ["مَشَى الرَّجُلُ {مِشْيَةَ} الشَّيْخِ.", ["مِشْيَةَ", "مَشْيَةَ", "مَمْشَى"], "hey’e", "Adam yaşlı biri gibi yürüdü.", "u2"],
  ["وَثَبَ الشُّجَاعُ {وِثْبَةَ} الأَسَدِ.", ["وِثْبَةَ", "وَثْبَةَ", "وُثُوبَ"], "hey’e", "Yiğit aslan gibi atıldı.", "u2"],
  ["ضَحِكَ الرَّجُلُ {ضِحْكَةَ} المُتَكَبِّرِ.", ["ضِحْكَةَ", "ضَحْكَةَ", "ضَحِكًا"], "hey’e", "Adam kibirli biri gibi güldü.", "u2"],
  ["وَقَفَ الجُنْدِيُّ {وِقْفَةَ} الأَبْطَالِ.", ["وِقْفَةَ", "وَقْفَةَ", "وُقُوفًا"], "hey’e", "Asker kahramanlar gibi durdu.", "u2"],
  ["سَجَدَ الطِّفْلُ الصَّغِيرُ {سَجْدَةً}.", ["سَجْدَةً", "سِجْدَةً", "سُجُودًا"], "merre", "Küçük çocuk bir kez secde etti.", "u3"],
  ["نَظَرَ الرَّجُلُ إِلَيْهِ {نِظْرَةَ} الخَصْمِ.", ["نِظْرَةَ", "نَظْرَةَ", "مَنْظَرَ"], "hey’e", "Adam ona düşman gibi baktı.", "u3"],
  ["لِلصَّائِمِ {فَرْحَتَانِ}", ["فَرْحَتَانِ", "فِرْحَتَانِ", "فَرَحَانِ"], "merrenin müsennâsı", "Oruçlunun iki sevinci vardır.", "u3"],
  ["فَأَحْسِنُوا {القِتْلَةَ}", ["القِتْلَةَ", "القَتْلَةَ", "المَقْتَلَ"], "hey’e: öldürme biçimi", "Öldürme biçimini güzel yapın.", "u3"],
  ["التَّيَمُّمُ {ضَرْبَتَانِ}", ["ضَرْبَتَانِ", "ضِرْبَتَانِ", "ضَرْبَانِ"], "merrenin müsennâsı", "Teyemmüm iki vuruştur.", "u3"],
  ["الإِسْلَامُ لَا يَقْبَلُ {العُنْصُرِيَّةَ}.", ["العُنْصُرِيَّةَ", "العُنْصُرِيَّ", "العَنَاصِرَ"], "sınâî: عُنْصُرٌ + ـِيَّةٌ", "İslâm ırkçılığı kabul etmez.", "u4"],
  ["هَلْ تَقْدِرُ عَلَى حَمْلِ {المَسْؤُولِيَّةِ}؟", ["المَسْؤُولِيَّةِ", "المَسْؤُولِ", "المَسْأَلَةِ"], "sınâî: sorumluluk", "Sorumluluğu taşıyabilir misin?", "u4"],
  ["لِهَذَا المَوْضُوعِ {أَهَمِّيَّةٌ} خَاصَّةٌ.", ["أَهَمِّيَّةٌ", "أَهَمُّ", "هَامٌّ"], "sınâî: önem", "Bu konunun özel bir önemi var.", "u4"],
  ["عَلَّمْتُ وَلَدِي {كَيْفِيَّةَ} الوُضُوءِ.", ["كَيْفِيَّةَ", "كَيْفَ", "كَيْفِيَّ"], "sınâî: كَيْفَ + ـِيَّةٌ", "Oğluma abdestin nasıl alındığını öğrettim.", "u4"],
  ["{شَاعِرِيَّةُ} خَالِدٍ ضَعِيفَةٌ.", ["شَاعِرِيَّةُ", "شَاعِرُ", "شِعْرُ"], "sınâî: haber dişil", "Hâlid’in şairlik yeteneği zayıf.", "u4"],
  ["دَمَعَتْ عَيْنَايَ {دِمْعَةَ} الخَوْفِ.", ["دِمْعَةَ", "دَمْعَةَ", "دُمُوعَ"], "hey’e", "Gözlerim korkuyla yaşardı.", "u5"],
  ["وَقَفْتُ أَمَامَهَا {وِقْفَةَ} الذَّاهِلِ.", ["وِقْفَةَ", "وَقْفَةَ", "مَوْقِفَ"], "hey’e", "Önünde şaşkın biri gibi durdum.", "u5"],
  ["رَفَعْتُ يَدَيَّ إِلَى السَّمَاءِ {رَفْعَةً}.", ["رَفْعَةً", "رِفْعَةً", "مَرْفُوعَةً"], "merre", "Ellerimi bir kez semaya kaldırdım.", "u5"],
  ["أَنْ يَغْفِرَ لِي {مَغْفِرَةً}.", ["مَغْفِرَةً", "مَغْفَرَةً", "مُغْفِرَةً"], "mim’li masdar", "Beni bağışlamasını.", "u5"]
];
// Hız oyunu 1: merre · hey’e · asıl · sınâî
var MH_LIST = [
  [HL("جَلَسَ جَلْسَةً", "جَلْسَةً"), "m", "bir kez oturdu"], [HL("جَلَسَ جِلْسَةَ المَلِكِ", "جِلْسَةَ"), "h", "kral gibi"], [HL("سَجَدَ سَجْدَةً", "سَجْدَةً"), "m", "bir kez"],
  [HL("نَظَرَ نِظْرَةَ الخَصْمِ", "نِظْرَةَ"), "h", "düşman gibi"], [HL("شَرِبَ شَرْبَةً", "شَرْبَةً"), "m", "bir kez"], [HL("مَشَى مِشْيَةَ الشَّيْخِ", "مِشْيَةَ"), "h", "yaşlı gibi"],
  [HL("دَعَوْتُهُ دَعْوَةً وَاحِدَةً", "دَعْوَةً وَاحِدَةً"), "m", "tâ’lı masdar + وَاحِدَة"], [HL("الحُرِّيَّةُ نِعْمَةٌ", "الحُرِّيَّةُ"), "s", "حُرٌّ + ـِيَّةٌ"], [HL("لِلْمَوْضُوعِ أَهَمِّيَّةٌ", "أَهَمِّيَّةٌ"), "s", "أَهَمُّ + ـِيَّةٌ"],
  [HL("وَثَبَ وِثْبَةَ الأَسَدِ", "وِثْبَةَ"), "h", "aslan gibi"], [HL("رَكَعَ رَكْعَةً", "رَكْعَةً"), "m", "bir kez"], [HL("فَرِحَ فِرْحَةَ المُنْتَصِرِ", "فِرْحَةَ"), "h", "galip gibi"],
  [HL("لِلصَّائِمِ فَرْحَتَانِ", "فَرْحَتَانِ"), "m", "iki sevinç"], [HL("فَأَحْسِنُوا القِتْلَةَ", "القِتْلَةَ"), "h", "öldürme biçimi"], [HL("لَا يَقْبَلُ العُنْصُرِيَّةَ", "العُنْصُرِيَّةَ"), "s", "ırkçılık"],
  [HL("شَاعِرِيَّةُ خَالِدٍ", "شَاعِرِيَّةُ"), "s", "şairlik yeteneği"], [HL("بَعْدَ زِيَارَةِ الكَعْبَةِ", "زِيَارَةِ"), "a", "asıl masdar"], [HL("أَكْمَلْتُ الطَّوَافَ", "الطَّوَافَ"), "a", "asıl masdar"],
  [HL("سَأَلْتُهُ اسْتِفْهَامَةً", "اسْتِفْهَامَةً"), "m", "mezîd + ة"], [HL("حَمْلُ المَسْؤُولِيَّةِ", "المَسْؤُولِيَّةِ"), "s", "sorumluluk"], [HL("جَلَسَ جُلُوسًا طَوِيلًا", "جُلُوسًا"), "a", "asıl masdar"],
  [HL("رَفَعْتُ يَدَيَّ رَفْعَةً", "رَفْعَةً"), "m", "bir kez"], [HL("يَرْحَمُنِي رَحْمَةً وَاسِعَةً", "رَحْمَةً"), "a", "sıfatlı asıl masdar"], [HL("عَلِمْتُ كَيْفِيَّةَ الوُضُوءِ", "كَيْفِيَّةَ"), "s", "كَيْفَ + ـِيَّةٌ"]
];
// Hız oyunu 2: sınâî mi nisbe mi?
var SN_LIST = [
  [HL("الحُرِّيَّةُ نِعْمَةٌ", "الحُرِّيَّةُ"), "s", "isim: hürriyet"], [HL("رَجُلٌ إِنْسَانِيٌّ", "إِنْسَانِيٌّ"), "n", "sıfat: insancıl"], [HL("الإِسْلَامُ دِينُ الإِنْسَانِيَّةِ", "الإِنْسَانِيَّةِ"), "s", "isim: insanlık"],
  [HL("الحَضَارَةُ الإِسْلَامِيَّةُ", "الإِسْلَامِيَّةُ"), "n", "dişil isimden sonra sıfat"], [HL("لِلْمُطَالَعَةِ أَهَمِّيَّةٌ", "أَهَمِّيَّةٌ"), "s", "isim: önem"], [HL("كِتَابٌ عَرَبِيٌّ", "عَرَبِيٌّ"), "n", "sıfat"],
  [HL("اللُّغَةُ العَرَبِيَّةُ", "العَرَبِيَّةُ"), "n", "dişil isimden sonra sıfat"], [HL("ذُو شَخْصِيَّةٍ قَوِيَّةٍ", "شَخْصِيَّةٍ"), "s", "isim: kişilik"], [HL("الأَحْوَالُ الشَّخْصِيَّةُ", "الشَّخْصِيَّةُ"), "n", "sıfat: şahsî"],
  [HL("مَسْؤُولِيَّةُ الشَّبَابِ كَبِيرَةٌ", "مَسْؤُولِيَّةُ"), "s", "isim: sorumluluk"], [HL("طَالِبٌ تُرْكِيٌّ", "تُرْكِيٌّ"), "n", "sıfat"], [HL("كَيْفِيَّةُ الوُضُوءِ", "كَيْفِيَّةُ"), "s", "isim: keyfiyet"],
  [HL("فِي وَجْهِي حَسَّاسِيَّةٌ", "حَسَّاسِيَّةٌ"), "s", "isim: alerji"], [HL("المَدْرَسَةُ الثَّانَوِيَّةُ", "الثَّانَوِيَّةُ"), "n", "sıfat: lise"], [HL("حَسَبَ إِحْصَائِيَّةٍ أَخِيرَةٍ", "إِحْصَائِيَّةٍ"), "s", "isim: istatistik"],
  [HL("مَدِينَةٌ تَارِيخِيَّةٌ", "تَارِيخِيَّةٌ"), "n", "sıfat"], [HL("أَكْثَرِيَّةُ المُسْلِمِينَ", "أَكْثَرِيَّةُ"), "s", "isim: çoğunluk"], [HL("عَصْرُ الجَاهِلِيَّةِ", "الجَاهِلِيَّةِ"), "s", "isim: câhiliye"],
  [HL("شِعْرٌ جَاهِلِيٌّ", "جَاهِلِيٌّ"), "n", "sıfat"], [HL("هُوِيَّةُ الطَّالِبِ", "هُوِيَّةُ"), "s", "isim: kimlik"]
];
var HAFIZA = {
  fm: { name: "Fiil ↔ merre", pairs: [["جَلَسَ", "جَلْسَةٌ"], ["سَجَدَ", "سَجْدَةٌ"], ["رَكَعَ", "رَكْعَةٌ"], ["دَعَا", "دَعْوَةٌ وَاحِدَةٌ"], ["اِسْتَفْهَمَ", "اِسْتِفْهَامَةٌ"], ["زَارَ", "زَوْرَةٌ"], ["ضَرَبَ", "ضَرْبَةٌ"]] },
  ks: { name: "Kelime ↔ sınâî", pairs: [["حُرٌّ", "حُرِّيَّةٌ"], ["هُوَ", "هُوِيَّةٌ"], ["كَيْفَ", "كَيْفِيَّةٌ"], ["أَهَمُّ", "أَهَمِّيَّةٌ"], ["إِنْسَانٌ", "إِنْسَانِيَّةٌ"], ["شَخْصٌ", "شَخْصِيَّةٌ"], ["أَكْثَرُ", "أَكْثَرِيَّةٌ"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["جَلْسَةٌ", "bir kez oturuş"], ["جِلْسَةٌ", "oturuş biçimi"], ["حُرِّيَّةٌ", "hürriyet"], ["مَسْؤُولِيَّةٌ", "sorumluluk"], ["أَقَلِّيَّةٌ", "azınlık"], ["هُوِيَّةٌ", "kimlik"], ["عُنْصُرِيَّةٌ", "ırkçılık"], ["كَيْفِيَّةٌ", "keyfiyet"]] }
};
var KARTLAR = [
  ["Masdar-ı merre nedir?", "İşin bir kez yapıldığını bildiren isim: جَلَسَ جَلْسَةً"],
  ["Merrenin sülâsî kalıbı?", "فَعْلَةٌ (fâ üstünlü): جَلْسَةٌ، سَجْدَةٌ، نَظْرَةٌ"],
  ["Asıl masdar tâ’lı ise?", "وَاحِدَةٌ ile: دَعْوَةٌ وَاحِدَةٌ، رَحْمَةٌ وَاحِدَةٌ"],
  ["Mezîdden merre?", "Asıl masdar + ة: اِسْتِفْهَامٌ ← اِسْتِفْهَامَةٌ"],
  ["Masdar-ı hey’e nedir?", "İşin yapılış biçimini bildiren isim: جِلْسَةَ المَلِكِ"],
  ["Hey’enin sülâsî kalıbı?", "فِعْلَةٌ (fâ esreli), izafet ya da sıfatla: مِشْيَةَ الشَّيْخِ"],
  ["Mezîdden hey’e?", "Belirli bir kalıbı yoktur."],
  ["جَلْسَةً mi جِلْسَةَ mi?", "جَلْسَةً: bir kez oturdu. جِلْسَةَ المَلِكِ: kral gibi oturdu."],
  ["Masdar-ı sınâî nasıl yapılır?", "Kelime + ـِيَّةٌ: إِسْلَامٌ ← إِسْلَامِيَّةٌ"],
  ["هُوَ ve كَيْفَ'den?", "هُوِيَّةٌ (kimlik), كَيْفِيَّةٌ (keyfiyet)"],
  ["حُرِّيَّةٌ ile حُرِّيٌّ farkı?", "حُرِّيَّةٌ: masdar-ı sınâî (hürriyet). حُرِّيٌّ: nisbe sıfatı."],
  ["الحَضَارَةُ الإِسْلَامِيَّةُ'de ـِيَّة?", "Dişil isimden sonra gelen nisbe sıfatı; masdar-ı sınâî değil."]
];
