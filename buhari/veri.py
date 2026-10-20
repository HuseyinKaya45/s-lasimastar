"""kaynak/bNN.json (İmam Buhârî bölüm kelime tabloları) + kaynak/eslesme.json (her kelimenin Sözlük Defteri maddeleri)
+ kaynak/ek.json (sözlükte bulunmayan kelimeler için yazılan açıklamalar) + ../mucem (Sözlük Defteri verisi ve resimleri) -> veri.js"""
import base64
import glob
import io
import json
import os
import re
from PIL import Image
here = os.path.dirname(os.path.abspath(__file__))
mucem = os.path.join(here, "..", "mucem")
t = open(os.path.join(mucem, "veri.js"), encoding="utf-8").read()
SOZ = json.loads(t[t.index("["):t.index("];\nvar YON") + 1])
bas = {}
for i, m in enumerate(SOZ):
    bas.setdefault(m["k"], i)
ES = json.load(open(os.path.join(here, "kaynak", "eslesme.json"), encoding="utf-8"))
EK = json.load(open(os.path.join(here, "kaynak", "ek.json"), encoding="utf-8"))


def kisa(m):
    p = re.split(r"\s*\(\s*[٢2]\s*\)|[؛.:]\s", re.sub(r"^\s*\(\s*[١1]\s*\)\s*", "", m.get("t") or m.get("m") or ""))[0].strip()
    return p[:90]


M, eksik = [], []
for yol in sorted(glob.glob(os.path.join(here, "kaynak", "b*.json")), key=lambda y: int(re.sub(r"\D", "", os.path.basename(y)))):
    bl = int(re.sub(r"\D", "", os.path.basename(yol)))
    for r in json.load(open(yol, encoding="utf-8")):
        e = {"bl": bl, "no": r["no"], "w": r["w"], "tur": r["tur"], "kok": r["kok"], "tr": r["tr"], "sk": r["sk"], "sa": r["sa"], "nt": r["not"]}
        # "صَيْدَلِيّ / صَيْدَلانِيّ" gibi bölü işaretli madde başları tek parça
        adlar = re.findall(r"\S+(?:\s*/\s*\S+)*", ES[str(bl)][r["no"] - 1] or "")
        idx = []
        for a in adlar:
            if a not in bas:
                eksik.append((bl, r["no"], a))
            else:
                idx.append(bas[a])
        anahtar = "%d-%d" % (bl, r["no"])
        if anahtar in EK:
            x = EK[anahtar]
            e.update({"k": x["k"], "c": x.get("c", ""), "m": "", "t": x["t"], "o": x["o"], "b": x["b"], "ttr": x["ttr"], "otr": x["otr"], "r": None, "s": None, "kendi": 1})
        elif idx:
            x = SOZ[idx[0]]
            for a in ("k", "c", "m", "t", "o", "b", "ttr", "otr", "r", "s", "y", "f"):
                if x.get(a):
                    e[a] = x[a]
            e["str"] = x.get("tr", "")
            idx = idx[1:]
        else:
            eksik.append((bl, r["no"], "madde yok"))
        if idx:
            e["ek"] = [[SOZ[j]["k"], kisa(SOZ[j]), SOZ[j].get("tr", ""), SOZ[j]["s"]] for j in idx]
        M.append(e)


def kucult(f):
    im = Image.open(f).convert("RGB")
    im.thumbnail((400, 400))
    b = io.BytesIO()
    im.save(b, "JPEG", quality=72, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(b.getvalue()).decode()


RESIM = {e["r"]: kucult(os.path.join(mucem, "resim", e["r"] + ".jpg")) for e in M if e.get("r")}
js = lambda v: json.dumps(v, ensure_ascii=False, separators=(",", ":"))
open(os.path.join(here, "veri.js"), "w", encoding="utf-8").write(
    "var M = [\n" + ",\n".join(js(m) for m in M) + "];\nvar RESIM = " + js(RESIM) + ";\n")
print(len(M), "kelime,", sum(1 for e in M if e.get("kendi")), "kendi açıklama,", len(RESIM), "resim; eksik:", eksik)
