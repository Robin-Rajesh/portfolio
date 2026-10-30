// Scroll effects. Everything is driven from scroll position on each frame, so whatever
// is on screen at load is already in its final state. Skipped for reduced motion.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('fx');

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const header = document.getElementById('bar');
  const name = document.getElementById('hero-name');
  const email = document.getElementById('big-email');
  const risers = [...document.querySelectorAll('[data-fx="rise"]')];
  const specimens = [...document.querySelectorAll('.specimen')];

  // Split the statement into words that light up as the section scrolls past
  const statement = document.querySelector('.statement');
  const words = statement.querySelector('.words');
  words.innerHTML = words.textContent.trim().split(/\s+/).map((w) => `<span>${w}</span>`).join(' ');
  const wordEls = [...words.children];

  function frame() {
    const vh = window.innerHeight;
    const y = window.scrollY;

    header.classList.toggle('stuck', y > 24);

    // Hero name drifts up, shrinks a touch and fades
    const h = clamp(y / (vh * 0.9));
    name.style.transform = `translate3d(0, ${h * -40}px, 0) scale(${1 - h * 0.1})`;
    name.style.opacity = String(1 - h * 0.75);

    // Statement: progress through the pinned section lights each word in turn
    const sr = statement.getBoundingClientRect();
    const sp = clamp((vh * 0.5 - sr.top) / (sr.height - vh));
    const lit = sp * (wordEls.length + 2);
    wordEls.forEach((el, i) => el.classList.toggle('lit', i < lit));

    // Rise into place as elements enter the bottom third of the screen
    risers.forEach((el) => {
      const r = el.getBoundingClientRect();
      const delay = parseFloat(el.dataset.delay || 0);
      const p = ease(clamp((vh - r.top) / (vh * 0.3) - delay * 2));
      el.style.opacity = String(p);
      el.style.transform = `translate3d(0, ${(1 - p) * 56}px, 0) scale(${0.96 + p * 0.04})`;
    });

    // Specimens play their little animation once they are well into view
    specimens.forEach((el) => {
      if (!el.classList.contains('on') && el.getBoundingClientRect().top < vh * 0.7) el.classList.add('on');
    });

    // Closing email grows as the page bottoms out
    const er = email.getBoundingClientRect();
    const ep = ease(clamp((vh - er.top) / (vh * 0.5)));
    email.style.transform = `scale(${0.85 + ep * 0.15})`;
    email.style.opacity = String(0.2 + ep * 0.8);
  }

  let queued = false;
  const request = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; frame(); });
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  frame();
})();
