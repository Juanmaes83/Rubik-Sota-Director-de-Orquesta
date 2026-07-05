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
    posterCanvas: document.getElementById('posterCanvas')
  };

  const core = window.ZoltanCore;
  const dwell = core.createDwellTracker(820);
  let state = STATES.ATTRACT;
  let selectedCard = null;
  let hoveredCard = null;
  let cameraOn = false;
  let lastGestureConfirm = 0;

  function track(eventName, payload) {
    if (window.ZoltanAnalytics) window.ZoltanAnalytics.track(eventName, Object.assign({ experienceId: ORACLE_CONFIG.experienceId }, payload || {}));
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => els.toast.classList.remove('is-visible'), 2400);
  }

  function setState(next) {
    state = next;
    els.stateLabel.textContent = `Estado: ${next}`;
    if (next === STATES.ATTRACT) {
      els.stageTitle.textContent = 'Levanta la mano o toca para invocar.';
      els.stageSubtitle.textContent = ORACLE_CONFIG.subtitle;
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
      [16, 48, 7], [38, 42, -6], [60, 46, 4], [78, 50, -7]
    ];
    ORACLE_CONFIG.cards.forEach((card, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'oracle-card';
      btn.dataset.cardId = card.id;
      btn.style.left = `${positions[index][0]}%`;
      btn.style.top = `${positions[index][1]}%`;
      btn.style.transform = `rotate(${positions[index][2]}deg)`;
      btn.style.color = card.color;
      btn.setAttribute('aria-label', `Elegir ${card.title}`);
      btn.innerHTML = `
        <span class="card-face card-back">
          <span class="roman">${roman(index)}</span>
          <strong>Z</strong>
          <span class="dwell-ring"><span></span></span>
        </span>
        <span class="card-face card-front">
          <span class="roman">${roman(index)}</span>
          <span class="sigil">${card.sigil}</span>
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
    const card = ORACLE_CONFIG.cards.find((item) => item.id === cardId);
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

  const gestureController = window.ZoltanGestures.createController({
    videoEl: els.cameraVideo,
    onStatus(status) {
      if (status === 'camera-started') {
        cameraOn = true;
        els.cameraLabel.textContent = 'Cámara: activa';
        els.cameraBtn.textContent = 'Desactivar cámara';
      } else if (status === 'camera-denied') {
        cameraOn = false;
        els.cameraLabel.textContent = 'Cámara: denegada · modo táctil';
        toast('Cámara no disponible. El ritual sigue con touch.');
      } else if (status === 'camera-stopped') {
        cameraOn = false;
        els.cameraLabel.textContent = 'Cámara: off';
        els.cameraBtn.textContent = 'Activar cámara';
        els.gestureCursor.classList.remove('is-on');
      } else if (status === 'tracking') {
        els.cameraLabel.textContent = 'Cámara: tracking';
      }
    },
    onGesture(payload) {
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
      gestureController.stop();
      return;
    }
    setState(STATES.CONSENT);
    const ok = await gestureController.start();
    if (!ok) setState(STATES.ATTRACT);
  }

  function downloadPoster() {
    const canvas = els.posterCanvas;
    const ctx = canvas.getContext('2d');
    const card = selectedCard || ORACLE_CONFIG.cards[0];
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
    ctx.fillText('ZOLTAN', canvas.width / 2, 240);
    ctx.fillStyle = card.color;
    ctx.font = '900 42px Inter, Arial';
    ctx.fillText('ORACLE CARD REVEAL', canvas.width / 2, 304);
    ctx.fillStyle = card.color;
    ctx.font = '900 180px Inter, Arial';
    ctx.fillText(card.sigil, canvas.width / 2, 610);
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
    ctx.fillText(card.ctaLabel, canvas.width / 2, 1244);
    ctx.fillStyle = 'rgba(232,216,168,0.9)';
    ctx.font = '800 28px Inter, Arial';
    ctx.fillText('Resultado final cerrado · Gesture Lab · ZOLTAN Line', canvas.width / 2, 1432);
    core.downloadElementAsPng(canvas, `zoltan-oracle-${card.id}-${Date.now()}.png`);
  }

  els.invokeBtn.addEventListener('click', invoke);
  els.resetBtn.addEventListener('click', reset);
  els.cameraBtn.addEventListener('click', toggleCamera);
  els.downloadBtn.addEventListener('click', downloadPoster);
  els.fullscreenBtn.addEventListener('click', () => els.stageShell.classList.toggle('is-fullscreen'));
  els.stage.addEventListener('pointermove', (event) => {
    if (state !== STATES.SELECT) return;
    const payload = gestureController.handlePointer(event);
    const el = document.elementFromPoint(event.clientX, event.clientY);
    const cardEl = el && el.closest ? el.closest('.oracle-card') : null;
    hoverCard(cardEl ? cardEl.dataset.cardId : null);
    const dwellState = dwell.update(cardEl ? cardEl.dataset.cardId : null);
    document.querySelectorAll('.oracle-card .dwell-ring span').forEach((bar) => { bar.style.width = '0%'; });
    if (cardEl) cardEl.querySelector('.dwell-ring span').style.width = `${dwellState.progress * 100}%`;
    if (dwellState.complete) chooseCard(cardEl.dataset.cardId, payload.source);
  });

  window.addEventListener('beforeunload', () => gestureController.stop());
  renderCards();
  setState(STATES.ATTRACT);
})();
