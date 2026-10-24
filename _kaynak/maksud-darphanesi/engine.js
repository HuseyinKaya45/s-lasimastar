/* ===================== DARPHÂNE MOTORU (sâlim sülâsî) =====================
   Şablonlarda F, A, L kökün fâ, ayn ve lâm harflerinin yeridir. Bâb sırası Maksûd’a göredir. */
const VW={a:"َ",u:"ُ",i:"ِ",o:"ْ",sh:"ّ"};
const MARKS=/[ً-ْٰ]/;
const BABS=[
 {id:1,mz:"a",mu:"u",ar:"نَصَرَ يَنْصُرُ",vz:"فَعَلَ يَفْعُلُ",tr:"Mâzide ayn üstün, gâbirde (muzâride) ötre."},
 {id:2,mz:"a",mu:"i",ar:"ضَرَبَ يَضْرِبُ",vz:"فَعَلَ يَفْعِلُ",tr:"Mâzide üstün, gâbirde esre."},
 {id:3,mz:"a",mu:"a",ar:"فَتَحَ يَفْتَحُ",vz:"فَعَلَ يَفْعَلُ",tr:"İkisinde de üstün. Ayn veya lâmı boğaz harfidir (أَبَى يَأْبَى şâzdır)."},
 {id:4,mz:"i",mu:"a",ar:"عَلِمَ يَعْلَمُ",vz:"فَعِلَ يَفْعَلُ",tr:"Mâzide esre, gâbirde üstün."},
 {id:5,mz:"u",mu:"u",ar:"كَرُمَ يَكْرُمُ",vz:"فَعُلَ يَفْعُلُ",tr:"İkisinde de ötre."},
 {id:6,mz:"i",mu:"i",ar:"حَسِبَ يَحْسِبُ",vz:"فَعِلَ يَفْعِلُ",tr:"İkisinde de esre."}
];
const ROOTS=[
 {r:"نصر", b:1, ms:"نَصْرًا", tr:"yardım etmek"},
 {r:"كتب", b:1, ms:"كِتَابَةً", tr:"yazmak"},
 {r:"قتل", b:1, ms:"قَتْلًا", tr:"öldürmek"},
 {r:"شكر", b:1, ms:"شُكْرًا", tr:"şükretmek"},
 {r:"طلب", b:1, ms:"طَلَبًا", tr:"istemek"},
 {r:"ترك", b:1, ms:"تَرْكًا", tr:"terk etmek"},
 {r:"خرج", b:1, ms:"خُرُوجًا", tr:"çıkmak", lz:true},
 {r:"سجد", b:1, ms:"سُجُودًا", tr:"secde etmek", lz:true},
 {r:"دخل", b:1, ms:"دُخُولًا", tr:"girmek"},
 {r:"ضرب", b:2, ms:"ضَرْبًا", tr:"vurmak"},
 {r:"غفر", b:2, ms:"مَغْفِرَةً", tr:"bağışlamak"},
 {r:"حمل", b:2, ms:"حَمْلًا", tr:"taşımak"},
 {r:"كسب", b:2, ms:"كَسْبًا", tr:"kazanmak"},
 {r:"عرف", b:2, ms:"مَعْرِفَةً", tr:"tanımak"},
 {r:"جلس", b:2, ms:"جُلُوسًا", tr:"oturmak", lz:true},
 {r:"نزل", b:2, ms:"نُزُولًا", tr:"inmek", lz:true},
 {r:"فتح", b:3, ms:"فَتْحًا", tr:"açmak"},
 {r:"جمع", b:3, ms:"جَمْعًا", tr:"toplamak"},
 {r:"منع", b:3, ms:"مَنْعًا", tr:"engellemek"},
 {r:"نفع", b:3, ms:"نَفْعًا", tr:"fayda vermek"},
 {r:"شرح", b:3, ms:"شَرْحًا", tr:"açıklamak"},
 {r:"رفع", b:3, ms:"رَفْعًا", tr:"yükseltmek"},
 {r:"ذهب", b:3, ms:"ذَهَابًا", tr:"gitmek", lz:true},
 {r:"علم", b:4, ms:"عِلْمًا", tr:"bilmek"},
 {r:"شرب", b:4, ms:"شُرْبًا", tr:"içmek"},
 {r:"حفظ", b:4, ms:"حِفْظًا", tr:"ezberlemek, korumak"},
 {r:"فهم", b:4, ms:"فَهْمًا", tr:"anlamak"},
 {r:"عمل", b:4, ms:"عَمَلًا", tr:"çalışmak, yapmak"},
 {r:"ركب", b:4, ms:"رُكُوبًا", tr:"binmek"},
 {r:"فرح", b:4, ms:"فَرَحًا", tr:"sevinmek", lz:true},
 {r:"لعب", b:4, ms:"لَعِبًا", tr:"oynamak", lz:true},
 {r:"حسب", b:6, ms:"حِسْبَانًا", tr:"sanmak"},
 {r:"نعم", b:6, ms:"نَعِيمًا", tr:"bolluk içinde olmak", lz:true},
 {r:"كرم", b:5, ms:"كَرَمًا", tr:"cömert olmak", lz:true, sf:"كَرِيمٌ"},
 {r:"حسن", b:5, ms:"حُسْنًا", tr:"güzel olmak", lz:true, sf:"حَسَنٌ"},
 {r:"شرف", b:5, ms:"شَرَفًا", tr:"şerefli olmak", lz:true, sf:"شَرِيفٌ"},
 {r:"صغر", b:5, ms:"صِغَرًا", tr:"küçük olmak", lz:true, sf:"صَغِيرٌ"},
 {r:"كبر", b:5, ms:"كِبَرًا", tr:"büyük olmak", lz:true, sf:"كَبِيرٌ"},
 {r:"بعد", b:5, ms:"بُعْدًا", tr:"uzak olmak", lz:true, sf:"بَعِيدٌ"},
 {r:"قرب", b:5, ms:"قُرْبًا", tr:"yakın olmak", lz:true, sf:"قَرِيبٌ"}
];
const SIGA=[
 {z:"هُوَ",tr:"Müfred müzekker gâib"},{z:"هُمَا",tr:"Tesniye müzekker gâib"},{z:"هُمْ",tr:"Cem‘ müzekker gâib"},
 {z:"هِيَ",tr:"Müfred müennes gâibe"},{z:"هُمَا",tr:"Tesniye müennes gâibe"},{z:"هُنَّ",tr:"Cem‘ müennes gâibe"},
 {z:"أَنْتَ",tr:"Müfred müzekker muhâtab"},{z:"أَنْتُمَا",tr:"Tesniye müzekker muhâtab"},{z:"أَنْتُمْ",tr:"Cem‘ müzekker muhâtab"},
 {z:"أَنْتِ",tr:"Müfred müennes muhâtaba"},{z:"أَنْتُمَا",tr:"Tesniye müennes muhâtaba"},{z:"أَنْتُنَّ",tr:"Cem‘ müennes muhâtaba"},
 {z:"أَنَا",tr:"Mütekellim vahde"},{z:"نَحْنُ",tr:"Mütekellim ma‘a’l-gayr"}
];
const PRE=["يَ","يَ","يَ","تَ","تَ","يَ","تَ","تَ","تَ","تَ","تَ","تَ","أَ","نَ"];
const SUF={
 mazi:["َ","َا","ُوا","َتْ","َتَا","ْنَ","ْتَ","ْتُمَا","ْتُمْ","ْتِ","ْتُمَا","ْتُنَّ","ْتُ","ْنَا"],
 raf:["ُ","َانِ","ُونَ","ُ","َانِ","ْنَ","ُ","َانِ","ُونَ","ِينَ","َانِ","ْنَ","ُ","ُ"],
 jazm:["ْ","َا","ُوا","ْ","َا","ْنَ","ْ","َا","ُوا","ِي","َا","ْنَ","ْ","ْ"],
 nun:["َنَّ","َانِّ","ُنَّ","َنَّ","َانِّ","ْنَانِّ","َنَّ","َانِّ","ُنَّ","ِنَّ","َانِّ","ْنَانِّ"],
 hafif:{0:"َنْ",2:"ُنْ",3:"َنْ",6:"َنْ",8:"ُنْ",9:"ِنْ"}
};
const babOf=id=>BABS.find(b=>b.id===id);
const mzS=b=>"F"+VW.a+"A"+VW[b.mz]+"L", mzP=()=>"F"+VW.u+"A"+VW.i+"L";
const muS=b=>"F"+VW.o+"A"+VW[b.mu]+"L", muP=()=>"F"+VW.o+"A"+VW.a+"L";
const pP=i=>PRE[i].replace(VW.a,VW.u);
const hamz=b=>b.mu==="u"?"ا"+VW.u:"ا"+VW.i;
const ALL=[0,1,2,3,4,5,6,7,8,9,10,11,12,13], G6=[0,1,2,3,4,5], H6=[6,7,8,9,10,11];
/* Maksûd’un saydığı tasrîf vecihleri */
const TABLES=[
 {id:"mazi",ar:"الْمَاضِي الْمَعْلُومُ",tr:"Mâzî · ma‘lûm",n:14,f:(b,i)=>mzS(b)+SUF.mazi[i]},
 {id:"maziP",ar:"الْمَاضِي الْمَجْهُولُ",tr:"Mâzî · meçhûl",n:14,pas:1,f:(b,i)=>mzP()+SUF.mazi[i]},
 {id:"muz",ar:"الْمُسْتَقْبَلُ الْمَعْلُومُ",tr:"Müstakbel (muzâri) · ma‘lûm",n:14,f:(b,i)=>PRE[i]+muS(b)+SUF.raf[i]},
 {id:"muzP",ar:"الْمُسْتَقْبَلُ الْمَجْهُولُ",tr:"Müstakbel · meçhûl",n:14,pas:1,f:(b,i)=>pP(i)+muP()+SUF.raf[i]},
 {id:"emr",ar:"الْأَمْرُ الْمَعْلُومُ",tr:"Emir · ma‘lûm (gâib + hâzır)",n:12,only:[...G6,...H6],f:(b,i)=>i<6?"لِ"+PRE[i]+muS(b)+SUF.jazm[i]:hamz(b)+muS(b)+SUF.jazm[i]},
 {id:"emrP",ar:"الْأَمْرُ الْمَجْهُولُ",tr:"Emir · meçhûl",n:14,pas:1,f:(b,i)=>(i===12?"لِ":"لِ")+pP(i)+muP()+SUF.jazm[i]},
 {id:"nehy",ar:"النَّهْيُ الْمَعْلُومُ",tr:"Nehiy · ma‘lûm",n:12,only:[...G6,...H6],f:(b,i)=>"لَا "+PRE[i]+muS(b)+SUF.jazm[i]},
 {id:"nehyP",ar:"النَّهْيُ الْمَجْهُولُ",tr:"Nehiy · meçhûl",n:14,pas:1,f:(b,i)=>"لَا "+pP(i)+muP()+SUF.jazm[i]},
 {id:"nun",ar:"الْأَمْرُ بِالنُّونِ الثَّقِيلَةِ",tr:"Emir · nûn-ı sakîle (müşedded)",n:12,only:[...G6,...H6],f:(b,i)=>i<6?"لِ"+PRE[i]+muS(b)+SUF.nun[i]:hamz(b)+muS(b)+SUF.nun[i]},
 {id:"hafif",ar:"الْأَمْرُ بِالنُّونِ الْخَفِيفَةِ",tr:"Emir · nûn-ı hafîfe (muhaffef)",n:6,only:[0,2,3,6,8,9],f:(b,i)=>i<6?"لِ"+PRE[i]+muS(b)+SUF.hafif[i]:hamz(b)+muS(b)+SUF.hafif[i]}
];
const FAIL=["FَاAِLٌ","FَاAِLَانِ","FَاAِLُونَ","FُAَّاLٌ","FُAَّLٌ","FَAَLَةٌ","FَاAِLَةٌ","FَاAِLَتَانِ","FَاAِLَاتٌ","FَوَاAِLُ"];
const FAIL_TR=["Müfred müzekker","Tesniye müzekker","Cem‘-i müzekker","Cem‘-i teksîr (فُعَّالٌ)","Cem‘-i teksîr (فُعَّلٌ)","Cem‘-i teksîr (فَعَلَةٌ)","Müfred müennes","Tesniye müennes","Cem‘-i müennes","Cem‘-i teksîr (فَوَاعِلُ)"];
const MEF=["مَFْAُوLٌ","مَFْAُوLَانِ","مَFْAُوLُونَ","مَFَاAِيLُ","مَFْAُوLَةٌ","مَFْAُوLَتَانِ","مَFْAُوLَاتٌ"];
const MEF_TR=["Müfred müzekker","Tesniye müzekker","Cem‘-i müzekker","Cem‘-i teksîr (مَفَاعِيلُ)","Müfred müennes","Tesniye müennes","Cem‘-i müennes"];
/* Mîmî masdar, zaman, mekân (Maksûd: muzâride ayn ötre/üstün → مَفْعَلٌ hepsi; esre → masdar مَفْعَلٌ, zaman-mekân مَفْعِلٌ) */
const mimi=b=>({masdar:"مَFْAَLٌ",zm:b.mu==="i"?"مَFْAِLٌ":"مَFْAَLٌ"});
/* Fâil vezni (mâzinin aynına göre) */
function failNote(b){
  if(b.mz==="a")return {v:"فَاعِلٌ",d:"Mâzide ayn üstün (1., 2., 3. bâb): فَاعِلٌ (نَاصِرٌ)."};
  if(b.mz==="u")return {v:"فَعِيلٌ / فَعْلٌ",d:"Mâzide ayn ötre (5. bâb): عَظِيمٌ ve ضَخْمٌ vezinleri."};
  return {v:"فَاعِلٌ (müteaddî) · lâzımda dört vezin",d:"Mâzide ayn esre (4. ve 6. bâb): müteaddîde عَالِمٌ; lâzımda مَرِيضٌ، زَمِنٌ، أَحْمَرُ–حَمْرَاءُ، عَطْشَانُ–عَطْشَى."};
}
function fill(t,r){return t.replace(/F/g,r[0]).replace(/A/g,r[1]).replace(/L/g,r[2]);}
function clusters(t){const out=[];for(const ch of t){if(MARKS.test(ch)&&out.length)out[out.length-1]+=ch;else out.push(ch);}return out;}
function paint(t,r){return clusters(t).map(c=>{const b=c[0],rest=c.slice(1);if(b==="F")return `<span class="rf">${r[0]}${rest}</span>`;if(b==="A")return `<span class="ra">${r[1]}${rest}</span>`;if(b==="L")return `<span class="rl">${r[2]}${rest}</span>`;if(b===" ")return " ";return `<span class="zv">${c}</span>`;}).join("");}
function rootOf(s){const r=Array.from(String(s).replace(/[\sً-ْ]/g,""));return r.length===3?r:null;}
function checkRoot(r){if(!r)return "Üç harf gir (ör. ن ص ر).";if(r.some(ch=>!/[ب-ي]/.test(ch)||/[اويىةءأإآؤئ]/.test(ch)))return "Sahîh (sâlim) bir kök gir: harf-i illet (و ي ا) ve hemze olmasın; onlar İ‘lâl Ocağı’nda.";if(r[1]===r[2])return "Ayn ve lâm aynı: muzâaf kök. Muzâaf İ‘lâl Ocağı’nda işlenir.";return "";}
