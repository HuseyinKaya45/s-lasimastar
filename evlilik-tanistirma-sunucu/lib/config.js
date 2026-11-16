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
  // Anahtarlar ayrı bir dosyada (ör. çıkarılabilir USB) tutuluyorsa onu da oku
  if (process.env.KEYS_FILE) loadDotEnv(process.env.KEYS_FILE);
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
    unitCode: (env.UNIT_CODE || 'BIRIM-1').slice(0, 40),
    lockParams: env.LOCK_PARAMS === '1',
    authorityPubFile: env.AUTHORITY_PUBKEY_FILE, signingKeyFile: env.SIGNING_KEY_FILE,
    authorityEncPubFile: env.AUTHORITY_ENC_PUBKEY_FILE, encKeyFile: env.UNIT_ENC_KEY_FILE,
    authorityPub: null, signingKey: null, authorityEncPub: null, encKey: null,
    maxBody: 256 * 1024,
    rateLimitPerMin: +env.RATE_LIMIT_PER_MIN || 600
  };
}

/** Otorite sunucusu yapılandırması (AUTHORITY_* değişkenleri). */
function loadAuthorityConfig(overrides = {}) {
  const base = loadConfig(overrides), env = base.env;
  return {
    ...base,
    dataDir: path.resolve(env.AUTHORITY_DATA_DIR || env.DATA_DIR || path.join(process.cwd(), 'data-otorite')),
    publicDir: path.resolve(__dirname, '..', 'public-authority'),
    port: env.PORT !== undefined ? +env.PORT : 8090,
    signingKeyFile: env.AUTHORITY_SIGNING_KEY_FILE, encKeyFile: env.AUTHORITY_ENC_KEY_FILE,
    signingKey: null, encKey: null,
    maxBody: 256 * 1024
  };
}
module.exports = { loadConfig, loadAuthorityConfig };
