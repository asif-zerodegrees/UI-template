/** Client-side form helpers for demo / starter contact flows */

function setFieldError(field, message) {
  const wrap = field.closest('.ui-field');
  if (!wrap) return;

  field.setAttribute('aria-invalid', message ? 'true' : 'false');

  let errorEl = wrap.querySelector('.ui-field__error');
  if (message) {
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'ui-field__error';
      wrap.appendChild(errorEl);
    }
    const id = field.id || field.name;
    if (id) errorEl.id = `${id}-msg`;
    errorEl.textContent = message;
    field.setAttribute('aria-describedby', errorEl.id);
  } else if (errorEl) {
    errorEl.remove();
    field.removeAttribute('aria-describedby');
  }
}

function validateContactForm(form) {
  let valid = true;
  const name = form.querySelector('[name="name"]');
  const email = form.querySelector('[name="email"]');
  const brief = form.querySelector('[name="brief"]');

  if (name) {
    const ok = name.value.trim().length >= 2;
    setFieldError(name, ok ? '' : 'Enter your name.');
    valid = valid && ok;
  }

  if (email) {
    const value = email.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setFieldError(email, ok ? '' : 'Enter a valid email address.');
    valid = valid && ok;
  }

  if (brief) {
    const ok = brief.value.trim().length >= 10;
    setFieldError(brief, ok ? '' : 'Add a short brief (at least 10 characters).');
    valid = valid && ok;
  }

  return valid;
}

function setSubmitState(form, loading) {
  const btn = form.querySelector('[type="submit"]');
  if (!btn) return;

  btn.disabled = loading;
  btn.setAttribute('aria-busy', loading ? 'true' : 'false');
  btn.dataset.defaultLabel = btn.dataset.defaultLabel || btn.textContent.trim();
  btn.textContent = loading ? 'Sending…' : btn.dataset.defaultLabel;
}

function showFormStatus(form, type, message) {
  let status = form.querySelector('.ui-form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'ui-form-status ui-small mt-4';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
  }

  status.classList.remove('text-signal', 'text-paper/80', 'text-red-300');
  status.classList.add(type === 'success' ? 'text-signal' : 'text-red-300');
  status.textContent = message;
}

export function initContactForms() {
  document.querySelectorAll('.js-contact-form').forEach((form) => {
    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateContactForm(form)) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        firstInvalid?.focus();
        showFormStatus(form, 'error', 'Please fix the highlighted fields.');
        return;
      }

      setSubmitState(form, true);
      showFormStatus(form, 'success', '');

      // Demo-only: replace with fetch() to your API / Formspree / etc.
      await new Promise((resolve) => setTimeout(resolve, 900));

      setSubmitState(form, false);
      showFormStatus(
        form,
        'success',
        'Thanks — your brief was received. We reply within two business days.'
      );
      form.reset();
    });

    form.querySelectorAll('.ui-field__control').forEach((field) => {
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateContactForm(form);
        }
      });
    });
  });
}
