// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ٦ (الوَحْدَتانِ ١١ - ١٢) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "11–12", ar: "اخْتَبِرْ نَفْسَكَ ٦", tr: "Test yourself 6 · Units 11 and 12", pfx: "k2s6:", sinavYok: true, sonuc: true,
  giris: "The self-assessment test after Units 11 and 12 of the book: reading, structures and rules, vocabulary, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Three texts; 15 questions", bloklar: [
 { t: "metin", baslik: "First text", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["«لا تَنْسَ أَنَّ ابْنَنا الآنَ في مَرْحَلَةِ المُراهَقَةِ، وَلا بُدَّ أَنْ تُعامِلَهُ بِحِكْمَةٍ، وَلا تَنْسَ أَنَّ أَخي مُحَمَّدًا نَصَحَكَ بِأَنْ تَتَحاوَرَ مَعَ عَدْنانَ، وَأَنْ تَحْتَرِمَ آراءَهُ».", "“Do not forget that our son is now in adolescence; you must treat him with wisdom. Do not forget either that my brother Muhammad advised you to talk and discuss with ʿAdnān and to respect his views.”"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["المُتَحَدِّثُ …", "زَوْجَةٌ", ["زَوْجٌ", "صَديقٌ"], "The speaker is … .", "The one who says “our son” and “my brother Muhammad advised you” is the mother, speaking to the father."],
  ["الابْنُ عُمْرُهُ …", "سِتَّ عَشْرَةَ سَنَةً", ["ثَلاثونَ سَنَةً", "عَشْرُ سَنَواتٍ"], "The son's age is … .", "The age of adolescence."],
  ["مَنْ نَصَحَ الأَبَ بِأَنْ يَتَحاوَرَ مَعَ وَلَدِهِ؟", "الخالُ", ["الزَّوْجَةُ", "عَدْنانُ"], "Who advised the father to talk with his son?", "The mother's brother is the child's maternal uncle (خال)."]] },
 { t: "metin", baslik: "Second text", ar: "اقْرَأْ", paragraf: [[
  ["انْقادَتِ الشُّعوبُ إِلى هذا الدّينِ؛ لِأَنَّهُ يَدْعو إِلى رَفْعِ الظُّلْمِ عَنِ الأَفْرادِ وَالمُجْتَمَعاتِ، وَدَخَلوا فيهِ رَغْبَةً لا رَهْبَةً، فَوَجَدوا فيهِ المُساواةَ بَيْنَ النّاسِ جَميعًا، وَإِنِ اخْتَلَفَتْ أَلْوانُهُمْ وَلُغاتُهُمْ وَبيئاتُهُمْ.", "Peoples submitted to this religion; because it calls for the removal of injustice from individuals and societies. They entered it willingly, not out of fear, and found in it equality among all people, though their colours, languages and environments differ."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["يَدْعو هذا الدّينُ إِلى مُحارَبَةِ …", "الظُّلْمِ", ["العَدْلِ", "المُساواةِ"], "This religion calls for the fight against … ."],
  ["دَخَلَ النّاسُ في هذا الدّينِ …", "حُبًّا فيهِ", ["خَوْفًا مِنْهُ", "رَهْبَةً مِنْهُ"], "People entered this religion … .", "رَغْبَةً لا رَهْبَةً: willingly, not out of fear."],
  ["أَهْلُ هذا الدّينِ تَخْتَلِفُ …", "أَلْوانُهُمْ وَلُغاتُهُمْ وَأَماكِنُهُمْ", ["لُغاتُهُمْ وَبيئاتُهُمْ وَرِسالاتُهُمْ", "أَلْوانُهُمْ وَلُغاتُهُمْ وَتَعْليمُهُمْ"], "The adherents of this religion differ in their … .", "The text's بيئاتُهُمْ (their environments) is expressed here by أَماكِنُهُمْ (their places)."],
  ["في هذا الدّينِ مُساواةٌ بَيْنَ …", "الإِنْسانِ وَالإِنْسانِ", ["السُّكّانِ وَالشُّعوبِ", "الأَصْحابِ وَالأَصْدِقاءِ"], "In this religion there is equality among … ."]] },
 { t: "metin", baslik: "The third text", ar: "اقْرَأْ ما يَلي، ثُمَّ ضَعْ عَلامَةَ (✓) أَوْ (✗)", paragraf: [
  [["في العَصْرِ الحَديثِ، زادَ عَدَدُ المَراكِزِ الإِسْلامِيَّةِ وَالمَساجِدِ في المُدُنِ الأوروبِّيَّةِ؛ فَقَدْ زادَ عَدَدُ المُسْلِمينَ، وَرَجَعوا إِلى دينِهِمْ مَرَّةً أُخْرى، بَعْدَ أَنْ هَجَروهُ زَمانًا طَويلًا. احْتاجَ المُسْلِمونَ في كَثيرٍ مِنَ الدُّوَلِ، إِلى أَنْ يَعْرِفوا كَثيرًا عَنْ دينِهِمْ، وَأَنْ يَفْهَموهُ فَهْمًا صَحيحًا. وَلِيَفْهَموا القُرْآنَ جَيِّدًا، رَغِبوا في تَعَلُّمِ لُغَةِ القُرْآنِ.", "In the modern age the number of Islamic centres and mosques in European cities has increased; because the number of Muslims has increased and they have returned to their religion after abandoning it for a long time. Muslims in many countries needed to know their religion better and to understand it correctly. To understand the Qur'an well they also wanted to learn the language of the Qur'an."]],
  [["في مَدينَةِ لَنْدَنَ مَرْكَزٌ إِسْلامِيٌّ، فيهِ مَسْجِدٌ كَبيرٌ، وَفيهِ أَيْضًا مَكْتَبَةٌ كَبيرَةٌ يَزورُها كُلُّ مَنْ يَرْغَبُ مِنَ المُسْلِمينَ وَغَيْرِ المُسْلِمينَ. وَيَقومُ هذا المَرْكَزُ بِتَعْليمِ اللُّغَةِ العَرَبِيَّةِ لِأَبْناءِ المُسْلِمينَ مِنَ المُواطِنينَ وَالمُهاجِرينَ.", "In the city of London there is an Islamic centre; in it there is a large mosque and also a large library visited by everyone who wishes, Muslim or not. This centre teaches Arabic to the children of native and immigrant Muslims."]],
  [["في هذِهِ المَراكِزِ، يَجْتَمِعُ المُسْلِمونَ في أَيّامِ الجُمَعِ، وَفي عيدِ الفِطْرِ، وَعيدِ الأَضْحى وَيَتَعارَفونَ، وَيَتَحَدَّثونَ في أُمورِ الحَياةِ وَالدّينِ، وَالأَحْوالِ العامَّةِ وَالخاصَّةِ، وَيَسْتَمِعونَ إِلى المُحاضَراتِ وَالنَّدَواتِ.", "In these centres Muslims gather on Fridays and on the festivals of Ramadan and sacrifice, get to know one another, talk about matters of life and religion, general and private situations, and listen to lectures and seminars."]]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗)", ogeler: [
  ["زادَ عَدَدُ المُسْلِمينَ في أوروبّا.", true, "", "The number of Muslims in Europe has increased."],
  ["تَرَكَ المُسْلِمونَ دينَهُمْ مُدَّةً مِنَ الزَّمانِ.", true, "", "The Muslims abandoned their religion for a while."],
  ["رَغِبَ المُسْلِمونَ في تَعَلُّمِ اللُّغاتِ لِيَفْهَموا القُرْآنَ.", false, "رَغِبَ المُسْلِمونَ في تَعَلُّمِ لُغَةِ القُرْآنِ لِيَفْهَموهُ.", "Muslims wanted to learn languages in order to understand the Qur'an."],
  ["لا يُمْنَعُ غَيْرُ المُسْلِمينَ مِنْ دُخولِ مَكْتَبَةِ المَرْكَزِ.", true, "", "Non-Muslims are not prevented from entering the centre's library."],
  ["يَتَحَدَّثُ المُسْلِمونَ في أُمورِ السِّياسَةِ في العيدِ.", false, "يَتَحَدَّثُ المُسْلِمونَ في أُمورِ الحَياةِ وَالدّينِ في العيدِ.", "Muslims talk politics on the festival."],
  ["هُناكَ نَدَواتٌ في المَراكِزِ في أَيّامِ العيدِ.", true, "", "On the festival days there are seminars at the centres."],
  ["في مَسْجِدِ لَنْدَنَ مَرْكَزٌ إِسْلامِيٌّ كَبيرٌ.", false, "في مَرْكَزِ لَنْدَنَ الإِسْلامِيِّ مَسْجِدٌ كَبيرٌ.", "There is a large Islamic centre in the London mosque."],
  ["في مَرْكَزِ لَنْدَنَ الإِسْلامِيِّ يَتَعَلَّمُ الطُّلّابُ اللُّغَةَ العَرَبِيَّةَ.", true, "", "In the London Islamic centre students learn Arabic."]] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Structures and rules", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Structures and rules", ozet: "Correct sentence, error correction, attached accusative pronouns", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الجُمْلَةِ الَّتي فيها خَطَأٌ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "سَأُقيمُ هُنا ثَلاثَةَ أَشْهُرٍ.", ["سَأُقيمُ هُنا ثَلاثَةَ شَهْرٍ."], "Which is correct?", "The specification of the numbers 3-10 is plural and genitive."],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "الطّالِباتُ ناجِحاتٌ، إِنْ شاءَ اللهُ.", ["الطّالِباتُ ناجِحَةٌ، إِنْ شاءَ اللهُ."], "Which is correct?", "The predicate agrees with the subject in number."],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "لي ثَلاثَةُ أَبْناءٍ.", ["لي ثَلاثُ أَبْناءٍ."], "Which is correct?", "The number (3-10) is in opposite gender to the singular of the specification: اِبْنٌ is masculine ← ثَلاثَةُ."],
  ["(٤) أَيُّهُما صَحيحَةٌ؟", "لَمْ أُصَلِّ في البَيْتِ.", ["لَمْ أُصَلّي في البَيْتِ."], "Which is correct?", "When a verb with a weak ending is jussive, the weak letter drops."]] },
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Choose the correct form of the underlined word.", ogeler: [
  ["(١) إِنَّ [[مُحَمَّدٌ]] طالِبٌ جَديدٌ.", "مُحَمَّدًا", ["مُحَمَّدٍ", "مُحَمَّدُ"], "Muhammad is a new student.", "إِنَّ requires its noun to be accusative."],
  ["(٢) هذا شابٌّ [[القَوِيُّ]].", "قَوِيٌّ", ["القَوِيَّ", "قَوِيًّا"], "This is a strong young man.", "An indefinite described noun takes an indefinite adjective."],
  ["(٣) عِنْدَكُما ما [[تُريدونَ]].", "تُريدانِ", ["تُريدينَ", "تُريدُ"], "What you (two) want is with you.", "كُما: dual."],
  ["(٤) يا زَيْنَبُ هَلْ [[فَحَصَتْكُما]] الطَّبيبَةُ؟", "فَحَصَتْكِ", ["فَحَصَتْكَ", "فَحَصَتْكُنَّ"], "Zaynab, did the doctor examine you?", "Addressing a single woman: كِ."]] },
 { t: "siniflandir", ar: "ضَعْ ضَميرَ النَّصْبِ المُتَّصِلَ في مَكانِهِ المُناسِبِ مِنَ الجَدْوَلِ", soru: "Which is the attached accusative pronoun?", gruplar: ["ضَميرُ المُتَكَلِّمِ", "ضَميرُ المُخاطَبِ", "ضَميرُ الغائِبِ"], ogeler: [
  ["فَحَصَني", 0], ["أَخَذَكَ", 1], ["أَعارَها", 2], ["أَسْعَدَنا", 0], ["أَعَدَّهُنَّ", 2], ["أَفْسَدَكُما", 1], ["أَنْشَأَهُما", 2], ["اتَّبَعَني", 0], ["احْتَرَمَكُنَّ", 1],
  ["اسْتَعْمَلَهُمْ", 2], ["بَعَثَني", 0], ["حَمَلَنا", 0], ["حارَبَكَ", 1], ["حاوَرَهُ", 2], ["جَزاكِ", 1], ["قابَلَني", 0], ["تَرَكْتُها", 2], ["زادَكُمْ", 1]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Singular-plural, synonyms, antonyms", bloklar: [
 { t: "esle", ar: "صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", ciftler: [
  ["حاسوبٌ", "حَواسيبُ", "computer"], ["دَوْلَةٌ", "دُوَلٌ", "state"], ["رِسالَةٌ", "رَسائِلُ", "letter, message"], ["شابٌّ", "شَبابٌ", "young man"], ["سَبَبٌ", "أَسْبابٌ", "cause"], ["فائِدَةٌ", "فَوائِدُ", "benefit"], ["بيئَةٌ", "بيئاتٌ", "circumference"], ["مَزْرَعَةٌ", "مَزارِعُ", "farm"]] },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ لَهُما مَعْنًى واحِدٌ", ciftler: [
  ["النّاسُ", "البَشَرُ", "people"], ["الرُّسُلُ", "المُرْسَلونَ", "messengers"], ["بَعَثَ", "أَرْسَلَ", "sent"], ["أَبي", "والِدي", "my father"], ["تَلاميذُ", "طُلّابٌ", "students"], ["أَصْحابٌ", "أَصْدِقاءُ", "companions"]] },
 { t: "bosluk", ar: "أَكْمِلْ بِوَضْعِ المُقابِلِ (المُضادِّ) لِلْكَلِمَةِ الَّتي تَحْتَها خَطٌّ", ogeler: [
  ["[[وَجَدْتُ]] الحَقيبَةَ، وَ___ المِفْتاحَ.", "أَضَعْتُ", ["أَخَذْتُ", "فَتَحْتُ"], "I found the bag, I lost the key."],
  ["___ أَخي قَبْلَ أَنْ [[يَخْرُجَ]] صَديقي.", "دَخَلَ", ["نامَ", "جَلَسَ"], "My brother came in before my friend went out."],
  ["لَدَيَّ [[أَكْثَرُ]] مِنْ خَمْسينَ رِيالًا، وَلَدَيْكَ ___ مِنْ ثَلاثينَ دينارًا.", "أَقَلُّ", ["أَكْبَرُ", "أَحْسَنُ"], "I have more than fifty riyals, you have less than thirty dinars."],
  ["قَرَأْتُ الصُّحُفَ [[الأَجْنَبِيَّةَ]]، وَالصُّحُفَ ___.", "العَرَبِيَّةَ", ["اليَوْمِيَّةَ", "الكَثيرَةَ"], "I read the foreign newspapers and the Arabic newspapers.", "Local newspapers (المَحَلِّيَّةَ) can also be accepted as correct."],
  ["الإِسْلامُ يَدْعو إِلى [[العَدْلِ]]، وَلا يَدْعو إِلى ___.", "الظُّلْمِ", ["المُساواةِ", "الحَقِّ"], "Islam calls to justice, not to injustice."],
  ["أَنا [[سَمينٌ]] جِدًّا، وَأُريدُ أَنْ أَكونَ ___.", "نَحيفًا", ["طَويلًا", "قَوِيًّا"], "I am very fat, I want to be thin."]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Spelling mistakes and forming questions", bloklar: [
 { t: "secim", ar: "الكَلِماتُ الَّتي تَحْتَها خَطٌّ كُتِبَتْ خَطَأً، فَاكْتُبْها صَحيحَةً", aciklama: "Choose the correct spelling.", ogeler: [
  ["(١) أُريدُ [[ماءًا]].", "ماءً", ["ماءًا", "ماآ"], "I want water.", "In a word ending in hamza the alif of the accusative tanwīn is not written."],
  ["(٢) المُسْلِمونَ [[صَلّو]] صَلاةَ العيدِ.", "صَلَّوْا", ["صَلّو", "صَلّوا"], "The Muslims prayed the festival prayer.", "After the plural wāw an alif is written."],
  ["(٣) الإِسْلامُ [[يَدْعوا]] إِلى الحَقِّ.", "يَدْعو", ["يَدْعوا", "يَدْعُ"], "Islam calls to the truth.", "After the wāw that is part of the verb's root an alif is not written."],
  ["(٤) [[هاذا]] كِتابٌ جَديدٌ في الهَنْدَسَةِ.", "هذا", ["هاذا", "هَاذَى"], "This is a new book about engineering.", "The alif that is read but not written."],
  ["(٥) المُسافِرونَ لَمْ [[يَرْجِعو]].", "يَرْجِعوا", ["يَرْجِعو", "يَرْجِعونَ"], "The travellers did not return.", "After the plural wāw an alif is written."],
  ["(٦) [[يَشْكوا]] الشَّبابُ مِنَ المُجْتَمَعِ.", "يَشْكو", ["يَشْكوا", "يَشْكُ"], "Young people are complaining about society.", "After the wāw that is part of the verb's root an alif is not written."],
  ["(٧) غَيِّرْ أُسْلوبَكَ مَعَ [[اِينِكَ]].", "ابْنِكَ", ["اِينِكَ", "إِبْنِكَ"], "Change your attitude toward your son.", "اِبْن: connecting hamza, a single dot below (ب)."],
  ["(٨) هذِهِ [[سَيّاراةٌ]] يابانِيَّةٌ.", "سَيّارَةٌ", ["سَيّاراةٌ", "سَيّارَتٌ"], "This is a Japanese car."]] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ، لِتُصْبِحَ جُمَلًا اسْتِفْهامِيَّةً", aciklama: "(١) أَفْهَمُ - كَيْفَ - الإِسْلامَ - صَحيحًا - فَهْمًا", ogeler: ["كَيْفَ", "أَفْهَمُ", "الإِسْلامَ", "فَهْمًا", "صَحيحًا؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٢) الإِسْلامُ - دينُ - هَلْ - وَحْدَهُمْ - العَرَبِ", ogeler: ["هَلْ", "الإِسْلامُ", "دينُ", "العَرَبِ", "وَحْدَهُمْ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٣) النَّبَوِيَّةَ - الأَحاديثِ - بَعْضَ - قَرَأْتَ - هَلْ", ogeler: ["هَلْ", "قَرَأْتَ", "بَعْضَ", "الأَحاديثِ", "النَّبَوِيَّةِ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤) الشُّعوبُ - وَجَدَتْ - ماذا - الإِسْلامِ - في", ogeler: ["ماذا", "وَجَدَتِ", "الشُّعوبُ", "في", "الإِسْلامِ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٥) البَيْتِ - يا مُحَمَّدُ - تَخْرُجُ - مِنَ - مَتى", ogeler: ["مَتى", "تَخْرُجُ", "مِنَ", "البَيْتِ", "يا مُحَمَّدُ؟"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٦) المُجْتَمَعُ - يَحْتاجُ - شَيْءٍ - أَيِّ - إِلى", ogeler: ["إِلى", "أَيِّ", "شَيْءٍ", "يَحْتاجُ", "المُجْتَمَعُ؟"] }
]}
];
var KELIME = [];
