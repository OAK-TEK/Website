// ===== MOBILE NAV =====
(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  Array.prototype.forEach.call(links.querySelectorAll('a'), function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ===== COUNTDOWNS =====
(function () {
  var els = document.querySelectorAll('[data-countdown]');
  if (!els.length) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    Array.prototype.forEach.call(els, function (el) {
      var diff = new Date(el.dataset.countdown).getTime() - Date.now();
      if (diff <= 0) {
        el.textContent = 'Launched';
        el.style.color = '#2d6a2d';
        var units = el.nextElementSibling;
        if (units && units.classList.contains('countdown-card__units')) units.style.display = 'none';
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.textContent = pad(d) + ':' + pad(h) + ':' + pad(m) + ':' + pad(s);
    });
  }

  tick();
  setInterval(tick, 1000);
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
