// ================= VERİ: Maksûr, Menkûs ve Memdûd İsimler (المَقْصُورُ وَالمَنْقُوصُ وَالمَمْدُودُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "المَقْصُورُ", tr: "Maksûr" }, nasb: { ar: "المَنْقُوصُ", tr: "Menkûs" }, cerr: { ar: "المَمْدُودُ", tr: "Memdûd" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TP = [["q", "Maksûr", "اسْمٌ مَقْصُورٌ", "mz"], ["n", "Menkûs", "اسْمٌ مَنْقُوصٌ", "nasb"], ["d", "Memdûd", "اسْمٌ مَمْدُودٌ", "cerr"], ["x", "Hiçbiri", "غَيْرُ ذَلِكَ", "x"]];
var ALM = [["z", "Zâhir hareke", "حَرَكَةٌ ظَاهِرَةٌ", "nasb"], ["m", "Mukadder (takdîrî) hareke", "حَرَكَةٌ مُقَدَّرَةٌ", "cerr"]];
var TUR_TR = { q: "Maksûr", n: "Menkûs", d: "Memdûd", x: "Hiçbiri", z: "Zâhir", m: "Mukadder" };
// Makine: [tür, [merfû-ال, mansûb-ال, mecrûr-ال, merfû-nekre, mansûb-nekre, mecrûr-nekre], [Türkçe: yalın, belirtme, yönelme]]
var MQ = [
  ["q", ["الفَتَى", "الفَتَى", "الفَتَى", "فَتًى", "فَتًى", "فَتًى"], ["genç", "genci", "gence"]],
  ["q", ["المُسْتَشْفَى", "المُسْتَشْفَى", "المُسْتَشْفَى", "مُسْتَشْفًى", "مُسْتَشْفًى", "مُسْتَشْفًى"], ["hastane", "hastaneyi", "hastaneye"]],
  ["n", ["القَاضِي", "القَاضِيَ", "القَاضِي", "قَاضٍ", "قَاضِيًا", "قَاضٍ"], ["hâkim", "hâkimi", "hâkime"]],
  ["n", ["الوَادِي", "الوَادِيَ", "الوَادِي", "وَادٍ", "وَادِيًا", "وَادٍ"], ["vadi", "vadiyi", "vadiye"]],
  ["d", ["البِنَاءُ", "البِنَاءَ", "البِنَاءِ", "بِنَاءٌ", "بِنَاءً", "بِنَاءٍ"], ["bina", "binayı", "binaya"]],
  ["d", ["الكِسَاءُ", "الكِسَاءَ", "الكِسَاءِ", "كِسَاءٌ", "كِسَاءً", "كِسَاءٍ"], ["elbise", "elbiseyi", "elbiseye"]]
];
var MF = ["Merfû · ال", "Mansûb · ال", "Mecrûr · ال", "Merfû · nekre", "Mansûb · nekre", "Mecrûr · nekre"];
var MFR = ["هَذَا ", "رَأَيْتُ ", "نَظَرْتُ إِلَى "];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function T(c, tr, why) { return { c: c, tr: tr, why: why }; }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }
function ROT(arr, i) { var k = [[0, 1, 2], [1, 2, 0], [2, 0, 1]][i % 3]; return { o: k.map(function (j) { return arr[j]; }), a: k.indexOf(0) }; }
function CBP(parts, i, tr, why) {
  var p = [], ok = [], si = 0;
  parts.forEach(function (x) { if (typeof x === "string") p.push(x); else { var r = ROT(x, i + si++); p.push(r); ok.push(r.a); } });
  return { q: "", p: p, ok: [ok], tr: tr, why: why };
}
// Memdûd zabt: [önce, [kelime ×3], sonra, [sebep ×3], Türkçe, açıklama]
function MZ(x, i) { return CBP([x[0], x[1], x[2] + " ← السَّبَبُ:", x[3]], i, x[4], x[5]); }
var SB = { mi: ["مُضَافٌ إِلَيْهِ", "فَاعِلٌ", "مَفْعُولٌ بِهِ"], mj: ["اسْمٌ مَجْرُورٌ", "فَاعِلٌ", "مَفْعُولٌ بِهِ"], kh: ["خَبَرُ إِنَّ", "اسْمُ إِنَّ", "مَفْعُولٌ بِهِ"], mb: ["مَفْعُولٌ بِهِ ثَانٍ", "فَاعِلٌ", "اسْمٌ مَجْرُورٌ"] };

var UNITS = [
// ---------------------------------------------------------------- 1 · MAKSÛR
{
  id: "u1", no: 1, ar: "الاسْمُ المَقْصُورُ", tr: "Maksûr İsim", short: "Maksûr", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Maksûr ismin sonu sabit elif olan mu’rab isim olduğunu bilmek", "Üç hâlde de harekenin takdîrî olduğunu bilmek", "Âyet ve hadislerde maksûr ve menkûs isimleri bulmak"],
  examples: [
    { s: "دَخَلَ:- / مُصْطَفَى:mz / المَبْنَى:mz / المُجَاوِرَ:- / لِلْمُسْتَشْفَى.:mz", tr: "Mustafa hastanenin yanındaki binaya girdi." },
    { s: "أُولَئِكَ عَلَى:- / هُدًى:mz / مِنْ رَبِّهِمْ.:-", tr: "İşte onlar Rablerinden bir hidayet üzeredir. (nekre: tenvin elif’ten önce)" }
  ],
  rules: [
    { tr: "<b>Maksûr isim</b> (<span class=\"ar\">الاسْمُ المَقْصُورُ</span>): sonu sabit bir elif (elif-i maksûre) olan mu’rab isimdir: <span class=\"ar\">الفَتَى، المُسْتَشْفَى، هُدًى، الكُبْرَى، عَصًا</span>." },
    { tr: "Elif hareke alamadığı için üç hâlde de hareke <b>takdîrî</b> (mukadder) olur:", ex: ["دَخَلَ مُصْطَفَى المَبْنَى المُجَاوِرَ لِلْمُسْتَشْفَى", "مُصْطَفَى: ضَمَّةٌ مُقَدَّرَةٌ · المَبْنَى: فَتْحَةٌ مُقَدَّرَةٌ · لِلْمُسْتَشْفَى: كَسْرَةٌ مُقَدَّرَةٌ"] },
    { tr: "Yazılış: elif kökteki yâdan geliyorsa ya da kelime üç harften uzunsa <span class=\"ar\">ى</span> (<span class=\"ar\">هُدًى، المُسْتَشْفَى</span>), üç harfli kelimede vâvdan geliyorsa <span class=\"ar\">ا</span> (<span class=\"ar\">عَصًا</span>) yazılır." },
    { tr: "Nekrede tenvin elif’ten önceki harfe konur: <span class=\"ar\">فَتًى، هُدًى</span>. Elif-i te’nîs ile bitenler (<span class=\"ar\">كُبْرَى، دَعْوَى، ذِكْرَى</span>) gayr-i munsariftir, tenvin almaz." }
  ],
  kaide: ["المَقْصُورُ: اسْمٌ مُعْرَبٌ آخِرُهُ أَلِفٌ لَازِمَةٌ (أَلِفٌ مَقْصُورَةٌ)، مِثْلُ: ذَهَبَتْ كُبْرَى إِلَى السُّوقِ. يُرْفَعُ الاسْمُ المَقْصُورُ وَيُنْصَبُ وَيُجَرُّ بِحَرَكَاتٍ مُقَدَّرَةٍ عَلَى الأَلِفِ، مِثْلُ: دَخَلَ مُصْطَفَى المَبْنَى المُجَاوِرَ لِلْمُسْتَشْفَى. «مُصْطَفَى» فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ المُقَدَّرَةِ عَلَى الأَلِفِ، وَ«المَبْنَى» مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ المُقَدَّرَةِ عَلَى الأَلِفِ."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "١", ar: "عَيِّنِ الاسْمَ المَقْصُورَ وَالمَنْقُوصَ فِي الآيَاتِ التَّالِيَةِ وَالأَحَادِيثِ الشَّرِيفَةِ", tr: "Maksûr ve menkûs isimleri etiketle; kalanlar Başka.", items: [
      T("وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ:x / الدَّاعِ:nasb / إِذَا دَعَانِ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ:x", "Kullarım beni sana sorarsa, ben yakınım; dua edenin duasına cevap veririm… (Bakara 186)", "الدَّاعِي menkûstur; Mushaf yazımında yâ düşmüş: الدَّاعِ. دَعَانِ fiildir."),
      T("مَا عِنْدَكُمْ يَنْفَدُ وَمَا عِنْدَ اللهِ:x / بَاقٍ:nasb", "Sizin yanınızdaki tükenir, Allah katındaki kalıcıdır. (Nahl 96)", "Nekre menkûs merfû: yâ düşmüş, tenvin gelmiş."),
      T("رَبَّنَا إِنِّي أَسْكَنْتُ مِنْ ذُرِّيَّتِي:x / بِوَادٍ:nasb / غَيْرِ ذِي زَرْعٍ عِنْدَ بَيْتِكَ المُحَرَّمِ:x", "Rabbimiz, ben neslimden bir kısmını senin kutsal evinin yanında ekin bitmez bir vadiye yerleştirdim. (İbrâhîm 37)", "Nekre menkûs mecrûr: وَادٍ."),
      T("وَمَا تِلْكَ بِيَمِينِكَ يَا:x / مُوسَى:mz / قَالَ هِيَ:x / عَصَايَ:mz / أَتَوَكَّأُ عَلَيْهَا وَأَهُشُّ بِهَا عَلَى غَنَمِي وَلِيَ فِيهَا مَآرِبُ:x / أُخْرَى:mz", "Sağ elindeki nedir ey Mûsâ? Dedi ki: O benim asamdır… onda başka işlerim de var. (Tâhâ 17-18)", "مُوسَى، عَصَا (عَصَايَ), أُخْرَى: maksûr."),
      T("أُولَئِكَ عَلَى:x / هُدًى:mz / مِنْ رَبِّهِمْ وَأُولَئِكَ هُمُ المُفْلِحُونَ:x", "İşte onlar Rablerinden bir hidayet üzeredir ve kurtuluşa erenler onlardır. (Bakara 5)", "Nekre maksûr: tenvin."),
      T("أَلَا إِنَّ رَبَّكُمْ وَاحِدٌ وَإِنَّ أَبَاكُمْ وَاحِدٌ، أَلَا لَا فَضْلَ لِعَرَبِيٍّ عَلَى أَعْجَمِيٍّ وَلَا لِأَعْجَمِيٍّ عَلَى عَرَبِيٍّ إِلَّا:x / بِالتَّقْوَى:mz", "Rabbiniz birdir, babanız birdir; Arap’ın Arap olmayana, Arap olmayanın Arap’a takvâ dışında üstünlüğü yoktur. (Hadis)", "التَّقْوَى maksûr. عَرَبِيٍّ nisbe yâsıdır (şeddeli), menkûs değildir."),
      T("سَاقِي:nasb / القَوْمِ آخِرُهُمْ شُرْبًا:x", "Topluluğa su dağıtan, en son içendir. (Hadis)", "سَاقِي menkûs; muzâf olduğu için yâ kalmış."),
      T("كَافِلُ اليَتِيمِ لَهُ أَوْ لِغَيْرِهِ، أَنَا وَهُوَ كَهَاتَيْنِ فِي الجَنَّةِ، وَأَشَارَ بِالسَّبَّابَةِ:x / وَالوُسْطَى:mz", "Kendi yetimine ya da başkasının yetimine bakan kimse ile ben cennette şu ikisi gibiyiz — işaret ve orta parmağını gösterdi. (Hadis)", "الوُسْطَى maksûr (elif-i te’nîs).")
    ]},
    { type: "classify", extra: true, opts: TP, ar: "مَا نَوْعُ هَذَا الاسْمِ؟", tr: "Kelime maksûr mu, menkûs mu, memdûd mu, hiçbiri mi?", items: CL([
      ["الفَتَى", "q", "Sonu elif."], ["المُسْتَشْفَى", "q", "Sonu elif."], ["هُدًى", "q", "Nekre maksûr."], ["الكُبْرَى", "q", "Elif-i te’nîs maksûre."],
      ["القَاضِي", "n", "Yâ, öncesi kesreli."], ["المُحَامِي", "n", "Yâ, öncesi kesreli."], ["وَادٍ", "n", "Nekre menkûs: yâ düşmüş."], ["الرَّاعِي", "n", "Menkûs."],
      ["السَّمَاءُ", "d", "Zâid elif + hemze."], ["الصَّحْرَاءُ", "d", "Elif-i te’nîs memdûde."], ["البِنَاءُ", "d", "Zâid elif + hemze."], ["العُلَمَاءُ", "d", "Zâid elif + hemze."],
      ["عَرَبِيٌّ", "x", "Şeddeli nisbe yâsı: menkûs değil."], ["ظَبْيٌ", "x", "Yâdan önce sükûn: menkûs değil."], ["يَدْعُو", "x", "Fiil."], ["رَمَى", "x", "Fiil (mâzî): maksûr isim değil."]
    ]) },
    { type: "pick", extra: true, ar: "أَعْرِبِ الاسْمَ المَقْصُورَ", tr: "Koyu maksûr ismin doğru i’rabını seç.", items: PL([
      [HL("دَخَلَ مُصْطَفَى المَبْنَى", "مُصْطَفَى"), "فَاعِلٌ مَرْفُوعٌ بِضَمَّةٍ مُقَدَّرَةٍ عَلَى الأَلِفِ", "فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ الظَّاهِرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِفَتْحَةٍ مُقَدَّرَةٍ", "Mustafa binaya girdi.", "Elif hareke almaz: takdîrî damme."],
      [HL("دَخَلَ مُصْطَفَى المَبْنَى", "المَبْنَى"), "مَفْعُولٌ بِهِ مَنْصُوبٌ بِفَتْحَةٍ مُقَدَّرَةٍ عَلَى الأَلِفِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ الظَّاهِرَةِ", "فَاعِلٌ مَرْفُوعٌ بِضَمَّةٍ مُقَدَّرَةٍ", "Mustafa binaya girdi.", "Takdîrî fetha."],
      [HL("المَبْنَى المُجَاوِرُ لِلْمُسْتَشْفَى", "لِلْمُسْتَشْفَى"), "اسْمٌ مَجْرُورٌ بِكَسْرَةٍ مُقَدَّرَةٍ عَلَى الأَلِفِ", "اسْمٌ مَجْرُورٌ بِالكَسْرَةِ الظَّاهِرَةِ", "اسْمٌ مَجْرُورٌ بِالفَتْحَةِ نِيَابَةً عَنِ الكَسْرَةِ", "Hastanenin yanındaki bina.", "Takdîrî kesre."],
      [HL("أُولَئِكَ عَلَى هُدًى مِنْ رَبِّهِمْ", "هُدًى"), "اسْمٌ مَجْرُورٌ بِكَسْرَةٍ مُقَدَّرَةٍ عَلَى الأَلِفِ", "اسْمٌ مَجْرُورٌ بِالكَسْرَةِ الظَّاهِرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَةِ", "Onlar bir hidayet üzeredir.", "Tenvin görünse de kesre takdîrîdir."],
      [HL("لَهُمُ البُشْرَى فِي الحَيَاةِ الدُّنْيَا", "البُشْرَى"), "مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ بِضَمَّةٍ مُقَدَّرَةٍ عَلَى الأَلِفِ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ الظَّاهِرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِفَتْحَةٍ مُقَدَّرَةٍ", "Dünya hayatında müjde onlaradır.", "لَهُمُ haber-i mukaddem."],
      [HL("وَلِيَ فِيهَا مَآرِبُ أُخْرَى", "أُخْرَى"), "صِفَةٌ مَرْفُوعَةٌ بِضَمَّةٍ مُقَدَّرَةٍ عَلَى الأَلِفِ", "صِفَةٌ مَرْفُوعَةٌ بِالضَّمَّةِ الظَّاهِرَةِ", "حَالٌ مَنْصُوبَةٌ بِفَتْحَةٍ مُقَدَّرَةٍ", "Onda başka işlerim de var.", "مَآرِبُ’in sıfatı."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · MENKÛS
{
  id: "u2", no: 2, ar: "الاسْمُ المَنْقُوصُ", tr: "Menkûs İsim", short: "Menkûs", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Menkûs ismin sonu öncesi kesreli yâ olan isim olduğunu bilmek", "Merfû ve mecrûrda takdîrî, mansûbda zâhir harekeyi bilmek", "ال ve izafet yokken yânın düşüp tenvin geldiğini bilmek"],
  examples: [
    { s: "دَخَلَ:- / القَاضِي:nasb / إِلَى المَحْكَمَةِ.:-", tr: "Hâkim mahkemeye girdi. (damme takdîrî)", pair: "رَأَيْتُ:- / القَاضِيَ:nasb / فِي المَحْكَمَةِ.:-", pairTr: "Hâkimi mahkemede gördüm. (fetha zâhir)" },
    { s: "اشْتَرَكَ:- / قَاضٍ:nasb / فِي الحَفْلِ.:-", tr: "Bir hâkim törene katıldı. (yâ düştü)", pair: "رَأَيْتُ:- / قَاضِيًا:nasb / فِي الحَفْلِ.:-", pairTr: "Törende bir hâkim gördüm. (mansûbda yâ kalır)" }
  ],
  rules: [
    { tr: "<b>Menkûs isim</b> (<span class=\"ar\">الاسْمُ المَنْقُوصُ</span>): sonu, öncesi kesreli bir yâ olan mu’rab isimdir: <span class=\"ar\">القَاضِي، المُحَامِي، الوَادِي، السَّاعِي</span>. <span class=\"ar\">عَرَبِيٌّ</span> (şeddeli yâ) ve <span class=\"ar\">ظَبْيٌ</span> (öncesi sâkin) menkûs değildir." },
    { tr: "Merfû ve mecrûrda hareke yâ üzerinde <b>takdîrî</b> (ağır geldiği için), mansûbda fetha <b>zâhir</b>dir:", ex: ["دَخَلَ القَاضِي · رَأَيْتُ القَاضِيَ · سَلَّمْتُ عَلَى القَاضِي"] },
    { tr: "ال almaz ve muzâf olmazsa merfû ve mecrûrda <b>yâ düşer</b>, yerine tenvin gelir. Mansûbda yâ kalır:", ex: ["اشْتَرَكَ قَاضٍ · سَلَّمْتُ عَلَى قَاضٍ · رَأَيْتُ قَاضِيًا"] },
    { tr: "İzafet kalkınca da yâ düşer: <span class=\"ar\">حَضَرَ مُحَامِي المُتَّهَمِ ← حَضَرَ مُحَامٍ</span>. <span class=\"ar\">مَبَانٍ، لَيَالٍ</span> gibi gayr-i munsarif çoğullarda da yâ düşer; mansûbda <span class=\"ar\">مَبَانِيَ</span> olur." }
  ],
  kaide: ["المَنْقُوصُ: اسْمٌ مُعْرَبٌ آخِرُهُ يَاءٌ قَبْلَهَا حَرْفٌ مَكْسُورٌ، مِثْلُ: دَافَعَ المُحَامِي عَنِ المُتَّهَمِ. أ ـ يُرْفَعُ بِضَمَّةٍ مُقَدَّرَةٍ عَلَى اليَاءِ: دَخَلَ القَاضِي إِلَى المَحْكَمَةِ. ب ـ وَيُنْصَبُ بِفَتْحَةٍ ظَاهِرَةٍ عَلَى اليَاءِ: رَأَيْتُ القَاضِيَ فِي المَحْكَمَةِ. جـ ـ وَيُجَرُّ بِكَسْرَةٍ مُقَدَّرَةٍ عَلَى اليَاءِ: سَلَّمْتُ عَلَى القَاضِي اليَوْمَ.", "تُحْذَفُ اليَاءُ مِنْ آخِرِ المَنْقُوصِ فِي غَيْرِ حَالَةِ النَّصْبِ إِذَا لَمْ يَكُنْ مُعَرَّفًا بِـ«ال» أَوْ مُضَافًا، مِثْلُ: اشْتَرَكَ قَاضٍ فِي الحَفْلِ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "اخْتَرِ الضَّبْطَ الصَّحِيحَ لِلاسْمِ المَنْقُوصِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Menkûs ismin doğru yazılışını seç.", exHtml: "<span class=\"ar\">حَضَرَ قَاضٍ إِلَى الكُلِّيَّةِ. (✓ قَاضٍ – قَاضِيًا – القَاضِيَ)</span>", items: PL([
      ["الطِّفْلُ ___ لِأَنَّهُ بَعِيدٌ عَنْ أُمِّهِ.", "بَاكٍ", "بَاكِيًا", "البَاكِيَ", "Çocuk annesinden uzak olduğu için ağlıyor.", "Haber, nekre, merfû: yâ düşer."],
      ["المُدَرِّسُ ___ عَنْ سُلُوكِ الطُّلَّابِ.", "رَاضٍ", "رَاضِيًا", "الرَّاضِيَ", "Öğretmen öğrencilerin davranışından memnun.", "Haber, nekre, merfû."],
      ["دَخَلْتُ طَرِيقًا ___ مِنَ النَّاسِ.", "خَالِيًا", "خَالٍ", "الخَالِيَ", "İnsanlardan boş bir yola girdim.", "Mansûb nekreye sıfat: yâ kalır, fetha zâhir."],
      ["كُنْ لِلنَّاسِ ___هِمْ وَلَا تَكُنْ مُضِلَّهُمْ.", "هَادِيَ", "هَادٍ", "الهَادِيَ", "İnsanlara yol gösteren ol, onları saptıran olma.", "كَانَ’in haberi, muzâf: هَادِيَهُمْ."],
      ["يُحِبُّ النَّاسُ ___ يَحْكُمُ بِالعَدْلِ.", "قَاضِيًا", "قَاضٍ", "قَاضِيَ", "İnsanlar adaletle hükmeden bir hâkimi sever.", "Mef’ûlün bih, nekre: قَاضِيًا."],
      ["زُرْتُ ___ فِي المَرْعَى.", "الرَّاعِيَ", "رَاعٍ", "الرَّاعِي", "Çobanı merada ziyaret ettim.", "Mef’ûlün bih, ال’lı: fetha zâhir."],
      ["يَجِبُ أَنْ تَكُونَ ___ بِقَضَاءِ اللهِ.", "رَاضِيًا", "رَاضٍ", "الرَّاضِي", "Allah’ın takdirine razı olmalısın.", "تَكُونَ’nin haberi: mansûb nekre."],
      ["___ وَالمُرْتَشِي فِي النَّارِ.", "الرَّاشِي", "الرَّاشِيُ", "الرَّاشِيَ", "Rüşvet veren de alan da ateştedir.", "Mübtedâ: damme takdîrî."]
    ])},
    { type: "pick", num: "٥", ar: "اجْعَلِ المَنْقُوصَ النَّكِرَةَ مُعَرَّفًا بِـ«ال» وَاضْبِطْهُ بِالشَّكْلِ", tr: "Nekre menkûsu ال’lı yap: doğru cümleyi seç.", exHtml: "<span class=\"ar\">زُرْتُ قَاضِيًا فِي مَكْتَبِهِ ← زُرْتُ القَاضِيَ فِي مَكْتَبِهِ.</span>", items: PL([
      ["يَأْخُذُ رَاعٍ حَيَوَانَاتِ القَرْيَةِ إِلَى المَرْعَى.", "يَأْخُذُ الرَّاعِي حَيَوَانَاتِ القَرْيَةِ إِلَى المَرْعَى.", "يَأْخُذُ الرَّاعٍ حَيَوَانَاتِ القَرْيَةِ إِلَى المَرْعَى.", "يَأْخُذُ الرَّاعِيَ حَيَوَانَاتِ القَرْيَةِ إِلَى المَرْعَى.", "Çoban köyün hayvanlarını meraya götürür.", "ال gelince yâ döner; fâil: damme takdîrî."],
      ["دَافَعَ مُحَامٍ عَنِ المُتَّهَمِ.", "دَافَعَ المُحَامِي عَنِ المُتَّهَمِ.", "دَافَعَ المُحَامٍ عَنِ المُتَّهَمِ.", "دَافَعَ المُحَامِيُ عَنِ المُتَّهَمِ.", "Avukat sanığı savundu.", "Fâil: damme takdîrî."],
      ["لَا يُحِبُّ النَّاسُ رَاشِيًا.", "لَا يُحِبُّ النَّاسُ الرَّاشِيَ.", "لَا يُحِبُّ النَّاسُ الرَّاشِي.", "لَا يُحِبُّ النَّاسُ الرَّاشِيًا.", "İnsanlar rüşvet vereni sevmez.", "Mef’ûlün bih: fetha zâhir."],
      ["تَجَوَّلَ السُّيَّاحُ فِي وَادٍ عَمِيقٍ.", "تَجَوَّلَ السُّيَّاحُ فِي الوَادِي العَمِيقِ.", "تَجَوَّلَ السُّيَّاحُ فِي الوَادٍ العَمِيقِ.", "تَجَوَّلَ السُّيَّاحُ فِي الوَادِيَ العَمِيقِ.", "Turistler derin vadide dolaştı.", "Mecrûr: kesre takdîrî; sıfat da ال alır."],
      ["رَأَيْتُ فِي الشَّارِعِ طِفْلًا بَاكِيًا.", "رَأَيْتُ فِي الشَّارِعِ الطِّفْلَ البَاكِيَ.", "رَأَيْتُ فِي الشَّارِعِ الطِّفْلَ البَاكِي.", "رَأَيْتُ فِي الشَّارِعِ الطِّفْلَ البَاكٍ.", "Sokakta ağlayan çocuğu gördüm.", "Mansûb sıfat: fetha zâhir."],
      ["أُنْشِئَتْ مَبَانٍ كَثِيرَةٌ فِي إِسْطَنْبُولَ.", "أُنْشِئَتِ المَبَانِي الكَثِيرَةُ فِي إِسْطَنْبُولَ.", "أُنْشِئَتِ المَبَانٍ الكَثِيرَةُ فِي إِسْطَنْبُولَ.", "أُنْشِئَتِ المَبَانِيَ الكَثِيرَةُ فِي إِسْطَنْبُولَ.", "İstanbul’da çok sayıda bina yapıldı.", "Nâib-i fâil: damme takdîrî."],
      ["شَاهَدْتُ مُحَامِيًا فِي قَاعَةِ الِاجْتِمَاعِ.", "شَاهَدْتُ المُحَامِيَ فِي قَاعَةِ الِاجْتِمَاعِ.", "شَاهَدْتُ المُحَامِي فِي قَاعَةِ الِاجْتِمَاعِ.", "شَاهَدْتُ المُحَامٍ فِي قَاعَةِ الِاجْتِمَاعِ.", "Toplantı salonunda avukatı gördüm.", "Mef’ûlün bih: fetha zâhir."],
      ["يَضَعُ اللهُ المُتَوَاضِعَ فِي مَقَامٍ عَالٍ.", "يَضَعُ اللهُ المُتَوَاضِعَ فِي المَقَامِ العَالِي.", "يَضَعُ اللهُ المُتَوَاضِعَ فِي المَقَامِ العَالٍ.", "يَضَعُ اللهُ المُتَوَاضِعَ فِي المَقَامِ العَالِيِ.", "Allah alçakgönüllüyü yüce makama koyar.", "Mecrûra sıfat: kesre takdîrî."]
    ])},
    { type: "pick", num: "٦", ar: "ضَعِ المَنْقُوصَ فِي صُورَتِهِ الصَّحِيحَةِ", tr: "Parantezdeki menkûsu cümleye doğru yerleştir.", exHtml: "<span class=\"ar\">لَا يُحِبُّ اللهُ الرَّجُلَ (عَاصٍ) ← لَا يُحِبُّ اللهُ الرَّجُلَ العَاصِيَ.</span>", items: PL([
      ["يَضَعُ اللهُ المُتَوَاضِعَ فِي المَقَامِ (عَالٍ)", "يَضَعُ اللهُ المُتَوَاضِعَ فِي المَقَامِ العَالِي.", "يَضَعُ اللهُ المُتَوَاضِعَ فِي المَقَامِ العَالٍ.", "يَضَعُ اللهُ المُتَوَاضِعَ فِي المَقَامِ عَالٍ.", "Allah alçakgönüllüyü yüce makama koyar.", "ال’lı isme sıfat da ال alır; mecrûr: kesre takdîrî."],
      ["هَزَمَ الجَيْشُ العَدُوَّ (مُعْتَدٍ)", "هَزَمَ الجَيْشُ العَدُوَّ المُعْتَدِيَ.", "هَزَمَ الجَيْشُ العَدُوَّ المُعْتَدِي.", "هَزَمَ الجَيْشُ العَدُوَّ المُعْتَدٍ.", "Ordu saldırgan düşmanı yendi.", "Mansûb sıfat: fetha zâhir."],
      ["رَأَيْتُ فِي المَسْجِدِ الرَّجُلَ (مُصَلٍّ)", "رَأَيْتُ فِي المَسْجِدِ الرَّجُلَ المُصَلِّيَ.", "رَأَيْتُ فِي المَسْجِدِ الرَّجُلَ المُصَلِّي.", "رَأَيْتُ فِي المَسْجِدِ الرَّجُلَ المُصَلٍّ.", "Mescitte namaz kılan adamı gördüm.", "Mansûb sıfat."],
      ["شَاهَدْتُ فِي الحَدِيقَةِ الطِّفْلَ (بَاكٍ)", "شَاهَدْتُ فِي الحَدِيقَةِ الطِّفْلَ البَاكِيَ.", "شَاهَدْتُ فِي الحَدِيقَةِ الطِّفْلَ البَاكِي.", "شَاهَدْتُ فِي الحَدِيقَةِ الطِّفْلَ البَاكٍ.", "Bahçede ağlayan çocuğu gördüm.", "Mansûb sıfat."],
      ["يُكَافِئُ اللهُ المُسْلِمَ (دَاعٍ) إِلَى الخَيْرِ", "يُكَافِئُ اللهُ المُسْلِمَ الدَّاعِيَ إِلَى الخَيْرِ.", "يُكَافِئُ اللهُ المُسْلِمَ الدَّاعِي إِلَى الخَيْرِ.", "يُكَافِئُ اللهُ المُسْلِمَ الدَّاعٍ إِلَى الخَيْرِ.", "Allah hayra çağıran Müslümanı ödüllendirir.", "Mansûb sıfat."],
      ["سَاعَدْتُ فِي السُّوقِ الشَّيْخَ (مَاشٍ) إِلَى بَيْتِهِ", "سَاعَدْتُ فِي السُّوقِ الشَّيْخَ المَاشِيَ إِلَى بَيْتِهِ.", "سَاعَدْتُ فِي السُّوقِ الشَّيْخَ المَاشِي إِلَى بَيْتِهِ.", "سَاعَدْتُ فِي السُّوقِ الشَّيْخَ المَاشٍ إِلَى بَيْتِهِ.", "Çarşıda evine yürüyen yaşlıya yardım ettim.", "Mansûb sıfat."],
      ["سَأَلْتُ شَابًّا (مَاشٍ): أَيْنَ المَسْجِدُ؟", "سَأَلْتُ شَابًّا مَاشِيًا: أَيْنَ المَسْجِدُ؟", "سَأَلْتُ شَابًّا مَاشٍ: أَيْنَ المَسْجِدُ؟", "سَأَلْتُ شَابًّا المَاشِيَ: أَيْنَ المَسْجِدُ؟", "Yürüyen bir gence: Mescit nerede? diye sordum.", "Nekre mansûba sıfat: مَاشِيًا."],
      ["يُعْطِي اللهُ صَاحِبَ العِلْمِ مَقَامًا (عَالٍ)", "يُعْطِي اللهُ صَاحِبَ العِلْمِ مَقَامًا عَالِيًا.", "يُعْطِي اللهُ صَاحِبَ العِلْمِ مَقَامًا عَالٍ.", "يُعْطِي اللهُ صَاحِبَ العِلْمِ مَقَامًا العَالِيَ.", "Allah ilim sahibine yüce bir makam verir.", "Nekre mansûba sıfat."]
    ])},
    { type: "pick", num: "٧", ar: "احْذِفِ المُضَافَ إِلَيْهِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Muzâfun ileyhi at; menkûsun doğru biçimini seç.", exHtml: "<span class=\"ar\">حَضَرَ مُحَامِي المُتَّهَمِ ← حَضَرَ مُحَامٍ.</span>", items: PL([
      ["اشْتَرَكَ قَاضِي المَدِينَةِ فِي الحَفْلِ. (المَدِينَةِ ✗)", "اشْتَرَكَ قَاضٍ فِي الحَفْلِ.", "اشْتَرَكَ قَاضِي فِي الحَفْلِ.", "اشْتَرَكَ قَاضِيًا فِي الحَفْلِ.", "Bir hâkim törene katıldı.", "Merfû nekre: yâ düşer."],
      ["دَخَلَ بَعْضُ الطُّلَّابِ نَادِيَ الأَدَبِ. (الأَدَبِ ✗)", "دَخَلَ بَعْضُ الطُّلَّابِ نَادِيًا.", "دَخَلَ بَعْضُ الطُّلَّابِ نَادٍ.", "دَخَلَ بَعْضُ الطُّلَّابِ نَادِيَ.", "Bazı öğrenciler bir kulübe girdi.", "Mansûb nekre: yâ kalır."],
      ["كَانَ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ هَادِيَ النَّاسِ. (النَّاسِ ✗)", "كَانَ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ هَادِيًا.", "كَانَ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ هَادٍ.", "كَانَ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ هَادِي.", "Resûlullah bir yol göstericiydi.", "كَانَ’nin haberi: mansûb."],
      ["شَاهَدْنَا وَادِيَ النِّيلِ. (النِّيلِ ✗)", "شَاهَدْنَا وَادِيًا.", "شَاهَدْنَا وَادٍ.", "شَاهَدْنَا وَادِيَ.", "Bir vadi gördük.", "Mansûb nekre."],
      ["لَا أَعْرِفُ رَاوِيَ الحَدِيثِ. (الحَدِيثِ ✗)", "لَا أَعْرِفُ رَاوِيًا.", "لَا أَعْرِفُ رَاوٍ.", "لَا أَعْرِفُ رَاوِيَ.", "Bir râvi tanımıyorum.", "Mansûb nekre."],
      ["رَجَعَ رَاعِي الغَنَمِ إِلَى القَرْيَةِ. (الغَنَمِ ✗)", "رَجَعَ رَاعٍ إِلَى القَرْيَةِ.", "رَجَعَ رَاعِي إِلَى القَرْيَةِ.", "رَجَعَ رَاعِيًا إِلَى القَرْيَةِ.", "Bir çoban köye döndü.", "Merfû nekre: yâ düşer."],
      ["أَقَامَ نَادِي الرِّيَاضَةِ مُبَارَاةً رِيَاضِيَّةً. (الرِّيَاضَةِ ✗)", "أَقَامَ نَادٍ مُبَارَاةً رِيَاضِيَّةً.", "أَقَامَ نَادِي مُبَارَاةً رِيَاضِيَّةً.", "أَقَامَ نَادِيًا مُبَارَاةً رِيَاضِيَّةً.", "Bir kulüp spor müsabakası düzenledi.", "Merfû nekre."],
      ["شَكَرْنَا مُحَامِيَ الرَّجُلِ. (الرَّجُلِ ✗)", "شَكَرْنَا مُحَامِيًا.", "شَكَرْنَا مُحَامٍ.", "شَكَرْنَا مُحَامِيَ.", "Bir avukata teşekkür ettik.", "Mansûb nekre."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · MEMDÛD
{
  id: "u3", no: 3, ar: "الاسْمُ المَمْدُودُ", tr: "Memdûd İsim", short: "Memdûd", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Memdûd ismin sonu zâid elif + hemze olan isim olduğunu bilmek", "Harekenin hemze üzerinde zâhir olduğunu bilmek", "Elif-i te’nîs memdûde ile bitenlerin gayr-i munsarif olduğunu bilmek"],
  examples: [
    { s: "السَّمَاءُ:cerr / تُمْطِرُ.:-", tr: "Gökyüzü yağmur yağdırıyor. (damme zâhir)" },
    { s: "لَبِسْتُ اليَوْمَ:- / كِسَاءً:cerr / جَدِيدًا.:-", tr: "Bugün yeni bir elbise giydim.", pair: "حَزِنَتِ الأُمُّ عَلَى:- / بُكَاءِ:cerr / طِفْلِهَا.:-", pairTr: "Anne çocuğunun ağlamasına üzüldü." }
  ],
  rules: [
    { tr: "<b>Memdûd isim</b> (<span class=\"ar\">الاسْمُ المَمْدُودُ</span>): sonu <b>zâid</b> bir elif ve ondan sonra hemze olan mu’rab isimdir: <span class=\"ar\">السَّمَاءُ، الكِسَاءُ، البِنَاءُ، الصَّحْرَاءُ</span>." },
    { tr: "Hareke hemze üzerinde <b>zâhir</b> olur:", ex: ["السَّمَاءُ تُمْطِرُ · لَبِسْتُ كِسَاءً جَدِيدًا · حَزِنَتِ الأُمُّ عَلَى بُكَاءِ طِفْلِهَا"] },
    { tr: "Elif-i te’nîs memdûde ile bitenler (<span class=\"ar\">صَحْرَاءُ، بَيْضَاءُ، خَضْرَاءُ</span>) ve <span class=\"ar\">أَفْعِلَاءُ</span> çoğulları (<span class=\"ar\">العُلَمَاءُ، أَوْلِيَاءُ</span>) gayr-i munsariftir: tenvin almaz, ال ve izafet yoksa mecrûrda fetha alır: <span class=\"ar\">فِي صَحْرَاءَ</span>." },
    { tr: "Elif zâid değilse memdûd sayılmaz: <span class=\"ar\">مَاءٌ، هُدُوءٌ، مُضَاءٌ</span>." }
  ],
  kaide: ["المَمْدُودُ: اسْمٌ مُعْرَبٌ آخِرُهُ أَلِفٌ زَائِدَةٌ بَعْدَهَا هَمْزَةٌ (أَلِفٌ مَمْدُودَةٌ)، مِثْلُ: امْتَلَأَتِ السَّمَاءُ بِالسَّحَابِ. أ ـ يُرْفَعُ بِالضَّمَّةِ: السَّمَاءُ تُمْطِرُ. ب ـ وَيُنْصَبُ بِالفَتْحَةِ: لَبِسْتُ اليَوْمَ كِسَاءً جَدِيدًا. جـ ـ وَيُجَرُّ بِالكَسْرَةِ: حَزِنَتِ الأُمُّ عَلَى بُكَاءِ طِفْلِهَا."],
  ex: [
    { type: "tag", roles: ["mz", "nasb", "cerr", "x"], num: "٢", ar: "عَيِّنِ الاسْمَ المَنْقُوصَ وَالمَمْدُودَ فِيمَا يَلِي", tr: "Menkûs ve memdûd isimleri (ve rastladığın maksûrları) etiketle.", items: [
      T("وَنَزَعَ يَدَهُ فَإِذَا هِيَ:x / بَيْضَاءُ:cerr / لِلنَّاظِرِينَ:x", "Elini çıkardı, bir de baktılar ki o, bakanlar için bembeyaz. (Şuarâ 33)", "Elif-i te’nîs memdûde."),
      T("مَنْ كَانَ يَرْجُو:x / لِقَاءَ:cerr / اللهِ فَإِنَّ أَجَلَ اللهِ:x / لَآتٍ:nasb / وَهُوَ السَّمِيعُ العَلِيمُ:x", "Kim Allah’a kavuşmayı umuyorsa bilsin ki Allah’ın belirlediği vakit mutlaka gelecektir. (Ankebût 5)", "لِقَاءَ memdûd; لَآتٍ nekre menkûs (آتِي)."),
      T("أَلَا إِنَّ:x / أَوْلِيَاءَ:cerr / اللهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ، الَّذِينَ آمَنُوا وَكَانُوا يَتَّقُونَ، لَهُمُ:x / البُشْرَى:mz / فِي الحَيَاةِ:x / الدُّنْيَا:mz / وَفِي الآخِرَةِ:x", "Bilin ki Allah’ın dostlarına korku yoktur… Dünya hayatında da ahirette de müjde onlaradır. (Yûnus 62-64)", "أَوْلِيَاءَ memdûd; البُشْرَى ve الدُّنْيَا maksûr."),
      T("إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ:x / العُلَمَاءُ:cerr", "Allah’tan kulları içinde ancak âlimler korkar. (Fâtır 28)", "Memdûd. (Kitapta kaynak Tâhâ 17-18 yazılmış; doğrusu Fâtır 28.)"),
      T("السَّاعِي:nasb / عَلَى الأَرْمَلَةِ وَالمِسْكِينِ كَالمُجَاهِدِ فِي سَبِيلِ اللهِ أَوِ القَائِمِ اللَّيْلَ أَوِ الصَّائِمِ النَّهَارَ:x", "Dul ve yoksul için çalışan, Allah yolunda cihad eden ya da geceyi ibadetle, gündüzü oruçla geçiren gibidir. (Hadis)", "Menkûs: damme takdîrî."),
      T("رِضَى:mz / الرَّبِّ فِي:x / رِضَى:mz / الوَالِدِ، وَسَخَطُ الرَّبِّ فِي سَخَطِ الوَالِدِ:x", "Rabbin rızası babanın rızasında, Rabbin öfkesi babanın öfkesindedir. (Hadis)", "رِضًى / رِضَا maksûrdur."),
      T("لَوْ يَعْلَمُ المَارُّ بَيْنَ يَدَيِ:x / المُصَلِّي:nasb / مَاذَا عَلَيْهِ لَكَانَ أَنْ يَقِفَ أَرْبَعِينَ خَيْرًا لَهُ مِنْ أَنْ يَمُرَّ بَيْنَ يَدَيْهِ:x", "Namaz kılanın önünden geçen, bunun vebalini bilseydi kırk (yıl) beklemesi önünden geçmesinden daha hayırlı olurdu. (Hadis)", "Menkûs mecrûr (muzâfun ileyh)."),
      T("الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، أَفْضَلُهَا قَوْلُ لَا إِلَهَ إِلَّا اللهُ:x / وَأَدْنَاهَا:mz / إِمَاطَةُ:x / الأَذَى:mz / عَنِ الطَّرِيقِ:x / وَالحَيَاءُ:cerr / شُعْبَةٌ مِنَ الإِيمَانِ:x", "İman yetmiş küsur şubedir; en üstünü “lâ ilâhe illallah” demek, en aşağısı yoldan eziyet vereni kaldırmaktır. Hayâ da imandan bir şubedir. (Hadis)", "أَدْنَى ve الأَذَى maksûr; الحَيَاءُ memdûd.")
    ]},
    { type: "pick", fill: true, num: "٤", ar: "اخْتَرِ الضَّبْطَ الصَّحِيحَ لِلاسْمِ المَمْدُودِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Memdûd ismin doğru harekesini seç.", exHtml: "<span class=\"ar\">أَهْدَيْتُ إِلَى صَدِيقِي كِسَاءً جَدِيدًا. (كِسَاءٌ – ✓ كِسَاءً – كِسَاءٍ)</span>", items: PL([
      ["ازْدَادَ التَّاجِرُ الأَمِينُ ___.", "ثَرَاءً", "ثَرَاءٌ", "ثَرَاءٍ", "Dürüst tüccarın serveti arttı.", "Temyiz: mansûb."],
      ["اشْتَرَى المُدَرِّسُ سَيَّارَةً ___.", "بَيْضَاءَ", "بَيْضَاءُ", "البَيْضَاءِ", "Öğretmen beyaz bir araba aldı.", "Mansûb nekreye sıfat; gayr-i munsarif: tenvinsiz fetha."],
      ["أَخَذَتْ ___ مِنَ المَكْتَبَةِ كِتَابًا جَدِيدًا.", "سَمْرَاءُ", "سَمْرَاءَ", "السَّمْرَاءِ", "Semrâ kütüphaneden yeni bir kitap aldı.", "Fâil (özel isim), gayr-i munsarif: tenvinsiz damme."],
      ["قَامَ ___ بِجَوْلَةٍ فِي المَدْرَسَةِ الجَدِيدَةِ.", "البَنَّاءُ", "البَنَّاءَ", "البَنَّاءِ", "Usta yeni okulda bir tur attı.", "Fâil: merfû."],
      ["انْتَقَلَتِ الأُسْرَةُ إِلَى ___ وَاسِعٍ.", "بِنَاءٍ", "بِنَاءٌ", "بِنَاءً", "Aile geniş bir binaya taşındı.", "Mecrûr."],
      ["جَعَلَ اللهُ فِي العَسَلِ ___ لِلنَّاسِ.", "شِفَاءً", "شِفَاءٌ", "شِفَاءٍ", "Allah balda insanlar için şifa kıldı.", "جَعَلَ’in mef’ûlü: mansûb."],
      ["انْتَشَرَتِ الأَغْنَامُ بَيْنَ الأَعْشَابِ ___.", "الخَضْرَاءِ", "الخَضْرَاءُ", "الخَضْرَاءَ", "Koyunlar yeşil otların arasına dağıldı.", "Mecrûra sıfat, ال’lı: kesre."],
      ["النَّاسُ يَنْصِبُونَ الخِيَامَ فِي ___.", "الصَّحْرَاءِ", "الصَّحْرَاءُ", "الصَّحْرَاءَ", "İnsanlar çadırları çölde kurar.", "ال’lı gayr-i munsarif kesre alır."]
    ])},
    { type: "combo", num: "٨", ar: "اضْبِطْ بِالشَّكْلِ الاسْمَ المَمْدُودَ فِي الجُمَلِ التَّالِيَةِ وَبَيِّنِ السَّبَبَ", tr: "Memdûd ismin harekesini ve sebebini seç.", exHtml: "<span class=\"ar\">ازْدَادَ ثَرَاءُ التَّاجِرِ الأَمِينِ ← ثَرَاءُ: فَاعِلٌ</span>", items: [
      ["قَامَ المُهَنْدِسُونَ بِجَوْلَةٍ فِي سَاحَةِ", ["البِنَاءِ", "البِنَاءُ", "البِنَاءَ"], ".", SB.mi, "Mühendisler inşaat alanında bir tur attı.", "سَاحَةِ’ye muzâfun ileyh: mecrûr."],
      ["يَحْمِي الجَيْشُ الوَطَنَ مِنْ أَيِّ", ["اعْتِدَاءٍ", "اعْتِدَاءٌ", "اعْتِدَاءً"], "خَارِجِيٍّ.", SB.mi, "Ordu vatanı her türlü dış saldırıdan korur.", "أَيِّ’ye muzâfun ileyh."],
      ["اسْتَيْقَظَ الرُّكَّابُ فِي الحَافِلَةِ عَلَى", ["بُكَاءِ", "بُكَاءُ", "بُكَاءَ"], "طِفْلٍ.", SB.mj, "Otobüsteki yolcular bir çocuğun ağlamasıyla uyandı.", "عَلَى ile mecrûr."],
      ["تَعَرَّفْتُ اليَوْمَ عَلَى", ["بَنَّاءٍ", "بَنَّاءٌ", "بَنَّاءً"], "مَشْهُورٍ فِي هَذِهِ المَدِينَةِ.", SB.mj, "Bugün bu şehirde ünlü bir ustayla tanıştım.", "عَلَى ile mecrûr."],
      ["سَيَنْتَقِلُ المُدَرِّسُونَ إِلَى", ["بِنَاءٍ", "بِنَاءٌ", "بِنَاءً"], "جَدِيدٍ فِي الشَّهْرِ القَادِمِ.", SB.mj, "Öğretmenler gelecek ay yeni bir binaya taşınacak.", "إِلَى ile mecrûr."],
      ["إِنَّ شَارِعَ الجَامِعَةِ", ["مُضَاءٌ", "مُضَاءً", "مُضَاءٍ"], "فِي اللَّيْلِ.", SB.kh, "Üniversite caddesi geceleri aydınlatılmıştır.", "إِنَّ’nin haberi: merfû. (Not: مُضَاء’da elif zâid değil, kökten; dar tanımla memdûd sayılmaz.)"],
      ["أَعْطَى الأُسْتَاذُ الطَّالِبَ", ["كِسَاءً", "كِسَاءٌ", "كِسَاءٍ"], "جَدِيدًا.", SB.mb, "Hoca öğrenciye yeni bir elbise verdi.", "أَعْطَى’nın ikinci mef’ûlü."],
      ["يَعِيشُ البَدَوِيُّ فِي", ["الصَّحْرَاءِ", "الصَّحْرَاءُ", "الصَّحْرَاءَ"], "الوَاسِعَةِ.", SB.mj, "Bedevî geniş çölde yaşar.", "فِي ile mecrûr; ال’lı olduğu için kesre. (Kitapta الواسع yazılmış; صَحْرَاء müennes olduğundan الوَاسِعَة olmalı.)"]
    ].map(MZ) }
  ]
},
// ---------------------------------------------------------------- 4 · İ’RAB ALÂMETİ VE CÜMLE
{
  id: "u4", no: 4, ar: "عَلَامَاتُ الإِعْرَابِ وَتَكْوِينُ الجُمَلِ", tr: "İ’rab Alâmetleri ve Cümle Kurma", short: "Cümle", col: "ref", legend: ["mz", "nasb", "cerr"],
  goals: ["Üç türün i’rab alâmetlerini karşılaştırmak", "Zâhir ve takdîrî harekeyi ayırmak", "Bu isimleri cümlede doğru kullanmak"],
  examples: [
    { s: "حَكَمَ:- / القَاضِي:nasb / بِالعَدْلِ.:-", tr: "Hâkim adaletle hükmetti." },
    { s: "يُجِيبُ اللهُ:- / دُعَاءَ:cerr / الدَّاعِي:nasb / إِذَا دَعَاهُ.:-", tr: "Allah dua edenin duasına, kendisine dua ettiğinde cevap verir." }
  ],
  rules: [
    { tr: "<b>Maksûr</b>: üç hâlde takdîrî (elif hareke alamaz: <span class=\"ar\">التَّعَذُّرُ</span>). <b>Menkûs</b>: merfû ve mecrûrda takdîrî (yâ üzerinde ağır gelir: <span class=\"ar\">الثِّقَلُ</span>), mansûbda zâhir. <b>Memdûd</b>: üç hâlde zâhir." },
    { tr: "Nekre maksûr tenvin alır ama hareke yine takdîrîdir: <span class=\"ar\">رَأَيْتُ فَتًى</span>. Nekre menkûsta merfû ve mecrûrda yâ düşer: <span class=\"ar\">قَاضٍ</span>; mansûbda <span class=\"ar\">قَاضِيًا</span>." },
    { tr: "Cümle kurarken sıfata dikkat: ال’lı isme ال’lı sıfat (<span class=\"ar\">الوَادِي العَمِيقُ</span>), müennes isme müennes sıfat (<span class=\"ar\">الصَّحْرَاءُ الوَاسِعَةُ</span>)." }
  ],
  kaide: ["يُرْفَعُ المَقْصُورُ وَيُنْصَبُ وَيُجَرُّ بِحَرَكَاتٍ مُقَدَّرَةٍ عَلَى الأَلِفِ. وَيُرْفَعُ المَنْقُوصُ بِضَمَّةٍ مُقَدَّرَةٍ عَلَى اليَاءِ، وَيُنْصَبُ بِفَتْحَةٍ ظَاهِرَةٍ، وَيُجَرُّ بِكَسْرَةٍ مُقَدَّرَةٍ. وَيُرْفَعُ المَمْدُودُ بِالضَّمَّةِ، وَيُنْصَبُ بِالفَتْحَةِ، وَيُجَرُّ بِالكَسْرَةِ."],
  ex: [
    { type: "pick", num: "٩", ar: "ضَعِ الأَسْمَاءَ التَّالِيَةَ فِي جُمَلٍ مِنْ عِنْدِكَ", tr: "Kelimenin doğru kullanıldığı cümleyi seç.", exHtml: "<span class=\"ar\">(الدَّاعِي) يُجِيبُ اللهُ دُعَاءَ الدَّاعِي إِذَا دَعَاهُ.</span>", items: PL([
      ["(القَاضِي)", "حَكَمَ القَاضِي بِالعَدْلِ.", "حَكَمَ القَاضٍ بِالعَدْلِ.", "حَكَمَ القَاضِيُ بِالعَدْلِ.", "Hâkim adaletle hükmetti.", "ال’lı menkûs merfû: yâ kalır, damme takdîrî."],
      ["(مُحَامٍ)", "دَافَعَ مُحَامٍ عَنِ المُتَّهَمِ.", "دَافَعَ مُحَامِي عَنِ المُتَّهَمِ.", "دَافَعَ مُحَامِيٌ عَنِ المُتَّهَمِ.", "Bir avukat sanığı savundu.", "Nekre merfû: yâ düşer."],
      ["(الوَادِي)", "مَشَيْنَا فِي الوَادِي.", "مَشَيْنَا فِي الوَادٍ.", "مَشَيْنَا فِي الوَادِيِ.", "Vadide yürüdük.", "Mecrûr: kesre takdîrî."],
      ["(أُخْرَى)", "قَرَأْتُ قِصَّةً أُخْرَى.", "قَرَأْتُ قِصَّةً أُخْرًى.", "قَرَأْتُ قِصَّةً أُخْرَيًا.", "Başka bir hikâye okudum.", "Elif-i te’nîs: tenvin almaz, fetha takdîrî."],
      ["(البَيْضَاء)", "لَبِسْتُ القُبَّعَةَ البَيْضَاءَ.", "لَبِسْتُ القُبَّعَةَ البَيْضَاءِ.", "لَبِسْتُ القُبَّعَةَ البَيْضَاءُ.", "Beyaz şapkayı giydim.", "Mansûba sıfat: fetha zâhir."],
      ["(الثُّلَاثَاء)", "زُرْتُكَ يَوْمَ الثُّلَاثَاءِ.", "زُرْتُكَ يَوْمَ الثُّلَاثَاءُ.", "زُرْتُكَ يَوْمَ الثُّلَاثَاءَ.", "Seni salı günü ziyaret ettim.", "Muzâfun ileyh, ال’lı: kesre."],
      ["(الرَّاعِي)", "رَأَيْتُ الرَّاعِيَ مَعَ غَنَمِهِ.", "رَأَيْتُ الرَّاعِي مَعَ غَنَمِهِ.", "رَأَيْتُ الرَّاعٍ مَعَ غَنَمِهِ.", "Çobanı koyunlarıyla gördüm.", "Mansûb: fetha zâhir."],
      ["(عَالٍ)", "صَعِدْنَا جَبَلًا عَالِيًا.", "صَعِدْنَا جَبَلًا عَالٍ.", "صَعِدْنَا جَبَلًا العَالِيَ.", "Yüksek bir dağa çıktık.", "Mansûb nekreye sıfat: yâ kalır."]
    ])},
    { type: "classify", extra: true, opts: ALM, ar: "هَلِ الحَرَكَةُ ظَاهِرَةٌ أَمْ مُقَدَّرَةٌ؟", tr: "Koyu kelimenin i’rab harekesi zâhir mi, takdîrî mi?", items: CL([
      [HL("دَخَلَ مُصْطَفَى المَبْنَى", "مُصْطَفَى"), "m", "Maksûr: hep takdîrî."],
      [HL("رَأَيْتُ القَاضِيَ فِي المَحْكَمَةِ", "القَاضِيَ"), "z", "Menkûs mansûb: fetha zâhir."],
      [HL("حَضَرَ القَاضِي إِلَى المَحْكَمَةِ", "القَاضِي"), "m", "Menkûs merfû: takdîrî."],
      [HL("السَّمَاءُ تُمْطِرُ", "السَّمَاءُ"), "z", "Memdûd: zâhir."],
      [HL("سَلَّمْتُ عَلَى القَاضِي", "القَاضِي"), "m", "Menkûs mecrûr: takdîrî."],
      [HL("لَبِسْتُ كِسَاءً جَدِيدًا", "كِسَاءً"), "z", "Memdûd: zâhir."],
      [HL("رَأَيْتُ فَتًى فِي الحَدِيقَةِ", "فَتًى"), "m", "Tenvin olsa da fetha takdîrî."],
      [HL("اشْتَرَكَ قَاضٍ فِي الحَفْلِ", "قَاضٍ"), "m", "Düşen yâ üzerinde damme takdîrî."],
      [HL("رَأَيْتُ قَاضِيًا فِي الحَفْلِ", "قَاضِيًا"), "z", "Mansûb: zâhir."],
      [HL("حَزِنَتِ الأُمُّ عَلَى بُكَاءِ طِفْلِهَا", "بُكَاءِ"), "z", "Memdûd: zâhir."],
      [HL("ذَهَبَتْ كُبْرَى إِلَى السُّوقِ", "كُبْرَى"), "m", "Maksûr."],
      [HL("أُولَئِكَ عَلَى هُدًى", "هُدًى"), "m", "Maksûr."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · OKUMA
{
  id: "u5", no: 5, ar: "قِرَاءَةٌ: القَاضِي شَمْسُ الدِّينِ فَنَارِي وَالسُّلْطَانُ بَايَزِيدُ", tr: "Okuma: Molla Fenârî ve Sultan Bâyezid", short: "Okuma", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Metinde maksûr, menkûs ve memdûd isimleri bulmak", "Bunlara benzeyen ama öyle olmayan kelimeleri (fiil, nisbe) ayırmak", "Molla Fenârî ile Yıldırım Bâyezid kıssasını okuyup anlamak"],
  examples: [
    { s: "لِلْإِدْلَاءِ:cerr / بِشَهَادَةٍ فِي:- / دَعْوَى.:mz", tr: "Bir davada tanıklık etmek için." },
    { s: "وَوَقَفَ أَمَامَ:- / القَاضِي:nasb / فِي تَوَاضُعٍ.:-", tr: "Hâkimin önünde alçakgönüllülükle durdu." }
  ],
  rules: [
    { tr: "Fiiller (<span class=\"ar\">يَسْتَدْعِي، يُؤَدِّي</span>) yâ ile bitse de menkûs değildir; menkûs yalnız isimde olur." },
    { tr: "Şeddeli nisbe yâsı (<span class=\"ar\">شَرْعِيٍّ، اعْتِيَادِيٍّ</span>) menkûs değildir; <span class=\"ar\">هُدُوءٍ</span>’da elif olmadığı için memdûd yoktur." },
    { tr: "<span class=\"ar\">دَعْوَى</span> (elif-i te’nîs maksûre) gayr-i munsariftir; tenvin almaz. <span class=\"ar\">دَعْوَةٌ</span> ise ta ile biter, maksûr değildir." }
  ],
  kaide: ["اسْتَخْرِجْ مِنَ النَّصِّ: الأَسْمَاءَ المَقْصُورَةَ، الأَسْمَاءَ المَنْقُوصَةَ، الأَسْمَاءَ المَمْدُودَةَ."],
  ex: [
    { type: "reading", num: "١٠", ar: "اقْرَأِ النَّصَّ التَّالِيَ ثُمَّ اسْتَخْرِجْ مِنْهُ الأَسْمَاءَ المَقْصُورَةَ وَالمَنْقُوصَةَ وَالمَمْدُودَةَ", tr: "Metni oku, soruları cevapla; sonra koyu kelimeyi sınıflandır.", title: "القَاضِي شَمْسُ الدِّينِ فَنَارِي وَالسُّلْطَانُ بَايَزِيدُ",
      text: "أَرْسَلَ القَاضِي شَمْسُ الدِّينِ فَنَارِي رَسُولًا إِلَى السُّلْطَانِ بَايَزِيدَ، وَكَانَ يَسْتَدْعِيهِ لِلْمُثُولِ أَمَامَهُ فِي المَحْكَمَةِ لِلْإِدْلَاءِ بِشَهَادَةٍ فِي دَعْوَى. وَلَمْ يَتَرَدَّدِ السُّلْطَانُ فِي قَبُولِ دَعْوَةِ القَاضِي. وَفِي يَوْمِ القَضَاءِ حَضَرَ السُّلْطَانُ إِلَى المَحْكَمَةِ، وَوَقَفَ أَمَامَ القَاضِي فِي تَوَاضُعٍ، وَقَدْ عَقَدَ يَدَيْهِ أَمَامَهُ كَأَيِّ شَاهِدٍ اعْتِيَادِيٍّ. رَفَعَ القَاضِي بَصَرَهُ إِلَى السُّلْطَانِ، وَأَخَذَ يَتَطَلَّعُ إِلَيْهِ بِنَظَرَاتٍ مُحْتَدَّةٍ، ثُمَّ قَالَ لَهُ: إِنَّ شَهَادَتَكَ لَا يُمْكِنُ قَبُولُهَا؛ لِأَنَّكَ لَا تُؤَدِّي صَلَوَاتِكَ فِي جَمَاعَةٍ، وَالشَّخْصُ الَّذِي لَا يُؤَدِّي صَلَاتَهُ فِي جَمَاعَةٍ دُونَ عُذْرٍ شَرْعِيٍّ يُمْكِنُ أَنْ يَكْذِبَ فِي شَهَادَتِهِ.<br>نَزَلَتْ كَلِمَاتُ القَاضِي نُزُولَ الصَّاعِقَةِ عَلَى رُؤُوسِ الحَاضِرِينَ فِي المَحْكَمَةِ. كَانَ هَذَا اتِّهَامًا كَبِيرًا، بَلْ إِهَانَةً كَبِيرَةً لِلسُّلْطَانِ بَايَزِيدَ. أَمْسَكَ الحَاضِرُونَ بِأَنْفَاسِهِمْ يَنْتَظِرُونَ أَنْ يَطِيرَ رَأْسُ القَاضِي بِإِشَارَةٍ وَاحِدَةٍ مِنَ السُّلْطَانِ، لَكِنَّ السُّلْطَانَ لَمْ يَقُلْ شَيْئًا، بَلِ اسْتَدَارَ وَخَرَجَ مِنَ المَحْكَمَةِ بِكُلِّ هُدُوءٍ.<br>أَصْدَرَ السُّلْطَانُ فِي اليَوْمِ نَفْسِهِ أَمْرًا بِبِنَاءِ مَسْجِدٍ مُلَاصِقٍ لِقَصْرِهِ، وَعِنْدَمَا تَمَّ بِنَاءُ المَسْجِدِ بَدَأَ السُّلْطَانُ يُؤَدِّي صَلَوَاتِهِ فِي جَمَاعَةٍ.",
      textTr: "Kadı Şemseddin Fenârî, Sultan Bâyezid’e bir elçi gönderdi; bir davada tanıklık etmek üzere onu mahkemede huzuruna çağırıyordu. Sultan kadının davetini kabul etmekte tereddüt etmedi. Duruşma günü mahkemeye geldi ve kadının önünde, sıradan bir tanık gibi ellerini önünde bağlayarak alçakgönüllülükle durdu. Kadı gözlerini sultana kaldırdı, sert bakışlarla süzdü, sonra: “Tanıklığın kabul edilemez; çünkü namazlarını cemaatle kılmıyorsun. Meşru bir özrü olmadan namazını cemaatle kılmayan kimse tanıklığında yalan söyleyebilir” dedi. Kadının sözleri mahkemedekilerin başına yıldırım gibi indi. Bu büyük bir suçlama, hatta Sultan Bâyezid’e büyük bir hakaretti. Orada bulunanlar, sultanın tek bir işaretiyle kadının kellesinin uçmasını bekleyerek nefeslerini tuttular. Ama sultan hiçbir şey söylemedi; döndü ve büyük bir sükûnetle mahkemeden çıktı. Aynı gün sarayına bitişik bir mescit yapılmasını emretti; mescidin yapımı bitince namazlarını cemaatle kılmaya başladı.",
      qa: [
        { q: "لِمَاذَا اسْتَدْعَى القَاضِي السُّلْطَانَ؟", a: "لِلْإِدْلَاءِ بِشَهَادَةٍ فِي دَعْوَى.", tr: "Kadı sultanı niçin çağırdı? Bir davada tanıklık etmesi için." },
        { q: "كَيْفَ وَقَفَ السُّلْطَانُ أَمَامَ القَاضِي؟", a: "وَقَفَ فِي تَوَاضُعٍ، وَقَدْ عَقَدَ يَدَيْهِ أَمَامَهُ كَأَيِّ شَاهِدٍ.", tr: "Sultan kadının önünde nasıl durdu? Sıradan bir tanık gibi ellerini bağlayıp alçakgönüllülükle." },
        { q: "لِمَاذَا رَدَّ القَاضِي شَهَادَةَ السُّلْطَانِ؟", a: "لِأَنَّهُ لَا يُؤَدِّي صَلَوَاتِهِ فِي جَمَاعَةٍ.", tr: "Kadı sultanın tanıklığını niçin reddetti? Namazlarını cemaatle kılmadığı için." },
        { q: "مَاذَا انْتَظَرَ الحَاضِرُونَ؟", a: "أَنْ يَطِيرَ رَأْسُ القَاضِي بِإِشَارَةٍ مِنَ السُّلْطَانِ.", tr: "Orada bulunanlar ne bekledi? Sultanın bir işaretiyle kadının kellesinin uçmasını." },
        { q: "مَاذَا فَعَلَ السُّلْطَانُ بَعْدَ ذَلِكَ؟", a: "أَمَرَ بِبِنَاءِ مَسْجِدٍ مُلَاصِقٍ لِقَصْرِهِ، وَبَدَأَ يُصَلِّي فِي جَمَاعَةٍ.", tr: "Sultan sonra ne yaptı? Sarayına bitişik bir mescit yaptırdı ve cemaatle namaz kılmaya başladı." }
      ],
      cls: { opts: TP, ar: "اسْتَخْرِجْ مِنَ النَّصِّ", tr: "Koyu kelime maksûr mu, menkûs mu, memdûd mu, hiçbiri mi?", items: [
        { s: HL("أَرْسَلَ القَاضِي شَمْسُ الدِّينِ", "القَاضِي"), a: "n", why: "Menkûs: damme takdîrî." },
        { s: HL("لِلْإِدْلَاءِ بِشَهَادَةٍ", "لِلْإِدْلَاءِ"), a: "d", why: "أَدْلَى → إِدْلَاء: zâid elif + hemze." },
        { s: HL("بِشَهَادَةٍ فِي دَعْوَى", "دَعْوَى"), a: "q", why: "Elif-i te’nîs maksûre; gayr-i munsarif." },
        { s: HL("وَفِي يَوْمِ القَضَاءِ", "القَضَاءِ"), a: "d", why: "Memdûd." },
        { s: HL("أَمْرًا بِبِنَاءِ مَسْجِدٍ", "بِبِنَاءِ"), a: "d", why: "Memdûd." },
        { s: HL("أَنْ يَطِيرَ رَأْسُ القَاضِي", "القَاضِي"), a: "n", why: "Menkûs, muzâfun ileyh: kesre takdîrî." },
        { s: HL("وَكَانَ يَسْتَدْعِيهِ", "يَسْتَدْعِيهِ"), a: "x", why: "Fiil." },
        { s: HL("كَأَيِّ شَاهِدٍ اعْتِيَادِيٍّ", "اعْتِيَادِيٍّ"), a: "x", why: "Şeddeli nisbe yâsı." },
        { s: HL("دُونَ عُذْرٍ شَرْعِيٍّ", "شَرْعِيٍّ"), a: "x", why: "Nisbe yâsı." },
        { s: HL("لَا يُؤَدِّي صَلَاتَهُ", "يُؤَدِّي"), a: "x", why: "Fiil." },
        { s: HL("بِكُلِّ هُدُوءٍ", "هُدُوءٍ"), a: "x", why: "Hemzeden önce elif yok." },
        { s: HL("فِي قَبُولِ دَعْوَةِ القَاضِي", "دَعْوَةِ"), a: "x", why: "Ta ile biter: maksûr değil." },
        { s: HL("عَلَى رُؤُوسِ الحَاضِرِينَ", "الحَاضِرِينَ"), a: "x", why: "Cem-i müzekker sâlim." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["رَأَيْتُ {فَتًى} فِي الحَدِيقَةِ.", ["فَتًى", "فَتَيًا", "فَتًا"], "nekre maksûr: tenvin", "Bahçede bir genç gördüm.", "u1"],
  ["أُولَئِكَ عَلَى {هُدًى} مِنْ رَبِّهِمْ.", ["هُدًى", "هُدَيٍ", "هُدَاءٍ"], "nekre maksûr", "Onlar Rablerinden bir hidayet üzeredir.", "u1"],
  ["ذَهَبْتُ إِلَى {المُسْتَشْفَى}.", ["المُسْتَشْفَى", "المُسْتَشْفًى", "المُسْتَشْفِي"], "ال’lı maksûr: tenvinsiz", "Hastaneye gittim.", "u1"],
  ["لَهُمُ {البُشْرَى} فِي الحَيَاةِ الدُّنْيَا.", ["البُشْرَى", "البُشْرًى", "البُشْرَاءُ"], "maksûr", "Dünya hayatında müjde onlaradır.", "u1"],
  ["قَالَ هِيَ {عَصَايَ}.", ["عَصَايَ", "عَصَيِي", "عَصَاتِي"], "عَصًا + ي", "“O benim asamdır” dedi.", "u1"],
  ["دَخَلَ {القَاضِي} إِلَى المَحْكَمَةِ.", ["القَاضِي", "القَاضِيُ", "القَاضٍ"], "damme takdîrî", "Hâkim mahkemeye girdi.", "u2"],
  ["رَأَيْتُ {القَاضِيَ} فِي المَحْكَمَةِ.", ["القَاضِيَ", "القَاضِي", "القَاضِيًا"], "fetha zâhir", "Hâkimi mahkemede gördüm.", "u2"],
  ["سَلَّمْتُ عَلَى {القَاضِي} اليَوْمَ.", ["القَاضِي", "القَاضِيِ", "القَاضٍ"], "kesre takdîrî", "Bugün hâkime selam verdim.", "u2"],
  ["اشْتَرَكَ {قَاضٍ} فِي الحَفْلِ.", ["قَاضٍ", "قَاضِي", "قَاضِيٌ"], "nekre: yâ düşer", "Bir hâkim törene katıldı.", "u2"],
  ["رَأَيْتُ {قَاضِيًا} فِي الحَفْلِ.", ["قَاضِيًا", "قَاضٍ", "قَاضِيَ"], "nekre mansûb: yâ kalır", "Törende bir hâkim gördüm.", "u2"],
  ["وَمَا عِنْدَ اللهِ {بَاقٍ}.", ["بَاقٍ", "بَاقِي", "بَاقِيًا"], "nekre merfû", "Allah katındaki kalıcıdır.", "u2"],
  ["أَسْكَنْتُ مِنْ ذُرِّيَّتِي {بِوَادٍ}.", ["بِوَادٍ", "بِوَادِي", "بِوَادِيٍ"], "nekre mecrûr", "Neslimden birini bir vadiye yerleştirdim.", "u2"],
  ["الطِّفْلُ {بَاكٍ}.", ["بَاكٍ", "بَاكِيًا", "البَاكِيَ"], "haber, nekre", "Çocuk ağlıyor.", "u2"],
  ["{السَّمَاءُ} تُمْطِرُ.", ["السَّمَاءُ", "السَّمَاءَ", "السَّمَاءِ"], "damme zâhir", "Gökyüzü yağmur yağdırıyor.", "u3"],
  ["لَبِسْتُ اليَوْمَ {كِسَاءً} جَدِيدًا.", ["كِسَاءً", "كِسَاءٌ", "كِسَاءٍ"], "fetha zâhir", "Bugün yeni bir elbise giydim.", "u3"],
  ["حَزِنَتِ الأُمُّ عَلَى {بُكَاءِ} طِفْلِهَا.", ["بُكَاءِ", "بُكَاءُ", "بُكَاءَ"], "kesre zâhir", "Anne çocuğunun ağlamasına üzüldü.", "u3"],
  ["اشْتَرَى سَيَّارَةً {بَيْضَاءَ}.", ["بَيْضَاءَ", "بَيْضَاءً", "بَيْضَاءٍ"], "gayr-i munsarif", "Beyaz bir araba aldı.", "u3"],
  ["إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ {العُلَمَاءُ}.", ["العُلَمَاءُ", "العُلَمَاءَ", "العُلَمَاءِ"], "fâil: damme", "Allah’tan ancak âlimler korkar.", "u3"],
  ["جَعَلَ اللهُ فِي العَسَلِ {شِفَاءً}.", ["شِفَاءً", "شِفَاءٌ", "شِفَاءٍ"], "mansûb", "Allah balda şifa kıldı.", "u3"],
  ["زُرْتُكَ يَوْمَ {الثُّلَاثَاءِ}.", ["الثُّلَاثَاءِ", "الثُّلَاثَاءُ", "الثُّلَاثَاءَ"], "muzâfun ileyh", "Seni salı günü ziyaret ettim.", "u4"],
  ["صَعِدْنَا جَبَلًا {عَالِيًا}.", ["عَالِيًا", "عَالٍ", "عَالِي"], "mansûb sıfat", "Yüksek bir dağa çıktık.", "u4"],
  ["قَرَأْتُ قِصَّةً {أُخْرَى}.", ["أُخْرَى", "أُخْرًى", "أُخْرَاءَ"], "elif-i te’nîs", "Başka bir hikâye okudum.", "u4"],
  ["لِلْإِدْلَاءِ بِشَهَادَةٍ فِي {دَعْوَى}.", ["دَعْوَى", "دَعْوًى", "دَعْوَاءَ"], "elif-i te’nîs: tenvinsiz", "Bir davada tanıklık için.", "u5"],
  ["وَوَقَفَ أَمَامَ {القَاضِي} فِي تَوَاضُعٍ.", ["القَاضِي", "القَاضِيِ", "القَاضٍ"], "kesre takdîrî", "Hâkimin önünde alçakgönüllülükle durdu.", "u5"],
  ["وَعِنْدَمَا تَمَّ {بِنَاءُ} المَسْجِدِ.", ["بِنَاءُ", "بِنَاءَ", "بِنَاءِ"], "fâil: damme zâhir", "Mescidin yapımı bitince.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["رَأَيْتُ الفَتَى ← nekre", "رَأَيْتُ فَتًى", "رَأَيْتُ فَتًا", "رَأَيْتُ فَتَيًا", "Maksûr nekre: tenvin, elif yâ biçiminde.", "u1"],
  ["ذَهَبْتُ إِلَى المُسْتَشْفَى ← nekre", "ذَهَبْتُ إِلَى مُسْتَشْفًى", "ذَهَبْتُ إِلَى مُسْتَشْفَى", "ذَهَبْتُ إِلَى مُسْتَشْفِي", "Nekre maksûr tenvin alır.", "u1"],
  ["رَأَيْتُ قَاضِيًا ← ال ile", "رَأَيْتُ القَاضِيَ", "رَأَيْتُ القَاضِي", "رَأَيْتُ القَاضِيًا", "Mansûbda fetha yâ üzerinde zâhir.", "u2"],
  ["اشْتَرَكَ قَاضٍ ← ال ile", "اشْتَرَكَ القَاضِي", "اشْتَرَكَ القَاضٍ", "اشْتَرَكَ القَاضِيُ", "ال gelince yâ döner; damme takdîrî.", "u2"],
  ["تَجَوَّلْنَا فِي وَادٍ ← ال ile", "تَجَوَّلْنَا فِي الوَادِي", "تَجَوَّلْنَا فِي الوَادٍ", "تَجَوَّلْنَا فِي الوَادِيِ", "Mecrûr: kesre takdîrî.", "u2"],
  ["حَضَرَ القَاضِي ← nekre", "حَضَرَ قَاضٍ", "حَضَرَ قَاضِي", "حَضَرَ قَاضِيٌ", "Nekre merfûda yâ düşer.", "u2"],
  ["سَلَّمْتُ عَلَى القَاضِي ← nekre", "سَلَّمْتُ عَلَى قَاضٍ", "سَلَّمْتُ عَلَى قَاضِيٍ", "سَلَّمْتُ عَلَى قَاضِي", "Nekre mecrûrda yâ düşer.", "u2"],
  ["رَأَيْتُ القَاضِيَ ← nekre", "رَأَيْتُ قَاضِيًا", "رَأَيْتُ قَاضٍ", "رَأَيْتُ قَاضِيَ", "Nekre mansûbda yâ kalır.", "u2"],
  ["حَضَرَ مُحَامِي المُتَّهَمِ ← izafeti kaldır", "حَضَرَ مُحَامٍ", "حَضَرَ مُحَامِي", "حَضَرَ مُحَامِيًا", "İzafet kalkınca yâ düşer.", "u2"],
  ["رَأَيْتُ الطِّفْلَ (بَاكٍ) ← sıfat yap", "رَأَيْتُ الطِّفْلَ البَاكِيَ", "رَأَيْتُ الطِّفْلَ البَاكِي", "رَأَيْتُ الطِّفْلَ البَاكٍ", "ال’lı mansûb sıfat: fetha zâhir.", "u2"],
  ["السَّمَاءُ صَافِيَةٌ ← رَأَيْتُ ile", "رَأَيْتُ السَّمَاءَ صَافِيَةً", "رَأَيْتُ السَّمَاءُ صَافِيَةً", "رَأَيْتُ السَّمَاءِ صَافِيَةً", "Memdûdda hareke zâhir.", "u3"],
  ["هَذَا كِسَاءٌ ← لَبِسْتُ ile", "لَبِسْتُ كِسَاءً", "لَبِسْتُ كِسَاءٌ", "لَبِسْتُ كِسَاءٍ", "Mansûb: fetha zâhir.", "u3"],
  ["هَذَا بِنَاءٌ ← انْتَقَلْتُ إِلَى ile", "انْتَقَلْتُ إِلَى بِنَاءٍ", "انْتَقَلْتُ إِلَى بِنَاءً", "انْتَقَلْتُ إِلَى بِنَاءٌ", "Mecrûr: kesre zâhir.", "u3"],
  ["صَحْرَاءُ ← فِي ile (nekre)", "فِي صَحْرَاءَ", "فِي صَحْرَاءٍ", "فِي صَحْرَاءِ", "Gayr-i munsarif: mecrûrda fetha, tenvinsiz.", "u3"]
];
// Tür hız oyunu
var NOUN_LIST = UNITS[0].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = TP;
// Zâhir / takdîrî hız oyunu
var MM_OPTS = ALM;
var MM_LIST = UNITS[3].ex[1].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  nk: { name: "Nekre ↔ ال’lı", pairs: [["قَاضٍ", "القَاضِي"], ["وَادٍ", "الوَادِي"], ["مُحَامٍ", "المُحَامِي"], ["رَاعٍ", "الرَّاعِي"], ["قَاضِيًا", "القَاضِيَ"], ["فَتًى", "الفَتَى"], ["مُسْتَشْفًى", "المُسْتَشْفَى"], ["مَبَانٍ", "المَبَانِي"]] },
  tp: { name: "Kelime ↔ tür", pairs: [["الفَتَى", "maksûr: sonu elif"], ["القَاضِي", "menkûs: kesre + yâ"], ["السَّمَاءُ", "memdûd: elif + hemze"], ["عَرَبِيٌّ", "nisbe yâsı: menkûs değil"], ["ظَبْيٌ", "yâdan önce sükûn: menkûs değil"], ["هُدُوءٌ", "elif yok: memdûd değil"], ["يَرْمِي", "fiil: isim değil"], ["بَيْضَاءُ", "memdûd, gayr-i munsarif"]] },
  tr: { name: "Arapça ↔ Türkçe", pairs: [["القَاضِي", "hâkim"], ["المُحَامِي", "avukat"], ["الوَادِي", "vadi"], ["الرَّاعِي", "çoban"], ["المُسْتَشْفَى", "hastane"], ["الكِسَاءُ", "elbise"], ["الصَّحْرَاءُ", "çöl"], ["الشِّفَاءُ", "şifa"]] }
};
var KARTLAR = [
  ["Maksûr isim nedir?", "Sonu sabit elif olan mu’rab isim: الفَتَى، المُسْتَشْفَى"],
  ["Maksûrun i’rabı?", "Üç hâlde de takdîrî hareke (elif hareke almaz)."],
  ["Menkûs isim nedir?", "Sonu, öncesi kesreli yâ olan mu’rab isim: القَاضِي"],
  ["Menkûsun i’rabı?", "Merfû ve mecrûrda takdîrî, mansûbda fetha zâhir: رَأَيْتُ القَاضِيَ"],
  ["Menkûsta yâ ne zaman düşer?", "ال ve izafet yokken merfû ve mecrûrda: قَاضٍ"],
  ["Nekre mansûb menkûs?", "Yâ kalır: رَأَيْتُ قَاضِيًا"],
  ["Memdûd isim nedir?", "Sonu zâid elif + hemze olan mu’rab isim: السَّمَاءُ"],
  ["Memdûdun i’rabı?", "Üç hâlde zâhir hareke."],
  ["صَحْرَاءُ neden tenvin almaz?", "Elif-i te’nîs memdûde: gayr-i munsarif."],
  ["عَرَبِيٌّ menkûs mu?", "Hayır: yâ şeddeli (nisbe)."],
  ["مَاءٌ memdûd mu?", "Hayır: elif kökten (vâvdan), zâid değil."],
  ["فَتًى’da hareke?", "Tenvin görünür ama i’rab harekesi takdîrîdir."]
];
