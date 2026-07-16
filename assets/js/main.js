/* ============================================
   OAK TEK — oaktek.org
   Vanilla JS: ScrollFloat, SpotlightCard, Mobile Nav
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile Nav Toggle --- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('site-nav--open');
      var expanded = nav.classList.contains('site-nav--open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
  }

  /* --- ScrollFloat: character-by-character reveal on scroll --- */
  var scrollFloats = document.querySelectorAll('.scroll-float');
  if (scrollFloats.length > 0 && 'IntersectionObserver' in window) {
    scrollFloats.forEach(function (el) {
      var textSpan = el.querySelector('.scroll-float__text');
      if (!textSpan) return;

      var text = textSpan.textContent || '';
      textSpan.innerHTML = '';
      text.split('').forEach(function (char, i) {
        var span = document.createElement('span');
        span.className = 'scroll-float__char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = (i * 0.03) + 's';
        textSpan.appendChild(span);
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-float--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    scrollFloats.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: show immediately */
    scrollFloats.forEach(function (el) { el.classList.add('scroll-float--visible'); });
  }

  /* --- SpotlightCard: radial gradient follows cursor --- */
  var spotlightCards = document.querySelectorAll('.product-card');
  spotlightCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });

  /* --- Contact form: mailto fallback --- */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.querySelector('[name="name"]');
      var email = contactForm.querySelector('[name="email"]');
      var message = contactForm.querySelector('[name="message"]');

      if (!name || !email || !message) return;

      var subject = encodeURIComponent('Contact from ' + name.value + ' via oaktek.org');
      var body = encodeURIComponent(
        'Name: ' + name.value + '\n' +
        'Email: ' + email.value + '\n\n' +
        message.value
      );

      window.location.href = 'mailto:oaktechnologiesfze@gmail.com?subject=' + subject + '&body=' + body;

      var notice = contactForm.querySelector('.form-notice');
      if (notice) notice.style.display = 'block';
    });
  }
})();
