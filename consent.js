/* Cookie consent for the static oaktek.org site. No dependencies.
 *
 * Add to EVERY page of oaktek.org, in place of the normal Google Analytics tag:
 *   <script>window.OAKTEK_GA_ID = 'G-XXXXXXXXXX';</script>
 *   <script src="/consent.js" defer></script>
 * Remove the existing gtag.js snippet from your pages: this script loads Google
 * Analytics only after the visitor accepts. Nothing is sent to Google before
 * that. A link or button with id="cookie-settings" reopens the choices.
 */
(function () {
  var KEY = 'lp_consent';
  var GA = window.OAKTEK_GA_ID;

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      return v && v.v === 1 && typeof v.analytics === 'boolean' ? v : null;
    } catch (e) {
      return null;
    }
  }
  function write(analytics) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, analytics: analytics, ads: false, ts: new Date().toISOString() }));
    } catch (e) {}
  }

  function loadGA() {
    if (!GA) return;
    // Re-enable first: after a withdrawal the script may already be loaded.
    window['ga-disable-' + GA] = false;
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA, { anonymize_ip: true });
  }

  function stopGA() {
    if (GA) window['ga-disable-' + GA] = true;
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n === '_ga' || n.indexOf('_ga_') === 0 || n === '_gid') {
        document.cookie = n + '=; Max-Age=0; path=/';
        document.cookie = n + '=; Max-Age=0; path=/; domain=' + location.hostname.replace(/^www\./, '');
        document.cookie = n + '=; Max-Age=0; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.');
      }
    });
  }

  function apply(c) {
    if (c && c.analytics) loadGA();
    else stopGA();
  }

  function banner(existing) {
    var old = document.getElementById('lp-consent');
    if (old) old.remove();
    var d = document.createElement('div');
    d.id = 'lp-consent';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookie settings');
    d.className = 'consent';
    d.innerHTML =
      '<strong class="consent__title">Cookies</strong>' +
      '<p class="consent__text">We use Google Analytics to count visits. It loads only if you accept, and nothing is sent to Google before that. ' +
      'You can change your choice any time under Cookie settings in the footer. See our ' +
      '<a href="/legal/">legal pages</a>.</p>' +
      '<div class="consent__actions">' +
      '<button type="button" id="lp-reject" class="btn btn--outline-light">Reject</button>' +
      '<button type="button" id="lp-accept" class="btn btn--primary">Accept</button>' +
      '</div>';
    document.body.appendChild(d);
    function choose(v) {
      write(v);
      apply({ analytics: v });
      d.remove();
    }
    document.getElementById('lp-reject').onclick = function () { choose(false); };
    document.getElementById('lp-accept').onclick = function () { choose(true); };
  }

  function init() {
    var c = read();
    apply(c);
    if (!c) banner(null);
    var link = document.getElementById('cookie-settings');
    if (link) link.addEventListener('click', function (e) { e.preventDefault(); banner(read()); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
