// ================= VERİ: el-Arabiyyetü beyne yedeyk 2, 3. ünite — الحَياةُ الزَّوْجِيَّةُ =================
// Bloklar k2ortak/uygulama.js içinde çizilir. Asıl kayıt parçaları: zaman.js (ZAMAN); kaydı olmayan metinler gömülü okunuşla çalar.
var UNITE = { no: 3, ar: "الحَياةُ الزَّوْجِيَّةُ", tr: "Married Life", pfx: "k2u3:",
  giris: "Unit 3: choosing a spouse, problems between spouses, staying away from home at night, the family in the past and today. Grammar: masculine and feminine, the nominal and verbal sentence, the quiescent tāʾ of feminine, separate nominative pronouns." };
var DERSLER = [
// ---------------- DERS 27 ----------------
{ no: 27, kisa: "عَلَيْكَ بِذاتِ الدّينِ", ar: "عَلَيْكَ بِذاتِ الدّينِ", tr: "Choose the One with Religion", ozet: "Dialogue: Bilāl wants to marry; he discusses a suitable girl with his mother.", bloklar: [
 { t: "diyalog", resim: "mushaf", kisiler: [{ ar: "الأُمُّ", tr: "Mother" }, { ar: "بِلالٌ", tr: "Bilāl" }], satir: [
  [0, "أَنْتَ قَلِقٌ يا وَلَدي، ماذا بِكَ؟!", "You are worried, my son, what is wrong?!", "d27-0"],
  [1, "أُريدُ الزَّواجَ يا أُمّي، وَلا أَجِدُ الفَتاةَ المُناسِبَةَ.", "I want to marry, Mother, but I cannot find a suitable girl.", "d27-1"],
  [0, "هذِهِ لَيْسَتْ مُشْكِلَةً. هُناكَ فَتَياتٌ كَثيراتٌ مُناسِباتٌ لِلزَّواجِ.", "That is not a problem. There are many girls suitable for marriage.", "d27-2"],
  [1, "هَلْ تَعْرِفينَ واحِدَةً مُناسِبَةً؟", "Do you know someone suitable?", "d27-3"],
  [0, "فاطِمَةُ بِنْتُ صالِحٍ.", "Fāṭima, the daughter of Ṣāliḥ.", "d27-4"],
  [1, "هذِهِ غَيْرُ مُناسِبَةٍ؛ إِنَّها فَقيرَةٌ، لا مالَ لَها.", "She is not suitable; she is poor, she has no wealth at all.", "d27-5"],
  [0, "ما رَأْيُكَ في زَيْنَبَ بِنْتِ عَبْدِ اللهِ؟", "What do you think about Zaynab, the daughter of ʿAbdullāh?", "d27-6"],
  [1, "نَعَمْ، هِيَ مِنْ أُسْرَةٍ غَنِيَّةٍ، وَلكِنّي سَمِعْتُ أَنَّها غَيْرُ جَميلَةٍ.", "Yes, she is from a rich family; but I heard she is not beautiful.", "d27-7"],
  [0, "هُناكَ هُدى بِنْتُ عَبْدِ العَزيزِ.", "There is Hudā, the daughter of ʿAbd al-ʿAzīz.", "d27-8"],
  [1, "سَمِعْتُ أَنَّها ذاتُ مالٍ وَجَمالٍ، وَلكِنّي أُريدُ الحَسَبَ وَالنَّسَبَ.", "I heard she has wealth and beauty; but I want lineage and nobility.", "d27-9"],
  [0, "تُريدُ المالَ وَالجَمالَ وَالحَسَبَ وَالنَّسَبَ. هذِهِ لا تُحَقِّقُ السَّعادَةَ!", "You want wealth, beauty, lineage and nobility. These do not bring happiness!", "d27-10"],
  [1, "ما الَّذي يُحَقِّقُ السَّعادَةَ إِذَنْ؟!", "Then what brings happiness?!", "d27-11"],
  [0, "إِذا أَرَدْتَ السَّعادَةَ، فَعَلَيْكَ بِذاتِ الدّينِ.", "If you want happiness, choose the one with religion.", "d27-12"],
  [1, "ذاتُ الدّينِ. أَحْسَنْتِ يا أُمّي. هذا قَوْلُ الرَّسولِ ﷺ: «فَاظْفَرْ بِذاتِ الدّينِ، تَرِبَتْ يَداكَ».", "The one with religion… You spoke well, Mother. These are the words of the Messenger of God (peace and blessings be upon him): “Choose the one with religion, may your hands be blessed.”", "d27-13"]],
  not: "«تَرِبَتْ يَداكَ»: an expression the Arabs say for encouragement (literally: may your hands be covered in dust)." },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["بِلالٌ لا يَجِدُ فَتاةً جَميلَةً لِلزَّواجِ.", false, "بِلالٌ لا يَجِدُ الفَتاةَ المُناسِبَةَ لِلزَّواجِ.", "Bilāl cannot find a beautiful girl to marry."],
  ["فاطِمَةُ غَيْرُ مُناسِبَةٍ؛ لِأَنَّها لا مالَ لَها.", true, "", "Fāṭima is not suitable, because she has no wealth."],
  ["زَيْنَبُ لَدَيْها المالُ، وَلَدَيْها الجَمالُ.", false, "زَيْنَبُ لَدَيْها المالُ، وَلكِنَّها غَيْرُ جَميلَةٍ.", "Zaynab has both wealth and beauty."],
  ["هُدى لَدَيْها المالُ وَالجَمالُ.", true, "", "Hudā has wealth and beauty."],
  ["الزَّوْجَةُ الَّتي لَدَيْها دينٌ تُحَقِّقُ السَّعادَةَ.", true, "", "A religious spouse brings happiness."]] },
 { t: "sirala", ar: "التَّدْريبُ (٢): رَتِّبِ الجُمَلَ التّالِيَةَ كَما وَرَدَتْ في الحِوارِ", ogeler: [
  "تَسْأَلُهُ أُمُّهُ ما سَبَبُ قَلَقِهِ.", "بِلالٌ قَلِقٌ؛ لِأَنَّهُ يُريدُ الزَّواجَ.", "يَقولُ: إِنَّهُ لا يَجِدُ الفَتاةَ المُناسِبَةَ.", "تَقولُ لَهُ أُمُّهُ: إِنَّ الفَتَياتِ المُناسِباتِ كَثيراتٌ.", "سَيَتَزَوَّجُ بِلالٌ ذاتَ الدّينِ، إِنْ شاءَ اللهُ."] },
 { t: "esle", ar: "مُفْرَداتٌ — التَّدْريبُ (١): صِلْ بَيْنَ الكَلِمَتَيْنِ المُتَضادَّتَيْنِ", ciftler: [
  ["جَميلٌ", "قَبيحٌ", "beautiful / ugly"], ["أُمٌّ", "أَبٌ", "mother / father"], ["هُنا", "هُناكَ", "here / there"], ["هُوَ", "هِيَ", "he / she"], ["ابْنٌ", "بِنْتٌ", "son / daughter"], ["فَقيرٌ", "غَنِيٌّ", "poor / rich"], ["هذا", "هذِهِ", "this (masculine) / this (feminine)"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): رَتِّبِ الصِّفاتِ بِحَسَبِ أَهَمِّيَّتِها عِنْدَ الزَّوْجِ، وَعِنْدَ الزَّوْجَةِ", aciklama: "Qualities: المالُ، الجَمالُ، الحَسَبُ، النَّسَبُ، الدّينُ. Make your own ranking; then look at the example.", ogeler: [
  ["التَّرْتيبُ عِنْدَ الزَّوْجِ: ١- … ٢- … ٣- … ٤- … ٥- …", "١- الدّينُ ٢- الجَمالُ ٣- الحَسَبُ ٤- النَّسَبُ ٥- المالُ", "Ranking according to the husband", "A sample ranking; the answer varies from person to person."],
  ["التَّرْتيبُ عِنْدَ الزَّوْجَةِ: ١- … ٢- … ٣- … ٤- … ٥- …", "١- الدّينُ ٢- الحَسَبُ ٣- النَّسَبُ ٤- المالُ ٥- الجَمالُ", "Ranking according to the wife", "A sample ranking; the answer varies from person to person."]] }
]},
// ---------------- DERS 28 ----------------
{ no: 28, kisa: "ـُو / ـَوْ", ar: "الأَصْواتُ: واوُ المَدِّ، وَواوُ اللّينِ", tr: "Sounds: the long wāw and the soft wāw", ozet: "Distinguish the sounds ـُو (ū) and ـَوْ (aw).", bloklar: [
 { t: "kural", metin: "واوُ المَدِّ صائِتٌ مُلازِمٌ لِلسُّكونِ، لا يَقَعُ في بِدايَةِ الكَلِمَةِ، بِخِلافِ واوِ اللّينِ الَّتي تَقْبَلُ الحَرَكاتِ وَالسُّكونَ، وَتَقَعُ بَعْدَ الحَرَكاتِ وَالسُّكونِ وَفي أَوَّلِ الكَلِمَةِ وَوَسَطِها وَآخِرِها.", tr: "The long wāw (ـُو = ū) is always a quiescent vowel and does not occur at the start of a word. The soft wāw (ـَوْ = aw) can take either a vowel or sukūn; it occurs at the beginning, middle and end of a word.", not: "There is no original recording for this lesson; the words and sentences play with the embedded reading." },
 { t: "tablo", bas: ["ـُو", "ـَوْ", "ـُو", "ـَوْ"], satir: [["دُور", "دَوْر", "حُور", "حَوْر"], ["سُور", "سَوْر", "جُوف", "جَوْف"], ["طُور", "طَوْر", "حُول", "حَوْل"]],
  not: "Touch a word and listen: ـُو is read as a long “ū”, while ـَوْ is read as “aw”." },
 { t: "sessec", ar: "التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) بِجانِبِ الكَلِمَةِ الَّتي تَسْمَعُها", ogeler: [
  ["بُور", "بَوْر"], ["طُول", "طَوْل"], ["عُود", "عَوْد"], ["غُوص", "غَوْص"], ["غُول", "غَوْل"], ["لُوط", "لَوْط"], ["سُوق", "سَوْق"], ["فَخُور", "فَخَوْر"], ["فَطُور", "فَطَوْر"], ["كَعُود", "كَعَوْد"]] },
 { t: "tekrar", tts: false, ar: "التَّدْريبُ (٢): اسْتَمِعْ، ثُمَّ أَعِدْ", aciklama: "Read the verses; pay attention to the difference between ـُو and ـَوْ (there is no recording of these verses).", ogeler: [
  ["﴿وَالطُّ[[و]]رِ ۝ وَكِتَابٍ مَسْطُ[[و]]رٍ ۝ فِي رَقٍّ مَنْشُ[[و]]رٍ﴾ (الطور: ١-٣)", "By al-Ṭūr; and by a Book inscribed, line by line, on an unrolled parchment."],
  ["﴿وَأَطِيعُ[[وا]] اللَّهَ وَالرَّسُ[[و]]لَ لَعَلَّكُمْ تُرْحَمُ[[و]]نَ﴾ (آل عمران: ١٣٢)", "Obey God and the Messenger that you may be shown mercy."],
  ["﴿وَالسَّمَاءِ ذَاتِ الْبُرُ[[و]]جِ ۝ وَالْيَ[[وْ]]مِ الْمَ[[و]]عُ[[و]]دِ﴾ (البروج: ١-٢)", "By the heaven with its constellations, and by the promised Day."],
  ["﴿فِيهَا سُرُرٌ مَرْفُ[[و]]عَةٌ ۝ وَأَكْوَابٌ مَ[[وْ]]ضُ[[و]]عَةٌ ۝ وَنَمَارِقُ مَصْفُ[[و]]فَةٌ﴾ (الغاشية: ١٣-١٥)", "There are raised couches, goblets set out, and cushions arranged in rows."],
  ["﴿الَّذِي أَطْعَمَهُمْ مِنْ جُ[[و]]عٍ وَآمَنَهُمْ مِنْ خَ[[وْ]]فٍ﴾ (قريش: ٤)", "Who fed them against hunger and made them safe from fear."]] },
 { t: "ornek", ar: "التَّدْريبُ (٣): اسْتَمِعْ، وَأَعِدْ. لاحِظْ كَيْفَ تُنْطَقُ واوُ المَدِّ وَواوُ اللّينِ", ogeler: [
  ["سَنَقْرَأُ اليَ[[وْ]]مَ سُ[[و]]رَ: التَّ[[وْ]]بَةِ، وَالواقِعَةِ، وَالتَّكْ[[و]]يرِ، وَالكَ[[وْ]]ثَرِ.", "Today we will read the suras al-Tawba, al-Wāqiʿa, al-Takwīr and al-Kawthar."],
  ["سَنَقْرَأُ غَدًا سُ[[و]]رَ: هُ[[و]]دٍ، وَنُ[[و]]حٍ، وَالنّ[[و]]رِ، وَالطّ[[و]]رِ.", "Tomorrow we will read the suras Hūd, Nūḥ, al-Nūr and al-Ṭūr."],
  ["سُ[[و]]رَةُ الرّ[[و]]مِ رَقْمُها ثَلاث[[و]]نَ، وَآياتُها سِتّ[[و]]نَ.", "The number of sura al-Rūm is thirty, and its verses are sixty."],
  ["سُ[[و]]رَةُ الواقِعَةِ السّ[[و]]رَةُ السّادِسَةُ وَالخَمْس[[و]]نَ، وَعَدَدُ آياتِها سِتٌّ وَتِسْع[[و]]نَ.", "Sura al-Wāqiʿa is the fifty-sixth sura; the number of its verses is ninety-six."],
  ["قالَ اللهُ تَعالى: ﴿وَالْعَصْرِ﴾ - ﴿وَالضُّحَى وَاللَّيْلِ﴾ - ﴿وَالْفَجْرِ﴾.", "God Almighty said: “By time” – “By the morning brightness and the night” – “By the dawn”."]] },
 { t: "siniflandir", ar: "ـُو أَمْ ـَوْ؟", soru: "Long wāw or soft wāw?", gruplar: ["واوُ المَدِّ (ـُو)", "واوُ اللّينِ (ـَوْ)"], ogeler: [
  ["سُوق", 0], ["يَوْم", 1], ["نُور", 0], ["خَوْف", 1], ["جُوع", 0], ["تَوْبَة", 1], ["رُوم", 0], ["كَوْثَر", 1]] }
]},
// ---------------- DERS 29 ----------------
{ no: 29, kisa: "المُذَكَّرُ وَالمُؤَنَّثُ", ar: "المُذَكَّرُ وَالمُؤَنَّثُ", tr: "Masculine and feminine", ozet: "A noun is masculine or feminine; one of the marks of the feminine is tāʾ marbūṭa (ـة / ة).", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الاسْمُ قِسْمانِ: مُذَكَّرٌ وَمُؤَنَّثٌ. الاسْمُ المُذَكَّرُ: هُوَ ما دَلَّ عَلى الذَّكَرِ مِنْ إِنْسانٍ أَوْ حَيَوانٍ أَوْ غَيْرِ ذلِكَ. الاسْمُ المُؤَنَّثُ: هُوَ ما دَلَّ عَلى الأُنْثى مِنْ إِنْسانٍ أَوْ حَيَوانٍ أَوْ غَيْرِ ذلِكَ. مِنْ عَلاماتِ التَّأْنيثِ: التّاءُ المَرْبوطَةُ (ـة / ة).", tr: "The noun is of two kinds: masculine and feminine. The masculine denotes the male/masculine of a human, animal or other thing; the feminine its female. One of the marks of the feminine is tāʾ marbūṭa (ـة / ة)." },
 { t: "tablo", ar: "ادْرُسْ وَلاحِظْ", bas: ["مُذَكَّرٌ", "مُؤَنَّثٌ"], satir: [["رَجُلٌ", "امْرَأَةٌ"], ["زَوْجٌ", "زَوْجَةٌ"], ["طَويلٌ", "طَويلَةٌ"], ["كَثيرٌ", "كَثيرَةٌ"], ["وَقْتٌ", "رِحْلَةٌ"], ["هاتِفٌ", "رِياضَةٌ"], ["قَلَمٌ", "قِراءَةٌ"], ["بَيْتٌ", "مَدْرَسَةٌ"], ["طَبيبٌ", "طَبيبَةٌ"]] },
 { t: "siniflandir", ar: "التَّدْريبُ (١): ضَعْ كَلِماتِ الصُّنْدوقِ في مَكانِها المُناسِبِ", soru: "Masculine or feminine?", gruplar: ["مُذَكَّرٌ", "مُؤَنَّثٌ"], ogeler: [
  ["سَيّارَةٌ", 1], ["حافِلَةٌ", 1], ["صَديقٌ", 0], ["بارِدٌ", 0], ["مُشْكِلَةٌ", 1], ["سَمينٌ", 0], ["سَمينَةٌ", 1], ["قَديمَةٌ", 1], ["قَديمٌ", 0], ["ضَغْطٌ", 0], ["مَشْغولٌ", 0], ["جَميلَةٌ", 1], ["قَريبَةٌ", 1], ["مُرْتَفِعٌ", 0], ["دَواءٌ", 0], ["نَحيفَةٌ", 1]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): اخْتَرِ الاسْمَ المُناسِبَ مِمّا بَيْنَ القَوْسَيْنِ", aciklama: "Example: رِحْلَةً سَعيدَةً يا أَوْلادُ. (سَعيدٌ / سَعيدَةٌ)", ogeler: [
  ["هذا رَجُلٌ ___.", "نَحيفٌ", ["نَحيفَةٌ"], "This is a thin man."], ["هذِهِ بِنْتٌ ___.", "طَيِّبَةٌ", ["طَيِّبٌ"], "This is a good girl."], ["فَحَصَني هذا ___.", "الطَّبيبُ", ["الطَّبيبَةُ"], "This doctor examined me."],
  ["عَلى المائِدَةِ طَعامٌ ___.", "كَثيرٌ", ["كَثيرَةٌ"], "There is a lot of food on the table."], ["هذِهِ فِكْرَةٌ ___.", "طَيِّبَةٌ", ["طَيِّبٌ"], "This is a good idea."], ["في البَيْتِ ___ جَميلَةٌ.", "غُرْفَةٌ", ["بابٌ"], "There is a nice room in the house."],
  ["قَضَيْنا ___ واحِدَةً.", "لَيْلَةً", ["يَوْمًا"], "We spent one night."], ["هذا مَصيفٌ ___.", "جَميلٌ", ["جَميلَةٌ"], "This is a nice summer house."], ["صَلَّيْتُ في مَسْجِدٍ ___.", "قَريبٍ", ["قَريبَةٍ"], "I prayed in a nearby mosque."]] }
]},
// ---------------- DERS 30 ----------------
{ no: 30, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to the marriage conversation between Ahmad and ʿAbdullāh; talk about marriage.", bloklar: [
 { t: "dinle", s: "l30", ar: "اسْتَمِعْ إِلى الحِوارِ", aciklama: "A phone conversation: Ahmad and his university friend ʿAbdullāh. Listen first, then answer the questions.", metin: [
  ["— مَنْ؟ صَديقي عَبْدُ اللهِ؟ — نَعَمْ. أَهْلًا يا أَحْمَدُ، كَيْفَ حالُكَ؟ — الحَمْدُ لِلّهِ، أَنا بِخَيْرٍ.", "— Who? My friend ʿAbdullāh? — Yes. Hello Ahmad, how are you? — Praise be to God, I am well."],
  ["— أَيْنَ أَنْتَ؟ ما رَأَيْتُكَ مُنْذُ تَرَكْنا الدِّراسَةَ في الجامِعَةِ قَبْلَ خَمْسِ سَنَواتٍ. — بَعْدَ الدِّراسَةِ عَمِلْتُ مُدَرِّسًا في مَدينَتي. وَماذا فَعَلْتَ يا عَبْدَ اللهِ؟", "— Where are you? I have not seen you since we finished university five years ago. — After school I worked as a teacher in my city. What have you done, ʿAbdullāh?"],
  ["— تَزَوَّجْتُ وَالحَمْدُ لِلّهِ، وَلي ابْنٌ وَبِنْتٌ. — أَنا لَمْ أَتَزَوَّجْ حَتَّى الآنَ؛ لَمْ أَجِدِ الفَتاةَ المُناسِبَةَ.", "— I got married, praise be to God; I have a son and a daughter. — I still have not married; I have not found the right girl."],
  ["— لَدَيَّ فَتاةٌ مُناسِبَةٌ لَكَ، وَهِيَ ذاتُ خُلُقٍ وَدينٍ، وَتَعْمَلُ مُدَرِّسَةً. — مَنْ هِيَ؟ — أُخْتي لَيْلى. — سَمِعْتُ أَنَّها فَتاةٌ طَيِّبَةٌ.", "— There is a suitable girl for you: well-mannered and religious, working as a teacher. — Who is she? — My sister Laylā. — I heard she is a good girl."],
  ["— زُرْنا في بَيْتِنا، وَسَتَجِدُ ما تُحِبُّ، بِإِذْنِ اللهِ. — فِكْرَةٌ جَيِّدَةٌ، سَأَزورُكَ في الأُسْبوعِ القادِمِ، إِنْ شاءَ اللهُ.", "— Visit us at our house; by God's permission you will find her as you like. — A good idea; God willing, I will visit you next week."],
  ["— مَرْحَبًا بِكَ يا صَديقي، وَنَحْنُ في انْتِظارِكَ. — إِلى اللِّقاءِ. — في أَمانِ اللهِ.", "— You are welcome, my friend, we are waiting for you. — See you soon. — Go in God's care."]],
  not: "The text was transcribed from the recording; the book has only the questions. The true-false sentences read after the recording differ slightly from those in the book (e.g. “two weeks” instead of “one week”)." },
 { t: "dy", ar: "اسْتَمِعْ إِلى الحِوارِ، ثُمَّ ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["عَبْدُ اللهِ وَأَحْمَدُ صَديقانِ.", true, "", "ʿAbdullāh and Ahmad are friends."],
  ["عَبْدُ اللهِ يَعْمَلُ مُهَنْدِسًا في مَدينَتِهِ.", false, "أَحْمَدُ يَعْمَلُ مُدَرِّسًا في مَدينَتِهِ.", "ʿAbdullāh works in his city as an engineer."],
  ["عَبْدُ اللهِ وَأَحْمَدُ مُتَزَوِّجانِ.", false, "عَبْدُ اللهِ مُتَزَوِّجٌ، وَأَحْمَدُ لَمْ يَتَزَوَّجْ حَتَّى الآنَ.", "Both ʿAbdullāh and Ahmad are married."],
  ["الفَتاةُ المُناسِبَةُ هِيَ أُخْتُ عَبْدِ اللهِ.", true, "", "The suitable girl is ʿAbdullāh's sister."],
  ["سَيَزورُ أَحْمَدُ صَديقَهُ عَبْدَ اللهِ بَعْدَ أُسْبوعٍ.", true, "", "Ahmad will visit his friend ʿAbdullāh in a week."]] },
 { t: "acik", ar: "تَكَلَّمْ — التَّدْريبُ (١): تَبادَلِ الأَسْئِلَةَ وَالأَجْوِبَةَ مَعَ زَميلِكَ", aciklama: "A pair activity: ask and answer the questions with your friend; then look at the sample answer.", ogeler: [
  ["مَتى يَتَزَوَّجُ الشّابُّ في بَلَدِكَ؟", "يَتَزَوَّجُ الشّابُّ في بَلَدي بَعْدَ العِشْرينَ أَوْ في الخامِسَةِ وَالعِشْرينَ.", "In your country, when does a young man marry?"],
  ["مَتى تَتَزَوَّجُ البِنْتُ في بَلَدِكَ؟", "تَتَزَوَّجُ البِنْتُ في بَلَدي بَعْدَ الثّامِنَةَ عَشْرَةَ.", "In your country, when does a girl marry?"],
  ["لِماذا يَتَزَوَّجُ الإِنْسانُ؟", "يَتَزَوَّجُ الإِنْسانُ لِيُكَوِّنَ أُسْرَةً، وَيَعيشَ في سَعادَةٍ.", "Why does a person marry?"],
  ["كَيْفَ يَخْتارُ الرَّجُلُ الزَّوْجَةَ في بَلَدِكَ؟", "تَخْتارُ لَهُ أُسْرَتُهُ، أَوْ يَخْتارُ هُوَ بِنَفْسِهِ.", "In your country, how does a man choose his wife?"],
  ["هَلْ تَخْتارُ البِنْتُ الزَّوْجَ في بَلَدِكَ؟", "نَعَمْ، تَخْتارُ البِنْتُ الزَّوْجَ، وَتُشاوِرُ أُسْرَتَها.", "In your country, does a girl choose her husband?"],
  ["هَلْ تَتَزَوَّجُ مِنْ بَناتِ أُسْرَتِكَ؟ لِماذا؟", "لا، لا أَتَزَوَّجُ مِنْ بَناتِ أُسْرَتي؛ لِأَنّي أُريدُ أَنْ أَتَعَرَّفَ عَلى أُسْرَةٍ جَديدَةٍ.", "Would you marry a girl who is your relative? Why?"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): هَلْ تُفَضِّلُ أَنْ تَكونَ الفَتاةُ الَّتي تَتَزَوَّجُها: ذاتَ مالٍ؟ ذاتَ جَمالٍ؟ ذاتَ حَسَبٍ؟ ذاتَ نَسَبٍ؟ ذاتَ دينٍ؟ وَلِماذا؟", aciklama: "A pair activity: say your preference and the reason.", ogeler: [
  ["أُفَضِّلُ أَنْ تَكونَ الفَتاةُ الَّتي أَتَزَوَّجُها … ؛ لِأَنَّ …", "أُفَضِّلُ أَنْ تَكونَ ذاتَ دينٍ؛ لِأَنَّ ذاتَ الدّينِ تُحَقِّقُ السَّعادَةَ.", "I prefer that the girl I will marry be …; because …"]] }
]},
// ---------------- DERS 31 ----------------
{ no: 31, kisa: "مُشْكِلاتٌ بَيْنَ الزَّوْجَيْنِ", ar: "هَلْ تَحْدُثُ مُشْكِلاتٌ بَيْنَ الزَّوْجَيْنِ؟", tr: "Do problems occur between spouses?", ozet: "Reading text: the cause of problems in marriage, and dialogue as the way of solving them.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["هَلْ تَحْدُثُ مُشْكِلاتٌ بَيْنَ الزَّوْجَيْنِ؟", "Do problems occur between spouses?"], ["لِماذا تَحْدُثُ المُشْكِلاتُ بَيْنَ الزَّوْجَيْنِ؟", "Why do problems occur between spouses?"], ["مَنْ عَلَيْهِ حَلُّ مُشْكِلاتِ البَيْتِ وَالأُسْرَةِ؟ وَلِماذا؟", "Who should solve problems of the home and family? Why?"], ["مَتى يَقَعُ الطَّلاقُ بَيْنَ الزَّوْجَيْنِ؟", "When does divorce occur between spouses?"]] },
 { t: "metin", resim: "qalb", paragraf: [
  [["في الحَياةِ الزَّوْجِيَّةِ خَيْرٌ كَثيرٌ لِلزَّوْجِ وَلِلزَّوْجَةِ وَلِلْأَوْلادِ. وَمَعَ ذلِكَ تَظْهَرُ -أَحْيانًا- بَعْضُ المُشْكِلاتِ في حَياةِ الزَّوْجَيْنِ.", "In married life there is much good for the husband, the wife and the children. However, in the life of the spouses some problems sometimes arise.", "m31-0"],
   ["عَلَيْنا أَنْ نَعْرِفَ هذِهِ الحَقيقَةَ قَبْلَ الزَّواجِ. نَعَمْ، قَدْ تَحْدُثُ خِلافاتٌ بَيْنَ الزَّوْجَيْنِ،", "We should know this truth before marrying. Yes, there can be disagreements between spouses;", "m31-1"],
   ["وَلَيْسَتْ هذِهِ هِيَ المُشْكِلَةَ، وَإِنَّما المُشْكِلَةُ أَنْ نَعْجِزَ عَنْ حَلِّ تِلْكَ المُشْكِلاتِ.", "this is not the real problem; the real problem is that we are unable to solve those problems.", "m31-2"]],
  [["يَعْتَقِدُ كَثيرٌ مِنَ الشَّبابِ أَنَّ الحَياةَ الزَّوْجِيَّةَ بِلا مُشْكِلاتٍ، فَإِذا قابَلوا مُشْكِلَةً ثاروا، وَفَكَّروا في الطَّلاقِ.", "Most young people believe that married life is free of problems; when they meet a problem they get angry and think of divorce.", "m31-3"],
   ["عَلى الشَّبابِ أَنْ يَعْرِفوا أَنَّ الحَياةَ الزَّوْجِيَّةَ رِحْلَةٌ طَويلَةٌ، وَأَنَّ السَّبيلَ إِلى النَّجاحِ في الحَياةِ الزَّوْجِيَّةِ هُوَ الحِوارُ.", "Young people should know that married life is a long journey and that the way to success in marriage is dialogue.", "m31-4"]],
  [["لِماذا تَحْدُثُ مُشْكِلاتٌ بَيْنَ الزَّوْجَيْنِ، مِنْ وَقْتٍ لِآخَرَ؟ يَعودُ السَّبَبُ إِلى وُجودِ اخْتِلافاتٍ كَثيرَةٍ بَيْنَ شَخْصِيَّةِ الرَّجُلِ، وَشَخْصِيَّةِ المَرْأَةِ.", "Why do problems occur between spouses from time to time? The reason is that there are many differences between the man's personality and the woman's personality.", "m31-5"],
   ["وَتَظْهَرُ هذِهِ الاخْتِلافاتُ بَعْدَ مَرْحَلَةِ الطُّفولَةِ، وَتَزيدُ في مَرْحَلَةِ الشَّبابِ؛", "These differences appear after the childhood period and increase in the youth period:", "m31-6"],
   ["فَالرَّجُلُ يُحِبُّ أَشْياءَ لا تُحِبُّها المَرْأَةُ، وَالمَرْأَةُ تُحِبُّ أَشْياءَ لا يُحِبُّها الرَّجُلُ.", "The man likes things the woman does not like; and the woman likes things the man does not like.", "m31-7"]],
  [["وَعِنْدَما تَظْهَرُ المُشْكِلاتُ في الحَياةِ الزَّوْجِيَّةِ، يَأْخُذُ الزَّوْجانِ في الشَّكْوى.", "When problems arise in married life, the spouses begin to complain.", "m31-8"],
   ["يَشْكو الزَّوْجُ فَيَقولُ: زَوْجَتي لا تَسْتَمِعُ إِلَيَّ، وَتَتَكَلَّمُ مَعَ صَديقاتِها في الهاتِفِ كَثيرًا، وَتَذْهَبُ إِلى السّوقِ كَثيرًا، وَتَشْتَري أَشْياءَ لا نَحْتاجُ إِلَيْها.", "The husband complains: “My wife does not listen to me, she talks on the phone with her friends a lot, goes to the market a lot, buys things we do not need.”", "m31-9"],
   ["وَتَشْكو الزَّوْجَةُ فَتَقولُ: زَوْجي يَتَكَلَّمُ طولَ الوَقْتِ في السِّياسَةِ وَالرِّياضَةِ، وَيَقْضي وَقْتًا طَويلًا خارِجَ البَيْتِ،", "The wife also complains: “My husband talks about politics and sport all the time, spends a long time outside the house;", "m31-10"],
   ["وَعِنْدَما يَكونُ في البَيْتِ يَقْضي الوَقْتَ في قِراءَةِ الصُّحُفِ وَالمَجَلّاتِ، أَوْ مَعَ الحاسوبِ.", "and when at home he spends his time reading newspapers and magazines or with the computer.”", "m31-11"]]] },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["هُناكَ خَيْرٌ كَثيرٌ لِلْأُسْرَةِ في الحَياةِ الزَّوْجِيَّةِ.", true, "", "In married life there is much good for the family."],
  ["تَظْهَرُ مُشْكِلاتٌ كَثيرَةٌ قَبْلَ الزَّواجِ.", false, "تَظْهَرُ -أَحْيانًا- بَعْضُ المُشْكِلاتِ في حَياةِ الزَّوْجَيْنِ.", "Before marriage many problems arise."],
  ["تَعْتَقِدُ كَثيرٌ مِنَ الفَتَياتِ أَنَّ الحَياةَ الزَّوْجِيَّةَ بِلا مُشْكِلاتٍ.", false, "يَعْتَقِدُ كَثيرٌ مِنَ الشَّبابِ أَنَّ الحَياةَ الزَّوْجِيَّةَ بِلا مُشْكِلاتٍ.", "Most girls believe that married life is free of problems."],
  ["هُناكَ اخْتِلافاتٌ بَيْنَ شَخْصِيَّةِ الرَّجُلِ وَشَخْصِيَّةِ المَرْأَةِ.", true, "", "There are differences between the man's and the woman's personality."],
  ["يَشْكو الزَّوْجانِ، إِذا ظَهَرَتْ مُشْكِلاتٌ.", true, "", "When problems arise the spouses complain."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ عَمّا يَلي", ogeler: [
  ["ما الحَقيقَةُ الَّتي يَجِبُ أَنْ نَعْرِفَها قَبْلَ الزَّواجِ؟", "قَدْ تَظْهَرُ بَعْضُ المُشْكِلاتِ في حَياةِ الزَّوْجَيْنِ.", ["الحَياةُ الزَّوْجِيَّةُ بِلا مُشْكِلاتٍ.", "الزَّواجُ لا خَيْرَ فيهِ."], "What is the truth we must know before marrying?"],
  ["ماذا يَفْعَلُ الشَّبابُ إِذا قابَلوا مُشْكِلَةً في الحَياةِ الزَّوْجِيَّةِ؟", "يَثورونَ، وَيُفَكِّرونَ في الطَّلاقِ.", ["يَتَحاوَرونَ.", "يُسافِرونَ."], "What do young people do when they meet a problem in marriage?"],
  ["مَتى تَظْهَرُ الاخْتِلافاتُ بَيْنَ شَخْصِيَّةِ الرَّجُلِ وَشَخْصِيَّةِ المَرْأَةِ؟", "بَعْدَ مَرْحَلَةِ الطُّفولَةِ.", ["في مَرْحَلَةِ الطُّفولَةِ.", "بَعْدَ الزَّواجِ."], "When do the differences between the man's and the woman's personality appear?"],
  ["مَتى تَزيدُ هذِهِ الاخْتِلافاتُ؟", "في مَرْحَلَةِ الشَّبابِ.", ["في مَرْحَلَةِ الطُّفولَةِ.", "في الشَّيْخوخَةِ."], "When do these differences increase?"],
  ["مِنْ أَيِّ شَيْءٍ يَشْكو الزَّوْجُ؟", "زَوْجَتُهُ لا تَسْتَمِعُ إِلَيْهِ، وَتَتَكَلَّمُ في الهاتِفِ كَثيرًا، وَتَذْهَبُ إِلى السّوقِ كَثيرًا.", ["زَوْجَتُهُ تَقْرَأُ الصُّحُفَ كَثيرًا.", "زَوْجَتُهُ تَتَكَلَّمُ في السِّياسَةِ."], "What does the husband complain about?"],
  ["مِنْ أَيِّ شَيْءٍ تَشْكو الزَّوْجَةُ؟", "زَوْجُها يَتَكَلَّمُ في السِّياسَةِ وَالرِّياضَةِ، وَيَقْضي وَقْتًا طَويلًا خارِجَ البَيْتِ.", ["زَوْجُها يَذْهَبُ إِلى السّوقِ كَثيرًا.", "زَوْجُها يَتَكَلَّمُ مَعَ صَديقاتِها."], "What does the wife complain about?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — التَّدْريبُ (١): صِلْ بَيْنَ الكَلِمَتَيْنِ اللَّتَيْنِ تَأْتِيانِ مَعًا", ciftler: [
  ["حَلُّ", "المُشْكِلَةِ", "the solution of the problem"], ["الحَياةُ", "الزَّوْجِيَّةُ", "married life"], ["شَخْصِيَّةُ", "المَرْأَةِ", "the woman's personality"], ["مَرْحَلَةُ", "الطُّفولَةِ", "the childhood period"], ["طولُ", "الوَقْتِ", "all the time"]] },
 { t: "bosluk", ar: "التَّدْريبُ (٣): امْلَأِ الفَراغَ بِالكَلِمَةِ المُناسِبَةِ مِنَ الصُّنْدوقِ", kutu: ["أَخَذَتْ", "عَجَزَتْ", "فَكَّرَتْ", "تَعْرِفُ", "ظَهَرَتْ"], ogeler: [
  ["___ مُشْكِلَةٌ في حَياةِ الزَّوْجَيْنِ.", "ظَهَرَتْ", null, "A problem arose in the life of the spouses."], ["هَلْ ___ الحَقيقَةَ؟", "تَعْرِفُ", null, "Do you know the truth?"], ["___ عَنْ حَلِّ المُشْكِلَةِ.", "عَجَزَتْ", null, "He was unable to solve the problem."],
  ["___ في الطَّلاقِ.", "فَكَّرَتْ", null, "He thought of divorce."], ["___ زَوْجَتُهُ في الشَّكْوى.", "أَخَذَتْ", null, "His wife began to complain."]] }
]},
// ---------------- DERS 32 ----------------
{ no: 32, kisa: "أَقْسامُ الجُمْلَةِ", ar: "أَقْسامُ الجُمْلَةِ", tr: "Kinds of sentence", ozet: "The nominal sentence begins with a noun, the verbal sentence with a verb.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الجُمْلَةُ قِسْمانِ: اسْمِيَّةٌ تَبْدَأُ بِاسْمٍ، وَفِعْلِيَّةٌ تَبْدَأُ بِفِعْلٍ.", tr: "The sentence is of two kinds: the nominal sentence beginning with a noun and the verbal sentence beginning with a verb." },
 { t: "tablo", ar: "ادْرُسْ وَلاحِظْ", bas: ["الجُمْلَةُ الاسْمِيَّةُ", "الجُمْلَةُ الفِعْلِيَّةُ"], satir: [["المَدْرَسَةُ كَبيرَةٌ.", "ذَهَبَ الطّالِبُ إِلى المَدْرَسَةِ."], ["المَسْجِدانِ قَريبانِ.", "أُريدُ الزَّواجَ."], ["أَنْتَ قَلِقٌ.", "نَجَحَتْ فَتَياتٌ كَثيراتٌ."], ["هذِهِ هُدى بِنْتُ صالِحٍ.", "يُريدُ المالَ وَالجَمالَ."], ["المُهَنْدِسونَ قادِمونَ.", "اظْفَرْ بِذاتِ الدّينِ."]] },
 { t: "siniflandir", ar: "التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) في المَكانِ المُناسِبِ", soru: "Nominal sentence or verbal sentence?", gruplar: ["اسْمِيَّةٌ", "فِعْلِيَّةٌ"], ogeler: [
  ["سَأَتَناوَلُ العَسَلَ مِثْلَكَ.", 1], ["خُذْ هذِهِ السّاعَةَ.", 1], ["شَفاكَ اللهُ.", 1], ["زَيْنَبُ وَمَرْيَمُ صَديقَتانِ.", 0], ["المُعَلِّماتُ مَشْغولاتٌ.", 0], ["مَرْيَمُ سَمينَةٌ جِدًّا.", 0], ["سَيُصَلّي أَحْمَدُ الظُّهْرَ في المَسْجِدِ.", 1]] },
 { t: "acik", ar: "التَّدْريبُ (٢): أَجِبْ عَنِ الأَسْئِلَةِ التّالِيَةِ بِجُمَلٍ اسْمِيَّةٍ، كَما في المِثالِ", aciklama: "Example: ما رَأْيُكَ في الكِتابِ؟ (مُفيدٌ) ← الكِتابُ مُفيدٌ.", ogeler: [
  ["ما رَأْيُكَ في القِصَّةِ؟ (جَميلَةٌ)", "القِصَّةُ جَميلَةٌ.", "What do you think about the story? (beautiful)"], ["ما رَأْيُكَ في العَصيرِ؟ (بارِدٌ)", "العَصيرُ بارِدٌ.", "What about the juice? (cold)"],
  ["ما رَأْيُكَ في الفِكْرَةِ؟ (طَيِّبَةٌ)", "الفِكْرَةُ طَيِّبَةٌ.", "What about the idea? (good)"], ["ما رَأْيُكَ في الأَلْعابِ؟ (خَطِرَةٌ)", "الأَلْعابُ خَطِرَةٌ.", "What about the games? (dangerous)"],
  ["ما رَأْيُكَ في الجَوِّ؟ (دافِئٌ)", "الجَوُّ دافِئٌ.", "What about the weather? (warm)"], ["ما رَأْيُكَ في العامِلِ؟ (نَشيطٌ)", "العامِلُ نَشيطٌ.", "What about the worker? (hard-working)"]] },
 { t: "acik", ar: "التَّدْريبُ (٣): أَجِبْ عَنِ الأَسْئِلَةِ التّالِيَةِ بِجُمَلٍ فِعْلِيَّةٍ، كَما في المِثالِ", aciklama: "Example: مَتى تُسافِرُ؟ (العُطْلَة) ← أُسافِرُ في العُطْلَةِ.", ogeler: [
  ["ماذا تُريدُ؟ (المالَ وَالجَمالَ)", "أُريدُ المالَ وَالجَمالَ.", "What do you want? (wealth and beauty)"], ["مَتى سَتَزورُني؟ (يَوْمَ السَّبْتِ)", "سَأَزورُكَ يَوْمَ السَّبْتِ.", "When will you visit me? (Saturday)"],
  ["بِمَ تَشْعُرينَ؟ (بِأَلَمٍ في بَطْني)", "أَشْعُرُ بِأَلَمٍ في بَطْني.", "What do you feel? (a pain in my stomach)"], ["كَيْفَ تَذْهَبُ إِلى العَمَلِ؟ (بِالسَّيّارَةِ)", "أَذْهَبُ إِلى العَمَلِ بِالسَّيّارَةِ.", "How do you go to work? (by car)"],
  ["كَمْ ساعَةً تَدْرُسُ في اليَوْمِ؟ (خَمْسَ ساعاتٍ)", "أَدْرُسُ خَمْسَ ساعاتٍ في اليَوْمِ.", "How many hours a day do you study? (five hours)"], ["أَيْنَ تَسْكُنُ؟ (في القَرْيَةِ)", "أَسْكُنُ في القَرْيَةِ.", "Where do you live? (in a village)"]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٤): اقْرَأِ الآياتِ التّالِيَةَ، ثُمَّ اكْتُبْ نَوْعَ الجُمْلَةِ", soru: "Nominal sentence or verbal sentence?", gruplar: ["اسْمِيَّةٌ", "فِعْلِيَّةٌ"], ogeler: [
  ["﴿خُذِ الْعَفْوَ﴾", 1], ["﴿اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ﴾", 0], ["﴿خَلَقَ الْإِنْسَانَ﴾", 1], ["﴿اقْرَأْ بِاسْمِ رَبِّكَ﴾", 1], ["﴿لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ﴾", 0]] },
 { t: "acik", ar: "التَّدْريبُ (٥): اكْتُبْ جُمَلًا اسْمِيَّةً وَفِعْلِيَّةً مُبْتَدِئًا بِالكَلِماتِ المَذْكورَةِ", aciklama: "Example: (فاطِمَةُ) ← فاطِمَةُ نَشيطَةٌ. (يُريدُ) ← يُريدُ أَحْمَدُ الزَّواجَ.", ogeler: [
  ["(رَجَعَ) ← …", "رَجَعَ الأَبُ مِنَ العَمَلِ.", "returned"], ["(يَعيشُ) ← …", "يَعيشُ الجَدُّ مَعَ الأُسْرَةِ.", "lives"], ["(يَجْلِسُ) ← …", "يَجْلِسُ الطّالِبُ في الفَصْلِ.", "sits, lives"],
  ["(الأُمُّ) ← …", "الأُمُّ في المَطْبَخِ.", "mother"], ["(الوَلَدُ) ← …", "الوَلَدُ مَريضٌ.", "child"], ["(بِلالٌ) ← …", "بِلالٌ قَلِقٌ.", "Bilāl"]] }
]},
// ---------------- DERS 33 ----------------
{ no: 33, kisa: "السَّهَرُ خارِجَ البَيْتِ", ar: "السَّهَرُ خارِجَ البَيْتِ", tr: "Staying Out at Night", ozet: "Dialogue: Nāṣir wants to part from his wife; Faysal advises him.", bloklar: [
 { t: "diyalog", resim: "ghurfa", kisiler: [{ ar: "ناصِرٌ", tr: "Nāṣir" }, { ar: "فَيْصَلٌ", tr: "Faysal" }], satir: [
  [0, "أُريدُ أَنْ أَتْرُكَ زَوْجَتي.", "I want to part from my wife.", "d33-0"],
  [1, "إِنّا لِلّهِ وَإِنّا إِلَيْهِ راجِعونَ. ماذا هُناكَ؟!", "Indeed we belong to God and to Him we return. What happened?!", "d33-1"],
  [0, "لا أُحِبُّها.", "I do not love her.", "d33-2"],
  [1, "لا تُحِبُّها؟! كَيْفَ عِشْتَ مَعَها كُلَّ هذِهِ السَّنَواتِ؟!", "You do not love her?! How did you live with her all these years?!", "d33-3"],
  [0, "لا أَدْري… لا أَدْري… لا أُحِبُّها.", "I do not know… I do not know… I do not love her.", "d33-4"],
  [1, "كُنْتَ تَقولُ دائِمًا: إِنَّها زَوْجَةٌ طَيِّبَةٌ، وَمُؤَدَّبَةٌ وَمُطيعَةٌ. ماذا حَدَثَ؟!", "You always used to say, “She is a good, well-mannered and obedient wife.” What happened?!", "d33-5"],
  [0, "كُنْتُ أُحِبُّها فِعْلًا، وَلكِنَّها تَغَيَّرَتْ كَثيرًا.", "I really did love her, but she has changed a lot.", "d33-6"],
  [1, "كَيْفَ تَغَيَّرَتْ؟", "How has she changed?", "d33-7"],
  [0, "أَصْبَحَتْ مُهْمِلَةً، لا تَهْتَمُّ بي، وَلا بِالبَيْتِ. تَهْتَمُّ بِنَفْسِها وَبِصَديقاتِها فَقَطْ.", "She has become indifferent; she cares neither about me nor about the house. She cares only about herself and her friends.", "d33-8"],
  [1, "هَلْ تَكَلَّمْتَ مَعَها في هذا الأَمْرِ؟", "Have you talked to her about this?", "d33-9"],
  [0, "تَكَلَّمْتُ مَعَها كَثيرًا، وَلكِنَّها عَنيدَةٌ.", "I talked to her a lot, but she is stubborn.", "d33-10"],
  [1, "هَلْ تَغَيَّرْتَ أَنْتَ؟", "And have you changed?", "d33-11"],
  [0, "نَعَمْ، أَصْبَحْتُ أَسْهَرُ كَثيرًا خارِجَ البَيْتِ.", "Yes, I have often started staying outside the house at night.", "d33-12"],
  [1, "قَدْ يَكونُ هذا هُوَ السَّبَبَ. لا تَسْهَرْ خارِجَ البَيْتِ.", "That could be the reason. Do not stay outside the house at night.", "d33-13"],
  [0, "سَأَفْعَلُ ذلِكَ.", "I will do so.", "d33-14"],
  [1, "إِذَنْ سَتَهْتَمُّ زَوْجَتُكَ بِكَ وَبِبَيْتِها، بِإِذْنِ اللهِ.", "Then your wife too, by God's permission, will care about you and her house.", "d33-15"]],
  not: "The recording is read according to an older edition of the book: Faysal's first words in the recording are «لا حَوْلَ وَلا قُوَّةَ إِلّا بِاللهِ»." },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["ناصِرٌ يُريدُ طَلاقَ زَوْجَتِهِ.", true, "", "Nāṣir wants to divorce his wife."],
  ["عاشَ ناصِرٌ مَعَ زَوْجَتِهِ سَنَةً واحِدَةً.", false, "عاشَ ناصِرٌ مَعَ زَوْجَتِهِ سَنَواتٍ كَثيرَةً.", "Nāṣir lived with his wife for a year."],
  ["تَغَيَّرَ ناصِرٌ وَتَغَيَّرَتْ زَوْجَتُهُ.", true, "", "Both Nāṣir and his wife have changed."],
  ["تَهْتَمُّ زَوْجَةُ ناصِرٍ بِالأُسْرَةِ.", false, "تَهْتَمُّ زَوْجَةُ ناصِرٍ بِنَفْسِها وَبِصَديقاتِها فَقَطْ.", "Nāṣir's wife cares about the family."],
  ["ناصِرٌ يَسْهَرُ أَحْيانًا خارِجَ البَيْتِ.", false, "ناصِرٌ يَسْهَرُ كَثيرًا خارِجَ البَيْتِ.", "Nāṣir sometimes stays outside the house at night."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ عَمّا يَلي", ogeler: [
  ["هَلْ كانَ ناصِرٌ يُحِبُّ زَوْجَتَهُ؟ كَيْفَ عَرَفْتَ ذلِكَ؟", "نَعَمْ؛ كانَ يَقولُ: إِنَّها زَوْجَةٌ طَيِّبَةٌ، وَمُؤَدَّبَةٌ وَمُطيعَةٌ.", ["لا؛ لِأَنَّهُ لا يَعْرِفُها.", "لا؛ لِأَنَّها فَقيرَةٌ."], "Did Nāṣir love his wife? How did you know?"],
  ["بِمَنْ تَهْتَمُّ زَوْجَتُهُ؟", "بِنَفْسِها وَبِصَديقاتِها فَقَطْ.", ["بِزَوْجِها.", "بِالبَيْتِ."], "Whom does his wife care about?"],
  ["هَلْ نَصَحَها ناصِرٌ؟", "نَعَمْ، تَكَلَّمَ مَعَها كَثيرًا، وَلكِنَّها عَنيدَةٌ.", ["لا، لَمْ يَتَكَلَّمْ مَعَها.", "نَعَمْ، فَقَبِلَتِ النَّصيحَةَ."], "Did Nāṣir advise her?"],
  ["كَيْفَ تَغَيَّرَ ناصِرٌ؟", "أَصْبَحَ يَسْهَرُ كَثيرًا خارِجَ البَيْتِ.", ["أَصْبَحَ يَنامُ كَثيرًا.", "أَصْبَحَ يَعْمَلُ كَثيرًا."], "How did Nāṣir change?"],
  ["هَلْ طَلَّقَ ناصِرٌ زَوْجَتَهُ؟", "لا، قالَ: سَأَفْعَلُ ذلِكَ (لَنْ أَسْهَرَ خارِجَ البَيْتِ).", ["نَعَمْ، طَلَّقَها.", "نَعَمْ، تَرَكَها."], "Did Nāṣir divorce his wife?"]] },
 { t: "bosluk", ar: "مُفْرَداتٌ — التَّدْريبُ (١): امْلَأِ الفَراغَ بِالحَرْفِ المُناسِبِ مِنَ الصُّنْدوقِ", kutu: ["مَعَ", "إِلى", "أَنْ", "عَنْ", "بِـ"], ogeler: [
  ["أُريدُ ___ أُسافِرَ.", "أَنْ", null, "I want to travel."], ["هِيَ تَهْتَمُّ ___زَوْجِها.", "بِـ", null, "She cares about her husband."], ["كَيْفَ تَعيشُ ___ أُسْرَتِكَ؟", "مَعَ", null, "How do you live with your family?"],
  ["عَجَزَ ___ المَشْيِ.", "عَنْ", null, "He was unable to walk."], ["يَعودُ المُسافِرُ ___ بَلَدِهِ.", "إِلى", null, "The traveller returns to his homeland."]] },
 { t: "esle", ar: "التَّدْريبُ (٢): مَتى نَقولُ العِباراتِ التّالِيَةَ؟", aciklama: "Connect each saying to the situation in which it is said.", ciftler: [
  ["إِنّا لِلّهِ وَإِنّا إِلَيْهِ راجِعونَ", "عِنْدَ سَماعِ خَبَرٍ مُحْزِنٍ.", "on hearing bad news"],
  ["بِإِذْنِ اللهِ", "عِنْدَ الكَلامِ عَنْ أَمْرٍ نَرْجوهُ.", "when speaking of something we hope for"],
  ["إِنْ شاءَ اللهُ", "عِنْدَ الكَلامِ عَنِ المُسْتَقْبَلِ.", "when speaking of the future"],
  ["فِكْرَةٌ طَيِّبَةٌ", "عِنْدَما نُوافِقُ عَلى رَأْيٍ.", "when agreeing to an opinion"],
  ["الحَمْدُ لِلّهِ عَلى سَلامَتِكَ", "لِلْمَريضِ، أَوْ لِلْقادِمِ مِنَ السَّفَرِ.", "to a sick person or one returning from a journey"],
  ["يا لَهُ مِنْ أَمْرٍ عَجيبٍ!", "عِنْدَ التَّعَجُّبِ.", "when surprised"],
  ["جَزاكَ اللهُ خَيْرًا", "لِلشُّكْرِ.", "for thanking"],
  ["شَفاكَ اللهُ", "لِلْمَريضِ.", "to a sick person"]] }
]},
// ---------------- DERS 34 ----------------
{ no: 34, kisa: "تاءُ التَّأْنيثِ السّاكِنَةُ", ar: "تاءُ التَّأْنيثِ السّاكِنَةُ", tr: "The quiescent tāʾ of feminine", ozet: "When the subject is feminine, a quiescent ت is added to the past-tense verb: جاءَتْ زَوْجَةٌ.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "تاءُ التَّأْنيثِ السّاكِنَةُ (تْ) تَلْحَقُ الفِعْلَ الماضِيَ.", tr: "The quiescent tāʾ of feminine (تْ) is added to the end of the past-tense verb and shows that the subject is feminine. If the letter that follows it is quiescent, it takes kasra: قَرَأَتِ البِنْتُ." },
 { t: "ornek", ar: "ادْرُسْ وَلاحِظْ", ogeler: [
  ["مارَسَ[[تْ]] مَرْيَمُ الرِّياضَةَ شَهْرًا.", "Maryam did sport for a month."], ["حاوَلَ[[تْ]] زَيْنَبُ أَنْ تَأْكُلَ كَثيرًا.", "Zaynab tried to eat a lot."], ["اخْتَفَ[[تْ]] أُسَرٌ كَبيرَةٌ.", "Large families disappeared."],
  ["ظَهَرَ[[تْ]] أُسَرٌ صَغيرَةٌ.", "Small families appeared."], ["تَرَكَ[[تْ]] هِنْدٌ السُّكَّرِيّاتِ.", "Hind gave up sweets."], ["فَحَصَ[[تْ]] طَبيبَةُ القَلْبِ المَريضَةَ.", "The (woman) heart doctor examined the patient."],
  ["قَرَأَ[[تِ]] البِنْتُ الصَّحيفَةَ.", "The girl read the newspaper."], ["صَلَّ[[تِ]] المُسْلِمَةُ العَصْرَ.", "The Muslim woman prayed the afternoon prayer."]] },
 { t: "acik", ar: "تَدْريبٌ: حَوِّلْ ما تَحْتَهُ خَطٌّ إِلى المُؤَنَّثِ، وَغَيِّرْ ما يَلْزَمُ كَما في المِثالِ", aciklama: "Example: جاءَ زَوْجٌ. ← جاءَتْ زَوْجَةٌ.", ogeler: [
  ["نَصَحَ [[الوالِدُ]] ابْنَهُ.", "نَصَحَتِ الوالِدَةُ ابْنَها.", "The father advised his son."], ["سافَرَ [[المُدَرِّسُ]] إِلى مَكَّةَ.", "سافَرَتِ المُدَرِّسَةُ إِلى مَكَّةَ.", "The teacher went to Mecca."],
  ["لَبِسَ [[الرَّجُلُ]] الثَّوْبَ.", "لَبِسَتِ المَرْأَةُ الثَّوْبَ.", "The man put on the garment."], ["[[المُهَنْدِسُ]] حَضَرَ مُبَكِّرًا.", "المُهَنْدِسَةُ حَضَرَتْ مُبَكِّرًا.", "The engineer came early."],
  ["[[الطّالِبُ]] كَتَبَ بِالقَلَمِ.", "الطّالِبَةُ كَتَبَتْ بِالقَلَمِ.", "The student wrote with the pen."], ["قابَلَ [[الابْنُ]] الطَّبيبَ.", "قابَلَتِ البِنْتُ الطَّبيبَ.", "The son met with the doctor."],
  ["[[مُحَمَّدٌ]] سَمِعَ الأَذانَ.", "فاطِمَةُ سَمِعَتِ الأَذانَ.", "Muhammad heard the call to prayer."], ["[[الجَدُّ]] قَرَأَ القُرْآنَ.", "الجَدَّةُ قَرَأَتِ القُرْآنَ.", "The grandfather read the Qur'an."],
  ["[[الطَّبيبُ]] فَحَصَ المَريضَ.", "الطَّبيبَةُ فَحَصَتِ المَريضَ.", "The doctor examined the patient."], ["[[المُعَلِّمُ]] قَرَأَ الكِتابَ.", "المُعَلِّمَةُ قَرَأَتِ الكِتابَ.", "The teacher read the book."]] },
 { t: "bosluk", ar: "اخْتَرِ الفِعْلَ المُناسِبَ", aciklama: "If the subject is feminine, تْ is added to the verb.", ogeler: [
  ["___ الطّالِبَةُ الدَّرْسَ.", "كَتَبَتِ", ["كَتَبَ"], "The (girl) student wrote the lesson."], ["___ الوَلَدُ إِلى المَدْرَسَةِ.", "ذَهَبَ", ["ذَهَبَتْ"], "The child went to school."], ["___ الأُمُّ الطَّعامَ.", "أَعَدَّتِ", ["أَعَدَّ"], "The mother prepared the food."],
  ["___ الطَّبيبُ المَريضَ.", "فَحَصَ", ["فَحَصَتِ"], "The doctor examined the patient."], ["___ زَيْنَبُ مِنَ السَّفَرِ.", "عادَتْ", ["عادَ"], "Zaynab returned from the journey."]] }
]},
// ---------------- DERS 35 ----------------
{ no: 35, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to a text in which a father describes his family; talk about situations in marriage.", bloklar: [
 { t: "dinle", s: "l35", ar: "اسْتَمِعْ إِلى النَّصِّ", aciklama: "A father describes his family. Listen first, then answer the questions.", metin: [
  ["تَزَوَّجْتُ قَبْلَ خَمْسَ عَشْرَةَ سَنَةً مِنِ ابْنَةِ عَمّي، وَلي الآنَ -وَالحَمْدُ لِلّهِ- أُسْرَةٌ كَبيرَةٌ، تَتَكَوَّنُ مِنْ خَمْسَةِ أَفْرادٍ: ثَلاثَةِ أَبْناءٍ وَبِنْتَيْنِ.", "Fifteen years ago I married my paternal uncle's daughter; praise be to God, now I have a large family of five children: three sons and two daughters."],
  ["يَدْرُسُ أَكْبَرُ أَبْنائي في المَرْحَلَةِ المُتَوَسِّطَةِ، وَتَدْرُسُ أَصْغَرُ بَناتي في المَرْحَلَةِ الابْتِدائِيَّةِ.", "The eldest of my sons studies in middle school and the youngest of my daughters in primary school."],
  ["تَعيشُ أُسْرَتي حَياةً سَعيدَةً، فَأَنا أُحِبُّ زَوْجَتي، وَزَوْجَتي تُحِبُّني، وَنَحْنُ نُحِبُّ أَوْلادَنا، وَهُمْ يُحِبّونَنا أَيْضًا.", "My family lives a happy life: I love my wife, my wife loves me; we love our children and they love us."],
  ["تَحْدُثُ أَحْيانًا بَعْضُ المُشْكِلاتِ الصَّغيرَةِ في أُسْرَتِنا، بَيْني وَبَيْنَ زَوْجَتي، أَوْ بَيْنَنا وَبَيْنَ الأَوْلادِ، وَنَقومُ بِحَلِّ تِلْكَ المُشْكِلاتِ عَنْ طَريقِ الحِوارِ وَالتَّفاهُمِ.", "In our family small problems sometimes arise, between my wife and me or between us and the children. We solve these problems by talking and reaching agreement."]],
  not: "The text was transcribed from the recording; the book contains only the questions." },
 { t: "secim", ar: "اسْتَمِعْ إِلى النَّصِّ، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["المُتَحَدِّثُ لَهُ …", "بِنْتانِ وَثَلاثَةُ أَبْناءٍ.", ["بِنْتانِ وَابْنانِ.", "ثَلاثُ بَناتٍ وَابْنانِ."], "The speaker has …"],
  ["أَكْبَرُ أَبْنائِهِ عُمْرُهُ …", "١٤ سَنَةً.", ["١٠ سَنَواتٍ.", "١٧ سَنَةً."], "His eldest son is … years old.", "The recording does not state the age; the eldest son studies in middle school (المَرْحَلَةُ المُتَوَسِّطَةُ)."],
  ["أَصْغَرُ بَناتِهِ عُمْرُها …", "٧ سَنَواتٍ.", ["١٥ سَنَةً.", "٥ سَنَواتٍ."], "His youngest daughter is … years old.", "The recording does not state the age; the youngest daughter studies in primary school (المَرْحَلَةُ الابْتِدائِيَّةُ)."],
  ["زَوْجَةُ المُتَحَدِّثِ …", "ابْنَةُ عَمِّهِ.", ["ابْنَةُ عَمَّتِهِ.", "ابْنَةُ خالِهِ."], "The speaker's wife …"],
  ["هذِهِ الأُسْرَةُ تَتَكَوَّنُ مِنَ الأَبِ وَالأُمِّ وَ…", "خَمْسَةِ أَوْلادٍ.", ["ثَلاثَةِ أَوْلادٍ.", "أَرْبَعَةِ أَوْلادٍ."], "This family consists of mother, father and …"]] },
 { t: "acik", ar: "تَكَلَّمْ — التَّدْريبُ (١): ماذا تَفْعَلُ / تَفْعَلينَ في المَواقِفِ التّالِيَةِ؟", aciklama: "A pair activity: say what you would do in each situation; then look at the sample answer.", ogeler: [
  ["زَوْجَتُكَ تَتَكَلَّمُ كَثيرًا / زَوْجُكِ يَتَكَلَّمُ كَثيرًا.", "أَسْتَمِعُ إِلَيْها، وَأَتَحاوَرُ مَعَها بِهُدوءٍ.", "Your spouse talks a lot."],
  ["زَوْجَتُكَ عَنيدَةٌ / زَوْجُكِ عَنيدٌ.", "أَتَكَلَّمُ مَعَها بِلُطْفٍ، وَلا أَغْضَبُ.", "Your spouse is stubborn."],
  ["زَوْجَتُكَ تَنامُ كَثيرًا / زَوْجُكِ يَنامُ كَثيرًا.", "أَنْصَحُها أَنْ تَنامَ مُبَكِّرًا، وَتَسْتَيْقِظَ مُبَكِّرًا.", "Your spouse sleeps a lot."],
  ["زَوْجَتُكَ مُهْمِلَةٌ / زَوْجُكِ مُهْمِلٌ.", "أَتَكَلَّمُ مَعَها في هذا الأَمْرِ، وَأُساعِدُها.", "Your spouse is indifferent."],
  ["زَوْجُكِ يَسْهَرُ خارِجَ البَيْتِ.", "أَطْلُبُ مِنْهُ أَنْ يَقْضِيَ وَقْتًا أَطْوَلَ مَعَ أُسْرَتِهِ.", "Your husband stays out at night."],
  ["زَوْجَتُكَ تَشْتَري أَشْياءَ لا تَحْتاجونَ إِلَيْها.", "أَتَحاوَرُ مَعَها، وَنَكْتُبُ مَعًا ما نَحْتاجُ إِلَيْهِ.", "Your wife buys things you do not need."],
  ["زَوْجُكِ مَشْغولٌ بِقِراءَةِ الصُّحُفِ وَالشَّبَكَةِ الدَّوْلِيَّةِ.", "أَطْلُبُ مِنْهُ أَنْ يَجْلِسَ مَعَنا، وَيَتَحَدَّثَ مَعَنا.", "Your husband is busy with newspapers and the internet."],
  ["زَوْجَتُكَ تَتَكَلَّمُ بِالهاتِفِ كَثيرًا.", "أَنْصَحُها أَنْ تَتْرُكَ الهاتِفَ، وَتَهْتَمَّ بِالبَيْتِ.", "Your wife talks a lot on the phone."]] },
 { t: "acik", ar: "التَّدْريبُ (٢): ناقِشِ المَوْضوعاتِ التّالِيَةَ مَعَ فَريقٍ مِنْ زُمَلائِكَ", aciklama: "A group activity: discuss each topic with your friends; then look at the sample answer.", ogeler: [
  ["أَشْياءُ يُحِبُّها الزَّوْجُ في زَوْجَتِهِ.", "الدّينُ، وَالأَدَبُ، وَالاهْتِمامُ بِالبَيْتِ وَالأَوْلادِ.", "What a husband likes in his wife."],
  ["أَشْياءُ تُحِبُّها الزَّوْجَةُ في زَوْجِها.", "الدّينُ، وَالأَخْلاقُ الطَّيِّبَةُ، وَالجُلوسُ مَعَ الأُسْرَةِ.", "What a wife likes in her husband."],
  ["أَشْياءُ لا يُحِبُّها الزَّوْجُ في زَوْجَتِهِ.", "الإِهْمالُ، وَالعِنادُ، وَالكَلامُ في الهاتِفِ كَثيرًا.", "What a husband dislikes in his wife."],
  ["أَشْياءُ لا تُحِبُّها الزَّوْجَةُ في زَوْجِها.", "السَّهَرُ خارِجَ البَيْتِ، وَعَدَمُ الاهْتِمامِ بِالأُسْرَةِ.", "What a wife dislikes in her husband."],
  ["لِماذا يَتْرُكُ الزَّوْجُ زَوْجَتَهُ؟", "إِذا عَجَزا عَنْ حَلِّ المُشْكِلاتِ بِالحِوارِ.", "Why does a husband leave his wife?"],
  ["لِماذا لا تَهْتَمُّ بَعْضُ الزَّوْجاتِ بِبُيوتِهِنَّ؟", "لِأَنَّهُنَّ يَهْتَمِمْنَ بِأَنْفُسِهِنَّ وَبِصَديقاتِهِنَّ فَقَطْ.", "Why do some women not care about their homes?"]] }
]},
// ---------------- DERS 36 ----------------
{ no: 36, kisa: "الأُسْرَةُ بَيْنَ الماضي وَالحاضِرِ", ar: "الأُسْرَةُ بَيْنَ الماضي وَالحاضِرِ", tr: "The Family in the Past and Today", ozet: "Reading text: from the large family to the small family; the weakening of family ties; the woman's work.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["هَلِ الأُسْرَةُ في بَلَدِكَ كَبيرَةٌ، أَمْ صَغيرَةٌ؟", "In your country is the family large or small?"], ["هَلْ يَعيشُ الجَدُّ وَالجَدَّةُ مَعَ الأُسْرَةِ؟", "Do grandfather and grandmother live with the family?"], ["كَيْفَ العَلاقَةُ بَيْنَ الأَبْناءِ وَالآباءِ في بَلَدِكَ؟", "In your country how is the relationship between children and fathers?"], ["هَلْ تُحِبُّ الزَّواجَ بِامْرَأَةٍ عامِلَةٍ؟", "Would you like to marry a working woman?"]] },
 { t: "metin", resim: ["qadim", "usra"], paragraf: [
  [["يَخْتَلِفُ نِظامُ الأُسْرَةِ الآنَ عَنْ نِظامِ الأُسْرَةِ في الماضي، وَلِهذا الاخْتِلافِ صُوَرٌ كَثيرَةٌ،", "Today's family order differs from the family order of the past; this difference has many aspects.", "m36-0"],
   ["مِنْها: اخْتِفاءُ الأُسْرَةِ الكَبيرَةِ في كَثيرٍ مِنَ المُجْتَمَعاتِ. كانَتِ الأُسْرَةُ الكَبيرَةُ تَسْكُنُ في بَيْتٍ واحِدٍ كَبيرٍ، يَضُمُّ جَميعَ أَفْرادِها.", "One of them: in many societies the large family has disappeared. The large family lived in one big house that sheltered all its members.", "m36-1"],
   ["اخْتَفَتِ الأُسْرَةُ الكَبيرَةُ، وَظَهَرَتِ الأُسْرَةُ الصَّغيرَةُ، الَّتي تَضُمُّ الزَّوْجَ وَالزَّوْجَةَ وَالوَلَدَ، أَوِ الوَلَدَيْنِ.", "The large family disappeared; the small family appeared, consisting of a husband, a wife and one or two children.", "m36-2"]],
  [["مِنْ صُوَرِ الاخْتِلافِ، ضَعْفُ العَلاقَةِ بَيْنَ أَفْرادِ الأُسْرَةِ، فَقَدْ أَصْبَحَ الآباءُ يَقْضونَ مُعْظَمَ الوَقْتِ في أَماكِنِ العَمَلِ، وَلا يَرَوْنَ أَطْفالَهُمْ إِلّا قَليلًا؛", "One of the aspects of the difference is also the weakening of the tie between family members: fathers have come to spend most of their time at their workplaces and see their children only rarely;", "m36-3"],
   ["لِأَنَّهُمْ يَخْرُجونَ في الصَّباحِ، وَيَتْرُكونَهُمْ نائِمينَ، وَيَرْجِعونَ في اللَّيْلِ، وَيَجِدونَهُمْ نائِمينَ.", "because they leave in the morning while they are asleep, and when they return at night they find them asleep.", "m36-4"],
   ["وَمِنْ ناحِيَةٍ أُخْرى، يُغادِرُ الأَوْلادُ البَيْتَ في الصَّباحِ إِلى المَدْرَسَةِ، وَيَرْجِعونَ في المَساءِ، فَتَبْقى الأُمُّ في البَيْتِ وَحْدَها مُعْظَمَ الوَقْتِ.", "On the other hand, the children leave the house in the morning to go to school and return in the evening; and the mother remains alone at home most of the time.", "m36-5"]],
  [["مِنْ صُوَرِ الاخْتِلافِ أَيْضًا، خُروجُ بَعْضِ النِّساءِ مِنَ البَيْتِ إِلى العَمَلِ.", "One of the aspects of the difference is also that some women leave the house to work.", "m36-6"],
   ["وَكانَتِ المَرْأَةُ -في الماضي- لا تَخْرُجُ مِنْ بَيْتِها إِلّا عِنْدَ الضَّرورَةِ، أَمّا اليَوْمَ، فَقَدْ تُغادِرُ الزَّوْجَةُ بَيْتَها في الصَّباحِ، وَلا تَرْجِعُ إِلَيْهِ إِلّا في المَساءِ، وَعِنْدَما تَرْجِعُ تَكونُ مُتْعَبَةً،", "In the past a woman left her house only in case of necessity; today the wife leaves her house in the morning and can return only in the evening, and when she returns she is tired;", "m36-7"],
   ["فَلا تَقومُ بِعَمَلِ البَيْتِ مِنْ نَظافَةٍ وَإِعْدادٍ لِلطَّعامِ، وَلا تَجِدُ وَقْتًا لِتَجْلِسَ مَعَ أَطْفالِها، أَوْ زَوْجِها، لِلْحَديثِ في أُمورِ الأَوْلادِ وَالبَيْتِ.", "so she cannot do the housework such as cleaning and preparing food; she does not find time to sit with her children or her husband and talk about the affairs of the children and the house.", "m36-8"]]] },
 { t: "siniflandir", ar: "اسْتيعابٌ — التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) أَمامَ العِبارَةِ الَّتي تُناسِبُ الماضِيَ، وَعَلامَةَ (✗) أَمامَ العِبارَةِ الَّتي تُناسِبُ الحاضِرَ", soru: "Past or present?", gruplar: ["الماضي", "الحاضِرُ"], ogeler: [
  ["اخْتِفاءُ الأُسْرَةِ الكَبيرَةِ.", 1], ["تَسْكُنُ الأُسْرَةُ في بَيْتٍ واحِدٍ.", 0], ["يَجْلِسُ الزَّوْجانِ لِلْحَديثِ في أُمورِ الأَوْلادِ.", 0], ["ظَهَرَتِ الأُسْرَةُ الصَّغيرَةُ.", 1], ["عَدَدُ أَفْرادِ الأُسْرَةِ كَثيرٌ.", 0],
  ["ضَعْفُ العَلاقَةِ بَيْنَ أَفْرادِ الأُسْرَةِ.", 1], ["تَبْقى الأُمُّ وَحْدَها في البَيْتِ كَثيرًا.", 1], ["خُروجُ النِّساءِ لِلْعَمَلِ.", 1], ["تُنَظِّفُ المَرْأَةُ البَيْتَ، وَتُعِدُّ الطَّعامَ.", 0]] },
 { t: "secim", ar: "التَّدْريبُ (٢): ضَعْ عَلامَةَ (✓) بِجانِبِ الفِكْرَةِ المُناسِبَةِ في كُلِّ فِقْرَةٍ", ogeler: [
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الأولى هِيَ:", "الأُسْرَةُ الآنَ تَخْتَلِفُ عَنِ الأُسْرَةِ في الماضي.", ["ضَعُفَتِ الأُسْرَةُ الكَبيرَةُ.", "الأُسْرَةُ الكَبيرَةُ تَسْكُنُ في بَيْتٍ واحِدٍ."], "The main idea of the first paragraph:"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّانِيَةِ هِيَ:", "ضَعْفُ العَلاقَةِ بَيْنَ أَفْرادِ الأُسْرَةِ.", ["يُغادِرُ الأَوْلادُ البَيْتَ في الصَّباحِ.", "تَبْقى الأُمُّ وَحْدَها في البَيْتِ."], "The main idea of the second paragraph:"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّالِثَةِ هِيَ:", "تَخْرُجُ النِّساءُ لِلْعَمَلِ خارِجَ البَيْتِ.", ["لا تُغادِرُ المَرْأَةُ بَيْتَها إِلّا عِنْدَ الضَّرورَةِ.", "لا تَجْلِسُ المَرْأَةُ مَعَ أَطْفالِها."], "The main idea of the third paragraph:"]] },
 { t: "esle", ar: "مُفْرَداتٌ — التَّدْريبُ (١): صِلْ بَيْنَ الكَلِمَةِ وَالتَّعْريفِ المُناسِبِ", ciftler: [
  ["اللَّيْلُ", "وَقْتُ النَّوْمِ.", "night"], ["المُجْتَمَعُ", "النّاسُ الَّذينَ يُقيمونَ في مَكانٍ واحِدٍ.", "society"], ["الأُسْرَةُ", "الزَّوْجُ وَالزَّوْجَةُ وَالأَوْلادُ.", "family"], ["نِساءٌ", "جَمْعُ امْرَأَةٍ.", "women"], ["الماضي", "الوَقْتُ الَّذي ذَهَبَ وَانْتَهى.", "past"]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): امْلَأِ الفَراغَ بِالكَلِمَةِ المُناسِبَةِ", ogeler: [
  ["هَلْ هذا ___ حامِدٍ؟", "قَوْلُ", ["قالَ"], "Is this Hāmid's saying?"], ["حَدَثَ ___ بَيْنَ الرَّجُلَيْنِ.", "اخْتِلافٌ", ["يَخْتَلِفُ"], "A dispute arose between two men."], ["أَيْنَ بابُ ___؟", "الخُروجِ", ["يَخْرُجُ"], "Where is the exit?"],
  ["غَدًا ___ الطَّبيبَ.", "أُقابِلُ", ["مُقابَلَةُ"], "Tomorrow I will meet the doctor."], ["أَحْمَدُ ___ مَعي.", "يَذْهَبُ", ["ذَهابُ"], "Ahmad is going with me."]] }
]},
// ---------------- DERS 37 ----------------
{ no: 37, kisa: "الضَّميرُ", ar: "الضَّميرُ: ضَمائِرُ الرَّفْعِ المُنْفَصِلَةُ", tr: "Pronouns: separate nominative pronouns", ozet: "First-, second- and third-person pronouns: أَنا، نَحْنُ، أَنْتَ… هُوَ، هِيَ…", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الضَّميرُ اسْمٌ يَدُلُّ عَلى: مُتَكَلِّمٍ، أَوْ مُخاطَبٍ، أَوْ غائِبٍ. مِنْهُ المُنْفَصِلُ وَمِنْهُ المُتَّصِلُ.", tr: "A pronoun is a noun that denotes the speaker (first person), the one addressed (second person) or one who is absent (third person). They are separate (munfaṣil) and attached (muttaṣil). In this lesson the separate nominative pronouns are covered." },
 { t: "tablo", ar: "ضَمائِرُ الرَّفْعِ المُنْفَصِلَةُ", bas: ["مُتَكَلِّمٌ", "مُخاطَبٌ", "غائِبٌ"], satir: [["أَنا طالِبٌ.", "أَنْتَ طالِبٌ.", "هُوَ طالِبٌ."], ["أَنا طالِبَةٌ.", "أَنْتِ طالِبَةٌ.", "هِيَ طالِبَةٌ."], ["نَحْنُ طالِبانِ.", "أَنْتُما طالِبانِ.", "هُما طالِبانِ."], ["نَحْنُ طالِبَتانِ.", "أَنْتُما طالِبَتانِ.", "هُما طالِبَتانِ."], ["نَحْنُ طُلّابٌ.", "أَنْتُمْ طُلّابٌ.", "هُمْ طُلّابٌ."], ["نَحْنُ طالِباتٌ.", "أَنْتُنَّ طالِباتٌ.", "هُنَّ طالِباتٌ."]] },
 { t: "bosluk", ar: "التَّدْريبُ (١): ضَعْ ضَميرَ الرَّفْعِ المُنْفَصِلَ المُناسِبَ", ogeler: [
  ["___ مُسافِرٌ إِلى بَلَدي.", "أَنا", ["أَنْتُما", "هُنَّ"], "I am travelling to my homeland."], ["___ مَريضَةٌ، فَاذْهَبي إِلى المُسْتَشْفى.", "أَنْتِ", ["أَنْتَ", "هُوَ"], "You are ill, go to the hospital."],
  ["___ مُهَنْدِسانِ في شَرِكَتِهِما.", "هُما", ["هُمْ", "هِيَ"], "They (two) are engineers in their company."], ["___ مُدَرِّسونَ تَذْهَبونَ إِلى المَدْرَسَةِ.", "أَنْتُمْ", ["هُمْ", "أَنْتُنَّ"], "You are teachers going to school."],
  ["___ مُعَلِّمَتانِ أَعْرِفُهُما.", "هُما", ["هُمْ", "هُنَّ"], "They are two teachers (women) I know."], ["___ تُساعِدانِ زَوْجَيْكُما.", "أَنْتُما", ["هُما", "أَنْتُمْ"], "You (two) are helping your husbands."],
  ["___ تَدْرُسْنَ في هذِهِ المَدْرَسَةِ.", "أَنْتُنَّ", ["هُنَّ", "أَنْتُمْ"], "You (women) study at this school."], ["___ نائِمٌ في الغُرْفَةِ.", "هُوَ", ["هِيَ", "أَنْتِ"], "He sleeps in that room."],
  ["___ أَطِبّاءُ نَفْحَصُ المَرْضى.", "نَحْنُ", ["هُمْ", "أَنْتُمْ"], "We are doctors who examine patients."], ["___ مَسْؤولَةٌ عَنْ بَيْتِكِ.", "أَنْتِ", ["هِيَ", "أَنا"], "You are responsible for your home."]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): اخْتَرِ الضَّميرَ المُناسِبَ مِمّا بَيْنَ القَوْسَيْنِ", aciklama: "Example: هُما يَكْتُبانِ الدَّرْسَ. (أَنْتُما / هُما / نَحْنُ)", ogeler: [
  ["___ يَسْهَرُ خارِجَ البَيْتِ.", "هُوَ", ["هُمْ", "هِيَ"], "He stays out at night."], ["___ أُحِبُّها كَثيرًا.", "أَنا", ["أَنْتَ", "أَنْتُمْ"], "I love him very much."], ["___ تَكَلَّمْتِ مَعَها.", "أَنْتِ", ["أَنا", "أَنْتَ"], "You talked with him."],
  ["___ فَكَّروا في السَّفَرِ.", "هُمْ", ["هُنَّ", "هُما"], "They thought about the journey."], ["___ لا نُحِبُّ الخِلافاتِ الزَّوْجِيَّةَ.", "نَحْنُ", ["أَنْتُما", "أَنا"], "We do not like marital disputes."], ["___ طالِباتٌ نَشيطاتٌ.", "أَنْتُنَّ", ["أَنْتُمْ", "أَنْتُما"], "You are hard-working (girl) students."]] },
 { t: "acik", ar: "التَّدْريبُ (٣): ضَعْ ضَميرَ الرَّفْعِ المُناسِبَ لِلْمُخاطَبِ", aciklama: "Example: أَنْتُمْ طُلّابٌ مِنَ السّودانِ.", ogeler: [
  ["… مُوَظَّفانِ نَشيطانِ.", "أَنْتُما مُوَظَّفانِ نَشيطانِ.", "You are two hard-working clerks."], ["هَلْ … عُمّالٌ في الشَّرِكَةِ؟", "هَلْ أَنْتُمْ عُمّالٌ في الشَّرِكَةِ؟", "Are you workers at the company?"], ["… طَبيباتٌ نَشيطاتٌ.", "أَنْتُنَّ طَبيباتٌ نَشيطاتٌ.", "You are hard-working doctors (women)."],
  ["هَلْ … مُهَنْدِسَةٌ مِصْرِيَّةٌ؟", "هَلْ أَنْتِ مُهَنْدِسَةٌ مِصْرِيَّةٌ؟", "Are you an Egyptian engineer (woman)?"], ["… فَتاةٌ طَيِّبَةٌ.", "أَنْتِ فَتاةٌ طَيِّبَةٌ.", "You are a good girl."], ["… طالِبَتانِ مُجْتَهِدَتانِ.", "أَنْتُما طالِبَتانِ مُجْتَهِدَتانِ.", "You are two hard-working students (girls)."]] },
 { t: "acik", ar: "التَّدْريبُ (٤): ضَعْ ضَميرَ الرَّفْعِ المُناسِبَ لِلْمُتَكَلِّمِ", ogeler: [
  ["… مُسافِرَتانِ إِلى مَكَّةَ.", "نَحْنُ مُسافِرَتانِ إِلى مَكَّةَ.", "We are two travellers going to Mecca (women)."], ["… مُهَنْدِسَةٌ مِنَ العِراقِ.", "أَنا مُهَنْدِسَةٌ مِنَ العِراقِ.", "I am an Iraqi engineer (woman)."], ["… مُعَلِّماتٌ سُعودِيّاتٌ.", "نَحْنُ مُعَلِّماتٌ سُعودِيّاتٌ.", "We are Saudi teachers (women)."],
  ["… قادِمونَ لِلْحَجِّ هذا العامَ.", "نَحْنُ قادِمونَ لِلْحَجِّ هذا العامَ.", "This year we are coming for pilgrimage."], ["… ذاهِبانِ إِلى السّوقِ.", "نَحْنُ ذاهِبانِ إِلى السّوقِ.", "(We two) are going to the market."]] },
 { t: "acik", ar: "التَّدْريبُ (٥): حَوِّلْ ضَميرَ المُخاطَبِ إِلى ضَميرِ الغائِبِ، كَما في المِثالِ", aciklama: "Example: أَنْتَ طالِبٌ جَديدٌ. ← هُوَ طالِبٌ جَديدٌ.", ogeler: [
  ["أَنْتِ فَتاةٌ نَشيطَةٌ.", "هِيَ فَتاةٌ نَشيطَةٌ.", "You are a hard-working girl."], ["أَنْتُمْ أَطِبّاءُ في المُسْتَشْفى.", "هُمْ أَطِبّاءُ في المُسْتَشْفى.", "You are doctors in the hospital."], ["أَنْتُما طالِبانِ في الجامِعَةِ.", "هُما طالِبانِ في الجامِعَةِ.", "You (two) are students at the university."],
  ["أَنْتُنَّ مُوَظَّفاتٌ جَديداتٌ.", "هُنَّ مُوَظَّفاتٌ جَديداتٌ.", "You are new clerks (women)."], ["أَنْتُما عامِلَتانِ هُنا.", "هُما عامِلَتانِ هُنا.", "You (two women) work here."], ["أَنْتَ عامِلٌ كَسْلانُ.", "هُوَ عامِلٌ كَسْلانُ.", "You are a lazy worker."]] }
]},
// ---------------- DERS 38 ----------------
{ no: 38, kisa: "تَعْبيرٌ مُوَجَّهٌ", ar: "تَعْبيرٌ مُوَجَّهٌ", tr: "Guided composition", ozet: "Describe the pictures; write about married life and the family; punctuation marks.", bloklar: [
 { t: "resim", ar: "التَّدْريبُ (١): صِفْ كُلَّ صورَةٍ في خَمْسِ جُمَلٍ", aciklama: "Describe the picture in five sentences; then look at the example.", resimler: [
  ["zawjan", "هذِهِ أُسْرَةٌ صَغيرَةٌ. الأَبُ وَالأُمُّ وَالطِّفْلُ يَمْشونَ مَعًا. يَلْبَسُ الأَبُ ثَوْبًا أَصْفَرَ. يَذْهَبونَ إِلى المَسْجِدِ. الأُسْرَةُ سَعيدَةٌ.", "A small family"],
  ["ab", "هذا رَجُلٌ وَبِنْتُهُ. هُما يَجْلِسانِ في الحَديقَةِ. البِنْتُ غاضِبَةٌ. الأَبُ لا يَتَكَلَّمُ مَعَها. هُما يَحْتاجانِ إِلى الحِوارِ.", "A father and his daughter"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): اكْتُبْ مَوْضوعًا بِعُنْوانِ (الحَياةُ الزَّوْجِيَّةُ) مُسْتَعينًا بِالنُّصوصِ الوارِدَةِ في هذِهِ الوَحْدَةِ", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["الحَياةُ الزَّوْجِيَّةُ", "في الحَياةِ الزَّوْجِيَّةِ خَيْرٌ كَثيرٌ. عَلى الشّابِّ أَنْ يَخْتارَ ذاتَ الدّينِ، كَما قالَ الرَّسولُ ﷺ. وَقَدْ تَظْهَرُ مُشْكِلاتٌ بَيْنَ الزَّوْجَيْنِ؛ لِأَنَّ شَخْصِيَّةَ الرَّجُلِ تَخْتَلِفُ عَنْ شَخْصِيَّةِ المَرْأَةِ. وَالسَّبيلُ إِلى حَلِّ هذِهِ المُشْكِلاتِ هُوَ الحِوارُ. عَلى الزَّوْجِ أَنْ يَهْتَمَّ بِزَوْجَتِهِ، وَلا يَسْهَرَ خارِجَ البَيْتِ، وَعَلى الزَّوْجَةِ أَنْ تَهْتَمَّ بِزَوْجِها وَبَيْتِها.", "Married Life"]] },
 { t: "acik", ar: "التَّدْريبُ (٣): اكْتُبْ مَوْضوعًا بِعُنْوانِ: نِظامُ الأُسْرَةِ بَيْنَ الماضي وَالحاضِرِ", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["نِظامُ الأُسْرَةِ بَيْنَ الماضي وَالحاضِرِ", "كانَتِ الأُسْرَةُ في الماضي كَبيرَةً، تَسْكُنُ في بَيْتٍ واحِدٍ، وَيَعيشُ فيهِ الجَدُّ وَالجَدَّةُ وَالأَبْناءُ. وَكانَتِ المَرْأَةُ تَبْقى في البَيْتِ، وَتَجْلِسُ مَعَ أَطْفالِها. أَمّا الآنَ فَقَدْ ظَهَرَتِ الأُسْرَةُ الصَّغيرَةُ، وَضَعُفَتِ العَلاقَةُ بَيْنَ أَفْرادِها؛ فَالأَبُ يَقْضي مُعْظَمَ الوَقْتِ في العَمَلِ، وَخَرَجَتْ بَعْضُ النِّساءِ إِلى العَمَلِ.", "The family order in the past and today"]] },
 { t: "tablo", ar: "التَّدْريبُ (٤): عَلاماتُ التَّرْقيمِ", baslik: "Punctuation marks", tts: false, bas: ["النُّقْطَةُ", "عَلامَةُ الاسْتِفْهامِ", "عَلامَةُ التَّعَجُّبِ", "الفاصِلَةُ", "الفاصِلَةُ المَنْقوطَةُ", "عَلامَةُ التَّنْصيصِ", "الشَّرْطَتانِ", "النُّقْطَتانِ"], satir: [[".", "؟", "!", "،", "؛", "« »", "– –", ":"]] },
 { t: "bosluk", ar: "ضَعْ عَلامَةَ التَّرْقيمِ المُناسِبَةَ في المَكانِ الخالي", aciklama: "Choose the suitable mark for the blank at the end of the sentence.", ogeler: [
  ["شَرِبَ الرَّجُلُ، وَحَمِدَ رَبَّهُ ___", ".", ["؟", "!"], "The man drank and praised his Lord."], ["أَأَنْتَ مُسافِرٌ ___", "؟", [".", "!"], "Are you a traveller?"], ["المُسْلِمُ أَخو المُسْلِمِ ___", ".", ["؟", "؛"], "A Muslim is the brother of a Muslim."],
  ["يا لَها مِنْ نَصيحَةٍ ___", "!", ["؟", "،"], "What a good piece of advice!"], ["سافَرَ إِلى المَدينَةِ ___ لِيَدْرُسَ في الجامِعَةِ.", "؛", ["؟", "!"], "He went to Medina to study at the university."], ["قالَ تَعالى ___ ﴿إِنَّ مَعَ الْعُسْرِ يُسْرًا﴾", ":", ["؟", "!"], "God Almighty said: …"],
  ["ماذا تُريدُ ___", "؟", [".", "!"], "What do you want?"], ["ما أَحْسَنَ كَلامَكَ ___", "!", ["؟", "."], "How good your speech is!"], ["قالَ الرَّسولُ ﷺ ___ «أَفْضَلُ الجِهادِ حَجٌّ مَبْرورٌ».", ":", ["؟", "!"], "The Messenger of God said: “The most excellent jihad is an accepted pilgrimage.”"]] }
]},
// ---------------- DERS 39 ----------------
{ no: 39, kisa: "الخَطُّ وَالإِمْلاءُ", ar: "الخَطُّ وَالإِمْلاءُ: تاءُ التَّأْنيثِ المُتَحَرِّكَةُ", tr: "Calligraphy and spelling: the vowelled tāʾ of feminine", ozet: "Write in naskh script; distinguish the open tāʾ (ت) from the closed tāʾ (ة).", bloklar: [
 { t: "hat", ar: "الخَطُّ — اكْتُبْ بِخَطِّ النَّسْخِ", aciklama: "Write the noble hadith in your notebook in naskh script.", ogeler: [["«لا يَحِلُّ لِمُسْلِمٍ أَنْ يَهْجُرَ أَخاهُ فَوْقَ ثَلاثِ لَيالٍ» (حَديثٌ شَريفٌ) — It is not lawful for a Muslim to forsake his brother for more than three nights.", "لا يحل لمسلم أن يهجر أخاه فوق ثلاث ليال"]] },
 { t: "kural", ar: "الإِمْلاءُ: تاءُ التَّأْنيثِ المُتَحَرِّكَةُ", metin: "تاءُ التَّأْنيثِ المُتَحَرِّكَةُ نَوْعانِ: مَفْتوحَةٌ (ت)، وَمَرْبوطَةٌ (ـة / ة).", tr: "The vowelled tāʾ of feminine is of two kinds: the open tāʾ (ت) — بِنْتٌ، أُخْتٌ and the feminine plural ending ـات — and the closed tāʾ (ـة / ة) — جَميلَةٌ، فاطِمَةُ." },
 { t: "tablo", ar: "ادْرُسْ وَلاحِظْ", bas: ["مَفْتوحَةٌ (ت)", "مَرْبوطَةٌ (ـة / ة)"], satir: [["بِنْتٌ", "جَميلَةٌ"], ["أُخْتٌ", "فاطِمَةُ"], ["بَناتٌ", "جَدَّةٌ"], ["أَخَواتٌ", "عَمَّةٌ"], ["طَبيباتٌ", "طَبيبَةٌ"], ["كَبيراتٌ", "كَبيرَةٌ"]] },
 { t: "siniflandir", ar: "تَدْريبٌ: ضَعْ كَلِماتِ القائِمَةِ في المَكانِ المُناسِبِ", soru: "Open tāʾ or closed tāʾ?", gruplar: ["مَفْتوحَةٌ (ت)", "مَرْبوطَةٌ (ـة / ة)"], ogeler: [
  ["مَدْرَسَةٌ", 1], ["طالِباتٌ", 0], ["كَثيراتٌ", 0], ["كَثيرَةٌ", 1], ["عَمّاتٌ", 0], ["خالَةٌ", 1], ["جَدّاتٌ", 0], ["نَشَوِيّاتٌ", 0], ["مَكَّةُ", 1]] }
]}
];
var KELIME = [
 ["قَلِقٌ", "worried", 27], ["الزَّواجُ", "marriage", 27], ["الفَتاةُ (فَتَياتٌ)", "young girl", 27], ["مُناسِبٌ", "suitable", 27], ["فَقيرٌ", "poor", 27], ["غَنِيٌّ", "rich", 27], ["أُسْرَةٌ (أُسَرٌ)", "family", 27], ["ذاتُ مالٍ", "owner of wealth (woman)", 27], ["الجَمالُ", "beauty", 27], ["الحَسَبُ", "lineage, honour", 27], ["النَّسَبُ", "lineage", 27], ["حَقَّقَ - يُحَقِّقُ", "to bring about, to ensure", 27], ["السَّعادَةُ", "happiness", 27], ["عَلَيْكَ بِـ", "choose …, hold fast to …", 27], ["ظَفِرَ - يَظْفَرُ بِـ", "to obtain, to earn", 27],
 ["الحَياةُ الزَّوْجِيَّةُ", "married life", 31], ["خَيْرٌ", "good, goodness", 31], ["ظَهَرَ - يَظْهَرُ", "to appear", 31], ["الحَقيقَةُ", "truth, reality", 31], ["خِلافٌ (خِلافاتٌ)", "disagreement", 31], ["عَجَزَ - يَعْجِزُ عَنْ", "to be unable", 31], ["حَلٌّ", "solution", 31], ["اعْتَقَدَ - يَعْتَقِدُ", "to believe", 31], ["ثارَ - يَثورُ", "to get angry, to flare up", 31], ["الطَّلاقُ", "divorce", 31], ["السَّبيلُ", "way", 31], ["النَّجاحُ", "success", 31], ["الحِوارُ", "dialogue, conversation", 31], ["اخْتِلافٌ", "difference", 31], ["شَخْصِيَّةٌ", "personality", 31], ["مَرْحَلَةٌ", "period, stage", 31], ["الطُّفولَةُ", "childhood", 31], ["الشَّكْوى", "complaint", 31], ["السِّياسَةُ", "politics", 31], ["المَجَلَّةُ", "magazine", 31],
 ["تَرَكَ - يَتْرُكُ", "to leave, to abandon", 33], ["عاشَ - يَعيشُ", "to live", 33], ["مُؤَدَّبٌ", "well-mannered", 33], ["مُطيعٌ", "obedient", 33], ["تَغَيَّرَ - يَتَغَيَّرُ", "to change", 33], ["مُهْمِلٌ", "neglectful, indifferent", 33], ["اهْتَمَّ - يَهْتَمُّ بِـ", "to care about", 33], ["عَنيدٌ", "stubborn", 33], ["سَهِرَ - يَسْهَرُ", "to stay up at night", 33], ["بِإِذْنِ اللهِ", "by God's permission", 33],
 ["نِظامٌ", "order, system", 36], ["الماضي", "past", 36], ["الحاضِرُ", "present time, today", 36], ["اخْتِفاءٌ", "disappearance", 36], ["المُجْتَمَعُ", "society", 36], ["ضَمَّ - يَضُمُّ", "to include, to encompass", 36], ["فَرْدٌ (أَفْرادٌ)", "individual", 36], ["العَلاقَةُ", "relation, tie", 36], ["ضَعْفٌ", "weakness", 36], ["مُعْظَمُ", "most of", 36], ["غادَرَ - يُغادِرُ", "to part", 36], ["الضَّرورَةُ", "necessity", 36], ["مُتْعَبٌ", "tired", 36], ["النَّظافَةُ", "cleanliness", 36], ["إِعْدادٌ", "preparing", 36]
];
