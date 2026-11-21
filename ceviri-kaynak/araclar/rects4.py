import glob, json, sys, collections
import numpy as np
from PIL import Image
d=sys.argv[1]
cols={int(k):v for k,v in json.load(open(f'{d}/cols.json')).items()}
R={}
for i,f in enumerate(sorted(glob.glob(f'{d}/full/im-*.jpg')),1):
    X0,X1=cols[i]
    a=np.asarray(Image.open(f).convert('RGB')).astype(int)
    dark=a.min(axis=2)<238
    frac=dark[:,X0+25:X1-25].mean(axis=1)
    rows=frac>0.45
    regs=[];s=None
    for y,v in enumerate(rows):
        if v and s is None: s=y
        if not v and s is not None: regs.append([s,y]); s=None
    if s is not None: regs.append([s,len(rows)])
    m=[]
    for r in regs:
        if m and r[0]-m[-1][1]<30: m[-1][1]=r[1]
        else: m.append(r)
    out=[]
    for y0,y1 in m:
        if y1-y0<80: continue
        band=dark[y0+5:y1-5,X0+25:X1-25]
        xs=np.where(band.mean(axis=0)>0.6)[0]
        if len(xs)<100: continue
        out.append([int(xs[0])+X0+25,y0,int(xs[-1])+X0+26,y1])
    R[i]=out
json.dump(R,open(f'{d}/rects.json','w'))
# default text x-range per column layout
by=collections.defaultdict(collections.Counter)
for p in R:
    for r in R[p]: by[tuple(cols[p])][(r[0],r[2])]+=1
tx={}
for p in cols:
    c=by.get(tuple(cols[p]))
    if c: tx[p]=list(c.most_common(1)[0][0])
    else: w=cols[p][1]-cols[p][0]; tx[p]=[cols[p][0]+int(w*0.1),cols[p][1]-int(w*0.1)]
json.dump(tx,open(f'{d}/tx.json','w'))
print(d,sum(len(v) for v in R.values()),{k:v.most_common(2) for k,v in by.items()})
