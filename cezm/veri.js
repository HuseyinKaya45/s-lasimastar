// ================= VERİ: Muzâri Fiilin Cezmi (جَزْمُ الفِعْلِ المُضَارِعِ) =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin. "cerr.not" gibi yazılırsa etikete not eklenir.
var ROLES = {
  mz: { ar: "أَدَاةُ جَزْمٍ", tr: "Cezm edatı" }, mi: { ar: "أَدَاةُ نَصْبٍ", tr: "Nasb edatı" },
  cerr: { ar: "مَجْزُومٌ", tr: "Meczûm fiil" }, nasb: { ar: "مَنْصُوبٌ", tr: "Mansûb fiil" }, ref: { ar: "مَرْفُوعٌ", tr: "Merfû fiil" },
  x: { ar: "", tr: "" }, y: { ar: "✓", tr: "Seçtin" }
};
var HAL_OPTS = [["ref", "Merfû", "مَرْفُوعٌ", "ref"], ["nasb", "Mansûb", "مَنْصُوبٌ", "nasb"], ["cezm", "Meczûm", "مَجْزُومٌ", "cerr"]];
var EDAT_TUR = [["cezm", "Cezm edatı", "أَدَاةُ جَزْمٍ", "mz"], ["nasb", "Nasb edatı", "أَدَاةُ نَصْبٍ", "mi"], ["yok", "Etkisiz (lâ-i nâfiye)", "لَا النَّافِيَةُ", "ref"]];
var TUR_OPTS = EDAT_TUR;
var NM_OPTS = HAL_OPTS;
var DUS_OPTS = [["sukun", "Sükûn", "السُّكُونُ", "x"], ["son", "Sondaki illet harfi düştü", "حَذْفُ حَرْفِ العِلَّةِ", "x"], ["orta", "Ortadaki harf düştü", "حَذْفُ الوَسَطِ", "x"], ["nun", "Nun düştü", "حَذْفُ النُّونِ", "x"]];
var E7 = ["أَنْ", "لَنْ", "كَيْ", "حَتَّى", "لِـ", "لَمْ", "لَا"];
function AM(pre, post) { return [2, 3, 4].map(function (x) { return pre.concat([x]).concat(post || []); }); }

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
function IR(s, t, c, why, tr) { return { s: s, t: t, c: c, why: why, tr: tr }; }

var UNITS = [
// ---------------------------------------------------------------- 1 · CEZM EDATLARI
{
  id: "u1", no: 1, ar: "أَدَوَاتُ الجَزْمِ", tr: "Cezm Edatları", short: "Cezm edatları", col: "mz", legend: ["mz", "cerr"],
  goals: ["Üç cezm edatını tanımak: لَمْ، لَا (nâhiye), لِـ (lâm-ı emr)", "Cezm edatından sonra muzârinin meczûm olduğunu, alametinin sükûn olduğunu görmek", "Cezm edatını nasb edatından ve etkisiz لَا'dan ayırmak"],
  examples: [
    { s: "لَمْ:mz / يَكْتُبْ:cerr / الدَّرْسَ:-", tr: "Dersi yazmadı.", why: "يَكْتُبُ ← لَمْ يَكْتُبْ: damme sükûna döndü." },
    { s: "لَمْ:mz / يَسْتَيْقِظْ:cerr / عَلِيٌّ:-", tr: "Ali uyanmadı.", why: "لَمْ: geçmişi olumsuz yapar." },
    { s: "لَمْ:mz / تَصِلْ:cerr / رُقَيَّةُ:- / إِلَى:- / البَيْتِ:-", tr: "Rukıyye eve varmadı.", why: "لَمْ + meczûm." },
    { s: "لَا:mz / تَأْكُلْ:cerr / كَثِيرًا:-", tr: "Çok yeme!", why: "لَا nâhiye: yasaklar." },
    { s: "لَا:mz / تَجْلِسْ:cerr / عَلَى:- / الأَرْضِ:-", tr: "Yere oturma!", why: "لَا nâhiye + meczûm." },
    { s: "لَا:mz / تَتَكَلَّمْ:cerr / إِلَّا:- / الصِّدْقَ:-", tr: "Doğrudan başkasını konuşma!", why: "لَا nâhiye + meczûm." },
    { s: "لِـ:mz / يَذْهَبْ:cerr / مُصْطَفَى:- / إِلَى:- / المَدْرَسَةِ:-", tr: "Mustafa okula gitsin.", why: "Lâm-ı emr: \"-sın\"." },
    { s: "لِـ:mz / تُحَافِظْ:cerr / عَلَى:- / حُقُوقِ:- / وَالِدَيْكَ:-", tr: "Anne babanın haklarını gözet.", why: "Lâm-ı emr + meczûm." },
    { s: "لِـ:mz / يَرْجِعْ:cerr / عَلِيٌّ:- / إِلَى:- / البَيْتِ:-", tr: "Ali eve dönsün.", why: "Lâm-ı emr + meczûm." }
  ],
  rules: [
    { tr: "<b class=\"r-mz\">Cezm edatları</b>: <span class=\"ar\">لَمْ</span>، <span class=\"ar\">لَا</span> (nâhiye: yasaklayan) ve <span class=\"ar\">لِـ</span> (lâm-ı emr: emreden)." },
    { tr: "Bunlardan biri gelince muzâri <b class=\"r-cerr\">meczûm</b> olur. Sonu sahih harf olan fiilde cezmin alameti <b>sükûn</b>dur.", ex: ["يَكْتُبُ خَلِيلٌ دَرْسَهُ ← لَمْ يَكْتُبْ خَلِيلٌ دَرْسَهُ", "تَأْكُلُ كَثِيرًا ← لَا تَأْكُلْ كَثِيرًا"] },
    { tr: "Üç hal yan yana: <b class=\"r-ref\">merfû</b> (damme), <b class=\"r-nasb\">mansûb</b> (fetha), <b class=\"r-cerr\">meczûm</b> (sükûn).", ex: ["يَكْتُبُ", "لَنْ يَكْتُبَ", "لَمْ يَكْتُبْ"] },
    { tr: "Dikkat: her لَا cezm etmez. Yasaklamıyor, sadece haber veriyorsa (<b>lâ-i nâfiye</b>) fiil merfû kalır.", ex: ["لَا تَدْخُلْ (girme!)", "لَا يَدْخُلُ الكَافِرُ الجَنَّةَ (girmez)"] },
    { tr: "Okuma notu: sükûnlu fiilden sonra ال gelirse, okurken sükûn kesreye döner.", ex: ["لَمْ يَحْضُرِ الطَّالِبُ", "لَا تَشْرَبِ المَاءَ"] }
  ],
  kaide: [
    "١ ـ لَمْ، لَا النَّاهِيَةُ وَلَامُ الأَمْرِ (لِـ) مِنَ الأَدَوَاتِ الجَازِمَةِ لِلْفِعْلِ المُضَارِعِ.",
    "٢ ـ يَكُونُ الفِعْلُ المُضَارِعُ مَجْزُومًا إِذَا دَخَلَتْ أَدَاةٌ مِنْ هَذِهِ الأَدَوَاتِ عَلَيْهِ: يَكْتُبُ خَلِيلٌ دَرْسَهُ ← لَمْ يَكْتُبْ خَلِيلٌ دَرْسَهُ.",
    "٣ ـ عَلَامَةُ الجَزْمِ السُّكُونُ فِي الفِعْلِ المُضَارِعِ الصَّحِيحِ الآخِرِ: تَأْكُلُ كَثِيرًا مِنَ الطَّعَامِ (مَرْفُوعٌ بِالضَّمَّةِ) ← لَا تَأْكُلْ كَثِيرًا مِنَ الطَّعَامِ (مَجْزُومٌ بِالسُّكُونِ)."
  ],
  ex: [
    { type: "irab", num: "١", tlist: EDAT_TUR, tlbl: "Önündeki edat", ar: "عَيِّنْ أَدَاةَ الجَزْمِ فِيمَا يَأْتِي مَعَ ضَبْطِ الفِعْلِ بَعْدَهَا", tr: "Fiilin sonu harekesiz verildi. Önündeki edat cezm mi, nasb mı, etkisiz mi? Sonra fiilin halini seç. Dikkat: üç cümlede cezm edatı yok!",
      exHtml: "<span class=\"ar\">لَا تَشْرَبِ المَاءَ البَارِدَ.</span>", items: [
      IR("لَمْ [يَحْضُر] الطَّالِبُ فِي الامْتِحَانِ.", "cezm", "cezm", "لَمْ → meczûm: يَحْضُرْ (ال'den önce okunuşta: لَمْ يَحْضُرِ الطَّالِبُ).", "Öğrenci sınava gelmedi."),
      IR("[لِتَعْمَل] وَاجِبَكَ فِي وَقْتِهِ.", "cezm", "cezm", "Lâm-ı emr → meczûm: لِتَعْمَلْ.", "Ödevini vaktinde yap."),
      IR("لَا [يَدْخُل] الكَافِرُ الجَنَّةَ.", "yok", "ref", "Bu لَا yasaklamıyor, haber veriyor (nâfiye): يَدْخُلُ merfû.", "Kâfir cennete girmez."),
      IR("لَنْ [أَسْتَيْقِظ] مُتَأَخِّرًا غَدًا.", "nasb", "nasb", "لَنْ nasb edatıdır: أَسْتَيْقِظَ.", "Yarın asla geç uyanmayacağım."),
      IR("[لِتُنَظِّف] خَدِيجَةُ البَيْتَ اليَوْمَ.", "cezm", "cezm", "Lâm-ı emr → meczûm: لِتُنَظِّفْ.", "Hatice bugün evi temizlesin."),
      IR("لَا [تَتْرُكنِي] وَحِيدًا هُنَا.", "cezm", "cezm", "لَا nâhiye → meczûm: لَا تَتْرُكْنِي.", "Beni burada yalnız bırakma."),
      IR("أُرِيدُ أَنْ [أُسَافِر] إِلَى اليَمَنِ.", "nasb", "nasb", "أَنْ nasb edatıdır: أُسَافِرَ.", "Yemen'e gitmek istiyorum."),
      IR("لَمْ [يَخْرُج] مِنَ البَيْتِ وَلَمْ يُكَلِّمْ أَحَدًا.", "cezm", "cezm", "لَمْ → يَخْرُجْ.", "Evden çıkmadı ve kimseyle konuşmadı."),
      IR("لَمْ يَخْرُجْ مِنَ البَيْتِ وَلَمْ [يُكَلِّم] أَحَدًا.", "cezm", "cezm", "لَمْ → يُكَلِّمْ.", "Evden çıkmadı ve kimseyle konuşmadı.")
    ]},
    { type: "combo", num: "٢", ar: "أَعِدِ الجُمَلَ التَّالِيَةَ مُبْتَدِئًا بِالأَدَاةِ الَّتِي بَيْنَ القَوْسَيْنِ", tr: "Cümleyi parantezdeki edatla yeniden kur; fiilin doğru şeklini seç.",
      exHtml: "<span class=\"ar\">يَجِبُ أَنْ تُحْسِنَ إِلَى الفُقَرَاءِ. (لِـ) ← لِتُحْسِنْ إِلَى الفُقَرَاءِ.</span>", items: [
      CB("تَرْجِعُ التِّلْمِيذَةُ إِلَى المَنْزِلِ. <span class=\"muted\">(لَمْ)</span>", ["لَمْ", ["تَرْجِعُ", "تَرْجِعَ", "تَرْجِعْ"], "التِّلْمِيذَةُ إِلَى المَنْزِلِ."], [2], "Kız öğrenci eve dönmedi.", "لَمْ + meczûm."),
      CB("تَتَكَلَّمُ بِصَوْتٍ مُرْتَفِعٍ. <span class=\"muted\">(لَا)</span>", ["لَا", ["تَتَكَلَّمُ", "تَتَكَلَّمَ", "تَتَكَلَّمْ"], "بِصَوْتٍ مُرْتَفِعٍ."], [2], "Yüksek sesle konuşma!", "لَا nâhiye + meczûm."),
      CB("تَذْهَبُ إِلَى أُسْرَتِكَ فِي العِيدِ. <span class=\"muted\">(لِـ)</span>", [["لِتَذْهَبُ", "لِتَذْهَبَ", "لِتَذْهَبْ"], "إِلَى أُسْرَتِكَ فِي العِيدِ."], [2], "Bayramda ailene git.", "Lâm-ı emr + meczûm. (لِتَذْهَبَ olsaydı \"gitmen için\" olurdu.)"),
      CB("يَسْكُنُ أَخِي فِي أُسْكُدَارَ. <span class=\"muted\">(لَمْ)</span>", ["لَمْ", ["يَسْكُنُ", "يَسْكُنَ", "يَسْكُنْ"], "أَخِي فِي أُسْكُدَارَ."], [2], "Kardeşim Üsküdar'da oturmadı.", "لَمْ + meczûm."),
      CB("تَجْلِسُ زَهْرَاءُ فِي مَكَانٍ مُرِيحٍ. <span class=\"muted\">(لِـ)</span>", [["لِتَجْلِسُ", "لِتَجْلِسَ", "لِتَجْلِسْ"], "زَهْرَاءُ فِي مَكَانٍ مُرِيحٍ."], [2], "Zehra rahat bir yerde otursun.", "Lâm-ı emr + meczûm."),
      CB("أَنْتَ تُنَاقِشُ صَدِيقَكَ كَثِيرًا. <span class=\"muted\">(لَا)</span>", ["لَا", ["تُنَاقِشُ", "تُنَاقِشَ", "تُنَاقِشْ"], "صَدِيقَكَ كَثِيرًا."], [2], "Arkadaşınla çok tartışma!", "لَا nâhiye + meczûm."),
      CB("أَسْكُنُ فِي هَذِهِ القَرْيَةِ. <span class=\"muted\">(لَمْ)</span>", ["لَمْ", ["أَسْكُنُ", "أَسْكُنَ", "أَسْكُنْ"], "فِي هَذِهِ القَرْيَةِ."], [2], "Bu köyde oturmadım.", "لَمْ + meczûm."),
      CB("يَجِبُ أَنْ تُمَارِسَ الرِّيَاضَةَ. <span class=\"muted\">(لِـ)</span>", [["لِتُمَارِسُ", "لِتُمَارِسَ", "لِتُمَارِسْ"], "الرِّيَاضَةَ."], [2], "Spor yap.", "Lâm-ı emr + meczûm (ال'den önce okunuşta: لِتُمَارِسِ الرِّيَاضَةَ).")
    ]}
  ]
},
// ---------------------------------------------------------------- 2 · لَمْ VE لَنْ
{
  id: "u2", no: 2, ar: "لَمْ وَلَنْ", tr: "لَمْ mi, لَنْ mi?", short: "لَمْ · لَنْ", col: "cerr", legend: ["mz", "mi", "cerr", "nasb"],
  goals: ["لَمْ'in geçmişi, لَنْ'in geleceği olumsuz yaptığını bilmek", "لَمْ'den sonra sükûn, لَنْ'den sonra fetha koymak", "Türkçe cümleye göre doğru edatı seçmek"],
  examples: [
    { s: "يَسْتَيْقِظُ:ref / أَحْمَدُ:- / السَّاعَةَ:- / السَّابِعَةَ:-", tr: "Ahmed saat yedide uyanır.", why: "Edat yok: merfû." },
    { s: "لَمْ:mz / يَسْتَيْقِظْ:cerr / أَحْمَدُ:- / السَّاعَةَ:- / السَّابِعَةَ:-", tr: "Ahmed saat yedide uyanmadı.", why: "لَمْ: geçmiş olumsuz, sükûn." },
    { s: "لَنْ:mi / يَسْتَيْقِظَ:nasb / أَحْمَدُ:- / السَّاعَةَ:- / السَّابِعَةَ:-", tr: "Ahmed saat yedide asla uyanmayacak.", why: "لَنْ: gelecek olumsuz, fetha." }
  ],
  rules: [
    { tr: "<span class=\"ar\">لَمْ</span> muzâriye gelir ama anlamı <b>geçmiş</b> zamana çevirir ve olumsuz yapar: \"-medi\". Fiil <b class=\"r-cerr\">meczûm</b>.", ex: ["لَمْ يَكْتُبْ (yazmadı)"] },
    { tr: "<span class=\"ar\">لَنْ</span> <b>geleceği</b> olumsuz yapar: \"asla -meyecek\". Fiil <b class=\"r-nasb\">mansûb</b>.", ex: ["لَنْ يَكْتُبَ (asla yazmayacak)"] },
    { tr: "Hatırlama yolu: <b>لَمْ → mim → mâzi (geçmiş) → sükûn</b>; <b>لَنْ → nun → gelecek → fetha</b>." },
    { tr: "Beş fiilde ikisinde de nun düşer: <span class=\"ar\">لَمْ يَذْهَبُوا · لَنْ يَذْهَبُوا</span>. Farkı anlam söyler." }
  ],
  kaide: [
    "لَمْ مِنْ أَدَوَاتِ الجَزْمِ وَلَنْ مِنْ أَدَوَاتِ النَّصْبِ.",
    "يَسْتَيْقِظُ أَحْمَدُ السَّاعَةَ السَّابِعَةَ ← لَمْ يَسْتَيْقِظْ أَحْمَدُ السَّاعَةَ السَّابِعَةَ ← لَنْ يَسْتَيْقِظَ أَحْمَدُ السَّاعَةَ السَّابِعَةَ."
  ],
  ex: [
    { type: "combo", num: "٤", ar: "حَوِّلْ إِلَى صِيغَةِ النَّفْيِ مُسْتَعْمِلًا «لَمْ» مَرَّةً وَ«لَنْ» مَرَّةً أُخْرَى", tr: "Her cümleyi önce لَمْ ile (geçmiş), sonra لَنْ ile (gelecek) olumsuz yap.",
      exHtml: "<span class=\"ar\">يَسْتَيْقِظُ أَحْمَدُ السَّاعَةَ السَّابِعَةَ ← لَمْ يَسْتَيْقِظْ … · لَنْ يَسْتَيْقِظَ …</span>", items: [].concat.apply([], [
        ["يَتَنَاوَلُ أَحْمَدُ الفَطُورَ فِي المَطْبَخِ.", "يَتَنَاوَل", "أَحْمَدُ الفَطُورَ فِي المَطْبَخِ.", "Ahmed kahvaltıyı mutfakta yapmadı.", "Ahmed kahvaltıyı mutfakta asla yapmayacak."],
        ["تَغْسِلُ خَدِيجَةُ وَجْهَهَا فِي الحَمَّامِ.", "تَغْسِل", "خَدِيجَةُ وَجْهَهَا فِي الحَمَّامِ.", "Hatice yüzünü banyoda yıkamadı.", "Hatice yüzünü banyoda asla yıkamayacak."],
        ["يُكْرِمُ مُحَمَّدٌ أَصْدِقَاءَهُ فِي بَيْتِهِ.", "يُكْرِم", "مُحَمَّدٌ أَصْدِقَاءَهُ فِي بَيْتِهِ.", "Muhammed arkadaşlarını evinde ağırlamadı.", "Muhammed arkadaşlarını evinde asla ağırlamayacak."],
        ["يَرْكَبُ الرَّجُلُ سَيَّارَتَهُ بِسُرْعَةٍ.", "يَرْكَب", "الرَّجُلُ سَيَّارَتَهُ بِسُرْعَةٍ.", "Adam arabasına hızla binmedi.", "Adam arabasına asla hızla binmeyecek."],
        ["يَتَّصِلُ الطَّالِبُ بِأُسْرَتِهِ كُلَّ يَوْمٍ.", "يَتَّصِل", "الطَّالِبُ بِأُسْرَتِهِ كُلَّ يَوْمٍ.", "Öğrenci ailesini her gün aramadı.", "Öğrenci ailesini her gün aramayacak."],
        ["يَرْجِعُ العَامِلُ إِلَى بَيْتِهِ مَسَاءً.", "يَرْجِع", "العَامِلُ إِلَى بَيْتِهِ مَسَاءً.", "İşçi akşam evine dönmedi.", "İşçi akşam evine asla dönmeyecek."],
        ["تُقَابِلُ فَاطِمَةُ صَدِيقَتَهَا فِي المَحَطَّةِ.", "تُقَابِل", "فَاطِمَةُ صَدِيقَتَهَا فِي المَحَطَّةِ.", "Fâtıma arkadaşıyla istasyonda buluşmadı.", "Fâtıma arkadaşıyla istasyonda asla buluşmayacak."],
        ["يَقْرَأُ خَالِدٌ فِي غُرْفَةِ الجُلُوسِ.", "يَقْرَأ", "خَالِدٌ فِي غُرْفَةِ الجُلُوسِ.", "Hâlid oturma odasında okumadı.", "Hâlid oturma odasında asla okumayacak."]
      ].map(function (r) {
        var f = [r[1] + "ُ", r[1] + "َ", r[1] + "ْ"];
        return [CB(r[0] + " <b class=\"r-cerr\">→ لَمْ</b>", ["لَمْ", f, r[2]], [2], r[3], "لَمْ: geçmiş olumsuz → sükûn."),
                CB(r[0] + " <b class=\"r-nasb\">→ لَنْ</b>", ["لَنْ", f, r[2]], [1], r[4], "لَنْ: gelecek olumsuz → fetha.")];
      }))
    },
    { type: "pick", num: "+", extra: true, ar: "لَمْ أَمْ لَنْ؟", tr: "Ek alıştırma: Türkçe cümleye uyan Arapçayı seç. Geçmiş mi, gelecek mi?", items: [
      { q: "Dün okula gitmedim.", o: ["لَمْ أَذْهَبْ إِلَى المَدْرَسَةِ أَمْسِ.", "لَنْ أَذْهَبَ إِلَى المَدْرَسَةِ أَمْسِ."], a: 0, why: "Geçmiş (dün) → لَمْ + sükûn." },
      { q: "Yarın okula gitmeyeceğim.", o: ["لَمْ أَذْهَبْ إِلَى المَدْرَسَةِ غَدًا.", "لَنْ أَذْهَبَ إِلَى المَدْرَسَةِ غَدًا."], a: 1, why: "Gelecek (yarın) → لَنْ + fetha." },
      { q: "Ali kahvaltı yapmadı.", o: ["لَمْ يَتَنَاوَلْ عَلِيٌّ الفَطُورَ.", "لَنْ يَتَنَاوَلَ عَلِيٌّ الفَطُورَ."], a: 0, why: "Geçmiş → لَمْ." },
      { q: "Bir daha asla yalan söylemeyeceğim.", o: ["لَمْ أَكْذِبْ بَعْدَ اليَوْمِ.", "لَنْ أَكْذِبَ بَعْدَ اليَوْمِ."], a: 1, why: "Gelecek → لَنْ." },
      { q: "Geçen yıl hacca gitmedi.", o: ["لَمْ يَحُجَّ فِي السَّنَةِ المَاضِيَةِ.", "لَنْ يَحُجَّ فِي السَّنَةِ المَاضِيَةِ."], a: 0, why: "Geçmiş → لَمْ. (Şeddeli fiilde cezm fethayla okunur: لَمْ يَحُجَّ.)" },
      { q: "Gelecek ay seyahat etmeyecekler.", o: ["لَمْ يُسَافِرُوا الشَّهْرَ القَادِمَ.", "لَنْ يُسَافِرُوا الشَّهْرَ القَادِمَ."], a: 1, why: "Gelecek → لَنْ. İkisinde de nun düşer; farkı anlam belirler." }
    ]}
  ]
},
// ---------------------------------------------------------------- 3 · LÂ-İ NÂHİYE VE LÂM-I EMR
{
  id: "u3", no: 3, ar: "لَا النَّاهِيَةُ وَلَامُ الأَمْرِ", tr: "Lâ-i Nâhiye ve Lâm-ı Emr", short: "لَا · لِـ", col: "ref", legend: ["mz", "cerr"],
  goals: ["لَا nâhiye ile yasak (\"yapma!\") kurmak", "Lâm-ı emr ile emir (\"yapsın\") kurmak", "Lâm-ı emri lâm-ı ta'lîlden, lâ-i nâhiyeyi lâ-i nâfiyeden ayırmak"],
  examples: [
    { s: "سَأَعْمَلُ:ref / عَمَلِي:- / صَبَاحًا:-", tr: "İşimi sabah yapacağım.", why: "Merfû." },
    { s: "لَا:mz / تَعْمَلْ:cerr / عَمَلَكَ:- / صَبَاحًا:-", tr: "İşini sabah yapma!", why: "لَا nâhiye: 2. şahıs + sükûn. سَـ düşer." },
    { s: "لِـ:mz / تَجْتَهِدْ:cerr / كَثِيرًا:-", tr: "Çok çalış!", why: "Lâm-ı emr: emir anlamı + sükûn." },
    { s: "لِـ:mi / تَجْتَهِدَ:nasb / كَثِيرًا:-", tr: "…çok çalışman için", why: "Aynı لِـ, ama lâm-ı ta'lîl: amaç + fetha." }
  ],
  rules: [
    { tr: "<b>Lâ-i nâhiye</b> (<span class=\"ar\">لَا</span>): olumsuz emir, \"yapma!\". Çoğunlukla 2. şahısla gelir; fiil meczûm.", ex: ["لَا تَأْكُلْ", "لَا تَحْضُرْ مُتَأَخِّرًا"] },
    { tr: "<b>Lâm-ı emr</b> (<span class=\"ar\">لِـ</span>): \"yapsın, yapmalı\". Çoğunlukla 3. şahısla gelir; fiil meczûm. <span class=\"ar\">وَ</span> ya da <span class=\"ar\">فَ</span>'dan sonra lâm sakin okunur.", ex: ["لِيَذْهَبْ مُصْطَفَى", "فَلْيُنْفِقْ", "وَلْيَكْتُبْ"] },
    { tr: "İki <span class=\"ar\">لِـ</span>: <b>lâm-ı emr</b> cezm eder (\"gitsin\": <span class=\"ar\">لِيَذْهَبْ</span>), <b>lâm-ı ta'lîl</b> nasb eder (\"gitmesi için\": <span class=\"ar\">لِيَذْهَبَ</span>). Anlama bak." },
    { tr: "İki <span class=\"ar\">لَا</span>: <b>nâhiye</b> cezm eder (\"girme!\": <span class=\"ar\">لَا تَدْخُلْ</span>), <b>nâfiye</b> etkisizdir (\"girmez\": <span class=\"ar\">لَا يَدْخُلُ</span>)." },
    { tr: "Nasblı yapıyı cezme çevirirken edat değişir, fiilin sonu fethadan sükûna döner.", ex: ["يَجِبُ أَنْ تَجْتَهِدَ ← لِتَجْتَهِدْ", "لَنْ يَرْجِعَ ← لَمْ يَرْجِعْ"] }
  ],
  kaide: ["لَا النَّاهِيَةُ وَلَامُ الأَمْرِ (لِـ) مِنَ الأَدَوَاتِ الجَازِمَةِ لِلْفِعْلِ المُضَارِعِ: لَا تَأْكُلْ كَثِيرًا. لِيَذْهَبْ مُصْطَفَى إِلَى المَدْرَسَةِ."],
  ex: [
    { type: "combo", num: "٥", ar: "أَدْخِلْ «لَا النَّاهِيَةَ» عَلَى الجُمَلِ التَّالِيَةِ ثُمَّ اضْبِطِ الفِعْلَ", tr: "Cümleyi karşındakine yasak olarak söyle: لَا + 2. şahıs + sükûn. سَـ düşer.",
      exHtml: "<span class=\"ar\">سَأَعْمَلُ عَمَلِي صَبَاحًا ← لَا تَعْمَلْ عَمَلَكَ صَبَاحًا.</span>", items: [
      CB("أَحْضُرُ إِلَى البَيْتِ مُتَأَخِّرًا.", ["لَا", ["أَحْضُرْ", "تَحْضُرُ", "تَحْضُرْ", "تَحْضُرَ"], "إِلَى البَيْتِ مُتَأَخِّرًا."], [2], "Eve geç gelme!", "2. şahıs ve sükûn: لَا تَحْضُرْ."),
      CB("سَأُسَافِرُ إِلَى دِمَشْقَ فِي الصَّيْفِ.", ["لَا", ["سَتُسَافِرُ", "تُسَافِرَ", "تُسَافِرْ", "أُسَافِرْ"], "إِلَى دِمَشْقَ فِي الصَّيْفِ."], [2], "Yazın Şam'a gitme!", "سَـ düşer: لَا تُسَافِرْ."),
      CB("أَكْتُبُ التَّقْرِيرَ آخِرَ الأُسْبُوعِ.", ["لَا", ["أَكْتُبْ", "تَكْتُبُ", "تَكْتُبْ", "تَكْتُبَ"], "التَّقْرِيرَ آخِرَ الأُسْبُوعِ."], [2], "Raporu hafta sonunda yazma!", "لَا تَكْتُبْ (okunuşta: لَا تَكْتُبِ التَّقْرِيرَ)."),
      CB("أَقْلَقُ عَلَى هَذَا الوَلَدِ.", ["لَا", ["أَقْلَقْ", "تَقْلَقُ", "تَقْلَقْ", "تَقْلَقَ"], "عَلَى هَذَا الوَلَدِ."], [2], "Bu çocuk için endişelenme!", "لَا تَقْلَقْ."),
      CB("سَأَقْرَأُ هَذِهِ الحِكَايَةَ عَلَى أَوْلَادِي.", ["لَا", ["سَتَقْرَأُ", "تَقْرَأَ", "تَقْرَأْ", "أَقْرَأْ"], "هَذِهِ الحِكَايَةَ عَلَى", ["أَوْلَادِي", "أَوْلَادِكَ"]], [2, 1], "Bu hikâyeyi çocuklarına okuma!", "لَا تَقْرَأْ; zamir de 2. şahıs: أَوْلَادِكَ."),
      CB("أَشْرَبُ المَاءَ البَارِدَ بَعْدَ المُبَارَاةِ.", ["لَا", ["أَشْرَبْ", "تَشْرَبُ", "تَشْرَبْ", "تَشْرَبَ"], "المَاءَ البَارِدَ بَعْدَ المُبَارَاةِ."], [2], "Maçtan sonra soğuk su içme!", "لَا تَشْرَبْ (okunuşta: لَا تَشْرَبِ المَاءَ)."),
      CB("أَقْرَأُ كَثِيرًا بَعْدَ الظُّهْرِ.", ["لَا", ["أَقْرَأْ", "تَقْرَأُ", "تَقْرَأْ", "تَقْرَأَ"], "كَثِيرًا بَعْدَ الظُّهْرِ."], [2], "Öğleden sonra çok okuma!", "لَا تَقْرَأْ."),
      CB("سَأَذْكُرُ هَذَا لِعُثْمَانَ.", ["لَا", ["سَتَذْكُرُ", "تَذْكُرَ", "تَذْكُرْ", "أَذْكُرْ"], "هَذَا لِعُثْمَانَ."], [2], "Bunu Osman'a söyleme!", "سَـ düşer: لَا تَذْكُرْ.")
    ]},
    { type: "combo", num: "٦", ar: "حَوِّلِ المُضَارِعَ المَنْصُوبَ إِلَى صِيغَةِ الجَزْمِ مُسْتَعِينًا بِالأَدَاةِ الَّتِي بَيْنَ القَوْسَيْنِ", tr: "Nasblı cümleyi parantezdeki cezm edatıyla kur. Fetha sükûna döner.",
      exHtml: "<span class=\"ar\">أُحِبُّ أَنْ أَشْرَبَ الشَّايَ بِالسُّكَّرِ الكَثِيرِ. (لَا) ← لَا تَشْرَبِ الشَّايَ بِالسُّكَّرِ الكَثِيرِ.</span>", items: [
      CB("يَجِبُ أَنْ تَجْتَهِدَ كَثِيرًا. <span class=\"muted\">(لِـ)</span>", [["لِتَجْتَهِدَ", "لِتَجْتَهِدُ", "لِتَجْتَهِدْ"], "كَثِيرًا."], [2], "Çok çalış!", "Lâm-ı emr → sükûn. (لِتَجْتَهِدَ \"çalışman için\" olurdu.)"),
      CB("لَنْ يَرْجِعَ أَحْمَدُ فِي وَقْتِهِ. <span class=\"muted\">(لَمْ)</span>", ["لَمْ", ["يَرْجِعَ", "يَرْجِعُ", "يَرْجِعْ"], "أَحْمَدُ فِي وَقْتِهِ."], [2], "Ahmed vaktinde dönmedi.", "لَنْ ← لَمْ: fetha sükûna döner."),
      CB("لَنْ تَجْتَمِعَ بِأَصْدِقَائِكَ فِي مَنْزِلِي. <span class=\"muted\">(لَا)</span>", ["لَا", ["تَجْتَمِعَ", "تَجْتَمِعُ", "تَجْتَمِعْ"], "بِأَصْدِقَائِكَ فِي مَنْزِلِي."], [2], "Arkadaşlarınla benim evimde toplanma!", "لَا nâhiye → sükûn."),
      CB("لَنْ تُكَلِّمَ زَيْنَبَ. <span class=\"muted\">(لِـ)</span>", [["لِتُكَلِّمَ", "لِتُكَلِّمُ", "لِتُكَلِّمْ"], "زَيْنَبَ."], [2], "Zeyneb'le konuş!", "Lâm-ı emr → sükûn."),
      CB("يَجِبُ أَنْ تُخْلِصَ فِي عَمَلِكَ. <span class=\"muted\">(لِـ)</span>", [["لِتُخْلِصَ", "لِتُخْلِصُ", "لِتُخْلِصْ"], "فِي عَمَلِكَ."], [2], "İşinde ihlaslı ol!", "Lâm-ı emr → sükûn."),
      CB("يُحَاوِلُ أَنْ يُقَدِّمَ هَذَا المَشْرُوعَ. <span class=\"muted\">(لَمْ)</span>", ["لَمْ", ["يُحَاوِلُ", "يُحَاوِلَ", "يُحَاوِلْ"], "أَنْ", ["يُقَدِّمُ", "يُقَدِّمَ", "يُقَدِّمْ"], "هَذَا المَشْرُوعَ."], [2, 1], "Bu projeyi sunmaya çalışmadı.", "لَمْ ilk fiili meczûm yapar; أَنْ'den sonraki fiil mansûb kalır."),
      CB("يَجِبُ أَنْ تُنَاقِشَ هَذِهِ المَسْأَلَةَ مَعَ أُخْتِكَ. <span class=\"muted\">(لَا)</span>", ["لَا", ["تُنَاقِشَ", "تُنَاقِشُ", "تُنَاقِشْ"], "هَذِهِ المَسْأَلَةَ مَعَ أُخْتِكَ."], [2], "Bu meseleyi kız kardeşinle tartışma!", "لَا nâhiye → sükûn."),
      CB("يَنْبَغِي أَنْ تَعْتَذِرَ مِنْ زَمِيلِكَ. <span class=\"muted\">(لِـ)</span>", [["لِتَعْتَذِرَ", "لِتَعْتَذِرُ", "لِتَعْتَذِرْ"], "مِنْ زَمِيلِكَ."], [2], "Arkadaşından özür dile!", "Lâm-ı emr → sükûn.")
    ]},
    { type: "classify", num: "+", extra: true, opts: [["emr", "Lâm-ı emr (cezm)", "لَامُ الأَمْرِ", "x"], ["talil", "Lâm-ı ta'lîl (nasb)", "لَامُ التَّعْلِيلِ", "x"]], ar: "لَامُ الأَمْرِ أَمْ لَامُ التَّعْلِيلِ؟", tr: "Ek alıştırma: harekeye ve anlama bak. Bu لِـ emir mi veriyor, amaç mı bildiriyor?", items: [
      { s: "لِيَذْهَبْ مُصْطَفَى إِلَى المَدْرَسَةِ.", a: "emr", why: "Sükûn ve emir: Mustafa okula gitsin.", tr: "Mustafa okula gitsin." },
      { s: "سَافَرَ مُحَمَّدٌ لِيَعْمَلَ فِي شَرِكَةٍ.", a: "talil", why: "Fetha ve amaç: çalışmak için.", tr: "Muhammed bir şirkette çalışmak için yolculuk etti." },
      { s: "لِتُحَافِظْ عَلَى حُقُوقِ وَالِدَيْكَ.", a: "emr", why: "Sükûn: emir.", tr: "Anne babanın haklarını gözet." },
      { s: "نَظَرْتُ إِلَى البَحْرِ لِأَتَمَتَّعَ بِجَمَالِهِ.", a: "talil", why: "Fetha: amaç.", tr: "Güzelliğinin tadını çıkarmak için denize baktım." },
      { s: "فَلْيُنْفِقْ مِمَّا آتَاهُ اللَّهُ", a: "emr", why: "فَ'dan sonra sakin lâm: emir.", tr: "Allah'ın kendisine verdiğinden harcasın." },
      { s: "دَخَلَ المُدِيرُ المَصْنَعَ لِيَجْتَمِعَ بِالمُهَنْدِسِينَ.", a: "talil", why: "Fetha: amaç.", tr: "Müdür mühendislerle toplanmak için fabrikaya girdi." },
      { s: "لِيَرْجِعْ عَلِيٌّ إِلَى البَيْتِ.", a: "emr", why: "Sükûn: emir.", tr: "Ali eve dönsün." },
      { s: "اسْتَيْقَظْتُ مُبَكِّرًا لِأُصَلِّيَ الفَجْرَ.", a: "talil", why: "Fetha: amaç.", tr: "Sabah namazını kılmak için erken kalktım." }
    ]}
  ]
},
// ---------------------------------------------------------------- 4 · NASB MI CEZM Mİ
{
  id: "u4", no: 4, ar: "النَّصْبُ أَمِ الجَزْمُ؟", tr: "Nasb mı, Cezm mi?", short: "Nasb mı cezm mi", col: "nasb", legend: ["mi", "nasb", "mz", "cerr"],
  goals: ["Nasb ve cezm edatlarını iki ayrı grupta toplamak", "Edata göre fiile fetha ya da sükûn koymak", "Boşluğa anlama uyan edatı kendin seçmek"],
  examples: [
    { s: "يُمْكِنُ:- / أَنْ:mi / تَنْزِلَ:nasb / مِنَ:- / السَّيَّارَةِ:-", tr: "Arabadan inebilirsin.", why: "Nasb edatı → fetha." },
    { s: "لَمْ:mz / يَحْضُرْ:cerr / حَمْزَةُ:- / إِلَى:- / الصَّفِّ:-", tr: "Hamza sınıfa gelmedi.", why: "Cezm edatı → sükûn." },
    { s: "اقْتَرِبْ:- / مِنِّي:- / حَتَّى:mi / تَسْمَعَ:nasb / مَا:- / أَقُولُ:ref", tr: "Söylediğimi duyman için bana yaklaş.", why: "تَسْمَعَ mansûb; أَقُولُ merfû (edatsız)." }
  ],
  rules: [
    { tr: "<b class=\"r-mi\">Nasb edatları</b> (fetha): <span class=\"ar\">أَنْ، لَنْ، كَيْ، لِكَيْ، لِـ (ta'lîl)، حَتَّى</span>." },
    { tr: "<b class=\"r-mz\">Cezm edatları</b> (sükûn): <span class=\"ar\">لَمْ، لَا (nâhiye)، لِـ (emr)</span>." },
    { tr: "Edat yoksa (ya da لَا nâfiye ise) fiil <b class=\"r-ref\">merfû</b>dur (damme)." },
    { tr: "Anlam rehberi: \"-mek / -mesi\" → <span class=\"ar\">أَنْ</span>; \"asla -meyecek\" → <span class=\"ar\">لَنْ</span>; \"-mek için\" → <span class=\"ar\">كَيْ / لِـ / حَتَّى</span>; \"-medi\" → <span class=\"ar\">لَمْ</span>; \"yapma!\" → <span class=\"ar\">لَا</span>; \"yapsın\" → <span class=\"ar\">لِـ</span>." }
  ],
  kaide: ["أَدَوَاتُ النَّصْبِ: أَنْ – لَنْ – كَيْ – لِكَيْ – لَامُ التَّعْلِيلِ – حَتَّى. أَدَوَاتُ الجَزْمِ: لَمْ – لَا النَّاهِيَةُ – لَامُ الأَمْرِ."],
  ex: [
    { type: "pick", fill: true, num: "٣", ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الفِعْلِ المُنَاسِبِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Önündeki edata bak: nasb edatı mı (fetha), cezm edatı mı (sükûn), edat yok mu (damme)?", exHtml: "<span class=\"ar\">لَا تُسْرِعْ بِسَيَّارَتِكَ فِي الطَّرِيقِ. (تُسْرِعُ – تُسْرِعَ – تُسْرِعْ)</span>", items: [
      { q: "دَخَلَ المُدِيرُ المَصْنَعَ لِـ___ بِالمُهَنْدِسِينَ.", o: ["يَجْتَمِعُ", "يَجْتَمِعَ", "يَجْتَمِعْ"], a: 1, tr: "Müdür mühendislerle toplanmak için fabrikaya girdi.", why: "Amaç bildiren lâm-ı ta'lîl → fetha." },
      { q: "يُمْكِنُ أَنْ ___ مِنَ السَّيَّارَةِ الآنَ.", o: ["تَنْزِلُ", "تَنْزِلَ", "تَنْزِلْ"], a: 1, tr: "Şimdi arabadan inebilirsin.", why: "أَنْ → fetha." },
      { q: "لَمْ ___ حَمْزَةُ إِلَى الصَّفِّ أَمْسِ.", o: ["يَحْضُرُ", "يَحْضُرَ", "يَحْضُرْ"], a: 2, tr: "Hamza dün sınıfa gelmedi.", why: "لَمْ → sükûn." },
      { q: "اقْتَرِبْ مِنِّي حَتَّى ___ مَا أَقُولُ.", o: ["تَسْمَعُ", "تَسْمَعَ", "تَسْمَعْ"], a: 1, tr: "Söylediğimi duyman için bana yaklaş.", why: "حَتَّى → fetha." },
      { q: "لَنْ ___ مَعَكَ غَدًا.", o: ["أَخْرُجُ", "أَخْرُجَ", "أَخْرُجْ"], a: 1, tr: "Yarın seninle çıkmayacağım.", why: "لَنْ → fetha." },
      { q: "لَا ___ فِي الغَابَةِ لَيْلًا.", o: ["تَتَجَوَّلُ", "تَتَجَوَّلَ", "تَتَجَوَّلْ"], a: 2, tr: "Gece ormanda dolaşma!", why: "لَا nâhiye → sükûn." },
      { q: "فَتَحَ التِّلْفَازَ كَيْ ___ الأَخْبَارَ.", o: ["يُشَاهِدُ", "يُشَاهِدَ", "يُشَاهِدْ"], a: 1, tr: "Haberleri izlemek için televizyonu açtı.", why: "كَيْ → fetha." },
      { q: "نَظَرْتُ إِلَى البَحْرِ لِـ___ مِنْ جَمَالِهِ.", o: ["أَتَمَتَّعُ", "أَتَمَتَّعَ", "أَتَمَتَّعْ"], a: 1, tr: "Güzelliğinin tadını çıkarmak için denize baktım.", why: "Amaç bildiren lâm-ı ta'lîl → fetha." }
    ]},
    { type: "combo", num: "٧", ar: "امْلَأِ الفَرَاغَ بِأَدَاةٍ مُنَاسِبَةٍ مِنَ الأَدَوَاتِ النَّاصِبَةِ وَالجَازِمَةِ وَاضْبِطِ الفِعْلَ", tr: "Önce edat kutusuna dokunarak anlama uyan edatı bul, sonra fiilin sonunu seç. Amaç anlamında كَيْ، حَتَّى ve لِـ'nin hepsi doğru sayılır.",
      exHtml: "<span class=\"ar\">انْتَبِهْ يَا كَرِيمُ، حَتَّى تَفْهَمَ الدَّرْسَ.</span>", items: [
      CB("أرادت الوالدة ... تشتري عسلا من السوق.", ["أَرَادَتِ الوَالِدَةُ", E7, ["تَشْتَرِي", "تَشْتَرِيَ", "تَشْتَرِ"], "عَسَلًا مِنَ السُّوقِ."], [0, 1], "Anne çarşıdan bal almak istedi.", "أَرَادَتْ أَنْ… → fetha (yâ üzerinde)."),
      CB("... يذهب العاملان إلى المصنع غدا.", [E7, ["يَذْهَبُ", "يَذْهَبَ", "يَذْهَبْ"], "العَامِلَانِ إِلَى المَصْنَعِ غَدًا."], [[1, 1], [4, 2]], "İki işçi yarın fabrikaya asla gitmeyecek. / …gitsinler.", "Gelecek olumsuz: لَنْ يَذْهَبَ. Emir anlamında لِيَذْهَبِ de olur."),
      CB("اجتهدت كثيرا ... أنجح في الامتحان.", ["اجْتَهَدْتُ كَثِيرًا", E7, ["أَنْجَحُ", "أَنْجَحَ", "أَنْجَحْ"], "فِي الامْتِحَانِ."], AM([], [1]), "Sınavda başarılı olmak için çok çalıştım.", "Amaç: كَيْ / حَتَّى / لِـ + fetha."),
      CB("لماذا ... تحفظ هذه الأبيات أمس؟", ["لِمَاذَا", E7, ["تَحْفَظُ", "تَحْفَظَ", "تَحْفَظْ"], "هَذِهِ الأَبْيَاتَ أَمْسِ؟"], [5, 2], "Dün bu beyitleri neden ezberlemedin?", "أَمْسِ geçmiş → لَمْ + sükûn."),
      CB("... تعمل عملك في وقته دائما.", [E7, ["تَعْمَلُ", "تَعْمَلَ", "تَعْمَلْ"], "عَمَلَكَ فِي وَقْتِهِ دَائِمًا."], [4, 2], "İşini her zaman vaktinde yap!", "Emir: lâm-ı emr + sükûn: لِتَعْمَلْ."),
      CB("... تتأخر عن النوم في الليل.", [E7, ["تَتَأَخَّرُ", "تَتَأَخَّرَ", "تَتَأَخَّرْ"], "عَنِ النَّوْمِ فِي اللَّيْلِ."], [6, 2], "Gece uyumayı geciktirme!", "Yasak: لَا + sükûn."),
      CB("فتحت النافذة ... يتجدد الهواء.", ["فَتَحْتُ النَّافِذَةَ", E7, ["يَتَجَدَّدُ", "يَتَجَدَّدَ", "يَتَجَدَّدْ"], "الهَوَاءُ."], AM([], [1]), "Hava tazelensin diye pencereyi açtım.", "Amaç → fetha."),
      CB("أسرعت ... أدرك القطار.", ["أَسْرَعْتُ", E7, ["أُدْرِكُ", "أُدْرِكَ", "أُدْرِكْ"], "القِطَارَ."], AM([], [1]), "Trene yetişmek için acele ettim.", "Amaç → fetha.")
    ]}
  ]
},
// ---------------------------------------------------------------- 5 · KUR'AN VE OKUMA
{
  id: "u5", no: 5, ar: "القُرْآنُ وَالقِرَاءَةُ", tr: "Kur'an'da ve Okumada", short: "Kur'an · okuma", col: "mi", legend: ["mz", "cerr", "mi", "nasb"],
  goals: ["Âyetlerde cezm edatlarını bulmak", "Sonu illetli fiillerde cezmin harf düşürmekle olduğunu görmek (ileri bilgi)", "Bir metinde nasb ve cezm edatlarını birlikte bulmak"],
  examples: [
    { s: "لَمْ:mz / يَلِدْ:cerr / وَلَمْ:mz / يُولَدْ:cerr", tr: "O doğurmamış ve doğurulmamıştır. (İhlâs 3)", why: "Sahih fiil: sükûn." },
    { s: "يَا:- / مُوسَى:- / لَا:mz / تَخَفْ:cerr", tr: "Ey Mûsâ, korkma! (Neml 10)", why: "تَخَافُ ← لَا تَخَفْ: ortadaki elif düştü." },
    { s: "وَلَا:mz / يَأْبَ:cerr / كَاتِبٌ:-", tr: "Kâtip (yazmaktan) kaçınmasın. (Bakara 282)", why: "يَأْبَى ← لَا يَأْبَ: sondaki elif düştü." }
  ],
  rules: [
    { tr: "Âyetlerde lâm-ı emr çoğunlukla <span class=\"ar\">وَ / فَ</span>'dan sonra sakin gelir.", ex: ["فَلْيُنْفِقْ", "وَلْيَكْتُبْ", "وَلْيَتَّقِ"] },
    { tr: "<b>İleri bilgi</b>: sonu illet harfi (<span class=\"ar\">ا، و، ي</span>) olan fiilde cezmin alameti o harfin düşmesidir.", ex: ["يَأْبَى ← لَا يَأْبَ", "يَتَّقِي ← وَلْيَتَّقِ", "تَنْسَى ← لَا تَنْسَ"] },
    { tr: "Ortası illetli fiilde (<span class=\"ar\">يَكُونُ، يَخَافُ</span>) sükûn gelince ortadaki harf düşer.", ex: ["يَكُونُ ← لَمْ يَكُنْ", "تَخَافُ ← لَا تَخَفْ"] },
    { tr: "Beş fiilde nun düşer: <span class=\"ar\">لَمْ يَذْهَبُوا</span>. Âyetteki <span class=\"ar\">أَنْ يَكُونُوا</span> ise nasbdır." },
    { tr: "Tuzaklar: <span class=\"ar\">لَا يُؤْمِنُونَ، لَا يُكَلِّفُ، لَا يَخَافُ</span> lâ-i nâfiyedir; fiil merfû." }
  ],
  kaide: ["عَلَامَةُ الجَزْمِ السُّكُونُ فِي الفِعْلِ المُضَارِعِ الصَّحِيحِ الآخِرِ."],
  ex: [
    { type: "find", target: "y", num: "٨", ar: "عَيِّنْ أَدَوَاتِ الجَزْمِ لِلْفِعْلِ المُضَارِعِ فِي الآيَاتِ التَّالِيَةِ", tr: "Âyetlerde cezm edatlarına dokun (وَلَمْ، فَلْيُنْفِقْ gibi bitişik yazılanlarda kelimenin tamamına). Tuzaklar: أَنْ nasb edatıdır, لَا يُؤْمِنُونَ'daki لَا etkisizdir.", items: [
      W("يَا أَيُّهَا الَّذِينَ آمَنُوا [لَا] يَسْخَرْ قَوْمٌ مِنْ قَوْمٍ عَسَى أَنْ يَكُونُوا خَيْرًا مِنْهُمْ", "Ey iman edenler! Bir topluluk diğerini alaya almasın; belki onlar kendilerinden daha hayırlıdır. (Hucurât 11)", "لَا nâhiye → يَسْخَرْ. أَنْ يَكُونُوا nasbdır (nun düştü)."),
      W("وَإِذْ بَوَّأْنَا لِإِبْرَاهِيمَ مَكَانَ الْبَيْتِ أَنْ [لَا] تُشْرِكْ بِي شَيْئًا", "Hani İbrahim'e Beyt'in yerini hazırlamış ve 'Bana hiçbir şeyi ortak koşma' demiştik. (Hac 26)", "لَا nâhiye → تُشْرِكْ. Buradaki أَنْ \"yani\" anlamındadır, fiili etkilemez."),
      W("وَلَّى مُدْبِرًا [وَلَمْ] يُعَقِّبْ يَا مُوسَى [لَا] تَخَفْ إِنِّي لَا يَخَافُ لَدَيَّ الْمُرْسَلُونَ", "Arkasına bakmadan döndü kaçtı. 'Ey Mûsâ, korkma! Benim huzurumda peygamberler korkmaz.' (Neml 10)", "لَمْ يُعَقِّبْ, لَا تَخَفْ (elif düştü). لَا يَخَافُ nâfiyedir."),
      W("[لِيُنْفِقْ] ذُو سَعَةٍ مِنْ سَعَتِهِ وَمَنْ قُدِرَ عَلَيْهِ رِزْقُهُ [فَلْيُنْفِقْ] مِمَّا آتَاهُ اللَّهُ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا مَا آتَاهَا", "Varlıklı olan, varlığına göre harcasın; rızkı daraltılmış olan da Allah'ın kendisine verdiğinden harcasın. Allah kimseye verdiğinden fazlasını yüklemez. (Talâk 7)", "İki lâm-ı emr. لَا يُكَلِّفُ nâfiyedir."),
      W("فَاكْتُبُوهُ [وَلْيَكْتُبْ] بَيْنَكُمْ كَاتِبٌ بِالْعَدْلِ [وَلَا] يَأْبَ كَاتِبٌ أَنْ يَكْتُبَ كَمَا عَلَّمَهُ اللَّهُ [فَلْيَكْتُبْ] [وَلْيُمْلِلِ] الَّذِي عَلَيْهِ الْحَقُّ [وَلْيَتَّقِ] اللَّهَ رَبَّهُ [وَلَا] يَبْخَسْ مِنْهُ شَيْئًا", "…onu yazın. Aranızda bir kâtip adaletle yazsın; kâtip, Allah'ın kendisine öğrettiği gibi yazmaktan kaçınmasın, yazsın. Borçlu olan da yazdırsın, Rabbi Allah'tan korksun ve ondan hiçbir şey eksiltmesin. (Bakara 282)", "Dört lâm-ı emr, iki lâ-i nâhiye. أَنْ يَكْتُبَ nasbdır."),
      W("[لَمْ] يَلِدْ [وَلَمْ] يُولَدْ [وَلَمْ] يَكُنْ لَهُ كُفُوًا أَحَدٌ", "O doğurmamış ve doğurulmamıştır. Hiçbir şey O'na denk değildir. (İhlâs 3-4)", "Üç لَمْ. يَكُنْ: ortadaki و düştü."),
      W("إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنْذَرْتَهُمْ أَمْ [لَمْ] تُنْذِرْهُمْ لَا يُؤْمِنُونَ", "İnkâr edenleri uyarsan da uyarmasan da onlar için birdir; iman etmezler. (Bakara 6)", "لَمْ تُنْذِرْهُمْ. لَا يُؤْمِنُونَ nâfiyedir: nun duruyor."),
      W("فَمَنْ تَصَدَّقَ بِهِ فَهُوَ كَفَّارَةٌ لَهُ وَمَنْ [لَمْ] يَحْكُمْ بِمَا أَنْزَلَ اللَّهُ فَأُولَئِكَ هُمُ الظَّالِمُونَ", "Kim hakkını bağışlarsa bu ona kefaret olur. Kim Allah'ın indirdiğiyle hükmetmezse, işte onlar zalimlerin ta kendileridir. (Mâide 45)", "لَمْ يَحْكُمْ.")
    ]},
    { type: "classify", num: "+", extra: true, opts: DUS_OPTS, ar: "كَيْفَ جُزِمَ الفِعْلُ؟", tr: "İleri bilgi (ek alıştırma): bu meczûm fiilde cezm nasıl görünüyor? Sükûn mu, harf düşmesi mi, nun düşmesi mi?", items: [
      { s: "لَا <b class=\"hl\">يَسْخَرْ</b> قَوْمٌ", a: "sukun", why: "يَسْخَرُ → sükûn." },
      { s: "لَا <b class=\"hl\">تَخَفْ</b>", a: "orta", why: "تَخَافُ → ortadaki elif düştü." },
      { s: "وَلَا <b class=\"hl\">يَأْبَ</b> كَاتِبٌ", a: "son", why: "يَأْبَى → sondaki elif düştü." },
      { s: "وَلْ<b class=\"hl\">يَتَّقِ</b> اللَّهَ", a: "son", why: "يَتَّقِي → sondaki yâ düştü." },
      { s: "وَلَمْ <b class=\"hl\">يَكُنْ</b> لَهُ كُفُوًا أَحَدٌ", a: "orta", why: "يَكُونُ → ortadaki vav düştü." },
      { s: "لِ<b class=\"hl\">يُنْفِقْ</b> ذُو سَعَةٍ", a: "sukun", why: "يُنْفِقُ → sükûn." },
      { s: "وَلَا <b class=\"hl\">تَنْسَ</b> أَنْ تَحْفَظَ", a: "son", why: "تَنْسَى → sondaki elif düştü." },
      { s: "لَمْ <b class=\"hl\">يَذْهَبُوا</b>", a: "nun", why: "يَذْهَبُونَ → nun düştü." },
      { s: "لَمْ <b class=\"hl\">يَلِدْ</b>", a: "sukun", why: "يَلِدُ → sükûn." }
    ]},
    { type: "reading", num: "٩", ar: "اقْرَإِ القِطْعَةَ التَّالِيَةَ وَعَيِّنْ أَدَوَاتِ النَّصْبِ وَالجَزْمِ", tr: "Parçayı oku, sorulara bak, sonra fiilleri sınıflandır.", title: "مَحْمُودٌ وَاللُّغَةُ العَرَبِيَّةُ",
      text: "يُرِيدُ مَحْمُودٌ أَنْ يَتَعَلَّمَ اللُّغَةَ العَرَبِيَّةَ جَيِّدًا حَتَّى يَفْهَمَ القُرْآنَ. وَسَأَلَ المُدَرِّسَ قَائِلًا: «مَاذَا يَجِبُ عَلَيَّ أَنْ أَفْعَلَ كَيْ أَتَحَدَّثَ العَرَبِيَّةَ جَيِّدًا وَأَفْهَمَ مَا أَقْرَأُ مِنَ القُرْآنِ وَالحَدِيثِ؟». أَجَابَ المُدَرِّسُ مُبْتَسِمًا: «عَلَيْكَ أَوَّلًا أَنْ تَسْتَمِعَ وَتُشَاهِدَ البَرَامِجَ العَرَبِيَّةَ، ثُمَّ لِتَتَحَدَّثْ بِالعَرَبِيَّةِ كَثِيرًا، وَلَا تَنْسَ أَيْضًا أَنْ تَحْفَظَ قَدْرًا كَافِيًا مِنَ الآيَاتِ القُرْآنِيَّةِ وَالأَحَادِيثِ النَّبَوِيَّةِ».",
      textTr: "Mahmud, Kur'an'ı anlamak için Arapçayı iyi öğrenmek istiyor. Öğretmene sordu: \"Arapçayı iyi konuşmak ve Kur'an'dan ve hadisten okuduğumu anlamak için ne yapmam gerekir?\" Öğretmen gülümseyerek cevap verdi: \"Önce Arapça programları dinlemeli ve izlemelisin; sonra bol bol Arapça konuş. Yeterli miktarda âyet ve hadis ezberlemeyi de unutma.\"",
      qa: [
        { q: "مَاذَا يُرِيدُ مَحْمُودٌ؟", a: "يُرِيدُ أَنْ يَتَعَلَّمَ اللُّغَةَ العَرَبِيَّةَ جَيِّدًا.", tr: "Mahmud ne istiyor? Arapçayı iyi öğrenmek." },
        { q: "لِمَاذَا يُرِيدُ أَنْ يَتَعَلَّمَ العَرَبِيَّةَ؟", a: "حَتَّى يَفْهَمَ القُرْآنَ.", tr: "Neden Arapça öğrenmek istiyor? Kur'an'ı anlamak için." },
        { q: "بِمَاذَا نَصَحَهُ المُدَرِّسُ؟", a: "أَنْ يَسْتَمِعَ وَيُشَاهِدَ البَرَامِجَ العَرَبِيَّةَ، وَأَنْ يَتَحَدَّثَ كَثِيرًا، وَأَنْ يَحْفَظَ الآيَاتِ وَالأَحَادِيثَ.", tr: "Öğretmen ona ne tavsiye etti? Dinlemesini, izlemesini, çok konuşmasını, âyet ve hadis ezberlemesini." }
      ],
      cls: { opts: NM_OPTS, ar: "صَنِّفِ الأَفْعَالَ المُضَارِعَةَ", tr: "Parçadaki altı çizili fiil merfû mu, mansûb mu, meczûm mu?", items: [
        { s: "يُرِيدُ مَحْمُودٌ أَنْ <b class=\"hl\">يَتَعَلَّمَ</b> اللُّغَةَ", a: "nasb", why: "أَنْ → mansûb." },
        { s: "حَتَّى <b class=\"hl\">يَفْهَمَ</b> القُرْآنَ", a: "nasb", why: "حَتَّى → mansûb." },
        { s: "مَاذَا <b class=\"hl\">يَجِبُ</b> عَلَيَّ", a: "ref", why: "Edat yok → merfû." },
        { s: "كَيْ <b class=\"hl\">أَتَحَدَّثَ</b> العَرَبِيَّةَ", a: "nasb", why: "كَيْ → mansûb." },
        { s: "وَأَفْهَمَ مَا <b class=\"hl\">أَقْرَأُ</b>", a: "ref", why: "Edat yok → merfû." },
        { s: "أَنْ <b class=\"hl\">تَسْتَمِعَ</b> وَتُشَاهِدَ", a: "nasb", why: "أَنْ → mansûb." },
        { s: "ثُمَّ <b class=\"hl\">لِتَتَحَدَّثْ</b> بِالعَرَبِيَّةِ", a: "cezm", why: "Lâm-ı emr → meczûm." },
        { s: "وَلَا <b class=\"hl\">تَنْسَ</b> أَيْضًا", a: "cezm", why: "Lâ-i nâhiye → meczûm; sondaki elif düştü (تَنْسَى)." },
        { s: "أَنْ <b class=\"hl\">تَحْفَظَ</b> قَدْرًا كَافِيًا", a: "nasb", why: "أَنْ → mansûb." }
      ]}
    },
    { type: "find", target: "y", num: "٩ (ب)", ar: "عَيِّنْ أَدَوَاتِ النَّصْبِ وَالجَزْمِ", tr: "Parçadan alınan cümlelerde nasb ve cezm edatlarının hepsine dokun.", items: [
      W("يُرِيدُ مَحْمُودٌ [أَنْ] يَتَعَلَّمَ اللُّغَةَ العَرَبِيَّةَ جَيِّدًا [حَتَّى] يَفْهَمَ القُرْآنَ.", "Mahmud Kur'an'ı anlamak için Arapçayı iyi öğrenmek istiyor.", "أَنْ ve حَتَّى: nasb."),
      W("مَاذَا يَجِبُ عَلَيَّ [أَنْ] أَفْعَلَ [كَيْ] أَتَحَدَّثَ العَرَبِيَّةَ جَيِّدًا؟", "Arapçayı iyi konuşmak için ne yapmam gerekir?", "أَنْ ve كَيْ: nasb."),
      W("عَلَيْكَ أَوَّلًا [أَنْ] تَسْتَمِعَ وَتُشَاهِدَ البَرَامِجَ العَرَبِيَّةَ", "Önce Arapça programları dinlemeli ve izlemelisin.", "أَنْ: nasb; وَتُشَاهِدَ atıfla mansûb."),
      W("ثُمَّ [لِتَتَحَدَّثْ] بِالعَرَبِيَّةِ كَثِيرًا، [وَلَا] تَنْسَ أَيْضًا [أَنْ] تَحْفَظَ قَدْرًا كَافِيًا", "Sonra bol bol Arapça konuş; yeterli miktarda ezberlemeyi de unutma.", "لِـ (emr) ve لَا (nâhiye): cezm; أَنْ: nasb.")
    ]}
  ]
}
];

// İ'rab makinesi: [merfû, mansûb, meczûm, Türkçe: yalın, أَنْ, لَنْ, كَيْ, لَمْ, لَا, لِـ]
var MAKINE = [
  ["يَكْتُبُ", "يَكْتُبَ", "يَكْتُبْ", ["yazar", "yazması", "asla yazmayacak", "yazması için", "yazmadı", "yazmasın", "yazsın"]],
  ["تَأْكُلُ", "تَأْكُلَ", "تَأْكُلْ", ["yersin", "yemen", "asla yemeyeceksin", "yemen için", "yemedin", "yeme!", "ye (yemelisin)"]],
  ["يَسْتَيْقِظُ", "يَسْتَيْقِظَ", "يَسْتَيْقِظْ", ["uyanır", "uyanması", "asla uyanmayacak", "uyanması için", "uyanmadı", "uyanmasın", "uyansın"]],
  ["تَجْلِسُ", "تَجْلِسَ", "تَجْلِسْ", ["oturursun", "oturman", "asla oturmayacaksın", "oturman için", "oturmadın", "oturma!", "otur (oturmalısın)"]],
  ["يَذْهَبُ", "يَذْهَبَ", "يَذْهَبْ", ["gider", "gitmesi", "asla gitmeyecek", "gitmesi için", "gitmedi", "gitmesin", "gitsin"]],
  ["تَنْسَى", "تَنْسَى", "تَنْسَ", ["unutursun", "unutman", "asla unutmayacaksın", "unutman için", "unutmadın", "unutma!", "unut"]],
  ["يَكُونُ", "يَكُونَ", "يَكُنْ", ["olur", "olması", "asla olmayacak", "olması için", "olmadı", "olmasın", "olsun"]],
  ["يَكْتُبُونَ", "يَكْتُبُوا", "يَكْتُبُوا", ["yazarlar", "yazmaları", "asla yazmayacaklar", "yazmaları için", "yazmadılar", "yazmasınlar", "yazsınlar"]]
];
var MAKINE_E = [["", "edat yok", ""], ["أَنْ", "أَنْ", "n"], ["لَنْ", "لَنْ", "n"], ["كَيْ", "كَيْ", "n"], ["لَمْ", "لَمْ", "c"], ["لَا", "لَا", "c"], ["لِ", "لِـ (emir)", "c"]];

// Oyun havuzu: [cümle {fiil}, seçenekler (ilki doğru), hal, açıklama, Türkçe, konu]
var CZ_POOL = [
  ["لَمْ {يَكْتُبْ} الدَّرْسَ.", ["يَكْتُبْ", "يَكْتُبُ", "يَكْتُبَ"], "cezm", "لَمْ → sükûn", "Dersi yazmadı.", "u1"],
  ["لَمْ {يَسْتَيْقِظْ} عَلِيٌّ.", ["يَسْتَيْقِظْ", "يَسْتَيْقِظُ", "يَسْتَيْقِظَ"], "cezm", "لَمْ → sükûn", "Ali uyanmadı.", "u1"],
  ["لَا {تَأْكُلْ} كَثِيرًا.", ["تَأْكُلْ", "تَأْكُلُ", "تَأْكُلَ"], "cezm", "lâ-i nâhiye → sükûn", "Çok yeme!", "u1"],
  ["لَا {تَجْلِسْ} عَلَى الأَرْضِ.", ["تَجْلِسْ", "تَجْلِسُ", "تَجْلِسَ"], "cezm", "lâ-i nâhiye → sükûn", "Yere oturma!", "u1"],
  ["لِـ{يَذْهَبْ} مُصْطَفَى إِلَى المَدْرَسَةِ.", ["يَذْهَبْ", "يَذْهَبُ", "يَذْهَبَ"], "cezm", "lâm-ı emr → sükûn", "Mustafa okula gitsin.", "u1"],
  ["لِـ{يَرْجِعْ} عَلِيٌّ إِلَى البَيْتِ.", ["يَرْجِعْ", "يَرْجِعُ", "يَرْجِعَ"], "cezm", "lâm-ı emr → sükûn", "Ali eve dönsün.", "u1"],
  ["لَا {يَدْخُلُ} الكَافِرُ الجَنَّةَ.", ["يَدْخُلُ", "يَدْخُلْ", "يَدْخُلَ"], "ref", "lâ-i nâfiye: etkisiz → damme", "Kâfir cennete girmez.", "u1"],
  ["{يَكْتُبُ} خَلِيلٌ دَرْسَهُ.", ["يَكْتُبُ", "يَكْتُبْ", "يَكْتُبَ"], "ref", "edat yok → damme", "Halil dersini yazar.", "u1"],
  ["لَمْ {يَتَنَاوَلْ} أَحْمَدُ الفَطُورَ.", ["يَتَنَاوَلْ", "يَتَنَاوَلَ", "يَتَنَاوَلُ"], "cezm", "لَمْ → sükûn", "Ahmed kahvaltı yapmadı.", "u2"],
  ["لَنْ {يَتَنَاوَلَ} أَحْمَدُ الفَطُورَ.", ["يَتَنَاوَلَ", "يَتَنَاوَلْ", "يَتَنَاوَلُ"], "nasb", "لَنْ → fetha", "Ahmed asla kahvaltı yapmayacak.", "u2"],
  ["لَمْ {تَغْسِلْ} خَدِيجَةُ وَجْهَهَا.", ["تَغْسِلْ", "تَغْسِلَ", "تَغْسِلُ"], "cezm", "لَمْ → sükûn", "Hatice yüzünü yıkamadı.", "u2"],
  ["لَنْ {يَرْكَبَ} الرَّجُلُ سَيَّارَتَهُ.", ["يَرْكَبَ", "يَرْكَبْ", "يَرْكَبُ"], "nasb", "لَنْ → fetha", "Adam arabasına asla binmeyecek.", "u2"],
  ["لَمْ {يَرْجِعْ} العَامِلُ إِلَى بَيْتِهِ.", ["يَرْجِعْ", "يَرْجِعَ", "يَرْجِعُ"], "cezm", "لَمْ → sükûn", "İşçi evine dönmedi.", "u2"],
  ["لَنْ {يَقْرَأَ} خَالِدٌ فِي غُرْفَةِ الجُلُوسِ.", ["يَقْرَأَ", "يَقْرَأْ", "يَقْرَأُ"], "nasb", "لَنْ → fetha", "Hâlid oturma odasında asla okumayacak.", "u2"],
  ["لَا {تَحْضُرْ} إِلَى البَيْتِ مُتَأَخِّرًا.", ["تَحْضُرْ", "تَحْضُرُ", "أَحْضُرْ"], "cezm", "lâ-i nâhiye + 2. şahıs", "Eve geç gelme!", "u3"],
  ["لَا {تُسَافِرْ} إِلَى دِمَشْقَ.", ["تُسَافِرْ", "سَتُسَافِرُ", "تُسَافِرَ"], "cezm", "lâ-i nâhiye; سَـ düşer", "Şam'a gitme!", "u3"],
  ["{لِتَجْتَهِدْ} كَثِيرًا.", ["لِتَجْتَهِدْ", "لِتَجْتَهِدَ", "لِتَجْتَهِدُ"], "cezm", "emir anlamı: lâm-ı emr → sükûn", "Çok çalış!", "u3"],
  ["سَافَرَ مُحَمَّدٌ {لِيَعْمَلَ} فِي شَرِكَةٍ.", ["لِيَعْمَلَ", "لِيَعْمَلْ", "لِيَعْمَلُ"], "nasb", "amaç: lâm-ı ta'lîl → fetha", "Muhammed çalışmak için yolculuk etti.", "u3"],
  ["{لِتُكَلِّمْ} زَيْنَبَ.", ["لِتُكَلِّمْ", "لِتُكَلِّمَ", "لِتُكَلِّمُ"], "cezm", "lâm-ı emr → sükûn", "Zeyneb'le konuş!", "u3"],
  ["لَمْ {يُحَاوِلْ} أَنْ يُقَدِّمَ المَشْرُوعَ.", ["يُحَاوِلْ", "يُحَاوِلَ", "يُحَاوِلُ"], "cezm", "لَمْ → sükûn", "Projeyi sunmaya çalışmadı.", "u3"],
  ["لَمْ يُحَاوِلْ أَنْ {يُقَدِّمَ} المَشْرُوعَ.", ["يُقَدِّمَ", "يُقَدِّمْ", "يُقَدِّمُ"], "nasb", "أَنْ → fetha", "Projeyi sunmaya çalışmadı.", "u3"],
  ["يُمْكِنُ أَنْ {تَنْزِلَ} مِنَ السَّيَّارَةِ.", ["تَنْزِلَ", "تَنْزِلْ", "تَنْزِلُ"], "nasb", "أَنْ → fetha", "Arabadan inebilirsin.", "u4"],
  ["لَمْ {يَحْضُرْ} حَمْزَةُ إِلَى الصَّفِّ.", ["يَحْضُرْ", "يَحْضُرَ", "يَحْضُرُ"], "cezm", "لَمْ → sükûn", "Hamza sınıfa gelmedi.", "u4"],
  ["اقْتَرِبْ مِنِّي حَتَّى {تَسْمَعَ} مَا أَقُولُ.", ["تَسْمَعَ", "تَسْمَعْ", "تَسْمَعُ"], "nasb", "حَتَّى → fetha", "Duyman için yaklaş.", "u4"],
  ["اقْتَرِبْ مِنِّي حَتَّى تَسْمَعَ مَا {أَقُولُ}.", ["أَقُولُ", "أَقُولَ", "أَقُلْ"], "ref", "edat yok → damme", "Söylediğimi duyman için yaklaş.", "u4"],
  ["لَا {تَتَجَوَّلْ} فِي الغَابَةِ لَيْلًا.", ["تَتَجَوَّلْ", "تَتَجَوَّلَ", "تَتَجَوَّلُ"], "cezm", "lâ-i nâhiye → sükûn", "Gece ormanda dolaşma!", "u4"],
  ["فَتَحَ التِّلْفَازَ كَيْ {يُشَاهِدَ} الأَخْبَارَ.", ["يُشَاهِدَ", "يُشَاهِدْ", "يُشَاهِدُ"], "nasb", "كَيْ → fetha", "Haberleri izlemek için televizyonu açtı.", "u4"],
  ["لِمَاذَا لَمْ {تَحْفَظْ} هَذِهِ الأَبْيَاتَ أَمْسِ؟", ["تَحْفَظْ", "تَحْفَظَ", "تَحْفَظُ"], "cezm", "لَمْ → sükûn", "Dün bu beyitleri neden ezberlemedin?", "u4"],
  ["لَمْ {يَلِدْ} وَلَمْ يُولَدْ", ["يَلِدْ", "يَلِدَ", "يَلِدُ"], "cezm", "لَمْ → sükûn", "O doğurmamıştır ve doğurulmamıştır.", "u5"],
  ["وَلَمْ {يَكُنْ} لَهُ كُفُوًا أَحَدٌ", ["يَكُنْ", "يَكُونْ", "يَكُونُ"], "cezm", "لَمْ → sükûn; ortadaki و düşer", "Hiçbir şey O'na denk değildir.", "u5"],
  ["يَا مُوسَى لَا {تَخَفْ}", ["تَخَفْ", "تَخَافْ", "تَخَافُ"], "cezm", "lâ-i nâhiye; ortadaki elif düşer", "Ey Mûsâ, korkma!", "u5"],
  ["لَا {يُؤْمِنُونَ}", ["يُؤْمِنُونَ", "يُؤْمِنُوا", "يُؤْمِنْ"], "ref", "lâ-i nâfiye: nun durur", "İman etmezler.", "u5"],
  ["وَلَا {تَنْسَ} أَنْ تَحْفَظَ", ["تَنْسَ", "تَنْسَى", "تَنْسَيْ"], "cezm", "lâ-i nâhiye; sondaki elif düşer", "Ezberlemeyi unutma!", "u5"],
  ["أُرِيدُ أَنْ {أُسَافِرَ} إِلَى اليَمَنِ.", ["أُسَافِرَ", "أُسَافِرْ", "أُسَافِرُ"], "nasb", "أَنْ → fetha", "Yemen'e gitmek istiyorum.", "u1"]
];
// Edat dedektifi: [ifade (fiil harekesiz), Türkçe anlam, grup: nasb / cezm / ref]
var EDAT_POOL = [
  ["لَمْ يَذْهَب", "gitmedi", "cezm"], ["لَنْ يَذْهَب", "asla gitmeyecek", "nasb"], ["لِيَذْهَب", "gitsin (emir)", "cezm"], ["لِيَذْهَب", "gitmesi için (amaç)", "nasb"],
  ["لَا تَذْهَب", "gitme!", "cezm"], ["لَا يَذْهَب", "gitmez (haber)", "ref"], ["أَنْ يَذْهَب", "gitmesi", "nasb"], ["كَيْ يَذْهَب", "gitmesi için", "nasb"],
  ["حَتَّى يَذْهَب", "gitsin diye", "nasb"], ["يَذْهَب", "gider", "ref"], ["لَمْ تَكْتُب", "yazmadın", "cezm"], ["لَا تَكْتُب", "yazma!", "cezm"],
  ["لَا يَكْتُب", "yazmaz", "ref"], ["لِتَكْتُب", "yaz (emir)", "cezm"], ["لِتَكْتُب", "yazman için", "nasb"], ["لِكَيْ تَكْتُب", "yazman için", "nasb"]
];
// لَمْ mi لَنْ mi: [Türkçe cümle, doğru: lam / lan, Arapça örnek]
var LEM_POOL = [
  ["Dün okula gitmedim.", "lam", "لَمْ أَذْهَبْ"], ["Yarın okula gitmeyeceğim.", "lan", "لَنْ أَذْهَبَ"], ["Ali kahvaltı yapmadı.", "lam", "لَمْ يَتَنَاوَلْ"], ["Bir daha asla yalan söylemeyeceğim.", "lan", "لَنْ أَكْذِبَ"],
  ["Hamza dün derse gelmedi.", "lam", "لَمْ يَحْضُرْ"], ["Gelecek ay seyahat etmeyecekler.", "lan", "لَنْ يُسَافِرُوا"], ["Geçen hafta mektup yazmadım.", "lam", "لَمْ أَكْتُبْ"], ["Bundan sonra derse geç kalmayacağım.", "lan", "لَنْ أَتَأَخَّرَ"],
  ["Ahmed saat yedide uyanmadı.", "lam", "لَمْ يَسْتَيْقِظْ"], ["Fâtıma gelecek yıl umre yapmayacak.", "lan", "لَنْ تَعْتَمِرَ"], ["O doğurmadı ve doğurulmadı.", "lam", "لَمْ يَلِدْ وَلَمْ يُولَدْ"], ["Allah'ın yazdığından başkası bize isabet etmeyecek.", "lan", "لَنْ يُصِيبَنَا"],
  ["Rukıyye eve varmadı.", "lam", "لَمْ تَصِلْ"], ["Yarın seninle çıkmayacağım.", "lan", "لَنْ أَخْرُجَ"]
];
var HAFIZA = {
  anlam: { name: "Edat ↔ anlam", pairs: [["لَمْ", "-medi (geçmiş olumsuz)"], ["لَنْ", "asla -meyecek"], ["لَا (nâhiye)", "-me! (yasak)"], ["لِـ (emr)", "-sın (emir)"], ["أَنْ", "-mek / -mesi"], ["كَيْ", "-mek için"], ["حَتَّى", "-sın diye"], ["لَا (nâfiye)", "-mez (etkisiz)"]] },
  cezm: { name: "Merfû ↔ meczûm", pairs: [["يَكْتُبُ", "لَمْ يَكْتُبْ"], ["تَأْكُلُ", "لَا تَأْكُلْ"], ["يَذْهَبُ", "لِيَذْهَبْ"], ["تَخَافُ", "لَا تَخَفْ"], ["يَكُونُ", "لَمْ يَكُنْ"], ["تَنْسَى", "لَا تَنْسَ"], ["يَذْهَبُونَ", "لَمْ يَذْهَبُوا"], ["يَرْجِعُ", "لِيَرْجِعْ"]] }
};
var KARTLAR = [
  ["Cezm edatları hangileri?", "لَمْ، لَا (nâhiye), لِـ (lâm-ı emr)"],
  ["Cezmin alameti (sahih fiilde)?", "Sükûn: يَكْتُبُ ← لَمْ يَكْتُبْ"],
  ["Muzârinin üç hali?", "Merfû يَكْتُبُ · mansûb لَنْ يَكْتُبَ · meczûm لَمْ يَكْتُبْ"],
  ["لَمْ hangi anlamı verir?", "Geçmiş olumsuz: لَمْ يَكْتُبْ (yazmadı)"],
  ["لَمْ ile لَنْ farkı?", "لَمْ geçmiş + sükûn; لَنْ gelecek + fetha"],
  ["لَا nâhiye ne demek?", "Yasak: لَا تَأْكُلْ كَثِيرًا (çok yeme!)"],
  ["لَا nâfiye fiili etkiler mi?", "Hayır: لَا يَدْخُلُ الكَافِرُ الجَنَّةَ (girmez) — merfû"],
  ["Lâm-ı emr ne demek?", "Emir: لِيَذْهَبْ مُصْطَفَى (Mustafa gitsin)"],
  ["İki لِـ'yi nasıl ayırırım?", "Emir + sükûn: لِيَذْهَبْ (gitsin). Amaç + fetha: لِيَذْهَبَ (gitmesi için)"],
  ["فَلْيُنْفِقْ'teki lâm neden sakin?", "وَ / فَ'dan sonra lâm-ı emr sakin okunur."],
  ["Sükûnlu fiilden sonra ال gelirse?", "Okunuşta kesre olur: لَمْ يَحْضُرِ الطَّالِبُ"],
  ["تَنْسَى meczûm olunca?", "Sondaki elif düşer: لَا تَنْسَ"],
  ["يَكُونُ meczûm olunca?", "Ortadaki vav düşer: لَمْ يَكُنْ"],
  ["يَذْهَبُونَ meczûm olunca?", "Nun düşer: لَمْ يَذْهَبُوا"]
];
