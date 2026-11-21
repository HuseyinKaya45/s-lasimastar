# Split every page into post boxes, join boxes across page breaks, attach translations.
import glob, json, sys, os, collections
import numpy as np
from PIL import Image

def load_entries(d):
    E=[]
    def t(p,y,s): E.append((p,y,'t',s.strip()))
    def h(p,y,s): E.append((p,y,'h',s.strip()))
    for f in sorted(glob.glob(d+'/data*.py')):
        src=open(f,encoding='utf8').read().replace("E=[]","").replace("def t(p,y,s): E.append((p,y,'t',s.strip()))","").replace("def h(p,y,s): E.append((p,y,'h',s.strip()))","")
        exec(src,{'t':t,'h':h})
    return E

def page_cols(d,files):
    if os.path.exists(d+'/cols.json'):
        return {int(k):tuple(v) for k,v in json.load(open(d+'/cols.json')).items()}
    G={}
    for i,f in enumerate(files,1):
        a=np.asarray(Image.open(f).convert('L')).astype(int)
        xs=np.where((a<245).mean(axis=0)>0.02)[0]
        G[i]=(int(xs[0]),int(xs[-1])) if len(xs) else (0,0)
    ok={p:g for p,g in G.items() if 800<=g[1]-g[0]<=1450}
    cols={}
    for p in G:
        if p in ok: cols[p]=ok[p]; continue
        q=[k for k in ok if k>p]; r=[k for k in ok if k<p]
        cols[p]=ok[min(q)] if q else ok[max(r)]
    json.dump(cols,open(d+'/cols.json','w'))
    return cols

def boxes(rgb,X0,X1):
    """runs of rows where the box's left AND right border are present"""
    g=rgb.min(axis=2); spread=rgb.max(axis=2)-g
    neutral=(spread<14)&(g>185)&(g<246)          # light-grey border pixels (some files: very faint)
    lo=max(X0-12,0); hi=min(X1+12,g.shape[1]-1)
    colfrac=neutral[:,lo:hi+1].mean(axis=0)
    cand=np.where(colfrac>0.22)[0]
    if len(cand)>=2 and cand[-1]-cand[0]>600: X0,X1=int(cand[0])+lo,int(cand[-1])+lo
    left=g[:,max(X0-3,0):X0+4].min(axis=1)<246
    right=g[:,X1-3:X1+4].min(axis=1)<246
    inside=left&right
    runs=[];s=None
    for y,v in enumerate(inside):
        if v and s is None: s=y
        if not v and s is not None:
            runs.append([s,y]); s=None
    if s is not None: runs.append([s,len(inside)])
    m=[]
    for r in runs:
        if m and r[0]-m[-1][1]<=6: m[-1][1]=r[1]
        else: m.append(r)
    out=[]
    for y0,y1 in m:
        if y1-y0<45: continue
        def hline(ys):
            ys=[y for y in ys if 0<=y<g.shape[0]]
            return any(neutral[y,X0+40:X1-40].mean()>0.6 for y in ys)
        top=hline(range(y0-2,y0+8)); bot=hline(range(y1-8,y1+3))
        out.append((y0,y1,top,bot,X0,X1))
    return out

def run(d):
    files=sorted(glob.glob(d+'/full/im-*.jpg'))
    cols=page_cols(d,files)
    E=load_entries(d)
    rects={int(k):v for k,v in json.load(open(d+'/rects.json')).items()} if os.path.exists(d+'/rects.json') else {}
    posts=[]; cur=None
    for p,f in enumerate(files,1):
        X0,X1=cols[p]
        a=np.asarray(Image.open(f).convert('RGB')).astype(int)
        bs=boxes(a,X0,X1)
        for bi,(y0,y1,top,bot,bx0,bx1) in enumerate(bs):
            seg={'p':p,'y0':y0,'y1':y1,'x0':bx0,'x1':bx1}
            if cur is not None and not top and bi==0: cur['segs'].append(seg)
            else:
                cur={'segs':[seg]}; posts.append(cur)
            if bot: cur=None
        if not bs: cur=None
    # attach entries
    lost=0
    idx=collections.defaultdict(list)
    for po in posts:
        for sg in po['segs']: idx[sg['p']].append((sg,po))
    for (p,y,k,s) in E:
        c=[(sg,po) for sg,po in idx.get(p,[]) if sg['y0']-15<=y<=sg['y1']+15]
        if not c:
            c=sorted(idx.get(p,[]),key=lambda z:min(abs(y-z[0]['y0']),abs(y-z[0]['y1'])))[:1]; lost+=1
        if not c: continue
        sg,po=c[0]
        po.setdefault('ent',[]).append({'p':p,'y':y,'k':k,'s':s})
    for po in posts:
        po.setdefault('ent',[])
        po['ent'].sort(key=lambda e:(e['p'],e['y']))
        for sg in po['segs']:
            sg['im']=[r for r in rects.get(sg['p'],[]) if r[1]>=sg['y0']-5 and r[3]<=sg['y1']+5]
    return posts,len(E),lost

if __name__=='__main__':
    for d in sys.argv[1:]:
        posts,n,lost=run(d)
        ne=sum(1 for p in posts if p['ent']); multi=sum(1 for p in posts if len(p['segs'])>1)
        print(d,'| pages',len(glob.glob(d+'/full/im-*.jpg')),'posts',len(posts),'with text',ne,'multi-page',multi,'entries',n,'unplaced',lost, 'max segs',max([len(p['segs']) for p in posts]+[0]),flush=True)
        json.dump(posts,open(d+'/posts.json','w'),ensure_ascii=False)
