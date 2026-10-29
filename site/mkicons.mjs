// Simgeleri üretir: node site/mkicons.mjs  (playwright gerekir). Çıktılar site/icons/ altına yazılır ve depoya eklenir;
// siteyi derlemek (build_site.py) için tarayıcı gerekmez.
import {createRequire} from 'module';const {chromium}=createRequire(import.meta.url)('playwright');
import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const D=path.dirname(fileURLToPath(import.meta.url));
const cfg=JSON.parse(fs.readFileSync(path.join(D,'programs.json'),'utf8'));
const liste=[{id:'portal',ikon:cfg.site.ikon},...cfg.programlar.map(p=>({id:p.id,ikon:p.ikon}))];
const br=await chromium.launch();const pg=await br.newPage();
for(const x of liste){
  for(const [boyut,ad,pay] of [[512,'512',.0],[192,'192',.0],[180,'180',.0],[512,'maskable-512',.18]]){
    await pg.setViewportSize({width:boyut,height:boyut});
    const px=Math.round(boyut*(pay)),fs_=Math.round(boyut*(x.ikon.glyph.length>3?.27:.42));
    await pg.setContent(`<body style="margin:0"><div style="width:${boyut}px;height:${boyut}px;background:${x.ikon.bg};display:grid;place-items:center;box-sizing:border-box;padding:${px}px;overflow:hidden"><div style="font:700 ${fs_}px/1.3 'Noto Naskh Arabic','Amiri','Traditional Arabic','Geeza Pro','DejaVu Sans',serif;color:${x.ikon.fg};direction:rtl;text-align:center;white-space:nowrap">${x.ikon.glyph}</div></div></body>`);
    await pg.screenshot({path:path.join(D,'icons',`${x.id}-${ad}.png`)});
  }
}
await br.close();console.log(liste.length,'simge seti');
