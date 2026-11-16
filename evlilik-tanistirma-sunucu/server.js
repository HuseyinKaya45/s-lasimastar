'use strict';
/**
 * Evlilik Tanıştırma Sistemi — BİRİM sunucusu (bağımlılıksız Node.js).
 *   node --disable-warning=ExperimentalWarning server.js
 * Yapılandırma: ortam değişkenleri / .env  (bkz. README.md ve .env.example)
 */
const fs = require('node:fs');
const { loadConfig } = require('./lib/config');
const C = require('./lib/crypto');
const DBL = require('./lib/db');
const E = require('./lib/engine');
const AU = require('./lib/authority');
const { createService } = require('./lib/service');
const { createHttpCore } = require('./lib/http-core');

function createApp(cfg) {
  const kr = C.loadKeyring(cfg.env);
  // Otorite anahtarları ve birim anahtarları (varsa)
  if (cfg.authorityPubFile) cfg.authorityPub = fs.readFileSync(cfg.authorityPubFile, 'utf8');
  if (cfg.authorityEncPubFile) cfg.authorityEncPub = fs.readFileSync(cfg.authorityEncPubFile, 'utf8');
  if (cfg.signingKeyFile) cfg.signingKey = AU.loadPrivate(fs.readFileSync(cfg.signingKeyFile, 'utf8'), cfg.env.SIGNING_KEY_PASSPHRASE);
  if (cfg.encKeyFile) cfg.encKey = require('node:crypto').createPrivateKey(fs.readFileSync(cfg.encKeyFile, 'utf8'));
  if (cfg.lockParams && !cfg.authorityPub) throw new Error('LOCK_PARAMS=1 için AUTHORITY_PUBKEY_FILE tanımlı olmalı.');
  const db = DBL.open(cfg.dataDir);
  const svc = createService({ db, kr, config: cfg });
  svc.ensureInit();

  const ALL = ['admin', 'gorevli', 'denetci'], EDIT = ['admin', 'gorevli'], ADM = ['admin'], AUD = ['admin', 'denetci'];
  const A = { auth: true, roles: ALL }, Ed = { auth: true, roles: EDIT }, Ad = { auth: true, roles: ADM }, Au = { auth: true, roles: AUD };
  const RESTR = { auth: true, roles: ALL, allowRestricted: true };
  const BIG = { auth: true, roles: EDIT, maxBody: 16 * 1024 * 1024 };

  const core = createHttpCore({ ...cfg, publicDirs: [cfg.publicDir] }, { authenticate: svc.authenticate, requires2fa: svc.requires2fa }, (route) => {
    route('GET', '/api/public', { auth: false }, () => ({ institution: svc.getParams().params.institution, unitCode: cfg.unitCode }));
    route('POST', '/api/login', { auth: false }, (c) => {
      const r = svc.login(c.body, c.ip, c.req.headers['user-agent']);
      c.setCookie = r.token; return { csrf: r.csrf, user: r.user, require2fa: svc.requires2fa() };
    });
    route('POST', '/api/logout', A, (c) => { svc.logout(c.user, c.tokenHash); c.clearCookie = true; return { ok: true }; });
    route('GET', '/api/me', RESTR, (c) => ({ user: c.user, csrf: c.csrf, require2fa: svc.requires2fa() }));
    route('POST', '/api/me/password', RESTR, (c) => svc.changePassword(c.user, c.tokenHash, c.body));
    route('POST', '/api/me/totp/setup', RESTR, (c) => svc.totpSetup(c.user));
    route('POST', '/api/me/totp/enable', RESTR, (c) => svc.totpEnable(c.user, c.body.code));

    route('GET', '/api/meta', A, () => ({ IMP: E.IMP, MEDENI: E.MEDENI, ISDURUM: E.ISDURUM, CRIT_LABEL: E.CRIT_LABEL, PARAM_SCHEMA: E.PARAM_SCHEMA, HARD: E.HARD, allowDemo: cfg.allowDemo, unitCode: cfg.unitCode, lockParams: cfg.lockParams, authorityConfigured: !!cfg.authorityPub, centralConfigured: svc.centralConfigured() }));
    route('GET', '/api/dashboard', A, () => svc.dashboard());
    route('GET', '/api/fairness', A, () => svc.fairness());

    route('GET', '/api/params', A, () => svc.paramsInfo());
    route('POST', '/api/params/propose', Ad, (c) => svc.proposeParams(c.user, c.body.params, c.body.reason));
    route('POST', '/api/params/proposals/:id/approve', Ad, (c) => svc.decideProposal(c.user, +c.p.id, true, c.body.note));
    route('POST', '/api/params/proposals/:id/reject', Ad, (c) => svc.decideProposal(c.user, +c.p.id, false, c.body.note));
    route('POST', '/api/params/import-bundle', Ad, (c) => svc.importBundle(c.user, c.body.bundle));
    route('POST', '/api/params/official-seal', Ad, (c) => svc.setOfficialSeal(c.user, c.body.seal));
    route('POST', '/api/params/require2fa', Ad, (c) => svc.setRequire2fa(c.user, !!c.body.on));

    route('GET', '/api/applicants', A, (c) => svc.listApplicants(c.user, c.query));
    route('POST', '/api/applicants', Ed, (c) => svc.createApplicant(c.user));
    route('GET', '/api/applicants/:id', A, (c) => svc.getApplicant(c.user, c.p.id));
    route('PUT', '/api/applicants/:id', Ed, (c) => svc.updateApplicant(c.user, c.p.id, c.body.data, c.body.version));
    route('POST', '/api/applicants/:id/action', Ed, (c) => svc.applicantAction(c.user, c.p.id, String(c.body.action || ''), c.body));
    route('GET', '/api/applicants/:id/card', Ed, (c) => svc.applicantCard(c.user, c.p.id));

    route('POST', '/api/match/run', Ed, (c) => svc.runMatch(c.user));
    route('GET', '/api/match/latest', A, (c) => svc.latestRun(c.user, c.query));
    route('GET', '/api/match/why', A, (c) => svc.why(c.user, c.query.a, c.query.b));

    route('GET', '/api/intros', A, (c) => svc.listIntros(c.user, c.query));
    route('POST', '/api/intros', Ed, (c) => svc.startIntro(c.user, c.body.a, c.body.b));
    route('GET', '/api/intros/:id', A, (c) => svc.getIntro(c.user, c.p.id));
    route('POST', '/api/intros/:id/:action', Ed, (c) => svc.introAction(c.user, c.p.id, c.p.action, c.body));

    // Merkezî (otorite) eşleştirme: birimden otoriteye veri paketi, otoriteden gelen öneriler
    route('GET', '/api/central/status', A, () => svc.centralStatus());
    route('POST', '/api/central/export', Ed, (c) => { c.download = `birim-paketi-${cfg.unitCode}-${E.todayStr()}.json`; return svc.centralExport(c.user); });
    route('POST', '/api/central/import', BIG, (c) => svc.centralImport(c.user, c.body.envelope));
    route('GET', '/api/central/intros', A, (c) => svc.centralIntros(c.user));
    route('POST', '/api/central/intros/:id/respond', Ed, (c) => svc.centralRespond(c.user, c.p.id, c.body));
    route('POST', '/api/central/intros/:id/outcome', Ed, (c) => svc.centralOutcome(c.user, c.p.id, c.body));

    route('GET', '/api/audit', Au, (c) => svc.listAudit(c.query));
    route('GET', '/api/audit/verify', Au, () => svc.chainStatus(true));
    route('GET', '/api/export/package', Au, (c) => { c.download = 'denetim-paketi-' + E.todayStr() + '.json'; return svc.auditPackage(c.user); });

    route('GET', '/api/users', Ad, () => svc.listUsers());
    route('POST', '/api/users', Ad, (c) => svc.createUser(c.user, c.body));
    route('PATCH', '/api/users/:id', Ad, (c) => svc.updateUser(c.user, +c.p.id, c.body));

    route('POST', '/api/admin/demo', Ad, (c) => svc.seedDemo(c.user));
    route('DELETE', '/api/admin/demo', Ad, (c) => svc.unseedDemo(c.user));
  });

  const cleaner = setInterval(() => { try { db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now()); } catch { /* yoksay */ } }, 3600000);
  cleaner.unref();
  return {
    server: core.server, svc, db, cfg, listen: core.listen,
    close: async () => { clearInterval(cleaner); await core.closeServer(); try { db.close(); } catch { /* yoksay */ } }
  };
}

module.exports = { createApp };

if (require.main === module) {
  const cfg = loadConfig();
  let app;
  try { app = createApp(cfg); } catch (e) { console.error('Başlatılamadı:', e.message); process.exit(1); }
  if (!cfg.cookieSecure) console.warn('UYARI: Çerezler "Secure" değil. Üretimde HTTPS (TLS_CERT/TLS_KEY) veya HTTPS sonlandıran bir ters vekil + TRUST_PROXY=1 kullanın.');
  if (cfg.allowDemo) console.warn('UYARI: ALLOW_DEMO=1 — deneme verisi uçları açık. Üretimde kapatın.');
  const users = app.db.prepare('SELECT COUNT(*) c FROM users').get().c;
  if (!users) console.warn('Henüz kullanıcı yok. İlk yöneticiyi oluşturun:  npm run init-admin');
  app.listen().then((a) => console.log(`Evlilik Tanıştırma Sistemi (birim ${cfg.unitCode}) dinliyor: ${cfg.tls ? 'https' : 'http'}://${a.address}:${a.port}  (veri: ${cfg.dataDir})`));
  const stop = () => app.close().then(() => process.exit(0));
  process.on('SIGINT', stop); process.on('SIGTERM', stop);
}
