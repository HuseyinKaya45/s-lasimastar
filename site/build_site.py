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
    # üst çubuğa "Diğer programlar" düğmesi (yalnızca yayın sitesinde)
    liste=[{'ad':q['ad'],'yol':f'../{q["id"]}/','bu':q['id']==p['id']} for q in cfg['programlar']]
    if len(liste)>1:
        html+=('\n<script>(function(){var L='+json.dumps(liste,ensure_ascii=False)+';function k(){'
          'var h=document.querySelector(".hud"),sn=document.getElementById("snd");if(!h&&!sn)return;'
          'var b=document.createElement("button");b.type="button";b.className="ib";b.id="digerBtn";b.title="Diğer programlar";b.setAttribute("aria-label","Diğer programlar");b.setAttribute("aria-expanded","false");'
          'b.innerHTML=\'<span aria-hidden="true">▦</span><span class="dl"> Diğer programlar</span>\';'
          'b.style.cssText="width:auto;min-width:34px;height:34px;padding:0 9px;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;gap:4px";'
          'if(h)h.insertBefore(b,h.firstChild);else sn.parentNode.insertBefore(b,sn);'
          'var st=document.createElement("style");st.textContent=".dl{display:none}@media(min-width:1200px){.dl{display:inline}}#digerPanel{position:fixed;z-index:200;min-width:210px;max-width:calc(100vw - 20px);padding:8px;border-radius:14px;border:1px solid rgba(128,128,128,.4);background:var(--panel,#fff);color:var(--ink,#111);box-shadow:0 10px 30px rgba(0,0,0,.25);font:15px/1.4 system-ui,sans-serif}#digerPanel a{display:block;padding:10px 12px;border-radius:10px;color:inherit;text-decoration:none}#digerPanel a:hover,#digerPanel a:focus{background:rgba(128,128,128,.18)}#digerPanel a[aria-current]{opacity:.55;pointer-events:none}#digerPanel hr{border:0;border-top:1px solid rgba(128,128,128,.3);margin:4px 0}";document.head.appendChild(st);'
          'var P=document.createElement("div");P.id="digerPanel";P.hidden=true;P.innerHTML=L.map(function(q){return \'<a href="\'+q.yol+\'"\'+(q.bu?\' aria-current="page"\':\'\')+\'>\'+q.ad+(q.bu?\' (açık)\':\'\')+\'</a>\'}).join("")+\'<hr><a href="../">Bütün programlar</a>\';document.body.appendChild(P);'
          'function kapat(){P.hidden=true;b.setAttribute("aria-expanded","false")}'
          'b.addEventListener("click",function(e){e.stopPropagation();if(!P.hidden){kapat();return}var r=b.getBoundingClientRect();P.style.top=(r.bottom+6)+"px";P.style.right=Math.max(10,innerWidth-r.right)+"px";P.hidden=false;b.setAttribute("aria-expanded","true")});'
          'document.addEventListener("click",function(e){if(!P.contains(e.target))kapat()});document.addEventListener("keydown",function(e){if(e.key==="Escape")kapat()});'
          '}if(document.readyState==="loading")addEventListener("DOMContentLoaded",k);else k();})()</script>\n')
    # diğer programlara bağlantı şeridi (yalnızca yayın sitesinde; tek dosya olarak paylaşılan sürümde görünmez)
    diger=[q for q in cfg['programlar'] if q['id']!=p['id']]
    if diger:
        bag=' · '.join(f'<a href="../{q["id"]}/" style="color:inherit;font-weight:600">{q["ad"]}</a>' for q in diger)
        html+=(f'\n<nav aria-label="Diğer programlar" style="max-width:760px;margin:28px auto 24px;padding:14px 16px;border-top:1px solid rgba(128,128,128,.35);'
               f'text-align:center;font:15px/1.7 system-ui,sans-serif;color:inherit;opacity:.9">İlim Atölyesi’ndeki diğer programlar: {bag} · '
               f'<a href="../" style="color:inherit">Hepsi</a></nav>\n')
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
