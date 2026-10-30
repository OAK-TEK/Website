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
    d.style.cssText =
      'position:fixed;left:12px;right:12px;bottom:12px;max-width:34rem;z-index:99999;background:#fff;color:#1b1f14;' +
      'border:1px solid #d9dccf;border-radius:10px;padding:14px;box-shadow:0 6px 24px rgba(0,0,0,.25);font:14px/1.5 system-ui,sans-serif';
    d.innerHTML =
      '<strong>Cookies</strong>' +
      '<p style="margin:6px 0 10px">We use Google Analytics to count visits. It loads only if you accept, and nothing is sent to Google before that. ' +
      'You can change your choice any time under Cookie settings in the footer. See our ' +
      '<a href="/legal/lootpick/privacy/" style="color:#006900">Privacy Policy</a>.</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<button id="lp-reject" style="flex:1;min-height:44px;padding:8px 12px;border:1px solid #1b1f14;background:#fff;color:#1b1f14;border-radius:8px;cursor:pointer;font:inherit">Reject</button>' +
      '<button id="lp-accept" style="flex:1;min-height:44px;padding:8px 12px;border:1px solid #006900;background:#006900;color:#fff;border-radius:8px;cursor:pointer;font:inherit">Accept</button>' +
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
