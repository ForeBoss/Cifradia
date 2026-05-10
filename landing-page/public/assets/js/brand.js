/* =====================================================
   CIFRADIA BRAND JS — reemplaza textos, logos y colores
   adaptando textos, logos y colores al estilo de la marca Cifradia
===================================================== */
(function () {
  'use strict';

  /* ── Mapa de reemplazos de texto (orden importa) ── */
  var TEXT_MAP = [
    ['Unsiloed AI', 'Cifradia'],
    ['Unsiloed', 'Cifradia'],
    ['The document layer\n for Enterprise AI', 'Consultoría TI integral\npara Colombia'],
    ['The document layer for Enterprise AI', 'Consultoría TI integral para Colombia'],
    ['for Enterprise AI', 'para Colombia'],
    ['The document layer', 'Consultoría TI integral'],
    ['We turn PDFs, images, and spreadsheets into JSON and Markdown your LLMs and AI agents can reason over. Built on our proprietary dual-stream vision models.',
      'Diseñamos, implementamos y administramos soluciones TI sobre plataformas Microsoft para empresas colombianas.'],
    ['We turn PDFs, images, and spreadsheets into JSON and Markdown your LLMs and AI agents can reason over.',
      'Diseñamos, implementamos y administramos soluciones TI sobre plataformas Microsoft.'],
    ['Built on our proprietary dual-stream vision models.', 'Expertos en Microsoft 365, Azure, Power Platform y más.'],
    // Secciones de la home
    ['[ BENCHMARK ]', '[ RESULTADOS ]'],
    ['[ CORE CAPABILITIES ]', '[ NUESTROS SERVICIOS ]'],
    ['[ HOW IT WORKS ]', '[ CÓMO TRABAJAMOS ]'],
    ['[ TESTIMONIALS ]', '[ TESTIMONIOS ]'],
    ['BACKED BY', 'EMPRESA DE'],
    ['Hear what people say', 'Lo que dicen nuestros clientes'],
    ['Ready to build the', '¿Listo para transformar'],
    ['software of the future?', 'tu empresa con tecnología?'],
    ['Schedule a Personalized Demo to Explore All Features', 'Agenda una consulta personalizada para conocer nuestros servicios'],
    ['Connect any source.', 'Diagnóstico de tu operación TI.'],
    ['Run parse, extract, or split.', 'Plan de transformación a medida.'],
    ['Ship to production.', 'Ejecución y acompañamiento continuo.'],
    // Footer labels
    ['COMPANY', 'EMPRESA'],
    ['SOCIALS', 'REDES'],
    ['RESOURCES', 'RECURSOS'],
    ['Documentation', 'Documentación'],
    // Navegación
    ['Playground', 'Servicios'],
    ['Docs', 'Soluciones'],
    ['Pricing', 'Precios'],
    ['Resources', 'Blog'],
    ['Careers', 'Empresa'],
    ['Log in', 'Iniciar sesión'],
    // CTA
    ['Book a demo', 'Solicitar asesoría'],
    ['Read the docs', 'Ver servicios'],
    ['Book a Demo', 'Solicitar asesoría'],
    ['Learn more', 'Conocer más'],
    ['Get started', 'Empezar ahora'],
    ['Get Started', 'Empezar ahora'],
    // YC badge
    ['YCOMBINATOR', 'COLOMBIA'],
    ['COMBINATOR', 'COLOMBIA'],
    ['Backed by Y Combinator', 'Empresa colombiana de consultoría TI'],
    // Footer / misc
    ['Enterprise AI', 'Consultoría TI'],
    ['document layer', 'capa de soluciones TI'],
    ['PDFs, images, and spreadsheets', 'infraestructura, aplicaciones y datos'],
    ['JSON and Markdown', 'soluciones a medida'],
    ['LLMs and AI agents', 'tus equipos y plataformas'],
    ['proprietary dual-stream vision models', 'metodologías ITIL, ISO y COBIT'],
    // Precio / API
    ['pages processed', 'proyectos ejecutados'],
    ['pages/month', 'proyectos/mes'],
    ['Contact sales', 'Contactar ventas'],
    ['Contact Sales', 'Contactar ventas'],
    ['Start for free', 'Empezar gratis'],
    ['Try for free', 'Probar gratis'],
    ['Most popular', 'Más popular'],
    ['Head of AI', 'Director de TI'],
    ['Fortune 150 Bank, NY', 'Empresa financiera, Bogotá'],
    ['Series A fintech', 'Fintech colombiana'],
    ['Large Mortgage Servicer', 'Empresa inmobiliaria, Bogotá'],
    // Blog posts títulos genéricos
    ['document parsing', 'consultoría TI'],
    ['Document Parsing', 'Consultoría TI'],
    ['document extraction', 'consultoría TI'],
    ['Document Extraction', 'Consultoría TI'],
    ['PDF parser', 'soluciones TI'],
    ['PDF Parser', 'Soluciones TI'],
  ];

  /* ── Atributos de texto que también se reemplazan ── */
  var ATTR_MAP = [
    ['Unsiloed AI', 'Cifradia'],
    ['Unsiloed', 'Cifradia'],
    ['Backed by Y Combinator', 'Empresa colombiana de consultoría TI'],
    ['Book a demo', 'Solicitar asesoría'],
  ];

  /* ── Logo paths posibles (root / blog) ── */
  var LOGO_SRCS = ['unsiloedai.png', '../unsiloedai.png', '/unsiloedai.png'];
  var LOGO_NEW  = '/cifradia-logo.png';

  /* ─────────────────────────────────────
     1. Reemplazar nodos de texto
  ───────────────────────────────────── */
  function replaceTextNode(node) {
    var original = node.textContent;
    var result = original;
    for (var i = 0; i < TEXT_MAP.length; i++) {
      result = result.split(TEXT_MAP[i][0]).join(TEXT_MAP[i][1]);
    }
    if (result !== original) node.textContent = result;
  }

  function walkDom(el) {
    if (!el) return;
    var children = el.childNodes;
    for (var i = 0; i < children.length; i++) {
      var node = children[i];
      if (node.nodeType === 3 /* TEXT_NODE */) {
        replaceTextNode(node);
      } else if (node.nodeType === 1 /* ELEMENT_NODE */) {
        var tag = node.tagName;
        if (tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'NOSCRIPT' && tag !== 'IFRAME') {
          walkDom(node);
        }
      }
    }
  }

  /* ─────────────────────────────────────
     2. Reemplazar atributos (alt, aria-label, title, placeholder)
  ───────────────────────────────────── */
  function replaceAttrs() {
    var attrs = ['alt', 'aria-label', 'title', 'placeholder', 'value'];
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      for (var j = 0; j < attrs.length; j++) {
        var val = el.getAttribute(attrs[j]);
        if (!val) continue;
        var newVal = val;
        for (var k = 0; k < ATTR_MAP.length; k++) {
          newVal = newVal.split(ATTR_MAP[k][0]).join(ATTR_MAP[k][1]);
        }
        if (newVal !== val) el.setAttribute(attrs[j], newVal);
      }
    }
  }

  /* ─────────────────────────────────────
     3. Reemplazar logo
  ───────────────────────────────────── */
  function replaceLogo() {
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var src = img.getAttribute('src') || '';
      if (LOGO_SRCS.indexOf(src) !== -1 || src.indexOf('unsiloedai') !== -1) {
        img.src = LOGO_NEW;
        img.alt = 'Cifradia — Consultoría TI';
        img.style.filter = 'none';
        img.style.height = '36px';
        img.style.width = 'auto';
        img.classList.add('cifradia-logo-img');
      }
    }
    /* Quitar el invert que hace el logo blanco en algunos contextos */
    var logoSpanImgs = document.querySelectorAll('a img');
    for (var i = 0; i < logoSpanImgs.length; i++) {
      if (logoSpanImgs[i].src && logoSpanImgs[i].src.indexOf('cifradia-logo') !== -1) {
        logoSpanImgs[i].style.filter = 'none';
      }
    }
  }

  /* ─────────────────────────────────────
     3.1 Centrar navbar desktop con estilos inline
  ───────────────────────────────────── */
  function fixNavbarCenter() {
    var headers = document.querySelectorAll('.navbar-dash-march');
    var isDesktop = window.innerWidth >= 1024;

    for (var i = 0; i < headers.length; i++) {
      var inner = headers[i].firstElementChild;
      if (!inner) continue;

      var logoLink = null;
      var nav = null;
      var ctaWrap = null;
      var children = inner.children;

      for (var j = 0; j < children.length; j++) {
        var child = children[j];
        if (!logoLink && child.tagName === 'A') {
          logoLink = child;
          continue;
        }
        if (!nav && child.tagName === 'NAV') {
          nav = child;
          continue;
        }
        if (!ctaWrap && child.tagName === 'DIV') {
          ctaWrap = child;
        }
      }

      inner.style.display = '';
      inner.style.position = '';
      inner.style.height = '';
      inner.style.minHeight = '';

      if (logoLink) {
        logoLink.style.position = '';
        logoLink.style.left = '';
        logoLink.style.top = '';
        logoLink.style.transform = '';
        logoLink.style.zIndex = '';
      }

      if (nav) {
        nav.style.position = '';
        nav.style.left = '';
        nav.style.right = '';
        nav.style.top = '';
        nav.style.translate = '';
        nav.style.transform = '';
        nav.style.margin = '';
        nav.style.whiteSpace = '';
        nav.style.zIndex = '';
      }

      if (ctaWrap) {
        ctaWrap.style.position = '';
        ctaWrap.style.right = '';
        ctaWrap.style.top = '';
        ctaWrap.style.transform = '';
        ctaWrap.style.zIndex = '';
      }

      if (!isDesktop) {
        continue;
      }

      if (logoLink) {
        var logoImg = logoLink.querySelector('img');
        if (logoImg) {
          logoImg.style.height = '44px';
          logoImg.style.width = 'auto';
        }
      }

      if (window.location.search.indexOf('navdebug=1') !== -1 && nav) {
        var navRect = nav.getBoundingClientRect();
        var navCenter = navRect.left + (navRect.width / 2);
        var innerRect = inner.getBoundingClientRect();
        var viewportCenterDelta = Math.round(navCenter - (window.innerWidth / 2));
        var computedNav = window.getComputedStyle(nav);
        var marker = document.getElementById('nav-metrics');

        if (!marker) {
          marker = document.createElement('meta');
          marker.id = 'nav-metrics';
          marker.setAttribute('name', 'nav-metrics');
          document.head.appendChild(marker);
        }

        marker.setAttribute('content', JSON.stringify({
          viewportWidth: Math.round(window.innerWidth),
          innerLeft: Math.round(innerRect.left),
          navLeft: Math.round(navRect.left),
          navWidth: Math.round(navRect.width),
          navCenter: Math.round(navCenter),
          delta: viewportCenterDelta,
          computedPosition: computedNav.position,
          computedLeft: computedNav.left,
          computedTop: computedNav.top,
          computedTransform: computedNav.transform,
          computedTranslate: computedNav.translate,
          offsetParentTag: nav.offsetParent ? nav.offsetParent.tagName : null
        }));
      }
    }
  }

  /* ─────────────────────────────────────
     4. Barra de anuncio Cifradia
  ───────────────────────────────────── */
  function addAnnouncementBar() {
    if (document.getElementById('cifradia-bar')) return;
    var bar = document.createElement('a');
    bar.id = 'cifradia-bar';
    bar.href = 'https://www.cifradia.com/';
    bar.target = '_blank';
    bar.rel = 'noreferrer';
    bar.setAttribute('aria-label', 'Ir a Cifradia');
    bar.textContent = '¿No tienes claro qué tecnología implementar? Te ayudamos a decidir con criterio.';
    /* Insertar al inicio del body */
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ─────────────────────────────────────
     5. Colores: reemplazar naranja YC → mint
  ───────────────────────────────────── */
  function fixColors() {
    /* Elementos con color inline F26522 */
    var all = document.querySelectorAll('[style]');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      var st = el.style;
      if (st.backgroundColor === 'rgb(242, 101, 34)') {
        st.backgroundColor = '#50FFB1';
        st.color = '#000914';
      }
      if (st.color === 'rgb(242, 101, 34)') {
        st.color = '#50FFB1';
      }
    }
    /* Spans del badge YC: ocultar el cuadrado naranja "Y" */
    var spans = document.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      var sp = spans[i];
      if (sp.textContent.trim() === 'Y' && sp.style.backgroundColor) {
        sp.style.backgroundColor = '#50FFB1';
        sp.style.color = '#000914';
      }
    }
  }

  /* ─────────────────────────────────────
     6. Actualizar <title> de la página
  ───────────────────────────────────── */
  function fixTitle() {
    if (document.title) {
      var t = document.title;
      t = t.split('Unsiloed AI').join('Cifradia');
      t = t.split('Unsiloed').join('Cifradia');
      document.title = t;
    }
  }

  /* ─────────────────────────────────────
     7. Actualizar favicon
  ───────────────────────────────────── */
  function fixFavicon() {
    var pngHref = '/assets/img/cifradia-favicon.png';

    var links = document.querySelectorAll('link[rel*="icon"]');
    for (var i = 0; i < links.length; i++) {
      var rel = (links[i].getAttribute('rel') || '').toLowerCase();

      links[i].setAttribute('href', pngHref);
      links[i].setAttribute('type', 'image/png');

      if (rel === 'icon') {
        links[i].setAttribute('sizes', '32x32');
      }
    }
  }

  /* ─────────────────────────────────────
     8. Reemplazar enlaces externos Unsiloed
  ───────────────────────────────────── */
  function fixLinks() {
    var anchors = document.querySelectorAll('a[href*="unsiloed.ai"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].href = anchors[i].href
        .replace(/unsiloed\.ai/g, 'cifradia.com');
    }
  }

  /* ─────────────────────────────────────
     Ejecutar todo
  ───────────────────────────────────── */
  function applyBrand() {
    addAnnouncementBar();
    walkDom(document.body);
    replaceAttrs();
    replaceLogo();
    fixNavbarCenter();
    fixColors();
    fixTitle();
    fixFavicon();
    fixLinks();
  }

  if (!window.__cifradiaNavbarResizeBound) {
    window.__cifradiaNavbarResizeBound = true;
    window.addEventListener('resize', function () {
      fixNavbarCenter();
    });
  }

  /* Ejecutar en DOMContentLoaded y de nuevo tras la hidratación de React */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyBrand();
      setTimeout(applyBrand, 600);   /* tras hidratación React */
      setTimeout(applyBrand, 2000);  /* segunda pasada segura */
    });
  } else {
    applyBrand();
    setTimeout(applyBrand, 600);
    setTimeout(applyBrand, 2000);
  }
})();
