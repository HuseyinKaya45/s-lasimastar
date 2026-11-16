'use strict';
/**
 * Evlilik Tanıştırma Sistemi — sunucu (bağımlılıksız Node.js).
 *   node --disable-warning=ExperimentalWarning server.js
 * Yapılandırma: ortam değişkenleri / .env  (bkz. README.md ve .env.example)
 */
const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
const { loadConfig } = require('./lib/config');
const C = require('./lib/crypto');
const DBL = require('./lib/db');
const E = require('./lib/engine');
const { createService, HttpError } = require('./lib/service');

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'";

function createApp(cfg) {
  const kr = C.loadKeyring(cfg.env);
  const db = DBL.open(cfg.dataDir);
  const svc = createService({ db, kr, config: cfg });
  svc.ensureInit();

  /* ---------- yönlendirme tablosu ---------- */
  const routes = [];
  // opts: { auth: true|false, roles: [...] , handler }
  const route = (method, pattern, opts, handler) => {
    const keys = []; const re = new RegExp('^' + pattern.replace(/:([a-z]+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$');
    routes.push({ method, re, keys, opts, handler });
  };
  const ALL = ['admin', 'gorevli', 'denetci'], EDIT = ['admin', 'gorevli'], ADM = ['admin'], AUD = ['admin', 'denetci'];
  const A = { auth: true, roles: ALL }, Ed = { auth: true, roles: EDIT }, Ad = { auth: true, roles: ADM }, Au = { auth: true, roles: AUD };

  route('GET', '/api/public', { auth: false }, () => ({ institution: svc.getParams().params.institution }));
  route('POST', '/api/login', { auth: false, noCsrf: true }, (c) => {
    const r = svc.login(c.body, c.ip, c.req.headers['user-agent']);
    c.setCookie = r.token; return { csrf: r.csrf, user: r.user, require2fa: svc.requires2fa() };
  });
  route('POST', '/api/logout', A, (c) => { svc.logout(c.user, c.tokenHash); c.clearCookie = true; return { ok: true }; });
  route('GET', '/api/me', { auth: true, roles: ALL, allowRestricted: true }, (c) => ({ user: c.user, csrf: c.csrf, require2fa: svc.requires2fa() }));
  route('POST', '/api/me/password', { auth: true, roles: ALL, allowRestricted: true }, (c) => svc.changePassword(c.user, c.tokenHash, c.body));
  route('POST', '/api/me/totp/setup', { auth: true, roles: ALL, allowRestricted: true }, (c) => svc.totpSetup(c.user));
  route('POST', '/api/me/totp/enable', { auth: true, roles: ALL, allowRestricted: true }, (c) => svc.totpEnable(c.user, c.body.code));

  route('GET', '/api/meta', A, () => ({ IMP: E.IMP, MEDENI: E.MEDENI, ISDURUM: E.ISDURUM, CRIT_LABEL: E.CRIT_LABEL, PARAM_SCHEMA: E.PARAM_SCHEMA, HARD: E.HARD, allowDemo: cfg.allowDemo }));
  route('GET', '/api/dashboard', A, () => svc.dashboard());
  route('GET', '/api/fairness', A, () => svc.fairness());

  route('GET', '/api/params', A, () => svc.paramsInfo());
  route('POST', '/api/params/propose', Ad, (c) => svc.proposeParams(c.user, c.body.params, c.body.reason));
  route('POST', '/api/params/proposals/:id/approve', Ad, (c) => svc.decideProposal(c.user, +c.p.id, true, c.body.note));
  route('POST', '/api/params/proposals/:id/reject', Ad, (c) => svc.decideProposal(c.user, +c.p.id, false, c.body.note));
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

  route('GET', '/api/audit', Au, (c) => svc.listAudit(c.query));
  route('GET', '/api/audit/verify', Au, () => svc.chainStatus(true));
  route('GET', '/api/export/package', Au, (c) => { c.download = 'denetim-paketi-' + E.todayStr() + '.json'; return svc.auditPackage(c.user); });

  route('GET', '/api/users', Ad, () => svc.listUsers());
  route('POST', '/api/users', Ad, (c) => svc.createUser(c.user, c.body));
  route('PATCH', '/api/users/:id', Ad, (c) => svc.updateUser(c.user, +c.p.id, c.body));

  route('POST', '/api/admin/demo', Ad, (c) => svc.seedDemo(c.user));
  route('DELETE', '/api/admin/demo', Ad, (c) => svc.unseedDemo(c.user));

  /* ---------- yardımcılar ---------- */
  const clientIp = (req) => {
    if (cfg.trustProxy) { const x = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim(); if (x) return x; }
    return req.socket.remoteAddress || '?';
  };
  const parseCookies = (h) => Object.fromEntries(String(h || '').split(';').map((x) => x.trim().split('=')).filter((x) => x[0]).map(([k, ...v]) => [k, decodeURIComponent(v.join('='))]));
  const secHeaders = (res) => {
    res.setHeader('Content-Security-Policy', CSP); res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'no-referrer'); res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    if (cfg.cookieSecure) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  };
  const sendJson = (res, status, obj, extraHeaders) => {
    const body = JSON.stringify(obj);
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(body), ...(extraHeaders || {}) });
    res.end(body);
  };
  const readBody = (req) => new Promise((resolve, reject) => {
    const chunks = []; let n = 0;
    req.on('data', (d) => { n += d.length; if (n > cfg.maxBody) { reject(new HttpError(413, 'İstek çok büyük.')); req.destroy(); } else chunks.push(d); });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { const j = JSON.parse(Buffer.concat(chunks).toString('utf8')); resolve(j && typeof j === 'object' ? j : {}); } catch { reject(new HttpError(400, 'Geçersiz JSON.')); }
    });
    req.on('error', reject);
  });
  const hits = new Map();
  const rateLimited = (ip) => {
    const now = Date.now(), L = (hits.get(ip) || []).filter((t) => now - t < 60000); L.push(now); hits.set(ip, L);
    return L.length > cfg.rateLimitPerMin;
  };
  const cookieHeader = (token, clear) => {
    const parts = [`ets_sid=${clear ? '' : token}`, 'Path=/', 'HttpOnly', 'SameSite=Strict'];
    if (cfg.cookieSecure) parts.push('Secure');
    parts.push(clear ? 'Max-Age=0' : `Max-Age=${cfg.sessionMaxHours * 3600}`);
    return parts.join('; ');
  };

  async function handleApi(req, res, url) {
    const ip = clientIp(req);
    if (rateLimited(ip)) throw new HttpError(429, 'Çok fazla istek.');
    const rt = routes.find((r) => r.method === req.method && r.re.test(url.pathname));
    if (!rt) {
      if (routes.some((r) => r.re.test(url.pathname))) throw new HttpError(405, 'Yöntem desteklenmiyor.');
      throw new HttpError(404, 'Bulunamadı.');
    }
    const m = rt.re.exec(url.pathname); const p = {}; rt.keys.forEach((k, i) => { p[k] = decodeURIComponent(m[i + 1]); });
    const c = { req, res, ip, p, query: Object.fromEntries(url.searchParams), body: {}, user: null, csrf: null, tokenHash: null };
    if (rt.opts.auth) {
      const sid = parseCookies(req.headers.cookie).ets_sid;
      const s = svc.authenticate(sid);
      if (!s) throw new HttpError(401, 'Oturum gerekli.');
      c.user = s.user; c.csrf = s.csrf; c.tokenHash = s.tokenHash;
      if (!rt.opts.roles.includes(c.user.role)) throw new HttpError(403, 'Bu işlem için yetkiniz yok.');
      if (!rt.opts.allowRestricted && c.user.mustChange) throw new HttpError(403, 'Önce parolanızı değiştirmelisiniz.', { code: 'MUST_CHANGE_PASSWORD' });
      if (!rt.opts.allowRestricted && svc.requires2fa() && !c.user.totpEnabled) throw new HttpError(403, 'Devam etmek için iki aşamalı doğrulamayı etkinleştirmelisiniz.', { code: 'MUST_ENABLE_2FA' });
    }
    if (!['GET', 'HEAD'].includes(req.method)) {
      const origin = req.headers.origin;
      if (origin) { let oh = ''; try { oh = new URL(origin).host; } catch { /* geçersiz */ } if (oh !== req.headers.host) throw new HttpError(403, 'Köken (Origin) doğrulanamadı.'); }
      if (rt.opts.auth && !C.safeEq(String(req.headers['x-csrf-token'] || ''), c.csrf)) throw new HttpError(403, 'CSRF doğrulaması başarısız.');
      c.body = await readBody(req);
    }
    const out = await rt.handler(c);
    const headers = {};
    if (c.setCookie) headers['Set-Cookie'] = cookieHeader(c.setCookie);
    if (c.clearCookie) headers['Set-Cookie'] = cookieHeader('', true);
    if (c.download) headers['Content-Disposition'] = `attachment; filename="${c.download}"`;
    sendJson(res, 200, out === undefined ? { ok: true } : out, headers);
  }

  function serveStatic(req, res, url) {
    let rel = url.pathname === '/' ? '/index.html' : url.pathname;
    rel = path.normalize(decodeURIComponent(rel)).replace(/^([/\\])+/, '');
    const file = path.join(cfg.publicDir, rel);
    if (!file.startsWith(cfg.publicDir + path.sep) && file !== cfg.publicDir) { res.writeHead(403); return res.end(); }
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Bulunamadı'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'Content-Length': buf.length });
      res.end(buf);
    });
  }

  const handler = async (req, res) => {
    const t0 = Date.now(); secHeaders(res);
    let url; try { url = new URL(req.url, 'http://x'); } catch { res.writeHead(400); return res.end(); }
    try {
      if (url.pathname === '/healthz') return sendJson(res, 200, { ok: true });
      if (url.pathname.startsWith('/api/')) await handleApi(req, res, url);
      else if (req.method === 'GET' || req.method === 'HEAD') serveStatic(req, res, url);
      else { res.writeHead(405); res.end(); }
    } catch (e) {
      if (e instanceof HttpError) sendJson(res, e.status, { error: e.message, ...(e.extra || {}) });
      else {
        console.error(new Date().toISOString(), 'HATA', req.method, url.pathname, e && e.stack ? e.stack : e);
        sendJson(res, 500, { error: 'Sunucu hatası.' });
      }
    } finally {
      if (url.pathname.startsWith('/api/')) console.log(`${new Date().toISOString()} ${req.method} ${url.pathname} ${res.statusCode} ${Date.now() - t0}ms`);
    }
  };

  const server = cfg.tls
    ? https.createServer({ cert: fs.readFileSync(cfg.tlsCert), key: fs.readFileSync(cfg.tlsKey), minVersion: 'TLSv1.2' }, handler)
    : http.createServer(handler);
  server.requestTimeout = 30000; server.headersTimeout = 15000; server.keepAliveTimeout = 5000;
  const cleaner = setInterval(() => { try { db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now()); } catch { /* yoksay */ } }, 3600000);
  cleaner.unref();
  return {
    server, svc, db, cfg,
    listen: () => new Promise((resolve) => server.listen(cfg.port, cfg.host, () => resolve(server.address()))),
    close: () => new Promise((resolve) => { clearInterval(cleaner); server.close(() => { try { db.close(); } catch { /* yoksay */ } resolve(); }); server.closeAllConnections?.(); })
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
  app.listen().then((a) => console.log(`Evlilik Tanıştırma Sistemi dinliyor: ${cfg.tls ? 'https' : 'http'}://${a.address}:${a.port}  (veri: ${cfg.dataDir})`));
  const stop = () => app.close().then(() => process.exit(0));
  process.on('SIGINT', stop); process.on('SIGTERM', stop);
}
