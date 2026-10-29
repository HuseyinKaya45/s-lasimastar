#!/usr/bin/env python3
"""Makalât: tek dosyalık HTML <-> veri klasörü.
  ac  <html>   : <html> içindeki gömülü veriyi _kaynak/makalat/veri/ altına açar (dizin.json, metin0..9.json) ve kabuğu (kabuk.html) yazar
  yap <cikti>  : veri + kabuk + (app.js yamaları) -> tek dosya HTML
"""
import sys, os, re, json
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, "_kaynak", "makalat", "veri")
K = os.path.join(R, "_kaynak", "makalat")
MARK = "<script>window.__GOMULU="
def ac(p):
    t = open(p, encoding="utf-8").read()
    i = t.index(MARK); e = t.index("};</script>", i) + 1
    js = t[i + len(MARK):e]
    g = json.loads(js)
    os.makedirs(D, exist_ok=True)
    for k, v in g.items():
        json.dump(v, open(os.path.join(D, k), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    open(os.path.join(K, "kabuk.html"), "w", encoding="utf-8").write(t[:i] + "@@VERI@@" + t[e + len(";</script>"):])
    print("açıldı:", len(g), "parça")
def yap(out):
    kab = open(os.path.join(K, "kabuk.html"), encoding="utf-8").read()
    g = {}
    for f in ["dizin.json"] + ["metin%d.json" % i for i in range(10)]:
        g[f] = json.load(open(os.path.join(D, f), encoding="utf-8"))
    js = json.dumps(g, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    html = kab.replace("@@VERI@@", MARK + js + ";</script>")
    open(out, "w", encoding="utf-8").write(html)
    print("yazıldı", out, round(len(html) / 1e6, 2), "MB")
if __name__ == "__main__":
    {"ac": lambda: ac(sys.argv[2]), "yap": lambda: yap(sys.argv[2])}[sys.argv[1]]()
