/* Shared site script: site-wide auth gate + nav drawer + scroll/reveal + (legacy) currency */
(function() {

  // Auth gate is now handled by auth.js (loaded synchronously in <head>)
  // so the lock screen paints on first frame, before site.js downloads.

  // ---------- Nav drawer (hamburger) ----------
  function buildDrawer() {
    if (document.getElementById('site-drawer')) return;
    // Compute the path back to project root based on known structure.
    // Only the UAE Year-End page sits in a subfolder; everything else is at root.
    var path = window.location.pathname;
    var root = /\/uae\/finance\/2025-year-end\//.test(path) ? '../../../' : '';
    // Mini monoline icons — 16x16
    var icons = {
      sales:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12 L6 8 L9 10 L14 4"/><path d="M10 4 L14 4 L14 8"/></svg>',
      pl:      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2 V14"/><path d="M3 5 H13"/><path d="M3 5 L1.5 8.5 H4.5 Z M13 5 L11.5 8.5 H14.5 Z"/></svg>',
      stack:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2 L14 5 L8 8 L2 5 Z"/><path d="M2 8 L8 11 L14 8"/><path d="M2 11 L8 14 L14 11"/></svg>',
      flow:    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6 Q4 3 7 6 T13 6"/><path d="M1 11 Q4 8 7 11 T13 11"/><path d="M11 4 L13 6 L11 8"/></svg>',
      walk:    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="3" r="1.3"/><path d="M9 5 L7 9 L9 10 L8 14"/><path d="M9 10 L11 13"/><path d="M7 9 L4 11"/></svg>',
      cal:     '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3.5" width="12" height="10.5" rx="1"/><path d="M2 7 H14"/><path d="M5 2 V5"/><path d="M11 2 V5"/></svg>',
      map:     '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3.5 L6 2 L10 4 L14 2.5 V12.5 L10 14 L6 12 L2 13.5 Z"/><path d="M6 2 V12"/><path d="M10 4 V14"/></svg>'
    };
    // Active page detection
    var isSalesPlan = /\/index\.html$|\/$/.test(path) && !/\/uae\//.test(path);
    var isYearEnd = /\/uae\/finance\/2025-year-end\//.test(path);
    var isIndia = /\/india\.html$/.test(path);
    var isArcadia = /\/index\.html$|\/$/.test(path) && !/\/uae\//.test(path) && !isSalesPlan;
    var isUAE = /\/uae\.html$/.test(path);
    // Active tab detection (from ?tab= or #tab=)
    var src = (location.hash || '').replace(/^#/, '') || (location.search || '').replace(/^\?/, '');
    var curTab = '';
    try { curTab = new URLSearchParams(src).get('tab') || ''; } catch (e) {}
    if (isSalesPlan && !curTab) curTab = 'summary';
    function active(cond) { return cond ? ' dr-active' : ''; }
    function tabActive(name) { return active(isSalesPlan && curTab === name); }
    var drawer = document.createElement('div');
    drawer.id = 'site-drawer';
    drawer.innerHTML = '' +
      '<div class="drawer-scrim"></div>' +
      '<aside class="drawer-panel">' +
      '  <span class="dr-rail"></span>' +
      '  <button class="drawer-close" aria-label="Close">×</button>' +
      '  <nav class="drawer-nav">' +
      '    <div class="dr-section" style="--i:0">' +
      '      <div class="dr-head-row">' +
      '        <a href="' + root + 'india.html" class="dr-head' + active(isIndia) + '">India</a>' +
      '      </div>' +
      '      <div class="dr-sub">' +
      '        <a class="dr-sub-head-big" href="' + root + 'index.html?tab=overview">Operational Plan</a>' +
      '      </div>' +
      '      <div class="dr-sub">' +
      '        <a class="dr-sub-head-big" href="' + root + 'index.html">Commercial</a>' +
      '        <ul>' +
      '          <li><a class="dr-item' + active(isArcadia) + '" href="' + root + 'index.html"><span class="dr-ic">' + icons.map + '</span><span class="dr-label">Arcadia</span></a></li>' +
      '        </ul>' +
      '      </div>' +
      '    </div>' +
      '    <div class="dr-section" style="--i:1">' +
      '      <div class="dr-head-row">' +
      '        <a href="' + root + 'uae.html" class="dr-head' + active(isUAE) + '">UAE</a>' +
      '      </div>' +
      '      <ul>' +
      '        <li class="dr-sub">' +
      '          <a href="' + root + 'uae/finance/2025-year-end/index.html" class="dr-sub-head-big">Finance</a>' +
      '          <ul>' +
      '            <li><a class="dr-item' + active(isYearEnd) + '" href="' + root + 'uae/finance/2025-year-end/index.html"><span class="dr-ic">' + icons.cal + '</span><span class="dr-label">Year-End 2025</span></a></li>' +
      '          </ul>' +
      '        </li>' +
      '      </ul>' +
      '    </div>' +
      '  </nav>' +
      '  <div class="dr-foot"></div>' +
      '</aside>';
    document.body.appendChild(drawer);
    drawer.querySelector('.drawer-scrim').addEventListener('click', closeDrawer);
    drawer.querySelector('.drawer-close').addEventListener('click', closeDrawer);

    // Inject a logout button at the bottom-right of the drawer footer
    var foot = drawer.querySelector('.dr-foot');
    if (foot) {
      var drLogout = document.createElement('button');
      drLogout.className = 'site-logout dr-logout';
      drLogout.title = 'Log out';
      drLogout.setAttribute('aria-label', 'Log out');
      drLogout.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Log out</span>';
      drLogout.addEventListener('click', function() {
        closeDrawer();
        setTimeout(showLogoutConfirm, 220);
      });
      foot.appendChild(drLogout);
    }
  }
  function openDrawer() {
    buildDrawer();
    requestAnimationFrame(function() {
      document.getElementById('site-drawer').classList.add('open');
    });
  }
  function closeDrawer() {
    var d = document.getElementById('site-drawer');
    if (d) d.classList.remove('open');
  }
  document.addEventListener('click', function(e) {
    if (e.target.closest('.hamburger')) {
      e.preventDefault();
      openDrawer();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDrawer();
  });

  // ---------- Site-wide theme (dark/light) ----------
  var THEME_KEY = 'sobha_theme';
  function getTheme() {
    try { return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; } catch(e) { return 'light'; }
  }
  function applyTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    try { localStorage.setItem(THEME_KEY, mode); } catch(e) {}
    // Swap logos that have data-logo-swap attribute (legacy <img> tags only;
    // inline-SVG logos pick up theme via currentColor automatically).
    var logos = document.querySelectorAll('img[data-logo-swap]');
    logos.forEach(function(img) {
      img.src = mode === 'dark' ? 'assets/sobha-logo-white.png' : 'assets/sobha-logo-navy.png';
    });
    // Update theme-toggle icon
    document.querySelectorAll('.theme-toggle').forEach(function(b) {
      b.innerHTML = mode === 'dark' ? sunIcon() : moonIcon();
      b.title = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }
  function sunIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  }
  function moonIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  // Apply ASAP so paint matches
  applyTheme(getTheme());

  // ---------- Site-wide nav actions (theme + logout) ----------
  function showLogoutConfirm() {
    if (document.getElementById('site-logout-modal')) return;
    var modal = document.createElement('div');
    modal.id = 'site-logout-modal';
    modal.innerHTML = '' +
      '<div class="lm-backdrop"></div>' +
      '<div class="lm-card" role="dialog" aria-modal="true" aria-labelledby="lm-title">' +
      '  <div class="lm-rule"></div>' +
      '  <div class="lm-kicker">\n</div>' +
      '  <h2 class="lm-title" id="lm-title">Log out of <em>Group MIS</em> ?</h2>' +
      '  <p class="lm-body">\n</p>' +
      '  <div class="lm-actions">' +
      '    <button type="button" class="lm-btn lm-btn-ghost" data-action="cancel">No</button>' +
      '    <button type="button" class="lm-btn lm-btn-primary" data-action="confirm" autofocus>Yes</button>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(modal);
    requestAnimationFrame(function() { modal.classList.add('show'); });

    function close() {
      modal.classList.remove('show');
      setTimeout(function() { modal.remove(); document.removeEventListener('keydown', onKey); }, 220);
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter') doLogout();
    }
    function doLogout() {
      try { localStorage.removeItem('sobha_site_auth'); } catch(e) {}
      location.reload();
    }
    modal.querySelector('[data-action="cancel"]').addEventListener('click', close);
    modal.querySelector('[data-action="confirm"]').addEventListener('click', doLogout);
    modal.querySelector('.lm-backdrop').addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    setTimeout(function() {
      var btn = modal.querySelector('[data-action="confirm"]');
      if (btn) btn.focus();
    }, 30);
  }

  function injectNavActions() {
    var nav = document.querySelector('.site-nav, .topbar');
    if (!nav) return;
    if (nav.querySelector('.nav-actions-injected')) return;
    var ham = nav.querySelector('.hamburger');

    var wrap = document.createElement('div');
    wrap.className = 'nav-actions nav-actions-injected';

    // Log out moved into drawer footer; topbar only holds hamburger now.

    // Ensure a hamburger exists (dashboard's React topbar doesn't include one)
    if (!ham) {
      ham = document.createElement('button');
      ham.className = 'hamburger';
      ham.setAttribute('aria-label', 'Open menu');
      ham.innerHTML = '<span></span><span></span><span></span>';
      wrap.appendChild(ham);
      nav.appendChild(wrap);
    } else if (ham.parentNode === nav) {
      nav.insertBefore(wrap, ham);
    } else {
      nav.appendChild(wrap);
    }
    applyTheme(getTheme()); // sets icon
  }
  function onScroll() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Reveal on scroll ----------
  function setupReveal() {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
  }

  // ---------- Back-to-top button ----------
  function injectBackToTop() {
    if (document.getElementById('site-to-top')) return;
    var btn = document.createElement('button');
    btn.id = 'site-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V3M3 7l4-4 4 4"/></svg>';
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);
  }
  var __toTopHideTimer = null;
  function onScrollToTop() {
    var btn = document.getElementById('site-to-top');
    if (!btn) return;
    var show = window.scrollY > 400;
    // Hide when footer is approaching viewport
    var footer = document.querySelector('.site-footer, footer');
    if (show && footer) {
      var rect = footer.getBoundingClientRect();
      if (rect.top < window.innerHeight - 20) show = false;
    }
    if (show) {
      if (__toTopHideTimer) { clearTimeout(__toTopHideTimer); __toTopHideTimer = null; }
      btn.classList.add('visible');
    } else if (btn.classList.contains('visible')) {
      if (__toTopHideTimer) clearTimeout(__toTopHideTimer);
      __toTopHideTimer = setTimeout(function() {
        btn.classList.remove('visible');
        __toTopHideTimer = null;
      }, 2000);
    }
  }
  window.addEventListener('scroll', onScrollToTop, { passive: true });

  // ---------- Init ----------
  // Force every page to load at the top (disable browser scroll restoration)
  if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
  window.scrollTo(0, 0);

  // ---------- PWA: register service worker ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      var manifest = document.querySelector('link[rel="manifest"]');
      var base = manifest ? manifest.getAttribute('href').replace(/manifest\.json$/, '') : './';
      var swUrl = base + 'service-worker.js';
      var scope = base;
      navigator.serviceWorker.register(swUrl, { scope: scope }).catch(function(){});
    });
  }
  // ---------- Site search: removed (was ~6 KB, never used in production) ----------

  document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    onScroll();
    setupReveal();
    injectNavActions();
    injectBackToTop();
    onScrollToTop();
  });
  window.addEventListener('load', function() { window.scrollTo(0, 0); });
  // Also re-inject after dashboard renders its own topbar
  window.addEventListener('load', function() { setTimeout(injectNavActions, 200); });
  // And observe DOM for late-rendered topbars (React)
  var mo = new MutationObserver(function() { injectNavActions(); });
  document.addEventListener('DOMContentLoaded', function() {
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();
