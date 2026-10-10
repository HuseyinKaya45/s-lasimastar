"""Okuma Kelime Hazinesi (Okuma-anlama 1–10): kelimeler.json -> veri.js; kaynak.html + ortak.css + ozel.css + veri.js + uygulama.js -> sayfa.html (artifact) ve index.html (tam sayfa)."""
import os, json, re
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()

# --- veri.js: kelimeler.json'dan üretilir ---
K = json.loads(rd("kelimeler.json"))
words = []
for d in K["dersler"]:
    for i, w in enumerate(d["words"]):
        x = {"id": d["id"] + "-" + str(i), "d": d["id"]}
        for f in ("w", "t", "tr", "c", "k", "e", "z", "s", "sw", "st"):
            x[f] = w.get(f, "")
        x["dl"] = w.get("dl", [d["id"]])
        words.append(x)
dersler = [{"id": d["id"], "tr": d["tr"], "ar": d["ar"], "cat": d["cat"]} for d in K["dersler"]]
js = ("// Bu dosya yap.py tarafından kelimeler.json'dan üretilir; elle değiştirme.\n"
      "var KALIPLAR = " + json.dumps(K["kaliplar"], ensure_ascii=False) + ";\n"
      "var DERSLER = " + json.dumps(dersler, ensure_ascii=False) + ";\n"
      "var KELIMELER = " + json.dumps(words, ensure_ascii=False, indent=0) + ";\n")
open(os.path.join(here, "veri.js"), "w", encoding="utf-8").write(js)

src = rd("kaynak.html").replace("/*CSS*/", rd("ortak.css")).replace("/*OZEL*/", rd("ozel.css")).replace("/*VERI*/", js).replace("/*APP*/", rd("uygulama.js"))
open(os.path.join(here, "sayfa.html"), "w", encoding="utf-8").write(src)
head, rest = src.split("</style>", 1)
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(
    '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
print("yapıldı:", len(dersler), "ders,", len(words), "kelime")
