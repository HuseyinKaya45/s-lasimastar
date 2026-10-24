ICON.compass='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5z" fill="currentColor"/></svg>';
ICON.scale='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M7 21h10M4 7h16M4 7l-3 7a3 3 0 0 0 6 0zM20 7l-3 7a3 3 0 0 0 6 0z"/></svg>';
ICON.ladder='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 2v20M17 2v20M7 6h10M7 11h10M7 16h10"/></svg>';
ICON.book='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/></svg>';
ICON.who='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20a6 6 0 0 1 12 0M10 20a6 6 0 0 1 12 0"/></svg>';
ICON.sort='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h11M4 18h6M19 14v6M16 17l3 3 3-3"/></svg>';
/* ---------- durum ---------- */
const KEY='lafiz-pusulasi-v1';
const FRESH=()=>({v:1,xp:0,les:{},lab:{},exams:[],best:{},played:{},cards:{},badges:{},snd:true,day:'',streak:0,name:''});
let S=FRESH();
try{const t=JSON.parse(localStorage.getItem(KEY)||'null');if(t&&t.v===1)S=Object.assign(S,t);}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
(function streak(){const d=new Date().toISOString().slice(0,10);if(S.day===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.day===y?S.streak+1:1;S.day=d;save();})();
const LEVELS=[[0,'Tâlib'],[300,'Mübtedî'],[900,'Mutavassıt'],[1800,'Usûlî'],[3200,'Müctehid fi’l-mesâil'],[5000,'Fakîh']];
function lvl(){let i=0;LEVELS.forEach((l,k)=>{if(S.xp>=l[0])i=k;});const cur=LEVELS[i][0],nx=LEVELS[i+1]?LEVELS[i+1][0]:cur+1;return {name:LEVELS[i][1],p:LEVELS[i+1]?(S.xp-cur)/(nx-cur):1};}
function hud(){const l=lvl();$('#lvlName').textContent=l.name;$('#lvlBar').style.width=Math.round(l.p*100)+'%';$('#xp').textContent=S.xp;}
function addXP(n){const b=lvl().name;S.xp+=n;save();hud();const a=lvl().name;if(a!==b){toast('Tebrikler! Yeni rütbe: '+a);confetti();}}
const lstar=id=>{const r=S.les[id];if(!r)return 0;return r.best>=1?3:r.best>=.6?2:1;};
const GC=g=>AYRIM[g].col;
