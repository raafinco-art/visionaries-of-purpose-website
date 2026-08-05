/**
 * Shared accessible form validation and submission state.
 *
 * Client validation is an assist only. The Edge Function revalidates every
 * field and remains authoritative. Values are never cleared on a recoverable
 * error, and no field content is written to the console or analytics.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Marks a control invalid and shows its message next to the field. */
export function setFieldError(control, message) {
  const describedBy = (control.getAttribute('aria-describedby') ?? '').split(/\s+/);
  const errorNode = describedBy
    .map((id) => document.getElementById(id))
    .find((node) => node?.classList.contains('field-error'));

  if (message) {
    control.setAttribute('aria-invalid', 'true');
    if (errorNode) {
      errorNode.textContent = message;
      errorNode.hidden = false;
    }
  } else {
    control.removeAttribute('aria-invalid');
    if (errorNode) {
      errorNode.textContent = '';
      errorNode.hidden = true;
    }
  }
  return errorNode;
}

/** Returns a message for one control, or an empty string when valid. */
export function validateControl(control) {
  const label = control.dataset.label ?? 'This field';
  const value = control.type === 'checkbox' ? control.checked : control.value.trim();

  if (control.required) {
    if (control.type === 'checkbox' && !value) {
      return control.dataset.errorRequired ?? 'Please confirm this to continue.';
    }
    if (control.type !== 'checkbox' && !value) {
      return control.dataset.errorRequired ?? `${label} is required.`;
    }
  }

  if (control.type === 'email' && value && !EMAIL_PATTERN.test(value)) {
    return control.dataset.errorInvalid ?? 'Enter a valid email address.';
  }

  if (control.maxLength > 0 && typeof value === 'string' && value.length > control.maxLength) {
    return `${label} must be ${control.maxLength} characters or fewer.`;
  }

  return '';
}

/** Validates every named control in a form. Returns the first invalid one. */
export function validateForm(form) {
  let firstInvalid = null;

  for (const control of form.elements) {
    if (!control.name || control.type === 'submit' || control.closest('.form-trap')) continue;
    const message = validateControl(control);
    setFieldError(control, message);
    if (message && !firstInvalid) firstInvalid = control;
  }

  return firstInvalid;
}

/** Validate on blur, but only once the visitor has interacted with a field. */
export function wireLiveValidation(form) {
  for (const control of form.elements) {
    if (!control.name || control.type === 'submit' || control.closest('.form-trap')) continue;

    control.addEventListener('blur', () => {
      if (control.dataset.touched !== 'true') return;
      setFieldError(control, validateControl(control));
    });

    const markTouched = () => {
      control.dataset.touched = 'true';
    };
    control.addEventListener('input', () => {
      markTouched();
      // Clearing an error as soon as it is fixed avoids a stale message.
      if (control.getAttribute('aria-invalid') === 'true') {
        setFieldError(control, validateControl(control));
      }
    });
    control.addEventListener('change', markTouched);
  }
}

/** Moves focus to the first invalid control without a jarring jump. */
export function focusFirstInvalid(control) {
  if (!control) return;
  control.focus({ preventScroll: true });
  control.scrollIntoView({ block: 'center', behavior: 'auto' });
}

/** Manages the submit button label and prevents duplicate submissions. */
export function createSubmitState(form, busyLabel) {
  const button = form.querySelector('[type="submit"]');
  const idleLabel = button?.textContent ?? '';
  let busy = false;

  return {
    get busy() {
      return busy;
    },
    start() {
      busy = true;
      if (button) {
        button.disabled = true;
        button.textContent = busyLabel;
      }
    },
    stop() {
      busy = false;
      if (button) {
        button.disabled = false;
        button.textContent = idleLabel;
      }
    },
  };
}

/** Writes an accessible status message. */
export function setStatus(node, message, state) {
  if (!node) return;
  node.textContent = message;
  if (state) node.dataset.state = state;
  else delete node.dataset.state;
}

/**
 * Reads a query parameter only when its value appears in the allowlist.
 * Anything else is discarded rather than reflected back into the page.
 */
export function safeParam(name, allowlist) {
  const value = new URLSearchParams(location.search).get(name);
  if (!value) return null;
  return allowlist.includes(value) ? value : null;
}

/** Cloudflare Turnstile helpers. Absent until the owner supplies a site key. */
export function currentTurnstileToken(form) {
  return form.querySelector('input[name="cf-turnstile-response"]')?.value ?? '';
}

export function resetTurnstile(form) {
  const widget = form.querySelector('[data-turnstile-slot] .cf-turnstile');
  const id = widget?.dataset.widgetId;
  if (window.turnstile && id) window.turnstile.reset(id);
}
