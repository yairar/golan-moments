// רגעים של הגולן — small, purposeful interactions only

document.addEventListener('DOMContentLoaded', () => {

  // Nav becomes solid once the hero has scrolled past
  const nav = document.querySelector('.site-nav');
  const hero = document.querySelector('.hero, .about-hero');

  const setNavState = () => {
    if (!nav) return;
    const threshold = hero ? Math.min(hero.offsetHeight * 0.6, 420) : 80;
    if (window.scrollY > threshold) {
      nav.classList.add('is-solid');
    } else {
      nav.classList.remove('is-solid');
    }
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Stagger reveal delay for grouped elements
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('.reveal');
    items.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 90, 360)}ms`;
    });
  });
});
