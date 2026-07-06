(function () {
  const demoItems = [
    ['Ruta del atardecer', 'romantica', '2h', 'calma', '#f59e0b'],
    ['Camino de calas secretas', 'naturaleza', '4h', 'descubrimiento', '#06b6d4'],
    ['Tour gastronomico local', 'gastronomia', '3h', 'sabroso', '#ef4444'],
    ['Paseo historico nocturno', 'cultura', '2h', 'misterio', '#6366f1'],
    ['Mirador de la ciudad', 'urbano', '90m', 'panoramico', '#0ea5e9'],
    ['Experiencia wellness', 'wellness', '3h', 'reset', '#22c55e'],
    ['Ruta familiar', 'familia', '4h', 'facil', '#facc15'],
    ['Aventura activa', 'aventura', '5h', 'energia', '#f97316'],
    ['Arte y museos', 'cultura', '3h', 'inspiracion', '#a855f7'],
    ['Mercado y tradicion', 'local', '2h', 'autentico', '#84cc16'],
    ['Escapada romantica', 'romantica', '24h', 'intimo', '#ec4899'],
    ['Naturaleza interpretativa', 'naturaleza', '4h', 'aprendizaje', '#10b981'],
    ['Ruta fotografica', 'creativa', '3h', 'visual', '#38bdf8'],
    ['Plan premium 24h', 'premium', '24h', 'lujo', '#d4af37'],
    ['Circuito en bici', 'aventura', '3h', 'movimiento', '#14b8a6'],
    ['Experiencia de barrio', 'local', '2h', 'cercano', '#fb7185'],
    ['Noche de rooftop', 'premium', '4h', 'social', '#818cf8'],
    ['Mapa secreto gourmet', 'gastronomia', '5h', 'sorpresa', '#fb923c'],
    ['Ruta de arquitectura', 'cultura', '3h', 'lineal', '#94a3b8'],
    ['Escape costero', 'naturaleza', '8h', 'aire', '#2dd4bf']
  ].map((row, index) => ({
    id: `route_${index + 1}`,
    index,
    binaryValue: index + 1,
    name: row[0],
    title: row[0],
    category: row[1],
    duration: row[2],
    mood: row[3],
    difficulty: index % 4 === 0 ? 'media' : 'facil',
    color: row[4],
    tags: [row[1], row[3]],
    price: 'Demo',
    cta: { label: 'Ver ruta', href: '#' },
    rewardType: row[1] === 'premium' ? 'generic_cta' : 'route'
  }));

  const els = [
    'stage', 'grid', 'phasePill', 'hostLine', 'rewardPanel', 'progress', 'question', 'microcopy',
    'brandName', 'campaignClaim', 'campaignCta', 'routeCollection', 'brandColor', 'assetFiles',
    'logoFile', 'backgroundFile', 'itemCount', 'itemCountLabel', 'allowPlaceholders', 'assetStatus',
    'startBtn', 'secretBtn', 'noBtn', 'yesBtn', 'downloadBtn', 'resetBtn', 'toast'
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

  const HOST = {
    attract: ['No eliges destino. El destino te elige a ti.', 'Piensa una ruta. La brujula ya esta escuchando.', 'Hay una experiencia aqui que lleva tu nombre.'],
    pick: ['Piensa una. No la pulses. La brujula ya esta escuchando.', 'Mira las rutas. Una de ellas te respondera.', 'Elige en silencio. El viaje empieza antes de salir.'],
    question: ['Izquierda NO. Derecha SI. Touch o botones.', 'Responde con calma. La brujula no se apura.', 'NO a la izquierda. SI a la derecha.'],
    tension: ['Tu destino esta tomando forma.', 'La brujula se cierra. Tu ruta esta clara.', 'La senal ya tiene direccion.'],
    reveal: ['El destino ha respondido.', 'Aqui esta tu ruta. No es casualidad.', 'La brujula ha decidido. Ahora te toca a ti.'],
    reward: ['Guarda, copia o descarga tu tarjeta.', 'Tu itinerario local listo para compartir.', 'El destino acaba de volverse accionable.']
  };

  function track(name, payload) {
    if (window.ZoltanAnalytics) window.ZoltanAnalytics.track(name, Object.assign({ module: 'zoltan-travel-destiny-oracle' }, payload || {}));
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
    els.itemCountLabel.textContent = `${requested} rutas`;
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
    track('zoltan_travel_asset_contract', { required: requested, uploaded: state.assets.length, ok: contract.ok });
    render();
    updateCopy();
    return contract.ok;
  }

  function applyBackground() {
    if (state.background && state.background.url) {
      els.stage.style.backgroundImage = `linear-gradient(rgba(3,9,15,.58), rgba(3,9,15,.72)), url("${state.background.url}")`;
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
      els.progress.textContent = 'Brujula dormida';
      els.question.textContent = `Piensa una ruta de ${els.routeCollection.value || 'esta coleccion'}.`;
      els.microcopy.textContent = els.campaignClaim.value || 'La marca convierte una idea en itinerario accionable.';
    }
    if (state.phase === 'pick') {
      els.hostLine.textContent = hostLine('pick', 0);
      els.progress.textContent = 'Paso 1';
      els.question.textContent = 'Mira las experiencias y elige una en tu mente.';
      els.microcopy.textContent = 'Cuando la tengas, empieza la lectura.';
    }
    if (state.phase === 'question') {
      els.hostLine.textContent = hostLine('question', state.session.currentBit);
      els.progress.textContent = `Lectura ${state.session.currentBit + 1} de ${state.session.maxBits}`;
      els.question.textContent = 'Tu experiencia aparece aqui?';
      els.microcopy.textContent = ['La brujula se esta cerrando.', 'Cada respuesta dibuja el camino.', 'Tu ruta esta a punto de revelarse.'][state.session.currentBit % 3];
    }
    if (state.phase === 'tension') {
      els.hostLine.textContent = hostLine('tension', 0);
      els.progress.textContent = 'Ruta revelandose';
      els.question.textContent = 'La senal ya tiene direccion.';
      els.microcopy.textContent = 'El resultado acaba en accion, no en demo.';
    }
    if (state.phase === 'reveal') {
      els.hostLine.textContent = hostLine('reveal', 0);
      els.progress.textContent = 'Ruta desbloqueada';
      els.question.textContent = `Tu ruta es: ${state.revealItem.name}`;
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
    if (item.asset && item.asset.placeholder) return `<div class="route is-placeholder">P${item.index + 1}</div>`;
    return `<div class="route">R${item.index + 1}</div>`;
  }

  function card(item) {
    const tilt = ((item.index % 5) - 2) * 1.2;
    return `<article class="card ${state.phase === 'reveal' ? 'reveal' : ''}" style="--c:${item.color};--tilt:${tilt}deg"><div class="media">${mediaMarkup(item)}</div><div class="body"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.category)} · ${escapeHtml(item.duration)}</span><small>${escapeHtml(item.mood)} · ${escapeHtml(item.difficulty)}</small></div></article>`;
  }

  function render() {
    els.grid.innerHTML = currentItems().map(card).join('');
    if (state.reward && window.ZoltanRewardLayer) {
      window.ZoltanRewardLayer.renderRewardCard(els.rewardPanel, state.reward, { item: state.revealItem });
    } else {
      els.rewardPanel.innerHTML = '<span>Itinerario</span><strong>Aun no hay ruta.</strong><p>Completa la lectura para guardar una tarjeta accionable.</p>';
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
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.startSession('zoltan-travel-destiny-oracle');
    track('zoltan_travel_started', { count: state.deck.length, customAssets: state.assets.length });
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
    track('zoltan_travel_answered', { answer: yes ? 'yes' : 'no', source });
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
      title: `${els.routeCollection.value || 'Travel Destiny'}: ${state.revealItem.name}`,
      subtitle: `${state.revealItem.duration}. ${els.campaignClaim.value || 'El destino acaba de volverse accionable.'}`,
      description: hostLine('reward', 0),
      image: state.revealItem.asset || null,
      accentColor: els.brandColor.value || state.revealItem.color,
      primaryAction: { label: els.campaignCta.value || 'Reservar experiencia', type: 'save', href: null },
      metadata: { module: 'zoltan-travel-destiny-oracle', sector: 'travel', campaign: els.brandName.value, selectedItemId: state.revealItem.id }
    });
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.endSession({ revealed: true });
    track('zoltan_travel_revealed', { item: state.revealItem.id, hasAsset: !!state.revealItem.asset });
    setPhase('reveal');
    toast('Ruta desbloqueada.');
  }

  function download() {
    if (state.reward) window.ZoltanRewardLayer.exportRewardPng(state.reward, { filename: `zoltan-travel-destiny-${Date.now()}.png` });
  }

  function reset() {
    state.session = null;
    state.revealItem = null;
    state.reward = null;
    setPhase('attract');
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
  [els.brandName, els.campaignClaim, els.campaignCta, els.routeCollection, els.brandColor].forEach((el) => {
    el.addEventListener('input', buildDeck);
  });
  els.startBtn.addEventListener('click', start);
  els.secretBtn.addEventListener('click', begin);
  els.yesBtn.addEventListener('click', () => answer(true, 'button'));
  els.noBtn.addEventListener('click', () => answer(false, 'button'));
  els.downloadBtn.addEventListener('click', download);
  els.resetBtn.addEventListener('click', reset);
  els.stage.addEventListener('pointerdown', (event) => {
    if (state.phase !== 'question' || Date.now() - state.lastPointer < 650) return;
    state.lastPointer = Date.now();
    const rect = els.stage.getBoundingClientRect();
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.recordFallback(event.pointerType || 'pointer-zone');
    answer(event.clientX - rect.left > rect.width / 2, 'zone');
  });
  window.addEventListener('beforeunload', () => {
    if (window.ZoltanAssetIntake) {
      window.ZoltanAssetIntake.revokeAssets(state.assets);
      window.ZoltanAssetIntake.revokeAsset(state.logo);
      window.ZoltanAssetIntake.revokeAsset(state.background);
    }
  });
  window.__ZOLTAN_TRAVEL_QA__ = () => state.deck.map((item) => {
    let session = window.ZoltanSelectionEngine.createSession(state.deck);
    for (let bit = 0; bit < session.maxBits; bit += 1) session = window.ZoltanSelectionEngine.answerCurrentQuestion(session, (item.binaryValue & (1 << bit)) !== 0);
    const result = window.ZoltanSelectionEngine.getReveal(session);
    return { item: item.id, asset: item.asset ? item.asset.name : null, ok: result.ok && result.item.id === item.id };
  });

  track('zoltan_travel_loaded');
  buildDeck();
  updateButtons();
})();
