#!/usr/bin/env python3
"""Programları _kaynak'tan derler: python3 _kaynak/build.py [program ...]
ses/<program>.json varsa ({metin: base64-mp3}) gömülü ses olarak eklenir."""
import json,os,subprocess,sys
K=os.path.dirname(os.path.abspath(__file__));R=os.path.dirname(K)
ORDER={'kelime-ustasi':['data.js','app.js'],'avamil-birgivi':['data1.js','data2.js','app.js'],'avamil-curcani':['data.js','app.js'],'emsile-tezgahi':['engine.js','app.js'],
 'bina-ef-al':['data.js','app.js'],'izhar-esrar':['lessons.js','data.js','app.js'],'usul-lafizlar':['lessons.js','data.js','app.js'],
 'maksud-darphanesi':['lessons.js','engine.js','data.js','head.js','views.js'],
 'nefy-terazisi':['engine.js','lessons.js','app.js'],'miras-terazisi':['lessons.js','data.js','engine.js','app.js'],'zaman-makinesi':['engine.js','lessons.js','data.js','app.js'],'yapi-ustasi':['engine.js','lessons1.js','lessons2.js','lessons3.js','lessons4.js','data.js','app.js'],'renkli-cumleler':['engine.js','lessons.js','lessons2.js','data.js','app.js'],'parcacik-atlasi':['data.js','lessons.js','app.js'],'ingilizce':['data.js','app.js']}
fonts=open(os.path.join(K,'fonts.css')).read()
for p in (sys.argv[1:] or ORDER):
    d=os.path.join(K,p);sh=open(os.path.join(d,'shell.html')).read().replace('/*__FONTS__*/',fonts)
    ses=open(os.path.join(K,'ses.js')).read();sj=os.path.join(K,'ses',p+'.json')
    if os.path.exists(sj):
        m=json.load(open(sj,encoding='utf-8'));ses=ses.replace('/*__SES__*/',','.join(json.dumps(k,ensure_ascii=False)+':'+json.dumps(v) for k,v in m.items()))
    js=ses+'\n'+'\n'.join(open(os.path.join(d,f)).read() for f in ORDER[p])
    tmp=os.path.join('/tmp',p+'.check.js');open(tmp,'w').write(js)
    subprocess.run(['node','--check',tmp],check=True)
    out=os.path.join(R,p,'index.html');open(out,'w').write(sh+'\n<script>\n'+js+'\n</script>\n')
    print(p,os.path.getsize(out))
