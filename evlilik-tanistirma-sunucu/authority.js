#!/usr/bin/env node
'use strict';
/**
 * MERKEZÎ OTORİTE ARACI — otoritenin KENDİ bilgisayarında çalışır; veritabanı veya aday verisi gerektirmez.
 *
 *   node authority.js keygen [--out=klasör]
 *       Otorite imza anahtar çifti üretir (özel anahtar parola ile şifrelenir). Özel anahtarı çevrimdışı saklayın.
 *   node authority.js sign-params <parametreler.json> --key=authority-private.pem --version=N [--note="..."]
 *       Parametreleri imzalayıp birimlere dağıtılacak "parametre paketi"ni üretir.
 *   node authority.js register-unit <kod> <birim-acik-anahtar.pem> [--name="..."] [--units=units.json]
 *       Birimin imza açık anahtarını kayıt listesine ekler.
 *   node authority.js aggregate --units=units.json --packages=klasör [--bundle=parametre-paketi.json] [--max-age-days=7] [--json=rapor.json]
 *       Birimlerden gelen imzalı denetim paketlerini doğrular ve KİŞİSEL VERİ GÖRMEDEN toplu rapor üretir.
 *   node authority.js init-admin --username=.. [--name=..]
 *       Otorite web sunucusunun (authority-server.js) ilk yöneticisini oluşturur.
 *   node authority.js verify-package <paket.json> --pub=birim-acik-anahtar.pem
 */
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const AU = require('./lib/authority');

const arg = (args, name) => { const a = args.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : undefined; };
function promptHidden(q) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = function (s) { if (s.includes(q)) process.stdout.write(s); else if (/\r|\n/.test(s)) process.stdout.write('\n'); };
    rl.question(q, (a) => { rl.close(); resolve(a); });
  });
}
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const MARK = { ok: 'TAMAM ', uyari: 'UYARI ', engel: 'SORUNLU' };

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const pos = rest.filter((x) => !x.startsWith('--'));
  if (cmd === 'keygen') {
    const out = path.resolve(arg(rest, 'out') || '.'); fs.mkdirSync(out, { recursive: true, mode: 0o700 });
    let pass = process.env.AUTHORITY_KEY_PASSPHRASE;
    if (!pass) { pass = await promptHidden('Özel anahtar parolası (en az 12 karakter): '); const p2 = await promptHidden('Parola (tekrar): '); if (pass !== p2) { console.error('Parolalar eşleşmiyor.'); process.exit(1); } }
    if (pass.length < 12) { console.error('Parola en az 12 karakter olmalı.'); process.exit(1); }
    const { publicKey, privateKey } = AU.genKeyPair(pass);
    const priv = path.join(out, 'authority-private.pem'), pub = path.join(out, 'authority-public.pem');
    if (fs.existsSync(priv)) { console.error('authority-private.pem zaten var; üzerine yazılmadı.'); process.exit(1); }
    fs.writeFileSync(priv, privateKey, { mode: 0o600 }); fs.writeFileSync(pub, publicKey);
    const H = require('./lib/hybrid'), enc = H.genEncKeyPair();
    fs.writeFileSync(path.join(out, 'authority-enc-private.pem'), enc.privateKey, { mode: 0o600 }); fs.writeFileSync(path.join(out, 'authority-enc-public.pem'), enc.publicKey);
    console.log(`Şifreleme anahtarı (merkezî eşleştirme): authority-enc-private.pem (sunucuda AUTHORITY_ENC_KEY_FILE) / authority-enc-public.pem (birimlere: AUTHORITY_ENC_PUBKEY_FILE)`);
    console.log(`Özel anahtar (şifreli): ${priv}\nAçık anahtar: ${pub}  (anahtar kimliği ${AU.keyIdOf(publicKey)})`);
    console.log('Açık anahtarı (authority-public.pem) tüm birimlere dağıtın (AUTHORITY_PUBKEY_FILE). ÖZEL ANAHTARI ÇEVRİMDIŞI VE YEDEKLİ SAKLAYIN; kaybolursa yeni paket imzalanamaz, sızarsa sahte paket üretilebilir.');
  } else if (cmd === 'sign-params') {
    const file = pos[0], keyFile = arg(rest, 'key'), version = parseInt(arg(rest, 'version'), 10);
    if (!file || !keyFile || !version) { console.error('Kullanım: sign-params <parametreler.json> --key=authority-private.pem --version=N [--note=..]'); process.exit(1); }
    const pass = process.env.AUTHORITY_KEY_PASSPHRASE || await promptHidden('Özel anahtar parolası: ');
    const priv = AU.loadPrivate(fs.readFileSync(keyFile, 'utf8'), pass);
    const bundle = AU.makeBundle({ params: readJson(file), version, note: arg(rest, 'note'), privateKey: priv });
    const out = path.join(path.dirname(path.resolve(file)), `parametre-paketi-v${version}.json`);
    fs.writeFileSync(out, JSON.stringify(bundle, null, 2));
    console.log(`Parametre paketi yazıldı: ${out}\nMühür: ${bundle.seal}\nBu dosyayı birimlere iletin (e-posta/USB/kurum ağı). Birim yöneticisi Parametreler sayfasından yükler.`);
  } else if (cmd === 'register-unit') {
    const [code, pubFile] = pos; const unitsFile = path.resolve(arg(rest, 'units') || 'units.json');
    if (!code || !pubFile) { console.error('Kullanım: register-unit <kod> <birim-acik-anahtar.pem> [--name=..] [--units=units.json]'); process.exit(1); }
    const reg = fs.existsSync(unitsFile) ? readJson(unitsFile) : { units: [] };
    let publicKey = fs.readFileSync(pubFile, 'utf8');
    if (pubFile.endsWith('.json')) publicKey = JSON.parse(publicKey).signingKey; // birim kimlik dosyası
    const i = reg.units.findIndex((u) => u.code === code);
    const entry = { code, name: arg(rest, 'name') || (i >= 0 ? reg.units[i].name : ''), publicKey, keyId: AU.keyIdOf(publicKey) };
    if (i >= 0) reg.units[i] = entry; else reg.units.push(entry);
    fs.writeFileSync(unitsFile, JSON.stringify(reg, null, 2));
    console.log(`Birim kaydedildi: ${code} (anahtar kimliği ${entry.keyId}) → ${unitsFile}`);
  } else if (cmd === 'aggregate') {
    const reg = readJson(arg(rest, 'units') || 'units.json'), dir = arg(rest, 'packages');
    if (!dir) { console.error('--packages=klasör gerekli'); process.exit(1); }
    const pkgs = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => { try { return readJson(path.join(dir, f)); } catch { return null; } }).filter(Boolean);
    const bf = arg(rest, 'bundle'); const bundle = bf ? readJson(bf) : null;
    const rep = AU.aggregate(reg.units, pkgs, bundle ? { seal: bundle.seal, version: bundle.version } : null, { maxAgeDays: +arg(rest, 'max-age-days') || 7 });
    console.log(`\nMERKEZÎ DENETİM ÖZETİ — ${new Date(rep.generatedAt).toISOString()}${bundle ? `  (otorite paketi v${bundle.version}, mühür ${bundle.seal.slice(0, 12)}…)` : ''}\n`);
    let bad = 0;
    for (const r of rep.rows) {
      const level = r.issues.some((i) => i.level === 'engel') ? 'engel' : r.issues.length ? 'uyari' : 'ok'; if (level === 'engel') bad++;
      const tot = Object.values(r.applicants || {}).reduce((a, b) => a + b, 0);
      console.log(`[${MARK[level]}] ${r.code}${r.name ? ' — ' + r.name : ''}${r.last ? `  · son paket ${new Date(r.last).toISOString().slice(0, 16)} · ${r.auditCount ?? '?'} denetim kaydı · ${tot} aday (aktif ${(r.applicants || {}).aktif || 0}) · paket sürümü ${r.authorityVersion}` : ''}`);
      r.issues.forEach((i) => console.log(`        ${i.level === 'engel' ? '✖' : '⚠'} ${i.text}`));
    }
    if (rep.unknown.length) { console.log(`\n⚠ Kayıtlı olmayan birim kodlarından paket geldi: ${rep.unknown.join(', ')}`); }
    const jf = arg(rest, 'json'); if (jf) { fs.writeFileSync(jf, JSON.stringify(rep, null, 2)); console.log(`\nJSON rapor: ${jf}`); }
    console.log(`\n${rep.rows.length} birim · ${bad} sorunlu`);
    process.exit(bad ? 2 : 0);
  } else if (cmd === 'init-admin') {
    const { loadAuthorityConfig } = require('./lib/config'), C = require('./lib/crypto'), { openAuthorityDb } = require('./lib/authority-db'), { createAuthorityService } = require('./lib/authority-service');
    const cfg = loadAuthorityConfig(), db = openAuthorityDb(cfg.dataDir), svc = createAuthorityService({ db, kr: C.loadKeyring(cfg.env), config: cfg }); svc.ensureInit();
    if (db.prepare('SELECT COUNT(*) c FROM users').get().c && !rest.includes('--force')) { console.error('Kullanıcılar zaten var.'); process.exit(1); }
    const username = arg(rest, 'username'), name = arg(rest, 'name') || username; let pw = process.env.INIT_ADMIN_PASSWORD;
    if (!username) { console.error('Kullanım: init-admin --username=.. [--name=..]  (parola: INIT_ADMIN_PASSWORD veya istem)'); process.exit(1); }
    if (!pw) { pw = await promptHidden('Parola: '); const p2 = await promptHidden('Parola (tekrar): '); if (pw !== p2) { console.error('Parolalar eşleşmiyor.'); process.exit(1); } }
    console.log('Otorite yöneticisi oluşturuldu:', svc.createUser(null, { username, name, role: 'admin' }, pw).username); db.close();
  } else if (cmd === 'verify-package') {
    const [file] = pos, pub = arg(rest, 'pub'); if (!file || !pub) { console.error('Kullanım: verify-package <paket.json> --pub=birim-acik-anahtar.pem'); process.exit(1); }
    const pkg = readJson(file), v = AU.verifyPackage(pkg, fs.readFileSync(pub, 'utf8')), c = AU.recomputeChain(pkg.denetimGunlugu);
    console.log(`İmza: ${v.valid ? 'GEÇERLİ' : 'GEÇERSİZ — ' + v.reason}\nDenetim zinciri: ${c.ok ? `sağlam (${c.n} kayıt)` : `BOZUK (${c.at}. kayıt)`}\nBirim: ${pkg.birim && pkg.birim.kod}\nParametre mührü: ${pkg.parametreMuhru}`);
    process.exit(v.valid && c.ok ? 0 : 2);
  } else {
    console.log('Kullanım: node authority.js <keygen|sign-params|register-unit|aggregate|verify-package>'); process.exit(cmd ? 1 : 0);
  }
}
main().catch((e) => { console.error('Hata:', e.message); process.exit(1); });
