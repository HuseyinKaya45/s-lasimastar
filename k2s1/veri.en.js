// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ١ (الوَحْدَتانِ ١ - ٢) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "1–2", ar: "اخْتَبِرْ نَفْسَكَ ١", tr: "Test yourself 1 · Units 1 and 2", pfx: "k2s1:", sinavYok: true, sonuc: true,
  giris: "The self-assessment test after Units 1 and 2 of the book: reading, structures and rules, vocabulary, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Three short texts; 15 questions", bloklar: [
 { t: "metin", baslik: "First text", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["ظَلَّ مُحَمَّدٌ يُفَكِّرُ في مُشْكِلَتِهِ، وَوَزْنُهُ الآنَ تِسْعونَ كيلًا، يَجِبُ أَنْ يَكونَ وَزْنُهُ سِتّينَ كيلًا فَقَطْ.", "Muhammad keeps thinking about his problem; his weight is now ninety, whereas it should be only sixty."],
  ["تَرَكَ مُحَمَّدٌ تَناوُلَ السُّكَّرِيّاتِ وَالنَّشَوِيّاتِ، لكِنْ مَعَ الأَسَفِ ظَلَّ وَزْنُهُ تِسْعينَ كيلًا!", "Muhammad gave up sugary and starchy foods; but unfortunately his weight stayed at ninety!"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["مُشْكِلَةُ مُحَمَّدٍ أَنَّهُ …", "سَمينٌ", ["نَحيفٌ", "طَويلٌ"], "Muhammad's problem is that he is … ."],
  ["يُريدُ مُحَمَّدٌ أَنْ … وَزْنُهُ.", "يَنْقُصَ", ["يَزيدَ", "يَكْبُرَ"], "Muhammad wants his weight to … ."],
  ["بَعْدَ أَنْ تَرَكَ مُحَمَّدٌ السُّكَّرِيّاتِ وَالنَّشَوِيّاتِ … تِسْعينَ كيلًا.", "بَقِيَ وَزْنُهُ", ["زادَ وَزْنُهُ", "نَقَصَ وَزْنُهُ"], "After giving up sugary and starchy foods his weight … at ninety."],
  ["«لا تَأْكُلِ الخُبْزَ الأَبْيَضَ، وَتَناوَلِ الدَّواءَ، وَاتَّبِعِ الحِمْيَةَ». المُتَحَدِّثُ …", "طَبيبٌ", ["مُدَرِّسٌ", "مُهَنْدِسٌ"], "“Do not eat white bread, take your medicine, follow the diet.” The speaker is … ."],
  ["مَنْ يَتَناوَلُ الدَّواءَ وَيَتَّبِعُ الحِمْيَةَ؟", "المَريضُ", ["السَّليمُ", "الصَّيْدَلِيُّ"], "Who takes medicine and follows the diet?"]] },
 { t: "metin", baslik: "Second text", ar: "اقْرَأْ", paragraf: [[
  ["كانَ إِبْراهيمُ يَعْمَلُ في مُخْتَبَرِ المَدْرَسَةِ، وَفي السّاعَةِ التّاسِعَةِ وَالنِّصْفِ -قَبْلَ الحِصَّةِ الثّالِثَةِ بِنِصْفِ ساعَةٍ- أُغْمِيَ عَلَيْهِ، وَعِنْدَما أَفاقَ وَجَدَ نَفْسَهُ في غُرْفَةِ الفَحْصِ.", "Ibrāhīm was working in the school laboratory. At half past nine — half an hour before the third lesson — he fainted; when he came to, he found himself in the examination room."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["أَيْنَ إِبْراهيمُ الآنَ؟", "في المُسْتَشْفى", ["في المُخْتَبَرِ", "في المَدْرَسَةِ"], "Where is Ibrāhīm now?", "When he came to, he found himself in the examination room."],
  ["مَتى تَبْدَأُ الحِصَّةُ الثّالِثَةُ؟", "في السّاعَةِ العاشِرَةِ", ["في السّاعَةِ التّاسِعَةِ", "في السّاعَةِ التّاسِعَةِ وَالنِّصْفِ"], "When does the third lesson start?", "Half past nine + half an hour = ten o'clock."],
  ["ما مِهْنَةُ إِبْراهيمَ؟", "عامِلٌ في المُخْتَبَرِ", ["مُمَرِّضٌ في غُرْفَةِ الفَحْصِ", "مُدَرِّسٌ في المَدْرَسَةِ"], "What is Ibrāhīm's profession?", "«كانَ إِبْراهيمُ يَعْمَلُ في مُخْتَبَرِ المَدْرَسَةِ»"]] },
 { t: "metin", baslik: "The third text", ar: "اقْرَأْ", paragraf: [
  [["فاطِمَةُ طالِبَةٌ تَدْرُسُ في الجامِعَةِ، وَتَعْمَلُ في أَحَدِ مَصانِعِ المَلابِسِ. تَذْهَبُ إِلى الكُلِّيَّةِ بِالحافِلَةِ.", "Fāṭima is a student studying at the university; she also works in a clothing factory. She goes to the faculty by bus."],
   ["تَبْدَأُ الدِّراسَةُ في الكُلِّيَّةِ السّاعَةَ الثّامِنَةَ صَباحًا، وَتَنْتَهي السّاعَةَ الثّانِيَةَ بَعْدَ الظُّهْرِ. تَتَناوَلُ فاطِمَةُ الغَداءَ في مَطْعَمِ الكُلِّيَّةِ.", "At the faculty the lessons begin at eight in the morning and end at two in the afternoon. Fāṭima eats lunch in the faculty canteen."],
   ["بَعْدَ الغَداءِ تَذْهَبُ إِلى المَصْنَعِ بِالقِطارِ. يَبْدَأُ العَمَلُ في المَصْنَعِ السّاعَةَ الرّابِعَةَ مَساءً وَيَنْتَهي السّاعَةَ الثّامِنَةَ.", "After the meal she goes to the factory by train. At the factory work begins at four in the afternoon and ends at eight."]],
  [["في الأُسْبوعِ الماضي أُغْمِيَ عَلى فاطِمَةَ في الجامِعَةِ، أَخَذَتْها صَديقاتُها إِلى المُسْتَشْفى، وَحينَما أَفاقَتْ فاطِمَةُ وَجَدَتْ نَفْسَها في غُرْفَةِ الفَحْصِ مَعَ الطَّبيبَةِ.", "Last week Fāṭima fainted at the university; her friends took her to the hospital. When she came to, she found herself in the examination room with the doctor."],
   ["حَضَرَ والِدُ فاطِمَةَ وَوالِدَتُها إِلى المُسْتَشْفى. قابَلَ والِدُها كَبيرَ الأَطِبّاءِ. قَرَأَ كَبيرُ الأَطِبّاءِ التَّقْريرَ الطِّبِّيَّ وَقالَ لِوالِدِها:", "Fāṭima's father and mother came to the hospital. Her father met the chief physician. The chief physician read the medical report and said to her father:"],
   ["فاطِمَةُ بِخَيْرٍ وَالحَمْدُ لِلّهِ، لكِنَّها تَحْتاجُ إِلى الرّاحَةِ؛ هِيَ تَعْمَلُ وَتَدْرُسُ. يَجِبُ أَنْ تَرْتاحَ، وَيَجِبُ أَنْ تَتَناوَلَ طَعامًا جَيِّدًا.", "Fāṭima is well, praise be to God; but she needs rest: she both works and studies. She must rest and eat well."]]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗)", ogeler: [
  ["فاطِمَةُ طالِبَةٌ وَعامِلَةٌ.", true, "", "Fāṭima is both a student and a worker."],
  ["تَبْقى في الكُلِّيَّةِ سِتَّ ساعاتٍ.", true, "", "She stays at the faculty for six hours. (from 8 to 2)"],
  ["تَذْهَبُ إِلى المَصْنَعِ بِالحافِلَةِ وَإِلى الكُلِّيَّةِ بِالقِطارِ.", false, "تَذْهَبُ إِلى الكُلِّيَّةِ بِالحافِلَةِ، وَإِلى المَصْنَعِ بِالقِطارِ.", "She goes to the factory by bus, to the faculty by train."],
  ["تَبْقى في المَصْنَعِ خَمْسَ ساعاتٍ.", false, "تَبْقى في المَصْنَعِ أَرْبَعَ ساعاتٍ (مِنَ الرّابِعَةِ إِلى الثّامِنَةِ).", "She stays at the factory for five hours."],
  ["أُغْمِيَ عَلَيْها، وَوَجَدَتْ نَفْسَها في المُسْتَشْفى.", true, "", "She fainted and found herself in the hospital."],
  ["حَضَرَتْ والِدَةُ فاطِمَةَ إِلى المُسْتَشْفى.", true, "", "Fāṭima's mother came to the hospital."],
  ["قَرَأَتِ الطَّبيبَةُ التَّقْريرَ الطِّبِّيَّ.", false, "قَرَأَ كَبيرُ الأَطِبّاءِ التَّقْريرَ الطِّبِّيَّ.", "The woman doctor read the medical report."]] }
]},
// ---------------- 2. YAPILAR VE KURALLAR ----------------
{ no: 2, etiket: "Structures and rules", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Structures and rules", ozet: "Noun-verb-particle, correct sentence, error correction", bloklar: [
 { t: "siniflandir", ar: "ضَعِ الكَلِماتِ الآتِيَةَ في مَكانِها المُناسِبِ في الجَدْوَلِ", soru: "Noun, verb or particle?", gruplar: ["اسْمٌ", "فِعْلٌ", "حَرْفٌ"], ogeler: [
  ["التَّمْرُ", 0], ["النّاسُ", 0], ["إِلى", 2], ["يُفَضِّلُ", 1], ["الماءُ", 0], ["في", 2], ["مِنْ", 2], ["سافَرَ", 1], ["اليَوْمُ", 0], ["ذَهَبَ", 1],
  ["جَدٌّ", 0], ["يَنامُ", 1], ["أَحْمَدُ", 0], ["لَمْ", 2], ["مُوَظَّفٌ", 0], ["قَضى", 1], ["أَوْ", 2], ["أَحَبَّ", 1], ["عَلى", 2]] },
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(٢٢) أَيُّهُما صَحيحَةٌ؟", "زَيْنَبُ تُحِبُّ الأَكْلَ.", ["زَيْنَبُ لا يُحِبُّ الأَكْلَ."], "Which is correct?", "Zaynab is feminine: تُحِبُّ (لا تُحِبُّ)."],
  ["(٢٣) أَيُّهُما صَحيحَةٌ؟", "مُحَمَّدٌ سَيُسافِرُ غَدًا، إِنْ شاءَ اللهُ.", ["مُحَمَّدٌ سافَرَ غَدًا، إِنْ شاءَ اللهُ."], "Which is correct?", "غَدًا (tomorrow) requires the future tense: سَيُسافِرُ."],
  ["(٢٤) أَيُّهُما صَحيحَةٌ؟", "مَتى جاءَ هارونُ؟", ["ماذا جاءَ هارونُ؟"], "Which is correct?", "The time of coming is asked with: مَتى."]] },
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Choose the correct form of the underlined word.", ogeler: [
  ["(٢٥) يَقْرَأُ [[المُدَرِّسَ]] الصَّحيفَةَ.", "المُدَرِّسُ", ["المُدَرِّسِ", "المُدَرِّسَ"], "The teacher is reading the newspaper.", "The subject is nominative: المُدَرِّسُ."],
  ["(٢٦) أَدْرُسُ [[مِنَ]] اليَوْمِ سِتَّ حِصَصٍ.", "في", ["إِلى", "عَنِ"], "I study six lessons a day.", "أَدْرُسُ سِتَّ حِصَصٍ في اليَوْمِ."],
  ["(٢٧) سارَةُ [[سَتَقْرَأُ]] الكِتابَ قَبْلَ يَوْمَيْنِ.", "قَرَأَتْ", ["تَقْرَأُ", "سَتَقْرَأُ"], "Sāra read the book two days ago.", "قَبْلَ يَوْمَيْنِ (two days ago) requires the past tense."]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Singular-plural and grouping by topic", bloklar: [
 { t: "esle", ar: "صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", ciftler: [
  ["شَيْءٌ", "أَشْياءُ", "thing"], ["طَبيبٌ", "أَطِبّاءُ", "doctor"], ["أَلَمٌ", "آلامٌ", "pain"], ["بَيْتٌ", "بُيوتٌ", "house"], ["خَيْمَةٌ", "خِيامٌ", "tent"], ["مَرَضٌ", "أَمْراضٌ", "illness"], ["دَواءٌ", "أَدْوِيَةٌ", "medicine"], ["سوقٌ", "أَسْواقٌ", "market"]] },
 { t: "siniflandir", ar: "ضَعِ الكَلِماتِ الآتِيَةَ تَحْتَ العُنْوانِ المُناسِبِ", soru: "Which title?", gruplar: ["العِنايَةُ بِالصِّحَّةِ", "التَّرْويحُ عَنِ النَّفْسِ"], ogeler: [
  ["أَطِبّاءُ", 0], ["أَلْعابٌ", 1], ["أَسْنانٌ", 0], ["حِمْيَةٌ", 0], ["الدَّسَمُ", 0], ["جَوّالَةٌ", 1], ["عُطْلَةٌ", 1], ["الأَمْراضُ", 0], ["خِيامٌ", 1], ["سَفَرٌ", 1], ["أَدْوِيَةٌ", 0], ["طَبيبٌ", 0], ["لَعِبٌ", 1], ["هِوايَةٌ", 1]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Arrange the words, make a sentence", bloklar: [
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ لِتُصْبِحَ جُمَلًا", aciklama: "(٤٢) عَلى - العُطْلَةُ - الأَبْوابِ", ogeler: ["العُطْلَةُ", "عَلى", "الأَبْوابِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤٣) كُلُّها - هَلْ - حَياتُكَ - عَمَلٌ؟", ogeler: ["هَلْ", "حَياتُكَ", "كُلُّها", "عَمَلٌ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤٤) كَثيرًا - الطِّبُّ - تَقَدَّمَ - هَلْ؟", ogeler: ["هَلْ", "تَقَدَّمَ", "الطِّبُّ", "كَثيرًا؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤٥) جِدًّا - مَرْيَمُ - سَمينَةٌ", ogeler: ["مَرْيَمُ", "سَمينَةٌ", "جِدًّا"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤٦) شَديدَةٍ - بِآلامٍ - أَشْعُرُ", ogeler: ["أَشْعُرُ", "بِآلامٍ", "شَديدَةٍ"] }
]}
];
var KELIME = [];
