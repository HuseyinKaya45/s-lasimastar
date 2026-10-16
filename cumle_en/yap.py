"""Arabic Sentence Structures (English): kaynak.html + veri_a.js + veri_b.js + oyunlar.js -> sayfa.html (artifact) and index.html (full page)."""
import os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
veri = rd("veri_a.js").rstrip("\n") + "\n" + rd("veri_b.js")
src = rd("kaynak.html").replace("/*VERI*/", veri).replace("/*OYUNLAR*/", rd("oyunlar.js"))
open(os.path.join(here, "sayfa.html"), "w", encoding="utf-8").write(src)
head, rest = src.split("</style>", 1)
full = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(full)
print("built")
