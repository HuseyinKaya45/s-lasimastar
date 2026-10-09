// ================= VERİ: Kıraat 3 — بَيْتُ عَبْدِ الرَّحْمَنِ =================
// Parça yazımı: "kelime:rol / kelime:rol". Rol "-" düz metin; "rol.Etiket" etiketi değiştirir.
var ROLES = {
  mz: { ar: "المَكَانُ", tr: "Yer" }, nasb: { ar: "الشَّيْءُ", tr: "Eşya" }, cerr: { ar: "حَرْفُ الجَرِّ / الظَّرْفُ", tr: "Edat" },
  mi: { ar: "اسْمُ الإِشَارَةِ", tr: "İşaret" }, ref: { ar: "الصِّفَةُ", tr: "Sıfat" },
  x: { ar: "", tr: "Başka" }, y: { ar: "✓", tr: "Seçtin" }
};
var TF = [["d", "Doğru ✓", "صَحِيحٌ", "mz"], ["y", "Yanlış ✗", "خَطَأٌ", "cerr"]];
var ODA = [["n", "Yatak odası", "غُرْفَةُ النَّوْمِ", "mi"], ["c", "Oturma odası", "غُرْفَةُ الجُلُوسِ", "nasb"], ["m", "Mutfak", "المَطْبَخُ", "cerr"], ["h", "Banyo", "الحَمَّامُ", "muz"]];
var LAM = [["q", "Kamerî lâm", "اللَّامُ القَمَرِيَّةُ", "mz"], ["s", "Şemsî lâm", "اللَّامُ الشَّمْسِيَّةُ", "ref"]];
var ZARF = [["z", "Zaman zarfı", "ظَرْفُ زَمَانٍ", "nasb"], ["m", "Mekân zarfı", "ظَرْفُ مَكَانٍ", "cerr"], ["c", "Harf-i cer", "حَرْفُ جَرٍّ", "mi"]];
var TUR_TR = { d: "Doğru", y: "Yanlış", n: "Yatak odası", c: "Oturma odası", m: "Mutfak", h: "Banyo" };

// İşaret makinesi: [Türkçe, Arapça, yakın, uzak, isim grubu, Türkçe (yakın), Türkçe (uzak)]
var ISARET = [
  ["Tekil eril", "المُفْرَدُ المُذَكَّرُ", "هَذَا", "ذَلِكَ", "مُعَلِّمٌ جَيِّدٌ", "Bu iyi bir öğretmen.", "Şu iyi bir öğretmen."],
  ["Tekil dişil", "المُفْرَدُ المُؤَنَّثُ", "هَذِهِ", "تِلْكَ", "سَيَّارَةٌ جَمِيلَةٌ", "Bu güzel bir araba.", "Şu güzel bir araba."],
  ["İkil eril", "المُثَنَّى المُذَكَّرُ", "هَذَانِ", "", "طَالِبَانِ مُجْتَهِدَانِ", "Bunlar iki çalışkan (erkek) öğrenci.", ""],
  ["İkil dişil", "المُثَنَّى المُؤَنَّثُ", "هَاتَانِ", "", "طَالِبَتَانِ مُجْتَهِدَتَانِ", "Bunlar iki çalışkan (kız) öğrenci.", ""],
  ["Akıllı çoğul", "جَمْعُ العَاقِلِ", "هَؤُلَاءِ", "أُولَئِكَ", "طُلَّابٌ مُجْتَهِدُونَ", "Bunlar çalışkan öğrenciler.", "Şunlar çalışkan öğrenciler."],
  ["Akılsız çoğul", "جَمْعُ غَيْرِ العَاقِلِ", "هَذِهِ", "تِلْكَ", "أَقْلَامٌ جَمِيلَةٌ", "Bunlar güzel kalemler.", "Şunlar güzel kalemler."]
];

function HL(s, w) { return s.replace(w, '<b class="hl">' + w + '</b>'); }
function P(q, c, w1, w2, i, tr, why) {
  var k = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1], [2, 1, 0]][i % 6], o = [c, w1, w2];
  return { q: q, o: k.map(function (j) { return o[j]; }), a: k.indexOf(0), tr: tr, why: why };
}
function PL(list) { return list.map(function (x, i) { return P(x[0], x[1], x[2], x[3], i, x[4], x[5]); }); }
// Dört seçenekli: ilk seçenek doğru; sıra kaydırılır
function PL4(list) { return list.map(function (x, i) { var o = x[1], s = (i * 3 + 1) % o.length, r = o.slice(s).concat(o.slice(0, s)); return { q: x[0], o: r, a: r.indexOf(o[0]), tr: x[2], why: x[3] }; }); }
function CL(list) { return list.map(function (x) { return { s: x[0], a: x[1], why: x[2] }; }); }

var METIN = "عَبْدُ الرَّحْمَنِ مِصْرِيٌّ، يَسْكُنُ مَعَ أُسْرَتِهِ فِي مَدِينَةِ الإِسْكَنْدَرِيَّةِ، بَيْتُهُ تَارِيخِيٌّ قَدِيمٌ، وَهُوَ قَرِيبٌ مِنْ شَاطِئِ البَحْرِ أَيْضًا." +
  "<br>البَيْتُ يَتَكَوَّنُ مِنْ أَرْبَعِ غُرَفٍ؛ غُرْفَةٍ لِلْجُلُوسِ وَغُرْفَةٍ لِلضُّيُوفِ وَغُرْفَةٍ لِلنَّوْمِ وَغُرْفَةٍ لِعَبْدِ الرَّحْمَنِ، وَمِنْ مَطْبَخٍ وَاسِعٍ وَحَمَّامٍ. غُرْفَةُ الجُلُوسِ وَاسِعَةٌ، وَأَرْضُهَا مَفْرُوشَةٌ بِسَجَّادَةٍ جَمِيلَةٍ، فِي وَسَطِهَا طَاوِلَةٌ، فَوْقَ الطَّاوِلَةِ مَزْهَرِيَّةٌ جَمِيلَةٌ، وَفِي الغُرْفَةِ أَرِيكَةٌ مُرِيحَةٌ وَمَكْتَبَةٌ، عَلَى رُفُوفِ المَكْتَبَةِ كُتُبٌ وَمَجَلَّاتٌ وَجَرَائِدُ، وَفِيهَا أَيْضًا مِدْفَأَةٌ جَمِيلَةٌ. وَلِلْغُرْفَةِ شُرْفَةٌ كَبِيرَةٌ مُطِلَّةٌ عَلَى البَحْرِ، وَعَلَى نَوَافِذِهَا سَتَائِرُ جَمِيلَةٌ. وَغُرْفَةُ الضُّيُوفِ لَيْسَتْ وَاسِعَةً وَلَيْسَتْ ضَيِّقَةً، فِيهَا ثَلَاثُ أَرَائِكَ، وَمُعَلَّقٌ عَلَى جِدَارِهَا تِلْفَازٌ كَبِيرٌ، وَفِيهَا أَيْضًا طَاوِلَةٌ كَبِيرَةٌ، حَوْلَ الطَّاوِلَةِ عَشَرَةُ كَرَاسِيَّ. وَغُرْفَةُ النَّوْمِ فِيهَا سَرِيرٌ وَخِزَانَةُ مَلَابِسَ وَمِرْآةٌ صَغِيرَةٌ. وَغُرْفَةُ عَبْدِ الرَّحْمَنِ فِيهَا مَقْعَدٌ وَطَاوِلَةٌ، عَلَى الطَّاوِلَةِ حَاسُوبٌ وَطَابِعَةٌ. مَنْظَرُ البَحْرِ مِنْ غُرْفَتِهِ رَائِعٌ جِدًّا. وَالمَطْبَخُ فِيهِ ثَلَّاجَةٌ وَفُرْنٌ وَغَسَّالَةٌ وَرُفُوفٌ لِأَدَوَاتِ الطَّعَامِ وَالشَّرَابِ." +
  "<br>خَلْفَ البَيْتِ حَدِيقَةٌ صَغِيرَةٌ وَجَمِيلَةٌ، فِيهَا أَشْجَارٌ وَأَزْهَارٌ مُخْتَلِفَةٌ. وَالِدُ عَبْدِ الرَّحْمَنِ يُحِبُّ أَنْ يَقْضِيَ وَقْتَ فَرَاغِهِ فِيهَا، وَعَبْدُ الرَّحْمَنِ أَيْضًا يُحِبُّ أَنْ يَقْضِيَ مُعْظَمَ وَقْتِهِ فِي الحَدِيقَةِ.";
var METIN_TR = "Abdurrahman Mısırlıdır; ailesiyle İskenderiye şehrinde oturuyor. Evi tarihî ve eskidir; ayrıca deniz kıyısına da yakındır." +
  "<br>Ev dört odadan oluşur: bir oturma odası, bir misafir odası, bir yatak odası ve Abdurrahman’ın odası; ayrıca geniş bir mutfak ve bir banyo. Oturma odası geniştir; yeri güzel bir halıyla döşelidir, ortasında bir masa, masanın üstünde güzel bir vazo vardır. Odada rahat bir kanepe ve bir kitaplık vardır; kitaplığın raflarında kitaplar, dergiler ve gazeteler bulunur. Ayrıca güzel bir şömine de vardır. Odanın denize bakan büyük bir balkonu, pencerelerinde de güzel perdeler vardır. Misafir odası ne geniş ne dardır; içinde üç kanepe vardır, duvarında büyük bir televizyon asılıdır; ayrıca büyük bir masa ve masanın etrafında on sandalye vardır. Yatak odasında bir yatak, bir elbise dolabı ve küçük bir ayna vardır. Abdurrahman’ın odasında bir sandalye (oturak) ve bir masa, masanın üstünde de bir bilgisayar ve bir yazıcı vardır. Odasından deniz manzarası çok güzeldir. Mutfakta buzdolabı, fırın, çamaşır makinesi ve yemek-içecek gereçleri için raflar vardır." +
  "<br>Evin arkasında küçük ve güzel bir bahçe vardır; içinde çeşitli ağaçlar ve çiçekler bulunur. Abdurrahman’ın babası boş vaktini orada geçirmeyi sever; Abdurrahman da vaktinin çoğunu bahçede geçirmeyi sever.";
var SOZLUK = [["تَارِيخِيٌّ", "tarihî"], ["شَاطِئُ البَحْرِ", "deniz kıyısı"], ["غُرْفَةُ الجُلُوسِ", "oturma odası"], ["غُرْفَةُ الضُّيُوفِ", "misafir odası"], ["مَفْرُوشَةٌ بِـ", "… ile döşeli"], ["سَجَّادَةٌ", "halı"], ["مَزْهَرِيَّةٌ", "vazo"], ["أَرِيكَةٌ ج أَرَائِكُ", "kanepe"], ["مِدْفَأَةٌ", "şömine, soba"], ["شُرْفَةٌ مُطِلَّةٌ عَلَى", "… -e bakan balkon"], ["سَتَائِرُ", "perdeler"], ["ضَيِّقَةٌ", "dar"], ["خِزَانَةُ مَلَابِسَ", "elbise dolabı"], ["مِرْآةٌ", "ayna"], ["حَاسُوبٌ / طَابِعَةٌ", "bilgisayar / yazıcı"], ["ثَلَّاجَةٌ / فُرْنٌ / غَسَّالَةٌ", "buzdolabı / fırın / çamaşır makinesi"], ["وَقْتُ الفَرَاغِ", "boş vakit"], ["مُعْظَمٌ", "çoğu"]];

var UNITS = [
// ---------------------------------------------------------------- 1 · OKUMA
{
  id: "u1", no: 1, ar: "أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ وَالنَّصُّ", tr: "Okumaya Hazırlık ve Metin", short: "Metin", col: "mz", legend: ["mz", "nasb", "cerr"],
  goals: ["Okumadan önce kendi evini düşünmek: nerede oturuyorsun, evin büyük mü, kaç oda var", "Abdurrahman’ın evini anlatan metni durmadan okumak ve dinlemek", "Ev, oda ve eşya kelimelerini öğrenmek", "Metindeki bilgilerin doğru mu yanlış mı olduğunu söylemek"],
  examples: [
    { s: "البَيْتُ:mz / يَتَكَوَّنُ مِنْ:- / أَرْبَعِ غُرَفٍ.:nasb.Bilgi", tr: "Ev dört odadan oluşur.", pair: "فَوْقَ:cerr / الطَّاوِلَةِ:mz / مَزْهَرِيَّةٌ:nasb", pairTr: "Masanın üstünde bir vazo var." },
    { s: "خَلْفَ:cerr / البَيْتِ:mz / حَدِيقَةٌ:nasb / صَغِيرَةٌ.:ref.Sıfat", tr: "Evin arkasında küçük bir bahçe var." }
  ],
  rules: [
    { tr: "<b>Metnin konusu:</b> İskenderiyeli Abdurrahman’ın tarihî evi: dört oda (oturma, misafir, yatak, Abdurrahman’ın odası), mutfak, banyo ve evin arkasındaki bahçe; her odada neler olduğu." },
    { tr: "<b>Evi anlatma kalıpları:</b><br>• <span class=\"ar\">البَيْتُ يَتَكَوَّنُ مِنْ…</span> ev …-den oluşur<br>• <span class=\"ar\">فِي الغُرْفَةِ… · الغُرْفَةُ فِيهَا…</span> odada … var<br>• <span class=\"ar\">فَوْقَ / عَلَى / حَوْلَ / خَلْفَ…</span> üstünde / üzerinde / etrafında / arkasında<br>• <span class=\"ar\">لَيْسَتْ وَاسِعَةً وَلَيْسَتْ ضَيِّقَةً</span> ne geniş ne dar" },
    { tr: "<b>Okuma yolu:</b> Kitap “<span class=\"ar\">دُونَ تَوَقُّفٍ</span>” (durmadan) okumanı istiyor. Önce okuma öncesi soruları kendi evin için cevapla, sonra metni bir kez dinle, ardından durmadan oku. Bilmediğin kelimeyi sözlükte bul." }
  ],
  kaide: ["أَسْئِلَةُ مَا قَبْلَ القِرَاءَةِ: أَيْنَ تَسْكُنُ / تَسْكُنِينَ؟ هَلْ بَيْتُكَ كَبِيرٌ؟ مَاذَا فِي غُرْفَتِكَ؟ كَمْ غُرْفَةً فِي بَيْتِكَ؟", "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ."],
  ex: [
    { type: "reading", ar: "اقْرَإِ النَّصَّ الآتِيَ دُونَ تَوَقُّفٍ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Okuma öncesi soruları kendi evin için cevapla, metni durmadan oku ya da dinle; sonra cümlenin doğru mu yanlış mı olduğunu seç.", title: "بَيْتُ عَبْدِ الرَّحْمَنِ", text: METIN, textTr: METIN_TR, gloss: SOZLUK, speak: true,
      qa: [
        { q: "أَيْنَ تَسْكُنُ؟ / أَيْنَ تَسْكُنِينَ؟", a: "أَسْكُنُ فِي مَدِينَةِ أَنْقَرَةَ.", tr: "Nerede oturuyorsun? (Örnek cevap) Ankara şehrinde oturuyorum." },
        { q: "هَلْ بَيْتُكَ كَبِيرٌ؟", a: "لَا، بَيْتِي لَيْسَ كَبِيرًا وَلَيْسَ صَغِيرًا.", tr: "Evin büyük mü? Hayır, evim ne büyük ne küçük." },
        { q: "مَاذَا فِي غُرْفَتِكَ؟", a: "فِي غُرْفَتِي سَرِيرٌ وَمَكْتَبٌ وَخِزَانَةٌ.", tr: "Odanda ne var? Odamda bir yatak, bir çalışma masası ve bir dolap var." },
        { q: "كَمْ غُرْفَةً فِي بَيْتِكَ؟", a: "فِي بَيْتِي ثَلَاثُ غُرَفٍ.", tr: "Evinde kaç oda var? Evimde üç oda var." }
      ],
      cls: { opts: TF, ar: "صَحِيحٌ أَمْ خَطَأٌ؟", tr: "Metne göre cümle doğru mu, yanlış mı?", items: [
        { s: "عَبْدُ الرَّحْمَنِ يَسْكُنُ فِي القَاهِرَةِ.", a: "y", why: "İskenderiye’de oturuyor: فِي مَدِينَةِ الإِسْكَنْدَرِيَّةِ." },
        { s: "بَيْتُ عَبْدِ الرَّحْمَنِ قَرِيبٌ مِنَ البَحْرِ.", a: "d", why: "وَهُوَ قَرِيبٌ مِنْ شَاطِئِ البَحْرِ." },
        { s: "فِي البَيْتِ أَرْبَعُ غُرَفٍ.", a: "d", why: "يَتَكَوَّنُ مِنْ أَرْبَعِ غُرَفٍ." },
        { s: "المَطْبَخُ ضَيِّقٌ.", a: "y", why: "مَطْبَخٌ وَاسِعٌ: geniş bir mutfak." },
        { s: "فَوْقَ الطَّاوِلَةِ فِي غُرْفَةِ الجُلُوسِ مَزْهَرِيَّةٌ.", a: "d", why: "فَوْقَ الطَّاوِلَةِ مَزْهَرِيَّةٌ جَمِيلَةٌ." },
        { s: "فِي غُرْفَةِ الجُلُوسِ مِدْفَأَةٌ.", a: "d", why: "وَفِيهَا أَيْضًا مِدْفَأَةٌ جَمِيلَةٌ." },
        { s: "غُرْفَةُ الضُّيُوفِ وَاسِعَةٌ جِدًّا.", a: "y", why: "لَيْسَتْ وَاسِعَةً وَلَيْسَتْ ضَيِّقَةً: ne geniş ne dar." },
        { s: "حَوْلَ الطَّاوِلَةِ فِي غُرْفَةِ الضُّيُوفِ عَشَرَةُ كَرَاسِيَّ.", a: "d", why: "Metinde aynen geçer." },
        { s: "فِي غُرْفَةِ النَّوْمِ مِرْآةٌ كَبِيرَةٌ.", a: "y", why: "مِرْآةٌ صَغِيرَةٌ: küçük bir ayna." },
        { s: "عَلَى طَاوِلَةِ عَبْدِ الرَّحْمَنِ حَاسُوبٌ وَطَابِعَةٌ.", a: "d", why: "عَلَى الطَّاوِلَةِ حَاسُوبٌ وَطَابِعَةٌ." },
        { s: "الغَسَّالَةُ فِي الحَمَّامِ.", a: "y", why: "Metinde çamaşır makinesi mutfakta: وَالمَطْبَخُ فِيهِ… وَغَسَّالَةٌ." },
        { s: "فِي الحَدِيقَةِ أَشْجَارٌ وَأَزْهَارٌ.", a: "d", why: "فِيهَا أَشْجَارٌ وَأَزْهَارٌ مُخْتَلِفَةٌ." }
      ]}
    },
    { type: "pick", extra: true, ar: "مَا مَعْنَى الكَلِمَةِ؟", tr: "Koyu kelimenin bu cümledeki anlamını seç.", items: PL([
      [HL("بَيْتُهُ تَارِيخِيٌّ قَدِيمٌ", "قَدِيمٌ"), "eski", "yeni", "büyük", "Evi tarihî ve eskidir.", "Zıddı: جَدِيدٌ."],
      [HL("قَرِيبٌ مِنْ شَاطِئِ البَحْرِ", "شَاطِئِ"), "kıyı, sahil", "dalga", "liman", "Deniz kıyısına yakın.", "Çoğulu: شَوَاطِئُ."],
      [HL("مَفْرُوشَةٌ بِسَجَّادَةٍ جَمِيلَةٍ", "بِسَجَّادَةٍ"), "halı", "perde", "masa", "Güzel bir halıyla döşeli.", "سَجَّادَةُ الصَّلَاةِ: seccade."],
      [HL("فَوْقَ الطَّاوِلَةِ مَزْهَرِيَّةٌ", "مَزْهَرِيَّةٌ"), "vazo", "lamba", "tabak", "Masanın üstünde bir vazo.", "زَهْرَةٌ: çiçek → مَزْهَرِيَّةٌ: çiçeklik."],
      [HL("أَرِيكَةٌ مُرِيحَةٌ", "أَرِيكَةٌ"), "kanepe", "yatak", "sandalye", "Rahat bir kanepe.", "Çoğulu: أَرَائِكُ."],
      [HL("وَفِيهَا أَيْضًا مِدْفَأَةٌ", "مِدْفَأَةٌ"), "şömine, soba", "buzdolabı", "fırın", "Ayrıca bir şömine var.", "دِفْءٌ: sıcaklık."],
      [HL("شُرْفَةٌ كَبِيرَةٌ مُطِلَّةٌ عَلَى البَحْرِ", "شُرْفَةٌ"), "balkon", "pencere", "kapı", "Denize bakan büyük bir balkon.", "مُطِلَّةٌ عَلَى: …-e bakan."],
      [HL("وَعَلَى نَوَافِذِهَا سَتَائِرُ", "سَتَائِرُ"), "perdeler", "çiçekler", "resimler", "Pencerelerinde perdeler var.", "Tekili: سِتَارَةٌ / سِتَارٌ."],
      [HL("لَيْسَتْ وَاسِعَةً وَلَيْسَتْ ضَيِّقَةً", "ضَيِّقَةً"), "dar", "karanlık", "soğuk", "Ne geniş ne dar.", "Zıddı: وَاسِعَةٌ."],
      [HL("وَمُعَلَّقٌ عَلَى جِدَارِهَا تِلْفَازٌ", "جِدَارِهَا"), "duvarı", "tavanı", "kapısı", "Duvarında bir televizyon asılı.", "Çoğulu: جُدْرَانٌ."],
      [HL("وَخِزَانَةُ مَلَابِسَ", "وَخِزَانَةُ"), "dolap", "çanta", "masa", "Elbise dolabı.", "Çoğulu: خَزَائِنُ."],
      [HL("يَقْضِيَ وَقْتَ فَرَاغِهِ فِيهَا", "فَرَاغِهِ"), "boş (vakti)", "iş (vakti)", "uyku (vakti)", "Boş vaktini orada geçirmek.", "وَقْتُ الفَرَاغِ: boş vakit."]
    ])}
  ]
},
// ---------------------------------------------------------------- 2 · ANLAMA
{
  id: "u2", no: 2, ar: "فَهْمُ المَقْرُوءِ", tr: "Metni Anlama", short: "Anlama", col: "nasb", legend: ["mz", "nasb"],
  goals: ["Metinle ilgili soruları cevaplamak", "Cümlenin doğru (✓) mu yanlış (✗) mı olduğunu bulmak", "Yanlış cümleyi metne göre düzeltmek", "Eşyanın evin hangi bölümünde olduğunu söylemek"],
  examples: [
    { s: "مَاذَا فِي:- / المَطْبَخِ؟:mz", tr: "Mutfakta ne var?", pair: "فِيهِ:- / ثَلَّاجَةٌ وَفُرْنٌ وَغَسَّالَةٌ.:nasb", pairTr: "İçinde buzdolabı, fırın ve çamaşır makinesi var." },
    { s: "مِمَّ:- / يَتَكَوَّنُ البَيْتُ؟:mz", tr: "Ev neden oluşur?", pair: "مِنْ:- / أَرْبَعِ غُرَفٍ وَمَطْبَخٍ وَحَمَّامٍ.:nasb", pairTr: "Dört oda, bir mutfak ve bir banyodan." }
  ],
  rules: [
    { tr: "<b>Soru kelimeleri:</b> <span class=\"ar\">مَاذَا فِي…؟</span> …-de ne var? · <span class=\"ar\">أَيْنَ</span> nerede? · <span class=\"ar\">مِمَّ = مِنْ + مَا</span> neden (oluşur)? · <span class=\"ar\">كَمْ</span> kaç?" },
    { tr: "<b>Yanlışı düzeltmek:</b> Önce metinde ilgili cümleyi bul, sonra yanlış kelimeyi metindekiyle değiştir: <span class=\"ar\">أَمَامَ البَيْتِ حَدِيقَةٌ ✗ ← خَلْفَ البَيْتِ حَدِيقَةٌ ✓</span>." },
    { tr: "<b>Evin bölümleri:</b> <span class=\"ar\">غُرْفَةُ الجُلُوسِ</span> oturma odası · <span class=\"ar\">غُرْفَةُ الضُّيُوفِ</span> misafir odası · <span class=\"ar\">غُرْفَةُ النَّوْمِ</span> yatak odası · <span class=\"ar\">المَطْبَخُ</span> mutfak · <span class=\"ar\">الحَمَّامُ</span> banyo · <span class=\"ar\">الحَدِيقَةُ</span> bahçe." }
  ],
  kaide: ["١ ـ أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ: مِمَّ يَتَكَوَّنُ بَيْتُ عَبْدِ الرَّحْمَنِ؟ مَاذَا فِي غُرْفَةِ عَبْدِ الرَّحْمَنِ؟ مَاذَا فِي المَطْبَخِ؟ مَاذَا فِي الحَدِيقَةِ؟ أَيْنَ يَقْضِي وَالِدُ عَبْدِ الرَّحْمَنِ وَقْتَ فَرَاغِهِ؟", "٢ ـ ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ العِبَارَاتِ الآتِيَةِ، وَصَحِّحِ الخَطَأَ."],
  ex: [
    { type: "pick", num: "١", ar: "أَجِبْ عَنِ الأَسْئِلَةِ الآتِيَةِ", tr: "Metne göre doğru cevabı seç.", items: PL([
      ["مِمَّ يَتَكَوَّنُ بَيْتُ عَبْدِ الرَّحْمَنِ؟", "مِنْ أَرْبَعِ غُرَفٍ وَمَطْبَخٍ وَحَمَّامٍ.", "مِنْ ثَلَاثِ غُرَفٍ وَحَدِيقَةٍ.", "مِنْ غُرْفَتَيْنِ وَمَطْبَخٍ.", "Abdurrahman’ın evi neden oluşur? Dört oda, mutfak ve banyodan.", "Oturma, misafir, yatak odası ve Abdurrahman’ın odası."],
      ["مَاذَا فِي غُرْفَةِ عَبْدِ الرَّحْمَنِ؟", "مَقْعَدٌ وَطَاوِلَةٌ عَلَيْهَا حَاسُوبٌ وَطَابِعَةٌ.", "سَرِيرٌ وَخِزَانَةُ مَلَابِسَ وَمِرْآةٌ.", "ثَلَاثُ أَرَائِكَ وَتِلْفَازٌ.", "Abdurrahman’ın odasında ne var? Bir oturak, bir masa; masada bilgisayar ve yazıcı.", "İkinci seçenek yatak odası, üçüncüsü misafir odası."],
      ["مَاذَا فِي المَطْبَخِ؟", "ثَلَّاجَةٌ وَفُرْنٌ وَغَسَّالَةٌ وَرُفُوفٌ.", "أَرِيكَةٌ وَمَكْتَبَةٌ وَمِدْفَأَةٌ.", "مَقْعَدٌ وَحَاسُوبٌ.", "Mutfakta ne var? Buzdolabı, fırın, çamaşır makinesi ve raflar.", "Raflar yemek ve içecek gereçleri içindir."],
      ["مَاذَا فِي الحَدِيقَةِ؟", "أَشْجَارٌ وَأَزْهَارٌ مُخْتَلِفَةٌ.", "طَاوِلَةٌ وَعَشَرَةُ كَرَاسِيَّ.", "سَتَائِرُ جَمِيلَةٌ.", "Bahçede ne var? Çeşitli ağaçlar ve çiçekler.", "فِيهَا أَشْجَارٌ وَأَزْهَارٌ مُخْتَلِفَةٌ."],
      ["أَيْنَ يَقْضِي وَالِدُ عَبْدِ الرَّحْمَنِ وَقْتَ فَرَاغِهِ؟", "فِي الحَدِيقَةِ.", "فِي غُرْفَةِ الضُّيُوفِ.", "عَلَى شَاطِئِ البَحْرِ.", "Babası boş vaktini nerede geçirir? Bahçede.", "يُحِبُّ أَنْ يَقْضِيَ وَقْتَ فَرَاغِهِ فِيهَا (الحَدِيقَةِ)."]
    ])},
    { type: "classify", num: "٢", opts: TF, ar: "ضَعْ إِشَارَةَ (✓) أَوْ (✗) أَمَامَ العِبَارَاتِ الآتِيَةِ", tr: "Cümle doğru mu (✓), yanlış mı (✗)? Yanlışların düzeltmesi bir sonraki alıştırmada.", items: CL([
      ["بَيْتُ عَبْدِ الرَّحْمَنِ تَارِيخِيٌّ قَدِيمٌ.", "d", "بَيْتُهُ تَارِيخِيٌّ قَدِيمٌ."],
      ["غُرْفَةُ الجُلُوسِ لَيْسَ فِيهَا شُرْفَةٌ.", "y", "وَلِلْغُرْفَةِ شُرْفَةٌ كَبِيرَةٌ مُطِلَّةٌ عَلَى البَحْرِ."],
      ["التِّلْفَازُ فِي المَطْبَخِ.", "y", "Televizyon misafir odasında, duvarda asılı."],
      ["عَبْدُ الرَّحْمَنِ لَا يُحِبُّ الحَدِيقَةَ.", "y", "Vaktinin çoğunu bahçede geçirmeyi sever."],
      ["أَمَامَ البَيْتِ حَدِيقَةٌ صَغِيرَةٌ.", "y", "Bahçe evin arkasında: خَلْفَ البَيْتِ."]
    ]) },
    { type: "pick", num: "٢ (صَحِّحْ)", ar: "صَحِّحِ الخَطَأَ", tr: "Yanlış (✗) cümlenin doğrusunu seç.", items: PL([
      ["غُرْفَةُ الجُلُوسِ لَيْسَ فِيهَا شُرْفَةٌ. ✗", "لِغُرْفَةِ الجُلُوسِ شُرْفَةٌ كَبِيرَةٌ مُطِلَّةٌ عَلَى البَحْرِ.", "غُرْفَةُ الجُلُوسِ لَيْسَ فِيهَا نَوَافِذُ.", "الشُّرْفَةُ فِي المَطْبَخِ.", "Oturma odasının denize bakan büyük bir balkonu var.", "وَلِلْغُرْفَةِ شُرْفَةٌ كَبِيرَةٌ."],
      ["التِّلْفَازُ فِي المَطْبَخِ. ✗", "التِّلْفَازُ فِي غُرْفَةِ الضُّيُوفِ.", "التِّلْفَازُ فِي غُرْفَةِ النَّوْمِ.", "التِّلْفَازُ فِي الحَدِيقَةِ.", "Televizyon misafir odasında.", "مُعَلَّقٌ عَلَى جِدَارِهَا تِلْفَازٌ كَبِيرٌ."],
      ["عَبْدُ الرَّحْمَنِ لَا يُحِبُّ الحَدِيقَةَ. ✗", "عَبْدُ الرَّحْمَنِ يُحِبُّ أَنْ يَقْضِيَ مُعْظَمَ وَقْتِهِ فِي الحَدِيقَةِ.", "عَبْدُ الرَّحْمَنِ يُحِبُّ المَطْبَخَ.", "عَبْدُ الرَّحْمَنِ لَا يُحِبُّ البَحْرَ.", "Abdurrahman vaktinin çoğunu bahçede geçirmeyi sever.", "لَا يُحِبُّ ← يُحِبُّ"],
      ["أَمَامَ البَيْتِ حَدِيقَةٌ صَغِيرَةٌ. ✗", "خَلْفَ البَيْتِ حَدِيقَةٌ صَغِيرَةٌ.", "أَمَامَ البَيْتِ حَدِيقَةٌ كَبِيرَةٌ.", "فَوْقَ البَيْتِ حَدِيقَةٌ صَغِيرَةٌ.", "Evin arkasında küçük bir bahçe var.", "أَمَامَ ≠ خَلْفَ"]
    ])},
    { type: "pick", extra: true, ar: "أَيْنَ هَذَا الشَّيْءُ فِي بَيْتِ عَبْدِ الرَّحْمَنِ؟", tr: "Metne göre bu eşya evin neresinde?", items: PL([
      ["المَزْهَرِيَّةُ", "فَوْقَ الطَّاوِلَةِ فِي غُرْفَةِ الجُلُوسِ.", "فِي المَطْبَخِ.", "فِي غُرْفَةِ النَّوْمِ.", "Vazo: oturma odasında, masanın üstünde.", ""],
      ["الكُتُبُ وَالمَجَلَّاتُ وَالجَرَائِدُ", "عَلَى رُفُوفِ المَكْتَبَةِ.", "عَلَى طَاوِلَةِ عَبْدِ الرَّحْمَنِ.", "فِي خِزَانَةِ المَلَابِسِ.", "Kitap, dergi ve gazeteler: kitaplığın raflarında.", ""],
      ["السَّتَائِرُ", "عَلَى نَوَافِذِ غُرْفَةِ الجُلُوسِ.", "عَلَى جِدَارِ غُرْفَةِ الضُّيُوفِ.", "فِي الحَدِيقَةِ.", "Perdeler: oturma odasının pencerelerinde.", ""],
      ["الكَرَاسِيُّ العَشَرَةُ", "حَوْلَ الطَّاوِلَةِ فِي غُرْفَةِ الضُّيُوفِ.", "فِي المَطْبَخِ.", "فِي الشُّرْفَةِ.", "On sandalye: misafir odasında, masanın etrafında.", ""],
      ["الحَاسُوبُ وَالطَّابِعَةُ", "عَلَى الطَّاوِلَةِ فِي غُرْفَةِ عَبْدِ الرَّحْمَنِ.", "فِي غُرْفَةِ الجُلُوسِ.", "فِي غُرْفَةِ النَّوْمِ.", "Bilgisayar ve yazıcı: Abdurrahman’ın odasında.", ""],
      ["المِرْآةُ الصَّغِيرَةُ", "فِي غُرْفَةِ النَّوْمِ.", "فِي الحَمَّامِ.", "فِي غُرْفَةِ الضُّيُوفِ.", "Küçük ayna: yatak odasında.", "Metne göre; evlerde aynanın banyoda olması da yaygındır."],
      ["الأَشْجَارُ وَالأَزْهَارُ", "فِي الحَدِيقَةِ خَلْفَ البَيْتِ.", "فِي الشُّرْفَةِ.", "أَمَامَ البَيْتِ.", "Ağaçlar ve çiçekler: evin arkasındaki bahçede.", ""],
      ["المِدْفَأَةُ", "فِي غُرْفَةِ الجُلُوسِ.", "فِي المَطْبَخِ.", "فِي غُرْفَةِ عَبْدِ الرَّحْمَنِ.", "Şömine: oturma odasında.", ""]
    ])}
  ]
},
// ---------------------------------------------------------------- 3 · KELİMELER
{
  id: "u3", no: 3, ar: "الثَّرْوَةُ اللُّغَوِيَّةُ: البَيْتُ وَأَدَوَاتُهُ", tr: "Kelimeler: Ev, Eşya ve Sofra", short: "Kelimeler", col: "mi", legend: [],
  goals: ["Uygun kelimeyi boşluğa yerleştirmek", "Sofradaki gereçlerin adlarını söylemek", "Eşyaları evin bölümlerine yerleştirmek", "Ev kelimelerinin çoğullarını tanımak"],
  examples: [
    { s: "غُرْفَةُ النَّوْمِ:mz / سَرِيرٌ، خِزَانَةٌ، مِرْآةٌ:nasb", tr: "Yatak odası: yatak, dolap, ayna", pair: "المَطْبَخُ:mz / ثَلَّاجَةٌ، فُرْنٌ، غَسَّالَةٌ:nasb", pairTr: "Mutfak: buzdolabı, fırın, çamaşır makinesi" },
    { s: "عَلَى المَائِدَةِ:mz / صَحْنٌ، مِلْعَقَةٌ، شَوْكَةٌ، سِكِّينٌ:nasb", tr: "Sofrada: tabak, kaşık, çatal, bıçak" }
  ],
  rules: [
    { tr: "<b>Oturma / misafir odası:</b> <span class=\"ar\">سَجَّادَةٌ، طَاوِلَةٌ، مَزْهَرِيَّةٌ، أَرِيكَةٌ، مَكْتَبَةٌ، مِدْفَأَةٌ، سَتَائِرُ، تِلْفَازٌ، كُرْسِيٌّ</span>" },
    { tr: "<b>Yatak odası:</b> <span class=\"ar\">سَرِيرٌ، خِزَانَةُ مَلَابِسَ، مِرْآةٌ</span> · <b>Mutfak:</b> <span class=\"ar\">ثَلَّاجَةٌ، فُرْنٌ، غَسَّالَةٌ، رُفُوفٌ</span> · <b>Banyo:</b> <span class=\"ar\">صَابُونٌ، مِنْشَفَةٌ، مِغْسَلَةٌ</span>" },
    { tr: "<b>Sofra gereçleri</b> (<span class=\"ar\">أَدَوَاتُ المَائِدَةِ</span>): <span class=\"ar\">صَحْنٌ</span> tabak · <span class=\"ar\">مِلْعَقَةٌ</span> kaşık · <span class=\"ar\">شَوْكَةٌ</span> çatal · <span class=\"ar\">سِكِّينٌ</span> bıçak · <span class=\"ar\">كُوبٌ / كَأْسٌ</span> bardak · <span class=\"ar\">فِنْجَانٌ</span> fincan · <span class=\"ar\">مِنْدِيلٌ</span> peçete · <span class=\"ar\">مِمْلَحَةٌ</span> tuzluk · <span class=\"ar\">مَزْهَرِيَّةٌ</span> vazo." },
    { tr: "Çoğullar çoğu kez kırık kalıpla gelir: <span class=\"ar\">غُرْفَةٌ ← غُرَفٌ · أَرِيكَةٌ ← أَرَائِكُ · نَافِذَةٌ ← نَوَافِذُ · كُرْسِيٌّ ← كَرَاسِيُّ · رَفٌّ ← رُفُوفٌ</span>. Hepsini “Kelime Hazinesi” sekmesinde çalışabilirsin." }
  ],
  kaide: ["٣ ـ امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ.", "٦ ـ اكْتُبْ مَاذَا عَلَى مَائِدَةِ الطَّعَامِ مِنْ أَدَوَاتٍ. ٨ ـ اكْتُبْ مَاذَا فِي الأَمَاكِنِ الآتِيَةِ فِي بَيْتِكَ: غُرْفَةُ النَّوْمِ، غُرْفَةُ الجُلُوسِ، المَطْبَخُ، الحَمَّامُ."],
  ex: [
    { type: "bank", num: "٣", ar: "امْلَإِ الفَرَاغَاتِ بِالكَلِمَةِ المُنَاسِبَةِ", tr: "Önce aşağıdan kelimeyi seç, sonra boşluğa dokun. 4. ve 5. cümlelerde sıra serbest; bir kelime artar.", bank: ["حَدِيقَةٌ", "رَائِعٌ", "وَقْتَ", "الحَدِيقَةِ", "كُتُبٌ", "مَجَلَّاتٌ", "جَرَائِدُ", "مَقْعَدٌ", "طَاوِلَةٌ", "حَاسُوبٌ", "طَابِعَةٌ"],
      tr2: "1) Evin arkasında küçük bir bahçe var. 2) Abdurrahman’ın odasından deniz manzarası çok güzel. 3) Abdurrahman’ın babası boş vaktini bahçede geçirir. 4) Kitaplığın raflarında kitaplar, dergiler ve gazeteler var. 5) Abdurrahman’ın odasında bir oturak, bir masa ve bir bilgisayar (ya da yazıcı) var.",
      parts: ["١ ـ خَلْفَ البَيْتِ", { a: [0] }, "صَغِيرَةٌ.<br>٢ ـ مَنْظَرُ البَحْرِ مِنْ غُرْفَةِ عَبْدِ الرَّحْمَنِ", { a: [1] }, "جِدًّا.<br>٣ ـ يَقْضِي وَالِدُ عَبْدِ الرَّحْمَنِ", { a: [2] }, "فَرَاغِهِ فِي", { a: [3] }, ".<br>٤ ـ عَلَى رُفُوفِ المَكْتَبَةِ", { a: [4, 5, 6] }, "وَ", { a: [4, 5, 6] }, "وَ", { a: [4, 5, 6] }, ".<br>٥ ـ غُرْفَةُ عَبْدِ الرَّحْمَنِ فِيهَا", { a: [7, 8, 9, 10] }, "وَ", { a: [7, 8, 9, 10] }, "وَ", { a: [7, 8, 9, 10] }, "."] },
    { type: "pick", fill: true, num: "٦", ar: "اكْتُبْ مَاذَا عَلَى مَائِدَةِ الطَّعَامِ مِنْ أَدَوَاتٍ", tr: "Resimdeki sofra gerecinin Arapça adını seç.", items: PL([
      ["🍽️ ← ___", "صَحْنٌ", "كُوبٌ", "سِكِّينٌ", "tabak", "Çoğulu: صُحُونٌ."],
      ["🥄 ← ___", "مِلْعَقَةٌ", "شَوْكَةٌ", "فِنْجَانٌ", "kaşık", "Çoğulu: مَلَاعِقُ."],
      ["🍴 ← ___", "شَوْكَةٌ وَسِكِّينٌ", "مِلْعَقَةٌ وَصَحْنٌ", "كُوبٌ وَفِنْجَانٌ", "çatal ve bıçak", "شَوْكَةٌ ج شُوَكٌ · سِكِّينٌ ج سَكَاكِينُ."],
      ["🔪 ← ___", "سِكِّينٌ", "مِلْعَقَةٌ", "مِنْدِيلٌ", "bıçak", ""],
      ["☕ ← ___", "فِنْجَانٌ", "صَحْنٌ", "مِمْلَحَةٌ", "fincan", "Çoğulu: فَنَاجِينُ."],
      ["🥛 ← ___", "كُوبٌ", "سِكِّينٌ", "مَزْهَرِيَّةٌ", "bardak", "كَأْسٌ da denir."],
      ["🧂 ← ___", "مِمْلَحَةٌ", "مِنْدِيلٌ", "شَوْكَةٌ", "tuzluk", "مِلْحٌ: tuz."],
      ["💐 ← ___", "مَزْهَرِيَّةٌ وَزُهُورٌ", "صُحُونٌ وَمَلَاعِقُ", "أَكْوَابٌ", "vazo ve çiçekler", "Resimdeki sofranın ortasında."],
      ["🧻 ← ___", "مِنْدِيلٌ", "مِرْآةٌ", "سَتَائِرُ", "peçete", "Çoğulu: مَنَادِيلُ."],
      ["🫖 ← ___", "إِبْرِيقٌ", "فُرْنٌ", "ثَلَّاجَةٌ", "demlik, ibrik", "Çoğulu: أَبَارِيقُ."]
    ])},
    { type: "classify", num: "٨", opts: ODA, ar: "اكْتُبْ مَاذَا فِي الأَمَاكِنِ الآتِيَةِ فِي بَيْتِكَ", tr: "Bu eşya evin hangi bölümünde olur? Sonra kendi evindeki eşyaları defterine dört sütun hâlinde yaz.", items: CL([
      ["سَرِيرٌ", "n", "Yatak: yatak odası."], ["خِزَانَةُ مَلَابِسَ", "n", "Elbise dolabı: yatak odası."], ["مِرْآةٌ صَغِيرَةٌ (فِي النَّصِّ)", "n", "Metinde yatak odasında."], ["وِسَادَةٌ", "n", "Yastık: yatak odası."],
      ["أَرِيكَةٌ مُرِيحَةٌ", "c", "Kanepe: oturma odası."], ["مَكْتَبَةٌ", "c", "Kitaplık: metinde oturma odasında."], ["مِدْفَأَةٌ", "c", "Şömine: oturma odası."], ["تِلْفَازٌ", "c", "Televizyon: oturma / misafir odası."],
      ["ثَلَّاجَةٌ", "m", "Buzdolabı: mutfak."], ["فُرْنٌ", "m", "Fırın: mutfak."], ["غَسَّالَةٌ (فِي النَّصِّ)", "m", "Metinde mutfakta."], ["أَدَوَاتُ الطَّعَامِ", "m", "Yemek gereçleri: mutfak rafları."],
      ["صَابُونٌ", "h", "Sabun: banyo."], ["مِنْشَفَةٌ", "h", "Havlu: banyo."], ["مِغْسَلَةٌ", "h", "Lavabo: banyo."], ["فُرْشَاةُ الأَسْنَانِ", "h", "Diş fırçası: banyo."]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "هَاتِ جَمْعَ الكَلِمَاتِ الآتِيَةِ", tr: "Metindeki kelimenin çoğulunu seç.", items: PL([
      ["غُرْفَةٌ ← ___", "غُرَفٌ", "غُرُوفٌ", "أَغْرَافٌ", "oda → odalar", "فُعَلٌ kalıbı."],
      ["بَيْتٌ ← ___", "بُيُوتٌ", "أَبْيِتَةٌ", "بَيْتَاتٌ", "ev → evler", "فُعُولٌ kalıbı. (أَبْيَاتٌ ise şiir beyitlerinin çoğuludur.)"],
      ["أَرِيكَةٌ ← ___", "أَرَائِكُ", "أَرْيَاكٌ", "أُرُوكٌ", "kanepe → kanepeler", "فَعَائِلُ kalıbı."],
      ["نَافِذَةٌ ← ___", "نَوَافِذُ", "نَافِذَاتٌ", "نُفُوذٌ", "pencere → pencereler", "فَوَاعِلُ kalıbı."],
      ["كُرْسِيٌّ ← ___", "كَرَاسِيُّ", "كُرْسِيَّاتٌ", "أَكْرَاسٌ", "sandalye → sandalyeler", "Metinde: عَشَرَةُ كَرَاسِيَّ."],
      ["رَفٌّ ← ___", "رُفُوفٌ", "أَرْفَافٌ", "رَفَّاتٌ", "raf → raflar", "فُعُولٌ kalıbı."],
      ["شَجَرَةٌ ← ___", "أَشْجَارٌ", "شُجُورٌ", "شَجَائِرُ", "ağaç → ağaçlar", "أَفْعَالٌ kalıbı."],
      ["زَهْرَةٌ ← ___", "أَزْهَارٌ / زُهُورٌ", "زَهَائِرُ", "أَزْهُرَةٌ", "çiçek → çiçekler", "İkisi de kullanılır."],
      ["جَرِيدَةٌ ← ___", "جَرَائِدُ", "أَجْرِدَةٌ", "جَرْدَاءُ", "gazete → gazeteler", "فَعَائِلُ kalıbı."],
      ["ضَيْفٌ ← ___", "ضُيُوفٌ", "ضَيَائِفُ", "ضَيْفَاتٌ", "misafir → misafirler", "غُرْفَةُ الضُّيُوفِ: misafir odası."]
    ])}
  ]
},
// ---------------------------------------------------------------- 4 · CÜMLE, HARF-İ CER VE ZARF
{
  id: "u4", no: 4, ar: "حُرُوفُ الجَرِّ وَالظُّرُوفُ وَتَرْتِيبُ الجُمَلِ", tr: "Harf-i Cer, Zarflar ve Cümle Kurma", short: "Edatlar", col: "ref", legend: ["cerr", "mz"],
  goals: ["Cümleye uygun harf-i ceri seçmek: مِنْ، إِلَى، عَنْ، فِي، عَلَى، بِـ، لِـ", "Zaman ve mekân zarflarını tanımak: صَبَاحًا، خَلْفَ، فَوْقَ…", "Karışık kelimelerden anlamlı cümle kurmak", "“أَيْنَ” ile soru sormak"],
  examples: [
    { s: "فَوْقَ:cerr.Mekân / الطَّاوِلَةِ:mz.Mecrûr / مَزْهَرِيَّةٌ:nasb", tr: "Masanın üstünde bir vazo var.", pair: "عَلَى:cerr.Harf-i cer / رُفُوفِ المَكْتَبَةِ:mz.Mecrûr / كُتُبٌ:nasb", pairTr: "Kitaplığın raflarında kitaplar var." },
    { s: "أَيْنَ:cerr.Soru / تَسْكُنُ؟:-", tr: "Nerede oturuyorsun?", pair: "أَسْكُنُ:- / فِي الإِسْكَنْدَرِيَّةِ.:mz", pairTr: "İskenderiye’de oturuyorum." }
  ],
  rules: [
    { tr: "<b>Dikkat et (لَاحِظْ أَيْضًا):</b><br>• <b>Zaman zarfları</b>: <span class=\"ar\">صَبَاحًا، مَسَاءً، صَيْفًا، شِتَاءً، ظُهْرًا، عَصْرًا، عِشَاءً، لَيْلًا</span><br>• <b>Mekân zarfları</b>: <span class=\"ar\">أَمَامَ، خَلْفَ، تَحْتَ، فَوْقَ، بَيْنَ، حَوْلَ، يَمِينَ، يَسَارَ</span><br>• <b>Harf-i cerler</b>: <span class=\"ar\">مِنْ، إِلَى، عَنْ، فِي، عَلَى، بِـ، لِـ</span>" },
    { tr: "Harf-i cerden ve mekân zarfından sonraki isim <b>mecrûr</b> (esreli) olur: <span class=\"ar\">فِي الحَدِيقَةِ · عَلَى الطَّاوِلَةِ · خَلْفَ البَيْتِ · حَوْلَ الطَّاوِلَةِ</span>. Zaman zarfları tek başına mansûb gelir: <span class=\"ar\">صَبَاحًا، لَيْلًا</span>." },
    { tr: "<b>Kalıplaşmış kullanımlar:</b> <span class=\"ar\">مَفْرُوشَةٌ بِـ</span> … ile döşeli · <span class=\"ar\">مُطِلَّةٌ عَلَى</span> …-e bakan · <span class=\"ar\">قَرِيبٌ مِنْ</span> …-e yakın · <span class=\"ar\">يَتَكَوَّنُ مِنْ</span> …-den oluşur · <span class=\"ar\">مِنْ مَدِينَةِ…</span> … şehrinden." },
    { tr: "<b>أَيْنَ ile soru:</b> cevaptaki fiili muhataba göre çevir: <span class=\"ar\">أَنَا أَسْكُنُ ← أَيْنَ تَسْكُنُ؟ · هُمَا يَلْعَبَانِ ← أَيْنَ يَلْعَبَانِ؟ · نَحْنُ نَقْرَأُ ← أَيْنَ تَقْرَؤُونَ؟</span>" }
  ],
  kaide: ["٤ ـ اخْتَرِ الجَوَابَ الصَّحِيحَ. ٥ ـ رَتِّبِ الكَلِمَاتِ الآتِيَةَ، لِتُكَوِّنَ جُمْلَةً مُفِيدَةً. ٧ ـ سَلْ بِـ (أَيْنَ) كَمَا فِي المِثَالِ: أَيْنَ تَسْكُنُ؟ ← أَنَا أَسْكُنُ فِي الإِسْكَنْدَرِيَّةِ.", "لَاحِظْ أَيْضًا: مِنْ ظُرُوفِ الزَّمَانِ (صَبَاحًا، مَسَاءً…)، مِنْ ظُرُوفِ المَكَانِ (أَمَامَ، خَلْفَ…)، مِنْ حُرُوفِ الجَرِّ (مِنْ، إِلَى…). تَدْرِيبٌ: امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِحَرْفِ جَرٍّ مُنَاسِبٍ."],
  ex: [
    { type: "pick", fill: true, num: "٤", ar: "اخْتَرِ الجَوَابَ الصَّحِيحَ", tr: "Metne ve cümleye uygun kelimeyi seç (kitaptaki dört seçenek).", items: PL4([
      ["يَسْكُنُ عَبْدُ الرَّحْمَنِ ___ البَيْتِ.", ["فِي", "أَمَامَ", "عَلَى", "عِنْدَ"], "Abdurrahman evde oturuyor.", "سَكَنَ فِي: …-de oturdu."],
      ["غُرْفَةُ الجُلُوسِ مَفْرُوشَةٌ ___ سَجَّادَةٍ جَمِيلَةٍ.", ["بِـ", "مِنْ", "عَلَى", "فِي"], "Oturma odası güzel bir halıyla döşeli.", "مَفْرُوشَةٌ بِـ: … ile döşeli (metinde: بِسَجَّادَةٍ)."],
      ["غُرْفَةُ عَبْدِ الرَّحْمَنِ مُطِلَّةٌ ___ البَحْرِ.", ["عَلَى", "أَمَامَ", "مِنْ", "إِلَى"], "Abdurrahman’ın odası denize bakıyor.", "مُطِلَّةٌ عَلَى: …-e bakan."],
      ["بَيْتُ عَبْدِ الرَّحْمَنِ يَتَكَوَّنُ مِنْ ___.", ["أَرْبَعِ غُرَفٍ", "طَابِقَيْنِ", "طَابِقٍ وَاحِدٍ", "ثَلَاثَةِ طَوَابِقَ"], "Abdurrahman’ın evi dört odadan oluşur.", "Metin kat sayısını söylemez; dört oda söyler."],
      ["يَقْضِي عَبْدُ الرَّحْمَنِ مُعْظَمَ وَقْتِهِ ___ الحَدِيقَةِ.", ["فِي", "خَلْفَ", "مِنْ", "فَوْقَ"], "Abdurrahman vaktinin çoğunu bahçede geçirir.", "Bahçe evin arkasında ama vakit bahçenin içinde geçer: فِي."]
    ])},
    { type: "bank", num: "٥", reuse: true, ar: "رَتِّبِ الكَلِمَاتِ الآتِيَةَ، لِتُكَوِّنَ جُمْلَةً مُفِيدَةً", tr: "Her cümlenin ilk kelimesi verildi. Önce aşağıdan kelimeyi seç, sonra sıradaki kutuya dokun.", bank: ["البَيْتِ", "ثَلَاثُ", "غُرَفٍ", "وَمَطْبَخٌ", "الجُلُوسِ", "وَاسِعَةٌ", "حَدِيقَةٌ", "جَمِيلَةٌ", "البَحْرِ", "مِنْ", "بَيْتِي", "رَائِعٌ"],
      tr2: "1) Evde üç oda ve bir mutfak var. 2) Oturma odası geniştir. 3) Evde güzel bir bahçe var. 4) Evimden deniz manzarası harika.",
      parts: ["١ ـ فِي", { a: [0] }, { a: [1] }, { a: [2] }, { a: [3] }, ".<br>٢ ـ غُرْفَةُ", { a: [4] }, { a: [5] }, ".<br>٣ ـ فِي", { a: [0] }, { a: [6] }, { a: [7] }, ".<br>٤ ـ مَنْظَرُ", { a: [8] }, { a: [9] }, { a: [10] }, { a: [11] }, "."] },
    { type: "pick", fill: true, num: "٧", ar: "سَلْ بِـ (أَيْنَ) كَمَا فِي المِثَالِ", tr: "Cevaba uygun “أَيْنَ” sorusunu seç.", exHtml: '<span class="ar">أَيْنَ تَسْكُنُ؟ ← أَنَا أَسْكُنُ فِي الإِسْكَنْدَرِيَّةِ.</span>', items: PL([
      ["___ ← هِيَ تَسْكُنُ فِي إِسْطَنْبُولَ.", "أَيْنَ تَسْكُنُ؟", "أَيْنَ يَسْكُنُ؟", "أَيْنَ تَسْكُنَانِ؟", "Nerede oturuyor (kadın)? — İstanbul’da oturuyor.", "هِيَ ← تَسْكُنُ"],
      ["___ ← هُوَ يَدْرُسُ فِي الإِسْكَنْدَرِيَّةِ.", "أَيْنَ يَدْرُسُ؟", "أَيْنَ تَدْرُسِينَ؟", "أَيْنَ يَدْرُسَانِ؟", "Nerede okuyor? — İskenderiye’de okuyor.", "هُوَ ← يَدْرُسُ"],
      ["___ ← هُمَا يَلْعَبَانِ فِي الشَّارِعِ.", "أَيْنَ يَلْعَبَانِ؟", "أَيْنَ يَلْعَبُ؟", "أَيْنَ تَلْعَبِينَ؟", "Nerede oynuyorlar (ikisi)? — Sokakta oynuyorlar.", "هُمَا (eril) ← يَـ…ـَانِ"],
      ["___ ← هُمَا تَجْلِسَانِ فِي المَقْهَى.", "أَيْنَ تَجْلِسَانِ؟", "أَيْنَ يَجْلِسَانِ؟", "أَيْنَ تَجْلِسُ؟", "Nerede oturuyorlar (iki kadın)? — Kahvehanede oturuyorlar.", "هُمَا (dişil) ← تَـ…ـَانِ"],
      ["___ ← نَحْنُ نَقْرَأُ فِي المَكْتَبَةِ.", "أَيْنَ تَقْرَؤُونَ؟", "أَيْنَ نَقْرَأُ؟", "أَيْنَ يَقْرَأُ؟", "Nerede okuyorsunuz? — Kütüphanede okuyoruz.", "Cevap نَحْنُ ise soru أَنْتُمْ’a sorulur: تَقْرَؤُونَ."]
    ])},
    { type: "bank", num: "تَدْرِيبٌ", reuse: true, ar: "امْلَإِ الفَرَاغَاتِ الآتِيَةَ بِحَرْفِ جَرٍّ مُنَاسِبٍ", tr: "Önce aşağıdan harf-i ceri seç, sonra boşluğa dokun. Bir harf birden çok kez kullanılabilir.", bank: ["بِـ", "فِي", "مِنْ", "عَلَى"],
      tr2: "1) Misafir odasının yeri güzel bir halıyla döşeli. 2) Babam vaktinin çoğunu işte geçiriyor. 3) Bahçemizde uzun ağaçlar var. 4) Arkadaşım Ahmed İzmir şehrinden. 5) Kitaplığımın raflarında çok kitap var.",
      parts: ["١ ـ أَرْضُ غُرْفَةِ الضُّيُوفِ مَفْرُوشَةٌ", { a: [0] }, "سَجَّادَةٍ جَمِيلَةٍ.<br>٢ ـ يَقْضِي وَالِدِي مُعْظَمَ وَقْتِهِ", { a: [1] }, "العَمَلِ.<br>٣ ـ", { a: [1] }, "حَدِيقَتِنَا أَشْجَارٌ طَوِيلَةٌ.<br>٤ ـ صَدِيقِي أَحْمَدُ", { a: [2] }, "مَدِينَةِ إِزْمِيرَ.<br>٥ ـ", { a: [3] }, "رُفُوفِ مَكْتَبَتِي كُتُبٌ كَثِيرَةٌ."] },
    { type: "classify", extra: true, opts: ZARF, ar: "صَنِّفِ الكَلِمَاتِ: ظَرْفُ زَمَانٍ، ظَرْفُ مَكَانٍ، حَرْفُ جَرٍّ", tr: "Kelime zaman zarfı mı, mekân zarfı mı, harf-i cer mi?", items: CL([
      ["صَبَاحًا", "z", "sabahleyin"], ["مَسَاءً", "z", "akşamleyin"], ["صَيْفًا", "z", "yazın"], ["شِتَاءً", "z", "kışın"], ["ظُهْرًا", "z", "öğleyin"], ["لَيْلًا", "z", "geceleyin"],
      ["أَمَامَ", "m", "önünde"], ["خَلْفَ", "m", "arkasında"], ["تَحْتَ", "m", "altında"], ["فَوْقَ", "m", "üstünde"], ["حَوْلَ", "m", "etrafında"], ["يَمِينَ", "m", "sağında"],
      ["مِنْ", "c", "-den"], ["إِلَى", "c", "-e"], ["عَنْ", "c", "-den, hakkında"], ["فِي", "c", "-de, içinde"], ["عَلَى", "c", "üzerinde"], ["بِـ", "c", "ile"]
    ]) },
    { type: "pick", fill: true, extra: true, ar: "أَكْمِلْ بِظَرْفِ مَكَانٍ مُنَاسِبٍ", tr: "Metne göre uygun mekân zarfını seç.", items: PL([
      ["___ البَيْتِ حَدِيقَةٌ صَغِيرَةٌ.", "خَلْفَ", "أَمَامَ", "تَحْتَ", "Evin arkasında küçük bir bahçe var.", ""],
      ["___ الطَّاوِلَةِ مَزْهَرِيَّةٌ جَمِيلَةٌ.", "فَوْقَ", "تَحْتَ", "خَلْفَ", "Masanın üstünde güzel bir vazo var.", ""],
      ["___ الطَّاوِلَةِ عَشَرَةُ كَرَاسِيَّ.", "حَوْلَ", "فَوْقَ", "بَيْنَ", "Masanın etrafında on sandalye var.", ""],
      ["القِطُّ نَائِمٌ ___ السَّرِيرِ.", "تَحْتَ", "صَبَاحًا", "إِلَى", "Kedi yatağın altında uyuyor.", "Kitaptan değil."],
      ["يَجْلِسُ أَبِي ___ التِّلْفَازِ.", "أَمَامَ", "لَيْلًا", "عَنْ", "Babam televizyonun önünde oturuyor.", "Kitaptan değil."]
    ])}
  ]
},
// ---------------------------------------------------------------- 5 · LÂM VE İŞARET İSİMLERİ
{
  id: "u5", no: 5, ar: "اللَّامُ الشَّمْسِيَّةُ وَالقَمَرِيَّةُ وَأَسْمَاءُ الإِشَارَةِ", tr: "Şemsî–Kamerî Lâm ve İşaret İsimleri", short: "İşaret", col: "muz", legend: ["mi", "nasb"],
  goals: ["“ال”nin lâmının okunup okunmadığını bilmek: kamerî – şemsî", "Yakın ve uzak işaret isimlerini tanımak: هَذَا، ذَلِكَ…", "İsme (tekil, ikil, çoğul; eril, dişil; akıllı, akılsız) uygun işaret ismini seçmek", "Akılsız çoğulda هَذِهِ / تِلْكَ kullanmak"],
  examples: [
    { s: "هَذَا:mi / مُعَلِّمٌ جَيِّدٌ:nasb.Tekil eril", tr: "Bu iyi bir öğretmen.", pair: "هَذِهِ:mi / سَيَّارَةٌ جَمِيلَةٌ:nasb.Tekil dişil", pairTr: "Bu güzel bir araba." },
    { s: "هَذَانِ:mi / طَالِبَانِ مُجْتَهِدَانِ:nasb.İkil eril", tr: "Bunlar iki çalışkan öğrenci.", pair: "هَاتَانِ:mi / طَالِبَتَانِ مُجْتَهِدَتَانِ:nasb.İkil dişil", pairTr: "Bunlar iki çalışkan kız öğrenci." },
    { s: "هَؤُلَاءِ:mi / طُلَّابٌ مُجْتَهِدُونَ:nasb.Akıllı çoğul", tr: "Bunlar çalışkan öğrenciler.", pair: "هَذِهِ:mi / أَقْلَامٌ جَمِيلَةٌ:nasb.Akılsız çoğul", pairTr: "Bunlar güzel kalemler." }
  ],
  rules: [
    { tr: "<b>Kamerî lâm</b> (<span class=\"ar\">اللَّامُ القَمَرِيَّةُ</span>): lâm okunur, sonraki harf şeddesizdir: <span class=\"ar\">القَلَمُ، البَيْتُ، العَيْنُ، الكِتَابُ، المَدِينَةُ</span>. Harfleri: <span class=\"ar\">ا ب غ ح ج ك و خ ف ع ق ي م هـ</span> (“<span class=\"ar\">ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ</span>”)." },
    { tr: "<b>Şemsî lâm</b> (<span class=\"ar\">اللَّامُ الشَّمْسِيَّةُ</span>): lâm okunmaz, sonraki harf şeddeli okunur: <span class=\"ar\">الدَّفْتَرُ، السَّبُّورَةُ، الطَّالِبُ، الصَّفْحَةُ، التِّلْفَازُ</span>. Harfleri: <span class=\"ar\">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span>." },
    { tr: "<b>Dikkat et (لَاحِظْ): işaret isimleri</b><br>• tekil eril: <span class=\"ar\">هَذَا</span> (yakın) · <span class=\"ar\">ذَلِكَ</span> (uzak)<br>• tekil dişil: <span class=\"ar\">هَذِهِ</span> · <span class=\"ar\">تِلْكَ</span><br>• ikil eril: <span class=\"ar\">هَذَانِ</span> · ikil dişil: <span class=\"ar\">هَاتَانِ</span><br>• akıllı çoğul (eril ve dişil): <span class=\"ar\">هَؤُلَاءِ</span> · <span class=\"ar\">أُولَئِكَ</span><br>• akılsız çoğul: <span class=\"ar\">هَذِهِ</span> · <span class=\"ar\">تِلْكَ</span> (<span class=\"ar\">هَذِهِ أَقْلَامٌ جَمِيلَةٌ</span>)" },
    { tr: "İşaret isminden sonraki nekre isim haberdir: <span class=\"ar\">هَذَا بَيْتٌ</span> “Bu bir evdir”. Akılsız varlıkların çoğulu tekil dişil gibi davranır: <span class=\"ar\">هَذِهِ حَقَائِبُ جَمِيلَةٌ</span>." }
  ],
  kaide: ["٩ ـ صَنِّفِ الكَلِمَاتِ الآتِيَةَ: (القَلَمُ، الدَّفْتَرُ، البَيْتُ، السَّبُّورَةُ، الطَّالِبُ، العَيْنُ، الكِتَابُ، الصَّفْحَةُ، التِّلْفَازُ، المَدِينَةُ): اللَّامُ القَمَرِيَّةُ ـ اللَّامُ الشَّمْسِيَّةُ.", "لَاحِظْ: أَسْمَاءُ الإِشَارَةِ. التَّدْرِيبُ الأَوَّلُ: أَكْمِلِ الجُمَلَ الآتِيَةَ بِاسْمِ إِشَارَةٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ. التَّدْرِيبُ الثَّانِي: أَكْمِلِ الجُمَلَ الآتِيَةَ بِاسْمِ إِشَارَةٍ مُنَاسِبٍ."],
  ex: [
    { type: "classify", num: "٩", opts: LAM, ar: "صَنِّفِ الكَلِمَاتِ الآتِيَةَ", tr: "“ال”nin lâmı kamerî mi (okunur), şemsî mi (okunmaz)? İlk onu kitaptan.", items: CL([
      ["القَلَمُ", "q", "ق kamerî: el-kalem."], ["الدَّفْتَرُ", "s", "د şemsî: ed-defter (şedde)."], ["البَيْتُ", "q", "ب kamerî: el-beyt."], ["السَّبُّورَةُ", "s", "س şemsî: es-sebbûra."], ["الطَّالِبُ", "s", "ط şemsî: et-tâlib."],
      ["العَيْنُ", "q", "ع kamerî: el-ayn."], ["الكِتَابُ", "q", "ك kamerî: el-kitâb."], ["الصَّفْحَةُ", "s", "ص şemsî: es-safha."], ["التِّلْفَازُ", "s", "ت şemsî: et-tilfâz."], ["المَدِينَةُ", "q", "م kamerî: el-medîne."],
      ["الشَّمْسُ", "s", "ش şemsî; adını bu kelimeden alır."], ["القَمَرُ", "q", "ق kamerî; adını bu kelimeden alır."], ["الحَدِيقَةُ", "q", "ح kamerî."], ["النَّوْمُ", "s", "ن şemsî: en-nevm."], ["الجُلُوسُ", "q", "ج kamerî: el-culûs."], ["الرَّحْمَنُ", "s", "ر şemsî: er-rahmân."]
    ]) },
    { type: "pick", fill: true, num: "التَّدْرِيبُ الأَوَّلُ", ar: "أَكْمِلِ الجُمَلَ الآتِيَةَ بِاسْمِ إِشَارَةٍ مُنَاسِبٍ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Kitaptaki seçeneklerden uygun işaret ismini seç.", items: PL([
      ["___ صَفٌّ وَاسِعٌ.", "هَذَا", "هَذِهِ", "هَاتَانِ", "Bu geniş bir sınıf.", "صَفٌّ: tekil eril ← هَذَا"],
      ["___ سَيَّارَةٌ جَمِيلَةٌ.", "هَذِهِ", "هَذَا", "هَؤُلَاءِ", "Bu güzel bir araba.", "سَيَّارَةٌ: tekil dişil ← هَذِهِ"],
      ["___ مُعَلِّمَتَانِ جَيِّدَتَانِ.", "هَاتَانِ", "هَذَانِ", "هَؤُلَاءِ", "Bunlar iki iyi (kadın) öğretmen.", "İkil dişil ← هَاتَانِ"],
      ["___ طُلَّابٌ مُجْتَهِدُونَ.", "هَؤُلَاءِ", "هَذَانِ", "هَذِهِ", "Bunlar çalışkan öğrenciler.", "Akıllı çoğul ← هَؤُلَاءِ"],
      ["___ طَالِبَانِ نَشِيطَانِ.", "هَذَانِ", "هَذَا", "هَؤُلَاءِ", "Bunlar iki çalışkan öğrenci.", "İkil eril ← هَذَانِ"]
    ])},
    { type: "pick", fill: true, num: "التَّدْرِيبُ الثَّانِي", ar: "أَكْمِلِ الجُمَلَ الآتِيَةَ بِاسْمِ إِشَارَةٍ مُنَاسِبٍ", tr: "Uygun işaret ismini seç.", items: PL([
      ["___ قِطٌّ جَمِيلٌ.", "هَذَا", "هَذِهِ", "هَذَانِ", "Bu güzel bir kedi.", "قِطٌّ: tekil eril."],
      ["___ سَفِينَةٌ كَبِيرَةٌ.", "هَذِهِ", "هَذَا", "هَاتَانِ", "Bu büyük bir gemi.", "سَفِينَةٌ: tekil dişil."],
      ["___ وَلَدَانِ مُؤَدَّبَانِ.", "هَذَانِ", "هَاتَانِ", "هَؤُلَاءِ", "Bunlar iki terbiyeli çocuk.", "وَلَدَانِ: ikil eril."],
      ["___ طَبِيبَاتٌ نَشِيطَاتٌ.", "هَؤُلَاءِ", "هَذِهِ", "هَاتَانِ", "Bunlar çalışkan (kadın) doktorlar.", "Akıllı çoğul (dişil de olsa) ← هَؤُلَاءِ"],
      ["___ حَقَائِبُ جَمِيلَةٌ.", "هَذِهِ", "هَؤُلَاءِ", "هَذَا", "Bunlar güzel çantalar.", "حَقَائِبُ: akılsız çoğul ← هَذِهِ"]
    ])},
    { type: "pick", fill: true, extra: true, ar: "اخْتَرِ اسْمَ الإِشَارَةِ لِلْبَعِيدِ أَوِ القَرِيبِ", tr: "Parantezdeki yakın / uzak bilgisine göre işaret ismini seç.", items: PL([
      ["(uzak) ___ مُعَلِّمٌ جَيِّدٌ.", "ذَلِكَ", "هَذَا", "تِلْكَ", "Şu iyi bir öğretmen.", "Tekil eril, uzak ← ذَلِكَ"],
      ["(uzak) ___ سَيَّارَةٌ جَمِيلَةٌ.", "تِلْكَ", "ذَلِكَ", "هَذِهِ", "Şu güzel bir araba.", "Tekil dişil, uzak ← تِلْكَ"],
      ["(uzak) ___ طُلَّابٌ مُجْتَهِدُونَ.", "أُولَئِكَ", "هَؤُلَاءِ", "تِلْكَ", "Şunlar çalışkan öğrenciler.", "Akıllı çoğul, uzak ← أُولَئِكَ"],
      ["(uzak) ___ أَقْلَامٌ جَمِيلَةٌ.", "تِلْكَ", "أُولَئِكَ", "ذَلِكَ", "Şunlar güzel kalemler.", "Akılsız çoğul, uzak ← تِلْكَ"],
      ["(yakın) ___ غُرْفَةُ النَّوْمِ.", "هَذِهِ", "تِلْكَ", "هَذَا", "Bu yatak odası.", "غُرْفَةٌ dişil."],
      ["(uzak) ___ بَيْتٌ تَارِيخِيٌّ.", "ذَلِكَ", "تِلْكَ", "أُولَئِكَ", "Şu tarihî bir ev.", "بَيْتٌ eril."],
      ["(yakın) ___ سَتَائِرُ جَمِيلَةٌ.", "هَذِهِ", "هَؤُلَاءِ", "هَذَانِ", "Bunlar güzel perdeler.", "Akılsız çoğul ← هَذِهِ"],
      ["(yakın) ___ ضُيُوفٌ كِرَامٌ.", "هَؤُلَاءِ", "هَذِهِ", "تِلْكَ", "Bunlar değerli misafirler.", "Akıllı çoğul ← هَؤُلَاءِ"]
    ])}
  ]
}
];

// ---------- Oyun verileri ----------
var MV_POOL = [
  ["عَبْدُ الرَّحْمَنِ {مِصْرِيٌّ}.", ["مِصْرِيٌّ", "سُورِيٌّ", "تُرْكِيٌّ"], "metin", "Abdurrahman Mısırlıdır.", "u1"],
  ["يَسْكُنُ مَعَ أُسْرَتِهِ فِي مَدِينَةِ {الإِسْكَنْدَرِيَّةِ}.", ["الإِسْكَنْدَرِيَّةِ", "القَاهِرَةِ", "إِسْطَنْبُولَ"], "metin", "Ailesiyle İskenderiye şehrinde oturuyor.", "u1"],
  ["بَيْتُهُ تَارِيخِيٌّ {قَدِيمٌ}.", ["قَدِيمٌ", "جَدِيدٌ", "صَغِيرٌ"], "metin", "Evi tarihî ve eskidir.", "u1"],
  ["وَهُوَ قَرِيبٌ مِنْ {شَاطِئِ} البَحْرِ.", ["شَاطِئِ", "شَارِعِ", "مَدِينَةِ"], "metin", "Deniz kıyısına yakındır.", "u1"],
  ["أَرْضُهَا مَفْرُوشَةٌ بِ{سَجَّادَةٍ} جَمِيلَةٍ.", ["سَجَّادَةٍ", "سَتَائِرَ", "مِرْآةٍ"], "metin", "Yeri güzel bir halıyla döşeli.", "u1"],
  ["وَعَلَى نَوَافِذِهَا {سَتَائِرُ} جَمِيلَةٌ.", ["سَتَائِرُ", "كَرَاسِيُّ", "أَرَائِكُ"], "metin", "Pencerelerinde güzel perdeler var.", "u1"],
  ["غُرْفَةُ النَّوْمِ فِيهَا سَرِيرٌ وَ{خِزَانَةُ} مَلَابِسَ.", ["خِزَانَةُ", "ثَلَّاجَةُ", "طَابِعَةُ"], "anlama", "Yatak odasında bir yatak ve bir elbise dolabı var.", "u2"],
  ["عَلَى الطَّاوِلَةِ حَاسُوبٌ وَ{طَابِعَةٌ}.", ["طَابِعَةٌ", "غَسَّالَةٌ", "مِدْفَأَةٌ"], "anlama", "Masada bilgisayar ve yazıcı var.", "u2"],
  ["المَطْبَخُ فِيهِ {ثَلَّاجَةٌ} وَفُرْنٌ.", ["ثَلَّاجَةٌ", "أَرِيكَةٌ", "مَكْتَبَةٌ"], "anlama", "Mutfakta buzdolabı ve fırın var.", "u2"],
  ["{خَلْفَ} البَيْتِ حَدِيقَةٌ صَغِيرَةٌ.", ["خَلْفَ", "أَمَامَ", "فَوْقَ"], "anlama", "Evin arkasında küçük bir bahçe var.", "u2"],
  ["مَنْظَرُ البَحْرِ مِنْ غُرْفَتِهِ {رَائِعٌ} جِدًّا.", ["رَائِعٌ", "ضَيِّقٌ", "قَدِيمٌ"], "kelime", "Odasından deniz manzarası çok güzel.", "u3"],
  ["عَلَى رُفُوفِ المَكْتَبَةِ كُتُبٌ وَ{مَجَلَّاتٌ}.", ["مَجَلَّاتٌ", "صُحُونٌ", "مَلَابِسُ"], "kelime", "Kitaplığın raflarında kitaplar ve dergiler var.", "u3"],
  ["عَلَى المَائِدَةِ صَحْنٌ وَ{مِلْعَقَةٌ}.", ["مِلْعَقَةٌ", "مِرْآةٌ", "سَرِيرٌ"], "sofra", "Sofrada bir tabak ve bir kaşık var.", "u3"],
  ["حَوْلَ الطَّاوِلَةِ عَشَرَةُ {كَرَاسِيَّ}.", ["كَرَاسِيَّ", "كُرْسِيٍّ", "كُرْسِيًّا"], "çoğul", "Masanın etrafında on sandalye var.", "u3"],
  ["غُرْفَةُ الجُلُوسِ مَفْرُوشَةٌ {بِـ}سَجَّادَةٍ.", ["بِـ", "مِنْ", "إِلَى"], "harf-i cer", "Oturma odası halıyla döşeli.", "u4"],
  ["شُرْفَةٌ مُطِلَّةٌ {عَلَى} البَحْرِ.", ["عَلَى", "عَنْ", "مِنْ"], "harf-i cer", "Denize bakan bir balkon.", "u4"],
  ["صَدِيقِي أَحْمَدُ {مِنْ} مَدِينَةِ إِزْمِيرَ.", ["مِنْ", "عَلَى", "بِـ"], "harf-i cer", "Arkadaşım Ahmed İzmir şehrinden.", "u4"],
  ["{فَوْقَ} الطَّاوِلَةِ مَزْهَرِيَّةٌ.", ["فَوْقَ", "صَبَاحًا", "إِلَى"], "zarf", "Masanın üstünde bir vazo var.", "u4"],
  ["{أَيْنَ} تَسْكُنُ؟ أَسْكُنُ فِي الإِسْكَنْدَرِيَّةِ.", ["أَيْنَ", "كَمْ", "مَنْ"], "soru", "Nerede oturuyorsun? İskenderiye’de.", "u4"],
  ["{هَذَا} صَفٌّ وَاسِعٌ.", ["هَذَا", "هَذِهِ", "هَاتَانِ"], "işaret", "Bu geniş bir sınıf.", "u5"],
  ["{هَاتَانِ} مُعَلِّمَتَانِ جَيِّدَتَانِ.", ["هَاتَانِ", "هَذَانِ", "هَؤُلَاءِ"], "işaret", "Bunlar iki iyi öğretmen.", "u5"],
  ["{هَذِهِ} حَقَائِبُ جَمِيلَةٌ.", ["هَذِهِ", "هَؤُلَاءِ", "هَذَا"], "işaret", "Bunlar güzel çantalar.", "u5"],
  ["{أُولَئِكَ} طُلَّابٌ مُجْتَهِدُونَ.", ["أُولَئِكَ", "تِلْكَ", "ذَلِكَ"], "işaret", "Şunlar çalışkan öğrenciler.", "u5"],
  ["{تِلْكَ} سَيَّارَةٌ جَمِيلَةٌ.", ["تِلْكَ", "ذَلِكَ", "أُولَئِكَ"], "işaret", "Şu güzel bir araba.", "u5"]
];
// Dönüştür: [verilen ← işlem, doğru, y1, y2, açıklama, konu]
var DON = [
  ["أَمَامَ البَيْتِ حَدِيقَةٌ ← metne göre düzelt", "خَلْفَ البَيْتِ حَدِيقَةٌ", "فَوْقَ البَيْتِ حَدِيقَةٌ", "تَحْتَ البَيْتِ حَدِيقَةٌ", "Bahçe evin arkasında.", "u2"],
  ["التِّلْفَازُ فِي المَطْبَخِ ← metne göre düzelt", "التِّلْفَازُ فِي غُرْفَةِ الضُّيُوفِ", "التِّلْفَازُ فِي الحَمَّامِ", "التِّلْفَازُ فِي الحَدِيقَةِ", "Misafir odasında, duvarda asılı.", "u2"],
  ["المَطْبَخُ ضَيِّقٌ ← metne göre düzelt", "المَطْبَخُ وَاسِعٌ", "المَطْبَخُ قَدِيمٌ", "المَطْبَخُ صَغِيرٌ", "مَطْبَخٌ وَاسِعٌ.", "u1"],
  ["غُرْفَةٌ ← çoğul", "غُرَفٌ", "غُرُوفٌ", "أَغْرَافٌ", "فُعَلٌ kalıbı.", "u3"],
  ["نَافِذَةٌ ← çoğul", "نَوَافِذُ", "نَافِذَاتٌ", "نُفُوذٌ", "فَوَاعِلُ kalıbı.", "u3"],
  ["وَاسِعَةٌ ← zıt anlam", "ضَيِّقَةٌ", "جَمِيلَةٌ", "كَبِيرَةٌ", "geniş ≠ dar", "u3"],
  ["أَمَامَ ← zıt anlam", "خَلْفَ", "فَوْقَ", "بَيْنَ", "önünde ≠ arkasında", "u4"],
  ["فَوْقَ ← zıt anlam", "تَحْتَ", "حَوْلَ", "يَمِينَ", "üstünde ≠ altında", "u4"],
  ["حَدِيقَةٌ، فِي، البَيْتِ، جَمِيلَةٌ ← sırala", "فِي البَيْتِ حَدِيقَةٌ جَمِيلَةٌ", "حَدِيقَةٌ البَيْتِ فِي جَمِيلَةٌ", "جَمِيلَةٌ فِي حَدِيقَةٌ البَيْتِ", "Kitaptaki 5. etkinlik.", "u4"],
  ["نَحْنُ نَقْرَأُ فِي المَكْتَبَةِ ← أَيْنَ ile sor", "أَيْنَ تَقْرَؤُونَ؟", "أَيْنَ نَقْرَأُ؟", "أَيْنَ يَقْرَأُ؟", "Size soruluyor: تَقْرَؤُونَ.", "u4"],
  ["هَذَا ← dişil", "هَذِهِ", "هَاتَانِ", "تِلْكَ", "هَذَا ← هَذِهِ", "u5"],
  ["هَذَانِ ← dişil", "هَاتَانِ", "هَذِهِ", "هَؤُلَاءِ", "İkil dişil.", "u5"],
  ["هَذَا ← uzak", "ذَلِكَ", "تِلْكَ", "هَؤُلَاءِ", "Tekil eril uzak.", "u5"],
  ["الدَّفْتَرُ ← lâmın türü", "شَمْسِيَّةٌ", "قَمَرِيَّةٌ", "لَا لَامَ فِيهِ", "د şemsî harf: ed-defter.", "u5"]
];
// Hangi odada? hız oyunu
var NOUN_LIST = UNITS[2].ex[2].items.map(function (it) { return [it.s, it.a, it.why]; });
var SP_M = ODA;
// Doğru mu yanlış mı hız oyunu
var MM_OPTS = TF;
var MM_LIST = UNITS[0].ex[0].cls.items.map(function (it) { return [it.s, it.a, it.why]; });
var HAFIZA = {
  zd: { name: "Kelime ↔ zıt anlamı", pairs: [["وَاسِعَةٌ", "ضَيِّقَةٌ"], ["قَدِيمٌ", "جَدِيدٌ"], ["قَرِيبٌ", "بَعِيدٌ"], ["صَغِيرَةٌ", "كَبِيرَةٌ"], ["أَمَامَ", "خَلْفَ"], ["فَوْقَ", "تَحْتَ"], ["يَمِينَ", "يَسَارَ"], ["صَبَاحًا", "مَسَاءً"]] },
  co: { name: "Tekil ↔ çoğul", pairs: [["غُرْفَةٌ", "غُرَفٌ"], ["كُرْسِيٌّ", "كَرَاسِيُّ"], ["أَرِيكَةٌ", "أَرَائِكُ"], ["نَافِذَةٌ", "نَوَافِذُ"], ["سِتَارَةٌ", "سَتَائِرُ"], ["شَجَرَةٌ", "أَشْجَارٌ"], ["رَفٌّ", "رُفُوفٌ"], ["ضَيْفٌ", "ضُيُوفٌ"]] },
  is: { name: "İşaret: yakın ↔ uzak", pairs: [["هَذَا", "ذَلِكَ"], ["هَذِهِ", "تِلْكَ"], ["هَؤُلَاءِ", "أُولَئِكَ"], ["هُنَا", "هُنَاكَ"], ["قَرِيبٌ", "بَعِيدٌ"], ["هَذَانِ (eril)", "هَاتَانِ (dişil)"]] }
};
var KARTLAR = [
  ["Abdurrahman kimdir, nerede oturur?", "عَبْدُ الرَّحْمَنِ مِصْرِيٌّ، يَسْكُنُ فِي الإِسْكَنْدَرِيَّةِ · Evi tarihî, eski ve denize yakın."],
  ["Ev neden oluşur?", "أَرْبَعُ غُرَفٍ (الجُلُوسُ، الضُّيُوفُ، النَّوْمُ، غُرْفَةُ عَبْدِ الرَّحْمَنِ) + مَطْبَخٌ وَاسِعٌ + حَمَّامٌ"],
  ["Oturma odasında ne var?", "سَجَّادَةٌ، طَاوِلَةٌ، مَزْهَرِيَّةٌ، أَرِيكَةٌ، مَكْتَبَةٌ، مِدْفَأَةٌ، شُرْفَةٌ، سَتَائِرُ"],
  ["Misafir odasında ne var?", "ثَلَاثُ أَرَائِكَ، تِلْفَازٌ كَبِيرٌ، طَاوِلَةٌ كَبِيرَةٌ، عَشَرَةُ كَرَاسِيَّ"],
  ["Yatak odası ve Abdurrahman’ın odası?", "سَرِيرٌ، خِزَانَةُ مَلَابِسَ، مِرْآةٌ صَغِيرَةٌ · مَقْعَدٌ، طَاوِلَةٌ، حَاسُوبٌ، طَابِعَةٌ"],
  ["Mutfak ve bahçe?", "ثَلَّاجَةٌ، فُرْنٌ، غَسَّالَةٌ، رُفُوفٌ · خَلْفَ البَيْتِ حَدِيقَةٌ فِيهَا أَشْجَارٌ وَأَزْهَارٌ"],
  ["Sofra gereçleri?", "صَحْنٌ، مِلْعَقَةٌ، شَوْكَةٌ، سِكِّينٌ، كُوبٌ، فِنْجَانٌ، مِنْدِيلٌ، مِمْلَحَةٌ"],
  ["Mekân zarfları?", "أَمَامَ، خَلْفَ، تَحْتَ، فَوْقَ، بَيْنَ، حَوْلَ، يَمِينَ، يَسَارَ"],
  ["Zaman zarfları?", "صَبَاحًا، مَسَاءً، صَيْفًا، شِتَاءً، ظُهْرًا، عَصْرًا، عِشَاءً، لَيْلًا"],
  ["Harf-i cerler?", "مِنْ، إِلَى، عَنْ، فِي، عَلَى، بِـ، لِـ"],
  ["Kamerî ve şemsî lâm?", "القَلَمُ (lâm okunur) · الدَّفْتَرُ (lâm okunmaz, د şeddeli)"],
  ["İşaret isimleri?", "هَذَا / ذَلِكَ · هَذِهِ / تِلْكَ · هَذَانِ · هَاتَانِ · هَؤُلَاءِ / أُولَئِكَ · akılsız çoğul: هَذِهِ / تِلْكَ"]
];

// ---------- Kelime hazinesi modülü ----------
var KH_KEY = "kiraat03";
function KW(w, t, tr, c, k, e, z, s, sw, st) { return { w: w, t: t, tr: tr, c: c, k: k, e: e, z: z, s: s, sw: sw, st: st }; }
var KH_KELIMELER = [
  KW("بَيْتٌ", "i", "ev", "بُيُوتٌ", "fuul", "مَنْزِلٌ", "", "بَيْتُهُ تَارِيخِيٌّ قَدِيمٌ.", "بَيْتُهُ", "Evi tarihî ve eskidir."),
  KW("غُرْفَةٌ", "i", "oda", "غُرَفٌ", "fual_f", "", "", "البَيْتُ يَتَكَوَّنُ مِنْ أَرْبَعِ غُرَفٍ.", "غُرَفٍ", "Ev dört odadan oluşur."),
  KW("مَطْبَخٌ", "i", "mutfak", "مَطَابِخُ", "mefail", "", "", "وَمِنْ مَطْبَخٍ وَاسِعٍ وَحَمَّامٍ.", "مَطْبَخٍ", "Ve geniş bir mutfak ile banyodan."),
  KW("حَمَّامٌ", "i", "banyo", "حَمَّامَاتٌ", "at", "", "", "وَمِنْ مَطْبَخٍ وَاسِعٍ وَحَمَّامٍ.", "وَحَمَّامٍ", "Ve geniş bir mutfak ile banyodan."),
  KW("ضَيْفٌ", "i", "misafir", "ضُيُوفٌ", "fuul", "", "", "وَغُرْفَةٍ لِلضُّيُوفِ.", "لِلضُّيُوفِ", "Ve misafirler için bir oda."),
  KW("سَجَّادَةٌ", "i", "halı", "سَجَاجِيدُ", "fealil", "", "", "وَأَرْضُهَا مَفْرُوشَةٌ بِسَجَّادَةٍ جَمِيلَةٍ.", "بِسَجَّادَةٍ", "Yeri güzel bir halıyla döşeli."),
  KW("طَاوِلَةٌ", "i", "masa", "طَاوِلَاتٌ", "at", "", "", "فِي وَسَطِهَا طَاوِلَةٌ.", "طَاوِلَةٌ", "Ortasında bir masa var."),
  KW("مَزْهَرِيَّةٌ", "i", "vazo", "مَزْهَرِيَّاتٌ", "at", "", "", "فَوْقَ الطَّاوِلَةِ مَزْهَرِيَّةٌ جَمِيلَةٌ.", "مَزْهَرِيَّةٌ", "Masanın üstünde güzel bir vazo var."),
  KW("أَرِيكَةٌ", "i", "kanepe", "أَرَائِكُ", "feail", "", "", "فِيهَا ثَلَاثُ أَرَائِكَ.", "أَرَائِكَ", "İçinde üç kanepe var."),
  KW("مَكْتَبَةٌ", "i", "kitaplık; kütüphane", "مَكْتَبَاتٌ", "at", "", "", "عَلَى رُفُوفِ المَكْتَبَةِ كُتُبٌ.", "المَكْتَبَةِ", "Kitaplığın raflarında kitaplar var."),
  KW("رَفٌّ", "i", "raf", "رُفُوفٌ", "fuul", "", "", "عَلَى رُفُوفِ المَكْتَبَةِ كُتُبٌ وَمَجَلَّاتٌ.", "رُفُوفِ", "Kitaplığın raflarında kitaplar ve dergiler var."),
  KW("جَرِيدَةٌ", "i", "gazete", "جَرَائِدُ", "feail", "صَحِيفَةٌ", "", "كُتُبٌ وَمَجَلَّاتٌ وَجَرَائِدُ.", "وَجَرَائِدُ", "Kitaplar, dergiler ve gazeteler."),
  KW("شُرْفَةٌ", "i", "balkon", "شُرُفَاتٌ", "at", "", "", "وَلِلْغُرْفَةِ شُرْفَةٌ كَبِيرَةٌ مُطِلَّةٌ عَلَى البَحْرِ.", "شُرْفَةٌ", "Odanın denize bakan büyük bir balkonu var."),
  KW("نَافِذَةٌ", "i", "pencere", "نَوَافِذُ", "fevail", "شُبَّاكٌ", "", "وَعَلَى نَوَافِذِهَا سَتَائِرُ جَمِيلَةٌ.", "نَوَافِذِهَا", "Pencerelerinde güzel perdeler var."),
  KW("سِتَارَةٌ", "i", "perde", "سَتَائِرُ", "feail", "", "", "وَعَلَى نَوَافِذِهَا سَتَائِرُ جَمِيلَةٌ.", "سَتَائِرُ", "Pencerelerinde güzel perdeler var."),
  KW("جِدَارٌ", "i", "duvar", "جُدْرَانٌ", "diger", "حَائِطٌ", "", "وَمُعَلَّقٌ عَلَى جِدَارِهَا تِلْفَازٌ كَبِيرٌ.", "جِدَارِهَا", "Duvarında büyük bir televizyon asılı."),
  KW("كُرْسِيٌّ", "i", "sandalye", "كَرَاسِيُّ", "diger", "مَقْعَدٌ", "", "حَوْلَ الطَّاوِلَةِ عَشَرَةُ كَرَاسِيَّ.", "كَرَاسِيَّ", "Masanın etrafında on sandalye var."),
  KW("سَرِيرٌ", "i", "yatak", "أَسِرَّةٌ", "efile", "", "", "وَغُرْفَةُ النَّوْمِ فِيهَا سَرِيرٌ.", "سَرِيرٌ", "Yatak odasında bir yatak var."),
  KW("خِزَانَةٌ", "i", "dolap", "خَزَائِنُ", "feail", "", "", "وَخِزَانَةُ مَلَابِسَ وَمِرْآةٌ صَغِيرَةٌ.", "وَخِزَانَةُ", "Bir elbise dolabı ve küçük bir ayna."),
  KW("مِرْآةٌ", "i", "ayna", "مَرَايَا", "diger", "", "", "وَخِزَانَةُ مَلَابِسَ وَمِرْآةٌ صَغِيرَةٌ.", "وَمِرْآةٌ", "Bir elbise dolabı ve küçük bir ayna."),
  KW("حَاسُوبٌ", "i", "bilgisayar", "حَوَاسِيبُ", "diger", "", "", "عَلَى الطَّاوِلَةِ حَاسُوبٌ وَطَابِعَةٌ.", "حَاسُوبٌ", "Masada bir bilgisayar ve bir yazıcı var."),
  KW("ثَلَّاجَةٌ", "i", "buzdolabı", "ثَلَّاجَاتٌ", "at", "", "", "وَالمَطْبَخُ فِيهِ ثَلَّاجَةٌ وَفُرْنٌ.", "ثَلَّاجَةٌ", "Mutfakta buzdolabı ve fırın var."),
  KW("فُرْنٌ", "i", "fırın", "أَفْرَانٌ", "efal", "", "", "وَالمَطْبَخُ فِيهِ ثَلَّاجَةٌ وَفُرْنٌ.", "وَفُرْنٌ", "Mutfakta buzdolabı ve fırın var."),
  KW("حَدِيقَةٌ", "i", "bahçe", "حَدَائِقُ", "feail", "بُسْتَانٌ", "", "خَلْفَ البَيْتِ حَدِيقَةٌ صَغِيرَةٌ وَجَمِيلَةٌ.", "حَدِيقَةٌ", "Evin arkasında küçük ve güzel bir bahçe var."),
  KW("شَجَرَةٌ", "i", "ağaç", "أَشْجَارٌ", "efal", "", "", "فِيهَا أَشْجَارٌ وَأَزْهَارٌ مُخْتَلِفَةٌ.", "أَشْجَارٌ", "İçinde çeşitli ağaçlar ve çiçekler var."),
  KW("زَهْرَةٌ", "i", "çiçek", "أَزْهَارٌ / زُهُورٌ", "efal", "وَرْدَةٌ", "", "فِيهَا أَشْجَارٌ وَأَزْهَارٌ مُخْتَلِفَةٌ.", "وَأَزْهَارٌ", "İçinde çeşitli ağaçlar ve çiçekler var."),
  KW("بَحْرٌ", "i", "deniz", "بِحَارٌ", "fial", "", "", "مَنْظَرُ البَحْرِ مِنْ غُرْفَتِهِ رَائِعٌ جِدًّا.", "البَحْرِ", "Odasından deniz manzarası çok güzel."),
  KW("شَاطِئٌ", "i", "kıyı, sahil", "شَوَاطِئُ", "fevail", "سَاحِلٌ", "", "وَهُوَ قَرِيبٌ مِنْ شَاطِئِ البَحْرِ.", "شَاطِئِ", "Deniz kıyısına yakındır."),
  KW("صَحْنٌ", "i", "tabak", "صُحُونٌ", "fuul", "", "", "عَلَى المَائِدَةِ صَحْنٌ وَمِلْعَقَةٌ.", "صَحْنٌ", "Sofrada bir tabak ve bir kaşık var."),
  KW("وَاسِعٌ", "s", "geniş", "", "", "", "ضَيِّقٌ", "غُرْفَةُ الجُلُوسِ وَاسِعَةٌ.", "وَاسِعَةٌ", "Oturma odası geniştir."),
  KW("قَدِيمٌ", "s", "eski", "قُدَمَاءُ", "fuala", "عَتِيقٌ", "جَدِيدٌ", "بَيْتُهُ تَارِيخِيٌّ قَدِيمٌ.", "قَدِيمٌ", "Evi tarihî ve eskidir."),
  KW("قَرِيبٌ", "s", "yakın", "", "", "", "بَعِيدٌ", "وَهُوَ قَرِيبٌ مِنْ شَاطِئِ البَحْرِ.", "قَرِيبٌ", "Deniz kıyısına yakındır."),
  KW("مُرِيحٌ", "s", "rahat", "", "", "", "مُتْعِبٌ", "وَفِي الغُرْفَةِ أَرِيكَةٌ مُرِيحَةٌ.", "مُرِيحَةٌ", "Odada rahat bir kanepe var."),
  KW("رَائِعٌ", "s", "harika, çok güzel", "", "", "جَمِيلٌ", "", "مَنْظَرُ البَحْرِ مِنْ غُرْفَتِهِ رَائِعٌ جِدًّا.", "رَائِعٌ", "Odasından deniz manzarası harika."),
  KW("قَضَى", "f", "geçirdi (vakit)", "", "", "", "", "يُحِبُّ أَنْ يَقْضِيَ وَقْتَ فَرَاغِهِ فِيهَا.", "يَقْضِيَ", "Boş vaktini orada geçirmeyi sever.")
].map(function (x, i) { x.id = "k" + i; return x; });
var KALIPLAR = {"fuul":["فُعُولٌ","fuûl","قُلُوبٌ، دُرُوسٌ"],"efal":["أَفْعَالٌ","ef’âl","أَقْلَامٌ، أَبْوَابٌ"],"efile":["أَفْعِلَةٌ","ef’ile","أَطْعِمَةٌ، أَدْوِيَةٌ"],"fial":["فِعَالٌ","fiâl","جِبَالٌ، رِجَالٌ"],"fuul_k":["فُعُلٌ","fu’ul","كُتُبٌ، سُفُنٌ"],"fial_f":["فِعَلٌ","fi’al","حِكَمٌ، قِطَعٌ"],"fual_f":["فُعَلٌ","fu’al","غُرَفٌ، صُوَرٌ"],"fuala":["فُعَلَاءُ","fu’alâ","وُزَرَاءُ، فُقَرَاءُ"],"efila":["أَفْعِلَاءُ","ef’ilâ","أَصْدِقَاءُ، أَغْنِيَاءُ"],"fevail":["فَوَاعِلُ","fevâil","شَوَارِعُ، نَوَافِذُ"],"feail":["فَعَائِلُ","feâil","حَدَائِقُ، رَسَائِلُ"],"mefail":["مَفَاعِلُ","mefâil","مَسَاجِدُ، مَكَاتِبُ"],"fealil":["فَعَالِيلُ / فَعَالِلُ","feâlîl · feâlil","عَصَافِيرُ، سَجَاجِيدُ"],"fual":["فُعَّالٌ","fu’’âl","تُجَّارٌ، عُمَّالٌ"],"un":["ـُونَ / ـِينَ","cem-i müzekker sâlim","مُعَلِّمُونَ، مُسَافِرُونَ"],"at":["ـَاتٌ","cem-i müennes sâlim","سَيَّارَاتٌ، لُغَاتٌ"],"diger":["…","başka kalıplar","كَرَاسِيُّ، مَرَايَا"]};
