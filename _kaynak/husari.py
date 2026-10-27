#!/usr/bin/env python3
"""Programlardaki âyet metinlerinin sesini Mahmûd Halîl el-Husarî'nin (murattal) okuyuşundan kırpar.
python3 _kaynak/husari.py [program ...]
ses/<program>.txt'teki her metin Kur'ân'da kelime kelime aranır; metnin tamamı âyet(ler)den
oluşuyorsa (“…” ile atlanan yerler olabilir) quran.com kelime zamanlamalarıyla sûre kaydından
tam o kelimeler kesilir ve ses/<program>.json'daki kayıt (makine sesi) bunlarla değiştirilir.
Ne değiştiği ses/husari.log'a yazılır. Önbellek: HUSARI_CACHE (varsayılan ~/.cache/husari)."""
import base64,json,os,re,subprocess,sys,unicodedata,urllib.request
K=os.path.dirname(os.path.abspath(__file__));D=os.path.join(K,'ses')
C=os.environ.get('HUSARI_CACHE',os.path.expanduser('~/.cache/husari'));os.makedirs(C,exist_ok=True)
REC=6  # quran.com: Mahmoud Khalil Al-Husary, Murattal
def ses_key(t):return re.sub(r'\s+',' ',re.sub('[ـ‍]','',unicodedata.normalize('NFC',t))).strip()
def get(url,path,json_=True):
    if not os.path.exists(path):
        r=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=300).read()
        open(path,'wb').write(r)
    return json.load(open(path,encoding='utf-8')) if json_ else path
HAR=re.compile('[ؐ-ًؚ-ٰٟۖ-ۭـ‍]')
def norm(w):
    w=HAR.sub('',unicodedata.normalize('NFC',w))
    w=re.sub('[أإآٱ]','ا',w).replace('ى','ي').replace('ة','ه').replace('ؤ','و').replace('ئ','ي').replace('ء','')
    return re.sub('[^ء-ي]','',w)
def words(t):return [x for x in (norm(w) for w in t.split()) if x]
# Kur'ân kelime dizisi: (sûre, âyet, kelime sırası)
Q=get('https://api.quran.com/api/v4/quran/verses/imlaei',os.path.join(C,'imlaei.json'))['verses']
TOK=[];REF=[]
for v in Q:
    s,a=map(int,v['verse_key'].split(':'));i=0
    for w in v['text_imlaei'].split():
        n=norm(w)
        if n:i+=1;TOK.append(n);REF.append((s,a,i))
IDX={}
for i,t in enumerate(TOK):IDX.setdefault(t,[]).append(i)
def bul(ws):
    """ws kelimelerinin Kur'ân'da (tek sûre içinde) art arda geçtiği bütün yerler → [(başlangıç, bitiş)]"""
    return [(i,i+len(ws)-1) for i in IDX.get(ws[0],[]) if TOK[i:i+len(ws)]==ws and REF[i][0]==REF[i+len(ws)-1][0]]
def parcala(t):
    """Metni “…” yerlerinden böler; her parça âyet olmalı. Değilse None."""
    t=re.sub(r'[«»“”"()\[\]﴾﴿{}]',' ',t)
    out=[]
    for p in re.split(r'…|\.\.\.',t):
        ws=words(p)
        if not ws:continue
        r=bul(ws)
        if not r:return None
        out.append(r)
    return out if out and sum(r[0][1]-r[0][0]+1 for r in out)>=3 else None
SEG={}
def sure(s):
    if s not in SEG:
        d=get(f'https://api.qurancdn.com/api/qdc/audio/reciters/{REC}/audio_files?chapter={s}&segments=true',os.path.join(C,f'seg{s}.json'))['audio_files'][0]
        mp3=get(d['audio_url'],os.path.join(C,f'{s}.mp3'),False)
        vt={int(x['verse_key'].split(':')[1]):x for x in d['verse_timings']}
        SEG[s]=(mp3,vt)
    return SEG[s]
def zaman(s,a,i):
    _,vt=sure(s);v=vt[a];seg={int(x[0]):(x[1],x[2]) for x in v['segments'] if len(x)>=3}
    return seg.get(i),v
def kes(r):
    (s,a1,i1),(_,a2,i2)=REF[r[0]],REF[r[1]];mp3,vt=sure(s)
    w1,v1=zaman(s,a1,i1);w2,v2=zaman(s,a2,i2)
    bas=w1[0] if w1 else v1['timestamp_from']
    if w2:
        nx,_=zaman(s,a2,i2+1);son=min(w2[1]+450,nx[0]) if nx else min(w2[1]+700,v2['timestamp_to'])
    else:son=v2['timestamp_to']
    bas=max(0,bas-60)
    return mp3,bas/1000,son/1000,f'{s}:{a1}' + (f'/{i1}-{i2}' if a1==a2 else f'/{i1}–{a2}/{i2}')
def ses(parts):
    fs=[];refs=[]
    for k,r in enumerate(parts):
        mp3,b,e,ref=kes(r);refs.append(ref);d=e-b
        o=os.path.join(C,f'_p{k}.wav')
        subprocess.run(['ffmpeg','-y','-loglevel','error','-ss',f'{b:.3f}','-t',f'{d:.3f}','-i',mp3,'-ac','1','-ar','44100',
            '-af',f'afade=t=in:d=0.04,afade=t=out:st={max(0,d-0.12):.3f}:d=0.12',o],check=True);fs.append(o)
    if len(fs)>1:
        sil=os.path.join(C,'_sil.wav');subprocess.run(['ffmpeg','-y','-loglevel','error','-f','lavfi','-i','anullsrc=r=44100:cl=mono','-t','0.5',sil],check=True)
        lst=os.path.join(C,'_l.txt');open(lst,'w').write(''.join(f"file '{f}'\nfile '{sil}'\n" for f in fs[:-1])+f"file '{fs[-1]}'\n")
        src=['-f','concat','-safe','0','-i',lst]
    else:src=['-i',fs[0]]
    b=subprocess.run(['ffmpeg','-loglevel','error',*src,'-ac','1','-b:a','48k','-f','mp3','-'],capture_output=True,check=True).stdout
    return base64.b64encode(b).decode(),' + '.join(refs)
log=open(os.path.join(D,'husari.log'),'a',encoding='utf-8')
PR=sys.argv[1:] or sorted(f[:-4] for f in os.listdir(D) if f.endswith('.txt'))
J={};IS=[]
for p in PR:
    js=os.path.join(D,p+'.json')
    if not os.path.exists(js):continue
    J[p]=json.load(open(js,encoding='utf-8'))
    for t in dict.fromkeys(ses_key(l) for l in open(os.path.join(D,p+'.txt'),encoding='utf-8')):
        parts=parcala(t) if t else None
        if parts:IS.append((p,t,parts))
# aynı ifade birden çok yerde geçiyorsa programın en çok alıntı yaptığı sûreyi seç
for p in J:
    say={}
    for q,t,parts in IS:
        if q==p:
            for c in parts:
                if len(c)==1:say[REF[c[0][0]][0]]=say.get(REF[c[0][0]][0],0)+1
    IS=[(q,t,[max(c,key=lambda r:say.get(REF[r[0]][0],0)) if q==p else c for c in parts]) if q==p else (q,t,parts) for q,t,parts in IS]
if os.environ.get('DRY'):
    for p,t,parts in IS:print(p,[REF[a]+REF[b] for a,b in parts],t[:70])
    sys.exit()
# sûre sırasıyla işle; her sûre kaydı işi bitince silinir (disk)
IS.sort(key=lambda x:REF[x[2][0][0]][0]);done={};n={}
for k,(p,t,parts) in enumerate(IS):
    if t not in done:
        try:done[t]=ses(parts)
        except Exception as e:print(p,'HATA',t[:40],e,file=sys.stderr);continue
    J[p][t],ref=done[t];n[p]=n.get(p,0)+1;log.write(f'{p}\t{ref}\t{t}\n')
    ss={REF[a][0] for a,b in parts}
    later={REF[a][0] for x in IS[k+1:] for a,b in x[2]}
    for s_ in ss-later:
        f=os.path.join(C,f'{s_}.mp3')
        if os.path.exists(f):os.remove(f)
for p in n:json.dump(J[p],open(os.path.join(D,p+'.json'),'w',encoding='utf-8'),ensure_ascii=False);print(p,'Husarî',n[p])
