// BRAVIX site behaviour: mobile menu toggle + active nav link on scroll

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navlinks = document.querySelector('.navlinks');
  const navAnchors = document.querySelectorAll('.navlinks a');

  // ---- Mobile menu toggle ----
  if (burger && navlinks) {
    burger.addEventListener('click', () => {
      const isOpen = navlinks.classList.toggle('open');
      burger.textContent = isOpen ? '✕' : '☰';
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu after tapping a link
    navAnchors.forEach((link) => {
      link.addEventListener('click', () => {
        navlinks.classList.remove('open');
        burger.textContent = '☰';
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close the menu when tapping outside of it
    document.addEventListener('click', (e) => {
      const clickedInsideNav = navlinks.contains(e.target) || burger.contains(e.target);
      if (!clickedInsideNav && navlinks.classList.contains('open')) {
        navlinks.classList.remove('open');
        burger.textContent = '☰';
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Highlight the nav link for the section currently in view ----
  const sections = document.querySelectorAll('section[id]');
  if (sections.length && navAnchors.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
  }
});
