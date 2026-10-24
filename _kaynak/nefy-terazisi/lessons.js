/* ===== Nefy Terazisi — dersler (sâlim fiil, Emsile seviyesi) =====
   e: dersin çekim tablosu (muz = edatsız muzâri) · m: [kaynak, harekeli metin] · tr: açıklama
   ex: [misal, Türkçesi] · q: [soru, seçenekler, doğru, açıklama] */
const LESSONS=[
{id:"n1",t:"Muzârinin 14 sîgası",ar:"الْمُضَارِعُ",e:"muz",
 m:[["Emsile-i Muttaride","يَنْصُرُ، يَنْصُرَانِ، يَنْصُرُونَ، تَنْصُرُ، تَنْصُرَانِ، يَنْصُرْنَ، تَنْصُرُ، تَنْصُرَانِ، تَنْصُرُونَ، تَنْصُرِينَ، تَنْصُرَانِ، تَنْصُرْنَ، أَنْصُرُ، نَنْصُرُ"]],
 tr:`<p>Edatları öğrenmeden önce muzârinin sonlarına iyi bak. 14 sîga sonlarına göre üç gruba ayrılır:</p>
 <table class="tbl small"><tr><th>Grup</th><th>Sîgalar</th><th>Sonu</th></tr>
 <tr><td>يَنْصُرُ</td><td>هُوَ، هِيَ، أَنْتَ، أَنَا، نَحْنُ (5 sîga)</td><td>ötre</td></tr>
 <tr><td>يَنْصُرَانِ · يَنْصُرُونَ · تَنْصُرِينَ</td><td>tesniyeler, cem‘-i müzekkerler, müfred müennes muhâtaba (7 sîga)</td><td>nûn</td></tr>
 <tr><td>يَنْصُرْنَ</td><td>هُنَّ، أَنْتُنَّ (2 sîga)</td><td>cem‘-i müennes nûnu</td></tr></table>
 <p>Edatlar yalnız <b>sondaki bu kısmı</b> değiştirir; baştaki muzâri harfi (<span class="ar">يَ، تَ، أَ، نَ</span>) ve kök hiç değişmez. Birinci gruptaki ötre, edata göre üstün veya cezm olur; ikinci gruptaki nûn düşer; üçüncü gruptaki nûn ise <b>hiç düşmez</b>.</p>`,
 ex:[["يَنْصُرُ","Yardım eder / ediyor (ötre ile biter)"],["يَنْصُرُونَ","Yardım ederler (nûn ile biter)"],["يَنْصُرْنَ","Yardım ederler (kadınlar; nûnu düşmez)"]],
 q:[["Muzâri harfleri hangileridir?",["أ ت ي ن","أ ب ت ث","ل م ن و","ي و ا ن"],0,"Eteyne harfleri: أَنَا، تَ، يَ، نَحْنُ."],
    ["Hangi sîga nûn ile biter?",["تَنْصُرِينَ","تَنْصُرُ","أَنْصُرُ","نَنْصُرُ"],0,"Müfred müennes muhâtaba nûnludur."],
    ["Nûnu hiç düşmeyen sîgalar?",["هُنَّ ve أَنْتُنَّ","هُمْ ve أَنْتُمْ","هُمَا ve أَنْتُمَا","أَنَا ve نَحْنُ"],0,"Cem‘-i müennes nûnu düşmez."],
    ["تَنْصُرُ hangi iki sîgada aynıdır?",["هِيَ ve أَنْتَ","هُوَ ve أَنَا","هُمْ ve أَنْتُمْ","أَنَا ve نَحْنُ"],0,"Müfred müennes gâibe ile müfred müzekker muhâtab aynı lafızdır."]]},
{id:"n2",t:"Emsile’de beş nefy",ar:"الْأَمْثِلَةُ الْمُخْتَلِفَةُ",e:null,
 m:[["Emsile-i Muhtelife","لَمْ يَنْصُرْ، لَمَّا يَنْصُرْ، مَا يَنْصُرُ، لَا يَنْصُرُ، لَنْ يَنْصُرَ"]],
 tr:`<p>Emsile-i Muhtelife, muzârinin beş olumsuzunu bu sırayla sayar. Her birinin adı ve mânâsı ezberlenir:</p>
 <table class="tbl small"><tr><th>Kalıp</th><th>Adı</th><th>Mânâsı</th></tr>
 <tr><td>لَمْ يَنْصُرْ</td><td>Cahd-ı mutlak</td><td>yardım etmedi</td></tr>
 <tr><td>لَمَّا يَنْصُرْ</td><td>Cahd-ı müstağrak</td><td>henüz yardım etmedi</td></tr>
 <tr><td>مَا يَنْصُرُ</td><td>Nefy-i hâl</td><td>yardım etmiyor</td></tr>
 <tr><td>لَا يَنْصُرُ</td><td>Nefy-i istikbâl</td><td>yardım etmeyecek</td></tr>
 <tr><td>لَنْ يَنْصُرَ</td><td>Te’kîd-i nefy-i istikbâl</td><td>asla yardım etmeyecek</td></tr></table>
 <p><b>Cahd</b> inkâr, <b>nefy</b> olumsuzlama demektir: geçmişin olumsuzuna cahd, şimdiki ve geleceğin olumsuzuna nefy denir. Sonlara dikkat et: <span class="ar">لَمْ</span> ve <span class="ar">لَمَّا</span>’dan sonra cezm, <span class="ar">لَنْ</span>’den sonra üstün, <span class="ar">مَا</span> ve <span class="ar">لَا</span>’dan sonra ötre.</p>`,
 ex:[["لَمْ يَنْصُرْ","Yardım etmedi"],["لَمَّا يَنْصُرْ","Henüz yardım etmedi"],["مَا يَنْصُرُ","Yardım etmiyor"],["لَا يَنْصُرُ","Yardım etmeyecek"],["لَنْ يَنْصُرَ","Asla yardım etmeyecek"]],
 q:[["لَمَّا يَنْصُرْ’ın adı nedir?",["Cahd-ı müstağrak","Cahd-ı mutlak","Nefy-i hâl","Nefy-i istikbâl"],0,"Henüz yardım etmedi."],
    ["Nefy-i hâl hangisidir?",["مَا يَنْصُرُ","لَا يَنْصُرُ","لَنْ يَنْصُرَ","لَمْ يَنْصُرْ"],0,"Şimdiki zamanın olumsuzu."],
    ["Hangi ikisinden sonra fiil cezm olur?",["لَمْ ve لَمَّا","مَا ve لَا","لَنْ ve لَمْ","لَا ve لَنْ"],0,"لَمْ يَنْصُرْ · لَمَّا يَنْصُرْ"],
    ["Te’kîd-i nefy-i istikbâl hangi edatladır?",["لَنْ","لَا","مَا","لَمَّا"],0,"Asla yardım etmeyecek."]]},
{id:"n3",t:"مَا: nefy-i hâl",ar:"مَا يَنْصُرُ",e:"ma",
 m:[["Emsile-i Muhtelife","مَا يَنْصُرُ"]],
 tr:`<p><b>Mâ</b> muzârinin başına gelir ama sonunu <b>değiştirmez</b>: ötre ötre kalır, nûnlar durur. Mânâyı şimdiki zamanın olumsuzu yapar: <i>yardım etmiyor</i>.</p>
 <p>Çekimde sadece başa <span class="ar">مَا</span> eklenir: <span class="ar">مَا يَنْصُرُ، مَا يَنْصُرَانِ، مَا يَنْصُرُونَ…</span></p>`,
 ex:[["مَا يَكْتُبُ","Yazmıyor"],["مَا تَذْهَبُونَ","Gitmiyorsunuz (nûn durur)"],["مَا أَفْهَمُ","Anlamıyorum"]],
 q:[["مَا + يَذْهَبُونَ nasıl olur?",["مَا يَذْهَبُونَ","مَا يَذْهَبُوا","مَا يَذْهَبْ","مَا يَذْهَبَ"],0,"Mâ sonu değiştirmez; nûn durur."],
    ["مَا يَكْتُبُ’nün anlamı?",["Yazmıyor","Yazmadı","Asla yazmayacak","Henüz yazmadı"],0,"Nefy-i hâl."],
    ["مَا أَفْهَمُ’nün sîgası?",["Mütekellim vahde","Mütekellim ma‘a’l-gayr","Müfred müzekker muhâtab","Müfred müzekker gâib"],0,"أَ ile başlar: ben."]]},
{id:"n4",t:"لَا: nefy-i istikbâl",ar:"لَا يَنْصُرُ",e:"la",
 m:[["Emsile-i Muhtelife","لَا يَنْصُرُ"],["Kur’ân · Kâfirûn 109/2","﴿لَا أَعْبُدُ مَا تَعْبُدُونَ﴾"]],
 tr:`<p><b>Lâ</b> da muzârinin sonunu <b>değiştirmez</b>. Mânâyı geleceğin olumsuzu yapar: <i>yardım etmeyecek</i> (çoğu zaman “yardım etmez” diye de çevrilir).</p>
 <p><b>Dikkat:</b> Emsile’de bir de <b>nehy</b> vardır: <span class="ar">لَا تَنْصُرْ</span> “yardım etme!”. O lâ yasaklar ve fiili cezm eder. Farkı sonda görürsün:</p>
 <table class="tbl small"><tr><th>Nefy (sonu değişmez)</th><th>Nehy (cezm eder)</th></tr>
 <tr><td>لَا تَنْصُرُ — yardım etmeyeceksin</td><td>لَا تَنْصُرْ — yardım etme!</td></tr>
 <tr><td>لَا تَنْصُرُونَ — yardım etmeyeceksiniz</td><td>لَا تَنْصُرُوا — yardım etmeyin!</td></tr></table>`,
 ex:[["لَا أَعْبُدُ","İbadet etmem / etmeyeceğim (sonu ötre)"],["لَا يَخْرُجُونَ","Çıkmayacaklar (nûn durur)"],["لَا تَنْصُرْ","Yardım etme! (nehy, cezm)"]],
 q:[["لَا + يَخْرُجُونَ (nefy) nasıl olur?",["لَا يَخْرُجُونَ","لَا يَخْرُجُوا","لَا يَخْرُجْ","لَا يَخْرُجَ"],0,"Nefy lâsı sonu değiştirmez."],
    ["لَا تَكْتُبُونَ’deki lâ hangisidir?",["Nefy (nûn durmuş)","Nehy","Len yerine","Lem yerine"],0,"Nûn düşmemiş."],
    ["لَا تَكْتُبْ ne demektir?",["Yazma!","Yazmayacaksın","Yazmadın","Yazmıyorsun"],0,"Nehy: cezm."],
    ["Emsile’de لَا يَنْصُرُ’ın adı?",["Nefy-i istikbâl","Nefy-i hâl","Cahd-ı mutlak","Te’kîd-i nefy-i istikbâl"],0,"Geleceğin olumsuzu."]]},
{id:"n5",t:"لَنْ: te’kîd-i nefy-i istikbâl",ar:"لَنْ يَنْصُرَ",e:"len",
 m:[["Emsile-i Muhtelife","لَنْ يَنْصُرَ"],["Avâmil","لَنْ يَغْفِرَ اللهُ تَعَالَى لِلْكَافِرِينَ"]],
 tr:`<p><b>Len</b> muzâriyi <b>nasb</b> eder ve geleceği kuvvetle olumsuzlar: <i>asla yardım etmeyecek</i>.</p>
 <ul><li>Sonu ötre olan sîgalarda <b>üstün</b> olur: <span class="ar">يَنْصُرُ ← لَنْ يَنْصُرَ</span>.</li>
 <li>Nûnlu sîgalarda <b>nûn düşer</b>: <span class="ar">يَنْصُرُونَ ← لَنْ يَنْصُرُوا</span> ve <span class="ar">تَنْصُرِينَ ← لَنْ تَنْصُرِي</span>.</li>
 <li>Cem‘-i müennes <b>değişmez</b>: <span class="ar">لَنْ يَنْصُرْنَ</span>.</li></ul>
 <p>Cem‘-i müzekkerde nûn düşünce sona bir elif yazılır (okunmaz): <span class="ar">لَنْ يَنْصُرُوا</span>.</p>`,
 ex:[["لَنْ يَغْفِرَ","Asla bağışlamayacak (üstün)"],["لَنْ تَذْهَبُوا","Asla gitmeyeceksiniz (nûn düştü)"],["لَنْ يَكْتُبْنَ","Asla yazmayacaklar (kadınlar; değişmez)"]],
 q:[["لَنْ + يَكْتُبُونَ nasıl olur?",["لَنْ يَكْتُبُوا","لَنْ يَكْتُبُونَ","لَنْ يَكْتُبُونَا","لَنْ يَكْتُبْ"],0,"Nûn düşer."],
    ["لَنْ + يَكْتُبُ?",["لَنْ يَكْتُبَ","لَنْ يَكْتُبْ","لَنْ يَكْتُبُ","لَنْ يَكْتُبِ"],0,"Sonu üstün olur."],
    ["لَنْ + تَكْتُبِينَ?",["لَنْ تَكْتُبِي","لَنْ تَكْتُبِينَ","لَنْ تَكْتُبَ","لَنْ تَكْتُبْنَ"],0,"Nûn düşer."],
    ["لَنْ يَنْصُرَ’nin anlamı?",["Asla yardım etmeyecek","Yardım etmedi","Yardım etmiyor","Henüz yardım etmedi"],0,"Te’kîd-i nefy-i istikbâl."]]},
{id:"n6",t:"لَمْ: cahd-ı mutlak",ar:"لَمْ يَنْصُرْ",e:"lem",
 m:[["Emsile-i Muhtelife","لَمْ يَنْصُرْ"],["Kur’ân · Bakara 2/24","﴿فَإِنْ لَمْ تَفْعَلُوا وَلَنْ تَفْعَلُوا﴾"]],
 tr:`<p><b>Lem</b> muzâriyi <b>cezm</b> eder ve mânâsını <b>geçmişe</b> çevirir: <span class="ar">يَنْصُرُ</span> “yardım eder” iken <span class="ar">لَمْ يَنْصُرْ</span> “yardım etmedi”.</p>
 <ul><li>Sonu ötre olan sîgalarda <b>cezm</b> (sükûn) olur: <span class="ar">لَمْ يَنْصُرْ</span>.</li>
 <li>Nûnlu sîgalarda <b>nûn düşer</b>: <span class="ar">لَمْ يَنْصُرُوا</span>.</li>
 <li>Cem‘-i müennes <b>değişmez</b>: <span class="ar">لَمْ يَنْصُرْنَ</span>.</li></ul>
 <p>Nûnlu sîgalarda len ile lem aynı görünür: <span class="ar">لَنْ تَفْعَلُوا · لَمْ تَفْعَلُوا</span>. Fark edatta ve mânâdadır: “asla yapmayacaksınız” · “yapmadınız”.</p>`,
 ex:[["لَمْ يَكْتُبْ","Yazmadı (cezm)"],["لَمْ تَفْعَلُوا","Yapmadınız (nûn düştü)"],["لَمْ أَفْهَمْ","Anlamadım"]],
 q:[["لَمْ + يَكْتُبُ?",["لَمْ يَكْتُبْ","لَمْ يَكْتُبَ","لَمْ يَكْتُبُ","لَمْ يَكْتُبِ"],0,"Cezm: sükûn."],
    ["لَمْ + تَذْهَبَانِ?",["لَمْ تَذْهَبَا","لَمْ تَذْهَبَانِ","لَمْ تَذْهَبْ","لَمْ تَذْهَبَانْ"],0,"Nûn düşer."],
    ["Lem mânâyı hangi zamana çevirir?",["Geçmiş","Gelecek","Şimdiki","Emir"],0,"لَمْ يَنْصُرْ: yardım etmedi."],
    ["لَمْ يَنْصُرْنَ’de ne değişti?",["Hiçbir şey; cem‘-i müennes değişmez","Nûn düştü","Sonu üstün oldu","Sonu ötre oldu"],0,"Nûnu düşmez."]]},
{id:"n7",t:"لَمَّا: cahd-ı müstağrak",ar:"لَمَّا يَنْصُرْ",e:"lemma",
 m:[["Emsile-i Muhtelife","لَمَّا يَنْصُرْ"],["Avâmil","لَمَّا يَنْفَعْ عُمْرِي"]],
 tr:`<p><b>Lemmâ</b> da lem gibi <b>cezm</b> eder; çekimi lem ile tamamen aynıdır: <span class="ar">لَمَّا يَنْصُرْ، لَمَّا يَنْصُرَا، لَمَّا يَنْصُرُوا…</span></p>
 <p>Farkı mânâdadır. <b>Lem</b> sadece “yapmadı” der. <b>Lemmâ</b> ise olumsuzluğun konuşulan âna kadar sürdüğünü ve çoğu zaman yapılması beklendiğini bildirir: <i>henüz yardım etmedi</i>. Adındaki <i>müstağrak</i> (kaplayan) bu yüzdendir.</p>
 <table class="tbl small"><tr><th>لَمْ يَشْرَبْ</th><th>لَمَّا يَشْرَبْ</th></tr><tr><td>İçmedi.</td><td>Henüz içmedi (ama içecek).</td></tr></table>`,
 ex:[["لَمَّا يَنْفَعْ عُمْرِي","Ömrüm henüz (bana) fayda vermedi"],["لَمَّا يَخْرُجُوا","Henüz çıkmadılar (nûn düştü)"],["لَمَّا أَفْهَمْ","Henüz anlamadım"]],
 q:[["لَمَّا يَكْتُبْ’in anlamı?",["Henüz yazmadı","Yazmadı","Yazmıyor","Asla yazmayacak"],0,"Cahd-ı müstağrak."],
    ["Lemmâ’nın çekimi hangisininkiyle aynıdır?",["لَمْ","لَنْ","مَا","لَا"],0,"İkisi de cezm eder."],
    ["لَمَّا + يَخْرُجُونَ?",["لَمَّا يَخْرُجُوا","لَمَّا يَخْرُجُونَ","لَمَّا يَخْرُجْ","لَمَّا يَخْرُجَ"],0,"Nûn düşer."],
    ["“Henüz gitmedik” hangisidir?",["لَمَّا نَذْهَبْ","لَمْ نَذْهَبْ","لَنْ نَذْهَبَ","مَا نَذْهَبُ"],0,"Henüz ← lemmâ; biz ← نَ."]]},
{id:"n8",t:"Beşini birlikte tart",ar:"الْمِيزَانُ",e:"all",
 m:[["Özet","مَا يَنْصُرُ · لَا يَنْصُرُ · لَنْ يَنْصُرَ · لَمْ يَنْصُرْ · لَمَّا يَنْصُرْ"]],
 tr:`<table class="tbl small"><tr><th>Edat</th><th>Sona ne yapar?</th><th>Zaman</th><th>Türkçe</th></tr>
 <tr><td>مَا</td><td>değiştirmez</td><td>şimdiki</td><td>yardım etmiyor</td></tr>
 <tr><td>لَا</td><td>değiştirmez</td><td>gelecek</td><td>yardım etmeyecek</td></tr>
 <tr><td>لَنْ</td><td>üstün · nûn düşer</td><td>gelecek (kuvvetli)</td><td>asla yardım etmeyecek</td></tr>
 <tr><td>لَمْ</td><td>cezm · nûn düşer</td><td>geçmiş</td><td>yardım etmedi</td></tr>
 <tr><td>لَمَّا</td><td>cezm · nûn düşer</td><td>geçmişten şu âna</td><td>henüz yardım etmedi</td></tr></table>
 <p><b>Kısa yol:</b> Sonu ötre veya nûnu duruyorsa <span class="ar">مَا / لَا</span>; sonu üstünse <span class="ar">لَنْ</span>; sonu cezmse <span class="ar">لَمْ / لَمَّا</span>. Nûnlu sîgalarda len ile lem aynı görünür; o zaman mânâya bak. Cem‘-i müennes (<span class="ar">يَنْصُرْنَ</span>) beşinde de aynıdır.</p>`,
 ex:[["لَنْ يَكْتُبُوا · لَمْ يَكْتُبُوا","Aynı görünür: asla yazmayacaklar · yazmadılar"],["مَا يَكْتُبُونَ · لَا يَكْتُبُونَ","İkisinde de nûn durur: yazmıyorlar · yazmayacaklar"]],
 q:[["Hangisi fiilin sonunu değiştirmez?",["مَا","لَنْ","لَمْ","لَمَّا"],0,"Mâ ve lâ değiştirmez."],
    ["Sonu üstün olan hangisi?",["لَنْ يَفْتَحَ","لَمْ يَفْتَحْ","مَا يَفْتَحُ","لَا يَفْتَحُ"],0,"Len nasb eder."],
    ["“Henüz gelmedi” için hangi edat?",["لَمَّا","لَمْ","لَنْ","لَا"],0,"Cahd-ı müstağrak."],
    ["Mânâyı geçmişe çeviren edatlar?",["Lem ve lemmâ","Mâ ve lâ","Len ve lâ","Yalnız len"],0,"Cahd: geçmişin olumsuzu."]]}
,
{id:"n9",t:"Emr-i gâib: لِيَنْصُرْ",ar:"الْأَمْرُ الْغَائِبُ",e:"eg",
 m:[["Emsile-i Muhtelife","لِيَنْصُرْ"],["Avâmil","لِيَعْمَلْ عَمَلًا صَالِحًا"]],
 tr:`<p><b>Emir lâmı</b> (lâm-ı emr) esrelidir: <span class="ar">لِـ</span>. Muzârinin başına bitişik yazılır ve fiili <b>cezm</b> eder: <i>yardım etsin</i>.</p>
 <ul><li>Sonu ötre olan sîgalarda <b>cezm</b>: <span class="ar">لِيَنْصُرْ</span>.</li>
 <li>Nûnlu sîgalarda <b>nûn düşer</b>: <span class="ar">لِيَنْصُرُوا</span>.</li>
 <li>Cem‘-i müennes <b>değişmez</b>: <span class="ar">لِيَنْصُرْنَ</span>.</li></ul>
 <p>Emr-i gâib <b>gâib</b> (o, onlar) ve <b>mütekellim</b> (ben, biz) sîgalarında kullanılır: <span class="ar">لِيَنْصُرْ</span> “yardım etsin”, <span class="ar">لِنَنْصُرْ</span> “yardım edelim”. Muhâtaba (sen, siz) emir için emr-i hâzır kullanılır.</p>
 <p>Başına <span class="ar">وَ</span> veya <span class="ar">فَ</span> gelince lâm çoğunlukla sâkin okunur: <span class="ar">فَلْيَنْصُرْ</span>.</p>`,
 ex:[["لِيَكْتُبْ","Yazsın"],["لِيَذْهَبُوا","Gitsinler (nûn düştü)"],["لِنَشْكُرْ","Şükredelim"]],
 q:[["لِ + يَكْتُبُ?",["لِيَكْتُبْ","لِيَكْتُبُ","لِيَكْتُبَ","لِيَكْتُبِ"],0,"Emir lâmı cezm eder."],
    ["لِيَذْهَبُوا’nın anlamı?",["Gitsinler","Gitmesinler","Gitmediler","Gitmeyecekler"],0,"Emr-i gâib, cem‘."],
    ["Emr-i gâib hangi sîgalarda kullanılır?",["Gâib ve mütekellim","Yalnız muhâtab","Yalnız müfred","Bütün sîgalar, aynı lafızla"],0,"Muhâtab için emr-i hâzır var."],
    ["لِ + يَنْصُرْنَ?",["لِيَنْصُرْنَ","لِيَنْصُرْ","لِيَنْصُرْنَا","لِيَنْصُرُوا"],0,"Cem‘-i müennes değişmez."]]},
{id:"n10",t:"Emr-i hâzır: اُنْصُرْ",ar:"الْأَمْرُ الْحَاضِرُ",e:"eh",
 m:[["Emsile-i Muhtelife","اُنْصُرْ"]],
 tr:`<p>Emr-i hâzır, muhâtab (sen, siz) muzâriden <b>üç adımda</b> yapılır:</p>
 <table class="tbl small"><tr><th>Adım</th><th>Ne yapılır?</th><th>Misal</th></tr>
 <tr><td>1</td><td>Muhâtab muzâriyi al</td><td><span class="ar">تَنْصُرُ</span></td></tr>
 <tr><td>2</td><td>Muzâri harfini (<span class="ar">تَ</span>) at</td><td><span class="ar">نْصُرُ</span></td></tr>
 <tr><td>3</td><td>Sâkinle başlanmaz: başa vasıl hemzesi getir, sonu cezm et</td><td><span class="ar">اُنْصُرْ</span></td></tr></table>
 <p><b>Hemzenin harekesi</b> aynın harekesine bakar: ayn ötreliyse <span class="ar">اُ</span> (<span class="ar">اُنْصُرْ، اُكْتُبْ</span>); esreli veya üstünse <span class="ar">اِ</span> (<span class="ar">اِضْرِبْ، اِفْتَحْ، اِعْلَمْ</span>).</p>
 <p>Sonu lem gibidir: nûnlar düşer (<span class="ar">اُنْصُرُوا، اُنْصُرِي</span>), cem‘-i müennes değişmez (<span class="ar">اُنْصُرْنَ</span>). Sadece altı muhâtab sîgası vardır.</p>`,
 ex:[["اُكْتُبْ","Yaz (ayn ötreli: اُ)"],["اِجْلِسُوا","Oturun (ayn esreli: اِ)"],["اِفْهَمِي","Anla (kadın; ayn üstün: اِ)"]],
 q:[["تَكْتُبُ’den emr-i hâzır?",["اُكْتُبْ","اِكْتُبْ","تَكْتُبْ","اُكْتُبُ"],0,"Ayn ötreli: اُ; sonu cezm."],
    ["تَضْرِبُ’dan emr-i hâzır?",["اِضْرِبْ","اُضْرِبْ","اَضْرِبْ","اِضْرِبُ"],0,"Ayn esreli: اِ."],
    ["تَفْتَحُونَ’dan emr-i hâzır?",["اِفْتَحُوا","اِفْتَحُونَ","اُفْتُحُوا","اِفْتَحْ"],0,"Nûn düşer; ayn üstün: اِ."],
    ["Emr-i hâzır yapılırken atılan harf?",["Muzâri harfi","Aynü’l-fiil","Lâmü’l-fiil","Fâü’l-fiil"],0,"تَنْصُرُ → نْصُرُ"]]},
{id:"n11",t:"Nehy: لَا تَنْصُرْ",ar:"النَّهْيُ",e:"nh",
 m:[["Emsile-i Muhtelife","لَا يَنْصُرْ · لَا تَنْصُرْ"],["Kur’ân · Tevbe 9/40","﴿لَا تَحْزَنْ إِنَّ اللّٰهَ مَعَنَا﴾"]],
 tr:`<p><b>Nehy</b> yasaklamaktır. <b>Lâ-yı nâhiye</b> muzârinin başına gelir ve fiili <b>cezm</b> eder; sonlar lem’deki gibidir.</p>
 <ul><li><b>Nehy-i hâzır</b>: <span class="ar">لَا تَنْصُرْ</span> “yardım etme”, <span class="ar">لَا تَنْصُرُوا</span> “yardım etmeyin”.</li>
 <li><b>Nehy-i gâib</b>: <span class="ar">لَا يَنْصُرْ</span> “yardım etmesin”, <span class="ar">لَا يَنْصُرُوا</span> “yardım etmesinler”.</li></ul>
 <p><b>Nefy lâsı ile karıştırma:</b> İkisi de <span class="ar">لَا</span> yazılır; farkı sondadır.</p>
 <table class="tbl small"><tr><th>Nefy (değiştirmez)</th><th>Nehy (cezm eder)</th></tr>
 <tr><td><span class="ar">لَا تَنْصُرُ</span> yardım etmeyeceksin</td><td><span class="ar">لَا تَنْصُرْ</span> yardım etme</td></tr>
 <tr><td><span class="ar">لَا تَنْصُرُونَ</span> yardım etmeyeceksiniz</td><td><span class="ar">لَا تَنْصُرُوا</span> yardım etmeyin</td></tr>
 <tr><td><span class="ar">لَا تَنْصُرْنَ</span> yardım etmeyeceksiniz</td><td><span class="ar">لَا تَنْصُرْنَ</span> yardım etmeyin</td></tr></table>
 <p>Cem‘-i müennesde ikisi aynı görünür; o zaman cümlenin mânâsına bakılır.</p>`,
 ex:[["لَا تَحْزَنْ","Üzülme (sonu cezm)"],["لَا تَذْهَبُوا","Gitmeyin (nûn düştü)"],["لَا يَخْرُجْ","Çıkmasın (nehy-i gâib)"]],
 q:[["لَا تَكْتُبْ’in anlamı?",["Yazma","Yazmayacaksın","Yazmadın","Yazmıyorsun"],0,"Nehy: cezm."],
    ["“Gitmeyin” hangisidir?",["لَا تَذْهَبُوا","لَا تَذْهَبُونَ","لَمْ تَذْهَبُوا","لَنْ تَذْهَبُوا"],0,"Nehy-i hâzır, cem‘: nûn düşer."],
    ["لَا يَخْرُجْ hangisidir?",["Nehy-i gâib","Nehy-i hâzır","Nefy-i istikbâl","Emr-i gâib"],0,"Gâib muzâri + lâ-yı nâhiye."],
    ["لَا تَفْتَحُونَ’deki lâ?",["Nefy lâsı (nûn durmuş)","Nehy lâsı","Emir lâmı","Lem yerine"],0,"Nûn düşmemiş: sonu değişmemiş."]]}
];
