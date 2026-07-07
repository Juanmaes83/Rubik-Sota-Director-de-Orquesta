(function () {
  const demoItems = [
    ['Neon Runner X', 'runner', '189 EUR', 'limited', '#d8ff3e'],
    ['Black Court Phantom', 'court', '149 EUR', 'limited', '#111827'],
    ['Retro Pulse 90', 'lifestyle', '129 EUR', 'classic', '#ef4444'],
    ['Cloud Foam White', 'runner', '99 EUR', 'open', '#f8fafc'],
    ['Desert Track Low', 'trail', '139 EUR', 'open', '#b59f76'],
    ['Redline High', 'basket', '159 EUR', 'limited', '#dc2626'],
    ['Silver Metro Runner', 'runner', '179 EUR', 'premium', '#c0c0c0'],
    ['Midnight Suede', 'lifestyle', '135 EUR', 'classic', '#1e1b4b'],
    ['Acid Green Drop', 'skate', '120 EUR', 'limited', '#84cc16'],
    ['Vintage Gum Sole', 'lifestyle', '110 EUR', 'open', '#a16207'],
    ['Tech Knit Carbon', 'runner', '199 EUR', 'premium', '#334155'],
    ['Blue Orbit', 'basket', '155 EUR', 'limited', '#2563eb'],
    ['Cream Street Pro', 'lifestyle', '125 EUR', 'open', '#f5f5dc'],
    ['Shadow Skate', 'skate', '115 EUR', 'classic', '#27272a'],
    ['Gold Tag Limited', 'collector', '249 EUR', 'limited', '#d4af37'],
    ['Concrete Runner', 'runner', '135 EUR', 'open', '#737373'],
    ['Studio Volt High', 'basket', '169 EUR', 'premium', '#f97316'],
    ['Glass Sole Ghost', 'runner', '210 EUR', 'limited', '#67e8f9'],
    ['Velvet Night Low', 'lifestyle', '145 EUR', 'classic', '#581c87'],
    ['Archive Gum Pro', 'skate', '130 EUR', 'open', '#92400e']
  ].map((row, index) => ({
    id: `sneaker_${index + 1}`,
    index,
    binaryValue: index + 1,
    name: row[0],
    title: row[0],
    category: row[1],
    price: row[2],
    rarity: row[3],
    color: row[4],
    tags: [row[1], row[3]],
    cta: { label: 'Entrar al drop', href: '#' },
    rewardType: row[3] === 'limited' ? 'drop_access' : row[1] === 'lifestyle' ? 'outfit' : row[2].startsWith('9') ? 'coupon' : 'product'
  }));

  const els = [
    'stage', 'grid', 'phasePill', 'hostLine', 'rewardPanel', 'progress', 'question', 'microcopy',
    'brandName', 'campaignClaim', 'campaignCta', 'dropName', 'brandColor', 'assetFiles',
    'logoFile', 'backgroundFile', 'itemCount', 'itemCountLabel', 'allowPlaceholders', 'assetStatus',
    'startBtn', 'secretBtn', 'noBtn', 'yesBtn', 'downloadBtn', 'resetBtn', 'cameraBtn', 'cameraVideo', 'toast'
  ].reduce((acc, id) => {
    acc[id] = document.getElementById(id);
    return acc;
  }, {});

  const state = {
    assets: [],
    logo: null,
    background: null,
    deck: [],
    session: null,
    phase: 'attract',
    revealItem: null,
    reward: null,
    lastPointer: 0
  };

  const runtime = window.ZoltanGestureRuntime;
  runtime.init({
    videoEl: els.cameraVideo,
    stageEl: els.stage,
    mode: 'yesno',
    enableKeyboard: true,
    enablePointer: false,
    privacyMessage: 'La cámara se usa solo para detectar gestos en este dispositivo. No se graba vídeo ni se envían imágenes.',
    gestureCooldownMs: 900,
    minConfidence: 0.28
  });

  runtime.onGesture((event, detail) => {
    if (event === 'CAMERA_READY') {
      toast('Camara activa: izquierda NO, derecha SI.');
      els.cameraBtn.textContent = 'Cámara activa';
      els.cameraBtn.classList.add('is-active');
    } else if (event === 'CAMERA_ERROR') {
      toast('Camara no disponible. Sigue con touch o botones.');
      els.cameraBtn.textContent = 'Cámara no disponible';
      els.cameraBtn.classList.remove('is-active');
    } else if (event === 'YES') {
      answer(true, detail.source || 'camera');
    } else if (event === 'NO') {
      answer(false, detail.source || 'camera');
    }
  });

  const HOST = {
    attract: ['Piensa una sneaker. No la digas. Si el oraculo acierta, el drop se abre.', 'Hay un par en este muro que ya lleva tu nombre.', 'Elige mentalmente. El drop detecta senales.'],
    pick: ['Elige una en tu mente. El drop detectara tu huella.', 'Mira el muro. Una sneaker te esta llamando.', 'Sin tocar. Sin senalar. Solo hype.'],
    question: ['Izquierda NO. Derecha SI. Touch o botones.', 'Responde rapido. El drop no espera.', 'NO a la izquierda. SI a la derecha. Facil.'],
    tension: ['Tu eleccion acaba de dejar huella.', 'El muro se esta cerrando. Tu par esta claro.', 'Acceso calculandose. Sin QR falso.'],
    reveal: ['El oraculo ha encontrado tu sneaker.', 'Ese par era inevitable. Lo sabias.', 'Drop desbloqueado. Tu senal ha abierto una accion.'],
    reward: ['Pase local listo. Guarda, copia o descarga.', 'Esto es tuyo. Antes de que se agote.', 'Tu hype acaba de convertirse en pase.']
  };

  function track(name, payload) {
    if (window.ZoltanAnalytics) window.ZoltanAnalytics.track(name, Object.assign({ module: 'zoltan-sneaker-drop-oracle' }, payload || {}));
  }

  function toast(text) {
    els.toast.textContent = text;
    els.toast.classList.add('on');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => els.toast.classList.remove('on'), 2200);
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hostLine(phase, index) {
    const lines = HOST[phase] || HOST.attract;
    return lines[(index || 0) % lines.length];
  }

  function flashStage(type) {
    const flash = document.createElement('div');
    flash.className = `stage-flash stage-flash--${type}`;
    flash.setAttribute('aria-hidden', 'true');
    els.stage.appendChild(flash);
    requestAnimationFrame(() => flash.classList.add('is-active'));
    setTimeout(() => {
      flash.classList.remove('is-active');
      setTimeout(() => flash.remove(), 350);
    }, 180);
  }

  function buildDeck() {
    const intake = window.ZoltanAssetIntake;
    const requested = clamp(parseInt(els.itemCount.value, 10) || 16, 8, 20);
    els.itemCount.value = requested;
    els.itemCountLabel.textContent = `${requested} sneakers`;
    const normalized = intake ? intake.normalizeAssetsForDeck(state.assets, requested, els.allowPlaceholders.checked) : null;
    const contract = normalized ? normalized.contract : { ok: true, message: `Medios cargados: ${state.assets.length}/${requested}.` };
    const deckAssets = normalized ? normalized.deckAssets : state.assets.slice(0, requested);
    const source = demoItems.slice(0, requested);

    state.deck = source.map((item, index) => {
      const asset = deckAssets[index] || null;
      return Object.assign({}, item, {
        index,
        binaryValue: index + 1,
        id: asset && !asset.placeholder ? `media_${asset.id}` : item.id,
        name: asset && !asset.placeholder ? asset.name : asset && asset.placeholder ? asset.name : item.name,
        title: asset && !asset.placeholder ? asset.name : item.title,
        asset,
        cta: { label: els.campaignCta.value || item.cta.label, href: '#' }
      });
    });

    const created = window.ZoltanSelectionEngine.createDeck(state.deck, { minItems: 8, maxItems: 20 });
    if (created.ok) state.deck = created.deck;
    els.assetStatus.textContent = contract.message;
    els.assetStatus.classList.toggle('is-ok', contract.ok);
    els.assetStatus.classList.toggle('is-error', !contract.ok);
    els.startBtn.disabled = !contract.ok;
    document.documentElement.style.setProperty('--accent', els.brandColor.value);
    applyBackground();
    track('zoltan_sneaker_asset_contract', { required: requested, uploaded: state.assets.length, ok: contract.ok });
    render();
    updateCopy();
    return contract.ok;
  }

  function applyBackground() {
    if (state.background && state.background.url) {
      els.stage.style.backgroundImage = `linear-gradient(rgba(6,6,6,.62), rgba(6,6,6,.72)), url("${state.background.url}")`;
      els.stage.style.backgroundSize = 'cover';
      els.stage.style.backgroundPosition = 'center';
    } else {
      els.stage.style.backgroundImage = '';
    }
  }

  function setPhase(next) {
    state.phase = next;
    document.body.dataset.phase = state.phase;
    els.stage.classList.toggle('is-question', state.phase === 'question');
    els.stage.classList.toggle('is-tension', state.phase === 'tension');
    els.stage.classList.toggle('is-reveal', state.phase === 'reveal');
    updateCopy();
    updateButtons();
    render();
  }

  function currentItems() {
    if (state.phase === 'question') return window.ZoltanSelectionEngine.getQuestionGroup(state.session);
    if (state.phase === 'reveal' && state.revealItem) return [state.revealItem];
    return state.deck;
  }

  function updateCopy() {
    els.phasePill.textContent = state.phase.toUpperCase();
    if (state.phase === 'attract') {
      els.hostLine.textContent = hostLine('attract', 0);
      els.progress.textContent = 'Drop cerrado';
      els.question.textContent = `Piensa una sneaker de ${els.dropName.value || 'este drop'}. No la pulses.`;
      els.microcopy.textContent = els.campaignClaim.value || 'Si la senal coincide, desbloqueas acceso.';
    }
    if (state.phase === 'pick') {
      els.hostLine.textContent = hostLine('pick', 0);
      els.progress.textContent = 'Paso 1';
      els.question.textContent = 'Mira el muro y piensa una sneaker.';
      els.microcopy.textContent = 'Cuando la tengas, pulsa el boton.';
    }
    if (state.phase === 'question') {
      els.hostLine.textContent = hostLine('question', state.session.currentBit);
      els.progress.textContent = `Lectura ${state.session.currentBit + 1} de ${state.session.maxBits}`;
      els.question.textContent = 'Tu sneaker aparece aqui?';
      els.microcopy.textContent = ['El drop esta buscando coincidencias.', 'Cada respuesta acerca el pase.', 'Tu huella esta en el muro.'][state.session.currentBit % 3];
    }
    if (state.phase === 'tension') {
      els.hostLine.textContent = hostLine('tension', 0);
      els.progress.textContent = 'Acceso calculandose';
      els.question.textContent = 'El drop se esta abriendo.';
      els.microcopy.textContent = 'No hay QR falso: el pase sera local y descargable.';
    }
    if (state.phase === 'reveal') {
      els.hostLine.textContent = hostLine('reveal', 0);
      els.progress.textContent = 'Pase desbloqueado';
      els.question.textContent = `Estabas pensando en: ${state.revealItem.name}`;
      els.microcopy.textContent = hostLine('reward', 0);
    }
  }

  function updateButtons() {
    els.startBtn.classList.toggle('hidden', state.phase !== 'attract');
    els.secretBtn.classList.toggle('hidden', state.phase !== 'pick');
    els.noBtn.disabled = state.phase !== 'question';
    els.yesBtn.disabled = state.phase !== 'question';
    els.downloadBtn.disabled = state.phase !== 'reveal';
  }

  function mediaMarkup(item) {
    if (item.asset && item.asset.type === 'image') return `<img src="${escapeHtml(item.asset.url)}" alt="${escapeHtml(item.name)}" />`;
    if (item.asset && item.asset.type === 'video') return `<video src="${escapeHtml(item.asset.url)}" muted autoplay loop playsinline></video>`;
    if (item.asset && item.asset.placeholder) return `<div class="shoe is-placeholder">P${item.index + 1}</div>`;
    return `<div class="shoe">S${item.index + 1}</div>`;
  }

  function card(item) {
    const tilt = ((item.index % 5) - 2) * 1.2;
    return `<article class="card ${state.phase === 'reveal' ? 'reveal' : ''}" style="--c:${item.color};--tilt:${tilt}deg"><div class="media">${mediaMarkup(item)}</div><div class="body"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.category)} · ${escapeHtml(item.price)}</span><small>${escapeHtml(item.rarity)} · ${escapeHtml(item.rewardType)}</small></div></article>`;
  }

  function render() {
    els.grid.innerHTML = currentItems().map(card).join('');
    if (state.reward && window.ZoltanRewardLayer) {
      window.ZoltanRewardLayer.renderRewardCard(els.rewardPanel, state.reward, { item: state.revealItem });
    } else {
      els.rewardPanel.innerHTML = '<span>Reward</span><strong>Aun no hay pase.</strong><p>Completa el ritual para desbloquear acceso, wishlist o codigo.</p>';
    }
  }

  function start() {
    if (!buildDeck()) {
      toast('Deck bloqueado: faltan medios o placeholders visibles.');
      return;
    }
    state.session = window.ZoltanSelectionEngine.createSession(state.deck);
    state.revealItem = null;
    state.reward = null;
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.startSession('zoltan-sneaker-drop-oracle');
    track('zoltan_sneaker_started', { count: state.deck.length, customAssets: state.assets.length });
    setPhase('pick');
  }

  function begin() {
    state.session = window.ZoltanSelectionEngine.resetSession(state.session);
    setPhase('question');
  }

  function answer(yes, source) {
    if (state.phase !== 'question') return;
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.recordInteraction('answer', { answer: yes ? 'yes' : 'no', source });
    flashStage(yes ? 'ok' : 'danger');
    state.session = window.ZoltanSelectionEngine.answerCurrentQuestion(state.session, yes);
    track('zoltan_sneaker_answered', { answer: yes ? 'yes' : 'no', source });
    if (state.session.phase === 'reveal') {
      setPhase('tension');
      setTimeout(reveal, 1650);
    } else {
      render();
      updateCopy();
    }
  }

  function reveal() {
    const result = window.ZoltanSelectionEngine.getReveal(state.session);
    state.revealItem = result.ok ? result.item : state.deck[0];
    state.reward = window.ZoltanRewardLayer.createReward(state.revealItem, {
      type: state.revealItem.rewardType,
      title: `${els.dropName.value || 'Drop'}: ${state.revealItem.name}`,
      subtitle: `${state.revealItem.rarity}. ${els.campaignClaim.value || 'Tu senal ha abierto una accion.'}`,
      description: hostLine('reward', 0),
      image: state.revealItem.asset || null,
      accentColor: els.brandColor.value || state.revealItem.color,
      primaryAction: { label: els.campaignCta.value || 'Entrar al drop', type: 'save', href: null },
      metadata: { module: 'zoltan-sneaker-drop-oracle', sector: 'sneaker', campaign: els.brandName.value, selectedItemId: state.revealItem.id }
    });
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.endSession({ revealed: true });
    track('zoltan_sneaker_revealed', { item: state.revealItem.id, hasAsset: !!state.revealItem.asset });
    setPhase('reveal');
    toast('Drop desbloqueado.');
  }

  function download() {
    if (state.reward) window.ZoltanRewardLayer.exportRewardPng(state.reward, { filename: `zoltan-sneaker-drop-${Date.now()}.png` });
  }

  function reset() {
    state.session = null;
    state.revealItem = null;
    state.reward = null;
    runtime.stopCamera();
    els.cameraBtn.textContent = 'Activar cámara opcional';
    els.cameraBtn.classList.remove('is-active');
    setPhase('attract');
  }

  async function toggleCamera() {
    const runtimeState = runtime.getState();
    if (runtimeState.cameraActive) {
      runtime.stopCamera();
      els.cameraBtn.textContent = 'Activar cámara opcional';
      els.cameraBtn.classList.remove('is-active');
      return;
    }
    els.cameraBtn.textContent = 'Activando...';
    const ok = await runtime.startCamera();
    if (!ok) {
      els.cameraBtn.textContent = 'Cámara no disponible';
      els.cameraBtn.classList.remove('is-active');
    }
  }

  function loadSingle(file, key) {
    if (state[key] && window.ZoltanAssetIntake) window.ZoltanAssetIntake.revokeAsset(state[key]);
    state[key] = file && window.ZoltanAssetIntake ? window.ZoltanAssetIntake.createAssetFromFile(file) : null;
    applyBackground();
    render();
  }

  els.assetFiles.addEventListener('change', () => {
    if (window.ZoltanAssetIntake) window.ZoltanAssetIntake.revokeAssets(state.assets);
    state.assets = Array.from(els.assetFiles.files || []).map((file, index) => window.ZoltanAssetIntake.createAssetFromFile(file, index));
    reset();
    buildDeck();
  });
  els.logoFile.addEventListener('change', () => loadSingle(els.logoFile.files[0], 'logo'));
  els.backgroundFile.addEventListener('change', () => loadSingle(els.backgroundFile.files[0], 'background'));
  els.itemCount.addEventListener('input', buildDeck);
  els.allowPlaceholders.addEventListener('change', buildDeck);
  [els.brandName, els.campaignClaim, els.campaignCta, els.dropName, els.brandColor].forEach((el) => {
    el.addEventListener('input', buildDeck);
  });
  els.startBtn.addEventListener('click', start);
  els.secretBtn.addEventListener('click', begin);
  els.yesBtn.addEventListener('click', () => runtime.emitChoice(true, { source: 'button' }));
  els.noBtn.addEventListener('click', () => runtime.emitChoice(false, { source: 'button' }));
  els.downloadBtn.addEventListener('click', download);
  els.resetBtn.addEventListener('click', reset);
  els.cameraBtn.addEventListener('click', toggleCamera);
  els.stage.addEventListener('pointerdown', (event) => {
    if (state.phase !== 'question' || Date.now() - state.lastPointer < 650) return;
    state.lastPointer = Date.now();
    const rect = els.stage.getBoundingClientRect();
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.recordFallback(event.pointerType || 'pointer-zone');
    runtime.emitChoice(event.clientX - rect.left > rect.width / 2, { source: event.pointerType || 'pointer-zone' });
  });
  window.addEventListener('beforeunload', () => {
    runtime.destroy();
    if (window.ZoltanAssetIntake) {
      window.ZoltanAssetIntake.revokeAssets(state.assets);
      window.ZoltanAssetIntake.revokeAsset(state.logo);
      window.ZoltanAssetIntake.revokeAsset(state.background);
    }
  });
  window.__ZOLTAN_SNEAKER_QA__ = () => state.deck.map((item) => {
    let s = window.ZoltanSelectionEngine.createSession(state.deck);
    for (let bit = 0; bit < s.maxBits; bit += 1) s = window.ZoltanSelectionEngine.answerCurrentQuestion(s, (item.binaryValue & (1 << bit)) !== 0);
    const result = window.ZoltanSelectionEngine.getReveal(s);
    return { item: item.id, asset: item.asset ? item.asset.name : null, ok: result.ok && result.item.id === item.id };
  });

  track('zoltan_sneaker_loaded');
  buildDeck();
  updateButtons();
})();
