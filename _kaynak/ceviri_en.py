#!/usr/bin/env python3
"""el-Arabiyyetü beyne yedeyk programlarının Türkçe metinlerini İngilizceye çevirir (Claude Message Batches API, claude-sonnet-5-5).

Akış (ayrıntı: _kaynak/ceviri_en/README.md):
  python3 _kaynak/ceviri_en.py hazirla            # metinleri çıkarır, maliyet tahmini verir (ücretsiz, API'ye bağlanmaz)
  python3 _kaynak/ceviri_en.py gonder             # önizleme; hiçbir şey göndermez
  python3 _kaynak/ceviri_en.py gonder --evet      # batch'i gerçekten gönderir (ÜCRETLİ)
  python3 _kaynak/ceviri_en.py durum              # batch durumu
  python3 _kaynak/ceviri_en.py indir              # biten sonuçları doğrulayıp kaydeder
  python3 _kaynak/ceviri_en.py gonder --evet --kucuk   # eksik/hatalı kalanları küçük parçalarla yeniden dener
  python3 _kaynak/ceviri_en.py yaz                # tamamlanan üniteler için <ünite>/veri.en.js, meta.en.json, ceviri.en.json
  python3 _kaynak/ceviri_en.py derle              # en/<ünite>/index.html üretir (k2ortak/yap.py --en)

API anahtarı: ANTHROPIC_API_KEY ortam değişkeni (ya da `ant auth login`). Kütüphane: pip install anthropic"""
import argparse, datetime, json, os, re, subprocess, sys, tempfile

K = os.path.dirname(os.path.abspath(__file__)); R = os.environ.get("CEVIRI_KOK") or os.path.dirname(K)     # CEVIRI_KOK/CEVIRI_DURUM: yalnızca deneme için
D = os.path.join(K, "ceviri_en"); S = os.environ.get("CEVIRI_DURUM") or os.path.join(D, "durum"); os.makedirs(S, exist_ok=True)
MODEL = "claude-sonnet-5-5"
BATCH_IN, BATCH_OUT = 1.00, 5.00            # $/1M token: Sonnet 5.5 standart 2/10 dolar, Batch %50 indirim
CH_MAX, CH_N = 7000, 60                     # parça başına en çok karakter / metin (normal)
CH_MAX_K, CH_N_K = 2500, 10                 # --kucuk: yeniden deneme parçaları
AR = r"؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿"
RE_AR = re.compile(f"[{AR}]+")
RE_TR_ONLY = re.compile(r"[çğışİÇĞŞ]")       # yalnızca Türkçede olan harfler: çıktıda kalmamalı

# ---------------------------------------------------------------- yardımcılar
def jl(p, d=None):
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else d
def js(p, o):
    json.dump(o, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
def birimler(secim=None, kitap=None):
    out = []
    for n in os.listdir(R):
        m = re.fullmatch(r"k(\d)([a-z]+)(\d*)", n)
        if m and os.path.exists(os.path.join(R, n, "veri.js")) and os.path.exists(os.path.join(R, n, "meta.json")):
            if secim and n not in secim: continue
            if kitap and m.group(1) not in kitap: continue
            out.append((int(m.group(1)), m.group(2) != "u", m.group(2), int(m.group(3) or 0), n))
    return [x[-1] for x in sorted(out)]
LIT = re.compile(r'"((?:[^"\\]|\\.)*)"')
def dec(raw):
    try: return json.loads('"' + raw + '"')
    except Exception: return None
def enc(s):
    return json.dumps(s, ensure_ascii=False)[1:-1]
def yapisal(u):
    """Çevrilmemesi gereken kimlikler: resim adları ve ses parçası anahtarları."""
    z = os.path.join(R, u, "zaman.js"); rs = os.path.join(R, u, "resim")
    ids = set(re.findall(r'"([^"]+)"\s*:', open(z, encoding="utf-8").read())) if os.path.exists(z) else set()
    if os.path.isdir(rs): ids |= {f.rsplit(".", 1)[0] for f in os.listdir(rs)}
    return ids
def cevrilir(d, pre, ids):
    if d is None or not re.search(r"[A-Za-zçğışöüÇĞİŞÖÜ]{2}", d): return False      # Latin harf yoksa (salt Arapça, işaret) dokunma
    if d in ids or re.search(r"(\bt|pfx|etiketId):\s*$", pre): return False          # blok türü, ön ek, kimlik
    if re.fullmatch(r"[A-Za-z0-9_:.\-]+", d) and re.search(r"[0-9_:]", d): return False   # d1-2, n_burger, k4u1:
    return True
def tara(u, fn):
    """veri.js'te her çevrilecek metne fn(decoded) uygular; fn None dönerse metne dokunmaz. Dönüş: (yeni metin, metinler)."""
    ids = yapisal(u); bul = []; satirlar = []
    for line in open(os.path.join(R, u, "veri.js"), encoding="utf-8").read().split("\n"):
        if line.lstrip().startswith("//"): satirlar.append(line); continue
        out, son = [], 0
        for m in LIT.finditer(line):
            d = dec(m.group(1)); pre = line[max(0, m.start() - 12):m.start()]
            out.append(line[son:m.start()]); son = m.end()
            if cevrilir(d, pre, ids):
                bul.append(d); y = fn(d)
                out.append('"' + enc(y) + '"' if y is not None else m.group(0))
            else: out.append(m.group(0))
        out.append(line[son:]); satirlar.append("".join(out))
    return "\n".join(satirlar), bul
META = ("title", "desc", "baslik")
def meta_metin(u):
    m = jl(os.path.join(R, u, "meta.json")); return [m[k] for k in META if k in m]

# ---------------------------------------------------------------- istem
def sistem_istemi():
    soz = jl(os.path.join(D, "sozluk.json"), [])
    ornek = []
    for tr, en in jl(os.path.join(R, "k4u1", "ceviri.en.json"), []):
        if 20 < len(tr) < 200 and not RE_AR.search(tr) and len(ornek) < 10: ornek.append({"tr": tr, "en": en})
        elif RE_AR.search(tr) and len(tr) < 220 and sum(1 for e in ornek if RE_AR.search(e["tr"])) < 3: ornek.append({"tr": tr, "en": en})
    return f"""You translate the Turkish-language apparatus of an Arabic-language textbook program into English.

CONTEXT. The programs teach Arabic to Turkish-speaking students with the textbook series "al-ʿArabiyya bayna yadayk" (Arabic Between Your Hands). Every page shows Arabic texts, plus Turkish help: translations of the Arabic texts, exercise instructions, explanations, grammar notes, vocabulary glosses and short answers. You translate ONLY the Turkish. The English edition keeps the same Arabic and shows English help instead.

INPUT: a JSON object {{"unit": "...", "strings": [...]}}. OUTPUT: a JSON object {{"translations": [...]}} with exactly one English string for every input string, in the same order. Output nothing else.

RULES
1. Arabic-script text anywhere in a string must be copied EXACTLY, letter for letter and diacritic for diacritic. Never translate, transliterate, correct or re-vocalise it, and keep it at the same place in the sentence.
2. If a string contains no Turkish (only Arabic, symbols, a name, or an identifier), return it unchanged.
3. Preserve markup and symbols exactly: [[...]] emphasis markers, ___ blanks, « » and “ ” quotes, ↔ → ✓ ✗, numbering like "1-" or "1)", parentheses, ellipses (…), and digits. Do not add, drop or merge sentences.
4. Short strings are glosses or labels (a word meaning, a heading, an answer option): give the most natural short English equivalent, keep comma-separated alternatives, lower-case unless the Turkish is capitalised. For a gloss of an Arabic word, give a concise dictionary-style gloss.
5. Style: clear, neutral textbook English for learners. Instructions in the imperative ("Listen first, then answer the questions."). Translate the Turkish rendering of Qur'an and hadith texts into dignified plain English; never invent verse or hadith references.
6. Terminology: follow the GLOSSARY exactly. For people and places use the standard English Islamic transliteration with one fixed spelling (Abū Bakr, ʿUmar, ʿAlī, Muhammad, Khadīja, Mecca, Medina, Uḥud, Badr, Quraysh …); "b." in a name is "ibn". Honorifics follow the glossary ((s.a.v.) → (pbuh) etc.).
7. Do not explain, comment, or add notes. If a Turkish string looks truncated or odd, translate what is there.

GLOSSARY (Turkish → English), JSON:
{json.dumps(soz, ensure_ascii=False)}

EXAMPLES of the expected style (Turkish → English), JSON:
{json.dumps(ornek, ensure_ascii=False)}"""
SEMA = {"type": "object", "properties": {"translations": {"type": "array", "items": {"type": "string"}}},
        "required": ["translations"], "additionalProperties": False}
def istek_parametreleri(model, birim, metinler, sistem, adaptif=False):
    p = dict(model=model, max_tokens=16000,
             system=[{"type": "text", "text": sistem, "cache_control": {"type": "ephemeral"}}],
             messages=[{"role": "user", "content": json.dumps({"unit": birim, "strings": metinler}, ensure_ascii=False)}],
             output_config={"effort": "low", "format": {"type": "json_schema", "schema": SEMA}})
    if model == "claude-sonnet-5-5" and not adaptif: p["thinking"] = {"type": "between_tools"}      # düşünmesiz: çeviri için gerekmez (--adaptif: düşük efor + uyarlanır düşünme)
    elif model != "claude-sonnet-5-5": p["output_config"]["effort"] = "medium"
    return p

# ---------------------------------------------------------------- doğrulama
def dogrula(kaynak, ceviri):
    """Sorun varsa gerekçe (str), yoksa None."""
    if not isinstance(ceviri, str) or (kaynak.strip() and not ceviri.strip()): return "boş"
    ka, ca = RE_AR.findall(kaynak), RE_AR.findall(ceviri)
    if sorted(ka) != sorted(ca): return "Arapça metin değişmiş"
    if kaynak.count("[[") != ceviri.count("[[") or kaynak.count("___") != ceviri.count("___"): return "işaret/boşluk sayısı"
    if not set(re.findall(r"\d+", RE_AR.sub("", kaynak))) <= set(re.findall(r"\d+", RE_AR.sub("", ceviri))): return "sayılar"   # kaynakta rakamla yazılan sayı çıktıda da bulunmalı
    if RE_TR_ONLY.search(RE_AR.sub("", ceviri)): return "Türkçe harf kalmış"
    if len(RE_AR.sub("", kaynak)) > 40 and len(ceviri) < 0.25 * len(kaynak): return "çok kısa"
    return None

# ---------------------------------------------------------------- komutlar
def paketle(ogeler, kucuk):
    mx, mn = (CH_MAX_K, CH_N_K) if kucuk else (CH_MAX, CH_N)
    out, cur, c, b = [], [], 0, None
    for o in ogeler:
        if cur and (o["birim"] != b or c + len(o["tr"]) > mx or len(cur) >= mn): out.append((b, cur)); cur, c = [], 0
        cur.append(o["tr"]); c += len(o["tr"]); b = o["birim"]
    if cur: out.append((b, cur))
    return out
def tahmin(parcalar, sistem):
    ik = ok = 0
    for _, ms in parcalar:
        ar = sum(len("".join(RE_AR.findall(m))) for m in ms); lat = sum(len(m) for m in ms) - ar
        ik += lat / 3.0 + ar / 1.5 + 30; ok += lat / 3.0 * 0.9 + ar / 1.5 + 20
    sis = len(parcalar) * len(sistem) / 3.5
    return ik, ok, sis
def cmd_hazirla(a):
    ogeler, gor, sonuc = [], set(), jl(os.path.join(S, "sonuc.json"), {})
    for u in birimler(a.birim, a.kitap):
        if os.path.exists(os.path.join(R, u, "veri.en.js")) and not a.hepsi:
            for tr, en in jl(os.path.join(R, u, "ceviri.en.json"), []): sonuc.setdefault(tr, en)
            continue
        metinler = meta_metin(u); _, bul = tara(u, lambda d: None)
        for d in metinler + bul:
            if d not in gor: gor.add(d); ogeler.append({"tr": d, "birim": u})
    js(os.path.join(S, "ogeler.json"), ogeler); js(os.path.join(S, "sonuc.json"), sonuc)
    bekleyen = [o for o in ogeler if o["tr"] not in sonuc]
    sistem = sistem_istemi(); parcalar = paketle(bekleyen, False); ik, ok, sis = tahmin(parcalar, sistem)
    ub = sorted({o["birim"] for o in ogeler})
    print(f"{len(ub)} birim, {len(ogeler)} benzersiz metin ({sum(len(o['tr']) for o in ogeler):,} karakter); {len(ogeler) - len(bekleyen)} tanesi zaten çevrilmiş (pilot/önceki).")
    print(f"Çevrilecek: {len(bekleyen)} metin → {len(parcalar)} istek.")
    print(f"Tahmini token: giriş ≈ {(ik + sis)/1e6:.2f} M (istem dahil {sis/1e6:.2f} M), çıkış ≈ {ok/1e6:.2f} M")
    lo = ((ik + sis) * BATCH_IN + ok * BATCH_OUT) / 1e6
    print(f"Tahmini maliyet (Sonnet 5.5, Batch): ≈ ${lo:.2f}   (olası aralık ${lo*0.7:.2f} – ${lo*1.5:.2f}; istem önbelleğe alınırsa biraz düşer)")
def bekleyenler():
    ogeler = jl(os.path.join(S, "ogeler.json"), []); sonuc = jl(os.path.join(S, "sonuc.json"), {})
    return [o for o in ogeler if o["tr"] not in sonuc]
def istemci():
    try: import anthropic
    except ImportError: sys.exit("anthropic kütüphanesi yok: pip install anthropic")
    return anthropic.Anthropic()
def cmd_gonder(a):
    bek = bekleyenler()
    if not bek: print("Bekleyen metin yok (ya `hazirla` çalıştırılmadı ya da hepsi çevrildi)."); return
    sistem = sistem_istemi(); parcalar = paketle(bek, a.kucuk); model = a.model or MODEL
    ik, ok, sis = tahmin(parcalar, sistem); lo = ((ik + sis) * BATCH_IN + ok * BATCH_OUT) / 1e6
    print(f"{len(bek)} metin, {len(parcalar)} istek, model {model}. Tahmini maliyet ≈ ${lo:.2f} (Batch).")
    bs0 = jl(os.path.join(S, "batches.json"), []); sayi = len(bs0)
    if any(not b["islendi"] for b in bs0) and not a.zorla: sys.exit("İşlenmemiş batch var (aynı metinleri iki kez göndermemek için): önce `durum` ve `indir` çalıştırın; yine de göndermek için --zorla.")
    istekler = [(f"b{sayi + 1}-{i:04d}", u, ms) for i, (u, ms) in enumerate(parcalar)]
    js(os.path.join(S, "ornek_istek.json"), {"custom_id": istekler[0][0], "params": istek_parametreleri(model, istekler[0][1], istekler[0][2], sistem, a.adaptif)})
    if not a.evet: print("Önizleme: ilk istek durum/ornek_istek.json içinde. Göndermek için --evet ekleyin (ücretli)."); return
    from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
    from anthropic.types.messages.batch_create_params import Request
    c = istemci()
    reqs = [Request(custom_id=i, params=MessageCreateParamsNonStreaming(**istek_parametreleri(model, u, ms, sistem, a.adaptif))) for i, u, ms in istekler]
    b = c.messages.batches.create(requests=reqs)
    bs = jl(os.path.join(S, "batches.json"), [])
    bs.append({"id": b.id, "model": model, "olusturma": datetime.datetime.now().isoformat(timespec="seconds"), "islendi": False,
               "istekler": {i: {"birim": u, "metinler": ms} for i, u, ms in istekler}})
    js(os.path.join(S, "batches.json"), bs); print("Batch gönderildi:", b.id, "—", b.processing_status, "· en geç 24 saat; çoğu 1 saatte biter. `durum` ile izleyin.")
def cmd_durum(a):
    c = istemci()
    for b in jl(os.path.join(S, "batches.json"), []):
        x = c.messages.batches.retrieve(b["id"]); n = x.request_counts
        print(f"{b['id']}  {x.processing_status:10s} işleniyor {n.processing} · başarılı {n.succeeded} · hatalı {n.errored} · iptal {n.canceled} · süresi dolan {n.expired}  {'(işlendi)' if b['islendi'] else ''}")
def cmd_indir(a):
    c = istemci(); bs = jl(os.path.join(S, "batches.json"), []); sonuc = jl(os.path.join(S, "sonuc.json"), {}); sorun = jl(os.path.join(S, "sorunlar.json"), {})
    for b in bs:
        if b["islendi"]: continue
        if c.messages.batches.retrieve(b["id"]).processing_status != "ended": print(b["id"], "henüz bitmedi."); continue
        ok = kotu = 0
        for r in c.messages.batches.results(b["id"]):
            iste = b["istekler"].get(r.custom_id)
            if not iste: continue
            ms = iste["metinler"]
            if r.result.type != "succeeded":
                for m in ms: sorun[m] = r.result.type + (f":{r.result.error.type}" if r.result.type == "errored" else ""); kotu += 1
                continue
            msg = r.result.message
            if msg.stop_reason != "end_turn":
                for m in ms: sorun[m] = f"stop_reason={msg.stop_reason}" + (f":{getattr(msg.stop_details, 'category', '')}" if msg.stop_reason == "refusal" else ""); kotu += 1
                continue
            try:
                tr = json.loads(next(x.text for x in msg.content if x.type == "text"))["translations"]
                assert len(tr) == len(ms)
            except Exception:
                for m in ms: sorun[m] = "çıktı biçimi/uzunluk"; kotu += 1
                continue
            for m, e in zip(ms, tr):
                g = dogrula(m, e)
                if g is None: sonuc[m] = e; sorun.pop(m, None); ok += 1
                else: sorun[m] = g; kotu += 1
        b["islendi"] = True; print(f"{b['id']}: {ok} metin kabul edildi, {kotu} sorunlu (yeniden denenecek).")
    js(os.path.join(S, "sonuc.json"), sonuc); js(os.path.join(S, "sorunlar.json"), sorun); js(os.path.join(S, "batches.json"), bs)
    bek = bekleyenler(); print(f"Kalan: {len(bek)} metin." + (" Yeniden denemek için: gonder --evet --kucuk" if bek else " Hepsi tamam; sıra `yaz` komutunda."))
def cmd_yaz(a):
    sonuc = jl(os.path.join(S, "sonuc.json"), {}); yazilan, eksik = [], {}
    for u in birimler(a.birim, a.kitap):
        yol = os.path.join(R, u)
        if os.path.exists(os.path.join(yol, "veri.en.js")) and not a.hepsi: continue
        yeni, bul = tara(u, lambda d: sonuc.get(d))
        lack = [d for d in bul if d not in sonuc] + [d for d in meta_metin(u) if d not in sonuc]
        if lack: eksik[u] = len(lack); continue
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t: t.write(yeni)
        if subprocess.run(["node", "--check", t.name], capture_output=True).returncode: eksik[u] = -1; os.unlink(t.name); continue
        os.unlink(t.name)
        open(os.path.join(yol, "veri.en.js"), "w", encoding="utf-8").write(yeni)
        m = jl(os.path.join(yol, "meta.json")); me = {k: (sonuc[m[k]] if k in META and m.get(k) in sonuc else m[k]) for k in m}
        js(os.path.join(yol, "meta.en.json"), me)
        js(os.path.join(yol, "ceviri.en.json"), [[d, sonuc[d]] for d in dict.fromkeys(bul + meta_metin(u))])
        kal = [x for x in re.findall(r'"((?:[^"\\]|\\.)*)"', yeni) if RE_TR_ONLY.search(RE_AR.sub("", dec(x) or ""))]
        yazilan.append(u); print(u, "yazıldı" + (f" — dikkat, {len(kal)} metinde Türkçe harf var" if kal else ""))
    print(f"{len(yazilan)} birim yazıldı." + (f" Eksik/hatalı: {eksik}" if eksik else ""))
def cmd_derle(a):
    ub = [u for u in birimler(a.birim, a.kitap) if os.path.exists(os.path.join(R, u, "veri.en.js"))]
    for i in range(0, len(ub), 8): subprocess.run([sys.executable, os.path.join(R, "k2ortak", "yap.py"), "--en", *ub[i:i + 8]], check=True)

if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0]); sp = ap.add_subparsers(dest="c", required=True)
    for ad, f in [("hazirla", cmd_hazirla), ("gonder", cmd_gonder), ("durum", cmd_durum), ("indir", cmd_indir), ("yaz", cmd_yaz), ("derle", cmd_derle)]:
        p = sp.add_parser(ad); p.set_defaults(f=f)
        if ad in ("hazirla", "yaz", "derle"): p.add_argument("--birim", nargs="*"); p.add_argument("--kitap", nargs="*"); p.add_argument("--hepsi", action="store_true", help="çevirisi olan birimleri de yeniden işle")
        if ad == "gonder": p.add_argument("--evet", action="store_true", help="batch'i gerçekten gönder (ücretli)"); p.add_argument("--kucuk", action="store_true"); p.add_argument("--model"); p.add_argument("--adaptif", action="store_true", help="between_tools yerine uyarlanır düşünme"); p.add_argument("--zorla", action="store_true")
    a = ap.parse_args(); a.f(a)
