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

    // Background
    const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bg.addColorStop(0, '#080808');
    bg.addColorStop(0.6, accent);
    bg.addColorStop(1, '#020202');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.72)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Accent top bar
    ctx.fillStyle = accent;
    ctx.fillRect(60, 60, 1080, 8);

    // Border
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 1080, 1480);

    // Brand
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.font = '900 26px Inter, Arial';
    ctx.fillText('ZOLTAN', 100, 140);
    ctx.fillStyle = accent;
    ctx.font = '900 18px Inter, Arial';
    ctx.fillText('REWARD', 100, 170);

    // Type badge
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(820, 120, 280, 44);
    ctx.fillStyle = '#fff';
    ctx.font = '900 18px Inter, Arial';
    ctx.fillText(String(normalized.type).toUpperCase().replace(/_/g, ' '), 1080, 150);

    // Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.font = '900 58px Inter, Arial';
    wrap(ctx, normalized.title, 100, 340, 1000, 72, 3);

    // Subtitle
    ctx.fillStyle = accent;
    ctx.font = '900 36px Inter, Arial';
    wrap(ctx, normalized.subtitle, 100, 600, 1000, 50, 3);

    let lowerContentY = normalized.code ? 960 : 820;
    if (normalized.image) {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(100, 720, 1000, 360);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(100, 720, 1000, 360);
      if (!drawRewardImage(ctx, normalized.image, 100, 720, 1000, 360)) {
        ctx.fillStyle = accent;
        ctx.textAlign = 'center';
        ctx.font = '900 54px Inter, Arial';
        ctx.fillText((normalized.image.name || normalized.image.title || 'MEDIA').slice(0, 18), 600, 920);
      }
      lowerContentY = normalized.code ? 1220 : 1150;
    }

    // Code box
    if (normalized.code) {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(100, normalized.image ? 1110 : 760, 1000, 120);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(100, normalized.image ? 1110 : 760, 1000, 120);
      ctx.setLineDash([]);
      ctx.fillStyle = accent;
      ctx.textAlign = 'center';
      ctx.font = '900 48px Inter, Arial';
      ctx.fillText(normalized.code, 600, normalized.image ? 1190 : 840);
    }

    // Description
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.86)';
    ctx.font = '800 28px Inter, Arial';
    wrap(ctx, normalized.description, 100, lowerContentY, 1000, 42, normalized.image ? 3 : 4);

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '800 22px Inter, Arial';
    ctx.fillText('Acción local · sin backend · sin QR falso', 600, 1430);
    ctx.fillText(new Date().toLocaleString(), 600, 1480);

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

  function drawRewardImage(ctx, image, x, y, w, h) {
    const source = typeof image === 'string' ? null : image && image.el;
    if (!source) return false;
    const iw = source.videoWidth || source.naturalWidth || source.width || 1;
    const ih = source.videoHeight || source.naturalHeight || source.height || 1;
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    try {
      ctx.drawImage(source, sx, sy, sw, sh, x, y, w, h);
      return true;
    } catch (err) {
      return false;
    }
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

  function actionIcon(type) {
    const map = {
      save: '★',
      copy: '📋',
      link: '→',
      mobile_send: '✉',
      download_png: '⬇',
      default: '•'
    };
    return map[type] || map.default;
  }

  function renderRewardActions(container, reward, options) {
    if (!container) return;
    const normalized = normalizeReward(reward);
    const actions = [normalized.primaryAction].concat(normalized.secondaryActions || []);
    container.innerHTML = actions.map((action, index) => {
      const icon = actionIcon(action.type);
      return `<button type="button" class="${index === 0 ? 'is-primary' : ''}" data-zoltan-action-index="${index}"><span aria-hidden="true">${icon}</span> ${escapeHtml(action.label || 'Accion')}</button>`;
    }).join('');
    container.querySelectorAll('[data-zoltan-action-index]').forEach((button) => {
      button.addEventListener('click', () => handleRewardAction(normalized, actions[Number(button.dataset.zoltanActionIndex)], options));
    });
  }

  function renderRewardMedia(image) {
    if (!image) return '';
    if (typeof image === 'string') {
      return `<div class="zoltan-reward-media"><img src="${escapeHtml(image)}" alt="" /></div>`;
    }
    if (image.el) {
      const src = image.url || image.el.src || '';
      if (image.type === 'video') {
        return `<div class="zoltan-reward-media"><video src="${escapeHtml(src)}" muted autoplay loop playsinline></video></div>`;
      }
      return `<div class="zoltan-reward-media"><img src="${escapeHtml(src)}" alt="${escapeHtml(image.name || '')}" /></div>`;
    }
    const initial = (image.name || image.title || 'Z').trim().charAt(0).toUpperCase();
    return `<div class="zoltan-reward-media"><span class="zoltan-reward-media-initial">${escapeHtml(initial)}</span></div>`;
  }

  function renderRewardCard(container, reward, options) {
    if (!container) return null;
    const normalized = normalizeReward(reward);
    const context = options || {};
    const item = context.item || {};
    container.style.setProperty('--accent', normalized.accentColor);
    container.classList.add('zoltan-reward-card');
    container.innerHTML = `
      <h3>${escapeHtml(normalized.title)}</h3>
      <p>${escapeHtml(normalized.subtitle)}</p>
      ${renderRewardMedia(normalized.image)}
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
