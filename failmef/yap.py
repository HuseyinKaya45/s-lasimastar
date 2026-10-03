"""İsm-i fâil ve ism-i mef'ûl: kaynak.html + ortak.css + ozel.css + veri.js + oyunlar.js -> sayfa.html (artifact) ve index.html (tam sayfa)."""
import os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
src = rd("kaynak.html").replace("/*CSS*/", rd("ortak.css")).replace("/*OZEL*/", rd("ozel.css")).replace("/*VERI*/", rd("veri.js")).replace("/*OYUNLAR*/", rd("oyunlar.js"))
open(os.path.join(here, "sayfa.html"), "w", encoding="utf-8").write(src)
head, rest = src.split("</style>", 1)
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(
    '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
print("yapıldı")
