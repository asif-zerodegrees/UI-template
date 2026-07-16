/** Shared chrome — mobile nav toggle */
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('siteMenu');
const mobileQuery = window.matchMedia('(max-width: 1023px)');

function isMobileNav() {
  return mobileQuery.matches;
}

function setMenuOpen(open) {
  if (!menu || !toggle) return;

  menu.classList.toggle('flex', open);
  menu.classList.toggle('hidden', !open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('nav-open', open && isMobileNav());
}

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.contains('hidden');
    setMenuOpen(open);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobileNav()) setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileNav() && menu.classList.contains('flex')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  mobileQuery.addEventListener('change', () => {
    if (!isMobileNav()) {
      document.body.classList.remove('nav-open');
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  });
}
