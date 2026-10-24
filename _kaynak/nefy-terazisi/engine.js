/* ===================== NEFY TERAZİSİ MOTORU =====================
   Muzâri 14 sîgada üç hâlde (merfû, mansûb, meczûm) çekilir; edat hangi hâli istiyorsa o seçilir.
   Kök harfleri: r[0] fâ, r[1] ayn, r[2] lâm. mu: muzâride aynın harekesi (u/i/a). */
const VW={a:"َ",u:"ُ",i:"ِ",o:"ْ",sh:"ّ"};
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
/* Nâkıs ve lefîfte lâmü’l-fiil sonla birlikte yazılır (aynın harekesi dâhil) */
const NK={
 u:{raf:["ُو","ُوَانِ","ُونَ","ُو","ُوَانِ","ُونَ","ُو","ُوَانِ","ُونَ","ِينَ","ُوَانِ","ُونَ","ُو","ُو"],
    nasb:["ُوَ","ُوَا","ُوا","ُوَ","ُوَا","ُونَ","ُوَ","ُوَا","ُوا","ِي","ُوَا","ُونَ","ُوَ","ُوَ"],
    jazm:["ُ","ُوَا","ُوا","ُ","ُوَا","ُونَ","ُ","ُوَا","ُوا","ِي","ُوَا","ُونَ","ُ","ُ"]},
 i:{raf:["ِي","ِيَانِ","ُونَ","ِي","ِيَانِ","ِينَ","ِي","ِيَانِ","ُونَ","ِينَ","ِيَانِ","ِينَ","ِي","ِي"],
    nasb:["ِيَ","ِيَا","ُوا","ِيَ","ِيَا","ِينَ","ِيَ","ِيَا","ُوا","ِي","ِيَا","ِينَ","ِيَ","ِيَ"],
    jazm:["ِ","ِيَا","ُوا","ِ","ِيَا","ِينَ","ِ","ِيَا","ُوا","ِي","ِيَا","ِينَ","ِ","ِ"]},
 a:{raf:["َى","َيَانِ","َوْنَ","َى","َيَانِ","َيْنَ","َى","َيَانِ","َوْنَ","َيْنَ","َيَانِ","َيْنَ","َى","َى"],
    nasb:["َى","َيَا","َوْا","َى","َيَا","َيْنَ","َى","َيَا","َوْا","َيْ","َيَا","َيْنَ","َى","َى"],
    jazm:["َ","َيَا","َوْا","َ","َيَا","َيْنَ","َ","َيَا","َوْا","َيْ","َيَا","َيْنَ","َ","َ"]}
};
const HAMSE=[1,2,4,7,8,9,10], NISVE=[5,11];   // ef‘âl-i hamse · nûn-ı nisve
/* ---- edatlar (Emsile-i muhtelife adlarıyla) ---- */
const EDAT=[
 {id:"ma",ar:"مَا",ad:"Mâ",isim:"Nefy-i hâl",arIsim:"نَفْيُ الْحَالِ",hal:"raf",kefe:"Merfû",zaman:"Şimdiki zaman (hâl)",g:"…mıyor",col:"var(--c-r)",
  d:"Muzâriyi değiştirmez (âmil değildir); mânâyı şimdiki zamanın olumsuzuna tahsis eder."},
 {id:"la",ar:"لَا",ad:"Lâ",isim:"Nefy-i istikbâl",arIsim:"نَفْيُ الِاسْتِقْبَالِ",hal:"raf",kefe:"Merfû",zaman:"Gelecek zaman",g:"…meyecek",col:"var(--c-r)",
  d:"Lâ-yı nâfiye muzâriyi değiştirmez; geleceğin (ve geniş zamanın) olumsuzudur. Lâ-yı nâhiye ile karıştırma: o cezm eder."},
 {id:"len",ar:"لَنْ",ad:"Len",isim:"Te’kîd-i nefy-i istikbâl",arIsim:"تَأْكِيدُ نَفْيِ الِاسْتِقْبَالِ",hal:"nasb",kefe:"Mansûb",zaman:"Gelecek zaman (te’kîdli)",g:"asla …meyecek",col:"var(--c-n)",
  d:"Muzâriyi nasb eder; geleceği kuvvetle (te’kîdle) olumsuzlar."},
 {id:"lem",ar:"لَمْ",ad:"Lem",isim:"Cahd-ı mutlak",arIsim:"الْجَحْدُ الْمُطْلَقُ",hal:"jazm",kefe:"Meczûm",zaman:"Geçmiş zaman",g:"…medi",col:"var(--c-j)",
  d:"Muzâriyi cezm eder ve mânâsını geçmişe çevirir (kalb): olumsuz geçmiş."},
 {id:"lemma",ar:"لَمَّا",ad:"Lemmâ",isim:"Cahd-ı müstağrak",arIsim:"الْجَحْدُ الْمُسْتَغْرَقُ",hal:"jazm",kefe:"Meczûm",zaman:"Geçmişten şu âna kadar",g:"henüz …medi",col:"var(--c-j)",
  d:"Muzâriyi cezm eder; olumsuzluk konuşma anına kadar sürer ve gerçekleşmesi beklenir: henüz."}
];
const edatOf=id=>EDAT.find(e=>e.id===id);
const HAL={raf:{tr:"Merfû",ar:"مَرْفُوعٌ",col:"var(--c-r)"},nasb:{tr:"Mansûb",ar:"مَنْصُوبٌ",col:"var(--c-n)"},jazm:{tr:"Meczûm",ar:"مَجْزُومٌ",col:"var(--c-j)"}};
/* ---- fiil nevileri ---- */
const TUR={
 sahih:{tr:"Sahîh (sâlim)",ar:"الصَّحِيحُ",d:"Harf-i illet, hemze ve iki misil yok; sonlar olduğu gibi görünür."},
 mudaaf:{tr:"Muzâaf",ar:"الْمُضَاعَفُ",d:"Ayn ile lâm aynı harf: يَمُدُّ. Cezmde idğam (لَمْ يَمُدَّ) veya fekk (لَمْ يَمْدُدْ)."},
 misal:{tr:"Misâl",ar:"الْمِثَالُ",d:"Fâü’l-fiil vav: muzâride vav düşer (يَعِدُ); sonu sahîh gibidir."},
 ecvef:{tr:"Ecvef",ar:"الْأَجْوَفُ",d:"Aynü’l-fiil illetli: يَقُولُ. Sonu sâkin olunca iki sâkin birleşir, orta harf düşer: لَمْ يَقُلْ."},
 nakis:{tr:"Nâkıs",ar:"النَّاقِصُ",d:"Lâmü’l-fiil illetli: يَدْعُو، يَرْمِي، يَخْشَى. Cezmde illet harfi düşer; nasbda vav/yâ fetha alır, elif almaz."},
 lafif:{tr:"Lefîf-i mefrûk",ar:"اللَّفِيفُ الْمَفْرُوقُ",d:"Fâ ve lâm illetli: يَقِي. Baştan misâl, sondan nâkıs gibi çekilir: لَمْ يَقِ."}
};
/* ---- hazır fiiller: r kök, t nevi, mu muzâride aynın harekesi, mz mâzi, tr anlam ---- */
const FIIL=[
 {r:"نصر",t:"sahih",mu:"u",mz:"نَصَرَ",tr:"yardım etmek"},
 {r:"كتب",t:"sahih",mu:"u",mz:"كَتَبَ",tr:"yazmak"},
 {r:"دخل",t:"sahih",mu:"u",mz:"دَخَلَ",tr:"girmek"},
 {r:"خرج",t:"sahih",mu:"u",mz:"خَرَجَ",tr:"çıkmak"},
 {r:"ضرب",t:"sahih",mu:"i",mz:"ضَرَبَ",tr:"vurmak"},
 {r:"جلس",t:"sahih",mu:"i",mz:"جَلَسَ",tr:"oturmak"},
 {r:"غفر",t:"sahih",mu:"i",mz:"غَفَرَ",tr:"bağışlamak"},
 {r:"فتح",t:"sahih",mu:"a",mz:"فَتَحَ",tr:"açmak"},
 {r:"ذهب",t:"sahih",mu:"a",mz:"ذَهَبَ",tr:"gitmek"},
 {r:"نفع",t:"sahih",mu:"a",mz:"نَفَعَ",tr:"fayda vermek"},
 {r:"علم",t:"sahih",mu:"a",mz:"عَلِمَ",tr:"bilmek"},
 {r:"شرب",t:"sahih",mu:"a",mz:"شَرِبَ",tr:"içmek"},
 {r:"فهم",t:"sahih",mu:"a",mz:"فَهِمَ",tr:"anlamak"},
 {r:"سمع",t:"sahih",mu:"a",mz:"سَمِعَ",tr:"işitmek"},
 {r:"حسب",t:"sahih",mu:"i",mz:"حَسِبَ",tr:"sanmak"},
 {r:"كرم",t:"sahih",mu:"u",mz:"كَرُمَ",tr:"cömert olmak"},
 {r:"مدد",t:"mudaaf",mu:"u",mz:"مَدَّ",tr:"uzatmak"},
 {r:"ردد",t:"mudaaf",mu:"u",mz:"رَدَّ",tr:"geri çevirmek"},
 {r:"دلل",t:"mudaaf",mu:"u",mz:"دَلَّ",tr:"yol göstermek"},
 {r:"شدد",t:"mudaaf",mu:"u",mz:"شَدَّ",tr:"sıkıca bağlamak"},
 {r:"فرر",t:"mudaaf",mu:"i",mz:"فَرَّ",tr:"kaçmak"},
 {r:"مسس",t:"mudaaf",mu:"a",mz:"مَسَّ",tr:"dokunmak"},
 {r:"عضض",t:"mudaaf",mu:"a",mz:"عَضَّ",tr:"ısırmak"},
 {r:"وعد",t:"misal",mu:"i",mz:"وَعَدَ",tr:"söz vermek"},
 {r:"وصل",t:"misal",mu:"i",mz:"وَصَلَ",tr:"ulaşmak"},
 {r:"وجد",t:"misal",mu:"i",mz:"وَجَدَ",tr:"bulmak"},
 {r:"ولد",t:"misal",mu:"i",mz:"وَلَدَ",tr:"doğurmak"},
 {r:"وقف",t:"misal",mu:"i",mz:"وَقَفَ",tr:"durmak"},
 {r:"وضع",t:"misal",mu:"a",mz:"وَضَعَ",tr:"koymak"},
 {r:"وهب",t:"misal",mu:"a",mz:"وَهَبَ",tr:"bağışlamak"},
 {r:"قول",t:"ecvef",mu:"u",mz:"قَالَ",tr:"söylemek"},
 {r:"قوم",t:"ecvef",mu:"u",mz:"قَامَ",tr:"kalkmak"},
 {r:"زور",t:"ecvef",mu:"u",mz:"زَارَ",tr:"ziyaret etmek"},
 {r:"صوم",t:"ecvef",mu:"u",mz:"صَامَ",tr:"oruç tutmak"},
 {r:"بيع",t:"ecvef",mu:"i",mz:"بَاعَ",tr:"satmak"},
 {r:"سير",t:"ecvef",mu:"i",mz:"سَارَ",tr:"yürümek"},
 {r:"طير",t:"ecvef",mu:"i",mz:"طَارَ",tr:"uçmak"},
 {r:"خوف",t:"ecvef",mu:"a",mz:"خَافَ",tr:"korkmak"},
 {r:"نوم",t:"ecvef",mu:"a",mz:"نَامَ",tr:"uyumak"},
 {r:"نيل",t:"ecvef",mu:"a",mz:"نَالَ",tr:"erişmek"},
 {r:"دعو",t:"nakis",mu:"u",mz:"دَعَا",tr:"çağırmak"},
 {r:"رجو",t:"nakis",mu:"u",mz:"رَجَا",tr:"ummak"},
 {r:"نجو",t:"nakis",mu:"u",mz:"نَجَا",tr:"kurtulmak"},
 {r:"عفو",t:"nakis",mu:"u",mz:"عَفَا",tr:"affetmek"},
 {r:"تلو",t:"nakis",mu:"u",mz:"تَلَا",tr:"okumak"},
 {r:"رمي",t:"nakis",mu:"i",mz:"رَمَى",tr:"atmak"},
 {r:"هدي",t:"nakis",mu:"i",mz:"هَدَى",tr:"doğru yolu göstermek"},
 {r:"مشي",t:"nakis",mu:"i",mz:"مَشَى",tr:"yürümek"},
 {r:"بني",t:"nakis",mu:"i",mz:"بَنَى",tr:"inşa etmek"},
 {r:"قضي",t:"nakis",mu:"i",mz:"قَضَى",tr:"hükmetmek"},
 {r:"خشي",t:"nakis",mu:"a",mz:"خَشِيَ",tr:"haşyet duymak"},
 {r:"رضي",t:"nakis",mu:"a",mz:"رَضِيَ",tr:"razı olmak"},
 {r:"نسي",t:"nakis",mu:"a",mz:"نَسِيَ",tr:"unutmak"},
 {r:"لقي",t:"nakis",mu:"a",mz:"لَقِيَ",tr:"karşılaşmak"},
 {r:"سعي",t:"nakis",mu:"a",mz:"سَعَى",tr:"koşmak"},
 {r:"وقي",t:"lafif",mu:"i",mz:"وَقَى",tr:"korumak"},
 {r:"وفي",t:"lafif",mu:"i",mz:"وَفَى",tr:"sözünü yerine getirmek"},
 {r:"ولي",t:"lafif",mu:"i",mz:"وَلِيَ",tr:"yakın olmak"}
];
FIIL.forEach((f,i)=>{f.id=i;f.r=Array.from(f.r);});
/* ---- çekim: {w: kelime, alt: ikinci vecih} ---- */
function cek(v,i,hal){
  const [F,A,L]=v.r, P=PRE[i], s=SUF[hal][i], q=VW[v.mu];
  switch(v.t){
    case "sahih": return {w:P+F+VW.o+A+q+L+s};
    case "misal": return {w:P+A+q+L+s};
    case "ecvef": return {w:s[0]===VW.o?P+F+q+L+s:P+F+q+({u:"و",i:"ي",a:"ا"})[v.mu]+L+s};
    case "mudaaf":{
      if(s[0]!==VW.o)return {w:P+F+q+A+VW.sh+s};
      const fakk=P+F+VW.o+A+q+A+s;
      return s===VW.o?{w:P+F+q+A+VW.sh+VW.a,alt:fakk}:{w:fakk};}
    case "nakis": return {w:P+F+VW.o+A+NK[v.mu][hal][i]};
    case "lafif": return {w:P+A+NK.i[hal][i]};
  }
}
const muz=(v,i)=>cek(v,i,"raf").w;
function edatli(v,i,e){const c=cek(v,i,e.hal);return {w:e.ar+" "+c.w,alt:c.alt?e.ar+" "+c.alt:null};}
/* ---- i‘râb açıklaması: hâl alâmeti ---- */
function irab(v,i,hal){
  const H=HAL[hal].tr;
  if(NISVE.includes(i))return {k:"mebni",t:`Nûn-ı nisve ile mebnîdir; edat sonunu değiştirmez (mahallen ${H.toLowerCase()}).`};
  if(HAMSE.includes(i)){
    if(hal==="raf")return {k:"nun",t:"Ef‘âl-i hamsedendir: nûnun sübûtu ile merfû."};
    return {k:"hazf",t:`Ef‘âl-i hamsedendir: nûnun hazfi ile ${H.toLowerCase()}.`};
  }
  const t=v.t, lt=(t==="nakis"||t==="lafif")?v.mu:null;
  if(hal==="raf"){
    if(lt==="a")return {k:"takdir",t:"Damme elif üzerinde takdîrîdir (taazzür: elif hareke almaz)."};
    if(lt)return {k:"takdir",t:`Damme ${lt==="u"?"vav":"yâ"} üzerinde takdîrîdir (sıklet: ağır geldiği için okunmaz).`};
    return {k:"lafz",t:"Lafzî damme ile merfû."};
  }
  if(hal==="nasb"){
    if(lt==="a")return {k:"takdir",t:"Fetha elif üzerinde takdîrîdir (taazzür)."};
    if(lt)return {k:"lafz",t:`Lafzî fetha ile mansûb: fetha hafif olduğu için ${lt==="u"?"vav":"yâ"} üzerinde okunur.`};
    return {k:"lafz",t:"Lafzî fetha ile mansûb."};
  }
  if(lt)return {k:"hazf",t:`İllet harfinin (${lt==="u"?"و":lt==="i"?"ي":"ى"}) hazfi ile meczûm; önceki hareke ona delâlet eder.`};
  if(t==="ecvef")return {k:"lafz",t:"Sükûn ile meczûm; iki sâkin birleştiği için ortadaki illet harfi düşer."};
  if(t==="mudaaf")return {k:"lafz",t:"Meczûm; iki misil sâkin kalınca ikincisi harekelenip idğam edilir (fetha, en hafif hareke), fekk de câizdir."};
  return {k:"lafz",t:"Sükûn ile meczûm."};
}
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
/* ---- kendi kökün (sahîh) ---- */
function rootOf(s){const r=Array.from(String(s).replace(/[\sً-ْ]/g,""));return r.length===3?r:null;}
function checkRoot(r){if(!r)return "Üç harf gir (ör. ن ص ر).";if(r.some(ch=>!/[ب-ي]/.test(ch)||/[اويىةءأإآؤئ]/.test(ch)))return "Kendi kökünde sahîh harfler kullan; illetli fiiller listede hazır.";if(r[1]===r[2])return "Ayn ve lâm aynı: muzâaf. Listedeki muzâaf fiillerden birini seç.";return "";}
/* ---- harf kümeleri ve fark boyama ---- */
function clusters(t){const out=[];for(const ch of t){if(MARKS.test(ch)&&out.length)out[out.length-1]+=ch;else out.push(ch);}return out;}
/* b kelimesini a’ya göre boyar: ortak baş ve son dışında kalan kısım .chg */
function farkBoya(a,b){
  const x=clusters(a),y=clusters(b);let s=0;while(s<x.length&&s<y.length&&x[s]===y[s])s++;
  let e=0;while(e<x.length-s&&e<y.length-s&&x[x.length-1-e]===y[y.length-1-e])e++;
  if(s+e===y.length&&x.length>y.length&&s>0){s--;e=0;}   // yalnız harf düştüyse kalan son harfi boya
  const mid=y.slice(s,y.length-e).join("");
  return esc(y.slice(0,s).join(""))+(mid?`<span class="chg">${esc(mid)}</span>`:"")+esc(y.slice(y.length-e).join(""));
}
