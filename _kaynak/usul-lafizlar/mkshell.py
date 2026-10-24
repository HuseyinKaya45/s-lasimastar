import re
D='build6/'
s=open('build5/shell.html').read()
a=s.index(':root{'); b=s.index('*{box-sizing')
s=s[:a]+open(D+'pal.css').read()+s[b:]
s=s.replace('<title>Esrâr Rasathânesi</title>','<title>Lafız Pusulası</title>')
s=re.sub(r'/\* Layout: "Esrâr Rasathânesi".*?\*/','/* Layout: "Lafız Pusulası" — Hanefî usulünün dört ayrımı bir pusulanın dört yönü: Kuzey vaz‘, Doğu isti‘mâl, Güney açıklık-kapalılık, Batı delâlet şekli. Nass Tahlil Masası, açıklık merdiveni, haml matrisi ve kuvvet terazisi. */',s,flags=re.S)
s=re.sub(r'<svg width="38" height="38".*?</svg>','<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="none" stroke="var(--gold)" stroke-width="1.6"/><path d="M20 4l3 13-3 3-3-3z" fill="var(--g1)"/><path d="M36 20l-13 3-3-3 3-3z" fill="var(--g2)"/><path d="M20 36l-3-13 3-3 3 3z" fill="var(--g3)"/><path d="M4 20l13-3 3 3-3 3z" fill="var(--g4)"/><circle cx="20" cy="20" r="2.2" fill="var(--gold)"/></svg>',s,flags=re.S,count=1)
s=s.replace('<div><b>Esrâr Rasathânesi</b><span>İzhâru’l-Esrâr · Birgivî</span></div>','<div><b>Lafız Pusulası</b><span>İslâm Hukuku · İstinbât Metodları</span></div>')
i=s.index('<nav class="tabs" id="tabs">'); j=s.index('</nav>')
s=s[:i]+'''<nav class="tabs" id="tabs">
    <a href="#home" data-v="home">Pusula</a>
    <a href="#dersler" data-v="dersler">Dersler</a>
    <a href="#lab" data-v="lab">Tahlil Masası</a>
    <a href="#terazi" data-v="terazi">Terazi</a>
    <a href="#oyun" data-v="oyun">Oyunlar</a>
    <a href="#kart" data-v="kart">Kartlar</a>
    <a href="#sinav" data-v="sinav">Sınav</a>
    <a href="#hakkinda" data-v="hakkinda">Program hakkında</a>
  '''+s[j:]
k=s.index('/* ---- Esrâr Rasathânesi ---- */'); e=s.index('</style>')
s=s[:k]+open(D+'extra.css').read()+'\n'+s[e:]
assert '<footer' not in s and 'Esrâr' not in s and 'Rasath' not in s, [m.start() for m in re.finditer('Esrâr|Rasath',s)]
open(D+'shell.html','w').write(s)
print('ok')
