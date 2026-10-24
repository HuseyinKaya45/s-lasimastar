/* ===== Ses: önce programa gömülü kayıt, yoksa cihazdaki gerçek Arapça ses; başka dilde asla okumaz ===== */
const SES_AUDIO={/*__SES__*/};
const sesKey=t=>String(t).normalize('NFC').replace(/[ـ‍]/g,'').replace(/\s+/g,' ').trim();
let SES_A=null,SES_V=null;
function sesVoice(){if(!('speechSynthesis' in window))return null;try{return speechSynthesis.getVoices().find(v=>/^ar([-_]|$)/i.test(v.lang))||null;}catch(e){return null;}}
if('speechSynthesis' in window){try{speechSynthesis.getVoices();speechSynthesis.addEventListener('voiceschanged',()=>{SES_V=sesVoice();});}catch(e){}}
function sesStop(){try{if(SES_A){SES_A.pause();SES_A=null;}if('speechSynthesis' in window)speechSynthesis.cancel();}catch(e){}}
function sesPlay(t,onend,warn){
  sesStop();let done=false;const fin=()=>{if(!done){done=true;if(onend)onend();}};
  const d=SES_AUDIO[sesKey(t)];
  if(d){try{SES_A=new Audio('data:audio/mpeg;base64,'+d);SES_A.onended=fin;SES_A.onerror=fin;const p=SES_A.play();if(p&&p.catch)p.catch(fin);if(onend)setTimeout(fin,20000);return true;}catch(e){}}
  const v=SES_V||sesVoice();
  if(v){try{const u=new SpeechSynthesisUtterance(t);u.lang=v.lang;u.voice=v;u.rate=.8;if(onend){u.onend=fin;u.onerror=fin;setTimeout(fin,6000);}speechSynthesis.speak(u);return true;}catch(e){}}
  if(warn)warn('Bu metnin kayıtlı sesi yok ve cihazda Arapça ses bulunamadı; yanlış okunmasın diye seslendirilmedi.');
  if(onend)setTimeout(fin,1200);return false;
}
