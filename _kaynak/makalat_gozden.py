#!/usr/bin/env python3
"""Konu/tür gözden geçirme yardımcısı.
  liste            : gözden geçirilecek yazıların sayısı
  goster <bas> <n> : sıradaki n yazıyı (bekleyenler arasından) gösterir
  uygula <json>    : {"id": ["k1","k2",..., "m|v"]} kararlarını dizine işler (bayrakları temizler)"""
import os, re, sys, json
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, "_kaynak", "makalat", "veri")
def yukle():
    dz = json.load(open(os.path.join(D, "dizin.json"), encoding="utf-8"))
    me = {}
    for i in range(10): me.update(json.load(open(os.path.join(D, "metin%d.json" % i), encoding="utf-8")))
    return dz, me
def bekleyen(dz):
    return [r for r in dz["y"] if ((r[13] or 0) & 3) or r[3][:1] == ["genel"]]
SEL = re.compile(r"^(es-)?Sel[âa]m[üu]n ?(Aley[küu]m)?[^.!?]*[.!?]\s*", re.I)
def goster(bas, n):
    dz, me = yukle(); b = bekleyen(dz); eski = dz["eski"]
    for r in b[bas:bas + n]:
        t = re.sub(r"\s+", " ", me[str(r[0])][0]).strip(); t = SEL.sub("", t)
        print("#%d [%s] k=%s alt=%s%s | eski=%s" % (r[0], r[4], ",".join(r[3]), ",".join(r[12]), (" altT=" + r[14]) if r[14] else "", ";".join(eski.get(str(x), str(x))[:18] for x in r[5])))
        print("  " + r[1][:90] + " :: " + t[:230] + (" … [%d kel]" % r[8]))
def uygula(p):
    dz, me = yukle(); kar = json.load(open(p, encoding="utf-8")); idx = {r[0]: r for r in dz["y"]}
    kod = set(json.load(open(os.path.join(R, "_kaynak", "makalat", "konular.json"), encoding="utf-8")))
    n = 0
    for id_, v in kar.items():
        r = idx[int(id_)]; k = [x for x in v if x in kod]; t = [x for x in v if x in ("m", "v")]
        assert k, id_
        r[3] = k
        if t: r[4] = t[0]
        r[13] = 0; r[12] = []; r[14] = ""; n += 1
    json.dump(dz, open(os.path.join(D, "dizin.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print("uygulandı:", n, "kalan bekleyen:", len(bekleyen(dz)))
if __name__ == "__main__":
    c = sys.argv[1]
    if c == "liste":
        dz, me = yukle(); b = bekleyen(dz); print(len(b))
    elif c == "goster": goster(int(sys.argv[2]), int(sys.argv[3]))
    elif c == "uygula": uygula(sys.argv[2])
