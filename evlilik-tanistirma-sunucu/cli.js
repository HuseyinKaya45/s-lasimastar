#!/usr/bin/env node
'use strict';
/**
 * Yönetim komutları:
 *   node cli.js keygen                       Yeni veri şifreleme anahtarı üretir
 *   node cli.js init-admin                   İlk yöneticiyi oluşturur (parola: INIT_ADMIN_PASSWORD veya istem)
 *   node cli.js backup [dosya]               Tutarlı veritabanı yedeği (VACUUM INTO)
 *   node cli.js verify-audit                 Denetim günlüğü zincirini doğrular; başın özetini yazar
 *   node cli.js rekey                        Tüm aday kayıtlarını geçerli (DATA_KEY_ID) anahtarla yeniden şifreler
 */
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const crypto = require('node:crypto');
const { loadConfig } = require('./lib/config');
const C = require('./lib/crypto');
const DBL = require('./lib/db');
const { createService } = require('./lib/service');

function promptHidden(q) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = function (s) { if (s.includes(q)) process.stdout.write(s); else if (/\r|\n/.test(s)) process.stdout.write('\n'); };
    rl.question(q, (a) => { rl.close(); resolve(a); });
  });
}
const prompt = (q) => new Promise((resolve) => { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); rl.question(q, (a) => { rl.close(); resolve(a); }); });

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === 'keygen') {
    const k = crypto.randomBytes(32).toString('base64');
    console.log('# .env dosyanıza (ya da ortam değişkenlerine) ekleyin. Anahtarı güvenli bir yerde ayrıca saklayın;');
    console.log('# anahtarsız veritabanı yedeği okunamaz, anahtar kaybolursa veriler kurtarılamaz.');
    console.log(`DATA_KEYS=1:${k}`);
    console.log('DATA_KEY_ID=1');
    return;
  }
  if (!cmd || !['init-admin', 'backup', 'verify-audit', 'rekey'].includes(cmd)) {
    console.log('Kullanım: node cli.js <keygen|init-admin|backup|verify-audit|rekey>'); process.exit(cmd ? 1 : 0);
  }
  const cfg = loadConfig();
  const kr = C.loadKeyring(cfg.env);
  const db = DBL.open(cfg.dataDir);
  const svc = createService({ db, kr, config: cfg });
  svc.ensureInit();

  if (cmd === 'init-admin') {
    if (db.prepare('SELECT COUNT(*) c FROM users').get().c && !args.includes('--force')) { console.error('Kullanıcılar zaten var. Yeni yönetici için web arayüzünden mevcut yöneticiyi kullanın (veya --force).'); process.exit(1); }
    const username = (args.find((a) => a.startsWith('--username=')) || '').split('=')[1] || (await prompt('Yönetici kullanıcı adı: ')).trim();
    const name = (args.find((a) => a.startsWith('--name=')) || '').split('=')[1] || (await prompt('Ad soyad: ')).trim();
    let pw = process.env.INIT_ADMIN_PASSWORD;
    if (!pw) { pw = await promptHidden('Parola: '); const p2 = await promptHidden('Parola (tekrar): '); if (pw !== p2) { console.error('Parolalar eşleşmiyor.'); process.exit(1); } }
    const r = svc.createUser(null, { username, name, role: 'admin' }, pw);
    console.log(`Yönetici oluşturuldu: ${r.username}`);
  }
  if (cmd === 'backup') {
    const dir = path.join(cfg.dataDir, 'backups'); fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
    const out = path.resolve(args[0] || path.join(dir, `ets-${new Date().toISOString().replace(/[:.]/g, '-')}.sqlite`));
    if (fs.existsSync(out)) { console.error('Hedef dosya zaten var.'); process.exit(1); }
    db.exec(`VACUUM INTO '${out.replace(/'/g, "''")}'`);
    fs.chmodSync(out, 0o600);
    svc.tx(() => DBL.audit(db, null, 'YEDEK_ALINDI', path.basename(out)));
    console.log('Yedek alındı:', out);
    console.log('Not: yedek, kişisel veriler alan düzeyinde şifreli olarak içerir; DATA_KEYS yedeğinizi ayrı ve güvenli saklayın.');
  }
  if (cmd === 'verify-audit') {
    const r = DBL.verifyAuditChain(db);
    if (r.ok) { console.log(`DENETİM GÜNLÜĞÜ SAĞLAM — ${r.n} kayıt. Baş özeti (dış doğrulama/mühürleme için saklayın):\n${r.head}`); }
    else { console.error(`DENETİM GÜNLÜĞÜ BOZUK — ${r.at}. kayıtta tutarsızlık (${r.checked} kayıt doğrulandı).`); process.exit(2); }
  }
  if (cmd === 'rekey') {
    let n = 0;
    svc.tx(() => {
      for (const r of db.prepare('SELECT id, status, data FROM applicants').all()) {
        const plain = C.decrypt(kr, r.data, 'applicant:' + r.id), d = JSON.parse(plain);
        const open = ['taslak', 'dogrulama', 'aktif', 'beklemede', 'inceleme', 'engelli'].includes(r.status) && d.kimNo;
        db.prepare('UPDATE applicants SET data=?, id_hash=? WHERE id=?').run(C.encrypt(kr, plain, 'applicant:' + r.id), open ? C.hmacIndex(kr, d.kimNo) : null, r.id); n++;
      }
      DBL.audit(db, null, 'ANAHTAR_DEGISTI', `${n} aday kaydı anahtar ${kr.cur} ile yeniden şifrelendi`);
    });
    console.log(`${n} kayıt anahtar ${kr.cur} ile yeniden şifrelendi. Eski anahtarı DATA_KEYS içinde bir süre daha tutun (yedekler için).`);
  }
  db.close();
}
main().catch((e) => { console.error('Hata:', e.message); process.exit(1); });
