/* Tiny synchronous auth gate — loaded in <head> so the lock screen
   paints on first frame. Self-contained: no dependency on site.js. */
(function() {
  var AUTH_PASSWORD = 'sobha2027';
  var AUTH_KEY = 'sobha_site_auth';

  try {
    if (sessionStorage.getItem(AUTH_KEY) === '1') return;
  } catch(e) {}

  // Resolve where this script lives (root vs subfolder) so we can
  // build correct URLs to the logo and home.html.
  var base = '';
  try {
    var s = document.currentScript && document.currentScript.getAttribute('src');
    if (s) base = s.replace(/auth\.js.*$/, '');
  } catch(e) {}

  // Inline critical CSS so the gate paints on the very first frame —
  // without waiting for site.css (47KB) to download/parse.
  function injectGateStyles() {
    if (document.getElementById('site-auth-gate-styles')) return;
    var s = document.createElement('style');
    s.id = 'site-auth-gate-styles';
    s.textContent =
      '#site-auth-gate{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#FBF7EE;color:#0B1E2F;font-family:Manrope,system-ui,sans-serif;opacity:1;transition:opacity .32s ease}' +
      '#site-auth-gate.hide{opacity:0;pointer-events:none}' +
      '#site-auth-gate .ag-bg{position:absolute;inset:0;background:#FBF7EE}' +
      '#site-auth-gate .ag-shell{position:relative;z-index:1;width:min(420px,92vw);padding:44px 44px 36px;display:flex;flex-direction:column;gap:40px}' +
      '#site-auth-gate .ag-top{display:flex;justify-content:center;margin-bottom:8px;margin-top:32px}' +
      '#site-auth-gate .ag-top img{height:55px;width:auto;display:block;object-fit:contain}' +
      '#site-auth-gate .ag-main{display:flex;flex-direction:column;gap:20px;align-items:center;text-align:center}' +
      '#site-auth-gate .ag-rule{width:32px;height:1px;background:#B7945A;opacity:.9;margin:0 auto}' +
      '#site-auth-gate .ag-kicker{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:9px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:#B7945A}' +
      '#site-auth-gate .ag-title{font-family:"Cormorant Garamond","Times New Roman",serif;font-weight:300;font-size:64px;line-height:.95;letter-spacing:-.025em;margin:0;color:#0B1E2F}' +
      '#site-auth-gate .ag-title em{font-style:italic;color:#B7945A;font-weight:400}' +
      '#site-auth-gate .ag-form{display:flex;flex-direction:column;gap:22px;margin-top:16px}' +
      '#site-auth-gate .ag-input-wrap{position:relative;width:100%;border-bottom:1px solid rgba(11,30,47,.22);transition:border-color .25s ease}' +
      '#site-auth-gate .ag-input-wrap:focus-within{border-bottom-color:#B7945A}' +
      '#site-auth-input{width:100%;padding:14px 4px;background:transparent;border:none;color:#0B1E2F;font-family:"Cormorant Garamond","Times New Roman",serif;font-size:18px;font-weight:400;letter-spacing:.04em;text-align:left;outline:none;position:relative;z-index:1}' +
      '#site-auth-hint{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;color:rgba(11,30,47,.32);font-family:"Cormorant Garamond","Times New Roman",serif;font-size:18px;font-weight:300;font-style:italic;letter-spacing:.06em;z-index:0}' +
      '#site-auth-form button{display:inline-flex;align-items:center;justify-content:space-between;padding:15px 22px;background:#0B1E2F;color:#F4EFE6;border:1px solid #0B1E2F;border-radius:999px;font-family:Manrope,system-ui,sans-serif;font-size:10px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease}' +
      '#site-auth-form button i{font-style:normal;font-family:"Cormorant Garamond","Times New Roman",serif;font-size:16px;font-weight:300;letter-spacing:0;transition:transform .25s ease}' +
      '#site-auth-form button:hover{background:transparent;color:#0B1E2F}' +
      '#site-auth-form button:hover i{transform:translateX(4px)}' +
      '#site-auth-error{display:none;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#E08B73}' +
      '#site-auth-error.show{display:block}' +
      '#site-auth-gate .ag-foot{margin-top:36px;color:rgba(11,30,47,.6);padding-top:22px;border-top:1px solid rgba(11,30,47,.12);font-family:"JetBrains Mono",ui-monospace,monospace;font-size:9px;letter-spacing:.24em;text-transform:uppercase;text-align:center}' +
      '@media (max-width:560px){#site-auth-gate .ag-shell{padding:0 24px}#site-auth-gate .ag-title{font-size:44px}}';
    (document.head || document.documentElement).appendChild(s);
  }

  function buildGate() {
    if (document.getElementById('site-auth-gate')) return;
    injectGateStyles();
    try {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } catch(e) {}
    var gate = document.createElement('div');
    gate.id = 'site-auth-gate';
    gate.innerHTML = '' +
      '<div class="ag-bg"></div>' +
      '<div class="ag-shell">' +
      '  <header class="ag-top">' +
      '    <img src="' + (base || '') + 'assets/sobha-logo-navy.png" alt="Sobha" />' +
      '  </header>' +
      '  <main class="ag-main">' +
      '    <div class="ag-rule"></div>' +
      '    <div class="ag-kicker">Internal · Confidential</div>' +
      '    <h1 class="ag-title">Group <em>MIS</em></h1>' +
      '    <form class="ag-form" id="site-auth-form" autocomplete="off">' +
      '      <div class="ag-input-wrap"><span id="site-auth-hint"><span class="ag-hint-text">Enter password</span></span><input id="site-auth-input" type="password" autofocus /></div>' +
      '      <button type="submit"><span>Continue</span><i>→</i></button>' +
      '      <div id="site-auth-error">Incorrect password</div>' +
      '    </form>' +
      '  </main>' +
      '  <footer class="ag-foot">For authorised viewers only</footer>' +
      '</div>';
    document.body.appendChild(gate);

    var form = gate.querySelector('#site-auth-form');
    var input = gate.querySelector('#site-auth-input');
    var hint = gate.querySelector('#site-auth-hint');
    var err = gate.querySelector('#site-auth-error');
    if (hint && input) {
      var hintText = hint.querySelector('.ag-hint-text');
      var alignCaret = function() {
        if (!hintText) return;
        var wrapRect = input.getBoundingClientRect();
        var textRect = hintText.getBoundingClientRect();
        var pad = Math.max(0, textRect.left - wrapRect.left);
        input.style.paddingLeft = pad + 'px';
      };
      var toggleHint = function() {
        hint.style.display = input.value.length ? 'none' : '';
      };
      input.addEventListener('input', toggleHint);
      toggleHint();
      requestAnimationFrame(alignCaret);
      setTimeout(alignCaret, 60);
      window.addEventListener('resize', alignCaret);
    }
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value === AUTH_PASSWORD) {
        try { sessionStorage.setItem(AUTH_KEY, '1'); } catch(e) {}
        var path = (location.pathname || '').replace(/\/+$/, '');
        var isHome = /(^|\/)home\.html$/i.test(path) || path === '' || /\/$/.test(location.pathname);
        if (!isHome) {
          location.href = (base || '') + 'home.html';
          return;
        }
        gate.classList.add('hide');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        try { window.scrollTo(0, 0); } catch(e) {}
        setTimeout(function() {
          gate.remove();
          try { window.scrollTo(0, 0); } catch(e) {}
        }, 320);
      } else {
        err.classList.add('show');
        input.value = '';
        input.focus();
      }
    });
  }

  // Run as soon as <body> exists. With a small <head>, this fires within ms.
  if (document.body) {
    buildGate();
  } else {
    document.addEventListener('DOMContentLoaded', buildGate, { once: true });
  }
})();
