# Export segmented posts to the reader site: images (webp), data.js
import json, os, re, sys, collections
import numpy as np
from PIL import Image

S=os.path.dirname(os.path.abspath(__file__))
OUT='/home/user/s-lasimastar/okuyucu'
# chronological file order (oldest first); within a file the LAST page is oldest
FILES=[('k1','Rakam 1'),('k2','Rakam 2'),('k3','Rakam 3'),('k4','Rakam 4'),
       ('m5b','Rakam 5 B'),('m5a','Rakam 5 A'),('m6b','Rakam 6 B'),('m6a','Rakam 6 A'),
       ('m7','Rakam 7'),('m8b','Rakam 8 B'),('m8a','Rakam 8 A'),('r9','Rakam 9'),
       ('n10b','Rakam 10 B'),('n10a','Rakam 10 A'),('n11','Rakam 11'),('n12','Rakam 12'),
       ('n13','Rakam 13'),('n14','Rakam 14'),('n15','Rakam 15'),('p16','Rakam 16'),
       ('p17','Rakam 17'),('p18','Rakam 18'),('p19','Rakam 19'),('p20','Rakam 20'),
       ('q21','Rakam 21'),('q22','Rakam 22'),('r23','Rakam 23'),('r24','Rakam 24'),
       ('b2','20 Kasım 51-96'),('root','20 Kasım 1-50')]
MAXW=760; Q=58

TAGS=[('Âhir zaman',['mehdi','deccâl','deccal','âhir zaman','melhame','duman âyeti','kıyamet','süfyânî','kahtânî','ye\'cûc','tarihin sonu','son devir']),
 ('Rüyalar',['rüya']),
 ('Nefis ve kalp',['nefis','nefs','kalp','kalb','karîn','huşû','sabır','takvâ','sülûk','ihlâs','tevekkül']),
 ('Aile ve evlilik',['evlilik','evlen','koca','boşan','çocuk','anne','baba','mehir','nişan','eşi','aile']),
 ('Siyaset ve dünya',['amerika','çin','rusya','avrupa','savaş','devlet','trump','batı','nato','ortadoğu','iran','suriye','sudan','mısır','türk']),
 ('Ekonomi ve rızık',['altın','dolar','kapitalizm','para','faiz','ekonomi','rızık','zengin','fakir','sadaka','zekât','ticaret']),
 ('Âyet ve hadis',['hadis','rivayet','(s.a.v.) şöyle buyur','sûre','âyet','sahîh','müslim rivayet','buhârî']),
 ('Kudüs ve Filistin',['kudüs','gazze','filistin','aksâ','beytü\'l-makdis','makdis']),
 ('Toplum ve ahlâk',['zulüm','zalim','haset','kibir','ahlâk','toplum','gıybet','adalet','münafık']),
 ('İlim ve teknoloji',['yapay zekâ','teknoloji','internet','bilim','üniversite','eğitim','okul','sanayi']),
 ('Kanal ve takipçiler',['kanal','yorum','takipçi','paylaşım','youtube'])]

GLOSS=[
 ('âhir zaman','Kıyametten önceki son dönem; büyük alâmetlerin görüleceği bildirilen zaman.'),
 ('Melhame','Hadislerde âhir zamanda olacağı bildirilen çok büyük savaş (Melhame-i Kübrâ).'),
 ('Deccâl','Kıyamete yakın çıkacağı bildirilen, insanları aldatacak büyük yalancı. Küçük harfle: aldatıcı kimse.'),
 ('Mehdi','Âhir zamanda geleceği bildirilen, adaleti hâkim kılacak önder.'),
 ('Süfyânî','Rivayetlerde âhir zamanda Şam taraflarında çıkacağı anılan zalim kişi.'),
 ('Kahtânî','Hadislerde âhir zamanda çıkacağı bildirilen Kahtân soyundan bir önder.'),
 ('istibdâl','Değiştirilme: Allah\'ın, görevini yapmayan bir topluluğun yerine başkasını getirmesi (bkz. Muhammed 38).'),
 ('temkîn','Yeryüzünde güç, imkân ve iktidar sahibi kılınma.'),
 ('tedâfü','Allah\'ın insanları birbiriyle savması, dengelemesi (bkz. Bakara 251).'),
 ('karîn','İnsana eşlik eden ve vesvese veren cin/şeytan yoldaş.'),
 ('emmâre','Nefs-i emmâre: kötülüğü ısrarla emreden nefis.'),
 ('sülûk','Allah\'a yaklaşmak için tutulan manevî yol; o yolda ilerlemek.'),
 ('sâlik','Sülûk eden, manevî yolda ilerleyen kimse.'),
 ('takvâ','Allah\'a karşı sorumluluk bilinci; O\'na saygıdan dolayı günahtan sakınma.'),
 ('huşû','Kalbin Allah karşısında saygıyla ürpermesi ve boyun eğmesi.'),
 ('tevfik','Allah\'ın kulunu doğruya ve başarıya ulaştırması.'),
 ('istidrâc','Günahına rağmen kişiye nimet verilerek adım adım helâke yaklaştırılması.'),
 ('meşîet','Allah\'ın dilemesi, iradesi.'),
 ('keramet','Allah\'ın velî kullarında gösterdiği olağanüstü hal.'),
 ('mucize','Peygamberlerin, peygamberliklerini ispat için Allah\'ın izniyle gösterdiği olağanüstü olay.'),
 ('velî','Allah dostu; O\'na yakın, sâlih kul.'),
 ('firâset','Allah\'ın verdiği sezgi ve kavrayışla işin iç yüzünü görebilme.'),
 ('vesvese','Şeytanın veya nefsin kalbe attığı kötü, kuşkulu düşünce.'),
 ('rukye','Âyet ve dualar okuyarak şifa dileme.'),
 ('fitne','İmtihan; insanı dinden ve doğrudan saptıran karışıklık, bozgunculuk.'),
 ('tâğut','Allah\'a karşı azgınlaşan ve O\'nun yerine itaat edilen her güç.'),
 ('mustaz\'af','Güçsüz bırakılmış, ezilen kimse.'),
 ('raiyye','Yönetilenler; bir yöneticinin sorumluluğu altındaki halk.'),
 ('biat','Bir yöneticiye bağlılık sözü verme.'),
 ('hilâfet','Hz. Peygamber\'den sonra Müslümanların yönetimi; ayrıca insanın yeryüzündeki vekilliği.'),
 ('Ensar','Hz. Peygamber\'e ve Mekkeli Müslümanlara kucak açan Medineli Müslümanlar.'),
 ('Muhacir','Mekke\'den Medine\'ye hicret eden Müslümanlar.'),
 ('sahâb','Hz. Peygamber\'i Müslüman olarak görüp o hal üzere vefat eden kimseler.'),
 ('isnad','Bir hadisi nakledenlerin zinciri (sened).'),
 ('rivayet','Bir sözün veya haberin nakledilmesi; nakledilen haber.'),
 ('sıhâhan','Hadiste geçen kelime: malın insanlar arasında eşit olarak dağıtılması.'),
 ('nasb','Hz. Ali\'ye ve Ehl-i Beyt\'e düşmanlık besleme.'),
 ('velâ','Allah için dostluk ve bağlılık.'),
 ('berâ','Allah için uzak durma, ilişiği kesme.'),
 ('tefsir','Kur\'an âyetlerinin açıklanması.'),
 ('fıkıh','İslâm hukuku; ibadet ve muamelelere dair hükümleri inceleyen ilim.'),
 ('müçtehid','Delillerden hüküm çıkarma ehliyetine sahip âlim.'),
 ('tevhid','Allah\'ı birlemek; O\'ndan başka ilâh olmadığına inanmak.'),
 ('ümmet','Bir peygambere inanan topluluk; Müslümanların bütünü.'),
 ('Beytü\'l-Makdis','Kudüs ve Mescid-i Aksâ\'nın bulunduğu mukaddes belde.'),
 ('Zülkarneyn','Kur\'an\'da (Kehf sûresi) kıssası anlatılan, doğuya ve batıya sefer yapan âdil hükümdar.'),
 ('mehir','Evlenirken erkeğin kadına verdiği veya vermeyi üstlendiği mal.'),
 ('umrâ','Bir malı, birine ömrü boyunca kullanması için verme.'),
 ('hibe','Karşılıksız bağış.'),
 ('cühûd','Hakikati bildiği halde inkâr etme.'),
 ('mütref','Refah içinde şımarmış, nimetle azmış kimse.'),
 ('şatahat','Vecd halinde söylenen, zâhiri dine aykırı görünen sözler.'),
 ('ferec','Sıkıntıdan sonra gelen ferahlık ve kurtuluş. “Ferec” aynı zamanda kanalın adında geçen isimdir.'),
 ('hicrî','Hz. Peygamber\'in hicretini başlangıç alan takvime göre.'),
 ('mürted','Dinden dönen kimse.'),
 ('gayb','Duyularla ve akılla bilinemeyen, ancak Allah\'ın bildirmesiyle bilinen âlem.'),
 ('ıslah','Düzeltme, iyileştirme; bozulanı onarma.'),
 ('ifsat','Bozma, bozgunculuk çıkarma.'),
 ('sâlih','Dinin emirlerine uygun yaşayan iyi kimse; iyi ve yararlı (amel).'),
]

def tlow(s):
    return s.replace('I','ı').replace('İ','i').lower()
FOLD=str.maketrans('âîûêôÂÎÛ’‘','aiueoAIU\'\'')
def norm(s):
    s=tlow(s).translate(FOLD)
    return re.sub(r'[^a-zçğıöşü0-9]+',' ',s).strip()

def yellowish(im):
    a=np.asarray(im.resize((32,32))).astype(int)
    r,g,b=a[...,0],a[...,1],a[...,2]
    return float(((r>200)&(g>170)&(b<140)).mean())>0.45

def ahash(im):
    a=np.asarray(im.convert('L').resize((24,24),Image.BILINEAR)).astype(float)
    return (a>a.mean()).flatten()

def main():
    os.makedirs(OUT+'/img',exist_ok=True)
    posts=[]; raw={}
    only=os.environ.get('SITE_ONLY')
    for fi,(key,title) in enumerate(FILES):
        if only and key not in only.split(','): continue
        d=os.path.join(S,key)
        P=json.load(open(d+'/posts.json',encoding='utf8'))
        raw[title]=[e for po in P for e in po['ent']]
        os.makedirs(f'{OUT}/img/{key}',exist_ok=True)
        cache={}
        def page(p):
            if p not in cache:
                cache.clear(); cache[p]=Image.open(f'{d}/full/im-{p:02d}.jpg').convert('RGB')
            return cache[p]
        fileposts=[]; n=0
        for po in P:
            hasimg=any(sg['im'] for sg in po['segs'])
            if not po['ent'] and not hasimg: continue
            total=sum(sg['y1']-sg['y0'] for sg in po['segs'])
            if not po['ent'] and total<200: continue
            segs=[]; blocks=[]; hashes=[]
            for si,sg in enumerate(po['segs']):
                full=page(sg['p'])
                x0=max(sg['x0']-2,0); x1=min(sg['x1']+3,full.width); y0=sg['y0']; y1=sg['y1']
                crop=full.crop((x0,y0,x1,y1))
                w=x1-x0; hgt=y1-y0; sc=min(1.0,MAXW/w)
                small=crop.resize((max(1,round(w*sc)),max(1,round(hgt*sc))),Image.LANCZOS) if sc<1 else crop
                n+=1; url=f'img/{key}/{n}.webp'
                small.save(f'{OUT}/{url}','WEBP',quality=Q,method=4)
                segs.append({'u':url,'w':small.width,'h':small.height})
                items=[('t',e['y'],e) for e in po['ent'] if e['p']==sg['p'] and e['k']=='t']
                heads=[e for e in po['ent'] if e['p']==sg['p'] and e['k']=='h']
                used=set()
                for r in sg['im']:
                    cap=None
                    for hi,e in enumerate(heads):
                        if r[1]-5<=e['y']<=r[3]+5 and hi not in used: cap=e['s']; used.add(hi); break
                    items.append(('i',r[1],(r,cap)))
                for hi,e in enumerate(heads):
                    if hi not in used: items.append(('t',e['y'],e))
                items.sort(key=lambda z:z[1])
                for kind,_,v in items:
                    if kind=='t': blocks.append({'t':'p','x':v['s']})
                    else:
                        r,cap=v
                        rc=full.crop((r[0],r[1],r[2],r[3]))
                        b={'t':'i','s':si,'r':[round((r[0]-x0)/w,4),round((r[1]-y0)/hgt,4),round((r[2]-r[0])/w,4),round((r[3]-r[1])/hgt,4)],'a':round((r[2]-r[0])/max(1,(r[3]-r[1])),3)}
                        if cap: b['c']=cap
                        if r[1]-y0<=14 and si>0 and blocks and blocks[-1]['t']=='i' and blocks[-1].get('_bot') and blocks[-1]['s']==si-1: b['j']=1
                        if y1-r[3]<=14: b['_bot']=1
                        if yellowish(rc): b['y']=1
                        whole=(r[1]-y0>12 and y1-r[3]>12)
                        if whole and r[3]-r[1]>200: hashes.append(ahash(rc))
                        blocks.append(b)
            for b in blocks:
                b.pop('_bot',None)
            # a headline written on the second half of a split picture belongs to the whole picture
            for bi2 in range(1,len(blocks)):
                if blocks[bi2].get('j') and blocks[bi2].get('c') and not blocks[bi2-1].get('c') and blocks[bi2-1].get('y')==blocks[bi2].get('y'):
                    pass
            text=' '.join((b.get('x') or b.get('c') or '') for b in blocks)
            low=tlow(text)
            tags=[i for i,(nm,kws) in enumerate(TAGS) if any(k in low for k in kws)]
            fileposts.append({'f':fi,'pg':po['segs'][0]['p'],'b':blocks,'s':segs,'tg':tags,'_h':hashes,'_n':norm(text),'id':f"{key}-{po['segs'][0]['p']}-{po['segs'][0]['y0']}"})
        fileposts.reverse()          # last page / bottom of page is oldest
        posts+=fileposts
        print(key,len(fileposts),'posts',n,'images',flush=True)
    # duplicates: same text, or near-identical complete image + similar text
    seen_text={}; H=[]; owners=[]
    dups=0
    for i,po in enumerate(posts):
        po['n']=i+1
        d=None
        if len(po['_n'])>40 and po['_n'] in seen_text: d=seen_text[po['_n']]
        if d is None and po['_h'] and H:
            A=np.array(H); toks=set(po['_n'].split())
            for hv in po['_h']:
                dist=(A!=hv).sum(axis=1)
                for j in np.where(dist<=20)[0]:
                    o=posts[owners[j]]; ot=set(o['_n'].split())
                    if not toks and not ot: d=owners[j]; break
                    if toks and ot and len(toks&ot)/len(toks|ot)>=0.3: d=owners[j]; break
                if d is not None: break
        if d is not None:
            po['d']=posts[d]['n']; dups+=1
        else:
            if len(po['_n'])>40: seen_text[po['_n']]=i
            for hv in po['_h']: H.append(hv); owners.append(i)
    for po in posts:
        del po['_h'],po['_n']
    data={'files':[t for _,t in FILES],'tags':[t for t,_ in TAGS],'gloss':GLOSS,'posts':posts}
    with open(OUT+'/data.js','w',encoding='utf8') as f:
        f.write('window.DATA='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';')
    os.makedirs(OUT+'/veri',exist_ok=True)
    json.dump(raw,open(OUT+'/veri/ceviriler.json','w',encoding='utf8'),ensure_ascii=False,indent=0)
    print('posts',len(posts),'dups',dups)

if __name__=='__main__': main()
