// ===== MOBILE NAV =====
(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
  Array.prototype.forEach.call(links.querySelectorAll('a'), function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ===== SPOTLIGHT CARD =====
(function () {
  var card = document.getElementById('spotlight-card');
  if (!card) return;
  card.addEventListener('mousemove', function (e) {
    var r = card.getBoundingClientRect();
    card.style.setProperty('--x', (e.clientX - r.left) + 'px');
    card.style.setProperty('--y', (e.clientY - r.top) + 'px');
  });
})();

// ===== CONTACT FORM (Netlify Forms, mailto as the fallback) =====
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('contact-status');
  var button = form.querySelector('button[type="submit"]');
  function mailto() {
    var name = form.elements.name.value, email = form.elements.email.value, message = form.elements.message.value;
    window.location.href = 'mailto:oaktechnologiesfze@gmail.com'
      + '?subject=' + encodeURIComponent('Website message from ' + name)
      + '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    button.disabled = true;
    status.textContent = 'Sending...';
    fetch(form.getAttribute('action'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.reset();
      status.textContent = 'Thank you. Your message has been sent, and we will reply by email.';
    }).catch(function () {
      status.textContent = 'We could not send that here, so we are opening your email app instead.';
      mailto();
    }).then(function () { button.disabled = false; });
  });
})();
