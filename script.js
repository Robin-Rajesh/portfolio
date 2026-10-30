(function () {
  const root = document.documentElement;

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
  const currentTheme = () => root.dataset.theme || (prefersLight.matches ? 'light' : 'dark');
  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  const menuBtn = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');
  const setMenu = (open) => {
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  // Nav border on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Project filters
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('#project-grid .card');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      cards.forEach((card) => {
        card.hidden = f !== 'all' && !card.dataset.tags.split(' ').includes(f);
      });
    });
  });

  // Highlight the current section in the nav
  const navAnchors = [...document.querySelectorAll('.nav-links a')];
  const sections = navAnchors.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));

    // Reveal on scroll
    const revealables = document.querySelectorAll('.section-title, .prose, .job, .card, .skill-group, .edu, .contact-inner');
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach((el) => { el.classList.add('reveal'); reveal.observe(el); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
