/* Decorative motion can always be paused and respects the device preference. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const control = document.querySelector('#motion-toggle');
  const replay = document.querySelector('#replay-chart');
  const scene = document.querySelector('.economy-scene');
  let enabled = !preference.matches;
  let counterFrame = 0;
  function setMotion(value) {
    enabled = value && !preference.matches;
    document.body.classList.toggle('motion-paused', !enabled);
    if (control) {
      control.setAttribute('aria-checked', String(enabled));
      control.querySelector('.motion-label').textContent = preference.matches ? 'Gerakan minimal' : enabled ? 'Animasi aktif' : 'Animasi dijeda';
      control.disabled = preference.matches;
      control.title = preference.matches ? 'Mengikuti preferensi kurangi gerakan pada perangkatmu.' : 'Aktifkan atau jeda semua animasi dekoratif.';
    }
    if (replay) replay.disabled = !enabled;
    if (!enabled) {
      cancelAnimationFrame(counterFrame);
      const value = document.querySelector('#growth-count');
      if (value) value.textContent = '5';
      scene?.style.removeProperty('--scene-x');
      scene?.style.removeProperty('--scene-y');
      document.querySelectorAll('.is-pending').forEach(element => element.classList.remove('is-pending'));
    }
  }
  control?.addEventListener('click', () => setMotion(!enabled));
  preference.addEventListener('change', () => setMotion(!preference.matches));
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('motion-hidden', document.hidden));
  replay?.addEventListener('click', () => {
    if (!enabled || !scene) return;
    scene.classList.remove('scene-replay');
    void scene.offsetWidth;
    scene.classList.add('scene-replay');
    const counter = document.querySelector('#growth-count');
    const start = performance.now();
    cancelAnimationFrame(counterFrame);
    function count(now) {
      if (!enabled) return;
      const progress = Math.min(1, (now - start) / 1000);
      counter.textContent = String(Math.round(5 * (1 - (1 - progress) ** 3)));
      if (progress < 1) counterFrame = requestAnimationFrame(count);
    }
    counterFrame = requestAnimationFrame(count);
  });
  scene?.addEventListener('pointermove', event => {
    if (!enabled || event.pointerType !== 'mouse') return;
    const rect = scene.getBoundingClientRect();
    scene.style.setProperty('--scene-x', `${((event.clientX - rect.left) / rect.width - .5) * 10}px`);
    scene.style.setProperty('--scene-y', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
  });
  scene?.addEventListener('pointerleave', () => { scene.style.setProperty('--scene-x', '0px'); scene.style.setProperty('--scene-y', '0px'); });
  setMotion(enabled);
})();
