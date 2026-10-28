// stdin: 1. kitap veri betiği (<script> içi) → stdout: JSON {ad: değer} (RESIM/ZAMAN için yalnızca anahtarlar)
const vm = require('vm');
let s = ''; process.stdin.setEncoding('utf8');
process.stdin.on('data', d => s += d).on('end', () => {
  const ctx = {}; vm.createContext(ctx); vm.runInContext(s, ctx);
  const names = [...s.matchAll(/^var\s+([A-Za-z_0-9]+)\s*=/gm)].map(m => m[1]);
  const o = {};
  for (const n of names) {
    const v = vm.runInContext(n, ctx);
    o[n] = (n === 'RESIM' || n === 'ZAMAN') ? { __anahtarlar: Object.keys(v) } : v;
  }
  process.stdout.write(JSON.stringify(o));
});
