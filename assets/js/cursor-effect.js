/* ==========================================================================
   AMRIT RAJ PORTFOLIO — CUSTOM CURSOR (dot + eased trailing ring)
   Pointer (mouse/trackpad) devices only — untouched on touch devices.
   ========================================================================== */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: mouse.x, y: mouse.y };
  let clickScale = 1;

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(${clickScale})`;
  });

  document.addEventListener('mousedown', () => { clickScale = 0.6; });
  document.addEventListener('mouseup', () => { clickScale = 1; });

  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

  const hoverSelector = 'a, button, .card-tilt, .nav-link, .btn, .project-tag, .tag-chip, input, .chatbot-widget-btn, .carousel-ring, .cert-badge';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.remove('is-hovering');
  });

  function loop() {
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${clickScale})`;
    requestAnimationFrame(loop);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loop();
  } else {
    dot.style.transition = 'none';
    ring.style.transition = 'none';
  }
})();
