// — Header scroll (quita margen al hacer scroll)
const header = document.getElementById('site-header');
const updateHeader = () => header.classList.toggle('HeaderScrolled', window.scrollY > 0);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// — Desktop dropdowns (hover + focus)
const navItems = Array.from(document.querySelectorAll('.LinksList > li:has(.Dropdown)'));
navItems.forEach(item => {
  const btn = item.querySelector('.NavBtn');
  const close = () => { item.classList.remove('Open'); btn?.setAttribute('aria-expanded', 'false'); };
  const open  = () => {
    navItems.forEach(i => {
      if (i !== item) {
        i.classList.remove('Open');
        i.querySelector('.NavBtn')?.setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.add('Open');
    btn?.setAttribute('aria-expanded', 'true');
  };
  item.addEventListener('mouseenter', open);
  item.addEventListener('mouseleave', close);
  item.addEventListener('focusin', open);
  item.addEventListener('focusout', e => { if (!item.contains(e.relatedTarget)) close(); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') navItems.forEach(i => i.classList.remove('Open'));
});

// — Mobile hamburger
const hamburguer = document.getElementById('hamburguerBtn');
const mobileNav  = document.getElementById('mobileNav');
hamburguer?.addEventListener('click', () => {
  const open = !hamburguer.classList.contains('active');
  hamburguer.classList.toggle('active', open);
  hamburguer.setAttribute('aria-expanded', String(open));
  mobileNav.classList.toggle('active', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
});

// — Hero rotating word
const words  = ['Infraestructura', 'Programación', 'Bases de Datos', 'Seguridad'];
const wordEl = document.getElementById('heroWord');
if (wordEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % words.length;
    wordEl.classList.add('changing');
    setTimeout(() => {
      wordEl.textContent = words[idx];
      wordEl.classList.remove('changing');
    }, 180);
  }, 2400);
}

// — Journey horizontal tabs
const jTabBtns  = Array.from(document.querySelectorAll('.JTabBtn'));
const jTabPanels = Array.from(document.querySelectorAll('.JTabPanel'));

jTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('aria-controls');
    // Deactivate all
    jTabBtns.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    jTabPanels.forEach(p => {
      p.classList.remove('is-active');
      p.hidden = true;
    });
    // Activate clicked
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(target);
    if (panel) {
      panel.classList.add('is-active');
      panel.hidden = false;
    }
  });
});

