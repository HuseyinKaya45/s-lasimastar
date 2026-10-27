/* ===== Zaman Makinesi — fiil motoru: yazım kuralları, düzensiz fiiller, zaman çekimleri, zaman çizgileri ===== */
/* [V1, V2, V3, Türkçe] */
const IRR=[
 ['be','was/were','been','olmak'],['become','became','become','… olmak, haline gelmek'],['begin','began','begun','başlamak'],['break','broke','broken','kırmak'],
 ['bring','brought','brought','getirmek'],['build','built','built','inşa etmek'],['buy','bought','bought','satın almak'],['catch','caught','caught','yakalamak'],
 ['choose','chose','chosen','seçmek'],['come','came','come','gelmek'],['cost','cost','cost','mal olmak'],['cut','cut','cut','kesmek'],
 ['do','did','done','yapmak'],['draw','drew','drawn','çizmek'],['drink','drank','drunk','içmek'],['drive','drove','driven','araba sürmek'],
 ['eat','ate','eaten','yemek'],['fall','fell','fallen','düşmek'],['feel','felt','felt','hissetmek'],['fight','fought','fought','dövüşmek'],
 ['find','found','found','bulmak'],['fly','flew','flown','uçmak'],['forget','forgot','forgotten','unutmak'],['forgive','forgave','forgiven','affetmek'],
 ['get','got','got','almak, elde etmek, olmak'],['give','gave','given','vermek'],['go','went','gone','gitmek'],['grow','grew','grown','büyümek, yetiştirmek'],
 ['have','had','had','sahip olmak'],['hear','heard','heard','duymak'],['hide','hid','hidden','saklamak, saklanmak'],['hit','hit','hit','vurmak'],
 ['hold','held','held','tutmak'],['hurt','hurt','hurt','incitmek, acımak'],['keep','kept','kept','tutmak, saklamak'],['know','knew','known','bilmek'],
 ['leave','left','left','ayrılmak, bırakmak'],['lend','lent','lent','ödünç vermek'],['let','let','let','izin vermek'],['lose','lost','lost','kaybetmek'],
 ['make','made','made','yapmak, yaratmak'],['mean','meant','meant','anlamına gelmek'],['meet','met','met','tanışmak, buluşmak'],['pay','paid','paid','ödemek'],
 ['put','put','put','koymak'],['read','read','read','okumak'],['ride','rode','ridden','(bisiklet, at) sürmek'],['ring','rang','rung','çalmak (zil)'],
 ['rise','rose','risen','yükselmek'],['run','ran','run','koşmak'],['say','said','said','söylemek'],['see','saw','seen','görmek'],
 ['sell','sold','sold','satmak'],['send','sent','sent','göndermek'],['set','set','set','kurmak, ayarlamak'],['shake','shook','shaken','sallamak'],
 ['shine','shone','shone','parlamak'],['shoot','shot','shot','ateş etmek'],['show','showed','shown','göstermek'],['shut','shut','shut','kapatmak'],
 ['sing','sang','sung','şarkı söylemek'],['sink','sank','sunk','batmak'],['sit','sat','sat','oturmak'],['sleep','slept','slept','uyumak'],
 ['speak','spoke','spoken','konuşmak'],['spend','spent','spent','harcamak, geçirmek'],['stand','stood','stood','ayakta durmak'],['steal','stole','stolen','çalmak (hırsızlık)'],
 ['stick','stuck','stuck','yapıştırmak, takılmak'],['swim','swam','swum','yüzmek'],['take','took','taken','almak, götürmek'],['teach','taught','taught','öğretmek'],
 ['tear','tore','torn','yırtmak'],['tell','told','told','anlatmak, söylemek'],['think','thought','thought','düşünmek'],['throw','threw','thrown','fırlatmak'],
 ['understand','understood','understood','anlamak'],['wake','woke','woken','uyanmak'],['wear','wore','worn','giymek'],['win','won','won','kazanmak'],
 ['write','wrote','written','yazmak'],['blow','blew','blown','esmek, üflemek'],['bite','bit','bitten','ısırmak'],['feed','fed','fed','beslemek'],
 ['hang','hung','hung','asmak'],['light','lit','lit','yakmak'],['lie','lay','lain','uzanmak'],['quit','quit','quit','bırakmak'],['spread','spread','spread','yaymak']
];
const IRRM=Object.fromEntries(IRR.map(x=>[x[0],x]));
const VOW='aeiou';
/* tek heceli/vurgusu sonda olan ünsüz-ünlü-ünsüz fiillerde son harf çiftlenir */
const DOUBLE=new Set(['begin','prefer','refer','admit','permit','regret','forget','occur','control','commit','omit','upset','travel']);
const NODOUBLE=new Set(['visit','open','listen','happen','offer','enter','order','answer','remember','wonder','develop','consider','suffer','gather','cover','limit','fix','mix','show','snow','play','stay','enjoy']);
function dbl(v){
  if(NODOUBLE.has(v))return false;if(DOUBLE.has(v))return true;
  const m=v.match(/([^aeiou])([aeiou])([^aeiouwxy])$/);if(!m)return false;
  const vc=(v.match(/[aeiouy]+/g)||[]).length;return vc===1;
}
function ing(v){
  if(v==='be')return 'being';
  if(/ie$/.test(v))return v.slice(0,-2)+'ying';
  if(/[^aeiou]e$/.test(v)&&!/(ee|ye|oe)$/.test(v))return v.slice(0,-1)+'ing';
  if(dbl(v))return v+v.slice(-1)+'ing';
  return v+'ing';
}
function s3(v){
  if(v==='have')return 'has';if(v==='be')return 'is';if(v==='do')return 'does';if(v==='go')return 'goes';
  if(/(s|sh|ch|x|z|o)$/.test(v))return v+'es';
  if(/[^aeiou]y$/.test(v))return v.slice(0,-1)+'ies';
  return v+'s';
}
function ed(v){
  if(/e$/.test(v))return v+'d';
  if(/[^aeiou]y$/.test(v))return v.slice(0,-1)+'ied';
  if(dbl(v))return v+v.slice(-1)+'ed';
  return v+'ed';
}
const V2=v=>IRRM[v]?IRRM[v][1]:ed(v), V3=v=>IRRM[v]?IRRM[v][2]:ed(v);
const SUBJ=['I','you','he','she','it','we','they'];
const SUBJ_TR={I:'ben',you:'sen/siz',he:'o (erkek)',she:'o (kadın)',it:'o (cansız/hayvan)',we:'biz',they:'onlar'};
const third=s=>['he','she','it'].includes(s);
const beP=s=>s==='I'?'am':third(s)?'is':'are', beS=s=>s==='I'||third(s)?'was':'were';
const TENSES=[
 {k:'ps',ad:'Present Simple',tr:'Geniş zaman',u:2},
 {k:'pc',ad:'Present Continuous',tr:'Şimdiki zaman',u:1},
 {k:'pas',ad:'Past Simple',tr:'Geçmiş zaman',u:5},
 {k:'pac',ad:'Past Continuous',tr:'Geçmişte süreklilik',u:6},
 {k:'pp',ad:'Present Perfect',tr:'Yakın geçmiş / sonucu şimdide',u:7},
 {k:'ppc',ad:'Present Perfect Continuous',tr:'Geçmişten şimdiye süren eylem',u:9},
 {k:'pap',ad:'Past Perfect',tr:'Geçmişten önceki geçmiş',u:15},
 {k:'papc',ad:'Past Perfect Continuous',tr:'Geçmişte bir ana kadar süren eylem',u:16},
 {k:'ut',ad:'used to',tr:'Eskiden …-irdi',u:18},
 {k:'gt',ad:'going to',tr:'Niyet / kanıta dayalı tahmin',u:20},
 {k:'wi',ad:'will',tr:'Anlık karar, söz, tahmin',u:21},
 {k:'wb',ad:'Future Continuous',tr:'Gelecekte bir anda devam ediyor olacak',u:24},
 {k:'wh',ad:'Future Perfect',tr:'Gelecekte bir ana kadar bitmiş olacak',u:24}
];
const TENSE=Object.fromEntries(TENSES.map(t=>[t.k,t]));
/* parçalar: [tür, metin] tür: s özne, a yardımcı, v fiil, n not/olumsuz */
function conj(t,s,v,f,short){
  const S=s==='I'?'I':s, out=[];const A=(x)=>out.push(['a',x]),V=(x)=>out.push(['v',x]);
  const neg=f==='-',q=f==='?';
  const aux=(a,neg_short)=>{ // yardımcı fiil + not
    if(neg)return short?neg_short:a+' not';return a;};
  const NS={am:"'m not",is:"isn't",are:"aren't",was:"wasn't",were:"weren't",have:"haven't",has:"hasn't",had:"hadn't",do:"don't",does:"doesn't",did:"didn't",will:"won't"};
  let a,main;
  switch(t){
    case 'ps': if(v==='be'){a=beP(s);main=null;}else if(neg||q){a=third(s)?'does':'do';main=v;}else{a=null;main=third(s)?s3(v):v;}break;
    case 'pc': a=beP(s);main=ing(v);break;
    case 'pas': if(v==='be'){a=beS(s);main=null;}else if(neg||q){a='did';main=v;}else{a=null;main=V2(v);if(main==='was/were')main=beS(s);}break;
    case 'pac': a=beS(s);main=ing(v);break;
    case 'pp': a=third(s)?'has':'have';main=V3(v);break;
    case 'ppc': a=third(s)?'has':'have';main='been '+ing(v);break;
    case 'pap': a='had';main=V3(v);break;
    case 'papc': a='had';main='been '+ing(v);break;
    case 'ut': if(neg||q){a='did';main='use to '+v;}else{a=null;main='used to '+v;}break;
    case 'gt': a=beP(s);main='going to '+v;break;
    case 'wi': a='will';main=v;break;
    case 'wb': a='will';main='be '+ing(v);break;
    case 'wh': a='will';main='have '+V3(v);break;
  }
  if(q){
    if(a)A(cap(a));out.push(['s',a?S:cap(S)]);if(main)V(main);
  }else{
    out.push(['s',cap(S)]);
    if(a){
      if(neg){
        if(short){const ns=NS[a];if(a==='am')out[out.length-1][1]+="'m",A('not');else A(ns);}else{A(a);A('not');}
      }else if(short&&['am','is','are','have','has','had','will'].includes(a)&&!(t==='ps'||t==='pas')){
        const c={am:"'m",is:"'s",are:"'re",have:"'ve",has:"'s",had:"'d",will:"'ll"}[a];out[out.length-1][1]+=c;
      }else A(a);
    }
    if(main)V(main);
  }
  return out;
}
const cap=w=>w==='I'?'I':w[0].toUpperCase()+w.slice(1);
const conjText=p=>p.map(x=>x[1]).join(' ').replace(/ '/g,"'");

/* zaman çizgileri: geçmiş — şimdi — gelecek */
function tlSVG(k){
  const W=560,H=120,y=66,nx=330;
  const base=`<line x1="20" y1="${y}" x2="${W-20}" y2="${y}" stroke="var(--line)" stroke-width="3"/><polygon points="${W-20},${y-6} ${W-8},${y} ${W-20},${y+6}" fill="var(--line)"/>
   <line x1="${nx}" y1="${y-26}" x2="${nx}" y2="${y+26}" stroke="var(--gold)" stroke-width="3"/><text x="${nx}" y="${y+46}" text-anchor="middle" font-size="14" fill="var(--gold)" font-weight="700">NOW</text>
   <text x="40" y="${y+46}" font-size="13" fill="var(--muted)">past</text><text x="${W-40}" y="${y+46}" text-anchor="end" font-size="13" fill="var(--muted)">future</text>`;
  const bar=(x1,x2,c,lab,dash)=>`<rect x="${x1}" y="${y-12}" width="${x2-x1}" height="24" rx="12" fill="${c}" opacity=".85" ${dash?'stroke-dasharray="6 4" stroke="var(--ink)"':''}/>${lab?`<text x="${(x1+x2)/2}" y="${y-20}" text-anchor="middle" font-size="13" fill="var(--ink)">${lab}</text>`:''}`;
  const dot=(x,c,lab)=>`<circle cx="${x}" cy="${y}" r="10" fill="${c}"/>${lab?`<text x="${x}" y="${y-20}" text-anchor="middle" font-size="13" fill="var(--ink)">${lab}</text>`:''}`;
  const D={
   pc:bar(270,395,'var(--p2)','I am doing'),
   ps:[60,140,220,300,380,460].map(x=>dot(x,'var(--p3)')).join('')+`<text x="260" y="${y-22}" text-anchor="middle" font-size="13" fill="var(--ink)">I do (her zaman / tekrar tekrar)</text>`,
   pas:dot(170,'var(--p1)','I did (bitti)'),
   pac:bar(110,230,'var(--p4)','I was doing')+dot(170,'var(--p1)','')+`<text x="170" y="${y+30}" text-anchor="middle" font-size="12" fill="var(--muted)">o anda</text>`,
   pp:dot(250,'var(--p6)','I have done')+`<path d="M262 ${y} Q ${nx-30} ${y-34} ${nx-4} ${y-6}" stroke="var(--p6)" fill="none" stroke-width="2" marker-end="url(#ar)"/>`,
   ppc:bar(150,nx,'var(--p7)','I have been doing →'),
   pap:dot(110,'var(--p8)','had done')+dot(220,'var(--p1)','did'),
   papc:bar(70,200,'var(--p9)','had been doing')+dot(205,'var(--p1)','then'),
   ut:bar(40,240,'var(--p5)','I used to do',1)+`<text x="285" y="${y+28}" text-anchor="middle" font-size="12" fill="var(--muted)">artık değil</text>`,
   gt:dot(nx,'var(--p10)','')+`<path d="M${nx} ${y} Q 400 ${y-40} 460 ${y}" stroke="var(--p10)" fill="none" stroke-width="2.5"/>`+dot(460,'var(--p10)','going to do (karar önceden)'),
   wb:bar(420,510,'var(--p7)','will be doing')+dot(465,'var(--p1)','')+`<text x="465" y="${y+30}" text-anchor="middle" font-size="12" fill="var(--muted)">o anda</text>`,
   wh:bar(nx+8,440,'var(--p4)','will have done',1)+dot(470,'var(--p1)','o ana kadar'),
   wi:dot(nx,'var(--p3)','')+`<path d="M${nx} ${y} Q 410 ${y-40} 470 ${y}" stroke="var(--p3)" fill="none" stroke-width="2.5" stroke-dasharray="5 4"/>`+dot(470,'var(--p3)','will do (şimdi karar)')
  };
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="zaman çizgisi"><defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--p6)"/></marker></defs>${base}${D[k]||''}</svg>`;
}
