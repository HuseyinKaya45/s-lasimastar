#!/usr/bin/env python3
"""Kök listesini el-Arabiyye beyne yedeyk Sözlük Defteri ile karşılaştırır.
Kullanım: python3 sozluk_kontrol.py <mucem/kaynak klasörü>   (sözlük JSON sayfaları: p1.json …)
Çıktı: sozluk_dogrulama.json {kök: [{k, muz, bab, ms, sayfa, tr}]} — yalnızca 3 harfli, şeddesiz sâlim fiil girdileri."""
import glob,json,re,sys,os
D=sys.argv[1] if len(sys.argv)>1 else 'mucem/kaynak'
E=[]
for f in sorted(glob.glob(os.path.join(D,'p*.json')),key=lambda x:int(re.findall(r'\d+',os.path.basename(x))[0])):
    E+=[e for e in json.load(open(f,encoding='utf-8')) if isinstance(e,dict)]
HAR=re.compile('[ً-ْٰـ]')
def parts(w):
    out=[]
    for ch in w:
        if re.match('[ً-ْٰ]',ch):
            if out: out[-1][1]+=ch
        elif ch!='ـ': out.append([ch,''])
    return out
V={'َ':'a','ُ':'u','ِ':'i'}
def v(h):
    for c in h:
        if c in V: return V[c]
    return ''
BAB={('a','u'):1,('a','i'):2,('a','a'):3,('i','a'):4,('i','i'):5,('u','u'):6}
def sk(w): return re.sub('[أإآٱء]','ا',HAR.sub('',w))
def clean(t):
    t=t.strip('،؛:؟. ');return t[1:] if t.startswith('و') and len(sk(t))>3 else t
out={}
for e in E:
    k=e.get('k','');m=e.get('metin') or ''
    if len(sk(k))!=3 or not m or 'ّ' in k: continue
    head=re.split('[:؛]',m,maxsplit=1)[0].strip()
    toks=[t for t in re.split(r'[\s،]+',head) if t]
    if not toks or not sk(toks[0]).startswith('ي'): continue
    mp=parts(k);up=parts(toks[0])
    if len(mp)!=3 or len(up)!=4 or v(up[0][1])!='a': continue
    bab=BAB.get((v(mp[1][1]),v(up[2][1])))
    ms=[clean(t) for t in toks[1:] if t not in('أَوْ','أو') and not re.match(r'^\(|^[٠-٩]',t)]
    out.setdefault(sk(k),[]).append({'k':k,'muz':toks[0],'bab':bab,'ms':ms,'sayfa':e['sayfa'],'tr':e.get('tr')})
json.dump(out,open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'sozluk_dogrulama.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=0)
print(len(out),'kök yazıldı')
