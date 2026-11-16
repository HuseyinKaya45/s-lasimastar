'use strict';
/* Evlilik Tanıştırma Sistemi — istemci. Tüm yetki denetimi sunucudadır; bu arayüz yalnızca görünümdür. */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const S = { user: null, csrf: '', meta: null, params: null, route: { v: 'dash' }, ctx: {}, institution: '', require2fa: false };
const ROLE = { admin: 'Yönetici', gorevli: 'Görevli', denetci: 'Denetçi' };
const ST_A = { taslak: ['Taslak', ''], dogrulama: ['Doğrulama bekliyor', 'warn'], aktif: ['Aktif (havuzda)', 'good'], beklemede: ['Beklemede', 'info'], inceleme: ['İncelemede', 'bad'], cekildi: ['Çekildi', ''], engelli: ['Güvenlik engeli', 'bad'], tamamlandi: ['Tamamlandı', 'good'], silindi: ['Anonimleştirildi', ''] };
const ST_I = { yanit_bekliyor: ['Yanıt bekleniyor', 'warn'], reddedildi: ['Reddedildi', ''], kabul: ['İki taraf kabul etti', 'good'], bulusma_planli: ['Görüşme planlı', 'good'], devam_ediyor: ['Devam ediyor', 'good'], bitti: ['Sona erdi', ''], sikayet: ['Şikâyet / inceleme', 'bad'], zamanasimi: ['Zaman aşımı', ''], cekildi: ['Aday çekildi', ''], kararverdi: ['Evlenme kararı', 'good'] };
const fmtT = (ts) => { const d = new Date(ts); const p = (n) => String(n).padStart(2, '0'); return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`; };
const fmtD = (s) => (s ? s.split('-').reverse().join('.') : '—');
const can = { edit: () => S.user && ['admin', 'gorevli'].includes(S.user.role), admin: () => S.user && S.user.role === 'admin' };

/* ------------------------------------------------------------------ API */
class ApiError extends Error { constructor(status, msg, body) { super(msg); this.status = status; this.body = body || {}; } }
async function api(method, path, body) {
  const r = await fetch(path, { method, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(S.csrf ? { 'X-CSRF-Token': S.csrf } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  let j = null; try { j = await r.json(); } catch { /* json değil */ }
  if (!r.ok) {
    if (r.status === 401 && S.user && path !== '/api/login') { S.user = null; S.csrf = ''; await showLogin('Oturum sona erdi; yeniden giriş yapın.'); }
    throw new ApiError(r.status, (j && j.error) || 'Hata ' + r.status, j);
  }
  return j;
}
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3200); }
const fail = (e) => { if (e instanceof ApiError) { const x = e.body && e.body.errors; alert(e.message + (x ? '\n• ' + x.join('\n• ') : '')); } else { console.error(e); alert('Beklenmeyen hata.'); } };
const guard = (fn) => async (...a) => { try { return await fn(...a); } catch (e) { fail(e); } };
async function download(path, name) {
  const r = await fetch(path, { credentials: 'same-origin' });
  if (!r.ok) throw new ApiError(r.status, 'İndirilemedi');
  const blob = await r.blob(); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ------------------------------------------------------------------ oturum ve çerçeve */
let lastAct = Date.now(), idleTimer = null;
['click', 'keydown', 'input'].forEach((e) => document.addEventListener(e, () => { lastAct = Date.now(); }));
function startIdleWatch() {
  clearInterval(idleTimer);
  idleTimer = setInterval(async () => {
    const idle = ((S.params && S.params.params.sessionIdleMinutes) || 15) * 60000;
    if (S.user && Date.now() - lastAct > idle) { try { await api('POST', '/api/logout'); } catch { /* yoksay */ } S.user = null; S.csrf = ''; await showLogin('Etkinlik olmadığı için oturum kapatıldı.'); }
  }, 15000);
}
function chrome() {
  $('#brand').innerHTML = `${esc(S.institution || 'Evlilik Tanıştırma Sistemi')}<small>Evlilik Tanıştırma Sistemi</small>`;
  $('#who').innerHTML = S.user ? `<span class="badge info">${esc(S.user.name)} · ${ROLE[S.user.role]}</span><button class="b ghost sm" data-act="nav" data-k="account">Hesabım</button><button class="b ghost sm" data-act="logout">Çıkış</button>` : '';
  const tabs = $('#tabs');
  if (!S.user || S.restricted) { tabs.classList.add('hidden'); return; }
  const T = [['dash', 'Panel'], ['apps', 'Adaylar'], ['match', 'Eşleştirme'], ['intros', 'Tanıştırmalar'], ['fair', 'Adalet raporu'], ['params', 'Parametreler']];
  if (['admin', 'denetci'].includes(S.user.role)) T.push(['audit', 'Denetim']);
  if (can.admin()) { T.push(['users', 'Kullanıcılar']); T.push(['data', 'Veri']); }
  T.push(['about', 'Hakkında']);
  tabs.classList.remove('hidden');
  const cur = S.route.v === 'app' ? 'apps' : S.route.v === 'intro' ? 'intros' : S.route.v;
  $('#tabsin').innerHTML = T.map(([k, n]) => `<button class="${cur === k ? 'on' : ''}" data-act="nav" data-k="${k}">${n}</button>`).join('');
}
async function showLogin(msg, needCode) {
  S.restricted = false; chrome();
  try { S.institution = (await api('GET', '/api/public')).institution; chrome(); } catch { /* yoksay */ }
  $('#app').innerHTML = `<div class="card login"><h1>Oturum aç</h1>${msg ? `<div class="note warn">${esc(msg)}</div>` : ''}
   <form data-form="login"><label>Kullanıcı adı</label><input name="username" autocomplete="username" required autofocus>
   <label>Parola</label><input name="password" type="password" autocomplete="current-password" required>
   <div id="codebox" class="${needCode ? '' : 'hidden'}"><label>İki aşamalı doğrulama kodu (6 hane)</label><input name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6"></div>
   <div id="lerr"></div><button class="b mt8" type="submit">Giriş</button></form>
   <p class="small muted mt14">Bu sistem yalnızca yetkili personel içindir. Tüm işlemler kaydedilir.</p></div>`;
}
async function boot() {
  try {
    const me = await api('GET', '/api/me'); S.user = me.user; S.csrf = me.csrf; S.require2fa = me.require2fa;
    S.institution = (await api('GET', '/api/public')).institution;
    await afterLogin();
  } catch (e) { if (e instanceof ApiError && e.status === 401) await showLogin(); else fail(e); }
}
async function afterLogin() {
  S.restricted = false;
  if (S.user.mustChange) { S.restricted = true; chrome(); return vForcePassword(); }
  if (S.require2fa && !S.user.totpEnabled) { S.restricted = true; chrome(); $('#app').innerHTML = await vAccount(true); return; }
  S.meta = await api('GET', '/api/meta'); S.params = await api('GET', '/api/params'); S.institution = S.params.params.institution;
  startIdleWatch(); go('dash');
}
function vForcePassword() {
  $('#app').innerHTML = `<div class="card login"><h1>Parolanızı değiştirin</h1><div class="note warn">İlk girişte veya sıfırlama sonrası yeni bir parola belirlemeniz gerekir.</div>
   <form data-form="pwchange"><label>Mevcut (geçici) parola</label><input name="oldPassword" type="password" required autocomplete="current-password">
   <label>Yeni parola</label><input name="newPassword" type="password" required autocomplete="new-password"><label>Yeni parola (tekrar)</label><input name="newPassword2" type="password" required autocomplete="new-password">
   <p class="small muted">En az 12 karakter; küçük harf ile büyük harf veya rakam içermeli; kullanıcı adınızı içermemeli.</p><button class="b" type="submit">Parolayı değiştir</button></form></div>`;
}
function go(v, extra) { S.route = { v, ...(extra || {}) }; render(); }
async function render() {
  chrome();
  const V = { dash: vDash, apps: vApps, app: vApp, match: vMatch, intros: vIntros, intro: vIntro, fair: vFair, params: vParams, audit: vAudit, users: vUsers, data: vData, account: () => vAccount(false), about: vAbout };
  $('#app').innerHTML = '<p class="muted">Yükleniyor…</p>';
  try { const h = await (V[S.route.v] || vDash)(); if (typeof h === 'string') { $('#app').innerHTML = h; window.scrollTo(0, 0); } } catch (e) { if (e instanceof ApiError && e.status === 401) return; $('#app').innerHTML = `<div class="note bad">${esc(e.message)}</div>`; }
}

/* ------------------------------------------------------------------ yardımcılar */
const badge = (map, k) => `<span class="badge ${(map[k] || ['', ''])[1]}">${esc((map[k] || [k])[0])}</span>`;
const sel = (name, opts, val, dis) => `<select name="${name}" ${dis ? 'disabled' : ''}>${opts.map(([k, t]) => `<option value="${esc(k)}" ${String(val) === String(k) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
function pager(page, total, size, act) { const pages = Math.max(1, Math.ceil(total / size)); return `<div class="pager"><button class="b ghost sm" data-act="${act}" data-p="${page - 1}" ${page <= 1 ? 'disabled' : ''}>‹ Önceki</button><span class="small muted">Sayfa ${page}/${pages} · ${total} kayıt</span><button class="b ghost sm" data-act="${act}" data-p="${page + 1}" ${page >= pages ? 'disabled' : ''}>Sonraki ›</button></div>`; }

/* ------------------------------------------------------------------ panel */
async function vDash() {
  const d = await api('GET', '/api/dashboard'), A = d.applicants, I = d.intros, n = (o, k) => o[k] || 0;
  let al = d.chain.ok ? `<div class="note good">Denetim günlüğü bütünlüğü doğrulandı (${d.chain.n} kayıt).</div>` : `<div class="note bad"><b>UYARI:</b> Denetim günlüğü zinciri ${d.chain.at}. kayıtta bozuk. Veri değiştirilmiş olabilir.</div>`;
  if (d.officialSeal) al += d.sealMatches ? '<div class="note good">Parametre mührü resmî mühürle eşleşiyor.</div>' : '<div class="note bad"><b>UYARI:</b> Parametre mührü, makamın bildirdiği resmî mühürle eşleşmiyor.</div>';
  else al += '<div class="note warn small">Resmî parametre mührü tanımlanmamış (Parametreler sayfasından girilebilir).</div>';
  if (d.alerts.lateResponses) al += `<div class="note warn"><b>${d.alerts.lateResponses}</b> tanıştırmada yanıt süresi (${d.responseDays} gün) doldu.</div>`;
  if (d.alerts.complaints) al += `<div class="note bad"><b>${d.alerts.complaints}</b> şikâyet/inceleme dosyası bekliyor.</div>`;
  if (d.alerts.retentionOverdue) al += `<div class="note warn"><b>${d.alerts.retentionOverdue}</b> kapanmış kaydın saklama süresi (${d.retentionDays} gün) dolmuş; anonimleştirme değerlendirilmeli.</div>`;
  if (d.alerts.pendingProposals) al += `<div class="note info"><b>${d.alerts.pendingProposals}</b> parametre önerisi ikinci yönetici onayı bekliyor.</div>`;
  const total = Object.values(A).reduce((x, y) => x + y, 0), activeI = ['yanit_bekliyor', 'kabul', 'bulusma_planli', 'devam_ediyor'].reduce((x, k) => x + n(I, k), 0);
  return `<h1>Panel</h1>${al}<div class="grid g4"><div class="card stat"><b>${total}</b><span>Toplam aday</span></div><div class="card stat"><b>${n(A, 'aktif')}</b><span>Havuzdaki aktif aday</span></div>
   <div class="card stat"><b>${n(A, 'taslak') + n(A, 'dogrulama')}</b><span>Taslak / doğrulama bekleyen</span></div><div class="card stat"><b>${activeI}</b><span>Aktif tanıştırma</span></div></div>
   <div class="card"><h3>Son eşleştirme koşusu</h3>${d.lastRun ? `<p>${fmtT(d.lastRun.ts)} · havuz ${d.lastRun.pool} aday · ${d.lastRun.suggestions} öneri · öneri çıkmayan ${d.lastRun.noMatch} aday</p>` : '<p class="muted">Henüz çalıştırılmadı.</p>'}</div>
   <div class="card"><p class="small muted">Sistem yalnızca <b>öneri</b> üretir. Hiçbir aday kendi onayı olmadan başkasına gösterilmez ve iletişim bilgisi paylaşılmaz. Kayıtlar sunucuda alan düzeyinde şifreli saklanır; kişisel veri içeren her görüntüleme denetim günlüğüne yazılır.</p></div>`;
}

/* ------------------------------------------------------------------ adaylar */
async function vApps() {
  const c = S.ctx.apps = S.ctx.apps || { status: '', q: '', page: 1 };
  const qs = new URLSearchParams({ page: c.page, ...(c.status ? { status: c.status } : {}), ...(c.q ? { q: c.q } : {}) });
  const r = await api('GET', '/api/applicants?' + qs);
  return `<div class="row"><h1 class="sp">Adaylar</h1>${can.edit() ? '<button class="b" data-act="newapp">+ Yeni aday</button>' : ''}</div>
  <div class="card"><div class="row"><input id="q" class="mw260" placeholder="Ara: ad, soyad, il, no…" value="${esc(c.q)}">
   <select id="flt" class="mw220"><option value="">Tüm durumlar</option>${Object.entries(ST_A).map(([k, v]) => `<option value="${k}" ${c.status === k ? 'selected' : ''}>${v[0]}</option>`).join('')}</select></div>
  <div class="tw"><table><tr><th>No</th><th>Aday</th><th>Yaş</th><th>İl</th><th>Durum</th><th>Aktif tanıştırma</th></tr>
  ${r.items.map((a) => `<tr><td><a href="#" data-act="open" data-id="${esc(a.id)}">${esc(a.id)}</a>${a.demo ? ' <span class="badge warn">deneme</span>' : ''}</td><td>${esc(a.ad || '')} ${esc(a.soyad || '')}<div class="small muted">${a.cins === 'K' ? 'Kadın' : a.cins === 'E' ? 'Erkek' : ''} · ${esc(a.kimNo)}</div></td><td>${a.age ?? '—'}</td><td>${esc(a.il)}</td><td>${badge(ST_A, a.status)}</td><td>${a.activeIntros}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Kayıt yok.</td></tr>'}</table></div>${pager(r.page, r.total, r.pageSize, 'appspage')}</div>`;
}
const IMPOPT = () => S.meta.IMP;
async function vApp() {
  const id = S.route.id;
  const r = await api('GET', '/api/applicants/' + encodeURIComponent(id)); const a = r.applicant, P = S.params.params;
  S.ctx.cur = { id, version: r.version };
  const head = `<div class="row"><h1 class="sp">${esc(a.ad || '')} ${esc(a.soyad || '')} <span class="muted">${esc(a.id)}</span></h1>${badge(ST_A, a.status)}</div>`;
  if (a.masked) {
    return `${head}<div class="note info">Denetçi görünümü: kişisel veriler maskelidir; iletişim ve serbest metin alanları gösterilmez.</div>
     <div class="card"><div class="grid g3"><div>Cinsiyet: ${a.cins === 'K' ? 'Kadın' : a.cins === 'E' ? 'Erkek' : '—'}</div><div>Yaş: ${a.age ?? '—'}</div><div>İl: ${esc(a.il)}</div><div>Kimlik: ${esc(a.kimNo)}</div><div>Eğitim: ${esc(P.eduLevels[+a.edu] || '')}</div><div>Çocuk: ${a.cocuk}</div></div></div>
     <div class="card"><h3>Tanıştırmalar</h3>${introLinks(r.intros)}</div><button class="b ghost" data-act="nav" data-k="apps">← Liste</button>`;
  }
  const ro = !can.edit() || a.status === 'silindi' || ['cekildi', 'tamamlandi'].includes(a.status), d = ro ? 'disabled' : '';
  if (a.status === 'silindi') return `${head}<div class="note info">Bu kaydın kişisel verileri silinmiştir (anonimleştirildi).</div><div class="card"><h3>İşlem geçmişi</h3>${histTable(a.history)}</div><button class="b ghost" data-act="nav" data-k="apps">← Liste</button>`;
  const ck = r.check, stb = { UYGUN: ['Havuza alınabilir', 'good'], EKSIK: ['Eksikler var', 'warn'], ENGEL: ['Engel var', 'bad'] }[ck.status], LV = { engel: ['ENGEL', 'bad'], eksik: ['EKSİK', 'warn'], bilgi: ['BİLGİ', ''] };
  const eduOpts = P.eduLevels.map((x, i) => [String(i), x]), pr = a.prefs;
  const qs = P.questions.filter((q) => q.enabled).map((q) => {
    const cur = a.qa[q.id] || { ans: '', accept: [], imp: '1' };
    return `<div class="q"><b>${esc(q.label)}</b>${q.sensitive ? ' <span class="badge bad">hassas · açık rıza gerekir</span>' : ''}<div class="grid g3">
      <div><label>Sizin yanıtınız</label><select name="q_${esc(q.id)}_ans" ${d}><option value="">—</option>${q.opts.map((o) => `<option ${cur.ans === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></div>
      <div><label>Karşı tarafta kabul edilebilir yanıtlar</label><div class="opts">${q.opts.map((o, i) => `<label class="chk"><input type="checkbox" name="q_${esc(q.id)}_acc_${i}" ${cur.accept.includes(o) ? 'checked' : ''} ${d}> ${esc(o)}</label>`).join('')}</div></div>
      <div><label>Önem</label>${sel('q_' + q.id + '_imp', IMPOPT(), cur.imp, ro)}</div></div></div>`;
  }).join('');
  const act = [];
  if (can.edit() && !ro) {
    act.push('<button class="b" data-act="saveapp">Kaydet</button>');
    if (['taslak', 'dogrulama', 'beklemede'].includes(a.status)) act.push(`<button class="b ghost" data-act="aaction" data-a="activate" ${ck.status === 'UYGUN' ? '' : 'disabled'}>Havuza al (aktif yap)</button>`);
    if (a.status === 'aktif') act.push('<button class="b ghost" data-act="aaction" data-a="pause">Beklemeye al</button>');
    act.push('<button class="b ghost" data-act="aaction" data-a="withdraw" data-ask="Çekilme talebi kaydı (adayın talebi; gerekçe göstermek zorunda değildir — kayıt notu yazın):">Adayın çekilme talebi</button>');
    act.push('<button class="b red" data-act="aaction" data-a="safety" data-ask="Güvenlik engeli gerekçesi (yalnız gerekli bilgiyi yazın):">Güvenlik engeli koy</button>');
    if (can.admin() && ['engelli', 'inceleme'].includes(a.status)) act.push('<button class="b ghost" data-act="aaction" data-a="release" data-ask="Engel/inceleme kaldırma gerekçesi:">Engeli/incelemeyi kaldır</button>');
    if (can.admin()) act.push('<button class="b red" data-act="aaction" data-a="anonymize" data-ask="Kişisel veriler KALICI silinecek. Gerekçe (ör. adayın silme talebi):" data-confirm="1">Kişisel verileri sil</button>');
  }
  if (can.edit()) act.push(`<button class="b ghost" data-act="card" data-id="${esc(a.id)}">🖨 Tanıtım kartı</button>`);
  act.push('<button class="b ghost" data-act="nav" data-k="apps">← Liste</button>');
  return `${head}${r.cooldownActive ? `<div class="note info">Yeni öneri için bekleme süresi: ${fmtD(a.cooldownUntil)} tarihine kadar.</div>` : ''}
  <div class="card"><div class="row"><h3 class="sp">Havuza alınma koşulları</h3><span class="badge ${stb[1]}">${stb[0]}</span></div>
   ${ck.findings.map((f) => `<div class="find"><span class="badge ${LV[f.lvl][1]}">${LV[f.lvl][0]}</span><div><b class="small muted">${esc(f.id)}</b><br>${esc(f.txt)}</div></div>`).join('') || '<p class="muted">Bulgu yok.</p>'}
   <p class="small muted">Kimlik ve koruma kararı kontrolleri görevlinin teyitleridir; sistem resmî sorgu yapmaz.</p></div>
  <form id="appform">
  <div class="card"><h3>Kimlik ve iletişim <span class="badge bad">hassas</span></h3><div class="grid g3">
   <div><label>Ad</label><input name="ad" value="${esc(a.ad)}" ${d}></div><div><label>Soyad</label><input name="soyad" value="${esc(a.soyad)}" ${d}></div>
   <div><label>T.C. kimlik no</label><input name="kimNo" value="${esc(a.kimNo)}" ${d} autocomplete="off"></div>
   <div><label>Doğum tarihi</label><input type="date" name="dogum" value="${esc(a.dogum)}" ${d}></div>
   <div><label>Cinsiyet</label>${sel('cins', [['', 'Seçiniz'], ['K', 'Kadın'], ['E', 'Erkek']], a.cins, ro)}</div>
   <div><label>Telefon (yalnız görevli görür)</label><input name="telefon" value="${esc(a.telefon)}" ${d}></div>
   <div><label>E-posta</label><input name="eposta" value="${esc(a.eposta)}" ${d}></div><div><label>Yaşadığı il</label><input name="il" value="${esc(a.il)}" ${d}></div><div><label>İlçe</label><input name="ilce" value="${esc(a.ilce)}" ${d}></div></div></div>
  <div class="card"><h3>Profil (karşı tarafa sunulacak özetin kaynağı)</h3><div class="grid g3">
   <div><label>Medeni durum</label>${sel('medeni', S.meta.MEDENI, a.medeni, ro)}</div><div><label>Çocuk sayısı</label><input type="number" min="0" max="12" name="cocuk" value="${a.cocuk}" ${d}></div>
   <div><label>Eğitim düzeyi</label>${sel('edu', eduOpts, a.edu, ro)}</div><div><label>Çalışma durumu</label>${sel('is', S.meta.ISDURUM, a.is, ro)}</div><div><label>Meslek / alan</label><input name="meslek" value="${esc(a.meslek)}" ${d}></div></div>
   <label>Kısa tanıtım (karşı tarafa gösterilir; en çok 300 karakter; kimlik/iletişim bilgisi yazmayın)</label><textarea name="tanitim" maxlength="300" ${d}>${esc(a.tanitim)}</textarea></div>
  <div class="card"><h3>Karşı tarafta aradıkları (kendi tercihi)</h3><div class="grid g3">
   <div><label>Yaş aralığı (en az)</label><input type="number" name="p_ageMin" value="${pr.ageMin}" ${d}></div><div><label>Yaş aralığı (en çok)</label><input type="number" name="p_ageMax" value="${pr.ageMax}" ${d}></div><div><label>Yaş tercihinin önemi</label>${sel('p_ageImp', IMPOPT(), pr.ageImp, ro)}</div>
   <div><label>Yaşadığı yer</label>${sel('p_locMode', [['fark_etmez', 'Fark etmez'], ['ayni_il', 'Aynı ilde olsun']], pr.locMode, ro)}</div><div></div><div><label>Yer tercihinin önemi</label>${sel('p_locImp', IMPOPT(), pr.locImp, ro)}</div>
   <div><label>En az eğitim düzeyi</label>${sel('p_eduMin', eduOpts, pr.eduMin, ro)}</div><div></div><div><label>Eğitim tercihinin önemi</label>${sel('p_eduImp', IMPOPT(), pr.eduImp, ro)}</div>
   <div><label>Kabul edilen medeni durumlar</label><div class="opts">${S.meta.MEDENI.map(([k, t]) => `<label class="chk"><input type="checkbox" name="p_mar_${k}" ${pr.maritalOk.includes(k) ? 'checked' : ''} ${d}> ${esc(t)}</label>`).join('')}</div></div><div></div><div><label>Medeni durum tercihinin önemi</label>${sel('p_maritalImp', IMPOPT(), pr.maritalImp, ro)}</div>
   <div><label class="chk"><input type="checkbox" name="p_kidsOk" ${pr.kidsOk ? 'checked' : ''} ${d}> Çocuklu aday kabul edilebilir</label></div><div></div><div><label>Çocuk tercihinin önemi</label>${sel('p_kidsImp', IMPOPT(), pr.kidsImp, ro)}</div></div>
   <p class="small muted">“Zorunlu (eleyici)” seçilen bir tercih karşılanmazsa aday hiç önerilmez. Diğer önemler yalnız puanı etkiler.</p></div>
  <div class="card"><h3>Yaşam tarzı ve beklentiler</h3>${qs || '<p class="muted">Etkin soru yok.</p>'}</div>
  <div class="card"><h3>Açık rıza ve doğrulama (görevli tarafından teyit)</h3>
   <div class="note info small"><b>Rıza metni (v${esc(P.consentVersion)}):</b> ${esc(P.consentText)}</div>
   <label class="chk"><input type="checkbox" name="c_data" ${a.consent.data ? 'checked' : ''} ${d}> Aday, yukarıdaki rıza metnini okuyup kabul etti</label>
   <label class="chk"><input type="checkbox" name="c_sens" ${a.consent.sensitive ? 'checked' : ''} ${d}> Aday, hassas (özel nitelikli) soruların eşleştirmede kullanılmasına ayrıca açık rıza verdi</label>
   <label class="chk"><input type="checkbox" name="c_contact" ${a.consent.contactShare ? 'checked' : ''} ${d}> Aday, karşılıklı kabul sonrası iletişim bilgilerinin karşı tarafla paylaşılmasına rıza verdi (aksi halde yalnız görevli aracılık eder)</label>
   <hr>
   <label class="chk"><input type="checkbox" name="k_inPerson" ${a.checks.inPerson ? 'checked' : ''} ${d}> Aday <b>şahsen</b> başvurdu (başkası/aile adına başvuru kabul edilmez)</label>
   <label class="chk"><input type="checkbox" name="k_idVerified" ${a.checks.idVerified ? 'checked' : ''} ${d}> Kimlik belgesi görevli tarafından doğrulandı</label>
   <label class="chk"><input type="checkbox" name="k_voluntary" ${a.checks.voluntary ? 'checked' : ''} ${d}> Aday kendi isteğiyle, aile/üçüncü kişi baskısı olmadan başvurduğunu beyan etti; görevli bu konuda bire bir görüştü</label>
   <label class="chk"><input type="checkbox" name="k_notMarried" ${a.checks.notMarried ? 'checked' : ''} ${d}> Aday, sürmekte olan bir evliliği olmadığını beyan etti</label>
   <label class="chk"><input type="checkbox" name="k_protective" ${a.checks.protective ? 'checked' : ''} ${d}> Koruma / uzaklaştırma kararı ve güvenlik sorgusu yapıldı</label>
   <label class="chk"><input type="checkbox" name="k_protectiveFound" ${a.checks.protectiveFound ? 'checked' : ''} ${d}> Sorguda koruma/uzaklaştırma kararı veya güvenlik engeli <b>bulundu</b></label></div>
  <div class="card"><label>İç not (adaya gösterilmez; yalnız gerekli bilgiyi yazın)</label><textarea name="notes" maxlength="500" ${d}>${esc(a.notes)}</textarea></div></form>
  <div class="row mt8">${act.join('')}</div>
  <div class="card mt14"><h3>Tanıştırmalar</h3>${introLinks(r.intros)}</div>
  <div class="card"><h3>İşlem geçmişi</h3>${histTable(a.history)}</div>`;
}
const introLinks = (L) => L.map((i) => `<div><a href="#" data-act="openintro" data-id="${esc(i.id)}">${esc(i.id)}</a> — ${esc(i.other)} ${badge(ST_I, i.status)}</div>`).join('') || '<p class="muted">Yok.</p>';
const histTable = (H) => `<div class="tw"><table><tr><th>Zaman</th><th>Kullanıcı</th><th>İşlem</th></tr>${(H || []).slice().reverse().map((h) => `<tr><td class="small">${fmtT(h.ts)}</td><td>${esc(h.user)}</td><td>${esc(h.text)}</td></tr>`).join('') || '<tr><td colspan="3" class="muted">—</td></tr>'}</table></div>`;
function readAppForm() {
  const f = $('#appform'), g = (n) => f.elements[n], P = S.params.params;
  const v = (n) => (g(n) ? g(n).value.trim() : ''), ck = (n) => !!(g(n) && g(n).checked);
  const data = { ad: v('ad'), soyad: v('soyad'), kimNo: v('kimNo'), dogum: v('dogum'), cins: v('cins'), telefon: v('telefon'), eposta: v('eposta'), il: v('il'), ilce: v('ilce'), medeni: v('medeni'), cocuk: v('cocuk'), edu: v('edu'), is: v('is'), meslek: v('meslek'), tanitim: v('tanitim'), notes: v('notes'),
    prefs: { ageMin: v('p_ageMin'), ageMax: v('p_ageMax'), ageImp: v('p_ageImp'), locMode: v('p_locMode'), locImp: v('p_locImp'), eduMin: v('p_eduMin'), eduImp: v('p_eduImp'), maritalImp: v('p_maritalImp'), kidsImp: v('p_kidsImp'), kidsOk: ck('p_kidsOk'), maritalOk: S.meta.MEDENI.map((m) => m[0]).filter((k) => ck('p_mar_' + k)) },
    qa: {}, consent: { data: ck('c_data'), sensitive: ck('c_sens'), contactShare: ck('c_contact') },
    checks: { inPerson: ck('k_inPerson'), idVerified: ck('k_idVerified'), voluntary: ck('k_voluntary'), notMarried: ck('k_notMarried'), protective: ck('k_protective'), protectiveFound: ck('k_protectiveFound') } };
  P.questions.filter((q) => q.enabled).forEach((q) => { data.qa[q.id] = { ans: v(`q_${q.id}_ans`), accept: q.opts.filter((o, i) => ck(`q_${q.id}_acc_${i}`)), imp: v(`q_${q.id}_imp`) }; });
  return data;
}
async function printCard(id) {
  const c = await api('GET', `/api/applicants/${encodeURIComponent(id)}/card`);
  $('#printarea').innerHTML = `<h2>${esc(c.institution)} — Tanıtım Kartı</h2><table><tr><th>Ad</th><td>${esc(c.ad)}</td></tr><tr><th>Yaş</th><td>${c.age ?? ''}</td></tr><tr><th>Yaşadığı il</th><td>${esc(c.il)}</td></tr><tr><th>Eğitim</th><td>${esc(c.edu)}</td></tr><tr><th>Meslek / alan</th><td>${esc(c.meslek)}</td></tr><tr><th>Medeni durum / çocuk</th><td>${esc(c.medeni)} / ${c.cocuk}</td></tr></table>
   <h3>Kısa tanıtım</h3><p>${esc(c.tanitim)}</p><p class="small">Bu kart yalnız tanışma kararı vermeye yardımcı bir özettir; kimlik, iletişim veya adres bilgisi içermez. Tanışmayı kabul etmek veya reddetmek tamamen sizin kararınızdır ve gerekçe göstermeniz gerekmez.</p>`;
  window.print();
}

/* ------------------------------------------------------------------ eşleştirme */
async function vMatch() {
  const c = S.ctx.match = S.ctx.match || { q: '', page: 1 };
  const r = await api('GET', `/api/match/latest?page=${c.page}&pageSize=100${c.q ? '&q=' + encodeURIComponent(c.q) : ''}`);
  let h = `<div class="row"><h1 class="sp">Eşleştirme</h1>${can.edit() ? '<button class="b" data-act="runmatch">Eşleştirmeyi çalıştır</button>' : ''}</div>
  <div class="note info small">Sistem yalnızca <b>öneri</b> üretir; hiçbir aday otomatik eşleşmez veya haberdar edilmez. Görevli, önerilerden birini seçip <b>tanıştırma süreci</b> başlatır; iki taraf da kendi kararını ayrı ayrı bildirmeden hiçbir şey paylaşılmaz. Puanlar adayların <b>kendi belirttikleri tercihlere</b> ve kurum parametrelerine göre hesaplanır.</div>`;
  if (!r.run) return h + '<div class="card muted">Henüz eşleştirme çalıştırılmadı.</div>';
  if (S.ctx.why) {
    try {
      const w = await api('GET', `/api/match/why?a=${encodeURIComponent(S.ctx.why.a)}&b=${encodeURIComponent(S.ctx.why.b)}`);
      const rows = (L) => L.map((x) => `<tr><td>${esc(x.label)}</td><td>${x.s >= 1 ? '✔' : x.s > 0 ? '≈' : '✘'}</td><td>${['Önemsiz', 'Az', 'Önemli', 'Zorunlu'][x.imp]}</td><td class="small">${esc(x.note)}</td></tr>`).join('');
      h += `<div class="card"><h3>Uyum ayrıntısı: ${esc(w.nameA)} ↔ ${esc(w.nameB)}</h3>${w.hard ? '<p>Zorunlu tercih karşılanmıyor.</p>' : `<div class="grid g2"><div><b>${esc(w.nameA)} neye göre bakıyor (${Math.round(w.sa)})</b><div class="tw"><table><tr><th>Ölçüt</th><th></th><th>Önem</th><th>Karşı taraf</th></tr>${rows(w.whyA)}</table></div></div><div><b>${esc(w.nameB)} neye göre bakıyor (${Math.round(w.sb)})</b><div class="tw"><table><tr><th>Ölçüt</th><th></th><th>Önem</th><th>Karşı taraf</th></tr>${rows(w.whyB)}</table></div></div></div>`}</div>`;
    } catch (e) { h += `<div class="note bad">${esc(e.message)}</div>`; }
  }
  h += `<div class="card"><div class="row"><div class="sp">Koşu #${r.run.id} · ${fmtT(r.run.ts)} · ${esc(r.run.username)} · havuz ${r.run.pool} · incelenen çift ${r.run.considered} · öneri ${r.run.total}</div><span class="badge ${r.run.stale ? 'warn' : 'good'}">${r.run.stale ? 'parametreler değişti, yeniden çalıştırın' : 'güncel parametreler'}</span></div>
   <div class="row mt8"><input id="mq" class="mw260" placeholder="Aday adı veya no" value="${esc(c.q)}"></div>
   <div class="tw"><table><tr><th>Puan</th><th>Aday 1</th><th>Aday 2</th><th>1→2</th><th>2→1</th><th></th></tr>
   ${r.items.map((p) => `<tr><td><b>${p.score}</b><progress max="100" value="${p.score}"></progress></td><td>${esc(p.nameA)}<div class="small muted">${esc(p.a)} · ${p.ageA ?? ''} · ${esc(p.ilA)}</div></td><td>${esc(p.nameB)}<div class="small muted">${esc(p.b)} · ${p.ageB ?? ''} · ${esc(p.ilB)}</div></td><td>${p.sa}</td><td>${p.sb}</td>
    <td><button class="b ghost sm" data-act="why" data-a="${esc(p.a)}" data-b="${esc(p.b)}">Neden?</button> ${can.edit() ? `<button class="b sm" data-act="startintro" data-a="${esc(p.a)}" data-b="${esc(p.b)}" ${p.canStart ? '' : 'disabled'}>Tanıştırma başlat</button>` : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Öneri yok.</td></tr>'}</table></div>${pager(r.page, r.run.total, r.pageSize, 'matchpage')}</div>`;
  if (r.noMatch.length) h += `<div class="card"><h3>Bu koşuda öneri çıkmayan adaylar (${r.noMatch.length})</h3><p class="small muted">Tercihleri çok daraltmış (çok sayıda “zorunlu”) veya havuzda uygun aday bulunmayan adaylar. Adayla görüşüp tercihlerini yeniden gözden geçirmesi önerilebilir.</p><div>${r.noMatch.map((x) => `<a href="#" data-act="open" data-id="${esc(x.id)}">${esc(x.name)}</a>`).join(' · ')}</div></div>`;
  return h;
}

/* ------------------------------------------------------------------ tanıştırmalar */
async function vIntros() {
  const f = S.ctx.ifilter || '', L = await api('GET', '/api/intros' + (f ? '?status=' + f : ''));
  return `<h1>Tanıştırmalar</h1><div class="card"><select id="iflt" class="mw260"><option value="">Tüm durumlar</option>${Object.entries(ST_I).map(([k, v]) => `<option value="${k}" ${f === k ? 'selected' : ''}>${v[0]}</option>`).join('')}</select>
  <div class="tw"><table><tr><th>No</th><th>Taraflar</th><th>Puan</th><th>Durum</th><th>Tarih</th></tr>${L.map((i) => `<tr><td><a href="#" data-act="openintro" data-id="${esc(i.id)}">${esc(i.id)}</a></td><td>${esc(i.nameA)} ↔ ${esc(i.nameB)}</td><td>${i.score}</td><td>${badge(ST_I, i.status)}</td><td class="small">${fmtT(i.createdAt)}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">Kayıt yok.</td></tr>'}</table></div></div>`;
}
function respBox(i, side) {
  const name = side === 'a' ? i.nameA : i.nameB, r = i.resp[side], ro = !can.edit() || i.status !== 'yanit_bekliyor' || r.dec;
  return `<div class="card"><b>${esc(name)}</b> <span class="small muted">(${esc(side === 'a' ? i.a : i.b)})</span><div>Karar: ${r.dec ? `<span class="badge ${r.dec === 'kabul' ? 'good' : 'bad'}">${r.dec === 'kabul' ? 'Tanışmak istiyor' : 'Tanışmak istemiyor'}</span> <span class="small muted">${fmtT(r.ts)} · ${esc(r.method)}</span>` : '<span class="badge warn">Bekleniyor</span>'}</div>
   ${ro ? '' : `<div class="row mt8"><button class="b sm" data-act="resp" data-side="${side}" data-dec="kabul">Tanışmak istiyor</button><button class="b red sm" data-act="resp" data-side="${side}" data-dec="ret">Tanışmak istemiyor</button></div>`}
   <div class="small muted">Karar adayın <b>kendi</b> ağzından alınmalı; görevli yerine karar veremez.</div></div>`;
}
async function vIntro() {
  const i = await api('GET', '/api/intros/' + encodeURIComponent(S.route.id)); S.ctx.intro = i;
  const act = [];
  if (can.edit()) {
    if (i.status === 'kabul') act.push('<button class="b" data-act="iaction" data-a="plan">Görüşme planla</button>');
    if (i.status === 'bulusma_planli') act.push('<button class="b" data-act="iaction" data-a="outcome">Görüşme sonucunu kaydet</button>');
    if (i.status === 'devam_ediyor') act.push('<button class="b" data-act="iaction" data-a="decision">Evlenme kararı verdiler</button><button class="b ghost" data-act="iaction" data-a="end">Sona erdi</button>');
    if (i.status === 'yanit_bekliyor') act.push('<button class="b ghost" data-act="iaction" data-a="timeout">Süre doldu – kapat</button>');
    if (['yanit_bekliyor', 'kabul', 'bulusma_planli', 'devam_ediyor'].includes(i.status)) act.push('<button class="b red" data-act="iaction" data-a="complaint">Şikâyet / güvenlik bildirimi</button>');
    if (i.status === 'sikayet' && can.admin()) act.push('<button class="b" data-act="iaction" data-a="close-complaint">Şikâyeti kapat</button>');
  }
  return `<div class="row"><h1 class="sp">Tanıştırma ${esc(i.id)}</h1>${badge(ST_I, i.status)}</div>
  <div class="card"><b>${esc(i.nameA)}</b> ↔ <b>${esc(i.nameB)}</b> · uyum puanı ${i.score}<div class="small muted">Başlatan: ${esc(i.createdBy)} · ${fmtT(i.createdAt)} · eşleştirme mühürü ${esc(i.paramSeal.slice(0, 12))}…</div>
   ${can.edit() ? `<div class="row mt8"><button class="b ghost sm" data-act="card" data-id="${esc(i.b)}">🖨 ${esc(i.nameB)} tanıtım kartı (${esc(i.nameA)}'a sunulur)</button><button class="b ghost sm" data-act="card" data-id="${esc(i.a)}">🖨 ${esc(i.nameA)} tanıtım kartı (${esc(i.nameB)}'a sunulur)</button></div>` : ''}</div>
  <div class="grid g2">${respBox(i, 'a')}${respBox(i, 'b')}</div>
  ${i.meeting ? `<div class="note info">Görüşme: ${fmtD(i.meeting.date)} ${esc(i.meeting.time)} · ${esc(i.meeting.place)} · ${esc(i.meeting.mode)}</div>` : ''}
  <div class="card"><h3>Süreç</h3><div class="row">${act.join('') || '<span class="muted">Bu aşamada yapılacak işlem yok.</span>'}</div></div>
  ${i.contact ? `<div class="card"><h3>İletişim bilgisi paylaşımı</h3>${['a', 'b'].map((s) => `<div>${esc(s === 'a' ? i.nameA : i.nameB)}: ${i.contact[s].shared ? `<span class="badge good">Paylaşım rızası var</span> ${esc(i.contact[s].telefon)}` : '<span class="badge warn">Rıza yok — yalnız görevli aracılık eder</span>'}</div>`).join('')}<p class="small muted">Bu görüntüleme denetim günlüğüne yazılmıştır.</p></div>` : ''}
  ${i.outcome ? `<div class="card"><h3>Görüşme sonucu</h3><div>${esc(i.nameA)}: ${esc(i.outcome.a)}</div><div>${esc(i.nameB)}: ${esc(i.outcome.b)}</div></div>` : ''}
  <div class="card"><h3>Geçmiş</h3>${histTable(i.history)}</div>`;
}

/* ------------------------------------------------------------------ adalet raporu */
async function vFair() {
  const f = await api('GET', '/api/fairness');
  return `<h1>Adalet raporu</h1><div class="note info small">Eşleştirme sürecinin bazı gruplara sistematik olarak daha az fırsat tanıyıp tanımadığını izlemek için toplu (kişisiz) göstergeler. Yalnız son eşleştirme koşusuna dayanır${f.run ? ` (#${f.run})` : ''}. Uyarı eşiği ${f.gapPct} yüzde puandır (parametre). Bu rapor bir <b>uyarı sinyalidir</b>, ayrımcılık kanıtı değildir; nedenini görevliler ve denetçi birlikte inceler.</div>
  ${f.groups.map((g) => `<div class="card"><h3>${esc(g.label)}</h3><div class="tw"><table><tr><th>Grup</th><th>Aday</th><th>Öneri çıkmayan</th><th>Tanıştırma</th><th>Kabul oranı</th><th></th></tr>${g.rows.map((r) => `<tr><td>${esc(r.group)}</td><td>${r.n}</td><td>${r.none} (%${r.nonePct})</td><td>${r.intros}</td><td>${r.acceptPct === null ? '—' : '%' + r.acceptPct}</td><td>${r.warn ? `<span class="badge warn">Genel orandan %${r.gap} puan fazla</span>` : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Veri yok.</td></tr>'}</table></div></div>`).join('')}`;
}

/* ------------------------------------------------------------------ parametreler */
async function vParams() {
  const info = S.params = await api('GET', '/api/params'); const P = S.ctx.draft || info.params, ed = can.admin(), d = ed ? '' : 'disabled';
  let h = `<div class="row"><h1 class="sp">Parametreler</h1><span class="badge info">Sürüm ${info.version}</span></div>
  <div class="note info small">Her değişiklik sürümlenir, gerekçeyle denetim günlüğüne yazılır ve yeni bir <b>parametre mührü</b> üretir. ${info.adminCount > 1 ? '<b>İki kişi kuralı:</b> değişiklik önerisini başka bir yönetici onaylayınca yürürlüğe girer.' : 'Yalnız bir etkin yönetici var; değişiklikler doğrudan uygulanır (iki kişi kuralı için ikinci bir yönetici ekleyin).'} Hiçbir parametreyle devre dışı bırakılamayan güvenceler: ${S.meta.HARD.minAgeFloor} yaş alt sınırı, gönüllülük ve şahsen başvuru, karşılıklı rıza olmadan iletişim paylaşılmaması.</div>
  <div class="card"><b>Geçerli parametre mührü (SHA-256)</b><div class="mono">${esc(info.seal)}</div><label>Makamın bildirdiği resmî mühür</label>
   <div class="row"><input id="offseal" class="mono sp" value="${esc(info.officialSeal)}" ${d} placeholder="64 haneli resmî mühür">${ed ? '<button class="b ghost sm" data-act="saveseal">Kaydet</button>' : ''}</div>
   ${info.officialSeal ? (info.officialSeal === info.seal ? '<div class="note good small">Eşleşiyor.</div>' : '<div class="note bad small">Eşleşmiyor!</div>') : ''}
   ${ed ? `<label class="chk mt8"><input type="checkbox" id="req2fa" ${info.require2fa ? 'checked' : ''}> Tüm kullanıcılar için iki aşamalı doğrulamayı zorunlu kıl</label>` : ''}</div>
  <form id="pform">`;
  let open = false;
  S.meta.PARAM_SCHEMA.forEach((s) => {
    if (s.sec) { if (open) h += '</div></div>'; h += `<div class="card"><h3>${esc(s.sec)}</h3><div class="grid g2">`; open = true; return; }
    const v = P[s.k];
    h += `<div><label>${esc(s.label)}${s.min != null ? ` <span class="muted">(${s.min}–${s.max})</span>` : ''}</label>${s.type === 'sel' ? sel(s.k, s.opts, v, !ed) : `<input name="${s.k}" type="${s.type === 'int' ? 'number' : 'text'}" value="${esc(v)}" ${s.min != null ? `min="${s.min}" max="${s.max}"` : ''} ${d}>`}${s.help ? `<div class="small muted">${esc(s.help)}</div>` : ''}</div>`;
  });
  if (open) h += '</div></div>';
  h += `<div class="card"><h3>Ağırlıklar</h3><div class="grid g4">${[1, 2, 3].map((i) => `<div><label>“${esc(S.meta.IMP[i][1])}” ağırlığı</label><input type="number" name="iw${i}" value="${P.impW[i]}" min="0" max="20" ${d}></div>`).join('')}<div></div>
   ${Object.keys(S.meta.CRIT_LABEL).map((k) => `<div><label>${esc(S.meta.CRIT_LABEL[k])} ölçütü</label><input type="number" name="cw_${k}" value="${P.critW[k]}" min="0" max="10" ${d}></div>`).join('')}</div>
   <p class="small muted">Önem ağırlığı adayın seçtiği önemle, ölçüt ağırlığı kurumun o ölçüte verdiği değerle çarpılır. “Zorunlu” seçilen tercih ayrıca eleyicidir.</p></div>
  <div class="card"><h3>Eğitim düzeyleri (düşükten yükseğe, satır başına bir)</h3><textarea name="edu" ${d}>${esc(P.eduLevels.join('\n'))}</textarea></div>
  <div class="card"><h3>Uyum soruları</h3><div class="tw"><table><tr><th>Soru</th><th>Seçenekler (virgülle)</th><th>Ağırlık</th><th>Hassas</th><th>Etkin</th><th></th></tr>
   ${P.questions.map((q, i) => `<tr><td><input name="ql_${i}" value="${esc(q.label)}" ${d}></td><td><input name="qo_${i}" value="${esc(q.opts.join(', '))}" ${d}></td><td><input type="number" name="qw_${i}" value="${q.weight}" min="0" max="10" ${d}></td><td><input type="checkbox" name="qs_${i}" ${q.sensitive ? 'checked' : ''} ${d}></td><td><input type="checkbox" name="qe_${i}" ${q.enabled ? 'checked' : ''} ${d}></td><td>${ed ? `<button type="button" class="b red sm" data-act="delq" data-i="${i}">Sil</button>` : ''}</td></tr>`).join('')}</table></div>
   ${ed ? '<button type="button" class="b ghost sm" data-act="addq">+ Soru ekle</button>' : ''}
   <div class="note warn small">“Hassas” işaretli sorular (din, mezhep, siyasi görüş, sağlık gibi özel nitelikli kişisel veriler) yalnız adayın ayrıca açık rızası varsa kullanılır. <b>Etnik köken, ırk, siyasi görüş gibi alanlarla eşleştirme yapılması hukuken ve etik olarak sakıncalıdır</b>; bu tür soru eklemeyin.</div></div>
  <div class="card"><label>Açık rıza metni</label><textarea name="consentText" ${d}>${esc(P.consentText)}</textarea><label>Rıza metni sürümü</label><input name="consentVersion" value="${esc(P.consentVersion)}" ${d}></div>`;
  if (ed) h += `<div class="card"><label>Değişiklik gerekçesi (zorunlu)</label><input name="reason" id="preason" placeholder="Örn. genelge gereği asgari uyum puanı güncellendi"><div class="row mt8"><button class="b" type="submit">${info.adminCount > 1 ? 'Değişiklik öner' : 'Değişiklikleri uygula'}</button><button class="b ghost" type="button" data-act="exportparams">Parametre dosyasını indir</button><label class="b ghost">Parametre dosyası yükle<input type="file" id="pfile" accept=".json" class="hidden"></label></div></div>`;
  h += '</form>';
  const pend = info.proposals.filter((p) => p.status === 'bekliyor');
  if (info.proposals.length) h += `<div class="card"><h3>Parametre önerileri</h3><div class="tw"><table><tr><th>No</th><th>Zaman</th><th>Öneren</th><th>Gerekçe</th><th>Mühür</th><th>Durum</th><th></th></tr>${info.proposals.map((p) => `<tr><td>${p.id}</td><td class="small">${fmtT(p.ts)}</td><td>${esc(p.proposer)}</td><td>${esc(p.reason)}</td><td class="mono">${esc(p.seal.slice(0, 12))}…</td><td>${esc(p.status)}${p.decided_by ? `<div class="small muted">${esc(p.decided_by)}</div>` : ''}</td><td>${ed && p.status === 'bekliyor' && p.proposer !== S.user.username ? `<button class="b sm" data-act="pdecide" data-id="${p.id}" data-ok="1">Onayla</button> <button class="b red sm" data-act="pdecide" data-id="${p.id}" data-ok="0">Reddet</button>` : ''}</td></tr>`).join('')}</table></div></div>`;
  h += `<div class="card"><h3>Sürüm geçmişi</h3><div class="tw"><table><tr><th>Sürüm</th><th>Zaman</th><th>Kullanıcı</th><th>Gerekçe</th><th>Mühür</th></tr>${info.history.map((x) => `<tr><td>${x.ver}</td><td class="small">${fmtT(x.ts)}</td><td>${esc(x.username)}</td><td>${esc(x.reason)}</td><td class="mono">${esc(x.seal.slice(0, 16))}…</td></tr>`).join('')}</table></div></div>`;
  return h;
}
function readParamsForm() {
  const f = $('#pform'), P = JSON.parse(JSON.stringify(S.ctx.draft || S.params.params));
  S.meta.PARAM_SCHEMA.forEach((s) => { if (!s.k) return; const el = f.elements[s.k]; if (el) P[s.k] = s.type === 'int' ? parseInt(el.value, 10) : el.value; });
  [1, 2, 3].forEach((i) => { P.impW[i] = parseInt(f.elements['iw' + i].value, 10); });
  Object.keys(S.meta.CRIT_LABEL).forEach((k) => { P.critW[k] = parseInt(f.elements['cw_' + k].value, 10); });
  P.eduLevels = f.elements.edu.value.split('\n').map((x) => x.trim()).filter(Boolean);
  P.questions.forEach((q, i) => { q.label = f.elements['ql_' + i].value.trim(); q.opts = f.elements['qo_' + i].value.split(',').map((x) => x.trim()).filter(Boolean); q.weight = parseInt(f.elements['qw_' + i].value, 10); q.sensitive = f.elements['qs_' + i].checked; q.enabled = f.elements['qe_' + i].checked; });
  P.consentText = f.elements.consentText.value; P.consentVersion = f.elements.consentVersion.value.trim() || '1';
  return P;
}

/* ------------------------------------------------------------------ denetim / kullanıcılar / veri / hesap / hakkında */
async function vAudit() {
  const c = S.ctx.audit = S.ctx.audit || { q: '', page: 1 }, size = 100;
  const r = await api('GET', `/api/audit?limit=${size}&offset=${(c.page - 1) * size}${c.q ? '&q=' + encodeURIComponent(c.q) : ''}`);
  const v = S.ctx.chain || await api('GET', '/api/audit/verify');
  return `<h1>Denetim günlüğü</h1>${v.ok ? `<div class="note good">Zincir doğrulandı: ${v.n} kayıt, bozulma yok.<div class="mono">Baş özeti: ${esc(v.head || '')}</div></div>` : `<div class="note bad"><b>Zincir ${v.at}. kayıtta bozuk.</b> Günlük değiştirilmiş veya silinmiş olabilir.</div>`}
  <div class="card"><div class="row"><input id="aq" class="mw320" placeholder="Filtre: işlem, kullanıcı, ayrıntı…" value="${esc(c.q)}"><button class="b ghost sm" data-act="verifychain">Zinciri yeniden doğrula</button><button class="b ghost sm" data-act="exportpkg">Denetim paketini indir (kişisiz)</button></div>
  <div class="tw"><table><tr><th>#</th><th>Zaman</th><th>Kullanıcı</th><th>İşlem</th><th>Ayrıntı</th></tr>${r.items.map((e) => `<tr><td>${e.i}</td><td class="small">${fmtT(e.ts)}</td><td>${esc(e.username)}<div class="small muted">${esc(e.role)}</div></td><td>${esc(e.action)}</td><td class="small">${esc(e.detail)}</td></tr>`).join('')}</table></div>${pager(c.page, r.total, size, 'auditpage')}
  <p class="small muted">Her kayıt önceki kaydın SHA-256 özetini içerir ve veritabanı tetikleyicileri kayıtların silinmesini/değiştirilmesini engeller. Resmî kullanımda baş özetini düzenli olarak dışarıda (imzalı) saklayın.</p></div>`;
}
async function vUsers() {
  const L = await api('GET', '/api/users');
  return `<h1>Kullanıcılar</h1>${S.ctx.temp ? `<div class="note warn"><b>${esc(S.ctx.temp.u)}</b> için geçici parola (yalnız bir kez gösterilir; ilk girişte değiştirilecek):<div class="mono">${esc(S.ctx.temp.p)}</div></div>` : ''}
  <div class="card"><div class="tw"><table><tr><th>Kullanıcı</th><th>Ad</th><th>Rol</th><th>Durum</th><th>2FA</th><th></th></tr>${L.map((u) => `<tr><td>${esc(u.username)}</td><td>${esc(u.name)}</td><td>${ROLE[u.role]}${u.role === 'denetci' ? ' (salt okunur)' : ''}</td><td>${u.active ? '<span class="badge good">Etkin</span>' : '<span class="badge bad">Pasif</span>'}${u.locked ? ' <span class="badge warn">kilitli</span>' : ''}</td><td>${u.totpEnabled ? '✔' : '—'}</td>
   <td>${u.id !== S.user.id ? `<button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="toggle" data-active="${u.active ? 1 : 0}">${u.active ? 'Pasifleştir' : 'Etkinleştir'}</button> <button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="reset">Parolayı sıfırla</button> <button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="reset2fa">2FA sıfırla</button> ${u.locked ? `<button class="b ghost sm" data-act="uact" data-id="${u.id}" data-do="unlock">Kilidi aç</button>` : ''}` : '<span class="muted small">(siz)</span>'}</td></tr>`).join('')}</table></div></div>
  <div class="card"><h3>Kullanıcı ekle</h3><form data-form="adduser"><div class="grid g3"><div><label>Kullanıcı adı</label><input name="username" required pattern="[A-Za-z0-9._\\-]{3,32}"></div><div><label>Ad soyad</label><input name="name" required maxlength="80"></div><div><label>Rol</label><select name="role"><option value="gorevli">Görevli</option><option value="denetci">Denetçi (salt okunur)</option><option value="admin">Yönetici</option></select></div></div>
   <p class="small muted">Sistem geçici bir parola üretir; kullanıcı ilk girişte değiştirmek zorundadır. İki kişi kuralının işlemesi için en az iki yönetici bulundurun.</p><button class="b" type="submit">Ekle</button></form></div>`;
}
async function vData() {
  return `<h1>Veri</h1><div class="card"><h3>Yedekleme</h3><p>Veritabanı yedeği sunucuda alınır (arayüzden indirilmez):</p><pre class="mono">npm run backup</pre><p class="small muted">Yedek, kişisel verileri alan düzeyinde şifreli içerir. Şifreleme anahtarı (DATA_KEYS) yedekten ayrı ve güvenli saklanmalıdır.</p></div>
  ${S.meta.allowDemo ? `<div class="card"><h3>Deneme verisi</h3><p class="small muted">Sistemi denemek için gerçek olmayan 40 örnek aday ekler. Gerçek kullanıma geçmeden silin; üretimde <code>ALLOW_DEMO</code> kapalı olmalıdır.</p><div class="row"><button class="b ghost" data-act="seed">40 deneme adayı ekle</button><button class="b red" data-act="unseed">Deneme adaylarını sil</button></div></div>` : '<div class="card"><p class="muted">Deneme verisi bu kurulumda kapalı (ALLOW_DEMO).</p></div>'}`;
}
async function vAccount(forced) {
  const me = (await api('GET', '/api/me')).user; S.user = { ...S.user, ...me };
  return (S.restricted = !!forced), chrome(), `<h1>Hesabım</h1>${forced ? '<div class="note warn">Devam etmek için iki aşamalı doğrulamayı etkinleştirmeniz gerekiyor (yönetici zorunlu kıldı).</div>' : ''}
  <div class="card"><h3>Parola değiştir</h3><form data-form="pwchange"><div class="grid g3"><div><label>Mevcut parola</label><input name="oldPassword" type="password" required autocomplete="current-password"></div><div><label>Yeni parola</label><input name="newPassword" type="password" required autocomplete="new-password"></div><div><label>Yeni parola (tekrar)</label><input name="newPassword2" type="password" required autocomplete="new-password"></div></div><button class="b mt8" type="submit">Değiştir</button></form></div>
  <div class="card"><h3>İki aşamalı doğrulama (TOTP)</h3>${me.totpEnabled ? '<div class="note good">Etkin.</div>' : `<p class="small muted">Authenticator uygulamanızda (ör. FreeOTP, Aegis, Google Authenticator) anahtarı elle ekleyin, sonra üretilen 6 haneli kodu girin.</p>${S.ctx.totp ? `<div class="note info">Gizli anahtar: <span class="mono">${esc(S.ctx.totp.secret)}</span><br><span class="small">URI: <span class="mono">${esc(S.ctx.totp.otpauth)}</span></span></div><form data-form="totpenable"><label>Doğrulama kodu</label><input name="code" inputmode="numeric" maxlength="6" required><button class="b mt8" type="submit">Etkinleştir</button></form>` : '<button class="b" data-act="totpsetup">Kurulumu başlat</button>'}`}</div>`;
}
function vAbout() {
  return `<h1>Hakkında, ilkeler ve sınırlar</h1>
  <div class="card"><h3>Ne yapar?</h3><ul><li>Evlenmek isteyen yetişkinlerin kendi isteğiyle yaptığı başvuruyu kaydeder, kimlik ve güvenlik teyitlerini izler.</li><li>Adayların <b>kendi belirttiği</b> tercih ve önem düzeylerine, kurumun parametrelerine göre iki yönlü <b>uyum puanı</b> hesaplar ve öneri listesi üretir.</li><li>Görevli öneriden bir <b>tanıştırma süreci</b> başlatır: iki tarafın ayrı kararı → planlı görüşme → sonuç. Her adım denetim günlüğüne yazılır.</li></ul></div>
  <div class="card"><h3>Sabit güvenceler (değiştirilemez)</h3><ul><li>${S.meta.HARD.minAgeFloor} yaşından küçükler sisteme alınamaz.</li><li>Katılım gönüllüdür; başvuru şahsen yapılır, aile veya üçüncü kişi adına başvuru kabul edilmez.</li><li>İki taraf da ayrı ayrı “tanışmak istiyorum” demeden iletişim bilgisi paylaşılmaz; sistem kimseyi otomatik eşleştirmez.</li><li>Reddeden aday eşleşmeye zorlanamaz; aynı çift bir daha önerilmez. Aday istediği an çekilebilir, verilerinin silinmesini isteyebilir.</li><li>Koruma/uzaklaştırma kararı veya güvenlik engeli olan kişi havuza alınmaz.</li><li>Eşleşme bir evlilik yükümlülüğü doğurmaz.</li></ul></div>
  <div class="card"><h3>Teknik güvenceler</h3><ul><li>Aday verileri alan düzeyinde AES-256-GCM ile şifreli saklanır; kimlik numarası düz metin tutulmaz.</li><li>Yetki denetimi sunucudadır; denetçi yalnız maskeli veri görür, iletişim bilgisini göremez.</li><li>Kişisel veri içeren her görüntüleme, her parametre değişikliği ve her tanıştırma adımı SHA-256 zincirli, silinemez denetim günlüğüne yazılır.</li><li>Parametre değişiklikleri sürümlenir, mühürlenir; birden fazla yönetici varsa ikinci yönetici onayı gerekir. Engel kaldırma ve şikâyet kapatma da iki kişi kuralına tabidir.</li></ul></div>
  <div class="card"><h3>Sınırlar</h3><ul><li><b>Bu bir karar destek aracıdır.</b> Uyum puanı bir evliliğin başarısını öngörmez; yalnız adayların belirttiği tercihlerin örtüşmesini ölçer. Karar adayların kendisindedir.</li><li>Sistem nüfus, adli sicil veya koruma kararı sorgusu yapmaz; bunlar görevlinin elle yaptığı teyitlerdir.</li><li>Kişisel veri (KVKK) aydınlatma, yetki, saklama-imha süreçleri ve eşleştirme politikasının hukuka uygunluğu kurumun ve yetkili makamın sorumluluğundadır.</li></ul></div>`;
}

/* ------------------------------------------------------------------ olaylar */
document.addEventListener('submit', guard(async (e) => {
  const f = e.target.closest('form[data-form]'); if (!f) { if (e.target.id === 'pform') e.preventDefault(); return; }
  e.preventDefault(); const t = f.dataset.form, g = (n) => f.elements[n] && f.elements[n].value;
  if (t === 'login') {
    try {
      const r = await api('POST', '/api/login', { username: g('username'), password: g('password'), code: g('code') });
      S.user = r.user; S.csrf = r.csrf; S.require2fa = r.require2fa; await afterLogin();
    } catch (er) {
      if (er instanceof ApiError && er.body && er.body.need2fa) { $('#codebox').classList.remove('hidden'); f.elements.code.focus(); $('#lerr').innerHTML = '<div class="note info">İki aşamalı doğrulama kodunu girin.</div>'; }
      else $('#lerr').innerHTML = `<div class="note bad">${esc(er.message)}</div>`;
    }
  } else if (t === 'pwchange') {
    if (g('newPassword') !== g('newPassword2')) { alert('Yeni parolalar eşleşmiyor.'); return; }
    await api('POST', '/api/me/password', { oldPassword: g('oldPassword'), newPassword: g('newPassword') });
    toast('Parola değiştirildi.'); S.user.mustChange = false; await afterLogin();
  } else if (t === 'adduser') {
    const r = await api('POST', '/api/users', { username: g('username'), name: g('name'), role: g('role') }); S.ctx.temp = { u: r.username, p: r.tempPassword }; render();
  } else if (t === 'totpenable') {
    await api('POST', '/api/me/totp/enable', { code: g('code') }); S.ctx.totp = null; S.user.totpEnabled = true; toast('İki aşamalı doğrulama etkinleştirildi.');
    if (S.restricted) await afterLogin(); else render();
  }
}));
document.addEventListener('submit', guard(async (e) => {
  if (e.target.id !== 'pform') return; e.preventDefault();
  const P = readParamsForm(), reason = $('#preason').value;
  const r = await api('POST', '/api/params/propose', { params: P, reason }); S.ctx.draft = null;
  toast(r.applied ? 'Parametreler uygulandı.' : 'Öneri kaydedildi; ikinci yöneticinin onayı bekleniyor.'); S.params = await api('GET', '/api/params'); render();
}));
document.addEventListener('change', guard(async (e) => {
  const id = e.target.id;
  if (id === 'flt') { S.ctx.apps = { ...S.ctx.apps, status: e.target.value, page: 1 }; render(); }
  if (id === 'iflt') { S.ctx.ifilter = e.target.value; render(); }
  if (id === 'req2fa') { await api('POST', '/api/params/require2fa', { on: e.target.checked }); toast('Ayar kaydedildi.'); }
  if (id === 'pfile') { const r = new FileReader(); r.onload = () => { try { S.ctx.draft = JSON.parse(r.result); render(); toast('Dosya forma yüklendi; gerekçe yazıp gönderin.'); } catch { alert('Dosya okunamadı.'); } }; r.readAsText(e.target.files[0]); }
}));
let debounce = null;
document.addEventListener('input', (e) => {
  const map = { q: ['apps', 'q'], mq: ['match', 'q'], aq: ['audit', 'q'] }, m = map[e.target.id]; if (!m) return;
  clearTimeout(debounce); const val = e.target.value, id = e.target.id;
  debounce = setTimeout(async () => { S.ctx[m[0]] = { ...(S.ctx[m[0]] || {}), q: val, page: 1 }; await render(); const n = $('#' + id); if (n) { n.focus(); n.setSelectionRange(val.length, val.length); } }, 350);
});
const ask = (msg, def) => { const r = prompt(msg, def || ''); return r === null ? null : r.trim(); };
document.addEventListener('click', guard(async (e) => {
  const t = e.target.closest('[data-act]'); if (!t) return; const a = t.dataset.act;
  if (a === 'open' || a === 'openintro') e.preventDefault();
  const cur = S.ctx.cur, intro = S.ctx.intro;
  const done = (m) => { if (m) toast(m); return render(); };
  switch (a) {
    case 'nav': S.ctx.draft = null; S.ctx.why = null; S.ctx.temp = null; S.ctx.chain = null; return go(t.dataset.k);
    case 'logout': try { await api('POST', '/api/logout'); } catch { /* yoksay */ } S.user = null; S.csrf = ''; clearInterval(idleTimer); return showLogin();
    case 'open': return go('app', { id: t.dataset.id });
    case 'openintro': return go('intro', { id: t.dataset.id });
    case 'appspage': S.ctx.apps.page = +t.dataset.p; return render();
    case 'matchpage': S.ctx.match.page = +t.dataset.p; return render();
    case 'auditpage': S.ctx.audit.page = +t.dataset.p; return render();
    case 'newapp': { const r = await api('POST', '/api/applicants'); return go('app', { id: r.id }); }
    case 'saveapp': { const r = await api('PUT', '/api/applicants/' + encodeURIComponent(cur.id), { data: readAppForm(), version: cur.version }); return done('Kaydedildi.'); }
    case 'aaction': {
      const body = { action: t.dataset.a };
      if (t.dataset.ask) { const r = ask(t.dataset.ask); if (!r) return; body.reason = r; }
      if (t.dataset.confirm && !confirm('Bu işlem geri alınamaz. Devam edilsin mi?')) return;
      if (t.dataset.a === 'activate') { await api('PUT', '/api/applicants/' + encodeURIComponent(cur.id), { data: readAppForm(), version: cur.version }).catch(() => {}); }
      try { await api('POST', `/api/applicants/${encodeURIComponent(cur.id)}/action`, body); } catch (er) { if (er.status === 422 && er.body && er.body.check) { alert('Havuza alma koşulları tamam değil:\n• ' + er.body.check.findings.filter((f) => f.lvl !== 'bilgi').map((f) => f.txt).join('\n• ')); return render(); } throw er; }
      return done('İşlem tamamlandı.');
    }
    case 'card': return printCard(t.dataset.id);
    case 'runmatch': { const r = await api('POST', '/api/match/run'); S.ctx.match = { q: '', page: 1 }; return done(`${r.suggestions} öneri üretildi.`); }
    case 'why': S.ctx.why = { a: t.dataset.a, b: t.dataset.b }; return render();
    case 'startintro': { const r = await api('POST', '/api/intros', { a: t.dataset.a, b: t.dataset.b }); return go('intro', { id: r.id }); }
    case 'resp': {
      const side = t.dataset.side, dec = t.dataset.dec, name = side === 'a' ? intro.nameA : intro.nameB;
      const m = ask('Kararı adayın kendisi bildirdi mi? Görüşme biçimini yazın (örn. şahsen / telefonla):', 'şahsen'); if (!m) return;
      if (!confirm(`${name} kendi kararı olarak “${dec === 'kabul' ? 'tanışmak istiyor' : 'tanışmak istemiyor'}” dedi. Kaydedilsin mi? (geri alınamaz)`)) return;
      await api('POST', `/api/intros/${encodeURIComponent(intro.id)}/respond`, { side, dec, method: m, confirmed: true }); return done();
    }
    case 'iaction': {
      const k = t.dataset.a, p = `/api/intros/${encodeURIComponent(intro.id)}/${k}`;
      if (k === 'plan') { const d = ask('Görüşme tarihi (YYYY-AA-GG):'); if (!d) return; const tm = ask('Saat (SS:DD):', '14:00'); if (!tm) return; const pl = ask('Yer (kamuya açık, görevlinin bilgisinde):'); if (!pl) return; await api('POST', p, { date: d, time: tm, place: pl }); }
      else if (k === 'outcome') { const A = ask(`${intro.nameA} — görüşme sonucu (devam / bitti):`, 'devam'); if (!A) return; const B = ask(`${intro.nameB} — görüşme sonucu (devam / bitti):`, 'devam'); if (!B) return; await api('POST', p, { a: A.toLowerCase(), b: B.toLowerCase() }); }
      else if (k === 'decision') { if (!confirm('İki aday da evlenme kararını KENDİSİ bildirdi mi? Kayıtları tamamlanacak ve havuzdan çıkarılacak.')) return; await api('POST', p, { confirmA: true, confirmB: true }); }
      else if (k === 'timeout') await api('POST', p, {});
      else { const r = ask({ end: 'Sona erme notu:', complaint: 'Şikâyet/güvenlik bildirimi (yalnız gerekli bilgiyi yazın):', 'close-complaint': 'Şikâyeti kapatma gerekçesi ve sonucu:' }[k]); if (!r) return; await api('POST', p, { reason: r }); }
      return done();
    }
    case 'addq': { const P = readParamsForm(); P.questions.push({ id: 'q_' + Math.random().toString(36).slice(2, 8), label: 'Yeni soru', opts: ['Evet', 'Hayır'], weight: 2, sensitive: false, enabled: true }); S.ctx.draft = P; return render(); }
    case 'delq': { const P = readParamsForm(); P.questions.splice(+t.dataset.i, 1); S.ctx.draft = P; return render(); }
    case 'exportparams': { const b = new Blob([JSON.stringify(readParamsForm(), null, 2)], { type: 'application/json' }); const l = document.createElement('a'); l.href = URL.createObjectURL(b); l.download = 'tanistirma-parametreleri.json'; l.click(); return; }
    case 'saveseal': await api('POST', '/api/params/official-seal', { seal: $('#offseal').value }); return done('Resmî mühür kaydedildi.');
    case 'pdecide': { const ok = t.dataset.ok === '1', n = ask(ok ? 'Onay notu (isteğe bağlı):' : 'Ret gerekçesi:'); if (n === null || (!ok && n.length < 5)) return; await api('POST', `/api/params/proposals/${t.dataset.id}/${ok ? 'approve' : 'reject'}`, { note: n }); S.params = await api('GET', '/api/params'); return done(ok ? 'Öneri onaylandı ve uygulandı.' : 'Öneri reddedildi.'); }
    case 'verifychain': S.ctx.chain = await api('GET', '/api/audit/verify'); return render();
    case 'exportpkg': return download('/api/export/package', 'denetim-paketi.json');
    case 'uact': {
      const id = +t.dataset.id, k = t.dataset.do;
      const body = k === 'toggle' ? { active: t.dataset.active !== '1' } : k === 'reset' ? { resetPassword: true } : k === 'reset2fa' ? { resetTotp: true } : { unlock: true };
      if (k === 'reset' && !confirm('Parola sıfırlanacak ve kullanıcının açık oturumları kapatılacak. Devam?')) return;
      const r = await api('PATCH', '/api/users/' + id, body); if (r.tempPassword) S.ctx.temp = { u: (await api('GET', '/api/users')).find((x) => x.id === id).username, p: r.tempPassword }; return render();
    }
    case 'seed': await api('POST', '/api/admin/demo'); return toast('40 deneme adayı eklendi.');
    case 'unseed': { if (!confirm('Tüm deneme adayları silinsin mi?')) return; const r = await api('DELETE', '/api/admin/demo'); return toast(`${r.removed} deneme adayı silindi.`); }
    case 'totpsetup': S.ctx.totp = await api('POST', '/api/me/totp/setup'); return render();
  }
}));
boot();
