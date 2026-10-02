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

// ===== CONTACT FORM (mailto) =====
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    window.location.href = 'mailto:oaktechnologiesfze@gmail.com'
      + '?subject=' + encodeURIComponent('Website message from ' + name)
      + '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
  });
})();
