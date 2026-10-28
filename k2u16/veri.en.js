// ================= VERİ: el-Arabiyyetü beyne yedeyk 2, 16. ünite — الطّاقَةُ =================
// Bloklar k2ortak/uygulama.js içinde çizilir. Asıl kayıt parçaları: zaman.js (ZAMAN); kaydı olmayan metinler gömülü okunuşla çalar.
var UNITE = { no: 16, ar: "الطّاقَةُ", tr: "Energy", pfx: "k2u16:",
  giris: "Unit 16: the electricity bill, oil, the oil crisis, solar energy. Grammar: the signs of the genitive and a general review of the book (adverb, the five nouns, specification, the five verbs, the vocative, the circumstantial accusative, pronouns, the governing particles, the signs of case endings). Spelling: dropping of the yāʾ of the defective noun." };
var DERSLER = [
// ---------------- DERS 196 ----------------
{ no: 196, kisa: "فاتورَةُ الكَهْرَباءِ", ar: "فاتورَةُ الكَهْرَباءِ", tr: "The Electricity Bill", ozet: "Dialogue: the mother and father discuss the doubled electricity bill and the children's waste.", bloklar: [
 { t: "diyalog", resim: ["fatura"], kisiler: [{ ar: "الأَبُ", tr: "Father" }, { ar: "الأُمُّ", tr: "Mother" }], satir: [
  [0, "يا أُمَّ أَحْمَدَ، تَضاعَفَتْ فاتورَةُ الكَهْرَباءِ هذا الشَّهْرَ!", "Umm Ahmad, the electricity bill doubled this month!", "d196-0"],
  [1, "لا عَجَبَ في ذلِكَ، فَقَدْ أَصْبَحْنا نَسْتَهْلِكُ الكَهْرَباءَ كَثيرًا: في الإِضاءَةِ، وَالحاسوبِ، وَالمِذْياعِ، وَالخَلّاطِ، وَالفُرْنِ الكَهْرَبائِيِّ، وَالغَسّالَةِ، وَالمِكْنَسَةِ الكَهْرَبائِيَّةِ، وَغَيْرِ ذلِكَ.", "That is not surprising; we have come to consume a lot of electricity: in lighting, the computer, the radio, the mixer, the electric oven, the washing machine, the vacuum cleaner and others.", "d196-1"],
  [0, "أُلاحِظُ أَنَّ الأَوْلادَ يَتْرُكونَ الأَجْهِزَةَ الكَهْرَبائِيَّةَ تَعْمَلُ طولَ اليَوْمِ، وَكَذلِكَ الإِضاءَةَ، وَهذا تَبْذيرٌ.", "I see the children leaving the electrical appliances and lights on all day; this is waste.", "d196-2"],
  [1, "تَكَلَّمْنا مَعَ الأَوْلادِ كَثيرًا، وَقُلْنا لَهُمْ، نَحْنُ نَسْتَهْلِكُ الكَهْرَباءَ كَثيرًا جِدًّا، وَهذا يُؤَثِّرُ في ميزانِيَّةِ البَيْتِ، وَلكِنْ لا مُسْتَجيبَ لِما نَقولُ.", "We have talked a lot with the children; we told them that we consume too much electricity, that this affects the household budget; but no one listens to what we say.", "d196-3"],
  [0, "لَدَيَّ فِكْرَةٌ، نَقولُ لِلْأَوْلادِ، إِذا انْخَفَضَ اسْتِهْلاكُ الكَهْرَباءِ؛ فَسَوْفَ نُعْطي كُلَّ واحِدٍ مُكافَأَةً.", "I have an idea: Let us tell the children that if electricity consumption falls we will give each of them a prize.", "d196-4"],
  [1, "هَيّا نُجَرِّبْ هذا الأُسْلوبَ.", "Let us try this method.", "d196-5"],
  [0, "(في الشَّهْرِ التّالي) ما شاءَ اللهُ، انْخَفَضَتْ فاتورَةُ الكَهْرَباءِ كَثيرًا هذا الشَّهْرَ. أَعْتَقِدُ أَنَّ أُسْلوبَنا نَجَحَ.", "(The next month) Masha'Allah, the electricity bill dropped a lot this month. I think our method worked.", "d196-6"],
  [1, "وَأَيْنَ مُكافَأَةُ الأَوْلادِ؟", "And where is the children's prize?", "d196-7"],
  [0, "سَأُحْضِرُها مَعي، إِنْ شاءَ اللهُ.", "God willing, I will bring it with me.", "d196-8"]] },
 { t: "dy", ar: "اسْتيعابٌ — التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["تَضاعَفَتْ فاتورَةُ الماءِ هذا الشَّهْرَ.", false, "تَضاعَفَتْ فاتورَةُ الكَهْرَباءِ هذا الشَّهْرَ.", "This month the water bill doubled."],
  ["تَسْتَهْلِكُ الأُسْرَةُ الكَهْرَباءَ كَثيرًا.", true, "", "The family consumes a lot of electricity."],
  ["لا تَعْمَلُ الأَجْهِزَةُ الكَهْرَبائِيَّةُ طولَ الوَقْتِ.", false, "تَعْمَلُ الأَجْهِزَةُ الكَهْرَبائِيَّةُ طولَ اليَوْمِ.", "The electrical appliances do not run all day."],
  ["أَخَذَ الأَوْلادُ مُكافَأَةً مِنَ الأُمِّ.", false, "لَمْ يَأْخُذِ الأَوْلادُ المُكافَأَةَ بَعْدُ، وَسَيُحْضِرُها الأَبُ.", "The children received a prize from the mother."],
  ["نَجَحَ أُسْلوبُ الأُمِّ وَالأَبِ مَعَ الأَوْلادِ.", true, "", "The method of the mother and father worked on the children."]],
  not: "Sentence 4: In the dialogue it is said that the father will bring the prize; the children have not yet received the prize." },
 { t: "sirala", ar: "التَّدْريبُ (٢): رَتِّبِ الجُمَلَ التّالِيَةَ، كَما وَرَدَتْ في الحِوارِ", aciklama: "Arrange in the order of the events.", ogeler: [
  "تَسْتَهْلِكُ الأُسْرَةُ كَثيرًا مِنَ الكَهْرَباءِ.", "لِأَنَّ الأَوْلادَ يَتْرُكونَ الأَجْهِزَةَ تَعْمَلُ كَثيرًا.", "قالَ الأَبُ: لِكُلِّ واحِدٍ مُكافَأَةٌ إِذا انْخَفَضَتِ الفاتورَةُ.", "نَجَحَ هذا الأُسْلوبُ مَعَ الأَوْلادِ.", "أَعْطى الأَبُ لِكُلِّ واحِدٍ مُكافَأَةً."] },
 { t: "esle", ar: "مُفْرَداتٌ — التَّدْريبُ (١): اكْتُبْ أَسْماءَ الأَجْهِزَةِ", aciklama: "Match the definition with the suitable appliance.", ciftler: [
  ["الشَّيْءُ الَّذي نُنَظِّفُ بِهِ البَيْتَ", "المِكْنَسَةُ الكَهْرَبائِيَّةُ", "vacuum cleaner"], ["الشَّيْءُ الَّذي نَسْمَعُ بِهِ الأَخْبارَ", "المِذْياعُ", "radio"], ["الشَّيْءُ الَّذي نَصْنَعُ بِهِ عَصيرَ الفاكِهَةِ", "الخَلّاطُ", "mixer"],
  ["الشَّيْءُ الَّذي نَغْسِلُ بِهِ المَلابِسَ", "الغَسّالَةُ", "washing machine"], ["الشَّيْءُ الَّذي نَطْبُخُ بِهِ الطَّعامَ", "الفُرْنُ الكَهْرَبائِيُّ", "electric oven"], ["الشَّيْءُ الَّذي نُشاهِدُ بِهِ الأَخْبارَ", "التِّلْفازُ", "television"]] },
 { t: "esle", ar: "التَّدْريبُ (٢): هاتِ مِنَ النَّصِّ كَلِماتٍ بِمَعْنى ما يَلي", aciklama: "Match the word with its synonym in the text.", ciftler: [
  ["الحاسِبُ الآلِيُّ", "الحاسوبُ", "computer"], ["زادَ", "تَضاعَفَ", "increased / doubled"], ["رَأْيٌ", "فِكْرَةٌ", "view, opinion"], ["جائِزَةٌ", "مُكافَأَةٌ", "reward"], ["نَقَصَ", "انْخَفَضَ", "decreased, fell"]],
  not: "Item 4 in the book (كُلّ) is not here: no separate synonym of this word occurs in the dialogue; كُلّ in fact occurs unchanged in the text (كُلَّ واحِدٍ)." }
]},
// ---------------- DERS 197 ----------------
{ no: 197, kisa: "أَصْواتٌ: مُراجَعَةٌ", ar: "الأَصْواتُ: مُراجَعَةٌ", tr: "Sounds: review", ozet: "Repetition of hamza-ʿayn, sīn-ṣād, assimilation, qalqala, iqlāb and the connecting hamza.", bloklar: [
 { t: "tekrar", ar: "أَوَّلًا: انْطِقِ الكَلِمَتَيْنِ المُتَقابِلَتَيْنِ، وَمَيِّزْ بَيْنَهُما", aciklama: "Listen to the two words in each line and repeat them, paying attention to the difference of the coloured sound.", ogeler: [
  ["[[مَأْ]]رِبٌ — [[مَآ]]رِبُ", "Maʾrib (a city name) — maʾārib (needs): the sukūn of the hamza and madd"], ["[[سو]]رٌ — [[صو]]رٌ", "sūr (wall) — ṣūr (trumpet): sīn and ṣād"], ["[[عَيْ]]رٌ — [[غَيْ]]رٌ", "ʿayr (wild ass) — ghayr (other): ʿayn and ghayn"],
  ["[[كَلَ]]مَ — [[كَلَّ]]مَ", "he wounded — he spoke: shadda"], ["[[اسْ]]مُكَ — ما [[اسْ]]مُكَ؟", "ism (noun) — what is your name?: the connecting hamza is pronounced at the beginning, drops in the middle"], ["[[ا]]جْلِسْ — [[أَ]]جْلِسُ", "sit! — I sit: the connecting hamza and the cutting hamza"]] },
 { t: "tekrar", ar: "ثانِيًا: انْطِقِ العِبارَتَيْنِ المُتَقابِلَتَيْنِ، وَمَيِّزْ بَيْنَهُما", aciklama: "Pay attention to the difference in pronunciation in the coloured places.", ogeler: [
  ["مِنَ [[الله]]ِ — عَنِ [[الله]]ِ", "From God — from God (about): light and heavy pronunciation of the word Allah"], ["[[رَ]]قَبَةٌ — [[رِ]]قابٌ", "neck — necks: heavy and light rā"], ["قَ[[دْ دَ]]خَلَ — قَ[[دْ غَ]]لَبَ", "he entered — he prevailed: assimilation and iẓhār"],
  ["وَقَ[[دْ تَ]]بَيَّنَ — وَقَ[[دْ]] قَرَأَ", "it became clear — he read: assimilation and qalqala"], ["مَ[[نْ يَ]]عْمَلْ — مَ[[نْ عَ]]رَفَ", "whoever does — whoever knew: assimilation and iẓhār"], ["أَ[[نْبَ]]اءٌ — نَ[[بَأٌ]]", "news — news (singular): iqlāb"]] },
 { t: "sessec", ar: "ثالِثًا: اسْتَمِعْ جَيِّدًا، ثُمَّ ضَعْ دائِرَةً حَوْلَ الكَلِمَةِ الَّتي تَسْمَعُها", aciklama: "The word is read by the computer voice (there is no recording of this exercise).", ogeler: [
  ["أَمينٌ", "آمينَ"], ["اسْمٌ", "بِاسْمِ"], ["بِأَلْبابِ", "بِالْبابِ"], ["سوءٌ", "سَوْءٍ"], ["مُسْلِمينَ", "مُسْلِمَيْنِ"], ["حَصَلَ", "حَصَّلَ"],
  ["مَشْهورانِ", "مَشْهورًا"], ["بِاللهِ", "وَاللهِ"], ["خَيْرُهُ", "خَيْرِهِ"], ["إِذْ ظَلَموا", "إِذا ظَلَموا"], ["تَنَبَّأَ بِهِ", "أَنْبَأَهُ بِهِ"], ["أَنْ باءَ", "أَنْباءٌ"]] }
]},
// ---------------- DERS 198 ----------------
{ no: 198, kisa: "عَلاماتُ جَرِّ الاسْمِ", ar: "عَلاماتُ جَرِّ الاسْمِ", tr: "The signs of the genitive of the noun", ozet: "Kasra (singular, broken plural, sound feminine plural), yāʾ (dual, sound masculine plural, five nouns), fatḥa (diptote).", bloklar: [
 { t: "tablo", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ — عَلاماتُ جَرِّ الاسْمِ", bas: ["العَلامَةُ", "مَتى؟", "مِثالٌ"], satir: [
  ["الكَسْرَةُ", "المُفْرَدُ", "مِنَ المَدْرَسَةِ"], ["الكَسْرَةُ", "جَمْعُ التَّكْسيرِ", "لَدى الطُّلّابِ"], ["الكَسْرَةُ", "جَمْعُ المُؤَنَّثِ السّالِمُ", "مِنَ المُدَرِّساتِ"],
  ["الياءُ", "المُثَنّى", "مِنَ الطّالِبَيْنِ"], ["الياءُ", "جَمْعُ المُذَكَّرِ السّالِمُ", "عِنْدَ المُهَنْدِسينَ"], ["الياءُ", "الأَسْماءُ الخَمْسَةُ", "عِنْدَ أَبيكَ"],
  ["الفَتْحَةُ", "المَمْنوعُ مِنَ الصَّرْفِ", "مِنْ أَحْمَدَ، في مَكَّةَ"]], not: "Diptote nouns (أَحْمَدُ، مَكَّةُ، إِبْراهيمُ، مَساجِدُ…) take no tanwīn and in the genitive take fatḥa instead of kasra." },
 { t: "acik", ar: "التَّدْريبُ (١): ضَعِ الأَسْماءَ التّالِيَةَ في جُمَلٍ، بِحَيْثُ تَكونُ مَجْرورَةً", aciklama: "Example: بِلالٌ ← ذَهَبْتُ إِلى بِلالٍ. First write it yourself; then look at the sample sentence.", ogeler: [
  ["سُلَيْمانُ", "سَلَّمْتُ عَلى سُلَيْمانَ.", "Sulaymān (diptote: fatḥa)"], ["صُحُفٌ", "قَرَأْتُ الخَبَرَ في صُحُفٍ كَثيرَةٍ.", "newspapers (broken plural: kasra)"], ["مَسْجِدانِ", "صَلَّيْتُ في مَسْجِدَيْنِ.", "two mosques (dual: yāʾ)"],
  ["مُعَلِّماتٌ", "سَأَلْتُ عَنِ المُعَلِّماتِ.", "teachers (sound feminine plural: kasra)"], ["قادِمونَ", "سَلَّمْتُ عَلى القادِمينَ.", "those who come (sound masculine plural: yāʾ)"], ["أَخوكَ", "ذَهَبْتُ مَعَ أَخيكَ.", "your brother (five nouns: yāʾ)"],
  ["نائِمونَ", "لا تَتَكَلَّمْ بِصَوْتٍ عالٍ عِنْدَ النّائِمينَ.", "those who sleep (sound masculine plural: yāʾ)"]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٢): اقْرَأِ الآياتِ التّالِيَةَ، ثُمَّ اذْكُرْ نَوْعَ الاسْمِ المَجْرورِ الَّذي تَحْتَهُ خَطٌّ", aciklama: "Example: ﴿سَنَشُدُّ عَضُدَكَ بِ[[أَخِيكَ]]﴾ ← الأَسْماءُ الخَمْسَةُ.", soru: "The kind of noun?", gruplar: ["جَمْعُ تَكْسيرٍ", "جَمْعُ مُؤَنَّثٍ سالِمٌ", "مُثَنًّى", "جَمْعُ مُذَكَّرٍ سالِمٌ", "الأَسْماءُ الخَمْسَةُ", "مَمْنوعٌ مِنَ الصَّرْفِ"], ogeler: [
  ["﴿وَمِنَ [[الْأَعْرَابِ]] مَنْ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ﴾", 0], ["﴿لَقَدْ رَأَى مِنْ [[آيَاتِ]] رَبِّهِ الْكُبْرَى﴾", 1], ["﴿وَبِ[[الْوَالِدَيْنِ]] إِحْسَانًا﴾", 2],
  ["﴿يَوْمَ يَفِرُّ الْمَرْءُ مِنْ [[أَخِيهِ]]﴾", 4], ["﴿سَلَامٌ عَلَى [[إِبْرَاهِيمَ]]﴾", 5], ["﴿وَيَتُوبَ اللَّهُ عَلَى [[الْمُؤْمِنِينَ]]﴾", 3]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٢) — تَتِمَّةٌ: اذْكُرْ عَلامَةَ جَرِّ الاسْمِ الَّذي تَحْتَهُ خَطٌّ", soru: "The sign of the genitive?", gruplar: ["الكَسْرَةُ", "الياءُ", "الفَتْحَةُ"], ogeler: [
  ["﴿وَمِنَ [[الْأَعْرَابِ]] مَنْ يُؤْمِنُ بِاللَّهِ﴾", 0], ["﴿لَقَدْ رَأَى مِنْ [[آيَاتِ]] رَبِّهِ الْكُبْرَى﴾", 0], ["﴿وَبِ[[الْوَالِدَيْنِ]] إِحْسَانًا﴾", 1],
  ["﴿يَوْمَ يَفِرُّ الْمَرْءُ مِنْ [[أَخِيهِ]]﴾", 1], ["﴿سَلَامٌ عَلَى [[إِبْرَاهِيمَ]]﴾", 2], ["﴿وَيَتُوبَ اللَّهُ عَلَى [[الْمُؤْمِنِينَ]]﴾", 1]] }
]},
// ---------------- DERS 199 ----------------
{ no: 199, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to the news about the water problem in the Arab world and desalination by solar energy; talk about the benefits of electricity.", bloklar: [
 { t: "dinle", s: "l199", ar: "اسْتَمِعْ إِلى الخَبَرِ", aciklama: "The water problem in the Arab world. Listen first, then answer the questions.", metin: [
  ["توجَدُ في العالَمِ العَرَبِيِّ كَثيرٌ مِنَ الأَنْهارِ، كَنَهْرِ النّيلِ، وَدِجْلَةَ، وَالفُراتِ، وَاللّيطانِيِّ، كَما توجَدُ فيهِ عَديدٌ مِنَ البِحارِ، مِثْلُ: البَحْرِ الأَحْمَرِ، وَبَحْرِ العَرَبِ، وَالبَحْرِ الأَبْيَضِ المُتَوَسِّطِ.", "In the Arab world there are many rivers such as the Nile, the Tigris, the Euphrates and the Litani; and many seas such as the Red Sea, the Sea of Oman and the Mediterranean."],
  ["وَمَعَ ذلِكَ تُواجِهُ بَعْضُ الدُّوَلِ العَرَبِيَّةِ مُشْكِلَةً في الحُصولِ عَلى المِياهِ، وَسَتَحْتاجُ أَكْثَرُ الدُّوَلِ العَرَبِيَّةِ في المُسْتَقْبَلِ إِلى مَزيدٍ مِنَ المِياهِ، بِسَبَبِ زِيادَةِ السُّكّانِ، وَإِقامَةِ المَشاريعِ الزِّراعِيَّةِ وَالصِّناعِيَّةِ وَالاجْتِماعِيَّةِ.", "Despite this some Arab countries have a problem in water supply; most Arab countries will need more water in future because of population growth and the establishment of agricultural, industrial and social projects."],
  ["يَجِبُ عَلى الدُّوَلِ العَرَبِيَّةِ حُسْنُ اسْتِهْلاكِ المِياهِ، وَمُواجَهَةُ مُشْكِلَةِ التَّصَحُّرِ؛ حَيْثُ تُغَطّي الصَّحْراءُ ما بَيْنَ ١٨ وَ٢٠٪ مِنَ الأَراضي الصّالِحَةِ لِلزِّراعَةِ، وَهِيَ لا تَزيدُ عَلى ١٣٪ مِنْ مِساحَةِ العالَمِ العَرَبِيِّ كُلِّهِ.", "Arab countries should use water well and combat the problem of desertification; because the desert covers 18-20% of the land fit for agriculture; and this land does not exceed 13% of the area of the whole Arab world."],
  ["وَتوجَدُ في العالَمِ العَرَبِيِّ أَكْبَرُ عَمَلِيَّةٍ لِتَحْلِيَةِ المِياهِ في العالَمِ، في السُّعودِيَّةِ وَالكُوَيْتِ، وَتَمْلِكُ الدَّوْلَتانِ ٤٠٪ مِنَ الطّاقَةِ العالَمِيَّةِ لِتَحْلِيَةِ المِياهِ.", "The world's largest water desalination process is in the Arab world, in Saudi Arabia and Kuwait; the two countries possess 40% of the world's desalination capacity."],
  ["وَتَقومُ بَعْضُ الدُّوَلِ العَرَبِيَّةِ بِاسْتِخْدامِ طاقَةِ الشَّمْسِ بَدَلًا عَنِ الطّاقَةِ النِّفْطِيَّةِ مُرْتَفِعَةِ التَّكاليفِ.", "Some Arab countries use solar energy instead of oil energy, whose cost is high."]],
  not: "The text has been transcribed from the recording; the book has only the sentences to be completed." },
 { t: "secim", ar: "اسْتَمِعْ إِلى الخَبَرِ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التّالِيَةِ بِاخْتِصارٍ", ogeler: [
  ["مِنَ الأَنْهارِ العَرَبِيَّةِ نَهْرُ … وَنَهْرُ …", "النّيلِ … دِجْلَةَ", ["الأَمازونِ … الرّاينِ", "الدّانوبِ … الفولْغا"], "Among the Arab rivers … and …", "The Euphrates and the Litani are also correct."],
  ["مِنَ البِحارِ في العالَمِ العَرَبِيِّ بَحْرُ … وَالبَحْرُ …", "العَرَبِ … الأَحْمَرُ", ["الشَّمالِ … الأَسْوَدُ", "قَزْوينَ … الأَبْيَضُ"], "Among the seas in the Arab world … and …", "The Mediterranean (البَحْرُ الأَبْيَضُ المُتَوَسِّطُ) is also correct."],
  ["سَتَزيدُ مُشْكِلَةُ المِياهِ في العالَمِ العَرَبِيِّ في المُسْتَقْبَلِ بِسَبَبِ … وَ…", "زِيادَةِ السُّكّانِ … إِقامَةِ المَشاريعِ الزِّراعِيَّةِ وَالصِّناعِيَّةِ", ["قِلَّةِ السُّكّانِ … كَثْرَةِ الأَمْطارِ", "تَحْلِيَةِ المِياهِ … الطّاقَةِ الشَّمْسِيَّةِ"], "The water problem in the Arab world will increase in future because of … and … ."],
  ["البَلَدانِ العَرَبِيّانِ اللَّذانِ بِهِما أَكْبَرُ عَمَلِيَّةٍ لِتَحْلِيَةِ المِياهِ هُما … وَ…", "السُّعودِيَّةُ … الكُوَيْتُ", ["مِصْرُ … العِراقُ", "الإِماراتُ … قَطَرُ"], "The two Arab countries where the largest desalination process is located are … and … ."],
  ["الطّاقَةُ الشَّمْسِيَّةُ أَقَلُّ تَكْلِفَةً مِنْ …", "الطّاقَةِ النِّفْطِيَّةِ.", ["طاقَةِ الرِّياحِ.", "الطّاقَةِ الكَهْرَبائِيَّةِ."], "Solar energy is cheaper than … ."],
  ["مِساحَةُ الصَّحْراءِ أَكْبَرُ مِنْ مِساحَةِ الأَرْضِ … في العالَمِ العَرَبِيِّ.", "الصّالِحَةِ لِلزِّراعَةِ", ["المَزْروعَةِ بِالنَّخيلِ", "الَّتي فيها نِفْطٌ"], "The area of the desert is greater in the Arab world than the lands … .", "In the recording: The land fit for agriculture does not exceed 13% of the Arab world."]] },
 { t: "acik", ar: "تَكَلَّمْ — التَّدْريبُ (١): ناقِشِ المَوْضوعَ التّالِيَ مَعَ فَريقٍ مِنْ زُمَلائِكَ: فَوائِدُ الكَهْرَباءِ في حَياةِ الإِنْسانِ", aciklama: "A group activity; then look at the sample answers.", ogeler: [
  ["(١)", "نَسْتَعْمِلُ الكَهْرَباءَ في إِضاءَةِ البُيوتِ وَالشَّوارِعِ.", "1"], ["(٢)", "تَعْمَلُ بِها الأَجْهِزَةُ: الثَّلّاجَةُ وَالغَسّالَةُ وَالفُرْنُ.", "2"], ["(٣)", "نَسْتَعْمِلُها في التَّبْريدِ وَالتَّدْفِئَةِ.", "3"],
  ["(٤)", "تَعْمَلُ بِها المَصانِعُ وَالمُسْتَشْفَياتُ.", "4"], ["(٥)", "نَسْتَعْمِلُها في الحاسوبِ وَالهاتِفِ وَوَسائِلِ الاتِّصالِ.", "5"], ["(٦)", "تَعْمَلُ بِها بَعْضُ القِطاراتِ وَالسَّيّاراتِ.", "6"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): ناقِشِ المَوْضوعَيْنِ التّالِيَيْنِ مَعَ فَريقٍ مِنْ زُمَلائِكَ", aciklama: "Say three ideas for each topic; then look at the examples.", ogeler: [
  ["أ- اسْتِهْلاكُ الماءِ", "نُغْلِقُ الصُّنْبورَ بَعْدَ الاسْتِعْمالِ، وَلا نُسْرِفُ في الوُضوءِ وَالاسْتِحْمامِ، وَنُصْلِحُ الأَنابيبَ المَكْسورَةَ.", "Water consumption"],
  ["ب- اسْتِهْلاكُ الكَهْرَباءِ", "نُطْفِئُ الإِضاءَةَ إِذا خَرَجْنا مِنَ الغُرْفَةِ، وَلا نَتْرُكُ الأَجْهِزَةَ تَعْمَلُ بِلا حاجَةٍ، وَنَسْتَعْمِلُ المَصابيحَ المُوَفِّرَةَ.", "Electricity consumption"]] }
]},
// ---------------- DERS 200 ----------------
{ no: 200, kisa: "النِّفْطُ", ar: "النِّفْطُ", tr: "Oil", ozet: "Reading text: the importance of oil, its uses and the world's reserves.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["ما أَهَمُّ أَنْواعِ الطّاقَةِ؟", "What are the most important kinds of energy?"], ["ما أَهَمُّ المَناطِقِ الَّتي يوجَدُ فيها النِّفْطُ؟", "Where are the most important regions where oil is found?"], ["ما أَكْثَرُ الدُّوَلِ إِنْتاجًا لِلنِّفْطِ؟", "Which countries produce the most oil?"], ["ما أَكْثَرُ الدُّوَلِ اسْتِهْلاكًا لِلنِّفْطِ؟ لِماذا؟", "Which countries consume the most oil? Why?"]] },
 { t: "metin", resim: ["pompa", "bayrak"], paragraf: [
  [["النِّفْطُ مِنْ أَهَمِّ الثَّرَواتِ الطَّبيعِيَّةِ في العالَمِ. وَلِذلِكَ يَعُدُّهُ بَعْضُ النّاسِ الذَّهَبَ الأَسْوَدَ، وَيَعُدُّهُ آخَرونَ شِرْيانَ الحَياةِ؛ لِأَنَّ السَّيّاراتِ وَالشّاحِناتِ وَالقِطاراتِ وَالسُّفُنَ وَالطّائِراتِ تَعْتَمِدُ عَلَيْهِ.", "Oil is among the most important natural resources in the world. Therefore some people consider it black gold, and others the artery of life; because cars, lorries, trains, ships and aeroplanes depend on it.", "m200-0"],
   ["كَما أَنَّ الكَهْرَباءَ الَّتي تُسْتَخْدَمُ في البُيوتِ، وَأَماكِنَ كَثيرَةٍ أُخْرى، تُؤْخَذُ مِنْهُ. وَيُوَفِّرُ النِّفْطُ نِصْفَ الطّاقَةِ، الَّتي يَسْتَهْلِكُها الإِنْسانُ.", "The electricity used in homes and many other places is also obtained from it. Oil provides half of the energy man consumes.", "m200-1"]],
  [["تَعْتَمِدُ مُعْظَمُ الدُّوَلِ الصِّناعِيَّةِ عَلى النِّفْطِ، وَتَسْتَخْدِمُهُ في أَشْياءَ كَثيرَةٍ، مِنْها: اسْتِخْدامُهُ وَقودًا لِلْمَرْكَباتِ، وَاسْتِخْدامُهُ في صِناعَةِ المَنْسوجاتِ، وَمُسْتَحْضَراتِ التَّجْميلِ، وَالمُنَظِّفاتِ، وَالسَّجّادِ، وَالبِلاسْتيكِ، وَالأَسْمِدَةِ، وَمِئاتِ المُنْتَجاتِ الأُخْرى.", "Most industrial countries depend on oil and use it in many things: as fuel for vehicles, and in the production of textiles, cosmetics, cleaning materials, carpets, plastic, fertilizer and hundreds of other products.", "m200-2"],
   ["وَيُحاوِلُ العُلَماءُ البَحْثَ عَنْ بَديلٍ آخَرَ لِلنِّفْطِ، وَلكِنْ يَبْدو أَنَّ البَحْثَ سَيَسْتَغْرِقُ وَقْتًا طَويلًا.", "Scientists are trying to look for another alternative to oil; but the search seems likely to take a long time.", "m200-3"]],
  [["يوجَدُ النِّفْطُ في كَثيرٍ مِنَ الدُّوَلِ، وَيُقالُ إِنَّ احْتِياطَ النِّفْطِ في العالَمِ، يَصِلُ إِلى نَحْوِ ٩٠٠ مِلْيارِ بَرْميلٍ.", "Oil is found in many countries; it is said that the world's oil reserve reaches about 900 billion barrels.", "m200-4"],
   ["وَمِنْ أَهَمِّ المَناطِقِ الَّتي يوجَدُ فيها النِّفْطُ: دُوَلُ الخَليجِ العَرَبِيِّ، وَبِها نَحْوُ ٦٦٠ مِلْيارِ بَرْميلٍ. وَفي السُّعودِيَّةِ نَحْوُ خُمُسِ احْتِياطِ العالَمِ. وَفي الإِماراتِ العَرَبِيَّةِ المُتَّحِدَةِ، وَإيرانَ، وَالعِراقِ، وَالكُوَيْتِ نَحْوُ عُشْرِ احْتِياطِ العالَمِ.", "One of the most important regions where oil is found is the countries of the Arabian Gulf; there are about 660 billion barrels there. In Saudi Arabia is about a fifth of the world's reserve; in the United Arab Emirates, Iran, Iraq and Kuwait about a tenth each.", "m200-5"],
   ["وَالنِّفْطُ مَحْدودٌ في العالَمِ، وَسَيَنْتَهي في يَوْمٍ مِنَ الأَيّامِ، وَلِذلِكَ يَجِبُ عَلى الأَفْرادِ وَالدُّوَلِ المُحافَظَةُ عَلَيْهِ.", "Oil in the world is limited and will one day run out; therefore individuals and states must protect it.", "m200-6"]]] },
 { t: "dy", ar: "اسْتيعابٌ — التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["النِّفْطُ أَهَمُّ الثَّرَواتِ الطَّبيعِيَّةِ في العالَمِ.", true, "", "Oil is the most important natural resource in the world."],
  ["الكَهْرَباءُ الَّتي نَسْتَخْدِمُها تُؤْخَذُ مِنَ النِّفْطِ.", true, "", "The electricity we use is obtained from oil."],
  ["احْتِياطُ النِّفْطِ في العالَمِ ٩٠٠ مِلْيونِ بَرْميلٍ.", false, "احْتِياطُ النِّفْطِ في العالَمِ نَحْوُ ٩٠٠ مِلْيارِ بَرْميلٍ.", "The world's oil reserve is 900 million barrels."],
  ["في السُّعودِيَّةِ مُعْظَمُ احْتِياطِ العالَمِ مِنَ النِّفْطِ.", false, "في السُّعودِيَّةِ نَحْوُ خُمُسِ احْتِياطِ العالَمِ مِنَ النِّفْطِ.", "Most of the world's oil reserve is in Saudi Arabia."],
  ["يُسْتَعْمَلُ النِّفْطُ في مُسْتَحْضَراتِ التَّجْميلِ.", true, "", "Oil is used in cosmetics."]],
  not: "Sentence 1: The text says “one of the most important resources” (مِنْ أَهَمِّ); the book considers this sentence correct." },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ عَمّا يَلي", ogeler: [
  ["مِنْ أَيْنَ يَأْخُذُ الإِنْسانُ مُعْظَمَ الطّاقَةِ الَّتي يَسْتَخْدِمُها؟", "مِنَ النِّفْطِ.", ["مِنَ الشَّمْسِ.", "مِنَ الفَحْمِ."], "Where does man get most of the energy he uses?"],
  ["في أَيِّ شَيْءٍ يَسْتَعْمِلُ الإِنْسانُ النِّفْطَ؟", "وَقودًا لِلْمَرْكَباتِ، وَفي صِناعَةِ المَنْسوجاتِ وَالبِلاسْتيكِ وَغَيْرِها.", ["في الزِّراعَةِ فَقَطْ.", "في الشُّرْبِ وَالنَّظافَةِ."], "Where does man use oil?"],
  ["ما الدُّوَلُ الَّتي فيها عُشْرُ احْتِياطِ العالَمِ مِنَ النِّفْطِ؟", "الإِماراتُ، وَإيرانُ، وَالعِراقُ، وَالكُوَيْتُ.", ["السُّعودِيَّةُ.", "الدُّوَلُ الصِّناعِيَّةُ."], "In which countries is a tenth of the world's oil reserve?"],
  ["ما الدَّوْلَةُ الَّتي فيها خُمُسُ احْتِياطِ العالَمِ مِنَ النِّفْطِ؟", "السُّعودِيَّةُ.", ["الكُوَيْتُ.", "العِراقُ."], "In which country is a fifth of the world's oil reserve?"],
  ["ما أَهَمُّ مَنْطِقَةٍ يوجَدُ فيها النِّفْطُ؟", "دُوَلُ الخَليجِ العَرَبِيِّ.", ["أوروبّا.", "إِفْريقِيا."], "What is the most important region where oil is found?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — التَّدْريبُ (١): صِلْ بَيْنَ الكَلِمَتَيْنِ اللَّتَيْنِ تَأْتِيانِ مَعًا، وَاسْتَعْمِلْهُما في جُمْلَةٍ مِنْ إِنْشائِكَ", ciftler: [
  ["صِناعَةُ", "المَنْسوجاتِ", "textile industry"], ["احْتِياطُ", "النِّفْطِ", "oil reserve"], ["الذَّهَبُ", "الأَسْوَدُ", "black gold"], ["شِرْيانُ", "الحَياةِ", "the artery of life"], ["الأَجْهِزَةُ", "الكَهْرَبائِيَّةُ", "electrical appliances"], ["مُسْتَحْضَراتُ", "التَّجْميلِ", "cosmetic products"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): ابْحَثْ عَنِ الكَلِماتِ التّالِيَةِ في مُعْجَمٍ عَرَبِيٍّ، ثُمَّ سَجِّلْ مَعانِيَها", aciklama: "First look it up in the dictionary; then look at the sample meaning.", ogeler: [
  ["الوَقودُ (و، ق، د)", "ما تُوقَدُ بِهِ النّارُ، وَما تَعْمَلُ بِهِ المُحَرِّكاتُ.", "fuel"], ["الطّاقَةُ (ط، و، ق)", "القُدْرَةُ عَلى العَمَلِ وَالحَرَكَةِ.", "energy, power"], ["المَنْسوجاتُ (ن، س، ج)", "الأَقْمِشَةُ وَالثِّيابُ المَصْنوعَةُ بِالنَّسْجِ.", "textiles, fabrics"],
  ["يُوَفِّرُ (و، ف، ر)", "يُقَدِّمُ الشَّيْءَ وَيَجْعَلُهُ كَثيرًا مَوْجودًا.", "it provides"], ["السُّفُنُ (س، ف، ن)", "جَمْعُ سَفينَةٍ، وَهِيَ المَرْكَبُ الكَبيرُ في البَحْرِ.", "ships"]] }
]},
// ---------------- DERS 201 ----------------
{ no: 201, kisa: "مُراجَعاتٌ نَحْوِيَّةٌ (١)", ar: "مُراجَعاتٌ نَحْوِيَّةٌ (١)", tr: "Grammar review (1)", ozet: "Adverb, the five nouns, specification, the five verbs and the vocative.", bloklar: [
 { t: "tablo", ar: "هَلْ تَتَذَكَّرُ هذِهِ القَواعِدَ؟ ضَعْ مِثالًا مُناسِبًا", bas: ["القاعِدَةُ", "النَّوْعُ", "مِثالٌ"], satir: [
  ["الظَّرْفُ", "ظَرْفُ زَمانٍ", "سافَرْتُ صَباحًا."], ["الظَّرْفُ", "ظَرْفُ مَكانٍ", "جَلَسْتُ تَحْتَ الشَّجَرَةِ."],
  ["الأَسْماءُ الخَمْسَةُ", "أَبٌ، أَخٌ، حَمٌ، فو، ذو", "أَبوكَ، أَخوكَ، حَموكِ، فوكَ، ذو مالٍ"],
  ["تَمْييزُ العَدَدِ", "مُفْرَدٌ مَنْصوبٌ (١١-٩٩)", "في الفَصْلِ عِشْرونَ طالِبًا."], ["تَمْييزُ العَدَدِ", "مُفْرَدٌ مَجْرورٌ (١٠٠، ١٠٠٠)", "في المَدْرَسَةِ مِئَةُ طالِبٍ."], ["تَمْييزُ العَدَدِ", "جَمْعٌ مَجْرورٌ (٣-١٠)", "في الفَصْلِ خَمْسَةُ طُلّابٍ."],
  ["الأَفْعالُ الخَمْسَةُ", "أَلِفُ الاثْنَيْنِ", "أَنْتُما تَكْتُبانِ، هُما يَكْتُبانِ"], ["الأَفْعالُ الخَمْسَةُ", "واوُ الجَماعَةِ", "أَنْتُمْ تَكْتُبونَ، هُمْ يَكْتُبونَ"], ["الأَفْعالُ الخَمْسَةُ", "ياءُ المُخاطَبَةِ", "أَنْتِ تَكْتُبينَ"],
  ["المُنادى", "مَنْصوبٌ: مُضافٌ", "يا عَبْدَ اللهِ"], ["المُنادى", "مَنْصوبٌ: نَكِرَةٌ غَيْرُ مَقْصودَةٍ", "يا غافِلًا تَنَبَّهْ"], ["المُنادى", "مَبْنِيٌّ عَلى الضَّمِّ: عَلَمٌ", "يا مُحَمَّدُ"], ["المُنادى", "مَبْنِيٌّ عَلى الضَّمِّ: نَكِرَةٌ مَقْصودَةٌ", "يا طالِبُ"]] },
 { t: "acik", ar: "أ- أَعِدْ كِتابَةَ الجُمَلِ التّالِيَةِ مُنَفِّذًا المَطْلوبَ بَيْنَ القَوْسَيْنِ، وَغَيِّرْ ما يَلْزَمُ", aciklama: "First write it yourself; then look at the sample answer.", ogeler: [
  ["سَأَحْضُرُ في المَساءِ إِنْ شاءَ اللهُ. (حَوِّلْ ما تَحْتَهُ خَطٌّ إِلى ظَرْفِ زَمانٍ)", "سَأَحْضُرُ مَساءً إِنْ شاءَ اللهُ.", "I will come in the evening, God willing."],
  ["صَلّى إِبْراهيمُ العَصْرَ في المَسْجِدِ. (حَوِّلْ إِبْراهيمَ إِلى اسْمٍ مِنَ الأَسْماءِ الخَمْسَةِ)", "صَلّى أَخوكَ العَصْرَ في المَسْجِدِ.", "Your brother prayed the afternoon prayer in the mosque."],
  ["أَيْنَ يَقِفُ المُعَلِّمُ؟ (أَجِبْ مُسْتَخْدِمًا ظَرْفًا لِلْمَكانِ)", "يَقِفُ المُعَلِّمُ أَمامَ السَّبّورَةِ.", "The teacher is standing in front of the board."],
  ["كَمْ عَدَدُ الطُّلّابِ هُنا؟ (أَجِبْ بِتَمْييزٍ مُفْرَدٍ مَنْصوبٍ)", "عَدَدُ الطُّلّابِ هُنا خَمْسَةَ عَشَرَ طالِبًا.", "The number of students here is fifteen."],
  ["كَمْ عَدَدُ الطُّلّابِ هُنا؟ (أَجِبْ بِتَمْييزٍ مُفْرَدٍ مَجْرورٍ)", "عَدَدُ الطُّلّابِ هُنا مِئَةُ طالِبٍ.", "The number of students here is a hundred."],
  ["كَمْ عَدَدُ الطُّلّابِ هُنا؟ (أَجِبْ بِتَمْييزٍ جَمْعٍ مَجْرورٍ)", "عَدَدُ الطُّلّابِ هُنا ثَمانِيَةُ طُلّابٍ.", "The number of students here is eight."]] },
 { t: "bosluk", ar: "ب- ضَعْ في الفَراغِ فِعْلًا مِنَ الأَفْعالِ الخَمْسَةِ، مُسْتَعينًا بِما بَيْنَ القَوْسَيْنِ", ogeler: [
  ["هَلْ ___ اللُّغَةَ العَرَبِيَّةَ يا ابْنَتي؟ (يَدْرُسُ)", "تَدْرُسينَ", ["تَدْرُسُ", "تَدْرُسي"], "My daughter, are you studying Arabic?"],
  ["البِنْتانِ لَمْ ___ الحَليبَ. (يَتَناوَلُ)", "تَتَناوَلا", ["تَتَناوَلانِ", "يَتَناوَلوا"], "The two girls did not drink the milk."],
  ["يا أَوْلادُ، لا ___ الأَجْهِزَةَ الكَهْرَبائِيَّةَ تَعْمَلُ كَثيرًا. (يَتْرُكُ)", "تَتْرُكوا", ["تَتْرُكونَ", "تَتْرُكْ"], "Children, do not leave the electrical appliances running for a long time."],
  ["يا طالِبَةُ، لَنْ ___ هذا الأُسْلوبَ مَرَّةً أُخْرى. (يُجَرِّبُ)", "تُجَرِّبي", ["تُجَرِّبينَ", "تُجَرِّبَ"], "Student (girl), you will not try this method again."],
  ["النّاسُ ___ النِّفْطَ في أَشْياءَ كَثيرَةٍ. (يَسْتَخْدِمُ)", "يَسْتَخْدِمونَ", ["يَسْتَخْدِموا", "تَسْتَخْدِمينَ"], "People use oil in many things."],
  ["يا فاطِمَةُ، لِماذا لَمْ ___ عَنْ عَمَلٍ آخَرَ؟ (يَبْحَثُ)", "تَبْحَثي", ["تَبْحَثينَ", "تَبْحَثْ"], "Fāṭima, why did you not look for another job?"]],
  not: "لَمْ / لَنْ / لا (prohibitive) drop the nūn at the end of the five verbs: تَتَناوَلا، تَتْرُكوا، تُجَرِّبي، تَبْحَثي." },
 { t: "acik", ar: "ج- هاتِ المُنادى المَطْلوبَ في جُمَلٍ مُفيدَةٍ", aciklama: "First write it yourself; then look at the sample sentence.", ogeler: [
  ["مُضافًا مَنْصوبًا", "يا عَبْدَ اللهِ، صَلِّ في المَسْجِدِ.", "annexed (accusative)"], ["عَلَمًا مُفْرَدًا", "يا خالِدُ، اقْرَأِ الدَّرْسَ.", "single proper name (built on ḍamma)"],
  ["نَكِرَةً غَيْرَ مَقْصودَةٍ", "يا مُسافِرًا، لا تَنْسَ جَوازَ السَّفَرِ.", "indefinite not intending a particular person (accusative)"], ["نَكِرَةً مَقْصودَةً", "يا طالِبُ، اكْتُبِ الواجِبَ.", "indefinite intending a particular person (built on ḍamma)"]] }
]},
// ---------------- DERS 202 ----------------
{ no: 202, kisa: "أَزْمَةُ النِّفْطِ", ar: "أَزْمَةُ النِّفْطِ", tr: "The Oil Crisis", ozet: "Dialogue: Hassān and ʿImād discuss the causes of the oil crisis and the state of the poor countries.", bloklar: [
 { t: "diyalog", resim: ["benzin"], kisiler: [{ ar: "حَسّانُ", tr: "Hassān" }, { ar: "عِمادٌ", tr: "ʿImād" }], satir: [
  [0, "تَجَدَّدَتْ أَزْمَةُ النِّفْطِ مَرَّةً أُخْرى هذا العامَ.", "The oil crisis has been renewed once again this year.", "d202-0"],
  [1, "وَقَفَزَتْ أَسْعارُ الوَقودِ مِنْ جَديدٍ، وَأَصْبَحَ المَعْروضُ مِنْهُ قَليلًا في مَحَطّاتِ الوَقودِ.", "Fuel prices have shot up again; the fuel supplied at petrol stations has decreased.", "d202-1"],
  [0, "أَنا لا أَسْتَخْدِمُ سَيّارَتي الآنَ، وَأَذْهَبُ إِلى الشَّرِكَةِ بِالحافِلَةِ.", "I am not driving my car now; I go to the company by bus.", "d202-2"],
  [1, "ما أَسْبابُ أَزْمَةِ النِّفْطِ؟", "What are the causes of the oil crisis?", "d202-3"],
  [0, "هُناكَ خِلافٌ بَيْنَ الدُّوَلِ الصِّناعِيَّةِ، وَبَيْنَ الدُّوَلِ المُنْتِجَةِ لِلنِّفْطِ.", "There is a dispute between the industrial countries and the oil-producing countries.", "d202-4"],
  [1, "لِماذا تَخْتَلِفُ تِلْكَ الدُّوَلُ؟", "Why can those countries not agree?", "d202-5"],
  [0, "تَدَّعي الدُّوَلُ الصِّناعِيَّةُ، أَنَّ الدُّوَلَ المُنْتِجَةَ لِلنِّفْطِ تَرْفَعُ الأَسْعارَ، وَتَقولُ الدُّوَلُ المُنْتِجَةُ لِلنِّفْطِ، إِنَّ الدُّوَلَ الصِّناعِيَّةَ، تَفْرِضُ ضَرائِبَ عالِيَةً عَلى الوَقودِ.", "The industrial countries claim that the oil-producing countries raise prices; the oil-producing countries say that the industrial countries impose high taxes on fuel.", "d202-6"],
  [1, "وَما ذَنْبُ الَّذينَ يَعيشونَ في الدُّوَلِ الفَقيرَةِ؟!", "And what is the fault of those who live in poor countries?!", "d202-7"],
  [0, "لا ذَنْبَ لَهُمْ فَهُمْ فُقَراءُ.", "They have no fault; they are poor."],
  [1, "وَلَيْسَ لَدَيْهِمْ صِناعاتٌ يَبيعونَها، وَلا نِفْطٌ يُصَدِّرونَهُ.", "They have no industrial products to sell and no oil to export.", "d202-9"],
  [0, "تُفَكِّرُ الدُّوَلُ الصِّناعِيَّةُ في شُعوبِها فَقَطْ، وَلا تُفَكِّرُ في غَيْرِهِمْ؟!", "Do the industrial countries think only of their own peoples, and not of others?!", "d202-10"],
  [1, "كانَ اللهُ في عَوْنِ الفُقَراءِ.", "May God be the helper of the poor.", "d202-11"]],
  not: "The recording is from the old edition: the sentence “لا ذَنْبَ لَهُمْ فَهُمْ فُقَراءُ” is not in the recording (it is read by the computer voice); in the recording the words “وَلا تُفَكِّرُ فينا… لا عَجَبَ في ذلِكَ، فَنَحْنُ دُوَلٌ فَقيرَةٌ” also occur." },
 { t: "dy", ar: "اسْتيعابٌ — التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["في مَحَطّاتِ الوَقودِ كَثيرٌ مِنَ النِّفْطِ.", false, "المَعْروضُ مِنَ الوَقودِ قَليلٌ في مَحَطّاتِ الوَقودِ.", "There is plenty of oil at the petrol stations."],
  ["حَسّانُ لا يَذْهَبُ إِلى الشَّرِكَةِ بِسَيّارَتِهِ.", true, "", "Hassān does not go to the company by car."],
  ["هُناكَ خِلافٌ بَيْنَ الدُّوَلِ الصِّناعِيَّةِ وَالدُّوَلِ المُنْتِجَةِ لِلنِّفْطِ.", true, "", "There is a dispute between the industrial countries and the oil-producing countries."],
  ["الدُّوَلُ الصِّناعِيَّةُ مُنْتِجَةٌ لِلنِّفْطِ.", false, "الدُّوَلُ الصِّناعِيَّةُ غَيْرُ الدُّوَلِ المُنْتِجَةِ لِلنِّفْطِ.", "The industrial countries are oil producers."],
  ["الدُّوَلُ المُنْتِجَةُ لِلنِّفْطِ تَفْرِضُ ضَرائِبَ عَلى النِّفْطِ.", false, "الدُّوَلُ الصِّناعِيَّةُ تَفْرِضُ ضَرائِبَ عالِيَةً عَلى الوَقودِ.", "The oil-producing countries are imposing a tax on oil."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ عَمّا يَلي", ogeler: [
  ["لِماذا تَرْتَفِعُ أَسْعارُ الوَقودِ؟", "لِأَنَّ المَعْروضَ مِنْهُ أَصْبَحَ قَليلًا، وَهُناكَ أَزْمَةٌ في النِّفْطِ.", ["لِأَنَّ النّاسَ لا يَسْتَخْدِمونَ السَّيّاراتِ.", "لِأَنَّ الدُّوَلَ الفَقيرَةَ تُصَدِّرُ النِّفْطَ."], "Why are fuel prices rising?"],
  ["ما السَّبَبُ في أَزْمَةِ النِّفْطِ؟", "الخِلافُ بَيْنَ الدُّوَلِ الصِّناعِيَّةِ وَالدُّوَلِ المُنْتِجَةِ لِلنِّفْطِ.", ["الخِلافُ بَيْنَ الدُّوَلِ الفَقيرَةِ.", "قِلَّةُ السَّيّاراتِ."], "What is the cause of the oil crisis?"],
  ["ماذا تَقولُ الدُّوَلُ الصِّناعِيَّةُ؟", "تَقولُ إِنَّ الدُّوَلَ المُنْتِجَةَ لِلنِّفْطِ تَرْفَعُ الأَسْعارَ.", ["تَقولُ إِنَّ الضَّرائِبَ عالِيَةٌ.", "تَقولُ إِنَّ الفُقَراءَ لا ذَنْبَ لَهُمْ."], "What do the industrial countries say?"],
  ["ماذا تَقولُ الدُّوَلُ المُنْتِجَةُ لِلنِّفْطِ؟", "تَقولُ إِنَّ الدُّوَلَ الصِّناعِيَّةَ تَفْرِضُ ضَرائِبَ عالِيَةً عَلى الوَقودِ.", ["تَقولُ إِنَّ الأَسْعارَ رَخيصَةٌ.", "تَقولُ إِنَّ الدُّوَلَ الصِّناعِيَّةَ تَرْفَعُ الأَسْعارَ."], "What do the oil-producing countries say?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — التَّدْريبُ (١): صِلْ بَيْنَ الكَلِمَتَيْنِ اللَّتَيْنِ تَأْتِيانِ مَعًا، وَاسْتَعْمِلْهُما في جُمْلَةٍ مِنْ إِنْشائِكَ", ciftler: [
  ["تَفْرِضُ", "ضَرائِبَ", "he imposes a tax"], ["دُوَلٌ", "مُنْتِجَةٌ", "producing countries"], ["ضَرائِبُ", "عالِيَةٌ", "high taxes"], ["مَحَطّاتُ", "الوَقودِ", "petrol stations"], ["تَقْفِزُ", "الأَسْعارُ", "prices shoot up"], ["تَصْديرُ", "النِّفْطِ", "oil export"]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): امْلَأِ الفَراغَ بِكَلِمَةٍ مُناسِبَةٍ مُشْتَقَّةٍ مِنَ الحُروفِ في الصُّنْدوقِ (خ ل ف) وَ(ص ن ع)", ogeler: [
  ["حَدَثَ ___ بَيْنَ الدَّوْلَتَيْنِ.", "خِلافٌ", ["خَليفَةٌ", "خَلْفَ"], "A dispute arose between the two states."],
  ["لِماذا ___ الصَّديقانِ؟", "اخْتَلَفَ", ["خَلَفَ", "مُخْتَلِفٌ"], "Why did the two friends not agree?"],
  ["هذا الثَّوْبُ ___.", "مُخْتَلِفٌ", ["اخْتَلَفَ", "خِلافٌ"], "This dress is different."],
  ["بَيْنَ الصّورَتَيْنِ ___ كَثيرَةٌ.", "اخْتِلافاتٌ", ["مُخْتَلِفٌ", "خَلَفَ"], "There are many differences between the two pictures."],
  ["مَنْ ___ الهاتِفَ؟", "صَنَعَ", ["صِناعَةٌ", "مَصْنَعٌ"], "Who made the telephone?"],
  ["في المَدينَةِ ___ كَثيرَةٌ.", "مَصانِعُ", ["صَنَعَ", "صانِعٌ"], "There are many factories in the city."],
  ["يَعْمَلُ أَخي في ___ الأَجْهِزَةِ الكَهْرَبائِيَّةِ.", "صِناعَةِ", ["صَنَعَ", "مَصانِعُ"], "My brother works in the production of electrical appliances."],
  ["هَلْ في بَلَدِكَ زِراعَةٌ، أَوْ ___؟", "صِناعَةٌ", ["صَنَعَ", "مَصْنوعٌ"], "Does your country have agriculture or industry?"]] }
]},
// ---------------- DERS 203 ----------------
{ no: 203, kisa: "مُراجَعَةٌ نَحْوِيَّةٌ", ar: "مُراجَعَةٌ نَحْوِيَّةٌ: الحالُ وَالاسْمُ", tr: "Grammar review: the circumstantial accusative, indefinite and definite", ozet: "The circumstantial accusative states the condition of the subject or object; the noun is indefinite or definite (proper name, with the article).", bloklar: [
 { t: "tablo", ar: "مُراجَعَةٌ نَحْوِيَّةٌ (١): هَلْ تَتَذَكَّرُ هذِهِ القَواعِدَ؟", bas: ["القاعِدَةُ", "النَّوْعُ", "مِثالٌ"], satir: [
  ["الحالُ", "يُبَيِّنُ هَيْئَةَ الفاعِلِ", "جاءَ الطّالِبُ مُسْرِعًا."], ["الحالُ", "يُبَيِّنُ هَيْئَةَ المَفْعولِ بِهِ", "شَرِبْتُ الحَليبَ بارِدًا."],
  ["الاسْمُ", "نَكِرَةٌ", "رَأَيْتُ رَجُلًا."], ["الاسْمُ", "مَعْرِفَةٌ: عَلَمٌ", "جاءَ خالِدٌ."], ["الاسْمُ", "مَعْرِفَةٌ: مُعَرَّفٌ بِأَلْ", "قَرَأْتُ الكِتابَ."]] },
 { t: "acik", ar: "مُراجَعَةٌ نَحْوِيَّةٌ (٢): هاتِ ما يَأْتي في جُمَلٍ مُفيدَةٍ", aciklama: "First write it yourself; then look at the sample sentence.", ogeler: [
  ["حالًا تُبَيِّنُ هَيْئَةَ الفاعِلِ", "رَجَعَ الجُنْدِيُّ مُنْتَصِرًا.", "condition of the subject"], ["حالًا تُبَيِّنُ هَيْئَةَ المَفْعولِ بِهِ", "أَكَلْتُ الخُبْزَ ساخِنًا.", "condition of the object"], ["اسْمًا نَكِرَةً مَرْفوعًا", "في الفَصْلِ طالِبٌ جَديدٌ.", "nominative indefinite"],
  ["اسْمًا نَكِرَةً مَنْصوبًا", "اشْتَرَيْتُ كِتابًا.", "accusative indefinite"], ["عَلَمًا مَجْرورًا", "سَلَّمْتُ عَلى خالِدٍ.", "genitive proper name"], ["عَلَمًا مَنْصوبًا", "زُرْتُ مُحَمَّدًا.", "accusative proper name"], ["اسْمًا مُعَرَّفًا بِأَلْ مَرْفوعًا", "المَسْجِدُ قَريبٌ.", "nominative noun with the article"]] }
]},
// ---------------- DERS 204 ----------------
{ no: 204, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to the news about Nigeria and oil prices; talk about oil.", bloklar: [
 { t: "dinle", s: "l204", ar: "اسْتَمِعْ إِلى الخَبَرِ", aciklama: "Nigeria and high oil prices. Listen first, then complete the sentences.", metin: [
  ["يَنْظُرُ النَّيْجيرِيّونَ إِلى أَسْعارِ النِّفْطِ المُرْتَفِعَةِ، الَّتي أَثارَتْ غَضَبَ أوروبّا، عَلى أَنَّها هَدِيَّةٌ مِنَ السَّماءِ هَبَطَتْ عَلى نَيْجيرِيا.", "Nigerians look at the high oil prices that anger Europe as a gift that came down to Nigeria from the sky."],
  ["البَلَدِ الَّذي يَعيشُ نِصْفُ سُكّانِهِ، الَّذينَ يَبْلُغُ عَدَدُهُمْ مِئَةً وَسَبْعَةَ عَشَرَ مِلْيونَ نَسَمَةٍ، بِأَقَلَّ مِنْ دولارٍ واحِدٍ في اليَوْمِ، عَلى الرَّغْمِ مِنْ ثَرْوَتِهِ النِّفْطِيَّةِ الكَبيرَةِ.", "Despite its great oil wealth, it is a country half of whose population, numbering a hundred and seventeen million, lives on less than a dollar a day."],
  ["وَقَدْ رَحَّبَ وَزيرُ المالِ النَّيْجيرِيُّ بِأَسْعارِ النِّفْطِ المُرْتَفِعَةِ قائِلًا: إِنَّها هَدِيَّةُ السَّماءِ.", "Nigeria's finance minister welcomed the high oil prices, saying “This is a gift from heaven.”"],
  ["وَتَعْتَمِدُ نَيْجيرِيا، سادِسُ أَكْبَرِ مُصَدِّرٍ لِلنِّفْطِ في مُنَظَّمَةِ أوبِك، بِنِسْبَةِ ٩٥٪ مِنْ مَوارِدِها عَلى النِّفْطِ، الَّذي يَبْلُغُ إِنْتاجُها مِنْهُ نَحْوَ مِلْيونَيْ بَرْميلٍ يَوْمِيًّا.", "Nigeria, the sixth largest oil exporter in OPEC, depends on oil for 95% of its income; its daily oil production is about two million barrels."],
  ["وَلكِنَّ نَيْجيرِيا عَلى الرَّغْمِ مِنْ هذِهِ الثَّرَواتِ الكَبيرَةِ مِنَ النِّفْطِ وَالغازِ، ما زالَتْ بَيْنَ أَفْقَرِ بُلْدانِ النِّفْطِ في العالَمِ، وَالمَطْلوبُ مِنْها مِنَ الدُّيونِ الخارِجِيَّةِ يَبْلُغُ نَحْوَ ٣٠ مِلْيارَ دولارٍ.", "But despite this great wealth of oil and gas, Nigeria is still among the poorest oil countries in the world; its foreign debt is about 30 billion dollars."]],
  not: "The text has been transcribed from the recording; the book has only the sentences to be completed. (This recording was in the archive under number 208.)" },
 { t: "secim", ar: "اسْتَمِعْ إِلى الخَبَرِ، ثُمَّ أَكْمِلِ العِباراتِ التّالِيَةَ", ogeler: [
  ["شَعَرَ أَهْلُ نَيْجيرِيا بِالسُّرورِ عِنْدَما…", "ارْتَفَعَتْ أَسْعارُ النِّفْطِ.", ["انْخَفَضَتْ أَسْعارُ النِّفْطِ.", "أَثارَتْ غَضَبَ أوروبّا."], "The people of Nigeria rejoiced at … ."],
  ["عَدَدُ سُكّانِ نَيْجيرِيا نَحْوُ…", "١١٧ مِلْيونَ نَسَمَةٍ.", ["٣٠ مِلْيونَ نَسَمَةٍ.", "٩٥ مِلْيونَ نَسَمَةٍ."], "The population of Nigeria is about … ."],
  ["نَيْجيرِيا هِيَ الدَّوْلَةُ … في المُنَظَّمَةِ.", "سادِسُ أَكْبَرِ مُصَدِّرٍ لِلنِّفْطِ", ["أَكْبَرُ مُصَدِّرٍ لِلنِّفْطِ", "أَفْقَرُ دَوْلَةٍ"], "Nigeria is the … country in the organization."],
  ["يَعْتَمِدُ اقْتِصادُ نَيْجيرِيا عَلى النِّفْطِ، بِنِسْبَةِ…", "٩٥٪.", ["٥٠٪.", "٤٠٪."], "The Nigerian economy depends on oil to the extent of … ."],
  ["تُنْتِجُ نَيْجيرِيا في اليَوْمِ نَحْوَ…", "مِلْيونَيْ بَرْميلٍ.", ["مِلْيونِ بَرْميلٍ.", "مِئَتَيْ أَلْفِ بَرْميلٍ."], "Nigeria produces about … a day."],
  ["المَبْلَغُ المَطْلوبُ مِنْ نَيْجيرِيا…", "نَحْوُ ٣٠ مِلْيارَ دولارٍ مِنَ الدُّيونِ الخارِجِيَّةِ.", ["نَحْوُ ١١٧ مِلْيونَ دولارٍ.", "دولارٌ واحِدٌ في اليَوْمِ."], "The amount asked of Nigeria …"]] },
 { t: "acik", ar: "تَكَلَّمْ — التَّدْريبُ (١): تَبادَلِ الأَسْئِلَةَ وَالأَجْوِبَةَ مَعَ زَميلِكَ", aciklama: "A pair activity; then look at the sample answer.", ogeler: [
  ["هَلْ يُصَدِّرُ بَلَدُكَ النِّفْطَ؟", "لا، بَلَدي لا يُصَدِّرُ النِّفْطَ.", "Does your country export oil?"], ["هَلْ يَسْتَوْرِدُ بَلَدُكَ النِّفْطَ؟", "نَعَمْ، يَسْتَوْرِدُ بَلَدي النِّفْطَ.", "Does your country import oil?"], ["ما سِعْرُ بَرْميلِ النِّفْطِ هذِهِ الأَيّامَ؟", "سِعْرُهُ نَحْوُ سَبْعينَ دولارًا.", "What is the price of a barrel of oil these days?"],
  ["مَتى تَرْتَفِعُ أَسْعارُ النِّفْطِ؟ وَمَتى تَنْخَفِضُ؟", "تَرْتَفِعُ إِذا قَلَّ المَعْروضُ، وَتَنْخَفِضُ إِذا كَثُرَ.", "When do oil prices rise and when do they fall?"], ["هَلْ يُواجِهُ بَلَدُكَ أَزْمَةً في النِّفْطِ أَحْيانًا؟ لِماذا؟", "نَعَمْ، إِذا ارْتَفَعَتِ الأَسْعارُ في العالَمِ.", "Does your country sometimes have an oil crisis? Why?"], ["هَلْ يَسْتَهْلِكُ بَلَدُكَ كَثيرًا مِنَ النِّفْطِ؟ لِماذا؟", "نَعَمْ، لِأَنَّ فيهِ سَيّاراتٍ وَمَصانِعَ كَثيرَةً.", "Does your country consume much oil? Why?"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): ناقِشِ المَوْضوعاتِ التّالِيَةَ مَعَ فَريقٍ مِنْ زُمَلائِكَ", aciklama: "A group activity; then look at the sample answer.", ogeler: [
  ["لِماذا تَحْدُثُ أَزْمَةٌ في النِّفْطِ أَحْيانًا؟", "بِسَبَبِ الخِلافِ بَيْنَ الدُّوَلِ المُنْتِجَةِ وَالدُّوَلِ المُسْتَهْلِكَةِ، أَوْ بِسَبَبِ الحُروبِ.", "Why does an oil crisis sometimes occur?"], ["كَيْفَ نُحافِظُ عَلى النِّفْطِ؟", "لا نُسْرِفُ في اسْتِخْدامِ السَّيّاراتِ وَالكَهْرَباءِ، وَنَسْتَعْمِلُ وَسائِلَ النَّقْلِ العامَّةَ.", "How do we protect oil?"],
  ["ما الطّاقَةُ الَّتي يُمْكِنُ أَنْ تَحُلَّ مَحَلَّ النِّفْطِ؟", "الطّاقَةُ الشَّمْسِيَّةُ، وَطاقَةُ الرِّياحِ، وَطاقَةُ الماءِ.", "What energy can replace oil?"], ["ماذا تَفْعَلُ الدُّوَلُ الفَقيرَةُ، عِنْدَما تَرْتَفِعُ أَسْعارُ النِّفْطِ؟", "تُقَلِّلُ اسْتِهْلاكَهُ، وَتَطْلُبُ المُساعَدَةَ مِنَ الدُّوَلِ الغَنِيَّةِ.", "What do poor countries do when oil prices rise?"]] }
]},
// ---------------- DERS 205 ----------------
{ no: 205, kisa: "الطّاقَةُ الشَّمْسِيَّةُ", ar: "الطّاقَةُ الشَّمْسِيَّةُ", tr: "Solar Energy", ozet: "Reading text: the sun, the basic source of energy; the use and future of solar energy.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["ما أَهَمُّ مَصْدَرٍ لِلضَّوْءِ في العالَمِ؟", "What is the most important source of light in the world?"], ["ماذا يَحْدُثُ عِنْدَما تَحْتَجِبُ الشَّمْسُ؟", "What happens when the sun disappears?"], ["كَيْفَ يَسْتَفيدُ الإِنْسانُ مِنَ الشَّمْسِ؟", "How does man benefit from the sun?"], ["ما مَصادِرُ الطّاقَةِ الأُخْرى غَيْرَ الشَّمْسِ؟", "What are the sources of energy other than the sun?"]] },
 { t: "metin", resim: ["gunes", "panel"], paragraf: [
  [["الشَّمْسُ، هذا النَّجْمُ الَّذي نَراهُ في السَّماءِ، هِيَ المَصْدَرُ الأَساسِيُّ لِلطّاقَةِ عَلى الأَرْضِ.", "This star that we see in the sky, the sun, is the basic source of energy on earth.", "m205-0"],
   ["وَيَعْتَمِدُ الإِنْسانُ وَالحَيَوانُ وَالنَّباتُ عَلى الحَرارَةِ، الَّتي تُرْسِلُها أَشِعَّةُ الشَّمْسِ. وَلَوْلا هذِهِ الحَرارَةُ لَما وُجِدَتْ حَياةٌ عَلى الأَرْضِ بِأَمْرٍ مِنَ اللهِ.", "Man, animal and plant depend on the warmth sent by the sun's rays. Without this warmth, by God's command, there would be no life on earth.", "m205-1"]],
  [["اسْتَفادَ الإِنْسانُ مِنْ طاقَةِ الشَّمْسِ قَديمًا؛ فَقَدِ اسْتَعانَ بِها عَلى طَبْخِ الطَّعامِ، وَتَسْخينِ المِياهِ، وَتَدْفِئَةِ البُيوتِ.", "Man benefited from solar energy in the past too; he used it for cooking, heating water and heating homes.", "m205-2"],
   ["أَمّا في العَصْرِ الحَديثِ، فَقَدِ ازْدادَ الاهْتِمامُ بِالطّاقَةِ الشَّمْسِيَّةِ، وَقَدْ نَجَحَ العُلَماءُ في تَوْليدِ الكَهْرَباءِ، عَنْ طَريقِ خَلايا خاصَّةٍ لِلطّاقَةِ الشَّمْسِيَّةِ، أَقاموها في البِلادِ الَّتي تَكونُ الشَّمْسُ فيها حارَّةً مُعْظَمَ الوَقْتِ، كَما هُوَ الحالُ في الصَّحْراءِ العَرَبِيَّةِ.", "In the modern age interest in solar energy has increased; scientists have succeeded in producing electricity with special solar cells set up in countries where the sun is hot most of the time, as in the Arab desert.", "m205-3"]],
  [["توضَعُ أَلْواحٌ -تُسَمّى الأَلْواحَ الشَّمْسِيَّةَ- فَوْقَ البُيوتِ تُجَمِّعُ حَرارَةَ الشَّمْسِ، وَتُحَوِّلُها إِلى طاقَةٍ كَهْرَبائِيَّةٍ، وَيُمْكِنُ أَنْ تُنْتِجَ هذِهِ الأَلْواحُ مِنَ الطّاقَةِ ما يَكْفي لِتَدْفِئَةِ الماءِ لِبَيْتٍ كَبيرٍ.", "On top of houses plates called solar panels are placed; they collect the sun's heat and convert it to electrical energy. These panels can produce enough energy to heat the water of a large house.", "m205-4"],
   ["وَالطّاقَةُ الَّتي نَأْخُذُها مِنَ الشَّمْسِ نَظيفَةٌ، وَهِيَ مَوْجودَةٌ بِكَثْرَةٍ في المَناطِقِ المُشْمِسَةِ، وَلكِنْ عِنْدَما تَحْتَجِبُ الشَّمْسُ، لا تَكونُ هُناكَ أَشِعَّةٌ نَسْتَمِدُّ مِنْها الحَرارَةَ.", "The energy we get from the sun is clean and plentiful in sunny regions; but when the sun disappears there are no rays from which to take warmth.", "m205-5"]],
  [["بِالرَّغْمِ مِنْ مُحاوَلاتِ الاسْتِفادَةِ مِنَ الطّاقَةِ الشَّمْسِيَّةِ، فَلا يَزالُ الإِنْسانُ يَعْتَمِدُ عَلى مَصادِرِ الطّاقَةِ الأُخْرى؛ كَالنِّفْطِ، وَالفَحْمِ الحَجَرِيِّ؛ لِأَنَّ مَشاريعَ الطّاقَةِ الشَّمْسِيَّةِ تُكَلِّفُ المالَ الكَثيرَ.", "Despite the efforts to benefit from solar energy, man still depends on other energy sources such as oil and coal; because solar energy projects cost a great deal of money.", "m205-6"],
   ["وَمَعَ ذلِكَ، فَإِنَّ مُحاوَلاتِ اسْتِغْلالِ الطّاقَةِ الشَّمْسِيَّةِ، لَنْ تَتَوَقَّفَ؛ لِأَنَّ مَصادِرَ الطّاقَةِ الأُخْرى سَتَنْفَدُ في يَوْمٍ ما، أَمّا الشَّمْسُ فَباقِيَةٌ إِلى يَوْمِ القِيامَةِ.", "However, efforts to benefit from solar energy will not stop; because other energy sources will one day run out, while the sun will remain until the Day of Resurrection.", "m205-7"]]], not: "In the recording, in paragraph 2 the phrase “وَتَبْريدِها” (and cooling them) also occurs." },
 { t: "siniflandir", ar: "اسْتيعابٌ — التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) تَحْتَ العِبارَةِ المُناسِبَةِ لِلطّاقَةِ الشَّمْسِيَّةِ أَوِ النِّفْطِ", soru: "Which one?", gruplar: ["طاقَةٌ شَمْسِيَّةٌ", "نِفْطٌ"], ogeler: [
  ["مَصْدَرُ طاقَةٍ سَيَنْفَدُ.", 1], ["يُكَلِّفُ كَثيرًا.", 0], ["تَوْليدُ الكَهْرَباءِ في الصَّحْراءِ.", 0], ["مَصْدَرٌ سَيَبْقى إِلى يَوْمِ القِيامَةِ.", 0], ["مَصْدَرٌ أَساسِيٌّ لِلطّاقَةِ لا يُكَلِّفُ كَثيرًا.", 1], ["طاقَةٌ مَصْدَرُها السَّماءُ.", 0], ["طاقَةٌ مَصْدَرُها الأَرْضُ.", 1]],
  not: "2 and 5: According to the text, solar energy projects cost a great deal of money; therefore man still depends on sources like oil." },
 { t: "secim", ar: "التَّدْريبُ (٢): ضَعْ عَلامَةَ (✓) بِجانِبِ الفِكْرَةِ الرَّئيسَةِ في كُلِّ فِقْرَةٍ", ogeler: [
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الأولى تَتَناوَلُ:", "الطّاقَةَ عَلى الأَرْضِ.", ["الطّاقَةَ الشَّمْسِيَّةَ.", "الحَياةَ عَلى الأَرْضِ."], "What does the main idea of the first paragraph deal with?"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّانِيَةِ:", "الإِنْسانُ اسْتَفادَ مِنَ الشَّمْسِ قَديمًا وَحَديثًا.", ["الإِنْسانُ اسْتَعانَ بِالشَّمْسِ في طَبْخِ الطَّعامِ.", "العُلَماءُ نَجَحوا في تَوْليدِ الكَهْرَباءِ مِنَ الشَّمْسِ."], "The main idea of the second paragraph?"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الرّابِعَةِ تَقولُ: إِنَّ…", "الطّاقَةَ الشَّمْسِيَّةَ تُكَلِّفُ كَثيرًا.", ["النِّفْطَ وَالفَحْمَ وَالكَهْرَباءَ تُكَلِّفُ قَليلًا.", "الطّاقَةَ الشَّمْسِيَّةَ باقِيَةٌ إِلى قِيامِ السّاعَةِ."], "The main idea of the fourth paragraph?"]],
  not: "In questions 1 and 3 another option could also be defended; the answers were chosen according to the general subject of the paragraph. It can be discussed in class." },
 { t: "acik", ar: "مُفْرَداتٌ — التَّدْريبُ (١): اسْتَعْمِلِ الكَلِماتِ التّالِيَةَ في جُمَلٍ مِنْ إِنْشائِكَ", aciklama: "First write it yourself; then look at the sample sentence.", ogeler: [
  ["تَبْريدٌ", "نَسْتَعْمِلُ الكَهْرَباءَ في تَبْريدِ البُيوتِ صَيْفًا.", "cooling"], ["تَسْخينٌ", "يُسْتَعْمَلُ اللَّوْحُ الشَّمْسِيُّ في تَسْخينِ الماءِ.", "heating (water etc.)"], ["تَدْفِئَةٌ", "نَحْتاجُ إِلى تَدْفِئَةِ البُيوتِ في الشِّتاءِ.", "heating (house, environment)"],
  ["تَوْليدٌ", "نَجَحَ العُلَماءُ في تَوْليدِ الكَهْرَباءِ مِنَ الرِّياحِ.", "producing (electricity)"], ["تَبْذيرٌ", "تَرْكُ الأَجْهِزَةِ تَعْمَلُ بِلا حاجَةٍ تَبْذيرٌ.", "waste, extravagance"], ["مَصْدَرٌ", "الشَّمْسُ مَصْدَرُ الضَّوْءِ وَالحَرارَةِ.", "source"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): ابْحَثْ عَنِ الكَلِماتِ التّالِيَةِ في مُعْجَمٍ عَرَبِيٍّ، ثُمَّ سَجِّلْ مَعانِيَها", aciklama: "First look it up in the dictionary; then look at the sample meaning.", ogeler: [
  ["اسْتِغْلالٌ (غ، ل، ل)", "الاسْتِفادَةُ مِنَ الشَّيْءِ وَأَخْذُ نَفْعِهِ.", "benefit, operation"], ["تَدْفِئَةٌ (د، ف، أ)", "جَعْلُ الشَّيْءِ دافِئًا.", "heating"], ["اسْتَفادَ (ف، و، د)", "حَصَلَ عَلى فائِدَةٍ.", "he benefited"],
  ["ادَّعى (د، ع، و)", "قالَ شَيْئًا وَلَمْ يُثْبِتْهُ.", "he claimed"], ["تَوْليدٌ (و، ل، د)", "إِخْراجُ الشَّيْءِ وَإِنْتاجُهُ.", "production"], ["مَصادِرُ (ص، د، ر)", "جَمْعُ مَصْدَرٍ، وَهُوَ ما يُؤْخَذُ مِنْهُ الشَّيْءُ.", "sources"]] }
]},
// ---------------- DERS 206 ----------------
{ no: 206, kisa: "مُراجَعاتٌ نَحْوِيَّةٌ (٢)", ar: "مُراجَعاتٌ نَحْوِيَّةٌ (٢) وَ(٣)", tr: "Grammar review (2) and (3)", ozet: "Pronouns, the governing particles, letters, the case endings of the dual and sound masculine plural, the five nouns, the construction of the past verb, the original signs of case endings.", bloklar: [
 { t: "tablo", ar: "مُراجَعاتٌ نَحْوِيَّةٌ (٢): هَلْ تَتَذَكَّرُ هذِهِ القَواعِدَ؟", bas: ["القاعِدَةُ", "الأَقْسامُ", "مِثالٌ"], satir: [
  ["ضَمائِرُ الرَّفْعِ المُنْفَصِلَةُ", "مُتَكَلِّمٌ / مُخاطَبٌ / غائِبٌ", "أَنا، نَحْنُ / أَنْتَ، أَنْتُمْ / هُوَ، هُمْ"], ["ضَمائِرُ النَّصْبِ المُتَّصِلَةُ", "مُتَكَلِّمٌ / مُخاطَبٌ / غائِبٌ", "شَكَرَني / شَكَرَكَ / شَكَرَهُ"],
  ["النَّواسِخُ", "كانَ / إِنَّ", "كانَ الجَوُّ جَميلًا. / إِنَّ الجَوَّ جَميلٌ."], ["الحُروفُ", "صَحيحَةٌ / مُعْتَلَّةٌ", "ب، ت، ر… / ا، و، ي"],
  ["إِعْرابُ المُثَنّى", "مَرْفوعٌ / مَنْصوبٌ / مَجْرورٌ", "جاءَ الطّالِبانِ / رَأَيْتُ الطّالِبَيْنِ / سَلَّمْتُ عَلى الطّالِبَيْنِ"],
  ["إِعْرابُ جَمْعِ المُذَكَّرِ السّالِمِ", "مَرْفوعٌ / مَنْصوبٌ / مَجْرورٌ", "جاءَ المُعَلِّمونَ / رَأَيْتُ المُعَلِّمينَ / سَلَّمْتُ عَلى المُعَلِّمينَ"],
  ["إِعْرابُ الأَسْماءِ الخَمْسَةِ", "مَرْفوعَةٌ / مَنْصوبَةٌ / مَجْرورَةٌ", "جاءَ أَبوكَ / رَأَيْتُ أَباكَ / سَلَّمْتُ عَلى أَبيكَ"],
  ["بِناءُ الفِعْلِ الماضي", "عَلى الفَتْحِ / عَلى السُّكونِ / عَلى الضَّمِّ", "كَتَبَ / كَتَبْتُ / كَتَبوا"],
  ["عَلاماتُ الإِعْرابِ الأَصْلِيَّةُ", "الضَّمَّةُ / الفَتْحَةُ / الكَسْرَةُ / السُّكونُ", "يَكْتُبُ / لَنْ يَكْتُبَ / في البَيْتِ / لَمْ يَكْتُبْ"]] },
 { t: "acik", ar: "مُراجَعَةٌ نَحْوِيَّةٌ (٣) — أ- أَعِدْ كِتابَةَ الجُمَلِ التّالِيَةِ مُنَفِّذًا المَطْلوبَ بَيْنَ القَوْسَيْنِ، وَغَيِّرْ ما يَلْزَمُ", aciklama: "First write it yourself; then look at the sample answer.", ogeler: [
  ["شَكَرَني المُديرُ اليَوْمَ. (حَوِّلِ الضَّميرَ إِلى المُفْرَدِ الغائِبِ)", "شَكَرَهُ المُديرُ اليَوْمَ.", "The director thanked him today."],
  ["كانَ اللهُ غَفورًا رَحيمًا. (أَدْخِلْ إِنَّ عَلى الجُمْلَةِ)", "إِنَّ اللهَ غَفورٌ رَحيمٌ.", "Indeed God is Forgiving, Merciful."],
  ["حَضَرَ مُحَمَّدٌ مُبَكِّرًا. (حَوِّلِ الفِعْلَ الصَّحيحَ إِلى مُعْتَلٍّ)", "جاءَ مُحَمَّدٌ مُبَكِّرًا.", "Muhammad came early."],
  ["مَعَ مَنْ تَحَدَّثْتَ؟ (أَجِبْ بِاسْتِخْدامِ المُثَنّى المَجْرورِ)", "تَحَدَّثْتُ مَعَ المُهَنْدِسَيْنِ.", "I spoke with two engineers."],
  ["كَمْ رَكْعَةً صَلَّيْتَ؟ (أَجِبْ بِاسْتِخْدامِ المُثَنّى المَنْصوبِ)", "صَلَّيْتُ رَكْعَتَيْنِ.", "I prayed two rakʿas."],
  ["مَنْ تَغَيَّبَ اليَوْمَ؟ (أَجِبْ بِاسْتِخْدامِ المُثَنّى المَرْفوعِ)", "تَغَيَّبَ الطّالِبانِ.", "The two students did not come."]] },
 { t: "bosluk", ar: "ب- اخْتَرِ الكَلِمَةَ المُناسِبَةَ مِمّا بَيْنَ القَوْسَيْنِ", ogeler: [
  ["يَسْتَعينُ ___ بِاللهِ تَعالى في أُمورِهِمْ.", "المُسْلِمونَ", ["المُسْلِمينَ"], "Muslims seek help from God in their affairs."],
  ["غَفَرَ اللهُ لِجَميعِ ___.", "المُؤْمِنينَ", ["المُؤْمِنونَ", "المُؤْمِنُ"], "May God forgive all the believers."],
  ["إِنَّ ___ لا يَنامونَ كَثيرًا.", "المُجاهِدينَ", ["المُجاهِدونَ", "المُجاهِدَ"], "The mujāhids do not sleep much."],
  ["___ يَسْتَخْدِمونَ النِّفْطَ في المَصانِعِ.", "المُهَنْدِسونَ", ["المُهَنْدِسينَ", "المُهَنْدِسُ"], "Engineers use oil in factories."],
  ["شَكَرْتُ ___ عَلى جُهودِهِمْ.", "المُعَلِّمينَ", ["المُعَلِّمُ", "المُعَلِّمونَ"], "I thanked the teachers for their efforts."]],
  not: "In sentence 1 the book also has the option (المُسْلِمُ); since the verb comes first, a plural subject can also be used with a singular verb, so here only the distinction nominative/genitive was asked." },
 { t: "acik", ar: "ج- ضَعِ الأَسْماءَ الخَمْسَةَ الَّتي بَيْنَ القَوْسَيْنِ في صورَتِها الصَّحيحَةِ", aciklama: "First write it yourself; then look at the correct sentence.", ogeler: [
  ["إِنَّ (أَبو) هُرَيْرَةَ مِنْ أَصْحابِ الرَّسولِ ﷺ.", "إِنَّ أَبا هُرَيْرَةَ مِنْ أَصْحابِ الرَّسولِ ﷺ.", "Abū Hurayra is among the Companions of the Messenger of God."],
  ["هَلْ سَلَّمْتَ عَلى (أَبو) بَكْرٍ؟", "هَلْ سَلَّمْتَ عَلى أَبي بَكْرٍ؟", "Did you greet Abū Bakr?"],
  ["أَيْنَ (أَخا) مُحَمَّدٍ؟", "أَيْنَ أَخو مُحَمَّدٍ؟", "Where is Muhammad's brother?"],
  ["الأَفْضَلُ أَنْ تُنَظِّفَ (فوكَ) بِالسِّواكِ.", "الأَفْضَلُ أَنْ تُنَظِّفَ فاكَ بِالسِّواكِ.", "It is best for you to clean your mouth with a toothstick."],
  ["جاءَ (أَخي) مُحَمَّدٍ مُبَكِّرًا.", "جاءَ أَخو مُحَمَّدٍ مُبَكِّرًا.", "Muhammad's brother came early."]] }
]},
// ---------------- DERS 207 ----------------
{ no: 207, kisa: "تَعْبيرٌ مُوَجَّهٌ", ar: "تَعْبيرٌ مُوَجَّهٌ", tr: "Guided composition", ozet: "The problem of electricity consumption at home, oil the most important source of energy, the oil crisis.", bloklar: [
 { t: "acik", ar: "التَّدْريبُ (١): اكْتُبْ مَوْضوعًا بِعُنْوانِ: (مُشْكِلَةُ اسْتِهْلاكِ الكَهْرَباءِ في البَيْتِ)", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["مُشْكِلَةُ اسْتِهْلاكِ الكَهْرَباءِ في البَيْتِ", "أَصْبَحْنا نَسْتَهْلِكُ الكَهْرَباءَ كَثيرًا في البَيْتِ: في الإِضاءَةِ، وَالحاسوبِ، وَالغَسّالَةِ، وَالفُرْنِ، وَغَيْرِها. وَكَثيرًا ما نَتْرُكُ الأَجْهِزَةَ تَعْمَلُ بِلا حاجَةٍ، وَهذا تَبْذيرٌ يُؤَثِّرُ في ميزانِيَّةِ البَيْتِ. وَلِحَلِّ هذِهِ المُشْكِلَةِ يَجِبُ أَنْ نُطْفِئَ الإِضاءَةَ وَالأَجْهِزَةَ إِذا لَمْ نَحْتَجْ إِلَيْها، وَأَنْ نُعَلِّمَ الأَوْلادَ ذلِكَ، وَأَنْ نُكافِئَهُمْ إِذا انْخَفَضَ الاسْتِهْلاكُ.", "The problem of electricity consumption at home"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): اكْتُبْ مَوْضوعًا بِعُنْوانِ: (النِّفْطُ أَهَمُّ مَصْدَرٍ لِلطّاقَةِ)", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["النِّفْطُ أَهَمُّ مَصْدَرٍ لِلطّاقَةِ", "النِّفْطُ مِنْ أَهَمِّ الثَّرَواتِ الطَّبيعِيَّةِ، وَيُسَمّى الذَّهَبَ الأَسْوَدَ. تَعْتَمِدُ عَلَيْهِ السَّيّاراتُ وَالقِطاراتُ وَالسُّفُنُ وَالطّائِراتُ، وَتُؤْخَذُ مِنْهُ الكَهْرَباءُ، وَيُسْتَخْدَمُ في صِناعَةِ أَشْياءَ كَثيرَةٍ. وَهُوَ يُوَفِّرُ نِصْفَ الطّاقَةِ الَّتي يَسْتَهْلِكُها الإِنْسانُ. وَلكِنَّهُ مَحْدودٌ وَسَيَنْتَهي يَوْمًا ما؛ لِذلِكَ يَجِبُ أَنْ نُحافِظَ عَلَيْهِ.", "Oil is the most important source of energy"]] },
 { t: "acik", ar: "التَّدْريبُ (٣): اكْتُبْ مَوْضوعًا بِعُنْوانِ: (أَزْمَةُ النِّفْطِ)", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["أَزْمَةُ النِّفْطِ", "تَحْدُثُ أَزْمَةُ النِّفْطِ عِنْدَما تَقْفِزُ أَسْعارُ الوَقودِ، وَيَقِلُّ المَعْروضُ مِنْهُ في المَحَطّاتِ. وَمِنْ أَسْبابِها الخِلافُ بَيْنَ الدُّوَلِ الصِّناعِيَّةِ وَالدُّوَلِ المُنْتِجَةِ لِلنِّفْطِ؛ فَالأولى تَقولُ إِنَّ المُنْتِجينَ يَرْفَعونَ الأَسْعارَ، وَالثّانِيَةُ تَقولُ إِنَّ الدُّوَلَ الصِّناعِيَّةَ تَفْرِضُ ضَرائِبَ عالِيَةً. وَأَكْثَرُ النّاسِ تَضَرُّرًا هُمُ الفُقَراءُ الَّذينَ لَيْسَ لَهُمْ صِناعاتٌ وَلا نِفْطٌ.", "The Oil Crisis"]] }
]},
// ---------------- DERS 208 ----------------
{ no: 208, kisa: "الخَطُّ وَالإِمْلاءُ", ar: "الخَطُّ وَالإِمْلاءُ: حَذْفُ ياءِ المَنْقوصِ", tr: "Calligraphy and spelling: dropping of the yāʾ of the defective noun", ozet: "A noun ending in yāʾ (defective), without the article and not annexed, drops its yāʾ in the nominative and genitive: المُحامي ← مُحامٍ.", bloklar: [
 { t: "hat", ar: "الخَطُّ — اكْتُبْ بِخَطِّ الرُّقْعَةِ", aciklama: "Write the verse of poetry in your notebook in ruqʿa script.", ogeler: [["وَإِذا كانَتِ النُّفوسُ كِبارًا ... تَعِبَتْ في مُرادِها الأَجْسامُ — When souls are great, bodies grow weary in pursuit of their aims. (al-Mutanabbī)", "وإذا كانت النفوس كبارا تعبت في مرادها الأجسام"]] },
 { t: "kural", ar: "الإِمْلاءُ: حَذْفُ ياءِ المَنْقوصِ", metin: "تُحْذَفُ ياءُ المَنْقوصِ إِذا جُرِّدَ الاسْمُ مِنْ (الْ) في حالَتَيِ الرَّفْعِ وَالجَرِّ إِذا لَمْ يَكُنْ مُضافًا.", tr: "A defective noun (a noun whose final yāʾ is preceded by kasra: المُحامي، القاضي), without the article and not annexed, drops its yāʾ in the nominative and genitive and takes tanwīn: مُحامٍ، غالٍ. If annexed, the yāʾ stays: داعي القَوْمِ." },
 { t: "tablo", ar: "ادْرُسْ وَلاحِظْ", bas: ["أ", "ب"], satir: [["المُحامي", "مُحامٍ"], ["الغالي", "غالٍ"], ["مَراعي الغَنَمِ", "مَراعٍ لِلْغَنَمِ"], ["داعِيَ القَوْمِ", "داعٍ لِقَوْمِهِ"]] },
 { t: "secim", ar: "تَدْريبٌ: اخْتَرِ الكِتابَةَ الصَّحيحَةَ", ogeler: [
  ["جاءَ ___ إِلى المَحْكَمَةِ.", "مُحامٍ", ["مُحامي", "مُحامِيٌ"], "A lawyer came to the court."], ["هذا ثَوْبٌ ___.", "غالٍ", ["غالي", "غالِيٌ"], "This is an expensive garment."], ["سَلَّمْتُ عَلى ___ المَدينَةِ.", "قاضي", ["قاضٍ", "قاضِ"], "I greeted the city's judge."],
  ["مَرَرْتُ بِـ___ في الطَّريقِ.", "ساعٍ", ["ساعي", "ساعِيٍ"], "I met a messenger on the road."], ["رَأَيْتُ ___ كَثيرَةً.", "مَراعِيَ", ["مَراعٍ", "مَراع"], "I saw many pastures."], ["جاءَ ___ لِقَوْمِهِ.", "داعٍ", ["داعي", "داعِيٌ"], "A caller came to his people."]],
  not: "In the accusative the yāʾ does not drop: رَأَيْتُ مَراعِيَ / رَأَيْتُ قاضِيًا. It does not drop when annexed either: قاضي المَدينَةِ." }
]}
];
var KELIME = [
 ["فاتورَةٌ", "fatura", 196], ["الكَهْرَباءُ", "electricity", 196], ["تَضاعَفَ - يَتَضاعَفُ", "to double", 196], ["اسْتَهْلَكَ - يَسْتَهْلِكُ", "to consume", 196], ["الإِضاءَةُ", "lighting", 196], ["الحاسوبُ", "computer", 196], ["المِذْياعُ", "radio", 196], ["الخَلّاطُ", "mixer", 196], ["الفُرْنُ", "oven", 196], ["الغَسّالَةُ", "washing machine", 196], ["المِكْنَسَةُ", "broom, cleaner", 196], ["تَبْذيرٌ", "waste", 196], ["ميزانِيَّةٌ", "budget", 196], ["مُسْتَجيبٌ", "listening", 196], ["انْخَفَضَ - يَنْخَفِضُ", "to fall, to decrease", 196], ["مُكافَأَةٌ", "reward", 196], ["أُسْلوبٌ", "method", 196],
 ["النِّفْطُ", "oil", 200], ["الثَّرْوَةُ (الثَّرَواتُ)", "riches", 200], ["شِرْيانٌ", "artery", 200], ["الشّاحِنَةُ", "lorry", 200], ["السَّفينَةُ (السُّفُنُ)", "ship", 200], ["الطّاقَةُ", "energy", 200], ["الوَقودُ", "fuel", 200], ["المَنْسوجاتُ", "textiles", 200], ["مُسْتَحْضَراتُ التَّجْميلِ", "cosmetics", 200], ["المُنَظِّفاتُ", "cleaning materials", 200], ["السَّجّادُ", "carpet", 200], ["الأَسْمِدَةُ", "fertilizers", 200], ["بَديلٌ", "alternative", 200], ["اسْتَغْرَقَ - يَسْتَغْرِقُ", "to take (time)", 200], ["احْتِياطٌ", "reserve", 200], ["بَرْميلٌ", "barrel", 200], ["مِلْيارٌ", "billion", 200], ["خُمُسٌ", "one fifth", 200], ["عُشْرٌ", "one tenth", 200], ["مَحْدودٌ", "limited", 200],
 ["أَزْمَةٌ", "crisis", 202], ["تَجَدَّدَ - يَتَجَدَّدُ", "to be renewed", 202], ["قَفَزَ - يَقْفِزُ", "to shoot up, to leap", 202], ["المَعْروضُ", "supply", 202], ["مَحَطَّةٌ", "station", 202], ["خِلافٌ", "disagreement", 202], ["مُنْتِجٌ", "producer", 202], ["ادَّعى - يَدَّعي", "to claim", 202], ["فَرَضَ - يَفْرِضُ", "to impose", 202], ["الضَّريبَةُ (الضَّرائِبُ)", "tax", 202], ["ذَنْبٌ", "fault, sin", 202], ["صَدَّرَ - يُصَدِّرُ", "to export", 202], ["عَوْنٌ", "help", 202],
 ["النَّجْمُ", "star", 205], ["المَصْدَرُ (المَصادِرُ)", "source", 205], ["أَشِعَّةٌ", "rays", 205], ["لَوْلا", "were it not for …", 205], ["اسْتَفادَ - يَسْتَفيدُ", "to benefit", 205], ["اسْتَعانَ - يَسْتَعينُ", "to seek help", 205], ["تَسْخينٌ", "heating", 205], ["تَدْفِئَةٌ", "heating", 205], ["تَوْليدٌ", "production", 205], ["خَلِيَّةٌ (خَلايا)", "cell", 205], ["لَوْحٌ (أَلْواحٌ)", "plate, panel", 205], ["مُشْمِسٌ", "sunny", 205], ["احْتَجَبَ - يَحْتَجِبُ", "to disappear", 205], ["الفَحْمُ الحَجَرِيُّ", "coal", 205], ["كَلَّفَ - يُكَلِّفُ", "to cost", 205], ["اسْتِغْلالٌ", "benefiting", 205], ["نَفِدَ - يَنْفَدُ", "to run out", 205]
];
