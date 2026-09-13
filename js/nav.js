/* Mobile top bar behaviour.

   The bar carries the site name, the whole nav and the contact row, which is
   a lot of screen on a phone for information the reader has already seen. So:

     - scrolling down slides it out of the way, and closes any open nav group
     - scrolling up brings it straight back, at any point in the page
     - it is shown at the very top of the page

   It is deliberately NOT forced visible at the bottom. There is no "scroll
   down" gesture left down there, so a bar pinned open would cover the text
   with no way to dismiss it.

   Desktop is untouched: there the sidebar is a full-height fixed column.
   Without this file the bar simply stays put, which is the CSS default. */
(function () {
  var bar = document.querySelector('.sidebar');
  if (!bar) return;

  var mobile = window.matchMedia('(max-width: 820px)');
  var GRACE_MS = 1200;   /* bar is left alone this long after being used */
  var SLIDE_MS = 300;    /* must outlast the CSS transform transition */
  var DELTA = 6;         /* ignore movement smaller than this */
  var EDGE = 8;          /* how close to the top counts as the top */

  var lastY = window.scrollY;
  var heldUntil = 0;
  var hidden = false;
  var collapseTimer = null;

  /* The bar is fixed on mobile, so it reserves no space of its own. Measure
     it with every group closed and hand that height to the CSS, which pads
     the content column by it. Measured closed so that opening a group
     overlays the text rather than pushing it. */
  function measureBar() {
    if (!mobile.matches) {
      document.documentElement.style.removeProperty('--bar-h');
      return;
    }
    var open = bar.querySelectorAll('details[open]');
    for (var i = 0; i < open.length; i++) open[i].open = false;
    document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
  }

  function collapseGroups() {
    var open = bar.querySelectorAll('details[open]');
    for (var i = 0; i < open.length; i++) open[i].open = false;
  }

  function show() {
    clearTimeout(collapseTimer);
    if (!hidden) return;
    hidden = false;
    bar.classList.remove('nav-hidden');
  }

  function hide() {
    if (hidden) return;
    hidden = true;
    bar.classList.add('nav-hidden');

    /* Collapse the groups only once the bar has finished sliding away.
       Doing it immediately makes the bar visibly shrink first and then
       slide, which reads as two separate movements. */
    clearTimeout(collapseTimer);
    collapseTimer = setTimeout(function () {
      if (hidden) collapseGroups();
    }, SLIDE_MS);
  }

  /* Resync the baseline across the next two frames, after the bar has
     finished changing height or position under us. */
  function resync() {
    lastY = window.scrollY;
    requestAnimationFrame(function () {
      lastY = window.scrollY;
      requestAnimationFrame(function () { lastY = window.scrollY; });
    });
  }

  /* Synchronous, and fires before the browser acts on the click. The
     <details> "toggle" event is async and loses the race against the
     scroll event caused by the bar changing height. */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    /* Opening a nav group */
    if (t.closest('.sidebar summary')) {
      heldUntil = Date.now() + GRACE_MS;
      resync();
      return;
    }

    /* A same-page anchor, such as Publications -> Manuscripts. Handled by
       hand: the browser's own jump animates while the bar is still changing
       height, which makes the page travel up, down and up again, and the
       fixed scroll-margin cannot match a bar whose height depends on
       whether a group is open. Measuring the bar and jumping instantly
       puts the heading directly under it, every time. */
    var link = t.closest('.sidebar a[href*="#"]');
    if (link && link.hash) {
      show();
      heldUntil = Date.now() + GRACE_MS;

      var samePage = link.pathname === location.pathname;
      var target = samePage && document.getElementById(link.hash.slice(1));

      if (target) {
        e.preventDefault();
        history.pushState(null, '', link.hash);
        requestAnimationFrame(function () { jumpTo(target); });
      }
    }
  }, true);

  /* Put the target just below the bar, at whatever height the bar is now.
     Note: behavior 'auto' does NOT mean instant, it means "use the CSS
     scroll-behavior", which is smooth here. It must be 'instant', and the
     root override is belt and braces for browsers that ignore that. */
  function jumpTo(target) {
    var top = target.getBoundingClientRect().top + window.scrollY;
    if (mobile.matches) top -= bar.offsetHeight + 8;

    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    root.style.scrollBehavior = prev;

    resync();
  }

  /* Same correction when a page is opened straight at an anchor, where the
     browser has already jumped using the CSS scroll-margin fallback. */
  measureBar();
  window.addEventListener('resize', measureBar);
  window.addEventListener('orientationchange', measureBar);

  function correctArrival() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(function () { jumpTo(target); });
  }
  document.addEventListener('DOMContentLoaded', correctArrival);
  window.addEventListener('load', correctArrival);

  window.addEventListener('scroll', function () {
    if (!mobile.matches) { show(); return; }

    var y = window.scrollY;

    if (y <= EDGE) { show(); lastY = y; return; }
    if (Date.now() < heldUntil) { lastY = y; return; }

    if (y > lastY + DELTA && y > bar.offsetHeight) hide();
    else if (y < lastY - DELTA) show();

    lastY = y;
  }, { passive: true });
})();
