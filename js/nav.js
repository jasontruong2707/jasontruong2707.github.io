/* Collapse open nav groups in the pinned mobile bar once the reader scrolls
   on, so the bar shrinks back to a couple of rows while reading.

   Guards that keep it from fighting the reader:
     - a grace period started on the click itself. The <details> "toggle"
       event fires asynchronously, so starting the timer there loses a race
       against the scroll event caused by the bar growing, and the menu
       closes before it can be used.
     - lastY is resynced on the next frame, after the bar has changed height
     - a distance threshold, so touch jitter and momentum wobble are ignored

   Desktop is untouched: there the sidebar is a full-height column with room
   for an open group. Without this file the groups simply stay open. */
(function () {
  var mobile = window.matchMedia('(max-width: 820px)');
  var GRACE_MS = 1200;     /* how long an opened group is protected */
  var THRESHOLD = 40;      /* how far the page must move before closing */

  var openedAt = 0;
  var lastY = window.scrollY;

  /* Synchronous, and fires before the browser toggles the group open */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest || !t.closest('.sidebar summary')) return;

    openedAt = Date.now();
    lastY = window.scrollY;

    /* The bar changes height as the group opens, which can move the page
       under us. Take the new position as the baseline. */
    requestAnimationFrame(function () {
      lastY = window.scrollY;
      requestAnimationFrame(function () { lastY = window.scrollY; });
    });
  }, true);

  window.addEventListener('scroll', function () {
    if (!mobile.matches) return;
    if (Date.now() - openedAt < GRACE_MS) return;
    if (Math.abs(window.scrollY - lastY) < THRESHOLD) return;

    lastY = window.scrollY;
    var open = document.querySelectorAll('.sidebar details[open]');
    for (var i = 0; i < open.length; i++) open[i].open = false;
  }, { passive: true });
})();
