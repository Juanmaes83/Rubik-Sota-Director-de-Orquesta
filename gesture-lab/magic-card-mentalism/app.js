(function () {
  const els = {
    canvas: document.getElementById('stageCanvas'),
    video: document.getElementById('cameraVideo'),
    cardFiles: document.getElementById('cardFiles'),
    logoFile: document.getElementById('logoFile'),
    backgroundFile: document.getElementById('backgroundFile'),
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
    cardCount: 20,
    currentBit: 0,
    answerBits: 0,
    maxBits: 0,
    deck: [],
    questionCards: [],
    cardAssets: [],
    logo: null,
    background: null,
    cameraActive: false,
    lastGestureAt: 0,
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

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => els.toast.classList.remove('is-visible'), 2600);
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
    const requested = clamp(parseInt(els.cardCount.value, 10) || 20, 8, 20);
    state.cardCount = requested;
    const custom = state.cardAssets;
    const allowPlaceholders = els.allowPlaceholders.checked;
    const usingCustom = custom.length > 0;
    let assets = [];
    let valid = true;
    let message = 'Listo con cartas demo por defecto.';

    if (!usingCustom) {
      assets = Array.from({ length: requested }, (_, i) => makeDefaultAsset(i));
    } else if (custom.length === requested) {
      assets = custom.slice(0, requested);
      message = `Set personalizado valido: ${requested} medios sin repetir.`;
    } else if (custom.length < requested && allowPlaceholders) {
      assets = custom.slice();
      while (assets.length < requested) assets.push(makePlaceholderAsset(assets.length));
      message = `Set mixto: ${custom.length} medios + ${requested - custom.length} placeholders visibles.`;
    } else {
      valid = false;
      assets = custom.slice(0, requested);
      message = custom.length < requested
        ? `Faltan ${requested - custom.length} medios. Sube exactamente ${requested} imagenes/videos o activa placeholders.`
        : `Sobran ${custom.length - requested} medios. Ajusta cartas a ${custom.length} o deja exactamente ${requested} archivos.`;
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
    return valid;
  }

  function questionGroup() {
    const bit = 1 << state.currentBit;
    return state.deck
      .filter((card) => (card.binaryValue & bit) !== 0)
      .sort((a, b) => ((a.binaryValue * 7 + bit) % 23) - ((b.binaryValue * 7 + bit) % 23));
  }

  function resetTrick() {
    state.phase = 'pick';
    state.currentBit = 0;
    state.answerBits = 0;
    state.reveal = null;
    state.questionCards = [];
    buildDeck();
    updateUi();
    draw();
  }

  function startTrick() {
    if (!buildDeck()) {
      toast('No se puede empezar: el numero de medios debe coincidir con el numero de cartas.');
      return;
    }
    state.phase = 'question';
    state.currentBit = 0;
    state.answerBits = 0;
    state.questionCards = questionGroup();
    updateUi();
  }

  function answer(yes) {
    if (state.phase !== 'question') return;
    if (yes) state.answerBits += 1 << state.currentBit;
    state.currentBit += 1;
    if (state.currentBit >= state.maxBits) {
      reveal();
    } else {
      state.questionCards = questionGroup();
      updateUi();
    }
  }

  function reveal() {
    state.phase = 'reveal';
    const index = clamp(state.answerBits - 1, 0, state.deck.length - 1);
    state.reveal = { index, card: state.deck[index] };
    els.resultCard.innerHTML = `<strong>${escapeHtml(state.reveal.card.asset.name)}</strong><span>Revelado como carta #${index + 1}. Resultado listo para recuerdo y accion comercial.</span>`;
    updateUi();
    toast('Revelacion completada.');
  }

  function updateUi() {
    els.cardCountLabel.textContent = `${els.cardCount.value} cartas`;
    els.startBtn.disabled = state.phase !== 'pick' || els.startBtn.disabled;
    els.yesBtn.disabled = state.phase !== 'question';
    els.noBtn.disabled = state.phase !== 'question';
    els.startBtn.textContent = state.phase === 'reveal' ? 'Truco completado' : 'Empezar juego';

    if (state.phase === 'pick') {
      els.roundLabel.textContent = 'Elige una carta en tu mente';
      els.phasePill.textContent = 'Preparacion';
      els.phasePill.className = 'pill is-warn';
    } else if (state.phase === 'question') {
      els.roundLabel.textContent = `Pregunta ${state.currentBit + 1} de ${state.maxBits}: esta aqui?`;
      els.phasePill.textContent = 'Ronda activa';
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

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
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
    ctx.font = `900 ${Math.max(18, w * 0.17)}px Inter, Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + w / 2, y + h / 2);
  }

  function drawAsset(asset, x, y, w, h) {
    ctx.save();
    roundedRect(x, y, w, h, 20);
    ctx.clip();
    if (asset.type === 'image' || asset.type === 'video') {
      coverDraw(asset.el, x, y, w, h);
    } else {
      const p = asset.palette || ['#111', '#fff'];
      drawFallback(x, y, w, h, p[0], p[1], asset.placeholder ? 'FALTA' : String((parseInt(asset.id.split('-')[1], 10) || 0) + 1).padStart(2, '0'));
    }
    ctx.restore();
    ctx.strokeStyle = asset.placeholder ? '#ffb000' : 'rgba(255,255,255,0.72)';
    ctx.lineWidth = asset.placeholder ? 4 : 2;
    roundedRect(x, y, w, h, 20);
    ctx.stroke();
  }

  function drawBackground() {
    const w = els.canvas.width;
    const h = els.canvas.height;
    const bg = state.background;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);
    if (bg && bg.el) {
      coverDraw(bg.el, 0, 0, w, h);
      ctx.fillStyle = 'rgba(0,0,0,0.54)';
      ctx.fillRect(0, 0, w, h);
    }
    const accent = els.brandColor.value;
    const grad = ctx.createRadialGradient(w * 0.48, h * 0.3, 20, w * 0.48, h * 0.3, w * 0.8);
    grad.addColorStop(0, accent + '33');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
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

  function drawCards(cards, mode) {
    const w = els.canvas.width;
    const h = els.canvas.height;
    const count = cards.length;
    const cardW = mode === 'reveal' ? 270 : clamp(118 - count * 1.4, 84, 118);
    const cardH = cardW * 1.42;
    if (mode === 'reveal') {
      const x = w / 2 - cardW / 2;
      const y = h / 2 - cardH / 2 + 28;
      drawAsset(cards[0].asset, x, y, cardW, cardH);
      ctx.fillStyle = 'rgba(255,255,255,0.94)';
      ctx.font = '900 38px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ESTABAS PENSANDO EN', w / 2, y - 52);
      ctx.fillStyle = els.brandColor.value;
      ctx.font = '900 28px Inter, Arial';
      ctx.fillText(cards[0].asset.name, w / 2, y + cardH + 48);
      return;
    }

    const cols = count > 14 ? 5 : 4;
    const rows = Math.ceil(count / cols);
    const gapX = 26;
    const gapY = 24;
    const totalW = cols * cardW + (cols - 1) * gapX;
    const totalH = rows * cardH + (rows - 1) * gapY;
    const startX = w / 2 - totalW / 2;
    const startY = mode === 'pick' ? 150 : 142;
    cards.forEach((card, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const float = Math.sin(performance.now() * 0.0015 + index) * 4;
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY) + float;
      drawAsset(card.asset, x, y, cardW, cardH);
      ctx.fillStyle = 'rgba(0,0,0,0.58)';
      roundedRect(x + 8, y + cardH - 30, cardW - 16, 22, 10);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '800 12px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText(String(card.binaryValue).padStart(2, '0'), x + cardW / 2, y + cardH - 18);
    });
  }

  function drawFooterText() {
    const h = els.canvas.height;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '900 24px Inter, Arial';
    if (state.phase === 'pick') {
      ctx.fillText('Piensa una carta. No la pulses. Solo recuerdala.', els.canvas.width / 2, h - 70);
    } else if (state.phase === 'question') {
      ctx.fillText('Esta aqui tu imagen?', els.canvas.width / 2, h - 78);
      ctx.fillStyle = 'rgba(255,255,255,0.68)';
      ctx.font = '800 16px Inter, Arial';
      ctx.fillText('Mano izquierda o boton NO. Mano derecha o boton SI.', els.canvas.width / 2, h - 48);
    } else {
      ctx.fillText(els.campaignClaim.value || 'Has desbloqueado tu seleccion secreta', els.canvas.width / 2, h - 74);
      ctx.fillStyle = els.brandColor.value;
      ctx.font = '900 18px Inter, Arial';
      ctx.fillText(els.campaignCta.value || 'Escanea y consigue tu ventaja exclusiva', els.canvas.width / 2, h - 44);
    }
  }

  function drawGestureOverlay() {
    if (!state.cameraActive || state.phase !== 'question') return;
    const w = els.canvas.width;
    const h = els.canvas.height;
    ctx.save();
    ctx.globalAlpha = 0.13;
    ctx.fillStyle = '#ff4d6d';
    ctx.fillRect(0, 0, w / 2, h);
    ctx.fillStyle = '#00ffcc';
    ctx.fillRect(w / 2, 0, w / 2, h);
    ctx.restore();
  }

  function draw() {
    drawBackground();
    drawGestureOverlay();
    drawHeader();
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
      toast('Camara activa: mueve la mano a la izquierda para NO o a la derecha para SI.');
      requestAnimationFrame(analyzeGestureMotion);
    } catch (err) {
      state.cameraActive = false;
      els.cameraBtn.textContent = 'Activar gestos';
      els.gesturePill.textContent = 'Gestos error';
      els.gesturePill.className = 'pill is-warn';
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
    if (state.phase !== 'question') return;
    const now = performance.now();
    if (now - state.lastGestureAt < 700) return;
    const rect = els.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const yes = x > rect.width / 2;
    state.lastGestureAt = now;
    answer(yes);
  }

  function analyzeGestureMotion() {
    if (!state.cameraActive) return;
    requestAnimationFrame(analyzeGestureMotion);
    if (state.phase !== 'question') return;
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
    let right = 0;
    const data = frame.data;
    const prev = state.lastFrame.data;
    for (let y = 0; y < gh; y += 3) {
      for (let x = 0; x < gw; x += 3) {
        const i = (y * gw + x) * 4;
        const diff = Math.abs(data[i] - prev[i]) + Math.abs(data[i + 1] - prev[i + 1]) + Math.abs(data[i + 2] - prev[i + 2]);
        if (diff < 42) continue;
        if (x < gw / 2) left += diff;
        else right += diff;
      }
    }
    state.lastFrame = frame;

    const total = left + right;
    if (total < 22000) return;
    if (left > right * 1.28) {
      state.lastGestureAt = now;
      toast('Gesto detectado: NO');
      answer(false);
    } else if (right > left * 1.28) {
      state.lastGestureAt = now;
      toast('Gesto detectado: SI');
      answer(true);
    }
  }

  function downloadPoster() {
    const link = document.createElement('a');
    link.download = `magic-card-mentalism-${Date.now()}.png`;
    link.href = els.canvas.toDataURL('image/png');
    link.click();
    els.qaOutput.textContent = 'Salida: PNG recuerdo descargado';
  }

  function loadSingle(file, assign) {
    if (!file) {
      assign(null);
      return;
    }
    assign(createAssetFromFile(file));
  }

  els.cardFiles.addEventListener('change', () => {
    state.cardAssets.forEach((asset) => asset.url && URL.revokeObjectURL(asset.url));
    state.cardAssets = uniqueAssets(els.cardFiles.files);
    resetTrick();
  });
  els.logoFile.addEventListener('change', () => loadSingle(els.logoFile.files[0], (asset) => { state.logo = asset; }));
  els.backgroundFile.addEventListener('change', () => loadSingle(els.backgroundFile.files[0], (asset) => { state.background = asset; }));
  els.cardCount.addEventListener('input', resetTrick);
  els.allowPlaceholders.addEventListener('change', resetTrick);
  els.startBtn.addEventListener('click', startTrick);
  els.yesBtn.addEventListener('click', () => answer(true));
  els.noBtn.addEventListener('click', () => answer(false));
  els.resetBtn.addEventListener('click', resetTrick);
  els.downloadBtn.addEventListener('click', downloadPoster);
  els.cameraBtn.addEventListener('click', toggleCamera);
  els.canvas.addEventListener('pointerdown', handleCanvasPointer);
  els.fullscreenBtn.addEventListener('click', () => els.stageShell.classList.toggle('is-fullscreen'));
  ['campaignName', 'campaignClaim', 'campaignCta', 'brandColor'].forEach((id) => {
    els[id].addEventListener('input', () => {});
  });

  resetTrick();
  draw();
})();
