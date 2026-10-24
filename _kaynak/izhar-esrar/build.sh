#!/bin/bash
D=/tmp/claude-0/-home-user-s-lasimastar/c050627b-6159-5191-87bf-df25697f8f26/scratchpad/build5
OUT=/home/user/s-lasimastar/izhar-esrar/index.html
mkdir -p $(dirname $OUT)
python3 - "$D" "$OUT" <<'PY'
import sys
d,out=sys.argv[1],sys.argv[2]
sh=open(d+'/shell.html').read().replace('/*__FONTS__*/',open(d+'/fonts.css').read())
js=open(d+'/lessons.js').read()+'\n'+open(d+'/data.js').read()+'\n'+open(d+'/app.js').read()
open(d+'/all.js','w').write(js)
open(out,'w').write(sh+'\n<script>\n'+js+'\n</script>\n')
PY
node --check $D/all.js && echo OK && ls -la $OUT
