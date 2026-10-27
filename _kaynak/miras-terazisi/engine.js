/* ===== Terike Terazisi — pay hesaplayıcı (genel hatlarıyla, Hanefî esas, tam sayılı kesirler) ===== */
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;};
const Fr=(n,d=1)=>{if(d<0){n=-n;d=-d;}const g=gcd(n,d);return{n:n/g,d:d/g};};
const fAdd=(a,b)=>Fr(a.n*b.d+b.n*a.d,a.d*b.d), fSub=(a,b)=>Fr(a.n*b.d-b.n*a.d,a.d*b.d);
const fMul=(a,b)=>Fr(a.n*b.n,a.d*b.d), fDiv=(a,b)=>Fr(a.n*b.d,a.d*b.n);
const fCmp=(a,b)=>a.n*b.d-b.n*a.d, fZero=a=>a.n===0, fVal=a=>a.n/a.d;
const fStr=a=>a.n===0?'0':a.d===1?String(a.n):a.n+'/'+a.d;
const fHtml=a=>a.n===0?'0':a.d===1?String(a.n):`<span class="frac"><i>${a.n}</i><u>${a.d}</u></span>`;
const ONE=Fr(1), ZERO=Fr(0);

/* mirasçı türleri: k anahtar, ad, en çok sayı, cins (e/k), açıklama */
const HEIRS=[
 {k:'koca',ad:'Koca',max:1,s:'e',n:'Ölen kadının eşi'},
 {k:'kari',ad:'Karı (hanım)',max:4,s:'k',n:'Ölen erkeğin eşi/eşleri'},
 {k:'ogul',ad:'Oğul',max:9,s:'e',n:'Fürû · asabe'},
 {k:'kiz',ad:'Kız',max:9,s:'k',n:'Fürû'},
 {k:'okiz',ad:'Oğlun kızı',max:9,s:'k',n:'Fürû · torun'},
 {k:'baba',ad:'Baba',max:1,s:'e',n:'Usûl'},
 {k:'anne',ad:'Anne',max:1,s:'k',n:'Usûl'},
 {k:'nine',ad:'Nine (anneanne)',max:2,s:'k',n:'Usûl · icmâ ile ‹1/6›'},
 {k:'akar',ad:'Ana bir kardeş',max:9,s:'x',n:'Kelâle · Nisâ 4/12'},
 {k:'oze',ad:'Öz erkek kardeş',max:9,s:'e',n:'Kelâle · Nisâ 4/176'},
 {k:'ozk',ad:'Öz kız kardeş',max:9,s:'k',n:'Kelâle · Nisâ 4/176'}
];
const HEIR=Object.fromEntries(HEIRS.map(h=>[h.k,h]));

/* cnt: {k:sayı}, ban: {k:'katil'|'din'} → sonuç */
function hesapla(cnt,ban){
  ban=ban||{};
  const st=[], out={};
  const raw=k=>cnt[k]||0;
  HEIRS.forEach(h=>{if(raw(h.k)&&ban[h.k])st.push(`<b>${h.ad}</b> ${ban[h.k]==='katil'?'mûrisi öldürdüğü için („Katil için miras yoktur”)':'din farkı sebebiyle („Müslüman kâfire, kâfir de müslümana mirasçı olamaz”)'} <b>mahrum</b> edilir; mahrum olan kimseyi hacbedemez.`);});
  const c=k=>ban[k]?0:raw(k);
  if(!HEIRS.some(h=>c(h.k))){
    st.push('Geriye mirasçı kalmadı. Mirasçısı bulunmayanın malı, zevi’l-erhâm da yoksa beytülmâle kalır.');
    return {st,rows:[],avl:false,radd:false,rest:ONE,ok:true};
  }
  const child=c('ogul')+c('kiz')+c('okiz')>0, sibs=c('akar')+c('oze')+c('ozk'), spouse=c('koca')||c('kari');
  const add=(k,typ,f,why)=>{out[k]={k,typ,f,why,asabe:false};};
  const hacb=(k,why)=>{out[k]={k,typ:'Mahcûb',f:ZERO,why,mahcub:true};};
  /* 1) eşler */
  if(c('koca'))add('koca',child?'1/4':'1/2',child?Fr(1,4):Fr(1,2),child?'Çocuk var: kocaya dörtte bir (4/12).':'Çocuk yok: kocaya yarım (4/12).');
  if(c('kari'))add('kari',child?'1/8':'1/4',child?Fr(1,8):Fr(1,4),(child?'Çocuk var: hanıma sekizde bir (4/12).':'Çocuk yok: hanıma dörtte bir (4/12).')+(c('kari')>1?' Hanımlar bu payı eşit paylaşır.':''));
  /* 2) fürû */
  if(c('ogul'))add('ogul','Asabe',ZERO,'Oğul asabedir; farz sahiplerinden kalanı alır.');
  if(c('kiz')){
    if(c('ogul'))add('kiz','Asabe',ZERO,'Oğulla birlikte kız asabe olur; erkeğe iki kızın payı kadar (4/11).');
    else add('kiz',c('kiz')===1?'1/2':'2/3',c('kiz')===1?Fr(1,2):Fr(2,3),c('kiz')===1?'Tek kız: yarım (4/11).':'İki ve daha fazla kız: üçte iki (4/11).');
  }
  if(c('okiz')){
    if(c('ogul'))hacb('okiz','Oğul, oğlun kızını hacbeder (yakın olan uzak olanı düşürür).');
    else if(c('kiz')>=2)hacb('okiz','Kızlar ‹2/3›’ü doldurdu; oğlun kızına tamamlayacak pay kalmadı.');
    else if(c('kiz')===1)add('okiz','1/6',Fr(1,6),'Tek kızla birlikte: ‹2/3›’ye tamamlamak için altıda bir (İbn Mes‘ûd hadisi).');
    else add('okiz',c('okiz')===1?'1/2':'2/3',c('okiz')===1?Fr(1,2):Fr(2,3),'Kız yokken oğlun kızı kız yerine geçer.');
  }
  /* 3) usûl */
  const umer=spouse&&c('baba')&&c('anne')&&!child&&sibs<2;
  if(c('baba')){
    if(c('ogul'))add('baba','1/6',Fr(1,6),'Oğul varken babaya altıda bir (4/11).');
    else if(child){add('baba','1/6 + asabe',Fr(1,6),'Yalnız kız çocuk varken babaya altıda bir, artarsa kalan da onundur.');out.baba.asabe=true;}
    else add('baba','Asabe',ZERO,'Çocuk yokken baba asabedir; kalanı alır.');
  }
  if(c('anne')){
    if(child)add('anne','1/6',Fr(1,6),'Çocuk varken anneye altıda bir (4/11).');
    else if(sibs>=2)add('anne','1/6',Fr(1,6),'Ölenin birden çok kardeşi var: anneye altıda bir (4/11). Kardeşler mahcûb olsa da anneyi düşürür.');
    else if(umer){const f=fMul(Fr(1,3),fSub(ONE,c('koca')?Fr(1,2):Fr(1,4)));add('anne','Kalanın 1/3’ü',f,`Eş, baba ve anne birlikte (Ömeriyye — ek bilgi): anneye eşin payından kalanın üçte biri = ${fStr(f)}.`);}
    else add('anne','1/3',Fr(1,3),'Çocuk ve birden çok kardeş yok: anneye üçte bir (4/11).');
  }
  if(c('nine')){
    if(c('anne'))hacb('nine','Anne, nineyi hacbeder.');
    else add('nine','1/6',Fr(1,6),'Nineye altıda bir'+(c('nine')>1?'; nineler bunu eşit paylaşır':'')+' (icmâ).');
  }
  /* 4) kardeşler */
  if(c('akar')){
    if(child||c('baba'))hacb('akar',(child?'Ölenin çocuğu':'Baba')+' var; kelâlenin ön şartı yok: ana bir kardeş mahcûb.');
    else add('akar',c('akar')===1?'1/6':'1/3',c('akar')===1?Fr(1,6):Fr(1,3),c('akar')===1?'Tek ana bir kardeş: altıda bir (4/12).':'Birden çok ana bir kardeş: üçte biri eşit paylaşırlar (4/12).');
  }
  const ozBlock=c('ogul')?'Oğul':c('baba')?'Baba':'';
  if(c('oze')){
    if(ozBlock)hacb('oze',ozBlock+' öz kardeşleri hacbeder (kelâlenin ön şartı yok).');
    else add('oze','Asabe',ZERO,'Öz erkek kardeş asabedir'+(c('ozk')?'; kız kardeşle birlikte erkeğe iki kat (4/176).':'.'));
  }
  if(c('ozk')){
    if(ozBlock)hacb('ozk',ozBlock+' öz kardeşleri hacbeder.');
    else if(c('oze'))add('ozk','Asabe',ZERO,'Erkek kardeşle birlikte asabe; erkeğe iki kadının payı (4/176).');
    else if(c('kiz')||c('okiz'))add('ozk','Asabe',ZERO,'Kız (veya oğlun kızı) ile birlikte kız kardeş kalanı alır (İbn Mes‘ûd hadisi).');
    else add('ozk',c('ozk')===1?'1/2':'2/3',c('ozk')===1?Fr(1,2):Fr(2,3),c('ozk')===1?'Çocuk yok: tek kız kardeşe yarım (4/176).':'İki ve daha fazla kız kardeş: üçte iki (4/176).');
  }
  const mah=Object.values(out).filter(o=>o.mahcub);
  if(mah.length)st.push('Hacb: '+mah.map(o=>`<b>${HEIR[o.k].ad}</b> — ${o.why}`).join(' · '));
  const farz=Object.values(out).filter(o=>!o.mahcub&&!fZero(o.f));
  let S=ZERO;farz.forEach(o=>S=fAdd(S,o.f));
  st.push('Farz payları (ashâbü’l-ferâiz): '+(farz.length?farz.map(o=>`<b>${HEIR[o.k].ad}</b> ${fHtml(o.f)}`).join(' + ')+' = '+fHtml(S):'yok')+'.');
  /* 5) asabe */
  const grp=c('ogul')?['ogul','kiz']:c('baba')&&!c('ogul')?['baba']:c('oze')&&!ozBlock?['oze','ozk']:(c('ozk')&&!ozBlock&&(c('kiz')||c('okiz')))?['ozk']:[];
  let avl=false,radd=false,rest=ZERO;
  if(fCmp(S,ONE)>0){
    avl=true;
    farz.forEach(o=>o.f=fDiv(o.f,S));
    st.push(`Paylar toplamı ${fHtml(S)} — terikeyi aşıyor. <b>Avl</b> (ek bilgi, metinde geçmez): paydalar ${S.n}’e çıkarılarak her pay oranla küçültülür.`+(grp.length?' Asabeye bir şey kalmaz.':''));
  }else{
    const R=fSub(ONE,S);
    if(grp.length){
      const units=grp.reduce((a,k)=>a+(c(k)?(HEIR[k].s==='e'&&grp.length>1?2:1)*c(k):0),0);
      grp.forEach(k=>{if(!c(k))return;const sh=fMul(R,Fr((HEIR[k].s==='e'&&grp.length>1?2:1)*c(k),units));out[k].f=fAdd(out[k].f,sh);out[k].asabe=true;});
      st.push(fZero(R)?'Asabeye kalan yok.':`Kalan ${fHtml(R)} asabeye: ${grp.filter(k=>c(k)).map(k=>'<b>'+HEIR[k].ad+'</b>').join(' ve ')}${grp.length>1&&grp.filter(k=>c(k)).length>1?' (erkeğe iki kat)':''}. „Kalan, en yakın erkek hısımındır.”`);
    }else if(!fZero(R)){
      const nonSp=farz.filter(o=>o.k!=='koca'&&o.k!=='kari');
      if(nonSp.length){
        radd=true;
        const spF=farz.filter(o=>o.k==='koca'||o.k==='kari').reduce((a,o)=>fAdd(a,o.f),ZERO), base=nonSp.reduce((a,o)=>fAdd(a,o.f),ZERO), pool=fSub(ONE,spF);
        nonSp.forEach(o=>o.f=fMul(pool,fDiv(o.f,base)));
        st.push(`Asabe yok; ${fHtml(R)} arttı. <b>Redd</b> (ek bilgi, metinde geçmez): artan, eşler dışındaki farz sahiplerine payları oranında geri verilir.`);
      }else{rest=R;st.push(`Asabe ve başka farz sahibi yok; kalan ${fHtml(R)} zevi’l-erhâma, onlar da yoksa beytülmâle kalır.`);}
    }
  }
  const rows=HEIRS.filter(h=>raw(h.k)).map(h=>{
    if(ban[h.k])return{k:h.k,ad:h.ad,n:raw(h.k),typ:'Mahrum',f:ZERO,why:ban[h.k]==='katil'?'Öldürme engeli':'Din farkı engeli',mahrum:true,each:ZERO};
    const o=out[h.k], each=fDiv(o.f,Fr(c(h.k)));
    return{k:h.k,ad:h.ad,n:c(h.k),typ:o.typ,f:o.f,why:o.why,mahcub:!!o.mahcub,each};
  });
  const tot=rows.reduce((a,r)=>fAdd(a,r.f),rest);
  st.push('Kişi başına düşen paylar tabloda; toplam = '+fHtml(tot)+'.');
  return{st,rows,avl,radd,rest,ok:fCmp(tot,ONE)===0};
}
