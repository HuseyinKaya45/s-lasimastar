#!/usr/bin/env python3
"""el-Arabiyye beyne yedeyk Sözlük Defteri verisinden data.js üretir.
Kullanım: python3 prep.py <mucem/kaynak klasörü>   (p001.json …)"""
import glob,json,os,re,sys
D=sys.argv[1] if len(sys.argv)>1 else '/tmp/mucem/mucem/kaynak'
HAR=re.compile('[ً-ْٰـ]')
def sk(w): return re.sub('[أإآٱء]','ا',HAR.sub('',w))
def strip_q(s): return re.sub(r'^[\s“”"«»﴿﴾]+|[\s“”"«»﴿﴾.]+$','',s)
E=[]
for f in sorted(glob.glob(os.path.join(D,'p*.json'))):
    E+=[e for e in json.load(open(f,encoding='utf-8')) if isinstance(e,dict) and e.get('k')]
out=[]
for n,e in enumerate(E):
    k=e['k'].strip();tr=(e.get('tr') or '').strip()
    if not tr: continue
    r={'k':k,'tr':tr,'p':e['sayfa']}
    if e.get('tanim'): r['d']=e['tanim'].strip()
    if e.get('tanim_tr'): r['dt']=e['tanim_tr'].strip()
    c=e.get('cogul')
    if c and isinstance(c,str): r['c']=c.strip()
    b=e.get('bosluk')
    if b and b.get('cumle') and b.get('kelime') and b['kelime'] in b['cumle']:
        i=-1
        for j,o in enumerate(e.get('ornekler') or []):
            if strip_q(o)==strip_q(b['cumle']) or b['cumle'] in o: i=j;break
        t=(e.get('ornekler_tr') or [])
        r['b']=[b['cumle'].strip(),b['kelime'].strip(),strip_q(t[i]) if 0<=i<len(t) else '']
    m=e.get('metin') or ''
    head=re.split('[:؛]',m,maxsplit=1)[0].strip()
    toks=[t for t in re.split(r'[\s،]+',head) if t]
    r['t']='i'
    if toks and sk(toks[0]).startswith('ي') and len(sk(toks[0]))>=4:
        a,bk=set(sk(k)),sk(toks[0])[1:]
        if len(set(bk)&a)>=0.7*len(set(bk)) and abs(len(bk)-len(sk(k)))<=2 and not k.startswith('ال'):
            r['t']='f';r['f']=[toks[0]]+[x for x in toks[1:] if x not in('أَوْ','أو') and not re.match(r'^[\(٠-٩]',x) and 2<len(sk(x))<12][:2]
    out.append(r)
for i,r in enumerate(out): r['i']=i
js='const W='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'data.js'),'w',encoding='utf-8').write(js)
import collections
print(len(out),'madde',len(js)//1024,'KB',collections.Counter(r['t'] for r in out),'cloze',sum(1 for r in out if 'b' in r),'çoğul',sum(1 for r in out if 'c' in r),'tanım',sum(1 for r in out if 'd' in r))
