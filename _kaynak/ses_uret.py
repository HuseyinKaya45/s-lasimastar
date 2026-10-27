#!/usr/bin/env python3
"""ses/<program>.txt'teki metinleri Google Cloud Text-to-Speech ile seslendirir:
GOOGLE_TTS_API_KEY=... python3 _kaynak/ses_uret.py [program ...]
Sonuç ses/<program>.json ({metin: base64-mp3}); var olan kayıtlar yeniden üretilmez.
Ses: SES_VOICE (varsayılan ar-XA-Wavenet-B; dil kodu ses adından alınır, ör. en-GB-Neural2-C), hız: SES_HIZ (varsayılan 0.85)."""
import base64,json,os,re,shutil,subprocess,sys,time,unicodedata,urllib.request,urllib.error
K=os.path.dirname(os.path.abspath(__file__));D=os.path.join(K,'ses')
KEY=os.environ.get('GOOGLE_TTS_API_KEY');VOICE=os.environ.get('SES_VOICE','ar-XA-Wavenet-B');HIZ=float(os.environ.get('SES_HIZ','0.85'))
# ses.js içindeki sesKey ile aynı olmalı
def ses_key(t):return re.sub(r'\s+',' ',re.sub('[ـ‍]','',unicodedata.normalize('NFC',t))).strip()
def parcala(t,sinir=1200):
    """API sınırı (5000 bayt) için uzun metni noktalama/boşluktan böler."""
    out=[]
    while len(t)>sinir:
        i=max(t.rfind(c,0,sinir) for c in '.،؛:!؟ ');i=i+1 if i>0 else sinir
        out.append(t[:i].strip());t=t[i:].strip()
    return out+[t] if t else out
def sentez(t):
    body=json.dumps({'input':{'text':t},'voice':{'languageCode':VOICE[:5],'name':VOICE},
        'audioConfig':{'audioEncoding':'MP3','speakingRate':HIZ,'sampleRateHertz':24000}}).encode()
    for n in range(5):
        req=urllib.request.Request('https://texttospeech.googleapis.com/v1/text:synthesize',body,
            {'Content-Type':'application/json','X-Goog-Api-Key':KEY})
        try:return base64.b64decode(json.load(urllib.request.urlopen(req,timeout=60))['audioContent'])
        except urllib.error.HTTPError as e:
            msg=e.read().decode()[:400]
            if e.code in (429,500,503) and n<4:time.sleep(2**n);continue
            sys.exit(f'Google TTS hatası {e.code}: {msg}')
def sikistir(b):
    """Konuşma için 32 kbps tek kanal yeter; ffmpeg yoksa olduğu gibi bırakır."""
    if not shutil.which('ffmpeg'):return b
    return subprocess.run(['ffmpeg','-loglevel','error','-f','mp3','-i','-','-ac','1','-b:a','32k','-f','mp3','-'],input=b,capture_output=True,check=True).stdout
if not KEY:sys.exit('GOOGLE_TTS_API_KEY tanımlı değil')
for p in (sys.argv[1:] or sorted(f[:-4] for f in os.listdir(D) if f.endswith('.txt'))):
    js=os.path.join(D,p+'.json');m=json.load(open(js,encoding='utf-8')) if os.path.exists(js) else {}
    metin=[t for t in dict.fromkeys(ses_key(l) for l in open(os.path.join(D,p+'.txt'),encoding='utf-8')) if t and t not in m]
    for i,t in enumerate(metin,1):
        m[t]=base64.b64encode(sikistir(b''.join(sentez(x) for x in parcala(t)))).decode()
        if i%50==0:json.dump(m,open(js,'w',encoding='utf-8'),ensure_ascii=False);print(p,i,'/',len(metin),flush=True)
    json.dump(m,open(js,'w',encoding='utf-8'),ensure_ascii=False)
    print(p,'yeni',len(metin),'toplam',len(m),'kayıt',sum(len(v) for v in m.values())*3//4//1024,'KB')
