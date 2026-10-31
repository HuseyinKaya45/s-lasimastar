#!/usr/bin/env python3
"""Binâ Sarayı'ndaki sülâsî mücerred fiillerin (b-S1…S6 ve mu'tel tablolar) masdarlarını el-Arabiyye beyne yedeyk
Sözlük Defteri ile karşılaştırır ve dogrulama/bina-sulasi-masdar-listesi.html üretir.
Kullanım: python3 masdar_kontrol.py <mucem/kaynak klasörü>   (p001.json …)"""
import glob,html,json,os,re,subprocess,sys,collections
D=os.path.dirname(os.path.abspath(__file__));R=os.path.dirname(os.path.dirname(D))
SRC=sys.argv[1] if len(sys.argv)>1 else '/tmp/mucem/mucem/kaynak'
HAR=re.compile('[ً-ْٰـ]')
def sk(w): return re.sub('[أإآٱءؤئ]','ا',HAR.sub('',w)).replace('ى','ي').replace('ة','ه')
def noal(w):
    w=w.replace('اً','').replace('ً','');w=sk(w);return w[2:] if w.startswith('ال') and len(w)>4 else w
def variants(w):
    n=noal(w);v={n}
    if n.endswith('ا') and len(n)>3:v.add(n[:-1])
    if n.startswith('و') and len(n)>3:v|={x[1:] for x in list(v)}
    return v
js="const fs=require('fs');const s=fs.readFileSync(%r,'utf8');const E=new Function(s+';return {ALL_ROWS,SETS};')();console.log(JSON.stringify(E.ALL_ROWS.filter(r=>/^S[1-6]$/.test(r.b)).map(r=>({set:r.set,b:r.b,r:r.r.join(''),f:r.f}))))"%os.path.join(D,'data.js')
rows=json.loads(subprocess.run(['node','-e',js],capture_output=True,text=True,check=True).stdout)
E=[]
for f in sorted(glob.glob(os.path.join(SRC,'p*.json'))):
    E+=[e for e in json.load(open(f,encoding='utf-8')) if isinstance(e,dict) and e.get('k') and e.get('metin')]
idx={}
for e in E:
    head=re.split('[:؛]',e['metin'],maxsplit=1)[0].strip()
    toks=[t for t in re.split(r'[\s،]+',head) if t and t not in('أَوْ','أو')]
    toks=[t for t in toks if not re.match(r'^[\(٠-٩“﴿]',t)]
    if not toks or not toks[0].startswith('ي'):continue          # fiil maddesi değil
    toks=toks[:1]+[t for t in toks[1:6] if len(noal(t))<=9]
    idx.setdefault(sk(e['k']),[]).append({'k':e['k'],'muz':toks[0],'ms':toks[1:],'sayfa':e['sayfa']})
SETN={'b-S1':'1. bâb (Nasara)','b-S2':'2. bâb (Daraba)','b-S3':'3. bâb (Fataha)','b-S4':'4. bâb (Alime)','b-S5':'5. bâb (Kerume)','b-S6':'6. bâb (Hasibe)',
 'm-sahih':'Sahîh (mu\'tel tablosu)','m-misal':'Misâl','m-ecvef':'Ecvef','m-nakis':'Nâkıs','m-lefif':'Lefîf','m-mehmuz':'Mehmûz'}
out=[]
for r in rows:
    mz,mu,em,fa,ms=r['f']
    c=[x for x in idx.get(sk(mz),[]) if not('ّ' in x['k'] and 'ّ' not in mz) and not(x['muz'].startswith('يُ') and mu.startswith('يَ'))]
    same=[x for x in c if sk(x['muz'])==sk(mu)]
    use=same or c
    dm=[];[dm.extend(x['ms']) for x in use]
    dm=[x for i,x in enumerate(dm) if x not in dm[:i]]
    if not c:st='yok'
    elif not dm:st='masdarsiz'
    elif any(variants(ms)&variants(x) for x in dm):st='tam'
    else:st='fark'
    out.append({**r,'durum':st,'muzfark':bool(c) and not same,'dm':dm,'dmuz':[x['muz'] for x in use],'sayfa':sorted({x['sayfa'] for x in use})})
cnt=collections.Counter(o['durum'] for o in out);mf=sum(1 for o in out if o['muzfark'])
LAB={'tam':'✓ sözlükte var','fark':'≠ sözlükte farklı','masdarsiz':'– sözlükte masdar yok','yok':'– fiil sözlükte yok'}
def tr(o,i):
    ar=lambda s:f'<span class="ar">{html.escape(s)}</span>'
    muz=f'{ar(o["dmuz"][0])}' if o['dmuz'] else ''
    mfmark=' <b class="w">muzâri farklı</b>' if o['muzfark'] else ''
    cls={'tam':'ok','fark':'fk','masdarsiz':'yk','yok':'yk'}[o['durum']]
    return f'<tr class="{cls}"><td>{i}</td><td>{SETN.get(o["set"],o["set"])}</td><td>{ar(o["f"][0]+" "+o["f"][1])}</td><td>{ar(o["f"][4])}</td><td>{" ".join(ar(x) for x in o["dm"])}</td><td>{muz}{mfmark}</td><td>{LAB[o["durum"]]}{" · s. "+",".join(map(str,o["sayfa"])) if o["sayfa"] else ""}</td><td></td></tr>'
body=''.join(tr(o,i+1) for i,o in enumerate(out))
page=f'''<!doctype html><meta charset="utf-8"><title>Binâ Sarayı — sülâsî mücerred masdar listesi</title><style>
body{{font:14px/1.5 system-ui,sans-serif;margin:20px;color:#111}}.ar{{font-family:"Noto Naskh Arabic","Traditional Arabic",serif;direction:rtl;font-size:1.25em;margin-left:6px}}
table{{border-collapse:collapse;width:100%}}td,th{{border:1px solid #999;padding:4px 6px;text-align:left;vertical-align:top}}th{{background:#eee}}.w{{color:#b45309;font-size:.8em}}
tr.fk td{{background:#fff4e0}}tr.yk td{{background:#f1f1f1}}@media print{{tr{{break-inside:avoid}}}}</style>
<h1>Binâ Sarayı — sülâsî mücerred fiillerin masdar listesi</h1>
<p>Programdaki {len(out)} sülâsî mücerred fiil (6 bâb tablosu ve mu'tel tabloları), el-Arabiyye beyne yedeyk Sözlük Defteri ile karşılaştırıldı. Karşılaştırma ünsüz iskeletiyle yapıldı (sözlük, uzun ünlüden önceki kısa harekeleri yazmaz). <b>{cnt['tam']}</b> fiilde programdaki masdar sözlükte de var; <b>{cnt['fark']}</b> fiilde sözlük başka biçim veriyor (turuncu: ikisi de doğru olabilir, kontrol et); <b>{cnt['yok']+cnt['masdarsiz']}</b> fiil için sözlükte fiil maddesi ya da masdar bulunamadı (gri); <b>{mf}</b> fiilde sözlükteki muzâri farklı. Sözlükte bulunmayan fiillerin masdarı bu karşılaştırmayla doğrulanmış sayılmaz.</p>
<table><tr><th>#</th><th>Tablo</th><th>Mâzî · Muzâri (program)</th><th>Masdar (program)</th><th>Sözlükteki masdar(lar)</th><th>Sözlükteki muzâri</th><th>Durum</th><th>Düzeltme</th></tr>{body}</table>'''
os.makedirs(os.path.join(R,'dogrulama'),exist_ok=True)
open(os.path.join(R,'dogrulama','bina-sulasi-masdar-listesi.html'),'w',encoding='utf-8').write(page)
print(len(out),dict(cnt),'muzâri farklı:',mf)
