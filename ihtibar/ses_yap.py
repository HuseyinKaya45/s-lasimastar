"""Yarıyıl sınavının dinleme kayıtları (n-01 … n-06.mp3) → ses5.mp3 + zaman5.js.
Kullanım: python3 ses_yap.py <ham_klasörü>"""
import json, os, subprocess, sys, wave
here = os.path.dirname(os.path.abspath(__file__)); ham = sys.argv[1]
IZ = sorted(f[:-4] for f in os.listdir(ham) if f.endswith(".mp3"))
ofs = {}; t = 0.0; parca = []
for n in IZ:
    w = os.path.join(here, "_" + n + ".wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(ham, n + ".mp3"), "-ac", "1", "-ar", "22050", w], check=True)
    with wave.open(w) as f: d = f.getnframes() / f.getframerate()
    ofs[n] = t; t += d; parca.append(w)
with open(os.path.join(here, "_liste.txt"), "w") as f: f.writelines("file '%s'\n" % p for p in parca)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(here, "_liste.txt"), "-ac", "1", "-ar", "22050", "-b:a", "32k", os.path.join(here, "ses5.mp3")], check=True)
for p in parca + [os.path.join(here, "_liste.txt")]: os.remove(p)
P = json.load(open(os.path.join(here, "parcalar5.json"), encoding="utf-8"))
Z = {k: [[round(ofs[v[0]] + max(0, a - 0.12), 2), round(ofs[v[0]] + b + 0.18, 2)] for a, b in v[1:]] for k, v in P.items()}
open(os.path.join(here, "zaman5.js"), "w", encoding="utf-8").write("// Otomatik üretildi (ses_yap.py)\nvar ZAMAN = " + json.dumps(Z, separators=(",", ":")) + ";\n")
print(len(Z), "parça", round(t, 1), "sn")
