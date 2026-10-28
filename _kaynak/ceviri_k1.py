#!/usr/bin/env python3
"""1. kitap (tek dosyalık, gömülü sesli HTML) İngilizce sürüm aracı.
Kaynak dosyalar: _kaynak/ceviri_k1/kaynak/k1u1..k1u16, k1s1..k1s4, k1ns .html (origin/main'deki Türkçe sürümlerin kopyası: `indir`)
  indir                       origin/main'den kaynak dosyaları çeker
  hazirla                     özet: kaç benzersiz metin, kaçı çevrildi
  goster <birim> [--sinir N]  birimde çevrilmemiş metinleri listeler (durum/bekleyen.json)
  ekle <json>                 bekleyen sıraya göre çevirileri doğrular ve durum/sonuc.json'a yazar
  derle <birim|hepsi>         en/<birim>/index.html üretir
Çeviri anahtarı = Türkçe metin (veri metinleri aynen, kod/HTML parçaları kenar boşluksuz)."""
import os, re, sys, json, subprocess, argparse
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(R, "_kaynak"))
import ceviri_en as ce
D = os.path.join(R, "_kaynak", "ceviri_k1"); KAY = os.path.join(D, "kaynak"); ST = os.path.join(D, "durum")
os.makedirs(ST, exist_ok=True)
BIRIMLER = [f"k1u{i}" for i in range(1, 17)] + [f"k1s{i}" for i in range(1, 5)] + ["k1ns"]
AR = re.compile(r'[؀-ۿ﴾﴿‏ﹰ-﻿✳ﷺ✓✗️]')
jl = lambda p, d=None: json.load(open(p, encoding="utf-8")) if os.path.exists(p) else d
def js(p, o): json.dump(o, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
SONUC = lambda: jl(os.path.join(ST, "sonuc.json"), {})

# ---------------------------------------------------------------- ayrıştırma
def bol(t):
    """<script> blokları: [(başlangıç, bitiş)] (etiketler dahil)"""
    return [(m.start(), m.end()) for m in re.finditer(r'<script[^>]*>.*?</script>', t, re.S)]
def veri_ve_kod(t):
    sc = bol(t); a, b = sc[1]; c, d = sc[2]
    oa = t.index('>', a) + 1; ob = b - len('</script>'); oc = t.index('>', c) + 1; od = d - len('</script>')
    return (oa, ob), (oc, od)
def zincir(veri):
    """veri betiğini üst düzey 'var' parçalarına böler: [(ad|None, metin)]"""
    ps = [m.start() for m in re.finditer(r'^var\s', veri, re.M)]
    out = []
    if not ps or ps[0] > 0: out.append((None, veri[:ps[0] if ps else len(veri)]))
    for i, p in enumerate(ps):
        q = ps[i + 1] if i + 1 < len(ps) else len(veri)
        out.append((re.match(r'var\s+([A-Za-z_0-9]+)', veri[p:]).group(1), veri[p:q]))
    return out
def degerler(veri):
    return json.loads(subprocess.run(["node", os.path.join(D, "veri.js")], input=veri, capture_output=True, text=True, check=True).stdout)
# veri yolları
TRANSLIT = {'DIYALOG[].satir[][3]', 'KELIME[][2]', 'GUN[][2]', 'SAYI[][2]', 'ONLUK[][2]'}
METIN = {'KELIME[][1]', 'GUN[][1]', 'SAYI[][1]', 'SINIF[][1]', 'HARF[][1]', 'DIYALOG[].satir[][2]', 'OKU_CUMLE[][2]', 'CEVAPLA[][2]', 'KONUS[][0]', 'KALIP_OZET[][2]', 'ONLUK[][1]'}
IDRE = re.compile(r'^[a-z0-9_\-:]+$')
def yol(p, i):  # son indisi tuple konumu olarak ekle (kısa listelerde)
    return p
def yurut(v, p, ids, f, son=None):
    """f(yol, dizge) → yeni dizge; yapıyı yerinde güncelleyerek döndürür"""
    if isinstance(v, str):
        q = p[:-2] + '[' + str(son) + ']' if son is not None else p
        return f(q, v, ids)
    if isinstance(v, list):
        return [yurut(x, p + '[]', ids, f, i if len(v) <= 8 else None) for i, x in enumerate(v)]
    if isinstance(v, dict):
        return {k: yurut(x, p + '.' + k, ids, f) for k, x in v.items()}
    return v
def tur(p, s, ids):
    r = AR.sub('', s)
    if not re.search(r'[A-Za-zÇĞİÖŞÜçğıöşü]', r): return 'ar'
    if p in TRANSLIT: return 'translit'
    if p in METIN: return 'metin'
    if s in ids: return 'id'
    if IDRE.match(s): return 'id'
    return 'metin'
# okunuş (Türkçe imlâ) → İngilizce okuyucu için Latin harfli okunuş
TR2EN = {'ş': 'sh', 'ç': 'ch', 'c': 'j', 'ğ': 'gh', 'ı': 'i', 'ö': 'o', 'ü': 'u', 'v': 'w', 'e': 'a', 'â': 'ā', 'î': 'ī', 'û': 'ū', 'Ş': 'Sh', 'Ç': 'Ch', 'C': 'J', 'Ğ': 'Gh', 'İ': 'I', 'Ö': 'O', 'Ü': 'U', 'V': 'W', 'E': 'A', 'Â': 'Ā', 'Î': 'Ī', 'Û': 'Ū', '‘': 'ʿ'}
def okunus(s): return ''.join(TR2EN.get(c, c) for c in s)
# kod literalleri
LIT = re.compile(r'"((?:[^"\\\n]|\\.)*)"|\'((?:[^\'\\\n]|\\.)*)\'')
def bolgeler(s):
    """literal içindeki düz metin aralıkları (etiket dışı)"""
    sp = []; pos = 0
    for m in re.finditer(r'<[^>]*>', s): sp.append([pos, m.start()]); pos = m.end()
    sp.append([pos, len(s)]); out = []
    for k, (a, b) in enumerate(sp):
        seg = s[a:b]
        if k == 0:
            m = re.match(r'^[^<>]*?">', seg)
            if m: a += m.end(); seg = s[a:b]
        m2 = re.search(r'<[^>]*$', seg)
        if m2: b = a + m2.start()
        if b > a: out.append((a, b))
    for m in re.finditer(r'(?:aria-label|title|placeholder|alt)="([^"<>+\\\']*)"', s):
        a, b = m.start(1), m.end(1)
        if b > a and not any(a < y and x < b for x, y in out): out.append((a, b))
    out.sort()
    return out
KOD_EK = {'✓ bitti', '— iyi!'}
def parca_aday(seg):
    if seg in (' dinle', ' puan', ' · hata: '): return True
    if AR.search(seg) and re.search(r'[a-z]{2,}', AR.sub('', seg)): return True
    return kodadayi(seg.strip())
def kodadayi(x):
    if x.strip() in KOD_EK: return True
    r = AR.sub('', x)
    if not re.search(r'[A-Za-zÇĞİÖŞÜçğıöşüâîû]', r): return False
    if re.search(r'[çğıöşüÇĞİÖŞÜâîûÂÎÛ]', r): return True
    r = re.sub(r'^[^A-Za-zÇĞİÖŞÜ]+', '', r.strip())
    return bool(re.match(r'^[A-ZÇĞİÖŞÜ][a-zçğıöşü]', r))
# statik HTML (script/style dışı)
STAT = re.compile(r'(?:title|aria-label|alt|placeholder)="([^"]*)"|<meta name="description" content="([^"]*)"|<title>([^<]*)</title>|>([^<>]*[A-Za-zçğışöü][^<>]*)<')
def statik_bolgeler(t):
    """script/style dışındaki parçalar: [(a,b)]"""
    dis = [(m.start(), m.end()) for m in re.finditer(r'<script[^>]*>.*?</script>|<style[^>]*>.*?</style>', t, re.S)]
    out = []; pos = 0
    for a, b in dis: out.append((pos, a)); pos = b
    out.append((pos, len(t))); return out
def statik_adaylar(t):
    res = []
    for a, b in statik_bolgeler(t):
        for m in STAT.finditer(t, a, b):
            g = next(i for i in range(1, 5) if m.group(i) is not None)
            if kodadayi(m.group(g).strip()): res.append(m.group(g).strip())
    return res

def adaylar(u):
    """birimdeki çevrilecek metinler (sıralı, tekrarsız)"""
    t = open(os.path.join(KAY, u + ".html"), encoding="utf-8").read()
    (va, vb), (ka, kb) = veri_ve_kod(t)
    out = list(statik_adaylar(re.sub(r'[A-Za-z0-9+/=]{300,}', '', t)))
    d = degerler(t[va:vb]); ids = set(d.get('RESIM', {}).get('__anahtarlar', [])) | set(d.get('ZAMAN', {}).get('__anahtarlar', []))
    def f(p, s, ids_):
        if tur(p, s, ids_) == 'metin': out.append(s)
        return s
    for k, v in d.items():
        if k in ('RESIM', 'ZAMAN'): continue
        yurut(v, k, ids, f)
    code = t[ka:kb]
    for m in LIT.finditer(code):
        s = m.group(1) if m.group(1) is not None else m.group(2)
        for a, b in bolgeler(s):
            x = s[a:b].strip()
            if parca_aday(s[a:b]): out.append(x)
    return list(dict.fromkeys(out))

# ---------------------------------------------------------------- komutlar
def havuz():
    p = os.path.join(ST, "havuz.json"); h = jl(p)
    if h is None:
        h = {u: adaylar(u) for u in BIRIMLER}; js(p, h)
    return h
def cmd_indir(a):
    ad = {}
    for n in subprocess.check_output(["git", "-c", "core.quotepath=off", "ls-tree", "origin/main", "--name-only"], cwd=R, text=True).split("\n"):
        if not n.endswith(".html"): continue
        if n[0].isdigit(): k = "k1u" + n.split("-")[0]
        elif n.startswith("Kendini"): k = "k1s" + str((int(n.split("Ünite ")[1][0]) + 1) // 2)
        else: k = "k1ns"
        os.makedirs(KAY, exist_ok=True)
        open(os.path.join(KAY, k + ".html"), "wb").write(subprocess.check_output(["git", "-c", "core.quotepath=off", "show", "origin/main:" + n], cwd=R))
        print(n, "→", k)
def cmd_hazirla(a):
    h = havuz(); s = SONUC(); tum = list(dict.fromkeys(x for u in BIRIMLER for x in h[u]))
    print(f"{len(tum)} benzersiz metin ({sum(len(x) for x in tum):,} karakter); {sum(x in s for x in tum)} çevrildi.")
    for u in BIRIMLER:
        ek = [x for x in h[u] if x not in s]; print(u, len(h[u]), "bekleyen", len(ek))
def cmd_goster(a):
    h = havuz(); s = SONUC(); gor = set(); ek = []
    for u in BIRIMLER:
        if u == a.birim: ek = [x for x in h[u] if x not in s]; break
    ek = ek[a.baslangic:a.baslangic + a.sinir] if a.sinir else ek
    js(os.path.join(ST, "bekleyen.json"), ek)
    for i, x in enumerate(ek): print(f"{i}\t{x}")
    print(f"--- {len(ek)} metin ({a.birim})")
def cmd_ekle(a):
    ek = jl(os.path.join(ST, "bekleyen.json"), []); tr = json.load(open(a.dosya, encoding="utf-8")); s = SONUC()
    if len(tr) != len(ek): sys.exit(f"Uzunluk uyuşmuyor: beklenen {len(ek)}, gelen {len(tr)}")
    ok = 0; kotu = []
    for i, (k, e) in enumerate(zip(ek, tr)):
        g = ce.dogrula(k, e)
        if g is None: s[k] = e; ok += 1
        else: kotu.append((i, g))
    js(os.path.join(ST, "sonuc.json"), s)
    print(f"{ok} kabul, {len(kotu)} reddedildi.")
    for i, g in kotu: print(f"  #{i}: {g}")
def esc(s, q): return s.replace("\\", "\\\\").replace(q, "\\" + q)
def derle_birim(u, izin_eksik=False):
    s = SONUC(); t = open(os.path.join(KAY, u + ".html"), encoding="utf-8").read()
    (va, vb), (ka, kb) = veri_ve_kod(t); eksik = set()
    def ceviri(x):
        if x in s: return s[x]
        eksik.add(x); return x
    # 1) veri
    veri = t[va:vb]; d = degerler(veri); ids = set(d.get('RESIM', {}).get('__anahtarlar', [])) | set(d.get('ZAMAN', {}).get('__anahtarlar', []))
    def f(p, x, ids_):
        k = tur(p, x, ids_)
        if k == 'translit': return okunus(x)
        if k == 'metin': return ceviri(x)
        return x
    yeni = []
    for ad, parca in zincir(veri):
        if ad is None or ad in ('RESIM', 'ZAMAN', 'SES_SURE'): yeni.append(parca); continue
        v = yurut(d[ad], ad, ids, f)
        yeni.append("var " + ad + " = " + json.dumps(v, ensure_ascii=False, separators=(",", ":")) + ";\n")
    veri2 = "".join(yeni)
    # 2) kod
    code = t[ka:kb]
    def lit(m):
        q = '"' if m.group(1) is not None else "'"; sx = m.group(1) if m.group(1) is not None else m.group(2); parcalar = []; son = 0
        for a, b in bolgeler(sx):
            seg = sx[a:b]; x = seg.strip()
            if not parca_aday(seg): continue
            lead = seg[:len(seg) - len(seg.lstrip())]; trail = seg[len(seg.rstrip()):]
            parcalar.append((a, b, lead + esc(ceviri(x), q) + trail))
        r = ""; 
        for a, b, y in parcalar: r += sx[son:a] + y; son = b
        return q + r + sx[son:] + q
    kod2 = LIT.sub(lit, code)
    # 3) statik parçalar (dıştan içe, sondan başa)
    sonuc = t[:va] + veri2 + t[vb:ka] + kod2 + t[kb:]
    # statik: script/style dışı metin
    def stat_degis(mt):
        return mt.group(0)
    parts = []; pos = 0; out = ""
    for a, b in statik_bolgeler(sonuc):
        out += sonuc[pos:a]; seg = sonuc[a:b]
        def sub(m):
            g = next(i for i in range(1, 5) if m.group(i) is not None); v = m.group(g)
            if not kodadayi(v.strip()): return m.group(0)
            lead = v[:len(v) - len(v.lstrip())]; trail = v[len(v.rstrip()):]
            y = lead + ceviri(v.strip()).replace('"', '&quot;') + trail
            return m.group(0).replace(v, y, 1)
        out += STAT.sub(sub, seg); pos = b
    sonuc = out + sonuc[pos:]
    sonuc = sonuc.replace("<html>", '<html lang="en">', 1)
    if eksik and not izin_eksik:
        print(u, "EKSİK", len(eksik)); return False
    od = os.path.join(R, "en", u); os.makedirs(od, exist_ok=True)
    open(os.path.join(od, "index.html"), "w", encoding="utf-8").write(sonuc)
    print(u, round(len(sonuc) / 1e6, 2), "MB", ("(eksik %d)" % len(eksik)) if eksik else ""); return True
def cmd_derle(a):
    for u in (BIRIMLER if a.birim == "hepsi" else [a.birim]): derle_birim(u, a.izin_eksik)
if __name__ == "__main__":
    p = argparse.ArgumentParser(); sp = p.add_subparsers(dest="c", required=True)
    sp.add_parser("indir"); sp.add_parser("hazirla")
    g = sp.add_parser("goster"); g.add_argument("birim"); g.add_argument("--sinir", type=int, default=0); g.add_argument("--baslangic", type=int, default=0)
    e = sp.add_parser("ekle"); e.add_argument("dosya")
    d = sp.add_parser("derle"); d.add_argument("birim"); d.add_argument("--izin-eksik", action="store_true")
    a = p.parse_args(); {"indir": cmd_indir, "hazirla": cmd_hazirla, "goster": cmd_goster, "ekle": cmd_ekle, "derle": cmd_derle}[a.c](a)
