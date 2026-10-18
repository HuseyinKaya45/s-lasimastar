"""1. kitap 12. ünite — Hobiler (الهوايات): kaynak.html + stil.css + fontlar.css + veri.js + zaman.js + resim/*.jpg + ses.mp3 + uygulama.js
-> sayfa.html (artifact) ve index.html (tam sayfa, çevrimdışı). Ses ve zamanlar ses_yap.py ile üretilir."""
import base64
import json
import os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
b64 = lambda p: base64.b64encode(open(p, "rb").read()).decode("ascii")
rdir = os.path.join(here, "resim")
resim = {f[:-4]: "data:image/jpeg;base64," + b64(os.path.join(rdir, f)) for f in sorted(os.listdir(rdir)) if f.endswith(".jpg")}
src = (rd("kaynak.html").replace("/*FONTLAR*/", rd("fontlar.css")).replace("/*STIL*/", rd("stil.css"))
       .replace("/*VERI*/", rd("veri.js")).replace("/*ZAMAN*/", rd("zaman.js"))
       .replace("/*RESIM*/", "var RESIM = " + json.dumps(resim) + ";").replace("/*UYGULAMA*/", rd("uygulama.js"))
       .replace(">SES_B64<", ">" + b64(os.path.join(here, "ses.mp3")) + "<", 1))
open(os.path.join(here, "sayfa.html"), "w", encoding="utf-8").write(src)
head, rest = src.split("</style>", 1)
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(
    '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
print("yapıldı", round(len(src) / 1e6, 2), "MB")
