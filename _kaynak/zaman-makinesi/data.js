/* ===== Zaman Makinesi — kelime grupları ve oyun verileri ===== */
/* kelime grupları: [İngilizce, Türkçe, örnek] */
const VOCAB=[
 {k:'change',t:'Değişim fiilleri',u:1,w:[['get (better/worse)','(daha iyi/kötü) olmak','It’s getting dark.'],['become','… olmak, haline gelmek','She’s becoming famous.'],['change','değişmek','The city is changing fast.'],['improve','gelişmek, iyileşmek','My English is improving.'],['increase','artmak','The number is increasing.'],['rise','yükselmek','Prices are rising.'],['fall','düşmek','The temperature is falling.'],['grow','büyümek','The town is growing.'],['start / begin','başlamak','I’m starting to understand.']]},
 {k:'state',t:'Durum fiilleri (state verbs)',u:4,w:[['like','sevmek, hoşlanmak','I like this song.'],['love','çok sevmek','She loves her job.'],['hate','nefret etmek','I hate waiting.'],['want','istemek','Do you want tea?'],['need','ihtiyaç duymak','We need help.'],['prefer','tercih etmek','I prefer tea to coffee.'],['know','bilmek, tanımak','I know the answer.'],['realise','farkına varmak','I didn’t realise it was late.'],['understand','anlamak','Do you understand?'],['recognise','tanımak (görünce)','I didn’t recognise you!'],['believe','inanmak','I believe you.'],['suppose','sanmak, farz etmek','I suppose you’re right.'],['remember','hatırlamak','I remember her face.'],['mean','anlamına gelmek','What does it mean?'],['belong','ait olmak','It belongs to me.'],['fit','uymak (beden)','These shoes don’t fit.'],['contain','içermek','The box contains books.'],['consist','oluşmak','Water consists of H and O.'],['seem','gibi görünmek','You seem tired.']]},
 {k:'senses',t:'Duyu fiilleri',u:4,w:[['see','görmek','I see a light.'],['hear','duymak','Can you hear me?'],['smell','kokmak, koklamak','It smells nice.'],['taste','tadı olmak','It tastes sweet.'],['look','görünmek','You look happy.'],['feel','hissetmek','I feel tired.']]},
 {k:'speech',t:'Söyleyerek yapılanlar',u:2,w:[['promise','söz vermek','I promise I’ll help.'],['suggest','önermek','I suggest we leave.'],['apologise','özür dilemek','I apologise for being late.'],['advise','tavsiye etmek','I advise you to rest.'],['insist','ısrar etmek','I insist on paying.'],['agree','katılmak','I agree with you.'],['refuse','reddetmek','I refuse to answer.'],['recommend','tavsiye etmek','I recommend this book.']]},
 {k:'freq',t:'Sıklık ve zaman ifadeleri',u:2,w:[['always','her zaman','I always walk.'],['usually','genellikle','I usually get up at 7.'],['often','sık sık','We often eat out.'],['sometimes','bazen','She sometimes calls.'],['rarely','nadiren','He rarely smiles.'],['never','asla, hiç','I never smoke.'],['at the moment','şu anda','I’m busy at the moment.'],['nowadays','bugünlerde','What are you doing nowadays?'],['ago','önce','two days ago'],['since','-den beri','since Monday'],['for','… süredir','for two hours'],['just','az önce','I’ve just eaten.'],['already','zaten, çoktan','She’s already left.'],['yet','henüz','Not yet.'],['ever','hiç (soru)','Have you ever…?'],['so far','şimdiye kadar','So far, so good.'],['recently','son zamanlarda','I’ve been busy recently.'],['lately','son günlerde','It’s rained a lot lately.']]},
 {k:'have',t:'have ile kalıplar',u:17,w:[['have breakfast','kahvaltı etmek','I have breakfast at 8.'],['have a shower','duş almak','He’s having a shower.'],['have a party','parti vermek','We’re having a party.'],['have a good time','iyi vakit geçirmek','Have a good time!'],['have a look','göz atmak','Let me have a look.'],['have a rest','dinlenmek','Have a rest.'],['have a baby','bebeği olmak','She’s just had a baby.'],['have a chat','sohbet etmek','We had a chat.'],['have trouble','sorun yaşamak','I had trouble finding it.']]},
 {k:'actions',t:'Ünitelerden günlük eylemler',u:1,w:[['cross','karşıdan karşıya geçmek','She’s crossing the road.'],['hide','saklanmak','He’s hiding behind a tree.'],['scratch','kaşımak','He’s scratching his head.'],['tie','bağlamak','I’m tying my shoelace.'],['wave','el sallamak','She’s waving to us.'],['argue','tartışmak','They’re always arguing.'],['complain','şikâyet etmek','He’s always complaining.'],['borrow','ödünç almak','Can I borrow your pen?'],['lend','ödünç vermek','I lent him my car.'],['arrange','ayarlamak','We’ve arranged a meeting.'],['book','rezervasyon yapmak','I’ve booked a table.'],['decide','karar vermek','I’ve decided to stay.']]}
];
/* Hangi zaman? [cümle, zaman anahtarı] */
const TSENT=[
 ['She is talking on the phone right now.','pc'],['I usually drink tea in the morning.','ps'],['We visited our grandparents last weekend.','pas'],
 ['I was sleeping when you called.','pac'],['I’ve lost my keys.','pp'],['It’s been raining since this morning.','ppc'],
 ['When we arrived, the film had started.','pap'],['They had been walking for hours when they found the village.','papc'],
 ['I used to live in a small town.','ut'],['Look at those clouds! It’s going to rain.','gt'],['I’m hungry. I think I’ll make a sandwich.','wi'],
 ['Water freezes at 0°C.','ps'],['What are you doing at the moment?','pc'],['Did you finish your homework?','pas'],['What were you doing at 9 last night?','pac'],
 ['Have you ever eaten Thai food?','pp'],['How long have you been learning English?','ppc'],['She didn’t know him because she had never met him.','pap'],
 ['His clothes were dirty because he had been fixing the car.','papc'],['Did you use to play football?','ut'],['We’re going to buy a new house.','gt'],
 ['Don’t worry, I won’t tell anybody.','wi'],['The earth goes round the sun.','ps'],['Prices are rising every month.','pc'],['Shakespeare wrote many plays.','pas'],
 ['While I was cooking, the lights went out.','pac'],['She has just left.','pp'],['I’m tired. I’ve been working all day.','ppc'],['There used to be a cinema here.','ut'],
 ['Shall I open the window?','wi'],['I’m sure you’ll pass the exam.','wi'],['What are you going to do after school?','gt'],
 ['This time tomorrow I’ll be flying to Paris.','wb'],['By 6 pm I’ll have finished the report.','wh'],['Don’t call at 9 – we’ll be watching the match.','wb'],['They will have left by the time we arrive.','wh']
];
/* Doğru mu yanlış mı? [cümle, doğru mu, düzeltme/açıklama] — her ünitenin “dikkat” maddelerinden de beslenir */
const DY_EXTRA=[
 ['I am liking this music.',false,'I like this music. (like durum fiili)'],
 ['He doesn’t like cheese.',true,'Doğru: doesn’t + yalın fiil.'],
 ['I have seen him yesterday.',false,'I saw him yesterday. (yesterday → past simple)'],
 ['How long have you lived here?',true,'Doğru: hâlâ süren durum.'],
 ['She is working here since 2019.',false,'She has worked / has been working here since 2019.'],
 ['When I got home, my mother had cooked dinner.',true,'Doğru: önceki geçmiş.'],
 ['Did you used to swim?',false,'Did you use to swim?'],
 ['The phone is ringing. I’ll get it.',true,'Doğru: anlık karar.'],
 ['I’m seeing the doctor tomorrow at ten.',true,'Doğru: ayarlanmış plan.'],
 ['The train is leaving at 6.15 every day.',false,'The train leaves at 6.15 every day. (tarife)'],
 ['We have known each other for years.',true,'Doğru: know → simple.'],
 ['I’ve read three books this week.',true,'Doğru: miktar → simple.'],
 ['Look! It’s going to rain.',true,'Doğru: görünen kanıt.'],
 ['I didn’t went to school.',false,'I didn’t go to school.'],
 ['Does she speaks English?',false,'Does she speak English?'],
 ['I’ll call you when I will get home.',false,'I’ll call you when I get home.'],
 ['By next year I’ll have saved enough money.',true,'Doğru: will have done.'],
 ['If it will be sunny, we’ll go out.',false,'If it is sunny, we’ll go out.']
];
