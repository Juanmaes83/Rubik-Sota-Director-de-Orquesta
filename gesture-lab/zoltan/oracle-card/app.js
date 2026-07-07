(function () {
  const STATES = {
    ATTRACT: 'attract',
    CONSENT: 'consent',
    SUMMON: 'summon',
    SELECT: 'select',
    CONFIRM: 'confirm',
    REVEAL: 'reveal',
    CTA: 'cta',
    RESET: 'reset'
  };

  const ORACLE_CONFIG = {
    experienceId: 'zoltan-oracle-card-v1',
    brandName: 'ZOLTAN',
    eyebrow: 'Gesture Lab · Motor de Asombro',
    title: 'El Oráculo de Carta',
    subtitle: 'Levanta la mano, elige una carta y desbloquea tu destino de marca.',
    privacyCopy: 'La cámara se usa solo para detectar gestos en este dispositivo. No se graba vídeo.',
    theme: { accent: '#e8d8a8', danger: '#ff4d6d', cyan: '#00ffcc', bg: '#030305' },
    cards: [
      { id: 'explorer', title: 'The Explorer', subtitle: 'Movimiento, deseo y descubrimiento.', productTitle: 'Producto recomendado', productName: 'Utility Storm Jacket', ctaLabel: 'Descubrir ahora', ctaUrl: '#', color: '#00ffcc', sigil: '✦' },
      { id: 'mirror', title: 'The Mirror', subtitle: 'Tu reflejo revela una nueva versión.', productTitle: 'Estilo desbloqueado', productName: 'Look Editorial Premium', ctaLabel: 'Ver colección', ctaUrl: '#', color: '#e8d8a8', sigil: '◈' },
      { id: 'spark', title: 'The Spark', subtitle: 'Una señal pequeña. Una decisión grande.', productTitle: 'Ventaja desbloqueada', productName: 'Cupón Conjurado', ctaLabel: 'Guardar ventaja', ctaUrl: '#', color: '#ff4d6d', sigil: '✹' },
      { id: 'horizon', title: 'The Horizon', subtitle: 'Un espacio se abre delante de ti.', productTitle: 'Destino ideal', productName: 'Ático con terraza y vistas', ctaLabel: 'Ver visita inmersiva', ctaUrl: '#', color: '#65a7ff', sigil: '☉' },
      { id: 'pulse', title: 'The Pulse', subtitle: 'Energía, ritmo y presencia de marca.', productTitle: 'Experiencia activada', productName: 'Backstage Pass', ctaLabel: 'Reclamar pase', ctaUrl: '#', color: '#7cff8a', sigil: '◇' },
      { id: 'veil', title: 'The Veil', subtitle: 'Lo oculto toma forma comercial.', productTitle: 'Historia revelada', productName: 'Colección cápsula', ctaLabel: 'Abrir historia', ctaUrl: '#', color: '#c7a6ff', sigil: '△' },
      { id: 'signal', title: 'The Signal', subtitle: 'Una llamada clara hacia la acción.', productTitle: 'CTA recomendado', productName: 'Reserva prioritaria', ctaLabel: 'Reservar', ctaUrl: '#', color: '#ffb35c', sigil: '⬡' },
      { id: 'ritual', title: 'The Ritual', subtitle: 'La decisión se convierte en recuerdo.', productTitle: 'Recuerdo desbloqueado', productName: 'Poster ZOLTAN personalizado', ctaLabel: 'Descargar poster', ctaUrl: '#', color: '#ffffff', sigil: '✧' }
    ]
  };
  let oracleCards = ORACLE_CONFIG.cards.slice();

  const els = {
    stage: document.getElementById('stage'),
    cards: document.getElementById('cards'),
    cameraVideo: document.getElementById('cameraVideo'),
    invokeBtn: document.getElementById('invokeBtn'),
    cameraBtn: document.getElementById('cameraBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    resetBtn: document.getElementById('resetBtn'),
    stateLabel: document.getElementById('stateLabel'),
    cameraLabel: document.getElementById('cameraLabel'),
    hoverLabel: document.getElementById('hoverLabel'),
    stageTitle: document.getElementById('stageTitle'),
    stageSubtitle: document.getElementById('stageSubtitle'),
    eyebrow: document.getElementById('eyebrow'),
    ritualHint: document.getElementById('ritualHint'),
    ctaLink: document.getElementById('ctaLink'),
    revealPanel: document.getElementById('revealPanel'),
    gestureCursor: document.getElementById('gestureCursor'),
    stageShell: document.getElementById('stageShell'),
    toast: document.getElementById('toast'),
    posterCanvas: document.getElementById('posterCanvas'),
    brandName: document.getElementById('brandName'),
    campaignClaim: document.getElementById('campaignClaim'),
    campaignCta: document.getElementById('campaignCta'),
    brandColor: document.getElementById('brandColor'),
    assetFiles: document.getElementById('assetFiles'),
    logoFile: document.getElementById('logoFile'),
    backgroundFile: document.getElementById('backgroundFile'),
    cardCount: document.getElementById('cardCount'),
    cardCountLabel: document.getElementById('cardCountLabel'),
    allowPlaceholders: document.getElementById('allowPlaceholders'),
    assetStatus: document.getElementById('assetStatus')
  };

  const core = window.ZoltanCore;
  const dwell = core.createDwellTracker(820);
  let state = STATES.ATTRACT;
  let selectedCard = null;
  let hoveredCard = null;
  let cameraOn = false;
  let lastGestureConfirm = 0;
  let uploadedAssets = [];
  let logoAsset = null;
  let backgroundAsset = null;

  function track(eventName, payload) {
    if (window.ZoltanAnalytics) window.ZoltanAnalytics.track(eventName, Object.assign({ experienceId: ORACLE_CONFIG.experienceId }, payload || {}));
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => els.toast.classList.remove('is-visible'), 2400);
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function setState(next) {
    state = next;
    els.stateLabel.textContent = `Estado: ${next}`;
    if (next === STATES.ATTRACT) {
      els.stageTitle.textContent = 'Levanta la mano o toca para invocar.';
      els.stageSubtitle.textContent = els.campaignClaim.value || ORACLE_CONFIG.subtitle;
      els.ritualHint.textContent = 'Touch/mouse listo. Cámara opcional.';
    }
    if (next === STATES.SUMMON) {
      els.stageTitle.textContent = 'El ritual se abre.';
      els.stageSubtitle.textContent = 'Las cartas se despliegan. Elige una y mantén para confirmar.';
    }
    if (next === STATES.SELECT) {
      els.stageTitle.textContent = 'Elige tu carta de marca.';
      els.stageSubtitle.textContent = 'Click, touch o dwell de 0.8s sobre una carta.';
    }
    if (next === STATES.REVEAL || next === STATES.CTA) {
      els.stageTitle.textContent = 'ZOLTAN ha revelado tu señal.';
      els.stageSubtitle.textContent = 'Resultado listo para CTA, cupón, QR o recuerdo descargable.';
    }
  }

  function roman(index) {
    return ['I','II','III','IV','V','VI','VII','VIII','IX'][index] || String(index + 1);
  }

  function renderCards() {
    els.cards.innerHTML = '';
    const positions = [
      [10, 12, -9], [30, 4, 5], [51, 10, -4], [72, 16, 8],
      [16, 48, 7], [38, 42, -6], [60, 46, 4], [78, 50, -7],
      [7, 34, -4], [88, 34, 4], [28, 65, -8], [66, 66, 8]
    ];
    oracleCards.forEach((card, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'oracle-card';
      btn.dataset.cardId = card.id;
      btn.style.left = `${positions[index][0]}%`;
      btn.style.top = `${positions[index][1]}%`;
      btn.style.transform = `rotate(${positions[index][2]}deg)`;
      btn.style.color = card.color;
      btn.setAttribute('aria-label', `Elegir ${card.title}`);
      const media = renderCardMedia(card);
      btn.innerHTML = `
        <span class="card-face card-back">
          <span class="roman">${roman(index)}</span>
          <strong>Z</strong>
          <span class="dwell-ring"><span></span></span>
        </span>
        <span class="card-face card-front">
          <span class="roman">${roman(index)}</span>
          ${media || `<span class="sigil">${card.sigil}</span>`}
          <span>
            <strong class="card-title">${card.title}</strong>
            <span class="card-sub">${card.subtitle}</span>
          </span>
        </span>`;
      btn.addEventListener('pointerenter', () => hoverCard(card.id));
      btn.addEventListener('pointerleave', () => hoverCard(null));
      btn.addEventListener('pointerdown', () => chooseCard(card.id, 'pointer'));
      els.cards.appendChild(btn);
    });
  }

  function renderCardMedia(card) {
    if (!card.asset) return '';
    if (card.asset.type === 'image') return `<span class="oracle-media"><img src="${escapeHtml(card.asset.url)}" alt="${escapeHtml(card.title)}" /></span>`;
    if (card.asset.type === 'video') return `<span class="oracle-media"><video src="${escapeHtml(card.asset.url)}" muted autoplay loop playsinline></video></span>`;
    if (card.asset.placeholder) return `<span class="oracle-media oracle-placeholder">P${card.index + 1}</span>`;
    return '';
  }

  function hoverCard(cardId) {
    hoveredCard = cardId;
    els.hoverLabel.textContent = cardId ? `Selección: ${cardId}` : 'Selección: esperando';
    document.querySelectorAll('.oracle-card').forEach((card) => card.classList.toggle('is-hovered', card.dataset.cardId === cardId));
    if (cardId) track('zoltan_oracle_card_hovered', { cardId });
  }

  function invoke() {
    if (state !== STATES.ATTRACT && state !== STATES.CONSENT) return;
    track('zoltan_oracle_started');
    setState(STATES.SUMMON);
    toast('Ritual iniciado.');
    setTimeout(() => setState(STATES.SELECT), 850);
  }

  function chooseCard(cardId, source) {
    if (state !== STATES.SELECT && state !== STATES.SUMMON) invoke();
    const card = oracleCards.find((item) => item.id === cardId);
    if (!card) return;
    selectedCard = card;
    track('zoltan_oracle_card_selected', { cardId, source });
    setState(STATES.CONFIRM);
    document.querySelectorAll('.oracle-card').forEach((el) => {
      el.classList.toggle('is-selected', el.dataset.cardId === cardId);
    });
    setTimeout(() => reveal(), 620);
  }

  function reveal() {
    if (!selectedCard) return;
    setState(STATES.REVEAL);
    document.querySelectorAll('.oracle-card').forEach((el) => {
      const active = el.dataset.cardId === selectedCard.id;
      el.classList.toggle('is-revealed', active);
      el.style.opacity = active ? '1' : '0.12';
    });
    els.revealPanel.innerHTML = `<strong>${selectedCard.productTitle}: ${selectedCard.productName}</strong><span>${selectedCard.subtitle}</span>`;
    els.ctaLink.textContent = selectedCard.ctaLabel;
    els.ctaLink.href = selectedCard.ctaUrl;
    track('zoltan_oracle_revealed', { cardId: selectedCard.id, productName: selectedCard.productName });
    setTimeout(() => setState(STATES.CTA), 900);
  }

  function reset() {
    selectedCard = null;
    hoveredCard = null;
    dwell.reset();
    els.revealPanel.innerHTML = '';
    renderCards();
    setState(STATES.ATTRACT);
    track('zoltan_oracle_reset');
  }

  function buildOracleDeck() {
    const intake = window.ZoltanAssetIntake;
    const requested = Math.max(4, Math.min(12, parseInt(els.cardCount.value, 10) || 8));
    els.cardCount.value = requested;
    els.cardCountLabel.textContent = `${requested} cartas`;
    const normalized = intake ? intake.normalizeAssetsForDeck(uploadedAssets, requested, els.allowPlaceholders.checked) : null;
    const contract = normalized ? normalized.contract : { ok: true, message: `Medios cargados: ${uploadedAssets.length}/${requested}.` };
    const deckAssets = normalized ? normalized.deckAssets : uploadedAssets.slice(0, requested);
    oracleCards = Array.from({ length: requested }, (_, index) => {
      const base = ORACLE_CONFIG.cards[index % ORACLE_CONFIG.cards.length];
      const asset = deckAssets[index] || null;
      const title = asset && !asset.placeholder ? asset.name : asset && asset.placeholder ? asset.name : base.title;
      return Object.assign({}, base, {
        id: asset && !asset.placeholder ? `media_${asset.id}` : `${base.id}_${index}`,
        index,
        title,
        productName: title,
        productTitle: els.brandName.value || base.productTitle,
        subtitle: els.campaignClaim.value || base.subtitle,
        ctaLabel: els.campaignCta.value || base.ctaLabel,
        color: els.brandColor.value || base.color,
        asset
      });
    });
    els.assetStatus.textContent = contract.message;
    els.assetStatus.classList.toggle('is-ok', contract.ok);
    els.assetStatus.classList.toggle('is-error', !contract.ok);
    els.invokeBtn.disabled = !contract.ok;
    document.documentElement.style.setProperty('--accent', els.brandColor.value);
    if (backgroundAsset && backgroundAsset.url) {
      els.stage.style.backgroundImage = `linear-gradient(rgba(3,3,5,.58), rgba(3,3,5,.78)), url("${backgroundAsset.url}")`;
      els.stage.style.backgroundSize = 'cover';
      els.stage.style.backgroundPosition = 'center';
    } else {
      els.stage.style.backgroundImage = '';
    }
    selectedCard = null;
    renderCards();
    setState(STATES.ATTRACT);
    return contract.ok;
  }

  const runtime = window.ZoltanGestureRuntime;
  runtime.init({
    videoEl: els.cameraVideo,
    mode: 'raw',
    enableKeyboard: true,
    enablePointer: false,
    privacyMessage: ORACLE_CONFIG.privacyCopy,
    gestureCooldownMs: 1200,
    minConfidence: 0.2
  });

  runtime.onGesture((event, detail) => {
    if (event === 'CAMERA_READY') {
      cameraOn = true;
      els.cameraLabel.textContent = 'Cámara: activa';
      els.cameraBtn.textContent = 'Desactivar cámara';
    } else if (event === 'CAMERA_ERROR') {
      cameraOn = false;
      els.cameraLabel.textContent = 'Cámara: denegada · modo táctil';
      toast('Cámara no disponible. El ritual sigue con touch.');
    } else if (event === 'camera-stopped') {
      cameraOn = false;
      els.cameraLabel.textContent = 'Cámara: off';
      els.cameraBtn.textContent = 'Activar cámara';
      els.gestureCursor.classList.remove('is-on');
    } else if (event === 'GESTURE') {
      const payload = detail;
      els.gestureCursor.classList.add('is-on');
      els.gestureCursor.style.left = `${payload.x * 100}%`;
      els.gestureCursor.style.top = `${payload.y * 100}%`;
      if (state === STATES.ATTRACT && payload.gesture === 'Open_Palm') invoke();
      if (state !== STATES.SELECT) return;
      const el = document.elementFromPoint(
        els.stage.getBoundingClientRect().left + payload.x * els.stage.clientWidth,
        els.stage.getBoundingClientRect().top + payload.y * els.stage.clientHeight
      );
      const cardEl = el && el.closest ? el.closest('.oracle-card') : null;
      const cardId = cardEl ? cardEl.dataset.cardId : null;
      hoverCard(cardId);
      const dwellState = dwell.update(cardId);
      document.querySelectorAll('.oracle-card .dwell-ring span').forEach((bar) => { bar.style.width = '0%'; });
      if (cardEl) cardEl.querySelector('.dwell-ring span').style.width = `${dwellState.progress * 100}%`;
      if (dwellState.complete && performance.now() - lastGestureConfirm > 1200) {
        lastGestureConfirm = performance.now();
        chooseCard(cardId, payload.source);
      }
    }
  });

  async function toggleCamera() {
    if (cameraOn) {
      runtime.stopCamera();
      return;
    }
    setState(STATES.CONSENT);
    const ok = await runtime.startCamera();
    if (!ok) setState(STATES.ATTRACT);
  }

  function downloadPoster() {
    const canvas = els.posterCanvas;
    const ctx = canvas.getContext('2d');
    const card = selectedCard || oracleCards[0];
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#050506');
    grad.addColorStop(0.5, '#150a14');
    grad.addColorStop(1, '#020203');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = card.color;
    ctx.lineWidth = 10;
    ctx.strokeRect(74, 74, canvas.width - 148, canvas.height - 148);
    ctx.strokeStyle = 'rgba(232,216,168,0.55)';
    ctx.lineWidth = 3;
    ctx.strokeRect(104, 104, canvas.width - 208, canvas.height - 208);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '900 88px Inter, Arial';
    ctx.fillText(els.brandName.value || 'ZOLTAN', canvas.width / 2, 240);
    ctx.fillStyle = card.color;
    ctx.font = '900 42px Inter, Arial';
    ctx.fillText('ORACLE CARD REVEAL', canvas.width / 2, 304);
    ctx.fillStyle = card.color;
    ctx.font = '900 180px Inter, Arial';
    if (card.asset && card.asset.el) {
      drawCover(ctx, card.asset.el, 330, 390, 540, 540);
    } else {
      ctx.fillText(card.sigil, canvas.width / 2, 610);
    }
    ctx.fillStyle = '#fff';
    ctx.font = '900 74px Playfair Display, serif';
    ctx.fillText(card.title, canvas.width / 2, 770);
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.font = '800 36px Inter, Arial';
    ctx.fillText(card.productTitle, canvas.width / 2, 900);
    ctx.fillStyle = card.color;
    ctx.font = '900 58px Inter, Arial';
    ctx.fillText(card.productName, canvas.width / 2, 982);
    ctx.fillStyle = '#050505';
    ctx.fillRect(190, 1170, canvas.width - 380, 120);
    ctx.fillStyle = '#fff';
    ctx.font = '900 38px Inter, Arial';
    ctx.fillText(els.campaignCta.value || card.ctaLabel, canvas.width / 2, 1244);
    ctx.fillStyle = 'rgba(232,216,168,0.9)';
    ctx.font = '800 28px Inter, Arial';
    ctx.fillText('Resultado final cerrado · Gesture Lab · ZOLTAN Line', canvas.width / 2, 1432);
    core.downloadElementAsPng(canvas, `zoltan-oracle-${card.id}-${Date.now()}.png`);
  }

  function drawCover(ctx, image, x, y, w, h) {
    const iw = image.videoWidth || image.naturalWidth || image.width || 1;
    const ih = image.videoHeight || image.naturalHeight || image.height || 1;
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    try {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 44);
      ctx.clip();
      ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
      ctx.restore();
    } catch (err) {
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#fff';
      ctx.font = '900 84px Inter, Arial';
      ctx.fillText('MEDIA', x + w / 2, y + h / 2);
    }
  }

  els.invokeBtn.addEventListener('click', invoke);
  els.resetBtn.addEventListener('click', reset);
  els.cameraBtn.addEventListener('click', toggleCamera);
  els.downloadBtn.addEventListener('click', downloadPoster);
  els.fullscreenBtn.addEventListener('click', () => els.stageShell.classList.toggle('is-fullscreen'));
  els.assetFiles.addEventListener('change', () => {
    if (window.ZoltanAssetIntake) window.ZoltanAssetIntake.revokeAssets(uploadedAssets);
    uploadedAssets = Array.from(els.assetFiles.files || []).map((file, index) => window.ZoltanAssetIntake.createAssetFromFile(file, index));
    buildOracleDeck();
  });
  els.logoFile.addEventListener('change', () => {
    if (logoAsset && window.ZoltanAssetIntake) window.ZoltanAssetIntake.revokeAsset(logoAsset);
    logoAsset = els.logoFile.files[0] && window.ZoltanAssetIntake ? window.ZoltanAssetIntake.createAssetFromFile(els.logoFile.files[0]) : null;
  });
  els.backgroundFile.addEventListener('change', () => {
    if (backgroundAsset && window.ZoltanAssetIntake) window.ZoltanAssetIntake.revokeAsset(backgroundAsset);
    backgroundAsset = els.backgroundFile.files[0] && window.ZoltanAssetIntake ? window.ZoltanAssetIntake.createAssetFromFile(els.backgroundFile.files[0]) : null;
    buildOracleDeck();
  });
  [els.brandName, els.campaignClaim, els.campaignCta, els.brandColor, els.cardCount, els.allowPlaceholders].forEach((el) => {
    el.addEventListener('input', buildOracleDeck);
    el.addEventListener('change', buildOracleDeck);
  });
  els.stage.addEventListener('pointermove', (event) => {
    if (state !== STATES.SELECT) return;
    const el = document.elementFromPoint(event.clientX, event.clientY);
    const cardEl = el && el.closest ? el.closest('.oracle-card') : null;
    hoverCard(cardEl ? cardEl.dataset.cardId : null);
    const dwellState = dwell.update(cardEl ? cardEl.dataset.cardId : null);
    document.querySelectorAll('.oracle-card .dwell-ring span').forEach((bar) => { bar.style.width = '0%'; });
    if (cardEl) cardEl.querySelector('.dwell-ring span').style.width = `${dwellState.progress * 100}%`;
    if (dwellState.complete) chooseCard(cardEl.dataset.cardId, event.pointerType || 'pointer');
  });

  window.addEventListener('beforeunload', () => {
    runtime.destroy();
    if (window.ZoltanAssetIntake) {
      window.ZoltanAssetIntake.revokeAssets(uploadedAssets);
      window.ZoltanAssetIntake.revokeAsset(logoAsset);
      window.ZoltanAssetIntake.revokeAsset(backgroundAsset);
    }
  });
  buildOracleDeck();
})();
