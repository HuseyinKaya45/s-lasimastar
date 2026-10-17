"""13. Ünite — Babalar ve Oğullar: kaynak.html + fontlar.css + veri.js + ses.mp3 -> sayfa.html (artifact) ve index.html (tam sayfa, çevrimdışı)."""
import base64
import os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
ses = base64.b64encode(open(os.path.join(here, "ses.mp3"), "rb").read()).decode("ascii")
src = rd("kaynak.html").replace("/*FONTLAR*/", rd("fontlar.css")).replace("/*VERI*/", rd("veri.js")).replace("SES_B64", ses, 1)
open(os.path.join(here, "sayfa.html"), "w", encoding="utf-8").write(src)
head, rest = src.split("</style>", 1)
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(
    '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
print("yapıldı", round(len(src) / 1e6, 2), "MB")
