(function () {
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function uid(prefix) {
    return `${prefix || 'zoltan'}-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
  }

  function setButtonBusy(button, busy, label) {
    if (!button) return;
    button.disabled = !!busy;
    if (label) button.textContent = label;
    button.setAttribute('aria-busy', busy ? 'true' : 'false');
  }

  window.ZoltanUtils = { escapeHtml, uid, setButtonBusy };
})();
