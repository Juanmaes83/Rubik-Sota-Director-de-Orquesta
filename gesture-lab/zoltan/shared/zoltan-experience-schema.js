(function () {
  const DEFAULT_CONFIG = {
    id: 'zoltan-style-oracle-demo',
    version: '1.0.0',
    moduleType: 'selection_reveal',
    sector: 'fashion',
    campaign: { brandName: 'ZOLTAN', name: 'Style Oracle', claim: 'Tu estilo ya habia elegido.', accentColor: '#e8d8a8', logo: null },
    host: {
      id: 'madame-outfit',
      name: 'Madame Outfit',
      tone: 'provocador',
      persona: 'personal shopper digital, elegante, caotica y complice',
      voiceRules: {
        do: ['crear curiosidad', 'ser complice', 'usar frases memorables', 'crear tension antes del reveal'],
        dont: ['explicar la matematica', 'sonar como formulario', 'ordenar de forma agresiva', 'usar lenguaje frio']
      },
      lines: {
        attract: ['Piensa una pieza. No la toques. Tu armario ya esta hablando.'],
        pickSecret: ['Elige una en tu mente. Si haces trampas, la chaqueta lo sabra.'],
        question: ['Aparece aqui tu sospechosa?'],
        tension: ['Estoy viendo textura, intencion... y un poco de drama.'],
        reveal: ['Lo sabia. Era demasiado tu como para esconderse.'],
        reward: ['Ahora no lo niegues. Guardalo antes de que cambie de opinion.']
      }
    },
    story: {
      visibleFantasy: 'Una personal shopper digital lee el estilo del usuario.',
      hiddenMechanic: 'binary_selection',
      userGoal: 'descubrir si la marca adivina la prenda pensada',
      emotionalHook: 'la marca parece leer el gusto personal',
      tensionMoment: 'antes del reveal final',
      wowMoment: 'la prenda pensada aparece revelada',
      rewardPromise: 'guardar look, producto o acceso'
    },
    experience: {
      title: 'El Oraculo de tu Outfit',
      premise: 'Piensa una prenda. No la digas.',
      phases: ['attract', 'pick_secret', 'question', 'tension', 'reveal', 'reward'],
      engine: 'binary_selection',
      inputModes: ['touch', 'mouse', 'camera_optional']
    },
    items: [],
    revealRules: { minItems: 8, maxItems: 20, allowPlaceholders: true, askMode: 'yes_no' },
    rewards: { defaultType: 'product', mappings: [] },
    analytics: { enabled: true, module: 'zoltan-style-oracle' },
    privacy: { cameraCopy: 'La camara solo detecta gestos en este dispositivo. No se graba video ni se envian imagenes.' }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeDeep(base, extra) {
    const out = clone(base);
    Object.keys(extra || {}).forEach((key) => {
      if (extra[key] && typeof extra[key] === 'object' && !Array.isArray(extra[key]) && out[key] && typeof out[key] === 'object' && !Array.isArray(out[key])) {
        out[key] = mergeDeep(out[key], extra[key]);
      } else {
        out[key] = extra[key];
      }
    });
    return out;
  }

  function createDefaultExperienceConfig(overrides) {
    return normalizeExperienceConfig(mergeDeep(DEFAULT_CONFIG, overrides || {}));
  }

  function resolveSectorDefaults(sector) {
    const defaults = {
      fashion: { rewardType: 'outfit', hostName: 'Madame Outfit', accentColor: '#e8d8a8' },
      sneaker: { rewardType: 'drop_access', hostName: 'Drop Oracle', accentColor: '#d8ff3e' },
      travel: { rewardType: 'route', hostName: 'Route Oracle', accentColor: '#7dd3fc' },
      perfume: { rewardType: 'product', hostName: 'Scent Oracle', accentColor: '#f5d0fe' }
    };
    return defaults[sector] || defaults.fashion;
  }

  function normalizeExperienceConfig(config) {
    const merged = mergeDeep(DEFAULT_CONFIG, config || {});
    const sectorDefaults = resolveSectorDefaults(merged.sector);
    merged.campaign.accentColor = merged.campaign.accentColor || sectorDefaults.accentColor;
    merged.host.name = merged.host.name || sectorDefaults.hostName;
    merged.rewards.defaultType = merged.rewards.defaultType || sectorDefaults.rewardType;
    return merged;
  }

  function validateExperienceConfig(config) {
    const normalizedConfig = normalizeExperienceConfig(config);
    const errors = [];
    const warnings = [];
    if (!normalizedConfig.id) errors.push('Missing experience id.');
    if (!normalizedConfig.sector) errors.push('Missing sector.');
    if (!normalizedConfig.campaign.brandName) errors.push('Missing campaign.brandName.');
    if (!normalizedConfig.host.name) errors.push('Missing host.name.');
    ['attract', 'question', 'reveal'].forEach((key) => {
      if (!normalizedConfig.host.lines[key] || !normalizedConfig.host.lines[key].length) errors.push(`Missing host line: ${key}`);
    });
    if (!normalizedConfig.story.visibleFantasy) errors.push('Missing story.visibleFantasy.');
    if (!normalizedConfig.story.wowMoment) errors.push('Missing story.wowMoment.');
    if (normalizedConfig.experience.engine !== 'binary_selection') warnings.push('Only binary_selection is fully supported in v1.');
    if (normalizedConfig.revealRules.minItems < 2) errors.push('Invalid revealRules.minItems.');
    if (normalizedConfig.revealRules.maxItems > 40) warnings.push('Large decks may be hard to read in physical activations.');
    return { ok: errors.length === 0, errors, warnings, normalizedConfig };
  }

  function resolveHostLine(config, phase, index) {
    const normalized = normalizeExperienceConfig(config);
    const lines = normalized.host.lines[phase] || normalized.host.lines.attract || ['ZOLTAN ha recibido la señal.'];
    return lines[(index || 0) % lines.length];
  }

  function resolveRewardForItem(config, item) {
    const normalized = normalizeExperienceConfig(config);
    const mappings = normalized.rewards.mappings || [];
    const found = mappings.find((mapping) => item && (mapping.itemId === item.id || mapping.category === item.category || (item.tags || []).includes(mapping.tag)));
    return Object.assign({
      type: found ? found.type : (item && item.rewardType) || normalized.rewards.defaultType,
      campaign: normalized.campaign.name,
      sector: normalized.sector
    }, found || {});
  }

  window.ZoltanExperienceSchema = {
    createDefaultExperienceConfig,
    normalizeExperienceConfig,
    validateExperienceConfig,
    resolveHostLine,
    resolveRewardForItem,
    resolveSectorDefaults
  };
})();
