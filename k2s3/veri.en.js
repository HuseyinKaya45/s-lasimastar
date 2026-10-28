// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ٣ (الوَحْدَتانِ ٥ - ٦) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "5–6", ar: "اخْتَبِرْ نَفْسَكَ ٣", tr: "Test yourself 3 · Units 5 and 6", pfx: "k2s3:", sinavYok: true, sonuc: true,
  giris: "The self-assessment test after Units 5 and 6 of the book: reading, structures and rules, vocabulary, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Four short texts; 15 questions", bloklar: [
 { t: "metin", baslik: "First text", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["«كُنّا في الماضي لا نَطْلُبُ أَجْرًا عَلى عَمَلِنا، أَمَّا اليَوْمَ، فَإِنَّ بَعْضَ التَّلاميذِ يَأْخُذونَ بَعْضَ المالِ وَهُمْ يَتَعَلَّمونَ».", "“In the past we did not ask for pay for our work; today, however, some students receive a little money while studying.”"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["المُتَحَدِّثُ …", "مُعَلِّمٌ", ["مُهَنْدِسٌ", "طَبيبٌ"], "The speaker …"],
  ["هذا الشَّخْصُ الآنَ …", "يَأْخُذُ راتِبًا", ["لا يَأْخُذُ راتِبًا", "لا يَطْلُبُ أَجْرًا"], "This person now … .", "«كُنّا في الماضي لا نَطْلُبُ أَجْرًا»: not asking for pay belongs to the past."],
  ["مَنْ يَأْخُذُ بَعْضَ المالِ الآنَ؟", "قَليلٌ مِنَ الطُّلّابِ", ["كُلُّ الطُّلّابِ", "كَثيرٌ مِنَ الطُّلّابِ"], "Who receives a little money now?", "«بَعْضُ التَّلاميذِ»"]] },
 { t: "metin", baslik: "Second text", ar: "اقْرَأْ", paragraf: [[
  ["لَيْسَتْ هُناكَ مُشْكِلَةٌ في الدِّراسَةِ الجامِعِيَّةِ مِثْلَ الماضي؛ فَالجامِعاتُ كَثيرَةٌ، وَهِيَ في كُلِّ مَكانٍ، وَلكِنَّ المُشْكِلَةَ هِيَ: ماذا يَعْمَلُ الشّابُّ بَعْدَ التَّخَرُّجِ؟", "In university study there is no problem as there used to be; universities are many and everywhere. But the problem is this: What work will the young person do after graduating?"],
  ["كانَ الشّابُّ في الماضي يَتَخَرَّجُ؛ فَيَجِدُ العَمَلَ، أَمَّا الآنَ فَلَيْسَ هُناكَ فُرَصٌ كَثيرَةٌ لِلْعَمَلِ.", "In the past a young person would graduate and find work at once; now, however, there are not many job opportunities."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["مَوْضوعُ هذِهِ الفِقْرَةِ هُوَ …", "مُشْكِلَةُ البَطالَةِ", ["مُشْكِلَةُ الدِّراسَةِ", "مُشْكِلَةُ التَّخَرُّجِ"], "The subject of this paragraph is … ."],
  ["في الماضي …", "الجامِعاتُ قَليلَةٌ وَالعَمَلُ كَثيرٌ", ["العَمَلُ كَثيرٌ وَالجامِعاتُ كَثيرَةٌ", "الجامِعاتُ قَليلَةٌ وَالعَمَلُ قَليلٌ"], "In the past … ."],
  ["مَنْ يَجِدُ عَمَلًا سَريعًا؟", "شَبابُ الماضي", ["شَبابُ اليَوْمِ", "لا أَحَدَ"], "Who finds work quickly (used to)?"],
  ["شَبابُ الماضي كانَتْ لَدَيْهِمْ مُشْكِلَةٌ …", "في الدِّراسَةِ الجامِعِيَّةِ", ["بَعْدَ التَّخَرُّجِ", "في العَمَلِ"], "The young people of the past had a problem of … ."]] },
 { t: "metin", baslik: "The third text", ar: "اقْرَأْ", paragraf: [[
  ["لَدَيَّ مُشْكِلَةٌ؛ أُريدُ أَنْ أَخْتارَ مِهْنَتي وَحْدي. أَبي يُحِبُّ أَنْ أَكونَ طَبيبًا مِثْلَهُ، أَوْ طَيّارًا مِثْلَ أَخي عَبْدِ اللهِ، لكِنَّ أُمّي تُريدُ أَنْ أَكونَ مُهَنْدِسًا مِثْلَ خالي.", "I have a problem: I want to choose my profession myself. My father wants me to be a doctor like himself or a pilot like my elder brother ʿAbdullāh; my mother, however, wants me to be an engineer like my maternal uncle."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["المُتَحَدِّثُ …", "لا يَعْمَلُ", ["يَعْمَلُ الآنَ طَبيبًا", "يَعْمَلُ مُهَنْدِسًا"], "The speaker …", "He has not yet chosen his profession."],
  ["والِدُ المُتَحَدِّثِ …", "طَبيبٌ", ["طَيّارٌ", "مُهَنْدِسٌ"], "The speaker's father … ."],
  ["الجَدُّ يَعْمَلُ …", "مُهَنْدِسًا", ["مُدَرِّسًا", "طَبيبًا"], "The grandfather works as … .", "The grandfather does not occur in the text; the one who is an engineer is the speaker's maternal uncle (خالي). The question in the book most probably should be «الخالُ»."],
  ["يُريدُ المُتَحَدِّثُ أَنْ يَكونَ …", "مُدَرِّسًا", ["مُهَنْدِسًا", "طَيّارًا"], "The speaker wants to be … .", "It is not stated explicitly in the text; his mother wants engineering, his father wants piloting, while he wants to choose his profession himself. The remaining option is “teacher”."],
  ["عَبْدُ اللهِ يَعْمَلُ في مَجالِ …", "الطَّيَرانِ", ["الطِّبِّ", "التَّعْليمِ"], "ʿAbdullāh works in the field of … ."]] },
 { t: "metin", baslik: "The fourth text", ar: "اقْرَأْ", paragraf: [[
  ["يَسْكُنُ كَثيرٌ مِنْ طُلّابِ كُلِّيَّةِ الطِّبِّ خارِجَ الجامِعَةِ، وَبَعْضُ الطُّلّابِ مِنْ كُلِّيَّةِ الصَّيْدَلَةِ يَسْكُنونَ قَريبًا مِنْهُمْ.", "Most of the students of the faculty of medicine live outside the university; some students of the faculty of pharmacy also live near them."],
  ["وَلكِنَّ الجَميعَ يَحْضُرونَ إِلى الجامِعَةِ بِحافِلَةٍ واحِدَةٍ السّاعَةَ السّابِعَةَ وَالنِّصْفَ؛ قَبْلَ الدِّراسَةِ بِنِصْفِ ساعَةٍ.", "But they all come to the university at half past seven by a single bus; half an hour before the lessons."],
  ["طُلّابُ كُلِّيَّةِ الهَنْدَسَةِ الَّذينَ يَسْكُنونَ في بُيوتِ الجامِعَةِ، يَأْتونَ إِلى الدِّراسَةِ مُتَأَخِّرينَ دائِمًا.", "The students of the faculty of engineering, who live in the university dormitories, always come late to the lesson."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["يَسْكُنُ … طُلّابِ الطِّبِّ خارِجَ الجامِعَةِ.", "مُعْظَمُ", ["كُلُّ", "بَعْضُ"], "The medical students … live outside the university.", "«كَثيرٌ مِنْ طُلّابِ كُلِّيَّةِ الطِّبِّ»"],
  ["تَبْدَأُ الدِّراسَةُ في كُلِّيَّةِ الطِّبِّ وَكُلِّيَّةِ الصَّيْدَلَةِ السّاعَةَ …", "الثّامِنَةَ", ["السّابِعَةَ وَالنِّصْفَ", "الثّامِنَةَ وَالنِّصْفَ"], "In the faculties of medicine and pharmacy the lessons begin at … o'clock.", "Half past seven + half an hour = eight."],
  ["مَنْ يَأْتي بَعْدَ بِدايَةِ الدِّراسَةِ؟", "طُلّابُ كُلِّيَّةِ الهَنْدَسَةِ", ["طُلّابُ كُلِّيَّةِ الصَّيْدَلَةِ", "طُلّابُ كُلِّيَّةِ الطِّبِّ"], "Who comes after the lessons have started?"]] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Structures and rules", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Structures and rules", ozet: "Correct sentence, error correction, singular-dual-plural", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الخَطَإِ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "لَمْ يَنْقُصْ وَزْنُهُ.", ["لَمْ يَنْقُصُ وَزْنُهُ."], "Which is correct?", "لَمْ jussives the imperfect: sukūn."],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "أُريدُ كِتابَ القِراءَةِ.", ["أُريدُ الكِتابَ القِراءَةِ."], "Which is correct?", "The muḍāf does not take ال."],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "المُهَنْدِسانِ حَضَرا.", ["المُهَنْدِسانِ حَضَروا."], "Which is correct?", "The dual alif for the dual: حَضَرا."]] },
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Choose the correct form of the underlined word.", ogeler: [
  ["(٤) يا مُحَمَّدُ، لا [[تُسافِرُ]] اليَوْمَ.", "تُسافِرْ", ["تُسافِرَ", "سافَرَ"], "Muhammad, do not travel today.", "The prohibitive لا jussives."],
  ["(٥) انْظُرْ [[هذا]] سَيّارَةٌ.", "هذِهِ", ["هذانِ", "هؤُلاءِ"], "Look, this is a car.", "سَيّارَةٌ is feminine."],
  ["(٦) [[لَمْ]] جاءَ الطَّبيبُ.", "ما", ["لَنْ", "لا"], "The doctor did not come.", "The past verb is negated with ما: ما جاءَ (or لَمْ يَجِئْ)."]] },
 { t: "siniflandir", ar: "ضَعْ كُلَّ كَلِمَةٍ في مَكانِها المُناسِبِ في الجَدْوَلِ", soru: "Singular, dual or plural?", gruplar: ["مُفْرَدٌ", "مُثَنًّى", "جَمْعٌ"], ogeler: [
  ["بَلَدٌ", 0], ["الشَّهاداتُ", 2], ["يَوْمانِ", 1], ["المَدْرَسَةُ", 0], ["حُكوماتٌ", 2], ["المُسْلِمُ", 0], ["خِبْراتٌ", 2], ["جامِعاتٌ", 2],
  ["القَلَمانِ", 1], ["كُلِّيَّةٌ", 0], ["المُساعَداتُ", 2], ["جامِعَتانِ", 1], ["مُشْكِلَةٌ", 0], ["طالِبانِ", 1], ["كَلِمَتانِ", 1]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Fill in the blank, definitions, words used together", bloklar: [
 { t: "bosluk", ar: "امْلَأِ الفَراغَ بِكَلِمَةٍ مِنَ الكَلِماتِ التّالِيَةِ", kutu: ["تُحِبُّ", "تَكْتُبُ", "يَدْرُسُ", "انْتَشَرَ", "تَأْكُلْ", "الدِّراسَةِ", "تَتْرُكْ", "سافَرَ"], ogeler: [
  ["أَرْغَبُ في ___ بِالجامِعَةِ.", "الدِّراسَةِ", null, "I want to study at the university."], ["مُحَمَّدٌ ___ الطِّبَّ.", "يَدْرُسُ", null, "Muhammad studies medicine."], ["___ التَّعْليمُ في كُلِّ مَكانٍ.", "انْتَشَرَ", null, "Education has spread everywhere."], ["لَمْ ___ زَيْنَبُ وَجْبَةَ الغَداءِ اليَوْمَ.", "تَأْكُلْ", null, "Zaynab did not eat lunch today."],
  ["لا ___ الدَّواءَ يا سَعيدُ.", "تَتْرُكْ", null, "Do not leave the medicine, Saʿīd."], ["___ بِهذا القَلَمِ.", "تَكْتُبُ", null, "You write with this pen."], ["___ أَحْمَدُ لِطَلَبِ العِلْمِ.", "سافَرَ", null, "Ahmad travelled to seek knowledge."], ["أَ___ عَمَلَكَ؟", "تُحِبُّ", null, "Do you like your job?"]] },
 { t: "esle", ar: "صِلْ بَيْنَ الكَلِمَةِ وَتَعْريفِها (شَرْحِها)", ciftler: [
  ["الجامِعَةُ", "المَرْحَلَةُ الَّتي تَأْتي بَعْدَ المَرْحَلَةِ الثّانَوِيَّةِ.", "university"], ["جَدَّتي", "والِدَةُ أُمّي أَوْ أَبي.", "my grandmother"], ["الاغْتِرابُ", "السَّفَرُ إِلى خارِجِ الوَطَنِ لِلْعَمَلِ.", "going abroad"],
  ["التَّلاميذُ", "الأَطْفالُ الَّذينَ يَدْرُسونَ في المَرْحَلَةِ الابْتِدائِيَّةِ.", "students"], ["الطَّبيبُ", "الشَّخْصُ الَّذي يُعالِجُ النّاسَ.", "doctor"], ["الحَديقَةُ", "مَكانٌ يَذْهَبُ إِلَيْهِ النّاسُ لِلتَّرْويحِ عَنِ النَّفْسِ.", "garden, park"]] },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ تَأْتِيانِ مَعًا", ciftler: [
  ["تُعِدُّ", "الطَّعامَ", "she prepares food"], ["اتَّبِعْ", "الحِمْيَةَ", "follow the diet"], ["يَسْتَيْقِظُ", "مُتَأَخِّرًا", "wakes up late"], ["يَخْرُجُ", "إِلى البَرِّ", "goes out to the countryside"], ["قَرَأَ", "الدَّرْسَ", "he studied the lesson"], ["يُهاجِرُ", "لِلْعَمَلِ", "migrates to work"]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Correct the spelling mistakes", bloklar: [
 { t: "secim", ar: "الكَلِماتُ الَّتي تَحْتَها خَطٌّ كُتِبَتْ خَطَأً، صَحِّحْها", aciklama: "Choose the correctly written form.", ogeler: [
  ["(١) العالِمُ [[بْنُ]] المُبارَكِ مِنْ عُلَماءِ الإِسْلامِ.", "ابْنُ", ["بْنُ"], "The scholar Ibn al-Mubārak is among the scholars of Islam.", "Not between two proper names: the alif is written."],
  ["(٢) تَزَوَّجَ عَلِيُّ [[ابْنُ]] أَبي طالِبٍ فاطِمَةَ بِنْتَ مُحَمَّدٍ ﷺ.", "بْنُ", ["ابْنُ"], "ʿAlī ibn Abī Ṭālib married Fāṭima, the daughter of Muhammad (peace and blessings be upon him).", "Between two proper names: the alif is not written."],
  ["(٣) [[هاذا]] كِتابُ المُسْلِمينَ الأَوَّلُ.", "هذا", ["هاذا"], "This is the first book of the Muslims."],
  ["(٤) [[ذالِكَ]] كِتابُ القِراءَةِ.", "ذلِكَ", ["ذالِكَ"], "That is the reading book."],
  ["(٥) جاءَ الطُّلّابُ، [[لاكِنْ]] لَمْ يَحْضُرِ الأُسْتاذُ.", "لكِنْ", ["لاكِنْ"], "The students came, but the teacher did not come."],
  ["(٦) [[هاكَذا]] قالَ المُديرُ.", "هكَذا", ["هاكَذا"], "The director said so."],
  ["(٧) ما [[إِسْمُكَ]]؟", "اسْمُكَ", ["إِسْمُكَ"], "What is your name?", "The connecting hamza: an alif without hamza."],
  ["(٨) أَسْلَمَ [[عَمْرُ]] بْنُ العاصِ مَعَ خالِدِ بْنِ الوَليدِ.", "عَمْرُو", ["عَمْرُ"], "ʿAmr ibn al-ʿĀṣ became a Muslim together with Khālid ibn al-Walīd.", "عَمْرو is written with a wāw at the end that is not read (to distinguish it from عُمَر)."]] }
]}
];
var KELIME = [];
