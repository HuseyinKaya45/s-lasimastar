'use strict';
/**
 * Ortak HTTP çekirdeği (birim sunucusu ve otorite sunucusu kullanır):
 * yönlendirme, oturum çerezi, CSRF + Origin, güvenlik başlıkları, hız sınırı, statik dosya, hata yönetimi.
 */
const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
const C = require('./crypto');
const { HttpError } = require('./errors');

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'";

/**
 * cfg: { host, port, tls, tlsCert, tlsKey, trustProxy, cookieSecure, sessionMaxHours, maxBody, rateLimitPerMin, publicDir }
 * hooks: { authenticate(token) → {user, csrf, tokenHash}|null,  requires2fa() → bool,  maxBodyOverride }
 * define(route): route(method, pattern, opts, handler) tablosunu doldurur
 */
function createHttpCore(cfg, hooks, define) {
  const routes = [];
  const route = (method, pattern, opts, handler) => {
    const keys = []; const re = new RegExp('^' + pattern.replace(/:([a-z]+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$');
    routes.push({ method, re, keys, opts, handler });
  };
  define(route);

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
  const sendJson = (res, status, obj, extra) => {
    const body = JSON.stringify(obj);
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(body), ...(extra || {}) });
    res.end(body);
  };
  const readBody = (req, limit) => new Promise((resolve, reject) => {
    const chunks = []; let n = 0;
    req.on('data', (d) => { n += d.length; if (n > limit) { reject(new HttpError(413, 'İstek çok büyük.')); req.destroy(); } else chunks.push(d); });
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
    if (!rt) { if (routes.some((r) => r.re.test(url.pathname))) throw new HttpError(405, 'Yöntem desteklenmiyor.'); throw new HttpError(404, 'Bulunamadı.'); }
    const m = rt.re.exec(url.pathname); const p = {}; rt.keys.forEach((k, i) => { p[k] = decodeURIComponent(m[i + 1]); });
    const c = { req, res, ip, p, query: Object.fromEntries(url.searchParams), body: {}, user: null, csrf: null, tokenHash: null };
    if (rt.opts.auth) {
      const s = hooks.authenticate(parseCookies(req.headers.cookie).ets_sid);
      if (!s) throw new HttpError(401, 'Oturum gerekli.');
      c.user = s.user; c.csrf = s.csrf; c.tokenHash = s.tokenHash;
      if (!rt.opts.roles.includes(c.user.role)) throw new HttpError(403, 'Bu işlem için yetkiniz yok.');
      if (!rt.opts.allowRestricted && c.user.mustChange) throw new HttpError(403, 'Önce parolanızı değiştirmelisiniz.', { code: 'MUST_CHANGE_PASSWORD' });
      if (!rt.opts.allowRestricted && hooks.requires2fa() && !c.user.totpEnabled) throw new HttpError(403, 'Devam etmek için iki aşamalı doğrulamayı etkinleştirmelisiniz.', { code: 'MUST_ENABLE_2FA' });
    }
    if (!['GET', 'HEAD'].includes(req.method)) {
      const origin = req.headers.origin;
      if (origin) { let oh = ''; try { oh = new URL(origin).host; } catch { /* geçersiz */ } if (oh !== req.headers.host) throw new HttpError(403, 'Köken (Origin) doğrulanamadı.'); }
      if (rt.opts.auth && !C.safeEq(String(req.headers['x-csrf-token'] || ''), c.csrf)) throw new HttpError(403, 'CSRF doğrulaması başarısız.');
      c.body = await readBody(req, rt.opts.maxBody || cfg.maxBody);
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
    const dirs = [].concat(cfg.publicDirs || [cfg.publicDir]);
    const tryDir = (i) => {
      if (i >= dirs.length) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Bulunamadı'); }
      const file = path.join(dirs[i], rel);
      if (!file.startsWith(dirs[i] + path.sep)) { res.writeHead(403); return res.end(); }
      fs.readFile(file, (err, buf) => {
        if (err) return tryDir(i + 1);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'Content-Length': buf.length });
        res.end(buf);
      });
    };
    tryDir(0);
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
      else { console.error(new Date().toISOString(), 'HATA', req.method, url.pathname, e && e.stack ? e.stack : e); sendJson(res, 500, { error: 'Sunucu hatası.' }); }
    } finally {
      if (url.pathname.startsWith('/api/')) console.log(`${new Date().toISOString()} ${req.method} ${url.pathname} ${res.statusCode} ${Date.now() - t0}ms`);
    }
  };

  const server = cfg.tls
    ? https.createServer({ cert: fs.readFileSync(cfg.tlsCert), key: fs.readFileSync(cfg.tlsKey), minVersion: 'TLSv1.2' }, handler)
    : http.createServer(handler);
  server.requestTimeout = 60000; server.headersTimeout = 15000; server.keepAliveTimeout = 5000;
  return {
    server,
    listen: () => new Promise((resolve) => server.listen(cfg.port, cfg.host, () => resolve(server.address()))),
    closeServer: () => new Promise((resolve) => { server.close(() => resolve()); server.closeAllConnections?.(); })
  };
}

module.exports = { createHttpCore };
