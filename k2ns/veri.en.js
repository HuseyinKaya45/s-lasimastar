// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — الاخْتِبارُ النِّصْفِيُّ (الوَحَداتُ ١ - ٨) =================
// Kitaptaki ara sınav: dört bölüm, 100 puan. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "1–8", ar: "الاخْتِبارُ النِّصْفِيُّ", tr: "Midterm exam · Units 1–8", pfx: "k2ns:", sinavYok: true, sonuc: true,
  giris: "The midterm exam covering Units 1–8 of the book: reading, structures and rules, vocabulary, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Short sentences and three texts; 30 questions", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الَّتي لَها نَفْسُ المَعْنى", aciklama: "Read the sentence, then choose the option that fits its meaning.", ogeler: [
  ["(١) «لا أَسْتَطيعُ أَنْ أَمُرَّ عَلَيْكَ اليَوْمَ، فَأَنا مَشْغولٌ جِدًّا». هذا الشَّخْصُ لَنْ يَزورَ صَديقَهُ لِأَنَّهُ …", "لَدَيْهِ عَمَلٌ كَثيرٌ", ["مَريضٌ اليَوْمَ", "مَشْغولٌ غَدًا"], "“I cannot drop in on you today, I am very busy.” This person will not visit his friend, because … ."],
  ["(٢) «أَنْتَ تَأْكُلُ قَليلًا، وَمَعَ ذلِكَ أَنْتَ سَمينٌ».", "هُوَ سَمينٌ وَلا يَأْكُلُ كَثيرًا", ["هُوَ سَمينٌ لِأَنَّهُ لا يَأْكُلُ", "يَأْكُلُ قَليلًا لِذلِكَ هُوَ غَيْرُ سَمينٍ"], "“You eat little, yet you are fat.”"],
  ["(٣) طوكْيو عاصِمَةُ اليابانِ، عَدَدُ سُكّانِها عَشَرَةُ مَلايينِ شَخْصٍ، وَيَزيدُ عَدَدُ سُكّانِها عَلى عَدَدِ سُكّانِ مَدينَةِ نيويورْك بِثَلاثَةِ مَلايينِ شَخْصٍ. عَدَدُ سُكّانِ نيويورْك …", "سَبْعَةُ مَلايينِ شَخْصٍ", ["عَشَرَةُ مَلايينِ شَخْصٍ", "ثَلاثَةُ مَلايينِ شَخْصٍ"], "The population of Tokyo is ten million, three million more than New York. The population of New York is … ."],
  ["(٤) «سَأَكونُ في الرِّياضِ هذا الأُسْبوعَ، وَلَنْ أُسافِرَ إِلى مَكَّةَ إِلّا في الأُسْبوعِ القادِمِ». هذا الشَّخْصُ …", "سَيُسافِرُ إِلى الرِّياضِ", ["في طَريقِهِ إِلى الرِّياضِ", "جاءَ مِنَ الرِّياضِ"], "“This week I will be in Riyadh, I will go to Mecca only next week.” This person … .", "سَأَكونُ: future tense; he is not yet in Riyadh."],
  ["(٥) كانَتِ المَرْأَةُ في الماضي لا تَخْرُجُ مِنْ بَيْتِها، إِلّا عِنْدَ الضَّرورَةِ. هذِهِ العِبارَةُ تَعْني أَنَّها كانَتْ …", "تَخْرُجُ قَليلًا", ["تَخْرُجُ كَثيرًا", "لا تَخْرُجُ"], "In the past a woman left her house only when it was necessary. That is … ."],
  ["(٦) قالَ الرَّسولُ ﷺ: «… فَاظْفَرْ بِذاتِ الدّينِ تَرِبَتْ يَداكَ». إِذا أَرَدْتَ السَّعادَةَ …", "تَزَوَّجِ الصّالِحَةَ", ["تَزَوَّجِ الجَميلَةَ", "تَرِبَتْ يَداكَ"], "“… Choose the one with religion, may your hands be blessed.” If you want happiness … ."],
  ["(٧) تَخْتَلِفُ مُشْكِلَةُ يوسُفَ عَنْ مُشْكِلَةِ صَديقِهِ؛ فَيوسُفُ نَحيفٌ جِدًّا، وَيُريدُ أَنْ يَزيدَ وَزْنُهُ. صَديقُ يوسُفَ …", "سَمينٌ", ["نَحيفٌ", "طَويلٌ"], "Yūsuf's problem is different from his friend's; Yūsuf is very thin and wants to gain weight. Yūsuf's friend … ."],
  ["(٨) طَلَبَ مِنّي الطَّبيبُ أَنْ أُغَيِّرَ أُسْلوبَ حَياتي؛ لِأَنَّها عَمَلٌ كُلُّها. يَجِبُ عَلى المُتَحَدِّثِ أَنْ …", "يُرَوِّحَ عَنْ نَفْسِهِ", ["يَتْرُكَ العَمَلَ", "يُغَيِّرَ العَمَلَ"], "The doctor asked me to change my lifestyle, because my life is always work. The speaker … ."],
  ["(٩) حَصَلَ ابْني أَحْمَدُ عَلى تَقْديرٍ مُمْتازٍ في الرِّياضِيّاتِ، لكِنَّهُ يَرْغَبُ في الالْتِحاقِ بِكُلِّيَّةِ اللُّغَةِ العَرَبِيَّةِ. أَحْمَدُ …", "طالِبٌ", ["مُدَرِّسٌ", "مُهَنْدِسٌ"], "My son Ahmad got “excellent” in mathematics, but he wants to enter the faculty of Arabic. Ahmad … ."],
  ["(١٠) قالَ الرَّسولُ ﷺ: «ما أَكَلَ أَحَدٌ طَعامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ…». هذا الحَديثُ يَعْني …", "أَنْ تَعْمَلَ خَيْرٌ لَكَ مِنْ أَنْ تَسْأَلَ النّاسَ", ["أَنْ تَأْكُلَ بِيَدِكَ", "أَنْ تَأْكُلَ قَليلًا خَيْرٌ لَكَ"], "“No one has ever eaten a better meal than what he eats from the work of his hands.” This hadith … .", "“Eating from the work of one's hands” means earning one's living by working; not “eating with one's hand”."],
  ["(١١) «بَعْدَ الصَّلاةِ عُدْنا إِلى البَيْتِ، وَذَبَحَ والِدي الأُضْحِيَةَ». كانَتْ هذِهِ صَلاةَ …", "العيدِ", ["الفَجْرِ", "الظُّهْرِ"], "“After the prayer we returned home and my father slaughtered the sacrifice.” This was the … prayer."]] },
 { t: "metin", baslik: "First text", ar: "اقْرَأْ ما يَلي", paragraf: [[
  ["وَصَلَ المُسْلِمونَ إِلى بِلادٍ بَعيدَةٍ مِنَ العالَمِ في الماضي. وَقَدْ حَمَلوا مَعَهُمُ الحَضارَةَ العَرَبِيَّةَ الإِسْلامِيَّةَ إِلى بَعْضِ المُدُنِ وَالدُّوَلِ في أوروبّا مِثْلِ: إيطالْيا، وَفَرَنْسا، وَإِسْبانْيا. وَظَلَّتْ آثارُ الحَضارَةِ الإِسْلامِيَّةِ إِلى اليَوْمِ؛ فَنَحْنُ نَرى آثارَ هذِهِ الحَضارَةِ في صِقِلِّيَةَ، وَفَرَنْسا، وَإِسْبانْيا.", "In the past the Muslims reached distant countries of the world. They took Arab-Islamic civilization to some cities and countries of Europe such as Italy, France and Spain. The works of Islamic civilization remain to this day; we see the works of this civilization in Sicily, in France and in Spain."],
  ["وَقَدْ قامَتِ العُلومُ الغَرْبِيَّةُ الحَديثَةُ عَلى أَساسِ العُلومِ العَرَبِيَّةِ الإِسْلامِيَّةِ الَّتي كانَتْ في مَعاهِدِ المُسْلِمينَ في بَغْدادَ وَقُرْطُبَةَ وَإِشْبيلِيَةَ. وَكانَ الطُّلّابُ يَحْضُرونَ مِنْ أوروبّا لِلدِّراسَةِ في هذِهِ المَعاهِدِ، ثُمَّ يَعودونَ إِلى بِلادِهِمْ، وَهُمْ يَحْمِلونَ كُتُبَ العُلومِ العَرَبِيَّةِ الإِسْلامِيَّةِ مَعَهُمْ إِلى أوروبّا مِثْلَ: الطِّبِّ، وَالرِّياضِيّاتِ، وَالفَلَكِ، وَالهَنْدَسَةِ وَغَيْرِها.", "Modern Western sciences were built on the foundation of the Arab-Islamic sciences in the Muslims' institutes in Baghdad, Cordoba and Seville. Students from Europe would come to study in these institutes, then return to their countries carrying to Europe Arab-Islamic science books such as medicine, mathematics, astronomy and engineering."]]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗) كَما فَهِمْتَ مِنَ النَّصِّ", ogeler: [
  ["وَصَلَ المُسْلِمونَ إِلى بِلادٍ بَعيدَةٍ.", true, "", "The Muslims reached distant countries."],
  ["حَمَلَ المُسْلِمونَ مَعَهُمُ العُلومَ إِلى أوروبّا.", true, "", "The Muslims took the sciences to Europe.", "In the text: they took the civilization; the sciences are part of this civilization."],
  ["إِسْبانْيا مِنَ الدُّوَلِ الَّتي دَخَلَتْها الحَضارَةُ العَرَبِيَّةُ.", true, "", "Spain is among the countries Arab civilization entered."],
  ["هُناكَ آثارٌ لِلْحَضارَةِ الإِسْلامِيَّةِ في أوروبّا اليَوْمَ.", true, "", "Today there are works of Islamic civilization in Europe."],
  ["مِنَ المَعاهِدِ الإِسْلامِيَّةِ الَّتي أَخَذَتْ مِنْها أوروبّا قُرْطُبَةُ.", true, "", "One of the Islamic institutes Europe benefited from is in Cordoba."],
  ["كانَ الطُّلّابُ يَحْضُرونَ مِنْ أوروبّا لِلدِّراسَةِ عِنْدَ المُسْلِمينَ.", true, "", "Students used to come from Europe to study with the Muslims."],
  ["قامَتِ العُلومُ عَلى أَساسِ العُلومِ الغَرْبِيَّةِ الحَديثَةِ.", false, "قامَتِ العُلومُ الغَرْبِيَّةُ الحَديثَةُ عَلى أَساسِ العُلومِ العَرَبِيَّةِ الإِسْلامِيَّةِ.", "The sciences were built on the foundation of modern Western sciences."],
  ["مِنَ العُلومِ الَّتي أَخَذَها الأوروبِّيّونَ الطِّبُّ وَالفَلَكُ.", true, "", "Among the sciences Europeans took are medicine and astronomy."],
  ["صِقِلِّيَةُ بِها آثارٌ مِنَ الحَضارَةِ الإِسْلامِيَّةِ.", true, "", "In Sicily there are works from Islamic civilization."]] },
 { t: "metin", baslik: "Second text", ar: "اقْرَأْ", paragraf: [[
  ["جاءَ يَوْمُ الجُمُعَةِ، وَاجْتَمَعَ المُسْلِمونَ في المَسْجِدِ النَّبَوِيِّ في المَدينَةِ المُنَوَّرَةِ؛ يَنْتَظِرونَ عُمَرَ بْنَ الخَطّابِ لِلصَّلاةِ. انْتَظَرَ النّاسُ، وَانْتَظَروا، لكِنَّ الرَّجُلَ تَأَخَّرَ كَثيرًا. وَأَخيرًا جاءَ بَعْدَ وَقْتٍ طَويلٍ؛ فَقالوا لَهُ: لِماذا تَأَخَّرْتَ يا عُمَرُ؟ قالَ عُمَرُ: لي قَميصٌ واحِدٌ؛ لَيْسَ لَدَيَّ غَيْرُهُ. غَسَلْتُ هذا القَميصَ، وَوَضَعْتُهُ في الشَّمْسِ، وَانْتَظَرْتُ، ثُمَّ لَبِسْتُهُ وَأَتَيْتُ بِهِ إِلى المَسْجِدِ.", "Friday came; the Muslims gathered in the Prophet's Mosque in Medina and waited for ʿUmar ibn al-Khaṭṭāb for the prayer. The people waited and waited, but the man was very late. At last, after a long time, he came; they said to him: “Why were you late, ʿUmar?” ʿUmar said: “I have only one shirt, I have no other. I washed this shirt, put it in the sun and waited; then I put it on and came to the mosque.”"]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["الفِكْرَةُ الرَّئيسَةُ في هذِهِ الفِقْرَةِ، هِيَ أَنَّ عُمَرَ …", "لَدَيْهِ قَميصٌ واحِدٌ", ["تَأَخَّرَ عَنِ الصَّلاةِ", "غَسَلَ قَميصَهُ"], "The main idea of this paragraph is that ʿUmar … .", "The reason for his delay and the emphasis of the story is that ʿUmar had only one shirt."],
  ["كانَتْ هذِهِ الصَّلاةُ صَلاةَ …", "الجُمُعَةِ", ["الظُّهْرِ", "الفَجْرِ"], "This prayer was the … prayer."],
  ["حَدَثَ ذلِكَ في …", "المَدينَةِ المُنَوَّرَةِ", ["مَكَّةَ المُكَرَّمَةِ", "المَسْجِدِ الحَرامِ"], "This event was …"],
  ["مَنِ الرَّجُلُ الَّذي ذُكِرَ في السَّطْرِ الثّاني؟", "عُمَرُ", ["عُثْمانُ", "عَلِيٌّ"], "Who is the man mentioned in the second line?"],
  ["صَلّى النّاسُ الصَّلاةَ …", "مُتَأَخِّرينَ", ["مُبَكِّرينَ", "في وَقْتِها"], "The people prayed the prayer … ."],
  ["كانَ لَدى عُمَرَ …", "ثَوْبٌ واحِدٌ", ["مَلابِسُ كَثيرَةٌ", "أَثْوابٌ قَليلَةٌ"], "ʿUmar had … ."]] },
 { t: "sirala", ar: "رَتِّبْ ما يَلي كَما فَهِمْتَ مِنَ الفِقْرَةِ", aciklama: "Arrange the events in the order in which they occurred.", ogeler: ["غَسَلَ عُمَرُ القَميصَ.", "وَضَعَ عُمَرُ قَميصَهُ في الشَّمْسِ.", "لَبِسَ عُمَرُ قَميصَهُ.", "أَتى عُمَرُ إِلى المَسْجِدِ وَصَلّى بِالنّاسِ."] }
]},
// ---------------- 2. YAPILAR ----------------
{ no: 2, etiket: "Structures and rules", kisa: "التَّراكيبُ وَالقَواعِدُ", ar: "ثانِيًا: التَّراكيبُ وَالقَواعِدُ", tr: "Structures and rules", ozet: "Correct sentence, blank, error correction, verbs according to pronouns", bloklar: [
 { t: "secim", ar: "ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الجُمْلَةِ الَّتي فيها خَطَأٌ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "ضَعِ الكِتابَ فَوْقَ الحَقيبَةِ.", ["لا ضَعِ الكِتابَ فَوْقَ الحَقيبَةِ."], "Which is correct?"],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "يا مُحَمَّدُ لا تَتَناوَلِ الدَّواءَ.", ["يا مُحَمَّدُ، لا يَتَناوَلُ الدَّواءَ."], "Which is correct?", "Prohibition to the one addressed: لا تَفْعَلْ"],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "زَيْنَبُ حَضَرَتْ قَبْلَ يَوْمَيْنِ.", ["زَيْنَبُ حَضَرَتْ غَدًا."], "Which is correct?", "The past verb is not used with غَدًا."],
  ["(٤) أَيُّهُما صَحيحَةٌ؟", "صَلّى عَلِيٌّ الفَجْرَ في المَسْجِدِ.", ["صَلّى عَلِيًّا الفَجْرَ في المَسْجِدِ."], "Which is correct?", "The subject is nominative."],
  ["(٥) أَيُّهُما صَحيحَةٌ؟", "مَرْيَمُ سَمينَةٌ جِدًّا.", ["مَرْيَمُ سَمينٌ جِدًّا."], "Which is correct?"]] },
 { t: "bosluk", ar: "امْلَأِ الفَراغَ بِالكَلِمَةِ الصَّحيحَةِ", ogeler: [
  ["نَحْنُ طُلّابٌ وَ___ مُدَرِّسونَ.", "أَنْتُمْ", ["أَنْتُما", "أَنْتُنَّ"], "We are students, you are teachers."],
  ["___ أُصَلّي في المَسْجِدِ دائِمًا.", "أَنا", ["نَحْنُ", "أَنْتَ"], "I always pray in the mosque."],
  ["فَحَصَ الطَّبيبُ ___.", "المَريضَ", ["المَريضُ", "المَريضِ"], "The doctor examined the patient."],
  ["قَرَأْتُ الدَّرْسَ ___ كَتَبْتُهُ.", "ثُمَّ", ["أَوْ", "عِنْدَ"], "I studied the lesson, then wrote."],
  ["طَلَبُ ___ فَريضَةٌ.", "العِلْمِ", ["العِلْمَ", "العِلْمُ"], "Learning is obligatory."]] },
 { t: "secim", ar: "صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Choose the correct form of the underlined word.", ogeler: [
  ["(١١) [[مَنْ]] تَناوَلْتَ العَسَلَ، شَفاكَ اللهُ.", "إِذا", ["لِماذا", "كَيْفَ"], "If you eat honey, God gives you healing.", "A conditional sentence."],
  ["(١٢) في الجامِعَةِ [[كُلِّيَّةٌ]] كَثيرَةٌ.", "كُلِّيّاتٌ", ["كُلِّيَّتانِ", "كُلِّيَّةً"], "There are many faculties at the university."],
  ["(١٣) انْظُرْ إِلى [[هذا]] السَّيّارَةِ البَعيدَةِ.", "هذِهِ", ["ذلِكَ", "هؤُلاءِ"], "Look at that car in the distance."],
  ["(١٤) [[هِيَ]] سَيَنْتَظِرُ السَّيّارَةَ.", "هُوَ", ["هُمْ", "أَنْتِ"], "He will wait for the car."],
  ["(١٥) ارْكَبْ [[هذا]] الحافِلَةَ السَّريعَةَ.", "هذِهِ", ["ذلِكَ", "هذانِ"], "Board this fast bus."],
  ["(١٦) أَعْتَقِدُ أَنَّ فاطِمَةَ طالِبَةٌ [[جَديدٌ]].", "جَديدَةٌ", ["جَديدًا", "جَديدَةً"], "I think Fāṭima is a new student."],
  ["(١٧) كانَ مُحَمَّدٌ [[طالِبٌ]].", "طالِبًا", ["طالِبٍ", "الطّالِبُ"], "Muhammad was a student.", "كانَ puts its predicate in the accusative."],
  ["(١٨) لَنِ [[اشْتَرَيْتُ]] الحاسوبَ غَدًا.", "أَشْتَرِيَ", ["أَشْتَري", "أَشْتَرِ"], "Tomorrow I will not buy a computer.", "لَنْ + subjunctive imperfect."],
  ["(١٩) قابَلْتُ الطّالِبَةَ [[الَّذي]] سافَرَتْ.", "الَّتي", ["الَّذينَ", "اللَّتانِ"], "I met the girl student who set out on the journey."],
  ["(٢٠) في الجامِعَةِ [[مُدَرِّسٌ]] كَثيرونَ.", "مُدَرِّسونَ", ["مُدَرِّسانِ", "مُدَرِّسًا"], "There are many teachers at the university."]] },
 { t: "siniflandir", ar: "ضَعِ الكَلِماتِ الآتِيَةَ في مَكانِها الصَّحيحِ مِنَ الجَدْوَلِ", soru: "To which pronoun does it belong?", gruplar: ["نَحْنُ", "هُما", "هُمْ", "هُنَّ"], ogeler: [
  ["أَخَذْنا", 0], ["أَصْبَحا", 1], ["أَصْلَحوا", 2], ["حَضَرْنَ", 3], ["أَفاقوا", 2], ["أَفْسَدْنَ", 3], ["أَنْشَأْنا", 0], ["اتَّبَعا", 1],
  ["اتَّصَلْنا", 0], ["اجْتَمَعا", 1], ["احْتاجوا", 2], ["دَرَسْنَ", 3], ["اخْتَفَوْا", 2], ["اخْتَلَفْنَ", 3], ["ازْدَهَرا", 1], ["اسْتَمَعْنا", 0],
  ["اعْتَقَدْنا", 0], ["اقْتَرَبا", 1], ["اصْطادوا", 2], ["اشْتَهَرْنَ", 3], ["تَأَثَّرْنَ", 3], ["تَأَخَّروا", 2], ["تَحَقَّقا", 1], ["تَخَرَّجْنا", 0]] }
]},
// ---------------- 3. KELİMELER ----------------
{ no: 3, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثالِثًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Antonyms, topic headings, plurals", bloklar: [
 { t: "bosluk", ar: "أَكْمِلْ بِوَضْعِ المُقابِلِ (المُضادِّ) لِلْكَلِمَةِ الَّتي تَحْتَها خَطٌّ", ogeler: [
  ["هذا أَخي [[الأَكْبَرُ]]، وَذلِكَ أَخي ___.", "الأَصْغَرُ", ["الأَوْسَطُ", "الأَطْوَلُ"], "This is my elder brother, and that is my younger brother."],
  ["هُناكَ اخْتِلافاتٌ بَيْنَ شَخْصِيَّةِ [[الرَّجُلِ]]، وَشَخْصِيَّةِ ___.", "المَرْأَةِ", ["الطِّفْلِ", "الشّابِّ"], "There are differences between the man's personality and the woman's personality."],
  ["كانَتِ الأُسَرُ في [[الماضي]] سَعيدَةً، أَمّا الأُسَرُ في ___ فَلَيْسَتْ سَعيدَةً.", "الحاضِرِ", ["القَديمِ", "الرّيفِ"], "In the past families were happy, while today's families are not happy."],
  ["[[يُغادِرُ]] الأَبُ في الصَّباحِ، وَلا ___ إِلّا في المَساءِ.", "يَعودُ", ["يَخْرُجُ", "يَنامُ"], "The father goes out in the morning and returns only in the evening."],
  ["هُناكَ ___ في العَلاقَةِ بَيْنَ أَفْرادِ الأُسْرَةِ، وَهُناكَ [[قُوَّةٌ]] في العَلاقَةِ بَيْنَ الأَصْدِقاءِ.", "ضَعْفٌ", ["حُبٌّ", "خِلافٌ"], "There is weakness in the relationship among family members, strength in the relationship among friends."],
  ["[[مَنَحَتْهُ]] الدَّوْلَةُ جائِزَةً، وَ___ مِنَ السَّفَرِ.", "مَنَعَتْهُ", ["أَعْطَتْهُ", "سَمَحَتْ لَهُ"], "The state gave him a prize and prevented him from travelling."],
  ["[[قامَ]] المُدَرِّسُ، وَ___ الطُّلّابُ.", "جَلَسَ", ["وَقَفَ", "خَرَجَ"], "The teacher stood up and the students sat down."],
  ["[[أُغْمِيَ]] عَلَيَّ في العَمَلِ، وَلَمّا ___ وَجَدْتُ نَفْسي مَعَ الطَّبيبِ.", "أَفَقْتُ", ["نِمْتُ", "مَرِضْتُ"], "Here I fainted; when I came to, I found myself beside the doctor."],
  ["[[الزَّواجُ]] أَفْضَلُ مِنَ ___.", "الطَّلاقِ", ["الخُطْبَةِ", "العَمَلِ"], "Marriage is better than divorce."],
  ["بَعْدَ الزَّكاةِ [[زادَ]] مالي، وَما ___.", "نَقَصَ", ["كَثُرَ", "ضاعَ"], "After zakat my wealth increased, it did not decrease."]] },
 { t: "siniflandir", ar: "ضَعْ كُلَّ كَلِمَةٍ مِنَ الكَلِماتِ الآتِيَةِ في مَكانِها المُناسِبِ مِنَ الجَدْوَلِ", soru: "Which title?", gruplar: ["الحَياةُ الزَّوْجِيَّةُ", "العِلْمُ وَالتَّعَلُّمُ", "التَّرْويحُ", "العِنايَةُ بِالصِّحَّةِ"], ogeler: [
  ["طَلاقٌ", 0], ["كُلِّيَّةٌ", 1], ["أَلْعابٌ", 2], ["أَدْوِيَةٌ", 3], ["فَحْصٌ", 3], ["تَرْويحٌ", 2], ["زَواجٌ", 0], ["عُلَماءُ", 1], ["دِراساتٌ عُلْيا", 1], ["الطُّفولَةُ", 0], ["سِباحَةٌ", 2], ["حِمْيَةٌ", 3],
  ["أَطِبّاءُ", 3], ["أَنْشِطَةٌ", 2], ["خِلافاتٌ", 0], ["شَهاداتٌ", 1], ["تَعْليمٌ", 1], ["أَبْناءٌ", 0], ["مُتْعَةٌ", 2], ["أَمْراضٌ", 3], ["جُغْرافْيا", 1], ["فَتاةٌ", 0], ["صَيْدٌ", 2], ["طَبيبٌ", 3]],
  not: "الطُّفولَةُ and فَتاةٌ were placed under “married life” according to the family and marriage topics of the unit." },
 { t: "bosluk", ar: "اكْتُبْ جَمْعَ ما تَحْتَهُ خَطٌّ في الفَراغِ", ogeler: [
  ["في [[العَصْرِ]] الحَديثِ كَثُرَتِ الخِلافاتُ، لكِنْ في ___ القَديمَةِ كانَتِ الخِلافاتُ قَليلَةً.", "العُصورِ", ["الأَعْصارِ", "العَصْراتِ"], "In the modern age disputes have multiplied, while in ancient ages they were few."],
  ["سَأَذْهَبُ مَعَ [[فَريقِ]] الجَوّالَةِ، وَتَذْهَبُ أَنْتَ مَعَ ___ الرِّياضَةِ.", "فِرَقِ", ["فَريقاتِ", "أَفْرِقَةِ"], "I will go with the scout team, you will go with the sports teams."],
  ["كانَتْ لِكُلِّ [[قَبيلَةٍ]] لُغَةٌ خاصَّةٌ بِها، وَالآنَ كُلُّ ___ تَتَكَلَّمُ لُغَةً واحِدَةً.", "القَبائِلِ", ["القَبيلاتِ", "القُبولِ"], "Every tribe had a language of its own; now all the tribes speak one language."],
  ["دَرَسَ جونُ [[اللَّهْجَةَ]] المِصْرِيَّةَ، وَدَرَسَ الطُّلّابُ كُلَّ ___ العَرَبِيَّةِ.", "اللَّهَجاتِ", ["اللُّهوجِ", "اللَّهْجاتِ"], "John learned the Egyptian dialect, the students learned all the Arab dialects.", "The reading اللَّهْجاتُ is also used."],
  ["هذِهِ [[المَرْأَةُ]] مِنْ باكِسْتانَ، وَهؤُلاءِ ___ مِنَ الهِنْدِ.", "النِّساءُ", ["المَرْآتُ", "المَرَئاتُ"], "This woman is Pakistani, those women are Indian."],
  ["هُناكَ [[مَجالٌ]] طَيِّبٌ لِعَمَلِ المَرْأَةِ، وَهُناكَ ___ تُناسِبُ الرَّجُلَ فَقَطْ.", "مَجالاتٌ", ["مَجاويلُ", "أَجْوالٌ"], "There is a good field for women's work, and there are also fields suitable only for men."],
  ["هذا [[أُسْلوبٌ]] جَيِّدٌ في التَّرْبِيَةِ، لكِنْ جاءَ القُرْآنُ بِـ___ أَفْضَلَ.", "أَساليبَ", ["أُسْلوباتٍ", "أَسالِبَ"], "This is a good method in education, but the Qur'an brought better methods."],
  ["حَصَلَ إِبْراهيمُ عَلى [[جائِزَةِ]] الطّالِبِ المِثالِيِّ، وَحَصَلَ الطُّلّابُ عَلى ___ أُخْرى مُخْتَلِفَةٍ.", "جَوائِزَ", ["جائِزاتٍ", "جَوازٍ"], "Ibrāhīm received the model student prize, and the students received other different prizes."],
  ["هذا [[رَجُلٌ]] يَخافُ النّاسَ، لكِنْ هُناكَ ___ لا يَخافونَ إِلّا اللهَ.", "رِجالٌ", ["رَجُلونَ", "أَرْجُلٌ"], "This is a man who fears people, but there are men who fear only God."],
  ["خُذْ مَعَكَ هذِهِ [[الخَيْمَةَ]]، وَسَأُحْضِرُ مَعي هذِهِ ___.", "الخِيامَ", ["الخَيْماتِ", "الأَخْيامَ"], "Take this tent with you, and I will bring these tents."]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Making sentences, matching, arranging", bloklar: [
 { t: "acik", ar: "كَوِّنْ أَرْبَعَ جُمَلٍ مِنَ الجَدْوَلِ التّالي", aciklama: "Table: (١) يَذْهَبُ - المَريضُ - عَنْ - الأَلَمَ / (٢) المَدينَةُ - كوبٌ - إِلى - الشّايِ / (٣) شَعَرَ - العامِلُ - بِـ - البَيْتِ / (٤) هذِهِ - بَعيدَةٌ - مِنْ - عَمَلِهِ. Each sentence begins with the given word; first make it yourself, then look at the example.", ogeler: [
  ["١- يَذْهَبُ …", "يَذْهَبُ العامِلُ إِلى عَمَلِهِ.", "The worker goes to his work."], ["٢- المَدينَةُ …", "المَدينَةُ بَعيدَةٌ عَنِ البَيْتِ.", "The city is far from the house."],
  ["٣- شَعَرَ …", "شَعَرَ المَريضُ بِالأَلَمِ.", "The patient felt pain."], ["٤- هذِهِ …", "هذِهِ كوبٌ مِنَ الشّايِ.", "This is a glass of tea."]],
  not: "كوب is generally used as masculine in Arabic (هذا كوبٌ); the example is given this way because it is built with هذِهِ in the table." },
 { t: "esle", ar: "صِلْ بَيْنَ العِباراتِ في المَجْموعَةِ (أ) وَما يُناسِبُها في المَجْموعَةِ (ب)", ciftler: [
  ["مَرَّتْ بِالعَرَبِ عُصورٌ", "ابْتَعَدوا فيها عَنْ دينِهِمْ.", "The Arabs lived through ages in which they drifted away from their religion."],
  ["تَتَكَوَّنُ الجائِزَةُ مِنْ", "شَهادَةٍ تَحْمِلُ اسْمَ الفائِزِ.", "The prize consists of a certificate bearing the winner's name."],
  ["مِنْ صِفاتِ الطّالِبِ المُسْلِمِ", "أَنْ يُحافِظَ عَلى صَلاتِهِ.", "One of the characteristics of the Muslim student is that he keeps up his prayer."],
  ["بَعْضُ الشَّبابِ لا يَعْمَلونَ", "وَيَعْتَمِدونَ عَلى غَيْرِهِمْ.", "Some young people do not work and rely on others."]] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ التّالِيَةَ لِتَصيرَ جُمَلًا", aciklama: "(١) اللهِ - مِنْ - نِعْمَةٌ - العَمَلُ - نِعَمِ", ogeler: ["العَمَلُ", "نِعْمَةٌ", "مِنْ", "نِعَمِ", "اللهِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٢) هُناكَ - عَمَلٍ - كَثيرَةٌ - فُرَصُ", ogeler: ["هُناكَ", "فُرَصُ", "عَمَلٍ", "كَثيرَةٌ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٣) يَوْمٍ - كُلَّ - سُكّانُ - يَزْدادُ - المُدُنِ", ogeler: ["يَزْدادُ", "سُكّانُ", "المُدُنِ", "كُلَّ", "يَوْمٍ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤) العِلْمِ - يَدْعو - إِلى - طَلَبِ - الإِسْلامُ", ogeler: ["يَدْعو", "الإِسْلامُ", "إِلى", "طَلَبِ", "العِلْمِ"] }
]}
];
var KELIME = [];
