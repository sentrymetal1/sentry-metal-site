// Sentry Metal — main.js
// Mobile nav toggle + form helpers

(function () {
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      const expanded = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => document.body.classList.remove('nav-open'));
  });

  // RFQ form: fall back to mailto if no server handler is wired up.
  // Replace data-handler="mailto" with data-handler="formspree" + a real action
  // attribute once a form service is configured. See README.
  const form = document.querySelector('form.rfq-form');
  if (form && form.dataset.handler === 'mailto') {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const fields = [];
      for (const [k, v] of data.entries()) {
        if (v) fields.push(`${k.replace(/_/g, ' ')}: ${v}`);
      }
      const subject = encodeURIComponent(
        `Quote Request — ${data.get('company') || data.get('name') || 'Website'}`
      );
      const body = encodeURIComponent(fields.join('\n\n'));
      window.location.href = `mailto:info@sentrymetal.com?subject=${subject}&body=${body}`;
    });
  }
})();
