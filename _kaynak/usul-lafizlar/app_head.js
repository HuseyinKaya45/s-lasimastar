/* ===== Esrâr Rasathânesi — uygulama ===== */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const app=$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const isAr=s=>/[؀-ۿ]/.test(s)&&!/[a-zçğıöşü]/i.test(String(s).replace(/<[^>]*>/g,''));
const A=(s,c='')=>`<span class="ar ${c}">${esc(s)}</span>`;
/* Metindeki Arapça parçaları otomatik sarar (Türkçe açıklama içinde) */
const AW=s=>String(s).replace(/([؀-ۿ﴾﴿][؀-ۿـً-ٰٕ﴾﴿\s،؛؟.…\-()_/]*[؀-ۿً-ٰٕ﴾﴿])/g,'<span class="ar">$1</span>');
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);
const strip=s=>s.replace(/[ً-ٰٕـ‍]/g,'');
