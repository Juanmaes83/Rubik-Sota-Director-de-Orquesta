(function () {
  const PHASES = {
    ATTRACT: 'attract',
    INPUT: 'input',
    LOCKED: 'locked',
    STEP_REVERSE: 'step_reverse',
    STEP_SUBTRACT: 'step_subtract',
    STEP_REVERSE_RESULT: 'step_reverse_result',
    STEP_ADD: 'step_add',
    PORTAL_OPENING: 'portal_opening',
    REVEAL: 'reveal',
    EXPORT: 'export'
  };

  const SEED_PRESETS = ['732', '421', '963', '851', '642', '981', '320', '986'];
  const CAMPAIGN_PRESETS = {
    retail: { seed: '732', claim: 'Tu código oculto converge en una ventaja exclusiva.', cta: 'Desbloquear cupón' },
    tourism: { seed: '421', claim: 'Todo viaje empieza con una señal.', cta: 'Descubrir ruta' },
    realestate: { seed: '963', claim: 'Has abierto una puerta hacia una nueva propiedad.', cta: 'Ver visita inmersiva' },
    auto: { seed: '851', claim: 'El portal revela una configuración especial.', cta: 'Configurar vehículo' },
    education: { seed: '642', claim: 'La matemática también cuenta historias invisibles.', cta: 'Iniciar recorrido' },
    events: { seed: '981', claim: 'Has activado el código secreto del evento.', cta: 'Guardar pase' }
  };

  const els = {
    brandName: document.getElementById('brandNameInput'),
    seed: document.getElementById('seedNumberInput'),
    claim: document.getElementById('campaignClaimInput'),
    cta: document.getElementById('campaignCtaInput'),
    color: document.getElementById('brandColorInput'),
    sector: document.getElementById('sectorPresetSelect'),
    logoFile: document.getElementById('logoFileInput'),
    backgroundFile: document.getElementById('backgroundFileInput'),
    startBtn: document.getElementById('startBtn'),
    nextBtn: document.getElementById('nextStepBtn'),
    autoBtn: document.getElementById('autoPlayBtn'),
    cameraBtn: document.getElementById('cameraBtn'),
    resetBtn: document.getElementById('resetBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    stageBg: document.querySelector('.stage-bg'),
    portalRing: document.querySelector('.portal-ring'),
    phaseLabel: document.getElementById('phaseLabel'),
    stageTitle: document.getElementById('stageTitle'),
    stageSubtitle: document.getElementById('stageSubtitle'),
    portalNumber: document.getElementById('portalNumber'),
    operation: document.getElementById('operationPanel'),
    steps: document.getElementById('stepsPanel'),
    reveal: document.getElementById('revealPanel'),
    status: document.getElementById('statusMessage'),
    cameraStatus: document.getElementById('cameraStatus'),
    cameraVideo: document.getElementById('cameraVideo'),
    presets: document.getElementById('seedPresets'),
    validation: document.getElementById('validationMessage'),
    commercialCopy: document.getElementById('commercialCopy'),
    canvas: document.getElementById('exportCanvas'),
    toast: document.getElementById('toast')
  };

  const core = window.ZoltanCore || {};
  let phase = PHASES.ATTRACT;
  let result = null;
  let stepIndex = -1;
  let autoTimer = 0;
  let cameraOn = false;
  let logoAsset = null;
  let backgroundAsset = null;
  let currentPresetIndex = 0;
  let gestureCooldown = 0;

  function normalizeThreeDigitInput(value) {
    return String(value).replace(/\D/g, '').slice(0, 3);
  }

  function isValid1089Seed(value) {
    const digits = normalizeThreeDigitInput(value);
    if (digits.length !== 3) return { ok: false, reason: 'Introduce exactamente 3 cifras.' };
    if (digits[0] === digits[2]) return { ok: false, reason: 'La primera y la última cifra deben ser diferentes.' };
    return { ok: true, reason: '' };
  }

  function reverseString(value) {
    return String(value).split('').reverse().join('');
  }

  function pad3(value) {
    return String(value).padStart(3, '0');
  }

  function compute1089(seedValue) {
    const validation = isValid1089Seed(seedValue);
    if (!validation.ok) return { ok: false, error: validation.reason };
    const seed = normalizeThreeDigitInput(seedValue);
    const reversedSeed = reverseString(seed);
    const seedNumber = Number.parseInt(seed, 10);
    const reversedNumber = Number.parseInt(reversedSeed, 10);
    const high = Math.max(seedNumber, reversedNumber);
    const low = Math.min(seedNumber, reversedNumber);
    const difference = high - low;
    const differencePadded = pad3(difference);
    const reversedDifference = reverseString(differencePadded);
    const finalResult = Number.parseInt(differencePadded, 10) + Number.parseInt(reversedDifference, 10);
    return {
      ok: finalResult === 1089,
      seed,
      reversedSeed,
      high,
      low,
      difference,
      differencePadded,
      reversedDifference,
      finalResult,
      steps: [
        { id: 'reverse_seed', label: 'Inversión inicial', expression: `${seed} ↔ ${reversedSeed}`, value: reversedSeed },
        { id: 'subtract', label: 'Diferencia', expression: `${high} - ${low}`, value: differencePadded },
        { id: 'reverse_difference', label: 'Inversión del resultado', expression: `${differencePadded} ↔ ${reversedDifference}`, value: reversedDifference },
        { id: 'add', label: 'Colapso final', expression: `${differencePadded} + ${reversedDifference}`, value: finalResult }
      ]
    };
  }

  function payload(extra) {
    return Object.assign({
      module: 'zoltan-portal-1089',
      seed: normalizeThreeDigitInput(els.seed.value),
      finalResult: result && result.finalResult,
      brandName: els.brandName.value,
      sector: els.sector.value,
      timestamp: Date.now()
    }, extra || {});
  }

  function track(eventName, extra) {
    if (window.ZoltanAnalytics) window.ZoltanAnalytics.track(eventName, payload(extra));
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => els.toast.classList.remove('is-visible'), 2600);
  }

  function setPhase(next) {
    phase = next;
    els.phaseLabel.textContent = next;
  }

  function renderPresets() {
    els.presets.innerHTML = '';
    SEED_PRESETS.forEach((seed, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-btn';
      btn.innerHTML = `<strong>${seed}</strong><span>Portal válido</span>`;
      btn.addEventListener('click', () => selectPreset(index));
      els.presets.appendChild(btn);
    });
  }

  function renderSteps() {
    els.steps.innerHTML = '';
    const steps = result && result.steps ? result.steps : [];
    steps.forEach((step, index) => {
      const card = document.createElement('div');
      card.className = `step-card ${index === stepIndex ? 'is-active' : ''}`;
      card.innerHTML = `<strong>${step.label}</strong><span>${step.expression}</span><b>${step.value}</b>`;
      els.steps.appendChild(card);
    });
  }

  function renderCurrentStep() {
    renderSteps();
    if (!result || stepIndex < 0) {
      els.operation.innerHTML = '<strong>???</strong><span>Esperando número válido.</span>';
      return;
    }
    const step = result.steps[stepIndex];
    const phases = [PHASES.STEP_REVERSE, PHASES.STEP_SUBTRACT, PHASES.STEP_REVERSE_RESULT, PHASES.STEP_ADD];
    setPhase(phases[stepIndex] || PHASES.STEP_ADD);
    els.operation.innerHTML = `<strong>${step.expression}</strong><span>${step.label}: ${step.value}</span>`;
    els.portalNumber.textContent = step.value;
    track('zoltan_portal_1089_step_viewed', { stepId: step.id, stepIndex });
    if (stepIndex === result.steps.length - 1) openPortal();
  }

  function validateInput() {
    const clean = normalizeThreeDigitInput(els.seed.value);
    els.seed.value = clean;
    const validation = isValid1089Seed(clean);
    els.validation.textContent = validation.ok ? 'Input válido. El portal puede abrirse.' : validation.reason;
    els.status.textContent = validation.ok ? 'Input válido.' : validation.reason;
    return validation;
  }

  function startRitual() {
    const validation = validateInput();
    if (!validation.ok) {
      track('zoltan_portal_1089_validation_failed', { reason: validation.reason });
      toast(validation.reason);
      return;
    }
    result = compute1089(els.seed.value);
    if (!result.ok) {
      track('zoltan_portal_1089_validation_failed', { reason: 'Resultado no converge en 1089.' });
      els.status.textContent = 'Error crítico: el resultado no converge en 1089.';
      return;
    }
    setPhase(PHASES.LOCKED);
    stepIndex = -1;
    els.portalRing.classList.remove('is-open');
    els.portalNumber.textContent = result.seed;
    els.stageTitle.textContent = 'El número queda sellado.';
    els.stageSubtitle.textContent = 'Ahora ZOLTAN lo invertirá paso a paso.';
    els.reveal.innerHTML = '';
    renderSteps();
    track('zoltan_portal_1089_started');
    window.setTimeout(nextStep, 420);
  }

  function nextStep() {
    if (!result) {
      startRitual();
      return;
    }
    if (stepIndex < result.steps.length - 1) {
      stepIndex += 1;
      renderCurrentStep();
      return;
    }
    openPortal();
  }

  function previousStep() {
    if (!result || stepIndex <= 0) return;
    stepIndex -= 1;
    renderCurrentStep();
  }

  function openPortal() {
    if (!result || result.finalResult !== 1089) return;
    setPhase(PHASES.PORTAL_OPENING);
    els.portalRing.classList.add('is-open');
    els.portalNumber.textContent = '1089';
    els.operation.innerHTML = '<strong>495 + 594 = 1089</strong><span>El portal se abre.</span>';
    track('zoltan_portal_1089_result_confirmed');
    window.setTimeout(reveal, 900);
  }

  function reveal() {
    setPhase(PHASES.REVEAL);
    els.stageTitle.textContent = 'Portal abierto: 1089';
    els.stageSubtitle.textContent = els.claim.value;
    els.reveal.innerHTML = `<strong>${els.brandName.value}: portal 1089 abierto</strong><span>${els.claim.value} · ${els.cta.value}</span>`;
    els.commercialCopy.textContent = `1089 listo para cupón, página secreta, producto recomendado o CTA: ${els.cta.value}`;
    track('zoltan_portal_1089_revealed');
  }

  function autoPlay() {
    window.clearInterval(autoTimer);
    startRitual();
    autoTimer = window.setInterval(() => {
      if (!result || stepIndex >= result.steps.length - 1) {
        window.clearInterval(autoTimer);
        openPortal();
      } else {
        nextStep();
      }
    }, 980);
  }

  function reset() {
    window.clearInterval(autoTimer);
    result = null;
    stepIndex = -1;
    setPhase(PHASES.ATTRACT);
    els.portalRing.classList.remove('is-open');
    els.portalNumber.textContent = '???';
    els.operation.innerHTML = '<strong>???</strong><span>Esperando número válido.</span>';
    els.steps.innerHTML = '';
    els.reveal.innerHTML = '';
    els.stageTitle.textContent = 'Introduce tres cifras para abrir el portal.';
    els.stageSubtitle.textContent = 'El destino permanece oculto hasta completar la inversión.';
    els.status.textContent = 'Modo táctil activo.';
    validateInput();
  }

  function selectPreset(index) {
    const seed = SEED_PRESETS[index];
    if (!seed) return;
    currentPresetIndex = index;
    els.seed.value = seed;
    track('zoltan_portal_1089_preset_selected', { seed });
    startRitual();
  }

  function applySectorPreset() {
    const preset = CAMPAIGN_PRESETS[els.sector.value];
    if (!preset) return;
    els.seed.value = preset.seed;
    els.claim.value = preset.claim;
    els.cta.value = preset.cta;
    track('zoltan_portal_1089_sector_selected', { sector: els.sector.value });
    startRitual();
  }

  function drawLogo(ctx, x, y, w, h) {
    if (!logoAsset || !logoAsset.el || !logoAsset.ready) return false;
    try {
      ctx.drawImage(logoAsset.el, x, y, w, h);
      return true;
    } catch (err) {
      return false;
    }
  }

  function downloadPng() {
    if (!result) startRitual();
    const active = result || compute1089(els.seed.value);
    const canvas = els.canvas;
    const ctx = canvas.getContext('2d');
    const accent = els.color.value;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#050506');
    grad.addColorStop(0.52, '#120812');
    grad.addColorStop(1, '#020203');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 10;
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);
    ctx.strokeStyle = 'rgba(232,216,168,0.54)';
    ctx.lineWidth = 3;
    ctx.strokeRect(112, 112, canvas.width - 224, canvas.height - 224);
    drawLogo(ctx, 1190, 132, 230, 120);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '900 74px Inter, Arial';
    ctx.fillText(els.brandName.value || 'ZOLTAN', canvas.width / 2, 230);
    ctx.fillStyle = accent;
    ctx.font = '900 54px Inter, Arial';
    ctx.fillText('Portal 1089 abierto', canvas.width / 2, 318);
    ctx.font = '900 190px Inter, Arial';
    ctx.fillText('1089', canvas.width / 2, 560);
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '900 48px Inter, Arial';
    const lines = active.ok ? [
      `${active.seed} ↔ ${active.reversedSeed}`,
      `${active.high} - ${active.low} = ${active.differencePadded}`,
      `${active.differencePadded} ↔ ${active.reversedDifference}`,
      `${active.differencePadded} + ${active.reversedDifference} = ${active.finalResult}`
    ] : ['Input inválido'];
    lines.forEach((line, index) => ctx.fillText(line, canvas.width / 2, 780 + index * 94));
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.font = '800 40px Inter, Arial';
    ctx.fillText(els.claim.value, canvas.width / 2, 1350);
    ctx.fillStyle = '#050505';
    ctx.fillRect(300, 1490, canvas.width - 600, 118);
    ctx.fillStyle = '#fff';
    ctx.font = '900 40px Inter, Arial';
    ctx.fillText(els.cta.value, canvas.width / 2, 1564);
    ctx.fillStyle = 'rgba(232,216,168,0.92)';
    ctx.font = '800 25px Inter, Arial';
    ctx.fillText(`ZOLTAN Portal 1089 · Procesado localmente · ${new Date().toLocaleString()}`, canvas.width / 2, 1850);
    setPhase(PHASES.EXPORT);
    if (core.downloadElementAsPng) core.downloadElementAsPng(canvas, `zoltan-portal-1089-${active.seed || 'seed'}-${Date.now()}.png`);
    track('zoltan_portal_1089_exported');
  }

  function makeAsset(file, assign) {
    if (!file) {
      assign(null);
      return;
    }
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    const asset = { url, file, ready: false, type: isVideo ? 'video' : 'image', el: null };
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
    assign(asset);
  }

  function revoke(asset) {
    if (asset && asset.url) URL.revokeObjectURL(asset.url);
  }

  const runtime = window.ZoltanGestureRuntime;
  runtime.init({
    videoEl: els.cameraVideo,
    mode: 'raw',
    enableKeyboard: true,
    enablePointer: false,
    privacyMessage: 'La cámara se usa solo para detectar gestos en este dispositivo. No se graba vídeo ni se envían imágenes.',
    gestureCooldownMs: 1100,
    minConfidence: 0.2
  });

  runtime.onGesture((event, detail) => {
    if (event === 'CAMERA_READY') {
      cameraOn = true;
      els.cameraStatus.textContent = 'Cámara: activa';
      els.cameraBtn.textContent = 'Desactivar cámara';
    } else if (event === 'CAMERA_ERROR') {
      cameraOn = false;
      els.cameraStatus.textContent = 'Cámara: denegada';
      els.status.textContent = 'Modo táctil activo.';
      track('fallback_used', { source: 'camera-denied' });
    } else if (event === 'camera-stopped') {
      cameraOn = false;
      els.cameraStatus.textContent = 'Cámara: off';
      els.cameraBtn.textContent = 'Activar cámara';
    } else if (event === 'GESTURE') {
      const payload = detail;
      if (performance.now() - gestureCooldown < 1100) return;
      gestureCooldown = performance.now();
      if (payload.x > 0.34 && payload.x < 0.66) startRitual();
      else if (payload.x > 0.66) nextStep();
      else previousStep();
    }
  });

  async function toggleCamera() {
    if (cameraOn) {
      runtime.stopCamera();
      return;
    }
    const ok = await runtime.startCamera();
    if (!ok) {
      els.status.textContent = 'Modo táctil activo.';
      track('fallback_used', { source: 'camera-denied' });
    }
  }

  function bind() {
    els.startBtn.addEventListener('click', startRitual);
    els.nextBtn.addEventListener('click', nextStep);
    els.autoBtn.addEventListener('click', autoPlay);
    els.downloadBtn.addEventListener('click', downloadPng);
    els.resetBtn.addEventListener('click', reset);
    els.cameraBtn.addEventListener('click', toggleCamera);
    els.sector.addEventListener('change', applySectorPreset);
    els.seed.addEventListener('input', () => {
      els.seed.value = normalizeThreeDigitInput(els.seed.value);
      validateInput();
      track('zoltan_portal_1089_seed_changed');
    });
    els.color.addEventListener('input', () => {
      document.documentElement.style.setProperty('--gold', els.color.value);
    });
    els.logoFile.addEventListener('change', () => {
      revoke(logoAsset);
      makeAsset(els.logoFile.files[0], (asset) => { logoAsset = asset; });
    });
    els.backgroundFile.addEventListener('change', () => {
      revoke(backgroundAsset);
      makeAsset(els.backgroundFile.files[0], (asset) => {
        backgroundAsset = asset;
        if (asset) {
          els.stageBg.classList.add('has-media');
          els.stageBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.56)), url("${asset.url}")`;
        } else {
          els.stageBg.classList.remove('has-media');
          els.stageBg.style.backgroundImage = '';
        }
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') result ? nextStep() : startRitual();
      if (event.key === 'Escape') reset();
      if (event.key === 'ArrowLeft') selectPreset(Math.max(0, currentPresetIndex - 1));
      if (event.key === 'ArrowRight') selectPreset(Math.min(SEED_PRESETS.length - 1, currentPresetIndex + 1));
    });
    window.addEventListener('beforeunload', () => {
      runtime.destroy();
      revoke(logoAsset);
      revoke(backgroundAsset);
    });
  }

  window.__ZOLTAN_PORTAL_1089_QA__ = function () {
    const testSeeds = ['732', '421', '963', '851', '642', '981', '320', '986', '100', '999', '121', 'abc'];
    return testSeeds.map((seed) => {
      const testResult = compute1089(seed);
      return {
        seed,
        result: testResult,
        expectedOk: /^\d{3}$/.test(seed) && seed[0] !== seed[2],
        actualOk: testResult.ok === true && testResult.finalResult === 1089
      };
    });
  };

  function init() {
    track('zoltan_portal_1089_loaded');
    renderPresets();
    validateInput();
    reset();
    bind();
  }

  init();
})();
