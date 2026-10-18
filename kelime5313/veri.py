"""kaynak_liste.json ([no, arapça, ingilizce], kullanıcının verdiği 5313 kelime) + turkce.tsv (no<TAB>türkçe) -> veri.js"""
import json
import re
import os
here = os.path.dirname(os.path.abspath(__file__))
liste = json.load(open(os.path.join(here, "kaynak_liste.json"), encoding="utf-8"))
tr = {}
for satir in open(os.path.join(here, "turkce.tsv"), encoding="utf-8"):
    n, t = satir.rstrip("\n").split("\t")
    tr[int(n)] = t
# kaynakta sütunları kaymış ya da bozuk girdiler
DUZELT = {
    1: ("ال", "the (definite article)"),
    130: ("أب، آباء", "father"),
    226: ("صَوْت، أصوات", "voice, sound; vote"),
    1220: ("ألقى القَبْضَ على", "to arrest sb"),
    1492: ("جازَ، يَجوزُ، الجَوْز", "to be allowed, be possible ل"),
    1631: ("فازَ، يَفوزُ، الفَوْز", "to win (ب sth); to defeat على"),
    1810: ("أدخَلَ", "to insert, introduce, include sth في/إلى"),
    2545: ("مَحَبّة", "love, affection"),
    3667: ("جَدُرَ، يَجدُرُ، الجَدارة", "to be worthy, be appropriate ب"),
    3953: ("عِلاوة على", "in addition to"),
    4231: ("رَصَدَ، يَرصُدُ، الرَّصْد", "to observe, monitor; to allocate (funds)"),
}
TR_DUZELT = {1: "(harf-i tarif) belirlilik takısı: el-, -ı/-i"}
K = []
for n, ar, en in liste:
    if n in DUZELT:
        ar, en = DUZELT[n]
    ar = re.sub(r"\s+(ات|ون)$", r"، ـ\1", ar.strip())  # çoğul eki: "كِتابة ات" -> "كِتابة، ـات"
    K.append([ar, TR_DUZELT.get(n, tr[n]), en.strip()])
assert len(K) == 5313
open(os.path.join(here, "veri.js"), "w", encoding="utf-8").write(
    "var K = " + json.dumps(K, ensure_ascii=False, separators=(",", ":")).replace("],[", "],\n[") + ";\n")
print("veri.js", len(K))
