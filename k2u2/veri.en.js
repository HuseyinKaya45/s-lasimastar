// ================= VERİ: el-Arabiyyetü beyne yedeyk 2, 2. ünite — التَّرْويحُ عَنِ النَّفْسِ =================
// Bloklar k2ortak/uygulama.js içinde çizilir. Asıl kayıt parçaları: zaman.js (ZAMAN); kaydı olmayan metinler gömülü okunuşla çalar.
var UNITE = { no: 2, ar: "التَّرْويحُ عَنِ النَّفْسِ", tr: "Rest and Recreation", pfx: "k2u2:",
  giris: "Unit 2: man's need for rest, kinds of recreation, how we will spend the holiday, camping. Grammar: interrogative particles, the subject (fāʿil), the vocative particle يا and the prohibitive lā." };
var DERSLER = [
// ---------------- DERS 14 ----------------
{ no: 14, kisa: "الإِنْسانُ يَحْتاجُ إِلى التَّرْويحِ", ar: "الإِنْسانُ يَحْتاجُ إِلى التَّرْويحِ", tr: "Man Needs Rest", ozet: "Dialogue: Ibrāhīm, who fainted, in the hospital.", bloklar: [
 { t: "diyalog", resim: "mustashfa", kisiler: [{ ar: "هِشامٌ", tr: "Hishām" }, { ar: "إِبْراهيمُ", tr: "Ibrāhīm" }], satir: [
  [0, "الحَمْدُ لِلّهِ عَلى سَلامَتِكَ يا إِبْراهيمُ.", "Get well soon, Ibrāhīm (thank God for your safety).", "d14-0"],
  [1, "شُكْرًا لَكَ. أَنا بِخَيْرٍ، وَالحَمْدُ لِلّهِ.", "Thank you. I am well, praise be to God.", "d14-1"],
  [0, "ماذا حَدَثَ؟ لِماذا أَنْتَ هُنا؟!", "What happened? Why are you here?!", "d14-2"],
  [1, "أُغْمِيَ عَلَيَّ، وَأَنا في الشَّرِكَةِ، وَعِنْدَما أَفَقْتُ، وَجَدْتُ نَفْسي هُنا في المُسْتَشْفى.", "I fainted at the company; when I came to, I found myself here in the hospital.", "d14-3"],
  [0, "وَما رَأْيُ الطَّبيبِ؟", "What does the doctor say?", "d14-4"],
  [1, "فَحَصَني الطَّبيبُ، وَقالَ لي: أَنْتَ بِخَيْرٍ.", "The doctor examined me and said, “You are well.”", "d14-5"],
  [0, "ما المُشْكِلَةُ؟", "What is the problem?", "d14-6"],
  [1, "الأَمْرُ عَجيبٌ جِدًّا، طَلَبَ مِنّي الطَّبيبُ أَنْ أُغَيِّرَ أُسْلوبَ حَياتي.", "The situation is very strange: the doctor asked me to change my lifestyle.", "d14-7"],
  [0, "تُغَيِّرُ أُسْلوبَ حَياتِكَ! ماذا يَقْصِدُ؟", "You will change your lifestyle! What does he mean?", "d14-8"],
  [1, "قالَ لي: حَياتُكَ كُلُّها عَمَلٌ، لا تَرْويحَ فيها.", "He said to me, “Your life is work from beginning to end; there is no rest in it at all.”", "d14-9"],
  [0, "يا لَهُ مِنْ أَمْرٍ عَجيبٍ!", "How strange!", "d14-10"],
  [1, "صَدَقَ الطَّبيبُ، فَحَياتي كُلُّها عَمَلٌ، لا تَرْويحَ فيها.", "The doctor spoke the truth; my life is work from beginning to end, with no rest at all.", "d14-11"],
  [0, "وَبِمَ نَصَحَكَ؟", "What did he advise you?", "d14-12"],
  [1, "أَنْ أَقْضِيَ العُطْلَةَ في بَلَدٍ جَميلٍ.", "To spend the holiday in a beautiful country.", "d14-13"],
  [0, "يا لَها مِنْ نَصيحَةٍ طَيِّبَةٍ!", "What a fine piece of advice!", "d14-14"]] },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["أُغْمِيَ عَلى إِبْراهيمَ، وَهُوَ في العَمَلِ.", true, "", "Ibrāhīm fainted while at work."],
  ["طَلَبَ مِنْهُ الطَّبيبُ أَنْ يُغَيِّرَ أُسْلوبَ عَمَلِهِ.", false, "طَلَبَ مِنْهُ الطَّبيبُ أَنْ يُغَيِّرَ أُسْلوبَ حَياتِهِ.", "The doctor asked him to change his way of working."],
  ["حَياةُ هِشامٍ كُلُّها عَمَلٌ.", false, "حَياةُ إِبْراهيمَ كُلُّها عَمَلٌ.", "Hishām's life is work from beginning to end."],
  ["نَصَحَ الطَّبيبُ هِشامًا نَصيحَةً طَيِّبَةً.", false, "نَصَحَ الطَّبيبُ إِبْراهيمَ نَصيحَةً طَيِّبَةً.", "The doctor gave Hishām a fine piece of advice."],
  ["قابَلَ هِشامٌ إِبْراهيمَ في المُسْتَشْفى.", true, "", "Hishām met Ibrāhīm in the hospital."]] },
 { t: "sirala", ar: "التَّدْريبُ (٢): رَتِّبِ الجُمَلَ التّالِيَةَ، كَما وَرَدَتْ في الحِوارِ", ogeler: [
  "أُغْمِيَ عَلَيْهِ وَهُوَ في الشَّرِكَةِ.", "وَعِنْدَما أَفاقَ وَجَدَ نَفْسَهُ في المُسْتَشْفى.", "طَلَبَ مِنْهُ الطَّبيبُ أَنْ يُغَيِّرَ أُسْلوبَ حَياتِهِ.", "حَياةُ إِبْراهيمَ كُلُّها عَمَلٌ، لا تَرْويحَ فيها.", "وَنَصَحَهُ أَنْ يَقْضِيَ العُطْلَةَ في بَلَدٍ جَميلٍ."] },
 { t: "bosluk", ar: "مُفْرَداتٌ — امْلَأِ الفَراغَ بِالكَلِمَةِ المُناسِبَةِ مِنَ الصُّنْدوقِ", kutu: ["وَجَدَ", "قَضى", "فَحَصَ", "غَيَّرَ", "نَصَحَ"], ogeler: [
  ["___ الطَّبيبُ المَريضَ.", "فَحَصَ", null, "The doctor examined the patient."], ["___ الأَبُ وَلَدَهُ.", "نَصَحَ", null, "The father advised his son."], ["___ القَلَمَ في الحَقيبَةِ.", "وَجَدَ", null, "He found the pen in the bag."],
  ["___ العُطْلَةَ في القَرْيَةِ.", "قَضى", null, "He spent the holiday in the village."], ["___ الرَّجُلُ أُسْلوبَ حَياتِهِ.", "غَيَّرَ", null, "The man changed his lifestyle."]] },
 { t: "esle", ar: "التَّدْريبُ (٢): صِلْ بَيْنَ الكَلِمَةِ وَالتَّعْريفِ المُناسِبِ", ciftler: [
  ["المُسْتَشْفى", "مَكانٌ يُعالَجُ فيهِ النّاسُ.", "hospital"], ["العُطْلَةُ", "وَقْتٌ لا عَمَلَ فيهِ، وَلا دِراسَةَ.", "holiday"], ["الشَّرِكَةُ", "مَكانٌ يَعْمَلُ فيهِ النّاسُ.", "company"],
  ["البَلَدُ", "مَكانٌ يُقيمُ فيهِ الإِنْسانُ.", "country, homeland"], ["جَميلٌ", "كَلِمَةٌ مَعْناها عَكْسُ قَبيحٍ.", "beautiful"]] }
]},
// ---------------- DERS 15 ----------------
{ no: 15, kisa: "أ / آ", ar: "الأَصْواتُ: أ / آ", tr: "Sounds: hamza and madda", ozet: "Distinguish the single hamza (أ) from the hamza with madda (آ).", bloklar: [
 { t: "kural", metin: "الهَمْزَةُ المَمْدودَةُ (أا - آ) هَمْزَةٌ بَعْدَها أَلِفٌ: فَيُمَدُّ بِها الصَّوْتُ، بِخِلافِ الهَمْزَةِ المُفْرَدَةِ.", tr: "The hamza with madda (آ) is a hamza followed by an alif: the sound is prolonged; with the single hamza (أ) it is not prolonged.", not: "There is no original recording for this lesson; the words and sentences play with the embedded reading." },
 { t: "tablo", bas: ["أ", "آ", "أ", "آ"], satir: [["أَمال", "آمال", "أَبَتْ", "آبَتْ"], ["أَسِفَ", "آسَفُ", "أَخا", "آخى"], ["أَلامَ", "آلامٌ", "أَنْ", "آنَ"], ["أَنْذَرَ", "آنْذَرَ", "أُذُنٌ", "آذانٌ"], ["أَكَلَ", "آكُلُ", "مَأْرَبٌ", "مَآرِبُ"]],
  not: "Touch a word and listen: with آ the sound is prolonged by two vowel lengths." },
 { t: "sessec", ar: "التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) بِجانِبِ الكَلِمَةِ الَّتي تَسْمَعُها", ogeler: [
  ["أَسِنَ", "آسِنٌ"], ["أَبٌ", "آبَ"], ["أَتى", "آتى"], ["مَأْدُبَةٌ", "مَآدِبُ"], ["أَلْ", "آلُ"], ["أَلَمٌ", "آلَمَ"], ["أَمِنَ", "آمَنَ"], ["أَثَرٌ", "آثَرَ"]] },
 { t: "tekrar", tts: false, ar: "التَّدْريبُ (٢): اسْتَمِعْ، ثُمَّ أَعِدْ", aciklama: "Read the verses; prolong the sound in words beginning with آ (there is no recording of these verses).", ogeler: [
  ["﴿فَبِأَيِّ [[آلَاءِ]] رَبِّكُمَا تُكَذِّبَانِ﴾ (الرحمن: ١٣)", "Then which of your Lord's favours can you deny?"],
  ["﴿وَيُرِيكُمْ [[آيَاتِهِ]] فَأَيَّ [[آيَاتِ]] اللَّهِ تُنْكِرُونَ﴾ (غافر: ٨١)", "He shows you His signs. Which of God's signs do you deny?"],
  ["﴿وَ[[آتَيْنَاهُمْ]] [[آيَاتِنَا]] فَكَانُوا عَنْهَا مُعْرِضِينَ﴾ (الحجر: ٨١)", "We gave them Our signs, but they turned away from them."],
  ["﴿وَ[[آتَيْنَاهُمْ]] مِنَ الْ[[آيَاتِ]] مَا فِيهِ بَلَاءٌ مُبِينٌ﴾ (الدخان: ٣٣)", "We gave them signs in which was a clear trial."],
  ["﴿فَقَدْ [[آتَيْنَا]] [[آلَ]] إِبْرَاهِيمَ الْكِتَابَ وَالْحِكْمَةَ﴾ (النساء: ٥٤)", "We gave the family of Ibrāhīm the Book and wisdom."]] },
 { t: "ornek", ar: "التَّدْريبُ (٣): اسْتَمِعْ، وَأَعِدْ. لاحِظْ كَيْفَ تُنْطَقُ الهَمْزَةُ وَالمَدَّةُ", ogeler: [
  ["([[آ]]لُ عِمْرانَ) مِنْ [[أَ]]طْوَلِ سُوَرِ القُرْ[[آ]]نِ.", "Āl ʿImrān is one of the longest suras of the Qur'an."], ["(النّاسُ) [[آ]]خِرُ سورَةٍ في القُرْ[[آ]]نِ.", "al-Nās is the last sura in the Qur'an."],
  ["اصْطَفى اللهُ [[آ]]دَمَ وَنوحًا وَ[[آ]]لَ [[إِ]]بْراهيمَ وَ[[آ]]لَ عِمْرانَ.", "God chose Adam, Noah, the family of Abraham and the family of ʿImrān."], ["مَنْ [[آ]]مَنَ [[آ]]تاهُ اللهُ ثَوابَ الآخِرَةِ.", "God gives the believer the reward of the Hereafter."],
  ["[[أَ]]نْجى اللهُ [[آ]]لَ لوطٍ [[أَ]]جْمَعينَ [[إِ]]لّا امْرَ[[أَ]]تَهُ.", "God saved the whole family of Lūṭ, except his wife."]] },
 { t: "siniflandir", ar: "أ أَمْ آ؟", soru: "Hamza or madda?", gruplar: ["أ", "آ"], ogeler: [
  ["[[أَ]]كَلَ", 0], ["[[آ]]كُلُ", 1], ["[[آ]]مَنَ", 1], ["[[أَ]]مِنَ", 0], ["[[آ]]لامٌ", 1], ["[[أَ]]لَمٌ", 0], ["[[آ]]دَمُ", 1], ["[[أَ]]خْرى", 0]] }
]},
// ---------------- DERS 16 ----------------
{ no: 16, kisa: "أَدَواتُ الاسْتِفْهامِ", ar: "أَدَواتُ الاسْتِفْهامِ", tr: "Interrogative particles", ozet: "مَنْ، ما، ماذا، لِماذا، كَيْفَ، مَتى، أَيْنَ، كَمْ، أَيُّ، هَلْ، أَ", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "مِنْ أَدَواتِ الاسْتِفْهامِ: مَنْ - ما - ماذا - لِماذا - كَيْفَ - مَتى - أَيْنَ - كَمْ - أَيُّ - هَلْ - أَ", tr: "Some interrogative particles: who, what, what (object), why, how, when, where, how many, which, (hal, a)." },
 { t: "ornek", ogeler: [
  ["[[مَنْ]] هذا؟ هذا أَخي.", "Who is this? This is my brother."], ["[[ما]] هذا؟ هذا كِتابٌ.", "What is this? This is a book."], ["[[ماذا]] حَدَثَ؟ أُغْمِيَ عَلَيَّ.", "What happened? I fainted."], ["[[لِماذا]] أَنْتَ هُنا؟ لِأَدْرُسَ العُلومَ.", "Why are you here? To study natural sciences."],
  ["[[كَيْفَ]] حالُكَ؟ بِخَيْرٍ وَالحَمْدُ لِلّهِ.", "How are you? I am well, praise be to God."], ["[[مَتى]] تُسافِرُ؟ أُسافِرُ غَدًا إِنْ شاءَ اللهُ.", "When will you travel? God willing, tomorrow."], ["[[أَيْنَ]] الكِتابُ؟ الكِتابُ في الحَقيبَةِ.", "Where is the book? The book is in the bag."],
  ["[[كَمْ]] طِفْلًا لَكَ؟ خَمْسَةُ أَطْفالٍ.", "How many children do you have? Five children."], ["[[أَيَّ]] كِتابٍ تُريدُ؟ أُريدُ كِتابَ القَواعِدِ.", "Which book do you want? I want the grammar book."],
  ["[[هَلْ]] تَسْمَعُ الأَذانَ؟ نَعَمْ، أَسْمَعُهُ.", "Do you hear the call to prayer? Yes, I hear it."], ["[[أَ]]تَسْمَعُ الأَذانَ؟ نَعَمْ، أَسْمَعُهُ.", "Do you hear the call to prayer? Yes, I hear it."]] },
 { t: "bosluk", ar: "التَّدْريبُ (١): امْلَأِ الفَراغَ بِالأَداةِ المُناسِبَةِ", ogeler: [
  ["___ غِبْتَ؟", "لِماذا", ["مَنْ", "كَمْ"], "Why did you not come?"], ["___ الَّذي بِيَدِكَ؟", "ما", ["مَتى", "كَيْفَ"], "What is in your hand?"], ["___ سافَرَ مَعَكَ؟", "مَنْ", ["ما", "كَمْ"], "Who travelled with you?"],
  ["___ الحالُ؟", "كَيْفَ", ["أَيْنَ", "هَلْ"], "How is the situation?"], ["___ تُريدُ؟", "ماذا", ["هَلْ", "أَيْنَ"], "What do you want?"], ["___ بَيْتٍ تُريدُ؟", "أَيَّ", ["مَنْ", "ماذا"], "Which house do you want?"],
  ["___ تُسافِرُ إِلى مَكَّةَ؟", "مَتى", ["ما", "مَنْ"], "When will you go to Mecca?"], ["___ هذا كِتابُكَ؟", "هَلْ", ["ماذا", "كَمْ"], "Is this your book?"], ["___ رِيالًا مَعَكَ؟", "كَمْ", ["أَيْنَ", "ماذا"], "How many riyals do you have with you?"],
  ["___ تُصَلّي الجُمُعَةَ؟", "أَيْنَ", ["ما", "مَنْ"], "Where do you pray Friday prayer?"], ["___جاءَ هارونُ؟", "أَ", ["ما", "مَنْ"], "Did Hārūn come?"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): ضَعْ سُؤالًا لِكُلِّ جَوابٍ", aciklama: "Example: هَلْ تَسْمَعُني؟ ← نَعَمْ، أَسْمَعُكَ.", ogeler: [
  ["… ؟ — أَنا بِخَيْرٍ، وَالحَمْدُ لِلّهِ.", "كَيْفَ حالُكَ؟", "I am well, praise be to God."], ["… ؟ — مُحَمَّدٌ في البَيْتِ الآنَ.", "أَيْنَ مُحَمَّدٌ الآنَ؟", "Muhammad is at home now."], ["… ؟ — سَأَصِلُ اليَوْمَ، إِنْ شاءَ اللهُ.", "مَتى تَصِلُ؟", "God willing, I will arrive today."],
  ["… ؟ — نَعَمْ، سَمِعْتُ قِصَّةَ الصَّحابِيِّ.", "هَلْ سَمِعْتَ قِصَّةَ الصَّحابِيِّ؟", "Yes, I heard the story of the Companion."], ["… ؟ — في القُرْآنِ ثَلاثونَ جُزْءًا.", "كَمْ جُزْءًا في القُرْآنِ؟", "The Qur'an has thirty parts."], ["… ؟ — هذا أُسْتاذُ اللُّغَةِ العَرَبِيَّةِ.", "مَنْ هذا؟", "This is the Arabic teacher."]] }
]},
// ---------------- DERS 17 ----------------
{ no: 17, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to Salmān's journey to Syria; talk about holidays and rest.", bloklar: [
 { t: "dinle", s: "l17", ar: "اسْتَمِعْ إِلى الحِوارِ", aciklama: "Listen first, then answer the questions.", metin: [
  ["— السَّلامُ عَلَيْكُمْ، وَالحَمْدُ لِلّهِ عَلى السَّلامَةِ يا سَلْمانُ. — وَعَلَيْكُمُ السَّلامُ، أَهْلًا وَسَهْلًا، تَفَضَّلْ يا أَخي.", "— Peace be upon you; welcome, Salmān. — And upon you peace, welcome, come in, my brother."],
  ["— سَمِعْتُ أَنَّكَ عُدْتَ مِنَ السَّفَرِ، فَحَضَرْتُ لِزِيارَتِكَ. — جَزاكَ اللهُ خَيْرًا.", "— I heard you had returned from the journey, so I came to visit you. — May God reward you with good."],
  ["— كَيْفَ قَضَيْتَ العُطْلَةَ في سورِيا؟ — سورِيا بَلَدٌ جَميلٌ جِدًّا، كانَ الجَوُّ طَيِّبًا، زُرْنا مُدُنًا كَثيرَةً، وَقَضَيْنا أَيّامًا في الرّيفِ.", "— How did you spend the holiday in Syria? — Syria is a very beautiful country; the weather was fine, we toured many cities and spent days in the countryside too."],
  ["— أَراكَ سَعيدًا جِدًّا. — نَعَمْ، أَنا سَعيدٌ جِدًّا؛ فَقَدْ قابَلْتُ إِخْوَةً لي في الإِسْلامِ، وَعَرَفْتُ مُشْكِلاتِهِمْ، وَرَوَّحْتُ عَنْ نَفْسي أَيْضًا؛ وَلِذا عُدْتُ مِنَ السَّفَرِ وَأَنا سَعيدٌ.", "— I see you very happy. — Yes, I am very happy: I met my brothers in religion, learned of their problems, and rested myself; so I returned from the journey happy."],
  ["— وَهَلْ سَتُسافِرُ في السَّنَةِ القادِمَةِ أَيْضًا؟ — نَعَمْ، سَأُسافِرُ إِلى ماليزيا إِنْ شاءَ اللهُ؛ فَهِيَ بَلَدٌ جَميلٌ، وَأَهْلُهُ طَيِّبونَ.", "— Will you travel next year too? — Yes, God willing, I will go to Malaysia; it is a beautiful country and its people are good."],
  ["— سَأُسافِرُ مَعَكَ إِلى ماليزيا إِنْ شاءَ اللهُ. — أَهْلًا وَسَهْلًا.", "— God willing, I will come with you to Malaysia too. — You are welcome (with pleasure)."]],
  not: "The recording is read according to an older edition of the book; the true-false sentences read after the recording differ slightly from those in the book." },
 { t: "dy", ar: "اسْتَمِعْ إِلى النَّصِّ، ثُمَّ ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["قَضى سَلْمانُ العُطْلَةَ كُلَّها في دِمَشْقَ.", false, "زارَ سَلْمانُ مُدُنًا كَثيرَةً، وَقَضى أَيّامًا في الرّيفِ.", "Salmān spent his whole holiday in Damascus."],
  ["سافَرَ سَلْمانُ لِلْعِلاجِ.", false, "سافَرَ سَلْمانُ لِلتَّرْويحِ، وَلِيُقابِلَ إِخْوَتَهُ في الإِسْلامِ.", "Salmān travelled for treatment."],
  ["يَعيشُ أَهْلُ سَلْمانَ في سورِيا.", false, "قابَلَ سَلْمانُ في سورِيا إِخْوَةً لَهُ في الإِسْلامِ.", "Salmān's family lives in Syria."],
  ["قابَلَ سَلْمانُ مُشْكِلاتٍ كَثيرَةً في سورِيا.", false, "عَرَفَ سَلْمانُ مُشْكِلاتِ إِخْوَتِهِ في الإِسْلامِ.", "Salmān met with many problems in Syria."],
  ["سَيُسافِرُ خالِدٌ مَعَ سَلْمانَ العامَ القادِمَ.", true, "", "Khālid will travel with Salmān next year."]] },
 { t: "resim", ar: "تَكَلَّمْ — التَّدْريبُ (١): في أَيِّ بَلَدٍ مِنْ هذِهِ البُلْدانِ تَقْضي العُطْلَةَ؟ وَلِماذا؟", aciklama: "Describe the pictures to your friend; then look at the sample sentence.", resimler: [
  ["ahram", "أَقْضي العُطْلَةَ في مِصْرَ؛ لِأَرى الأَهْراماتِ وَنَهْرَ النّيلِ.", "Egypt: the pyramids"], ["masjid", "أَقْضي العُطْلَةَ في تُرْكِيا؛ لِأَزورَ مَساجِدَ إِسْطَنْبولَ الجَميلَةَ.", "Turkey: the mosques of Istanbul"],
  ["kl", "أَقْضي العُطْلَةَ في ماليزيا؛ فَهِيَ بَلَدٌ جَميلٌ، وَأَهْلُهُ طَيِّبونَ.", "Malaysia: Kuala Lumpur"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): تَبادَلِ الأَسْئِلَةَ وَالأَجْوِبَةَ مَعَ زَميلِكَ", ogeler: [
  ["كَمْ ساعَةً تَدْرُسُ / تَعْمَلُ في اليَوْمِ؟", "أَدْرُسُ سِتَّ ساعاتٍ في اليَوْمِ.", "How many hours a day does he study / do you study?"],
  ["كَمْ يَوْمًا تَدْرُسُ / تَعْمَلُ في الأُسْبوعِ؟", "أَدْرُسُ خَمْسَةَ أَيّامٍ في الأُسْبوعِ.", "How many days a week does he study / do you work?"],
  ["مَتى عُطْلَةُ الأُسْبوعِ؟", "عُطْلَةُ الأُسْبوعِ يَوْمُ السَّبْتِ وَيَوْمُ الأَحَدِ.", "When is the weekend holiday?"],
  ["ماذا تَفْعَلُ في عُطْلَةِ الأُسْبوعِ؟", "أَزورُ أَهْلي، وَأَقْرَأُ، وَأُمارِسُ الرِّياضَةَ.", "What do you do at the weekend?"],
  ["كَيْفَ تُرَوِّحُ عَنْ نَفْسِكَ؟", "أُرَوِّحُ عَنْ نَفْسي بِالقِراءَةِ وَالسِّباحَةِ.", "How do you rest?"]] }
]},
// ---------------- DERS 18 ----------------
{ no: 18, kisa: "أَنْواعُ التَّرْويحِ", ar: "أَنْواعُ التَّرْويحِ", tr: "Kinds of recreation", ozet: "Reading text: the purpose of rest and useful kinds.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["هَلْ تُرَوِّحُ عَنْ نَفْسِكَ أَحْيانًا؟ كَيْفَ؟", "Do you sometimes rest? How?"], ["هَلِ القِراءَةُ نَوْعٌ مِنْ أَنْواعِ التَّرْويحِ؟", "Is reading a kind of rest?"], ["هَلِ التَّرْويحُ مُفيدٌ؟", "Is rest useful?"], ["مَتى يَكونُ التَّرْويحُ غَيْرَ مُفيدٍ؟", "When is rest useless?"]] },
 { t: "metin", resim: ["qiraa", "jary"], paragraf: [
  [["يُمارِسُ النّاسُ بَعْضَ الأَنْشِطَةِ، لِلتَّرْويحِ عَنِ النَّفْسِ.", "People do certain activities in order to rest.", "m18-0"],
   ["وَيَطْلُبُ النّاسُ التَّرْويحَ بَعْدَ عَناءِ العَمَلِ، أَوِ الدِّراسَةِ.", "People want to rest after the tiredness of work or study.", "m18-1"],
   ["فَالعامِلُ الَّذي يَعْمَلُ كَثيرًا، يَحْتاجُ إِلى التَّرْويحِ، وَالطّالِبُ الَّذي يَدْرُسُ كَثيرًا، يَحْتاجُ إِلى التَّرْويحِ.", "The hard-working worker and the student who studies a great deal both need rest.", "m18-2"],
   ["وَالتَّرْويحُ مُفيدٌ لِلْعَقْلِ وَالجِسْمِ.", "Rest is useful for the mind and the body.", "m18-3"],
   ["وَلَيْسَ الهَدَفُ مِنَ التَّرْويحِ قَتْلَ الوَقْتِ، وَإِنَّما الهَدَفُ قَضاءُ الوَقْتِ في أَنْشِطَةٍ مُفيدَةٍ.", "The purpose of rest is not to kill time; the purpose is to spend the time in useful activities.", "m18-4"]],
  [["لِلتَّرْويحِ صُوَرٌ كَثيرَةٌ مِنْها: القِراءَةُ، وَمُمارَسَةُ الرِّياضَةِ، وَالسَّفَرُ،", "Rest has many forms: reading, doing sport, travelling,", "m18-5"],
   ["وَقَضاءُ الوَقْتِ في الحَديقَةِ، أَوْ عَلى الشّاطِئِ، وَأَلْعابُ الحاسوبِ، وَإِقامَةُ المُخَيَّماتِ، وَصَيْدُ السَّمَكِ، وَزِيارَةُ المَتاحِفِ.", "spending time in the garden or on the beach, computer games, camping, fishing and visiting museums.", "m18-6"]],
  [["يُفَضِّلُ كَثيرٌ مِنَ النّاسِ القِراءَةَ، فَفيها فائِدَةٌ وَمُتْعَةٌ؛", "Most people prefer reading; in it there is both benefit and enjoyment:", "m18-7"],
   ["فَالإِنْسانُ يُرَوِّحُ عَنْ نَفْسِهِ بِقِراءَةِ القِصَصِ وَالشِّعْرِ وَالكُتُبِ المُفيدَةِ.", "A person rests by reading stories, poetry and useful books.", "m18-8"],
   ["وَمِنَ التَّرْويحِ المُفيدِ مُمارَسَةُ الرِّياضَةِ؛ لِأَنَّ الإِسْلامَ يَدْعو إِلى القُوَّةِ.", "One of the useful kinds of rest is doing sport; for Islam calls to being strong.", "m18-9"],
   ["قالَ الرَّسولُ ﷺ: «المُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلى اللهِ مِنَ المُؤْمِنِ الضَّعيفِ، وَفي كُلٍّ خَيْرٌ».", "The Messenger of God (peace and blessings be upon him) said: “The strong believer is better and more beloved to God than the weak believer; but in each there is good.”", "m18-10"],
   ["وَكانَ المُسْلِمونَ يُمارِسونَ الرِّياضَةَ. قالَ عُمَرُ بْنُ الخَطّابِ: «عَلِّموا أَوْلادَكُمُ السِّباحَةَ وَالرِّمايَةَ وَرُكوبَ الخَيْلِ».", "Muslims used to do sport. ʿUmar ibn al-Khaṭṭāb said: “Teach your children swimming, archery and horse riding.”", "m18-11"]]] },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["التَّرْويحُ عَنِ النَّفْسِ نَوْعٌ مِنْ أَنْواعِ الرِّياضَةِ.", false, "الرِّياضَةُ نَوْعٌ مِنْ أَنْواعِ التَّرْويحِ عَنِ النَّفْسِ.", "Rest is a kind of sport."],
  ["كُلُّ الطُّلّابِ يَحْتاجونَ إِلى التَّرْويحِ.", false, "الطّالِبُ الَّذي يَدْرُسُ كَثيرًا يَحْتاجُ إِلى التَّرْويحِ.", "All students need rest."],
  ["التَّرْويحُ هُوَ قَتْلُ الوَقْتِ.", false, "الهَدَفُ مِنَ التَّرْويحِ قَضاءُ الوَقْتِ في أَنْشِطَةٍ مُفيدَةٍ.", "Rest is killing time."],
  ["أَلْعابُ الحاسوبِ فيها تَرْويحٌ عَنِ النَّفْسِ.", true, "", "There is rest in computer games."],
  ["في القِراءَةِ فائِدَةٌ لِلْعَقْلِ وَالجِسْمِ.", false, "في القِراءَةِ فائِدَةٌ وَمُتْعَةٌ، وَالتَّرْويحُ مُفيدٌ لِلْعَقْلِ وَالجِسْمِ.", "Reading is useful for the mind and the body."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ", ogeler: [
  ["لِماذا يُمارِسُ النّاسُ بَعْضَ الأَنْشِطَةِ؟", "لِلتَّرْويحِ عَنِ النَّفْسِ.", ["لِقَتْلِ الوَقْتِ.", "لِلْعَمَلِ."], "Why do people do certain activities?"],
  ["مَتى يَطْلُبُ النّاسُ التَّرْويحَ؟", "بَعْدَ عَناءِ العَمَلِ أَوِ الدِّراسَةِ.", ["قَبْلَ العَمَلِ.", "في وَقْتِ الدِّراسَةِ."], "When do people want to rest?"],
  ["ما الهَدَفُ مِنَ التَّرْويحِ؟", "قَضاءُ الوَقْتِ في أَنْشِطَةٍ مُفيدَةٍ.", ["قَتْلُ الوَقْتِ.", "النَّوْمُ."], "What is the purpose of rest?"],
  ["ما صُوَرُ التَّرْويحِ المُفيدِ؟", "القِراءَةُ، وَمُمارَسَةُ الرِّياضَةِ.", ["النَّوْمُ الكَثيرُ.", "الأَكْلُ الكَثيرُ."], "What are the forms of useful rest?"],
  ["مَنِ الشَّخْصُ الَّذي يَحْتاجُ إِلى تَرْويحٍ؟", "العامِلُ وَالطّالِبُ اللَّذانِ يَعْمَلانِ كَثيرًا.", ["الطِّفْلُ الصَّغيرُ.", "المَريضُ فَقَطْ."], "Who needs rest?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — صِلْ بَيْنَ الكَلِمَتَيْنِ اللَّتَيْنِ تَأْتِيانِ مَعًا", aciklama: "Match the words used together; then make a sentence.", ciftler: [
  ["صَيْدُ", "السَّمَكِ", "fishing"], ["قِراءَةُ", "الكُتُبِ", "reading a book"], ["رُكوبُ", "الخَيْلِ", "riding a horse"], ["قَتْلُ", "الوَقْتِ", "killing time"], ["مُمارَسَةُ", "الرِّياضَةِ", "doing sport"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): أَضِفْ كَلِمَتَيْنِ مُناسِبَتَيْنِ إِلى كُلِّ مَجْموعَةٍ", ogeler: [
  ["الدِّراسَةُ: العُلومُ - الطِّبُّ - … - …", "الهَنْدَسَةُ - اللُّغَةُ", "lesson: science – medicine"], ["التَّرْويحُ: السَّفَرُ - القِراءَةُ - … - …", "الرِّياضَةُ - صَيْدُ السَّمَكِ", "rest: travel – reading"],
  ["الوَقْتُ: ساعَةٌ - سَنَةٌ - … - …", "يَوْمٌ - شَهْرٌ", "time: hour – year"], ["الرِّياضَةُ: السِّباحَةُ - الرِّمايَةُ - … - …", "رُكوبُ الخَيْلِ - الجَرْيُ", "sport: swimming – archery"],
  ["العِنايَةُ بِالصِّحَّةِ: حِمْيَةٌ - دَواءٌ - … - …", "رِياضَةٌ - طَبيبٌ", "caring for health: diet – medicine"]] }
]},
// ---------------- DERS 19 ----------------
{ no: 19, kisa: "الفاعِلُ", ar: "الفاعِلُ", tr: "The subject (fāʿil)", ozet: "The nominative noun that does the verb.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الفاعِلُ: هُوَ الاسْمُ المَرْفوعُ الَّذي فَعَلَ الفِعْلَ.", tr: "The subject is the nominative (with ḍamma) noun that does the verb." },
 { t: "ornek", ogeler: [
  ["يُمارِسُ [[النّاسُ]] الرِّياضَةَ.", "People do sport."], ["يَطْلُبُ [[الطُّلّابُ]] التَّرْويحَ.", "Students want rest."], ["قالَ [[الرَّسولُ]] ﷺ: …", "The Messenger of God (peace and blessings be upon him) said: …"], ["صَلّى [[اللهُ]] عَلَيْهِ وَسَلَّمَ.", "May God send blessings and peace upon him."],
  ["يَشْرَبُ [[المَريضُ]] الدَّواءَ.", "The patient is drinking the medicine."], ["رَضِيَ [[اللهُ]] عَنْهُ.", "May God be pleased with him."], ["يُفَضِّلُ [[كَثيرٌ]] مِنَ النّاسِ التَّرْويحَ.", "Most people prefer rest."], ["يَفْحَصُ [[الطَّبيبُ]] المَريضَ.", "The doctor is examining the patient."],
  ["يَطوفُ [[الحاجُّ]] حَوْلَ الكَعْبَةِ.", "The pilgrim is circumambulating the Kaʿba."]] },
 { t: "bosluk", ar: "التَّدْريبُ (١): اخْتَرِ الفاعِلَ المُناسِبَ مِمّا بَيْنَ القَوْسَيْنِ", aciklama: "Example: أَكَلَ عَلِيٌّ الخُبْزَ. The subject has ḍamma (it is nominative).", ogeler: [
  ["يُفَضِّلُ ___ القِراءَةَ.", "مُحَمَّدٌ", ["مُحَمَّدًا", "مُحَمَّدٍ"], "Muhammad prefers reading."], ["شَرِبَتِ ___ الماءَ.", "البِنْتُ", ["البِنْتَ", "البِنْتِ"], "The girl drank the water."],
  ["يَنْصَحُ ___ المَريضَ.", "الطَّبيبُ", ["الطَّبيبِ", "الطَّبيبَ"], "The doctor advises the patient."], ["يَكْتُبُ ___ دَرْسَهُ.", "الطّالِبُ", ["الطّالِبِ", "الطّالِبَ"], "The student is writing his lesson."],
  ["يَقْرَأُ ___ صَحيفَةً.", "المُدَرِّسُ", ["المُدَرِّسَ", "المُدَرِّسِ"], "The teacher is reading a newspaper."], ["يَقْضي ___ العُطْلَةَ في القَرْيَةِ.", "الأَوْلادُ", ["الأَوْلادِ", "الأَوْلادَ"], "The children are spending the holiday in the village."],
  ["يَلْبَسُ ___ مَلابِسَ الإِحْرامِ.", "الحاجُّ", ["الحاجِّ", "الحاجَّ"], "The pilgrim is wearing the pilgrim's garb."], ["يَلْبَسُ ___ ثَوْبَهُ.", "الطِّفْلُ", ["الطِّفْلَ", "الطِّفْلِ"], "The child is putting on his clothes."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): عَيِّنِ الفاعِلَ في كُلِّ جُمْلَةٍ", aciklama: "Example: صَدَقَ الطَّبيبُ، فَحَياتي كُلُّها عَمَلٌ ← الطَّبيبُ.", ogeler: [
  ["يَنامُ بَدْرٌ في غُرْفَةِ النَّوْمِ.", "بَدْرٌ", ["غُرْفَةِ", "النَّوْمِ"]], ["يُرَوِّحُ الإِنْسانُ عَنْ نَفْسِهِ بِالقِراءَةِ.", "الإِنْسانُ", ["نَفْسِهِ", "القِراءَةِ"]], ["يَدْعو الإِسْلامُ إِلى القُوَّةِ.", "الإِسْلامُ", ["القُوَّةِ", "يَدْعو"]],
  ["يَحْتاجُ الطّالِبُ إِلى التَّرْويحِ.", "الطّالِبُ", ["التَّرْويحِ", "يَحْتاجُ"]], ["ذَهَبَ الرَّجُلُ إِلى بَيْتِهِ.", "الرَّجُلُ", ["بَيْتِهِ", "ذَهَبَ"]]] },
 { t: "bosluk", ar: "التَّدْريبُ (٣): امْلَأِ الفَراغَ بِالفاعِلِ المُناسِبِ مِنَ القائِمَةِ", aciklama: "Example: يُصَلّي المُسْلِمُ في المَسْجِدِ.", kutu: ["الحاجُّ", "العامِلُ", "الطَّبيبُ", "المُسْلِمُ", "الطّالِبُ", "المَريضُ"], ogeler: [
  ["فَحَصَ ___ المَريضَ.", "الطَّبيبُ", null, "The doctor examined the patient."], ["يَدْرُسُ ___ العُلومَ.", "الطّالِبُ", null, "The student is studying natural sciences."], ["يَعْمَلُ ___ كَثيرًا.", "العامِلُ", null, "The worker works hard."],
  ["يَتَناوَلُ ___ الدَّواءَ.", "المَريضُ", null, "The patient is taking his medicine."], ["سَعى ___ بَيْنَ الصَّفا وَالمَرْوَةِ.", "الحاجُّ", null, "The pilgrim ran between al-Ṣafā and al-Marwa."]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٤): ضَعْ عَلامَةَ (✓) بِجانِبِ الجُمْلَةِ الَّتي فيها فاعِلٌ، وَعَلامَةَ (✗) بِجانِبِ الجُمْلَةِ الَّتي لَيْسَ فيها فاعِلٌ", soru: "Is there a subject in the sentence?", gruplar: ["✓ فيها فاعِلٌ", "✗ لَيْسَ فيها فاعِلٌ"], ogeler: [
  ["لِلتَّرْويحِ صُوَرٌ كَثيرَةٌ.", 1], ["يُرَوِّحُ مُحَمَّدٌ عَنْ نَفْسِهِ.", 0], ["يُفَضِّلُ النّاسُ التَّرْويحَ.", 0], ["التَّرْويحُ مُفيدٌ لِلْجِسْمِ.", 1],
  ["المُؤْمِنُ القَوِيُّ خَيْرٌ مِنَ المُؤْمِنِ الضَّعيفِ.", 1], ["يَلْعَبُ الطُّلّابُ كُرَةَ القَدَمِ.", 0], ["أَلْعابُ الحاسوبِ فيها تَرْويحٌ.", 1], ["يُسافِرُ أَخي بِالطّائِرَةِ.", 0]] }
]},
// ---------------- DERS 20 ----------------
{ no: 20, kisa: "كَيْفَ نَقْضي العُطْلَةَ؟", ar: "كَيْفَ نَقْضي العُطْلَةَ؟", tr: "How shall we spend the holiday?", ozet: "Dialogue: the family discusses the holiday plan.", bloklar: [
 { t: "diyalog", resim: ["hadiqa", "shati", "kutub"], kisiler: [{ ar: "الأُمُّ", tr: "Mother" }, { ar: "الأَبُ", tr: "Father" }, { ar: "أَحْمَدُ", tr: "Aḥmad" }, { ar: "فاطِمَةُ", tr: "Fāṭima" }, { ar: "طارِقٌ", tr: "Ṭāriq" }, { ar: "نَدى", tr: "Nadā" }, { ar: "بَدْرٌ", tr: "Badr" }], satir: [
  [0, "العُطْلَةُ عَلى الأَبْوابِ، يا أَبا أَحْمَدَ.", "The holiday is at the door, Ahmad's father.", "d20-0"],
  [1, "يا لَها مِنْ مُشْكِلَةٍ كَبيرَةٍ يا أُمَّ أَحْمَدَ!", "What a big problem, Ahmad's mother!", "d20-1"],
  [0, "كَيْفَ سَيَقْضي أَوْلادُنا العُطْلَةَ؟", "How will our children spend the holiday?", "d20-2"],
  [1, "هَيّا نُنادِ الأَوْلادَ، وَنُناقِشْهُمْ في الأَمْرِ.", "Come, let us call the children and discuss the matter with them.", "d20-3"],
  [0, "فِكْرَةٌ طَيِّبَةٌ. سَأُناديهِمُ الآنَ. يا أَحْمَدُ، يا فاطِمَةُ، يا طارِقُ، يا نَدى، يا بَدْرُ. (يَحْضُرُ الأَوْلادُ)", "A good idea. I will call them now. Ahmad! Fāṭima! Ṭāriq! Nadā! Badr! (The children come.)", "d20-4"],
  [1, "كَيْفَ نَقْضي العُطْلَةَ يا أَوْلادُ؟ نُريدُ آراءَكُمْ.", "How shall we spend the holiday, children? We want your ideas.", "d20-5"],
  [2, "أَرى السَّفَرَ إِلى مَصيفٍ جَميلٍ.", "In my opinion, let us go to a nice summer house.", "d20-6"],
  [1, "أَحْسَنْتَ. وَما رَأْيُكِ يا فاطِمَةُ؟", "Well done. What do you think, Fāṭima?", "d20-7"],
  [3, "أَرى عَمَلَ حَديقَةٍ لِلْبَيْتِ.", "In my opinion, let us make a garden at the house.", "d20-8"],
  [0, "يا لَها مِنْ فِكْرَةٍ طَيِّبَةٍ! فَلَيْسَ في بَيْتِنا حَديقَةٌ.", "What a good idea! Our house has no garden.", "d20-9"],
  [4, "أُفَضِّلُ مُشاهَدَةَ بَرامِجِ التِّلْفازِ.", "I prefer to watch television programmes.", "d20-10"],
  [0, "لا مانِعَ مِنْ مُشاهَدَةِ البَرامِجِ المُفيدَةِ فَقَطْ: ساعَةً، أَوْ ساعَتَيْنِ.", "There is no harm in watching only useful programmes: one or two hours.", "d20-11"],
  [1, "وَماذا تَقولُ نَدى؟ وَماذا يَقولُ بَدْرٌ؟", "What does Nadā say? What does Badr say?", "d20-12"],
  [5, "سَأَقْرَأُ كُتُبًا كَثيرَةً في العُطْلَةِ.", "I will read many books on the holiday.", "d20-13"],
  [6, "سَأَلْعَبُ، وَسَأَقْرَأُ، وَسَأَسْبَحُ في البَحْرِ.", "I will play, read and swim in the sea.", "d20-14"],
  [0, "عُطْلَةٌ سَعيدَةٌ، يا أَوْلادُ.", "Have a good holiday, children.", "d20-15"]] },
 { t: "dy", ar: "الاسْتيعابُ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["العُطْلَةُ بَعْدَ أُسْبوعٍ.", false, "العُطْلَةُ عَلى الأَبْوابِ.", "The holiday is in a week."],
  ["بَدْرٌ سَيَسْبَحُ في النَّهْرِ.", false, "بَدْرٌ سَيَسْبَحُ في البَحْرِ.", "Badr will swim in the river."],
  ["نَدى سَتُشاهِدُ التِّلْفازَ.", false, "نَدى سَتَقْرَأُ كُتُبًا كَثيرَةً.", "Nadā will watch television."],
  ["لَدى الأُسْرَةِ حَديقَةٌ جَميلَةٌ.", false, "لَيْسَ في بَيْتِ الأُسْرَةِ حَديقَةٌ.", "The family has a nice garden."],
  ["الأَبُ يُنادي الأَوْلادَ.", false, "الأُمُّ تُنادي الأَوْلادَ.", "The father is calling the children."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ", ogeler: [
  ["ما مُشْكِلَةُ الأُسْرَةِ؟", "كَيْفَ سَيَقْضي الأَوْلادُ العُطْلَةَ.", ["لَيْسَ في البَيْتِ تِلْفازٌ.", "الأَبُ مَريضٌ."], "What is the family's problem?"],
  ["ماذا يُريدُ الأَبُ وَالأُمُّ مِنَ الأَوْلادِ؟", "آراءَهُمْ.", ["أَنْ يَدْرُسوا.", "أَنْ يَناموا."], "What do the mother and father want from the children?"],
  ["مَنْ يُريدُ السَّفَرَ إِلى مَكانٍ جَميلٍ؟", "أَحْمَدُ.", ["طارِقٌ.", "فاطِمَةُ."], "Who wants to go to a nice place?"],
  ["كَمْ ساعَةً سَيُشاهِدُ طارِقٌ البَرامِجَ المُفيدَةَ؟", "ساعَةً أَوْ ساعَتَيْنِ.", ["خَمْسَ ساعاتٍ.", "اليَوْمَ كُلَّهُ."], "How many hours will Ṭāriq watch useful programmes?"],
  ["مَنْ سَيَقْرَأُ كُتُبًا؟", "نَدى وَبَدْرٌ.", ["أَحْمَدُ وَفاطِمَةُ.", "طارِقٌ."], "Who will read books?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", ciftler: [
  ["رَأْيٌ", "آراءٌ", "idea"], ["بَيْتٌ", "بُيوتٌ", "house"], ["أَمْرٌ", "أُمورٌ", "matter, situation"], ["بابٌ", "أَبْوابٌ", "door"], ["وَلَدٌ", "أَوْلادٌ", "child"], ["كِتابٌ", "كُتُبٌ", "book"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): أَكْمِلِ العِباراتِ مِنَ الصُّنْدوقِ", aciklama: "Example: يا لَهُ مِنْ أَمْرٍ عَجيبٍ! Words in the box: طَيِّبَةٍ، قَوْلٍ، لَيْلٍ، جَميلٍ، عَجيبٍ، غُرْفَةٍ، خَطيرَةٍ، مُشْكِلَةٍ، كَبيرَةٍ، طَويلٍ", ogeler: [
  ["يا لَهُ مِنْ …", "يا لَهُ مِنْ قَوْلٍ جَميلٍ!", "What a beautiful saying!"], ["يا لَها مِنْ …", "يا لَها مِنْ غُرْفَةٍ كَبيرَةٍ!", "What a big room!"], ["يا لَهُ مِنْ …", "يا لَهُ مِنْ لَيْلٍ طَويلٍ!", "What a long night!"],
  ["يا لَها مِنْ …", "يا لَها مِنْ مُشْكِلَةٍ خَطيرَةٍ!", "What a serious problem!"], ["يا لَها مِنْ …", "يا لَها مِنْ فِكْرَةٍ طَيِّبَةٍ!", "What a good idea!"]] }
]},
// ---------------- DERS 21 ----------------
{ no: 21, kisa: "حَرْفُ النِّداءِ (يا)", ar: "حَرْفُ النِّداءِ (يا)", tr: "The vocative particle: yā", ozet: "يا comes at the beginning of the called noun (munādā).", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "يا: حَرْفُ نِداءٍ، يَدْخُلُ عَلى الاسْمِ المُنادى.", tr: "Yā is a particle of calling (vocative); it enters the called noun (munādā)." },
 { t: "ornek", ogeler: [
  ["[[يا]] زَيْنَبُ.", "Zaynab!"], ["[[يا]] أَوْلادُ.", "Children!"], ["[[يا]] فاطِمَةُ.", "Fāṭima!"], ["[[يا]] بَدْرُ.", "Badr!"], ["[[يا]] أُمَّ مُحَمَّدٍ.", "Muhammad's mother!"], ["[[يا]] أَبا أَحْمَدَ.", "Ahmad's father!"], ["[[يا]] عَبْدَ اللهِ.", "ʿAbdullāh!"], ["[[يا]] سائِقَ السَّيّارَةِ.", "O car driver!"]] },
 { t: "acik", ar: "التَّدْريبُ (١): أَكْمِلْ كَما في المِثالِ", aciklama: "Example: يا سَعيدُ، كُلْ خُبْزًا.", ogeler: [
  ["… احْضُرْ دَرْسَنا.", "يا أَحْمَدُ، احْضُرْ دَرْسَنا.", "Come to our lesson."], ["… سافِرْ إِلى دِمَشْقَ.", "يا خالِدُ، سافِرْ إِلى دِمَشْقَ.", "Go to Damascus."], ["… اسْكُنْ هُنا.", "يا بُنَيَّ، اسْكُنْ هُنا.", "Sit here."],
  ["… اسْتَيْقِظْ مُبَكِّرًا.", "يا عَلِيُّ، اسْتَيْقِظْ مُبَكِّرًا.", "Get up early."], ["… صَلِّ في المَسْجِدِ.", "يا مُحَمَّدُ، صَلِّ في المَسْجِدِ.", "Pray in the mosque."], ["… قابِلْ طَبيبَكَ.", "يا أَبي، قابِلْ طَبيبَكَ.", "Meet with your doctor."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): اقْرَأِ الآياتِ وَحَدِّدِ المُنادى", aciklama: "Example: ﴿يَا أُخْتَ هَارُونَ﴾ ← vocative particle: يا, munādā: أُخْتَ.", ogeler: [
  ["﴿وَنَادَيْنَاهُ أَنْ يَا إِبْرَاهِيمُ﴾ [الصافات: ١٠٤]", "إِبْرَاهِيمُ", ["نَادَيْنَاهُ", "أَنْ"]], ["﴿قَالُوا يَا أَبَانَا اسْتَغْفِرْ لَنَا ذُنُوبَنَا﴾ [يوسف: ٩٧]", "أَبَانَا", ["ذُنُوبَنَا", "قَالُوا"]],
  ["﴿يَا بُنَيَّ أَقِمِ الصَّلَاةَ﴾ [لقمان: ١٧]", "بُنَيَّ", ["الصَّلَاةَ", "أَقِمِ"]], ["﴿قُلْنَا يَا نَارُ كُونِي بَرْدًا﴾ [الأنبياء: ٦٩]", "نَارُ", ["بَرْدًا", "قُلْنَا"]],
  ["﴿يَا آدَمُ اسْكُنْ أَنْتَ وَزَوْجُكَ الْجَنَّةَ﴾ [البقرة: ٣٥]", "آدَمُ", ["زَوْجُكَ", "الْجَنَّةَ"]]] }
]},
// ---------------- DERS 22 ----------------
{ no: 22, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to a text on forms of recreation; talk about the holiday.", bloklar: [
 { t: "dinle", s: "l22", ar: "اسْتَمِعْ إِلى النَّصِّ", aciklama: "Listen first, then answer the questions.", metin: [
  ["يُرَوِّحُ النّاسُ عَنْ أَنْفُسِهِمْ بِصُوَرٍ كَثيرَةٍ: يُسافِرُ بَعْضُ النّاسِ إِلى الخارِجِ، وَيَزورونَ بِلادًا مُخْتَلِفَةً.", "People rest in many ways: some go abroad and tour different countries."],
  ["وَيُرَوِّحُ بَعْضُ النّاسِ عَنْ أَنْفُسِهِمْ بِمُشاهَدَةِ التِّلْفازِ، أَوِ القِراءَةِ، وَيُفَضِّلُ بَعْضُهُمُ الذَّهابَ إِلى البَرِّ، وَقَضاءَ أَيّامٍ فيهِ.", "Some rest by watching television or reading; some prefer to go to the countryside and spend a few days there."],
  ["وَيُفَضِّلُ بَعْضُهُمْ قَضاءَ الوَقْتِ عَلى شاطِئِ البَحْرِ، يَسْبَحونَ وَيَصْطادونَ السَّمَكَ.", "Some also prefer to spend their time on the seashore; they swim and fish."],
  ["اتَّفَقْتُ أَنا وَأَصْدِقائي أَنْ نُرَوِّحَ عَنْ أَنْفُسِنا بِأُسْلوبٍ يَكونُ فيهِ تَرْويحٌ وَفائِدَةٌ في الوَقْتِ نَفْسِهِ.", "My friends and I decided to rest in a way that is both restful and at the same time useful."],
  ["يَحْتاجُ الحَيُّ الَّذي نَسْكُنُ فيهِ إِلى مَسْجِدٍ. بَدَأْنا العَمَلَ في أَوَّلِ يَوْمٍ مِنْ أَيّامِ العُطْلَةِ، كُنّا نَعْمَلُ مِنَ الصَّباحِ إِلى المَساءِ، قَضَيْنا ثَلاثَةَ أَشْهُرٍ في العَمَلِ.", "The neighbourhood where we live needs a mosque. We started work on the first day of the holiday; we worked from morning till evening; we spent three months working."],
  ["الحَمْدُ لِلّهِ، الآنَ لَدَيْنا مَسْجِدٌ جَميلٌ، يُصَلّي فيهِ أَهْلُ الحَيِّ.", "Praise be to God, now we have a beautiful mosque in which the people of the neighbourhood pray."]] },
 { t: "secim", ar: "اسْتَمِعْ إِلى النَّصِّ، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["مِنْ صُوَرِ التَّرْويحِ عَنِ النَّفْسِ …", "السَّفَرُ إِلى الخارِجِ", ["العَمَلُ في العُطْلَةِ", "الذَّهابُ إِلى المَدْرَسَةِ"], "One of the forms of rest is …"],
  ["إِذا سافَرَ النّاسُ إِلى الخارِجِ …", "يَرَوْنَ بِلادًا جَديدَةً", ["يَزورونَ المَتاحِفَ", "يَصْطادونَ"], "When people go abroad …"],
  ["مَنْ يَذْهَبُ إِلى شاطِئِ البَحْرِ …", "يَسْبَحُ وَيَصْطادُ", ["يَقْضي أَيّامًا هُناكَ", "يَأْكُلُ السَّمَكَ"], "The one who goes to the seashore …"],
  ["إِلى ماذا يَحْتاجُ الحَيُّ؟", "إِلى مَسْجِدٍ", ["إِلى مَدْرَسَةٍ", "إِلى مُسْتَشْفى"], "What does the neighbourhood need?"],
  ["أَيْنَ قَضى الأَصْدِقاءُ العُطْلَةَ؟", "في الحَيِّ", ["في الخارِجِ", "في المَسْجِدِ"], "Where did the friends spend the holiday?", "They stayed in the neighbourhood and built a mosque."]] },
 { t: "resim", ar: "تَكَلَّمْ — التَّدْريبُ (١): كَيْفَ يَقْضي كُلُّ واحِدٍ العُطْلَةَ؟", aciklama: "Describe the pictures to your friend.", resimler: [
  ["tilfaz", "يَقْضي هذا الرَّجُلُ العُطْلَةَ في مُشاهَدَةِ التِّلْفازِ.", "Television"], ["qari", "يَقْضي هذا الرَّجُلُ العُطْلَةَ في قِراءَةِ الكُتُبِ.", "Reading"], ["sibaha", "يَقْضي هذا الشّابُّ العُطْلَةَ في السِّباحَةِ في البَحْرِ.", "Swimming"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): كَيْفَ يَقْضي صَديقُكَ العُطْلَةَ؟ أَجْرِ حِوارًا مَعَ صَديقِكَ", aciklama: "Ask your friend; sample dialogue:", ogeler: [
  ["أَيْنَ تَقْضي العُطْلَةَ؟", "أَقْضي العُطْلَةَ في القَرْيَةِ مَعَ أُسْرَتي.", "Where do you spend the holiday?"], ["ماذا تَفْعَلُ في العُطْلَةِ؟", "أَقْرَأُ الكُتُبَ، وَأَسْبَحُ في النَّهْرِ.", "What do you do on the holiday?"],
  ["هَلْ تُسافِرُ إِلى الخارِجِ؟", "نَعَمْ، أُسافِرُ إِلى مِصْرَ إِنْ شاءَ اللهُ.", "Do you go abroad?"], ["مَعَ مَنْ تُسافِرُ؟", "أُسافِرُ مَعَ أَبي وَأَخي.", "With whom do you go?"]] }
]},
// ---------------- DERS 23 ----------------
{ no: 23, kisa: "التَّخْييمُ", ar: "التَّخْييمُ", tr: "Camping", ozet: "Reading text: people set up camp on holiday.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["أَيْنَ يَقْضي النّاسُ وَقْتَ التَّرْويحِ؟", "Where do people spend their rest time?"], ["أَيْنَ تُفَضِّلُ التَّرْويحَ؟ في البَيْتِ، أَمْ خارِجَ البَيْتِ؟", "Where do you prefer to rest: at home or outdoors?"],
  ["أَيْنَ تُعِدُّ الطَّعامَ؟ في بَيْتِكَ أَمْ في المُخَيَّمِ؟", "Where do you prepare the food: at home or in the camp?"], ["ما أَفْضَلُ هِوايَةٍ تُمارِسُها عَلى شاطِئِ البَحْرِ؟", "What is your favourite hobby by the seashore?"]] },
 { t: "metin", resim: "khayma", paragraf: [
  [["يُفَضِّلُ كَثيرٌ مِنَ النّاسِ التَّرْويحَ خارِجَ البُيوتِ، حَيْثُ يَقْضونَ الوَقْتَ في مُخَيَّماتٍ.", "Most people prefer to rest outside their homes; they spend their time in camps.", "m23-0"],
   ["وَيَخْتَلِفُ الوَقْتُ الَّذي يَقْضيهِ النّاسُ في المُخَيَّماتِ، فَقَدْ يَكونُ لَيْلَةً واحِدَةً، وَقَدْ يَكونُ عِدَّةَ أَسابيعَ.", "The time people spend in camps differs: it may be one night, or a few weeks.", "m23-1"],
   ["وَيَخْتَلِفُ المَكانُ، فَقَدْ يَكونُ عَلى شاطِئِ البَحْرِ، أَوْ في البَرِّ، أَوْ في الغابَةِ، أَوْ في الصَّحْراءِ، أَوْ بَيْنَ الجِبالِ، حَيْثُ الهَواءُ النَّقِيُّ.", "The place also differs: it may be on the seashore, in the countryside, in the forest, in the desert, or among the mountains where the air is clean.", "m23-2"]],
  [["يَخْرُجُ النّاسُ أَيّامَ العُطْلَةِ إِلى البَرِّ، وَيَنْصِبونَ في مَكانِ التَّرْويحِ الخِيامَ، وَيَحْمِلونَ مَعَهُمُ الطَّعامَ وَالشَّرابَ، وَوَسائِلَ التَّرْويحِ.", "On holidays people go out to the countryside and pitch tents at the place where they will rest; they take with them food, drink and means of entertainment.", "m23-3"],
   ["وَيُفَضِّلُ فَريقٌ مِنَ النّاسِ أَنْ يَكونَ قَريبًا مِنْ شاطِئِ البَحْرِ، حَيْثُ يُمارِسونَ السِّباحَةَ، وَأَنْواعَ الرِّياضَةِ الأُخْرى، وَيَصْطادونَ السَّمَكَ.", "Some people prefer to be near the seashore; there they swim, do other sports and fish.", "m23-4"],
   ["وَيُفَضِّلُ بَعْضُ النّاسِ مُشاهَدَةَ الطُّيورِ، أَوِ التَّصْويرَ، أَوِ المَشْيَ.", "Some prefer watching birds, taking photographs or walking.", "m23-5"]],
  [["يَحْمِلُ النّاسُ مَعَهُمْ إِلى البَرِّ خِيامًا، وَمَلابِسَ، وَكَثيرًا مِنَ الطَّعامِ.", "People take tents, clothes and plenty of food with them to the countryside.", "m23-6"],
   ["وَبَعْضُ النّاسِ يُعِدّونَ الطَّعامَ في بُيوتِهِمْ، وَيَضَعونَهُ في أَوانٍ. وَهُناكَ مَنْ يُفَضِّلُ إِعْدادَ الطَّعامِ في المُخَيَّماتِ.", "Some prepare the food at home and put it in containers; there are also those who prefer to prepare the food at the camp.", "m23-7"],
   ["وَيَحْمِلُ النّاسُ مَعَهُمُ الماءَ، إِذا لَمْ يَكُنْ في المَكانِ ماءٌ.", "If there is no water at the place they go to, people take water with them too.", "m23-8"]]] },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["يُفَضِّلُ كَثيرٌ مِنَ النّاسِ التَّرْويحَ خارِجَ البَيْتِ.", true, "", "Most people prefer to rest outdoors."],
  ["يَذْهَبُ النّاسُ إِلى الصَّحْراءِ، حَيْثُ يَنْصِبونَ الخِيامَ.", false, "يَخْرُجُ النّاسُ إِلى البَرِّ، وَيَنْصِبونَ الخِيامَ.", "People go to the desert and pitch tents there."],
  ["يَنْصِبُ النّاسُ الخِيامَ عَلى النَّهْرِ، وَيَصْطادونَ السَّمَكَ.", false, "يُفَضِّلُ فَريقٌ مِنَ النّاسِ أَنْ يَكونَ قَريبًا مِنْ شاطِئِ البَحْرِ، وَيَصْطادونَ السَّمَكَ.", "People pitch the tent beside the river and fish."],
  ["يُفَضِّلُ بَعْضُ النّاسِ المَشْيَ، أَوِ التَّصْويرَ.", true, "", "Some prefer walking or taking photographs."],
  ["يَحْمِلُ بَعْضُ النّاسِ إِلى البَرِّ خِيامًا وَبَعْضَ وَسائِلِ التَّرْويحِ.", true, "", "Some take a tent and some means of entertainment to the countryside."],
  ["يُعِدُّ بَعْضُ النّاسِ الطَّعامَ في البَيْتِ، وَيُحْضِرونَهُ مَعَهُمْ.", true, "", "Some prepare the food at home and bring it with them."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): اخْتَرِ الفِكْرَةَ الرَّئيسَةَ في كُلِّ فِقْرَةٍ", ogeler: [
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الأولى:", "التَّرْويحُ عَنِ النَّفْسِ خارِجَ البَيْتِ.", ["التَّرْويحُ عَنِ النَّفْسِ عَلى شاطِئِ البَحْرِ.", "التَّرْويحُ عَنِ النَّفْسِ بَيْنَ الجِبالِ وَفي الصَّحْراءِ."], "The main idea of the first paragraph"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّانِيَةِ:", "يَخْرُجُ النّاسُ إِلى البَحْرِ وَالبَرِّ.", ["يَصْطادُ النّاسُ السَّمَكَ.", "يُمارِسُ النّاسُ السِّباحَةَ."], "The main idea of the second paragraph"],
  ["الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّالِثَةِ:", "يَحْمِلُ النّاسُ مَعَهُمُ الطَّعامَ.", ["يَضَعُ النّاسُ الطَّعامَ في أَوانٍ.", "يُعِدُّ النّاسُ الطَّعامَ في بُيوتِهِمْ، أَوْ في المُخَيَّماتِ."], "The main idea of the third paragraph"]] },
 { t: "esle", ar: "مُفْرَداتٌ — صِلْ بَيْنَ الكَلِمَتَيْنِ اللَّتَيْنِ تَأْتِيانِ مَعًا", ciftler: [
  ["هَواءٌ", "نَقِيٌّ", "clean air"], ["شاطِئُ", "البَحْرِ", "seashore"], ["كُرَةُ", "القَدَمِ", "football"], ["بَرامِجُ", "التِّلْفازِ", "television programmes"], ["مُشاهَدَةُ", "الطُّيورِ", "watching birds"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): اسْتَعْمِلِ الكَلِماتِ الآتِيَةَ في جُمَلٍ مِنْ إِنْشائِكَ", ogeler: [
  ["يُفَضِّلُ", "يُفَضِّلُ أَخي السِّباحَةَ في البَحْرِ.", "he prefers"], ["يَقْضي", "يَقْضي الطّالِبُ العُطْلَةَ في القَرْيَةِ.", "he spends"], ["يَحْمِلُ", "يَحْمِلُ الرَّجُلُ الخَيْمَةَ إِلى البَرِّ.", "he carries, takes"],
  ["يُعِدُّ", "تُعِدُّ الأُمُّ الطَّعامَ في البَيْتِ.", "he prepares"], ["يَضَعُ", "يَضَعُ الطِّفْلُ الكِتابَ في الحَقيبَةِ.", "he puts"]] }
]},
// ---------------- DERS 24 ----------------
{ no: 24, kisa: "لا النّاهِيَةُ", ar: "لا النّاهِيَةُ", tr: "The prohibitive lā", ozet: "لا تَفْعَلْ: prohibition; the verb becomes jussive.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "لا: مِنْ أَدَواتِ النَّهْيِ.", tr: "Lā is one of the particles of prohibition; the end of the verb is jussive: لا تَأْكُلْ.", not: "Compare with لا النّافِيَةُ in lesson 6: لا تَأْكُلُ (you do not eat) — لا تَأْكُلْ (do not eat!)." },
 { t: "ornek", ogeler: [
  ["لا [[تَبْتَعِدْ]] عَنِ البَيْتِ.", "Do not go away from the house."], ["لا [[تَضَعْ]] كَثيرًا مِنَ المِلْحِ في الطَّعامِ.", "Do not put much salt in the food."], ["لا [[تَأْكُلْ]] خُبْزًا أَبْيَضَ.", "Do not eat white bread."], ["لا [[تَأْكُلْ]] أَرُزًّا أَبْيَضَ.", "Do not eat white rice."],
  ["لا [[تَشْرَبْ]] حَليبًا كامِلَ الدَّسَمِ.", "Do not drink full-fat milk."], ["لا [[تُمارِسْ]] رِياضَةً بَعْدَ الأَكْلِ.", "Do not do sport after eating."], ["لا [[تَتَناوَلْ]] دَواءً الآنَ.", "Do not take medicine now."]] },
 { t: "secim", ar: "التَّدْريبُ (١): حَوِّلْ كَما في المِثالِ", aciklama: "Example: كُلْ خُبْزًا أَسْمَرَ ← لا تَأْكُلْ خُبْزًا أَبْيَضَ.", ogeler: [
  ["اشْرَبْ قَهْوَةً.", "لا تَشْرَبْ قَهْوَةً.", ["لا تَشْرَبُ قَهْوَةً.", "لا اشْرَبْ قَهْوَةً."]], ["مارِسْ سِباحَةً.", "لا تُمارِسْ سِباحَةً.", ["لا مارِسْ سِباحَةً.", "لا تُمارِسُ سِباحَةً."]],
  ["ابْتَعِدْ عَنِ السُّكَّرِ.", "لا تَبْتَعِدْ عَنِ السُّكَّرِ.", ["لا ابْتَعِدْ عَنِ السُّكَّرِ.", "لا تَبْتَعِدُ عَنِ السُّكَّرِ."]], ["تَناوَلْ طَعامًا كَثيرًا.", "لا تَتَناوَلْ طَعامًا كَثيرًا.", ["لا تَناوَلْ طَعامًا كَثيرًا.", "لا تَتَناوَلُ طَعامًا كَثيرًا."]],
  ["ضَعْ مِلْحًا في الطَّعامِ.", "لا تَضَعْ مِلْحًا في الطَّعامِ.", ["لا ضَعْ مِلْحًا في الطَّعامِ.", "لا تَضَعُ مِلْحًا في الطَّعامِ."]], ["كُلْ هذا الطَّعامَ.", "لا تَأْكُلْ هذا الطَّعامَ.", ["لا كُلْ هذا الطَّعامَ.", "لا تَأْكُلُ هذا الطَّعامَ."]],
  ["سافِرْ إِلى القَرْيَةِ.", "لا تُسافِرْ إِلى القَرْيَةِ.", ["لا سافِرْ إِلى القَرْيَةِ.", "لا تُسافِرُ إِلى القَرْيَةِ."]], ["قابِلْ طَبيبَكَ غَدًا.", "لا تُقابِلْ طَبيبَكَ غَدًا.", ["لا قابِلْ طَبيبَكَ غَدًا.", "لا تُقابِلُ طَبيبَكَ غَدًا."]],
  ["خُذْ هذِهِ العُلْبَةَ.", "لا تَأْخُذْ هذِهِ العُلْبَةَ.", ["لا خُذْ هذِهِ العُلْبَةَ.", "لا تَأْخُذُ هذِهِ العُلْبَةَ."]], ["اقْرَأْ هذا الكِتابَ.", "لا تَقْرَأْ هذا الكِتابَ.", ["لا اقْرَأْ هذا الكِتابَ.", "لا تَقْرَأُ هذا الكِتابَ."]],
  ["افْتَحْ بابَ الغُرْفَةِ.", "لا تَفْتَحْ بابَ الغُرْفَةِ.", ["لا افْتَحْ بابَ الغُرْفَةِ.", "لا تَفْتَحُ بابَ الغُرْفَةِ."]]] },
 { t: "acik", ar: "التَّدْريبُ (٢): أَجِبْ مُسْتَخْدِمًا (لا النّاهِيَةَ)", aciklama: "Example: هَلْ آكُلُ خُبْزًا أَبْيَضَ؟ ← لا، لا تَأْكُلْ خُبْزًا أَبْيَضَ.", ogeler: [
  ["هَلْ أَبْتَعِدُ عَنِ اللُّحومِ؟", "لا، لا تَبْتَعِدْ عَنِ اللُّحومِ.", "Shall I keep away from meats?"], ["هَلْ أَشْرَبُ هذا العَصيرَ؟", "لا، لا تَشْرَبْ هذا العَصيرَ.", "Shall I drink this juice?"], ["هَلْ أَخْرُجُ مِنْ هُنا؟", "لا، لا تَخْرُجْ مِنْ هُنا.", "Shall I go out of here?"],
  ["هَلْ أَحْمِلُ حَقيبَةً كَبيرَةً؟", "لا، لا تَحْمِلْ حَقيبَةً كَبيرَةً.", "Shall I carry a big bag?"], ["هَلْ أَسْبَحُ في البَحْرِ هذا الصَّباحَ؟", "لا، لا تَسْبَحْ في البَحْرِ هذا الصَّباحَ.", "Shall I swim in the sea this morning?"],
  ["هَلْ أُغَيِّرُ مَلابِسي؟", "لا، لا تُغَيِّرْ مَلابِسَكَ.", "Shall I change my clothes?"], ["هَلْ أَقْتُلُ وَقْتي؟", "لا، لا تَقْتُلْ وَقْتَكَ.", "Shall I kill my time?"], ["هَلْ أَلْعَبُ في وَقْتِ الدَّرْسِ؟", "لا، لا تَلْعَبْ في وَقْتِ الدَّرْسِ.", "Shall I play during lesson time?"],
  ["هَلْ أُناقِشُ هذا الأَمْرَ؟", "لا، لا تُناقِشْ هذا الأَمْرَ.", "Shall I discuss this subject?"], ["هَلْ أُرَوِّحُ عَنْ نَفْسي هُنا؟", "لا، لا تُرَوِّحْ عَنْ نَفْسِكَ هُنا.", "Shall I rest here?"]] },
 { t: "acik", ar: "التَّدْريبُ (٣): أَكْمِلِ الجُمَلَ مُسْتَخْدِمًا (لا النّاهِيَةَ)", aciklama: "Example: لا تَأْكُلْ خُبْزًا أَبْيَضَ، كُلْ خُبْزًا أَسْمَرَ.", ogeler: [
  ["… ، مارِسْ رِياضَةَ المَشْيِ بَعْدَ الأَكْلِ.", "لا تَنَمْ بَعْدَ الأَكْلِ، مارِسْ رِياضَةَ المَشْيِ بَعْدَ الأَكْلِ.", "Take a walk after eating."], ["… ، تَناوَلْ أَرُزًّا أَسْمَرَ.", "لا تَتَناوَلْ أَرُزًّا أَبْيَضَ، تَناوَلْ أَرُزًّا أَسْمَرَ.", "Eat brown rice."],
  ["… ، اشْرَبْ شايًا أَخْضَرَ.", "لا تَشْرَبْ شايًا أَحْمَرَ، اشْرَبْ شايًا أَخْضَرَ.", "Drink green tea."], ["… ، كُلْ قَليلًا مِنَ اللَّحْمِ.", "لا تَأْكُلْ كَثيرًا مِنَ اللَّحْمِ، كُلْ قَليلًا مِنَ اللَّحْمِ.", "Eat little meat."],
  ["… ، سافِرْ إِلى القَرْيَةِ.", "لا تُسافِرْ إِلى المَدينَةِ، سافِرْ إِلى القَرْيَةِ.", "Go to the village."], ["… ، اسْبَحْ في النَّهْرِ.", "لا تَسْبَحْ في البَحْرِ، اسْبَحْ في النَّهْرِ.", "Swim in the river."]] }
]},
// ---------------- DERS 25 ----------------
{ no: 25, kisa: "تَعْبيرٌ مُوَجَّهٌ", ar: "تَعْبيرٌ مُوَجَّهٌ", tr: "Guided expression", ozet: "Describe places, make sentences, write a composition; punctuation (b).", bloklar: [
 { t: "resim", ar: "التَّدْريبُ (١): ما المَكانُ الَّذي تَذْهَبُ إِلَيْهِ مِنْ هذِهِ الأَماكِنِ؟ صِفْ كُلَّ مَكانٍ في ثَلاثِ جُمَلٍ", resimler: [
  ["ghaba", "هذِهِ غابَةٌ جَميلَةٌ، فيها أَشْجارٌ كَثيرَةٌ، وَالهَواءُ فيها نَقِيٌّ.", "Forest"], ["sahra", "هذِهِ صَحْراءُ واسِعَةٌ، الجَوُّ فيها حارٌّ في النَّهارِ، وَبارِدٌ في اللَّيْلِ.", "Desert"],
  ["bahr", "هذا شاطِئُ البَحْرِ، يَسْبَحُ فيهِ النّاسُ، وَيَصْطادونَ السَّمَكَ.", "Seashore"]] },
 { t: "sirala", ar: "التَّدْريبُ (٢): رَتِّبِ الكَلِماتِ؛ لِتُصْبِحَ جُمَلًا", aciklama: "التِّلْفازِ - الأَطْفالُ - مُشاهَدَةَ - لا - يُفَضِّلُ", ogeler: ["لا", "يُفَضِّلُ", "الأَطْفالُ", "مُشاهَدَةَ", "التِّلْفازِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "إِلى - العامِلُ - التَّرْويحِ - يَحْتاجُ", ogeler: ["يَحْتاجُ", "العامِلُ", "إِلى", "التَّرْويحِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "مِنَ - المُفيدِ - في - النّاسِ - مُساعَدَةُ - العَمَلِ", ogeler: ["مِنَ", "المُفيدِ", "مُساعَدَةُ", "النّاسِ", "في", "العَمَلِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "جَميلَةٍ - مَدينَةٍ - الذَّهابَ - أَرى - إِلى", ogeler: ["أَرى", "الذَّهابَ", "إِلى", "مَدينَةٍ", "جَميلَةٍ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "مِنَ - البَرامِجِ - لا - مُشاهَدَةِ - المُفيدَةِ - مانِعَ", ogeler: ["لا", "مانِعَ", "مِنْ", "مُشاهَدَةِ", "البَرامِجِ", "المُفيدَةِ"] },
 { t: "acik", ar: "التَّدْريبُ (٣): اكْتُبْ مَوْضوعًا مُسْتَعينًا بِالنُّصوصِ الوارِدَةِ في هذِهِ الوَحْدَةِ، عُنْوانُهُ: التَّرْويحُ عَنِ النَّفْسِ", aciklama: "First write it yourself; then look at the sample text.", ogeler: [
  ["التَّرْويحُ عَنِ النَّفْسِ", "يَحْتاجُ الإِنْسانُ إِلى التَّرْويحِ عَنِ النَّفْسِ بَعْدَ عَناءِ العَمَلِ أَوِ الدِّراسَةِ. وَلِلتَّرْويحِ صُوَرٌ كَثيرَةٌ: القِراءَةُ، وَمُمارَسَةُ الرِّياضَةِ، وَالسَّفَرُ، وَإِقامَةُ المُخَيَّماتِ. وَلَيْسَ الهَدَفُ مِنَ التَّرْويحِ قَتْلَ الوَقْتِ، وَإِنَّما قَضاءُ الوَقْتِ في أَنْشِطَةٍ مُفيدَةٍ.", "Topic: Rest", "A person needs rest after the tiredness of work or study. Rest has many forms: reading, sport, travel, camping. The purpose is not to kill time but to spend it in useful things."]] },
 { t: "tablo", ar: "التَّدْريبُ (٤): عَلاماتُ التَّرْقيمِ (ب)", baslik: "Punctuation marks", tts: false, bas: ["الفاصِلَةُ المَنْقوطَةُ (semicolon)", "النُّقْطَتانِ (colon)", "عَلامَةُ التَّنْصيصِ (quotation mark)", "الشَّرْطَتانِ (two dashes)"], satir: [["؛", ":", "« »", "– –"]] },
 { t: "secim", ar: "ضَعْ عَلامَةَ التَّرْقيمِ المُناسِبَةَ", ogeler: [
  ["قالَ عُمَرُ بْنُ الخَطّابِ – رَضِيَ اللهُ عَنْهُ – ___ «عَلِّموا أَوْلادَكُمُ السِّباحَةَ».", ":", ["؛", "؟"], "A parenthetical remark between two dashes; a colon before reported speech, the speech in quotation marks."],
  ["يُمارِسُ النّاسُ بَعْضَ الأَنْشِطَةِ ___ لِلتَّرْويحِ عَنِ النَّفْسِ.", "؛", [":", "!"], "A semicolon before the clause giving the reason."],
  ["قالَ تَعالى ___ ﴿فيهِ شِفاءٌ لِلنّاسِ﴾.", ":", ["؛", "؟"], "A colon before speech."],
  ["ذَهَبْتُ إِلى مَكَّةَ ___ لِأُصَلِّيَ في المَسْجِدِ الحَرامِ.", "؛", ["!", "؟"], "A semicolon before the clause giving the reason."]] }
]},
// ---------------- DERS 26 ----------------
{ no: 26, kisa: "الخَطُّ وَالإِمْلاءُ", ar: "الخَطُّ وَالإِمْلاءُ", tr: "Calligraphy and spelling", ozet: "Naskh; tāʾ marbūṭa (ة) and the pronoun hāʾ (ه).", bloklar: [
 { t: "hat", ar: "الخَطُّ — اكْتُبْ بِخَطِّ النَّسْخِ", aciklama: "Write the sentence in your notebook in naskh script.", ogeler: [["﴿إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ﴾ (The believers are but brothers; so make peace between your brothers.)", "إنما المؤمنون إخوة فأصلحوا بين أخويكم"]] },
 { t: "kural", ar: "الإِمْلاءُ: التّاءُ المَرْبوطَةُ", metin: "التّاءُ المَرْبوطَةُ (ـة / ة) تُشْبِهُ هاءَ الضَّميرِ (ـه / ه)، وَكِلْتاهُما تُنْطَقُ هاءً في الوَقْفِ.", tr: "Tāʾ marbūṭa (ة) resembles the pronoun hāʾ (ه); both are read “h” at a pause. The difference: ة has two dots above it; when the word continues it is read “t”." },
 { t: "tablo", bas: ["ـهُ", "هُ", "ـةٌ", "ةٌ"], satir: [["لَهُ", "أَبوهُ", "ثانِيَةٌ", "حَماةٌ"], ["فيهِ", "أَخاهُ", "خَوْلَةُ", "دَعْوَةٌ"], ["بِنْتُهُ", "سِرُّهُ", "لَطيفَةٌ", "عِدَّةٌ"], ["كُتُبُهُ", "مَدُّهُ", "قَرْيَةٌ", "نُبْذَةٌ"], ["بِهِ", "رَدُّهُ", "قَوِيَّةٌ", "مَرَّةٌ"], ["عَنْهُ", "بَنوهُ", "فاطِمَةُ", "فائِدَةٌ"], ["مَعَهُ", "عِنْدَهُ", "حَديقَةٌ", "مُساعَدَةٌ"]] },
 { t: "siniflandir", ar: "تَدْريبٌ: اكْتُبِ الكَلِمَةَ في المَكانِ المُناسِبِ", aciklama: "Is the end of the word the pronoun hāʾ (ـه / ه) or tāʾ marbūṭa (ـة / ة)?", soru: "ه or ة?", gruplar: ["ـهُ / هُ", "ـةٌ / ةٌ"], ogeler: [
  ["لَهُ", 0], ["حَديقَةٌ", 1], ["أَبوهُ", 0], ["مَدْرَسَةٌ", 1], ["كِتابُهُ", 0], ["فاطِمَةُ", 1], ["بَيْتُهُ", 0], ["قَرْيَةٌ", 1], ["عِنْدَهُ", 0], ["مُساعَدَةٌ", 1]] }
]}
];
var KELIME = [
 ["سَلامَةٌ", "well-being, health", 14], ["أُغْمِيَ عَلَيْهِ", "he fainted", 14], ["أَفاقَ", "he came to", 14], ["شَرِكَةٌ", "company", 14], ["مُسْتَشْفى", "hospital", 14], ["وَجَدَ", "he found", 14], ["فَحَصَ", "examined", 14], ["رَأْيٌ ج آراءٌ", "idea", 14],
 ["مُشْكِلَةٌ", "problem", 14], ["عَجيبٌ", "strange, astonishing", 14], ["غَيَّرَ", "he changed", 14], ["أُسْلوبُ الحَياةِ", "lifestyle", 14], ["قَصَدَ", "he meant", 14], ["تَرْويحٌ", "rest, recreation", 14], ["نَصَحَ", "he advised", 14], ["نَصيحَةٌ", "advice", 14], ["بَلَدٌ", "country, homeland", 14],
 ["عُطْلَةٌ", "holiday", 14], ["قَضى", "he spent", 14], ["رِيفٌ", "countryside, rural", 17], ["إِخْوَةٌ", "brothers", 17], ["عادَ", "returned", 17],
 ["نَشاطٌ ج أَنْشِطَةٌ", "activity", 18], ["عَناءٌ", "tiredness", 18], ["عامِلٌ", "worker", 18], ["مُفيدٌ", "useful", 18], ["عَقْلٌ", "reason, mind", 18], ["جِسْمٌ", "body", 18], ["هَدَفٌ", "aim", 18], ["قَتْلُ الوَقْتِ", "killing time", 18],
 ["شاطِئٌ", "shore, coast", 18], ["حاسوبٌ", "computer", 18], ["صَيْدٌ", "hunting", 18], ["مُتْعَةٌ", "pleasure", 18], ["قِصَّةٌ ج قِصَصٌ", "story", 18], ["شِعْرٌ", "poetry", 18], ["قُوَّةٌ", "strength", 18], ["سِباحَةٌ", "swimming", 18], ["رِمايَةٌ", "archery", 18], ["رُكوبُ الخَيْلِ", "horse riding", 18],
 ["عَلى الأَبْوابِ", "at the door (very near)", 20], ["نادى", "he called", 20], ["ناقَشَ", "he discussed, talked", 20], ["مَصيفٌ", "summer house", 20], ["حَديقَةٌ", "garden", 20], ["بَرامِجُ", "programmes", 20], ["تِلْفازٌ", "television", 20], ["لا مانِعَ", "there is no harm", 20], ["سَبَحَ", "he swam", 20],
 ["مُخَيَّمٌ", "camp", 23], ["خَيْمَةٌ ج خِيامٌ", "tent", 23], ["نَصَبَ", "he pitched (a tent)", 23], ["بَرٌّ", "land, countryside", 23], ["غابَةٌ", "forest", 23], ["صَحْراءُ", "desert", 23], ["نَقِيٌّ", "clean, pure", 23], ["اصْطادَ", "he hunted", 23], ["طُيورٌ", "birds", 23],
 ["تَصْويرٌ", "taking photographs", 23], ["أَعَدَّ", "he prepared", 23], ["آنِيَةٌ ج أَوانٍ", "container", 23]
];
