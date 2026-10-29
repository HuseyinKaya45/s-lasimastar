#!/usr/bin/env python3
"""Makalât veri düzeltmeleri (mekanik): mükerrerleri sil, noktalama/boşluk/tırnak düzelt, kesik başlıkları ve özetleri yeniden üret.
Girdi/çıktı: _kaynak/makalat/veri/ (yerinde)."""
import os, re, json, sys
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, "_kaynak", "makalat", "veri")
L = r"[^\W\d_]"
def yukle():
    dz = json.load(open(os.path.join(D, "dizin.json"), encoding="utf-8"))
    me = {}
    for i in range(10): me.update(json.load(open(os.path.join(D, "metin%d.json" % i), encoding="utf-8")))
    return dz, me
def kaydet(dz, me):
    json.dump(dz, open(os.path.join(D, "dizin.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    parca = [dict() for _ in range(10)]
    for k, v in me.items(): parca[(int(k) - 1) // 500][k] = v
    for i in range(10): json.dump(parca[i], open(os.path.join(D, "metin%d.json" % i), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

AR = re.compile(r"[؀-ۿ]")
def tirnak_duzelt(t):
    """metindeki düz çift tırnakları “ ” yap (paragraflar arası durum korunur); dengesizse dokunma"""
    if '"' not in t: return t
    def donustur(s):
        out = []; acik = False
        for c in s:
            if c == "“": acik = True; out.append(c)
            elif c == "”": acik = False; out.append(c)
            elif c == '"':
                out.append("”" if acik else "“"); acik = not acik
            else: out.append(c)
        return "".join(out), acik
    q = re.sub(r'“[ \t]*"', "“", t); q = re.sub(r'"[ \t]*”', "”", q)
    for aday in (q, q.replace('""', '"')):
        r, acik = donustur(aday)
        if not acik: return re.sub(r"”(?=“)", "” ", r)
    # paragraf paragraf dene
    out = []
    for p in q.split("\n"):
        r, acik = donustur(p)
        if acik:
            r = re.sub(r'(?<=[.!?…,;:)\w])"(?=\s|$)', "”", p)
            r = re.sub(r'(?:(?<=\s)|^)"(?=[^\s])', "“", r)
        out.append(re.sub(r"”(?=“)", "” ", r))
    return "\n".join(out)
def metin_duzelt(t):
    ps = t.split("\n"); out = []
    for p in ps:
        p = re.sub(r"(?<=[^\W_])'(?=%s)" % L, "’", p)               # kesme işareti
        p = re.sub(r"(?<=\S)[ \t ]{2,}", " ", p)                # çift boşluk
        p = re.sub(r"(%s|\d)[ \t]+([,;:.!?])(?!\.)" % L, r"\1\2", p) # noktalamadan önce boşluk
        p = re.sub(r"([a-zçğıöşüâîû]{2,})([.!?])([A-ZÇĞİÖŞÜ])", r"\1\2 \3", p)  # cümle sonu boşluksuz
        p = re.sub(r"([a-zçğıöşü]{2,}),([A-Za-zÇĞİÖŞÜçğıöşü])", r"\1, \2", p)
        out.append(p)
    return tirnak_duzelt("\n".join(out))
SELAM = re.compile(r"^(es-)?Sel[âa]m[üu]n ?(Aley[küu]m|aleyküm)[^.!?]*[.!?]\s*", re.I)
DUR = {"ve", "bir", "ki", "için", "ile", "da", "de", "bu", "o", "şu", "ne", "gibi", "çok", "en", "her", "ya", "ama", "fakat", "ancak", "olan", "olarak", "diye", "kadar", "göre", "sonra", "önce", "bile", "hem", "mı", "mi", "mu", "mü", "daha"}
def norm(s): return re.sub(r"\s+", " ", s).strip()
KISALTMA = re.compile(r"\b(Hz|Dr|Prof|Doç|vb|vs|bkz|örn|No|St|Mr|Sn|Ar|M|Ö|s\.a\.v|a\.s|r\.a|s\.a|k\.s|c\.c|T\.C|ö|MÖ|MS)\.", re.I)
def cumleler(t):
    t = KISALTMA.sub(lambda m: m.group(0)[:-1] + "\u0001", t)
    return [c.replace("\u0001", ".") for c in re.split(r"(?<=[.!?…])\s+(?=[“\"A-ZÇĞİÖŞÜ0-9])", t) if c]
def baslik_uret(t):
    t = norm(t); t2 = SELAM.sub("", t) or t
    cs = cumleler(t2); s = ""
    for c in cs:
        s = (s + " " + c).strip()
        if len(s) >= 25: break
    ek = ""
    if len(s) > 118:
        ss = s[:118]
        m = max(ss.rfind(", "), ss.rfind("; "), ss.rfind(": "), ss.rfind(" – "), ss.rfind(" — "))
        if m >= 50: s = ss[:m]
        else:
            w = ss.rsplit(" ", 1)[0]; s = w
        s = s.rstrip(" ,;:–—-")
        while s.split(" ")[-1].lower() in DUR and len(s.split(" ")) > 4: s = s.rsplit(" ", 1)[0].rstrip(" ,;:–—-")
        ek = "…"
    s = s.strip()
    if not ek: s = re.sub(r"[.]+$", "", s) if not s.endswith("...") else s
    return s + ek
def kesik(ti, t):
    ti = ti.strip()
    if len(ti) < 88: return False
    if re.search(r"[.!?…”\"’)»:]$", ti): return False
    n = norm(t); n2 = SELAM.sub("", n)
    a = ti.replace("'", "’"); 
    for src in (n, n2):
        if src.replace("'", "’").startswith(a) and len(src) > len(ti) + 3: return True
    return False
def ozet_uret(t, uz=260):
    n = norm(t)
    if len(n) <= uz: return n
    s = n[:uz].rsplit(" ", 1)[0].rstrip(" ,;:–—-")
    return s + "…"
def main():
    dz, me = yukle(); y = dz["y"]
    # 1) mükerrerleri sil
    sil = {r[0] for r in y if r[6]}
    dz["y"] = y = [r for r in y if r[0] not in sil]
    for i in sil: me.pop(str(i), None)
    print("silinen mükerrer:", len(sil))
    # 2) metin + başlık + özet
    nb = no = 0
    for r in y:
        id_ = str(r[0]); tr = me[id_][0]
        yeni = metin_duzelt(tr)
        me[id_][0] = yeni
        if len(r) > 10 and r[10] is not None: r[10] = yeni      # kısa yazıların metni dizinin içinde de durur
        ti = metin_duzelt(r[1]); ti = re.sub(r"\s+", " ", ti).strip()
        if kesik(r[1], tr): ti = baslik_uret(yeni); nb += 1
        r[1] = ti
        r[2] = ozet_uret(yeni); no += 1
    print("yeniden üretilen başlık:", nb, "özet:", no)
    kaydet(dz, me)
if __name__ == "__main__": main()
