"""Buhârî Kelime Hazinesi: kaynak.html + stil.css + fontlar.css + veri.js + uygulama.js
-> sayfa.html (artifact) ve index.html (tek dosya, çevrimdışı). veri.js, veri.py ile üretilir."""
import glob
import os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
parcalar = sorted((os.path.basename(f) for f in glob.glob(os.path.join(here, "resim[0-9]*.js"))), key=lambda n: int(n[5:-3]))
src = (rd("kaynak.html").replace("/*FONTLAR*/", rd("fontlar.css")).replace("/*STIL*/", rd("stil.css"))
       .replace("/*VERI*/", rd("veri.js")).replace("/*UYGULAMA*/", rd("uygulama.js")))
sayfa = src.replace("<!--RESIM-->", "".join('<script src="%s"></script>\n' % n for n in parcalar))
open(os.path.join(here, "sayfa.html"), "w", encoding="utf-8").write(sayfa)
tek = src.replace("<!--RESIM-->", "".join("<script>\n" + rd(n) + "</script>\n" for n in parcalar))
head, rest = tek.split("</style>", 1)
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(
    '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
print("sayfa.html", round(len(sayfa) / 1e6, 2), "MB +", parcalar, "; index.html", round(len(tek) / 1e6, 2), "MB")
