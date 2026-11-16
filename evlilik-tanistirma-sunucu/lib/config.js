'use strict';
/** Ortam değişkenlerinden yapılandırma. İsteğe bağlı olarak `.env` dosyası okunur (KEY=VALUE). */
const fs = require('node:fs');
const path = require('node:path');

function loadDotEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m || line.trim().startsWith('#')) continue;
    if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^"(.*)"$/, '$1');
  }
}

function loadConfig(overrides = {}) {
  loadDotEnv(process.env.ENV_FILE || path.join(process.cwd(), '.env'));
  const env = { ...process.env, ...overrides };
  const tls = !!(env.TLS_CERT && env.TLS_KEY);
  const trustProxy = env.TRUST_PROXY === '1';
  return {
    env,
    host: env.HOST || '127.0.0.1',
    port: env.PORT !== undefined ? +env.PORT : 8080,
    dataDir: path.resolve(env.DATA_DIR || path.join(process.cwd(), 'data')),
    publicDir: path.resolve(__dirname, '..', 'public'),
    tls, tlsCert: env.TLS_CERT, tlsKey: env.TLS_KEY,
    trustProxy,
    cookieSecure: env.COOKIE_SECURE !== undefined ? env.COOKIE_SECURE === '1' : (tls || trustProxy),
    sessionMaxHours: +env.SESSION_MAX_HOURS || 12,
    allowDemo: env.ALLOW_DEMO === '1',
    maxBody: 256 * 1024,
    rateLimitPerMin: +env.RATE_LIMIT_PER_MIN || 600
  };
}
module.exports = { loadConfig };
