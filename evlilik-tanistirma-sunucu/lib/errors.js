'use strict';
class HttpError extends Error {
  constructor(status, message, extra) { super(message); this.status = status; this.extra = extra; }
}
const bad = (m, x) => new HttpError(400, m, x);
const forbid = (m = 'Bu işlem için yetkiniz yok.') => new HttpError(403, m);
const notFound = (m = 'Kayıt bulunamadı.') => new HttpError(404, m);
const conflict = (m) => new HttpError(409, m);
const unprocessable = (m, x) => new HttpError(422, m, x);
module.exports = { HttpError, bad, forbid, notFound, conflict, unprocessable };
