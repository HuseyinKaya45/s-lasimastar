#!/usr/bin/env python3
"""ham/out_*.json (ajan çıktıları: tutulan sözcük ya da drop) dosyalarını birleştirip data.js üretir.
Kullanım: python3 mkdata.py [N=3000] [--duzeltme duzeltme.json]
duzeltme.json: {"sözcük": {"tr":..,"ex":..,"et":..,"p":..} | {"drop":1}}  (inceleme sonrası düzeltmeler)"""
import glob,json,os,re,sys
D=os.path.dirname(os.path.abspath(__file__))
N=3000
fix={}
for i,a in enumerate(sys.argv[1:]):
    if a.isdigit():N=int(a)
    if a=='--duzeltme':fix=json.load(open(sys.argv[i+2],encoding='utf-8'))
rows=[]
for f in sorted(glob.glob(os.path.join(D,'ham','out_*.json')),key=lambda x:int(re.findall(r'\d+',os.path.basename(x))[0])):
    rows+=json.load(open(f,encoding='utf-8'))
rows.sort(key=lambda r:r['r'])
POS={'n','v','adj','adv','prep','pron','conj','det','num','int','aux'}
keep=[];bad=[];seen=set()
for r in rows:
    w=r['w'].strip().lower()
    fx=fix.get(w,{})
    if r.get('drop') or fx.get('drop'):continue
    r={**r,**{k:v for k,v in fx.items() if k in('tr','ex','et','p')}}
    ok=all(isinstance(r.get(k),str) and r[k].strip() for k in('p','tr','ex','et')) and r['p'] in POS and w not in seen
    if not ok:bad.append(r);continue
    seen.add(w);keep.append({'k':w,'p':r['p'],'tr':r['tr'].strip(),'ex':r['ex'].strip(),'et':r['et'].strip()})
keep=keep[:N]
out=[{'i':i,'r':i+1,**e} for i,e in enumerate(keep)]
open(os.path.join(D,'data.js'),'w',encoding='utf-8').write('/* otomatik üretildi: mkdata.py */\nconst W='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(rows),'aday',len(out),'kelime',len(bad),'geçersiz',[b.get('w') for b in bad][:10])
