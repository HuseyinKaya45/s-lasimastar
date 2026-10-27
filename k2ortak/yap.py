"""2. kitap ünite uygulamasını derler: python3 k2ortak/yap.py k2u1   (İngilizce sürüm: python3 k2ortak/yap.py --en k4u1 → en/k4u1/index.html)
Ortak: k2ortak/{kaynak.html, fontlar.css, stil.css, ek.css, uygulama.js} + _kaynak/ses.js
Ünite: <ünite>/{veri.js, zaman.js, ses.mp3, resim/*.jpg}; gömülü okunuşlar _kaynak/ses/<ünite>.json
-> <ünite>/index.html (tam sayfa, çevrimdışı)"""
import base64, json, os, sys
O = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(O)
rd = lambda p: open(p, encoding="utf-8").read()
b64 = lambda p: base64.b64encode(open(p, "rb").read()).decode("ascii")
EN = '--en' in sys.argv
UI = json.load(open(os.path.join(O, 'en_ui.json'), encoding='utf-8')) if EN else []
def ui(t):
    for a, b in UI: t = t.replace(a, b)
    return t
for u in [a for a in sys.argv[1:] if a != '--en']:
    U = os.path.join(R, u); rdir = os.path.join(U, "resim")
    resim = {f[:-4]: "data:image/jpeg;base64," + b64(os.path.join(rdir, f)) for f in sorted(os.listdir(rdir)) if f.endswith(".jpg")} if os.path.isdir(rdir) else {}
    sesjs = rd(os.path.join(R, "_kaynak", "ses.js")); sj = os.path.join(R, "_kaynak", "ses", u + ".json")
    if os.path.exists(sj):
        m = json.load(open(sj, encoding="utf-8")); sesjs = sesjs.replace("/*__SES__*/", ",".join(json.dumps(k, ensure_ascii=False) + ":" + json.dumps(v) for k, v in m.items()))
    meta = json.loads(rd(os.path.join(U, "meta.en.json" if EN else "meta.json")))
    zaman = os.path.join(U, "zaman.js")
    src = (rd(os.path.join(O, "kaynak.html")).replace("TITLE", meta["title"]).replace("DESC", meta["desc"]).replace("ARBASLIK", meta["ar"]).replace("BASLIK", meta["baslik"])
           .replace("/*FONTLAR*/", rd(os.path.join(O, "fontlar.css"))).replace("/*STIL*/", rd(os.path.join(O, "stil.css"))).replace("/*EK*/", rd(os.path.join(O, "ek.css")))
           .replace("/*SESJS*/", sesjs).replace("/*VERI*/", rd(os.path.join(U, "veri.en.js" if EN else "veri.js"))).replace("/*ZAMAN*/", rd(zaman) if os.path.exists(zaman) else "var ZAMAN = {};")
           .replace("/*RESIM*/", "var RESIM = " + json.dumps(resim) + ";").replace("/*UYGULAMA*/", ui(rd(os.path.join(O, "uygulama.js")))))
    if EN: src = ui(src)
    sm = os.path.join(U, "ses.mp3")
    if os.path.exists(sm): src = src.replace(">SES_B64<", ">" + b64(sm) + "<", 1)
    head, rest = src.split("</style>", 1)
    OUT = os.path.join(R, "en", u) if EN else U; os.makedirs(OUT, exist_ok=True)
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(
        '<!doctype html>\n<html lang="' + ("en" if EN else "tr") + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
    print(u, round(len(src) / 1e6, 2), "MB")
