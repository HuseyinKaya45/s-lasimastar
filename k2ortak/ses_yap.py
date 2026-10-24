"""Ders kayıtlarını (ham/*.mp3) tek ses.mp3 dosyasında birleştirir, parça zamanlarını zaman.js’e yazar.
Kullanım: python3 k2ortak/ses_yap.py <ünite_klasörü> <ham_klasörü>  (parçalar <ünite>/parcalar.json içinde)"""
import json, os, subprocess, sys, wave
here = os.path.abspath(sys.argv[1]); ham = sys.argv[2]
IZ = sorted([f[:-4] for f in os.listdir(ham) if f.endswith(".mp3")], key=lambda n: int(n.split("-")[1]))
tmp = os.path.join(here, "_birlesik.wav"); ofs = {}; t = 0.0; parca = []
for n in IZ:
    w = os.path.join(here, "_" + n + ".wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(ham, n + ".mp3"), "-ac", "1", "-ar", "22050", w], check=True)
    with wave.open(w) as f: d = f.getnframes() / f.getframerate()
    ofs[n] = t; t += d; parca.append(w)
with open(os.path.join(here, "_liste.txt"), "w") as f: f.writelines("file '%s'\n" % p for p in parca)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(here, "_liste.txt"), "-ac", "1", "-ar", "22050", "-b:a", "32k", os.path.join(here, "ses.mp3")], check=True)
for p in parca + [os.path.join(here, "_liste.txt")]: os.remove(p)
P = json.load(open(os.path.join(here, "parcalar.json"), encoding="utf-8"))
Z = {}
for k, (n, *seg) in P.items():
    if isinstance(seg[0], list): Z[k] = [[round(ofs[n] + max(0, a - 0.12), 2), round(ofs[n] + b + 0.18, 2)] for a, b in seg]
    else: Z[k] = [[round(ofs[n] + max(0, seg[0] - 0.12), 2), round(ofs[n] + seg[1] + 0.18, 2)]]
open(os.path.join(here, "zaman.js"), "w", encoding="utf-8").write("// Otomatik üretildi (ses_yap.py): parça kimliği -> [[başlangıç, bitiş], ...] saniye, ses.mp3 içinde\nvar ZAMAN = " + json.dumps(Z, ensure_ascii=False, separators=(",", ":")) + ";\nvar SES_SURE = " + str(round(t, 2)) + ";\n")
print(len(Z), "parça, toplam", round(t, 1), "sn")
