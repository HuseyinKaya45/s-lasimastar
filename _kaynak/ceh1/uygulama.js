(function(){
"use strict";
/* ---------- yardımcılar ---------- */
var $=function(s,r){return (r||document).querySelector(s)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function range(n){var r=[];for(var i=0;i<n;i++)r.push(i);return r}
var KEY="ceh1:durum";
var S={xp:0,seri:0,son:"",bitti:{},lt:{},sinav:[],yanlis:{},tema:"",yazi:0,rozet:{},tekrar:0};
try{var k=JSON.parse(localStorage.getItem(KEY)||"null");if(k)for(var x in k)S[x]=k[x]}catch(e){}
function kaydet(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function bugun(){return Math.floor(Date.now()/864e5)}
function gunSeri(){var b=bugun(),s=S.son===""?null:+S.son;if(s===b)return;if(s===b-1)S.seri++;else S.seri=1;S.son=String(b);kaydet()}
function xp(n){S.xp+=n;kaydet();rozetler()}
function bitir(id,puan){if(!S.bitti[id]){S.bitti[id]=1;xp(puan||25)}kaydet();gunSeri()}
var ROZET=[["ilk","🌱","İlk adım",function(){return Object.keys(S.bitti).length>=1}],
["etik","⚖️","Etik bekçisi",function(){return S.bitti["ders-etik"]&&S.bitti["sn-kapsam"]&&S.bitti["sn-ifsa"]}],
["zincir","⛓️","Zinciri kıran",function(){return S.bitti["ord-kill"]&&S.bitti["mat-kill"]}],
["kasif","🧭","Kâşif (5 aşama)",function(){return S.bitti["ord-faz"]&&S.bitti["sort-faz"]&&S.bitti["ders-faz"]}],
["atk","🗺️","ATT&CK haritacısı",function(){return S.bitti["ord-atk1"]&&S.bitti["ord-atk2"]&&S.bitti["mat-atk"]}],
["tekrar","🔁","Tekrar ustası",function(){return S.tekrar>=50}],
["sinav","🎓","Sınav adayı (%75+)",function(){return S.sinav.some(function(x){return x.puan>=75})}],
["seri","🔥","3 gün seri",function(){return S.seri>=3}]];
function rozetler(){ROZET.forEach(function(r){if(!S.rozet[r[0]]&&r[3]())S.rozet[r[0]]=1});kaydet()}

/* ---------- soru bankası ---------- */
var BANKA=SORULAR.map(function(q,i){return{id:"s"+i,k:q.k,q:q.q,o:q.o,a:q.a,e:q.e}}).concat(KONULAR.map(function(t){return{id:t.id,k:"teknik",q:t.q,o:t.o,a:t.a,e:t.e}}));
function vm(q){var o=shuffle(range(q.o.length));return{id:q.id,k:q.k,q:q.q,e:q.e,o:o.map(function(i){return{t:q.o[i],ok:i===q.a}})}}

/* ---------- durum ---------- */
var V={tab:"ana",ders:"etik",kart:0,run:null,fkon:"hepsi",exam:null,ara:""};
var DERS_ID=Object.keys(DERSLER);
var TABS=[["ana","🏠","Ana sayfa"],["ders","📖","Dersler"],["etk","🎮","Etkinlikler"],["sen","🎭","Senaryolar"],["konu","🧪","Test konuları"],["kart","🔁","Kartlar"],["sinav","📝","Sınav"],["soz","📚","Sözlük"]];

/* ---------- görünümler ---------- */
var views={};
function ilerleme(){var hepsi=[];DERS_ID.forEach(function(d){hepsi.push("ders-"+d)});
SIRALAMA.concat(ESLESTIRME,SINIFLA).forEach(function(a){hepsi.push(a.id)});SENARYOLAR.concat(VAKALAR).forEach(function(a){hepsi.push(a.id)});KONULAR.forEach(function(t){hepsi.push(t.id)});
var d=hepsi.filter(function(i){return S.bitti[i]}).length;return{d:d,t:hepsi.length,y:Math.round(100*d/hepsi.length)}}
views.ana=function(){var p=ilerleme(),h=bugun();var vadeli=Object.keys(S.lt).filter(function(i){return S.lt[i].d<=h}).length;
var plan=[["1. Gün","Etik Kodu dersi + 3 senaryo"],["2. Gün","Etik Hackleme dersi + Şapka eşleştirme + Etik mi değil mi"],["3. Gün","Kill Chain dersi + sıralama + eşleştirme + Aylin vakası"],["4. Gün","Attack Life Cycle + ATT&CK etkinlikleri"],["5. Gün","5 Aşama dersi + sınıflama + vaka"],["6. Gün","Test konuları (30 mini ders) + kartlar"],["7. Gün","Deneme sınavı + yanlışlarını tekrar"]];
return '<h1>Hoş geldin! 👋</h1><p class="muted">CEH (Certified Ethical Hacker) <b>Bölüm 1: Ethical Hacking</b> ve giriş testi konuları için, etkinliklerle öğreten, tamamen çevrimdışı çalışan bir çalışma programı.</p>'+
'<div class="card"><div class="stat"><div><b>%'+p.y+'</b>genel ilerleme</div><div><b>'+S.xp+'</b>puan (XP)</div><div><b>'+S.seri+'</b>günlük seri</div><div><b>'+vadeli+'</b>tekrar bekleyen kart</div></div><div class="bar" style="margin-top:12px"><i style="width:'+p.y+'%"></i></div><p class="small muted">'+p.d+' / '+p.t+' etkinlik tamamlandı. İlerlemen bu tarayıcıda saklanır.</p></div>'+
'<div class="grid">'+
[["ders","📖","Derslerle başla","Etik, etik hackleme, saldırı modelleri, 5 aşama. Benzetmeler ve hafıza ipuçlarıyla."],["etk","🎮","Etkinlik yap","Sıralama, eşleştirme, sınıflama: aktif hatırlama en kalıcı öğrenmedir."],["sen","🎭","Senaryolarla dene","Gerçek hayattan kurgu vakalarda karar ver, sonucunu gör."],["kart","🔁","Aralıklı tekrar","Kartları Leitner kutularıyla tekrar et; unutmadan hatırla."],["sinav","📝","Deneme sınavı","Süreli ya da süresiz. Konu bazlı sonuç ve açıklamalı inceleme."]].map(function(c){return '<button class="card btn" data-a="tab" data-v="'+c[0]+'" style="text-align:left"><div class="big">'+c[1]+'</div><b>'+c[2]+'</b><div class="small muted" style="font-weight:500">'+c[3]+'</div></button>'}).join('')+'</div>'+
'<h2>🏅 Rozetler</h2><div>'+ROZET.map(function(r){return '<span class="badge '+(S.rozet[r[0]]?'on':'')+'">'+r[1]+' '+r[2]+'</span>'}).join('')+'</div>'+
'<h2>🗓️ 7 günlük çalışma önerisi</h2><div class="card"><dl>'+plan.map(function(x){return '<dt>'+x[0]+'</dt><dd>'+x[1]+'</dd>'}).join('')+'</dl></div>'+
'<div class="card"><h3>🧠 Nasıl çalışırsan kalıcı olur?</h3><ul><li><b>Önce oku, sonra kendini sına:</b> her dersin ardından etkinlik yap.</li><li><b>Benzetmeleri kullan:</b> kilit ustası, yangın tatbikatı, soygun filmi, bina denetimi.</li><li><b>Aralıklı tekrar:</b> kartları her gün 10 dakika çalış.</li><li><b>Yanlışlarından öğren:</b> sınavdaki yanlış sorular “zayıf noktalar” listesine girer.</li></ul><p class="small muted">Not: Bu program özgün anlatımla hazırlanmıştır; kitaptaki cümleler birebir kopyalanmaz. Resmî sınav için EC-Council kaynaklarına da bak.</p></div>'};

function dersGoster(){var d=DERSLER[V.ders],ids=DERS_ID;var oku=S["oku-"+V.ders]||{};var n=d.kartlar.length,okundu=Object.keys(oku).length;
var h='<h1>'+d.ikon+' '+d.ad+'</h1><div class="chipbar">'+ids.map(function(i){return '<button class="cb" data-a="ders" data-v="'+i+'" aria-pressed="'+(i===V.ders)+'">'+DERSLER[i].ikon+' '+DERSLER[i].ad+(S.bitti["ders-"+i]?' ✓':'')+'</button>'}).join('')+'</div>';
h+='<p>'+d.giris+'</p><div class="analoji"><b>🧩 '+d.analoji.b+'</b><br>'+d.analoji.m+'</div>';
h+='<div class="bar"><i style="width:'+Math.round(100*okundu/n)+'%"></i></div><p class="small muted">'+okundu+' / '+n+' kart okundu</p>';
d.kartlar.forEach(function(c,i){h+='<div class="card'+(oku[i]?'':' ')+'"><div class="row"><h3>'+(i+1)+'. '+c.b+'</h3>'+(oku[i]?'<span class="pill ok">okundu</span>':'')+'</div><p>'+c.m+'</p><div class="tip">💡 <b>Hafıza ipucu:</b> '+c.ip+'</div><div class="trap">⚠️ <b>Sınav tuzağı:</b> '+c.tr+'</div>'+(oku[i]?'':'<button class="btn pri" data-a="oku" data-v="'+i+'">Anladım ✓</button>')+'</div>'});
if(okundu===n){h+='<div class="card"><h3>🧪 Mini test</h3><p class="muted">Bu dersin konusundan 5 soru. Çözünce ders tamamlanır.</p><button class="btn pri" data-a="mini" data-v="'+V.ders+'">Mini testi başlat</button></div>'}
return h}
views.ders=function(){if(V.run&&V.run.tip==="mini")return miniGoster();return dersGoster()};
function miniGoster(){var r=V.run,q=r.qs[r.i];if(r.i>=r.qs.length){var puan=Math.round(100*r.dogru/r.qs.length);return '<div class="card center"><div class="big">'+(puan>=60?'🎉':'💪')+'</div><h2>Mini test bitti: %'+puan+'</h2><p>'+r.dogru+' / '+r.qs.length+' doğru</p><button class="btn pri" data-a="mini-son">Derse dön</button></div>'}
return '<h1>Mini test — '+DERSLER[r.ders].ad+'</h1><p class="muted">Soru '+(r.i+1)+' / '+r.qs.length+'</p>'+soruHtml(q,r.sec,"mini-pick")+(r.sec!==null?'<button class="btn pri" data-a="mini-next">'+(r.i+1===r.qs.length?'Bitir':'Sonraki')+'</button>':'')}
function soruHtml(q,sec,act){var h='<div class="card"><p><b>'+q.q+'</b></p>';q.o.forEach(function(o,i){var c="";if(sec!==null){if(o.ok)c=" ok";else if(i===sec)c=" bad"}h+='<button class="opt'+c+'" data-a="'+act+'" data-v="'+i+'"'+(sec!==null?' disabled':'')+'>'+esc(o.t)+'</button>'});
if(sec!==null)h+='<div class="fb '+(q.o[sec].ok?'ok':'bad')+'" role="status">'+(q.o[sec].ok?'✅ Doğru! ':'❌ Yanlış. ')+q.e+'</div>';return h+'</div>'}

/* ---- etkinlikler ---- */
function etkListe(){var tipler=[["ord","Sıralama","🔢",SIRALAMA],["mat","Eşleştirme","🔗",ESLESTIRME],["sort","Sınıflandırma","🗂️",SINIFLA]];
var h='<h1>🎮 Etkinlikler</h1><p class="muted">Sıralama, eşleştirme ve sınıflandırma. Doğru yaptıkça puan kazanırsın; bitirince ✓ işareti alırsın.</p>';
tipler.forEach(function(t){h+='<h2>'+t[2]+' '+t[1]+'</h2><div class="grid">'+t[3].map(function(a){return '<button class="card btn" data-a="open" data-t="'+t[0]+'" data-v="'+a.id+'" style="text-align:left"><b>'+a.b+'</b> '+(S.bitti[a.id]?'<span class="pill ok">✓ bitti</span>':'')+'<div class="small muted" style="font-weight:500">'+a.t+'</div></button>'}).join('')+'</div>'});return h}
function actById(t,id){return(t==="ord"?SIRALAMA:t==="mat"?ESLESTIRME:SINIFLA).filter(function(a){return a.id===id})[0]}
function openAct(t,id){var a=actById(t,id);V.run={tip:t,id:id};
if(t==="ord"){V.run.pool=shuffle(range(a.items.length));V.run.ans=[];V.run.chk=false;V.run.hata=0}
if(t==="mat"){V.run.L=shuffle(range(a.p.length));V.run.R=shuffle(range(a.p.length));V.run.sl=null;V.run.done={};V.run.hata=0}
if(t==="sort"){V.run.order=shuffle(range(a.items.length));V.run.i=0;V.run.dogru=0;V.run.sec=null;V.run.yanlis=[]}}
function ordGoster(a){var r=V.run,h='<button class="btn" data-a="back">← Etkinlikler</button><h1>'+a.b+'</h1><p>'+a.t+'</p>';
h+='<div class="card"><b>Senin sıran:</b><ol class="ans">'+r.ans.map(function(i,pos){var c="";if(r.chk)c=(i===pos?" ok":" bad");return '<li><button class="tile'+c+'" data-a="o-del" data-v="'+pos+'">'+esc(a.items[i])+'</button></li>'}).join('')+'</ol>'+(r.ans.length?'':'<p class="muted">Aşağıdaki kutulara sırayla dokun.</p>')+'</div>';
h+='<div class="pool">'+r.pool.map(function(i){var used=r.ans.indexOf(i)>=0;return '<button class="tile'+(used?' used':'')+'" data-a="o-add" data-v="'+i+'"'+(used||r.chk&&r.ans.length===a.items.length?' disabled':'')+'>'+esc(a.items[i])+'</button>'}).join('')+'</div>';
var tam=r.ans.length===a.items.length;h+='<div class="row"><button class="btn pri" data-a="o-chk"'+(tam?'':' disabled')+'>Kontrol et</button><button class="btn" data-a="o-reset">Sıfırla</button></div>';
if(r.chk){var dog=r.ans.every(function(i,p){return i===p});h+='<div class="fb '+(dog?'ok':'bad')+'" role="status">'+(dog?'🎉 Tam doğru! Sıra: ':'Henüz değil — yeşiller doğru yerde. Kırmızılara dokunup çıkar, tekrar dene.')+'</div>';
if(dog){h+='<div class="card"><b>Aşamalar ve anlamları</b><ol>'+a.items.map(function(x,i){return '<li><b>'+esc(x)+'</b> — '+esc(a.not[i])+'</li>'}).join('')+'</ol></div>'}}return h}
function matGoster(a){var r=V.run,n=a.p.length;var h='<button class="btn" data-a="back">← Etkinlikler</button><h1>'+a.b+'</h1><p>'+a.t+' <span class="muted small">(önce soldan, sonra sağdan dokun)</span></p><div class="two"><div>';
r.L.forEach(function(i){var d=r.done[i];h+='<button class="tile'+(d?' ok':(r.sl===i?' sel':''))+'" data-a="m-l" data-v="'+i+'" style="display:block;width:100%;margin:6px 0"'+(d?' disabled':'')+'>'+esc(a.p[i][0])+'</button>'});h+='</div><div>';
r.R.forEach(function(i){var d=r.done[i];h+='<button class="tile'+(d?' ok':'')+'" data-a="m-r" data-v="'+i+'" style="display:block;width:100%;margin:6px 0;text-align:left"'+(d?' disabled':'')+'>'+esc(a.p[i][1])+'</button>'});h+='</div></div>';
var k=Object.keys(r.done).length;h+='<p class="muted">'+k+' / '+n+' eşleşti · hata: '+r.hata+'</p>';
if(k===n){h+='<div class="fb ok pop">🎉 Hepsi eşleşti! '+(r.hata===0?'Hatasız!':'')+'</div>'}return h}
function sortGoster(a){var r=V.run;if(r.i>=a.items.length){var p=Math.round(100*r.dogru/a.items.length);var h='<button class="btn" data-a="back">← Etkinlikler</button><div class="card center"><div class="big">'+(p>=70?'🎉':'💪')+'</div><h2>%'+p+' — '+r.dogru+'/'+a.items.length+'</h2>';
if(r.yanlis.length){h+='<p class="muted">Tekrar bak:</p><ul style="text-align:left">'+r.yanlis.map(function(i){return '<li>'+esc(a.items[i][0])+' → <b>'+esc(a.kovalar[a.items[i][1]])+'</b></li>'}).join('')+'</ul>'}return h+'<button class="btn pri" data-a="open" data-t="sort" data-v="'+a.id+'">Yeniden dene</button></div>'}
var it=a.items[r.order[r.i]];var h2='<button class="btn" data-a="back">← Etkinlikler</button><h1>'+a.b+'</h1><p>'+a.t+'</p><p class="muted small">Soru '+(r.i+1)+' / '+a.items.length+'</p><div class="card"><p><b>'+esc(it[0])+'</b></p><div class="chipbar">';
a.kovalar.forEach(function(k,i){var c="";if(r.sec!==null){if(i===it[1])c=" ok";else if(i===r.sec)c=" bad"}h2+='<button class="tile'+c+'" data-a="s-pick" data-v="'+i+'"'+(r.sec!==null?' disabled':'')+'>'+esc(k)+'</button>'});h2+='</div>';
if(r.sec!==null){h2+='<div class="fb '+(r.sec===it[1]?'ok':'bad')+'" role="status">'+(r.sec===it[1]?'✅ Doğru!':'❌ Doğrusu: <b>'+esc(a.kovalar[it[1]])+'</b>')+'</div><button class="btn pri" data-a="s-next">Devam</button>'}return h2+'</div>'}
views.etk=function(){if(!V.run||V.run.tip==="mini"||V.run.tip==="sn"||V.run.tip==="vk")return etkListe();var a=actById(V.run.tip,V.run.id);return V.run.tip==="ord"?ordGoster(a):V.run.tip==="mat"?matGoster(a):sortGoster(a)};

/* ---- senaryolar ---- */
function senListe(){var h='<h1>🎭 Senaryolar ve vakalar</h1><p class="muted">Kurgu karakterlerle gerçekçi durumlar. Her adımda karar ver; “en iyi”, “kısmen” ve “yanlış” seçenekleri görürsün.</p><h2>⚖️ Karar senaryoları</h2><div class="grid">';
SENARYOLAR.forEach(function(s){h+='<button class="card btn" data-a="sn-open" data-t="sn" data-v="'+s.id+'" style="text-align:left"><div class="big">'+s.ikon+'</div><b>'+s.b+'</b> '+(S.bitti[s.id]?'<span class="pill ok">✓</span>':'')+'<div class="small muted" style="font-weight:500">'+({etik:"Etik",faz:"5 aşama",tur:"Terimler"}[s.konu])+' · '+s.adimlar.length+' adım</div></button>'});
h+='</div><h2>🔍 Saldırı hikâyesi vakaları</h2><p class="muted small">Olayı adım adım izle; her adımı Kill Chain / Life Cycle / ATT&CK / 5 aşama ile etiketle.</p><div class="grid">';
VAKALAR.forEach(function(s){h+='<button class="card btn" data-a="sn-open" data-t="vk" data-v="'+s.id+'" style="text-align:left"><div class="big">'+s.ikon+'</div><b>'+s.b+'</b> '+(S.bitti[s.id]?'<span class="pill ok">✓</span>':'')+'<div class="small muted" style="font-weight:500">'+s.adimlar.length+' adım</div></button>'});return h+'</div>'}
function snGoster(){var r=V.run,s=r.tip==="sn"?SENARYOLAR.filter(function(x){return x.id===r.id})[0]:VAKALAR.filter(function(x){return x.id===r.id})[0];var h='<button class="btn" data-a="sen-back">← Senaryolar</button><h1>'+s.ikon+' '+s.b+'</h1><div class="analoji">'+s.giris+'</div>';
var n=s.adimlar.length;
if(r.i>=n){var max=r.tip==="sn"?n*2:n;var p=Math.round(100*r.puan/max);return h+'<div class="card center"><div class="big">'+(p>=80?'🏆':p>=50?'👍':'📚')+'</div><h2>Sonuç: %'+p+'</h2><p class="muted">'+r.puan+' / '+max+' puan</p><p>'+(r.tip==="sn"?'Hatırla: kapsam yazılı, bulgu şeffaf, hassas veri gizli, ifşa sorumlu.':'Eylemleri doğru etiketlemek, sınav sorularında bağlamı hızla çözmeni sağlar.')+'</p><button class="btn pri" data-a="sn-again">Tekrar dene</button> <button class="btn" data-a="sen-back">Listeye dön</button></div>'}
var st=s.adimlar[r.i];h+='<p class="muted small">Adım '+(r.i+1)+' / '+n+'</p>';
if(!r.perm||r.permI!==r.i){r.perm=shuffle(range(st.o.length));r.permI=r.i}
if(r.tip==="sn"){h+='<div class="card"><p><b>'+st.s+'</b></p>';r.perm.forEach(function(i){var o=st.o[i];var c="";if(r.sec!==null){c=" "+(o[1]===2?"ok":o[1]===1?"half":"bad");if(i!==r.sec&&o[1]!==2)c=""}h+='<button class="opt'+c+'" data-a="sn-pick" data-v="'+i+'"'+(r.sec!==null?' disabled':'')+'>'+esc(o[0])+'</button>'});
if(r.sec!==null){var o=st.o[r.sec];h+='<div class="fb '+(o[1]===2?'ok':o[1]===1?'half':'bad')+'" role="status">'+(o[1]===2?'✅ En iyi seçim. ':o[1]===1?'🟡 Kısmen. ':'❌ Yanlış. ')+o[2]+'</div><button class="btn pri" data-a="sn-next">'+(r.i+1===n?'Sonucu gör':'Devam')+'</button>'}h+='</div>'}
else{h+='<div class="card"><div class="tip">'+st.m+'</div><p><b>'+st.s+'</b></p>';r.perm.forEach(function(i){var o=st.o[i];var c="";if(r.sec!==null){if(i===st.a)c=" ok";else if(i===r.sec)c=" bad"}h+='<button class="opt'+c+'" data-a="sn-pick" data-v="'+i+'"'+(r.sec!==null?' disabled':'')+'>'+esc(o)+'</button>'});
if(r.sec!==null){h+='<div class="fb '+(r.sec===st.a?'ok':'bad')+'" role="status">'+(r.sec===st.a?'✅ Doğru! ':'❌ Yanlış. ')+st.e+'</div><button class="btn pri" data-a="sn-next">'+(r.i+1===n?'Sonucu gör':'Devam')+'</button>'}h+='</div>'}return h}
views.sen=function(){if(V.run&&(V.run.tip==="sn"||V.run.tip==="vk"))return snGoster();return senListe()};

/* ---- test konuları ---- */
views.konu=function(){var op=V.kopen,h='<h1>🧪 Giriş testi konuları</h1><p class="muted">Kitabın başındaki 30 soruluk giriş testinin konuları: her biri mini ders + özgün bir soru. (Soruların kendisi değil, <i>konuları</i> çalışılır.)</p>';
var bit=KONULAR.filter(function(t){return S.bitti[t.id]}).length;h+='<div class="bar"><i style="width:'+Math.round(100*bit/KONULAR.length)+'%"></i></div><p class="small muted">'+bit+' / '+KONULAR.length+' tamamlandı</p>';
KONULAR.forEach(function(t,i){var acik=op===t.id,sec=V.ksec&&V.ksec[t.id];h+='<div class="card"><button class="btn" data-a="k-open" data-v="'+t.id+'" style="width:100%;text-align:left">'+(i+1)+'. '+t.b+' '+(S.bitti[t.id]?'<span class="pill ok">✓</span>':'')+'</button>';
if(acik){h+='<p>'+t.m+'</p><div class="tip">💡 '+t.ip+'</div><p><b>'+t.q+'</b></p>';var o=V.kvm[t.id];o.forEach(function(x,j){var c="";if(sec!==undefined){if(x.ok)c=" ok";else if(j===sec)c=" bad"}h+='<button class="opt'+c+'" data-a="k-pick" data-v="'+t.id+'|'+j+'"'+(sec!==undefined?' disabled':'')+'>'+esc(x.t)+'</button>'});
if(sec!==undefined)h+='<div class="fb '+(o[sec].ok?'ok':'bad')+'" role="status">'+(o[sec].ok?'✅ Doğru! ':'❌ Yanlış. ')+t.e+'</div>'}h+='</div>'});return h};

/* ---- kartlar (Leitner) ---- */
var ARAL=[0,1,3,7,14,30];
function kartKuyruk(){var h=bugun(),idx=range(FLASH.length).filter(function(i){return V.fkon==="hepsi"||FLASH[i][0]===V.fkon});var vade=idx.filter(function(i){return S.lt[i]&&S.lt[i].d<=h});var yeni=idx.filter(function(i){return!S.lt[i]}).slice(0,10);return shuffle(vade).concat(yeni)}
views.kart=function(){if(!V.fq){V.fq=kartKuyruk();V.fi=0;V.ff=false}
var kons=[["hepsi","Hepsi"],["etik","Etik"],["tur","Etik hackleme"],["model","Modeller"],["faz","5 aşama"],["teknik","Test konuları"]];
var h='<h1>🔁 Aralıklı tekrar kartları</h1><p class="muted">Karta bak, cevabı kendin hatırla, sonra çevir. “Bildim” kartı sonraki kutuya taşır (1→5 gün aralıkları: 1, 3, 7, 14, 30). “Bilemedim” kartı başa alır.</p><div class="chipbar">'+kons.map(function(k){return '<button class="cb" data-a="f-kon" data-v="'+k[0]+'" aria-pressed="'+(V.fkon===k[0])+'">'+k[1]+'</button>'}).join('')+'</div>';
var kut=[0,0,0,0,0,0];Object.keys(S.lt).forEach(function(i){kut[S.lt[i].b]++});h+='<p class="small muted">Kutu 1: '+kut[1]+' · 2: '+kut[2]+' · 3: '+kut[3]+' · 4: '+kut[4]+' · 5: '+kut[5]+' · henüz görülmemiş: '+(FLASH.length-Object.keys(S.lt).length)+'</p>';
if(V.fi>=V.fq.length){return h+'<div class="card center"><div class="big">✨</div><h2>Bugünlük bu kadar!</h2><p class="muted">'+(V.fq.length?V.fq.length+' kartı tekrar ettin.':'Bu filtrede şimdilik tekrar bekleyen kart yok.')+'</p><button class="btn pri" data-a="f-yenile">Yeni tur</button></div>'}
var c=FLASH[V.fq[V.fi]];h+='<p class="muted small">Kart '+(V.fi+1)+' / '+V.fq.length+'</p><div class="card flash" data-a="f-flip" role="button" tabindex="0">'+(V.ff?'<div>'+esc(c[2])+'<div class="small muted" style="font-weight:500;margin-top:8px">'+esc(c[1])+'</div></div>':'<div>'+esc(c[1])+'<div class="small muted" style="font-weight:500;margin-top:8px">dokun, cevabı çevir</div></div>')+'</div>';
if(V.ff)h+='<div class="row"><button class="btn ok" data-a="f-yes">✔ Bildim</button><button class="btn" data-a="f-no" style="border-color:var(--bad)">✘ Bilemedim</button></div>';else h+='<button class="btn pri" data-a="f-flip">Cevabı göster</button>';return h};

/* ---- sınav ---- */
views.sinav=function(){var E=V.exam;if(!E)return sinavBas();if(E.bitti)return sinavSonuc();return sinavSoru()};
function sinavBas(){var son=S.sinav.slice(-5).reverse();var yanl=Object.keys(S.yanlis).filter(function(i){return S.yanlis[i]>0}).length;
var h='<h1>📝 Deneme sınavı</h1><div class="card"><div class="two"><div><label class="small muted">Soru sayısı</label><select id="sn-n"><option>10</option><option>20</option><option selected>40</option><option>'+BANKA.length+'</option></select></div><div><label class="small muted">Konu</label><select id="sn-k"><option value="hepsi">Hepsi</option><option value="etik">Etik kodu</option><option value="tur">Etik hackleme</option><option value="model">Saldırı modelleri</option><option value="faz">5 aşama</option><option value="teknik">Giriş testi konuları</option></select></div></div><div class="row" style="margin-top:10px"><label><input type="checkbox" id="sn-t"> Süreli (soru başına 1 dk)</label></div><div class="row" style="margin-top:10px"><button class="btn pri" data-a="ex-start">Sınavı başlat</button><button class="btn" data-a="ex-weak"'+(yanl?'':' disabled')+'>Zayıf noktalarım ('+yanl+' soru)</button></div></div>';
h+='<h2>Son sonuçlar</h2>'+(son.length?'<div class="card"><table style="width:100%"><tr class="muted small"><td>Tarih</td><td>Puan</td><td>Soru</td></tr>'+son.map(function(x){return '<tr><td>'+esc(x.t)+'</td><td><b>%'+x.puan+'</b></td><td>'+x.n+'</td></tr>'}).join('')+'</table></div>':'<p class="muted">Henüz sınav çözmedin.</p>');return h}
function sinavSoru(){var E=V.exam,q=E.qs[E.i];var h='<div class="row"><b>Soru '+(E.i+1)+' / '+E.qs.length+'</b><span class="pill">'+KONU_AD[q.k]+'</span>'+(E.sure?'<span class="timer pill acc" id="zaman">⏱ --:--</span>':'')+'</div>';
h+='<div class="card"><p><b>'+q.q+'</b></p>';q.o.forEach(function(o,i){h+='<button class="opt'+(E.cev[E.i]===i?' sel':'')+'" style="'+(E.cev[E.i]===i?'border-color:var(--pri);background:var(--pri2)':'')+'" data-a="ex-pick" data-v="'+i+'">'+esc(o.t)+'</button>'});h+='</div>';
h+='<div class="row"><button class="btn" data-a="ex-prev"'+(E.i?'':' disabled')+'>← Önceki</button><button class="btn" data-a="ex-flag">'+(E.flag[E.i]?'🚩 İşaretli':'🏳️ İşaretle')+'</button>'+(E.i<E.qs.length-1?'<button class="btn pri" data-a="ex-next">Sonraki →</button>':'<button class="btn ok" data-a="ex-finish">Sınavı bitir</button>')+'</div>';
h+='<p class="small muted">Gezinme (yeşil = cevaplandı, turuncu çerçeve = işaretli):</p><div class="nav-q">'+E.qs.map(function(x,i){return '<button class="'+(i===E.i?'cur ':'')+(E.cev[i]!==undefined?'ans ':'')+(E.flag[i]?'flag':'')+'" data-a="ex-go" data-v="'+i+'">'+(i+1)+'</button>'}).join('')+'</div>';
if(E.i===E.qs.length-1)h+='<p class="small muted">Bitirmeden önce boş: '+E.qs.filter(function(x,i){return E.cev[i]===undefined}).length+' soru.</p>';return h}
function sinavSonuc(){var E=V.exam,dog=0,kon={};E.qs.forEach(function(q,i){var ok=E.cev[i]!==undefined&&q.o[E.cev[i]].ok;if(ok)dog++;kon[q.k]=kon[q.k]||[0,0];kon[q.k][1]++;if(ok)kon[q.k][0]++});var p=Math.round(100*dog/E.qs.length);
var h='<div class="card center"><div class="big">'+(p>=75?'🏆':p>=50?'👍':'📚')+'</div><h1>%'+p+'</h1><p>'+dog+' / '+E.qs.length+' doğru · '+(p>=75?'Harika, sınava yakınsın!':p>=50?'İyi gidiyorsun; yanlışlarını tekrar et.':'Dersleri ve kartları tekrar et, sonra yeniden dene.')+'</p></div>';
h+='<h2>Konu bazlı</h2><div class="card">'+Object.keys(kon).map(function(k){var y=Math.round(100*kon[k][0]/kon[k][1]);return '<div class="row" style="justify-content:space-between"><span>'+KONU_AD[k]+'</span><b>'+kon[k][0]+'/'+kon[k][1]+' (%'+y+')</b></div><div class="bar"><i style="width:'+y+'%"></i></div>'}).join('')+'</div>';
h+='<h2>Yanlışlarını incele</h2>';var yk=0;E.qs.forEach(function(q,i){var c=E.cev[i];if(c!==undefined&&q.o[c].ok)return;yk++;h+='<div class="card"><p><b>'+q.q+'</b></p>'+q.o.map(function(o,j){return '<div class="fb '+(o.ok?'ok':(j===c?'bad':''))+'" style="margin:4px 0">'+(o.ok?'✅ ':(j===c?'❌ ':'· '))+esc(o.t)+'</div>'}).join('')+(c===undefined?'<p class="muted small">Boş bırakıldı.</p>':'')+'<p class="small">'+q.e+'</p></div>'});if(!yk)h+='<p>Hiç yanlış yok! 🎉</p>';
return h+'<div class="row"><button class="btn pri" data-a="ex-new">Yeni sınav</button></div>'}
var tm=null;function zamanKur(){clearInterval(tm);var E=V.exam;if(!E||!E.sure||E.bitti)return;tm=setInterval(function(){var kal=Math.max(0,Math.round((E.bit-Date.now())/1000));var z=$("#zaman");if(z)z.textContent="⏱ "+String(Math.floor(kal/60)).padStart(2,"0")+":"+String(kal%60).padStart(2,"0");if(kal<=0){clearInterval(tm);sinavBitir()}},500)}
function sinavBitir(){var E=V.exam;if(!E||E.bitti)return;E.bitti=true;clearInterval(tm);var dog=0;E.qs.forEach(function(q,i){var ok=E.cev[i]!==undefined&&q.o[E.cev[i]].ok;if(ok){dog++;if(S.yanlis[q.id])S.yanlis[q.id]=Math.max(0,S.yanlis[q.id]-1)}else S.yanlis[q.id]=(S.yanlis[q.id]||0)+1});
var p=Math.round(100*dog/E.qs.length);if(!E.zayif||true){S.sinav.push({t:new Date().toLocaleDateString("tr-TR"),puan:p,n:E.qs.length})}S.sinav=S.sinav.slice(-30);xp(dog*5+10);gunSeri();kaydet();render()}

/* ---- sözlük ---- */
views.soz=function(){var q=V.ara.toLocaleLowerCase("tr");var l=SOZLUK.filter(function(x){return!q||x[0].toLocaleLowerCase("tr").indexOf(q)>=0||x[1].toLocaleLowerCase("tr").indexOf(q)>=0});return '<h1>📚 Sözlük</h1><input type="search" id="ara" placeholder="Terim ara… (ör. persistence)" value="'+esc(V.ara)+'"><div class="card"><dl>'+(l.length?l.map(function(x){return '<dt>'+esc(x[0])+'</dt><dd>'+esc(x[1])+'</dd>'}).join(''):'<p class="muted">Sonuç yok.</p>')+'</dl></div>'};

/* ---------- çizim ---------- */
function render(){var m=$("#ana");m.innerHTML=views[V.tab]();
$("#sek").innerHTML=TABS.map(function(t){return '<button data-a="tab" data-v="'+t[0]+'" aria-current="'+(V.tab===t[0])+'">'+t[1]+' '+t[2]+'</button>'}).join('');
$("#xp").textContent="⭐ "+S.xp;$("#seri").textContent="🔥 "+S.seri;zamanKur()}
function git(t){V.tab=t;if(t!=="etk"&&t!=="sen"&&t!=="ders")V.run=null;if(t==="kart"){V.fq=null}if(t!=="sinav")V.exam=null;render();window.scrollTo(0,0)}

/* ---------- olaylar ---------- */
document.addEventListener("click",function(ev){var el=ev.target.closest("[data-a]");if(!el||el.disabled)return;var a=el.dataset.a,v=el.dataset.v,r=V.run;
if({open:1,back:1,"sn-open":1,"sen-back":1,ders:1,mini:1,"mini-son":1,"sn-again":1,"ex-start":1,"ex-weak":1,"ex-new":1}[a])window.scrollTo(0,0);
switch(a){
case"tab":return git(v);
case"ders":V.ders=v;V.run=null;return render();
case"oku":{var key="oku-"+V.ders;S[key]=S[key]||{};S[key][v]=1;xp(5);kaydet();return render()}
case"mini":{var qs=shuffle(BANKA.filter(function(q){return q.k===(v==="hackleme"?"tur":v)})).slice(0,5).map(vm);V.run={tip:"mini",ders:v,qs:qs,i:0,sec:null,dogru:0};return render()}
case"mini-pick":{if(r.sec!==null)return;r.sec=+v;if(r.qs[r.i].o[r.sec].ok){r.dogru++;xp(10)}return render()}
case"mini-next":r.i++;r.sec=null;if(r.i>=r.qs.length){bitir("ders-"+r.ders,30)}return render();
case"mini-son":V.run=null;return render();
case"open":openAct(el.dataset.t,v);return render();
case"back":V.run=null;return render();
case"o-add":{var ar=actById("ord",r.id);if(r.ans.length<ar.items.length)r.ans.push(+v);r.chk=false;return render()}
case"o-del":if(r.chk||true){r.ans.splice(+v,1);r.chk=false}return render();
case"o-reset":r.ans=[];r.chk=false;return render();
case"o-chk":{var ao=actById("ord",r.id);r.chk=true;var dog=r.ans.every(function(i,p){return i===p});if(dog){bitir(r.id,25);xp(10)}else r.hata++;return render()}
case"m-l":r.sl=+v;return render();
case"m-r":{if(r.sl===null)return;var ok=(r.sl===+v);if(ok){r.done[v]=1;xp(3);var am=actById("mat",r.id);if(Object.keys(r.done).length===am.p.length)bitir(r.id,r.hata?20:30)}else{r.hata++}r.sl=null;return render()}
case"s-pick":{var as=actById("sort",r.id);r.sec=+v;var it=as.items[r.order[r.i]];if(r.sec===it[1]){r.dogru++;xp(4)}else r.yanlis.push(r.order[r.i]);return render()}
case"s-next":{var as2=actById("sort",r.id);r.i++;r.sec=null;if(r.i>=as2.items.length&&r.dogru/as2.items.length>=0.7)bitir(r.id,25);return render()}
case"sn-open":V.run={tip:el.dataset.t,id:v,i:0,sec:null,puan:0};return render();
case"sen-back":V.run=null;return render();
case"sn-again":V.run={tip:r.tip,id:r.id,i:0,sec:null,puan:0};return render();
case"sn-pick":{if(r.sec!==null)return;r.sec=+v;var s=r.tip==="sn"?SENARYOLAR.filter(function(x){return x.id===r.id})[0]:VAKALAR.filter(function(x){return x.id===r.id})[0];var st=s.adimlar[r.i];if(r.tip==="sn"){r.puan+=st.o[r.sec][1];xp(st.o[r.sec][1]*3)}else if(r.sec===st.a){r.puan++;xp(4)}return render()}
case"sn-next":{var s2=r.tip==="sn"?SENARYOLAR.filter(function(x){return x.id===r.id})[0]:VAKALAR.filter(function(x){return x.id===r.id})[0];r.i++;r.sec=null;if(r.i>=s2.adimlar.length){var mx=r.tip==="sn"?s2.adimlar.length*2:s2.adimlar.length;if(r.puan/mx>=0.6)bitir(r.id,30)}return render()}
case"k-open":{V.kopen=V.kopen===v?null:v;V.kvm=V.kvm||{};var t=KONULAR.filter(function(x){return x.id===v})[0];if(!V.kvm[v])V.kvm[v]=vm({id:t.id,k:"teknik",q:t.q,o:t.o,a:t.a,e:t.e}).o;return render()}
case"k-pick":{var pp=v.split("|"),tt=KONULAR.filter(function(x){return x.id===pp[0]})[0];V.ksec=V.ksec||{};V.ksec[pp[0]]=+pp[1];var ok2=V.kvm[pp[0]][+pp[1]].ok;if(ok2){xp(5);bitir(pp[0],10)}else{S.yanlis[pp[0]]=(S.yanlis[pp[0]]||0)+1;kaydet()}return render()}
case"f-kon":V.fkon=v;V.fq=null;return render();
case"f-flip":V.ff=!V.ff;return render();
case"f-yes":case"f-no":{var i=V.fq[V.fi],c=S.lt[i]||{b:0,d:0};if(a==="f-yes"){c.b=Math.min(5,c.b+1);c.d=bugun()+ARAL[c.b]}else{c.b=1;c.d=bugun()}S.lt[i]=c;S.tekrar++;xp(2);gunSeri();V.fi++;V.ff=false;kaydet();return render()}
case"f-yenile":V.fq=null;return render();
case"ex-start":case"ex-weak":{var weak=a==="ex-weak";var n=+$("#sn-n").value,kon=$("#sn-k").value;var havuz=BANKA.filter(function(q){return weak?S.yanlis[q.id]>0:(kon==="hepsi"||q.k===kon)});if(weak)n=havuz.length;var qs=shuffle(havuz).slice(0,n).map(vm);if(!qs.length)return;V.exam={qs:qs,i:0,cev:{},flag:{},sure:$("#sn-t").checked,bit:Date.now()+qs.length*60000,bitti:false,zayif:weak};return render()}
case"ex-pick":V.exam.cev[V.exam.i]=+v;return render();
case"ex-next":V.exam.i++;return render();case"ex-prev":V.exam.i--;return render();case"ex-go":V.exam.i=+v;return render();
case"ex-flag":V.exam.flag[V.exam.i]=!V.exam.flag[V.exam.i];return render();
case"ex-finish":{var bos=V.exam.qs.filter(function(x,i){return V.exam.cev[i]===undefined}).length;if(bos&&!confirm(bos+" soru boş. Yine de bitirilsin mi?"))return;return sinavBitir()}
case"ex-new":V.exam=null;return render();
case"tema":{var t2=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",t2);S.tema=t2;return kaydet()}
case"yazi":{S.yazi=(S.yazi+1)%3;document.documentElement.style.setProperty("--fs",["17px","19px","15px"][S.yazi]);return kaydet()}
case"sifirla":if(confirm("Tüm ilerleme silinsin mi?")){try{localStorage.removeItem(KEY)}catch(e){}location.reload()}return;
}});
document.addEventListener("keydown",function(ev){if((ev.key==="Enter"||ev.key===" ")&&ev.target.getAttribute&&ev.target.getAttribute("role")==="button"){ev.preventDefault();ev.target.click()}});
document.addEventListener("input",function(ev){if(ev.target.id==="ara"){V.ara=ev.target.value;var pos=ev.target.selectionStart;render();var i=$("#ara");i.focus();i.setSelectionRange(pos,pos)}});
if(S.tema)document.documentElement.setAttribute("data-theme",S.tema);document.documentElement.style.setProperty("--fs",["17px","19px","15px"][S.yazi||0]);
gunSeri();rozetler();render();
})();
