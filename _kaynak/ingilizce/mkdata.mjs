// Dört İngilizce programın ünite ve sorularını ingilizce/data.js'e toplar: node _kaynak/ingilizce/mkdata.mjs
import fs from 'fs';import vm from 'vm';import path from 'path';
const K=path.dirname(path.dirname(new URL(import.meta.url).pathname));
const P=[['zaman-makinesi','Zaman Makinesi','Tenses',['engine.js','lessons.js']],['yapi-ustasi','Yapı Ustası','Structures',['engine.js','lessons1.js','lessons2.js','lessons3.js','lessons4.js']],['renkli-cumleler','Renkli Cümleler','Adjectives · Linkers · Prepositions',['engine.js','lessons.js','lessons2.js']],['parcacik-atlasi','Parçacık Atlası','Phrasal verbs',['data.js','lessons.js']]];
const out=[];
for(const [k,ad,en,files] of P){
  const ctx={};vm.createContext(ctx);vm.runInContext(files.map(f=>fs.readFileSync(path.join(K,k,f),'utf8')).join('\n')+';this.__U=UNITS;this.__P=PARTS;',ctx);
  out.push({k,ad,en,parts:ctx.__P.map(p=>({t:p.t,en:p.en,u:p.u})),units:ctx.__U.map(u=>({n:u.n,ek:u.ek||null,t:u.t,f:u.f,tr:u.tr,q:u.q}))});
}
fs.writeFileSync(path.join(K,'ingilizce','data.js'),'/* otomatik üretildi: mkdata.mjs */\nconst PROGS='+JSON.stringify(out)+';\n');
console.log(out.map(p=>p.k+' '+p.units.length+' ünite '+p.units.reduce((a,u)=>a+u.q.length,0)+' soru').join('\n'));
