// ================= VERİ: el-Arabiyyetü beyne yedeyk 2, 4. ünite — الحَياةُ في المَدينَةِ =================
// Bloklar k2ortak/uygulama.js içinde çizilir. Asıl kayıt parçaları: zaman.js (ZAMAN); kaydı olmayan metinler gömülü okunuşla çalar.
var UNITE = { no: 4, ar: "الحَياةُ في المَدينَةِ", tr: "City Life", pfx: "k2u4:",
  giris: "Unit 4: between village and city, the attraction and problems of big cities, the road to the university, the big cities of the world. Grammar: conjunctions, the direct object, subject and predicate, the kinds of verb (past, imperfect, imperative)." };
var DERSLER = [
// ---------------- DERS 40 ----------------
{ no: 40, kisa: "بَيْنَ القَرْيَةِ وَالمَدينَةِ", ar: "بَيْنَ القَرْيَةِ وَالمَدينَةِ", tr: "Between Village and City", ozet: "Dialogue: the mother wants to move to the capital, the father does not want to leave his village.", bloklar: [
 { t: "diyalog", resim: ["madina", "qarya"], kisiler: [{ ar: "الأُمُّ", tr: "Mother" }, { ar: "الأَبُ", tr: "Father" }], satir: [
  [0, "يا أَبا عَمْرٍو، ما رَأْيُكَ، نَتْرُكُ القَرْيَةَ، وَنَسْكُنُ في العاصِمَةِ؟", "Abū ʿAmr, what do you say, shall we leave the village and live in the capital?", "d40-0"],
  [1, "لَنا بَيْتٌ في القَرْيَةِ، وَلَيْسَ لَنا بَيْتٌ في العاصِمَةِ. لِماذا نَتْرُكُ بَيْتَنا، وَنَرْحَلُ إِلى هُناكَ؟!", "We have a house in the village, we have no house in the capital. Why should we leave our house and move there?!", "d40-1"],
  [0, "أَوْلادُنا يَعيشونَ في العاصِمَةِ. حُسَيْنٌ يَدْرُسُ في الجامِعَةِ، وَمُحْسِنَةُ تَدْرُسُ في كُلِّيَّةِ المُعَلِّماتِ، وَحَسّانُ يَعْمَلُ في شَرِكَةٍ هُناكَ.", "Our children live in the capital. Husayn studies at the university, Muḥsina at the girls' teacher-training school, and Ḥassān works there at a company.", "d40-2"],
  [1, "هَلْ نَتْرُكُ مَزْرَعَتَنا يا أُمَّ عَمْرٍو؟! سَيَموتُ الزَّرْعُ وَالشَّجَرُ.", "Shall we leave our farm, Umm ʿAmr?! The crops and the trees will die.", "d40-3"],
  [0, "أَنا خائِفَةٌ عَلى أَوْلادي. الحَوادِثُ كَثيرَةٌ في العاصِمَةِ.", "I fear for my children. There are many accidents in the capital.", "d40-4"],
  [1, "أَنا لا أُحِبُّ العاصِمَةَ. أَنا أُحِبُّ بَيْتي وَمَزْرَعَتي.", "I do not like the capital. I love my house and my farm.", "d40-5"],
  [0, "أَنا لا أُحِبُّ العاصِمَةَ أَيْضًا، فَهُناكَ التَّلَوُّثُ، وَالضَّوْضاءُ، وَالازْدِحامُ.", "I do not like the capital either; there is pollution, noise and crowding there.", "d40-6"],
  [1, "وَفي القَرْيَةِ الأَهْلُ وَالجيرانُ.", "But in the village there are relatives and neighbours.", "d40-7"],
  [0, "هذا حَقٌّ، وَلكِنَّكَ مَريضٌ، وَأَنا مَريضَةٌ أَيْضًا. نَحْنُ نَحْتاجُ إِلى أَوْلادِنا.", "That is true; but you are ill and I am ill. We need our children.", "d40-8"],
  [1, "وَهُمْ يَحْتاجونَ إِلَيْنا أَيْضًا.", "They need us too.", "d40-9"],
  [0, "نَبيعُ البَيْتَ وَالمَزْرَعَةَ، وَنَشْتَري بَيْتًا في العاصِمَةِ.", "Let us sell the house and the farm and buy a house in the capital.", "d40-10"],
  [1, "سَأَطْلُبُ مِنَ الأَوْلادِ أَنْ يَشْتَروا لَنا بَيْتًا هُناكَ.", "I will ask the children to buy us a house there.", "d40-11"],
  [0, "جَزاكَ اللهُ خَيْرًا يا أَبا عَمْرٍو.", "May God reward you with good, Abū ʿAmr.", "d40-12"]],
  not: "Among the Arabs husband and wife call each other by the name of their eldest child: أَبو عَمْرٍو (Amr's father), أُمُّ عَمْرٍو (Amr's mother)." },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["أَبو عَمْرٍو يُحِبُّ أَنْ يَتْرُكَ القَرْيَةَ.", false, "أَبو عَمْرٍو لا يُحِبُّ أَنْ يَتْرُكَ القَرْيَةَ.", "Abū ʿAmr wants to leave the village."],
  ["لِلْأُسْرَةِ بَيْتٌ في العاصِمَةِ.", false, "لَيْسَ لِلْأُسْرَةِ بَيْتٌ في العاصِمَةِ.", "The family has a house in the capital."],
  ["لِلْأُسْرَةِ ثَلاثَةُ أَوْلادٍ.", true, "", "The family has three children."],
  ["الأَبُ وَالأُمُّ مَريضانِ.", true, "", "The father and mother are ill."],
  ["سَتَشْتَري الأُسْرَةُ بَيْتًا في القَرْيَةِ.", false, "سَيَشْتَري الأَوْلادُ لِلْأُسْرَةِ بَيْتًا في العاصِمَةِ.", "The family will buy a house in the village."]] },
 { t: "sirala", ar: "التَّدْريبُ (٢): رَتِّبِ الجُمَلَ التّالِيَةَ كَما وَرَدَتْ في الحِوارِ", ogeler: [
  "لِلْأُسْرَةِ ثَلاثَةُ أَوْلادٍ يَعيشونَ في العاصِمَةِ.", "الأُمُّ خائِفَةٌ عَلى أَوْلادِها في العاصِمَةِ.", "سَيَبيعُ الأَبُ البَيْتَ وَالمَزْرَعَةَ.", "سَيَشْتَري الأَوْلادُ بَيْتًا لِلْأُسْرَةِ في العاصِمَةِ."] },
 { t: "bosluk", ar: "مُفْرَداتٌ — التَّدْريبُ (١): ضَعِ الكَلِماتِ المُشْتَقَّةَ مِنْ مادَّةِ (د ر س) في الأَماكِنِ المُناسِبَةِ", aciklama: "Words: مَدْرَسَةٌ، مُدَرِّسٌ، دِراسَةٌ، يَدْرُسُ، مُدَرِّسَةٌ", ogeler: [
  ["كَمْ تِلْميذًا في هذِهِ الـ___؟", "مَدْرَسَةِ", ["دِراسَةِ", "مُدَرِّسِ"], "How many students are there in this school?"], ["أُفَضِّلُ ___ الطِّبِّ.", "دِراسَةَ", ["مَدْرَسَةَ", "مُدَرِّسَ"], "I prefer to study medicine."], ["أَيْنَ ___ أَخوكَ؟", "يَدْرُسُ", ["دِراسَةُ", "مَدْرَسَةُ"], "Where does your brother study?"],
  ["أُخْتي ___ في كُلِّيَّةِ المُعَلِّماتِ.", "مُدَرِّسَةٌ", ["مُدَرِّسٌ", "دِراسَةٌ"], "My sister is a teacher at the girls' teacher-training school."], ["ماذا ___ هذا المُعَلِّمُ؟", "يُدَرِّسُ", ["مَدْرَسَةُ", "دِراسَةُ"], "What is this teacher teaching?"], ["والِدي ___ في الجامِعَةِ.", "مُدَرِّسٌ", ["مُدَرِّسَةٌ", "مَدْرَسَةٌ"], "My father is a professor at the university."]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): امْلَأِ الفَراغَ بِالحَرْفِ المُناسِبِ مِنَ الصُّنْدوقِ", kutu: ["في", "إِلى"], ogeler: [
  ["أَسْكُنُ ___ شَقَّةٍ.", "في", null, "I live in an apartment."], ["رَحَلَتِ الأُسْرَةُ ___ المَدينَةِ.", "إِلى", null, "The family moved to the city."], ["___ أَيِّ جامِعَةٍ تَدْرُسُ؟", "في", null, "Which university do you study at?"],
  ["أَحْتاجُ ___ ماءٍ بارِدٍ.", "إِلى", null, "I need cold water."], ["يَعيشُ أَخي ___ القَرْيَةِ.", "في", null, "My brother lives in the village."], ["___ أَيْنَ تُسافِرُ؟", "إِلى", null, "Where are you travelling to?"]] }
]},
// ---------------- DERS 41 ----------------
{ no: 41, kisa: "ـِي / ـَيْ", ar: "الأَصْواتُ: ياءُ المَدِّ، وَياءُ اللّينِ", tr: "Sounds: the long yāʾ and the soft yāʾ", ozet: "Distinguish the sounds ـِي (ī) and ـَيْ (ay).", bloklar: [
 { t: "kural", metin: "ياءُ المَدِّ (ـِي) ساكِنَةٌ قَبْلَها كَسْرَةٌ، فَيُمَدُّ بِها الصَّوْتُ؛ وَياءُ اللّينِ (ـَيْ) ساكِنَةٌ قَبْلَها فَتْحَةٌ.", tr: "The long yāʾ (ـِي = ī) is quiescent and preceded by kasra; the sound is prolonged. The soft yāʾ (ـَيْ = ay) is also quiescent but preceded by fatḥa.", not: "There is no original recording for this lesson; the words and sentences play with the embedded reading." },
 { t: "tablo", bas: ["ـِي", "ـَيْ", "ـِي", "ـَيْ"], satir: [["سِير", "سَيْر", "دِين", "دَيْن"], ["بِيع", "بَيْع", "عِير", "عَيْر"], ["مِيل", "مَيْل", "نِيل", "نَيْل"]],
  not: "Touch a word and listen: ـِي is read as a long “ī”, while ـَيْ is read as “ay”." },
 { t: "sessec", ar: "التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) بِجانِبِ الكَلِمَةِ الَّتي تَسْمَعُها", ogeler: [
  ["بِيت", "بَيْت"], ["صِيد", "صَيْد"], ["خِيط", "خَيْط"], ["زِيد", "زَيْد"], ["شِيب", "شَيْب"], ["شِين", "شَيْن"], ["رِيب", "رَيْب"], ["قِيس", "قَيْس"], ["عِيب", "عَيْب"], ["قِيد", "قَيْد"]] },
 { t: "tekrar", tts: false, ar: "التَّدْريبُ (٢): اسْتَمِعْ، ثُمَّ أَعِدْ", aciklama: "Read the verses; pay attention to the difference between ـِي and ـَيْ (there is no recording of these verses).", ogeler: [
  ["﴿وَرَاوَدَتْهُ الَّتِي هُوَ فِي بَ[[يْ]]تِهَا عَنْ نَفْسِهِ﴾ (يوسف: ٢٣)", "The woman in whose house he was sought to seduce him."],
  ["﴿سَلْ بَنِي إِسْرَائِيلَ كَمْ آتَيْنَاهُمْ مِنْ آيَةٍ بَ[[يِّ]]نَةٍ﴾ (البقرة: ٢١١)", "Ask the Children of Israel: how many clear signs We gave them."],
  ["﴿لَا يَزَالُ بُنْيَانُهُمُ الَّذِي بَنَوْا رِ[[ي]]بَةً فِي قُلُوبِهِمْ﴾ (التوبة: ١١٠)", "The building they built will remain a constant source of doubt in their hearts."],
  ["﴿يُوقَدُ مِنْ شَجَرَةٍ مُبَارَكَةٍ زَ[[يْ]]تُونَةٍ لَا شَرْقِ[[يَّ]]ةٍ وَلَا غَرْبِ[[يَّ]]ةٍ﴾ (النور: ٣٥)", "It is lit from a blessed olive tree, neither of the east nor of the west."],
  ["﴿غَ[[يْ]]رِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّ[[ي]]نَ﴾ (الفاتحة: ٧)", "Not the path of those who have incurred anger, nor of those who are astray."]] },
 { t: "siniflandir", ar: "ـِي أَمْ ـَيْ؟", soru: "Long yāʾ or soft yāʾ?", gruplar: ["ياءُ المَدِّ (ـِي)", "ياءُ اللّينِ (ـَيْ)"], ogeler: [
  ["دِين", 0], ["بَيْت", 1], ["نِيل", 0], ["غَيْر", 1], ["كَبِير", 0], ["زَيْت", 1], ["جَمِيل", 0], ["صَيْف", 1]] }
]},
// ---------------- DERS 42 ----------------
{ no: 42, kisa: "حُروفُ العَطْفِ", ar: "حُروفُ العَطْفِ", tr: "Conjunction particles", ozet: "وَ، فَـ، ثُمَّ، أَوْ: the word after them follows the preceding one in case.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "مِنْ حُروفِ العَطْفِ: الواوُ، الفاءُ، ثُمَّ، أَوْ. وَهِيَ تَعْطِفُ ما بَعْدَها عَلى ما قَبْلَها، فَيَتْبَعُهُ في إِعْرابِهِ.", tr: "Some of the conjunction particles: وَ (and), فَـ (immediately after), ثُمَّ (then, after some time has passed), أَوْ (or). They connect the word after them to the preceding one; the conjoined word (maʿṭūf) follows the preceding one in case.", not: "فَـ shows order and immediate succession, while ثُمَّ shows order and that time passes in between." },
 { t: "ornek", ar: "ادْرُسْ وَلاحِظْ", ogeler: [
  ["التَّلَوُّثُ [[وَ]]الجَريمَةُ [[وَ]]الازْدِحامُ مِنْ مُشْكِلاتِ المُدُنِ.", "Pollution, crime and crowding are among the problems of cities."], ["تَكْثُرُ في المُدُنِ الشَّرِكاتُ [[وَ]]الجامِعاتُ [[وَ]]الأَسْواقُ.", "In cities there are many companies, universities and markets."],
  ["أَدْرَكَتْ بَعْضُ الدُّوَلِ المُشْكِلَةَ، [[فَ]]بَنَتِ المَصانِعَ.", "Some states noticed the problem and at once established factories."], ["اشْرَبْ شايًا، [[أَوْ]] قَهْوَةً عِنْدَ أَخيكَ.", "Drink tea or coffee at your brother's."],
  ["صَلّى عَدْنانُ الظُّهْرَ، [[ثُمَّ]] العَصْرَ.", "ʿAdnān prayed the noon prayer, then the afternoon prayer."], ["سافَرْتُ إِلى القَرْيَةِ، [[فَ]]المَدينَةِ.", "I went to the village, then to the city."]] },
 { t: "acik", ar: "تَدْريبٌ: ضَعْ مَعْطوفًا مُناسِبًا وَاضْبِطْهُ بِالشَّكْلِ، كَما في المِثالِ", aciklama: "Example: لَدَيَّ قَلَمٌ، وَكِتابٌ. The conjoined word takes the same vowel as the preceding one.", ogeler: [
  ["دَخَلَ الطُّلّابُ، فَـ…", "دَخَلَ الطُّلّابُ، فَالمُدَرِّسُ.", "The students entered, and immediately after …"], ["أُغْمِيَ عَلَيَّ، ثُمَّ … بَعْدَ ساعَةٍ.", "أُغْمِيَ عَلَيَّ، ثُمَّ أَفَقْتُ بَعْدَ ساعَةٍ.", "I fainted, then an hour later …"],
  ["ابْتَعِدْ عَنِ السُّكَّرِ، وَ…", "ابْتَعِدْ عَنِ السُّكَّرِ، وَالنَّشَوِيّاتِ.", "Keep away from sugar and …"], ["كُلْ مَوْزًا، أَوْ …", "كُلْ مَوْزًا، أَوْ تُفّاحًا.", "Eat a banana or …"],
  ["أَدْرُسُ الهَنْدَسَةَ، وَ…", "أَدْرُسُ الهَنْدَسَةَ، وَالطِّبَّ.", "I study engineering and …"], ["يَحْمِلُ النّاسُ مَعَهُمْ إِلى البَرِّ خِيامًا، وَ…", "يَحْمِلُ النّاسُ مَعَهُمْ إِلى البَرِّ خِيامًا، وَطَعامًا.", "People take a tent and … to the countryside."],
  ["يُفَضِّلُ بَعْضُ النّاسِ الرِّياضَةَ، أَوْ …", "يُفَضِّلُ بَعْضُ النّاسِ الرِّياضَةَ، أَوِ القِراءَةَ.", "Some people prefer sport or …"], ["التَّرْويحُ مُفيدٌ لِلْجِسْمِ، وَ…", "التَّرْويحُ مُفيدٌ لِلْجِسْمِ، وَالعَقْلِ.", "Rest is useful for the body and …"],
  ["عَلِّموا أَوْلادَكُمُ السِّباحَةَ، وَ… وَ… الخَيْلِ.", "عَلِّموا أَوْلادَكُمُ السِّباحَةَ، وَالرِّمايَةَ، وَرُكوبَ الخَيْلِ.", "Teach your children swimming, … and horse …"], ["يُصَلّي المُسافِرُ الظُّهْرَ وَالعَصْرَ جَمْعًا وَ…", "يُصَلّي المُسافِرُ الظُّهْرَ وَالعَصْرَ جَمْعًا وَقَصْرًا.", "The traveller prays the noon and afternoon prayers combining and …"],
  ["كُلْ طَعامَ العَشاءِ، ثُمَّ …", "كُلْ طَعامَ العَشاءِ، ثُمَّ نَمْ.", "Eat dinner, then …"]] },
 { t: "bosluk", ar: "اخْتَرْ حَرْفَ العَطْفِ المُناسِبَ", ogeler: [
  ["صَلَّيْتُ المَغْرِبَ، ___ العِشاءَ بَعْدَ ساعَةٍ وَنِصْفٍ.", "ثُمَّ", ["أَوْ"], "I prayed the sunset prayer, and an hour and a half later the night prayer."], ["هَلْ تَشْرَبُ شايًا ___ قَهْوَةً؟", "أَوْ", ["ثُمَّ"], "Do you drink tea or coffee?"], ["في القَرْيَةِ الأَهْلُ ___ الجيرانُ.", "وَ", ["أَوْ"], "In the village there are relatives and neighbours."], ["دَخَلَ الإِمامُ، ___ المُصَلّونَ.", "فَـ", ["أَوْ"], "The imam entered, and right after him the congregation."]] }
]},
// ---------------- DERS 43 ----------------
{ no: 43, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to ʿAbd al-Raḥmān's move from the city to the village; compare city and village life.", bloklar: [
 { t: "dinle", s: "l43", ar: "اسْتَمِعْ إِلى الحِوارِ", aciklama: "ʿAbd al-Raḥmān is moving from the city to the village. Listen first, then answer the questions.", metin: [
  ["— يا عَبْدَ الرَّحْمنِ، سَمِعْتُ أَنَّكَ سَتَتْرُكُ المَدينَةَ، وَتَعودُ إِلى الحَياةِ في القَرْيَةِ.", "— ʿAbd al-Raḥmān, I heard you will leave the city and return to village life."],
  ["— هذا صَحيحٌ؛ فَالحَياةُ في المَدينَةِ لَيْسَتْ طَيِّبَةً: الضَّوْضاءُ في كُلِّ وَقْتٍ، لا أَنامُ جَيِّدًا بِسَبَبِ ضَوْضاءِ السَّيّاراتِ وَالطّائِراتِ، وَالازْدِحامُ في كُلِّ مَكانٍ، وَالتَّلَوُّثُ في كُلِّ المَدينَةِ.", "— True; life in the city is not good: there is noise every moment; I cannot sleep well because of the noise of cars and planes; everywhere is crowded, the whole city is dirty."],
  ["— وَلكِنْ لَكَ شَرِكَةٌ هُنا، وَبَيْتٌ جَميلٌ. — بِعْتُ الشَّرِكَةَ وَالبَيْتَ، وَاشْتَرَيْتُ مَزْرَعَةً كَبيرَةً في القَرْيَةِ.", "— But here you have a company and a beautiful house. — I sold the company and the house and bought a big farm in the village."],
  ["— وَهَلْ سَيَتْرُكُ أَوْلادُكَ المَدينَةَ أَيْضًا؟ — أَوْلادي يُحِبّونَ القَرْيَةَ، وَأُمُّ الأَوْلادِ تُحِبُّ الحَياةَ في القَرْيَةِ أَيْضًا؛ لِتَعيشَ قَريبًا مِنْ والِدَتِها.", "— Will your children leave the city too? — My children love the village; the children's mother also likes village life in order to live near her mother."],
  ["— وَمَتى سَتُغادِرُ المَدينَةَ؟ — بَعْدَ أَيّامٍ قَليلَةٍ، إِنْ شاءَ اللهُ. — سَفَرًا سَعيدًا، وَإِقامَةً طَيِّبَةً. — بارَكَ اللهُ فيكَ.", "— When will you leave the city? — God willing, in a few days. — Have a good journey, I wish you a blessed settlement. — May God be pleased with you."]],
  not: "The text was transcribed from the recording; the book contains only the questions." },
 { t: "dy", ar: "اسْتَمِعْ إِلى الحِوارِ، ثُمَّ ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["يَسْكُنُ عَبْدُ الرَّحْمنِ في المَدينَةِ الآنَ.", true, "", "ʿAbd al-Raḥmān now lives in the city."],
  ["كانَ عَبْدُ الرَّحْمنِ يَسْكُنُ في القَرْيَةِ مِنْ قَبْلُ.", true, "", "ʿAbd al-Raḥmān used to live in the village.", "«تَعودُ إِلى الحَياةِ في القَرْيَةِ»: he is going back to village life."],
  ["عَبْدُ الرَّحْمنِ لا يَنامُ بِسَبَبِ المَرَضِ.", false, "عَبْدُ الرَّحْمنِ لا يَنامُ جَيِّدًا بِسَبَبِ ضَوْضاءِ السَّيّاراتِ وَالطّائِراتِ.", "ʿAbd al-Raḥmān cannot sleep because of illness."],
  ["باعَ عَبْدُ الرَّحْمنِ المَزْرَعَةَ وَاشْتَرى بَيْتًا.", false, "باعَ عَبْدُ الرَّحْمنِ الشَّرِكَةَ وَالبَيْتَ، وَاشْتَرى مَزْرَعَةً.", "ʿAbd al-Raḥmān sold the farm and bought a house."],
  ["زَوْجَةُ عَبْدِ الرَّحْمنِ تُريدُ القَرْيَةَ لِتَكونَ قَريبَةً مِنْ أُمِّها.", true, "", "ʿAbd al-Raḥmān's wife wants the village in order to be near her mother."]] },
 { t: "resim", ar: "تَكَلَّمْ — التَّدْريبُ (١): قارِنْ بَيْنَ الحَياةِ في المَدينَةِ وَالحَياةِ في القَرْيَةِ", aciklama: "A pair activity: compare the pictures; then look at the example.", resimler: [
  ["zihamsayyarat", "في المَدينَةِ ازْدِحامٌ، وَسَيّاراتٌ كَثيرَةٌ، وَتَلَوُّثٌ وَضَوْضاءُ.", "Crowding and many cars in the city"], ["hamir", "في القَرْيَةِ هُدوءٌ، وَهَواءٌ نَقِيٌّ، وَيَرْكَبُ النّاسُ الحَميرَ.", "Calm in the village; people ride donkeys"]] },
 { t: "resim", ar: "التَّدْريبُ (٢): تَبادَلْ وَصْفَ الصُّوَرِ مَعَ زَميلِكَ", aciklama: "A pair activity: describe each picture in one or two sentences.", resimler: [
  ["dukhan", "هذا تَلَوُّثٌ. الدُّخانُ يَخْرُجُ مِنَ المَصْنَعِ، وَالهَواءُ غَيْرُ نَقِيٍّ.", "Pollution"], ["hadith", "هذا حادِثٌ. السَّيّارَةُ مَكْسورَةٌ.", "Accident"], ["zihamnas", "هذا ازْدِحامٌ. النّاسُ كَثيرونَ في الشّارِعِ.", "Crowding"]] }
]},
// ---------------- DERS 44 ----------------
{ no: 44, kisa: "الحَياةُ في المُدُنِ الكَبيرَةِ", ar: "لِماذا يُفَضِّلُ بَعْضُ النّاسِ الحَياةَ في المُدُنِ الكَبيرَةِ؟", tr: "Why do some people prefer to live in big cities?", ozet: "Reading text: the problems of big cities, migration from village to city, growth of the city population.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["ما أَكْثَرُ المُدُنِ ازْدِحامًا بِالسُّكّانِ في العالَمِ؟", "Which are the most populous cities in the world?"], ["ما المُشْكِلاتُ الَّتي تَكونُ في المُدُنِ الكَبيرَةِ؟", "What problems occur in big cities?"], ["لِماذا يُهاجِرُ سُكّانُ الرّيفِ إِلى المَدينَةِ؟", "Why do villagers migrate to the city?"], ["أَيْنَ يَعيشُ مُعْظَمُ سُكّانِ العالَمِ، في المُدُنِ، أَمْ في القُرى؟", "Where does most of the world's population live, in cities or villages?"]] },
 { t: "metin", resim: "mudun", paragraf: [
  [["يَعيشُ مَلايينُ النّاسِ في المُدُنِ الكَبيرَةِ، مِثْلَ: طوكْيو، وَلَنْدَنَ، وَنيويورْكَ، وَالقاهِرَةِ.", "Millions of people live in big cities such as Tokyo, London, New York and Cairo.", "m44-0"],
   ["وَيُواجِهُ سُكّانُ المُدُنِ الكَبيرَةِ مُشْكِلاتٍ كَبيرَةً، مِثْلَ: التَّلَوُّثِ وَالجَريمَةِ وَالازْدِحامِ. وَبِالرَّغْمِ مِنْ هذِهِ المُشْكِلاتِ،", "The inhabitants of big cities face major problems such as pollution, crime and crowding. Despite these problems", "m44-1"],
   ["يُفَضِّلُ كَثيرٌ مِنَ النّاسِ الحَياةَ في المُدُنِ الكَبيرَةِ؛", "many people prefer to live in big cities;", "m44-2"],
   ["لِأَنَّ فيها المَصانِعَ وَالشَّرِكاتِ وَالجامِعاتِ وَالمَكْتَباتِ وَالمُسْتَشْفَياتِ وَالأَسْواقَ، وَأَماكِنَ التَّرْويحِ.", "because there are factories, companies, universities, libraries, hospitals, markets and places of entertainment there.", "m44-3"]],
  [["يَزْدادُ سُكّانُ المُدُنِ كُلَّ يَوْمٍ؛ لِأَنَّ سُكّانَ الرّيفِ يُهاجِرونَ إِلَيْها؛ لِلْعَمَلِ في المَصانِعِ وَالشَّرِكاتِ، وَيَتْرُكونَ العَمَلَ في الزِّراعَةِ وَالرَّعْيِ؛", "The population of cities increases every day; because villagers migrate there to work in factories and companies, leaving farming and animal husbandry;", "m44-4"],
   ["فَتَزْدادُ مُشْكِلاتُ المُدُنِ. وَقَدْ أَدْرَكَتْ بَعْضُ الدُّوَلِ هذِهِ المُشْكِلَةَ؛ مُشْكِلَةَ الهِجْرَةِ مِنَ الرّيفِ إِلى المَدينَةِ،", "so the problems of cities increase. Some states noticed this problem, the problem of migration from village to city;", "m44-5"],
   ["فَبَنَتْ مَصانِعَ كَثيرَةً في الرّيفِ؛ فَرَجَعَ كَثيرٌ مِنَ النّاسِ لِلْعَمَلِ في الرّيفِ، وَالحَياةِ فيهِ.", "they set up many factories in the countryside; so many people returned to work and live in the countryside.", "m44-6"]],
  [["في القَرْنِ التّاسِعَ عَشَرَ الميلادِيِّ، كانَ يَسْكُنُ المُدُنَ نَحْوُ ٢٫٥٪ مِنْ سُكّانِ العالَمِ، ثُمَّ وَصَلَتِ النِّسْبَةُ إِلى نَحْوِ ٤٠٪ سَنَةَ ١٩٨٠م، وَوَصَلَتْ إِلى ٥٠٪ سَنَةَ ٢٠٠٠م.", "In the nineteenth century CE about 2.5% of the world's population lived in cities; then this proportion reached about 40% in 1980 and 50% in 2000.", "m44-7"],
   ["وَبَلَغَ عَدَدُ سُكّانِ العالَمِ سَنَةَ ٢٠٠٠م سِتَّةَ مِلْياراتٍ، يَعيشُ أَكْثَرُ مِنْ مِلْيارٍ مِنْهُمْ في مُدُنٍ، في دُوَلِ العالَمِ الثّالِثِ.", "In the year 2000 the world's population reached six billion; of these more than a billion live in cities in third world countries.", "m44-8"],
   ["وَسَيَبْلُغُ سُكّانُ العالَمِ أَكْثَرَ مِنْ ثَمانِيَةِ مِلْياراتِ شَخْصٍ سَنَةَ ٢٠٢٥م -إِنْ شاءَ اللهُ- وَسَيَصِلُ سُكّانُ العالَمِ الثّالِثِ مِنْهُمْ إِلى أَرْبَعَةِ مِلْياراتِ شَخْصٍ.", "God willing, in 2025 the world's population will exceed eight billion; the part of it in the third world will reach four billion people.", "m44-9"]]] },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["مِنْ مُشْكِلاتِ المُدُنِ الضَّوْضاءُ، وَالهَواءُ غَيْرُ النَّقِيِّ.", true, "", "Noise and dirty air are among the problems of cities."],
  ["سُكّانُ المُدُنِ يَنْتَقِلونَ إِلى الرّيفِ لِلْعَمَلِ بِالزِّراعَةِ.", false, "سُكّانُ الرّيفِ يُهاجِرونَ إِلى المُدُنِ لِلْعَمَلِ في المَصانِعِ وَالشَّرِكاتِ.", "City dwellers are moving to the countryside to engage in farming."],
  ["عَدَدُ سُكّانِ العالَمِ الثّالِثِ -الآنَ- أَرْبَعَةُ مِلْياراتِ شَخْصٍ.", false, "سَيَصِلُ سُكّانُ العالَمِ الثّالِثِ إِلى أَرْبَعَةِ مِلْياراتِ شَخْصٍ سَنَةَ ٢٠٢٥م.", "The population of the third world is four billion at the moment."],
  ["يَرْجِعُ كَثيرٌ مِنَ النّاسِ لِلْعَمَلِ في الرّيفِ، إِذا بَنَتِ الدَّوْلَةُ مَصانِعَ في الرّيفِ.", true, "", "If the state sets up factories in the countryside, many people return to the countryside to work."],
  ["في القَرْنِ التّاسِعَ عَشَرَ سَكَنَ في المُدُنِ نَحْوُ ٢٫٥٪ مِنْ سُكّانِ العالَمِ.", true, "", "In the nineteenth century about 2.5% of the world's population lived in cities."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ عَمّا يَلي", ogeler: [
  ["ما المُشْكِلاتُ الَّتي يُواجِهُها سُكّانُ المُدُنِ الكَبيرَةِ؟", "التَّلَوُّثُ وَالجَريمَةُ وَالازْدِحامُ.", ["الزِّراعَةُ وَالرَّعْيُ.", "الهُدوءُ وَالهَواءُ النَّقِيُّ."], "What problems do the inhabitants of big cities face?"],
  ["لِماذا يُفَضِّلُ النّاسُ الحَياةَ في المُدُنِ الكَبيرَةِ؟", "لِأَنَّ فيها المَصانِعَ وَالشَّرِكاتِ وَالجامِعاتِ وَالمُسْتَشْفَياتِ.", ["لِأَنَّ فيها الهُدوءَ.", "لِأَنَّ فيها المَزارِعَ."], "Why do people prefer to live in big cities?"],
  ["لِماذا يَتْرُكُ سُكّانُ الرّيفِ العَمَلَ في الزِّراعَةِ وَالرَّعْيِ؟", "لِلْعَمَلِ في المَصانِعِ وَالشَّرِكاتِ في المُدُنِ.", ["لِلدِّراسَةِ في الخارِجِ.", "لِأَنَّهُمْ مَرْضى."], "Why do villagers leave farming and animal husbandry?"],
  ["مَتى كانَتْ نِسْبَةُ سُكّانِ المُدُنِ نِصْفَ سُكّانِ العالَمِ؟", "سَنَةَ ٢٠٠٠م.", ["سَنَةَ ١٩٨٠م.", "في القَرْنِ التّاسِعَ عَشَرَ."], "When did the proportion of the city population become half of the world's population?"],
  ["كَمْ سَيَكونُ عَدَدُ سُكّانِ العالَمِ سَنَةَ ٢٠٢٥م؟", "أَكْثَرَ مِنْ ثَمانِيَةِ مِلْياراتِ شَخْصٍ.", ["سِتَّةَ مِلْياراتٍ.", "أَرْبَعَةَ مِلْياراتٍ."], "How much will the world's population be in 2025?"]] },
 { t: "siniflandir", ar: "مُفْرَداتٌ — التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) بِجانِبِ الشَّيْءِ الَّذي يوجَدُ في المَدينَةِ، وَعَلامَةَ (✗) بِجانِبِ الشَّيْءِ الَّذي يوجَدُ في القَرْيَةِ", soru: "In the city or in the village?", gruplar: ["المَدينَةُ (✓)", "القَرْيَةُ (✗)"], ogeler: [
  ["الحَوادِثُ", 0], ["الحَيَوانُ", 1], ["التَّلَوُّثُ", 0], ["الرَّعْيُ", 1], ["الهُدوءُ", 1], ["المَزْرَعَةُ", 1], ["الازْدِحامُ", 0], ["الضَّوْضاءُ", 0], ["الهَواءُ النَّقِيُّ", 1], ["الجَريمَةُ", 0], ["أَماكِنُ التَّرْويحِ", 0]] },
 { t: "esle", ar: "التَّدْريبُ (٢): صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", ciftler: [
  ["مِلْيونٌ", "مَلايينُ", "million"], ["مِلْيارٌ", "مِلْياراتٌ", "billion"], ["مَدينَةٌ", "مُدُنٌ", "city"], ["مَكانٌ", "أَماكِنُ", "place"], ["إِنْسانٌ", "ناسٌ", "person, human"], ["مَكْتَبَةٌ", "مَكْتَباتٌ", "library"]] }
]},
// ---------------- DERS 45 ----------------
{ no: 45, kisa: "المَفْعولُ بِهِ", ar: "المَفْعولُ بِهِ", tr: "The direct object (mafʿūl bihi)", ozet: "The accusative noun on which the subject's verb falls.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "المَفْعولُ بِهِ: اسْمٌ مَنْصوبٌ، يَدُلُّ عَلى مَنْ وَقَعَ عَلَيْهِ فِعْلُ الفاعِلِ.", tr: "The direct object is the accusative (with fatḥa) noun that shows the person or thing on which the subject's action falls." },
 { t: "ornek", ar: "ادْرُسْ وَلاحِظْ", ogeler: [
  ["تَرَكَ الأَبُ [[القَرْيَةَ]].", "The father left the village."], ["تَرَكَتِ الأُمُّ [[البَيْتَ]].", "The mother left the house."], ["يُحِبُّ الرَّجُلُ [[القَرْيَةَ]].", "The man loves the village."], ["تُحِبُّ المَرْأَةُ [[المَدينَةَ]].", "The woman loves the city."],
  ["يَبيعُ مُحَمَّدٌ [[السَّيّارَةَ]].", "Muhammad is selling the car."], ["يَشْتَري عَلِيٌّ [[المَزْرَعَةَ]].", "ʿAlī is buying the farm."], ["يَدْرُسُ حُسَيْنٌ [[الطِّبَّ]].", "Husayn studies medicine."], ["هَلْ يَتْرُكُ الأَبُ [[المَزْرَعَةَ]]؟", "Will the father leave the farm?"]] },
 { t: "acik", ar: "التَّدْريبُ (١): أَكْمِلِ الجُمَلَ التّالِيَةَ بِمَفْعولٍ بِهِ، وَاضْبِطْهُ بِالشَّكْلِ، كَما في المِثالِ", aciklama: "Example: أَكَلَ الطِّفْلُ التُّفّاحَةَ.", ogeler: [
  ["شَرِبَتِ البِنْتُ …", "شَرِبَتِ البِنْتُ الحَليبَ.", "The girl drank …"], ["صَلّى أَحْمَدُ …", "صَلّى أَحْمَدُ الظُّهْرَ.", "Ahmad prayed …"], ["تَناوَلَ المَريضُ …", "تَناوَلَ المَريضُ الدَّواءَ.", "The patient took …"], ["فَحَصَ الطَّبيبُ …", "فَحَصَ الطَّبيبُ المَريضَ.", "The doctor examined …"],
  ["كَتَبَ الطّالِبُ …", "كَتَبَ الطّالِبُ الدَّرْسَ.", "The student wrote …"], ["مارَسَ خالِدٌ …", "مارَسَ خالِدٌ الرِّياضَةَ.", "Khālid did …"], ["تَرَكَتْ فاطِمَةُ …", "تَرَكَتْ فاطِمَةُ السُّكَّرِيّاتِ.", "Fāṭima left …"], ["شاهَدَ سَعيدٌ …", "شاهَدَ سَعيدٌ المُباراةَ.", "Saʿīd watched …"],
  ["قَرَأَتْ خَوْلَةُ …", "قَرَأَتْ خَوْلَةُ القِصَّةَ.", "Khawla read …"], ["تَدْرُسُ زَيْنَبُ …", "تَدْرُسُ زَيْنَبُ الهَنْدَسَةَ.", "Zaynab is reading …"], ["كَتَبَتِ الطّالِبَةُ …", "كَتَبَتِ الطّالِبَةُ الرِّسالَةَ.", "The (girl) student wrote …"]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): اخْتَرِ المَفْعولَ بِهِ الصَّحيحَ مِمّا بَيْنَ القَوْسَيْنِ", aciklama: "Example: أَكَلَ الضَّيْفُ الطَّعامَ. (الطَّبَقَ / الطَّعامَ / القَهْوَةَ)", ogeler: [
  ["سَيَتْرُكُ أَبو عَمْرٍو ___.", "القَرْيَةَ", ["السَّعادَةَ", "الحَوادِثَ"], "Abū ʿAmr will leave the village."], ["لا تَشْتَري الأُمُّ ___.", "الطَّعامَ", ["العاصِمَةَ", "الأُسْرَةَ"], "The mother is not buying food."],
  ["تَعَلَّمَ الطّالِبُ ___.", "القِراءَةَ", ["النَّوْمَ", "الطَّعامَ"], "The student learned reading."], ["باعَ الأَبُ ___.", "المَزْرَعَةَ", ["القَرْيَةَ", "الضَّوْضاءَ"], "The father sold the farm."],
  ["زارَ الطَّبيبُ ___.", "المَريضَ", ["المَرَضَ", "الطَّبيبَ"], "The doctor visited the patient."], ["قَرَأَ الطُّلّابُ ___.", "القِصَّةَ", ["الكُلِّيَّةَ", "القِراءَةَ"], "The students read the story."]] },
 { t: "acik", ar: "التَّدْريبُ (٣): أَجِبْ عَنِ الأَسْئِلَةِ التّالِيَةِ مُسْتَخْدِمًا ما بَيْنَ القَوْسَيْنِ مَفْعولًا بِهِ", aciklama: "Example: ماذا تَشْرَبُ؟ (عَصيرًا) ← أَشْرَبُ عَصيرًا.", ogeler: [
  ["ماذا نَبيعُ؟ (المَزْرَعَةَ)", "نَبيعُ المَزْرَعَةَ.", "What are we selling?"], ["ماذا نَشْتَري؟ (بَيْتًا)", "نَشْتَري بَيْتًا.", "What are we buying?"], ["ماذا تَدْرُسُ فاطِمَةُ؟ (الطِّبَّ)", "تَدْرُسُ فاطِمَةُ الطِّبَّ.", "What is Fāṭima reading?"], ["ماذا تُريدُ؟ (الزَّواجَ)", "أُريدُ الزَّواجَ.", "What do you want?"],
  ["ماذا يُحِبُّ الأَبُ؟ (القَرْيَةَ)", "يُحِبُّ الأَبُ القَرْيَةَ.", "What does the father love?"], ["ماذا تُحِبُّ الأُمُّ؟ (العاصِمَةَ)", "تُحِبُّ الأُمُّ العاصِمَةَ.", "What does the mother love?"], ["ماذا يَضُمُّ البَيْتُ الكَبيرُ؟ (الأُسْرَةَ)", "يَضُمُّ البَيْتُ الكَبيرُ الأُسْرَةَ.", "What does the big house contain?"],
  ["ماذا تَقْرَأُ؟ (قِصَّةً)", "أَقْرَأُ قِصَّةً.", "What are you reading?"], ["ماذا تَأْكُلُ زَيْنَبُ؟ (اللَّحْمَ)", "تَأْكُلُ زَيْنَبُ اللَّحْمَ.", "What is Zaynab eating?"], ["ماذا تَتَناوَلُ مَرْيَمُ؟ (العَسَلَ)", "تَتَناوَلُ مَرْيَمُ العَسَلَ.", "What is Maryam eating?"]] },
 { t: "secim", ar: "التَّدْريبُ (٤): ضَعْ خَطًّا تَحْتَ المَفْعولِ بِهِ", aciklama: "Example: قَرَأَتْ خَديجَةُ كِتابَ العُلومِ ← كِتابَ.", ogeler: [
  ["تَزَوَّجَ مُحَمَّدٌ خَديجَةَ.", "خَديجَةَ", ["مُحَمَّدٌ", "تَزَوَّجَ"], "Muhammad married Khadīja."], ["يُحِبُّ الأَهْلُ الجيرانَ.", "الجيرانَ", ["الأَهْلُ", "يُحِبُّ"], "Relatives love neighbours."], ["دَرَسَ أَخوكَ الطِّبَّ.", "الطِّبَّ", ["أَخوكَ", "دَرَسَ"], "Your brother studied medicine."],
  ["تَرَكَ العامِلُ العَمَلَ.", "العَمَلَ", ["العامِلُ", "تَرَكَ"], "The worker left the job."], ["يُحِبُّ المُسْلِمُ الرَّسولَ ﷺ.", "الرَّسولَ", ["المُسْلِمُ", "يُحِبُّ"], "The Muslim loves the Messenger of God."], ["خَلَقَ اللهُ آدَمَ.", "آدَمَ", ["اللهُ", "خَلَقَ"], "God created Adam."]] }
]},
// ---------------- DERS 46 ----------------
{ no: 46, kisa: "الطَّريقُ إِلى الجامِعَةِ", ar: "الطَّريقُ إِلى الجامِعَةِ", tr: "The Road to the University", ozet: "Dialogue: a driver asks a passer-by the way to the university.", bloklar: [
 { t: "diyalog", resim: ["jamia", "kharita"], kisiler: [{ ar: "السّائِقُ", tr: "Driver" }, { ar: "رَجُلُ المُرورِ", tr: "Passer-by" }], satir: [
  [0, "لَوْ سَمَحْتَ، أَيْنَ تَقَعُ الجامِعَةُ؟", "Excuse me, where is the university?", "d46-0"],
  [1, "تَقَعُ الجامِعَةُ غَرْبَ المَدينَةِ.", "The university is in the west of the city.", "d46-1"],
  [0, "كَيْفَ أَصِلُ إِلَيْها مِنْ فَضْلِكَ؟", "Please, how do I get there?", "d46-2"],
  [1, "اتَّجِهْ غَرْبًا في شارِعِ طارِقِ بْنِ زِيادٍ.", "Go west on Ṭāriq ibn Ziyād Street.", "d46-3"],
  [0, "أَتَّجِهُ غَرْبًا في شارِعِ طارِقِ بْنِ زِيادٍ.", "I will go west on Ṭāriq ibn Ziyād Street.", "d46-4"],
  [1, "عِنْدَ الإِشارَةِ الضَّوْئِيَّةِ الثّالِثَةِ، انْعَطِفْ يَسارًا في طَريقِ خالِدِ بْنِ الوَليدِ.", "At the third traffic light turn left onto Khālid ibn al-Walīd Road.", "d46-5"],
  [0, "أَنْعَطِفُ يَسارًا في طَريقِ خالِدِ بْنِ الوَليدِ.", "I will turn left onto Khālid ibn al-Walīd Road.", "d46-6"],
  [1, "عِنْدَ الدَّوّارِ الأَوَّلِ، ارْجِعْ في الطَّريقِ نَفْسِهِ.", "At the first roundabout turn back along the same road.", "d46-7"],
  [0, "عِنْدَ الدَّوّارِ الأَوَّلِ، أَرْجِعُ في الطَّريقِ نَفْسِهِ.", "At the first roundabout I will turn back along the same road.", "d46-8"],
  [1, "عِنْدَ أَوَّلِ شارِعٍ، اتَّجِهْ يَمينًا.", "Go right at the first street.", "d46-9"],
  [0, "عِنْدَ أَوَّلِ شارِعٍ، أَتَّجِهُ يَمينًا.", "I will go right at the first street.", "d46-10"],
  [1, "تَجِدُ صَيْدَلِيَّةً عِنْدَ الزّاوِيَةِ.", "You will find a pharmacy at the corner.", "d46-11"],
  [0, "أَجِدُ صَيْدَلِيَّةً عِنْدَ الزّاوِيَةِ.", "I will find a pharmacy at the corner.", "d46-12"],
  [1, "اسْتَمِرَّ، وَبَعْدَ ٢٠٠ مِتْرٍ تَجِدُ المُسْتَشْفى الجامِعِيَّ عَنْ يَمينِكَ.", "Continue; after 200 metres you will find the university hospital on your right.", "d46-13"],
  [0, "أَسْتَمِرُّ، وَبَعْدَ ٢٠٠ مِتْرٍ أَجِدُ المُسْتَشْفى الجامِعِيَّ عَنْ يَميني.", "I will continue; after 200 metres I will find the university hospital on my right.", "d46-14"],
  [1, "الجامِعَةُ مُقابِلَ المُسْتَشْفى.", "The university is opposite the hospital.", "d46-15"],
  [0, "شُكْرًا.", "Thank you.", "d46-16"],
  [1, "عَفْوًا.", "You are welcome.", "d46-17"]],
  not: "The recording is read according to an older edition of the book: in the recording the university is said to be “in the east of the city” (شَرْقَ المَدينَةِ) and the pharmacy sentence comes first: «تَجِدُ صَيْدَلِيَّةً عِنْدَ الزّاوِيَةِ، اتَّجِهْ بَعْدَها يَمينًا»." },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["الجامِعَةُ شَمالَ المَدينَةِ.", false, "الجامِعَةُ غَرْبَ المَدينَةِ.", "The university is in the north of the city."],
  ["سَيَتَّجِهُ السّائِقُ غَرْبًا في شارِعِ طارِقِ بْنِ زِيادٍ.", true, "", "The driver will go west on Ṭāriq ibn Ziyād Street."],
  ["الصَّيْدَلِيَّةُ في طَريقِ خالِدِ بْنِ الوَليدِ.", false, "الصَّيْدَلِيَّةُ عِنْدَ الزّاوِيَةِ، في أَوَّلِ شارِعٍ عَلى اليَمينِ.", "The pharmacy is on Khālid ibn al-Walīd Road."],
  ["المُسْتَشْفى بَعْدَ ٢٠ مِتْرًا مِنَ الصَّيْدَلِيَّةِ.", false, "المُسْتَشْفى بَعْدَ ٢٠٠ مِتْرٍ مِنَ الصَّيْدَلِيَّةِ.", "The hospital is 20 metres after the pharmacy."],
  ["المُسْتَشْفى مُقابِلَ الجامِعَةِ.", true, "", "The hospital is opposite the university."],
  ["السّائِقُ يُريدُ حَيَّ الجامِعَةِ.", false, "السّائِقُ يُريدُ الجامِعَةَ.", "The driver is looking for the university district."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ عَمّا يَلي", ogeler: [
  ["أَيْنَ الجامِعَةُ؟", "غَرْبَ المَدينَةِ، مُقابِلَ المُسْتَشْفى الجامِعِيِّ.", ["شَرْقَ المَدينَةِ.", "عِنْدَ الدَّوّارِ."], "Where is the university?"],
  ["إِلى أَيْنَ سَيَتَّجِهُ السّائِقُ؟", "غَرْبًا في شارِعِ طارِقِ بْنِ زِيادٍ.", ["شَرْقًا.", "شَمالًا."], "Where will the driver go?"],
  ["إِلى أَيْنَ سَيَنْعَطِفُ عِنْدَ طَريقِ خالِدِ بْنِ الوَليدِ؟", "يَسارًا.", ["يَمينًا.", "إِلى الصَّيْدَلِيَّةِ."], "Where will he turn on Khālid ibn al-Walīd Road?"],
  ["ماذا سَيَجِدُ السّائِقُ عِنْدَ الزّاوِيَةِ؟", "صَيْدَلِيَّةً.", ["مُسْتَشْفًى.", "إِشارَةً ضَوْئِيَّةً."], "What will the driver find at the corner?"],
  ["أَيْنَ المُسْتَشْفى الجامِعِيُّ؟", "بَعْدَ الصَّيْدَلِيَّةِ بِـ ٢٠٠ مِتْرٍ، عَنْ يَمينِ السّائِقِ.", ["عِنْدَ الإِشارَةِ الثّالِثَةِ.", "شَمالَ المَدينَةِ."], "Where is the university hospital?"]] },
 { t: "acik", ar: "مُفْرَداتٌ — التَّدْريبُ (١): مَتى نَقولُ العِباراتِ التّالِيَةَ؟ اسْتَعْمِلِ العِباراتِ في جُمَلٍ مِنْ إِنْشائِكَ", ogeler: [
  ["لَوْ سَمَحْتَ", "لَوْ سَمَحْتَ، أَيْنَ المَسْجِدُ؟ (when asking or requesting something)", "excuse me / if you allow"], ["شُكْرًا", "شُكْرًا عَلى مُساعَدَتِكَ. (when thanking)", "thank you"],
  ["عَفْوًا", "— شُكْرًا. — عَفْوًا. (when replying to thanks)", "you are welcome"], ["مِنْ فَضْلِكَ", "أَعْطِني الكِتابَ مِنْ فَضْلِكَ. (when asking politely)", "please"],
  ["جَزاكَ اللهُ خَيْرًا", "جَزاكَ اللهُ خَيْرًا عَلى نَصيحَتِكَ. (when thanking with a prayer)", "may God be pleased"], ["يا أَبا … / يا أُمَّ …", "يا أَبا عَمْرٍو، ما رَأْيُكَ؟ (when addressing husband and wife or elders)", "O … father of / mother of"]] },
 { t: "esle", ar: "التَّدْريبُ (٢): صِلْ بَيْنَ الكَلِمَتَيْنِ اللَّتَيْنِ تَأْتِيانِ مَعًا، ثُمَّ اسْتَعْمِلْهُما في جُمَلٍ مِنْ إِنْشائِكَ", ciftler: [
  ["الإِشارَةُ", "الضَّوْئِيَّةُ", "traffic light"], ["المُسْتَشْفى", "الجامِعِيُّ", "university hospital"], ["غَرْبَ", "المَدْرَسَةِ", "west of the school"], ["العالَمُ", "الثّالِثُ", "third world"], ["كُلِّيَّةُ", "المُعَلِّماتِ", "girls' teacher-training school"], ["نِصْفُ", "المِلْيارِ", "half a million"]] }
]},
// ---------------- DERS 47 ----------------
{ no: 47, kisa: "المُبْتَدَأُ وَالخَبَرُ", ar: "المُبْتَدَأُ وَالخَبَرُ", tr: "Subject and predicate", ozet: "The two basic parts of the nominal sentence; both are nominative.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الجُمْلَةُ الاسْمِيَّةُ لَها رُكْنانِ: ١- المُبْتَدَأُ: اسْمٌ مَرْفوعٌ، وَيَكونُ في أَوَّلِها غالِبًا. ٢- الخَبَرُ: اسْمٌ مَرْفوعٌ، يُتِمُّ مَعْنى الجُمْلَةِ.", tr: "The nominal sentence has two basic parts: 1) The subject (mubtadaʾ): a nominative noun, mostly coming at the beginning of the sentence. 2) The predicate (khabar): a nominative noun that completes the meaning of the sentence." },
 { t: "ornek", ar: "ادْرُسْ وَلاحِظْ", ogeler: [
  ["[[مَكَّةُ]] جَميلَةٌ.", "Mecca is beautiful."], ["[[أَنا]] مُسْلِمٌ.", "I am a Muslim."], ["[[الجامِعَةُ]] واسِعَةٌ.", "The university is spacious."], ["[[المَسْجِدانِ]] كَبيرانِ.", "The two mosques are big."], ["[[الفَقْرُ]] مُشْكِلَةٌ.", "Poverty is a problem."],
  ["[[هذا]] طَبيبٌ.", "This is a doctor."], ["[[زَيْنَبُ]] طَبيبَةٌ.", "Zaynab is a doctor."], ["[[دِمَشْقُ]] عاصِمَةٌ.", "Damascus is a capital."], ["[[القاهِرَةُ]] مُزْدَحِمَةٌ.", "Cairo is crowded."], ["[[المَصانِعُ]] كَثيرَةٌ.", "The factories are many."]],
  not: "The emphasized word is the subject, the rest of the sentence is the predicate." },
 { t: "secim", ar: "تَدْريبٌ: عَيِّنِ الخَبَرَ في كُلِّ جُمْلَةٍ", aciklama: "Example: زَيْنَبُ سَمينَةٌ ← subject: زَيْنَبُ، predicate: سَمينَةٌ.", ogeler: [
  ["خَوْلَةُ نَحيفَةٌ جِدًّا.", "نَحيفَةٌ", ["خَوْلَةُ", "جِدًّا"], "Khawla is very thin."], ["مَرْيَمُ سَمينَةٌ جِدًّا.", "سَمينَةٌ", ["مَرْيَمُ", "جِدًّا"], "Maryam is very fat."], ["الضَّغْطُ مُرْتَفِعٌ.", "مُرْتَفِعٌ", ["الضَّغْطُ"], "The blood pressure is high."],
  ["نَحْنُ طُلّابٌ.", "طُلّابٌ", ["نَحْنُ"], "We are students."], ["الأَكْلُ كَثيرٌ.", "كَثيرٌ", ["الأَكْلُ"], "The food is plentiful."], ["القُرْآنُ شِفاءٌ.", "شِفاءٌ", ["القُرْآنُ"], "The Qur'an is a healing."],
  ["القِراءَةُ مُفيدَةٌ.", "مُفيدَةٌ", ["القِراءَةُ"], "Reading is useful."], ["الطِّفْلُ نائِمٌ.", "نائِمٌ", ["الطِّفْلُ"], "The child is sleeping."], ["أَنْتَ قَلِقٌ.", "قَلِقٌ", ["أَنْتَ"], "You are worried."],
  ["مُحَمَّدٌ رَسولُ اللهِ.", "رَسولُ اللهِ", ["مُحَمَّدٌ"], "Muhammad is the Messenger of God."], ["الدَّواءُ مُفيدٌ.", "مُفيدٌ", ["الدَّواءُ"], "The medicine is useful."], ["الأُسْرَةُ سَعيدَةٌ.", "سَعيدَةٌ", ["الأُسْرَةُ"], "The family is happy."],
  ["المَصانِعُ كَبيرَةٌ.", "كَبيرَةٌ", ["المَصانِعُ"], "The factories are big."], ["البِنْتانِ مَريضَتانِ.", "مَريضَتانِ", ["البِنْتانِ"], "The two girls are ill."], ["الشَّوارِعُ مُزْدَحِمَةٌ.", "مُزْدَحِمَةٌ", ["الشَّوارِعُ"], "The streets are crowded."]] },
 { t: "acik", ar: "أَكْمِلْ بِخَبَرٍ مُناسِبٍ", aciklama: "The predicate agrees with the subject in gender and number.", ogeler: [
  ["المَدينَةُ …", "المَدينَةُ مُزْدَحِمَةٌ.", "The city …"], ["القَرْيَةُ …", "القَرْيَةُ هادِئَةٌ.", "The village …"], ["الهَواءُ في القَرْيَةِ …", "الهَواءُ في القَرْيَةِ نَقِيٌّ.", "In the village the air …"], ["الطّالِبانِ …", "الطّالِبانِ مُجْتَهِدانِ.", "The two students …"]] }
]},
// ---------------- DERS 48 ----------------
{ no: 48, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to a family's city trip; give directions on a map; discuss migration.", bloklar: [
 { t: "dinle", s: "l48", ar: "اسْتَمِعْ إِلى النَّصِّ", aciklama: "A family's journey to the city in the spring holiday. Listen first, then answer the questions.", metin: [
  ["في عُطْلَةِ الرَّبيعِ سافَرَتِ الأُسْرَةُ إِلى المَدينَةِ؛ لِقَضاءِ بَعْضِ الأَيّامِ هُناكَ. كانَ الوَقْتُ رَبيعًا، وَالجَوُّ جَميلًا.", "In the spring holiday the family went to the city to spend a few days. The season was spring, the weather was fine."],
  ["قَضَتِ الأُسْرَةُ أُسْبوعًا في المَدينَةِ، كانَتْ تُقيمُ في فُنْدُقٍ كَبيرٍ في وَسَطِ المَدينَةِ.", "The family spent a week in the city; they stayed in a big hotel in the middle of the city."],
  ["زارَ الأَوْلادُ الحَدائِقَ وَالمَلاعِبَ، وَتَناوَلوا الطَّعامَ في المَطاعِمِ الكَبيرَةِ، وَرَكِبوا الحافِلاتِ وَالقِطاراتِ.", "The children toured the parks and playgrounds, ate in big restaurants, rode buses and trains."],
  ["ذَهَبَتِ الأُمُّ إِلى أَسْواقِ المَدينَةِ، وَاشْتَرَتْ أَشْياءَ كَثيرَةً لَها وَلِزَوْجِها وَلِأَوْلادِها وَلِلْبَيْتِ.", "The mother went to the city's markets; she bought many things for herself, her husband, her children and the house."],
  ["وَزارَ الأَبُ مَكْتَباتِ المَدينَةِ، وَاشْتَرى كُتُبًا كَثيرَةً لَهُ وَلِأَفْرادِ أُسْرَتِهِ.", "The father toured the city's bookshops; he bought many books for himself and his family."],
  ["اسْتَمْتَعَتِ الأُسْرَةُ بِالزِّيارَةِ، وَأَحَبَّ الأَوْلادُ المَدينَةَ، وَطَلَبوا مِنْ والِدِهِمْ أَنْ يَزوروها كُلَّ عُطْلَةٍ.", "The family enjoyed the visit; the children liked the city and asked their father to visit it every holiday."]],
  not: "The text was transcribed from the recording; the book contains only the questions." },
 { t: "secim", ar: "اسْتَمِعْ إِلى النَّصِّ، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["سافَرَتِ الأُسْرَةُ في فَصْلِ …", "الرَّبيعِ", ["الشِّتاءِ", "الصَّيْفِ"], "The family travelled in the season of …"],
  ["قَضَتِ الأُسْرَةُ في المَدينَةِ …", "سَبْعَةَ أَيّامٍ", ["سِتَّةَ أَيّامٍ", "أُسْبوعَيْنِ"], "The family spent … in the city.", "«قَضَتِ الأُسْرَةُ أُسْبوعًا»: a week = seven days."],
  ["أَقامَتِ الأُسْرَةُ في …", "فُنْدُقٍ", ["بَيْتٍ", "شَقَّةٍ"], "The family stayed in …"],
  ["ذَهَبَ إِلى السّوقِ …", "الأُمُّ", ["الأَبُ", "الأَوْلادُ"], "She went to the market …"],
  ["طَلَبَ زِيارَةَ المَدينَةِ كُلَّ عُطْلَةٍ …", "الأَوْلادُ", ["البِنْتُ", "الزَّوْجَةُ"], "They asked to visit the city every holiday …"]] },
 { t: "resim", ar: "تَكَلَّمْ — التَّدْريبُ (١): كَيْفَ يَصِلُ بَدْرٌ إِلى المُسْتَشْفى؟", aciklama: "A pair activity: looking at the map, describe the way to Badr; then look at the example.", resimler: [
  ["kharita2", "اتَّجِهْ شَمالًا، ثُمَّ انْعَطِفْ يَسارًا في شارِعِ سُفْيانَ، وَاسْتَمِرَّ. عِنْدَ المَسْجِدِ اتَّجِهْ يَمينًا، تَجِدِ المُسْتَشْفى بَعْدَ الحَديقَةِ عَنْ يَسارِكَ.", "Badr from here to the hospital"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): ناقِشِ المَوْضوعاتِ التّالِيَةَ مَعَ زُمَلائِكَ", aciklama: "A group activity; then look at the sample answer.", ogeler: [
  ["لِماذا يُهاجِرُ النّاسُ مِنَ الرّيفِ إِلى المَدينَةِ؟", "لِلْعَمَلِ في المَصانِعِ وَالشَّرِكاتِ، وَلِلدِّراسَةِ في الجامِعاتِ.", "Why do people migrate from the village to the city?"],
  ["لِماذا يُهاجِرُ بَعْضُ النّاسِ مِنَ المَدينَةِ إِلى القَرْيَةِ؟", "لِأَنَّ في القَرْيَةِ الهُدوءَ وَالهَواءَ النَّقِيَّ، وَلا تَلَوُّثَ فيها وَلا ازْدِحامَ.", "Why do some people migrate from the city to the village?"],
  ["مِنْ مُشْكِلاتِ المُدُنِ الكَبيرَةِ: الحَوادِثُ، الجَريمَةُ، الازْدِحامُ، التَّلَوُّثُ. كَيْفَ نَحُلُّها؟", "نَبْني مَصانِعَ في الرّيفِ، وَنَسْتَعْمِلُ الحافِلاتِ وَالقِطاراتِ بَدَلَ السَّيّاراتِ.", "How do we solve the problems of big cities?"]] }
]},
// ---------------- DERS 49 ----------------
{ no: 49, kisa: "مِنْ مُدُنِ العالَمِ الكُبْرى", ar: "مِنْ مُدُنِ العالَمِ الكُبْرى", tr: "From the Big Cities of the World", ozet: "Reading text: Tokyo, Cairo and New York.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["ما المَدينَةُ الَّتي تَشْتَهِرُ بِكَثْرَةِ المَآذِنِ؟", "Which city is famous for the great number of its minarets?"], ["ما المُشْكِلاتُ الَّتي تُواجِهُها طوكْيو؟", "What problems does Tokyo face?"], ["ما المُشْكِلاتُ الَّتي تُواجِهُها نيويورْكُ؟", "What problems does New York face?"], ["ما المُدُنُ الَّتي تَكْثُرُ فيها الزَّلازِلُ؟", "Which are the cities where earthquakes are frequent?"]] },
 { t: "metin", resim: ["tokyo", "qahira", "newyork"], paragraf: [
  [["طوكْيو عاصِمَةُ اليابانِ، وَيَبْلُغُ عَدَدُ سُكّانِها نَحْوَ عَشَرَةِ مَلايينِ شَخْصٍ.", "Tokyo is the capital of Japan; its population is about ten million.", "m49-0"],
   ["في طوكْيو مَقَرُّ الإِمْبَراطورِ وَالحُكومَةِ، وَفيها المَصارِفُ وَالشَّرِكاتُ. وَتَكْثُرُ في طوكْيو العِماراتُ العالِيَةُ.", "In Tokyo are the centre of the emperor and the government; the banks and companies are there too. In Tokyo tall buildings are numerous.", "m49-1"],
   ["وَقَدْ أُنْشِئَتْ مَدينَةُ طوكْيو سَنَةَ ١٤٧٥م. تُواجِهُ طوكْيو مُشْكِلاتٍ كَثيرَةً، مِثْلَ: الازْدِحامِ، وَالتَّلَوُّثِ، وَالزَّلازِلِ.", "The city of Tokyo was founded in 1475. Tokyo faces many problems such as crowding, pollution and earthquakes.", "m49-2"]],
  [["القاهِرَةُ عاصِمَةُ مِصْرَ، وَأَكْبَرُ مُدُنِها، تَقَعُ عَلى نَهْرِ النّيلِ، وَيَبْلُغُ عَدَدُ سُكّانِها نَحْوَ ثَمانِيَةِ مَلايينِ شَخْصٍ.", "Cairo is the capital and largest city of Egypt; it is on the Nile; its population is about eight million.", "m49-3"],
   ["في مَدينَةِ القاهِرَةِ كَثيرٌ مِنَ الآثارِ، وَالمَكْتَباتِ العامَّةِ، وَتُشْتَهَرُ بِأَنَّها مَدينَةُ المَآذِنِ، لِكَثْرَةِ مَساجِدِها،", "In Cairo there are many historic monuments and public libraries; because of the great number of its mosques it is famous as the “city of minarets.”", "m49-4"],
   ["وَمِنْ تِلْكَ المَساجِدِ: مَسْجِدُ عَمْرِو بْنِ العاصِ، وَمَسْجِدُ أَحْمَدَ بْنِ طولونَ، وَمَسْجِدُ السُّلْطانِ حَسَنٍ، وَمَسْجِدُ مُحَمَّدٍ عَلِيٍّ، وَمَسْجِدُ الأَزْهَرِ،", "Some of these mosques are: the mosques of ʿAmr ibn al-ʿĀṣ, Aḥmad ibn Ṭūlūn, Sultan Hasan, Muhammad ʿAlī and al-Azhar.", "m49-5"],
   ["وَقَدْ أَصْبَحَ الآنَ جامِعَةً إِسْلامِيَّةً كَبيرَةً، يَدْرُسُ فيها اللُّغَةَ العَرَبِيَّةَ وَالعُلومَ الإِسْلامِيَّةَ طُلّابٌ مِنْ كُلِّ دُوَلِ العالَمِ.", "Today al-Azhar has become a great Islamic university; there students from every country in the world study Arabic and the Islamic sciences.", "m49-6"]],
  [["نيويورْكُ أَكْبَرُ مَدينَةٍ في الوِلاياتِ المُتَّحِدَةِ الأَمْريكِيَّةِ، وَيوجَدُ فيها مَقَرُّ الأُمَمِ المُتَّحِدَةِ، وَالمَصارِفُ وَالشَّرِكاتُ.", "New York is the largest city of the United States of America; the headquarters of the United Nations, banks and companies are there.", "m49-7"],
   ["يَبْلُغُ عَدَدُ سُكّانِ نيويورْكَ نَحْوَ سَبْعَةِ مَلايينِ شَخْصٍ، وَقَدْ هاجَرَ إِلَيْها النّاسُ مِنْ كُلِّ دُوَلِ العالَمِ لِلْعَمَلِ، وَطَلَبِ العِلْمِ.", "The population of New York is about seven million; people from every country in the world have migrated there to work and to seek knowledge.", "m49-8"],
   ["تَكْثُرُ في نيويورْكَ ناطِحاتُ السَّحابِ. وَتُواجِهُ المَدينَةُ مُشْكِلاتٍ كَثيرَةً مِثْلَ: الفَقْرِ وَالجَريمَةِ وَالمُخَدِّراتِ.", "In New York skyscrapers are numerous. The city faces many problems such as poverty, crime and drugs.", "m49-9"]]] },
 { t: "siniflandir", ar: "اسْتيعابٌ — التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) أَمامَ العِبارَةِ الصَّحيحَةِ تَحْتَ المَدينَةِ", soru: "Which city?", gruplar: ["القاهِرَةُ", "طوكْيو", "نيويورْكُ"], ogeler: [
  ["عاصِمَةُ مِصْرَ وَأَكْبَرُ مُدُنِها.", 0], ["عاصِمَةُ اليابانِ وَمَقَرُّ الإِمْبَراطورِ.", 1], ["عَدَدُ سُكّانِها عَشَرَةُ مَلايينَ.", 1], ["عَدَدُ سُكّانِها ثَمانِيَةُ مَلايينَ.", 0], ["عَدَدُ سُكّانِها سَبْعَةُ مَلايينَ.", 2],
  ["تَقَعُ عَلى نَهْرِ النّيلِ.", 0], ["تُشْتَهَرُ بِكَثْرَةِ الزَّلازِلِ.", 1], ["تُشْتَهَرُ بِكَثْرَةِ المَساجِدِ.", 0], ["تُشْتَهَرُ بِكَثْرَةِ الجَريمَةِ وَالمُخَدِّراتِ.", 2]] },
 { t: "secim", ar: "التَّدْريبُ (٢): ضَعْ عَلامَةَ (✓) بِجانِبِ الفِكْرَةِ الرَّئيسَةِ في كُلِّ فِقْرَةٍ", ogeler: [
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الأولى هِيَ:", "طوكْيو عاصِمَةُ اليابانِ.", ["المَصارِفُ وَالشَّرِكاتُ في طوكْيو.", "الزَّلازِلُ في طوكْيو."], "The main idea of the first paragraph:"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّانِيَةِ هِيَ:", "القاهِرَةُ عاصِمَةُ مِصْرَ.", ["المَسْجِدُ الأَزْهَرُ في القاهِرَةِ.", "سُكّانُ القاهِرَةِ كَثيرونَ."], "The main idea of the second paragraph:"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّالِثَةِ هِيَ:", "نيويورْكُ أَكْبَرُ مُدُنِ الوِلاياتِ المُتَّحِدَةِ.", ["مَقَرُّ الأُمَمِ المُتَّحِدَةِ في نيويورْكَ.", "العِلْمُ وَالثَّقافَةُ في نيويورْكَ."], "The main idea of the third paragraph:"]] },
 { t: "acik", ar: "المُفْرَداتُ — التَّدْريبُ (١): كَوِّنْ جُمْلَةً مُناسِبَةً مِنْ كُلِّ كَلِمَتَيْنِ (لا تَقِلُّ الجُمْلَةُ عَنْ سِتِّ كَلِماتٍ)", ogeler: [
  ["يُهاجِرُ / النّاسُ", "يُهاجِرُ النّاسُ مِنَ الرّيفِ إِلى المَدينَةِ لِلْعَمَلِ.", "migrate / people"], ["تُواجِهُ / مُشْكِلَةٌ", "تُواجِهُ المُدُنُ الكَبيرَةُ مُشْكِلَةَ الازْدِحامِ كُلَّ يَوْمٍ.", "face / problem"],
  ["يَبْلُغُ / سُكّانٌ", "يَبْلُغُ عَدَدُ سُكّانِ مَدينَتي نَحْوَ مِلْيونِ شَخْصٍ.", "reaches / population"], ["يوجَدُ / كَثيرٌ", "يوجَدُ في القاهِرَةِ كَثيرٌ مِنَ المَساجِدِ الجَميلَةِ.", "is located / many"],
  ["يُشْتَهَرُ / العِلْمُ", "يُشْتَهَرُ الأَزْهَرُ بِالعِلْمِ في كُلِّ دُوَلِ العالَمِ.", "is famous / knowledge"], ["يَزْدادُ / المَدينَةُ", "يَزْدادُ عَدَدُ سُكّانِ المَدينَةِ كُلَّ سَنَةٍ كَثيرًا.", "increases / city"]] },
 { t: "esle", ar: "التَّدْريبُ (٢): صِلْ بَيْنَ العِبارَةِ وَالكَلِمَةِ المُناسِبَةِ", ciftler: [
  ["النّاسُ كَثيرونَ في هذا المَكانِ.", "الازْدِحامُ", "crowding"], ["أَصْواتُ الطّائِراتِ شَديدَةٌ هُنا.", "الضَّوْضاءُ", "noise"], ["تِلْكَ عِمارَةٌ عالِيَةٌ جِدًّا.", "ناطِحَةُ سَحابٍ", "skyscraper"],
  ["الأَشْياءُ القَديمَةُ.", "الآثارُ", "historic monuments"], ["الهَواءُ غَيْرُ نَقِيٍّ في هذا المَكانِ.", "التَّلَوُّثُ", "pollution"], ["أَماكِنُ فيها مالٌ كَثيرٌ.", "المَصارِفُ", "banks"]] }
]},
// ---------------- DERS 50 ----------------
{ no: 50, kisa: "أَقْسامُ الفِعْلِ", ar: "أَقْسامُ الفِعْلِ", tr: "The kinds of verb", ozet: "Past, imperfect (present-future) and imperative.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الفِعْلُ ثَلاثَةُ أَقْسامٍ: ١- ماضٍ: وَيُفيدُ حُصولَ الشَّيْءِ في الماضي؛ أَيْ قَبْلَ زَمَنِ التَّكَلُّمِ. ٢- مُضارِعٌ: وَيُفيدُ حُصولَ الشَّيْءِ في الحالِ، أَوِ الاسْتِقْبالِ؛ أَيْ في زَمَنِ التَّكَلُّمِ، أَوْ بَعْدَهُ. ٣- أَمْرٌ: وَيُفيدُ طَلَبَ حُصولِ الشَّيْءِ في المُسْتَقْبَلِ؛ أَيْ بَعْدَ زَمَنِ التَّكَلُّمِ.", tr: "The verb is of three kinds: 1) Past: shows that the action occurred in the past, that is, before the time of speaking. 2) Imperfect: shows that the action occurs now or in the future, that is, at or after the time of speaking. 3) Imperative: asks that the action be done in the future, that is, after speaking." },
 { t: "tablo", ar: "ادْرُسْ وَلاحِظْ", bas: ["الماضي", "المُضارِعُ", "الأَمْرُ"], satir: [["رَجَعَ", "يَرْجِعُ", "ارْجِعْ"], ["اسْتَمَرَّ", "يَسْتَمِرُّ", "اسْتَمِرَّ"], ["اسْتَمَعَ", "يَسْتَمِعُ", "اسْتَمِعْ"], ["انْعَطَفَ", "يَنْعَطِفُ", "انْعَطِفْ"], ["اتَّجَهَ", "يَتَّجِهُ", "اتَّجِهْ"], ["شَرِبَ", "يَشْرَبُ", "اشْرَبْ"], ["قَرَأَ", "يَقْرَأُ", "اقْرَأْ"]] },
 { t: "acik", ar: "التَّدْريبُ (١): حَوِّلْ كَما في المِثالِ", aciklama: "Example: سافَرَ ← يُسافِرُ ← سافِرْ", ogeler: [
  ["كَتَبَ ← … ← …", "يَكْتُبُ ← اكْتُبْ", "wrote"], ["لَبِسَ ← … ← …", "يَلْبَسُ ← الْبَسْ", "he wore"], ["كَنَسَ ← … ← …", "يَكْنُسُ ← اكْنُسْ", "he swept"], ["فَحَصَ ← … ← …", "يَفْحَصُ ← افْحَصْ", "examined"],
  ["سَبَحَ ← … ← …", "يَسْبَحُ ← اسْبَحْ", "he swam"], ["شاهَدَ ← … ← …", "يُشاهِدُ ← شاهِدْ", "he watched"], ["قَرَأَ ← … ← …", "يَقْرَأُ ← اقْرَأْ", "he read"], ["مارَسَ ← … ← …", "يُمارِسُ ← مارِسْ", "he applied, he did"]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): اخْتَرِ الفِعْلَ الصَّحيحَ مِمّا بَيْنَ القَوْسَيْنِ، كَما في المِثالِ", aciklama: "Example: وَصَلَ المُدَرِّسُ قَبْلَ قَليلٍ. (وَصَلَ / يَصِلُ / صِلْ)", ogeler: [
  ["___ أَبي إِلى عَمَلِهِ كُلَّ يَوْمٍ.", "يَذْهَبُ", ["ذَهَبَ", "اذْهَبْ"], "My father goes to his work every day."], ["___ الطَّبيبَ غَدًا.", "نَزورُ", ["زارَ", "زُرْنا"], "Tomorrow we will visit the doctor."],
  ["___ الدَّواءَ يا إِبْراهيمُ.", "تَناوَلْ", ["تَناوَلَ", "يَتَناوَلُ"], "Take your medicine, Ibrāhīm."], ["___ المُسْلِمونَ كُلَّ عامٍ.", "يَحُجُّ", ["حَجَّ", "حُجَّ"], "Muslims perform the pilgrimage every year."],
  ["___ الحَقَّ دائِمًا يا أَحْمَدُ.", "قُلْ", ["قالَ", "يَقولُ"], "Ahmad, always tell the truth."]] },
 { t: "acik", ar: "التَّدْريبُ (٣): أَجِبْ عَنِ الأَسْئِلَةِ التّالِيَةِ مُسْتَعينًا بِما بَيْنَ القَوْسَيْنِ، كَما في المِثالِ", aciklama: "Example: مَتى تَعودُ إِلى بَلَدِكَ؟ (في الصَّيْفِ) ← أَعودُ إِلى بَلَدي في الصَّيْفِ.", ogeler: [
  ["مَتى تَشْتَري الثَّوْبَ الجَديدَ؟ (غَدًا)", "أَشْتَري الثَّوْبَ الجَديدَ غَدًا.", "When will you buy the new garment?"], ["مَتى رَجَعْتَ مِنَ العَمَلِ؟ (في المَساءِ)", "رَجَعْتُ مِنَ العَمَلِ في المَساءِ.", "When did you return from work?"],
  ["مَتى ذَهَبَ إِلى العُمْرَةِ؟ (الشَّهْرَ الماضِيَ)", "ذَهَبَ إِلى العُمْرَةِ الشَّهْرَ الماضِيَ.", "When did he go for ʿumra?"], ["مَتى سَتَذْهَبُ إِلى الحَجِّ؟ (العامَ القادِمَ)", "سَأَذْهَبُ إِلى الحَجِّ العامَ القادِمَ.", "When will you go for pilgrimage?"],
  ["مَتى مارَسْتَ الرِّياضَةَ؟ (مَساءً)", "مارَسْتُ الرِّياضَةَ مَساءً.", "When did you do sport?"], ["مَتى قابَلْتَ الطَّبيبَ؟ (في الصَّباحِ)", "قابَلْتُ الطَّبيبَ في الصَّباحِ.", "When did you meet the doctor?"]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٤): اقْرَأِ الحِوارَ التّالِيَ، وَمَيِّزِ الفِعْلَ المُضارِعَ مِنْ فِعْلِ الأَمْرِ", soru: "Imperfect or imperative?", aciklama: "السّائِقُ: أَيْنَ تَقَعُ الجامِعَةُ؟ وَكَيْفَ أَصِلُ إِلَيْها؟ — رَجُلُ المُرورِ: اتَّجِهْ غَرْبًا، ثُمَّ انْعَطِفْ يَسارًا، وَارْجِعْ ثُمَّ اتَّجِهْ يَسارًا تَجِدِ الجامِعَةَ. — السّائِقُ: أَتَّجِهُ غَرْبًا، ثُمَّ أَنْعَطِفُ يَسارًا، وَأَرْجِعُ ثُمَّ أَتَّجِهُ يَسارًا سَأَجِدُ الجامِعَةَ. شُكْرًا.", gruplar: ["مُضارِعٌ", "أَمْرٌ"], ogeler: [
  ["تَقَعُ", 0], ["أَصِلُ", 0], ["اتَّجِهْ", 1], ["انْعَطِفْ", 1], ["ارْجِعْ", 1], ["تَجِدِ", 0], ["أَتَّجِهُ", 0], ["أَنْعَطِفُ", 0], ["أَرْجِعُ", 0], ["سَأَجِدُ", 0]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٥): اقْرَأِ الآياتِ التّالِيَةَ، وَحَدِّدْ نَوْعَ الفِعْلِ", aciklama: "Example: ﴿قُلْ يَا أَيُّهَا الْكَافِرُونَ﴾ ← قُلْ: أَمْرٌ.", soru: "Past, imperfect or imperative?", gruplar: ["ماضٍ", "مُضارِعٌ", "أَمْرٌ"], ogeler: [
  ["﴿إِذَا [[جَاءَ]] نَصْرُ اللَّهِ وَالْفَتْحُ﴾", 0], ["﴿[[فَصَلِّ]] لِرَبِّكَ وَانْحَرْ﴾", 2], ["﴿فَصَلِّ لِرَبِّكَ وَ[[انْحَرْ]]﴾", 2], ["﴿فَمَنْ [[يَعْمَلْ]] مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ﴾", 1],
  ["﴿[[اقْرَأْ]] بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾", 2], ["﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي [[خَلَقَ]]﴾", 0], ["﴿[[قَالَ]] سَلَامٌ عَلَيْكَ﴾", 0], ["﴿فَ[[ارْجِعِ]] الْبَصَرَ هَلْ تَرَى مِنْ فُطُورٍ﴾", 2], ["﴿فَارْجِعِ الْبَصَرَ هَلْ [[تَرَى]] مِنْ فُطُورٍ﴾", 1]] }
]},
// ---------------- DERS 51 ----------------
{ no: 51, kisa: "تَعْبيرٌ مُوَجَّهٌ", ar: "تَعْبيرٌ مُوَجَّهٌ", tr: "Guided composition", ozet: "Describe the picture, arrange the sentences, write about city life and about your capital.", bloklar: [
 { t: "resim", ar: "التَّدْريبُ (١): اكْتُبْ فِقْرَةً تَصِفُ فيها الصّورَةَ", aciklama: "Describe the picture in one paragraph; then look at the example.", resimler: [
  ["zihamshari", "هذا شارِعٌ كَبيرٌ في مَدينَةٍ مُزْدَحِمَةٍ. في الشّارِعِ سَيّاراتٌ كَثيرَةٌ، وَحافِلَةٌ طَويلَةٌ. السَّيّاراتُ تَمْشي بِبُطْءٍ بِسَبَبِ الازْدِحامِ. في المَدينَةِ ضَوْضاءُ وَتَلَوُّثٌ.", "A crowded street"]] },
 { t: "sirala", ar: "التَّدْريبُ (٢): رَتِّبِ الجُمَلَ التّالِيَةَ", ogeler: [
  "يَسْكُنُ مُحَمَّدٌ في مَدينَةٍ كَبيرَةٍ.", "هُوَ يَسْكُنُ في بَيْتٍ خارِجَ المَدينَةِ.", "هُوَ يَعْمَلُ في شَرِكَةٍ.", "الشَّرِكَةُ في وَسَطِ المَدينَةِ.", "يَذْهَبُ مُحَمَّدٌ إِلى الشَّرِكَةِ بِسَيّارَتِهِ.", "في الشّارِعِ ازْدِحامٌ عِنْدَ الصَّباحِ.", "هُوَ يَصِلُ بَعْدَ ساعَةٍ إِلى الشَّرِكَةِ.", "مُحَمَّدٌ لا يُحِبُّ الحَياةَ في المَدينَةِ."] },
 { t: "acik", ar: "التَّدْريبُ (٣): اكْتُبْ مَوْضوعًا مُسْتَعينًا بِالنُّصوصِ الوارِدَةِ في هذِهِ الوَحْدَةِ بِعُنْوانِ: الحَياةُ في المَدينَةِ", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["الحَياةُ في المَدينَةِ", "يُفَضِّلُ كَثيرٌ مِنَ النّاسِ الحَياةَ في المُدُنِ الكَبيرَةِ؛ لِأَنَّ فيها المَصانِعَ وَالشَّرِكاتِ وَالجامِعاتِ وَالمُسْتَشْفَياتِ وَالأَسْواقَ. وَيُهاجِرُ سُكّانُ الرّيفِ إِلى المُدُنِ لِلْعَمَلِ. وَلكِنَّ في المُدُنِ مُشْكِلاتٍ كَثيرَةً، مِثْلَ: التَّلَوُّثِ، وَالضَّوْضاءِ، وَالازْدِحامِ، وَالحَوادِثِ، وَالجَريمَةِ. أَمّا القَرْيَةُ فَفيها الهُدوءُ وَالهَواءُ النَّقِيُّ، وَالأَهْلُ وَالجيرانُ.", "City Life"]] },
 { t: "acik", ar: "التَّدْريبُ (٤): صِفْ عاصِمَةَ بَلَدِكَ في فِقْرَةٍ، مُسْتَعينًا بِما يَلي: المَوْقِعُ - عَدَدُ السُّكّانِ - الصِّحَّةُ - التَّعْليمُ - الاقْتِصادُ - المُشْكِلاتُ", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["عاصِمَةُ بَلَدي", "أَنْقَرَةُ عاصِمَةُ تُرْكِيا، تَقَعُ في وَسَطِ البِلادِ، وَيَبْلُغُ عَدَدُ سُكّانِها نَحْوَ خَمْسَةِ مَلايينِ شَخْصٍ. فيها مُسْتَشْفَياتٌ كَثيرَةٌ، وَجامِعاتٌ كَبيرَةٌ، وَفيها مَقَرُّ الحُكومَةِ، وَشَرِكاتٌ وَمَصانِعُ. وَتُواجِهُ أَنْقَرَةُ مُشْكِلاتٍ، مِثْلَ: الازْدِحامِ، وَالتَّلَوُّثِ في الشِّتاءِ.", "The capital of my country", "The example describes Ankara; write about your own capital."]] }
]},
// ---------------- DERS 52 ----------------
{ no: 52, kisa: "الخَطُّ وَالإِمْلاءُ", ar: "الخَطُّ وَالإِمْلاءُ: المَكْتوبُ وَالمَنْطوقُ", tr: "Calligraphy and spelling: what is written and what is read", ozet: "Write in naskh script; letters written but not read: the wāw of عَمْرو, the alif of the plural, the sun-letter lām, the connecting hamza.", bloklar: [
 { t: "hat", ar: "الخَطُّ — اكْتُبْ بِخَطِّ النَّسْخِ", aciklama: "Write the verse in your notebook in naskh script.", ogeler: [["﴿وَجَاهِدُوا فِي اللَّهِ حَقَّ جِهَادِهِ هُوَ اجْتَبَاكُمْ وَمَا جَعَلَ عَلَيْكُمْ فِي الدِّينِ مِنْ حَرَجٍ﴾ (الحج: ٧٨) — Strive for God as He deserves to be striven for. He has chosen you and has not placed upon you any hardship in religion.", "وجاهدوا في الله حق جهاده، هو اجتباكم، وما جعل عليكم في الدين من حرج"]] },
 { t: "kural", ar: "الإِمْلاءُ: المَكْتوبُ وَالمَنْطوقُ", metin: "يُوافِقُ المَكْتوبُ المَنْطوقَ، إِلّا في مَواضِعَ قَليلَةٍ مِثْلَ: واوِ (عَمْرو) وَأَلِفِ واوِ الجَماعَةِ (جَلَسوا) وَاللّامِ الشَّمْسِيَّةِ، مِثْلَ: (الطَّبيب)، وَهَمْزَةِ الوَصْلِ، مِثْلَ: (واكْتُبْ)، وَالهَمْزَةِ في كَلِمَةِ (ابْن).", tr: "What is written mostly corresponds to what is read; but in a few places there are letters written but not read: the wāw in عَمْرو, the alif after the plural wāw (جَلَسوا), the sun-letter lām (الطَّبيب), the connecting hamza (واكْتُبْ) and the hamza in the word ابْن (between two names)." },
 { t: "ornek", ar: "لاحِظْ هذِهِ الأَمْثِلَةَ", ogeler: [
  ["فَتَحَ عَمْر[[و]] بْنُ العاصِ مِصْرَ.", "ʿAmr ibn al-ʿĀṣ conquered Egypt. (the wāw of عَمْرو is not read)"], ["المُسْلِمونَ فَرِحو[[ا]] حينَما انْتَصَرو[[ا]].", "The Muslims rejoiced when they gained victory. (the alif after the plural wāw is not read)"],
  ["الطَّبيبُ وَ[[ال]]طَّبيبَةُ فَحَصا المَريضَيْنِ.", "The doctor and the woman doctor examined two patients. (the sun-letter lām is not read)"], ["ما اسْمُكَ؟ [[ا]]سْمي الطّاهِرُ.", "What is your name? My name is Ṭāhir. (the connecting hamza is not read in the middle of a sentence)"]] },
 { t: "siniflandir", ar: "أَيُّ الحُروفِ لا يُنْطَقُ؟", soru: "Is the underlined letter read?", gruplar: ["يُنْطَقُ", "لا يُنْطَقُ"], ogeler: [
  ["عَمْر[[و]]", 1], ["كَتَب[[و]]ا", 0], ["كَتَبو[[ا]]", 1], ["[[ال]]شَّمْسُ", 1], ["[[ال]]قَمَرُ", 0], ["وَ[[ا]]كْتُبْ", 1]] }
]}
];
var KELIME = [
 ["القَرْيَةُ (قُرًى)", "village", 40], ["المَدينَةُ (مُدُنٌ)", "city", 40], ["العاصِمَةُ", "capital", 40], ["رَحَلَ - يَرْحَلُ", "to migrate", 40], ["كُلِّيَّةٌ", "faculty, college", 40], ["المَزْرَعَةُ", "farm", 40], ["ماتَ - يَموتُ", "to die", 40], ["الزَّرْعُ", "crops", 40], ["الشَّجَرُ", "tree(s)", 40], ["خائِفٌ", "fearful, worried", 40], ["الحادِثُ (حَوادِثُ)", "accident", 40], ["التَّلَوُّثُ", "pollution", 40], ["الضَّوْضاءُ", "noise", 40], ["الازْدِحامُ", "crowding, traffic", 40], ["الأَهْلُ", "family, relatives", 40], ["الجارُ (جيرانٌ)", "neighbour", 40], ["باعَ - يَبيعُ", "to sell", 40],
 ["مِلْيونٌ (مَلايينُ)", "million", 44], ["واجَهَ - يُواجِهُ", "to meet, to face", 44], ["الجَريمَةُ", "crime", 44], ["بِالرَّغْمِ مِنْ", "despite", 44], ["المَصْنَعُ (مَصانِعُ)", "factory", 44], ["المَكْتَبَةُ", "library", 44], ["ازْدادَ - يَزْدادُ", "to increase", 44], ["الرّيفُ", "countryside, village area", 44], ["هاجَرَ - يُهاجِرُ", "to migrate", 44], ["الزِّراعَةُ", "agriculture", 44], ["الرَّعْيُ", "grazing animals", 44], ["أَدْرَكَ - يُدْرِكُ", "to notice, to grasp", 44], ["الهِجْرَةُ", "migration", 44], ["القَرْنُ", "century", 44], ["النِّسْبَةُ", "proportion", 44], ["المِلْيارُ", "billion", 44], ["العالَمُ الثّالِثُ", "third world", 44],
 ["لَوْ سَمَحْتَ", "excuse me, if you allow", 46], ["وَقَعَ - يَقَعُ", "to be located (place)", 46], ["غَرْبٌ", "west", 46], ["اتَّجَهَ - يَتَّجِهُ", "to head toward", 46], ["الإِشارَةُ الضَّوْئِيَّةُ", "traffic light", 46], ["انْعَطَفَ - يَنْعَطِفُ", "to turn", 46], ["يَسارًا / يَمينًا", "to the left / to the right", 46], ["الدَّوّارُ", "roundabout", 46], ["اسْتَمَرَّ - يَسْتَمِرُّ", "to continue", 46], ["الصَّيْدَلِيَّةُ", "pharmacy", 46], ["الزّاوِيَةُ", "corner", 46], ["مُقابِلَ", "opposite", 46],
 ["مَقَرٌّ", "centre, seat", 49], ["الحُكومَةُ", "government", 49], ["المَصْرِفُ (مَصارِفُ)", "bank", 49], ["العِمارَةُ", "building, apartment block", 49], ["أُنْشِئَ", "was founded", 49], ["الزِّلْزالُ (زَلازِلُ)", "earthquake", 49], ["الآثارُ", "historic monuments", 49], ["المِئْذَنَةُ (مَآذِنُ)", "minaret", 49], ["الأُمَمُ المُتَّحِدَةُ", "the United Nations", 49], ["ناطِحَةُ سَحابٍ", "skyscraper", 49], ["الفَقْرُ", "poverty", 49], ["المُخَدِّراتُ", "drugs", 49]
];
