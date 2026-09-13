/* Mobile top bar, scroll-linked.

   The bar tracks the scroll position directly rather than playing a fixed
   animation: move the page 40px and the bar moves 40px, in step with the
   finger, the way Chrome's address bar behaves. When scrolling stops it
   settles to whichever end it is nearer.

   It has two tiers. The nav is the tier that comes back on an ordinary
   scroll up. The identity block (site name and contact row) costs a lot of
   phone screen for something already seen, so it returns only at the top of
   the page or after a deliberate flick upward.

   Every height change is made with transitions frozen, and only while the
   bar is offscreen or already parked, so a collapse or an unfold is never
   seen racing the translation.

   Desktop is untouched: there the sidebar is a full-height fixed column.
   Without this file the bar simply stays put, which is the CSS default. */
(function () {
  var bar = document.querySelector('.sidebar');
  if (!bar) return;

  var mobile = window.matchMedia('(max-width: 820px)');
  var GRACE_MS = 1200;   /* bar is left alone this long after being used */
  var SETTLE_MS = 130;   /* quiet time that counts as "stopped scrolling" */
  var UNFOLD_MS = 220;   /* wait before unfolding, so it follows the slide */
  var EDGE = 8;          /* how close to the top counts as the top */
  var WINDOW_MS = 140;   /* velocity is measured over this window */
  var FAST = 3.5;        /* px per ms that counts as a flick, not a nudge */
  var LEAP = 60;         /* and it must cover this much ground in one go */

  var clock = (window.performance && performance.now)
    ? function () { return performance.now(); }
    : function () { return Date.now(); };

  var lastY = window.scrollY;
  var hist = [{ t: clock(), y: lastY }];
  var heldUntil = 0;

  var offset = 0;        /* px the bar is pushed up, 0 = fully visible */
  var range = 0;         /* how far it can be pushed, ie its height */
  var compact = false;   /* identity tier collapsed */
  var settleTimer = null;
  var unfoldTimer = null;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  /* Apply a change with every transition suspended, so it lands in one
     frame rather than animating. */
  function freeze(fn) {
    bar.classList.add('no-anim');
    fn();
    bar.offsetHeight;              /* flush, so the change takes effect */
    bar.classList.remove('no-anim');
  }

  function collapseGroups() {
    var open = bar.querySelectorAll('details[open]');
    for (var i = 0; i < open.length; i++) open[i].open = false;
  }

  function draw(animate) {
    bar.classList.toggle('settling', !!animate);
    bar.style.transform = offset ? 'translateY(' + -offset + 'px)' : '';
  }

  function setCompact(next) {
    if (next === compact) return;
    compact = next;
    bar.classList.toggle('nav-compact', next);
    range = bar.offsetHeight;      /* height just changed, so re-measure */
  }

  /* Measure the bar at its tallest resting height, identity tier showing and
     groups closed, and publish it for the CSS to pad the content column by.
     The bar is fixed, so it reserves no space of its own. */
  function measureBar() {
    if (!mobile.matches) {
      document.documentElement.style.removeProperty('--bar-h');
      bar.style.transform = '';
      return;
    }
    freeze(function () {
      var wasCompact = compact;
      bar.classList.remove('nav-compact');
      collapseGroups();
      document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
      bar.classList.toggle('nav-compact', wasCompact);
      range = bar.offsetHeight;
    });
  }

  /* Settle to whichever end is nearer, once the reader has stopped */
  function settle() {
    if (!mobile.matches) return;

    if (offset > 0 && offset < range) {
      offset = offset > range / 2 ? range : 0;
      draw(true);
    }

    /* Fully hidden: collapse out of sight and re-arm at the smaller height,
       so the next reveal brings back the nav alone. */
    if (offset >= range && !compact) {
      freeze(function () {
        compact = true;
        bar.classList.add('nav-compact');
        collapseGroups();
        range = bar.offsetHeight;
        offset = range;
        draw(false);
      });
    }
  }

  function scheduleSettle() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, SETTLE_MS);
  }

  /* Bring the bar fully back, and unfold the identity tier after it lands */
  function reveal(full) {
    offset = 0;
    draw(true);
    clearTimeout(unfoldTimer);
    if (!full) return;
    unfoldTimer = setTimeout(function () {
      if (offset === 0) setCompact(false);
    }, UNFOLD_MS);
  }

  function jumpTo(target) {
    var top = target.getBoundingClientRect().top + window.scrollY;
    if (mobile.matches) top -= bar.offsetHeight + 8;

    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    root.style.scrollBehavior = prev;

    lastY = window.scrollY;
  }

  /* Synchronous, and fires before the browser acts on the click. The
     <details> "toggle" event is async and loses the race. */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('.sidebar summary')) {
      heldUntil = Date.now() + GRACE_MS;
      lastY = window.scrollY;
      return;
    }

    var link = t.closest('.sidebar a[href*="#"]');
    if (link && link.hash) {
      heldUntil = Date.now() + GRACE_MS;
      reveal(false);

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

  function correctArrival() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(function () { jumpTo(target); });
  }
  document.addEventListener('DOMContentLoaded', correctArrival);
  window.addEventListener('load', correctArrival);

  window.addEventListener('scroll', function () {
    if (!mobile.matches) { bar.style.transform = ''; return; }

    var y = window.scrollY;
    var t = clock();
    var dy = y - lastY;

    /* Velocity across a short window, not a single event. Two events can
       land in the same millisecond, and dividing by that reads as a flick. */
    hist.push({ t: t, y: y });
    while (hist.length > 1 && t - hist[0].t > WINDOW_MS) hist.shift();
    var span = Math.max(16, t - hist[0].t);
    var travel = y - hist[0].y;
    var speed = Math.abs(travel) / span;

    lastY = y;

    if (y <= EDGE) {
      clearTimeout(settleTimer);
      reveal(true);
      return;
    }

    if (Date.now() < heldUntil) return;

    if (!range) range = bar.offsetHeight;

    /* Deliberate flick up: bring the whole thing back at once */
    if (dy < 0 && speed > FAST && -travel > LEAP) {
      clearTimeout(settleTimer);
      reveal(true);
      return;
    }

    /* Otherwise the bar follows the scroll, one pixel for one pixel */
    offset = clamp(offset + dy, 0, range);
    draw(false);
    scheduleSettle();
  }, { passive: true });
})();
