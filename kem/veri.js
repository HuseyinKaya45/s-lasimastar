// ================= VERİ: Kem-i İstifhâmiyye ve Kem-i Haberiyye (كَمِ الاسْتِفْهَامِيَّةُ وَالخَبَرِيَّةُ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin.
var ROLES = {
  mz: { ar: "كَمْ", tr: "Kem" }, nasb: { ar: "التَّمْيِيزُ", tr: "Temyiz" }, cerr: { ar: "حَرْفُ الجَرِّ", tr: "Harf-i cer" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var KT = [["i", "İstifhâmiyye (soru)", "كَمِ الاسْتِفْهَامِيَّةُ", "nasb"], ["h", "Haberiyye (çokluk)", "كَمِ الخَبَرِيَّةُ", "cerr"]];
var TZ = [["m", "Müfred mansûb", "مُفْرَدٌ مَنْصُوبٌ", "nasb"], ["j", "Müfred mecrûr, cerli soru", "مُفْرَدٌ مَجْرُورٌ بَعْدَ حَرْفِ جَرٍّ", "mz"], ["e", "Müfred, izafetle", "مُفْرَدٌ مَجْرُورٌ بِالإِضَافَةِ", "cerr"], ["n", "Müfred, min ile", "مُفْرَدٌ مَجْرُورٌ بِمِنْ", "mi"], ["c", "Cem, izafetle", "جَمْعٌ مَجْرُورٌ بِالإِضَافَةِ", "ref"], ["k", "Cem, min ile", "جَمْعٌ مَجْرُورٌ بِمِنْ", "muz"]];
var TUR_TR = { i: "İstifhâmiyye", h: "Haberiyye", m: "Müfred mansûb", j: "Cerli soru", e: "Müfred izafet", n: "Müfred min", c: "Cem izafet", k: "Cem min" };
// Makine: isim × kullanım → [cümle, Türkçe]
var KW = ["كِتَابٌ", "طَالِبٌ", "سَنَةٌ", "لِيرَةٌ", "مَدِينَةٌ", "صَدِيقٌ"];
var KC = ["Soru", "Soru, harf-i cerli", "Haber, izafetle", "Haber, min ile", "Haber, cem"];
var KX = [
  [["كَمْ:mz / كِتَابًا:nasb / قَرَأْتَ هَذَا الشَّهْرَ؟:x", "Bu ay kaç kitap okudun?"], ["بِـ:cerr / كَمْ:mz / كِتَابٍ:nasb / اسْتَعَنْتَ فِي بَحْثِكَ؟:x", "Araştırmanda kaç kitaptan yararlandın?"], ["كَمْ:mz / كِتَابٍ:nasb / قَرَأْتُ فِي شَبَابِي!:x", "Gençliğimde nice kitap okudum!"], ["كَمْ:mz / مِنْ:cerr / كِتَابٍ:nasb / قَرَأْتُ فِي شَبَابِي!:x", "Gençliğimde nice kitap okudum!"], ["كَمْ:mz / مِنْ:cerr / كُتُبٍ:nasb / قَرَأْتُ فِي شَبَابِي!:x", "Gençliğimde nice kitaplar okudum!"]],
  [["كَمْ:mz / طَالِبًا:nasb / فِي فَصْلِكَ؟:x", "Sınıfında kaç öğrenci var?"], ["مَعَ:x / كَمْ:mz / طَالِبٍ:nasb / سَافَرْتَ؟:x", "Kaç öğrenciyle yolculuk yaptın?"], ["كَمْ:mz / طَالِبٍ:nasb / نَجَحَ بِتَفَوُّقٍ!:x", "Nice öğrenci üstün başarıyla geçti!"], ["كَمْ:mz / مِنْ:cerr / طَالِبٍ:nasb / نَجَحَ بِتَفَوُّقٍ!:x", "Nice öğrenci üstün başarıyla geçti!"], ["كَمْ:mz / طُلَّابٍ:nasb / نَجَحُوا بِتَفَوُّقٍ!:x", "Nice öğrenciler üstün başarıyla geçti!"]],
  [["كَمْ:mz / سَنَةً:nasb / عِشْتَ فِي إِسْطَنْبُولَ؟:x", "İstanbul’da kaç yıl yaşadın?"], ["مُنْذُ:x / كَمْ:mz / سَنَةٍ:nasb / تَسْكُنُ هُنَا؟:x", "Kaç yıldır burada oturuyorsun?"], ["كَمْ:mz / سَنَةٍ:nasb / مَضَتْ وَنَحْنُ نَنْتَظِرُ!:x", "Biz beklerken nice yıl geçti!"], ["كَمْ:mz / مِنْ:cerr / سَنَةٍ:nasb / مَضَتْ وَنَحْنُ نَنْتَظِرُ!:x", "Biz beklerken nice yıl geçti!"], ["كَمْ:mz / مِنْ:cerr / سَنَوَاتٍ:nasb / مَضَتْ وَنَحْنُ نَنْتَظِرُ!:x", "Biz beklerken nice yıllar geçti!"]],
  [["كَمْ:mz / لِيرَةً:nasb / فِي جَيْبِكَ؟:x", "Cebinde kaç lira var?"], ["بِـ:cerr / كَمْ:mz / لِيرَةٍ:nasb / اشْتَرَيْتَ هَذَا القَلَمَ؟:x", "Bu kalemi kaç liraya aldın?"], ["كَمْ:mz / لِيرَةٍ:nasb / أَنْفَقْتُ فِي هَذَا السَّفَرِ!:x", "Bu yolculukta ne çok lira harcadım!"], ["كَمْ:mz / مِنْ:cerr / لِيرَةٍ:nasb / أَنْفَقْتُ فِي هَذَا السَّفَرِ!:x", "Bu yolculukta ne çok lira harcadım!"], ["كَمْ:mz / لِيرَاتٍ:nasb / أَنْفَقْتُ فِي هَذَا السَّفَرِ!:x", "Bu yolculukta nice liralar harcadım!"]],
  [["كَمْ:mz / مَدِينَةً:nasb / زُرْتَ؟:x", "Kaç şehir gezdin?"], ["فِي:cerr / كَمْ:mz / مَدِينَةٍ:nasb / عِشْتَ؟:x", "Kaç şehirde yaşadın?"], ["كَمْ:mz / مَدِينَةٍ:nasb / دَمَّرَهَا الزِّلْزَالُ!:x", "Deprem nice şehri yıktı!"], ["كَمْ:mz / مِنْ:cerr / مَدِينَةٍ:nasb / دَمَّرَهَا الزِّلْزَالُ!:x", "Deprem nice şehri yıktı!"], ["كَمْ:mz / مِنْ:cerr / مُدُنٍ:nasb / دَمَّرَهَا الزِّلْزَالُ!:x", "Deprem nice şehirleri yıktı!"]],
  [["كَمْ:mz / صَدِيقًا:nasb / لَكَ فِي هَذِهِ المَدِينَةِ؟:x", "Bu şehirde kaç arkadaşın var?"], ["مَعَ:x / كَمْ:mz / صَدِيقٍ:nasb / تَسْكُنُ؟:x", "Kaç arkadaşla oturuyorsun?"], ["كَمْ:mz / صَدِيقٍ:nasb / لِي فِي هَذِهِ المَدِينَةِ!:x", "Bu şehirde ne çok arkadaşım var!"], ["كَمْ:mz / مِنْ:cerr / صَدِيقٍ:nasb / لِي فِي هَذِهِ المَدِينَةِ!:x", "Bu şehirde ne çok arkadaşım var!"], ["كَمْ:mz / مِنْ:cerr / أَصْدِقَاءَ:nasb / لِي فِي هَذِهِ المَدِينَةِ!:x", "Bu şehirde nice dostlarım var!"]]
];
var KN = [
  "Kem-i istifhâmiyye sayıyı sorar; temyizi müfred ve mansûbdur.",
  "Kem’den önce harf-i cer gelirse temyiz mansûb da, mecrûr da olabilir: بِكَمْ لِيرَةً / لِيرَةٍ.",
  "Kem-i haberiyye çokluk bildirir; temyizi müfred ve izafetle mecrûrdur.",
  "Temyiz مِنْ ile de mecrûr olabilir; anlam değişmez: “nice, ne çok”.",
  "Haberiyyenin temyizi cem de olabilir: izafetle ya da مِنْ ile mecrûr."
];

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
// Temyiz + tür: [cümle, [temyiz ×3], tür anahtarı, Türkçe, açıklama]
var KMS = {
  im: "اسْتِفْهَامِيَّةٌ، وَتَمْيِيزُهَا مُفْرَدٌ مَنْصُوبٌ", ij: "اسْتِفْهَامِيَّةٌ، وَتَمْيِيزُهَا مُفْرَدٌ مَجْرُورٌ بَعْدَ حَرْفِ جَرٍّ", iz: "اسْتِفْهَامِيَّةٌ، وَتَمْيِيزُهَا مَحْذُوفٌ",
  he: "خَبَرِيَّةٌ، وَتَمْيِيزُهَا مُفْرَدٌ مَجْرُورٌ بِالإِضَافَةِ", hn: "خَبَرِيَّةٌ، وَتَمْيِيزُهَا مُفْرَدٌ مَجْرُورٌ بِمِنْ",
  hc: "خَبَرِيَّةٌ، وَتَمْيِيزُهَا جَمْعٌ مَجْرُورٌ بِالإِضَافَةِ", hk: "خَبَرِيَّةٌ، وَتَمْيِيزُهَا جَمْعٌ مَجْرُورٌ بِمِنْ"
};
var TRK = { im: ["im", "he", "ij"], ij: ["ij", "im", "he"], iz: ["iz", "im", "he"], he: ["he", "im", "hn"], hn: ["hn", "he", "hk"], hc: ["hc", "he", "hk"], hk: ["hk", "hn", "hc"] };
function KM(x, i) { return CBP([x[0] + "<br>التَّمْيِيزُ:", x[1], "<br>النَّوْعُ:", TRK[x[2]].map(function (k) { return KMS[k]; })], i, x[3], x[4]); }

var METIN = "دَخَلَ يُوسُفُ سُوقَ الكُتُبِ القَدِيمَةِ فِي إِسْطَنْبُولَ مَعَ صَدِيقِهِ عُمَرَ." +
  "<br><b>يُوسُفُ:</b> كَمْ دُكَّانًا فِي هَذَا السُّوقِ؟" +
  "<br><b>عُمَرُ:</b> فِيهِ نَحْوُ عِشْرِينَ دُكَّانًا، وَكَمْ مِنْ عَالِمٍ مَرَّ مِنْ هُنَا عَبْرَ القُرُونِ!" +
  "<br><b>يُوسُفُ</b> (لِلْبَائِعِ): بِكَمْ لِيرَةٍ هَذَا المُعْجَمُ؟" +
  "<br><b>البَائِعُ:</b> بِثَلَاثِمِائَةِ لِيرَةٍ. كَمْ طَالِبٍ اشْتَرَى مِنِّي هَذَا المُعْجَمَ!" +
  "<br><b>يُوسُفُ:</b> كَمْ سَنَةً تَعْمَلُ فِي هَذَا السُّوقِ؟" +
  "<br><b>البَائِعُ:</b> أَعْمَلُ فِيهِ مُنْذُ أَرْبَعِينَ سَنَةً. كَمْ مِنْ كُتُبٍ نَادِرَةٍ بِعْتُهَا، وَكَمْ صَدِيقٍ وَجَدْتُ بَيْنَ القُرَّاءِ!" +
  "<br><b>عُمَرُ:</b> كَمْ كِتَابًا سَتَشْتَرِي يَا يُوسُفُ؟" +
  "<br><b>يُوسُفُ:</b> كِتَابَيْنِ فَقَطْ؛ فَكَمْ مِنْ كِتَابٍ اشْتَرَيْتُهُ وَلَمْ أَقْرَأْهُ!";

var UNITS = [
// ---------------------------------------------------------------- 1 · İKİ TÜR
{
  id: "u1", no: 1, ar: "نَوْعَا «كَمْ»: الاسْتِفْهَامِيَّةُ وَالخَبَرِيَّةُ", tr: "Kem’in İki Türü", short: "İki tür", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Kem’in iki türünü bilmek: istifhâmiyye (soru) ve haberiyye (çokluk)", "İstifhâmiyyenin sayıyı sorduğunu, haberiyyenin çokluk bildirdiğini anlamak", "Türü temyizin harekesinden ve cümlenin anlamından tanımak"],
  examples: [
    { s: "كَمْ:mz / وَلَدًا:nasb / لَكَ؟:x", tr: "Kaç çocuğun var? (soru) ← لِي خَمْسَةُ أَوْلَادٍ: Beş çocuğum var.", pair: "كَمْ:mz / صَدِيقٍ:nasb / لَكَ فِي هَذِهِ المَدِينَةِ.:x", pairTr: "Bu şehirde ne çok arkadaşın var. (= لَكَ أَصْدِقَاءُ كَثِيرُونَ)" },
    { s: "بِـ:cerr / كَمْ:mz / لِيرَةً (لِيرَةٍ):nasb / اشْتَرَيْتَ هَذَا القَلَمَ؟:x", tr: "Bu kalemi kaç liraya aldın? ← اشْتَرَيْتُهُ بِسِتِّ لِيرَاتٍ: Altı liraya aldım.", pair: "كَمْ:mz / مِنْ:cerr / صَدِيقٍ:nasb / لَكَ فِي هَذِهِ المَدِينَةِ.:x", pairTr: "Bu şehirde ne çok arkadaşın var. (مِنْ ile)" }
  ],
  rules: [
    { tr: "<b>Kem</b> (<span class=\"ar\">كَمْ</span>) iki türdür: <b>istifhâmiyye</b> (<span class=\"ar\">الاسْتِفْهَامِيَّةُ</span>) ve <b>haberiyye</b> (<span class=\"ar\">الخَبَرِيَّةُ</span>)." },
    { tr: "<b>İstifhâmiyye</b> sayıyı sorar; cevap bir sayıdır. Cümle soru cümlesidir: <span class=\"ar\">كَمْ وَلَدًا لَكَ؟ ← لِي خَمْسَةُ أَوْلَادٍ</span>." },
    { tr: "<b>Haberiyye</b> soru sormaz, <b>çokluk</b> bildirir (“nice, ne çok”); çoğu zaman hayret ya da övünme taşır: <span class=\"ar\">كَمْ صَدِيقٍ لَكَ!</span> = <span class=\"ar\">لَكَ أَصْدِقَاءُ كَثِيرُونَ</span>." },
    { tr: "Ayırt etmenin en kısa yolu temyize bakmaktır:", ex: ["مَنْصُوبٌ (ـًا) ← اسْتِفْهَامِيَّةٌ: كَمْ شَقَّةً…", "مَجْرُورٌ (ـٍ) ya da مِنْ ← خَبَرِيَّةٌ: كَمْ سَائِحٍ… · كَمْ مِنْ قَصَائِدَ…", "Dikkat: بِكَمْ · مُنْذُ كَمْ · فِي كَمْ ← soru; temyiz mecrûr da olabilir."] },
    { tr: "Kem her iki türde de cümlenin başında gelir (sadâret hakkı vardır); önüne yalnız harf-i cer ya da muzâf geçebilir: <span class=\"ar\">بِكَمْ · مُنْذُ كَمْ · مِنْ كَمْ</span>." }
  ],
  kaide: ["١ ـ «كَمْ» نَوْعَانِ: اسْتِفْهَامِيَّةٌ وَخَبَرِيَّةٌ.", "٢ ـ كَمِ الاسْتِفْهَامِيَّةُ يُسْتَفْهَمُ بِهَا عَنِ العَدَدِ، مِثْلُ: كَمْ وَلَدًا لَكَ؟", "٣ ـ كَمِ الخَبَرِيَّةُ تُفِيدُ الكَثْرَةَ، مِثْلُ: كَمْ صَدِيقٍ لَكَ فِي هَذِهِ المَدِينَةِ. يَعْنِي: لَكَ أَصْدِقَاءُ كَثِيرُونَ فِي هَذِهِ المَدِينَةِ."],
  ex: [
    { type: "classify", num: "١", opts: KT, ar: "بَيِّنْ نَوْعَ «كَمْ» فِيمَا يَأْتِي (اسْتِفْهَامِيَّةٌ أَمْ خَبَرِيَّةٌ)", tr: "Kem istifhâmiyye mi, haberiyye mi? (Kitaptaki gibi cümle sonu işareti yok: temyizin harekesine bak.)", exHtml: "<span class=\"ar\">كَمْ كِتَابًا اشْتَرَيْتَ هَذَا الشَّهْرَ ← اسْتِفْهَامِيَّةٌ · كَمْ عُمَّالٍ شَارَكُوا فِي بِنَاءِ هَذَا الجِسْرِ ← خَبَرِيَّةٌ</span>", items: CL([
      [HL("كَمْ شَقَّةً فِي هَذِهِ العِمَارَةِ", "كَمْ"), "i", "Temyiz شَقَّةً mansûb: daire sayısı soruluyor."],
      [HL("كَمْ مِنْ سَنَوَاتٍ قَضَيْتُ فِي هَذِهِ المِنْطَقَةِ", "كَمْ"), "h", "مِنْ + cem: “bu bölgede nice yıllar geçirdim”."],
      [HL("بِكَمْ لِيرَةٍ اشْتَرَيْتَ هَذَا المَنْزِلَ", "كَمْ"), "i", "Fiyat soruluyor; harf-i cer olduğu için temyiz mecrûr olabilir."],
      [HL("كَمْ سَائِحٍ زَارَ بِلَادَنَا هَذَا العَامَ", "كَمْ"), "h", "Temyiz izafetle mecrûr: nice turist."],
      [HL("كَمْ شَخْصًا فِي أُسْرَتِكَ", "كَمْ"), "i", "Temyiz mansûb."],
      [HL("كَمْ مِنْ قَصَائِدَ حَفِظْتُ مِنَ الأَدَبِ العَرَبِيِّ", "كَمْ"), "h", "مِنْ + cem (قَصَائِدَ gayr-i munsarif: fetha ile mecrûr)."],
      [HL("مُنْذُ كَمْ سَاعَةً تَنْتَظِرُنِي هُنَا", "كَمْ"), "i", "Süre soruluyor; temyiz mansûb."],
      [HL("كَمْ حَادِثٍ يَحْدُثُ فِي المُرُورِ فَصْلَ الشِّتَاءِ", "كَمْ"), "h", "Temyiz mecrûr: kışın nice kaza olur."]
    ]) },
    { type: "classify", num: "٥", opts: KT, ar: "امْلَإِ الفَرَاغَ بِوَضْعِ «كَمْ» وَبَيِّنْ نَوْعَهَا", tr: "Boşluğa كَمْ kondu. Türü ne?", exHtml: "<span class=\"ar\">كَمْ عَامِلًا يَعْمَلُ فِي المَصْنَعِ؟ ← اسْتِفْهَامِيَّةٌ · كَمْ مِنْ شُعَرَاءَ نَظَمُوا فِي الهِجَاءِ ← خَبَرِيَّةٌ</span>", items: CL([
      [HL("كَمْ سَاعَةً تَقْضِي أَمَامَ التِّلْفَازِ كُلَّ يَوْمٍ؟", "كَمْ"), "i", "Temyiz mansûb, soru."],
      [HL("كَمْ مِنْ بِلَادٍ دَمَّرَ الزِّلْزَالُ عَبْرَ التَّارِيخِ!", "كَمْ"), "h", "مِنْ + cem."],
      [HL("كَمْ وَزِيرًا اشْتَرَكَ فِي هَذَا الاجْتِمَاعِ؟", "كَمْ"), "i", "Temyiz mansûb."],
      [HL("كَمْ مِنَ الأَحَادِيثِ رَوَتْهَا عَائِشَةُ (رَضِيَ اللهُ عَنْهَا)!", "كَمْ"), "h", "مِنْ ile: çokluk."],
      [HL("كَمْ مَلَايِينَ أُنْفِقَتْ لِتَنْفِيذِ الخُطَّةِ!", "كَمْ"), "h", "Cem, izafetle mecrûr (مَلَايِينَ gayr-i munsarif)."],
      [HL("كَمْ مِنْ قِيَمٍ إِنْسَانِيَّةٍ قَامَ بِهَا هَذَا الرَّجُلُ الفَاضِلُ!", "كَمْ"), "h", "مِنْ + cem."],
      [HL("كَمْ حَاجًّا طَافَ بِالكَعْبَةِ هَذَا المَوْسِمَ؟", "كَمْ"), "i", "Temyiz mansûb."],
      [HL("مِنْ كَمْ شَخْصٍ تَتَكَوَّنُ أُسْرَتُكَ؟", "كَمْ"), "i", "Önünde harf-i cer var; temyiz mecrûr olmuş ama soru."]
    ]) },
    { type: "classify", extra: true, opts: KT, ar: "اسْتِفْهَامِيَّةٌ أَمْ خَبَرِيَّةٌ؟", tr: "Kem’in türünü seç.", items: CL([
      [HL("كَمْ وَلَدًا لَكَ؟", "كَمْ"), "i", "Sayı soruluyor."],
      [HL("كَمْ كِتَابًا اشْتَرَيْتَ هَذَا الشَّهْرَ؟", "كَمْ"), "i", "Temyiz mansûb."],
      [HL("بِكَمْ لِيرَةً اشْتَرَيْتَ هَذَا القَلَمَ؟", "كَمْ"), "i", "Fiyat soruluyor."],
      [HL("كَمْ لَيْلَةً حَكَتْ شَهْرَزَادُ لِشَهْرَيَارَ؟", "كَمْ"), "i", "Temyiz mansûb."],
      [HL("كَمْ غُرْفَةً لِهَذِهِ الشَّقَّةِ؟", "كَمْ"), "i", "Temyiz mansûb."],
      [HL("كَمْ سَنَةً مَكَثَ نُوحٌ بَيْنَ قَوْمِهِ؟", "كَمْ"), "i", "Süre soruluyor."],
      [HL("كَمْ لِيرَةً فِي جَيْبِكَ؟", "كَمْ"), "i", "Temyiz mansûb."],
      [HL("فِي كَمْ سَنَةٍ تَمَّ بِنَاءُ مَسْجِدِ السُّلَيْمَانِيَّةِ؟", "كَمْ"), "i", "Harf-i cerli soru."],
      [HL("كَمْ صَدِيقٍ لَكَ فِي هَذِهِ المَدِينَةِ!", "كَمْ"), "h", "Çokluk: izafetle mecrûr."],
      [HL("كَمْ مِنْ دُوَلٍ فَقِيرَةٍ فِي العَالَمِ!", "كَمْ"), "h", "مِنْ + cem."],
      [HL("كَمْ عُمَّالٍ شَارَكُوا فِي بِنَاءِ هَذَا الجِسْرِ!", "كَمْ"), "h", "Cem, izafetle."],
      [HL("كَمْ مِنْ ثَوْبٍ خَاطَ الخَيَّاطُ!", "كَمْ"), "h", "مِنْ + müfred."],
      [HL("كَمْ كُتُبٍ قَرَأْتُهَا حَتَّى الآنَ!", "كَمْ"), "h", "Cem, izafetle."],
      [HL("كَمْ مِنْ غَنِيٍّ مَاتَ غَرِيبًا!", "كَمْ"), "h", "مِنْ + müfred."],
      [HL("كَمْ كَاتِبٍ أَلَّفَ فِي هَذَا المَوْضُوعِ!", "كَمْ"), "h", "Müfred, izafetle."],
      [HL("كَمْ مِنْ دُوَلٍ زُرْتُ خِلَالَ عَشْرِ سَنَوَاتٍ!", "كَمْ"), "h", "مِنْ + cem."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 2 · İSTİFHÂMİYYE
{
  id: "u2", no: 2, ar: "كَمِ الاسْتِفْهَامِيَّةُ", tr: "Kem-i İstifhâmiyye", short: "Soru", col: "nasb", legend: ["mz", "nasb", "cerr"],
  goals: ["Kem-i istifhâmiyye ile sayı sormak", "Temyizin her zaman müfred ve mansûb olduğunu uygulamak", "Kem’den önce harf-i cer gelince temyizin mansûb ya da mecrûr olabileceğini bilmek"],
  examples: [
    { s: "كَمْ:mz / فَرْدًا:nasb / فِي فَرِيقِ كُرَةِ القَدَمِ؟:x", tr: "Futbol takımında kaç kişi var?", pair: "كَمْ:mz / يَوْمًا:nasb / فِي الأُسْبُوعِ؟:x", pairTr: "Haftada kaç gün var?" },
    { s: "بِـ:cerr / كَمْ:mz / لِيرَةً:nasb / اشْتَرَيْتَ هَذَا القَلَمَ؟:x", tr: "Bu kalemi kaç liraya aldın? (mansûb)", pair: "بِـ:cerr / كَمْ:mz / لِيرَةٍ:nasb / اشْتَرَيْتَ هَذَا القَلَمَ؟:x", pairTr: "Aynı anlam. (mecrûr)" }
  ],
  rules: [
    { tr: "Kem-i istifhâmiyyenin temyizi <b>daima müfred ve mansûbdur</b>: <span class=\"ar\">كَمْ وَلَدًا · كَمْ سَاعَةً · كَمْ كِتَابًا</span>. Çoğul gelmez: <span class=\"ar\">كَمْ أَوْلَادًا</span> yanlıştır." },
    { tr: "Kem’den önce <b>harf-i cer</b> gelirse temyiz mansûb da, mecrûr da olabilir:", ex: ["بِكَمْ لِيرَةً؟ · بِكَمْ لِيرَةٍ؟", "مُنْذُ كَمْ سَاعَةً؟ · فِي كَمْ سَنَةٍ؟ · مِنْ كَمْ شَخْصٍ؟"] },
    { tr: "Mecrûr olduğunda temyiz, gizli bir <span class=\"ar\">مِنْ</span> ile mecrûr sayılır: <span class=\"ar\">بِكَمْ لِيرَةٍ</span> = <span class=\"ar\">بِكَمْ مِنْ لِيرَةٍ</span>." },
    { tr: "Soru kurmak için “sayısı” ifadesinin yerine kem koy ve ismi müfred mansûb yap: <span class=\"ar\">عَدَدُ أَيَّامِ الأُسْبُوعِ ← كَمْ يَوْمًا فِي الأُسْبُوعِ؟ · ثَمَنُ السَّيَّارَةِ ← بِكَمْ لِيرَةً اشْتَرَى السَّيَّارَةَ؟</span>" }
  ],
  kaide: ["٢ ـ كَمِ الاسْتِفْهَامِيَّةُ يُسْتَفْهَمُ بِهَا عَنِ العَدَدِ، وَيَكُونُ تَمْيِيزُهَا مُفْرَدًا دَائِمًا وَمَنْصُوبًا، مِثْلُ: كَمْ وَلَدًا لَكَ؟ لَكِنْ إِذَا دَخَلَ عَلَى «كَمْ» الاسْتِفْهَامِيَّةِ حَرْفُ جَرٍّ يَجُوزُ أَنْ يَكُونَ تَمْيِيزُهَا مَنْصُوبًا أَوْ مَجْرُورًا، مِثْلُ: بِكَمْ لِيرَةً (أَوْ بِكَمْ لِيرَةٍ) اشْتَرَيْتَ هَذَا القَلَمَ؟"],
  ex: [
    { type: "pick", num: "٦", ar: "اسْأَلْ عَمَّا يَأْتِي مُسْتَعْمِلًا «كَمْ»", tr: "Verilen bilgiyi soran doğru soruyu seç.", exHtml: "<span class=\"ar\">عَدَدُ أَفْرَادِ فَرِيقِ كُرَةِ القَدَمِ ← كَمْ فَرْدًا فِي فَرِيقِ كُرَةِ القَدَمِ؟</span>", items: PL([
      ["عَدَدُ أَيَّامِ الأُسْبُوعِ", "كَمْ يَوْمًا فِي الأُسْبُوعِ؟", "كَمْ يَوْمٍ فِي الأُسْبُوعِ؟", "كَمْ أَيَّامًا فِي الأُسْبُوعِ؟", "Haftada kaç gün var?", "Temyiz müfred mansûb."],
      ["عَدَدُ الجَامِعَاتِ فِي إِسْطَنْبُولَ", "كَمْ جَامِعَةً فِي إِسْطَنْبُولَ؟", "كَمْ جَامِعَاتٍ فِي إِسْطَنْبُولَ؟", "كَمْ جَامِعَةٌ فِي إِسْطَنْبُولَ؟", "İstanbul’da kaç üniversite var?", "Çoğul değil, müfred mansûb."],
      ["عَدَدُ الطُّلَّابِ الأَجَانِبِ فِي الكُلِّيَّةِ", "كَمْ طَالِبًا أَجْنَبِيًّا فِي الكُلِّيَّةِ؟", "كَمْ طُلَّابًا أَجَانِبَ فِي الكُلِّيَّةِ؟", "كَمْ طَالِبٍ أَجْنَبِيٍّ فِي الكُلِّيَّةِ؟", "Fakültede kaç yabancı öğrenci var?", "Sıfat da temyize uyar: طَالِبًا أَجْنَبِيًّا."],
      ["ثَمَنُ السَّيَّارَةِ الَّتِي اشْتَرَاهَا جَمِيلٌ", "بِكَمْ لِيرَةً اشْتَرَى جَمِيلٌ السَّيَّارَةَ؟", "بِكَمْ لِيرَاتٍ اشْتَرَى جَمِيلٌ السَّيَّارَةَ؟", "كَمْ لِيرَةٍ اشْتَرَى جَمِيلٌ السَّيَّارَةَ!", "Cemil arabayı kaç liraya aldı?", "Fiyat بِكَمْ ile sorulur; لِيرَةٍ da olur."],
      ["عَدَدُ السُّوَرِ فِي القُرْآنِ", "كَمْ سُورَةً فِي القُرْآنِ؟", "كَمْ سُوَرًا فِي القُرْآنِ؟", "كَمْ سُورَةٍ فِي القُرْآنِ؟", "Kur’an’da kaç sure var?", "Müfred mansûb."],
      ["عَدَدُ السَّاعَاتِ الَّتِي تَقْضِيهَا زَيْنَبُ فِي النَّوْمِ", "كَمْ سَاعَةً تَقْضِي زَيْنَبُ فِي النَّوْمِ؟", "كَمْ سَاعَاتٍ تَقْضِي زَيْنَبُ فِي النَّوْمِ؟", "كَمْ سَاعَةٌ تَقْضِي زَيْنَبُ فِي النَّوْمِ؟", "Zeyneb uykuda kaç saat geçiriyor?", "Müfred mansûb."],
      ["عَدَدُ الطَّائِرَاتِ الَّتِي تُقْلِعُ كُلَّ يَوْمٍ", "كَمْ طَائِرَةً تُقْلِعُ كُلَّ يَوْمٍ؟", "كَمْ طَائِرَاتٍ تُقْلِعُ كُلَّ يَوْمٍ؟", "كَمْ طَائِرَةٍ تُقْلِعُ كُلَّ يَوْمٍ!", "Her gün kaç uçak kalkıyor?", "Müfred mansûb."],
      ["عَدَدُ الكَلِمَاتِ الَّتِي يَقْرَؤُهَا جُنَيْدٌ فِي الدَّقِيقَةِ", "كَمْ كَلِمَةً يَقْرَأُ جُنَيْدٌ فِي الدَّقِيقَةِ؟", "كَمْ كَلِمَاتٍ يَقْرَأُ جُنَيْدٌ فِي الدَّقِيقَةِ؟", "كَمْ كَلِمَةٌ يَقْرَأُ جُنَيْدٌ فِي الدَّقِيقَةِ؟", "Cüneyd dakikada kaç kelime okuyor?", "Müfred mansûb."]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اكْتُبِ التَّمْيِيزَ المُنَاسِبَ", tr: "Parantezdeki ismi kem-i istifhâmiyyenin temyizi olarak doğru biçimde seç.", items: PL([
      ["كَمْ ___ فِي الأُسْبُوعِ؟ (يَوْم)", "يَوْمًا", "يَوْمٍ", "أَيَّامًا", "Haftada kaç gün var?", "Müfred mansûb."],
      ["كَمْ ___ فِي فَرِيقِ كُرَةِ القَدَمِ؟ (لَاعِب)", "لَاعِبًا", "لَاعِبِينَ", "لَاعِبٍ", "Futbol takımında kaç oyuncu var?", "Müfred mansûb."],
      ["بِكَمْ ___ اشْتَرَيْتَ هَذَا الكِتَابَ؟ (لِيرَة)", "لِيرَةٍ", "لِيرَاتٍ", "لِيرَةٌ", "Bu kitabı kaç liraya aldın?", "Harf-i cerden sonra mecrûr olabilir (لِيرَةً da doğru)."],
      ["كَمْ ___ زُرْتَ هَذِهِ السَّنَةَ؟ (مُتْحَف)", "مُتْحَفًا", "مَتَاحِفَ", "مُتْحَفٍ", "Bu yıl kaç müze gezdin?", "Müfred mansûb."],
      ["مُنْذُ كَمْ ___ تَدْرُسُ العَرَبِيَّةَ؟ (شَهْر)", "شَهْرٍ", "شُهُورًا", "شَهْرٌ", "Kaç aydır Arapça okuyorsun?", "مُنْذُ’dan sonra mecrûr olabilir (شَهْرًا da doğru)."],
      ["كَمْ ___ فِي القُرْآنِ الكَرِيمِ؟ (جُزْء)", "جُزْءًا", "أَجْزَاءً", "جُزْءٍ", "Kur’an’da kaç cüz var?", "Müfred mansûb."],
      ["كَمْ ___ تَقْرَأُ كُلَّ يَوْمٍ؟ (صَفْحَة)", "صَفْحَةً", "صَفَحَاتٍ", "صَفْحَةٍ", "Her gün kaç sayfa okuyorsun?", "Müfred mansûb."],
      ["إِلَى كَمْ ___ سَافَرْتَ؟ (بَلَد)", "بَلَدٍ", "بِلَادًا", "بَلَدٌ", "Kaç ülkeye gittin?", "إِلَى’dan sonra mecrûr olabilir (بَلَدًا da doğru)."]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · HABERİYYE
{
  id: "u3", no: 3, ar: "كَمِ الخَبَرِيَّةُ", tr: "Kem-i Haberiyye", short: "Çokluk", col: "cerr", legend: ["mz", "nasb", "cerr"],
  goals: ["Kem-i haberiyyenin çokluk bildirdiğini bilmek", "Temyizin dört biçimini tanımak: müfred / cem, izafetle / مِنْ ile mecrûr", "Bir çokluk ifadesini kem-i haberiyye ile söylemek"],
  examples: [
    { s: "كَمْ:mz / صَدِيقٍ:nasb / لَكَ فِي هَذِهِ المَدِينَةِ.:x", tr: "Bu şehirde ne çok arkadaşın var. (müfred, izafetle)", pair: "كَمْ:mz / مِنْ:cerr / صَدِيقٍ:nasb / لَكَ فِي هَذِهِ المَدِينَةِ.:x", pairTr: "Aynı anlam. (müfred, مِنْ ile)" },
    { s: "كَمْ:mz / دُوَلٍ:nasb / فَقِيرَةٍ فِي العَالَمِ.:x", tr: "Dünyada nice fakir ülke var. (cem, izafetle)", pair: "كَمْ:mz / مِنْ:cerr / دُوَلٍ:nasb / فَقِيرَةٍ فِي العَالَمِ.:x", pairTr: "Aynı anlam. (cem, مِنْ ile)" }
  ],
  rules: [
    { tr: "<b>Kem-i haberiyye</b> çokluk bildirir: <span class=\"ar\">كَمْ صَدِيقٍ لَكَ</span> = <span class=\"ar\">لَكَ أَصْدِقَاءُ كَثِيرُونَ</span>. Cümle soru değil, haber cümlesidir; çoğu zaman ünlem taşır." },
    { tr: "Temyizi <b>her zaman mecrûrdur</b>; dört biçimde gelir:", ex: ["أ ـ مُفْرَدٌ مَجْرُورٌ بِالإِضَافَةِ: كَمْ صَدِيقٍ", "ب ـ مُفْرَدٌ مَجْرُورٌ بِمِنْ: كَمْ مِنْ صَدِيقٍ", "جـ ـ جَمْعٌ مَجْرُورٌ بِالإِضَافَةِ: كَمْ دُوَلٍ فَقِيرَةٍ", "د ـ جَمْعٌ مَجْرُورٌ بِمِنْ: كَمْ مِنْ دُوَلٍ فَقِيرَةٍ"] },
    { tr: "Çokluk ifadesini kem-i haberiyyeye çevirirken çoğulu genellikle müfred yap, fiili de ona uydur: <span class=\"ar\">السُّيَّاحُ الَّذِينَ زَارُوا بِلَادَنَا ← كَمْ مِنْ سَائِحٍ زَارَ بِلَادَنَا!</span>" },
    { tr: "Temyiz gayr-i munsarif bir çoğulsa fetha ile mecrûr olur: <span class=\"ar\">كَمْ مِنْ قَصَائِدَ · كَمْ مَلَايِينَ · كَمْ مِنْ مَصَانِعَ</span>." }
  ],
  kaide: ["٣ ـ كَمِ الخَبَرِيَّةُ تُفِيدُ الكَثْرَةَ، مِثْلُ: كَمْ صَدِيقٍ لَكَ فِي هَذِهِ المَدِينَةِ. يَعْنِي: لَكَ أَصْدِقَاءُ كَثِيرُونَ فِي هَذِهِ المَدِينَةِ.", "٤ ـ يَكُونُ تَمْيِيزُ «كَمْ» الخَبَرِيَّةِ: أ ـ مُفْرَدًا مَجْرُورًا بِالإِضَافَةِ، مِثْلُ: كَمْ صَدِيقٍ لَكَ فِي هَذِهِ المَدِينَةِ. ب ـ مُفْرَدًا مَجْرُورًا بِـ«مِنْ»، مِثْلُ: كَمْ مِنْ صَدِيقٍ لَكَ فِي هَذِهِ المَدِينَةِ. جـ ـ جَمْعًا مَجْرُورًا بِالإِضَافَةِ، مِثْلُ: كَمْ دُوَلٍ فَقِيرَةٍ فِي العَالَمِ. د ـ جَمْعًا مَجْرُورًا بِـ«مِنْ»، مِثْلُ: كَمْ مِنْ دُوَلٍ فَقِيرَةٍ فِي العَالَمِ."],
  ex: [
    { type: "pick", num: "٧", ar: "اسْتَعْمِلْ «كَمْ» الخَبَرِيَّةَ لِلدَّلَالَةِ عَلَى الكَثْرَةِ فِي الجُمَلِ التَّالِيَةِ", tr: "Çokluğu kem-i haberiyye ile anlatan doğru cümleyi seç.", exHtml: "<span class=\"ar\">السُّيَّاحُ الَّذِينَ زَارُوا بِلَادَنَا هَذَا العَامَ ← كَمْ مِنْ سَائِحٍ زَارَ بِلَادَنَا هَذَا العَامَ!</span>", items: PL([
      ["الكُتُبُ الَّتِي تُهْدَى إِلَى مَكْتَبَةِ الكُلِّيَّةِ سَنَوِيًّا", "كَمْ مِنْ كِتَابٍ يُهْدَى إِلَى مَكْتَبَةِ الكُلِّيَّةِ سَنَوِيًّا!", "كَمْ كِتَابًا يُهْدَى إِلَى مَكْتَبَةِ الكُلِّيَّةِ سَنَوِيًّا؟", "كَمْ مِنْ كِتَابًا يُهْدَى إِلَى مَكْتَبَةِ الكُلِّيَّةِ سَنَوِيًّا!", "Fakülte kütüphanesine her yıl nice kitap hediye edilir!", "مِنْ + müfred mecrûr."],
      ["المُسْلِمُونَ الَّذِينَ اسْتُشْهِدُوا فِي سَبِيلِ نَشْرِ الدِّينِ", "كَمْ مِنْ مُسْلِمٍ اسْتُشْهِدَ فِي سَبِيلِ نَشْرِ الدِّينِ!", "كَمْ مُسْلِمًا اسْتُشْهِدَ فِي سَبِيلِ نَشْرِ الدِّينِ؟", "كَمْ مِنْ مُسْلِمُونَ اسْتُشْهِدُوا فِي سَبِيلِ نَشْرِ الدِّينِ!", "Dini yaymak yolunda nice Müslüman şehit oldu!", "Fiil müfred temyize uyar: اسْتُشْهِدَ."],
      ["المَرَاجِعُ الَّتِي قَرَأَهَا أَحْمَدُ لِإِعْدَادِ رِسَالَتِهِ", "كَمْ مَرْجِعٍ قَرَأَ أَحْمَدُ لِإِعْدَادِ رِسَالَتِهِ!", "كَمْ مَرْجِعًا قَرَأَ أَحْمَدُ لِإِعْدَادِ رِسَالَتِهِ؟", "كَمْ مَرْجِعٌ قَرَأَ أَحْمَدُ لِإِعْدَادِ رِسَالَتِهِ!", "Ahmed tezini hazırlamak için nice kaynak okudu!", "Müfred, izafetle mecrûr."],
      ["اللَّيَالِي الَّتِي قَضَاهَا المَرِيضُ سَهْرَانَ وَمُتَأَلِّمًا", "كَمْ لَيْلَةٍ قَضَاهَا المَرِيضُ سَهْرَانَ وَمُتَأَلِّمًا!", "كَمْ لَيْلَةً قَضَاهَا المَرِيضُ سَهْرَانَ وَمُتَأَلِّمًا؟", "كَمْ لَيْلَةٌ قَضَاهَا المَرِيضُ سَهْرَانَ وَمُتَأَلِّمًا!", "Hasta nice geceyi uykusuz ve acı içinde geçirdi!", "Müfred, izafetle mecrûr."],
      ["العُلَمَاءُ الَّذِينَ نَبَغُوا فِي التَّارِيخِ الإِسْلَامِيِّ", "كَمْ مِنْ عَالِمٍ نَبَغَ فِي التَّارِيخِ الإِسْلَامِيِّ!", "كَمْ عَالِمًا نَبَغَ فِي التَّارِيخِ الإِسْلَامِيِّ؟", "كَمْ مِنْ عَالِمٌ نَبَغَ فِي التَّارِيخِ الإِسْلَامِيِّ!", "İslam tarihinde nice âlim parladı!", "مِنْ + müfred mecrûr."],
      ["الأَوْقَافُ الخَيْرِيَّةُ الَّتِي أُنْشِئَتْ فِي العَهْدِ العُثْمَانِيِّ", "كَمْ مِنْ وَقْفٍ خَيْرِيٍّ أُنْشِئَ فِي العَهْدِ العُثْمَانِيِّ!", "كَمْ وَقْفًا خَيْرِيًّا أُنْشِئَ فِي العَهْدِ العُثْمَانِيِّ؟", "كَمْ مِنْ وَقْفًا خَيْرِيًّا أُنْشِئَ فِي العَهْدِ العُثْمَانِيِّ!", "Osmanlı döneminde nice hayır vakfı kuruldu!", "مِنْ’den sonra mecrûr; sıfat da uyar."],
      ["الأُسَرُ الَّتِي تَعِيشُ فِي فَقْرٍ فِي بِلَادِنَا", "كَمْ أُسْرَةٍ تَعِيشُ فِي فَقْرٍ فِي بِلَادِنَا!", "كَمْ أُسْرَةً تَعِيشُ فِي فَقْرٍ فِي بِلَادِنَا؟", "كَمْ أُسْرَةٌ تَعِيشُ فِي فَقْرٍ فِي بِلَادِنَا!", "Ülkemizde nice aile yoksulluk içinde yaşıyor!", "Müfred, izafetle mecrûr."],
      ["المَعَارِكُ الَّتِي انْتَصَرَ فِيهَا خَالِدُ بْنُ الوَلِيدِ", "كَمْ مِنْ مَعْرَكَةٍ انْتَصَرَ فِيهَا خَالِدُ بْنُ الوَلِيدِ!", "كَمْ مَعْرَكَةً انْتَصَرَ فِيهَا خَالِدُ بْنُ الوَلِيدِ؟", "كَمْ مِنْ مَعْرَكَةً انْتَصَرَ فِيهَا خَالِدُ بْنُ الوَلِيدِ!", "Hâlid b. Velîd nice savaşta galip geldi!", "مِنْ + müfred mecrûr."]
    ])},
    { type: "pick", extra: true, ar: "مَا الأُسْلُوبُ المُسَاوِي فِي المَعْنَى؟", tr: "Aynı anlamı veren doğru cümleyi seç.", items: PL([
      ["كَمْ صَدِيقٍ لِي فِي هَذِهِ المَدِينَةِ!", "كَمْ مِنْ صَدِيقٍ لِي فِي هَذِهِ المَدِينَةِ!", "كَمْ صَدِيقًا لِي فِي هَذِهِ المَدِينَةِ؟", "كَمْ مِنْ صَدِيقًا لِي فِي هَذِهِ المَدِينَةِ!", "Bu şehirde ne çok arkadaşım var!", "İzafet ↔ مِنْ: anlam aynı."],
      ["كَمْ مِنْ كِتَابٍ قَرَأْتُ!", "كَمْ كِتَابٍ قَرَأْتُ!", "كَمْ كِتَابًا قَرَأْتَ؟", "كَمْ كِتَابٌ قَرَأْتُ!", "Nice kitap okudum!", "مِنْ ↔ izafet."],
      ["كَمْ دُوَلٍ فَقِيرَةٍ فِي العَالَمِ!", "كَمْ مِنْ دُوَلٍ فَقِيرَةٍ فِي العَالَمِ!", "كَمْ دُوَلًا فَقِيرَةً فِي العَالَمِ؟", "كَمْ مِنْ دُوَلٌ فَقِيرَةٌ فِي العَالَمِ!", "Dünyada nice fakir ülke var!", "Cem, izafet ↔ مِنْ."],
      ["كَمْ مِنْ سَنَوَاتٍ قَضَيْتُ هُنَا!", "كَمْ سَنَوَاتٍ قَضَيْتُ هُنَا!", "كَمْ سَنَوَاتًا قَضَيْتُ هُنَا؟", "كَمْ مِنْ سَنَوَاتٌ قَضَيْتُ هُنَا!", "Burada nice yıllar geçirdim!", "Cem, مِنْ ↔ izafet."],
      ["لِي أَصْدِقَاءُ كَثِيرُونَ.", "كَمْ صَدِيقٍ لِي!", "كَمْ صَدِيقًا لَكَ؟", "كَمْ أَصْدِقَاءُ لِي!", "Çok arkadaşım var.", "Çokluk: kem-i haberiyye."],
      ["قَرَأْتُ كُتُبًا كَثِيرَةً.", "كَمْ مِنْ كِتَابٍ قَرَأْتُ!", "كَمْ كِتَابًا قَرَأْتَ؟", "كَمْ كُتُبًا قَرَأْتُ!", "Çok kitap okudum.", "Haberiyyenin temyizi mansûb olmaz."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · TEMYİZ VE İ’RABI
{
  id: "u4", no: 4, ar: "تَمْيِيزُ «كَمْ» وَإِعْرَابُهُ", tr: "Temyiz ve İ’rabı", short: "Temyiz", col: "mi", legend: ["mz", "nasb", "cerr"],
  goals: ["Kem’in türünü ve temyizini birlikte göstermek", "Temyizin biçimini söylemek: müfred / cem, mansûb / mecrûr", "Boşluğa uygun temyizi koymak"],
  examples: [
    { s: "كَمْ:mz / مُتْحَفًا:nasb / زُرْتَ هَذِهِ السَّنَةَ؟:x", tr: "Bu yıl kaç müze gezdin? ← istifhâmiyye; temyiz مُتْحَفًا, müfred mansûb.", pair: "كَمْ:mz / مِنْ:cerr / ثَوْبٍ:nasb / خَاطَ الخَيَّاطُ.:x", pairTr: "Terzi nice elbise dikti. ← haberiyye; temyiz ثَوْبٍ, مِنْ ile mecrûr." },
    { s: "كَمْ:mz / وَلَدًا:nasb / لَكَ؟:x", tr: "Kaç çocuğun var? ← temyiz وَلَدًا: müfred mansûb.", pair: "كَمْ:mz / كُتُبٍ:nasb / قَرَأْتُهَا حَتَّى الآنَ.:x", pairTr: "Şimdiye kadar nice kitap okudum. ← temyiz كُتُبٍ: cem mecrûr." }
  ],
  rules: [
    { tr: "Temyiz, kem’in neyin sayısını sorduğunu ya da neyin çokluğunu bildirdiğini açıklayan isimdir: <span class=\"ar\">كَمْ <u>كِتَابًا</u> · كَمْ <u>كِتَابٍ</u></span>." },
    { tr: "İ’rab tablosu:", ex: ["اسْتِفْهَامِيَّةٌ: مُفْرَدٌ مَنْصُوبٌ (حَرْفُ جَرٍّ ← مَنْصُوبٌ أَوْ مَجْرُورٌ)", "خَبَرِيَّةٌ: مُفْرَدٌ أَوْ جَمْعٌ، مَجْرُورٌ بِالإِضَافَةِ أَوْ بِمِنْ"] },
    { tr: "Temyiz kem’den ayrılabilir: <span class=\"ar\">كَمْ تَرَكُوا مِنْ جَنَّاتٍ</span>. Ayrılınca haberiyyenin temyizi <span class=\"ar\">مِنْ</span> ile gelir." },
    { tr: "Temyiz anlaşılıyorsa hazfedilebilir: <span class=\"ar\">﴿كَمْ لَبِثْتُمْ﴾</span> (takdiri: <span class=\"ar\">كَمْ يَوْمًا</span>)." }
  ],
  kaide: ["بَيِّنْ نَوْعَ «كَمْ» وَعَيِّنْ تَمْيِيزَهَا وَأَعْرِبْهُ: كَمْ وَلَدًا لَكَ؟ ← اسْتِفْهَامِيَّةٌ، وَتَمْيِيزُهَا «وَلَدًا» مُفْرَدٌ مَنْصُوبٌ. كَمْ كُتُبٍ قَرَأْتُهَا حَتَّى الآنَ ← خَبَرِيَّةٌ، وَتَمْيِيزُهَا «كُتُبٍ» جَمْعٌ مَجْرُورٌ."],
  ex: [
    { type: "combo", num: "٢", ar: "وَضِّحْ نَوْعَ «كَمْ» فِيمَا يَأْتِي وَبَيِّنْ تَمْيِيزَهَا", tr: "Temyizi ve kem’in türünü seç.", exHtml: "<span class=\"ar\">كَمْ مُتْحَفًا زُرْتَ هَذِهِ السَّنَةَ ← اسْتِفْهَامِيَّةٌ وَتَمْيِيزُهَا «مُتْحَفًا» · كَمْ مِنْ ثَوْبٍ خَاطَ الخَيَّاطُ ← خَبَرِيَّةٌ وَتَمْيِيزُهَا «ثَوْبٍ»</span>", items: [
      ["كَمْ لَيْلَةً حَكَتْ شَهْرَزَادُ لِشَهْرَيَارَ", ["لَيْلَةً", "شَهْرَزَادُ", "شَهْرَيَارَ"], "im", "Şehrazat Şehriyar’a kaç gece anlattı?", "Temyiz mansûb: soru."],
      ["كَمْ مِنْ أَقْوَامٍ عَاشَتْ وَفَنِيَتْ فِي هَذِهِ الدِّيَارِ", ["أَقْوَامٍ", "الدِّيَارِ", "هَذِهِ"], "hk", "Bu diyarlarda nice kavimler yaşayıp yok oldu.", "مِنْ + cem."],
      ["كَمْ جُهْدٍ بَذَلَ الخَلِيفَةُ عُمَرُ لِتَحْقِيقِ العَدْلِ", ["جُهْدٍ", "الخَلِيفَةُ", "العَدْلِ"], "he", "Halife Ömer adaleti sağlamak için nice çaba harcadı.", "Müfred, izafetle mecrûr."],
      ["كَمْ مِنْ غَنِيٍّ مَاتَ غَرِيبًا", ["غَنِيٍّ", "غَرِيبًا", "مَاتَ"], "hn", "Nice zengin gurbette öldü.", "مِنْ + müfred. غَرِيبًا hâldir."],
      ["كَمْ غُرْفَةً لِهَذِهِ الشَّقَّةِ", ["غُرْفَةً", "الشَّقَّةِ", "هَذِهِ"], "im", "Bu dairenin kaç odası var?", "Temyiz mansûb."],
      ["كَمْ سَنَةً مَكَثَ سَيِّدُنَا نُوحٌ بَيْنَ قَوْمِهِ", ["سَنَةً", "قَوْمِهِ", "سَيِّدُنَا"], "im", "Efendimiz Nûh kavmi arasında kaç yıl kaldı?", "Temyiz mansûb."],
      ["كَمْ دُولَارًا كَلَّفَ هَذَا المَبْنَى", ["دُولَارًا", "المَبْنَى", "هَذَا"], "im", "Bu bina kaç dolara mal oldu?", "Temyiz mansûb."],
      ["﴿كَمْ مِنْ فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللهِ﴾", ["فِئَةٍ", "فِئَةً كَثِيرَةً", "قَلِيلَةٍ"], "hn", "Nice az topluluk, Allah’ın izniyle çok topluluğu yendi. (Bakara 249)", "مِنْ + müfred; قَلِيلَةٍ sıfattır."]
    ].map(KM) },
    { type: "pick", fill: true, num: "٣", ar: "امْلَإِ الفَرَاغَ فِي الجُمَلِ التَّالِيَةِ بِتَمْيِيزِ «كَمْ»", tr: "Boşluğa uygun temyizi seç. (Soru işareti: istifhâmiyye; ünlem: haberiyye.)", exHtml: "<span class=\"ar\">كَمْ طَالِبًا اشْتَرَكَ فِي هَذِهِ الجَوْلَةِ؟ · كَمْ مِنْ أَشْعَارٍ نَظَمَ مُحَمَّد إِقْبَال!</span>", items: PL([
      ["كَمْ ___ اشْتَرَكَ فِي هَذَا المَشْرُوعِ؟", "مُهَنْدِسًا", "مُهَنْدِسٍ", "مُهَنْدِسِينَ", "Bu projeye kaç mühendis katıldı?", "İstifhâmiyye: müfred mansûb."],
      ["كَمْ ___ بِمَكْتَبَةِ السُّلَيْمَانِيَّةِ!", "مَخْطُوطَةٍ", "مَخْطُوطَةٌ", "مَخْطُوطَاتٌ", "Süleymaniye Kütüphanesi’nde nice yazma eser var!", "Haberiyye: mecrûr."],
      ["بِكَمْ ___ اشْتَرَيْتَ شَقَّتَكَ؟", "لِيرَةٍ", "لِيرَاتٍ", "لِيرَةٌ", "Daireni kaç liraya aldın?", "Harf-i cerli soru: mecrûr (لِيرَةً da olur)."],
      ["كَمْ ___ سَجَّلَ اسْمَهُ هَذِهِ السَّنَةَ؟", "طَالِبًا", "طُلَّابًا", "طَالِبٍ", "Bu yıl kaç öğrenci kaydoldu?", "Müfred mansûb."],
      ["كَمْ ___ ضَحَّى بِنَفْسِهِ لِلدِّفَاعِ عَنِ الوَطَنِ!", "شَهِيدٍ", "شَهِيدٌ", "شُهَدَاءُ", "Vatanı savunmak için nice şehit canını feda etti!", "Haberiyye: mecrûr."],
      ["كَمْ ___ عُمْرُ جَدَّتِكَ؟", "سَنَةً", "سَنَوَاتٍ", "سَنَةٍ", "Ninen kaç yaşında?", "Müfred mansûb."],
      ["كَمْ ___ تَخَرَّجَ فِي هَذِهِ الكُلِّيَّةِ هَذِهِ السَّنَةَ؟", "طَبِيبًا", "أَطِبَّاءَ", "طَبِيبٌ", "Bu yıl bu fakülteden kaç doktor mezun oldu?", "Müfred mansûb."],
      ["كَمْ ___ لَنَا فِي هَذَا المَكَانِ!", "يَوْمٍ جَمِيلٍ", "يَوْمٌ جَمِيلٌ", "أَيَّامٌ جَمِيلَةٌ", "Bu yerde ne güzel günlerimiz oldu!", "Haberiyye: mecrûr; sıfat da uyar."]
    ])},
    { type: "combo", num: "٤", ar: "بَيِّنْ نَوْعَ «كَمْ» فِيمَا يَأْتِي وَعَيِّنْ تَمْيِيزَهَا وَأَعْرِبْهُ", tr: "Temyizi ve kem’in türünü, temyizin i’rabıyla birlikte seç.", exHtml: "<span class=\"ar\">كَمْ وَلَدًا لَكَ؟ ← اسْتِفْهَامِيَّةٌ، وَتَمْيِيزُهَا «وَلَدًا» مُفْرَدٌ مَنْصُوبٌ · كَمْ كُتُبٍ قَرَأْتُهَا حَتَّى الآنَ ← خَبَرِيَّةٌ، وَتَمْيِيزُهَا «كُتُبٍ» جَمْعٌ مَجْرُورٌ</span>", items: [
      ["كَمْ لِيرَةً فِي جَيْبِكَ؟", ["لِيرَةً", "جَيْبِكَ", "فِي"], "im", "Cebinde kaç lira var?", "Müfred mansûb."],
      ["كَمْ مِنْ دُوَلٍ زُرْتُ خِلَالَ عَشْرِ سَنَوَاتٍ", ["دُوَلٍ", "سَنَوَاتٍ", "عَشْرِ"], "hk", "On yıl içinde nice ülke gezdim.", "مِنْ + cem."],
      ["كَمْ حَافِلَةً تَمُرُّ بِهَذِهِ المَحَطَّةِ؟", ["حَافِلَةً", "المَحَطَّةِ", "هَذِهِ"], "im", "Bu duraktan kaç otobüs geçiyor?", "Müfred mansûb."],
      ["مُنْذُ كَمْ سَنَةٍ تَسْكُنُ فِي هَذَا الحَيِّ؟", ["سَنَةٍ", "الحَيِّ", "هَذَا"], "ij", "Kaç yıldır bu mahallede oturuyorsun?", "مُنْذُ’dan sonra mecrûr."],
      ["كَمْ مِنْ مَصَانِعَ أُنْشِئَتْ فِي عَهْدِ الحُكُومَةِ الأَخِيرَةِ", ["مَصَانِعَ", "عَهْدِ", "الحُكُومَةِ"], "hk", "Son hükûmet döneminde nice fabrika kuruldu.", "مِنْ + cem; gayr-i munsarif, fetha ile mecrûr."],
      ["فِي كَمْ سَنَةٍ تَمَّ بِنَاءُ مَسْجِدِ السُّلَيْمَانِيَّةِ؟", ["سَنَةٍ", "بِنَاءُ", "مَسْجِدِ"], "ij", "Süleymaniye Camii kaç yılda yapıldı?", "فِي’den sonra mecrûr."],
      ["كَمْ كِيلُومِتْرًا سُرْعَةُ هَذِهِ السَّيَّارَةِ فِي السَّاعَةِ؟", ["كِيلُومِتْرًا", "سُرْعَةُ", "السَّاعَةِ"], "im", "Bu arabanın hızı saatte kaç kilometre?", "Müfred mansûb."],
      ["كَمْ كَاتِبٍ أَلَّفَ فِي هَذَا المَوْضُوعِ", ["كَاتِبٍ", "المَوْضُوعِ", "هَذَا"], "he", "Bu konuda nice yazar eser verdi.", "Müfred, izafetle mecrûr."]
    ].map(KM) },
    { type: "classify", extra: true, opts: TZ, ar: "مَا صُورَةُ التَّمْيِيزِ؟", tr: "Koyu temyiz hangi biçimde?", items: CL([
      [HL("كَمْ وَلَدًا لَكَ؟", "وَلَدًا"), "m", "İstifhâmiyye."],
      [HL("كَمْ مُتْحَفًا زُرْتَ هَذِهِ السَّنَةَ؟", "مُتْحَفًا"), "m", "İstifhâmiyye."],
      [HL("كَمْ دُولَارًا كَلَّفَ هَذَا المَبْنَى؟", "دُولَارًا"), "m", "İstifhâmiyye."],
      [HL("كَمْ كِيلُومِتْرًا سُرْعَةُ السَّيَّارَةِ؟", "كِيلُومِتْرًا"), "m", "İstifhâmiyye."],
      [HL("بِكَمْ لِيرَةٍ اشْتَرَيْتَ هَذَا القَلَمَ؟", "لِيرَةٍ"), "j", "بِـ’den sonra."],
      [HL("مُنْذُ كَمْ سَنَةٍ تَسْكُنُ فِي هَذَا الحَيِّ؟", "سَنَةٍ"), "j", "مُنْذُ’dan sonra."],
      [HL("فِي كَمْ سَنَةٍ تَمَّ بِنَاءُ المَسْجِدِ؟", "سَنَةٍ"), "j", "فِي’den sonra."],
      [HL("كَمْ صَدِيقٍ لَكَ فِي هَذِهِ المَدِينَةِ!", "صَدِيقٍ"), "e", "Haberiyye."],
      [HL("كَمْ جُهْدٍ بَذَلَ الخَلِيفَةُ عُمَرُ!", "جُهْدٍ"), "e", "Haberiyye."],
      [HL("كَمْ سَائِحٍ زَارَ بِلَادَنَا!", "سَائِحٍ"), "e", "Haberiyye."],
      [HL("كَمْ مِنْ غَنِيٍّ مَاتَ غَرِيبًا!", "غَنِيٍّ"), "n", "مِنْ ile."],
      [HL("﴿كَمْ مِنْ فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً﴾", "فِئَةٍ"), "n", "مِنْ ile."],
      [HL("كَمْ دُوَلٍ فَقِيرَةٍ فِي العَالَمِ!", "دُوَلٍ"), "c", "Cem, izafetle."],
      [HL("كَمْ عُمَّالٍ شَارَكُوا فِي بِنَاءِ هَذَا الجِسْرِ!", "عُمَّالٍ"), "c", "Cem, izafetle."],
      [HL("كَمْ مِنْ أَقْوَامٍ عَاشَتْ وَفَنِيَتْ!", "أَقْوَامٍ"), "k", "Cem, مِنْ ile."],
      [HL("كَمْ مِنْ قَصَائِدَ حَفِظْتُ!", "قَصَائِدَ"), "k", "Cem, مِنْ ile (gayr-i munsarif)."]
    ]) }
  ]
},
// ---------------------------------------------------------------- 5 · ÂYETLER VE OKUMA
{
  id: "u5", no: 5, ar: "«كَمْ» فِي القُرْآنِ الكَرِيمِ · القِرَاءَةُ", tr: "Âyetlerde Kem ve Okuma", short: "Âyetler", col: "muz", legend: ["mz", "nasb", "cerr"],
  goals: ["Âyetlerdeki kem’in türünü ve temyizini bulmak", "Kem’den ayrılmış ve hazfedilmiş temyizi tanımak", "“Kitap çarşısında” metninde kem’leri ve temyizleri ayırt etmek"],
  examples: [
    { s: "﴿وَكَمْ:mz / مِنْ:cerr / قَرْيَةٍ:nasb / أَهْلَكْنَاهَا﴾:x", tr: "Nice memleketi helak ettik. (A’râf 4) ← haberiyye", pair: "﴿كَمْ:mz / لَبِثْتُمْ﴾:x", pairTr: "Ne kadar kaldınız? (Kehf 19) ← istifhâmiyye, temyiz hazfedilmiş" },
    { s: "﴿كَمْ:mz / تَرَكُوا:x / مِنْ:cerr / جَنَّاتٍ:nasb / وَعُيُونٍ﴾:x", tr: "Nice bahçeler ve pınarlar bıraktılar. (Duhân 25) ← temyiz kem’den ayrılmış" }
  ],
  rules: [
    { tr: "Kur’an’da kem çoğunlukla <b>haberiyye</b>dir ve helak edilen kavimlerin, nimetlerin çokluğunu anlatır: <span class=\"ar\">كَمْ أَهْلَكْنَا قَبْلَهُمْ مِنَ القُرُونِ</span>." },
    { tr: "Haberiyyenin temyizi fiille kem’den ayrılınca <span class=\"ar\">مِنْ</span> ile gelir: <span class=\"ar\">كَمْ أَنْبَتْنَا فِيهَا مِنْ كُلِّ زَوْجٍ كَرِيمٍ</span>." },
    { tr: "<span class=\"ar\">﴿كَمْ لَبِثْتُمْ﴾</span> sorusunun cevabı <span class=\"ar\">لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍ</span>’dir; temyiz (<span class=\"ar\">يَوْمًا</span>) hazfedilmiştir." }
  ],
  kaide: ["عَيِّنْ فِي الآيَاتِ القُرْآنِيَّةِ التَّالِيَةِ نَوْعَ «كَمْ» وَتَمْيِيزَهَا."],
  ex: [
    { type: "combo", num: "٨", ar: "عَيِّنْ فِي الآيَاتِ القُرْآنِيَّةِ التَّالِيَةِ نَوْعَ «كَمْ» وَتَمْيِيزَهَا", tr: "Âyetteki kem’in temyizini ve türünü seç.", items: [
      ["﴿أَوَلَمْ يَهْدِ لَهُمْ كَمْ أَهْلَكْنَا مِنْ قَبْلِهِمْ مِنَ القُرُونِ يَمْشُونَ فِي مَسَاكِنِهِمْ﴾ (السجدة ٢٦)", ["مِنَ القُرُونِ", "مَسَاكِنِهِمْ", "قَبْلِهِمْ"], "hk", "Kendilerinden önce, yurtlarında dolaştıkları nice nesli helak ettiğimiz onlara yol göstermedi mi? (Secde 26)", "Cem, مِنْ ile; kem’den ayrılmış."],
      ["﴿أَفَلَمْ يَهْدِ لَهُمْ كَمْ أَهْلَكْنَا قَبْلَهُمْ مِنَ القُرُونِ﴾ (طه ١٢٨)", ["مِنَ القُرُونِ", "قَبْلَهُمْ", "لَهُمْ"], "hk", "Onlardan önce nice nesli helak etmemiz onlara yol göstermedi mi? (Tâhâ 128)", "Cem, مِنْ ile."],
      ["﴿قَالَ قَائِلٌ مِنْهُمْ كَمْ لَبِثْتُمْ قَالُوا لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍ﴾ (الكهف ١٩)", ["مَحْذُوفٌ، تَقْدِيرُهُ: يَوْمًا", "يَوْمًا", "بَعْضَ يَوْمٍ"], "iz", "İçlerinden biri “Ne kadar kaldınız?” dedi. “Bir gün ya da günün bir kısmı” dediler. (Kehf 19)", "Soru; temyiz hazfedilmiş. Cümledeki يَوْمًا cevabın zarfıdır."],
      ["﴿وَكَمْ مِنْ مَلَكٍ فِي السَّمَاوَاتِ لَا تُغْنِي شَفَاعَتُهُمْ شَيْئًا﴾ (النجم ٢٦)", ["مِنْ مَلَكٍ", "السَّمَاوَاتِ", "شَيْئًا"], "hn", "Göklerde nice melek vardır ki şefaatleri hiçbir fayda vermez. (Necm 26)", "Müfred, مِنْ ile."],
      ["﴿وَكَمْ مِنْ قَرْيَةٍ أَهْلَكْنَاهَا فَجَاءَهَا بَأْسُنَا بَيَاتًا﴾ (الأعراف ٤)", ["مِنْ قَرْيَةٍ", "بَأْسُنَا", "بَيَاتًا"], "hn", "Nice memleketi helak ettik; azabımız onlara gece geldi. (A’râf 4)", "Müfred, مِنْ ile."],
      ["﴿كَمْ تَرَكُوا مِنْ جَنَّاتٍ وَعُيُونٍ﴾ (الدخان ٢٥)", ["مِنْ جَنَّاتٍ", "تَرَكُوا", "مَقَامٍ كَرِيمٍ"], "hk", "Nice bahçeler ve pınarlar bıraktılar. (Duhân 25)", "Cem, مِنْ ile; kem’den ayrılmış."],
      ["﴿أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا قَبْلَهُمْ مِنَ القُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ﴾ (يس ٣١)", ["مِنَ القُرُونِ", "قَبْلَهُمْ", "يَرْجِعُونَ"], "hk", "Onlardan önce nice nesli helak ettiğimizi, onların artık kendilerine dönmeyeceklerini görmediler mi? (Yâsîn 31)", "Cem, مِنْ ile."],
      ["﴿أَوَلَمْ يَرَوْا إِلَى الأَرْضِ كَمْ أَنْبَتْنَا فِيهَا مِنْ كُلِّ زَوْجٍ كَرِيمٍ﴾ (الشعراء ٧)", ["مِنْ كُلِّ زَوْجٍ", "الأَرْضِ", "فِيهَا"], "hn", "Yere bakmadılar mı, orada her güzel çiftten ne çok bitirdik! (Şuarâ 7)", "Müfred, مِنْ ile."]
    ].map(KM) },
    { type: "reading", ar: "اقْرَأِ الحِوَارَ ثُمَّ عَيِّنْ نَوْعَ «كَمْ» وَصُورَةَ تَمْيِيزِهَا", tr: "Diyaloğu oku, soruları cevapla; sonra koyu kem’in türünü ve temyizin biçimini seç.", title: "فِي سُوقِ الكُتُبِ",
      text: METIN,
      textTr: "Yûsuf, arkadaşı Ömer’le İstanbul’daki eski kitaplar çarşısına girdi.<br>Yûsuf: Bu çarşıda kaç dükkân var?<br>Ömer: Yirmi kadar dükkân var. Asırlar boyunca buradan nice âlim geçti!<br>Yûsuf (satıcıya): Bu sözlük kaç lira?<br>Satıcı: Üç yüz lira. Bu sözlüğü benden nice öğrenci aldı!<br>Yûsuf: Kaç yıldır bu çarşıda çalışıyorsun?<br>Satıcı: Kırk yıldır burada çalışıyorum. Nice nadir kitap sattım, okuyucular arasında nice dost buldum!<br>Ömer: Kaç kitap alacaksın Yûsuf?<br>Yûsuf: Sadece iki kitap; çünkü nice kitap aldım da okumadım!",
      qa: [
        { q: "كَمْ دُكَّانًا فِي سُوقِ الكُتُبِ؟", a: "فِيهِ نَحْوُ عِشْرِينَ دُكَّانًا.", tr: "Kitap çarşısında kaç dükkân var? Yirmi kadar." },
        { q: "بِكَمْ لِيرَةٍ المُعْجَمُ؟", a: "بِثَلَاثِمِائَةِ لِيرَةٍ.", tr: "Sözlük kaç lira? Üç yüz lira." },
        { q: "كَمْ سَنَةً يَعْمَلُ البَائِعُ فِي السُّوقِ؟", a: "يَعْمَلُ فِيهِ مُنْذُ أَرْبَعِينَ سَنَةً.", tr: "Satıcı kaç yıldır çarşıda çalışıyor? Kırk yıldır." },
        { q: "كَمْ كِتَابًا سَيَشْتَرِي يُوسُفُ؟ وَلِمَاذَا؟", a: "كِتَابَيْنِ فَقَطْ؛ لِأَنَّهُ اشْتَرَى كُتُبًا كَثِيرَةً وَلَمْ يَقْرَأْهَا.", tr: "Yûsuf kaç kitap alacak, niçin? Yalnız iki; çünkü daha önce aldığı birçok kitabı okumadı." }
      ],
      cls: { opts: KT, ar: "مَا نَوْعُ «كَمْ»؟", tr: "Koyu kem istifhâmiyye mi, haberiyye mi?", items: [
        { s: HL("كَمْ دُكَّانًا فِي هَذَا السُّوقِ؟", "كَمْ"), a: "i", why: "Sayı soruluyor." },
        { s: HL("وَكَمْ مِنْ عَالِمٍ مَرَّ مِنْ هُنَا!", "كَمْ"), a: "h", why: "Çokluk." },
        { s: HL("بِكَمْ لِيرَةٍ هَذَا المُعْجَمُ؟", "كَمْ"), a: "i", why: "Fiyat soruluyor." },
        { s: HL("كَمْ طَالِبٍ اشْتَرَى مِنِّي هَذَا المُعْجَمَ!", "كَمْ"), a: "h", why: "Çokluk." },
        { s: HL("كَمْ سَنَةً تَعْمَلُ فِي هَذَا السُّوقِ؟", "كَمْ"), a: "i", why: "Süre soruluyor." },
        { s: HL("كَمْ مِنْ كُتُبٍ نَادِرَةٍ بِعْتُهَا", "كَمْ"), a: "h", why: "Çokluk." },
        { s: HL("وَكَمْ صَدِيقٍ وَجَدْتُ بَيْنَ القُرَّاءِ!", "كَمْ"), a: "h", why: "Çokluk." },
        { s: HL("كَمْ كِتَابًا سَتَشْتَرِي يَا يُوسُفُ؟", "كَمْ"), a: "i", why: "Sayı soruluyor." },
        { s: HL("فَكَمْ مِنْ كِتَابٍ اشْتَرَيْتُهُ وَلَمْ أَقْرَأْهُ!", "كَمْ"), a: "h", why: "Çokluk." }
      ]},
      cls2: { opts: TZ, ar: "مَا صُورَةُ التَّمْيِيزِ؟", tr: "Koyu temyiz hangi biçimde?", items: [
        { s: HL("كَمْ دُكَّانًا فِي هَذَا السُّوقِ؟", "دُكَّانًا"), a: "m", why: "Müfred mansûb." },
        { s: HL("وَكَمْ مِنْ عَالِمٍ مَرَّ مِنْ هُنَا", "عَالِمٍ"), a: "n", why: "مِنْ ile." },
        { s: HL("بِكَمْ لِيرَةٍ هَذَا المُعْجَمُ؟", "لِيرَةٍ"), a: "j", why: "Harf-i cerli soru." },
        { s: HL("كَمْ طَالِبٍ اشْتَرَى مِنِّي", "طَالِبٍ"), a: "e", why: "İzafetle mecrûr." },
        { s: HL("كَمْ سَنَةً تَعْمَلُ", "سَنَةً"), a: "m", why: "Müfred mansûb." },
        { s: HL("كَمْ مِنْ كُتُبٍ نَادِرَةٍ", "كُتُبٍ"), a: "k", why: "Cem, مِنْ ile." },
        { s: HL("وَكَمْ صَدِيقٍ وَجَدْتُ", "صَدِيقٍ"), a: "e", why: "İzafetle mecrûr." },
        { s: HL("كَمْ كِتَابًا سَتَشْتَرِي", "كِتَابًا"), a: "m", why: "Müfred mansûb." },
        { s: HL("فَكَمْ مِنْ كِتَابٍ اشْتَرَيْتُهُ", "كِتَابٍ"), a: "n", why: "مِنْ ile." }
      ]}
    }
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["كَمْ {وَلَدًا} لَكَ؟", ["وَلَدًا", "وَلَدٍ", "أَوْلَادًا"], "soru: müfred mansûb", "Kaç çocuğun var?", "u1"],
  ["كَمْ {صَدِيقٍ} لَكَ فِي هَذِهِ المَدِينَةِ!", ["صَدِيقٍ", "صَدِيقًا", "صَدِيقٌ"], "haber: izafetle mecrûr", "Bu şehirde ne çok arkadaşın var!", "u1"],
  ["كَمْ {شَقَّةً} فِي هَذِهِ العِمَارَةِ؟", ["شَقَّةً", "شَقَّةٍ", "شُقَقًا"], "soru", "Bu binada kaç daire var?", "u1"],
  ["كَمْ {سَائِحٍ} زَارَ بِلَادَنَا هَذَا العَامَ!", ["سَائِحٍ", "سَائِحًا", "سَائِحٌ"], "haber", "Bu yıl ülkemizi nice turist ziyaret etti!", "u1"],
  ["كَمْ {شَخْصًا} فِي أُسْرَتِكَ؟", ["شَخْصًا", "شَخْصٍ", "أَشْخَاصًا"], "soru", "Ailende kaç kişi var?", "u1"],
  ["بِكَمْ {لِيرَةٍ} اشْتَرَيْتَ هَذَا القَلَمَ؟", ["لِيرَةٍ", "لِيرَاتٍ", "لِيرَةٌ"], "cerli soru: mecrûr da olur", "Bu kalemi kaç liraya aldın?", "u2"],
  ["كَمْ {يَوْمًا} فِي الأُسْبُوعِ؟", ["يَوْمًا", "يَوْمٍ", "أَيَّامًا"], "soru", "Haftada kaç gün var?", "u2"],
  ["كَمْ {سُورَةً} فِي القُرْآنِ؟", ["سُورَةً", "سُوَرًا", "سُورَةٍ"], "soru", "Kur’an’da kaç sure var?", "u2"],
  ["مُنْذُ كَمْ {سَاعَةً} تَنْتَظِرُنِي هُنَا؟", ["سَاعَةً", "سَاعَاتٍ", "سَاعَةٌ"], "cerli soru: mansûb da olur", "Kaç saattir beni burada bekliyorsun?", "u2"],
  ["كَمْ {طَائِرَةً} تُقْلِعُ كُلَّ يَوْمٍ؟", ["طَائِرَةً", "طَائِرَاتٍ", "طَائِرَةٍ"], "soru", "Her gün kaç uçak kalkıyor?", "u2"],
  ["كَمْ مِنْ {سَائِحٍ} زَارَ بِلَادَنَا!", ["سَائِحٍ", "سَائِحًا", "سَائِحٌ"], "min ile mecrûr", "Ülkemizi nice turist ziyaret etti!", "u3"],
  ["كَمْ {مَرْجِعٍ} قَرَأَ أَحْمَدُ لِرِسَالَتِهِ!", ["مَرْجِعٍ", "مَرْجِعًا", "مَرْجِعٌ"], "izafetle mecrûr", "Ahmed tezi için nice kaynak okudu!", "u3"],
  ["كَمْ مِنْ {عَالِمٍ} نَبَغَ فِي التَّارِيخِ الإِسْلَامِيِّ!", ["عَالِمٍ", "عَالِمًا", "عُلَمَاءُ"], "min ile mecrûr", "İslam tarihinde nice âlim parladı!", "u3"],
  ["كَمْ {لَيْلَةٍ} قَضَاهَا المَرِيضُ سَهْرَانَ!", ["لَيْلَةٍ", "لَيْلَةً", "لَيْلَةٌ"], "izafetle mecrûr", "Hasta nice geceyi uykusuz geçirdi!", "u3"],
  ["كَمْ مِنْ {مَعْرَكَةٍ} انْتَصَرَ فِيهَا خَالِدٌ!", ["مَعْرَكَةٍ", "مَعْرَكَةً", "مَعْرَكَةٌ"], "min ile mecrûr", "Hâlid nice savaşta galip geldi!", "u3"],
  ["كَمْ مِنْ {أَقْوَامٍ} عَاشَتْ وَفَنِيَتْ!", ["أَقْوَامٍ", "أَقْوَامًا", "أَقْوَامٌ"], "cem, min ile", "Nice kavimler yaşayıp yok oldu!", "u4"],
  ["كَمْ مِنْ {قَصَائِدَ} حَفِظْتُ!", ["قَصَائِدَ", "قَصَائِدٍ", "قَصَائِدُ"], "gayr-i munsarif: fetha ile mecrûr", "Nice kaside ezberledim!", "u4"],
  ["كَمْ {عُمَّالٍ} شَارَكُوا فِي بِنَاءِ الجِسْرِ!", ["عُمَّالٍ", "عُمَّالًا", "عُمَّالٌ"], "cem, izafetle", "Köprünün yapımına nice işçi katıldı!", "u4"],
  ["كَمْ {دُولَارًا} كَلَّفَ هَذَا المَبْنَى؟", ["دُولَارًا", "دُولَارٍ", "دُولَارَاتٍ"], "soru", "Bu bina kaç dolara mal oldu?", "u4"],
  ["كَمْ {غُرْفَةً} لِهَذِهِ الشَّقَّةِ؟", ["غُرْفَةً", "غُرَفًا", "غُرْفَةٍ"], "soru", "Bu dairenin kaç odası var?", "u4"],
  ["﴿وَكَمْ مِنْ {مَلَكٍ} فِي السَّمَاوَاتِ﴾", ["مَلَكٍ", "مَلَكًا", "مَلَكٌ"], "min ile", "Göklerde nice melek var.", "u5"],
  ["﴿وَكَمْ مِنْ {قَرْيَةٍ} أَهْلَكْنَاهَا﴾", ["قَرْيَةٍ", "قَرْيَةً", "قَرْيَةٌ"], "min ile", "Nice memleketi helak ettik.", "u5"],
  ["﴿كَمْ مِنْ {فِئَةٍ} قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً﴾", ["فِئَةٍ", "فِئَةً", "فِئَةٌ"], "min ile", "Nice az topluluk çok topluluğu yendi.", "u5"],
  ["﴿كَمْ تَرَكُوا مِنْ {جَنَّاتٍ} وَعُيُونٍ﴾", ["جَنَّاتٍ", "جَنَّاتًا", "جَنَّاتٌ"], "ayrılmış temyiz, min ile", "Nice bahçeler ve pınarlar bıraktılar.", "u5"],
  ["كَمْ {دُكَّانًا} فِي هَذَا السُّوقِ؟", ["دُكَّانًا", "دُكَّانٍ", "دَكَاكِينَ"], "soru", "Bu çarşıda kaç dükkân var?", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["وَلَدٌ ← sayısını sor", "كَمْ وَلَدًا لَكَ؟", "كَمْ وَلَدٍ لَكَ؟", "كَمْ أَوْلَادًا لَكَ؟", "İstifhâmiyye: müfred mansûb.", "u1"],
  ["صَدِيقٌ ← çokluk bildir", "كَمْ صَدِيقٍ لِي!", "كَمْ صَدِيقًا لِي!", "كَمْ صَدِيقٌ لِي!", "Haberiyye: mecrûr.", "u1"],
  ["كَمْ كِتَابًا اشْتَرَيْتَ؟ ← haberiyyeye çevir", "كَمْ كِتَابٍ اشْتَرَيْتُ!", "كَمْ كِتَابًا اشْتَرَيْتُ!", "كَمْ كُتُبًا اشْتَرَيْتُ!", "Temyiz mecrûr olur.", "u1"],
  ["عَدَدُ أَيَّامِ الأُسْبُوعِ ← soru", "كَمْ يَوْمًا فِي الأُسْبُوعِ؟", "كَمْ يَوْمٍ فِي الأُسْبُوعِ؟", "كَمْ أَيَّامًا فِي الأُسْبُوعِ؟", "Müfred mansûb.", "u2"],
  ["ثَمَنُ القَلَمِ ← harf-i cerle sor", "بِكَمْ لِيرَةٍ اشْتَرَيْتَ القَلَمَ؟", "بِكَمْ لِيرَاتٍ اشْتَرَيْتَ القَلَمَ؟", "بِكَمْ لِيرَةٌ اشْتَرَيْتَ القَلَمَ؟", "Harf-i cerden sonra mecrûr ya da mansûb.", "u2"],
  ["عَدَدُ السُّوَرِ فِي القُرْآنِ ← soru", "كَمْ سُورَةً فِي القُرْآنِ؟", "كَمْ سُوَرًا فِي القُرْآنِ؟", "كَمْ سُورَةٍ فِي القُرْآنِ؟", "Müfred mansûb.", "u2"],
  ["العُلَمَاءُ الَّذِينَ نَبَغُوا ← çokluk bildir", "كَمْ مِنْ عَالِمٍ نَبَغَ!", "كَمْ عَالِمًا نَبَغَ؟", "كَمْ مِنْ عَالِمٌ نَبَغَ!", "مِنْ + müfred; fiil müfred.", "u3"],
  ["الأُسَرُ الفَقِيرَةُ ← çokluk bildir", "كَمْ أُسْرَةٍ فَقِيرَةٍ!", "كَمْ أُسْرَةً فَقِيرَةً!", "كَمْ أُسْرَةٌ فَقِيرَةٌ!", "İzafetle mecrûr; sıfat uyar.", "u3"],
  ["كَمْ صَدِيقٍ لَكَ! ← min ekle", "كَمْ مِنْ صَدِيقٍ لَكَ!", "كَمْ مِنْ صَدِيقًا لَكَ!", "كَمْ مِنْ صَدِيقٌ لَكَ!", "مِنْ’den sonra mecrûr.", "u3"],
  ["كَمْ مِنْ قَصِيدَةٍ حَفِظْتُ! ← temyizi cem yap", "كَمْ مِنْ قَصَائِدَ حَفِظْتُ!", "كَمْ مِنْ قَصَائِدٍ حَفِظْتُ!", "كَمْ مِنْ قَصَائِدُ حَفِظْتُ!", "قَصَائِدُ gayr-i munsarif: fetha ile mecrûr.", "u4"],
  ["كَمْ دَوْلَةٍ زُرْتُ! ← temyizi cem yap", "كَمْ دُوَلٍ زُرْتُ!", "كَمْ دُوَلًا زُرْتُ!", "كَمْ دُوَلٌ زُرْتُ!", "Cem, izafetle mecrûr.", "u4"],
  ["كَمْ مِنْ أَقْوَامٍ! ← temyizi müfred yap", "كَمْ مِنْ قَوْمٍ!", "كَمْ مِنْ قَوْمًا!", "كَمْ مِنْ قَوْمٌ!", "Müfred, مِنْ ile mecrûr.", "u4"],
  ["﴿كَمْ لَبِثْتُمْ﴾ ← temyizi göster", "كَمْ يَوْمًا لَبِثْتُمْ؟", "كَمْ يَوْمٍ لَبِثْتُمْ؟", "كَمْ أَيَّامًا لَبِثْتُمْ؟", "Hazfedilen temyiz: يَوْمًا.", "u5"],
  ["﴿وَكَمْ مِنْ قَرْيَةٍ﴾ ← min’i kaldır", "وَكَمْ قَرْيَةٍ", "وَكَمْ قَرْيَةً", "وَكَمْ قَرْيَةٌ", "İzafetle mecrûr.", "u5"]
];
// Temyiz biçimi hız oyunu
var NOUN_LIST = UNITS[3].ex[3].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = TZ;
// İstifhâmiyye mi haberiyye mi hız oyunu
var MM_OPTS = KT;
var MM_LIST = UNITS[0].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  se: { name: "Cümle ↔ temyiz", pairs: [["كَمْ وَلَدًا لَكَ؟", "soru: müfred mansûb"], ["بِكَمْ لِيرَةٍ؟", "cerli soru: mecrûr da olur"], ["كَمْ صَدِيقٍ لِي!", "haber: izafetle"], ["كَمْ مِنْ صَدِيقٍ!", "haber: min ile"], ["كَمْ دُوَلٍ فَقِيرَةٍ!", "haber: cem, izafetle"], ["كَمْ مِنْ دُوَلٍ!", "haber: cem, min ile"], ["﴿كَمْ لَبِثْتُمْ﴾", "temyiz hazfedilmiş"], ["كَمْ مِنْ قَصَائِدَ!", "cem, fetha ile mecrûr"]] },
  ce: { name: "Soru ↔ cevap", pairs: [["كَمْ وَلَدًا لَكَ؟", "لِي خَمْسَةُ أَوْلَادٍ"], ["بِكَمْ لِيرَةً اشْتَرَيْتَ القَلَمَ؟", "بِسِتِّ لِيرَاتٍ"], ["كَمْ يَوْمًا فِي الأُسْبُوعِ؟", "سَبْعَةُ أَيَّامٍ"], ["كَمْ سُورَةً فِي القُرْآنِ؟", "مِائَةٌ وَأَرْبَعَ عَشْرَةَ سُورَةً"], ["كَمْ شَهْرًا فِي السَّنَةِ؟", "اثْنَا عَشَرَ شَهْرًا"], ["كَمْ لَاعِبًا فِي فَرِيقِ كُرَةِ القَدَمِ؟", "أَحَدَ عَشَرَ لَاعِبًا"], ["كَمْ سَاعَةً فِي اليَوْمِ؟", "أَرْبَعٌ وَعِشْرُونَ سَاعَةً"], ["﴿كَمْ لَبِثْتُمْ﴾", "لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍ"]] },
  ay: { name: "Âyet ↔ Türkçe", pairs: [["كَمْ أَهْلَكْنَا مِنْ قَبْلِهِمْ مِنَ القُرُونِ", "onlardan önce nice nesli helak ettik"], ["كَمْ لَبِثْتُمْ", "ne kadar kaldınız"], ["وَكَمْ مِنْ مَلَكٍ فِي السَّمَاوَاتِ", "göklerde nice melek var"], ["وَكَمْ مِنْ قَرْيَةٍ أَهْلَكْنَاهَا", "nice memleketi helak ettik"], ["كَمْ تَرَكُوا مِنْ جَنَّاتٍ وَعُيُونٍ", "nice bahçe ve pınar bıraktılar"], ["كَمْ أَنْبَتْنَا فِيهَا مِنْ كُلِّ زَوْجٍ كَرِيمٍ", "orada her güzel çiftten ne çok bitirdik"], ["كَمْ مِنْ فِئَةٍ قَلِيلَةٍ غَلَبَتْ", "nice az topluluk yendi"], ["أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا قَبْلَهُمْ", "görmediler mi, nicelerini helak ettik"]] }
};
var KARTLAR = [
  ["Kem kaç türdür?", "İki: istifhâmiyye (soru) ve haberiyye (çokluk)."],
  ["İstifhâmiyye ne işe yarar?", "Sayıyı sorar: كَمْ وَلَدًا لَكَ؟"],
  ["Haberiyye ne bildirir?", "Çokluk: كَمْ صَدِيقٍ لَكَ! = çok arkadaşın var."],
  ["İstifhâmiyyenin temyizi?", "Daima müfred ve mansûb: كَمْ كِتَابًا"],
  ["بِكَمْ’den sonra temyiz?", "Mansûb ya da mecrûr: بِكَمْ لِيرَةً / لِيرَةٍ"],
  ["Haberiyyenin temyizi?", "Daima mecrûr; müfred ya da cem."],
  ["Haberiyyenin dört biçimi?", "كَمْ صَدِيقٍ · كَمْ مِنْ صَدِيقٍ · كَمْ دُوَلٍ · كَمْ مِنْ دُوَلٍ"],
  ["Türü nasıl ayırırım?", "Temyiz mansûb → soru; mecrûr ya da مِنْ ile → haber (harf-i cerli soruya dikkat)."],
  ["Kem cümlenin neresinde?", "Başında; önüne yalnız harf-i cer ya da muzâf geçer: مُنْذُ كَمْ"],
  ["Temyiz kem’den ayrılırsa?", "Haberiyyede مِنْ ile gelir: كَمْ تَرَكُوا مِنْ جَنَّاتٍ"],
  ["﴿كَمْ لَبِثْتُمْ﴾’de temyiz?", "Hazfedilmiş: كَمْ يَوْمًا"],
  ["Çokluk cümlesini çevir", "السُّيَّاحُ الَّذِينَ زَارُوا ← كَمْ مِنْ سَائِحٍ زَارَ!"]
];
