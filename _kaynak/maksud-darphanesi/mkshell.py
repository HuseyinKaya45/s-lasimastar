import re
D='build7/'
s=open('build5/shell.html').read()
a=s.index(':root{'); b=s.index('*{box-sizing')
s=s[:a]+open(D+'pal.css').read()+s[b:]
s=s.replace('<title>Esrâr Rasathânesi</title>','<title>Maksûd Darphânesi</title>')
s=re.sub(r'/\* Layout: "Esrâr Rasathânesi".*?\*/','/* Layout: "Maksûd Darphânesi" — masdar maden, vezin kalıp, sîga sikke. Ana sayfada sikke vitrini (dersler bakır/gümüş/altın); Darphâne’de kök basılır; İ‘lâl Ocağı’nda kelime aslından son şekline adım adım dönüşür. */',s,flags=re.S)
s=re.sub(r'<svg width="38" height="38".*?</svg>','<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="var(--gold-s)" stroke="var(--gold)" stroke-width="1.8"/><circle cx="20" cy="20" r="12.5" fill="none" stroke="var(--gold)" stroke-width="1" stroke-dasharray="2 2"/><text x="20" y="25" text-anchor="middle" font-family="BAmiri,serif" font-size="15" font-weight="700" fill="var(--gold)">ص</text></svg>',s,flags=re.S,count=1)
s=s.replace('<div><b>Esrâr Rasathânesi</b><span>İzhâru’l-Esrâr · Birgivî</span></div>','<div><b>Maksûd Darphânesi</b><span>Kitâbü’l-Maksûd · Sarf</span></div>')
s=s.replace('<span id="lvlName">Tâlib</span>','<span id="lvlName">Çırak</span>')
i=s.index('<nav class="tabs" id="tabs">'); j=s.index('</nav>')
s=s[:i]+'''<nav class="tabs" id="tabs">
    <a href="#home" data-v="home">Vitrin</a>
    <a href="#dersler" data-v="dersler">Dersler</a>
    <a href="#darp" data-v="darp">Darphâne</a>
    <a href="#ocak" data-v="ocak">İ‘lâl Ocağı</a>
    <a href="#harita" data-v="harita">Haritalar</a>
    <a href="#oyun" data-v="oyun">Oyunlar</a>
    <a href="#kart" data-v="kart">Kartlar</a>
    <a href="#sinav" data-v="sinav">Sınav</a>
    <a href="#hakkinda" data-v="hakkinda">Program hakkında</a>
  '''+s[j:]
k=s.index('/* ---- Esrâr Rasathânesi ---- */'); e=s.index('</style>')
s=s[:k]+open(D+'extra.css').read()+'\n'+s[e:]
assert '<footer' not in s and 'Rasath' not in s.replace('Rasathânesi ----','')
open(D+'shell.html','w').write(s)
print('ok')
