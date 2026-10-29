#!/usr/bin/env python3
"""Yayın sitesini (_site/) üretir: python3 site/build_site.py
programs.json'daki her program klasörden kopyalanır; manifest, çevrimdışı önbellek (service worker) ve
ana ekrana eklenebilirlik için gerekli etiketler eklenir. Yeni program eklemek için programs.json'a bir satır yazmak yeter."""
import hashlib,json,os,re,shutil,sys
D=os.path.dirname(os.path.abspath(__file__));R=os.path.dirname(D);OUT=os.path.join(R,'_site')
cfg=json.load(open(os.path.join(D,'programs.json'),encoding='utf-8'));S=cfg['site']
shutil.rmtree(OUT,ignore_errors=True);os.makedirs(OUT)
def cp(src,dst):os.makedirs(os.path.dirname(dst),exist_ok=True);shutil.copyfile(src,dst)
def sha(b):return hashlib.sha1(b).hexdigest()[:10]
def manifest(ad,kisa,renk,bg,ide):
    return json.dumps({'name':ad,'short_name':kisa,'lang':'tr','start_url':'./','scope':'./','display':'standalone','orientation':'any',
        'theme_color':renk,'background_color':bg,'icons':[{'src':'icon-192.png','sizes':'192x192','type':'image/png'},{'src':'icon-512.png','sizes':'512x512','type':'image/png'},
        {'src':'icon-maskable-512.png','sizes':'512x512','type':'image/png','purpose':'maskable'}]},ensure_ascii=False,indent=1)
def ikonlar(id,hedef):
    for a,b in (('192','icon-192.png'),('512','icon-512.png'),('180','icon-180.png'),('maskable-512','icon-maskable-512.png')):
        cp(os.path.join(D,'icons',f'{id}-{a}.png'),os.path.join(hedef,b))
sur={}
# --- programlar
for p in cfg['programlar']:
    src=os.path.join(R,p['klasor'],'index.html');html=open(src,encoding='utf-8').read();hedef=os.path.join(OUT,p['id'])
    os.makedirs(hedef);ikonlar(p['id'],hedef)
    ek=(f'<link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="icon-180.png">'
        f'<meta name="theme-color" content="{p["renk"]}"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">'
        f'<meta name="apple-mobile-web-app-title" content="{p["ad"]}">')
    m=re.search(r'<meta charset="utf-8">',html,re.I)
    html=html[:m.end()]+ek+html[m.end():] if m else ek+html
    html+='\n<script>if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("../sw.js").catch(()=>{}))</script>\n'
    b=html.encode('utf-8');open(os.path.join(hedef,'index.html'),'wb').write(b);sur[p['id']]=sha(b)
    open(os.path.join(hedef,'manifest.webmanifest'),'w',encoding='utf-8').write(manifest(p['ad'],p.get('kisa',p['ad']),p['renk'],p['ikon']['bg'],p['id']))
# --- portal
kartlar=''.join(f'''<article class="kart" style="--r:{p['renk']}"><img src="{p['id']}/icon-192.png" alt="" width="64" height="64"><div><h2>{p['ad']}</h2><div class="ar">{p.get('arapca','')}</div><p>{p['aciklama']}</p>
<div class="satir"><a class="btn" href="{p['id']}/">Aç</a><button class="btn ikincil" data-hazir="{p['id']}">Çevrimdışı hazırla</button><button class="btn ikincil" data-paylas="{p['id']}" data-ad="{p['ad']}">Paylaş</button></div><div class="dur" id="d-{p['id']}"></div></div></article>''' for p in cfg['programlar'])
portal=open(os.path.join(D,'portal.html'),encoding='utf-8').read()
for k,v in {'__BASLIK__':S['baslik'],'__ALT__':S['alt'],'__KREDI__':S['kredi'],'__DUA__':S['dua'],'__RENK__':S['renk'],'__KARTLAR__':kartlar,'__IDLER__':json.dumps([p['id'] for p in cfg['programlar']])}.items():portal=portal.replace(k,v)
b=portal.encode('utf-8');open(os.path.join(OUT,'index.html'),'wb').write(b);sur['portal']=sha(b)
ikonlar('portal',OUT)
open(os.path.join(OUT,'manifest.webmanifest'),'w',encoding='utf-8').write(manifest(S['baslik'],S['baslik'],S['renk'],S['ikon']['bg'],'portal'))
# --- service worker (tek, kökte; program başına ayrı önbellek: biri değişince diğerleri yeniden inmez)
sw=open(os.path.join(D,'sw.js'),encoding='utf-8').read().replace('__SURUMLER__',json.dumps(sur))
open(os.path.join(OUT,'sw.js'),'w',encoding='utf-8').write(sw)
open(os.path.join(OUT,'.nojekyll'),'w').write('')
print('site:',{k:v for k,v in sur.items()},sum(os.path.getsize(os.path.join(a,f)) for a,_,fs in os.walk(OUT) for f in fs)//1024,'KB')
