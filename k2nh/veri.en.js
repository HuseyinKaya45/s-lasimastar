// ================= VERİ: el-Arabiyyetü beyne yedeyk 2 — الاخْتِبارُ النِّهائِيُّ (الوَحَداتُ ٩ - ١٦) =================
// Kitaptaki nihai sınav: beş bölüm, 160 puan. Dinleme bölümü öğretmen kitabının kaydıyla (zaman.js) çalar; diğer metinler gömülü okunuşla.
var UNITE = { no: "9–16", ar: "الاخْتِبارُ النِّهائِيُّ", tr: "Final exam · Units 9–16", pfx: "k2nh:", sinavYok: true, sonuc: true,
  giris: "The final exam covering Units 9–16 of the book: listening (with the original recordings), reading, rules, vocabulary and writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page." };
var DERSLER = [
// ---------------- 1. DİNLEME ----------------
{ no: 1, etiket: "Listening", kisa: "فَهْمُ المَسْموعِ", ar: "أَوَّلًا: فَهْمُ المَسْموعِ", tr: "Listening", ozet: "Sentences, questions, short dialogues and two paragraphs; 29 questions", bloklar: [
 { t: "dinle", s: "nh1", ar: "أَوَّلًا: اسْتَمِعْ إِلى العِبارَةِ، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", aciklama: "Five short sentences; after each, a question and options are read.", metin: [
  ["(١) الأَمْرُ عَجيبٌ؛ طَلَبَ مِنِّي الطَّبيبُ أَنْ أَتَناوَلَ الدَّواءَ بِانْتِظامٍ.", "It is strange; the doctor asked me to take the medicine regularly."],
  ["(٢) يَجِبُ عَلى جَميعِ الطُّلّابِ وَالمُدَرِّسينَ وَالعامِلينَ الحُضورُ إِلى المَعْهَدِ مُبَكِّرينَ.", "All the students, teachers and employees must come early to the institute."],
  ["(٣) عَلى المُسافِرينَ عَلى الرِّحْلَةِ رَقْمِ ٥٧٢ المُسافِرَةِ إِلى الخُرْطومِ التَّوَجُّهُ إِلى الحافِلَةِ رَقْمِ ٩.", "The passengers of flight 572 to Khartoum must go to bus number 9."],
  ["(٤) بَقِيَ يَوْمانِ عَلى شَهْرِ رَمَضانَ، وَبَعْدَهُ يَأْتي شَهْرُ شَوّالٍ.", "There are two days left to the month of Ramadan; after it comes the month of Shawwāl."],
  ["(٥) السّاعَةُ الآنَ العاشِرَةُ، وَسَتُغادِرُ الطّائِرَةُ بَعْدَ ساعَةٍ، وَسَتَصِلُ السّاعَةَ الواحِدَةَ بَعْدَ الظُّهْرِ.", "The time is now ten; the plane will take off in an hour and arrive at one in the afternoon."]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١) المُتَحَدِّثُ …", "مَريضٌ", ["طَبيبٌ", "مُمَرِّضٌ"], "The speaker …"],
  ["(٢) المُتَحَدِّثُ …", "مُديرٌ", ["مُدَرِّسٌ", "طالِبٌ"], "The speaker …"],
  ["(٣) هذا الكَلامُ في …", "المَطارِ", ["الطّائِرَةِ", "الحافِلَةِ"], "This is said … .", "An announcement to flight passengers: at the airport."],
  ["(٤) نَحْنُ الآنَ في شَهْرِ …", "شَعْبانَ", ["شَوّالٍ", "رَمَضانَ"], "We are now in the month of … .", "If two days are left to Ramadan, we are in the month of Shaʿbān."],
  ["(٥) سَتُغادِرُ الطّائِرَةُ السّاعَةَ …", "الحادِيَةَ عَشْرَةَ", ["العاشِرَةَ", "الواحِدَةَ"], "The plane will take off at … o'clock."]] },
 { t: "dinle", s: "nh2", ar: "ثانِيًا: اسْتَمِعْ إِلى السُّؤالِ، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", aciklama: "Five questions; after each, three answers are read.", metin: [
  ["(٦) هَلْ مُحَمَّدٌ قَلِقٌ بِسَبَبِ هذِهِ المُشْكِلَةِ؟", "Is Muhammad worried because of this problem?"], ["(٧) لِماذا نَشْتَري بَيْتًا في الرّيفِ؟", "Why do we buy houses in the countryside?"],
  ["(٨) مَتى تَخَرَّجْتَ في كُلِّيَّةِ العُلومِ؟", "When did you graduate from the faculty of science?"], ["(٩) هَلْ سَتَعْمَلُ طَبيبًا مِثْلَ أَبيكَ، أَمْ طَيّارًا مِثْلَ أَخيكَ؟", "Will you be a doctor like your father, or a pilot like your brother?"],
  ["(١٠) كَيْفَ تُرَوِّحُ عَنْ نَفْسِكَ؟", "How do you rest and relax?"]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(٦) هَلْ مُحَمَّدٌ قَلِقٌ بِسَبَبِ هذِهِ المُشْكِلَةِ؟", "نَعَمْ، هُوَ كَذلِكَ.", ["نَعَمْ، مُحَمَّدٌ قادِمٌ.", "نَعَمْ، هذِهِ مُشْكِلَةٌ."], "Is Muhammad worried because of this problem?"],
  ["(٧) لِماذا نَشْتَري بَيْتًا في الرّيفِ؟", "لِنَقْضِيَ فيهِ العُطْلَةَ.", ["نَشْتَري البَيْتَ.", "نَعَمْ، في الرّيفِ."], "Why do we buy houses in the countryside?"],
  ["(٨) مَتى تَخَرَّجْتَ في كُلِّيَّةِ العُلومِ؟", "مُنْذُ أَرْبَعِ سَنَواتٍ.", ["سَأَتَخَرَّجُ اليَوْمَ.", "تَخَرَّجْتُ في كُلِّيَّةِ العُلومِ."], "When did you graduate from the faculty of science?"],
  ["(٩) هَلْ سَتَعْمَلُ طَبيبًا مِثْلَ أَبيكَ، أَمْ طَيّارًا مِثْلَ أَخيكَ؟", "سَأَكونُ مِثْلَ أَبي.", ["نَعَمْ، أَبي طَبيبٌ.", "نَعَمْ، أَخي طَيّارٌ."], "Will you be a doctor like your father, or a pilot like your brother?"],
  ["(١٠) كَيْفَ تُرَوِّحُ عَنْ نَفْسِكَ؟", "سَأَقْضي العُطْلَةَ بَعيدًا عَنِ العَمَلِ.", ["سَأُرَوِّحُ عَنْ نَفْسي.", "نَعَمْ، سَأُحاوِلُ."], "How do you rest and relax?"]] },
 { t: "dinle", s: "nh3", ar: "ثالِثًا: اسْتَمِعْ إِلى الحِوارِ، ثُمَّ أَجِبْ عَمّا يَليهِ مِنَ الأَسْئِلَةِ", aciklama: "Four short dialogues.", metin: [
  ["(١١) — كَمْ عُمْرُ أَخيكَ عَبْدِ اللهِ؟ — عُمْري ٢٤ سَنَةً، وَهُوَ أَكْبَرُ مِنّي بِسِتِّ سَنَواتٍ.", "— How old is your brother ʿAbdullāh? — I am 24 years old, he is six years older than I."],
  ["(١٢) — ماذا تَعْمَلُ؟ — أَنا طالِبٌ الآنَ، وَبَعْدَ سَنَةٍ سَأَتَخَرَّجُ مِنْ كُلِّيَّةِ الطِّبِّ.", "— What do you do? — I am a student now; in a year I will graduate from the faculty of medicine."],
  ["(١٣) — الماءُ غَيْرُ نَظيفٍ هذِهِ الأَيّامَ. — عَلِمْتُ أَنَّ المَصانِعَ تُلْقي النُّفاياتِ في الأَنْهارِ.", "— The water is not clean these days. — I learned that the factories dump waste into the rivers."],
  ["(١٤) — ماذا أَفْعَلُ مَعَ يوسُفَ؟ فَهُوَ مُراهِقٌ، وَلا يَسْمَعُ كَلامي. — عامِلْهُ بِحِكْمَةٍ أَكْثَرَ؛ فَهُوَ يَشْعُرُ بِأَنَّهُ رَجُلٌ كَبيرٌ، وَلَيْسَ طِفْلًا.", "— What should I do with Yūsuf? He is in adolescence and does not listen to me. — Treat him with more wisdom; he feels like a grown man, not a child."]] },
 { t: "secim", ar: "أَجِبْ عَمّا يَلي", ogeler: [
  ["(١١) كَمْ عُمْرُ عَبْدِ اللهِ؟", "ثَلاثونَ سَنَةً", ["أَرْبَعٌ وَعِشْرونَ سَنَةً", "ثَماني عَشْرَةَ سَنَةً"], "How old is ʿAbdullāh?", "24 + 6 = 30"],
  ["(١٢) ماذا سَيَعْمَلُ الرَّجُلُ؟", "طَبيبًا", ["طالِبًا", "في كُلِّيَّةِ الطِّبِّ"], "What will the man do?"],
  ["(١٣) عَمَّ يَتَحَدَّثانِ؟", "عَنِ التَّلَوُّثِ", ["عَنِ النُّفاياتِ", "عَنِ المَصانِعِ"], "What are they talking about?"],
  ["(١٤) كَمْ عُمْرُ يوسُفَ؟", "سِتَّ عَشْرَةَ سَنَةً", ["عَشْرُ سَنَواتٍ", "أَرْبَعونَ سَنَةً"], "How old is Yūsuf?", "The age of adolescence."]],
  not: "Question 15 in the book (في أَيِّ شَهْرٍ حَصَلَ هذا الحِوارُ؟) has no dialogue in the recording; therefore it was not included." },
 { t: "dinle", s: "nh4", ar: "رابِعًا: اسْتَمِعْ إِلى كُلِّ فِقْرَةٍ، ثُمَّ أَجِبْ بِوَضْعِ عَلامَةِ (✓) أَوْ (✗) — الفِقْرَةُ الأولى", aciklama: "The first paragraph is read, then nine sentences.", metin: [
  ["ذَكَرَتِ الصُّحُفُ المَحَلِّيَّةُ صَباحَ اليَوْمِ، أَنَّ هُناكَ نُفاياتٍ مَدْفونَةً في الصَّحْراءِ الغَرْبِيَّةِ، وَتَعْتَقِدُ هذِهِ الصُّحُفُ أَنَّ هذِهِ النُّفاياتِ قَدْ وَصَلَتْ إِلى البِلادِ عَنْ طَريقِ البَحْرِ أَوَّلًا، ثُمَّ نَقَلَتْها شاحِناتٌ كَبيرَةٌ بَرًّا في اللَّيْلِ.", "The local newspapers this morning wrote that there is buried waste in the Western Desert; these newspapers think the waste first came to the country by sea, then big lorries carried it overland at night."],
  ["وَتَقولُ إِحْدى الصُّحُفِ: إِنَّ مَصْدَرَ هذِهِ النُّفاياتِ بَعْضُ الدُّوَلِ الصِّناعِيَّةِ الكُبْرى. وَقَدْ جاءَ في مَجَلَّةِ «الصِّحَّةُ وَالمُجْتَمَعُ» أَنَّ أَمْراضَ السَّرَطانِ كَثُرَتْ أَخيرًا في المَناطِقِ القَريبَةِ مِنَ الصَّحْراءِ الغَرْبِيَّةِ، وَقَدْ ماتَ في الأُسْبوعِ الماضي أَكْثَرُ مِنْ عَشَرَةِ أَشْخاصٍ، وَدَخَلَ أَكْثَرُ مِنْ أَرْبَعينَ شَخْصًا المُسْتَشْفَياتِ.", "One of the newspapers says that the source of this waste is some big industrial countries. In “Health and Society” magazine it was written that cancer diseases have recently multiplied in the regions near the Western Desert; last week more than ten people died, and more than forty were taken to hospitals."]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗)", ogeler: [
  ["(١) دُفِنَتِ النُّفاياتُ في الصَّحْراءِ.", true, "", "The waste was buried in the desert."],
  ["(٢) وَصَلَتِ النُّفاياتُ عَنْ طَريقِ البَرِّ وَالبَحْرِ.", true, "", "The waste came by land and sea."],
  ["(٣) نَقَلَتِ الحافِلاتُ النُّفاياتِ بَرًّا.", false, "نَقَلَتِ الشّاحِناتُ النُّفاياتِ بَرًّا.", "The buses carried the waste overland."],
  ["(٤) دُفِنَتِ النُّفاياتُ في اللَّيْلِ.", true, "", "The waste was buried at night."],
  ["(٥) مَصْدَرُ النُّفاياتِ بَعْضُ الدُّوَلِ الكُبْرى.", true, "", "The source of the waste is some big countries."],
  ["(٦) «الصِّحَّةُ وَالمُجْتَمَعُ» اسْمُ إِحْدى الصُّحُفِ المَحَلِّيَّةِ.", false, "«الصِّحَّةُ وَالمُجْتَمَعُ» اسْمُ مَجَلَّةٍ.", "“Health and Society” is the name of one of the local newspapers."],
  ["(٧) كَثُرَتْ أَمْراضُ السَّرَطانِ في المَناطِقِ الغَرْبِيَّةِ مِنَ الصَّحْراءِ.", false, "كَثُرَتْ أَمْراضُ السَّرَطانِ في المَناطِقِ القَريبَةِ مِنَ الصَّحْراءِ الغَرْبِيَّةِ.", "Cancer diseases have multiplied in the western regions of the desert."],
  ["(٨) عَدَدُ مَنْ ماتَ في الأُسْبوعِ الماضي عَشَرَةُ أَشْخاصٍ.", false, "ماتَ في الأُسْبوعِ الماضي أَكْثَرُ مِنْ عَشَرَةِ أَشْخاصٍ.", "The number of those who died last week is ten."],
  ["(٩) عَدَدُ المُصابينَ في المُسْتَشْفَياتِ أَكْثَرُ مِنْ أَرْبَعينَ شَخْصًا.", true, "", "The number of patients in the hospitals is more than forty."]] },
 { t: "dinle", s: "nh5", ar: "الفِقْرَةُ الثّانِيَةُ", aciklama: "The second paragraph is read, then six sentences.", metin: [
  ["مِنَ المُشْكِلاتِ الَّتي تُواجِهُها الأُسَرُ في العَصْرِ الحَديثِ، أَنَّ الأَبْناءَ لا يَسْمَعونَ كَلامَ الآباءِ. وَأَصْبَحَ الزَّواجُ مُشْكِلَةً؛ فَقَدْ كانَ الزَّواجُ في الماضي لا يُكَلِّفُ كَثيرًا، أَمّا الآنَ فَهُوَ يُكَلِّفُ كَثيرًا مِنَ المالِ.", "One of the problems families face in the modern age is that sons do not listen to their fathers. Marriage has also become a problem; formerly marriage did not cost much, now it costs a great deal of money."],
  ["عَلى خِلافِ ما كانَ عَلَيْهِ في الماضي، حَيْثُ كانَ الزَّواجُ سَهْلًا، وَكانَ الشَّبابُ يَتَزَوَّجونَ وَهُمْ صِغارٌ، أَمّا اليَوْمَ فَهُمْ يَتَزَوَّجونَ كِبارًا. وَبَعْضُ الشَّبابِ مِنَ الرِّجالِ وَالنِّساءِ يُفَضِّلونَ الحَياةَ دونَ زَواجٍ؛ لِأَنَّهُمْ يَعْتَقِدونَ أَنَّ الزَّواجَ مَسْؤولِيَّةٌ.", "Contrary to the past, when marriage was easy and young people married young, today they marry late. Some young men and women also prefer to live without marrying because they consider marriage a responsibility."],
  ["وَمِنْ ناحِيَةٍ أُخْرى كَثُرَ الطَّلاقُ؛ فَزادَتْ مُشْكِلاتُ الأُسَرِ، وَفَقَدَ الأَبْناءُ في كُلِّ أُسْرَةٍ الأَبَ أَوِ الأُمَّ.", "On the other hand divorce has increased; families' problems have grown and in every family the children lost the father or the mother."]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗)", ogeler: [
  ["(١٠) الزَّواجُ سَهْلٌ هذِهِ الأَيّامَ.", false, "كانَ الزَّواجُ سَهْلًا في الماضي.", "Marriage is easy these days."],
  ["(١١) الآباءُ لا يَسْمَعونَ كَلامَ الأَبْناءِ.", false, "الأَبْناءُ لا يَسْمَعونَ كَلامَ الآباءِ.", "Fathers do not listen to their sons."],
  ["(١٢) كانَ الشّابُّ في الماضي يَتَزَوَّجُ وَهُوَ صَغيرٌ.", true, "", "In the past a young man would marry young."],
  ["(١٣) كُلُّ الشَّبابِ يُفَضِّلونَ الحَياةَ دونَ زَواجٍ.", false, "بَعْضُ الشَّبابِ يُفَضِّلونَ الحَياةَ دونَ زَواجٍ.", "All young people prefer to live without marrying."],
  ["(١٤) كَثُرَ الطَّلاقُ في العَصْرِ الحَديثِ.", true, "", "Divorce has increased in the modern age."],
  ["(١٥) اعْتَقَدَ الشَّبابُ في الماضي أَنَّ الزَّواجَ مَسْؤولِيَّةٌ.", false, "يَعْتَقِدُ بَعْضُ الشَّبابِ اليَوْمَ أَنَّ الزَّواجَ مَسْؤولِيَّةٌ.", "In the past young people believed that marriage is a responsibility."]] }
]},
// ---------------- 2. OKUMA ----------------
{ no: 2, etiket: "Reading", kisa: "فَهْمُ المَقْروءِ", ar: "ثانِيًا: فَهْمُ المَقْروءِ", tr: "Reading", ozet: "Short paragraphs and a text; 30 questions", bloklar: [
 { t: "metin", baslik: "Short paragraphs (1)", ar: "اقْرَأِ العِبارَةَ أَوِ الفِقْرَةَ، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", paragraf: [
  [["في الحافِلَةِ رَقْمِ سِتّينَ خَمْسَةٌ وَعِشْرونَ مُسافِرًا، وَهذا العَدَدُ نِصْفُ ما تَحْمِلُهُ الحافِلَةُ عادَةً.", "There are twenty-five passengers on bus number 60; this number is half of what the bus usually carries."]],
  [["تَجْتَمِعُ الدُّوَلُ العَرَبِيَّةُ في هَيْئَةٍ سِياسِيَّةٍ واحِدَةٍ: هِيَ الجامِعَةُ العَرَبِيَّةُ. وَيَعيشُ في الوَطَنِ العَرَبِيِّ نَحْوُ ٢٥٠ مِلْيونَ شَخْصٍ، يَجْمَعُ بَيْنَهُمُ اللُّغَةُ وَالتّاريخُ وَالثَّقافَةُ؛ وَكُلُّهُمْ يَتَكَلَّمونَ اللُّغَةَ العَرَبِيَّةَ.", "The Arab countries are gathered in a single political institution: the Arab League. About 250 million people live in the Arab homeland; language, history and culture unite them; all of them speak Arabic."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١) كَمْ مُسافِرًا يُمْكِنُ أَنْ تَحْمِلَ الحافِلَةُ؟", "خَمْسينَ مُسافِرًا", ["سِتّينَ مُسافِرًا", "خَمْسَةً وَعِشْرينَ مُسافِرًا"], "How many passengers can the bus carry?", "25 is half the capacity: 25 × 2 = 50. (60 is the number of the bus.)"],
  ["(٢) المَوْضوعُ الرَّئيسُ في هذِهِ الفِقْرَةِ هُوَ …", "الدُّوَلُ العَرَبِيَّةُ", ["الدّينُ وَالتّاريخُ عِنْدَ العَرَبِ", "الهَيْئَةُ السِّياسِيَّةُ"], "The main subject of this paragraph …"],
  ["(٣) عَدَدُ سُكّانِ البِلادِ العَرَبِيَّةِ …", "قَريبًا مِنْ ٢٥٠ مِلْيونَ شَخْصٍ", ["مِئَةٌ وَخَمْسونَ مِلْيونَ شَخْصٍ", "قَريبًا مِنْ مِئَتَيْ مِلْيونِ شَخْصٍ"], "The population of the Arab countries is … ."],
  ["(٤) نَفْهَمُ مِنْ هذِهِ الفِقْرَةِ أَنَّ كُلَّ العَرَبِ …", "يَتَحَدَّثونَ لُغَةً واحِدَةً", ["مُسْلِمونَ", "يَجْتَمِعونَ في الجامِعَةِ العَرَبِيَّةِ"], "From this paragraph we understand that all Arabs … ."]] },
 { t: "metin", baslik: "Short paragraphs (2)", ar: "اقْرَأْ", paragraf: [
  [["السَّفَرُ مِنْ بَلَدٍ إِلى بَلَدٍ آخَرَ شَيْءٌ جَميلٌ. فَالشَّخْصُ يَسْمَعُ عَنْ بِلادٍ بَعيدَةٍ؛ في آسْيا وَإِفْريقيا وَأَمْريكا وَأوروبّا وَأُسْتُرالْيا. وَفي السَّفَرِ يَعْرِفُ الإِنْسانُ أَشْياءَ كَثيرَةً؛ يَعْرِفُ كَيْفَ يَعيشُ النّاسُ، وَإِذا عاشَ مَعَ النّاسِ في بَلَدٍ غَيْرِ بَلَدِهِ، سَيَعْرِفُ عَنْ ثَقافَتِهِمْ، فَيَعْرِفُ جانِبًا مِنْ ثَقافاتِ الأُمَمِ الأُخْرى، وَكَيْفَ يُفَكِّرُ الآخَرونَ، وَما طَبيعَةُ بِلادِهِمْ.", "Travelling from one country to another is a fine thing. A person hears of distant countries in Asia, Africa, America, Europe and Australia. In travel a person learns many things; he learns how people live. If he lives among people in a country other than his own, he comes to know their culture; he learns an aspect of the cultures of other nations, how others think and the nature of their countries."]],
  [["مِنْ أَهَمِّ المُشْكِلاتِ الَّتي يُواجِهُها السُّكّانُ في الرّيفِ في الوَقْتِ الحاضِرِ، أَنَّ فُرَصَ العَمَلِ قَليلَةٌ. وَيَعْمَلُ مُعْظَمُ السُّكّانِ في الزِّراعَةِ، أَوِ الرَّعْيِ، وَبَعْضِ الحِرَفِ الصَّغيرَةِ الأُخْرى. وَلِأَنَّ فُرَصَ العَمَلِ في المُدُنِ أَكْثَرُ، فَإِنَّ الشَّبابَ يُهاجِرونَ إِلَيْها، وَيَتْرُكونَ أَعْمالَ الزِّراعَةِ لِلشُّيوخِ وَالنِّساءِ، وَأَعْمالَ الرَّعْيِ لِلْأَطْفالِ.", "One of the most important problems facing those who live in the countryside today is the scarcity of job opportunities. Most people live by agriculture, animal husbandry and some small crafts. Because there are more job opportunities in the cities, the young migrate there; they leave farm work to the old and women, and shepherding to children."]],
  [["جاءَ إِلى المُسْتَشْفى سِتّونَ مَريضًا؛ عِشْرونَ مِنْهُمْ قابَلوا أَطِبّاءَ الأَسْنانِ، وَخَمْسَةَ عَشَرَ مَريضًا قابَلوا أَطِبّاءَ الأَنْفِ وَالأُذُنِ وَالحَنْجَرَةِ، وَقابَلَ الباقونَ أَطِبّاءَ القَلْبِ.", "Sixty patients came to the hospital; twenty of them went to the dentists, fifteen to the ear-nose-throat doctors, and the rest went to the heart doctors."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(٥) ما عُنْوانُ هذِهِ الفِقْرَةِ؟", "فَوائِدُ السَّفَرِ", ["حَياةُ النّاسِ", "بِلادُ العالَمِ"], "What is the title of this paragraph?"],
  ["(٦) ما عَدَدُ القارّاتِ المَذْكورَةِ هُنا؟", "خَمْسُ قارّاتٍ", ["أَرْبَعُ قارّاتٍ", "سِتُّ قارّاتٍ"], "How many continents are mentioned here?", "آسْيا، إِفْريقيا، أَمْريكا، أوروبّا، أُسْتُرالْيا"],
  ["(٧) يَعْرِفُ الإِنْسانُ أَشْياءَ كَثيرَةً عَنْ طَريقِ …", "السَّفَرِ", ["الأُمَمِ الأُخْرى", "الاسْتِماعِ"], "A person learns many things through … ."],
  ["(٨) كَيْفَ تَعْرِفُ ثَقافاتِ الآخَرينَ؟", "إِذا عِشْتَ مَعَهُمْ", ["إِذا دَرَسْتَ عَنْهُمْ", "إِذا سافَرْتَ مَعَهُمْ"], "How do you come to know the cultures of others?"],
  ["(٩) فُرَصُ العَمَلِ لِلشَّبابِ في الرّيفِ …", "قَليلَةٌ", ["كَثيرَةٌ", "طَيِّبَةٌ"], "Job opportunities for young people in the countryside … ."],
  ["(١٠) ما الأَعْمالُ الَّتي يَقومُ بِها الأَطْفالُ في الرّيفِ؟", "الرَّعْيُ", ["التَّسَوُّلُ", "الدِّراسَةُ"], "What jobs do children do in the countryside?"],
  ["(١١) يُهاجِرُ الشَّبابُ إِلى المُدُنِ …", "لِكَثْرَةِ فُرَصِ العَمَلِ فيها", ["لِأَنَّ الحَياةَ فيها مُمْتِعَةٌ", "لِأَنَّ الحَياةَ فيها سَهْلَةٌ"], "Young people migrate to the cities for … ."],
  ["(١٢) إِذا هاجَرَ الشَّبابُ إِلى المُدُنِ، فَمَنْ يَعْمَلُ بِالزِّراعَةِ؟", "النِّساءُ وَالشُّيوخُ", ["الشُّيوخُ وَالأَطْفالُ", "الأَطْفالُ وَالنِّساءُ"], "If young people migrate to the cities, who engages in agriculture?"],
  ["(١٣) كَمْ مَريضًا قابَلوا أَطِبّاءَ القَلْبِ؟", "خَمْسَةٌ وَعِشْرونَ مَريضًا", ["خَمْسونَ مَريضًا", "خَمْسَةَ عَشَرَ مَريضًا"], "How many patients went to the heart doctors?", "60 − 20 − 15 = 25"]] },
 { t: "metin", baslik: "Text", ar: "اقْرَأْ", paragraf: [
  [["أَصْبَحَ العالَمُ بِقارّاتِهِ السِّتِّ قَرْيَةً صَغيرَةً، وَازْدادَتْ مُشْكِلاتُ النّاسِ، عَلى الرَّغْمِ مِنَ التَّقَدُّمِ الَّذي وَصَلَ إِلَيْهِ الإِنْسانُ في كُلِّ المَجالاتِ. وَلَعَلَّ أَهَمَّ هذِهِ المَجالاتِ وَسائِلُ الاتِّصالِ الحَديثَةُ، مِثْلُ: التِّلْفازِ، وَالنّاسوخِ، وَالبَريدِ الإِلِكْتْرونِيِّ، وَالشَّبَكَةِ الدَّوْلِيَّةِ.", "With its six continents the world has become a small village; despite the progress man has reached in every field, people's problems have increased. Perhaps the most important of these fields is modern means of communication such as television, fax, e-mail and the internet."]],
  [["مِنْ فَوائِدِ هذِهِ الوَسائِلِ أَنَّها جَعَلَتِ البَعيدَ قَريبًا؛ فَإِذا حَدَثَ شَيْءٌ في أَيِّ مَكانٍ مِنَ العالَمِ، نَقَلَتْهُ الوَسائِلُ بِسُرْعَةٍ في الوَقْتِ نَفْسِهِ. فَالتِّلْفازُ يَنْقُلُ لَكَ الخَبَرَ بِالصَّوْتِ وَالصّورَةِ؛ وَالبَريدُ الإِلِكْتْرونِيُّ يُمِدُّكَ بِما تُريدُ مِنْ مَعْلوماتٍ، مِنْ أَيِّ مَكانٍ، وَفي أَقْرَبِ وَقْتٍ.", "One of the benefits of these means is that they bring the far near; if something happens anywhere in the world, these means transmit it at once at the same moment. Television transmits news with sound and picture; e-mail brings you any information you want from anywhere in the shortest time."]],
  [["مَعَ تَقَدُّمِ العالَمِ ظَهَرَتْ مُشْكِلَةُ العَوْلَمَةِ الَّتي يَدورُ حَوْلَها نِقاشٌ ساخِنٌ. وَمِنْ خِلالِ هذِهِ العَوْلَمَةِ سَوْفَ تُهَيْمِنُ بَعْضُ الثَّقافاتِ عَلى ثَقافاتٍ أُخْرى؛ فَالدُّوَلُ الغَنِيَّةُ الَّتي لَدَيْها قُوَّةٌ صِناعِيَّةٌ، أَوْ زِراعِيَّةٌ، سَتَفْرِضُ سِياساتِها وَلُغاتِها عَلى بَقِيَّةِ الدُّوَلِ، وَغالِبًا ما تَكونُ هذِهِ الدُّوَلُ مِنَ الدُّوَلِ الفَقيرَةِ الَّتي لا تَسْتَطيعُ أَنْ تَرْفُضَ ما تَطْلُبُهُ الدُّوَلُ الغَنِيَّةُ مِنْها؛ لِأَنَّ بَعْضَ هذِهِ الدُّوَلِ يَعْتَمِدُ عَلى المُساعَداتِ الَّتي تَأْخُذُها مِنَ الدُّوَلِ الغَنِيَّةِ.", "With the progress of the world the problem of globalization appeared, around which a heated discussion revolves. Through this globalization some cultures will dominate other cultures; rich countries with industrial or agricultural power will impose their policies and languages on other countries. These are often poor countries that cannot refuse the wishes of rich countries; because some of them depend on aid they receive from rich countries."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١٤) العالَمُ قَرْيَةٌ صَغيرَةٌ فيها … قارّاتٍ.", "سِتُّ", ["أَرْبَعُ", "خَمْسُ"], "The world is a small village with … continents."],
  ["(١٥) تَقَدَّمَ الإِنْسانُ وَ…", "ازْدادَتْ مُشْكِلاتُهُ", ["ازْدادَتْ سَعادَتُهُ", "تَأَخَّرَتْ حَياتُهُ"], "Man advanced and … ."],
  ["(١٦) أَهَمُّ مَجالٍ تَقَدَّمَ فيهِ الإِنْسانُ في هذا القَرْنِ هُوَ …", "وَسائِلُ الاتِّصالِ", ["وَسائِلُ النَّقْلِ", "النّاسوخُ"], "The most important field in which man has advanced in this century is … ."],
  ["(١٧) مِنْ أَهَمِّ وَسائِلِ الاتِّصالِ الحَديثَةِ …", "الحَواسيبُ", ["القِطاراتُ", "الطّائِراتُ"], "One of the most important modern means of communication is … .", "The e-mail and internet listed in the text are used with a computer; the other two options are means of transport."],
  ["(١٨) الشَّبَكَةُ الدَّوْلِيَّةُ جَعَلَتِ …", "البَعيدَ قَريبًا", ["القَريبَ بَعيدًا", "الصّورَةَ كَبيرَةً"], "The internet … ."],
  ["(١٩) الجِهازُ الَّذي يَنْقُلُ الصَّوْتَ وَالصّورَةَ هُوَ …", "التِّلْفازُ", ["النّاسوخُ", "البَريدُ الإِلِكْتْرونِيُّ"], "The device that transmits sound and picture is … ."],
  ["(٢٠) لِلْحُصولِ عَلى مَعْلوماتٍ سَريعَةٍ نَسْتَعْمِلُ …", "البَريدَ الإِلِكْتْرونِيَّ", ["الصُّحُفَ", "الكُتُبَ"], "To get information quickly we use … ."],
  ["(٢١) مِنَ المُشْكِلاتِ الَّتي يَتَحَدَّثُ عَنْها النّاسُ كَثيرًا …", "العَوْلَمَةُ", ["الجَريمَةُ", "الثَّقافَةُ"], "One of the problems people talk about a lot is … ."],
  ["(٢٢) الثَّقافَةُ الَّتي سَتُهَيْمِنُ عَلى بَقِيَّةِ الثَّقافاتِ هِيَ ثَقافَةُ …", "الدُّوَلِ الغَنِيَّةِ", ["القَرْيَةِ الصَّغيرَةِ", "النِّقاشِ"], "The culture that will dominate other cultures is the culture of … ."]] },
 { t: "dy", ar: "ضَعْ عَلامَةَ (✓) أَوْ (✗)", ogeler: [
  ["أَصْبَحَ العالَمُ بِقارّاتِهِ السِّتِّ دَوْلَةً واحِدَةً.", false, "أَصْبَحَ العالَمُ بِقارّاتِهِ السِّتِّ قَرْيَةً صَغيرَةً.", "The world became one state with its six continents."],
  ["تَقَدَّمَ الإِنْسانُ وَزادَتْ سَعادَتُهُ.", false, "تَقَدَّمَ الإِنْسانُ وَازْدادَتْ مُشْكِلاتُهُ.", "Man advanced and his happiness increased."],
  ["تُهَيْمِنُ بَعْضُ الثَّقافاتِ عَلى ثَقافاتٍ أُخْرى مِنْ خِلالِ العَوْلَمَةِ.", true, "", "Through globalization some cultures dominate others."],
  ["النّاسوخُ مِنْ وَسائِلِ النَّقْلِ الحَديثَةِ.", false, "النّاسوخُ مِنْ وَسائِلِ الاتِّصالِ الحَديثَةِ.", "The fax is among the modern means of transport."],
  ["الدُّوَلُ الَّتي تَفْرِضُ سِياساتِها هِيَ الدُّوَلُ ذاتُ القُوَّةِ.", true, "", "The countries that impose their policies are strong countries."],
  ["الدُّوَلُ الفَقيرَةُ تَرْفُضُ ما تَطْلُبُهُ الدُّوَلُ الغَنِيَّةُ.", false, "الدُّوَلُ الفَقيرَةُ لا تَسْتَطيعُ أَنْ تَرْفُضَ ما تَطْلُبُهُ الدُّوَلُ الغَنِيَّةُ.", "Poor countries refuse the wishes of rich countries."],
  ["كُلُّ الدُّوَلِ الفَقيرَةِ تَعْتَمِدُ عَلى المُساعَداتِ مِنَ الدُّوَلِ الغَنِيَّةِ.", false, "بَعْضُ الدُّوَلِ الفَقيرَةِ تَعْتَمِدُ عَلى المُساعَداتِ مِنَ الدُّوَلِ الغَنِيَّةِ.", "All poor countries depend on the aid of rich countries."],
  ["كُلُّ الشُّعوبِ تَقْبَلُ العَوْلَمَةَ.", false, "حَوْلَ العَوْلَمَةِ نِقاشٌ ساخِنٌ.", "All peoples accept globalization."]] }
]},
// ---------------- 3. KURALLAR ----------------
{ no: 3, etiket: "Rules", kisa: "القَواعِدُ", ar: "ثالِثًا: القَواعِدُ", tr: "Rules", ozet: "Correct verb, correct sentence, blank, error correction, rule questions", bloklar: [
 { t: "bosluk", ar: "أَوَّلًا: اكْتُبِ الفِعْلَ الصَّحيحَ مِمّا بَيْنَ القَوْسَيْنِ", ogeler: [
  ["___ أَخي إِلى مَكَّةَ قَبْلَ أُسْبوعٍ.", "سافَرَ", ["يُسافِرُ", "سَيُسافِرُ"], "My brother went to Mecca a week ago."],
  ["يا بُنَيَّ ___ هذا الدَّواءَ.", "اشْرَبْ", ["شَرِبَ", "يَشْرَبُ"], "My little son, drink this medicine."],
  ["لا ___ اليَوْمَ يا أَخي.", "تَذْهَبْ", ["ذَهَبَ", "يَذْهَبُ"], "My brother, do not go today."],
  ["يا مُحَمَّدُ ___ في الغُرْفَةِ.", "نَمْ", ["نامَ", "يَنامُ"], "Muhammad, sleep in the room."],
  ["تَخَرَّجَ الطّالِبُ وَلَمْ ___ عَمَلًا مُناسِبًا.", "يَجِدْ", ["وَجَدَ", "أَجِدُ"], "The student graduated but did not find a suitable job."],
  ["يَجِبُ أَنْ ___ الرِّياضَةَ كُلَّ يَوْمٍ.", "تُمارِسَ", ["تُمارِسُ", "تُمارِسْ"], "You must do sport every day."],
  ["نَحْنُ ___ مِنْ هذِهِ الدُّروسِ قَبْلَ ثَلاثَةِ أَيّامٍ.", "انْتَهَيْنا", ["انْتَهى", "انْتَهَوْا"], "We finished these lessons three days ago."],
  ["النّاسُ ___ عَنِ العَوْلَمَةِ.", "يَتَحَدَّثونَ", ["تَحَدَّثَ", "يَتَحَدَّثُ"], "People are talking about globalization."],
  ["يا فاطِمَةُ ___ هذا الكِتابَ.", "خُذي", ["خُذْ", "تَأْخُذُ"], "Fāṭima, take this book."],
  ["الأَبْناءُ لَمْ ___ مِنَ المَدْرَسَةِ.", "يَرْجِعوا", ["يَرْجِعُ", "يَرْجِعا"], "The sons did not return from school."]] },
 { t: "secim", ar: "ثانِيًا: ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الصَّحيحَةِ، وَعَلامَةَ (✗) بِجانِبِ الخَطَأِ", aciklama: "Choose the correct sentence in each pair.", ogeler: [
  ["(١) أَيُّهُما صَحيحَةٌ؟", "لِماذا جاءَ يوسُفُ؟", ["ماذا جاءَ يوسُفُ؟"], "Which is correct?"],
  ["(٢) أَيُّهُما صَحيحَةٌ؟", "تَزَوَّجَ عَلِيٌّ فاطِمَةَ.", ["تَزَوَّجَ عَلِيًّا فاطِمَةَ."], "Which is correct?"],
  ["(٣) أَيُّهُما صَحيحَةٌ؟", "لَمْ يُرْسِلْ مُحَمَّدٌ الرِّسالَةَ اليَوْمَ.", ["لا أَرْسَلَ مُحَمَّدٌ الرِّسالَةَ اليَوْمَ."], "Which is correct?"],
  ["(٤) أَيُّهُما صَحيحَةٌ؟", "فَحَصَ الطَّبيبُ المَريضَ.", ["فَحَصَ الطَّبيبَ المَريضُ."], "Which is correct?", "In the book the first sentence is printed «فَحَصَ الطَّبيبُ المَريضُ»; the correct form: subject nominative, object accusative."],
  ["(٥) أَيُّهُما صَحيحَةٌ؟", "الأَكْلُ كَثيرٌ اليَوْمَ.", ["الأَكْلُ كَثيرًا اليَوْمَ."], "Which is correct?", "The predicate is nominative."]] },
 { t: "bosluk", ar: "ثالِثًا: أَكْمِلِ الجُمَلَ التّالِيَةَ بِإِحْدى الكَلِماتِ المَذْكورَةِ", kutu: ["لا", "يا", "مَتى", "إِذا", "ذلِكَ"], ogeler: [
  ["___ تُسافِرُ إِلى بَلَدِكَ؟", "مَتى", null, "When do you go to your country?"],
  ["___ مُحَمَّدُ أَعْطِني هذا الكِتابَ.", "يا", null, "Muhammad, give me this book."],
  ["___ حَضَرْتَ مُبَكِّرًا، ذَهَبْتُ مَعَكَ.", "إِذا", null, "If you come early I will go with you."],
  ["___ كِتابٌ مُفيدٌ.", "ذلِكَ", null, "It is a useful book."]],
  not: "The لا in the box is given in excess." },
 { t: "secim", ar: "رابِعًا: صَحِّحِ الأَخْطاءَ في الكَلِماتِ الَّتي تَحْتَها خَطٌّ", aciklama: "Choose the correct form of the underlined word.", ogeler: [
  ["(١) أَخَذْتُ الكُتُبَ مِنَ [[الطّالِبانِ]].", "الطّالِبَيْنِ", ["الطّالِبونَ", "الطّالِبُ"], "I took the books from the two students."],
  ["(٢) جاءَ [[المُصَلّينَ]] إِلى المَسْجِدِ.", "المُصَلّونَ", ["المُصَلِّيانِ", "المُصَلّي"], "Those who pray came to the mosque."],
  ["(٣) الطُّلّابُ لَمْ [[يَكْتُبونَ]] الدَّرْسَ.", "يَكْتُبوا", ["يَكْتُبُ", "يَكْتُبْنَ"], "The students did not write the lesson."],
  ["(٤) قابَلْتُ [[أَبوكَ]] في الطَّريقِ.", "أَباكَ", ["أَبيكَ", "أَبُكَ"], "I met your father on the road."],
  ["(٥) هذانِ [[وَلَدَيْنِ]] نَشيطانِ.", "وَلَدانِ", ["وَلَدَيْنُ", "أَوْلادٌ"], "These are two hard-working children."],
  ["(٦) كانَ [[المُهَنْدِسينَ]] حاضِرينَ.", "المُهَنْدِسونَ", ["المُهَنْدِسانِ", "المُهَنْدِسَ"], "The engineers were present."],
  ["(٧) صَلّى المَريضُ [[جالِسٌ]].", "جالِسًا", ["جالِسٍ", "الجالِسُ"], "The patient prayed sitting."],
  ["(٨) لَدَيَّ اثْنا عَشَرَ [[دينارٌ]].", "دينارًا", ["دَنانيرَ", "دينارٍ"], "I have twelve dinars."],
  ["(٩) يا هِبَةُ لا [[تَذْهَبينَ]] إِلى السّوقِ اليَوْمَ.", "تَذْهَبي", ["تَذْهَبْ", "تَذْهَبينْ"], "Hiba, do not go to the market today."],
  ["(١٠) ماتَ في القَرْيَةِ [[أَرْبَعُ]] رِجالٍ هذا الأُسْبوعَ.", "أَرْبَعَةُ", ["أَرْبَعَةَ", "أَرْبَعٌ"], "This week four men died in the village.", "The numbers 3-10 come feminine with a masculine specification."]] },
 { t: "secim", ar: "خامِسًا: اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١) تُنْصَبُ الأَسْماءُ الخَمْسَةُ …", "بِالأَلِفِ", ["بِالفَتْحَةِ", "بِالياءِ"], "The five nouns are put in the accusative with … ."],
  ["(٢) يُرْفَعُ المُثَنّى …", "بِالأَلِفِ", ["بِالضَّمَّةِ", "بِالواوِ"], "The dual is put in the nominative with … ."],
  ["(٣) يُرْفَعُ جَمْعُ المُذَكَّرِ السّالِمُ …", "بِالواوِ", ["بِالضَّمَّةِ", "بِالأَلِفِ"], "The sound masculine plural is put in the nominative with … ."],
  ["(٤) تُنْصَبُ الأَفْعالُ الخَمْسَةُ …", "بِحَذْفِ النّونِ", ["بِالفَتْحَةِ", "بِالأَلِفِ"], "The five verbs are put in the subjunctive with … ."],
  ["(٥) يُجْزَمُ الفِعْلُ المُضارِعُ المُعْتَلُّ الآخِرِ …", "بِحَذْفِ حَرْفِ العِلَّةِ", ["بِالسُّكونِ", "بِحَذْفِ النّونِ"], "The imperfect with a weak ending is put in the jussive with … ."],
  ["(٦) يُنْصَبُ الفِعْلُ المُضارِعُ إِذا سُبِقَ بِـ…", "أَنْ وَلَنْ", ["أَنَّ وَإِنَّ", "لَمْ وَلا"], "If the imperfect verb is preceded by … it is subjunctive."],
  ["(٧) الحالُ اسْمٌ …", "نَكِرَةٌ مَنْصوبٌ", ["مَعْرِفَةٌ مَنْصوبٌ", "نَكِرَةٌ مَجْرورٌ"], "The circumstantial accusative is a … noun."],
  ["(٨) تَمْييزُ الأَعْدادِ مِنْ ١١ إِلى ١٩ يَكونُ …", "مُفْرَدًا مَنْصوبًا", ["مُفْرَدًا مَجْرورًا", "جَمْعًا مَجْرورًا"], "The specification of the numbers 11-19 is … ."],
  ["(٩) «إِنَّ» وَ«أَنَّ» حَرْفا تَوْكيدٍ …", "يَنْصِبانِ المُبْتَدَأَ وَيَرْفَعانِ الخَبَرَ", ["يَرْفَعانِ المُبْتَدَأَ وَيَنْصِبانِ الخَبَرَ", "يَنْصِبانِ المُبْتَدَأَ وَالخَبَرَ"], "إِنَّ and أَنَّ are particles of emphasis; … ."],
  ["(١٠) يُنْصَبُ جَمْعُ المُذَكَّرِ السّالِمُ بِـ…", "الياءِ", ["الفَتْحَةِ", "الأَلِفِ"], "The sound masculine plural is put in the accusative with … ."]] }
]},
// ---------------- 4. KELİMELER ----------------
{ no: 4, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "رابِعًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Singular-plural, antonyms and synonyms, headings", bloklar: [
 { t: "esle", ar: "أَوَّلًا: صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", aciklama: "Example: شَخْصٌ ← أَشْخاصٌ", ciftler: [
  ["أَمْرٌ", "أُمورٌ", "job, work"], ["شَرْطٌ", "شُروطٌ", "condition"], ["عَصْرٌ", "عُصورٌ", "age, era"], ["قَبيلَةٌ", "قَبائِلُ", "tribe"], ["امْرَأَةٌ", "نِساءٌ", "woman"],
  ["حادِثٌ", "حَوادِثُ", "incident, accident"], ["فائِدَةٌ", "فَوائِدُ", "benefit"], ["مَصْدَرٌ", "مَصادِرُ", "source"], ["حَرْبٌ", "حُروبٌ", "war"], ["نَصيحَةٌ", "نَصائِحُ", "advice"]] },
 { t: "bosluk", ar: "ثانِيًا: أَكْمِلْ بِوَضْعِ المُقابِلِ (المُضادِّ) لِلْكَلِمَةِ الَّتي تَحْتَها خَطٌّ في الفَراغِ", ogeler: [
  ["لا تَقُلْ هذا [[حَلالٌ]] وَهذا ___ وَأَنْتَ لا تَعْرِفُ.", "حَرامٌ", ["طَيِّبٌ", "واجِبٌ"], "Do not say “this is lawful, this is forbidden” without knowledge."],
  ["أَبي يَسْكُنُ في [[القَرْيَةِ]]، وَأَنا أَسْكُنُ مَعَ أَخي في ___.", "المَدينَةِ", ["الرّيفِ", "البادِيَةِ"], "My father lives in the village, I live with my brother in the city."],
  ["الدُّوَلُ الغَنِيَّةُ [[قَوِيَّةٌ]]، وَالدُّوَلُ الفَقيرَةُ ___.", "ضَعيفَةٌ", ["كَبيرَةٌ", "كَثيرَةٌ"], "Rich countries are strong, poor countries are weak."],
  ["[[انْخَفَضَتْ]] أَسْعارُ النِّفْطِ وَ___ أَسْعارُ الوَقودِ.", "ارْتَفَعَتْ", ["قَلَّتْ", "نَقَصَتْ"], "Oil prices fell, fuel prices rose."],
  ["ماءُ النَّهْرِ ___ وَماءُ البَحْرِ [[مالِحٌ]].", "عَذْبٌ", ["بارِدٌ", "كَثيرٌ"], "River water is fresh, sea water is salty."],
  ["___ أَبو بَكْرٍ الصِّدّيقُ في مَكَّةَ، وَ[[ماتَ]] في المَدينَةِ.", "وُلِدَ", ["عاشَ", "سافَرَ"], "Abū Bakr al-Ṣiddīq was born in Mecca and died in Medina."],
  ["أَشْعُرُ [[بِالاطْمِئْنانِ]] في المَسْجِدِ، وَأَشْعُرُ ___ في السّوقِ.", "بِالخَوْفِ", ["بِالرّاحَةِ", "بِالسَّعادَةِ"], "I feel calm in the mosque, fear in the market."],
  ["[[السَّعيدُ]] مَنْ وَفَّقَهُ اللهُ، وَ___ مَنْ ظَلَمَ نَفْسَهُ.", "الشَّقِيُّ", ["الغَنِيُّ", "الفَقيرُ"], "The happy one is the one whom God makes successful; the wretched is the one who wrongs himself."],
  ["[[أَنْفَقَ]] الرَّجُلُ كُلَّ مالِهِ، وَلَمْ ___ مِنْهُ شَيْئًا.", "يَدَّخِرْ", ["يُعْطِ", "يَبِعْ"], "The man spent all his wealth, he saved nothing of it."],
  ["قَرَأْتُ كُلَّ الصُّحُفِ [[المَحَلِّيَّةِ]]، وَبَعْضَ المَجَلّاتِ ___.", "الأَجْنَبِيَّةِ", ["اليَوْمِيَّةِ", "الإِسْلامِيَّةِ"], "I read all the local newspapers and some foreign magazines."]] },
 { t: "esle", ar: "ثالِثًا: صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ لَهُما مَعْنًى واحِدٌ", ciftler: [
  ["غَرَسَ", "زَرَعَ", "he planted"], ["أَصْحابٌ", "أَصْدِقاءُ", "companions"], ["أَماكِنُ", "أَنْحاءٌ", "places"], ["سَنَةٌ", "عامٌ", "year"], ["تَلاميذُ", "طُلّابٌ", "students"],
  ["ازْدادَ", "كَثُرَ", "it increased, it multiplied"], ["إِنْسانٌ", "شَخْصٌ", "person, human being"], ["يَعْرِفُ", "يَدْري", "he knows"], ["أَوْلادٌ", "أَبْناءٌ / بَناتٌ", "children"], ["عادَ", "رَجَعَ", "returned"]] },
 { t: "secim", ar: "رابِعًا: اكْتُبْ كَلِمَةً واحِدَةً تُعَبِّرُ عَنْ كُلِّ مَجْموعَةٍ مِنَ الكَلِماتِ", aciklama: "Choose the word that best describes each group.", ogeler: [
  ["شُرْطَةٌ - سِجْنٌ - قَوانينُ - عِقابٌ", "الأَمْنُ", ["التَّلَوُّثُ", "الطّاقَةُ"], "police - prison - laws - punishment"],
  ["عِماراتٌ - مَصارِفُ - مَصانِعُ - مَتاحِفُ", "المَدينَةُ", ["الرّيفُ", "الصَّحْراءُ"], "buildings - banks - factories - museums"],
  ["كُتُبٌ - عُلَماءُ - دُكْتوراه - مَعاهِدُ", "العِلْمُ", ["التِّجارَةُ", "الرِّياضَةُ"], "books - scholars - doctorate - institutes"],
  ["الأُرْدِيَّةُ - السَّواحِلِيَّةُ - الإِسْبانِيَّةُ - العَرَبِيَّةُ", "اللُّغاتُ", ["الدُّوَلُ", "الأَدْيانُ"], "Urdu - Swahili - Spanish - Arabic"],
  ["أَخْطارٌ - تَصَحُّرٌ - سَرَطانٌ - إِحْراقٌ", "التَّلَوُّثُ", ["الأَمْنُ", "العَوْلَمَةُ"], "dangers - desertification - cancer - burning"]] },
 { t: "siniflandir", ar: "خامِسًا: ضَعِ الكَلِماتِ الآتِيَةَ تَحْتَ العُنْوانِ المُناسِبِ", soru: "Which title?", gruplar: ["الهِواياتُ", "الحَياةُ الزَّوْجِيَّةُ", "العِنايَةُ بِالصِّحَّةِ", "الطّاقَةُ", "أَجْهِزَةٌ"], ogeler: [
  ["السِّباحَةُ", 0], ["طَلاقٌ", 1], ["أَدْوِيَةٌ", 2], ["وَقودٌ", 3], ["الفُروسِيَّةُ", 0], ["كَهْرَباءُ", 3], ["أَسْنانٌ", 2], ["بَرْميلٌ", 3], ["حِمْيَةٌ", 2], ["نِفْطٌ", 3],
  ["مِذْياعٌ", 4], ["أَطِبّاءُ", 2], ["المُراسَلَةُ", 0], ["زَواجٌ", 1], ["غَسّالَةٌ", 4], ["جَمْعُ الطَّوابِعِ", 0], ["حاسوبٌ", 4], ["الرِّياضَةُ", 0], ["خِلافاتٌ", 1],
  ["تَدْفِئَةٌ", 3], ["مِكْنَسَةٌ", 4], ["نِساءٌ", 1], ["أَمْراضٌ", 2], ["أَطْفالٌ", 1], ["هاتِفٌ", 4]] }
]},
// ---------------- 5. YAZI ----------------
{ no: 5, etiket: "Writing", kisa: "الكِتابَةُ", ar: "خامِسًا: الكِتابَةُ", tr: "Writing", ozet: "Arranging words and sentences, spelling, writing from a picture", bloklar: [
 { t: "sirala", ar: "أَوَّلًا: رَتِّبْ كَلِماتِ كُلِّ سَطْرٍ لِتُصْبِحَ جُمَلًا", aciklama: "(١) الهَنْدَسَةِ - لَيْسَتْ - في - المُشْكِلَةُ - دِراسَةِ", ogeler: ["لَيْسَتِ", "المُشْكِلَةُ", "في", "دِراسَةِ", "الهَنْدَسَةِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٢) السّوقِ - العَسَلَ - مِنَ - أَشْتَري", ogeler: ["أَشْتَري", "العَسَلَ", "مِنَ", "السّوقِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٣) المَلْبَسِ - بِنَظافَةِ - المُسْلِمُ - يَهْتَمُّ", ogeler: ["يَهْتَمُّ", "المُسْلِمُ", "بِنَظافَةِ", "المَلْبَسِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "(٤) نَجَحَ - أَعْتَقِدُ - أُسْلوبَنا - أَنَّ", ogeler: ["أَعْتَقِدُ", "أَنَّ", "أُسْلوبَنا", "نَجَحَ"] },
 { t: "sirala", ar: "ثانِيًا: رَتِّبِ الجُمَلَ التّالِيَةَ لِتَصيرَ فِقْرَةً", aciklama: "Arrange the sentences to form a meaningful paragraph.", ogeler: ["الْتَحَقْتُ بِالجامِعَةِ قَبْلَ أَرْبَعِ سَنَواتٍ.", "وَبَعْدَما تَخَرَّجْتُ، بَحَثْتُ عَنْ عَمَلٍ مُناسِبٍ.", "وَعِنْدَما لَمْ أَجِدِ العَمَلَ المُناسِبَ،", "عَمِلْتُ في هذا المَطْعَمِ."] },
 { t: "secim", ar: "ثالِثًا: الكَلِماتُ الَّتي تَحْتَها خَطٌّ كُتِبَتْ خَطَأً، صَحِّحْها", aciklama: "Choose the correct spelling.", ogeler: [
  ["(١) [[ذالِكَ]] الكِتابُ لا رَيْبَ فيهِ.", "ذلِكَ", ["ذالِكَ", "ذالِك"], "There is no doubt in that book.", "The alif that is read but not written."],
  ["(٢) [[إِسْمي]] مُحَمَّدُ بْنُ عَبْدِ اللهِ.", "اسْمي", ["إِسْمي", "أَسْمي"], "My name is Muhammad ibn ʿAbdullāh.", "The connecting hamza is not written."],
  ["(٣) سَلامٌ عَلى [[ابراهيمَ]].", "إِبْراهيمَ", ["ابراهيمَ", "اِبْراهيمَ"], "Peace be upon Ibrāhīm.", "The cutting hamza is written."],
  ["(٤) [[عَمّا]] تَتَحَدَّثونَ؟", "عَمَّ", ["عَمّا", "عَنْ ما"], "What are you talking about?", "The interrogative mā loses its alif after a preposition."],
  ["(٥) حَضَرَتِ [[المُهَنْدِساةُ]].", "المُهَنْدِساتُ", ["المُهَنْدِساةُ", "المُهَنْدِسَةُ"], "The women engineers came."],
  ["(٦) [[هاذا]] صَديقي عُمَرُ.", "هذا", ["هاذا", "هاذَى"], "This is my friend ʿUmar."],
  ["(٧) هَلْ وَصَلَ [[الرُّأَساءُ]]؟", "الرُّؤَساءُ", ["الرُّأَساءُ", "الرُّءَساءُ"], "Have the chairmen come?"],
  ["(٨) القُرْآنُ كِتابٌ [[نَقْرَأُهُ]] كَثيرًا.", "نَقْرَؤُهُ", ["نَقْرَأُهُ", "نَقْرَءُهُ"], "The Qur'an is a book we read often."]] },
 { t: "resim", ar: "رابِعًا: قارِنْ بَيْنَ عَمَلِ النّاسِ في الماضي وَعَمَلِهِمْ في العَصْرِ الحَديثِ. اكْتُبْ أَرْبَعَ جُمَلٍ عَنْ كُلِّ صورَةٍ", aciklama: "First write it yourself; then look at the sample sentences.", resimler: [
  ["firin", "يَعْمَلُ هذا الرَّجُلُ في مَخْبَزٍ صَغيرٍ. يَصْنَعُ الخُبْزَ بِيَدَيْهِ. يَجْلِسُ عَلى الأَرْضِ، وَيَعْمَلُ ساعاتٍ طَويلَةً. عَمَلُهُ مُتْعِبٌ، وَلكِنَّهُ يَكْسِبُ مِنْ عَمَلِ يَدِهِ.", "Work in the past"],
  ["buro", "يَعْمَلُ هذا الرَّجُلُ في مَكْتَبٍ حَديثٍ. يَسْتَعْمِلُ الحاسوبَ وَالهاتِفَ. يَتَّصِلُ بِالنّاسِ وَيُرْسِلُ الرَّسائِلَ بِالبَريدِ الإِلِكْتْرونِيِّ. يُنْجِزُ عَمَلَهُ بِسُرْعَةٍ وَسُهولَةٍ.", "Work in the modern age"]] }
]}
];
var KELIME = [];
