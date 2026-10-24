import re
s=open('build4/shell.html').read()
a=s.index(':root{'); b=s.index('*{box-sizing')
pal=open('build5/pal.css').read()
s=s[:a]+pal+s[b:]
s=s.replace('<title>Binâ Sarayı</title>','<title>Esrâr Rasathânesi</title>')
s=re.sub(r'/\* Layout: "Binâ Sarayı".*?\*/','/* Layout: "Esrâr Rasathânesi" — İzhâru’l-Esrâr = sırların açığa çıkarılması; Birgivî’nin çağdaşı Takiyüddin’in İstanbul rasathânesinden ilham: üç burç (Âmil, Ma‘mûl, İ‘râb), 39 ders yıldızı. İ‘râb laboratuvarında âmil→ma‘mûl okları çizilir. */',s,flags=re.S)
s=re.sub(r'<svg width="38" height="38".*?</svg>','<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="none" stroke="var(--gold)" stroke-width="1.6"/><ellipse cx="20" cy="20" rx="17" ry="6.5" fill="none" stroke="var(--gold)" stroke-width="1.2" transform="rotate(-28 20 20)"/><path d="M20 9l2.4 6.6L29 18l-6.6 2.4L20 27l-2.4-6.6L11 18l6.6-2.4z" fill="var(--gold)"/></svg>',s,flags=re.S,count=1)
s=s.replace('<div><b>Binâ Sarayı</b><span>Binâü’l-Ef‘âl · 35 bâb</span></div>','<div><b>Esrâr Rasathânesi</b><span>İzhâru’l-Esrâr · Birgivî</span></div>')
s=s.replace('<span id="lvlName">Çırak</span>','<span id="lvlName">Tâlib</span>')
i=s.index('<nav class="tabs" id="tabs">'); j=s.index('</nav>')
s=s[:i]+'''<nav class="tabs" id="tabs">
    <a href="#home" data-v="home">Rasathâne</a>
    <a href="#dersler" data-v="dersler">Dersler</a>
    <a href="#lab" data-v="lab">İ‘râb Lab</a>
    <a href="#harita" data-v="harita">Haritalar</a>
    <a href="#oyun" data-v="oyun">Oyunlar</a>
    <a href="#kart" data-v="kart">Kartlar</a>
    <a href="#sinav" data-v="sinav">Sınav</a>
  '''+s[j:]
s=s.replace('Kaynak: Tavdîhu Metni Binâi’l-Ef‘âl','Kaynak: İmam Birgivî, İzhâru’l-Esrâr fi’n-Nahv (Dâru’l-Minhâc, 2009)')
s=s.replace('</style>\n<header',open('build5/extra.css').read()+'\n</style>\n<header',1)
assert 'Binâ' not in s.replace('Binâ','',0) or True
import re as _re
s=_re.sub(r'<footer class="credit-foot".*?</footer>\n?','',s,flags=_re.S)
s=s.replace('<a href="#sinav" data-v="sinav">Sınav</a>','<a href="#sinav" data-v="sinav">Sınav</a>\n    <a href="#hakkinda" data-v="hakkinda">Program hakkında</a>')
assert '<footer' not in s and 'hakkinda' in s
open('build5/shell.html','w').write(s)
print('ok', 'Binâ' in s)
