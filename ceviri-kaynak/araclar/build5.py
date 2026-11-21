import sys, io, json, glob
D,TITLE=sys.argv[1],sys.argv[2]
BIG=tuple(x for x in (9.5,9.0,8.5,8.0) if x<=float(sys.argv[3])) if len(sys.argv)>3 else ()
COLS={int(k):v for k,v in json.load(open(D+'/cols.json')).items()}
TXS={int(k):v for k,v in json.load(open(D+'/tx.json')).items()}
E=[]
def t(p,y,s): E.append((p,y,'t',s.strip()))
def h(p,y,s): E.append((p,y,'h',s.strip()))
for f in sorted(glob.glob(D+'/data*.py')):
    src_=open(f).read().replace("E=[]","").replace("def t(p,y,s): E.append((p,y,'t',s.strip()))","").replace("def h(p,y,s): E.append((p,y,'h',s.strip()))","")
    exec(src_)
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from xml.sax.saxutils import escape
from fontTools.ttLib import TTFont as FT
from PIL import Image, ImageFilter, ImageEnhance
F='/usr/share/fonts/truetype/'
pdfmetrics.registerFont(TTFont('L',F+'liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('DV',F+'dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('A1','fonts/bs.ttf'))
pdfmetrics.registerFont(TTFont('A2','fonts/berkshire-swash-latin-ext.ttf'))
CM1=FT('fonts/bs.ttf').getBestCmap()
def runs(s):
    s=''.join(ch for ch in s if ord(ch)<0x1F000)
    out=[]
    for ch in s:
        f='A1' if ord(ch) in CM1 else 'A2'
        if out and out[-1][0]==f: out[-1][1]+=ch
        else: out.append([f,ch])
    return out
def aw(s,size): return sum(pdfmetrics.stringWidth(t,f,size) for f,t in runs(s))
def adraw(c,x,y,s,size):
    for f,t in runs(s):
        c.setFont(f,size); c.drawString(x,y,t); x+=pdfmetrics.stringWidth(t,f,size)
def awrap(s,size,width):
    lines=[];cur=''
    for w in s.split():
        t=(cur+' '+w).strip()
        if aw(t,size)<=width or not cur: cur=t
        else: lines.append(cur); cur=w
    if cur: lines.append(cur)
    return lines
def afit(s,width,height,maxsize=30,minsize=7):
    size=maxsize
    while size>minsize:
        ls=awrap(s,size,width)
        if len(ls)*size*1.22<=height and all(aw(l,size)<=width for l in ls): return size,ls
        size-=0.5
    return size,awrap(s,size,width)
def acenter(c,cx,cy,lines,size,fill,shadow=True):
    lead=size*1.22; y=cy+lead*len(lines)/2-size*0.82
    for l in lines:
        x=cx-aw(l,size)/2
        if shadow:
            c.setFillColor('#000000'); c.setFillAlpha(0.75)
            for dx,dy in ((0.9,-0.9),(-0.5,-0.5),(0.5,0.5)): adraw(c,x+dx,y+dy,l,size)
            c.setFillAlpha(1)
        c.setFillColor(fill); adraw(c,x,y,l,size); y-=lead
PX=72/240.0
src=PdfReader(D+'/in/src.pdf')
W0=float(src.pages[0].mediabox.width); H=float(src.pages[0].mediabox.height)
MAXW=max(v[1]-v[0] for v in COLS.values())*PX; WN=W0+MAXW+60
import numpy as _np
BOTTOM=H-6
R={int(k):v for k,v in json.load(open(D+'/rects.json')).items()}
def conv(s):
    s=escape(s).replace('ﷺ','(s.a.v.)').replace('﴿','{').replace('﴾','}')
    s=s.replace('🟥','<font name="DV" color="#d93025">■</font>').replace('🟩','<font name="DV" color="#1e9e4a">■</font>').replace('🔴','<font name="DV" color="#d93025">●</font>').replace('🟢','<font name="DV" color="#1e9e4a">●</font>').replace('🚫','<font name="DV" color="#d93025">⊘</font>')
    s=''.join(ch for ch in s if ord(ch)<0x1F000)
    return s
def tblock(text,size,width):
    st=ParagraphStyle('t',fontName='L',fontSize=size,leading=size*1.42,textColor='#0f0f0f')
    items=[];h=0
    for line in text.split('\n'):
        if not line.strip(): items.append((None,size*1.0)); h+=size*1.0; continue
        p=Paragraph(conv(line),st); _,ph=p.wrap(width,10000); items.append((p,ph)); h+=ph
    return items,h
out=PdfWriter(); report=[]; NOCARD=[]
for pn,page in enumerate(src.pages,1):
    CX0,CX1=COLS[pn]; TXA,TXB=TXS[pn]
    CARDW=(CX1-CX0)*PX; TX_IN=(TXA-CX0)*PX; TW=(TXB-TXA)*PX
    _a=_np.asarray(Image.open(f'{D}/full/im-{pn:02d}.jpg').convert('L'))
    _c=(_a<245).mean(axis=0)>0.02
    _out=int(_c[:max(CX0-30,0)].sum()+_c[CX1+30:].sum())
    WIDEPG=_out>80                      # page has content outside the post column (channel header etc.)
    if WIDEPG: X0=W0+6; LEFT=0.0
    else: X0=CX1*PX+12; LEFT=max(CX0*PX-10,0.0)
    RIGHT=X0+CARDW+10
    ents=[]
    for (_,y,k,s) in E:
        if _!=pn: continue
        if k=='h':
            reg=[r for r in R[pn] if r[1]<=y<=r[3]]
            if reg: ents.append((reg[0][1],'card',s,reg[0]))
            else: ents.append((y,'t',s,None)); NOCARD.append((pn,y))
        else: ents.append((y,'t',s,None))
    ents.sort(key=lambda e:e[0])
    full=Image.open(f'{D}/full/im-{pn:02d}.jpg').convert('RGB')
    buf=io.BytesIO(); c=canvas.Canvas(buf,pagesize=(WN,H))
    c.setStrokeColor('#e5e5e5'); c.setLineWidth(0.6); c.line(X0-5,20,X0-5,H-20)
    cur=0
    for i,(y,k,s,reg) in enumerate(ents):
        if k=='t':
            top=y*PX-7
            lim=BOTTOM
            for e2 in ents[i+1:]:
                if e2[1] in('t','card'): lim=e2[0]*PX-(11 if e2[1]=='t' else 5); break
            floor=max(cur,top-60)
            avail=lim-floor
            choice=None
            for width,xin,sizes in ((TW,TX_IN,BIG+(7.5,7.2,6.9)),(CARDW-16,8,(7.5,7.2,6.9,6.6,6.3,6.0,5.7,5.4,5.1,4.8))):
                for size in sizes:
                    items,hh=tblock(s,size,width)
                    if hh<=avail: choice=(items,hh,size,width,xin); break
                if choice: break
            if choice is None: choice=(items,hh,size,width,xin)
            start=max(floor,min(top,lim-choice[1]))
            items,hh,size,width,xin=choice
            if hh>avail+0.5 or size<6.3: report.append((pn,y,size,round(hh),round(avail)))
            yy=start
            for p,ph in items:
                if p: p.drawOn(c,X0+xin,H-yy-ph)
                yy+=ph
            cur=yy+3
        elif k=='title':
            size,ls=afit(s,TW,40,22)
            acenter(c,X0+TX_IN+TW/2,H-y*PX,ls,size,'#0f0f0f',shadow=False)
        else:
            x0,y0,x1,y1=reg
            crop=full.crop((x0,y0,x1,y1)).filter(ImageFilter.GaussianBlur(16))
            crop=ImageEnhance.Brightness(crop).enhance(0.5)
            crop=crop.resize((max(1,(x1-x0)//2),max(1,(y1-y0)//2)),Image.LANCZOS)
            b=io.BytesIO(); crop.save(b,'JPEG',quality=80); b.seek(0)
            cx=X0+(x0-CX0)*PX; cw=(x1-x0)*PX; ch=(y1-y0)*PX; cyb=H-y1*PX
            c.saveState(); pth=c.beginPath(); pth.roundRect(cx,cyb,cw,ch,7); c.clipPath(pth,stroke=0,fill=0)
            c.drawImage(ImageReader(b),cx,cyb,cw,ch); c.restoreState()
            green = ch>=120
            gh=26 if green else 0
            size,ls=afit(s,cw-28,ch-gh-16,30)
            acenter(c,cx+cw/2,cyb+gh+(ch-gh)/2,ls,size,'#ffffff')
            if green: acenter(c,cx+cw/2,cyb+17,['Ferec ile Kitabın Nuru'],13,'#b6f36a')
            if size<11: report.append((pn,y,'card font',size))
            cur=max(cur,y1*PX+3)
    c.showPage(); c.save(); buf.seek(0)
    ov=PdfReader(buf).pages[0]
    for box in ('mediabox','cropbox','trimbox','bleedbox','artbox'):
        setattr(page,box,RectangleObject([LEFT,0,RIGHT,H]))
    page.merge_page(ov); out.add_page(page)
out.add_metadata({'/Title':TITLE})
out.write(D+'/out.pdf'); print(report); print('h without card ->text:',NOCARD)
