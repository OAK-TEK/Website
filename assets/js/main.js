// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== COUNTDOWN TIMERS =====
function updateCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const target = new Date(el.dataset.countdown).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = 'Launched!';
      el.style.color = '#2d6a2d';
      const units = el.nextElementSibling;
      if (units) units.style.display = 'none';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    el.textContent = `${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  });
}

if (document.querySelector('[data-countdown]')) {
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

// ===== SCROLLFLOAT (character-by-character reveal) =====
document.querySelectorAll('.scroll-float').forEach(el => {
  const text = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', text);

  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.transitionDelay = `${i * 0.025}s`;
    el.appendChild(span);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(el);
});

// ===== SPOTLIGHTCARD (cursor-following glow) =====
const spotlightCard = document.getElementById('spotlight-card');
if (spotlightCard) {
  spotlightCard.addEventListener('mousemove', e => {
    const rect = spotlightCard.getBoundingClientRect();
    spotlightCard.style.setProperty('--x', `${e.clientX - rect.left}px`);
    spotlightCard.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
}

// ===== CONTACT FORM (mailto fallback) =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:oaktechnologiesfze@gmail.com?subject=${subject}&body=${body}`;
  });
}
