// ================= VERİ: el-Arabiyyetü beyne yedeyk 3 — الاخْتِبارُ الثّاني (الوَحَداتُ ٥ - ٨) =================
// Kitaptaki ikinci sınav: dört bölüm. Metinlerin asıl kaydı yok; gömülü okunuşla çalar.
var UNITE = { no: "5–8", ar: "الاخْتِبارُ الثّاني", tr: "Second Exam · Units 5–8", pfx: "k3s2:", sinavYok: true, sonuc: true,
  giris: "The second exam after Units 5–8 of the book: reading (hadiths and the codification of the Sunna), vocabulary, grammar and morphology, writing. Solve each section; your answer is checked immediately, and the total result appears at the bottom of this page. For open-ended questions, first answer yourself, then look at the sample answer." };
var DERSLER = [
// ---------------- 1. OKUMA ----------------
{ no: 1, etiket: "Reading", kisa: "القِراءَةُ", ar: "أَوَّلًا: القِراءَةُ", tr: "Reading", ozet: "Three hadiths and a text on the codification of the Sunna; 28 questions", bloklar: [
 { t: "secim", ar: "اقْرَأْ كُلَّ حَديثٍ مِنَ الأَحاديثِ التّالِيَةِ، ثُمَّ أَجِبْ عَمّا يَليهِ مِنَ الأَسْئِلَةِ", ogeler: [
  ["قالَ الرَّسولُ ﷺ: «الجَنَّةُ تَحْتَ أَقْدامِ الأُمَّهاتِ». (١) هذا الحَديثُ يَحُثُّنا عَلى حُسْنِ مُعامَلَةِ ...", "الوالِدَةِ", ["الوالِدَيْنِ", "الوالِدِ"], "“Paradise lies beneath the feet of mothers.” This hadith encourages us to treat … well."],
  ["قالَ الرَّسولُ ﷺ: «تَنَزَّهوا مِنَ البَوْلِ؛ فَإِنَّ عامَّةَ عَذابِ القَبْرِ مِنْهُ». (٢) مِنْ هذا الحَديثِ نَعْرِفُ أَنَّهُ يَجِبُ أَنْ نَحْرِصَ عَلى تَجَنُّبِ ...", "البَوْلِ", ["القُبورِ", "النَّجاساتِ"], "“Beware of urine; most of the punishment of the grave is because of it.” From this hadith we understand that we must beware of …", "The hadith speaks directly of urine; urine is also among the impurities."],
  ["قالَ الرَّسولُ ﷺ: «إِذا اسْتَيْقَظَ أَحَدُكُمْ مِنْ نَوْمِهِ، فَلا يُدْخِلْ يَدَهُ في الإِناءِ، حَتّى يَغْسِلَها ثَلاثًا». (٣) في هذا الحَديثِ دَعْوَةٌ إِلى ...", "النَّظافَةِ", ["النَّوْمِ مُبَكِّرًا", "غَسْلِ الإِناءِ"], "“When one of you wakes from sleep, let him not put his hand into the vessel until he has washed it three times.” In this hadith there is a call to …"]] },
 { t: "metin", baslik: "Text", ar: "اقْرَأِ النَّصَّ التّالِيَ، ثُمَّ أَجِبْ عَمّا يَليهِ مِنْ أَسْئِلَةٍ", paragraf: [
  [["أَمَرَ اللهُ - سُبْحانَهُ وَتَعالى - الرَّسولَ ﷺ أَنْ يُبَلِّغَ القُرْآنَ الكَريمَ بِكُلِّ دِقَّةٍ وَأَمانَةٍ، وَقَدْ جاءَ هذا الأَمْرُ في قَوْلِهِ تَعالى: ﴿يا أَيُّهَا الرَّسولُ بَلِّغْ ما أُنْزِلَ إِلَيْكَ مِنْ رَبِّكَ﴾ [المائدة: ٦٧]. وَكانَ الرَّسولُ ﷺ يُبَيِّنُ القُرْآنَ وَيَشْرَحُهُ، يَقولُ اللهُ تَعالى: ﴿وَأَنْزَلْنا إِلَيْكَ الذِّكْرَ لِتُبَيِّنَ لِلنّاسِ ما نُزِّلَ إِلَيْهِمْ﴾ [النحل: ٤٤].", "God Almighty commanded the Messenger of God (peace and blessings be upon him) to convey the Noble Qur'an with all care and trustworthiness; this command came in the verse «O Messenger! Convey what has been revealed to you from your Lord» (al-Māʾida 67). The Messenger of God would also explain and expound the Qur'an; God Almighty says: «And We have sent down to you the Reminder so that you may make clear to the people what has been sent down to them» (al-Naḥl 44)."]],
  [["هذا يَعْني أَنَّ السُّنَّةَ هِيَ المَصْدَرُ الثّاني لِلْإِسْلامِ. وَمِمّا هُوَ مَعْروفٌ تاريخِيًّا، أَنَّ الصَّحابَةَ كانوا يَحْفَظونَ عَنِ النَّبِيِّ ﷺ كُلَّ أَقْوالِهِ وَأَفْعالِهِ وَتَقْريراتِهِ. وَقَدْ نَهى النَّبِيُّ ﷺ عَنْ كِتابَةِ الحَديثِ في أَوَّلِ الأَمْرِ خَوْفًا مِنِ اخْتِلاطِهِ بِالقُرْآنِ الكَريمِ، ثُمَّ أَذِنَ لَهُمْ بَعْدَ ذلِكَ بِكِتابَتِهِ، فَجَمَعوا بَيْنَ الحِفْظِ وَالكِتابَةِ.", "This means that the Sunna is the second source of Islam. It is known historically that the Companions memorized all the words, deeds and approvals of the Prophet (peace and blessings be upon him). At first the Prophet forbade writing hadith for fear it would be mixed with the Qur'an, then permitted them to write; and they combined memorization with writing."]],
  [["وَلَمْ يَكونوا يَسْأَلونَ عَنِ الرُّواةِ، حَتّى بَدَأَ أَعْداءُ الإِسْلامِ يَضَعونَ أَحاديثَ، وَيَقولونَ هِيَ مِنْ كَلامِ الرَّسولِ ﷺ فَسَأَلوا عَنْهُمْ. يَقولُ ابْنُ سيرينَ رَحِمَهُ اللهُ: «لَمْ يَكونوا يَسْأَلونَ عَنِ الإِسْنادِ، فَلَمّا وَقَعَتِ الفِتْنَةُ، قالوا: سَمّوا لَنا رِجالَكُمْ، فَيُنْظَرُ إِلى أَهْلِ السُّنَّةِ فَيُؤْخَذُ حَديثُهُمْ، وَيُنْظَرُ إِلى أَهْلِ البِدَعِ فَلا يُؤْخَذُ حَديثُهُمْ». وَقالَ عَبْدُ اللهِ بْنُ المُبارَكِ المَرْوَزِيُّ رَحِمَهُ اللهُ: «الإِسْنادُ مِنَ الدّينِ، وَلَوْلا الإِسْنادُ لَقالَ مَنْ شاءَ ما شاءَ». وَقَدْ وَجَّهَ الخَليفَةُ عُمَرُ بْنُ عَبْدِ العَزيزِ عُلَماءَ المُسْلِمينَ، لِكَيْ يَجْمَعوا السُّنَّةَ النَّبَوِيَّةَ مِنْ كُلِّ شَخْصٍ يَحْفَظُ مِنْها شَيْئًا. وَقَدْ كانَ لِلْإِمامِ مالِكٍ دَوْرٌ مُهِمٌّ في هذا العَمَلِ، عِنْدَما أَلَّفَ كِتابَهُ المَشْهورَ (المُوَطَّأَ)، وَهُوَ مَجْموعَةٌ مِنَ الأَحاديثِ مُرَتَّبَةٌ حَسَبَ أَبْوابِ الفِقْهِ.", "They did not ask about the narrators until the enemies of Islam began to fabricate hadiths and say, “These are the words of the Messenger of God,” and then they began to ask. Ibn Sīrīn (may God have mercy on him) says: “They used to not ask about the chain of transmission; when the trial came they said, ‘Give us the names of your men’; the people of the Sunna would be looked at and their hadiths taken; the people of innovation would be looked at and their hadiths not taken.” ʿAbdullāh ibn al-Mubārak al-Marwazī (may God have mercy on him) also said: “The chain of transmission is part of the religion; were it not for the chain, anyone could say whatever he wished.” The caliph ʿUmar ibn ʿAbd al-ʿAzīz directed the Muslim scholars to collect the Sunna from everyone who had memorized anything of it. In this work Imam Mālik, who wrote the famous al-Muwaṭṭaʾ, composed of hadiths arranged by chapters of jurisprudence, played an important role."]],
  [["بَعْدَ ذلِكَ جَرى تَمْحيصٌ دَقيقٌ لِكُلِّ الأَشْخاصِ الَّذينَ يَرْوونَ عَنِ الرَّسولِ ﷺ بَعْدَ عَصْرِ الصَّحابَةِ، وَتَمْحيصٌ دَقيقٌ لِكُلِّ ما يَقولونَهُ. وَهكَذا أَنْشَأَ عُلَماءُ المُسْلِمينَ عِلْمَيْنِ مِنْ أَهَمِّ العُلومِ الَّتي حَفِظَتِ السُّنَّةَ النَّبَوِيَّةَ مِنَ الكَذِبِ وَهُما: عِلْمُ «الجَرْحِ وَالتَّعْديلِ»؛ الَّذي يَبْحَثُ في أَحْوالِ الرُّواةِ وَأَمانَتِهِمْ وَعَدالَتِهِمْ، وَما عُرِفَ عَنْهُمْ مِنَ الصِّدْقِ وَالأَمانَةِ، أَوِ الكَذِبِ وَالنِّسْيانِ، وَعِلْمُ «مُصْطَلَحِ الحَديثِ»، الَّذي يُحَدِّدُ وَصْفًا دَقيقًا لِدَرَجَةِ كُلِّ حَديثٍ مِنْ حَيْثُ الصِّحَّةُ وَالحُسْنُ وَالضَّعْفُ... إلخ.", "After this, after the age of the Companions, everyone who narrated from the Messenger of God and everything they said was examined with care. In this way the Muslim scholars established two of the most important sciences protecting the Sunna from falsehood: the science of “criticism and validation” (al-jarḥ wa-l-taʿdīl), which examines the narrators' conditions, trustworthiness, uprightness, and what is known of their truthfulness and reliability or of their lying and forgetfulness; and the science of “hadith terminology” (muṣṭalaḥ al-ḥadīth), which determines exactly the grade of every hadith: sound, good, weak and so on."]],
  [["وَجاءَ القَرْنُ الثّالِثُ الهِجْرِيُّ الَّذي حَدَثَتْ فيهِ أَكْبَرُ حَرَكَةٍ عِلْمِيَّةٍ في تَأْليفِ المَوْسوعاتِ (الكُتُبِ الكَبيرَةِ) الَّتي تَحْتَوي عَلى سُنَّةِ الرَّسولِ ﷺ الصَّحيحَةِ. وَمِنْ أَشْهَرِ مَنْ قامَ بِهذا العَمَلِ البُخارِيُّ وَمُسْلِمٌ، يُضافُ إِلى ذلِكَ ما قامَ بِهِ كُلٌّ مِنَ الإِمامِ أَحْمَدَ بْنِ حَنْبَلٍ، وَابْنِ ماجَهْ، وَأَبي داوُدَ، وَالتِّرْمِذِيِّ، وَالنَّسائِيِّ.", "Then came the third Hijri century, in which the greatest scholarly movement took place in compiling encyclopedias (large books) containing the sound Sunna of the Messenger of God. The most famous of those who did this work are al-Bukhārī and Muslim; to them are added what Imam Aḥmad ibn Ḥanbal, Ibn Māja, Abū Dāwūd, al-Tirmidhī and al-Nasāʾī did."]],
  [["وَبِهذا العَمَلِ الكَبيرِ، الَّذي لا يوجَدُ لَهُ نَظيرٌ في أَيِّ ثَقافَةٍ أُخْرى غَيْرِ الثَّقافَةِ الإِسْلامِيَّةِ، أَصْبَحَ لَدى المُسْلِمينَ كُتُبٌ شامِلَةٌ وَأَمينَةٌ لِلسُّنَّةِ النَّبَوِيَّةِ، قامَ عَلى أَساسِها عِلْمُ الفِقْهِ الَّذي يَبْحَثُ في الأَحْكامِ التَّفْصيلِيَّةِ لِلْفَرْدِ وَالمُجْتَمَعِ.", "Through this great work, whose like is found in no culture other than Islamic culture, Muslims came to have comprehensive and reliable books on the Sunna; the science of jurisprudence, which studies the detailed rulings of the individual and society, was also built on their foundation."]]] },
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الأولى هِيَ: أَنَّ اللهَ أَمَرَ الرَّسولَ ﷺ أَنْ ...", "يُبَلِّغَ القُرْآنَ وَيَشْرَحَهُ وَيُبَيِّنَهُ", ["يُبَلِّغَ القُرْآنَ", "يَشْرَحَ القُرْآنَ وَيُبَيِّنَهُ"], "The main idea of the first paragraph: God commanded the Messenger to …"],
  ["(٢) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّانِيَةِ هِيَ أَنَّ ...", "الصَّحابَةَ دَوَّنوا السُّنَّةَ وَحَفِظوها", ["الصَّحابَةَ حَفِظوا السُّنَّةَ وَمَنَعَهُمُ الرَّسولُ مِنْ تَدْوينِها", "تَدْوينَ الحَديثِ اخْتَلَطَ بِتَدْوينِ القُرْآنِ"], "The main idea of the second paragraph is …", "The paragraph ends with «فَجَمَعوا بَيْنَ الحِفْظِ وَالكِتابَةِ»; the prohibition was only at the beginning."],
  ["(٣) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الثّالِثَةِ هِيَ ...", "البَدْءُ في تَدْوينِ السُّنَّةِ", ["أَنَّ عُمَرَ بْنَ عَبْدِ العَزيزِ دَوَّنَ السُّنَّةَ", "أَنَّ مالِكًا وَجَّهَ إِلى تَدْوينِ الأَحاديثِ"], "The main idea of the third paragraph is …"],
  ["(٤) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الرّابِعَةِ هِيَ ...", "ظُهورُ عِلْمَيِ الجَرْحِ وَالتَّعْديلِ وَمُصْطَلَحِ الحَديثِ", ["ظُهورُ عِلْمِ الجَرْحِ وَالتَّعْديلِ", "ظُهورُ عِلْمِ مُصْطَلَحِ الحَديثِ"], "The main idea of the fourth paragraph is …"],
  ["(٥) الفِكْرَةُ الرَّئيسَةُ في الفِقْرَةِ الخامِسَةِ هِيَ ...", "ظُهورُ كُتُبِ السُّنَّةِ الصَّحيحَةِ", ["ظُهورُ عِلْمِ الفِقْهِ", "ظُهورُ صَحيحِ البُخارِيِّ وَصَحيحِ مُسْلِمٍ"], "The main idea of the fifth paragraph is …"],
  ["(٦) أَفْضَلُ عُنْوانٍ لِهذا النَّصِّ ...", "تَدْوينُ السُّنَّةِ", ["القُرْآنُ وَالسُّنَّةُ", "كُتُبُ السُّنَّةِ"], "The most fitting title for this text …"]] },
 { t: "dy", ar: "أَجِبْ بِوَضْعِ عَلامَةِ (✓) أَوْ (✗) وَصَحِّحِ الخَطَأَ", ogeler: [
  ["(٧) السُّنَّةُ هِيَ المَصْدَرُ الأَوَّلُ لِلتَّشْريعِ في الإِسْلامِ.", false, "السُّنَّةُ هِيَ المَصْدَرُ الثّاني لِلْإِسْلامِ (بَعْدَ القُرْآنِ).", "The Sunna is the first source of legislation in Islam."],
  ["(٨) حَفِظَ الصَّحابَةُ أَفْعالَ الرَّسولِ ﷺ دونَ أَقْوالِهِ.", false, "حَفِظَ الصَّحابَةُ أَقْوالَهُ وَأَفْعالَهُ وَتَقْريراتِهِ.", "The Companions memorized the Messenger's deeds, not his words."],
  ["(٩) كُتِبَتِ السُّنَّةُ في حَياةِ النَّبِيِّ ﷺ.", true, "", "The Sunna was written while the Prophet was alive.", "He first forbade it, then permitted them to write."],
  ["(١٠) بَعْدَ وَفاةِ الرَّسولِ ﷺ بَدَأَ أَعْداءُ الإِسْلامِ يَضَعونَ الأَحاديثَ.", true, "", "After the death of the Messenger, the enemies of Islam began to fabricate hadiths.", "The time is not stated explicitly in the text; the fabrications began with the trial, that is, after the death."],
  ["(١١) أَوَّلُ مَنْ أَمَرَ بِتَدْوينِ الأَحاديثِ عُمَرُ بْنُ عَبْدِ العَزيزِ.", true, "", "The first to command the codification of hadiths was ʿUmar ibn ʿAbd al-ʿAzīz.", "The text does not say “first”; but it narrates that the codification began with his direction."],
  ["(١٢) كِتابُ المُوَطَّأِ كِتابٌ مَشْهورٌ في دُروسِ فِقْهِ الإِمامِ مالِكٍ.", false, "المُوَطَّأُ مَجْموعَةٌ مِنَ الأَحاديثِ مُرَتَّبَةٌ حَسَبَ أَبْوابِ الفِقْهِ.", "al-Muwaṭṭaʾ is a famous book of Imam Mālik's jurisprudence lessons."],
  ["(١٣) عِلْمُ مُصْطَلَحِ الحَديثِ مِنَ العُلومِ الَّتي حَفِظَتِ السُّنَّةَ النَّبَوِيَّةَ.", true, "", "Hadith terminology is one of the sciences protecting the Sunna."],
  ["(١٤) عِلْمُ الجَرْحِ وَالتَّعْديلِ عِلْمٌ إِسْلامِيٌّ لا نَظيرَ لَهُ في الثَّقافاتِ الأُخْرى.", true, "", "Criticism and validation is an Islamic science with no like in other cultures.", "The text uses the expression “no like” for the whole work of codifying the Sunna; criticism and validation is part of it."],
  ["(١٥) قامَ عِلْمُ الفِقْهِ عَلى أَساسِ كُتُبِ السُّنَّةِ الصَّحيحَةِ.", true, "", "The science of jurisprudence was built on the foundation of the books of the sound Sunna."]] },
 { t: "acik", ar: "أَجِبْ بِاخْتِصارٍ عَمّا يَلي", aciklama: "First answer yourself; then look at the sample answer.", ogeler: [
  ["(١٦) اذْكُرْ دَليلًا مِنَ القُرْآنِ عَلى أَنَّ اللهَ أَمَرَ الرَّسولَ ﷺ أَنْ يُبَلِّغَ ما أُنْزِلَ إِلَيْهِ.", "﴿يا أَيُّهَا الرَّسولُ بَلِّغْ ما أُنْزِلَ إِلَيْكَ مِنْ رَبِّكَ﴾.", "Bring a proof from the Qur'an that God commanded the Messenger to convey."],
  ["(١٧) اذْكُرْ أَهَمَّ مَصْدَرَيْنِ مِنْ مَصادِرِ الإِسْلامِ.", "القُرْآنُ الكَريمُ وَالسُّنَّةُ النَّبَوِيَّةُ.", "Name the two most important sources of Islam."],
  ["(١٨) ماذا حَفِظَ الصَّحابَةُ عَنِ الرَّسولِ ﷺ؟", "أَقْوالَهُ وَأَفْعالَهُ وَتَقْريراتِهِ.", "What did the Companions memorize from the Messenger of God?"],
  ["(١٩) لِماذا مَنَعَ الرَّسولُ ﷺ الصَّحابَةَ مِنْ تَدْوينِ السُّنَّةِ في أَوَّلِ الأَمْرِ؟", "خَوْفًا مِنِ اخْتِلاطِها بِالقُرْآنِ الكَريمِ.", "Why did the Messenger of God at the beginning forbid the Companions to write the Sunna?"],
  ["(٢٠) ما السَّبَبُ الَّذي جَعَلَ المُسْلِمينَ يَكْتُبونَ السُّنَّةَ بَعْدَ وَفاةِ الرَّسولِ ﷺ؟", "أَنَّ أَعْداءَ الإِسْلامِ بَدَؤوا يَضَعونَ أَحاديثَ، وَيَقولونَ هِيَ مِنْ كَلامِ الرَّسولِ ﷺ.", "What was the reason that drove the Muslims to write the Sunna after the death of the Messenger?"],
  ["(٢١) مَنِ الخَليفَةُ الَّذي بَدَأَ في عَهْدِهِ تَدْوينُ السُّنَّةِ؟", "عُمَرُ بْنُ عَبْدِ العَزيزِ.", "During the reign of which caliph did the codification of the Sunna begin?"],
  ["(٢٢) كَيْفَ رَتَّبَ الإِمامُ مالِكٌ أَبْوابَ كِتابِهِ (المُوَطَّأِ)؟", "حَسَبَ أَبْوابِ الفِقْهِ.", "How did Imam Mālik arrange the chapters of al-Muwaṭṭaʾ?"],
  ["(٢٣) فيمَ يَبْحَثُ عِلْمُ الجَرْحِ وَالتَّعْديلِ؟", "في أَحْوالِ الرُّواةِ وَأَمانَتِهِمْ وَعَدالَتِهِمْ، وَما عُرِفَ عَنْهُمْ مِنَ الصِّدْقِ وَالأَمانَةِ، أَوِ الكَذِبِ وَالنِّسْيانِ.", "What does the science of criticism and validation study?"],
  ["(٢٤) ما أَهَمُّ حَدَثٍ جاءَ في القَرْنِ الثّالِثِ الهِجْرِيِّ؟", "أَكْبَرُ حَرَكَةٍ عِلْمِيَّةٍ في تَأْليفِ المَوْسوعاتِ الَّتي تَحْتَوي عَلى السُّنَّةِ الصَّحيحَةِ.", "What is the most important event of the third Hijri century?"],
  ["(٢٥) فيمَ يَبْحَثُ عِلْمُ الفِقْهِ؟", "في الأَحْكامِ التَّفْصيلِيَّةِ لِلْفَرْدِ وَالمُجْتَمَعِ.", "What does the science of jurisprudence study?"]] },
 { t: "sirala", ar: "رَتِّبِ الأَفْكارَ التّالِيَةَ حَسَبَ وُرودِها في النَّصِّ", aciklama: "Put the ideas in the order of the text.", ogeler: [
  "رَفَضَ الرَّسولُ ﷺ أَنْ تُكْتَبَ السُّنَّةُ في أَوَّلِ الأَمْرِ.", "بَدَأَ أَعْداءُ الإِسْلامِ في الكَذِبِ عَلى الرَّسولِ ﷺ.", "وَجَّهَ عُمَرُ بْنُ عَبْدِ العَزيزِ العُلَماءَ إِلى تَدْوينِ السُّنَّةِ.", "ظَهَرَ عِلْمُ الجَرْحِ وَالتَّعْديلِ.", "في القَرْنِ الثّالِثِ الهِجْرِيِّ، ظَهَرَتْ كُتُبُ السُّنَّةِ الصَّحيحَةُ."] }
]},
// ---------------- 2. KELİMELER ----------------
{ no: 2, etiket: "Vocabulary", kisa: "المُفْرَداتُ", ar: "ثانِيًا: المُفْرَداتُ", tr: "Vocabulary", ozet: "Plurals, antonyms, verb-word combinations; 25 questions", bloklar: [
 { t: "bosluk", ar: "اكْتُبْ جَمْعَ كُلِّ كَلِمَةٍ تَحْتَها خَطٌّ في الفَراغِ", kutu: ["أَوْطانِ", "حاجاتِ", "الأَرْقامِ", "ظَواهِرِ", "الكائِناتِ", "مَفاتيحِ", "العُقولِ", "الأَقَلِّيّاتِ", "أَفْعالِ", "أَسْبابِ"], ogeler: [
  ["(١) كُلُّ [[وَطَنٍ]] مِنْ ___ المُسْلِمينَ وَطَني.", "أَوْطانِ", null, "Each of the homelands of the Muslims is my homeland."],
  ["(٢) أَسْأَلُ اللهَ أَنْ يُحَقِّقَ لي كُلَّ [[حاجَةٍ]] مِنْ ___ الدُّنْيا وَالآخِرَةِ.", "حاجاتِ", null, "I ask God to fulfil each of my needs of this world and the next.", "«حَوائِجِ» is also possible."],
  ["(٣) كُلُّ هذِهِ ___ خَطَأٌ إِلّا [[الرَّقْمَ]] الأَوَّلَ.", "الأَرْقامِ", null, "All these numbers are wrong, except the first number."],
  ["(٤) يُريدُ الطِّفْلُ أَنْ يَعْرِفَ كُلَّ [[ظاهِرَةٍ]] مِنْ ___ البيئَةِ المُحيطَةِ بِهِ.", "ظَواهِرِ", null, "The child wants to learn about each of the events around him."],
  ["(٥) لَيْسَ هُناكَ [[كائِنٌ]] مِنَ الـ___ الحَيَّةِ لا يَحْتاجُ إِلى الماءِ.", "الكائِناتِ", null, "There is no living being that does not need water."],
  ["(٦) الدُّعاءُ [[مِفْتاحٌ]] مِنْ ___ الجَنَّةِ.", "مَفاتيحِ", null, "Supplication is one of the keys of Paradise."],
  ["(٧) كُلُّ [[عَقْلٍ]] مِنَ الـ___ المُهاجِرَةِ مِنْ بِلادِ المُسْلِمينَ ثَرْوَةٌ عَظيمَةٌ.", "العُقولِ", null, "Each of the brains that emigrate from Muslim countries is a great fortune."],
  ["(٨) المُسْلِمونَ في بَعْضِ الدُّوَلِ [[أَقَلِّيَّةٌ]] مِثْلُ الـ___ الأُخْرى.", "الأَقَلِّيّاتِ", null, "In some countries Muslims are a minority like other minorities."],
  ["(٩) كُلُّ [[فِعْلٍ]] مِنْ ___ العِبادِ يُحاسَبونَ عَلَيْهِ شَرًّا أَوْ خَيْرًا.", "أَفْعالِ", null, "Of every deed of the servants, good or bad, they will be held to account."],
  ["(١٠) الأَكْلُ الكَثيرُ [[سَبَبٌ]] مِنْ ___ المَرَضِ.", "أَسْبابِ", null, "Eating much is one of the causes of illness."]] },
 { t: "bosluk", ar: "اكْتُبْ في الفَراغِ المُضادَّ في المَعْنى لِلْكَلِمَةِ الَّتي تَحْتَها خَطٌّ", kutu: ["الاسْتِيقاظِ", "يَبْكوا", "الرّاحَةِ", "الجَنَّةِ", "حُزْنٍ", "كاذِبًا", "إِيابٍ", "الكَسَلُ", "مُؤْمِنٌ", "نَهارًا"], ogeler: [
  ["(١) يَجِبُ أَنْ تَذْكُرَ اللهَ عِنْدَ [[النَّوْمِ]]، وَعِنْدَ الـ___.", "الاسْتِيقاظِ", null, "You should remember God when you sleep and when you wake."],
  ["(٢) يَقولُ اللهُ تَعالى: ﴿[[فَلْيَضْحَكوا]] قَليلًا وَلْـ___ كَثيرًا﴾.", "يَبْكوا", null, "“So let them laugh a little and weep much.”"],
  ["(٣) بَعْدَ كُلِّ هذا [[التَّعَبِ]]، خُذْ قَليلًا مِنَ الـ___.", "الرّاحَةِ", null, "After so much tiredness, rest a little."],
  ["(٤) يَوْمَ القِيامَةِ يُنادي أَصْحابُ الـ___ أَصْحابَ [[النّارِ]] أَنْ قَدْ وَجَدْنا ما وَعَدَنا رَبُّنا حَقًّا.", "الجَنَّةِ", null, "On the Day of Resurrection the people of Paradise will call to the people of Hell…", "In the book the sentence is printed in the order «يُنادي أَصْحابَ النّارِ أَصْحابُ الـ...»; the meaning is the same."],
  ["(٥) يَوْمَ دَخَلَ الرَّسولُ ﷺ المَدينَةَ، كانَ كُلُّ شَخْصٍ في [[فَرَحٍ]]، وَعِنْدَما تُوُفِّيَ كانَ الجَميعُ في ___.", "حُزْنٍ", null, "The day the Messenger of God entered Medina everyone was in joy; when he died everyone was in sorrow."],
  ["(٦) كُنْ إِنْسانًا [[صادِقًا]]، وَلا تَكُنْ ___.", "كاذِبًا", null, "Be an honest person, do not be a liar."],
  ["(٧) سَأَشْتَري تَذْكِرَةَ [[ذَهابٍ]] وَ___ إِلى جُدَّةَ.", "إِيابٍ", null, "I will buy a round-trip ticket to Jeddah.", "«عَوْدَةٍ» is also possible."],
  ["(٨) [[النَّشاطُ]] يُؤَدّي إِلى النَّجاحِ، أَمّا ___ فَيُؤَدّي إِلى الفَشَلِ.", "الكَسَلُ", null, "Diligence leads to success, laziness to failure."],
  ["(٩) خَلَقَ اللهُ النّاسَ فَمِنْهُمْ ___ وَمِنْهُمْ [[كافِرٌ]].", "مُؤْمِنٌ", null, "God created people; some are believers, some are disbelievers."],
  ["(١٠) أَكْثَرُ النّاسِ يَنامونَ [[لَيْلًا]]، وَقَليلٌ مِنْهُمْ مَنْ يَنامونَ ___.", "نَهارًا", null, "Most people sleep at night; a few sleep in the daytime."]] },
 { t: "secim", ar: "ضَعْ خَطًّا تَحْتَ الكَلِمَةِ الَّتي تُناسِبُ الفِعْلَ المَذْكورَ", aciklama: "Choose the word that best fits the verb.", ogeler: [
  ["(١) أَنْشَدَ ...", "قَصيدَةً", ["قِصَّةً", "كِتابًا"], "(He recited poetry) …"],
  ["(٢) اسْتَقْبَلَ ...", "القِبْلَةَ", ["العَمَلَ", "التَّمارينَ"], "He turned toward, he met …"],
  ["(٣) مَزَّقَ ...", "الكِتابَ", ["المالَ", "القَلَمَ"], "He tore …"],
  ["(٤) صَبَرَ عَلى ...", "الظُّلْمِ", ["الضَّحِكِ", "النَّوْمِ"], "… he was patient."],
  ["(٥) بَنى ...", "القَصْرَ", ["الحَديقَةَ", "القِطارَ"], "He built …"]] }
]},
// ---------------- 3. NAHİV VE SARF ----------------
{ no: 3, etiket: "Grammar and morphology", kisa: "النَّحْوُ وَالصَّرْفُ", ar: "ثالِثًا: النَّحْوُ وَالصَّرْفُ", tr: "Grammar and morphology", ozet: "Choose the correct form, match term and definition, parsing in the verses; 25 questions", bloklar: [
 { t: "secim", ar: "اخْتَرِ الجَوابَ الصَّحيحَ", ogeler: [
  ["(١) ظَنَنْتُ ...", "الاخْتِبارَ سَهْلًا", ["الاخْتِبارُ سَهْلٌ", "الاخْتِبارَ سَهْلٌ"], "I thought the exam …", "ظَنَّ takes two objects in the accusative."],
  ["(٢) سَأَلَ الفَقيرُ ...", "الغَنِيَّ مالًا", ["الغَنِيُّ مالًا", "الغَنِيُّ مالٌ"], "The poor man asked for …", "سَأَلَ, كَسا/أَعْطى take two objects."],
  ["(٣) كانَتْ عاصِمَةُ الدَّوْلَةِ العَبّاسِيَّةِ ...", "بَغْدادَ", ["بَغْدادٌ", "بَغْدادُ"], "The capital of the Abbasid state was …", "The predicate of كانَ is accusative; بَغْداد, being diptote, takes no tanwīn."],
  ["(٤) قابَلْتُ ...", "الأُسْتاذَ", ["الأُسْتاذُ", "الأُسْتاذِ"], "I met …"],
  ["(٥) إِنَّ ... رَجُلٌ طَيِّبٌ.", "عُثْمانَ", ["عُثْمانًا", "عُثْمانُ"], "ʿUthmān is a good man.", "The noun of إِنَّ is accusative; عُثْمان is a diptote."],
  ["(٦) جاءَ الرَّجُلانِ ...", "أَنْفُسُهُما", ["نَفْسُهُ", "نَفْسَيْهِما"], "The two men … came.", "The emphasis agrees with the emphasized in case; in the dual, the plural أَنْفُس of نَفْس is used."],
  ["(٧) حَضَرَ الطُّلّابُ ...", "كُلُّهُمْ", ["كِلاهُما", "كُلُّهُنَّ"], "The students' … came."],
  ["(٨) قابَلَ الخَليفَةُ ... العُلَماءَ.", "هارونُ الرَّشيدُ", ["هارونَ الرَّشيدَ", "هارونِ الرَّشيدِ"], "The caliph Hārūn al-Rashīd met with scholars.", "The substitute agrees with the subject: nominative."],
  ["(٩) سَرَّني الشّارِعُ ...", "نَظافَتُهُ", ["نَظافَتُها", "النَّظافَةُ"], "The … of the street pleased me.", "Substitution of inclusion: with a pronoun referring to the singular masculine الشّارِعُ."],
  ["(١٠) أَضْحى الطُّلّابُ ... عَلى القِراءَةِ الحُرَّةِ.", "قادِرينَ", ["قادِرانِ", "قادِرَيْنِ"], "The students became able to read freely.", "أَضْحى, a sister of كانَ: the predicate is accusative."]] },
 { t: "esle", ar: "ضَعْ أَمامَ كُلِّ كَلِمَةٍ أَوْ عِبارَةٍ مِنَ المَجْموعَةِ (أ) الجُمْلَةَ الصَّحيحَةَ الَّتي تُناسِبُها مِنَ المَجْموعَةِ (ب)", ciftler: [
  ["الفِعْلُ المَزيدُ", "هُوَ ما زيدَ عَلى حُروفِهِ الأَصْلِيَّةِ حَرْفٌ أَوْ أَكْثَرُ.", "augmented verb"],
  ["الفِعْلُ المُجَرَّدُ الرُّباعِيُّ", "فِعْلٌ يَأْتي عَلى وَزْنٍ واحِدٍ هُوَ فَعْلَلَ.", "quadriliteral bare verb"],
  ["ظَنَّ وَحَسِبَ", "مِنَ الأَفْعالِ الَّتي تَنْصِبُ مَفْعولَيْنِ أَصْلُهُمَا المُبْتَدَأُ وَالخَبَرُ.", "zanna and ḥasiba"],
  ["مَزيدُ الرُّباعِيِّ", "يُزادُ بِحَرْفٍ واحِدٍ أَوْ حَرْفَيْنِ.", "augmented form of the quadriliteral"],
  ["كَسا وَأَعْطى", "مِنَ الأَفْعالِ الَّتي تَنْصِبُ مَفْعولَيْنِ لَيْسَ أَصْلُهُما مُبْتَدَأً وَخَبَرًا.", "kasā and aʿṭā"],
  ["الفِعْلُ المُجَرَّدُ", "هُوَ ما كانَتْ جَميعُ حُروفِهِ أَصْلِيَّةً.", "bare verb"],
  ["نونُ الوِقايَةِ", "نونٌ تَقَعُ قَبْلَ ياءِ المُتَكَلِّمِ.", "the nūn of protection"],
  ["البَدَلُ", "تابِعٌ مَقْصودٌ بِالحُكْمِ بِلا واسِطَةٍ.", "substitution"],
  ["التَّوْكيدُ", "تابِعٌ يُذْكَرُ بَعْدَ المُؤَكَّدِ وَيَتْبَعُهُ في إِعْرابِهِ.", "emphasis"],
  ["المَمْنوعُ مِنَ الصَّرْفِ", "عَلَمٌ أَوْ صِفَةٌ أَوِ اسْمٌ يُمْنَعُ مِنَ التَّنْوينِ وَيُجَرُّ بِالفَتْحَةِ.", "diptote"]],
  not: "The definitions (د) “direct object” and (ك) “indefinite” in the book are distractors." },
 { t: "secim", ar: "ضَعْ دائِرَةً حَوْلَ الحَرْفِ الَّذي يَدُلُّ عَلى الإِجابَةِ الصَّحيحَةِ في كُلِّ آيَةٍ", ogeler: [
  ["(١) قالَ تَعالى: ﴿إِنَّ رَبَّكَ فَعّالٌ لِما يُريدُ﴾: كَلِمَةُ (فَعّالٌ) ...", "خَبَرُ إِنَّ", ["خَبَرُ مُبْتَدَأٍ", "اسْمُ إِنَّ"], "The word «فَعّالٌ» is …"],
  ["(٢) قالَ تَعالى: ﴿وَأَصْبَحَ فُؤادُ أُمِّ موسى فارِغًا﴾: كَلِمَةُ (فارِغًا) ...", "خَبَرٌ", ["حالٌ", "تَوْكيدٌ"], "The word «فارِغًا» is …", "The predicate of أَصْبَحَ."],
  ["(٣) قالَ تَعالى: ﴿قُتِلَ الإِنْسانُ ما أَكْفَرَهُ﴾: كَلِمَةُ (الإِنْسانُ) ...", "نائِبُ فاعِلٍ", ["فاعِلٌ", "مُبْتَدَأٌ مُؤَخَّرٌ"], "The word «الإِنْسانُ» is …"],
  ["(٤) قالَ تَعالى: ﴿يَقولُ الإِنْسانُ يَوْمَئِذٍ أَيْنَ المَفَرُّ﴾: كَلِمَةُ (أَيْنَ) ...", "خَبَرٌ مُقَدَّمٌ", ["خَبَرٌ مُؤَخَّرٌ", "مُبْتَدَأٌ"], "The word «أَيْنَ» is …"],
  ["(٥) قالَ تَعالى: ﴿وَعَلَّمَ آدَمَ الأَسْماءَ كُلَّها﴾: كَلِمَةُ (كُلَّها) ...", "تَوْكيدٌ", ["بَدَلٌ", "مَفْعولٌ بِهِ"], "The word «كُلَّها» is …"]] }
]},
// ---------------- 4. YAZI ----------------
{ no: 4, etiket: "Writing", kisa: "الكِتابَةُ", ar: "رابِعًا: الكِتابَةُ", tr: "Writing", ozet: "Idioms and their meanings, word combinations; 22 questions", bloklar: [
 { t: "esle", ar: "صِلْ بَيْنَ التَّعْبيراتِ في (أ) وَما يُناسِبُها مِنْ مَعانٍ في (ب)", ciftler: [
  ["اجْتَنَبَ المَعاصِيَ.", "تَرَكَها وَابْتَعَدَ عَنْها.", "He avoided sins."],
  ["خَلّى سَبيلَهُ.", "تَرَكَهُ يَذْهَبُ.", "He let him go free."],
  ["وَقَعَ في طَرْفَةِ عَيْنٍ.", "حَدَثَ بِسُرْعَةٍ شَديدَةٍ.", "It happened in the blink of an eye."],
  ["وافاهُ الأَجَلُ.", "ماتَ.", "His appointed time came."],
  ["أَصْبَحَ أَلْزَمَ لَهُ مِنْ ظِلِّهِ.", "صارَ لا يُفارِقُهُ أَبَدًا.", "He became nearer than his shadow."],
  ["لَمْ يَأْلُ جُهْدًا.", "فَعَلَ كُلَّ ما يَسْتَطيعُ فِعْلَهُ.", "He held back from no effort."],
  ["جُعِلَ الحَقُّ عَلى لِسانِهِ.", "لا يَقولُ إِلّا صِدْقًا.", "The truth was placed on his tongue."],
  ["انْقَطَعَ عَنْهُ النّاسُ.", "تَرَكوا زِيارَتَهُ.", "People cut off relations with him."]] },
 { t: "esle", ar: "صِلْ بَيْنَ كُلِّ كَلِمَتَيْنِ تَأْتِيانِ مَعًا، ثُمَّ ضَعْهُما في جُمْلَةٍ مِنْ إِنْشائِكَ", aciklama: "Then write a sentence in your notebook with each pair.", ciftler: [
  ["يَبْحَثُ", "عَنْ", "he searches"], ["مَبْدَأُ", "المُساواةِ", "the principle of equality"], ["يُقالُ", "إِنَّ", "it is said"], ["المُجْتَمَعُ", "الإِسْلامِيُّ", "Islamic society"], ["يَرْغَبُ", "في", "wants, is inclined"],
  ["يَوْمُ", "القِيامَةِ", "the Day of Resurrection"], ["يَحْرِصُ", "عَلى", "he takes care of"], ["دونَ", "اسْتِثْناءٍ", "without exception"], ["إِحْدى", "اللَّيالي", "on one of the nights"], ["يَتَراوَحُ", "بَيْنَ", "it varies between"],
  ["الخِلافاتُ", "الزَّوْجِيَّةُ", "disputes between spouses"], ["حَلَّ", "مَرَضٌ", "illness befell"], ["فَوائِدُ", "كَثيرَةٌ", "many benefits"], ["خَطَأٌ", "كَبيرٌ", "great mistake"]],
  not: "For «حَلَّ» the only remaining partner in the book is «مَرَضٌ» (حَلَّ بِهِ مَرَضٌ: a disease befell him). «كَبيرٌ» and «كَثيرَةٌ» can switch places." }
]}
];
var KELIME = [];
