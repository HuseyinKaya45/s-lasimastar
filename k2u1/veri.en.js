// ================= VERİ: el-Arabiyyetü beyne yedeyk 2, 1. ünite — العِنايَةُ بِالصِّحَّةِ =================
// Bloklar k2ortak/uygulama.js içinde çizilir. Asıl kayıt parçaları: zaman.js (ZAMAN); kaydı olmayan metinler gömülü okunuşla çalar.
var UNITE = { no: 1, ar: "العِنايَةُ بِالصِّحَّةِ", tr: "Caring for Health", pfx: "k2u1:",
  giris: "The first unit of the second book: illness and healing, weight and nutrition, at the doctor, health in the past and today. Go lesson by lesson: listen to the dialogue and the text, solve the exercises; your progress is saved in each lesson." };
var DERSLER = [
// ---------------- DERS 1 ----------------
{ no: 1, kisa: "في العَسَلِ شِفاءٌ", ar: "في العَسَلِ شِفاءٌ", tr: "There Is Healing in Honey", ozet: "Dialogue, comprehension and vocabulary exercises.", bloklar: [
 { t: "diyalog", resim: "asal", kisiler: [{ ar: "حازِمٌ", tr: "Hāzim" }, { ar: "عامِرٌ", tr: "ʿĀmir" }], satir: [
  [0, "أَمَريضٌ أَنْتَ؟", "Are you ill?", "d1-0"],
  [1, "نَعَمْ، أَشْعُرُ بِآلامٍ شَديدَةٍ في بَطْني.", "Yes, I feel severe pains in my stomach.", "d1-1"],
  [0, "هَلْ ذَهَبْتَ إِلى الطَّبيبِ؟", "Did you go to the doctor?", "d1-2"],
  [1, "لا، لَمْ أَذْهَبْ إِلى الطَّبيبِ، وَلَمْ أَتَناوَلْ أَيَّ دَواءٍ.", "No, I did not go to the doctor and I have not taken any medicine.", "d1-3"],
  [0, "هَلْ سَمِعْتَ قِصَّةَ الصَّحابِيِّ الَّذي عالَجَهُ الرَّسولُ ﷺ؟", "Have you heard the story of the Companion whom the Messenger of God (peace and blessings be upon him) treated?", "d1-4"],
  [1, "لا، لَمْ أَسْمَعْ بِها. مِمَّ اشْتَكى الصَّحابِيُّ؟", "No, I have not heard it. What was the Companion complaining of?", "d1-5"],
  [0, "اشْتَكى مِنْ بَطْنِهِ.", "He was complaining of his stomach.", "d1-6"],
  [1, "وَكَيْفَ عالَجَهُ الرَّسولُ ﷺ؟", "How did the Messenger of God (peace and blessings be upon him) treat him?", "d1-7"],
  [0, "أَمَرَ أَخاهُ أَنْ يَسْقِيَهُ عَسَلًا.", "He told his brother to give him honey to drink.", "d1-8"],
  [1, "وَهَلْ شُفِيَ؟", "And did he recover?", "d1-9"],
  [0, "نَعَمْ، بَعْدَ أَنْ سَقاهُ ثَلاثَ مَرّاتٍ.", "Yes, after he gave him (honey) three times.", "d1-10"],
  [1, "العَسَلُ؟! سُبْحانَ اللهِ!", "Honey?! Glory be to God!", "d1-11"],
  [0, "نَعَمْ، العَسَلُ. قالَ تَعالى: ﴿فيهِ شِفاءٌ لِلنّاسِ﴾.", "Yes, honey. God Almighty said: “In it is healing for people.”", "d1-12"],
  [1, "سَأَتَناوَلُ العَسَلَ مِثْلَ هذا الصَّحابِيِّ.", "Like this Companion, I will eat honey too.", "d1-13"],
  [0, "توجَدُ مَحَلّاتٌ لِبَيْعِ العَسَلِ في السّوقِ المَرْكَزِيِّ.", "In the central market there are shops that sell honey.", "d1-14"],
  [1, "سَأَذْهَبُ الآنَ إِلى هُناكَ، وَأَشْتَري العَسَلَ.", "Now I will go there and buy honey.", "d1-15"],
  [0, "شَفاكَ اللهُ.", "May God grant you healing.", "d1-16"],
  [1, "جَزاكَ اللهُ خَيْرًا.", "May God reward you with good.", "d1-17"]],
  not: "The recording is read according to an older edition of the book: instead of بَطْني, مَعِدَتي (my stomach) is said, and instead of ثَلاثَ مَرّاتٍ, أَرْبَعَ مَرّاتٍ is said. Lines not in the recording play with the embedded reading." },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["عامِرٌ مَريضٌ.", true, "", "ʿĀmir is ill."],
  ["قابَلَ حازِمٌ الطَّبيبَ.", false, "لَمْ يَذْهَبْ عامِرٌ إِلى الطَّبيبِ.", "Hāzim spoke with the doctor."],
  ["شَرِبَ عامِرٌ العَسَلَ.", false, "سَيَتَناوَلُ عامِرٌ العَسَلَ.", "ʿĀmir drank the honey."],
  ["أَعْطى حازِمٌ عامِرًا العَسَلَ.", false, "سَيَشْتَري عامِرٌ العَسَلَ مِنَ السّوقِ.", "Hāzim gave ʿĀmir honey."],
  ["العَسَلُ فيهِ شِفاءٌ لِلنّاسِ.", true, "", "In honey there is healing for people."]] },
 { t: "sirala", aciklama: "Put the sentences in the order of the dialogue.", ar: "رَتِّبِ الجُمَلَ التّالِيَةَ كَما وَرَدَتْ في الحِوارِ", ogeler: [
  "شَعَرَ عامِرٌ بِآلامٍ في بَطْنِهِ.", "لَمْ يُقابِلْ عامِرٌ الطَّبيبَ.", "وَلَمْ يَتَناوَلْ أَيَّ دَواءٍ.", "وَسَيَذْهَبُ إِلى السّوقِ لِيَشْتَرِيَ العَسَلَ."] },
 { t: "esle", ar: "مُفْرَداتٌ — صِلْ بَيْنَ المُفْرَدِ وَجَمْعِهِ", aciklama: "Match the singular with its plural.", ciftler: [
  ["أَلَمٌ", "آلامٌ", "pain"], ["شَيْءٌ", "أَشْياءُ", "thing"], ["دَواءٌ", "أَدْوِيَةٌ", "medicine"], ["مَرَضٌ", "أَمْراضٌ", "illness"], ["طَبيبٌ", "أَطِبّاءُ", "doctor"]] },
 { t: "bosluk", ar: "امْلَأِ الفَراغَ بِالكَلِمَةِ المُناسِبَةِ مِنَ الصُّنْدوقِ", kutu: ["اشْتَرى", "تَناوَلَ", "شَعَرَ", "شَفى"], ogeler: [
  ["___ بِأَلَمٍ في رَأْسِهِ.", "شَعَرَ", null, "He felt a pain in his head."],
  ["___ العَسَلَ مِنَ السّوقِ.", "اشْتَرى", null, "He bought the honey from the market."],
  ["___ اللهُ المَريضَ.", "شَفى", null, "God gave the patient healing."],
  ["___ الدَّواءَ بَعْدَ الغَداءِ.", "تَناوَلَ", null, "He took the medicine after lunch."]] }
]},
// ---------------- DERS 2 ----------------
{ no: 2, kisa: "الأَلِفُ / الهَمْزَةُ", ar: "الأَصْواتُ: الأَلِفُ / الهَمْزَةُ", tr: "Sounds: alif and hamza", ozet: "Distinguish alif from hamza; listen and repeat.", bloklar: [
 { t: "kural", metin: "الهَمْزَةُ صَوْتٌ يَقْبَلُ الحَرَكاتِ، بِخِلافِ الأَلِفِ الَّتي تَلْزَمُ السُّكونَ دائِمًا؛ وَلا تَقَعُ في أَوَّلِ الكَلِمَةِ.",
   tr: "The hamza is a sound that takes vowels; the alif is always quiescent and does not occur at the beginning of a word.", s: "s2-kural" },
 { t: "tablo", baslik: "At the beginning, middle and end of a word", bas: ["Initial: alif ا", "Initial: hamza أ", "Medial: ا", "Medial: أ", "Final: ا", "Final: أ"], satir: [
  ["×", "أَخَذَ", "قَراهُ", "قَرَأَهُ", "بَدا", "بَدَأَ"], ["×", "أَكَلَ", "كَفاهُ", "كَفَأَهُ", "نَبا", "نَبَأَ"], ["×", "أَحْمَدُ", "ثارَ", "ثَأَرَ", "خَبا", "خَبَأَ"],
  ["×", "أَصْدِقاءُ", "سالَ", "سَأَلَ", "كَلا", "كَلَأَ"], ["×", "أَخي", "جارَ", "جَأَرَ", "كَما", "كَمَأَ"]],
  ses: [0, 1, 2, 3, 4].map(function (r) { return [null, "s2-b" + r, "s2-oa" + r, "s2-oh" + r, "s2-sa" + r, "s2-sh" + r]; }), not: "Touch a word and listen to its pronunciation. With the alif the sound is prolonged; with the hamza there is a short stop in the throat." },
 { t: "sessec", ar: "التَّدْريبُ (١): ضَعْ عَلامَةَ (✓) بِجانِبِ الكَلِمَةِ الَّتي تَسْمَعُها", ogeler: [
  ["زارَ", "زَأَرَ"], ["شانَ", "شَأَنَ"], ["فارَ", "فَأَرَ"], ["لامَ", "لَأَمَ"], ["صَبا", "صَبَأَ"], ["سَبى", "سَبَأَ"], ["قَرى", "قَرَأَ"], ["طَرى", "طَرَأَ"]],
  ses: [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return ["s2-t" + i + "a", "s2-t" + i + "b"]; }),
  not: "Listen with ▶, choose the word you heard; then say both words yourself." },
 { t: "tekrar", tts: false, ar: "التَّدْريبُ (٢): اسْتَمِعْ، ثُمَّ أَعِدْ", aciklama: "Listen to the verses and repeat; pay attention to the words with hamza and with alif.", ogeler: [
  ["﴿يَا أُخْتَ هَارُونَ مَا كَانَ أَبُوكِ [[امْرَأَ]] سَوْءٍ وَمَا كَانَتْ [[أُمُّكِ]] بَغِيًّا﴾ [مريم: ٢٨]", "O sister of Hārūn! Your father was not a bad man, nor was your mother unchaste.", "s2-a0"],
  ["﴿[[إِنَّ]] هَٰذَا لَفِي الصُّحُفِ [[الْأُولَىٰ]] ۝ صُحُفِ [[إِبْرَاهِيمَ]] وَمُوسَىٰ﴾ [الأعلى: ١٨-١٩]", "Indeed, this is in the earlier scriptures, the scriptures of Ibrāhīm and Mūsā.", "s2-a1"],
  ["﴿[[إِنَّمَا]] يَتَذَكَّرُ [[أُولُو]] الْأَلْبَابِ﴾ [الزمر: ٩]", "Only those of understanding take heed.", "s2-a2"],
  ["﴿[[أُولَٰئِكَ]] جَزَاؤُهُمْ [[أَنَّ]] عَلَيْهِمْ لَعْنَةَ اللَّهِ وَالْمَلَائِكَةِ وَالنَّاسِ [[أَجْمَعِينَ]]﴾ [آل عمران: ٨٧]", "Their recompense is that upon them is the curse of God, the angels and all people.", "s2-a3"],
  ["﴿[[إِنِ]] الْحُكْمُ [[إِلَّا]] لِلَّهِ ۚ [[أَمَرَ]] [[أَلَّا]] تَعْبُدُوا [[إِلَّا]] [[إِيَّاهُ]]﴾ [يوسف: ٤٠]", "Judgment belongs to God alone. He has commanded that you worship none but Him.", "s2-a4"]] },
 { t: "ornek", ar: "التَّدْريبُ (٣): اسْتَمِعْ وَأَعِدْ. لاحِظْ كَيْفَ تُنْطَقُ الأَلِفُ وَالهَمْزَةُ", ogeler: [
  ["[[أَ]]مَريضٌ [[أَ]]نْتَ؟", "Are you ill?", "s2-c0"], ["سَق[[ا]]هُ [[أَ]]رْبَعَ مَرّ[[ا]]تٍ.", "He gave him to drink four times.", "s2-c1"], ["شَف[[ا]]هُ اللهُ، سُبْح[[ا]]نَهُ وَتَع[[ا]]لى.", "God gave him healing; He is glorified and exalted.", "s2-c2"],
  ["سَ[[أَ]]ذْهَبُ وَ[[أَ]]شْتَري العَسَلَ وَسَ[[أَ]]تَن[[ا]]وَلُهُ.", "I will go and buy honey and eat it.", "s2-c3"], ["ق[[ا]]بَلَ ح[[ا]]زِمٌ ع[[ا]]مِرًا الَّذي يَشْعُرُ بِ[[آ]]ل[[ا]]مٍ.", "Hāzim met ʿĀmir, who was feeling pain.", "s2-c4"]] },
 { t: "siniflandir", ar: "هَمْزَةٌ أَمْ أَلِفٌ؟", aciklama: "Is the underlined letter a hamza or an alif?", soru: "Hamza or alif?", gruplar: ["هَمْزَةٌ (أ)", "أَلِفٌ (ا)"], ogeler: [
  ["[[أَ]]كَلَ", 0], ["ق[[ا]]لَ", 1], ["سَ[[أَ]]لَ", 0], ["س[[ا]]لَ", 1], ["بَدَ[[أَ]]", 0], ["بَد[[ا]]", 1], ["[[أَ]]صْدِق[[ا]]ءُ", 0], ["ج[[ا]]رَ", 1]] }
]},
// ---------------- DERS 3 ----------------
{ no: 3, kisa: "حُروفُ الجَرِّ", ar: "مِنْ حُروفِ الجَرِّ", tr: "Prepositions", ozet: "مِنْ، في، إِلى، عَلى، عَنْ، بِـ، لِـ", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "مِنْ - في - إِلى - عَلى - عَنْ - بِـ - لِـ: تَجُرُّ هذِهِ الحُروفُ الأَسْماءَ الَّتي تَليها.", tr: "These letters put the nouns that come after them in the genitive (making their endings kasra)." },
 { t: "ornek", ogeler: [
  ["أَشْعُرُ [[بِـ]]ـآلامٍ.", "I feel pains."], ["الأَلَمُ [[في]] البَطْنِ.", "The pain is in the stomach."], ["ذَهَبْتُ [[إِلى]] الطَّبيبِ.", "I went to the doctor."], ["تَناوَلْتُ [[مِنَ]] العَسَلِ.", "I ate some of the honey."],
  ["[[في]] العَسَلِ شِفاءٌ لِلنّاسِ.", "In honey there is healing for people."], ["هُناكَ سوقٌ [[لِـ]]ـبَيْعِ العَسَلِ.", "There is a market there for selling honey."], ["العَسَلُ [[عَلى]] الطّاوِلَةِ.", "The honey is on the table."], ["سوقُ العَسَلِ بَعيدٌ [[عَنِ]] البَيْتِ.", "The honey market is far from the house."]] },
 { t: "bosluk", ar: "التَّدْريبُ (١): امْلَأِ الفَراغَ بِالحَرْفِ المُناسِبِ مِنَ الصُّنْدوقِ", kutu: ["بِـ", "لِـ", "مِنْ", "في", "عَنْ", "إِلى"], ogeler: [
  ["المَدينَةُ بَعيدَةٌ ___ البَيْتِ.", "عَنْ", null, "The city is far from the house."], ["أَذْهَبُ إِلى العَمَلِ ___ السَّيّارَةِ.", "بِـ", null, "I go to work by car."], ["أَدْرُسُ سِتَّ حِصَصٍ ___ اليَوْمِ.", "في", null, "I study six lessons a day."],
  ["أَذْهَبُ ___ المَكْتَبَةِ الآنَ.", "إِلى", null, "I am going to the library now."], ["اسْتَيْقَظْتُ ___ النَّوْمِ مُبَكِّرًا.", "مِنْ", null, "I woke early from sleep."], ["هُناكَ سوقٌ ___ بَيْعِ العَسَلِ.", "لِـ", null, "There is a market for selling honey."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): اقْرَأِ الفِقْرَةَ، ثُمَّ اخْتَرِ الحَرْفَ الصَّحيحَ", aciklama: "Complete the paragraph piece by piece.", ogeler: [
  ["شَعَرَ عامِرٌ ___ آلامٍ شَديدَةٍ", "بِـ", ["إِلى", "لِـ"]], ["(آلامٌ شَديدَةٌ) ___ البَطْنِ.", "في", ["عَنْ", "مِنْ"]], ["لكِنَّهُ لَمْ يَذْهَبْ ___ الطَّبيبِ.", "إِلى", ["بِـ", "في"]],
  ["عَرَفَ صَديقُهُ حازِمٌ أَنَّهُ يَشْتَكي ___ بَطْنِهِ.", "مِنْ", ["عَنْ", "إِلى"]], ["فَقالَ لَهُ: إِنَّ ___ العَسَلِ شِفاءً.", "في", ["مِنْ", "إِلى"]], ["وَقالَ: إِنَّ هُناكَ سوقًا ___ بَيْعِ العَسَلِ.", "لِـ", ["عَنْ", "بِـ"]],
  ["وَهذا السّوقُ لَيْسَ بَعيدًا ___ بَيْتِهِ.", "عَنْ", ["بِـ", "لِـ"]], ["ذَهَبَ عامِرٌ ___ السّوقِ.", "إِلى", ["في", "عَلى"]], ["وَاشْتَرى كيلًا ___ العَسَلِ.", "مِنَ", ["لِـ", "في"]]] }
]},
// ---------------- DERS 4 ----------------
{ no: 4, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to the conversation at the honey seller's; speak the roles of patient and doctor.", bloklar: [
 { t: "dinle", s: "l4", ar: "اسْتَمِعْ إِلى الحِوارِ", aciklama: "Listen first, then answer the questions.", metin: [
  ["— السَّلامُ عَلَيْكُمْ. — وَعَلَيْكُمُ السَّلامُ، أَيُّ خِدْمَةٍ؟", "— Peace be upon you. — And upon you peace, how may I help?"],
  ["— مِنْ فَضْلِكَ، أُريدُ بَعْضَ العَسَلِ. — عِنْدَنا أَنْواعٌ كَثيرَةٌ مِنَ العَسَلِ، أَيَّ نَوْعٍ تُريدُ؟", "— Please, I would like some honey. — We have many kinds of honey; which kind would you like?"],
  ["— أَشْعُرُ بِأَلَمٍ شَديدٍ في مَعِدَتي. — هذا نَوْعٌ طَيِّبٌ مِنَ العَسَلِ.", "— I feel a severe pain in my stomach. — This is a good kind of honey."],
  ["— أُريدُ مِنْهُ كيلًا. — في هذِهِ القارورَةِ كيلٌ مِنَ العَسَلِ.", "— I would like a kilo of it. — This jar has a kilo of honey."],
  ["— جَميلٌ، بِكَمْ هذِهِ القارورَةُ؟ — بِمِئَةِ رِيالٍ.", "— Good, how much is this jar? — One hundred riyals."],
  ["— تَفَضَّلْ، هذِهِ مِئَةُ رِيالٍ. — شَفاكَ اللهُ. — شُكْرًا لَكَ.", "— Here you are, here are one hundred riyals. — May God grant you healing. — Thank you."]] },
 { t: "dy", ar: "اسْتَمِعْ إِلى الحِوارِ، ثُمَّ ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["يُريدُ المُشْتَري العَسَلَ؛ لِأَنَّهُ يَشْعُرُ بِأَلَمٍ في صَدْرِهِ.", false, "يُريدُ المُشْتَري العَسَلَ؛ لِأَنَّهُ يَشْعُرُ بِأَلَمٍ في مَعِدَتِهِ.", "The customer wants honey because he feels a pain in his chest."],
  ["اشْتَرى الرَّجُلُ العَسَلَ الطَّيِّبَ.", true, "", "The man bought the good honey."],
  ["اشْتَرى كيلًا واحِدًا مِنَ العَسَلِ.", true, "", "He bought a kilo of honey."],
  ["طَلَبَ البائِعُ مِنَ المُشْتَري خَمْسينَ رِيالًا.", false, "طَلَبَ البائِعُ مِنَ المُشْتَري مِئَةَ رِيالٍ.", "The seller asked the customer for fifty riyals."],
  ["في المَحَلِّ أَنْواعٌ كَثيرَةٌ مِنَ العَسَلِ.", true, "", "There are many kinds of honey in the shop."]] },
 { t: "acik", ar: "تَكَلَّمْ — التَّدْريبُ (١): ماذا تَقولُ المَريضَةُ؟", aciklama: "The doctor asks; say the patient's answer, then look at the sample answer.", ogeler: [
  ["الطَّبيبَةُ: أَمَريضَةٌ أَنْتِ؟", "نَعَمْ، أَنا مَريضَةٌ.", "Doctor: Are you ill?", "Yes, I am ill."],
  ["الطَّبيبَةُ: بِمَ تَشْعُرينَ؟", "أَشْعُرُ بِأَلَمٍ في رَأْسي.", "Doctor: What do you feel?", "I feel a pain in my head."],
  ["الطَّبيبَةُ: هَلْ تَناوَلْتِ الدَّواءَ؟", "نَعَمْ، تَناوَلْتُ الدَّواءَ.", "Doctor: Did you take the medicine?", "Yes, I took the medicine."],
  ["الطَّبيبَةُ: هَلْ أَنْتِ بِخَيْرٍ الآنَ؟", "نَعَمْ، الحَمْدُ لِلّهِ، أَنا بِخَيْرٍ.", "Doctor: Are you well now?", "Yes, praise be to God, I am well."]] },
 { t: "resim", ar: "التَّدْريبُ (٢): تَبادَلْ وَصْفَ الصُّوَرِ مَعَ زَميلِكَ", aciklama: "Describe each picture in one sentence; then look at the sample sentence.", resimler: [
  ["m_batn", "يَشْعُرُ الرَّجُلُ بِأَلَمٍ شَديدٍ في بَطْنِهِ.", "The man feels a severe pain in his stomach."],
  ["m_dawa", "يَتَناوَلُ المَريضُ الدَّواءَ.", "The patient is taking his medicine."],
  ["m_asal", "في العَسَلِ شِفاءٌ لِلنّاسِ.", "In honey there is healing for people."],
  ["m_farah", "شُفِيَ الرَّجُلُ، فَهُوَ سَعيدٌ الآنَ.", "The man has recovered; now he is happy."]] }
]},
// ---------------- DERS 5 ----------------
{ no: 5, kisa: "زَيْنَبُ وَمَرْيَمُ", ar: "زَيْنَبُ وَمَرْيَمُ صَديقَتانِ", tr: "Zaynab and Maryam, two friends", ozet: "Reading text: one wants to gain weight, the other to lose it.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["أَيُّهُما تُفَضِّلُ: أَنْ تَكونَ نَحيفًا، أَمْ سَمينًا؟", "Which do you prefer: to be thin or fat?"], ["ماذا تَفْعَلُ إِذا أَرَدْتَ أَنْ تَكونَ نَحيفًا؟", "If you want to be thin, what do you do?"],
  ["ماذا تَفْعَلُ إِذا أَرَدْتَ أَنْ تَكونَ سَمينًا؟", "If you want to gain weight, what do you do?"], ["ما الطَّعامُ الَّذي تَأْكُلُهُ كَثيرًا؟", "What food do you eat most?"]] },
 { t: "metin", resim: ["w55", "w90"], paragraf: [
  [["زَيْنَبُ وَمَرْيَمُ صَديقَتانِ، تَتَشابَهانِ في أَشْياءَ كَثيرَةٍ؛", "Zaynab and Maryam are two friends; they resemble each other in many things:", "m5-0"],
   ["فَهُما تَسْكُنانِ في حَيٍّ واحِدٍ، وَتَدْرُسانِ في جامِعَةٍ واحِدَةٍ،", "They live in the same neighbourhood and study at the same university.", "m5-1"],
   ["وَلكِنَّهُما تَخْتَلِفانِ في أَمْرٍ آخَرَ؛", "But they differ in another matter:", "m5-2"],
   ["فَزَيْنَبُ نَحيفَةٌ جِدًّا، وَمَرْيَمُ سَمينَةٌ جِدًّا.", "Zaynab is very thin, while Maryam is very fat.", "m5-3"],
   ["تُريدُ زَيْنَبُ أَنْ تَكونَ سَمينَةً، وَلكِنَّها لا تَسْتَطيعُ. وَتُريدُ مَرْيَمُ أَنْ تَكونَ نَحيفَةً، وَلكِنَّها لا تَسْتَطيعُ.", "Zaynab wants to gain weight but cannot. Maryam wants to lose weight but cannot.", "m5-4"]],
  [["زَيْنَبُ تُفَكِّرُ كَثيرًا في هذِهِ المُشْكِلَةِ، ماذا تَفْعَلُ؟", "Zaynab thinks a lot about this problem: What should she do?", "m5-5"],
   ["وَزْنُها الآنَ خَمْسَةٌ وَخَمْسونَ كيلًا. كَيْفَ تَزيدُ وَزْنَها؟ يَجِبُ أَنْ يَصِلَ وَزْنُها إِلى سَبْعينَ كيلًا. حاوَلَتْ زَيْنَبُ، وَحاوَلَتْ، وَلكِنَّها لَمْ تَنْجَحْ.", "Her weight now is fifty-five. How should she increase her weight? Her weight needs to reach seventy. Zaynab tried and tried but did not succeed.", "m5-6"]],
  [["أَخَذَتْ زَيْنَبُ تَتَناوَلُ كَثيرًا مِنَ الطَّعامِ: تَأْكُلُ اللَّحْمَ وَالخُبْزَ وَالبَيْضَ وَالأَرُزَّ وَالجُبْنَ وَالعَسَلَ وَالحَلْوى وَالمُرَبّى، وَتَشْرَبُ الحَليبَ، وَعَصيرَ الفَواكِهِ.", "Zaynab began to eat a lot: she eats meat, bread, eggs, rice, cheese, honey, sweets and jam; she drinks milk and juice.", "m5-7"],
   ["لَمْ تُمارِسْ زَيْنَبُ الرِّياضَةَ، وَرَغْمَ ذلِكَ ظَلَّتْ نَحيفَةً. ماذا تَفْعَلُ؟", "Zaynab did not do sport; in spite of this she stayed thin. What should she do?", "m5-8"],
   ["أَكَلَتْ كَثيرًا، وَشَرِبَتْ كَثيرًا، وَلكِنَّها ظَلَّتْ نَحيفَةً.", "She ate a lot, drank a lot, but stayed thin.", "m5-9"]],
  [["تَخْتَلِفُ مُشْكِلَةُ مَرْيَمَ عَنْ مُشْكِلَةِ زَيْنَبَ؛ فَمَرْيَمُ سَمينَةٌ جِدًّا، وَتُريدُ أَنْ تَكونَ نَحيفَةً. وَزْنُها الآنَ تِسْعونَ كيلًا، كَيْفَ يَنْقُصُ وَزْنُها؟", "Maryam's problem is different from Zaynab's: Maryam is very fat and wants to lose weight. Her weight now is ninety; how should her weight go down?", "m5-10"],
   ["يَجِبُ أَنْ يَصِلَ وَزْنُها إِلى سَبْعينَ كيلًا.", "Her weight needs to come down to seventy.", "m5-11"],
   ["تَرَكَتْ مَرْيَمُ السُّكَّرِيّاتِ وَالنَّشَوِيّاتِ، وَمارَسَتِ الرِّياضَةَ شَهْرًا. لَمْ تَسْتَطِعْ مَرْيَمُ، فَهِيَ تُحِبُّ الأَكْلَ. أَخَذَتْ مَرْيَمُ تَأْكُلُ كَثيرًا، فَزادَ وَزْنُها، وَلَمْ يَنْقُصْ.", "Maryam gave up sugary and starchy foods and did sport for a month. But she could not hold out, because she loves eating. She began again to eat a lot; her weight went up, it did not go down.", "m5-12"]]] },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["الصَّديقَتانِ تَتَشابَهانِ وَتَخْتَلِفانِ.", true, "", "The two friends are both similar and different."],
  ["تُريدُ زَيْنَبُ أَنْ يَنْقُصَ وَزْنُها.", false, "تُريدُ زَيْنَبُ أَنْ يَزيدَ وَزْنُها.", "Zaynab wants her weight to decrease."],
  ["أَكَلَتْ زَيْنَبُ وَشَرِبَتْ كَثيرًا، وَظَلَّتْ نَحيفَةً.", true, "", "Zaynab ate and drank a lot but stayed thin."],
  ["مَرْيَمُ تُريدُ أَنْ تَكونَ سَمينَةً.", false, "مَرْيَمُ تُريدُ أَنْ تَكونَ نَحيفَةً.", "Maryam wants to be fat."],
  ["زادَ وَزْنُ زَيْنَبَ، وَنَقَصَ وَزْنُ مَرْيَمَ.", false, "ظَلَّتْ زَيْنَبُ نَحيفَةً، وَزادَ وَزْنُ مَرْيَمَ.", "Zaynab's weight increased, Maryam's decreased."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ", ogeler: [
  ["ماذا تُريدُ زَيْنَبُ؟", "أَنْ تَكونَ سَمينَةً.", ["أَنْ تَكونَ نَحيفَةً.", "أَنْ تَدْرُسَ في الجامِعَةِ."], "What does Zaynab want?"],
  ["ماذا تُريدُ مَرْيَمُ؟", "أَنْ تَكونَ نَحيفَةً.", ["أَنْ تَكونَ سَمينَةً.", "أَنْ تَأْكُلَ كَثيرًا."], "What does Maryam want?"],
  ["ما وَزْنُ زَيْنَبَ؟ وَما وَزْنُ مَرْيَمَ؟", "زَيْنَبُ ٥٥ كيلًا، وَمَرْيَمُ ٩٠ كيلًا.", ["زَيْنَبُ ٩٠ كيلًا، وَمَرْيَمُ ٥٥ كيلًا.", "كِلْتاهُما ٧٠ كيلًا."], "What are Zaynab's and Maryam's weights?"],
  ["ماذا فَعَلَتْ زَيْنَبُ لِيَزيدَ وَزْنُها؟", "تَناوَلَتْ كَثيرًا مِنَ الطَّعامِ.", ["مارَسَتِ الرِّياضَةَ.", "تَرَكَتِ السُّكَّرِيّاتِ."], "What did Zaynab do so that her weight would increase?"],
  ["ماذا فَعَلَتْ مَرْيَمُ لِيَنْقُصَ وَزْنُها؟", "تَرَكَتِ السُّكَّرِيّاتِ وَالنَّشَوِيّاتِ، وَمارَسَتِ الرِّياضَةَ.", ["أَكَلَتِ اللَّحْمَ وَالخُبْزَ.", "شَرِبَتِ الحَليبَ وَالعَصيرَ."], "What did Maryam do so that her weight would decrease?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — صِلْ بَيْنَ الفِعْلِ وَالاسْمِ المُناسِبِ", aciklama: "Match the verb with the suitable noun; then make a sentence with the two.", ciftler: [
  ["يَسْكُنُ", "بَيْتًا", "lives – house"], ["يَدْرُسُ", "في الجامِعَةِ", "studies – at the university"], ["يُمارِسُ", "الرِّياضَةَ", "does – sport"], ["يَزيدُ", "وَزْنُهُ", "increases – her weight"], ["يَتَناوَلُ", "الطَّعامَ", "takes – food"]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٢): ضَعْ كَلِماتِ الصُّنْدوقِ تَحْتَ الفِعْلِ المُناسِبِ", soru: "يَأْكُلُ or يَشْرَبُ?", gruplar: ["يَأْكُلُ", "يَشْرَبُ"], ogeler: [
  ["الخُبْزَ", 0], ["الشّايَ", 1], ["الحَلْوى", 0], ["القَهْوَةَ", 1], ["العَسَلَ", 0], ["الفاكِهَةَ", 0], ["السَّمَكَ", 0], ["اللَّحْمَ", 0], ["الحَليبَ", 1], ["العَصيرَ", 1]] }
]},
// ---------------- DERS 6 ----------------
{ no: 6, kisa: "لا النّافِيَةُ", ar: "لا النّافِيَةُ", tr: "The lā of negation", ozet: "Negate the imperfect with لا.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "لا حَرْفُ نَفْيٍ؛ يَكونُ ما بَعْدَهُ مَنْفِيًّا.", tr: "Lā is a particle of negation; the verb that comes after it becomes negative." },
 { t: "tablo", baslik: "Affirmation and negation", bas: ["إِثْباتٌ (affirmative)", "نَفْيٌ (negative)"], satir: [
  ["مَرْيَمُ تُحِبُّ الأَكْلَ.", "زَيْنَبُ لا تُحِبُّ الأَكْلَ."], ["مَرْيَمُ تَشْرَبُ الحَليبَ.", "زَيْنَبُ لا تَشْرَبُ الحَليبَ."], ["مَرْيَمُ تُمارِسُ الرِّياضَةَ.", "زَيْنَبُ لا تُمارِسُ الرِّياضَةَ."], ["مَرْيَمُ تَأْكُلُ الخُبْزَ.", "زَيْنَبُ لا تَأْكُلُ الخُبْزَ."]] },
 { t: "acik", ar: "التَّدْريبُ (١): حَوِّلْ كَما في المِثالِ", aciklama: "Example: أَنا أَعْمَلُ في شَرِكَةٍ ← أَنا لا أَعْمَلُ في شَرِكَةٍ.", ogeler: [
  ["مُحَمَّدٌ يَدْرُسُ في الجامِعَةِ.", "مُحَمَّدٌ لا يَدْرُسُ في الجامِعَةِ.", "Muhammad studies at the university."],
  ["زَيْنَبُ تَسْكُنُ في شَقَّةٍ.", "زَيْنَبُ لا تَسْكُنُ في شَقَّةٍ.", "Zaynab lives in an apartment."],
  ["عَلِيٌّ يَشْرَبُ اللَّبَنَ.", "عَلِيٌّ لا يَشْرَبُ اللَّبَنَ.", "ʿAlī drinks milk."],
  ["سَعيدَةُ تَدْرُسُ العَرَبِيَّةَ.", "سَعيدَةُ لا تَدْرُسُ العَرَبِيَّةَ.", "Saʿīda studies Arabic."]] },
 { t: "bosluk", ar: "التَّدْريبُ (٢): اخْتَرِ الفِعْلَ المُناسِبَ مِمّا بَيْنَ القَوْسَيْنِ", aciklama: "Example: عَلِيٌّ سَمينٌ جِدًّا، هُوَ يُحِبُّ الأَكْلَ.", ogeler: [
  ["فاطِمَةُ تَدْرُسُ كَثيرًا، هِيَ ___ في الاخْتِبارِ.", "تَنْجَحُ", ["لا تَنْجَحُ"], "Fāṭima works hard; she succeeds in the exam."],
  ["سُلَيْمانُ مَشْغولٌ جِدًّا، هُوَ ___ الرِّياضَةَ.", "لا يُمارِسُ", ["يُمارِسُ"], "Sulaymān is very busy; he does not do sport."],
  ["سَعيدٌ يَجْري كَثيرًا، هُوَ ___ الرِّياضَةَ.", "يُمارِسُ", ["لا يُمارِسُ"], "Saʿīd runs a lot; he does sport."],
  ["مُحَمَّدٌ يَصومُ رَمَضانَ، هُوَ ___ في النَّهارِ.", "لا يَشْرَبُ", ["يَشْرَبُ"], "Muhammad is fasting Ramadan; he does not drink in the daytime."],
  ["خالِدٌ يَتَناوَلُ الفُطورَ، هُوَ ___ الآنَ.", "يَأْكُلُ", ["لا يَأْكُلُ"], "Khālid is having breakfast; he is eating now."],
  ["عَدْنانُ ___ المَلابِسَ في غُرْفَةِ الجُلوسِ.", "لا يَغْسِلُ", ["يَغْسِلُ"], "ʿAdnān does not wash clothes in the sitting room."],
  ["زَيْدٌ مُسْلِمٌ، هُوَ ___ في المَسْجِدِ.", "يُصَلّي", ["لا يُصَلّي"], "Zayd is a Muslim; he prays in the mosque."],
  ["أَنا في الصَّفِّ الآنَ، أَنا ___ العَرَبِيَّةَ.", "أَدْرُسُ", ["لا أَدْرُسُ"], "I am in the classroom now; I am studying Arabic."]] },
 { t: "acik", ar: "التَّدْريبُ (٣): أَجِبْ مُسْتَخْدِمًا (لا النّافِيَةَ)", aciklama: "Example: هَلْ تَشْرَبُ القَهْوَةَ في اللَّيْلِ؟ ← لا، لا أَشْرَبُ القَهْوَةَ في اللَّيْلِ.", ogeler: [
  ["هَلْ تَتَناوَلُ العَسَلَ في الغَداءِ؟", "لا، لا أَتَناوَلُ العَسَلَ في الغَداءِ.", "Do you eat honey at lunch?"],
  ["هَلْ يَشْتَكي عامِرٌ مِنْ بَطْنِهِ؟", "لا، لا يَشْتَكي عامِرٌ مِنْ بَطْنِهِ.", "Is ʿĀmir complaining of his stomach?"],
  ["هَلْ توجَدُ مَحَلّاتٌ كَثيرَةٌ لِبَيْعِ العَسَلِ؟", "لا، لا توجَدُ مَحَلّاتٌ كَثيرَةٌ لِبَيْعِ العَسَلِ.", "Are there many shops that sell honey?"],
  ["هَلْ يَذْهَبُ الطُّلّابُ إِلى المَكْتَبَةِ كُلَّ يَوْمٍ؟", "لا، لا يَذْهَبُ الطُّلّابُ إِلى المَكْتَبَةِ كُلَّ يَوْمٍ.", "Do the students go to the library every day?"],
  ["هَلْ تَتَناوَلُ مَرْيَمُ السُّكَّرِيّاتِ؟", "لا، لا تَتَناوَلُ مَرْيَمُ السُّكَّرِيّاتِ.", "Does Maryam eat sugary foods?"]] },
 { t: "bosluk", ar: "التَّدْريبُ (٤): أَكْمِلِ الجُمَلَ بِأَفْعالٍ مُناسِبَةٍ", aciklama: "Example: لا تُريدُ زَيْنَبُ أَنْ تَكونَ نَحيفَةً.", ogeler: [
  ["لا ___ زَيْنَبُ الرِّياضَةَ.", "تُمارِسُ", ["تَأْكُلُ", "يَشْعُرُ"], "Zaynab does not do sport."],
  ["لا ___ مَرْيَمُ أَنْ تَكونَ سَمينَةً.", "تُريدُ", ["تَشْرَبُ", "يَأْكُلُ"], "Maryam does not want to be fat."],
  ["لا ___ بِأَلَمٍ في بَطْنِهِ الآنَ.", "يَشْعُرُ", ["تُمارِسُ", "تُريدُ"], "He does not feel a pain in his stomach now."],
  ["لا ___ فاطِمَةُ الحَليبَ وَعَصيرَ الفَواكِهِ.", "تَشْرَبُ", ["يَشْعُرُ", "تَسْكُنُ"], "Fāṭima does not drink milk and juice."],
  ["لا ___ المَريضُ اللَّحْمَ وَالبَيْضَ.", "يَأْكُلُ", ["تَشْرَبُ", "يَدْرُسُ"], "The patient does not eat meat and eggs."]] },
 { t: "acik", ar: "التَّدْريبُ (٥): كَوِّنْ جُمَلًا كَما في المِثالِ", aciklama: "Example (أُحِبُّ): أُحِبُّ السَّفَرَ بِالجَوِّ، وَلا أُحِبُّ السَّفَرَ بِالبَحْرِ.", ogeler: [
  ["(أُريدُ)", "أُريدُ أَنْ أَكونَ صَحيحًا، وَلا أُريدُ أَنْ أَكونَ سَمينًا.", "I want"],
  ["(أَدْرُسُ)", "أَدْرُسُ العَرَبِيَّةَ، وَلا أَدْرُسُ الطِّبَّ.", "I study"],
  ["(أَشْتَري)", "أَشْتَري العَسَلَ، وَلا أَشْتَري الحَلْوى.", "I buy"],
  ["(أَشْعُرُ)", "أَشْعُرُ بِأَلَمٍ في رَأْسي، وَلا أَشْعُرُ بِأَلَمٍ في بَطْني.", "I feel"],
  ["(أَسْتَطيعُ)", "أَسْتَطيعُ أَنْ أَمْشِيَ، وَلا أَسْتَطيعُ أَنْ أَجْرِيَ.", "I am able to do"]] }
]},
// ---------------- DERS 7 ----------------
{ no: 7, kisa: "عِنْدَ الطَّبيبِ", ar: "عِنْدَ الطَّبيبِ", tr: "At the doctor's", ozet: "A patient with blood pressure and diabetes at the doctor's; diet and sport.", bloklar: [
 { t: "diyalog", resim: "tabib", kisiler: [{ ar: "الطَّبيبُ", tr: "Doctor" }, { ar: "المَريضُ", tr: "Patient" }], satir: [
  [0, "الضَّغْطُ مُرْتَفِعٌ، وَالسُّكَّرِيُّ أَيْضًا. ماذا حَدَثَ؟", "The blood pressure is high, and so is the sugar. What happened?", "d7-0"],
  [1, "تَناوَلْتُ دَواءَ الضَّغْطِ، وَدَواءَ السُّكَّرِيِّ.", "I took both the blood-pressure medicine and the sugar medicine.", "d7-1"],
  [0, "أَعْتَقِدُ أَنَّكَ لَمْ تَتَّبِعِ الحِمْيَةَ.", "I think you did not follow the diet.", "d7-2"],
  [1, "هذا صَحيحٌ، فَقَدْ تَناوَلْتُ كَثيرًا مِنَ السُّكَّرِيّاتِ وَالدُّهونِ وَالنَّشَوِيّاتِ.", "True; I ate a lot of sugary, fatty and starchy food.", "d7-3"],
  [0, "وَأَعْتَقِدُ أَنَّكَ لَمْ تُمارِسِ الرِّياضَةَ أَيْضًا.", "I think you did not do sport either.", "d7-4"],
  [1, "حاوَلْتُ ذلِكَ، وَلكِنْ لَمْ أَسْتَطِعْ، فَأَنا مَشْغولٌ دائِمًا.", "I tried but could not; I am always busy.", "d7-5"],
  [0, "حالَتُكَ خَطيرَةٌ. لا بُدَّ مِنَ الحِمْيَةِ، وَلا بُدَّ مِنَ الرِّياضَةِ. الدَّواءُ وَحْدَهُ لا يَكْفي.", "Your condition is serious. A diet is a must, sport is a must. Medicine alone is not enough.", "d7-6"],
  [1, "ماذا أَفْعَلُ يا دُكْتورُ؟", "What should I do, doctor?", "d7-7"],
  [0, "اتَّبِعِ الحِمْيَةَ، وَمارِسِ الرِّياضَةَ، وَتَناوَلِ الدَّواءَ، وَقابِلْني بَعْدَ شَهْرٍ.", "Follow the diet, do sport, take your medicine and come to me after a month.", "d7-8"],
  [0, "(بَعْدَ شَهْرٍ يُقابِلُ المَريضُ الطَّبيبَ) الضَّغْطُ عادِيٌّ، وَكَذلِكَ السُّكَّرِيُّ. ما شاءَ اللهُ! ماذا فَعَلْتَ؟", "(A month later the patient comes to the doctor.) The blood pressure is normal, and the sugar too. Masha'Allah! What did you do?", "d7-9"],
  [1, "اتَّبَعْتُ الحِمْيَةَ، وَمارَسْتُ الرِّياضَةَ، وَتَناوَلْتُ الدَّواءَ.", "I followed the diet, did sport and took my medicine.", "d7-10"],
  [0, "أَحْسَنْتَ. قابِلْني بَعْدَ سِتَّةِ أَشْهُرٍ.", "Well done. Come to me after six months.", "d7-11"],
  [1, "إِنْ شاءَ اللهُ، وَجَزاكَ اللهُ خَيْرًا.", "God willing; may God reward you with good.", "d7-12"]] },
 { t: "dy", ar: "اسْتيعابٌ — ضَعْ عَلامَةَ (✓) أَوْ (✗)، ثُمَّ صَحِّحِ الخَطَأَ", ogeler: [
  ["تَناوَلَ المَريضُ كَثيرًا مِنَ السُّكَّرِيّاتِ.", true, "", "The patient ate a lot of sugary food."],
  ["حاوَلَ المَريضُ مُمارَسَةَ الرِّياضَةِ.", true, "", "The patient tried to do sport."],
  ["كانَتْ حالَةُ المَريضِ خَطيرَةً.", true, "", "The patient's condition was serious."],
  ["بَعْدَ ثَلاثَةِ أَشْهُرٍ كانَ الضَّغْطُ عادِيًّا.", false, "بَعْدَ شَهْرٍ كانَ الضَّغْطُ عادِيًّا.", "After three months the blood pressure was normal."],
  ["اتَّبَعَ المَريضُ الحِمْيَةَ وَلَمْ يُمارِسِ الرِّياضَةَ.", false, "اتَّبَعَ المَريضُ الحِمْيَةَ، وَمارَسَ الرِّياضَةَ.", "The patient followed the diet but did not do sport."]] },
 { t: "secim", ar: "التَّدْريبُ (٢): أَجِبْ بِاخْتِصارٍ", ogeler: [
  ["لِماذا قابَلَ المَريضُ الطَّبيبَ؟", "لِأَنَّ الضَّغْطَ وَالسُّكَّرِيَّ مُرْتَفِعانِ.", ["لِأَنَّهُ يَشْعُرُ بِأَلَمٍ في بَطْنِهِ.", "لِيَشْتَرِيَ العَسَلَ."], "Why did the patient go to the doctor?"],
  ["ماذا قالَ لَهُ الطَّبيبُ؟", "حالَتُكَ خَطيرَةٌ، لا بُدَّ مِنَ الحِمْيَةِ وَالرِّياضَةِ.", ["أَنْتَ بِخَيْرٍ.", "تَناوَلِ العَسَلَ."], "What did the doctor say to him?"],
  ["لِماذا لَمْ يُمارِسِ المَريضُ الرِّياضَةَ؟", "لِأَنَّهُ مَشْغولٌ دائِمًا.", ["لِأَنَّهُ مَريضٌ.", "لِأَنَّهُ لا يُحِبُّ الرِّياضَةَ."], "Why did the patient not do sport?"],
  ["ماذا تَناوَلَ المَريضُ كَثيرًا؟", "السُّكَّرِيّاتِ وَالدُّهونَ وَالنَّشَوِيّاتِ.", ["الخُضْراواتِ وَالفَواكِهَ.", "السَّمَكَ وَالدَّجاجَ."], "What did the patient eat most?"],
  ["الدَّواءُ وَحْدَهُ لا يَكْفي، ماذا يَفْعَلُ المَريضُ؟", "يَتَّبِعُ الحِمْيَةَ، وَيُمارِسُ الرِّياضَةَ.", ["يَنامُ كَثيرًا.", "يَتْرُكُ الدَّواءَ."], "Medicine alone is not enough; what must the patient do?"],
  ["مَتى سَيُقابِلُ المَريضُ الطَّبيبَ؟", "بَعْدَ سِتَّةِ أَشْهُرٍ.", ["بَعْدَ شَهْرٍ.", "غَدًا."], "When will the patient meet the doctor?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — صِلْ بَيْنَ الكَلِمَتَيْنِ المُناسِبَتَيْنِ", ciftler: [
  ["الأَلَمُ", "شَديدٌ", "pain – severe"], ["الضَّغْطُ", "مُرْتَفِعٌ", "blood pressure – high"], ["الطَّعامُ", "كَثيرٌ", "food – a lot"], ["مَرْيَمُ", "سَمينَةٌ", "Maryam – fat"], ["الحالَةُ", "خَطيرَةٌ", "situation – serious"], ["أَحْمَدُ", "نَحيفٌ", "Ahmad – thin"]] },
 { t: "acik", ar: "التَّدْريبُ (٢): امْلَأِ الفَراغَ بِكَلِمَةٍ مُناسِبَةٍ مِنْ عِنْدِكَ", ogeler: [
  ["مارَسْتُ …", "مارَسْتُ الرِّياضَةَ.", "… I did"], ["قابَلْتُ …", "قابَلْتُ الطَّبيبَ.", "… I met with"], ["أَخَذْتُ …", "أَخَذْتُ الدَّواءَ.", "… I took"],
  ["تَناوَلْتُ …", "تَناوَلْتُ الطَّعامَ.", "… I ate"], ["اتَّبَعْتُ …", "اتَّبَعْتُ الحِمْيَةَ.", "… I followed"], ["شَرِبْتُ …", "شَرِبْتُ الحَليبَ.", "… I drank"]] }
]},
// ---------------- DERS 8 ----------------
{ no: 8, kisa: "زَمَنُ الفِعْلِ", ar: "زَمَنُ الفِعْلِ", tr: "The tense of the verb", ozet: "Past, present and future: سَـ / سَوْفَ.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الماضي ← الحاضِرُ ← المُسْتَقْبَلُ: سَـ / سَوْفَ + الحاضِرُ = المُسْتَقْبَلُ.", tr: "Past, present and future tense. When سَـ or سَوْفَ comes at the beginning of a present-tense verb, it becomes future tense." },
 { t: "tablo", bas: ["الماضي (past)", "الحاضِرُ (present)", "المُسْتَقْبَلُ (future)"], satir: [
  ["حَدَثَ", "يَحْدُثُ", "سَيَحْدُثُ"], ["تَزَوَّجَ", "يَتَزَوَّجُ", "سَوْفَ يَتَزَوَّجُ"], ["اعْتَمَرَ", "يَعْتَمِرُ", "سَوْفَ يَعْتَمِرُ"], ["سافَرَ", "يُسافِرُ", "سَوْفَ يُسافِرُ"]] },
 { t: "bosluk", ar: "التَّدْريبُ (١): اخْتَرِ الفِعْلَ المُناسِبَ مِمّا بَيْنَ القَوْسَيْنِ", aciklama: "Example: أَخي سَيُسافِرُ غَدًا إِلى مَكَّةَ. Look at the word of time: الآنَ، أَمْسِ، غَدًا…", ogeler: [
  ["أَخي ___ الآنَ إِلى مَكَّةَ.", "يُسافِرُ", ["سافَرَ", "سَيُسافِرُ"], "My brother is travelling to Mecca now."],
  ["أَخي ___ أَمْسِ إِلى مَكَّةَ.", "سافَرَ", ["يُسافِرُ", "سَيُسافِرُ"], "My brother went to Mecca yesterday."],
  ["هُدى ___ الكِتابَ قَبْلَ يَوْمَيْنِ.", "قَرَأَتْ", ["تَقْرَأُ", "سَتَقْرَأُ"], "Hudā read the book two days ago."],
  ["هُدى ___ الكِتابَ الآنَ.", "تَقْرَأُ", ["قَرَأَتْ", "سَتَقْرَأُ"], "Hudā is reading the book now."],
  ["هُدى ___ الكِتابَ بَعْدَ غَدٍ.", "سَتَقْرَأُ", ["قَرَأَتْ", "تَقْرَأُ"], "Hudā will read the book the day after tomorrow."]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٢): ضَعْ كُلَّ فِعْلٍ في مَكانِهِ المُناسِبِ مِنَ الجَدْوَلِ", soru: "Which tense?", gruplar: ["ماضٍ", "حاضِرٌ", "مُسْتَقْبَلٌ"], ogeler: [
  ["يَسْكُنُ", 1], ["سَيُفَكِّرُ", 2], ["يَأْخُذُ", 1], ["أَحْسَنَ", 0], ["سَيَتَناوَلُ", 2], ["سَوْفَ يَنْجَحُ", 2], ["سافَرَ", 0], ["سَيَقْرَأُ", 2],
  ["اشْتَرى", 0], ["يَشْعُرُ", 1], ["سَيَسْمَعُ", 2], ["ذَهَبَ", 0], ["يَشْتَكي", 1], ["أَمَرَ", 0], ["يَنْقُصُ", 1]] }
]},
// ---------------- DERS 9 ----------------
{ no: 9, kisa: "فَهْمُ المَسْموعِ", ar: "فَهْمُ المَسْموعِ وَالكَلامُ", tr: "Listening and speaking", ozet: "Listen to Fāṭima's story; talk about their health conditions.", bloklar: [
 { t: "dinle", s: "l9", ar: "اسْتَمِعْ إِلى النَّصِّ", aciklama: "Listen first, then answer the questions.", metin: [
  ["شَعَرَتْ فاطِمَةُ قَبْلَ عَشْرِ سَنَواتٍ بِآلامٍ شَديدَةٍ، أَصْبَحَتْ تَنامُ كَثيرًا، وَلا تَسْتَطيعُ العَمَلَ.", "Ten years ago Fāṭima felt severe pains; she slept a lot and was unable to work."],
  ["ذَهَبَتْ فاطِمَةُ إِلى الطَّبيبَةِ الَّتي فَحَصَتْها، وَقالَتْ لَها: أَنْتِ مَريضَةٌ بِالسُّكَّرِيِّ، اتَّبِعِي الحِمْيَةَ، وَمارِسِي الرِّياضَةَ.", "Fāṭima went to the doctor; the doctor examined her and said: You have diabetes; follow a diet and do sport."],
  ["وَفي هذِهِ الوَرَقَةِ أَنْواعُ الطَّعامِ وَالشَّرابِ الَّتي يَتَناوَلُها مَريضُ السُّكَّرِيِّ، وَالأَنْواعُ الَّتي لا يَتَناوَلُها.", "On this paper are the kinds of food and drink that a diabetic eats and drinks and does not eat."],
  ["كانَتْ هذِهِ المُقابَلَةُ قَبْلَ عَشْرِ سَنَواتٍ، لَمْ تَذْهَبْ بَعْدَها فاطِمَةُ إِلى الطَّبيبَةِ ثانِيَةً؛ فَهِيَ بِخَيْرٍ وَصِحَّةٍ جَيِّدَةٍ، وَلا تَشْعُرُ بِآلامٍ،", "This meeting was ten years ago; Fāṭima did not go to the doctor again after that. She is well and healthy, and feels no pain;"],
  ["لِأَنَّها مُنْذُ عَشْرِ سَنَواتٍ تَتَّبِعُ الحِمْيَةَ، وَتُمارِسُ الرِّياضَةَ كُلَّ يَوْمٍ.", "because for ten years she has followed the diet and done sport every day."]],
  not: "In the recording there may be small differences such as “بِآلامٍ في مَعِدَتِها”; the text is written according to the recording." },
 { t: "secim", ar: "اسْتَمِعْ إِلى النَّصِّ، ثُمَّ اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["شَعَرَتْ فاطِمَةُ بِآلامٍ …", "شَديدَةٍ", ["في بَطْنِها", "في رَأْسِها"], "Fāṭima felt … pains."],
  ["مَريضُ السُّكَّرِيِّ …", "يَتَّبِعُ الحِمْيَةَ وَيُمارِسُ الرِّياضَةَ", ["يَتَّبِعُ الحِمْيَةَ", "يُمارِسُ الرِّياضَةَ"], "A diabetic …"],
  ["ذَهَبَتْ فاطِمَةُ إِلى الطَّبيبَةِ …", "قَبْلَ عَشْرِ سَنَواتٍ", ["بَعْدَ خَمْسِ سَنَواتٍ", "بَعْدَ عَشْرِ سَنَواتٍ"], "Fāṭima went to the doctor …"],
  ["فاطِمَةُ الآنَ …", "لا تُقابِلُ الطَّبيبَةَ", ["تُقابِلُ الطَّبيبَةَ", "تَتَناوَلُ الدَّواءَ"], "Fāṭima is now …"],
  ["أَعْطَتِ الطَّبيبَةُ فاطِمَةَ وَرَقَةً فيها أَنْواعُ …", "الطَّعامِ وَالشَّرابِ", ["الأَدْوِيَةِ", "الحِمْيَةِ وَالرِّياضَةِ"], "The doctor gave Fāṭima a paper with … kinds in it."]] },
 { t: "acik", ar: "تَكَلَّمْ — التَّدْريبُ (١): ماذا يَفْعَلُ كُلُّ واحِدٍ؟", aciklama: "In each case, what should the person do? Say it, then look at the example.", ogeler: [
  ["شَخْصٌ يَشْعُرُ بِآلامٍ شَديدَةٍ في البَطْنِ.", "يَذْهَبُ إِلى الطَّبيبِ، وَيَتَناوَلُ الدَّواءَ أَوِ العَسَلَ.", "Someone who feels a severe pain in his stomach."],
  ["شَخْصٌ مَريضٌ بِالسُّكَّرِيِّ.", "يَتَّبِعُ الحِمْيَةَ، وَيُمارِسُ الرِّياضَةَ، وَيَتَناوَلُ الدَّواءَ.", "Someone who has diabetes."],
  ["شَخْصٌ مَريضٌ بِالبَدانَةِ.", "يَتْرُكُ السُّكَّرِيّاتِ وَالدُّهونَ، وَيُمارِسُ الرِّياضَةَ.", "Someone who suffers from obesity."],
  ["شَخْصٌ نَحيفٌ جِدًّا.", "يَتَناوَلُ كَثيرًا مِنَ الطَّعامِ المُفيدِ.", "Someone who is very thin."],
  ["شَخْصٌ يُريدُ أَنْ يَكونَ صَحيحًا.", "يَتَّبِعُ الحِمْيَةَ، وَيُمارِسُ الرِّياضَةَ كُلَّ يَوْمٍ.", "Someone who wants to be healthy."]] },
 { t: "resim", ar: "التَّدْريبُ (٢): قارِنْ بَيْنَ الصّورَتَيْنِ", aciklama: "Compare the two pictures; talk about them with your friend.", resimler: [
  ["samin", "هذا الرَّجُلُ سَمينٌ، يَأْكُلُ كَثيرًا، وَلا يُمارِسُ الرِّياضَةَ.", "The first picture"], ["nahif", "هذا الشّابُّ نَحيفٌ، يَأْكُلُ قَليلًا، وَيُمارِسُ الرِّياضَةَ.", "The second picture"]] }
]},
// ---------------- DERS 10 ----------------
{ no: 10, kisa: "الصِّحَّةُ بَيْنَ الماضي وَالحاضِرِ", ar: "الصِّحَّةُ بَيْنَ الماضي وَالحاضِرِ", tr: "Health in the Past and Today", ozet: "Reading text: obesity was once a sign of health, today of illness.", bloklar: [
 { t: "hazirlik", ar: "تَهْيِئَةٌ — فَكِّرْ في الإِجابَةِ عَنِ الأَسْئِلَةِ التّالِيَةِ", ogeler: [
  ["مَنْ يَتَناوَلُ طَعامًا كَثيرًا: النَّحيفُ أَمِ السَّمينُ؟", "Who eats a lot: the thin or the fat?"], ["ماذا تُفَضِّلُ: الدَّجاجَ، أَمِ السَّمَكَ، أَمِ اللَّحْمَ؟ لِماذا؟", "Which do you prefer: chicken, fish or meat? Why?"],
  ["هَلْ يَدْعو الإِسْلامُ إِلى الأَكْلِ الكَثيرِ؟", "Does Islam call to eating a lot?"], ["مَنِ الَّذي يَتَّبِعُ الحِمْيَةَ: السَّمينُ أَمِ النَّحيفُ؟", "Who follows a diet: the fat or the thin?"]] },
 { t: "metin", resim: ["badin", "burger"], paragraf: [
  [["كانَتْ عَلامَةُ الصِّحَّةِ -في الماضي- أَنْ يَكونَ الإِنْسانُ سَمينًا، كَثيرَ اللَّحْمِ وَالشَّحْمِ.", "In the past, the sign of health was for a person to be fat, fleshy and greasy.", "m10-0"],
   ["فَالإِنْسانُ السَّمينُ هُوَ الصَّحيحُ، وَالإِنْسانُ النَّحيفُ هُوَ المَريضُ.", "The fat person was considered healthy, the thin person ill.", "m10-1"],
   ["وَكانَ النّاسُ يَأْكُلونَ كَثيرًا، إِذا وَجَدوا الطَّعامَ. وَكانَ الرِّجالُ يُفَضِّلونَ الزَّواجَ بِالمَرْأَةِ السَّمينَةِ، وَلا يُحِبّونَ الزَّواجَ بِالمَرْأَةِ النَّحيفَةِ.", "People ate a lot when they found food. Men preferred to marry a fat woman and did not like to marry a thin woman.", "m10-2"]],
  [["تَقَدَّمَ الطِّبُّ كَثيرًا الآنَ، وَظَهَرَ أَنَّ هُناكَ أَمْراضًا تُصيبُ الشَّخْصَ السَّمينَ، وَهِيَ أَمْراضٌ خَطيرَةٌ، مِثْلُ: أَمْراضِ القَلْبِ، وَالسُّكَّرِيِّ، وَضَغْطِ الدَّمِ.", "Medicine has advanced a great deal today, and it has become clear that there are serious diseases that strike the fat person: heart diseases, diabetes and high blood pressure.", "m10-3"],
   ["لَقَدْ أَصْبَحَتِ البَدانَةُ -اليَوْمَ- عَلامَةً عَلى المَرَضِ، وَأَخَذَ النّاسُ يَتَّبِعونَ الحِمْيَةَ، فَيَتَناوَلونَ طَعامًا قَليلًا، وَيَبْتَعِدونَ عَنِ السُّكَّرِيّاتِ وَالدُّهونِ وَالنَّشَوِيّاتِ.", "Today obesity has become a sign of illness; people have started diets: they eat little; they keep away from sugar, fat and starch.", "m10-4"]],
  [["وَأَصْبَحَ الأَطِبّاءُ يُحَذِّرونَ النّاسَ مِنَ الطَّعامِ الأَبْيَضِ، وَالحَليبِ كامِلِ الدَّسَمِ. قائِلينَ: ابْتَعِدْ عَنِ السُّكَّرِ. ضَعْ قَليلًا مِنْهُ في الطَّعامِ. لا تَأْكُلِ الخُبْزَ الأَبْيَضَ، كُلِ الخُبْزَ الأَسْمَرَ. لا تَأْكُلِ الأَرُزَّ الأَبْيَضَ، كُلِ الأَرُزَّ الأَسْمَرَ.", "Doctors warn people against white foods and full-fat milk: Keep away from sugar, put little in the food. Do not eat white bread, eat brown bread. Do not eat white rice, eat brown rice.", "m10-5"],
   ["وَأَصْبَحَ النّاسُ يَتَّبِعونَ الحِمْيَةَ، فَيَأْكُلونَ قَليلًا مِنَ اللَّحْمِ الأَحْمَرِ وَالبَيْضِ، وَيَتَناوَلونَ كَثيرًا مِنَ السَّمَكِ وَالدَّجاجِ وَالخُضْراواتِ وَالفَواكِهِ.", "People follow diets: they eat little red meat and few eggs; they eat a lot of fish, chicken, vegetables and fruit.", "m10-6"]],
  [["دَعا الإِسْلامُ إِلى الحِمْيَةِ؛ لِأَنَّ الأَكْلَ الكَثيرَ يُصيبُ الإِنْسانَ بِالبَدانَةِ. قالَ تَعالى: ﴿وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ﴾ [الأعراف: ٣١].", "Islam called to dieting, because eating a lot leads a person to obesity. God Almighty said: “Eat and drink; and do not be wasteful. Indeed, He does not like the wasteful.”", "m10-7"],
   ["وَقالَ الرَّسولُ ﷺ: «ما مَلَأَ آدَمِيٌّ وِعاءً شَرًّا مِنْ بَطْنٍ، بِحَسْبِ ابْنِ آدَمَ أُكُلاتٌ يُقِمْنَ صُلْبَهُ، فَإِنْ كانَ لا مَحالَةَ، فَثُلُثٌ لِطَعامِهِ، وَثُلُثٌ لِشَرابِهِ، وَثُلُثٌ لِنَفَسِهِ».", "The Messenger of God (peace and blessings be upon him) said: “The son of Adam has filled no vessel worse than his stomach. A few morsels to keep his back straight are enough for the son of Adam. If he must, then a third for his food, a third for his drink and a third for his breath.”", "m10-8"]]] },
 { t: "siniflandir", ar: "اسْتيعابٌ — التَّدْريبُ (١): الماضي أَمِ الآنَ؟", aciklama: "According to what you read, does each sentence fit the past or today?", soru: "Past or present?", gruplar: ["الماضي", "الآنَ"], ogeler: [
  ["الإِنْسانُ النَّحيفُ هُوَ الجَميلُ.", 1], ["البَدانَةُ عَلامَةُ المَرَضِ.", 1], ["المَرْأَةُ النَّحيفَةُ مَريضَةٌ.", 0], ["يَتَناوَلُ النّاسُ طَعامًا كَثيرًا.", 0], ["يَبْتَعِدُ النّاسُ عَنِ الدُّهونِ.", 1]] },
 { t: "secim", ar: "التَّدْريبُ (٢): اخْتَرِ الفِكْرَةَ الرَّئيسَةَ في كُلِّ فِقْرَةٍ", ogeler: [
  ["في الفِقْرَةِ الأولى:", "الإِنْسانُ السَّمينُ أَفْضَلُ مِنَ النَّحيفِ.", ["يُفَضِّلُ الرِّجالُ المَرْأَةَ السَّمينَةَ.", "كانَ النّاسُ يَأْكُلونَ كَثيرًا."], "The main idea of the first paragraph"],
  ["في الفِقْرَةِ الثّانِيَةِ:", "البَدانَةُ عَلامَةٌ عَلى المَرَضِ.", ["يَبْتَعِدُ النّاسُ عَنِ السُّكَّرِيّاتِ وَالدُّهونِ.", "أَمْراضُ القَلْبِ وَالسُّكَّرِيُّ وَضَغْطُ الدَّمِ أَمْراضٌ خَطيرَةٌ."], "The main idea of the second paragraph"],
  ["في الفِقْرَةِ الثّالِثَةِ يُحَذِّرُ الأَطِبّاءُ مِنَ:", "الطَّعامِ الأَبْيَضِ.", ["اللَّحْمِ وَالبَيْضِ.", "السُّكَّرِ وَالخُبْزِ."], "In the third paragraph, why do the doctors warn?"],
  ["في الفِقْرَةِ الأَخيرَةِ يَدْعو الإِسْلامُ إِلى:", "الحِمْيَةِ.", ["الأَكْلِ الكَثيرِ.", "الأَكْلِ القَليلِ."], "In the last paragraph, what does Islam call to?"]] },
 { t: "esle", ar: "مُفْرَداتٌ — صِلْ بَيْنَ الكَلِمَتَيْنِ المُتَضادَّتَيْنِ", aciklama: "Match the antonyms.", ciftler: [
  ["يَتَشابَهُ", "يَخْتَلِفُ", "similar – different"], ["صَحيحٌ", "مَريضٌ", "healthy – ill"], ["مَرَضٌ", "صِحَّةٌ", "illness – health"], ["يَزيدُ", "يَنْقُصُ", "increases – decreases"], ["سَمينٌ", "نَحيفٌ", "fat – thin"], ["كَثيرٌ", "قَليلٌ", "much – little"]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٢): ما يُناسِبُ مَريضَ السُّكَّرِيِّ وَالضَّغْطِ (✓) وَما لا يُناسِبُهُ (✗)", soru: "Is it suitable for someone with diabetes and high blood pressure?", gruplar: ["✓ يُناسِبُ", "✗ لا يُناسِبُ"], ogeler: [
  ["سَمَكٌ", 0], ["سُكَّرٌ", 1], ["خُبْزٌ أَبْيَضُ", 1], ["دَجاجٌ", 0], ["مِلْحٌ", 1], ["دُهونٌ", 1], ["فَواكِهُ", 0], ["لَحْمٌ", 1], ["خُضْراواتٌ", 0], ["خُبْزٌ أَسْمَرُ", 0]] }
]},
// ---------------- DERS 11 ----------------
{ no: 11, kisa: "أَقْسامُ الكَلِمَةِ", ar: "أَقْسامُ الكَلِمَةِ", tr: "The parts of speech", ozet: "Noun, verb and particle.", bloklar: [
 { t: "kural", ar: "مُلاحَظَةٌ نَحْوِيَّةٌ", metin: "الكَلِمَةُ ثَلاثَةُ أَقْسامٍ: اسْمٌ، وَفِعْلٌ، وَحَرْفٌ.", tr: "The word is of three parts: noun, verb and particle." },
 { t: "tablo", bas: ["اسْمٌ (noun)", "فِعْلٌ (verb)", "حَرْفٌ (particle)"], satir: [
  ["مُحَمَّدٌ", "جَلَسَ", "وَ"], ["زَيْنَبُ", "مارَسَ", "أَوْ"], ["النّاسُ", "يَحْمِلُ", "مِنْ"], ["الوَقْتُ", "يُفَضِّلُ", "في"], ["الماءُ", "يَخْتَلِفُ", "عَلى"], ["الدَّجاجُ", "اذْهَبْ", "أَنْ"], ["خِيارٌ", "تَناوَلْ", "لَمْ"]] },
 { t: "siniflandir", ar: "التَّدْريبُ (١): ضَعْ كَلِماتِ الصُّنْدوقِ تَحْتَ الأَقْسامِ التّالِيَةِ", soru: "Noun, verb or particle?", gruplar: ["اسْمٌ", "فِعْلٌ", "حَرْفٌ"], ogeler: [
  ["قَرَأَ", 1], ["إِلى", 2], ["لَمْ", 2], ["يَشْرَبُ", 1], ["سَمَكٌ", 0], ["خُبْزٌ", 0], ["بَيْضٌ", 0], ["يُصَلّي", 1], ["عَمٌّ", 0], ["يَقولُ", 1], ["سافَرَ", 1],
  ["مِنْ", 2], ["وَ", 2], ["أَوْ", 2], ["يَنامُ", 1], ["خَوْلَةُ", 0], ["رَسولٌ", 0], ["عَلى", 2], ["عَصْرٌ", 0], ["صَلاةٌ", 0], ["ثُمَّ", 2]] },
 { t: "siniflandir", ar: "التَّدْريبُ (٢): عَيِّنْ نَوْعَ الكَلِمَةِ الَّتي تَحْتَها خَطٌّ", aciklama: "Example: ابْتَعِدْ [[عَنِ]] السُّكَّرِ ← حَرْفٌ.", soru: "What is the underlined word?", gruplar: ["اسْمٌ", "فِعْلٌ", "حَرْفٌ"], ogeler: [
  ["[[نَهى]] الإِسْلامُ عَنِ الإِسْرافِ.", 1], ["الأَكْلُ الكَثيرُ يَضُرُّ [[الإِنْسانَ]].", 0], ["[[يُحَذِّرُ]] الأَطِبّاءُ النّاسَ.", 1], ["أَصْبَحَتِ البَدانَةُ عَلامَةً [[عَلى]] المَرَضِ.", 2], ["تَقَدَّمَ [[الطِّبُّ]] كَثيرًا.", 0],
  ["نَتَناوَلُ كَثيرًا [[مِنَ]] السَّمَكِ.", 2], ["[[أَصْبَحَ]] النّاسُ يَتَّبِعونَ الحِمْيَةَ.", 1], ["يَأْكُلونَ قَليلًا [[مِنَ]] اللَّحْمِ.", 2], ["هُناكَ [[أَمْراضٌ]] تُصيبُ الشَّخْصَ السَّمينَ.", 0]] },
 { t: "acik", ar: "التَّدْريبُ (٣): اقْرَأِ الآياتِ، وَبَيِّنْ نَوْعَ الكَلِماتِ الَّتي فيها", aciklama: "Say whether each word is a noun, verb or particle; then look at the answer.", ogeler: [
  ["﴿فيهِ شِفاءٌ لِلنّاسِ﴾ [النحل: ٦٩]", "في: حَرْفٌ · هِ: اسْمٌ (ضَميرٌ) · شِفاءٌ: اسْمٌ · لِـ: حَرْفٌ · النّاسِ: اسْمٌ", "In it is healing for people."],
  ["﴿قُلْ أَعوذُ بِرَبِّ النّاسِ﴾ [الناس: ١]", "قُلْ: فِعْلٌ · أَعوذُ: فِعْلٌ · بِـ: حَرْفٌ · رَبِّ: اسْمٌ · النّاسِ: اسْمٌ", "Say: I seek refuge in the Lord of mankind."],
  ["﴿الَّذي عَلَّمَ بِالقَلَمِ﴾ [العلق: ٤]", "الَّذي: اسْمٌ · عَلَّمَ: فِعْلٌ · بِـ: حَرْفٌ · القَلَمِ: اسْمٌ", "Who taught by the pen."],
  ["﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذي خَلَقَ﴾ [العلق: ١]", "اقْرَأْ: فِعْلٌ · بِـ: حَرْفٌ · اسْمِ: اسْمٌ · رَبِّ: اسْمٌ · كَ: اسْمٌ (ضَميرٌ) · الَّذي: اسْمٌ · خَلَقَ: فِعْلٌ", "Read in the name of your Lord who created."],
  ["﴿وَالعَصْرِ ۝ إِنَّ الإِنْسانَ لَفي خُسْرٍ﴾ [العصر: ١-٢]", "وَ: حَرْفٌ · العَصْرِ: اسْمٌ · إِنَّ: حَرْفٌ · الإِنْسانَ: اسْمٌ · لَـ: حَرْفٌ · في: حَرْفٌ · خُسْرٍ: اسْمٌ", "By time, indeed mankind is in loss."],
  ["﴿إِذا جاءَ نَصْرُ اللهِ وَالفَتْحُ﴾ [النصر: ١]", "إِذا: اسْمٌ (ظَرْفٌ) · جاءَ: فِعْلٌ · نَصْرُ: اسْمٌ · اللهِ: اسْمٌ · وَ: حَرْفٌ · الفَتْحُ: اسْمٌ", "When the help of God and the victory come."],
  ["﴿قُلْ هُوَ اللهُ أَحَدٌ﴾ [الإخلاص: ١]", "قُلْ: فِعْلٌ · هُوَ: اسْمٌ (ضَميرٌ) · اللهُ: اسْمٌ · أَحَدٌ: اسْمٌ", "Say: He is God, One."]] }
]},
// ---------------- DERS 12 ----------------
{ no: 12, kisa: "تَعْبيرٌ مُوَجَّهٌ", ar: "تَعْبيرٌ مُوَجَّهٌ", tr: "Guided expression", ozet: "Make sentences, compare pictures, write advice; punctuation.", bloklar: [
 { t: "sirala", ar: "التَّدْريبُ (١): رَتِّبِ الكَلِماتِ، لِتُصْبِحَ جُمْلَةً", aciklama: "أَنْ - زَيْنَبُ - سَمينَةً - تُريدُ - تَكونَ", ogeler: ["تُريدُ", "زَيْنَبُ", "أَنْ", "تَكونَ", "سَمينَةً"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "مِثْلَكَ - أَشْعُرُ - في - بِآلامٍ - كُنْتُ - البَطْنِ", ogeler: ["كُنْتُ", "مِثْلَكَ", "أَشْعُرُ", "بِآلامٍ", "في", "البَطْنِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "الطَّعامِ - مِنْ - كَثيرًا - مُحَمَّدٌ - يَتَناوَلُ - أَخَذَ", ogeler: ["أَخَذَ", "مُحَمَّدٌ", "يَتَناوَلُ", "كَثيرًا", "مِنَ", "الطَّعامِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "بِـ - الإِنْسانَ - يُصيبُ - البَدانَةِ - الكَثيرُ - الأَكْلُ", ogeler: ["الأَكْلُ", "الكَثيرُ", "يُصيبُ", "الإِنْسانَ", "بِالبَدانَةِ"] },
 { t: "sirala", ar: "رَتِّبِ الكَلِماتِ", aciklama: "الحِمْيَةَ - مِنْ - المَرْضى - كَثيرٌ - أَصْبَحَ - يَتَّبِعونَ", ogeler: ["أَصْبَحَ", "كَثيرٌ", "مِنَ", "المَرْضى", "يَتَّبِعونَ", "الحِمْيَةَ"] },
 { t: "resim", ar: "التَّدْريبُ (٢): قارِنْ بَيْنَ غِذاءِ النّاسِ في الماضي وَغِذائِهِمْ في الوَقْتِ الحاضِرِ", aciklama: "Describe each picture in three sentences.", resimler: [
  ["qadim", "في الماضي كانَ النّاسُ يَأْكُلونَ الخُبْزَ وَالبَيْضَ وَالجُبْنَ وَالزَّيْتونَ، وَكانَ طَعامُهُمْ طَبيعِيًّا.", "In the past"], ["pizza", "الآنَ يَأْكُلُ النّاسُ البيتْزا وَالطَّعامَ السَّريعَ، وَفيهِ دُهونٌ كَثيرَةٌ.", "Today"]] },
 { t: "resim", ar: "التَّدْريبُ (٣): اكْتُبْ نَصائِحَ مُناسِبَةً مُسْتَعينًا بِالصُّوَرِ", aciklama: "Example: لا تَشْرَبِ الحَليبَ كامِلَ الدَّسَمِ.", resimler: [
  ["n_halib", "لا تَشْرَبِ الحَليبَ كامِلَ الدَّسَمِ.", "Milk"], ["n_shay", "لا تَضَعْ كَثيرًا مِنَ السُّكَّرِ في الشّايِ.", "Sweet tea"], ["n_burger", "لا تَأْكُلْ كَثيرًا مِنَ الطَّعامِ السَّريعِ.", "Hamburger"],
  ["n_samak", "كُلِ السَّمَكَ كَثيرًا.", "Fish"], ["n_ruz", "لا تَأْكُلِ الأَرُزَّ الأَبْيَضَ، كُلِ الأَرُزَّ الأَسْمَرَ.", "Rice and meat"], ["n_fakiha", "كُلِ الفَواكِهَ كُلَّ يَوْمٍ.", "Fruit"]] },
 { t: "tablo", ar: "عَلاماتُ التَّرْقيمِ (أ)", baslik: "Punctuation marks", tts: false, bas: ["نُقْطَةٌ (full stop)", "عَلامَةُ اسْتِفْهامٍ (question mark)", "فاصِلَةٌ (comma)", "عَلامَةُ تَعَجُّبٍ (exclamation mark)"], satir: [[".", "؟", "،", "!"]] },
 { t: "secim", ar: "ضَعْ عَلامَةَ التَّرْقيمِ المُناسِبَةَ", ogeler: [
  ["تَناوَلْتُ الدَّواءَ ___", ".", ["؟", "!"], "I took the medicine."], ["مِنْ أَيْنَ أَشْتَريهِ ___", "؟", [".", "،"], "Where can I get it?"],
  ["زَيْنَبُ نَحيفَةٌ ___ وَمَرْيَمُ سَمينَةٌ.", "،", ["؟", "!"], "Zaynab is thin, Maryam is fat."], ["سُبْحانَ اللهِ ___", "!", ["؟", "،"], "Glory be to God!"]] }
]},
// ---------------- DERS 13 ----------------
{ no: 13, kisa: "الخَطُّ وَالإِمْلاءُ", ar: "الخَطُّ وَالإِمْلاءُ", tr: "Calligraphy and spelling", ozet: "Naskh letters; alif maqṣūra and yāʾ.", bloklar: [
 { t: "hat", ar: "الخَطُّ: خَطُّ النَّسْخِ", aciklama: "Write the letters in your notebook in naskh script.", ogeler: [
  ["Letters that do not descend below the line:", "ا ب ت ث د ذ ط ظ ف"], ["Letters some of which descend below the line:", "ج ح خ ر ز س ش ص ض ع غ ق ل م ن هـ و ي"]] },
 { t: "tablo", ar: "الإِمْلاءُ: الأَلِفُ المَقْصورَةُ وَالياءُ", baslik: "Alif maqṣūra (ى) and yāʾ (ي)", bas: ["الأَلِفُ المَقْصورَةُ (ى)", "الياءُ (ي)"], satir: [
  ["عَلى", "عَلِيٌّ"], ["اشْتَرى", "أَشْتَري"], ["صَلّى", "يُصَلّي"], ["انْتَهى", "تَنْتَهي"], ["إِلى", "نَقِيٌّ"], ["مَتى", "سورِيٌّ"], ["مُسْتَشْفى", "ثانَوِيٌّ"]],
  not: "Alif maqṣūra (ى) has no dots and is read “ā”; yāʾ (ي) has two dots." },
 { t: "bosluk", ar: "تَدْريبٌ: حَوِّلِ الفِعْلَ كَما في المِثالِ", aciklama: "Example: جَرى ← يَجْري. The ى at the end of the past becomes ي in the present.", ogeler: [
  ["مَشى ← ___", "يَمْشي", ["يَمْشى", "يَمْشو"]], ["قَضى ← ___", "يَقْضي", ["يَقْضى", "قَضي"]], ["أَتى ← ___", "يَأْتي", ["يَأْتى", "يُؤْتي"]], ["دَرى ← ___", "يَدْري", ["يَدْرى", "يَدْرو"]],
  ["أَعْطى ← ___", "يُعْطي", ["يُعْطى", "يَعْطي"]], ["أَغْنى ← ___", "يُغْني", ["يُغْنى", "يَغْني"]], ["لَبّى ← ___", "يُلَبّي", ["يُلَبّى", "يَلْبي"]], ["أَمْسى ← ___", "يُمْسي", ["يُمْسى", "يَمْسي"]], ["أَهْدى ← ___", "يُهْدي", ["يُهْدى", "يَهْدي"]]] }
]}
];
var KELIME = [
 ["مَريضٌ", "ill", 1], ["أَلَمٌ ج آلامٌ", "pain", 1], ["بَطْنٌ", "stomach, belly", 1], ["طَبيبٌ ج أَطِبّاءُ", "doctor", 1], ["دَواءٌ ج أَدْوِيَةٌ", "medicine", 1], ["صَحابِيٌّ", "Companion", 1], ["عالَجَ", "he treated", 1],
 ["اشْتَكى", "he complained", 1], ["سَقى", "he gave to drink", 1], ["عَسَلٌ", "honey", 1], ["شُفِيَ", "he recovered", 1], ["شِفاءٌ", "healing", 1], ["مَحَلٌّ ج مَحَلّاتٌ", "shop", 1], ["سوقٌ", "market", 1], ["اشْتَرى", "he bought", 1], ["تَناوَلَ", "he took, he ate", 1], ["شَعَرَ بِـ", "he felt", 1],
 ["قارورَةٌ", "jar, bottle", 4], ["نَوْعٌ ج أَنْواعٌ", "kind, type", 4], ["بائِعٌ", "seller", 4], ["مُشْتَرٍ", "buyer", 4], ["مَعِدَةٌ", "stomach", 4],
 ["صَديقَةٌ", "girl friend", 5], ["تَشابَهَ", "he resembled", 5], ["اخْتَلَفَ", "he differed", 5], ["نَحيفٌ", "weak", 5], ["سَمينٌ", "fat", 5], ["وَزْنٌ", "weight", 5], ["زادَ", "it increased", 5], ["نَقَصَ", "it decreased", 5], ["حاوَلَ", "he tried", 5], ["نَجَحَ", "he succeeded", 5],
 ["مارَسَ الرِّياضَةَ", "he did sport", 5], ["ظَلَّ", "he stayed, continued", 5], ["سُكَّرِيّاتٌ", "sugary foods", 5], ["نَشَوِيّاتٌ", "starchy foods", 5], ["حَلْوى", "sweets", 5], ["مُرَبّى", "jam", 5], ["جُبْنٌ", "cheese", 5],
 ["ضَغْطٌ", "blood pressure", 7], ["مُرْتَفِعٌ", "tall", 7], ["سُكَّرِيٌّ", "diabetes", 7], ["حِمْيَةٌ", "diet", 7], ["اتَّبَعَ", "he followed", 7], ["دُهونٌ", "fats", 7], ["مَشْغولٌ", "busy", 7], ["خَطيرٌ", "serious, dangerous", 7], ["لا بُدَّ مِنْ", "… is a must", 7], ["عادِيٌّ", "normal", 7],
 ["مَرَضٌ ج أَمْراضٌ", "illness", 10], ["صِحَّةٌ", "health", 10], ["بَدانَةٌ", "obesity", 10], ["شَحْمٌ", "visceral fat", 10], ["قَلْبٌ", "heart", 10], ["حَذَّرَ", "he warned against", 10], ["ابْتَعَدَ عَنْ", "he kept away", 10], ["كامِلُ الدَّسَمِ", "full-fat", 10], ["أَسْمَرُ", "brown", 10], ["خُضْراواتٌ", "vegetables", 10], ["أَسْرَفَ", "he wasted", 10]
];
