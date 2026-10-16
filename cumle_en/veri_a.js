// ================= DATA: the four lessons from the book =================
// Segment format: "word:role / word:role". Roles: mub (mubtada’), hab (khabar), fiil (verb), fail (fā‘il), mef (maf‘ūl bihi), x (other)
var ROLES = {
  mub: { ar: "مُبْتَدَأٌ", tr: "Mubtada’" },
  hab: { ar: "خَبَرٌ", tr: "Khabar" },
  fiil: { ar: "فِعْلٌ", tr: "Verb" },
  fail: { ar: "فَاعِلٌ", tr: "Fā‘il" },
  mef: { ar: "مَفْعُولٌ بِهِ", tr: "Object" },
  x: { ar: "مُتَمِّمٌ", tr: "Other" }
};

var UNITS = [
// ---------------------------------------------------------------- 1
{
  id: "u1", short: "Complete Sentence", no: 1, ar: "الجُمْلَةُ المُفِيدَةُ", tr: "Complete Sentence", col: "mub",
  goals: ["Recognize a complete meaningful sentence (al-jumla al-mufīda)", "Tell a nominal sentence from a verbal sentence", "Build a sentence from words in the right order"],
  examples: [
    { s: "عَلِيٌّ:mub / مُهَنْدِسٌ:hab", tr: "Ali is an engineer." },
    { s: "الحَدِيقَةُ:mub / جَمِيلَةٌ:hab", tr: "The garden is beautiful." },
    { s: "الهَوَاءُ:mub / بَارِدٌ:hab", tr: "The weather is cold." },
    { s: "ذَهَبَتْ:fiil / زَيْنَبُ:fail / إِلَى السُّوقِ:x", tr: "Zaynab went to the market." },
    { s: "يَدْرُسُ:fiil / سَلِيمٌ:fail / فِي الجَامِعَةِ:x", tr: "Salim studies at the university." },
    { s: "حَضَرَ:fiil / إِبْرَاهِيمُ:fail / مِنَ المَدْرَسَةِ:x", tr: "Ibrahim came from school." }
  ],
  rules: [
    { tr: "A <b>complete meaningful sentence</b> (al-jumla al-mufīda) is made of two or more words and gives a <b>complete meaning</b>. If words stand side by side but the meaning is not complete, it is not a complete sentence.", ex: ["عَلِيٌّ مُهَنْدِسٌ.", "الحَدِيقَةُ جَمِيلَةٌ.", "حَضَرَ إِبْرَاهِيمُ مِنَ المَدْرَسَةِ."] },
    { tr: "A <b>nominal sentence</b> (جُمْلَةٌ اسْمِيَّةٌ) begins with a noun.", ex: ["القُرْآنُ عَرَبِيٌّ."], role: "mub" },
    { tr: "A <b>verbal sentence</b> (جُمْلَةٌ فِعْلِيَّةٌ) begins with a verb.", ex: ["نَزَلَ القُرْآنُ فِي رَمَضَانَ."], role: "fiil" },
    { tr: "The <b>first word</b> decides the type of sentence. The sentence <span class=\"ar\">الطِّفْلُ يَضْحَكُ</span> contains a verb, but it begins with a noun, so it is a nominal sentence." }
  ],
  kaide: [
    "١ـ الجُمْلَةُ المُفِيدَةُ تَتَكَوَّنُ مِنْ كَلِمَتَيْنِ أَوْ أَكْثَرَ، وَتُفِيدُ مَعْنًى تَامًّا.",
    "مِثَالٌ: عَلِيٌّ مُهَنْدِسٌ، الحَدِيقَةُ جَمِيلَةٌ، حَضَرَ إِبْرَاهِيمُ مِنَ المَدْرَسَةِ.",
    "٢ـ الجُمْلَةُ نَوْعَانِ:",
    "أ ـ جُمْلَةٌ اسْمِيَّةٌ: تَبْدَأُ بِاسْمٍ، مِثْلُ: القُرْآنُ عَرَبِيٌّ.",
    "ب ـ جُمْلَةٌ فِعْلِيَّةٌ: تَبْدَأُ بِفِعْلٍ، مِثْلُ: نَزَلَ القُرْآنُ فِي رَمَضَانَ."
  ],
  ex: [
    { type: "pick", ar: "ضَعْ هَذِهِ العَلَامَةَ (✓) أَمَامَ الجُمْلَةِ المُفِيدَةِ", tr: "Choose the complete meaningful sentence.", items: [
      { o: ["رَجَعَ أَحْمَدُ مِنْ مُتَأَخِّرًا.", "رَجَعَ أَحْمَدُ مِنَ العَمَلِ مُتَأَخِّرًا.", "رَجَعَ أَحْمَدُ مُتَأَخِّرًا مِنْ."], a: 1, tr: "Ahmad came back late from work." },
      { o: ["رَحَلَ الشَّامِ صَدِيقِي إِلَى.", "رَحَلَ صَدِيقِي إِلَى الشَّامِ.", "صَدِيقِي إِلَى رَحَلَ الشَّامِ."], a: 1, tr: "My friend moved to Damascus." },
      { o: ["شَرِبَتْ فَاطِمَةُ عَصِيرَ التُّفَّاحِ.", "شَرِبَتْ عَصِيرَ فَاطِمَةُ التُّفَّاحِ.", "شَرِبَتِ التُّفَّاحِ فَاطِمَةُ عَصِيرَ."], a: 0, tr: "Fatima drank apple juice." },
      { o: ["رَجَعَتْ عَائِشَةُ مِنَ العَمَلِ.", "عَائِشَةُ رَجَعَتْ مِنْ.", "مِنْ رَجَعَتْ عَائِشَةُ العَمَلِ."], a: 0, tr: "Aisha came back from work." },
      { o: ["نَقَلَتِ العَائِلَةُ إِلَى المَدِينَةِ البَيْتَ.", "العَائِلَةُ إِلَى نَقَلَتِ المَدِينَةِ البَيْتَ.", "المَدِينَةُ نَقَلَتِ العَائِلَةَ إِلَى البَيْتِ."], a: 0, tr: "The family moved their home to the city.", why: "A smoother order: <span class=\"ar\">نَقَلَتِ العَائِلَةُ البَيْتَ إِلَى المَدِينَةِ</span>. The third sentence is grammatical, but its meaning is odd: 'The city moved the family to the house.'" },
      { o: ["كُتُبٌ عَلَى كَثِيرَةٌ الرَّفِّ.", "عَلَى الرَّفِّ كُتُبٌ كَثِيرَةٌ.", "كَثِيرَةٌ عَلَى كُتُبٌ الرَّفِّ."], a: 1, tr: "There are many books on the shelf." },
      { o: ["فَاطِمَةُ جَالِسَةٌ فِي الغُرْفَةِ.", "جَالِسَةٌ الغُرْفَةِ فِي فَاطِمَةُ.", "الغُرْفَةِ فِي جَالِسَةٌ فَاطِمَةُ."], a: 0, tr: "Fatima is sitting in the room." },
      { o: ["فِي الطَّبِيبُ المُسْتَشْفَى سَلْمَانُ.", "فِي سَلْمَانُ الطَّبِيبُ المُسْتَشْفَى.", "سَلْمَانُ طَبِيبٌ فِي المُسْتَشْفَى."], a: 2, tr: "Salman is a doctor at the hospital." }
    ]},
    { type: "pick", fill: true, ar: "امْلَأِ الفَرَاغَ بِوَضْعِ الكَلِمَةِ المُنَاسِبَةِ مِمَّا بَيْنَ القَوْسَيْنِ", tr: "Fill in the blank with the right word from the brackets.",
      exHtml: "<span class=\"ar\">القَلَمُ <u>عَلَى</u> الوَرَقَةِ.</span> <span class=\"muted\">(جَمَعَ – عَلَى – زَيْدٌ)</span>", items: [
      { q: "___ الطَّالِبُ الكِتَابَ.", o: ["يَقْرَأُ", "فِي", "أَحْمَدُ"], a: 0, tr: "The student is reading the book." },
      { q: "أَخَذَ أَحْمَدُ قَمِيصًا ___ السُّوقِ.", o: ["حَمَلَ", "مِنَ", "عَلِيٌّ"], a: 1, tr: "Ahmad got a shirt from the market." },
      { q: "حَدَثَتْ ___ فِي المَدْرَسَةِ.", o: ["وَقَعَتْ", "فِي", "مُشْكِلَةٌ"], a: 2, tr: "A problem happened at school." },
      { q: "السَّاعَةُ ___ الطَّاوِلَةِ.", o: ["قَالَ", "وَلَدٌ", "عَلَى"], a: 2, tr: "The clock is on the table." },
      { q: "يُشَاهِدُ يَحْيَى المُبَارَاةَ ___ التِّلْفَازِ.", o: ["خَالِدٌ", "مِنَ", "يَجْلِسُ"], a: 1, tr: "Yahya is watching the match on TV." },
      { q: "المَكْتَبَةُ ___ مِنَ المَدْرَسَةِ.", o: ["بِـ", "قَرِيبَةٌ", "ذَهَبَتْ"], a: 1, tr: "The library is close to the school." },
      { q: "وَصَلَ المُهَنْدِسُ ___ المَصْنَعِ.", o: ["العُمَّالُ", "إِلَى", "دَخَلَ"], a: 1, tr: "The engineer arrived at the factory." },
      { q: "___ يُونُسُ مِنَ الأُرْدُنِّ.", o: ["مِنْ", "سَمِيرَةُ", "حَضَرَ"], a: 2, tr: "Yunus came from Jordan." }
    ]},
    { type: "classify", ar: "بَيِّنْ نَوْعَ كُلِّ جُمْلَةٍ مِنَ الجُمَلِ التَّالِيَةِ", tr: "Say what type each sentence is.", items: [
      { s: "يَلْعَبُ الفَرِيقَانِ مُنْذُ سَاعَةٍ.", a: "f", tr: "The two teams have been playing for an hour." },
      { s: "الصَّوْمُ رُكْنٌ مِنْ أَرْكَانِ الإِسْلَامِ.", a: "i", tr: "Fasting is one of the pillars of Islam." },
      { s: "الطِّفْلُ يَضْحَكُ فِي السَّرِيرِ.", a: "i", tr: "The child is laughing in bed.", why: "There is a verb, but the sentence <b>begins with a noun</b>: it is a nominal sentence." },
      { s: "سَلْمَى مَرِيضَةٌ اليَوْمَ.", a: "i", tr: "Salma is ill today." },
      { s: "غَسَلَ الوَلَدُ جَوْرَبَهُ.", a: "f", tr: "The boy washed his sock." },
      { s: "اللهُ يَنْظُرُ إِلَى القُلُوبِ.", a: "i", tr: "Allah looks at the hearts.", why: "The first word, <span class=\"ar\">اللهُ</span>, is a noun." },
      { s: "إِسْطَنْبُولُ فِي شَمَالِ تُرْكِيَا.", a: "i", tr: "Istanbul is in the north of Turkey." },
      { s: "الوَرْدُ كَثِيرٌ فِي الحَدِيقَةِ.", a: "i", tr: "There are many roses in the garden." }
    ]},
    { type: "order", conv: true, ar: "حَوِّلِ الجُمَلَ الفِعْلِيَّةَ إِلَى جُمَلٍ اسْمِيَّةٍ", tr: "Turn the verbal sentences into nominal sentences: move the fā‘il to the front.",
      exHtml: "<span class=\"ar\">كَتَبَ الطَّالِبُ وَاجِبَهُ.</span> → <span class=\"ar\">الطَّالِبُ كَتَبَ وَاجِبَهُ.</span>", items: [
      { from: "تَطْلُبُ سُعَادُ سُكَّرًا مِنْ وَالِدَتِهَا.", t: ["سُعَادُ", "تَطْلُبُ", "سُكَّرًا", "مِنْ وَالِدَتِهَا"], tr: "Suad asks her mother for sugar." },
      { from: "يَقْرَأُ أَحْمَدُ كُتُبَ الأَدَبِ.", t: ["أَحْمَدُ", "يَقْرَأُ", "كُتُبَ", "الأَدَبِ"], tr: "Ahmad reads literature books." },
      { from: "تَمْنَعُ الصَّلَاةُ الإِنْسَانَ عَنِ الفَحْشَاءِ وَالمُنْكَرِ.", t: ["الصَّلَاةُ", "تَمْنَعُ", "الإِنْسَانَ", "عَنِ الفَحْشَاءِ", "وَالمُنْكَرِ"], tr: "Prayer keeps a person away from indecency and wrongdoing." },
      { from: "حَضَرَ إِدْرِيسُ إِلَى مِصْرَ لِلدِّرَاسَةِ.", t: ["إِدْرِيسُ", "حَضَرَ", "إِلَى مِصْرَ", "لِلدِّرَاسَةِ"], tr: "Idris came to Egypt to study." },
      { from: "تَرَكَ الرَّسُولُ ﷺ مَكَّةَ وَذَهَبَ إِلَى المَدِينَةِ.", t: ["الرَّسُولُ ﷺ", "تَرَكَ", "مَكَّةَ", "وَذَهَبَ", "إِلَى المَدِينَةِ"], tr: "The Messenger ﷺ left Makkah and went to Madinah." },
      { from: "نَزَلَتِ الطَّائِرَةُ السَّاعَةَ الثَّالِثَةَ بَعْدَ الظُّهْرِ.", t: ["الطَّائِرَةُ", "نَزَلَتِ", "السَّاعَةَ الثَّالِثَةَ", "بَعْدَ الظُّهْرِ"], tr: "The plane landed at three o'clock in the afternoon." },
      { from: "يَأْكُلُ حُسَامٌ خَمْسَ وَجَبَاتٍ فِي اليَوْمِ.", t: ["حُسَامٌ", "يَأْكُلُ", "خَمْسَ وَجَبَاتٍ", "فِي اليَوْمِ"], tr: "Husam eats five meals a day." },
      { from: "تَدْخُلُ زَيْنَبُ فِي فِرَاشِهَا مُبَكِّرَةً.", t: ["زَيْنَبُ", "تَدْخُلُ", "فِي فِرَاشِهَا", "مُبَكِّرَةً"], tr: "Zaynab goes to bed early." }
    ]},
    { type: "order", ar: "كَوِّنْ مِنَ الكَلِمَاتِ جُمْلَةً مُفِيدَةً", tr: "Build a complete meaningful sentence from the words.",
      exHtml: "<span class=\"ar\">مِنْ – حَمَلَ – الحَقِيبَةَ – الرَّجُلُ – المَنْزِلِ – إِلَى – العَمَلِ</span> → <span class=\"ar\">حَمَلَ الرَّجُلُ الحَقِيبَةَ مِنَ العَمَلِ إِلَى المَنْزِلِ.</span>", items: [
      { t: ["رَجَعَ", "الوَلَدُ", "إِلَى", "البَيْتِ", "مُبَكِّرًا"], alt: ["رَجَعَ الوَلَدُ مُبَكِّرًا إِلَى البَيْتِ", "الوَلَدُ رَجَعَ إِلَى البَيْتِ مُبَكِّرًا"], tr: "The boy came back home early." },
      { t: ["الطِّفْلُ", "نَشِيطٌ", "فِي", "المَدْرَسَةِ"], alt: ["الطِّفْلُ فِي المَدْرَسَةِ نَشِيطٌ"], tr: "The child is active at school." },
      { t: ["نَجَحَتْ", "طَالِبَةٌ", "وَاحِدَةٌ", "فِي", "الامْتِحَانِ"], tr: "One female student passed the exam." },
      { t: ["الصَّلَاةُ", "رُكْنٌ", "مِنْ", "أَرْكَانِ", "الإِسْلَامِ"], tr: "Prayer is one of the pillars of Islam." },
      { t: ["يَذْهَبُ", "خَالِدٌ", "إِلَى", "الجَامِعَةِ", "بِسَيَّارَتِهِ"], alt: ["خَالِدٌ يَذْهَبُ إِلَى الجَامِعَةِ بِسَيَّارَتِهِ", "يَذْهَبُ خَالِدٌ بِسَيَّارَتِهِ إِلَى الجَامِعَةِ"], tr: "Khalid goes to the university in his car." },
      { t: ["قَرَأْتُ", "كِتَابًا", "فِي", "الشَّهْرِ", "المَاضِي"], tr: "I read a book last month." },
      { t: ["الجَوُّ", "بَارِدٌ", "فِي", "فَصْلِ", "الشِّتَاءِ"], alt: ["الجَوُّ فِي فَصْلِ الشِّتَاءِ بَارِدٌ"], tr: "The weather is cold in winter." },
      { t: ["فِي", "التِّلْفَازِ", "بَرْنَامَجٌ", "مُفِيدٌ"], tr: "There is a useful program on TV." }
    ]},
    { type: "reading", ar: "اقْرَأِ القِطْعَةَ التَّالِيَةَ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ", tr: "Read the passage, then answer the questions.",
      title: "أَبُو ذَرٍّ الغِفَارِيُّ",
      text: "الصَّحَابِيُّ أَبُو ذَرٍّ الغِفَارِيُّ مِنْ كِبَارِ الصَّحَابَةِ، صَرَفَ حَيَاتَهُ فِي خِدْمَةِ كِتَابِ اللهِ وَسُنَّةِ رَسُولِ اللهِ ﷺ. فِي يَوْمٍ مِنَ الأَيَّامِ شَعَرَ أَبُو ذَرٍّ بِوُجُودِ أَمْوَالٍ كَثِيرَةٍ عِنْدَ المُسْلِمِينَ، وَكَانَ الفُقَرَاءُ فِي حَاجَةٍ، فَحَزِنَ لِذَلِكَ، ثُمَّ ذَهَبَ إِلَى الأَغْنِيَاءِ وَنَصَحَهُمْ بِهَذِهِ العِبَارَاتِ: أَيُّهَا المُسْلِمُونَ، فِي أَمْوَالِكُمْ حَقٌّ لِفُقَرَائِكُمْ، يَسْأَلُكُمُ اللهُ يَوْمَ القِيَامَةِ عَنْ أَمْوَالِكُمْ، يَقُولُ اللهُ تَعَالَى فِي قُرْآنِهِ الكَرِيمِ: ﴿وَفِي أَمْوَالِهِمْ حَقٌّ لِلسَّائِلِ وَالمَحْرُومِ﴾ (الذَّارِيَات: ١٩)، يَعْنِي: فِي مَالِ المُسْلِمِ حَقٌّ لِلْفَقِيرِ وَالمُحْتَاجِ.",
      textTr: "The Companion Abu Dharr al-Ghifari was one of the great Companions. He spent his life serving the Book of Allah and the Sunnah of the Messenger of Allah ﷺ. One day Abu Dharr noticed that the Muslims had a lot of wealth while the poor were in need, and this saddened him. Then he went to the rich and advised them with these words: \"O Muslims! In your wealth there is a right for your poor. Allah will ask you about your wealth on the Day of Resurrection. Allah the Exalted says in His Noble Qur'an: 'And in their wealth there is a right for the one who asks and the one who is deprived.' (al-Dhariyat 19) That is: in a Muslim's wealth there is a right for the poor and the needy.\"",
      qa: [
        { q: "مَنْ كَانَ أَبُو ذَرٍّ؟", a: "كَانَ أَبُو ذَرٍّ مِنْ كِبَارِ الصَّحَابَةِ.", tr: "Who was Abu Dharr? He was one of the great Companions." },
        { q: "كَيْفَ عَاشَ حَيَاتَهُ؟", a: "صَرَفَ حَيَاتَهُ فِي خِدْمَةِ كِتَابِ اللهِ وَسُنَّةِ رَسُولِهِ ﷺ.", tr: "How did he spend his life? Serving the Book of Allah and the Sunnah of His Messenger ﷺ." },
        { q: "كَيْفَ نَصَحَ أَبُو ذَرٍّ المُسْلِمَ الغَنِيَّ؟", a: "قَالَ: فِي أَمْوَالِكُمْ حَقٌّ لِفُقَرَائِكُمْ، وَيَسْأَلُكُمُ اللهُ يَوْمَ القِيَامَةِ عَنْ أَمْوَالِكُمْ.", tr: "How did he advise the rich Muslim? He said: In your wealth there is a right for your poor, and Allah will ask you about your wealth on the Day of Resurrection." }
      ],
      cls: { ar: "عَيِّنِ الجُمْلَةَ الاسْمِيَّةَ وَالفِعْلِيَّةَ فِي القِطْعَةِ", tr: "Find the nominal and verbal sentences in the passage.", items: [
        { s: "الصَّحَابِيُّ أَبُو ذَرٍّ الغِفَارِيُّ مِنْ كِبَارِ الصَّحَابَةِ", a: "i" },
        { s: "صَرَفَ حَيَاتَهُ فِي خِدْمَةِ كِتَابِ اللهِ", a: "f" },
        { s: "شَعَرَ أَبُو ذَرٍّ بِوُجُودِ أَمْوَالٍ كَثِيرَةٍ", a: "f" },
        { s: "فَحَزِنَ لِذَلِكَ", a: "f" },
        { s: "ذَهَبَ إِلَى الأَغْنِيَاءِ", a: "f" },
        { s: "نَصَحَهُمْ بِهَذِهِ العِبَارَاتِ", a: "f" },
        { s: "فِي أَمْوَالِكُمْ حَقٌّ لِفُقَرَائِكُمْ", a: "i", why: "A nominal sentence whose khabar (<span class=\"ar\">فِي أَمْوَالِكُمْ</span>) comes first; the mubtada’ is <span class=\"ar\">حَقٌّ</span>." },
        { s: "يَسْأَلُكُمُ اللهُ يَوْمَ القِيَامَةِ عَنْ أَمْوَالِكُمْ", a: "f" },
        { s: "يَقُولُ اللهُ تَعَالَى فِي قُرْآنِهِ الكَرِيمِ", a: "f" },
        { s: "فِي مَالِ المُسْلِمِ حَقٌّ لِلْفَقِيرِ وَالمُحْتَاجِ", a: "i", why: "A nominal sentence with the khabar placed first; the mubtada’ is <span class=\"ar\">حَقٌّ</span>." }
      ]}
    }
  ]
},
// ---------------------------------------------------------------- 2
{
  id: "u2", short: "Mubtada’ and Khabar", no: 2, ar: "الجُمْلَةُ الاسْمِيَّةُ", sub: "المُبْتَدَأُ وَالخَبَرُ", tr: "Nominal Sentence: Mubtada’ and Khabar", col: "hab",
  goals: ["Find the mubtada’ (subject) and the khabar (predicate)", "Make the khabar agree with the mubtada’ in gender and number", "Form the khabar of a non-human plural correctly", "See that both are nominative (marfū‘)"],
  examples: [
    { s: "المُعَلِّمُ:mub / رَحِيمٌ:hab", tr: "The teacher is kind." },
    { s: "الشَّجَرَةُ:mub / طَوِيلَةٌ:hab", tr: "The tree is tall." },
    { s: "الطَّالِبَانِ:mub / طَوِيلَانِ:hab", tr: "The two students are tall." },
    { s: "الطَّالِبَتَانِ:mub / مُؤَدَّبَتَانِ:hab", tr: "The two female students are polite." },
    { s: "المُهَنْدِسُونَ:mub / نَشِيطُونَ:hab", tr: "The engineers are hard-working." },
    { s: "المُعَلِّمَاتُ:mub / غَائِبَاتٌ:hab", tr: "The female teachers are absent." },
    { s: "الأَشْجَارُ:mub / طَوِيلَةٌ:hab", tr: "The trees are tall." },
    { s: "الكُتُبُ:mub / جَدِيدَةٌ:hab", tr: "The books are new." },
    { s: "العُلَمَاءُ:mub / سِرَاجُ الأُمَّةِ:hab", tr: "Scholars are the lamp of the Ummah." },
    { s: "الجُمْلَةُ:mub / نَوْعَانِ:hab", tr: "The sentence is of two kinds." }
  ],
  rules: [
    { tr: "A nominal sentence begins with a noun.", ex: ["المُعَلِّمُ رَحِيمٌ.", "الشَّجَرَةُ طَوِيلَةٌ."] },
    { tr: "A nominal sentence has two parts: the <b class=\"r-mub\">mubtada’</b> (subject) and the <b class=\"r-hab\">khabar</b> (predicate). The mubtada’ is a <b>definite</b> noun at the start of the sentence; the khabar completes the meaning of the sentence and is usually an <b>indefinite</b> noun.", ex: ["المُعَلِّمُ رَحِيمٌ."] },
    { tr: "If the mubtada’ is <b>human</b>, the khabar agrees with it in <b>gender</b> (masculine/feminine) and <b>number</b> (singular/dual/plural).", ex: ["الطَّالِبَانِ طَوِيلَانِ.", "الطَّالِبَتَانِ مُؤَدَّبَتَانِ.", "المُهَنْدِسُونَ نَشِيطُونَ.", "المُعَلِّمَاتُ غَائِبَاتٌ."] },
    { tr: "If the khabar is a <b>jāmid</b> noun (a non-derived noun, not an adjective), it does not agree with the mubtada’ in the plural.", ex: ["العُلَمَاءُ سِرَاجُ الأُمَّةِ.", "الجُمْلَةُ نَوْعَانِ."] },
    { tr: "If the mubtada’ is a <b>non-human plural</b>, the khabar is <b>feminine singular</b>.", ex: ["الأَشْجَارُ طَوِيلَةٌ.", "الكُتُبُ جَدِيدَةٌ."] },
    { tr: "The mubtada’ and the khabar are always <b>nominative</b> (marfū‘). In a singular noun, the sign of the nominative is the <b>ḍamma</b> (ـُ / ـٌ).", ex: ["المُعَلِّمُ رَحِيمٌ.", "الشَّجَرَةُ طَوِيلَةٌ."] }
  ],
  kaide: [
    "١ـ الجُمْلَةُ الاسْمِيَّةُ هِيَ الجُمْلَةُ الَّتِي تَبْدَأُ بِاسْمٍ. مِثَالٌ: المُعَلِّمُ رَحِيمٌ، الشَّجَرَةُ طَوِيلَةٌ.",
    "٢ـ تَتَكَوَّنُ الجُمْلَةُ الاسْمِيَّةُ مِنْ عُنْصُرَيْنِ: المُبْتَدَأِ وَالخَبَرِ.",
    "أ ـ المُبْتَدَأُ: اسْمٌ مَعْرِفَةٌ يَقَعُ فِي أَوَّلِ الجُمْلَةِ (المُعَلِّمُ رَحِيمٌ).",
    "ب ـ الخَبَرُ: اسْمٌ نَكِرَةٌ يَتِمُّ بِهِ مَعْنَى الجُمْلَةِ (المُعَلِّمُ رَحِيمٌ).",
    "٣ـ إِذَا كَانَ المُبْتَدَأُ عَاقِلًا، يَتَّفِقُ مَعَ الخَبَرِ فِي التَّذْكِيرِ وَالتَّأْنِيثِ، وَفِي الإِفْرَادِ وَالتَّثْنِيَةِ وَالجَمْعِ.",
    "٤ـ وَإِذَا كَانَ الخَبَرُ اسْمًا جَامِدًا، فَلَا يَتَّفِقُ المُبْتَدَأُ مَعَ الخَبَرِ فِي الجَمْعِ: العُلَمَاءُ سِرَاجُ الأُمَّةِ، الجُمْلَةُ نَوْعَانِ.",
    "٥ـ وَإِذَا كَانَ المُبْتَدَأُ جَمْعًا لِغَيْرِ عَاقِلٍ يَكُونُ الخَبَرُ مُفْرَدًا مُؤَنَّثًا: الأَشْجَارُ طَوِيلَةٌ، الكُتُبُ جَدِيدَةٌ.",
    "٦ـ المُبْتَدَأُ وَالخَبَرُ دَائِمًا مَرْفُوعَانِ، وَعَلَامَةُ الرَّفْعِ فِي الاسْمِ المُفْرَدِ الضَّمَّةُ."
  ],
  ex: [
    { type: "tag", roles: ["mub", "hab"], ar: "عَيِّنِ المُبْتَدَأَ وَالخَبَرَ فِي الجُمَلِ التَّالِيَةِ", tr: "Find the mubtada’ and the khabar: tap a word to choose its role.", items: [
      { c: "الكِتَابُ:mub / مُفِيدٌ:hab", tr: "The book is useful." },
      { c: "المَطَرُ:mub / نَازِلٌ:hab", tr: "The rain is falling." },
      { c: "الأَسْعَارُ:mub / مُنَاسِبَةٌ:hab", tr: "The prices are reasonable.", why: "<span class=\"ar\">الأَسْعَارُ</span> is a non-human plural, so the khabar is feminine singular." },
      { c: "الرِّيَاضَةُ:mub / صِحَّةٌ:hab", tr: "Exercise is health." },
      { c: "الحَدِيقَةُ:mub / وَاسِعَةٌ:hab", tr: "The garden is spacious." },
      { c: "الشَّارِعُ:mub / مُزْدَحِمٌ:hab", tr: "The street is crowded." },
      { c: "الكُلِّيَّةُ:mub / بَعِيدَةٌ:hab", tr: "The college is far away." },
      { c: "المَطَرُ:mub / غَزِيرٌ:hab", tr: "The rain is heavy." }
    ]},
    { type: "pick", fill: true, agree: true, ar: "عَيِّنِ الخَبَرَ المُنَاسِبَ ثُمَّ ضَعْهُ فِي الفَرَاغِ", tr: "Choose the right khabar and put it in the blank.", items: [
      { q: "السَّيَّارَةُ ___", o: ["حَدِيثَةٌ", "حَدِيثَتَانِ", "حَدِيثَاتٌ"], a: 0, tr: "The car is new." },
      { q: "مُحَمَّدٌ ___", o: ["طَوِيلَةٌ", "طَوِيلٌ", "طَوِيلَانِ"], a: 1, tr: "Muhammad is tall." },
      { q: "الطَّالِبَانِ ___", o: ["ذَكِيَّةٌ", "ذَكِيَّانِ", "ذَكِيَّاتٌ"], a: 1, tr: "The two students are clever." },
      { q: "المَدِينَةُ ___", o: ["وَاسِعَةٌ", "وَاسِعٌ", "وَاسِعَاتٌ"], a: 0, tr: "The city is spacious." },
      { q: "التِّلْمِيذَاتُ ___", o: ["مُجْتَهِدَةٌ", "مُجْتَهِدَتَانِ", "مُجْتَهِدَاتٌ"], a: 2, tr: "The female pupils are hard-working." },
      { q: "المُعَلِّمُونَ ___", o: ["نَشِيطٌ", "نَشِيطُونَ", "نَشِيطَاتٌ"], a: 1, tr: "The teachers are energetic." },
      { q: "العِمَارَةُ ___", o: ["عَالِيَةٌ", "عَالِيَتَانِ", "عَالِيَاتٌ"], a: 0, tr: "The building is tall." },
      { q: "البَنَاتُ ___", o: ["مُبْتَسِمَةٌ", "مُبْتَسِمٌ", "مُبْتَسِمَاتٌ"], a: 2, tr: "The girls are smiling." }
    ]},
    { type: "bank", ar: "ضَعِ المُبْتَدَأَ المُنَاسِبَ فِي الفَرَاغِ مِنَ الكَلِمَاتِ بَيْنَ القَوْسَيْنِ", tr: "First choose a mubtada’ below, then tap the blank it fits.",
      bank: ["فَاطِمَةُ", "الكُتُبُ", "فَاطِمَةُ وَخَدِيجَةُ", "الأَوْرَاقُ", "العَامِلَاتُ", "القَمَرُ", "المُوَظَّفُونَ", "الطَّالِبَانِ"], items: [
      { h: "سَاكِتُونَ", a: [6], tr: "The employees are silent." },
      { h: "مُجْتَهِدَانِ", a: [7], tr: "The two students are hard-working." },
      { h: "نَشِيطَةٌ", a: [0], tr: "Fatima is active." },
      { h: "بَدْرٌ", a: [5], tr: "The moon is full." },
      { h: "أَمِينَاتٌ", a: [4], tr: "The female workers are trustworthy." },
      { h: "كَثِيرَةٌ", a: [1, 3], tr: "The books / papers are many." },
      { h: "خَفِيفَةٌ", a: [3, 1], tr: "The papers / books are light." },
      { h: "غَائِبَتَانِ", a: [2], tr: "Fatima and Khadija are absent." }
    ]},
    { type: "agree", akil: true, ar: "حَوِّلِ المُبْتَدَأَ إِلَى المُثَنَّى وَالجَمْعِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Make the mubtada’ dual and plural, and make the khabar agree with it (human nouns).",
      exHtml: "<span class=\"ar\">المُدَرِّسُ مُشْفِقٌ ← المُدَرِّسَانِ مُشْفِقَانِ ← المُدَرِّسُونَ مُشْفِقُونَ</span><br><span class=\"ar\">المُدَرِّسَةُ مُشْفِقَةٌ ← المُدَرِّسَتَانِ مُشْفِقَتَانِ ← المُدَرِّسَاتُ مُشْفِقَاتٌ</span>", rows: [
      ["الحَاكِمُ عَادِلٌ", "الحَاكِمَانِ", "عَادِلَانِ", "الحُكَّامُ", "عَادِلُونَ", ["عَادِلٌ", "عَادِلُونَ"], ["عَادِلٌ", "عَادِلَةٌ"], ["The ruler is just.", "The two rulers are just.", "The rulers are just."]],
      ["الطِّفْلَةُ جَمِيلَةٌ", "الطِّفْلَتَانِ", "جَمِيلَتَانِ", "الطِّفْلَاتُ", "جَمِيلَاتٌ", ["جَمِيلَةٌ", "جَمِيلَانِ"], ["جَمِيلَةٌ", "جَمِيلُونَ"], ["The little girl is beautiful.", "The two little girls are beautiful.", "The little girls are beautiful."]],
      ["المُدِيرُ مَسْؤُولٌ", "المُدِيرَانِ", "مَسْؤُولَانِ", "المُدِيرُونَ", "مَسْؤُولُونَ", ["مَسْؤُولٌ", "مَسْؤُولَتَانِ"], ["مَسْؤُولٌ", "مَسْؤُولَةٌ"], ["The manager is responsible.", "The two managers are responsible.", "The managers are responsible."]],
      ["المُدِيرَةُ مَسْؤُولَةٌ", "المُدِيرَتَانِ", "مَسْؤُولَتَانِ", "المُدِيرَاتُ", "مَسْؤُولَاتٌ", ["مَسْؤُولَانِ", "مَسْؤُولَةٌ"], ["مَسْؤُولَةٌ", "مَسْؤُولُونَ"], ["The (female) manager is responsible.", "The two (female) managers are responsible.", "The (female) managers are responsible."]],
      ["العَالِمُ مُخْلِصٌ", "العَالِمَانِ", "مُخْلِصَانِ", "العُلَمَاءُ", "مُخْلِصُونَ", ["مُخْلِصٌ", "مُخْلِصُونَ"], ["مُخْلِصٌ", "مُخْلِصَةٌ"], ["The scholar is sincere.", "The two scholars are sincere.", "The scholars are sincere."]],
      ["الزَّوْجَةُ مُوَظَّفَةٌ", "الزَّوْجَتَانِ", "مُوَظَّفَتَانِ", "الزَّوْجَاتُ", "مُوَظَّفَاتٌ", ["مُوَظَّفَانِ", "مُوَظَّفَةٌ"], ["مُوَظَّفَةٌ", "مُوَظَّفُونَ"], ["The wife is an employee.", "The two wives are employees.", "The wives are employees."]],
      ["الطَّبِيبُ مَاهِرٌ", "الطَّبِيبَانِ", "مَاهِرَانِ", "الأَطِبَّاءُ", "مَاهِرُونَ", ["مَاهِرٌ", "مَاهِرُونَ"], ["مَاهِرٌ", "مَاهِرَةٌ"], ["The doctor is skilled.", "The two doctors are skilled.", "The doctors are skilled."]],
      ["التِّلْمِيذَةُ مُجْتَهِدَةٌ", "التِّلْمِيذَتَانِ", "مُجْتَهِدَتَانِ", "التِّلْمِيذَاتُ", "مُجْتَهِدَاتٌ", ["مُجْتَهِدَةٌ", "مُجْتَهِدَانِ"], ["مُجْتَهِدَةٌ", "مُجْتَهِدُونَ"], ["The female pupil is hard-working.", "The two female pupils are hard-working.", "The female pupils are hard-working."]]
    ]},
    { type: "agree", ar: "حَوِّلِ المُبْتَدَأَ إِلَى المُثَنَّى وَالجَمْعِ وَغَيِّرْ مَا يَلْزَمُ", tr: "Make the mubtada’ dual and plural (non-human nouns): in the plural the khabar is feminine singular.",
      exHtml: "<span class=\"ar\">الجَوَابُ سَهْلٌ ← الجَوَابَانِ سَهْلَانِ ← الأَجْوِبَةُ سَهْلَةٌ</span><br><span class=\"ar\">المَدْرَسَةُ وَاسِعَةٌ ← المَدْرَسَتَانِ وَاسِعَتَانِ ← المَدَارِسُ وَاسِعَةٌ</span>", rows: [
      ["البَيْتُ قَرِيبٌ", "البَيْتَانِ", "قَرِيبَانِ", "البُيُوتُ", "قَرِيبَةٌ", ["قَرِيبٌ", "قَرِيبُونَ"], ["قَرِيبُونَ", "قَرِيبٌ"], ["The house is near.", "The two houses are near.", "The houses are near."]],
      ["الحَدِيقَةُ جَمِيلَةٌ", "الحَدِيقَتَانِ", "جَمِيلَتَانِ", "الحَدَائِقُ", "جَمِيلَةٌ", ["جَمِيلَةٌ", "جَمِيلَانِ"], ["جَمِيلُونَ", "جَمِيلٌ"], ["The garden is beautiful.", "The two gardens are beautiful.", "The gardens are beautiful."]],
      ["الامْتِحَانُ صَعْبٌ", "الامْتِحَانَانِ", "صَعْبَانِ", "الامْتِحَانَاتُ", "صَعْبَةٌ", ["صَعْبٌ", "صَعْبُونَ"], ["صَعْبُونَ", "صَعْبٌ"], ["The exam is difficult.", "The two exams are difficult.", "The exams are difficult."]],
      ["الإِجَازَةُ طَوِيلَةٌ", "الإِجَازَتَانِ", "طَوِيلَتَانِ", "الإِجَازَاتُ", "طَوِيلَةٌ", ["طَوِيلَةٌ", "طَوِيلَانِ"], ["طَوِيلُونَ", "طَوِيلٌ"], ["The holiday is long.", "The two holidays are long.", "The holidays are long."]],
      ["السَّيَّارَةُ حَدِيثَةٌ", "السَّيَّارَتَانِ", "حَدِيثَتَانِ", "السَّيَّارَاتُ", "حَدِيثَةٌ", ["حَدِيثَةٌ", "حَدِيثَانِ"], ["حَدِيثُونَ", "حَدِيثٌ"], ["The car is new.", "The two cars are new.", "The cars are new."]],
      ["الأَسَدُ قَوِيٌّ", "الأَسَدَانِ", "قَوِيَّانِ", "الأُسُودُ", "قَوِيَّةٌ", ["قَوِيٌّ", "قَوِيُّونَ"], ["قَوِيُّونَ", "قَوِيٌّ"], ["The lion is strong.", "The two lions are strong.", "The lions are strong."]],
      ["الغُرْفَةُ ضَيِّقَةٌ", "الغُرْفَتَانِ", "ضَيِّقَتَانِ", "الغُرَفُ", "ضَيِّقَةٌ", ["ضَيِّقَةٌ", "ضَيِّقَانِ"], ["ضَيِّقُونَ", "ضَيِّقٌ"], ["The room is narrow.", "The two rooms are narrow.", "The rooms are narrow."]],
      ["الطَّائِرَةُ سَرِيعَةٌ", "الطَّائِرَتَانِ", "سَرِيعَتَانِ", "الطَّائِرَاتُ", "سَرِيعَةٌ", ["سَرِيعَةٌ", "سَرِيعَانِ"], ["سَرِيعُونَ", "سَرِيعٌ"], ["The plane is fast.", "The two planes are fast.", "The planes are fast."]]
    ]},
    { type: "combo", ar: "أَجِبْ عَنِ الأَسْئِلَةِ بِمُبْتَدَأٍ وَخَبَرٍ مَعَ ضَبْطِ آخِرِ كُلِّ كَلِمَةٍ", tr: "Answer the question with a mubtada’ and a khabar; choose the final vowel of each word (it changes each time you tap the word).",
      exHtml: "<span class=\"ar\">كَيْفَ الجَوَابُ؟ (سَهْل) ← الجَوَابُ سَهْلٌ</span>", items: [
      { q: "كَيْفَ البَيْتُ؟ (حَدِيث)", p: [{ o: ["البَيْتُ", "البَيْتَ", "البَيْتِ"] }, { o: ["حَدِيثٌ", "حَدِيثًا", "حَدِيثٍ"] }], ok: [[0, 0]], tr: "The house is new." },
      { q: "كَيْفَ الحَدِيقَةُ؟ (نَظِيفَة)", p: [{ o: ["الحَدِيقَةَ", "الحَدِيقَةُ", "الحَدِيقَةِ"] }, { o: ["نَظِيفَةً", "نَظِيفَةٍ", "نَظِيفَةٌ"] }], ok: [[1, 2]], tr: "The garden is clean." },
      { q: "كَيْفَ الامْتِحَانُ؟ (طَوِيل)", p: [{ o: ["الامْتِحَانِ", "الامْتِحَانُ", "الامْتِحَانَ"] }, { o: ["طَوِيلٌ", "طَوِيلًا", "طَوِيلٍ"] }], ok: [[1, 0]], tr: "The exam is long." },
      { q: "كَيْفَ الإِجَازَةُ؟ (قَصِيرَة)", p: [{ o: ["الإِجَازَةُ", "الإِجَازَةَ", "الإِجَازَةِ"] }, { o: ["قَصِيرَةٍ", "قَصِيرَةٌ", "قَصِيرَةً"] }], ok: [[0, 1]], tr: "The holiday is short." },
      { q: "كَيْفَ السَّيَّارَةُ؟ (قَدِيمَة)", p: [{ o: ["السَّيَّارَةَ", "السَّيَّارَةِ", "السَّيَّارَةُ"] }, { o: ["قَدِيمَةٌ", "قَدِيمَةً", "قَدِيمَةٍ"] }], ok: [[2, 0]], tr: "The car is old." },
      { q: "كَيْفَ الأَسَدُ؟ (سَرِيع)", p: [{ o: ["الأَسَدُ", "الأَسَدَ", "الأَسَدِ"] }, { o: ["سَرِيعًا", "سَرِيعٌ", "سَرِيعٍ"] }], ok: [[0, 1]], tr: "The lion is fast." },
      { q: "كَيْفَ الغُرْفَةُ؟ (صَغِيرَة)", p: [{ o: ["الغُرْفَةِ", "الغُرْفَةُ", "الغُرْفَةَ"] }, { o: ["صَغِيرَةٌ", "صَغِيرَةٍ", "صَغِيرَةً"] }], ok: [[1, 0]], tr: "The room is small." },
      { q: "كَيْفَ الطَّائِرَةُ؟ (كَبِيرَة)", p: [{ o: ["الطَّائِرَةُ", "الطَّائِرَةَ", "الطَّائِرَةِ"] }, { o: ["كَبِيرَةً", "كَبِيرَةٍ", "كَبِيرَةٌ"] }], ok: [[0, 2]], tr: "The plane is big." }
    ]},
    { type: "tag", roles: ["mub", "hab", "x"], reading: true, ar: "اقْرَأِ القِطْعَةَ وَعَيِّنِ المُبْتَدَأَ وَالخَبَرَ", tr: "Read the passage and find the mubtada’ and the khabar in its sentences.",
      title: "فَنَادِقُ إِسْطَنْبُولَ",
      text: "الفَنَادِقُ كَثِيرَةٌ فِي إِسْطَنْبُولَ. بَعْضُ الفَنَادِقِ قَرِيبَةٌ مِنَ المَطَارِ وَبَعْضُهَا بَعِيدَةٌ عَنْهُ. مُعْظَمُ الفَنَادِقِ فِي مِنْطَقَةِ تَقْسِيمٍ وَسُلْطَانِ أَحْمَدَ. بَعْضُ الفَنَادِقِ أَرْبَعَةُ نُجُومٍ وَبَعْضُهَا خَمْسَةُ نُجُومٍ. أَسْعَارُ الفَنَادِقِ ـ عُمُومًا ـ مُعْتَدِلَةٌ. الخِدْمَةُ مُمْتَازَةٌ فِي كُلِّ الفَنَادِقِ. المُوَظَّفُونَ كَثِيرُونَ، وَالمُوَظَّفَاتُ كَثِيرَاتٌ فِي هَذِهِ الفَنَادِقِ. المُوَظَّفُونَ نَشِيطُونَ، وَالمُوَظَّفَاتُ نَشِيطَاتٌ أَيْضًا. الغُرَفُ وَاسِعَةٌ، وَالصَّالَاتُ مَلِيئَةٌ بِالضُّيُوفِ. الطَّعَامُ التُّرْكِيُّ مَشْهُورٌ فِي هَذِهِ الفَنَادِقِ، وَهُوَ رَخِيصٌ وَلَذِيذٌ. وَالقَهْوَةُ التُّرْكِيَّةُ مَشْهُورَةٌ وَلَذِيذَةٌ أَيْضًا، وَهِيَ ـ دَائِمًا ـ مَوْجُودَةٌ، وَالمَشْرُوبَاتُ كَثِيرَةٌ فِي الصَّيْفِ وَالشِّتَاءِ. إِسْطَنْبُولُ مَدِينَةُ التَّارِيخِ وَمَدِينَةُ الجَمَالِ وَمَدِينَةُ الثَّقَافَةِ وَالحَضَارَةِ. الزِّيَارَةُ إِلَى إِسْطَنْبُولَ فُرْصَةٌ جَمِيلَةٌ فِي حَيَاةِ الإِنْسَانِ. وَأَجْمَلُ فَصْلٍ لِزِيَارَةِ إِسْطَنْبُولَ هُوَ فَصْلُ الرَّبِيعِ.",
      textTr: "There are many hotels in Istanbul. Some of the hotels are close to the airport and some are far from it. Most of the hotels are in the Taksim and Sultanahmet area. Some hotels have four stars and some have five stars. Hotel prices are generally reasonable. The service is excellent in all the hotels. There are many male and female staff in these hotels, and they are all hard-working. The rooms are spacious, and the halls are full of guests. Turkish food is famous in these hotels; it is cheap and delicious. Turkish coffee is also famous and delicious, and it is always available; there are plenty of drinks in summer and winter. Istanbul is the city of history, the city of beauty, and the city of culture and civilization. A visit to Istanbul is a wonderful opportunity in a person's life. The best season to visit Istanbul is spring.",
      items: [
      { c: "الفَنَادِقُ:mub / كَثِيرَةٌ:hab / فِي إِسْطَنْبُولَ:x", tr: "There are many hotels in Istanbul.", why: "A non-human plural: the khabar is feminine singular." },
      { c: "بَعْضُ الفَنَادِقِ:mub / قَرِيبَةٌ:hab / مِنَ المَطَارِ:x", tr: "Some of the hotels are close to the airport." },
      { c: "أَسْعَارُ الفَنَادِقِ:mub / مُعْتَدِلَةٌ:hab", tr: "Hotel prices are reasonable." },
      { c: "الخِدْمَةُ:mub / مُمْتَازَةٌ:hab / فِي كُلِّ الفَنَادِقِ:x", tr: "The service is excellent in all the hotels." },
      { c: "المُوَظَّفُونَ:mub / كَثِيرُونَ:hab", tr: "The male staff are many.", why: "A human plural: the khabar is plural too (ـُونَ)." },
      { c: "المُوَظَّفَاتُ:mub / نَشِيطَاتٌ:hab", tr: "The female staff are hard-working." },
      { c: "الغُرَفُ:mub / وَاسِعَةٌ:hab", tr: "The rooms are spacious.", why: "<span class=\"ar\">الغُرَفُ</span> is a non-human plural: <span class=\"ar\">وَاسِعَةٌ</span> is feminine singular." },
      { c: "الطَّعَامُ التُّرْكِيُّ:mub / مَشْهُورٌ:hab / فِي هَذِهِ الفَنَادِقِ:x", tr: "Turkish food is famous in these hotels." },
      { c: "القَهْوَةُ التُّرْكِيَّةُ:mub / مَشْهُورَةٌ:hab", tr: "Turkish coffee is famous." },
      { c: "إِسْطَنْبُولُ:mub / مَدِينَةُ التَّارِيخِ:hab", tr: "Istanbul is the city of history.", why: "The khabar is an iḍāfa (genitive construct): <span class=\"ar\">مَدِينَةُ التَّارِيخِ</span>." },
      { c: "الزِّيَارَةُ إِلَى إِسْطَنْبُولَ:mub / فُرْصَةٌ جَمِيلَةٌ:hab / فِي حَيَاةِ الإِنْسَانِ:x", tr: "A visit to Istanbul is a wonderful opportunity in a person's life." }
