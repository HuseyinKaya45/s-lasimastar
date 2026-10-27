#!/usr/bin/env python3
"""ses/<program>.json'u derlenmiş <program>/index.html'deki SES_AUDIO satırına yeniden gömer
(yeniden derlemeden; kitap üniteleri gibi kaynağı burada olmayan programlar için).
python3 _kaynak/ses_gom.py program ..."""
import json,os,re,sys
K=os.path.dirname(os.path.abspath(__file__));R=os.path.dirname(K)
for p in sys.argv[1:]:
    f=os.path.join(R,p,'index.html');h=open(f,encoding='utf-8').read()
    m=json.load(open(os.path.join(K,'ses',p+'.json'),encoding='utf-8'))
    new='const SES_AUDIO={'+','.join(json.dumps(k,ensure_ascii=False)+':'+json.dumps(v) for k,v in m.items())+'};'
    h2,n=re.subn(r'^const SES_AUDIO=\{.*?\};$',lambda _:new,h,count=1,flags=re.M|re.S)
    assert n==1,p
    open(f,'w',encoding='utf-8').write(h2);print(p,len(h),'→',len(h2))
