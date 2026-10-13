# kaynak.html + veri.json -> sayfa.html (yayın) ve index.html (tek başına açılan dosya)
import json, os
d = os.path.dirname(os.path.abspath(__file__))
k = open(os.path.join(d, "kaynak.html"), encoding="utf-8").read()
v = json.load(open(os.path.join(d, "veri.json"), encoding="utf-8"))
s = k.replace("__VERI__", json.dumps(v, ensure_ascii=False))
open(os.path.join(d, "sayfa.html"), "w", encoding="utf-8").write(s)
open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(
    '<!DOCTYPE html>\n<html lang="tr">\n<head>\n<meta charset="UTF-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    '<style>body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n' + s + "\n</body>\n</html>\n")
print("ok", len(v))
