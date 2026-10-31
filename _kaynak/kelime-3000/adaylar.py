#!/usr/bin/env python3
"""wordfreq (çok kaynaklı derlem frekansı) + simplemma (lemma) ile en sık kullanılan sözcüklerin aday listesini üretir.
Kullanım: python3 adaylar.py [N]  → adaylar.json  [[sıra, lemma, [örnek biçimler]], ...]
Gereksinim: pip install wordfreq simplemma"""
import json,re,sys
from wordfreq import top_n_list,word_frequency
import simplemma
N=int(sys.argv[1]) if len(sys.argv)>1 else 3900
g={}
for w in top_n_list('en',20000):
    if not re.fullmatch(r"[a-z]+",w): continue
    l=simplemma.lemmatize(w,lang='en')
    if not re.fullmatch(r"[a-z]+",l): l=w
    e=g.setdefault(l,{'f':0,'forms':[]})
    e['f']+=word_frequency(w,'en');e['forms'].append(w)
rows=sorted(g.items(),key=lambda x:-x[1]['f'])[:N]
out=[[i+1,l,e['forms'][:4]] for i,(l,e) in enumerate(rows)]
json.dump(out,open('adaylar.json','w'),ensure_ascii=False)
print(len(out),out[:15],out[2990:2996])
