(function () {
  const els = {
    canvas: document.getElementById('stageCanvas'),
    video: document.getElementById('cameraVideo'),
    cardFiles: document.getElementById('cardFiles'),
    logoFile: document.getElementById('logoFile'),
    backgroundFile: document.getElementById('backgroundFile'),
    trickMode: document.getElementById('trickMode'),
    cardCount: document.getElementById('cardCount'),
    cardCountLabel: document.getElementById('cardCountLabel'),
    allowPlaceholders: document.getElementById('allowPlaceholders'),
    mediaStatus: document.getElementById('mediaStatus'),
    campaignName: document.getElementById('campaignName'),
    campaignClaim: document.getElementById('campaignClaim'),
    campaignCta: document.getElementById('campaignCta'),
    brandColor: document.getElementById('brandColor'),
    roundLabel: document.getElementById('roundLabel'),
    phasePill: document.getElementById('phasePill'),
    gesturePill: document.getElementById('gesturePill'),
    gestureZones: document.getElementById('gestureZones'),
    cameraBtn: document.getElementById('cameraBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    startBtn: document.getElementById('startBtn'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    col1Btn: document.getElementById('col1Btn'),
    col2Btn: document.getElementById('col2Btn'),
    col3Btn: document.getElementById('col3Btn'),
    resetBtn: document.getElementById('resetBtn'),
    resultCard: document.getElementById('resultCard'),
    qaDeck: document.getElementById('qaDeck'),
    qaNoRepeats: document.getElementById('qaNoRepeats'),
    qaOutput: document.getElementById('qaOutput'),
    stageShell: document.getElementById('stageShell'),
    toast: document.getElementById('toast')
  };

  const ctx = els.canvas.getContext('2d');
  const state = {
    phase: 'pick',
    trickMode: 'binary',
    cardCount: 16,
    currentBit: 0,
    answerBits: 0,
    maxBits: 0,
    deck: [],
    questionCards: [],
    classicState: null,
    cardAssets: [],
    logo: null,
    background: null,
    cameraActive: false,
    lastGestureAt: 0,
    phaseStartedAt: performance.now(),
    gestureCanvas: document.createElement('canvas'),
    lastFrame: null,
    reveal: null,
    particleTick: 0
  };
  state.gestureCanvas.width = 160;
  state.gestureCanvas.height = 110;
  state.gestureCtx = state.gestureCanvas.getContext('2d', { willReadFrequently: true });

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  }

  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * clamp(t, 0, 1)) - 1) / 2;
  }

  function phaseProgress(duration) {
    return clamp((performance.now() - state.phaseStartedAt) / duration, 0, 1);
  }

  function markPhase() {
    state.phaseStartedAt = performance.now();
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => els.toast.classList.remove('is-visible'), 2600);
  }

  function track(eventName, payload) {
    if (window.ZoltanAnalytics) {
      window.ZoltanAnalytics.track(eventName, Object.assign({
        module: 'magic-card-mentalism',
        trickMode: state.trickMode
      }, payload || {}));
    }
  }

  function assetKey(file) {
    return [file.name, file.size, file.type, file.lastModified].join('|');
  }

  function createAssetFromFile(file) {
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    const asset = {
      id: assetKey(file),
      name: file.name.replace(/\.[^.]+$/, ''),
      type: isVideo ? 'video' : 'image',
      url,
      ready: false,
      el: null,
      placeholder: false
    };

    if (isVideo) {
      const video = document.createElement('video');
      video.src = url;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.addEventListener('loadeddata', () => { asset.ready = true; });
      video.play().catch(() => {});
      asset.el = video;
    } else {
      const img = new Image();
      img.onload = () => { asset.ready = true; };
      img.src = url;
      asset.el = img;
    }
    return asset;
  }

  function makeDefaultAsset(index) {
    return {
      id: `default-${index}`,
      name: `Carta ${index + 1}`,
      type: 'default',
      ready: true,
      placeholder: false,
      palette: [
        ['#0b1026', '#00ffcc'],
        ['#150b26', '#e8d8a8'],
        ['#061f1b', '#7cff8a'],
        ['#250812', '#ff4d6d'],
        ['#071527', '#65a7ff']
      ][index % 5]
    };
  }

  function makePlaceholderAsset(index) {
    return {
      id: `placeholder-${index}`,
      name: `Placeholder ${index + 1}`,
      type: 'placeholder',
      ready: true,
      placeholder: true,
      palette: ['#181818', '#777777']
    };
  }

  function uniqueAssets(files) {
    const seen = new Set();
    const assets = [];
    Array.from(files || []).forEach((file) => {
      const key = assetKey(file);
      if (seen.has(key)) return;
      seen.add(key);
      assets.push(createAssetFromFile(file));
    });
    return assets;
  }

  function buildDeck() {
    state.trickMode = els.trickMode ? els.trickMode.value : 'binary';
    if (state.trickMode === 'classic21') {
      els.cardCount.max = 21;
      els.cardCount.value = 21;
      els.cardCount.disabled = true;
    } else {
      els.cardCount.max = 20;
      if (parseInt(els.cardCount.value, 10) > 20) els.cardCount.value = 20;
      els.cardCount.disabled = false;
    }
    const requested = state.trickMode === 'classic21' ? 21 : clamp(parseInt(els.cardCount.value, 10) || 16, 8, 20);
    state.cardCount = requested;
    const custom = state.cardAssets;
    const allowPlaceholders = els.allowPlaceholders.checked;
    const usingCustom = custom.length > 0;
    let assets = [];
    let valid = true;
    let message = 'Listo con cartas demo por defecto.';

    if (window.ZoltanAssetIntake && usingCustom) {
      const normalized = window.ZoltanAssetIntake.normalizeAssetsForDeck(custom, requested, allowPlaceholders);
      assets = normalized.deckAssets;
      valid = normalized.contract.ok;
      message = normalized.contract.message;
    } else if (!usingCustom) {
      assets = Array.from({ length: requested }, (_, i) => makeDefaultAsset(i));
      message = `Medios cargados: 0/${requested}. Usando cartas demo internas. Deck listo.`;
    } else if (custom.length === requested) {
      assets = custom.slice(0, requested);
      message = `Set personalizado valido: ${requested} medios sin repetir.`;
    } else if (custom.length > requested) {
      assets = custom.slice(0, requested);
      message = `Set personalizado valido: se usan los primeros ${requested} medios y se omiten ${custom.length - requested}.`;
    } else if (custom.length < requested && allowPlaceholders) {
      assets = custom.slice();
      while (assets.length < requested) assets.push(makePlaceholderAsset(assets.length));
      message = `Set mixto: ${custom.length} medios + ${requested - custom.length} placeholders visibles.`;
    } else {
      valid = false;
      assets = custom.slice(0, requested);
      message = custom.length < requested
        ? `Faltan ${requested - custom.length} medios. Sube exactamente ${requested} imagenes/videos o activa placeholders.`
        : `Sobran ${custom.length - requested} medios. Ajusta cartas o se usaran los primeros ${requested} al activar el modo.`;
    }

    state.deck = assets.map((asset, index) => ({
      asset,
      binaryValue: index + 1
    }));
    state.maxBits = Math.ceil(Math.log(requested + 1) / Math.log(2));

    els.mediaStatus.textContent = message;
    els.mediaStatus.classList.toggle('is-error', !valid);
    els.mediaStatus.classList.toggle('is-ok', valid);
    els.startBtn.disabled = !valid;
    els.qaDeck.textContent = valid ? `Deck: ${requested} cartas valido` : 'Deck: bloqueado por contrato de medios';
    els.qaNoRepeats.textContent = `Assets: ${custom.length ? custom.length + ' personalizados sin repetir' : 'demo sin repeticion'}`;
    if (els.stageShell) els.stageShell.classList.toggle('is-classic', state.trickMode === 'classic21');
    return valid;
  }

  function questionGroup() {
    const bit = 1 << state.currentBit;
    return state.deck
      .filter((card) => (card.binaryValue & bit) !== 0)
      .sort((a, b) => ((a.binaryValue * 7 + bit) % 23) - ((b.binaryValue * 7 + bit) % 23));
  }

  function dealIntoThreeColumns(deck) {
    const columns = [[], [], []];
    deck.forEach((card, index) => {
      columns[index % 3].push(card);
    });
    return columns;
  }

  function collectWithSelectedColumnInMiddle(columns, selectedColumnIndex) {
    const safeIndex = clamp(selectedColumnIndex, 0, 2);
    const otherIndexes = [0, 1, 2].filter((index) => index !== safeIndex);
    return [
      ...columns[otherIndexes[0]],
      ...columns[safeIndex],
      ...columns[otherIndexes[1]]
    ];
  }

  function createClassic21State(deck) {
    if (!Array.isArray(deck) || deck.length !== 21) {
      throw new Error('Classic 21 mode requires exactly 21 cards.');
    }
    return {
      round: 0,
      maxRounds: 3,
      deck: deck.slice(),
      columns: dealIntoThreeColumns(deck),
      selectedColumnHistory: [],
      phase: 'classic-question',
      revealCard: null,
      revealIndex: -1
    };
  }

  function answerClassic21(classicState, selectedColumnIndex) {
    const safeIndex = clamp(selectedColumnIndex, 0, 2);
    const nextDeck = collectWithSelectedColumnInMiddle(classicState.columns, safeIndex);
    const nextRound = classicState.round + 1;
    const next = {
      ...classicState,
      round: nextRound,
      deck: nextDeck,
      columns: dealIntoThreeColumns(nextDeck),
      selectedColumnHistory: [...classicState.selectedColumnHistory, safeIndex]
    };
    if (nextRound >= classicState.maxRounds) {
      next.phase = 'classic-reveal';
      next.revealCard = nextDeck[10];
      next.revealIndex = 10;
    } else {
      next.phase = 'classic-question';
    }
    return next;
  }

  function resetTrick() {
    state.phase = 'pick';
    state.currentBit = 0;
    state.answerBits = 0;
    state.reveal = null;
    state.questionCards = [];
    state.classicState = null;
    markPhase();
    buildDeck();
    updateUi();
    draw();
  }

  function startTrick() {
    if (!buildDeck()) {
      toast('No se puede empezar: el numero de medios debe coincidir con el numero de cartas.');
      return;
    }
    state.phase = state.trickMode === 'classic21' ? 'classic-question' : 'question';
    state.currentBit = 0;
    state.answerBits = 0;
    if (state.trickMode === 'classic21') {
      state.classicState = createClassic21State(state.deck);
      state.questionCards = [];
    } else {
      state.questionCards = questionGroup();
    }
    markPhase();
    track('magic_card_started', { cardCount: state.cardCount });
    track('magic_card_mode_selected', { mode: state.trickMode });
    updateUi();
  }

  function answer(yes) {
    if (state.phase !== 'question') return;
    if (yes) state.answerBits += 1 << state.currentBit;
    track('magic_card_answered', { round: state.currentBit + 1, answer: yes ? 'yes' : 'no' });
    state.currentBit += 1;
    if (state.currentBit >= state.maxBits) {
      reveal();
    } else {
      state.questionCards = questionGroup();
      markPhase();
      updateUi();
    }
  }

  function answerColumn(columnIndex) {
    if (state.phase !== 'classic-question' || !state.classicState) return;
    state.classicState = answerClassic21(state.classicState, columnIndex);
    track('magic_card_column_selected', { round: state.classicState.round, column: columnIndex + 1 });
    if (state.classicState.phase === 'classic-reveal') {
      revealClassic21();
    } else {
      markPhase();
      updateUi();
    }
  }

  function reveal() {
    state.phase = 'reveal';
    const index = clamp(state.answerBits - 1, 0, state.deck.length - 1);
    state.reveal = { index, card: state.deck[index] };
    markPhase();
    els.resultCard.innerHTML = `<strong>${escapeHtml(state.reveal.card.asset.name)}</strong><span>Revelado como carta #${index + 1}. Resultado listo para recuerdo y accion comercial.</span>`;
    updateUi();
    track('magic_card_revealed', { mode: 'binary', index });
    toast('Revelacion completada.');
  }

  function revealClassic21() {
    state.phase = 'reveal';
    const card = state.classicState.revealCard;
    const index = state.deck.findIndex((item) => item === card);
    state.reveal = { index: index >= 0 ? index : 10, card };
    markPhase();
    els.resultCard.innerHTML = `<strong>${escapeHtml(card.asset.name)}</strong><span>Modo clasico 21: la carta converge a la posicion 11 tras 3 rondas.</span>`;
    updateUi();
    track('magic_card_revealed', { mode: 'classic21', index: 10 });
    toast('ZOLTAN ya lo sabia: posicion 11.');
  }

  function updateUi() {
    els.cardCountLabel.textContent = `${state.cardCount} cartas`;
    const isClassicQuestion = state.phase === 'classic-question';
    els.startBtn.disabled = state.phase !== 'pick' || els.startBtn.disabled;
    els.yesBtn.disabled = state.phase !== 'question';
    els.noBtn.disabled = state.phase !== 'question';
    [els.col1Btn, els.col2Btn, els.col3Btn].forEach((btn) => { btn.disabled = !isClassicQuestion; });
    els.startBtn.textContent = state.phase === 'reveal' ? 'Truco completado' : 'Empezar juego';

    if (state.phase === 'pick') {
      els.roundLabel.textContent = 'Elige una carta en tu mente';
      els.phasePill.textContent = 'Preparacion';
      els.phasePill.className = 'pill is-warn';
    } else if (state.phase === 'question') {
      els.roundLabel.textContent = `Pregunta ${state.currentBit + 1} de ${state.maxBits}: esta aqui?`;
      els.phasePill.textContent = 'Ronda activa';
      els.phasePill.className = 'pill is-ok';
    } else if (state.phase === 'classic-question') {
      els.roundLabel.textContent = `Modo 21 - ronda ${state.classicState.round + 1} de 3: en que columna esta?`;
      els.phasePill.textContent = 'Clasico 21';
      els.phasePill.className = 'pill is-ok';
    } else {
      els.roundLabel.textContent = 'Revelacion final';
      els.phasePill.textContent = 'Revelado';
      els.phasePill.className = 'pill is-ok';
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function coverDraw(image, x, y, w, h) {
    if (!image) return;
    const iw = image.videoWidth || image.naturalWidth || image.width || 1;
    const ih = image.videoHeight || image.naturalHeight || image.height || 1;
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    try {
      ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
    } catch (err) {
      drawFallback(x, y, w, h, '#222', '#777', 'MEDIA');
    }
  }

  function coverDrawTo(targetCtx, image, x, y, w, h, fallbackLabel) {
    if (!image) return;
    const iw = image.videoWidth || image.naturalWidth || image.width || 1;
    const ih = image.videoHeight || image.naturalHeight || image.height || 1;
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    try {
      targetCtx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
    } catch (err) {
      targetCtx.fillStyle = '#151515';
      targetCtx.fillRect(x, y, w, h);
      targetCtx.fillStyle = '#fff';
      targetCtx.font = '900 54px Inter, Arial';
      targetCtx.textAlign = 'center';
      targetCtx.textBaseline = 'middle';
      targetCtx.fillText(fallbackLabel || 'MEDIA', x + w / 2, y + h / 2);
    }
  }

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function hexToRgb(hex) {
    const clean = String(hex || '#00ffcc').replace('#', '').trim();
    const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
    const value = parseInt(full, 16);
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255
    };
  }

  function rgba(hex, alpha) {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
  }

  function drawPremiumBack(x, y, w, h, label, accent) {
    ctx.save();
    roundedRect(x, y, w, h, Math.max(18, w * 0.12));
    const grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, '#0a1026');
    grad.addColorStop(0.48, '#140a22');
    grad.addColorStop(1, '#03040b');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.72)';
    ctx.lineWidth = Math.max(2, w * 0.018);
    roundedRect(x + w * 0.07, y + h * 0.055, w * 0.86, h * 0.89, Math.max(14, w * 0.09));
    ctx.stroke();
    ctx.strokeStyle = rgba(accent, 0.86);
    ctx.lineWidth = Math.max(2, w * 0.012);
    roundedRect(x + w * 0.13, y + h * 0.11, w * 0.74, h * 0.78, Math.max(12, w * 0.075));
    ctx.stroke();
    ctx.globalAlpha = 0.92;
    ctx.strokeStyle = 'rgba(232,216,168,0.78)';
    ctx.lineWidth = Math.max(1, w * 0.008);
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w * 0.23, h * 0.32, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w * 0.34, h * 0.18, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = `900 ${Math.max(20, w * 0.24)}px Inter, Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = rgba(accent, 0.75);
    ctx.shadowBlur = 22;
    ctx.fillText(label || 'Z', x + w / 2, y + h / 2);
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawCardShell(x, y, w, h, accent, active) {
    ctx.save();
    ctx.shadowColor = active ? rgba(accent, 0.5) : 'rgba(0,0,0,0.58)';
    ctx.shadowBlur = active ? 34 : 22;
    ctx.shadowOffsetY = active ? 12 : 18;
    roundedRect(x, y, w, h, Math.max(18, w * 0.12));
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = active ? rgba(accent, 0.86) : 'rgba(255,255,255,0.56)';
    ctx.lineWidth = active ? 4 : 2;
    roundedRect(x, y, w, h, Math.max(18, w * 0.12));
    ctx.stroke();
    ctx.strokeStyle = 'rgba(232,216,168,0.54)';
    ctx.lineWidth = 1.5;
    roundedRect(x + 8, y + 8, w - 16, h - 16, Math.max(14, w * 0.09));
    ctx.stroke();
  }

  function drawRitualRings(cx, cy, radius, accent, intensity) {
    const t = performance.now() * 0.001;
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < 4; i++) {
      const r = radius + i * 30 + Math.sin(t * 1.2 + i) * 8;
      ctx.rotate(0.18 + i * 0.07);
      ctx.strokeStyle = i % 2 ? 'rgba(232,216,168,0.55)' : rgba(accent, 0.55);
      ctx.lineWidth = 2 + i * 0.7;
      ctx.globalAlpha = intensity * (0.65 - i * 0.09);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.1, r * 0.64, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = intensity * 0.72;
    ctx.strokeStyle = rgba(accent, 0.95);
    ctx.lineWidth = 2;
    for (let i = 0; i < 16; i++) {
      const a = (Math.PI * 2 * i) / 16 + t * 0.24;
      const x1 = Math.cos(a) * (radius + 34);
      const y1 = Math.sin(a) * (radius * 0.62 + 20);
      const x2 = Math.cos(a) * (radius + 58);
      const y2 = Math.sin(a) * (radius * 0.62 + 34);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFallback(x, y, w, h, bg, accent, label) {
    const grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, bg);
    grad.addColorStop(1, '#050505');
    ctx.fillStyle = grad;
    roundedRect(x, y, w, h, 18);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    roundedRect(x + 10, y + 10, w - 20, h - 20, 14);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = `900 ${Math.max(18, w * 0.22)}px Inter, Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + w / 2, y + h / 2);
  }

  function drawAsset(asset, x, y, w, h) {
    const accent = els.brandColor.value;
    drawCardShell(x, y, w, h, accent, state.phase === 'reveal');
    ctx.save();
    roundedRect(x + 9, y + 9, w - 18, h - 18, Math.max(14, w * 0.09));
    ctx.clip();
    if (asset.type === 'image' || asset.type === 'video') {
      coverDraw(asset.el, x + 9, y + 9, w - 18, h - 18);
    } else {
      const p = asset.palette || ['#111', '#fff'];
      drawFallback(x + 9, y + 9, w - 18, h - 18, p[0], p[1], asset.placeholder ? 'FALTA' : String((parseInt(asset.id.split('-')[1], 10) || 0) + 1).padStart(2, '0'));
    }
    ctx.restore();
    if (asset.placeholder) {
      ctx.strokeStyle = '#ffb000';
      ctx.lineWidth = 4;
      roundedRect(x + 4, y + 4, w - 8, h - 8, Math.max(16, w * 0.1));
      ctx.stroke();
    }
  }

  function drawBackground() {
    const w = els.canvas.width;
    const h = els.canvas.height;
    const bg = state.background;
    const accent = els.brandColor.value;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);
    if (bg && bg.el) {
      coverDraw(bg.el, 0, 0, w, h);
      ctx.fillStyle = 'rgba(0,0,0,0.54)';
      ctx.fillRect(0, 0, w, h);
    }
    const grad = ctx.createRadialGradient(w * 0.48, h * 0.3, 20, w * 0.48, h * 0.3, w * 0.8);
    grad.addColorStop(0, rgba(accent, 0.28));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.globalAlpha = 0.24;
    ctx.strokeStyle = 'rgba(232,216,168,0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const cx = w * (0.08 + i * 0.083);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx + Math.sin(i) * 60, h);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawHeader() {
    const accent = els.brandColor.value;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    roundedRect(24, 22, els.canvas.width - 48, 74, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.font = '900 18px Inter, Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(els.campaignName.value || 'Escaparate Mentalista', 46, 50);
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.font = '700 14px Inter, Arial';
    ctx.fillText(state.phase === 'question' ? `Pregunta ${state.currentBit + 1}/${state.maxBits}` : 'Card Mentalism Media PRO', 46, 75);
    if (state.logo && state.logo.el && state.logo.ready) {
      coverDraw(state.logo.el, els.canvas.width - 134, 36, 88, 42);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      roundedRect(els.canvas.width - 134, 36, 88, 42, 12);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '900 15px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('LOGO', els.canvas.width - 90, 57);
    }
    ctx.restore();
  }

  function drawNumberBadge(card, x, y, cardW, cardH, accent) {
    ctx.fillStyle = 'rgba(0,0,0,0.68)';
    roundedRect(x + 12, y + cardH - 35, cardW - 24, 25, 12);
    ctx.fill();
    ctx.strokeStyle = rgba(accent, 0.36);
    ctx.lineWidth = 1;
    roundedRect(x + 12, y + cardH - 35, cardW - 24, 25, 12);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = '900 13px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(card.binaryValue).padStart(2, '0'), x + cardW / 2, y + cardH - 22);
  }

  function drawCards(cards, mode) {
    const w = els.canvas.width;
    const h = els.canvas.height;
    const count = cards.length;
    const accent = els.brandColor.value;
    const phase = easeOutCubic(phaseProgress(mode === 'reveal' ? 1250 : 850));
    if (mode === 'reveal') {
      const cardW = 330;
      const cardH = cardW * 1.42;
      const x = w / 2 - cardW / 2;
      const y = h / 2 - cardH / 2 + 40 - (1 - phase) * 34;
      drawRitualRings(w / 2, h / 2 + 36, 236, accent, phase);
      ctx.save();
      ctx.globalAlpha = 0.26 * phase;
      drawPremiumBack(x - 82, y + 26, cardW * 0.92, cardH * 0.92, 'Z', accent);
      drawPremiumBack(x + 112, y + 38, cardW * 0.86, cardH * 0.86, '35', accent);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = phase;
      ctx.translate(w / 2, y + cardH / 2);
      ctx.rotate((1 - phase) * -0.12);
      ctx.translate(-w / 2, -(y + cardH / 2));
      drawAsset(cards[0].asset, x, y, cardW, cardH);
      ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,0.94)';
      ctx.font = '900 42px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.shadowColor = rgba(accent, 0.8);
      ctx.shadowBlur = 28;
      ctx.fillText('ZOLTAN LO HA VISTO', w / 2, y - 58);
      ctx.shadowBlur = 0;
      ctx.fillStyle = accent;
      ctx.font = '900 30px Inter, Arial';
      ctx.fillText(cards[0].asset.name, w / 2, y + cardH + 50);
      ctx.fillStyle = 'rgba(232,216,168,0.9)';
      ctx.font = '800 15px Inter, Arial';
      ctx.fillText('REVELACION FINAL · GESTURE LAB 35', w / 2, y + cardH + 78);
      return;
    }

    const cols = mode === 'question' ? Math.min(4, Math.max(2, Math.ceil(Math.sqrt(count)))) : 4;
    const rows = Math.ceil(count / cols);
    const availableH = h - (mode === 'pick' ? 250 : 285);
    const baseW = mode === 'question' ? (count <= 4 ? 178 : count <= 8 ? 154 : 134) : (count <= 12 ? 130 : 116);
    const gapX = mode === 'question' ? 34 : 30;
    const gapY = mode === 'question' ? 30 : 20;
    const maxCardH = (availableH - (rows - 1) * gapY) / rows;
    const cardW = clamp(Math.min(baseW, maxCardH / 1.42), 70, baseW);
    const cardH = cardW * 1.42;
    const totalW = cols * cardW + (cols - 1) * gapX;
    const startX = w / 2 - totalW / 2;
    const startY = mode === 'pick' ? 130 : 164;
    if (mode === 'question') {
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      roundedRect(w / 2 - 340, 112, 680, 56, 18);
      ctx.fill();
      ctx.strokeStyle = rgba(accent, 0.32);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '900 20px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`RONDA ${state.currentBit + 1}: mira bien este grupo`, w / 2, 140);
      ctx.restore();
    }
    cards.forEach((card, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const delay = clamp(index * 0.055, 0, 0.55);
      const local = easeOutCubic((phase - delay) / Math.max(0.15, 1 - delay));
      const float = Math.sin(performance.now() * 0.0015 + index) * (mode === 'question' ? 5 : 3);
      const spread = mode === 'question' ? 11 : 5;
      const x = startX + col * (cardW + gapX) + (col - (cols - 1) / 2) * spread;
      const y = startY + row * (cardH + gapY) + float + (1 - local) * 46;
      const rotation = (mode === 'pick' ? (col - 1.5) * 0.018 : (col - (cols - 1) / 2) * 0.026) * local;
      ctx.save();
      ctx.globalAlpha = local;
      ctx.translate(x + cardW / 2, y + cardH / 2);
      ctx.rotate(rotation);
      ctx.translate(-(x + cardW / 2), -(y + cardH / 2));
      drawPremiumBack(x + 9, y + 10, cardW, cardH, 'Z', accent);
      drawAsset(card.asset, x, y, cardW, cardH);
      drawNumberBadge(card, x, y, cardW, cardH, accent);
      ctx.restore();
    });
  }

  function drawClassicColumns(classicState) {
    if (!classicState) return;
    const w = els.canvas.width;
    const h = els.canvas.height;
    const accent = els.brandColor.value;
    const phase = easeOutCubic(phaseProgress(850));
    const columns = classicState.columns;
    const colW = 300;
    const cardW = 96;
    const cardH = cardW * 1.42;
    const gapY = 18;
    const startX = w / 2 - (colW * 3 + 24 * 2) / 2;
    const startY = 174;

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.36)';
    roundedRect(w / 2 - 390, 112, 780, 54, 18);
    ctx.fill();
    ctx.strokeStyle = rgba(accent, 0.34);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = '900 20px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`RONDA ${classicState.round + 1}/3: ¿EN QUÉ COLUMNA ESTÁ TU CARTA?`, w / 2, 140);
    ctx.restore();

    columns.forEach((column, columnIndex) => {
      const panelX = startX + columnIndex * (colW + 24);
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.045)';
      roundedRect(panelX, startY - 34, colW, h - startY - 104, 24);
      ctx.fill();
      ctx.strokeStyle = columnIndex === 1 ? rgba(accent, 0.42) : 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 2;
      roundedRect(panelX, startY - 34, colW, h - startY - 104, 24);
      ctx.stroke();
      ctx.fillStyle = columnIndex === 1 ? accent : 'rgba(255,255,255,0.82)';
      ctx.font = '900 16px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`COLUMNA ${columnIndex + 1}`, panelX + colW / 2, startY - 12);
      ctx.restore();

      column.forEach((card, rowIndex) => {
        const delay = clamp((columnIndex * 7 + rowIndex) * 0.025, 0, 0.5);
        const local = easeOutCubic((phase - delay) / Math.max(0.15, 1 - delay));
        const x = panelX + 18 + (rowIndex % 2) * (cardW + 16);
        const y = startY + Math.floor(rowIndex / 2) * (cardH + gapY) + (1 - local) * 34;
        ctx.save();
        ctx.globalAlpha = local;
        ctx.translate(x + cardW / 2, y + cardH / 2);
        ctx.rotate(((rowIndex % 2) ? 0.025 : -0.025) * local);
        ctx.translate(-(x + cardW / 2), -(y + cardH / 2));
        drawPremiumBack(x + 8, y + 8, cardW, cardH, '21', accent);
        drawAsset(card.asset, x, y, cardW, cardH);
        drawNumberBadge(card, x, y, cardW, cardH, accent);
        ctx.restore();
      });
    });
  }

  function drawFooterText() {
    const h = els.canvas.height;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '900 24px Inter, Arial';
    if (state.phase === 'pick') {
      ctx.fillText('Piensa una carta. No la pulses. ZOLTAN solo necesita tus respuestas.', els.canvas.width / 2, h - 70);
    } else if (state.phase === 'question') {
      ctx.fillText('Esta aqui tu imagen?', els.canvas.width / 2, h - 78);
      ctx.fillStyle = 'rgba(255,255,255,0.68)';
      ctx.font = '800 16px Inter, Arial';
      ctx.fillText('Izquierda = NO · Derecha = SI · Si dudas, usa los botones grandes.', els.canvas.width / 2, h - 48);
    } else if (state.phase === 'classic-question') {
      ctx.fillText('En que columna esta tu carta?', els.canvas.width / 2, h - 78);
      ctx.fillStyle = 'rgba(255,255,255,0.68)';
      ctx.font = '800 16px Inter, Arial';
      ctx.fillText('Pulsa Columna 1, 2 o 3. Con camara, mueve la mano en una de las tres zonas.', els.canvas.width / 2, h - 48);
    } else {
      ctx.fillText(els.campaignClaim.value || 'Has desbloqueado tu seleccion secreta', els.canvas.width / 2, h - 74);
      ctx.fillStyle = els.brandColor.value;
      ctx.font = '900 18px Inter, Arial';
      ctx.fillText(els.campaignCta.value || 'Descarga tu recuerdo y desbloquea la recompensa', els.canvas.width / 2, h - 44);
    }
  }

  function drawGestureOverlay() {
    if (!state.cameraActive || (state.phase !== 'question' && state.phase !== 'classic-question')) return;
    const w = els.canvas.width;
    const h = els.canvas.height;
    ctx.save();
    ctx.globalAlpha = 0.13;
    if (state.phase === 'classic-question') {
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(0, 0, w / 3, h);
      ctx.fillStyle = '#e8d8a8';
      ctx.fillRect(w / 3, 0, w / 3, h);
      ctx.fillStyle = '#00ffcc';
      ctx.fillRect((w / 3) * 2, 0, w / 3, h);
    } else {
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(0, 0, w / 2, h);
      ctx.fillStyle = '#00ffcc';
      ctx.fillRect(w / 2, 0, w / 2, h);
    }
    ctx.restore();
  }

  function draw() {
    drawBackground();
    drawGestureOverlay();
    drawHeader();
    if (state.phase === 'classic-question') {
      drawClassicColumns(state.classicState);
      drawFooterText();
      requestAnimationFrame(draw);
      return;
    }
    const cards = state.phase === 'pick'
      ? state.deck
      : state.phase === 'question'
        ? state.questionCards
        : [state.reveal.card];
    drawCards(cards, state.phase);
    drawFooterText();
    requestAnimationFrame(draw);
  }

  async function toggleCamera() {
    if (state.cameraActive) {
      stopCamera();
      return;
    }
    try {
      els.cameraBtn.textContent = 'Activando...';
      els.cameraBtn.classList.remove('btn-accent');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      els.video.srcObject = stream;
      await els.video.play();
      state.cameraActive = true;
      els.cameraBtn.textContent = 'Gestos activos';
      els.cameraBtn.classList.add('btn-accent');
      els.gesturePill.textContent = 'Gestos on';
      els.gesturePill.className = 'pill is-ok';
      els.gestureZones.classList.add('is-on');
      track('camera_started');
      toast('Camara activa: mueve la mano a la izquierda para NO o a la derecha para SI.');
      requestAnimationFrame(analyzeGestureMotion);
    } catch (err) {
      state.cameraActive = false;
      els.cameraBtn.textContent = 'Activar gestos';
      els.gesturePill.textContent = 'Gestos error';
      els.gesturePill.className = 'pill is-warn';
      track('camera_denied', { message: err.message });
      toast('No se pudo activar camara. Usa botones grandes.');
    }
  }

  function stopCamera() {
    const stream = els.video.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
    els.video.srcObject = null;
    state.cameraActive = false;
    els.cameraBtn.textContent = 'Activar gestos';
    els.gesturePill.textContent = 'Gestos off';
    els.gesturePill.className = 'pill';
    els.gestureZones.classList.remove('is-on');
  }

  function handleCanvasPointer(event) {
    if (state.phase !== 'question' && state.phase !== 'classic-question') return;
    const now = performance.now();
    if (now - state.lastGestureAt < 700) return;
    const rect = els.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    state.lastGestureAt = now;
    track('fallback_used', { source: event.pointerType || 'pointer' });
    if (state.phase === 'classic-question') {
      answerColumn(clamp(Math.floor((x / rect.width) * 3), 0, 2));
    } else {
      answer(x > rect.width / 2);
    }
  }

  function analyzeGestureMotion() {
    if (!state.cameraActive) return;
    requestAnimationFrame(analyzeGestureMotion);
    if (state.phase !== 'question' && state.phase !== 'classic-question') return;
    if (!els.video.videoWidth || !els.video.videoHeight) return;

    const now = performance.now();
    if (now - state.lastGestureAt < 950) return;

    const gw = state.gestureCanvas.width;
    const gh = state.gestureCanvas.height;
    state.gestureCtx.save();
    state.gestureCtx.scale(-1, 1);
    state.gestureCtx.drawImage(els.video, -gw, 0, gw, gh);
    state.gestureCtx.restore();
    const frame = state.gestureCtx.getImageData(0, 0, gw, gh);
    if (!state.lastFrame) {
      state.lastFrame = frame;
      return;
    }

    let left = 0;
    let center = 0;
    let right = 0;
    const data = frame.data;
    const prev = state.lastFrame.data;
    for (let y = 0; y < gh; y += 3) {
      for (let x = 0; x < gw; x += 3) {
        const i = (y * gw + x) * 4;
        const diff = Math.abs(data[i] - prev[i]) + Math.abs(data[i + 1] - prev[i + 1]) + Math.abs(data[i + 2] - prev[i + 2]);
        if (diff < 42) continue;
        if (state.phase === 'classic-question') {
          if (x < gw / 3) left += diff;
          else if (x < (gw / 3) * 2) center += diff;
          else right += diff;
        } else if (x < gw / 2) left += diff;
        else right += diff;
      }
    }
    state.lastFrame = frame;

    const total = left + right;
    if (total < 22000) return;
    if (state.phase === 'classic-question') {
      const max = Math.max(left, center, right);
      const column = max === left ? 0 : max === center ? 1 : 2;
      state.lastGestureAt = now;
      toast(`Gesto detectado: columna ${column + 1}`);
      answerColumn(column);
    } else if (left > right * 1.28) {
      state.lastGestureAt = now;
      toast('Gesto detectado: NO');
      answer(false);
    } else if (right > left * 1.28) {
      state.lastGestureAt = now;
      toast('Gesto detectado: SI');
      answer(true);
    }
  }

  function drawPosterFallback(pctx, asset, x, y, w, h) {
    const p = asset.palette || ['#111', '#fff'];
    const grad = pctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, p[0]);
    grad.addColorStop(1, '#050505');
    pctx.fillStyle = grad;
    pctx.fillRect(x, y, w, h);
    pctx.strokeStyle = p[1] || '#fff';
    pctx.lineWidth = 12;
    pctx.strokeRect(x + 28, y + 28, w - 56, h - 56);
    pctx.fillStyle = '#fff';
    pctx.font = '900 150px Inter, Arial';
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText(asset.placeholder ? 'FALTA' : 'Z', x + w / 2, y + h / 2);
  }

  function drawPosterAsset(pctx, asset, x, y, w, h) {
    pctx.save();
    pctx.beginPath();
    const r = 54;
    pctx.moveTo(x + r, y);
    pctx.arcTo(x + w, y, x + w, y + h, r);
    pctx.arcTo(x + w, y + h, x, y + h, r);
    pctx.arcTo(x, y + h, x, y, r);
    pctx.arcTo(x, y, x + w, y, r);
    pctx.closePath();
    pctx.clip();
    if ((asset.type === 'image' || asset.type === 'video') && asset.el) {
      coverDrawTo(pctx, asset.el, x, y, w, h, asset.name);
    } else {
      drawPosterFallback(pctx, asset, x, y, w, h);
    }
    pctx.restore();
  }

  function downloadPoster() {
    const poster = document.createElement('canvas');
    poster.width = 1400;
    poster.height = 2000;
    const pctx = poster.getContext('2d');
    const accent = els.brandColor.value;
    const rgb = hexToRgb(accent);
    const revealCard = state.reveal ? state.reveal.card : state.deck[0];
    const revealAsset = revealCard ? revealCard.asset : makeDefaultAsset(0);

    const bgGrad = pctx.createLinearGradient(0, 0, poster.width, poster.height);
    bgGrad.addColorStop(0, '#070811');
    bgGrad.addColorStop(0.45, '#120816');
    bgGrad.addColorStop(1, '#020207');
    pctx.fillStyle = bgGrad;
    pctx.fillRect(0, 0, poster.width, poster.height);

    if (state.background && state.background.el) {
      coverDrawTo(pctx, state.background.el, 0, 0, poster.width, poster.height, 'FONDO');
      pctx.fillStyle = 'rgba(0,0,0,0.68)';
      pctx.fillRect(0, 0, poster.width, poster.height);
    }

    pctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.18)`;
    pctx.beginPath();
    pctx.arc(700, 580, 620, 0, Math.PI * 2);
    pctx.fill();
    pctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)`;
    pctx.lineWidth = 6;
    pctx.strokeRect(70, 70, 1260, 1860);
    pctx.strokeStyle = 'rgba(232,216,168,0.55)';
    pctx.lineWidth = 2;
    pctx.strokeRect(98, 98, 1204, 1804);

    pctx.fillStyle = '#ffffff';
    pctx.font = '900 74px Inter, Arial';
    pctx.textAlign = 'left';
    pctx.textBaseline = 'alphabetic';
    pctx.fillText('ZOLTAN', 140, 190);
    pctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    pctx.font = '900 34px Inter, Arial';
    pctx.fillText('MAGIC CARD MENTALISM RETAIL PRO', 140, 238);

    if (state.logo && state.logo.el && state.logo.ready) {
      coverDrawTo(pctx, state.logo.el, 1070, 126, 170, 88, 'LOGO');
    } else {
      pctx.fillStyle = 'rgba(255,255,255,0.1)';
      pctx.fillRect(1070, 126, 170, 88);
      pctx.fillStyle = '#fff';
      pctx.font = '900 28px Inter, Arial';
      pctx.textAlign = 'center';
      pctx.fillText('LOGO', 1155, 182);
      pctx.textAlign = 'left';
    }

    pctx.save();
    pctx.translate(700, 820);
    for (let i = 0; i < 5; i++) {
      pctx.strokeStyle = i % 2 ? 'rgba(232,216,168,0.45)' : `rgba(${rgb.r},${rgb.g},${rgb.b},0.46)`;
      pctx.lineWidth = 4 - i * 0.35;
      pctx.beginPath();
      pctx.ellipse(0, 0, 440 + i * 42, 250 + i * 26, i * 0.2, 0, Math.PI * 2);
      pctx.stroke();
    }
    pctx.restore();

    drawPosterAsset(pctx, revealAsset, 420, 430, 560, 800);
    pctx.strokeStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    pctx.lineWidth = 10;
    pctx.strokeRect(420, 430, 560, 800);
    pctx.strokeStyle = 'rgba(255,255,255,0.72)';
    pctx.lineWidth = 4;
    pctx.strokeRect(444, 454, 512, 752);

    pctx.textAlign = 'center';
    pctx.fillStyle = '#ffffff';
    pctx.font = '900 62px Inter, Arial';
    pctx.fillText(els.campaignName.value || 'Escaparate Mentalista', 700, 1348);
    pctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    pctx.font = '900 48px Inter, Arial';
    pctx.fillText(revealAsset.name || 'Seleccion revelada', 700, 1420);
    pctx.fillStyle = 'rgba(255,255,255,0.84)';
    pctx.font = '800 34px Inter, Arial';
    pctx.fillText(els.campaignClaim.value || 'Has desbloqueado tu seleccion secreta', 700, 1512);
    pctx.fillStyle = '#0a0a0a';
    pctx.fillRect(220, 1628, 960, 118);
    pctx.fillStyle = '#ffffff';
    pctx.font = '900 38px Inter, Arial';
    pctx.fillText(els.campaignCta.value || 'Descarga tu recuerdo y desbloquea la recompensa', 700, 1700);
    pctx.fillStyle = 'rgba(232,216,168,0.9)';
    pctx.font = '800 24px Inter, Arial';
    pctx.fillText('Gesture Lab 35 · Resultado final cerrado · No incluye editor', 700, 1842);

    const link = document.createElement('a');
    link.download = `zoltan-magic-card-premium-${Date.now()}.png`;
    link.href = poster.toDataURL('image/png');
    link.click();
    els.qaOutput.textContent = 'Salida: PNG poster premium descargado';
    track('magic_card_exported', { phase: state.phase, hasReveal: !!state.reveal });
  }

  function loadSingle(file, assign) {
    if (!file) {
      assign(null);
      return;
    }
    assign(createAssetFromFile(file));
  }

  function replaceSingle(currentAsset, file, assign) {
    if (currentAsset && currentAsset.url) URL.revokeObjectURL(currentAsset.url);
    loadSingle(file, assign);
  }

  els.cardFiles.addEventListener('change', () => {
    state.cardAssets.forEach((asset) => asset.url && URL.revokeObjectURL(asset.url));
    state.cardAssets = uniqueAssets(els.cardFiles.files);
    resetTrick();
  });
  els.logoFile.addEventListener('change', () => replaceSingle(state.logo, els.logoFile.files[0], (asset) => { state.logo = asset; }));
  els.backgroundFile.addEventListener('change', () => replaceSingle(state.background, els.backgroundFile.files[0], (asset) => { state.background = asset; }));
  if (els.trickMode) els.trickMode.addEventListener('change', resetTrick);
  els.cardCount.addEventListener('input', resetTrick);
  els.allowPlaceholders.addEventListener('change', resetTrick);
  els.startBtn.addEventListener('click', startTrick);
  els.yesBtn.addEventListener('click', () => answer(true));
  els.noBtn.addEventListener('click', () => answer(false));
  els.col1Btn.addEventListener('click', () => answerColumn(0));
  els.col2Btn.addEventListener('click', () => answerColumn(1));
  els.col3Btn.addEventListener('click', () => answerColumn(2));
  els.resetBtn.addEventListener('click', resetTrick);
  els.downloadBtn.addEventListener('click', downloadPoster);
  els.cameraBtn.addEventListener('click', toggleCamera);
  els.canvas.addEventListener('pointerdown', handleCanvasPointer);
  els.fullscreenBtn.addEventListener('click', () => els.stageShell.classList.toggle('is-fullscreen'));
  ['campaignName', 'campaignClaim', 'campaignCta', 'brandColor'].forEach((id) => {
    els[id].addEventListener('input', () => {});
  });
  window.addEventListener('beforeunload', () => {
    stopCamera();
    state.cardAssets.forEach((asset) => asset.url && URL.revokeObjectURL(asset.url));
    if (state.logo && state.logo.url) URL.revokeObjectURL(state.logo.url);
    if (state.background && state.background.url) URL.revokeObjectURL(state.background.url);
  });

  resetTrick();
  draw();
})();
