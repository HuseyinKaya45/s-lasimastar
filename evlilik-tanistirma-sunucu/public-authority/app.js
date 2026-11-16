'use strict';
/* Merkezî Otorite arayüzü. Yetki denetimi sunucudadır; bu arayüz yalnızca görünümdür. Bu sistemde kimlik/iletişim bilgisi YOKTUR. */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const S = { user: null, csrf: '', meta: null, params: null, route: { v: 'dash' }, ctx: {}, institution: '', require2fa: false, restricted: false };
const ROLE = { admin: 'Yönetici', operator: 'Operatör', denetci: 'Denetçi' };
const ST_I = { yanit_bekliyor: ['Yanıt bekleniyor', 'warn'], reddedildi: ['Reddedildi', ''], kabul: ['İki taraf kabul etti', 'good'], bulusma_planli: ['Görüşme planlı', 'good'], devam_ediyor: ['Devam ediyor', 'good'], bitti: ['Sona erdi', ''], sikayet: ['Şikâyet / inceleme', 'bad'], zamanasimi: ['Zaman aşımı', ''], iptal: ['İptal', ''], kararverdi: ['Evlenme kararı', 'good'] };
const fmtT = (ts) => { if (!ts) return '—'; const d = new Date(ts), p = (n) => String(n).padStart(2, '0'); return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`; };
const can = { op: () => S.user && ['admin', 'operator'].includes(S.user.role), admin: () => S.user && S.user.role === 'admin' };

class ApiError extends Error { constructor(status, msg, body) { super(msg); this.status = status; this.body = body || {}; } }
async function api(method, path, body) {
  const r = await fetch(path, { method, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(S.csrf ? { 'X-CSRF-Token': S.csrf } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  let j = null; try { j = await r.json(); } catch { /* json değil */ }
  if (!r.ok) { if (r.status === 401 && S.user && path !== '/api/login') { S.user = null; S.csrf = ''; await showLogin('Oturum sona erdi; yeniden giriş yapın.'); } throw new ApiError(r.status, (j && j.error) || 'Hata ' + r.status, j); }
  return j;
}
function saveJson(obj, name) { const b = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
const toast = (m) => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3500); };
const fail = (e) => { if (e instanceof ApiError) { const x = e.body && e.body.errors; alert(e.message + (x ? '\n• ' + x.join('\n• ') : '')); } else { console.error(e); alert('Beklenmeyen hata.'); } };
const guard = (fn) => async (...a) => { try { return await fn(...a); } catch (e) { fail(e); } };
const badge = (map, k) => `<span class="badge ${(map[k] || ['', ''])[1]}">${esc((map[k] || [k])[0])}</span>`;
function pager(page, total, size, act) { const pages = Math.max(1, Math.ceil(total / size)); return `<div class="pager"><button class="b ghost sm" data-act="${act}" data-p="${page - 1}" ${page <= 1 ? 'disabled' : ''}>‹ Önceki</button><span class="small muted">Sayfa ${page}/${pages} · ${total} kayıt</span><button class="b ghost sm" data-act="${act}" data-p="${page + 1}" ${page >= pages ? 'disabled' : ''}>Sonraki ›</button></div>`; }
const readFileJson = async (file) => { try { return JSON.parse(await file.text()); } catch { throw new ApiError(0, 'Dosya okunamadı (geçerli JSON değil).'); } };

/* ------------------------------------------------------------------ oturum */
let lastAct = Date.now(), idleTimer = null;
['click', 'keydown', 'input'].forEach((e) => document.addEventListener(e, () => { lastAct = Date.now(); }));
function startIdleWatch() {
  clearInterval(idleTimer);
  idleTimer = setInterval(async () => { const idle = ((S.params && S.params.params.sessionIdleMinutes) || 15) * 60000; if (S.user && Date.now() - lastAct > idle) { try { await api('POST', '/api/logout'); } catch { /* */ } S.user = null; S.csrf = ''; await showLogin('Etkinlik olmadığı için oturum kapatıldı.'); } }, 15000);
}
function chrome() {
  $('#brand').innerHTML = `${esc(S.institution || 'Merkezî Otorite')}<small>Merkezî Eşleştirme Otoritesi</small>`;
  $('#who').innerHTML = S.user ? `<span class="badge info">${esc(S.user.name)} · ${ROLE[S.user.role]}</span><button class="b ghost sm" data-act="nav" data-k="account">Hesabım</button><button class="b ghost sm" data-act="logout">Çıkış</button>` : '';
  const tabs = $('#tabs'); if (!S.user || S.restricted) { tabs.classList.add('hidden'); return; }
  const T = [['dash', 'Panel'], ['units', 'Birimler'], ['transfer', 'Paket alışverişi'], ['profiles', 'Havuz'], ['match', 'Eşleştirme'], ['intros', 'Tanıştırmalar'], ['fair', 'Adalet raporu'], ['params', 'Parametreler'], ['audit', 'Denetim']];
  if (can.admin()) T.push(['users', 'Kullanıcılar']); T.push(['about', 'Hakkında']);
  tabs.classList.remove('hidden');
  const cur = S.route.v === 'intro' ? 'intros' : S.route.v === 'profile' ? 'profiles' : S.route.v;
  $('#tabsin').innerHTML = T.map(([k, n]) => `<button class="${cur === k ? 'on' : ''}" data-act="nav" data-k="${k}">${n}</button>`).join('');
}
async function showLogin(msg, needCode) {
  S.restricted = false; chrome();
  try { S.institution = (await api('GET', '/api/public')).institution; chrome(); } catch { /* */ }
  $('#app').innerHTML = `<div class="card login"><h1>Otorite girişi</h1>${msg ? `<div class="note warn">${esc(msg)}</div>` : ''}
   <form data-form="login"><label>Kullanıcı adı</label><input name="username" autocomplete="username" required autofocus><label>Parola</label><input name="password" type="password" autocomplete="current-password" required>
   <div id="codebox" class="${needCode ? '' : 'hidden'}"><label>İki aşamalı doğrulama kodu</label><input name="code" inputmode="numeric" maxlength="6"></div><div id="lerr"></div><button class="b mt8" type="submit">Giriş</button></form>
   <p class="small muted mt14">Yalnızca yetkili otorite personeli içindir. Tüm işlemler kaydedilir.</p></div>`;
}
async function boot() { try { const me = await api('GET', '/api/me'); S.user = me.user; S.csrf = me.csrf; S.require2fa = me.require2fa; S.institution = (await api('GET', '/api/public')).institution; await afterLogin(); } catch (e) { if (e instanceof ApiError && e.status === 401) await showLogin(); else fail(e); } }
async function afterLogin() {
  S.restricted = false;
  if (S.user.mustChange) { S.restricted = true; chrome(); $('#app').innerHTML = vForcePassword(); return; }
  if (S.require2fa && !S.user.totpEnabled) { S.restricted = true; chrome(); $('#app').innerHTML = await vAccount(true); return; }
  S.meta = await api('GET', '/api/meta'); S.params = await api('GET', '/api/params'); S.institution = S.params.params.institution; startIdleWatch(); go('dash');
}
const vForcePassword = () => `<div class="card login"><h1>Parolanızı değiştirin</h1><div class="note warn">İlk girişte yeni bir parola belirlemeniz gerekir.</div><form data-form="pwchange"><label>Mevcut (geçici) parola</label><input name="oldPassword" type="password" required><label>Yeni parola</label><input name="newPassword" type="password" required autocomplete="new-password"><label>Yeni parola (tekrar)</label><input name="newPassword2" type="password" required autocomplete="new-password"><p class="small muted">En az 12 karakter; kullanıcı adınızı içermemeli.</p><button class="b" type="submit">Değiştir</button></form></div>`;
function go(v, extra) { S.route = { v, ...(extra || {}) }; render(); }
async function render() {
  chrome();
  const V = { dash: vDash, units: vUnits, transfer: vTransfer, profiles: vProfiles, profile: vProfile, match: vMatch, intros: vIntros, intro: vIntro, fair: vFair, params: vParams, audit: vAudit, users: vUsers, account: () => vAccount(false), about: vAbout };
  $('#app').innerHTML = '<p class="muted">Yükleniyor…</p>';
  try { const h = await (V[S.route.v] || vDash)(); if (typeof h === 'string') { $('#app').innerHTML = h; window.scrollTo(0, 0); } } catch (e) { if (e instanceof ApiError && e.status === 401) return; $('#app').innerHTML = `<div class="note bad">${esc(e.message)}</div>`; }
}

/* ------------------------------------------------------------------ panel */
async function vDash() {
  const d = await api('GET', '/api/dashboard'), n = (o, k) => o[k] || 0, I = d.intros;
  let al = d.chain.ok ? `<div class="note good">Denetim günlüğü bütünlüğü doğrulandı (${d.chain.n} kayıt).</div>` : `<div class="note bad"><b>UYARI:</b> Denetim zinciri ${d.chain.at}. kayıtta bozuk.</div>`;
  if (!S.meta.signing || !S.meta.encryption) al += '<div class="note bad"><b>Anahtarlar eksik:</b> AUTHORITY_SIGNING_KEY_FILE / AUTHORITY_ENC_KEY_FILE tanımlı değil; paket alınamaz/üretilemez.</div>';
  if (!d.bundleCurrent) al += '<div class="note warn">Geçerli parametreler henüz imzalı paket olarak yayımlanmadı (Parametreler sayfası).</div>';
  if (d.alerts.staleUnits) al += `<div class="note warn"><b>${d.alerts.staleUnits}</b> birimden son 7 gündür havuz paketi gelmedi; verileri eski olabilir.</div>`;
  if (d.alerts.lateResponses) al += `<div class="note warn"><b>${d.alerts.lateResponses}</b> tanıştırmada yanıt süresi doldu.</div>`;
  if (d.alerts.complaints) al += `<div class="note bad"><b>${d.alerts.complaints}</b> şikâyet/inceleme dosyası bekliyor.</div>`;
  if (d.alerts.pendingProposals) al += `<div class="note info"><b>${d.alerts.pendingProposals}</b> parametre önerisi ikinci yönetici onayı bekliyor.</div>`;
  const active = ['yanit_bekliyor', 'kabul', 'bulusma_planli', 'devam_ediyor'].reduce((x, k) => x + n(I, k), 0);
  return `<h1>Panel</h1>${al}<div class="grid g4"><div class="card stat"><b>${d.units.filter((u) => u.active).length}</b><span>Etkin birim</span></div><div class="card stat"><b>${d.profiles.total}</b><span>Merkezî havuzdaki profil (müsait ${d.profiles.available})</span></div><div class="card stat"><b>${active}</b><span>Aktif tanıştırma</span></div><div class="card stat"><b>${n(I, 'kabul') + n(I, 'bulusma_planli') + n(I, 'devam_ediyor') + n(I, 'kararverdi')}</b><span>İki tarafın kabul ettiği</span></div></div>
  <div class="card"><h3>Son eşleştirme koşusu</h3>${d.lastRun ? `<p>${fmtT(d.lastRun.ts)} · havuz ${d.lastRun.pool} · ${d.lastRun.suggestions} öneri · öneri çıkmayan ${d.lastRun.noMatch}</p>` : '<p class="muted">Henüz çalıştırılmadı.</p>'}</div>
  <div class="card"><h3>Birimler</h3><div class="tw"><table><tr><th>Birim</th><th>Profil</th><th>Müsait</th><th>Son havuz paketi</th></tr>${d.units.map((u) => `<tr><td>${esc(u.name)} <span class="muted small">${esc(u.code)}</span>${u.active ? '' : ' <span class="badge bad">pasif</span>'}</td><td>${u.profiles}</td><td>${u.available}</td><td>${fmtT(u.lastPoolTs)}${u.active && u.stale ? ' <span class="badge warn">eski</span>' : ''}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Birim kayıtlı değil.</td></tr>'}</table></div></div>
  <div class="card"><p class="small muted">Bu sistemde ad, soyad, T.C. kimlik no, telefon, e-posta, ilçe veya iç not <b>bulunmaz</b>. Yalnızca birimlerin, adayın ayrı rızasıyla ilettiği takma adlı (birim|referans) eşleştirme profilleri tutulur ve alan düzeyinde şifrelenir. Sistem yalnızca <b>öneri</b> üretir; iki taraf ayrı ayrı kabul etmeden iletişim koordinasyonu açılmaz.</p></div>`;
}

/* ------------------------------------------------------------------ birimler ve paket alışverişi */
async function vUnits() {
  const L = await api('GET', '/api/units');
  return `<h1>Birimler</h1><div class="card"><div class="tw"><table><tr><th>Kod</th><th>Ad / iletişim</th><th>Profil (müsait)</th><th>Son paket</th><th>Anahtar kimlikleri</th><th></th></tr>
  ${L.map((u) => `<tr><td>${esc(u.code)}</td><td>${esc(u.name)}<div class="small muted">${esc(u.contact)}</div></td><td>${u.profiles} (${u.available})</td><td>${fmtT(u.lastPoolTs)}${u.active && u.stale ? ' <span class="badge warn">eski</span>' : ''}<div class="small muted">sıra ${u.lastSeqIn}/${u.seqOut}</div></td><td class="small mono">imza ${esc(u.signKeyId)}<br>şifre ${esc(u.encKeyId)}</td>
  <td>${u.active ? '<span class="badge good">Etkin</span>' : '<span class="badge bad">Pasif</span>'} ${can.admin() ? `<button class="b ghost sm" data-act="utoggle" data-code="${esc(u.code)}" data-active="${u.active ? 1 : 0}">${u.active ? 'Pasifleştir' : 'Etkinleştir'}</button>` : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Henüz birim yok.</td></tr>'}</table></div></div>
  ${can.admin() ? `<div class="card"><h3>Birim ekle</h3><p class="small muted">Birimde <code>npm run sign-keygen</code> çalıştırıldığında üretilen <b>birim-kimligi-KOD.json</b> dosyasını yükleyin (yalnız açık anahtarlar içerir). Anahtar kimliklerini birim yöneticisiyle telefonla/şahsen doğrulayın.</p>
  <form data-form="addunit"><div class="grid g3"><div><label>Birim kodu</label><input name="code" required pattern="[A-Za-z0-9._\\-]{2,40}"></div><div><label>Ad</label><input name="name" required maxlength="80"></div><div><label>İletişim (kabulden sonra karşı birime verilir)</label><input name="contact" maxlength="120"></div></div><label>Birim kimlik dosyası</label><input type="file" id="idfile" accept=".json" required><button class="b mt8" type="submit">Ekle</button></form></div>` : ''}`;
}
async function vTransfer() {
  const L = await api('GET', '/api/units'), log = await api('GET', '/api/packages');
  return `<h1>Paket alışverişi</h1><div class="note info small">Birimlerle dosya alışverişi (e-posta/USB/kurum ağı) yapılır. Birimden gelen paket <b>şifreli ve imzalıdır</b>; yalnız bu sunucu açabilir. Aynı paket ikinci kez veya eski sırayla uygulanamaz.</div>
  ${can.op() ? `<div class="card"><h3>Birimden gelen havuz paketini yükle</h3><input type="file" id="poolfile" accept=".json"><p class="small muted">Birim, Merkezî Eşleştirme sayfasından “Paket üret” ile oluşturur. Yüklenen pakette bulunmayan aday merkezî havuzdan çıkarılır (rıza geri çekme).</p></div>
  <div class="card"><h3>Birime öneri paketi hazırla</h3><p class="small muted">Başlatılan tanıştırmaların ve durum değişikliklerinin o birime ait kısmını şifreli/imzalı olarak üretir.</p><div class="row">${L.filter((u) => u.active).map((u) => `<button class="b ghost" data-act="mkproposals" data-code="${esc(u.code)}">${esc(u.name)} için öneri paketi</button>`).join('') || '<span class="muted">Etkin birim yok.</span>'}</div></div>` : ''}
  ${can.admin() || S.user.role === 'denetci' ? `<div class="card"><h3>Birimin imzalı denetim paketini yükle (toplu denetim)</h3><input type="file" id="auditfile" accept=".json"><p class="small muted">Kişisiz denetim günlüğü paketi; imza ve zincir doğrulanır.</p></div>` : ''}
  <div class="card"><h3>Son işlemler</h3><div class="tw"><table><tr><th>Zaman</th><th>Birim</th><th>Tür</th><th>Sıra</th><th>Kullanıcı</th><th>Ayrıntı</th></tr>${log.map((x) => `<tr><td class="small">${fmtT(x.ts)}</td><td>${esc(x.unit)}</td><td>${esc(x.kind)}</td><td>${x.seq ?? ''}</td><td>${esc(x.username)}</td><td class="small">${esc(x.detail)}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Kayıt yok.</td></tr>'}</table></div></div>`;
}

/* ------------------------------------------------------------------ havuz */
async function vProfiles() {
  const c = S.ctx.profiles = S.ctx.profiles || { q: '', unit: '', page: 1 }, units = await api('GET', '/api/units');
  const r = await api('GET', `/api/profiles?page=${c.page}${c.unit ? '&unit=' + encodeURIComponent(c.unit) : ''}${c.q ? '&q=' + encodeURIComponent(c.q) : ''}`);
  return `<h1>Merkezî havuz</h1><div class="card"><div class="row"><input id="pq" class="mw260" placeholder="Ara: referans, il, meslek" value="${esc(c.q)}"><select id="punit" class="mw220"><option value="">Tüm birimler</option>${units.map((u) => `<option value="${esc(u.code)}" ${c.unit === u.code ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select></div>
  <div class="tw"><table><tr><th>Takma ad</th><th>Birim</th><th>Cinsiyet</th><th>Yaş</th><th>İl</th><th>Eğitim</th><th>Durum</th><th>Aktif tanıştırma</th></tr>${r.items.map((p) => `<tr><td><a href="#" data-act="openprofile" data-key="${esc(p.key)}">${esc(p.key)}</a></td><td>${esc(p.unitName)}</td><td>${p.cins === 'K' ? 'Kadın' : p.cins === 'E' ? 'Erkek' : ''}</td><td>${p.age ?? ''}</td><td>${esc(p.il)}</td><td>${esc(p.edu)}</td><td>${p.available ? '<span class="badge good">Müsait</span>' : '<span class="badge info">Beklemede</span>'}</td><td>${p.activeIntros}</td></tr>`).join('') || '<tr><td colspan="8" class="muted">Profil yok.</td></tr>'}</table></div>${pager(r.page, r.total, r.pageSize, 'ppage')}</div>`;
}
async function vProfile() {
  const r = await api('GET', '/api/profiles/' + encodeURIComponent(S.route.key)), p = r.profile;
  const IMP = ['Önemsiz', 'Az', 'Önemli', 'Zorunlu'];
  return `<div class="row"><h1 class="sp">${esc(r.key)}</h1><button class="b ghost" data-act="nav" data-k="profiles">‹ Havuz</button></div><div class="note info small">Bu profil takma adlıdır; kimlik ve iletişim bilgisi bu sistemde yoktur, görüntüleme denetim günlüğüne yazıldı.</div>
  <div class="card"><div class="grid g3"><div><b>Birim</b><br>${esc(r.unitName)}</div><div><b>Yaş / cinsiyet</b><br>${p.age ?? ''} · ${p.cins === 'K' ? 'Kadın' : 'Erkek'}</div><div><b>İl</b><br>${esc(p.il)}</div><div><b>Eğitim</b><br>${esc(p.eduLabel)}</div><div><b>Medeni hâl / çocuk</b><br>${esc(p.medeni)} · ${p.cocuk}</div><div><b>Meslek</b><br>${esc(p.meslek)}</div></div><p class="mt8">${esc(p.tanitim)}</p></div>
  <div class="card"><h3>Tercihleri</h3><p class="small">Yaş ${p.prefs.ageMin}–${p.prefs.ageMax} (${IMP[p.prefs.ageImp]}) · konum ${esc(p.prefs.locMode)} (${IMP[p.prefs.locImp]}) · en az eğitim ${esc(p.prefs.eduMin)} (${IMP[p.prefs.eduImp]}) · medeni: ${esc((p.prefs.maritalOk || []).join(', '))} (${IMP[p.prefs.maritalImp]}) · çocuk ${p.prefs.kidsOk ? 'kabul' : 'istemez'} (${IMP[p.prefs.kidsImp]})</p></div>
  <div class="card"><h3>Tanıştırmalar</h3>${r.intros.map((i) => `<div><a href="#" data-act="openintro" data-id="${esc(i.id)}">${esc(i.id)}</a> ${badge(ST_I, i.status)}</div>`).join('') || '<p class="muted">Yok.</p>'}</div>`;
}

/* ------------------------------------------------------------------ eşleştirme */
async function vMatch() {
  const c = S.ctx.match = S.ctx.match || { q: '', page: 1 };
  const r = await api('GET', `/api/match/latest?page=${c.page}&pageSize=100${c.q ? '&q=' + encodeURIComponent(c.q) : ''}`);
  let h = `<div class="row"><h1 class="sp">Merkezî eşleştirme</h1>${can.op() ? '<button class="b" data-act="runmatch">Birleştir ve eşleştir</button>' : ''}</div>
  <div class="note info small">Tüm birimlerin rızalı profilleri birleştirilir; <b>yalnız farklı birimlerden</b> çiftler önerilir (aynı birimdeki adaylar için birim kendi eşleştirmesini kullanır). Sistem yalnızca <b>öneri</b> üretir. Tanıştırma başlatılınca öneri ilgili iki birime paket olarak gider; adaylarla birimler görüşür.</div>`;
  if (!r.run) return h + '<div class="card muted">Henüz eşleştirme çalıştırılmadı.</div>';
  if (S.ctx.why) {
    try {
      const w = await api('GET', `/api/match/why?a=${encodeURIComponent(S.ctx.why.a)}&b=${encodeURIComponent(S.ctx.why.b)}`);
      const rows = (L) => L.map((x) => `<tr><td>${esc(x.label)}</td><td>${x.s >= 1 ? '✔' : x.s > 0 ? '≈' : '✘'}</td><td>${['Önemsiz', 'Az', 'Önemli', 'Zorunlu'][x.imp]}</td><td class="small">${esc(x.note)}</td></tr>`).join('');
      h += `<div class="card"><h3>Uyum ayrıntısı: ${esc(w.nameA)} ↔ ${esc(w.nameB)}</h3>${w.hard ? '<p>Zorunlu tercih karşılanmıyor.</p>' : `<div class="grid g2"><div><b>${esc(w.nameA)} (${Math.round(w.sa)})</b><div class="tw"><table><tr><th>Ölçüt</th><th></th><th>Önem</th><th>Karşı taraf</th></tr>${rows(w.whyA)}</table></div></div><div><b>${esc(w.nameB)} (${Math.round(w.sb)})</b><div class="tw"><table><tr><th>Ölçüt</th><th></th><th>Önem</th><th>Karşı taraf</th></tr>${rows(w.whyB)}</table></div></div></div>`}</div>`;
    } catch (e) { h += `<div class="note bad">${esc(e.message)}</div>`; }
  }
  h += `<div class="card"><div class="row"><div class="sp">Koşu #${r.run.id} · ${fmtT(r.run.ts)} · ${esc(r.run.username)} · havuz ${r.run.pool} · incelenen çift ${r.run.considered} · öneri ${r.run.total}</div><span class="badge ${r.run.stale ? 'warn' : 'good'}">${r.run.stale ? 'parametreler değişti, yeniden çalıştırın' : 'güncel parametreler'}</span></div>
  <div class="row mt8"><input id="mq" class="mw260" placeholder="Referans, birim, il" value="${esc(c.q)}"></div><div class="tw"><table><tr><th>Puan</th><th>Aday 1</th><th>Aday 2</th><th>1→2</th><th>2→1</th><th></th></tr>
  ${r.items.map((p) => `<tr><td><b>${p.score}</b></td><td>${esc(p.a)}<div class="small muted">${esc(p.unitA)} · ${p.ageA ?? ''} · ${esc(p.ilA)}</div></td><td>${esc(p.b)}<div class="small muted">${esc(p.unitB)} · ${p.ageB ?? ''} · ${esc(p.ilB)}</div></td><td>${p.sa}</td><td>${p.sb}</td><td><button class="b ghost sm" data-act="why" data-a="${esc(p.a)}" data-b="${esc(p.b)}">Neden?</button> ${can.op() ? `<button class="b sm" data-act="startintro" data-a="${esc(p.a)}" data-b="${esc(p.b)}" ${p.canStart ? '' : 'disabled'}>Tanıştırma başlat</button>` : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Öneri yok.</td></tr>'}</table></div>${pager(r.page, r.run.total, r.pageSize, 'matchpage')}</div>`;
  if (r.noMatch.length) h += `<div class="card"><h3>Öneri çıkmayan profiller (${r.noMatch.length})</h3><div class="small">${r.noMatch.map((k) => `<a href="#" data-act="openprofile" data-key="${esc(k)}">${esc(k)}</a>`).join(' · ')}</div></div>`;
  return h;
}
async function vIntros() {
  const f = S.ctx.ifilter || '', L = await api('GET', '/api/intros' + (f ? '?status=' + f : ''));
  return `<h1>Merkezî tanıştırmalar</h1><div class="card"><div class="row"><select id="iflt" class="mw220"><option value="">Tüm durumlar</option>${Object.entries(ST_I).map(([k, v]) => `<option value="${k}" ${f === k ? 'selected' : ''}>${v[0]}</option>`).join('')}</select></div>
  <div class="tw"><table><tr><th>No</th><th>Taraflar</th><th>Puan</th><th>Durum</th><th>Güncelleme</th></tr>${L.map((i) => `<tr><td><a href="#" data-act="openintro" data-id="${esc(i.id)}">${esc(i.id)}</a></td><td>${esc(i.a)} <span class="muted">↔</span> ${esc(i.b)}</td><td>${i.score}</td><td>${badge(ST_I, i.status)}</td><td class="small">${fmtT(i.updatedAt)}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">Kayıt yok.</td></tr>'}</table></div></div>`;
}
async function vIntro() {
  const i = S.ctx.intro = await api('GET', '/api/intros/' + encodeURIComponent(S.route.id)), st = i.status;
  const dec = (r) => (r.dec ? `<span class="badge ${r.dec === 'kabul' ? 'good' : 'bad'}">${r.dec === 'kabul' ? 'Kabul' : 'Ret'}</span> <span class="small muted">${fmtT(r.ts)} · ${esc(r.method)}</span>` : '<span class="badge warn">Bekleniyor</span>');
  const act = [];
  if (can.op()) {
    if (st === 'kabul') act.push(['plan', 'Görüşme planla']); if (st === 'yanit_bekliyor') act.push(['timeout', 'Zaman aşımı']);
    if (['yanit_bekliyor', 'kabul', 'bulusma_planli', 'devam_ediyor'].includes(st)) { act.push(['cancel', 'İptal et']); act.push(['complaint', 'Şikâyet kaydı aç']); }
    if (st === 'sikayet' && can.admin()) act.push(['close-complaint', 'Şikâyeti kapat']);
  }
  return `<div class="row"><h1 class="sp">${esc(i.id)}</h1>${badge(ST_I, st)}<button class="b ghost" data-act="nav" data-k="intros">‹ Liste</button></div>
  <div class="card"><div class="grid g2"><div><b>${esc(i.a)}</b><div class="small muted">${esc(i.unitA)}</div>${dec(i.resp.a)}<div class="small">Sonuç bildirimi: ${esc(i.outcome.a || '—')}</div></div><div><b>${esc(i.b)}</b><div class="small muted">${esc(i.unitB)}</div>${dec(i.resp.b)}<div class="small">Sonuç bildirimi: ${esc(i.outcome.b || '—')}</div></div></div>
  <p class="mt8">Uyum puanı: <b>${i.score}</b> · Başlatan: ${esc(i.createdBy)}${i.meeting ? ` · Görüşme: ${esc(i.meeting.date)} ${esc(i.meeting.time)} — ${esc(i.meeting.place)}` : ''}</p>
  <p class="small muted">Kararlar birimler tarafından adaydan alınır ve havuz paketiyle bildirilir; otorite adaya doğrudan ulaşmaz.</p><div class="row">${act.map(([k, n]) => `<button class="b ghost sm" data-act="iaction" data-a="${k}">${n}</button>`).join('')}</div></div>
  <div class="card"><h3>Geçmiş</h3>${i.history.map((h) => `<div class="small"><span class="muted">${fmtT(h.ts)}</span> · ${esc(h.user)} — ${esc(h.text)}</div>`).join('')}</div>`;
}
async function vFair() {
  const f = await api('GET', '/api/fairness');
  return `<h1>Adalet raporu</h1><div class="note info small">Son koşuda gruplar arasında öneri çıkmama oranı farkı (eşik ${f.gapPct} puan). Sapma, politikanın belirli bir gruba haksızlık yaptığını gösterebilir; parametreler gözden geçirilmelidir.</div>
  ${f.groups.map((g) => `<div class="card"><h3>${esc(g.label)}</h3><div class="tw"><table><tr><th>Grup</th><th>Profil</th><th>Öneri çıkmayan</th><th>Oran</th><th>Kabul oranı</th></tr>${g.rows.map((r) => `<tr><td>${esc(r.group)}</td><td>${r.n}</td><td>${r.none}</td><td>%${r.nonePct}${r.warn ? ` <span class="badge warn">+${r.gap} puan</span>` : ''}</td><td>${r.acceptPct === null ? '—' : '%' + r.acceptPct}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">Veri yok.</td></tr>'}</table></div></div>`).join('')}`;
}

/* ------------------------------------------------------------------ parametreler */
async function vParams() {
  S.params = await api('GET', '/api/params'); const p = S.params;
  const draft = S.ctx.draft || p.params;
  return `<h1>Parametreler (otoritenin resmî kuralları)</h1><div class="note info small">Bu parametreler merkezî eşleştirmede kullanılır. <b>İmzalı paket</b> olarak yayımlanınca birimler yükleyip (LOCK_PARAMS=1 ile) kendi sistemlerini bunlara bağlayabilir. Sürüm <b>${p.version}</b> · mühür <span class="mono">${esc(p.seal)}</span></div>
  ${p.unpublished ? '<div class="note warn">Geçerli sürüm henüz paket olarak yayımlanmadı.</div>' : `<div class="note good small">Son paket: v${p.lastBundle.ver} (${fmtT(p.lastBundle.ts)}) — geçerli parametrelerle aynı.</div>`}
  ${p.proposals.filter((x) => x.status === 'bekliyor').map((x) => `<div class="note warn"><b>Bekleyen öneri #${x.id}</b> — ${esc(x.proposer)}: ${esc(x.reason)} <span class="mono small">${esc(x.seal.slice(0, 12))}</span>${can.admin() ? ` <button class="b sm" data-act="pdecide" data-ok="1" data-id="${x.id}">Onayla</button> <button class="b ghost sm" data-act="pdecide" data-ok="0" data-id="${x.id}">Reddet</button>` : ''}</div>`).join('')}
  ${can.admin() ? `<div class="card"><h3>Parametreleri düzenle (JSON)</h3><p class="small muted">Değişiklik gerekçesiyle önerilir; birden fazla yönetici varsa ikinci yöneticinin onayı gerekir. Sabit güvenceler (18 yaş tabanı vb.) değiştirilemez.</p>
  <form id="pform"><textarea id="pjson" class="mono big" spellcheck="false">${esc(JSON.stringify(draft, null, 2))}</textarea><label>Değişiklik gerekçesi</label><input id="preason" required minlength="5" maxlength="500"><button class="b mt8" type="submit">Öner / uygula</button></form></div>
  <div class="card"><h3>İmzalı parametre paketi</h3><div class="row"><input id="bnote" class="mw320" placeholder="Not (isteğe bağlı)"><button class="b" data-act="publish">Paketi imzala ve indir</button></div><div class="tw"><table><tr><th>Sürüm</th><th>Tarih</th><th>Yayımlayan</th><th>Not</th><th></th></tr>${p.bundles.map((b) => `<tr><td>v${b.ver}</td><td class="small">${fmtT(b.ts)}</td><td>${esc(b.username)}</td><td class="small">${esc(b.note)}</td><td><button class="b ghost sm" data-act="getbundle" data-ver="${b.ver}">İndir</button></td></tr>`).join('') || '<tr><td colspan="5" class="muted">Yayımlanmış paket yok.</td></tr>'}</table></div></div>
  <div class="card"><label class="chk"><input type="checkbox" id="req2fa" ${p.require2fa ? 'checked' : ''}> Tüm kullanıcılar için iki aşamalı doğrulamayı zorunlu kıl</label></div>` : ''}
  <div class="card"><h3>Sürüm geçmişi</h3><div class="tw"><table><tr><th>Sürüm</th><th>Tarih</th><th>Kullanıcı</th><th>Gerekçe</th><th>Mühür</th></tr>${p.history.map((h) => `<tr><td>${h.ver}</td><td class="small">${fmtT(h.ts)}</td><td>${esc(h.username)}</td><td class="small">${esc(h.reason)}</td><td class="mono small">${esc(h.seal.slice(0, 12))}</td></tr>`).join('')}</table></div></div>`;
}

/* ------------------------------------------------------------------ denetim, kullanıcılar, hesap */
async function vAudit() {
  const c = S.ctx.audit = S.ctx.audit || { q: '', page: 1, tab: 'own' }, size = 100;
  const tabs = `<div class="row"><button class="b ${c.tab === 'own' ? '' : 'ghost'} sm" data-act="atab" data-t="own">Otorite günlüğü</button><button class="b ${c.tab === 'units' ? '' : 'ghost'} sm" data-act="atab" data-t="units">Birimlerin toplu denetimi</button></div>`;
  if (c.tab === 'units') {
    const r = await api('GET', '/api/audit/units');
    return `<h1>Denetim</h1>${tabs}<div class="card"><h3>Birimlerin imzalı, kişisiz denetim paketleri</h3><div class="tw"><table><tr><th>Birim</th><th>Durum</th><th>Son paket</th><th>Denetim kaydı</th><th>Aday sayıları</th><th>Sorunlar</th></tr>${r.rows.map((x) => { const bad = x.issues.some((i) => i.level === 'engel'); return `<tr><td>${esc(x.code)}<div class="small muted">${esc(x.name || '')}</div></td><td>${bad ? '<span class="badge bad">Sorunlu</span>' : x.issues.length ? '<span class="badge warn">Uyarı</span>' : '<span class="badge good">Tamam</span>'}</td><td class="small">${x.last ? fmtT(x.last) : '—'}</td><td>${x.auditCount ?? '—'}</td><td class="small">${esc(JSON.stringify(x.applicants || {}))}</td><td class="small">${x.issues.map((i) => (i.level === 'engel' ? '✖ ' : '⚠ ') + esc(i.text)).join('<br>')}</td></tr>`; }).join('') || '<tr><td colspan="6" class="muted">Birim yok.</td></tr>'}</table></div>${r.unknown && r.unknown.length ? `<div class="note warn">Kayıtsız birimlerden paket: ${esc(r.unknown.join(', '))}</div>` : ''}</div>`;
  }
  const r = await api('GET', `/api/audit?limit=${size}&offset=${(c.page - 1) * size}${c.q ? '&q=' + encodeURIComponent(c.q) : ''}`), v = S.ctx.chain || await api('GET', '/api/audit/verify');
  return `<h1>Denetim</h1>${tabs}${v.ok ? `<div class="note good">Zincir doğrulandı: ${v.n} kayıt.<div class="mono small">Baş özeti: ${esc(v.head || '')}</div></div>` : `<div class="note bad"><b>Zincir ${v.at}. kayıtta bozuk.</b></div>`}
  <div class="card"><div class="row"><input id="aq" class="mw320" placeholder="Filtre" value="${esc(c.q)}"><button class="b ghost sm" data-act="verifychain">Zinciri yeniden doğrula</button></div><div class="tw"><table><tr><th>#</th><th>Zaman</th><th>Kullanıcı</th><th>İşlem</th><th>Ayrıntı</th></tr>${r.items.map((e) => `<tr><td>${e.i}</td><td class="small">${fmtT(e.ts)}</td><td>${esc(e.username)}<div class="small muted">${esc(e.role)}</div></td><td>${esc(e.action)}</td><td class="small">${esc(e.detail)}</td></tr>`).join('')}</table></div>${pager(c.page, r.total, size, 'auditpage')}</div>`;
}
async function vUsers() {
  const L = await api('GET', '/api/users');
  return `<h1>Kullanıcılar</h1>${S.ctx.temp ? `<div class="note warn"><b>${esc(S.ctx.temp.u)}</b> için geçici parola (yalnız bir kez):<div class="mono">${esc(S.ctx.temp.p)}</div></div>` : ''}
  <div class="card"><div class="tw"><table><tr><th>Kullanıcı</th><th>Ad</th><th>Rol</th><th>Durum</th><th>2FA</th><th></th></tr>${L.map((u) => `<tr><td>${esc(u.username)}</td><td>${esc(u.name)}</td><td>${ROLE[u.role]}</td><td>${u.active ? '<span class="badge good">Etkin</span>' : '<span class="badge bad">Pasif</span>'}${u.locked ? ' <span class="badge warn">kilitli</span>' : ''}</td><td>${u.totpEnabled ? '✔' : '—'}</td><td>${u.id !== S.user.id ? `<button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="toggle" data-active="${u.active ? 1 : 0}">${u.active ? 'Pasifleştir' : 'Etkinleştir'}</button> <button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="reset">Parolayı sıfırla</button> <button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="reset2fa">2FA sıfırla</button>${u.locked ? ` <button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="unlock">Kilidi aç</button>` : ''}` : '<span class="muted small">(siz)</span>'}</td></tr>`).join('')}</table></div></div>
  <div class="card"><h3>Kullanıcı ekle</h3><form data-form="adduser"><div class="grid g3"><div><label>Kullanıcı adı</label><input name="username" required pattern="[A-Za-z0-9._\\-]{3,32}"></div><div><label>Ad soyad</label><input name="name" required maxlength="80"></div><div><label>Rol</label><select name="role"><option value="operator">Operatör</option><option value="denetci">Denetçi (salt okunur)</option><option value="admin">Yönetici</option></select></div></div><p class="small muted">İki kişi kuralı için en az iki yönetici bulundurun.</p><button class="b" type="submit">Ekle</button></form></div>`;
}
async function vAccount(forced) {
  const me = (await api('GET', '/api/me')).user; S.user = { ...S.user, ...me }; S.restricted = !!forced; chrome();
  return `<h1>Hesabım</h1>${forced ? '<div class="note warn">Devam etmek için iki aşamalı doğrulamayı etkinleştirin.</div>' : ''}
  <div class="card"><h3>Parola değiştir</h3><form data-form="pwchange"><div class="grid g3"><div><label>Mevcut parola</label><input name="oldPassword" type="password" required></div><div><label>Yeni parola</label><input name="newPassword" type="password" required autocomplete="new-password"></div><div><label>Yeni parola (tekrar)</label><input name="newPassword2" type="password" required autocomplete="new-password"></div></div><button class="b mt8" type="submit">Değiştir</button></form></div>
  <div class="card"><h3>İki aşamalı doğrulama (TOTP)</h3>${me.totpEnabled ? '<div class="note good">Etkin.</div>' : S.ctx.totp ? `<div class="note info">Gizli anahtar: <span class="mono">${esc(S.ctx.totp.secret)}</span><br><span class="small mono">${esc(S.ctx.totp.otpauth)}</span></div><form data-form="totpenable"><label>Doğrulama kodu</label><input name="code" inputmode="numeric" maxlength="6" required><button class="b mt8" type="submit">Etkinleştir</button></form>` : '<button class="b" data-act="totpsetup">Kurulumu başlat</button>'}</div>`;
}
const vAbout = () => `<h1>Hakkında, ilkeler ve sınırlar</h1>
 <div class="card"><h3>Bu sistem ne yapar?</h3><ul><li>Birimlerin, adayın <b>ayrı ve açık rızasıyla</b> ilettiği takma adlı eşleştirme profillerini birleştirir ve birimler arası uyum önerisi üretir.</li><li>Öneriyi yalnızca ilgili iki birime iletir. Adaylarla birimler görüşür; kararlar birimlerden bildirilir. İki taraf da ayrı ayrı kabul edince, birimlerin koordinasyon bilgisi karşılıklı paylaşılır.</li><li>Parametreleri imzalı paket olarak yayımlar ve birimlerin imzalı, kişisiz denetim paketlerini toplu doğrular.</li></ul></div>
 <div class="card"><h3>Veri asgarîliği</h3><ul><li>Ad, soyad, T.C. kimlik no, telefon, e-posta, ilçe, iç notlar ve doğum günü bu sisteme <b>hiç gelmez</b> (doğum tarihi ay ortasına yuvarlanır).</li><li>Birim↔otorite dosyaları X25519+AES-256-GCM ile şifrelenir, Ed25519 ile imzalanır; yineleme/geri alma sıra numarasıyla engellenir.</li><li>Profiller veritabanında alan düzeyinde AES-256-GCM ile şifreli tutulur. Rıza geri çekilince bir sonraki pakette profil silinir.</li></ul></div>
 <div class="card"><h3>Sabit güvenceler</h3><ul><li>18 yaşından küçükler alınmaz; iki taraf ayrı kabul etmeden hiçbir şey paylaşılmaz; sistem kimseyi otomatik eşleştirmez; ret kalıcıdır; aday istediği an çekilebilir.</li></ul></div>
 <div class="card"><h3>Sınırlar</h3><ul><li>Karar destek aracıdır; puan evlilik başarısını öngörmez.</li><li>Merkezîleştirme, tek noktada toplanan hassas veri riski doğurur; KVKK aydınlatma/açık rıza, yetki ve saklama-imha politikası kurumun sorumluluğundadır. Bu yazılım bağımsız bir güvenlik denetiminden geçmemiştir.</li><li>Sistem nüfus, adli sicil veya koruma kararı sorgusu yapmaz; teyitler birimlerce elle yapılır.</li></ul></div>`;

/* ------------------------------------------------------------------ olaylar */
document.addEventListener('submit', guard(async (e) => {
  if (e.target.id === 'pform') {
    e.preventDefault(); let P; try { P = JSON.parse($('#pjson').value); } catch { return alert('Parametre JSON\'u geçersiz.'); }
    const r = await api('POST', '/api/params/propose', { params: P, reason: $('#preason').value }); S.ctx.draft = null; toast(r.applied ? 'Parametreler uygulandı.' : 'Öneri kaydedildi; ikinci yönetici onayı bekleniyor.'); return render();
  }
  const f = e.target.closest('form[data-form]'); if (!f) return; e.preventDefault(); const t = f.dataset.form, g = (n) => f.elements[n] && f.elements[n].value;
  if (t === 'login') {
    try { const r = await api('POST', '/api/login', { username: g('username'), password: g('password'), code: g('code') }); S.user = r.user; S.csrf = r.csrf; S.require2fa = r.require2fa; await afterLogin(); }
    catch (er) { if (er instanceof ApiError && er.body && er.body.need2fa) { $('#codebox').classList.remove('hidden'); f.elements.code.focus(); $('#lerr').innerHTML = '<div class="note info">İki aşamalı doğrulama kodunu girin.</div>'; } else $('#lerr').innerHTML = `<div class="note bad">${esc(er.message)}</div>`; }
  } else if (t === 'pwchange') {
    if (g('newPassword') !== g('newPassword2')) return alert('Yeni parolalar eşleşmiyor.');
    await api('POST', '/api/me/password', { oldPassword: g('oldPassword'), newPassword: g('newPassword') }); toast('Parola değiştirildi.'); S.user.mustChange = false; await afterLogin();
  } else if (t === 'adduser') { const r = await api('POST', '/api/users', { username: g('username'), name: g('name'), role: g('role') }); S.ctx.temp = { u: r.username, p: r.tempPassword }; render(); }
  else if (t === 'totpenable') { await api('POST', '/api/me/totp/enable', { code: g('code') }); S.ctx.totp = null; S.user.totpEnabled = true; toast('Etkinleştirildi.'); if (S.restricted) await afterLogin(); else render(); }
  else if (t === 'addunit') {
    const file = $('#idfile').files[0]; if (!file) return alert('Birim kimlik dosyası seçin.');
    await api('POST', '/api/units', { code: g('code'), name: g('name'), contact: g('contact'), identity: await readFileJson(file) }); toast('Birim eklendi.'); render();
  }
}));
document.addEventListener('change', guard(async (e) => {
  const id = e.target.id;
  if (id === 'iflt') { S.ctx.ifilter = e.target.value; render(); }
  if (id === 'punit') { S.ctx.profiles = { ...S.ctx.profiles, unit: e.target.value, page: 1 }; render(); }
  if (id === 'req2fa') { await api('POST', '/api/params/require2fa', { on: e.target.checked }); toast('Ayar kaydedildi.'); }
  if (id === 'poolfile' && e.target.files[0]) {
    const r = await api('POST', '/api/import/unit-package', { envelope: await readFileJson(e.target.files[0]) });
    alert(`${r.unit} paketi alındı (sıra ${r.seq}).\nProfil: +${r.added} yeni, ${r.updated} güncellendi, ${r.removed} çıkarıldı, ${r.rejectedCount} reddedildi.\nYanıt: ${r.responsesApplied} uygulandı, ${r.responsesIgnored} yok sayıldı, ${r.responsesInvalid} geçersiz.${r.paramMismatch ? '\n⚠ Birimin parametre mührü otoritenin geçerli mührüyle uyuşmuyor.' : ''}${r.rejected.length ? '\n\nReddedilen profiller:\n' + r.rejected.map((x) => `${x.ref}: ${x.reason}`).join('\n') : ''}`); return render();
  }
  if (id === 'auditfile' && e.target.files[0]) { const r = await api('POST', '/api/import/audit-package', { package: await readFileJson(e.target.files[0]) }); alert(`${r.unit}: imza ${r.signature}; denetim zinciri ${r.chain.ok ? 'sağlam (' + r.chain.n + ' kayıt)' : 'BOZUK (' + r.chain.at + '. kayıt)'}.`); return render(); }
}));
let debounce = null;
document.addEventListener('input', (e) => {
  const map = { pq: ['profiles', 'q'], mq: ['match', 'q'], aq: ['audit', 'q'] }, m = map[e.target.id]; if (!m) return;
  clearTimeout(debounce); const val = e.target.value, id = e.target.id;
  debounce = setTimeout(async () => { S.ctx[m[0]] = { ...(S.ctx[m[0]] || {}), q: val, page: 1 }; await render(); const n = $('#' + id); if (n) { n.focus(); n.setSelectionRange(val.length, val.length); } }, 350);
});
const ask = (msg, def) => { const r = prompt(msg, def || ''); return r === null ? null : r.trim(); };
async function postDownload(path, name, body) { const b = await api('POST', path, body || {}); saveJson(b, name); return b; }
document.addEventListener('click', guard(async (e) => {
  const t = e.target.closest('[data-act]'); if (!t) return; const a = t.dataset.act;
  if (['openprofile', 'openintro'].includes(a)) e.preventDefault();
  const intro = S.ctx.intro, done = (m) => { if (m) toast(m); return render(); };
  switch (a) {
    case 'nav': S.ctx.draft = null; S.ctx.why = null; S.ctx.temp = null; S.ctx.chain = null; return go(t.dataset.k);
    case 'logout': try { await api('POST', '/api/logout'); } catch { /* */ } S.user = null; S.csrf = ''; clearInterval(idleTimer); return showLogin();
    case 'openprofile': return go('profile', { key: t.dataset.key });
    case 'openintro': return go('intro', { id: t.dataset.id });
    case 'ppage': S.ctx.profiles.page = +t.dataset.p; return render();
    case 'matchpage': S.ctx.match.page = +t.dataset.p; return render();
    case 'auditpage': S.ctx.audit.page = +t.dataset.p; return render();
    case 'atab': S.ctx.audit = { q: '', page: 1, tab: t.dataset.t }; return render();
    case 'utoggle': if (t.dataset.active === '1' && !confirm('Birim pasifleştirilecek: profilleri havuzdan çıkarılır ve açık tanıştırmaları iptal edilir. Devam?')) return; await api('PATCH', '/api/units/' + encodeURIComponent(t.dataset.code), { active: t.dataset.active !== '1' }); return done('Birim güncellendi.');
    case 'mkproposals': await postDownload(`/api/units/${encodeURIComponent(t.dataset.code)}/proposals`, `oneri-paketi-${t.dataset.code}.json`); return done('Öneri paketi indirildi; birime iletin.');
    case 'runmatch': { const r = await api('POST', '/api/match/run'); S.ctx.match = { q: '', page: 1 }; return done(`Havuz ${r.pool} profil; ${r.suggestions} öneri üretildi.`); }
    case 'why': S.ctx.why = { a: t.dataset.a, b: t.dataset.b }; return render();
    case 'startintro': { const r = await api('POST', '/api/intros', { a: t.dataset.a, b: t.dataset.b }); return go('intro', { id: r.id }); }
    case 'iaction': {
      const k = t.dataset.a, p = `/api/intros/${encodeURIComponent(intro.id)}/${k}`;
      if (k === 'plan') { const d = ask('Görüşme tarihi (YYYY-AA-GG):'); if (!d) return; const tm = ask('Saat (SS:DD):', '14:00'); if (!tm) return; const pl = ask('Yer (kamuya açık):'); if (!pl) return; await api('POST', p, { date: d, time: tm, place: pl }); }
      else if (k === 'timeout') await api('POST', p, {});
      else { const r = ask({ cancel: 'İptal gerekçesi:', complaint: 'Şikâyet/güvenlik bildirimi (yalnız gerekli bilgi):', 'close-complaint': 'Kapatma gerekçesi ve sonucu:' }[k]); if (!r) return; await api('POST', p, { reason: r }); }
      return done();
    }
    case 'publish': { const b = await postDownload('/api/params/publish', 'parametre-paketi.json', { note: ($('#bnote') || {}).value }); return done(`Paket v${b.version} imzalandı ve indirildi; birimlere iletin.`); }
    case 'getbundle': { const b = await api('GET', '/api/params/bundles/' + t.dataset.ver); saveJson(b, `parametre-paketi-v${b.version}.json`); return; }
    case 'pdecide': { const ok = t.dataset.ok === '1', n = ask(ok ? 'Onay notu (isteğe bağlı):' : 'Ret gerekçesi:'); if (n === null || (!ok && n.length < 5)) return; await api('POST', `/api/params/proposals/${t.dataset.id}/${ok ? 'approve' : 'reject'}`, { note: n }); return done(ok ? 'Öneri onaylandı.' : 'Öneri reddedildi.'); }
    case 'verifychain': S.ctx.chain = await api('GET', '/api/audit/verify'); return render();
    case 'uact': {
      const id = +t.dataset.id, k = t.dataset.do, body = k === 'toggle' ? { active: t.dataset.active !== '1' } : k === 'reset' ? { resetPassword: true } : k === 'reset2fa' ? { resetTotp: true } : { unlock: true };
      if (k === 'reset' && !confirm('Parola sıfırlanacak ve oturumlar kapatılacak. Devam?')) return;
      const r = await api('PATCH', '/api/users/' + id, body); if (r.tempPassword) S.ctx.temp = { u: (await api('GET', '/api/users')).find((x) => x.id === id).username, p: r.tempPassword }; return render();
    }
    case 'totpsetup': S.ctx.totp = await api('POST', '/api/me/totp/setup'); return render();
  }
}));
boot();
