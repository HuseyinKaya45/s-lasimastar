import fs from 'fs';
const F='/tmp/claude-0/-home-user-s-lasimastar/c050627b-6159-5191-87bf-df25697f8f26/scratchpad/fonts/';
const AR='U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC';
const LA='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const LX='U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';
const list=[
 ['BAmiri',400,'x_fontsource-amiri/package/files/amiri-arabic-400-normal.woff2',AR],
 ['BAmiri',700,'x_fontsource-amiri/package/files/amiri-arabic-700-normal.woff2',AR],
 ['BKufi',600,'x_fontsource-reem-kufi/package/files/reem-kufi-arabic-600-normal.woff2',AR],
 ['BLex',400,'x_lexend/package/files/lexend-latin-400-normal.woff2',LA],
 ['BLex',400,'x_lexend/package/files/lexend-latin-ext-400-normal.woff2',LX],
 ['BLex',600,'x_lexend/package/files/lexend-latin-600-normal.woff2',LA],
 ['BLex',600,'x_lexend/package/files/lexend-latin-ext-600-normal.woff2',LX],
 ['BLex',700,'x_lexend/package/files/lexend-latin-700-normal.woff2',LA],
 ['BLex',700,'x_lexend/package/files/lexend-latin-ext-700-normal.woff2',LX],
];
let out='';
for(const [fam,w,p,r] of list){
  const b=fs.readFileSync(F+p).toString('base64');
  out+=`@font-face{font-family:'${fam}';font-style:normal;font-weight:${w};font-display:swap;src:url(data:font/woff2;base64,${b}) format('woff2');unicode-range:${r}}\n`;
}
fs.writeFileSync(process.argv[2],out);
console.log(out.length);
