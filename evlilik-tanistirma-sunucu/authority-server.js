'use strict';
/**
 * Evlilik Tanıştırma Sistemi — MERKEZÎ OTORİTE sunucusu (bağımlılıksız Node.js).
 *   node --disable-warning=ExperimentalWarning authority-server.js
 * Birimlerden gelen rızalı, takma adlı profilleri birleştirip birimler arası eşleştirme yapar.
 */
const fs = require('node:fs');
const crypto = require('node:crypto');
const { loadAuthorityConfig } = require('./lib/config');
const C = require('./lib/crypto');
const E = require('./lib/engine');
const AU = require('./lib/authority');
const { openAuthorityDb } = require('./lib/authority-db');
const { createAuthorityService } = require('./lib/authority-service');
const { createHttpCore } = require('./lib/http-core');

function createAuthorityApp(cfg) {
  const kr = C.loadKeyring(cfg.env);
  if (cfg.signingKeyFile) cfg.signingKey = AU.loadPrivate(fs.readFileSync(cfg.signingKeyFile, 'utf8'), cfg.env.AUTHORITY_KEY_PASSPHRASE);
  if (cfg.encKeyFile) cfg.encKey = crypto.createPrivateKey(fs.readFileSync(cfg.encKeyFile, 'utf8'));
  const db = openAuthorityDb(cfg.dataDir);
  const svc = createAuthorityService({ db, kr, config: cfg });
  svc.ensureInit();

  const ALL = ['admin', 'operator', 'denetci'], OP = ['admin', 'operator'], ADM = ['admin'], AUD = ['admin', 'denetci'];
  const A = { auth: true, roles: ALL }, Op = { auth: true, roles: OP }, Ad = { auth: true, roles: ADM }, Au = { auth: true, roles: AUD };
  const RESTR = { auth: true, roles: ALL, allowRestricted: true };
  const BIG = { auth: true, roles: OP, maxBody: 32 * 1024 * 1024 };

  const core = createHttpCore(cfg, { authenticate: svc.authenticate, requires2fa: svc.requires2fa }, (route) => {
    route('GET', '/api/public', { auth: false }, () => ({ institution: svc.getParams().params.institution, authority: true }));
    route('POST', '/api/login', { auth: false }, (c) => { const r = svc.login(c.body, c.ip, c.req.headers['user-agent']); c.setCookie = r.token; return { csrf: r.csrf, user: r.user, require2fa: svc.requires2fa() }; });
    route('POST', '/api/logout', A, (c) => { svc.logout(c.user, c.tokenHash); c.clearCookie = true; return { ok: true }; });
    route('GET', '/api/me', RESTR, (c) => ({ user: c.user, csrf: c.csrf, require2fa: svc.requires2fa() }));
    route('POST', '/api/me/password', RESTR, (c) => svc.changePassword(c.user, c.tokenHash, c.body));
    route('POST', '/api/me/totp/setup', RESTR, (c) => svc.totpSetup(c.user));
    route('POST', '/api/me/totp/enable', RESTR, (c) => svc.totpEnable(c.user, c.body.code));

    route('GET', '/api/meta', A, () => ({ IMP: E.IMP, MEDENI: E.MEDENI, CRIT_LABEL: E.CRIT_LABEL, PARAM_SCHEMA: E.PARAM_SCHEMA, HARD: E.HARD, signing: !!cfg.signingKey, encryption: !!cfg.encKey,
      signKeyId: cfg.signingKey ? AU.keyIdOf(AU.publicPemOf(cfg.signingKey)) : null, encKeyId: cfg.encKey ? AU.keyIdOf(crypto.createPublicKey(cfg.encKey).export({ type: 'spki', format: 'pem' })) : null }));
    route('GET', '/api/dashboard', A, () => svc.dashboard());
    route('GET', '/api/fairness', A, () => svc.fairness());

    route('GET', '/api/params', A, () => svc.paramsInfo());
    route('POST', '/api/params/propose', Ad, (c) => svc.proposeParams(c.user, c.body.params, c.body.reason));
    route('POST', '/api/params/proposals/:id/approve', Ad, (c) => svc.decideProposal(c.user, +c.p.id, true, c.body.note));
    route('POST', '/api/params/proposals/:id/reject', Ad, (c) => svc.decideProposal(c.user, +c.p.id, false, c.body.note));
    route('POST', '/api/params/require2fa', Ad, (c) => svc.setRequire2fa(c.user, !!c.body.on));
    route('POST', '/api/params/publish', Ad, (c) => { const b = svc.publishBundle(c.user, c.body.note); c.download = `parametre-paketi-v${b.version}.json`; return b; });
    route('GET', '/api/params/bundles/:ver', A, (c) => { const b = svc.getBundle(+c.p.ver); c.download = `parametre-paketi-v${b.version}.json`; return b; });

    route('GET', '/api/units', A, () => svc.listUnits());
    route('POST', '/api/units', Ad, (c) => svc.addUnit(c.user, c.body));
    route('PATCH', '/api/units/:code', Ad, (c) => svc.updateUnit(c.user, c.p.code, c.body));
    route('POST', '/api/units/:code/proposals', Op, (c) => { c.download = `oneri-paketi-${c.p.code}-${E.todayStr()}.json`; return svc.exportForUnit(c.user, c.p.code); });
    route('POST', '/api/import/unit-package', BIG, (c) => svc.importUnitPackage(c.user, c.body.envelope));
    route('POST', '/api/import/audit-package', BIG, (c) => svc.importAuditPackage(c.user, c.body.package));
    route('GET', '/api/packages', A, () => svc.pkgLog());

    route('GET', '/api/profiles', A, (c) => svc.listProfiles(c.user, c.query));
    route('GET', '/api/profiles/:key', A, (c) => svc.getProfile(c.user, c.p.key));

    route('POST', '/api/match/run', Op, (c) => svc.runMatch(c.user));
    route('GET', '/api/match/latest', A, (c) => svc.latestRun(c.user, c.query));
    route('GET', '/api/match/why', A, (c) => svc.why(c.user, c.query.a, c.query.b));

    route('GET', '/api/intros', A, (c) => svc.listIntros(c.user, c.query));
    route('POST', '/api/intros', Op, (c) => svc.startIntro(c.user, c.body.a, c.body.b));
    route('GET', '/api/intros/:id', A, (c) => svc.getIntro(c.user, c.p.id));
    route('POST', '/api/intros/:id/:action', Op, (c) => svc.introAction(c.user, c.p.id, c.p.action, c.body));

    route('GET', '/api/audit', Au, (c) => svc.listAudit(c.query));
    route('GET', '/api/audit/verify', Au, () => svc.chainStatus(true));
    route('GET', '/api/audit/units', Au, () => svc.auditReport());

    route('GET', '/api/users', Ad, () => svc.listUsers());
    route('POST', '/api/users', Ad, (c) => svc.createUser(c.user, c.body));
    route('PATCH', '/api/users/:id', Ad, (c) => svc.updateUser(c.user, +c.p.id, c.body));
  });

  const cleaner = setInterval(() => { try { db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now()); } catch { /* yoksay */ } }, 3600000);
  cleaner.unref();
  return { server: core.server, svc, db, cfg, listen: core.listen, close: async () => { clearInterval(cleaner); await core.closeServer(); try { db.close(); } catch { /* yoksay */ } } };
}
module.exports = { createAuthorityApp };

if (require.main === module) {
  const cfg = loadAuthorityConfig();
  let app;
  try { app = createAuthorityApp(cfg); } catch (e) { console.error('Başlatılamadı:', e.message); process.exit(1); }
  if (!cfg.cookieSecure) console.warn('UYARI: Çerezler "Secure" değil. Üretimde HTTPS kullanın.');
  if (!cfg.signingKey || !cfg.encKey) console.warn('UYARI: AUTHORITY_SIGNING_KEY_FILE / AUTHORITY_ENC_KEY_FILE tanımlı değil; paket alma/üretme çalışmaz. (node authority.js keygen)');
  if (!app.db.prepare('SELECT COUNT(*) c FROM users').get().c) console.warn('Henüz kullanıcı yok:  node authority.js init-admin');
  app.listen().then((a) => console.log(`MERKEZÎ OTORİTE dinliyor: ${cfg.tls ? 'https' : 'http'}://${a.address}:${a.port}  (veri: ${cfg.dataDir})`));
  const stop = () => app.close().then(() => process.exit(0));
  process.on('SIGINT', stop); process.on('SIGTERM', stop);
}
