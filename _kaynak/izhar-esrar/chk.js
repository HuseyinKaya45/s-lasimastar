const fs=require('fs');eval(fs.readFileSync(__dirname+'/lessons.js','utf8')+';global.L=LESSONS');
console.log(L.length, L.reduce((a,l)=>a+l.q.length,0));
