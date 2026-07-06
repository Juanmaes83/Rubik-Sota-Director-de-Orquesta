(function () {
  const PHASES = {
    ATTRACT: 'attract',
    INPUT: 'input',
    GENERATING: 'generating',
    VALIDATING: 'validating',
    REVEAL: 'reveal',
    EXPORT: 'export'
  };

  const NUMBER_PRESETS = [
    { value: 34, label: 'Clásico' },
    { value: 49, label: 'Oferta retail' },
    { value: 99, label: 'Precio psicológico' },
    { value: 108, label: 'Ritual de marca' },
    { value: 360, label: 'Experiencia inmersiva' },
    { value: 777, label: 'Jackpot visual' },
    { value: 911, label: 'Edición limitada' },
    { value: 2026, label: 'Campaña anual' }
  ];

  const CAMPAIGN_PRESETS = {
    retail: { number: 49, claim: 'Tu selección converge en una ventaja exclusiva.', cta: 'Desbloquear colección' },
    tourism: { number: 7, claim: '7 señales para descubrir tu próxima experiencia.', cta: 'Ver rutas' },
    realestate: { number: 360, claim: 'Todo converge en una visita inmersiva.', cta: 'Explorar propiedad' },
    auto: { number: 911, claim: 'Una edición. Una señal. Una decisión.', cta: 'Configurar modelo' },
    education: { number: 108, claim: 'La matemática también puede ser una historia.', cta: 'Iniciar recorrido' },
    events: { number: 777, claim: 'Has activado una coincidencia imposible.', cta: 'Guardar pase' }
  };

  const els = {
    brandName: document.getElementById('brandNameInput'),
    targetNumber: document.getElementById('targetNumberInput'),
    claim: document.getElementById('campaignClaimInput'),
    cta: document.getElementById('campaignCtaInput'),
    color: document.getElementById('brandColorInput'),
    sector: document.getElementById('sectorPresetSelect'),
    logoFile: document.getElementById('logoFileInput'),
    backgroundFile: document.getElementById('backgroundFileInput'),
    generateBtn: document.getElementById('generateBtn'),
    cameraBtn: document.getElementById('cameraBtn'),
    resetBtn: document.getElementById('resetBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    stage: document.getElementById('stage'),
    stageBg: document.querySelector('.stage-bg'),
    phaseLabel: document.getElementById('phaseLabel'),
    stageTitle: document.getElementById('stageTitle'),
    stageSubtitle: document.getElementById('stageSubtitle'),
    targetOrb: document.getElementById('targetOrb'),
    magicGrid: document.getElementById('magicGrid'),
    checksList: document.getElementById('checksList'),
    validationSummary: document.getElementById('validationSummary'),
    commercialCopy: document.getElementById('commercialCopy'),
    reveal: document.getElementById('revealPanel'),
    status: document.getElementById('statusMessage'),
    cameraStatus: document.getElementById('cameraStatus'),
    cameraVideo: document.getElementById('cameraVideo'),
    presets: document.getElementById('numberPresets'),
    canvas: document.getElementById('exportCanvas'),
    toast: document.getElementById('toast')
  };

  const core = window.ZoltanCore || {};
  let phase = PHASES.ATTRACT;
  let matrix = [];
  let validation = { ok: false, checks: [] };
  let cameraOn = false;
  let logoAsset = null;
  let backgroundAsset = null;
  let currentPresetIndex = 0;
  let gestureCooldown = 0;

  function normalizeTargetNumber(value) {
    const parsed = Number.parseInt(String(value).replace(/[^\d-]/g, ''), 10);
    if (!Number.isFinite(parsed)) return 34;
    return Math.max(-9999, Math.min(99999, parsed));
  }

  function createBrandMagicSquare(targetNumber) {
    const n = normalizeTargetNumber(targetNumber);
    return [
      [n - 20, 1, 12, 7],
      [11, 8, n - 21, 2],
      [5, 10, 3, n - 18],
      [4, n - 19, 6, 9]
    ];
  }

  function sum(values) {
    return values.reduce((acc, value) => acc + value, 0);
  }

  function getMagicSquareChecks(square, target) {
    const rows = square.map((row, index) => ({
      type: 'row',
      index,
      label: `Fila ${index + 1}`,
      values: row,
      total: sum(row),
      ok: sum(row) === target
    }));
    const columns = [0, 1, 2, 3].map((columnIndex) => {
      const values = square.map((row) => row[columnIndex]);
      return { type: 'column', index: columnIndex, label: `Columna ${columnIndex + 1}`, values, total: sum(values), ok: sum(values) === target };
    });
    const diagonalAValues = [square[0][0], square[1][1], square[2][2], square[3][3]];
    const diagonalBValues = [square[0][3], square[1][2], square[2][1], square[3][0]];
    const diagonals = [
      { type: 'diagonal', index: 0, label: 'Diagonal principal', values: diagonalAValues, total: sum(diagonalAValues), ok: sum(diagonalAValues) === target },
      { type: 'diagonal', index: 1, label: 'Diagonal secundaria', values: diagonalBValues, total: sum(diagonalBValues), ok: sum(diagonalBValues) === target }
    ];
    return [...rows, ...columns, ...diagonals];
  }

  function validateMagicSquare(square, target) {
    const checks = getMagicSquareChecks(square, target);
    return { ok: checks.every((check) => check.ok), checks };
  }

  function payload(extra) {
    return Object.assign({
      module: 'zoltan-brand-magic-square',
      targetNumber: normalizeTargetNumber(els.targetNumber.value),
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

  function warningForNumber(n) {
    if (n < 34) return 'Número válido matemáticamente, pero puede generar valores negativos. Para campañas comerciales se recomienda 34 o superior.';
    if (n > 9999) return 'Número alto: revisa legibilidad en pantallas pequeñas.';
    return '';
  }

  function renderPresets() {
    els.presets.innerHTML = '';
    NUMBER_PRESETS.forEach((preset, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-btn';
      btn.innerHTML = `<strong>${preset.value}</strong><span>${preset.label}</span>`;
      btn.addEventListener('click', () => selectNumberPreset(index));
      els.presets.appendChild(btn);
    });
  }

  function renderGrid(animated) {
    els.magicGrid.innerHTML = '';
    matrix.flat().forEach((value, index) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = value;
      cell.setAttribute('aria-label', `Celda ${index + 1}: ${value}`);
      els.magicGrid.appendChild(cell);
      window.setTimeout(() => cell.classList.add('is-visible'), animated ? index * 58 : 0);
    });
  }

  function highlightCheck(checkIndex) {
    const cells = Array.from(els.magicGrid.children);
    cells.forEach((cell) => cell.classList.remove('is-highlight'));
    const check = validation.checks[checkIndex];
    if (!check) return;
    if (check.type === 'row') {
      [0, 1, 2, 3].forEach((col) => cells[check.index * 4 + col].classList.add('is-highlight'));
    } else if (check.type === 'column') {
      [0, 1, 2, 3].forEach((row) => cells[row * 4 + check.index].classList.add('is-highlight'));
    } else if (check.index === 0) {
      [0, 5, 10, 15].forEach((idx) => cells[idx].classList.add('is-highlight'));
    } else {
      [3, 6, 9, 12].forEach((idx) => cells[idx].classList.add('is-highlight'));
    }
  }

  function renderChecks() {
    els.checksList.innerHTML = '';
    validation.checks.forEach((check, index) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = `check-row ${check.ok ? 'is-ok' : 'is-fail'}`;
      row.innerHTML = `<span>${check.ok ? 'OK' : 'FAIL'} · ${check.label}</span><strong>${check.total}</strong>`;
      row.addEventListener('click', () => highlightCheck(index));
      els.checksList.appendChild(row);
    });
    els.validationSummary.textContent = validation.ok ? 'Todas las líneas convergen.' : 'Validación fallida.';
  }

  function reveal() {
    const n = normalizeTargetNumber(els.targetNumber.value);
    setPhase(PHASES.REVEAL);
    els.stageTitle.textContent = `Todo converge en ${n}.`;
    els.stageSubtitle.textContent = els.claim.value;
    els.targetOrb.textContent = n;
    els.reveal.innerHTML = `<strong>${els.brandName.value}: todo converge en ${n}</strong><span>${els.claim.value} · ${els.cta.value}</span>`;
    els.commercialCopy.textContent = `Resultado listo para claim, cupón, precio, aniversario o CTA: ${els.cta.value}`;
    track('zoltan_magic_square_revealed');
  }

  function generate() {
    const n = normalizeTargetNumber(els.targetNumber.value);
    els.targetNumber.value = n;
    setPhase(PHASES.GENERATING);
    els.stageTitle.textContent = 'ZOLTAN está ensamblando la arquitectura.';
    els.stageSubtitle.textContent = 'La validación matemática aparecerá celda por celda.';
    els.targetOrb.textContent = n;
    const warning = warningForNumber(n);
    els.status.textContent = warning || 'Generando cuadrado mágico de marca.';
    matrix = createBrandMagicSquare(n);
    validation = validateMagicSquare(matrix, n);
    track('zoltan_magic_square_started');
    track('zoltan_magic_square_generated', { ok: validation.ok });
    renderGrid(true);
    window.setTimeout(() => {
      setPhase(PHASES.VALIDATING);
      renderChecks();
      if (validation.ok) {
        track('zoltan_magic_square_validation_passed');
        toast('Validación completa: todas las líneas suman el objetivo.');
        reveal();
      } else {
        track('zoltan_magic_square_validation_failed');
        els.status.textContent = 'Error de validación. No se pasa a reveal.';
        toast('Validación fallida.');
      }
    }, 1120);
  }

  function reset() {
    setPhase(PHASES.ATTRACT);
    els.targetNumber.value = 34;
    els.targetOrb.textContent = '34';
    els.stageTitle.textContent = 'Elige un número de campaña.';
    els.stageSubtitle.textContent = 'Cada fila, columna y diagonal converge en el mismo destino: tu número.';
    els.status.textContent = 'Modo táctil activo.';
    els.reveal.innerHTML = '';
    matrix = createBrandMagicSquare(34);
    validation = validateMagicSquare(matrix, 34);
    renderGrid(false);
    renderChecks();
  }

  function selectNumberPreset(index) {
    const preset = NUMBER_PRESETS[index];
    if (!preset) return;
    currentPresetIndex = index;
    els.targetNumber.value = preset.value;
    els.targetOrb.textContent = preset.value;
    track('zoltan_magic_square_preset_selected', { preset: preset.label, value: preset.value });
    generate();
  }

  function applySectorPreset() {
    const preset = CAMPAIGN_PRESETS[els.sector.value];
    if (!preset) return;
    els.targetNumber.value = preset.number;
    els.claim.value = preset.claim;
    els.cta.value = preset.cta;
    els.targetOrb.textContent = preset.number;
    track('zoltan_magic_square_sector_selected', { sector: els.sector.value });
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
    if (!matrix.length) generate();
    const canvas = els.canvas;
    const ctx = canvas.getContext('2d');
    const n = normalizeTargetNumber(els.targetNumber.value);
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
    ctx.font = '900 44px Inter, Arial';
    ctx.fillText(`Todo converge en ${n}`, canvas.width / 2, 308);

    const gridX = 300;
    const gridY = 470;
    const size = 250;
    matrix.forEach((row, r) => row.forEach((value, c) => {
      const x = gridX + c * size;
      const y = gridY + r * size;
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(x, y, size - 16, size - 16);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, size - 16, size - 16);
      ctx.fillStyle = '#fff';
      ctx.font = '900 66px Inter, Arial';
      ctx.fillText(String(value), x + size / 2 - 8, y + size / 2 + 24);
    }));
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.font = '800 40px Inter, Arial';
    ctx.fillText(els.claim.value, canvas.width / 2, 1590);
    ctx.fillStyle = '#050505';
    ctx.fillRect(300, 1680, canvas.width - 600, 118);
    ctx.fillStyle = '#fff';
    ctx.font = '900 40px Inter, Arial';
    ctx.fillText(els.cta.value, canvas.width / 2, 1754);
    ctx.fillStyle = 'rgba(232,216,168,0.92)';
    ctx.font = '800 25px Inter, Arial';
    ctx.fillText(`ZOLTAN Brand Magic Square · Procesado localmente · ${new Date().toLocaleString()}`, canvas.width / 2, 1880);
    setPhase(PHASES.EXPORT);
    if (core.downloadElementAsPng) core.downloadElementAsPng(canvas, `zoltan-brand-magic-square-${n}-${Date.now()}.png`);
    track('zoltan_magic_square_exported');
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

  const gestureController = window.ZoltanGestures.createController({
    videoEl: els.cameraVideo,
    onStatus(status) {
      if (status === 'camera-started') {
        cameraOn = true;
        els.cameraStatus.textContent = 'Cámara: activa';
        els.cameraBtn.textContent = 'Desactivar cámara';
      } else if (status === 'camera-denied') {
        cameraOn = false;
        els.cameraStatus.textContent = 'Cámara: denegada';
        els.status.textContent = 'Modo táctil activo.';
      } else if (status === 'camera-stopped') {
        cameraOn = false;
        els.cameraStatus.textContent = 'Cámara: off';
        els.cameraBtn.textContent = 'Activar cámara';
      } else if (status === 'tracking') {
        els.cameraStatus.textContent = 'Cámara: tracking';
      }
    },
    onGesture(payload) {
      if (performance.now() - gestureCooldown < 1200) return;
      gestureCooldown = performance.now();
      if (payload.gesture === 'Open_Palm' || payload.x > 0.34 && payload.x < 0.66) generate();
      else if (payload.x < 0.34) selectNumberPreset(Math.max(0, currentPresetIndex - 1));
      else selectNumberPreset(Math.min(NUMBER_PRESETS.length - 1, currentPresetIndex + 1));
    }
  });

  async function toggleCamera() {
    if (cameraOn) {
      gestureController.stop();
      return;
    }
    const ok = await gestureController.start();
    if (!ok) {
      els.status.textContent = 'Modo táctil activo.';
      track('fallback_used', { source: 'camera-denied' });
    }
  }

  function bind() {
    els.generateBtn.addEventListener('click', generate);
    els.downloadBtn.addEventListener('click', downloadPng);
    els.resetBtn.addEventListener('click', reset);
    els.cameraBtn.addEventListener('click', toggleCamera);
    els.sector.addEventListener('change', () => {
      applySectorPreset();
      generate();
    });
    els.targetNumber.addEventListener('input', () => {
      els.targetOrb.textContent = normalizeTargetNumber(els.targetNumber.value);
      track('zoltan_magic_square_number_changed');
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
          els.stageBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)), url("${asset.url}")`;
        } else {
          els.stageBg.classList.remove('has-media');
          els.stageBg.style.backgroundImage = '';
        }
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') generate();
      if (event.key === 'Escape') reset();
      if (event.key === 'ArrowLeft') selectNumberPreset(Math.max(0, currentPresetIndex - 1));
      if (event.key === 'ArrowRight') selectNumberPreset(Math.min(NUMBER_PRESETS.length - 1, currentPresetIndex + 1));
    });
    window.addEventListener('beforeunload', () => {
      gestureController.stop();
      revoke(logoAsset);
      revoke(backgroundAsset);
    });
  }

  window.__ZOLTAN_MAGIC_SQUARE_QA__ = function () {
    const testNumbers = [34, 49, 99, 108, 360, 777, 911, 2026, -10, 99999];
    return testNumbers.map((n) => {
      const testMatrix = createBrandMagicSquare(n);
      const testValidation = validateMagicSquare(testMatrix, n);
      return { n, matrix: testMatrix, ok: testValidation.ok, checks: testValidation.checks };
    });
  };

  function init() {
    track('zoltan_magic_square_loaded');
    renderPresets();
    matrix = createBrandMagicSquare(34);
    validation = validateMagicSquare(matrix, 34);
    renderGrid(false);
    renderChecks();
    bind();
    setPhase(PHASES.ATTRACT);
  }

  init();
})();
