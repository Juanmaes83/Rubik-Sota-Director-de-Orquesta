(function () {
  const STORAGE_KEY = 'zoltan_saved_rewards';
  const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:', 'sms:'];
  const TYPES = ['product', 'outfit', 'coupon', 'drop_access', 'route', 'generic_cta'];

  function track(eventName, payload) {
    if (window.ZoltanAnalytics && window.ZoltanAnalytics.track) {
      window.ZoltanAnalytics.track(eventName, Object.assign({ module: 'zoltan-reward-layer' }, payload || {}));
    }
  }

  function safeUrl(href) {
    if (!href || href === '#') return '#';
    try {
      const url = new URL(href, location.href);
      return ALLOWED_PROTOCOLS.includes(url.protocol) ? url.href : '#';
    } catch (err) {
      return '#';
    }
  }

  function normalizeReward(reward) {
    const source = reward || {};
    const type = TYPES.includes(source.type) ? source.type : 'generic_cta';
    const normalized = {
      id: source.id || `reward_${Date.now()}`,
      type,
      title: source.title || 'Has desbloqueado tu recompensa',
      subtitle: source.subtitle || 'Tu señal apunta a una accion exclusiva.',
      description: source.description || 'Guarda este resultado o continua con el CTA de campaña.',
      code: source.code || '',
      value: source.value || '',
      image: source.image || null,
      accentColor: source.accentColor || '#e8d8a8',
      primaryAction: Object.assign({ label: 'Guardar recompensa', type: 'save', href: null }, source.primaryAction || {}),
      secondaryActions: Array.isArray(source.secondaryActions) ? source.secondaryActions.slice() : [],
      metadata: Object.assign({ timestamp: Date.now() }, source.metadata || {})
    };
    normalized.primaryAction.href = safeUrl(normalized.primaryAction.href);
    normalized.secondaryActions = normalized.secondaryActions.map((action) => Object.assign({}, action, { href: safeUrl(action.href) }));
    return normalized;
  }

  function createReward(item, options) {
    const opts = options || {};
    const type = opts.type || (item && item.rewardType) || 'generic_cta';
    const reward = normalizeReward({
      id: `reward_${Date.now()}_${item ? item.id : 'generic'}`,
      type,
      title: opts.title || (item ? `Has desbloqueado: ${item.name || item.title}` : 'Has desbloqueado tu señal'),
      subtitle: opts.subtitle || 'La marca ha convertido tu reveal en una accion.',
      description: opts.description || (item && item.subtitle) || 'Resultado listo para guardar, copiar o continuar.',
      code: opts.code || (type === 'coupon' ? 'ZOLTAN15' : type === 'drop_access' ? 'DROP-' + String(Date.now()).slice(-4) : ''),
      value: opts.value || (type === 'coupon' ? '15%' : ''),
      image: opts.image || (item && (item.image || item.asset)) || null,
      accentColor: opts.accentColor || (item && item.color) || '#e8d8a8',
      primaryAction: opts.primaryAction || { label: type === 'drop_access' ? 'Entrar al drop' : 'Guardar recompensa', type: 'save', href: null },
      secondaryActions: opts.secondaryActions || [
        { label: 'Copiar resultado', type: 'copy', value: item ? (item.name || item.title) : 'Resultado ZOLTAN' },
        { label: 'Abrir CTA', type: 'link', href: item && item.cta ? item.cta.href : '#' },
        { label: 'Enviar a mi movil', type: 'mobile_send', value: item ? (item.name || item.title) : 'Resultado ZOLTAN' },
        { label: 'Descargar recuerdo', type: 'download_png' }
      ],
      metadata: Object.assign({ selectedItemId: item ? item.id : null }, opts.metadata || {})
    });
    track('zoltan_reward_created', { type: reward.type, id: reward.id });
    return reward;
  }

  function saveRewardLocal(reward) {
    try {
      const current = getSavedRewards();
      current.push(normalizeReward(reward));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(-80)));
      track('zoltan_reward_saved', { id: reward.id });
      return { ok: true };
    } catch (err) {
      track('zoltan_reward_storage_failed', { message: err.message });
      return { ok: false, error: err.message };
    }
  }

  function getSavedRewards() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (err) {
      return [];
    }
  }

  async function copyToClipboard(value) {
    const text = String(value || '');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        track('zoltan_reward_copied', { length: text.length });
        return { ok: true, fallback: false };
      }
    } catch (err) {}
    track('zoltan_reward_copied', { fallback: true, length: text.length });
    return { ok: false, fallback: true, text };
  }

  function exportRewardPng(reward, options) {
    const normalized = normalizeReward(reward);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    const accent = normalized.accentColor;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#050505');
    grad.addColorStop(0.55, accent);
    grad.addColorStop(1, '#020202');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.62)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 10;
    ctx.strokeRect(60, 60, 1080, 1480);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '900 64px Inter, Arial';
    ctx.fillText('ZOLTAN REWARD', 600, 170);
    ctx.font = '900 54px Inter, Arial';
    wrap(ctx, normalized.title, 600, 430, 940, 64, 3);
    ctx.fillStyle = accent;
    ctx.font = '900 42px Inter, Arial';
    wrap(ctx, normalized.subtitle, 600, 660, 880, 52, 3);
    if (normalized.code) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(230, 850, 740, 140);
      ctx.fillStyle = '#050505';
      ctx.font = '900 54px Inter, Arial';
      ctx.fillText(normalized.code, 600, 938);
    }
    ctx.fillStyle = '#fff';
    ctx.font = '800 30px Inter, Arial';
    wrap(ctx, normalized.description, 600, 1130, 900, 42, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.64)';
    ctx.font = '800 24px Inter, Arial';
    ctx.fillText(new Date().toLocaleString(), 600, 1450);
    const link = document.createElement('a');
    link.download = (options && options.filename) || `zoltan-reward-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    track('zoltan_reward_exported', { id: normalized.id, type: normalized.type });
    return { ok: true };
  }

  function wrap(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = String(text || '').split(/\s+/);
    let line = '';
    let lineIndex = 0;
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        if (lineIndex < maxLines) ctx.fillText(line, x, y + lineIndex * lineHeight);
        line = word;
        lineIndex += 1;
      } else {
        line = test;
      }
    });
    if (line && lineIndex < maxLines) ctx.fillText(line, x, y + lineIndex * lineHeight);
  }

  function handleRewardAction(reward, action, context) {
    const normalized = normalizeReward(reward);
    const act = action || normalized.primaryAction;
    track('zoltan_reward_action_clicked', { id: normalized.id, type: act.type, label: act.label });
    if (act.type === 'save') return saveRewardLocal(normalized);
    if (act.type === 'copy') return copyToClipboard(act.value || normalized.code || normalized.title);
    if (act.type === 'download_png') return exportRewardPng(normalized);
    if (act.type === 'mobile_send') {
      const body = encodeURIComponent(act.value || normalized.title);
      location.href = `sms:?&body=${body}`;
      return { ok: true, mode: 'sms' };
    }
    if (act.type === 'link') {
      const url = safeUrl(act.href);
      if (url === '#') return { ok: false, error: 'Unsafe or empty link blocked.' };
      window.open(url, '_blank', 'noopener');
      track('zoltan_reward_link_opened', { href: url });
      return { ok: true };
    }
    return { ok: false, error: 'Unknown reward action.' };
  }

  function renderRewardActions(container, reward, options) {
    if (!container) return;
    const normalized = normalizeReward(reward);
    const actions = [normalized.primaryAction].concat(normalized.secondaryActions || []);
    container.innerHTML = actions.map((action, index) => `<button type="button" class="${index === 0 ? 'is-primary' : ''}" data-zoltan-action-index="${index}">${action.label || 'Accion'}</button>`).join('');
    container.querySelectorAll('[data-zoltan-action-index]').forEach((button) => {
      button.addEventListener('click', () => handleRewardAction(normalized, actions[Number(button.dataset.zoltanActionIndex)], options));
    });
  }

  function renderRewardCard(container, reward, options) {
    if (!container) return null;
    const normalized = normalizeReward(reward);
    container.style.setProperty('--accent', normalized.accentColor);
    container.classList.add('zoltan-reward-card');
    container.innerHTML = `
      <h3>${escapeHtml(normalized.title)}</h3>
      <p>${escapeHtml(normalized.subtitle)}</p>
      ${normalized.code ? `<div class="zoltan-reward-code">${escapeHtml(normalized.code)}</div>` : ''}
      <p>${escapeHtml(normalized.description)}</p>
      <div class="zoltan-reward-actions"></div>
      <div class="zoltan-reward-state">Sin backend · sin QR falso · acciones locales seguras</div>
    `;
    renderRewardActions(container.querySelector('.zoltan-reward-actions'), normalized, options);
    track('zoltan_reward_rendered', { id: normalized.id, type: normalized.type });
    return normalized;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  window.ZoltanRewardLayer = {
    createReward,
    normalizeReward,
    renderRewardCard,
    renderRewardActions,
    handleRewardAction,
    saveRewardLocal,
    getSavedRewards,
    exportRewardPng,
    safeUrl,
    copyToClipboard
  };
})();
