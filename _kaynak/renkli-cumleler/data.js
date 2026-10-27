/* ===== Renkli Cümleler — kelime grupları ve oyun verileri ===== */
const VOCAB=[
 {k:'ed',t:'-ing / -ed sıfatlar',u:98,w:[['boring / bored','sıkıcı / sıkılmış','The lesson was boring. I was bored.'],['interesting / interested','ilginç / ilgili','an interesting book · interested in art'],['exciting / excited','heyecan verici / heyecanlı','an exciting match'],['tiring / tired','yorucu / yorgun','a tiring day'],['confusing / confused','kafa karıştırıcı / kafası karışık','The rules are confusing.'],['disappointing / disappointed','hayal kırıklığı yaratan / hayal kırıklığına uğramış','I was disappointed.'],['embarrassing / embarrassed','utandırıcı / utanmış','an embarrassing moment'],['frightening / frightened','korkutucu / korkmuş','a frightening film'],['annoying / annoyed','sinir bozucu / sinirli','That noise is annoying.'],['amazing / amazed','muhteşem / hayret etmiş','The view was amazing.'],['worrying / worried','endişe verici / endişeli','I’m worried about you.']]},
 {k:'adv',t:'Sıfat → zarf',u:100,w:[['quick → quickly','hızlı → hızlıca','She answered quickly.'],['careful → carefully','dikkatli → dikkatlice','Drive carefully.'],['easy → easily','kolay → kolayca','I won easily.'],['gentle → gently','nazik → nazikçe','Hold it gently.'],['good → well','iyi → iyi bir şekilde','She sings well.'],['fast → fast','hızlı → hızlı','He runs fast.'],['hard → hard','sıkı → sıkı','They work hard.'],['hardly','neredeyse hiç','I hardly know her.'],['late / lately','geç / son zamanlarda','I’ve been busy lately.'],['terribly','son derece, çok','I’m terribly sorry.']]},
 {k:'deg',t:'Derece sözcükleri',u:102,w:[['so','o kadar (sıfatla)','so tired'],['such (a)','öyle bir (isimle)','such a nice day'],['enough','yeterince','old enough · enough money'],['too','fazla, gereğinden çok','too hot'],['quite','oldukça; tamamen','quite good · quite right'],['pretty','epey','pretty cold'],['rather','biraz (olumsuz)','rather expensive'],['fairly','oldukça (az)','fairly easy'],['much / a lot / far','çok daha','much better'],['a bit / slightly','biraz daha','a bit cheaper'],['even','bile; daha da','even better']]},
 {k:'link',t:'Bağlaçlar',u:113,w:[['although / even though','-e rağmen (+ cümle)','Although it rained, we went.'],['in spite of / despite','-e rağmen (+ isim/-ing)','despite the rain'],['in case','… ihtimaline karşı','Take a coat in case it’s cold.'],['unless','-mezse','unless you hurry'],['as long as / provided','şartıyla','as long as you’re careful'],['as','iken; çünkü; olarak','as I left · as it was late'],['like','gibi','like a palace'],['as if / as though','-mış gibi','as if he knew'],['while','-iken','while I was sleeping'],['until','-e kadar (devam)','wait until 5'],['by','en geç','by Friday'],['by the time','…-diğinde (o zamana kadar)','By the time we arrived…']]},
 {k:'time',t:'Zaman edatları',u:121,w:[['at 7 o’clock','saat 7’de','at'],['at night / at the weekend','gece / hafta sonu','at'],['at Christmas / at the moment','Noel’de / şu anda','at'],['on Monday','pazartesi günü','on'],['on 5 May / on my birthday','5 Mayıs’ta / doğum günümde','on'],['in May / in 2020','mayısta / 2020’de','in'],['in the morning / in summer','sabahleyin / yazın','in'],['in five minutes','beş dakika sonra','in'],['next week / last year / every day','edatsız','–'],['on time','tam zamanında','The bus was on time.'],['in time','yetişerek','in time for dinner'],['in the end','sonunda','In the end we agreed.'],['during / for','sırasında / süresince','during the film · for an hour']]}
];
/* -ing mi -ed mi? [cümle (___), fiil kökü, doğru biçim tipi 'ing'|'ed'] */
const EDQ=[
 ['The film was really ___.','bore','ing'],['I was ___ during the lecture.','bore','ed'],['Are you ___ in politics?','interest','ed'],['That’s an ___ idea!','interest','ing'],
 ['The children were ___ about the trip.','excite','ed'],['It was an ___ match.','excite','ing'],['After work I feel ___.','tire','ed'],['Moving house is ___.','tire','ing'],
 ['The instructions are very ___.','confuse','ing'],['I’m ___. Can you explain again?','confuse','ed'],['The results were ___.','disappoint','ing'],['We were ___ with the hotel.','disappoint','ed'],
 ['That was an ___ moment.','embarrass','ing'],['I felt ___ when I forgot her name.','embarrass','ed'],['Horror films are ___.','frighten','ing'],['The dog was ___ of the noise.','frighten','ed'],
 ['That noise is very ___.','annoy','ing'],['She was ___ because he was late.','annoy','ed'],['The view from the top was ___.','amaze','ing'],['I’m ___ that you remembered.','amaze','ed'],
 ['The situation is ___.','worry','ing'],['I’m ___ about my exam.','worry','ed']
];
/* Bağlaç seç: [cümle (___), doğru, seçenekler, açıklama] */
const LINKQ=[
 ['___ it was raining, we went for a walk.','Although',['Although','Despite','In case','Unless'],'+ cümle → although.'],
 ['___ the rain, we went for a walk.','Despite',['Despite','Although','Unless','As if'],'+ isim → despite.'],
 ['Take an umbrella ___ it rains.','in case',['in case','unless','although','despite'],'Önlem → in case.'],
 ['You won’t pass ___ you study.','unless',['unless','in case','as long as','although'],'= if you don’t.'],
 ['You can borrow my car ___ you drive carefully.','as long as',['as long as','unless','despite','as if'],'Şart.'],
 ['She looks ___ she hasn’t slept.','as if',['as if','like as','unless','although'],'Görünüş.'],
 ['He works ___ a doctor.','as',['as','like','as if','such'],'Meslek → as.'],
 ['It tastes ___ chocolate.','like',['like','as','as if','such as'],'Benzerlik → like.'],
 ['I fell asleep ___ the film.','during',['during','while','for','until'],'+ isim → during.'],
 ['I fell asleep ___ I was watching the film.','while',['while','during','for','by'],'+ cümle → while.'],
 ['Please finish this ___ Friday.','by',['by','until','during','while'],'Son tarih → by.'],
 ['I’ll wait here ___ you come back.','until',['until','by','during','in case'],'Devam → until.'],
 ['___ it was late, we took a taxi.','As',['As','Like','Despite','Unless'],'Sebep → as.'],
 ['___ being tired, he kept working.','In spite of',['In spite of','Although','Even though','Unless'],'+ -ing → in spite of.'],
 ['I’ll go out ___ if it snows.','even',['even','although','as','unless'],'even if.']
];
/* at / on / in / – */
const TIMEQ=[['5 o’clock','at'],['Monday','on'],['July','in'],['2010','in'],['night','at'],['the morning','in'],['my birthday','on'],['the weekend','at'],['summer','in'],['21 March','on'],['Christmas','at'],['next week','–'],['the 1990s','in'],['Friday evening','on'],['the moment','at'],['last year','–'],['midnight','at'],['New Year’s Day','on'],['every day','–'],['the evening','in'],['lunchtime','at'],['winter','in'],['this morning','–'],['Sunday afternoon','on']];
/* Doğru mu yanlış mı? (ek) */
const DY_EXTRA=[
 ['I was very boring at the party.',false,'I was very bored at the party. (hissettiğin → -ed)'],
 ['She speaks English very well.',true,'Doğru: good → well.'],
 ['This is more cheaper than that.',false,'This is cheaper than that.'],
 ['It was such a beautiful day.',true,'Doğru: such a + sıfat + isim.'],
 ['He isn’t enough tall to play basketball.',false,'He isn’t tall enough…'],
 ['Despite of the traffic, we arrived on time.',false,'Despite the traffic… / In spite of the traffic…'],
 ['Take a sweater in case it gets cold.',true,'Doğru: in case + present.'],
 ['I go always to work by bus.',false,'I always go to work by bus.'],
 ['She is the best student in the class.',true,'Doğru: the best … in.'],
 ['I’ll see you on next Monday.',false,'I’ll see you next Monday.'],
 ['He works like a teacher. (o bir öğretmen)',false,'He works as a teacher.'],
 ['I like very much football.',false,'I like football very much.'],
 ['We arrived just in time for the start.',true,'Doğru: in time for.'],
 ['I’ll wait until you finish.',true,'Doğru: until + present.'],
 ['Unless you don’t hurry, you’ll miss the bus.',false,'Unless you hurry, you’ll miss the bus.']
];
