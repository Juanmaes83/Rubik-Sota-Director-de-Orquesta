(function () {
  const PHASES = {
    ATTRACT: 'attract',
    PICK_SECRET: 'pick_secret',
    QUESTION: 'question',
    TENSION: 'tension',
    REVEAL: 'reveal',
    REWARD: 'reward',
    RESET: 'reset'
  };

  const els = {
    video: document.getElementById('cameraVideo'),
    stage: document.getElementById('stage'),
    productGrid: document.getElementById('productGrid'),
    phasePill: document.getElementById('phasePill'),
    progressLabel: document.getElementById('progressLabel'),
    questionText: document.getElementById('questionText'),
    hostLine: document.getElementById('hostLine'),
    microcopy: document.getElementById('microcopy'),
    brandName: document.getElementById('brandName'),
    campaignClaim: document.getElementById('campaignClaim'),
    campaignCta: document.getElementById('campaignCta'),
    brandColor: document.getElementById('brandColor'),
    hostTone: document.getElementById('hostTone'),
    sectorPreset: document.getElementById('sectorPreset'),
    productCount: document.getElementById('productCount'),
    productCountLabel: document.getElementById('productCountLabel'),
    productFiles: document.getElementById('productFiles'),
    logoFile: document.getElementById('logoFile'),
    backgroundFile: document.getElementById('backgroundFile'),
    allowPlaceholders: document.getElementById('allowPlaceholders'),
    mediaStatus: document.getElementById('mediaStatus'),
    cameraBtn: document.getElementById('cameraBtn'),
    startBtn: document.getElementById('startBtn'),
    secretBtn: document.getElementById('secretBtn'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    viewProductBtn: document.getElementById('viewProductBtn'),
    lookBtn: document.getElementById('lookBtn'),
    wishBtn: document.getElementById('wishBtn'),
    sendBtn: document.getElementById('sendBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    resetBtn: document.getElementById('resetBtn'),
    resultCard: document.getElementById('resultCard'),
    qaPanel: document.getElementById('qaPanel'),
    toast: document.getElementById('toast')
  };

  const HOSTS = {
    premium: { name: 'Madame Outfit', voice: 'elegante, intima, segura' },
    provocador: { name: 'Madame Outfit', voice: 'provocadora, complice, memorable' },
    divertido: { name: 'Madame Outfit', voice: 'divertida, energica, cercana' }
  };

  const toneCopies = {
    premium: {
      attract: ['Piensa una prenda. No la señales. ZOLTAN leera tu estilo.', 'Hay una pieza en este escaparate que ya te ha elegido.', 'Cierra los ojos un segundo. Tu armario sabe la respuesta.'],
      pick: ['Elige una en tu mente. No la pulses. La moda tambien deja huellas.', 'Mira cada prenda. Una de ellas te respondera.', 'Toma tu tiempo. La elegancia no se apura.'],
      tension: ['Tu estilo apunta a una pieza con intencion.', 'Estoy leyendo siluetas, texturas... y una decision.', 'La ultima pista acaba de caer.'],
      reveal: ['Tu estilo apunta a una pieza con intencion.', 'Era demasiado tu como para pasar desapercibida.', 'La moda no miente. Esta prenda te pertenece.'],
      reward: ['Ahora no lo niegues. Guardalo antes de que cambie de opinion.', 'Tu armario tiene un nuevo protagonista.', 'Esto es tuyo. El escaparate lo confirma.']
    },
    provocador: {
      attract: ['Piensa una prenda. Si la acierto, tu armario me debe una explicacion.', 'No me mires asi. Tu outfit ya ha confesado todo.', 'Hay una pieza aqui que te esta haciendo ojitos.'],
      pick: ['No hagas trampas. Esa chaqueta ya te esta mirando.', 'Elige en silencio. Las prendas tambien tienen memoria.', 'Si la piensas muy fuerte, la oigo.'],
      tension: ['Estoy viendo textura, color... y un poco de drama.', 'Alguien va a quedar mal con este reveal.', 'La sospecha ya tiene nombre.'],
      reveal: ['Lo sabia. Era demasiado tu como para esconderse.', 'Te pillé. Esta prenda llevaba tu nombre.', 'No hay secretos entre tu y este armario.'],
      reward: ['Ahora no lo niegues. Guardalo antes de que cambie de opinion.', 'Toma. Antes de que lo pienses dos veces.', 'La moda te ha elegido. No discutas.']
    },
    divertido: {
      attract: ['No la digas. No la pulses. Tu outfit ya esta gritando.', 'Piensa una prenda sin reirte. Apuesta que no puedes.', 'Tu armario tiene favorita. Vamos a pillarla.'],
      pick: ['Elige una prenda mentalmente. Tu armario acaba de ponerse nervioso.', 'Senala con la mente. Yo vigilo por aqui.', 'Una, dos, tres... ¿ya la tienes?'],
      tension: ['ZOLTAN esta reduciendo sospechosos con estilo.', 'Casi lo tengo. Tu look no puede mentir.', 'La cuenta atras ha empezado.'],
      reveal: ['Tu armario acaba de confesar.', '¡Ahi esta! Lo sabia desde el primer vistazo.', 'Esa prenda estaba rogando por salir.'],
      reward: ['Guárdala, compártela o presume. Tu outfit manda.', 'Mision cumplida. Tu armario aplaude.', 'Esto es puro estilo con tu nombre.']
    }
  };

  function hostLine(phase, index) {
    const tone = toneCopies[els.hostTone.value] || toneCopies.premium;
    const lines = tone[phase] || tone.attract;
    return lines[(index || 0) % lines.length];
  }

  const demoProducts = [
    ['Chaqueta cropped negra', 'Outerwear', '129 EUR', 'Noir estrategico', '#111827'],
    ['Vestido satinado rojo', 'Evening', '149 EUR', 'Drama elegante', '#b91c1c'],
    ['Sneaker blanca chunky', 'Sneakers', '119 EUR', 'Energia urbana', '#f8fafc'],
    ['Bolso mini dorado', 'Accesorios', '89 EUR', 'Brillo selectivo', '#d4af37'],
    ['Pantalon cargo beige', 'Pantalones', '99 EUR', 'Utilidad suave', '#b59f76'],
    ['Blazer oversize gris', 'Tailoring', '169 EUR', 'Autoridad relajada', '#6b7280'],
    ['Gafas futuristas', 'Accesorios', '79 EUR', 'Vision magnetica', '#38bdf8'],
    ['Falda denim', 'Denim', '69 EUR', 'Casual iconico', '#2563eb'],
    ['Camisa blanca premium', 'Camiseria', '95 EUR', 'Minimalismo caro', '#f9fafb'],
    ['Top metalizado', 'Party', '79 EUR', 'Flash nocturno', '#c0c0c0'],
    ['Abrigo largo camel', 'Outerwear', '219 EUR', 'Lujo silencioso', '#c19a6b'],
    ['Botas altas negras', 'Calzado', '159 EUR', 'Paso dominante', '#111111'],
    ['Sudadera grafica', 'Streetwear', '75 EUR', 'Identidad visible', '#7c3aed'],
    ['Anillo statement', 'Joyeria', '59 EUR', 'Detalle protagonista', '#eab308'],
    ['Trench tecnico', 'Outerwear', '189 EUR', 'Ciudad impermeable', '#94a3b8'],
    ['Look total black', 'Look completo', '299 EUR', 'Misterio editorial', '#020617'],
    ['Mono fluido verde', 'One piece', '135 EUR', 'Movimiento natural', '#047857'],
    ['Pañuelo estampado', 'Accesorios', '45 EUR', 'Acento narrativo', '#ec4899'],
    ['Chaleco sastre', 'Tailoring', '110 EUR', 'Capa inteligente', '#334155'],
    ['Sandalia arquitectonica', 'Calzado', '125 EUR', 'Linea de verano', '#f97316']
  ].map((item, index) => ({
    id: `demo-${index + 1}`,
    index,
    binaryValue: index + 1,
    name: item[0],
    category: item[1],
    price: item[2],
    stylePersona: item[3],
    color: item[4],
    cta: 'Ver disponibilidad',
    productUrl: '#',
    tags: [item[1], item[3]]
  }));

  const state = {
    phase: PHASES.ATTRACT,
    productCount: 16,
    products: [],
    productAssets: [],
    logo: null,
    background: null,
    maxBits: 0,
    currentBit: 0,
    answerBits: 0,
    questionProducts: [],
    reveal: null,
    engineSession: null,
    reward: null,
    cameraController: null,
    cameraActive: false,
    lastGestureAt: 0
  };

  function track(eventName, payload) {
    if (window.ZoltanAnalytics && window.ZoltanAnalytics.track) {
      window.ZoltanAnalytics.track(eventName, Object.assign({ module: 'zoltan-style-oracle' }, payload || {}));
    }
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => els.toast.classList.remove('is-visible'), 2600);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
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
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function assetKey(file) {
    return [file.name, file.size, file.type, file.lastModified].join('|');
  }

  function createAsset(file) {
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    const asset = {
      id: assetKey(file),
      name: file.name.replace(/\.[^.]+$/, ''),
      type: isVideo ? 'video' : 'image',
      url,
      el: null,
      ready: false,
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

  function uniqueFileAssets(files) {
    const seen = new Set();
    return Array.from(files || []).reduce((assets, file) => {
      const key = assetKey(file);
      if (!seen.has(key)) {
        seen.add(key);
        assets.push(createAsset(file));
      }
      return assets;
    }, []);
  }

  function revokeAsset(asset) {
    if (asset && asset.url) URL.revokeObjectURL(asset.url);
  }

  function makePlaceholder(index) {
    return {
      id: `placeholder-${index + 1}`,
      name: `Placeholder visible ${index + 1}`,
      type: 'placeholder',
      ready: true,
      placeholder: true,
      color: ['#222', '#555'][index % 2]
    };
  }

  function engineItems() {
    return state.products.map((product) => ({
      id: product.id,
      name: product.name,
      title: product.name,
      subtitle: product.stylePersona,
      category: product.category,
      color: product.color,
      tags: product.tags,
      price: product.price,
      cta: { label: product.cta, href: product.productUrl || '#' },
      rewardType: product.category === 'Look completo' ? 'outfit' : 'product'
    }));
  }

  function rebuildEngineSession() {
    if (!window.ZoltanSelectionEngine || !state.products.length) return;
    const created = window.ZoltanSelectionEngine.createDeck(engineItems(), { minItems: 8, maxItems: 20 });
    if (created.ok) {
      state.engineSession = window.ZoltanSelectionEngine.createSession(created.deck);
      state.maxBits = state.engineSession.maxBits;
    }
  }

  function buildDeck() {
    const requested = clamp(parseInt(els.productCount.value, 10) || 16, 8, 20);
    state.productCount = requested;
    els.productCount.value = requested;
    els.productCountLabel.textContent = `${requested} productos`;
    const custom = state.productAssets;
    const allowPlaceholders = els.allowPlaceholders.checked;
    let valid = true;
    let status = 'Deck demo listo: productos CSS editoriales sin imagen externa.';
    let assets = [];

    if (window.ZoltanAssetIntake) {
      const normalized = window.ZoltanAssetIntake.normalizeAssetsForDeck(custom, requested, allowPlaceholders);
      valid = normalized.contract.ok;
      status = normalized.contract.message;
      assets = normalized.deckAssets;
    } else if (!custom.length) {
      assets = [];
    } else if (custom.length === requested) {
      assets = custom.slice(0, requested);
      status = `Set personalizado valido: ${requested} imagenes/videos sin repeticion oculta.`;
    } else if (custom.length > requested) {
      assets = custom.slice(0, requested);
      status = `Set personalizado valido: se usan los primeros ${requested} medios.`;
    } else if (allowPlaceholders) {
      assets = custom.slice();
      while (assets.length < requested) assets.push(makePlaceholder(assets.length));
      status = `Set mixto: ${custom.length} medios + ${requested - custom.length} placeholders visibles.`;
    } else {
      valid = false;
      status = `Faltan ${requested - custom.length} medios. Sube exactamente ${requested} o activa placeholders visibles.`;
    }

    state.products = demoProducts.slice(0, requested).map((product, index) => {
      const asset = assets[index] || null;
      return Object.assign({}, product, {
        index,
        binaryValue: index + 1,
        asset,
        name: asset && !asset.placeholder ? asset.name : product.name
      });
    });
    state.maxBits = Math.ceil(Math.log(requested + 1) / Math.log(2));
    els.mediaStatus.textContent = status;
    els.mediaStatus.classList.toggle('is-ok', valid);
    els.mediaStatus.classList.toggle('is-error', !valid);
    els.startBtn.disabled = !valid;
    track('zoltan_style_oracle_product_set_loaded', { count: requested, customAssets: custom.length, valid });
    if (valid) rebuildEngineSession();
    render();
    return valid;
  }

  function questionGroup() {
    if (window.ZoltanSelectionEngine && state.engineSession) {
      return window.ZoltanSelectionEngine.getQuestionGroup(state.engineSession)
        .map((item) => state.products[item.index])
        .filter(Boolean);
    }
    const bit = 1 << state.currentBit;
    return state.products
      .filter((product) => (product.binaryValue & bit) !== 0)
      .sort((a, b) => ((a.binaryValue * 11 + bit) % 29) - ((b.binaryValue * 11 + bit) % 29));
  }

  function setPhase(phase) {
    state.phase = phase;
    document.body.dataset.phase = phase;
    els.stage.classList.toggle('is-question', phase === PHASES.QUESTION);
    els.stage.classList.toggle('is-tension', phase === PHASES.TENSION);
    els.stage.classList.toggle('is-reveal', phase === PHASES.REVEAL);
    updateCopy();
    updateButtons();
    render();
  }

  function updateCopy() {
    const host = HOSTS[els.hostTone.value] || HOSTS.premium;
    const label = state.phase.toUpperCase();
    els.phasePill.textContent = label;
    if (state.phase === PHASES.ATTRACT) {
      els.hostLine.textContent = hostLine('attract', 0);
      els.progressLabel.textContent = 'Lectura sin iniciar';
      els.questionText.textContent = 'Piensa una prenda. La encontraremos sin que la toques.';
      els.microcopy.textContent = `${host.name} lee tu estilo. Sin cámara obligatoria. Sin datos.`;
    } else if (state.phase === PHASES.PICK_SECRET) {
      els.hostLine.textContent = hostLine('pick', 0);
      els.progressLabel.textContent = 'Paso 1 · elige en silencio';
      els.questionText.textContent = 'Mira todas las prendas y piensa una. No la pulses.';
      els.microcopy.textContent = 'Cuando la tengas, pulsa "Ya la tengo".';
    } else if (state.phase === PHASES.QUESTION) {
      els.hostLine.textContent = 'Responde con mano izquierda para NO o derecha para SI. Tambien puedes tocar la zona.';
      els.progressLabel.textContent = `Lectura ${state.currentBit + 1} de ${state.maxBits}`;
      els.questionText.textContent = '¿Tu prenda aparece aqui?';
      els.microcopy.textContent = [
        'ZOLTAN reduce sospechosos.',
        'La textura deja huellas.',
        'Tu elección empieza a hablar.'
      ][state.currentBit % 3];
    } else if (state.phase === PHASES.TENSION) {
      els.hostLine.textContent = hostLine('tension', state.currentBit);
      els.progressLabel.textContent = 'Reveal en preparación';
      els.questionText.textContent = 'Ya casi está. Tu elección ha dejado huellas.';
      els.microcopy.textContent = 'No es una calculadora. Es una lectura de marca.';
    } else if (state.phase === PHASES.REVEAL) {
      els.hostLine.textContent = hostLine('reveal', 0);
      els.progressLabel.textContent = 'Producto revelado';
      els.questionText.textContent = state.reveal ? `Estabas pensando en: ${state.reveal.name}` : 'Reveal listo';
      els.microcopy.textContent = els.campaignClaim.value || 'Tu armario acaba de hablar.';
    }
  }

  function updateButtons() {
    const picking = state.phase === PHASES.PICK_SECRET;
    const questioning = state.phase === PHASES.QUESTION;
    const revealed = state.phase === PHASES.REVEAL;
    els.startBtn.classList.toggle('is-hidden', state.phase !== PHASES.ATTRACT);
    els.secretBtn.classList.toggle('is-hidden', !picking);
    els.yesBtn.disabled = !questioning;
    els.noBtn.disabled = !questioning;
    [els.viewProductBtn, els.lookBtn, els.wishBtn, els.sendBtn, els.downloadBtn].forEach((btn) => {
      btn.disabled = !revealed;
    });
  }

  function renderMedia(product) {
    const asset = product.asset;
    if (asset && asset.type === 'image') {
      return `<img src="${asset.url}" alt="${escapeHtml(product.name)}" />`;
    }
    if (asset && asset.type === 'video') {
      return `<video src="${asset.url}" muted autoplay loop playsinline></video>`;
    }
    const initial = product.name.trim().charAt(0).toUpperCase();
    return `<span class="product-initial">${escapeHtml(initial)}</span>`;
  }

  function productCard(product, reveal) {
    const tilt = ((product.index % 5) - 2) * 1.2;
    return `
      <article class="product-card${reveal ? ' is-reveal' : ''}" style="--card-color:${product.asset && product.asset.placeholder ? '#444' : product.color}; --tilt:${tilt}deg">
        <div class="product-media">${renderMedia(product)}</div>
        <div class="product-body">
          <strong>${escapeHtml(product.name)}</strong>
          <span>${escapeHtml(product.category)} · ${escapeHtml(product.price)}</span>
          <small>${escapeHtml(product.stylePersona)}</small>
        </div>
      </article>`;
  }

  function render() {
    const products = state.phase === PHASES.QUESTION
      ? state.questionProducts
      : state.phase === PHASES.REVEAL && state.reveal
        ? [state.reveal]
        : state.products;
    els.productGrid.innerHTML = products.map((product) => productCard(product, state.phase === PHASES.REVEAL)).join('');
    els.resultCard.innerHTML = state.reveal
      ? `<span>Outfit desbloqueado</span><strong>${escapeHtml(state.reveal.name)}</strong><p>${escapeHtml(state.reveal.stylePersona)} · ${escapeHtml(state.reveal.cta)}</p>`
      : '<span>Sin lectura</span><strong>Elige una prenda en tu mente.</strong>';
    if (state.reveal && state.reward && window.ZoltanRewardLayer) {
      window.ZoltanRewardLayer.renderRewardCard(els.resultCard, state.reward, { item: state.reveal });
    }
    document.documentElement.style.setProperty('--accent', els.brandColor.value);
  }

  function start() {
    if (!buildDeck()) {
      toast('Deck bloqueado: no se repiten assets ocultamente.');
      return;
    }
    state.answerBits = 0;
    state.currentBit = 0;
    state.reveal = null;
    state.reward = null;
    rebuildEngineSession();
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.startSession('zoltan-style-oracle', { count: state.products.length });
    track('zoltan_style_oracle_started', { count: state.products.length, tone: els.hostTone.value });
    setPhase(PHASES.PICK_SECRET);
  }

  function beginQuestions() {
    state.currentBit = 0;
    state.answerBits = 0;
    if (state.engineSession && window.ZoltanSelectionEngine) {
      state.engineSession = window.ZoltanSelectionEngine.resetSession(state.engineSession);
      state.maxBits = state.engineSession.maxBits;
    }
    state.questionProducts = questionGroup();
    setPhase(PHASES.QUESTION);
  }

  function answer(yes, source) {
    if (state.phase !== PHASES.QUESTION) return;
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.recordInteraction('answer', { answer: yes ? 'yes' : 'no', source: source || 'button', mode: source || 'button' });
    if (state.engineSession && window.ZoltanSelectionEngine) {
      state.engineSession = window.ZoltanSelectionEngine.answerCurrentQuestion(state.engineSession, yes);
      state.answerBits = state.engineSession.answerBits;
      state.currentBit = state.engineSession.currentBit;
    } else if (yes) {
      state.answerBits += 1 << state.currentBit;
      state.currentBit += 1;
    } else {
      state.currentBit += 1;
    }
    track('zoltan_style_oracle_answered', { round: state.currentBit + 1, answer: yes ? 'yes' : 'no', source: source || 'button' });
    flashStage(yes ? 'ok' : 'danger');
    if (state.currentBit >= state.maxBits) {
      setPhase(PHASES.TENSION);
      setTimeout(reveal, 1650);
      return;
    }
    state.questionProducts = questionGroup();
    updateCopy();
    render();
  }

  function reveal() {
    const engineReveal = state.engineSession && window.ZoltanSelectionEngine ? window.ZoltanSelectionEngine.getReveal(state.engineSession) : null;
    const index = engineReveal && engineReveal.ok ? engineReveal.index : clamp(state.answerBits - 1, 0, state.products.length - 1);
    state.reveal = state.products[index];
    if (window.ZoltanRewardLayer) {
      state.reward = window.ZoltanRewardLayer.createReward({
        id: state.reveal.id,
        name: state.reveal.name,
        title: state.reveal.name,
        subtitle: state.reveal.stylePersona,
        category: state.reveal.category,
        color: state.reveal.color,
        price: state.reveal.price,
        cta: { label: els.campaignCta.value || state.reveal.cta, href: state.reveal.productUrl || '#' },
        rewardType: state.reveal.category === 'Look completo' ? 'outfit' : 'product',
        asset: state.reveal.asset || null
      }, {
        type: state.reveal.category === 'Look completo' ? 'outfit' : 'product',
        title: `Has desbloqueado: ${state.reveal.name}`,
        subtitle: els.campaignClaim.value || state.reveal.stylePersona,
        description: hostLine('reward', 0),
        image: state.reveal.asset || null,
        accentColor: els.brandColor.value,
        metadata: { module: 'zoltan-style-oracle', sector: 'fashion', campaign: els.brandName.value, selectedItemId: state.reveal.id }
      });
    }
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.endSession({ revealed: true });
    track('zoltan_style_oracle_revealed', { index, product: state.reveal.name });
    setPhase(PHASES.REVEAL);
    toast(`ZOLTAN ha revelado: ${state.reveal.name}`);
  }

  function handlePointer(event) {
    if (state.phase !== PHASES.QUESTION) return;
    const now = performance.now();
    if (now - state.lastGestureAt < 600) return;
    const rect = els.stage.getBoundingClientRect();
    state.lastGestureAt = now;
    track('fallback_used', { source: event.pointerType || 'pointer' });
    if (window.ZoltanTelemetry) window.ZoltanTelemetry.recordFallback(event.pointerType || 'pointer-zone');
    answer(event.clientX - rect.left > rect.width / 2, 'zone');
  }

  async function toggleCamera() {
    if (state.cameraActive && state.cameraController) {
      state.cameraController.stop();
      state.cameraActive = false;
      els.cameraBtn.textContent = 'Activar camara';
      els.cameraBtn.className = 'ghost-btn';
      return;
    }
    els.cameraBtn.textContent = 'Activando...';
    els.cameraBtn.className = 'ghost-btn is-starting';
    state.cameraController = window.ZoltanGestures.createController({
      videoEl: els.video,
      mode: 'style-oracle',
      onStatus(status) {
        if (status === 'camera-started') {
          if (window.ZoltanTelemetry) {
            const session = window.ZoltanTelemetry.startSession('zoltan-style-oracle-camera');
            session.cameraRequested = true;
            session.cameraGranted = true;
          }
          state.cameraActive = true;
          els.cameraBtn.textContent = 'Camara activa';
          els.cameraBtn.className = 'ghost-btn is-active';
          track('camera_started');
          toast('Camara activa: izquierda NO, derecha SI.');
        }
        if (status === 'camera-denied' || status === 'camera-unavailable') {
          if (window.ZoltanTelemetry) {
            const session = window.ZoltanTelemetry.startSession('zoltan-style-oracle-camera');
            session.cameraRequested = true;
            session.cameraDenied = true;
            window.ZoltanTelemetry.recordFallback(status);
          }
          state.cameraActive = false;
          els.cameraBtn.textContent = 'Modo tactil activo';
          els.cameraBtn.className = 'ghost-btn';
          track('camera_denied', { status });
          track('fallback_used', { source: 'camera-fail' });
          toast('Modo tactil activo: usa botones o zonas izquierda/derecha.');
        }
      },
      onGesture(gesture) {
        if (state.phase !== PHASES.QUESTION) return;
        if (window.ZoltanTelemetry) window.ZoltanTelemetry.recordGestureAttempt({ x: gesture.x, confidence: gesture.confidence });
        const now = performance.now();
        if (now - state.lastGestureAt < 1100 || gesture.confidence < 0.28) return;
        state.lastGestureAt = now;
        answer(gesture.x >= 0.5, 'camera');
      }
    });
    const ok = await state.cameraController.start();
    if (!ok) {
      els.cameraBtn.textContent = 'Modo tactil activo';
      els.cameraBtn.className = 'ghost-btn';
      toast('Camara no disponible. La experiencia funciona por touch.');
    }
  }

  function coverDraw(ctx, asset, x, y, w, h) {
    if (!asset || !asset.el) return false;
    const image = asset.el;
    const iw = image.videoWidth || image.naturalWidth || image.width || 1;
    const ih = image.videoHeight || image.naturalHeight || image.height || 1;
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    try {
      ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
      return true;
    } catch (err) {
      return false;
    }
  }

  function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = String(text).split(/\s+/);
    let line = '';
    let lines = 0;
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        if (lines < maxLines) ctx.fillText(line, x, y + lines * lineHeight);
        line = word;
        lines += 1;
      } else {
        line = test;
      }
    });
    if (line && lines < maxLines) ctx.fillText(line, x, y + lines * lineHeight);
  }

  function downloadPoster() {
    const product = state.reveal || state.products[0];
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 2000;
    const ctx = canvas.getContext('2d');
    const accent = els.brandColor.value;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#080808');
    grad.addColorStop(0.5, product.color || '#222');
    grad.addColorStop(1, '#030303');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (state.background) {
      coverDraw(ctx, state.background, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,0,0,0.64)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = 12;
    ctx.strokeRect(70, 70, 1260, 1860);
    ctx.fillStyle = '#fff';
    ctx.font = '900 76px Inter, Arial';
    ctx.fillText(els.brandName.value || 'ZOLTAN Atelier', 130, 190);
    ctx.font = '900 34px Inter, Arial';
    ctx.fillStyle = accent;
    ctx.fillText('STYLE ORACLE · OUTFIT REVELADO', 130, 244);
    if (state.logo) coverDraw(ctx, state.logo, 1070, 120, 180, 96);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(290, 390, 820, 980, 70);
    ctx.clip();
    if (!coverDraw(ctx, product.asset, 290, 390, 820, 980)) {
      const pg = ctx.createLinearGradient(290, 390, 1110, 1370);
      pg.addColorStop(0, product.color || accent);
      pg.addColorStop(1, '#050505');
      ctx.fillStyle = pg;
      ctx.fillRect(290, 390, 820, 980);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.font = '900 210px Playfair Display, Georgia';
      ctx.textAlign = 'center';
      ctx.fillText(product.name.charAt(0), 700, 940);
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.lineWidth = 4;
    ctx.strokeRect(320, 420, 760, 920);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '900 64px Inter, Arial';
    drawWrapped(ctx, `Estabas pensando en: ${product.name}`, 700, 1508, 1040, 76, 3);
    ctx.fillStyle = accent;
    ctx.font = '900 42px Inter, Arial';
    ctx.fillText(product.stylePersona, 700, 1715);
    ctx.fillStyle = 'rgba(255,255,255,0.86)';
    ctx.font = '800 32px Inter, Arial';
    ctx.fillText(els.campaignClaim.value || 'Tu armario acaba de hablar.', 700, 1790);
    ctx.fillStyle = '#fff';
    ctx.font = '900 36px Inter, Arial';
    ctx.fillText(els.campaignCta.value || 'Crear look completo', 700, 1870);
    ctx.fillStyle = 'rgba(255,255,255,0.58)';
    ctx.font = '800 22px Inter, Arial';
    ctx.fillText(new Date().toLocaleString(), 700, 1930);
    const link = document.createElement('a');
    link.download = `zoltan-style-oracle-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    track('zoltan_style_oracle_exported', { product: product.name });
  }

  function action(name) {
    track('zoltan_style_oracle_cta_clicked', { action: name, product: state.reveal ? state.reveal.name : null });
    toast(`${name}: accion demo registrada para ${state.reveal ? state.reveal.name : 'producto'}.`);
  }

  function reset() {
    state.answerBits = 0;
    state.currentBit = 0;
    state.reveal = null;
    state.reward = null;
    state.questionProducts = [];
    setPhase(PHASES.ATTRACT);
  }

  function loadSingle(file, currentKey) {
    if (state[currentKey]) revokeAsset(state[currentKey]);
    state[currentKey] = file ? createAsset(file) : null;
    if (currentKey === 'background' && state[currentKey]) {
      els.stage.style.setProperty('--stage-bg', `url("${state[currentKey].url}")`);
    }
  }

  els.productFiles.addEventListener('change', () => {
    state.productAssets.forEach(revokeAsset);
    state.productAssets = uniqueFileAssets(els.productFiles.files);
    buildDeck();
  });
  els.logoFile.addEventListener('change', () => loadSingle(els.logoFile.files[0], 'logo'));
  els.backgroundFile.addEventListener('change', () => loadSingle(els.backgroundFile.files[0], 'background'));
  els.productCount.addEventListener('input', buildDeck);
  els.allowPlaceholders.addEventListener('change', buildDeck);
  [els.brandName, els.campaignClaim, els.campaignCta, els.brandColor, els.hostTone, els.sectorPreset].forEach((el) => {
    el.addEventListener('input', () => { updateCopy(); render(); });
    el.addEventListener('change', () => { updateCopy(); render(); });
  });
  els.startBtn.addEventListener('click', start);
  els.secretBtn.addEventListener('click', beginQuestions);
  els.yesBtn.addEventListener('click', () => answer(true, 'button'));
  els.noBtn.addEventListener('click', () => answer(false, 'button'));
  els.stage.addEventListener('pointerdown', handlePointer);
  els.cameraBtn.addEventListener('click', toggleCamera);
  els.downloadBtn.addEventListener('click', downloadPoster);
  els.viewProductBtn.addEventListener('click', () => action('Ver producto'));
  els.lookBtn.addEventListener('click', () => action('Crear look completo'));
  els.wishBtn.addEventListener('click', () => action('Guardar wishlist'));
  els.sendBtn.addEventListener('click', () => action('Enviar a mi movil'));
  els.resetBtn.addEventListener('click', reset);
  window.addEventListener('beforeunload', () => {
    if (state.cameraController) state.cameraController.stop();
    state.productAssets.forEach(revokeAsset);
    revokeAsset(state.logo);
    revokeAsset(state.background);
  });

  window.__ZOLTAN_STYLE_ORACLE_QA__ = function () {
    return state.products.map((product) => {
      let sum = 0;
      for (let bit = 0; bit < state.maxBits; bit += 1) {
        if (product.binaryValue & (1 << bit)) sum += 1 << bit;
      }
      return { product: product.name, expected: product.index, resolved: sum - 1, ok: sum - 1 === product.index };
    });
  };

  track('zoltan_style_oracle_loaded');
  if (window.ZoltanTelemetry) window.ZoltanTelemetry.recordEnvironment({ module: 'zoltan-style-oracle' });
  buildDeck();
  updateCopy();
  updateButtons();
})();
