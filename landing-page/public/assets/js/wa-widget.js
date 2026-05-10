/**
 * Cifradia – Widget flotante de WhatsApp
 * Incluir en cualquier página con:
 *   <script src="assets/js/wa-widget.js"></script>
 * Ajusta los números de teléfono debajo (WA_CONSULTOR / WA_SOPORTE).
 */
(function () {
  /* ─── CONFIGURACIÓN ──────────────────────────────── */
  var WA_CONSULTOR = '573001234567'; // ← cambia por el número real
  var WA_SOPORTE   = '573007654321'; // ← cambia por el número real
  /* ─────────────────────────────────────────────────── */

  /* ── ESTILOS ─────────────────────────────────────── */
  var css = [
    '#wa-widget{position:fixed!important;bottom:24px!important;right:24px!important;z-index:2147483647!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:10px!important;pointer-events:auto!important;}',
    '#wa-widget.wa-hidden{opacity:0!important;pointer-events:none!important;transform:translateY(12px)!important;}',
    '#wa-btn{width:56px!important;height:56px!important;border-radius:50%!important;background:#25D366!important;border:none!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 2px 8px rgba(0,0,0,.2)!important;padding:0!important;transition:transform .2s,box-shadow .2s!important;flex-shrink:0!important;}',
    '#wa-btn:hover{transform:scale(1.06)!important;box-shadow:0 4px 14px rgba(0,0,0,.28)!important;}',
    '#wa-panel{display:none;flex-direction:column;width:300px;background:#fff;border:1px solid rgba(25,25,25,.14);border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,.1);overflow:hidden;transform-origin:bottom right;}',
    '#wa-panel.wa-open{display:flex!important;animation:wa-panel-in .22s cubic-bezier(.22,1,.36,1) forwards;}',
    '@keyframes wa-panel-in{from{opacity:0;transform:scale(.95) translateY(8px);}to{opacity:1;transform:scale(1) translateY(0);}}',
    '#wa-panel-header{background:#25D366;padding:16px 14px 20px;display:flex;align-items:flex-start;justify-content:space-between;}',
    '.wa-header-left{display:flex;align-items:center;gap:10px;}',
    '.wa-header-logo{width:38px;height:38px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.wa-header-title{font-family:"General Sans","Inter",sans-serif;font-weight:600;font-size:14px;color:#fff;letter-spacing:-.02em;line-height:1.2;display:block;}',
    '.wa-header-sub{font-family:"General Sans","Inter",sans-serif;font-size:11.5px;color:rgba(255,255,255,.8);display:block;margin-top:2px;}',
    '#wa-close-btn{background:none;border:none;color:rgba(255,255,255,.75);cursor:pointer;font-size:20px;line-height:1;padding:0;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .15s;}',
    '#wa-close-btn:hover{color:#fff;}',
    '#wa-panel-body{padding:10px;display:flex;flex-direction:column;gap:6px;background:#f8f8f8;}',
    '.wa-contact{display:flex!important;align-items:center!important;gap:11px!important;background:#fff!important;border:1px solid rgba(25,25,25,.1)!important;border-radius:2px!important;padding:12px 12px!important;text-decoration:none!important;color:#191919!important;transition:border-color .15s,background .15s!important;cursor:pointer!important;}',
    '.wa-contact:hover{border-color:#25D366!important;background:#f5fff8!important;}',
    '.wa-contact-avatar{width:40px!important;height:40px!important;border-radius:50%!important;background:#25D366!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;font-family:"General Sans","Inter",sans-serif!important;font-weight:700!important;font-size:12px!important;color:#fff!important;letter-spacing:-.01em!important;}',
    '.wa-contact-info{flex:1;min-width:0;}',
    '.wa-contact-name{display:block;font-family:"General Sans","Inter",sans-serif;font-weight:600;font-size:13.5px;color:#191919;letter-spacing:-.02em;line-height:1.3;}',
    '.wa-contact-desc{display:block;font-family:"General Sans","Inter",sans-serif;font-size:11.5px;color:rgba(25,25,25,.5);margin-top:2px;line-height:1.35;}',
    '.wa-contact-arrow{flex-shrink:0;display:flex;align-items:center;}',
    '#wa-panel-footer{padding:8px 14px;background:#f8f8f8;border-top:1px solid rgba(25,25,25,.07);font-family:"General Sans","Inter",sans-serif;font-size:10.5px;color:rgba(25,25,25,.4);text-align:center;display:flex;align-items:center;justify-content:center;gap:5px;margin:0;}',
    '@media (max-width:767px){#wa-widget{bottom:calc(18px + env(safe-area-inset-bottom, 0px))!important;right:calc(14px + env(safe-area-inset-right, 0px))!important;}#wa-btn{width:48px!important;height:48px!important;}#wa-panel{width:min(300px,calc(100vw - 28px))!important;}}'
  ].join('');

  /* ── SVG helpers ─────────────────────────────────── */
  var WA_PATH = 'M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.57c-.2.56-1.18 1.07-1.62 1.13-.44.06-.85.22-2.87-.6-2.4-.97-3.95-3.4-4.07-3.56-.12-.16-.97-1.29-.97-2.46 0-1.17.61-1.74.83-1.98.22-.24.48-.3.64-.3h.46c.15 0 .35-.05.55.42l.7 1.7c.07.16.04.35-.06.49l-.29.37c-.1.12-.2.25-.09.49.12.24.52.87 1.12 1.41.77.69 1.41.9 1.61.99.2.1.32.08.44-.05l.58-.64c.13-.15.26-.1.43-.06l1.62.76c.19.09.31.13.35.21.05.07.05.44-.15 1z';
  function waSvg(size, fill) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + (fill || 'white') + '"><path d="' + WA_PATH + '"/></svg>';
  }
  function arrowSvg() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
  }

  /* ── Crear tarjeta de contacto ───────────────────── */
  function mkContact(phone, msg, initials, name, desc) {
    var href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
    var a = document.createElement('a');
    a.className = 'wa-contact';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    var av = document.createElement('div');
    av.className = 'wa-contact-avatar';
    av.textContent = initials;

    var info = document.createElement('div');
    info.className = 'wa-contact-info';
    var nm = document.createElement('span');
    nm.className = 'wa-contact-name';
    nm.textContent = name;
    var ds = document.createElement('span');
    ds.className = 'wa-contact-desc';
    ds.textContent = desc;
    info.appendChild(nm);
    info.appendChild(ds);

    var arr = document.createElement('span');
    arr.className = 'wa-contact-arrow';
    arr.innerHTML = arrowSvg();

    a.appendChild(av);
    a.appendChild(info);
    a.appendChild(arr);
    return a;
  }

  /* ── Construir e inyectar widget ─────────────────── */
  function build() {
    if (document.getElementById('wa-widget')) return;

    /* Inyectar estilos */
    var styleEl = document.createElement('style');
    styleEl.id = 'wa-css';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    var widget = document.createElement('div');
    widget.id = 'wa-widget';

    /* Panel */
    var panel = document.createElement('div');
    panel.id = 'wa-panel';

    /* Header */
    var hdr = document.createElement('div');
    hdr.id = 'wa-panel-header';
    var hLeft = document.createElement('div');
    hLeft.className = 'wa-header-left';
    var logoDiv = document.createElement('div');
    logoDiv.className = 'wa-header-logo';
    logoDiv.innerHTML = waSvg(20);
    var tWrap = document.createElement('div');
    var ttl = document.createElement('span');
    ttl.className = 'wa-header-title';
    ttl.textContent = 'Cifradia';
    var sub = document.createElement('span');
    sub.className = 'wa-header-sub';
    sub.textContent = 'Respondemos en minutos';
    tWrap.appendChild(ttl);
    tWrap.appendChild(sub);
    hLeft.appendChild(logoDiv);
    hLeft.appendChild(tWrap);
    var closeBtn = document.createElement('button');
    closeBtn.id = 'wa-close-btn';
    closeBtn.setAttribute('aria-label', 'Cerrar');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.remove('wa-open');
    });
    hdr.appendChild(hLeft);
    hdr.appendChild(closeBtn);

    /* Body */
    var body = document.createElement('div');
    body.id = 'wa-panel-body';
    body.appendChild(mkContact(
      WA_CONSULTOR,
      'Hola, quiero hablar con un Consultor TI de Cifradia',
      'CT', 'Consultor TI', 'Proyectos, Microsoft 365 y Azure'
    ));
    body.appendChild(mkContact(
      WA_SOPORTE,
      'Hola, necesito soporte técnico de Cifradia',
      'SP', 'Soporte', 'Incidencias y ayuda técnica'
    ));

    /* Footer */
    var footer = document.createElement('p');
    footer.id = 'wa-panel-footer';
    footer.innerHTML = waSvg(11, '#25D366') + ' Respuesta habitual: unos minutos';

    panel.appendChild(hdr);
    panel.appendChild(body);
    panel.appendChild(footer);

    /* FAB button */
    var btn = document.createElement('button');
    btn.id = 'wa-btn';
    btn.setAttribute('aria-label', 'Abrir chat de WhatsApp');
    btn.innerHTML = waSvg(26);
    btn.addEventListener('click', function () {
      panel.classList.toggle('wa-open');
    });

    widget.appendChild(panel);
    widget.appendChild(btn);
    document.body.appendChild(widget);

    function updateMobileVisibility() {
      widget.classList.remove('wa-hidden');
    }

    updateMobileVisibility();
    window.addEventListener('scroll', updateMobileVisibility, { passive: true });
    window.addEventListener('resize', updateMobileVisibility);
  }

  /* Ejecutar cuando el DOM esté listo */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
