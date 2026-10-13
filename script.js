document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-number]');

  const formatValue = (value, prefix = '', suffix = '') => {
    if (Number.isInteger(value)) {
      return `${prefix}${value.toLocaleString('en-IN')}${suffix}`;
    }
    return `${prefix}${value.toLocaleString('en-IN', { maximumFractionDigits: 1 })}${suffix}`;
  };

  const animateCounter = (el) => {
    const target = Number(el.dataset.number);
    const prefix = el.getAttribute('prefix') || '';
    const suffix = el.getAttribute('suffix') || '';
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      el.textContent = formatValue(current, prefix, suffix);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatValue(target, prefix, suffix);
      }
    };

    requestAnimationFrame(tick);
  };

  counters.forEach((counter) => animateCounter(counter));
});
