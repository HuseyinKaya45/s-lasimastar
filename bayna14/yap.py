"""14. Ünite — Su: Hayatın Aslı: kaynak.html + fontlar.css + veri.js + okuma.mp3 + dinle1.mp3 + dinle2.mp3 -> sayfa.html (artifact) ve index.html (tam sayfa, çevrimdışı)."""
import base64
import os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
b64 = lambda n: base64.b64encode(open(os.path.join(here, n), "rb").read()).decode("ascii")
src = rd("kaynak.html").replace("/*FONTLAR*/", rd("fontlar.css")).replace("/*VERI*/", rd("veri.js"))
for yer, dosya in (("SES_OKUMA", "okuma.mp3"), ("SES_D1", "dinle1.mp3"), ("SES_D2", "dinle2.mp3")):
    src = src.replace(">" + yer + "<", ">" + b64(dosya) + "<", 1)
open(os.path.join(here, "sayfa.html"), "w", encoding="utf-8").write(src)
head, rest = src.split("</style>", 1)
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(
    '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
print("yapıldı", round(len(src) / 1e6, 2), "MB")
