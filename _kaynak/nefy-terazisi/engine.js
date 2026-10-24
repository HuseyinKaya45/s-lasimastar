/* ===================== NEFY TERAZİSİ MOTORU (sâlim fiil, Emsile seviyesi) =====================
   Muzâri 14 sîgada çekilir; edat sonu ya olduğu gibi bırakır (mâ, lâ), ya üstün yapar (len),
   ya cezm eder (lem, lemmâ). Kök harfleri: r[0] fâ, r[1] ayn, r[2] lâm. mu: muzâride aynın harekesi. */
const VW={a:"َ",u:"ُ",i:"ِ",o:"ْ"};
const MARKS=/[ً-ْٰ]/;
const SIGA=[
 {z:"هُوَ",tr:"Müfred müzekker gâib",k:"o (erkek)",p:"3s"},
 {z:"هُمَا",tr:"Tesniye müzekker gâib",k:"o ikisi (erkek)",p:"3s"},
 {z:"هُمْ",tr:"Cem‘ müzekker gâib",k:"onlar (erkekler)",p:"3p"},
 {z:"هِيَ",tr:"Müfred müennes gâibe",k:"o (kadın)",p:"3s"},
 {z:"هُمَا",tr:"Tesniye müennes gâibe",k:"o ikisi (kadın)",p:"3s"},
 {z:"هُنَّ",tr:"Cem‘ müennes gâibe",k:"onlar (kadınlar)",p:"3p"},
 {z:"أَنْتَ",tr:"Müfred müzekker muhâtab",k:"sen (erkek)",p:"2s"},
 {z:"أَنْتُمَا",tr:"Tesniye müzekker muhâtab",k:"siz ikiniz (erkek)",p:"2p"},
 {z:"أَنْتُمْ",tr:"Cem‘ müzekker muhâtab",k:"siz (erkekler)",p:"2p"},
 {z:"أَنْتِ",tr:"Müfred müennes muhâtaba",k:"sen (kadın)",p:"2s"},
 {z:"أَنْتُمَا",tr:"Tesniye müennes muhâtaba",k:"siz ikiniz (kadın)",p:"2p"},
 {z:"أَنْتُنَّ",tr:"Cem‘ müennes muhâtaba",k:"siz (kadınlar)",p:"2p"},
 {z:"أَنَا",tr:"Mütekellim vahde",k:"ben",p:"1s"},
 {z:"نَحْنُ",tr:"Mütekellim ma‘a’l-gayr",k:"biz",p:"1p"}
];
const PRE=["يَ","يَ","يَ","تَ","تَ","يَ","تَ","تَ","تَ","تَ","تَ","تَ","أَ","نَ"];
const SUF={
 raf: ["ُ","َانِ","ُونَ","ُ","َانِ","ْنَ","ُ","َانِ","ُونَ","ِينَ","َانِ","ْنَ","ُ","ُ"],
 nasb:["َ","َا","ُوا","َ","َا","ْنَ","َ","َا","ُوا","ِي","َا","ْنَ","َ","َ"],
 jazm:["ْ","َا","ُوا","ْ","َا","ْنَ","ْ","َا","ُوا","ِي","َا","ْنَ","ْ","ْ"]
};
const NUNLU=[1,2,4,7,8,9,10], NISVE=[5,11];   // sonu nûnlu yedi sîga · cem‘-i müennes iki sîga
/* ---- edatlar (Emsile-i muhtelife adlarıyla) ---- */
const EDAT=[
 {id:"ma",ar:"مَا",ad:"Mâ",isim:"Nefy-i hâl",arIsim:"نَفْيُ الْحَالِ",hal:"raf",zaman:"Şimdiki zaman",g:"…mıyor",col:"var(--c-r)",
  d:"Muzârinin sonunu değiştirmez; şimdiki zamanın olumsuzunu yapar."},
 {id:"la",ar:"لَا",ad:"Lâ",isim:"Nefy-i istikbâl",arIsim:"نَفْيُ الِاسْتِقْبَالِ",hal:"raf",zaman:"Gelecek zaman",g:"…meyecek",col:"var(--c-r)",
  d:"Muzârinin sonunu değiştirmez; geleceğin olumsuzunu yapar."},
 {id:"len",ar:"لَنْ",ad:"Len",isim:"Te’kîd-i nefy-i istikbâl",arIsim:"تَأْكِيدُ نَفْيِ الِاسْتِقْبَالِ",hal:"nasb",zaman:"Gelecek zaman (kuvvetli)",g:"asla …meyecek",col:"var(--c-n)",
  d:"Muzâriyi nasb eder: sonu üstün olur, nûnlar düşer. Geleceği kuvvetle olumsuzlar."},
 {id:"lem",ar:"لَمْ",ad:"Lem",isim:"Cahd-ı mutlak",arIsim:"الْجَحْدُ الْمُطْلَقُ",hal:"jazm",zaman:"Geçmiş zaman",g:"…medi",col:"var(--c-j)",
  d:"Muzâriyi cezm eder: sonu sâkin olur, nûnlar düşer. Mânâyı geçmişe çevirir."},
 {id:"lemma",ar:"لَمَّا",ad:"Lemmâ",isim:"Cahd-ı müstağrak",arIsim:"الْجَحْدُ الْمُسْتَغْرَقُ",hal:"jazm",zaman:"Geçmişten şu âna",g:"henüz …medi",col:"var(--c-j)",
  d:"Lem gibi cezm eder; olumsuzluk şu âna kadar sürer: henüz."}
];
const edatOf=id=>EDAT.find(e=>e.id===id);
const HAL={raf:{tr:"Merfû",col:"var(--c-r)"},nasb:{tr:"Mansûb",col:"var(--c-n)"},jazm:{tr:"Meczûm",col:"var(--c-j)"}};
/* ---- sâlim fiiller: r kök, mu muzâride aynın harekesi, mz mâzi, tr anlam ---- */
const FIIL=[
 {r:"نصر",mu:"u",mz:"نَصَرَ",tr:"yardım etmek"},
 {r:"كتب",mu:"u",mz:"كَتَبَ",tr:"yazmak"},
 {r:"دخل",mu:"u",mz:"دَخَلَ",tr:"girmek"},
 {r:"خرج",mu:"u",mz:"خَرَجَ",tr:"çıkmak"},
 {r:"شكر",mu:"u",mz:"شَكَرَ",tr:"şükretmek"},
 {r:"ضرب",mu:"i",mz:"ضَرَبَ",tr:"vurmak"},
 {r:"جلس",mu:"i",mz:"جَلَسَ",tr:"oturmak"},
 {r:"غفر",mu:"i",mz:"غَفَرَ",tr:"bağışlamak"},
 {r:"حمل",mu:"i",mz:"حَمَلَ",tr:"taşımak"},
 {r:"فتح",mu:"a",mz:"فَتَحَ",tr:"açmak"},
 {r:"ذهب",mu:"a",mz:"ذَهَبَ",tr:"gitmek"},
 {r:"جمع",mu:"a",mz:"جَمَعَ",tr:"toplamak"},
 {r:"علم",mu:"a",mz:"عَلِمَ",tr:"bilmek"},
 {r:"شرب",mu:"a",mz:"شَرِبَ",tr:"içmek"},
 {r:"فهم",mu:"a",mz:"فَهِمَ",tr:"anlamak"},
 {r:"سمع",mu:"a",mz:"سَمِعَ",tr:"işitmek"}
];
FIIL.forEach((f,i)=>{f.id=i;f.r=Array.from(f.r);});
const cek=(v,i,hal)=>PRE[i]+v.r[0]+VW.o+v.r[1]+VW[v.mu]+v.r[2]+SUF[hal][i];
const muz=(v,i)=>cek(v,i,"raf");
const edatli=(v,i,e)=>e.ar+" "+cek(v,i,e.hal);
/* ---- yapı: edat sona ne yaptı? ---- */
function yapi(i,hal){
  if(NISVE.includes(i))return {k:"ayni",t:"Değişmez: cem‘-i müennesin nûnu hiç düşmez."};
  if(NUNLU.includes(i))return hal==="raf"?{k:"ayni",t:"Değişmez: sondaki nûn durur."}:{k:"nun",t:"Sondaki nûn düşer."};
  return hal==="raf"?{k:"ayni",t:"Değişmez: sonu ötre kalır."}:hal==="nasb"?{k:"ustun",t:"Sonu üstün olur."}:{k:"cezm",t:"Sonu cezm (sâkin) olur."};
}
const YAPI_AD={ayni:"değişmez",nun:"nûn düşer",ustun:"üstün",cezm:"cezm"};
/* ---- Türkçe anlam (olumsuz çekim) ---- */
const SESLI="aeıioöuü";
const sonSesli=s=>{for(let k=s.length-1;k>=0;k--)if(SESLI.includes(s[k]))return s[k];return "a";};
const kalin=c=>"aıou".includes(c);
const dort=c=>({a:"ı",ı:"ı",o:"u",u:"u",e:"i",i:"i",ö:"ü",ü:"ü"})[c];
function trAnlam(v,i,eid){
  const ilk=v.tr.split(",")[0].trim(), on=ilk.slice(0,ilk.lastIndexOf(" ")+1), fl=ilk.slice(on.length);
  const kok=fl.replace(/m[ae]k$/,""), k=kalin(sonSesli(kok)), ne=kok+(k?"ma":"me"), p=SIGA[i].p;
  let w;
  if(eid==="ma"){const y=kok+"m"+dort(sonSesli(kok))+"yor";w=y+{"1s":"um","2s":"sun","3s":"","1p":"uz","2p":"sunuz","3p":"lar"}[p];}
  else if(eid==="la"||eid==="len"){const c=ne+(k?"yacak":"yecek"),cg=c.slice(0,-1)+"ğ",x=k?"ı":"i";
    w={"1s":cg+x+"m","2s":c+"s"+x+"n","3s":c,"1p":cg+x+"z","2p":c+"s"+x+"n"+x+"z","3p":c+(k?"lar":"ler")}[p];}
  else{const d=ne+"d"+(k?"ı":"i"),x=k?"ı":"i";w={"1s":d+"m","2s":d+"n","3s":d,"1p":d+"k","2p":d+"n"+x+"z","3p":d+(k?"lar":"ler")}[p];}
  return (eid==="len"?"asla ":eid==="lemma"?"henüz ":"")+on+w;
}
/* ---- kendi kökün ---- */
function rootOf(s){const r=Array.from(String(s).replace(/[\sً-ْ]/g,""));return r.length===3?r:null;}
function checkRoot(r){if(!r)return "Üç harf gir (ör. ن ص ر).";if(r.some(ch=>!/[ب-ي]/.test(ch)||/[اويىةءأإآؤئ]/.test(ch)))return "Sâlim bir kök gir: harf-i illet (و ي ا) ve hemze olmasın.";if(r[1]===r[2])return "Ayn ve lâm aynı olmasın (muzâaf); sâlim bir kök gir.";return "";}
/* ---- harf kümeleri ve fark boyama ---- */
function clusters(t){const out=[];for(const ch of t){if(MARKS.test(ch)&&out.length)out[out.length-1]+=ch;else out.push(ch);}return out;}
/* b kelimesini a’ya göre boyar: değişen son .chg (yalnız harf düştüyse kalan son harf) */
function farkBoya(a,b){
  const x=clusters(a),y=clusters(b);let s=0;while(s<x.length&&s<y.length&&x[s]===y[s])s++;
  let e=0;while(e<x.length-s&&e<y.length-s&&x[x.length-1-e]===y[y.length-1-e])e++;
  if(s+e===y.length&&x.length>y.length&&s>0){s--;e=0;}
  const mid=y.slice(s,y.length-e).join("");
  return esc(y.slice(0,s).join(""))+(mid?`<span class="chg">${esc(mid)}</span>`:"")+esc(y.slice(y.length-e).join(""));
}
