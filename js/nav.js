/* Mobile top bar behaviour.

   The bar has two tiers: the nav, and the identity block (site name and the
   contact row). The identity block costs a lot of screen on a phone and a
   reader has usually seen it already, so it is rationed by three states:

     FULL     name + nav + contact. At the top of the page, or after a fast
              flick upward, which reads as "get me out of here".
     COMPACT  nav only. A gentle scroll back up, where the reader most
              likely just wants to reach another section.
     HIDDEN   nothing. Scrolling down, reading on.

   The bar is position: fixed on mobile, so none of these height changes
   move the page. It reserves its space through the --bar-h variable.

   It is deliberately NOT forced visible at the bottom of the page. There is
   no "scroll down" gesture left down there, so a bar pinned open would
   cover the text with no way to dismiss it.

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
  var FAST = 3.5;        /* px per ms that counts as a flick, not a nudge */
  var LEAP = 60;         /* and it must cover this much ground in one go */

  var lastY = window.scrollY;
  var lastT = Date.now();
  var heldUntil = 0;
  var state = 'full';
  var collapseTimer = null;

  function collapseGroups() {
    var open = bar.querySelectorAll('details[open]');
    for (var i = 0; i < open.length; i++) open[i].open = false;
  }

  function setState(next) {
    if (next === state) return;
    state = next;

    bar.classList.toggle('nav-hidden', next === 'hidden');
    bar.classList.toggle('nav-compact', next === 'compact');

    clearTimeout(collapseTimer);
    if (next === 'hidden') {
      /* Collapse the groups only once the bar has finished sliding away.
         Doing it immediately makes the bar visibly shrink first and then
         slide, which reads as two separate movements. */
      collapseTimer = setTimeout(function () {
        if (state === 'hidden') collapseGroups();
      }, SLIDE_MS);
    }
  }

  /* The bar is fixed on mobile, so it reserves no space of its own. Measure
     it at its tallest resting height, meaning the identity block showing and
     every group closed, and hand that to the CSS to pad the content column.
     Measured with groups closed so that opening one overlays the text
     rather than pushing it down. */
  function measureBar() {
    if (!mobile.matches) {
      document.documentElement.style.removeProperty('--bar-h');
      return;
    }
    var wasCompact = bar.classList.contains('nav-compact');
    bar.classList.remove('nav-compact');
    collapseGroups();
    document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
    if (wasCompact) bar.classList.add('nav-compact');
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
       height, and a fixed scroll-margin cannot match a bar whose height
       depends on which tier is showing. */
    var link = t.closest('.sidebar a[href*="#"]');
    if (link && link.hash) {
      heldUntil = Date.now() + GRACE_MS;
      if (state === 'hidden') setState('compact');

      if (link.pathname === location.pathname) {
        var target = document.getElementById(link.hash.slice(1));
        if (target) {
          e.preventDefault();
          history.pushState(null, '', link.hash);
          requestAnimationFrame(function () { jumpTo(target); });
        }
      }
    }
  }, true);

  measureBar();
  window.addEventListener('resize', measureBar);
  window.addEventListener('orientationchange', measureBar);

  /* Same correction when a page is opened straight at an anchor, where the
     browser has already jumped using the CSS scroll-margin fallback. */
  function correctArrival() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(function () { jumpTo(target); });
  }
  document.addEventListener('DOMContentLoaded', correctArrival);
  window.addEventListener('load', correctArrival);

  window.addEventListener('scroll', function () {
    if (!mobile.matches) { setState('full'); return; }

    var y = window.scrollY;
    var now = Date.now();
    var dy = y - lastY;
    var speed = Math.abs(dy) / Math.max(1, now - lastT);
    lastT = now;

    if (y <= EDGE) { setState('full'); lastY = y; return; }
    if (now < heldUntil) { lastY = y; return; }

    if (dy > DELTA) {
      /* Hide as soon as the reader moves down. The earlier `y > bar height`
         guard meant scrolling roughly a bar's worth before anything
         happened, which felt sluggish. The `y <= EDGE` check above already
         keeps it visible at the very top. */
      setState('hidden');
    } else if (dy < -DELTA) {
      /* Both tests must pass: a genuine flick is fast AND covers real
         distance. Speed alone fires far too easily, because a mouse wheel
         or a trackpad delivers a burst of pixels in a few milliseconds. */
      var flick = speed > FAST && -dy > LEAP;
      setState(flick ? 'full' : 'compact');
    }

    lastY = y;
  }, { passive: true });
})();
