import os
D=os.path.dirname(os.path.abspath(__file__)); R=os.path.dirname(os.path.dirname(D))
r=lambda f:open(os.path.join(D,f),encoding="utf-8").read()
js="".join(r(f)+"\n" for f in ["veri_ders.js","veri_etkinlik.js","veri_senaryo.js","veri_konu.js","veri_sinav.js","veri_kart.js","uygulama.js"])
html=r("kabuk.html").replace("/*CSS*/",r("stil.css")).replace("/*JS*/",js.replace("</script","<\\/script"))
out=os.path.join(R,"ceh-bolum1"); os.makedirs(out,exist_ok=True)
open(os.path.join(out,"index.html"),"w",encoding="utf-8").write(html); print(len(html)//1024,"KB")
