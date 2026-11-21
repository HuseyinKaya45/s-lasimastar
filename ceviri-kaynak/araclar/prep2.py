import json, glob, sys, collections
from PIL import Image, ImageDraw
for n in sys.argv[1:]:
    G={int(k):v for k,v in json.load(open(f'{n}/geom.json')).items()}
    N=len(G); cols={}
    ok={p:(g[0],g[1]) for p,g in G.items() if 800<=g[1]-g[0]<=1450}
    for p in range(1,N+1):
        if p in ok: cols[p]=ok[p]; continue
        q=[k for k in ok if k>p]; r=[k for k in ok if k<p]
        cols[p]=ok[min(q)] if q else ok[max(r)]
    json.dump(cols,open(f'{n}/cols.json','w'))
    wmax=max(v[1]-v[0] for v in cols.values())
    parts,scale=(3,0.75) if wmax>1150 else (2,0.8)
    print(n,'fallback',[p for p in cols if p not in ok],collections.Counter(cols.values()).most_common(3),'parts',parts)
    for i,f in enumerate(sorted(glob.glob(f'{n}/full/im-*.jpg')),1):
        full=Image.open(f).convert('RGB'); H=full.height
        x0,x1=cols[i]; x0-=15; x1+=15; w=x1-x0
        m=Image.new('RGB',(w+70,H),'white'); m.paste(full.crop((x0,0,x1,H)),(70,0)); d=ImageDraw.Draw(m)
        for y in range(0,H,100):
            d.line((50,y,70,y),fill='red',width=3); d.text((2,y-6 if y else 0),str(y),fill='red',font_size=22)
        step=H//parts
        for h in range(parts):
            a=max(0,h*step-20); b=min(H,(h+1)*step+20)
            c=m.crop((0,a,w+70,b)); c=c.resize((int((w+70)*scale),int((b-a)*scale)),Image.LANCZOS)
            c.save(f'{n}/crops/c{i:02d}{"abc"[h]}.jpg',quality=85)
