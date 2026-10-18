"""kaynak/pNN.json (sayfa sayfa okunan sözlük maddeleri) + resim/*.jpg -> veri.js
Yönlendirme maddeleri ("جمع إمام. انظر: إمام") hedef maddeye bağlanır; önceki sayfadan devam eden metin önceki maddeye eklenir."""
import base64
import glob
import io
import json
import os
import re
here = os.path.dirname(os.path.abspath(__file__))
HAREKE = re.compile("[ً-ٰٟـ]")


def norm(s):
    s = HAREKE.sub("", s or "")
    return re.sub("[أإآٱ]", "ا", s).replace("ة", "ه").replace("ى", "ي").strip()


maddeler, yonler, levhalar = [], [], []
for yol in sorted(glob.glob(os.path.join(here, "kaynak", "p*.json")), key=lambda y: int(re.sub(r"\D", "", os.path.basename(y)))):
    for x in json.load(open(yol, encoding="utf-8")):
        if x.get("devam"):
            if maddeler:
                maddeler[-1]["m"] = (maddeler[-1]["m"] + " " + x.get("metin", "")).strip()
            continue
        if x.get("levha") or x.get("etiketler"):
            b = x.get("baslik") or x["k"]
            e = [[e["ar"], e.get("tr", "")] for e in x.get("etiketler", [])]
            r = (x.get("resim") or "")[:-4]
            # bir sonraki sayfada "(تابِع)" ile devam eden levha öncekiyle birleşir
            if levhalar and norm(b).replace("(تابع)", "").strip() == norm(levhalar[-1]["b"]):
                levhalar[-1]["e"] += e
                levhalar[-1]["r"].append(r)
            else:
                levhalar.append({"b": b, "tr": x.get("tr", ""), "r": [r], "s": x["sayfa"], "e": e})
            if not x.get("yon"):
                continue
        if x.get("yon"):
            yonler.append(x)
            continue
        b = x.get("bosluk")
        maddeler.append({"k": x["k"], "c": x.get("cogul") or "", "m": x.get("metin", ""), "t": x.get("tanim") or "",
                         "o": x.get("ornekler") or [], "b": [b["cumle"], b["kelime"]] if b and b.get("cumle") and b.get("kelime") else None,
                         "tr": x.get("tr", ""), "ttr": x.get("tanim_tr") or "", "otr": x.get("ornekler_tr") or [],
                         "r": (x.get("resim") or "")[:-4] or None, "s": x["sayfa"], "y": []})
        # fiillerde metnin başındaki muzari + mastar ("يُبيحُ إِباحَةً")
        f = re.match(r"\s*(ي\S+\s+\S+?)\s*[:؛،]", maddeler[-1]["m"])
        if f:
            maddeler[-1]["f"] = f.group(1)
bas = {}
for i, m in enumerate(maddeler):
    bas.setdefault(norm(m["k"]), i)
YON = []
for y in yonler:
    i = bas.get(norm(y["yon"]))
    if i is not None:
        maddeler[i]["y"].append([y.get("iliski", ""), y["k"]])
        if y.get("resim") and not maddeler[i]["r"] and not y.get("etiketler"):
            maddeler[i]["r"] = y["resim"][:-4]
    else:
        YON.append([y["k"], y.get("iliski", ""), y["yon"], y.get("tr", "")])
for m in maddeler:
    if not m["y"]:
        del m["y"]
kullanilan = {m["r"] for m in maddeler if m["r"]} | {r for l in levhalar for r in l["r"]}
from PIL import Image
levha_resim = {r for l in levhalar for r in l["r"]}


def kucult(f, ad):
    # madde resimleri 400 px / kalite 72; levhalar büyük kalır (etiketleri okunmalı)
    im = Image.open(f).convert("RGB")
    en = 1400 if ad in levha_resim else 400
    im.thumbnail((en, en))
    b = io.BytesIO()
    im.save(b, "JPEG", quality=78 if ad in levha_resim else 72, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(b.getvalue()).decode()


RESIM = {}
for f in sorted(glob.glob(os.path.join(here, "resim", "*.jpg"))):
    ad = os.path.basename(f)[:-4]
    if ad in kullanilan:
        RESIM[ad] = kucult(f, ad)
eksik = sorted(kullanilan - set(RESIM))
sayfalar = sorted({m["s"] for m in maddeler} | {l["s"] for l in levhalar})
js = lambda v: json.dumps(v, ensure_ascii=False, separators=(",", ":"))
open(os.path.join(here, "veri.js"), "w", encoding="utf-8").write(
    "var M = [\n" + ",\n".join(js(m) for m in maddeler) + "];\nvar YON = " + js(YON) + ";\nvar LEVHA = " + js(levhalar) +
    ";\nvar SAYFA_ARALIK = " + js("sayfa %d–%d" % (sayfalar[0], sayfalar[-1])) + ";\nvar RESIM = {};\n")
# resimler ayrı dosyalarda (yayın sayfası 16 MB sınırı): resim1.js, resim2.js … her biri ~8 MB
for f in glob.glob(os.path.join(here, "resim[0-9]*.js")):
    os.remove(f)
parca, boy, no = {}, 0, 1
for ad, v in RESIM.items():
    parca[ad] = v
    boy += len(v)
    if boy > 8e6 or ad == list(RESIM)[-1]:
        open(os.path.join(here, "resim%d.js" % no), "w").write("Object.assign(RESIM, " + js(parca) + ");\n")
        parca, boy, no = {}, 0, no + 1
print(len(maddeler), "madde,", len(yonler), "yönlendirme (", len(YON), "çözülmedi ),", len(levhalar), "levha,", len(RESIM), "resim; eksik resim:", eksik)
