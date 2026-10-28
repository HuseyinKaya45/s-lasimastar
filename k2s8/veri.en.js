// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ٨ (الوَحْدَتانِ ١٥ - ١٦) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "15–16", ar: "اخْتَبِرْ نَفْسَكَ ٨", tr: "Test yourself 8 · Units 15 and 16", pfx: "k2s8:", sinavYok: true, sonuc: true,
  giris: "The self-assessment test after Units 15 and 16 of the book: reading, structures and rules, vocabulary, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Two texts; 15 questions", bloklar: [
 { t: "metin", baslik: "First text", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["تُرْجِمَتْ مِئاتُ الكُتُبِ العِلْمِيَّةِ العَرَبِيَّةِ إِلى اللُّغَةِ اللّاتينِيَّةِ، وَدُرِّسَتْ هذِهِ الكُتُبُ في المَعاهِدِ وَالمَدارِسِ وَالجامِعاتِ الأوروبِّيَّةِ.", "Hundreds of Arabic science books were translated into Latin and these books were taught in the institutes, schools and universities of Europe."],
  ["وَهُناكَ كَلِماتٌ عَرَبِيَّةٌ كَثيرَةٌ في اللُّغاتِ الأوروبِّيَّةِ الحَديثَةِ؛ فَفي اللُّغَةِ الإِسْبانِيَّةِ ٤٠٠٠ كَلِمَةٍ عَرَبِيَّةٍ، وَفي البُرْتُغالِيَّةِ ٣٠٠٠ كَلِمَةٍ. وَهُناكَ نَحْوُ ١٠٠٠ كَلِمَةٍ مِنْ أَصْلٍ عَرَبِيٍّ في اللُّغَةِ الإِنْجِليزِيَّةِ، مِنْها نَحْوُ ٢٦٠ كَلِمَةً أَساسِيَّةً، يَسْتَعْمِلُها المُتَحَدِّثونَ بِالإِنْجِليزِيَّةِ في حَياتِهِمُ اليَوْمِيَّةِ.", "In the modern European languages there are many Arabic words: 4000 Arabic words in Spanish, 3000 in Portuguese. In English there are about 1000 words of Arabic origin; about 260 of them are basic words that English speakers use in daily life."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["تُرْجِمَتِ الكُتُبُ مِنَ …", "العَرَبِيَّةِ إِلى اللّاتينِيَّةِ", ["العَرَبِيَّةِ إِلى الإِنْجِليزِيَّةِ", "اللّاتينِيَّةِ إِلى العَرَبِيَّةِ"], "The books were translated … ."],
  ["الكُتُبُ الَّتي تُرْجِمَتْ كانَتْ …", "كَثيرَةً جِدًّا", ["قَليلَةً", "مِئَةَ كِتابٍ"], "The translated books … .", "Hundreds of books."],
  ["الكُتُبُ الَّتي تُرْجِمَتْ كانَتْ كُتُبًا في …", "العُلومِ", ["الأَدَبِ", "الثَّقافَةِ"], "The translated books were books of … ."],
  ["عَدَدُ الكَلِماتِ العَرَبِيَّةِ في الإِسْبانِيَّةِ وَالبُرْتُغالِيَّةِ نَحْوُ …", "٧٠٠٠ كَلِمَةٍ", ["٤٠٠٠ كَلِمَةٍ", "٣٠٠٠ كَلِمَةٍ"], "The number of Arabic words in Spanish and Portuguese is about … .", "4000 + 3000"],
  ["يَسْتَعْمِلُ الإِنْجِليزُ في حَياتِهِمُ اليَوْمِيَّةِ …", "نَحْوَ ٢٦٠ كَلِمَةً عَرَبِيَّةً", ["٢٦٠ كَلِمَةً عَرَبِيَّةً", "أَكْثَرَ مِنْ ٢٦٠ كَلِمَةً عَرَبِيَّةً"], "English speakers use … in their daily life."],
  ["دُرِّسَتِ الكُتُبُ العِلْمِيَّةُ في أوروبّا بِاللُّغَةِ …", "اللّاتينِيَّةِ", ["العَرَبِيَّةِ", "الإِنْجِليزِيَّةِ"], "The science books were taught in Europe … ."]] },
 { t: "metin", baslik: "Second text", ar: "اقْرَأْ", paragraf: [[
  ["كانَ النّاسُ في الماضي يَعيشونَ في بيئاتٍ نَظيفَةٍ خالِيَةٍ مِنَ الأَمْراضِ وَالتَّلَوُّثِ، وَكانوا لا يَعْرِفونَ مِنَ الأَمْراضِ إِلّا آلامَ الرَّأْسِ (الصُّداعَ) وَنَزَلاتِ البَرْدِ (الزُّكامَ) وَآلامَ البَطْنِ.", "In the past people lived in clean environments far from disease and pollution; as illnesses they knew nothing but headache, the common cold (catarrh) and stomach ache."],
  ["أَمّا الآنَ، فَقَدْ أَفْسَدَ الإِنْسانُ البيئَةَ الَّتي يَعيشُ فيها: فَلَوَّثَ الهَواءَ في الجَوِّ، وَلَوَّثَ المِياهَ في البِحارِ وَالآبارِ، وَدَفَنَ النُّفاياتِ في الأَرْضِ، فَلَوَّثَ التُّرْبَةَ وَالنَّباتَ.", "Now, however, man has spoiled the environment he lives in: he polluted the air, polluted the waters of the seas and wells, and polluted the soil and plants by burying waste in the soil."],
  ["وَكَثُرَتِ الأَمْراضُ في العَصْرِ الحاضِرِ، وَكَثُرَ المَرْضى في المُسْتَشْفَياتِ، فَعَرَفَ النّاسُ أَمْراضًا جَديدَةً ما كانوا يَعْرِفونَها في الماضي، مِثْلُ: السَّرَطانِ، وَأَمْراضِ القَلْبِ، وَالسُّكَّرِيِّ، وَالقَلَقِ… إلخ.", "In our age diseases have multiplied, patients in hospitals have increased; people have come to know new diseases that they did not know in the past, such as cancer, heart disease, diabetes and anxiety."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["كانَ الإِنْسانُ في الماضي …", "يَعيشُ في بيئاتٍ خالِيَةٍ مِنَ الأَمْراضِ", ["بَعيدًا عَنْ أَخْطارِ التَّلَوُّثِ", "يُفْسِدُ البيئَةَ"], "In the past man … ."],
  ["مِنَ الأَمْراضِ الَّتي جاءَتْ مَعَ التَّلَوُّثِ …", "السَّرَطانُ", ["آلامُ البَطْنِ", "الصُّداعُ الشَّديدُ"], "One of the diseases that came with pollution … ."],
  ["أَفْسَدَ الإِنْسانُ مِياهَ …", "البِحارِ وَالآبارِ", ["المَصانِعِ وَالآبارِ", "البِحارِ وَالأَنْهارِ"], "Man spoiled the waters of … ."],
  ["أَفْسَدَ الإِنْسانُ الأَرْضَ، فَلَوَّثَ …", "التُّرْبَةَ وَالزِّراعَةَ", ["المِياهَ وَالهَواءَ", "الجَوَّ وَالآبارَ"], "Man spoiled the soil and polluted … .", "In the text: the soil and plants."],
  ["لَوَّثَ الإِنْسانُ ثَلاثَةَ أَشْياءَ مُهِمَّةً هِيَ …", "الجَوُّ وَالمِياهُ وَالتُّرْبَةُ", ["الجَوُّ وَالآبارُ وَالنَّباتُ", "الجَوُّ وَالأَرْضُ وَالتُّرْبَةُ"], "Man polluted three important things: … ."],
  ["في العَصْرِ الحَديثِ …", "زادَتِ الأَمْراضُ، وَكَثُرَ المَرْضى", ["قَلَّتِ الأَمْراضُ، وَزادَ عَدَدُ المَرْضى", "قَلَّتِ الأَمْراضُ، وَقَلَّ عَدَدُ المَرْضى"], "In the modern age …"],
  ["الأَمْراضُ في العَصْرِ الحاضِرِ … الأَمْراضِ قَبْلَ مِئَةِ سَنَةٍ.", "تَخْتَلِفُ عَنِ", ["مِثْلُ", "أَقَلُّ مِنَ"], "The diseases of our age … the diseases of a hundred years ago."],
  ["مِنَ الأَمْراضِ الَّتي عَرَفَها الإِنْسانُ قَديمًا …", "الصُّداعُ وَالزُّكامُ", ["الإيدْزُ وَالسُّكَّرِيُّ", "القَلَقُ وَأَمْراضُ القَلْبِ"], "Among the diseases man knew in the past …"],
  ["مَوْضوعُ هذِهِ الفِقْرَةِ الرَّئيسُ هُوَ …", "التَّلَوُّثُ وَالأَمْراضُ", ["تَلَوُّثُ المِياهِ", "الأَمْراضُ الجَديدَةُ"], "The main subject of this paragraph …"]] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Structures and rules", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Structures and rules", ozet: "Correct sentence, error correction, correct word", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الخَطَأِ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "المَسْجِدانِ جَديدانِ.", ["المَسْجِدَيْنِ جَديدانِ."], "Which is correct?", "The subject is nominative."],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "صامَ المُسْلِمونَ.", ["صامَ المُسْلِمينَ."], "Which is correct?", "The subject is nominative."],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "ادْعُ إِلى اللهِ.", ["أَدْعو إِلى اللهِ."], "Which is correct?", "The book asks about the imperative pattern. (أَدْعو إِلى اللهِ “I call to God” is also a correct sentence.)"],
  ["(٤) أَيُّهُما صَحيحَةٌ؟", "الطُّلّابُ يَدْرُسونَ اللُّغَةَ العَرَبِيَّةَ.", ["الطُّلّابُ يَدْرُسوا اللُّغَةَ العَرَبِيَّةَ."], "Which is correct?"],
  ["(٥) أَيُّهُما صَحيحَةٌ؟", "لَمْ أَقْضِ العُطْلَةَ في بَلَدي.", ["لَمْ أَقْضي العُطْلَةَ في بَلَدي."], "Which is correct?", "In the jussive the weak letter drops."],
  ["(٦) أَيُّهُما صَحيحَةٌ؟", "يا طُلّابُ لا تَتْرُكوا الصَّلاةَ.", ["يا طُلّابُ لا تَتْرُكونَ الصَّلاةَ."], "Which is correct?", "The prohibitive lā drops the nūn."]] },
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Choose the correct form of the underlined word.", ogeler: [
  ["(١) لا [[تَأْكُلُ]] الطَّعامَ الحارَّ.", "تَأْكُلِ", ["تَأْكُلَ", "تَأْكُلونَ"], "Do not eat hot food.", "Prohibition: jussive; kasra for the following ال."],
  ["(٢) في الإِسْلامِ [[عيدَيْنِ]].", "عيدانِ", ["عيدَيْنُ", "عيدًا"], "In Islam there are two festivals.", "The delayed subject is nominative."],
  ["(٣) اغْسِلْ [[فوكَ]] قَبْلَ الأَكْلِ.", "فاكَ", ["فيكَ", "فو"], "Wash your mouth before the meal.", "The object: the five nouns with alif."],
  ["(٤) قابَلَ الطَّبيبُ [[المَريضانِ]].", "المَريضَيْنِ", ["المَريضونَ", "المَريضِ"], "The doctor met two patients."],
  ["(٥) سَأُقابِلُ [[المُهَنْدِسونَ]] غَدًا، إِنْ شاءَ اللهُ.", "المُهَنْدِسينَ", ["المُهَنْدِسانِ", "المُهَنْدِسُ"], "Tomorrow, God willing, I will meet the engineers."],
  ["(٦) احْتَرِمْ [[أَبيكَ]] يا عَبْدَ اللهِ.", "أَباكَ", ["أَبوكَ", "أَبُكَ"], "ʿAbdullāh, respect your father."]] },
 { t: "bosluk", ar: "أَكْمِلْ بِوَضْعِ الكَلِمَةِ الصَّحيحَةِ مِمّا بَيْنَ القَوْسَيْنِ", ogeler: [
  ["مُحَمَّدٌ ___ إِلى مِصْرَ.", "مُسافِرٌ", ["سَفَرٌ", "السَّفَرُ"], "Muhammad is going to Egypt (traveller)."],
  ["يا طُلّابُ لَنْ ___ غَدًا إِلى المَدينَةِ.", "تَذْهَبوا", ["تَذْهَبَ", "تَذْهَبانِ"], "Students, you will not go to the city tomorrow."],
  ["الرَّجُلانِ لَمْ ___ إِلى العَمَلِ اليَوْمَ.", "يَذْهَبا", ["يَذْهَبانِ", "يَذْهَبوا"], "The two men did not go to work today."],
  ["ضَعِ الطَّعامَ في ___.", "فيكَ", ["فاكَ", "فوكَ"], "Put the food in your mouth.", "After a preposition: yāʾ."]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Singular-plural, topic headings, words that go together", bloklar: [
 { t: "esle", ar: "اكْتُبِ المُفْرَدَ أَوِ الجَمْعَ لِلْكَلِماتِ التّالِيَةِ", ciftler: [
  ["سَجّادَةٌ", "سَجاجيدُ", "prayer rug, carpet"], ["طاقَةٌ", "طاقاتٌ", "energy"], ["حَرْبٌ", "حُروبٌ", "war"], ["عَمَلٌ", "أَعْمالٌ", "job, work"], ["مِلْيارٌ", "مِلْياراتٌ", "billion"], ["نَهْرٌ", "أَنْهارٌ", "river"]],
  not: "The plural of سَجّادَةٌ is also used as سَجّاداتٌ." },
 { t: "siniflandir", ar: "ضَعْ كُلَّ كَلِمَةٍ مِمّا يَلي تَحْتَ العُنْوانِ المُناسِبِ لَها: التَّلَوُّثُ، أَوِ الطّاقَةُ", soru: "Which title?", gruplar: ["التَّلَوُّثُ", "الطّاقَةُ"], ogeler: [
  ["سَرَطانٌ", 0], ["إِضاءَةٌ", 1], ["مَوْتٌ", 0], ["مُصابٌ", 0], ["فاتورَةٌ", 1], ["كَهْرَباءُ", 1], ["الْتِهابٌ", 0],
  ["بِحارٌ", 0], ["احْتِياطٌ", 1], ["وَقودٌ", 1], ["تَصَحُّرٌ", 0], ["تَوْليدٌ", 1], ["مِياهٌ", 0], ["تَدْفِئَةٌ", 1]],
  not: "بِحارٌ and مِياهٌ were placed under “pollution” according to the unit's topic of sea and water pollution." },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ تَأْتِيانِ مَعًا", ciftler: [
  ["الأَجْهِزَةُ", "الكَهْرَبائِيَّةُ", "electrical appliances"], ["إِشارَةٌ", "ضَوْئِيَّةٌ", "traffic light"], ["بَريدٌ", "إِلِكْتْرونِيٌّ", "e-mail"], ["دُوَلٌ", "مُنْتِجَةٌ", "producing countries"],
  ["ذَهَبٌ", "أَسْوَدُ", "black gold"], ["فَحْمٌ", "حَجَرِيٌّ", "coal"], ["مَحَطّاتُ", "الوَقودِ", "petrol stations"], ["الكُرَةُ", "الأَرْضِيَّةُ", "the globe"]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Writing the hamza and arranging words", bloklar: [
 { t: "secim", ar: "ضَعْ خَطًّا تَحْتَ الخَطَأِ، ثُمَّ صَحِّحْهُ", aciklama: "Choose the correctly written sentence.", ogeler: [
  ["(١) القُرْآنُ كِتابٌ نَقْرَأُهُ كُلَّ يَوْمٍ.", "القُرْآنُ كِتابٌ نَقْرَؤُهُ كُلَّ يَوْمٍ.", ["القُرْآنُ كِتابٌ نَقْرَأُهُ كُلَّ يَوْمٍ."], "The Qur'an is a book we read every day.", "A hamza with ḍamma is written on a wāw."],
  ["(٢) حِفْظُ الأَمْنِ مَسْئولِيَّةُ الجَميعِ.", "حِفْظُ الأَمْنِ مَسْؤولِيَّةُ الجَميعِ.", ["حِفْظُ الأَمْنِ مَسْئولِيَّةُ الجَميعِ."], "Protecting security is everyone's responsibility."],
  ["(٣) أَبي ناءِمٌ في غُرْفَةِ النَّوْمِ.", "أَبي نائِمٌ في غُرْفَةِ النَّوْمِ.", ["أَبي ناءِمٌ في غُرْفَةِ النَّوْمِ."], "My father is sleeping in the bedroom.", "A hamza with kasra is written on the dotted yāʾ."],
  ["(٤) شَكَرَ الآباءُ الأَبْناءَ عَلى أَداؤِ العَمَلِ.", "شَكَرَ الآباءُ الأَبْناءَ عَلى أَداءِ العَمَلِ.", ["شَكَرَ الآباءُ الأَبْناءَ عَلى أَداؤِ العَمَلِ."], "The fathers thanked the sons for carrying out the work.", "The final hamza after the alif mamdūda is written on the line."]] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ الآتِيَةَ لِتَصيرَ جُمَلًا", aciklama: "(١) في - المَرَضُ - جِسْمِهِ - انْتَشَرَ", ogeler: ["انْتَشَرَ", "المَرَضُ", "في", "جِسْمِهِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٢) خالِيَةً - التَّلَوُّثِ - نُريدُ - مِنَ - بيئَةً", ogeler: ["نُريدُ", "بيئَةً", "خالِيَةً", "مِنَ", "التَّلَوُّثِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٣) النِّفْطُ - هُناكَ - كَثيرٌ - الدُّوَلِ - مِنَ - في", ogeler: ["هُناكَ", "نِفْطٌ", "في", "كَثيرٍ", "مِنَ", "الدُّوَلِ"],
  not: "There is oil in many countries. The words in the book (النِّفْطُ، كَثيرٌ) take the forms نِفْطٌ and كَثيرٍ in this sentence according to case."},
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤) الفُقَراءِ - كانَ - في - اللهُ - عَوْنِ", ogeler: ["كانَ", "اللهُ", "في", "عَوْنِ", "الفُقَراءِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٥) لِلطّاقَةِ - الشَّمْسُ - المَصْدَرُ - هِيَ - الأَساسِيُّ", ogeler: ["الشَّمْسُ", "هِيَ", "المَصْدَرُ", "الأَساسِيُّ", "لِلطّاقَةِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٦) النِّفْطِ - أَسْبابُ - أَزْمَةِ - ما؟", ogeler: ["ما", "أَسْبابُ", "أَزْمَةِ", "النِّفْطِ؟"] }
]}
];
var KELIME = [];
