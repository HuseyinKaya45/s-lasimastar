"""shell.html'i Maksûd Darphânesi'nin kabuğundan üretir (ortak CSS + extra.css):
python3 _kaynak/nefy-terazisi/mkshell.py"""
import os,re
D=os.path.dirname(os.path.abspath(__file__))
s=open(os.path.join(D,'..','maksud-darphanesi','shell.html'),encoding='utf-8').read()
s=s.replace('<title>Maksûd Darphânesi</title>','<title>Nefy Terazisi</title>')
s=re.sub(r'/\* Layout: "Maksûd Darphânesi".*?\*/','/* Layout: "Nefy Terazisi" — muzâri, terazinin ortasında durur; beş edat üç kefeye düşer: mâ ve lâ merfû kefesine, len mansûb kefesine, lem ve lemmâ meczûm kefesine. Tezgâhta 14 sîga yan yana tartılır. */',s,flags=re.S)
s=re.sub(r'<svg width="38" height="38".*?</svg>','<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="var(--gold-s)" stroke="var(--gold)" stroke-width="1.6"/><path d="M20 9v21M13 30h14M9 14h22" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M9 14l-4 8a4 4 0 0 0 8 0zM31 14l-4 8a4 4 0 0 0 8 0z" fill="var(--gold)" opacity=".85"/></svg>',s,flags=re.S,count=1)
s=s.replace('<div><b>Maksûd Darphânesi</b><span>Kitâbü’l-Maksûd · Sarf</span></div>','<div><b>Nefy Terazisi</b><span>مَا · لَا · لَنْ · لَمْ · لَمَّا</span></div>')
s=s.replace('<span id="lvlName">Çırak</span>','<span id="lvlName">Mübtedi</span>')
i=s.index('<nav class="tabs" id="tabs">'); j=s.index('</nav>')
s=s[:i]+'''<nav class="tabs" id="tabs">
    <a href="#home" data-v="home">Terazi</a>
    <a href="#dersler" data-v="dersler">Dersler</a>
    <a href="#tezgah" data-v="tezgah">Tezgâh</a>
    <a href="#oyun" data-v="oyun">Oyunlar</a>
    <a href="#kart" data-v="kart">Kartlar</a>
    <a href="#sinav" data-v="sinav">Sınav</a>
    <a href="#hakkinda" data-v="hakkinda">Program hakkında</a>
  '''+s[j:]
k=s.index('/* ---- ortak bileşenler ---- */'); e=s.index('</style>')
s=s[:k]+open(os.path.join(D,'extra.css'),encoding='utf-8').read()+'\n'+s[e:]
assert 'Maksûd' not in s and 'Darph' not in s, 'eski ad kaldı'
open(os.path.join(D,'shell.html'),'w',encoding='utf-8').write(s)
print('ok')
