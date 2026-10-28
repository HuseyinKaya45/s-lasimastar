// ================= VERİ: el-Arabiyyetü beyne yedeyk 3 — الاخْتِبارُ الأَوَّلُ (الوَحَداتُ ١ - ٤) =================
// Kitaptaki birinci sınav: dört bölüm, 70 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "1–4", ar: "الاخْتِبارُ الأَوَّلُ", tr: "First Exam · Units 1–4", pfx: "k3s1:", sinavYok: true, sonuc: true,
  giris: "The first exam after Units 1–4 of the book: reading, vocabulary, grammar rules and writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page. For open-ended questions, first answer yourself, then look at the sample answer." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Three paragraphs about the Qur'an; 18 questions", bloklar: [
 { t: "metin", baslik: "Text", ar: "اقْرَأِ النَّصَّ التّالِيَ، ثُمَّ أَجِبْ عَمّا يَليهِ مِنْ أَسْئِلَةٍ", paragraf: [
  [["يُبَيِّنُ لَنَا القُرْآنُ الكَريمُ أَنَّ النَّبِيَّ ﷺ كانَ أُمِّيًّا (لا يَقْرَأُ وَلا يَكْتُبُ)، وَالقُرْآنُ كِتابٌ مُخْتَلِفٌ تَمامًا عَمّا يَعْرِفُهُ العَرَبُ مِنْ شِعْرٍ وَنَثْرٍ؛ فَهُوَ مُعْجِزَةٌ لُغَوِيَّةٌ وَأَدَبِيَّةٌ جَديدَةٌ تَمامًا، وَلَيْسَ هُناكَ كِتابٌ قَبْلَهُ يُشْبِهُهُ، وَلِأَنَّهُ نَزَلَ عَلى رَجُلٍ أُمِّيٍّ، فَهُوَ دَليلٌ كَبيرٌ عَلى أَنَّهُ لَيْسَ مِنْ عَمَلِهِ، وَإِنَّما هُوَ وَحْيٌ مُنَزَّلٌ.", "The Noble Qur'an informs us that the Prophet (peace and blessings be upon him) was unlettered (could not read or write). The Qur'an is a book completely different from the poetry and prose the Arabs knew; it is a miracle of an entirely new language and literature; before it there was no book resembling it. Because it was revealed to an unlettered man, it is also great evidence that it is not his work, but a revealed revelation."]],
  [["جاءَتْ في القُرْآنِ إِشاراتٌ كَثيرَةٌ إِلى حَقائِقَ عِلْمِيَّةٍ، لَمْ يَتَوَصَّلْ إِلَيْهَا العِلْمُ إِلّا في العَصْرِ الحَديثِ، وَلا يُمْكِنُ أَنْ توجَدَ في البيئَةِ الصَّحْراوِيَّةِ الَّتي نَشَأَ فيها مُحَمَّدٌ ﷺ. وَمِنْ أَمْثِلَةِ ذلِكَ: الإِشارَةُ إِلى تَطَوُّرِ الجَنينِ في بَطْنِ أُمِّهِ، وَبَصَماتِ الأَصابِعِ، وَكَيْفَ أَنَّها لا تَتَشابَهُ بَيْنَ النّاسِ عَلى كَثْرَتِهِمْ. وَكَذلِكَ الإِشارَةُ إِلى حَرَكَةِ الشَّمْسِ وَالقَمَرِ، وَنَشْأَةِ الكَوْنِ، وَالأَمْطارِ وَالنَّباتِ.", "In the Qur'an there are many references to scientific facts that science reached only in the modern age, which could not have been found in the desert environment in which Muhammad (peace and blessings be upon him) grew up. For example, it refers to the development of the fetus in the womb and to fingerprints, to the fact that fingerprints do not resemble one another however many people there are. There are also references to the movement of the sun and the moon, the formation of the universe, rains and plants."]],
  [["تُشيرُ المَصادِرُ التّاريخِيَّةُ إِلى أَنَّ الرَّسولَ ﷺ كانَ يَطْلُبُ مِنْ كُتّابِ الوَحْيِ - وَكانَ عَدَدُهُمْ تِسْعَةً وَعِشْرينَ مِنَ الصَّحابَةِ - أَنْ يَكْتُبوا ما نَزَلَ عَلَيْهِ بَعْدَ نُزولِ الوَحْيِ مُباشَرَةً، وَكانَ يَمْنَعُ أَصْحابَهُ مِنْ كِتابَةِ حَديثِهِ - في أَوَّلِ الأَمْرِ - حَتّى لا يَخْتَلِطَ حَديثُهُ بِالقُرْآنِ الَّذي هُوَ كَلامُ اللهِ تَعالى.", "Historical sources report that the Messenger of God (peace and blessings be upon him) asked the scribes of revelation (their number was twenty-nine of the Companions) to write down the revelation sent to him as soon as it came down; while at the beginning he forbade his Companions to write their own words, lest they be mixed with the Qur'an, the word of God Almighty."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الأولى هِيَ:", "القُرْآنُ مُعْجِزَةٌ، وَلَيْسَ مِنْ عَمَلِ مُحَمَّدٍ ﷺ.", ["كانَ مُحَمَّدٌ ﷺ لا يَعْرِفُ القِراءَةَ وَلا الكِتابَةَ.", "القُرْآنُ لَيْسَ كَالشِّعْرِ."], "The main idea of the first paragraph:"],
  ["(٢) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّانِيَةِ هِيَ:", "في القُرْآنِ مُعْجِزاتٌ عِلْمِيَّةٌ كَثيرَةٌ.", ["في القُرْآنِ الكَريمِ إِشاراتٌ لِلْبيئَةِ الصَّحْراوِيَّةِ.", "في القُرْآنِ إِشارَةٌ إِلى تَطَوُّرِ الجَنينِ."], "The main idea of the second paragraph:"],
  ["(٣) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّالِثَةِ هِيَ:", "تَدْوينُ القُرْآنِ.", ["نُزولُ الوَحْيِ.", "أُسْلوبُ الحَديثِ."], "The main idea of the third paragraph:"],
  ["(٤) أَهَمُّ دَليلٍ عَلى أَنَّ القُرْآنَ لَيْسَ مِنْ عَمَلِ مُحَمَّدٍ ﷺ هُوَ أَنَّ ...", "مُحَمَّدًا كانَ أُمِّيًّا.", ["القُرْآنَ مُخْتَلِفٌ عَمّا يَعْرِفُهُ العَرَبُ مِنَ الشِّعْرِ وَالنَّثْرِ.", "المَصادِرَ التّاريخِيَّةَ تَقولُ إِنَّ القُرْآنَ وَحْيٌ مِنَ اللهِ."], "The most important evidence that the Qur'an is not Muhammad's work is …", "Text: «وَلِأَنَّهُ نَزَلَ عَلى رَجُلٍ أُمِّيٍّ، فَهُوَ دَليلٌ كَبيرٌ عَلى أَنَّهُ لَيْسَ مِنْ عَمَلِهِ»."],
  ["(٥) مِمّا فَهِمْتَهُ مِنَ القِراءَةِ، فَإِنَّ القُرْآنَ مُعْجِزَةٌ ...", "لُغَوِيَّةٌ وَأَدَبِيَّةٌ وَعِلْمِيَّةٌ.", ["أَدَبِيَّةٌ وَلُغَوِيَّةٌ.", "أَدَبِيَّةٌ وَعِلْمِيَّةٌ."], "According to what you read, the Qur'an is a … miracle."],
  ["(٦) أَفْضَلُ عُنْوانٍ لِهذا النَّصِّ هُوَ ...", "القُرْآنُ وَحْيٌ مِنَ اللهِ.", ["القُرْآنُ وَالعِلْمُ.", "تَدْوينُ القُرْآنِ."], "The most fitting title for this text …"]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗) وَصَحِّحِ الخَطَأَ", ogeler: [
  ["(٧) الأُمِّيُّ هُوَ الشَّخْصُ الَّذي لا يَقْرَأُ وَلا يَكْتُبُ.", true, "", "The unlettered is one who cannot read or write."],
  ["(٨) كانَ القُرْآنُ لِلْعَرَبِ مُعْجِزَةً لُغَوِيَّةً وَعِلْمِيَّةً.", false, "كانَ القُرْآنُ لِلْعَرَبِ مُعْجِزَةً لُغَوِيَّةً وَأَدَبِيَّةً؛ أَمّا الحَقائِقُ العِلْمِيَّةُ فَلَمْ يَتَوَصَّلْ إِلَيْهَا العِلْمُ إِلّا في العَصْرِ الحَديثِ.", "The Qur'an was a miracle of language and science for the Arabs."],
  ["(٩) أَشارَ القُرْآنُ إِلى عَمَلِيَّةِ تَطَوُّرِ الجَنينِ في بَطْنِ أُمِّهِ.", true, "", "The Qur'an referred to the development of the fetus in the womb."],
  ["(١٠) نَشَأَ مُحَمَّدٌ ﷺ في بيئَةٍ صَحْراوِيَّةٍ.", true, "", "Muhammad (peace and blessings be upon him) grew up in a desert environment."],
  ["(١١) بَصَماتُ الأَصابِعِ تَتَشابَهُ بَيْنَ الأَشْخاصِ.", false, "بَصَماتُ الأَصابِعِ لا تَتَشابَهُ بَيْنَ النّاسِ عَلى كَثْرَتِهِمْ.", "Fingerprints are similar among people."],
  ["(١٢) كانَ يُطْلَقُ عَلى الَّذينَ يُدَوِّنونَ القُرْآنَ في عَهْدِ الرَّسولِ ﷺ كُتّابُ القُرْآنِ.", false, "كانَ يُطْلَقُ عَلَيْهِمْ كُتّابُ الوَحْيِ.", "In the time of the Messenger of God those who wrote the Qur'an were called “Qur'an scribes.”"],
  ["(١٣) أُسْلوبُ القُرْآنِ يَخْتَلِفُ كَثيرًا عَنْ أُسْلوبِ الحَديثِ.", true, "", "The style of the Qur'an is very different from the style of the hadith.", "It is not stated explicitly in the text; it is derived from the information that the Qur'an is the word of God and was kept separate so as not to be mixed with the hadith."]] },
 { t: "acik", ar: "أَجِبْ بِاخْتِصارٍ عَمّا يَلي", aciklama: "First answer yourself; then look at the sample answer.", ogeler: [
  ["(١٤) مِنْ أَيْنَ نَعْرِفُ أَنَّ النَّبِيَّ ﷺ كانَ أُمِّيًّا؟ (اذْكُرْ مَصْدَرَيْنِ)", "مِنَ القُرْآنِ الكَريمِ، وَمِنَ المَصادِرِ التّاريخِيَّةِ (كُتُبِ السّيرَةِ).", "How do we know that the Prophet was unlettered? (Two sources)", "The text mentions only the Qur'an; as a second source, history and biography books can be given."],
  ["(١٥) ما النَّوْعانِ اللُّغَوِيّانِ اللَّذانِ كانَ يَعْرِفُهُمَا العَرَبُ قَبْلَ نُزولِ القُرْآنِ؟", "الشِّعْرُ وَالنَّثْرُ.", "What are the two kinds of language the Arabs knew before the Qur'an was revealed?"],
  ["(١٦) اذْكُرْ إِشارَتَيْنِ عِلْمِيَّتَيْنِ جاءَتا في القُرْآنِ غَيْرَ نُمُوِّ الجَنينِ.", "بَصَماتُ الأَصابِعِ، وَحَرَكَةُ الشَّمْسِ وَالقَمَرِ (وَأَيْضًا: نَشْأَةُ الكَوْنِ، الأَمْطارُ، النَّباتُ).", "Besides the development of the fetus, name two scientific references in the Qur'an."],
  ["(١٧) كَمْ كانَ عَدَدُ كُتّابِ الوَحْيِ؟", "تِسْعَةً وَعِشْرينَ مِنَ الصَّحابَةِ.", "How many were the scribes of revelation?"],
  ["(١٨) لِمَ كانَ الرَّسولُ ﷺ يَمْنَعُ أَصْحابَهُ مِنْ كِتابَةِ الحَديثِ في أَوَّلِ الأَمْرِ؟", "حَتّى لا يَخْتَلِطَ حَديثُهُ بِالقُرْآنِ الَّذي هُوَ كَلامُ اللهِ تَعالى.", "Why did the Messenger of God at the beginning forbid his Companions to write down hadith?"]] }
]},
// ---------------- 2. KELİMELER ----------------
{ no: 2, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثانِيًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Plurals, verb-word combinations, antonyms; 20 questions", bloklar: [
 { t: "bosluk", ar: "هاتِ جَمْعَ الكَلِماتِ الَّتي تَحْتَها خَطٌّ، وَضَعْهُ في الفَراغِ", kutu: ["أَجْزاءٍ", "الأَدْعِيَةِ", "أَفْعالِ", "الأَنْبِياءِ", "حُقوقٌ", "عِبادِ", "الصَّحابَةِ", "نَواحي", "المَوْتى", "القُلوبُ"], ogeler: [
  ["(١) يَتَكَوَّنُ القُرْآنُ مِنْ ___ عَدَدُها ثَلاثونَ [[جُزْءًا]].", "أَجْزاءٍ", null, "The Qur'an consists of parts whose number is thirty."],
  ["(٢) «الحَمْدُ للهِ الَّذي أَحْيانا بَعْدَ ما أَماتَنا وَإِلَيْهِ النُّشورُ» هذا [[دُعاءٌ]] مِنَ الـ___ المَأْثورَةِ.", "الأَدْعِيَةِ", null, "This is one of the supplications transmitted from the Prophet."],
  ["(٣) كُلُّ [[فِعْلٍ]] مِنْ ___ الرَّسولِ ﷺ، وَكُلُّ قَوْلٍ مِنْ أَقْوالِهِ دَوَّنَتْها كُتُبُ السُّنَّةِ.", "أَفْعالِ", null, "The books of Sunna recorded every act and every word of the Messenger of God."],
  ["(٤) مُحَمَّدٌ ﷺ [[نَبِيٌّ]] مِنَ الـ___ أولي العَزْمِ.", "الأَنْبِياءِ", null, "Muhammad (peace and blessings be upon him) is one of the prophets of firm resolve."],
  ["(٥) لِلْمُسْلِمِ عَلى المُسْلِمِ ___ سِتَّةٌ، أَوَّلُها [[حَقُّ]] السَّلامِ.", "حُقوقٌ", null, "A Muslim has six rights over a Muslim; the first is the right of greeting."],
  ["(٦) كانَ لُقْمانُ [[عَبْدًا]] مِنْ ___ اللهِ الصّالِحينَ.", "عِبادِ", null, "Luqmān was a servant among God's righteous servants."],
  ["(٧) كانَ أَبو هُرَيْرَةَ [[الصَّحابِيُّ]] أَكْثَرَ الـ___ مُرافَقَةً لِلرَّسولِ ﷺ.", "الصَّحابَةِ", null, "The Companion Abū Hurayra was among the Companions who accompanied the Messenger of God most."],
  ["(٨) زارَ ابْنُ بَطّوطَةَ كُلَّ [[ناحِيَةٍ]] مِنْ ___ الهِنْدِ وَالصّينِ.", "نَواحي", null, "Ibn Baṭṭūṭa toured every region of India and China."],
  ["(٩) إِنَّ اللهَ يُحْيي ___، فَهُوَ الَّذي يُخْرِجُ الحَيَّ مِنَ [[المَيِّتِ]].", "المَوْتى", null, "God gives life to the dead; it is He who brings the living out of the dead."],
  ["(١٠) اطْمِئْنانُ [[القَلْبِ]] يَكونُ بِذِكْرِ اللهِ، أَلا بِذِكْرِ اللهِ تَطْمَئِنُّ الـ___.", "القُلوبُ", null, "The peace of the heart is in remembering God; know that hearts find rest only in the remembrance of God."]] },
 { t: "secim", ar: "ضَعْ خَطًّا تَحْتَ الكَلِمَةِ الَّتي تُناسِبُ الفِعْلَ المَذْكورَ بَيْنَ القَوْسَيْنِ", aciklama: "Choose the word that best fits the verb.", ogeler: [
  ["(١) (أَباحَ) ...", "الزَّواجَ", ["الإِخْلاصَ", "الإِشْرافَ", "الاتِّباعَ"], "(He made permissible) …"],
  ["(٢) (أَتْقَنَ) ...", "العَمَلَ", ["البَعْثَ", "البِرَّ", "الحِجابَ"], "(He did well/carefully) …"],
  ["(٣) (أَضاعَ) ...", "المالَ", ["الحِكْمَةَ", "الشَّكَّ", "الصُّعوبَةَ"], "(He lost, wasted) …"],
  ["(٤) (أَكْمَلَ) ...", "البِناءَ", ["العَصا", "العِبْرَةَ", "الفِتْنَةَ"], "(He completed) …"],
  ["(٥) (ذَبَحَ) ...", "الأُضْحِيَةَ", ["الطَّعامَ", "السَّمَكَ", "الوَجَباتِ"], "(He cut, sacrificed) …"]] },
 { t: "bosluk", ar: "ضَعِ الكَلِمَةَ المُضادَّةَ في المَعْنى، لِما تَحْتَهُ خَطٌّ، في الفَراغِ", kutu: ["أَحَلَّ", "فَقَدَ", "الإِنْسَ", "كافِرٌ", "اليُسْرى"], ogeler: [
  ["(١) ___ اللهُ البَيْعَ، وَ[[حَرَّمَ]] الرِّبا.", "أَحَلَّ", null, "God made trade lawful and usury forbidden."],
  ["(٢) [[وَجَدَ]] مُحَمَّدٌ كُتُبَهُ، وَلكِنَّهُ ___ جَوازَ سَفَرِهِ.", "فَقَدَ", null, "Muhammad found his books but lost his passport. (أَضاعَ is also possible)"],
  ["(٣) خَلَقَ اللهُ ___ وَ[[الجِنَّ]] لِعِبادَتِهِ.", "الإِنْسَ", null, "God created mankind and the jinn that they might worship Him."],
  ["(٤) هُوَ الَّذي خَلَقَكُمْ فَمِنْكُمْ ___ وَمِنْكُمْ [[مُؤْمِنٌ]].", "كافِرٌ", null, "He is the One who created you; some of you are disbelievers and some believers."],
  ["(٥) ادْخُلِ الحَمّامَ بِرِجْلِكَ ___، وَاخْرُجْ بِـ[[اليُمْنى]].", "اليُسْرى", null, "Enter the toilet with your left foot and leave with your right foot."]] }
]},
// ---------------- 3. NAHİV ----------------
{ no: 3, etiket: "Grammar", kisa: "قَواعِدُ النَّحْوِ", ar: "ثالِثًا: قَواعِدُ النَّحْوِ", tr: "Grammar rules", ozet: "Choose the correct form, match term and definition; 13 questions", bloklar: [
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١) إِنَّ ...", "اللهَ تَوّابٌ رَحيمٌ", ["اللهُ تَوّابٌ رَحيمٌ", "اللهَ تَوّابًا رَحيمًا"], "After إِنَّ …", "إِنَّ puts its noun in the accusative and its predicate in the nominative."],
  ["(٢) ظَلَّ ...", "الجُنْدِيّانِ ساهِرَيْنِ", ["الجُنْدِيّانِ ساهِرانِ", "الجُنْدِيَّيْنِ ساهِرانِ"], "After ظَلَّ …", "ظَلَّ, a sister of كانَ: its noun is nominative, its predicate accusative."],
  ["(٣) هؤُلاءِ الطّالِباتُ ...", "ناجِحاتٌ", ["ناجِحونَ", "ناجِحَةٌ"], "These girl students …"],
  ["(٤) عِنْدَ أَخي ...", "ضَيْفانِ", ["ضَيْفَيْنِ", "ضَيْفًا"], "Next to my brother there is …", "After a fronted predicate, the delayed subject is nominative."],
  ["(٥) مَنْ ...", "يُتْقِنْ عَمَلَهُ يَنْجَحْ", ["يُتْقِنُ عَمَلَهُ يَنْجَحُ", "يُتْقِنْ عَمَلَهُ يَنْجَحَ"], "Whoever … (condition)", "مَنْ jussives two verbs."],
  ["(٦) إِذا مَرِضْتَ ... نَصيحَةَ الطَّبيبِ.", "فَاتَّبِعْ", ["اتْبَعْ", "اتَّبِعْ"], "If you fall ill, follow the doctor's advice.", "A response with an imperative verb takes «فـ»."],
  ["(٧) كُتِبَ ...", "الدَّرْسانِ", ["الدَّرْسَيْنِ", "الدَّرْسَ"], "… was written.", "After a passive verb the deputy subject is nominative."]] },
 { t: "esle", ar: "ضَعْ أَمامَ كُلِّ كَلِمَةٍ أَوْ عِبارَةٍ مِنَ المَجْموعَةِ (أ) الجُمْلَةَ الَّتي تُناسِبُها مِنَ المَجْموعَةِ (ب)", ciftler: [
  ["إِنَّ وَأَخَواتُها", "حُروفٌ ناسِخَةٌ تَنْصِبُ المُبْتَدَأَ، وَتَرْفَعُ الخَبَرَ.", "inna and its sisters"],
  ["كانَ وَأَخَواتُها", "أَفْعالٌ ناسِخَةٌ تَرْفَعُ المُبْتَدَأَ وَتَنْصِبُ الخَبَرَ.", "kāna and its sisters"],
  ["شِبْهُ الجُمْلَةِ", "هُوَ الجارُّ وَالمَجْرورُ أَوِ الظَّرْفُ.", "quasi-sentence"],
  ["كَيْفَما", "مِنْ أَدَواتِ الشَّرْطِ الَّتي تَجْزِمُ فِعْلَيْنِ.", "kayfamā"],
  ["لَوْ", "مِنْ أَدَواتِ الشَّرْطِ غَيْرِ الجازِمَةِ.", "law"],
  ["نائِبُ الفاعِلِ", "اسْمٌ مَرْفوعٌ يَحُلُّ مَحَلَّ الفاعِلِ بَعْدَ حَذْفِهِ.", "deputy agent"]],
  not: "The (هـ) in the book «اسْمٌ مَنْصوبٌ يَقَعُ عَلَيْهِ فِعْلُ الفاعِلِ» (the direct object) is a distractor." }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Sentence completion and word combinations; 19 questions", bloklar: [
 { t: "acik", ar: "أَكْمِلِ الفَراغاتِ بِجُمَلٍ مِنْ إِنْشائِكَ", aciklama: "Write it yourself first; then look at the example.", ogeler: [
  ["(١) انْتَقَلَ إِلى ...", "انْتَقَلَ أَخي إِلى مَدْرَسَةٍ جَديدَةٍ.", "… moved / passed."],
  ["(٢) حَقٌّ عَلَيْكَ أَنْ ...", "حَقٌّ عَلَيْكَ أَنْ تَبَرَّ والِدَيْكَ.", "… is a duty upon you."],
  ["(٣) إِيّاكَ أَنْ ...", "إِيّاكَ أَنْ تَكْذِبَ.", "Beware of …!"],
  ["(٤) طَلَبَ ... مِنْ ...", "طَلَبَ المُعَلِّمُ مِنَ الطُّلّابِ أَنْ يَحْفَظوا السّورَةَ.", "… asked … from …"],
  ["(٥) ماذا تَرى في ... ؟", "ماذا تَرى في هذِهِ المَسْأَلَةِ؟", "What do you think about …?"],
  ["(٦) أَمَرَ اللهُ عِبادَهُ بِـ ...", "أَمَرَ اللهُ عِبادَهُ بِالعَدْلِ وَالإِحْسانِ.", "God commanded His servants to …"],
  ["(٧) بَحَثْتُ عَنْ ...", "بَحَثْتُ عَنْ كِتابي فَلَمْ أَجِدْهُ.", "I looked for …"],
  ["(٨) أَحْمَدُ يُقيمُ في ...", "أَحْمَدُ يُقيمُ في المَدينَةِ المُنَوَّرَةِ.", "Ahmad resides …"]] },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ تَأْتِيانِ مَعًا مِنْ (أ) وَ(ب)، وَاكْتُبْهُما في جُمْلَةٍ", aciklama: "Then write a sentence in your notebook with each pair.", ciftler: [
  ["تَقْوى", "اللهِ", "fear of God, piety"], ["يَوْمُ", "القِيامَةِ", "the Day of Resurrection"], ["شِبْلُ", "الأَسَدِ", "lion cub"], ["خاتَمُ", "الرُّسُلِ", "the last of the prophets"],
  ["بَيْعَةُ", "العَقَبَةِ", "the pledge of al-ʿAqaba"], ["إِفْشاءُ", "السَّلامِ", "spreading the greeting"], ["غَضُّ", "البَصَرِ", "guarding the eye from the forbidden"], ["آدابُ", "الطَّريقِ", "etiquette of the road"],
  ["الأَمْرُ", "بِالمَعْروفِ", "enjoining good"], ["ضَبْطُ", "النَّفْسِ", "controlling oneself"], ["النَّهْيُ", "عَنِ المُنْكَرِ", "forbidding evil"]] }
]}
];
var KELIME = [];
