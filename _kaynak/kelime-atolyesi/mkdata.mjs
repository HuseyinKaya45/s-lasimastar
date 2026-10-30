// İngilizce gramer programlarındaki VOCAB listelerini, fiil kalıbı ve sayılabilirlik listelerini data.js'e toplar:
//   node _kaynak/kelime-atolyesi/mkdata.mjs
import fs from 'fs';import vm from 'vm';import path from 'path';
const K=path.dirname(path.dirname(new URL(import.meta.url).pathname));
const P=[['zm','zaman-makinesi','Zaman Makinesi',['engine.js','lessons.js','data.js']],
 ['ys','yapi-ustasi','Yapı Ustası',['engine.js','lessons1.js','lessons2.js','lessons3.js','lessons4.js','data.js']],
 ['rc','renkli-cumleler','Renkli Cümleler',['engine.js','lessons.js','lessons2.js','data.js']],
 ['pa','parcacik-atlasi','Parçacık Atlası',['data.js','lessons.js']]];
const W=[],G=[];let VS=[],NS=[];
for(const [pc,k,ad,files] of P){
  const c={};vm.createContext(c);
  vm.runInContext(files.map(f=>fs.readFileSync(path.join(K,k,f),'utf8')).join('\n')+';this.V=VOCAB;this.VS=typeof VSORT!=="undefined"?VSORT:null;this.NS=typeof NSORT!=="undefined"?NSORT:null;',c);
  if(c.VS)VS=c.VS;if(c.NS)NS=c.NS;
  for(const g of c.V){
    const code=pc+'-'+g.k;G.push({g:code,t:g.t,p:ad,u:g.u});
    for(const w of g.w){
      const time=g.k==='time';
      W.push({i:W.length,g:code,k:w[0],tr:w[1],ex:time?w[0]:(w[2]||''),...(time?{pp:w[2]}:{})});
    }
  }
}
fs.writeFileSync(path.join(K,'kelime-atolyesi','data.js'),'/* otomatik üretildi: mkdata.mjs */\nconst W='+JSON.stringify(W)+';\nconst GRP='+JSON.stringify(G)+';\nconst VS='+JSON.stringify(VS)+';\nconst NS='+JSON.stringify(NS)+';\n');
console.log(W.length,'kelime/kalıp',G.length,'grup',VS.length,'fiil kalıbı',NS.length,'isim');
