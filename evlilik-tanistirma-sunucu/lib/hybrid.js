'use strict';
/**
 * Birim ↔ otorite dosya aktarımı için "zarf" (envelope):
 *   - GİZLİLİK:  X25519 (ephemeral) + HKDF-SHA256 + AES-256-GCM  → yalnızca alıcı açabilir
 *   - KİMLİK/BÜTÜNLÜK: Ed25519 imzası, şifreli metin ve başlık üzerinde → gönderen doğrulanır, değişiklik tespit edilir
 *   - TEKRAR OYNATMA: başlıktaki `seq` (gönderen başına artan sayı) alıcı tarafında denetlenir
 * Dosya USB/e-posta/kurum ağı ile taşınabilir; taşıyıcıya güvenilmez.
 */
const crypto = require('node:crypto');
const { canon } = require('./crypto');
const AU = require('./authority');

const FORMAT = 'ets-envelope/1';

function genEncKeyPair() {
  return crypto.generateKeyPairSync('x25519', { publicKeyEncoding: { type: 'spki', format: 'pem' }, privateKeyEncoding: { type: 'pkcs8', format: 'pem' } });
}
const loadEncPrivate = (pem) => crypto.createPrivateKey(pem);
const encKeyId = (pubPem) => AU.keyIdOf(pubPem);

function deriveKey(shared, kind) {
  return Buffer.from(crypto.hkdfSync('sha256', shared, Buffer.alloc(0), 'ets-envelope-v1|' + kind, 32));
}

/**
 * payload: JSON'a dönüştürülebilir nesne.  from/to: tanımlayıcılar (birim kodu veya 'OTORITE').
 * signKey: gönderenin Ed25519 özel anahtarı (KeyObject).  recipientEncPub: alıcının X25519 açık anahtarı (PEM).
 */
function seal({ kind, from, to, seq, payload, signKey, recipientEncPub }) {
  const eph = crypto.generateKeyPairSync('x25519');
  const shared = crypto.diffieHellman({ privateKey: eph.privateKey, publicKey: crypto.createPublicKey(recipientEncPub) });
  const key = deriveKey(shared, kind);
  const header = { format: FORMAT, kind, from, to, seq, ts: Date.now(), epk: eph.publicKey.export({ type: 'spki', format: 'der' }).toString('base64'), rk: encKeyId(recipientEncPub) };
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  c.setAAD(Buffer.from(canon(header)));
  const ct = Buffer.concat([c.update(JSON.stringify(payload), 'utf8'), c.final()]);
  const body = { ...header, iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), ct: ct.toString('base64') };
  return { ...body, sk: AU.keyIdOf(AU.publicPemOf(signKey)), sig: AU.signObject(body, signKey) };
}

/** Önce imza doğrulanır (açmadan), sonra çözülür. Hata durumunda Error fırlatır. */
function open(env, { recipientEncPriv, senderSignPub, expectKind, expectTo }) {
  if (!env || env.format !== FORMAT) throw new Error('Zarf biçimi tanınmıyor.');
  const { sig, sk, ...body } = env;
  if (!AU.verifyObject(body, sig, senderSignPub)) throw new Error('İmza doğrulanamadı: dosya gönderenden gelmemiş veya değiştirilmiş.');
  if (sk && sk !== AU.keyIdOf(senderSignPub)) throw new Error('Dosya, kayıtlı olmayan bir anahtarla imzalanmış.');
  if (expectKind && body.kind !== expectKind) throw new Error('Beklenmeyen dosya türü: ' + body.kind);
  if (expectTo && body.to !== expectTo) throw new Error(`Bu dosya "${body.to}" için hazırlanmış, "${expectTo}" için değil.`);
  const { iv, tag, ct, ...header } = body;
  const shared = crypto.diffieHellman({ privateKey: recipientEncPriv, publicKey: crypto.createPublicKey({ key: Buffer.from(header.epk, 'base64'), type: 'spki', format: 'der' }) });
  const d = crypto.createDecipheriv('aes-256-gcm', deriveKey(shared, header.kind), Buffer.from(iv, 'base64'));
  d.setAAD(Buffer.from(canon(header))); d.setAuthTag(Buffer.from(tag, 'base64'));
  let plain;
  try { plain = Buffer.concat([d.update(Buffer.from(ct, 'base64')), d.final()]).toString('utf8'); } catch { throw new Error('Dosya çözülemedi (yanlış alıcı anahtarı veya bozulmuş içerik).'); }
  return { header, payload: JSON.parse(plain) };
}

module.exports = { FORMAT, genEncKeyPair, loadEncPrivate, encKeyId, seal, open };
