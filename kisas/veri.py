"""kaynak/metin/sNN.json (sayfa sayfa metin + Türkçe) ve kaynak/kelime/*.json (kelime/deyim kayıtları) -> veri.js
Aynı kelime birden çok yerde geçiyorsa ilk geçtiği yer esas alınır, diğer cümleler ek örnek olur."""
import glob
import json
import os
import re
here = os.path.dirname(os.path.abspath(__file__))
HAREKE = re.compile("[ً-ٰٟـ]")


def norm(s):
    s = HAREKE.sub("", s or "")
    s = re.sub("[أإآٱ]", "ا", s).replace("ة", "ه").replace("ى", "ي")
    return re.sub(r"[^ء-ي ]", "", s).strip()


KISA = ["Hz. İbrahim", "Hz. Yusuf", "3. kıssa", "4. kıssa"]
KITAP, BOLUM, METIN = [], [], []
for yol in sorted(glob.glob(os.path.join(here, "kaynak", "metin", "s*.json")), key=lambda y: int(re.sub(r"\D", "", os.path.basename(y)))):
    s = int(re.sub(r"\D", "", os.path.basename(yol)))
    for x in json.load(open(yol, encoding="utf-8")):
        t = x.get("tip")
        if t == "kitap":
            KITAP.append({"ar": x["ar"], "tr": x.get("tr", ""), "kisa": KISA[len(KITAP)]})
        elif t == "baslik":
            if not KITAP:
                KITAP.append({"ar": "", "tr": "", "kisa": KISA[0]})
            BOLUM.append({"k": len(KITAP) - 1, "no": x.get("no") or len([b for b in BOLUM if b["k"] == len(KITAP) - 1]) + 1, "ar": x["ar"], "tr": x.get("tr", ""), "s": s})
        elif t in ("satir", "dipnot"):
            if x.get("devam") and METIN:
                METIN[-1]["ar"] += " " + x["ar"]
                METIN[-1]["tr"] += " " + x.get("tr", "")
                continue
            if not BOLUM or (KITAP and BOLUM[-1]["k"] != len(KITAP) - 1):
                BOLUM.append({"k": max(0, len(KITAP) - 1), "no": 0, "ar": KITAP[-1]["ar"] if KITAP else "", "tr": "Giriş", "s": s})
            METIN.append({"b": len(BOLUM) - 1, "t": "d" if t == "dipnot" else "s", "ar": x["ar"], "tr": x.get("tr", ""), "s": s})
MN = [norm(m["ar"]) for m in METIN]


def bolum_bul(r):
    c, a, s = norm(r.get("cumle")), norm(r.get("ar")), r.get("sayfa")
    for yakin in (0, 1, 2):
        for i, m in enumerate(METIN):
            if abs(m["s"] - (s or m["s"])) > yakin:
                continue
            if c and (c in MN[i] or (len(MN[i]) > 8 and MN[i] in c)):
                return m["b"]
    for i, m in enumerate(METIN):
        if a and a in MN[i]:
            return m["b"]
    return next((m["b"] for m in METIN if m["s"] >= (s or 0)), 0)


K, yer = [], {}
for yol in sorted(glob.glob(os.path.join(here, "kaynak", "kelime", "*.json"))):
    for r in json.load(open(yol, encoding="utf-8")):
        if not r.get("ar") or not r.get("tr"):
            continue
        tur = r.get("tur") or "isim"
        anahtar = norm(r.get("asil") or r["ar"]) + "|" + ("deyim" if tur == "deyim" else "k")
        if anahtar in yer:
            e = K[yer[anahtar]]
            if r.get("cumle") and r["cumle"] != e["cu"] and len(e["x"]) < 3 and r["ar"] in r["cumle"]:
                e["x"].append([r["cumle"], r.get("cumle_tr", ""), r.get("sayfa")])
            continue
        f = r.get("fiil") or None
        cu = r.get("cumle") or ""
        e = {"ar": r["ar"], "a": r.get("asil") or r["ar"], "tur": tur, "kok": r.get("kok") or "", "c": r.get("cogul") or "",
             "f": [f.get("mazi") or "", f.get("muzari") or "", f.get("masdar") or ""] if isinstance(f, dict) else None,
             "tr": r["tr"], "cu": cu if r["ar"] in cu else (cu or r["ar"]), "cut": r.get("cumle_tr", ""), "o": r.get("ornek") or "", "ot": r.get("ornek_tr") or "",
             "s": r.get("sayfa"), "b": bolum_bul(r), "x": []}
        yer[anahtar] = len(K)
        K.append(e)
for e in K:
    if not e["x"]:
        del e["x"]
# kelimeler bölüm ve sayfa sırasına göre
K.sort(key=lambda e: (e["b"], e["s"] or 0))
js = lambda v: json.dumps(v, ensure_ascii=False, separators=(",", ":"))
open(os.path.join(here, "veri.js"), "w", encoding="utf-8").write(
    "var KITAP = " + js(KITAP) + ";\nvar BOLUM = " + js(BOLUM) + ";\nvar METIN = [\n" + ",\n".join(js(m) for m in METIN) +
    "];\nvar K = [\n" + ",\n".join(js(e) for e in K) + "];\n")
print(len(KITAP), "kıssa,", len(BOLUM), "bölüm,", len(METIN), "satır,", len(K), "kelime/deyim (", sum(1 for e in K if e["tur"] == "deyim"), "deyim )")
