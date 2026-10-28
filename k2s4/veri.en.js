// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — اخْتَبِرْ نَفْسَكَ ٤ (الوَحْدَتانِ ٧ - ٨) =================
// Kitaptaki öz değerlendirme sınavı: dört bölüm, 40 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "7–8", ar: "اخْتَبِرْ نَفْسَكَ ٤", tr: "Test yourself 4 · Units 7 and 8", pfx: "k2s4:", sinavYok: true, sonuc: true,
  giris: "The self-assessment test after Units 7 and 8 of the book: reading, structures and rules, vocabulary, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Two texts; 15 questions", bloklar: [
 { t: "metin", baslik: "First text", ar: "اقْرَأْ ما يَلي، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [[
  ["حَسَنٌ طالِبٌ إِنْدونيسِيٌّ، يَدْرُسُ في الجامِعَةِ الإِسْلامِيَّةِ في المَدينَةِ المُنَوَّرَةِ. سافَرَ حَسَنٌ إِلى السُّعودِيَّةِ قَبْلَ ثَلاثِ سَنَواتٍ؛ لِيَتَعَلَّمَ اللُّغَةَ العَرَبِيَّةَ وَيَدْرُسَ الإِسْلامَ.", "Hasan is an Indonesian student; he studies at the Islamic University in Medina. Three years ago he went to Saudi Arabia to learn Arabic and to study Islam."],
  ["يَتَحَدَّثُ حَسَنٌ العَرَبِيَّةَ الآنَ جَيِّدًا. وَقَدْ بَدَأَ حِفْظَ القُرْآنِ الكَريمِ في بَلَدِهِ، وَالآنَ يَحْفَظُهُ كُلَّهُ.", "Hasan now speaks Arabic well. He had begun memorizing the Noble Qur'an in his country; now he knows all of it by heart."],
  ["أَصْبَحَ حَسَنٌ الآنَ يَفْهَمُ أَحاديثَ الرَّسولِ ﷺ، وَيَقْرَأُ الكُتُبَ العَرَبِيَّةَ وَالمَجَلّاتِ الأُسْبوعِيَّةَ، وَالصُّحُفَ اليَوْمِيَّةَ.", "Hasan now understands the hadiths of the Messenger of God (peace and blessings be upon him); he reads Arabic books, weekly magazines and daily newspapers."],
  ["بَعْدَ هذِهِ السَّنَواتِ الثَّلاثِ، يَسْتَطيعُ حَسَنٌ أَنْ يَكْتُبَ بِاللُّغَةِ العَرَبِيَّةِ؛ فَقَدْ كَتَبَ إِلى أَصْدِقائِهِ، وَقالَ لَهُمْ: «إِنَّ اللُّغَةَ العَرَبِيَّةَ لُغَةٌ سَهْلَةٌ، وَهِيَ لُغَةُ العِبادَةِ لِأَكْثَرَ مِنْ مِلْيارٍ مِنَ المُسْلِمينَ، وَلُغَةُ القُرْآنِ الكَريمِ وَالإِسْلامِ».", "At the end of these three years Hasan can write Arabic; he wrote to his friends and said to them: “Arabic is an easy language; it is the language of worship of more than a billion Muslims, the language of the Noble Qur'an and of Islam.”"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["حَسَنٌ طالِبٌ مُسْلِمٌ مِنْ …", "آسْيا", ["إِفْريقْيا", "أوروبّا"], "Hasan is a Muslim student … .", "Indonesia is in Asia."],
  ["يَدْرُسُ حَسَنٌ في المَرْحَلَةِ …", "الجامِعِيَّةِ", ["الثّانَوِيَّةِ", "المُتَوَسِّطَةِ"], "Hasan studies … ."],
  ["حَضَرَ حَسَنٌ إِلى السُّعودِيَّةِ …", "قَبْلَ ٣ سَنَواتٍ", ["قَبْلَ أَشْهُرٍ", "قَبْلَ أَسابيعَ"], "Hasan came to Saudi Arabia … ."],
  ["حَسَنٌ الآنَ …", "يَتَحَدَّثُ وَيَقْرَأُ وَيَكْتُبُ بِالعَرَبِيَّةِ", ["يَتَحَدَّثُ العَرَبِيَّةَ وَيَكْتُبُ بِها", "يَكْتُبُ العَرَبِيَّةَ وَيَقْرَؤُها"], "Hasan now … ."],
  ["حَفِظَ حَسَنٌ القُرْآنَ في …", "إِنْدونيسْيا وَالسُّعودِيَّةِ", ["إِنْدونيسْيا", "السُّعودِيَّةِ"], "Hasan memorized the Qur'an … .", "He began memorizing in his country and completed it in Saudi Arabia."],
  ["لا يَقْرَأُ حَسَنٌ …", "الصُّحُفَ الأُسْبوعِيَّةَ", ["الكُتُبَ العَرَبِيَّةَ", "الصُّحُفَ اليَوْمِيَّةَ"], "Hasan does not read … .", "The text mentions weekly magazines (المَجَلّاتُ الأُسْبوعِيَّةُ) and daily newspapers; it does not mention weekly newspapers."],
  ["بَدَأَ حَسَنٌ الكِتابَةَ بِاللُّغَةِ العَرَبِيَّةِ في …", "السُّعودِيَّةِ بَعْدَ ثَلاثِ سَنَواتٍ", ["بَلَدِهِ بَعْدَ ثَلاثِ سَنَواتٍ", "إِنْدونيسْيا بَعْدَ سَنَةٍ"], "Hasan began to write Arabic … ."],
  ["كَتَبَ حَسَنٌ إِلى …", "أَصْدِقائِهِ", ["زَوْجَتِهِ", "زُمَلائِهِ"], "Hasan wrote … ."],
  ["عَدَدُ المُسْلِمينَ في العالَمِ …", "أَكْثَرُ مِنْ مِلْيارِ شَخْصٍ", ["مِلْيارُ شَخْصٍ", "أَقَلُّ مِنْ مِلْيارِ شَخْصٍ"], "The number of Muslims in the world … ."]] },
 { t: "metin", baslik: "Second text", ar: "اقْرَأْ", paragraf: [[
  ["قالَتِ المَرْأَةُ لِابْنَتِها: «خُذي اللَّبَنَ الَّذي سَنَبيعُهُ اليَوْمَ في السّوقِ، وَضَعي فيهِ بَعْضَ الماءِ».", "The woman said to her daughter: “Take the milk that we will sell in the market today and put a little water in it.”"],
  ["فَقالَتْ لَها الابْنَةُ: «تَعْرِفينَ يا أُمّي أَنَّ هذا العَمَلَ لا يَقْبَلُهُ الإِسْلامُ، وَأَنَّ عُمَرَ بْنَ الخَطّابِ قَدْ مَنَعَ أَنْ يَضَعَ أَحَدٌ الماءَ في اللَّبَنِ».", "Her daughter said to her: “You know, Mother, Islam does not accept this; and ʿUmar ibn al-Khaṭṭāb forbade anyone to add water to milk.”"],
  ["قالَتِ الأُمُّ: «ضَعي الماءَ يا ابْنَتي، فَإِنَّ عُمَرَ لا يَرانا». فَقالَتِ البِنْتُ: «إِنْ كانَ عُمَرُ لا يَرانا، فَإِنَّ اللهَ يَرانا».", "Her mother said: “Put in the water, my daughter; ʿUmar cannot see us.” The girl said: “If ʿUmar does not see us, God sees.”"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["هذا الحِوارُ بَيْنَ …", "أُمٍّ وَابْنَتِها", ["رَجُلٍ وَزَوْجَتِهِ", "امْرَأَةٍ وَابْنِها"], "This conversation is between … ."],
  ["ماذا طَلَبَتِ الأُمُّ مِنِ ابْنَتِها؟", "وَضْعَ الماءِ في اللَّبَنِ", ["وَضْعَ اللَّبَنِ في الماءِ", "بَيْعَ اللَّبَنِ في السّوقِ"], "What did the mother ask of her daughter?"],
  ["مَنْ مَنَعَ أَنْ يوضَعَ الماءُ؟", "عُمَرُ", ["الابْنَةُ", "الأُمُّ"], "Who forbade adding water?"],
  ["مَنْ لا يَرى الأُمَّ وَابْنَتَها؟", "عُمَرُ", ["زَوْجُ المَرْأَةِ", "الأَبُ"], "Who does not see the mother and daughter?"],
  ["مَنْ يَرى الأُمَّ وَابْنَتَها؟", "اللهُ سُبْحانَهُ وَتَعالى", ["عُمَرُ بْنُ الخَطّابِ", "النّاسُ"], "Who sees the mother and daughter?"],
  ["مَنْ وَضَعَ الماءَ أَخيرًا؟", "لا أَحَدَ", ["الابْنَةُ", "الأُمُّ"], "Who in the end added the water?"]] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Structures and rules", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Structures and rules", ozet: "Error correction, attached accusative pronouns, correct sentence", bloklar: [
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Choose the correct form of the underlined word.", ogeler: [
  ["(١) الطّالِبُ [[الَّتي]] يَقْرَأُ القُرْآنَ جَيِّدًا مِنْ سَنْغافورَةَ.", "الَّذي", ["الَّذينَ", "اللَّذانِ"], "The student who reads the Qur'an well is a Singaporean."],
  ["(٢) ماذا [[يَقْرَأُ]] هذِهِ الأَيّامَ يا مُحَمَّدُ؟", "تَقْرَأُ", ["أَقْرَأُ", "نَقْرَأُ"], "What are you reading these days, Muhammad?", "Second person: تَـ"],
  ["(٣) تَحْتاجُ الشَّرِكَةُ إِلى عَشَرَةِ [[مُهَنْدِسٍ]].", "مُهَنْدِسينَ", ["مُهَنْدِسانِ", "مُهَنْدِسٌ"], "The company needs ten engineers.", "After the numbers 3-10 the specification is plural and genitive."],
  ["(٤) لَنْ [[يَذْهَبْ]] إِلى السّوقِ.", "يَذْهَبَ", ["يَذْهَبُ", "ذَهَبَ"], "She will not go to the market.", "لَنْ puts the imperfect in the subjunctive: fatḥa."],
  ["(٥) فاطِمَةُ [[الَّذي]] رَحَلَتْ إِلى مِصْرَ.", "الَّتي", ["الَّذينَ", "اللَّتانِ"], "Fāṭima, who migrated to Egypt."]] },
 { t: "siniflandir", ar: "ضَعْ ضَمائِرَ النَّصْبِ المُتَّصِلَةَ التّالِيَةَ في مَكانِها المُناسِبِ مِنَ الجَدْوَلِ", soru: "Whom does the attached accusative pronoun refer to?", gruplar: ["لِلْمُتَكَلِّمِ", "لِلْمُخاطَبِ", "لِلْمُخاطَبِ المُثَنّى", "لِلْجَماعَةِ"], ogeler: [
  ["فَحَصَهُمْ", 3], ["اتَّبَعَكُما", 2], ["يُطَهِّرُنا", 0], ["يُعامِلُكَ", 1], ["فَحَصَنا", 0], ["اخْتارَهُنَّ", 3], ["يُكَلِّمُكُمْ", 3], ["احْتَرَمَكُما", 2],
  ["أَفْسَدَكَ", 1], ["أَعِرْنا", 0], ["يُحِبُّهُنَّ", 3], ["جَعَلَكُما", 2], ["شَجَّعَكَ", 1], ["رَفَعَنا", 0], ["رَآكُما", 2], ["أَخَذَكَ", 1]],
  aciklama: "The last column of the table in the book is written «لِلْمُخاطَبينَ»; but the words that fall there (هُمْ، هُنَّ، كُمْ) are plural pronouns. Therefore I named the last group “plural”." },
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الجُمْلَةِ الَّتي فيها خَطَأٌ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "لَيْسَ البَيْتُ قَريبًا.", ["لَيْسَ البَيْتُ قَريبٌ."], "Which is correct?", "لَيْسَ puts the predicate in the accusative."],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "أُحِبُّ الرَّجُلَ الَّذي يَحْفَظُ القُرْآنَ.", ["أُحِبُّ الرَّجُلَ الَّتي يَحْفَظُ القُرْآنَ."], "Which is correct?"],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "سَميرَةُ تُفَكِّرُ كَثيرًا.", ["سَميرَةُ يُفَكِّرُ كَثيرًا."], "Which is correct?"],
  ["(٤) أَيُّهُما صَحيحَةٌ؟", "سَتَجِدُ العَمَلَ المُناسِبَ.", ["سَتَجِدُ العَمَلَ المُناسِبَةَ."], "Which is correct?", "The adjective agrees with the described noun in gender."]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Singular-plural, synonyms, antonyms", bloklar: [
 { t: "esle", ar: "صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", ciftler: [
  ["شَخْصٌ", "أَشْخاصٌ", "person"], ["أَمْرٌ", "أُمورٌ", "job, work"], ["شَجَرَةٌ", "شَجَرٌ", "tree"], ["شَرْطٌ", "شُروطٌ", "condition"], ["صورَةٌ", "صُوَرٌ", "picture"], ["عالِمٌ", "عُلَماءُ", "scholar"]] },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ لَهُما مَعْنًى واحِدٌ", ciftler: [
  ["أَصْحابٌ", "أَصْدِقاءُ", "companions"], ["فَتْرَةٌ", "مُدَّةٌ", "period"], ["وَطَنٌ", "بَلَدٌ", "homeland"], ["إِنْسانٌ", "شَخْصٌ", "person, human being"], ["أَكْلٌ", "طَعامٌ", "food"], ["تَلاميذُ", "طُلّابٌ", "students"], ["أَماكِنُ", "أَنْحاءٌ", "places"], ["سَنَةٌ", "عامٌ", "year"]] },
 { t: "bosluk", ar: "أَكْمِلْ بِوَضْعِ المُقابِلِ (المُضادِّ) لِلْكَلِمَةِ الَّتي تَحْتَها خَطٌّ", ogeler: [
  ["[[اشْتَرى]] مُحَمَّدٌ سَيّارَةً جَديدَةً، وَ___ سَيّارَتَهُ القَديمَةَ.", "باعَ", ["أَخَذَ", "رَكِبَ"], "Muhammad bought a new car and sold his old car."],
  ["أَكْثَرُ الطَّعامِ [[حَلالٌ]]، وَبَعْضُهُ ___.", "حَرامٌ", ["طَيِّبٌ", "قَليلٌ"], "Most foods are lawful, some are forbidden."],
  ["عَلِيٌّ [[تَقَدَّمَ]] في دِراسَتِهِ، وَيوسُفُ ___ في دِراسَتِهِ.", "تَأَخَّرَ", ["نَجَحَ", "اجْتَهَدَ"], "ʿAlī advanced in his lessons, while Yūsuf fell behind."],
  ["أَسْكُنُ في [[الرّيفِ]]، وَيَسْكُنُ أَخي في ___.", "المَدينَةِ", ["القَرْيَةِ", "البَرِّ"], "I live in the countryside, my brother lives in the city."],
  ["[[بَدَأَ]] مُحَمَّدٌ حِفْظَ القُرْآنِ، وَ___ أَحْمَدُ مِنْ حِفْظِ القُرْآنِ.", "انْتَهى", ["أَرادَ", "حاوَلَ"], "Muhammad began memorizing the Qur'an, while Ahmad finished his memorization."],
  ["[[جَلَسَ]] الأُسْتاذُ، وَ___ الطُّلّابُ.", "قامَ", ["نامَ", "جَلَسَ"], "The teacher sat down and the students stood up."]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Correct the spelling mistakes", bloklar: [
 { t: "secim", ar: "صَحِّحْ أَخْطاءَ الكِتابَةِ في الجُمَلِ التّالِيَةِ", aciklama: "Choose the correctly written sentence.", ogeler: [
  ["(١) سَلامٌ عَلى ابراهيمَ مِنْ رَبِّهِ.", "سَلامٌ عَلى إِبْراهيمَ مِنْ رَبِّهِ.", ["سَلامٌ عَلى ابراهيمَ مِنْ رَبِّهِ."], "Peace be upon Ibrāhīm from his Lord.", "The hamza of إِبْراهيم is a cutting hamza; it is written."],
  ["(٢) اشْرَبْ هذا البَنَ، وَلا تَأْكُلْ هذا الحَمَ.", "اشْرَبْ هذا اللَّبَنَ، وَلا تَأْكُلْ هذا اللَّحْمَ.", ["اشْرَبْ هذا البَنَ، وَلا تَأْكُلْ هذا الحَمَ."], "Drink this milk, do not eat this meat.", "When ال enters a word beginning with ل two lāms are written: اللَّبَن، اللَّحْم."],
  ["(٣) تَحَدَّثِ الغَةَ العَرَبِيَّةَ الفُصْحى، وَلا تَتَحَدَّثْ بِالهْجَةِ.", "تَحَدَّثِ اللُّغَةَ العَرَبِيَّةَ الفُصْحى، وَلا تَتَحَدَّثْ بِاللَّهْجَةِ.", ["تَحَدَّثِ الغَةَ العَرَبِيَّةَ الفُصْحى، وَلا تَتَحَدَّثْ بِالهْجَةِ."], "Speak classical Arabic, do not speak in dialect.", "اللُّغَة، اللَّهْجَة: two lāms."],
  ["(٤) إِتَّخِذي مَكانَكِ في الفَصْلِ يا هِنْدُ.", "اتَّخِذي مَكانَكِ في الفَصْلِ يا هِنْدُ.", ["إِتَّخِذي مَكانَكِ في الفَصْلِ يا هِنْدُ."], "Hind, take your place in the class.", "The connecting hamza: an alif without hamza."]] }
]}
];
var KELIME = [];
