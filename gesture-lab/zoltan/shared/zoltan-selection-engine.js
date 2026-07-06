(function () {
  const DEFAULTS = { minItems: 8, maxItems: 20 };

  function clone(value) {
    return JSON.parse(JSON.stringify(value || null));
  }

  function normalizeItem(item, index) {
    const source = item || {};
    const id = source.id || `item_${String(index + 1).padStart(2, '0')}`;
    return Object.assign({
      id,
      name: source.name || source.title || `Item ${index + 1}`,
      category: source.category || 'generic',
      title: source.title || source.name || `Item ${index + 1}`,
      subtitle: source.subtitle || '',
      image: source.image || null,
      video: source.video || null,
      color: source.color || '#e8d8a8',
      tags: Array.isArray(source.tags) ? source.tags.slice() : [],
      price: source.price || '',
      cta: Object.assign({ label: 'Ver', href: '#' }, source.cta || {}),
      rewardType: source.rewardType || 'generic_cta',
      metadata: Object.assign({}, source.metadata || {})
    }, clone(source), {
      id,
      index,
      binaryValue: index + 1
    });
  }

  function validateDeck(deck, options) {
    const opts = Object.assign({}, DEFAULTS, options || {});
    const errors = [];
    const warnings = [];
    const list = Array.isArray(deck) ? deck : [];
    if (!Array.isArray(deck)) errors.push('Deck must be an array.');
    if (list.length < opts.minItems) errors.push(`Deck requires at least ${opts.minItems} items.`);
    if (list.length > opts.maxItems) errors.push(`Deck allows at most ${opts.maxItems} items.`);
    const ids = new Set();
    list.forEach((item, index) => {
      if (!item || typeof item !== 'object') errors.push(`Item ${index} is invalid.`);
      if (!item.id) errors.push(`Item ${index} has no id.`);
      if (ids.has(item.id)) errors.push(`Duplicated id: ${item.id}`);
      ids.add(item.id);
      if (item.binaryValue !== index + 1) errors.push(`Item ${item.id} has invalid binaryValue.`);
      if (!item.name && !item.title) warnings.push(`Item ${item.id} has no visible name.`);
    });
    return { ok: errors.length === 0, errors, warnings };
  }

  function createDeck(items, options) {
    const opts = Object.assign({}, DEFAULTS, options || {});
    const deck = (Array.isArray(items) ? items : []).map(normalizeItem);
    const validation = validateDeck(deck, opts);
    if (!validation.ok) {
      return { deck, ok: false, errors: validation.errors, warnings: validation.warnings };
    }
    return { deck, ok: true, errors: [], warnings: validation.warnings };
  }

  function createSession(deck) {
    const validation = validateDeck(deck || []);
    if (!validation.ok) {
      return {
        deck: deck || [],
        currentBit: 0,
        answerBits: 0,
        maxBits: 0,
        phase: 'error',
        history: [],
        errors: validation.errors
      };
    }
    return {
      deck: deck.slice(),
      currentBit: 0,
      answerBits: 0,
      maxBits: Math.ceil(Math.log(deck.length + 1) / Math.log(2)),
      phase: 'question',
      history: []
    };
  }

  function shuffleDeterministic(items, bit) {
    return items.slice().sort((a, b) => ((a.binaryValue * 11 + bit) % 29) - ((b.binaryValue * 11 + bit) % 29));
  }

  function getQuestionGroup(session) {
    if (!session || session.phase !== 'question') return [];
    const bit = 1 << session.currentBit;
    return shuffleDeterministic(session.deck.filter((item) => (item.binaryValue & bit) !== 0), bit);
  }

  function answerCurrentQuestion(session, yes) {
    const next = Object.assign({}, session, {
      history: (session.history || []).slice()
    });
    if (!next || next.phase !== 'question') return next;
    const bit = 1 << next.currentBit;
    next.history.push({ bit: next.currentBit, answer: !!yes, value: yes ? bit : 0 });
    if (yes) next.answerBits += bit;
    next.currentBit += 1;
    if (next.currentBit >= next.maxBits) next.phase = 'reveal';
    return next;
  }

  function getReveal(session) {
    if (!session) return { ok: false, error: 'Missing session', item: null, index: -1 };
    const index = session.answerBits - 1;
    if (index < 0 || index >= session.deck.length) {
      return { ok: false, error: 'Reveal out of range', item: null, index };
    }
    return { ok: true, error: null, item: session.deck[index], index };
  }

  function resetSession(session) {
    return createSession(session && session.deck ? session.deck : []);
  }

  function createDemoItems(count, prefix) {
    const total = Math.max(8, Math.min(20, count || 16));
    return Array.from({ length: total }, (_, index) => ({
      id: `${prefix || 'demo'}_${String(index + 1).padStart(2, '0')}`,
      name: `${prefix || 'Demo'} ${index + 1}`,
      title: `${prefix || 'Demo'} ${index + 1}`,
      subtitle: 'Item demo para QA de selection engine.',
      category: 'demo',
      color: ['#e8d8a8', '#00ffcc', '#ff466b', '#8da2ff'][index % 4],
      tags: ['demo', `slot-${index + 1}`],
      price: `${index + 1}0 EUR`,
      cta: { label: 'Ver demo', href: '#' },
      rewardType: 'generic_cta'
    }));
  }

  function simulateSelection(deck, item) {
    let session = createSession(deck);
    for (let bit = 0; bit < session.maxBits; bit += 1) {
      const yes = (item.binaryValue & (1 << bit)) !== 0;
      session = answerCurrentQuestion(session, yes);
    }
    const reveal = getReveal(session);
    return { expected: item.id, actual: reveal.item ? reveal.item.id : null, ok: reveal.ok && reveal.item.id === item.id };
  }

  window.ZoltanSelectionEngine = {
    createDeck,
    createSession,
    getQuestionGroup,
    answerCurrentQuestion,
    getReveal,
    resetSession,
    validateDeck,
    createDemoItems
  };

  window.__ZOLTAN_SELECTION_ENGINE_QA__ = function () {
    return [8, 12, 16, 20].map((count) => {
      const created = createDeck(createDemoItems(count, `qa${count}`));
      const results = created.deck.map((item) => simulateSelection(created.deck, item));
      return { count, ok: created.ok && results.every((result) => result.ok), results };
    });
  };
})();
