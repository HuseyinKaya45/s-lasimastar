// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ٢ (الوَحْدَتانِ ٣ - ٤) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "3–4", ar: "اخْتَبِرْ نَفْسَكَ ٢", tr: "Test yourself 2 · Units 3 and 4", pfx: "k2s2:", sinavYok: true, sonuc: true,
  giris: "The self-assessment test after Units 3 and 4 of the book: reading, structures and rules, vocabulary, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Two texts; 15 questions", bloklar: [
 { t: "metin", baslik: "First text", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["تَخْرُجُ زَوْجَتي كُلَّ يَوْمٍ في الصَّباحِ، وَلا تَرْجِعُ إِلّا في السّاعَةِ الخامِسَةِ مَساءً، هذِهِ مُشْكِلَتي مَعَها.", "My wife goes out every morning and returns only at five in the evening; this is my problem with her."],
  ["نَحْنُ نَتَناوَلُ الوَجَباتِ خارِجَ البَيْتِ؛ لِأَنَّ زَوْجَتي لا تَجِدُ وَقْتًا لِإِعْدادِ الطَّعامِ، وَأَنا أَغْسِلُ مَلابِسي وَمَلابِسَ ابْنِنا وَحْدي، وَأُنَظِّفُ البَيْتَ أَحْيانًا؛", "We eat meals outside the house; because my wife cannot find time to prepare food. I wash my own laundry and our son's by myself, and sometimes I clean the house too;"],
  ["وَلا أَجِدُ وَقْتًا لِلْحَديثِ مَعَها في أُمورِ البَيْتِ وَالأُسْرَةِ؛ لِأَنَّها عِنْدَما تَرْجِعُ تَكونُ مُتْعَبَةً، ثُمَّ أَخْرُجُ لِلْمُسْتَشْفى مَرَّةً ثانِيَةً بَعْدَ نِصْفِ ساعَةٍ مِنْ حُضورِها.", "I cannot find time to talk with her about household and family matters; because when she returns she is tired; then half an hour after she arrives I go out again to the hospital."],
  ["أَمّا في عُطْلَةِ الأُسْبوعِ، فَهِيَ تُحِبُّ أَنْ تَزورَ الأَهْلَ وَالصَّديقاتِ، أَوْ تَذْهَبَ إِلى السّوقِ، أَوْ تُحَضِّرَ دُروسَ الأُسْبوعِ القادِمِ.", "At the weekend, however, she likes to visit her relatives and friends, go to the market, or prepare next week's lessons."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["تَعْمَلُ هذِهِ الزَّوْجَةُ …", "مُدَرِّسَةً", ["مُوَظَّفَةً", "مُمَرِّضَةً"], "This woman works as … .", "«تُحَضِّرُ دُروسَ الأُسْبوعِ القادِمِ»"],
  ["يَعْمَلُ هذا الزَّوْجُ …", "طَبيبًا", ["طَيّارًا", "مُدَرِّسًا"], "This husband works as … .", "«أَخْرُجُ لِلْمُسْتَشْفى مَرَّةً ثانِيَةً»"],
  ["يَعْمَلُ الزَّوْجُ في …", "الصَّباحِ وَالمَساءِ", ["الصَّباحِ", "المَساءِ"], "The husband works … .", "In the evening he goes out to the hospital «مَرَّةً ثانِيَةً» (a second time)."],
  ["تَعودُ الزَّوْجَةُ إِلى البَيْتِ …", "بَعْدَ العَصْرِ", ["بَعْدَ الظُّهْرِ", "بَعْدَ المَغْرِبِ"], "The woman returns home … .", "At five o'clock."],
  ["لا تَتَناوَلُ الأُسْرَةُ الوَجَباتِ في البَيْتِ؛ لِأَنَّ …", "الزَّوْجَةَ لا تَسْتَطيعُ إِعْدادَ الطَّعامِ", ["الطَّعامَ جَيِّدٌ في الخارِجِ", "الزَّوْجَةَ مَشْغولَةٌ"], "The family does not eat meals at home; because … .", "«لِأَنَّ زَوْجَتي لا تَجِدُ وَقْتًا لِإِعْدادِ الطَّعامِ»"],
  ["يُنَظِّفُ الزَّوْجُ البَيْتَ …", "أَحْيانًا", ["دائِمًا", "كُلَّ يَوْمٍ"], "The husband cleans the house … ."],
  ["يَرْجِعُ الزَّوْجُ إِلى عَمَلِهِ السّاعَةَ …", "الخامِسَةَ وَالنِّصْفَ", ["الرّابِعَةَ وَالنِّصْفَ", "الخامِسَةَ"], "The husband returns to his work at … o'clock.", "His wife comes at five; he goes out half an hour later."],
  ["ما الشَّيْءُ الَّذي لا تَفْعَلُهُ الزَّوْجَةُ؟", "إِعْدادُ الطَّعامِ", ["زِيارَةُ الأَهْلِ", "الخُروجُ مِنَ البَيْتِ"], "What is it that the woman does not do?"],
  ["ما الشَّيْءُ الَّذي لا يَفْعَلُهُ الزَّوْجُ؟", "الحَديثُ مَعَ زَوْجَتِهِ", ["تَناوُلُ الوَجَباتِ خارِجَ البَيْتِ", "نَظافَةُ البَيْتِ"], "What is it that the husband does not do?"],
  ["تَتَكَوَّنُ هذِهِ الأُسْرَةُ مِنْ …", "زَوْجٍ وَزَوْجَةٍ وَابْنٍ واحِدٍ", ["زَوْجٍ وَزَوْجَةٍ فَقَطْ", "زَوْجٍ وَزَوْجَةٍ وَابْنَةٍ واحِدَةٍ"], "This family consists of … .", "«مَلابِسَ ابْنِنا»"]] },
 { t: "metin", baslik: "Second text", ar: "اقْرَأْ", paragraf: [[
  ["تَزْدادُ مُشْكِلاتُ المُدُنِ الكَبيرَةِ كُلَّ يَوْمٍ. يَسْتَيْقِظُ النّاسُ وَيَنامونَ في هذِهِ المُدُنِ، وَهُمْ يُواجِهونَ مُشْكِلاتِ التَّلَوُّثِ وَالازْدِحامِ، وَازْدِيادِ نِسْبَةِ الجَريمَةِ وَالمُخَدِّراتِ.", "The problems of big cities increase every day. People in these cities wake and sleep with the problems of pollution, crowding, rising crime and the rate of drugs."],
  ["وَتَكْثُرُ في هذِهِ المُدُنِ المَصانِعُ وَالشَّرِكاتُ وَالمَدارِسُ؛ لِهذا يَزْدادُ عَدَدُ سُكّانِ هذِهِ المُدُنِ، فَيُهاجِرُ إِلَيْها سُكّانُ الرّيفِ لِلْعَمَلِ وَالدِّراسَةِ.", "In these cities factories, companies and schools are many; so their population increases; villagers migrate there to work and study."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["النّاسُ في المُدُنِ قَلِقونَ مِنَ …", "الجَريمَةِ وَالتَّلَوُّثِ", ["المُخَدِّراتِ وَالمَصانِعِ", "الهِجْرَةِ وَالازْدِحامِ"], "People in the cities are worried about … ."],
  ["ما الشَّيْءُ الَّذي لا يوجَدُ في المُدُنِ؟", "الهُدوءُ", ["التَّلَوُّثُ", "الازْدِحامُ"], "What is it that is not found in the cities?"],
  ["مُشْكِلاتُ المُدُنِ …", "تَزْدادُ", ["تَنْقُصُ", "قَليلَةٌ"], "The problems of the cities …"],
  ["لا يُهاجِرُ أَهْلُ الرّيفِ إِلى المَدينَةِ لِـ…", "لِلْعُطْلَةِ", ["لِلْعَمَلِ", "لِلدِّراسَةِ"], "Villagers do not migrate to the city for … ."],
  ["مَوْضوعُ هذِهِ الفِقْرَةِ هُوَ …", "مُشْكِلاتُ المُدُنِ", ["الجَريمَةُ وَالمُخَدِّراتُ", "النّاسُ وَالازْدِحامُ"], "The subject of this paragraph is … ."]] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Structures and rules", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Structures and rules", ozet: "Correct sentence, subject-predicate, nominal and verbal sentence", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الخَطَإِ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "جاءَتِ الزَّوْجَةُ.", ["جاءَ الزَّوْجَةُ."], "Which is correct?", "Feminine subject: تْ is added to the verb."],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "سافَرَ المُدَرِّسُ إِلى مَكَّةَ.", ["سافَرَتِ المُدَرِّسُ إِلى مَكَّةَ."], "Which is correct?", "Masculine subject: تْ is not added to the verb."],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "الطَّبيبَةُ فَحَصَتِ المَريضَةَ.", ["الطَّبيبَةُ فَحَصَ المَريضَةَ."], "Which is correct?"],
  ["(٤) أَيُّهُما صَحيحَةٌ؟", "هُنَّ طالِباتٌ.", ["هُمْ طالِباتٌ."], "Which is correct?", "The pronoun for a group of women: هُنَّ."]] },
 { t: "secim", ar: "ضَعْ خَطًّا تَحْتَ المُبْتَدَإِ، وَخَطَّيْنِ تَحْتَ الخَبَرِ", aciklama: "Choose the predicate in each sentence.", ogeler: [
  ["(٥) مُحَمَّدٌ مَريضٌ في المُسْتَشْفى. — ما الخَبَرُ؟", "مَريضٌ", ["مُحَمَّدٌ", "المُسْتَشْفى"], "Muhammad is ill in the hospital. (Subject: مُحَمَّدٌ)"],
  ["(٦) القِراءَةُ مُفيدَةٌ في كُلِّ وَقْتٍ. — ما الخَبَرُ؟", "مُفيدَةٌ", ["القِراءَةُ", "وَقْتٍ"], "Reading is always useful. (Subject: القِراءَةُ)"],
  ["(٧) أَنْتَ قَلِقٌ هذِهِ الأَيّامَ. — ما الخَبَرُ؟", "قَلِقٌ", ["أَنْتَ", "الأَيّامَ"], "You are worried these days. (Subject: أَنْتَ)"],
  ["(٨) المُدَرِّسُ قادِمٌ اليَوْمَ. — ما الخَبَرُ؟", "قادِمٌ", ["المُدَرِّسُ", "اليَوْمَ"], "The teacher is coming today. (Subject: المُدَرِّسُ)"]] },
 { t: "siniflandir", ar: "ضَعْ كُلَّ جُمْلَةٍ في مَكانِها المُناسِبِ مِنَ الجَدْوَلِ", soru: "Nominal sentence or verbal sentence?", gruplar: ["جُمْلَةٌ اسْمِيَّةٌ", "جُمْلَةٌ فِعْلِيَّةٌ"], ogeler: [
  ["القُرْآنُ كِتابُ اللهِ", 0], ["نَذْهَبُ إِلى المَسْجِدِ", 1], ["اللهُ رَبّي", 0], ["شَفاكَ اللهُ", 1], ["أَنْتَ قَلِقٌ", 0], ["تَزَوَّجَ أَحْمَدُ فاطِمَةَ", 1]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Antonyms, plurals, prepositions", bloklar: [
 { t: "esle", ar: "صِلْ بَيْنَ الكَلِمَتَيْنِ المُتَضادَّتَيْنِ في القائِمَتَيْنِ", ciftler: [
  ["مَدينَةٌ", "ريفٌ", "city / countryside"], ["نَقَصَ", "زادَ", "decreased / increased"], ["جَميلٌ", "قَبيحٌ", "beautiful / ugly"], ["طَلاقٌ", "زَواجٌ", "divorce / marriage"], ["ابْنٌ", "بِنْتٌ", "son / daughter"], ["غَنِيٌّ", "فَقيرٌ", "rich / poor"]] },
 { t: "esle", ar: "هاتِ جَمْعَ كُلٍّ مِمّا يَأْتي", ciftler: [
  ["المِلْيونُ", "المَلايينُ", "million"], ["المَكانُ", "الأَماكِنُ", "place"], ["الإِنْسانُ", "النّاسُ", "person, human"], ["المَدْرَسَةُ", "المَدارِسُ", "school"], ["المَرْأَةُ", "النِّساءُ", "woman"], ["المَسْجِدُ", "المَساجِدُ", "mosque"]] },
 { t: "bosluk", ar: "امْلَأِ الفَراغَ بِكَلِمَةٍ مِنَ الكَلِماتِ التّالِيَةِ", kutu: ["إِلى", "في", "مَعَ", "عَنْ", "بِـ", "الآنَ", "عَلى", "أَنْ"], ogeler: [
  ["أَسْكُنُ ___ شارِعِ المَطارِ.", "في", null, "I live on Airport Street."], ["ماذا تَفْعَلُ ___؟", "الآنَ", null, "What are you doing now?"], ["أُريدُ ___ أُسافِرَ.", "أَنْ", null, "I want to travel."], ["عادَ صَديقي ___ البَيْتِ مُتَأَخِّرًا.", "إِلى", null, "My friend returned home late."],
  ["الزَّوْجُ يَهْتَمُّ ___زَوْجَتِهِ.", "بِـ", null, "The husband takes care of his wife."], ["الجامِعَةُ بَعيدَةٌ ___ القَرْيَةِ.", "عَنْ", null, "The university is far from the village."], ["رَجَعَ ابْني ___ صَديقِهِ.", "مَعَ", null, "My son returned with his friend."], ["الحَمْدُ لِلّهِ ___ السَّلامَةِ.", "عَلى", null, "Get well soon (thanks be to God for safety)."]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Punctuation marks", bloklar: [
 { t: "bosluk", ar: "ضَعْ عَلاماتِ التَّرْقيمِ في مَكانِها المُناسِبِ (يُمْكِنُ أَنْ تَسْتَخْدِمَ العَلامَةَ أَكْثَرَ مِنْ مَرَّةٍ)", aciklama: "Marks: ؟ . « » – – : ،", ogeler: [
  ["لا إِلهَ إِلّا اللهُ ___", ".", ["؟", "،"], "There is no god but God."], ["هَلْ أَتاكَ حَديثُ ضَيْفِ إِبْراهيمَ ___", "؟", [".", ":"], "Has the news of Ibrāhīm's guests come to you?"],
  ["قالَ الرَّسولُ ﷺ ___ «الكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ».", ":", ["؟", "،"], "The Messenger of God said: “A good word is charity.”"], ["قالَ عُمَرُ بْنُ الخَطّابِ – رَضِيَ اللهُ عَنْهُ – ___ «عَلِّموا أَوْلادَكُمُ السِّباحَةَ وَالرِّمايَةَ وَرُكوبَ الخَيْلِ».", ":", ["؟", "،"], "ʿUmar ibn al-Khaṭṭāb said: “Teach your children swimming, archery and horse riding.”"],
  ["مَنْ حَجَّ هذا العامَ ___", "؟", [".", "،"], "Who went on pilgrimage this year?"], ["في السَّنَةِ أَرْبَعَةُ فُصولٍ: الصَّيْفُ، وَالشِّتاءُ، وَالرَّبيعُ ___ وَالخَريفُ.", "،", [".", "؟"], "There are four seasons in a year: summer, winter, spring and autumn."]] }
]}
];
var KELIME = [];
