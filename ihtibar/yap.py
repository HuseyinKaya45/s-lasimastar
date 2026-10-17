"""Beş “Kendini sına” sınavı: veri.py → veriN.js; kaynak.html + stil.css + fontlar.css + motor.js
→ sayfaN.html (artifact) ve ihtibarN.html (tam sayfa, çevrimdışı)."""
import base64
import json
import os
import re
import subprocess
import sys

here = os.path.dirname(os.path.abspath(__file__))
b64 = lambda p: base64.b64encode(open(p, "rb").read()).decode("ascii")
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
subprocess.run([sys.executable, os.path.join(here, "veri.py")], check=True)
for n in range(1, 6):
    veri = rd("veri%d.js" % n)
    s = json.loads(re.search(r"var SINAV = (\{.*\});", veri, re.S).group(1))
    src = (rd("kaynak.html").replace("ARBASLIK", s["ar"]).replace("BASLIK", s["tr"]).replace("ACIKLAMA", s["aciklama"])
           .replace("/*FONTLAR*/", rd("fontlar.css")).replace("/*STIL*/", rd("stil.css")).replace("/*VERI*/", veri).replace("/*MOTOR*/", rd("motor.js"))
           .replace("/*ZAMAN*/", rd("zaman%d.js" % n) if os.path.exists(os.path.join(here, "zaman%d.js" % n)) else "")
           .replace(">SES_B64<", ">" + (b64(os.path.join(here, "ses%d.mp3" % n)) if os.path.exists(os.path.join(here, "ses%d.mp3" % n)) else "") + "<", 1))
    open(os.path.join(here, "sayfa%d.html" % n), "w", encoding="utf-8").write(src)
    head, rest = src.split("</style>", 1)
    open(os.path.join(here, "ihtibar%d.html" % n), "w", encoding="utf-8").write(
        '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
    print("sınav", n, round(len(src) / 1e6, 2), "MB")
