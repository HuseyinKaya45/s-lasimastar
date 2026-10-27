/* ===== Renkli Cümleler — sıfat motoru: comparative, superlative, zarf; -ing/-ed sıfatlar ===== */
const ADJ_IRR={good:['better','best','well'],bad:['worse','worst','badly'],far:['further','furthest','far'],little:['less','least','little'],much:['more','most','much'],many:['more','most','—'],well:['better','best','well']};
const ADV_SAME=new Set(['fast','hard','late','early','daily','straight','high','low','near','long']);
const LY_ADJ=new Set(['friendly','lovely','lonely','silly','ugly','likely','lively','elderly','costly']);
const NOADV=new Set(['hot','big','small','tall','young','old','fat','red','blue','green','yellow','black','white','brown','pink','orange','purple','grey','tiny','huge']);
const SHORT2=new Set(['quiet','clever','narrow','simple','gentle','polite','common','shallow']);
const syl=w=>(w.toLowerCase().replace(/e$/,'').match(/[aeiouy]+/g)||[]).length||1;
function dblA(a){return /^[^aeiou]*[aeiou][^aeiouwxy]$/.test(a)&&syl(a)===1;}
/* biçim, kural açıklaması */
function adjForms(a){
  a=a.trim().toLowerCase();if(!/^[a-z]+$/.test(a))return null;
  if(ADJ_IRR[a]){const x=ADJ_IRR[a];return{cmp:x[0],sup:'the '+x[1],adv:x[2],rule:'Düzensiz sıfat.',adr:a==='good'?'good → well (düzensiz).':a==='bad'?'bad → badly.':''};}
  let cmp,sup,rule,n=syl(a);
  if(n===1||(n===2&&/y$/.test(a))||SHORT2.has(a)){
    if(/[^aeiou]y$/.test(a)){cmp=a.slice(0,-1)+'ier';sup=a.slice(0,-1)+'iest';rule='Ünsüz + y → -ier / -iest.';}
    else if(/e$/.test(a)){cmp=a+'r';sup=a+'st';rule='Sondaki e’ye -r / -st eklenir.';}
    else if(dblA(a)){cmp=a+a.slice(-1)+'er';sup=a+a.slice(-1)+'est';rule='Ünsüz–ünlü–ünsüz: son harf çiftlenir.';}
    else{cmp=a+'er';sup=a+'est';rule='Kısa sıfat: -er / -est.';}
    if(SHORT2.has(a))rule+=' (more/most ile de olur.)';
  }else{cmp='more '+a;sup='most '+a;rule='Uzun sıfat (2+ hece): more / most.';}
  let adv,adr;
  if(NOADV.has(a)){adv='—';adr='Bu sıfatın yaygın kullanılan bir zarf biçimi yok.';}
  else if(ADV_SAME.has(a)){adv=a;adr='Sıfat ve zarf aynı biçimde.';}
  else if(LY_ADJ.has(a)){adv='in a '+a+' way';adr='Zaten -ly ile biten sıfat: zarfı yok → “in a … way”.';}
  else if(/[^aeiou]y$/.test(a)){adv=a.slice(0,-1)+'ily';adr='-y → -ily.';}
  else if(/le$/.test(a)&&a.length>3){adv=a.slice(0,-1)+'y';adr='-le → -ly.';}
  else if(/ic$/.test(a)){adv=a+'ally';adr='-ic → -ically.';}
  else if(/ll$/.test(a)){adv=a+'y';adr='-ll → -lly.';}
  else{adv=a+'ly';adr='Sıfat + -ly.';}
  return{cmp,sup:'the '+sup,adv,rule,adr};
}
/* -ing / -ed sıfat üreten fiiller */
const EDV={bore:'sıkmak',interest:'ilgisini çekmek',excite:'heyecanlandırmak',tire:'yormak',surprise:'şaşırtmak',confuse:'kafasını karıştırmak',disappoint:'hayal kırıklığına uğratmak',embarrass:'utandırmak',frighten:'korkutmak',annoy:'sinirlendirmek',amaze:'hayrete düşürmek',worry:'endişelendirmek',exhaust:'tüketmek, yormak',shock:'şoke etmek',satisfy:'tatmin etmek',relax:'rahatlatmak',depress:'bunaltmak',fascinate:'büyülemek',terrify:'dehşete düşürmek',please:'memnun etmek'};
function edForms(v){
  v=v.trim().toLowerCase();if(!/^[a-z]+$/.test(v))return null;
  const ingF=/[^aeiou]e$/.test(v)?v.slice(0,-1)+'ing':v+'ing';
  const edF=/e$/.test(v)?v+'d':/[^aeiou]y$/.test(v)?v.slice(0,-1)+'ied':v+'ed';
  return{ing:ingF,ed:edF};
}
