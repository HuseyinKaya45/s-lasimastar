"""sayfa.html kaynağından iki programı üretir.

sayfa.html       : Sülâsî Mezîd Atölyesi (İf'âl, Tef'îl, Mufâale, İnfi'âl, İfti'âl) — artifact kaynağı
sayfa-dort.html  : Tefa''ul'den İstif'âl'e (Tefa''ul, Tefâ'ul, İf'ilâl, İstif'âl) — artifact kaynağı
index.html, dort-bab.html : tarayıcıda doğrudan açılan tam sayfalar
"""
import os
here = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(here, "sayfa.html"), encoding="utf-8").read()
assert 'var EDITION = "bes";' in src
dort = src.replace('var EDITION = "bes";', 'var EDITION = "dort";', 1)
dort = dort.replace("<title>Sülâsî Mezîd Atölyesi</title>", "<title>Tefa''ul'den İstif'âl'e</title>", 1)
open(os.path.join(here, "sayfa-dort.html"), "w", encoding="utf-8").write(dort)

def full(frag):
    head, rest = frag.split("</style>", 1)
    return ('<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(full(src))
open(os.path.join(here, "dort-bab.html"), "w", encoding="utf-8").write(full(dort))
print("yapıldı")
